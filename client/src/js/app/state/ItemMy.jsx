import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchData } from 'server.js'

import ItemList from 'ItemList.jsx'

import { getData } from 'data.js'
import { withContext, saveState } from 'hoc.js'
import { columnStyle } from 'window.js'

class ItemMy extends Component {
  inserted = data => {
    const { props: { params: { table }, router } } = this
    if (data != null) {
      router.push(`/${table}/mylist/${data}`)
    }
  }

  handleInsert = event => {
    event.preventDefault()
    const { props: { params: { table }, notification } } = this
    getData(
      [
        {
          type: 'db',
          path: `/mod?table=${table}&action=insert`,
          branch: 'insert',
          callback: this.inserted,
        },
        {
          type: 'db',
          path: `/my?table=${table}`,
          branch: 'listData',
        },
      ],
      this,
      notification.component
    )
  }

  deleted = data => {
    const { props: { params: { table }, router } } = this
    if (data != null) {
      router.push(`/${table}/mylist`)
    }
  }

  deleteRow = recordId => event => {
    event.preventDefault()
    const { props: { params: { table }, notification } } = this
    getData(
      [
        {
          type: 'db',
          path: `/mod?table=${table}&action=delete`,
          branch: `delete`,
          callback: this.deleted,
          data: {_id: recordId},
        },
        {
          type: 'db',
          path: `/my?table=${table}`,
          branch: 'listData',
        },
      ],
      this,
      notification.component
    )
  }

  render() {
    const {
      props: { params: { table }, tables, children, height, width },
    } = this
    if (
      tables == null || tables[table] == null || tables[table].my == null ||
      tables.country == null || tables.user == null
    ) {
      return <div />
    }
    const { records, title, perm, my } = tables[table]
    return (
      <div>
        <div
          className="nav sized"
          style={columnStyle('rightLeftNav', { height, width })}
        >
          <p>
            {`${my.length} items `}
            {(perm != null && perm.insert) ? (
              <span
                className="fa fa-plus button-large insert"
                title="New item"
                onClick={this.handleInsert}
              />
            ) : null}
          </p>
          <ItemList table={table} title={title} filteredData={my.map(_id => records[_id])} inplace={false} />
        </div>
        <div
          className="sized"
          style={columnStyle('rightRightBody', { height, width })}
        >
          { children }
        </div>
      </div>
    )
  }
  componentDidMount() {
    const {
      props: {
        params: { table },
        tables,
        fetch,
        setList,
      },
    } = this
    if (tables == null || tables[table] == null || tables[table].my == null) {
      fetch({ type: 'fetchTableMy', contentType: 'db', path: `/my?table=${table}`, desc: `${table} table (my records)}`, table })
      setList({ type: 'setList', table, listObj: this })
    }
    if (tables == null || tables.country == null) {
      fetch({ type: 'fetchTable', contentType: 'db', path: `/member_country`, desc: `country table}`, table: 'country' })
    }
    if (tables == null || tables.user == null) {
      fetch({ type: 'fetchTable', contentType: 'db', path: `/user`, desc: `user table}`, table: 'user' })
    }
  }
}

const mapStateToProps = ({ tables, win: { height, width } }) => ({ tables, height, width })

export default connect(mapStateToProps, { fetch: fetchData, setList: x=>dispatch=>x })(
  withContext(ItemMy)
)


