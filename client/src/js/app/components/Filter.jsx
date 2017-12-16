import React from 'react'
import { connect } from 'react-redux'

import { emptyS, emptyO } from 'utils'

import ErrorBoundary from 'ErrorBoundary'
import Fulltext from 'Fulltext'
import ByValue from 'ByValue'
import EUMap from 'EUMap'

const filterClass = {
  Fulltext,
  EUMap,
  ByValue,
}

const Filter = ({
  filters,
  tables,
  table,
  filterTag,
  listIds,
  filteredAmount,
  filteredAmountOthers,
  amounts,
  compact,
}) => {
  const { [table]: filterData = emptyO } = filters
  const { [table]: { fields, filterList } } = tables
  const { [filterTag]: filterSettings = emptyO } = filterData
  return filterList == null ? (
    'No filters for this list'
  ) : (
    <ErrorBoundary>
      <div className={`filterSequence ${compact ? 'compact' : emptyS}`}>
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
              filterRelField={filter.relField}
              filterLabel={filter.label}
              maxCols={filter.maxCols}
              filteredAmount={filteredAmount}
              filteredAmountOthers={filteredAmountOthers[filterId]}
              amounts={amounts[filterId]}
              expanded={filter.expanded}
              compact={compact}
            />
          )
        })}
      </div>
    </ErrorBoundary>
  )
}

export default connect()(Filter)
