from controllers.config import Config as C, Names as N
from controllers.utils import getLast, serverprint


CT = C.tables
CM = C.mongo

MAIN_TABLE = CT.userTables[0]
INTER_TABLE = CT.userTables[1]
WORKFLOW_TABLES_LIST = CT.userTables + CT.userEntryTables
WORKFLOW_TABLES = set(WORKFLOW_TABLES_LIST)
WORKFLOW_FIELDS = CT.workflowFields
DETAILS = CT.details

M_IN = CM.IN


class WorkflowItem(object):
  def __init__(self, control, contribId, requireFresh=False):
    attributes = control.getWorkflowItem(contribId, requireFresh=requireFresh)
    for (k, v) in attributes.items():
      setattr(self, k, v)

  def display(self):
    attributes = self.__dict__
    if not len(attributes):
      serverprint(f'workflow has no attributes')
    else:
      for (k, v) in sorted(attributes.items()):
        serverprint(f'workflow.{k} = {v}')


class Workflow(object):
  def __init__(self, db):
    self.db = db
    self.decisions = {
        record.get(N._id, None): record.get(N.rep, None)
        for record in db.getValueRecords(N.decision)
    }

    scoreData = db.getValueRecords(N.score)
    self.scoreMapping = {
        record.get(N._id, None): record[N.score]
        for record in scoreData
        if N.score in record
    }

    maxScoreByCrit = {}
    for record in scoreData:
      crit = record.get(N.criteria, None)
      if crit is None:
        continue
      score = record.get(N.score, 0)
      prevMax = maxScoreByCrit.setdefault(crit, None)
      if prevMax is None or score > prevMax:
        maxScoreByCrit[crit] = score

    self.maxScoreByCrit = maxScoreByCrit

    self.initWorkflow(drop=True)

  def addControl(self, control):
    self.control = control

  def computeScore(self, cEntries):
    scoreMapping = self.scoreMapping
    maxScoreByCrit = self.maxScoreByCrit

    theseScores = [
        (
            cEntry.get(N.criteria, None),
            scoreMapping.get(cEntry.get(N.score, None), 0),
            maxScoreByCrit.get(cEntry.get(N.criteria, None), 0)
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
    for mainRecord in entries[MAIN_TABLE].values():
      attributes = self.computeWorkflow(record=mainRecord)
      wfRecords.append(attributes)
    serverprint("WORKFLOW: Store workflow info")
    db.insertWorkflowMany(wfRecords)
    serverprint("WORKFLOW: Initialization done")

  def insert(self, contribId):
    control = self.control
    db = control.db

    attributes = self.computeWorkflow(contribId=contribId)
    attributes[N._id] = contribId
    serverprint(f"WORKFLOW: New workflow info {contribId}")
    db.insertWorkflow(attributes)

  def recompute(self, contribId):
    control = self.control
    db = control.db

    attributes = self.computeWorkflow(contribId=contribId)
    serverprint(f"WORKFLOW: Adjust workflow info {contribId}")
    db.updateWorkflow(contribId, attributes)

  def delete(self, contribId):
    control = self.control
    db = control.db

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
              INTER_TABLE: {
                  M_IN: list(entries.get(INTER_TABLE, {}))
              }
          }
      )
      entries[table] = db.entries(table, crit)
    aggregate(entries)

    return entries.get(MAIN_TABLE, {}).get(contribId, None)

  def computeWorkflow(self, record=None, contribId=None):
    decisions = self.decisions

    if record is None:
      record = self.getFullItem(contribId)

    cId = record.get(N._id, None)
    if cId is None:
      return {}

    cType = record.get(N.typeContribution, None)
    cTitle = record.get(N.title, None)

    aId = None
    aType = None
    aTitle = None
    aScore = None
    complete = None
    submitted = None
    dateSubmitted = None
    dateWithdrawn = None
    review = {}
    reviewer = {}
    reviewers = []
    decision = None
    dateDecided = None

    latestAssessment = getLast([
        rec
        for rec in record.get(N.assessment, [])
        if cType is not None and
        rec.get(N.assessmentType, None) == cType
    ])

    if latestAssessment is not None:
      aId = latestAssessment.get(N._id, None)
      aType = latestAssessment.get(N.assessmentType, None)
      aTitle = latestAssessment.get(N.title, None)

      latestCentries = [
          rec
          for rec in latestAssessment.get(N.criteriaEntry, [])
          if (
              aId is not None and
              rec.get(N.criteria, None) is not None and
              rec.get(N.assessment, None) == aId
          )
      ]
      complete = all(
          rec.get(N.score, None) and rec.get(N.evidence, None)
          for rec in latestCentries
      )
      aScore = self.computeScore(latestCentries)

      submitted = latestAssessment.get(N.submitted, None)
      dateSubmitted = latestAssessment.get(N.dateSubmitted, None)
      dateWithdrawn = latestAssessment.get(N.dateWithdrawn, None)

      reviewer[N.expert] = latestAssessment.get(N.reviewerE, None)
      reviewer[N.final] = latestAssessment.get(N.reviewerF, None)
      reviewers = sorted({reviewer[N.expert], reviewer[N.final]} - {None})

      latestReview = {}
      review = {}

      for kind in (N.expert, N.final):
        thisReview = getLast([
            rec
            for rec in record.get(N.review, [])
            if (
                cType is not None and
                aId is not None and
                reviewer[kind] is not None and
                rec.get(N.reviewType) == cType and
                rec.get(N.assessment, None) == aId and
                rec.get(N.creator, None) == reviewer[kind]
            )
        ])
        latestReview[kind] = thisReview
        review[kind] = (thisReview or {}).get(N._id, None)

      refReview = latestReview[N.final]
      if refReview is not None:
        decision = decisions.get(refReview.get(N.decision, None), None)
        dateDecided = refReview.get(N.dateDecided, None)

    return {
        N._id: cId,
        N.contribType: cType,
        N.contribTitle: cTitle,
        N.selected: record.get(N.selected, None),
        N.assessment: aId,
        N.assessmentType: aType,
        N.assessmentTitle: aTitle,
        N.score: aScore,
        N.complete: complete,
        N.submitted: submitted,
        N.dateSubmitted: dateSubmitted,
        N.dateWithdrawn: dateWithdrawn,
        N.review: review,
        N.reviewer: reviewer,
        N.reviewers: reviewers,
        N.decision: decision,
        N.dateDecided: dateDecided,
    }


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
            entries.get(detailTable, {}).values(),
            key=lambda r: r.get(N.dateCreated, 0),
        ):
          masterId = record.get(masterTable, None)
          if masterId:
            entries.get(masterTable, {}).get(masterId, {}).setdefault(
                detailTable, []
            ).append(record)
