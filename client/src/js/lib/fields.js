import pickBy from 'lodash/pickby'

import React from 'react'

import { memoize } from 'memo'
import { emptyS, emptyO } from 'utils'

/* Workaround (6.6.3) for issue https://github.com/erikras/redux-form/issues/2841
 * We do a mostly unnecessary reset() after a successful submit.
 * There is bug in redux-form: if you remove a field from a field array, a spurious
 * empty field will be present after a submit.
 * This reset removes that field.
 *
 * Still needed in 6.7.0
 */
export const onSubmitSuccess = (result, dispatch, { reset }) => reset()

export const makeSubmit = memoize((dirty, invalid, submitting, submit) =>
  dirty && !invalid && !submitting
  ? submit
  : () => null
)

export const makeSubmitTime = memoize(submit => () => setTimeout(submit, 10))
export const makeChangeSave = memoize((onChange, submit) => val => {onChange(val); submit()})
export const makeChangeSaveVal = memoize((onChange, submit, val) => () => {onChange(val); submit()})

export const itemReadField = (field, label, fvalue, key) => (
  <div
    {...(key == null ? emptyO : { key })}
    className={'grid-row form'}
  >
    <div className={'grid-head-cell label-col'}>{label}{':'}</div>
    <div className={'grid-cell value-col'} >
      {fvalue}
    </div>
  </div>
)

export const makeReset = memoize((type, reset) =>
  type == 'checkbox'
  ? emptyO
  : { onKeyUp: e => {if (e.keyCode == 27) {e.preventDefault(); reset()}} }
)

export const itemEditField = (field, label, fevalue, editable, key) => (
  <div
    {...(key == null ? emptyO : { key })}
    className={'grid-row form'}
  >
    <div className={`grid-head-cell label-col ${editable ? 'edit' : emptyS}`}>{label}{':'}</div>
    <div className={`grid-cell value-col ${editable ? 'edit' : emptyS}`} >
      {fevalue}
    </div>
  </div>
)

export const checkDisabled = (activeItems, inactive) => value =>
  inactive && inactive.disabled && activeItems != null && !activeItems.has(value)

export const someEditable = (fields, perm, workflow) =>
  !(workflow && workflow.locked && workflow.locked.on)
  && fields
  && Object.keys(fields).some(field => perm && perm.update && perm.update[field])

export const makeFields = ({ tables, table, eId, fields, perm, ...props }) => {
  const { initialValues } = props
  const { [table]: { fieldSpecs, fieldOrder } } = tables

  const fragments = []
  for (const field of fieldOrder) {
    const { [field]: f } = fields
    if (f == null) {continue}
    const { [field]: { label, valType, multiple } } = fieldSpecs
    const { update: { [field]: editable } } = perm
    const { [field]: myValues } = initialValues
    const theField = {
      editable,
      table,
      myValues,
      ...props,
    }
    if (editable && typeof valType === 'object') {
      const { relTable, link } = valType
      if (relTable != null && link != null) {
        const { [table]: { entities: { [eId]: { values: { [link]: masterValue } = emptyO } = emptyO } = emptyO } = emptyO } = tables
        if (masterValue != null) {
          const { [relTable]: { entities } } = tables
          if (entities != null) {
            const allowed = Object.keys(entities).filter(_id => entities[_id].values[link] === masterValue)
            theField.allowed = allowed
          }
        }
      }
    }
    fragments.push({ field, label, valType, multiple, fragment: theField })
  }
  return fragments
}

export const toFieldInfo = (eId, fragments) => {
  const fieldInfo = { _id: eId }
  for (const { field, fragment: { myValues: value } } of fragments) {
    fieldInfo[field] = value
  }
  return fieldInfo
}

export const dealWithProvenance = memoize((settings, fields) => {
  const { provenanceFields, hideProvenance } = settings
  return hideProvenance
  ? pickBy(fields, (value, key) => !provenanceFields.has(key))
  : fields
})

