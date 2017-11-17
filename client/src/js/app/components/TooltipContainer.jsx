import React, { Component } from 'react'

import ReactHintFactory from 'react-hint'
const ReactHint = ReactHintFactory(React)

import { emptyO } from 'utils'

class TooltipContainer extends Component {
  handleTip = () => {
    const { props: { showTip } } = this
    return showTip()
  }
  render() {
    const { props: { att, refresh, showTip } } = this
    const customRender = showTip
    ? { onRenderContent: this.handleTip }
    : emptyO
    return (
      <ReactHint
        attribute={att}
        persist={true}
        events={true}
        refresh={refresh}
        {...customRender}
      />
    )
  }
}

export default TooltipContainer
