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

DEBUG = CB.debug

CREATOR = CB.creator

M_SET = CM.set
M_UNSET = CM.unset
M_LTE = CM.lte
M_GTE = CM.gte
M_OR = CM.OR
M_IN = CM.IN
M_EX = CM.ex

SHOW_ARGS = set(CM.showArgs)
OTHER_COMMANDS = set(CM.otherCommands)
M_COMMANDS = SHOW_ARGS | OTHER_COMMANDS

ACTUAL_TABLES = set(CT.actualTables)
VALUE_TABLES = set(CT.valueTables)
REFERENCE_SPECS = CT.reference


OPTIONS = CW.options

MOD_FMT = """{} on {}"""


class Db(object):
  def __init__(self, mongo):
    self.mongo = mongo

    self.collect()

    self.creatorId = [
        record[N._id]
        for record in self.user.values()
        if record.get(N.eppn, None) == CREATOR
    ][0]

  def mongoCmd(self, label, table, command, *args):
    mongo = self.mongo

    method = (
        getattr(mongo[table], command, None)
        if command in M_COMMANDS else
        None
    )
    warning = """!UNDEFINED""" if method is None else E
    argRep = (
        args[0]
        if args and args[0] and command in SHOW_ARGS else
        E
    )
    if DEBUG:
      serverprint(f"""MONGO<<{label}>>.{table}.{command}{warning}({argRep})""")
    if method:
      return method(*args)
    return None

  def collect(self, table=None):
    if table is not None and table not in VALUE_TABLES:
      return

    for valueTable in (
        {table} if table else VALUE_TABLES
    ):
      valueList = list(self.mongoCmd(N.collect, valueTable, N.find))

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

    justNow = now()

    packageActual = {
        record[N._id]
        for record in self.mongoCmd(
            N.collectActualItems, N.package, N.find,
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
    activeOptions = {
        OPTIONS.get(cond, {}).get(N.table, None): crit == ONE
        for (cond, crit) in conditions.items()
        if crit in {ONE, MINONE}
    }
    if None in activeOptions:
      del activeOptions[None]

    criterium = {}
    for (table, crit) in activeOptions.items():
      eids = {
          record[mainTable]
          for record in self.mongoCmd(
              N.makeCrit, table, N.find,
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
      records = self.mongoCmd(
          N.getList, table, N.find, crit
      )
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

    records = list(
        self.mongoCmd(N.getItem, table, N.find, {N._id: oid})
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
      crit = {
          masterField:
          {M_IN: list(eids)}
          if isIterable(eids) else
          eids
      }
      details = list(self.mongoCmd(N.getDetails, table, N.find, crit))

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
    justNow = now()
    newRecord = {
        N.dateCreated: justNow,
        N.creator: uid,
        N.modified: [MOD_FMT.format(eppn, justNow)],
        **fields,
    }
    result = self.mongoCmd(N.insertItem, table, N.insert_one, newRecord)
    self.collect(table)
    return result.inserted_id

  def insertUser(self, record):
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
    result = self.mongoCmd(N.insertUser, N.user, N.insert_one, record)
    self.collect(N.user)
    return result.inserted_id

  def delItem(self, table, eid):
    self.mongoCmd(N.delItem, table, N.delete_one, {N._id: ObjectId(eid)})
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

    self.mongoCmd(N.updateField, table, N.update_one, criterion, instructions)
    self.collect(table)
    return (
        update,
        set(delete.keys()),
    )

  def updateUser(self, record):
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
    self.mongoCmd(N.updateUser, N.user, N.update_one, criterion, instructions)
    self.collect(N.user)

  def dependencies(self, table, record):
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

      nDependent += self.mongoCmd(N.dependencies, referringTable, N.count, crit)

    return nDependent

  def dropWorkflow(self):
    self.mongoCmd(N.dropWorkflow, N.workflow, N.drop)

  def clearWorkflow(self):
    self.mongoCmd(N.clearWorkflow, N.workflow, N.delete_many)

  def entries(self, table, fields):
    entries = {}
    for record in list(self.mongoCmd(N.entries, table, N.find, {}, fields)):
        entries[record.get(N._id, None)] = record

    return entries

  def insertWorkflow(self, records):
    self.mongoCmd(N.insertWorkflow, N.workflow, N.insert_many, records)

  def adjustWorkflow(self, contribId, record):
    crit = {N._id: contribId}
    self.mongoCmd(N.adjustWorkflow, N.workflow, N.replace_one, crit, record)

  def getWorkflowItem(self, contribId):
    if contribId is None:
      return {}

    crit = {N._id: contribId}
    entries = list(self.mongoCmd(N.getWorkflowItem, N.workflow, N.find, crit))
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
