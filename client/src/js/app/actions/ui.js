export const getWinDim = () => {
  const { innerHeight: height, innerWidth: width } = window
  return { height, width }
}

export const winDim = () => dispatch => {
  dispatch({ type: 'windim', ...getWinDim() })
}
