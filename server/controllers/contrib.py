contribModel = dict(

    fieldSets = dict(

        upublic = set('''
            firstName
            lastName
        '''.strip().split()),

        uauth = set('''
            firstName
            lastName
            email
            eppn
        '''.strip().split()),

        usystem = set('''
            mayLogin
            authority
        '''.strip().split()),

        meta = set('''
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
        '''.strip().split()),

        public = set('''
            title
            year
            country
            creator
            dateCreated
            disciplines
            keywords
            vcc
            urlAcademic
        '''.strip().split()),

        own =  set('''
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
        '''.strip().split()),

        system =  set('''
            modifiedBy
            dateModified
        '''.strip().split()),
    ),

    fieldSpecs = [

        dict(
            name        ='title',
            label       ='Title:',
            hasValueList=False,
            multiple    =False,
            allowNew    =True,
            validation  ='y',
            widget      =dict(kind='input'),
            convert     =None,
            classNames  ='text',
        ),
        dict(
            name        ='year',
            label       ='Year:',
            hasValueList=True,
            multiple    =False,
            allowNew    =True,
            validation  ='2000:2100',
            widget      =dict(kind='input'),
            convert     =None,
            classNames  ='tag',
        ),
        dict(
            name        ='country',
            label       ='Country(ies):',
            hasValueList='member_country',
            multiple    =False,
            allowNew    =False,
            validation  =None,
            widget      =dict(kind='tag'),
            convert     =None,
            classNames  ='tag',
        ),
        dict(
            name        ='vcc',
            label       ='VCC:',
            hasValueList=True,
            multiple    =True,
            allowNew    =False,
            validation  =None,
            widget      =dict(kind='tag'),
            convert     =None,
            classNames  ='tag',
        ),
        dict(
            name        ='creator',
            label       ='creator:',
            hasValueList='users',
            multiple    =False,
            allowNew    =False,
            validation  =None,
            widget      =dict(kind='tag'),
            convert     ='user',
            classNames  ='tag',
        ),
        dict(
            name        ='modifiedBy',
            label       ='modified by:',
            hasValueList='users',
            multiple    =False,
            allowNew    =False,
            validation  =None,
            widget      =dict(kind='tag'),
            convert     ='user',
            classNames  ='tag',
        ),
        dict(
            name        ='dateCreated',
            label       ='created on:',
            hasValueList=None,
            multiple    =False,
            allowNew    =True,
            validation  ='datetime',
            widget      =dict(kind='input'),
            convert     ='datetime',
            classNames  ='date',
        ),
        dict(
            name        ='dateModified',
            label       ='modified on:',
            hasValueList=None,
            multiple    =False,
            allowNew    =True,
            validation  ='datetime',
            widget      =dict(kind='input'),
            convert     ='datetime',
            classNames  ='date',
        ),
        dict(
            name        ='contactPersonName',
            label       ='contact person:',
            hasValueList=False,
            multiple    =False,
            allowNew    =True,
            validation  ='y',
            widget      =dict(kind='input'),
            convert     =None,
            classNames  ='text',
        ),
        dict(
            name        ='contactPersonEmail',
            label       ='contact email:',
            hasValueList=True,
            multiple    =False,
            allowNew    =True,
            validation  ='email',
            widget      =dict(kind='input'),
            convert     =None,
            classNames  ='text',
        ),
        dict(
            name        ='disciplines',
            label       ='Disciplines:',
            hasValueList=True,
            multiple    =True,
            allowNew    =True,
            validation  ='y',
            widget      =dict(kind='tag'),
            convert     =None,
            classNames  ='tag',
        ),
        dict(
            name        ='keywords',
            label       ='Keywords:',
            hasValueList=True,
            multiple    =True,
            allowNew    =True,
            validation  ='y',
            widget      =dict(kind='tag'),
            convert     =None,
            classNames  ='tag',
        ),
        dict(
            name        ='typeContribution',
            label       ='Type:',
            hasValueList=True,
            multiple    =False,
            allowNew    =False,
            validation  =None,
            widget      =dict(kind='tag'),
            convert     =None,
            classNames  ='tag',
        ),
        dict(
            name        ='tadirahObjects',
            label       ='Object(s):',
            hasValueList=True,
            multiple    =True,
            allowNew    =False,
            validation  =None,
            widget      =dict(kind='tag'),
            convert     =None,
            classNames  ='tag',
        ),
        dict(
            name        ='tadirahActivities',
            label       ='Activity(ies):',
            hasValueList=True,
            multiple    =True,
            allowNew    =False,
            validation  =None,
            widget      =dict(kind='tag'),
            convert     =None,
            classNames  ='tag',
        ),
        dict(
            name        ='tadirahTechniques',
            label       ='Technique(s):',
            hasValueList=True,
            multiple    =True,
            allowNew    =False,
            validation  =None,
            widget      =dict(kind='tag'),
            convert     =None,
            classNames  ='tag',
        ),
        dict(
            name        ='urlContribution',
            label       ='Contribution url:',
            hasValueList=True,
            multiple    =False,
            allowNew    =True,
            validation  ='url',
            widget      =dict(kind='input'),
            convert     ='url',
            classNames  ='text',
        ),
        dict(
            name        ='urlAcademic',
            label       ='Academic url:',
            hasValueList=True,
            multiple    =False,
            allowNew    =True,
            validation  ='url',
            widget      =dict(kind='input'),
            convert     ='url',
            classNames  ='text',
        ),
        dict(
            name        ='description',
            label       ='Description:',
            hasValueList=False,
            multiple    =False,
            allowNew    =True,
            validation  =None,
            widget      =dict(kind='textarea'),
            convert     ='markdown',
            classNames  ='text',
        ),
        dict(
            name        ='costTotal',
            label       ='cost (total):',
            hasValueList=False,
            multiple    =False,
            allowNew    =True,
            validation  ='number',
            widget      =dict(kind='input'),
            convert     =None,
            classNames  ='text',
        ),
        dict(
            name        ='costDescription',
            label       ='cost (description):',
            hasValueList=False,
            multiple    =False,
            allowNew    =True,
            validation  =None,
            widget      =dict(kind='textarea'),
            convert     ='markdown',
            classNames  ='text',
        ),
    ],
)

fs = contribModel['fieldSets']
fs['all'] = fs['public'] | fs['own'] | fs['system'] 
fs['uall'] = fs['upublic'] | fs['uauth'] | fs['usystem'] 

