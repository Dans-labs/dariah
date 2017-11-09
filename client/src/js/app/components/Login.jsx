import React, {Component} from 'react'
import { connect } from 'react-redux'

import { presentUser } from 'tables'
import { getMe, fetchMe } from 'me'

class Login extends Component {
  render() {
    const { props: { me } } = this
    return (
      <span className={'login'} >
        {
          me.eppn
          ? <span
              data-rh={'you are logged in'}
              data-rh-at={'bottom'}
            >
              <span className={'fa fa-user'} /><strong>{presentUser(me)}</strong>{' '}
              <em>{me.groupDesc || 'not authenticated'}</em>
              <a
                href={'/logout'}
                className={'control fa fa-user-times'}
                data-rh={'log out of this tool'}
                data-rh-at={'bottom'}
              />
              <a
                href={'/slogout'}
                className={'control fa fa-users'}
                data-rh={'sign out from DARIAH'}
                data-rh-at={'bottom'}
              />
            </span>
          : <a
              href={'/login'}
              className={'control'}
              data-rh={'click to log in'}
              data-rh-at={'bottom'}
            >
              <strong className={'fa fa-user-plus'} /><strong>{' login'}</strong>
            </a>
        }
      </span>
    )
  }
  componentDidMount() {
    const { props: { dispatch } } = this
    dispatch(fetchMe({ type: 'fetchMe', contentType: 'db', path: '/who/ami', desc: 'me' }))
  }
}

export default connect(getMe)(Login)

