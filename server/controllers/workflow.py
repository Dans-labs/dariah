from controllers.utils import now

def getActiveItems(basicList):
    present = now()
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
        for tp in doc['typeContribution']:
            typeCriteria.setdefault(tp, set()).add(doc['_id'])
    typeIds = {tp for doc in packages for tp in doc['typeContribution']}
    result = dict(
        package=set(packageIds),
        type=typeIds,
        criteriaIds=criteriaIds,
        criteriaEntities=criteriaEntities,
        typeCriteria=typeCriteria,
    )
    return result

def detailInsert(basicList,
    table=None,
    masterDocument=None,
):
    if table == 'assessment':
        detailData = []
        insertValues = dict()
        if masterDocument != None:
            activeItems = getActiveItems(basicList)
            criteriaIds = activeItems['criteriaIds']
            criteriaEntities = activeItems['criteriaEntities']
            typeCriteria = activeItems['typeCriteria']
            masterType = masterDocument.get('typeContribution', None)
            insertValues['assessmentType'] = masterType
            if masterType != None:
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
        return dict(
            detailData=dict(criteriaEntry=detailData),
            insertValues=insertValues,
        )
