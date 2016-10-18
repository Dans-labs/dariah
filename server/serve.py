import os
dir = os.path.dirname(__file__)
if dir: os.chdir(dir)

import bottle
from app import *

application = bottle.default_app()
