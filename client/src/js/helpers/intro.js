/**
 * @file
 * Documentation references.
 *
 * This file does not contain javascript code.
 */

/**
 * ES6 datastructure to contain key-value pairs.
 * One could also use plain objects for this, but Maps are cleaner in a number of respects.
 *
 * @external Map
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map|Map}
 */

/**
 * @typedef Map
 * @type {external:Map}
 */

/**
 * ES6 datastructure to contain the result of an asynchronous function.
 * It has as state that is either *pending*, *failed* or *resolved*. 
 * Once the state is *failed* or *resolved*, it will not change anymore.
 * If the state is *resolved*, the return value is available, and will not change anymore.
 * The typical way to use a promise is
 *
 * ```
 *   const dataStore = {};
 *   const getData = url => fetch(url); 
 *   // assuming that fetch returns a Promise, we can then say
 *   getData('/api/blob/23').
 *   then(
 *     blob => {dataStore.url = blob},
 *     error => console.log(error),
 *   )
 * ```
 *
 * @external Promise
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise|Promise}
 */

/**
 * @typedef Promise
 * @type {external:Promise}
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
 * @typedef Component
 * @type {external:Component}
 */

/**
 * Type checking for React
 * {@link Component|components}
 * .
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
 * {@link withContext}
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
 * ## Local with backup
 * This app manages state locally through
 * {@link external:setState|setState()}
 * but with the enhancement that components can save state in a global store.
 * 
 * So, we do not adopt the full
 * {@link external:Redux|Redux}
 * approach, but
 * we borrow just one idea from it: a central store of state.
 *
 * Our components will use that store not for normal state updates, but only
 * when they
 * {@link external:componentWillUnmount|unmount}
 * or
 * {@link external:constructor|mount}
 *
 * ## Why local state?
 * We want to keep the pieces of business logic close to the component that deals with them.
 * We want to avoid the extra book keeping of actions and labels that  
 * {@link external:Redux|Redux}
 * requires.
 *
 * ## Why back up state?
 * Not all components can be kept on the interface all the time.
 * But stateful components may harbour costly state: big data tables from a server,
 * or lots of user interaction events, e.g. the faceted filter settings.
 * When the user routes back to a component with state, we want to restore
 * the last state before the user left the component.
 *
 * @external StatePolicy
 */

/**
 * @typedef {Object} Source
 * @property {string} type - either
 * * `db` (mongo db access, results delivered as json)
 * * `json` (file contents delivered as json)  
 * @property {string} path - the remaining path to the controller function on the server
 * @property {string} branch - the subobject of the requesting component's state that will
 * receive the fetched data
 */

/**
 * @typedef {Object} Result
 * @property {string} data - the actual payload of the data transfer; this is what the component needs
 * to have to do its work
 * @property {Message[]} messages - messages issued at the server side when carrying out the request
 * @property {boolean} good - whether the server has successfully carried out the request
 */

/**
 * @typedef {Object} Message
 * @property {string} kind - one of the values `error`, `warning`, `good`, `special`, `info`
 * @property {string} text - the plain text of the message
 * @property {number} busy - an number that will be added by {@link getData}: +1 at the start of a request,
 * -1 when the waiting is over; the {@link Notification} object can use `busy` for displaying progress
 * indication. **NB:** The server does not supply the `busy` attribute, only {@link getData} does.
 */

