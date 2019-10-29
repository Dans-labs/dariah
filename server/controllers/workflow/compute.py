from controllers.config import Config as C, Names as N
from controllers.utils import getLast, pick as G, serverprint, E
from controllers.db import inCrit
from controllers.workflow.apply import WorkflowItem


CT = C.tables
CF = C.workflow
CM = C.mongo

USER_TABLES_LIST = CT.userTables
MAIN_TABLE = USER_TABLES_LIST[0]
INTER_TABLE = USER_TABLES_LIST[1]
DETAILS = CT.details
WORKFLOW_TABLES_LIST = CT.userTables + CT.userEntryTables

WORKFLOW_TABLES = set(WORKFLOW_TABLES_LIST)


class Workflow(object):
  def __init__(self, db):
    self.db = db
    decisionRecords = db.getValueRecords(N.decision)
    self.decisions = {
        G(record, N._id): G(record, N.rep)
        for record in decisionRecords
    }
    self.decisionParticiple = {
        G(record, N._id): G(record, N.participle)
        for record in decisionRecords
    }

    scoreData = db.getValueRecords(N.score)
    self.scoreMapping = {
        G(record, N._id): G(record, N.score)
        for record in scoreData
        if N.score in record
    }

    maxScoreByCrit = {}
    for record in scoreData:
      crit = G(record, N.criteria)
      if crit is None:
        continue
      score = G(record, N.score, default=0)
      prevMax = maxScoreByCrit.setdefault(crit, None)
      if prevMax is None or score > prevMax:
        maxScoreByCrit[crit] = score

    self.maxScoreByCrit = maxScoreByCrit

    self.initWorkflow(drop=True)
    self.items = {}

  def addControl(self, control):
    auth = control.auth
    user = auth.user
    self.uid = G(user, N._id)
    self.eppn = G(user, N.eppn)

  def getItem(self, eid):
    items = self.items
    return G(items, eid)

  def makeItem(self, attributes):
    return WorkflowItem(self, attributes)

  def initWorkflow(self, drop=False):
    db = self.db

    if drop:
      serverprint("WORKFLOW: Drop exisiting table")
      db.dropWorkflow()
    else:
      serverprint("WORKFLOW: Clear exisiting table")
      db.clearWorkflow()

    entries = {}
    serverprint("WORKFLOW: Read user (entry) tables")
    for table in WORKFLOW_TABLES:
      entries[table] = db.entries(table)

    serverprint("WORKFLOW: Link masters and details")
    aggregate(entries)

    serverprint("WORKFLOW: Compute workflow info")
    wfRecords = []
    for mainRecord in G(entries, MAIN_TABLE, default={}).values():
      attributes = self.computeWorkflow(record=mainRecord)
      wfRecords.append(attributes)
    serverprint("WORKFLOW: Store workflow info")
    db.insertWorkflowMany(wfRecords)
    serverprint("WORKFLOW: Initialization done")

  def insert(self, contribId):
    db = self.db
    items = self.items

    attributes = self.computeWorkflow(contribId=contribId)
    attributes[N._id] = contribId
    serverprint(f"WORKFLOW: New workflow info {contribId}")
    db.insertWorkflow(attributes)

    itemObj = self.makeItem(attributes)
    items[contribId] = itemObj

  def recompute(self, contribId):
    db = self.db

    attributes = self.computeWorkflow(contribId=contribId)
    serverprint(f"WORKFLOW: Adjust workflow info {contribId}")
    db.updateWorkflow(contribId, attributes)

    itemObj = self.getItem(contribId)
    itemObj.updateData(attributes)

  def delete(self, contribId):
    db = self.db
    items = self.items

    serverprint(f"WORKFLOW: Delete workflow info {contribId}")
    db.delWorkflow(contribId)

    itemObj = self.getItem(contribId)
    itemObj.clearData()
    items.pop(contribId)

  def getFullItem(self, contribId):
    db = self.db

    entries = {}
    for table in WORKFLOW_TABLES_LIST:
      crit = (
          {N._id: contribId}
          if table == MAIN_TABLE else
          {N.contrib: contribId}
          if table in CT.userTables else
          {
              INTER_TABLE: inCrit(G(entries, INTER_TABLE, default={}))
          }
      )
      entries[table] = db.entries(table, crit)
    aggregate(entries)

    return G(G(entries, MAIN_TABLE), contribId)

  def computeWorkflow(self, record=None, contribId=None):
    if record is None:
      record = self.getFullItem(contribId)

    contribId = G(record, N._id)
    if contribId is None:
      return {}

    contribType = G(record, N.typeContribution)
    contribTitle = G(record, N.title)
    creator = G(record, N.creator)

    assessments = [
        self.computeWorkflowAssessment(rec, contribType)
        for rec in G(record, N.assessment, default=[])
    ]

    assessmentIndex = {}
    assessmentIds = []
    reviewIndex = {}

    for assessment in assessments:
      assessmentId = str(G(assessment, N._id, default=E))
      assessmentIds.append(assessmentId)
      thisReviewIndex = assessment.pop(N.reviewIndex, {})
      assessmentIndex[assessmentId] = assessment
      reviewIndex.update(thisReviewIndex)

    ref = getLast([
        attributes
        for attributes in assessments
        if contribType is not None and G(attributes, N.type) == contribType
    ])
    assessmentValid = str(G(ref, N._id, default=E))
    assessmentType = G(ref, N.type)

    reviewValid = {
        kind:
        getLast([
            rId
            for rId in theReviews or []
            if (
                assessmentType is not None and
                G(G(reviewIndex, rId), N.type) == assessmentType
            )
        ])
        for (kind, theReviews) in G(ref, N.reviews, default={}).items()
    }

    wfRecord = {
        N._id: contribId,
        N.creator: creator,
        N.type: contribType,
        N.title: contribTitle,
        N.selected: G(record, N.selected),
        N.assessments: assessmentIds,
        N.assessmentValid: assessmentValid,
        N.assessmentIndex: assessmentIndex,
        N.reviewValid: reviewValid,
        N.reviewIndex: reviewIndex,
    }

    self.addToWorkflow(wfRecord)
    return wfRecord

  def computeWorkflowAssessment(self, record, contribType):
    db = self.db
    typeCriteria = db.typeCriteria

    assessmentId = G(record, N._id)
    assessmentType = G(record, N.assessmentType)
    assessmentTitle = G(record, N.assessmentTitle)
    creator = G(record, N.creator)
    nCriteria = len(G(typeCriteria, assessmentType, default=[]))

    centries = [
        rec
        for rec in G(record, N.criteriaEntry, default=[])
        if (
            assessmentId is not None and
            G(rec, N.criteria) is not None and
            G(rec, N.assessment) == assessmentId
        )
    ]
    complete = (
        len(centries) == nCriteria
        and
        all(
            G(rec, N.score) and G(rec, N.evidence)
            for rec in centries
        )
    )
    submitted = G(record, N.submitted)
    dateSubmitted = G(record, N.dateSubmitted)
    dateWithdrawn = G(record, N.dateWithdrawn)

    score = self.computeScore(centries)

    reviewer = {
        N.expert: G(record, N.reviewerE),
        N.final: G(record, N.reviewerF),
    }
    reviewers = sorted(set(reviewer.values()) - {None})

    reviewIndex = {}
    reviews = {}

    for (kind, theReviewer) in reviewer.items():
      for rec in G(record, N.review, default=[]):
        if (
            G(rec, N.creator) is not None and
            G(rec, N.creator) == theReviewer
        ):
          reviewWf = self.computeWorkflowReview(
              rec, reviewer, assessmentType, contribType,
          )
          reviewId = str(G(reviewWf, N._id, default=E))
          reviews.setdefault(kind, []).append(reviewId)
          reviewIndex[reviewId] = reviewWf

    reviewValid = {
        kind:
        getLast([
            rId
            for rId in theReviews or []
            if (
                assessmentType is not None and
                G(G(reviewIndex, rId), N.type) == assessmentType
            )
        ])
        for (kind, theReviews) in reviews.items()
    }
    return {
        N._id: assessmentId,
        N.creator: creator,
        N.type: assessmentType,
        N.title: assessmentTitle,
        N.goodType: (
            assessmentType is not None and
            assessmentType == contribType
        ),
        N.score: score,
        N.complete: complete,
        N.submitted: submitted,
        N.dateSubmitted: dateSubmitted,
        N.dateWithdrawn: dateWithdrawn,
        N.reviewer: reviewer,
        N.reviewers: reviewers,
        N.reviews: reviews,
        N.reviewValid: reviewValid,
        N.reviewIndex: reviewIndex,
    }

  def computeWorkflowReview(self, record, reviewer, assessmentType, contribType):
    decisions = self.decisions

    reviewId = G(record, N._id)
    reviewType = G(record, N.reviewType)
    reviewTitle = G(record, N.reviewTitle)
    creator = G(record, N.creator)
    decision = G(decisions, G(record, N.decision))
    dateDecided = G(record, N.dateDecided)

    return {
        N._id: reviewId,
        N.creator: creator,
        N.type: reviewType,
        N.title: reviewTitle,
        N.goodType: (
            reviewType is not None and
            reviewType == assessmentType and
            reviewType == contribType
        ),
        N.decision: decision,
        N.dateDecided: dateDecided,
        N.reviewer: reviewer,
    }

  def addToWorkflow(self, wfRecord):
    selected = G(wfRecord, N.selected)

    rep = E
    cls = ""
    frozen = 0
    if selected:
      frozen = 3
      cls = "good"
      rep = "Selected by National Coordinator"
    elif selected is not None:
      frozen = 3
      cls = "error"
      rep = "No selection decision by National Coordinator"

    contribStatus = dict(
        frozen=frozen,
        cls=cls,
        rep=rep,
    )

    self.addToWorkflowAssessments(wfRecord, contribStatus)
    assessmentIndex = G(wfRecord, N.assessmentIndex)

    assessmentValid = G(wfRecord, N.assessmentValid)
    assessmentStatus = {}
    if assessmentValid:
      awfRecord = G(assessmentIndex, assessmentValid)
      aFrozen = awfRecord[N.frozen]
      aScore = awfRecord[N.score]
      assessmentStatus = dict(
          hasValid=True,
          frozen=aFrozen,
          score=aScore,
          cls=awfRecord[N.cls],
          rep=awfRecord[N.rep],
      )
      if frozen < aFrozen:
        frozen = aFrozen
    else:
      assessmentStatus = dict(
          hasValid=False,
          frozen=None,
          cls="info",
          rep="No valid assessment",
      )

    wfRecord.update(dict(
        frozen=frozen,
        rep=rep,
        cls=cls,
        assessmentStatus=assessmentStatus
    ))

  def addToWorkflowAssessments(self, wfRecord, contribStatus):
    assessmentIndex = G(wfRecord, N.assessmentIndex)
    reviewIndex = G(wfRecord, N.reviewIndex)
    assessmentValid = G(wfRecord, N.assessmentValid)
    aIds = G(wfRecord, N.assessments, default=[])

    for aId in aIds:
      wfAssessment = G(assessmentIndex, aId)
      complete = G(wfAssessment, N.complete)
      submitted = G(wfAssessment, N.submitted)
      dateSubmitted = G(wfAssessment, N.dateSubmitted)
      dateWithdrawn = G(wfAssessment, N.dateWithdrawn)

      valid = assessmentValid and assessmentValid == aId
      wfAssessment[N.valid] = valid
      code = None
      rep = E
      cls = ""
      if complete:
        if submitted:
          if dateWithdrawn:
            if dateWithdrawn < dateSubmitted:
              rep = "Assessment resubmitted"
              cls = "info"
              code = 2
            else:
              rep = "Assessment being revised by author"
              cls = "warning"
              code = -1
          else:
            rep = "Assessment submitted"
            cls = "info"
            code = 2
        else:
          rep = "Assessment complete"
          cls = "info"
          code = 1
      else:
        rep = "Assessment still incomplete"
        cls = "warning"
        code = 0

      self.addToWorkflowReviews(wfAssessment, wfRecord, contribStatus)

      reviewValid = G(wfAssessment, N.reviewValid)
      reviewFinal = G(reviewValid, N.final)
      wfReviewFinal = G(reviewIndex, reviewFinal)

      if reviewFinal and G(wfReviewFinal, N.frozen) == 2:
        frozen = G(wfReviewFinal, N.frozen)
        rep = G(wfReviewFinal, N.rep)
        cls = G(wfReviewFinal, N.cls)
      else:
        frozen = 1 if code == 2 else 0

      contribFrozen = contribStatus[N.frozen]
      if contribFrozen > frozen:
        frozen = contribFrozen

      wfAssessment.update(dict(
          hasValid={
              kind: not not G(reviewValid, kind)
              for kind in {N.expert, N.final}
          },
          frozen=frozen,
          rep=rep,
          cls=cls,
      ))

  def addToWorkflowReviews(self, wfAssessment, wfRecord, contribStatus):
    reviewIndex = G(wfRecord, N.reviewIndex)
    reviewValidByKind = G(wfAssessment, N.reviewValid)
    reviewIdsByKind = G(wfAssessment, N.reviews, default={})

    decisions = self.decisions
    decisionParticiple = self.decisionParticiple

    validAssessment = G(wfAssessment, N.valid)

    for (kind, reviewIds) in reviewIdsByKind.items():
      for rId in reviewIds:
        wfReview = G(reviewIndex, rId)
        reviewValid = G(reviewValidByKind, kind)
        decision = G(wfReview, N.decision)
        decisionRep = G(decisions, decision)
        decisionPart = G(decisionParticiple, decision, default=E).lower()

        validRel = reviewValid and reviewValid == rId
        valid = validAssessment and validRel
        code = None
        rep = E
        cls = "info"
        if decisionRep == N.Accept:
          code = 1
          rep = f"Review outcome: {decisionPart}"
          cls = "good"
        elif decisionRep == N.Reject:
          code = -1
          rep = f"Review outcome: {decisionPart}"
          cls = "good"
        elif decisionRep == N.Revise:
          code = 0
          rep = f"Review outcome: {decisionPart}"
          cls = "warning"

        frozen = 2 if code in {1, -1} else 0

        contribFrozen = contribStatus[N.frozen]
        if contribFrozen > frozen:
          frozen = contribFrozen

        wfReview.update(dict(
            kind=kind,
            valid=valid,
            validRel=validRel,
            frozen=frozen,
            rep=rep,
            cls=cls,
        ))

  def computeScore(self, cEntries):
    scoreMapping = self.scoreMapping
    maxScoreByCrit = self.maxScoreByCrit
    theseScores = [
        (
            G(cEntry, N.criteria),
            G(scoreMapping, G(cEntry, N.score)) or 0,
            G(maxScoreByCrit, G(cEntry, N.criteria)) or 0,
        )
        for cEntry in cEntries
    ]

    allMax = sum(x[2] for x in theseScores)
    allN = len(theseScores)

    relevantCriteriaEntries = [x for x in theseScores if x[1] >= 0]
    relevantMax = sum(x[2] for x in relevantCriteriaEntries)
    relevantScore = sum(x[1] for x in relevantCriteriaEntries)
    relevantN = len(relevantCriteriaEntries)
    overall = 0 if relevantMax == 0 else (round(relevantScore * 100 / relevantMax))
    return dict(
        overall=overall,
        relevantScore=relevantScore,
        relevantMax=relevantMax,
        allMax=allMax,
        relevantN=relevantN,
        allN=allN,
    )


def aggregate(entries):
  for (masterTable, detailTables) in DETAILS.items():
    if masterTable in WORKFLOW_TABLES:
      detailTablesWf = [
          detailTable
          for detailTable in detailTables
          if detailTable in WORKFLOW_TABLES
      ]
      for detailTable in detailTablesWf:
        serverprint(f"WORKFLOW: {masterTable}: lookup details from {detailTable}")
        for record in sorted(
            G(entries, detailTable, default={}).values(),
            key=lambda r: G(r, N.dateCreated, default=0),
        ):
          masterId = G(record, masterTable)
          if masterId:
            entries.setdefault(
                masterTable, {}
            ).setdefault(
                masterId, {}
            ).setdefault(
                detailTable, []
            ).append(record)
