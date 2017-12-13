import React from 'react'
import { Field } from 'redux-form'

import { memoize } from 'memo'
import { emptyO, emptyA } from 'utils'

import { repr } from 'tables'
import { compileActive } from 'workflow'

import FieldRead from 'FieldRead'
import FieldEdit from 'FieldEdit'
import FieldSet from 'FieldSet'

import contrib from 'contrib'
import assessment from 'assessment'
import criteriaEntry from 'criteriaEntry'
import review from 'review'
import reviewEntry from 'reviewEntry'

const templateTables = {
	contrib,
	assessment,
	criteriaEntry,
	review,
	reviewEntry,
}

const findTemplate = (table, kind, subKind) => {
	const { [table]: { [kind]: mainTemplate = null } = emptyO } = templateTables
	return subKind == null ? mainTemplate : mainTemplate && mainTemplate[subKind]
}

const isEmpty = (value, multiple) =>
	!value || (multiple && value.every(v => !v))

const isOwner = (me, v) =>
	me._id == v('creator') || (v('editors') || emptyA).some(i => i == me._id)

/* RECORD INFO FACTORY FUNCTIONS
 *
 * The following functions create field retrieval functions to be used by templates
 * in the places where they need the values of the fields.
 *
 * When we apply a template to a record,
 * we collect some information from the record as a whole,
 * and based on this info we create functions that yield that info in a field
 * dependent manner.
 *
 * E.g. in a template we use s('title') to retrieve the value of the title field.
 * We construct the function s by means of makeS(tables, table, eId)
 *
 * We can then define a template as follows, just a tiny example.
 *
 * template = ({ s }) => <div><h1>{s('title')}</h1></div>
 *
 * So for each record, we construct the function v, and we call template({ v }).
 * The templates are defined for tables, the v-like functions for records.
 * There are more functions like v:
 * - e: is the field empty
 * - m: is the field editable
 * - f: give a react component for the field, read-only mode
 * - fe: give a react component for the field, edit mode
 * etc., and, very importantly:
 * - w: yield the workflow information for a key.
 *
 * The server adds workflow information to some records in the form of key values
 * and templates have access to them by means of w.
 * In this way, we can make the presentation of items very sensitive
 * to the role they play in the workflow as a whole.
 *
 * We pass all these functions together in a single object to the templates.
 *
 * OK, here are the factory functions, they all start with make.
 */

const makeM = memoize(
	fieldInfo => field => {
		const { [field]: { valType, fragment: { editable } } = emptyO } = fieldInfo
		return editable && (typeof valType != 'object' || !valType.fixed)
	},
	emptyO,
)

const makeL = memoize(
	(tables, table) => field => {
		const {
			[table]: {
				fieldSpecs: { [field]: { label } = emptyO } = emptyO,
			} = emptyO,
		} = tables
		return label
	},
	emptyO,
)

const makeE = memoize((tables, table, values = emptyO) => {
	const { [table]: { fieldSpecs } = emptyO } = tables
	return field => {
		const { [field]: { multiple } = emptyO } = fieldSpecs
		const { [field]: value } = values
		return isEmpty(value, multiple)
	}
}, emptyO)

const makeEditE = memoize((tables, table, fieldInfo = emptyO) => {
	const { [table]: { fieldSpecs } = emptyO } = tables
	return field => {
		const { [field]: { fragment: { myValues } = emptyO } = emptyO } = fieldInfo
		const { [field]: { multiple } = emptyO } = fieldSpecs
		return isEmpty(myValues, multiple)
	}
}, emptyO)

const makeV = memoize((tables, table, eId) => {
	const {
		[table]: {
			entities: { [eId]: { values = emptyO } = emptyO },
			fieldSpecs = emptyO,
		} = emptyO,
	} = tables
	return (field, relField) => {
		const { [field]: value } = values
		if (relField) {
			const { [field]: { valType } = emptyO } = fieldSpecs
			const relTable = typeof valType == 'object' && valType.relTable
			if (relTable) {
				const {
					[relTable]: {
						entities: {
							[value]: { values: { [relField]: relValue } = emptyO } = emptyO,
						} = emptyO,
					} = emptyO,
				} = tables
				return relValue
			} else {
				return null
			}
		} else {
			return value
		}
	}
}, emptyO)

const makeInsertS = memoize((settings, tables, table, eId) => {
	const {
		[table]: {
			entities: { [eId]: { values = emptyO } = emptyO },
			fieldSpecs = emptyO,
		} = emptyO,
	} = tables
	return (field, relField, sep, relSep) => {
		const { [field]: value } = values
		const { [field]: { valType, multiple } = emptyO } = fieldSpecs
		return repr(
			tables,
			table,
			field,
			valType,
			multiple,
			relField,
			value,
			settings,
			sep,
			relSep,
		)
	}
}, emptyO)

const makeS = memoize((settings, tables, table, values = emptyO, kind) => {
	const { [table]: { fieldSpecs } } = tables
	return kind === 'consolidated'
		? (field, sep) => {
				const { [field]: value } = values
				const { [field]: { multiple } = emptyO } = fieldSpecs
				const useSep = sep == null ? ' ' : sep
				return multiple ? value.join(useSep) : value
			}
		: (field, relField, sep, relSep) => {
				const { [field]: value } = values
				const { [field]: { valType, multiple } = emptyO } = fieldSpecs
				return repr(
					tables,
					table,
					field,
					valType,
					multiple,
					relField,
					value,
					settings,
					sep,
					relSep,
				)
			}
}, emptyO)

const makeEditS = memoize((settings, tables, table, fieldInfo = emptyO) => {
	const { [table]: { fieldSpecs } = emptyO } = tables
	return (field, relField, sep, relSep) => {
		const {
			[field]: { fragment: { myValues } = emptyO } = emptyO,
		} = fieldInfo
		const { [field]: { valType, multiple } = emptyO } = fieldSpecs
		return repr(
			tables,
			table,
			field,
			valType,
			multiple,
			relField,
			myValues,
			settings,
			sep,
			relSep,
		)
	}
}, emptyO)

const makeW = memoize(
	(tables, table, eId) => key => {
		const {
			[table]: {
				entities: {
					[eId]: { workflow: { [key]: info = emptyO } = emptyO } = emptyO,
				} = emptyO,
			} = emptyO,
		} = tables
		return info
	},
	emptyO,
)

const makeInsertF = memoize((settings, tables, table, eId) => {
	const {
		[table]: { entities: { [eId]: { values = emptyO } = emptyO } } = emptyO,
	} = tables
	return (field, relField) => {
		const { [field]: value } = values
		return (
			<FieldRead
				settings={settings}
				tables={tables}
				table={table}
				eId={eId}
				field={field}
				relField={relField}
				myValues={value}
			/>
		)
	}
}, emptyO)

const makeF = memoize(
	(settings, tables, table, eId, values = emptyO, kind) =>
		kind === 'consolidated'
			? null
			: (field, relField) => (
					<FieldRead
						settings={settings}
						tables={tables}
						table={table}
						eId={eId}
						field={field}
						relField={relField}
						myValues={values[field]}
					/>
				),
	emptyO,
)

const makeEditF = memoize(
	(settings, tables, table, eId, fieldInfo = emptyO) => (field, relField) => {
		const {
			[field]: { fragment: { myValues = emptyO } = emptyO } = emptyO,
		} = fieldInfo
		return (
			<FieldRead
				settings={settings}
				tables={tables}
				table={table}
				eId={eId}
				field={field}
				relField={relField}
				myValues={myValues}
			/>
		)
	},
	emptyO,
)

const makeEditFE = memoize(
	(
		settings,
		tables,
		table,
		eId,
		fieldInfo = emptyO,
		m,
		submitValues,
		reset,
	) => (field, editOptions) => {
		const {
			[field]: { fragment: { myValues = emptyO, ...fieldProps } = emptyO },
		} = fieldInfo
		const editable = m(field)
		return editable ? (
			<FieldEdit
				field={field}
				tables={tables}
				table={table}
				eId={eId}
				{...fieldProps}
				{...editOptions}
				submitValues={submitValues}
				reset={reset}
			/>
		) : (
			<FieldRead
				settings={settings}
				tables={tables}
				table={table}
				eId={eId}
				field={field}
				myValues={myValues}
			/>
		)
	},
	emptyO,
)

const makeEditFS = memoize(
	(tables, table, eId, m, submitValues) => (field, setValue, widget) => {
		const editable = m(field)
		return editable ? (
			<Field
				name={field}
				component={FieldSet}
				setValue={setValue}
				widget={widget}
				tables={tables}
				table={table}
				eId={eId}
				submitValues={submitValues}
			/>
		) : null
	},
	emptyO,
)

/* TEMPLATE APPLICATION FUNCTIONS
 *
 * Applying templates is a breeze now.
 * We need to look up the appropriate template, if any,
 * call the factory functions,
 * and then call the template with the resulting record info functions.
 */

export const applyInsertTemplate = ({
	settings,
	me,
	tables,
	table,
	relTable,
	relId,
	nItems,
	onInsert,
}) => {
	const template = findTemplate(table, 'insert', relTable)
	if (!template) {
		return null
	}

	/*
   * Here v looks up fields in the related record (i.e. the master)
   * This template is called in the context of a list of detail records
   * of a master record.
   */
	const at = compileActive(tables, 'typeContribution')
	const v = makeV(tables, relTable, relId)
	const w = makeW(tables, relTable, relId)
	const s = makeInsertS(settings, tables, relTable, relId)
	const f = makeInsertF(settings, tables, relTable, relId)
	const o = isOwner(me, v)

	return template({ at, v, w, s, f, o, n: nItems, me, onInsert })
}

export const applyTemplate = ({
	settings,
	me,
	tables,
	table,
	eId,
	kind,
	relTable,
	values,
	linkMe,
}) => {
	const template = findTemplate(table, kind, relTable)
	if (!template) {
		return null
	}

	const at = compileActive(tables, 'typeContribution')
	const l = makeL(tables, table)
	const e = makeE(tables, table, values)
	const v = makeV(tables, table, eId)
	const w = makeW(tables, table, eId)
	const s = makeS(settings, tables, table, values, kind)
	const f = makeF(settings, tables, table, eId, values, kind)
	const o = isOwner(me, v)

	return template({ settings, tables, at, l, e, v, w, s, f, o, me, linkMe })
}

export const applyEditTemplate = ({
	settings,
	me,
	tables,
	table,
	eId,
	kind,
	relTable,
	fieldFragments,
	editButton,
	submitValues,
	reset,
}) => {
	const template = findTemplate(table, kind, relTable)
	if (!template) {
		return null
	}

	const fieldInfo = {}
	for (const { field, ...fieldProps } of fieldFragments) {
		fieldInfo[field] = fieldProps
	}
	fieldInfo['_id'] = {
		multiple: false,
		fragment: { editable: false, myValues: eId },
	}

	const m = makeM(fieldInfo)

	const at = compileActive(tables, 'typeContribution')
	const l = makeL(tables, table)
	const e = makeEditE(tables, table, fieldInfo)
	const v = makeV(tables, table, eId)
	const w = makeW(tables, table, eId)
	const s = makeEditS(settings, tables, table, fieldInfo)
	const f = makeEditF(settings, tables, table, eId, fieldInfo)
	const fe = makeEditFE(
		settings,
		tables,
		table,
		eId,
		fieldInfo,
		m,
		submitValues,
		reset,
	)
	const fs = makeEditFS(tables, table, eId, m, submitValues)
	const o = isOwner(me, v)

	return template({
		settings,
		tables,
		at,
		l,
		e,
		v,
		w,
		s,
		f,
		fe,
		fs,
		m,
		o,
		me,
		editButton,
	})
}

export const editMode = ({ me, tables, table, relTable }) => values => {
	const template = findTemplate(table, 'editMode', relTable)
	if (!template) {
		return 0
	}

	const e = makeE(tables, table, values)

	return template({ e, me })
}
