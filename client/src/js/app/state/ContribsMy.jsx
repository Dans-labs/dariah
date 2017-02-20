import React, { Component } from 'react'

import Contribs from 'Contribs.jsx'
import ContribItemPre from 'ContribItemPre.jsx';

import { getData } from 'data.js'
import { withContext, saveState } from 'hoc.js'
import { columnStyle } from 'ui.js'

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
 * @param {Contrib[]} contribData (from *state*) The list of contribution records as it comes form mongo db,
 * plus a list of fields that is provided for each row (dependent on user permissions)
 * @param {Map} countries (from *state*) The country information as fetched from the database on the server.
 * Organized as a {Map} keyed by Two-letter country codes.
 * @returns {Fragment}
*/
  inserted(data) {
    this.setState({...this.state, inserted: data})
    if (data != null) {
      const { router } = this.props;
      router.push(`/mycontrib/${data}`);
    }
  }

  insertRow(event) {
    event.preventDefault();
    getData([
        {
          type: 'db',
          path: '/item_contrib?action=insert',
          branch: 'insert',
          callback: this.inserted.bind(this),
        },
        {
          type: 'db',
          path: '/my_contribs',
          branch: 'contribData',
        },
      ],
      this,
      this.props.notification.component
    );
  }

  deleted(data) {
    this.setState({...this.state, deleted: data})
    if (data != null) {
      const { router } = this.props;
      router.push(`/mycontrib/`);
    }
  }

  deleteRow(contribId, event) {
    event.preventDefault();
    getData([
        {
          type: 'db',
          path: '/item_contrib?action=delete',
          branch: `delete`,
          callback: this.deleted.bind(this),
          data: {_id: contribId},
        },
        {
          type: 'db',
          path: '/my_contribs',
          branch: 'contribData',
        },
      ],
      this,
      this.props.notification.component
    );
  }

  render() {
    const { contribData, countries, users } = this.state;
    const { usersMap, countriesMap, children, delCallback } = this.props;
    if (contribData == null || countries == null || users == null) {
      return <div/>
    }
    const { contribs, fields, perm } = contribData;
    for (const x of users) {usersMap.set(x._id, x)}
    for (const x of countries) {countriesMap.set(x._id, x)}
    delCallback.contrib = this.deleteRow.bind(this);
    return (
      <div>
        <div className="nav" style={columnStyle('rightLeftNav')}>
          <p>
            {contribs.length} contributions
            {' '}
            {(perm != null && perm.insert)? (
              <span
                className="fa fa-plus button-large insert"
                title="New contribution"
                onClick={this.insertRow.bind(this)}
              />
            ): null}
          </p>
          <Contribs filteredData={contribs} inplace={false}/>
        </div>
        <div style={columnStyle('rightRightBody')}>
          { children }
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
    const { contribData, countries, users, inserted, deleted } = this.state;
    if (contribData == null || countries == null || users == null) {
      getData([
          {
            type: 'db',
            path: '/my_contribs',
            branch: 'contribData',
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
    else if (inserted && deleted) {
      newState = {}
      if (inserted) {newState.inserted = null}
      if (deleted) {newState.deleted = null}
      this.setState({...this.state, ...newState})
      getData([
          {
            type: 'db',
            path: '/my_contribs',
            branch: 'contribData',
          },
        ],
        this,
        this.props.notification.component
      );
    }
  }
}

export default withContext(saveState(ContribsMy, 'ContribsMy', {contribs: null, countries: null, users: null, inserted: null}))

