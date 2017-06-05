import React, { Component } from 'react'
import { connect } from 'react-redux'

import { setupFiltering, getFiltersApplied } from 'filters'

import ListPlain from 'ListPlain'
import Filter from 'Filter'
import Pane from 'Pane'


class ListFilter extends Component {
  constructor(props) {
    super()
    const { tables, table, initialized, init } = props
    if (!initialized) {init(tables, table)}
  }
  render() {
    const {
      props: {
        heading,
        tables, table,
        masterId, linkField,
        filteredIds, filteredAmountOthers, amounts,
        initialized,
      },
    } = this
    if (!initialized) {return <div />}
    //console.warn(`LISTFILTER recomputations: ${getFiltersApplied.getMatchingSelector({}, { table }).recomputations()}`)
    const { [table]: { allIds, title } } = tables
    return (
      <div>
        <Pane format="sized" position="rightLeft">
          <p>{'Total '}<span className="good-o" >{allIds.length}</span></p>
          <Filter
            table={table}
            filteredAmount={filteredIds.length}
            filteredAmountOthers={filteredAmountOthers}
            amounts={amounts}
          />
        </Pane>
        <Pane format="sized" position="rightRight">
          <ListPlain
            heading={heading}
            table={table}
            listIds={filteredIds}
            title={title}
            masterId={masterId}
            linkField={linkField}
          />
        </Pane>
      </div>
    )
  }
}

export default connect(getFiltersApplied, { init: setupFiltering })(ListFilter)
