from itertools import chain

from controllers.utils import asIterable
from controllers.config import Config as C, Names as N


DEFAULT_PERM = C.perm[N.default]
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
    U,
    record,
    require,
    country=None,
    perm=None,
):
  if require == UNAUTH:
    return True

  if perm is None:
    perm = permRecord(U, record, country=country)

  group = perm[N.group]

  if require == NOBODY:
    return False

  if require == AUTH:
    return group != UNAUTH

  if require == OFFICE:
    return group in {OFFICE, SYSTEM, ROOT}

  if require == SYSTEM:
    return group in {SYSTEM, ROOT}

  if require == ROOT:
    return group == ROOT

  if require == EDIT:
    return group != UNAUTH and perm[N.isEdit]

  if require == OWN:
    return group != UNAUTH and perm[N.isOwn]

  if require == COORD:
    return (
        group == COORD and perm[N.sameCountry]
        or
        group in {OFFICE, SYSTEM, ROOT}
    )


def authenticated(U):
  group = U.get(N.groupRep, UNAUTH)
  return group != UNAUTH


def coordinator(U):
  group = U.get(N.groupRep, UNAUTH)
  return group == COORD

  return group in {OFFICE, SYSTEM, ROOT}


def superuser(U):
  group = U.get(N.groupRep, UNAUTH)
  return group in {OFFICE, SYSTEM, ROOT}


def sysadmin(U):
  group = U.get(N.groupRep, UNAUTH)
  return group in {SYSTEM, ROOT}


def getPerms(U, P, record, require):
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
      checkPerm(U, record, readRequire, perm=P),
      checkPerm(U, record, editRequire, perm=P),
  )


def permRecord(U, record, country=None, ourFields=[]):
  uid = U.get(N._id, None)
  group = U.get(N.groupRep, UNAUTH)
  uCountry = U.get(N.country, None)
  refCountry = country or record.get(country, None)
  ourValues = set(chain.from_iterable(
      asIterable(record.get(field, []))
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
              uid in record.get(N.editors, set())
          )
      ),
      N.isOur: (
          group != UNAUTH
          and
          uid is not None
          and (
              uid == record.get(N.creator, None)
              or
              uid in record.get(N.editors, set())
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
