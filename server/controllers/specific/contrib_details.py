from controllers.config import Names as N
from controllers.details import Details
from controllers.html import HtmlElements as H
from controllers.utils import pick as G, E
from controllers.workflow import wfStatus


class ContribD(Details):
  def __init__(self, recordObj):
    super().__init__(recordObj)

  def wrap(self):
    eid = self.eid
    table = self.table
    workflow = self.workflow

    self.fetchDetails(
        N.assessment,
        sortKey=lambda r: G(r, N.dateCreated, default=0),
    )

    (frozen, hasValid, statusRep) = wfStatus(workflow, N.contrib, eid)

    newPart = (
        E
        if hasValid else
        H.a(
            "New assessment",
            f"""/api/{table}/{eid}/{N.assessment}/{N.insert}""",
            title=f"""New assessment""",
            cls=f"large step info",
        )
    )

    return H.div(
        [
            statusRep,
            self.wrapDetail(N.assessment),
            newPart,
        ],
    )
