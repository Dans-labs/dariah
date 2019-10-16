from controllers.config import Config as C, Names as N
from controllers.html import HtmlElements as H, htmlEscape as he
from controllers.utils import E, DOT, Q, NBSP
from controllers.record import Record

CW = C.web

MESSAGES = CW.messages


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
    self.critId = critId
    self.critRecord = critRecord

    typeOk = aTypeId == cTypeId
    cls = E if typeOk else "warning"
    self.typeOk = typeOk
    self.cls = cls

  def title(self):
    record = self.record
    cls = self.cls
    critRecord = self.critRecord

    withEvidence = '❌' if self.field(N.evidence).isBlank() else '✅'
    status = H.span(
        f"""with{NBSP}evidence{NBSP}{withEvidence}""",
        cls="right small",
    )
    seq = record.get(N.seq, Q)
    scoreRep = self.field(N.score).wrapBare()

    return H.span(
        [
            H.span(
                [
                    f"""{seq}{DOT}{NBSP}""",
                    critRecord.title(),
                ],
                cls="col1",
            ),
            H.span(
                scoreRep,
                cls="col2",
            ),
            status,
        ],
        cls=f"{cls} centrytitle criteria",
    )

  def bodyCompact(self, **kwargs):
    typeOk = self.typeOk
    cls = self.cls
    critId = self.critId
    critRecord = self.critRecord

    critData = critRecord.record
    actual = critData.get(N.actual, False)
    msg1 = E if actual else MESSAGES[N.legacyCriterion]
    msg2 = E if typeOk else MESSAGES[N.wrongCriterionForType]

    critKey = f"""{N.criteria}/{critId}/help"""
    (infoShow, infoHide, infoBody) = H.mydetails(
        (N.info, N.dismiss),
        critRecord.wrapHelp(typeOk, cls),
        critKey,
        openAtts=dict(
            cls="button small",
            title="Explanation and scoring guide",
        ),
        closeAtts=dict(
            cls="button small",
            title="Hide criteria explanation",
        ),
    )

    evidence = H.div(
        self.field(N.evidence).wrap(asEdit=True),
    )
    entry = H.div(
        [
            H.div(he(msg1), cls="heavy") if msg1 else E,
            H.div(he(msg2), cls="heavy") if msg2 else E,
            infoShow,
            infoBody,
            infoHide,
            evidence,
        ],
    )

    return entry
