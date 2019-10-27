from controllers.config import Config as C, Names as N
from controllers.utils import getLast, pick as G, serverprint, E
from controllers.html import HtmlElements as H
from controllers.db import inCrit


CT = C.tables
CM = C.mongo

MAIN_TABLE = CT.userTables[0]
INTER_TABLE = CT.userTables[1]
WORKFLOW_TABLES_LIST = CT.userTables + CT.userEntryTables
WORKFLOW_TABLES = set(WORKFLOW_TABLES_LIST)
WORKFLOW_FIELDS = CT.workflowFields
DETAILS = CT.details
FROZEN_REASONS = CT.frozenReasons


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

  def addControl(self, control):
    self.control = control

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

    attributes = self.computeWorkflow(contribId=contribId)
    attributes[N._id] = contribId
    serverprint(f"WORKFLOW: New workflow info {contribId}")
    db.insertWorkflow(attributes)

  def recompute(self, contribId):
    db = self.db

    attributes = self.computeWorkflow(contribId=contribId)
    serverprint(f"WORKFLOW: Adjust workflow info {contribId}")
    db.updateWorkflow(contribId, attributes)

  def delete(self, contribId):
    db = self.db

    serverprint(f"WORKFLOW: Delete workflow info {contribId}")
    db.delWorkflow(contribId)

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

  def addWorkflow(self, wfRecord):
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

    self.addWorkflowAssessments(wfRecord, contribStatus)

    assessmentValid = G(wfRecord, N.assessmentValid)
    assessmentStatus = {}
    if assessmentValid:
      aFrozen = assessmentValid[N.frozen]
      aScore = assessmentValid[N.score]
      assessmentStatus = dict(
          hasValid=True,
          frozen=aFrozen,
          score=aScore,
          cls=assessmentValid[N.cls],
          rep=assessmentValid[N.rep],
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

  def addWorkflowAssessments(self, wfRecord, contribStatus):
    assessmentValid = G(wfRecord, N.assessmentValid)
    wfAssessments = G(wfRecord, N.assessments, default=[])

    for wfAssessment in wfAssessments:
      aId = G(wfAssessment, N._id)
      complete = G(wfAssessment, N.complete)
      submitted = G(wfAssessment, N.submitted)
      dateSubmitted = G(wfAssessment, N.dateSubmitted)
      dateWithdrawn = G(wfAssessment, N.dateWithdrawn)

      valid = assessmentValid and G(assessmentValid, N._id) == aId
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
          rep = "Assessment in progress"
          cls = "info"
          code = 1
      else:
        rep = "Assessment still incomplete"
        cls = "warning"
        code = 0

      self.addWorkflowReviews(wfAssessment, contribStatus)

      reviewValid = G(wfAssessment, N.reviewValid)
      reviewFinal = G(reviewValid, N.final)

      if reviewFinal and G(reviewFinal, N.frozen) == 2:
        frozen = G(reviewFinal, N.frozen)
        rep = G(reviewFinal, N.rep)
        cls = G(reviewFinal, N.cls)
      else:
        frozen = 1 if code == 2 else 0

      contribFrozen = contribStatus[N.frozen]
      if contribFrozen > frozen:
        frozen = contribFrozen

      wfAssessment.update(dict(
          hasValid=not not reviewValid,
          frozen=frozen,
          rep=rep,
          cls=cls,
      ))

  def addWorkflowReviews(self, wfAssessment, contribStatus):
    reviewValidByKind = G(wfAssessment, N.reviewValid)
    wfReviewsByKind = G(wfAssessment, N.reviews, default={})

    decisions = self.decisions
    decisionParticiple = self.decisionParticiple

    validAssessment = G(wfAssessment, N.valid)

    for (kind, wfReviews) in wfReviewsByKind.items():
      for wfReview in wfReviews:
        rId = G(wfReview, N._id)
        reviewValid = G(reviewValidByKind, kind)
        decision = G(wfReview, N.decision)
        decisionRep = G(decisions, decision)
        decisionPart = G(decisionParticiple, decision, default=E).lower()

        validRel = reviewValid and G(reviewValid, N._id) == rId
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

  def computeWorkflow(self, record=None, contribId=None):
    if record is None:
      record = self.getFullItem(contribId)

    contribId = G(record, N._id)
    if contribId is None:
      return {}

    contribType = G(record, N.typeContribution)

    assessments = [
        self.computeWorkflowAssessment(rec, contribType)
        for rec in G(record, N.assessment, default=[])
    ]

    ref = getLast([
        attributes
        for attributes in assessments
        if contribType is not None and G(attributes, N.type) == contribType
    ])
    assessmentType = G(ref, N.type)
    refR = {
        kind:
        getLast([
            attributes
            for attributes in theReviews or []
            if assessmentType is not None and G(attributes, N.type) == assessmentType
        ])
        for (kind, theReviews) in G(ref, N.reviews, default={}).items()
    }

    wfRecord = {
        N._id: contribId,
        N.type: contribType,
        N.selected: G(record, N.selected),
        N.assessments: assessments,
        N.assessmentValid: ref,
        N.reviewValid: refR,
    }

    self.addWorkflow(wfRecord)
    return wfRecord

  def computeWorkflowAssessment(self, record, contribType):
    db = self.db
    typeCriteria = db.typeCriteria

    assessmentId = G(record, N._id)
    assessmentType = G(record, N.assessmentType)
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

    reviews = {
        kind:
        [
            self.computeWorkflowReview(rec, reviewer, assessmentType, contribType)
            for rec in G(record, N.review, default=[])
            if (
                G(rec, N.creator) is not None and
                G(rec, N.creator) == theReviewer
            )
        ]
        for (kind, theReviewer) in reviewer.items()
    }

    reviewValid = {
        kind:
        getLast([
            attributes
            for attributes in theReviews or []
            if assessmentType is not None and G(attributes, N.type) == assessmentType
        ])
        for (kind, theReviews) in reviews.items()
    }

    return {
        N._id: assessmentId,
        N.type: assessmentType,
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
    }

  def computeWorkflowReview(self, record, reviewer, assessmentType, contribType):
    decisions = self.decisions

    reviewId = G(record, N._id)
    reviewType = G(record, N.reviewType)
    decision = G(decisions, G(record, N.decision))
    dateDecided = G(record, N.dateDecided)

    return {
        N._id: reviewId,
        N.type: reviewType,
        N.goodType: (
            reviewType is not None and
            reviewType == assessmentType and
            reviewType == contribType
        ),
        N.decision: decision,
        N.dateDecided: dateDecided,
        N.reviewer: reviewer,
    }

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


def getWf(wfRecord, wfType, eid=None):
  if wfType == N.contrib:
    wf = wfRecord
  elif wfType == N.assessment:
    wf = getLast([
        rec
        for rec in G(wfRecord, N.assessments, default=[])
        if G(rec, N._id) == eid
    ])
  elif wfType == N.review:
    wf = {}
    found = False
    for arec in G(wfRecord, N.assessments, default=[]):
      for (kind, recs) in G(arec, N.reviews, default={}).items():
        for rec in recs:
          if G(rec, N._id) == eid:
            wf = rec
            found = True
            break
        if found:
          break
      if found:
        break
  return wf


def presentScore(score, wfType, eid, derivation=True):
  overall = G(score, N.overall, default=0)
  relevantScore = G(score, N.relevantScore, default=0)
  relevantMax = G(score, N.relevantMax, default=0)
  relevantN = G(score, N.relevantN, default=0)
  allMax = G(score, N.allMax, default=0)
  allN = G(score, N.allN, default=0)
  irrelevantN = allN - relevantN

  fullScore = H.span(
      f"Score {overall}%",
      title="overall score of this assessment",
      cls="ass-score",
  )
  if not derivation:
    return fullScore

  scoreMaterial = H.div(
      [
          H.div(
              [
                  H.p(f"""This assessment scores {relevantScore} points."""),
                  H.p(
                      f"""For this type of contribution there is a total of
                          {allMax} points, divided over {allN} criteria.
                      """
                  ),
                  (
                      H.p(
                          f"""However,
                              {irrelevantN}
                              rule{" is " if irrelevantN == 1 else "s are"}
                              not applicable to this contribution,
                              which leaves the total amount to
                              {relevantMax} points,
                              divided over {relevantN} criteria.
                          """
                      )
                      if irrelevantN else
                      E
                  ),
                  H.p(
                      f"""The total score is expressed as a percentage:
                          the fraction of {relevantScore} scored points
                          with respect to {relevantMax} scorable points:
                          {overall}%.
                      """
                  )
              ],
              cls="ass-score-deriv",
          ),
      ],
      cls="ass-score-box",
  )

  scoreWidget = H.detailx(
      (N.calc, N.dismiss),
      scoreMaterial,
      f"""{wfType}/{eid}/scorebox""",
      openAtts=dict(
          cls="button small",
          title="Show derivation",
      ),
      closeAtts=dict(
          cls="button small",
          title="Hide derivation",
      ),
  )
  return (fullScore, *scoreWidget)


def wfStatus(wfRecord, wfType, eid):
  thisWf = getWf(wfRecord, wfType, eid=eid)
  frozen = (
      G(thisWf, N.frozen, default=0)
      if thisWf else
      0
  )
  reason = FROZEN_REASONS[frozen]
  frozenCls = f"frozen{frozen}"

  cls = G(thisWf, N.cls)
  rep = G(thisWf, N.rep)

  contribRep = (
      H.span(
          rep,
          cls=f"large status {cls}",
      )
      if wfType == N.contrib else
      E
  )

  src = (
      G(thisWf, N.assessmentStatus)
      if wfType == N.contrib else
      thisWf
  )
  cls = G(src, N.cls)
  rep = G(src, N.rep)
  valid = G(src, N.valid)
  validRel = G(src, N.validRel)
  kind = G(src, N.kind, default=E)
  hasValid = G(src, N.hasValid)

  scoreParts = presentScore(
      G(src, N.score),
      wfType,
      eid,
  )
  scorePart = (
      E.join(scoreParts)
      if wfType == N.assessment else
      (scoreParts[0] if scoreParts else E)
      if wfType == N.contrib else
      E
  )
  validPart = E
  if wfType in {N.assessment, N.review}:
    preYes = "THE "
    preNo = "not a "
    clsYes = "good"
    clsNo = "error"
    post = E
    cond = valid

    if wfType == N.review:
      cond = validRel
      if not valid:
        preYes = E
        post = " for this assessment"
        clsYes = "warning"

    validPart = (
        H.span(
            f"{preYes}valid {kind} {wfType}{post}",
            cls=f"large status {clsYes}",
        )
        if cond else
        H.span(
            f"{preNo}valid {kind} {wfType}{post}",
            cls=f"large status {clsNo}",
        )
    )

  assessmentPart = H.div(
      [
          validPart,
          contribRep,
          rep,
          scorePart,
      ],
      cls=cls,
  )

  itemKey = f"""{wfType}/{eid}"""
  rButton = H.iconr(itemKey, "#workflow", msg=N.status)

  statusRep = H.div(
      [
          rButton,
          assessmentPart,
          reason,
      ],
      cls=f"workflow {frozenCls}",
  )

  return (frozen, hasValid, statusRep)
