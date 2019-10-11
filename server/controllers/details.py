from markdown import markdown

from controllers.config import Config as C, Names as N
from controllers.utils import E, NL
from controllers.html import HtmlElements as H


CT = C.tables
CW = C.web

DETAILS = CT.details

QQ = CW.unknown[N.generic]


def makeDetails(obj):
  table = obj.table
  if table == N.contrib:
    return ContribDetails(obj)
  return Details(obj)


class Details(object):
  inheritProps = (
      N.control, N.db, N.auth, N.types,
      'uid', 'eppn',
      'Table', 'table',
      'record', 'eid',
      'fields', 'prov',
      'doDetails',
  )
  stripMasterField = True

  def __init__(self, recordObj):
    doDetails = recordObj.doDetails

    if not doDetails:
      self.doDetails = doDetails
      return

    for prop in Details.inheritProps:
      setattr(self, prop, getattr(recordObj, prop, None))

    table = self.table

    self.details = {}

    for dtable in DETAILS.get(table, []):
      self.fetchDetails(dtable)

  def fetchDetails(self, dtable, masterTable=None, eids=None):
    control = self.control
    db = self.db
    Table = self.Table
    table = self.table
    eid = self.eid

    dtableObj = Table(control, dtable)
    drecords = db.getDetails(
        dtable,
        masterTable or table,
        eids or eid,
        self.stripMasterField,
    )
    self.details[dtable] = (
        dtableObj,
        tuple(drecords),
    )

  def wrap(self):
    if not self.doDetails:
      return E

    details = self.details

    dreps = []
    for (dtable, (dtableObj, drecords)) in details.items():
      nRecords = len(drecords)
      (itemSingular, itemPlural) = dtableObj.itemLabels
      itemLabel = itemSingular if nRecords == 1 else itemPlural

      nRep = H.div(f"""{nRecords} {itemLabel}""", cls="stats")
      dreps.append(
          H.div(
              [nRep]
              +
              [
                  dtableObj.record(record=drecord).wrap(collapsed=True)
                  for drecord in drecords
              ],
              cls="record-details",
          )
      )
    return E.join(dreps)


class ContribDetails(Details):
  stripMasterField = False

  def __init__(self, recordObj, *args, **kwargs):
    super().__init__(recordObj, *args, **kwargs)

    details = self.details

    if N.assessment not in details:
      return

    assessmentIds = {
        drecord[N._id]
        for drecord in details[N.assessment][1]
    }

    for dtable in [N.criteriaEntry, N.reviewEntry]:
      self.fetchDetails(dtable, masterTable=N.assessment, eids=assessmentIds)

  def wrap(self):
    if not self.doDetails:
      return E

    control = self.control
    db = self.db
    Table = self.Table
    record = self.record
    details = self.details

    typeContribution = record.get(N.typeContribution, None)

    material = []

    dreps = []
    for (dtable, (dtableObj, drecords)) in details.items():
      nRecords = len(drecords)
      (itemSingular, itemPlural) = dtableObj.itemLabels
      itemLabel = itemSingular if nRecords == 1 else itemPlural

      nRep = H.span(f"""{nRecords} {itemLabel}""", cls="stats")
      dreps.append(
          H.div(
              nRep,
              cls="record-details",
          )
      )
    material.extend(dreps)

    criteriaObj = Table(control, N.criteria)

    cEntriesByCrit = {}
    rEntriesByCritE = {}

    for (dtable, master, dest) in (
        (N.criteriaEntry, N.criteria, cEntriesByCrit),
        (N.reviewEntry, N.criteriaEntry, rEntriesByCritE),
    ):
      entries = details.get(dtable, None)
      if entries:
        records = entries[1]
        for record in records:
          deid = record.get(master, None)
          if not deid:
            continue
          dest.setdefault(deid, []).append(record)

    criteriaIdsGood = db.typeCriteria.get(typeContribution, set())
    criteriaIdsBad = set(cEntriesByCrit) - criteriaIdsGood
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

    if not criteriaRecords:
      material.append(
          H.div(
              """No criteria""",
              cls="warning",
          )
      )
      return E.join(material)

    nCriteria = len(criteriaRecords)
    (itemSingular, itemPlural) = criteriaObj.itemLabels
    itemLabel = itemSingular if nCriteria == 1 else itemPlural

    nRep = H.span(f"""{nCriteria} {itemLabel}""", cls="stats")
    material.append(
        H.div(
            [
                """Self assessment""",
                nRep,
            ],
            cls="assessment-head",
        )
    )

    self.criteriaIdsGood = criteriaIdsGood
    self.criteriaIdsBad = criteriaIdsBad
    self.cEntriesByCrit = cEntriesByCrit
    self.rEntriesByCritE = rEntriesByCritE

    for (seq, record) in enumerate(criteriaRecords):
      material.append(self.wrapCriteria(seq, record))

    return E.join(material)

  def wrapCriteria(self, seq, record):
    criteriaIdsGood = self.criteriaIdsGood
    cEntriesByCrit = self.cEntriesByCrit

    title = record.get(N.criterion, None) or QQ
    eid = record[N._id]
    active = record.get(N.active, False)
    remarks = record.get(N.remarks, [])

    itemkey = f"""{N.criteria}/{eid}"""
    typeCls = "" if eid in criteriaIdsGood else "warning"
    statusCls = typeCls if active else "error"

    cEntries = sorted(
        cEntriesByCrit.get(eid, []),
        key=cEntrySort,
    )

    return H.details(
        f"""{seq + 1} - {title}""",
        [
            (NL * 2).join(
                H.div(
                    markdown(remark),
                    cls="comments ruleabove",
                )
                for remark in remarks
            )
        ] + [
            self.wrapCriteriaEntry(record, statusCls)
            for record in cEntries
        ],
        itemkey,
        cls=f"criterion {statusCls}"
    )

  def wrapCriteriaEntry(self, record, statusCls):
    control = self.control
    Table = self.Table
    tableObj = Table(control, N.criteriaEntry)
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
