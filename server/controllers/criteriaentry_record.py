from controllers.config import Names as N
from controllers.html import HtmlElements as H
from controllers.utils import E, DOT, Q, NBSP
from controllers.record import Record


class CriteriaEntryR(Record):
  def __init__(self, *args, **kwargs):
    super().__init__(*args, **kwargs)

    Table = self.Table
    control = self.control
    db = self.db
    record = self.record

    aId = record.get(N.assessment, None)
    aRecord = db.getItem(N.assessment, aId)
    aTypeId = aRecord.get(N.assessmentType, None)
    cId = aRecord.get(N.contrib, None)
    cRecord = db.getItem(N.contrib, cId)
    cTypeId = cRecord.get(N.typeContribution, None)

    critObj = Table(control, N.criteria)
    critId = record.get(N.criteria, None)
    critRecord = critObj.record(eid=critId)
    self.critRecord = critRecord

    cls = E if aTypeId == cTypeId else "warning"
    self.cls = cls

  def title(self):
    record = self.record
    cls = self.cls
    critRecord = self.critRecord

    withScore = '❌' if self.field(N.score).isBlank() else '✅'
    withEvidence = '❌' if self.field(N.evidence).isBlank() else '✅'
    status = H.span(
        f"""with{NBSP}score{NBSP}{withScore} - """
        f"""with{NBSP}evidence{NBSP}{withEvidence}""",
        cls="right small",
    )
    seq = record.get(N.seq, Q)

    return H.span(
        [
            f"""{seq}{DOT}{NBSP}""",
            critRecord.title(),
            status,
        ],
        cls=cls,
    )

  def body(self, myMasters=None):
    return E.join(
        self.field(field, asMaster=field in myMasters).wrap()
        for field in [N.score, N.evidence]
    )
