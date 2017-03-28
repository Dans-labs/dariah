import React, { Component } from 'react'
import { connect } from 'react-redux'
import ItemList from 'ItemList.jsx'
import Filter from 'Filter.jsx'

import { newFilterSettings, computeFiltering, setf } from 'filtering.js'
import { columnStyle } from 'window.js'
import { withContext, saveState } from 'hoc.js'

class FilterCompute extends Component {
  updFilter = (filterId, data) => {
    const { state: { filterSettings } } = this
    if (typeof data == 'string') {
      setf(filterId, '', data)
    }
    else if (typeof data == 'boolean') {
      for (const fval of filterSettings.get(filterId)) {
        setf(filterId, fval, data)
      }
    }
    else {
      setf(filterId, data[0], data[1])
    }
    this.setState({ filterSettings: newFilterSettings(filterSettings, filterId, data) })
  }
  render() {
    const {
      props: { table, title, records, order, fields, fieldValues, filterList, height, width },
      state: { filterSettings },
    } = this
    const {
      filteredData, filteredAmountOthers, amounts,
    } = computeFiltering(
      records, order, fields, filterList, fieldValues, filterSettings,
    )
    return (
      <div>
        <div
          className="sized"
          style={columnStyle('rightLeft', { height, width })}
        >
          <p>{'Total '}<span className="good-o" >{order.length}</span></p>
          <Filter
            table={table}
            fields={fields}
            fieldValues={fieldValues}
            filteredAmount={filteredData.length}
            filteredAmountOthers={filteredAmountOthers}
            amounts={amounts}
            filterList={filterList}
            filterSettings={filterSettings}
            updFilter={this.updFilter}
          />
        </div>
        <div
          className="sized"
          style={columnStyle('rightRight', { height, width })}
        >
          <ItemList table={table} title={title} filteredData={filteredData} inplace={true} />
        </div>
      </div>
    )
  }
}
const mapStateToProps = ({ win: { height, width } }) => ({ height, width })

export default connect(mapStateToProps)(
  withContext(saveState(FilterCompute, 'FilterCompute', ({filterInit}) => ({filterSettings: filterInit})))
)
