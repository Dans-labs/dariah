import React from 'react'
import Stat from 'Stat.jsx'
import memoBind from 'memoBind.js'

class callBacks {
  onType = (filterId, updFilter) => event => updFilter(filterId, event.target.value)
}
const memo = new callBacks()

const FullText = ({
  filterId, filterField, filterLabel,
  filterSettings,
  filteredAmount, filteredAmountOthers,
  updFilter,
}) => (
  <div>
    <p title={`Search in ${filterField}`} >
      <input
        type="text"
        className="search"
        placeholder={`search in ${filterLabel}`}
        value={filterSettings}
        onChange={memoBind(memo, 'onType', [filterId], [updFilter])}
      />{' '}
      <Stat subTotal={filteredAmount} total={filteredAmountOthers} />
    </p>
  </div>
)

export default FullText
