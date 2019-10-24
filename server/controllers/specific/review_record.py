from controllers.config import Config as C, Names as N
from controllers.record import Record
from controllers.html import HtmlElements as H
from controllers.utils import pick as G, getLast, cap1, E


CW = C.web

ORPHAN = H.icon(CW.unknown[N.reviewKind])


class ReviewR(Record):
  def __init__(self, *args, **kwargs):
    super().__init__(*args, **kwargs)

    workflow = self.workflow
    record = self.record
    eid = self.eid

    assessmentId = G(record, N.assessment)

    assessment = getLast([
        rec
        for rec in G(workflow, N.assessments, default=[])
        if G(rec, N._id) == assessmentId
    ])
    reviews = G(assessment, N.reviews)
    reviewE = getLast([
        rec
        for rec in G(reviews, N.expert, default=[])
        if G(rec, N._id) == eid
    ])
    reviewF = getLast([
        rec
        for rec in G(reviews, N.final, default=[])
        if G(rec, N._id) == eid
    ])
    review = reviewE or reviewF

    contribType = G(workflow, N.type)
    assessmentType = G(assessment, N.type)
    reviewType = G(review, N.type)

    reviewer = G(assessment, N.reviewer)
    reviewerE = G(reviewer, N.expert)
    reviewerF = G(reviewer, N.final)

    reviewType = G(record, N.reviewType)
    goodType = (
        assessmentType == contribType
        and
        assessmentType == reviewType
    )
    cls = E if goodType else " warning"

    creatorId = G(record, N.creator)

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
    self.goodType = goodType

  def title(self):
    kind = self.kind
    cls = self.cls
    goodType = self.goodType

    datetime = self.field(N.dateCreated).wrapBare()
    date = datetime.split(maxsplit=1)[0]
    creator = self.field(N.creator).wrapBare()
    reviewType = self.field(N.reviewType).wrapBare()
    reviewTypeRep = (
        E
        if goodType else
        " as " + reviewType
    )

    return H.span(
        f"""{kind} on {date}{reviewTypeRep} by {creator}""",
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
