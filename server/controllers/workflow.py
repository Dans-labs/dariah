from controllers.utils import now

from models.data import DataModel as DM
from models.names import *

def readWorkflow(basicList, table, myDocs):
    result = {}
    for w in DM[N_workflow].get(table, {}).get(N_read, []):
        _computeWorkflow(basicList, myDocs, w, result) 
    return result

def adjustWorkflow(basicList, table, document, adjustedValues):
    return _applyAdjustWorkflow(basicList,
        _combineAffected(
            _getAffected(
                basicList, document, adjustedValues, w,
            ) for w in DM[N_workflow].get(table, {}).get(N_adjust, []),
        ),
    )

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

# BASIC RULE COMPUTATION METHODS THAT CAN BE CONFIGURED IN A WORKFLOW

def _otherHasValue(master, linkField, myDocs, myField, otherDocs, otherField, value, emptyFields):
    workflowIds = set()
    if master:
        for otherDoc in otherDocs:
            if otherDoc.get(otherField, None) == value:
                myId = otherDoc.get(linkField, None)
                if myId != None:
                    workflowIds.add(myId)
    else:
        otherIndex = dict((doc[N__id], doc.get(otherField, None)) for doc in otherDocs)
        for myDoc in myDocs:
            otherId = myDoc.get(linkField, None)
            otherValue = otherIndex.get(otherId, None)
            if otherValue == value:
                workflowIds.add(myDoc[N__id])
    return workflowIds

def _otherHasIncomplete(master, linkField, myDocs, myField, otherDocs, otherField, value, emptyFields):
    workflowIds = set()
    if master:
        for otherDoc in otherDocs:
            if any(_isEmpty(otherDoc.get(emptyField, None)) for emptyField in emptyFields):
                myId = otherDoc.get(linkField, None)
                if myId != None:
                    workflowIds.add(myId)
    else:
        otherIndex = dict((doc[N__id], [doc.get(emptyField, None) for emptyField in emptyFields]) for doc in otherDocs)
        for myDoc in myDocs:
            otherId = myDoc.get(linkField, None)
            otherValues = otherIndex.get(otherId, None)
            if any(_isEmpty(otherValue) for otherValue in otherValues):
                workflowIds.add(myDoc[N__id])
    return workflowIds

def _otherHasDifferent(master, linkField, myDocs, myField, otherDocs, otherField, value, emptyFields):
    workflowIds = set()
    if master:
        myIndex = dict((doc[N__id], doc.get(myField, None)) for doc in myDocs)
        for otherDoc in otherDocs:
            myId = otherDoc.get(linkField, None)
            if myId == None: continue
            myValue = myIndex.get(myId, None)
            otherValue = otherDoc.get(otherField, None)
            if myValue != otherValue:
                workflowIds.add(myId)
    else:
        otherIndex = dict((doc[N__id], doc.get(otherField, None)) for doc in otherDocs)
        for myDoc in myDocs:
            otherId = myDoc.get(linkField, None)
            if otherId == None: continue
            otherValue = otherIndex.get(otherId, None)
            myValue = myDoc.get(myField, None)
            if myValue != otherValue:
                workflowIds.add(myDoc[N__id])
    return workflowIds

methods = {
    'hasValue': _otherHasValue,
    'hasDifferent': _otherHasDifferent,
    'hasIncomplete': _otherHasIncomplete,
}

# HELPERS READ WORKFLOW

def _isEmpty(val):
    return not val or (type(val) is list and len([v for v in val if v]) == 0)

def _applyReadWorkflow(workflowIds, workflow, result):
    for myWorkflowId in workflowIds:
        if myWorkflowId not in result: result[myWorkflowId] = {}
        result[myWorkflowId].update(workflow)

def _computeWorkflow(basicList, myDocs, w, result):
    myDocIds = {doc[N__id] for doc in myDocs}

    method = w['method']
    master = w['master']
    linkField = w[N_linkField]
    myField = w['myField']
    otherTable = w['otherTable']
    otherField = w['otherField']
    value = w['value']
    emptyFields = w['emptyFields']
    workflow = w[N_workflow]

    if master:
        otherDocs = basicList(otherTable, {linkField: {'$in': list(myDocIds)}}, True) 
    else:
        otherIds = {doc[linkField] for doc in myDocs}
        otherDocs = basicList(otherTable, {N__id: {'$in': list(otherIds)}}, True)

    myWorkflowIds = methods[method](master, linkField, myDocs, myField, otherDocs, otherField, value, emptyFields)
    _applyReadWorkflow(myWorkflowIds, workflow, result)

def _getAffected(basicList, document, adjustedValues, w):
    otherTable = w['otherTable']
    master = w['master']
    linkField = w[N_linkField]
    triggerFields = w['triggerFields']

    triggers = set(triggerFields)
    if not master: triggers.add(linkField)
    if any((document.get(triggerField, None) != adjustedValues.get(triggerField, None)) for triggerField in triggers):
        myDocs = [doc for doc in (document, adjustedValues) if N__id in doc]
        myDocIds = {doc[N__id] for doc in myDocs}

        if master:
            otherDocs = basicList(otherTable, {linkField: {'$in': list(myDocIds)}}, True) 
        else:
            otherIds = {doc[linkField] for doc in myDocs}
            otherDocs = basicList(otherTable, {N__id: {'$in': list(otherIds)}}, True)
        return (otherTable, otherDocs)
    return (None, [])

def _combineAffected(affecteds):
    allAffected = {}
    for (table, docs) in affecteds:
        for doc in docs:
            allAffected.setdefault(table, {})[doc[N__id]] = doc
    return allAffected

def _applyAdjustWorkflow(basicList, allAffected):
    workflowEntries = []
    for (table, docMap) in allAffected.items():
        docIds = docMap.keys()
        docs = docMap.values()
        workflow = readWorkflow(basicList, table, docs)
        for docId in docIds:
            workflowEntries.append([table, docId, workflow.get(docId, {})])
    return workflowEntries

# HELPERS ADJUST WORKFLOW

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

