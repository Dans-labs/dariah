import React, { Component } from 'react'
import { connect } from 'react-redux'

import { emptyS, emptyO } from 'utils'
import { handle } from 'handle'
import { getMasterTable } from 'details'

import { initFiltering, computeFiltering } from 'filters'
import { insertItem, DETAILS } from 'tables'

import ListPlain from 'ListPlain'
import ListGrid from 'ListGrid'
import Filter from 'Filter'
import OpenCloseAll from 'OpenCloseAll'
import EditInsert from 'EditInsert'

const initial = 0
const nAlts = 2

class ListFilter extends Component {
  componentWillMount() {
    const { props: { tables, table, filterTag, dispatch } } = this
    dispatch(initFiltering(tables, table, filterTag))
  }
  componentWillReceiveProps(newProps) {
    const {
      tables,
      table,
      filterTag,
      filters: { [table]: { [filterTag]: filterSettings } = emptyO },
      dispatch,
    } = newProps
    const { props: { table: tableOld, filterTag: filterTagOld } } = this
    if (
      (tableOld !== table || filterTagOld !== filterTag) &&
      filterSettings == null
    ) {
      dispatch(initFiltering(tables, table, filterTag))
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
        select,
        masterId,
        linkField,
        expand,
        border,
        fixed,
        listIds,
        mode,
        compact,
        title,
        filterTag,
        gridTag,
        topLevel,
        dispatch,
      },
    } = this
    const { filteredIds, filteredAmountOthers, amounts } = computeFiltering(
      tables,
      filters,
      table,
      filterTag,
      listIds,
    )
    if (filteredIds == null) {
      return <div />
    }
    const compactClass = compact ? 'compact' : topLevel ? 'outer' : emptyS
    const { [table]: { item } } = tables
    const things = item[1]
    const alterSection = `list-${table}-${select}`
    const masterTable = getMasterTable(tables, table, linkField)
    return (
      <div className={`list-filter ${compactClass}`}>
        {select === DETAILS ? (
          <div>
            <EditInsert
              tables={tables}
              table={table}
              perm={perm}
              select={select}
              masterTable={masterTable}
              masterId={masterId}
              nItems={listIds.length}
              fixed={fixed}
              item={item}
              button={'button medium'}
              onInsert={handle(
                dispatch,
                insertItem,
                table,
                select,
                masterId,
                linkField,
              )}
            />
            <OpenCloseAll
              table={table}
              listIds={listIds}
              item={item}
              button={'button medium'}
              alterSection={alterSection}
              nAlts={nAlts}
              initial={initial}
              openAll={true}
              expand={expand}
            />
          </div>
        ) : null}
        <div className={`filters ${compactClass}`}>
          {compact ? null : (
            <p>
              {'Total '}
              <span className={'good-o'}>{listIds.length}</span>
            </p>
          )}
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
          {mode === 'list' ? (
            <ListPlain
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
              expand={expand}
              border={border}
              fixed={fixed}
            />
          ) : mode === 'grid' ? (
            <ListGrid
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
              fixed={fixed}
            />
          ) : (
            `unknown display mode "${mode}" for ${things}`
          )}
        </div>
      </div>
    )
  }
}

export default connect()(ListFilter)
