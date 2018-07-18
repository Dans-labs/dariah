import os
import re
import bottle
from beaker.middleware import SessionMiddleware
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


def readBundleNames():
  if os.path.exists(DYN_INFO_FILE):
    serverprint('READ DYN INFO FILE')
    with open(DYN_INFO_FILE) as dh:
      html = dh.read()
    html = html.replace('src="', 'src="../static/dist/')
    html = html.replace('href="', 'href="../static/dist/')
    match = cssRe.search(html)
    css = match.group(0)
    match = jsRe.search(html)
    js = match.group(1).strip().replace('</script><script', '</script>\n<script')
  else:
    serverprint('STATIC INFO')
    css = CSS
    js = JS
  return (css, js)


class AuthApi(UserApi):
    def __init__(self, DB, secret_file):
        super().__init__(DB)

        # determine production or devel
        self.isDevel = os.environ.get(N.REGIME, None) == N.devel

        # read the code to import the generated CSS and Javascripts when in production

        (self.CSS, self.JS) = readBundleNames()

        # read secret from the system
        self.secret = ''
        with open(secret_file) as fh:
            self.secret = fh.read()

        # wrap the app to enable session middleware
        self.app = bottle.default_app()

        session_opts = {
            'session.key': 'dariah.session.id',
            'session.auto': True,
            'session.use_cookies': True,
            'session.type': 'memory',
            'session.cookie_expires': True,
            'session.data_serializer': 'json',
            'session.encrypt_key': self.secret,
            'session.httponly': True,
            'session.timeout': 3600 * 24,  # 1 day
            'session.validate_key': 'xxx',
            'session.secure': not self.isDevel,
        }
        self._session_key = 'dariah.session'
        self.app = SessionMiddleware(
            self.app, session_opts, environ_key=self._session_key
        )

    def debugPrint(self, msg):
        if self.isDevel:
            serverprint(msg)

    def required(self, f):  # decorator
        unauth = PM[N.unauth]
        unauthId = self.DB.idFromGroup[unauth]

        def g(*args, **kwargs):
            self.authenticate()
            if self.userInfo.get(N.group, unauthId) == unauthId:
                return {
                    N.data: [],
                    N.msgs: [{
                        N.kind: N.warning,
                        N.text: 'You need to be logged in to get this data'
                    }],
                    N.good:
                        True
                }
            return f(*args, **kwargs)

        return g

    def authenticate(self, login=False):
        unauth = PM[N.unauth]
        unauthId = self.DB.idFromGroup[unauth]
        auth = PM[N.auth]
        authId = self.DB.idFromGroup[auth]
        self.userInfo = None
        eppn = self._get_session()
        if eppn is not None:
            userInfo = self.getUser(eppn)
            if userInfo is not None:
                self.userInfo = userInfo
        if self.userInfo is None:
            self._checkLogin(force=login)
            if self.userInfo is not None:
                self.userInfo = self.storeUpdate(self.userInfo)
                if self.userInfo is not None:
                    if self.userInfo.get(N.mayLogin, False):
                        self._create_session()
                    else:
                        self.userInfo = None
        if self.userInfo is None:
            self._delete_session

        if self.userInfo is None:
            self.userInfo = {N.group: unauthId, N.groupRep: unauth}
        else:
            eppn = self.userInfo.get(N.eppn, None)
            if eppn is None:
                self.userInfo[N.group] = unauthId
                self.userInfo[N.groupRep] = unauth
            else:
                if (
                    self.userInfo.get(N.group, None) is None or
                    self.userInfo.get(N.authority, None)
                ):
                  if self.userInfo.get(N.group, None) is None:
                    self.userInfo[N.group] = authId
                  if self.userInfo.get(N.authority, None) is None:
                    authority = N.local if self.isDevel else N.DARIAH
                    self.userInfo[N.authority] = authority
                  self.storeUpdate(self.userInfo)
                self.userInfo[N.groupRep
                              ] = self.DB.groupFromId[self.userInfo[N.group]]

    def deauthenticate(self):
        unauth = PM[N.unauth]
        unauthId = self.DB.idFromGroup[unauth]
        self.userInfo = {N.group: unauthId, N.groupRep: unauth}
        self._delete_session()

    def _create_session(self):
        session = bottle.request.environ.get(self._session_key)
        session[N.eppn] = self.userInfo[N.eppn]
        # session.save()

    def _delete_session(self):
        env = bottle.request.environ
        session = env.get(self._session_key, None)
        if session:
            session.delete()
            # session.invalidate()

    def _get_session(self):
        session = bottle.request.environ.get(self._session_key)
        return session.get(N.eppn, None)

    def _checkLogin(self, force=False):
        env = bottle.request.environ
        if force and self.isDevel:
            testUsers = self.getTestUsers()

            MAX_ITER = 3
            i = 0
            stop = False
            while not stop and i < MAX_ITER:
                try:
                    eppn = input(
                        '{}|email address: '.format('|'.join(testUsers))
                    )
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
                    self.userInfo = None
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
                self.userInfo = {
                    N.eppn: utf8FromLatin1(env[N.eppn]),
                    N.email: utf8FromLatin1(env[N.mail]),
                    N.authority: N.DARIAH,
                }
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
                    attributes[N.membership] = utf8FromLatin1(
                        env[N.isMemberOf]
                    )
                if N.affiliation in env:
                    attributes[N.rel] = utf8FromLatin1(env[N.affiliation])
                self.userInfo.update(attributes)
            else:
                self.userInfo = None
