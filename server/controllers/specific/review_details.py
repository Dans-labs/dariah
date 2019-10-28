from controllers.config import Config as C, Names as N
from controllers.details import Details
from controllers.utils import pick as G
from controllers.html import HtmlElements as H
from controllers.workflow import wfStatus, getWf


CW = C.web

ORPHAN_MSG = CW.messages[N.orphanedReviewer]


class ReviewD(Details):
  def __init__(self, recordObj):
    super().__init__(recordObj)

  def wrap(self):
    uid = self.uid
    record = self.record
    eid = self.eid
    workflow = self.workflow

    thisWf = getWf(workflow, N.review, eid=eid)
    reviewer = G(thisWf, N.reviewer, default={})
    kind = G(thisWf, N.kind)
    thisReviewer = G(reviewer, kind)
    creatorId = G(record, N.creator)

    (frozen, statusRep) = wfStatus(workflow, N.review, eid, uid)

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
