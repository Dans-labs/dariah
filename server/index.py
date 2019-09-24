import os

from flask import (
    Flask,
    render_template,
    send_file,
    redirect,
)

from pymongo import MongoClient

from controllers.db import Db
from controllers.auth import Auth
from controllers.names import Config, Names
from controllers.wrap.sidebar import Sidebar
from controllers.wrap.user import User
from controllers.wrap.contrib import Contrib

STATIC_ROOT = os.path.abspath('../static/')
mongo = MongoClient().dariah
db = Db(mongo, Config, Names)
db.collect()


def factory():
  app = Flask(__name__, static_url_path='/xxx')
  auth = Auth(app, mongo, db)

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
    userLine = User(db, auth).wrap()
    sidebar = Sidebar(db, auth, '/').wrap()
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
    userLine = User(db, auth).wrap()
    sidebar = Sidebar(db, auth, '/contrib/list').wrap()
    contribList = Contrib(db, auth, mongo).list()
    return render_template(
        'index.html',
        userLine=userLine,
        sidebar=sidebar,
        material=contribList,
    )

  @app.route('/contrib/mylist')
  def serveContribMyList():
    auth.authenticate()
    userLine = User(db, auth).wrap()
    sidebar = Sidebar(db, auth, '/contrib/mylist').wrap()
    contribList = Contrib(db, auth, mongo).mylist()
    return render_template(
        'index.html',
        userLine=userLine,
        sidebar=sidebar,
        material=contribList,
    )

  @app.route('/contrib/ourlist')
  def serveContribOurList():
    auth.authenticate()
    userLine = User(db, auth).wrap()
    sidebar = Sidebar(db, auth, '/contrib/ourlist').wrap()
    contribList = Contrib(db, auth, mongo).ourlist()
    return render_template(
        'index.html',
        userLine=userLine,
        sidebar=sidebar,
        material=contribList,
    )

  @app.route('/contrib/item/<string:eid>/save/<string:field>', methods=['GET', 'POST'])
  def serveContribFieldSave(eid, field):
    auth.authenticate()
    table = 'contrib'
    return Contrib(db, auth, mongo).fieldAction(table, eid, field, 'save')

  @app.route('/contrib/item/<string:eid>/edit/<string:field>')
  def serveContribFieldEdit(eid, field):
    auth.authenticate()
    table = 'contrib'
    return Contrib(db, auth, mongo).fieldAction(table, eid, field, 'edit')

  @app.route('/contrib/item/<string:eid>')
  def serveContribItem(eid):
    auth.authenticate()
    return Contrib(db, auth, mongo).item(eid)

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
    userLine = User(db, auth).wrap()
    sidebar = Sidebar(db, auth, anything).wrap()
    return render_template(
        'index.html',
        userLine=userLine,
        sidebar=sidebar,
        material="fall-back",
    )

  return app


if __name__ == "__main__":
  app = factory()
