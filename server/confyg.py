import sys,os,collections,yaml
from glob import glob

from controllers.utils import serverprint

roots = sys.argv[1:]

def doRoot(root):
    for path in glob('{}/*.yaml'.format(root)):
        fName = os.path.splitext(os.path.basename(path))[0]
        model = fName[0].upper()+fName[1:]
        serverprint('\t{}: .yaml => .py'.format(fName))
        src = '{}/{}.yaml'.format(root, fName)
        dst = '{}/{}.py'.format(root, fName)
        with open(src) as sh:
            data = yaml.load(sh)
            with open(dst, 'w') as dh:
                dh.write('model = {}'.format(repr(data)))
                dh.write('''
class {}Model(object):
    def __init__(self):
        for (k, v) in model.items():
            setattr(self, k, v)
'''.format(model))

for root in roots: doRoot(root)
