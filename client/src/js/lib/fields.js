import React from 'react'
import { reduxForm } from 'redux-form'
import {countryBorders} from 'europe.geo'

import Input from 'Input'
import MarkdownArea from 'MarkdownArea'

const editStatusGeneric = canSubmit => ({ hasEditable, dirty, invalid, submitting, reset, error }) => (
  hasEditable ?
    <span>
      {
        (dirty && !invalid && !submitting) ? (
          canSubmit ?
            <button
              type="submit"
              className={'button-large edit-action fa fa-check'}
              title={'save'}
            /> :
            <span
              className={'warning-o fa fa-pencil'}
              title={'changed'}
            />
          ) : null
      }
      {
        (dirty && invalid && !submitting) ?
          <span
            className={'error-o fa fa-exclamation-circle'}
            title={'no changes'}
          /> : null
      }
      {
        (!dirty && !submitting) ?
          <span
            className={'good-o fa fa-circle'}
            title={'no changes'}
          /> : null
      }
      {
        submitting ?
          <span
            className={'special-o fa fa-spinner fa-spin'}
            title={'saving'}
          /> : null
      }
      {' '}
      {
        (dirty && !submitting) ? (
          canSubmit ?
            <button
              type="button"
              className={'button-large error-o fa fa-close'}
              title={'reset values to last saved'}
              onClick={reset}
            /> : null
          ) : null
      }
      {' '}
      {
        error && canSubmit && <span className={'invalid diag'}>{error}</span>
      }
    </span> :
   null
)
export const editStatus = editStatusGeneric(true)

export const EditStatus = reduxForm({
  destroyOnUnmount: false,
  enableReinitialize: true,
  keepDirtyOnReinitialize: true,
})(editStatusGeneric(false))

export const editClass = (dirty, invalid) => invalid ? 'invalid' : dirty ? 'dirty' : ''

export const editDelete = (perm, buttonClass, callBack) => (
  perm.delete ? (
    <div
      className={`grid-cell ${buttonClass} error-o fa fa-trash delete`}
      title={'delete this record'}
      onClick={callBack}
    />
  ) : null
)

/* Workaround (6.6.3) for issue https://github.com/erikras/redux-form/issues/2841
 * We do a mostly unnecessary reset() after a successful submit.
 * There is bug in redux-form: if you remove a field from a field array, a spurious
 * empty field will be present after a submit.
 * This reset removes that field.
 *
 * Still needed in 6.7.0
 */
export const onSubmitSuccess = (result, dispatch, { reset }) => reset()

const valTypes = {
  bool: { component: Input, type: 'checkbox' },
  text: { component: Input, type: 'text' },
  datetime: { component: Input, type: 'text' },
  email: { component: Input, type: 'text' },
  url: { component: Input, type: 'text' },
  textarea: { component: MarkdownArea, type: 'text' },
}
const { text: DEFAULT_TYPE } = valTypes

export const getValType = valType => {
  const { [valType]: typing = DEFAULT_TYPE } = valTypes
  return typing
}

const iso2s = new Set(countryBorders.features.map(({ properties: { iso2 } }) => iso2))

const detailFields = (tables, eId, details, detailOrder) => (
  (detailOrder || []).map(name => {
    const { label, table: detailTable, linkField } = details[name]
    const {
      [detailTable]: {
        entities: detailEntities,
        allIds: detailAllIds,
      },
    } = tables
    const detailListIds = detailAllIds.filter(_id => detailEntities[_id].values[linkField] == eId)
    return { name, label, fragment: { editable: false, nDetails: detailListIds.length } }
  })
)

export const makeFields = ({ tables, table, eId, fields, perm, ...props }) => {
  const { initialValues } = props
  const { [table]: { fieldSpecs, fieldOrder, details, detailOrder } } = tables
  console.warn(`MAKEFIELDS ${table}`, detailOrder)

  const fragments = []
  let hasEditable = false
  for (const field of fieldOrder) {
    const { [field]: f } = fields
    if (f == null) {continue}
    const { [field]: { label } } = fieldSpecs
    const { update: { [field]: editable } } = perm
    const { [field]: myValues } = initialValues
    if (editable) {hasEditable = true}
    const theField = {
      editable,
      table,
      myValues,
      ...props,
    }
    fragments.push({ field, label, fragment: theField })
  }
  fragments.push(...detailFields(tables, eId, details, detailOrder))
  return { fragments, hasEditable }
}

export const validation = {
  datetime(val) {
    if (val == null) {return}
    let times
    try {
      times = new Date(val)
    }
    catch (error) {
      return `not a valid date/time - ${error}`
    }
    if (isNaN(times)) {
      return `not a valid date/time`
    }
  },
  url(val) {
    if (val == null) {return}
    if (!val.match(/^https?:\/\//)) {
      return `urls should start with http:// or https://`
    }
  },
  email(val) {
    if (val == null) {return}
    if (val.match(/[^@a-zA-Z0-9_.-]/)) {
      return `email addresses may only contain alphanumeric characters, - _ and .`
    }
    if (!val.match(/@/)) {
      return `email addresses must contain one @`
    }
    if (val.match(/@.*@/)) {
      return `email addresses must contain exactly one @`
    }
    if (!val.match(/@[^.]+\.[^.]+.*$/)) {
      return `email addresses must end with a domain`
    }
  },
  number(val) {
    if (val == null) {return}
    if (isNaN(val)) {
      return `value must be a number`
    }
  },
  isoCountry(val) {
    if (val == null) {return}
    if (!iso2s.has(val)) {
      return `country code ${val} is not on the European map`
    }
  },
}

export const normalization = {
  datetime(val) {
    try {
      const times = new Date(val)
      return times.toISOString()
    }
    catch (error) {
      return val
    }
  },
}

