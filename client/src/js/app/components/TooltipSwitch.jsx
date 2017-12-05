import React from 'react'
import { connect } from 'react-redux'

import { handlE } from 'handle'

import { adjust, getSettings } from 'settings'

const TooltipSwitch = ({ settings, dispatch }) => {
	const { showTooltips: isOn = false } = settings
	return (
		<span className={`tooltips-${isOn ? 'on' : 'off'}`}>
			<input
				type={'checkbox'}
				checked={isOn}
				onChange={handlE(dispatch, adjust, 'showTooltips', !isOn)}
			/>
			{`tooltips`}
		</span>
	)
}
export default connect(getSettings)(TooltipSwitch)
