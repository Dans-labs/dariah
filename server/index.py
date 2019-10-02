import os

from flask import (
    Flask,
    render_template,
    send_file,
    redirect,
)

from pymongo import MongoClient

from controllers.config import Config as C, Names as N
from controllers.db import Db
from controllers.auth import Auth
from controllers.sidebar import Sidebar
from controllers.user import User
from controllers.table import Table

CT = C.table
CW = C.web


STATIC_ROOT = os.path.abspath(CW.staticRoot)

ALL_TABLES = CT.all
USER_TABLES = set(CT.userTables)

URLS = CW.urls
MESSAGES = CW.messages

INDEX = CW.indexPage
LANDING = CW.landing

START = URLS[N.home][N.url]
DUMMY = URLS[N.dummy][N.url]
SHIB_LOGOUT = URLS[N.shibLogout][N.url]
NO_PAGE = MESSAGES[N.noPage]
NO_TABLE = MESSAGES[N.noTable]


mongo = MongoClient().dariah
db = Db(mongo)

DEBUG = False

# N.showNames()


def factory():
  app = Flask(__name__, static_url_path=DUMMY)
  auth = Auth(app, db)
  if DEBUG and auth.isDevel:
    CT.showReferences()
    N.showNames()

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
      f"""/<string:table>/{N.list}/new/<string:eid>"""
  )
  def serveTableListOpen(table, eid):
    return serveTableList(table, eid)

  @app.route(
      f"""/<string:table>/{N.list}"""
  )
  def serveTableListPlain(table):
    return serveTableList(table, None)

  def serveTableList(table, eid):
    path = f"""/{table}/{N.list}"""

    auth.authenticate()
    userLine = User(db, auth).wrap()
    sidebar = Sidebar(db, auth, path).wrap()
    if table in ALL_TABLES:
      tableList = Table(db, auth, table).list(eid)
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
    if table in ALL_TABLES:
      eid = Table(db, auth, table).insert()
      newUrlPart = N.mylist if table in USER_TABLES else N.list
      newPath = (
          f"""/{table}/{newUrlPart}/new/{eid}"""
          if eid else
          f"""/{table}/{newUrlPart}"""
      )
      return redirect(newPath)
    return notFound(path)

  @app.route(
      f"""/<string:table>/{N.delete}/<string:eid>"""
  )
  def serveTableDeleteItem(table, eid):
    path = f"""{table}/{N.delete}/{eid}"""

    auth.authenticate()
    if table in ALL_TABLES:
      Table(db, auth, table).delete(eid)
      newUrlPart = N.mylist if table in USER_TABLES else N.list
      newPath = (
          f"""/{table}/{newUrlPart}"""
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
    if table in ALL_TABLES:
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
    if table in ALL_TABLES:
      tableList = Table(db, auth, table).ourlist()
      return render_template(
          INDEX,
          userLine=userLine,
          sidebar=sidebar,
          material=tableList,
      )
    return notFound(path)

  @app.route(
      f"""/<string:table>/{N.item}/<string:eid>/{N.edit}/<string:field>""",
      methods=[N.GET, N.POST],
  )
  def serveTableFieldEdit(table, eid, field):
    auth.authenticate()
    if table in ALL_TABLES:
      return Table(db, auth, table).fieldAction(eid, field, N.edit)
    return noTable(table)

  @app.route(
      f"""/<string:table>/{N.item}/<string:eid>/{N.view}/<string:field>""",
      methods=[N.GET, N.POST],
  )
  def serveTableFieldView(table, eid, field):
    auth.authenticate()
    if table in ALL_TABLES:
      return Table(db, auth, table).fieldAction(eid, field, N.view)
    return noTable(table)

  @app.route(
      f"""/<string:table>/{N.item}/<string:eid>"""
  )
  def serveTableItem(table, eid):
    auth.authenticate()
    if table in ALL_TABLES:
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
