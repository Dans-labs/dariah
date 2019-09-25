from controllers.wrap.component import Component
from controllers.html import HtmlElements as H


class Sidebar(Component):
  def __init__(self, db, auth, path):
    super().__init__(db, auth, path=path)
    self.entries = []

  def addEntry(self, label, path):
    entries = self.entries
    active = path == self.path

    navClass = 'button small nav' + (' active' if active else '')
    rep = H.a(label, path, cls=navClass)
    entries.append(rep)

  def wrap(self):
    country = self.country
    self.addEntry('Home', '/')

    if self.authenticated():
      self.addEntry('My contributions', '/contrib/mylist')

    if country:
      iso = country.get('iso', '??')
      self.addEntry(f'Contributions from {iso}', '/contrib/ourlist')

    self.addEntry('All contributions', '/contrib/list')

    return '\n'.join(self.entries)
