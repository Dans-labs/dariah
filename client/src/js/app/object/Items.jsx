import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import { withParams } from 'utils'
import { getTables, needTables, fetchTable } from 'tables'

import ItemList from 'ItemList'
import ItemGrid from 'ItemGrid'
import Pane from 'Pane'

class Items extends Component {
  render() {
    const { props: { table, tables, children, select, grid, location: { pathname } } } = this
    if (needTables(tables, table, select == 'my')) {return <div />}
    const base = /^\/([^/]+)/.exec(pathname)[1]
    const verb = (select == 'my') ? 'mylist' : 'list'
    const { [table]: { title, perm, my, order } } = tables
    const itemList = (select == 'my') ? my : order
    const insertControl = (
      <p>
        {`${itemList.length} items `}
        {(perm != null && perm.insert) ? (
          <Link to={`/${base}/${table}/${verb}/new`}>
            <span className="fa fa-plus" title={`new ${table}`} />
          </Link>
        ) : null}
      </p>
    )
    return (grid ? (
      <div>
        {insertControl}
        <ItemGrid table={table} title={title} filteredData={itemList} />
      </div>
    ) : (
      <div>
        <Pane format="nav sized" position="rightLeftNav">
          {insertControl}
          <ItemList table={table} title={title} filteredData={itemList} inplace={false} base={base} verb={verb} />
        </Pane>
        <Pane format="sized" position="rightRightBody">
          { children }
        </Pane>
      </div>
    ))
  }
  componentDidMount() {
    const { props: { tables, table, select, grid, fetch } } = this
    const my = select == 'my'
    if (needTables(tables, table, my)) {fetch(table, my, grid)}
  }
  componentDidUpdate() {
    const { props: { tables, table, select, grid, fetch } } = this
    const my = select == 'my'
    if (needTables(tables, table, my)) {fetch(table, my, grid)}
  }
}

export default connect(getTables, { fetch: fetchTable })(withParams(Items))

