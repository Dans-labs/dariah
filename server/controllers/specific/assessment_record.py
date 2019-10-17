from controllers.config import Names as N
from controllers.record import Record
from controllers.html import HtmlElements as H
from controllers.utils import E, SLASH


class AssessmentR(Record):
  def __init__(self, *args, **kwargs):
    super().__init__(*args, **kwargs)

    db = self.db
    record = self.record

    aTypeId = record.get(N.assessmentType, None)
    cId = record.get(N.contrib, None)
    cRecord = db.getItem(N.contrib, cId)
    cTypeId = cRecord.get(N.typeContribution, None)
    self.aTypeId = aTypeId
    self.cTypeId = cTypeId

  def title(self):
    aTypeId = self.aTypeId
    cTypeId = self.cTypeId
    cls = " warning" if aTypeId != cTypeId else E

    datetime = self.field(N.dateCreated).wrapBare()
    date = datetime.split(maxsplit=1)[0]
    aType = self.field(N.assessmentType).wrapBare()
    creator = self.field(N.creator).wrapBare()
    editors = self.field(N.editors).wrapBare()
    sep = f""" {SLASH} """ if editors else E
    return H.span(
        f"""on {date} as {aType} by {creator}{sep}{editors}""",
        cls=f"small{cls}",
    )
