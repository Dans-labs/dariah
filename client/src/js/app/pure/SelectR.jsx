import React from 'react'
import Select, { Creatable } from 'react-select'

import { editClass } from 'utils.js'

const SelectR = ({
  options,
  allowNew,
  multi,
  input: { value, onChange },
  meta: { dirty, invalid },
  handle,
  ...props
}) => (
  allowNew ? (
    <Creatable
      className={editClass(dirty, invalid)}
      options={options}
      value={value}
      multi={multi}
      autosize={true}
      {...props}
      onChange={handle(multi, onChange)}
    />
  ) : (
    <Select
      className={editClass(dirty, invalid)}
      options={options}
      value={value}
      multi={multi}
      autosize={true}
      {...props}
      onChange={handle(multi, onChange)}
    />
  )
)

export default SelectR
