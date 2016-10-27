import React, { Component, PropTypes } from 'react'

import FilterCompute from './FilterCompute.jsx'
import { filterList } from '../pure/Filters.jsx'
import { compileFiltering } from '../helpers/filters.js'
import { getData } from '../helpers/data.js'

export default class ContribsFiltered extends Component {
  constructor(props) {
    super(props);
    this.store = props.route.globals.store;
    this.sKey = this.constructor.name;
    if (!this.store.has(this.sKey)) {
      this.state = {contribs: null, countries: null};
    }
    else {
      this.state = this.store.get(this.sKey);
    }
  }
  componentWillUnmount() {
    this.store.set(this.sKey, this.state);
  }
  componentDidMount() {
    const { contribs, countries } = this.state;
    if (contribs == null || countries == null) {
      getData({
          contribs: 'list_contrib',
          countries: 'member_country',
        },
        this,
        this.props.route.globals.notification,
      );
    }
  }
  render() {
    const { contribs, countries } = this.state;
    if (contribs == null || countries == null) {
      return <div/>
    }
    const { fieldValues, filterInit } = compileFiltering(contribs, filterList);
    const countriesMap = new Map(countries.map(x => [x._id, x]));
    return <FilterCompute
      globals={this.props.route.globals}
      contribs={contribs}
      countries={countriesMap}
      fieldValues={fieldValues}
      filterInit={filterInit}
    />
  }
}

ContribsFiltered.propTypes = {
}
