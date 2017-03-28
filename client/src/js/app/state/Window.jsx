import { Component, PropTypes, Children } from 'react'
import { connect } from 'react-redux'
import throttle from 'lodash/throttle'
import { winDim } from 'ui.js'

import Store from 'store.js'

class Window extends Component {
  constructor(props) {
    super(props)
    this.globals = {
      store: new Store(),
      notification: {component: null},
      relValuesMap: new Map(),
      editStatus: {},
    }
  }
  getChildContext() {
    const { globals } = this
    return { globals }
  }
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

Window.childContextTypes = {
  globals: PropTypes.object.isRequired,
}

const mapStateToProps = ( { win } ) => ({ win })

export default connect(mapStateToProps, { resize: winDim })(Window)
