import { Component, PropTypes, Children } from 'react'
import { connect } from 'react-redux'
import throttle from 'lodash/throttle'
import { getWinDim, changeWinDim } from 'win.js'

class Window extends Component {
  render() {
    const { props: { children } } = this
    return Children.only(children)
  }
  newWindowSize = throttle(event => {
    const { props: { resize } } = this
    resize()
  }, 1000)

  componentDidMount() {
    window.addEventListener("resize", this.newWindowSize)
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.newWindowSize)
  }
}

export default connect(getWinDim, { resize: changeWinDim })(Window)
