import React from 'react'
import Facet from 'Facet.jsx'
import CheckboxI from 'CheckboxI.jsx'
import Stat from 'Stat.jsx'
import Alternative from 'Alternative.jsx'
import { placeFacets, testAllChecks } from 'filtering.js'

const ByValue = ({
  table,
  filterId, filterField, filterLabel,
  fieldValues, filterSettings,
  filteredAmount, filteredAmountOthers,
  amounts, maxCols, updFilter,
  expanded,
}) => {
  const rows = placeFacets(fieldValues, maxCols)
  const control1 = handler => (<span className="button-small fa fa-chevron-down" onClick={handler} />)
  const control2 = handler => (<span className="button-small fa fa-chevron-right" onClick={handler} />)
  const controlPlacement = control => (
    <p className="facet" >
      <CheckboxI
        filterId={filterId}
        states={testAllChecks(filterSettings)}
        updFilter={updFilter}
      /> {filterLabel}{' '}
      <Stat subTotal={filteredAmount} total={filteredAmountOthers} />{' '}
      {control}
    </p>
  )
  return (
    <div className="facet" >{
      rows === null ? (<p>{' -no facets '}</p>) : (
        <Alternative
          tag={`${table}_${filterField}`}
          controlPlacement={controlPlacement}
          controls={[control1, control2]}
          initial={expanded ? 0 : 1}
          alternatives={[
            (<table key="table" >
              <tbody>
                {rows.map((row, i) => (
                  <tr key={i} >
                    {row.map((f, j) => {
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
                            filterId={filterId}
                            valueId={valueId}
                            valueRep={valueRep}
                            checked={filterSettings.get(valueId)}
                            updFilter={updFilter}
                          />
                        </td>
                      ), (
                        <td
                          key="stat"
                          className="statistic"
                        >
                          <Stat subTotal={amounts.get(valueId)} />
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

export default ByValue
