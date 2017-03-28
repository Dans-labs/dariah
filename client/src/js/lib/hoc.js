import React, { PropTypes } from 'react'

export const withContext = ComponentInner => {
  const ComponentOuter = (props, context) => {
    const newProps = {...props, ...context.globals}
    return <ComponentInner {...newProps} />
  }
  ComponentOuter.displayName = `wc(${ComponentInner.displayName || ComponentInner.name || 'ComponentInner'})`
  ComponentOuter.contextTypes = {
    globals: PropTypes.object,
  }
  return ComponentOuter
}

const getTag = (tag, params) => (tag == null) ? ((params == null) ? null : params.tag) : tag

export const saveState = (ComponentInner, key, initialState) => {
  const ComponentOuter = class extends ComponentInner {
    setStateKey(tag) {
      this.stateKey = this.key + ((tag == null) ? '' : `.${tag}`)
    }
    stateLoad(isInit) {
      const {store, stateKey, initialState, props} = this
      store.load(this, stateKey, ((typeof initialState) == 'function') ? initialState(props) : initialState, isInit)
    }
    stateSave() {
      const {store, stateKey} = this
      store.save(this, stateKey)
    }
    constructor(props) {
      super(props)
      const { store, tag, params } = props
      this.store = store
      this.tag = getTag(tag, params)
      this.key = key
      this.initialState = initialState
      this.setStateKey(tag)
      this.stateLoad(true)
    }
    componentWillUnmount() {
      if (super.componentWillUnmount != null) {super.componentWillUnmount()}
      this.stateSave()
    }
    componentWillReceiveProps(newProps) {
      if (super.componentWillReceiveProps != null) {super.componentWillReceiveProps(newProps)}
      const { props: { tag: oldTag, params: oldParams } } = this
      const { tag, params } = newProps
      const realTag = getTag(tag, params)
      const oldRealTag = getTag(oldTag, oldParams)
      if (oldRealTag !== realTag) {
        this.stateSave()
        this.setStateKey(realTag)
        this.stateLoad(false)
      }
    }
  }
  ComponentOuter.displayName = `ss(${ComponentInner.displayName || ComponentInner.name || 'ComponentInner'})`
  return ComponentOuter
}
