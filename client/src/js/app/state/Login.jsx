import React, {Component} from 'react'
import LocalSettings  from 'LocalSettings.jsx'
import { withContext, saveState } from 'hoc.js'
import { getData } from 'data.js'

/**
 * @class
 * @classdesc
 * **stateful** {@link external:Component|Component}
 *
 * ## Authentication
 * <img src="/api/file/tech/docs/design/design.004.jpeg" width="800"/>
 *
 * This component takes care of login/logout.
 * The actual login/logout actions take place at the server, by visiting `/login`,
 * `/logout` or `/slogout`.
 * The server delegates the actual authentication to the
 * {@link https://wiki.de.dariah.eu/display/publicde/DARIAH+AAI+Documentation|DARIAH Identity provider}.
 *
 * Currently, `/logout` performs a logout from this app, but not from the DARIAH Identity Provider.
 * To do the latter, one has to go to `/slogout` and close the browser.
 *
 * The main task of Login is to fetch the current authentication status:
 * is there an authenticated user, and if so, what is his/her name?
 *
 * **NB:** Because of the federated login, the username and password are not entered
 * in any form in this app. So the client does not know who the user is, except by asking the server.
 * The current user can be retrieved by `/api/db/who/ami`.
 */
class Login extends Component {
  render() {
    const {user} = this.state;
    const {userInfo} = this.props;
    userInfo.clear();
    for (const k of Object.keys(user)) {
      userInfo.set(k, user[k]);
    }
    return (
      <span className="login">
        { user.eppn && Object.keys(user).length > 0 ? (
        <span>
          <strong className="fa fa-user" title={user.eppn}>{user.eppn.split('@')[0]}</strong>
          <span className="fa fa-hashtag"/>{user.authority}{' '}
          <em>{user.groupDesc || 'not authenticated'}</em>
          <a href="/logout" className="control fa fa-user-times" title="log out"/>
          <a href="/slogout" className="control fa fa-users" title="sign out"/>
        </span>
        ) : (
        <a href="/login" className="control fa fa-user-plus">{' login'}</a>
        )}
        <LocalSettings/>
      </span>
    )
  }
  /**
   * After the initial mount we fetch the user data from the server by calling {@link module:data.getData|getData()}.
   * @method
   */
  componentDidMount() {
    getData(
      [ { type: 'db', path: '/who/ami', branch: 'user' } ],
      this,
      this.props.notification.component
    )
  }
}

export default withContext(saveState(Login, 'Login', {user: {}}))

