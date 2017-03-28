import React from 'react'

import FullText from 'FullText.jsx'
import ByValue from 'ByValue.jsx'
import EUMap from 'EUMap.jsx'

const filterClass = {
  FullText,
  EUMap,
  ByValue,
}

const Filter = ({
  table,
  fields, fieldValues,
  filterList, filterSettings,
  filteredAmount, filteredAmountOthers,
  amounts,
  updFilter,
}) => (
  <div>
    {filterList.filter(x => fields[x.field]).map((filter, filterId) => {
      const { type } = filter
      const { [type]: Fclass } = filterClass
      return (
        <Fclass
          key={filterId}
          table={table}
          filterId={filterId}
          filterField={filter.field}
          filterLabel={filter.label}
          maxCols={filter.maxCols}
          filterSettings={filterSettings.get(filterId)}
          fieldValues={fieldValues.get(filter.field)}
          filteredAmount={filteredAmount}
          filteredAmountOthers={filteredAmountOthers.get(filterId)}
          amounts={amounts.get(filterId)}
          updFilter={updFilter}
          expanded={filter.expanded}
        />
      )}
    )}
  </div>
)

export default Filter
