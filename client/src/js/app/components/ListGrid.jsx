import React from 'react'
import { connect } from 'react-redux'

import { combineSelectors, emptyA } from 'utils'
import { handle } from 'handle'

import { getSettings } from 'settings'
import { getAltSection, compileAlternatives } from 'alter'
import { getGrid, compileSortedData, resetSort, addColumn, turnColumn, delColumn } from 'grid'
import { insertItem, DETAILS } from 'tables'
import { compileActive } from 'workflow'

import { dealWithProvenance } from 'fields'

import { EditInsert, OpenCloseAll } from 'EditControls'
import ItemRow from 'ItemRow'

const initial = 0
const nAlts = 2

const ListGrid = ({
  alter, alterSection, filtered,
  settings, filters, tables, table, listIds, select, perm: tablePerm,
  masterId, linkField, fixed,
  grid, gridTag,
  dispatch,
}) => {
  const { [gridTag]: sortSpec = emptyA } = grid
  const { [table]: tableData } = tables
  const {
    fields: givenFields,
    fieldOrder: givenFieldOrder,
    fieldSpecs,
    item,
    detailOrder,
    entities,
  } = tableData
  const fields = dealWithProvenance(settings, givenFields)
  const fieldOrder = givenFieldOrder.filter(field => fields[field])
  const { length: nFields } = fieldOrder
  const nDetails = detailOrder != null ? detailOrder.length : 0
  const avLength = `${90 / nFields}%`
  const widths = fieldOrder.map(field => {
    const { [field]: { grid } } = fieldSpecs
    if (grid == null) {
      return { width: avLength, shrink: 0, grow: 1 }
    }
    const { width, grow, shrink } = grid
    return {
      width: width == null ? avLength : width,
      shrink: shrink == null ? 0 : shrink,
      grow: grow == null ? 0 : grow,
    }
  }).concat(new Array(nDetails).fill({ width: avLength, shrink: 0, grow: 0.3 }))
  const widthStyles = widths.map(({ width, grow, shrink }) => ({
    flex: `${grow} ${shrink} ${width}`,
    overflow: 'auto',
  }))

  const sortedData = compileSortedData(tables, table, listIds, sortSpec, settings)
  const makeAlternatives = compileAlternatives(alterSection, 2, 0, dispatch)
  const activeItems = compileActive(tables, table)
  const rows = []
  for (const eId of sortedData) {
    const { [eId]: { values: initialValues, perm } } = entities
    const { getAlt, nextAlt } = makeAlternatives(eId)
    const alt = getAlt(alter)
    const isactive = (activeItems != null && activeItems.has(eId))
    rows.push(
      <ItemRow
        key={`${table}-${eId}`}
        alt={alt}
        nextAlt={nextAlt}
        filters={filters}
        tables={tables}
        table={table}
        eId={eId}
        masterId={masterId}
        linkField={linkField}
        isactive={isactive}
        initialValues={initialValues}
        perm={perm}
        fields={fields}
        widthStyles={widthStyles}
        fixed={fixed}
      />
    )
  }
  return (
    <div>
      {
        !(filtered && select === DETAILS)
        ? <div>
            <EditInsert
              perm={tablePerm}
              select={select}
              fixed={fixed}
              item={item}
              button={'button-medium'}
              onInsert={handle(dispatch, insertItem, table, select, masterId, linkField)}
            />
            <OpenCloseAll
              table={table}
              listIds={listIds}
              item={item}
              button={'button-medium'}
              alterSection={alterSection}
              nAlts={nAlts}
              initial={initial}
              openAll={select == DETAILS}
            />
          </div>
        : null
      }
      {
        sortSpec.length !== 0
        ? <p className={'sortspecs'} >
            {'Sorted: '}
            {
              sortSpec.map(([column, direction]) => (
                <span className={'sortcol'} key={column} >
                  <span>{column}</span>
                  <span className={`fa fa-arrow${direction === -1 ? 'down' : 'up'}`} />
                </span>
              ))
            }
            <span
              className={'fa fa-close button-small'}
              title={'remove all sort options'}
              onClick={handle(dispatch, resetSort, gridTag)}
            />{' '}
          </p>
        : null
      }
      <div className={'grid'} >
        <div className={'grid-head'} >
          <div className={'grid-status-cell'} />
          {
            fieldOrder.filter(field => field !== linkField).map((field, i) => {
              const widthStyle = widthStyles[i]
              const isSorted = sortSpec.find(x => x[0] === field)
              const direction = isSorted ? isSorted[1] : 0
              return (
                <div
                  className={'grid-head-cell label-col-grid'}
                  key={field}
                  style={widthStyle}
                >
                  {
                    direction
                    ? <span
                        className={'sorted button-small'}
                        title={'remove column from sort options'}
                        onClick={handle(dispatch, delColumn, gridTag, field)}
                      >{field}</span>
                    : <span
                        className={'unsorted button-small'}
                        title={'sort on this column'}
                        onClick={handle(dispatch, addColumn, gridTag, field, 1)}
                      >{field}</span>
                  }
                  {
                    direction
                    ? <span
                        className={`sorted button-small fa fa-arrow-${direction === 1 ? 'up' : 'down'}`}
                        title={'change sort direction'}
                        onClick={handle(dispatch, turnColumn, gridTag, field)}
                      />
                    : null
                  }
                </div>
              )
            })
          }
          {
            (detailOrder || emptyA).map((name, i) => {
              const widthStyle = widthStyles[i]
              return (
                <div
                  className={'grid-head-cell label-col-grid'}
                  key={name}
                  style={widthStyle}
                >{name}
                </div>
              )
            })
          }
        </div>
        {rows}
      </div>
    </div>
  )
}

const getInfo = combineSelectors(getSettings, getGrid, getAltSection)

export default connect(getInfo)(ListGrid)
