export default class Store {
  constructor() {
    this.data = new Map();
    this.component = new Map();
  }
  register(component, key, initialState) {
    /* call this in the constructor of a component whose state must be saved after destruction
     */
    if (!this.component.has(key)) {
      this.component.set(key, component);
    }
    if (this.data.has(key)) {
      component.state = this.data.get(key)
    }
    else {
      component.state = initialState;
    }
  }
  save(key) {
    /* call this in the componentWillUnmount of a component
     */
    this.data.set(key, this.component.get(key).state)
  }
  get(key) {
    /* call this ti get the saved state of a component that is not live at the moment
     * This saved state can be modified, and the modifications will make it to the initial state
     * when the component is revived.
     * Example: you can add notifications to the notification object, even if it is not mounted yet.
     */
    if (!this.data.has(key)) {
      this.data.set(key, {});
    }
    return this.data.get(key)
  }
}
