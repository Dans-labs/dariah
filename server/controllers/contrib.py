import collections


from controllers.config import Names as N
from controllers.details import Details
from controllers.utils import E
from controllers.html import HtmlElements as H
from controllers.assessment import Assessment


class Contrib(Details):
  def __init__(self, recordObj, *args, **kwargs):
    super().__init__(recordObj, *args, **kwargs)
    self.getAllDetails()

  def wrap(self):
    if not self.doDetails:
      return E

    details = self.details
    (aObj, aRecords) = details.get(N.assessment, (None, []))

    assessmentRep = E.join(
        Assessment(self, aObj, record).wrap()
        for record in sorted(
            aRecords,
            key=lambda r: r.get(N.dateCreated, 0),
        )
    )
    return H.details(
        H.span(
            [
                """Self assessment""",
                self.nRep[N.assessment],
            ],
            cls="assessment-head",
        ),
        assessmentRep,
        cls="assessment"
    )

  def getAllDetails(self):
    details = self.details

    assessmentIds = (
        {
            drecord[N._id]
            for drecord in details[N.assessment][1]
        }
        if N.assessment in details else
        set()
    )

    if assessmentIds:
      for dtable in [N.criteriaEntry, N.reviewEntry]:
        self.fetchDetails(dtable, masterTable=N.assessment, eids=assessmentIds)

    n = collections.defaultdict(lambda: 0)
    nRep = collections.defaultdict(lambda: E)
    dobj = collections.defaultdict(lambda: None)
    drecords = collections.defaultdict(lambda: [])
    for (dtable, (dtableObj, drecords)) in details.items():
      nRecords = len(drecords)
      (itemSingular, itemPlural) = dtableObj.itemLabels
      itemLabel = itemSingular if nRecords == 1 else itemPlural
      nRep = H.span(f"""{nRecords} {itemLabel}""", cls="stats")
      n[dtable] = nRecords
      nRep[dtable] = nRep
      dobj[dtable] = dtableObj
      drecords[dtable] = drecords

    self.n = n
    self.nRep = nRep
    self.dobj = dobj
    self.drecords = drecords

    self.assessmentRecords = (
        sorted(
            drecords,
            key=lambda r: r.get(N.dateCreated, 0),
        )
        if assessmentIds else
        []
    )
