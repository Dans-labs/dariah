from controllers.config import Config as C, Names as N
from controllers.utils import getLast, pick as G, serverprint, E
from controllers.html import HtmlElements as H
from controllers.db import inCrit


CT = C.tables
CF = C.workflow
CM = C.mongo

USER_TABLES_LIST = CT.userTables
USER_TABLES = set(USER_TABLES_LIST)
MAIN_TABLE = USER_TABLES_LIST[0]
INTER_TABLE = USER_TABLES_LIST[1]
DETAILS = CT.details
WORKFLOW_TABLES_LIST = CT.userTables + CT.userEntryTables

FROZEN_REASONS = CF.frozenReasons
WORKFLOW_FIELDS = CF.fields
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

  def computeWorkflow(self, record=None, contribId=None):
    if record is None:
      record = self.getFullItem(contribId)

    contribId = G(record, N._id)
    if contribId is None:
      return {}

    contribType = G(record, N.typeContribution)
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
    creator = G(record, N.creator)
    decision = G(decisions, G(record, N.decision))
    dateDecided = G(record, N.dateDecided)

    return {
        N._id: reviewId,
        N.creator: creator,
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


def getWf(wfRecord, wfType, eid=None):
  return (
      wfRecord
      if wfType == N.contrib else
      G(G(wfRecord, N.assessmentIndex), str(eid))
      if wfType == N.assessment else
      G(G(wfRecord, N.reviewIndex), str(eid))
      if wfType == N.review else
      None
  )


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


def wfPermission(wfRecord, wfType, eid, uid, action):
  if (
      uid is None or
      wfType not in USER_TABLES
  ):
    return False

  reviewIndex = G(wfRecord, N.reviewIndex)
  thisWf = getWf(wfRecord, wfType, eid=eid)
  src = (
      G(thisWf, N.assessmentStatus)
      if wfType == N.contrib else
      thisWf
  )
  hasValid = G(src, N.hasValid)
  creator = G(thisWf, N.creator)

  finalReview = G(G(thisWf, N.reviews), N.final)
  finalReviewWf = G(reviewIndex, finalReview)
  decision = G(finalReviewWf, N.decision)
  isDecided = decision not in {None, N.Revise}

  if isDecided:
    return False

  if wfType == N.contrib:
    if action == N.startAssessment:
      return (
          not hasValid and
          uid == creator
      )
    return False

  complete = G(thisWf, N.complete)
  submitted = G(thisWf, N.submitted)
  dateSubmitted = G(thisWf, N.dateSubmitted)
  dateWithdrawn = G(thisWf, N.dateWithdrawn)

  reviewer = G(thisWf, N.reviewer)
  newKind = (
      N.expert
      if G(reviewer, N.expert) == uid else
      N.final
      if G(reviewer, N.final) == uid else
      None
  )
  if wfType == N.assessment:
    if uid != creator:
      return False

    if action == N.submitAssessment:
      if not complete:
        return False
      return (
          not dateSubmitted or
          dateWithdrawn and dateSubmitted < dateWithdrawn
      )
    if action == N.withdrawAssessment:
      if not submitted:
        return False

    if action == N.startReview:
      if newKind is None:
        return False
      return not G(hasValid, newKind)

    return False

  if wfType == N.review:
    if action == N.decideExpertReview:
      pass

    return False

  return False


def wfStatus(wfRecord, wfType, eid, uid):
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

  assessmentRep = H.join(
      [
          H.span(
              rep,
              cls=f"large status {cls}",
          ),
          H.span(
              rep,
              cls=f"large status {cls}",
          ),
      ]
  )

  valid = G(src, N.valid)
  validRel = G(src, N.validRel)
  kind = G(src, N.kind, default=E)

  scoreParts = presentScore(
      G(src, N.score),
      wfType,
      eid,
  )
  scorePart = (
      H.span(scoreParts)
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
          contribRep,
          assessmentRep,
          scorePart,
      ],
      cls="workflow-line",
  )

  reasonPart = H.div(
      reason,
      cls=frozenCls,
  )

  itemKey = f"""{wfType}/{eid}"""
  rButton = H.iconr(itemKey, "#workflow", msg=N.status)

  actionPart = E
  if (
      uid is not None and
      uid == G(thisWf, N.creator) and
      wfType in USER_TABLES_LIST[0:2]
  ):
    if wfType == N.contrib:
      if wfPermission(
          wfRecord, wfType, eid, uid, N.startAssessment,
      ):
        dTable = N.assessment
        actionPart = H.a(
            f"Start {dTable}",
            f"""/api/{wfType}/{eid}/{dTable}/{N.insert}""",
            title=f"""New {dTable}""",
            cls=f"large step info",
        )
    elif wfType == N.assessment:
      valid = G(thisWf, N.valid)
      if not valid:
        actionPart = H.span(
            "There is no workflow for invalid items",
            cls=f"large step info",
        )
      else:
        if wfPermission(
            wfRecord, wfType, eid, uid, N.submitAssessment,
        ):
          contribId = G(wfRecord, N._id)
          reviewer = G(thisWf, N.reviewer)
          dTable = N.review
          dateSubmitted = G(thisWf, N.dateSubmitted)

          actionParts = []

          if wfPermission(
              wfRecord, wfType, eid, uid, N.withdrawAssessment,
          ):
            actionParts.append(H.span(
                f"Withdraw {wfType}",
                table=wfType,
                eid=eid,
                field=N.submitted,
                qvalue="",
                after=f"/{N.contrib}/item/{contribId}",
                title=f"""Withdraw this {wfType} from review""",
                cls=f"large step error",
            ))
          if wfPermission(
              wfRecord, wfType, eid, uid, N.submitAssessment,
          ):
            verb = "Submit" if not dateSubmitted else "Resubmit"
            actionParts.append(H.span(
                f"{verb} {wfType}",
                table=wfType,
                eid=eid,
                field=N.submitted,
                qvalue="1",
                after=f"/{N.contrib}/item/{contribId}",
                title=f"""{verb} this {wfType} for review""",
                cls=f"large step info",
            ))
          if wfPermission(
              wfRecord, wfType, eid, uid, N.startReview,
          ):

            newKind = (
                N.expert
                if G(reviewer, N.expert) == uid else
                N.final
                if G(reviewer, N.final) == uid else
                None
            )
            actionParts.append(H.a(
                f"Start {newKind} {dTable}",
                f"""/api/{wfType}/{eid}/{dTable}/{N.insert}""",
                title=f"""New {dTable}""",
                cls=f"large step info",
            ))

          actionPart = H.join(actionParts)

    elif wfType == N.review:
      valid = G(thisWf, N.valid)
      if not valid:
        actionPart = H.span(
            "There is no workflow for invalid items",
            cls=f"large step info",
        )
      else:
        pass

  statusRep = H.div(
      [
          rButton,
          validPart,
          assessmentPart,
          reasonPart,
          actionPart,
      ],
      cls=f"workflow",
  )

  return (frozen, statusRep)
