import { Component, Children } from 'react'
import { connect } from 'react-redux'
import throttle from 'lodash/throttle'

import { changeWinDim } from 'win'

class Window extends Component {
  render() {
    const { props: { children } } = this
    return Children.only(children)
  }
  newWindowSize = throttle(() => {
    const { props: { resize } } = this
    resize()
  }, 1000)

  componentDidMount() {window.addEventListener("resize", this.newWindowSize)}
  componentWillUnmount() {window.removeEventListener("resize", this.newWindowSize)}
}

export default connect(null, { resize: changeWinDim })(Window)
