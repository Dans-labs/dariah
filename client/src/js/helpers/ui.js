/* User Interface Quirks
 *
 * We want to display the app on the available window real estate,
 * so we measure it.
 * We reserve space for navigation rows and columns and for scroll-bars.
 * The remaining space can be filled with the flesh and the meat: the data.
 */

// scrollbar width
const scrollBarWidth = 50;

// top navigation bar height and remaining height
const topHeight = 80;
const winHeight = window.innerHeight - topHeight;

// left navigation bar width and remaining width
const divWidthSpec = {
  left: 100,
  rightLeft: 400,
}
// the big right lower box can also be divided in a left bar for facets and the rest
const divWidth = {
  ...divWidthSpec,
  right: window.innerWidth - divWidthSpec.left - scrollBarWidth,
  rightRight: window.innerWidth - divWidthSpec.left - divWidthSpec.rightLeft - 2 * scrollBarWidth,
}
// we use the float property to position the left and right divs
const floatSpec = {
  left: 'left',
  right: 'right',
  rightLeft: 'left',
  rightRight: 'right',
}
/* columnStyle does it all: given an indication like 'left', 'rightLeft', ...
 * it sets the relevant box properties for the div in question
 */
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
