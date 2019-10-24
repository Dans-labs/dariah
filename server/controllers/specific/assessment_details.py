from controllers.config import Config as C, Names as N
from controllers.details import Details
from controllers.html import HtmlElements as H
from controllers.utils import pick as G, getLast, cap1, E


CT = C.tables
CW = C.web

REVIEW_DECISION = CW.messages[N.reviewDecision]


class AssessmentD(Details):
  def __init__(self, recordObj):
    super().__init__(recordObj)

  def wrap(self):
    eid = self.eid
    table = self.table
    workflow = self.workflow

    defAssessmentId = G(workflow, N.assessmentId)
    defPart = (
        E
        if defAssessmentId is None else
        H.span(
            "This is the authoritative assessment",
            cls="large status good",
        )
        if defAssessmentId == eid else
        H.span(
            "This assessment is not authoritative",
            cls="large status error",
        )
    )

    assessment = getLast([
        rec
        for rec in G(workflow, N.assessments, default=[])
        if G(rec, N._id) == eid
    ])

    reviewers = G(assessment, N.reviewers, default=set())
    reviewer = G(assessment, N.reviewer)
    complete = G(assessment, N.complete)
    score = G(assessment, N.score)

    self.fetchDetails(N.criteriaEntry, sortKey=cEntrySort)

    criteriaPart = self.wrapDetail(
        N.criteriaEntry,
        bodyMethod=N.compact,
    )

    self.fetchDetails(
        N.review,
        sortKey=lambda r: G(r, N.dateCreated, default=0),
    )

    byReviewer = {N.expert: [], N.final: []}

    for dest in (N.expert, N.final):
      byReviewer[dest] = self.wrapDetail(
          N.review,
          filterFunc=lambda r: G(r, N.creator) == G(reviewer, dest),
          bodyMethod=N.compact,
          withDetails=True,
          expanded=True,
          withProv=True,
          withN=False,
          inner=False,
      )

    orphanedReviews = self.wrapDetail(
        N.review,
        filterFunc=lambda r: G(r, N.creator) not in reviewers,
        withProv=True,
    )

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
    scorePart = (fullScore, *scoreWidget)

    reviewPart = (
        H.div(
            [
                H.div(
                    [
                        H.div(
                            cap1(dest),
                            cls="head",
                        ),
                        G(byReviewer, dest),
                    ],
                    cls=f"reviews {dest}",
                )
                for dest in reviewer
            ],
            cls="reviewers",
        )
        +
        (
            H.div(
                [
                    H.div(
                        cap1(N.orphaned) + " " + N.reviews,
                        cls="head",
                    ),
                    orphanedReviews,
                ],
            )
            if orphanedReviews else
            E
        )
    )

    itemKey = f"""{table}/{eid}"""
    rButton = H.iconr(itemKey, "#workflow", msg=N.status)

    newPart = H.a(
        "New review",
        f"""/api/{table}/{eid}/{N.review}/{N.insert}""",
        title=f"""New review""",
        cls=f"large step info",
    )

    completeCls = "good" if complete else "warning"
    completePart = H.span(
        "Complete" if complete else "... not yet complete ...",
        cls=f"large status {completeCls}",
    )
    workflowPart = H.div(
        [
            rButton,
            defPart,
            *scorePart,
            completePart,
        ],
        cls="workflow",
    )

    return H.div(
        [
            criteriaPart,
            workflowPart,
            H.div(REVIEW_DECISION, cls="head"),
            reviewPart,
            newPart,
        ],
    )


def cEntrySort(r):
  return (G(r, N.assessment), G(r, N.seq) or 0)
