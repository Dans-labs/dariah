import yaml


fields = yaml.load('''
title:
  label: Title
  type:
year:
  label: Year
  type:
country:
  label: Country
  type:
selected:
  label: Selected by National Coordinator
  type:
  perm:
    edit: coord
vcc:
  label: VCC(s)
  type:
  multiple: true
typeContribution:
  label: Type
  type:
description:
  label: Description
  type:
costTotal:
  label: Cost (total)
  type:
  perm:
    read: coord
costDescription:
  label: Cost (description)
  type:
  perm:
    read: coord
contactPersonName:
  label: Contact person
  type:
contactPersonEmail:
  label: Contact email
  type:
  multiple: true
  perm:
    read: auth
urlContribution:
  label: Contribution url
  type:
  multiple: true
urlAcademic:
  label: Academic url
  type:
  multiple: true
tadirahObject:
  label: Object(s)
  type:
  multiple: true
tadirahActivity:
  label: Activity(ies)
  type:
  multiple: true
tadirahTechnique:
  label: Technique(s)
  type:
  multiple: true
discipline:
  label: Disciplines
  type:
  multiple: true
keyword:
  label: Keywords
  type:
  multiple: true
''')

for f in fields:
  print(f)
