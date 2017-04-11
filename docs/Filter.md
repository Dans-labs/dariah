# Duck Filter

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

# Reducer
Transforms the state in response to dispatched tickets, notably the `filterSettings` slice.
Well, it is a bit more complicated, because every table has its own filterSettings.

# Selectors
Filter information is being translated from the state to props that can be consumed by components.
All the actual filter work is done here, but because it is rather complex, we have outsourced it to the *helpers*.

## getFilterSetting()

Reads the current settings of a filter and injects it as `filterSettings` into
the props of the receiving components, which are typically the filter widgets that receive user interaction:
[FullText](../client/src/js/app/state/FullText.jsx)
[Facet](../client/src/js/app/state/Facet.jsx), and also
[CheckboxI](../client/src/js/app/object/CheckboxI.jsx),
[EUMap](../client/src/js/app/object/EUMap.jsx).

## getFieldValues()

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
 
## getFiltersApplied()

Applies the filters, according to the current filter settings.
Applying means: determine the subset of filtered items (`filteredData`), and provide statistics for the facets.

Every faceted field displays as total the amount of items filtered by all *other* filters (`filteredAmountOthers`).
For each of its facets, it displays how many items of this relative total correspond to that facet (`amounts`).

So this function delivers exactly that: `filteredData`, `filteredAmountOthers`, `amounts`.

It is also a costly function, but it does neet to be invoked upon each rendering caused by a click or a key press.

# Helpers

## compileFiltering()

Computes facet values from the records of a table.

## initFiltering()

Computes initial filter settings, after `compileFiltering`.

## computeFiltering()

Applies the filters.

---
[Previous - React](React.md) -
[Up](Home.md) -
[Next - Win](Win.md)

---
[repo](https://github.com/Dans-labs/dariah) -
[website](https://dariah-beta.dans.knaw.nl/)
