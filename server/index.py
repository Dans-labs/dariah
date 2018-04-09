from time import sleep
import bottle
from bottle import post, get, route, template

from controllers.db import DbAccess
from controllers.file import FileApi
from controllers.controller import Controller
from controllers.auth import AuthApi
from controllers.perm import PermApi

File = FileApi()
DB = DbAccess()
Auth = AuthApi(DB, '/opt/web-apps/dariah_jwt.secret')
Controller = Controller(DB)
app = Auth.app


@route('/static/<filepath:path>')
def serveStatic(filepath):
    return File.static(filepath)


@route('/favicons/<filepath:path>')
def serveFavicons(filepath):
    return File.static('favicons/{}'.format(filepath))


@route('/api/json/<doc:re:[/A-Za-z0-9_.-]+>')
def serveApiJson(doc):
    return File.json(doc)


@route('/api/file/<doc:re:[/A-Za-z0-9_.-]+>')
def serveApiFile(doc):
    return File.static(doc)


@route('/api/db/who/ami')
def serveApiDbWho():
    print('START /who/ami')
    Auth.authenticate()
    print('AFTER AUTH /who/ami')
    return Auth.deliver()


@post('/api/db/<verb:re:[a-z0-9_]+>')
@get('/api/db/<verb:re:[a-z0-9_]+>')
def serveApiDb(verb):
    print('START', verb)
    Auth.authenticate()
    print('AFTER AUTH', verb)
    Perm = PermApi(Auth)
    return Controller.data(verb, Perm)


@route('/slogout')
def serveSlogout():
    print('START /slogout')
    Auth.deauthenticate()
    print('END /slogout')
    bottle.redirect('/Shibboleth.sso/Logout')


@route('/login')
def serveLogin():
    print('START /login')
    Auth.authenticate(login=True)
    print('AFTER AUTH /login')
    return template('index')


@route('/logout')
def serveLogout():
    print('START /logout')
    Auth.deauthenticate()
    print('AFTER DEAUTH /logout')
    return template('index')


@route('/<anything:re:.*>')
def client(anything):
    Auth.authenticate()
    return template('index')
