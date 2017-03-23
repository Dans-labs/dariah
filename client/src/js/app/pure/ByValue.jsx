import React from 'react'
import Facet from 'Facet.jsx'
import CheckboxI from 'CheckboxI.jsx'
import Stat from 'Stat.jsx'
import Alternative from 'Alternative.jsx'
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
 * @param {number} filterId The index of the filter in the filterList
 * @param {string} filterField The name of the field in the item list whose values are being filtered
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
  table,
  filterId, filterField, filterLabel,
  fieldValues, filterSettings,
  filteredAmount, filteredAmountOthers,
  amounts, maxCols, updFilter,
  expanded,
}) => {
  const rows = placeFacets(fieldValues, maxCols)
  const control1 = handler => (<span className="button-small fa fa-chevron-down" onClick={handler} />)
  const control2 = handler => (<span className="button-small fa fa-chevron-right" onClick={handler} />)
  const controlPlacement = control => (
    <p className="facet" >
      <CheckboxI
        filterId={filterId}
        states={testAllChecks(filterSettings)}
        updFilter={updFilter}
      /> {filterLabel}{' '}
      <Stat subTotal={filteredAmount} total={filteredAmountOthers} />{' '}
      {control}
    </p>
  )
  return (
    <div className="facet" >{
      rows === null ? (<p>{' -no facets '}</p>) : (
        <Alternative
          tag={`${table}_${filterField}`}
          controlPlacement={controlPlacement}
          controls={[control1, control2]}
          initial={expanded ? 0 : 1}
          alternatives={[
            (<table key="table" >
              <tbody>
                {rows.map((row, i) => (
                  <tr key={i} >
                    {row.map((f, j) => {
                      if (f === null) {
                        return <td key={j} />
                      }
                      const [valueId, valueRep] = f
                      const facetClass = (j == 0) ? "facet" : "facet mid"
                      return [(
                        <td
                         key={valueId}
                         className={facetClass}
                        >
                          <Facet
                            filterId={filterId}
                            valueId={valueId}
                            valueRep={valueRep}
                            checked={filterSettings.get(valueId)}
                            updFilter={updFilter}
                          />
                        </td>
                      ), (
                        <td
                          key="stat"
                          className="statistic"
                        >
                          <Stat subTotal={amounts.get(valueId)} />
                        </td>
                      )]
                    })}
                  </tr>
                  ))}
              </tbody>
            </table>),
            (<div key="div" />),
          ]}
        />
      )}
    </div>
  )
}

export default ByValue
