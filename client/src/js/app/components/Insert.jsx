import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { getUrlParts } from 'utils'

import { getTables, insertItem, MYIDS, DETAILS } from 'tables'

class Insert extends Component {
  handleInsert = () => {
    const { props: { table, masterId, linkField, dispatch } } = this
    const select = masterId == null ? MYIDS : DETAILS
    dispatch(insertItem(table, select, masterId, linkField))
    this.gotoNew = true
  }
  gotoNewItem() {
    const { props: { tables, table, location, history } } = this
    if (this.gotoNew) {
      const { [table]: tableInfo } = tables
      if (tableInfo == null) {
        return
      }
      const { lastInserted } = tableInfo
      if (lastInserted != null) {
        this.gotoNew = false
        const { base } = getUrlParts(location.pathname)
        history.push(`/${base}/${table}/mylist/${lastInserted}/`)
      }
    }
  }
  render() {
    const { props: { thing } } = this
    return (
      <span
        className={`button large workflow info`}
        onClick={this.handleInsert}
      >{`New ${thing}`}</span>
    )
  }
  componentDidMount() {
    this.gotoNewItem()
  }
  componentDidUpdate() {
    this.gotoNewItem()
  }
}

export default connect(getTables)(withRouter(Insert))
