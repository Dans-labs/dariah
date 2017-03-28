import React from 'react'
import { lsClear } from 'localstorage.js'

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

