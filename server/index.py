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
    auth.authenticate()
    userLine = values.wrapUser(auth.userInfo)
    dashboard = 'top level'
    return render_template(
        'index.html',
        userLine=userLine,
        material=dashboard,
    )

  @app.route('/contrib/list')
  def serveContribList():
    auth.authenticate()
    userLine = values.wrapUser(auth.userInfo)
    contribList = contrib.list(auth.userInfo)
    return render_template(
        'index.html',
        userLine=userLine,
        material=contribList,
    )

  @app.route('/contrib/item/<string:oid>')
  def serveContribItem(oid):
    auth.authenticate()
    return contrib.item(auth.userInfo, ObjectId(oid))

  @app.route('/slogout')
  def serveSlogout():
    auth.deauthenticate()
    return redirect('/Shibboleth.sso/Logout')

  @app.route('/login')
  def serveLogin():
    auth.authenticate(login=True)
    return redirect('/')
    userLine = values.wrapUser(auth.userInfo)
    return render_template(
        'index.html',
        userLine=userLine,
        material="hello world",
    )

  @app.route('/logout')
  def serveLogout():
    auth.deauthenticate()
    userLine = values.wrapUser(auth.userInfo)
    return render_template(
        'index.html',
        userLine=userLine,
        material="hello world",
    )

  @app.route('/<path:anything>')
  def client(anything=None):
    auth.authenticate()
    userLine = values.wrapUser(auth.userInfo)
    return render_template(
        'index.html',
        userLine=userLine,
        material="fall-back",
    )

  return app


if __name__ == "__main__":
  app = factory()
