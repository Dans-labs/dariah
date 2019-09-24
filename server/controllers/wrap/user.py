from controllers.wrap.component import Component
from controllers.html import HtmlElements as H


class User(Component):
  def __init__(self, db, auth):
    super().__init__(db, auth)

  def wrap(self):

    (identityRep, accessRep) = self.auth.credentials()
    login = (
        ''
        if self.authenticated() else
        H.a(
            'log in',
            '/login',
            cls='button small loginout'
        )
    )
    logout = (
        [
            H.a(
                'log out',
                '/logout',
                cls='button small loginout'
            ),
            H.a(
                'log out from DARIAH',
                '/slogout',
                cls='button small loginout',
                title='you need to restart your browser for this to take effect',
            ),
        ]
        if self.authenticated() else
        []
    )
    return H.div(
        [
            H.div(
                identityRep,
                cls='user',
            ),
            H.div(
                accessRep,
                cls='access',
            ),
            login,
            *logout,
        ],
        cls='headline',
    )
