import os
import bottle
from beaker.middleware import SessionMiddleware
from controllers.user import UserApi
from controllers.utils import utf8FromLatin1, serverprint

EPPN_FIELD = None

class AuthApi(UserApi):
    def __init__(self, DB, DM, PM, secret_file):
        super().__init__(DB, DM, PM)

        # determine production or devel
        self.isDevel = os.environ.get('REGIME', None) == 'devel'

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
        userFields = DM.generic['userFields']
        global EPPN_FIELD
        EPPN_FIELD = userFields[0]

    def required(self, f): # decorator
        unauth = self.PM.unauth
        unauthId = self.idFromGroup[unauth]
        def g(*args, **kwargs):
            self.authenticate()
            if self.userInfo.get('group', unauthId) == unauthId:
                return dict(data=[], msgs=[dict(kind='warning', text='You need to be logged in to get this data')], good=True)
            return f(*args, **kwargs)
        return g

    def authenticate(self, login=False):
        unauth = self.PM.unauth
        unauthId = self.idFromGroup[unauth]
        auth = self.PM.auth
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
                    if self.userInfo.get('mayLogin', False):
                        self._create_session()
                    else:
                        self.userInfo = None
        if self.userInfo == None:
            self._delete_session

        if self.userInfo == None:
            self.userInfo = dict(group=unauthId, groupRep=unauth)
        else:
            eppn = self.userInfo.get(EPPN_FIELD, None)
            if eppn == None:
                self.userInfo['group'] = unauthId
                self.userInfo['groupRep'] = unauth
            else:
                if 'group' not in self.userInfo:
                    self.userInfo['group'] = authId
                self.userInfo['groupRep'] = self.groupFromId[self.userInfo['group']]

    def deauthenticate(self):
        unauth = self.PM.unauth
        unauthId = self.idFromGroup[unauth]
        self.userInfo = dict(group=unauthId, groupRep=unauth);
        self._delete_session()

    def _create_session(self):
        env = bottle.request.environ
        session = bottle.request.environ.get(self._session_key)
        session[EPPN_FIELD] = self.userInfo[EPPN_FIELD]
        session.save()

    def _delete_session(self):
        env = bottle.request.environ
        session = env.get(self._session_key, None)
        if session: session.delete()

    def _get_session(self):
        env = bottle.request.environ
        session = bottle.request.environ.get(self._session_key)
        return session.get(EPPN_FIELD, None)

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
                    self.userInfo = dict(
                        eppn='{}@local.host'.format(name),
                        email=eppn,
                        authority='local'
                    )
        else:
            sKey = 'Shib-Session-ID'
            authenticated =  sKey in env and env[sKey] 
            if authenticated:
                self.userInfo = dict(
                    eppn=utf8FromLatin1(env[EPPN_FIELD]),
                    email=utf8FromLatin1(env['mail']),
                    authority='DARIAH',
                )
                attributes = {}
                if 'o' in env: attributes['org'] = utf8FromLatin1(env['o'])
                if 'sn' in env: attributes['name'] = utf8FromLatin1(env['cn'])
                if 'givenName' in env: attributes['firstName'] = utf8FromLatin1(env['givenName'])
                if 'sn' in env: attributes['lastName'] = utf8FromLatin1(env['sn'])
                if 'isMemberOf' in env: attributes['membership'] = utf8FromLatin1(env['isMemberOf'])
                if 'affiliation' in env: attributes['rel'] = utf8FromLatin1(env['affiliation'])
                self.userInfo.update(attributes)
            else:
                self.userInfo = None


