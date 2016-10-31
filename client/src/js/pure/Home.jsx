import React, {Component} from 'react'
import  NavLink  from './NavLink.jsx'
import { columnStyle } from '../helpers/ui.js'

const Home = ({children}) => (
  <div>
    <div className="nav" style={columnStyle('15%', 'left')}>
      <ul className="nav">
        <li><NavLink to="/contrib">Contributions</NavLink></li>
        <li><NavLink to="/doc/about">About</NavLink></li>
        <li><NavLink to="/doc/design">Design</NavLink></li>
        <li><NavLink to="/doc/deploy">Deploy</NavLink></li>
      </ul>
    </div>
    <div style={columnStyle('85%', 'right')}>
      {children}
    </div>
  </div>
)

export default Home
