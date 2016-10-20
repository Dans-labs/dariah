from bottle import route, static_file, abort

from data import DataApi
from login import *

config = dict(
    static_root='../static',
    client_root='../client',
)

Data = DataApi()

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

@route('/<anything:re:.*>')
def app(anything):
    return static_file('index.html', root=config['client_root'])
