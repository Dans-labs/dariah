import React, { Component, PropTypes, Children } from 'react'

/**
 * # Higher Order Components
 *
 * React embraces a functional paradigm, where you enhance existing 
 * {@link external:Component|components}
 * by composition rather than by class extension. 
 * Put otherwise, you write an enhancer or *decorator* function, that 
 * takes a component as input and returns it wrapped inside another
 * so that the new thing as an extra piece of functionality.
 *
 * Especially the *pure*
 * {@link external:Component|react components}
 * that do not use life-cycle methods are very suitable
 * to enhance.
 * If a react component makes essential use of a life cycle method, it is easier
 * to enhance it by class extension.
 * But even that can be coded as function composition, as 
 * {@link saveState} shows.
 *
 * <img src="/api/file/tech/docs/design/design.003.jpeg" width="800"/>
 *
 * @module hoc
 */

/**
 * A set of functional programming tools, geared to React.
 * The idea is to enhance simple components by functional composition.
 * I am not (yet) using this library, because my cases were really simple.
 * See
 * {@link withContext} and {@link setState}
 * .
 *
 * @external Recompose
 * @see {@link https://github.com/acdlite/recompose|Recompose}
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
 * Wraps
 * {@link external:Component|component}
 * to provide it with context.
 *
 * The resulting component subscribes to
 * {@link external:context|context}
 * and passes the content of `context.globals` (only the `globals` !) 
 * to the origianal component as props.
 *
 * These properties are then *magically* present in the methods of the
 * original component..
 *
 * @function
 * @param {Component} ComponentInner - the incoming component (the wrappee)
 * @returns {Component} ComponentOuter - the enhanced component (the wrapper)
 *
 */
export const withContext = (ComponentInner) => {
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

/**
 * Wraps a
 * {@link external:Component|component}
 * to let it preserve its state across unmounts.
 *
 * We assume that the original component can access the
 * {@link globals}
 * through
 * {@link external:context|context}
 * by having been enhanced by 
 * {@link withContext}
 * .
 * We assume that
 * {@link Provider}
 * has created a
 * {@link Store}
 * in
 * {@link globals}
 * .
 *
 * Now the resulting component is a subclass of the original, 
 * with enhanced
 * {@link external:constructor|constructor()}
 * and
 * {@link external:componentWillMount|componentWillMount()}
 * methods.
 *
 * The resulting component will retrieve an existing state, coming from
 * the
 * {@link Store}
 * ,
 * before mounting. If there is no such state, the `initialState`
 * parameter will be used.
 * 
 * And when the component is destroyed, it will save its state in the
 * {@link Store}
 * .
 *
 * @function
 * @param {Component} ComponentInner - the incoming component (the wrappee)
 * @param {string} key - identifier to find the saved state back in the state store
 * @param {initialState} object - the state to start with 
 * @returns {Component} ComponentOuter - the enhanced component (the wrapper)
 *
 * 
 */
export const saveState = (ComponentInner, key, initialState) => {
  const ComponentOuter = class extends ComponentInner {
    constructor(props) {
      super(props);
      const store = props.store;
      this.key = key;
      store.load(this, key, ((typeof initialState) == 'function')?initialState(props):initialState)
    }
    componentWillUnmount() {
      const store = this.props.store
      store.save(this, this.key);
    }
  }
  return ComponentOuter
}
