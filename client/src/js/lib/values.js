import React from 'react'
import Markdown from 'react-markdown'

import { memoize } from 'memo'
import { emptyS, emptyA, emptyO } from 'utils'
import { applyTemplate } from 'templates'

import { repr } from 'tables'
import { compileActive } from 'workflow'

import Input from 'Input'
import Bool3 from 'Bool3'
import MarkdownArea from 'MarkdownArea'

const valTypes = {
  bool: { component: Input, type: 'checkbox', props: emptyO },
  bool3: {component: Bool3, props: emptyO },
  number: { component: Input, type: 'text', props: emptyO },
  text: { component: Input, type: 'text', props: emptyO },
  datetime: { component: Input, type: 'text', props: emptyO },
  email: { component: Input, type: 'text', props: emptyO },
  url: { component: Input, type: 'text', props: emptyO },
  textarea: {
    component: MarkdownArea,
    type: 'text',
    props: { alterSection: 'markdownfield' },
  },
}
const { text: DEFAULT_TYPE } = valTypes

export const getValType = valType => {
  const { [valType]: typing = DEFAULT_TYPE } = valTypes
  return typing
}

const valuePrepare = memoize(
  ({
    settings,
    me,
    tables,
    table,
    valType,
    relField,
    activeItems,
    inactive,
  }) => (value, rep) => {
    if (valType === 'textarea') {
      return [rep, { source: rep }, 'Markdown']
    }
    if (valType === 'url') {
      return [rep, { href: rep, target: '_blank' }, 'a']
    }
    if (valType === 'email') {
      const mailLink =
        rep == null || rep.startsWith('mailto:') ? rep : `mailto:${rep}`
      return [rep, { href: mailLink, target: '_blank' }, 'a']
    }
    const classNames = []
    const link = {}
    let elem = 'span'
    if (typeof valType === 'object') {
      const { relTable } = valType
      const { [relTable]: { entities: relEntities } = emptyO } = tables
      const { [value]: relRecord = emptyO } = relEntities
      const { values = emptyO } = relRecord
      if (relField == null) {
        const linkMe = `/data/${relTable}/list/${value}`
        if (value != null) {
          const templateApplied = applyTemplate({
            settings,
            me,
            tables,
            table: relTable,
            eId: value,
            kind: 'related',
            relTable: table,
            values,
            linkMe,
          })
          if (templateApplied) {
            return [templateApplied]
          }
        }
        classNames.push('tag')
        link.href = linkMe
        elem = 'a'
      } else {
        const {
          [relTable]: {
            fieldSpecs: {
              [relField]: { valType: relValType, multiple: relMultiple },
            },
          },
        } = tables
        const relPrepare = valuePrepare({
          settings,
          me,
          tables,
          table: relTable,
          valType: relValType,
          activeItems,
          inactive,
        })
        const { [relField]: relValues } = values
        const xReps = relMultiple
          ? (relValues || emptyA)
              .map((relValue, i) => relPrepare(relValue, rep[i]))
              .filter(x => x != null)
          : relPrepare(relValues, rep)
        return relMultiple
          ? [(xReps || emptyA).map((r, i) => putElem(r, i)), emptyO, 'div']
          : xReps
      }
    }
    const className = classNames.length
      ? { className: classNames.join(' ') }
      : emptyO

    if (activeItems == null || inactive == null || activeItems.has(value)) {
      return [rep, { ...className, ...link }, elem]
    }
    const { disabled, attributes } = inactive
    if (disabled) {
      classNames.push('disabled')
    }
    return [
      rep,
      {
        ...link,
        ...(classNames.length
          ? mergeClassnames(classNames, attributes)
          : attributes),
      },
      elem,
    ]
  },
  { 0: 1 },
)

const putElem = ([rep, attributes, elem], i) => {
  const r = rep || emptyS
  if (i == null && attributes == null && elem == null) {
    return r
  }
  const keyAtt = i == null ? emptyO : { key: i }
  const atts = { ...(attributes || emptyO), ...keyAtt }
  if (elem == 'Markdown') {
    return <Markdown {...atts} />
  }
  const Elem = elem || 'span'
  return <Elem {...atts}>{r}{' '}</Elem>
}

/*
 * Retrieve a value of a field and package it for readonly usage.
 * Depending on settings and active items it might be wrapped into elements with attributes.
 */
export const wrappedRepr = memoize(
  ({
    settings,
    me,
    tables,
    table,
    field,
    relField,
    values,
  }) => {
    const { [table]: { fieldSpecs } } = tables
    const { [field]: { valType, multiple } } = fieldSpecs
    const { inactive = null } = typeof valType === 'object' ? valType : emptyO
    const activeItems = inactive ? compileActive(tables, field) : null
    const prepare = valuePrepare({
      settings,
      me,
      tables,
      table,
      valType,
      relField,
      activeItems,
      inactive,
    })
    const reps = repr(
      tables,
      table,
      field,
      valType,
      multiple,
      relField,
      values,
      settings,
    )
    const xReps = multiple
      ? (values || emptyA)
          .map((value, i) => prepare(value, reps[i]))
          .filter(x => x != null)
      : prepare(values, reps)
    return multiple ? (
      <div>{xReps.map((rep, i) => putElem(rep, i))}</div>
    ) : (
      putElem(xReps)
    )
  },
  { 0: 1 },
)

const mergeClassnames = (classNames, attributes) => {
  const className = classNames.join(' ')
  return attributes == null
    ? { className }
    : {
        ...attributes,
        className: `${className} ${attributes.className || emptyS}`,
      }
}

export const composeAttributes = memoize(
  (activeItems, inactive) => (value, className) => {
    const isInactive = activeItems != null && !activeItems.has(value)
    const { disabled, attributes } = isInactive ? inactive || emptyO : emptyO
    const finalAttributes =
      className == null
        ? attributes
        : attributes == null
          ? { className }
          : {
              ...attributes,
              className: `${className} ${attributes.className || emptyS}`,
            }
    return disabled
      ? mergeClassnames(['disabled'], finalAttributes)
      : finalAttributes
  },
  emptyO,
)
