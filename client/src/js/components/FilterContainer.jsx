import React, { Component, PropTypes } from 'react'
import Contribs from './Contribs.jsx'
import Filters, { filterList } from './Filters.jsx'

import { newFilterSettings, computeFiltering } from '../helpers/filters.js'
import { columnStyle } from '../helpers/ui.js'

export default class FilterContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { fillterSettings: null };
  }
  updFilter(filterId, data) {
    const { filterSettings } = this.state;
    this.setState({...this.state,
      filterSettings: newFilterSettings(filterSettings, filterId, data),
    });
  }
  componentWillMount() {
    const { filterInit } = this.props;
    this.setState({...this.state,
      filterSettings: filterInit,
    });
  }
  render() {
    const { filterSettings } = this.state;
    const { countries, contribs, fieldValues } = this.props;
    const { filteredData, filteredAmountOthers, amounts } = computeFiltering( contribs, filterList, fieldValues, filterSettings);
    return (
      <div>
        <div style={columnStyle('40%', 'left')}>
          <p
            style={{fontWeight: 'bold', backgroundColor: '#eeeeff'}}
          >Showing {filteredData.length} of {contribs.length}</p>
          <Filters
            countries={countries}
            fieldValues={fieldValues}
            filteredAmount={filteredData.length}
            filteredAmountOthers={filteredAmountOthers}
            amounts={amounts}
            filterSettings={filterSettings}
            updFilter={this.updFilter.bind(this)}
          />
        </div>
        <div style={columnStyle('60%', 'right')}>
          <Contribs filteredData={filteredData}/>
        </div>
      </div>
    )
  }
}

FilterContainer.propTypes = {
  contribs: PropTypes.array.isRequired,
  countries: PropTypes.object.isRequired,
  fieldValues: PropTypes.object.isRequired,
  filterInit: PropTypes.object.isRequired,
}
