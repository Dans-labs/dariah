from itertools import chain

from controllers.utils import asIterable
from controllers.config import Config as C, Names as N

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


def getPerms(perm, require):
  readRequire = (
      DEFAULT_PERM[N.read]
      if require is None or N.read not in require else
      require[N.read]
  )
  editRequire = (
      DEFAULT_PERM[N.edit]
      if require is None or N.edit not in require else
      require[N.edit]
  )
  return (
      checkPerm(readRequire, perm),
      checkPerm(editRequire, perm),
  )


def permRecord(user, record, country=None, ourFields=[]):
  uid = user.get(N._id, None)
  group = user.get(N.groupRep, None) or UNAUTH
  uCountry = user.get(N.country, None)
  refCountry = country or record.get(country, None)
  ourValues = set(chain.from_iterable(
      asIterable(record.get(field, None) or [])
      for field in ourFields
  ))

  return {
      N.group: group,
      N.isOwn: (
          group != UNAUTH
          and
          uid is not None
          and (
              uid == record.get(N.creator, None)
          )
      ),
      N.isEdit: (
          group != UNAUTH
          and
          uid is not None
          and (
              uid == record.get(N.creator, None)
              or
              uid in (record.get(N.editors, None) or set())
          )
      ),
      N.isOur: (
          group != UNAUTH
          and
          uid is not None
          and (
              uid == record.get(N.creator, None)
              or
              uid in (record.get(N.editors, None) or set())
              or
              uid in ourValues
          )
      ),
      N.sameCountry: (
          refCountry is not None
          and
          refCountry == uCountry
      ),
  }
