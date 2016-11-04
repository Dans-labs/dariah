import React, { Component, PropTypes } from 'react'
import Facet from '../pure/Facet.jsx'
import CheckboxI from './CheckboxI.jsx'
import Stats from '../pure/Stats.jsx'
import Alternatives from '../state/Alternatives.jsx'
import { placeFacets, testAllChecks } from '../helpers/filters.js'

/**
 * @class
 * @classdesc
 * **stateless, DOM-modifying** {@link external:Component|Component}
 */
class ByValue extends Component {
  constructor() {
    super();
    this.rows = null;
  }
  componentWillMount() {
    const { filterField, fieldValues, maxcols } = this.props;
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
