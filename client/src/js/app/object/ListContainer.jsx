import React, { Component } from 'react'
import { connect } from 'react-redux'

import { withParams } from 'utils'
import { getTables, needTables, fetchTable } from 'tables'

import ListGrid from 'ListGrid'
import ListPlain from 'ListPlain'
import ListFilter from 'ListFilter'

class ListContainer extends Component {
  render() {
    const { props: { table, tables, select, mode } } = this
    const grid = mode == 'grid'
    if (needTables(tables, table, select, grid)) {return <div />}
    const { [table]: { title, perm, myIds, allIds } } = tables
    const listIds = select == 'myIds' ? myIds : allIds
    return (
      mode == 'list' ?
        <ListPlain
          table={table}
          listIds={listIds}
          select={select}
          perm={perm}
          title={title}
        /> :
      mode == 'grid' ?
        <ListGrid
          table={table}
          listIds={listIds}
          select={select}
          perm={perm}
          tag={table}
        /> :
      mode == 'filter' ?
        <ListFilter
          table={table}
          select={select}
        /> :
        <span>{`unknown display mode "${mode}" for item list`}</span>
    )
  }
  componentDidMount() {
    const { props: { tables, table, select, mode, fetch } } = this
    const grid = mode == 'grid'
    if (needTables(tables, table, select, grid)) {fetch(table, select, grid)}
  }
  componentDidUpdate() {
    const { props: { tables, table, select, mode, fetch } } = this
    const grid = mode == 'grid'
    if (needTables(tables, table, select, grid)) {fetch(table, select, grid)}
  }
}

export default connect(getTables, { fetch: fetchTable })(withParams(ListContainer))

