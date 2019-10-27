from controllers.config import Config as C, Names as N
from controllers.details import Details
from controllers.html import HtmlElements as H
from controllers.utils import pick as G, cap1, E
from controllers.workflow import wfStatus, getWf


CT = C.tables
CW = C.web

REVIEW_DECISION = CW.messages[N.reviewDecision]


class AssessmentD(Details):
  def __init__(self, recordObj):
    super().__init__(recordObj)

  def wrap(self):
    uid = self.uid
    eid = self.eid
    table = self.table
    workflow = self.workflow

    thisWf = getWf(workflow, N.assessment, eid=eid)

    reviewers = G(thisWf, N.reviewers, default=set())
    reviewer = G(thisWf, N.reviewer)

    self.fetchDetails(N.criteriaEntry, sortKey=cEntrySort)

    criteriaPart = self.wrapDetail(
        N.criteriaEntry,
        bodyMethod=N.compact,
    )

    self.fetchDetails(
        N.review,
        sortKey=lambda r: G(r, N.dateCreated, default=0),
    )

    byReviewer = {N.expert: [], N.final: []}

    for dest in (N.expert, N.final):
      byReviewer[dest] = self.wrapDetail(
          N.review,
          filterFunc=lambda r: G(r, N.creator) == G(reviewer, dest),
          bodyMethod=N.compact,
          withDetails=True,
          expanded=True,
          withProv=True,
          withN=False,
          inner=False,
      )

    orphanedReviews = self.wrapDetail(
        N.review,
        filterFunc=lambda r: G(r, N.creator) not in reviewers,
        withProv=True,
    )

    reviewPart = (
        H.div(
            [
                H.div(
                    [
                        H.div(
                            cap1(dest),
                            cls="head",
                        ),
                        G(byReviewer, dest),
                    ],
                    cls=f"reviews {dest}",
                )
                for dest in reviewer
            ],
            cls="reviewers",
        )
        +
        (
            H.div(
                [
                    H.div(
                        cap1(N.orphaned) + " " + N.reviews,
                        cls="head",
                    ),
                    orphanedReviews,
                ],
            )
            if orphanedReviews else
            E
        )
    )

    (frozen, hasValid, statusRep) = wfStatus(workflow, N.assessment, eid)

    newKind = (
        None
        if uid is None else
        (
            N.expert
            if G(reviewer, N.expert) == uid else
            N.final
            if G(reviewer, N.final) == uid else
            None
        )
    )

    newPart = (
        E
        if newKind is None else
        H.a(
            f"Start {newKind} review",
            f"""/api/{table}/{eid}/{N.review}/{N.insert}""",
            title=f"""New review""",
            cls=f"large step info",
        )
    )

    return H.div(
        [
            criteriaPart,
            statusRep,
            H.div(REVIEW_DECISION, cls="head"),
            reviewPart,
            newPart,
        ],
    )


def cEntrySort(r):
  return (G(r, N.assessment), G(r, N.seq) or 0)
