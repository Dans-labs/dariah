import React, {PropTypes} from 'react'

const Login = ({ user, login, logout }) => {
  const access = 'loggedin';
  const styles = {
    loggedin: {
      color: '#008800',
    },
    login: {
      color: '#0000ff',
    },
    logout: {
      color: '#8800ff',
    },
    change: {
      color: '#ff00ff',
    },
  }
  const label = {
    loggedin: 'logged in',
  }
  return (
    <span style={{float: 'right', fontSize: 'small'}}>
      { Object.keys(user).length > 0 ? (
      <span style={{color: '#333333'}}>
        <strong className="fa fa-user" style={styles[access]}>{user.eppn}</strong>
        {` authenticated by ${user.authority} `}
          <span style={styles[access]}>{label[access]}</span>
          <a href="/logout" style={styles['logout']} className="fa fa-user-times">{' logout'}</a>
          <a href="/slogout" style={styles['change']} className="fa fa-users">{' change user'}</a>
        </span>
      ) : (
        <a href="/login" style={styles['login']} className="fa fa-user-plus">{' login'}</a>
      )}
    </span>
  )
}

Login.propTypes = {
  user: PropTypes.object.isRequired,
}

export default Login

