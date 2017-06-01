import React from 'react'
import { connect } from 'react-redux'

import { memoize } from 'memo.js'
import { getFieldValues, placeFacets } from 'filters.js'

import Facet from 'Facet.jsx'
import CheckboxI from 'CheckboxI.jsx'
import Stat from 'Stat.jsx'
import Alternative from 'Alternative.jsx'

const controls = [
  handler => (<span className="button-small fa fa-chevron-down" onClick={handler} />),
  handler => (<span className="button-small fa fa-chevron-right" onClick={handler} />),
]
const controlPlacement = memoize((table, filterId, filterLabel, filteredAmount, filteredAmountOthers) => control => (
  <p className="facet" >
    <CheckboxI
      table={table}
      filterId={filterId}
    /> {filterLabel}{' '}
    <Stat subTotal={filteredAmount} total={filteredAmountOthers} />{' '}
    {control}
  </p>
))

const ByValue = ({
  table,
  filterId, filterLabel,
  fieldValues,
  filteredAmount, filteredAmountOthers,
  amounts, maxCols,
  expanded,
}) => {
  const rows = placeFacets(fieldValues, maxCols)
  return (
    <div className="facet" >{
      rows === null ? (<p>{' -no facets '}</p>) : (
        <Alternative
          tag={`${table}-${filterId}`}
          controlPlacement={controlPlacement(table, filterId, filterLabel, filteredAmount, filteredAmountOthers)}
          controls={controls}
          initial={expanded ? 0 : 1}
          alternatives={[
            (<table
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
            </table>),
            (<div key="div" />),
          ]}
        />
      )}
    </div>
  )
}

export default connect(getFieldValues)(ByValue)
