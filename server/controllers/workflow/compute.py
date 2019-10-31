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


class Workflow:
    def __init__(self, db):
        self.db = db
        decisionRecords = db.getValueRecords(N.decision)
        self.decisions = {
            G(record, N._id): G(record, N.rep) for record in decisionRecords
        }
        self.decisionParticiple = {
            G(record, N._id): G(record, N.participle) for record in decisionRecords
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
        self.auth = auth
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
                if table == MAIN_TABLE
                else {N.contrib: contribId}
                if table in CT.userTables
                else {INTER_TABLE: inCrit(G(entries, INTER_TABLE, default={}))}
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
        country = G(record, N.country)
        selected = G(record, N.selected)

        stage = (
            N.selectNone
            if selected
            else N.selectYes
            if selected is not None
            else N.selectNo
        )
        frozen = stage != N.selectNone

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

        (assessmentValid, locked, mayAdd) = self.extendWorkflow(
            contribType, frozen, assessments, assessmentIndex, reviewIndex,
        )

        return {
            N._id: contribId,
            N.creator: creator,
            N.country: country,
            N.type: contribType,
            N.title: contribTitle,
            N.stage: stage,
            N.frozen: frozen,
            N.locked: locked,
            N.mayAdd: mayAdd,
            N.selected: G(record, N.selected),
            N.assessments: assessmentIds,
            N.assessmentValid: assessmentValid,
            N.assessmentIndex: assessmentIndex,
            N.reviewIndex: reviewIndex,
        }

    def extendWorkflow(
        self, contribType, frozen, assessments, assessmentIndex, reviewIndex,
    ):
        ref = getLast(
            [
                attributes
                for attributes in assessments
                if contribType is not None and G(attributes, N.type) == contribType
            ]
        )
        locked = False
        assessmentValid = str(G(ref, N._id, default=E))
        finalReviewStage = None

        if assessmentValid:
            assessmentRecord = assessmentIndex[assessmentValid]
            assessmentRecord.update(
                {N.valid: True, N.frozen: frozen}
            )
            reviewValid = G(
                G(assessmentIndex, assessmentValid), N.reviewValid, default={}
            )
            for (kind, reviewId) in reviewValid.items():
                reviewRecord = G(reviewIndex, reviewId)
                reviewRecord.update(
                    {N.valid: True, N.frozen: frozen}
                )

            expertReviewId = G(reviewValid, N.expert)
            expertReviewRecord = G(reviewIndex, expertReviewId)
            expertReviewStage = G(expertReviewRecord, N.stage)
            finalReviewId = G(reviewValid, N.final)
            finalReviewRecord = G(reviewIndex, finalReviewId)
            finalReviewStage = G(finalReviewRecord, N.stage)
            if finalReviewRecord:
                if expertReviewStage:
                    if not finalReviewStage:
                        finalReviewRecord[N.locked] = False
                else:
                    finalReviewRecord[N.locked] = True

            if finalReviewStage:
                if finalReviewStage == N.reviewRevise:
                    finalReviewDate = G(finalReviewRecord, N.datedecided)
                    newAstage = None
                    aStage = G(assessmentRecord, N.stage)
                    if aStage == N.submitted:
                        if finalReviewDate < G(assessmentRecord, N.dateSubmitted):
                            newAstage = N.submittedRevised
                            locked = True
                    elif aStage == N.complete:
                        newAstage = N.completeRevised
                    elif aStage == N.incomplete:
                        newAstage = N.incompleteRevised
                    if newAstage:
                        assessmentRecord[N.stage] = newAstage
                else:
                    locked = True
                    finalReviewRecord[N.locked] = True
                    expertReviewRecord[N.locked] = True
                    assessmentRecord[N.locked] = True

                mayAddR = {
                    kind: not locked and not frozen and not G(reviewValid, kind)
                    for kind in reviewValid
                }
                assessmentRecord[N.mayAdd] = mayAddR

        mayAdd = not locked and not frozen and not assessmentValid
        return (assessmentValid, locked, mayAdd)

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
                assessmentId is not None
                and G(rec, N.criteria) is not None
                and G(rec, N.assessment) == assessmentId
            )
        ]
        complete = len(centries) == nCriteria and all(
            G(rec, N.score) and G(rec, N.evidence) for rec in centries
        )
        submitted = G(record, N.submitted)
        dateSubmitted = G(record, N.dateSubmitted)
        dateWithdrawn = G(record, N.dateWithdrawn)
        if submitted:
            stage = N.submitted
        else:
            if complete:
                stage = N.complete
            else:
                stage = N.incomplete

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
                if G(rec, N.creator) is not None and G(rec, N.creator) == theReviewer:
                    reviewWf = self.computeWorkflowReview(
                        kind, rec, reviewer, assessmentType, contribType,
                    )
                    reviewId = str(G(reviewWf, N._id, default=E))
                    reviews.setdefault(kind, []).append(reviewId)
                    reviewIndex[reviewId] = reviewWf

        reviewValid = {
            kind: getLast(
                [
                    rId
                    for rId in theReviews or []
                    if (
                        assessmentType is not None
                        and G(G(reviewIndex, rId), N.type) == assessmentType
                    )
                ]
            )
            for (kind, theReviews) in reviews.items()
        }

        return {
            N._id: assessmentId,
            N.creator: creator,
            N.type: assessmentType,
            N.title: assessmentTitle,
            N.goodType: (assessmentType is not None and assessmentType == contribType),
            N.score: score,
            N.complete: complete,
            N.submitted: submitted,
            N.dateSubmitted: dateSubmitted,
            N.dateWithdrawn: dateWithdrawn,
            N.stage: stage,
            N.reviewer: reviewer,
            N.reviewers: reviewers,
            N.reviews: reviews,
            N.reviewValid: reviewValid,
            N.reviewIndex: reviewIndex,
        }

    def computeWorkflowReview(
        self, kind, record, reviewer, assessmentType, contribType
    ):
        decisions = self.decisions

        reviewId = G(record, N._id)
        reviewType = G(record, N.reviewType)
        reviewTitle = G(record, N.reviewTitle)
        creator = G(record, N.creator)
        decision = G(decisions, G(record, N.decision))
        decisionRep = G(decisions, decision)
        dateDecided = G(record, N.dateDecided)

        if kind == N.expert:
            if decisionRep:
                stage = N.reviewExpert
        else:
            if decisionRep == N.Accept:
                stage = N.reviewAccept
            elif decisionRep == N.Reject:
                stage = N.reviewReject
            elif decisionRep == N.Revise:
                stage = N.reviewRevise
            else:
                stage = None

        return {
            N._id: reviewId,
            N.creator: creator,
            N.type: reviewType,
            N.title: reviewTitle,
            N.goodType: (
                reviewType is not None
                and reviewType == assessmentType
                and reviewType == contribType
            ),
            N.kind: kind,
            N.dateDecided: dateDecided,
            N.stage: stage,
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
                serverprint(
                    f"WORKFLOW: {masterTable}: lookup details from {detailTable}"
                )
                for record in sorted(
                    G(entries, detailTable, default={}).values(),
                    key=lambda r: G(r, N.dateCreated, default=0),
                ):
                    masterId = G(record, masterTable)
                    if masterId:
                        entries.setdefault(masterTable, {}).setdefault(
                            masterId, {}
                        ).setdefault(detailTable, []).append(record)
