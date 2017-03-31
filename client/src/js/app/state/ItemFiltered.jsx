import React, { Component } from 'react'
import { connect } from 'react-redux'

import FilterCompute from 'FilterCompute.jsx'
import { fetchData } from 'server.js'
import { getTables } from 'tables.js'

class ItemFiltered extends Component {
  render() {
    const { props: { params: { table }, tables } } = this
    if (tables == null || tables[table] == null || tables.country == null || tables.user == null) {
      return <div />
    }
    return (
      <FilterCompute table={table} />
    )
  }
  componentDidMount() {
    const { props: { params: { table }, tables, fetch, } } = this
    if (tables == null || tables[table] == null) {
      fetch({ type: 'fetchTable', contentType: 'db', path: `/list?table=${table}`, desc: `${table} table`, table })
    }
    if (tables == null || tables.country == null) {
      fetch({ type: 'fetchTable', contentType: 'db', path: `/member_country`, desc: `country table`, table: 'country' })
    }
    if (tables == null || tables.user == null) {
      fetch({ type: 'fetchTable', contentType: 'db', path: `/user`, desc: `user table`, table: 'user' })
    }
  }
}

export default connect(getTables, { fetch: fetchData })(ItemFiltered)
