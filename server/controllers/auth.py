import os
import re
from flask import request, session
from controllers.user import UserApi
from controllers.utils import utf8FromLatin1, serverprint
from models.compiled.model import model as M
from models.compiled.names import N

PM = M[N.permissions]

CSS = '<link href="/static/dist/main.css" rel="stylesheet">'
JS = '''
  <script type="text/javascript" src="/static/dist/vendor.js"></script>
  <script type="text/javascript" src="/static/dist/app.js"></script>
  <script type="text/javascript" src="/static/dist/main.js"></script>
'''

DYN_INFO_FILE = '../static/dist/bundle.html'

cssRe = re.compile('<link [^>]*>', re.S)
jsRe = re.compile('<body>(.*)</body>', re.S)


def readBundleNames(regime):
  if regime == N.hot:
    serverprint('STATIC INFO')
    css = CSS
    js = JS
  else:
    if not os.path.exists(DYN_INFO_FILE):
      serverprint(f'CANNOT READ {DYN_INFO_FILE}. Falling back to static info ...')
      css = CSS
      js = JS
    else:
      serverprint(f'DYNAMIC INFO from {DYN_INFO_FILE}')
      with open(DYN_INFO_FILE) as dh:
        html = dh.read()
      html = html.replace('src="', 'src="/static/dist/')
      html = html.replace('href="', 'href="/static/dist/')
      match = cssRe.search(html)
      css = match.group(0)
      match = jsRe.search(html)
      js = match.group(1).strip().replace('</script><script', '</script>\n<script')
  return (css, js)


class AuthApi(UserApi):

  def __init__(self, DB, app, secret_file):
    super().__init__(DB)
    self.app = app

    # determine production or devel
    regime = os.environ.get(N.REGIME, None)
    self.isDevel = regime in {N.devel, N.hot}

    # read the code to import the generated CSS and Javascripts when in production

    (self.CSS, self.JS) = readBundleNames(regime)

    # read secret from the system
    self.secret = ''
    with open(secret_file) as fh:
      app.secret_key = fh.read()

    # wrap the app to enable session middleware

    # session_opts = {
    #     'session.key': 'dariah.session.id',
    #     'session.auto': True,
    #     'session.use_cookies': True,
    #     'session.type': 'memory',
    #     'session.cookie_expires': True,
    #     'session.data_serializer': 'json',
    #     'session.encrypt_key': self.secret,
    #     'session.httponly': True,
    #     'session.timeout': 3600 * 24,  # 1 day
    #     'session.validate_key': 'xxx',
    #     'session.secure': not self.isDevel,
    # }
    # self._session_key = 'dariah.session'

  def debugPrint(self, msg):
    if self.isDevel:
      serverprint(msg)

  def authenticate(self, login=False):
    unauth = PM[N.unauth]
    unauthId = self.DB.idFromGroup[unauth]
    unauthUser = {N.group: unauthId, N.groupRep: unauth}
    auth = PM[N.auth]
    authId = self.DB.idFromGroup[auth]

    # if login=False we only want the current user information
    # if login=True we want to log the user in

    # check for a session and if so, get the eppn and fill in the userinfo

    if login:
      self._delete_session
      self._checkLogin(unauthUser)
      if (
          self.userInfo is not None
          and
          self.userInfo.get(N.group) != unauthId
      ):
        if (self.userInfo.get(N.group, None) is None or self.userInfo.get(N.authority, None)):
          if self.userInfo.get(N.group, None) is None:
            self.userInfo[N.group] = authId
          if self.userInfo.get(N.authority, None) is None:
            authority = N.local if self.isDevel else N.DARIAH
            self.userInfo[N.authority] = authority
        group = self.userInfo[N.group]
        groupRep = self.DB.groupFromId[group]
        self.userInfo[N.groupRep] = groupRep
        self.userInfo = self.storeUpdate(self.userInfo)
        if self.userInfo.get(N.mayLogin, False):
          self._create_session()
        else:
          self.userInfo = unauthUser
    else:
      eppn = self._get_session()
      if not eppn:
        self.userInfo = unauthUser
      else:
        self.userInfo = self.getUser(eppn) or unauthUser

  def deauthenticate(self):
    unauth = PM[N.unauth]
    unauthId = self.DB.idFromGroup[unauth]
    self.userInfo = {N.group: unauthId, N.groupRep: unauth}
    self._delete_session()

  def _create_session(self):
    session[N.eppn] = self.userInfo[N.eppn]

  def _delete_session(self):
    session.pop(N.eppn, None)

  def _get_session(self):
    return session.get(N.eppn, None)

  def _checkLogin(self, unauthUser):
    env = request.environ
    if self.isDevel:
      testUsers = self.getTestUsers()

      MAX_ITER = 3
      i = 0
      stop = False
      while not stop and i < MAX_ITER:
        try:
          eppn = input('{}|email address: '.format('|'.join(testUsers)))
          if eppn is not None:
            eppn = eppn.split('\n', 1)[0]
            stop = True
        except Exception as err:
          serverprint('Low level error: {}'.format(err))
          if eppn:
            stop = True
          else:
            serverprint('Try again')

      if eppn in testUsers:
        self.userInfo = testUsers[eppn]
      else:
        parts = eppn.split('@', 1)
        if len(parts) == 1:
          self.userInfo = unauthUser
        else:
          (name, domain) = parts
          self.userInfo = {
              N.eppn: '{}@local.host'.format(name),
              N.email: eppn,
              N.authority: N.local,
          }
    else:
      sKey = 'Shib-Session-ID'
      authenticated = sKey in env and env[sKey]
      if authenticated:
        eppn = utf8FromLatin1(env[N.eppn])
        email = utf8FromLatin1(env[N.mail])
        self.userInfo = self.getUser(eppn, email=email)
        attributes = {}
        if N.o in env:
          attributes[N.org] = utf8FromLatin1(env[N.o])
        if N.cn in env:
          attributes[N.name] = utf8FromLatin1(env[N.cn])
        if N.givenName in env:
          attributes[N.firstName] = utf8FromLatin1(env[N.givenName])
        if N.sn in env:
          attributes[N.lastName] = utf8FromLatin1(env[N.sn])
        if N.isMemberOf in env:
          attributes[N.membership] = utf8FromLatin1(env[N.isMemberOf])
        if N.affiliation in env:
          attributes[N.rel] = utf8FromLatin1(env[N.affiliation])
        self.userInfo.update(attributes)
      else:
        self.userInfo = unauthUser
