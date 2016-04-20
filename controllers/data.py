# -*- coding: utf-8 -*-

def contribs():
    records = dbd.executesql('''
select
    contrib.id, contrib.title,
    country.countrycode, country.countryname
from contrib
inner join country
on country.id = contrib.country_id
''')
    return dict(data=records, msgs=[], good=True)

def countries():
    records = dbd.executesql('''
select
    countrycode, countryname
from country
''')
    return dict(data=records, msgs=[], good=True)
