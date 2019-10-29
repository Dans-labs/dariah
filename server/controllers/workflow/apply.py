from controllers.config import Config as C, Names as N
from controllers.utils import getLast, pick as G, E
from controllers.html import HtmlElements as H


CT = C.tables
CF = C.workflow

USER_TABLES_LIST = CT.userTables
USER_TABLES = set(USER_TABLES_LIST)

FROZEN_REASONS = CF.frozenReasons


class WorkflowItem(object):
  def __init__(self, wf, data):
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
        if table == N.contrib else
        G(G(data, N.assessmentIndex), str(eid))
        if table == N.assessment else
        G(G(data, N.reviewIndex), str(eid))
        if table == N.review else
        None
    )

  def attributes(self, table, eid, *atts):
    data = self.data

    thisData = self._getWf(table, eid=eid)
    return (
        G(data, N._id) if att is None else G(thisData, att)
        for att in atts
    )

  def attributesA(self, table, eid, *atts):
    thatData = self._getWf(table, eid=eid)
    thisData = (
        G(thatData, N.assessmentStatus)
        if table == N.contrib else
        thatData
    )
    return (G(thisData, att) for att in atts)

  def permission(self, table, eid, action):
    uid = self.uid

    if (
        uid is None or
        table not in USER_TABLES
    ):
      return False

    (hasValid,) = self.attributesA(
        table, eid,
        N.hasValid,
    )
    (creator, reviewIndex, reviews) = self.attributes(
        table, eid,
        N.creator, N.reviewIndex, N.reviews
    )

    finalReview = getLast(G(reviews, N.final))
    finalReviewWf = G(reviewIndex, finalReview)
    decision = G(finalReviewWf, N.decision)
    isDecided = decision not in {None, N.Revise}

    if isDecided:
      return False

    if table == N.contrib:
      if action == N.startAssessment:
        return (
            not hasValid and
            uid == creator
        )
      return False

    (complete, submitted, dateSubmitted, dateWithdrawn, reviewer) = self.attributes(
        table, eid,
        N.complete, N.submitted, N.dateSubmitted, N.dateWithdrawn, N.reviewer,
    )
    newKind = (
        N.expert
        if G(reviewer, N.expert) == uid else
        N.final
        if G(reviewer, N.final) == uid else
        None
    )
    if table == N.assessment:
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

    if table == N.review:
      if action == N.decideExpertReview:
        pass

      return False

    return False

  def status(self, table, eid):
    uid = self.uid

    (
        contribId, creator, cls, rep, frozen, valid, validRel, kind,
        dateSubmitted, reviewer,
    ) = self.attributes(
        table, eid,
        None, N.creator, N.cls, N.rep, N.frozen, N.valid, N.validRel, N.kind,
        N.dateSubmitted, N.reviewer,
    )

    frozen = frozen or 0
    reason = FROZEN_REASONS[frozen]
    frozenCls = f"frozen{frozen}"

    contribRep = (
        H.span(
            rep,
            cls=f"large status {cls}",
        )
        if table == N.contrib else
        E
    )

    (cls, rep, score) = self.attributesA(
        table, eid,
        N.cls, N.rep, N.score,
    )

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

    scoreParts = presentScore(
        score,
        table,
        eid,
    )
    scorePart = (
        H.span(scoreParts)
        if table == N.assessment else
        (scoreParts[0] if scoreParts else E)
        if table == N.contrib else
        E
    )
    validPart = E
    if table in {N.assessment, N.review}:
      preYes = "THE "
      preNo = "not a "
      clsYes = "good"
      clsNo = "error"
      post = E
      cond = valid

      if table == N.review:
        cond = validRel
        if not valid:
          preYes = E
          post = " for this assessment"
          clsYes = "warning"

      validPart = (
          H.span(
              f"{preYes}valid {kind} {table}{post}",
              cls=f"large status {clsYes}",
          )
          if cond else
          H.span(
              f"{preNo}valid {kind} {table}{post}",
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

    itemKey = f"""{table}/{eid}"""
    rButton = H.iconr(itemKey, "#workflow", msg=N.status)

    actionPart = E
    if (
        uid is not None and
        uid == creator and
        table in USER_TABLES_LIST[0:2]
    ):
      if table == N.contrib:
        if self.permission(table, eid, N.startAssessment):
          dTable = N.assessment
          actionPart = H.a(
              f"Start {dTable}",
              f"""/api/{table}/{eid}/{dTable}/{N.insert}""",
              title=f"""New {dTable}""",
              cls=f"large step info",
          )
      elif table == N.assessment:
        if not valid:
          actionPart = H.span(
              "There is no workflow for invalid items",
              cls=f"large step info",
          )
        else:
          if self.permission(table, eid, N.submitAssessment):
            dTable = N.review

            actionParts = []

            if self.permission(table, eid, N.withdrawAssessment):
              actionParts.append(H.span(
                  f"Withdraw {table}",
                  table=table,
                  eid=eid,
                  field=N.submitted,
                  qvalue="",
                  after=f"/{N.contrib}/item/{contribId}",
                  title=f"""Withdraw this {table} from review""",
                  cls=f"large step error",
              ))
            if self.permission(table, eid, N.submitAssessment):
              verb = "Submit" if not dateSubmitted else "Resubmit"
              actionParts.append(H.span(
                  f"{verb} {table}",
                  table=table,
                  eid=eid,
                  field=N.submitted,
                  qvalue="1",
                  after=f"/{N.contrib}/item/{contribId}",
                  title=f"""{verb} this {table} for review""",
                  cls=f"large step info",
              ))
            if self.permission(table, eid, N.startReview):

              newKind = (
                  N.expert
                  if G(reviewer, N.expert) == uid else
                  N.final
                  if G(reviewer, N.final) == uid else
                  None
              )
              actionParts.append(H.a(
                  f"Start {newKind} {dTable}",
                  f"""/api/{table}/{eid}/{dTable}/{N.insert}""",
                  title=f"""New {dTable}""",
                  cls=f"large step info",
              ))

            actionPart = H.join(actionParts)

      elif table == N.review:
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


def presentScore(score, table, eid, derivation=True):
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
      f"""{table}/{eid}/scorebox""",
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
