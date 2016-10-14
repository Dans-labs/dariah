import React, { Component, PropTypes } from 'react';
import Facet from './Facet.jsx';
import CheckboxI from './CheckboxI.jsx';
import Stats from './Stats.jsx';
import ShowHide from './ShowHide.jsx';
import { placeFacets, testAllChecks } from '../helpers/filters.js';

export default class Bymeta extends Component {
  constructor() {
    super();
    this.rows = null;
  }
  componentWillMount() {
    const {
      filterField,
      fieldValues,
      maxcols,
    } = this.props;
    this.rows = placeFacets(filterField, fieldValues, maxcols);
  }
  render () {
    const {
      filterId,
      filterField,
      filterSettings,
      filteredAmount,
      filteredAmountOthers,
      amounts,
      updFilter,
    } = this.props;
    const statStyle = {align: 'right'};
    return (
      <div>
        <p style={{fontWeight: 'bold', marginTop: '1em', marginBottom: '0.2em', borderTop: '1px solid black'}}>
          <CheckboxI
            filterId={filterId}
            states={testAllChecks(filterSettings)}
            updFilter={updFilter}
          /> By {filterField}{' '}
          <Stats subTotal={filteredAmount} total={filteredAmountOthers}/>{' '}
          <ShowHide showinit={true} component={this.refs.table}/>
        </p>
        {this.rows == null ? (<p> -no facets </p>) : (
        <table ref='table'>
          <tbody>
            {this.rows.map((row, i) => (
              <tr key={i}>
                {row.map((f, j) => {
                  if (f == null) {
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
        </table>
        )}
      </div>
    )
  }
}

Bymeta.propTypes = {
  filterId: PropTypes.number.isRequired,
  filterField: PropTypes.string.isRequired,
  filterSettings: PropTypes.object.isRequired,
  filteredAmount: PropTypes.number.isRequired,
  amounts: PropTypes.object.isRequired,
  maxcols: PropTypes.number.isRequired,
  fieldValues: PropTypes.object.isRequired,
  updFilter: PropTypes.func.isRequired,
}


