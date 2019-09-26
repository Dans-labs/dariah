import yaml

from controllers.wrap.table import Table


class Contrib(Table):
  def __init__(self, db, auth, mongo):
    super().__init__(db, auth, mongo=mongo)
    self.table = 'contrib'
    self.fields = yaml.load('''
title:
  label: Title
  type: string
year:
  label: Year
  type: year
country:
  label: Country
  type: country
selected:
  label: Selected by National Coordinator
  type: bool3
  perm:
    edit: coord
vcc:
  label: VCC(s)
  type: vcc
  multiple: true
typeContribution:
  label: Type
  type: typeContribution
description:
  label: Description
  type: text
costTotal:
  label: Cost (total)
  type: money
  perm:
    read: coord
costDescription:
  label: Cost (description)
  type: text
  perm:
    read: coord
contactPersonName:
  label: Contact person
  type: string
contactPersonEmail:
  label: Contact email
  type: email
  multiple: true
  perm:
    read: auth
urlContribution:
  label: Contribution url
  type: url
  multiple: true
urlAcademic:
  label: Academic url
  type: url
  multiple: true
tadirahObject:
  label: Object(s)
  type: tadirahObject
  multiple: true
tadirahActivity:
  label: Activity(ies)
  type: tadirahActivity
  multiple: true
tadirahTechnique:
  label: Technique(s)
  type: tadirahTechnique
  multiple: true
discipline:
  label: Disciplines
  type: discipline
  multiple: true
keyword:
  label: Keywords
  type: keyword
  multiple: true
    ''')
