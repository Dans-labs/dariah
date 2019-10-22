from controllers.config import Config as C, Names as N
from controllers.html import HtmlElements as H
from controllers.utils import E

CW = C.web


URLS = CW.urls
LOGIN = URLS[N.login]
LOGOUT = URLS[N.logout]
SLOGOUT = URLS[N.slogout]
LOGO = URLS[N.logo]


class Topbar(object):
  def __init__(self, control):
    self.control = control

  def wrap(self):
    control = self.control
    auth = control.auth

    (identityRep, accessRep) = auth.credentials()
    login = (
        E
        if auth.authenticated() else
        H.a(
            LOGIN[N.text],
            LOGIN[N.url],
            cls="button small loginout"
        )
    )
    logout = (
        [
            H.a(
                LOGOUT[N.text],
                LOGOUT[N.url],
                cls="button small loginout"
            ),
            H.a(
                SLOGOUT[N.text],
                SLOGOUT[N.url],
                cls="button small loginout",
                title=SLOGOUT[N.title],
            ),
        ]
        if auth.authenticated() else
        []
    )
    return H.div(
        [
            H.div(
                identityRep,
                cls="user",
            ),
            H.div(
                accessRep,
                cls="access",
            ),
            login,
            *logout,
            H.img(
                LOGO[N.src],
                href=LOGO[N.url],
                target=N._blank,
                title=LOGO[N.text],
                imgAtts=dict(height=LOGO[N.height]),
                id="logo",
            )
        ],
        cls="headline",
    )
