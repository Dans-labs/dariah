import bottle
from bottle import post, get, route, template

from controllers.db import DbAccess
from controllers.info import getInfo, selectContrib
from controllers.file import FileApi
from controllers.controller import Controller
from controllers.auth import AuthApi
from controllers.perm import PermApi

File = FileApi()
DB = DbAccess()
Auth = AuthApi(DB, '/opt/web-apps/dariah_jwt.secret')
Controller = Controller(DB)
app = Auth.app

infoPages = set('''
    ourcountry
'''.strip().split())


@route('/static/<filepath:path>')
def serveStatic(filepath):
  return File.static(filepath)


@route('/favicons/<filepath:path>')
def serveFavicons(filepath):
    return File.static('favicons/{}'.format(filepath))


@route('/index.html')
def serveIndex():
  return template('index', css=Auth.CSS, js=Auth.JS)


@route('/info/<verb:re:[a-z0-9_]+>')
def serveInfo(verb):
  Auth.authenticate()
  if verb in infoPages:
    data = getInfo(verb, Auth.userInfo)
    return(template('info', userInfo=Auth.userInfo, **data))
  return template('index', css=Auth.CSS, js=Auth.JS)


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


@post('/api/db/selectc')
@get('/api/db/selectc')
def selectC():
  Auth.authenticate()
  return selectContrib(Auth.userInfo)


@post('/api/db/<verb:re:[a-z0-9_]+>')
@get('/api/db/<verb:re:[a-z0-9_]+>')
def serveApiDb(verb):
  Auth.authenticate()
  Perm = PermApi(Auth)
  return Controller.data(verb, Perm)


@route('/slogout')
def serveSlogout():
  Auth.deauthenticate()
  bottle.redirect('/Shibboleth.sso/Logout')


@route('/login')
def serveLogin():
  Auth.authenticate(login=True)
  return template('index', css=Auth.CSS, js=Auth.JS)


@route('/logout')
def serveLogout():
  Auth.deauthenticate()
  return template('index', css=Auth.CSS, js=Auth.JS)


@route('/<anything:re:.*>')
def client(anything):
  Auth.authenticate()
  return template('index', css=Auth.CSS, js=Auth.JS)
