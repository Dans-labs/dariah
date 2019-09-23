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
from controllers.names import Config, Names

STATIC_ROOT = os.path.abspath('../static/')
MONGO = MongoClient().dariah
values = Values(MONGO, Config, Names)
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
    auth.authenticate()
    userLine = values.wrapCurrentUser(auth)
    sidebar = values.wrapNav(auth)
    home = 'home'
    return render_template(
        'index.html',
        userLine=userLine,
        sidebar=sidebar,
        material=home,
    )

  @app.route('/contrib/list')
  def serveContribList():
    auth.authenticate()
    userLine = values.wrapCurrentUser(auth)
    sidebar = values.wrapNav(auth)
    contribList = contrib.list(auth)
    return render_template(
        'index.html',
        userLine=userLine,
        sidebar=sidebar,
        material=contribList,
    )

  @app.route('/contrib/item/<string:oid>')
  def serveContribItem(oid):
    auth.authenticate()
    return contrib.item(auth, ObjectId(oid))

  @app.route('/slogout')
  def serveSlogout():
    auth.deauthenticate()
    return redirect('/Shibboleth.sso/Logout')

  @app.route('/login')
  def serveLogin():
    auth.authenticate(login=True)
    return redirect('/')

  @app.route('/logout')
  def serveLogout():
    auth.deauthenticate()
    return redirect('/')

  @app.route('/<path:anything>')
  def client(anything=None):
    auth.authenticate()
    userLine = values.wrapCurrentUser(auth)
    sidebar = values.wrapNav(auth)
    return render_template(
        'index.html',
        userLine=userLine,
        sidebar=sidebar,
        material="fall-back",
    )

  return app


if __name__ == "__main__":
  app = factory()
