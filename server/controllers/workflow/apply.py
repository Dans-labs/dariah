from controllers.config import Config as C, Names as N
from controllers.utils import pick as G, E
from controllers.html import HtmlElements as H


CT = C.tables
CF = C.workflow

USER_TABLES_LIST = CT.userTables
USER_TABLES = set(USER_TABLES_LIST)

STAGE_ATTS = CF.stageAtts
COMMANDS = CF.commands
COMMAND_FIELDS = CF.commandFields
STATUS_REP = CF.statusRep


class WorkflowItem:
    def __init__(self, wf, data, table, record, eid):
        self.auth = wf.auth
        self.uid = wf.uid
        self.eppn = wf.eppn
        self.data = data

        valid = False
        if table == N.contrib:
            valid = True
        else:
            aId = G(self._getWf(N.assessment, None), N._id)
            if table in {N.assessment, N.criteriaEntry}:
                refId = eid if table == N.assessment else G(record, N.assessment)
                valid = refId == aId
            elif table in {N.review, N.reviewEntry}:
                rId = {
                    kind: G(self._getWf(N.reviews, kind))
                    for kind in {N.expert, N.final}
                }
                refId = eid if table == N.review else G(record, N.review)
                valid = refId in rId
            else:
                valid = False
        self.valid = valid

    def updateData(self, info):
        data = self.data

        data.clear()
        data.update(info)

    def clearData(self):
        data = self.data

        data.clear()

    def _getWf(self, table, kind):
        data = self.data
        if table == N.contrib:
            return data

        data = G(data, N.assessment)
        if table == {N.assessment, N.criteriaEntry}:
            return data

        data = G(G(data, N.reviews), kind)
        if table == {N.review, N.reviewEntry}:
            return data

        return None

    def getKindReviewer(self, reviewer):
        uid = self.uid

        return (
            N.expert
            if G(reviewer, N.expert) == uid
            else N.final
            if G(reviewer, N.final) == uid
            else None
        )

    def info(self, table, kind, *atts):
        data = self.data

        thisData = self._getWf(table, kind)
        return (G(data, N._id) if att is None else G(thisData, att) for att in atts)

    # TODO: workflow permissions for deleting records! (enforce frozen and locked)

    deliberately wrong syntax here

    def permission(self, table, kind, command):
        auth = self.auth
        uid = self.uid

        allowedCommands = set(G(COMMANDS, table, default=[]))
        if command not in allowedCommands:
            return False

        if uid is None or table not in USER_TABLES:
            return False

        (locked, frozen, mayAdd) = self.info(table, kind, N.locked, N.frozen, N.mayAdd,)
        (stage, creator, country) = self.info(
            table, kind, N.stage, N.creator, N.country,
        )

        if table == N.contrib:
            isCoord = auth.coordinator(country=country)
            isSuper = auth.superuser()
            if uid != creator and not isCoord and not isSuper:
                return False

            if command == N.selectContrib:
                return isCoord and not frozen

            if command == N.deselectContrib:
                return isCoord and not frozen

            if command == N.unselectContrib:
                return isSuper

            if command == N.startAssessment:
                return mayAdd and not frozen and not locked

            return False

        if locked or frozen:
            return False

        (reviewer,) = self.info(table, kind, N.reviewer,)
        kind = self.getReviewKind(reviewer)

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
                return G(mayAdd, kind)

            return False

        if table == N.review:
            if not kind:
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
                return not locked and kind == N.final

            return False

        return False

    def statusOverview(self, table, eid):
        (stage, locked, frozen, score,) = self.info(
            table, eid, N.stage, N.locked, N.frozen, N.score,
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

    def commands(self, table, eid):
        uid = self.uid

        (contribId, creator, stage, score, kind, reviewer,) = self.info(
            table, eid, None, N.creator, N.stage, N.score, N.kind, N.reviewer,
        )

        if not uid or table not in USER_TABLES:
            return E

        commandParts = []

        allowedCommands = set(G(COMMANDS, table, default=[]))

        kind = self.getKindReviewer(reviewer)

        for (command, commandInfo) in sorted(allowedCommands.items()):
            if not self.permission(table, kind, command):
                continue

            commandMsg = G(commandInfo, N.msg)
            commandCls = G(commandInfo, N.Cls)

            commandPart = H.a(
                commandMsg,
                f"""/api/command/{command}/{table}/{eid}""",
                cls=f"large step {commandCls}",
            )
            commandParts.append(commandPart)

        return H.join(commandParts)

    def status(self, table, eid):
        itemKey = f"""{table}/{eid}"""
        rButton = H.iconr(itemKey, "#workflow", msg=N.status)

        return H.div(
            [rButton, self.statusOverview(table, eid), self.commands(table, eid)],
            cls=f"workflow",
        )

    def checkFixed(self, fieldObj):
        table = fieldObj.table
        eid = fieldObj.eid

        (frozen, locked) = self.info(table, eid, N.frozen, N.locked,)
        return frozen or locked

    def isCommand(self, fieldObj):
        table = fieldObj.table
        field = fieldObj.field

        commandFields = set(G(COMMAND_FIELDS, table, default=[]))
        return field in commandFields

    def doCommand(self, command, recordObj):
        table = recordObj.table
        eid = recordObj.eid
        commands = G(COMMANDS, table)

        if self.permission(table, eid, command):
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
                recordObj.field(field).save(value, force=True)
        return f"""/{N.contrib}/{N.mylist}/{contribId}"""


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
