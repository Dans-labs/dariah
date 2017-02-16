DEFAULTS = dict(
    IDONLY     = False,
    APPEARANCE = dict(),
    GETVALUES  = '/value_list?list={}',
)

contribModel = dict(

    title= 'title',
    createdDate = 'dateCreated',
    createdBy = 'creator',
    modDate = 'dateModified',
    modBy = 'modifiedBy',

    fieldSets = dict(

        upublic = '''
            firstName
            lastName
        ''',

        uauth = '''
            firstName
            lastName
            email
            eppn
        ''',

        usystem = '''
            mayLogin
            authority
        ''',

        call = '''
            name
            iso
            isMember
            latitude
            longitude
        ''',

        meta = '''
            title
            year
            country
            disciplines
            keywords
            vcc
            creator
            dateCreated
            urlAcademic
            typeContribution
            tadirahActivities
            tadirahObjects
            tadirahTechniques
            urlContribution
            costTotal
            contactPersonName
            contactPersonEmail
            creator
            modifiedBy
            dateModified
            dateCreated
        ''',

        public = '''
            title
            year
            country
            creator
            dateCreated
            disciplines
            keywords
            vcc
            urlAcademic
        ''',

        own =  '''
            typeContribution
            tadirahActivities
            tadirahObjects
            tadirahTechniques
            urlContribution
            description
            costTotal
            costDescription
            contactPersonName
            contactPersonEmail
        ''',

        system =  '''
            modifiedBy
            dateModified
        ''',
    ),

    fieldOrder = '''
title
year
country
vcc
typeContribution
description
costTotal
costDescription
contactPersonName
contactPersonEmail
urlContribution
urlAcademic
creator
dateCreated
dateModified
modifiedBy
tadirahObjects
tadirahActivities
tadirahTechniques
disciplines
keywords
    '''.strip().split(),

    fieldSpecs = dict(
        title=dict(
            label      = 'Title:',
            valType    = 'text',
            multiple   = False,
            validation = dict(nonEmpty=True),
            initial    = 'title',
        ),
        dateCreated=dict(
            label      = 'created on:',
            valType    = 'datetime',
            multiple   = False,
            validation = dict(nonEmpty=True),
        ),
        dateModified=dict(
            label      = 'modified on:',
            valType    = 'datetime',
            multiple   = True,
            validation = dict(nonEmpty=False),
            appearance = dict(reverse=True, cutoff=1),
        ),
        contactPersonName=dict(
            label       = 'contact person:',
            valType     = 'text',
            multiple    = False,
            validation  = dict(nonEmpty=True),
            initial    = 'First_name Last_name',
        ),
        contactPersonEmail=dict(
            label       = 'contact email:',
            valType     = 'email',
            multiple    = True,
            validation  = dict(nonEmpty=True),
            initial    = 'name@myinstitute.org',
        ),
        urlContribution=dict(
            label       = 'Contribution url:',
            valType     = 'url',
            multiple    = True,
            validation  = dict(nonEmpty=True),
            initial    = 'www.mycontrib.org',
        ),
        urlAcademic=dict(
            label       = 'Academic url:',
            valType     = 'url',
            multiple    = True,
            validation  = dict(nonEmpty=True),
            initial    = 'www.myinstitute.org',
        ),
        description=dict(
            label       = 'Description:',
            valType     = 'textarea',
            multiple    = False,
            validation  = dict(nonEmpty=True),
            convert     = 'markdown',
            initial     = 'This contribution is about ...',
        ),
        costTotal=dict(
            label       = 'cost (total):',
            valType     = 'number',
            multiple    = False,
            validation  = dict(nonEmpty=True),
            initial     = '€ 1000',
        ),
        costDescription=dict(
            label       = 'cost (description):',
            valType     = 'textarea',
            validation  = dict(nonEmpty=True),
            convert     = 'markdown',
            multiple    = False,
            initial     = 'The costs of this contribution can be broken down as follows ...',
        ),
        creator=dict(
            label       = 'creator:',
            valType     = 'rel',
            multiple    = False,
            validation  = dict(nonEmpty=True),
            convert     = 'user',
            allowNew    = False,
            getValues   = '/users',
            idOnly      = True,
        ),
        modifiedBy=dict(
            label       = 'modified by:',
            valType     = 'rel',
            multiple    = True,
            validation  = dict(nonEmpty=False),
            convert     = 'user',
            allowNew    = False,
            getValues   = '/users',
            idOnly      = True,
            appearance = dict(reverse=True, cutoff=1),
        ),
        country=dict(
            label       = 'Country(ies):',
            valType     = 'rel',
            multiple    = False,
            validation  = dict(nonEmpty=True),
            convert     = 'country',
            allowNew    = False,
            getValues   = '/member_country',
        ),
        year=dict(
            label       = 'Year:',
            valType     = 'rel',
            multiple    = False,
            validation  = dict(nonEmpty=True, min=2000, max=2100, step=1),
            allowNew    = True,
        ),
        vcc=dict(
            label       = 'VCC:',
            valType     = 'rel',
            multiple    = True,
            validation  = dict(nonEmpty=True),
            allowNew    = False,
            getValues   = '/vlist?list={}',
        ),
        disciplines=dict(
            label       = 'Disciplines:',
            valType     = 'rel',
            multiple    = True,
            validation  = dict(nonEmpty=True),
            allowNew    = True,
        ),
        keywords=dict(
            label       = 'Keywords:',
            valType     = 'rel',
            multiple    = True,
            validation  = dict(nonEmpty=True),
            allowNew    = True,
        ),
        typeContribution=dict(
            label       = 'Type:',
            valType     = 'rel',
            multiple    = False,
            validation  = dict(nonEmpty=True),
            allowNew    = False,
            getValues   = '/vlist?list={}',
        ),
        tadirahObjects=dict(
            label       = 'Object(s):',
            valType     = 'rel',
            multiple    = True,
            validation  = dict(nonEmpty=False),
            allowNew    = False,
            getValues   = '/vlist?list={}',
        ),
        tadirahActivities=dict(
            label       = 'Activity(ies):',
            valType     = 'rel',
            multiple    = True,
            validation  = dict(nonEmpty=False),
            allowNew    = False,
            getValues   = '/vlist?list={}',
        ),
        tadirahTechniques=dict(
            label       = 'Technique(s):',
            valType     = 'rel',
            multiple    = True,
            validation  = dict(nonEmpty=False),
            allowNew    = False,
            getValues   = '/vlist?list={}',
        ),
    ),
)

class ContribModel(object):
    def __init__(self):
        fs = contribModel['fieldSets']
        for s in fs:
            fs[s] = set(fs[s].strip().split())

        fs['all'] = fs['public'] | fs['own'] | fs['system'] 
        fs['uall'] = fs['upublic'] | fs['uauth'] | fs['usystem'] 

        fs = contribModel['fieldSpecs']
        for (name, spec) in fs.items():
            if 'appearance' not in spec:
                    spec['appearance'] = DEFAULTS['APPEARANCE']
            valType = spec['valType']
            if valType == 'rel':
                if 'idOnly' not in spec:
                    spec['idOnly'] = DEFAULTS['IDONLY']
                if 'getValues' not in spec:
                    spec['getValues'] = DEFAULTS['GETVALUES'].format(name)
                else:
                    spec['getValues'] = spec['getValues'].format(name)
        for (k, v) in contribModel.items():
            setattr(self, k, v)

    
