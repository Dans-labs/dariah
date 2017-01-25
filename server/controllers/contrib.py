DEFAULTS = dict(
    IDONLY     = False,
    GETVALUES = '/value_list?list={}',
)

contribModel = dict(

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

    fieldSpecs = [

        dict(
            name       = 'title',
            label      = 'Title:',
            valType    = 'text',
            multiple   = False,
            validation = dict(nonEmpty=True),
        ),
        dict(
            name       = 'year',
            label      = 'Year:',
            valType    = 'range',
            multiple   = False,
            validation = dict(nonEmpty=True, min=2000, max=2100, step=1),
        ),
        dict(
            name       = 'dateCreated',
            label      = 'created on:',
            valType    = 'datetime',
            multiple   = False,
            validation = dict(nonEmpty=True),
        ),
        dict(
            name       = 'dateModified',
            label      = 'modified on:',
            valType    = 'datetime',
            multiple   = True,
            validation = dict(nonEmpty=False),
        ),
        dict(
            name        = 'contactPersonName',
            label       = 'contact person:',
            valType     = 'text',
            multiple    = False,
            validation  = dict(nonEmpty=True),
        ),
        dict(
            name        = 'contactPersonEmail',
            label       = 'contact email:',
            valType     = 'email',
            multiple    = True,
            validation  = dict(nonEmpty=True),
        ),
        dict(
            name        = 'urlContribution',
            label       = 'Contribution url:',
            valType     = 'url',
            multiple    = True,
            validation  = dict(nonEmpty=True),
        ),
        dict(
            name        = 'urlAcademic',
            label       = 'Academic url:',
            valType     = 'url',
            multiple    = True,
            validation  = dict(nonEmpty=True),
        ),
        dict(
            name        = 'description',
            label       = 'Description:',
            valType     = 'textarea',
            multiple    = False,
            validation  = dict(nonEmpty=True),
            convert     = 'markdown',
        ),
        dict(
            name        = 'costTotal',
            label       = 'cost (total):',
            valType     = 'number',
            multiple    = False,
            validation  = dict(nonEmpty=True),
        ),
        dict(
            name        = 'costDescription',
            label       = 'cost (description):',
            valType     = 'textarea',
            validation  = dict(nonEmpty=True),
            convert     = 'markdown',
            multiple    = False,
        ),
        dict(
            name        = 'creator',
            label       = 'creator:',
            valType     = 'rel',
            multiple    = False,
            validation  = dict(nonEmpty=True),
            convert     = 'user',
            allowNew    = False,
            getValues   = '/users',
            idOnly      = True,
        ),
        dict(
            name        = 'modifiedBy',
            label       = 'modified by:',
            valType     = 'rel',
            multiple    = True,
            validation  = dict(nonEmpty=False),
            convert     = 'user',
            allowNew    = False,
            getValues   = '/users',
            idOnly      = True,
        ),
        dict(
            name        = 'country',
            label       = 'Country(ies):',
            valType     = 'rel',
            multiple    = False,
            validation  = dict(nonEmpty=True),
            convert     = 'country',
            allowNew    = False,
            getValues   = '/member_country',
        ),
        dict(
            name        = 'vcc',
            label       = 'VCC:',
            valType     = 'rel',
            multiple    = True,
            validation  = dict(nonEmpty=True),
            allowNew    = False,
        ),
        dict(
            name        = 'disciplines',
            label       = 'Disciplines:',
            valType     = 'rel',
            multiple    = True,
            validation  = dict(nonEmpty=True),
            allowNew    = True,
        ),
        dict(
            name        = 'keywords',
            label       = 'Keywords:',
            valType     = 'rel',
            multiple    = True,
            validation  = dict(nonEmpty=True),
            allowNew    = True,
        ),
        dict(
            name        = 'typeContribution',
            label       = 'Type:',
            valType     = 'rel',
            multiple    = False,
            validation  = dict(nonEmpty=True),
            allowNew    = False,
        ),
        dict(
            name        = 'tadirahObjects',
            label       = 'Object(s):',
            valType     = 'rel',
            multiple    = True,
            validation  = dict(nonEmpty=False),
            allowNew    = False,
        ),
        dict(
            name        = 'tadirahActivities',
            label       = 'Activity(ies):',
            valType     = 'rel',
            multiple    = True,
            validation  = dict(nonEmpty=False),
            allowNew    = False,
        ),
        dict(
            name        = 'tadirahTechniques',
            label       = 'Technique(s):',
            valType     = 'rel',
            multiple    = True,
            validation  = dict(nonEmpty=False),
            allowNew    = False,
        ),
    ],
)

class ContribModel(object):
    def __init__(self):
        fs = contribModel['fieldSets']
        for s in fs:
            fs[s] = set(fs[s].strip().split())

        fs['all'] = fs['public'] | fs['own'] | fs['system'] 
        fs['uall'] = fs['upublic'] | fs['uauth'] | fs['usystem'] 

        fs = contribModel['fieldSpecs']
        for spec in fs:
            valType = spec['valType']
            if valType == 'rel':
                if 'idOnly' not in spec:
                    spec['idOnly'] = DEFAULTS['IDONLY']
                if 'getValues' not in spec:
                    spec['getValues'] = DEFAULTS['GETVALUES'].format(spec['name'])
        for (k, v) in contribModel.items():
            setattr(self, k, v)

    
