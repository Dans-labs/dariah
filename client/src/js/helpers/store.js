/** @file
 *
 * # Local state versus Redux: compromise
 *
 * Up till now I eschew [Redux](https://github.com/reactjs/react-redux).
 * I prefer the vamilla react way, with small components
 * and small local state, instead of a centralized store for the state.
 * Using Redux requires a lot of extra code in actions and reducers,
 * that get separated from the components for which it is used.
 *
 * But local state has a pitfall: when a component is swapped out from the interface
 * (because of routing), its state is lost. So if you have applied a lot of filtersettings,
 * or have fetched a big table of data, and you switch to `/docs/about` and back,
 * a lot of ui-work and fetch-work must be done again, by you and the client and the server.
 * So, a global state outside the components is an attractive asset indeed!
 *
 * The compromise we make is:
 * * components can load and save state from/to a store when they mount/unmount
 *
 * That keeps the business logic closer to the component and we can keep the state
 * when components are temporarily wiped from the interface.
 */

/**
 * @class
 * @classdesc
 *
 * The **Store** is a helper class for components that want to save state
 * when they unmount, and load saved state when they mount.
 * It is basically a key-value store, where there components store
 * there state data under a specific key.
 *
 * **NB:** Do not use the Store directly.
 * Provide it to your {@link App} on context by means of the {@link withContext} enhancer, 
 * and enable its functionality by  means of the {@link saveState} enhancer in.
 *
 */
class Store {
  constructor() {
    this.data = new Map();
    this.component = new Map();
  }
   /** register a component to the store
   * @method
   * @arg {Component} component The component that wants to be registered
   * @arg {string} key Identifier under which the saved state for this component will reside in the store
   * @arg {object} initialState The initial state to use for a component
   *
   * A Component needs to register itself with a key and an initial state.
   * The Store is a map, and stores states under keys.
   * The key can be just any string. If your Component has multiple instances
   * that need a separate key, make sure that the instances use different keys.
   * After registering it will be initialized with a state that has been saved under
   * that key. If there is no previously save state, it will be initialized with
   * initialState. This is either a concrete object, or a function that computes an object
   * from props that are passed to it.
   * Typically, register() is called in the constructor method of Component.
   */
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
   /** save(key)
   * @method
   * @arg {string} key Key for the store
   *
   * A Component saves its state in the Store under key.
   * Typically, save() is called in the componentWillUnmount() method of Component.
   */
  save(key) {
    this.data.set(key, this.component.get(key).state)
  }
   /** get(key)
   * @method
   * @arg {string} key Key for the store
   *
   * Other parts of the program retrieve states from under a given key.
   * They can also modify the members inside that state.
   * Typically, get() is called to perform state updates for components that are not currently mounted.
   * As an example, you could use this to emit notifications before the Notification pseudo-element
   * is mounted.
   */
  get(key) {
    if (!this.data.has(key)) {
      this.data.set(key, {});
    }
    return this.data.get(key)
  }
}

export default Store
