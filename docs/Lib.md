---
title: Library
---

[europe.geo]({{site.libBase}}/europe.geo.js)
=============================================================================================
## countryBorders
Object that contains the borders of the European countries plus a bit of additional information in
[geojson](http://geojson.org)
format.

See this [Jupyter notebook](https://github.com/Dans-labs/dariah/blob/master/static/tools/country_compose/countries.ipynb)
to see where this data comes from and how it has been tweaked for this website.

[fields]({{site.libBase}}/fields.js)
=============================================================================================
## getValType(valType)
For a given value type, such as `text`, `url`, `number`, return a component and subtype
for handling the input of such values, e.g. `<input type="url" />`.

## validation
An object with validation functions, named after the types of the values they validate.
All functions take a value, and return undefined if the value passes validation or is itself undefined.
If a value does not pass validation, a simple string expressing the reason is returned.

## normalization
An object with normalization functions, named after the types of the values they normalize.
All functions take a value, and return a normalized value.

[memo]({{site.libBase}}/memo.js)
=============================================================================================
## memoBind(thisArg, funcName, keyArgs, allArgs)
Assumes that `funcName` is a method of class/object `thisArg`, taking as
arguments `allArgs` (which is a sequence of variable length).

When it is called it computes the result and stores it under a key based
on `keyArgs`, unless it finds an old value under that key.
Whatever the case, it delivers the result.

[server]({{site.libBase}}/server.js)
=============================================================================================
## accessData(task)
Asynchronous action to fetch data from the server, and also to send data to it.

A `task` object specifies what to fetch, and can contain data
to send to the server.

It can be used for database queries or file content.
During request, [notify](Dux#notify) actions will be dispatched.

[utils]({{site.libBase}}/utils.js)
=============================================================================================
## editClass(dirty, invalid)
Returns the proper css class for styling content that is being edited, depending on the state it may be in:
`dirty`: a changed value that has not been saved to the database yet, and/or
`invalid`: a value that does not pass validation.

## propsChanged(newProps, need, oldProps, keyPropNames)
Determines whether `newProps` differ significantly from `oldProps`, based on 
the props with `keyPropNames` only.
If the props are sufficiently changed, it uses the `need` function to
finally determine whether the change should result in an action.

## withParams(Component)
Higher order function that turns a Component (which is a function) into
another component.

The outgoing component is identical to the incoming one, except
that you can offer the outgoing component its properties in a slightly
different form. Instead of offering properties `foo`, `bar`, it is also
possible to offer it property `{ params: { foo, bar } }`.

Put otherwise: the resulting component spreads its `params` alongside
the rest of its properties.

We also do this for `route`, like `params`.

This function is useful for components that occur as component on a route in [main](Components#main) on the one hand, but are
also used as ordinary children that receive props from parents.
In the first case, it receives some properties as `params`.

When we write our components, we do not want to care about this, hence
we wrap them as `withParams(Component)`.

## makeComponent(Component, props)
Higher order function that turns a Component (which is a function) into
another component.

The outgoing component is identical to the incoming one, except
that the `props` are injected as extra properties to the outgoing component.

This function is used in [ItemForm](Components#itemform), where input widgets
are passed as components to the form machinery.
The one that passes the widget through, is not the parent of the widget, but
has properties relevant to its functioning. 
So it has to inject them.

## makeReducer(flows, init)
Given an object of *flows* and an initial state, returns a *reducer* function.
The *flows* is an object with functions, named after *actions*.
These functions define how a new state must be produced when an action has been
*dispatched*.
