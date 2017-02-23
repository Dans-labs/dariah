
# coding: utf-8

# # Assessment Logic
# 
# This notebook describes the data model for managing the assessment process
# and provides an initial database setting to get started.
# 
# ## Assessment
# 
# Contributions are self-assessed by the creator of the contribution, i.e. the one who enters
# the contributions into the system.
# 
# An assessment has the form of a list of questions, to be answered by the user.
# The list of questions is generated on the basis of two things:
# 
# * the type of contribution
# * the currently active assessment *package*.
# 
# ## Contribution type
# 
# Contributions are divided into types and subtypes, a total of roughly a dozen values.
# We reserve just one field for contribution type, because type and subtype cannot be chosen independently.
# 
# ## Package
# 
# The list of types and subtypes is determinded by the back office, and may change from year to year.
# Also the list of assessment questions will grow over the years.
# Finally, the mapping between types and questions will be determined by the back office and is subject
# to periodical change, typically annually, or biannually.
# 
# A package is a complete specification of availables types, questions and the mapping between them.
# A package is *active* when it is used as the basis for the assessment process.
# Whenever a new package becomes active, the currently remaining package becomes inactive, but it remains in the
# system. Every assessment in the system has a connection with the package that was active when the 
# assessment was initiated.
# 
# 
# 

# In[65]:

import os,sys,re,collections,json,yaml
from os.path import splitext, basename
from functools import reduce
from glob import glob
from lxml import etree
from datetime import datetime
from pymongo import MongoClient
from bson.objectid import ObjectId


# In[168]:

class IdIndex(object):
    def __init__(self):
        self._idFromName = {}
        self._nameFromId = {}
    def getId(self, name):
        _id = self._idFromName.get(name, None)
        if _id == None:
            _id = str(ObjectId())
            self._idFromName[name] = _id
            self._nameFromId[_id] = name
        return _id
    def getName(self, _id): return self._nameFromId[_id]
    
idIndex = IdIndex()

class MongoId(object):
    def __init__(self, name):
        self._id = idIndex.getId(name)
    def __repr__(self):
        return '{}("{}")'.format('ObjectId', self._id)

def mid_representer(dumper, data):
    return dumper.represent_scalar('!mongoId', '{}'.format(data))

def mid_constructor(loader, node):
    name = loader.construct_scalar(node)
    return MongoId(name)

yaml.add_representer(MongoId, mid_representer)
yaml.add_constructor('!mongoId', mid_constructor)


# In[184]:

yaml.load('''
methods:
  - my_contribs: list my contributions
    rows: own
  - list_contrib: list contributions
    rows: public
''')


# In[166]:

mainTable = yaml.load('''
contributionType:
  fieldList:
  - name
  - main
  field:
    name:
      label: Type
    main: 
      label: Main Type
assessCriterion:
  fieldList:
  - code
  - name
  - levels
  field:
    code:
      label: Code
    name:
      label: Criterion
    level:
      label: Levels
assessPackage:
  fieldList:
  - name
  - active
  - description
  - typeList
  - typeQuestion
  field:
    name:
      label: Name
    active:
      label: Is active
    description:
      label: Description
    typeList:
      label: List of contribution types
    typeQuestion:
      label: Mapping of questions to contribution types
assessResult:
  fieldList:
  - package
  - crieterion
  - contribution
  - score
  - evidence
  - workflow
  field:
  - package:
      label: With respect to package
  - criterion:
      label: With respect to criterion
  - contribution:
      label: For contribution
  - score:
      label: Level scored
  - evidence:
      label: Evidence
  - workflow:
      label: As part of
''')


# In[167]:

mainTable


# In[172]:

mainTableData = yaml.load('''
contributionType:
- 
  _id: !mongoId s1
  name: hosting services
  main: service
-
  _id: !mongoId s2
  name: processing services
  main: service
- 
  _id: !mongoId s3
  name: support services
  main: service
- 
  _id: !mongoId s4a
  name: access to resources
  main: service
- 
  _id: !mongoId s4b
  name: access to software
  main: service
- 
  _id: !mongoId a1
  name: event
  main: activity
- 
  _id: !mongoId a2
  name: consulting
  main: activity
- 
  _id: !mongoId a3
  name: dariah coordination
  main: activity
- 
  _id: !mongoId a4
  name: resource creation
  main: activity
- 
  _id: !mongoId a5
  name: software development
  main: activity
''')


# In[173]:

mainTableData


# In[ ]:



