import React, { Component, PropTypes } from 'react'

import Contribs from './Contribs.jsx'
import Messages from './Messages.jsx'
import FilterContainer from './FilterContainer.jsx'
import { filterList } from './Filters.jsx'
import { compileFiltering } from '../helpers/filters.js'
import { getData } from '../helpers/data.js'

export default class ContribsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {contribs: null, countries: null, msgs: []};
  }
  componentDidMount() {
    getData('list_contrib', 'contribs', this.setState.bind(this), (()=>this.state).bind(this));
    getData('member_country', 'countries', this.setState.bind(this), (()=>this.state).bind(this));
  }
  render() {
    const { contribs, countries, msgs } = this.state;
    if (contribs === null || countries === null) {
      return <Messages data={msgs}/>
    }
    const { fieldValues, filterInit } = compileFiltering(contribs, filterList);
    const countriesMap = new Map(countries.map(x => [x._id, x]));
    return <FilterContainer
      contribs={contribs}
      countries={countriesMap}
      fieldValues={fieldValues}
      filterInit={filterInit}
    />
  }
}

ContribsContainer.propTypes = {
}
