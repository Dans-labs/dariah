from controllers.config import Config as C, Names as N
from controllers.record import Record
from controllers.html import HtmlElements as H
from controllers.utils import E, SLASH


CW = C.web

ORPHAN = CW.unknown[N.reviewKind]
ORPHAN_MSG = CW.messages[N.orphanedReviewer]


class AssessmentR(Record):
  def __init__(self, *args, **kwargs):
    super().__init__(*args, **kwargs)

    db = self.db
    record = self.record

    aId = record.get(N.assessment, None)
    aRecord = db.getItem(N.assessment, aId)
    aTypeId = aRecord.get(N.assessmentType, None)
    reviewerE = aRecord.get(N.reviewerE, None)
    reviewerF = aRecord.get(N.reviewerF, None)
    cId = aRecord.get(N.contrib, None)
    cRecord = db.getItem(N.contrib, cId)
    cTypeId = cRecord.get(N.typeContribution, None)
    self.aTypeId = aTypeId
    self.cTypeId = cTypeId
    self.reviewerE = reviewerE
    self.reviewerF = reviewerF

  def title(self):
    aTypeId = self.aTypeId
    cTypeId = self.cTypeId
    cls = " warning" if aTypeId != cTypeId else E

    datetime = self.field(N.dateCreated).wrapBare()
    date = datetime.split(maxsplit=1)[0]
    aType = self.field(N.assessmentType).wrapBare()
    creator = self.field(N.creator).wrapBare()
    editors = self.field(N.editors).wrapBare()
    sep = f' {SLASH} ' if editors else E
    return H.span(
        f'on {date} as {aType} by {creator}{sep}{editors}',
        cls=f"small{cls}",
    )
