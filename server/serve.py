import os, sys
import bottle

dir = os.path.dirname(__file__)
if dir: os.chdir(dir)
sys.path.append('.')
from app import *

application = bottle.default_app()
