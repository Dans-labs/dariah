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
## memoize(f)
Turns the function `f` into a memoized function `memF` that yields the same results
for the same parameters.
It stores computed results under a key dependent on the parameters for which the result
is computed. When the function is called with the same parmeters again, it delivers its
result from cache, rather than to recompute it.

In development mode, if you call the memoized function without arguments, 
it sends usage information to the console: the number of times it has computed
a result and the number of times it has retrieved a result from cache.

In many cases, the 
[reselect](https://github.com/reactjs/reselect)
library is all we need for the memoization of *selector functions*.
However, if you want to bind a callback function to concrete arguments, e.g. in
[InputMulti]({{site.appBase}}/pure/InputMulti.jsx),
you need more powerful memoization, such as `memoize` here.

[levelOneEq]({{site.libBase}}/memo.js)
The
[reselect](https://github.com/reactjs/reselect)
library allows you to create selectors from others, and the result is an object
of selection results. Whenever the combined selector is called, a new object
is created. But the members of this object are quite often the same as the previous time
the combined selector is called.
We can customize the
[selector creation factory](https://github.com/reactjs/reselect#createselectorcreatormemoize-memoizeoptions)
by passing it an equality function that does not mind that the outer object has changed.
`levelOneEq` is that function.

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

* `dirty`: a changed value that has not been saved to the database yet, and/or
* `invalid`: a value that does not pass validation.

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

## makeReducer(flows, init)
Given an object of *flows* and an initial state, returns a *reducer* function.
The *flows* is an object with functions, named after *actions*.
These functions define how a new state must be produced when an action has been
*dispatched*.

## combineSelectors(...selectors)
Given a list of *selector* functions, creates a combined selector that returns
an object containing the results of the individual selectors.
This function uses the *reselect's*
[createSelector](https://github.com/reactjs/reselect#createselectorinputselectors--inputselectors-resultfunc).
