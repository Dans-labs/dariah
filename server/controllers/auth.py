import logging
from datetime import datetime, timedelta
import bottle
from data import UserApi

User = UserApi()

def authenticate(login=False):
    userInfo = _get_user(force=login)
    if userInfo['authenticated']:
        _obtain_session(userInfo)
        userInfo = User.store_update(userInfo)
    return userInfo

def deauthenticate():
    _delete_session()
    return dict(authenticated=False)

def _obtain_session(userInfo):
    env = bottle.request.environ
    session = bottle.request.environ.get('beaker.session')
    for (k, v) in sorted(userInfo.items()): session[k] = v
    session.save()

def _delete_session():
    env = bottle.request.environ
    session = env.get('beaker.session', None)
    if session: session.delete()

def _get_user(force=False):
    env = bottle.request.environ
    if force and _is_devel():
        return dict(
            authenticated=True,
            eppn='admin',
            email='admin@localhost',
        )
    else:
        sKey = 'Shib-Session-ID'
        authenticated =  sKey in env and env[sKey] 
        return dict(
            authenticated=True,
            eppn=env['eppn'],
            email=env['mail'],
        ) if authenticated else dict(
            authenticated=False,
        )

def _is_devel():
    hkey = 'REMOTE_ADDR'
    hval = '127.0.0.1'
    env = bottle.request.environ
    return hkey not in env or env[hkey] == '127.0.0.1'

