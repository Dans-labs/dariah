from controllers.utils import now

from models.compiled.model import model as M
from models.compiled.names import *

DM = M[N_tables]
WM = M[N_workflow]

def readWorkflow(basicList, table, myDocs):
    result = {}
    for w in DM.get(table, {}).get(N_workflow, {}).get(N_read, []):
        _computeWorkflow(basicList, myDocs, w, result) 
    return result

def adjustWorkflow(basicList, table, document, adjustedValues):
    return _applyAdjustWorkflow(basicList,
        _combineAffected(
            _getAffected(
                basicList, document, adjustedValues, w,
            ) for w in DM.get(table, {}).get(N_workflow, {}).get(N_adjust, []),
        ),
    )

def enforceWorkflow(workflow, currentDoc, newDoc, action, msgs):
    allow = True
    for (condition, preventions) in WM[N_prevent].items():
        workflowCondition = workflow.get(condition, None)
        if workflowCondition:
            thesePreventions = preventions.get(action, None)
            if thesePreventions == True:
                allow = False
                msgs.append({
                    N_kind: N_error,
                    N_text: 'Cannot {} because {}'.format(
                        action,
                        workflow.get('{}Reason'.format(condition), condition),
                    ),
                })
            elif thesePreventions == N_except:
                exceptFields = set(workflowCondition.get(N_except, []))
                thisAllow = True
                for field in set(currentDoc) | set(newDoc):
                    if field in exceptFields: continue
                    if currentDoc.get(field, None) != newDoc.get(field, None):
                        thisAllow = False
                        msgs.append({
                            N_kind: N_error,
                            N_text: 'Cannot {} field {} from {} to {}'.format(
                                action,
                                field,
                                currentDoc.get(field, None),
                                newDoc.get(field, None),
                                workflow.get('{}Reason'.format(condition), condition),
                            ),
                        })
                if not thisAllow:
                    allow = False
                    msgs.append({
                        N_kind: N_error,
                        N_text: 'Cannot {} because {}'.format(
                            action,
                            workflow.get('{}Reason'.format(condition), condition),
                        ),
                    })
            elif thesePreventions:
                for (field, fieldPreventions) in thesePreventions.items():
                    if fieldPreventions == True:
                        if currentDoc.get(field, None) != newDoc.get(field, None):
                            allow = False
                            msgs.append({
                                N_kind: N_error,
                                N_text: 'Cannot {} field {} because {}'.format(
                                    action,
                                    field,
                                    workflow.get('{}Reason'.format(condition), condition),
                                )
                            })
                    elif fieldPreventions:
                        for when in (N_before, N_after):
                            if when in fieldPreventions:
                                testValue = fieldPreventions[when]
                                useSource = currentDoc if when == N_before else newDoc
                                useValue = useSource.get(field, None)
                                if testValue == useValue:
                                    allow = False
                                    thisReason = ('Cannot {} {} from {}' if when == N_before else 'Cannot change {} to{}').format(
                                        action,
                                        field,
                                        useValue,
                                    )
                                    msgs.append({
                                        N_kind: N_error,
                                        N_text: '{} because {}'.format(
                                            thisReason,
                                            workflow.get('{}Reason'.format(condition), condition),
                                        )
                                    })
    return allow

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

def _otherHasValue(myDocs, otherDocs, w):
    inspect = w.get(N_inspect, None)
    linkField = w.get(N_linkField, None)
    otherField = w.get(N_otherField, None)
    value = w.get(N_value, None)

    workflowIds = set()
    if inspect == N_self:
        for myDoc in myDocs:
            if myDoc.get(otherField, None) == value:
                workflowIds.add(myDoc.get(N__id, None))
    elif inspect == N_details:
        for otherDoc in otherDocs:
            if otherDoc.get(otherField, None) == value:
                myId = otherDoc.get(linkField, None)
                if myId != None:
                    workflowIds.add(myId)
    else:
        otherIndex = dict((doc.get(N__id, None), doc.get(otherField, None)) for doc in otherDocs)
        for myDoc in myDocs:
            otherId = myDoc.get(linkField, None)
            otherValue = otherIndex.get(otherId, None)
            if otherValue == value:
                workflowIds.add(myDoc.get(N__id, None))
    return workflowIds

def _otherHasIncomplete(myDocs, otherDocs, w):
    inspect = w.get(N_inspect, None)
    linkField = w.get(N_linkField, None)
    emptyFields = w.get(N_emptyFields, None)

    workflowIds = set()
    if inspect == N_self:
        for myDoc in myDocs:
            if any(_isEmpty(myDoc.get(emptyField, None)) for emptyField in emptyFields):
                workflowIds.add(myDoc.get(N__id, None))
    elif inspect == N_details:
        for otherDoc in otherDocs:
            if any(_isEmpty(otherDoc.get(emptyField, None)) for emptyField in emptyFields):
                myId = otherDoc.get(linkField, None)
                if myId != None:
                    workflowIds.add(myId)
    else:
        otherIndex = dict((doc.get(N__id, None), [doc.get(emptyField, None) for emptyField in emptyFields]) for doc in otherDocs)
        for myDoc in myDocs:
            otherId = myDoc.get(linkField, None)
            otherValues = otherIndex.get(otherId, None)
            if any(_isEmpty(otherValue) for otherValue in otherValues):
                workflowIds.add(myDoc.get(N__id, None))
    return workflowIds

def _otherHasDifferent(myDocs, otherDocs, w):
    inspect = w.get(N_inspect, None)
    linkField = w.get(N_linkField, None)
    myField = w.get(N_myField, None)
    otherField = w.get(N_otherField, None)

    workflowIds = set()
    if inspect == N_self:
        for myDoc in myDocs:
            if myDoc.get(myField, None) != myDoc.get(otherField, None):
                workflowIds.add(myDoc.get(N__id, None))
    elif inspect == N_details:
        myIndex = dict((doc.get(N__id, None), doc.get(myField, None)) for doc in myDocs)
        for otherDoc in otherDocs:
            myId = otherDoc.get(linkField, None)
            if myId == None: continue
            myValue = myIndex.get(myId, None)
            otherValue = otherDoc.get(otherField, None)
            if myValue != otherValue:
                workflowIds.add(myId)
    else:
        otherIndex = dict((doc.get(N__id, None), doc.get(otherField, None)) for doc in otherDocs)
        for myDoc in myDocs:
            otherId = myDoc.get(linkField, None)
            if otherId == None: continue
            otherValue = otherIndex.get(otherId, None)
            myValue = myDoc.get(myField, None)
            if myValue != otherValue:
                workflowIds.add(myDoc.get(N__id, None))
    return workflowIds

methods = {
    'hasValue': _otherHasValue,
    'hasDifferent': _otherHasDifferent,
    'hasIncomplete': _otherHasIncomplete,
}

# HELPERS READ WORKFLOW

def _isEmpty(val):
    return not val or (type(val) is list and len([v for v in val if v]) == 0)

def _applyReadWorkflow(workflowItems, workflow, result):
    if type(workflowItems) is set:
        for myWorkflowId in workflowItems:
            if myWorkflowId not in result: result[myWorkflowId] = {}
            result[myWorkflowId].update(workflow)
    elif type(workflowItems) is dict:
        for (myWorkflowId, myWorkflowData) in workflowItems.items():
            if myWorkflowId not in result: result[myWorkflowId] = {}
            result[myWorkflowId].update(workflow)
            result[myWorkflowId].update(myWorkflowData)

def _computeWorkflow(basicList, myDocs, w, result):
    myDocIds = {doc.get(N__id, None) for doc in myDocs}

    method = w.get(N_method, None)
    inspect = w.get(N_inspect, None)
    linkField = w.get(N_linkField, None)
    otherTable = w.get(N_otherTable, None)
    workflow = w.get(N_workflow, None)

    if inspect == N_self:
        otherDocs = myDocs
    elif inspect == N_details:
        otherDocs = basicList(otherTable, {linkField: {'$in': list(myDocIds)}}, True) 
    else:
        otherIds = {doc[linkField] for doc in myDocs}
        otherDocs = basicList(otherTable, {N__id: {'$in': list(otherIds)}}, True)

    myWorkflowIds = methods[method](myDocs, otherDocs, w)
    _applyReadWorkflow(myWorkflowIds, workflow, result)

# HELPERS ADJUST WORKFLOW

def _getAffected(basicList, document, adjustedValues, w):
    otherTable = w.get(N_otherTable, None)
    inspect = w.get(N_inspect, None)
    linkField = w.get(N_linkField, None)
    triggerFields = w.get(N_triggerFields, None)

    triggers = set(triggerFields)
    if inspect == N_master: triggers.add(linkField)
    if any((document.get(triggerField, None) != adjustedValues.get(triggerField, None)) for triggerField in triggers):
        myDocs = [doc for doc in (document, adjustedValues)]
        myDocIds = {doc.get(N__id, None) for doc in myDocs}

        if inspect == N_details:
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
            allAffected.setdefault(table, {})[doc.get(N__id, None)] = doc
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

# MISCELLANEOUS FUNCTIONS

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

