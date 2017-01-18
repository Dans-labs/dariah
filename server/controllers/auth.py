import os
import bottle
from beaker.middleware import SessionMiddleware
from user import UserApi

class AuthApi(UserApi):
    def __init__(self, secret_file):
        UserApi.__init__(self)

        # determine production or devel
        self.isDevel = os.environ.get('REGIME', None) == 'devel'
        if self.isDevel: self.getTestUsers()

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

    def required(self, f): # decorator
        def g(*args, **kwargs):
            self.authenticate()
            if self.userInfo.get('group', '') == '':
                return dict(data=[], msgs=[dict(kind='warning', text='You need to be logged in to get this data')], good=True)
            return f(*args, **kwargs)
        return g

    def authenticate(self, login=False):
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
                    if self.userInfo.get('mayLogin', False):
                        self._create_session()
                    else:
                        self.userInfo = None
        if self.userInfo == None:
            self._delete_session

        if self.userInfo == None:
            self.userInfo = dict(group='')
        else:
            eppn = self.userInfo.get('eppn', None)
            if eppn == None:
                self.userInfo['group'] = ''
            else:
                authority = self.userInfo['authority']
                inGroups = self.getInGroups()
                self.userInfo['group'] = inGroups.get((eppn, authority), '')

    def deauthenticate(self):
        self.userInfo = dict(group='');
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

    def _checkLogin(self, force=False):
        env = bottle.request.environ
        if force and self.isDevel:
            eppn = input('{}: '.format('|'.join(self.testUsers)))
            if eppn in self.testUsers:
                self.userInfo = self.testUsers[eppn]
            else:
                self.userInfo = None
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


