# -*- coding: utf-8 -*-

from time import sleep

def list_contrib():
    documents = list(dbm.contrib.find({}).sort(u'title', 1))
    return dict(data=documents, msgs=[], good=True)

def item_contrib():
    ids = request.vars.ids.split(',')
    documents = dbm.contrib.find({'_id': {'$in': ids}})
    return dict(data=list(documents), msgs=[], good=True)

def member_country():
    documents = list(dbm.country.find({}, {u'inDARIAH': True}))
    return dict(data=documents, msgs=[], good=True)
