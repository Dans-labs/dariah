import React, { Component, PropTypes } from 'react';
import Contribs from './Contribs.jsx';
import Filters, { filterList } from './Filters.jsx';

import { computeFiltering } from '../helpers/filters.js';

const newFilterSettings = (filterSettings, filterId, data) => {
  const freshFilterSettings = new Map([...filterSettings.entries()]);
  switch (typeof data) {
    case 'boolean': {
      const filterSetting = freshFilterSettings.get(filterId);
      freshFilterSettings.set(filterId, new Map([...filterSetting.keys()].map(valueId => [valueId, data])));
      break;
    }
    case 'string': {
      freshFilterSettings.set(filterId, data);
      break;
    }
    default: {
      const [valueId, filterSetting] = data;
      freshFilterSettings.get(filterId).set(valueId, filterSetting);
      break;
    }
  }
  return freshFilterSettings;
}

export default class FilterContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fillterSettings: null,
    };
  }
  columnStyle(width, kind) {
    const {
      winHeight,
    } = this.props;
    return {
      width: width,
      height: winHeight,
      overflow: 'auto',
      'WebkitOverflowScrolling': 'touch',
      float: kind || 'left',
      'paddingLeft': !kind ? '1em' : '0em',
      'paddingRight': !kind ? '1em' : '0em',
    };
  }
  updFilter(filterId, data) {
    const {
      filterSettings,
    } = this.state;
    this.setState({
      ...this.state,
      filterSettings: newFilterSettings(filterSettings, filterId, data),
    });
  }
  componentWillMount() {
    const {
      filterInit,
    } = this.props;
    this.setState({
      ...this.state,
      filterSettings: filterInit,
    });
  }
  render() {
    const {
      filterSettings,
    } = this.state;
    const {
      countries,
      contribs,
      fieldValues,
    } = this.props;
    const {
      filteredData,
      filteredAmountOthers,
      amounts,
    } = computeFiltering(
      contribs,
      filterList,
      fieldValues,
      filterSettings,
    );
    const columnStyle = this.columnStyle.bind(this);
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
        <div style={columnStyle('60%')}>
          <Contribs filteredData={filteredData}/>
        </div>
      </div>
    )
  }
}

FilterContainer.propTypes = {
  winHeight: PropTypes.number.isRequired,
  contribs: PropTypes.array.isRequired,
  countries: PropTypes.object.isRequired,
  fieldValues: PropTypes.object.isRequired,
  filterInit: PropTypes.object.isRequired,
}
