# -*- coding: utf-8 -*-

@auth.requires_login()
def longtext():
    data = dbd.executesql('''
select description_of_contribution from contrib
where length(description_of_contribution) > 10000
limit 1;
''')
    print data[0]
    return dict()

