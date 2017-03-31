import React, { Component } from 'react'
import { connect } from 'react-redux'

import FilterCompute from 'FilterCompute.jsx'
import { getTables, needTables, fetchTable, fetchCountries, fetchUsers } from 'tables.js'

class ItemFiltered extends Component {
  render() {
    const { props: { params: { table }, tables } } = this
    if (needTables(tables, [table, 'country', 'user'])) {return <div />}
    return (
      <FilterCompute table={table} />
    )
  }
  componentDidMount() {
    const { props: { params: { table }, tables, fetch, fetchC, fetchU } } = this
    if (needTables(tables, table))     {fetch(table)}
    if (needTables(tables, 'country')) {fetchC()}
    if (needTables(tables, 'user'))    {fetchU()}
  }
}

export default connect(getTables, {
  fetch: fetchTable,
  fetchC: fetchCountries,
  fetchU: fetchUsers,
})(ItemFiltered)
