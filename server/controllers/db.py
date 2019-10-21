from itertools import chain
from bson.objectid import ObjectId

from controllers.config import Config as C, Names as N
from controllers.utils import (
    serverprint, now, filterModified, isIterable,
    E, ON, ONE, MINONE
)

CB = C.base
CM = C.mongo
CT = C.tables
CW = C.web


CREATOR = CB.creator

M_SET = CM.set
M_UNSET = CM.unset
M_LTE = CM.lte
M_GTE = CM.gte
M_OR = CM.OR
M_IN = CM.IN
M_EX = CM.ex

ACTUAL_TABLES = set(CT.actualTables)
VALUE_TABLES = set(CT.valueTables)
REFERENCE_SPECS = CT.reference

OPTIONS = CW.options

MOD_FMT = """{} on {}"""

DEBUG = True


class Db(object):
  def __init__(self, mongo):
    self.mongo = mongo

    self.collect()

    self.creatorId = [
        record[N._id]
        for record in self.user.values()
        if record.get(N.eppn, None) == CREATOR
    ][0]

  def collect(self, table=None):
    if table is not None and table not in VALUE_TABLES:
      return

    mongo = self.mongo

    for valueTable in (
        {table} if table else VALUE_TABLES
    ):
      if DEBUG:
        serverprint(f"""MONGO<<collect>>.{valueTable}.find()""")
      valueList = list(mongo[valueTable].find())

      setattr(
          self,
          valueTable,
          {
              record[N._id]: record
              for record in valueList
          },
      )
      if valueTable == N.permissionGroup:
        setattr(
            self,
            f"""{valueTable}Inv""",
            {
                record[N.rep]: record[N._id]
                for record in valueList
            },
        )
        setattr(
            self,
            f"""{valueTable}Desc""",
            {
                record[N.rep]: record[N.description]
                for record in valueList
            },
        )
      serverprint(f"""COLLECTED {valueTable}""")

    self.collectActualItems(table=None)

  def collectActualItems(self, table=None):
    if (
        table is not None
        and
        table not in ACTUAL_TABLES
    ):
      return

    mongo = self.mongo

    justNow = now()
    if DEBUG:
      serverprint(
          f"""MONGO<<collectActualItems>>.{N.package}."""
          f"""find({N.startDate} {M_LTE} now {M_LTE} {N.endDate})"""
      )

    packageActual = {
        record[N._id]
        for record in mongo.package.find(
            {
                N.startDate: {M_LTE: justNow},
                N.endDate: {M_GTE: justNow},
            },
        )
    }
    for record in self.package.values():
      record[N.actual] = record[N._id] in packageActual

    typeActual = set(chain.from_iterable(
        record.get(N.typeContribution, None) or []
        for (_id, record) in self.package.items()
        if _id in packageActual
    ))
    for record in self.typeContribution.values():
      record[N.actual] = record[N._id] in typeActual

    criteriaActual = {
        _id
        for (_id, record) in self.criteria.items()
        if record[N.package] in packageActual
    }
    for record in self.criteria.values():
      record[N.actual] = record[N._id] in criteriaActual

    self.typeCriteria = {}
    for (_id, record) in self.criteria.items():
      for tp in record.get(N.typeContribution, None) or []:
        self.typeCriteria.setdefault(tp, set()).add(_id)

    serverprint(f"""UPDATED {", ".join(ACTUAL_TABLES)}""")

  def makeCrit(self, mainTable, conditions):
    mongo = self.mongo

    activeOptions = {
        OPTIONS.get(cond, {}).get(N.table, None): crit == ONE
        for (cond, crit) in conditions.items()
        if crit in {ONE, MINONE}
    }
    if None in activeOptions:
      del activeOptions[None]

    criterium = {}
    for (table, crit) in activeOptions.items():
      if DEBUG:
        serverprint(f"""MONGO<<makeCrit>>.{table}.find({mainTable}: true)""")
      eids = {
          record[mainTable]
          for record in mongo[table].find(
              {mainTable: {M_EX: True}},
              {mainTable: True},
          )
      }
      if crit in criterium:
        criterium[crit] |= eids
      else:
        criterium[crit] = eids
    return criterium

  def getList(self, table, titleSort, my=None, our=None, select=False, **conditions):
    crit = {}
    if my:
      crit.update({
          M_OR: [
              {N.creator: my},
              {N.editors: my},
          ],
      })
    if our:
      crit.update({
          N.country: our,
      })

    if table in VALUE_TABLES:
      records = (
          record
          for record in getattr(self, table, {}).values()
          if (
              (
                  my is None
                  or
                  record.get(N.creator, None) == my
                  or
                  my in record.get(N.editors, [])
              )
              and
              (
                  our is None
                  or
                  record.get(N.country, None) == our
              )
          )
      )
    else:
      mongo = self.mongo
      if DEBUG:
        serverprint(f"""MONGO<<getList>>.{table}.find({crit})""")
      records = mongo[table].find(crit)
    if select:
      criterium = self.makeCrit(table, conditions)
      records = (
          record
          for record in records
          if satisfies(record, criterium)
      )
    return sorted(records, key=titleSort)

  def getItem(self, table, eid):
    if not eid:
      return {}

    oid = ObjectId(eid)

    if table in VALUE_TABLES:
      return getattr(self, table, {}).get(oid, {})

    mongo = self.mongo

    if DEBUG:
      serverprint(f"""MONGO<<getItem>>.{table}.find({N._id}: {oid})""")
    records = list(
        mongo[table].find({N._id: oid})
    )
    record = (
        records[0]
        if len(records) else
        {}
    )
    return record

  def getDetails(self, table, masterField, eids, sortKey=None):
    if table in VALUE_TABLES:
      crit = eids if isIterable(eids) else [eids]
      details = [
          record
          for record in getattr(self, table, {}).values()
          if record.get(masterField, None) in crit
      ]
    else:
      mongo = self.mongo
      crit = {
          masterField:
          {M_IN: list(eids)}
          if isIterable(eids) else
          eids
      }
      if DEBUG:
        serverprint(f"""MONGO<<getDetails>>.{table}.find({crit})""")
      details = list(mongo[table].find(crit))

    return (
        sorted(
            details,
            key=sortKey,
        )
        if sortKey else
        details
    )

  def getValueRecords(
      self,
      relTable,
      constrain=None,
  ):
    records = getattr(self, relTable, {}).values()
    return list(
        (
            r
            for r in records
            if r.get(N.isMember, None) or False
        )
        if relTable == N.country else
        (
            r
            for r in records
            if r.get(constrain[0], None) == constrain[1]
        )
        if constrain else
        records
    )

  def insertItem(self, table, uid, eppn, **fields):
    mongo = self.mongo

    justNow = now()
    newRecord = {
        N.dateCreated: justNow,
        N.creator: uid,
        N.modified: [MOD_FMT.format(eppn, justNow)],
        **fields,
    }
    if DEBUG:
      serverprint(f"""MONGO<<insertItem>>.{table}.insertOne()""")
    result = mongo[table].insert_one(newRecord)
    self.collect(table)
    return result.inserted_id

  def insertUser(self, record):
    mongo = self.mongo
    creatorId = self.creatorId

    justNow = now()
    record.update({
        N.dateLastLogin: justNow,
        N.statusLastLogin: N.Approved,
        N.mayLogin: True,
        N.creator: creatorId,
        N.dateCreated: justNow,
        N.modified: [MOD_FMT.format(CREATOR, justNow)],
    })
    if DEBUG:
      serverprint(f"""MONGO<<isertUser>>.user.insertOne()""")
    result = mongo.user.insert_one(record)
    self.collect(N.user)
    return result.inserted_id

  def delItem(self, table, eid):
    mongo = self.mongo

    if DEBUG:
      serverprint(f"""MONGO<<delItem>>.{table}.deleteOne({N._id}: {eid})""")
    mongo[table].delete_one({N._id: ObjectId(eid)})
    self.collect(table)

  def updateField(
      self,
      table,
      eid,
      field,
      data,
      actor,
      modified,
  ):
    mongo = self.mongo

    justNow = now()
    newModified = filterModified(
        (modified or []) + [f"""{actor}{ON}{justNow}"""]
    )
    criterion = {N._id: ObjectId(eid)}
    update = {
        field: data,
        N.modified: newModified,
    }
    delete = {N.isPristine: E}
    instructions = {
        M_SET: update,
        M_UNSET: delete,
    }

    if DEBUG:
      serverprint(f"""MONGO<<updateField>>.{table}.updateOne({criterion})""")
    mongo[table].update_one(criterion, instructions)
    self.collect(table)
    return (
        update,
        set(delete.keys()),
    )

  def updateUser(self, record):
    mongo = self.mongo

    if N.isPristine in record:
      del record[N.isPristine]
    criterion = {N._id: record[N._id]}
    updates = {
        k: v
        for (k, v) in record.items()
        if k != N._id
    }
    instructions = {
        M_SET: updates,
        M_UNSET: {
            N.isPristine: E
        }
    }
    if DEBUG:
      serverprint(f"""MONGO<<updateUser>>.user.updateOne({criterion})""")
    mongo.user.update_one(criterion, instructions)
    self.collect(N.user)

  def dependencies(self, table, record):
    mongo = self.mongo

    eid = record.get(N._id, None)
    if eid is None:
      return True

    referenceSpecs = REFERENCE_SPECS.get(table, {})
    nDependent = 0
    for (referringTable, referringFields) in referenceSpecs.items():
      if not len(referringFields):
        continue
      fields = list(referringFields)
      crit = (
          {
              fields[0]: eid,
          }
          if len(fields) == 1 else
          {
              M_OR: [
                  {field: eid}
                  for field in fields
              ],
          }
      )

      if DEBUG:
        serverprint(f"""MONGO<<dependencies>>.{referringTable}.count({crit})""")
      nDependent += mongo[referringTable].count(crit)

    return nDependent

  def dropWorkflow(self):
    mongo = self.mongo

    if DEBUG:
      serverprint(f"""MONGO<<dropWorkflow>>.{N.workflow}.drop()""")
    mongo[N.workflow].drop()

  def clearWorkflow(self):
    mongo = self.mongo

    if DEBUG:
      serverprint(f"""MONGO<<clearWorkflow>>.{N.workflow}.deleteMany()""")
    mongo[N.workflow].delete_many()

  def entries(self, table, fields):
    mongo = self.mongo

    if DEBUG:
      serverprint(f"""MONGO<<entries>>.{table}.find()""")
    entries = {}
    for record in list(mongo[table].find({}, fields)):
        entries[record.get(N._id, None)] = record

    return entries

  def insertWorkflow(self, records):
    mongo = self.mongo

    if DEBUG:
      serverprint(f"""MONGO<<isertWorkflow>>.{N.workflow}.insertMany()""")
    mongo[N.workflow].insert_many(records)

  def getWorkflowItem(self, contribId):
    if contribId is None:
      return {}

    mongo = self.mongo

    crit = {N._id: contribId}
    if DEBUG:
      serverprint(f"""MONGO<<getWorkflow>>.{N.workflow}.find({crit})""")
    entries = list(mongo[N.workflow].find(crit))
    return (
        entries[0]
        if entries else
        {}
    )


def satisfies(record, criterium):
  eid = record.get(N._id, None)
  for (crit, eids) in criterium.items():
    if (
        crit and eid not in eids
        or
        not crit and eid in eids
    ):
      return False
  return True
