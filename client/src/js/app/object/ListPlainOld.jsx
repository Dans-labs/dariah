import React, { Component } from 'react'
import { connect } from 'react-redux'
import isEqual from 'lodash/isequal'

import { memoize } from 'memo'
import { emptyO } from 'utils'
import { EditStatus } from 'fields'

import { getTables, insertItem } from 'tables'

import Alternative, { AlternativeX, altNext, AltNext, altInit } from 'Alternative'
import ItemContainer from 'ItemContainer'

const initial = 0

import Perf from 'react-addons-perf'
window.Perf = Perf

const headingAlternative = memoize((table, eId, entityHead, scroll, active) => {
  const scrollProps = active ? { ref: scroll } : emptyO
  return (
    <span key={active} {...scrollProps} >
      <EditStatus form={`${table}-${eId}`} hasEditable={true} showNeutral={active} />
      <AltNext
        className={`link ${active ? 'active' : 'control'}`}
        tag={`${table}-${eId}`}
        nAlternatives={2}
        initial={initial}
      >
        <span className={`fa fa-angle-${active ? 'left' : 'right'}`} />
        {' '}{entityHead}
      </AltNext>
    </span>
  )
})

class ListPlain extends Component {
  handleInsert = () => {
    const { props: { table, select, masterId, linkField, insertItem } } = this
    insertItem(table, select, masterId, linkField)
    this.gotoNew = true
  }
  gotoItem = eId => {
    const { props: { table, dispatch } } = this
    altNext({
      tag: `${table}-${eId}`,
      nAlternatives: 2,
      initial,
      dispatch,
    })
  }
  closeItem = eId => {
    const { props: { table } } = this
    altInit({
      tag: `${table}-${eId}`,
      initial,
    })
  }
  handleCloseAll = memoize(items => () => {items.forEach(eId => {this.closeItem(eId)})})

  scroll = domElem => {
    if (domElem != null) {
      domElem.scrollIntoViewIfNeeded()
    }
  }
  makeAlternative = memoize((table, eId, entityHead) => {
    console.warn('MAKE ALTERNATIVE')
    return alt => (
      <div>
        {headingAlternative(table, eId, entityHead, this.scroll, alt != 0)}
        {alt == 1 ?
          <ItemContainer
            table={table}
            eId={eId}
          /> : null
        }
      </div>
    )
  })

  render() {
    const { props: { tables, table, listIds, perm, title } } = this
    const { [table]: { entities } } = tables
    //console.warn('LISTPLAIN RENDER', this.props)
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
            const { [eId]: { values } } = entities
            const { [title]: entityHead = '-empty-' } = values
            /*
            return (
              <Alternative
                key={eId}
                tag={`${table}-${eId}`}
                alternatives={[
                  <div key={false}>
                    {headingAlternative(table, eId, entityHead, this.scroll, false)}
                  </div>,
                  <div key={true}>
                    {headingAlternative(table, eId, entityHead, this.scroll, true)}
                    <ItemContainer
                      table={table}
                      eId={eId}
                    />
                  </div>,
                ]}
                initial={initial}
              />
            )
            */
            return (
              <AlternativeX
                key={eId}
                tag={`${table}-${eId}`}
                alternatives={this.makeAlternative(table, eId, entityHead)}
                initial={initial}
              />
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
          //console.warn(`LISTPLAIN SHOULDUPDATE because of ${prop}`)
          return true
        }
      }
      else {
        if (!isEqual(newProps[prop], this.props[prop])) {
          //console.warn(`LISTPLAIN SHOULDUPDATE because of ${prop}`)
          return true
        }
      }
    }
    //console.warn(`LISTPLAIN SHOULDUPDATE NO`)
    return false
  }
  componentDidMount() {
    //console.warn('LISTPLAIN DIDMOUNT')
    this.gotoNewItem()
  }
  componentDidUpdate() {
    //console.warn('LISTPLAIN DIDUPDATE')
    this.gotoNewItem()
  }
}

export default connect(getTables, {
  insertItem,
})(ListPlain)
