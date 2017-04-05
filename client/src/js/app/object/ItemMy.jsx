import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getTables, needTables, fetchTableMy } from 'tables.js'

import ItemList from 'ItemList.jsx'
import Pane from 'Pane.jsx'

class ItemMy extends Component {
  render() {
    const { props: { params: { table }, tables, children } } = this
    if (needTables(tables, table, true) || needTables(tables, ['country', 'user'])) {return <div />}
    const { [table]: { title, perm, my } } = tables
    return (
      <div>
        <Pane format="nav sized" position="rightLeftNav">
          <p>
            {`${my.length} items `}
            {(perm != null && perm.insert) ? (
              <span
                className="fa fa-plus button-large insert"
                title="New item"
              />
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
    const { props: { params: { table }, tables, fetch } } = this
    if (needTables(tables, table, true)) {fetch(table)}
  }
}

export default connect(getTables, { fetch: fetchTableMy })(ItemMy)

