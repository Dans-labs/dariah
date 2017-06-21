import React from 'react'
import { connect } from 'react-redux'

import { combineSelectors } from 'utils'
import { getFieldValues } from 'filters'
import { getAlts, makeAlt } from 'alter'

import Facet from 'Facet'
import CheckboxI from 'CheckboxI'
import Stat from 'Stat'

const ByValue = ({
  table, filterTag,
  filterId, filterLabel,
  fieldValues,
  filteredAmount, filteredAmountOthers,
  amounts, maxCols,
  expanded,
  ...props
}) => {
  if (Object.keys(fieldValues).length == null) {
    return <div className={'facet'} ><p>{' -no facets '}</p></div>
  }
  const alterTag = `${table}-${filterId}`
  const { alt, nextAlt } = makeAlt(props, { alterTag, nAlts: 2, initial: expanded ? 0 : 1 })
  return (
    <div className={'facet'} >
      <p className={'facet'} >
        <CheckboxI
          table={table}
          filterId={filterId}
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

const getInfo = combineSelectors(getFieldValues, getAlts)

export default connect(getInfo)(ByValue)
