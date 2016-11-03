/**
 * @class
 * @classdesc
 *
 * ## Backup for State
 * The Store is a
 * {@link external:Map|Map}
 * containing saved
 * {@link external:Component|component}
 * states as values paired to keys.
 * The workflow is
 * * a component presents itself and a key to the store
 *   and loads data found in the store under that key;
 * * it saves its state to the store under that key when it unmounts;
 * * when it remounts, it loads again;
 * * other components can also inspect and even manipulate saved states, if they
 *   know the key.
 *
 * ## Usage
 * Do not use the Store directly.
 * Provide it to your component on context by means of the {@link withContext} enhancer, 
 * and enable its functionality by  means of the {@link saveState} enhancer.
 *
 * ## Motivation
 * See
 * {@link external:StatePolicy|State Policy}
 */
class Store {
  constructor() {
    this.data = new Map();
  }
/** 
 * A component loads data from the store, from under a key.
 * The key can be just any string. If component has multiple instances
 * that need a separate key, make sure that the instances use different keys.
 * If there is not yet data there, the components loads an initial state.
 * This can be passed either as a concrete object,
 * or as a function that computes an object from props.
 *
 * This method is typically called in the
 * {@link external:constructor|constructor()}
 * of component.
 *
 * @method
 * @param {Component} component - The component that wants to load state
 * @param {string} key - Identifier under which the saved state is stored
 * @param {Object} initialState - The initial state to use for a component
 */
  load(component, key, initialState) {
    if (this.data.has(key)) {
      component.state = this.data.get(key)
    }
    else {
      component.state = initialState;
    }
  }
/**
 * A Component saves its state in the store under key.
 * Typically, save() is called in the
 * {@link external:componentWillUnmount|componentWillUnmount()}
 * of component.
 *
 * @method
 * @param {Component} component - The component that wants to save state
 * @param {string} key - Identifier under which the saved state is stored
 */
  save(component, key) {
    this.data.set(key, component.state)
  }
/** get(key)
 * Retrieve state from under a given key without loading it into a component state.
 * 
 * **NB**: whoever has retrieved a saved state, can modify its inner parts,
 * so that the owner component of this state will feel the changes when it loads them. 
 * As an example, you could use this to emit notifications before the {@link Notification}
 * component mounted.
 *
 * @method
 * @param {string} key - Identifier under which the saved state is stored
 */
  get(key) {
    if (!this.data.has(key)) {
      this.data.set(key, {});
    }
    return this.data.get(key)
  }
}

export default Store
