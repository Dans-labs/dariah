import React, {Component} from 'react'
import { Link } from 'react-router'

/**
 * @class
 * @classdesc
 * **purely functional** {@link external:Component|Component}
 */
const NavLink = (props) => <Link {...props} activeClassName="active"/>

export default NavLink
