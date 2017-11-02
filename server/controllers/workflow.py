from controllers.utils import now

def _getActiveItems(basicList):
    present = now()
    types = basicList(
        'typeContribution',
        dict(),
        dict(_id=True, mainType=True, subType=True),
    )
    typeInfo = dict((doc['_id'], '{}/{}'.format(doc.get('mainType', '-'), doc.get('subType', '-'))) for doc in types)

    packages = basicList(
        'package',
        dict(startDate={'$lte': present}, endDate={'$gte': present}),
        dict(_id=True, typeContribution=True),
    )
    packageIds = [doc['_id'] for doc in packages]  
    activeFilter = dict(package={'$in': packageIds})
    criteria = basicList(
        'criteria',
        activeFilter,
        True,
        sort=(('criterion', 1),),
    )
    typeCriteria = dict()
    criteriaEntities = dict()
    criteriaIds = [doc['_id'] for doc in criteria]  
    for doc in criteria:
        criteriaEntities[str(doc['_id'])] = doc
        tps =  doc.get('typeContribution', [])
        for tp in tps:
            typeCriteria.setdefault(tp, set()).add(doc['_id'])
    typeIds = {tp for doc in packages for tp in doc.get('typeContribution', [])}
    result = dict(
        package=set(packageIds),
        type=typeIds,
        typeInfo=typeInfo,
        criteriaIds=criteriaIds,
        criteriaEntities=criteriaEntities,
        typeCriteria=typeCriteria,
    )
    return result

def detailInsert(basicList,
    table=None,
    masterDocument=None,
):
    good = True
    message = None
    data = None
    if table == 'assessment':
        detailData = []
        insertValues = dict()
        if masterDocument != None:
            activeItems = _getActiveItems(basicList)
            criteriaIds = activeItems['criteriaIds']
            criteriaEntities = activeItems['criteriaEntities']
            typeCriteria = activeItems['typeCriteria']
            typeIds = activeItems['type']
            typeInfo = activeItems['typeInfo']
            masterType = masterDocument.get('typeContribution', None)
            insertValues['assessmentType'] = masterType
            if masterType == None:
                good = False
                message = 'Contribution has no type'
            elif masterType not in typeIds:
                good = False
                message = 'Contribution type {} is a legacy type'.format(typeInfo[masterType])
            elif masterType not in typeCriteria:
                good = False
                message = 'No criteria defined for contribution type {}'.format(typeInfo[masterType])
            else:
                criteria = typeCriteria[masterType]
                theseCriteriaIds = [c for c in criteriaIds if c in criteria]
                for (n, critId) in enumerate(theseCriteriaIds):
                    critDoc = criteriaEntities[str(critId)]
                    detailData.append({
                        'linkField': 'assessment',
                        'seq': n + 1,
                        'criteria': critId,
                        'evidence': [],
                    })
        data = dict(
            detailData=dict(criteriaEntry=detailData),
            insertValues=insertValues,
        )
    return (good, message, data)
