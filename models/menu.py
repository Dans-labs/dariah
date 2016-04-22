# -*- coding: utf-8 -*-

response.logo = A(IMG(_src=URL('static', 'images/inkind_logo_small.png')),
                  _class="brand",
                  _href="https://dariah.eu/activities/humanities-at-scale.html",
                  _target="_blank",
                  _style="margin-bottom: -2em;",
                  )

response.title = request.application.replace('_',' ').title()
response.subtitle = ''

## read more at http://dev.w3.org/html5/markup/meta.name.html
response.meta.author = 'Dirk Roorda <dirk.roorda@dans.knaw.nl>'
response.meta.description = 'DARIAH-HaS Contribution Assessment'
response.meta.keywords = 'Digital Humanities, Quality Assessment, Research Infrastructures'
response.meta.generator = 'DARIAH Contribution Registry'

## your http://google.com/analytics id
response.google_analytics_id = None

#########################################################################
## this is the main application menu add/remove items as required
#########################################################################

response.menu = [
    (T('DARIAH-contrib'), False, URL('default', 'index'), [])
]

if "auth" in locals(): auth.wikimenu() 
