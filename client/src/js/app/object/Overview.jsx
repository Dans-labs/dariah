import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getTables, needTables, fetchTable, ALLIDS } from 'tables'

import { compileActive, PACKAGE_TABLE, TYPE_TABLE } from 'custom'

import ListGrid from 'ListGrid'

class Overview extends Component {
  render() {
    const { props: { tables } } = this
    if (needTables(tables, [[PACKAGE_TABLE, ALLIDS, true]])) {return <div />}
    const { activeIdsPkg, activeIdsTyp} = compileActive(tables)
    return (
      <div className={'overview'} >
        {
          [[PACKAGE_TABLE, activeIdsPkg], [TYPE_TABLE, activeIdsTyp]].map(([table, listIds]) => {
            const { [table]: tableData } = tables
            return (
                <ListGrid
                  alterSection={`list-${table}-${ALLIDS}`}
                  key={table}
                  tables={tables}
                  table={table}
                  listIds={listIds}
                  select={ALLIDS}
                  perm={tableData.perm}
                  gridTag={`overview-${table}`}
                />
            )
          })
        }
      </div>
    )
  }
  componentDidMount() {
    const { props: { tables, dispatch } } = this
    if (needTables(tables, [[PACKAGE_TABLE, ALLIDS, true]])) {dispatch(fetchTable(PACKAGE_TABLE, ALLIDS, true))}
  }
}

export default connect(getTables)(Overview)
