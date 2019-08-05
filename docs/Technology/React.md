# React

## Components

[React Components]({{reactDocs}}/react-component.html)
represent pieces of the web page and their functionality.

??? abstract "Building blocks"
    Components are organized hierarchically.

    Components can be parametrized by *properties*,
    which parents pass to children.

    A component acts as a template instruction to build a piece of DOM.

    Components can be programmed as classes or as functions.

In this app we distinguish between three *capability levels* of components.

??? abstract "Pure components"
    If a component knows how to build the DOM,
    purely on the basis of its properties and a static template,
    it can be (and will be) coded as a pure function.

    [Example: Stat](../Client/Components.md#stat)
    .

??? abstract "Simple stateful components"
    If a component needs to store the effects of the outside world
    (incoming server data or user interaction),
    it is stateful.

    If the component does not need
    [life cycle](#life-cycle)
    methods,
    it can be programmed as a pure function that
    will be connected to the
    [Redux](#redux)
    state by means of a simple binding:
    [connect](#connect)
    .

    [Example: Facet](../Client/Components.md#facet)
    .

??? abstract "Complex components"
    If a component has to handle the DOM after it has been constructed,
    e.g. apply some hiding and showing,
    fill a DIV with a third party component,
    or get data from the state in a sophisticated way,
    then we need to program the component as
    a class with so-called
    [life cycle methods](#life-cycle)
    .

    [Example: Bool3](../Client/Components.md#bool3)

    [Example: ListContainer](../Client/Components.md#listcontainer)
    .

## Processing concepts

React renders updates to
[components](#components)
very efficiently.

The
[render()](#life-cycle)
function is a template for a
[element fragment](#processing-concepts)
,
not the real
[DOM](#processing-concepts)
.

So, after an update, it is not costly to recompute the
fragment for that component completely,
because the DOM is not touched.

??? abstract "Reconciliation"
    Once the new fragment has been constructed, a clever, React-internal process
    called **reconciliation** is carried out.

    This computes the minimum number of
    update actions that have to be applied to the previous, real DOM incarnation of
    the component, to change it to match the new fragment.

??? abstract "MiniDOM"
    A compact internal representation of the
    [DOM](#processing-concepts)
    ,
    made from React
    *elements*.

    A React element is an instance of the React Element class. In **jsx** you can
    refer to a React element just by saying

    ```javascript
    <p>foo</p>
    ```

    React elements reflect HTML elements, but you can mingle them with React
    components, which look nearly the same in **jsx**:

    ```javascript
    <p>
        <NavLink to="/data" >bar</NavLink>
    </p>
    ```

??? abstract "DOM"
    DOM is an abbreviation for
    [Document Object Model]({{webApi}})
    .

    The DOM is
    what the browser gets in memory once it has loaded an HTML document. One of the
    principal tasks of JavaScript in the browser is to manipulate this DOM.

    The DOM and its API are exceedingly bloated, hence DOM operations are slow, no
    matter how fast JavaScript currently is.

    This is one of the reasons that a niche for React exists, with its
    [MiniDOM](#processing-concepts)
    .

??? abstract "Fragment"
    A
    [fragment]({{reactDocs}}/fragments.html)
    is a mixture of
    properly nested React elements and components.

    It is part of the React's toolkit to manage DOM manipulations efficiently.

    See
    [Reconciliation](#processing-concepts)
    .

## Property management

??? abstract "PropTypes"
    [PropTypes]({{reactDocs}}/typechecking-with-proptypes.html)
    are a means to
    do type checking for React Components is done by *PropTypes*.

    ??? details "Only in development mode"
        PropType checking in react only happens in development mode. React checks
        whether the named props that are passed to a component correspond to the props
        declared. In addition, it performs a basic type check on the values inside those
        props.

    ??? details "We don't use them"
        I find the `PropType` verbose, and no match for the otherwise clean and pleasant
        syntax of JSX.

        Additionally, most of the mistakes I make,
        do not reveal themselves as value type mistakes.

        On top it this all:
        declaring `PropTypes` forces you to repeat all the names of your properties,
        so is against the principle of
        *don't repeat yourself*.

        In this application, the property names are
        always clear in the code, either as

        ```javascript
        const MyComponent = ({ foo, bar )} => ...
        ```

        or as

        ```javascript
        const { props: { foo, bar} } = this
        ```

??? abstract "Context"
    [Context]({{reactDocs}}/context.html)
    is a React mechanism to pass data
    directly from ancestors to deep descendants.

    The React documentation considers
    context as a brittle part of itself, and warns against over-use.

    At the same time,
    [Redux](#redux)
    depends critically on it, so I consider it safe to use.

    But our code will not use it explicitly, only through Redux.

## Life cycle

The main function of a
[component](#components)
is to act as a template to
be `render()`ed.

But if there is additional work to be done, this can be
hooked up at various stages in the component's
[life cycle]({{reactDocs}}/react-component.html#the-component-lifecycle)
.

??? details "Stages"
    Most stages occur during (re)rendering,
    and there is a stage of construction and unmounting.

??? abstract "Constructor"
    When a
    [component](#components)
    is being
    [rendered]({{reactDocs}}/react-component.html#life-cycle)
    the
    [constructor]({{reactDocs}}/react-component.html#constructor)
    is the method
    to construct the corresponding React class.

    It will set up the [state](#state)
    .

??? abstract "componentDidMount"
    When a
    [component](#components)
    has been added to the DOM its method
    [componentDidMount]({{reactDocs}}/react-component.html#componentdidmount)
    will be called just after.

    This is the recommended time to fetch data for this
    component, if needed.

??? abstract "componentDidUpdate"
    When a
    [component](#components)
    has been updated due to receiving new
    properties, its method
    [componentDidUpdate]({{reactDocs}}/react-component.html#componentdidupdate)
    will be called just after.

    If DOM manipulations are needed to complete the
    rendering, this is the place to do it.

    ??? note "Not initially"
        This will not called upon initial rendering.

        So if the DOM manipulation is also needed initially,
        it is handy to write a function for it and call it in
        this method and in
        `componentDidMount()`
        .

??? abstract "componentWillMount"
    When a
    [component](#components)
    will be added to the DOM, its method
    [componentWillMount]({{reactDocs}}/react-component.html#componentwillmount)
    will be called just before.

    This is the first thing that happens after
    `constructor()`
    .

??? abstract "componentWillReceiveProps"
    When a
    [component](#components)
    is about to receive new props (as part of
    the update process),
    its method
    [componentWillReceiveProps]({{reactDocs}}/react-component.html#componentwillreceiveprops)
    will be called just before.

    The new props are passed with it,
    so that it is possible to execute actions dependent on whether pros have changed.

??? abstract "componentWillUnMount"
    When a
    [component](#components)
    will be removed from the DOM, its method
    [componentWillUnmount]({{reactDocs}}/react-component.html#componentwillunmount)
    will be called just before.

    If we want to save state, we can hook it up here.

??? abstract "render"
    The main function of a
    [component](#components)
    is to act as a template to be rendered.

    Its method
    [render]({{reactDocs}}/react-component.html#life-cycle)
    constructs the template to be rendered.

    During rendering the template will be used as a set of instructions
    to build a real DOM somewhere on the actual web page.

## Controlled Component

For elements that can receive user input (forms, inputs, etc.) there is the
option to handle input in a way controlled by React, and not by the default HTML
behaviour.

We say that those elements are used as
[controlled Components]({{reactDocs}}/forms.html)
.

??? explanation "Mechanism"
    So when a user clicks a checkbox, the check is not managed by the browser,
    but:

    *   a callback is called
    *   a parent component executes it
    *   the state gets updated
    *   the state change trickles down as property updates to child elements
    *   the checkbox in question is told by properties to be checked (or unchecked).

## State

There are two main reasons for a component to maintain
[state]({{reactDocs}}/state-and-lifecycle.html):

*   getting external data,
*   reacting to user events.

In both cases, something happens in the outside world that must be remembered.


??? abstract "Local State"
    Components remember events in their
    [state](#state)
    ,
    which only they can
    update.

    ??? explanation "Trickle down through properties"
        Components can compute derived data from their state and pass that as
        properties to their children.

        State updates trigger these computations automatically,
        and children whose properties are dependent on this state,
        are re-rendered automatically (and economically).

    ??? abstract "Vanilla React"
        The vanilla React way is that
        [components](#components)
        have their own
        state, which only they can modify through
        [setState]({{reactDocs}}/react-component.html#setstate)
        .

        Local state is very intuitive and leads to nice separation of concerns.

    ??? details "Lift state up"
        But even in React, state is not completely local, because in many cases several
        components need to have access to the state.

        The preferred way of dealing with that
        is to lift state up to the nearest common ancestor of all components
        that need the state.

        Descendants that must modify ancestral state are passed a
        callback to do so.

    ??? details "Drawback of local state"
        There comes a moment that components want to be informed of each other's
        state.

        Especially when components start modifying data from the server and
        saving it, other components that rely on the same data, want to be notified.

        Setting up ad-hoc communication between such components leads to an asynchronous
        dependency hell, which can be avoided by a central state as a single source of
        truth.

??? abstract "Central State"
    In this app, we have left the path of local state, and embraced *central
    state*.

    A widely used approach to *central* state is
    [Redux](#redux)
    .

## Redux

[Redux]({{redux}})
is a popular implementation of the
idea that
[state](#state)
is centralized and all components have to subscribe to
a state
[Provider]({{reactRedux}}/api/provider)
,
the store.

??? abstract "Mechanism"
    *   Components read slices of the state by means of *selectors*.
    *   If a component needs to update the state:
        *   it dispatches an *action* to the store;
        *   so-called *reducers* translate the action into state updates;
        *   then the component is triggered to re-render.

??? abstract "Code organization"
    Using Redux requires a lot of extra code in actions and reducers, which get
    separated from the components for which it is used.

    ??? abstract "Idiomatic Redux"
        However, there is a way to do it nicely.

        There is a way of writing *idiomatic* redux,
        beautifully advocated by its creator, Dan Abramov, in
        [30 videos]({{reduxVideos}})
        .

    ??? abstract "Dux"
        A next level of organization is
        [ducts (we call them dux)]({{ducks}})
        .

        We divide the state into segments that are responsible for well-described tasks,
        such as

        *   tables of data from the server
        *   notification
        *   faceted browsing
        *   alternative presentations to the user
        *   window resizing

        For every such task, we make a *duct* and put it into the *dux* directory.

        Every duct manages a slice of the state has four sections:

        ??? abstract "Actions"
            Functions that create the actions whose dispatch will trigger a state
            update.

        ??? abstract "Reducer"
            A single function that translates all relevant actions into updates
            of its slice of the state.

        ??? abstract "Selectors"
            Functions that grab data from the state in order to offer it to
            [connected](#connect)
            components.

        ??? abstract "Helpers"
            Functions that contain additional logic, especially for selectors.

            See for an example
            [filters]({{appBase}}/dux/filters.js)
            .

## Merge

When a reducer transforms a state, it must happen in such a way that

*   unaffected parts of the state do not change,
*   all intermediate objects between the top-level state and a changed leaf are
    fresh objects.

??? abstract "Merge tools"
    ??? caution "lodash merge/mergeWith"
        A candidate to achieve this is to use
        [lodash merge]({{lodash}}#merge)
        and
        [lodash mergeWith]({{lodash}}#mergeWith)
        .

        The hint
        to use Lodash functions for this is given
        [here]({{redux}}/docs/recipes/reducers/UpdatingNormalizedData.html)
        .

        But
        [tests]({{testBase}}/merge.js)
        have shown that not in all cases equal parts remained identical objects.

    ??? abstract "immutability helper"
        We ended up using
        [Immutability-Helper]({{immutability}})
        in all cases.

        Its function `update()` takes an object,
        and transforms it on the basis of an other object,
        precisely as needed for our purposes.

        See the code in the
        [notes duct]({{appBase}}/dux/notes.js)
        .

## Select

The opposite of merging data into the state is selecting data from the state.

??? abstract "Selectors"
    Our components need bits and pieces of the state in order to know what they
    should render.

    To this end, we write *selector* functions, that return suitable
    slices of the state.

??? abstract "computations"
    In some cases, selecting the data requires quite a bit of
    computation.

    ??? example "Normalized data"
        When the data in the state is *normalized* and the
        component needs denormalized data.

    ??? example "Faceted browsing"
        The items to show must be computed from
        the list of items in the table slice of the state,
        combined with the current filter settings from the filter slice of the
        state.

??? caution "Performance problem"
    Here we encounter a potential performance problem.

    Sometimes components will be re-rendered
    even if their piece of the state has not changed.

    Or, if it has changed,
    it is often the case that the derived data that the component needs,
    has not changed.

    In general, if we do nothing about it,
    the computations in selectors will be executed more often than necessary.

??? note "Solution: memoization"
    The method to deal with this is memoization.

    ??? abstract "Reselect"
        The redux documentation suggests the
        [reselect]({{reactReselect}})
        library
        [here]({{redux}}/docs/recipes/ComputingDerivedData.html)
        .

        *Reselect* facilitates the fabrication of selectors
        that remember their last output in combination with the parameters passed to it.

        If such a selector is called repeatedly with the same arguments,
        it will fetch the computed result from its cache
        the second time it is called and then onwards.

        We use this library only to implement a function that
        [combines selectors](../Client/Lib.md#utils)
        .

    ??? abstract "Homegrown memoization"
        However, we will also encounter cases where we need more complete memoization,
        so that functions have a cache for their results given multiple sets of
        parameters.

        See
        [memo](../Client/Lib.md#memo)
        .

## Connect

Redux and the dux streamline very much how components deal with the centralized
store.

The central function is Redux
[connect]({{reactRedux}}/docs/api#connect)
.

??? abstract "Connecting components to the state"
    If a component `X` needs state, we can create a *connected* component `Xc` from `X`.

    Connected means: connected to the state.

    ```javascript
    Xc = connect(selectors, dispatchers)(X)
    ```

    The new component `Xc` has extra props:

    ??? explanation "selectors"
        Data provided by the function `selectors`,
        which is a function that reads the global state and
        returns information of it as a props object.

    ??? explanation "dispatchers"
        Callback provided by the function `dispatchers`.

        This returns a props object of action creator functions.
        `Xc` can use these where a callback is needed.

        When such a function is called,
        the action will be created and dispatched,
        which in turn will lead to a state change.

    See also
    [Architecture](../Concepts/Architecture.md#overview)
    .

## Routing

[React-router]({{reactRouter}})
is a convenient library to manage the
connection between the URL and the part of your app that should be active in
response to it.

??? details "Routers as components"
    The router and its routes are basically React
    [components](#components)
    .

    But they come loaded with some extra behaviour.

    Basically, when a route is rendered,
    it checks its `path` attribute with the current URL.

    If it matches, it renders itself.

    Otherwise, it does not mount,
    or if it was mounted,
    it will unmount.

??? details "API and State"
    Several tricks are employed to make this a really useful library. See the
    [API docs]({{reactRouterApi}})
    .

    However, precisely because of this repeated mounting and unmounting
    caused by routing events,
    the need arises for components to save their states,
    especially the ones with a costly state.

    Here is another reason why local state becomes cumbersome.

    With Redux, this is not a problem,
    because state is severed from the components.
