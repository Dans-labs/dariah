from controllers.config import Names as N
from controllers.details import Details
from controllers.html import HtmlElements as H


class ContribD(Details):
  def __init__(self, recordObj):
    super().__init__(recordObj)

  def wrap(self):
    eid = self.eid
    table = self.table

    self.fetchDetails(
        N.assessment,
        sortKey=lambda r: r.get(N.dateCreated, 0),
    )

    itemKey = f"""{table}/{eid}"""
    rButton = H.iconr(itemKey, "#workflow", msg=N.status)

    newPart = H.a(
        "New assessment",
        f"""/api/{table}/{eid}/{N.assessment}/{N.insert}""",
        title=f"""New assessment""",
        cls=f"large step info",
    )
    workflowPart = H.div(
        [
            rButton,
            newPart,
        ],
        cls="workflow",
    )

    return H.div(
        [
            self.wrapDetail(N.assessment),
            workflowPart,
        ],
    )
