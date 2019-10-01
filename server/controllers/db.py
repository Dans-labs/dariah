from itertools import chain
from bson.objectid import ObjectId

from controllers.config import Config as C, Names as N, Tables as T
from controllers.utils import now, filterModified, E, ON

CREATOR = C.base[N.creator]

M_SET = C.mongo[N.set]
M_UNSET = C.mongo[N.unset]
M_LTE = C.mongo[N.lte]
M_GTE = C.mongo[N.gte]
M_OR = C.mongo[N.OR]


class Db(object):
  def __init__(self, mongo):
    self.mongo = mongo

    print('BEGIN COLLECTING ...')
    self.collect()
    print('END   COLLECTING ...')

    self.creatorId = [
        record[N._id]
        for record in self.user.values()
        if record.get(N.eppn, None) == CREATOR
    ][0]

  def collect(self):
    mongo = self.mongo

    for table in T.valueTables:
      setattr(
          self,
          table,
          {
              record[N._id]: record
              for record in mongo[table].find()
          },
      )
    for table in {
        N.permissionGroup
    }:
      setattr(
          self,
          f"""{table}Inv""",
          {
              record[N.rep]: record[N._id]
              for record in mongo[table].find()
          },
      )
      setattr(
          self,
          f"""{table}Desc""",
          {
              record[N.rep]: record[N.description]
              for record in mongo[table].find()
          },
      )

    self.collectActiveItems()

  def collectActiveItems(self):
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
        record.get(N.typeContribution, [])
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
      if _id not in criteriaActive:
        continue
      for tp in record.get(N.typeContribution, []):
        self.typeCriteria.setdefault(tp, set()).add(_id)

  def recollect(self, table):
    collectNeeded = table in T.valueTables
    if collectNeeded:
      print('BEGIN RECOLLECTING ...')
      self.collect()
      print('END   RECOLLECTING ...')

  def getList(self, table, titleSort, my=None, our=None):
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
    return sorted(mongo[table].find(crit), key=titleSort)

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

  def getValueRecords(
      self,
      relTable,
  ):
    records = getattr(self, relTable, {}).values()
    return list(
        (
            r
            for r in records
            if r.get(N.isMember, False)
        )
        if relTable == N.country else
        records
    )

  def insertItem(self, table, uid, eppn):
    mongo = self.mongo

    justNow = now()
    result = mongo[table].insert_one({
        N.dateCreated: justNow,
        N.creator: uid,
        N.modified: ['{} on {}'.format(eppn, justNow)],
    })
    self.recollect(table)
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
    self.recollect(N.user)
    return result.inserted_id

  def delItem(self, table, eid):
    mongo = self.mongo

    mongo[table].delete_one({N._id: ObjectId(eid)})
    self.recollect(table)

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
    print(f'before recollect {table}')
    self.recollect(table)
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
    self.recollect(N.user)

  def dependencies(self, table, record):
    mongo = self.mongo

    eid = record.get(N._id, None)
    if eid is None:
      return True

    referenceSpecs = T.reference.get(table, set())
    nDependent = 0
    for (referringTable, referringField) in referenceSpecs:
       nDependent += mongo[referringTable].count({referringField: eid})

    return nDependent
