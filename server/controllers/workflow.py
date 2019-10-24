from controllers.config import Config as C, Names as N
from controllers.utils import getLast, pick as G, serverprint
from controllers.db import inCrit


CT = C.tables
CM = C.mongo

MAIN_TABLE = CT.userTables[0]
INTER_TABLE = CT.userTables[1]
WORKFLOW_TABLES_LIST = CT.userTables + CT.userEntryTables
WORKFLOW_TABLES = set(WORKFLOW_TABLES_LIST)
WORKFLOW_FIELDS = CT.workflowFields
DETAILS = CT.details


class Workflow(object):
  def __init__(self, db):
    self.db = db
    self.decisions = {
        G(record, N._id): G(record, N.rep)
        for record in db.getValueRecords(N.decision)
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
    contribTitle = G(record, N.title)

    assessments = [
        self.computeWorkflowAssessment(rec)
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

    refRE = G(refR, N.expert)
    refRF = G(refR, N.final)

    return {
        N._id: contribId,
        N.type: contribType,
        N.title: contribTitle,
        N.selected: G(record, N.selected),
        N.assessments: assessments,
        N.assessmentId: G(ref, N._id),
        N.assessmentTitle: G(ref, N.title),
        N.score: G(ref, N.score),
        N.complete: G(ref, N.complete),
        N.submitted: G(ref, N.submitted),
        N.dateSubmitted: G(ref, N.dateSubmitted),
        N.dateWithdrawn: G(ref, N.dateWithdrawn),
        N.reviewer: G(ref, N.reviewer),
        N.reviewers: G(ref, N.reviewers),
        N.reviews: G(ref, N.reviews),
        N.reviewEId: G(refRE, N._id),
        N.reviewFId: G(refRF, N._id),
        N.reviewTitle: G(refRF, N.reviewTitle),
        N.decision: G(refRF, N.decision),
        N.dateDecided: G(refRF, N.dateDecided),
    }

  def computeWorkflowAssessment(self, record):
    db = self.db
    typeCriteria = db.typeCriteria

    assessmentId = G(record, N._id)
    assessmentType = G(record, N.assessmentType)
    assessmentTitle = G(record, N.title)
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
            self.computeWorkflowReview(rec)
            for rec in G(record, N.review, default=[])
            if (
                G(rec, N.creator) is not None and
                G(rec, N.creator) == theReviewer
            )
        ]
        for (kind, theReviewer) in reviewer.items()
    }

    ref = {
        kind:
        getLast([
            attributes
            for attributes in theReviews or []
            if assessmentType is not None and G(attributes, N.type) == assessmentType
        ])
        for (kind, theReviews) in reviews.items()
    }

    refE = G(ref, N.expert)
    refF = G(ref, N.final)

    return {
        N._id: assessmentId,
        N.type: assessmentType,
        N.title: assessmentTitle,
        N.score: score,
        N.complete: complete,
        N.submitted: submitted,
        N.dateSubmitted: dateSubmitted,
        N.dateWithdrawn: dateWithdrawn,
        N.reviewer: reviewer,
        N.reviewers: reviewers,
        N.reviews: reviews,
        N.reviewEId: G(refE, N._id),
        N.reviewFId: G(refF, N._id),
        N.decision: G(refF, N.decision),
        N.dateDecided: G(refF, N.dateDecided),
    }

  def computeWorkflowReview(self, record):
    decisions = self.decisions

    reviewId = G(record, N._id)
    reviewType = G(record, N.reviewType)
    reviewTitle = G(record, N.title)
    decision = G(decisions, G(record, N.decision))
    dateDecided = G(record, N.dateDecided)

    return {
        N._id: reviewId,
        N.type: reviewType,
        N.title: reviewTitle,
        N.decision: decision,
        N.dateDecided: dateDecided,
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
