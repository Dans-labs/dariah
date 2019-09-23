import yaml


class Config(object):
  pass


class Names(object):
  pass


with open(f'yaml/names.yaml') as fh:
  names = yaml.load(fh)
  for (k, v) in names.items():
    if k == 'names':
      for n in v:
        setattr(Names, n, n)
    else:
      setattr(Config, k, v)
