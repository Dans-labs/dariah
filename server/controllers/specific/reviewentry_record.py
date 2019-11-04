from controllers.config import Config as C, Names as N
from controllers.html import HtmlElements as H
from controllers.utils import pick as G, E, DOT
from controllers.record import Record

CW = C.web

MESSAGES = CW.messages

ORPHAN = H.icon(CW.unknown[N.reviewKind])


class ReviewEntryR(Record):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

    def title(self):
        kind = self.kind
        uid = self.uid
        record = self.record

        creatorId = G(record, N.creator)

        youRep = f""" ({N.you})""" if creatorId == uid else E
        lastModified = self.field(N.modified).value[-1].rsplit(DOT, maxsplit=1)[0]
        kindRep = f""" ({kind or ORPHAN})"""

        return H.span(f"""{lastModified}{kindRep}{youRep}""", cls=f"rentrytitle")

    def bodyCompact(self, **kwargs):
        perm = self.perm

        theTitle = self.title()
        comments = H.div(
            self.field(N.comments).wrap(withLabel=False, asEdit=G(perm, N.isEdit)),
        )

        return H.div([theTitle, comments], cls=f"reviewentry")
