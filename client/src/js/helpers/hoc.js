import React, { Component, PropTypes, Children } from 'react'

const withContext = (ComponentInner) => {
  const ComponentOuter = class extends Component {
    render() {
      const newProps = {...this.props, ...this.context.globals};
      return <ComponentInner {...newProps}/>
    }
  }
  ComponentOuter.contextTypes = {
    globals: PropTypes.object,
  }
  return ComponentOuter
}

const saveState = (ComponentInner, key, initialState) => {
  const ComponentOuter = class extends ComponentInner {
    constructor(props) {
      super(props);
      const store = props.store;
      this.key = key;
      store.register(this, key, ((typeof initialState) == 'function')?initialState(props):initialState)
    }
    componentWillUnmount() {
      const store = this.props.store
      store.save(this.key);
    }
  }
  return ComponentOuter
}

export { withContext, saveState }

