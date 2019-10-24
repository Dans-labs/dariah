from bson.objectid import ObjectId

from controllers.config import Names as N
from controllers.table import Table
from controllers.workflow import WorkflowItem


class AssessmentT(Table):
  def __init__(self, *args, **kwargs):
    super().__init__(*args, **kwargs)

  def insert(self, masterTable=None, masterId=None):
    mayInsert = self.mayInsert
    if not mayInsert:
      return None

    if not masterTable or not masterId:
      return None

    control = self.control
    db = control.db
    uid = self.uid
    eppn = self.eppn
    table = self.table

    masterOid = ObjectId(masterId)
    workflow = WorkflowItem(control, masterOid)
    contribType = workflow.contribType

    fields = {
        masterTable: masterOid,
        N.assessmentType: contribType,
        N.title: f"assessment of {workflow.contribTitle}",
    }
    aId = db.insertItem(table, uid, eppn, **fields)

    criteria = db.typeCriteria.get(contribType, [])
    records = [
        {
            N.seq: seq,
            N.criteria: crit,
            N.assessment: aId,
        }
        for (seq, crit) in enumerate(criteria)
    ]
    db.insertMany(N.criteriaEntry, uid, eppn, records)
    self.adjustWorkflow(masterOid, new=False)

    return masterId
