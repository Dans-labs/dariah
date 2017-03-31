import { fetchData } from 'server.js'
import { propsChanged } from 'helpers.js'

/* ACTIONS */
/*
 * Most actions call fetchData, which will dispatch the ultimate fetch action.
 */

export const fetchDoc = (props) => {
  const { docDir, docName, docExt } = props
  const path = `${docDir}/${docName}.${docExt}`
  return fetchData({ type: 'fetchDoc', contentType: 'json', path, desc: `document ${docName}` })
}

/* REDUCER */

export default (state = {}, { type, path, data }) => {
  switch (type) {
    case 'fetchDoc': {
      if (data == null) {return { ...state, [path]: null }}
      return { ...state, [path]: data }
    }
    default: return state
  }
}

/* SELECTORS */

export const getDoc = ({ doc }, { docDir, docName, docExt }) => {
  return { text: doc[`${docDir}/${docName}.${docExt}`] }
}

/* HELPERS */

export const needDoc = props => (props.text == null)

export const changedDoc = (newProps, oldProps) => (
  propsChanged(newProps, needDoc, oldProps, ['docDir', 'docName', 'docExt'])
)

