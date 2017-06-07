import { memoize, emptyF } from 'utils'

import { getValueList, listValues } from 'tables'

const allProps = {
  criteria: {
    typeContribution: {
      subset: {
        masterTable: 'package',
        linkField: 'package',
        masterField: 'typeContribution',
      },
      props: {
        optionStyle: { true: '', false: 'deprec' },
      },
    },
  },
}

const getContents = (tables, table, eId, { masterTable, linkField, masterField }) => {
  const { [table]: { entities: { [eId]: { values: { [linkField]: masterId } } } } } = tables
  return listValues(tables, masterTable, masterId, masterField)
}

export const makeProps = memoize((tables, table, field) => {
  const { [table]: tableProps } = allProps
  if (tableProps == null) {return emptyF}
  const { [field]: fieldProps } = tableProps
  if (fieldProps == null) {return emptyF}
  const { valueList } = getValueList({ tables }, { table, field })

  return memoize(eId => {
    const { subset, props } = fieldProps
    const thisSubset = getContents(tables, table, eId, subset)


    const newProps = {}
    valueList.forEach(value => {
      newProps[value] = props[thisSubset.has(value)]
    })
    return newProps
  })
})
