# -*- coding: utf-8 -*-

country = dict (
        AT=('Austria', True, 47.7, 15.11),
        BE=('Belgium', True, 51.3, 3.1),
        HR=('Croatia', True, 44.7, 15.6),
        CY=('Cyprus', True, 35.0, 32.8),
        CZ=('Czech Republic', True, 49.8, 15.2),
        DK=('Denmark', True, 55.6, 11.0),
        EE=('Estonia', True, 59.0, 25.0),
        FR=('France', True, 46.5, 1.9),
        DE=('Germany', True, 51.0, 10.4),
        GR=('Greece', True, 38.0, 23.8),
        HU=('Hungary', True, 46.9, 19.8),
        IE=('Ireland', True, 53.1, -8.4),
        IT=('Italy', True, 41.6, 13.0),
        LV=('Latvia', True, 56.9, 26.8),
        LT=('Lithuania', True, 55.2, 24.9),
        LU=('Luxembourg', True, 49.6, 6.1),
        MT=('Malta', True, 35.9, 14.4),
        NL=('Netherlands', True, 52.8, 5.8),
        PL=('Poland', True, 52.3, 19.8),
        PT=('Portugal', True, 38.7, -9.0),
        RS=('Serbia', True, 44.0, 20.8),
        SK=('Slovakia', True, 48.8, 19.9),
        SI=('Slovenia', True, 46.2, 14.4),
        CH=('Switzerland', True, 46.9, 8.3),
        GB=('United Kingdom', True, 52.9, -1.8),
        AL=('Albania', False, None, None),
        AD=('Andorra', False, None, None),
        BY=('Belarus', False, None, None),
        BA=('Bosnia and Herzegovina', False, None, None),
        BG=('Bulgaria', False, None, None),
        FI=('Finland', False, None, None),
        GE=('Georgia', False, None, None),
        IS=('Iceland', False, None, None),
        SM=('San Marino', False, None, None),
        KS=('Kosovo', False, None, None),
        LI=('Liechtenstein', False, None, None),
        MK=('Macedonia', False, None, None),
        MD=('Moldova', False, None, None),
        MC=('Monaco', False, None, None),
        ME=('Montenegro', False, None, None),
        NO=('Norway', False, None, None),
        RO=('Romania', False, None, None),
        RU=('Russian Federation', False, None, None),
        ES=('Spain', False, None, None),
        SE=('Sweden', False, None, None),
        TR=('Turkey', False, None, None),
        UA=('Ukraine', False, None, None),
    )

def list_contrib():
    records = dbd.executesql('''
select
    contrib.id, contrib.title
from contrib
;
''')
    return dict(data=records, msgs=[], good=True)

def type_contrib():
    relinfo = {}
    relvals = {}
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
        relinfo.setdefault(r[0], {})[r[1]] = True
        relvals[r[1]] = r[2]
    return dict(data=relinfo, relvals=relvals, msgs=[], good=True)

def country_contrib():
    relinfo = {}
    relvals = {}
    reldata = dbd.executesql('''
select
    contrib.id, country.countrycode
from
    contrib
inner join country on
    contrib.country_id = country.id
;
''')
    for r in country:
        relvals[r] = country[r]

    for r in reldata:
        relinfo.setdefault(r[0], {})[r[1]] = True
    return dict(data=relinfo, relvals=relvals, msgs=[], good=True)

def list_country():
    return dict(data=tuple((c,)+country[c] for c in country), relvals={}, msgs=[], good=True)
