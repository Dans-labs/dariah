import React, {PropTypes} from 'react'

const Login = ({ user, login, logout }) => (
  <span style={{float: 'right', fontSize: 'small'}}>
    { user && user.authenticated ? (
    <span style={{color: '#333333'}}>logged in as <strong>{user && user.eppn}</strong> (DARIAH)
        <a href="/logout" className="fa fa-user">{' logout'}</a>
      </span>
    ) : (
      <a href="/login" className="fa fa-user">{' login'}</a>
    )}
  </span>
)

Login.propTypes = {
  user: PropTypes.object.isRequired,
}

export default Login

