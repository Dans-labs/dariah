from controllers.config import Config as C, Names as N
from controllers.details import Details
from controllers.utils import pick as G, E
from controllers.html import HtmlElements as H


CW = C.web

ORPHAN_MSG = CW.messages[N.orphanedReviewer]


class ReviewD(Details):
  def __init__(self, recordObj):
    super().__init__(recordObj)

  def wrap(self):
    record = self.record
    eid = self.eid
    workflow = self.workflow

    reviewers = G(workflow, N.reviewers)
    creatorId = G(record, N.creator)

    defReviewEId = G(workflow, N.reviewEId)
    defReviewFId = G(workflow, N.reviewFId)
    defPart = (
        E
        if defReviewFId is None and defReviewFId is None else
        H.span(
            f"This is the authoritative {N.final} review",
            cls="large status good",
        )
        if defReviewFId == eid else
        H.span(
            f"This is the authoritative {N.expert} review",
            cls="large status good",
        )
        if defReviewEId == eid else
        H.span(
            "This review is not authoritative",
            cls="large status error",
        )
    )

    orphaned = creatorId not in reviewers
    if orphaned:
      self.fetchDetails(N.reviewEntry)
      entryPart = self.wrapDetail(N.reviewEntry, extraMsg=ORPHAN_MSG, extraCls="warning")
      return H.div(
          [
              entryPart,
              defPart,
          ]
      )

    return H.div(
        defPart
    )
