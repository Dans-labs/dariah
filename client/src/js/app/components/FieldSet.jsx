import { makeSubmitTime } from 'fields'

const FieldSet = ({
  widget,
  setValue,
  input: { onChange },
  submitValues,
}) => {
  const submitTime = makeSubmitTime(submitValues)
  const onChangeSave = () => {onChange(setValue); submitTime()}
  return widget(onChangeSave)
}

export default FieldSet
