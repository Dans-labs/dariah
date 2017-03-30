import React from 'react'
import { connect } from 'react-redux'

import FullText from 'FullText.jsx'
import ByValue from 'ByValue.jsx'
import EUMap from 'EUMap.jsx'

import { getTableFilters } from 'tables.js'

const filterClass = {
  FullText,
  EUMap,
  ByValue,
}

const Filter = ({
  tables,
  table,
  fields,
  filterList, 
  filteredAmount, filteredAmountOthers,
  amounts,
}) => (
  <div>
    {filterList.filter(x => fields[x.field]).map((filter, filterId) => {
      const { type } = filter
      const { [type]: Fclass } = filterClass
      if (false && type != 'FullText') {
        return <p key={filterId}>{type}</p>
      }
      return (
        <Fclass
          key={filterId}
          table={table}
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
