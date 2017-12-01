import { makeSubmitTime, makeChangeSaveVal } from 'edit'

export default ({
  widget,
  input: { onChange },
  setValue,
  submitValues,
}) => {
  const submitTime = makeSubmitTime(submitValues)
  //const onChangeSave = () => {onChange(setValue); submitTime()}
  const onChangeSave = makeChangeSaveVal(onChange, submitTime, setValue)
  return widget(onChangeSave)
}
