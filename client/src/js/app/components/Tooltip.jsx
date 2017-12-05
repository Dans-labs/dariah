import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import { emptyS } from 'utils'
import { getSettings } from 'settings'

const opposite = {
	top: 'bottom',
	bottom: 'top',
	left: 'right',
	right: 'left',
}

const perp = {
	top: ['left', 'right'],
	bottom: ['left', 'right'],
	left: ['top', 'bottom'],
	right: ['top', 'bottom'],
}

const getRawPos = {
	top: (target, obj) => ({
		left: target.left + ((target.width - obj.width) >> 1),
		top: target.top - obj.height,
	}),
	bottom: (target, obj) => ({
		left: target.left + ((target.width - obj.width) >> 1),
		top: target.top + target.height,
	}),
	left: (target, obj) => ({
		left: target.left - obj.width,
		top: target.top + ((target.height - obj.height) >> 1),
	}),
	right: (target, obj) => ({
		left: target.left + target.width,
		top: target.top + ((target.height - obj.height) >> 1),
	}),
}
const mustCorrect = {
	top: (container, obj, rawPos) => rawPos.top < 0,
	bottom: (container, obj, rawPos) =>
		rawPos.top + obj.height > container.height,
	left: (container, obj, rawPos) => rawPos.left < 0,
	right: (container, obj, rawPos) => rawPos.left + obj.width > container.width,
}

const adapt = {
	top: (container, obj, corrPos) => {
		corrPos.top = 0
	},
	bottom: (container, obj, corrPos) => {
		corrPos.top = container.height - obj.height
	},
	left: (container, obj, corrPos) => {
		corrPos.left = 0
	},
	right: (container, obj, corrPos) => {
		corrPos.left = container.width - obj.width
	},
}

const getPos = at => (container, target, obj, maySwap) => {
	const rawPos = getRawPos[at](target, obj)
	let corrAt = at
	let corrPos = rawPos
	if (maySwap && mustCorrect[at](container, obj, rawPos)) {
		corrAt = opposite[at]
		corrPos = getRawPos[corrAt](target, obj)
	}
	for (const perpPos of perp[corrAt]) {
		if (mustCorrect[perpPos](container, obj, corrPos)) {
			adapt[perpPos](container, obj, corrPos)
		}
	}
	return {
		at: corrAt,
		...corrPos,
	}
}

class Tooltip extends Component {
	render() {
		const {
			props: {
				settings: { showTooltips },
				children,
				tip,
				at,
				focusOnly,
				className = emptyS,
				classTip = emptyS,
				classArrow = emptyS,
			},
		} = this
		return showTooltips ? (
			<Fragment>
				<span
					ref={this.storeTarget}
					className={`${className} tooltipped focus ${
						focusOnly ? emptyS : 'hover'
					}`}
					onMouseOver={this.handlePositioning}
					onFocus={this.handlePositioning}
				>
					{children}
				</span>
				<span>
					<span ref={this.storeTip} className={`tooltip ${classTip}`}>
						{tip}
					</span>
					<span
						ref={this.storeArrow}
						className={`toolarrow toolarrow-${at} ${classArrow}`}
					/>
				</span>
			</Fragment>
		) : (
			children
		)
	}
	storeTarget = domElem => {
		this.target = domElem
	}
	storeTip = domElem => {
		this.tip = domElem
	}
	storeArrow = domElem => {
		this.arrow = domElem
	}

	handlePositioning = () => {
		const {
			props: { at = 'top', fixed = false, settings: { showTooltips } },
			target,
			tip,
			arrow,
		} = this
		if (!showTooltips || fixed) {
			return
		}

		const doc = document.documentElement

		const targetData = target.getBoundingClientRect()
		const tipData = tip.getBoundingClientRect()
		const arrowData = arrow.getBoundingClientRect()
		const containerData = {
			width: doc.clientWidth,
			height: doc.clientHeight,
		}

		const tipPos = getPos(at)(containerData, targetData, tipData, true)
		const newAt = tipPos.at
		const arrowPos = getPos(newAt)(containerData, targetData, arrowData, false)

		for (const oldAt of Object.keys(opposite)) {
			arrow.classList.remove(`toolarrow-${oldAt}`)
		}
		arrow.classList.add(`toolarrow-${newAt}`)
		tip.style.top = tipPos.top + window.scrollY
		tip.style.left = tipPos.left + window.scrollX
		arrow.style.top = arrowPos.top + window.scrollY
		arrow.style.left = arrowPos.left + window.scrollX
	}
}

export default connect(getSettings)(Tooltip)
