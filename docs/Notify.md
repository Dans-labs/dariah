# Duck Notify

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

# Reducer
Transforms the state in response to dispatched ticket, notably the `notify` slice.
The state maintains a counter `busy`, which is the number of currently asynchronously pending operations.

# Selectors

The notification widget gets the notifications from the state, including `busy` and `show`, the latter
indicating whether the notification panel should be hidden or not.
For the convenience of the Notification component,
the index of the last important notification message is also computed, and its kind.

# Helpers

## addItem()

A helper for the reducer, to add items to an array.

---
[Previous - Win](Win.md) -
[Up](Home.md) -
[Next - Me](Me.md)

---
[repo](https://github.com/Dans-labs/dariah) -
[website](https://dariah-beta.dans.knaw.nl/)


