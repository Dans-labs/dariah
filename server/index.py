import os

from flask import (
    Flask,
    request,
    render_template,
    send_file,
    redirect,
)

from pymongo import MongoClient

from controllers.config import Config as C, Names as N
from controllers.db import Db
from controllers.workflow import Workflow
from controllers.auth import Auth
from controllers.sidebar import Sidebar
from controllers.topbar import Topbar
from controllers.table import Table
from controllers.types import Types

CT = C.tables
CW = C.web


STATIC_ROOT = os.path.abspath(CW.staticRoot)

ALL_TABLES = CT.all
USER_TABLES = set(CT.userTables)

URLS = CW.urls
MESSAGES = CW.messages

INDEX = CW.indexPage
LANDING = CW.landing
BODY_METHODS = set(CW.bodyMethods)

START = URLS[N.home][N.url]
DUMMY = URLS[N.dummy][N.url]
SHIB_LOGOUT = URLS[N.shibLogout][N.url]
NO_PAGE = MESSAGES[N.noPage]
NO_TABLE = MESSAGES[N.noTable]


mongo = MongoClient().dariah
db = Db(mongo)
wf = Workflow(db)

DEBUG = False

GP = dict(methods=[N.GET, N.POST])

# N.showNames()


def factory():
  app = Flask(__name__, static_url_path=DUMMY)
  auth = Auth(app, db)
  control = dict(db=db, wf=wf, auth=auth, types=Types(db, auth))

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
    topbar = Topbar(control).wrap()
    sidebar = Sidebar(control, path).wrap()
    return render_template(
        INDEX,
        topbar=topbar,
        sidebar=sidebar,
        material=LANDING,
    )

  # INSERT RECORD IN TABLE

  @app.route(f"""/api/<string:table>/{N.insert}""")
  def serveTableInsert(table):
    if table in ALL_TABLES:
      path = f"""/api/{table}/{N.insert}"""
      auth.authenticate()
      eid = Table(control, table).insert()
      newUrlPart = N.mylist if table in USER_TABLES else N.list
      newPath = (
          f"""/{table}/{newUrlPart}/{eid}"""
          if eid else
          f"""/{table}/{newUrlPart}"""
      )
      return redirect(newPath)
    return notFound(path)

  # LIST VIEWS ON TABLE

  @app.route(f"""/<string:table>/{N.list}/<string:eid>""")
  def serveTableListOpen(table, eid):
    return serveTable(table, eid, action=N.list)

  @app.route(f"""/<string:table>/{N.list}""")
  def serveTableList(table):
    return serveTable(table, None, action=N.list)

  @app.route(f"""/<string:table>/{N.mylist}/<string:eid>""")
  def serveTableMyListOpen(table, eid):
    return serveTable(table, eid, action=N.mylist)

  @app.route(f"""/<string:table>/{N.mylist}""")
  def serveTableMyList(table):
    return serveTable(table, None, action=N.mylist)

  @app.route(f"""/<string:table>/{N.ourlist}/<string:eid>""")
  def serveTableOurListOpen(table, eid):
    return serveTable(table, eid, action=N.ourlist)

  @app.route(f"""/<string:table>/{N.ourlist}""")
  def serveTableOurList(table):
    return serveTable(table, None, action=N.ourlist)

  def serveTable(table, eid, action=None):
    if table in ALL_TABLES:
      path = f"""/{table}/{action}"""
      auth.authenticate()
      topbar = Topbar(control).wrap()
      sidebar = Sidebar(control, path).wrap()
      tableList = Table(control, table).wrap(eid, action=action)
      return render_template(
          INDEX,
          topbar=topbar,
          sidebar=sidebar,
          material=tableList,
      )
    return notFound(path)

  # RECORD VIEW / DELETE

  @app.route(f"""/api/<string:table>/{N.delete}/<string:eid>""")
  def serveRecordDelete(table, eid):
    if table in ALL_TABLES:
      path = f"""/api/{table}/{N.delete}/{eid}"""
      auth.authenticate()
      Table(control, table).record(eid=eid).delete()
      newUrlPart = N.mylist if table in USER_TABLES else N.list
      newPath = (
          f"""/{table}/{newUrlPart}"""
      )
      return redirect(newPath)
    return notFound(path)

  @app.route(f"""/api/<string:table>/{N.item}/<string:eid>""")
  def serveRecord(table, eid):
    if table in ALL_TABLES:
      auth.authenticate()
      return Table(control, table).record(
          eid=eid, withDetails=True, **method(),
      ).wrap()
    return noTable(table)

  @app.route(f"""/api/<string:table>/{N.item}/<string:eid>/{N.title}""")
  def serveRecordTitle(table, eid):
    if table in ALL_TABLES:
      auth.authenticate()
      return Table(control, table).record(
          eid=eid, withDetails=False, **method(),
      ).wrap(expanded=-1)
    return noTable(table)

  @app.route(f"""/<string:table>/{N.item}/<string:eid>""")
  def serveRecordPage(table, eid):
    if table in ALL_TABLES:
      path = f"""/{table}/{N.item}/{eid}"""
      auth.authenticate()
      topbar = Topbar(control).wrap()
      sidebar = Sidebar(control, path).wrap()
      record = Table(control, table).record(
          eid=eid, withDetails=True, **method(),
      ).wrap()
      return render_template(
          INDEX,
          topbar=topbar,
          sidebar=sidebar,
          material=record,
      )
    return noTable(table)

  def method():
      method = request.args.get(N.method, None)
      if method not in BODY_METHODS:
        return {}
      return dict(bodyMethod=method)

  # FIELD VIEWS AND EDITS

  @app.route(f"""/api/<string:table>/{N.item}/<string:eid>/{N.edit}/<string:field>""", **GP)
  def serveFieldEdit(table, eid, field):
    return serveField(table, eid, field, action=N.edit)

  @app.route(f"""/api/<string:table>/{N.item}/<string:eid>/{N.view}/<string:field>""", **GP)
  def serveFieldView(table, eid, field):
    return serveField(table, eid, field, action=N.view)

  def serveField(table, eid, field, action=None):
    auth.authenticate()
    if table in ALL_TABLES:
      return Table(control, table).record(eid=eid).field(field).wrap(action=action)
    return noTable(table)

  # LOGIN / LOGOUT

  @app.route(f"""/{N.slogout}""")
  def serveSlogout():
    auth.deauthenticate()
    return redirect(SHIB_LOGOUT)

  @app.route(f"""/{N.login}""")
  def serveLogin():
    auth.authenticate(login=True)
    return redirect(START)

  @app.route(f"""/{N.logout}""")
  def serveLogout():
    auth.deauthenticate()
    return redirect(START)

  # FALL-BACK

  @app.route(f"""/<path:anything>""")
  def serveNotFound(anything=None):
    return notFound(anything)

  def notFound(path):
    auth.authenticate()
    topbar = Topbar(control).wrap()
    sidebar = Sidebar(control, path).wrap()
    return render_template(
        INDEX,
        topbar=topbar,
        sidebar=sidebar,
        material=f"""{NO_PAGE} {path}""",
    )

  def noTable(table):
    return f"""{NO_TABLE} {table}"""

  return app


if __name__ == '__main__':
  app = factory()
