import React, { Component, PropTypes, Children } from 'react'
import Store from '../helpers/Store.js';

/**
 * @class
 * @classdesc
 * **stateless, context providing** {@link external:Component|Component}
 *
 * ## Providing information to all components
 *
 * It is tempting to use the javascript `window` object to store globals
 * However, we will not do so, because that makes
 * the data accessible to all the javascript that happens to be injected in the current browsing episode.
 *
 * Instead we use the  mechanism of React to pass global information
 * around within all the components of the app.
 * This information will then not spread further than the components.
 *
 * Because the *context* data travels from parent to children and then grandchildren, we need
 * to make this data available in the ultimate ancestor of all components.
 * The {@link external:context|context} device of React
 * consists of a context provider and context receivers.
 * The provider defines, constructs, and declares properties on *context*.
 * Every component can become *context* receiver by *subscribing* in a way to
 * those declared context properties.
 * Context properties pass directly from provider to receiver,
 * without intervening components having to do any work.
 *
 * This Provider sits at the top of the component tree and provides the property
 * `globals` (which is an object), on *context*.
 *
 * At the receiving side: we do not program our components to 
 * get the globals directly from context.
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
 * We use it for components with a costly state, that should be preserved when components are swapped in and out from
 * the user interface.
 * 
 * See more about the why and how of the store in
 * {@link external:StatePolicy|State Policy}
 * and
 * {@link module:hoc.saveState|saveState}.
 *
 * The {@link Store} is not a React
 * {@link external:Component|component},
 * but an ordinary
 * class. It will have one instance, which will be created in the
 * {@link external:constructor|constructor()} of Provider.
 *
 * ### Notification
 *
 * We want one place on the interface for displaying notifications.
 * Every component that feels the need send a notification should be able to find
 * the notification component.
 *
 * {@link Notification} is a React 
 * {@link external:Component|component},
 * but it is not available just here.
 * It will be created as a sub component of {@link App}.
 * When that happens, the new {@link Notification} object will
 * inject assign itself to `globals.notification.component`.
 */
class Provider extends Component {
  getChildContext() {
    const globals = {
      store: new Store(),
      notification: {component: null},
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
