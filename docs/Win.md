# Duck Win

This functionality is responsible for reacting to window resizing by the user.
It will recompute the sizes of several compartments on the screen,
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

# Reducer
Transforms the state in response to dispatched ticket, notably the `win` slice.

# Selectors

Just a function that reads the `height` and `width` from the state and transports them as props with
the same name.

# Helpers

## initWinDim()

Based on the actual window size, it computes the sizes of designated areas on the screen.

---
[Previous - Filter](Filter.md) -
[Up](Home.md) -
[Next - Notify](Notify.md)

---
[repo](https://github.com/Dans-labs/dariah) -
[website](https://dariah-beta.dans.knaw.nl/)

