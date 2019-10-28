from controllers.config import Config as C, Names as N
from controllers.record import Record
from controllers.html import HtmlElements as H
from controllers.utils import pick as G, E
from controllers.workflow import getWf


CW = C.web

ORPHAN = H.icon(CW.unknown[N.reviewKind])


class ReviewR(Record):
  def __init__(self, *args, **kwargs):
    super().__init__(*args, **kwargs)

    workflow = self.workflow
    record = self.record
    eid = self.eid

    thisWf = getWf(workflow, N.review, eid=eid)
    reviewer = G(thisWf, N.reviewer)
    reviewerE = G(reviewer, N.expert)
    reviewerF = G(reviewer, N.final)

    goodType = G(thisWf, N.goodType)
    cls = E if goodType else " warning"

    creatorId = G(record, N.creator)

    kind = (
        N.expert
        if creatorId == reviewerE else
        N.final
        if creatorId == reviewerF else
        ORPHAN
    )
    self.kind = kind
    self.creatorId = creatorId
    self.cls = cls
    self.goodType = goodType

  def title(self):
    kind = self.kind
    uid = self.uid
    cls = self.cls
    goodType = self.goodType
    creatorId = self.creatorId

    datetime = self.field(N.dateCreated).wrapBare()
    date = datetime.split(maxsplit=1)[0]
    creator = self.field(N.creator).wrapBare()
    youRep = f""" ({N.you})""" if creatorId == uid else E
    reviewType = self.field(N.reviewType).wrapBare()
    reviewTypeRep = (
        E
        if goodType else
        " as " + reviewType
    )

    return H.span(
        f"""{kind} on {date}{reviewTypeRep} by {creator}{youRep}""",
        cls=f"small{cls}",
    )

  def bodyCompact(self, myMasters=None, hideMasters=False):
    perm = self.perm

    theTitle = self.title()

    remarks = H.div(
        self.field(N.remarks).wrap(
            withLabel=False, asEdit=G(perm, N.isEdit),
        ),
    )
    decisionPart = H.div(
        self.field(N.decision).wrap(
            withLabel=False, asEdit=G(perm, N.isEdit),
        )
    )

    return H.div(
        [
            decisionPart,
            theTitle,
            remarks,
        ],
        cls=f"review"
    )
