from bson.objectid import ObjectId

from controllers.config import Names as N
from controllers.table import Table
from controllers.workflow import WorkflowItem


class ReviewT(Table):
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
    masterRecord = control.getItem(N.assessment, masterOid)
    contribId = masterRecord.get(N.contrib, None)
    if not contribId:
      return None

    workflow = WorkflowItem(control, contribId)

    fields = {
        N.contrib: workflow._id,
        masterTable: masterOid,
        N.reviewType: workflow.contribType,
        N.title: f"review of {workflow.assessmentTitle}",
    }
    print('XXX', masterTable, fields)
    db.insertItem(table, uid, eppn, **fields)
    self.adjustWorkflow(contribId, new=False)

    return contribId
