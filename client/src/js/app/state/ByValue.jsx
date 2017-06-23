import React from 'react'
import { connect } from 'react-redux'

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
  dispatch,
}) => {
  const fieldValues = compileValues(tables, table, filterTag, listIds, filterField)
  if (Object.keys(fieldValues).length == null) {
    return <div className={'facet'} ><p>{' -no facets '}</p></div>
  }
  const initial = expanded ? 0 : 1
  const { getAlt, nextAlt } = compileAlternatives(alterSection, 2, initial, dispatch)('expand')
  const alt = getAlt(alter)
  return (
    <div className={'facet'} >
      <p className={'facet'} >
        <CheckboxI
          table={table}
          filterId={filterId}
          filterSetting={filterSetting}
          filterTag={filterTag}
        /> {filterLabel}{' '}
        <Stat
          subTotal={filteredAmount}
          total={filteredAmountOthers}
          className={'facet-stat-all'}
        />{' '}
        <span
          className={`button-small fa fa-angle-${alt == 0 ? 'up' : 'down'}`}
          onClick={nextAlt}
        />
      </p>
      {
        alt == 0
        ? <div className={'facet-container'} >
            {
              Object.entries(fieldValues).map(([valueId, valueRep]) => (
                <div
                  key={valueId}
                  className={'facet-row'}
                  style={{ flexBasis: `${94 / maxCols}%` }}
                >
                  <Facet
                    className={'facet-value'}
                    table={table}
                    filterSetting={filterSetting}
                    filterTag={filterTag}
                    filterId={filterId}
                    valueId={valueId}
                    valueRep={valueRep}
                  />
                  <Stat
                    className={'facet-stat'}
                    subTotal={amounts[valueId]}
                  />
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
