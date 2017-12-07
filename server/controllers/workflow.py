from controllers.utils import now, mongoFields, mongoRows
from models.compiled.model import model as M
from models.compiled.names import N

DM = M[N.tables]
WM = M[N.workflow]

# BASIC RULE COMPUTATION METHODS THAT CAN BE CONFIGURED IN A WORKFLOW


def _compute_hasValue(myDocMap, otherDocMap, w):
    otherField = w.get(N.otherField, None)
    value = w.get(N.value, None)

    return {
        myDocId: {
            N.on: True
        }
        for (myDocId, otherDocs) in otherDocMap.items()
        if any(
            otherDoc.get(otherField, None) == value for otherDoc in otherDocs
        )
    }


def _compute_hasIncomplete(myDocMap, otherDocMap, w):
    emptyFields = w.get(N.emptyFields, None)

    incompleteMap = {
        myDocId: [
            otherDoc.get(N._id) for otherDoc in otherDocs
            if any(
                _isEmpty(otherDoc.get(emptyField, None))
                for emptyField in emptyFields
            )
        ]
        for (myDocId, otherDocs) in otherDocMap.items()
    }
    return {
        myDocId: {
            N.on: True,
            'n': len(otherDocs)
        }
        for (myDocId, otherDocs) in incompleteMap.items() if len(otherDocs) > 0
    }


def _compute_hasDifferent(myDocMap, otherDocMap, w):
    myField = w.get(N.myField, None)
    otherField = w.get(N.otherField, None)

    return {
        myDocId: {
            N.on: True
        }
        for (myDocId, otherDocs) in otherDocMap.items()
        if any(
            otherDoc.get(otherField, None) != myDocMap[myDocId]
            .get(myField, None) for otherDoc in otherDocs
        )
    }


def _compute_getValues(myDocMap, otherDocMap, w):
    otherFields = w.get(N.otherFields, [])

    return {
        myDocId: {
            N.items: [{
                otherField: otherDoc.get(otherField)
                for otherField in otherFields if otherField in otherDoc
            } for otherDoc in otherDocs]
        }
        for (myDocId, otherDocs) in otherDocMap.items()
    }


class WorkflowApi(object):
    def __init__(self, MONGO):
        self.MONGO = MONGO

    def workflowLookup(self, table, rowFilter, fieldSet, msgs, sort=None):
        MONGO = self.MONGO
        theRowFilter = mongoRows(rowFilter)
        fieldFilter = None if fieldSet is True else mongoFields(fieldSet)
        if sort is None:
            result = list(MONGO[table].find(theRowFilter, fieldFilter))
        else:
            result = list(
                MONGO[table].find(theRowFilter, fieldFilter).sort(sort)
            )
        return result

    def readWorkflow(self, msgs, table, myDocMap):
        result = {}
        for w in DM.get(table, {}).get(N.workflow, {}).get(N.read, []):
            self._computeWorkflow(msgs, table, myDocMap, w, result)
        return result

    def adjustWorkflow(self, msgs, table, document, adjustedValues):
        return self._applyAdjustWorkflow(
            msgs,
            self._combineAffected(
                self._getAffected(
                    msgs,
                    table,
                    document,
                    adjustedValues,
                    w,
                )
                for w in DM.get(table, {}).get(N.workflow, {})
                .get(N.adjust, [])
            ),
        )

    def enforceWorkflow(self, workflow, currentDoc, newDoc, action, msgs):
        allow = True
        for (attribute, actionPreventions) in WM[N.prevent].items():
            attributeMap = workflow.get(attribute, {})
            if attributeMap.get(N.on, False):
                actionPrevention = actionPreventions.get(action, None)
                if actionPrevention is True:
                    allow = False
                    msgs.append({
                        N.kind:
                            N.error,
                        N.text:
                            'Cannot {} because {}'.format(
                                action,
                                attributeMap.get(N.desc),
                            ),
                    })
                else:
                    thisAllow = True
                    if actionPrevention == getattr(N, 'except'):
                        exceptFields = set(
                            attributeMap.get(getattr(N, 'except'), [])
                        )
                        for field in set(currentDoc) | set(newDoc):
                            if field in exceptFields:
                                continue
                            if currentDoc.get(field, None
                                              ) != newDoc.get(field, None):
                                thisAllow = False
                                msgs.append({
                                    N.kind:
                                        N.error,
                                    N.text:
                                        'Cannot {} field {} from {} to {}'
                                        .format(
                                            action,
                                            field,
                                            currentDoc.get(field, None),
                                            newDoc.get(field, None),
                                        ),
                                })
                    elif actionPrevention:
                        for (field,
                             fieldPreventions) in actionPrevention.items():
                            if fieldPreventions is True:
                                if currentDoc.get(field, None) != newDoc.get(
                                    field, None
                                ):
                                    thisAllow = False
                                    msgs.append({
                                        N.kind:
                                            N.error,
                                        N.text:
                                            'Cannot {} field {}}'.format(
                                                action,
                                                field,
                                            ),
                                    })
                            elif fieldPreventions:
                                for when in (N.before, N.after):
                                    if when in fieldPreventions:
                                        testValue = fieldPreventions[when]
                                        useSource = (
                                            currentDoc
                                            if when == N.before else newDoc
                                        )
                                        useValue = useSource.get(field, None)
                                        if testValue == useValue:
                                            thisAllow = False
                                            msgs.append({
                                                N.kind:
                                                    N.error,
                                                N.text: (
                                                    'Cannot {} {} from {}'
                                                    if when == N.before else
                                                    'Cannot change {} to{}'
                                                ).format(
                                                    action,
                                                    field,
                                                    useValue,
                                                ),
                                            })
                    if not thisAllow:
                        allow = False
                        msgs.append({
                            N.kind:
                                N.error,
                            N.text:
                                'Cannot {} because {}'.format(
                                    action,
                                    attributeMap.get(N.desc),
                                ),
                        })
        return allow

    def detailInsert(
        self,
        msgs,
        head,
        table=None,
        masterDocument=None,
    ):
        good = True
        data = None
        if table == N.assessment:
            detailData = []
            insertValues = {}
            if masterDocument is not None:
                activeItems = self._getActiveItems(msgs)
                criteriaIds = activeItems[N.criteriaIds]
                typeCriteria = activeItems[N.typeCriteria]
                typeIds = activeItems[N.type]
                typeInfo = activeItems[N.typeInfo]
                masterType = masterDocument.get(N.typeContribution, None)
                insertValues[N.assessmentType] = masterType
                if masterType is None:
                    good = False
                    msgs.append({
                        N.kind: N.error,
                        N.text: 'Contribution has no type',
                    })
                else:
                    typeDoc = typeInfo[masterType]
                    typeHead = head(N.typeContribution, typeDoc)
                    if masterType not in typeIds:
                        good = False
                        msgs.append({
                            N.kind:
                                N.error,
                            N.text:
                                'Contribution type {} is a legacy type'
                                .format(typeHead),
                        })
                    elif masterType not in typeCriteria:
                        good = False
                        msgs.append({
                            N.kind:
                                N.error,
                            N.text:
                                'No criteria defined for contribution type {}'
                                .format(typeHead),
                        })
                    else:
                        criteria = typeCriteria[masterType]
                        theseCriteriaIds = [
                            c for c in criteriaIds if c in criteria
                        ]
                        for (n, critId) in enumerate(theseCriteriaIds):
                            detailData.append({
                                N.linkField: N.assessment,
                                N.seq: n + 1,
                                N.criteria: critId,
                                N.evidence: [''],
                            })
            data = {
                N.detailData: {
                    N.criteriaEntry: detailData
                },
                N.insertValues: insertValues,
            }
        elif table == N.review:
            detailData = []
            if masterDocument is not None:
                assessmentId = masterDocument.get(N._id, None)
                criteriaEntryDocs = self.workflowLookup(
                    N.criteriaEntry,
                    {N.assessment: assessmentId},
                    {N.seq, N.criteria},
                    msgs,
                    sort=((N.seq, 1), ),
                )
                for criteriaEntryDoc in criteriaEntryDocs:
                    detailData.append({
                        N.linkField: N.review,
                        N.assessment: assessmentId,
                        N.criteria: criteriaEntryDoc.get(N.criteria, None),
                        N.criteriaEntry: criteriaEntryDoc.get(N._id, None),
                        N.seq: criteriaEntryDoc.get(N.seq, None),
                        N.comments: [''],
                    })
            data = {
                N.detailData: {
                    N.reviewEntry: detailData
                },
            }
        return (good, data)

# SELECTOR FUNCTIONS

    def _selectDocsRead(self, msgs, table, myDocMap, w):
        inspect = w.get(N.inspect, None)
        linkField = w.get(N.linkField, None)
        otherTable = w.get(N.otherTable, None)
        equalField = w.get(N.equalField, None)

        if inspect == N.self:
            otherDocMap = {id: [doc] for (id, doc) in myDocMap.items()}
        elif inspect == N.details:
            details = self.workflowLookup(
                otherTable,
                {linkField: {
                    '$in': list(myDocMap.keys())
                }},
                True,
                msgs,
            )
            otherDocMap = {}
            for detail in details:
                masterId = detail.get(linkField, None)
                otherDocMap.setdefault(masterId, []).append(detail)
        elif inspect == N.master:
            masterIdFromDetailId = {
                detailId: detailDoc.get(linkField, None)
                for (detailId, detailDoc) in myDocMap.items()
            }
            detailIdsFromMasterId = _makeInverse(masterIdFromDetailId)
            masters = self.workflowLookup(
                otherTable,
                {N._id: {
                    '$in': list(masterIdFromDetailId.values())
                }},
                True,
                msgs,
            )
            otherDocMap = {}
            for master in masters:
                masterId = master.get(N._id, None)
                detailIds = detailIdsFromMasterId[masterId]
                for detailId in detailIds:
                    otherDocMap.setdefault(detailId, []).append(master)

        elif inspect == N.siblings:
            masterIdFromDetailId = {
                detailId: detailDoc.get(linkField, None)
                for (detailId, detailDoc) in myDocMap.items()
            }
            detailIdsFromMasterId = _makeInverse(masterIdFromDetailId)
            siblings = self.workflowLookup(
                otherTable,
                {linkField: {
                    '$in': list(masterIdFromDetailId.values())
                }},
                True,
                msgs,
            )
            otherDocMap = {}
            for sibling in siblings:
                masterId = sibling.get(linkField, None)
                detailIds = detailIdsFromMasterId[masterId]
                for detailId in detailIds:
                    if detailId != sibling.get(N._id, None):
                        if (
                            not equalField or
                            myDocMap[detailId].get(equalField, None) ==
                            sibling.get(equalField, None)
                        ):
                            otherDocMap.setdefault(
                                detailId,
                                [],
                            ).append(sibling)
        else:
            # workflow config error
            otherDocMap = {}

        return otherDocMap

    def _selectDocsAdjust(self, msgs, table, myDocs, w):
        inspect = w.get(N.inspect, None)
        linkField = w.get(N.linkField, None)
        otherTable = w.get(N.otherTable, None)

        if inspect == N.self:
            return []

        if inspect == N.self:
            otherDocs = myDocs
            otherTable = table
        elif inspect == N.details:
            otherDocs = self.workflowLookup(
                otherTable,
                {linkField: {
                    '$in': [doc.get(N._id, None) for doc in myDocs]
                }},
                True,
                msgs,
            )
        elif inspect == N.master:
            otherIds = {doc.get(linkField, None) for doc in myDocs}
            otherDocs = self.workflowLookup(
                otherTable,
                {N._id: {
                    '$in': list(otherIds)
                }},
                True,
                msgs,
            )
        elif inspect == N.siblings:
            masterIds = {doc.get(linkField, None) for doc in myDocs}
            otherDocs = self.workflowLookup(
                table,
                {
                    '$and': [
                        {
                            linkField: {
                                '$in': list(masterIds)
                            }
                        },
                        {
                            N._id: {
                                '$nin': [
                                    doc.get(N._id, None) for doc in myDocs
                                ]
                            }
                        },
                    ]
                },
                True,
                msgs,
            )
            otherTable = table
        else:
            # workflow config error
            otherDocs = []
        return (otherTable, otherDocs)

# HELPERS READ WORKFLOW

    def _applyReadWorkflow(self, workflowResults, attribute, result):
        for (myWorkflowId, myWorkflowMap) in workflowResults.items():
            for (k, v) in attribute.items():
                if k != N.name:
                    myWorkflowMap[k] = v.format(
                        **myWorkflowMap
                    ) if k == N.desc else v
            result.setdefault(myWorkflowId,
                              {})[attribute[N.name]] = myWorkflowMap

    def _computeWorkflow(self, msgs, table, myDocs, w, result):
        method = w.get(N.method, None)
        attribute = w.get(N.attribute, None)

        otherDocMap = self._selectDocsRead(msgs, table, myDocs, w)

        myWorkflowResults = globals()['_compute_{}'.format(method)](
            myDocs, otherDocMap, w
        )
        self._applyReadWorkflow(myWorkflowResults, attribute, result)

# HELPERS ADJUST WORKFLOW

    def _getAffected(self, msgs, table, document, adjustedValues, w):
        inspect = w.get(N.inspect, None)
        linkField = w.get(N.linkField, None)
        triggerFields = w.get(N.triggerFields, None)

        triggers = set(triggerFields)
        if inspect == N.master:
            triggers.add(linkField)
        if any((
            document.get(triggerField, None) !=
            adjustedValues.get(triggerField, None)
        ) for triggerField in triggers):
            myDocs = [doc for doc in (document, adjustedValues)]
            return self._selectDocsAdjust(msgs, table, myDocs, w)
        return (None, [])

    def _combineAffected(self, affecteds):
        allAffected = {}
        for (table, docs) in affecteds:
            for doc in docs:
                allAffected.setdefault(table, {})[doc.get(N._id, None)] = doc
        return allAffected

    def _applyAdjustWorkflow(self, msgs, allAffected):
        workflowEntries = []
        for (table, docMap) in allAffected.items():
            workflow = self.readWorkflow(msgs, table, docMap)
            for docId in docMap:
                workflowEntries.append([table, docId, workflow.get(docId, {})])
        return workflowEntries

# MISCELLANEOUS FUNCTIONS

    def _getActiveItems(self, msgs):
        present = now()
        types = self.workflowLookup(
            N.typeContribution,
            {},
            {N.mainType, N.subType},
            msgs,
        )
        typeInfo = {doc[N._id]: doc for doc in types}

        packages = self.workflowLookup(
            N.package,
            {N.startDate: {
                '$lte': present
            },
             N.endDate: {
                 '$gte': present
             }},
            {N.typeContribution},
            msgs,
        )
        packageIds = [doc[N._id] for doc in packages]
        activeFilter = {N.package: {'$in': packageIds}}
        criteria = self.workflowLookup(
            N.criteria,
            activeFilter,
            True,
            msgs,
            sort=((N.criterion, 1), ),
        )
        typeCriteria = {}
        criteriaEntities = {}
        criteriaIds = [doc[N._id] for doc in criteria]
        for doc in criteria:
            criteriaEntities[str(doc[N._id])] = doc
            tps = doc.get(N.typeContribution, [])
            for tp in tps:
                typeCriteria.setdefault(tp, set()).add(doc[N._id])
        typeIds = {
            tp
            for doc in packages for tp in doc.get(N.typeContribution, [])
        }
        result = {
            N.package: set(packageIds),
            N.type: typeIds,
            N.typeInfo: typeInfo,
            N.criteriaIds: criteriaIds,
            N.criteriaEntities: criteriaEntities,
            N.typeCriteria: typeCriteria,
        }
        return result


# utility functions


def _makeInverse(sourceDict):
    result = {}
    for (k, v) in sourceDict.items():
        result.setdefault(v, []).append(k)
    return result


def _isEmpty(val):
    return not val or (type(val) is list and len([v for v in val if v]) == 0)
