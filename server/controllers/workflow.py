from collections import OrderedDict
from controllers.utils import filterModified, now, mongoFields, mongoRows, serverprint, pp
from models.compiled.model import model as M
from models.compiled.names import N

DM = M[N.tables]
DMG = M[N.generic]
WM = M[N.workflow]

NA = 'N/A'

# BASIC RULE COMPUTATION METHODS THAT CAN BE CONFIGURED IN A WORKFLOW


def _compute_hasValue(wf, myRecord, otherRecords, w):
  otherField = w.get(N.otherField, None)
  value = w.get(N.value, None)

  return {
      N.on: True
  } if any(otherRecord.get(otherField, None) == value for otherRecord in otherRecords) else {}


def _compute_hasComplete(wf, myRecord, otherRecords, w):
  emptyFields = w.get(N.emptyFields, None)

  completes = all(
      all(not _isEmpty(otherRecord.get(emptyField, None))
          for emptyField in emptyFields)
      for otherRecord in otherRecords
  )
  return {N.on: True} if completes else {}


def _compute_hasIncomplete(wf, myRecord, otherRecords, w):
  emptyFields = w.get(N.emptyFields, None)

  incompletes = [
      otherRecord.get(N._id)
      for otherRecord in otherRecords
      if any(_isEmpty(otherRecord.get(emptyField, None)) for emptyField in emptyFields)
  ]
  return {N.on: True, 'n': len(incompletes)} if len(incompletes) > 0 else {}


def _compute_hasDifferent(wf, myRecord, otherRecords, w):
  myField = w.get(N.myField, None)
  otherField = w.get(N.otherField, None)

  return {
      N.on: True
  } if any(otherRecord.get(otherField, None) != myRecord.get(myField, None)
           for otherRecord in otherRecords) else {}


def _compute_getValues(wf, myRecord, otherRecords, w):
  otherFields = w.get(N.otherFields, [])

  return {
      N.items: [{
          otherField: otherRecord.get(otherField)
          for otherField in otherFields
          if otherField in otherRecord
      }
          for otherRecord in otherRecords]
  }


def _compute_assessmentScore(wf, myRecord, otherRecords, w):
  MONGO = wf.MONGO
  if not myRecord:
    return {}
  scoreData = list(MONGO[N.score].find({}, {N._id: True, N.criteria: True, N.score: True}))
  scoreMapping = {s[N._id]: s[N.score] for s in scoreData if N.score in s}
  maxScoreByCrit = {}
  for s in scoreData:
    crit = s[N.criteria]
    score = s.get(N.score, 0)
    prevMax = maxScoreByCrit.setdefault(crit, None)
    if prevMax is None or score > prevMax:
      maxScoreByCrit[crit] = score

  resultItems = []
  for otherRecord in otherRecords:
    aId = otherRecord.get(N._id, None)
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
        cd[N.criteria], scoreMapping.get(cd.get(N.score, None), 0), maxScoreByCrit[cd[N.criteria]]
    ) for cd in myCriteriaData]

    allMax = sum(x[2] for x in myCriteriaEntries)
    allN = len(myCriteriaEntries)

    relevantCriteriaEntries = [x for x in myCriteriaEntries if x[1] >= 0]
    relevantMax = sum(x[2] for x in relevantCriteriaEntries)
    relevantScore = sum(x[1] for x in relevantCriteriaEntries)
    relevantN = len(relevantCriteriaEntries)
    overall = 0 if relevantMax == 0 else (round(relevantScore * 100 / relevantMax))
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
      result = list(MONGO[table].find(theRowFilter, fieldFilter).sort(sort))
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
        serverprint('Resetting workflow data...')
        MONGO[N.workflow].delete_many({N.table: {'$ne': N.workflow}})
      affected = []
      for (table, tableInfo) in DM.items():
        if N.workflow not in tableInfo:
          continue

        recs = list(MONGO[table].find())
        serverprint(f'\tworkflow data... {table} ({len(recs)} recs)')
        affected.append('reset workflow on {} ({} items)'.format(table, len(recs)))
        for rec in recs:
          self.readWorkflow(msgs, table, rec, compute=True)
      error = any(msg[N.kind] == N.error for msg in msgs)
      MONGO[N.workflow].insert_one({N.table: N.workflow, 'dateReset': now(), 'affected': affected})
    wfRecords = []
    recs = list(MONGO[N.workflow].find({}).sort([['dateReset', -1]]))
    attributeCount = {}
    n = 0
    for rec in recs:
      if rec.get(N.table, None) == N.workflow:
        wfRecords.append(rec)
      else:
        n += 1
        table = rec.get(N.table, '')
        for attribute in rec.get(N.attributes, {}):
          m = attributeCount.setdefault(attribute, {}).setdefault(table, 0)
          attributeCount[attribute][table] = m + 1
    if init:
      pp.pprint(attributeCount)
      serverprint('Computed {} workflow records'.format(len(recs)))
    return {
        N.good: not error,
        N.msgs: msgs,
        N.data: {
            'resets': wfRecords,
            'stats': attributeCount,
            'total': n
        }
    }

  def readWorkflow(self, msgs, table, myRecord, compute=False):
    myId = myRecord.get(N._id)
    if compute:
      result = {}
      for w in DM.get(table, {}).get(N.workflow, {}).get(N.read, []):
        self._computeWorkflow(msgs, table, myRecord, w, result)
      if myId:
        self._storeWorkflow(table, myId, result)
    else:
      result = self.loadWorkflow(table, myId=myId)
    return result

  def loadWorkflow(self, table, myId=None):
    MONGO = self.MONGO
    selectInfo = {N.table: table} if myId is None else {N.table: table, 'eId': myId}
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
      MONGO[N.workflow].update_one(selectInfo, {'$set': updateInfo}, upsert=True)

  def adjustWorkflow(self, msgs, table, record, adjustedValues):
    result = self._applyAdjustWorkflow(
        msgs,
        self._combineAffected(
            self._getAffected(
                msgs,
                table,
                record,
                adjustedValues,
                w,
            ) for w in DM.get(table, {}).get(N.workflow, {}).get(N.adjust, [])
        ),
    )
    for (table, recId, attributes) in result:
      self._storeWorkflow(table, recId, attributes)

    return result

  def enforceWorkflow(self, workflow, currentRecord, newRecord, action, msgs):
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
              N.kind: N.error,
              N.text: 'Cannot {} because {}'.format(
                  action,
                  attributeMap.get(N.desc),
              ),
          })
        else:
          thisAllow = True
          if actionPrevention == getattr(N, 'except'):
            exceptFields = set(attributeMap.get(getattr(N, 'except'), []))
            for field in set(currentRecord) | set(newRecord):
              if field in exceptFields:
                continue
              if currentRecord.get(field, None) != newRecord.get(field, None):
                thisAllow = False
                msgs.append({
                    N.kind:
                        N.error,
                    N.text:
                        'Cannot {} field {} from {} to {}'.format(
                            action,
                            field,
                            currentRecord.get(field, None),
                            newRecord.get(field, None),
                        ),
                })
          elif actionPrevention:
            for (field, fieldPreventions) in actionPrevention.items():
              if fieldPreventions is True:
                if currentRecord.get(field, None) != newRecord.get(field, None):
                  thisAllow = False
                  msgs.append({
                      N.kind: N.error,
                      N.text: 'Cannot {} field {}}'.format(
                          action,
                          field,
                      ),
                  })
              elif fieldPreventions:
                for when in (N.before, N.after):
                  if when in fieldPreventions:
                    testValue = fieldPreventions[when]
                    useSource = (currentRecord if when == N.before else newRecord)
                    useValue = useSource.get(field, None)
                    if testValue == useValue:
                      thisAllow = False
                      msgs.append({
                          N.kind:
                              N.error,
                          N.text: (
                              'Cannot {} {} from {}'
                              if when == N.before else 'Cannot change {} to{}'
                          ).format(
                              action,
                              field,
                              useValue,
                          ),
                      })
          if not thisAllow:
            allow = False
            msgs.append({
                N.kind: N.error,
                N.text: 'Cannot {} because {}'.format(
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
      weeded.setdefault(table, OrderedDict()).setdefault(eId, {}).update(attributes)
    workflow.clear()
    for (table, tableData) in weeded.items():
      for (eId, attributes) in tableData.items():
        workflow.append((table, eId, attributes))

  def detailInsert(
      self,
      msgs,
      table=None,
      masterRecord=None,
  ):
    good = True
    data = None
    if table == N.assessment:
      detailData = []
      insertValues = {}
      insertValues[N.submitted] = False
      if masterRecord is not None:
        activeItems = self._getActiveItems(msgs)
        criteriaIds = activeItems[N.criteriaIds]
        typeCriteria = activeItems[N.typeCriteria]
        typeIds = activeItems[N.type]
        typeInfo = activeItems[N.typeInfo]
        masterType = masterRecord.get(N.typeContribution, None)
        insertValues[N.assessmentType] = masterType
        if masterType is None:
          good = False
          msgs.append({
              N.kind: N.error,
              N.text: 'Contribution has no type',
          })
        else:
          typeRecord = typeInfo[masterType]
          typeHead = self._head(N.typeContribution, typeRecord)
          if masterType not in typeIds:
            good = False
            msgs.append({
                N.kind: N.error,
                N.text: 'Contribution type {} is a legacy type'.format(typeHead),
            })
          elif masterType not in typeCriteria:
            good = False
            msgs.append({
                N.kind: N.error,
                N.text: 'No criteria defined for contribution type {}'.format(typeHead),
            })
          else:
            criteria = typeCriteria[masterType]
            theseCriteriaIds = [c for c in criteriaIds if c in criteria]
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
      if masterRecord is not None:
        assessmentId = masterRecord.get(N._id, None)
        contribId = masterRecord.get(N.contrib, None)
        masterType = masterRecord.get(N.assessmentType, None)
        insertValues[N.reviewType] = masterType
        insertValues[N.contrib] = contribId
        criteriaEntryRecords = self.workflowLookup(
            N.criteriaEntry,
            {N.assessment: assessmentId},
            {N.seq, N.criteria},
            msgs,
            sort=((N.seq, 1), ),
        )
        for criteriaEntryRecord in criteriaEntryRecords:
          detailData.append({
              N.linkField: N.review,
              N.assessment: assessmentId,
              N.criteria: criteriaEntryRecord.get(N.criteria, None),
              N.criteriaEntry: criteriaEntryRecord.get(N._id, None),
              N.seq: criteriaEntryRecord.get(N.seq, None),
              N.comments: [''],
          })
      data = {
          N.detailData: {
              N.reviewEntry: detailData
          },
          N.insertValues: insertValues,
      }
    return (good, data)

  def findConsolidated(self, table, record, perm):
    if table != N.contrib:
      return []

    consolidation = DMG[N.consolidation]
    consField = consolidation[N.field]
    consTable = '{}_{}'.format(table, consField)

    rId = record[N._id]
    rowFilter = {N.contrib: rId}

    allFields = {N._id, N.consolidated, N.selected, N.content}
    metaFields = allFields - {N.content}

    fieldFilter = (
        mongoFields(allFields)
        if N.update in perm and perm[N.update] else
        mongoFields(metaFields)
    )
    records = list(self.MONGO[consTable].find(
        rowFilter,
        fieldFilter,
    ))
    return records

  def consolidateRecord(
      self,
      table,
      oldRecord,
      newRecord,
      workflow,
      msgs,
  ):
    good = True

    if table != N.contrib:
      return (True, None)

    oldSelected = oldRecord.get(N.selected, None)
    newSelected = newRecord.get(N.selected, None)
    if oldSelected == newSelected or newSelected is None:
      return (True, None)

    (good, consRecords) = self._consolidate(table, [newRecord], msgs)

    consolidation = DMG[N.consolidation]
    consField = consolidation[N.field]
    if good:
      finalRecord = {
          consField: newRecord.get(N.modified, ['?? on ??'])[-1],
          N.selected: newRecord.get(N.selected, None),
          N.content: consRecords[0],
          N.contrib: newRecord[N._id],
      }
      self.MONGO['{}_{}'.format(table, consField)].insert_one(finalRecord)
    return (True, finalRecord)

  def _consolidate(self, table, records, msgs):
    consolidation = DMG[N.consolidation]
    noValue = consolidation[N.noValue]
    MONGO = self.MONGO
    tableInfo = DM.get(table, {})
    fieldOrder = tableInfo[N.fieldOrder]
    fieldSpecs = tableInfo[N.fieldSpecs]
    detailOrder = tableInfo.get(N.detailOrder, None)
    details = tableInfo.get(N.details, None)
    msgs = []
    consRecords = []
    good = True

    for record in records:
      consRecord = []
      for field in fieldOrder:
        fieldSpec = fieldSpecs[field]
        label = fieldSpec[N.label]
        if field not in record:
          consRecord.append((label, (noValue, N.text)))
          continue
        valType = fieldSpec[N.valType]
        multiple = fieldSpec[N.multiple]
        recVal = record[field]
        if field == N.modified:
          recVal = filterModified(recVal or [], tillNow=True)
        if type(valType) is str:
          consValType = valType
          if valType in {N.number, N.datetime}:
            consValType = N.text
            recVal = str(recVal)
          elif valType in {N.bool, N.bool3}:
            consValType = N.text
            recVal = (
                noValue
                if recVal is None else
                'yes'
                if recVal else
                'no'
            )

          recValTyped = (
              [(r, consValType) for r in recVal]
              if multiple else
              (recVal, consValType)
          )
          consRecord.append((label, recValTyped))
        else:
          consValType = N.text
          relTable = valType[N.relTable]
          relTableInfo = DM.get(relTable, {})
          relSort = relTableInfo[N.sort]
          relatedRecords = list(
              MONGO[relTable].find({
                  N._id: {
                      '$in': [_id for _id in (recVal if multiple else [recVal])]
                  }
              }).sort(relSort)
          )
          if len(relatedRecords) == 0:
            noValueTyped = [] if multiple else (noValue, N.text)
            consRecord.append((label, noValueTyped))
          else:
            theseHeads = []
            for relatedRecord in relatedRecords:
              thisHead = self._head(relTable, relatedRecord)
              thisHeadTyped = (
                  thisHead if type(thisHead) is tuple or type(thisHead) is list
                  else
                  (thisHead, N.text)
              )
              theseHeads.append(thisHeadTyped)
            consRecord.append((
                label,
                theseHeads if multiple else theseHeads[0],
            ))
      if detailOrder and details:
        for detail in detailOrder:
          detailSpec = details[detail]
          detailTable = detailSpec[N.table]
          linkField = detailSpec[N.linkField]
          detailTableInfo = DM.get(detailTable, {})
          detailSort = detailTableInfo[N.sort]
          detailRecords = list(MONGO[detailTable].find({linkField: record[N._id]}).sort(detailSort))
          (thisGood, detailConsRecords) = self._consolidate(detailTable, detailRecords, msgs)
          if thisGood:
            consRecord.append((detail, detailConsRecords))
          else:
            good = False

      consRecords.append(consRecord)
    return (good, consRecords)

# SELECTOR FUNCTIONS

  def _selectRecordsRead(self, msgs, table, myRecord, w):
    inspect = w.get(N.inspect, None)
    interField = w.get(N.interField, None)
    interTable = w.get(N.interTable, None)
    linkField = w.get(N.linkField, None)
    otherTable = w.get(N.otherTable, None)
    equalField = w.get(N.equalField, None)

    if inspect == N.self:
      otherRecords = [myRecord]
    elif inspect == N.details:
      otherRecords = self.workflowLookup(
          otherTable,
          {linkField: myRecord.get(N._id, None)},
          True,
          msgs,
      )
    elif inspect == N.granddetails:
      interRecords = self.workflowLookup(
          interTable,
          {interField: myRecord.get(N._id, None)},
          {N._id},
          msgs,
      )
      otherRecords = self.workflowLookup(
          otherTable,
          {linkField: {
              '$in': [rec.get(N._id, None) for rec in interRecords]
          }},
          True,
          msgs,
      )
    elif inspect == N.master:
      otherRecords = self.workflowLookup(
          otherTable,
          {N._id: myRecord.get(linkField, None)},
          True,
          msgs,
      )
    elif inspect == N.grandmaster:
      interRecords = self.workflowLookup(
          interTable,
          {N._id: myRecord.get(interField, None)},
          {linkField},
          msgs,
      )
      otherRecords = self.workflowLookup(
          otherTable,
          {N._id: {
              '$in': [rec.get(linkField, None) for rec in interRecords]
          }},
          True,
          msgs,
      )
    elif inspect == N.siblings:
      selectInfo = {
          linkField: myRecord.get(linkField, None),
          N._id: {'$ne': myRecord.get(N._id, None)},
      }
      if equalField is not None:
        myEqualValue = myRecord.get(equalField, None)
        if myEqualValue is None:
          selectInfo[equalField] = {'$exists': False}
        else:
          selectInfo[equalField] = myEqualValue
      otherRecords = self.workflowLookup(
          otherTable,
          selectInfo,
          True,
          msgs,
      )
    else:
      # workflow config error
      otherRecords = []

    return otherRecords

  def _selectRecordsAdjust(self, msgs, table, myRecords, w):
    inspect = w.get(N.inspect, None)
    interField = w.get(N.interField, None)
    interTable = w.get(N.interTable, None)
    linkField = w.get(N.linkField, None)
    otherTable = w.get(N.otherTable, None)

    if inspect == N.self:
      return (table, myRecords)

    if inspect == N.self:
      otherRecords = myRecords
      otherTable = table
    elif inspect == N.details:
      otherRecords = self.workflowLookup(
          otherTable,
          {linkField: {
              '$in': [rec.get(N._id, None) for rec in myRecords]
          }},
          True,
          msgs,
      )
    elif inspect == N.granddetails:
      interRecords = self.workflowLookup(
          interTable,
          {interField: {
              '$in': [rec.get(N._id, None) for rec in myRecords]
          }},
          {N._id},
          msgs,
      )
      otherRecords = self.workflowLookup(
          otherTable,
          {linkField: {
              '$in': [rec.get(N._id, None) for rec in interRecords]
          }},
          True,
          msgs,
      )
    elif inspect == N.master:
      otherIds = {rec.get(linkField, None) for rec in myRecords}
      otherRecords = self.workflowLookup(
          otherTable,
          {N._id: {
              '$in': list(otherIds)
          }},
          True,
          msgs,
      )
    elif inspect == N.grandmaster:
      interIds = {rec.get(interField, None) for rec in myRecords}
      interRecords = self.workflowLookup(
          interTable,
          {N._id: {
              '$in': list(interIds)
          }},
          {linkField},
          msgs,
      )
      otherIds = {rec.get(linkField, None) for rec in interRecords}
      otherRecords = self.workflowLookup(
          otherTable,
          {N._id: {
              '$in': list(otherIds)
          }},
          True,
          msgs,
      )
    elif inspect == N.siblings:
      masterIds = {rec.get(linkField, None) for rec in myRecords}
      otherRecords = self.workflowLookup(
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
                          '$nin': [rec.get(N._id, None) for rec in myRecords]
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
      otherRecords = []
    return (otherTable, otherRecords)

# HELPERS READ WORKFLOW

  def _applyReadWorkflow(self, workflowResults, attribute, result):
    if workflowResults:
      for (k, v) in attribute.items():
        if k != N.name:
          workflowResults[k] = v.format(**workflowResults) if k == N.desc else v
      result[attribute[N.name]] = workflowResults

  def _computeWorkflow(self, msgs, table, myRecord, w, result):
    method = w.get(N.method, None)
    attribute = w.get(N.attribute, None)

    otherRecords = self._selectRecordsRead(msgs, table, myRecord, w)

    myWorkflowResults = globals()['_compute_{}'.format(method)](self, myRecord, otherRecords, w)
    self._applyReadWorkflow(myWorkflowResults, attribute, result)

# HELPERS ADJUST WORKFLOW

  def _getAffected(self, msgs, table, record, adjustedValues, w):
    inspect = w.get(N.inspect, None)
    linkField = w.get(N.linkField, None)
    triggerFields = w.get(N.triggerFields, None)

    triggers = set(triggerFields)
    if inspect == N.master:
      triggers.add(linkField)
    if any((record.get(triggerField, None) != adjustedValues.get(triggerField, None))
           for triggerField in triggers):
      myRecords = [rec for rec in (record, adjustedValues)]
      return self._selectRecordsAdjust(msgs, table, myRecords, w)
    return (None, [])

  def _combineAffected(self, affecteds):
    allAffectedMap = {}
    for (table, recs) in affecteds:
      for rec in recs:
        allAffectedMap.setdefault(table, {})[rec.get(N._id, None)] = rec
    return {table: list(recMap.values()) for (table, recMap) in allAffectedMap.items()}

  def _applyAdjustWorkflow(self, msgs, allAffected):
    workflowEntries = []
    for (table, recs) in allAffected.items():
      for rec in recs:
        recId = rec.get(N._id, None)
        workflow = self.readWorkflow(msgs, table, rec, compute=True)
        workflowEntries.append([table, recId, workflow])
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
    typeInfo = {rec[N._id]: rec for rec in types}

    packages = self.workflowLookup(
        N.package,
        {
            N.startDate: {
                '$lte': present
            },
            N.endDate: {
                '$gte': present
            }
        },
        {N.typeContribution},
        msgs,
    )
    packageIds = [rec[N._id] for rec in packages]
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
    criteriaIds = [rec[N._id] for rec in criteria]
    for rec in criteria:
      criteriaEntities[str(rec[N._id])] = rec
      tps = rec.get(N.typeContribution, [])
      for tp in tps:
        typeCriteria.setdefault(tp, set()).add(rec[N._id])
    typeIds = {tp for rec in packages for tp in rec.get(N.typeContribution, [])}
    result = {
        N.package: set(packageIds),
        N.type: typeIds,
        N.typeInfo: typeInfo,
        N.criteriaIds: criteriaIds,
        N.criteriaEntities: criteriaEntities,
        N.typeCriteria: typeCriteria,
    }
    return result

  def _head(self, table, rec):
    MONGO = self.MONGO
    methodName = '_head_{}'.format(table)
    method = globals().get(methodName, None)
    if method:
      return method(rec)
    tableInfo = DM.get(table, {})
    title = tableInfo[N.title]
    fieldSpecs = tableInfo[N.fieldSpecs]
    fieldSpec = fieldSpecs.get(title, {})
    valType = fieldSpec[N.valType]
    titleValue = rec.get(title, None)
    noTitle = 'no {}'.format(title)
    if type(valType) is str:
      head = titleValue or noTitle
    else:
      relTable = valType[N.relTable]
      relRecords = list(MONGO[relTable].find({N._id: titleValue}))
      head = self._head(relTable, relRecords[0]) if relRecords else noTitle
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
      '[{}](mailto:{})'.format(val, val) if valType == N.email else '[{}]({})'.format(val, val)
      if valType == N.url else str(val).split('.', 1)[0] if valType == N.datetime else
      (N.Yes if val else N.No) if valType == N.bool else str(val) if valType == N.number else val
  )
  return result.rstrip('\n')


def _head_user(rec):
  name = rec.get(N.name, '')
  org = rec.get(N.org, '')
  if org:
    org = ' ({})'.format(org)
  if name:
    return name + org
  firstName = rec.get(N.firstName, '')
  lastName = rec.get(N.lastName, '')
  if firstName or lastName:
    return '{}{}{}{}'.format(firstName, ' ' if firstName and lastName else '', lastName, org)
  email = rec.get(N.email, '')
  if email:
    return email + org
  eppn = rec.get(N.eppn, '')
  authority = rec.get(N.authority, '')
  if authority:
    authority = ' - {}'.format(authority)
  if eppn:
    return '{}{}{}'.format(eppn, authority, org)
  return '!unidentified user!'


def _head_country(rec):
  return '{} = {}, {}a DARIAH member'.format(
      rec.get(N.iso, ''),
      rec.get(N.name, ''),
      '' if rec.get(N.isMember, False) else 'not ',
  )


def _head_typeContribution(rec):
  mainType = rec.get(N.mainType, '')
  subType = rec.get(N.subType, '')
  sep = ' / ' if mainType and subType else ''
  return '{}{}{}'.format(
      mainType,
      sep,
      subType,
  )


def _head_criteria(rec):
  fieldSpecs = DM[N.criteria][N.fieldSpecs]
  criterionLabel = fieldSpecs[N.criterion][N.label]
  remarksLabel = fieldSpecs[N.remarks][N.label]
  criterion = rec.get(N.criterion, NA)
  remarks = rec.get(N.remarks, [])
  remarksTyped = [(r, N.text) for r in remarks]
  return [
      (criterionLabel, (criterion, N.text)),
      (remarksLabel, remarksTyped),
  ]


def _head_score(rec):
  score = rec.get(N.score, NA)
  level = rec.get(N.level, NA)
  description = rec.get(N.description, '')
  return '{} - {}'.format(score, level) if score or level else description
