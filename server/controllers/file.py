import os

from bottle import static_file

from models.names import *

STATIC_ROOT = '../static/'

origins = {
    'tech': '../static/',
}

def determine_origin(path):
    root = STATIC_ROOT
    for origin in origins:
        if path.startswith(origin):
            root = origins[origin]
            path = path.replace(origin, '', 1)
            break
    return (root, path)

class FileApi(object):
    def __init__(self):
        pass

    def static(self, path):
        (root, fpath) = determine_origin(path)
        return static_file(fpath, root=root)

    def json(self, path):
        (root, fpath) = determine_origin(path)
        filepath = root + fpath
        if os.path.exists(filepath):
            with open(filepath) as fh:
                text = fh.read()
            return {N_data: text, N_msgs: [], N_good: True}
        else:
            return {N_data: 'not found', N_msgs: [{N_kind: N_error, N_text: 'file {} not found'.format(filepath)}], N_good: False}
