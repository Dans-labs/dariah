import React, { Component } from 'react'
import { connect } from 'react-redux'
import isEqual from 'lodash/isequal'

import { memoize } from 'memo'
import { combineSelectors, emptyO } from 'utils'
import { EditStatus } from 'fields'

import { getTables, insertItem } from 'tables'
import { getForms } from 'forms'
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
    const { nextAlt } = makeAlt(props, { alterTag: `${table}-${eId}`, nAlts, initial })
    nextAlt()
  }
  closeItem = eId => {
    const { props, props: { table } } = this
    const { initAlt } = makeAlt(props, { alterTag: `${table}-${eId}`, nAlts, initial })
    initAlt()
  }
  handleCloseAll = memoize(items => () => {items.forEach(eId => {this.closeItem(eId)})})

  scroll = domElem => {
    if (domElem != null) {
      domElem.scrollIntoViewIfNeeded()
    }
  }

  render() {
    const { props, props: { tables, forms, table, listIds, perm, title } } = this
    const { [table]: { entities } } = tables
    const nItemsRep = `${listIds.length} item${listIds.length == 1 ? '' : 's'} `
    console.warn(`RENDER ListPlain`)
    return (
      <div className={'listGeneric'} >
        <div>
          {nItemsRep}
          {
            (perm != null && perm.insert)
            ? <span
                className="fa fa-plus button-large"
                title={`new ${table}`}
                onClick={this.handleInsert}
              />
            : null
          }
        </div>
        {
          listIds.map(eId => {
            const { [eId]: { values } } = entities
            const { [title]: entityHead = '-empty-' } = values
            const formTag = `${table}-${eId}`
            const { [formTag]: form } = forms
            const alterTag = `${table}-${eId}`
            const { alt, nextAlt } = makeAlt(props, { alterTag, nAlts, initial })
            const active = alt != initial
            const scrollProps = active ? { ref: this.scroll } : emptyO
            return (
              <div key={eId} >
                <span className={'itemHead'} {...scrollProps} >
                  {
                    form
                    ? <EditStatus form={formTag} showNeutral={true} />
                    : <span>
                        <span className={'fa fa-fw'} title={'not yet open'} />
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
                  ? <ItemContainer table={table} eId={eId} />
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
  shouldComponentUpdate(newProps) {
    for (const prop in newProps) {
      if (!isEqual(newProps[prop], this.props[prop])) {
        console.warn(`UPDATED ${prop}`, this.props[prop], newProps[prop])
      }
    }
    return true
  }
  componentDidMount() {
    this.gotoNewItem()
  }
  componentDidUpdate() {
    this.gotoNewItem()
  }
}

const getInfo = combineSelectors(getTables, getForms, getAlts)

export default connect(getInfo)(ListPlain)
