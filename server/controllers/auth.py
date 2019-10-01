import os

from flask import request, session
from controllers.utils import (
    utf8FromLatin1, E, BLANK, PIPE, NL, AT, WHYPHEN
)
from controllers.config import Config as C, Names as N
from controllers.perm import sysadmin, superuser, coordinator, authenticated, AUTH, UNAUTH

SECRET_FILE = C.base[N.secretFile]
SHIB_KEY = C.base[N.shibKey]
ATTRIBUTES = C.base[N.attributes]

UNKNOWN_COUNTRY = C.html[N.unknown][N.country]
UNKNOWN_USER = C.html[N.unknown][N.user]
UNKNOWN_GROUP = C.html[N.unknown][N.group]


class Auth(object):

  def __init__(self, app, db):
    self.db = db

    # determine production or devel
    regime = os.environ.get(N.REGIME, None)
    self.isDevel = regime == N.devel
    self.authority = N.local if self.isDevel else N.DARIAH

    # read secret from the system
    self.secret = E
    with open(SECRET_FILE) as fh:
      app.secret_key = fh.read()

    self.authId = db.permissionGroupInv.get(AUTH, None)
    self.authUser = {N.group: self.authId, N.groupRep: AUTH}
    self.unauthId = db.permissionGroupInv.get(UNAUTH, None)
    self.unauthUser = {N.group: self.unauthId, N.groupRep: UNAUTH}
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
            record.get(N.authority, None) == authority
            and
            (
                (eppn is not None and record.get(N.eppn, None) == eppn)
                or
                (
                    eppn is None and
                    email is not None and
                    record.get(N.eppn, None) is None and
                    record.get(N.email, None) == email
                )
            )
        )
    ]
    U.clear()
    U.update({
        N.eppn: eppn,
        N.authority: authority,
    })
    if email:
      U[N.email] = email
    if len(user) == 1:
      U.update(user[0])
    if not U.get(N.mayLogin, True):
      # this checks whether mayLogin is explicitly set to False
      self.clearUser()
    else:
      if N.group not in U:
        U[N.group] = authId
        U[N.groupRep] = AUTH

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
          record[N.eppn]: record
          for record in db.user.values()
          if N.eppn in record and record.get(N.authority, None) == N.local
      }

      try:
        answer = input("""{}|email address: """.format(PIPE.join(testUsers)))
        if answer is not None:
          answer = answer.split(NL, 1)[0]
      except Exception as err:
        print("""Low level error: {}""".format(err))

      if answer in testUsers:
        self.getUser(answer)
      else:
        parts = answer.split(AT, 1)
        if len(parts) == 1:
          self.clearUser()
        else:
          (name, domain) = parts
          eppn = f"""{name}@local.host"""
          self.getUser(eppn, email=answer)
    else:
      authenticated = SHIB_KEY in env and env[SHIB_KEY]
      if authenticated:
        eppn = utf8FromLatin1(env[N.eppn])
        email = utf8FromLatin1(env[N.mail])
        self.getUser(eppn, email=email)
        if U.get(N.group, None) == unauthId:
          # the user us refused because the database says (s)he may not login
          self.clearUser()
          return

        if N.group not in U:
          # new users do not have yet group information
          U.update(authUser)

        # process the attributes provided by the identity server
        # they may have been changed after the last login
        attributes = {
            toolKey: utf8FromLatin1(env.get(envKey, ''))
            for (envKey, toolKey) in ATTRIBUTES.items()
            if envKey in env
        }
        U.update(attributes)
        if N._id in U:
          db.updateUser(U)
        else:
          _id = db.insertUser(U)
          U[N._id] = _id
      else:
        U.update(unauthUser)

  def identity(self, record):
    db = self.db
    U = self.userInfo

    name = record.get(N.name, E)
    if not name:
      firstName = record.get(N.firstName, E)
      lastName = record.get(N.lastName, E)
      name = (
          firstName +
          (BLANK if firstName and lastName else E) +
          lastName
      )
    group = U.get(N.groupRep, UNAUTH)
    isAuth = group != UNAUTH
    org = record.get(N.org, E)
    orgRep = f""" ({org})""" if org else E
    email = record.get(N.email, E) if isAuth else E
    authority = record.get(N.authority, E) if isAuth else E
    authorityRep = f"""{WHYPHEN}{authority}""" if authority else E
    eppn = record.get(N.eppn, E) if isAuth else E

    countryId = record.get(N.country, None)
    countryInfo = db.country.get(countryId, {})
    countryLong = (
        f"""{countryInfo.get(N.name, N.unknown)}"""
        f""" ({countryInfo.get(N.iso, E)})"""
        if countryInfo else
        UNKNOWN_COUNTRY
    )

    identityRep = (
        f"""{name}{orgRep}"""
        if name else
        f"""{email}{orgRep}"""
        if email else
        f"""{eppn}{authorityRep}"""
        if eppn else
        UNKNOWN_USER
    ) + """ from """ + (
        countryLong
    )
    return identityRep

  def credentials(self):
    db = self.db
    U = self.userInfo

    group = U.get(N.groupRep, UNAUTH)
    groupDesc = db.permissionGroupDesc.get(group, UNKNOWN_GROUP)

    if group == UNAUTH:
      return (N.Guest, groupDesc)

    identityRep = self.identity(U)

    return (identityRep, groupDesc)

  def authenticate(self, login=False):
    U = self.userInfo
    unauthId = self.unauthId

    # if login=True we want to log the user in
    # if login=False we only want the current user information

    if login:
      session.pop(N.eppn, None)
      self.checkLogin()
      if U.get(N.group, unauthId) != unauthId:
        # in this case there is an eppn
        session[N.eppn] = U[N.eppn]
    else:
      eppn = session.get(N.eppn, None)
      if eppn:
        self.getUser(eppn)
      else:
        self.clearUser()

  def deauthenticate(self):
    self.clearUser()
    session.pop(N.eppn, None)

  def authenticated(self):
    U = self.userInfo
    return authenticated(U)

  def coordinator(self):
    U = self.userInfo
    return (
        self.country()
        if coordinator(U) else
        {}
    )

  def superuser(self):
    U = self.userInfo
    return superuser(U)

  def sysadmin(self):
    U = self.userInfo
    return sysadmin(U)

  def country(self):
    db = self.db
    U = self.userInfo

    countryId = U.get(N.country, None)
    return db.country.get(countryId, {})
