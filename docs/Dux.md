# Dux (Appliances)

Dux are appliances within the app, i.e. sets of components that all work
with the same slice of the state.

We have organized dux as follows:

* one file that contains its *actions*, *reducer*, *selectors* and *helpers*.
* a number of React components that make use of these by importing them.

This app contains the following dux:

* [Filter](#filter)
* [Tables](#tables)
* [Me](#me)
* [Doc](#doc)
* [Notify](#notify)
* [Win](#win)
* [Alter](#alter)

# Filter

This functionality is responsible for
displaying the list of items in the right column, but
only those that have passed all the filters, which are displayed in the
left column.

![diag](design/design.002.jpeg)

This is a complex system of components, where data is fetched from the server,
and user events are registered at the filter widgets.
On top of that, there is a visualization in the form of a map of European countries
with markers having a radius indicative of the number of filtered items
by that country.

The duck that is responsible for the filter state is
[filter.js](../client/src/js/app/dux/filter.js).

## Actions

Creators of the tickets that are dispatched in response to user interactions with the
filter components, such as 
[FullText](../client/src/js/app/state/FullText.jsx)
and
[Facet](../client/src/js/app/state/FullText.jsx).

## Reducer
Transforms the state in response to dispatched tickets, notably the `filterSettings` slice.
Well, it is a bit more complicated, because every table has its own filterSettings.

## Selectors
Filter information is being translated from the state to props that can be consumed by components.
All the actual filter work is done here, but because it is rather complex, we have outsourced it to the *helpers*.

### getFilterSetting()

Reads the current settings of a filter and injects it as `filterSettings` into
the props of the receiving components, which are typically the filter widgets that receive user interaction:
[FullText](../client/src/js/app/state/FullText.jsx)
[Facet](../client/src/js/app/state/Facet.jsx), and also
[CheckboxI](../client/src/js/app/object/CheckboxI.jsx),
[EUMap](../client/src/js/app/object/EUMap.jsx).

### getFieldValues()

Reads a table of items (provided it has been downloaded from the server) and produces facet information.
The items are supposed to contain title fields and at least those fields that are subject to filtering.

For every field that is chosen for faceted browsing, the list of values will be compiled.

The result is used by 
[ByValue](../client/src/js/app/state/ByValue.jsx).
This component is responsible for all the facets of a field.

It is useful to store the results of this compilation, but where?
We do not store it in the state, because it is derived data, and we adhere to the principle that the
state is a
[normalized single source of truth](http://redux.js.org/docs/recipes/reducers/NormalizingStateShape.html).
Selectors are invoked upon each rendering, but in this case we do not want to redo the compilation all the time.
The solution is to use a
[memoized function](http://redux.js.org/docs/recipes/ComputingDerivedData.html).
I have created my own memoizer, 
[memoBind()](../client/src/js/app/dux/helpers.js) that stores its latest computed result, to be used
again if the function in question is called with the same arguments.
You can tweak it a little, by specifying which subset of arguments are used to decide whether to compute or to fetch
from the memo cache.

Here you see that the helper function `compileFiltering` is used under memoization.
So, all those instances of `ByValue` quickly find their facet values upon each rendering.
 
### getFiltersApplied()

Applies the filters, according to the current filter settings.
Applying means: determine the subset of filtered items (`filteredData`), and provide statistics for the facets.

Every faceted field displays as total the amount of items filtered by all *other* filters (`filteredAmountOthers`).
For each of its facets, it displays how many items of this relative total correspond to that facet (`amounts`).

So this function delivers exactly that: `filteredData`, `filteredAmountOthers`, `amounts`.

It is also a costly function, but it does neet to be invoked upon each rendering caused by a click or a key press.

## Helpers

### compileFiltering()

Computes facet values from the records of a table.

### initFiltering()

Computes initial filter settings, after `compileFiltering`.

### computeFiltering()

Applies the filters.

# Tables

# Me

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

## Reducer
Transforms the state in response to dispatched ticket, notably the `me` slice.
It just contains the known attributes of a single user, the one that is logged in.

## Selectors

### getMe()

Plainly hand over the attributes of the currently logged in user.
At the moment only the
[Login](../client/src/js/app/object/Login.jsx)
component is interested in it.

## Helpers

No helpers.

# Doc

# Notify

This powers the notification widget, top right on the screen, realized by the component
[Notification](../client/src/js/app/object/Notification.jsx).

A notification has a *kind* and a *text*.
The kind is one of `error`, `warning`, `special`, `info`.
All non-info messages are considered important.

Normally, the notification panel is hidden, but it can be called up by clicking on the progress circle in the
top-right of the screen.
The panel also shows up if there is a new important message, and it will scroll to the last important one.

The user can click away the panel and hide the messages.

![diag](design/design.005.jpeg)

The duck that is responsible for the notification system is
[notify.js](../client/src/js/app/dux/notify.js).

## Actions

Several ways to issue notifications.
The actions with type `async` can be used by asynchronous operations, to indicate
that an operation is pending, has completed successfully, or has failed.
These actions are only used in
[server.js](../client/src/js/app/dux/server.js).

There are also actions to issue a sequence of messages, to hide the message panel, or 
to clear the list of messages.

## Reducer
Transforms the state in response to dispatched ticket, notably the `notify` slice.
The state maintains a counter `busy`, which is the number of currently asynchronously pending operations.

## Selectors

The notification widget gets the notifications from the state, including `busy` and `show`, the latter
indicating whether the notification panel should be hidden or not.
For the convenience of the Notification component,
the index of the last important notification message is also computed, and its kind.

## Helpers

### addItem()

A helper for the reducer, to add items to an array.

# Win

This functionality is responsible for reacting to window resizing by the user.
It will recompute the sizes of several [Pane](Components.md#pane)s on the screen,
so that everything stays in relatively good proportions on a single screen.

![diag](design/design.004.jpeg)

The duck that is responsible for the window state is
[win.js](../client/src/js/app/dux/win.js).

## Actions

Just a creator of the ticket that is dispatched in response to window resizing, as set up in
[Window](../client/src/js/app/object/Window.jsx).
It is just a matter of storing the `height` and the `width` of the window into the state.
Note that the event emitter in 
[Window](../client/src/js/app/object/Window.jsx)
is being throttled, so that it does not run too frequently during the actual resizing.

## Reducer
Transforms the state in response to dispatched ticket, notably the `win` slice.

## Selectors

Just a function that reads the `height` and `width` from the state and transports them as props with
the same name.

## Helpers

### initWinDim()

Based on the actual window size, it computes the sizes of designated areas on the screen.

# Alter
---
[Previous - React](React.md) -
[Up](Home.md) -
[Next - Components](Components.md)

---
[repo](https://github.com/Dans-labs/dariah) -
[website](https://dariah-beta.dans.knaw.nl/)
