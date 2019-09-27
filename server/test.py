class Tables(object):
  pass


setattr(Tables, 'aap', 'the aap')
setattr(Tables, 'noot', 'the noot')

print(set(Tables.__dict__.keys()))
