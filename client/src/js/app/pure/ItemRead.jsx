import React from 'react'

import FieldRead from 'FieldRead'

const ItemRead = ({ eId, fieldFragments }) => (
  <div>
    <div className={'grid fragments'}>{
      fieldFragments.map(({
        field, label,
        fragment: { table: detailTable, myValues },
      }) => (
        <div
          key={field}
          className={'grid-row form'}
        >
          <div className={'grid-head-cell label-col'}>{`${label}:`}</div>
          <div className={'grid-cell value-col'} >
            {
              <FieldRead
                field={field}
                table={detailTable}
                eId={eId}
                myValues={myValues}
              />
            }
          </div>
        </div>
      ))
    }
    </div>
  </div>
)

export default ItemRead
