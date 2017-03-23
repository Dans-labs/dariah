import React, { Component } from 'react'

import ItemList from 'ItemList.jsx'

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
  inserted = data => {
    const { props: { params: { tag }, router } } = this
    if (data != null) {
      router.push(`/${tag}/mylist/${data}`)
    }
  }

  handleInsert = event => {
    event.preventDefault()
    const { props: { params: { tag }, notification } } = this
    getData(
      [
        {
          type: 'db',
          path: `/mod?table=${tag}&action=insert`,
          branch: 'insert',
          callback: this.inserted,
        },
        {
          type: 'db',
          path: `/my?table=${tag}`,
          branch: 'listData',
        },
      ],
      this,
      notification.component
    )
  }

  deleted = data => {
    const { props: { params: { tag }, router } } = this
    if (data != null) {
      router.push(`/${tag}/mylist`)
    }
  }

  deleteRow = recordId => event => {
    event.preventDefault()
    const { props: { params: { tag }, notification } } = this
    getData(
      [
        {
          type: 'db',
          path: `/mod?table=${tag}&action=delete`,
          branch: `delete`,
          callback: this.deleted,
          data: {_id: recordId},
        },
        {
          type: 'db',
          path: `/my?table=${tag}`,
          branch: 'listData',
        },
      ],
      this,
      notification.component
    )
  }

  render() {
    const {
      props: { params: { tag }, userMap, countryMap, children, parentList, ui },
      state: { listData, countryData, userData },
    } = this
    if (listData == null || countryData == null || userData == null) {
      return <div />
    }
    const { records, title, perm } = listData
    for (const x of userData) {userMap.set(x._id, x)}
    for (const x of countryData) {countryMap.set(x._id, x)}
    parentList[tag] = this
    return (
      <div>
        <div
          className="nav sized"
          style={columnStyle('rightLeftNav', ui)}
        >
          <p>
            {`${records.length} items `}
            {(perm != null && perm.insert) ? (
              <span
                className="fa fa-plus button-large insert"
                title="New item"
                onClick={this.handleInsert}
              />
            ) : null}
          </p>
          <ItemList table={tag} title={title} filteredData={records} inplace={false} />
        </div>
        <div
          className="sized"
          style={columnStyle('rightRightBody', ui)}
        >
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
    const {
      props: { params: { tag }, notification },
      state: { listData, countryData, userData },
    } = this
    if (listData == null || countryData == null || userData == null) {
      getData(
        [
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
        notification.component
      )
    }
  }
}

export default withContext(saveState(ItemMy, 'ItemMy', {listData: null, countryData: null, userData: null }))

