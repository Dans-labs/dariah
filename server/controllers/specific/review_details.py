from controllers.config import Config as C, Names as N
from controllers.details import Details
from controllers.utils import pick as G
from controllers.html import HtmlElements as H


CW = C.web

ORPHAN_MSG = CW.messages[N.orphanedReviewer]


class ReviewD(Details):
  def __init__(self, recordObj):
    super().__init__(recordObj)

  def wrap(self):
    record = self.record
    eid = self.eid
    wfitem = self.wfitem

    (reviewer, kind) = wfitem.attributes(
        N.review, eid,
        N.reviewer, N.kind,
    )

    thisReviewer = G(reviewer, kind)
    creatorId = G(record, N.creator)

    (frozen, statusRep) = wfitem.status(N.review, eid)

    orphaned = creatorId is None or thisReviewer != creatorId
    if orphaned:
      self.fetchDetails(N.reviewEntry)
      entryPart = self.wrapDetail(N.reviewEntry, extraMsg=ORPHAN_MSG, extraCls="warning")
      return H.div(
          [
              entryPart,
              statusRep,
          ]
      )

    return H.div(
        statusRep
    )
