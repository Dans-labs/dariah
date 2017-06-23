import React from 'react'
import { connect } from 'react-redux'

import { emptyA } from 'utils'

import { DETAILS } from 'tables'
import { makeTag } from 'filters'
import { getAltSection, compileAlternatives } from 'alter'

import ListGrid from 'ListGrid'
import ListPlain from 'ListPlain'
import ListFilter from 'ListFilter'

const ItemDetails = ({ alter, alterSection, filters, tables, table, eId, dispatch }) => {
  const { [table]: { details, detailOrder } } = tables
  const makeAlternatives = compileAlternatives(alterSection, 2, 1, dispatch)
  return (
    <div>
      {
        (detailOrder || emptyA).map(name => {
          const { label, table: detailTable, linkField, mode, filtered } = details[name]
          const {
            [detailTable]: {
              title: detailTitle,
              perm: detailPerm,
              entities: detailEntities,
              allIds: detailAllIds,
            },
          } = tables
          const detailListIds = detailAllIds.filter(_id => detailEntities[_id].values[linkField] == eId)
          const filterTag = makeTag(DETAILS, eId, linkField)
          const gridTag = `${table}-${name}-${eId}`
          const { getAlt } = makeAlternatives(name)
          const alt = getAlt(alter)
          return (
            <div key={name}>
              {
                alt == 0
                ? filtered
                  ? <ListFilter
                      heading={label}
                      filters={filters}
                      tables={tables}
                      table={detailTable}
                      listIds={detailListIds}
                      perm={detailPerm}
                      select={DETAILS}
                      mode={mode}
                      title={detailTitle}
                      gridTag={gridTag}
                      filterTag={filterTag}
                      masterId={eId}
                      linkField={linkField}
                    />
                  : mode == 'list'
                    ? <ListPlain
                        alterSection={`list-${detailTable}-${eId}`}
                        heading={label}
                        filters={filters}
                        tables={tables}
                        table={detailTable}
                        listIds={detailListIds}
                        perm={detailPerm}
                        title={detailTitle}
                        masterId={eId}
                        linkField={linkField}
                      />
                    : mode == 'grid'
                      ? <ListGrid
                          alterSection={`list-${detailTable}-${eId}`}
                          heading={label}
                          filters={filters}
                          tables={tables}
                          table={detailTable}
                          listIds={detailListIds}
                          perm={detailPerm}
                          gridTag={gridTag}
                          masterId={eId}
                          linkField={linkField}
                        />
                      : <span>{`unknown display mode "${mode}" for item list`}</span>
                : null
              }
            </div>
          )
        })
      }
    </div>
  )
}

export default connect(getAltSection)(ItemDetails)

