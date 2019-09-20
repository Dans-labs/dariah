from controllers.utils import dbjson, titleSort
from controllers.html import HtmlElements as H


class Contrib(object):
  def __init__(self, MONGO, values):
    self.MONGO = MONGO
    self.values = values

  def list(self):
    MONGO = self.MONGO
    records = titleSort(MONGO['contrib'].find())

    return H.div(
        (
            H.details(
                record.get('title', None) or '??',
                H.div('...', fetchurl=f'/contrib/item/{record["_id"]}'),
            )
            for record in records
        )
    )

  def item(self, oid, asJson=False):
    MONGO = self.MONGO
    records = list(MONGO['contrib'].find({'_id': oid}))
    record = (
        records[0]
        if len(records) else
        {}
    )
    return dbjson(record) if asJson else self.wrap(record)

  def wrap(self, record):
    V = self.values
    return (
        H.div(
            [
                V.wrapYear(record),
                V.wrapCountry(record),
                V.wrapSelected(record),
                V.wrapVccs(record),
                V.wrapTypeContribution(record),
                V.wrapDescription(record),
                V.wrapCostTotal(record),
                V.wrapCostDescription(record),
                V.wrapContactPersonName(record),
                V.wrapContactPersonEmail(record),
                V.wrapUrlContribution(record),
                V.wrapUrlAcademic(record),
                V.wrapTadirahObjects(record),
                V.wrapTadirahActivities(record),
                V.wrapTadirahTechniques(record),
                V.wrapDisciplines(record),
                V.wrapKeywords(record),
            ],
            cls='record',
        )
    )
