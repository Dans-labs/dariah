import React, { Component } from 'react'
import { connect } from 'react-redux'

import { setupFiltering, getFiltersApplied } from 'filters'

import ItemList from 'ItemList'
import Filter from 'Filter'
import Pane from 'Pane'


class FilterCompute extends Component {
  constructor(props) {
    super()
    const { tables, table, initialized, init } = props
    if (!initialized) {init(tables, table)}
  }
  render() {
    const { props: { initialized } } = this
    if (!initialized) {return <div />}
    const { props: { tables, table, filteredData, filteredAmountOthers, amounts} } = this
    const { [table]: { order, title } } = tables
    return (
      <div>
        <Pane format="sized" position="rightLeft">
          <p>{'Total '}<span className="good-o" >{order.length}</span></p>
          <Filter
            table={table}
            filteredAmount={filteredData.length}
            filteredAmountOthers={filteredAmountOthers}
            amounts={amounts}
          />
        </Pane>
        <Pane format="sized" position="rightRight">
          <ItemList table={table} title={title} filteredData={filteredData} inplace={true} />
        </Pane>
      </div>
    )
  }
}

export default connect(getFiltersApplied, { init: setupFiltering })(FilterCompute)
