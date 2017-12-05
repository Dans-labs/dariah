import React, { Fragment } from 'react'
import { connect } from 'react-redux'

import { getAltSection } from 'alter'
import { handleOpenAll, handleCloseAll } from 'tables'

import Tooltip from 'Tooltip'

const OpenCloseAll = ({
	alter,
	alterSection,
	table,
	listIds,
	item,
	button,
	nAlts,
	initial,
	openAll,
	expand,
	dispatch,
}) => {
	const hasItems = listIds.length > 0
	const [thing, things] = item
	const itemsRep = listIds.length === 1 ? thing : things
	const nItemsRep = `${listIds.length} ${itemsRep} `
	return (
		<Fragment>
			<span>{nItemsRep}</span>
			{hasItems && openAll && !expand ? (
				<Tooltip tip={`open all ${itemsRep}`} at={'bottom'}>
					<div
						className={`fa fa-angle-double-down ${button}`}
						onClick={handleOpenAll(
							alter,
							alterSection,
							nAlts,
							initial,
							table,
							listIds,
							dispatch,
						)}
					/>
				</Tooltip>
			) : null}
			{hasItems && !expand ? (
				<Tooltip tip={`close all opened ${itemsRep}`} at={'bottom'}>
					<div
						className={`fa fa-angle-double-up ${button}`}
						onClick={handleCloseAll(
							alter,
							alterSection,
							nAlts,
							initial,
							listIds,
							dispatch,
						)}
					/>
				</Tooltip>
			) : null}
		</Fragment>
	)
}

export default connect(getAltSection)(OpenCloseAll)
