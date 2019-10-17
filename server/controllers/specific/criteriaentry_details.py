from controllers.config import Names as N
from controllers.details import Details
from controllers.html import HtmlElements as H
from controllers.utils import cap1, E


class CriteriaEntryD(Details):
  def __init__(self, recordObj):
    super().__init__(recordObj)

  def wrap(self):
    details = self.details
    perm = self.perm

    reviewerE = perm[N.reviewerE]
    reviewerF = perm[N.reviewerF]

    self.fetchDetails(
        N.reviewEntry,
        sortKey=lambda r: r.get(N.dateCreated, 0),
    )
    (tableObj, records) = details.get(N.reviewEntry, (None, []))
    if not tableObj:
      return E

    reviewer = {N.expert: reviewerE, N.final: reviewerF}
    byReviewer = {N.expert: [], N.final: []}

    for dest in (N.expert, N.final):
      byReviewer[dest] = self.wrapDetail(
          N.reviewEntry,
          filterFunc=lambda r: r.get(N.creator, None) == reviewer[dest],
          bodyMethod=N.compact,
          expanded=True,
          withProv=False,
          withN=False,
          inner=False,
      )

    return H.div(
        [
            H.div(
                [
                    H.div(
                        cap1(dest),
                        cls="head",
                    ),
                    byReviewer[dest],
                ],
                cls=f"reviewentries {dest}",
            )
            for dest in reviewer
        ],
        cls="reviewers",
    )
