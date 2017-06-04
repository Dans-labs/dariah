import React, { Component } from 'react'
import { connect } from 'react-redux'

import { memoize } from 'memo'
import { EditStatus } from 'fields'

import { getTables, insertItem } from 'tables'

import Alternative, { altNext, AltNext, altInit } from 'Alternative'
import ItemContainer from 'ItemContainer'

const initial = 1

const bodyNext = memoize(
  (table, eId) => nextAlt => nextAlt(`body-${table}-${eId}`, 2, initial)
)
const bodyInit = memoize(
  (table, eId) => setAlt => setAlt(`body-${table}-${eId}`, initial)
)

const headingAlternative = (table, eId, entityHead, active) => (
  <span>
    <EditStatus form={`${table}-${eId}`} hasEditable={true} showNeutral={active} />
    <AltNext
      className={`link ${active ? 'active' : 'control'}`}
      tag={`heading-${table}-${eId}`}
      nAlternatives={2}
      initial={initial}
      extraActions={bodyNext(table, eId)}
    >
      <span className={`fa fa-angle-${active ? 'left' : 'right'}`} />
      {' '}{entityHead}
    </AltNext>
  </span>
)

const headingAlternatives = memoize((...params) => [
  headingAlternative(...params, true),
  headingAlternative(...params, false),
])

class ListPlain extends Component {
  handleInsert = () => {
    const { props: { table, select, masterId, linkField, insertItem } } = this
    insertItem(table, select, masterId, linkField)
    this.gotoNew = true
  }
  gotoItem = eId => {
    const { props: { table, dispatch } } = this
    altNext({
      tag: `heading-${table}-${eId}`,
      nAlternatives: 2,
      initial,
      extraActions: bodyNext(table, eId),
      dispatch,
    })
  }
  closeItem = eId => {
    const { props: { table } } = this
    altInit({
      tag: `heading-${table}-${eId}`,
      initial,
      extraActions: bodyInit(table, eId),
    })
  }
  handleCloseAll = memoize(items => () => {items.forEach(eId => {this.closeItem(eId)})})

  render() {
    const {
      props: {
        tables, table, listIds, perm, title,
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
          alternatives={headingAlternatives(table, eId, entityHead)}
          initial={initial}
        />
      )
      bodies.push(
        <Alternative
          key={eId}
          tag={`body-${table}-${eId}`}
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
  insertItem,
})(ListPlain)
