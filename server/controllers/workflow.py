from controllers.utils import now
from models.names import *

timing = {
    N_assessment: {
        N_submitted: {
            True: N_dateSubmitted,
            False: N_dateWithdrawn,
        },
    },
}

def _getActiveItems(basicList):
    present = now()
    types = basicList(
        N_typeContribution,
        {},
        {N__id: True, N_mainType: True, N_subType: True},
    )
    typeInfo = dict((doc[N__id], doc) for doc in types)

    packages = basicList(
        N_package,
        {N_startDate: {'$lte': present}, N_endDate: {'$gte': present}},
        {N__id: True, N_typeContribution: True},
    )
    packageIds = [doc[N__id] for doc in packages]  
    activeFilter = {N_package: {'$in': packageIds}}
    criteria = basicList(
        N_criteria,
        activeFilter,
        True,
        sort=((N_criterion, 1),),
    )
    typeCriteria = {}
    criteriaEntities = {}
    criteriaIds = [doc[N__id] for doc in criteria]  
    for doc in criteria:
        criteriaEntities[str(doc[N__id])] = doc
        tps =  doc.get(N_typeContribution, [])
        for tp in tps:
            typeCriteria.setdefault(tp, set()).add(doc[N__id])
    typeIds = {tp for doc in packages for tp in doc.get(N_typeContribution, [])}
    result = {
        N_package: set(packageIds),
        N_type: typeIds,
        N_typeInfo: typeInfo,
        N_criteriaIds: criteriaIds,
        N_criteriaEntities: criteriaEntities,
        N_typeCriteria: typeCriteria,
    }
    return result

def detailInsert(
    basicList,
    head,
    table=None,
    masterDocument=None,
):
    good = True
    message = None
    data = None
    if table == N_assessment:
        detailData = []
        insertValues = {}
        if masterDocument != None:
            activeItems = _getActiveItems(basicList)
            criteriaIds = activeItems[N_criteriaIds]
            criteriaEntities = activeItems[N_criteriaEntities]
            typeCriteria = activeItems[N_typeCriteria]
            typeIds = activeItems[N_type]
            typeInfo = activeItems[N_typeInfo]
            masterType = masterDocument.get(N_typeContribution, None)
            insertValues[N_assessmentType] = masterType
            if masterType == None:
                good = False
                message = 'Contribution has no type'
            else:
                typeDoc = typeInfo[masterType]
                typeHead = head(N_typeContribution, typeDoc)
                if masterType not in typeIds:
                    good = False
                    message = 'Contribution type {} is a legacy type'.format(typeHead)
                elif masterType not in typeCriteria:
                    good = False
                    message = 'No criteria defined for contribution type {}'.format(typeHead)
                else:
                    criteria = typeCriteria[masterType]
                    theseCriteriaIds = [c for c in criteriaIds if c in criteria]
                    for (n, critId) in enumerate(theseCriteriaIds):
                        critDoc = criteriaEntities[str(critId)]
                        detailData.append({
                            N_linkField: N_assessment,
                            N_seq: n + 1,
                            N_criteria: critId,
                            N_evidence: [''],
                        })
        data = {
            N_detailData: {N_criteriaEntry: detailData},
            N_insertValues: insertValues,
        }
    return (good, message, data)

