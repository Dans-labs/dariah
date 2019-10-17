from controllers.config import Config as C, Names as N
from controllers.record import Record
from controllers.html import HtmlElements as H
from controllers.utils import cap1, E, SLASH


CW = C.web

ORPHAN = CW.unknown[N.reviewKind]


class ReviewR(Record):
  def __init__(self, *args, **kwargs):
    super().__init__(*args, **kwargs)

    db = self.db
    record = self.record
    perm = self.perm

    reviewerE = perm[N.reviewerE]
    reviewerF = perm[N.reviewerF]

    creatorId = record.get(N.creator, None)
    aId = record.get(N.assessment, None)
    aRecord = db.getItem(N.assessment, aId)
    aTypeId = aRecord.get(N.assessmentType, None)
    cId = aRecord.get(N.contrib, None)
    cRecord = db.getItem(N.contrib, cId)
    cTypeId = cRecord.get(N.typeContribution, None)
    self.aTypeId = aTypeId
    self.cTypeId = cTypeId
    kind = cap1(
        N.expert
        if creatorId == reviewerE else
        N.final
        if creatorId == reviewerF else
        ORPHAN
    )
    self.kind = kind
    self.creatorId = creatorId

  def title(self):
    record = self.record
    kind = self.kind
    aTypeId = self.aTypeId
    cTypeId = self.cTypeId

    rTypeId = record.get(N.reviewType, None)
    cls = " warning" if rTypeId != cTypeId or rTypeId != aTypeId else E

    datetime = self.field(N.dateCreated).wrapBare()
    date = datetime.split(maxsplit=1)[0]
    rType = self.field(N.reviewType).wrapBare()
    creator = self.field(N.creator).wrapBare()
    editors = self.field(N.editors).wrapBare()
    sep = f""" {SLASH} """ if editors else E
    return H.span(
        f"""{kind} on {date} as {rType} by {creator}{sep}{editors}""",
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
