from itertools import chain

from controllers.utils import now


class Db(object):
  def __init__(self, mongo, Config, Names):
    self.mongo = mongo
    self.names = Names
    self.config = Config

  def collect(self):
    mongo = self.mongo

    for table in f'''
        country
        criteria
        decision
        discipline
        keyword
        package
        permissionGroup
        score
        tadirahActivity
        tadirahObject
        tadirahTechnique
        typeContribution
        user
        vcc
        year
    '''.strip().split():
      setattr(
          self,
          table,
          {
              record['_id']: record
              for record in mongo[table].find()
          },
      )
    for table in f'''
        permissionGroup
    '''.strip().split():
      setattr(
          self,
          f'{table}Inv',
          {
              record['rep']: record['_id']
              for record in mongo[table].find()
          },
      )

    self.collectActiveItems()

  def collectActiveItems(self):
    mongo = self.mongo

    present = now()
    self.packageActive = {
        record['_id']
        for record in mongo.package.find(
            {
                'startDate': {'$lte': present},
                'endDate': {'$gte': present},
            },
        )
    }
    self.typeActive = set(chain.from_iterable(
        record.get('typeContribution', [])
        for (_id, record) in self.package.items()
        if _id in self.packageActive
    ))

    self.criteriaActive = {
        _id
        for (_id, record) in self.criteria.items()
        if record['package'] in self.packageActive
    }
    self.typeCriteria = {}
    for (_id, record) in self.criteria.items():
      if _id not in self.criteriaActive:
        continue
      for tp in record.get('typeContribution', []):
        self.typeCriteria.setdefault(tp, set()).add(_id)

  def getField(
      self,
      record,
      fieldName,
      relTable=None,
      multiple=False,
  ):
    relTable = relTable or fieldName
    rawValue = record.get(fieldName, [] if multiple else None)
    valTable = getattr(self, relTable, {})
    return (
        [
            valTable.get(rawVal, {})
            for rawVal in rawValue
        ]
        if multiple else
        valTable.get(rawValue, {})
    )
