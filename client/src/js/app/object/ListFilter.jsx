import React, { Component } from 'react'
import { connect } from 'react-redux'

import { initFiltering, computeFiltering } from 'filters'

import ListPlain from 'ListPlain'
import ListGrid from 'ListGrid'
import Filter from 'Filter'

class ListFilter extends Component {
  componentWillMount() {
    const { props: { tables, table, filterTag, listIds, dispatch } } = this
    const { [table]: tableData } = tables
    dispatch(initFiltering(tableData, table, filterTag, listIds))
  }
  render() {
    const {
      props: {
        tables,
        filters,
        heading,
        table,
        perm,
        select, masterId, linkField,
        listIds,
        mode, title,
        filterTag, gridTag,
      },
    } = this
    const {
      filteredIds, filteredAmountOthers, amounts,
    } = computeFiltering(tables, filters, table, filterTag, listIds)
    if (filteredIds == null) {return <div />}
    return (
      <div className={'list-filter'}>
        <div className={'filters'}>
          <p>{'Total '}<span className={'good-o'} >{listIds.length}</span></p>
          <Filter
            filters={filters}
            tables={tables}
            table={table}
            filterTag={filterTag}
            listIds={listIds}
            filteredAmount={filteredIds.length}
            filteredAmountOthers={filteredAmountOthers}
            amounts={amounts}
          />
        </div>
        <div className={'list'}>
          {
            mode == 'list'
            ? <ListPlain
                alterSection={`list-${table}-${select}`}
                heading={heading}
                filters={filters}
                tables={tables}
                table={table}
                listIds={filteredIds}
                perm={perm}
                select={select}
                title={title}
                masterId={masterId}
                linkField={linkField}
              />
            : mode == 'grid'
              ? <ListGrid
                  alterSection={`list-${table}-${select}`}
                  heading={heading}
                  filters={filters}
                  tables={tables}
                  table={table}
                  listIds={filteredIds}
                  perm={perm}
                  select={select}
                  gridTag={gridTag}
                  masterId={masterId}
                  linkField={linkField}
                />
              : <span>{`unknown display mode "${mode}" for item list`}</span>
          }
        </div>
      </div>
    )
  }
}

export default connect()(ListFilter)
