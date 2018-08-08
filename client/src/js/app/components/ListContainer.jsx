import React, { Component } from 'react'
import { connect } from 'react-redux'

import { combineSelectors } from 'utils'

import { getTables, needTables, fetchTable, MYIDS } from 'tables'
import { getFilters, makeTag } from 'filters'

import ErrorBoundary from 'ErrorBoundary'
import ListStats from 'ListStats'
import ListGrid from 'ListGrid'
import ListPlain from 'ListPlain'
import ListFilter from 'ListFilter'

class ListContainer extends Component {
  render() {
    const {
      props: { filters, tables, table, eId, select, mode, filtered },
    } = this
    const complete = mode === 'grid'
    if (
      needTables(
        tables,
        [[table, select, complete]],
      )
    ) {
      return <div />
    }
    const { [table]: tableData } = tables
    const { title, item, perm, myIds, allIds } = tableData
    const things = item[1]
    const listIds = select === MYIDS ? myIds : allIds
    const filterTag = makeTag(select, null, null)
    return (
      <ErrorBoundary>
        {filtered ? (
          <ListFilter
            filters={filters}
            tables={tables}
            table={table}
            navItem={eId}
            listIds={listIds}
            perm={perm}
            select={select}
            mode={mode}
            title={title}
            filterTag={filterTag}
            gridTag={table}
            topLevel={true}
          />
        ) : mode === 'list' ? (
          <ListPlain
            alterSection={`list-${table}-${select}`}
            filters={filters}
            tables={tables}
            table={table}
            navItem={eId}
            listIds={listIds}
            select={select}
            perm={perm}
            title={title}
          />
        ) : mode === 'grid' ? (
          <ListGrid
            alterSection={`list-${table}-${select}`}
            filters={filters}
            tables={tables}
            table={table}
            navItem={eId}
            listIds={listIds}
            select={select}
            perm={perm}
            gridTag={table}
          />
        ) : mode === 'stats' ? (
          <ListStats tables={tables} table={table} />
        ) : (
          `unknown display mode "${mode}" for ${things}`
        )}
      </ErrorBoundary>
    )
  }
  componentDidMount() {
    const { props: { tables, table, select, extra, mode, dispatch } } = this
    const complete = mode === 'grid'
    fetchTable(tables, table, select, extra, complete, dispatch)
  }
  componentDidUpdate() {
    const { props: { tables, table, select, extra, mode, dispatch } } = this
    const complete = mode === 'grid'
    fetchTable(tables, table, select, extra, complete, dispatch)
  }
}

const getInfo = combineSelectors(getTables, getFilters)

export default connect(getInfo)(ListContainer)
