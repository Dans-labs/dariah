import React, {Component} from 'react'
import  NavLink  from './NavLink.jsx'
import { columnStyle } from '../helpers/ui.js'

export default class Home extends Component {
  render() {
    return (
      <div>
        <div style={columnStyle('20%', 'left')}>
          <ul className="nav">
              <li><NavLink to="/home/about">About</NavLink></li>
              <li><NavLink to="/home/deploy">Deploy</NavLink></li>
          </ul>
        </div>
        <div style={columnStyle('80%', 'right')}>
          {this.props.children}
        </div>
      </div>
    )
  }
}

