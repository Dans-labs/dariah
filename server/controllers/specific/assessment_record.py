from controllers.config import Names as N
from controllers.record import Record
from controllers.html import HtmlElements as H
from controllers.utils import E


class AssessmentR(Record):
  def __init__(self, *args, **kwargs):
    super().__init__(*args, **kwargs)

  def title(self):
    eid = self.eid
    wfitem = self.wfitem

    (goodType,) = wfitem.attributes(
        N.assessment, eid,
        N.goodType,
    )

    cls = E if goodType else " warning"
    assessmentTypeRep = (
        E
        if goodType else
        " as " + self.field(N.assessmentType).wrapBare()
    )

    datetime = self.field(N.dateCreated).wrapBare()
    date = datetime.split(maxsplit=1)[0]
    creator = self.field(N.creator).wrapBare()
    return H.span(
        f"""on {date}{assessmentTypeRep} by {creator}""",
        cls=f"small{cls}",
    )
