import React, { Component } from 'react'
import { connect } from 'react-redux'

import { combineSelectors, withParams, emptyA } from 'utils'
import { loadExtra } from 'custom'

import { getTables, needTables, fetchTables, MYIDS } from 'tables'
import { getFilters, makeTag } from 'filters'

import ListGrid from 'ListGrid'
import ListPlain from 'ListPlain'
import ListFilter from 'ListFilter'

class ListContainer extends Component {
  render() {
    const { props: { filters, tables, table, eId, select, mode, filtered } } = this
    const complete = mode == 'grid'
    if (needTables(tables, [[table, select, complete]].concat(loadExtra[table] || emptyA))) {return <div />}
    const { [table]: tableData } = tables
    const { title, item, perm, myIds, allIds } = tableData
    const things = item[1]
    const listIds = select == MYIDS ? myIds : allIds
    const filterTag = makeTag(select, null, null)
    return filtered
    ? <ListFilter
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
      />
    : mode == 'list'
      ? <ListPlain
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
      : mode == 'grid'
        ? <ListGrid
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
        : <span>{`unknown display mode "${mode}" for ${things}`}</span>
  }
  componentDidMount() {
    const { props: { tables, table, select, mode, dispatch } } = this
    const complete = mode == 'grid'
    fetchTables(tables, [[table, select, complete]].concat(loadExtra[table] || emptyA), dispatch)
  }
  componentDidUpdate() {
    const { props: { tables, table, select, mode, dispatch } } = this
    const complete = mode == 'grid'
    fetchTables(tables, [[table, select, complete]].concat(loadExtra[table] || emptyA), dispatch)
  }
}

const getInfo = combineSelectors(getTables, getFilters)

export default connect(getInfo)(withParams(ListContainer))

