from controllers.config import Config as C, Names as N
from controllers.details import Details
from controllers.utils import E


CW = C.web

ORPHAN_MSG = CW.messages[N.orphanedReviewer]


class ReviewD(Details):
  def __init__(self, recordObj):
    super().__init__(recordObj)

  def wrap(self):
    record = self.record
    workflow = self.workflow

    reviewers = workflow.reviewers

    creatorId = record.get(N.creator, None)

    orphaned = creatorId not in reviewers
    if orphaned:
      self.fetchDetails(N.reviewEntry)
      return self.wrapDetail(N.reviewEntry, extraMsg=ORPHAN_MSG, extraCls="warning")

    return E
