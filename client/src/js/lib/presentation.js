import React from 'react'
import { Field } from 'redux-form'

import { memoize } from 'memo'
import { emptyS, emptyO } from 'utils'

import { repr } from 'tables'

import FieldRead from 'FieldRead'
import FieldEdit from 'FieldEdit'
import FieldSet from 'FieldSet'

import {
  mainTemplates, mainEditTemplates, mainActionTemplates,
  detailTemplates, detailEditTemplates, detailActionTemplates,
  relatedTemplates,
  consolidatedTemplates,
} from 'Templates'

const detailEdit = {
  criteriaEntry: {
    assessment(e) {
      return (e('score') || e('evidence')) ? 1 : 0
    },
  },
}

const relatedEdit = {}

const switchTemplateKind = {
  main: mainTemplates,
  mainEdit: mainEditTemplates,
  mainAction: mainActionTemplates,
  detail: detailTemplates,
  detailEdit: detailEditTemplates,
  detailAction: detailActionTemplates,
  related: relatedTemplates,
  consolidated: consolidatedTemplates,
}

const switchEditKind = {
  detail: detailEdit,
  related: relatedEdit,
}

const isEmpty = (value, multiple) => value == null || value == emptyS || !value || (multiple && value.length == 0)

const makeL = memoize((tables, table) => field => {
  const { [table]: { fieldSpecs: { [field]: { label } = emptyO } = emptyO } } = tables
  return label
}, emptyO)


// NB: [''] == '' and this is what we intend here

export const applyTemplate = (settings, tables, table, kind, otherTable, values, linkMe) => {
  const { [kind]: templates = emptyO } = switchTemplateKind
  const { [table]: theseTemplates = emptyO } = templates
  const template = otherTable ? theseTemplates[otherTable] : theseTemplates
  if (template == null || template == emptyO) {return null}

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

  return template({ settings, tables, l, v, e, f, linkMe })
}

export const applyEditTemplate = (settings, tables, table, kind, otherTable, eId, fieldFragments, editButton, submitValues) => {
  const { [kind]: templates = emptyO } = switchTemplateKind
  const { [table]: theseTemplates = emptyO } = templates
  const template = otherTable ? theseTemplates[otherTable] : theseTemplates
  if (template == null || template == emptyO) {return null}

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

  return template({ settings, tables, l, v, e, f, fe, fs, m, editButton })
}

export const editMode = (tables, table, kind, otherTable) => values => {
  const { [kind]: tests } = switchEditKind
  const { [table]: { [otherTable]: test } = emptyO } = tests
  if (test == null) {return 0}

  const { [table]: { fieldSpecs } } = tables

  const e = field => {
    const { [field]: value } = values
    const { [field]: { multiple } } = fieldSpecs
    return value == null || value == emptyS || (multiple && value.length == 0)
    // NB: [''] == '' and this is what we intend here
  }
  return test(e)
}
