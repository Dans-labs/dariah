from itertools import chain
from bson.objectid import ObjectId

from controllers.config import Config as C, Names as N
from controllers.utils import now, filterModified, E, ON

VALUE_TABLES = set(C.table[N.kinds][N.value])

M_SET = C.mongo[N.set]
M_UNSET = C.mongo[N.unset]
M_LTE = C.mongo[N.lte]
M_GTE = C.mongo[N.gte]
M_OR = C.mongo[N.OR]


class Db(object):
  def __init__(self, mongo):
    self.mongo = mongo

  def collect(self):
    mongo = self.mongo

    for table in VALUE_TABLES:
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

    present = now()
    packageActive = {
        record[N._id]
        for record in mongo.package.find(
            {
                N.startDate: {M_LTE: present},
                N.endDate: {M_GTE: present},
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

  def getField(
      self,
      record,
      fieldName,
      multiple,
      relTable=None,
  ):
    relTable = relTable or fieldName
    rawValue = record.get(fieldName, None) or ([] if multiple else None)
    valTable = getattr(self, relTable, {})
    return (
        [
            valTable.get(rawVal, {})
            for rawVal in rawValue
        ]
        if multiple else
        valTable.get(rawValue, {})
    )

  def saveField(
      self,
      table,
      eid,
      field,
      data,
      actor,
      modified,
  ):
    mongo = self.mongo

    newModified = filterModified(
        (modified or []) + [f"""{actor}{ON}{now()}"""]
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
    return (
        update,
        set(delete.keys()),
    )
