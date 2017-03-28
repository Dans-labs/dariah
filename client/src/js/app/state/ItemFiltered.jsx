import React, { Component } from 'react'
import { connect } from 'react-redux'

import FilterCompute from 'FilterCompute.jsx'
import { compileFiltering } from 'filtering.js'
import { fetchData } from 'server.js'

class ItemFiltered extends Component {
  render() {
    const {
      props: { params: { table }, tables },
    } = this
    if (tables == null || tables[table] == null || tables.country == null || tables.user == null) {
      return <div />
    }
    const { records, order, fields, title, filterList } = tables[table]
    const { fieldValues, filterInit } = compileFiltering(records, order, fields, filterList)
    return (
      <FilterCompute
        tag={table}
        table={table}
        records={records}
        order={order}
        fields={fields}
        title={title}
        fieldValues={fieldValues}
        filterList={filterList}
        filterInit={filterInit}
      />
    )
  }
  componentDidMount() {
    const {
      props: {
        params: { table },
        tables,
        fetch,
      },
    } = this
    if (tables == null || tables[table] == null) {
      fetch({ type: 'fetchTable', contentType: 'db', path: `/list?table=${table}`, desc: `${table} table}`, table })
    }
    if (tables == null || tables.country == null) {
      fetch({ type: 'fetchTable', contentType: 'db', path: `/member_country`, desc: `country table}`, table: 'country' })
    }
    if (tables == null || tables.user == null) {
      fetch({ type: 'fetchTable', contentType: 'db', path: `/user`, desc: `user table}`, table: 'user' })
    }
  }
}

const mapStateToProps = ({ tables }) => ({ tables })

export default connect(mapStateToProps, { fetch: fetchData })(ItemFiltered)
