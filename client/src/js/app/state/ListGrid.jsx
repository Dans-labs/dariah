import React from 'react'
import { connect } from 'react-redux'

import { memoize } from 'memo'
import { combineSelectors } from 'utils'
import { getSort, getSortedData, resetSort, addColumn, turnColumn, delColumn } from 'grid'
import { getTables, insertItem } from 'tables'

import ItemRow from 'ItemRow'
import ListPlain from 'ListPlain'
import ListFilter from 'ListFilter'

const insertit = memoize((insert, table, select, masterId, linkField) => () => insert(table, select, masterId, linkField))
const resetit = memoize((reset, tag) => () => reset(tag))
const addCit = memoize((addC, tag, column, direction) => () => addC(tag, column, direction))
const turnCit = memoize((turnC, tag, column) => () => turnC(tag, column))
const delCit = memoize((delC, tag, column) => () => delC(tag, column))

const ListGrid = ({
  heading,
  tables, table, listIds, select, perm: tablePerm,
  masterId, linkField,
  insert,
  tag, sortSpec, reset, addC, turnC, delC,
  sortedData,
}) => {
  const theHeading = heading ? `${heading}: ` : ''
  const { [table]: { fields, fieldOrder, fieldSpecs, details, entities } } = tables
  const xfields = fields
  const { length: nFields } = fieldOrder
  const avLength = `${90 / nFields}%`
  const widths = fieldOrder.map(field => {
    const { [field]: { grid } } = fieldSpecs
    if (grid == null) {
      return { width: avLength, shrink: 0.5, grow: 1 }
    }
    const { width, grow, shrink } = grid
    return {
      width: width == null ? avLength : width,
      shrink: shrink == null ? 0 : shrink,
      grow: grow == null ? 0 : grow,
    }
  })
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
        widths={widths}
        form={`${table}-${eId}`}
      />
    )
    Object.entries(details || {}).forEach(([name, { label, table: detailTable, linkField, mode }]) => {
      const {
        [detailTable]: {
          title: detailTitle,
          perm: detailPerm,
          entities: detailEntities,
          allIds: detailAllIds,
        },
      } = tables
      const detailListIds = detailAllIds.filter(_id => detailEntities[_id].values[linkField] == eId)
      rows.push(
        <div key={`${name}-${eId}`} >
          {
            mode == 'grid' ?
              <ListGrid
                heading={label}
                table={detailTable}
                listIds={detailListIds}
                perm={detailPerm}
                tag={`${table}-${name}-${eId}`}
                masterId={eId}
                linkField={linkField}
              /> :
            mode == 'plain' ?
              <ListPlain
                heading={label}
                table={detailTable}
                listIds={detailListIds}
                perm={detailPerm}
                title={detailTitle}
                inplace={true}
                masterId={eId}
                linkField={linkField}
              /> :
            mode == 'filter' ?
              <ListFilter
                heading={label}
                table={detailTable}
                listIds={detailListIds}
                masterId={eId}
                linkField={linkField}
              /> :
              <span>{`unknown display mode "${mode}" for item list`}</span>
          }
        </div>
      )
    })
  }
  return (
    <div>
      <p>
        <span className={'listTitle'}>{theHeading}</span>{`${listIds.length} items `}
        {(tablePerm != null && tablePerm.insert) ? (
          <span
            className="fa fa-plus button-large"
            title={`new ${table}`}
            onClick={insertit(insert, table, select, masterId, linkField)}
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
              const { width, shrink, grow } = widths[i]
              const isSorted = sortSpec.find(x => x[0] == field)
              const direction = isSorted ? isSorted[1] : 0
              return (
                <div
                  className="grid-head-cell labelColGrid"
                  key={field}
                  style={{
                    flexBasis: width,
                    flexShrink: shrink,
                    flexGrow: grow,
                    overflow: 'auto',
                  }}
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
        </div>
        {rows}
      </div>
    </div>
  )
}

const getInfo = combineSelectors(getTables, getSort, getSortedData)

export default connect(getInfo, {
  insert: insertItem,
  reset: resetSort, addC: addColumn, turnC: turnColumn, delC: delColumn,
})(ListGrid)
