import React from 'react'

import { emptyS } from 'utils'
import Expand from 'Expand'
import Tooltip from 'Tooltip'

export default ({ score }) => {
  const { overall, relevantScore, relevantMax, allMax, relevantN, allN, aId } = score
  const irrelevantN = allN - relevantN
  return (
    <div className={'ass-score-box'}>
      <Tooltip tip={'overall-score of this assessment'} at={'right'}>
        <span className={'ass-score'}>{`${overall} %`}</span>
      </Tooltip>
      <Expand
        alterSection={`assessment${aId}`}
        alterTag={'score'}
        iconOpen={'calculator'}
        iconClose={'minus-circle'}
        titleOpen={'Show derivation'}
        titleClose={'Hide derivation'}
        headActive={emptyS}
        headLine={emptyS}
        full={
          <div className={'ass-score-deriv'}>
            <p>{`This contribution scores ${relevantScore} points.`}</p>
            <p>{`For this type of contribution there is a total of
              ${allMax} points, divided over ${allN} criteria.`}</p>
            {irrelevantN ? (
              <p>
                {`However,
                        ${irrelevantN} rule${irrelevantN == 1 ? ' is' : 's are'}
                        not applicable to this contribution,
                        which leaves the total amount to
                        ${relevantMax} points,
                        divided over ${relevantN} criteria.`}
              </p>
            ) : (
              emptyS
            )}
            <p>
              {`The total score is expressed as a percentage:
                    the fraction of ${relevantScore} scored points with respect to 
                    ${relevantMax} scorable points.`}
            </p>
          </div>
        }
      />
    </div>
  )
}
