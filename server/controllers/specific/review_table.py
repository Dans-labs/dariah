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
    rId = db.insertItem(table, uid, eppn, **fields)

    criteriaEntries = db.getDetails(
        N.criteriaEntry,
        N.assessment,
        masterOid,
        sortKey=lambda r: r.get(N.seq, 0),
    )
    records = [
        {
            N.seq: critEntry.get(N.seq, 0),
            N.criteria: critEntry.get(N.criteria, None),
            N.criteriaEntry: critEntry.get(N._id, None),
            N.assessment: masterOid,
            N.review: rId,
        }
        for critEntry in criteriaEntries
    ]
    db.insertMany(N.reviewEntry, uid, eppn, records)
    self.adjustWorkflow(contribId, new=False)

    return contribId
