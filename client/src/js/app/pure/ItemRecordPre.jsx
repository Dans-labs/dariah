import React from 'react'

import ItemRecord from 'ItemRecord.jsx'

const ItemRecordPre = ({ params: { tag, recordId }, route: { ownOnly } }) => (
  <ItemRecord tag={`${tag}_${recordId}`} table={tag} recordId={recordId} ownOnly={ownOnly} />
)

export default ItemRecordPre
