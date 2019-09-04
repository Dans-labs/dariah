from pymongo import MongoClient
from bson.objectid import ObjectId

client = MongoClient()
db = client.dariah


def test():
  results = db.reviewEntry.aggregate([
      {
          '$lookup': {
              'from': 'assessment',
              'localField': 'assessment',
              'foreignField': '_id',
              'as': 'assessments',
          },
      },
      {
          '$match': {
              'assessments.creator': ObjectId('00000000ee11cbb190000019'),
          },
      },
      {
          '$project': {
              'assessments': False,
              '_id': False,
              'creator': False,
              'dateCreated': False,
              'modified': False,
          },
      },
  ])

  for result in results:
    seq = result['seq']
    comments = '\n\t'.join(result['comments'])
    print(f'{seq}: {comments}')


ourFields = [
    {
        'assessment': [
            'reviewerE',
            'reviewerF',
        ],
    },
    'creator',
    'editors',
    {
        'review': [
            'creator',
        ],
    }
]


class N(object):
  pass


setattr(N, '_id', '_id')


class Me(object):
  pass


setattr(Me, 'uid', ObjectId("00000000ee11cbb190000019"))


def makeOurFilter(self, ourFields):
  rowFilter = None
  aggregate = None
  if not ourFields or ourFields is True:
    rowFilter = {N._id: {'$in': []}}  # intentionally always false
  else:
    mainFields = set()
    masterFields = {}
    for entry in ourFields:
      if type(entry) is str:
        mainFields.add(entry)
      else:
        for (table, fields) in entry.items():
          for field in fields:
            masterFields.setdefault(table, set()).add(field)

    if mainFields:
      rowFilter = {'$or': [{ourField: self.uid} for ourField in mainFields]}
    if masterFields:
      lookups = []
      matches = []
      projects = []
      for (table, fields) in masterFields.items():
        lookups.append(
            {
                '$lookup': {
                    'from': table,
                    'localField': table,
                    'foreignField': '_id',
                    'as': f'{table}s',
                },
            },
        )
        matches.extend(
            [{f'{table}s.{field}': self.uid} for field in fields]
        )
        projects.append(f'{table}s')

      aggregate = [
          *lookups,
          {'$or': matches},
          {'$project': {t: False for t in projects}}
      ]

    return (rowFilter, aggregate)


# test()

(rowFilter, aggregate) = makeOurFilter(Me, ourFields)

print('ROWFILTER')
print(rowFilter)

print('AGGREGATE')
print(aggregate)
