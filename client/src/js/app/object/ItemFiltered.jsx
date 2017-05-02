import React, { Component } from 'react'
import { connect } from 'react-redux'

import { withParams } from 'utils'
import { getTables, needTables, fetchTable } from 'tables'

import FilterCompute from 'FilterCompute'

class ItemFiltered extends Component {
  render() {
    const { props: { table, tables } } = this
    if (needTables(tables, table)) {return <div />}
    return (
      <FilterCompute table={table} />
    )
  }
  componentDidMount() {
    const { props: { table, tables, fetch } } = this
    if (needTables(tables, table)) {fetch(table)}
  }
}

export default connect(getTables, { fetch: fetchTable })(withParams(ItemFiltered))
