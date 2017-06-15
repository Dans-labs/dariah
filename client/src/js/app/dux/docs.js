import update from 'immutability-helper'

import { accessData } from 'server'
import { propsChanged, makeReducer } from 'utils'

/* ACTIONS */
/*
 * Most actions call accessData, which will dispatch the ultimate fetch action.
 */

export const fetchDoc = props => {
  const { docDir, docName, docExt } = props
  const path = `${docDir}/${docName}.${docExt}`
  return accessData({ type: 'fetchDoc', contentType: 'json', path, desc: `document ${docName}` })
}

/* REDUCER */

const flows = {
  fetchDoc(state, { path, data }) {
    if (data == null) {return state}
    return update(state, { [path]: { $set: data } })
  },
}

export default makeReducer(flows)

/* SELECTORS */

export const getDoc = ({ docs }, { docDir, docName, docExt }) => ({
  text: docs[`${docDir}/${docName}.${docExt}`],
})

/* HELPERS */

export const needDoc = props => (props.text == null)

export const changedDoc = (newProps, oldProps) => (
  propsChanged(newProps, needDoc, oldProps, ['docDir', 'docName', 'docExt'])
)

