import React, { Component, PropTypes } from 'react'
import Facet from '../pure/Facet.jsx'
import CheckboxI from './CheckboxI.jsx'
import Stats from '../pure/Stats.jsx'
import Alternatives from '../state/Alternatives.jsx'
import { placeFacets, testAllChecks } from '../helpers/filtering.js'

/**
 * @class
 * @classdesc
 * **stateless, needs-lifecycle method** {@link external:Component|Component}
 * 
 * A widget by which the user can click the facets associated with one field.
 * There is also a collective checkbox, by which the user can check or uncheck all facets in one go.
 * All values that occur are displayed, with statistics in the form *subtotal of total*.
 *
 * There is a subtlety here. 
 * We do not need a
 * {@link external:LifeCycle|life cycle method}
 * here for modifying the DOM, but for avoiding work.
 * When we have the facets, we want to lay them out in a grid.
 * That work needs only be done upon construction,
 * and not for state updates in response to user
 * events on the filters.
 * 
 * So we need to put inititialization functionality in the constructor.
 */
class ByValue extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    const { filterField, fieldValues, maxcols } = props;
    this.rows = placeFacets(filterField, fieldValues, maxcols);
  }
  render () {
    const {
      filterId, filterField, filterSettings,
      filteredAmount, filteredAmountOthers,
      amounts, updFilter,
    } = this.props;
    const statStyle = {align: 'right'};
    return (
      <div>
        {this.rows === null ? (<p> -no facets </p>) : (
        <Alternatives tag={filterField}
          controlPlacement={control => (
            <p style={{fontWeight: 'bold', marginTop: '1em', marginBottom: '0.2em', borderTop: '1px solid black'}}>
              <CheckboxI
                filterId={filterId}
                states={testAllChecks(filterSettings)}
                updFilter={updFilter}
              /> By {filterField}{' '}
              <Stats subTotal={filteredAmount} total={filteredAmountOthers}/>{' '}
              {control}
            </p>
          )}
          controls={[
            (handler => <a className='fa fa-chevron-down' href='#' onClick={handler}/>),
            (handler => <a className='fa fa-chevron-right' href='#' onClick={handler}/>),
          ]}
          alternatives={[
            (<table>
              <tbody>
                {this.rows.map((row, i) => (
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
}

ByValue.propTypes = {
  filterId: PropTypes.number.isRequired,
  filterField: PropTypes.string.isRequired,
  filterSettings: PropTypes.object.isRequired,
  filteredAmount: PropTypes.number.isRequired,
  amounts: PropTypes.object.isRequired,
  maxcols: PropTypes.number.isRequired,
  fieldValues: PropTypes.object.isRequired,
  updFilter: PropTypes.func.isRequired,
}

export default ByValue
