import React, {Component} from 'react'
import  NavLink  from './NavLink.jsx'
import { columnStyle } from '../helpers/ui.js'

export default class Home extends Component {
  render() {
    return (
      <div>
        <div className="nav" style={columnStyle('15%', 'left')}>
          <ul className="nav">
              <li><NavLink to="/home/about">About</NavLink></li>
              <li><NavLink to="/home/deploy">Deploy</NavLink></li>
          </ul>
        </div>
        <div style={columnStyle('85%', 'right')}>
          {this.props.children}
        </div>
      </div>
    )
  }
}

