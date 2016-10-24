import os, sys
import bottle

dir = os.path.dirname(__file__)
target_dir = '{}{}{}'.format(dir, '/' if dir else '', 'controllers')
os.chdir(target_dir)
sys.path.append('.')
from app import app

application = app
