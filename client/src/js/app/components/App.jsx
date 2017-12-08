import React from 'react'
import { connect } from 'react-redux'

import { getWinDim } from  'win'

import ErrorBoundary from 'ErrorBoundary'
import Login from 'Login'
import Static from 'Static'
import Notification from 'Notification'
import Tooltip from 'Tooltip'
import TooltipSwitch from 'TooltipSwitch'

const App = ({ children, win }) => {
	const { height, width } = win
	const text = `${width} x ${height}`
	return (
		<ErrorBoundary>
			<ErrorBoundary>
				<Notification />
			</ErrorBoundary>
			<div className={'topnavbar'}>
				<Tooltip tip={'information about this site'} at={'right'}>
					<span className={'logo-container'}>
						<img src={'/static/images/inkind_logo_small.png'} />
					</span>
				</Tooltip>
				<ErrorBoundary>
					<Static />
				</ErrorBoundary>
				<TooltipSwitch />
				<Tooltip tip={`current window size: ${text} pixels`} at={'bottom'}>
					<span className={'resize'}>{text}</span>
				</Tooltip>
				<ErrorBoundary>
					<Login />
				</ErrorBoundary>
			</div>
			<ErrorBoundary>{children}</ErrorBoundary>
		</ErrorBoundary>
	)
}

export default connect(getWinDim)(App)
