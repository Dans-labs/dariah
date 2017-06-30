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

## checkDisabled

## composeAttributes

## dealWithProvenance

## editClass(dirty, invalid)
Returns the proper css class for styling content that is being edited,
depending on the state it may be in:

* `dirty`: a changed value that has not been saved to the database yet, and/or
* `invalid`: a value that does not pass validation.

## getDateTime

## makeFields

## makeDetails

## normalization
An object with normalization functions, named after the types of the values they normalize.
All functions take a value, and return a normalized value.

## onSubmitSuccess

## getValType(valType)
For a given value type, such as `text`, `url`, `number`, return a component and subtype
for handling the input of such values, e.g. `<input type="url" />`.

## readonlyValue

## someEditable

## sortStringTemplate

## sortTimeInterval

## validation
An object with validation functions, named after the types of the values they validate.
All functions take a value, and return undefined if the value passes validation or is itself undefined.
If a value does not pass validation, a simple string expressing the reason is returned.

[handle]({{site.libBase}}/handle.js)
=============================================================================================
It is tempting to pass callbacks to React components as arrow functions, like this:

```es6

<MyComp
    onClick={event => handle(event)}
/>

```

The problem with this is that the `event => handle(event)`
creates a brand new function object every time `<MyComp/>` is being rendered.

This is not incorrect, but it is a burden for the garbage collector, especially when
your component is part of a list item in a big list.

It is much better to defined a fixed function elsewhere, and pass it to `<MyComp>`.

But what if the callback is dependent on some parameters, that depend on its instances?
For example, if the callback has to be passed to the items of a list, and cause the
showing of hiding of individual list items? You could do it like this:

```es6

const handleItem = item => event => handle(event, item)

items.map(item =>
    <MyComp
        onClick={handleItem(item)}
    />
)
 
```

As it stands, this suffers from the same problem, because for every item a
fresh bound function object is allocated. And if the list is rendered twice,
the second time results in completely new function objects.

The solution is to use a [memoized](#memo) version of `handleItem`.

The following functions are conveniences for doing exactly that.

## handle(dispatch, actionCreator, actionArgs)

This is a memoized action *creator* wrapper. It return a function, that can be called
with an event. After receiving the event, the passed `actionCreator` will be called
with the given arguments to produce an action.
Subsequently, this action will be *dispatched* to the store that helds the state,
which will result in the intended state change. 

This particular function `handle` will not use the information in the event.
It takes trouble to neutralize the event instead.
If there is relevant information in the event, use one of the following functions.

## handlE

Like `handle`, and the information in the event is not used, but the default
behaviour of the event and its propagation are not suppressed.

## handlEV

Like `handle`, but now the `event.target.value` is passed the actionCreator as final
argument.

[memo]({{site.libBase}}/memo.js)
=============================================================================================
## makeSet
We use plain objects, including `Array`s for all things on the state.
But what if your component prefers the data as a 
[Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)?
Well, it is easy to turn an object into a `Set`.
But if you do it twice, based on an identical state, you get two
copies of the same set, which is a waste.
Here memoization is a solution.
`makeSet` is e memoized function that takes an array and returns its values as a `Set`.

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
[InputMulti]({{site.appBase}}/components/InputMulti.jsx),
you need more powerful memoization, such as `memoize` here.

However, a naive implementation of memoize has a big drawback. 
In order to store a function result obtained when computing the function on the basis
of a list of arguments, you need to come up with key under which to store those result.
This key must be computed from the list of arguments, and the computation of the key
should not take more time than bluntly computing the function in question.

The most common way of computing a key from arguments is to `JSON.stringify` them.

However, many of the functions we need to memoize, take a slice of the state as argument. 
That can be a big object, e.g. `tables`, which hold all data that the app has downloaded
from the server in the current section.

In those cases it will not do to stringify the argument. 
Rather we fall back on object identity: we use a
[WeakMap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap),
which seems to have been designed exactly for this purpose.
However, it is not immediately obvious how to use this solution if you have more than
one argument, and if you mix non-object values and functions with real objects.

These problems can be solved, and `memoize()` has evolved into a flexible memoizer
for all kinds of situations.
    
What you can do with it is to stringify a shallow to-level structure of an object, to a
given depth, and from then on work with object identity and WeakMaps.
You can also forego object identity altogether and use solely stringify, which is often
the most efficient solution.

We have built quite a few
[tests]({{site.repBase}}/client/src/test/memo.js)
to verify the logic and the performance of
this memoizer. 

The flip-side of a memoizer is that you end-up with a lot of obsolete function results,
that will never be used again.
Especially when one of the arguments is a slice of the state, the corresponding
result will be outdated as soon as that slice of the state has undergone an update.
Even if it will revert to the same state later on, it will be a different object.

To prevent a needless clutter of obsolete computation results, the cache will be emptied
periodically. By default, every result will live at most 30 minutes after having been
created, but this is configurable.

This brings us to the reason why we use WeakMap and not the more versatile
[Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)
data structure. For `Map` does not suffer the constraint that keys must be objects,
so if your arguments are a mixture of objects and non-objects, `Map` seems the obvious choice.

However, if your Map key is a big object, the object can not be garbage collected
as long as it is part of the map.
That is a pity, because the only information we need of this object is its identity 
as an object, not its complete value.
Think again of the `tables` slice of the state. It keeps changing when users fetch or change
data, so memoized functions that use `tables` will cling to many successive copies
of this state. Despite the fact that these copies share most of their data, this hampers
a smooth garbage collection process.

WeakMaps do not cling to the objects that act as their keys. They somehow store the identity
of their key objects, without claiming the continued existence of them.

### Usage

```javascript

const baseFunction = (x, y, z) => expensiveResult

const memBaseFunction = memoize(baseFunction, levels, config)

memBaseFunction(a, b, c) // computes baseFunction(a, b, c)
memBaseFunction(a, b, c) // retrieves baseFunction(a, b, c) from cache instead of computing it

```

#### Level
If the `level` param is `null` or `undefined`, all arguments will be stringified in one go.

If `levels` is an empty object, all object arguments will be treated by object identity.

Otherwise, `levels` should be an object, keyed by argument position and valued by
level.

If you specify a level for argument `n`, it means that argument `n` contributes
to the memo key in the following way:
 
* level *-1*: JSON stringify it
* level *0*: use the object identity of it as key in a `WeakMap`
* level *i+i*: JSON stringify the top *i* levels of it;
  everything from level *i+1* onwards is treated by object identity.

N.B: *Function arguments* can not be stringified,
they always go by way of object identitiy.

For exmaples, see the
[test suite]({{site.repBase}}/client/src/test/memo.js).

#### Config
The `config` parameter takes the following keys:

* `clearCache`: time in seconds that a key is being retained in the memCache
* `debug`: `string`: when the memoized function computes a result, retrieves it
  from cache, or cleares it from cache, the debug string will be output
  through `console.warn`. Only in development mode!
  It is also possible to add extra bits of debugging information, by adapting the
  `debugStyle` object in the [source code]({{site.libBase}}/memo.js). 

#### Caution
If you memoize a function that takes big objects as parameters, and you forget
to specify that those arguments must be treated by object identity, you may
hit a murderous performance penalty.
I did forget it and the function involved computed related values for given 
identifiers, and in order to find those values it needed to receive the `tables`
slice of the state. As a consequence, opening a contribution record within the list of
all contributions, took a full 3 seconds. It took me long to pinpoint the memoizer
as the root cause of this particular slowness.

[utils]({{site.libBase}}/utils.js)
=============================================================================================
## combineSelectors(...selectors)
Given a list of *selector* functions, creates a combined selector that returns
an object containing the results of the individual selectors.
This function uses the *reselect's*
[createSelector](https://github.com/reactjs/reselect#createselectorinputselectors--inputselectors-resultfunc).
We use it quite often when components need multiple sections of the state.

## emptyX (S A O F)

## getUrlParts

## jString

## makeReducer(flows, init)
Given an object of *flows* and an initial state, returns a *reducer* function.
The *flows* is an object with functions, named after *actions*.
These functions define how a new state must be produced when an action has been
*dispatched*.

## propsChanged(newProps, need, oldProps, keyPropNames)
Determines whether `newProps` differ significantly from `oldProps`, based on 
the props with `keyPropNames` only.
If the props are sufficiently changed, it uses the `need` function to
finally determine whether the change should result in an action.

## updateAuto

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

