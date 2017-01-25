import bottle
from bottle import route, response, view, template

from file import FileApi
from data import DataApi
from auth import AuthApi
from perm import PermApi
from contrib import ContribModel
from permissions import PermissionModel

CM = ContribModel()
PM = PermissionModel(CM)
File = FileApi()
Data = DataApi(CM)
Auth = AuthApi(PM, '/opt/web-apps/dariah_jwt.secret')
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
    Auth.authenticate()
    return Auth.deliver()

@route('/api/db/<query:re:[a-z0-9_]+>')
def serveApiDb(query):
    Auth.authenticate()
    perm = PermApi(Auth, PM)
    return Data.data(query, perm)

@route('/slogout')
def serveSlogout():
    Auth.deauthenticate()
    bottle.redirect('/Shibboleth.sso/Logout')

@route('/login')
def serveLogin():
    Auth.authenticate(login=True)
    return template('index')

@route('/logout')
def serveLogout():
    Auth.deauthenticate()
    return template('index')

@route('/<anything:re:.*>')
def client(anything):
    Auth.authenticate()
    return template('index')

