from controllers.config import Config as C, Names as N
from controllers.record import Record
from controllers.html import HtmlElements as H
from controllers.utils import cap1, E


CW = C.web

ORPHAN = H.icon(CW.unknown[N.reviewKind])


class ReviewR(Record):
  def __init__(self, *args, **kwargs):
    super().__init__(*args, **kwargs)

    record = self.record
    workflow = self.workflow

    contribType = workflow.contribType
    assessmentType = workflow.assessmentType
    reviewerE = workflow.reviewerE
    reviewerF = workflow.reviewerF

    reviewType = record.get(N.reviewType, None)
    goodType = (
        assessmentType == contribType
        and
        assessmentType == reviewType
    )
    cls = E if goodType else " warning"

    creatorId = record.get(N.creator, None)

    kind = cap1(
        N.expert
        if creatorId == reviewerE else
        N.final
        if creatorId == reviewerF else
        ORPHAN
    )
    self.kind = kind
    self.creatorId = creatorId
    self.cls = cls
    self.reviewType = reviewType
    self.goodType = goodType

  def title(self):
    kind = self.kind
    cls = self.cls
    reviewType = self.reviewType
    goodType = self.goodType

    datetime = self.field(N.dateCreated).wrapBare()
    date = datetime.split(maxsplit=1)[0]
    creator = self.field(N.creator).wrapBare()
    rTypeRep = (
        E
        if goodType else
        " as " + reviewType.wrapBare()
    )

    return H.span(
        f"""{kind} on {date} as {rTypeRep} by {creator}""",
        cls=f"small{cls}",
    )

  def bodyCompact(self, myMasters=None, hideMasters=False):
    perm = self.perm

    theTitle = self.title()

    remarks = H.div(
        self.field(N.remarks).wrap(
            withLabel=False, asEdit=perm[N.isEdit],
        ),
    )
    decision = H.div(
        self.field(N.decision).wrap(
            withLabel=False, asEdit=perm[N.isEdit],
        ),
    )
    dateDecided = H.div(
        self.field(N.dateDecided).wrap(
            withLabel=False,
        ),
    )

    return H.div(
        [
            theTitle,
            decision,
            dateDecided,
            remarks,
        ],
        cls=f"review"
    )
