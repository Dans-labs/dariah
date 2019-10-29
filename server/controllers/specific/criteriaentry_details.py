from controllers.config import Names as N
from controllers.details import Details
from controllers.html import HtmlElements as H
from controllers.utils import pick as G, cap1, E


class CriteriaEntryD(Details):
  def __init__(self, recordObj):
    super().__init__(recordObj)

  def wrap(self):
    details = self.details
    wfitem = self.wfitem
    record = self.record

    assessmentId = G(record, N.assessment)

    (reviewer,) = wfitem.attributes(
        N.assessment, assessmentId,
        N.reviewer,
    )

    self.fetchDetails(
        N.reviewEntry,
        sortKey=lambda r: G(r, N.dateCreated, default=0),
    )
    (tableObj, records) = G(details, N.reviewEntry, default=(None, []))
    if not tableObj:
      return E

    byReviewer = {N.expert: [], N.final: []}

    for dest in (N.expert, N.final):
      byReviewer[dest] = self.wrapDetail(
          N.reviewEntry,
          filterFunc=lambda r: G(r, N.creator) == G(reviewer, dest),
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
                    G(byReviewer, dest),
                ],
                cls=f"reviewentries {dest}",
            )
            for dest in reviewer
        ],
        cls="reviewers",
    )
