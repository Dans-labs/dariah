import os
import bottle
from beaker.middleware import SessionMiddleware
from user import UserApi

class AuthApi(UserApi):
    def __init__(self, secret_file):
        UserApi.__init__(self)

        # determine production or devel
        self.is_devel = os.environ.get('REGIME', None) == 'devel'

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
            'session.secure': not self.is_devel,
        }
        self._session_key = 'dariah.session'
        self.app = SessionMiddleware(self.app, session_opts, environ_key=self._session_key)

    def authenticate(self, login=False):
        env = bottle.request.environ
        self.userInfo = None
        eppn = self._get_session()
        if eppn != None:
            userInfo = self.get_user(eppn)
            if userInfo != None:
                self.userInfo = userInfo
        if self.userInfo == None:
            self._check_login(force=login)
            if self.userInfo != None:
                self.userInfo = self.store_update(self.userInfo)
                if self.userInfo != None:
                    if self.userInfo.get('mayLogin', False):
                        self._create_session()
                    else:
                        self._delete_session()
        if self.userInfo == None:
            self._delete_session

    def deauthenticate(self):
        self.userInfo = None;
        self._delete_session()

    def _create_session(self):
        env = bottle.request.environ
        session = bottle.request.environ.get(self._session_key)
        session['eppn'] = self.userInfo['eppn']
        session.save()

    def _delete_session(self):
        env = bottle.request.environ
        session = env.get(self._session_key, None)
        if session: session.delete()

    def _get_session(self):
        env = bottle.request.environ
        session = bottle.request.environ.get(self._session_key)
        return session.get('eppn', None)

    def _check_login(self, force=False):
        env = bottle.request.environ
        if force and self.is_devel:
            self.userInfo = self.testUser
        else:
            sKey = 'Shib-Session-ID'
            authenticated =  sKey in env and env[sKey] 
            if authenticated:
                self.userInfo = dict(
                    eppn=env['eppn'],
                    email=env['mail'],
                    authority='DARIAH',
                )
            else:
                self.userInfo = None


