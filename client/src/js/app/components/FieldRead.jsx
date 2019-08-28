//import React from 'react'
import { connect } from 'react-redux'

import { combineSelectors } from 'utils'
import { wrappedRepr } from 'values'

import { getSettings } from 'settings'
import { getMe } from 'me'

const FieldRead = ({
  settings,
  me,
  tables,
  table,
  field,
  relField,
  myValues,
}) => wrappedRepr({
    settings,
    me,
    tables,
    table,
    field,
    relField,
    values: myValues,
  })

const getInfo = combineSelectors(getMe, getSettings)

export default connect(getInfo)(FieldRead)
