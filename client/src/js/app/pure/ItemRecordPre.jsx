import React from 'react'

import ItemRecord from 'ItemRecord.jsx'

const ItemRecordPre = ({ params: { table, eId }, route: { ownOnly } }) => (
  <ItemRecord table={table} eId={eId} ownOnly={ownOnly} />
)

export default ItemRecordPre
