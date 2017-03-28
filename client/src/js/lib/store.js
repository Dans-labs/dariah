class Store {
  constructor() {
    this.data = new Map()
  }
  load(component, key, initialState, isInit) {
    if (this.data.has(key)) {
      if (isInit) {
        component.state = this.data.get(key)
      }
      else {
        component.setState(this.data.get(key))
      }
    }
    else {
      if (isInit) {
        component.state = initialState
      }
      else {
        component.setState(initialState)
      }
    }
  }
  save(component, key) {
    this.data.set(key, component.state)
  }
  get(key) {
    if (!this.data.has(key)) {
      this.data.set(key, {})
    }
    return this.data.get(key)
  }
}

export default Store
