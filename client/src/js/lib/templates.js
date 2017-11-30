import React from 'react'
import { Field } from 'redux-form'

import { memoize } from 'memo'
import { emptyO } from 'utils'

import { repr } from 'tables'

import FieldRead from 'FieldRead'
import FieldEdit from 'FieldEdit'
import FieldSet from 'FieldSet'

import contrib from 'contrib'
import assessment from 'assessment'
import criteriaEntry from 'criteriaEntry'
import reviewEntry from 'reviewEntry'

const templateTables = {
  contrib,
  assessment,
  criteriaEntry,
  reviewEntry,
}

const findTemplate = (table, kind, subKind) => {
  const { [table]: { [kind]: mainTemplate = null } = emptyO } = templateTables
  return subKind == null
  ? mainTemplate
  : mainTemplate && mainTemplate[subKind]
}

const isEmpty = (value, multiple) => !value || (multiple && value.every(v => !v))

const makeL = memoize((tables, table) => field => {
  const { [table]: { fieldSpecs: { [field]: { label } = emptyO } = emptyO } } = tables
  return label
}, emptyO)


export const applyInsertTemplate = (table, masterTable, nItems, onInsert) => {
  const template = findTemplate(table, 'insert', masterTable)
  if (!template) {return null}
  return template({ n: nItems, onInsert })
}

export const applyTemplate = (settings, tables, table, kind, otherTable, values, workflow, linkMe) => {
  const template = findTemplate(table, kind, otherTable)
  if (!template) {return null}

  const isConsolidated = kind === 'consolidated'
  const { [table]: { fieldSpecs } } = tables

  const e = field => {
    const { [field]: value } = values
    const { [field]: { multiple } } = fieldSpecs
    return isEmpty(value, multiple)
  }
  const vConsolidated = (field, sep) => {
    const { [field]: value } = values
    const { [field]: { multiple } } = fieldSpecs
    const useSep = sep == null ? ' ' : sep
    return multiple
    ? value.join(useSep)
    : value
  }
  const vLive = (field, relField, sep, relSep) => {
    const { [field]: value } = values
    const { [field]: { valType, multiple } = emptyO } = fieldSpecs
    return repr(tables, table, field, valType, multiple, relField, value, settings, sep, relSep)
  }
  const v = isConsolidated ? vConsolidated : vLive

  const w = field => workflow[field] || emptyO

  const l = makeL(tables, table)

  const f = isConsolidated
  ? null
  : (field, relField) =>
    <FieldRead
      settings={settings}
      tables={tables}
      table={table}
      field={field}
      relField={relField}
      myValues={values[field]}
    />

  return template({ settings, tables, l, v, w, e, f, linkMe })
}

export const applyEditTemplate = (settings, tables, table, kind, otherTable, eId, fieldFragments, editButton, submitValues, reset) => {
  const template = findTemplate(table, kind, otherTable)
  if (!template) {return null}

  const fieldInfo = {}
  for (const { field, ...fieldProps } of fieldFragments) {
    fieldInfo[field] = fieldProps
  }
  fieldInfo['_id'] = { multiple: false, fragment: { editable: false, myValues: eId } }

  const { [table]: { fieldSpecs } } = tables

  const e = field => {
    const { [field]: { fragment: { myValues } } } = fieldInfo
    const { [field]: { multiple } } = fieldSpecs
    return isEmpty(myValues, multiple)
  }
  const v = (field, relField, sep, relSep) => {
    const { [field]: { fragment: { myValues } } } = fieldInfo
    const { [field]: { valType, multiple } = emptyO } = fieldSpecs
    return repr(tables, table, field, valType, multiple, relField, myValues, settings, sep, relSep)
  }
  const w = field => {
    const {
      [table]: {
        entities: {
          [eId]: {
            workflow: {
              [field]: info = emptyO,
            } = emptyO,
          },
        },
      },
    } = tables
    return info
  }

  const l = makeL(tables, table)

  const f = (field, relField) => {
    const { [field]: { fragment: { myValues } } } = fieldInfo
    return (
      <FieldRead
        settings={settings}
        tables={tables}
        table={table}
        field={field}
        relField={relField}
        myValues={myValues}
      />
    )
  }

  const m = field => {
    const {
      [field]: {
        valType,
        fragment: { editable },
      },
    } = fieldInfo
    return editable && (typeof valType != 'object' || !valType.fixed)
  }

  const fe = (field, editOptions) => {
    const {
      [field]: {
        fragment: { myValues, ...fieldProps },
      },
    } = fieldInfo
    const editable = m(field)
    return editable
    ? <FieldEdit
        field={field}
        tables={tables}
        table={table}
        eId={eId}
        {...fieldProps}
        {...editOptions}
        submitValues={submitValues}
        reset={reset}
      />
    : <FieldRead
        field={field}
        tables={tables}
        table={table}
        eId={eId}
        myValues={myValues}
      />
  }

  const fs = (field, setValue, widget) => {
    const editable = m(field)
    return editable
    ? <Field
        name={field}
        component={FieldSet}
        setValue={setValue}
        widget={widget}
        tables={tables}
        table={table}
        eId={eId}
        submitValues={submitValues}
      />
    : null
  }

  return template({ settings, tables, l, v, w, e, f, fe, fs, m, editButton })
}

export const editMode = (tables, table, otherTable) => values => {
  const test = findTemplate(table, 'editMode', otherTable)
  if (!test) {return 0}

  const { [table]: { fieldSpecs } } = tables

  const e = field => {
    const { [field]: value } = values
    const { [field]: { multiple } } = fieldSpecs
    return isEmpty(value, multiple)
  }
  return test(e)
}
