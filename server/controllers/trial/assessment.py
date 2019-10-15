from markdown import markdown

from controllers.config import Config as C, Names as N
from controllers.utils import E, NL, NBSP
from controllers.html import HtmlElements as H, htmlEscape as he


CT = C.tables
CW = C.web

CONSTRAINED = CT.constrained

QQ = CW.unknown[N.generic]
MESSAGES = CW.messages
REFRESH = MESSAGES[N.refreshCrit]


class Assessment(object):
  inheritProps = (
      N.control, N.db, N.auth, N.types,
      'uid', 'eppn',
      'table', 'fields', 'prov',
      'isUserTable', 'isUserEntryTable',
      'itemLabels',
      'details',
  )

  def __init__(self, contribObj, aObj, aData):
    for prop in Assessment.inheritProps:
      setattr(self, prop, getattr(contribObj, prop, None))

    aRecord = aObj.record(record=aData)
    self.aRecord = aRecord

  def wrap(self):
    control = self.control
    db = self.db
    eid = self.eid
    Table = self.Table

    assessmentRecords = []
    for aRecord in sorted(
        self.drecords[N.assessment],
        key=lambda r: r.get(N.dateCreated, 0)
    ):
      assessmentRecords.append(self.dobj[N.assessment].record(record=aRecord))

    self.assessmentRecords = assessmentRecords

    cEntriesByCrit = {}
    rEntriesByCritE = {}

    for (dtable, master, dest) in (
        (N.criteriaEntry, N.criteria, cEntriesByCrit),
        (N.reviewEntry, N.criteria, rEntriesByCritE),
    ):
      for record in self.drecords[dtable]:
        deid = record.get(master, None)
        if not deid:
          continue
        dest.setdefault(deid, []).append(record)

    record = self.record
    typeContribution = record.get(N.typeContribution, None)

    criteriaIdsGood = db.typeCriteria.get(typeContribution, set())
    criteriaIdsAll = set(cEntriesByCrit) | set(rEntriesByCritE) | criteriaIdsGood
    criteriaIdsBad = criteriaIdsAll - criteriaIdsGood
    criteriaRecords = (
        sorted(
            (db.criteria[eid] for eid in criteriaIdsGood),
            key=critSort,
        )
        +
        sorted(
            (db.criteria[eid] for eid in criteriaIdsBad),
            key=critSort,
        )
    )
    self.criteriaRecords = criteriaRecords
    self.criteriaIdsGood = criteriaIdsGood
    self.criteriaIdsBad = criteriaIdsBad
    self.cEntriesByCrit = cEntriesByCrit
    self.rEntriesByCritE = rEntriesByCritE

    nCriteria = len(criteriaIdsAll)
    criteriaObj = Table(control, N.criteria)
    (itemSingular, itemPlural) = criteriaObj.itemLabels
    itemLabel = itemSingular if nCriteria == 1 else itemPlural
    self.n[N.criteria] = nCriteria
    self.nRep[N.criteria] = H.span(f"""{nCriteria} {itemLabel}""", cls="stats")
    self.dobj[N.criteria] = criteriaObj
    self.drecords[N.criteria] = criteriaRecords

    refresh = H.icon(
        N.refresh,
        cls="button small",
        action=N.refresh,
        title=REFRESH,
    )
    return H.details(
        H.span(
            [
                """Self assessment""",
                self.nRep[N.assessment],
                self.nRep[N.criteria],
                H.span(refresh, cls="right"),
            ],
            cls="assessment-head",
        ),
        E.join(
            self.wrapCriteria(seq, record)
            for (seq, record) in enumerate(criteriaRecords)
        )
        +
        self.wrapAssessmentMeta(),
        f"""{N.contrib}/{eid}/selfassessment""",
        cls="assessment"
    )

  def wrapAssessmentMeta(self):
    assessmentRecords = self.assessmentRecords
    itemSingular = self.dobj[N.assessment].itemLabels[0]

    material = []
    material.append(
        H.div(
            [
                """Assessment colophon""",
                self.nRep[N.assessment],
            ],
            cls="assessment-head",
        )
    )

    for (seq, aRecord) in enumerate(assessmentRecords):
      aHead = (
          (
              H.div(
                  f"""{itemSingular} {seq + 1}""",
                  cls="assessment-subhead",
              )
          )
          if self.n[N.assessment] > 1 else
          E
      )
      material.append(aHead)
      material.append(aRecord.wrap())

    return E.join(material)

  def wrapCriteria(self, seq, record):
    criteriaIdsGood = self.criteriaIdsGood
    cEntriesByCrit = self.cEntriesByCrit

    title = record.get(N.criterion, None) or QQ
    eid = record[N._id]
    actual = record.get(N.actual, False)
    remarks = record.get(N.remarks, [])

    typeCls = "" if eid in criteriaIdsGood else "warning"
    msg1 = E if actual else MESSAGES[N.legacyCriterion]
    msg2 = E if eid in criteriaIdsGood else MESSAGES[N.wrongCriterionForType]
    statusCls = typeCls if typeCls else "" if actual else "legacy"
    self.statusCls = statusCls

    latestAssessment = self.latestAssessment
    latestEntry = [
        r
        for r in cEntriesByCrit.get(eid, [])
        if latestAssessment and r.get(N.assessment, None) == latestAssessment
    ]
    latestEntry = latestEntry[0] if latestEntry else {}
    dObj = self.dobj[N.criteriaEntry]
    cEntry = dObj.record(record=latestEntry)
    withScore = '✅'
    withEvidence = '❌'
    if latestAssessment:
      withScore = '❌' if cEntry.field(N.score).isBlank() else '✅'
      withEvidence = '❌' if cEntry.field(N.evidence).isBlank() else '✅'
    scorePresent = H.span(
        f"""with{NBSP}score{NBSP}{withScore} -""",
        cls="right small",
    )
    evidencePresent = H.span(
        f"""- with{NBSP}evidence{NBSP}{withEvidence}""",
        cls="right small",
    )

    material = H.details(
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
            self.wrapScoringSpecs(eid)
            +
            (H.div(he(msg1), cls="heavy") if msg1 else E)
            +
            (H.div(he(msg2), cls="heavy") if msg2 else E),
            f"""{N.criteria}/{eid}/info""",
        )
        +
        self.wrapCriteriaEntries(seq, eid),
        f"""{N.criteria}/{eid}""",
        cls=f"criterion {statusCls}"
    )
    return E.join(material)

  def wrapScoringSpecs(self, eid):
    control = self.control
    db = self.db
    Table = self.Table

    field = N.score
    constrain = None
    constrainField = CONSTRAINED.get(field, None)
    if constrainField:
      constrainValue = eid
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

  def wrapCriteriaEntries(self, seq, eid):
    cEntriesByCrit = self.cEntriesByCrit
    statusCls = self.statusCls

    cEntries = sorted(
        cEntriesByCrit.get(eid, []),
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


def critSort(r):
  return r.get(N.criterion, None) or E


def cEntrySort(r):
  return (r[N.assessment], r.get(N.seq, None) or 0)
