import React from 'react'
import Facet from 'Facet.jsx'
import CheckboxI from 'CheckboxI.jsx'
import Stats from 'Stats.jsx'
import Alternatives from 'Alternatives.jsx'
import { placeFacets, testAllChecks } from 'filtering.js'

/**
 * **purely functional** {@link external:Component|Component}
 * 
 * A widget by which the user can click the facets associated with one field.
 * There is also a collective checkbox, by which the user can check or uncheck all facets in one go.
 * All values that occur are displayed, with statistics in the form *subtotal of total*.
 *
 * ### Note on performance
 * There is a subtlety here. 
 * When we have the facets, we want to lay them out in a grid.
 * That work needs only be done upon construction,
 * and not for state updates in response to user
 * events on the filters.
 * So we want to do the grid computation
 * {@link module:filtering.placeFacets|placeFacets}
 * once, in an initialization stage, e.g. in the 
 * {@link external:constructor|constructor()}.
 * But it turns out that for the visual performance it does not matter.
 *
 * This is the virtue of React: the code for rendering just constructs a 
 * {@link external:Fragment|Fragment}, not the real {@link external:DOM|DOM}. 
 * The computation inside {@link module:filtering.placeFacets|placeFacets}
 * is just a little bit of juggling with tiny datastructures, so the fragment is constructed in no time.
 * See {@link external:Reconciliation|Reconciliation}.
 *
 * @class
 * @param {number} filterId The index of the filter in {@link module:Filters.filterList|filterList}
 * @param {string} filterField The name of the field in the contribs list whose values are being filtered
 * @param {Map} fieldValues A mapping of the valueIds to valueRepresentations for all values that occur in `filterField`
 * @param {Map} filterSettings The current state of the facets belonging to this filter
 * @param {number} filteredAmount The number of rows that have passed all filters
 * @param {number} filteredAmountOthers The number of rows that have passed all other filters  
 * @param {Map} amounts The number of rows that have passed all filters per valueId occurring in this field
 * @param {number} maxCols The maximum number of columns to use when placing facets in a grid
 * @param {FilterCompute#updFilter} updFilter Callback to update the state when user event has occurred 
 * @returns {Fragment}
 */
const ByValue = ({
  filterId, filterField, filterLabel,
  fieldValues, filterSettings,
  filteredAmount, filteredAmountOthers,
  amounts, maxCols, updFilter,
  expanded,
}) => { 
  const rows = placeFacets(fieldValues, maxCols);
  const statStyle = {align: 'right'};
  const labelStyle = {
    marginTop: '0.05em', marginBottom: '0.05em',
    fontSize: 'small',
    fontWeight: 'bold',
  };
  const widgetStyle = {
    marginTop: '0.3em', marginBottom: '0.1em',
    border: '1px solid #aaaaaa',
    borderRadius: '6px',
  };
  return (
    <div style={widgetStyle}>
      {rows === null ? (<p> -no facets </p>) : (
      <Alternatives tag={filterField}
        controlPlacement={control => (
          <p style={labelStyle}>
            <CheckboxI
              filterId={filterId}
              states={testAllChecks(filterSettings)}
              updFilter={updFilter}
            /> {filterLabel}{' '}
            <Stats subTotal={filteredAmount} total={filteredAmountOthers}/>{' '}
            {control}
          </p>
        )}
        controls={[
          (handler => <a className='fa fa-chevron-down' href='#' onClick={handler}/>),
          (handler => <a className='fa fa-chevron-right' href='#' onClick={handler}/>),
        ]}
        initial={expanded?0:1}
        alternatives={[
          (<table>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i}>
                  {row.map((f, j) => {
                    if (f === null) {
                      return <td key={j}/>;
                    }
                    const [valueId, valueRep] = f;
                    return [
                      (<td
                        key={j}
                        style={j > 0 ? {paddingLeft: '0.5em'} : {}}
                        className="facet"
                      >
                        <Facet
                          key={valueId}
                          filterId={filterId}
                          valueId={valueId}
                          valueRep={valueRep}
                          checked={filterSettings.get(valueId)}
                          updFilter={updFilter}
                        />
                      </td>),
                      (<td
                        style={{textAlign: 'right', paddingLeft: '0.5em'}}
                      >
                        <Stats subTotal={amounts.get(valueId)}/>
                      </td>),
                    ]})}
                </tr>
                ))}
            </tbody>
          </table>),
          (<div/>),
        ]}
      />
      )}
    </div>
  )
}

export default ByValue
