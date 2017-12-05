import React from 'react'

import { connect } from 'react-redux'
import { reduxForm } from 'redux-form'

import { emptyO } from 'utils'

import { applyEditTemplate } from 'templates'
import { onSubmitSuccess } from 'edit'
import { toDb, headEntity } from 'tables'
import { getMe } from 'me'

const ItemAction = ({
	settings,
	me,
	tables,
	table,
	eId,
	linkField,
	fieldFragments,
	handleSubmit,
	dispatch,
}) => {
	const head = headEntity(tables, table, eId, settings)
	const submitValues = handleSubmit(toDb(table, eId, head, dispatch))
	const {
		[table]: {
			fieldSpecs: { [linkField]: { valType: { relTable } = emptyO } = emptyO },
		},
	} = tables
	const kind = relTable ? 'detail' : 'main'
	return (
		<div className={'item-workflow'}>
			{applyEditTemplate({
				settings,
				me,
				tables,
				table,
				eId,
				kind: `${kind}Action`,
				relTable,
				fieldFragments,
				submitValues,
			})}
		</div>
	)
}

export default connect(getMe)(
	reduxForm({
		destroyOnUnmount: false,
		enableReinitialize: true,
		keepDirtyOnReinitialize: false,
		touchOnBlur: true,
		touchOnChange: false,
		onSubmitSuccess,
	})(ItemAction),
)
