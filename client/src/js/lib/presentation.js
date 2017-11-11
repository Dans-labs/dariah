import React from 'react'

import { memoize } from 'memo'
import { emptyS, emptyO } from 'utils'

import { repr } from 'tables'

import FieldRead from 'FieldRead'
import FieldEdit from 'FieldEdit'
import {
  mainTemplates, mainEditTemplates,
  detailTemplates, detailEditTemplates,
  relatedTemplates,
  consolidatedTemplates,
} from 'Templates'

/* templates for related records
 * These are records in related tables pointed to by fields in the main records.
 * These are NOT the detail records of a main record.
 * See below for detail records.
 *
 * This object is keyed by the names of the main tables.
 * For each main table it contains an object of functions,
 * named by the table name of the related records.
 *
 * A template is a function that can be passed a few functions that deliver
 * field value information:
 *
 * - v  = field => readonly string value for that field
 * - l  = field => label for that field
 * - f  = field => <FieldRead> react component for that field
 * - fe = field => <FieldEdit> react component for that field
 * - e  = field => whether that field has an empty value
 *
 * The template of a detail record can also be passed a hyperlink to the main record: linkMe
 */

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
  detail: detailTemplates,
  detailEdit: detailEditTemplates,
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
  const { [kind]: templates } = switchTemplateKind
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
    return repr(tables, table, valType, multiple, relField, value, settings, sep, relSep)
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
  const { [kind]: templates } = switchTemplateKind
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
    return repr(tables, table, valType, multiple, relField, myValues, settings, sep, relSep)
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
        fragment: { table, myValues, ...fieldProps },
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

  return template({ settings, tables, l, v, e, f, fe, m, editButton })
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
