/**
 * ES6 Documentation references.
 *
 * This file does not contain javascript code.
 *
 * @module ES6
 */

/**
 * ES6 datastructure to contain key-value pairs.
 * One could also use plain objects for this, but Maps are cleaner in a number of respects.
 *
 * @external Map
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map|Map}
 */

/**
 * @global
 * @typedef Map
 * @type {external:Map}
 */

/**
 * ES6 datastructure to contain the result of an asynchronous function.
 * It has as state that is either *pending*, *failed* or *resolved*. 
 * Once the state is *failed* or *resolved*, it will not change anymore.
 * If the state is *resolved*, the return value is available, and will not change anymore.
 * The typical way to use a promise is
 *
 * ```
 *   const dataStore = {};
 *   const getData = url => fetch(url); 
 *   // assuming that fetch returns a Promise, we can then say
 *   getData('/api/blob/23').
 *   then(
 *     blob => {dataStore.url = blob},
 *     error => console.error(error),
 *   )
 * ```
 * See e.g. {@link module:data.getData|getData()}
 *
 * @external Promise
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise|Promise}
 */

/**
 * @global
 * @typedef Promise
 * @type {external:Promise}
 */

/**
 * The internal representation of the html page rendered in the browser, is called the DOM
 * (Document object model). It is a tree that reflects the tree of the HTML elements.
 * To this tree, a lot of data and methods are attached, such as styles, events, custom date.
 * The DOM is an expensive object to create and to update.
 *
 * React can be seen as a library to manage complex DOM manipulations in a performant way.
 * See {@link external:Reconciliation|Reconciliation}.
 *
 * @external DOM
 */

/**
 * @global
 * @typedef DOM
 * @type {external:DOM}
 */
