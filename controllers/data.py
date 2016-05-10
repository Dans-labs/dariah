# -*- coding: utf-8 -*-

def list_contrib():
    relinfo_order = ('type',)
    relinfo = dict((x, {}) for x in relinfo_order)
    relvals = dict((x, {}) for x in relinfo_order)
    reldata = dbd.executesql('''
select
    contrib_type_of_inkind.contrib_id as id,
    type_of_inkind.id as tid,
    type_of_inkind.val as val
from
    contrib_type_of_inkind
inner join type_of_inkind on
    contrib_type_of_inkind.type_of_inkind_id = type_of_inkind.id
;
''')
    for r in reldata:
        relinfo['type'].setdefault(r[0], {})[r[1]] = True
        relvals['type'][r[1]] = r[2]

    main_records = dbd.executesql('''
select
    contrib.id, contrib.title,
    country.countrycode, country.countryname
from contrib
inner join country
on country.id = contrib.country_id
;
''')
    records = []
    for mr in main_records:
        main_id = mr[0]
        records.append(mr+tuple(relinfo[knd].get(main_id, {}) for knd in relinfo_order))
    return dict(data=records, relvals=relvals, msgs=[], good=True)

def list_country():
    records = dbd.executesql('''
select
    countrycode, countryname
from country
''')
    return dict(data=records, relvals={}, msgs=[], good=True)
