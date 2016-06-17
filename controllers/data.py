# -*- coding: utf-8 -*-

def list_country():
    records = dbd.executesql('''
select
    id, countrycode, name, member_dariah, latitude, longitude
from country
order by name
;
''')
    return dict(data=records, msgs=[], good=True)

def list_contrib():
    records = dbd.executesql('''
select
    id, title
from contrib
order by title
;
''')
    return dict(data=records, msgs=[], good=True)

def item_contrib():
    mainrecords = dbd.executesql('''
select
    contrib.id,
    contrib.title,
    contrib.contact_person_name,
    country.countrycode,
    country.name 
from
    contrib
inner join
    country
on
    contrib.country_id = country.id
where contrib.id in ({})
;
'''.format(request.vars.ids))
    
    relrecords = dbd.executesql('''
select
    contrib.id as id, 
    type_of_inkind.id as tid,
    type_of_inkind.val as tval
from
    contrib
inner join
    contrib_type_of_inkind
on
    contrib.id = contrib_type_of_inkind.contrib_id
inner join 
    type_of_inkind
on
    type_of_inkind.id = contrib_type_of_inkind.type_of_inkind_id
where 
    contrib.id in ({})
;
'''.format(request.vars.ids))

    relrecordsi = {}
    for rr in relrecords:
        mid = rr[0]
        relrecordsi.setdefault(mid, []).append((rr[1], rr[2]))
    records = []
    for mr in mainrecords:
        mid = mr[0]
        records.append(mr+(tuple(relrecordsi.get(mid, [])),))
    return dict(data=records, msgs=[], good=True)

def list_type():
    records = dbd.executesql('''
select
    id, val
from type_of_inkind
order by val
;
''')
    return dict(data=records, msgs=[], good=True)

def list_tadiraha():
    records = dbd.executesql('''
select
    id, val
from tadirah_research_activities
order by val
;
''')
    return dict(data=records, msgs=[], good=True)

def list_tadiraho():
    records = dbd.executesql('''
select
    id, val
from tadirah_research_objects
order by val
;
''')
    return dict(data=records, msgs=[], good=True)

def list_tadiraht():
    records = dbd.executesql('''
select
    id, val
from tadirah_research_techniques
order by val
;
''')
    return dict(data=records, msgs=[], good=True)

def type_contrib():
    relinfo = {}
    relvals = {}
    reldata = dbd.executesql('''
select
    contrib_id,
    type_of_inkind_id
from
    contrib_type_of_inkind
;
''')
    relvaldata = dbd.executesql('''
select
    id, val
from type_of_inkind
''')
    for r in reldata: relinfo.setdefault(r[0], set()).add(r[1])
    for r in relvaldata: relvals[r[0]] = r[1]
    return dict(relinfo=list((x[0], list(x[1])) for x in relinfo.items()), relvals=list(relvals.items()), msgs=[], good=True)

def tadiraha_contrib():
    relinfo = {}
    relvals = {}
    reldata = dbd.executesql('''
select
    contrib_id,
    tadirah_research_activities_id
from
    contrib_tadirah_research_activities
;
''')
    relvaldata = dbd.executesql('''
select
    id, val
from tadirah_research_activities
''')
    for r in reldata: relinfo.setdefault(r[0], set()).add(r[1])
    for r in relvaldata: relvals[r[0]] = r[1]
    return dict(relinfo=list((x[0], list(x[1])) for x in relinfo.items()), relvals=list(relvals.items()), msgs=[], good=True)

def tadiraho_contrib():
    relinfo = {}
    relvals = {}
    reldata = dbd.executesql('''
select
    contrib_id,
    tadirah_research_objects_id
from
    contrib_tadirah_research_objects
;
''')
    relvaldata = dbd.executesql('''
select
    id, val
from tadirah_research_objects
''')
    for r in reldata: relinfo.setdefault(r[0], set()).add(r[1])
    for r in relvaldata: relvals[r[0]] = r[1]
    return dict(relinfo=list((x[0], list(x[1])) for x in relinfo.items()), relvals=list(relvals.items()), msgs=[], good=True)

def tadiraht_contrib():
    relinfo = {}
    relvals = {}
    reldata = dbd.executesql('''
select
    contrib_id,
    tadirah_research_techniques_id
from
    contrib_tadirah_research_techniques
;
''')
    relvaldata = dbd.executesql('''
select
    id, val
from tadirah_research_techniques
''')
    for r in reldata: relinfo.setdefault(r[0], set()).add(r[1])
    for r in relvaldata: relvals[r[0]] = r[1]
    return dict(relinfo=list((x[0], list(x[1])) for x in relinfo.items()), relvals=list(relvals.items()), msgs=[], good=True)

def country_contrib():
    relinfo = {}
    relvals = {}
    reldata = dbd.executesql('''
select
    contrib.id, country.countrycode
from
    contrib
inner join
    country
on
    contrib.country_id = country.id
;
''')
    relvaldata = dbd.executesql('''
select
    countrycode, name, member_dariah, latitude, longitude
from
    country
;
''')
    for r in reldata: relinfo.setdefault(r[0], set()).add(r[1])
    for r in relvaldata: relvals[r[0]] = (r[1], r[2] == 1, r[3], r[4])
    return dict(relinfo=list((x[0], list(x[1])) for x in relinfo.items()), relvals=list(relvals.items()), msgs=[], good=True)
