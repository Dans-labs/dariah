import React from 'react'
import { connect } from 'react-redux'

import { emptyS, emptyO } from 'utils'

import { compileValues } from 'filters'
import { getAltSection, compileAlternatives } from 'alter'

import Facet from 'Facet'
import CheckboxI from 'CheckboxI'
import Stat from 'Stat'

const ByValue = ({
  alter, alterSection, tables, table,
  filterTag, filterSetting,
  filterId, filterField, filterLabel,
  listIds,
  filteredAmount, filteredAmountOthers,
  amounts, maxCols,
  expanded,
  compact,
  dispatch,
}) => {
  const fieldValues = compileValues(tables, table, filterTag, listIds, filterField)
  if (Object.keys(fieldValues).length == null) {
    return <div className={'facet'} ><p>{' -no facets '}</p></div>
  }
  const initial = expanded ? 0 : 1
  const { getAlt, nextAlt } = compileAlternatives(alterSection, 2, initial, dispatch)('expand')
  const alt = getAlt(alter)
  const attributes = compact ? emptyO : { style: { flexBasis: `${94 / maxCols}%` } }
  const expand = compact ? 'right' : 'down'
  const collapse = compact ? 'left' : 'up'
  return (
    <div className={`facetFilter ${compact ? 'compact' : emptyS}`} >
      <div className={`facetHead ${compact ? 'compact' : emptyS}`} >
        <CheckboxI
          table={table}
          filterId={filterId}
          filterSetting={filterSetting}
          filterTag={filterTag}
        /> {filterLabel}{' '}
        {
          compact
          ? null
          : <Stat
              subTotal={filteredAmount}
              total={filteredAmountOthers}
              className={'facet-stat-all'}
            />
        }
        {' '}
        <span
          className={`button-small fa fa-angle-${alt == 0 ? collapse : expand}`}
          onClick={nextAlt}
        />
      </div>
      {
        alt == 0
        ? <div className={`facet-container ${compact ? 'compact' : emptyS}`} >
            {
              Object.entries(fieldValues).map(([valueId, valueRep]) => (
                <div
                  key={valueId}
                  className={`facet-row ${compact ? 'compact' : emptyS}`}
                  {...attributes}
                >
                  <Facet
                    className={`facet-value ${compact ? 'compact' : emptyS}`}
                    table={table}
                    filterSetting={filterSetting}
                    filterTag={filterTag}
                    filterId={filterId}
                    valueId={valueId}
                    valueRep={valueRep}
                  />
                  {
                    compact
                    ? null
                    : <Stat
                        className={'facet-stat'}
                        subTotal={amounts[valueId]}
                      />
                  }
                </div>
              ))
            }
          </div>
        : <div />
      }
    </div>
  )
}

export default connect(getAltSection)(ByValue)
