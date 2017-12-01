import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import { memoize } from 'memo'
import { combineSelectors, withParams, getUrlParts, emptyS, emptyO } from 'utils'
import { someEditable } from 'fields'
import { getMasterTable } from 'details'
import { editMode } from 'templates'

import { insertItem, needValues, headEntity, DETAILS, handleOpenAll } from 'tables'
import { getAltSection, compileAlternatives } from 'alter'
import { compileActive } from 'workflow'
import { getSettings } from 'settings'
import { getMe } from 'me'

import ErrorBoundary from 'ErrorBoundary'
import ItemContainer from 'ItemContainer'
import EditStatus from 'EditStatus'
import EditInsert from 'EditInsert'
import OpenCloseAll from 'OpenCloseAll'

const initial = 0
const nAlts = 2

class ListPlain extends Component {
  handleInsert = () => {
    const { props: { table, select, masterId, linkField, dispatch } } = this
    dispatch(insertItem(table, select, masterId, linkField))
    this.gotoNew = true
  }
  gotoItem = eId => {
    const { props: { table, alterSection, dispatch } } = this
    const { putAlt } = compileAlternatives(alterSection, nAlts, initial, dispatch)(eId)
    const theAlt = (initial + 1) % nAlts
    putAlt(theAlt)
    const { putAlt: putAltE } = compileAlternatives(`edit-${table}-${eId}`, nAlts, initial, dispatch)('edit')
    const theAltE = (initial + 1) % nAlts
    putAltE(theAltE)
  }

  scroll = domElem => {
    if (domElem != null) {
      //domElem.scrollIntoViewIfNeeded() // this is a non-standard function, only supported by webkit, not by firefox
      domElem.scrollIntoView()
    }
  }

  render() {
    const {
      props: {
        settings, me,
        alter, alterSection,
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
    const masterTable = getMasterTable(tables, table, linkField)
    const startMode = masterTable == null
    ? 0
    : editMode({ me, tables, table, relTable: masterTable })
    return (
      <div className={'list-plain'} >
        {
          !(filtered && select === DETAILS)
          ? <div>
              <EditInsert
                tables={tables}
                table={table}
                perm={perm}
                select={select}
                masterTable={masterTable}
                masterId={masterId}
                nItems={listIds.length}
                fixed={fixed}
                item={item}
                button={'button medium'}
                onInsert={this.handleInsert}
              />
              <OpenCloseAll
                table={table}
                listIds={listIds}
                item={item}
                button={'button medium'}
                alterSection={alterSection}
                nAlts={nAlts}
                initial={initial}
                openAll={select == DETAILS}
                expand={expand}
              />
            </div>
          : null
        }
        {
          listIds.map(eId => {
            const { [eId]: { fields, perm, workflow, values } } = entities
            const head = headEntity(tables, table, eId, settings)
            const formTag = `${table}-${eId}`
            const isComplete = !needValues(entities, eId)
            const { getAlt, nextAlt } = makeAlternatives(eId)
            const alt = getAlt(alter)
            const active = alt !== initial
            const scrollProps = active ? { ref: this.scroll } : emptyO
            const showStatus = isComplete && someEditable(fields, perm, workflow)
            const isactive = activeItems != null && activeItems.has(eId)
            const thisStartMode = startMode === 0 ? startMode : startMode(values)

            return (
              <div key={eId} className={isactive ? 'isactive' : emptyS} >
                {
                  active
                  ? <div {...scrollProps} >
                      {
                        !expand
                        ? <span className={'link head'} onClick={this.showHide(table, select, eId, false, nextAlt)} >
                            <span className={`button small fa fa-angle-up`} />
                          </span>
                        : null
                      }
                      <ErrorBoundary>
                        <ItemContainer
                          filters={filters}
                          tables={tables}
                          table={table}
                          eId={eId}
                          masterId={masterId}
                          linkField={linkField}
                          isactive={isactive}
                          startMode={thisStartMode}
                          fixed={fixed}
                          inhibitFetch={expand}
                          border={border}
                        />
                      </ErrorBoundary>
                    </div>
                  : <span className={'item-head'} >
                      {
                        showStatus
                        ? <EditStatus form={formTag} active={active} />
                        : <span className={'fa'} />
                      }
                      <span className={'link head'} onClick={this.showHide(table, select, eId, true, nextAlt)} >
                        <span className={`button small fa fa-angle-down`} />
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
    const { base, controller, eId: origEid } = getUrlParts(browserHistory)
    const xBase = `${base}/${table}/${controller}`
    if (active) {
      if (origEid !== eId) {
        browserHistory.push(`${xBase}/item/${eId}/`)
      }
    }
    else {
      if (origEid !== emptyS) {
        browserHistory.push(`${xBase}/`)
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

const getInfo = combineSelectors(getSettings, getMe, getAltSection)

export default connect(getInfo)(withParams(ListPlain))
