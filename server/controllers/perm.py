from controllers.config import Config as C, Names as N
from controllers.workflow import Workflow

CT = C.tables
CP = C.perm

DEFAULT_PERM = CP.default
NOBODY = N.nobody
UNAUTH = N.public
AUTH = N.auth
OUR = N.our
EDIT = N.edit
OWN = N.own
COORD = N.coord
OFFICE = N.office
SYSTEM = N.system
ROOT = N.root

ALLOW_OUR = set(CT.userTables) | set(CT.userEntryTables)


def checkPerm(
    require,
    perm,
):
  if require == UNAUTH:
    return True

  group = perm[N.group]

  if require == NOBODY:
    return False

  if require == AUTH:
    return group != UNAUTH

  isSuper = group in {OFFICE, SYSTEM, ROOT}

  if require == OFFICE:
    return isSuper

  if require == SYSTEM:
    return group in {SYSTEM, ROOT}

  if require == ROOT:
    return group == ROOT

  if require == EDIT:
    return group != UNAUTH and (perm[N.isEdit] or isSuper)

  if require == OWN:
    return group != UNAUTH and (perm[N.isOwn] or isSuper)

  if require == COORD:
    return (
        group == COORD and perm[N.sameCountry]
        or
        isSuper
    )


def authenticated(user):
  group = user.get(N.groupRep, None) or UNAUTH
  return group != UNAUTH


def coordinator(user):
  group = user.get(N.groupRep, None) or UNAUTH
  return group == COORD

  return group in {OFFICE, SYSTEM, ROOT}


def superuser(user):
  group = user.get(N.groupRep, None) or UNAUTH
  return group in {OFFICE, SYSTEM, ROOT}


def sysadmin(user):
  group = user.get(N.groupRep, None) or UNAUTH
  return group in {SYSTEM, ROOT}


def getPerms(table, perm, require):
  mayRead = None
  if table in ALLOW_OUR:
    mayRead = perm[N.isOur] or None
  if mayRead is None:
    readRequire = (
        DEFAULT_PERM[N.read]
        if require is None or N.read not in require else
        require[N.read]
    )
    mayRead = checkPerm(readRequire, perm)

  editRequire = (
      DEFAULT_PERM[N.edit]
      if require is None or N.edit not in require else
      require[N.edit]
  )
  mayEdit = checkPerm(editRequire, perm)
  return (mayRead, mayEdit)


def permRecord(db, user, table, record):
  uid = user.get(N._id, None)
  group = user.get(N.groupRep, None) or UNAUTH
  uCountry = user.get(N.country, None)

  cRecord = {}
  aRecord = {}

  if table == N.contrib:
    cRecord = record
  elif table == N.assessment:
    aRecord = record
    cId = record.get(N.contrib, None)
    cRecord = db.getItem(N.contrib, cId)
  elif table in {N.review, N.criteriaEntry, N.reviewEntry}:
    aId = record.get(N.assessment, None)
    aRecord = db.getItem(N.assessment, aId)
    cId = aRecord.get(N.contrib, None)
    cRecord = db.getItem(N.contrib, cId)

  refCountry = cRecord.get(N.country, None)
  reviewerE = aRecord.get(N.reviewerE, None)
  reviewerF = aRecord.get(N.reviewerF, None)
  reviewers = {reviewerE, reviewerF} - {None}

  sameCountry = (
      refCountry is not None
      and
      refCountry == uCountry
  )
  isAuth = group != UNAUTH and uid is not None
  isCreator = uid == record.get(N.creator, None)
  isEditor = uid in (record.get(N.editors, None) or set())
  isCoordinated = isAuth and sameCountry and group == COORD

  isOur = isCoordinated or isCreator or isEditor or uid in reviewers

  return (
      {
          N.group: group,
          N.country: refCountry,
          N.isOwn: isAuth and isCreator,
          N.isEdit: isAuth and (isCreator or isEditor),
          N.sameCountry: sameCountry,
          N.isCoordinated: isCoordinated,
          N.isOur: isOur,
      },
      Workflow({
          N.contrib: cRecord,
          N.contribId: cRecord.get(N._id, None),
          N.contribType: cRecord.get(N.typeContribution, None),
          N.assessment: aRecord,
          N.assessmentId: aRecord.get(N._id, None),
          N.assessmentType: aRecord.get(N.assessmentType, None),
          N.reviewers: reviewers,
          N.reviewerE: reviewerE,
          N.reviewerF: reviewerF,
      }),
  )
