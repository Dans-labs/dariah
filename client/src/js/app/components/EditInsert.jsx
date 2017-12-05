import React from 'react'
import { connect } from 'react-redux'

import { combineSelectors } from 'utils'
import { applyInsertTemplate } from 'templates'

import { DETAILS } from 'tables'
import { getSettings } from 'settings'
import { getMe } from 'me'

import Tooltip from 'Tooltip'

const EditInsert = ({
	settings,
	me,
	tables,
	table,
	select,
	masterTable,
	masterId,
	perm,
	fixed,
	item,
	nItems,
	button,
	onInsert,
}) => {
	const thing = item[0]
	return !fixed &&
		perm != null &&
		perm.insert &&
		(!perm.needMaster || select == DETAILS)
		? applyInsertTemplate({
				settings,
				me,
				tables,
				table,
				relTable: masterTable,
				relId: masterId,
				nItems,
				onInsert,
			}) || (
				<Tooltip tip={`make a new ${thing}`} at={'bottom'}>
					<span className={`fa fa-plus ${button}`} onClick={onInsert} />
				</Tooltip>
			)
		: null
}

const getInfo = combineSelectors(getSettings, getMe)

export default connect(getInfo)(EditInsert)
