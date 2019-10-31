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
from controllers.utils import pick as G, E
from controllers.db import Db
from controllers.workflow.compute import Workflow
from controllers.auth import Auth
from controllers.control import Control
from controllers.sidebar import Sidebar
from controllers.topbar import Topbar

from controllers.table import Table
from controllers.specific.assessment_table import AssessmentT
from controllers.specific.review_table import ReviewT

CASES = (
    (N.assessment, AssessmentT),
    (N.review, ReviewT),
)


CT = C.tables
CW = C.web


STATIC_ROOT = os.path.abspath(CW.staticRoot)

ALL_TABLES = CT.all
USER_TABLES_LIST = CT.userTables
USER_TABLES = set(USER_TABLES_LIST)
MASTERS = CT.masters
DETAILS = CT.details

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


def tableFactory(table):
    TableClass = Table
    for (tb, Tcl) in CASES:
        if tb == table:
            TableClass = Tcl
            break

    return TableClass


def mkTable(control, tb):
    return tableFactory(tb)(control, tb)


def factory():
    app = Flask(__name__, static_url_path=DUMMY)
    auth = Auth(app, db)

    def getControl():
        return Control(db, wf, auth)

    if DEBUG and auth.isDevel:
        CT.showReferences()
        N.showNames()

    @app.route(f"""/{N.static}/<path:filepath>""")
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
        control = getControl()
        auth.authenticate()
        topbar = Topbar(control).wrap()
        sidebar = Sidebar(control, path).wrap()
        return render_template(INDEX, topbar=topbar, sidebar=sidebar, material=LANDING,)

    # INSERT RECORD IN TABLE

    @app.route(f"""/api/<string:table>/{N.insert}""")
    def serveTableInsert(table):
        path = f"""/api/{table}/{N.insert}"""
        control = getControl()
        if table in ALL_TABLES and table not in MASTERS:
            auth.authenticate()
            eid = Table(control, table).insert()
            newUrlPart = N.mylist if table in USER_TABLES else N.list
            newPath = (
                f"""/{table}/{newUrlPart}/{eid}"""
                if eid
                else f"""/{table}/{newUrlPart}"""
            )
            return redirect(newPath)
        return notFound(path)

    # INSERT RECORD IN DETAIL TABLE

    @app.route(f"""/api/<string:table>/<string:eid>/<string:dtable>/{N.insert}""")
    def serveTableInsertDetail(table, eid, dtable):
        path = f"""/api/{table}/{eid}/{dtable}/{N.insert}"""
        control = getControl()
        if (
            table in USER_TABLES_LIST[0:2]
            and table in DETAILS
            and dtable in DETAILS[table]
        ):
            auth.authenticate()
            contribId = (
                mkTable(control, dtable).insert(masterTable=table, masterId=eid) or E
            )
            newUrlPart = N.mylist
            newPath = f"""/{N.contrib}/{newUrlPart}/{contribId}"""
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
        path = f"""/{table}/{action}"""
        control = getControl()
        if table in ALL_TABLES:
            auth.authenticate()
            topbar = Topbar(control).wrap()
            sidebar = Sidebar(control, path).wrap()
            tableList = Table(control, table).wrap(eid, action=action)
            return render_template(
                INDEX, topbar=topbar, sidebar=sidebar, material=tableList,
            )
        return notFound(path)

    # RECORD DELETE

    @app.route(f"""/api/<string:table>/{N.delete}/<string:eid>""")
    def serveRecordDelete(table, eid):
        path = f"""/api/{table}/{N.delete}/{eid}"""
        control = getControl()
        if table in ALL_TABLES:
            auth.authenticate()
            Table(control, table).record(eid=eid).delete()
            newUrlPart = N.mylist if table in USER_TABLES else N.list
            newPath = f"""/{table}/{newUrlPart}"""
            return redirect(newPath)
        return notFound(path)

    # RECORD DELETE DETAIL

    @app.route(
        f"""/api/<string:table>/<string:masterId>/<string:dtable>/{N.delete}/<string:eid>"""
    )
    def serveRecordDeleteDetail(table, masterId, dtable, eid):
        path = f"""/api/{table}/{masterId}/{dtable}/{N.delete}/{eid}"""
        control = getControl()
        if (
            table in USER_TABLES_LIST[0:2]
            and table in DETAILS
            and dtable in DETAILS[table]
        ):
            auth.authenticate()
            recordObj = Table(control, dtable).record(eid=eid)
            recordObj.delete()
            wfitem = recordObj.wfitem

            (contribId,) = wfitem.attributes(N.contrib, None, N._id,)

            newUrlPart = N.mylist
            newPath = f"""/{N.contrib}/{newUrlPart}/{contribId}"""
            return redirect(newPath)
        return notFound(path)

    # RECORD VIEW

    @app.route(f"""/api/<string:table>/{N.item}/<string:eid>""")
    def serveRecord(table, eid):
        path = f"""/api/{table}/{N.item}/{eid}"""
        control = getControl()
        if table in ALL_TABLES:
            auth.authenticate()
            return (
                Table(control, table)
                .record(eid=eid, withDetails=True, **method(),)
                .wrap()
            )
        return notFound(path)

    @app.route(f"""/api/<string:table>/{N.item}/<string:eid>/{N.title}""")
    def serveRecordTitle(table, eid):
        path = f"""/api/{table}/{N.item}/{eid}/{N.title}"""
        control = getControl()
        if table in ALL_TABLES:
            auth.authenticate()
            return (
                Table(control, table)
                .record(eid=eid, withDetails=False, **method(),)
                .wrap(expanded=-1)
            )
        return notFound(path)

    @app.route(f"""/<string:table>/{N.item}/<string:eid>""")
    def serveRecordPage(table, eid):
        path = f"""/{table}/{N.item}/{eid}"""
        control = getControl()
        if table in ALL_TABLES:
            auth.authenticate()
            topbar = Topbar(control).wrap()
            sidebar = Sidebar(control, path).wrap()
            record = (
                Table(control, table)
                .record(eid=eid, withDetails=True, **method(),)
                .wrap()
            )
            return render_template(
                INDEX, topbar=topbar, sidebar=sidebar, material=record,
            )
        return notFound(path)

    def method():
        method = G(request.args, N.method)
        if method not in BODY_METHODS:
            return {}
        return dict(bodyMethod=method)

    # FIELD VIEWS AND EDITS

    @app.route(
        f"""/api/<string:table>/{N.item}/<string:eid>/{N.edit}/<string:field>""", **GP
    )
    def serveFieldEdit(table, eid, field):
        return serveField(table, eid, field, action=N.edit)

    @app.route(
        f"""/api/<string:table>/{N.item}/<string:eid>/{N.view}/<string:field>""", **GP
    )
    def serveFieldView(table, eid, field):
        return serveField(table, eid, field, action=N.view)

    @app.route(
        f"""/api/<string:table>/{N.item}/<string:eid>/{N.save}/<string:field>""", **GP
    )
    def serveFieldSave(table, eid, field):
        return serveField(table, eid, field, action=N.save)

    def serveField(table, eid, field, action=None):
        control = getControl()
        auth.authenticate()
        if table in ALL_TABLES:
            return (
                Table(control, table).record(eid=eid).field(field).wrap(action=action)
            )
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
        control = getControl()
        auth.authenticate()
        topbar = Topbar(control).wrap()
        sidebar = Sidebar(control, path).wrap()
        return render_template(
            INDEX, topbar=topbar, sidebar=sidebar, material=f"""{NO_PAGE} {path}""",
        )

    def noTable(table):
        return f"""{NO_TABLE} {table}"""

    return app


if __name__ == "__main__":
    app = factory()
