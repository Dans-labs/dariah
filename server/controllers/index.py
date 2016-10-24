import json
from bson import json_util
import bottle
from bottle import route, static_file, abort, response, view, template
from beaker.middleware import SessionMiddleware

from data import DataApi
from auth import authenticate, deauthenticate

config = dict(
    static_root='../../static',
)

Data = DataApi()

app = bottle.default_app()

session_opts = {
    'session.cookie_expires': True,
    'session.encrypt_key': 'xy45hgd947shfp739fgqoxkgla7c5',
    'session.httponly': True,
    'session.timeout': 3600 * 24,  # 1 day
    'session.type': 'cookie',
    'session.validate_key': True,
}
app = SessionMiddleware(app, session_opts)

def dumpViewState(userInfo):
    return dict(viewState=json.dumps(userInfo, default=json_util.default))

@route('/hello')
def hello():
    return 'Dag mars'

@route('/static/<filepath:path>')
def serve_static(filepath):
    return static_file(filepath, root=config['static_root'])

@route('/favicons/<filepath:path>')
def serve_fav(filepath):
    return static_file(filepath, root='{}/favicons'.format(config['static_root']))

@route('/data/<query:re:[a-z0-9_]+>')
def serve_json(query):
    return Data.data(query) or abort(404, '{} not provided'.format(query))

@route('/logout')
@view('index')
def logout():
    noUserInfo = deauthenticate()
    return dumpViewState(noUserInfo)

@route('/login')
@view('index')
def login():
    userInfo = authenticate(login=True)
    return dumpViewState(userInfo)

@route('/<anything:re:.*>')
def index(anything):
    userInfo = authenticate()
    return template('index', **dumpViewState(userInfo))

