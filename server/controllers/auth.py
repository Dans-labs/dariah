import os
from datetime import datetime

from flask import request, session
from controllers.utils import utf8FromLatin1

SECRET_FILE = '/opt/web-apps/dariah_jwt.secret'


class Auth(object):

  def __init__(self, app, mongo, db):
    self.db = db
    self.mongo = mongo

    # determine production or devel
    regime = os.environ.get('REGIME', None)
    self.isDevel = regime == 'devel'
    self.authority = 'local' if self.isDevel else 'DARIAH'

    # read secret from the system
    self.secret = ''
    with open(SECRET_FILE) as fh:
      app.secret_key = fh.read()

    AUTH = db.names.auth
    UNAUTH = db.names.public
    self.authId = db.permissionGroupInv.get(AUTH, None)
    self.authUser = {'group': self.authId, 'groupRep': AUTH}
    self.unauthId = db.permissionGroupInv.get(UNAUTH, None)
    self.unauthUser = {'group': self.unauthId, 'groupRep': UNAUTH}
    self.userInfo = {}

  def clearUser(self):
    U = self.userInfo
    U.clear()
    U.update(self.unauthUser)

  def getUser(self, eppn, email=None):
    # this is called to get extra information for an authenticated user from the database
    # but the database may still say that the user may not login
    U = self.userInfo
    db = self.db
    authority = self.authority
    authId = self.authId

    user = [
        record
        for record in db.user.values()
        if (
            record.get('authority', None) == authority
            and
            (
                (eppn is not None and record.get('eppn', None) == eppn)
                or
                (
                    eppn is None and
                    email is not None and
                    record.get('eppn', None) is None and
                    record.get('email', None) == email
                )
            )
        )
    ]
    U.clear()
    U.update({
        'eppn': eppn,
        'authority': authority,
    })
    if email:
      U['email'] = email
    if len(user) == 1:
      U.update(user[0])
    if not U.get('mayLogin', True):
      # this checks whether mayLogin is explicitly set to False
      self.clearUser()
    else:
      AUTH = db.names.auth
      if 'group' not in U:
        U['group'] = authId
        U['groupRep'] = AUTH

  def storeUser(self):
    # only called when there is an eppn
    # yet we check and do nothing if there is not an eppn
    U = self.userInfo
    mongo = self.mongo

    eppn = U.get('eppn', None)
    if not eppn:
      return

    now = datetime.utcnow()
    U.update({
        'dateCreated': now,
        'dateLastLogin': now,
        'statusLastLogin': 'Approved',
        'mayLogin': True,
    })
    if '_id' in U:
      record = {}
      record.update(U)
      if 'isPristine' in record:
        del record['isPristine']
      criterion = {'_id': record['_id']}
      del record['_id']
      mongo.user.update_one(
          criterion,
          {
              '$set': record,
              '$unset': {
                  'isPristine': ''
              }
          },
      )
    else:
      result = mongo.user.insert_one(record)
      _id = result.inserted_id
      U['_id'] = _id

  def checkLogin(self):
    db = self.db
    U = self.userInfo
    isDevel = self.isDevel
    authUser = self.authUser
    unauthUser = self.unauthUser
    unauthId = self.unauthId

    env = request.environ
    self.clearUser()
    if isDevel:
      testUsers = {
          record['eppn']: record
          for record in db.user.values()
          if 'eppn' in record and record.get('authority', None) == 'local'
      }

      try:
        answer = input('{}|email address: '.format('|'.join(testUsers)))
        if answer is not None:
          answer = answer.split('\n', 1)[0]
      except Exception as err:
        print('Low level error: {}'.format(err))

      if answer in testUsers:
        self.getUser(answer)
      else:
        parts = answer.split('@', 1)
        if len(parts) == 1:
          self.clearUser()
        else:
          (name, domain) = parts
          eppn = f'{name}@local.host'
          self.getUser(eppn, email=answer)
    else:
      sKey = 'Shib-Session-ID'
      authenticated = sKey in env and env[sKey]
      if authenticated:
        eppn = utf8FromLatin1(env['eppn'])
        email = utf8FromLatin1(env['mail'])
        self.getUser(eppn, email=email)
        if U.get('group', None) == unauthId:
          # the user us refused because the database says (s)he may not login
          self.clearUser()
          return

        if 'group' not in U:
          # new users do not have yet group information
          U.update(authUser)
        attributes = {}
        if 'o' in env:
          attributes['org'] = utf8FromLatin1(env['o'])
        if 'cn' in env:
          attributes['name'] = utf8FromLatin1(env['cn'])
        if 'givenName' in env:
          attributes['firstName'] = utf8FromLatin1(env['givenName'])
        if 'sn' in env:
          attributes['lastName'] = utf8FromLatin1(env['sn'])
        if 'isMemberOf' in env:
          attributes['membership'] = utf8FromLatin1(env['isMemberOf'])
        if 'affiliation' in env:
          attributes['rel'] = utf8FromLatin1(env['affiliation'])
        U.update(attributes)
      else:
        U.update(unauthUser)

  def identity(self, record):
    db = self.db
    U = self.userInfo

    name = record.get('name', '')
    if not name:
      firstName = record.get('firstName', '')
      lastName = record.get('lastName', '')
      name = (
          firstName +
          (' ' if firstName and lastName else '') +
          lastName
      )
    UNAUTH = db.names.public
    group = U.get('groupRep', UNAUTH)
    isAuth = group != UNAUTH
    org = record.get('org', '')
    orgRep = f' ({org})' if org else ''
    email = record.get('email', '') if isAuth else ''
    authority = record.get('authority', '') if isAuth else ''
    authorityRep = f' - {authority}' if authority else ''
    eppn = record.get('eppn', '') if isAuth else ''

    countryId = record.get('country', None)
    countryInfo = db.country.get(countryId, {})
    countryLong = (
        f'{countryInfo.get("name", "unknown")} ({countryInfo.get("iso", "")})'
        if countryInfo else
        'unkown country'
    )

    identityRep = (
        f'{name}{orgRep}'
        if name else
        f'{email}{orgRep}'
        if email else
        f'{eppn}{authorityRep}'
        if eppn else
        'unidentified user!'
    ) + ' from ' + (
        countryLong
    )
    return identityRep

  def credentials(self):
    db = self.db
    U = self.userInfo

    UNAUTH = db.names.public
    group = U.get('groupRep', UNAUTH)
    groupDesc = db.config.groups.get(group, 'unknown group')

    if group == UNAUTH:
      return ('Guest', groupDesc)

    identityRep = self.identity(U)

    return (identityRep, groupDesc)

  def authenticate(self, login=False):
    U = self.userInfo
    unauthId = self.unauthId

    # if login=True we want to log the user in
    # if login=False we only want the current user information

    if login:
      session.pop('eppn', None)
      self.checkLogin()
      if U.get('group', unauthId) != unauthId:
        # in this case there is an eppn
        self.storeUser()
        session['eppn'] = U['eppn']
    else:
      eppn = session.get('eppn', None)
      if eppn:
        self.getUser(eppn)
      else:
        self.clearUser()

  def deauthenticate(self):
    self.clearUser()
    session.pop('eppn', None)
