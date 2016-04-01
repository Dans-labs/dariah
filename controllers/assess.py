# -*- coding: utf-8 -*-

def titles():
    titles = dbd.executesql('''
select
    contrib.id, contrib.title,
    country.countrycode, country.countryname
from contrib
inner join country
on country.id = contrib.country_id
order by contrib.title
''')
    return dict(titles=titles)

