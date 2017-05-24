import os, sys
import bottle

dir = os.path.dirname(__file__)
#target_dir = '{}{}{}'.format(dir, '/' if dir else '', 'controllers')
target_dir = '{}{}'.format(dir, '/' if dir else '')
os.chdir(target_dir)
sys.path.append('.')
from index import app

application = app
