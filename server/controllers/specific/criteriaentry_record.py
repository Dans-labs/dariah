from controllers.config import Config as C, Names as N
from controllers.html import HtmlElements as H, htmlEscape as he
from controllers.utils import pick as G, E, DOT, Q, NBSP
from controllers.record import Record
from controllers.workflow import getWf

CW = C.web

MESSAGES = CW.messages


class CriteriaEntryR(Record):
  def __init__(self, *args, **kwargs):
    super().__init__(*args, **kwargs)

    Table = self.Table
    control = self.control
    record = self.record
    eid = self.eid
    workflow = self.workflow

    thisWf = getWf(workflow, N.assessment, eid=eid)
    goodType = G(thisWf, N.goodType)
    cls = E if goodType else "warning"

    critObj = Table(control, N.criteria)
    critId = G(record, N.criteria)
    critRecord = critObj.record(eid=critId)
    self.critId = critId
    self.critRecord = critRecord

    self.goodType = goodType
    self.cls = cls

  def title(self):
    record = self.record
    cls = self.cls
    critRecord = self.critRecord

    withEvidence = (
        H.icon(
            N.missing
            if self.field(N.evidence).isBlank() else
            N.check
        )
    )
    status = H.span(
        f"""evidence{NBSP}{withEvidence}""",
        cls="right small",
    )
    seq = G(record, N.seq, default=Q)
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
    goodType = self.goodType
    cls = self.cls
    critId = self.critId
    critRecord = self.critRecord
    perm = self.perm

    critData = critRecord.record
    actual = G(critData, N.actual, default=False)
    msg1 = E if actual else G(MESSAGES, N.legacyCriterion)
    msg2 = E if goodType else G(MESSAGES, N.wrongCriterionForType)

    critKey = f"""{N.criteria}/{critId}/help"""
    (infoShow, infoHide, infoBody) = H.detailx(
        (N.info, N.dismiss),
        critRecord.wrapHelp(goodType, cls),
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

    score = H.div(
        self.field(N.score).wrap(asEdit=G(perm, N.isEdit)),
    )
    evidence = H.div(
        self.field(N.evidence).wrap(asEdit=G(perm, N.isEdit)),
    )
    entry = H.div(
        [
            H.div(he(msg1), cls="heavy") if msg1 else E,
            H.div(he(msg2), cls="heavy") if msg2 else E,
            infoShow,
            infoHide,
            infoBody,
            score,
            evidence,
        ],
    )

    return entry
