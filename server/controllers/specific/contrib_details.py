from controllers.config import Names as N
from controllers.details import Details
from controllers.html import HtmlElements as H
from controllers.utils import pick as G
from controllers.workflow import wfStatus


class ContribD(Details):
  def __init__(self, recordObj):
    super().__init__(recordObj)

  def wrap(self):
    uid = self.uid
    eid = self.eid
    workflow = self.workflow

    self.fetchDetails(
        N.assessment,
        sortKey=lambda r: G(r, N.dateCreated, default=0),
    )

    (frozen, statusRep) = wfStatus(workflow, N.contrib, eid, uid)

    return H.div(
        [
            statusRep,
            self.wrapDetail(N.assessment),
        ],
    )
