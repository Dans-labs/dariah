import React from 'react'
import { connect } from 'react-redux'

import { emptyO } from 'utils'

import Fulltext from 'Fulltext'
import ByValue from 'ByValue'
import EUMap from 'EUMap'

const filterClass = {
  Fulltext,
  EUMap,
  ByValue,
}

const Filter = ({
  filters, tables, table, filterTag, listIds,
  filteredAmount, filteredAmountOthers, amounts,
}) => {
  const { [table]: filterData = emptyO } = filters
  const { [table]: { fields, filterList } } = tables
  const { [filterTag]: filterSettings = emptyO } = filterData
  return (
    filterList == null
    ? <div>
        {'No filters for this list'}
      </div>
    : <div>
        {filterList.filter(x => fields[x.field]).map((filter, filterId) => {
          const { type } = filter
          const { [type]: Fclass } = filterClass
          const { [filterId]: filterSetting } = filterSettings
          return (
            <Fclass
              key={filterId}
              alterSection={`filter-${table}-${filterId}`}
              tables={tables}
              table={table}
              filterTag={filterTag}
              filterSetting={filterSetting}
              listIds={listIds}
              filterId={filterId}
              filterField={filter.field}
              filterLabel={filter.label}
              maxCols={filter.maxCols}
              filteredAmount={filteredAmount}
              filteredAmountOthers={filteredAmountOthers[filterId]}
              amounts={amounts[filterId]}
              expanded={filter.expanded}
            />
          )}
        )}
      </div>
  )
}

export default connect()(Filter)
