from controllers.config import Names as N
from controllers.details import Details
from controllers.html import HtmlElements as H
from controllers.utils import pick as G


class ContribD(Details):
  def __init__(self, recordObj):
    super().__init__(recordObj)

  def wrap(self):
    eid = self.eid
    table = self.table
    workflow = self.workflow
    selected = G(workflow, N.selected)
    assessmentId = G(workflow, N.assessmentId)
    score = G(workflow, N.score)
    complete = G(workflow, N.complete)
    reviewId = G(workflow, N.reviewFId)
    decision = G(workflow, N.decision)
    dateDecided = G(workflow, N.dateDecided)

    self.fetchDetails(
        N.assessment,
        sortKey=lambda r: G(r, N.dateCreated, default=0),
    )

    itemKey = f"""{table}/{eid}"""
    rButton = H.iconr(itemKey, "#workflow", msg=N.status)

    selectedCls = "good" if selected else "info" if selected is None else "warning"
    selectedPart = H.span(
        (
            "Selected by National Coordinator"
            if selected else
            "No selection decision by National Coordinator"
            if selected is None else
            "Rejected by National Coordinator"
        ),
        cls=f"large status {selectedCls}",
    )
    defAssessmentPart = H.span(
        "No valid assessment",
        cls="info",
    )
    if assessmentId:
        overall = G(score, N.overall)
        fullScore = H.span(
            f"Score {overall}%",
            title="overall score of this contribution",
            cls="ass-score",
        )
        completeCls = "good" if complete else "warning"
        completePart = H.span(
            (
                "Self-assessment completed"
                if complete else
                "Self-assessment not yet complete",
            ),
            cls=f"large status {completeCls}",
        )
        reviewPart = H.span(
            "No valid final review",
            cls="info",
        )
        if reviewId:
          reviewPart = H.span(
              [
                  H.span(
                      decision,
                      cls="status large good"
                  ),
                  H.span(
                      f"on {dateDecided}",
                      cls="status medium info",
                  ),
              ],
          )
        defAssessmentPart = H.div(
            [
                fullScore,
                completePart,
                reviewPart,
            ],
            cls="workflow",
        )

    newPart = H.a(
        "New assessment",
        f"""/api/{table}/{eid}/{N.assessment}/{N.insert}""",
        title=f"""New assessment""",
        cls=f"large step info",
    )
    workflowPart1 = H.div(
        [
            rButton,
            selectedPart,
            defAssessmentPart,
        ],
        cls="workflow",
    )
    workflowPart2 = H.div(
        [
            rButton,
            newPart,
        ],
        cls="workflow",
    )

    return H.div(
        [
            workflowPart1,
            self.wrapDetail(N.assessment),
            workflowPart2,
        ],
    )
