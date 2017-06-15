import React, {Component} from 'react'
import { connect } from 'react-redux'

import { getMe, fetchMe } from 'me'

class Login extends Component {
  render() {
    const { props: { me } } = this
    return (
      <span className="login" >
        {
          me.eppn
          ? <span>
              <span className="fa fa-user" title={me.eppn} /><strong>{me.eppn.split('@')[0]}</strong>
              <span className="fa fa-hashtag" />{me.authority}{' '}
              <em>{me.groupDesc || 'not authenticated'}</em>
              <a href="/logout" className="control fa fa-user-times" title="log out" />
              <a href="/slogout" className="control fa fa-users" title="sign out" />
            </span>
          : <a href="/login" className={'control'} >
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

