import React from 'react'
import { Link } from 'react-router'

/**
 * **purely functional** {@link external:Component|Component}
 *
 * Displays a navigation link that is sensitive to routing.
 *
 * @class
 * @param {Object} props Incoming properties to be passed to the underlying <Link> component.
 * @returns {Fragment}
 */
const NavLink = props => <Link {...props} activeClassName="active" />

export default NavLink
