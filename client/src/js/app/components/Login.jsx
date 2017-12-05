import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import { presentUser } from 'tables'
import { getMe, fetchMe } from 'me'

import Tooltip from 'Tooltip'

class Login extends Component {
	render() {
		const { props: { me } } = this
		return (
			<span className={'login'}>
				{me.eppn ? (
					<Fragment>
						<Tooltip tip={'you are logged in'} at={'bottom'}>
							<span className={'fa fa-user'} />
							<strong>{presentUser(me)}</strong>{' '}
							<em>{me.groupDesc || 'not authenticated'}</em>
						</Tooltip>
						<Tooltip tip={'log out of this tool'} at={'bottom'}>
							<a href={'/logout'} className={'control fa fa-user-times'} />
						</Tooltip>
						<Tooltip tip={'sign out from DARIAH'} at={'top'}>
							<a href={'/slogout'} className={'control fa fa-users'} />
						</Tooltip>
					</Fragment>
				) : (
					<Tooltip tip={'click to log in'} at={'bottom'}>
						<a href={'/login'} className={'control'}>
							<strong className={'fa fa-user-plus'} />
							<strong>{' login'}</strong>
						</a>
					</Tooltip>
				)}
			</span>
		)
	}
	componentDidMount() {
		const { props: { dispatch } } = this
		dispatch(
			fetchMe({
				type: 'fetchMe',
				contentType: 'db',
				path: '/who/ami',
				desc: 'me',
			}),
		)
	}
}

export default connect(getMe)(Login)
