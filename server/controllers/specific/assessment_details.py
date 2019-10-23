from controllers.config import Config as C, Names as N
from controllers.details import Details
from controllers.html import HtmlElements as H
from controllers.utils import cap1, E


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
    reviewers = workflow.reviewers
    reviewer = workflow.reviewer

    self.fetchDetails(N.criteriaEntry, sortKey=cEntrySort)

    criteriaPart = self.wrapDetail(
        N.criteriaEntry,
        bodyMethod=N.compact,
    )

    self.fetchDetails(
        N.review,
        sortKey=lambda r: r.get(N.dateCreated, 0),
    )

    byReviewer = {N.expert: [], N.final: []}

    for dest in (N.expert, N.final):
      byReviewer[dest] = self.wrapDetail(
          N.review,
          filterFunc=lambda r: r.get(N.creator, None) == reviewer[dest],
          bodyMethod=N.compact,
          expanded=True,
          withProv=True,
          withN=False,
          inner=False,
      )

    orphanedReviews = self.wrapDetail(
        N.review,
        filterFunc=lambda r: r.get(N.creator, None) not in reviewers,
        withProv=True,
    )

    reviewPart = (
        H.div(
            [
                H.div(
                    [
                        H.div(
                            cap1(dest),
                            cls="head",
                        ),
                        byReviewer[dest],
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

    completeCls = "good" if workflow.complete else "warning"
    completePart = H.span(
        "Complete" if workflow.complete else "... not yet complete ...",
        cls=f"large status {completeCls}",
    )
    workflowPart = H.div(
        [
            rButton,
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
  return (r[N.assessment], r.get(N.seq, None) or 0)
