import React, { Component, PropTypes, Children } from 'react'

const withContext = (ComponentIn) => {
  const ComponentWrapped = class extends Component {
    render() {
      const newProps = {...this.props, ...this.context.globals};
      return <ComponentIn {...newProps}/>
    }
  }
  ComponentWrapped.contextTypes = {
    globals: PropTypes.object,
  }
  return ComponentWrapped
}

export { withContext }

