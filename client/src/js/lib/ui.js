/**
 * ## User Interface
 *
 * This is a collection of methods that directly
 * address the user interface aspects of the web page.
 *
 * <img src="/api/file/tech/docs/design/design.005.jpeg" width="800" />
 *
 * @module ui
 */

/**
 *  scrollbar width
 */
const scrollBarWidth = 40
const leftMargin = 0

/**
 * top navigation bar height and remaining height
 */
const topHeight = 50
const topMargin = 5

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
export function columnStyle(kind, { width, height }) {
  /**
   * remaining height under the top navigation bar
   */
  const divHeight = {
    left: height - topHeight,
    right: height - topHeight,
    rightLeft: height - topHeight - topMargin,
    rightLeftNav: height - topHeight - topMargin,
    rightRight: height - topHeight - topMargin,
    rightRightBody: height - topHeight - topMargin,
  }
  /**
   * the widths of the main portions on the screen:
   *
   * * `left`: outer left navigation bar
   * * `right`: everything else
   * * `rightLeft`: left column inside `right`
   * * `rightRight`: right column inside `right`
   */
  const { left, rightLeft, rightLeftNav } = divWidthSpec
  const divWidth = {
    ...divWidthSpec,
    right: width - left - scrollBarWidth,
    rightRight: width - left - rightLeft - 2 * scrollBarWidth - leftMargin,
    rightRightBody: width - left - rightLeftNav - 2 * scrollBarWidth - leftMargin,
  }

  return {
    width: divWidth[kind],
    height: divHeight[kind],
    float: floatSpec[kind],
  }
}
