import React, { Component, PropTypes } from 'react'

import FilterCompute from './FilterCompute.jsx'
import { filterList } from '../pure/Filters.jsx'
import { compileFiltering } from '../helpers/filtering.js'
import { getData } from '../helpers/data.js'
import { withContext, saveState } from '../helpers/hoc.js'

/**
 * @class
 * @classdesc
 *
 * **stateful** {@link external:Component|Component}
 *
 * Displays one of a list of alternatives
 * and lets the user cycle through the alternatives.
 *
 * <img src="/api/file/tech/docs/design/design.002.jpeg" width="800"/>
 */
class ContribsFiltered extends Component {
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
      getData([
          {
            type: 'db',
            path: '/list_contrib',
            branch: 'contribs',
          },
          {
            type: 'db',
            path: '/member_country',
            branch: 'countries',
          },
        ],
        this,
        this.props.notification.component
      );
    }
  }
}

ContribsFiltered.propTypes = {
};

export default withContext(saveState(ContribsFiltered, 'ContribsFiltered', {contribs: null, countries: null}))
