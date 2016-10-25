import logging
from datetime import datetime, timedelta
import bottle
from beaker.middleware import SessionMiddleware
from data import UserApi
import jwt

User = UserApi()

class AuthApi(object):
    def __init__(self, secret_file):
        # read secret from the system
        self.secret = ''
        with open(secret_file) as fh:
            self.secret = fh.read()

        # wrap the app to enable session middleware
        app = bottle.default_app()

        session_opts = {
            'session.key': 'dariah.session.id',
            'session.use_cookies': False,
            'session.type': 'cookie',
            'session.cookie_expires': True,
            'session.encrypt_key': self.secret,
            'session.httponly': True,
            'session.timeout': 3600 * 24,  # 1 day
            'session.validate_key': True,
        }
        self._session_key = 'dariah.session'
        self.app = SessionMiddleware(app, session_opts, environ_key=self._session_key)
        self.is_devel = None # too early to check the env variables

    def determine_devel(self):
        # determine whether on development system or production
        hkey = 'REMOTE_ADDR'
        hval = '127.0.0.1'
        if self.is_devel == None:
            env = bottle.request.environ
            self.is_devel = hkey in env and env[hkey] == hval

    def authenticate(self, login=False):
        env = bottle.request.environ
        self._get_user(force=login)
        if self.userInfo['authenticated']:
            self._obtain_session()
            self.userInfo.update(User.store_update(self.userInfo))

    def deauthenticate(self):
        self._delete_session()
        self.userInfo = dict(authenticated=False)

    def _obtain_session(self):
        env = bottle.request.environ
        session = bottle.request.environ.get(self._session_key)
        for (k, v) in sorted(self.userInfo.items()): session[k] = v
        session.save()

    def _delete_session(self):
        env = bottle.request.environ
        session = env.get(self._session_key, None)
        if session: session.delete()

    def _get_user(self, force=False):
        self.determine_devel()
        env = bottle.request.environ
        if force and self.is_devel:
            self.userInfo = dict(
                authenticated=True,
                eppn='admin',
                email='admin@localhost',
            )
        else:
            sKey = 'Shib-Session-ID'
            authenticated =  sKey in env and env[sKey] 
            self.userInfo = dict(
                authenticated=True,
                eppn=env['eppn'],
                email=env['mail'],
            ) if authenticated else dict(
                authenticated=False,
            )
            if not authenticated:
                self._delete_session


