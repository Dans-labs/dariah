import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import { withParams } from 'utils'
import { getTables, needTables, fetchTable, fetchTableMy } from 'tables'

import ItemList from 'ItemList'
import Pane from 'Pane'

class Items extends Component {
  render() {
    const { props: { table, tables, children, select, location: { pathname } } } = this
    //if (needTables(tables, table, true) || needTables(tables, ['country', 'user'])) {return <div />}
    const base = /^\/([^/]+)/.exec(pathname)[1]
    const verb = (select == 'my') ? 'mylist' : 'list'
    if (needTables(tables, table, select == 'my')) {return <div />}
    const { [table]: { title, perm, my, order } } = tables
    const itemList = (select == 'my') ? my : order
    return (
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
    )
  }
  componentDidMount() {
    const { props: { tables, table, select, fetch, fetchMy } } = this
    const f = (select == 'my') ? fetchMy : fetch
    if (needTables(tables, table, select == 'my')) {f(table)}
  }
  componentDidUpdate() {
    const { props: { tables, table, select, fetch, fetchMy } } = this
    const f = (select == 'my') ? fetchMy : fetch
    if (needTables(tables, table, select == 'my')) {f(table)}
  }
}

export default connect(getTables, { fetch: fetchTable, fetchMy: fetchTableMy })(withParams(Items))

