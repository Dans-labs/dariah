import React, { Component } from 'react'

import Contribs from '../pure/Contribs.jsx'

import { getData } from '../helpers/data.js'
import { withContext, saveState } from '../helpers/hoc.js'
import { columnStyle } from '../helpers/ui.js'

/**
 * @class
 * @classdesc
 *
 * **stateful** {@link external:Component|Component}
 *
 * ## The list of "my" contributiuons
 *
 * Displays the list of contributions of the current user in the left column,
 * with a details/edit view in the right column.
 *
 * See also:
 * * {@link Contribs} The list of filtered contributions in the right column
 */
class ContribsMy extends Component {
/**
 * @method
 * @param {Contrib[]} contribdata (from *state*) The list of contribution records as it comes form mongo db,
 * plus a list of fields that is provided for each row (dependent on user permissions)
 * @param {Map} countries (from *state*) The country information as fetched from the database on the server.
 * Organized as a {Map} keyed by Two-letter country codes.
 * @returns {Fragment}
*/
  render() {
    const { contribdata, countries, users } = this.state;
    const { usersMap, countriesMap, children, route } = this.props;
    const { progs } = route;
    if (contribdata == null || countries == null || users == null) {
      return <div/>
    }
    const { contribs, fields } = contribdata;
    for (const x of users) {usersMap.set(x._id, x)}
    for (const x of countries) {countriesMap.set(x._id, x)}
    return (
      <div>
        <div style={columnStyle('rightLeft')}>
          <p
            style={{fontWeight: 'bold', backgroundColor: '#eeeeff'}}
          >{contribs.length} contributions</p>
          <Contribs filteredData={contribs} inplace={false} progs={progs}/>
        </div>
        <div style={columnStyle('rightRight')}>
          {children}
        </div>
      </div>
    )
  }
/**
 * @method
 * @param {Contrib[]} contribs (from *state*) The list of contribution records as it comes form mongo db
 * @param {Map} countries (from *state*) The country information as fetched from the database on the server.
 * Organized as a {Map} keyed by Two-letter country codes.
 * @returns {Object} The data fetched from the server.
*/
  componentDidMount() {
    const { contribdata, countries, users } = this.state;
    if (contribdata == null || countries == null || users == null) {
      getData([
          {
            type: 'db',
            path: '/my_contribs',
            branch: 'contribdata',
          },
          {
            type: 'db',
            path: '/member_country',
            branch: 'countries',
          },
          {
            type: 'db',
            path: `/users`,
            branch: 'users',
          },
        ],
        this,
        this.props.notification.component
      );
    }
  }
}

export default withContext(saveState(ContribsMy, 'ContribsMy', {contribs: null, countries: null, users: null}))

