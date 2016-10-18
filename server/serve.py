import os
dir = os.path.dirname(__file__)
if dir: os.chdir(dir)

import bottle
__import__('app')

application = bottle.default_app()
