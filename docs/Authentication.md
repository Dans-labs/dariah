---
title: Authentication
---

![diag](design/design.003.jpeg)

The login/logout actions take place at the server after visiting `/login`,
`/logout` or `/slogout`.

The server performs shibboleth authentication, with credentials coming from the 
[DARIAH Identity provider](https://wiki.de.dariah.eu/display/publicde/DARIAH+AAI+Documentation).

Currently, `/logout` performs a logout from this app, but not from the DARIAH Identity Provider.
To do the latter, one has to go to `/slogout` and close the browser.

User records
-------------
