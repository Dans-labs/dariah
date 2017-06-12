import React from 'react'
import { connect } from 'react-redux'

import { getTableFilters } from 'tables'

import Fulltext from 'Fulltext'
import ByValue from 'ByValue'
import EUMap from 'EUMap'

const filterClass = {
  Fulltext,
  EUMap,
  ByValue,
}

const Filter = ({
  table, filterTag, listIds,
  fields,
  filterList, filteredAmount, filteredAmountOthers, amounts,
}) => (
  filterList == null ?
    <div>
      {'No filters for this list'}
    </div> :
    <div>
      {filterList.filter(x => fields[x.field]).map((filter, filterId) => {
        const { type } = filter
        const { [type]: Fclass } = filterClass
        return (
          <Fclass
            key={filterId}
            table={table}
            filterTag={filterTag}
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

export default connect(getTableFilters)(Filter)
