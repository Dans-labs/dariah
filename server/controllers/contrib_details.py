from controllers.config import Names as N
from controllers.details import Details


class ContribD(Details):
  def __init__(self, recordObj):
    super().__init__(recordObj)

  def wrap(self):
    self.fetchDetails(
        N.assessment,
        sortKey=lambda r: r.get(N.dateCreated, 0),
    )

    return self.wrapDetail(N.assessment)
