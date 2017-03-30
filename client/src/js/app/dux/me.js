/* ACTIONS */
/*
 * Actions are dispatch in the process of fetching data from the server
 */

/* REDUCER */

export default (state = {}, { type, path, data }) => {
  switch (type) {
    case 'fetchMe': {
      if (data == null) {return {}}
      return { ...data }
    }
    default: return state
  }
}

/* SELECTORS */

export const getMe = ({ me }) => ({ me })

/* HELPERS */

