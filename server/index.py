import os

from flask import (
    Flask,
    render_template,
    send_file,
    redirect,
)

from pymongo import MongoClient

from controllers.config import Config as C, Tables as T, Names as N
from controllers.db import Db
from controllers.auth import Auth
from controllers.sidebar import Sidebar
from controllers.user import User
from controllers.table import Table

STATIC_ROOT = os.path.abspath(C.html[N.staticRoot])

START = C.html[N.urls][N.home][N.url]
INDEX = C.html[N.indexPage]
LANDING = C.html[N.landing]
DUMMY = C.html[N.urls][N.dummy][N.url]
SHIB_LOGOUT = C.html[N.urls][N.shibLogout][N.url]

NO_PAGE = C.html[N.messages][N.noPage]
NO_TABLE = C.html[N.messages][N.noTable]


mongo = MongoClient().dariah
db = Db(mongo)
db.collect()


def factory():
  app = Flask(__name__, static_url_path=DUMMY)
  auth = Auth(app, db)

  @app.route(
      f"""/{N.static}/<path:filepath>"""
  )
  def serveStatic(filepath):
    path = f"""{STATIC_ROOT}/{filepath}"""

    return send_file(path)

  @app.route(f"""/{N.favicons}/<path:filepath>""")
  def serveFavicons(filepath):
    path = f"""{STATIC_ROOT}/{N.favicons})/{filepath}"""

    return send_file(path)

  @app.route(START)
  @app.route(f"""/{N.index}""")
  @app.route(f"""/{INDEX}""")
  def serveIndex():
    path = START

    auth.authenticate()
    userLine = User(db, auth).wrap()
    sidebar = Sidebar(db, auth, path).wrap()
    return render_template(
        INDEX,
        userLine=userLine,
        sidebar=sidebar,
        material=LANDING,
    )

  @app.route(
      f"""/<string:table>/{N.list}"""
  )
  def serveTableList(table):
    path = f"""/{table}/{N.list}"""

    auth.authenticate()
    userLine = User(db, auth).wrap()
    sidebar = Sidebar(db, auth, path).wrap()
    if table in T.all:
      tableList = Table(db, auth, table).list()
      return render_template(
          INDEX,
          userLine=userLine,
          sidebar=sidebar,
          material=tableList,
      )
    return notFound(path)

  @app.route(
      f"""/<string:table>/{N.insert}"""
  )
  def serveTableInsert(table):
    path = f"""/{table}/{N.insert}"""

    auth.authenticate()
    if table in T.all:
      eid = Table(db, auth, table).insert()
      newPath = (
          f"""/{table}/{N.mylist}/new/{eid}"""
          if eid else
          f"""/{table}/{N.mylist}"""
      )
      return redirect(newPath)
    return notFound(path)

  @app.route(
      f"""/<string:table>/{N.delete}/<string:eid>"""
  )
  def serveTableDeleteItem(table, eid):
    path = f"""{table}/{N.delete}/{eid}"""

    auth.authenticate()
    if table in T.all:
      Table(db, auth, table).delete(eid)
      newPath = (
          f"""/{table}/{N.mylist}"""
      )
      return redirect(newPath)
    return notFound(path)

  @app.route(
      f"""/<string:table>/{N.mylist}/new/<string:eid>"""
  )
  def serveTableMyListOpen(table, eid):
    return serveTableMyList(table, eid)

  @app.route(
      f"""/<string:table>/{N.mylist}"""
  )
  def serveTableMyListPlain(table):
    return serveTableMyList(table, None)

  def serveTableMyList(table, eid):
    path = f"""/{table}/{N.mylist}"""
    if eid:
      path += f"""/new/{eid}"""

    auth.authenticate()
    userLine = User(db, auth).wrap()
    sidebar = Sidebar(db, auth, path).wrap()
    if table in T.all:
      tableList = Table(db, auth, table).mylist(eid)
      return render_template(
          INDEX,
          userLine=userLine,
          sidebar=sidebar,
          material=tableList,
      )
    return notFound(path)

  @app.route(
      f"""/<string:table>/{N.ourlist}"""
  )
  def serveTableOurList(table):
    path = f"""/{table}/{N.ourlist}"""

    auth.authenticate()
    userLine = User(db, auth).wrap()
    sidebar = Sidebar(db, auth, path).wrap()
    if table in T.all:
      tableList = Table(db, auth, table).ourlist()
      return render_template(
          INDEX,
          userLine=userLine,
          sidebar=sidebar,
          material=tableList,
      )
    return notFound(path)

  @app.route(
      f"""/<string:table>/{N.item}/<string:eid>/{N.save}/<string:field>""",
      methods=[N.GET, N.POST],
  )
  def serveTableFieldSave(table, eid, field):
    auth.authenticate()
    if table in T.all:
      return Table(db, auth, table).fieldAction(eid, field, N.save)
    return noTable(table)

  @app.route(
      f"""/<string:table>/{N.item}/<string:eid>/{N.edit}/<string:field>"""
  )
  def serveTableFieldEdit(table, eid, field):
    auth.authenticate()
    if table in T.all:
      return Table(db, auth, table).fieldAction(eid, field, N.edit)
    return noTable(table)

  @app.route(
      f"""/<string:table>/{N.item}/<string:eid>/{N.view}/<string:field>"""
  )
  def serveTableFieldView(table, eid, field):
    auth.authenticate()
    if table in T.all:
      return Table(db, auth, table).fieldAction(eid, field, N.view)
    return noTable(table)

  @app.route(
      f"""/<string:table>/{N.item}/<string:eid>"""
  )
  def serveTableItem(table, eid):
    auth.authenticate()
    if table in T.all:
      return Table(db, auth, table).item(eid)
    return noTable(table)

  @app.route(
      f"""/{N.slogout}"""
  )
  def serveSlogout():
    auth.deauthenticate()
    return redirect(SHIB_LOGOUT)

  @app.route(
      f"""/{N.login}"""
  )
  def serveLogin():
    auth.authenticate(login=True)
    return redirect(START)

  @app.route(
      f"""/{N.logout}"""
  )
  def serveLogout():
    auth.deauthenticate()
    return redirect(START)

  @app.route(
      f"""/<path:anything>"""
  )
  def serveNotFound(anything=None):
    return notFound(anything)

  def notFound(path):
    auth.authenticate()
    userLine = User(db, auth).wrap()
    sidebar = Sidebar(db, auth, path).wrap()
    return render_template(
        INDEX,
        userLine=userLine,
        sidebar=sidebar,
        material=f"""{NO_PAGE} {path}""",
    )

  def noTable(table):
    return f"""{NO_TABLE} {table}"""

  return app


if __name__ == '__main__':
  app = factory()
