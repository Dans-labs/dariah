import React, { Component } from 'react'
import { connect } from 'react-redux'
import ItemList from 'ItemList.jsx'
import Filter from 'Filter.jsx'
import Pane from 'Pane.jsx'

import { setupFiltering, getFiltersApplied } from 'filter.js'

class FilterCompute extends Component {
  constructor(props) {
    super()
    const { tables, table, initialized, init } = props
    if (!initialized) {init(table, tables)}
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
