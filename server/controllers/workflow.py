from collections import OrderedDict
from controllers.utils import now, mongoFields, mongoRows, serverprint, pp
from models.compiled.model import model as M
from models.compiled.names import N

DM = M[N.tables]
WM = M[N.workflow]

NA = 'N/A'

# BASIC RULE COMPUTATION METHODS THAT CAN BE CONFIGURED IN A WORKFLOW


def _compute_hasValue(wf, myDoc, otherDocs, w):
    otherField = w.get(N.otherField, None)
    value = w.get(N.value, None)

    return {
        N.on: True
    } if any(
        otherDoc.get(otherField, None) == value for otherDoc in otherDocs
    ) else {}


def _compute_hasComplete(wf, myDoc, otherDocs, w):
    emptyFields = w.get(N.emptyFields, None)

    completes = all(
        all(
            not _isEmpty(otherDoc.get(emptyField, None))
            for emptyField in emptyFields
        ) for otherDoc in otherDocs
    )
    return {N.on: True} if completes else {}


def _compute_hasIncomplete(wf, myDoc, otherDocs, w):
    emptyFields = w.get(N.emptyFields, None)

    incompletes = [
        otherDoc.get(N._id) for otherDoc in otherDocs
        if any(
            _isEmpty(otherDoc.get(emptyField, None))
            for emptyField in emptyFields
        )
    ]
    return {N.on: True, 'n': len(incompletes)} if len(incompletes) > 0 else {}


def _compute_hasDifferent(wf, myDoc, otherDocs, w):
    myField = w.get(N.myField, None)
    otherField = w.get(N.otherField, None)

    return {
        N.on: True
    } if any(
        otherDoc.get(otherField, None) != myDoc.get(myField, None)
        for otherDoc in otherDocs
    ) else {}


def _compute_getValues(wf, myDoc, otherDocs, w):
    otherFields = w.get(N.otherFields, [])

    return {
        N.items: [{
            otherField: otherDoc.get(otherField)
            for otherField in otherFields if otherField in otherDoc
        } for otherDoc in otherDocs]
    }


def _compute_assessmentScore(wf, myDoc, otherDocs, w):
    MONGO = wf.MONGO
    if not myDoc:
        return {}
    scoreData = list(
        MONGO[N.score].find({}, {
            N._id: True,
            N.criteria: True,
            N.score: True
        })
    )
    scoreMapping = {s[N._id]: s[N.score] for s in scoreData if N.score in s}
    maxScoreByCrit = {}
    for s in scoreData:
        crit = s[N.criteria]
        score = s.get(N.score, 0)
        prevMax = maxScoreByCrit.setdefault(crit, None)
        if prevMax is None or score > prevMax:
            maxScoreByCrit[crit] = score

    resultItems = []
    for otherDoc in otherDocs:
        aId = otherDoc.get(N._id, None)
        if not aId:
            continue
        myCriteriaData = list(
            MONGO[N.criteriaEntry].find({
                N.assessment: aId
            }, {
                N._id: True,
                N.criteria: True,
                N.score: True
            })
        )
        myCriteriaEntries = [(
            cd[N.criteria], scoreMapping.get(cd.get(N.score, None), 0),
            maxScoreByCrit[cd[N.criteria]]
        ) for cd in myCriteriaData]

        allMax = sum(x[2] for x in myCriteriaEntries)
        allN = len(myCriteriaEntries)

        relevantCriteriaEntries = [x for x in myCriteriaEntries if x[1] >= 0]
        relevantMax = sum(x[2] for x in relevantCriteriaEntries)
        relevantScore = sum(x[1] for x in relevantCriteriaEntries)
        relevantN = len(relevantCriteriaEntries)
        overall = 0 if relevantMax == 0 else (
            round(relevantScore * 100 / relevantMax)
        )
        resultItems.append(
            dict(
                overall=overall,
                relevantScore=relevantScore,
                relevantMax=relevantMax,
                allMax=allMax,
                relevantN=relevantN,
                allN=allN,
                aId=aId,
            )
        )
    return {N.items: resultItems}


class WorkflowApi(object):
    def __init__(self, MONGO):
        self.MONGO = MONGO
        self.manageWorkflow(reset=True, init=True)

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

    def manageWorkflow(self, reset=False, init=False):
        MONGO = self.MONGO

        msgs = []
        error = False

        if reset or init:
            if init:
                serverprint('Computing workflow data...')
                MONGO[N.workflow].drop()
            else:
                MONGO[N.workflow].delete_many({N.table: {'$ne': N.workflow}})
            affected = []
            for (table, tableInfo) in DM.items():
                if N.workflow not in tableInfo:
                    continue

                docs = list(MONGO[table].find())
                affected.append(
                    'reset workflow on {} ({} items)'.format(table, len(docs))
                )
                for doc in docs:
                    self.readWorkflow(msgs, table, doc, compute=True)
            error = any(msg[N.kind] == N.error for msg in msgs)
            MONGO[N.workflow].insert_one({
                N.table: N.workflow,
                'dateReset': now(),
                'affected': affected
            })
        wfDocs = []
        docs = list(MONGO[N.workflow].find({}).sort([['dateReset', -1]]))
        attributeCount = {}
        n = 0
        for doc in docs:
            if doc.get(N.table, None) == N.workflow:
                wfDocs.append(doc)
            else:
                n += 1
                table = doc.get(N.table, '')
                for attribute in doc.get(N.attributes, {}):
                    m = attributeCount.setdefault(attribute,
                                                  {}).setdefault(table, 0)
                    attributeCount[attribute][table] = m + 1
        if init:
            pp.pprint(attributeCount)
            serverprint('Computed {} workflow records'.format(len(docs)))
        return {
            N.good: not error,
            N.msgs: msgs,
            N.data: {
                'resets': wfDocs,
                'stats': attributeCount,
                'total': n
            }
        }

    def readWorkflow(self, msgs, table, myDoc, compute=False):
        myId = myDoc.get(N._id)
        if compute:
            result = {}
            for w in DM.get(table, {}).get(N.workflow, {}).get(N.read, []):
                self._computeWorkflow(msgs, table, myDoc, w, result)
            if myId:
                self._storeWorkflow(table, myId, result)
        else:
            result = self.loadWorkflow(table, myId=myId)
        return result

    def loadWorkflow(self, table, myId=None):
        MONGO = self.MONGO
        selectInfo = {
            N.table: table
        } if myId is None else {
            N.table: table,
            'eId': myId
        }
        workflowResults = list(MONGO[N.workflow].find(selectInfo))
        if myId is None:
            result = {}
            for wf in workflowResults:
                eId = wf.get('eId', None)
                attributes = wf.get(N.attributes, None)
                if attributes is not None:
                    result[eId] = attributes
        else:
            result = {}
            for wf in workflowResults:
                attributes = wf.get(N.attributes, None)
                if attributes is not None:
                    result = attributes
        return result

    def _storeWorkflow(self, table, myId, result):
        MONGO = self.MONGO
        selectInfo = {N.table: table, 'eId': myId}
        if not result:
            MONGO[N.workflow].delete_one(selectInfo)
        else:
            updateInfo = {}
            updateInfo.update(selectInfo)
            updateInfo[N.attributes] = result
            MONGO[N.workflow].update_one(
                selectInfo, {'$set': updateInfo}, upsert=True
            )

    def adjustWorkflow(self, msgs, table, document, adjustedValues):
        result = self._applyAdjustWorkflow(
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
        for (table, docId, attributes) in result:
            self._storeWorkflow(table, docId, attributes)

        return result

    def enforceWorkflow(self, workflow, currentDoc, newDoc, action, msgs):
        if not workflow:
            return True
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

    def weed(self, workflow, records, action):
        weeded = OrderedDict()
        deleted = set()
        weedDeleted = action == N.delete
        if weedDeleted:
            for (table, eId) in records:
                deleted.add((table, eId))
        for (table, eId, attributes) in workflow:
            if weedDeleted and (table, str(eId)) in deleted:
                continue
            weeded.setdefault(table,
                              OrderedDict()).setdefault(eId,
                                                        {}).update(attributes)
        workflow.clear()
        for (table, tableData) in weeded.items():
            for (eId, attributes) in tableData.items():
                workflow.append((table, eId, attributes))

    def detailInsert(
        self,
        msgs,
        table=None,
        masterDocument=None,
    ):
        good = True
        data = None
        if table == N.assessment:
            detailData = []
            insertValues = {}
            insertValues['submitted'] = False
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
                    typeHead = self._head(N.typeContribution, typeDoc)
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
            insertValues = {}
            if masterDocument is not None:
                assessmentId = masterDocument.get(N._id, None)
                contribId = masterDocument.get(N.contrib, None)
                masterType = masterDocument.get(N.assessmentType, None)
                insertValues[N.reviewType] = masterType
                insertValues[N.contrib] = contribId
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
                N.insertValues: insertValues,
            }
        return (good, data)

    def consolidateDoc(
        self,
        table,
        document,
        workflow,
        msgs,
    ):
        MONGO = self.MONGO
        if table == N.review:
            if document.get(N.decision, None):
                consMaterial = {}
                consMap = {}
                self._consolidate(
                    table, [document], msgs, consMaterial, consMap
                )
                MONGO['{}_{}'.format(table,
                                     N.consolidated)].insert_one(consMaterial)
                return (True, consMaterial)
        return (True, None)

    def _consolidate(self, table, documents, msgs, consMaterial, consMap):
        MONGO = self.MONGO
        tableInfo = DM.get(table, {})
        fieldOrder = tableInfo[N.fieldOrder]
        fieldSpecs = tableInfo[N.fieldSpecs]
        detailOrder = tableInfo.get(N.detailOrder, None)
        details = tableInfo.get(N.details, None)
        docRefs = []
        fmt = '{:>03}'
        for document in documents:
            consDoc = {}
            eId = document.get(N._id, None)
            docRef = consMap.setdefault(table, {}).get(eId, None)
            done = True
            if docRef is None:
                docRef = len(consMap[table])
                consMap[table][eId] = docRef
                done = False
            docRefs.append(
                (table, fmt.format(docRef), self._head(table, document))
            )
            if done:
                continue
            consMaterial.setdefault(table, {})[fmt.format(docRef)] = consDoc
            for field in fieldOrder:
                if field not in document:
                    consDoc[field] = None
                    continue
                fieldSpec = fieldSpecs[field]
                valType = fieldSpec[N.valType]
                multiple = fieldSpec[N.multiple]
                docVal = document[field]
                if type(valType) is str:
                    consDoc[field] = docVal
                else:
                    relTable = valType[N.relTable]
                    relTableInfo = DM.get(relTable, {})
                    relSort = relTableInfo[N.sort]
                    relatedDocs = list(
                        MONGO[relTable].find({
                            N._id: {
                                '$in': [
                                    _id
                                    for _id in
                                    (docVal if multiple else [docVal])
                                ]
                            }
                        }).sort(relSort)
                    )
                    if len(relatedDocs) == 0:
                        consDoc[field] = None
                    else:
                        theseDocRefs = self._consolidate(
                            relTable,
                            relatedDocs,
                            msgs,
                            consMaterial,
                            consMap,
                        )
                        consDoc[
                            field
                        ] = theseDocRefs if multiple else theseDocRefs[0]
            if detailOrder and details:
                for detail in detailOrder:
                    detailSpec = details[detail]
                    detailTable = detailSpec[N.table]
                    linkField = detailSpec[N.linkField]
                    detailTableInfo = DM.get(detailTable, {})
                    detailSort = detailTableInfo[N.sort]
                    detailDocs = list(
                        MONGO[detailTable].find({
                            linkField: document[N._id]
                        }).sort(detailSort)
                    )
                    consDoc.setdefault(N.details, []).append((
                        detail,
                        self._consolidate(
                            detailTable,
                            detailDocs,
                            msgs,
                            consMaterial,
                            consMap,
                        )
                    ))
        return docRefs

# SELECTOR FUNCTIONS

    def _selectDocsRead(self, msgs, table, myDoc, w):
        inspect = w.get(N.inspect, None)
        linkField = w.get(N.linkField, None)
        otherTable = w.get(N.otherTable, None)
        equalField = w.get(N.equalField, None)

        if inspect == N.self:
            otherDocs = [myDoc]
        elif inspect == N.details:
            otherDocs = self.workflowLookup(
                otherTable,
                {linkField: myDoc.get(N._id, None)},
                True,
                msgs,
            )
        elif inspect == N.master:
            otherDocs = self.workflowLookup(
                otherTable,
                {N._id: myDoc.get(linkField, None)},
                True,
                msgs,
            )
        elif inspect == N.siblings:
            selectInfo = {
                linkField: myDoc.get(linkField, None),
                N._id: {
                    '$ne': myDoc.get(N._id, None)
                }
            }
            if equalField is not None:
                myEqualValue = myDoc.get(equalField, None)
                if myEqualValue is None:
                    selectInfo[equalField] = {'$exists': False}
                else:
                    selectInfo[equalField] = myEqualValue
            otherDocs = self.workflowLookup(
                otherTable,
                selectInfo,
                True,
                msgs,
            )
        else:
            # workflow config error
            otherDocs = []

        return otherDocs

    def _selectDocsAdjust(self, msgs, table, myDocs, w):
        inspect = w.get(N.inspect, None)
        linkField = w.get(N.linkField, None)
        otherTable = w.get(N.otherTable, None)

        if inspect == N.self:
            return (table, myDocs)

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
        if workflowResults:
            for (k, v) in attribute.items():
                if k != N.name:
                    workflowResults[k] = v.format(
                        **workflowResults
                    ) if k == N.desc else v
            result[attribute[N.name]] = workflowResults

    def _computeWorkflow(self, msgs, table, myDoc, w, result):
        method = w.get(N.method, None)
        attribute = w.get(N.attribute, None)

        otherDocs = self._selectDocsRead(msgs, table, myDoc, w)

        myWorkflowResults = globals()['_compute_{}'.format(method)](
            self, myDoc, otherDocs, w
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
        allAffectedMap = {}
        for (table, docs) in affecteds:
            for doc in docs:
                allAffectedMap.setdefault(table, {})[doc.get(N._id,
                                                             None)] = doc
        return {
            table: list(docMap.values())
            for (table, docMap) in allAffectedMap.items()
        }

    def _applyAdjustWorkflow(self, msgs, allAffected):
        workflowEntries = []
        for (table, docs) in allAffected.items():
            for doc in docs:
                docId = doc.get(N._id, None)
                workflow = self.readWorkflow(msgs, table, doc, compute=True)
                workflowEntries.append([table, docId, workflow])
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

    def _head(self, table, doc):
        MONGO = self.MONGO
        methodName = '_head_{}'.format(table)
        method = globals().get(methodName, None)
        if method:
            return method(doc)
        tableInfo = DM.get(table, {})
        title = tableInfo[N.title]
        fieldSpecs = tableInfo[N.fieldSpecs]
        fieldSpec = fieldSpecs.get(title, {})
        valType = fieldSpec[N.valType]
        titleValue = doc.get(title, None)
        noTitle = 'no {}'.format(title)
        if type(valType) is str:
            head = titleValue or noTitle
        else:
            relTable = valType[N.relTable]
            relDocs = list(MONGO[relTable].find({N._id: titleValue}))
            head = self._head(relTable, relDocs[0]) if relDocs else noTitle
        return head


# utility functions


def _makeInverse(sourceDict):
    result = {}
    for (k, v) in sourceDict.items():
        result.setdefault(v, []).append(k)
    return result


def _isEmpty(val):
    return not val or (type(val) is list and len([v for v in val if v]) == 0)


def _simpleVal(valType, val):
    result = (
        '[{}](mailto:{})'.format(val, val)
        if valType == N.email else '[{}]({})'.format(val, val)
        if valType == N.url else str(val).split('.', 1)[0]
        if valType == N.datetime else (N.Yes if val else N.No)
        if valType == N.bool else str(val) if valType == N.number else val
    )
    return result.rstrip('\n')


def _head_user(doc):
    name = doc.get(N.name, '')
    org = doc.get(N.org, '')
    if org:
        org = ' ({})'.format(org)
    if name:
        return name + org
    firstName = doc.get(N.firstName, '')
    lastName = doc.get(N.lastName, '')
    if firstName or lastName:
        return '{}{}{}{}'.format(
            firstName, ' ' if firstName and lastName else '', lastName, org
        )
    email = doc.get(N.email, '')
    if email:
        return email + org
    eppn = doc.get(N.eppn, '')
    authority = doc.get(N.authority, '')
    if authority:
        authority = ' - {}'.format(authority)
    if eppn:
        return '{}{}{}'.format(eppn, authority, org)
    return '!unidentified user!'


def _head_country(doc):
    return '{} = {}, {}a DARIAH member'.format(
        doc.get(N.iso, ''),
        doc.get(N.name, ''),
        '' if doc.get(N.isMember, False) else 'not ',
    )


def _head_typeContribution(doc):
    mainType = doc.get(N.mainType, '')
    subType = doc.get(N.subType, '')
    sep = ' / ' if mainType and subType else ''
    return '{}{}{}'.format(
        mainType,
        sep,
        subType,
    )


def _head_score(doc):
    score = doc.get(N.score, NA)
    level = doc.get(N.level, NA)
    description = doc.get(N.description, '')
    return '{} - {}'.format(score, level) if score or level else description
