import React from 'react'
import { connect } from 'react-redux'
import NavLink from 'NavLink.jsx'
import { columnStyle } from 'window.js'

const SubApp = ({params: { table }, children, height, width }) => (
  <div>
    <div
      className="nav sized"
      style={columnStyle('left', { height, width })}
    >
      {(table == 'contrib') ? (
        <div>
          <p><NavLink to={`/${table}/list`} >{'All items'}</NavLink></p>
          <p><NavLink to={`/${table}/mylist`} >{'My work'}</NavLink></p>
        </div>
      ) : (
        <div>
          <p><NavLink to={`/${table}/type`} >{'Types'}</NavLink></p>
          <p><NavLink to={`/${table}/assess`} >{'Criteria'}</NavLink></p>
          <p><NavLink to={`/${table}/package`} >{'Packages'}</NavLink></p>
        </div>
      )}
    </div>
    <div>
      <div
        className="sized"
        style={columnStyle('right', { height, width })}
      >
        { children }
      </div>
    </div>
  </div>
)

const mapStateToProps = ({ win: { height, width } }) => ({ height, width })

export default connect(mapStateToProps)(SubApp)
