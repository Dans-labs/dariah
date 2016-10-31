import React, {PropTypes} from 'react'

const Login = ({ user, login, logout }) => {
  const access = 'loggedin';
  const label = {
    loggedin: 'logged in',
  }
  return (
    <span style={{float: 'right', fontSize: 'small'}}>
      { user && Object.keys(user).length > 0 ? (
      <span style={{color: '#333333'}}>
        <strong className="fa fa-user">{user.eppn}</strong>
        <span className="fa fa-hashtag"/>{` ${user.authority} `}
          <span>{label[access]}</span>
          <a href="/logout" className="control fa fa-user-times">{' logout'}</a>
          <a href="/slogout" className="control fa fa-users">{' quit '}</a>
        </span>
      ) : (
        <a href="/login" className="control fa fa-user-plus">{' login'}</a>
      )}
    </span>
  )
}

Login.propTypes = {
  user: PropTypes.object.isRequired,
}

export default Login

