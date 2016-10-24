import React, { Component, PropTypes } from 'react'
import 'whatwg-fetch'

import Contribs from './Contribs.jsx'
import Messages from './Messages.jsx'
import FilterContainer from './FilterContainer.jsx'
import { filterList } from './Filters.jsx'
import { compileFiltering } from '../helpers/filters.js'

const dataUrl = '/data/'

export default class ContribsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {contribs: null, countries: null, msgs: []};
  }
  getData(source, slice) {
    const { msgs, } = this.state;
    this.setState({...this.state,
      msgs: [...msgs, {kind: 'special', text: `${slice} loading ...`}],
    });
    fetch(`${dataUrl}${source}`)
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({...this.state,
        msgs: [...msgs, {kind: 'info', text: `${slice} loaded.`}],
        [slice]: responseData.data,
      });
    })
    .catch((error) => {
      this.setState({...this.state,
        msgs: [...msgs, {kind: 'error', text: `${slice} failed to load`}],
      });
      console.log(`${slice} failed to load`, error.toString());
    });
  }
  componentDidMount() {
    this.getData('list_contrib', 'contribs');
    this.getData('member_country', 'countries');
  }
  render() {
    const { contribs, countries } = this.state;
    if (contribs === null || countries === null) {
      return <p> -loading data- </p>
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
