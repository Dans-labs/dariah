---
title: React
---

# React Documentation references.

## React Components

React components represent pieces of the web page and their functionality.
Components are organized hierarchically.
Components can be parametrized by *properties*, which parents pass to children.
A component acts as a template instruction to build a piece of DOM.

Components can be programmed as classes or as functions.

In this app we distinguish between three *capability levels* of components.

[External documentation](https://facebook.github.io/react/docs/react-component.html)

## Pure components
If a component knows how to build the DOM, purely on the basis of its properties and
a static template, it can be (and will be) coded as a pure function.

We put all these components in a directory called **pure**.

[Example: Stat]({{site.appBase}}/pure/Stat.jsx).

## Simple Stateful components
If a component needs to store the effects of the outside worlds
(incoming server data or user interaction), it is stateful.
If the component does not need [lifecycle](life-cycle) methods, it can be programmed
as a pure function that will be connected to the Redux state
by means of a simple binding: [connect](#connect).

We put all these components in a directory called **state**.

[Example: Facet]({{site.appBase}}/state/Facet.jsx).

## Complex components
If a component has to handle the DOM after it has been constructed,
e.g. apply some hiding and showing, fill a div with a third party component,
or get data from the state in a sophisticated way,
then we need to program the component as a class with so-called
[life cycle methods](#life-cycle).

We put all these components in a directory called **object**.

[Example: ItemFiltered]({{site.appBase}}/object/ItemFiltered.jsx).


## React Processing Concepts

React renders updates to
[components](#react-components)
very efficiently.
The
[render()](#render)
function is a template for a
[element fragment](#fragment), not the real
[DOM](#dom).
So, after an update, it is not costly to recompute the fragment
for that component completely, because the DOM is not touched.

### Reconciliation

Once the new fragment has been constructed, a clever, React-internal
process called **reconciliation** is carried out, which computes the minimum
number of update actions that have to be applied to the previous, real DOM
incarnation of the component, to change it to match the new fragment.

### MiniDOM

A compact internal representation of the
[DOM](#dom), made from React *elements*.

A React element is an instance of the React Element class.
In **jsx** you can refer to a React element just by saying

```
  <p>foo</p>
```

React elements reflect HTML elements, but you can mingle them
with React components, which look nearly the same in **jsx**:

```
 <p>
   <NavLink to="/data" >bar</NavLink>
 </p>
```
### DOM

DOM is an abbreviation for
[Document Object Model](https://developer.mozilla.org/en-US/docs/Web/API/document).
The DOM is what the browser gets in memory once it has loaded an HTML document.
One of the principal tasks of Javascript in the browser is to manipulate this DOM.

The DOM and its API are exceedingly bloated, hence DOM operations are slow, no matter how
fast Javascript currently is.

This is one of the reasons that a niche for React exists, with its [MiniDOM](#minidom).

### Fragment
A fragment is such a mixture of properly nested React elements and components.
It is part of the React's toolkit to manage DOM manipulations efficiently.

See [Reconciliation](#reconciliation).

[External documentation](https://facebook.github.io/react/docs/rendering-elements.html)

### PropTypes

Type checking for React Components is done by *PropTypes*.

Proptype checking in react only happens in development mode.
React checks whether the named props that are passed to a component
correspond to the props declared. In addition, it performs a basic type check on the values
inside those props.

I find the `PropType` verbose, and no match for the otherwise clean and pleasant
syntax of JSX. Additionally, most of the mistakes I make, do not reveal themselves as value
type mistakes. On top it this all: declaring `PropTypes` forces you to repeat all
the names of your proptypes, so is against the principle of *do't repeat yourself*.
In this application, the property names are always clear in the code, either as

```
const MyComponent = ({ foo, bar )} => ...
```

or as

```
const { props: { foo, bar} } = this
```

[External documentation](https://facebook.github.io/react/docs/typechecking-with-proptypes.html)

### Context

React mechanism to pass data directly  from ancestors to deep descendants.
The React documentation
considers context as a brittle part of itself, and warns
against over-use. At the same time,
[Redux](#redux)
depends critically on it, so I consider it safe to use.
But our code will not use it explicitly, only through Redux.

[External documentation](https://facebook.github.io/react/docs/context.html)

### Life Cycle
The main function of a
[component](#react-components)
is to act as a template to be [rendered](#render).
But if there is additional work to be done, this can be hooked up at various
stages in the component's lifecycle.
Most stages occur during (re)rendering, and there is a stage of construction and unmounting.

[External documentation](https://facebook.github.io/react/docs/react-component.html#the-component-lifecycle)

#### Constructor

When a
[component](#react-components)
is being
[rendered](https://facebook.github.io/react/docs/react-component.html#render)
this is the method to construct the corresponding React class.
It will set up the
[state](#state).

[External documentation](https://facebook.github.io/react/docs/react-component.html#constructor)

#### componentDidMount

When a
[component](#react-components)
has been added to the DOM
this method will be called just after.
This is the recommended time to fetch data for this component, if needed.

[External documentation](https://facebook.github.io/react/docs/react-component.html#componentdidmount)


#### componentDidUpdate

When a
[component](#react-components)
has been updated due to receiving new properties,
this method will be called just after.
If DOM manipulations are needed to complete the rendering, this is
the place to do it.

**NB:** This will not called upon initial rendering, so if the DOM manipulation
is also needed initially, it is handy to write a function for it and
call it in this method and in [componentDidMount()](#componentdidmount).

@external componentDidUpdate
[External documentation](https://facebook.github.io/react/docs/react-component.html#componentdidupdate)

#### componentWillMount

When a
[component](#react-components)
will be added to the DOM,
this method will be called just before.
This is the first thing that happens after [constructor()](#constructor).

[External documentation](https://facebook.github.io/react/docs/react-component.html#componentwillmount)

#### componentWillReceiveProps

When a
[component](#react-components)
is about to receive new props (as part of the update process),
this method will be called just before.
The new props are passed with it, so that it is possible to execute
actions dependent on whether pros have changed.

[External documentation](https://facebook.github.io/react/docs/react-component.html#componentwillreceiveprops)

#### componentWillUnmount
When a
[component](#react-components)
will be removed from the DOM,
this method will be called just before.
If we want to save state, we can hook it up here.

[External documentation](https://facebook.github.io/react/docs/react-component.html#componentwillunmount)

#### render

The main function of a
[component](#react-components)
is to act as a template to be rendered.
During rendering the template will be used as a set of instructions to build a real DOM
somewhere on the actual web page.

[External documentation](https://facebook.github.io/react/docs/react-component.html#render)

### Controlled Component

For elements that can receive user input (forms, inputs, etc) there is the option
to handle input in a way controlled by React, and not by the default HTML behaviour.

So when a user clicks a checkbox, the check is not managed by the browser,
but a callback is called, a parent component executes it, state gets updated, state changes
trickle down as property updates to child elements, and the checkbox in question is told
to be checked (or unchecked).

[External documentation](https://facebook.github.io/react/docs/forms.html)

## State

There are two main reasons for a component to maintain state:

* getting external data
* reacting to user events

In both cases, something happens in the outside world that must be remembered.
Components remember these things in their
[state](#state), which only they can update.

[External documentation](https://facebook.github.io/react/docs/state-and-lifecycle.html)
They can compute derived data from their state and pass that as properties
to their children.
State updates trigger these computations automatically, and children
whose properties are dependent on this state, are rerendered automatically
(and economically).

### Local State

The vanilla React way is that [components](#react-components)
have their own state, which only they can modify through
[setState](https://facebook.github.io/react/docs/react-component.html#setstate).

But even in React, state is not completely local, because in many
cases several components need to have access to the state.
The preferred way of dealing with that is to lift state up to the nearest
common ancestor of all components that need the state.
Descendants that must modify ancestral state are passed a callback to do so.

Local state is very intuitive and leads to nice separation of concerns, but alas.
There comes a moment that components want to be informed of each other's state.
Especially when components start modifying data from the server and saving it,
other components that rely on the same data, want to be notified.

Setting up ad-hoc communication between such components leads to an 
asynchronous dependency hell,
which can be avoided by a central state as a single source of truth.

So in this app, we have left the path of local state, and embraced *central state*.

### Central State

A widely used approach to *central* state is [Redux](#redux).

#### Redux

Redux is a popular implementation of the idea that [state](#state) is centralized
and all components have to subscribe to a state
[Provider](https://github.com/reactjs/react-redux/blob/master/docs/api.md#provider-store),
the store.

* If a component needs to update the state, it dispatches an action to the store.
* So-called *reducers* translate the action into a state update.
* And then the component can re-render.

[External documentation](https://github.com/reactjs/react-redux)
[Redux guide](http://redux.js.org/docs/api/index.html)

Using Redux requires a lot of extra code in actions and reducers,
which get separated from the components for which it is used.

However, there is a way to do it nicely.
There is a way of writing *idiomatic* redux, beautifully advocated by its creator,
Dan Abramov, in [30 videos](https://egghead.io/courses/getting-started-with-redux).
and that is by means of *ducks* (we call them *dux*).

[External documentation](https://github.com/erikras/ducks-modular-redux).

We divide the state into segments that are responsible for well-described tasks, such as

* tables of data from the server
* notification
* faceted browsing
* alternative presentations to the user
* window resizing

For every such task, we make a *duck* and put it into the *dux* directory.
Every duck manages a slice of the state has four sections:

* Actions: functions that create the actions whose dispatch will trigger a state update
* Reducer: a single function that translates all relevant actions into updates of its slice of the state
* Selectors: functions that grab data from the state in order to offer it to [connected](#connect) components
* Helpers: functions that contain additional logic, especially for selectors. See for an example
  [filter](Dux#filter). 

##### Merge

When a reducer transforms a state, it must happen in such a way that
* unaffected parts of the state do not change,
* all intermediate objects between the toplevel state and a changed leaf are fresh objects.

The handiest way to achieve this is to use 
[lodash merge](https://lodash.com/docs/#merge)
and
[lodash mergeWith](https://lodash.com/docs/#mergewith).
Most reducers use it.

These functions take an object, and transform it on the bases of an other object, precisely as needed for our purposes.
And if a little tweak is needed for certain keys of the state, `mergeWith()` provides a hook for that.
See [notify.js]({{site.appBase}}/dux/notify.js), the function `addItem()`.
There, if the old state has an array of items, and we need to append some items, we create a new array, consisting of the 
items of the orginal array, with the new items concatenated after them.

##### Connect

Redux and the ducks streamline very much how components deal with the centralized store.
The central function is Redux *connect()*.

[External documentation](https://github.com/reactjs/react-redux/blob/master/docs/api#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options)

If a component X needs state, we can create a *connected* component Xc from X.
Connected means: connected to the state.

```
Xc = connect(selectors, dispatchers)(X)
```

The new component Xc has extra props:

* data properties provided by the selector function `selectors`, which is a function that
  reads the global state and returns information of it as a props object.
* callback properties, provided by the function `dispatchers`.
  This returns a props object of action creator functions. Xc can use these
  where a callback is needed. When such a function is called, the action will be created
  and dispatched, which in turn will lead to a state change.
 
## Routing

React-router is a convenient library to manage the connection between
the url and the part of your app that should be active in response to it.

```
<Router history={browserHistory} >
  <Route path="/" component={App} >
    <Route path="about" component={About} />
    <Route path="table" component={ItemList} />
  </Route>
</Router>
```

The router and its routes are basically React
[components](#react-components).
But they come loaded with some extra behaviour.
Basically, when a route is rendered, it checks its `path` attribute with the current url.
If it matches, it renders itself. Otherwise, it does not mount, or if it was mounted,
it will unmount.

Several tricks are employed to make this a really useful library.
See the
[API docs](https://github.com/ReactTraining/react-router/blob/master/docs/API#route).
However, precisely because of this repeated mounting and unmounting
caused by routing events, the need arises for components to save their states.
Especially the ones with a costly state.
Here is another reason why local state becomes cumbersome.
With Redux, this is not a problem, because state is severed from components.

[External documentation](https://github.com/ReactTraining/react-router)