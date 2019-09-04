from controllers.common import Database, User


PAGE = '/review/my'


def getReview(verb, userInfo):
  db = Database()
  U = User(db, userInfo)
  if verb == 'my':
    return getMy(db, U)
  return {}


def getMy(db, U):
  material = 'Hello world'
  data = {
      'material': material,
      'user': U.identityRep,
  }
  return data


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
