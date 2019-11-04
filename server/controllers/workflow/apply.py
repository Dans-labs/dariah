from controllers.config import Config as C, Names as N
from controllers.utils import pick as G, E, now
from controllers.html import HtmlElements as H


CT = C.tables
CF = C.workflow

USER_TABLES_LIST = CT.userTables
USER_TABLES = set(USER_TABLES_LIST)

STAGE_ATTS = CF.stageAtts
COMMANDS = CF.commands
COMMAND_FIELDS = CF.commandFields
STATUS_REP = CF.statusRep
DECISION_DELAY = CF.decisionDelay


class WorkflowItem:
    def __init__(self, wf, data):
        self.auth = wf.auth
        self.uid = wf.uid
        self.eppn = wf.eppn
        self.data = data
        self.mykind = self.myReviewerKind()

    def updateData(self, info):
        data = self.data

        data.clear()
        data.update(info)

    def clearData(self):
        data = self.data

        data.clear()

    def _getWf(self, table, kind=None):
        data = self.data
        if table == N.contrib:
            return data

        data = G(data, N.assessment)
        if table in {N.assessment, N.criteriaEntry}:
            return data

        if table in {N.review, N.reviewEntry}:
            data = G(G(data, N.reviews), kind)
            return data

        return None

    def getKind(self, table, record):
        if table in {N.review, N.reviewEntry}:
            eid = G(record, N._id) if table == N.review else G(record, N.review)
            data = self._getWf(N.assessment)
            reviews = G(data, N.reviews, default={})
            kind = (
                N.expert
                if G(G(reviews, N.expert), N._id) == eid
                else N.final
                if G(G(reviews, N.final), N._id) == eid
                else None
            )
        else:
            kind = None
        return kind

    def myReviewerKind(self, reviewer=None):
        uid = self.uid

        if reviewer is None:
            reviewer = G(self._getWf(N.assessment), N.reviewer)

        return (
            N.expert
            if G(reviewer, N.expert) == uid
            else N.final
            if G(reviewer, N.final) == uid
            else None
        )

    def isValid(self, table, eid, record):
        if eid is None:
            return False

        refId = (
            G(record, N.assessment)
            if table == N.criteriaEntry
            else G(record, N.review)
            if table == N.reviewEntry
            else eid
        )
        if refId is None:
            return False

        if table in {N.contrib, N.assessment, N.criteriaEntry}:
            data = self._getWf(table)
            return refId == G(data, N._id)
        elif table in {N.review, N.reviewEntry}:
            data = self._getWf(N.assessment)
            reviews = G(data, N.reviews, default={})
            return refId in {
                G(reviewInfo, N._id) for (kind, reviewInfo) in reviews.items()
            }

    def info(self, table, *atts, kind=None):
        data = self.data

        thisData = self._getWf(table, kind=kind)
        return (G(data, N._id) if att is None else G(thisData, att) for att in atts)

    def permission(self, table, command, kind=None):
        auth = self.auth
        uid = self.uid

        allowedCommands = G(COMMANDS, table, default={})
        if command not in allowedCommands:
            return False

        if uid is None or table not in USER_TABLES:
            return False

        myKind = self.mykind

        (locked, frozen, mayAdd, stage, creator, country) = self.info(
            table,
            N.locked,
            N.frozen,
            N.mayAdd,
            N.stage,
            N.creator,
            N.country,
            kind=kind,
        )

        if table == N.contrib:
            isCoord = auth.coordinator(country=country)
            isSuper = auth.superuser()
            if uid != creator and not isCoord and not isSuper:
                return False

            inDelay = False
            if isCoord:
                (dateDecided,) = self.info(table, N.dateDecided, kind=kind)
                inDelay = now() < dateDecided + DECISION_DELAY

            if command == N.selectContrib:
                return isCoord and (not frozen or inDelay)

            if command == N.deselectContrib:
                return isCoord and (not frozen or inDelay)

            if command == N.unselectContrib:
                return isCoord and (not frozen or inDelay)

            if command == N.startAssessment:
                return mayAdd and not frozen and not locked

            return False

        if locked or frozen:
            return False

        if table == N.assessment:
            if uid != creator:
                return False

            if command == N.submitAssessment:
                return stage == N.complete

            if command == N.withdrawAssessment:
                return True

            if command == N.submitRevision:
                return stage == N.completeRevised

            if command == N.startReview:
                return G(mayAdd, myKind)

            return False

        if table == N.review:
            commandInfo = G(allowedCommands, command)
            commandKind = G(commandInfo, N.kind)
            if not kind or kind != commandKind or kind != myKind:
                return False

            if command in {
                N.expertReviewRevise,
                N.expertReviewAccept,
                N.expertReviewReject,
            }:
                return not locked and kind == N.expert

            if command in {
                N.finalReviewRevise,
                N.finalReviewAccept,
                N.finalReviewReject,
            }:
                (dateDecided,) = self.info(table, N.dateDecided, kind=kind)
                inDelay = now() < dateDecided + DECISION_DELAY

                return (not locked or inDelay) and kind == N.final

            return False

        return False

    def statusOverview(self, table, eid, kind=None):
        (stage, locked, frozen, score) = self.info(
            table, N.stage, N.locked, N.frozen, N.score, kind=kind
        )
        stageInfo = G(STAGE_ATTS, stage)
        statusMsg = G(stageInfo, N.msg)
        statusCls = G(stageInfo, N.cls)
        lockedMsg = G(STATUS_REP, N.locked) if locked else E
        lockedCls = N.locked if locked else E
        frozenMsg = G(STATUS_REP, N.frozen) if frozen else E
        frozenCls = N.frozen if frozen else E

        statusRep = H.div(
            [
                H.span(statusMsg, cls=f"large status {statusCls}"),
                E if frozen else H.span(lockedMsg, cls=f"large status {lockedCls}"),
                H.span(frozenMsg, cls=f"small status info"),
            ],
            cls=frozenCls,
        )

        scorePart = E
        if table == N.assessment:
            scoreParts = presentScore(score, table, eid)
            scorePart = (
                H.span(scoreParts)
                if table == N.assessment
                else (scoreParts[0] if scoreParts else E)
                if table == N.contrib
                else E
            )

        return H.div([statusRep, scorePart], cls="workflow-line")

    def status(self, table, eid, kind=None):
        itemKey = f"""{table}/{eid}"""
        rButton = H.iconr(itemKey, "#workflow", msg=N.status)

        return H.div(
            [
                rButton,
                self.statusOverview(table, eid, kind=kind),
                self.commands(table, eid, kind=kind),
            ],
            cls=f"workflow",
        )

    def commands(self, table, eid, kind=None):
        uid = self.uid

        if not uid or table not in USER_TABLES:
            return E

        commandParts = []

        allowedCommands = G(COMMANDS, table, default={})

        for (command, commandInfo) in sorted(allowedCommands.items()):
            if not self.permission(table, command, kind=kind):
                continue

            commandMsg = G(commandInfo, N.msg)
            commandCls = G(commandInfo, N.cls)

            commandPart = H.a(
                commandMsg,
                f"""/api/command/{command}/{table}/{eid}""",
                cls=f"large command {commandCls}",
            )
            commandParts.append(commandPart)

        return H.join(commandParts)

    def isCommand(self, fieldObj):
        table = fieldObj.table
        field = fieldObj.field

        commandFields = set(G(COMMAND_FIELDS, table, default=[]))
        return field in commandFields

    def doCommand(self, command, recordObj):
        table = recordObj.table
        eid = recordObj.eid
        kind = recordObj.kind
        commands = G(COMMANDS, table)

        if self.permission(table, command, kind=kind):
            commandInfo = commands[command]
            operator = G(commandInfo, N.operator)
            if operator == N.add:
                tableObj = recordObj.tableObj

                contribId = (
                    tableObj.insert(masterTable=table, masterId=eid, force=True) or E
                )
            elif operator == N.set:
                field = G(commandInfo, N.field)
                value = G(commandInfo, N.value)
                recordObj.field(field, mayEdit=True).save(value)
        return f"""/{N.contrib}/{N.mylist}/{contribId}"""

    def checkFixed(self, recordObj):
        table = recordObj.table
        kind = recordObj.kind

        (frozen, locked) = self.info(table, N.frozen, N.locked, kind=kind)
        return frozen or locked


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
        openAtts=dict(cls="button small", title="Show derivation"),
        closeAtts=dict(cls="button small", title="Hide derivation"),
    )
    return (fullScore, *scoreWidget)
