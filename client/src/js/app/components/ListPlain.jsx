import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import { memoize } from 'memo'
import { combineSelectors, withParams, getUrlParts, emptyS, emptyO } from 'utils'
import { someEditable } from 'fields'

import { insertItem, needValues, headEntity, DETAILS, handleOpenAll } from 'tables'
import { getAltSection, compileAlternatives } from 'alter'
import { compileActive } from 'workflow'
import { getSettings } from 'settings'

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
    const { putAlt } = compileAlternatives(alterSection, nAlts, initial, dispatch)(eId)
    const theAlt = (initial + 1) % nAlts
    putAlt(theAlt)
  }

  scroll = domElem => {
    if (domElem != null) {
      domElem.scrollIntoViewIfNeeded()
    }
  }

  render() {
    const {
      props: {
        settings, alter, alterSection,
        filtered, filters,
        tables, table, select,
        masterId, linkField,
        fixed, listIds, expand, border,
        perm,
        dispatch,
      },
    } = this
    const { [table]: { item, entities } } = tables
    const makeAlternatives = compileAlternatives(alterSection, nAlts, initial, dispatch)
    const activeItems = compileActive(tables, table)
    return (
      <div className={'list-generic'} >
        {
          !(filtered && select === DETAILS)
          ? <EditInsert
              perm={perm}
              select={select}
              fixed={fixed}
              table={table}
              listIds={listIds}
              item={item}
              button={'button-medium'}
              alterSection={alterSection}
              nAlts={nAlts}
              initial={initial}
              openAll={select == DETAILS}
              expand={expand}
              onInsert={this.handleInsert}
            />
          : null
        }
        {
          listIds.map(eId => {
            const { [eId]: { fields, perm } } = entities
            const head = headEntity(tables, table, eId, settings)
            const formTag = `${table}-${eId}`
            const isComplete = !needValues(entities, eId)
            const { getAlt, nextAlt } = makeAlternatives(eId)
            const alt = getAlt(alter)
            const active = alt !== initial
            const scrollProps = active ? { ref: this.scroll } : emptyO
            const showStatus = isComplete && someEditable(fields, perm)
            const isactive = (activeItems != null && activeItems.has(eId))
            ? 'isactive'
            : emptyS

            return (
              <div key={eId} className={isactive} >
                {
                  active
                  ? <div {...scrollProps} >
                      {
                        !expand
                        ? <span className={'link head'} onClick={this.showHide(table, select, eId, false, nextAlt)} >
                            <span className={`fa fa-angle-up`} />
                          </span>
                        : null
                      }
                      <ItemContainer
                        filters={filters}
                        tables={tables}
                        table={table}
                        eId={eId}
                        masterId={masterId}
                        linkField={linkField}
                        isactive={isactive}
                        fixed={fixed}
                        inhibitFetch={expand}
                        border={border}
                      />
                    </div>
                  : <span className={'item-head'} >
                      {
                        showStatus
                        ? <EditStatus form={formTag} active={active} />
                        : <span>
                            <span className={'fa fa-fw'} />
                            {' '}
                          </span>
                      }
                      <span className={'link head'} onClick={this.showHide(table, select, eId, true, nextAlt)} >
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

  showHide = memoize((table, select, eId, active, nextAlt) => () => {
    if (select === DETAILS) {
      nextAlt()
      return
    }
    const [base, origEid] = getUrlParts(browserHistory)
    if (active) {
      if (origEid !== eId) {
        browserHistory.push(`${base}/item/${eId}/`)
      }
    }
    else {
      if (origEid !== '') {
        browserHistory.push(`${base}/`)
      }
      nextAlt()
    }
  })

  gotoNewItem() {
    const { props: { tables, table, navItem } } = this
    if (this.gotoNew) {
      const { [table]: tableInfo } = tables
      if (tableInfo == null) {return}
      const { lastInserted } = tableInfo
      if (lastInserted != null) {
        this.gotoNew = false
        this.gotoItem(lastInserted)
      }
    }
    else if (navItem != null) {
      this.gotoItem(navItem)
    }
  }
  openAll() {
    const {
      props: {
        alter, alterSection,
        table, listIds,
        expand,
        dispatch,
      },
    } = this
    if (expand) {
      handleOpenAll(alter, alterSection, nAlts, initial, table, listIds, dispatch)()
    }
  }
  componentDidMount() {
    this.openAll()
    this.gotoNewItem()
  }
  componentDidUpdate() {
    this.openAll()
    this.gotoNewItem()
  }
}

const getInfo = combineSelectors(getSettings, getAltSection)

export default connect(getInfo)(withParams(ListPlain))
