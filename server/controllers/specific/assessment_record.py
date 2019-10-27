from controllers.config import Names as N
from controllers.record import Record
from controllers.html import HtmlElements as H
from controllers.utils import pick as G, E
from controllers.workflow import getWf


class AssessmentR(Record):
  def __init__(self, *args, **kwargs):
    super().__init__(*args, **kwargs)

  def title(self):
    workflow = self.workflow
    eid = self.eid

    thisWf = getWf(workflow, N.assessment, eid=eid)
    goodType = G(thisWf, N.goodType)

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
