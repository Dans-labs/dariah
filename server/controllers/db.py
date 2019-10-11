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

ACTIVE_TABLES = set(CT.activeTables)
VALUE_TABLES = set(CT.valueTables)
REFERENCE_SPECS = CT.reference

OPTIONS = CW.options


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
      setattr(
          self,
          valueTable,
          {
              record[N._id]: record
              for record in mongo[valueTable].find()
          },
      )
      if valueTable == N.permissionGroup:
        setattr(
            self,
            f"""{valueTable}Inv""",
            {
                record[N.rep]: record[N._id]
                for record in mongo[valueTable].find()
            },
        )
        setattr(
            self,
            f"""{valueTable}Desc""",
            {
                record[N.rep]: record[N.description]
                for record in mongo[valueTable].find()
            },
        )
      serverprint(f'COLLECTED {valueTable}')

    self.collectActiveItems(table=None)

  def collectActiveItems(self, table=None):
    if (
        table is not None
        and
        table not in ACTIVE_TABLES
    ):
      return

    mongo = self.mongo

    justNow = now()
    packageActive = {
        record[N._id]
        for record in mongo.package.find(
            {
                N.startDate: {M_LTE: justNow},
                N.endDate: {M_GTE: justNow},
            },
        )
    }
    for record in self.package.values():
      record[N.active] = record[N._id] in packageActive

    typeActive = set(chain.from_iterable(
        record.get(N.typeContribution, None) or []
        for (_id, record) in self.package.items()
        if _id in packageActive
    ))
    for record in self.typeContribution.values():
      record[N.active] = record[N._id] in typeActive

    criteriaActive = {
        _id
        for (_id, record) in self.criteria.items()
        if record[N.package] in packageActive
    }
    for record in self.criteria.values():
      record[N.active] = record[N._id] in criteriaActive

    self.typeCriteria = {}
    for (_id, record) in self.criteria.items():
      for tp in record.get(N.typeContribution, None) or []:
        self.typeCriteria.setdefault(tp, set()).add(_id)

    serverprint(f'UPDATED {", ".join(ACTIVE_TABLES)}')

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
      eids = {
          record[mainTable]
          for record in mongo[table].find(
              {mainTable: {'$exists': True}},
              {mainTable: True},
          )
      }
      if crit in criterium:
        criterium[crit] |= eids
      else:
        criterium[crit] = eids
    return criterium

  def getList(self, table, titleSort, my=None, our=None, select=False, **conditions):
    mongo = self.mongo

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
    mongo = self.mongo

    records = list(
        mongo[table].find({N._id: ObjectId(eid)})
    )
    record = (
        records[0]
        if len(records) else
        {}
    )
    return record

  def getDetails(self, table, masterField, eids, stripMasterField):
    mongo = self.mongo

    crit = {
        masterField:
        {M_IN: list(eids)}
        if isIterable(eids) else
        eids
    }
    proj = {masterField: False} if stripMasterField else None
    return list(
        mongo[table].find(crit, proj)
    )

  def getValueRecords(
      self,
      relTable,
  ):
    records = getattr(self, relTable, {}).values()
    return list(
        (
            r
            for r in records
            if r.get(N.isMember, None) or False
        )
        if relTable == N.country else
        records
    )

  def insertItem(self, table, uid, eppn, **fields):
    mongo = self.mongo

    justNow = now()
    result = mongo[table].insert_one({
        N.dateCreated: justNow,
        N.creator: uid,
        N.modified: ['{} on {}'.format(eppn, justNow)],
        **fields,
    })
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
        N.modified: ['{} on {}'.format(CREATOR, justNow)],
    })
    result = mongo.user.insert_one(record)
    self.collect(N.user)
    return result.inserted_id

  def delItem(self, table, eid):
    mongo = self.mongo

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
    update = {
        field: data,
        N.modified: newModified,
    }
    delete = {N.isPristine: E}

    mongo[table].update_one(
        {N._id: ObjectId(eid)},
        {
            M_SET: update,
            M_UNSET: delete,
        },
    )
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
    mongo.user.update_one(
        criterion,
        {
            M_SET: updates,
            M_UNSET: {
                N.isPristine: E
            }
        },
    )
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

      nDependent += mongo[referringTable].count(crit)

    return nDependent


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
