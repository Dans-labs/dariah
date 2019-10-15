from markdown import markdown

from controllers.config import Config as C, Names as N
from controllers.details import Details
from controllers.html import HtmlElements as H, htmlEscape as he
from controllers.utils import E, NL, NBSP


CT = C.tables
CW = C.web

CONSTRAINED = CT.constrained

MESSAGES = CW.messages
REFRESH = MESSAGES[N.refreshCrit]
ORPHAN = CW.unknown[N.reviewKind]
QQ = CW.unknown[N.generic]


class AssessmentD(Details):
  def __init__(self, recordObj):
    super().__init__(recordObj)

  def wrap(self):
    reviewMeta = self.wrapReviewMeta()

    criteriaPart = self.wrapCriteriaPart()

    return reviewMeta + criteriaPart

  def wrapReviewMeta(self):
    db = self.db
    record = self.record

    cId = record.get(N.contrib, None)
    cRecord = db.getItem(N.contrib, cId)
    cTypeId = cRecord.get(N.typeContribution, None)
    aTypeId = record.get(N.assessmentType, None)
    reviewerE = record.get(N.reviewerE, None)
    reviewerF = record.get(N.reviewerF, None)

    self.cTypeId = cTypeId
    self.aTypeId = aTypeId
    self.reviewerE = reviewerE
    self.reviewerF = reviewerF

    self.fetchDetails(N.review)

    return self.wrapDetail(N.review)

  def wrapCriteriaPart(self):
    refresh = H.icon(
        N.refresh,
        cls="button small",
        action=N.refresh,
        title=REFRESH,
    )
    self.fetchDetails(N.criteriaEntry, sortKey=cEntrySort)
    return self.wrapDetail(N.criteriaEntry, extraMsg=refresh)

    db = self.db
    cTypeId = self.cTypeId
    details = self.details

    cEntriesByCrit = {}
    rEntriesByCrit = {}
    self.dobj = {}

    for (dtable, dest) in (
        (N.criteriaEntry, cEntriesByCrit),
        (N.reviewEntry, rEntriesByCrit),
    ):
      self.fetchDetails(dtable)
      (dtableObj, drecords) = details.get(dtable, (None, []))
      self.dobj[dtable] = dtableObj
      for record in drecords:
        critId = record.get(N.criteria, None)
        if not critId:
          continue
        dest.setdefault(critId, []).append(record)

    criteriaIdsGood = db.typeCriteria.get(cTypeId, set())
    criteriaIdsAll = set(cEntriesByCrit) | set(rEntriesByCrit) | criteriaIdsGood
    criteriaIdsBad = criteriaIdsAll - criteriaIdsGood

    self.fetchDetails(N.criteria, N._id, criteriaIdsAll, sortKey=critSort(criteriaIdsGood))
    (critObj, criteriaRecords) = details[N.criteria]

    self.dobj[N.criteria] = critObj
    self.criteriaRecords = criteriaRecords
    self.criteriaIdsGood = criteriaIdsGood
    self.criteriaIdsBad = criteriaIdsBad
    self.cEntriesByCrit = cEntriesByCrit
    self.rEntriesByCrit = rEntriesByCrit

    return self.wrapDetail(N.criteria)
    return E.join(
        self.wrapCriteria(seq, record)
        for (seq, record) in enumerate(criteriaRecords)
    )

  def wrapCriteria(self, seq, record):
    criteriaIdsGood = self.criteriaIdsGood
    cEntriesByCrit = self.cEntriesByCrit
    critObj = self.dobj[N.criteria]

    title = record.get(N.criterion, None) or QQ
    cid = record[N._id]
    actual = record.get(N.actual, False)
    remarks = record.get(N.remarks, [])

    typeCls = "" if cid in criteriaIdsGood else "warning"
    msg1 = E if actual else MESSAGES[N.legacyCriterion]
    msg2 = E if cid in criteriaIdsGood else MESSAGES[N.wrongCriterionForType]
    statusCls = typeCls if typeCls else "" if actual else "legacy"
    self.statusCls = statusCls

    cEntry = cEntriesByCrit.get(cid, [{}])[0]
    cRecord = critObj.record(record=cEntry)
    withScore = '❌' if cRecord.field(N.score).isBlank() else '✅'
    withEvidence = '❌' if cRecord.field(N.evidence).isBlank() else '✅'
    scorePresent = H.span(
        f"""with{NBSP}score{NBSP}{withScore} -""",
        cls="right small",
    )
    evidencePresent = H.span(
        f"""- with{NBSP}evidence{NBSP}{withEvidence}""",
        cls="right small",
    )

    return H.details(
        f"""{seq + 1} - {title} {evidencePresent} - {scorePresent}""",
        H.details(
            """Info""",
            E.join(
                (NL * 2).join(
                    H.div(
                        markdown(remark),
                        cls="comments ruleabove",
                    )
                    for remark in remarks
                )
            )
            +
            self.wrapScoringSpecs(cid)
            +
            (H.div(he(msg1), cls="heavy") if msg1 else E)
            +
            (H.div(he(msg2), cls="heavy") if msg2 else E),
            f"""{N.criteria}/{cid}/info""",
        )
        +
        self.wrapCriteriaEntries(cid),
        f"""{N.criteria}/{cid}""",
        cls=f"criterion {statusCls}"
    )

  def wrapScoringSpecs(self, cid):
    control = self.control
    db = self.db
    Table = self.Table

    field = N.score
    constrain = None
    constrainField = CONSTRAINED.get(field, None)
    if constrainField:
      constrainValue = cid
      constrain = (constrainField, constrainValue)
    sRecords = db.getValueRecords(N.score, constrain)
    scoreSpecs = []
    scoreObj = Table(control, N.score)
    for sRecord in sRecords:
      recordObj = scoreObj.record(record=sRecord)
      sTitle = recordObj.title()
      sDetails = H.div(
          [
              recordObj.field(N.description, mayEdit=False).wrap(empty=True),
              recordObj.field(N.remarks, mayEdit=False).wrap(empty=True),
          ]
      )
      scoreSpecs.append((sTitle, sDetails))
    return H.div(
        [
            H.div(
                MESSAGES[N.scoreLegend],
                cls="heavy"
            ),
            H.dl(scoreSpecs),
        ],
        cls="comments",
    )

  def wrapCriteriaEntries(self, cid):
    cEntriesByCrit = self.cEntriesByCrit
    statusCls = self.statusCls

    cEntries = sorted(
        cEntriesByCrit.get(cid, []),
        key=cEntrySort,
    )

    return H.div(
        [
            self.wrapCriteriaEntry(record, statusCls)
            for record in cEntries
        ],
        cls=f"criterion {statusCls}"
    )

  def wrapCriteriaEntry(self, record, statusCls):
    tableObj = self.dobj[N.criteriaEntry]
    recordObj = tableObj.record(record=record)

    return H.div(
        [
            recordObj.field(field).wrap()
            for field in [N.score, N.evidence]
        ],
        cls=f"centry {statusCls}"
    )


def critSort(goodIds):
  def sortKey(r):
    return (r.get(N._id, None) not in goodIds, r.get(N.criterion, None) or E)


def cEntrySort(r):
  return (r[N.assessment], r.get(N.seq, None) or 0)
