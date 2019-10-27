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
    record = self.record
    eid = self.eid
    workflow = self.workflow

    thisWf = getWf(workflow, N.assessment, eid=eid)
    reviewers = G(thisWf, N.reviewers, default={})
    creatorId = G(record, N.creator)

    (frozen, hasValid, statusRep) = wfStatus(workflow, N.review, eid)

    orphaned = creatorId not in reviewers
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
