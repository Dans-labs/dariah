class User(object):
  def __init__(self, db, userInfo):
    self.uid = userInfo.get('_id', '')
    self.name = userInfo.get('name', '')
    if not self.name:
      firstName = userInfo.get('firstName', '')
      lastName = userInfo.get('lastName', '')
      self.name = (
          firstName +
          (' ' if firstName and lastName else '') +
          lastName
      )
    self.org = userInfo.get('org', '')
    self.orgRep = f' ({self.org})' if self.org else ''
    self.email = userInfo.get('email', '')
    self.authority = userInfo.get('authority', '')
    self.authorityRep = f' - {self.authority}' if self.authority else ''
    self.eppn = userInfo.get('eppn', '')

    self.countryId = userInfo.get('country', None)
    self.countryInfo = db.COUNTRY.get(self.countryId, {})
    self.countryLong = (
        f'{self.countryInfo.get("name", "unknown")} ({self.countryInfo.get("iso", "")})'
        if self.countryInfo else
        None
    )
    self.countryShort = self.countryInfo.get('iso', 'unknown')

    self.group = userInfo.get('groupRep', 'public')
    self.groupDesc = userInfo.get('groupDesc', 'public')

    self.identityRep = (
        f'{self.name}{self.orgRep}'
        if self.name else
        f'{self.email}{self.orgRep}'
        if self.email else
        f'{self.eppn}{self.authorityRep}'
        if self.eppn else
        'unidentified user!'
    ) + ' from ' + (
        self.countryShort
    ) + f' ({self.groupDesc})'

    self.accessRep = (
        f'({self.groupDesc}' +
        (f'-{self.countryShort}' if self.group == db.COORD else '') +
        ')'
    )


