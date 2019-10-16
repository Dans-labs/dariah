from controllers.config import Config as C, Names as N
from controllers.details import Details
from controllers.utils import E


CW = C.web

ORPHAN = CW.unknown[N.reviewKind]
ORPHAN_MSG = CW.messages[N.orphanedReviewer]


class ReviewD(Details):
  def __init__(self, recordObj):
    super().__init__(recordObj)

  def wrap(self):
    db = self.db
    record = self.record

    aId = record.get(N.assessment, None)
    aRecord = db.getItem(N.assessment, aId)
    reviewerE = aRecord.get(N.reviewerE)
    reviewerF = aRecord.get(N.reviewerF)
    creatorId = record.get(N.creator, None)

    orphaned = creatorId not in {reviewerE, reviewerF}
    if orphaned:
      self.fetchDetails(N.reviewEntry)
      return self.wrapDetail(N.reviewEntry, extraMsg=ORPHAN_MSG, extraCls="warning")

    return E
