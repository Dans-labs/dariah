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
    const verb = `${(select == 'my') ? 'my' : ''}${grid ? 'grid' : 'list'}`
    const { [table]: { title, perm, my, order } } = tables
    const itemList = (select == 'my') ? my : order
    return (grid ? (
      <div>
        <ItemGrid table={table} filteredData={itemList} perm={perm} select={select} />
      </div>
    ) : (
      <div>
        <Pane format="nav sized" position="rightLeftNav">
          <p>
            {`${itemList.length} items `}
            {(perm != null && perm.insert) ? (
              <Link to={`/${base}/${table}/${verb}/new`}>
                <span className="fa fa-plus" title={`new ${table}`} />
              </Link>
            ) : null}
          </p>
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

