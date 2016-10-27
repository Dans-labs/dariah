import json
from bson import json_util
from bottle import install, JSONPlugin
from pymongo import MongoClient

def connectdb():
    clientm = MongoClient()
    dbm = clientm.dariah
    install(JSONPlugin(json_dumps=lambda body: json.dumps(body, default=json_util.default)))
    return dbm

