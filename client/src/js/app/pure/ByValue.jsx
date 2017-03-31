import React from 'react'
import { connect } from 'react-redux'
import Facet from 'Facet.jsx'
import CheckboxI from 'CheckboxI.jsx'
import Stat from 'Stat.jsx'
import Alternative from 'Alternative.jsx'
import { getFieldValues, placeFacets } from 'filter.js'

const ByValue = ({
  table,
  filterId, filterField, filterLabel,
  fieldValues,
  filteredAmount, filteredAmountOthers,
  amounts, maxCols, 
  expanded,
}) => {
  const rows = placeFacets(fieldValues, maxCols)
  const control1 = handler => (<span className="button-small fa fa-chevron-down" onClick={handler} />)
  const control2 = handler => (<span className="button-small fa fa-chevron-right" onClick={handler} />)
  const controlPlacement = control => (
    <p className="facet" >
      <CheckboxI
        table={table}
        filterId={filterId}
      /> {filterLabel}{' '}
      <Stat subTotal={filteredAmount} total={filteredAmountOthers} />{' '}
      {control}
    </p>
  )
  return (
    <div className="facet" >{
      rows === null ? (<p>{' -no facets '}</p>) : (
        <Alternative
          tag={`${table}_${filterId}`}
          controlPlacement={controlPlacement}
          controls={[control1, control2]}
          initial={expanded ? 0 : 1}
          alternatives={[
            (<table key="table" >
              <tbody>
                {rows.map((entity, i) => (
                  <tr key={i} >
                    {entity.map((f, j) => {
                      if (f === null) {
                        return <td key={j} />
                      }
                      const [valueId, valueRep] = f
                      const facetClass = (j == 0) ? "facet" : "facet mid"
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
