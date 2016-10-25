import json
from bson import json_util
import bottle
from bottle import route, static_file, abort, response, view, template

from data import DataApi
from auth import AuthApi

config = dict(
    static_root='../../static',
)

Auth = AuthApi('/opt/web-apps/dariah_jwt.secret')
app = Auth.app

Data = DataApi()


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
    Auth.deauthenticate()
    return dumpViewState(Auth.userInfo)

@route('/login')
@view('index')
def login():
    Auth.authenticate(login=True)
    return dumpViewState(Auth.userInfo)

@route('/whoami')
def whoami():
    Auth.authenticate()
    print('whoami = {}'.format(Auth.userInfo))

@route('/<anything:re:.*>')
def index(anything):
    Auth.authenticate()
    return template('index', **dumpViewState(Auth.userInfo))

