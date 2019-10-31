from controllers.config import Config as C, Names as N
from controllers.utils import pick as G, E
from controllers.html import HtmlElements as H


CT = C.tables
CF = C.workflow

USER_TABLES_LIST = CT.userTables
USER_TABLES = set(USER_TABLES_LIST)

STAGES = CF.stages

STAGE_ATTS = CF.stageAtts
ACTIONS = CF.actions
STATUS_REP = CF.statusRep


class WorkflowItem:
    def __init__(self, wf, data):
        self.auth = wf.auth
        self.uid = wf.uid
        self.eppn = wf.eppn
        self.data = data

    def updateData(self, attributes):
        data = self.data

        data.clear()
        data.update(attributes)

    def clearData(self):
        data = self.data

        data.clear()

    def _getWf(self, table, eid=None):
        self.table = table
        self.eid = eid

        data = self.data

        return (
            data
            if table == N.contrib
            else G(G(data, N.assessmentIndex), str(eid))
            if table == N.assessment
            else G(G(data, N.reviewIndex), str(eid))
            if table == N.review
            else None
        )

    def getKindReviewer(self, reviewer):
        uid = self.uid

        return (
            N.expert
            if G(reviewer, N.expert) == uid
            else N.final
            if G(reviewer, N.final) == uid
            else None
        )

    def attributes(self, table, eid, *atts):
        data = self.data

        thisData = self._getWf(table, eid=eid)
        return (G(data, N._id) if att is None else G(thisData, att) for att in atts)

    def permission(self, table, eid, action):
        auth = self.auth
        uid = self.uid

        allowedActions = set(G(ACTIONS, table, default=[]))
        if action not in allowedActions:
            return False

        if uid is None or table not in USER_TABLES:
            return False

        (locked, frozen, mayAdd) = self.attributes(
            table, eid, N.locked, N.frozen, N.mayAdd,
        )
        (assessmentValid,) = self.attributes(N.contrib, None, N.assessmentValid,)
        (stage, creator, country) = self.attributes(
            table, eid, N.stage, N.creator, N.country,
        )

        if table == N.contrib:
            isCoord = auth.coordinator(country=country)
            isSuper = auth.superuser()
            if uid != creator and not isCoord and not isSuper:
                return False

            if action == N.selectContrib:
                return isCoord and not frozen

            if action == N.deselectContrib:
                return isCoord and not frozen

            if action == N.unselectContrib:
                return isSuper

            if action == N.startAssessment:
                return mayAdd and not frozen and not locked

            return False

        if locked or frozen:
            return False

        (reviewer,) = self.attributes(table, eid, N.reviewer,)

        if table == N.assessment:
            if uid != creator or eid != assessmentValid:
                return False

            if action == N.submitAssessment:
                return stage == N.complete

            if action == N.withdrawAssessment:
                return True

            if action == N.submitRevision:
                return stage == N.completeRevised

            if action == N.startReview:
                kind = self.getReviewKind(reviewer)
                return G(mayAdd, kind)

            return False

        return False

    def statusOverview(self, table, eid):
        (stage, locked, frozen, valid, score,) = self.attributes(
            table, eid, N.stage, N.locked, N.frozen, N.valid, N.score,
        )
        stageInfo = G(STAGE_ATTS, stage)
        statusMsg = G(stageInfo, N.msg)
        statusCls = G(stageInfo, N.cls)
        invalidMsg = None
        invalidCls = None
        if not valid and table != N.contrib:
            invalidMsg = f"{G(STATUS_REP, N.invalid)} {table}"
            invalidCls = "warning"
        lockedMsg = G(STATUS_REP, N.locked) if locked else E
        lockedCls = N.locked if locked else E
        frozenMsg = G(STATUS_REP, N.frozen) if frozen else E
        frozenCls = N.frozen if frozen else E

        invalidStatus = E if invalidMsg is None else H.span(invalidMsg, cls=invalidCls,)
        statusRep = H.div(
            [
                invalidStatus,
                H.span(statusMsg, cls=f"large status {statusCls}",),
                H.span(lockedMsg, cls=f"large status {lockedCls}",),
                H.span(frozenMsg, cls=f"small status info",),
            ],
            cls=frozenCls,
        )

        scorePart = E
        if table == N.assessment:
            scoreParts = presentScore(score, table, eid,)
            scorePart = (
                H.span(scoreParts)
                if table == N.assessment
                else (scoreParts[0] if scoreParts else E)
                if table == N.contrib
                else E
            )

        return H.div([statusRep, scorePart], cls="workflow-line",)

    def actions(self, table, eid):
        uid = self.uid

        (
            contribId,
            creator,
            stage,
            valid,
            validRelative,
            score,
            kind,
            reviewer,
        ) = self.attributes(
            table,
            eid,
            None,
            N.creator,
            N.stage,
            N.valid,
            N.validRelative,
            N.score,
            N.kind,
            N.reviewer,
        )

        if not uid or table not in USER_TABLES:
            return E

        actionParts = []

        allowedActions = set(G(ACTIONS, table, default=[]))

        for action in allowedActions:
            if not self.permission(table, eid, action):
                continue

            actionInfo = G(allowedActions, action)
            actionMsg = G(actionInfo, N.msg)
            actionCls = G(actionInfo, N.Cls)
            actionAction = G(actionInfo, N.action)
            actionTable = G(actionInfo, N.actionTable)
            actionField = G(actionInfo, N.actionField)
            actionValue = G(actionInfo, N.actionValue)

            actionPart = (
                H.a(
                    actionMsg,
                    f"""/api/{table}/{eid}/{actionTable}/{N.insert}""",
                    cls=f"large step {actionCls}",
                )
                if actionAction == N.add
                else H.span(
                    actionMsg,
                    table=table,
                    eid=eid,
                    field=actionField,
                    qvalue=actionValue,
                    after=f"/{N.contrib}/item/{contribId}",
                    cls=f"large step {actionCls}",
                )
                if actionAction == N.set
                else E
            )

            actionParts.append(actionPart)

        return H.join(actionParts)

    def status(self, table, eid):
        itemKey = f"""{table}/{eid}"""
        rButton = H.iconr(itemKey, "#workflow", msg=N.status)

        return H.div(
            [rButton, self.statusOverview(table, eid), self.actions(table, eid)],
            cls=f"workflow",
        )


def presentScore(score, table, eid, derivation=True):
    overall = G(score, N.overall, default=0)
    relevantScore = G(score, N.relevantScore, default=0)
    relevantMax = G(score, N.relevantMax, default=0)
    relevantN = G(score, N.relevantN, default=0)
    allMax = G(score, N.allMax, default=0)
    allN = G(score, N.allN, default=0)
    irrelevantN = allN - relevantN

    fullScore = H.span(
        f"Score {overall}%", title="overall score of this assessment", cls="ass-score",
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
                        if irrelevantN
                        else E
                    ),
                    H.p(
                        f"""The total score is expressed as a percentage:
                          the fraction of {relevantScore} scored points
                          with respect to {relevantMax} scorable points:
                          {overall}%.
                      """
                    ),
                ],
                cls="ass-score-deriv",
            ),
        ],
        cls="ass-score-box",
    )

    scoreWidget = H.detailx(
        (N.calc, N.dismiss),
        scoreMaterial,
        f"""{table}/{eid}/scorebox""",
        openAtts=dict(cls="button small", title="Show derivation",),
        closeAtts=dict(cls="button small", title="Hide derivation",),
    )
    return (fullScore, *scoreWidget)
