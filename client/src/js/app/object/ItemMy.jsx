import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import { withParams } from 'utils.js'
import { getTables, needTables, fetchTableMy } from 'tables.js'

import ItemList from 'ItemList.jsx'
import Pane from 'Pane.jsx'

class ItemMy extends Component {
  render() {
    const { props: { table, tables, children } } = this
    if (needTables(tables, table, true) || needTables(tables, ['country', 'user'])) {return <div />}
    const { [table]: { title, perm, my } } = tables
    return (
      <div>
        <Pane format="nav sized" position="rightLeftNav">
          <p>
            {`${my.length} items `}
            {(perm != null && perm.insert) ? (
              <Link to={`/${table}/mylist/new`}>
                <span className="fa fa-plus" title="new contribution" />
              </Link>
            ) : null}
          </p>
          <ItemList table={table} title={title} filteredData={my} inplace={false} />
        </Pane>
        <Pane format="sized" position="rightRightBody">
          { children }
        </Pane>
      </div>
    )
  }
  componentDidMount() {
    const { props: { tables, table, fetch } } = this
    if (needTables(tables, table, true)) {fetch(table)}
  }
  componentDidUpdate() {
    const { props: { tables, table, fetch } } = this
    if (needTables(tables, table, true)) {fetch(table)}
  }
}

export default connect(getTables, { fetch: fetchTableMy })(withParams(ItemMy))

