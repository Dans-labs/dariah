import React, {PropTypes} from 'react'

const Login = ({ user, login, logout }) => {
  const mayLogin = user && user.mayLogin;
  return (
    <span style={{float: 'right', fontSize: 'small'}}>
      { Object.keys(user).length > 0 ? (
      <span style={{color: '#333333'}}>
          <strong>{user.eppn}</strong> (DARIAH){' '}
          { mayLogin ? <span>logged in</span> : <span style={{color: '#ee0000'}}>rejected</span> }
          <a href="/logout" className="fa fa-user">{' logout'}</a>
        </span>
      ) : (
        <a href="/login" className="fa fa-user">{' login'}</a>
      )}
    </span>
  )
}

Login.propTypes = {
  user: PropTypes.object.isRequired,
}

export default Login

