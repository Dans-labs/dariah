---
title: Library
---

Table of Contents

* [datatypes](#datatypes)
* [details](#details)
* [edit](#edit)
* [europe.geo](#europe-geo)
* [fields](#fields)
* [handle](#handle)
* [memo](#memo)
* [templates](#templates)
* [utils](#utils)
* [values](#values)

# [datatypes]({{site.libBase}}/datatypes.js)

Elementary operations on data that comes in basic types, such as strings,
numbers and dates. This file contains also the functions that normalize and
validate values.

### getDateTime

Convert a datetime object or string into a numerical value, so you can make
comparisons. If absent, yield negative infinity for start dates and positive
infinity for end dates. Used in [workflow](Dux#workflow).

### normalization

An object with normalization functions, named after the types of the values they
normalize. All functions take a value, and return a normalized value.

### sortStringTemplate

Compare function for sorting. Wraps the values to be compared in a template
before actually comparing them.

Used in [workflow](Dux#workflow).

### sortTimeInterval

Sort by time interval. Sorting by time intervals should works as follows:

* if both intervals are fully specified, the interval with the earlier start
	date comes first;
* if the start dates are equal, the one with the LATER end date comes first, in
	this way, containing intervals come before contained intervals;
* if the start date is missing, the start date is assumed to be in the infinite
	past;
* if the end date is missing, the end date is assumed to be in the infinite
	future.

Used in [workflow](Dux#workflow).

### validation

An object with validation functions, named after the types of the values they
validate. All functions take a value, and return undefined if the value passes
validation or is itself undefined. If a value does not pass validation, a simple
string expressing the reason is returned.

# [details]({{site.libBase}}/detail.js)

These functions help by setting up lists of detail records for master records.
The carry out what has been specified in the [data model](Model) config files
under the keys `detail` and `detailOrder`.

### getMasterTable

Given a table and the name of a field that links to an other, related, table, if
finds the name of that related table. If that other table list this table as a
details table, and marks this field as the link field, then the related table is
indeed the master table. But this function is indifferent to that. It merely
consults the `fieldSpec` of `field` in `table`.

### makeDetails

Prepare lists of details for an item of a table. Collect the specs and put all
information in an array of objects, each corresponding to a details list, from
which components can easily construct a widget for handling lists of details

### makeKeepInfo

Collects information on the basis of which it can be decided whether a record
may be deleted or not. A record may be deleted if it has no detail records,
except those that will be deleted as well. Those are the details which are
marked as `cascade` in the [data model](Model). This function returns a list of
all non-cascade detail tables that have records linking to the record in
question.

**Example**: [ItemForm](Components#itemform)

# [edit]({{site.libBase}}/edit.js)

Helpers for presenting edit controls, such as a save button.

### editClass

Returns the proper CSS class for styling content that is being edited, depending
on the state it may be in:

* `dirty`: a changed value that has not been saved to the database yet, and/or
* `invalid`: a value that does not pass validation.

### editControl

This is nearly a React component, except it needs a boolean parameter
`canSubmit`, to direct it into one behaviour or another.

The basic function of this component is to give an indication of the edit status
of a record. Whether values have changed (`dirty`), values are `invalid`, or
values are being `submitted`.

If this component is put inside a `<form>` element under the control of
[redux-form]({{site.reduxFormBase}}), it is also capable to trigger a submit and
save action.

#### `canSubmit = true`

The component [EditControl](Components#editcontrol) calls this function with
submit capacity. It also has to provide the resulting component with typical
form properties, such as `dirty`, `valid`, `handleSubmit`.

Because in this case the component lives inside a component that is already
enhanced with `reduxForm`, namely [ItemEdit](Components#itemedit), these
properties have been injected higher up in the component tree and can be passed
down as props.

#### `canSubmit = false`

The the component [EditStatus](Components#editstatus) calls this function
without submit capacity. The typical form properties are now obtained by
enhancing this very component with `reduxForm`. However, because this component
is not assumed to be within a `<form>` context, it cannot perform a submit.

### makeChangeSave

Produces a function, that when triggered by a value, will submit that value
(after a short delay). See `makeSubmitTime`. This is used when an input field
fires an event with a value entered by the user.

### makeChangeSaveVal

Produces a function, with a value baked in. When called, this function will
submit that value (after a short delay). This is used when the user clicks a
button, like `submit review` in which case a specific field has to be set to a
specific value, in this example: `submitted = true`.

### makeReset

Composes an attribute that sets up an `onKeyUp` handler for an input field. It
will react to the `Esc` key, and reset the input field to its pristine value,
i.e. the value it had before the user started interacting with it.

### makeSubmit

Produces a submit action or a null-returning function, depending on parameters.
The parameters tell whether some record is dirty, valid and not currently
submitting. In that case, the result is a submit function (which is also passed
as parameter).

This function is used in those cases where an input field looses focus. It then
generates a submit action if all is well.

### makeSubmitTime

Given a (submit)-function, transforms it into the same function that will be
invoked with a small delay.

This can be used after events that change a form, without a blur event. The
event should trigger a submit and save, but first the triggering action should
have done its work.

**Example**: [Input](Components#input)

### onSubmitSuccess

Needed in a workaround for an
[issue in redux-form]({{site.reduxFormIssues}}/2841). See
[ItemEdit](Components#itemedit)

# [europe.geo]({{site.libBase}}/europe.geo.js)

### countryBorders

Object that contains the borders of the European countries plus a bit of
additional information in [geojson]({{site.geojson}}) format.

See this
[Jupyter notebook]({{site.staticBase}}/tools/country_compose/countries.ipynb) to
see where this data comes from and how it has been tweaked for this website.

# [fields]({{site.libBase}}/fields.js)

### checkDisabled

Checks whether a certain value is inactive and should be disabled. See
[workflow logic](Dux#workflow). Used in component
[RelSelect](Components#relselect).

### dealWithProvenance

Remove provenance fields if current settings require that. See
[settings](Dux#settings). Used in component
[ItemContainer](Components#itemcontainer) and others.

### itemEditField

Render an edit field in standard presentation, like
[ItemEdit](Components#itemedit) does it. In fact, ItemEdit uses this very
function to render its editable fields.

This function can be conveniently used in custom templates to render some fields
in the standard way.

**Example**: [Templates](Components#templates)

### itemReadField

Render an read-only field in standard presentation, like
[ItemRead](Components#itemread) does it. In fact, ItemRead uses this very
function to render its read-only fields.

This function can be conveniently used in custom templates to render some fields
in the standard way.

**Example**: [Templates](Components#templates)

### makeFields

Prepare field components for an item of a table. Collect the specs from the
`fieldOrder` and `fieldSpecs` fields of the [data model](Model) and put all
information in an array objects, each corresponding to a field, from which
components can easily construct a widget for showing or editing that field.

**Example**: [ItemForm](Components#itemform)

### someEditable

Checks whether a list of fields contains at least one that the current user may
edit.

**Example**: [ItemForm](Components#itemform)

### toFieldInfo

Reduces the information in the fragments produced by [makeFields](#makefields)
to a simple object with only the value(s) of that field.

Used in [ItemRead](Components#itemread) to pass an argument to
[applyTemplate](#applytemplate).

# [handle]({{site.libBase}}/handle.js)

It is tempting to pass callbacks to React components as arrow functions, like
this:

```es6
<MyComp
    onClick={event => handle(event)}
/>
```

The problem with this is that the `event => handle(event)` creates a brand new
function object every time `<MyComp/>` is being rendered.

This is not incorrect, but it is a burden for the garbage collector, especially
when your component is part of a list item in a big list.

It is much better to defined a fixed function elsewhere, and pass it to
`<MyComp>`.

But what if the callback is dependent on some parameters, that depend on its
instances? For example, if the callback has to be passed to the items of a list,
and cause the showing of hiding of individual list items? You could do it like
this:

```es6
const handleItem = item => event => handle(event, item)

items.map(item =>
    <MyComp
        onClick={handleItem(item)}
    />
)

```

As it stands, this suffers from the same problem, because for every item a fresh
bound function object is allocated. And if the list is rendered twice, the
second time results in completely new function objects.

The solution is to use a [memoized](#memo) version of `handleItem`.

The following functions are conveniences for doing exactly that.

### handle(dispatch, actionCreator, actionArgs)

This is a memoized action _creator_ wrapper. It return a function, that can be
called with an event. After receiving the event, the passed `actionCreator` will
be called with the given arguments to produce an action. Subsequently, this
action will be _dispatched_ to the store that holds the state, which will result
in the intended state change.

This particular function `handle` will not use the information in the event. It
takes trouble to neutralize the event instead. If there is relevant information
in the event, use one of the following functions.

### handlE

Like `handle`, and the information in the event is not used, but the default
behaviour of the event and its propagation are not suppressed.

### handlEV

Like `handle`, but now the `event.target.value` is passed the actionCreator as
final argument.

# [memo]({{site.libBase}}/memo.js)

### makeSet

We use plain objects, including `Array`s for all things on the state. But what
if your component prefers the data as a
[Set]({{site.javascript}}/Global_Objects/Set)? Well, it is easy to turn an
object into a `Set`. But if you do it twice, based on an identical state, you
get two copies of the same set, which is a waste. Here memoization is a
solution. `makeSet` is a memoized function that takes an array and returns its
values as a `Set`.

### memoize

Turns the function `f` into a memoized function `memF` that yields the same
results for the same parameters. It stores computed results under a key
dependent on the parameters for which the result is computed. When the function
is called with the same parameters again, it delivers its result from cache,
rather than to recompute it.

In development mode, if you call the memoized function without arguments, it
sends usage information to the console: the number of times it has computed a
result and the number of times it has retrieved a result from cache.

In many cases, the [reselect]({{site.reactReselect}}) library is all we need for
the memoization of _selector functions_. However, if you want to bind a callback
function to concrete arguments, e.g. in
[InputMulti]({{site.appBase}}/components/InputMulti.jsx), you need more powerful
memoization, such as `memoize` here.

However, a naive implementation of memoize has a big drawback. In order to store
a function result obtained when computing the function on the basis of a list of
arguments, you need to come up with key under which to store those result. This
key must be computed from the list of arguments, and the computation of the key
should not take more time than bluntly computing the function in question.

The most common way of computing a key from arguments is to `JSON.stringify`
them.

However, many of the functions we need to memoize, take a slice of the state as
argument. That can be a big object, e.g. `tables`, which hold all data that the
app has downloaded from the server in the current section.

In those cases it will not do to stringify the argument. Rather we fall back on
object identity: we use a [WeakMap]({{site.javascript}}/Global_Objects/WeakMap),
which seems to have been designed exactly for this purpose. However, it is not
immediately obvious how to use this solution if you have more than one argument,
and if you mix non-object values and functions with real objects.

These problems can be solved, and `memoize()` has evolved into a flexible
memoizer for all kinds of situations. \
What you can do with it is to stringify a shallow to-level structure of an object,
to a given depth, and from then on work with object identity and WeakMaps. You can
also forego object identity altogether and use solely stringify, which is often the
most efficient solution.

We have built quite a few [tests]({{site.repBase}}/client/src/test/memo.js) to
verify the logic and the performance of this memoizer.

The flip-side of a memoizer is that you end-up with a lot of obsolete function
results, that will never be used again. Especially when one of the arguments is
a slice of the state, the corresponding result will be outdated as soon as that
slice of the state has undergone an update. Even if it will revert to the same
state later on, it will be a different object.

To prevent a needless clutter of obsolete computation results, the cache will be
emptied periodically. By default, every result will live at most 30 minutes
after having been created, but this is configurable.

This brings us to the reason why we use WeakMap and not the more versatile
[Map]({{site.javascript}}/Global_Objects/Map) data structure. For `Map` does not
suffer the constraint that keys must be objects, so if your arguments are a
mixture of objects and non-objects, `Map` seems the obvious choice.

However, if your Map key is a big object, the object can not be garbage
collected as long as it is part of the map. That is a pity, because the only
information we need of this object is its identity as an object, not its
complete value. Think again of the `tables` slice of the state. It keeps
changing when users fetch or change data, so memoized functions that use
`tables` will cling to many successive copies of this state. Despite the fact
that these copies share most of their data, this hampers a smooth garbage
collection process.

WeakMaps do not cling to the objects that act as their keys. They somehow store
the identity of their key objects, without claiming the continued existence of
them.

### Usage

```javascript
const baseFunction = (x, y, z) => expensiveResult

const memBaseFunction = memoize(baseFunction, levels, config)

memBaseFunction(a, b, c) // computes baseFunction(a, b, c)
memBaseFunction(a, b, c) // retrieves baseFunction(a, b, c) from cache instead of computing it
```

#### Level

If the `level` paramter is `null` or `undefined`, all arguments will be
stringified in one go.

If `levels` is an empty object, all object arguments will be treated by object
identity.

Otherwise, `levels` should be an object, keyed by argument position and valued
by level.

If you specify a level for argument `n`, it means that argument `n` contributes
to the memo key in the following way:

* level _-1_: JSON stringify it
* level _0_: use the object identity of it as key in a `WeakMap`
* level _i+i_: JSON stringify the top _i_ levels of it; everything from level
	_i+1_ onwards is treated by object identity.

N.B: _Function arguments_ can not be stringified, they always go by way of
object identitiy.

For exmaples, see the [test suite]({{site.repBase}}/client/src/test/memo.js).

#### Config

The `config` parameter takes the following keys:

* `clearCache`: time in seconds that a key is being retained in the memCache
* `debug`: `string`: when the memoized function computes a result, retrieves it
	from cache, or cleares it from cache, the debug string will be output through
	`console.warn`. Only in development mode! It is also possible to add extra
	bits of debugging information, by adapting the `debugStyle` object in the
	[source code]({{site.libBase}}/memo.js).

#### Caution

If you memoize a function that takes big objects as parameters, and you forget
to specify that those arguments must be treated by object identity, you may hit
a murderous performance penalty. I did forget it and the function involved
computed related values for given identifiers, and in order to find those values
it needed to receive the `tables` slice of the state. As a consequence, opening
a contribution record within the list of all contributions, took a full 3
seconds. It took me long to pinpoint the memoizer as the root cause of this
particular slowness.

# [templates]({{site.libBase}}/templates.js)

This library contains templates that customize the presentation of records and
fields. See [Templates](Templates) for how the template system is structured.
This library contains the functions to _apply_ templates.

### applyInsertTemplate

Applies a template for the _insert record_ button for a list. This template
cannot have field values, because it is for a whole list of records. However, it
is invoked by lists that are detail lists, and hence there is a master record.
This template has access to the fields of that master record. It is invoked in
[EditInsert](Components#editinsert) components.

### applyTemplate

Applies a read only template. You can merge a template with
[FieldRead](Components#fieldread) components.

### applyEditTemplate

Applies an edit template. There is a bit of extra data here compared to
read-only templates, namely whether fields are editable or not. You can merge a
template with [FieldRead](Components#fieldread) components, as well as with
[FieldEdit](Components#fieldedit) components.

**Examples**: [ItemRead](Components#itemread) [ItemEdit](Components#itemedit)

See also [Templates](Templates).

### editMode

This function computes a test function for a record, and the test function is
customized per table, in the same way as templates are customized per table.

Per table you can define any function, and in doing so you are given the
information which fields are empty.

In practice we use this function to determine whether we start the presentation
of a record in read-only mode or in edit mode.

**Example** In [ListPlain](Components#listplain) we invoke this function to
determine the `startMode` function, which computes for each record a choice
between alternatives (edit mode or read-only mode), called `thisStartMode`.

When ListPlain is called to display the `criteriaEntry` detail records of an
`assessment` record, a test function is invoked, defined in
[criteriaEntry]({{site.appBase}}/tables/criteriaEntry.js) telling to return `1`
if the `score` is empty or if the `evidence` is empty. Alternative `1`
corresponds to edit mode.

So, whenever a `criteriaEntry` record is certainly incomplete, it will be opened
in edit mode. If it is possibly complete, it will be opened in read-only mode.

# [utils]({{site.libBase}}/utils.js)

### combineSelectors(...selectors)

Given a list of _selector_ functions, creates a combined selector that returns
an object containing the results of the individual selectors. This function uses
the _reselect's_
[createSelector]({{site.reactReselect}}#createselectorinputselectors--inputselectors-resultfunc).
We use it quite often when components need multiple sections of the state.

### emptyX (S A O F)

Many objects get created during rendering and re-rendering. If we render a list
of thousand entries, and we pass each item component a property with a value
like

```
    details={details || {}}
```

then thousand instances of an empty object will be created and need to be
garbage collected soon after that. But if we are interested in the value of the
empty object, without an intention to modify it, this is an utter waste.

Therefore we declare a few _empty_ concepts:

* emptyS (string)
* emptyA (array),
* emptyO (object),
* emptyF (function).
* emptySet (set).

We also [freeze]({{site.javascript}}/Global_Objects/Object/freeze) them, so that
we cannot inadvertently mutate them.

The contract with ourselves is: do not ever use one of

```
'' [] {} x => x
```

if you need an empty value, but use an `empty`_X_ (_X_ in `S`, `A`, `O`, `F`)
instead.

### getUrlParts

Analyse URLs in order to extract a part `/item/`_itemID_ from it (if present).

This is needed if we open and close items in a list and want the URL to reflect
that.

See [ListPlain](Components#listplain) for an example.

### jString

When we need the value of an object as a key, for example when we
[memoize](Lib#memo) functions, the most straightforward way is to
[JSON.stringify]({{site.javascript}}/Global_Objects/JSON/stringify) that object
(if it is not forbiddingly large). But this has one defect: the order in which
the keys of objects are serialized is not fixed. So two results of a stringify
of objects with the same value can be different, due to different orders of
keys.

Our function `jString` fixes that. It is a bit more expensive to run than the
plain `JSON.stringify`, but the penalty of not using it has the consequence that
we fail to detect the equality of objects, which results in spurious
re-rendering of components. If that happens too often, the cost adds up or even
multiplies quickly.

### makeReducer(flows, init)

Given an object of _flows_ and an initial state, returns a _reducer_ function.
The _flows_ is an object with functions, named after _actions_. These functions
define how a new state must be produced when an action has been _dispatched_.

This function helps to write down complex reducer function as small components
with a clean syntax.

### max

Returns the maximum of an array of numbers. If the array is empty, return
negative infinity.

### min

Returns the minimum of an array of numbers. If the array is empty, return
positive infinity.

### propsChanged(newProps, need, oldProps, keyPropNames)

Determines whether `newProps` differ significantly from `oldProps`, based on the
props with `keyPropNames` only. If the props are sufficiently changed, it uses
the `need` function to finally determine whether the change should result in an
action.

### sum

Returns the sum of an array of numbers. If the array is empty, return `0`.

### updateAuto

The `update()` function of the
[Immutability-Helper module]({{site.immutability}}) is great. But one thing is a
bit clumsy: it does not have [auto-vivification]({{site.autovivification}}). The
documentation points to a [way out]({{site.immutability}}#autovivification), but
the code for that becomes tedious quickly.

The idea, however, is right, and this function is a variant of the `update()`
function with auto vivification.

### withParams(Component)

Higher order function that turns a Component (which is a function) into another
component.

The outgoing component is identical to the incoming one, except that you can
offer the outgoing component its properties in a slightly different form.
Instead of offering properties `foo`, `bar`, it is also possible to offer it
property `{ params: { foo, bar } }`.

Put otherwise: the resulting component spreads its `params` alongside the rest
of its properties.

We also do this for `route`, like `params`.

This function is useful for components that occur as component on a route in
[main](Components#main) on the one hand, but are also used as ordinary children
that receive props from parents. In the first case, it receives some properties
as `params`.

When we write our components, we do not want to care about this, hence we wrap
them as `withParams(Component)`.

# [values]({{site.libBase}}/values.js)

This is a library of functions that produce formatted representations of values
from the database.

### composeAttributes

When composing a Field component for an item, compute attributes telling whether
the item is active or not, and merge them into the other attributes. Used in
component [RelSelect](Components#relselect).

### getValType(valType)

For a given value type, such as `text`, `URL`, `number`, return a component and
subtype for handling the input of such values, e.g. `<input type="URL" />`.

**Example**: [FieldEdit](Components#fieldedit)

### wrappedRepr

Produces a representation for a field value, complete with surrounding elements
and attributes. Values of link fields will be wrapped in `<a href="...">`
elements,

Used in [FieldRead](Components#fieldread).
