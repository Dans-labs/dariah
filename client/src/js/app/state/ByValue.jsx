import React from 'react'
import { connect } from 'react-redux'

import { combineSelectors } from 'utils'
import { getFieldValues, placeFacets } from 'filters'
import { getAlts, makeAlt } from 'alter'

import Facet from 'Facet'
import CheckboxI from 'CheckboxI'
import Stat from 'Stat'

const ByValue = ({
  table,
  filterId, filterLabel,
  fieldValues,
  filteredAmount, filteredAmountOthers,
  amounts, maxCols,
  expanded,
  ...props
}) => {
  const rows = placeFacets(fieldValues, maxCols)
  if (rows == null) {
    return <div className="facet" ><p>{' -no facets '}</p></div>
  }
  const tag = `${table}-${filterId}`
  const { alt, nextAlt } = makeAlt(props, { tag, nAlts: 2, initial: expanded ? 0 : 1 })
  return (
    <div className="facet" >
      <p className="facet" >
        <CheckboxI
          table={table}
          filterId={filterId}
        /> {filterLabel}{' '}
        <Stat subTotal={filteredAmount} total={filteredAmountOthers} />{' '}
        <span
          className={`button-small fa fa-angle-${alt == 0 ? 'up' : 'down'}`}
          onClick={nextAlt}
        />
      </p>
      {
        alt == 0 ?
          <table
            key="table"
            className="facets"
          >
            <tbody>
              {rows.map((entity, i) => (
                <tr key={i} >
                  {entity.map((f, j) => {
                    if (f === null) {
                      return <td key={j} />
                    }
                    const [valueId, valueRep] = f
                    const facetClass = j == 0 ? 'facet' : 'facet mid'
                    return [(
                      <td
                       key={valueId}
                       className={facetClass}
                      >
                        <Facet
                          table={table}
                          filterId={filterId}
                          valueId={valueId}
                          valueRep={valueRep}
                        />
                      </td>
                    ), (
                      <td
                        key="stat"
                        className="statistic"
                      >
                        <Stat subTotal={amounts[valueId]} />
                      </td>
                    )]
                  })}
                </tr>
                ))}
            </tbody>
          </table> :
          <div />
      }
    </div>
  )
}

const getInfo = combineSelectors(getFieldValues, getAlts)

export default connect(getInfo)(ByValue)
