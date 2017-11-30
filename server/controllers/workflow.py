from controllers.utils import now

from models.compiled.model import model as M
from models.compiled.names import *

DM = M[N_tables]
WM = M[N_workflow]

def readWorkflow(basicList, table, myDocMap):
    result = {}
    for w in DM.get(table, {}).get(N_workflow, {}).get(N_read, []):
        _computeWorkflow(basicList, table, myDocMap, w, result) 
    return result

def adjustWorkflow(basicList, table, document, adjustedValues):
    return _applyAdjustWorkflow(basicList,
        _combineAffected(
            _getAffected(
                basicList, table, document, adjustedValues, w,
            ) for w in DM.get(table, {}).get(N_workflow, {}).get(N_adjust, []),
        ),
    )

def enforceWorkflow(workflow, currentDoc, newDoc, action, msgs):
    allow = True
    for (attribute, actionPreventions) in WM[N_prevent].items():
        attributeMap = workflow.get(attribute, {})
        if attributeMap.get(N_on, False):
            actionPrevention = actionPreventions.get(action, None)
            if actionPrevention == True:
                allow = False
                msgs.append({
                    N_kind: N_error,
                    N_text: 'Cannot {} because {}'.format(
                        action,
                        attributeMap.get(N_desc),
                    ),
                })
            else:
                thisAllow = True
                if actionPrevention == N_except:
                    exceptFields = set(attributeMap.get(N_except, []))
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
                                ),
                            })
                elif actionPrevention:
                    for (field, fieldPreventions) in actionPrevention.items():
                        if fieldPreventions == True:
                            if currentDoc.get(field, None) != newDoc.get(field, None):
                                thisAllow = False
                                msgs.append({
                                    N_kind: N_error,
                                    N_text: 'Cannot {} field {}}'.format(
                                        action,
                                        field,
                                    ),
                                })
                        elif fieldPreventions:
                            for when in (N_before, N_after):
                                if when in fieldPreventions:
                                    testValue = fieldPreventions[when]
                                    useSource = currentDoc if when == N_before else newDoc
                                    useValue = useSource.get(field, None)
                                    if testValue == useValue:
                                        thisAllow = False
                                        msgs.append({
                                            N_kind: N_error,
                                            N_text: ('Cannot {} {} from {}' if when == N_before else 'Cannot change {} to{}').format(
                                                action,
                                                field,
                                                useValue,
                                            ),
                                        })
                if not thisAllow:
                    allow = False
                    msgs.append({
                        N_kind: N_error,
                        N_text: 'Cannot {} because {}'.format(
                            action,
                            attributeMap.get(N_desc),
                        ),
                    })
    return allow

def detailInsert(
    basicList,
    msgs,
    head,
    table=None,
    masterDocument=None,
):
    good = True
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
                msgs.append({N_kind: N_error, N_text: 'Contribution has no type'})
            else:
                typeDoc = typeInfo[masterType]
                typeHead = head(N_typeContribution, typeDoc)
                if masterType not in typeIds:
                    good = False
                    msgs.append({N_kind: N_error, N_text: 'Contribution type {} is a legacy type'.format(typeHead)})
                elif masterType not in typeCriteria:
                    good = False
                    msgs.append({N_kind: N_error, N_text: 'No criteria defined for contribution type {}'.format(typeHead)})
                else:
                    criteria = typeCriteria[masterType]
                    theseCriteriaIds = [c for c in criteriaIds if c in criteria]
                    for (n, critId) in enumerate(theseCriteriaIds):
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
    elif table == N_review:
        detailData = []
        if masterDocument != None:
            criteriaEntryDocs = basicList(
                N_criteriaEntry,
                {N_assessment: masterDocument.get(N__id, None)},
                {N__id: True, N_seq: True, N_criteria: True},
            )
            for criteriaEntryDoc in criteriaEntryDocs:
                detailData.append({
                    N_linkField: N_review,
                    N_criteria: criteriaEntryDoc.get(N_criteria, None),
                    N_criteriaEntry: criteriaEntryDoc.get(N__id, None),
                    N_seq: criteriaEntryDoc.get(N_seq, None),
                    N_comments: [''],
                })
        data = {
            N_detailData: {N_reviewEntry: detailData},
        }
    return (good, data)

# BASIC RULE COMPUTATION METHODS THAT CAN BE CONFIGURED IN A WORKFLOW

def _compute_hasValue(myDocMap, otherDocMap, w):
    otherField = w.get(N_otherField, None)
    value = w.get(N_value, None)

    return dict(
        (myDocId, {N_on: True}) \
        for (myDocId, otherDocs) in otherDocMap.items() \
        if any(otherDoc.get(otherField, None) == value for otherDoc in otherDocs)
    )

def _compute_hasIncomplete(myDocMap, otherDocMap, w):
    linkField = w.get(N_linkField, None)
    emptyFields = w.get(N_emptyFields, None)

    incompleteMap = dict(
        (myDocId, [
            otherDoc.get(N__id) \
            for otherDoc in otherDocs \
            if any(_isEmpty(otherDoc.get(emptyField, None)) for emptyField in emptyFields)
        ]) \
        for (myDocId, otherDocs) in otherDocMap.items() \
    )
    return dict(
        (myDocId, {N_on: True, 'n': len(otherDocs)}) \
        for (myDocId, otherDocs) in incompleteMap.items() \
        if len(otherDocs) > 0
    )

def _compute_hasDifferent(myDocMap, otherDocMap, w):
    linkField = w.get(N_linkField, None)
    myField = w.get(N_myField, None)
    otherField = w.get(N_otherField, None)

    return dict(
        (myDocId, {N_on: True}) \
        for (myDocId, otherDocs) in otherDocMap.items() \
        if any(
            otherDoc.get(otherField, None) != myDocMap[myDocId].get(myField, None) \
            for otherDoc in otherDocs
        )
    )

def _compute_getValues(myDocMap, otherDocMap, w):
    otherField = w.get(N_otherField, None)

    return dict(
        (myDocId, {N_items: [
            otherDoc.get(otherField) \
            for otherDoc in otherDocs
        ]}) \
        for (myDocId, otherDocs) in otherDocMap.items()
    )
 
# SELECTOR FUNCTIONS

def _selectDocsRead(basicList, table, myDocMap, w):
    inspect = w.get(N_inspect, None)
    linkField = w.get(N_linkField, None)
    otherTable = w.get(N_otherTable, None)

    if inspect == N_self:
        otherDocMap = dict((id, [doc]) for (id, doc) in myDocMap.items())
    elif inspect == N_details:
        details = basicList(otherTable, {linkField: {'$in': list(myDocMap.keys())}}, True) 
        otherDocMap = {}
        for detail in details:
            masterId = detail.get(linkField, None)
            otherDocMap.setdefault(masterId, []).append(detail)
    elif inspect == N_master:
        masterIdFromDetailId = dict(
            (detailId, detailDoc.get(linkField, None)) \
            for (detailId, detailDoc) in myDocMap.items()
        )

        detailIdsFromMasterId = _makeInverse(masterIdFromDetailId)
        masters = basicList(otherTable, {N__id: {'$in': list(masterIdFromDetailId.values())}}, True)
        otherDocMap = {}
        for master in masters:
            masterId = master.get(N__id, None)
            detailIds = detailIdsFromMasterId[masterId]
            for detailId in detailIds:
                otherDocMap.setdefault(detailId, []).append(master)
            
    elif inspect == N_siblings:
        masterIdFromDetailId = dict(
            (detailId, detailDoc.get(linkField, None)) \
            for (detailId, detailDoc) in myDocMap.items()
        )
        detailIdsFromMasterId = _makeInverse(masterIdFromDetailId)
        siblings = basicList(table, {linkField: {'$in': list(masterIdFromDetailId.values())}}, True) 
        otherDocMap = {}
        for sibling in siblings:
            masterId = sibling.get(linkField, None)
            detailIds = detailIdsFromMasterId[masterId]
            for detailId in detailIds:
                if detailId != sibling.get(N__id, None):
                    otherDocMap.setdefault(detailId, []).append(sibling)
    else:
        # workflow config error
        otherDocMap = {}

    return otherDocMap

def _selectDocsAdjust(basicList, table, myDocs, w):
    inspect = w.get(N_inspect, None)
    linkField = w.get(N_linkField, None)
    otherTable = w.get(N_otherTable, None)

    if inspect == N_self: return []

    if inspect == N_self:
        otherDocs = myDocs
        otherTable = table
    elif inspect == N_details:
        otherDocs = basicList(
            otherTable,
            {linkField: {'$in': [doc.get(N__id, None) for doc in myDocs]}},
            True,
        ) 
    elif inspect == N_master:
        otherIds = {doc.get(linkField, None) for doc in myDocs}
        otherDocs = basicList(otherTable, {N__id: {'$in': list(otherIds)}}, True)
    elif inspect == N_siblings:
        masterIds = {doc.get(linkField, None) for doc in myDocs}
        otherDocs = basicList(
            table,
            {'$and': [
                {linkField: {'$in': list(masterIds)}},
                {N__id: {'$nin': [doc.get(N__id, None) for doc in myDocs]}},
            ]},
            True,
        ) 
        otherTable = table
    else:
        # workflow config error
        otherDocs = []
    return (otherTable, otherDocs)

def _makeInverse(sourceDict):
    result = {}
    for (k, v) in sourceDict.items():
        result.setdefault(v, []).append(k)
    return result

# HELPERS READ WORKFLOW

def _isEmpty(val):
    return not val or (type(val) is list and len([v for v in val if v]) == 0)

def _applyReadWorkflow(workflowResults, attribute, result):
    for (myWorkflowId, myWorkflowMap) in workflowResults.items():
        for (k, v) in attribute.items():
            if k != N_name:
                myWorkflowMap[k] = v.format(**myWorkflowMap) if k == N_desc else v
        result.setdefault(myWorkflowId, {})[attribute[N_name]] = myWorkflowMap

def _computeWorkflow(basicList, table, myDocs, w, result):
    method = w.get(N_method, None)
    inspect = w.get(N_inspect, None)
    linkField = w.get(N_linkField, None)
    otherTable = w.get(N_otherTable, None)
    attribute = w.get(N_attribute, None)

    otherDocMap = _selectDocsRead(basicList, table, myDocs, w)

    myWorkflowResults = globals()['_compute_{}'.format(method)](myDocs, otherDocMap, w)
    _applyReadWorkflow(myWorkflowResults, attribute, result)

# HELPERS ADJUST WORKFLOW

def _getAffected(basicList, table, document, adjustedValues, w):
    inspect = w.get(N_inspect, None)
    linkField = w.get(N_linkField, None)
    triggerFields = w.get(N_triggerFields, None)

    triggers = set(triggerFields)
    if inspect == N_master: triggers.add(linkField)
    if any(
        (document.get(triggerField, None) != adjustedValues.get(triggerField, None)) \
        for triggerField in triggers
    ):
        myDocs = [doc for doc in (document, adjustedValues)]
        return _selectDocsAdjust(basicList, table, myDocs, w)
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
        workflow = readWorkflow(basicList, table, docMap)
        for docId in docMap:
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

