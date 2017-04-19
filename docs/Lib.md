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
## propsChanged(newProps, need, oldProps, keyPropNames)
Determines whether `newProps` differ significantly from `oldProps`, based on 
the props with `keyPropNames` only.
If the props are sufficiently changed, it uses the `need` function to
finally determine whether the change should result in an action.

## withParams(Component)
Higher order function that turn a Component (which is a function) into
another component.

The outgoing component is identical to the incoming component, except
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

