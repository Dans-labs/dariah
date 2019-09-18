from controllers.common import Database, User, Wrap


def getReview(verb, userInfo):
  db = Database()
  U = User(db, userInfo)
  W = Wrap(db, U)
  if verb == 'my':
    return getMy(W)
  return {}


def modReview(userInfo):
  db = Database()
  U = User(db, userInfo)
  if U.group not in db.ALLOWED:
    return {
        'good': False,
        'kind': 'error',
        'msg': 'You are not a national coordinator or a member of the back office',
    }
  return {
      'good': False,
      'kind': 'error',
      'msg': 'Nothing was done',
  }


def getMy(W):
  msg = W.getAssessments()
  material = []
  material.append('''
<h1>Assessments and reviews</h1>
''')
  if msg:
    material.append(f'''
<div class="error-boundary">
  <p>{msg}</p>
</div>
''')

  assessmentsByCat = W.categorizeAssessments()
  for (cat, assessments) in assessmentsByCat.items():
    material.append(f'''
<h2>{cat} ({len(assessments)})</h2>
''')
    for assessment in assessments:
      material.append(W.wrapAssessment(assessment))

  data = {
      'material': '\n'.join(material),
      'user': W.U.identityRep,
  }
  return data
