import { makeSet } from 'memo'

/* ACTIONS */

/* REDUCER */

/* SELECTORS */

export const getForms = ({ form }) => ({ form: getKeys(form) })

/* HELPERS */

const getKeys = form => makeSet(Object.keys(form))
