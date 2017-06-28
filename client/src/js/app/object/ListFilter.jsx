import React, { Component } from 'react'
import { connect } from 'react-redux'

import { emptyS, emptyO } from 'utils'
import { handle } from 'handle'

import { initFiltering, computeFiltering } from 'filters'
import { insertItem, DETAILS } from 'tables'

import { EditInsert } from 'EditControls'
import ListPlain from 'ListPlain'
import ListGrid from 'ListGrid'
import Filter from 'Filter'

const initial = 0
const nAlts = 2

class ListFilter extends Component {
  componentWillMount() {
    const { props: { tables, table, filterTag, listIds, dispatch } } = this
    const { [table]: tableData } = tables
    dispatch(initFiltering(tableData, table, filterTag, listIds))
  }
  componentWillReceiveProps(newProps) {
    const {
      tables,
       listIds,
       table,
       filterTag,
       filters: { [table]: { [filterTag]: filterSettings } = emptyO },
       dispatch,
    } = newProps
    const { props: { table: tableOld, filterTag: filterTagOld } } = this
    if ((tableOld !== table || filterTagOld !== filterTag) && filterSettings == null) {
      const { [table]: tableData } = tables
      dispatch(initFiltering(tableData, table, filterTag, listIds))
    }
  }
  render() {
    const {
      props: {
        tables,
        filters,
        table,
        navItem,
        perm,
        select, masterId, linkField,
        listIds,
        mode, compact,
        title,
        filterTag, gridTag,
        dispatch,
      },
    } = this
    const {
      filteredIds, filteredAmountOthers, amounts,
    } = computeFiltering(tables, filters, table, filterTag, listIds)
    if (filteredIds == null) {return <div />}
    const compactClass = compact ? 'compact' : emptyS
    const { [table]: { item } } = tables
    const things = item[1]
    const alterSection = `list-${table}-${select}`
    return (
      <div className={`list-filter ${compactClass}`}>
        {
          select === DETAILS
          ? <EditInsert
              perm={perm}
              listIds={listIds}
              item={item}
              button={'button-medium'}
              alterSection={alterSection}
              nAlts={nAlts}
              initial={initial}
              openAll={true}
              onInsert={handle(dispatch, insertItem, table, select, masterId, linkField)}
            />
          : null
        }
        <div className={`filters ${compactClass}`}>
          {
            compact
            ? null
            : <p>{'Total '}<span className={'good-o'} >{listIds.length}</span></p>
          }
          <Filter
            filters={filters}
            tables={tables}
            table={table}
            filterTag={filterTag}
            listIds={listIds}
            filteredAmount={filteredIds.length}
            filteredAmountOthers={filteredAmountOthers}
            amounts={amounts}
            compact={compact}
          />
        </div>
        <div className={`list ${compactClass}`}>
          {
            mode === 'list'
            ? <ListPlain
                alterSection={alterSection}
                filtered={true}
                filters={filters}
                tables={tables}
                table={table}
                navItem={navItem}
                listIds={filteredIds}
                perm={perm}
                select={select}
                title={title}
                masterId={masterId}
                linkField={linkField}
              />
            : mode === 'grid'
              ? <ListGrid
                  alterSection={alterSection}
                  filtered={true}
                  filters={filters}
                  tables={tables}
                  table={table}
                  navItem={navItem}
                  listIds={filteredIds}
                  perm={perm}
                  select={select}
                  gridTag={gridTag}
                  masterId={masterId}
                  linkField={linkField}
                />
              : <span>{`unknown display mode "${mode}" for ${things}`}</span>
          }
        </div>
      </div>
    )
  }
}

export default connect()(ListFilter)
