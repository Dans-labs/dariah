import React, { Component } from 'react'
import { connect } from 'react-redux'

import { initFiltering, getFiltersApplied } from 'filters'

import ListPlain from 'ListPlain'
import ListGrid from 'ListGrid'
import Filter from 'Filter'

class ListFilter extends Component {
  componentWillMount() {
    const { props: { tableData, table, filterTag, listIds, dispatch } } = this
    dispatch(initFiltering(tableData, table, filterTag, listIds))
  }
  render() {
    const {
      props: {
        heading,
        table,
        perm,
        select, masterId, linkField,
        listIds,
        filteredIds, filteredAmountOthers, amounts,
        mode, title,
        filterTag, gridTag,
      },
    } = this
    if (filteredIds == null) {return <div />}
    return (
      <div className={'list-filter'}>
        <div className={'filters'}>
          <p>{'Total '}<span className="good-o" >{listIds.length}</span></p>
          <Filter
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
            mode == 'list' ?
              <ListPlain
                heading={heading}
                table={table}
                listIds={filteredIds}
                perm={perm}
                select={select}
                title={title}
                masterId={masterId}
                linkField={linkField}
              /> :
            mode == 'grid' ?
              <ListGrid
                heading={heading}
                table={table}
                listIds={filteredIds}
                perm={perm}
                select={select}
                gridTag={gridTag}
                masterId={masterId}
                linkField={linkField}
              /> :
              <span>{`unknown display mode "${mode}" for item list`}</span>
          }
        </div>
      </div>
    )
  }
}

export default connect(getFiltersApplied)(ListFilter)
