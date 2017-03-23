import React from 'react'
import { lsClear } from 'localstorage.js'

/**
 * **purely functional** {@link external:Component|Component}
 *
 * ## Manage settings that have been stored in the browser's local storage
 *
 *
 *
 * @class
 * @returns {Fragment}
*/
const handle = () => {
  lsClear()
}

const LocalSettings = () => (
  <span
    className="button-small fa fa-eraser"
    title="forget my settings"
    onClick={handle}
  />
)

export default LocalSettings

