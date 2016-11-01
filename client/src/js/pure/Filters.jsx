import React, { PropTypes } from 'react'

import FullText from './FullText.jsx'
import ByValue from '../object/ByValue.jsx'
import EUMap from '../object/EUMap.jsx'

/*
 * We have several kinds of filters:
 *
 * - FullText: Search in the title field for pattern. The pattern is entered by the user,
 *   the search is incremental, after each keystroke the results are updated.
 * - ByValue: Faceted search for values of a specific field.
 *   - EUMap: Faceted search on country, together with a map visualization
 *
 * The maxcols attribute specifies the number of columns in which the
 * individual facets must be displayed.
 *
 * The only function of this component is to call the right component with the right props
 * for each filter in the filterList.
 * 
 * filterList is also exported to the module that contains the helpers for filtering.
 * 
 * Filters is a pure function.
 * All filter computations have been done by stateful parent components, such as FilterCompute.
 * The filter results are being passed down as properties.
 * The incoming properties can be divided into
 * - fieldValues (which facets are there per filter?)
 * - filterSettings (what has the user typed or clicked?)
 * - filteredAmount, filteredAmountOthers, amounts (what are the statistics of the filtering?)
 * - updFilter (callback coming from a stateful parent, to be passed to children that receive user events)
 * - countries (extra information for the EUMap filter)
 * The outgoing properties are mostly the same, except that each individual filter
 * gets only the slice it needs.
 *
 */

export const filterList = [
  {kind: FullText,  name: 'FullText',  field: 'title',               maxcols: null},
  {kind: EUMap,     name: 'EUMap',     field: 'country',             maxcols: 3},
  {kind: ByValue,   name: 'ByValue',   field: 'typeContribution',    maxcols: 2},
  {kind: ByValue,   name: 'ByValue',   field: 'tadirahActivities',   maxcols: 2},
  {kind: ByValue,   name: 'ByValue',   field: 'tadirahObjects',      maxcols: 2},
  {kind: ByValue,   name: 'ByValue',   field: 'tadirahTechniques',   maxcols: 1},
]

const styles = {
    backgroundColor: '#ffffee',
}

const Filters = ({
  filterSettings, fieldValues, filteredData,
  filteredAmount, filteredAmountOthers,
  amounts, updFilter,
  countries
}) => (
  <div style={styles}>
    {filterList.map((filter, filterId) => {
      const needs = filter.name === 'EUMap' ? {countries} : {};
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
