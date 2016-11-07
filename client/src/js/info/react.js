/**
 * React Documentation references.
 *
 * This file does not contain javascript code.
 *
 * @module React
 */

/**
 * ## React Components
 *
 * React components represent pieces of the web page and their functionality.
 * Components are organized hierarchically.
 * Components can be parametrized by *properties*, which parents pass to children.
 * A component acts as a template instruction to build a piece of DOM.
 *
 * Components can be programmed as classes or as functions.
 * In both cases they can be given the
 * {@link external:PropTypes|types}. 
 * of their incoming properties as metadata.
 *
 * In this app we distinguish between three *capability levels* of components.
 *
 * ## Pure components
 * If a component knows how to build the DOM, purely on the basis of its properties and
 * a static template, it can be (and will be) coded as a pure function.
 *
 * We put all these components in a directory called **pure**.
 *
 * ## DOM-manipulating components
 * If a component has to handle the DOM after it has been constructed,
 * e.g. apply some hiding and showing, fill a div with a third party component, 
 * then we need to program the component as a class with so-called
 * {@link external:LifeCycle| life cycle methods}.
 *
 * We put all these components in a directory called **object**.
 *
 * ## Stateful components
 * If a component maintains a **state**, it is stateful.
 * We need to program this as a class, like in the previous case.
 * Stateful components may or may not manipulate the DOM.
 *
 * There are two main reasons for a component to maintain state:
 *
 * * getting external data
 * * reacting to user events
 *
 * In both cases, something happens in the outside world that must be remembered.
 * Components remember these things in their state, which only they can update.
 * They can compute derived data from their state and pass that as properties
 * to their children.
 * State updates trigger these computations automatically, and children
 * whose properties are dependent on this state, are rerendered automatically
 * (and economically). 
 *
 * We put all these components in a directory called **state**.
 *
 * @example <caption>pure component</caption>
 * const Widget = ({shape, children}) => <div className={shape}>{children}</div>
 *
 * @example <caption>object component (DOM)</caption>
 * class Widget extends Component {
 *  render() {
 *    const {typed} = this.props;
 *    return (
 *      <input ref="user" type="text" value={typed}/>
 *    )
 *  }
 *  componentDidUpdate() {
 *    this.refs.user.value = this.props.typed
 * }
 *
 * @example <caption>stateful component</caption>
 * class Widget extends Component {
 *  constructor() {
 *    super();
 *    this.state = {data: []}
 *  }
 *  render() {
 *    return (
 *      <div>
 *      {this.state.data.map((line, i) => <p key={i}>{line}</p>)
 *      </div>
 *    )
 *  }
 *  componentDidMount() {
 *    const newData = getData();
 *    this.setState(data: newData);
 *  }
 * }
 *
 * @external Component
 * @see {@link https://facebook.github.io/react/docs/react-component.html|Component}
 */

/**
 * @global
 * @typedef Component
 * @type {external:Component}
 */

/**
 * React renders updates to
 * {@link external:components|components}
 * very efficiently.
 * The 
 * {@link external:render|render()}
 * function is a template for a 
 * {@link external:Fragment|element fragment}, not the real 
 * {@link external:DOM|DOM}.
 * So, after an update, it is not costly to recompute the fragment
 * for that component completely, because the DOM is not touched.
 *
 * Once the new fragment has been constructed, a clever, React-internal
 * process called **reconciliation** is carried out, which computes the minimum
 * number of update actions that have to be applied to the previous, real DOM
 * incarnation of the component, to change it to match the new fragment.
 *
 * As an example where we rely on the efficiency of reconciliation,
 * see {@link ByValue}.
 *
 * @external Reconciliation
 */

/**
 * A compact internal representation of the
 * {@link external:DOM}, made from React *elements*.
 *
 * A React element is an instance of the React Element class.
 * In **jsx** you can refer to a React element just by saying
 * ```
 *   <p>foo</p>
 *```
 * React elements reflect HTML elements, but you can mingle them 
 * with React 
 * {@link external:component|components}, which look nearly the same in **jsx**:
 *
 * ```
 *  <p>
 *    <NavLink to="/data">bar</NavLink>
 *  </p>
 *```
 *
 * A fragment is such a mixture of properly nested React elements and components.
 * It is part of the React's toolkit to manage DOM manipulations efficiently.
 *
 * See {@link external:Reconciliation|Reconciliation}.
 *
 * @external Fragment
 * @see {@link https://facebook.github.io/react/docs/rendering-elements.html|Fragments}
 */

/**
 * @global
 * @typedef Fragment
 * @type {external:Fragment}
 */

/**
 * Type checking for React
 * {@link Component|components}.
 *
 * Proptype checking in react only happens in development mode.
 * React checks whether the named props that are passed to a component
 * correspond to the props declared. In addition, it performs a basic type check on the values
 * inside those props.
 *
 * I find the `PropType` syntax verbose, and no match for the otherwise clean and pleasant
 * syntax of JSX. Additionally, most of the mistakes I make, do not reveal themselves as value
 * type mistakes. On top it this all: declaring `PropTypes` forcres you to repeat all
 * the names of your proptypes, so is against the principle of *do't repeat yourself*.
 * In this application, the property names are always clear in the code, either as
 *
 * ```
 * const MyComponent = ({foo, bar)} => ... 
 * ```
 *
 * or as
 *
 * ```
 * const {foo, bar} = this.props
 * ```
 *
 * Moreover, I describe the types and meaning of the properties also in nearby *jsdoc* comments.
 * That should suffice.
 *
 * @external PropTypes
 * @see {@link https://facebook.github.io/react/docs/typechecking-with-proptypes.html|PropTypes}
 */

/**
 * React mechanism to pass data directly  from ancestors to deep descendants.
 * The React documentation
 * considers context as a brittle part of itself, and warns
 * against over-use. At the same time,
 * {@link external:Redux|Redux}
 * depends critically on it, so I consider it safe to use.
 *
 * By wrapping the syntax of the React context mechanism into an enhancer, we
 * can survive API changes more easily.
 * See
 * {@link module:hoc.withContext|withContext}
 * .
 *
 * @external context
 * @see {@link https://facebook.github.io/react/docs/context.html|context}
 */

/**
 * The main function of a
 * {@link external:Component|component}
 * is to act as a template to be
 * {@link external:render|rendered}
 * .
 * But if there is additional work to be done, this can be hooked up at various
 * stages in the component's lifecycle.
 * Most stages occur during (re)rendering, and there is a stage of construction and unmounting.
 *
 * @external LifeCycle
 * @see {@link https://facebook.github.io/react/docs/react-component.html#the-component-lifecycle|Lifecycle Methods}
 */

/**
 * When a
 * {@link external:Component|component}
 * is being
 * {@link https://facebook.github.io/react/docs/react-component.html#render|rendered}
 * this is the method to construct the corresponding React class.
 * It will set up the state.
 *
 * @external constructor
 * @see {@link https://facebook.github.io/react/docs/react-component.html#constructor|constructor()}
 */

/**
 * When a
 * {@link external:Component|component}
 * has been added to the DOM
 * this method will be called just after.
 * This is the recommended time to fetch data for this component, if needed.
 *
 * @external componentDidMount
 * @see {@link https://facebook.github.io/react/docs/react-component.html#componentdidmount|componentDidMount()}
 */

/**
 * When a
 * {@link external:Component|component}
 * has been updated due to receiving new properties,
 * this method will be called just after.
 * If DOM manipulations are needed to complete the rendering, this is 
 * the place to do it. 
 *
 * *NB:** This will not called upon initial rendering, so if the DOM manipulation
 * is also needed initially, it is handy to write a function for it and
 * call it in this method and in {@link external:componentDidMount:componentDidMount()}.
 *
 * @external componentDidUpdate
 * @see {@link https://facebook.github.io/react/docs/react-component.html#componentdidupdate|componentDidUpdate()}
 */

/**
 * When a
 * {@link external:Component|component}
 * will be added to the DOM, 
 * this method will be called just before.
 * This is the first thing that happens after {@link external:constructor|constructor()}.
 *
 * @external componentWillMount
 * @see {@link https://facebook.github.io/react/docs/react-component.html#componentwillmount|componentWillMount()}
 */

/**
 * When a
 * {@link external:Component|component}
 * is about to receive new props (as part of the update process),
 * this method will be called just before.
 * The new props are passed with it, so that it is possible to execute
 * actions dependent on whether pros have changed.
 *
 *
 * @external componentWillReceiveProps
 * @see {@link https://facebook.github.io/react/docs/react-component.html#componentwillreceiveprops|componentWillReceiveProps()}
 */

/**
 * When a
 * {@link external:Component|component}
 * will be removed from the DOM, 
 * this method will be called just before.
 * If we want to save state, we can hook it up here.
 *
 * @external componentWillUnmount
 * @see {@link https://facebook.github.io/react/docs/react-component.html#componentwillunmount|componentWillUnmount()}
 */

/**
 * The main function of a
 * {@link external:Component|component}
 * is to act as a template to be rendered.
 * During rendering the template will be used as a set of instructions to build a real DOM
 * somewhere on the actual web page.
 *
 * @external render
 * @see {@link https://facebook.github.io/react/docs/react-component.html#render|render()}
 */

/**
 * For elements that can receive user input (forms, inputs, etc) there is the option
 * to handle input in a way controlled by React, and not by the default HTML behaviour.
 *
 * So when a user clicks a checkbox, the check is not managed by the browser,
 * but a callback is called, a parent component executes it, state gets updated, state changes
 * trickle down as property updates to child elements, and the checkbox in question is told
 * to be checked (or unchecked).
 *
 * @external ControlledComponent
 * @see {@link https://facebook.github.io/react/docs/forms.html|Forms}
 */

/**
 * ## Local State
 *
 * The vanilla React way is that
 * {@link external:Component|components}
 * have their own state, which only
 * they can modify through
 * {@link external:setState|setState()}
 * .
 *
 * But even in React, state is not completely local, because in many
 * cases several components need to have access to the state.
 * The preferred way of dealing with that is to lift state up to the nearest
 * common ancestor of all components that need the state.
 * Descendants that must modify ancestral state are passed a callback to do so.
 *
 * A widely used approach to *central* state is {@link external:Redux|Redux}
 * ,
 * our alternative is
 * {@link external:StatePolicy|local state plus backup}
 * .
 *
 * @external setState
 * @see {@link https://facebook.github.io/react/docs/react-component.html#setstate|setState()}
 */

/**
 * ## Central State
 *
 * This is a popular implementation of the idea that state is centralized
 * and all components have to subscribe to a state provider, the store.
 *
 * * If a component needs to update the state, it dispatches an action to the store.
 * * So-called *reducers* translate the action into a state update. 
 * * And then the component can re-render.
 *
 * Using Redux requires a lot of extra code in actions and reducers,
 * which get separated from the components for which it is used.
 *
 * The plain React alternative is
 * {@link external:setState|setState()}
 * ,
 * our alternative is
 * {@link external:StatePolicy|local state plus backup}
 * .
 *
 * @external Redux
 * @see {@link https://github.com/reactjs/react-redux|Redux}
 */

/**
 * ## Routing
 *
 * React-router is a convenient library to manage the connection between 
 * the url and the part of your app that should be active in response to it.
 *
 * ```
 * <Router history={browserHistory}>
 *   <Route path="/" component={App}>
 *     <Route path="about" component={About} />
 *     <Route path="contribs" component={Contribs} />
 *   </Route>
 * </Router>
 * ```
 *
 * The router and its routes are basically React 
 * {@link external:Component|components}.
 * But they come loaded with some extra behaviour.
 * Basically, when a route is rendered, it checks its `path` attribute with the current url.
 * If it matches, it renders itself. Otherwise, it does not mount, or if it was mounted,
 * it will unmount.
 *
 * Several tricks are employed to make this a really useful library.
 * See
 * {@link https://github.com/ReactTraining/react-router/blob/master/docs/API.md#route|API documentation}.
 * However, precisely because of this repeated mounting and unmounting
 * caused by routing events, the need arises for components to save their states.
 * Especially the ones with a costly state.
 * See the remarks on the {@link external:StatePolicy|state policy}.
 *
 * @external Routing
 * @see {@link https://github.com/ReactTraining/react-router}
 */

