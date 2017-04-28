import React from 'react'
import Select, { Creatable } from 'react-select'

import { editClass } from 'utils.js'

const SelectR = ({
  options,
  allowNew,
  valueList,
  multi,
  input: { value, onChange },
  meta: { dirty, invalid },
  handleUpd,
  ...props
}) => (
  allowNew ? (
    <Creatable
      className={editClass(dirty, invalid)}
      options={options}
      value={value}
      multi={multi}
      autosize={true}
      onChange={handleUpd(valueList, multi, onChange)}
      {...props}
    />
  ) : (
    <Select
      className={editClass(dirty, invalid)}
      options={options}
      value={value}
      multi={multi}
      autosize={true}
      {...props}
      onChange={handleUpd(valueList, multi, onChange)}
    />
  )
)

export default SelectR
