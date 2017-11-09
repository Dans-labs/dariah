import React from 'react'
import { connect } from 'react-redux'

import { emptyS } from 'utils'

import { DETAILS } from 'tables'
import { makeTag } from 'filters'
import { getAltSection, compileAlternatives } from 'alter'

import ListGrid from 'ListGrid'
import ListPlain from 'ListPlain'
import ListFilter from 'ListFilter'

const ItemDetails = ({ alter, alterSection, filters, tables, table, eId, detailFragments, dispatch }) => {
  if (detailFragments.length == 0) {return null}
  const makeAlternatives = compileAlternatives(alterSection, 2, 1, dispatch)
  return (
    <div className={'grid fragments'}>
      {
        detailFragments.map(({
          name, detailTitle, detailTable, linkField, detailItem, detailListIds, detailPerm, detailSpecs,
        }) => {
          const nDetails = detailListIds.length
          const { getAlt, nextAlt } = makeAlternatives(name)
          const alt = getAlt(alter)
          const { mode, expand, border, filtered, fixed } = detailSpecs
          const [detailThing, detailThings] = detailItem
          const filterTag = makeTag(DETAILS, eId, linkField)
          const gridTag = `${table}-${name}-${eId}`
          return (
            <div key={name} className={'grid-row'} >
              {
                !expand
                ? <div
                    className={'link detail-control'}
                    data-rh={'show detail records'}
                    onClick={nextAlt}
                  >
                    <span className={`fa fa-angle-${alt === 0 ? 'down' : 'up'}`} />
                    {
                      alt === 0
                      ? `${nDetails} ${nDetails === 1 ? detailThing : detailThings}`
                      : emptyS
                    }
                  </div>
                : null
              }
              <div className={'detail-body'} >
                {
                  alt === 1
                  ? filtered
                    ? <ListFilter
                        filters={filters}
                        tables={tables}
                        table={detailTable}
                        listIds={detailListIds}
                        perm={detailPerm}
                        select={DETAILS}
                        mode={mode}
                        compact={true}
                        title={detailTitle}
                        gridTag={gridTag}
                        filterTag={filterTag}
                        masterId={eId}
                        linkField={linkField}
                        expand={expand}
                        border={border}
                        fixed={fixed}
                      />
                    : mode === 'list'
                      ? <ListPlain
                          alterSection={`list-${detailTable}-${DETAILS}`}
                          filters={filters}
                          tables={tables}
                          table={detailTable}
                          listIds={detailListIds}
                          perm={detailPerm}
                          select={DETAILS}
                          title={detailTitle}
                          masterId={eId}
                          linkField={linkField}
                          expand={expand}
                          border={border}
                          fixed={fixed}
                        />
                      : mode === 'grid'
                        ? <ListGrid
                            alterSection={`list-${detailTable}-${DETAILS}`}
                            filters={filters}
                            tables={tables}
                            table={detailTable}
                            listIds={detailListIds}
                            perm={detailPerm}
                            select={DETAILS}
                            gridTag={gridTag}
                            masterId={eId}
                            linkField={linkField}
                            fixed={fixed}
                          />
                        : <span>{`unknown display mode "${mode}" for ${detailThings}`}</span>
                  : null
                }
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default connect(getAltSection)(ItemDetails)

