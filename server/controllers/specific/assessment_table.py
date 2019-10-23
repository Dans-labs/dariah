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

    fields = {
        masterTable: masterOid,
        N.assessmentType: workflow.contribType,
        N.title: f"assessment of {workflow.contribTitle}",
    }
    db.insertItem(table, uid, eppn, **fields)
    self.adjustWorkflow(masterOid, new=False)

    return masterId
