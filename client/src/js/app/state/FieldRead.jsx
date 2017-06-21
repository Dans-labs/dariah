import React from 'react'
import { connect } from 'react-redux'
import Markdown from 'react-markdown'

import { emptyA, emptyO } from 'utils'
import { getActive } from 'custom'

import { getTables, repr } from 'tables'

const FieldRead = ({ field, tables, table, myValues }) => {
  const { [table]: { fieldSpecs } } = tables
  const { [field]: { valType, multiple } } = fieldSpecs
  const { inactive = null } = typeof valType == 'object' ? valType : emptyO
  const activeItems = inactive ? getActive(tables, field) : null
  console.warn(`FIELD ${field} active items`, activeItems, valType)

  const isArea = valType == 'textarea'
  const sep = isArea ? '\n\n' : ' | '
  const items = []
  if (multiple) {
    (myValues || emptyA).forEach((value, i) => {
      const rep = repr(tables, table, valType, value)
      items.push(
        isArea
        ? rep
        : (activeItems == null || inactive == null || activeItems.has(value))
          ? <span key={i}>{rep}</span>
          : <span key={i} title={inactive.title} className={inactive.className} >{rep}</span>
      )
      items.push(isArea ? sep : <span key={`sep-${i}`} >{sep}</span>)
    })
  }
  else {
    const rep = repr(tables, table, valType, myValues)
    items.push(
      isArea
      ? rep
      : (activeItems == null || inactive == null || activeItems.has(myValues))
        ? <span key={0} >{rep}</span>
        : <span key={0} title={inactive.title} className={inactive.className} >{rep}</span>
    )
  }
  return isArea
  ? <Markdown source={items.join('')} />
  : <span>{items}</span>
}

export default connect(getTables)(FieldRead)
