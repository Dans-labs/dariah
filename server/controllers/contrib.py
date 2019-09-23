from controllers.utils import dbjson, titleSort
from controllers.html import HtmlElements as H
from controllers.perm import permRecord


class Contrib(object):
  def __init__(self, MONGO, values):
    self.MONGO = MONGO
    self.values = values

  def list(self, auth):
    U = auth.userInfo
    MONGO = self.MONGO
    records = titleSort(MONGO['contrib'].find())
    self.U = U

    return H.div(
        (
            H.details(
                record.get('title', None) or '??',
                H.div('...', fetchurl=f'/contrib/item/{record["_id"]}'),
            )
            for record in records
        )
    )

  def item(self, auth, oid, asJson=False):
    U = auth.userInfo
    MONGO = self.MONGO
    self.U = U

    records = list(MONGO['contrib'].find({'_id': oid}))
    record = (
        records[0]
        if len(records) else
        {}
    )
    return dbjson(record) if asJson else self.wrap(record)

  def wrap(self, record):
    U = self.U
    V = self.values
    P = permRecord(
        U,
        record,
        country=record.get('country', None),
    )
    return (
        H.div(
            [
                V.wrapYear(U, P, record),
                V.wrapCountry(U, P, record),
                V.wrapSelected(U, P, record),
                V.wrapVccs(U, P, record),
                V.wrapTypeContribution(U, P, record),
                V.wrapDescription(U, P, record),
                V.wrapCostTotal(U, P, record),
                V.wrapCostDescription(U, P, record),
                V.wrapContactPersonName(U, P, record),
                V.wrapContactPersonEmail(U, P, record, require=dict(read='auth')),
                V.wrapUrlContribution(U, P, record),
                V.wrapUrlAcademic(U, P, record),
                V.wrapTadirahObjects(U, P, record),
                V.wrapTadirahActivities(U, P, record),
                V.wrapTadirahTechniques(U, P, record),
                V.wrapDisciplines(U, P, record),
                V.wrapKeywords(U, P, record),
                H.details(
                    'Provenance',
                    H.div(
                        [
                            V.wrapAuthor(U, P, record),
                            V.wrapEditors(U, P, record),
                            V.wrapDateCreated(U, P, record),
                            V.wrapModified(U, P, record),
                        ]
                    ),
                ),
            ],
            cls='record',
        )
    )
