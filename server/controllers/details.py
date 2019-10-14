from controllers.config import Config as C, Names as N
from controllers.utils import E
from controllers.html import HtmlElements as H


CT = C.tables
CW = C.web

DETAILS = CT.details
CONSTRAINED = CT.constrained

QQ = CW.unknown[N.generic]
MESSAGES = CW.messages


class Details(object):
  inheritProps = (
      N.control, N.db, N.auth, N.types,
      'uid', 'eppn',
      'Table', 'table',
      'record', 'eid',
      'fields', 'prov',
      'doDetails',
  )

  def __init__(self, recordObj):
    doDetails = recordObj.doDetails

    if not doDetails:
      self.doDetails = doDetails
      return

    for prop in Details.inheritProps:
      setattr(self, prop, getattr(recordObj, prop, None))

    table = self.table

    self.details = {}

    for dtable in DETAILS.get(table, []):
      self.fetchDetails(dtable)

  def fetchDetails(self, dtable, masterTable=None, eids=None):
    control = self.control
    db = self.db
    Table = self.Table
    table = self.table
    eid = self.eid

    dtableObj = Table(control, dtable)
    drecords = db.getDetails(
        dtable,
        masterTable or table,
        eids or eid,
    )
    self.details[dtable] = (
        dtableObj,
        tuple(drecords),
    )

  def wrap(self):
    if not self.doDetails:
      return E

    details = self.details

    dreps = []
    for (dtable, (dtableObj, drecords)) in details.items():
      nRecords = len(drecords)
      (itemSingular, itemPlural) = dtableObj.itemLabels
      itemLabel = itemSingular if nRecords == 1 else itemPlural

      nRep = H.div(f"""{nRecords} {itemLabel}""", cls="stats")
      dreps.append(
          H.div(
              [nRep]
              +
              [
                  dtableObj.record(record=drecord).wrap(collapsed=True)
                  for drecord in drecords
              ],
              cls="record-details",
          )
      )
    return E.join(dreps)
