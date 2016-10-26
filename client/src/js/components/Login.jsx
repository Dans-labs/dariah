import React, {PropTypes} from 'react'

const Login = ({ user, login, logout }) => {
  const isApproved = user && user.statusLastLogin == 'Approved';
  return (
    <span style={{float: 'right', fontSize: 'small'}}>
      { user && user.authenticated ? (
      <span style={{color: '#333333'}}>
          <strong>{user && user.eppn}</strong> (DARIAH){' '}
          {(user.statusLastLogin == 'Approved') ? <span>logged in</span> : <span style={{color: '#ee0000'}}>rejected</span> }
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

