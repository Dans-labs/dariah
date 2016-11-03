import React, {Component, PropTypes} from 'react'
import { withContext, saveState } from '../helpers/hoc.js'
import { getData } from '../helpers/data.js'

/**
 * @class
 * @classdesc
 * **stateful** {@link external:Component|Component}
 *
 * <img src="/api/file/tech/docs/design/design.004.jpeg" width="800"/>
 */
class Login extends Component {
  render() {
    const {user} = this.state;
    return (
      <span style={{float: 'right', fontSize: 'small'}}>
        { user && Object.keys(user).length > 0 ? (
        <span style={{color: '#333333'}}>
          <strong className="fa fa-user" title={user.eppn}>{user.eppn.split('@')[0]}</strong>
          <span className="fa fa-hashtag"/>{user.authority}{' '}
            <a href="/logout" className="control fa fa-user-times">{' logout'}</a>
            <a href="/slogout" className="control fa fa-users">{' quit '}</a>
          </span>
        ) : (
          <a href="/login" className="control fa fa-user-plus">{' login'}</a>
        )}
      </span>
    )
  }
  componentDidMount() {
    getData(
      [ { type: 'db', path: '/who/ami', branch: 'user' } ],
      this,
      this.props.notification.component
    )
  }
}

Login.propTypes = {}

export default withContext(saveState(Login, 'Login', {user: {}}))

