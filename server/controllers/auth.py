import os
import bottle
from beaker.middleware import SessionMiddleware
from controllers.user import UserApi
from controllers.utils import utf8FromLatin1, serverprint
from models.permission import PermissionModel as PM
from models.names import *

class AuthApi(UserApi):
    def __init__(self, DB, secret_file):
        super().__init__(DB)

        # determine production or devel
        self.isDevel = os.environ.get(N_REGIME, None) == N_devel

        if self.isDevel: self.testUsers = self.getTestUsers()

        # read secret from the system
        self.secret = ''
        with open(secret_file) as fh:
            self.secret = fh.read()

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
        self.app = SessionMiddleware(self.app, session_opts, environ_key=self._session_key)
        DB.getGroups(self)

    def required(self, f): # decorator
        unauth = PM[N_unauth]
        unauthId = self.idFromGroup[unauth]
        def g(*args, **kwargs):
            self.authenticate()
            if self.userInfo.get(N_group, unauthId) == unauthId:
                return {N_data: [], N_msgs: [{N_kind: N_warning, N_text: 'You need to be logged in to get this data'}], N_good: True}
            return f(*args, **kwargs)
        return g

    def authenticate(self, login=False):
        unauth = PM[N_unauth]
        unauthId = self.idFromGroup[unauth]
        auth = PM[N_auth]
        authId = self.idFromGroup[auth]
        env = bottle.request.environ
        self.userInfo = None
        eppn = self._get_session()
        if eppn != None:
            userInfo = self.getUser(eppn)
            if userInfo != None:
                self.userInfo = userInfo
        if self.userInfo == None:
            self._checkLogin(force=login)
            if self.userInfo != None:
                self.userInfo = self.storeUpdate(self.userInfo)
                if self.userInfo != None:
                    if self.userInfo.get(N_mayLogin, False):
                        self._create_session()
                    else:
                        self.userInfo = None
        if self.userInfo == None:
            self._delete_session

        if self.userInfo == None:
            self.userInfo = {N_group: unauthId, N_groupRep: unauth}
        else:
            eppn = self.userInfo.get(N_eppn, None)
            if eppn == None:
                self.userInfo[N_group] = unauthId
                self.userInfo[N_groupRep] = unauth
            else:
                if N_group not in self.userInfo:
                    self.userInfo[N_group] = authId
                self.userInfo[N_groupRep] = self.groupFromId[self.userInfo[N_group]]

    def deauthenticate(self):
        unauth = PM[N_unauth]
        unauthId = self.idFromGroup[unauth]
        self.userInfo = {N_group: unauthId, N_groupRep: unauth};
        self._delete_session()

    def _create_session(self):
        env = bottle.request.environ
        session = bottle.request.environ.get(self._session_key)
        session[N_eppn] = self.userInfo[N_eppn]
        session.save()

    def _delete_session(self):
        env = bottle.request.environ
        session = env.get(self._session_key, None)
        if session: session.delete()

    def _get_session(self):
        env = bottle.request.environ
        session = bottle.request.environ.get(self._session_key)
        return session.get(N_eppn, None)

    def _checkLogin(self, force=False):
        env = bottle.request.environ
        if force and self.isDevel:
            MAX_ITER = 3
            i = 0
            stop = False
            while not stop and i < MAX_ITER:
                try:
                    eppn = input('{}|email address: '.format('|'.join(self.testUsers)))
                    stop = True
                except Exception as err:
                    serverprint('Low level error: {}'.format(err))
                    if eppn:
                        stop = True
                    else:
                        serverprint('Try again')

            if eppn in self.testUsers:
                self.userInfo = self.testUsers[eppn]
            else:
                parts = eppn.split('@', 1)
                if len(parts) == 1:
                    self.userInfo = None
                else:
                    (name, domain) = parts
                    self.userInfo = {
                        N_eppn: '{}@local.host'.format(name),
                        N_email: eppn,
                        N_authority: N_local,
                    }
        else:
            sKey = 'Shib-Session-ID'
            authenticated =  sKey in env and env[sKey] 
            if authenticated:
                self.userInfo = {
                    N_eppn: utf8FromLatin1(env[N_eppn]),
                    N_email: utf8FromLatin1(env[N_mail]),
                    N_authority: N_DARIAH,
                }
                attributes = {}
                if N_o in env: attributes[N_org] = utf8FromLatin1(env[N_o])
                if N_cn in env: attributes[N_name] = utf8FromLatin1(env[N_cn])
                if N_givenName in env: attributes[N_firstName] = utf8FromLatin1(env[N_givenName])
                if N_sn in env: attributes[N_lastName] = utf8FromLatin1(env[N_sn])
                if N_isMemberOf in env: attributes[N_membership] = utf8FromLatin1(env[N_isMemberOf])
                if N_affiliation in env: attributes[N_rel] = utf8FromLatin1(env[N_affiliation])
                self.userInfo.update(attributes)
            else:
                self.userInfo = None


