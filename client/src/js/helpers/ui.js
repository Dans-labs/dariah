const subtract = 100;
const winHeight = window.innerHeight - subtract;

export function columnStyle(width, kind) {
  return {
    width: width,
    height: winHeight,
    overflow: 'auto',
    'WebkitOverflowScrolling': 'touch',
     float: kind || 'left',
    'paddingLeft': !kind ? '1em' : '0em',
    'paddingRight': !kind ? '1em' : '0em',
  }
}
