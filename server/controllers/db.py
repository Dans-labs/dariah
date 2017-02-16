import json, datetime
from bottle import install, JSONPlugin
from pymongo import MongoClient
from bson.objectid import ObjectId
from datetime import datetime

def oid(oidstr):
    return ObjectId() if oidstr == None else ObjectId(oidstr) 

def now(): return datetime.utcnow()

def dtm(isostr):
    try:
        date = datetime.strptime(isostr, "%Y-%m-%dT%H:%M:%S.%f")
    except:
        date = datetime.strptime(isostr, "%Y-%m-%dT%H:%M:%S")
    return date

def json_string(obj):
    if isinstance(obj, datetime):
        return obj.isoformat()
    elif isinstance(obj, ObjectId):
        return str(obj)
    raise TypeError('Not sure how to serialize %s' % (obj,))

def connectdb():
    clientm = MongoClient()
    dbm = clientm.dariah
    install(JSONPlugin(json_dumps=lambda body: json.dumps(body, default=json_string)))
    return dbm

