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
When users log in, there details will be stored in the user table.
Most details are provided directly by the DARIAH identity provider upon login:

user field in this app | attribute provided by DARIAH | comments
---|---|---
`eppn` | `eppn` | a string by which the user is identified in the DARIAH context
`email` | `mail` | the email address according to the DARIAH identity provider
`firstName` | `givenName` |
`lastName` | `sn` |
`name` | `cn` | common name, probably just `firstName lastName`
`org` | `o` | organization to which the user is affiliated
`membership` | `isMemberOf` | a semicolon separated string of groups within the DARIAH organization to which the user belongs, e.g. `lr_DARIAH-User`, `humanities-at-scale-contributors`, `dariah-eu-contributors`
`rel` | `affiliation` | the type of relation the user has with DARIAH, such as `member@dariah.eu`

We do not use `unscoped-affiliation`, which is the `affiliation` without the `@dariah.eu` part.

This app adds some fields to a user record:

user field | comments
---|---
authority | the basis on which the identity of the user has been established. See the values below.


Authority values

authority | comments
---|---
 | if absent, the user has never been authenticated. Used for people that have been assigned a role in the system, but have not yet logged in.
DARIAH | the user has been logged in by the DARIAH identity provider
legacy | the user has been imported from the FileMaker legacy data. This kind of user cannot log in.
local  | the user has logged in on the development system. This kind of user should not be present in the production system!


