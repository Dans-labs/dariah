# Duck Me

This powers the login widget, top right on the screen, realized by the component
[Login](../client/src/js/app/object/Login.jsx).

The login procedure caters for shibboleth logins.
Upon successful login, the server sends information about the currently logged in user
to the client.

![diag](design/design.003.jpeg)

The actual login/logout actions take place at the server, by visiting `/login`,
`/logout` or `/slogout`.
The server delegates the actual authentication to the
[DARIAH Identity provider](https://wiki.de.dariah.eu/display/publicde/DARIAH+AAI+Documentation).

Currently, `/logout` performs a logout from this app, but not from the DARIAH Identity Provider.
To do the latter, one has to go to `/slogout` and close the browser.

The main task of Login is to fetch the current authentication status:
is there an authenticated user, and if so, what is his/her name?

**NB:** Because of the federated login, the username and password are not entered
in any form in this app. So the client does not know who the user is, except by asking the server.
The current user can be retrieved by `/api/db/who/ami`.

The duck that is responsible for the notification system is
[me.js](../client/src/js/app/dux/me.js).

## Actions

Only one action: fetch data about *me*, the logged in user.
It is actually handled by 
[server.js](../client/src/js/app/dux/server.js).

# Reducer
Transforms the state in response to dispatched ticket, notably the `me` slice.
It just contains the known attributes of a single user, the one that is logged in.

# Selectors

## getMe()

Plainly hand over the attributes of the currently logged in user.
At the moment only the
[Login](../client/src/js/app/object/Login.jsx)
component is interested in it.

# Helpers

No helpers.

---
[Previous - Notify](Notify.md) -
[Up](Home.md) -
[Next - Components](Components.md)

---
[repo](https://github.com/Dans-labs/dariah) -
[website](https://dariah-beta.dans.knaw.nl/)

