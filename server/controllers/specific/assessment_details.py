from controllers.config import Config as C, Names as N
from controllers.details import Details
from controllers.html import HtmlElements as H


CT = C.tables
CW = C.web

CONSTRAINED = CT.constrained

MESSAGES = CW.messages
REFRESH = MESSAGES[N.refreshCrit]
ORPHAN = CW.unknown[N.reviewKind]
QQ = CW.unknown[N.generic]


class AssessmentD(Details):
  def __init__(self, recordObj):
    super().__init__(recordObj)

  def wrap(self):
    self.fetchDetails(N.review)
    self.fetchDetails(N.criteriaEntry, sortKey=cEntrySort)

    reviewMeta = self.wrapDetail(N.review)

    refresh = H.icon(
        N.refresh,
        action=N.refresh,
        title=REFRESH,
    )
    criteriaPart = self.wrapDetail(
        N.criteriaEntry,
        extraMsg=refresh, extraCls="button small right",
        bodyMethod=N.bodyCompact,
    )

    return reviewMeta + criteriaPart


def cEntrySort(r):
  return (r[N.assessment], r.get(N.seq, None) or 0)
