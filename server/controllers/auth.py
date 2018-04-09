import os
import bottle
from beaker.middleware import SessionMiddleware
from controllers.user import UserApi
from controllers.utils import utf8FromLatin1, serverprint
from models.compiled.model import model as M
from models.compiled.names import N

PM = M[N.permissions]


class AuthApi(UserApi):
    def __init__(self, DB, secret_file):
        super().__init__(DB)

        # determine production or devel
        self.isDevel = os.environ.get(N.REGIME, None) == N.devel
        print('DEVEL', self.isDevel)

        # read secret from the system
        self.secret = ''
        with open(secret_file) as fh:
            self.secret = fh.read()
        print('SECRET', self.secret)

        # wrap the app to enable session middleware
        self.app = bottle.default_app()

        session_opts = {
            'session.key': 'dariah.session.id',
            'session.use_cookies': False,
            'session.type': 'cookie',
            'session.cookie_expires': True,
            'session.encrypt_key': self.secret,
            'session.httponly': True,
            'session.timeout': 3600 * 24,  # 1 day
            'session.validate_key': True,
            'session.secure': not self.isDevel,
        }
        self._session_key = 'dariah.session'
        self.app = SessionMiddleware(
            self.app, session_opts, environ_key=self._session_key
        )

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
        print('during AUTH', eppn)
        print('SESSION', bottle.request.environ.get(self._session_key))
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
                if N.group not in self.userInfo:
                    self.userInfo[N.group] = authId
                self.userInfo[N.groupRep
                              ] = self.DB.groupFromId[self.userInfo[N.group]]
        print('end AUTH:', self.userInfo and self.userInfo.get(N.eppn, 'no eppn'))

    def deauthenticate(self):
        unauth = PM[N.unauth]
        unauthId = self.DB.idFromGroup[unauth]
        self.userInfo = {N.group: unauthId, N.groupRep: unauth}
        print('start DELETE SESSION')
        self._delete_session()
        print('end DELETE SESSION')
        print('end DEAUTH:', self.userInfo and self.userInfo.get(N.eppn, 'no eppn'))

    def _create_session(self):
        session = bottle.request.environ.get(self._session_key)
        print('begin SESSION SAVE', session)
        session[N.eppn] = self.userInfo[N.eppn]
        session.save()
        print('end SESSION SAVE', session)

    def _delete_session(self):
        env = bottle.request.environ
        session = env.get(self._session_key, None)
        if session:
            session[N.eppn] = None
            #session.invalidate()
            session.delete()
            print('SESSION DELETED')
            print('after delete SESSION', env.get(self._session_key))
        else:
            print('NO SESSION TO DELETE')

    def _get_session(self):
        print('get SESSION')
        session = bottle.request.environ.get(self._session_key)
        print('SESSION', session)
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
