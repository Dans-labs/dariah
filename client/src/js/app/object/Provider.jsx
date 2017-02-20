import React, { Component, PropTypes, Children } from 'react'
import Store from 'store.js';

/**
 * @class
 * @classdesc
 * **stateless, context providing** {@link external:Component|Component}
 *
 * ## Providing information to all components
 *
 * It is tempting to use javascript's
 * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this|global object/window}
 * to store globals.
 * However, we will not do so, because that makes
 * the data accessible to all the javascript that happens to be injected
 * in the current browsing episode.
 *
 * Instead we use the {@link external:context|context} mechanism of React
 * to pass global information around among all the components of the app.
 * This information will then not spread further than the components.
 *
 * Because the {@link external:context|context} travels from components to descendants,
 * we need to make this data available in the ultimate ancestor of all components.
 *
 * Context in React is organized as a providers/receiver scheme.
 * The provider defines, constructs, and declares context props.
 * Every descendant component can become *context* receiver by *subscribing* as-it-were
 * to those declared context props.
 * Context properties pass directly from provider to receiver,
 * without intervening components having to do any work.
 *
 * This app's Provider sits at the top of the component tree and provides the context prop
 * `globals` (which is an object).
 *
 * At the receiving side: we do not directly program our components to 
 * get the globals prop from context.
 * Instead, we enhance the receiving component by means of
 * {@link module:hoc.withContext|withContext}.
 * Once we work with the enhanced component, we may assume that it has an
 * ordinary property `globals`. 
 * 
 * Inside `globals`, we provide the following items:
 *
 * ### Store
 *
 * The {@link Store} is a container of component states.
 * We use it for components with a costly state, that should be preserved
 * when components are swapped in and out from
 * the user interface.
 * 
 * See more about the why and how of the store in
 * {@link external:StatePolicy|State Policy}
 * and
 * {@link module:hoc.saveState|saveState}.
 *
 * The {@link Store} is not a
 * {@link external:Component|component},
 * but an ordinary class. It will have one instance, which will be created in the
 * {@link external:constructor|constructor()} of Provider.
 *
 * ### Notification
 *
 * We want one place on the interface for displaying notifications.
 * Every component that feels the need to send a notification should be able to find
 * the notification component.
 *
 * {@link Notification} is a {@link external:Component|component},
 * but it has not yet been constructed at this point.
 * It will be created as a sub component of {@link App}.
 * When that happens, the new {@link Notification} object will
 * inject assign itself to `globals.notification.component`.
 */
class Provider extends Component {
/**
 * Here we declare Provider as a context provider,
 * by writing a method that computes context properties and return them.
 * This is the stuff that other components can receive through the *context*.
 *
 * @method
 */
  getChildContext() {
    const globals = {
      store: new Store(),
      notification: {component: null},
      userInfo: new Map(),
      usersMap: new Map(),
      countriesMap: new Map(),
      editStatus: {},
      delCallback: {},
    };
    return {globals}
  }
  render() {
    return Children.only(this.props.children);
  }
}

Provider.childContextTypes = {
  globals: PropTypes.object.isRequired,
}

export default Provider
