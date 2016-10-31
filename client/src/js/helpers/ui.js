const topHeight = 80;
const winHeight = window.innerHeight - topHeight;

const divWidthSpec = {
  left: 100,
  rightLeft: 400,
}
const divWidth = {
  ...divWidthSpec,
  right: window.innerWidth - divWidthSpec.left - 50,
  rightRight: window.innerWidth - divWidthSpec.left - 50 - divWidthSpec.rightLeft - 50,
}
const floatSpec = {
  left: 'left',
  right: 'right',
  rightLeft: 'left',
  rightRight: 'right',
}

export function columnStyle(kind) {
  return {
    width: divWidth[kind],
    height: winHeight,
    overflow: 'auto',
    'WebkitOverflowScrolling': 'touch',
    float: floatSpec[kind],
    'paddingLeft': !kind ? '1em' : '0em',
    'paddingRight': !kind ? '1em' : '0em',
  }
}
