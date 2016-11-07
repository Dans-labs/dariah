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
 * {@link withContext} and {@link setState}.
 *
 * @external Recompose
 * @see {@link https://github.com/acdlite/recompose|Recompose}
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
 * to let it preserve its state across unmounts and certain property updates.
 *
 * We assume that the original component can access the
 * {@link globals} through {@link external:context|context}
 * by having been enhanced by {@link withContext}.
 * We assume that {@link Provider} has created a {@link Store} in {@link globals}.
 *
 * Now the resulting component is a subclass of the original, 
 * with enhanced
 * {@link external:constructor|constructor()},
 * {@link external:componentWillReceiveProps|componentWillReceiveProps()}
 * and
 * {@link external:componentWillMount|componentWillMount()}
 * methods.
 *
 * The resulting component will retrieve an existing state, coming from
 * the {@link Store}, before mounting.
 * If there is no such state, the `initialState` parameter will be used.
 * 
 * And when the component is destroyed, it will save its state in the
 * {@link Store}.
 *
 * One subtlety, though.
 * Sometimes a component is reused without being unmounted and reconstructed, but by just
 * getting new props.
 * For example, the {@link DocMd} component has a property `docName`.
 * When the user browses from one document to another, the router will pass a new value
 * for `docName` to the existing component, rather than destroying it and building it from scratch.
 * Now {@link DocMd} uses the stateful {@link Alternatives}  component to give the user the choice
 * to view the MarkDown source or the formatted version.
 * When the user switches docs, also this {@link Alternatives} just get new props instead of being 
 * unmounted and reconstructed.
 * So our method of saving state should also apply when properties change.
 *
 * But not all properties.
 * We only look at the `tag` property on the original component.
 * The `tag` property is used in two ways:
 *
 * * it will be part of the key under which the state will be saved
 * * if it changes, the present state will be saved (with the old value of `tag` as part of the key)
 * * and a previously saved state (with the new value of `tag`) will be loaded. 
 *
 * If there is no property `tag` on the orginial component, we take it to be the empty string.
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
    setKey(tag) {
      this.stateKey = this.key + ((tag==null)?'':`.${tag}`);
    }
    load() {
      this.store.load(this, this.stateKey, ((typeof this.initialState) == 'function')?this.initialState(this.props):this.initialState)
    }
    save() {
      this.store.save(this, this.stateKey);
    }
    constructor(props) {
      super(props);
      const { store, tag } = props;
      this.store = store;
      this.tag = tag;
      this.key = key;
      this.initialState = initialState;
      this.setKey(tag);
      this.load();
    }
    componentWillUnmount() {
      this.save()
    }
    componentWillReceiveProps(newProps) {
      const { oldTag } = this.props;
      const { tag } = newProps;
      if (oldTag !== tag) {
        this.save();
        this.setKey(tag);
        this.load();
      }
    }
  }
  return ComponentOuter
}
