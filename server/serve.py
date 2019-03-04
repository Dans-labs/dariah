import os
import sys

dir = os.path.dirname(__file__)
targetDir = '{}{}'.format(dir, '/' if dir else '')
os.chdir(targetDir)
sys.path.append('.')

from index import factory  # noqa

application = factory()
