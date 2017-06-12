import React, { Component } from 'react'
import { connect } from 'react-redux'

import { withParams } from 'utils'
import { getTables, needTables, fetchTable, MYIDS } from 'tables'
import { makeTag } from 'filters'

import ListGrid from 'ListGrid'
import ListPlain from 'ListPlain'
import ListFilter from 'ListFilter'

class ListContainer extends Component {
  render() {
    const { props: { tables, table, select, mode, filtered } } = this
    const grid = mode == 'grid'
    if (needTables(tables, table, select, grid)) {return <div />}
    const { [table]: tableData } = tables
    const { title, perm, myIds, allIds } = tableData
    const listIds = select == MYIDS ? myIds : allIds
    const filterTag = makeTag(select, null, null)
    return (
      filtered ?
        <ListFilter
          table={table}
          listIds={listIds}
          perm={perm}
          select={select}
          mode={mode}
          title={title}
          filterTag={filterTag}
          gridTag={table}
        /> : (
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
              gridTag={table}
            /> :
            <span>{`unknown display mode "${mode}" for item list`}</span>
        )
    )
  }
  componentDidMount() {
    const { props: { tables, table, select, mode, dispatch } } = this
    const grid = mode == 'grid'
    if (needTables(tables, table, select, grid)) {dispatch(fetchTable(table, select, grid))}
  }
  componentDidUpdate() {
    const { props: { tables, table, select, mode, dispatch } } = this
    const grid = mode == 'grid'
    if (needTables(tables, table, select, grid)) {dispatch(fetchTable(table, select, grid))}
  }
}

export default connect(getTables)(withParams(ListContainer))

