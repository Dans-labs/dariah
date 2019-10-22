from controllers.config import Config as C, Names as N
from controllers.utils import getLast, serverprint


CT = C.tables
MAIN_TABLE = CT.userTables[0]
WORKFLOW_TABLES = set(CT.userTables) | set(CT.userEntryTables)
WORKFLOW_FIELDS = CT.workflowFields
DETAILS = CT.details


class WorkflowItem(object):
  def __init__(self, workflowRecord):
    for (k, v) in workflowRecord.items():
      setattr(self, k, v)


def workflowRecord(control, contribId):
  attributes = control.getWorkflowItem(contribId)

  return WorkflowItem(attributes)


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

    fields = {field: True for field in WORKFLOW_FIELDS}
    entries = {}
    serverprint("WORKFLOW: Read user (entry) tables")
    for table in WORKFLOW_TABLES:
      entries[table] = db.entries(table, fields)
    self.entries = entries

    serverprint("WORKFLOW: Link masters and details")
    for (masterTable, detailTables) in DETAILS.items():
      if masterTable in WORKFLOW_TABLES:
        detailTablesWf = [
            detailTable
            for detailTable in detailTables
            if detailTable in WORKFLOW_TABLES
        ]
        self.linkDetails(masterTable, detailTablesWf)

    serverprint("WORKFLOW: Compute workflow info")
    wfRecords = []
    for mainRecord in entries[MAIN_TABLE].values():
      attributes = self.computeWorkflow(mainRecord)
      wfRecords.append(attributes)
    serverprint("WORKFLOW: Store workflow info")
    db.insertWorkflow(wfRecords)
    serverprint("WORKFLOW: Initialization done")

  def linkDetails(self, masterTable, detailsTables):
    entries = self.entries

    for detailsTable in detailsTables:
      serverprint(f"WORKFLOW: {masterTable}: lookup details from {detailsTable}")
      for record in sorted(
          entries.get(detailsTable, []).values(),
          key=lambda r: r.get(N.dateCreated, 0),
      ):
        masterId = record.get(masterTable, None)
        if masterId:
          entries.get(masterTable, {}).get(masterId, {}).setdefault(
              detailsTable, []
          ).append(record)

  def computeWorkflow(self, mainRecord):
    decisions = self.decisions

    cId = mainRecord.get(N._id, None)
    if cId is None:
      return {}

    cType = mainRecord.get(N.typeContribution, None)

    aId = None
    aType = None
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
        record
        for record in mainRecord.get(N.assessment, [])
        if cType is not None and
        record.get(N.assessmentType, None) == cType
    ])

    if latestAssessment is not None:
      aId = latestAssessment.get(N._id, None)
      aType = latestAssessment.get(N.assessmentType, None)

      latestCentries = [
          record
          for record in latestAssessment.get(N.criteriaEntry, [])
          if (
              aId is not None and
              record.get(N.criteria, None) is not None and
              record.get(N.assessment, None) == aId
          )
      ]
      complete = all(
          record.get(N.score, None) and record.get(N.evidence, None)
          for record in latestCentries
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
            record
            for record in mainRecord.get(N.review, [])
            if (
                cType is not None and
                aId is not None and
                reviewer[kind] is not None and
                record.get(N.reviewType) == cType and
                record.get(N.assessment, None) == aId and
                record.get(N.creator, None) == reviewer[kind]
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
        N.selected: mainRecord.get(N.selected, None),
        N.assessment: aId,
        N.assessmentType: aType,
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
