import os

from flask import request, session
from controllers.utils import (
    serverprint, utf8FromLatin1, E, BLANK, PIPE, NL, AT, WHYPHEN
)
from controllers.config import Config as C, Names as N
from controllers.perm import (
    sysadmin, superuser, coordinator, authenticated, AUTH, UNAUTH
)

CB = C.base
CW = C.web


SECRET_FILE = CB.secretFile
SHIB_KEY = CB.shibKey
ATTRIBUTES = CB.attributes

UNKNOWN = CW.unknown
UNKNOWN_COUNTRY = UNKNOWN[N.country]
UNKNOWN_USER = UNKNOWN[N.user]
UNKNOWN_GROUP = UNKNOWN[N.group]


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
    self.user = {}

  def clearUser(self):
    user = self.user
    user.clear()
    user.update(self.unauthUser)

  def getUser(self, eppn, email=None):
    # this is called to get extra information for an authenticated user from the database
    # but the database may still say that the user may not login
    user = self.user
    db = self.db
    authority = self.authority
    authId = self.authId

    userFound = [
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
    user.clear()
    user.update({
        N.eppn: eppn,
        N.authority: authority,
    })
    if email:
      user[N.email] = email
    if len(userFound) == 1:
      user.update(userFound[0])
    if not user.get(N.mayLogin, True):
      # this checks whether mayLogin is explicitly set to False
      self.clearUser()
    else:
      if N.group not in user:
        user[N.group] = authId
        user[N.groupRep] = AUTH

  def checkLogin(self):
    db = self.db
    user = self.user
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
        serverprint("""Low level error: {}""".format(err))

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
        if user.get(N.group, None) == unauthId:
          # the user us refused because the database says (s)he may not login
          self.clearUser()
          return

        if N.group not in user:
          # new users do not have yet group information
          user.update(authUser)

        # process the attributes provided by the identity server
        # they may have been changed after the last login
        attributes = {
            toolKey: utf8FromLatin1(env.get(envKey, ''))
            for (envKey, toolKey) in ATTRIBUTES.items()
            if envKey in env
        }
        user.update(attributes)
        if N._id in user:
          db.updateUser(user)
        else:
          _id = db.insertUser(user)
          user[N._id] = _id
      else:
        user.update(unauthUser)

  def identity(self, record):
    db = self.db
    user = self.user

    name = record.get(N.name, None) or E
    if not name:
      firstName = record.get(N.firstName, None) or E
      lastName = record.get(N.lastName, None) or E
      name = (
          firstName +
          (BLANK if firstName and lastName else E) +
          lastName
      )
    group = user.get(N.groupRep, None) or UNAUTH
    isAuth = group != UNAUTH
    org = record.get(N.org, None) or E
    orgRep = f""" ({org})""" if org else E
    email = (record.get(N.email, None) or E) if isAuth else E
    authority = (record.get(N.authority, None) or E) if isAuth else E
    authorityRep = f"""{WHYPHEN}{authority}""" if authority else E
    eppn = (record.get(N.eppn, None) or E) if isAuth else E

    countryId = record.get(N.country, None)
    countryInfo = db.country.get(countryId, {})
    countryLong = (
        f"""{countryInfo.get(N.name, None) or N.unknown}"""
        f""" ({countryInfo.get(N.iso, None) or E})"""
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
    user = self.user

    group = user.get(N.groupRep, None) or UNAUTH
    groupDesc = db.permissionGroupDesc.get(group, None) or UNKNOWN_GROUP

    if group == UNAUTH:
      return (N.Guest, groupDesc)

    identityRep = self.identity(user)

    return (identityRep, groupDesc)

  def authenticate(self, login=False):
    user = self.user
    unauthId = self.unauthId

    # if login=True we want to log the user in
    # if login=False we only want the current user information

    if login:
      session.pop(N.eppn, None)
      self.checkLogin()
      if (user.get(N.group, None) or unauthId) != unauthId:
        # in this case there is an eppn
        session[N.eppn] = user[N.eppn]
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
    user = self.user
    return authenticated(user)

  def coordinator(self):
    user = self.user
    return (
        self.country()
        if coordinator(user) else
        {}
    )

  def superuser(self):
    user = self.user
    return superuser(user)

  def sysadmin(self):
    user = self.user
    return sysadmin(user)

  def country(self):
    db = self.db
    user = self.user

    countryId = user.get(N.country, None)
    return db.country.get(countryId, {})
