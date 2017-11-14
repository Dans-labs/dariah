import { makeSubmitTime } from 'fields'

export default ({
  widget,
  setValue,
  input: { onChange },
  submitValues,
}) => {
  const submitTime = makeSubmitTime(submitValues)
  const onChangeSave = () => {onChange(setValue); submitTime()}
  return widget(onChangeSave)
}
