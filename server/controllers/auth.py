import os
from datetime import datetime

from flask import request, session
from controllers.utils import utf8FromLatin1

SECRET_FILE = '/opt/web-apps/dariah_jwt.secret'

AUTH = 'auth'
AUTH_DESC = 'authenticated user'
UNAUTH = 'public'
UNAUTH_DESC = 'user, not logged in'
COORD = 'coord'
COORD_DESC = 'national coordinator'


class Auth(object):

  def __init__(self, app, MONGO, values):
    self.values = values
    self.MONGO = MONGO

    # determine production or devel
    regime = os.environ.get('REGIME', None)
    self.isDevel = regime == 'devel'
    self.authority = 'local' if self.isDevel else 'dariah'

    # read secret from the system
    self.secret = ''
    with open(SECRET_FILE) as fh:
      app.secret_key = fh.read()

    self.authId = values.permissionGroupInv.get(AUTH, None)
    self.authUser = {'group': self.authId, 'groupRep': AUTH, 'groupDesc': AUTH_DESC}
    self.unauthId = values.permissionGroupInv.get(UNAUTH, None)
    self.unauthUser = {'group': self.unauthId, 'groupRep': UNAUTH, 'groupDesc': UNAUTH_DESC}
    self.clearUser()

  def clearUser(self):
    self.userInfo = {}
    self.userInfo.update(self.unauthUser)

  def getUser(self, eppn, email=None):
    # this is called to get extra information for an authenticated user from the database
    # but the database may still say that the user may not login
    user = [
        record
        for record in self.values.user.values()
        if (
            record.get('authority', None) == self.authority
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
    self.userInfo = {
        'eppn': eppn,
        'authority': self.authority,
    }
    if email:
      self.userInfo['email'] = email
    if len(user) == 1:
      self.userInfo.update(user[0])
    if not self.userInfo.get('mayLogin', True):
      # this checks whether mayLogin is explicitly set to False
      self.clearUser()
    else:
      if 'group' not in self.userInfo:
        self.userInfo['group'] = self.authId
        self.userInfo['groupRep'] = AUTH

  def storeUser(self):
    # only called when there is an eppn
    # yet we check and do nothing if there is not an eppn
    eppn = self.userInfo.get('eppn', None)
    if not eppn:
      return

    now = datetime.utcnow()
    self.userInfo.update({
        'dateCreated': now,
        'dateLastLogin': now,
        'statusLastLogin': 'Approved',
        'mayLogin': True,
    })
    if '_id' in self.userInfo:
      record = {}
      record.update(self.userInfo)
      if 'isPristine' in record:
        del record['isPristine']
      criterion = {'_id': record['_id']}
      del record['_id']
      self.MONGO.user.update_one(
          criterion,
          {
              '$set': record,
              '$unset': {
                  'isPristine': ''
              }
          },
      )
    else:
      result = self.MONGO.user.insert_one(record)
      _id = result.inserted_id
      self.userInfo['_id'] = _id

  def checkLogin(self):
    env = request.environ
    self.clearUser()
    if self.isDevel:
      testUsers = {
          record['eppn']: record
          for record in self.values.user.values()
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
        print('XXX', eppn, email, self.userInfo)
        if self.userInfo.get('group', None) == self.unauthId:
          # the user us refused because the database says (s)he may not login
          self.clearUser()
          return

        if 'group' not in self.userInfo:
          # new users do not have yet group information
          self.userInfo.update(self.authUser)
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
        self.userInfo.update(attributes)
      else:
        self.userInfo.update(self.unauthUser)

  def authenticate(self, login=False):

    # if login=True we want to log the user in
    # if login=False we only want the current user information

    if login:
      session.pop('eppn', None)
      self.checkLogin()
      if self.userInfo.get('group', self.unauthId) != self.unauthId:
        # in this case there is an eppn
        self.storeUser()
        session['eppn'] = self.userInfo['eppn']
    else:
      eppn = session.get('eppn', None)
      if eppn:
        self.getUser(eppn)
      else:
        self.clearUser()

  def deauthenticate(self):
    self.clearUser()
    session.pop('eppn', None)
