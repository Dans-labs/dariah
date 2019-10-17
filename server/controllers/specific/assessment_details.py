from controllers.config import Config as C, Names as N
from controllers.details import Details
from controllers.html import HtmlElements as H
from controllers.utils import cap1, E


CT = C.tables
CW = C.web

CONSTRAINED = CT.constrained

ORPHAN = CW.unknown[N.reviewKind]
QQ = CW.unknown[N.generic]
REVIEW_DECISION = CW.messages[N.reviewDecision]


class AssessmentD(Details):
  def __init__(self, recordObj):
    super().__init__(recordObj)

  def wrap(self):
    details = self.details
    perm = self.perm
    reviewerE = perm[N.reviewerE]
    reviewerF = perm[N.reviewerF]

    self.fetchDetails(
        N.review,
        sortKey=lambda r: r.get(N.dateCreated, 0),
    )
    (tableObj, records) = details.get(N.review, (None, []))
    if not tableObj:
      return E

    reviewer = {N.expert: reviewerE, N.final: reviewerF}
    byReviewer = {N.expert: [], N.final: []}

    self.fetchDetails(N.review)
    self.fetchDetails(N.criteriaEntry, sortKey=cEntrySort)

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

    criteriaPart = self.wrapDetail(
        N.criteriaEntry,
        bodyMethod=N.compact,
    )

    reviewPart = H.div(
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
    return H.div(
        [
            criteriaPart,
            H.div(REVIEW_DECISION, cls="head"),
            reviewPart,
        ],
    )


def cEntrySort(r):
  return (r[N.assessment], r.get(N.seq, None) or 0)