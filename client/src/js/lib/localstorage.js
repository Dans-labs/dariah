export const lsClear = () => {localStorage.clear()}
export const lsHas = key => localStorage.getItem(key) != null
export const lsGet = key => {
  if (localStorage == null) {return null}
  const val = localStorage.getItem(key);
  return (val == null)?null:JSON.parse(val)
}
export const lsSet = (key, val) => {
  if (localStorage == null) {return}
  localStorage.setItem(key, JSON.stringify(val))
}
