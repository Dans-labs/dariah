import React from 'react'
import { connect } from 'react-redux'

import { emptyO } from 'utils'

import { applyTemplate } from 'templates'
import { toFieldInfo, itemReadField } from 'fields'
import { getMe } from 'me'

import FieldRead from 'FieldRead'

const ItemRead = ({
	settings,
	me,
	tables,
	table,
	eId,
	fieldFragments,
	linkField,
}) => {
	const {
		[table]: {
			fieldSpecs: { [linkField]: { valType: { relTable } = emptyO } = emptyO },
		},
	} = tables
	const kind = relTable ? 'detail' : 'main'
	return (
		applyTemplate({
			settings,
			me,
			tables,
			table,
			eId,
			kind,
			relTable,
			values: toFieldInfo(eId, fieldFragments),
		}) || (
			<div className={'grid fragments'}>
				{fieldFragments.map(
					({ field, label, fragment: { table: relTable, myValues } }) =>
						itemReadField(
							field,
							label,
							<FieldRead
								field={field}
								tables={tables}
								table={relTable}
								eId={eId}
								myValues={myValues}
							/>,
							field,
						),
				)}
			</div>
		)
	)
}

export default connect(getMe)(ItemRead)
