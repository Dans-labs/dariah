import React, { Component } from 'react'
import { connect } from 'react-redux'

import { memoize } from 'memo'
import { emptyS, emptyO } from 'utils'
import { someEditable } from 'fields'

import { insertItem, needValues } from 'tables'
import { getAltSection, compileAlternatives } from 'alter'

import { EditStatus } from 'EditControls'
import ItemContainer from 'ItemContainer'

const initial = 0
const nAlts = 2

class ListPlain extends Component {
  handleInsert = () => {
    const { props: { table, select, masterId, linkField, dispatch } } = this
    dispatch(insertItem(table, select, masterId, linkField))
    this.gotoNew = true
  }
  gotoItem = eId => {
    const { props: { alterSection, table, dispatch } } = this
    const { nextAlt } = compileAlternatives(alterSection, nAlts, initial, dispatch)(`${table}-${eId}`)
    nextAlt()
  }
  closeItem = eId => {
    const { props: { alterSection, table, dispatch } } = this
    const { initAlt } = compileAlternatives(alterSection, nAlts, initial, dispatch)(`${table}-${eId}`)
    initAlt()
  }
  handleCloseAll = memoize(items => () => {items.forEach(eId => {this.closeItem(eId)})})

  scroll = domElem => {
    if (domElem != null) {
      domElem.scrollIntoViewIfNeeded()
    }
  }

  render() {
    const { props: { alter, alterSection, filters, tables, table, listIds, perm, title, dispatch } } = this
    const { [table]: { entities } } = tables
    const nItemsRep = `${listIds.length} item${listIds.length == 1 ? emptyS : 's'} `
    const makeAlternatives = compileAlternatives(alterSection, nAlts, initial, dispatch)
    return (
      <div className={'list-generic'} >
        <div>
          {nItemsRep}
          {
            (perm != null && perm.insert)
            ? <span
                className={'fa fa-plus button-large'}
                title={`new ${table}`}
                onClick={this.handleInsert}
              />
            : null
          }
        </div>
        {
          listIds.map(eId => {
            const { [eId]: { values, fields, perm } } = entities
            const { [title]: entityHead = '-empty-' } = values
            const formTag = `${table}-${eId}`
            const isComplete = !needValues(entities, eId)
            const { getAlt, nextAlt } = makeAlternatives(eId)
            const alt = getAlt(alter)
            const active = alt != initial
            const scrollProps = active ? { ref: this.scroll } : emptyO
            const showStatus = isComplete && someEditable(fields, perm)

            return (
              <div key={eId} >
                <span className={'item-head'} {...scrollProps} >
                  {
                    showStatus
                    ? <EditStatus form={formTag} active={active} />
                    : <span>
                        <span className={'fa fa-fw'} />
                        {' '}
                      </span>
                  }
                  <span className={'link head'} onClick={nextAlt} >
                    <span className={`fa fa-angle-${active ? 'up' : 'down'}`} />
                    {' '}{entityHead}
                  </span>
                </span>
                {
                  active
                  ? <ItemContainer
                      filters={filters}
                      tables={tables}
                      table={table}
                      eId={eId}
                    />
                  : null
                }
              </div>
            )
          })
        }
        <div
          className={'button-large fa fa-angle-double-left'}
          title={'Close all opened items'}
          onClick={this.handleCloseAll(listIds)}
        />
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

export default connect(getAltSection)(ListPlain)
