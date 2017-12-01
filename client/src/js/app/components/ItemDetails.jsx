import React from 'react'
import { connect } from 'react-redux'

import { combineSelectors, emptyS } from 'utils'

import { DETAILS, isOwner } from 'tables'
import { makeTag } from 'filters'
import { getMe } from 'me'
import { getAltSection, compileAlternatives } from 'alter'

import ListGrid from 'ListGrid'
import ListPlain from 'ListPlain'
import ListFilter from 'ListFilter'
import Tooltip from 'Tooltip'

const ItemDetails = ({ me, alter, alterSection, filters, tables, table, eId, detailFragments, dispatch }) => {
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
          const { mode, expand: expandSpec, border, filtered, fixed } = detailSpecs
          const [detailThing, detailThings] = detailItem
          const filterTag = makeTag(DETAILS, eId, linkField)
          const gridTag = `${table}-${name}-${eId}`
          const expand = expandSpec === 'own'
          ? isOwner(tables, table, eId, me)
          : expandSpec
          return (
            <div key={name} className={'grid-row'} >
              {
                !expand
                ? <Tooltip
                    tip={`${alt == 0 ? 'show' : 'hide'} detail records`}
                    at={'left'}
                    className={'detail-control'}
                  >
                    <span
                      className={'link'}
                      onClick={nextAlt}
                    >
                      <span className={`button small fa fa-angle-${alt === 0 ? 'down' : 'up'}`} />
                      {
                        alt === 0
                        ? `${nDetails} ${nDetails === 1 ? detailThing : detailThings}`
                        : emptyS
                      }
                    </span>
                  </Tooltip>
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
                        : `unknown display mode "${mode}" for ${detailThings}`
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

const getInfo = combineSelectors(getMe, getAltSection)

export default connect(getInfo)(ItemDetails)

