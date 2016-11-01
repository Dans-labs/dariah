import React, { Component, PropTypes, Children } from 'react'

/* HIGHER ORDER COMPONENTS
 *
 * React embraces a functional paradigm, where you enhance existing functionality
 * by composition rather than by class extension. 
 * Put otherwise, you write an enhancer as a decorator function, that 
 * takes a component function as input and returns that component wrapped in a function
 * that can do extra things.
 * Especially the react components that do not use life-cycle methods are very suitable
 * to enhance.
 * If a react component makes essential use of a life cycle method, it can still be
 * useful to enhance it by class extension. But even that can be coded as function
 * composition.
 *
 * This modules contains the following enhancers:
 *
 * withContext(ComponentInner) => ComponentOuter
 * saveState(ComponentInner, key, initialState) => ComponentOuter
 *
 */

/*
 * withContext(ComponentInner) => ComponentOuter
 *
 * Supplies context to ComponentInner. 
 * ComponentOuter subscribes to context (a React mechanism to pass data directly
 * from ancestors to deep descendants), and passes the content of context.globals 
 * to ComponentInner as props.
 * These properties are then "magically" present in the methods of ComponentInner.
 * By wrapping the syntax of the React context mechanism into this enhancer, we
 * can survive API changes more easily.
 * The [React documentation](https://facebook.github.io/react/docs/context.html)
 * considers context as a brittle part of itself, and warns
 * against over-use. At the same time, react-redux, a very popular React extension,
 * depends critically on it.
 * So, our withContext enhancer is the only place in the code where context surfaces.
 */

const withContext = (ComponentInner) => {
  const ComponentOuter = class extends Component {
    render() {
      const newProps = {...this.props, ...this.context.globals};
      return <ComponentInner {...newProps}/>
    }
  }
  ComponentOuter.contextTypes = {
    globals: PropTypes.object,
  }
  return ComponentOuter
}

/*
 * saveState(ComponentInner, key, initialState) => ComponentOuter
 *
 * Up till now I eschew Redux. I prefer the vamilla react way, with small components
 * and small local state, instead of a centralized store for the state.
 * Using redux requires a lot of extra code in actions and reducers,
 * that get separated from the components for which it is used.
 * But local state has a pitfall: when a component is swapped out from the interface
 * (because of routing), its state is lost. So if you have applied a lot of filtersettings,
 * or have fetched a big table of data, and you switch to /doc/about and back,
 * a lot of ui-work and fetch-work must be done again, by you and the client and the server.
 * That is why we give components the option to save state when they unmount, and to
 * retrieve it when they mount.
 *
 * The enhancer connnects ComponentInner with a global object called Store (provided by means
 * of withContext above).
 * This one works by extending the ComponentInner class, and adding functionality
 * to its constructor() and componentWillUnmount() methods.
 * In order to use the Store object, a component needs to register itself with
 * a key and an initial state value. (See Store).
 * The initialState can be passed to the enhancer as a concrete object, or as a function
 * that computes the initialState on the basis of props.
 * (See FilterCompute)
 * 
 */

const saveState = (ComponentInner, key, initialState) => {
  const ComponentOuter = class extends ComponentInner {
    constructor(props) {
      super(props);
      const store = props.store;
      this.key = key;
      store.register(this, key, ((typeof initialState) == 'function')?initialState(props):initialState)
    }
    componentWillUnmount() {
      const store = this.props.store
      store.save(this.key);
    }
  }
  return ComponentOuter
}

export { withContext, saveState }

