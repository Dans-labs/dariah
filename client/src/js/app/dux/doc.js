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
  return { data: doc[`${docDir}/${docName}.${docExt}`] }
}

/* ACTIONS */
/*
 * Actions are dispatch in the process of fetching data from the server
 */

/* HELPERS */

