import React, { PropTypes } from 'react';

import Fulltext from './Fulltext.jsx';
import Bymeta from './Bymeta.jsx';
import EUMap from './EUMap.jsx';

export const filterList = [
  {kind: Fulltext, name: 'Fulltext', field: 'title',               maxcols: null},
  {kind: EUMap,    name: 'EUMap',    field: 'country',             maxcols: 3},
  {kind: Bymeta,   name: 'Bymeta',   field: 'typeContribution',    maxcols: 2},
  {kind: Bymeta,   name: 'Bymeta',   field: 'tadirahActivities',   maxcols: 2},
  {kind: Bymeta,   name: 'Bymeta',   field: 'tadirahObjects',      maxcols: 2},
  {kind: Bymeta,   name: 'Bymeta',   field: 'tadirahTechniques',   maxcols: 1},
]

const Filters = ({ filterSettings, fieldValues, filteredData, filteredAmount, filteredAmountOthers, amounts, updFilter, countries }) => (
  <div>
    {filterList.map((filter, filterId) => {
      const needs = filter.name == 'EUMap' ? {countries} : {};
      const Fclass = filter.kind;
      return (
        <Fclass
          key={filterId}
          filterId={filterId}
          filterField={filter.field}
          maxcols={filter.maxcols}
          filterSettings={filterSettings.get(filterId)}
          fieldValues={fieldValues.get(filter.field)}
          filteredAmount={filteredAmount}
          filteredAmountOthers={filteredAmountOthers.get(filterId)}
          amounts={amounts.get(filterId)}
          updFilter={updFilter}
          {...needs}
        />
      );}
    )}
  </div>
)

Filters.propTypes = {
  countries: PropTypes.object.isRequired,
  filterSettings: PropTypes.object.isRequired,
  fieldValues: PropTypes.object.isRequired,
  filteredAmount: PropTypes.number.isRequired, 
  filteredAmountOthers: PropTypes.object.isRequired, 
  amounts: PropTypes.object.isRequired,
  updFilter: PropTypes.func.isRequired,
}

export default Filters;
