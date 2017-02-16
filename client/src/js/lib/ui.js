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
const scrollBarWidth = 40;
const leftMargin = 10;

/**
 * top navigation bar height and remaining height
 */
const topHeight = 30;
const topMargin = 0;

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
  rightLeftNav: 150,
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
  rightRight: window.innerWidth - divWidthSpec.left - divWidthSpec.rightLeft - scrollBarWidth - leftMargin,
  rightRightBody: window.innerWidth - divWidthSpec.left - divWidthSpec.rightLeftNav - scrollBarWidth - leftMargin,
}
const divHeight = {
  left: winHeight - topHeight,
  right: winHeight - topHeight,
  rightLeft: winHeight - topHeight - topMargin,
  rightLeftNav: winHeight - topHeight - topMargin,
  rightRight: winHeight - topHeight - topMargin,
  rightRightBody: winHeight - topHeight - topMargin,
}

/**
 * we use the float property to position the leftish and rightish divs
 */
const floatSpec = {
  left: 'left',
  right: 'right',
  rightLeft: 'left',
  rightLeftNav: 'left',
  rightRight: 'right',
  rightRightBody: 'right',
}

/**
 * Sets the relevant box properties for a leftish or rightish div
 * @param {string} kind - The name of the div in question, must be a key in
 * {@link floatSpec} and {@link divWidth}.
 */
export function columnStyle(kind) {
  return {
    width: divWidth[kind],
    height: divHeight[kind],
    overflow: 'auto',
    'WebkitOverflowScrolling': 'touch',
    float: floatSpec[kind],
    padding: 0,
  }
}
