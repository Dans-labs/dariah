import React from 'react'
import { connect } from 'react-redux'

import { memoize } from 'memo'
import { combineSelectors } from 'utils'
import { getSort, getSortedData, resetSort, addColumn, turnColumn, delColumn } from 'grid'
import { getTables, insertItem } from 'tables'

import ItemRow from 'ItemRow'

const insertit = memoize((insertItem, table, select, masterId, linkField) => () => insertItem(table, select, masterId, linkField))
const resetit = memoize((reset, tag) => () => reset(tag))
const addCit = memoize((addC, tag, column, direction) => () => addC(tag, column, direction))
const turnCit = memoize((turnC, tag, column) => () => turnC(tag, column))
const delCit = memoize((delC, tag, column) => () => delC(tag, column))

const ListGrid = ({
  heading,
  tables, table, listIds, select, perm: tablePerm,
  masterId, linkField,
  insertItem,
  tag, sortSpec, reset, addC, turnC, delC,
  sortedData,
}) => {
  const theHeading = heading ? `${heading}: ` : ''
  const { [table]: { fields, fieldOrder, fieldSpecs, detailOrder, entities } } = tables
  const xfields = fields
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

  const rows = []
  for (const eId of sortedData) {
    const { [eId]: { values: initialValues, perm } } = entities
    rows.push(
      <ItemRow
        key={`${table}-${eId}`}
        table={table}
        eId={eId}
        initialValues={initialValues}
        perm={perm}
        fields={xfields}
        widthStyles={widthStyles}
      />
    )
  }
  return (
    <div>
      <p>
        <span className={'listTitle'}>{theHeading}</span>{`${listIds.length} items `}
        {(tablePerm != null && tablePerm.insert) ? (
          <span
            className="fa fa-plus button-large"
            title={`new ${table}`}
            onClick={insertit(insertItem, table, select, masterId, linkField)}
          />
        ) : null}
      </p>
      {sortSpec.length != 0 ?
        <p className={'sortspecs'} >
          {'Sorted: '}
          {
            sortSpec.map(([column, direction]) => (
              <span className={'sortcol'} key={column} >
                <span>{column}</span>
                <span className={`fa fa-arrow${direction == -1 ? 'down' : 'up'}`} />
              </span>
            ))
          }
          <span className={'fa fa-close button-small'} onClick={resetit(reset, tag)} />{' '}
        </p> : null
      }
      <div className="grid" >
        <div className="grid-head" >
          <div className="grid-status-cell" />
          {
            fieldOrder.filter(field => field != linkField).map((field, i) => {
              const widthStyle = widthStyles[i]
              const isSorted = sortSpec.find(x => x[0] == field)
              const direction = isSorted ? isSorted[1] : 0
              return (
                <div
                  className="grid-head-cell labelColGrid"
                  key={field}
                  style={widthStyle}
                >
                  {
                    direction ?
                      <span className={'sorted button-small'} onClick={delCit(delC, tag, field)} >{field}</span> :
                      <span className={'unsorted button-small'} onClick={addCit(addC, tag, field, 1)} >{field}</span>
                  }
                  {
                    direction ?
                      <span
                        className={`sorted button-small fa fa-arrow-${direction == 1 ? 'up' : 'down'}`}
                        onClick={turnCit(turnC, tag, field)}
                      /> :
                      null
                  }
                </div>
              )
            })
          }
          {
            (detailOrder || []).map((name, i) => {
              const widthStyle = widthStyles[i]
              return (
                <div
                  className="grid-head-cell labelColGrid"
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

const getInfo = combineSelectors(getTables, getSort, getSortedData)

export default connect(getInfo, {
  insertItem,
  reset: resetSort, addC: addColumn, turnC: turnColumn, delC: delColumn,
})(ListGrid)
