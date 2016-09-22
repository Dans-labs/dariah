# -*- coding: utf-8 -*-

def list_country():
    documents = dbm.country.find({}).sort(u'name', 1)
    return dict(data=list(documents), msgs=[], good=True)

def list_contrib():
    documents = dbm.contrib.find({}).sort(u'title', 1)
    return dict(data=list(documents), msgs=[], good=True)

def item_contrib():
    ids = request.vars.ids.split(',')
    documents = dbm.contrib.find({'_id': {'$in': ids}})
    return dict(data=list(documents), msgs=[], good=True)

def item_country():
    ids = request.vars.ids.split(',')
    documents = dbm.country.find({'_id': {'$in': ids}})
    return dict(data=list(documents), msgs=[], good=True)

def list_type():
    documents = dbm.contrib.distinct(u'typeContribution', filter={})
    return dict(data=sorted(documents, key=lambda d: d[u'value']), msgs=[], good=True)

def list_tadiraha():
    documents = dbm.contrib.distinct(u'tadirahActivities', filter={})
    return dict(data=sorted(documents, key=lambda d: d[u'value']), msgs=[], good=True)

def list_tadiraho():
    documents = dbm.contrib.distinct(u'tadirahObjects', filter={})
    return dict(data=sorted(documents, key=lambda d: d[u'value']), msgs=[], good=True)

def list_tadiraht():
    documents = dbm.contrib.distinct(u'tadirahTechniques', filter={})
    return dict(data=sorted(documents, key=lambda d: d[u'value']), msgs=[], good=True)

def country_contrib():
    relinfo = []
    relvals = []
    for c in dbm.country.find({}):
        relvals.append(c)
    for d in dbm.contrib.find({}, {u'country._id': True}):
        relinfo.append([d[u'_id'], [r[u'_id'] for r in d.get(u'country', [])]])
    return dict(relinfo=relinfo, relvals=relvals, msgs=[], good=True)

def type_contrib():
    relinfo = []
    relvals = []
    for d in dbm.contrib.distinct(u'typeContribution', filter={}):
        relvals.append(d)
    for d in dbm.contrib.find({}, {u'typeContribution._id': True}):
        relinfo.append([d[u'_id'], [r[u'_id'] for r in d.get(u'typeContribution', [])]])
    return dict(relinfo=relinfo, relvals=relvals, msgs=[], good=True)

def tadiraha_contrib():
    relinfo = []
    relvals = []
    for d in dbm.contrib.distinct(u'tadirahActivities', filter={}):
        relvals.append(d)
    for d in dbm.contrib.find({}, {u'tadirahActivities._id': True}):
        relinfo.append([d[u'_id'], [r[u'_id'] for r in d.get(u'tadirahActivities', [])]])
    return dict(relinfo=relinfo, relvals=relvals, msgs=[], good=True)

def tadiraho_contrib():
    relinfo = []
    relvals = []
    for d in dbm.contrib.distinct(u'tadirahObjects', filter={}):
        relvals.append(d)
    for d in dbm.contrib.find({}, {u'tadirahObjects._id': True}):
        relinfo.append([d[u'_id'], [r[u'_id'] for r in d.get(u'tadirahObjects', [])]])
    return dict(relinfo=relinfo, relvals=relvals, msgs=[], good=True)

def tadiraht_contrib():
    relinfo = []
    relvals = []
    for d in dbm.contrib.distinct(u'tadirahTechniques', filter={}):
        relvals.append(d)
    for d in dbm.contrib.find({}, {u'tadirahTechniques._id': True}):
        relinfo.append([d[u'_id'], [r[u'_id'] for r in d.get(u'tadirahTechniques', [])]])
    return dict(relinfo=relinfo, relvals=relvals, msgs=[], good=True)
