import React, { Component } from 'react'
import { connect } from 'react-redux'

import { memoize } from 'memo'
import { combineHandler } from 'utils'

import { getTables, insertItem } from 'tables'
import { nextAlt, setAlt } from 'alter'

import Alternative from 'Alternative'
import ItemContainer from 'ItemContainer'
import EditStatus from 'EditStatus'

const initial = 1

const bodyControls = [
  () => null,
  () => null,
]
const bodyControlPlacement = control => <span>{control}</span>

const getNext = memoize(
  (next, kind, table, eId) => () => next(`${kind}-${table}-${eId}`, bodyControls.length, initial)
)
const getInit = memoize(
  (setA, kind, table, eId) => () => setA(`${kind}-${table}-${eId}`, initial)
)

const headingControlPlacement = control => <span>{control}</span>
const headingControl = (next, table, eId, entityHead, hasEditable, active) => handler => (
  <span>
    <EditStatus form={`${table}-${eId}`} hasEditable={hasEditable} canSubmit={false} />
    <a
      className={active ? 'active' : 'control'}
      href="#"
      onClick={combineHandler(handler, getNext(next, 'body', table, eId))}
    >
      <span className={`fa fa-angle-${active ? 'left' : 'right'}`} />
      {' '}{entityHead}
    </a>
  </span>
)
const headingControls = memoize((...params) => [
  headingControl(...params, true),
  headingControl(...params, false),
])

const headingAlternatives = ['', '']

class ListPlain extends Component {
  handleInsert = () => {
    const { props: { table, select, masterId, linkField, insert } } = this
    insert(table, select, masterId, linkField)
    this.gotoNew = true
  }
  gotoItem = eId => {
    const { props: { table, next } } = this
    getNext(next, 'heading', table, eId)()
    getNext(next, 'body', table, eId)()
  }
  closeItem = eId => {
    const { props: { table, setA } } = this
    getInit(setA, 'heading', table, eId)()
    getInit(setA, 'body', table, eId)()
  }
  handleCloseAll = memoize(items => () => {items.forEach(eId => {this.closeItem(eId)})})

  render() {
    const {
      props: {
        tables, table, listIds, perm, title,
        next,
      },
    } = this
    const headings = []
    const bodies = []
    const { [table]: { entities } } = tables
    listIds.forEach(eId => {
      const { [eId]: { values } } = entities
      const { [title]: entityHead = '-empty-' } = values
      headings.push(
        <Alternative
          key={eId}
          tag={`heading-${table}-${eId}`}
          controlPlacement={headingControlPlacement}
          controls={headingControls(next, table, eId, entityHead)}
          alternatives={headingAlternatives}
          initial={initial}
        />
      )
      bodies.push(
        <Alternative
          key={eId}
          tag={`body-${table}-${eId}`}
          controlPlacement={bodyControlPlacement}
          controls={bodyControls}
          alternatives={[(
            <ItemContainer
              key="show"
              table={table}
              eId={eId}
            />
          ), '']}
          initial={initial}
        />
      )
    })
    const closeControl = (
      <div
        className={'button-large fa fa-angle-double-left'}
        onClick={this.handleCloseAll(listIds)}
      />
    )
    return (
      <div className={'listGeneric'} >
        <div className={'listHeadCol'} >
          <div>
            {`${listIds.length} items `}
            {(perm != null && perm.insert) ? (
              <span
                className="fa fa-plus button-large"
                title={`new ${table}`}
                onClick={this.handleInsert}
              />
            ) : null}
          </div>
          {headings}
          {closeControl}
        </div>
        <div className={'listFormCol'} >
          {bodies}
        </div>
      </div>
    )
  }

  gotoNewItem() {
    if (this.gotoNew) {
      const { props: { tables, table } } = this
      const { [table]: tableInfo } = tables
      if (tableInfo == null) {return}
      const { lastInserted } = tableInfo
      if (lastInserted != null) {
        this.gotoNew = false
        this.gotoItem(lastInserted)
      }
    }
  }
  componentDidMount() {
    this.gotoNewItem()
  }
  componentDidUpdate() {
    this.gotoNewItem()
  }
}

export default connect(getTables, {
  insert: insertItem,
  next: nextAlt,
  setA: setAlt,
})(ListPlain)
