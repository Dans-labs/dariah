from controllers.names import Names as N


def checkPerm(
    U,
    record,
    require,
    country=None,
    perm=None,
):
  if require == N.public:
    return True

  if perm is None:
    perm = permRecord(U, record, country=country)

  group = perm['group']

  if require == N.nobody:
    return False

  if require == N.auth:
    return group != N.public

  if require == N.office:
    return group in {N.office, N.system, N.root}

  if require == N.system:
    return group in {N.system, N.root}

  if require == N.root:
    return group == N.root

  if require == N.own:
    return group != N.public and perm['isOwn']

  if require == N.coord:
    return (
        group == N.coord and perm['sameCountry']
        or
        group in {N.office, N.system, N.root}
    )


def getPerms(U, P, record, require):
  readRequire = (
      N.public
      if require is None or 'read' not in require else
      require['read']
  )
  editRequire = (
      N.own
      if require is None or 'edit' not in require else
      require['edit']
  )
  return (
      checkPerm(U, record, readRequire, perm=P),
      checkPerm(U, record, editRequire, perm=P),
  )


def permRecord(U, record, country=None):
  uid = U.get('_id', None)
  group = U.get('groupRep', N.public)
  uCountry = U.get('country', None)
  refCountry = country or record.get(country, None)

  return {
      'group': group,
      'isOwn': (
          group != N.public
          and
          uid is not None
          and (
              uid == record.get('creator', None)
              or
              uid in record.get('editors', set())
          )
      ),
      'sameCountry': (
          refCountry is not None
          and
          refCountry == uCountry
      ),
  }
