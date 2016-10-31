import React, { Component, PropTypes } from 'react'

import FilterCompute from './FilterCompute.jsx'
import { filterList } from '../pure/Filters.jsx'
import { compileFiltering } from '../helpers/filters.js'
import { getData } from '../helpers/data.js'
import { withContext } from '../helpers/hoc.js'

class ContribsFiltered extends Component {
  constructor(props) {
    super(props);
    this.store = props.store;
    this.key = 'ContribsFiltered';
    this.store.register(this, this.key, {contribs: null, countries: null})
  }
  componentWillUnmount() {
    this.store.save(this.key);
  }
  render() {
    const { contribs, countries } = this.state;
    if (contribs == null || countries == null) {
      return <div/>
    }
    const { fieldValues, filterInit } = compileFiltering(contribs, filterList);
    const countriesMap = new Map(countries.map(x => [x._id, x]));
    return <FilterCompute
      contribs={contribs}
      countries={countriesMap}
      fieldValues={fieldValues}
      filterInit={filterInit}
    />
  }
  componentDidMount() {
    const { contribs, countries } = this.state;
    if (contribs == null || countries == null) {
      getData({
          contribs: `list_contrib`,
          countries: 'member_country',
        },
        this,
        this.props.notification.component,
      );
    }
  }
}

ContribsFiltered.propTypes = {
};

export default withContext(ContribsFiltered)
