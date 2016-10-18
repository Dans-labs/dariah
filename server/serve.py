import os
from importlib import import_module

dir = os.path.dirname(__file__)
if dir: os.chdir(dir)

import bottle
import_module('app')

application = bottle.default_app()
