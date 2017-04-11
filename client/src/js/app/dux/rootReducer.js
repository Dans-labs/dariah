import { combineReducers } from 'redux'

import win from 'win.js'
import notify from 'notify.js'
import doc from 'doc.js'
import tables from 'tables.js'
import me from 'me.js'
import filter from 'filter.js'
import alter from 'alter.js'

/* ACTIONS */

/* ROOT REDUCER */

export default combineReducers({
  win,
  notify,
  doc,
  tables,
  me,
  filter,
  alter,
})

