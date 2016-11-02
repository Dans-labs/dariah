import React, { Component, PropTypes, Children } from 'react'

/** @file
 *
 * # Higher Order Components
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
 */

/** Wraps a component to provide it with context.
 * @func
 * @param {Component} ComponentInner the incoming component (the wrappee)
 * @returns {Component} ComponentOuter the enhanced component  (the wrapper)
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

/** Wraps a component to let it preserve its state across unmounts.
 *
 * Connnects ComponentInner with a global object called {@link Store} (provided by means
 * of {@link withContext}).
 * This one works by extending the `ComponentInner` class, and adding functionality
 * to its `constructor()` and `componentWillUnmount()` methods.
 * In order to use the {@link Store} object, a component needs to register itself with
 * a key and an initial state value.
 * The `initialState` can be passed as a concrete object, or as a function
 * that computes the `initialState` on the basis of props.
 * (See {@link FilterCompute})
 *
 * @func
 * @param {Component} ComponentInner the incoming component (the wrappee)
 * @param {string} key identifier to find the saved state back in the state store
 * @param {initialState} object the state to start with 
 * @returns {Component} ComponentOuter the enhanced component  (the wrapper)
 *
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

