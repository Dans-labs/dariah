import React, { Component } from 'react'

import ItemList from 'ItemList.jsx'
import ItemRecordPre from 'ItemRecordPre.jsx';

import { getData } from 'data.js'
import { withContext, saveState } from 'hoc.js'
import { columnStyle } from 'ui.js'

/**
 * @class
 * @classdesc
 *
 * **stateful** {@link external:Component|Component}
 *
 * ## The list of "my" items
 *
 * Displays the list of items of the current user in the left column,
 * with a details/edit view in the right column.
 *
 * See also:
 * * {@link ItemList} The list of filtered items in the right column
 */
class ItemMy extends Component {
/**
 * @method
 * @param {Item[]} listData (from *state*) The list of records as it comes form mongo db,
 * plus a list of fields that is provided for each row (dependent on user permissions)
 * @param {Map} countryData (from *state*) The country information as fetched from the database on the server.
 * Organized as a {Map} keyed by Two-letter country codes.
 * @returns {Fragment}
*/
  inserted(data) {
    const { params } = this.props;
    const { tag } = params;
    this.setState({...this.state, inserted: data})
    if (data != null) {
      const { router } = this.props;
      router.push(`/${tag}/mylist/${data}`);
    }
  }

  insertRow(event) {
    event.preventDefault();
    const { params } = this.props;
    const { tag } = params;
    getData([
        {
          type: 'db',
          path: `/mod?table=${tag}&action=insert`,
          branch: 'insert',
          callback: this.inserted.bind(this),
        },
        {
          type: 'db',
          path: `/my?table=${tag}`,
          branch: 'listData',
        },
      ],
      this,
      this.props.notification.component
    );
  }

  deleted(data) {
    const { params, router } = this.props;
    const { tag } = params;
    this.setState({...this.state, deleted: data})
    if (data != null) {
      const { router } = this.props;
      router.push(`/${tag}/mylist`);
    }
  }

  deleteRow(recordId, event) {
    event.preventDefault();
    const { params } = this.props;
    const { tag } = params;
    getData([
        {
          type: 'db',
          path: `/mod?table=${tag}&action=delete`,
          branch: `delete`,
          callback: this.deleted.bind(this),
          data: {_id: recordId},
        },
        {
          type: 'db',
          path: `/my?table=${tag}`,
          branch: 'listData',
        },
      ],
      this,
      this.props.notification.component
    );
  }

  render() {
    const { listData, countryData, userData } = this.state;
    const { params, userMap, countryMap, children, delCallback } = this.props;
    const { tag } = params;
    if (listData == null || countryData == null || userData == null) {
      return <div/>
    }
    const { records, fields, title, perm } = listData;
    for (const x of userData) {userMap.set(x._id, x)}
    for (const x of countryData) {countryMap.set(x._id, x)}
    delCallback[tag] = this.deleteRow.bind(this);
    return (
      <div>
        <div className="nav" style={columnStyle('rightLeftNav')}>
          <p>
            {records.length} items
            {' '}
            {(perm != null && perm.insert)? (
              <span
                className="fa fa-plus button-large insert"
                title="New item"
                onClick={this.insertRow.bind(this)}
              />
            ): null}
          </p>
          <ItemList table={tag} title={title} filteredData={records} inplace={false}/>
        </div>
        <div style={columnStyle('rightRightBody')}>
          { children }
        </div>
      </div>
    )
  }
/**
 * @method
 * @param {Item[]} listData (from *state*) The list of records as it comes form mongo db
 * @param {Map} countryData (from *state*) The country information as fetched from the database on the server.
 * Organized as a {Map} keyed by Two-letter country codes.
 * @returns {Object} The data fetched from the server.
*/
  componentDidMount() {
    const { params } = this.props;
    const { tag } = params;
    const { listData, countryData, userData, inserted, deleted } = this.state;
    if (listData == null || countryData == null || userData == null) {
      getData([
          {
            type: 'db',
            path: `/my?table=${tag}`,
            branch: 'listData',
          },
          {
            type: 'db',
            path: '/member_country',
            branch: 'countryData',
          },
          {
            type: 'db',
            path: `/user`,
            branch: 'userData',
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
            path: `/my?table=${tag}`,
            branch: 'listData',
          },
        ],
        this,
        this.props.notification.component
      );
    }
  }
}

export default withContext(saveState(ItemMy, 'ItemMy', {listData: null, countryData: null, userData: null, inserted: null}))

