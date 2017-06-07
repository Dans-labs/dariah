import React, { Component } from 'react'
import { connect } from 'react-redux'
import isEqual from 'lodash/isequal'

import { combineSelectors, memoize, emptyO } from 'utils'
import { EditStatus } from 'fields'

import { getTables, insertItem } from 'tables'
import { getAlts, makeAlt } from 'alter'

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
    const { props, props: { table } } = this
    const { nextAlt } = makeAlt(props, { tag: `${table}-${eId}`, nAlts, initial })
    nextAlt()
  }
  closeItem = eId => {
    const { props, props: { table } } = this
    const { initAlt } = makeAlt(props, { tag: `${table}-${eId}`, nAlts, initial })
    initAlt()
  }
  handleCloseAll = memoize(items => () => {items.forEach(eId => {this.closeItem(eId)})})

  scroll = domElem => {
    if (domElem != null) {
      domElem.scrollIntoViewIfNeeded()
    }
  }

  render() {
    const { props, props: { tables, table, listIds, perm, title } } = this
    const { [table]: { entities } } = tables
    return (
      <div className={'listGeneric'} >
        <div>
          {`${listIds.length} item${listIds.length == 1 ? '' : 's'} `}
          {(perm != null && perm.insert) ? (
            <span
              className="fa fa-plus button-large"
              title={`new ${table}`}
              onClick={this.handleInsert}
            />
          ) : null}
        </div>
        {
          listIds.map(eId => {
            const { [eId]: { values, perm: ePerm } } = entities
            const { [title]: entityHead = '-empty-' } = values
            const tag = `${table}-${eId}`
            const { alt, nextAlt } = makeAlt(props, { tag, nAlts, initial })
            const active = alt != initial
            const scrollProps = active ? { ref: this.scroll } : emptyO
            return (
              <div key={eId} >
                <span {...scrollProps} >
                  {ePerm != null && ePerm.update ? <EditStatus form={tag} showNeutral={true} /> : null}
                  <span
                    className={'link'}
                    onClick={nextAlt}
                  >
                    <span className={`fa fa-angle-${active ? 'up' : 'down'}`} />
                    {' '}{entityHead}
                  </span>
                </span>
                {active ?
                  <ItemContainer
                    table={table}
                    eId={eId}
                  /> : null
                }
              </div>
            )
          })
        }
        <div
          className={'button-large fa fa-angle-double-left'}
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
  shouldComponentUpdate(newProps) {
    for (const prop in newProps) {
      if (prop != 'listIds') {
        if (newProps[prop] !== this.props[prop]) {
          return true
        }
      }
      else {
        if (!isEqual(newProps[prop], this.props[prop])) {
          return true
        }
      }
    }
    return false
  }
  componentDidMount() {
    this.gotoNewItem()
  }
  componentDidUpdate() {
    this.gotoNewItem()
  }
}

const getInfo = combineSelectors(getTables, getAlts)

export default connect(getInfo)(ListPlain)
