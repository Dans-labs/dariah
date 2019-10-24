from controllers.config import Config as C, Names as N
from controllers.html import HtmlElements as H
from controllers.utils import pick as G, cap1, E
from controllers.record import Record

CW = C.web

MESSAGES = CW.messages


class ReviewEntryR(Record):
  def __init__(self, *args, **kwargs):
    super().__init__(*args, **kwargs)

    record = self.record
    workflow = self.workflow

    reviewer = G(workflow, N.reviewer)
    reviewerE = G(reviewer, N.expert)
    reviewerF = G(reviewer, N.final)

    creatorId = G(record, N.creator)
    kind = (
        N.expert
        if creatorId == reviewerE else
        N.final
        if creatorId == reviewerF else
        cap1(N.orphaned)
    )
    self.kind = kind
    self.creatorId = creatorId

  def title(self):
    kind = self.kind
    uid = self.uid
    creatorId = self.creatorId

    kindRep = f""" ({kind})"""
    youRep = f""" ({N.you})""" if creatorId == uid else E
    lastModified = self.field(N.modified).value[-1]

    return H.span(
        f"""{lastModified}{kindRep}{youRep}""",
        cls=f"rentrytitle",
    )

  def bodyCompact(self, **kwargs):
    perm = self.perm

    theTitle = self.title()
    comments = H.div(
        self.field(N.comments).wrap(withLabel=False, asEdit=G(perm, N.isEdit)),
    )

    return H.div(
        [
            theTitle,
            comments,
        ],
        cls=f"reviewentry"
    )
