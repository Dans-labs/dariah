import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchData } from 'server.js'
import { getTables } from 'tables.js'

import ItemList from 'ItemList.jsx'
import Pane from 'Pane.jsx'

class ItemMy extends Component {
  render() {
    const {
      props: { params: { table }, tables, children },
    } = this
    if (
      tables == null || tables[table] == null || tables[table].my == null ||
      tables.country == null || tables.user == null
    ) {
      return <div />
    }
    const { entities, title, perm, my } = tables[table]
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
    const {
      props: {
        params: { table },
        tables,
        fetch,
      },
    } = this
    if (tables == null || tables[table] == null || tables[table].my == null) {
      fetch({ type: 'fetchTableMy', contentType: 'db', path: `/my?table=${table}`, desc: `${table} table (my records)`, table })
    }
    if (tables == null || tables.country == null) {
      fetch({ type: 'fetchTable', contentType: 'db', path: `/member_country`, desc: `country table`, table: 'country' })
    }
    if (tables == null || tables.user == null) {
      fetch({ type: 'fetchTable', contentType: 'db', path: `/user`, desc: `user table`, table: 'user' })
    }
  }
}

export default connect(getTables, { fetch: fetchData })(ItemMy)


