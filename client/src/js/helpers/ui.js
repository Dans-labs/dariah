/**
 * ## User Interface
 *
 * This is a collection of methods that directly
 * address the user interface aspects of the web page.
 *
 * <img src="/api/file/tech/docs/design/design.005.jpeg" width="800"/>
 *
 * @module ui
 */

/**
 *  scrollbar width
 */
const scrollBarWidth = 50;

/**
 * top navigation bar height and remaining height
 */
const topHeight = 80;

/**
 * remaining height under the top navigation bar
 */
const winHeight = window.innerHeight - topHeight;

/**
 * outer left navigation bar width
 * and inner left columm width 
 */
const divWidthSpec = {
  left: 120,
  rightLeft: 380,
}

/**
 * the widths of the main portions on the screen:
 *
 * * `left`: outer left navigation bar
 * * `right`: everything else
 * * `rightLeft`: left column inside `right` 
 * * `rightRight`: right column inside `right` 
 */
const divWidth = {
  ...divWidthSpec,
  right: window.innerWidth - divWidthSpec.left - scrollBarWidth,
  rightRight: window.innerWidth - divWidthSpec.left - divWidthSpec.rightLeft - 2 * scrollBarWidth,
}
/**
 * we use the float property to position the leftish and rightish divs
 */
const floatSpec = {
  left: 'left',
  right: 'right',
  rightLeft: 'left',
  rightRight: 'right',
}

/**
 * Sets the relevant box properties for a leftish or rightish div
 * @param {string} kind - The name of the div in question, must be a key in
 * {@link floatSpec} and {@link divWidth}.
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
