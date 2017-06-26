import React, { Component } from 'react'
import { connect } from 'react-redux'

import { emptyS, emptyO } from 'utils'
import { someEditable } from 'fields'

import { insertItem, needValues, entityHead, DETAILS } from 'tables'
import { getAltSection, compileAlternatives } from 'alter'
import { compileActive } from 'custom'

import { EditStatus, EditInsert } from 'EditControls'
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
    const { props: { alterSection, dispatch } } = this
    const { nextAlt } = compileAlternatives(alterSection, nAlts, initial, dispatch)(eId)
    nextAlt()
  }

  scroll = domElem => {
    if (domElem != null) {
      domElem.scrollIntoViewIfNeeded()
    }
  }

  render() {
    const { props: { alter, alterSection, filters, tables, table, select, listIds, perm, dispatch } } = this
    const { [table]: { item, entities } } = tables
    const makeAlternatives = compileAlternatives(alterSection, nAlts, initial, dispatch)
    const activeItems = compileActive(tables, table)
    return (
      <div className={'list-generic'} >
        {
          select == DETAILS
          ? null
          : <EditInsert
              perm={perm}
              listIds={listIds}
              item={item}
              button={'button-large'}
              alterSection={alterSection}
              nAlts={nAlts}
              initial={initial}
              onInsert={this.handleInsert}
            />
        }
        {
          listIds.map(eId => {
            const { [eId]: { fields, perm } } = entities
            const head = entityHead(tables, table, eId)
            const formTag = `${table}-${eId}`
            const isComplete = !needValues(entities, eId)
            const { getAlt, nextAlt } = makeAlternatives(eId)
            const alt = getAlt(alter)
            const active = alt != initial
            const scrollProps = active ? { ref: this.scroll } : emptyO
            const showStatus = isComplete && someEditable(fields, perm)
            const isactive = (activeItems != null && activeItems.has(eId))
            ? 'isactive'
            : emptyS

            return (
              <div key={eId} className={isactive} >
                {
                  active
                  ? <div>
                      <span className={'link head'} onClick={nextAlt} >
                        <span className={`fa fa-angle-up`} />
                      </span>
                      <ItemContainer
                        filters={filters}
                        tables={tables}
                        table={table}
                        eId={eId}
                        isactive={isactive}
                      />
                    </div>
                  : <span className={'item-head'} {...scrollProps} >
                      {
                        showStatus
                        ? <EditStatus form={formTag} active={active} />
                        : <span>
                            <span className={'fa fa-fw'} />
                            {' '}
                          </span>
                      }
                      <span className={'link head'} onClick={nextAlt} >
                        <span className={`fa fa-angle-down`} />
                        {' '}{head}
                      </span>
                    </span>
                }
              </div>
            )
          })
        }
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
