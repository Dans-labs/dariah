import os

from flask import send_file

from models.compiled.names import N

STATIC_ROOT = '../static/'

origins = {
    'tech': STATIC_ROOT,
}


def determineOrigin(path):
  root = STATIC_ROOT
  for origin in origins:
    if path.startswith(origin):
      root = origins[origin]
      path = path.replace(origin, '', 1)
      break
  return (os.path.abspath(root), path)


class FileApi(object):

  def __init__(self):
    pass

  def static(self, path):
    (root, fpath) = determineOrigin(path)
    return send_file(f'{root}/{fpath}')

  def json(self, path):
    (root, fpath) = determineOrigin(path)
    filepath = f'{root}/{fpath}'
    if os.path.exists(filepath):
      with open(filepath) as fh:
        text = fh.read()
      return {N.data: text, N.msgs: [], N.good: True}
    else:
      return {
          N.data: 'not found',
          N.msgs: [{
              N.kind: N.error,
              N.text: 'file {} not found'.format(filepath)
          }],
          N.good: False
      }
