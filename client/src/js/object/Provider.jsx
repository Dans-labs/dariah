import React, { Component, PropTypes, Children } from 'react'

/**
 * @class
 * @classdesc
 * **stateless, context providing** {@link external:Component|Component}
 *
 * ## Providing information to all components.
 *
 * The Provider uses the {@link exteranl:Context|context} mechanism of React
 * to get some frequently used information across to all components
 * without requiring components to pass it through to children until it reaches
 * the destination components.
 *
 * All other components in this app are descendents of this Provider component.
 *
 * At the receiving side: we do not program our components to 
 * get the globals directly from context.
 * Instead, we enhance the receiving component by means of
 * {@link module:hoc.withContext|withContext}.
 * 
 * Note that we do not transfer arbitrary properties on context.
 * We only pass an object called `globals`.
 */
class Provider extends Component {
  getChildContext() {
    const {globals} = this.props;
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
