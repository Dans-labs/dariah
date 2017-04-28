import React from 'react'
import Select, { Creatable } from 'react-select'

import { editClass } from 'utils.js'
import { getTables, addOption } from 'tables.js' 

/*
      onChange={handleUpd(multi, onChange)}
      newOptionCreator={newOptionCreator}
*/

const newOptionCreator = ({ label, labelKey, valueKey }) => ({
  [labelKey]: label,
  [valueKey]: label,
  isNew: true,
})

const handleUpdate = (multi, onChange) => newVal => {
  const lastOption = multi ?
    ((newVal.length == 0) ? {} : newVal[newVal.length - 1]) :
    newVal
  const { isNew, label } = lastOption
  if (!isNew) {
    const cleanVal = multi ?
      newVal.map(x => x.value) :
      newVal.value
    onChange(cleanVal)
  }
  else {
    lastOption.isNew = false
  }
}

const SelectR = ({
  name,
  options,
  allowNew,
  valueList,
  multi,
  input: { value, onChange },
  meta: { dirty, invalid },
  ...props
}) => {
  return (
    allowNew ? (
      <Creatable
        className={editClass(dirty, invalid)}
        options={options}
        value={value}
        multi={multi}
        autosize={true}
        newOptionCreator={newOptionCreator}
        onChange={handleUpdate(multi, onChange)}
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
        onChange={handleUpdate(multi, onChange)}
      />
    )
  )
}

export default SelectR
