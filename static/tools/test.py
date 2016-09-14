import collections
from pymongo import MongoClient
clientm = MongoClient()
dbm = clientm.dariah

for cn in dbm.collection_names():
    print cn

cnt_type1 = collections.Counter()
cnt_type2 = collections.Counter()

for c in dbm.contrib.find({}, {u'_id': False, u'type_of_inkind': True}):
    #print c
    ts = c.get(u'type_of_inkind', None)
    if not type(ts) is list:
        ts = [ts]
    for t in ts:
        cnt_type1[t] += 1

for c in dbm.contrib.distinct(u'type_of_inkind', {}):
    cnt_type2[c] += 1

print "Method1 by frequency"
for (t,c) in sorted(cnt_type1.items(), key=lambda x: (-x[1], x[0])):
    print '{:>3} {}'.format(c, t)
print "Method1 by alphabetically"
for (t,c) in sorted(cnt_type1.items(), key=lambda x: (x[0], x[1])):
    print '{:>3} {}'.format(c, t)
print "Method2"
for (t,c) in sorted(cnt_type2.items(), key=lambda x: (-x[1], x[0])):
    print '{:>3} {}'.format(c, t)
