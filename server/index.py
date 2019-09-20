import os

from flask import (
    Flask,
    render_template,
    send_file,
    redirect,
)

from pymongo import MongoClient
from bson.objectid import ObjectId

from controllers.values import Values
from controllers.auth import Auth
from controllers.contrib import Contrib

STATIC_ROOT = os.path.abspath('../static/')
MONGO = MongoClient().dariah
values = Values(MONGO)
values.collect()


def factory():
  app = Flask(__name__, static_url_path='/xxx')
  auth = Auth(app, MONGO, values)
  contrib = Contrib(MONGO, values)

  @app.route('/static/<path:filepath>')
  def serveStatic(filepath):
    return send_file(f'{STATIC_ROOT}/{filepath}')

  @app.route('/favicons/<path:filepath>')
  def serveFavicons(filepath):
    return send_file(f'{STATIC_ROOT}/favicons/{filepath}')

  @app.route('/')
  @app.route('/index')
  @app.route('/index.html')
  def serveIndex():
    return render_template('index.html', material="hello world")

  @app.route('/contrib/list')
  def serveContribList():
    contribList = contrib.list()
    (user, access) = auth.presentUser()
    return render_template('index.html', user=user, access=access, material=contribList)

  @app.route('/contrib/item/<string:oid>')
  def serveContribItem(oid):
    return contrib.item(ObjectId(oid))

  @app.route('/slogout')
  def serveSlogout():
    auth.deauthenticate()
    return redirect('/Shibboleth.sso/Logout')

  @app.route('/login')
  def serveLogin():
    auth.authenticate(login=True)
    return render_template('index.html')

  @app.route('/logout')
  def serveLogout():
    auth.deauthenticate()
    return render_template('index.html')

  @app.route('/<path:anything>')
  def client(anything=None):
    return render_template('index.html', material="fall-back")

  return app


if __name__ == "__main__":
  app = factory()
