import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getTables, needTables, fetchTable } from 'tables.js'

import FilterCompute from 'FilterCompute.jsx'

class ItemFiltered extends Component {
  render() {
    const { props: { params: { table }, tables } } = this
    if (needTables(tables, table)) {return <div />}
    return (
      <FilterCompute table={table} />
    )
  }
  componentDidMount() {
    const { props: { params: { table }, tables, fetch } } = this
    if (needTables(tables, table)) {fetch(table)}
  }
}

export default connect(getTables, { fetch: fetchTable })(ItemFiltered)
