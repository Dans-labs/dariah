import React, { Component } from 'react'
import { connect } from 'react-redux'

import { setupFiltering, getFiltersApplied } from 'filters'

import ListPlain from 'ListPlain'
import ListGrid from 'ListGrid'
import Filter from 'Filter'
import Pane from 'Pane'


class ListFilter extends Component {
  componentWillMount() {
    const { tables, table, initialized, dispatch } = this.props
    if (!initialized) {dispatch(setupFiltering(tables, table))}
  }
  render() {
    const {
      props: {
        heading,
        tables, table,
        perm,
        select,
        masterId, linkField,
        filteredIds, filteredAmountOthers, amounts,
        initialized,
        mode, title, tag,
      },
    } = this
    console.warn(`RENDER ${table} ${masterId}`, initialized)
    if (!initialized) {return <div />}
    const { [table]: { allIds } } = tables
    return (
      <div>
        <Pane format="sized" position="filter">
          <p>{'Total '}<span className="good-o" >{allIds.length}</span></p>
          <Filter
            table={table}
            filteredAmount={filteredIds.length}
            filteredAmountOthers={filteredAmountOthers}
            amounts={amounts}
          />
        </Pane>
        <Pane format="sized" position="list">
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
                tag={tag}
                masterId={masterId}
                linkField={linkField}
              /> :
              <span>{`unknown display mode "${mode}" for item list`}</span>
          }
        </Pane>
      </div>
    )
  }
}

export default connect(getFiltersApplied)(ListFilter)
