export default class Store {
  /* SAVING STATE
   * The Store is a helper class for components that want to save state
   * when they unmount, and load saved state when they mount.
   * It is basically a key-value store, where there components store
   * there state data under a specific key.
   *
   * register(Component, key, initialState)
   *
   * A Component needs to register itself with a key and an initial state.
   * The key can be just any string. If your Component has multiple instances
   * that need a separate key, make sure that the instances use different keys.
   * After registering it will be initialized with a state that has been saved under
   * that key. If there is no previously save state, it will be initialized with
   * initialState. This is either a concrete object, or a function that computes an object
   * from props that are passed to it.
   * Typically, register() is called in the constructor method of Component.
   *
   * save(key)
   *
   * A Component saves its state in the Store under key.
   * Typically, save() is called in the componentWillUnmount() method of Component.
   *
   * get(key)
   *
   * Other parts of the program retrieve states from under a given key.
   * They can also modify the members inside that state.
   * Typically, get() is called to perform state updates for components that are not currently mounted.
   * As an example, you could use this to emit notifications before the Notification pseudo-element
   * is mounted.
   *
   * NB: do not use the Store directly.
   * Provide it to your App on context by means of the withContext enhancer in hoc.js, 
   * and enable its functionality by  means of the saveState enhancer in hoc.js.
   */
  constructor() {
    this.data = new Map();
    this.component = new Map();
  }
  register(component, key, initialState) {
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
    this.data.set(key, this.component.get(key).state)
  }
  get(key) {
    if (!this.data.has(key)) {
      this.data.set(key, {});
    }
    return this.data.get(key)
  }
}

