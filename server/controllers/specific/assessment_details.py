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
    workflow = self.workflow
    reviewers = workflow.reviewers
    reviewerE = workflow.reviewerE
    reviewerF = workflow.reviewerF

    self.fetchDetails(N.criteriaEntry, sortKey=cEntrySort)

    criteriaPart = self.wrapDetail(
        N.criteriaEntry,
        bodyMethod=N.compact,
    )

    self.fetchDetails(
        N.review,
        sortKey=lambda r: r.get(N.dateCreated, 0),
    )

    reviewer = {N.expert: reviewerE, N.final: reviewerF}
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

    return H.div(
        [
            criteriaPart,
            H.div(REVIEW_DECISION, cls="head"),
            reviewPart,
        ],
    )


def cEntrySort(r):
  return (r[N.assessment], r.get(N.seq, None) or 0)
