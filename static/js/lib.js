require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
var emptyFunction = function emptyFunction() {};

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

module.exports = emptyFunction;
},{}],2:[function(require,module,exports){
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

'use strict';

var emptyObject = {};

if ("development" !== 'production') {
  Object.freeze(emptyObject);
}

module.exports = emptyObject;
},{}],3:[function(require,module,exports){
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

'use strict';

/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var validateFormat = function validateFormat(format) {};

if ("development" !== 'production') {
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

module.exports = invariant;
},{}],4:[function(require,module,exports){
/**
 * Copyright 2014-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

'use strict';

var emptyFunction = require('./emptyFunction');

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = emptyFunction;

if ("development" !== 'production') {
  (function () {
    var printWarning = function printWarning(format) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      var argIndex = 0;
      var message = 'Warning: ' + format.replace(/%s/g, function () {
        return args[argIndex++];
      });
      if (typeof console !== 'undefined') {
        console.error(message);
      }
      try {
        // --- Welcome to debugging React ---
        // This error was thrown as a convenience so that you can use this stack
        // to find the callsite that caused this warning to fire.
        throw new Error(message);
      } catch (x) {}
    };

    warning = function warning(condition, format) {
      if (format === undefined) {
        throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
      }

      if (format.indexOf('Failed Composite propType: ') === 0) {
        return; // Ignore CompositeComponent proptype check.
      }

      if (!condition) {
        for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
          args[_key2 - 2] = arguments[_key2];
        }

        printWarning.apply(undefined, [format].concat(args));
      }
    };
  })();
}

module.exports = warning;
},{"./emptyFunction":1}],5:[function(require,module,exports){
'use strict';
/* eslint-disable no-unused-vars */
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (e) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (Object.getOwnPropertySymbols) {
			symbols = Object.getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};

},{}],6:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],7:[function(require,module,exports){
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

'use strict';

/**
 * Escape and wrap key so it is safe to use as a reactid
 *
 * @param {string} key to be escaped.
 * @return {string} the escaped key.
 */

function escape(key) {
  var escapeRegex = /[=:]/g;
  var escaperLookup = {
    '=': '=0',
    ':': '=2'
  };
  var escapedString = ('' + key).replace(escapeRegex, function (match) {
    return escaperLookup[match];
  });

  return '$' + escapedString;
}

/**
 * Unescape and unwrap key for human-readable display
 *
 * @param {string} key to unescape.
 * @return {string} the unescaped key.
 */
function unescape(key) {
  var unescapeRegex = /(=0|=2)/g;
  var unescaperLookup = {
    '=0': '=',
    '=2': ':'
  };
  var keySubstring = key[0] === '.' && key[1] === '$' ? key.substring(2) : key.substring(1);

  return ('' + keySubstring).replace(unescapeRegex, function (match) {
    return unescaperLookup[match];
  });
}

var KeyEscapeUtils = {
  escape: escape,
  unescape: unescape
};

module.exports = KeyEscapeUtils;
},{}],8:[function(require,module,exports){
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

'use strict';

var _prodInvariant = require('./reactProdInvariant');

var invariant = require('fbjs/lib/invariant');

/**
 * Static poolers. Several custom versions for each potential number of
 * arguments. A completely generic pooler is easy to implement, but would
 * require accessing the `arguments` object. In each of these, `this` refers to
 * the Class itself, not an instance. If any others are needed, simply add them
 * here, or in their own files.
 */
var oneArgumentPooler = function (copyFieldsFrom) {
  var Klass = this;
  if (Klass.instancePool.length) {
    var instance = Klass.instancePool.pop();
    Klass.call(instance, copyFieldsFrom);
    return instance;
  } else {
    return new Klass(copyFieldsFrom);
  }
};

var twoArgumentPooler = function (a1, a2) {
  var Klass = this;
  if (Klass.instancePool.length) {
    var instance = Klass.instancePool.pop();
    Klass.call(instance, a1, a2);
    return instance;
  } else {
    return new Klass(a1, a2);
  }
};

var threeArgumentPooler = function (a1, a2, a3) {
  var Klass = this;
  if (Klass.instancePool.length) {
    var instance = Klass.instancePool.pop();
    Klass.call(instance, a1, a2, a3);
    return instance;
  } else {
    return new Klass(a1, a2, a3);
  }
};

var fourArgumentPooler = function (a1, a2, a3, a4) {
  var Klass = this;
  if (Klass.instancePool.length) {
    var instance = Klass.instancePool.pop();
    Klass.call(instance, a1, a2, a3, a4);
    return instance;
  } else {
    return new Klass(a1, a2, a3, a4);
  }
};

var standardReleaser = function (instance) {
  var Klass = this;
  !(instance instanceof Klass) ? "development" !== 'production' ? invariant(false, 'Trying to release an instance into a pool of a different type.') : _prodInvariant('25') : void 0;
  instance.destructor();
  if (Klass.instancePool.length < Klass.poolSize) {
    Klass.instancePool.push(instance);
  }
};

var DEFAULT_POOL_SIZE = 10;
var DEFAULT_POOLER = oneArgumentPooler;

/**
 * Augments `CopyConstructor` to be a poolable class, augmenting only the class
 * itself (statically) not adding any prototypical fields. Any CopyConstructor
 * you give this may have a `poolSize` property, and will look for a
 * prototypical `destructor` on instances.
 *
 * @param {Function} CopyConstructor Constructor that can be used to reset.
 * @param {Function} pooler Customizable pooler.
 */
var addPoolingTo = function (CopyConstructor, pooler) {
  // Casting as any so that flow ignores the actual implementation and trusts
  // it to match the type we declared
  var NewKlass = CopyConstructor;
  NewKlass.instancePool = [];
  NewKlass.getPooled = pooler || DEFAULT_POOLER;
  if (!NewKlass.poolSize) {
    NewKlass.poolSize = DEFAULT_POOL_SIZE;
  }
  NewKlass.release = standardReleaser;
  return NewKlass;
};

var PooledClass = {
  addPoolingTo: addPoolingTo,
  oneArgumentPooler: oneArgumentPooler,
  twoArgumentPooler: twoArgumentPooler,
  threeArgumentPooler: threeArgumentPooler,
  fourArgumentPooler: fourArgumentPooler
};

module.exports = PooledClass;
},{"./reactProdInvariant":29,"fbjs/lib/invariant":3}],9:[function(require,module,exports){
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

'use strict';

var _assign = require('object-assign');

var ReactChildren = require('./ReactChildren');
var ReactComponent = require('./ReactComponent');
var ReactPureComponent = require('./ReactPureComponent');
var ReactClass = require('./ReactClass');
var ReactDOMFactories = require('./ReactDOMFactories');
var ReactElement = require('./ReactElement');
var ReactPropTypes = require('./ReactPropTypes');
var ReactVersion = require('./ReactVersion');

var onlyChild = require('./onlyChild');
var warning = require('fbjs/lib/warning');

var createElement = ReactElement.createElement;
var createFactory = ReactElement.createFactory;
var cloneElement = ReactElement.cloneElement;

if ("development" !== 'production') {
  var ReactElementValidator = require('./ReactElementValidator');
  createElement = ReactElementValidator.createElement;
  createFactory = ReactElementValidator.createFactory;
  cloneElement = ReactElementValidator.cloneElement;
}

var __spread = _assign;

if ("development" !== 'production') {
  var warned = false;
  __spread = function () {
    "development" !== 'production' ? warning(warned, 'React.__spread is deprecated and should not be used. Use ' + 'Object.assign directly or another helper function with similar ' + 'semantics. You may be seeing this warning due to your compiler. ' + 'See https://fb.me/react-spread-deprecation for more details.') : void 0;
    warned = true;
    return _assign.apply(null, arguments);
  };
}

var React = {

  // Modern

  Children: {
    map: ReactChildren.map,
    forEach: ReactChildren.forEach,
    count: ReactChildren.count,
    toArray: ReactChildren.toArray,
    only: onlyChild
  },

  Component: ReactComponent,
  PureComponent: ReactPureComponent,

  createElement: createElement,
  cloneElement: cloneElement,
  isValidElement: ReactElement.isValidElement,

  // Classic

  PropTypes: ReactPropTypes,
  createClass: ReactClass.createClass,
  createFactory: createFactory,
  createMixin: function (mixin) {
    // Currently a noop. Will be used to validate and trace mixins.
    return mixin;
  },

  // This looks DOM specific but these are actually isomorphic helpers
  // since they are just generating DOM strings.
  DOM: ReactDOMFactories,

  version: ReactVersion,

  // Deprecated hook for JSX spread, don't use this for anything.
  __spread: __spread
};

module.exports = React;
},{"./ReactChildren":10,"./ReactClass":11,"./ReactComponent":12,"./ReactDOMFactories":15,"./ReactElement":16,"./ReactElementValidator":18,"./ReactPropTypes":21,"./ReactPureComponent":23,"./ReactVersion":24,"./onlyChild":28,"fbjs/lib/warning":4,"object-assign":5}],10:[function(require,module,exports){
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

'use strict';

var PooledClass = require('./PooledClass');
var ReactElement = require('./ReactElement');

var emptyFunction = require('fbjs/lib/emptyFunction');
var traverseAllChildren = require('./traverseAllChildren');

var twoArgumentPooler = PooledClass.twoArgumentPooler;
var fourArgumentPooler = PooledClass.fourArgumentPooler;

var userProvidedKeyEscapeRegex = /\/+/g;
function escapeUserProvidedKey(text) {
  return ('' + text).replace(userProvidedKeyEscapeRegex, '$&/');
}

/**
 * PooledClass representing the bookkeeping associated with performing a child
 * traversal. Allows avoiding binding callbacks.
 *
 * @constructor ForEachBookKeeping
 * @param {!function} forEachFunction Function to perform traversal with.
 * @param {?*} forEachContext Context to perform context with.
 */
function ForEachBookKeeping(forEachFunction, forEachContext) {
  this.func = forEachFunction;
  this.context = forEachContext;
  this.count = 0;
}
ForEachBookKeeping.prototype.destructor = function () {
  this.func = null;
  this.context = null;
  this.count = 0;
};
PooledClass.addPoolingTo(ForEachBookKeeping, twoArgumentPooler);

function forEachSingleChild(bookKeeping, child, name) {
  var func = bookKeeping.func,
      context = bookKeeping.context;

  func.call(context, child, bookKeeping.count++);
}

/**
 * Iterates through children that are typically specified as `props.children`.
 *
 * See https://facebook.github.io/react/docs/top-level-api.html#react.children.foreach
 *
 * The provided forEachFunc(child, index) will be called for each
 * leaf child.
 *
 * @param {?*} children Children tree container.
 * @param {function(*, int)} forEachFunc
 * @param {*} forEachContext Context for forEachContext.
 */
function forEachChildren(children, forEachFunc, forEachContext) {
  if (children == null) {
    return children;
  }
  var traverseContext = ForEachBookKeeping.getPooled(forEachFunc, forEachContext);
  traverseAllChildren(children, forEachSingleChild, traverseContext);
  ForEachBookKeeping.release(traverseContext);
}

/**
 * PooledClass representing the bookkeeping associated with performing a child
 * mapping. Allows avoiding binding callbacks.
 *
 * @constructor MapBookKeeping
 * @param {!*} mapResult Object containing the ordered map of results.
 * @param {!function} mapFunction Function to perform mapping with.
 * @param {?*} mapContext Context to perform mapping with.
 */
function MapBookKeeping(mapResult, keyPrefix, mapFunction, mapContext) {
  this.result = mapResult;
  this.keyPrefix = keyPrefix;
  this.func = mapFunction;
  this.context = mapContext;
  this.count = 0;
}
MapBookKeeping.prototype.destructor = function () {
  this.result = null;
  this.keyPrefix = null;
  this.func = null;
  this.context = null;
  this.count = 0;
};
PooledClass.addPoolingTo(MapBookKeeping, fourArgumentPooler);

function mapSingleChildIntoContext(bookKeeping, child, childKey) {
  var result = bookKeeping.result,
      keyPrefix = bookKeeping.keyPrefix,
      func = bookKeeping.func,
      context = bookKeeping.context;


  var mappedChild = func.call(context, child, bookKeeping.count++);
  if (Array.isArray(mappedChild)) {
    mapIntoWithKeyPrefixInternal(mappedChild, result, childKey, emptyFunction.thatReturnsArgument);
  } else if (mappedChild != null) {
    if (ReactElement.isValidElement(mappedChild)) {
      mappedChild = ReactElement.cloneAndReplaceKey(mappedChild,
      // Keep both the (mapped) and old keys if they differ, just as
      // traverseAllChildren used to do for objects as children
      keyPrefix + (mappedChild.key && (!child || child.key !== mappedChild.key) ? escapeUserProvidedKey(mappedChild.key) + '/' : '') + childKey);
    }
    result.push(mappedChild);
  }
}

function mapIntoWithKeyPrefixInternal(children, array, prefix, func, context) {
  var escapedPrefix = '';
  if (prefix != null) {
    escapedPrefix = escapeUserProvidedKey(prefix) + '/';
  }
  var traverseContext = MapBookKeeping.getPooled(array, escapedPrefix, func, context);
  traverseAllChildren(children, mapSingleChildIntoContext, traverseContext);
  MapBookKeeping.release(traverseContext);
}

/**
 * Maps children that are typically specified as `props.children`.
 *
 * See https://facebook.github.io/react/docs/top-level-api.html#react.children.map
 *
 * The provided mapFunction(child, key, index) will be called for each
 * leaf child.
 *
 * @param {?*} children Children tree container.
 * @param {function(*, int)} func The map function.
 * @param {*} context Context for mapFunction.
 * @return {object} Object containing the ordered map of results.
 */
function mapChildren(children, func, context) {
  if (children == null) {
    return children;
  }
  var result = [];
  mapIntoWithKeyPrefixInternal(children, result, null, func, context);
  return result;
}

function forEachSingleChildDummy(traverseContext, child, name) {
  return null;
}

/**
 * Count the number of children that are typically specified as
 * `props.children`.
 *
 * See https://facebook.github.io/react/docs/top-level-api.html#react.children.count
 *
 * @param {?*} children Children tree container.
 * @return {number} The number of children.
 */
function countChildren(children, context) {
  return traverseAllChildren(children, forEachSingleChildDummy, null);
}

/**
 * Flatten a children object (typically specified as `props.children`) and
 * return an array with appropriately re-keyed children.
 *
 * See https://facebook.github.io/react/docs/top-level-api.html#react.children.toarray
 */
function toArray(children) {
  var result = [];
  mapIntoWithKeyPrefixInternal(children, result, null, emptyFunction.thatReturnsArgument);
  return result;
}

var ReactChildren = {
  forEach: forEachChildren,
  map: mapChildren,
  mapIntoWithKeyPrefixInternal: mapIntoWithKeyPrefixInternal,
  count: countChildren,
  toArray: toArray
};

module.exports = ReactChildren;
},{"./PooledClass":8,"./ReactElement":16,"./traverseAllChildren":30,"fbjs/lib/emptyFunction":1}],11:[function(require,module,exports){
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

'use strict';

var _prodInvariant = require('./reactProdInvariant'),
    _assign = require('object-assign');

var ReactComponent = require('./ReactComponent');
var ReactElement = require('./ReactElement');
var ReactPropTypeLocationNames = require('./ReactPropTypeLocationNames');
var ReactNoopUpdateQueue = require('./ReactNoopUpdateQueue');

var emptyObject = require('fbjs/lib/emptyObject');
var invariant = require('fbjs/lib/invariant');
var warning = require('fbjs/lib/warning');

var MIXINS_KEY = 'mixins';

// Helper function to allow the creation of anonymous functions which do not
// have .name set to the name of the variable being assigned to.
function identity(fn) {
  return fn;
}

/**
 * Policies that describe methods in `ReactClassInterface`.
 */


var injectedMixins = [];

/**
 * Composite components are higher-level components that compose other composite
 * or host components.
 *
 * To create a new type of `ReactClass`, pass a specification of
 * your new class to `React.createClass`. The only requirement of your class
 * specification is that you implement a `render` method.
 *
 *   var MyComponent = React.createClass({
 *     render: function() {
 *       return <div>Hello World</div>;
 *     }
 *   });
 *
 * The class specification supports a specific protocol of methods that have
 * special meaning (e.g. `render`). See `ReactClassInterface` for
 * more the comprehensive protocol. Any other properties and methods in the
 * class specification will be available on the prototype.
 *
 * @interface ReactClassInterface
 * @internal
 */
var ReactClassInterface = {

  /**
   * An array of Mixin objects to include when defining your component.
   *
   * @type {array}
   * @optional
   */
  mixins: 'DEFINE_MANY',

  /**
   * An object containing properties and methods that should be defined on
   * the component's constructor instead of its prototype (static methods).
   *
   * @type {object}
   * @optional
   */
  statics: 'DEFINE_MANY',

  /**
   * Definition of prop types for this component.
   *
   * @type {object}
   * @optional
   */
  propTypes: 'DEFINE_MANY',

  /**
   * Definition of context types for this component.
   *
   * @type {object}
   * @optional
   */
  contextTypes: 'DEFINE_MANY',

  /**
   * Definition of context types this component sets for its children.
   *
   * @type {object}
   * @optional
   */
  childContextTypes: 'DEFINE_MANY',

  // ==== Definition methods ====

  /**
   * Invoked when the component is mounted. Values in the mapping will be set on
   * `this.props` if that prop is not specified (i.e. using an `in` check).
   *
   * This method is invoked before `getInitialState` and therefore cannot rely
   * on `this.state` or use `this.setState`.
   *
   * @return {object}
   * @optional
   */
  getDefaultProps: 'DEFINE_MANY_MERGED',

  /**
   * Invoked once before the component is mounted. The return value will be used
   * as the initial value of `this.state`.
   *
   *   getInitialState: function() {
   *     return {
   *       isOn: false,
   *       fooBaz: new BazFoo()
   *     }
   *   }
   *
   * @return {object}
   * @optional
   */
  getInitialState: 'DEFINE_MANY_MERGED',

  /**
   * @return {object}
   * @optional
   */
  getChildContext: 'DEFINE_MANY_MERGED',

  /**
   * Uses props from `this.props` and state from `this.state` to render the
   * structure of the component.
   *
   * No guarantees are made about when or how often this method is invoked, so
   * it must not have side effects.
   *
   *   render: function() {
   *     var name = this.props.name;
   *     return <div>Hello, {name}!</div>;
   *   }
   *
   * @return {ReactComponent}
   * @nosideeffects
   * @required
   */
  render: 'DEFINE_ONCE',

  // ==== Delegate methods ====

  /**
   * Invoked when the component is initially created and about to be mounted.
   * This may have side effects, but any external subscriptions or data created
   * by this method must be cleaned up in `componentWillUnmount`.
   *
   * @optional
   */
  componentWillMount: 'DEFINE_MANY',

  /**
   * Invoked when the component has been mounted and has a DOM representation.
   * However, there is no guarantee that the DOM node is in the document.
   *
   * Use this as an opportunity to operate on the DOM when the component has
   * been mounted (initialized and rendered) for the first time.
   *
   * @param {DOMElement} rootNode DOM element representing the component.
   * @optional
   */
  componentDidMount: 'DEFINE_MANY',

  /**
   * Invoked before the component receives new props.
   *
   * Use this as an opportunity to react to a prop transition by updating the
   * state using `this.setState`. Current props are accessed via `this.props`.
   *
   *   componentWillReceiveProps: function(nextProps, nextContext) {
   *     this.setState({
   *       likesIncreasing: nextProps.likeCount > this.props.likeCount
   *     });
   *   }
   *
   * NOTE: There is no equivalent `componentWillReceiveState`. An incoming prop
   * transition may cause a state change, but the opposite is not true. If you
   * need it, you are probably looking for `componentWillUpdate`.
   *
   * @param {object} nextProps
   * @optional
   */
  componentWillReceiveProps: 'DEFINE_MANY',

  /**
   * Invoked while deciding if the component should be updated as a result of
   * receiving new props, state and/or context.
   *
   * Use this as an opportunity to `return false` when you're certain that the
   * transition to the new props/state/context will not require a component
   * update.
   *
   *   shouldComponentUpdate: function(nextProps, nextState, nextContext) {
   *     return !equal(nextProps, this.props) ||
   *       !equal(nextState, this.state) ||
   *       !equal(nextContext, this.context);
   *   }
   *
   * @param {object} nextProps
   * @param {?object} nextState
   * @param {?object} nextContext
   * @return {boolean} True if the component should update.
   * @optional
   */
  shouldComponentUpdate: 'DEFINE_ONCE',

  /**
   * Invoked when the component is about to update due to a transition from
   * `this.props`, `this.state` and `this.context` to `nextProps`, `nextState`
   * and `nextContext`.
   *
   * Use this as an opportunity to perform preparation before an update occurs.
   *
   * NOTE: You **cannot** use `this.setState()` in this method.
   *
   * @param {object} nextProps
   * @param {?object} nextState
   * @param {?object} nextContext
   * @param {ReactReconcileTransaction} transaction
   * @optional
   */
  componentWillUpdate: 'DEFINE_MANY',

  /**
   * Invoked when the component's DOM representation has been updated.
   *
   * Use this as an opportunity to operate on the DOM when the component has
   * been updated.
   *
   * @param {object} prevProps
   * @param {?object} prevState
   * @param {?object} prevContext
   * @param {DOMElement} rootNode DOM element representing the component.
   * @optional
   */
  componentDidUpdate: 'DEFINE_MANY',

  /**
   * Invoked when the component is about to be removed from its parent and have
   * its DOM representation destroyed.
   *
   * Use this as an opportunity to deallocate any external resources.
   *
   * NOTE: There is no `componentDidUnmount` since your component will have been
   * destroyed by that point.
   *
   * @optional
   */
  componentWillUnmount: 'DEFINE_MANY',

  // ==== Advanced methods ====

  /**
   * Updates the component's currently mounted DOM representation.
   *
   * By default, this implements React's rendering and reconciliation algorithm.
   * Sophisticated clients may wish to override this.
   *
   * @param {ReactReconcileTransaction} transaction
   * @internal
   * @overridable
   */
  updateComponent: 'OVERRIDE_BASE'

};

/**
 * Mapping from class specification keys to special processing functions.
 *
 * Although these are declared like instance properties in the specification
 * when defining classes using `React.createClass`, they are actually static
 * and are accessible on the constructor instead of the prototype. Despite
 * being static, they must be defined outside of the "statics" key under
 * which all other static methods are defined.
 */
var RESERVED_SPEC_KEYS = {
  displayName: function (Constructor, displayName) {
    Constructor.displayName = displayName;
  },
  mixins: function (Constructor, mixins) {
    if (mixins) {
      for (var i = 0; i < mixins.length; i++) {
        mixSpecIntoComponent(Constructor, mixins[i]);
      }
    }
  },
  childContextTypes: function (Constructor, childContextTypes) {
    if ("development" !== 'production') {
      validateTypeDef(Constructor, childContextTypes, 'childContext');
    }
    Constructor.childContextTypes = _assign({}, Constructor.childContextTypes, childContextTypes);
  },
  contextTypes: function (Constructor, contextTypes) {
    if ("development" !== 'production') {
      validateTypeDef(Constructor, contextTypes, 'context');
    }
    Constructor.contextTypes = _assign({}, Constructor.contextTypes, contextTypes);
  },
  /**
   * Special case getDefaultProps which should move into statics but requires
   * automatic merging.
   */
  getDefaultProps: function (Constructor, getDefaultProps) {
    if (Constructor.getDefaultProps) {
      Constructor.getDefaultProps = createMergedResultFunction(Constructor.getDefaultProps, getDefaultProps);
    } else {
      Constructor.getDefaultProps = getDefaultProps;
    }
  },
  propTypes: function (Constructor, propTypes) {
    if ("development" !== 'production') {
      validateTypeDef(Constructor, propTypes, 'prop');
    }
    Constructor.propTypes = _assign({}, Constructor.propTypes, propTypes);
  },
  statics: function (Constructor, statics) {
    mixStaticSpecIntoComponent(Constructor, statics);
  },
  autobind: function () {} };

function validateTypeDef(Constructor, typeDef, location) {
  for (var propName in typeDef) {
    if (typeDef.hasOwnProperty(propName)) {
      // use a warning instead of an invariant so components
      // don't show up in prod but only in __DEV__
      "development" !== 'production' ? warning(typeof typeDef[propName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'React.PropTypes.', Constructor.displayName || 'ReactClass', ReactPropTypeLocationNames[location], propName) : void 0;
    }
  }
}

function validateMethodOverride(isAlreadyDefined, name) {
  var specPolicy = ReactClassInterface.hasOwnProperty(name) ? ReactClassInterface[name] : null;

  // Disallow overriding of base class methods unless explicitly allowed.
  if (ReactClassMixin.hasOwnProperty(name)) {
    !(specPolicy === 'OVERRIDE_BASE') ? "development" !== 'production' ? invariant(false, 'ReactClassInterface: You are attempting to override `%s` from your class specification. Ensure that your method names do not overlap with React methods.', name) : _prodInvariant('73', name) : void 0;
  }

  // Disallow defining methods more than once unless explicitly allowed.
  if (isAlreadyDefined) {
    !(specPolicy === 'DEFINE_MANY' || specPolicy === 'DEFINE_MANY_MERGED') ? "development" !== 'production' ? invariant(false, 'ReactClassInterface: You are attempting to define `%s` on your component more than once. This conflict may be due to a mixin.', name) : _prodInvariant('74', name) : void 0;
  }
}

/**
 * Mixin helper which handles policy validation and reserved
 * specification keys when building React classes.
 */
function mixSpecIntoComponent(Constructor, spec) {
  if (!spec) {
    if ("development" !== 'production') {
      var typeofSpec = typeof spec;
      var isMixinValid = typeofSpec === 'object' && spec !== null;

      "development" !== 'production' ? warning(isMixinValid, '%s: You\'re attempting to include a mixin that is either null ' + 'or not an object. Check the mixins included by the component, ' + 'as well as any mixins they include themselves. ' + 'Expected object but got %s.', Constructor.displayName || 'ReactClass', spec === null ? null : typeofSpec) : void 0;
    }

    return;
  }

  !(typeof spec !== 'function') ? "development" !== 'production' ? invariant(false, 'ReactClass: You\'re attempting to use a component class or function as a mixin. Instead, just use a regular object.') : _prodInvariant('75') : void 0;
  !!ReactElement.isValidElement(spec) ? "development" !== 'production' ? invariant(false, 'ReactClass: You\'re attempting to use a component as a mixin. Instead, just use a regular object.') : _prodInvariant('76') : void 0;

  var proto = Constructor.prototype;
  var autoBindPairs = proto.__reactAutoBindPairs;

  // By handling mixins before any other properties, we ensure the same
  // chaining order is applied to methods with DEFINE_MANY policy, whether
  // mixins are listed before or after these methods in the spec.
  if (spec.hasOwnProperty(MIXINS_KEY)) {
    RESERVED_SPEC_KEYS.mixins(Constructor, spec.mixins);
  }

  for (var name in spec) {
    if (!spec.hasOwnProperty(name)) {
      continue;
    }

    if (name === MIXINS_KEY) {
      // We have already handled mixins in a special case above.
      continue;
    }

    var property = spec[name];
    var isAlreadyDefined = proto.hasOwnProperty(name);
    validateMethodOverride(isAlreadyDefined, name);

    if (RESERVED_SPEC_KEYS.hasOwnProperty(name)) {
      RESERVED_SPEC_KEYS[name](Constructor, property);
    } else {
      // Setup methods on prototype:
      // The following member methods should not be automatically bound:
      // 1. Expected ReactClass methods (in the "interface").
      // 2. Overridden methods (that were mixed in).
      var isReactClassMethod = ReactClassInterface.hasOwnProperty(name);
      var isFunction = typeof property === 'function';
      var shouldAutoBind = isFunction && !isReactClassMethod && !isAlreadyDefined && spec.autobind !== false;

      if (shouldAutoBind) {
        autoBindPairs.push(name, property);
        proto[name] = property;
      } else {
        if (isAlreadyDefined) {
          var specPolicy = ReactClassInterface[name];

          // These cases should already be caught by validateMethodOverride.
          !(isReactClassMethod && (specPolicy === 'DEFINE_MANY_MERGED' || specPolicy === 'DEFINE_MANY')) ? "development" !== 'production' ? invariant(false, 'ReactClass: Unexpected spec policy %s for key %s when mixing in component specs.', specPolicy, name) : _prodInvariant('77', specPolicy, name) : void 0;

          // For methods which are defined more than once, call the existing
          // methods before calling the new property, merging if appropriate.
          if (specPolicy === 'DEFINE_MANY_MERGED') {
            proto[name] = createMergedResultFunction(proto[name], property);
          } else if (specPolicy === 'DEFINE_MANY') {
            proto[name] = createChainedFunction(proto[name], property);
          }
        } else {
          proto[name] = property;
          if ("development" !== 'production') {
            // Add verbose displayName to the function, which helps when looking
            // at profiling tools.
            if (typeof property === 'function' && spec.displayName) {
              proto[name].displayName = spec.displayName + '_' + name;
            }
          }
        }
      }
    }
  }
}

function mixStaticSpecIntoComponent(Constructor, statics) {
  if (!statics) {
    return;
  }
  for (var name in statics) {
    var property = statics[name];
    if (!statics.hasOwnProperty(name)) {
      continue;
    }

    var isReserved = name in RESERVED_SPEC_KEYS;
    !!isReserved ? "development" !== 'production' ? invariant(false, 'ReactClass: You are attempting to define a reserved property, `%s`, that shouldn\'t be on the "statics" key. Define it as an instance property instead; it will still be accessible on the constructor.', name) : _prodInvariant('78', name) : void 0;

    var isInherited = name in Constructor;
    !!isInherited ? "development" !== 'production' ? invariant(false, 'ReactClass: You are attempting to define `%s` on your component more than once. This conflict may be due to a mixin.', name) : _prodInvariant('79', name) : void 0;
    Constructor[name] = property;
  }
}

/**
 * Merge two objects, but throw if both contain the same key.
 *
 * @param {object} one The first object, which is mutated.
 * @param {object} two The second object
 * @return {object} one after it has been mutated to contain everything in two.
 */
function mergeIntoWithNoDuplicateKeys(one, two) {
  !(one && two && typeof one === 'object' && typeof two === 'object') ? "development" !== 'production' ? invariant(false, 'mergeIntoWithNoDuplicateKeys(): Cannot merge non-objects.') : _prodInvariant('80') : void 0;

  for (var key in two) {
    if (two.hasOwnProperty(key)) {
      !(one[key] === undefined) ? "development" !== 'production' ? invariant(false, 'mergeIntoWithNoDuplicateKeys(): Tried to merge two objects with the same key: `%s`. This conflict may be due to a mixin; in particular, this may be caused by two getInitialState() or getDefaultProps() methods returning objects with clashing keys.', key) : _prodInvariant('81', key) : void 0;
      one[key] = two[key];
    }
  }
  return one;
}

/**
 * Creates a function that invokes two functions and merges their return values.
 *
 * @param {function} one Function to invoke first.
 * @param {function} two Function to invoke second.
 * @return {function} Function that invokes the two argument functions.
 * @private
 */
function createMergedResultFunction(one, two) {
  return function mergedResult() {
    var a = one.apply(this, arguments);
    var b = two.apply(this, arguments);
    if (a == null) {
      return b;
    } else if (b == null) {
      return a;
    }
    var c = {};
    mergeIntoWithNoDuplicateKeys(c, a);
    mergeIntoWithNoDuplicateKeys(c, b);
    return c;
  };
}

/**
 * Creates a function that invokes two functions and ignores their return vales.
 *
 * @param {function} one Function to invoke first.
 * @param {function} two Function to invoke second.
 * @return {function} Function that invokes the two argument functions.
 * @private
 */
function createChainedFunction(one, two) {
  return function chainedFunction() {
    one.apply(this, arguments);
    two.apply(this, arguments);
  };
}

/**
 * Binds a method to the component.
 *
 * @param {object} component Component whose method is going to be bound.
 * @param {function} method Method to be bound.
 * @return {function} The bound method.
 */
function bindAutoBindMethod(component, method) {
  var boundMethod = method.bind(component);
  if ("development" !== 'production') {
    boundMethod.__reactBoundContext = component;
    boundMethod.__reactBoundMethod = method;
    boundMethod.__reactBoundArguments = null;
    var componentName = component.constructor.displayName;
    var _bind = boundMethod.bind;
    boundMethod.bind = function (newThis) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      // User is trying to bind() an autobound method; we effectively will
      // ignore the value of "this" that the user is trying to use, so
      // let's warn.
      if (newThis !== component && newThis !== null) {
        "development" !== 'production' ? warning(false, 'bind(): React component methods may only be bound to the ' + 'component instance. See %s', componentName) : void 0;
      } else if (!args.length) {
        "development" !== 'production' ? warning(false, 'bind(): You are binding a component method to the component. ' + 'React does this for you automatically in a high-performance ' + 'way, so you can safely remove this call. See %s', componentName) : void 0;
        return boundMethod;
      }
      var reboundMethod = _bind.apply(boundMethod, arguments);
      reboundMethod.__reactBoundContext = component;
      reboundMethod.__reactBoundMethod = method;
      reboundMethod.__reactBoundArguments = args;
      return reboundMethod;
    };
  }
  return boundMethod;
}

/**
 * Binds all auto-bound methods in a component.
 *
 * @param {object} component Component whose method is going to be bound.
 */
function bindAutoBindMethods(component) {
  var pairs = component.__reactAutoBindPairs;
  for (var i = 0; i < pairs.length; i += 2) {
    var autoBindKey = pairs[i];
    var method = pairs[i + 1];
    component[autoBindKey] = bindAutoBindMethod(component, method);
  }
}

/**
 * Add more to the ReactClass base class. These are all legacy features and
 * therefore not already part of the modern ReactComponent.
 */
var ReactClassMixin = {

  /**
   * TODO: This will be deprecated because state should always keep a consistent
   * type signature and the only use case for this, is to avoid that.
   */
  replaceState: function (newState, callback) {
    this.updater.enqueueReplaceState(this, newState);
    if (callback) {
      this.updater.enqueueCallback(this, callback, 'replaceState');
    }
  },

  /**
   * Checks whether or not this composite component is mounted.
   * @return {boolean} True if mounted, false otherwise.
   * @protected
   * @final
   */
  isMounted: function () {
    return this.updater.isMounted(this);
  }
};

var ReactClassComponent = function () {};
_assign(ReactClassComponent.prototype, ReactComponent.prototype, ReactClassMixin);

/**
 * Module for creating composite components.
 *
 * @class ReactClass
 */
var ReactClass = {

  /**
   * Creates a composite component class given a class specification.
   * See https://facebook.github.io/react/docs/top-level-api.html#react.createclass
   *
   * @param {object} spec Class specification (which must define `render`).
   * @return {function} Component constructor function.
   * @public
   */
  createClass: function (spec) {
    // To keep our warnings more understandable, we'll use a little hack here to
    // ensure that Constructor.name !== 'Constructor'. This makes sure we don't
    // unnecessarily identify a class without displayName as 'Constructor'.
    var Constructor = identity(function (props, context, updater) {
      // This constructor gets overridden by mocks. The argument is used
      // by mocks to assert on what gets mounted.

      if ("development" !== 'production') {
        "development" !== 'production' ? warning(this instanceof Constructor, 'Something is calling a React component directly. Use a factory or ' + 'JSX instead. See: https://fb.me/react-legacyfactory') : void 0;
      }

      // Wire up auto-binding
      if (this.__reactAutoBindPairs.length) {
        bindAutoBindMethods(this);
      }

      this.props = props;
      this.context = context;
      this.refs = emptyObject;
      this.updater = updater || ReactNoopUpdateQueue;

      this.state = null;

      // ReactClasses doesn't have constructors. Instead, they use the
      // getInitialState and componentWillMount methods for initialization.

      var initialState = this.getInitialState ? this.getInitialState() : null;
      if ("development" !== 'production') {
        // We allow auto-mocks to proceed as if they're returning null.
        if (initialState === undefined && this.getInitialState._isMockFunction) {
          // This is probably bad practice. Consider warning here and
          // deprecating this convenience.
          initialState = null;
        }
      }
      !(typeof initialState === 'object' && !Array.isArray(initialState)) ? "development" !== 'production' ? invariant(false, '%s.getInitialState(): must return an object or null', Constructor.displayName || 'ReactCompositeComponent') : _prodInvariant('82', Constructor.displayName || 'ReactCompositeComponent') : void 0;

      this.state = initialState;
    });
    Constructor.prototype = new ReactClassComponent();
    Constructor.prototype.constructor = Constructor;
    Constructor.prototype.__reactAutoBindPairs = [];

    injectedMixins.forEach(mixSpecIntoComponent.bind(null, Constructor));

    mixSpecIntoComponent(Constructor, spec);

    // Initialize the defaultProps property after all mixins have been merged.
    if (Constructor.getDefaultProps) {
      Constructor.defaultProps = Constructor.getDefaultProps();
    }

    if ("development" !== 'production') {
      // This is a tag to indicate that the use of these method names is ok,
      // since it's used with createClass. If it's not, then it's likely a
      // mistake so we'll warn you to use the static property, property
      // initializer or constructor respectively.
      if (Constructor.getDefaultProps) {
        Constructor.getDefaultProps.isReactClassApproved = {};
      }
      if (Constructor.prototype.getInitialState) {
        Constructor.prototype.getInitialState.isReactClassApproved = {};
      }
    }

    !Constructor.prototype.render ? "development" !== 'production' ? invariant(false, 'createClass(...): Class specification must implement a `render` method.') : _prodInvariant('83') : void 0;

    if ("development" !== 'production') {
      "development" !== 'production' ? warning(!Constructor.prototype.componentShouldUpdate, '%s has a method called ' + 'componentShouldUpdate(). Did you mean shouldComponentUpdate()? ' + 'The name is phrased as a question because the function is ' + 'expected to return a value.', spec.displayName || 'A component') : void 0;
      "development" !== 'production' ? warning(!Constructor.prototype.componentWillRecieveProps, '%s has a method called ' + 'componentWillRecieveProps(). Did you mean componentWillReceiveProps()?', spec.displayName || 'A component') : void 0;
    }

    // Reduce time spent doing lookups by setting these on the prototype.
    for (var methodName in ReactClassInterface) {
      if (!Constructor.prototype[methodName]) {
        Constructor.prototype[methodName] = null;
      }
    }

    return Constructor;
  },

  injection: {
    injectMixin: function (mixin) {
      injectedMixins.push(mixin);
    }
  }

};

module.exports = ReactClass;
},{"./ReactComponent":12,"./ReactElement":16,"./ReactNoopUpdateQueue":19,"./ReactPropTypeLocationNames":20,"./reactProdInvariant":29,"fbjs/lib/emptyObject":2,"fbjs/lib/invariant":3,"fbjs/lib/warning":4,"object-assign":5}],12:[function(require,module,exports){
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

'use strict';

var _prodInvariant = require('./reactProdInvariant');

var ReactNoopUpdateQueue = require('./ReactNoopUpdateQueue');

var canDefineProperty = require('./canDefineProperty');
var emptyObject = require('fbjs/lib/emptyObject');
var invariant = require('fbjs/lib/invariant');
var warning = require('fbjs/lib/warning');

/**
 * Base class helpers for the updating state of a component.
 */
function ReactComponent(props, context, updater) {
  this.props = props;
  this.context = context;
  this.refs = emptyObject;
  // We initialize the default updater but the real one gets injected by the
  // renderer.
  this.updater = updater || ReactNoopUpdateQueue;
}

ReactComponent.prototype.isReactComponent = {};

/**
 * Sets a subset of the state. Always use this to mutate
 * state. You should treat `this.state` as immutable.
 *
 * There is no guarantee that `this.state` will be immediately updated, so
 * accessing `this.state` after calling this method may return the old value.
 *
 * There is no guarantee that calls to `setState` will run synchronously,
 * as they may eventually be batched together.  You can provide an optional
 * callback that will be executed when the call to setState is actually
 * completed.
 *
 * When a function is provided to setState, it will be called at some point in
 * the future (not synchronously). It will be called with the up to date
 * component arguments (state, props, context). These values can be different
 * from this.* because your function may be called after receiveProps but before
 * shouldComponentUpdate, and this new state, props, and context will not yet be
 * assigned to this.
 *
 * @param {object|function} partialState Next partial state or function to
 *        produce next partial state to be merged with current state.
 * @param {?function} callback Called after state is updated.
 * @final
 * @protected
 */
ReactComponent.prototype.setState = function (partialState, callback) {
  !(typeof partialState === 'object' || typeof partialState === 'function' || partialState == null) ? "development" !== 'production' ? invariant(false, 'setState(...): takes an object of state variables to update or a function which returns an object of state variables.') : _prodInvariant('85') : void 0;
  this.updater.enqueueSetState(this, partialState);
  if (callback) {
    this.updater.enqueueCallback(this, callback, 'setState');
  }
};

/**
 * Forces an update. This should only be invoked when it is known with
 * certainty that we are **not** in a DOM transaction.
 *
 * You may want to call this when you know that some deeper aspect of the
 * component's state has changed but `setState` was not called.
 *
 * This will not invoke `shouldComponentUpdate`, but it will invoke
 * `componentWillUpdate` and `componentDidUpdate`.
 *
 * @param {?function} callback Called after update is complete.
 * @final
 * @protected
 */
ReactComponent.prototype.forceUpdate = function (callback) {
  this.updater.enqueueForceUpdate(this);
  if (callback) {
    this.updater.enqueueCallback(this, callback, 'forceUpdate');
  }
};

/**
 * Deprecated APIs. These APIs used to exist on classic React classes but since
 * we would like to deprecate them, we're not going to move them over to this
 * modern base class. Instead, we define a getter that warns if it's accessed.
 */
if ("development" !== 'production') {
  var deprecatedAPIs = {
    isMounted: ['isMounted', 'Instead, make sure to clean up subscriptions and pending requests in ' + 'componentWillUnmount to prevent memory leaks.'],
    replaceState: ['replaceState', 'Refactor your code to use setState instead (see ' + 'https://github.com/facebook/react/issues/3236).']
  };
  var defineDeprecationWarning = function (methodName, info) {
    if (canDefineProperty) {
      Object.defineProperty(ReactComponent.prototype, methodName, {
        get: function () {
          "development" !== 'production' ? warning(false, '%s(...) is deprecated in plain JavaScript React classes. %s', info[0], info[1]) : void 0;
          return undefined;
        }
      });
    }
  };
  for (var fnName in deprecatedAPIs) {
    if (deprecatedAPIs.hasOwnProperty(fnName)) {
      defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
    }
  }
}

module.exports = ReactComponent;
},{"./ReactNoopUpdateQueue":19,"./canDefineProperty":25,"./reactProdInvariant":29,"fbjs/lib/emptyObject":2,"fbjs/lib/invariant":3,"fbjs/lib/warning":4}],13:[function(require,module,exports){
/**
 * Copyright 2016-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

'use strict';

var _prodInvariant = require('./reactProdInvariant');

var ReactCurrentOwner = require('./ReactCurrentOwner');

var invariant = require('fbjs/lib/invariant');
var warning = require('fbjs/lib/warning');

function isNative(fn) {
  // Based on isNative() from Lodash
  var funcToString = Function.prototype.toString;
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  var reIsNative = RegExp('^' + funcToString
  // Take an example native function source for comparison
  .call(hasOwnProperty)
  // Strip regex characters so we can use it for regex
  .replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
  // Remove hasOwnProperty from the template to make it generic
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$');
  try {
    var source = funcToString.call(fn);
    return reIsNative.test(source);
  } catch (err) {
    return false;
  }
}

var canUseCollections =
// Array.from
typeof Array.from === 'function' &&
// Map
typeof Map === 'function' && isNative(Map) &&
// Map.prototype.keys
Map.prototype != null && typeof Map.prototype.keys === 'function' && isNative(Map.prototype.keys) &&
// Set
typeof Set === 'function' && isNative(Set) &&
// Set.prototype.keys
Set.prototype != null && typeof Set.prototype.keys === 'function' && isNative(Set.prototype.keys);

var setItem;
var getItem;
var removeItem;
var getItemIDs;
var addRoot;
var removeRoot;
var getRootIDs;

if (canUseCollections) {
  var itemMap = new Map();
  var rootIDSet = new Set();

  setItem = function (id, item) {
    itemMap.set(id, item);
  };
  getItem = function (id) {
    return itemMap.get(id);
  };
  removeItem = function (id) {
    itemMap['delete'](id);
  };
  getItemIDs = function () {
    return Array.from(itemMap.keys());
  };

  addRoot = function (id) {
    rootIDSet.add(id);
  };
  removeRoot = function (id) {
    rootIDSet['delete'](id);
  };
  getRootIDs = function () {
    return Array.from(rootIDSet.keys());
  };
} else {
  var itemByKey = {};
  var rootByKey = {};

  // Use non-numeric keys to prevent V8 performance issues:
  // https://github.com/facebook/react/pull/7232
  var getKeyFromID = function (id) {
    return '.' + id;
  };
  var getIDFromKey = function (key) {
    return parseInt(key.substr(1), 10);
  };

  setItem = function (id, item) {
    var key = getKeyFromID(id);
    itemByKey[key] = item;
  };
  getItem = function (id) {
    var key = getKeyFromID(id);
    return itemByKey[key];
  };
  removeItem = function (id) {
    var key = getKeyFromID(id);
    delete itemByKey[key];
  };
  getItemIDs = function () {
    return Object.keys(itemByKey).map(getIDFromKey);
  };

  addRoot = function (id) {
    var key = getKeyFromID(id);
    rootByKey[key] = true;
  };
  removeRoot = function (id) {
    var key = getKeyFromID(id);
    delete rootByKey[key];
  };
  getRootIDs = function () {
    return Object.keys(rootByKey).map(getIDFromKey);
  };
}

var unmountedIDs = [];

function purgeDeep(id) {
  var item = getItem(id);
  if (item) {
    var childIDs = item.childIDs;

    removeItem(id);
    childIDs.forEach(purgeDeep);
  }
}

function describeComponentFrame(name, source, ownerName) {
  return '\n    in ' + (name || 'Unknown') + (source ? ' (at ' + source.fileName.replace(/^.*[\\\/]/, '') + ':' + source.lineNumber + ')' : ownerName ? ' (created by ' + ownerName + ')' : '');
}

function getDisplayName(element) {
  if (element == null) {
    return '#empty';
  } else if (typeof element === 'string' || typeof element === 'number') {
    return '#text';
  } else if (typeof element.type === 'string') {
    return element.type;
  } else {
    return element.type.displayName || element.type.name || 'Unknown';
  }
}

function describeID(id) {
  var name = ReactComponentTreeHook.getDisplayName(id);
  var element = ReactComponentTreeHook.getElement(id);
  var ownerID = ReactComponentTreeHook.getOwnerID(id);
  var ownerName;
  if (ownerID) {
    ownerName = ReactComponentTreeHook.getDisplayName(ownerID);
  }
  "development" !== 'production' ? warning(element, 'ReactComponentTreeHook: Missing React element for debugID %s when ' + 'building stack', id) : void 0;
  return describeComponentFrame(name, element && element._source, ownerName);
}

var ReactComponentTreeHook = {
  onSetChildren: function (id, nextChildIDs) {
    var item = getItem(id);
    !item ? "development" !== 'production' ? invariant(false, 'Item must have been set') : _prodInvariant('144') : void 0;
    item.childIDs = nextChildIDs;

    for (var i = 0; i < nextChildIDs.length; i++) {
      var nextChildID = nextChildIDs[i];
      var nextChild = getItem(nextChildID);
      !nextChild ? "development" !== 'production' ? invariant(false, 'Expected hook events to fire for the child before its parent includes it in onSetChildren().') : _prodInvariant('140') : void 0;
      !(nextChild.childIDs != null || typeof nextChild.element !== 'object' || nextChild.element == null) ? "development" !== 'production' ? invariant(false, 'Expected onSetChildren() to fire for a container child before its parent includes it in onSetChildren().') : _prodInvariant('141') : void 0;
      !nextChild.isMounted ? "development" !== 'production' ? invariant(false, 'Expected onMountComponent() to fire for the child before its parent includes it in onSetChildren().') : _prodInvariant('71') : void 0;
      if (nextChild.parentID == null) {
        nextChild.parentID = id;
        // TODO: This shouldn't be necessary but mounting a new root during in
        // componentWillMount currently causes not-yet-mounted components to
        // be purged from our tree data so their parent id is missing.
      }
      !(nextChild.parentID === id) ? "development" !== 'production' ? invariant(false, 'Expected onBeforeMountComponent() parent and onSetChildren() to be consistent (%s has parents %s and %s).', nextChildID, nextChild.parentID, id) : _prodInvariant('142', nextChildID, nextChild.parentID, id) : void 0;
    }
  },
  onBeforeMountComponent: function (id, element, parentID) {
    var item = {
      element: element,
      parentID: parentID,
      text: null,
      childIDs: [],
      isMounted: false,
      updateCount: 0
    };
    setItem(id, item);
  },
  onBeforeUpdateComponent: function (id, element) {
    var item = getItem(id);
    if (!item || !item.isMounted) {
      // We may end up here as a result of setState() in componentWillUnmount().
      // In this case, ignore the element.
      return;
    }
    item.element = element;
  },
  onMountComponent: function (id) {
    var item = getItem(id);
    !item ? "development" !== 'production' ? invariant(false, 'Item must have been set') : _prodInvariant('144') : void 0;
    item.isMounted = true;
    var isRoot = item.parentID === 0;
    if (isRoot) {
      addRoot(id);
    }
  },
  onUpdateComponent: function (id) {
    var item = getItem(id);
    if (!item || !item.isMounted) {
      // We may end up here as a result of setState() in componentWillUnmount().
      // In this case, ignore the element.
      return;
    }
    item.updateCount++;
  },
  onUnmountComponent: function (id) {
    var item = getItem(id);
    if (item) {
      // We need to check if it exists.
      // `item` might not exist if it is inside an error boundary, and a sibling
      // error boundary child threw while mounting. Then this instance never
      // got a chance to mount, but it still gets an unmounting event during
      // the error boundary cleanup.
      item.isMounted = false;
      var isRoot = item.parentID === 0;
      if (isRoot) {
        removeRoot(id);
      }
    }
    unmountedIDs.push(id);
  },
  purgeUnmountedComponents: function () {
    if (ReactComponentTreeHook._preventPurging) {
      // Should only be used for testing.
      return;
    }

    for (var i = 0; i < unmountedIDs.length; i++) {
      var id = unmountedIDs[i];
      purgeDeep(id);
    }
    unmountedIDs.length = 0;
  },
  isMounted: function (id) {
    var item = getItem(id);
    return item ? item.isMounted : false;
  },
  getCurrentStackAddendum: function (topElement) {
    var info = '';
    if (topElement) {
      var name = getDisplayName(topElement);
      var owner = topElement._owner;
      info += describeComponentFrame(name, topElement._source, owner && owner.getName());
    }

    var currentOwner = ReactCurrentOwner.current;
    var id = currentOwner && currentOwner._debugID;

    info += ReactComponentTreeHook.getStackAddendumByID(id);
    return info;
  },
  getStackAddendumByID: function (id) {
    var info = '';
    while (id) {
      info += describeID(id);
      id = ReactComponentTreeHook.getParentID(id);
    }
    return info;
  },
  getChildIDs: function (id) {
    var item = getItem(id);
    return item ? item.childIDs : [];
  },
  getDisplayName: function (id) {
    var element = ReactComponentTreeHook.getElement(id);
    if (!element) {
      return null;
    }
    return getDisplayName(element);
  },
  getElement: function (id) {
    var item = getItem(id);
    return item ? item.element : null;
  },
  getOwnerID: function (id) {
    var element = ReactComponentTreeHook.getElement(id);
    if (!element || !element._owner) {
      return null;
    }
    return element._owner._debugID;
  },
  getParentID: function (id) {
    var item = getItem(id);
    return item ? item.parentID : null;
  },
  getSource: function (id) {
    var item = getItem(id);
    var element = item ? item.element : null;
    var source = element != null ? element._source : null;
    return source;
  },
  getText: function (id) {
    var element = ReactComponentTreeHook.getElement(id);
    if (typeof element === 'string') {
      return element;
    } else if (typeof element === 'number') {
      return '' + element;
    } else {
      return null;
    }
  },
  getUpdateCount: function (id) {
    var item = getItem(id);
    return item ? item.updateCount : 0;
  },


  getRootIDs: getRootIDs,
  getRegisteredIDs: getItemIDs
};

module.exports = ReactComponentTreeHook;
},{"./ReactCurrentOwner":14,"./reactProdInvariant":29,"fbjs/lib/invariant":3,"fbjs/lib/warning":4}],14:[function(require,module,exports){
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

'use strict';

/**
 * Keeps track of the current owner.
 *
 * The current owner is the component who should own any components that are
 * currently being constructed.
 */
var ReactCurrentOwner = {

  /**
   * @internal
   * @type {ReactComponent}
   */
  current: null

};

module.exports = ReactCurrentOwner;
},{}],15:[function(require,module,exports){
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

'use strict';

var ReactElement = require('./ReactElement');

/**
 * Create a factory that creates HTML tag elements.
 *
 * @private
 */
var createDOMFactory = ReactElement.createFactory;
if ("development" !== 'production') {
  var ReactElementValidator = require('./ReactElementValidator');
  createDOMFactory = ReactElementValidator.createFactory;
}

/**
 * Creates a mapping from supported HTML tags to `ReactDOMComponent` classes.
 * This is also accessible via `React.DOM`.
 *
 * @public
 */
var ReactDOMFactories = {
  a: createDOMFactory('a'),
  abbr: createDOMFactory('abbr'),
  address: createDOMFactory('address'),
  area: createDOMFactory('area'),
  article: createDOMFactory('article'),
  aside: createDOMFactory('aside'),
  audio: createDOMFactory('audio'),
  b: createDOMFactory('b'),
  base: createDOMFactory('base'),
  bdi: createDOMFactory('bdi'),
  bdo: createDOMFactory('bdo'),
  big: createDOMFactory('big'),
  blockquote: createDOMFactory('blockquote'),
  body: createDOMFactory('body'),
  br: createDOMFactory('br'),
  button: createDOMFactory('button'),
  canvas: createDOMFactory('canvas'),
  caption: createDOMFactory('caption'),
  cite: createDOMFactory('cite'),
  code: createDOMFactory('code'),
  col: createDOMFactory('col'),
  colgroup: createDOMFactory('colgroup'),
  data: createDOMFactory('data'),
  datalist: createDOMFactory('datalist'),
  dd: createDOMFactory('dd'),
  del: createDOMFactory('del'),
  details: createDOMFactory('details'),
  dfn: createDOMFactory('dfn'),
  dialog: createDOMFactory('dialog'),
  div: createDOMFactory('div'),
  dl: createDOMFactory('dl'),
  dt: createDOMFactory('dt'),
  em: createDOMFactory('em'),
  embed: createDOMFactory('embed'),
  fieldset: createDOMFactory('fieldset'),
  figcaption: createDOMFactory('figcaption'),
  figure: createDOMFactory('figure'),
  footer: createDOMFactory('footer'),
  form: createDOMFactory('form'),
  h1: createDOMFactory('h1'),
  h2: createDOMFactory('h2'),
  h3: createDOMFactory('h3'),
  h4: createDOMFactory('h4'),
  h5: createDOMFactory('h5'),
  h6: createDOMFactory('h6'),
  head: createDOMFactory('head'),
  header: createDOMFactory('header'),
  hgroup: createDOMFactory('hgroup'),
  hr: createDOMFactory('hr'),
  html: createDOMFactory('html'),
  i: createDOMFactory('i'),
  iframe: createDOMFactory('iframe'),
  img: createDOMFactory('img'),
  input: createDOMFactory('input'),
  ins: createDOMFactory('ins'),
  kbd: createDOMFactory('kbd'),
  keygen: createDOMFactory('keygen'),
  label: createDOMFactory('label'),
  legend: createDOMFactory('legend'),
  li: createDOMFactory('li'),
  link: createDOMFactory('link'),
  main: createDOMFactory('main'),
  map: createDOMFactory('map'),
  mark: createDOMFactory('mark'),
  menu: createDOMFactory('menu'),
  menuitem: createDOMFactory('menuitem'),
  meta: createDOMFactory('meta'),
  meter: createDOMFactory('meter'),
  nav: createDOMFactory('nav'),
  noscript: createDOMFactory('noscript'),
  object: createDOMFactory('object'),
  ol: createDOMFactory('ol'),
  optgroup: createDOMFactory('optgroup'),
  option: createDOMFactory('option'),
  output: createDOMFactory('output'),
  p: createDOMFactory('p'),
  param: createDOMFactory('param'),
  picture: createDOMFactory('picture'),
  pre: createDOMFactory('pre'),
  progress: createDOMFactory('progress'),
  q: createDOMFactory('q'),
  rp: createDOMFactory('rp'),
  rt: createDOMFactory('rt'),
  ruby: createDOMFactory('ruby'),
  s: createDOMFactory('s'),
  samp: createDOMFactory('samp'),
  script: createDOMFactory('script'),
  section: createDOMFactory('section'),
  select: createDOMFactory('select'),
  small: createDOMFactory('small'),
  source: createDOMFactory('source'),
  span: createDOMFactory('span'),
  strong: createDOMFactory('strong'),
  style: createDOMFactory('style'),
  sub: createDOMFactory('sub'),
  summary: createDOMFactory('summary'),
  sup: createDOMFactory('sup'),
  table: createDOMFactory('table'),
  tbody: createDOMFactory('tbody'),
  td: createDOMFactory('td'),
  textarea: createDOMFactory('textarea'),
  tfoot: createDOMFactory('tfoot'),
  th: createDOMFactory('th'),
  thead: createDOMFactory('thead'),
  time: createDOMFactory('time'),
  title: createDOMFactory('title'),
  tr: createDOMFactory('tr'),
  track: createDOMFactory('track'),
  u: createDOMFactory('u'),
  ul: createDOMFactory('ul'),
  'var': createDOMFactory('var'),
  video: createDOMFactory('video'),
  wbr: createDOMFactory('wbr'),

  // SVG
  circle: createDOMFactory('circle'),
  clipPath: createDOMFactory('clipPath'),
  defs: createDOMFactory('defs'),
  ellipse: createDOMFactory('ellipse'),
  g: createDOMFactory('g'),
  image: createDOMFactory('image'),
  line: createDOMFactory('line'),
  linearGradient: createDOMFactory('linearGradient'),
  mask: createDOMFactory('mask'),
  path: createDOMFactory('path'),
  pattern: createDOMFactory('pattern'),
  polygon: createDOMFactory('polygon'),
  polyline: createDOMFactory('polyline'),
  radialGradient: createDOMFactory('radialGradient'),
  rect: createDOMFactory('rect'),
  stop: createDOMFactory('stop'),
  svg: createDOMFactory('svg'),
  text: createDOMFactory('text'),
  tspan: createDOMFactory('tspan')
};

module.exports = ReactDOMFactories;
},{"./ReactElement":16,"./ReactElementValidator":18}],16:[function(require,module,exports){
/**
 * Copyright 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

'use strict';

var _assign = require('object-assign');

var ReactCurrentOwner = require('./ReactCurrentOwner');

var warning = require('fbjs/lib/warning');
var canDefineProperty = require('./canDefineProperty');
var hasOwnProperty = Object.prototype.hasOwnProperty;

var REACT_ELEMENT_TYPE = require('./ReactElementSymbol');

var RESERVED_PROPS = {
  key: true,
  ref: true,
  __self: true,
  __source: true
};

var specialPropKeyWarningShown, specialPropRefWarningShown;

function hasValidRef(config) {
  if ("development" !== 'production') {
    if (hasOwnProperty.call(config, 'ref')) {
      var getter = Object.getOwnPropertyDescriptor(config, 'ref').get;
      if (getter && getter.isReactWarning) {
        return false;
      }
    }
  }
  return config.ref !== undefined;
}

function hasValidKey(config) {
  if ("development" !== 'production') {
    if (hasOwnProperty.call(config, 'key')) {
      var getter = Object.getOwnPropertyDescriptor(config, 'key').get;
      if (getter && getter.isReactWarning) {
        return false;
      }
    }
  }
  return config.key !== undefined;
}

function defineKeyPropWarningGetter(props, displayName) {
  var warnAboutAccessingKey = function () {
    if (!specialPropKeyWarningShown) {
      specialPropKeyWarningShown = true;
      "development" !== 'production' ? warning(false, '%s: `key` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName) : void 0;
    }
  };
  warnAboutAccessingKey.isReactWarning = true;
  Object.defineProperty(props, 'key', {
    get: warnAboutAccessingKey,
    configurable: true
  });
}

function defineRefPropWarningGetter(props, displayName) {
  var warnAboutAccessingRef = function () {
    if (!specialPropRefWarningShown) {
      specialPropRefWarningShown = true;
      "development" !== 'production' ? warning(false, '%s: `ref` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://fb.me/react-special-props)', displayName) : void 0;
    }
  };
  warnAboutAccessingRef.isReactWarning = true;
  Object.defineProperty(props, 'ref', {
    get: warnAboutAccessingRef,
    configurable: true
  });
}

/**
 * Factory method to create a new React element. This no longer adheres to
 * the class pattern, so do not use new to call it. Also, no instanceof check
 * will work. Instead test $$typeof field against Symbol.for('react.element') to check
 * if something is a React Element.
 *
 * @param {*} type
 * @param {*} key
 * @param {string|object} ref
 * @param {*} self A *temporary* helper to detect places where `this` is
 * different from the `owner` when React.createElement is called, so that we
 * can warn. We want to get rid of owner and replace string `ref`s with arrow
 * functions, and as long as `this` and owner are the same, there will be no
 * change in behavior.
 * @param {*} source An annotation object (added by a transpiler or otherwise)
 * indicating filename, line number, and/or other information.
 * @param {*} owner
 * @param {*} props
 * @internal
 */
var ReactElement = function (type, key, ref, self, source, owner, props) {
  var element = {
    // This tag allow us to uniquely identify this as a React Element
    $$typeof: REACT_ELEMENT_TYPE,

    // Built-in properties that belong on the element
    type: type,
    key: key,
    ref: ref,
    props: props,

    // Record the component responsible for creating this element.
    _owner: owner
  };

  if ("development" !== 'production') {
    // The validation flag is currently mutative. We put it on
    // an external backing store so that we can freeze the whole object.
    // This can be replaced with a WeakMap once they are implemented in
    // commonly used development environments.
    element._store = {};

    // To make comparing ReactElements easier for testing purposes, we make
    // the validation flag non-enumerable (where possible, which should
    // include every environment we run tests in), so the test framework
    // ignores it.
    if (canDefineProperty) {
      Object.defineProperty(element._store, 'validated', {
        configurable: false,
        enumerable: false,
        writable: true,
        value: false
      });
      // self and source are DEV only properties.
      Object.defineProperty(element, '_self', {
        configurable: false,
        enumerable: false,
        writable: false,
        value: self
      });
      // Two elements created in two different places should be considered
      // equal for testing purposes and therefore we hide it from enumeration.
      Object.defineProperty(element, '_source', {
        configurable: false,
        enumerable: false,
        writable: false,
        value: source
      });
    } else {
      element._store.validated = false;
      element._self = self;
      element._source = source;
    }
    if (Object.freeze) {
      Object.freeze(element.props);
      Object.freeze(element);
    }
  }

  return element;
};

/**
 * Create and return a new ReactElement of the given type.
 * See https://facebook.github.io/react/docs/top-level-api.html#react.createelement
 */
ReactElement.createElement = function (type, config, children) {
  var propName;

  // Reserved names are extracted
  var props = {};

  var key = null;
  var ref = null;
  var self = null;
  var source = null;

  if (config != null) {
    if (hasValidRef(config)) {
      ref = config.ref;
    }
    if (hasValidKey(config)) {
      key = '' + config.key;
    }

    self = config.__self === undefined ? null : config.__self;
    source = config.__source === undefined ? null : config.__source;
    // Remaining properties are added to a new props object
    for (propName in config) {
      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
        props[propName] = config[propName];
      }
    }
  }

  // Children can be more than one argument, and those are transferred onto
  // the newly allocated props object.
  var childrenLength = arguments.length - 2;
  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    var childArray = Array(childrenLength);
    for (var i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }
    if ("development" !== 'production') {
      if (Object.freeze) {
        Object.freeze(childArray);
      }
    }
    props.children = childArray;
  }

  // Resolve default props
  if (type && type.defaultProps) {
    var defaultProps = type.defaultProps;
    for (propName in defaultProps) {
      if (props[propName] === undefined) {
        props[propName] = defaultProps[propName];
      }
    }
  }
  if ("development" !== 'production') {
    if (key || ref) {
      if (typeof props.$$typeof === 'undefined' || props.$$typeof !== REACT_ELEMENT_TYPE) {
        var displayName = typeof type === 'function' ? type.displayName || type.name || 'Unknown' : type;
        if (key) {
          defineKeyPropWarningGetter(props, displayName);
        }
        if (ref) {
          defineRefPropWarningGetter(props, displayName);
        }
      }
    }
  }
  return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
};

/**
 * Return a function that produces ReactElements of a given type.
 * See https://facebook.github.io/react/docs/top-level-api.html#react.createfactory
 */
ReactElement.createFactory = function (type) {
  var factory = ReactElement.createElement.bind(null, type);
  // Expose the type on the factory and the prototype so that it can be
  // easily accessed on elements. E.g. `<Foo />.type === Foo`.
  // This should not be named `constructor` since this may not be the function
  // that created the element, and it may not even be a constructor.
  // Legacy hook TODO: Warn if this is accessed
  factory.type = type;
  return factory;
};

ReactElement.cloneAndReplaceKey = function (oldElement, newKey) {
  var newElement = ReactElement(oldElement.type, newKey, oldElement.ref, oldElement._self, oldElement._source, oldElement._owner, oldElement.props);

  return newElement;
};

/**
 * Clone and return a new ReactElement using element as the starting point.
 * See https://facebook.github.io/react/docs/top-level-api.html#react.cloneelement
 */
ReactElement.cloneElement = function (element, config, children) {
  var propName;

  // Original props are copied
  var props = _assign({}, element.props);

  // Reserved names are extracted
  var key = element.key;
  var ref = element.ref;
  // Self is preserved since the owner is preserved.
  var self = element._self;
  // Source is preserved since cloneElement is unlikely to be targeted by a
  // transpiler, and the original source is probably a better indicator of the
  // true owner.
  var source = element._source;

  // Owner will be preserved, unless ref is overridden
  var owner = element._owner;

  if (config != null) {
    if (hasValidRef(config)) {
      // Silently steal the ref from the parent.
      ref = config.ref;
      owner = ReactCurrentOwner.current;
    }
    if (hasValidKey(config)) {
      key = '' + config.key;
    }

    // Remaining properties override existing props
    var defaultProps;
    if (element.type && element.type.defaultProps) {
      defaultProps = element.type.defaultProps;
    }
    for (propName in config) {
      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
        if (config[propName] === undefined && defaultProps !== undefined) {
          // Resolve default props
          props[propName] = defaultProps[propName];
        } else {
          props[propName] = config[propName];
        }
      }
    }
  }

  // Children can be more than one argument, and those are transferred onto
  // the newly allocated props object.
  var childrenLength = arguments.length - 2;
  if (childrenLength === 1) {
    props.children = children;
  } else if (childrenLength > 1) {
    var childArray = Array(childrenLength);
    for (var i = 0; i < childrenLength; i++) {
      childArray[i] = arguments[i + 2];
    }
    props.children = childArray;
  }

  return ReactElement(element.type, key, ref, self, source, owner, props);
};

/**
 * Verifies the object is a ReactElement.
 * See https://facebook.github.io/react/docs/top-level-api.html#react.isvalidelement
 * @param {?object} object
 * @return {boolean} True if `object` is a valid component.
 * @final
 */
ReactElement.isValidElement = function (object) {
  return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
};

module.exports = ReactElement;
},{"./ReactCurrentOwner":14,"./ReactElementSymbol":17,"./canDefineProperty":25,"fbjs/lib/warning":4,"object-assign":5}],17:[function(require,module,exports){
/**
 * Copyright 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

'use strict';

// The Symbol used to tag the ReactElement type. If there is no native Symbol
// nor polyfill, then a plain number is used for performance.

var REACT_ELEMENT_TYPE = typeof Symbol === 'function' && Symbol['for'] && Symbol['for']('react.element') || 0xeac7;

module.exports = REACT_ELEMENT_TYPE;
},{}],18:[function(require,module,exports){
/**
 * Copyright 2014-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

/**
 * ReactElementValidator provides a wrapper around a element factory
 * which validates the props passed to the element. This is intended to be
 * used only in DEV and could be replaced by a static type checker for languages
 * that support it.
 */

'use strict';

var ReactCurrentOwner = require('./ReactCurrentOwner');
var ReactComponentTreeHook = require('./ReactComponentTreeHook');
var ReactElement = require('./ReactElement');

var checkReactTypeSpec = require('./checkReactTypeSpec');

var canDefineProperty = require('./canDefineProperty');
var getIteratorFn = require('./getIteratorFn');
var warning = require('fbjs/lib/warning');

function getDeclarationErrorAddendum() {
  if (ReactCurrentOwner.current) {
    var name = ReactCurrentOwner.current.getName();
    if (name) {
      return ' Check the render method of `' + name + '`.';
    }
  }
  return '';
}

/**
 * Warn if there's no key explicitly set on dynamic arrays of children or
 * object keys are not valid. This allows us to keep track of children between
 * updates.
 */
var ownerHasKeyUseWarning = {};

function getCurrentComponentErrorInfo(parentType) {
  var info = getDeclarationErrorAddendum();

  if (!info) {
    var parentName = typeof parentType === 'string' ? parentType : parentType.displayName || parentType.name;
    if (parentName) {
      info = ' Check the top-level render call using <' + parentName + '>.';
    }
  }
  return info;
}

/**
 * Warn if the element doesn't have an explicit key assigned to it.
 * This element is in an array. The array could grow and shrink or be
 * reordered. All children that haven't already been validated are required to
 * have a "key" property assigned to it. Error statuses are cached so a warning
 * will only be shown once.
 *
 * @internal
 * @param {ReactElement} element Element that requires a key.
 * @param {*} parentType element's parent's type.
 */
function validateExplicitKey(element, parentType) {
  if (!element._store || element._store.validated || element.key != null) {
    return;
  }
  element._store.validated = true;

  var memoizer = ownerHasKeyUseWarning.uniqueKey || (ownerHasKeyUseWarning.uniqueKey = {});

  var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);
  if (memoizer[currentComponentErrorInfo]) {
    return;
  }
  memoizer[currentComponentErrorInfo] = true;

  // Usually the current owner is the offender, but if it accepts children as a
  // property, it may be the creator of the child that's responsible for
  // assigning it a key.
  var childOwner = '';
  if (element && element._owner && element._owner !== ReactCurrentOwner.current) {
    // Give the component that originally created this child.
    childOwner = ' It was passed a child from ' + element._owner.getName() + '.';
  }

  "development" !== 'production' ? warning(false, 'Each child in an array or iterator should have a unique "key" prop.' + '%s%s See https://fb.me/react-warning-keys for more information.%s', currentComponentErrorInfo, childOwner, ReactComponentTreeHook.getCurrentStackAddendum(element)) : void 0;
}

/**
 * Ensure that every element either is passed in a static location, in an
 * array with an explicit keys property defined, or in an object literal
 * with valid key property.
 *
 * @internal
 * @param {ReactNode} node Statically passed child of any type.
 * @param {*} parentType node's parent's type.
 */
function validateChildKeys(node, parentType) {
  if (typeof node !== 'object') {
    return;
  }
  if (Array.isArray(node)) {
    for (var i = 0; i < node.length; i++) {
      var child = node[i];
      if (ReactElement.isValidElement(child)) {
        validateExplicitKey(child, parentType);
      }
    }
  } else if (ReactElement.isValidElement(node)) {
    // This element was passed in a valid location.
    if (node._store) {
      node._store.validated = true;
    }
  } else if (node) {
    var iteratorFn = getIteratorFn(node);
    // Entry iterators provide implicit keys.
    if (iteratorFn) {
      if (iteratorFn !== node.entries) {
        var iterator = iteratorFn.call(node);
        var step;
        while (!(step = iterator.next()).done) {
          if (ReactElement.isValidElement(step.value)) {
            validateExplicitKey(step.value, parentType);
          }
        }
      }
    }
  }
}

/**
 * Given an element, validate that its props follow the propTypes definition,
 * provided by the type.
 *
 * @param {ReactElement} element
 */
function validatePropTypes(element) {
  var componentClass = element.type;
  if (typeof componentClass !== 'function') {
    return;
  }
  var name = componentClass.displayName || componentClass.name;
  if (componentClass.propTypes) {
    checkReactTypeSpec(componentClass.propTypes, element.props, 'prop', name, element, null);
  }
  if (typeof componentClass.getDefaultProps === 'function') {
    "development" !== 'production' ? warning(componentClass.getDefaultProps.isReactClassApproved, 'getDefaultProps is only used on classic React.createClass ' + 'definitions. Use a static property named `defaultProps` instead.') : void 0;
  }
}

var ReactElementValidator = {

  createElement: function (type, props, children) {
    var validType = typeof type === 'string' || typeof type === 'function';
    // We warn in this case but don't throw. We expect the element creation to
    // succeed and there will likely be errors in render.
    if (!validType) {
      if (typeof type !== 'function' && typeof type !== 'string') {
        var info = '';
        if (type === undefined || typeof type === 'object' && type !== null && Object.keys(type).length === 0) {
          info += ' You likely forgot to export your component from the file ' + 'it\'s defined in.';
        }
        info += getDeclarationErrorAddendum();
        "development" !== 'production' ? warning(false, 'React.createElement: type is invalid -- expected a string (for ' + 'built-in components) or a class/function (for composite ' + 'components) but got: %s.%s', type == null ? type : typeof type, info) : void 0;
      }
    }

    var element = ReactElement.createElement.apply(this, arguments);

    // The result can be nullish if a mock or a custom function is used.
    // TODO: Drop this when these are no longer allowed as the type argument.
    if (element == null) {
      return element;
    }

    // Skip key warning if the type isn't valid since our key validation logic
    // doesn't expect a non-string/function type and can throw confusing errors.
    // We don't want exception behavior to differ between dev and prod.
    // (Rendering will throw with a helpful message and as soon as the type is
    // fixed, the key warnings will appear.)
    if (validType) {
      for (var i = 2; i < arguments.length; i++) {
        validateChildKeys(arguments[i], type);
      }
    }

    validatePropTypes(element);

    return element;
  },

  createFactory: function (type) {
    var validatedFactory = ReactElementValidator.createElement.bind(null, type);
    // Legacy hook TODO: Warn if this is accessed
    validatedFactory.type = type;

    if ("development" !== 'production') {
      if (canDefineProperty) {
        Object.defineProperty(validatedFactory, 'type', {
          enumerable: false,
          get: function () {
            "development" !== 'production' ? warning(false, 'Factory.type is deprecated. Access the class directly ' + 'before passing it to createFactory.') : void 0;
            Object.defineProperty(this, 'type', {
              value: type
            });
            return type;
          }
        });
      }
    }

    return validatedFactory;
  },

  cloneElement: function (element, props, children) {
    var newElement = ReactElement.cloneElement.apply(this, arguments);
    for (var i = 2; i < arguments.length; i++) {
      validateChildKeys(arguments[i], newElement.type);
    }
    validatePropTypes(newElement);
    return newElement;
  }

};

module.exports = ReactElementValidator;
},{"./ReactComponentTreeHook":13,"./ReactCurrentOwner":14,"./ReactElement":16,"./canDefineProperty":25,"./checkReactTypeSpec":26,"./getIteratorFn":27,"fbjs/lib/warning":4}],19:[function(require,module,exports){
/**
 * Copyright 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

'use strict';

var warning = require('fbjs/lib/warning');

function warnNoop(publicInstance, callerName) {
  if ("development" !== 'production') {
    var constructor = publicInstance.constructor;
    "development" !== 'production' ? warning(false, '%s(...): Can only update a mounted or mounting component. ' + 'This usually means you called %s() on an unmounted component. ' + 'This is a no-op. Please check the code for the %s component.', callerName, callerName, constructor && (constructor.displayName || constructor.name) || 'ReactClass') : void 0;
  }
}

/**
 * This is the abstract API for an update queue.
 */
var ReactNoopUpdateQueue = {

  /**
   * Checks whether or not this composite component is mounted.
   * @param {ReactClass} publicInstance The instance we want to test.
   * @return {boolean} True if mounted, false otherwise.
   * @protected
   * @final
   */
  isMounted: function (publicInstance) {
    return false;
  },

  /**
   * Enqueue a callback that will be executed after all the pending updates
   * have processed.
   *
   * @param {ReactClass} publicInstance The instance to use as `this` context.
   * @param {?function} callback Called after state is updated.
   * @internal
   */
  enqueueCallback: function (publicInstance, callback) {},

  /**
   * Forces an update. This should only be invoked when it is known with
   * certainty that we are **not** in a DOM transaction.
   *
   * You may want to call this when you know that some deeper aspect of the
   * component's state has changed but `setState` was not called.
   *
   * This will not invoke `shouldComponentUpdate`, but it will invoke
   * `componentWillUpdate` and `componentDidUpdate`.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @internal
   */
  enqueueForceUpdate: function (publicInstance) {
    warnNoop(publicInstance, 'forceUpdate');
  },

  /**
   * Replaces all of the state. Always use this or `setState` to mutate state.
   * You should treat `this.state` as immutable.
   *
   * There is no guarantee that `this.state` will be immediately updated, so
   * accessing `this.state` after calling this method may return the old value.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @param {object} completeState Next state.
   * @internal
   */
  enqueueReplaceState: function (publicInstance, completeState) {
    warnNoop(publicInstance, 'replaceState');
  },

  /**
   * Sets a subset of the state. This only exists because _pendingState is
   * internal. This provides a merging strategy that is not available to deep
   * properties which is confusing. TODO: Expose pendingState or don't use it
   * during the merge.
   *
   * @param {ReactClass} publicInstance The instance that should rerender.
   * @param {object} partialState Next partial state to be merged with state.
   * @internal
   */
  enqueueSetState: function (publicInstance, partialState) {
    warnNoop(publicInstance, 'setState');
  }
};

module.exports = ReactNoopUpdateQueue;
},{"fbjs/lib/warning":4}],20:[function(require,module,exports){
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

'use strict';

var ReactPropTypeLocationNames = {};

if ("development" !== 'production') {
  ReactPropTypeLocationNames = {
    prop: 'prop',
    context: 'context',
    childContext: 'child context'
  };
}

module.exports = ReactPropTypeLocationNames;
},{}],21:[function(require,module,exports){
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

'use strict';

var ReactElement = require('./ReactElement');
var ReactPropTypeLocationNames = require('./ReactPropTypeLocationNames');
var ReactPropTypesSecret = require('./ReactPropTypesSecret');

var emptyFunction = require('fbjs/lib/emptyFunction');
var getIteratorFn = require('./getIteratorFn');
var warning = require('fbjs/lib/warning');

/**
 * Collection of methods that allow declaration and validation of props that are
 * supplied to React components. Example usage:
 *
 *   var Props = require('ReactPropTypes');
 *   var MyArticle = React.createClass({
 *     propTypes: {
 *       // An optional string prop named "description".
 *       description: Props.string,
 *
 *       // A required enum prop named "category".
 *       category: Props.oneOf(['News','Photos']).isRequired,
 *
 *       // A prop named "dialog" that requires an instance of Dialog.
 *       dialog: Props.instanceOf(Dialog).isRequired
 *     },
 *     render: function() { ... }
 *   });
 *
 * A more formal specification of how these methods are used:
 *
 *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
 *   decl := ReactPropTypes.{type}(.isRequired)?
 *
 * Each and every declaration produces a function with the same signature. This
 * allows the creation of custom validation functions. For example:
 *
 *  var MyLink = React.createClass({
 *    propTypes: {
 *      // An optional string or URI prop named "href".
 *      href: function(props, propName, componentName) {
 *        var propValue = props[propName];
 *        if (propValue != null && typeof propValue !== 'string' &&
 *            !(propValue instanceof URI)) {
 *          return new Error(
 *            'Expected a string or an URI for ' + propName + ' in ' +
 *            componentName
 *          );
 *        }
 *      }
 *    },
 *    render: function() {...}
 *  });
 *
 * @internal
 */

var ANONYMOUS = '<<anonymous>>';

var ReactPropTypes = {
  array: createPrimitiveTypeChecker('array'),
  bool: createPrimitiveTypeChecker('boolean'),
  func: createPrimitiveTypeChecker('function'),
  number: createPrimitiveTypeChecker('number'),
  object: createPrimitiveTypeChecker('object'),
  string: createPrimitiveTypeChecker('string'),
  symbol: createPrimitiveTypeChecker('symbol'),

  any: createAnyTypeChecker(),
  arrayOf: createArrayOfTypeChecker,
  element: createElementTypeChecker(),
  instanceOf: createInstanceTypeChecker,
  node: createNodeChecker(),
  objectOf: createObjectOfTypeChecker,
  oneOf: createEnumTypeChecker,
  oneOfType: createUnionTypeChecker,
  shape: createShapeTypeChecker
};

/**
 * inlined Object.is polyfill to avoid requiring consumers ship their own
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
 */
/*eslint-disable no-self-compare*/
function is(x, y) {
  // SameValue algorithm
  if (x === y) {
    // Steps 1-5, 7-10
    // Steps 6.b-6.e: +0 != -0
    return x !== 0 || 1 / x === 1 / y;
  } else {
    // Step 6.a: NaN == NaN
    return x !== x && y !== y;
  }
}
/*eslint-enable no-self-compare*/

/**
 * We use an Error-like object for backward compatibility as people may call
 * PropTypes directly and inspect their output. However we don't use real
 * Errors anymore. We don't inspect their stack anyway, and creating them
 * is prohibitively expensive if they are created too often, such as what
 * happens in oneOfType() for any type before the one that matched.
 */
function PropTypeError(message) {
  this.message = message;
  this.stack = '';
}
// Make `instanceof Error` still work for returned errors.
PropTypeError.prototype = Error.prototype;

function createChainableTypeChecker(validate) {
  if ("development" !== 'production') {
    var manualPropTypeCallCache = {};
  }
  function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
    componentName = componentName || ANONYMOUS;
    propFullName = propFullName || propName;
    if ("development" !== 'production') {
      if (secret !== ReactPropTypesSecret && typeof console !== 'undefined') {
        var cacheKey = componentName + ':' + propName;
        if (!manualPropTypeCallCache[cacheKey]) {
          "development" !== 'production' ? warning(false, 'You are manually calling a React.PropTypes validation ' + 'function for the `%s` prop on `%s`. This is deprecated ' + 'and will not work in production with the next major version. ' + 'You may be seeing this warning due to a third-party PropTypes ' + 'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.', propFullName, componentName) : void 0;
          manualPropTypeCallCache[cacheKey] = true;
        }
      }
    }
    if (props[propName] == null) {
      var locationName = ReactPropTypeLocationNames[location];
      if (isRequired) {
        if (props[propName] === null) {
          return new PropTypeError('The ' + locationName + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
        }
        return new PropTypeError('The ' + locationName + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
      }
      return null;
    } else {
      return validate(props, propName, componentName, location, propFullName);
    }
  }

  var chainedCheckType = checkType.bind(null, false);
  chainedCheckType.isRequired = checkType.bind(null, true);

  return chainedCheckType;
}

function createPrimitiveTypeChecker(expectedType) {
  function validate(props, propName, componentName, location, propFullName, secret) {
    var propValue = props[propName];
    var propType = getPropType(propValue);
    if (propType !== expectedType) {
      var locationName = ReactPropTypeLocationNames[location];
      // `propValue` being instance of, say, date/regexp, pass the 'object'
      // check, but we can offer a more precise error message here rather than
      // 'of type `object`'.
      var preciseType = getPreciseType(propValue);

      return new PropTypeError('Invalid ' + locationName + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
    }
    return null;
  }
  return createChainableTypeChecker(validate);
}

function createAnyTypeChecker() {
  return createChainableTypeChecker(emptyFunction.thatReturns(null));
}

function createArrayOfTypeChecker(typeChecker) {
  function validate(props, propName, componentName, location, propFullName) {
    if (typeof typeChecker !== 'function') {
      return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
    }
    var propValue = props[propName];
    if (!Array.isArray(propValue)) {
      var locationName = ReactPropTypeLocationNames[location];
      var propType = getPropType(propValue);
      return new PropTypeError('Invalid ' + locationName + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
    }
    for (var i = 0; i < propValue.length; i++) {
      var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
      if (error instanceof Error) {
        return error;
      }
    }
    return null;
  }
  return createChainableTypeChecker(validate);
}

function createElementTypeChecker() {
  function validate(props, propName, componentName, location, propFullName) {
    var propValue = props[propName];
    if (!ReactElement.isValidElement(propValue)) {
      var locationName = ReactPropTypeLocationNames[location];
      var propType = getPropType(propValue);
      return new PropTypeError('Invalid ' + locationName + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
    }
    return null;
  }
  return createChainableTypeChecker(validate);
}

function createInstanceTypeChecker(expectedClass) {
  function validate(props, propName, componentName, location, propFullName) {
    if (!(props[propName] instanceof expectedClass)) {
      var locationName = ReactPropTypeLocationNames[location];
      var expectedClassName = expectedClass.name || ANONYMOUS;
      var actualClassName = getClassName(props[propName]);
      return new PropTypeError('Invalid ' + locationName + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
    }
    return null;
  }
  return createChainableTypeChecker(validate);
}

function createEnumTypeChecker(expectedValues) {
  if (!Array.isArray(expectedValues)) {
    "development" !== 'production' ? warning(false, 'Invalid argument supplied to oneOf, expected an instance of array.') : void 0;
    return emptyFunction.thatReturnsNull;
  }

  function validate(props, propName, componentName, location, propFullName) {
    var propValue = props[propName];
    for (var i = 0; i < expectedValues.length; i++) {
      if (is(propValue, expectedValues[i])) {
        return null;
      }
    }

    var locationName = ReactPropTypeLocationNames[location];
    var valuesString = JSON.stringify(expectedValues);
    return new PropTypeError('Invalid ' + locationName + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
  }
  return createChainableTypeChecker(validate);
}

function createObjectOfTypeChecker(typeChecker) {
  function validate(props, propName, componentName, location, propFullName) {
    if (typeof typeChecker !== 'function') {
      return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
    }
    var propValue = props[propName];
    var propType = getPropType(propValue);
    if (propType !== 'object') {
      var locationName = ReactPropTypeLocationNames[location];
      return new PropTypeError('Invalid ' + locationName + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
    }
    for (var key in propValue) {
      if (propValue.hasOwnProperty(key)) {
        var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error instanceof Error) {
          return error;
        }
      }
    }
    return null;
  }
  return createChainableTypeChecker(validate);
}

function createUnionTypeChecker(arrayOfTypeCheckers) {
  if (!Array.isArray(arrayOfTypeCheckers)) {
    "development" !== 'production' ? warning(false, 'Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
    return emptyFunction.thatReturnsNull;
  }

  function validate(props, propName, componentName, location, propFullName) {
    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
        return null;
      }
    }

    var locationName = ReactPropTypeLocationNames[location];
    return new PropTypeError('Invalid ' + locationName + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
  }
  return createChainableTypeChecker(validate);
}

function createNodeChecker() {
  function validate(props, propName, componentName, location, propFullName) {
    if (!isNode(props[propName])) {
      var locationName = ReactPropTypeLocationNames[location];
      return new PropTypeError('Invalid ' + locationName + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
    }
    return null;
  }
  return createChainableTypeChecker(validate);
}

function createShapeTypeChecker(shapeTypes) {
  function validate(props, propName, componentName, location, propFullName) {
    var propValue = props[propName];
    var propType = getPropType(propValue);
    if (propType !== 'object') {
      var locationName = ReactPropTypeLocationNames[location];
      return new PropTypeError('Invalid ' + locationName + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
    }
    for (var key in shapeTypes) {
      var checker = shapeTypes[key];
      if (!checker) {
        continue;
      }
      var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
      if (error) {
        return error;
      }
    }
    return null;
  }
  return createChainableTypeChecker(validate);
}

function isNode(propValue) {
  switch (typeof propValue) {
    case 'number':
    case 'string':
    case 'undefined':
      return true;
    case 'boolean':
      return !propValue;
    case 'object':
      if (Array.isArray(propValue)) {
        return propValue.every(isNode);
      }
      if (propValue === null || ReactElement.isValidElement(propValue)) {
        return true;
      }

      var iteratorFn = getIteratorFn(propValue);
      if (iteratorFn) {
        var iterator = iteratorFn.call(propValue);
        var step;
        if (iteratorFn !== propValue.entries) {
          while (!(step = iterator.next()).done) {
            if (!isNode(step.value)) {
              return false;
            }
          }
        } else {
          // Iterator will provide entry [k,v] tuples rather than values.
          while (!(step = iterator.next()).done) {
            var entry = step.value;
            if (entry) {
              if (!isNode(entry[1])) {
                return false;
              }
            }
          }
        }
      } else {
        return false;
      }

      return true;
    default:
      return false;
  }
}

function isSymbol(propType, propValue) {
  // Native Symbol.
  if (propType === 'symbol') {
    return true;
  }

  // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
  if (propValue['@@toStringTag'] === 'Symbol') {
    return true;
  }

  // Fallback for non-spec compliant Symbols which are polyfilled.
  if (typeof Symbol === 'function' && propValue instanceof Symbol) {
    return true;
  }

  return false;
}

// Equivalent of `typeof` but with special handling for array and regexp.
function getPropType(propValue) {
  var propType = typeof propValue;
  if (Array.isArray(propValue)) {
    return 'array';
  }
  if (propValue instanceof RegExp) {
    // Old webkits (at least until Android 4.0) return 'function' rather than
    // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
    // passes PropTypes.object.
    return 'object';
  }
  if (isSymbol(propType, propValue)) {
    return 'symbol';
  }
  return propType;
}

// This handles more types than `getPropType`. Only used for error messages.
// See `createPrimitiveTypeChecker`.
function getPreciseType(propValue) {
  var propType = getPropType(propValue);
  if (propType === 'object') {
    if (propValue instanceof Date) {
      return 'date';
    } else if (propValue instanceof RegExp) {
      return 'regexp';
    }
  }
  return propType;
}

// Returns class name of the object, if any.
function getClassName(propValue) {
  if (!propValue.constructor || !propValue.constructor.name) {
    return ANONYMOUS;
  }
  return propValue.constructor.name;
}

module.exports = ReactPropTypes;
},{"./ReactElement":16,"./ReactPropTypeLocationNames":20,"./ReactPropTypesSecret":22,"./getIteratorFn":27,"fbjs/lib/emptyFunction":1,"fbjs/lib/warning":4}],22:[function(require,module,exports){
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

'use strict';

var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;
},{}],23:[function(require,module,exports){
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

'use strict';

var _assign = require('object-assign');

var ReactComponent = require('./ReactComponent');
var ReactNoopUpdateQueue = require('./ReactNoopUpdateQueue');

var emptyObject = require('fbjs/lib/emptyObject');

/**
 * Base class helpers for the updating state of a component.
 */
function ReactPureComponent(props, context, updater) {
  // Duplicated from ReactComponent.
  this.props = props;
  this.context = context;
  this.refs = emptyObject;
  // We initialize the default updater but the real one gets injected by the
  // renderer.
  this.updater = updater || ReactNoopUpdateQueue;
}

function ComponentDummy() {}
ComponentDummy.prototype = ReactComponent.prototype;
ReactPureComponent.prototype = new ComponentDummy();
ReactPureComponent.prototype.constructor = ReactPureComponent;
// Avoid an extra prototype jump for these methods.
_assign(ReactPureComponent.prototype, ReactComponent.prototype);
ReactPureComponent.prototype.isPureReactComponent = true;

module.exports = ReactPureComponent;
},{"./ReactComponent":12,"./ReactNoopUpdateQueue":19,"fbjs/lib/emptyObject":2,"object-assign":5}],24:[function(require,module,exports){
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

'use strict';

module.exports = '15.4.2';
},{}],25:[function(require,module,exports){
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

'use strict';

var canDefineProperty = false;
if ("development" !== 'production') {
  try {
    // $FlowFixMe https://github.com/facebook/flow/issues/285
    Object.defineProperty({}, 'x', { get: function () {} });
    canDefineProperty = true;
  } catch (x) {
    // IE will fail on defineProperty
  }
}

module.exports = canDefineProperty;
},{}],26:[function(require,module,exports){
(function (process){
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

'use strict';

var _prodInvariant = require('./reactProdInvariant');

var ReactPropTypeLocationNames = require('./ReactPropTypeLocationNames');
var ReactPropTypesSecret = require('./ReactPropTypesSecret');

var invariant = require('fbjs/lib/invariant');
var warning = require('fbjs/lib/warning');

var ReactComponentTreeHook;

if (typeof process !== 'undefined' && process.env && "development" === 'test') {
  // Temporary hack.
  // Inline requires don't work well with Jest:
  // https://github.com/facebook/react/issues/7240
  // Remove the inline requires when we don't need them anymore:
  // https://github.com/facebook/react/pull/7178
  ReactComponentTreeHook = require('./ReactComponentTreeHook');
}

var loggedTypeFailures = {};

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?object} element The React element that is being type-checked
 * @param {?number} debugID The React component instance that is being type-checked
 * @private
 */
function checkReactTypeSpec(typeSpecs, values, location, componentName, element, debugID) {
  for (var typeSpecName in typeSpecs) {
    if (typeSpecs.hasOwnProperty(typeSpecName)) {
      var error;
      // Prop type validation may throw. In case they do, we don't want to
      // fail the render phase where it didn't fail before. So we log it.
      // After these have been cleaned up, we'll let them throw.
      try {
        // This is intentionally an invariant that gets caught. It's the same
        // behavior as without this statement except with a better message.
        !(typeof typeSpecs[typeSpecName] === 'function') ? "development" !== 'production' ? invariant(false, '%s: %s type `%s` is invalid; it must be a function, usually from React.PropTypes.', componentName || 'React class', ReactPropTypeLocationNames[location], typeSpecName) : _prodInvariant('84', componentName || 'React class', ReactPropTypeLocationNames[location], typeSpecName) : void 0;
        error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
      } catch (ex) {
        error = ex;
      }
      "development" !== 'production' ? warning(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', ReactPropTypeLocationNames[location], typeSpecName, typeof error) : void 0;
      if (error instanceof Error && !(error.message in loggedTypeFailures)) {
        // Only monitor this failure once because there tends to be a lot of the
        // same error.
        loggedTypeFailures[error.message] = true;

        var componentStackInfo = '';

        if ("development" !== 'production') {
          if (!ReactComponentTreeHook) {
            ReactComponentTreeHook = require('./ReactComponentTreeHook');
          }
          if (debugID !== null) {
            componentStackInfo = ReactComponentTreeHook.getStackAddendumByID(debugID);
          } else if (element !== null) {
            componentStackInfo = ReactComponentTreeHook.getCurrentStackAddendum(element);
          }
        }

        "development" !== 'production' ? warning(false, 'Failed %s type: %s%s', location, error.message, componentStackInfo) : void 0;
      }
    }
  }
}

module.exports = checkReactTypeSpec;
}).call(this,require('_process'))

},{"./ReactComponentTreeHook":13,"./ReactPropTypeLocationNames":20,"./ReactPropTypesSecret":22,"./reactProdInvariant":29,"_process":6,"fbjs/lib/invariant":3,"fbjs/lib/warning":4}],27:[function(require,module,exports){
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */

'use strict';

/* global Symbol */

var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

/**
 * Returns the iterator method function contained on the iterable object.
 *
 * Be sure to invoke the function with the iterable as context:
 *
 *     var iteratorFn = getIteratorFn(myIterable);
 *     if (iteratorFn) {
 *       var iterator = iteratorFn.call(myIterable);
 *       ...
 *     }
 *
 * @param {?object} maybeIterable
 * @return {?function}
 */
function getIteratorFn(maybeIterable) {
  var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
  if (typeof iteratorFn === 'function') {
    return iteratorFn;
  }
}

module.exports = getIteratorFn;
},{}],28:[function(require,module,exports){
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */
'use strict';

var _prodInvariant = require('./reactProdInvariant');

var ReactElement = require('./ReactElement');

var invariant = require('fbjs/lib/invariant');

/**
 * Returns the first child in a collection of children and verifies that there
 * is only one child in the collection.
 *
 * See https://facebook.github.io/react/docs/top-level-api.html#react.children.only
 *
 * The current implementation of this function assumes that a single child gets
 * passed without a wrapper, but the purpose of this helper function is to
 * abstract away the particular structure of children.
 *
 * @param {?object} children Child collection structure.
 * @return {ReactElement} The first and only `ReactElement` contained in the
 * structure.
 */
function onlyChild(children) {
  !ReactElement.isValidElement(children) ? "development" !== 'production' ? invariant(false, 'React.Children.only expected to receive a single React element child.') : _prodInvariant('143') : void 0;
  return children;
}

module.exports = onlyChild;
},{"./ReactElement":16,"./reactProdInvariant":29,"fbjs/lib/invariant":3}],29:[function(require,module,exports){
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 */
'use strict';

/**
 * WARNING: DO NOT manually require this module.
 * This is a replacement for `invariant(...)` used by the error code system
 * and will _only_ be required by the corresponding babel pass.
 * It always throws.
 */

function reactProdInvariant(code) {
  var argCount = arguments.length - 1;

  var message = 'Minified React error #' + code + '; visit ' + 'http://facebook.github.io/react/docs/error-decoder.html?invariant=' + code;

  for (var argIdx = 0; argIdx < argCount; argIdx++) {
    message += '&args[]=' + encodeURIComponent(arguments[argIdx + 1]);
  }

  message += ' for the full message or use the non-minified dev environment' + ' for full errors and additional helpful warnings.';

  var error = new Error(message);
  error.name = 'Invariant Violation';
  error.framesToPop = 1; // we don't care about reactProdInvariant's own frame

  throw error;
}

module.exports = reactProdInvariant;
},{}],30:[function(require,module,exports){
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 */

'use strict';

var _prodInvariant = require('./reactProdInvariant');

var ReactCurrentOwner = require('./ReactCurrentOwner');
var REACT_ELEMENT_TYPE = require('./ReactElementSymbol');

var getIteratorFn = require('./getIteratorFn');
var invariant = require('fbjs/lib/invariant');
var KeyEscapeUtils = require('./KeyEscapeUtils');
var warning = require('fbjs/lib/warning');

var SEPARATOR = '.';
var SUBSEPARATOR = ':';

/**
 * This is inlined from ReactElement since this file is shared between
 * isomorphic and renderers. We could extract this to a
 *
 */

/**
 * TODO: Test that a single child and an array with one item have the same key
 * pattern.
 */

var didWarnAboutMaps = false;

/**
 * Generate a key string that identifies a component within a set.
 *
 * @param {*} component A component that could contain a manual key.
 * @param {number} index Index that is used if a manual key is not provided.
 * @return {string}
 */
function getComponentKey(component, index) {
  // Do some typechecking here since we call this blindly. We want to ensure
  // that we don't block potential future ES APIs.
  if (component && typeof component === 'object' && component.key != null) {
    // Explicit key
    return KeyEscapeUtils.escape(component.key);
  }
  // Implicit key determined by the index in the set
  return index.toString(36);
}

/**
 * @param {?*} children Children tree container.
 * @param {!string} nameSoFar Name of the key path so far.
 * @param {!function} callback Callback to invoke with each child found.
 * @param {?*} traverseContext Used to pass information throughout the traversal
 * process.
 * @return {!number} The number of children in this subtree.
 */
function traverseAllChildrenImpl(children, nameSoFar, callback, traverseContext) {
  var type = typeof children;

  if (type === 'undefined' || type === 'boolean') {
    // All of the above are perceived as null.
    children = null;
  }

  if (children === null || type === 'string' || type === 'number' ||
  // The following is inlined from ReactElement. This means we can optimize
  // some checks. React Fiber also inlines this logic for similar purposes.
  type === 'object' && children.$$typeof === REACT_ELEMENT_TYPE) {
    callback(traverseContext, children,
    // If it's the only child, treat the name as if it was wrapped in an array
    // so that it's consistent if the number of children grows.
    nameSoFar === '' ? SEPARATOR + getComponentKey(children, 0) : nameSoFar);
    return 1;
  }

  var child;
  var nextName;
  var subtreeCount = 0; // Count of children found in the current subtree.
  var nextNamePrefix = nameSoFar === '' ? SEPARATOR : nameSoFar + SUBSEPARATOR;

  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      child = children[i];
      nextName = nextNamePrefix + getComponentKey(child, i);
      subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
    }
  } else {
    var iteratorFn = getIteratorFn(children);
    if (iteratorFn) {
      var iterator = iteratorFn.call(children);
      var step;
      if (iteratorFn !== children.entries) {
        var ii = 0;
        while (!(step = iterator.next()).done) {
          child = step.value;
          nextName = nextNamePrefix + getComponentKey(child, ii++);
          subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
        }
      } else {
        if ("development" !== 'production') {
          var mapsAsChildrenAddendum = '';
          if (ReactCurrentOwner.current) {
            var mapsAsChildrenOwnerName = ReactCurrentOwner.current.getName();
            if (mapsAsChildrenOwnerName) {
              mapsAsChildrenAddendum = ' Check the render method of `' + mapsAsChildrenOwnerName + '`.';
            }
          }
          "development" !== 'production' ? warning(didWarnAboutMaps, 'Using Maps as children is not yet fully supported. It is an ' + 'experimental feature that might be removed. Convert it to a ' + 'sequence / iterable of keyed ReactElements instead.%s', mapsAsChildrenAddendum) : void 0;
          didWarnAboutMaps = true;
        }
        // Iterator will provide entry [k,v] tuples rather than values.
        while (!(step = iterator.next()).done) {
          var entry = step.value;
          if (entry) {
            child = entry[1];
            nextName = nextNamePrefix + KeyEscapeUtils.escape(entry[0]) + SUBSEPARATOR + getComponentKey(child, 0);
            subtreeCount += traverseAllChildrenImpl(child, nextName, callback, traverseContext);
          }
        }
      }
    } else if (type === 'object') {
      var addendum = '';
      if ("development" !== 'production') {
        addendum = ' If you meant to render a collection of children, use an array ' + 'instead or wrap the object using createFragment(object) from the ' + 'React add-ons.';
        if (children._isReactElement) {
          addendum = ' It looks like you\'re using an element created by a different ' + 'version of React. Make sure to use only one copy of React.';
        }
        if (ReactCurrentOwner.current) {
          var name = ReactCurrentOwner.current.getName();
          if (name) {
            addendum += ' Check the render method of `' + name + '`.';
          }
        }
      }
      var childrenString = String(children);
      !false ? "development" !== 'production' ? invariant(false, 'Objects are not valid as a React child (found: %s).%s', childrenString === '[object Object]' ? 'object with keys {' + Object.keys(children).join(', ') + '}' : childrenString, addendum) : _prodInvariant('31', childrenString === '[object Object]' ? 'object with keys {' + Object.keys(children).join(', ') + '}' : childrenString, addendum) : void 0;
    }
  }

  return subtreeCount;
}

/**
 * Traverses children that are typically specified as `props.children`, but
 * might also be specified through attributes:
 *
 * - `traverseAllChildren(this.props.children, ...)`
 * - `traverseAllChildren(this.props.leftPanelChildren, ...)`
 *
 * The `traverseContext` is an optional argument that is passed through the
 * entire traversal. It can be used to store accumulations or anything else that
 * the callback might find relevant.
 *
 * @param {?*} children Children tree object.
 * @param {!function} callback To invoke upon traversing each child.
 * @param {?*} traverseContext Context for traversal.
 * @return {!number} The number of children in this subtree.
 */
function traverseAllChildren(children, callback, traverseContext) {
  if (children == null) {
    return 0;
  }

  return traverseAllChildrenImpl(children, '', callback, traverseContext);
}

module.exports = traverseAllChildren;
},{"./KeyEscapeUtils":7,"./ReactCurrentOwner":14,"./ReactElementSymbol":17,"./getIteratorFn":27,"./reactProdInvariant":29,"fbjs/lib/invariant":3,"fbjs/lib/warning":4}],31:[function(require,module,exports){
'use strict';

module.exports = require('./lib/React');

},{"./lib/React":9}],32:[function(require,module,exports){
(function(self) {
  'use strict';

  if (self.fetch) {
    return
  }

  var support = {
    searchParams: 'URLSearchParams' in self,
    iterable: 'Symbol' in self && 'iterator' in Symbol,
    blob: 'FileReader' in self && 'Blob' in self && (function() {
      try {
        new Blob()
        return true
      } catch(e) {
        return false
      }
    })(),
    formData: 'FormData' in self,
    arrayBuffer: 'ArrayBuffer' in self
  }

  if (support.arrayBuffer) {
    var viewClasses = [
      '[object Int8Array]',
      '[object Uint8Array]',
      '[object Uint8ClampedArray]',
      '[object Int16Array]',
      '[object Uint16Array]',
      '[object Int32Array]',
      '[object Uint32Array]',
      '[object Float32Array]',
      '[object Float64Array]'
    ]

    var isDataView = function(obj) {
      return obj && DataView.prototype.isPrototypeOf(obj)
    }

    var isArrayBufferView = ArrayBuffer.isView || function(obj) {
      return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1
    }
  }

  function normalizeName(name) {
    if (typeof name !== 'string') {
      name = String(name)
    }
    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
      throw new TypeError('Invalid character in header field name')
    }
    return name.toLowerCase()
  }

  function normalizeValue(value) {
    if (typeof value !== 'string') {
      value = String(value)
    }
    return value
  }

  // Build a destructive iterator for the value list
  function iteratorFor(items) {
    var iterator = {
      next: function() {
        var value = items.shift()
        return {done: value === undefined, value: value}
      }
    }

    if (support.iterable) {
      iterator[Symbol.iterator] = function() {
        return iterator
      }
    }

    return iterator
  }

  function Headers(headers) {
    this.map = {}

    if (headers instanceof Headers) {
      headers.forEach(function(value, name) {
        this.append(name, value)
      }, this)

    } else if (headers) {
      Object.getOwnPropertyNames(headers).forEach(function(name) {
        this.append(name, headers[name])
      }, this)
    }
  }

  Headers.prototype.append = function(name, value) {
    name = normalizeName(name)
    value = normalizeValue(value)
    var list = this.map[name]
    if (!list) {
      list = []
      this.map[name] = list
    }
    list.push(value)
  }

  Headers.prototype['delete'] = function(name) {
    delete this.map[normalizeName(name)]
  }

  Headers.prototype.get = function(name) {
    var values = this.map[normalizeName(name)]
    return values ? values[0] : null
  }

  Headers.prototype.getAll = function(name) {
    return this.map[normalizeName(name)] || []
  }

  Headers.prototype.has = function(name) {
    return this.map.hasOwnProperty(normalizeName(name))
  }

  Headers.prototype.set = function(name, value) {
    this.map[normalizeName(name)] = [normalizeValue(value)]
  }

  Headers.prototype.forEach = function(callback, thisArg) {
    Object.getOwnPropertyNames(this.map).forEach(function(name) {
      this.map[name].forEach(function(value) {
        callback.call(thisArg, value, name, this)
      }, this)
    }, this)
  }

  Headers.prototype.keys = function() {
    var items = []
    this.forEach(function(value, name) { items.push(name) })
    return iteratorFor(items)
  }

  Headers.prototype.values = function() {
    var items = []
    this.forEach(function(value) { items.push(value) })
    return iteratorFor(items)
  }

  Headers.prototype.entries = function() {
    var items = []
    this.forEach(function(value, name) { items.push([name, value]) })
    return iteratorFor(items)
  }

  if (support.iterable) {
    Headers.prototype[Symbol.iterator] = Headers.prototype.entries
  }

  function consumed(body) {
    if (body.bodyUsed) {
      return Promise.reject(new TypeError('Already read'))
    }
    body.bodyUsed = true
  }

  function fileReaderReady(reader) {
    return new Promise(function(resolve, reject) {
      reader.onload = function() {
        resolve(reader.result)
      }
      reader.onerror = function() {
        reject(reader.error)
      }
    })
  }

  function readBlobAsArrayBuffer(blob) {
    var reader = new FileReader()
    var promise = fileReaderReady(reader)
    reader.readAsArrayBuffer(blob)
    return promise
  }

  function readBlobAsText(blob) {
    var reader = new FileReader()
    var promise = fileReaderReady(reader)
    reader.readAsText(blob)
    return promise
  }

  function readArrayBufferAsText(buf) {
    var view = new Uint8Array(buf)
    var chars = new Array(view.length)

    for (var i = 0; i < view.length; i++) {
      chars[i] = String.fromCharCode(view[i])
    }
    return chars.join('')
  }

  function bufferClone(buf) {
    if (buf.slice) {
      return buf.slice(0)
    } else {
      var view = new Uint8Array(buf.byteLength)
      view.set(new Uint8Array(buf))
      return view.buffer
    }
  }

  function Body() {
    this.bodyUsed = false

    this._initBody = function(body) {
      this._bodyInit = body
      if (!body) {
        this._bodyText = ''
      } else if (typeof body === 'string') {
        this._bodyText = body
      } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
        this._bodyBlob = body
      } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
        this._bodyFormData = body
      } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
        this._bodyText = body.toString()
      } else if (support.arrayBuffer && support.blob && isDataView(body)) {
        this._bodyArrayBuffer = bufferClone(body.buffer)
        // IE 10-11 can't handle a DataView body.
        this._bodyInit = new Blob([this._bodyArrayBuffer])
      } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
        this._bodyArrayBuffer = bufferClone(body)
      } else {
        throw new Error('unsupported BodyInit type')
      }

      if (!this.headers.get('content-type')) {
        if (typeof body === 'string') {
          this.headers.set('content-type', 'text/plain;charset=UTF-8')
        } else if (this._bodyBlob && this._bodyBlob.type) {
          this.headers.set('content-type', this._bodyBlob.type)
        } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
          this.headers.set('content-type', 'application/x-www-form-urlencoded;charset=UTF-8')
        }
      }
    }

    if (support.blob) {
      this.blob = function() {
        var rejected = consumed(this)
        if (rejected) {
          return rejected
        }

        if (this._bodyBlob) {
          return Promise.resolve(this._bodyBlob)
        } else if (this._bodyArrayBuffer) {
          return Promise.resolve(new Blob([this._bodyArrayBuffer]))
        } else if (this._bodyFormData) {
          throw new Error('could not read FormData body as blob')
        } else {
          return Promise.resolve(new Blob([this._bodyText]))
        }
      }

      this.arrayBuffer = function() {
        if (this._bodyArrayBuffer) {
          return consumed(this) || Promise.resolve(this._bodyArrayBuffer)
        } else {
          return this.blob().then(readBlobAsArrayBuffer)
        }
      }
    }

    this.text = function() {
      var rejected = consumed(this)
      if (rejected) {
        return rejected
      }

      if (this._bodyBlob) {
        return readBlobAsText(this._bodyBlob)
      } else if (this._bodyArrayBuffer) {
        return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer))
      } else if (this._bodyFormData) {
        throw new Error('could not read FormData body as text')
      } else {
        return Promise.resolve(this._bodyText)
      }
    }

    if (support.formData) {
      this.formData = function() {
        return this.text().then(decode)
      }
    }

    this.json = function() {
      return this.text().then(JSON.parse)
    }

    return this
  }

  // HTTP methods whose capitalization should be normalized
  var methods = ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'POST', 'PUT']

  function normalizeMethod(method) {
    var upcased = method.toUpperCase()
    return (methods.indexOf(upcased) > -1) ? upcased : method
  }

  function Request(input, options) {
    options = options || {}
    var body = options.body

    if (typeof input === 'string') {
      this.url = input
    } else {
      if (input.bodyUsed) {
        throw new TypeError('Already read')
      }
      this.url = input.url
      this.credentials = input.credentials
      if (!options.headers) {
        this.headers = new Headers(input.headers)
      }
      this.method = input.method
      this.mode = input.mode
      if (!body && input._bodyInit != null) {
        body = input._bodyInit
        input.bodyUsed = true
      }
    }

    this.credentials = options.credentials || this.credentials || 'omit'
    if (options.headers || !this.headers) {
      this.headers = new Headers(options.headers)
    }
    this.method = normalizeMethod(options.method || this.method || 'GET')
    this.mode = options.mode || this.mode || null
    this.referrer = null

    if ((this.method === 'GET' || this.method === 'HEAD') && body) {
      throw new TypeError('Body not allowed for GET or HEAD requests')
    }
    this._initBody(body)
  }

  Request.prototype.clone = function() {
    return new Request(this, { body: this._bodyInit })
  }

  function decode(body) {
    var form = new FormData()
    body.trim().split('&').forEach(function(bytes) {
      if (bytes) {
        var split = bytes.split('=')
        var name = split.shift().replace(/\+/g, ' ')
        var value = split.join('=').replace(/\+/g, ' ')
        form.append(decodeURIComponent(name), decodeURIComponent(value))
      }
    })
    return form
  }

  function parseHeaders(rawHeaders) {
    var headers = new Headers()
    rawHeaders.split('\r\n').forEach(function(line) {
      var parts = line.split(':')
      var key = parts.shift().trim()
      if (key) {
        var value = parts.join(':').trim()
        headers.append(key, value)
      }
    })
    return headers
  }

  Body.call(Request.prototype)

  function Response(bodyInit, options) {
    if (!options) {
      options = {}
    }

    this.type = 'default'
    this.status = 'status' in options ? options.status : 200
    this.ok = this.status >= 200 && this.status < 300
    this.statusText = 'statusText' in options ? options.statusText : 'OK'
    this.headers = new Headers(options.headers)
    this.url = options.url || ''
    this._initBody(bodyInit)
  }

  Body.call(Response.prototype)

  Response.prototype.clone = function() {
    return new Response(this._bodyInit, {
      status: this.status,
      statusText: this.statusText,
      headers: new Headers(this.headers),
      url: this.url
    })
  }

  Response.error = function() {
    var response = new Response(null, {status: 0, statusText: ''})
    response.type = 'error'
    return response
  }

  var redirectStatuses = [301, 302, 303, 307, 308]

  Response.redirect = function(url, status) {
    if (redirectStatuses.indexOf(status) === -1) {
      throw new RangeError('Invalid status code')
    }

    return new Response(null, {status: status, headers: {location: url}})
  }

  self.Headers = Headers
  self.Request = Request
  self.Response = Response

  self.fetch = function(input, init) {
    return new Promise(function(resolve, reject) {
      var request = new Request(input, init)
      var xhr = new XMLHttpRequest()

      xhr.onload = function() {
        var options = {
          status: xhr.status,
          statusText: xhr.statusText,
          headers: parseHeaders(xhr.getAllResponseHeaders() || '')
        }
        options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL')
        var body = 'response' in xhr ? xhr.response : xhr.responseText
        resolve(new Response(body, options))
      }

      xhr.onerror = function() {
        reject(new TypeError('Network request failed'))
      }

      xhr.ontimeout = function() {
        reject(new TypeError('Network request failed'))
      }

      xhr.open(request.method, request.url, true)

      if (request.credentials === 'include') {
        xhr.withCredentials = true
      }

      if ('responseType' in xhr && support.blob) {
        xhr.responseType = 'blob'
      }

      request.headers.forEach(function(value, name) {
        xhr.setRequestHeader(name, value)
      })

      xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit)
    })
  }
  self.fetch.polyfill = true
})(typeof self !== 'undefined' ? self : this);

},{}],"data.js":[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key]}}}return target};exports.getData=getData;require('whatwg-fetch');function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true})}else{obj[key]=value}return obj}var rootUrl='/api/';function getData(sources,component,notification){var _iteratorNormalCompletion=true;var _didIteratorError=false;var _iteratorError=undefined;try{var _loop=function _loop(){var _ref=_step.value;var type=_ref.type,path=_ref.path,branch=_ref.branch,data=_ref.data,callback=_ref.callback;notification.notify({kind:'special',text:branch+' transferring data ...',busy:1});var settings={credentials:'same-origin'};if(data!=null){settings=_extends({},settings,{method:'POST',body:JSON.stringify(data),headers:{'Content-Type':'application/json'}})}fetch(''+rootUrl+type+path,settings).then(function(response){return response.json()}).then(function(responseData){var _iteratorNormalCompletion2=true;var _didIteratorError2=false;var _iteratorError2=undefined;try{for(var _iterator2=(responseData.msgs||[])[Symbol.iterator](),_step2;!(_iteratorNormalCompletion2=(_step2=_iterator2.next()).done);_iteratorNormalCompletion2=true){var msg=_step2.value;notification.notify(msg)}}catch(err){_didIteratorError2=true;_iteratorError2=err}finally{try{if(!_iteratorNormalCompletion2&&_iterator2.return){_iterator2.return()}}finally{if(_didIteratorError2){throw _iteratorError2}}}var kind=responseData.good?'info':'error';var statm=responseData.good?'data fetched':'server error';notification.notify({kind:kind,text:branch+' '+statm+'.',busy:-1});try{if(callback==null){component.setState(_extends({},component.state||{},_defineProperty({},branch,responseData.data)))}else{callback(responseData.data)}notification.notify({kind:'info',text:branch+' processed.',busy:0})}catch(error){console.error(error);notification.notify({kind:'error',text:branch+' processing error.',busy:0})}}).catch(function(error){console.error(error);notification.notify({kind:'error',text:branch+' transmission error.',busy:-1})})};for(var _iterator=sources[Symbol.iterator](),_step;!(_iteratorNormalCompletion=(_step=_iterator.next()).done);_iteratorNormalCompletion=true){_loop()}}catch(err){_didIteratorError=true;_iteratorError=err}finally{try{if(!_iteratorNormalCompletion&&_iterator.return){_iterator.return()}}finally{if(_didIteratorError){throw _iteratorError}}}}
},{"whatwg-fetch":32}],"europe.geo.js":[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:true});var countryBorders=exports.countryBorders={"features":[{"geometry":{"coordinates":[],"type":"Polygon"},"type":"Feature","properties":{"iso2":"AD","lng":1.5,"lat":42.5}},{"geometry":{"coordinates":[[[19.4,41],[19.5,41.3],[19.5,41.6],[19.6,41.7],[19.5,41.8],[19.4,41.9],[19.3,41.9],[19.4,42.1],[19.5,42.4],[19.6,42.6],[19.7,42.7],[19.7,42.5],[19.9,42.5],[20.1,42.6],[20.2,42.5],[20.2,42.3],[20.4,42.3],[20.5,42.2],[20.6,41.9],[20.5,41.7],[20.5,41.5],[20.5,41.4],[20.5,41.2],[20.6,41.1],[20.7,40.9],[20.9,40.9],[21,40.8],[21.1,40.7],[21,40.6],[20.9,40.5],[20.8,40.4],[20.7,40.3],[20.7,40.1],[20.5,40.1],[20.3,40],[20.4,39.9],[20.3,39.8],[20.2,39.6],[20.1,39.7],[20,39.8],[19.9,39.9],[19.8,40.1],[19.6,40.1],[19.4,40.2],[19.3,40.4],[19.5,40.3],[19.5,40.6],[19.3,40.6],[19.4,40.7],[19.4,40.9],[19.5,41],[19.4,41]]],"type":"Polygon"},"type":"Feature","properties":{"iso2":"AL","lng":20,"lat":41}},{"geometry":{"coordinates":[[[[45.2,41.2],[45.1,41.1],[45.4,41],[45.6,40.8],[45.5,40.7],[45.4,40.6],[45.6,40.4],[45.9,40.3],[46,40.2],[45.9,40],[45.7,40],[45.8,39.9],[45.9,39.8],[46,39.7],[46.2,39.6],[46.4,39.6],[46.5,39.5],[46.4,39.4],[46.6,39.2],[46.4,39.2],[46.5,39],[46.4,38.9],[46.2,38.9],[46.1,38.9],[46,39.3],[45.8,39.4],[45.8,39.6],[45.6,39.6],[45.5,39.5],[45.3,39.6],[45,39.8],[44.9,39.7],[44.7,39.7],[44.6,39.9],[44.5,40],[44.3,40],[44,40],[43.7,40.1],[43.7,40.2],[43.6,40.4],[43.7,40.5],[43.7,40.7],[43.7,40.8],[43.6,41],[43.5,41.1],[43.7,41.1],[43.8,41.2],[44,41.2],[44.2,41.2],[44.4,41.2],[44.6,41.2],[44.8,41.2],[45,41.3],[45.1,41.2],[45.2,41.2]]],[]],"type":"MultiPolygon"},"type":"Feature","properties":{"iso2":"AM","lng":45,"lat":40}},{"geometry":{"coordinates":[[[13.8,48.8],[14.2,48.6],[14.6,48.6],[14.9,48.8],[15.1,49],[15.5,49],[15.8,48.9],[16.4,48.7],[16.7,48.8],[16.9,48.6],[16.9,48.3],[17.1,48.1],[17.1,47.8],[16.8,47.7],[16.4,47.7],[16.7,47.5],[16.4,47.2],[16.3,47],[15.8,46.7],[15.1,46.6],[14.8,46.5],[13.9,46.5],[13.6,46.6],[12.8,46.7],[12.5,46.7],[12.1,47],[11.8,47],[11.2,47],[10.9,46.8],[10.6,46.8],[10.3,46.9],[9.9,46.9],[9.6,47.2],[9.7,47.5],[10,47.5],[10.4,47.4],[10.4,47.6],[10.9,47.5],[11.5,47.5],[12,47.6],[12.5,47.7],[12.7,47.7],[13.1,47.6],[12.9,47.8],[12.8,48],[13.2,48.3],[13.4,48.5],[13.7,48.6],[13.8,48.8]]],"type":"Polygon"},"type":"Feature","properties":{"iso2":"AT","lng":13.3,"lat":47.3}},{"geometry":{"coordinates":[[[[46.6,41.9],[46.9,41.7],[47.3,41.4],[47.7,41.2],[48,41.4],[48.5,41.8],[48.8,41.7],[49.1,41.3],[49.2,41],[49.5,40.7],[49.9,40.6],[50.4,40.4],[50.1,40.4],[49.5,40.2],[49.4,39.9],[49.3,39.4],[49.2,39.3],[49.1,39.1],[49,39],[48.9,38.5],[48.7,38.4],[48.3,38.6],[48.1,38.8],[48.2,39],[48.1,39.2],[48.3,39.4],[48.2,39.6],[47.8,39.7],[47.3,39.4],[46.9,39.2],[46.7,39],[46.5,39.1],[46.6,39.3],[46.5,39.6],[46.1,39.7],[45.8,39.8],[45.6,40],[46,40.3],[45.5,40.5],[45.5,40.8],[45.3,41],[45.1,41.2],[45.1,41.4],[45.4,41.5],[45.9,41.2],[46.3,41.2],[46.5,41],[46.7,41.3],[46.2,41.6],[46.4,41.8],[46.6,41.9]]],[[[45.1,39.8],[45.3,39.6],[45.3,39.5],[45.5,39.5],[45.6,39.5],[45.6,39.6],[45.7,39.6],[45.8,39.6],[45.8,39.5],[45.8,39.4],[45.9,39.3],[46,39.3],[46,39.2],[46.1,38.9],[46.2,38.8],[46,38.9],[45.8,38.9],[45.6,39],[45.5,39],[45.4,39],[45.4,39.1],[45.3,39.2],[45.2,39.2],[45.1,39.2],[45.1,39.3],[45.1,39.4],[45,39.4],[44.9,39.5],[44.9,39.6],[44.8,39.6],[44.8,39.7],[44.9,39.7],[45,39.7],[45,39.8],[45.1,39.8]]],[],[]],"type":"MultiPolygon"},"type":"Feature","properties":{"iso2":"AZ","lng":47.5,"lat":40.5}},{"geometry":{"coordinates":[[[17.6,42.9],[17.4,43.2],[17.3,43.5],[17,43.5],[16.8,43.7],[16.6,43.9],[16.4,44.1],[16.2,44.2],[16.2,44.4],[16,44.7],[15.7,44.8],[15.8,45.2],[16.1,45.1],[16.4,45],[16.6,45.2],[16.9,45.3],[17.2,45.1],[17.5,45.1],[17.8,45.1],[18.1,45.1],[18.4,45.1],[18.8,44.9],[19.1,44.9],[19.4,44.9],[19.2,44.6],[19.1,44.3],[19.5,44.1],[19.5,44],[19.2,44],[19.5,43.8],[19.4,43.6],[19,43.6],[19,43.4],[19,43.2],[18.8,43.3],[18.7,43.1],[18.5,43],[18.6,42.7],[18.4,42.6],[18.2,42.7],[17.8,42.9],[17.6,42.9]]],"type":"Polygon"},"type":"Feature","properties":{"iso2":"BA","lng":18,"lat":44}},{"geometry":{"coordinates":[[[4.3,51.3],[4.4,51.4],[4.5,51.5],[4.5,51.4],[4.7,51.4],[4.8,51.5],[4.9,51.4],[5,51.5],[5.1,51.4],[5.2,51.3],[5.4,51.3],[5.6,51.3],[5.8,51.2],[5.9,51.1],[5.8,51],[5.6,50.9],[5.7,50.8],[5.9,50.8],[6.1,50.7],[6.3,50.6],[6.3,50.5],[6.4,50.3],[6.2,50.2],[6.1,50.1],[5.9,50.1],[5.7,49.9],[5.8,49.8],[5.9,49.6],[5.8,49.5],[5.6,49.5],[5.4,49.6],[5,49.8],[4.8,50],[4.9,50.1],[4.8,50.2],[4.7,50],[4.4,49.9],[4.2,50],[4.2,50.1],[4.2,50.3],[4,50.3],[3.8,50.4],[3.7,50.5],[3.5,50.5],[3.3,50.5],[3.2,50.8],[3,50.8],[2.8,50.8],[2.6,50.9],[2.5,51.1],[2.9,51.2],[3,51.3],[3.2,51.3],[3.4,51.3],[3.5,51.2],[3.6,51.3],[3.8,51.3],[3.9,51.2],[4.1,51.3],[4.2,51.4],[4.3,51.3]]],"type":"Polygon"},"type":"Feature","properties":{"iso2":"BE","lng":4,"lat":50.8}},{"geometry":{"coordinates":[[[27.9,42.8],[27.6,42.6],[27.5,42.4],[27.8,42.2],[28,42],[27.6,42],[27.3,42.1],[27,42],[26.5,41.8],[26.4,41.7],[26.2,41.5],[25.9,41.3],[25.5,41.3],[25.1,41.4],[24.6,41.4],[24.3,41.6],[24.1,41.5],[23.7,41.4],[23.3,41.4],[23,41.3],[23,41.6],[22.9,41.9],[22.5,42.1],[22.6,42.5],[22.4,42.8],[23,43.1],[22.8,43.4],[22.5,43.5],[22.5,44.1],[22.9,44.1],[22.8,43.9],[23.1,43.8],[23.4,43.9],[24,43.7],[24.4,43.7],[24.6,43.7],[25,43.7],[25.4,43.6],[25.8,43.7],[26.1,44],[26.7,44.1],[27.1,44.1],[27.5,44],[27.9,44],[28.1,43.8],[28.5,43.7],[28.6,43.4],[28.2,43.4],[27.9,43.2],[27.9,42.8]]],"type":"Polygon"},"type":"Feature","properties":{"iso2":"BG","lng":25,"lat":43}},{"geometry":{"coordinates":[[[26.6,55.7],[27,55.8],[27.6,55.8],[27.9,56.1],[28.3,56],[28.7,56],[29.1,56],[29.4,55.8],[30,55.9],[30.8,55.6],[30.9,55.2],[30.9,54.9],[31.1,54.6],[31.3,54.2],[31.9,54],[32.1,53.8],[32.5,53.6],[32.5,53.2],[32,53.1],[31.4,53.2],[31.5,52.9],[31.6,52.5],[31.8,52.1],[31.3,52.1],[31,52],[30.6,51.6],[30.4,51.4],[29.9,51.5],[29.4,51.4],[29.1,51.6],[28.7,51.5],[28.3,51.6],[28,51.6],[27.7,51.6],[27.2,51.7],[26.9,51.8],[26.4,51.8],[26,51.9],[25.4,51.9],[25,51.9],[24.3,51.7],[23.7,51.7],[23.5,51.7],[23.7,52],[23.2,52.3],[23.7,52.6],[23.9,53],[23.6,53.7],[23.8,53.9],[24.2,54],[24.5,54],[24.9,54.1],[25.3,54.3],[25.5,54.2],[25.8,54.3],[25.7,54.6],[25.9,54.9],[26.3,55.1],[26.6,55.3],[26.6,55.7]]],"type":"Polygon"},"type":"Feature","properties":{"iso2":"BY","lng":28,"lat":53}},{"geometry":{"coordinates":[[[7.7,47.5],[8,47.6],[8.3,47.6],[8.6,47.6],[8.4,47.7],[8.7,47.8],[8.9,47.7],[9.3,47.7],[9.7,47.5],[9.5,47.3],[9.6,47.1],[9.9,46.9],[10.2,46.9],[10.4,47],[10.5,46.6],[10.3,46.5],[10.1,46.6],[10,46.4],[10.2,46.3],[9.9,46.4],[9.7,46.3],[9.5,46.4],[9.3,46.5],[9.3,46.3],[9.1,46.1],[9,45.9],[8.9,45.9],[8.8,46.1],[8.6,46.1],[8.4,46.3],[8.5,46.5],[8.3,46.4],[8.1,46.1],[7.9,45.9],[7.7,46],[7.5,45.9],[7.2,45.9],[7,46],[6.8,46.2],[6.7,46.5],[6.3,46.4],[6.3,46.3],[6,46.1],[6.1,46.2],[6.1,46.6],[6.4,46.8],[6.5,47],[6.7,47.1],[7,47.3],[7,47.5],[7.3,47.4],[7.5,47.5],[7.7,47.6],[7.7,47.5]]],"type":"Polygon"},"type":"Feature","properties":{"iso2":"CH","lng":8,"lat":47}},{"geometry":{"coordinates":[[[33.7,35.4],[33.9,35.4],[34.3,35.6],[34.5,35.7],[34.6,35.6],[34.3,35.5],[34.1,35.4],[33.9,35.3],[34,35.1],[34.1,35],[33.9,34.9],[33.8,35],[33.6,34.9],[33.5,34.8],[33.3,34.7],[33.1,34.7],[33,34.6],[32.9,34.7],[32.8,34.6],[32.7,34.7],[32.5,34.7],[32.4,34.8],[32.3,35],[32.4,35],[32.5,35.1],[32.6,35.2],[32.8,35.2],[32.9,35.2],[32.9,35.4],[33.3,35.3],[33.5,35.3],[33.7,35.4]]],"type":"Polygon"},"type":"Feature","properties":{"iso2":"CY","lng":33,"lat":35}},{"geometry":{"coordinates":[[[14.7,48.6],[14.4,48.6],[14.1,48.7],[13.8,48.8],[13.6,48.9],[13.4,49],[13.2,49.2],[12.8,49.3],[12.6,49.6],[12.5,49.9],[12.3,50],[12.2,50.2],[12.3,50.2],[12.6,50.4],[12.8,50.5],[13.1,50.5],[13.3,50.6],[13.5,50.7],[13.9,50.8],[14.3,50.9],[14.3,51.1],[14.6,50.9],[14.8,50.9],[15.2,51],[15.4,50.8],[15.8,50.7],[16.1,50.6],[16.3,50.7],[16.3,50.5],[16.4,50.4],[16.5,50.2],[16.7,50.1],[16.9,50.2],[16.9,50.3],[17.2,50.4],[17.4,50.3],[17.8,50.3],[17.6,50.2],[17.8,50],[18.1,50.1],[18.4,49.9],[18.6,49.8],[18.8,49.6],[18.7,49.5],[18.4,49.3],[18.2,49.2],[18.1,49],[17.7,48.9],[17.4,48.8],[17.1,48.8],[16.9,48.6],[16.7,48.7],[16.5,48.8],[16.3,48.7],[15.8,48.9],[15.5,48.9],[15.3,49],[15,49],[14.9,48.8],[14.7,48.6]]],"type":"Polygon"},"type":"Feature","properties":{"iso2":"CZ","lng":15.5,"lat":49.8}},{"geometry":{"coordinates":[[[[11,54.4],[10.8,53.9],[11.6,54],[12.4,54.4],[12.5,54.2],[13.7,54.2],[14.3,53.7],[14.2,52.8],[14.5,52.4],[14.7,51.7],[15,51.4],[14.6,50.9],[14,50.8],[13.2,50.6],[12.6,50.4],[12.3,50.1],[12.6,49.5],[13.4,49],[13.8,48.6],[13.4,48.4],[13,47.9],[13,47.5],[12.2,47.6],[11.1,47.4],[10.5,47.5],[9.7,47.6],[8.8,47.7],[8.6,47.7],[7.8,47.6],[7.6,48.1],[8.1,48.8],[7.6,49.1],[6.9,49.2],[6.5,49.7],[6.1,50.1],[6.3,50.6],[5.9,51],[6.2,51.6],[6.6,51.9],[6.9,52.2],[6.9,52.4],[7,52.6],[7.2,53.3],[7.2,53.6],[8,53.7],[8.3,53.4],[8.5,53.7],[9.2,53.9],[9.8,53.5],[8.9,54.1],[8.7,54.4],[8.7,54.8],[8.4,55],[9.3,54.8],[10,54.6],[10.7,54.3],[11,54.4]]],[[[13.4,54.6],[13.5,54.6],[13.6,54.6],[13.7,54.6],[13.7,54.5],[13.6,54.5],[13.6,54.4],[13.7,54.4],[13.7,54.3],[13.5,54.3],[13.4,54.3],[13.4,54.2],[13.3,54.2],[13.3,54.3],[13.2,54.3],[13.1,54.3],[13.1,54.4],[13.2,54.4],[13.3,54.4],[13.2,54.5],[13.1,54.5],[13.2,54.6],[13.3,54.6],[13.4,54.5],[13.5,54.5],[13.2,54.7],[13.3,54.7],[13.4,54.7],[13.4,54.6]]],[[[14,54.1],[14.1,54],[14.2,53.9],[14.1,53.9],[14,53.9],[14,53.8],[13.9,53.8],[13.8,53.9],[13.9,53.9],[14,54],[13.9,54.1],[13.9,54],[13.8,54],[13.8,54.1],[13.8,54.2],[14,54.1]]],[],[],[],[]],"type":"MultiPolygon"},"type":"Feature","properties":{"iso2":"DE","lng":9,"lat":51}},{"geometry":{"coordinates":[[[[10.4,57.6],[10.4,57.5],[10.5,57.5],[10.5,57.4],[10.5,57.2],[10.4,57.2],[10.4,57.1],[10.3,57],[10.2,57],[10.1,57],[10,57.1],[9.5,57],[9.3,57],[9.2,57],[9.1,57],[9.1,57.1],[9,57],[8.9,57],[8.8,57],[8.8,56.9],[8.7,57],[8.7,56.9],[8.6,56.9],[8.6,56.8],[8.5,56.8],[8.5,56.7],[8.4,56.7],[8.6,56.7],[8.6,56.6],[8.5,56.6],[8.2,56.7],[8.2,56.8],[8.3,56.8],[8.3,56.9],[8.4,56.9],[8.5,57],[8.6,57.1],[8.7,57.1],[8.8,57.1],[8.9,57.1],[9,57.2],[9.2,57.1],[9.3,57.1],[9.4,57.2],[9.5,57.2],[9.6,57.2],[9.6,57.3],[9.7,57.4],[9.8,57.4],[9.8,57.5],[9.9,57.6],[10,57.6],[10.1,57.6],[10.2,57.6],[10.3,57.6],[10.4,57.7],[10.5,57.7],[10.6,57.7],[10.5,57.6],[10.4,57.6]]],[[[10,57.1],[10.3,57],[10.3,56.7],[9.9,56.6],[10.4,56.7],[10.2,56.6],[10.5,56.5],[10.9,56.5],[10.7,56.2],[10.6,56.1],[10.5,56.3],[10.2,56.1],[10.3,55.9],[10.1,55.8],[9.9,55.8],[9.8,55.7],[9.8,55.6],[9.7,55.3],[9.5,55.2],[9.6,55],[9.8,54.9],[9.6,54.9],[9.4,54.8],[9.2,54.9],[8.7,54.9],[8.6,55.1],[8.6,55.2],[8.6,55.4],[8.4,55.5],[8.1,55.5],[8.2,55.8],[8.1,56],[8.3,55.9],[8.3,56.1],[8.1,56.3],[8.2,56.6],[8.4,56.6],[8.6,56.5],[8.8,56.6],[8.9,56.8],[9.2,56.7],[9,56.6],[9.3,56.5],[9.3,56.7],[9.4,57],[9.7,57],[9.9,57.1],[10,57.1]]],[[[12.6,56],[12.6,55.9],[12.6,55.7],[12.5,55.6],[12.3,55.6],[12.2,55.4],[12.4,55.4],[12.5,55.3],[12.2,55.2],[12,55.1],[12.2,55.1],[12.1,55],[11.9,55],[11.7,55.1],[11.8,55.2],[11.6,55.2],[11.4,55.2],[11.2,55.2],[11.2,55.4],[11.1,55.7],[10.9,55.7],[11.3,55.7],[11.5,55.9],[11.3,56],[11.6,55.9],[11.7,56],[11.8,55.9],[11.8,55.8],[11.9,55.9],[12,55.8],[12.1,55.7],[11.9,55.7],[11.9,56],[12.3,56.1],[12.6,56]]],[[[10.7,55.5],[10.8,55.4],[10.8,55.3],[10.8,55.2],[10.8,55.1],[10.7,55.1],[10.6,55.1],[10.5,55],[10.2,55.1],[10.1,55.1],[10.1,55.2],[10,55.2],[9.9,55.3],[9.8,55.4],[9.8,55.5],[9.7,55.5],[9.9,55.5],[10,55.5],[10.1,55.6],[10.2,55.6],[10.3,55.6],[10.4,55.6],[10.5,55.5],[10.4,55.5],[10.4,55.4],[10.5,55.4],[10.6,55.5],[10.6,55.6],[10.7,55.6],[10.7,55.5]]],[[[11.5,54.8],[11.6,54.8],[11.6,54.9],[11.7,54.9],[11.8,54.8],[11.9,54.7],[11.8,54.7],[11.8,54.6],[11.7,54.6],[11.7,54.7],[11.6,54.7],[11.5,54.6],[11.4,54.6],[11.4,54.7],[11.3,54.7],[11.2,54.7],[11.1,54.7],[11,54.8],[11,54.9],[11.1,54.9],[11.1,55],[11.2,55],[11.3,54.9],[11.4,54.9],[11.5,54.8]]],[[[12,54.9],[12.1,54.9],[12.2,54.8],[12.1,54.8],[12,54.7],[12,54.6],[11.9,54.6],[11.9,54.7],[11.9,54.8],[11.8,54.8],[11.8,54.9],[11.7,54.9],[11.7,55],[11.8,55],[11.9,55],[11.9,54.9],[12,54.9]]],[]],"type":"MultiPolygon"},"type":"Feature","properties":{"iso2":"DK","lng":10,"lat":56}},{"geometry":{"coordinates":[[[[25.8,59.6],[26.1,59.6],[26.5,59.5],[26.7,59.6],[26.9,59.5],[27.2,59.4],[27.6,59.4],[28,59.4],[28.1,59.4],[28.1,59.3],[27.9,59.2],[27.7,59],[27.4,58.8],[27.5,58.5],[27.5,58.2],[27.7,58.1],[27.8,57.8],[27.5,57.8],[27.4,57.6],[27.1,57.6],[26.7,57.6],[26.5,57.5],[26,57.8],[25.6,57.9],[25.3,58.1],[25.2,58.1],[25,58],[24.5,58],[24.3,57.9],[24.5,58.2],[24.5,58.4],[24.3,58.3],[24.1,58.3],[23.8,58.4],[23.6,58.5],[23.6,58.7],[23.8,58.8],[23.4,58.9],[23.6,59],[23.4,59.1],[23.6,59.2],[23.8,59.3],[24,59.4],[24.3,59.4],[24.5,59.5],[24.8,59.6],[25.2,59.5],[25.5,59.6],[25.7,59.6],[25.8,59.6]]],[[[23,58.6],[23.1,58.6],[23.3,58.5],[23.3,58.4],[23.2,58.4],[23.1,58.4],[23,58.4],[22.8,58.2],[22.6,58.2],[22.5,58.2],[22.4,58.2],[22.3,58.2],[22.3,58.1],[22.2,58],[22.1,57.9],[22,57.9],[22,58],[22.1,58.1],[22.2,58.1],[22.2,58.2],[22.1,58.2],[21.9,58.3],[21.8,58.3],[22,58.3],[22,58.4],[21.9,58.5],[21.8,58.5],[22,58.5],[22.1,58.5],[22.2,58.5],[22.3,58.6],[22.5,58.6],[22.6,58.6],[22.8,58.6],[22.9,58.6],[23,58.6]]],[[[22.7,59],[22.8,59],[22.9,59],[23,59],[23,58.9],[23,58.8],[22.9,58.8],[22.8,58.8],[22.7,58.8],[22.7,58.7],[22.6,58.7],[22.5,58.7],[22.5,58.8],[22.4,58.8],[22.4,58.9],[22.3,58.9],[22.2,58.9],[22.1,58.9],[22,58.9],[22.1,59],[22.4,59],[22.5,59],[22.6,59.1],[22.7,59.1],[22.7,59]]],[],[],[]],"type":"MultiPolygon"},"type":"Feature","properties":{"iso2":"EE","lng":26,"lat":59}},{"geometry":{"coordinates":[[[[-7.9,43.8],[-7.2,43.6],[-6.3,43.6],[-5.6,43.6],[-4.9,43.4],[-4.2,43.4],[-3.2,43.4],[-2.5,43.3],[-1.8,43.3],[-1.4,43],[-0.8,42.9],[-0.3,42.8],[0.3,42.7],[0.8,42.8],[1.4,42.6],[2,42.4],[2.7,42.3],[3.3,42.2],[3.1,41.8],[2.3,41.4],[1.7,41.2],[0.9,41],[0.5,40.5],[-0.1,39.9],[-0.1,39],[0.1,38.7],[-0.5,38.3],[-0.9,37.7],[-1.4,37.5],[-1.9,37],[-2.3,36.8],[-2.9,36.7],[-3.7,36.7],[-4.5,36.7],[-5.2,36.4],[-5.9,36.2],[-6.2,36.6],[-6.9,37.2],[-7.4,37.4],[-7.3,38],[-7.1,38.2],[-7.1,38.9],[-7.4,39.5],[-7.1,39.7],[-6.8,40.3],[-6.9,41],[-6.4,41.4],[-6.5,41.7],[-6.9,41.9],[-7.3,41.8],[-8,41.8],[-8.2,42.1],[-8.7,42],[-8.6,42.4],[-8.9,42.4],[-8.9,42.6],[-9.1,42.8],[-9.1,43.2],[-8.4,43.4],[-7.9,43.8]]],[[[3.2,39.7],[3.3,39.7],[3.3,39.8],[3.4,39.8],[3.5,39.7],[3.4,39.6],[3.4,39.5],[3.3,39.5],[3.3,39.4],[3.2,39.4],[3.1,39.3],[3,39.3],[2.8,39.4],[2.7,39.4],[2.7,39.5],[2.8,39.5],[2.7,39.6],[2.5,39.5],[2.4,39.5],[2.4,39.6],[2.5,39.7],[2.7,39.8],[2.8,39.8],[3,39.9],[3.1,39.9],[3.1,39.8],[3.2,39.8],[3.2,39.7]]],[[[-14.3,28],[-14.4,28],[-14.4,28.1],[-14.3,28.1],[-14.3,28.2],[-14.2,28.2],[-14.2,28.3],[-14.1,28.4],[-14.1,28.5],[-14.1,28.6],[-14,28.6],[-14,28.7],[-13.9,28.7],[-13.9,28.8],[-13.8,28.7],[-13.8,28.6],[-13.8,28.5],[-13.9,28.4],[-13.9,28.3],[-13.9,28.2],[-14,28.2],[-14.1,28.2],[-14.2,28.1],[-14.3,28]]],[[[-16.3,28.4],[-16.4,28.4],[-16.4,28.2],[-16.4,28.1],[-16.5,28.1],[-16.5,28],[-16.6,28],[-16.7,28],[-16.7,28.1],[-16.8,28.1],[-16.8,28.2],[-16.9,28.3],[-16.9,28.4],[-16.8,28.4],[-16.7,28.4],[-16.6,28.4],[-16.5,28.4],[-16.4,28.5],[-16.3,28.6],[-16.2,28.6],[-16.2,28.5],[-16.3,28.4]]],[[[-15.6,27.8],[-15.6,27.7],[-15.7,27.8],[-15.8,27.8],[-15.8,27.9],[-15.8,28],[-15.7,28],[-15.7,28.1],[-15.7,28.2],[-15.6,28.2],[-15.4,28.1],[-15.4,28],[-15.4,27.8],[-15.5,27.8],[-15.6,27.8]]],[[[4.3,40],[4.3,39.9],[4.3,39.8],[4.2,39.8],[4.1,39.9],[4,39.9],[3.9,39.9],[3.8,39.9],[3.8,40],[3.8,40.1],[3.9,40.1],[4.1,40.1],[4.2,40.1],[4.2,40],[4.3,40]]],[]],"type":"MultiPolygon"},"type":"Feature","properties":{"iso2":"ES","lng":-4,"lat":40}},{"geometry":{"coordinates":[[[[28.2,69.9],[29.3,69.5],[28.9,69],[28.5,68.6],[29.9,67.7],[29.1,66.9],[29.8,66.2],[29.8,65.6],[29.8,65.2],[29.7,64.8],[30,64.5],[30.6,64],[30.3,63.6],[31.5,63],[30.8,62.3],[29.7,61.5],[28.8,61.1],[28.1,60.7],[27.2,60.6],[26.6,60.6],[25.9,60.4],[25.7,60.4],[24.6,60.1],[23.6,60],[23.2,59.9],[23,60.2],[22.5,60.2],[21.9,60.5],[21.4,60.8],[21.5,61.5],[21.3,62],[21.1,62.6],[21.6,63.1],[22.3,63.3],[22.7,63.7],[23.4,64],[24.2,64.5],[25,64.9],[25.3,65],[25.2,65.6],[24.7,65.9],[23.7,66.2],[24,66.8],[23.8,67.4],[23.5,67.9],[23,68.3],[22.1,68.5],[21.2,68.8],[20.8,69.1],[22,69.1],[22.9,68.7],[23.7,68.7],[24.5,68.7],[25.4,68.9],[25.8,69.4],[26.4,69.8],[27.3,69.9],[28.2,69.9]]],[],[],[],[],[],[]],"type":"MultiPolygon"},"type":"Feature","properties":{"iso2":"FI","lng":26,"lat":64}},{"geometry":{"coordinates":[[[[2.5,51.1],[3.2,50.7],[4,50.3],[4.5,49.9],[5,49.8],[6.1,49.5],[6.9,49.2],[7.7,49],[7.9,48.7],[7.5,47.8],[7.1,47.5],[6.6,47],[6.1,46.4],[6.2,46.3],[6.9,46.1],[7.1,45.5],[6.7,45.1],[6.9,44.5],[7.7,44.2],[7.2,43.7],[6.2,43.1],[5.3,43.4],[5,43.6],[4.6,43.4],[3.8,43.5],[3,42.9],[2.7,42.4],[1.9,42.4],[1.4,42.6],[0.7,42.8],[-0.1,42.7],[-0.8,43],[-1.4,43.1],[-1.6,43.4],[-1.3,44.5],[-1.2,45],[-0.8,45.4],[-0.7,45.4],[-1.1,46.1],[-1.9,46.6],[-2.2,47.2],[-2.4,47.3],[-2.9,47.5],[-3.6,47.8],[-4.4,47.8],[-4.3,48.1],[-4.2,48.3],[-4.5,48.6],[-3.5,48.7],[-2.7,48.5],[-1.9,48.7],[-1.5,48.7],[-1.8,49.4],[-1.4,49.7],[-1,49.4],[-0.1,49.3],[0.2,49.5],[1.2,50],[1.6,50.8],[2.5,51.1]]],[[[9.4,42.7],[9.4,42.6],[9.5,42.6],[9.5,42.5],[9.6,42.3],[9.6,42.2],[9.6,42.1],[9.5,42.1],[9.4,42],[9.4,41.9],[9.4,41.8],[9.4,41.7],[9.4,41.6],[9.3,41.6],[9.3,41.5],[9.2,41.5],[9.2,41.4],[9.3,41.4],[9.1,41.4],[9,41.5],[8.9,41.5],[8.8,41.6],[8.9,41.6],[8.9,41.7],[8.8,41.7],[8.7,41.7],[8.7,41.8],[8.8,41.9],[8.7,41.9],[8.6,41.9],[8.6,42],[8.7,42],[8.7,42.1],[8.6,42.1],[8.6,42.2],[8.6,42.3],[8.7,42.3],[8.6,42.4],[8.7,42.5],[8.7,42.6],[8.9,42.6],[9.1,42.7],[9.2,42.7],[9.3,42.7],[9.3,42.8],[9.3,43],[9.4,43],[9.5,43],[9.5,42.8],[9.5,42.7],[9.4,42.7]]],[],[],[],[],[]],"type":"MultiPolygon"},"type":"Feature","properties":{"iso2":"FR","lng":2,"lat":46}},{"geometry":{"coordinates":[[[[-4.2,53.2],[-3.1,53.2],[-3,53.8],[-3.5,54.4],[-3.1,55],[-4.4,54.9],[-5,54.8],[-5,55.2],[-4.8,55.9],[-5.2,55.8],[-5.4,55.9],[-5.8,55.4],[-5.5,56.2],[-5.3,56.5],[-5.8,56.5],[-6.1,56.8],[-5.5,57],[-5.5,57.4],[-5.6,57.6],[-5.2,57.9],[-5.2,58.3],[-4.6,58.5],[-3.4,58.6],[-3.6,58.1],[-4,57.8],[-4,57.6],[-2.9,57.7],[-1.8,57.5],[-2.5,56.6],[-3,56.4],[-3.2,56.1],[-2.8,56.1],[-1.8,55.6],[-1.3,54.8],[-0.2,54.2],[0,53.6],[0.2,53.5],[0.2,52.9],[1.2,52.9],[1.7,52.3],[0.9,51.8],[0.4,51.4],[1.4,51.1],[0.4,50.8],[-0.8,50.7],[-2.1,50.7],[-2.8,50.7],[-3.8,50.2],[-4.9,50.2],[-5.7,50.1],[-4.7,50.7],[-4,51.2],[-2.9,51.4],[-3.2,51.5],[-4.2,51.5],[-4.8,51.6],[-5.2,51.9],[-4.1,52.3],[-4.5,52.8],[-4.2,53.2]]],[[[-6.2,58.4],[-6.2,58.3],[-6.3,58.3],[-6.3,58.2],[-6.2,58.2],[-6.1,58.3],[-6.4,58.2],[-6.4,58.1],[-6.5,58.1],[-6.6,58.1],[-6.4,58],[-6.5,58],[-6.5,57.9],[-6.6,57.9],[-6.7,57.9],[-6.7,58],[-6.6,58],[-6.7,58.1],[-6.8,58],[-6.7,57.8],[-7,57.7],[-7.1,57.8],[-7,57.8],[-6.8,57.9],[-6.9,57.9],[-6.9,58],[-7,58],[-7.1,58],[-7.1,58.1],[-7.1,58.2],[-7,58.2],[-6.9,58.2],[-6.9,58.1],[-6.8,58.2],[-6.7,58.2],[-6.8,58.3],[-6.7,58.3],[-6.6,58.3],[-6.6,58.4],[-6.4,58.5],[-6.3,58.5],[-6.2,58.5],[-6.2,58.4]]],[[[-6.4,55.2],[-6.2,55.2],[-6,55.2],[-5.8,54.9],[-5.7,54.8],[-5.8,54.7],[-5.9,54.6],[-5.5,54.7],[-5.5,54.5],[-5.5,54.4],[-5.6,54.6],[-5.7,54.5],[-5.6,54.3],[-5.7,54.2],[-5.9,54.2],[-6,54.1],[-6.1,54],[-6.3,54.1],[-6.6,54.1],[-6.7,54.1],[-6.9,54.3],[-7,54.4],[-7.2,54.3],[-7.1,54.2],[-7.6,54.1],[-7.7,54.2],[-7.9,54.2],[-8,54.4],[-8.2,54.4],[-8,54.5],[-7.9,54.6],[-7.8,54.7],[-7.6,54.8],[-7.5,54.9],[-7.4,55],[-7.3,55.1],[-7,55],[-7,55.2],[-6.8,55.2],[-6.6,55.2],[-6.4,55.2]]],[[[-6.1,57.6],[-6.1,57.5],[-6.1,57.4],[-6.1,57.3],[-5.9,57.2],[-5.8,57.3],[-5.7,57.3],[-5.6,57.3],[-5.7,57.2],[-5.8,57.1],[-5.9,57.1],[-5.9,57],[-6,57],[-6,57.1],[-6,57.2],[-6.1,57.1],[-6.2,57.2],[-6.3,57.2],[-6.4,57.3],[-6.5,57.3],[-6.3,57.3],[-6.5,57.4],[-6.6,57.4],[-6.6,57.3],[-6.7,57.4],[-6.8,57.4],[-6.7,57.5],[-6.6,57.6],[-6.6,57.5],[-6.5,57.5],[-6.4,57.5],[-6.4,57.6],[-6.3,57.7],[-6.2,57.6],[-6.1,57.6]]],[[[-1.3,60.5],[-1.2,60.5],[-1,60.4],[-1.1,60.4],[-1.1,60.3],[-1.2,60.3],[-1.2,60.2],[-1.1,60.2],[-1.1,60.1],[-1.2,60.1],[-1.2,60],[-1.3,59.9],[-1.4,59.9],[-1.3,60],[-1.3,60.1],[-1.3,60.2],[-1.4,60.3],[-1.4,60.2],[-1.5,60.2],[-1.6,60.2],[-1.7,60.2],[-1.7,60.3],[-1.6,60.3],[-1.5,60.3],[-1.3,60.3],[-1.3,60.4],[-1.4,60.5],[-1.5,60.5],[-1.6,60.5],[-1.4,60.6],[-1.3,60.6],[-1.3,60.5]]],[[[-5.8,56.5],[-5.7,56.5],[-5.6,56.4],[-5.7,56.4],[-5.8,56.3],[-5.9,56.3],[-5.9,56.4],[-6,56.3],[-6.3,56.3],[-6.4,56.3],[-6.2,56.3],[-6.1,56.4],[-6,56.4],[-6.2,56.4],[-6,56.5],[-6.1,56.5],[-6.3,56.5],[-6.3,56.6],[-6.2,56.6],[-6.1,56.7],[-6.1,56.6],[-6,56.6],[-5.9,56.5],[-5.8,56.5]]],[[[-6.1,55.9],[-6.1,55.8],[-6,55.8],[-6,55.7],[-6.1,55.6],[-6.2,55.6],[-6.3,55.6],[-6.3,55.7],[-6.3,55.8],[-6.4,55.8],[-6.4,55.7],[-6.5,55.7],[-6.4,55.9],[-6.3,55.9],[-6.2,55.9],[-6.1,55.9]]]],"type":"MultiPolygon"},"type":"Feature","properties":{"iso2":"GB","lng":-2,"lat":54}},{"geometry":{"coordinates":[[[41.5,42.4],[41.5,42.7],[41.2,42.8],[41,43],[40.8,43.1],[40.3,43.2],[40.1,43.4],[40.1,43.6],[40.4,43.6],[40.7,43.5],[41,43.4],[41.4,43.3],[42.1,43.2],[42.4,43.2],[42.7,43.2],[42.9,43.1],[43.2,42.9],[43.6,42.9],[43.8,42.8],[43.7,42.6],[44.2,42.6],[44.5,42.8],[44.7,42.7],[44.9,42.8],[45.2,42.7],[45.4,42.5],[45.6,42.6],[45.8,42.5],[45.6,42.2],[46.1,42],[46.4,41.9],[46.3,41.8],[46.2,41.6],[46.6,41.4],[46.7,41.1],[46.5,41.1],[46.3,41.2],[46,41.2],[45.7,41.3],[45.3,41.5],[45.1,41.4],[44.9,41.2],[44.6,41.2],[44.3,41.2],[44,41.2],[43.8,41.1],[43.5,41.1],[43.3,41.2],[43,41.4],[42.7,41.6],[42.5,41.4],[42.2,41.5],[41.9,41.5],[41.7,41.5],[41.6,41.6],[41.8,41.8],[41.7,42.1],[41.6,42.3],[41.5,42.4]]],"type":"Polygon"},"type":"Feature","properties":{"iso2":"GE","lng":43.5,"lat":42}},{"geometry":{"coordinates":[[[[23.9,35.5],[24,35.5],[24.1,35.5],[24.1,35.6],[24.2,35.6],[24.2,35.5],[24.3,35.4],[24.4,35.4],[24.5,35.4],[24.6,35.4],[24.8,35.4],[25,35.4],[25.1,35.3],[25.2,35.3],[25.3,35.3],[25.4,35.3],[25.5,35.3],[25.6,35.3],[25.7,35.3],[25.8,35.3],[25.7,35.2],[25.7,35.1],[25.8,35.1],[25.9,35.2],[26,35.2],[26.1,35.2],[26.2,35.2],[26.3,35.3],[26.3,35.1],[26.2,35],[26.1,35],[26,35],[25.6,35],[25.5,35],[25.3,35],[25.2,35],[25,34.9],[24.9,34.9],[24.8,34.9],[24.8,35],[24.7,35.1],[24.6,35.1],[24.5,35.1],[24.4,35.2],[24.2,35.2],[24.1,35.2],[24,35.2],[23.9,35.2],[23.8,35.2],[23.7,35.2],[23.6,35.2],[23.5,35.3],[23.6,35.5],[23.6,35.6],[23.7,35.5],[23.7,35.6],[23.7,35.7],[23.8,35.7],[23.8,35.6],[23.8,35.5],[23.9,35.5]]],[[[26.3,41.7],[26.4,41.3],[26.1,40.8],[25.7,40.9],[25.2,41],[24.4,40.9],[23.8,40.8],[24,40.4],[24.1,40.3],[24,40.1],[23.4,40.3],[23.7,39.9],[22.8,40.5],[22.6,40.5],[22.7,40],[23.3,39.3],[23.2,39.3],[23,39.1],[22.5,38.9],[23.2,38.6],[23.6,38.5],[24.1,38.2],[24,37.7],[23.3,38],[23.2,37.6],[23.4,37.4],[22.9,37.5],[22.9,37.1],[23,36.7],[22.9,36.6],[22.5,36.4],[22,37],[21.7,36.8],[21.7,37.4],[21.1,37.8],[21.6,38.1],[22.2,38.2],[23,38],[23.1,38.2],[22.5,38.4],[21.7,38.4],[21.3,38.3],[20.8,38.8],[21.1,39],[20.7,39.1],[20.2,39.6],[20.4,39.9],[20.7,40.2],[21,40.6],[21.2,40.9],[21.9,41.1],[22.6,41.1],[23.1,41.3],[23.7,41.4],[24.2,41.6],[24.9,41.4],[25.6,41.3],[26.2,41.5],[26.3,41.7]]],[[[23.5,38.9],[23.5,38.8],[23.6,38.8],[23.8,38.7],[23.9,38.7],[24,38.7],[24.2,38.6],[24.2,38.4],[24.2,38.2],[24.3,38.2],[24.4,38.1],[24.5,38.1],[24.6,38.1],[24.6,38],[24.5,38],[24.4,38],[24.3,38],[24.1,38.2],[24.1,38.3],[24,38.4],[24.1,38.4],[23.9,38.4],[23.8,38.4],[23.7,38.4],[23.6,38.4],[23.6,38.5],[23.6,38.6],[23.5,38.6],[23.3,38.7],[23.2,38.8],[23.1,38.9],[23.1,38.8],[22.8,38.8],[22.8,38.9],[22.9,38.9],[23.1,39],[23.3,39],[23.4,39],[23.4,38.9],[23.5,38.9]]],[[[26.4,39.3],[26.5,39.2],[26.6,39.1],[26.6,39],[26.5,39],[26.4,39],[26.3,39],[26.2,39],[26.1,39],[26.1,39.1],[26.2,39.1],[26.3,39.2],[26.2,39.2],[26,39.1],[25.9,39.1],[25.9,39.2],[25.8,39.2],[25.9,39.3],[26,39.3],[26.2,39.3],[26.2,39.4],[26.3,39.4],[26.4,39.3]]],[[[27.8,35.9],[27.7,35.9],[27.7,36],[27.7,36.1],[27.7,36.2],[27.8,36.3],[27.9,36.3],[28.1,36.4],[28.2,36.4],[28.2,36.5],[28.2,36.3],[28.1,36.2],[28.1,36.1],[28,36.1],[28,36],[27.9,36],[27.9,35.9],[27.8,35.9]]],[[[26,38.2],[26,38.1],[25.9,38.2],[25.9,38.3],[26,38.3],[26,38.4],[25.9,38.5],[25.8,38.5],[25.8,38.6],[25.9,38.6],[26,38.6],[26.1,38.6],[26.2,38.6],[26.2,38.5],[26.1,38.4],[26.2,38.3],[26.1,38.2],[26,38.2]]],[[[19.9,39.8],[20,39.8],[19.9,39.7],[19.8,39.7],[19.8,39.6],[19.9,39.5],[20,39.4],[20.1,39.4],[20.1,39.5],[19.9,39.4],[19.8,39.5],[19.7,39.6],[19.7,39.7],[19.6,39.7],[19.6,39.8],[19.7,39.8],[19.8,39.8],[19.9,39.8]]]],"type":"MultiPolygon"},"type":"Feature","properties":{"iso2":"GR","lng":22,"lat":39}},{"geometry":{"coordinates":[[[[16.6,46.5],[16.9,46.3],[17.2,46.2],[17.4,46],[17.7,45.9],[18.2,45.8],[18.6,45.8],[18.9,45.8],[18.9,45.5],[19,45.4],[19.4,45.2],[19.1,44.9],[18.8,45],[18.2,45.1],[17.8,45.1],[17.3,45.2],[17,45.2],[16.6,45.2],[16.3,45],[15.9,45.2],[15.7,44.8],[16,44.6],[16.1,44.2],[16.4,44.1],[16.7,43.9],[17,43.6],[17.3,43.5],[17.6,43.1],[17.5,43],[17.1,43.2],[16.7,43.4],[16.4,43.6],[16.1,43.5],[15.9,43.7],[15.5,43.9],[15.2,44.2],[15.3,44.3],[15.2,44.4],[14.9,44.8],[14.7,45.1],[14.4,45.3],[14.2,45.2],[14,44.9],[13.8,45],[13.5,45.4],[13.9,45.5],[14.5,45.5],[14.7,45.5],[15.1,45.5],[15.4,45.7],[15.6,45.8],[15.7,46.1],[15.8,46.2],[16.3,46.4],[16.5,46.5],[16.6,46.5]]],[[[17.3,43],[17.4,43],[17.4,42.9],[17.5,42.9],[17.7,42.9],[17.6,42.9],[17.8,42.9],[17.9,42.8],[18,42.8],[18.2,42.7],[18.2,42.6],[18.3,42.6],[18.4,42.6],[18.5,42.6],[18.5,42.5],[18.5,42.4],[18.4,42.5],[18.1,42.7],[17.8,42.8],[17.7,42.8],[17.6,42.8],[17.2,43],[17.1,43],[17,43],[17.3,43]]],[[[14.5,44.9],[14.4,44.9],[14.5,44.8],[14.5,44.7],[14.5,44.6],[14.4,44.7],[14.4,44.8],[14.3,44.8],[14.3,44.9],[14.4,45],[14.3,45.1],[14.3,45.2],[14.4,45.2],[14.4,45.1],[14.5,45],[14.5,44.9]]],[[[14.8,44.6],[14.9,44.6],[15,44.6],[15,44.5],[15.1,44.5],[14.9,44.5],[15.1,44.4],[15.2,44.4],[15.2,44.3],[15.3,44.3],[15.1,44.3],[15,44.4],[14.7,44.7],[14.8,44.7],[14.8,44.6]]],[],[],[]],"type":"MultiPolygon"},"type":"Feature","properties":{"iso2":"HR","lng":15.5,"lat":45.2}},{"geometry":{"coordinates":[[[18.8,45.9],[18.4,45.8],[18,45.8],[17.6,45.9],[17.3,46],[17.1,46.2],[16.9,46.4],[16.5,46.5],[16.3,46.9],[16.4,47],[16.5,47.3],[16.7,47.6],[16.5,47.7],[16.9,47.7],[17.1,47.9],[17.4,48],[17.8,47.7],[18.1,47.8],[18.4,47.8],[18.8,47.8],[18.8,48.1],[19.2,48.1],[19.7,48.2],[20.1,48.2],[20.4,48.4],[20.8,48.6],[21.1,48.5],[21.5,48.5],[21.8,48.3],[22.1,48.4],[22.4,48.2],[22.6,48.1],[22.9,48],[22.5,47.8],[22.2,47.6],[21.9,47.4],[21.7,47.1],[21.5,46.7],[21.2,46.4],[21,46.3],[20.7,46.2],[20.5,46.2],[20.2,46.2],[19.8,46.2],[19.5,46.1],[19,46],[18.8,45.9]]],"type":"Polygon"},"type":"Feature","properties":{"iso2":"HU","lng":20,"lat":47}},{"geometry":{"coordinates":[[[[-7.4,55],[-7.7,54.7],[-8,54.5],[-7.9,54.3],[-7.6,54.1],[-7.1,54.4],[-6.7,54.1],[-6.2,54.1],[-6.4,53.9],[-6.2,53.7],[-6.2,53.4],[-6.1,52.9],[-6.2,52.6],[-6.3,52.3],[-6.8,52.2],[-7.1,52.1],[-7.5,52],[-7.9,51.9],[-8.3,51.9],[-8.5,51.7],[-9,51.6],[-9.6,51.5],[-9.7,51.6],[-9.5,51.8],[-10.1,51.6],[-9.7,51.9],[-10.4,51.9],[-9.8,52.1],[-10.1,52.1],[-10.5,52.2],[-9.7,52.2],[-9.7,52.6],[-9,52.6],[-9.1,52.6],[-9.6,52.7],[-9.3,53.2],[-8.9,53.1],[-9.4,53.2],[-9.7,53.4],[-9.8,53.4],[-10,53.6],[-9.9,53.8],[-9.7,53.9],[-9.9,54.1],[-10.1,54.3],[-9.6,54.3],[-9.1,54.2],[-8.6,54.3],[-8.3,54.5],[-8.8,54.7],[-8.4,54.8],[-8.5,55],[-7.8,55.2],[-7.5,55.1],[-7.5,55],[-7.4,55.3],[-7,55.2],[-7.3,55],[-7.4,55]]],[],[],[],[]],"type":"MultiPolygon"},"type":"Feature","properties":{"iso2":"IE","lng":-8,"lat":53}},{"geometry":{"coordinates":[[[-15.1,66.1],[-14.6,65.9],[-14.3,65.8],[-13.9,65.6],[-13.8,65.2],[-14,65.1],[-14,64.8],[-14.5,64.6],[-15.2,64.3],[-16.2,64],[-17.1,63.8],[-17.9,63.5],[-19.3,63.4],[-20.5,63.7],[-20.8,63.8],[-21.4,63.9],[-22.3,63.9],[-22.3,64],[-21.8,64.3],[-22.1,64.3],[-22.1,64.5],[-22.7,64.8],[-23.6,64.7],[-23.8,64.9],[-22.4,65.1],[-21.8,65.2],[-22.2,65.3],[-22.2,65.4],[-22.8,65.5],[-23.7,65.4],[-24.3,65.6],[-24,65.7],[-23.5,65.6],[-23.6,65.8],[-23.7,66],[-23.6,66.2],[-22.7,66.1],[-22.5,65.8],[-22.7,66.3],[-23.2,66.4],[-22,66.3],[-21.6,65.9],[-21.6,65.6],[-21.1,65.5],[-20.4,65.5],[-20.1,66.1],[-19.5,65.7],[-19.2,66.1],[-18.5,66.1],[-18,65.7],[-18,66.2],[-17.2,66.2],[-16.4,66.2],[-15.9,66.4],[-15.2,66.3],[-14.9,66.2],[-15.1,66.1]]],"type":"Polygon"},"type":"Feature","properties":{"iso2":"IS","lng":-18,"lat":65}},{"geometry":{"coordinates":[[[[12.1,47],[12.8,46.6],[13.5,46.4],[13.5,46.1],[13.9,45.6],[13.1,45.8],[12.4,45.4],[12.4,45],[12.3,44.5],[13,43.8],[13.6,43.5],[14.1,42.5],[14.9,42],[15.7,41.9],[15.9,41.6],[17,41.1],[18.1,40.5],[18.4,39.8],[17.9,40.3],[17.3,40.5],[16.6,40.1],[16.8,39.6],[17.1,38.9],[16.6,38.6],[16.1,38.1],[15.6,38],[15.8,38.6],[16.2,39],[15.9,39.5],[15.6,40.1],[14.9,40.2],[14.7,40.6],[14.2,40.8],[13.6,41.3],[12.9,41.4],[12.2,41.9],[11.6,42.3],[11.2,42.6],[10.6,43],[10.3,43.6],[9.4,44.3],[8.4,44.2],[7.7,43.8],[7.6,44.2],[6.9,44.5],[6.6,45.1],[7.2,45.4],[6.9,45.8],[7.6,46],[8.2,46.2],[8.4,46.2],[8.9,45.9],[9.2,46.2],[9.5,46.3],[10.1,46.2],[10.3,46.6],[10.6,46.9],[11.5,47],[12.1,47]]],[[[15.5,38.1],[15.4,37.9],[15.2,37.7],[15.2,37.5],[15.1,37.4],[15.2,37.2],[15.3,37.1],[15.2,37],[15.1,36.9],[15.1,36.7],[15,36.7],[14.8,36.7],[14.6,36.8],[14.4,36.9],[14.3,37],[14.1,37.1],[13.9,37.1],[13.6,37.2],[13.5,37.3],[13.3,37.4],[13.1,37.5],[13,37.6],[12.8,37.6],[12.5,37.7],[12.5,37.8],[12.5,38],[12.7,38.1],[12.9,38],[13,38.1],[13.1,38.2],[13.4,38.2],[13.7,38],[13.9,38],[14.1,38],[14.3,38],[14.5,38],[14.7,38.1],[14.9,38.2],[15.1,38.1],[15.3,38.2],[15.6,38.3],[15.6,38.2],[15.5,38.1]]],[[[9.5,41.1],[9.6,41],[9.6,40.9],[9.7,40.7],[9.7,40.6],[9.8,40.5],[9.7,40.4],[9.6,40.3],[9.7,40.1],[9.7,39.9],[9.7,39.7],[9.6,39.5],[9.6,39.3],[9.6,39.1],[9.4,39.1],[9.3,39.2],[9,39.1],[8.9,38.9],[8.7,38.9],[8.6,39],[8.5,39],[8.3,39.1],[8.4,39.2],[8.4,39.4],[8.4,39.6],[8.4,39.8],[8.5,39.7],[8.6,39.9],[8.4,39.9],[8.5,40.1],[8.5,40.3],[8.3,40.6],[8.1,40.6],[8.1,40.7],[8.3,40.9],[8.4,40.8],[8.6,40.8],[8.7,40.9],[8.8,41],[9,41.1],[9.2,41.2],[9.5,41.1]]],[],[],[],[]],"type":"MultiPolygon"},"type":"Feature","properties":{"iso2":"IT","lng":12.8,"lat":42.8}},{"geometry":{"coordinates":[],"type":"Polygon"},"type":"Feature","properties":{"iso2":"LI","lng":9.5,"lat":47.3}},{"geometry":{"coordinates":[[[[25,56.3],[25.3,56.2],[25.7,56.1],[26.1,55.9],[26.3,55.8],[26.5,55.7],[26.5,55.4],[26.8,55.3],[26.5,55.2],[26.2,55],[25.9,54.9],[25.7,54.7],[25.7,54.5],[25.5,54.3],[25.8,54.3],[25.6,54.1],[25.6,54.2],[25.2,54.2],[25,54.2],[24.8,54],[24.5,54],[24.3,53.9],[24.1,54],[23.9,53.9],[23.6,53.9],[23.5,54.1],[23.3,54.2],[23,54.4],[22.7,54.4],[22.8,54.8],[22.8,54.9],[22.5,55.1],[22.1,55.1],[21.7,55.2],[21.3,55.3],[21.2,55.4],[21.2,55.6],[21,55.9],[21.1,56.1],[21.3,56.2],[21.7,56.3],[22.1,56.4],[22.5,56.4],[22.8,56.4],[23,56.3],[23.2,56.4],[23.4,56.3],[23.6,56.4],[24,56.3],[24.3,56.3],[24.6,56.3],[24.9,56.5],[25,56.3]]],[]],"type":"MultiPolygon"},"type":"Feature","properties":{"iso2":"LT","lng":24,"lat":56}},{"geometry":{"coordinates":[[[6,50.2],[6.1,50.1],[6.1,50],[6.2,50],[6.2,49.9],[6.3,49.9],[6.3,49.8],[6.4,49.8],[6.5,49.8],[6.5,49.7],[6.4,49.7],[6.4,49.5],[6.3,49.5],[6.2,49.5],[6.1,49.5],[6,49.4],[5.9,49.5],[5.8,49.5],[5.8,49.6],[5.9,49.6],[5.9,49.7],[5.8,49.8],[5.7,49.8],[5.7,49.9],[5.8,50],[5.9,50.1],[6,50.2]]],"type":"Polygon"},"type":"Feature","properties":{"iso2":"LU","lng":6.2,"lat":49.8}},{"geometry":{"coordinates":[[[21.1,56.4],[21,56.7],[21.1,56.9],[21.4,57],[21.4,57.3],[21.6,57.5],[21.8,57.6],[22.1,57.6],[22.6,57.8],[22.7,57.6],[22.9,57.4],[23.2,57.3],[23.3,57.1],[23.7,57],[24,57],[24.4,57.3],[24.3,57.7],[24.4,57.9],[24.6,58],[25,58.1],[25.2,58],[25.4,58],[25.8,57.9],[26.2,57.7],[26.6,57.5],[26.9,57.6],[27.3,57.5],[27.5,57.4],[27.8,57.3],[27.8,57.2],[27.8,56.9],[27.9,56.7],[28.2,56.4],[28.1,56.2],[27.7,56],[27.6,55.8],[27.2,55.8],[26.9,55.8],[26.7,55.7],[26.4,55.7],[26.2,55.8],[26,56],[25.6,56.2],[25.2,56.2],[25,56.4],[24.7,56.4],[24.4,56.3],[24.1,56.3],[23.7,56.4],[23.5,56.3],[23.3,56.4],[23.1,56.3],[22.9,56.4],[22.6,56.4],[22.2,56.4],[21.9,56.4],[21.4,56.2],[21.2,56.1],[21,56.2],[21.1,56.4]]],"type":"Polygon"},"type":"Feature","properties":{"iso2":"LV","lng":25,"lat":57}},{"geometry":{"coordinates":[],"type":"Polygon"},"type":"Feature","properties":{"iso2":"MC","lng":7.4,"lat":43.7}},{"geometry":{"coordinates":[[[28.1,46.9],[28,47],[27.9,47.1],[27.7,47.3],[27.6,47.4],[27.4,47.6],[27.3,47.7],[27.2,47.9],[27,48.2],[26.7,48.3],[26.8,48.3],[27.2,48.4],[27.5,48.5],[27.8,48.4],[27.9,48.3],[28.1,48.3],[28.2,48.2],[28.4,48.2],[28.5,48.1],[28.7,48.1],[28.9,48],[29.1,47.9],[29.2,48],[29.2,47.6],[29.1,47.5],[29.2,47.5],[29.3,47.4],[29.4,47.3],[29.6,47.3],[29.6,47],[29.7,46.9],[29.9,46.8],[30,46.6],[29.9,46.5],[30,46.4],[29.9,46.4],[29.8,46.4],[29.6,46.4],[29.5,46.5],[29.3,46.4],[29.2,46.5],[28.9,46.4],[29,46.2],[28.9,46],[28.7,46],[28.8,45.9],[28.7,45.8],[28.5,45.7],[28.5,45.5],[28.3,45.5],[28.2,45.4],[28.2,45.6],[28.1,45.9],[28.1,46.1],[28.2,46.3],[28.3,46.4],[28.2,46.7],[28.1,46.9]]],"type":"Polygon"},"type":"Feature","properties":{"iso2":"MD","lng":29,"lat":47}},{"geometry":{"coordinates":[[[18.5,42.6],[18.6,42.7],[18.5,42.8],[18.6,43],[18.7,43.1],[18.7,43.3],[18.9,43.4],[19,43.2],[19.1,43.3],[19,43.5],[19,43.6],[19.3,43.5],[19.4,43.4],[19.6,43.3],[19.7,43.2],[19.9,43.1],[20,43],[20.2,43],[20.4,42.8],[20.1,42.8],[20,42.7],[20.1,42.6],[19.9,42.5],[19.7,42.5],[19.7,42.7],[19.6,42.6],[19.5,42.4],[19.4,42.1],[19.3,41.9],[19.2,41.9],[19.1,42],[19,42.1],[18.9,42.3],[18.7,42.4],[18.5,42.4],[18.5,42.5],[18.5,42.6]]],"type":"Polygon"},"type":"Feature","properties":{"iso2":"ME","lng":19.3,"lat":42.5}},{"geometry":{"coordinates":[[[20.8,40.9],[20.7,41.1],[20.6,41.2],[20.5,41.3],[20.6,41.4],[20.5,41.6],[20.5,41.8],[20.7,41.9],[20.8,42],[20.9,42.1],[21.2,42.1],[21.3,42.2],[21.6,42.3],[21.8,42.3],[22,42.3],[22.2,42.3],[22.4,42.3],[22.5,42.1],[22.7,42.1],[22.9,41.9],[23,41.8],[23,41.6],[23,41.4],[22.8,41.3],[22.7,41.2],[22.6,41.1],[22.4,41.1],[22.3,41.2],[22,41.1],[21.9,41],[21.6,40.9],[21.4,40.9],[21.2,40.9],[21,40.9],[20.8,40.9]]],"type":"Polygon"},"type":"Feature","properties":{"iso2":"MK","lng":22,"lat":41.8}},{"geometry":{"coordinates":[[],[]],"type":"MultiPolygon"},"type":"Feature","properties":{"iso2":"MT","lng":14.6,"lat":35.8}},{"geometry":{"coordinates":[[[[6.9,53.4],[7.2,53],[7.1,52.7],[6.9,52.7],[6.7,52.5],[7,52.5],[7.1,52.2],[6.8,52.1],[6.8,51.9],[6.4,51.8],[6,51.7],[6.2,51.4],[6,51.1],[6.1,50.9],[5.9,50.8],[5.6,50.9],[5.9,51.2],[5.5,51.3],[5.1,51.3],[5,51.4],[4.7,51.5],[4.5,51.5],[4.3,51.4],[3.8,51.4],[3.5,51.6],[3.9,51.6],[4.1,51.5],[4.1,51.6],[3.7,51.7],[4.1,51.8],[4,52],[4.5,52.3],[4.7,52.5],[5,52.4],[5.4,52.3],[5.6,52.4],[5.9,52.5],[5.6,52.7],[5.6,52.9],[5.3,53.1],[5.1,52.8],[5.2,52.7],[5.1,52.5],[4.7,52.8],[4.8,52.9],[5.5,53.2],[6.1,53.4],[6.7,53.5],[6.9,53.4]]],[[[3.8,51.3],[3.9,51.3],[4,51.4],[4.2,51.4],[4.2,51.3],[4.1,51.3],[4,51.2],[3.9,51.2],[3.8,51.2],[3.7,51.3],[3.6,51.3],[3.5,51.3],[3.5,51.2],[3.4,51.2],[3.4,51.3],[3.4,51.4],[3.5,51.4],[3.6,51.4],[3.7,51.4],[3.8,51.3]]],[[[5.8,52.4],[5.7,52.4],[5.6,52.4],[5.5,52.4],[5.5,52.3],[5.6,52.3],[5.4,52.3],[5.3,52.3],[5.2,52.3],[5.1,52.3],[5.1,52.4],[5.2,52.4],[5.3,52.5],[5.4,52.5],[5.5,52.5],[5.6,52.6],[5.8,52.6],[5.9,52.5],[5.8,52.5],[5.8,52.4]]],[],[],[],[]],"type":"MultiPolygon"},"type":"Feature","properties":{"iso2":"NL","lng":5.8,"lat":52.5}},{"geometry":{"coordinates":[[[[5.3,61.6],[5.2,61.9],[6.3,62.4],[6.4,62.5],[7.6,62.8],[8.3,62.8],[8.8,63.3],[10.6,63.4],[11,64],[9.6,63.7],[10.9,64.6],[11.2,64.7],[12.4,65.3],[12.9,66.1],[13,66.4],[13.8,66.9],[15.5,67.2],[15.5,67.4],[15,67.8],[16,68.2],[16.4,68.3],[17.1,68.5],[17.7,69.1],[19.2,69.3],[19.7,69.4],[20.8,69.8],[21.5,70.1],[22.7,70.1],[24.2,70.6],[25.3,70.9],[25.3,70.1],[26.6,70.4],[27.7,71.1],[28.3,70.7],[29.3,70.7],[30.7,70.3],[29.7,69.9],[30.9,69.5],[29.1,69.4],[26.2,69.8],[24.4,68.7],[21.7,69.3],[19.9,68.3],[16.1,67.4],[14.3,65.1],[12.3,63.7],[12.8,61.4],[11.9,59.8],[10.6,59.9],[10,59],[7.2,58],[5.6,59],[6.5,59.3],[5.2,59.5],[6.2,60.3],[5.7,60.4],[5,60.8],[6.3,61.1],[6.7,61.4],[5.3,61.6]]],[[[16,68.8],[16,68.7],[15.9,68.7],[15.9,68.6],[15.8,68.6],[15.7,68.5],[15.8,68.5],[16.1,68.7],[16.1,68.8],[16.2,68.9],[16.4,68.9],[16.4,68.8],[16.5,68.8],[16.6,68.7],[16.6,68.6],[16.5,68.6],[16.4,68.6],[16.3,68.6],[16.2,68.5],[16.1,68.5],[16,68.5],[16,68.4],[15.9,68.4],[15.8,68.4],[15.7,68.3],[15.6,68.3],[15.5,68.3],[15.4,68.3],[15.3,68.3],[15.4,68.4],[15.5,68.4],[15.6,68.5],[15.5,68.5],[15.3,68.4],[15.2,68.3],[15.1,68.3],[15,68.2],[15,68.3],[15.1,68.4],[15.2,68.5],[15.3,68.5],[15.2,68.6],[15.3,68.6],[15.4,68.6],[15.5,68.7],[15.4,68.7],[15.6,68.7],[15.7,68.7],[15.5,68.8],[15.6,68.9],[15.7,69],[15.9,69],[15.9,68.9],[15.9,68.8],[16,68.8]]],[[[17.6,69.5],[17.7,69.5],[17.7,69.6],[17.8,69.6],[17.9,69.6],[18,69.5],[18.1,69.4],[18.1,69.3],[18,69.3],[17.9,69.3],[17.9,69.2],[18,69.2],[17.6,69.2],[17.5,69.2],[17.4,69.2],[17.2,69.1],[17.2,69],[17.1,69],[17,69],[17.1,69.1],[17,69.1],[16.9,69.1],[16.8,69],[16.8,69.1],[17.1,69.2],[17.2,69.2],[17,69.2],[16.9,69.2],[17.1,69.3],[17,69.3],[16.9,69.3],[17,69.4],[16.9,69.4],[17.2,69.4],[17.3,69.4],[17.4,69.4],[17.5,69.4],[17.2,69.5],[17.3,69.5],[17.4,69.5],[17.5,69.5],[17.5,69.6],[17.6,69.6],[17.6,69.5]]],[[[23.5,70.8],[23.4,70.7],[23.3,70.7],[23.2,70.7],[23.1,70.6],[22.9,70.5],[22.8,70.5],[22.8,70.6],[22.7,70.6],[22.6,70.6],[22.6,70.5],[22.5,70.5],[22.3,70.5],[22.2,70.5],[22.1,70.5],[22.3,70.6],[22.2,70.6],[22.1,70.6],[22,70.6],[21.9,70.6],[22,70.7],[22.1,70.7],[22.3,70.7],[22.4,70.7],[22.5,70.7],[22.6,70.7],[22.7,70.7],[22.8,70.7],[22.8,70.8],[22.9,70.7],[23,70.7],[23.1,70.7],[23.2,70.8],[23.3,70.8],[23.3,70.9],[23.4,70.9],[23.4,70.8],[23.5,70.8]]],[[[15.4,68.8],[15.4,68.7],[15.3,68.6],[15.1,68.6],[15,68.6],[14.9,68.6],[14.8,68.6],[14.9,68.7],[15.1,68.7],[15.2,68.7],[15.1,68.8],[15,68.8],[15,68.7],[14.8,68.7],[14.7,68.7],[14.5,68.6],[14.4,68.6],[14.4,68.7],[14.4,68.8],[14.5,68.8],[14.6,68.8],[14.7,68.8],[14.9,68.8],[14.9,68.9],[15,68.9],[15.1,68.9],[15.2,68.8],[15,69],[15.1,69],[15.2,69],[15.2,68.9],[15.3,68.9],[15.4,68.8]]],[[[18.9,69.7],[18.8,69.7],[18.8,69.6],[18.7,69.6],[18.6,69.6],[18.5,69.6],[18.4,69.5],[18.3,69.5],[18.2,69.5],[18,69.6],[18.1,69.6],[18.2,69.6],[18.3,69.6],[18.2,69.7],[18.3,69.7],[18.4,69.7],[18.6,69.7],[18.5,69.7],[18.3,69.8],[18.4,69.8],[18.5,69.8],[18.6,69.8],[18.7,69.7],[18.8,69.8],[18.7,69.8],[18.7,69.9],[18.8,69.9],[19,69.8],[19.1,69.8],[19,69.7],[18.9,69.7]]],[[[19.3,70],[19.4,70],[19.5,70],[19.5,70.1],[19.6,70],[19.7,70],[19.5,69.9],[19.4,69.8],[19.3,69.8],[19.2,69.8],[19.1,69.8],[19,69.8],[19,69.9],[18.9,69.9],[18.8,69.9],[18.7,69.9],[18.8,70],[18.9,70],[19,70],[19.1,70],[19.1,70.1],[19.2,70.1],[19.3,70.1],[19.3,70]]]],"type":"MultiPolygon"},"type":"Feature","properties":{"iso2":"NO","lng":10,"lat":62}},{"geometry":{"coordinates":[[[18.9,49.5],[18.5,49.9],[17.9,50],[17.8,50.2],[17.2,50.3],[17,50.2],[16.6,50.2],[16.2,50.4],[16.1,50.7],[15.5,50.8],[15,50.9],[15,51.4],[14.8,51.6],[14.8,52.1],[14.6,52.5],[14.2,52.8],[14.4,53.3],[14.6,53.8],[14.2,53.9],[15,54.1],[15.8,54.2],[16.3,54.4],[16.9,54.6],[17.4,54.7],[17.9,54.8],[18.6,54.7],[18.5,54.6],[18.9,54.4],[19.4,54.4],[19.2,54.3],[19.9,54.4],[20.7,54.4],[21.5,54.3],[22.3,54.3],[22.9,54.4],[23.5,54.2],[23.6,53.6],[23.9,52.8],[23.4,52.5],[23.6,52.1],[23.6,51.7],[23.7,51.2],[24.1,50.9],[24,50.4],[23.5,50.2],[22.7,49.6],[22.9,49.1],[22.3,49.1],[21.5,49.4],[20.9,49.3],[20.2,49.3],[19.8,49.3],[19.4,49.6],[18.9,49.5]]],"type":"Polygon"},"type":"Feature","properties":{"iso2":"PL","lng":20,"lat":52}},{"geometry":{"coordinates":[[[[-8.2,41.9],[-7.9,41.9],[-7.6,41.8],[-7.2,41.9],[-6.9,42],[-6.6,42],[-6.5,41.7],[-6.2,41.6],[-6.4,41.3],[-6.8,41.1],[-6.8,40.9],[-6.8,40.4],[-7,40.1],[-7.1,39.7],[-7.4,39.6],[-7.3,39.4],[-7,39.1],[-7.2,38.8],[-7.2,38.3],[-7,38.1],[-7.3,38],[-7.4,37.7],[-7.4,37.3],[-7.6,37.1],[-8.1,37.1],[-8.7,37.1],[-9,37.1],[-8.8,37.4],[-8.8,37.9],[-8.8,38.3],[-8.9,38.5],[-9.2,38.5],[-9.1,38.6],[-9,38.9],[-9.4,38.7],[-9.4,38.9],[-9.3,39.2],[-9.3,39.4],[-9,39.7],[-8.9,40.1],[-8.8,40.5],[-8.7,40.8],[-8.7,41.2],[-8.9,41.7],[-8.7,42],[-8.4,42.1],[-8.1,42.1],[-8.2,41.9]]],[[[-25.6,37.8],[-25.5,37.8],[-25.4,37.8],[-25.4,37.9],[-25.3,37.9],[-25.2,37.9],[-25.1,37.8],[-25.2,37.7],[-25.3,37.7],[-25.5,37.7],[-25.6,37.7],[-25.7,37.7],[-25.7,37.8],[-25.8,37.8],[-25.9,37.8],[-25.9,37.9],[-25.8,37.9],[-25.7,37.9],[-25.6,37.8]]],[],[],[],[],[]],"type":"MultiPolygon"},"type":"Feature","properties":{"iso2":"PT","lng":-8,"lat":39.5}},{"geometry":{"coordinates":[[[20.7,46.2],[21,46.2],[21.3,46.6],[21.7,47],[21.9,47.4],[22.2,47.7],[22.7,47.8],[23.1,48.1],[23.5,48],[24.2,47.9],[24.6,47.9],[24.9,47.7],[25.2,47.9],[25.8,48],[26.3,48.1],[26.7,48.3],[27.2,47.8],[27.6,47.4],[27.9,47],[28.2,46.7],[28.1,46.2],[28.2,45.6],[28.3,45.3],[28.8,45.3],[29.5,45.4],[29.6,45.2],[29.5,44.8],[29,44.8],[28.9,45],[28.8,44.6],[28.9,44.5],[28.6,44.2],[28.6,43.7],[28.1,43.8],[27.8,44],[27.3,44.1],[26.8,44.1],[26.1,44],[25.7,43.7],[25.3,43.7],[24.7,43.7],[24.4,43.7],[23.8,43.8],[23.3,43.8],[22.9,43.9],[22.9,44.1],[22.5,44.4],[22.8,44.5],[22.3,44.7],[21.9,44.6],[21.5,44.8],[21.5,45],[21.4,45.2],[20.8,45.7],[20.5,45.9],[20.6,46.2],[20.7,46.2]]],"type":"Polygon"},"type":"Feature","properties":{"iso2":"RO","lng":25,"lat":46}},{"geometry":{"coordinates":[[[20.1,42.6],[20.1,42.8],[20.2,43],[19.9,43.1],[19.6,43.3],[19.3,43.5],[19.5,43.7],[19.3,44],[19.6,44],[19.2,44.3],[19.2,44.6],[19.3,44.9],[19.1,45],[19.4,45.2],[19,45.5],[18.9,45.6],[18.8,45.9],[19.2,46],[19.7,46.2],[20,46.2],[20.3,46.1],[20.7,45.8],[20.8,45.6],[21.4,45.2],[21.4,45],[21.4,44.9],[21.6,44.7],[22,44.6],[22.3,44.7],[22.7,44.6],[22.6,44.5],[22.6,44.3],[22.6,44.1],[22.4,43.7],[22.7,43.4],[23,43.2],[22.5,42.9],[22.5,42.5],[22.3,42.4],[21.9,42.3],[21.5,42.3],[21.1,42.2],[20.8,41.9],[20.5,42.2],[20.2,42.3],[20.1,42.6]]],"type":"Polygon"},"type":"Feature","properties":{"iso2":"RS","lng":21,"lat":44}},{"geometry":{"coordinates":[[[[104.3,77.7],[110.9,76.8],[110,74.4],[110.6,73.8],[117,73.6],[127.3,71.4],[135.3,71.6],[143.1,72.7],[148.5,72.3],[159,70.9],[168.2,69.5],[178.2,69.4],[177,64.7],[173.4,61.6],[164.3,60.1],[161.7,55.6],[155.9,54],[164,61.4],[159.8,61.3],[152.6,59],[144.5,59.4],[136.7,53.8],[141.3,52.3],[135,43.5],[133.5,45.6],[127.5,50.2],[120.5,51.9],[109.6,49.2],[98.7,51.8],[89.7,49.8],[80.3,50.9],[71.1,54.3],[61.4,54.1],[57.9,51.1],[48.7,50.5],[47.5,45.5],[43.1,43],[38.4,46.7],[37.8,50.1],[31.9,54],[29.5,60],[29.6,65.3],[33,69.5],[38.6,66.1],[34.6,65.2],[39.7,65.5],[46.5,68],[52.3,68.3],[59,68.9],[67.3,68.7],[70.2,72.9],[72.3,67.3],[74.5,68.7],[74,69.1],[78,71],[82.9,71.7],[80.5,73.2],[86.5,74.3],[93.2,75.8],[99.1,75.5],[104.3,77.7]]],[[[68.3,77],[68.9,76.6],[67.7,76.2],[66.7,76.1],[65.2,75.8],[64.2,75.7],[63.2,75.6],[62.3,75.4],[61.4,75.2],[60.7,75.1],[60.5,75],[60.5,74.9],[60.1,74.7],[59.9,74.6],[59.2,74.6],[58.6,74.5],[58.7,74.2],[58.2,74.1],[57.6,74.2],[57.9,73.9],[57.3,73.8],[57,73.8],[57,73.6],[57,73.4],[56.6,73.3],[55.9,73.4],[55,73.4],[54.1,73.4],[54.5,73.6],[54.4,73.7],[53.6,73.7],[54.2,73.9],[54.8,74.1],[55.9,74.1],[55.7,74.3],[56.3,74.5],[55.9,74.7],[57,74.7],[55.9,74.8],[56.4,75],[55.8,75.1],[56.3,75.2],[56.9,75.3],[57.5,75.3],[58,75.6],[58.5,75.8],[59.4,75.9],[60.3,76],[60.5,76],[60.9,76.2],[61.8,76.3],[62.8,76.3],[63.7,76.3],[64.8,76.5],[65.5,76.6],[65.9,76.7],[66.7,76.9],[67.6,77],[68.3,77]]],[[[97.6,80.2],[98,80.1],[97.6,79.8],[97.3,79.7],[97.7,79.8],[97.9,79.9],[98.2,79.9],[98.6,80],[98.5,80.1],[98.8,80],[99.1,80],[99.5,79.9],[99.8,79.9],[100,79.7],[99.7,79.6],[99.7,79.3],[99.4,79.3],[99.1,79.3],[99.6,79.2],[99.7,79.1],[99.9,79],[99.7,78.9],[99.4,78.8],[99,78.8],[98.6,78.8],[98,78.8],[97.6,78.8],[97.2,78.9],[96.9,79],[96.3,79],[96.1,79],[95.7,79],[95.7,79.1],[95.3,79.1],[95,79],[94.6,79.2],[94.3,79.2],[94.4,79.4],[94.2,79.5],[94.1,79.4],[93.7,79.5],[93.8,79.6],[93.5,79.5],[93.2,79.4],[93.2,79.5],[92.9,79.6],[93.8,79.7],[94.3,79.8],[94.6,79.8],[94.2,79.9],[94.6,80],[95,80.1],[95.2,80],[95.4,80.1],[96,80.1],[96.4,80.1],[97.1,80.2],[97.5,80.2],[97.6,80.2]]],[[[-179.6,68.9],[-179.1,68.8],[-178.8,68.6],[-178,68.3],[-178.4,68.6],[-177.4,68.2],[-176.8,68.1],[-175.6,67.8],[-175.3,67.4],[-174.8,67.4],[-174.8,66.7],[-174.5,66.6],[-174.3,66.4],[-174,66.2],[-174.1,66.6],[-174.4,67],[-174.2,67.1],[-173.4,67.1],[-173.4,66.8],[-172.6,66.9],[-173,67.1],[-171.7,67],[-171.3,66.7],[-170.5,66.3],[-170.2,66.3],[-169.9,66.1],[-170,66],[-170.5,65.7],[-171.3,65.8],[-171.1,65.5],[-171.9,65.5],[-172.3,65.6],[-172.7,65.6],[-172.3,65.4],[-172.7,65.2],[-172.4,64.9],[-173.2,64.8],[-173.1,64.7],[-172.4,64.4],[-173,64.5],[-173.3,64.3],[-173.4,64.5],[-174.1,64.5],[-175,64.8],[-175.8,64.9],[-175.9,65.4],[-176.6,65.6],[-177.5,65.5],[-178.6,65.5],[-178.9,65.9],[-178.5,66.3],[-179.1,66.2],[-179.2,66.2],[-179.7,66.2],[-179.4,65.6],[-179.6,65.2],[-180,66.1],[-179.6,68.9]]],[[[128.1,72.6],[128.6,72.5],[128.7,72.5],[128.8,72.5],[128.9,72.5],[129,72.5],[129.1,72.5],[129.2,72.5],[129.3,72.5],[129.3,72.4],[129.4,72.4],[129.5,72.4],[129.5,72.3],[129.4,72.3],[129.3,72.3],[129.5,72.2],[129.6,72.2],[129.4,72.2],[129.2,72.1],[129.3,72.1],[129.4,72.1],[129.5,72.1],[129,72.1],[128.9,72.1],[128.8,72.1],[128.7,72.1],[128.5,72.1],[128.5,72.2],[128.6,72.2],[128.4,72.2],[128.2,72.2],[128,72.3],[127.9,72.3],[127.7,72.4],[127.6,72.4],[127.5,72.4],[127.4,72.4],[127.3,72.4],[127.2,72.4],[127.1,72.4],[127,72.4],[126.8,72.4],[126.7,72.4],[126.6,72.5],[126.7,72.5],[126.8,72.5],[126.9,72.5],[127,72.5],[127,72.6],[127.1,72.6],[127.2,72.6],[127.3,72.6],[127.4,72.6],[127.5,72.6],[127.7,72.6],[127.8,72.6],[128,72.6],[128.1,72.6]]],[[[124.6,73.7],[124.8,73.7],[125,73.6],[125.1,73.7],[125.2,73.7],[125.2,73.5],[125.4,73.6],[125.5,73.5],[125.6,73.4],[125.9,73.5],[126.2,73.6],[126.3,73.5],[126.3,73.4],[126.2,73.4],[126.5,73.4],[126.6,73.3],[126.7,73.2],[126.6,73],[126.4,73],[126.3,72.9],[126.4,72.8],[126.2,72.5],[126.3,72.4],[126.1,72.3],[125.9,72.4],[125.7,72.4],[125.5,72.4],[125.3,72.5],[125.2,72.6],[125,72.6],[124.8,72.6],[124.7,72.7],[124.4,72.7],[124.2,72.8],[124,72.8],[123.8,72.8],[123.6,72.8],[123.4,72.8],[123.3,72.9],[123.1,72.9],[122.9,72.9],[122.5,72.9],[122.4,73],[122.7,73],[122.9,73],[123.4,73.2],[123.6,73.2],[123.4,73.3],[123.2,73.6],[123.4,73.6],[123.5,73.7],[123.7,73.6],[123.9,73.7],[124,73.8],[124,73.7],[124.2,73.8],[124.4,73.8],[124.6,73.7]]],[[[54.7,81.1],[54.9,81.1],[55,81.1],[55.1,81.1],[55.2,81.1],[55.3,81],[55.4,81],[55.5,81],[55.6,81],[55.8,81],[56,81],[56.1,81],[56.4,81],[56.6,81],[56.6,80.9],[56.7,80.9],[56.8,80.9],[56.9,80.9],[57,80.9],[57.1,80.9],[57.2,80.9],[57.3,80.9],[57.5,80.8],[57.6,80.8],[57.7,80.8],[57.5,80.7],[57.4,80.7],[57.3,80.7],[57.2,80.7],[57.1,80.7],[57,80.7],[56.9,80.7],[56.8,80.8],[56.7,80.8],[56.6,80.8],[56.5,80.8],[56.3,80.8],[56.2,80.8],[56.1,80.8],[56,80.8],[55.8,80.9],[55.7,80.9],[55.6,80.9],[55.5,80.9],[55.4,80.9],[55.2,81],[55.1,81],[55,80.9],[55,81],[54.9,81],[54.8,81],[54.7,81],[54.6,81],[54.5,81],[54.4,81],[54.6,81.1],[54.7,81.1]]]],"type":"MultiPolygon"},"type":"Feature","properties":{"iso2":"RU","lng":100,"lat":60}},{"geometry":{"coordinates":[[[[21.8,68.6],[23,68.3],[23.5,67.6],[23.7,67],[23.7,66.2],[23.5,65.8],[22.4,65.9],[22.1,65.5],[21.6,65.2],[21.2,64.8],[21.6,64.4],[20.4,63.7],[19.5,63.6],[18.9,63.2],[17.9,62.8],[17.5,62.4],[17.5,62],[17.2,61.6],[17.5,60.6],[18.4,60.3],[19.1,59.8],[18.2,59.4],[17.7,59.6],[17.4,59.5],[16.5,59.5],[17.1,59.4],[18.4,59.3],[17.9,58.9],[17.1,58.8],[16.2,58.6],[16.8,58.2],[16.7,57.7],[16.6,57.1],[16,56.3],[14.8,56.1],[14.3,55.6],[13.4,55.3],[12.7,56.2],[12.8,56.6],[12.2,57.3],[11.7,57.8],[11.2,58.3],[11.4,59.1],[11.8,59.7],[12.6,60.4],[12.6,61.1],[12.3,62.1],[12.2,63],[12.7,64],[14.1,64.5],[14.4,65.2],[15,66.1],[16.2,67.3],[17.6,68],[18.6,68.5],[20,68.5],[20.8,69],[21.8,68.6]]],[[[18.2,56.9],[18.1,56.9],[18.2,57],[18.3,57],[18.3,57.1],[18.2,57.1],[18.1,57.2],[18.2,57.3],[18.1,57.4],[18.1,57.5],[18.1,57.6],[18.2,57.6],[18.3,57.6],[18.3,57.7],[18.4,57.7],[18.4,57.8],[18.5,57.8],[18.7,57.9],[18.9,57.9],[19,57.9],[19,57.8],[18.9,57.7],[18.8,57.7],[18.8,57.5],[18.8,57.4],[18.7,57.2],[18.6,57.2],[18.5,57.2],[18.4,57.2],[18.4,57.1],[18.3,56.9],[18.2,56.9]]],[[[16.8,56.8],[16.7,56.7],[16.6,56.5],[16.6,56.4],[16.6,56.3],[16.5,56.2],[16.4,56.2],[16.4,56.3],[16.4,56.5],[16.4,56.6],[16.5,56.8],[16.6,56.9],[16.7,56.9],[16.8,57.1],[16.9,57.1],[17,57.2],[17,57.3],[17,57.4],[17.1,57.4],[17.1,57.3],[17.1,57.2],[17,57.1],[16.9,57],[16.9,56.9],[16.8,56.8]]],[],[],[],[]],"type":"MultiPolygon"},"type":"Feature","properties":{"iso2":"SE","lng":15,"lat":62}},{"geometry":{"coordinates":[[[13.7,46.5],[13.9,46.5],[14.2,46.4],[14.8,46.5],[14.9,46.6],[15.1,46.7],[15.4,46.7],[15.8,46.7],[16,46.8],[16.2,46.9],[16.3,46.8],[16.4,46.7],[16.6,46.5],[16.3,46.5],[16.3,46.4],[16.1,46.3],[15.8,46.2],[15.6,46.2],[15.7,46.1],[15.7,45.9],[15.6,45.8],[15.3,45.8],[15.4,45.7],[15.3,45.5],[15.1,45.5],[14.9,45.5],[14.7,45.5],[14.6,45.7],[14.5,45.5],[14.1,45.5],[13.9,45.5],[13.6,45.5],[13.8,45.5],[13.7,45.6],[13.8,45.7],[13.7,45.8],[13.6,45.9],[13.5,46],[13.6,46.1],[13.7,46.2],[13.5,46.2],[13.4,46.3],[13.7,46.4],[13.7,46.5]]],"type":"Polygon"},"type":"Feature","properties":{"iso2":"SI","lng":14.8,"lat":46.1}},{"geometry":{"coordinates":[[[17.3,48],[17.1,48.1],[17,48.3],[16.9,48.4],[17,48.7],[17.2,48.9],[17.5,48.8],[17.8,48.9],[18.1,49.1],[18.2,49.3],[18.5,49.5],[18.8,49.5],[19,49.4],[19.3,49.5],[19.5,49.5],[19.8,49.4],[19.9,49.2],[20.1,49.3],[20.4,49.4],[20.8,49.3],[21,49.4],[21.4,49.4],[21.8,49.4],[22.2,49.2],[22.5,49.1],[22.5,49],[22.4,48.8],[22.2,48.4],[21.9,48.4],[21.7,48.4],[21.5,48.5],[21.2,48.5],[20.9,48.5],[20.7,48.6],[20.4,48.4],[20.2,48.3],[19.9,48.1],[19.6,48.2],[19.2,48.1],[18.9,48.1],[18.8,47.9],[18.7,47.8],[18.4,47.8],[18.2,47.7],[17.9,47.8],[17.7,47.8],[17.4,48],[17.3,48]]],"type":"Polygon"},"type":"Feature","properties":{"iso2":"SK","lng":19.5,"lat":48.7}},{"geometry":{"coordinates":[],"type":"Polygon"},"type":"Feature","properties":{"iso2":"SM","lng":12.4,"lat":43.8}},{"geometry":{"coordinates":[[[[35.1,42],[36.1,41.7],[36.6,41.4],[37.4,41.1],[38.2,40.9],[39.1,41.1],[40.3,41],[41.4,41.4],[42.3,41.5],[43.2,41.2],[43.7,40.7],[44,40],[44.8,39.6],[44.2,39],[44.5,38.3],[44.6,37.4],[44.2,37.1],[43.5,37.2],[42.4,37.1],[41.5,37.1],[40.3,36.9],[39,36.7],[38,36.8],[37,36.7],[36.5,36.2],[36,35.9],[36,36.5],[35.7,36.8],[34.9,36.8],[34,36.3],[32.8,36],[32,36.5],[30.7,36.9],[30.3,36.3],[29.3,36.2],[28.9,36.7],[28.2,36.7],[27.7,36.7],[27.8,37],[27.5,37.1],[27.2,37.5],[26.8,38.2],[26.4,38.3],[26.5,38.6],[27,38.5],[26.8,39],[27,39.6],[26.2,39.7],[26.7,40.3],[27.5,40.3],[28,40.4],[29,40.5],[29.6,40.7],[29.1,40.9],[29.9,41.1],[30.9,41.1],[32,41.5],[33.2,42],[34.2,42],[35.1,42]]],[[[27.4,42],[27.6,42],[27.8,42],[28,42],[28,41.8],[28.2,41.5],[28.5,41.4],[28.9,41.3],[29,41.3],[29.1,41.2],[29,41.1],[28.8,41],[28.6,41.1],[28.5,41],[28.4,41.1],[28.1,41.1],[27.9,41],[27.7,41],[27.5,40.9],[27.4,40.8],[27.2,40.6],[27,40.6],[26.7,40.5],[26.6,40.4],[26.4,40.2],[26.2,40.1],[26.2,40.2],[26.3,40.3],[26.4,40.4],[26.6,40.5],[26.8,40.7],[26.6,40.6],[26.3,40.6],[26.1,40.7],[26.1,40.8],[26.2,40.9],[26.4,41],[26.3,41.2],[26.6,41.3],[26.6,41.5],[26.5,41.6],[26.3,41.7],[26.4,41.8],[26.6,41.9],[26.9,42],[27,42.1],[27.2,42.1],[27.4,42.1],[27.4,42]]],[],[],[]],"type":"MultiPolygon"},"type":"Feature","properties":{"iso2":"TR","lng":35,"lat":39}},{"geometry":{"coordinates":[[[[33.4,52.4],[34.2,51.7],[35.1,51.1],[35.5,50.5],[36.5,50.2],[37.7,50.1],[38.7,49.9],[39.5,49.8],[40.2,49.2],[40,48.8],[39.8,47.9],[38.8,47.9],[38.1,47.1],[36.8,46.8],[35.5,46.5],[35,46.2],[34.2,46.3],[34.1,45.9],[35.1,45.5],[34.7,46.1],[36.1,45.5],[35.9,45],[34.7,44.8],[33.4,44.6],[33.1,45.2],[32.8,45.6],[33.6,46],[32.5,46.1],[31.5,46.6],[32.2,46.6],[31.9,47.1],[30.9,46.6],[29.9,45.7],[29.7,45.2],[28.4,45.3],[28.8,45.9],[29.4,46.5],[30,46.6],[29.3,47.5],[28.7,48.1],[27.8,48.5],[26.1,48],[24.9,47.7],[23.8,48],[22.7,48.1],[22.5,48.9],[22.8,49.7],[24.1,50.7],[23.7,51.5],[24.9,51.9],[26.2,51.9],[27.2,51.7],[28.2,51.7],[29.2,51.6],[30.3,51.4],[30.9,52.1],[32.3,52.1],[33.4,52.4]]],[],[],[]],"type":"MultiPolygon"},"type":"Feature","properties":{"iso2":"UA","lng":32,"lat":49}},{"geometry":{"coordinates":[[[64.4,39],[63.7,39.3],[62.9,39.7],[62.3,40.4],[61.7,41.2],[60.9,41.3],[60.2,41.3],[60.3,41.8],[59.4,42.3],[58.8,42.7],[58.1,42.6],[57.9,42.4],[57.4,42.2],[57,41.5],[56.4,41.3],[56,42.8],[56.3,45.1],[58,45.5],[62,43.5],[64,43.6],[65.6,43.2],[66,42.3],[66.9,41.1],[67.9,41.2],[68.3,40.7],[68.9,41.1],[69.6,41.7],[70.5,42.1],[71.2,42.2],[70.5,41.8],[70.6,41.5],[71.4,41.3],[71.6,41.6],[72.3,41],[73.1,40.8],[72.4,40.4],[71.5,40.2],[70.8,40.2],[70.4,40.5],[70.4,41.1],[69.8,40.6],[69.3,40.6],[68.7,40.2],[68.9,40],[68.5,39.6],[67.4,39.5],[67.9,39],[68.1,38.4],[68.1,37.8],[67.7,37.2],[66.8,37.4],[66.7,38],[65.8,38.2],[64.9,38.7],[64.4,39]]],"type":"Polygon"},"type":"Feature","properties":{"iso2":"UZ","lng":64,"lat":41}},{"geometry":{"coordinates":[],"type":"Polygon"},"type":"Feature","properties":{"iso2":"VA","lng":12.4,"lat":41.9}},{"geometry":{"coordinates":[[[20.8,42.1],[20.7,41.8],[20.6,41.9],[20.5,42.2],[20.3,42.3],[20.1,42.6],[20.3,42.8],[20.5,42.9],[20.6,43.2],[20.8,43.3],[21,43.1],[21.1,43.1],[21.3,42.9],[21.4,42.9],[21.6,42.7],[21.8,42.7],[21.7,42.4],[21.5,42.3],[21.6,42.2],[21.4,42.2],[20.8,42.1]]],"type":"Polygon"},"type":"Feature","properties":{"iso2":"XK","lng":21.2,"lat":42.7}}],"type":"FeatureCollection"};
},{}],"filtering.js":[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});exports.newFilterSettings=exports.setf=undefined;var _typeof=typeof Symbol==='function'&&typeof Symbol.iterator==='symbol'?function(obj){return typeof obj}:function(obj){return obj&&typeof Symbol==='function'&&obj.constructor===Symbol&&obj!==Symbol.prototype?'symbol':typeof obj};var _slicedToArray=function(){function sliceIterator(arr,i){var _arr=[];var _n=true;var _d=false;var _e=undefined;try{for(var _i=arr[Symbol.iterator](),_s;!(_n=(_s=_i.next()).done);_n=true){_arr.push(_s.value);if(i&&_arr.length===i)break}}catch(err){_d=true;_e=err}finally{try{if(!_n&&_i['return'])_i['return']()}finally{if(_d)throw _e}}return _arr}return function(arr,i){if(Array.isArray(arr)){return arr}else if(Symbol.iterator in Object(arr)){return sliceIterator(arr,i)}else{throw new TypeError('Invalid attempt to destructure non-iterable instance')}}}();exports.compileFiltering=compileFiltering;exports.computeFiltering=computeFiltering;exports.placeFacets=placeFacets;exports.testAllChecks=testAllChecks;var _localstorage=require('localstorage.js');function _toConsumableArray(arr){if(Array.isArray(arr)){for(var i=0,arr2=Array(arr.length);i<arr.length;i++){arr2[i]=arr[i]}return arr2}else{return Array.from(arr)}}var initf=function initf(tag,key,defaultVal){var lskey='flt_'+tag+'.'+key;return(0,_localstorage.lsHas)(lskey)?(0,_localstorage.lsGet)(lskey):defaultVal};var setf=exports.setf=function setf(tag,key,val){var lskey='flt_'+tag+'.'+key;(0,_localstorage.lsSet)(lskey,val)};function compileFiltering(contribs,fields,filterList){var presentFilterList=filterList.filter(function(x){return fields[x.field]});var filterFields=presentFilterList.filter(function(x){return x.name!=='FullText'}).map(function(x){return x.field});var fieldValues=new Map(filterFields.map(function(f){return[f,new Map([['','-none-']])]}));var _iteratorNormalCompletion=true;var _didIteratorError=false;var _iteratorError=undefined;try{for(var _iterator=contribs[Symbol.iterator](),_step;!(_iteratorNormalCompletion=(_step=_iterator.next()).done);_iteratorNormalCompletion=true){var row=_step.value;var _iteratorNormalCompletion2=true;var _didIteratorError2=false;var _iteratorError2=undefined;try{for(var _iterator2=filterFields[Symbol.iterator](),_step2;!(_iteratorNormalCompletion2=(_step2=_iterator2.next()).done);_iteratorNormalCompletion2=true){var field=_step2.value;var fFieldValues=fieldValues.get(field);var metaraw=row[field];if(metaraw!=null&&metaraw.length!==0){var _iteratorNormalCompletion3=true;var _didIteratorError3=false;var _iteratorError3=undefined;try{for(var _iterator3=metaraw[Symbol.iterator](),_step3;!(_iteratorNormalCompletion3=(_step3=_iterator3.next()).done);_iteratorNormalCompletion3=true){var _ref2=_step3.value;var valueId=_ref2._id,valueRep=_ref2.value;if(!fFieldValues.has(valueId)){fFieldValues.set(valueId,valueRep)}}}catch(err){_didIteratorError3=true;_iteratorError3=err}finally{try{if(!_iteratorNormalCompletion3&&_iterator3.return){_iterator3.return()}}finally{if(_didIteratorError3){throw _iteratorError3}}}}}}catch(err){_didIteratorError2=true;_iteratorError2=err}finally{try{if(!_iteratorNormalCompletion2&&_iterator2.return){_iterator2.return()}}finally{if(_didIteratorError2){throw _iteratorError2}}}}}catch(err){_didIteratorError=true;_iteratorError=err}finally{try{if(!_iteratorNormalCompletion&&_iterator.return){_iterator.return()}}finally{if(_didIteratorError){throw _iteratorError}}}var filterInit=new Map(presentFilterList.map(function(filterSpec,filterId){return[filterId,filterSpec.name==='FullText'?initf(filterId,'',''):new Map([].concat(_toConsumableArray(fieldValues.get(filterSpec.field).keys())).map(function(valueId){return[valueId,initf(filterId,valueId,true)]}))]}));return{fieldValues:fieldValues,filterInit:filterInit}}function computeFiltering(contribs,fields,filterList,fieldValues,filterSettings){var presentFilterList=filterList.filter(function(x){return fields[x.field]});var filterChecks=new Map(presentFilterList.map(function(filterSpec,filterId){return[filterId,(filterSpec.name==='FullText'?fullTextCheck:facetCheck)(filterSpec.field,filterSettings.get(filterId))]}));var filteredData=[];var otherFilteredData=new Map(presentFilterList.map(function(filterSpec,filterId){return[filterId,[]]}));var _iteratorNormalCompletion4=true;var _didIteratorError4=false;var _iteratorError4=undefined;try{var _loop=function _loop(){var row=_step4.value;var the_one_fail=null;var v=true;var discard=false;var _iteratorNormalCompletion5=true;var _didIteratorError5=false;var _iteratorError5=undefined;try{for(var _iterator5=filterChecks[Symbol.iterator](),_step5;!(_iteratorNormalCompletion5=(_step5=_iterator5.next()).done);_iteratorNormalCompletion5=true){var _step5$value=_slicedToArray(_step5.value,2),filterId=_step5$value[0],filterCheck=_step5$value[1];var pass=filterCheck(row);if(!pass){v=false;if(the_one_fail===null){the_one_fail=filterId}else{discard=true;break}}}}catch(err){_didIteratorError5=true;_iteratorError5=err}finally{try{if(!_iteratorNormalCompletion5&&_iterator5.return){_iterator5.return()}}finally{if(_didIteratorError5){throw _iteratorError5}}}if(!discard){if(v){filteredData.push(row);presentFilterList.forEach(function(filterSpec,filterId){otherFilteredData.get(filterId).push(row)})}else{otherFilteredData.get(the_one_fail).push(row)}}};for(var _iterator4=contribs[Symbol.iterator](),_step4;!(_iteratorNormalCompletion4=(_step4=_iterator4.next()).done);_iteratorNormalCompletion4=true){_loop()}}catch(err){_didIteratorError4=true;_iteratorError4=err}finally{try{if(!_iteratorNormalCompletion4&&_iterator4.return){_iterator4.return()}}finally{if(_didIteratorError4){throw _iteratorError4}}}var amounts=new Map(presentFilterList.map(function(filterSpec,filterId){var field=filterSpec.field;return[filterId,filterSpec.name==='FullText'?null:countFacets(field,fieldValues.get(field),otherFilteredData.get(filterId))]}));return{filteredData:filteredData,filteredAmountOthers:new Map([].concat(_toConsumableArray(otherFilteredData.entries())).map(function(_ref3){var _ref4=_slicedToArray(_ref3,2),filterId=_ref4[0],x=_ref4[1];return[filterId,x.length]})),amounts:amounts}}var newFilterSettings=exports.newFilterSettings=function newFilterSettings(filterSettings,filterId,data){var freshFilterSettings=new Map([].concat(_toConsumableArray(filterSettings.entries())));switch(typeof data==='undefined'?'undefined':_typeof(data)){case'boolean':{var filterSetting=freshFilterSettings.get(filterId);freshFilterSettings.set(filterId,new Map([].concat(_toConsumableArray(filterSetting.keys())).map(function(valueId){return[valueId,data]})));break}case'string':{freshFilterSettings.set(filterId,data);break}default:{var _data=_slicedToArray(data,2),valueId=_data[0],_filterSetting=_data[1];freshFilterSettings.get(filterId).set(valueId,_filterSetting);break}}return freshFilterSettings};var fullTextCheck=function fullTextCheck(field,term){var search=term.toLowerCase();if(search==null||search==''){return function(row){return true}}return function(row){var val=row[field];val=val!=null?val[0]:val;return val!=null&&val.toLowerCase().indexOf(search)!==-1}};var facetCheck=function facetCheck(field,facetValues){if(facetValues.size===0){return function(row){return false}}return function(row){var fieldVals=row[field];if(fieldVals==null||fieldVals.length==0){return facetValues.get('')}var _iteratorNormalCompletion6=true;var _didIteratorError6=false;var _iteratorError6=undefined;try{for(var _iterator6=fieldVals[Symbol.iterator](),_step6;!(_iteratorNormalCompletion6=(_step6=_iterator6.next()).done);_iteratorNormalCompletion6=true){var _ref6=_step6.value;var valueId=_ref6._id;if(facetValues.get(valueId)){return true}}}catch(err){_didIteratorError6=true;_iteratorError6=err}finally{try{if(!_iteratorNormalCompletion6&&_iterator6.return){_iterator6.return()}}finally{if(_didIteratorError6){throw _iteratorError6}}}return false}};function countFacets(field,fieldValues,rows){var facetAmounts=new Map;var _iteratorNormalCompletion7=true;var _didIteratorError7=false;var _iteratorError7=undefined;try{for(var _iterator7=fieldValues.keys()[Symbol.iterator](),_step7;!(_iteratorNormalCompletion7=(_step7=_iterator7.next()).done);_iteratorNormalCompletion7=true){var valueId=_step7.value;facetAmounts.set(valueId,0)}}catch(err){_didIteratorError7=true;_iteratorError7=err}finally{try{if(!_iteratorNormalCompletion7&&_iterator7.return){_iterator7.return()}}finally{if(_didIteratorError7){throw _iteratorError7}}}var _iteratorNormalCompletion8=true;var _didIteratorError8=false;var _iteratorError8=undefined;try{for(var _iterator8=rows[Symbol.iterator](),_step8;!(_iteratorNormalCompletion8=(_step8=_iterator8.next()).done);_iteratorNormalCompletion8=true){var _row=_step8.value;var fieldVals=_row[field];if(fieldVals==null||fieldVals.length==0){facetAmounts.set('',facetAmounts.get('')+1)}else{var _iteratorNormalCompletion9=true;var _didIteratorError9=false;var _iteratorError9=undefined;try{for(var _iterator9=fieldVals[Symbol.iterator](),_step9;!(_iteratorNormalCompletion9=(_step9=_iterator9.next()).done);_iteratorNormalCompletion9=true){var _ref8=_step9.value;var _valueId=_ref8._id;facetAmounts.set(_valueId,facetAmounts.get(_valueId)+1)}}catch(err){_didIteratorError9=true;_iteratorError9=err}finally{try{if(!_iteratorNormalCompletion9&&_iterator9.return){_iterator9.return()}}finally{if(_didIteratorError9){throw _iteratorError9}}}}}}catch(err){_didIteratorError8=true;_iteratorError8=err}finally{try{if(!_iteratorNormalCompletion8&&_iterator8.return){_iterator8.return()}}finally{if(_didIteratorError8){throw _iteratorError8}}}return facetAmounts}function placeFacets(fieldValues,maxCols){if(fieldValues==null){return[]}var facets=[].concat(_toConsumableArray(fieldValues.entries())).sort(function(x,y){return x[1].localeCompare(y[1])});if(facets.length==0){return[]}var rows=[];var lf=facets.length;var nrows=Math.floor(lf/maxCols)+(lf%maxCols?1:0);var ncols=Math.floor(lf/nrows)+(lf%nrows?1:0);for(var r=0;r<nrows;r++){var _row2=[];for(var c=0;c<ncols;c++){var f=nrows*c+r;_row2.push(f<lf?facets[f]:null)}rows.push(_row2)}return rows}function testAllChecks(filterSettings){var allTrue=true;var allFalse=true;var _iteratorNormalCompletion10=true;var _didIteratorError10=false;var _iteratorError10=undefined;try{for(var _iterator10=filterSettings.keys()[Symbol.iterator](),_step10;!(_iteratorNormalCompletion10=(_step10=_iterator10.next()).done);_iteratorNormalCompletion10=true){var valueId=_step10.value;if(filterSettings.get(valueId)){allFalse=false}else{allTrue=false}}}catch(err){_didIteratorError10=true;_iteratorError10=err}finally{try{if(!_iteratorNormalCompletion10&&_iterator10.return){_iterator10.return()}}finally{if(_didIteratorError10){throw _iteratorError10}}}return{allTrue:allTrue,allFalse:allFalse}}
},{"localstorage.js":"localstorage.js"}],"hoc.js":[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});exports.saveState=exports.withContext=undefined;var _jsxFileName='/Users/dirk/github/dariah/client/src/js/lib/hoc.js';var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key]}}}return target};var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if('value'in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor}}();var _react=require('react');var _react2=_interopRequireDefault(_react);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function')}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called')}return call&&(typeof call==='object'||typeof call==='function')?call:self}function _inherits(subClass,superClass){if(typeof superClass!=='function'&&superClass!==null){throw new TypeError('Super expression must either be null or a function, not '+typeof superClass)}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass}var withContext=exports.withContext=function withContext(ComponentInner){var ComponentOuter=function(_Component){_inherits(ComponentOuter,_Component);function ComponentOuter(){_classCallCheck(this,ComponentOuter);return _possibleConstructorReturn(this,(ComponentOuter.__proto__||Object.getPrototypeOf(ComponentOuter)).apply(this,arguments))}_createClass(ComponentOuter,[{key:'render',value:function render(){var newProps=_extends({},this.props,this.context.globals);return _react2.default.createElement(ComponentInner,_extends({},newProps,{__source:{fileName:_jsxFileName,lineNumber:69}}))}}]);return ComponentOuter}(_react.Component);ComponentOuter.contextTypes={globals:_react.PropTypes.object};return ComponentOuter};var saveState=exports.saveState=function saveState(ComponentInner,key,initialState){var ComponentOuter=function(_ComponentInner){_inherits(ComponentOuter,_ComponentInner);_createClass(ComponentOuter,[{key:'setStateKey',value:function setStateKey(tag){var stateKey=this.stateKey,key=this.key;this.stateKey=this.key+(tag==null?'':'.'+tag)}},{key:'stateLoad',value:function stateLoad(){var store=this.store,stateKey=this.stateKey,initialState=this.initialState,props=this.props;store.load(this,stateKey,typeof initialState=='function'?initialState(props):initialState)}},{key:'stateSave',value:function stateSave(){var store=this.store,stateKey=this.stateKey;store.save(this,stateKey)}}]);function ComponentOuter(props){_classCallCheck(this,ComponentOuter);var _this2=_possibleConstructorReturn(this,(ComponentOuter.__proto__||Object.getPrototypeOf(ComponentOuter)).call(this,props));var store=props.store,tag=props.tag;_this2.store=store;_this2.tag=tag;_this2.key=key;_this2.initialState=initialState;_this2.setStateKey(tag);_this2.stateLoad();return _this2}_createClass(ComponentOuter,[{key:'componentWillUnmount',value:function componentWillUnmount(){this.stateSave()}},{key:'componentWillReceiveProps',value:function componentWillReceiveProps(newProps){var oldTag=this.props.tag;var tag=newProps.tag;if(oldTag!==tag){this.stateSave();this.setStateKey(tag);this.stateLoad()}}}]);return ComponentOuter}(ComponentInner);return ComponentOuter};
},{"react":31}],"localstorage.js":[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:true});var lsHas=exports.lsHas=function lsHas(key){return localStorage.getItem(key)!=null};var lsGet=exports.lsGet=function lsGet(key){if(localStorage==null){return null}var val=localStorage.getItem(key);return val==null?null:JSON.parse(val)};var lsSet=exports.lsSet=function lsSet(key,val){if(localStorage==null){return}localStorage.setItem(key,JSON.stringify(val))};
},{}],"store.js":[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor}}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function")}}var Store=function(){function Store(){_classCallCheck(this,Store);this.data=new Map}_createClass(Store,[{key:"load",value:function load(component,key,initialState){if(this.data.has(key)){component.state=this.data.get(key)}else{component.state=initialState}}},{key:"save",value:function save(component,key){this.data.set(key,component.state)}},{key:"get",value:function get(key){if(!this.data.has(key)){this.data.set(key,{})}return this.data.get(key)}}]);return Store}();exports.default=Store;
},{}],"ui.js":[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key]}}}return target};exports.columnStyle=columnStyle;var scrollBarWidth=50;var topHeight=80;var winHeight=window.innerHeight-topHeight;var divWidthSpec={left:120,rightLeft:380};var divWidth=_extends({},divWidthSpec,{right:window.innerWidth-divWidthSpec.left-scrollBarWidth,rightRight:window.innerWidth-divWidthSpec.left-divWidthSpec.rightLeft-2*scrollBarWidth});var floatSpec={left:'left',right:'right',rightLeft:'left',rightRight:'right'};function columnStyle(kind){return{width:divWidth[kind],height:winHeight,overflow:'auto','WebkitOverflowScrolling':'touch',float:floatSpec[kind],'paddingLeft':kind==''?'1em':'0em','paddingRight':kind==''?'1em':'0em'}}
},{}]},{},[])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvZmJqcy9saWIvZW1wdHlGdW5jdGlvbi5qcyIsIm5vZGVfbW9kdWxlcy9mYmpzL2xpYi9lbXB0eU9iamVjdC5qcyIsIm5vZGVfbW9kdWxlcy9mYmpzL2xpYi9pbnZhcmlhbnQuanMiLCJub2RlX21vZHVsZXMvZmJqcy9saWIvd2FybmluZy5qcyIsIm5vZGVfbW9kdWxlcy9vYmplY3QtYXNzaWduL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3Byb2Nlc3MvYnJvd3Nlci5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC9saWIvS2V5RXNjYXBlVXRpbHMuanMiLCJub2RlX21vZHVsZXMvcmVhY3QvbGliL1Bvb2xlZENsYXNzLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0L2xpYi9SZWFjdC5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC9saWIvUmVhY3RDaGlsZHJlbi5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC9saWIvUmVhY3RDbGFzcy5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC9saWIvUmVhY3RDb21wb25lbnQuanMiLCJub2RlX21vZHVsZXMvcmVhY3QvbGliL1JlYWN0Q29tcG9uZW50VHJlZUhvb2suanMiLCJub2RlX21vZHVsZXMvcmVhY3QvbGliL1JlYWN0Q3VycmVudE93bmVyLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0L2xpYi9SZWFjdERPTUZhY3Rvcmllcy5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC9saWIvUmVhY3RFbGVtZW50LmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0L2xpYi9SZWFjdEVsZW1lbnRTeW1ib2wuanMiLCJub2RlX21vZHVsZXMvcmVhY3QvbGliL1JlYWN0RWxlbWVudFZhbGlkYXRvci5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC9saWIvUmVhY3ROb29wVXBkYXRlUXVldWUuanMiLCJub2RlX21vZHVsZXMvcmVhY3QvbGliL1JlYWN0UHJvcFR5cGVMb2NhdGlvbk5hbWVzLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0L2xpYi9SZWFjdFByb3BUeXBlcy5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC9saWIvUmVhY3RQcm9wVHlwZXNTZWNyZXQuanMiLCJub2RlX21vZHVsZXMvcmVhY3QvbGliL1JlYWN0UHVyZUNvbXBvbmVudC5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC9saWIvUmVhY3RWZXJzaW9uLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0L2xpYi9jYW5EZWZpbmVQcm9wZXJ0eS5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC9saWIvY2hlY2tSZWFjdFR5cGVTcGVjLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0L2xpYi9nZXRJdGVyYXRvckZuLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0L2xpYi9vbmx5Q2hpbGQuanMiLCJub2RlX21vZHVsZXMvcmVhY3QvbGliL3JlYWN0UHJvZEludmFyaWFudC5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC9saWIvdHJhdmVyc2VBbGxDaGlsZHJlbi5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC9yZWFjdC5qcyIsIm5vZGVfbW9kdWxlcy93aGF0d2ctZmV0Y2gvZmV0Y2guanMiLCJkYXRhLmpzIiwiZXVyb3BlLmdlby5qcyIsImZpbHRlcmluZy5qcyIsImhvYy5qcyIsImxvY2Fsc3RvcmFnZS5qcyIsInN0b3JlLmpzIiwidWkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25GQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNVVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25WQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4T0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ3hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDckZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUtBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbGRBOztBQ0FBOztBQ0FBOztBQ0FBOztBQ0FBOztBQ0FBOztBQ0FBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIlwidXNlIHN0cmljdFwiO1xuXG4vKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogXG4gKi9cblxuZnVuY3Rpb24gbWFrZUVtcHR5RnVuY3Rpb24oYXJnKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGFyZztcbiAgfTtcbn1cblxuLyoqXG4gKiBUaGlzIGZ1bmN0aW9uIGFjY2VwdHMgYW5kIGRpc2NhcmRzIGlucHV0czsgaXQgaGFzIG5vIHNpZGUgZWZmZWN0cy4gVGhpcyBpc1xuICogcHJpbWFyaWx5IHVzZWZ1bCBpZGlvbWF0aWNhbGx5IGZvciBvdmVycmlkYWJsZSBmdW5jdGlvbiBlbmRwb2ludHMgd2hpY2hcbiAqIGFsd2F5cyBuZWVkIHRvIGJlIGNhbGxhYmxlLCBzaW5jZSBKUyBsYWNrcyBhIG51bGwtY2FsbCBpZGlvbSBhbGEgQ29jb2EuXG4gKi9cbnZhciBlbXB0eUZ1bmN0aW9uID0gZnVuY3Rpb24gZW1wdHlGdW5jdGlvbigpIHt9O1xuXG5lbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zID0gbWFrZUVtcHR5RnVuY3Rpb247XG5lbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zRmFsc2UgPSBtYWtlRW1wdHlGdW5jdGlvbihmYWxzZSk7XG5lbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zVHJ1ZSA9IG1ha2VFbXB0eUZ1bmN0aW9uKHRydWUpO1xuZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJuc051bGwgPSBtYWtlRW1wdHlGdW5jdGlvbihudWxsKTtcbmVtcHR5RnVuY3Rpb24udGhhdFJldHVybnNUaGlzID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdGhpcztcbn07XG5lbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zQXJndW1lbnQgPSBmdW5jdGlvbiAoYXJnKSB7XG4gIHJldHVybiBhcmc7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGVtcHR5RnVuY3Rpb247IiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBlbXB0eU9iamVjdCA9IHt9O1xuXG5pZiAoXCJkZXZlbG9wbWVudFwiICE9PSAncHJvZHVjdGlvbicpIHtcbiAgT2JqZWN0LmZyZWV6ZShlbXB0eU9iamVjdCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZW1wdHlPYmplY3Q7IiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbi8qKlxuICogVXNlIGludmFyaWFudCgpIHRvIGFzc2VydCBzdGF0ZSB3aGljaCB5b3VyIHByb2dyYW0gYXNzdW1lcyB0byBiZSB0cnVlLlxuICpcbiAqIFByb3ZpZGUgc3ByaW50Zi1zdHlsZSBmb3JtYXQgKG9ubHkgJXMgaXMgc3VwcG9ydGVkKSBhbmQgYXJndW1lbnRzXG4gKiB0byBwcm92aWRlIGluZm9ybWF0aW9uIGFib3V0IHdoYXQgYnJva2UgYW5kIHdoYXQgeW91IHdlcmVcbiAqIGV4cGVjdGluZy5cbiAqXG4gKiBUaGUgaW52YXJpYW50IG1lc3NhZ2Ugd2lsbCBiZSBzdHJpcHBlZCBpbiBwcm9kdWN0aW9uLCBidXQgdGhlIGludmFyaWFudFxuICogd2lsbCByZW1haW4gdG8gZW5zdXJlIGxvZ2ljIGRvZXMgbm90IGRpZmZlciBpbiBwcm9kdWN0aW9uLlxuICovXG5cbnZhciB2YWxpZGF0ZUZvcm1hdCA9IGZ1bmN0aW9uIHZhbGlkYXRlRm9ybWF0KGZvcm1hdCkge307XG5cbmlmIChcImRldmVsb3BtZW50XCIgIT09ICdwcm9kdWN0aW9uJykge1xuICB2YWxpZGF0ZUZvcm1hdCA9IGZ1bmN0aW9uIHZhbGlkYXRlRm9ybWF0KGZvcm1hdCkge1xuICAgIGlmIChmb3JtYXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhcmlhbnQgcmVxdWlyZXMgYW4gZXJyb3IgbWVzc2FnZSBhcmd1bWVudCcpO1xuICAgIH1cbiAgfTtcbn1cblxuZnVuY3Rpb24gaW52YXJpYW50KGNvbmRpdGlvbiwgZm9ybWF0LCBhLCBiLCBjLCBkLCBlLCBmKSB7XG4gIHZhbGlkYXRlRm9ybWF0KGZvcm1hdCk7XG5cbiAgaWYgKCFjb25kaXRpb24pIHtcbiAgICB2YXIgZXJyb3I7XG4gICAgaWYgKGZvcm1hdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBlcnJvciA9IG5ldyBFcnJvcignTWluaWZpZWQgZXhjZXB0aW9uIG9jY3VycmVkOyB1c2UgdGhlIG5vbi1taW5pZmllZCBkZXYgZW52aXJvbm1lbnQgJyArICdmb3IgdGhlIGZ1bGwgZXJyb3IgbWVzc2FnZSBhbmQgYWRkaXRpb25hbCBoZWxwZnVsIHdhcm5pbmdzLicpO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgYXJncyA9IFthLCBiLCBjLCBkLCBlLCBmXTtcbiAgICAgIHZhciBhcmdJbmRleCA9IDA7XG4gICAgICBlcnJvciA9IG5ldyBFcnJvcihmb3JtYXQucmVwbGFjZSgvJXMvZywgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gYXJnc1thcmdJbmRleCsrXTtcbiAgICAgIH0pKTtcbiAgICAgIGVycm9yLm5hbWUgPSAnSW52YXJpYW50IFZpb2xhdGlvbic7XG4gICAgfVxuXG4gICAgZXJyb3IuZnJhbWVzVG9Qb3AgPSAxOyAvLyB3ZSBkb24ndCBjYXJlIGFib3V0IGludmFyaWFudCdzIG93biBmcmFtZVxuICAgIHRocm93IGVycm9yO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW52YXJpYW50OyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTQtMjAxNSwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBlbXB0eUZ1bmN0aW9uID0gcmVxdWlyZSgnLi9lbXB0eUZ1bmN0aW9uJyk7XG5cbi8qKlxuICogU2ltaWxhciB0byBpbnZhcmlhbnQgYnV0IG9ubHkgbG9ncyBhIHdhcm5pbmcgaWYgdGhlIGNvbmRpdGlvbiBpcyBub3QgbWV0LlxuICogVGhpcyBjYW4gYmUgdXNlZCB0byBsb2cgaXNzdWVzIGluIGRldmVsb3BtZW50IGVudmlyb25tZW50cyBpbiBjcml0aWNhbFxuICogcGF0aHMuIFJlbW92aW5nIHRoZSBsb2dnaW5nIGNvZGUgZm9yIHByb2R1Y3Rpb24gZW52aXJvbm1lbnRzIHdpbGwga2VlcCB0aGVcbiAqIHNhbWUgbG9naWMgYW5kIGZvbGxvdyB0aGUgc2FtZSBjb2RlIHBhdGhzLlxuICovXG5cbnZhciB3YXJuaW5nID0gZW1wdHlGdW5jdGlvbjtcblxuaWYgKFwiZGV2ZWxvcG1lbnRcIiAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIHByaW50V2FybmluZyA9IGZ1bmN0aW9uIHByaW50V2FybmluZyhmb3JtYXQpIHtcbiAgICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gQXJyYXkoX2xlbiA+IDEgPyBfbGVuIC0gMSA6IDApLCBfa2V5ID0gMTsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgICBhcmdzW19rZXkgLSAxXSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICAgIH1cblxuICAgICAgdmFyIGFyZ0luZGV4ID0gMDtcbiAgICAgIHZhciBtZXNzYWdlID0gJ1dhcm5pbmc6ICcgKyBmb3JtYXQucmVwbGFjZSgvJXMvZywgZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gYXJnc1thcmdJbmRleCsrXTtcbiAgICAgIH0pO1xuICAgICAgaWYgKHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBjb25zb2xlLmVycm9yKG1lc3NhZ2UpO1xuICAgICAgfVxuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gLS0tIFdlbGNvbWUgdG8gZGVidWdnaW5nIFJlYWN0IC0tLVxuICAgICAgICAvLyBUaGlzIGVycm9yIHdhcyB0aHJvd24gYXMgYSBjb252ZW5pZW5jZSBzbyB0aGF0IHlvdSBjYW4gdXNlIHRoaXMgc3RhY2tcbiAgICAgICAgLy8gdG8gZmluZCB0aGUgY2FsbHNpdGUgdGhhdCBjYXVzZWQgdGhpcyB3YXJuaW5nIHRvIGZpcmUuXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgICAgIH0gY2F0Y2ggKHgpIHt9XG4gICAgfTtcblxuICAgIHdhcm5pbmcgPSBmdW5jdGlvbiB3YXJuaW5nKGNvbmRpdGlvbiwgZm9ybWF0KSB7XG4gICAgICBpZiAoZm9ybWF0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdgd2FybmluZyhjb25kaXRpb24sIGZvcm1hdCwgLi4uYXJncylgIHJlcXVpcmVzIGEgd2FybmluZyAnICsgJ21lc3NhZ2UgYXJndW1lbnQnKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGZvcm1hdC5pbmRleE9mKCdGYWlsZWQgQ29tcG9zaXRlIHByb3BUeXBlOiAnKSA9PT0gMCkge1xuICAgICAgICByZXR1cm47IC8vIElnbm9yZSBDb21wb3NpdGVDb21wb25lbnQgcHJvcHR5cGUgY2hlY2suXG4gICAgICB9XG5cbiAgICAgIGlmICghY29uZGl0aW9uKSB7XG4gICAgICAgIGZvciAodmFyIF9sZW4yID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IEFycmF5KF9sZW4yID4gMiA/IF9sZW4yIC0gMiA6IDApLCBfa2V5MiA9IDI7IF9rZXkyIDwgX2xlbjI7IF9rZXkyKyspIHtcbiAgICAgICAgICBhcmdzW19rZXkyIC0gMl0gPSBhcmd1bWVudHNbX2tleTJdO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJpbnRXYXJuaW5nLmFwcGx5KHVuZGVmaW5lZCwgW2Zvcm1hdF0uY29uY2F0KGFyZ3MpKTtcbiAgICAgIH1cbiAgICB9O1xuICB9KSgpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHdhcm5pbmc7IiwiJ3VzZSBzdHJpY3QnO1xuLyogZXNsaW50LWRpc2FibGUgbm8tdW51c2VkLXZhcnMgKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG52YXIgcHJvcElzRW51bWVyYWJsZSA9IE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGU7XG5cbmZ1bmN0aW9uIHRvT2JqZWN0KHZhbCkge1xuXHRpZiAodmFsID09PSBudWxsIHx8IHZhbCA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0dGhyb3cgbmV3IFR5cGVFcnJvcignT2JqZWN0LmFzc2lnbiBjYW5ub3QgYmUgY2FsbGVkIHdpdGggbnVsbCBvciB1bmRlZmluZWQnKTtcblx0fVxuXG5cdHJldHVybiBPYmplY3QodmFsKTtcbn1cblxuZnVuY3Rpb24gc2hvdWxkVXNlTmF0aXZlKCkge1xuXHR0cnkge1xuXHRcdGlmICghT2JqZWN0LmFzc2lnbikge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdC8vIERldGVjdCBidWdneSBwcm9wZXJ0eSBlbnVtZXJhdGlvbiBvcmRlciBpbiBvbGRlciBWOCB2ZXJzaW9ucy5cblxuXHRcdC8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTQxMThcblx0XHR2YXIgdGVzdDEgPSBuZXcgU3RyaW5nKCdhYmMnKTsgIC8vIGVzbGludC1kaXNhYmxlLWxpbmVcblx0XHR0ZXN0MVs1XSA9ICdkZSc7XG5cdFx0aWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRlc3QxKVswXSA9PT0gJzUnKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0Ly8gaHR0cHM6Ly9idWdzLmNocm9taXVtLm9yZy9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9MzA1NlxuXHRcdHZhciB0ZXN0MiA9IHt9O1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgMTA7IGkrKykge1xuXHRcdFx0dGVzdDJbJ18nICsgU3RyaW5nLmZyb21DaGFyQ29kZShpKV0gPSBpO1xuXHRcdH1cblx0XHR2YXIgb3JkZXIyID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGVzdDIpLm1hcChmdW5jdGlvbiAobikge1xuXHRcdFx0cmV0dXJuIHRlc3QyW25dO1xuXHRcdH0pO1xuXHRcdGlmIChvcmRlcjIuam9pbignJykgIT09ICcwMTIzNDU2Nzg5Jykge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdC8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTMwNTZcblx0XHR2YXIgdGVzdDMgPSB7fTtcblx0XHQnYWJjZGVmZ2hpamtsbW5vcHFyc3QnLnNwbGl0KCcnKS5mb3JFYWNoKGZ1bmN0aW9uIChsZXR0ZXIpIHtcblx0XHRcdHRlc3QzW2xldHRlcl0gPSBsZXR0ZXI7XG5cdFx0fSk7XG5cdFx0aWYgKE9iamVjdC5rZXlzKE9iamVjdC5hc3NpZ24oe30sIHRlc3QzKSkuam9pbignJykgIT09XG5cdFx0XHRcdCdhYmNkZWZnaGlqa2xtbm9wcXJzdCcpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdHJ1ZTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdC8vIFdlIGRvbid0IGV4cGVjdCBhbnkgb2YgdGhlIGFib3ZlIHRvIHRocm93LCBidXQgYmV0dGVyIHRvIGJlIHNhZmUuXG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2hvdWxkVXNlTmF0aXZlKCkgPyBPYmplY3QuYXNzaWduIDogZnVuY3Rpb24gKHRhcmdldCwgc291cmNlKSB7XG5cdHZhciBmcm9tO1xuXHR2YXIgdG8gPSB0b09iamVjdCh0YXJnZXQpO1xuXHR2YXIgc3ltYm9scztcblxuXHRmb3IgKHZhciBzID0gMTsgcyA8IGFyZ3VtZW50cy5sZW5ndGg7IHMrKykge1xuXHRcdGZyb20gPSBPYmplY3QoYXJndW1lbnRzW3NdKTtcblxuXHRcdGZvciAodmFyIGtleSBpbiBmcm9tKSB7XG5cdFx0XHRpZiAoaGFzT3duUHJvcGVydHkuY2FsbChmcm9tLCBrZXkpKSB7XG5cdFx0XHRcdHRvW2tleV0gPSBmcm9tW2tleV07XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHtcblx0XHRcdHN5bWJvbHMgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKGZyb20pO1xuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBzeW1ib2xzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGlmIChwcm9wSXNFbnVtZXJhYmxlLmNhbGwoZnJvbSwgc3ltYm9sc1tpXSkpIHtcblx0XHRcdFx0XHR0b1tzeW1ib2xzW2ldXSA9IGZyb21bc3ltYm9sc1tpXV07XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gdG87XG59O1xuIiwiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XG5cbi8vIGNhY2hlZCBmcm9tIHdoYXRldmVyIGdsb2JhbCBpcyBwcmVzZW50IHNvIHRoYXQgdGVzdCBydW5uZXJzIHRoYXQgc3R1YiBpdFxuLy8gZG9uJ3QgYnJlYWsgdGhpbmdzLiAgQnV0IHdlIG5lZWQgdG8gd3JhcCBpdCBpbiBhIHRyeSBjYXRjaCBpbiBjYXNlIGl0IGlzXG4vLyB3cmFwcGVkIGluIHN0cmljdCBtb2RlIGNvZGUgd2hpY2ggZG9lc24ndCBkZWZpbmUgYW55IGdsb2JhbHMuICBJdCdzIGluc2lkZSBhXG4vLyBmdW5jdGlvbiBiZWNhdXNlIHRyeS9jYXRjaGVzIGRlb3B0aW1pemUgaW4gY2VydGFpbiBlbmdpbmVzLlxuXG52YXIgY2FjaGVkU2V0VGltZW91dDtcbnZhciBjYWNoZWRDbGVhclRpbWVvdXQ7XG5cbmZ1bmN0aW9uIGRlZmF1bHRTZXRUaW1vdXQoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdzZXRUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG5mdW5jdGlvbiBkZWZhdWx0Q2xlYXJUaW1lb3V0ICgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2NsZWFyVGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuKGZ1bmN0aW9uICgpIHtcbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIHNldFRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIGNsZWFyVGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICB9XG59ICgpKVxuZnVuY3Rpb24gcnVuVGltZW91dChmdW4pIHtcbiAgICBpZiAoY2FjaGVkU2V0VGltZW91dCA9PT0gc2V0VGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgLy8gaWYgc2V0VGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZFNldFRpbWVvdXQgPT09IGRlZmF1bHRTZXRUaW1vdXQgfHwgIWNhY2hlZFNldFRpbWVvdXQpICYmIHNldFRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9IGNhdGNoKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0IHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKG51bGwsIGZ1biwgMCk7XG4gICAgICAgIH0gY2F0Y2goZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvclxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbCh0aGlzLCBmdW4sIDApO1xuICAgICAgICB9XG4gICAgfVxuXG5cbn1cbmZ1bmN0aW9uIHJ1bkNsZWFyVGltZW91dChtYXJrZXIpIHtcbiAgICBpZiAoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgLy8gaWYgY2xlYXJUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBkZWZhdWx0Q2xlYXJUaW1lb3V0IHx8ICFjYWNoZWRDbGVhclRpbWVvdXQpICYmIGNsZWFyVGltZW91dCkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfSBjYXRjaCAoZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgIHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwobnVsbCwgbWFya2VyKTtcbiAgICAgICAgfSBjYXRjaCAoZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvci5cbiAgICAgICAgICAgIC8vIFNvbWUgdmVyc2lvbnMgb2YgSS5FLiBoYXZlIGRpZmZlcmVudCBydWxlcyBmb3IgY2xlYXJUaW1lb3V0IHZzIHNldFRpbWVvdXRcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbCh0aGlzLCBtYXJrZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG5cblxufVxudmFyIHF1ZXVlID0gW107XG52YXIgZHJhaW5pbmcgPSBmYWxzZTtcbnZhciBjdXJyZW50UXVldWU7XG52YXIgcXVldWVJbmRleCA9IC0xO1xuXG5mdW5jdGlvbiBjbGVhblVwTmV4dFRpY2soKSB7XG4gICAgaWYgKCFkcmFpbmluZyB8fCAhY3VycmVudFF1ZXVlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBpZiAoY3VycmVudFF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBxdWV1ZSA9IGN1cnJlbnRRdWV1ZS5jb25jYXQocXVldWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICB9XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBkcmFpblF1ZXVlKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkcmFpblF1ZXVlKCkge1xuICAgIGlmIChkcmFpbmluZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciB0aW1lb3V0ID0gcnVuVGltZW91dChjbGVhblVwTmV4dFRpY2spO1xuICAgIGRyYWluaW5nID0gdHJ1ZTtcblxuICAgIHZhciBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgd2hpbGUobGVuKSB7XG4gICAgICAgIGN1cnJlbnRRdWV1ZSA9IHF1ZXVlO1xuICAgICAgICBxdWV1ZSA9IFtdO1xuICAgICAgICB3aGlsZSAoKytxdWV1ZUluZGV4IDwgbGVuKSB7XG4gICAgICAgICAgICBpZiAoY3VycmVudFF1ZXVlKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFF1ZXVlW3F1ZXVlSW5kZXhdLnJ1bigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICAgICAgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIH1cbiAgICBjdXJyZW50UXVldWUgPSBudWxsO1xuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgcnVuQ2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xufVxuXG5wcm9jZXNzLm5leHRUaWNrID0gZnVuY3Rpb24gKGZ1bikge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHF1ZXVlLnB1c2gobmV3IEl0ZW0oZnVuLCBhcmdzKSk7XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCA9PT0gMSAmJiAhZHJhaW5pbmcpIHtcbiAgICAgICAgcnVuVGltZW91dChkcmFpblF1ZXVlKTtcbiAgICB9XG59O1xuXG4vLyB2OCBsaWtlcyBwcmVkaWN0aWJsZSBvYmplY3RzXG5mdW5jdGlvbiBJdGVtKGZ1biwgYXJyYXkpIHtcbiAgICB0aGlzLmZ1biA9IGZ1bjtcbiAgICB0aGlzLmFycmF5ID0gYXJyYXk7XG59XG5JdGVtLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5mdW4uYXBwbHkobnVsbCwgdGhpcy5hcnJheSk7XG59O1xucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5wcm9jZXNzLnZlcnNpb24gPSAnJzsgLy8gZW1wdHkgc3RyaW5nIHRvIGF2b2lkIHJlZ2V4cCBpc3N1ZXNcbnByb2Nlc3MudmVyc2lvbnMgPSB7fTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5cbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xucHJvY2Vzcy51bWFzayA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gMDsgfTtcbiIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIFxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBFc2NhcGUgYW5kIHdyYXAga2V5IHNvIGl0IGlzIHNhZmUgdG8gdXNlIGFzIGEgcmVhY3RpZFxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgdG8gYmUgZXNjYXBlZC5cbiAqIEByZXR1cm4ge3N0cmluZ30gdGhlIGVzY2FwZWQga2V5LlxuICovXG5cbmZ1bmN0aW9uIGVzY2FwZShrZXkpIHtcbiAgdmFyIGVzY2FwZVJlZ2V4ID0gL1s9Ol0vZztcbiAgdmFyIGVzY2FwZXJMb29rdXAgPSB7XG4gICAgJz0nOiAnPTAnLFxuICAgICc6JzogJz0yJ1xuICB9O1xuICB2YXIgZXNjYXBlZFN0cmluZyA9ICgnJyArIGtleSkucmVwbGFjZShlc2NhcGVSZWdleCwgZnVuY3Rpb24gKG1hdGNoKSB7XG4gICAgcmV0dXJuIGVzY2FwZXJMb29rdXBbbWF0Y2hdO1xuICB9KTtcblxuICByZXR1cm4gJyQnICsgZXNjYXBlZFN0cmluZztcbn1cblxuLyoqXG4gKiBVbmVzY2FwZSBhbmQgdW53cmFwIGtleSBmb3IgaHVtYW4tcmVhZGFibGUgZGlzcGxheVxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgdG8gdW5lc2NhcGUuXG4gKiBAcmV0dXJuIHtzdHJpbmd9IHRoZSB1bmVzY2FwZWQga2V5LlxuICovXG5mdW5jdGlvbiB1bmVzY2FwZShrZXkpIHtcbiAgdmFyIHVuZXNjYXBlUmVnZXggPSAvKD0wfD0yKS9nO1xuICB2YXIgdW5lc2NhcGVyTG9va3VwID0ge1xuICAgICc9MCc6ICc9JyxcbiAgICAnPTInOiAnOidcbiAgfTtcbiAgdmFyIGtleVN1YnN0cmluZyA9IGtleVswXSA9PT0gJy4nICYmIGtleVsxXSA9PT0gJyQnID8ga2V5LnN1YnN0cmluZygyKSA6IGtleS5zdWJzdHJpbmcoMSk7XG5cbiAgcmV0dXJuICgnJyArIGtleVN1YnN0cmluZykucmVwbGFjZSh1bmVzY2FwZVJlZ2V4LCBmdW5jdGlvbiAobWF0Y2gpIHtcbiAgICByZXR1cm4gdW5lc2NhcGVyTG9va3VwW21hdGNoXTtcbiAgfSk7XG59XG5cbnZhciBLZXlFc2NhcGVVdGlscyA9IHtcbiAgZXNjYXBlOiBlc2NhcGUsXG4gIHVuZXNjYXBlOiB1bmVzY2FwZVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBLZXlFc2NhcGVVdGlsczsiLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBfcHJvZEludmFyaWFudCA9IHJlcXVpcmUoJy4vcmVhY3RQcm9kSW52YXJpYW50Jyk7XG5cbnZhciBpbnZhcmlhbnQgPSByZXF1aXJlKCdmYmpzL2xpYi9pbnZhcmlhbnQnKTtcblxuLyoqXG4gKiBTdGF0aWMgcG9vbGVycy4gU2V2ZXJhbCBjdXN0b20gdmVyc2lvbnMgZm9yIGVhY2ggcG90ZW50aWFsIG51bWJlciBvZlxuICogYXJndW1lbnRzLiBBIGNvbXBsZXRlbHkgZ2VuZXJpYyBwb29sZXIgaXMgZWFzeSB0byBpbXBsZW1lbnQsIGJ1dCB3b3VsZFxuICogcmVxdWlyZSBhY2Nlc3NpbmcgdGhlIGBhcmd1bWVudHNgIG9iamVjdC4gSW4gZWFjaCBvZiB0aGVzZSwgYHRoaXNgIHJlZmVycyB0b1xuICogdGhlIENsYXNzIGl0c2VsZiwgbm90IGFuIGluc3RhbmNlLiBJZiBhbnkgb3RoZXJzIGFyZSBuZWVkZWQsIHNpbXBseSBhZGQgdGhlbVxuICogaGVyZSwgb3IgaW4gdGhlaXIgb3duIGZpbGVzLlxuICovXG52YXIgb25lQXJndW1lbnRQb29sZXIgPSBmdW5jdGlvbiAoY29weUZpZWxkc0Zyb20pIHtcbiAgdmFyIEtsYXNzID0gdGhpcztcbiAgaWYgKEtsYXNzLmluc3RhbmNlUG9vbC5sZW5ndGgpIHtcbiAgICB2YXIgaW5zdGFuY2UgPSBLbGFzcy5pbnN0YW5jZVBvb2wucG9wKCk7XG4gICAgS2xhc3MuY2FsbChpbnN0YW5jZSwgY29weUZpZWxkc0Zyb20pO1xuICAgIHJldHVybiBpbnN0YW5jZTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbmV3IEtsYXNzKGNvcHlGaWVsZHNGcm9tKTtcbiAgfVxufTtcblxudmFyIHR3b0FyZ3VtZW50UG9vbGVyID0gZnVuY3Rpb24gKGExLCBhMikge1xuICB2YXIgS2xhc3MgPSB0aGlzO1xuICBpZiAoS2xhc3MuaW5zdGFuY2VQb29sLmxlbmd0aCkge1xuICAgIHZhciBpbnN0YW5jZSA9IEtsYXNzLmluc3RhbmNlUG9vbC5wb3AoKTtcbiAgICBLbGFzcy5jYWxsKGluc3RhbmNlLCBhMSwgYTIpO1xuICAgIHJldHVybiBpbnN0YW5jZTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbmV3IEtsYXNzKGExLCBhMik7XG4gIH1cbn07XG5cbnZhciB0aHJlZUFyZ3VtZW50UG9vbGVyID0gZnVuY3Rpb24gKGExLCBhMiwgYTMpIHtcbiAgdmFyIEtsYXNzID0gdGhpcztcbiAgaWYgKEtsYXNzLmluc3RhbmNlUG9vbC5sZW5ndGgpIHtcbiAgICB2YXIgaW5zdGFuY2UgPSBLbGFzcy5pbnN0YW5jZVBvb2wucG9wKCk7XG4gICAgS2xhc3MuY2FsbChpbnN0YW5jZSwgYTEsIGEyLCBhMyk7XG4gICAgcmV0dXJuIGluc3RhbmNlO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBuZXcgS2xhc3MoYTEsIGEyLCBhMyk7XG4gIH1cbn07XG5cbnZhciBmb3VyQXJndW1lbnRQb29sZXIgPSBmdW5jdGlvbiAoYTEsIGEyLCBhMywgYTQpIHtcbiAgdmFyIEtsYXNzID0gdGhpcztcbiAgaWYgKEtsYXNzLmluc3RhbmNlUG9vbC5sZW5ndGgpIHtcbiAgICB2YXIgaW5zdGFuY2UgPSBLbGFzcy5pbnN0YW5jZVBvb2wucG9wKCk7XG4gICAgS2xhc3MuY2FsbChpbnN0YW5jZSwgYTEsIGEyLCBhMywgYTQpO1xuICAgIHJldHVybiBpbnN0YW5jZTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbmV3IEtsYXNzKGExLCBhMiwgYTMsIGE0KTtcbiAgfVxufTtcblxudmFyIHN0YW5kYXJkUmVsZWFzZXIgPSBmdW5jdGlvbiAoaW5zdGFuY2UpIHtcbiAgdmFyIEtsYXNzID0gdGhpcztcbiAgIShpbnN0YW5jZSBpbnN0YW5jZW9mIEtsYXNzKSA/IFwiZGV2ZWxvcG1lbnRcIiAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnVHJ5aW5nIHRvIHJlbGVhc2UgYW4gaW5zdGFuY2UgaW50byBhIHBvb2wgb2YgYSBkaWZmZXJlbnQgdHlwZS4nKSA6IF9wcm9kSW52YXJpYW50KCcyNScpIDogdm9pZCAwO1xuICBpbnN0YW5jZS5kZXN0cnVjdG9yKCk7XG4gIGlmIChLbGFzcy5pbnN0YW5jZVBvb2wubGVuZ3RoIDwgS2xhc3MucG9vbFNpemUpIHtcbiAgICBLbGFzcy5pbnN0YW5jZVBvb2wucHVzaChpbnN0YW5jZSk7XG4gIH1cbn07XG5cbnZhciBERUZBVUxUX1BPT0xfU0laRSA9IDEwO1xudmFyIERFRkFVTFRfUE9PTEVSID0gb25lQXJndW1lbnRQb29sZXI7XG5cbi8qKlxuICogQXVnbWVudHMgYENvcHlDb25zdHJ1Y3RvcmAgdG8gYmUgYSBwb29sYWJsZSBjbGFzcywgYXVnbWVudGluZyBvbmx5IHRoZSBjbGFzc1xuICogaXRzZWxmIChzdGF0aWNhbGx5KSBub3QgYWRkaW5nIGFueSBwcm90b3R5cGljYWwgZmllbGRzLiBBbnkgQ29weUNvbnN0cnVjdG9yXG4gKiB5b3UgZ2l2ZSB0aGlzIG1heSBoYXZlIGEgYHBvb2xTaXplYCBwcm9wZXJ0eSwgYW5kIHdpbGwgbG9vayBmb3IgYVxuICogcHJvdG90eXBpY2FsIGBkZXN0cnVjdG9yYCBvbiBpbnN0YW5jZXMuXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gQ29weUNvbnN0cnVjdG9yIENvbnN0cnVjdG9yIHRoYXQgY2FuIGJlIHVzZWQgdG8gcmVzZXQuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBwb29sZXIgQ3VzdG9taXphYmxlIHBvb2xlci5cbiAqL1xudmFyIGFkZFBvb2xpbmdUbyA9IGZ1bmN0aW9uIChDb3B5Q29uc3RydWN0b3IsIHBvb2xlcikge1xuICAvLyBDYXN0aW5nIGFzIGFueSBzbyB0aGF0IGZsb3cgaWdub3JlcyB0aGUgYWN0dWFsIGltcGxlbWVudGF0aW9uIGFuZCB0cnVzdHNcbiAgLy8gaXQgdG8gbWF0Y2ggdGhlIHR5cGUgd2UgZGVjbGFyZWRcbiAgdmFyIE5ld0tsYXNzID0gQ29weUNvbnN0cnVjdG9yO1xuICBOZXdLbGFzcy5pbnN0YW5jZVBvb2wgPSBbXTtcbiAgTmV3S2xhc3MuZ2V0UG9vbGVkID0gcG9vbGVyIHx8IERFRkFVTFRfUE9PTEVSO1xuICBpZiAoIU5ld0tsYXNzLnBvb2xTaXplKSB7XG4gICAgTmV3S2xhc3MucG9vbFNpemUgPSBERUZBVUxUX1BPT0xfU0laRTtcbiAgfVxuICBOZXdLbGFzcy5yZWxlYXNlID0gc3RhbmRhcmRSZWxlYXNlcjtcbiAgcmV0dXJuIE5ld0tsYXNzO1xufTtcblxudmFyIFBvb2xlZENsYXNzID0ge1xuICBhZGRQb29saW5nVG86IGFkZFBvb2xpbmdUbyxcbiAgb25lQXJndW1lbnRQb29sZXI6IG9uZUFyZ3VtZW50UG9vbGVyLFxuICB0d29Bcmd1bWVudFBvb2xlcjogdHdvQXJndW1lbnRQb29sZXIsXG4gIHRocmVlQXJndW1lbnRQb29sZXI6IHRocmVlQXJndW1lbnRQb29sZXIsXG4gIGZvdXJBcmd1bWVudFBvb2xlcjogZm91ckFyZ3VtZW50UG9vbGVyXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFBvb2xlZENsYXNzOyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBfYXNzaWduID0gcmVxdWlyZSgnb2JqZWN0LWFzc2lnbicpO1xuXG52YXIgUmVhY3RDaGlsZHJlbiA9IHJlcXVpcmUoJy4vUmVhY3RDaGlsZHJlbicpO1xudmFyIFJlYWN0Q29tcG9uZW50ID0gcmVxdWlyZSgnLi9SZWFjdENvbXBvbmVudCcpO1xudmFyIFJlYWN0UHVyZUNvbXBvbmVudCA9IHJlcXVpcmUoJy4vUmVhY3RQdXJlQ29tcG9uZW50Jyk7XG52YXIgUmVhY3RDbGFzcyA9IHJlcXVpcmUoJy4vUmVhY3RDbGFzcycpO1xudmFyIFJlYWN0RE9NRmFjdG9yaWVzID0gcmVxdWlyZSgnLi9SZWFjdERPTUZhY3RvcmllcycpO1xudmFyIFJlYWN0RWxlbWVudCA9IHJlcXVpcmUoJy4vUmVhY3RFbGVtZW50Jyk7XG52YXIgUmVhY3RQcm9wVHlwZXMgPSByZXF1aXJlKCcuL1JlYWN0UHJvcFR5cGVzJyk7XG52YXIgUmVhY3RWZXJzaW9uID0gcmVxdWlyZSgnLi9SZWFjdFZlcnNpb24nKTtcblxudmFyIG9ubHlDaGlsZCA9IHJlcXVpcmUoJy4vb25seUNoaWxkJyk7XG52YXIgd2FybmluZyA9IHJlcXVpcmUoJ2ZianMvbGliL3dhcm5pbmcnKTtcblxudmFyIGNyZWF0ZUVsZW1lbnQgPSBSZWFjdEVsZW1lbnQuY3JlYXRlRWxlbWVudDtcbnZhciBjcmVhdGVGYWN0b3J5ID0gUmVhY3RFbGVtZW50LmNyZWF0ZUZhY3Rvcnk7XG52YXIgY2xvbmVFbGVtZW50ID0gUmVhY3RFbGVtZW50LmNsb25lRWxlbWVudDtcblxuaWYgKFwiZGV2ZWxvcG1lbnRcIiAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIHZhciBSZWFjdEVsZW1lbnRWYWxpZGF0b3IgPSByZXF1aXJlKCcuL1JlYWN0RWxlbWVudFZhbGlkYXRvcicpO1xuICBjcmVhdGVFbGVtZW50ID0gUmVhY3RFbGVtZW50VmFsaWRhdG9yLmNyZWF0ZUVsZW1lbnQ7XG4gIGNyZWF0ZUZhY3RvcnkgPSBSZWFjdEVsZW1lbnRWYWxpZGF0b3IuY3JlYXRlRmFjdG9yeTtcbiAgY2xvbmVFbGVtZW50ID0gUmVhY3RFbGVtZW50VmFsaWRhdG9yLmNsb25lRWxlbWVudDtcbn1cblxudmFyIF9fc3ByZWFkID0gX2Fzc2lnbjtcblxuaWYgKFwiZGV2ZWxvcG1lbnRcIiAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIHZhciB3YXJuZWQgPSBmYWxzZTtcbiAgX19zcHJlYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgXCJkZXZlbG9wbWVudFwiICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKHdhcm5lZCwgJ1JlYWN0Ll9fc3ByZWFkIGlzIGRlcHJlY2F0ZWQgYW5kIHNob3VsZCBub3QgYmUgdXNlZC4gVXNlICcgKyAnT2JqZWN0LmFzc2lnbiBkaXJlY3RseSBvciBhbm90aGVyIGhlbHBlciBmdW5jdGlvbiB3aXRoIHNpbWlsYXIgJyArICdzZW1hbnRpY3MuIFlvdSBtYXkgYmUgc2VlaW5nIHRoaXMgd2FybmluZyBkdWUgdG8geW91ciBjb21waWxlci4gJyArICdTZWUgaHR0cHM6Ly9mYi5tZS9yZWFjdC1zcHJlYWQtZGVwcmVjYXRpb24gZm9yIG1vcmUgZGV0YWlscy4nKSA6IHZvaWQgMDtcbiAgICB3YXJuZWQgPSB0cnVlO1xuICAgIHJldHVybiBfYXNzaWduLmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7XG4gIH07XG59XG5cbnZhciBSZWFjdCA9IHtcblxuICAvLyBNb2Rlcm5cblxuICBDaGlsZHJlbjoge1xuICAgIG1hcDogUmVhY3RDaGlsZHJlbi5tYXAsXG4gICAgZm9yRWFjaDogUmVhY3RDaGlsZHJlbi5mb3JFYWNoLFxuICAgIGNvdW50OiBSZWFjdENoaWxkcmVuLmNvdW50LFxuICAgIHRvQXJyYXk6IFJlYWN0Q2hpbGRyZW4udG9BcnJheSxcbiAgICBvbmx5OiBvbmx5Q2hpbGRcbiAgfSxcblxuICBDb21wb25lbnQ6IFJlYWN0Q29tcG9uZW50LFxuICBQdXJlQ29tcG9uZW50OiBSZWFjdFB1cmVDb21wb25lbnQsXG5cbiAgY3JlYXRlRWxlbWVudDogY3JlYXRlRWxlbWVudCxcbiAgY2xvbmVFbGVtZW50OiBjbG9uZUVsZW1lbnQsXG4gIGlzVmFsaWRFbGVtZW50OiBSZWFjdEVsZW1lbnQuaXNWYWxpZEVsZW1lbnQsXG5cbiAgLy8gQ2xhc3NpY1xuXG4gIFByb3BUeXBlczogUmVhY3RQcm9wVHlwZXMsXG4gIGNyZWF0ZUNsYXNzOiBSZWFjdENsYXNzLmNyZWF0ZUNsYXNzLFxuICBjcmVhdGVGYWN0b3J5OiBjcmVhdGVGYWN0b3J5LFxuICBjcmVhdGVNaXhpbjogZnVuY3Rpb24gKG1peGluKSB7XG4gICAgLy8gQ3VycmVudGx5IGEgbm9vcC4gV2lsbCBiZSB1c2VkIHRvIHZhbGlkYXRlIGFuZCB0cmFjZSBtaXhpbnMuXG4gICAgcmV0dXJuIG1peGluO1xuICB9LFxuXG4gIC8vIFRoaXMgbG9va3MgRE9NIHNwZWNpZmljIGJ1dCB0aGVzZSBhcmUgYWN0dWFsbHkgaXNvbW9ycGhpYyBoZWxwZXJzXG4gIC8vIHNpbmNlIHRoZXkgYXJlIGp1c3QgZ2VuZXJhdGluZyBET00gc3RyaW5ncy5cbiAgRE9NOiBSZWFjdERPTUZhY3RvcmllcyxcblxuICB2ZXJzaW9uOiBSZWFjdFZlcnNpb24sXG5cbiAgLy8gRGVwcmVjYXRlZCBob29rIGZvciBKU1ggc3ByZWFkLCBkb24ndCB1c2UgdGhpcyBmb3IgYW55dGhpbmcuXG4gIF9fc3ByZWFkOiBfX3NwcmVhZFxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdDsiLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUG9vbGVkQ2xhc3MgPSByZXF1aXJlKCcuL1Bvb2xlZENsYXNzJyk7XG52YXIgUmVhY3RFbGVtZW50ID0gcmVxdWlyZSgnLi9SZWFjdEVsZW1lbnQnKTtcblxudmFyIGVtcHR5RnVuY3Rpb24gPSByZXF1aXJlKCdmYmpzL2xpYi9lbXB0eUZ1bmN0aW9uJyk7XG52YXIgdHJhdmVyc2VBbGxDaGlsZHJlbiA9IHJlcXVpcmUoJy4vdHJhdmVyc2VBbGxDaGlsZHJlbicpO1xuXG52YXIgdHdvQXJndW1lbnRQb29sZXIgPSBQb29sZWRDbGFzcy50d29Bcmd1bWVudFBvb2xlcjtcbnZhciBmb3VyQXJndW1lbnRQb29sZXIgPSBQb29sZWRDbGFzcy5mb3VyQXJndW1lbnRQb29sZXI7XG5cbnZhciB1c2VyUHJvdmlkZWRLZXlFc2NhcGVSZWdleCA9IC9cXC8rL2c7XG5mdW5jdGlvbiBlc2NhcGVVc2VyUHJvdmlkZWRLZXkodGV4dCkge1xuICByZXR1cm4gKCcnICsgdGV4dCkucmVwbGFjZSh1c2VyUHJvdmlkZWRLZXlFc2NhcGVSZWdleCwgJyQmLycpO1xufVxuXG4vKipcbiAqIFBvb2xlZENsYXNzIHJlcHJlc2VudGluZyB0aGUgYm9va2tlZXBpbmcgYXNzb2NpYXRlZCB3aXRoIHBlcmZvcm1pbmcgYSBjaGlsZFxuICogdHJhdmVyc2FsLiBBbGxvd3MgYXZvaWRpbmcgYmluZGluZyBjYWxsYmFja3MuXG4gKlxuICogQGNvbnN0cnVjdG9yIEZvckVhY2hCb29rS2VlcGluZ1xuICogQHBhcmFtIHshZnVuY3Rpb259IGZvckVhY2hGdW5jdGlvbiBGdW5jdGlvbiB0byBwZXJmb3JtIHRyYXZlcnNhbCB3aXRoLlxuICogQHBhcmFtIHs/Kn0gZm9yRWFjaENvbnRleHQgQ29udGV4dCB0byBwZXJmb3JtIGNvbnRleHQgd2l0aC5cbiAqL1xuZnVuY3Rpb24gRm9yRWFjaEJvb2tLZWVwaW5nKGZvckVhY2hGdW5jdGlvbiwgZm9yRWFjaENvbnRleHQpIHtcbiAgdGhpcy5mdW5jID0gZm9yRWFjaEZ1bmN0aW9uO1xuICB0aGlzLmNvbnRleHQgPSBmb3JFYWNoQ29udGV4dDtcbiAgdGhpcy5jb3VudCA9IDA7XG59XG5Gb3JFYWNoQm9va0tlZXBpbmcucHJvdG90eXBlLmRlc3RydWN0b3IgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuZnVuYyA9IG51bGw7XG4gIHRoaXMuY29udGV4dCA9IG51bGw7XG4gIHRoaXMuY291bnQgPSAwO1xufTtcblBvb2xlZENsYXNzLmFkZFBvb2xpbmdUbyhGb3JFYWNoQm9va0tlZXBpbmcsIHR3b0FyZ3VtZW50UG9vbGVyKTtcblxuZnVuY3Rpb24gZm9yRWFjaFNpbmdsZUNoaWxkKGJvb2tLZWVwaW5nLCBjaGlsZCwgbmFtZSkge1xuICB2YXIgZnVuYyA9IGJvb2tLZWVwaW5nLmZ1bmMsXG4gICAgICBjb250ZXh0ID0gYm9va0tlZXBpbmcuY29udGV4dDtcblxuICBmdW5jLmNhbGwoY29udGV4dCwgY2hpbGQsIGJvb2tLZWVwaW5nLmNvdW50KyspO1xufVxuXG4vKipcbiAqIEl0ZXJhdGVzIHRocm91Z2ggY2hpbGRyZW4gdGhhdCBhcmUgdHlwaWNhbGx5IHNwZWNpZmllZCBhcyBgcHJvcHMuY2hpbGRyZW5gLlxuICpcbiAqIFNlZSBodHRwczovL2ZhY2Vib29rLmdpdGh1Yi5pby9yZWFjdC9kb2NzL3RvcC1sZXZlbC1hcGkuaHRtbCNyZWFjdC5jaGlsZHJlbi5mb3JlYWNoXG4gKlxuICogVGhlIHByb3ZpZGVkIGZvckVhY2hGdW5jKGNoaWxkLCBpbmRleCkgd2lsbCBiZSBjYWxsZWQgZm9yIGVhY2hcbiAqIGxlYWYgY2hpbGQuXG4gKlxuICogQHBhcmFtIHs/Kn0gY2hpbGRyZW4gQ2hpbGRyZW4gdHJlZSBjb250YWluZXIuXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKCosIGludCl9IGZvckVhY2hGdW5jXG4gKiBAcGFyYW0geyp9IGZvckVhY2hDb250ZXh0IENvbnRleHQgZm9yIGZvckVhY2hDb250ZXh0LlxuICovXG5mdW5jdGlvbiBmb3JFYWNoQ2hpbGRyZW4oY2hpbGRyZW4sIGZvckVhY2hGdW5jLCBmb3JFYWNoQ29udGV4dCkge1xuICBpZiAoY2hpbGRyZW4gPT0gbnVsbCkge1xuICAgIHJldHVybiBjaGlsZHJlbjtcbiAgfVxuICB2YXIgdHJhdmVyc2VDb250ZXh0ID0gRm9yRWFjaEJvb2tLZWVwaW5nLmdldFBvb2xlZChmb3JFYWNoRnVuYywgZm9yRWFjaENvbnRleHQpO1xuICB0cmF2ZXJzZUFsbENoaWxkcmVuKGNoaWxkcmVuLCBmb3JFYWNoU2luZ2xlQ2hpbGQsIHRyYXZlcnNlQ29udGV4dCk7XG4gIEZvckVhY2hCb29rS2VlcGluZy5yZWxlYXNlKHRyYXZlcnNlQ29udGV4dCk7XG59XG5cbi8qKlxuICogUG9vbGVkQ2xhc3MgcmVwcmVzZW50aW5nIHRoZSBib29ra2VlcGluZyBhc3NvY2lhdGVkIHdpdGggcGVyZm9ybWluZyBhIGNoaWxkXG4gKiBtYXBwaW5nLiBBbGxvd3MgYXZvaWRpbmcgYmluZGluZyBjYWxsYmFja3MuXG4gKlxuICogQGNvbnN0cnVjdG9yIE1hcEJvb2tLZWVwaW5nXG4gKiBAcGFyYW0geyEqfSBtYXBSZXN1bHQgT2JqZWN0IGNvbnRhaW5pbmcgdGhlIG9yZGVyZWQgbWFwIG9mIHJlc3VsdHMuXG4gKiBAcGFyYW0geyFmdW5jdGlvbn0gbWFwRnVuY3Rpb24gRnVuY3Rpb24gdG8gcGVyZm9ybSBtYXBwaW5nIHdpdGguXG4gKiBAcGFyYW0gez8qfSBtYXBDb250ZXh0IENvbnRleHQgdG8gcGVyZm9ybSBtYXBwaW5nIHdpdGguXG4gKi9cbmZ1bmN0aW9uIE1hcEJvb2tLZWVwaW5nKG1hcFJlc3VsdCwga2V5UHJlZml4LCBtYXBGdW5jdGlvbiwgbWFwQ29udGV4dCkge1xuICB0aGlzLnJlc3VsdCA9IG1hcFJlc3VsdDtcbiAgdGhpcy5rZXlQcmVmaXggPSBrZXlQcmVmaXg7XG4gIHRoaXMuZnVuYyA9IG1hcEZ1bmN0aW9uO1xuICB0aGlzLmNvbnRleHQgPSBtYXBDb250ZXh0O1xuICB0aGlzLmNvdW50ID0gMDtcbn1cbk1hcEJvb2tLZWVwaW5nLnByb3RvdHlwZS5kZXN0cnVjdG9yID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLnJlc3VsdCA9IG51bGw7XG4gIHRoaXMua2V5UHJlZml4ID0gbnVsbDtcbiAgdGhpcy5mdW5jID0gbnVsbDtcbiAgdGhpcy5jb250ZXh0ID0gbnVsbDtcbiAgdGhpcy5jb3VudCA9IDA7XG59O1xuUG9vbGVkQ2xhc3MuYWRkUG9vbGluZ1RvKE1hcEJvb2tLZWVwaW5nLCBmb3VyQXJndW1lbnRQb29sZXIpO1xuXG5mdW5jdGlvbiBtYXBTaW5nbGVDaGlsZEludG9Db250ZXh0KGJvb2tLZWVwaW5nLCBjaGlsZCwgY2hpbGRLZXkpIHtcbiAgdmFyIHJlc3VsdCA9IGJvb2tLZWVwaW5nLnJlc3VsdCxcbiAgICAgIGtleVByZWZpeCA9IGJvb2tLZWVwaW5nLmtleVByZWZpeCxcbiAgICAgIGZ1bmMgPSBib29rS2VlcGluZy5mdW5jLFxuICAgICAgY29udGV4dCA9IGJvb2tLZWVwaW5nLmNvbnRleHQ7XG5cblxuICB2YXIgbWFwcGVkQ2hpbGQgPSBmdW5jLmNhbGwoY29udGV4dCwgY2hpbGQsIGJvb2tLZWVwaW5nLmNvdW50KyspO1xuICBpZiAoQXJyYXkuaXNBcnJheShtYXBwZWRDaGlsZCkpIHtcbiAgICBtYXBJbnRvV2l0aEtleVByZWZpeEludGVybmFsKG1hcHBlZENoaWxkLCByZXN1bHQsIGNoaWxkS2V5LCBlbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zQXJndW1lbnQpO1xuICB9IGVsc2UgaWYgKG1hcHBlZENoaWxkICE9IG51bGwpIHtcbiAgICBpZiAoUmVhY3RFbGVtZW50LmlzVmFsaWRFbGVtZW50KG1hcHBlZENoaWxkKSkge1xuICAgICAgbWFwcGVkQ2hpbGQgPSBSZWFjdEVsZW1lbnQuY2xvbmVBbmRSZXBsYWNlS2V5KG1hcHBlZENoaWxkLFxuICAgICAgLy8gS2VlcCBib3RoIHRoZSAobWFwcGVkKSBhbmQgb2xkIGtleXMgaWYgdGhleSBkaWZmZXIsIGp1c3QgYXNcbiAgICAgIC8vIHRyYXZlcnNlQWxsQ2hpbGRyZW4gdXNlZCB0byBkbyBmb3Igb2JqZWN0cyBhcyBjaGlsZHJlblxuICAgICAga2V5UHJlZml4ICsgKG1hcHBlZENoaWxkLmtleSAmJiAoIWNoaWxkIHx8IGNoaWxkLmtleSAhPT0gbWFwcGVkQ2hpbGQua2V5KSA/IGVzY2FwZVVzZXJQcm92aWRlZEtleShtYXBwZWRDaGlsZC5rZXkpICsgJy8nIDogJycpICsgY2hpbGRLZXkpO1xuICAgIH1cbiAgICByZXN1bHQucHVzaChtYXBwZWRDaGlsZCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gbWFwSW50b1dpdGhLZXlQcmVmaXhJbnRlcm5hbChjaGlsZHJlbiwgYXJyYXksIHByZWZpeCwgZnVuYywgY29udGV4dCkge1xuICB2YXIgZXNjYXBlZFByZWZpeCA9ICcnO1xuICBpZiAocHJlZml4ICE9IG51bGwpIHtcbiAgICBlc2NhcGVkUHJlZml4ID0gZXNjYXBlVXNlclByb3ZpZGVkS2V5KHByZWZpeCkgKyAnLyc7XG4gIH1cbiAgdmFyIHRyYXZlcnNlQ29udGV4dCA9IE1hcEJvb2tLZWVwaW5nLmdldFBvb2xlZChhcnJheSwgZXNjYXBlZFByZWZpeCwgZnVuYywgY29udGV4dCk7XG4gIHRyYXZlcnNlQWxsQ2hpbGRyZW4oY2hpbGRyZW4sIG1hcFNpbmdsZUNoaWxkSW50b0NvbnRleHQsIHRyYXZlcnNlQ29udGV4dCk7XG4gIE1hcEJvb2tLZWVwaW5nLnJlbGVhc2UodHJhdmVyc2VDb250ZXh0KTtcbn1cblxuLyoqXG4gKiBNYXBzIGNoaWxkcmVuIHRoYXQgYXJlIHR5cGljYWxseSBzcGVjaWZpZWQgYXMgYHByb3BzLmNoaWxkcmVuYC5cbiAqXG4gKiBTZWUgaHR0cHM6Ly9mYWNlYm9vay5naXRodWIuaW8vcmVhY3QvZG9jcy90b3AtbGV2ZWwtYXBpLmh0bWwjcmVhY3QuY2hpbGRyZW4ubWFwXG4gKlxuICogVGhlIHByb3ZpZGVkIG1hcEZ1bmN0aW9uKGNoaWxkLCBrZXksIGluZGV4KSB3aWxsIGJlIGNhbGxlZCBmb3IgZWFjaFxuICogbGVhZiBjaGlsZC5cbiAqXG4gKiBAcGFyYW0gez8qfSBjaGlsZHJlbiBDaGlsZHJlbiB0cmVlIGNvbnRhaW5lci5cbiAqIEBwYXJhbSB7ZnVuY3Rpb24oKiwgaW50KX0gZnVuYyBUaGUgbWFwIGZ1bmN0aW9uLlxuICogQHBhcmFtIHsqfSBjb250ZXh0IENvbnRleHQgZm9yIG1hcEZ1bmN0aW9uLlxuICogQHJldHVybiB7b2JqZWN0fSBPYmplY3QgY29udGFpbmluZyB0aGUgb3JkZXJlZCBtYXAgb2YgcmVzdWx0cy5cbiAqL1xuZnVuY3Rpb24gbWFwQ2hpbGRyZW4oY2hpbGRyZW4sIGZ1bmMsIGNvbnRleHQpIHtcbiAgaWYgKGNoaWxkcmVuID09IG51bGwpIHtcbiAgICByZXR1cm4gY2hpbGRyZW47XG4gIH1cbiAgdmFyIHJlc3VsdCA9IFtdO1xuICBtYXBJbnRvV2l0aEtleVByZWZpeEludGVybmFsKGNoaWxkcmVuLCByZXN1bHQsIG51bGwsIGZ1bmMsIGNvbnRleHQpO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBmb3JFYWNoU2luZ2xlQ2hpbGREdW1teSh0cmF2ZXJzZUNvbnRleHQsIGNoaWxkLCBuYW1lKSB7XG4gIHJldHVybiBudWxsO1xufVxuXG4vKipcbiAqIENvdW50IHRoZSBudW1iZXIgb2YgY2hpbGRyZW4gdGhhdCBhcmUgdHlwaWNhbGx5IHNwZWNpZmllZCBhc1xuICogYHByb3BzLmNoaWxkcmVuYC5cbiAqXG4gKiBTZWUgaHR0cHM6Ly9mYWNlYm9vay5naXRodWIuaW8vcmVhY3QvZG9jcy90b3AtbGV2ZWwtYXBpLmh0bWwjcmVhY3QuY2hpbGRyZW4uY291bnRcbiAqXG4gKiBAcGFyYW0gez8qfSBjaGlsZHJlbiBDaGlsZHJlbiB0cmVlIGNvbnRhaW5lci5cbiAqIEByZXR1cm4ge251bWJlcn0gVGhlIG51bWJlciBvZiBjaGlsZHJlbi5cbiAqL1xuZnVuY3Rpb24gY291bnRDaGlsZHJlbihjaGlsZHJlbiwgY29udGV4dCkge1xuICByZXR1cm4gdHJhdmVyc2VBbGxDaGlsZHJlbihjaGlsZHJlbiwgZm9yRWFjaFNpbmdsZUNoaWxkRHVtbXksIG51bGwpO1xufVxuXG4vKipcbiAqIEZsYXR0ZW4gYSBjaGlsZHJlbiBvYmplY3QgKHR5cGljYWxseSBzcGVjaWZpZWQgYXMgYHByb3BzLmNoaWxkcmVuYCkgYW5kXG4gKiByZXR1cm4gYW4gYXJyYXkgd2l0aCBhcHByb3ByaWF0ZWx5IHJlLWtleWVkIGNoaWxkcmVuLlxuICpcbiAqIFNlZSBodHRwczovL2ZhY2Vib29rLmdpdGh1Yi5pby9yZWFjdC9kb2NzL3RvcC1sZXZlbC1hcGkuaHRtbCNyZWFjdC5jaGlsZHJlbi50b2FycmF5XG4gKi9cbmZ1bmN0aW9uIHRvQXJyYXkoY2hpbGRyZW4pIHtcbiAgdmFyIHJlc3VsdCA9IFtdO1xuICBtYXBJbnRvV2l0aEtleVByZWZpeEludGVybmFsKGNoaWxkcmVuLCByZXN1bHQsIG51bGwsIGVtcHR5RnVuY3Rpb24udGhhdFJldHVybnNBcmd1bWVudCk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbnZhciBSZWFjdENoaWxkcmVuID0ge1xuICBmb3JFYWNoOiBmb3JFYWNoQ2hpbGRyZW4sXG4gIG1hcDogbWFwQ2hpbGRyZW4sXG4gIG1hcEludG9XaXRoS2V5UHJlZml4SW50ZXJuYWw6IG1hcEludG9XaXRoS2V5UHJlZml4SW50ZXJuYWwsXG4gIGNvdW50OiBjb3VudENoaWxkcmVuLFxuICB0b0FycmF5OiB0b0FycmF5XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0Q2hpbGRyZW47IiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIF9wcm9kSW52YXJpYW50ID0gcmVxdWlyZSgnLi9yZWFjdFByb2RJbnZhcmlhbnQnKSxcbiAgICBfYXNzaWduID0gcmVxdWlyZSgnb2JqZWN0LWFzc2lnbicpO1xuXG52YXIgUmVhY3RDb21wb25lbnQgPSByZXF1aXJlKCcuL1JlYWN0Q29tcG9uZW50Jyk7XG52YXIgUmVhY3RFbGVtZW50ID0gcmVxdWlyZSgnLi9SZWFjdEVsZW1lbnQnKTtcbnZhciBSZWFjdFByb3BUeXBlTG9jYXRpb25OYW1lcyA9IHJlcXVpcmUoJy4vUmVhY3RQcm9wVHlwZUxvY2F0aW9uTmFtZXMnKTtcbnZhciBSZWFjdE5vb3BVcGRhdGVRdWV1ZSA9IHJlcXVpcmUoJy4vUmVhY3ROb29wVXBkYXRlUXVldWUnKTtcblxudmFyIGVtcHR5T2JqZWN0ID0gcmVxdWlyZSgnZmJqcy9saWIvZW1wdHlPYmplY3QnKTtcbnZhciBpbnZhcmlhbnQgPSByZXF1aXJlKCdmYmpzL2xpYi9pbnZhcmlhbnQnKTtcbnZhciB3YXJuaW5nID0gcmVxdWlyZSgnZmJqcy9saWIvd2FybmluZycpO1xuXG52YXIgTUlYSU5TX0tFWSA9ICdtaXhpbnMnO1xuXG4vLyBIZWxwZXIgZnVuY3Rpb24gdG8gYWxsb3cgdGhlIGNyZWF0aW9uIG9mIGFub255bW91cyBmdW5jdGlvbnMgd2hpY2ggZG8gbm90XG4vLyBoYXZlIC5uYW1lIHNldCB0byB0aGUgbmFtZSBvZiB0aGUgdmFyaWFibGUgYmVpbmcgYXNzaWduZWQgdG8uXG5mdW5jdGlvbiBpZGVudGl0eShmbikge1xuICByZXR1cm4gZm47XG59XG5cbi8qKlxuICogUG9saWNpZXMgdGhhdCBkZXNjcmliZSBtZXRob2RzIGluIGBSZWFjdENsYXNzSW50ZXJmYWNlYC5cbiAqL1xuXG5cbnZhciBpbmplY3RlZE1peGlucyA9IFtdO1xuXG4vKipcbiAqIENvbXBvc2l0ZSBjb21wb25lbnRzIGFyZSBoaWdoZXItbGV2ZWwgY29tcG9uZW50cyB0aGF0IGNvbXBvc2Ugb3RoZXIgY29tcG9zaXRlXG4gKiBvciBob3N0IGNvbXBvbmVudHMuXG4gKlxuICogVG8gY3JlYXRlIGEgbmV3IHR5cGUgb2YgYFJlYWN0Q2xhc3NgLCBwYXNzIGEgc3BlY2lmaWNhdGlvbiBvZlxuICogeW91ciBuZXcgY2xhc3MgdG8gYFJlYWN0LmNyZWF0ZUNsYXNzYC4gVGhlIG9ubHkgcmVxdWlyZW1lbnQgb2YgeW91ciBjbGFzc1xuICogc3BlY2lmaWNhdGlvbiBpcyB0aGF0IHlvdSBpbXBsZW1lbnQgYSBgcmVuZGVyYCBtZXRob2QuXG4gKlxuICogICB2YXIgTXlDb21wb25lbnQgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gKiAgICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAqICAgICAgIHJldHVybiA8ZGl2PkhlbGxvIFdvcmxkPC9kaXY+O1xuICogICAgIH1cbiAqICAgfSk7XG4gKlxuICogVGhlIGNsYXNzIHNwZWNpZmljYXRpb24gc3VwcG9ydHMgYSBzcGVjaWZpYyBwcm90b2NvbCBvZiBtZXRob2RzIHRoYXQgaGF2ZVxuICogc3BlY2lhbCBtZWFuaW5nIChlLmcuIGByZW5kZXJgKS4gU2VlIGBSZWFjdENsYXNzSW50ZXJmYWNlYCBmb3JcbiAqIG1vcmUgdGhlIGNvbXByZWhlbnNpdmUgcHJvdG9jb2wuIEFueSBvdGhlciBwcm9wZXJ0aWVzIGFuZCBtZXRob2RzIGluIHRoZVxuICogY2xhc3Mgc3BlY2lmaWNhdGlvbiB3aWxsIGJlIGF2YWlsYWJsZSBvbiB0aGUgcHJvdG90eXBlLlxuICpcbiAqIEBpbnRlcmZhY2UgUmVhY3RDbGFzc0ludGVyZmFjZVxuICogQGludGVybmFsXG4gKi9cbnZhciBSZWFjdENsYXNzSW50ZXJmYWNlID0ge1xuXG4gIC8qKlxuICAgKiBBbiBhcnJheSBvZiBNaXhpbiBvYmplY3RzIHRvIGluY2x1ZGUgd2hlbiBkZWZpbmluZyB5b3VyIGNvbXBvbmVudC5cbiAgICpcbiAgICogQHR5cGUge2FycmF5fVxuICAgKiBAb3B0aW9uYWxcbiAgICovXG4gIG1peGluczogJ0RFRklORV9NQU5ZJyxcblxuICAvKipcbiAgICogQW4gb2JqZWN0IGNvbnRhaW5pbmcgcHJvcGVydGllcyBhbmQgbWV0aG9kcyB0aGF0IHNob3VsZCBiZSBkZWZpbmVkIG9uXG4gICAqIHRoZSBjb21wb25lbnQncyBjb25zdHJ1Y3RvciBpbnN0ZWFkIG9mIGl0cyBwcm90b3R5cGUgKHN0YXRpYyBtZXRob2RzKS5cbiAgICpcbiAgICogQHR5cGUge29iamVjdH1cbiAgICogQG9wdGlvbmFsXG4gICAqL1xuICBzdGF0aWNzOiAnREVGSU5FX01BTlknLFxuXG4gIC8qKlxuICAgKiBEZWZpbml0aW9uIG9mIHByb3AgdHlwZXMgZm9yIHRoaXMgY29tcG9uZW50LlxuICAgKlxuICAgKiBAdHlwZSB7b2JqZWN0fVxuICAgKiBAb3B0aW9uYWxcbiAgICovXG4gIHByb3BUeXBlczogJ0RFRklORV9NQU5ZJyxcblxuICAvKipcbiAgICogRGVmaW5pdGlvbiBvZiBjb250ZXh0IHR5cGVzIGZvciB0aGlzIGNvbXBvbmVudC5cbiAgICpcbiAgICogQHR5cGUge29iamVjdH1cbiAgICogQG9wdGlvbmFsXG4gICAqL1xuICBjb250ZXh0VHlwZXM6ICdERUZJTkVfTUFOWScsXG5cbiAgLyoqXG4gICAqIERlZmluaXRpb24gb2YgY29udGV4dCB0eXBlcyB0aGlzIGNvbXBvbmVudCBzZXRzIGZvciBpdHMgY2hpbGRyZW4uXG4gICAqXG4gICAqIEB0eXBlIHtvYmplY3R9XG4gICAqIEBvcHRpb25hbFxuICAgKi9cbiAgY2hpbGRDb250ZXh0VHlwZXM6ICdERUZJTkVfTUFOWScsXG5cbiAgLy8gPT09PSBEZWZpbml0aW9uIG1ldGhvZHMgPT09PVxuXG4gIC8qKlxuICAgKiBJbnZva2VkIHdoZW4gdGhlIGNvbXBvbmVudCBpcyBtb3VudGVkLiBWYWx1ZXMgaW4gdGhlIG1hcHBpbmcgd2lsbCBiZSBzZXQgb25cbiAgICogYHRoaXMucHJvcHNgIGlmIHRoYXQgcHJvcCBpcyBub3Qgc3BlY2lmaWVkIChpLmUuIHVzaW5nIGFuIGBpbmAgY2hlY2spLlxuICAgKlxuICAgKiBUaGlzIG1ldGhvZCBpcyBpbnZva2VkIGJlZm9yZSBgZ2V0SW5pdGlhbFN0YXRlYCBhbmQgdGhlcmVmb3JlIGNhbm5vdCByZWx5XG4gICAqIG9uIGB0aGlzLnN0YXRlYCBvciB1c2UgYHRoaXMuc2V0U3RhdGVgLlxuICAgKlxuICAgKiBAcmV0dXJuIHtvYmplY3R9XG4gICAqIEBvcHRpb25hbFxuICAgKi9cbiAgZ2V0RGVmYXVsdFByb3BzOiAnREVGSU5FX01BTllfTUVSR0VEJyxcblxuICAvKipcbiAgICogSW52b2tlZCBvbmNlIGJlZm9yZSB0aGUgY29tcG9uZW50IGlzIG1vdW50ZWQuIFRoZSByZXR1cm4gdmFsdWUgd2lsbCBiZSB1c2VkXG4gICAqIGFzIHRoZSBpbml0aWFsIHZhbHVlIG9mIGB0aGlzLnN0YXRlYC5cbiAgICpcbiAgICogICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCkge1xuICAgKiAgICAgcmV0dXJuIHtcbiAgICogICAgICAgaXNPbjogZmFsc2UsXG4gICAqICAgICAgIGZvb0JhejogbmV3IEJhekZvbygpXG4gICAqICAgICB9XG4gICAqICAgfVxuICAgKlxuICAgKiBAcmV0dXJuIHtvYmplY3R9XG4gICAqIEBvcHRpb25hbFxuICAgKi9cbiAgZ2V0SW5pdGlhbFN0YXRlOiAnREVGSU5FX01BTllfTUVSR0VEJyxcblxuICAvKipcbiAgICogQHJldHVybiB7b2JqZWN0fVxuICAgKiBAb3B0aW9uYWxcbiAgICovXG4gIGdldENoaWxkQ29udGV4dDogJ0RFRklORV9NQU5ZX01FUkdFRCcsXG5cbiAgLyoqXG4gICAqIFVzZXMgcHJvcHMgZnJvbSBgdGhpcy5wcm9wc2AgYW5kIHN0YXRlIGZyb20gYHRoaXMuc3RhdGVgIHRvIHJlbmRlciB0aGVcbiAgICogc3RydWN0dXJlIG9mIHRoZSBjb21wb25lbnQuXG4gICAqXG4gICAqIE5vIGd1YXJhbnRlZXMgYXJlIG1hZGUgYWJvdXQgd2hlbiBvciBob3cgb2Z0ZW4gdGhpcyBtZXRob2QgaXMgaW52b2tlZCwgc29cbiAgICogaXQgbXVzdCBub3QgaGF2ZSBzaWRlIGVmZmVjdHMuXG4gICAqXG4gICAqICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICogICAgIHZhciBuYW1lID0gdGhpcy5wcm9wcy5uYW1lO1xuICAgKiAgICAgcmV0dXJuIDxkaXY+SGVsbG8sIHtuYW1lfSE8L2Rpdj47XG4gICAqICAgfVxuICAgKlxuICAgKiBAcmV0dXJuIHtSZWFjdENvbXBvbmVudH1cbiAgICogQG5vc2lkZWVmZmVjdHNcbiAgICogQHJlcXVpcmVkXG4gICAqL1xuICByZW5kZXI6ICdERUZJTkVfT05DRScsXG5cbiAgLy8gPT09PSBEZWxlZ2F0ZSBtZXRob2RzID09PT1cblxuICAvKipcbiAgICogSW52b2tlZCB3aGVuIHRoZSBjb21wb25lbnQgaXMgaW5pdGlhbGx5IGNyZWF0ZWQgYW5kIGFib3V0IHRvIGJlIG1vdW50ZWQuXG4gICAqIFRoaXMgbWF5IGhhdmUgc2lkZSBlZmZlY3RzLCBidXQgYW55IGV4dGVybmFsIHN1YnNjcmlwdGlvbnMgb3IgZGF0YSBjcmVhdGVkXG4gICAqIGJ5IHRoaXMgbWV0aG9kIG11c3QgYmUgY2xlYW5lZCB1cCBpbiBgY29tcG9uZW50V2lsbFVubW91bnRgLlxuICAgKlxuICAgKiBAb3B0aW9uYWxcbiAgICovXG4gIGNvbXBvbmVudFdpbGxNb3VudDogJ0RFRklORV9NQU5ZJyxcblxuICAvKipcbiAgICogSW52b2tlZCB3aGVuIHRoZSBjb21wb25lbnQgaGFzIGJlZW4gbW91bnRlZCBhbmQgaGFzIGEgRE9NIHJlcHJlc2VudGF0aW9uLlxuICAgKiBIb3dldmVyLCB0aGVyZSBpcyBubyBndWFyYW50ZWUgdGhhdCB0aGUgRE9NIG5vZGUgaXMgaW4gdGhlIGRvY3VtZW50LlxuICAgKlxuICAgKiBVc2UgdGhpcyBhcyBhbiBvcHBvcnR1bml0eSB0byBvcGVyYXRlIG9uIHRoZSBET00gd2hlbiB0aGUgY29tcG9uZW50IGhhc1xuICAgKiBiZWVuIG1vdW50ZWQgKGluaXRpYWxpemVkIGFuZCByZW5kZXJlZCkgZm9yIHRoZSBmaXJzdCB0aW1lLlxuICAgKlxuICAgKiBAcGFyYW0ge0RPTUVsZW1lbnR9IHJvb3ROb2RlIERPTSBlbGVtZW50IHJlcHJlc2VudGluZyB0aGUgY29tcG9uZW50LlxuICAgKiBAb3B0aW9uYWxcbiAgICovXG4gIGNvbXBvbmVudERpZE1vdW50OiAnREVGSU5FX01BTlknLFxuXG4gIC8qKlxuICAgKiBJbnZva2VkIGJlZm9yZSB0aGUgY29tcG9uZW50IHJlY2VpdmVzIG5ldyBwcm9wcy5cbiAgICpcbiAgICogVXNlIHRoaXMgYXMgYW4gb3Bwb3J0dW5pdHkgdG8gcmVhY3QgdG8gYSBwcm9wIHRyYW5zaXRpb24gYnkgdXBkYXRpbmcgdGhlXG4gICAqIHN0YXRlIHVzaW5nIGB0aGlzLnNldFN0YXRlYC4gQ3VycmVudCBwcm9wcyBhcmUgYWNjZXNzZWQgdmlhIGB0aGlzLnByb3BzYC5cbiAgICpcbiAgICogICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzOiBmdW5jdGlvbihuZXh0UHJvcHMsIG5leHRDb250ZXh0KSB7XG4gICAqICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICogICAgICAgbGlrZXNJbmNyZWFzaW5nOiBuZXh0UHJvcHMubGlrZUNvdW50ID4gdGhpcy5wcm9wcy5saWtlQ291bnRcbiAgICogICAgIH0pO1xuICAgKiAgIH1cbiAgICpcbiAgICogTk9URTogVGhlcmUgaXMgbm8gZXF1aXZhbGVudCBgY29tcG9uZW50V2lsbFJlY2VpdmVTdGF0ZWAuIEFuIGluY29taW5nIHByb3BcbiAgICogdHJhbnNpdGlvbiBtYXkgY2F1c2UgYSBzdGF0ZSBjaGFuZ2UsIGJ1dCB0aGUgb3Bwb3NpdGUgaXMgbm90IHRydWUuIElmIHlvdVxuICAgKiBuZWVkIGl0LCB5b3UgYXJlIHByb2JhYmx5IGxvb2tpbmcgZm9yIGBjb21wb25lbnRXaWxsVXBkYXRlYC5cbiAgICpcbiAgICogQHBhcmFtIHtvYmplY3R9IG5leHRQcm9wc1xuICAgKiBAb3B0aW9uYWxcbiAgICovXG4gIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHM6ICdERUZJTkVfTUFOWScsXG5cbiAgLyoqXG4gICAqIEludm9rZWQgd2hpbGUgZGVjaWRpbmcgaWYgdGhlIGNvbXBvbmVudCBzaG91bGQgYmUgdXBkYXRlZCBhcyBhIHJlc3VsdCBvZlxuICAgKiByZWNlaXZpbmcgbmV3IHByb3BzLCBzdGF0ZSBhbmQvb3IgY29udGV4dC5cbiAgICpcbiAgICogVXNlIHRoaXMgYXMgYW4gb3Bwb3J0dW5pdHkgdG8gYHJldHVybiBmYWxzZWAgd2hlbiB5b3UncmUgY2VydGFpbiB0aGF0IHRoZVxuICAgKiB0cmFuc2l0aW9uIHRvIHRoZSBuZXcgcHJvcHMvc3RhdGUvY29udGV4dCB3aWxsIG5vdCByZXF1aXJlIGEgY29tcG9uZW50XG4gICAqIHVwZGF0ZS5cbiAgICpcbiAgICogICBzaG91bGRDb21wb25lbnRVcGRhdGU6IGZ1bmN0aW9uKG5leHRQcm9wcywgbmV4dFN0YXRlLCBuZXh0Q29udGV4dCkge1xuICAgKiAgICAgcmV0dXJuICFlcXVhbChuZXh0UHJvcHMsIHRoaXMucHJvcHMpIHx8XG4gICAqICAgICAgICFlcXVhbChuZXh0U3RhdGUsIHRoaXMuc3RhdGUpIHx8XG4gICAqICAgICAgICFlcXVhbChuZXh0Q29udGV4dCwgdGhpcy5jb250ZXh0KTtcbiAgICogICB9XG4gICAqXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBuZXh0UHJvcHNcbiAgICogQHBhcmFtIHs/b2JqZWN0fSBuZXh0U3RhdGVcbiAgICogQHBhcmFtIHs/b2JqZWN0fSBuZXh0Q29udGV4dFxuICAgKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIGlmIHRoZSBjb21wb25lbnQgc2hvdWxkIHVwZGF0ZS5cbiAgICogQG9wdGlvbmFsXG4gICAqL1xuICBzaG91bGRDb21wb25lbnRVcGRhdGU6ICdERUZJTkVfT05DRScsXG5cbiAgLyoqXG4gICAqIEludm9rZWQgd2hlbiB0aGUgY29tcG9uZW50IGlzIGFib3V0IHRvIHVwZGF0ZSBkdWUgdG8gYSB0cmFuc2l0aW9uIGZyb21cbiAgICogYHRoaXMucHJvcHNgLCBgdGhpcy5zdGF0ZWAgYW5kIGB0aGlzLmNvbnRleHRgIHRvIGBuZXh0UHJvcHNgLCBgbmV4dFN0YXRlYFxuICAgKiBhbmQgYG5leHRDb250ZXh0YC5cbiAgICpcbiAgICogVXNlIHRoaXMgYXMgYW4gb3Bwb3J0dW5pdHkgdG8gcGVyZm9ybSBwcmVwYXJhdGlvbiBiZWZvcmUgYW4gdXBkYXRlIG9jY3Vycy5cbiAgICpcbiAgICogTk9URTogWW91ICoqY2Fubm90KiogdXNlIGB0aGlzLnNldFN0YXRlKClgIGluIHRoaXMgbWV0aG9kLlxuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdH0gbmV4dFByb3BzXG4gICAqIEBwYXJhbSB7P29iamVjdH0gbmV4dFN0YXRlXG4gICAqIEBwYXJhbSB7P29iamVjdH0gbmV4dENvbnRleHRcbiAgICogQHBhcmFtIHtSZWFjdFJlY29uY2lsZVRyYW5zYWN0aW9ufSB0cmFuc2FjdGlvblxuICAgKiBAb3B0aW9uYWxcbiAgICovXG4gIGNvbXBvbmVudFdpbGxVcGRhdGU6ICdERUZJTkVfTUFOWScsXG5cbiAgLyoqXG4gICAqIEludm9rZWQgd2hlbiB0aGUgY29tcG9uZW50J3MgRE9NIHJlcHJlc2VudGF0aW9uIGhhcyBiZWVuIHVwZGF0ZWQuXG4gICAqXG4gICAqIFVzZSB0aGlzIGFzIGFuIG9wcG9ydHVuaXR5IHRvIG9wZXJhdGUgb24gdGhlIERPTSB3aGVuIHRoZSBjb21wb25lbnQgaGFzXG4gICAqIGJlZW4gdXBkYXRlZC5cbiAgICpcbiAgICogQHBhcmFtIHtvYmplY3R9IHByZXZQcm9wc1xuICAgKiBAcGFyYW0gez9vYmplY3R9IHByZXZTdGF0ZVxuICAgKiBAcGFyYW0gez9vYmplY3R9IHByZXZDb250ZXh0XG4gICAqIEBwYXJhbSB7RE9NRWxlbWVudH0gcm9vdE5vZGUgRE9NIGVsZW1lbnQgcmVwcmVzZW50aW5nIHRoZSBjb21wb25lbnQuXG4gICAqIEBvcHRpb25hbFxuICAgKi9cbiAgY29tcG9uZW50RGlkVXBkYXRlOiAnREVGSU5FX01BTlknLFxuXG4gIC8qKlxuICAgKiBJbnZva2VkIHdoZW4gdGhlIGNvbXBvbmVudCBpcyBhYm91dCB0byBiZSByZW1vdmVkIGZyb20gaXRzIHBhcmVudCBhbmQgaGF2ZVxuICAgKiBpdHMgRE9NIHJlcHJlc2VudGF0aW9uIGRlc3Ryb3llZC5cbiAgICpcbiAgICogVXNlIHRoaXMgYXMgYW4gb3Bwb3J0dW5pdHkgdG8gZGVhbGxvY2F0ZSBhbnkgZXh0ZXJuYWwgcmVzb3VyY2VzLlxuICAgKlxuICAgKiBOT1RFOiBUaGVyZSBpcyBubyBgY29tcG9uZW50RGlkVW5tb3VudGAgc2luY2UgeW91ciBjb21wb25lbnQgd2lsbCBoYXZlIGJlZW5cbiAgICogZGVzdHJveWVkIGJ5IHRoYXQgcG9pbnQuXG4gICAqXG4gICAqIEBvcHRpb25hbFxuICAgKi9cbiAgY29tcG9uZW50V2lsbFVubW91bnQ6ICdERUZJTkVfTUFOWScsXG5cbiAgLy8gPT09PSBBZHZhbmNlZCBtZXRob2RzID09PT1cblxuICAvKipcbiAgICogVXBkYXRlcyB0aGUgY29tcG9uZW50J3MgY3VycmVudGx5IG1vdW50ZWQgRE9NIHJlcHJlc2VudGF0aW9uLlxuICAgKlxuICAgKiBCeSBkZWZhdWx0LCB0aGlzIGltcGxlbWVudHMgUmVhY3QncyByZW5kZXJpbmcgYW5kIHJlY29uY2lsaWF0aW9uIGFsZ29yaXRobS5cbiAgICogU29waGlzdGljYXRlZCBjbGllbnRzIG1heSB3aXNoIHRvIG92ZXJyaWRlIHRoaXMuXG4gICAqXG4gICAqIEBwYXJhbSB7UmVhY3RSZWNvbmNpbGVUcmFuc2FjdGlvbn0gdHJhbnNhY3Rpb25cbiAgICogQGludGVybmFsXG4gICAqIEBvdmVycmlkYWJsZVxuICAgKi9cbiAgdXBkYXRlQ29tcG9uZW50OiAnT1ZFUlJJREVfQkFTRSdcblxufTtcblxuLyoqXG4gKiBNYXBwaW5nIGZyb20gY2xhc3Mgc3BlY2lmaWNhdGlvbiBrZXlzIHRvIHNwZWNpYWwgcHJvY2Vzc2luZyBmdW5jdGlvbnMuXG4gKlxuICogQWx0aG91Z2ggdGhlc2UgYXJlIGRlY2xhcmVkIGxpa2UgaW5zdGFuY2UgcHJvcGVydGllcyBpbiB0aGUgc3BlY2lmaWNhdGlvblxuICogd2hlbiBkZWZpbmluZyBjbGFzc2VzIHVzaW5nIGBSZWFjdC5jcmVhdGVDbGFzc2AsIHRoZXkgYXJlIGFjdHVhbGx5IHN0YXRpY1xuICogYW5kIGFyZSBhY2Nlc3NpYmxlIG9uIHRoZSBjb25zdHJ1Y3RvciBpbnN0ZWFkIG9mIHRoZSBwcm90b3R5cGUuIERlc3BpdGVcbiAqIGJlaW5nIHN0YXRpYywgdGhleSBtdXN0IGJlIGRlZmluZWQgb3V0c2lkZSBvZiB0aGUgXCJzdGF0aWNzXCIga2V5IHVuZGVyXG4gKiB3aGljaCBhbGwgb3RoZXIgc3RhdGljIG1ldGhvZHMgYXJlIGRlZmluZWQuXG4gKi9cbnZhciBSRVNFUlZFRF9TUEVDX0tFWVMgPSB7XG4gIGRpc3BsYXlOYW1lOiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIGRpc3BsYXlOYW1lKSB7XG4gICAgQ29uc3RydWN0b3IuZGlzcGxheU5hbWUgPSBkaXNwbGF5TmFtZTtcbiAgfSxcbiAgbWl4aW5zOiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIG1peGlucykge1xuICAgIGlmIChtaXhpbnMpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbWl4aW5zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIG1peFNwZWNJbnRvQ29tcG9uZW50KENvbnN0cnVjdG9yLCBtaXhpbnNbaV0pO1xuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgY2hpbGRDb250ZXh0VHlwZXM6IGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgY2hpbGRDb250ZXh0VHlwZXMpIHtcbiAgICBpZiAoXCJkZXZlbG9wbWVudFwiICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIHZhbGlkYXRlVHlwZURlZihDb25zdHJ1Y3RvciwgY2hpbGRDb250ZXh0VHlwZXMsICdjaGlsZENvbnRleHQnKTtcbiAgICB9XG4gICAgQ29uc3RydWN0b3IuY2hpbGRDb250ZXh0VHlwZXMgPSBfYXNzaWduKHt9LCBDb25zdHJ1Y3Rvci5jaGlsZENvbnRleHRUeXBlcywgY2hpbGRDb250ZXh0VHlwZXMpO1xuICB9LFxuICBjb250ZXh0VHlwZXM6IGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgY29udGV4dFR5cGVzKSB7XG4gICAgaWYgKFwiZGV2ZWxvcG1lbnRcIiAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICB2YWxpZGF0ZVR5cGVEZWYoQ29uc3RydWN0b3IsIGNvbnRleHRUeXBlcywgJ2NvbnRleHQnKTtcbiAgICB9XG4gICAgQ29uc3RydWN0b3IuY29udGV4dFR5cGVzID0gX2Fzc2lnbih7fSwgQ29uc3RydWN0b3IuY29udGV4dFR5cGVzLCBjb250ZXh0VHlwZXMpO1xuICB9LFxuICAvKipcbiAgICogU3BlY2lhbCBjYXNlIGdldERlZmF1bHRQcm9wcyB3aGljaCBzaG91bGQgbW92ZSBpbnRvIHN0YXRpY3MgYnV0IHJlcXVpcmVzXG4gICAqIGF1dG9tYXRpYyBtZXJnaW5nLlxuICAgKi9cbiAgZ2V0RGVmYXVsdFByb3BzOiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIGdldERlZmF1bHRQcm9wcykge1xuICAgIGlmIChDb25zdHJ1Y3Rvci5nZXREZWZhdWx0UHJvcHMpIHtcbiAgICAgIENvbnN0cnVjdG9yLmdldERlZmF1bHRQcm9wcyA9IGNyZWF0ZU1lcmdlZFJlc3VsdEZ1bmN0aW9uKENvbnN0cnVjdG9yLmdldERlZmF1bHRQcm9wcywgZ2V0RGVmYXVsdFByb3BzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgQ29uc3RydWN0b3IuZ2V0RGVmYXVsdFByb3BzID0gZ2V0RGVmYXVsdFByb3BzO1xuICAgIH1cbiAgfSxcbiAgcHJvcFR5cGVzOiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3BUeXBlcykge1xuICAgIGlmIChcImRldmVsb3BtZW50XCIgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgdmFsaWRhdGVUeXBlRGVmKENvbnN0cnVjdG9yLCBwcm9wVHlwZXMsICdwcm9wJyk7XG4gICAgfVxuICAgIENvbnN0cnVjdG9yLnByb3BUeXBlcyA9IF9hc3NpZ24oe30sIENvbnN0cnVjdG9yLnByb3BUeXBlcywgcHJvcFR5cGVzKTtcbiAgfSxcbiAgc3RhdGljczogZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBzdGF0aWNzKSB7XG4gICAgbWl4U3RhdGljU3BlY0ludG9Db21wb25lbnQoQ29uc3RydWN0b3IsIHN0YXRpY3MpO1xuICB9LFxuICBhdXRvYmluZDogZnVuY3Rpb24gKCkge30gfTtcblxuZnVuY3Rpb24gdmFsaWRhdGVUeXBlRGVmKENvbnN0cnVjdG9yLCB0eXBlRGVmLCBsb2NhdGlvbikge1xuICBmb3IgKHZhciBwcm9wTmFtZSBpbiB0eXBlRGVmKSB7XG4gICAgaWYgKHR5cGVEZWYuaGFzT3duUHJvcGVydHkocHJvcE5hbWUpKSB7XG4gICAgICAvLyB1c2UgYSB3YXJuaW5nIGluc3RlYWQgb2YgYW4gaW52YXJpYW50IHNvIGNvbXBvbmVudHNcbiAgICAgIC8vIGRvbid0IHNob3cgdXAgaW4gcHJvZCBidXQgb25seSBpbiBfX0RFVl9fXG4gICAgICBcImRldmVsb3BtZW50XCIgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcodHlwZW9mIHR5cGVEZWZbcHJvcE5hbWVdID09PSAnZnVuY3Rpb24nLCAnJXM6ICVzIHR5cGUgYCVzYCBpcyBpbnZhbGlkOyBpdCBtdXN0IGJlIGEgZnVuY3Rpb24sIHVzdWFsbHkgZnJvbSAnICsgJ1JlYWN0LlByb3BUeXBlcy4nLCBDb25zdHJ1Y3Rvci5kaXNwbGF5TmFtZSB8fCAnUmVhY3RDbGFzcycsIFJlYWN0UHJvcFR5cGVMb2NhdGlvbk5hbWVzW2xvY2F0aW9uXSwgcHJvcE5hbWUpIDogdm9pZCAwO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiB2YWxpZGF0ZU1ldGhvZE92ZXJyaWRlKGlzQWxyZWFkeURlZmluZWQsIG5hbWUpIHtcbiAgdmFyIHNwZWNQb2xpY3kgPSBSZWFjdENsYXNzSW50ZXJmYWNlLmhhc093blByb3BlcnR5KG5hbWUpID8gUmVhY3RDbGFzc0ludGVyZmFjZVtuYW1lXSA6IG51bGw7XG5cbiAgLy8gRGlzYWxsb3cgb3ZlcnJpZGluZyBvZiBiYXNlIGNsYXNzIG1ldGhvZHMgdW5sZXNzIGV4cGxpY2l0bHkgYWxsb3dlZC5cbiAgaWYgKFJlYWN0Q2xhc3NNaXhpbi5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuICAgICEoc3BlY1BvbGljeSA9PT0gJ09WRVJSSURFX0JBU0UnKSA/IFwiZGV2ZWxvcG1lbnRcIiAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnUmVhY3RDbGFzc0ludGVyZmFjZTogWW91IGFyZSBhdHRlbXB0aW5nIHRvIG92ZXJyaWRlIGAlc2AgZnJvbSB5b3VyIGNsYXNzIHNwZWNpZmljYXRpb24uIEVuc3VyZSB0aGF0IHlvdXIgbWV0aG9kIG5hbWVzIGRvIG5vdCBvdmVybGFwIHdpdGggUmVhY3QgbWV0aG9kcy4nLCBuYW1lKSA6IF9wcm9kSW52YXJpYW50KCc3MycsIG5hbWUpIDogdm9pZCAwO1xuICB9XG5cbiAgLy8gRGlzYWxsb3cgZGVmaW5pbmcgbWV0aG9kcyBtb3JlIHRoYW4gb25jZSB1bmxlc3MgZXhwbGljaXRseSBhbGxvd2VkLlxuICBpZiAoaXNBbHJlYWR5RGVmaW5lZCkge1xuICAgICEoc3BlY1BvbGljeSA9PT0gJ0RFRklORV9NQU5ZJyB8fCBzcGVjUG9saWN5ID09PSAnREVGSU5FX01BTllfTUVSR0VEJykgPyBcImRldmVsb3BtZW50XCIgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ1JlYWN0Q2xhc3NJbnRlcmZhY2U6IFlvdSBhcmUgYXR0ZW1wdGluZyB0byBkZWZpbmUgYCVzYCBvbiB5b3VyIGNvbXBvbmVudCBtb3JlIHRoYW4gb25jZS4gVGhpcyBjb25mbGljdCBtYXkgYmUgZHVlIHRvIGEgbWl4aW4uJywgbmFtZSkgOiBfcHJvZEludmFyaWFudCgnNzQnLCBuYW1lKSA6IHZvaWQgMDtcbiAgfVxufVxuXG4vKipcbiAqIE1peGluIGhlbHBlciB3aGljaCBoYW5kbGVzIHBvbGljeSB2YWxpZGF0aW9uIGFuZCByZXNlcnZlZFxuICogc3BlY2lmaWNhdGlvbiBrZXlzIHdoZW4gYnVpbGRpbmcgUmVhY3QgY2xhc3Nlcy5cbiAqL1xuZnVuY3Rpb24gbWl4U3BlY0ludG9Db21wb25lbnQoQ29uc3RydWN0b3IsIHNwZWMpIHtcbiAgaWYgKCFzcGVjKSB7XG4gICAgaWYgKFwiZGV2ZWxvcG1lbnRcIiAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICB2YXIgdHlwZW9mU3BlYyA9IHR5cGVvZiBzcGVjO1xuICAgICAgdmFyIGlzTWl4aW5WYWxpZCA9IHR5cGVvZlNwZWMgPT09ICdvYmplY3QnICYmIHNwZWMgIT09IG51bGw7XG5cbiAgICAgIFwiZGV2ZWxvcG1lbnRcIiAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyhpc01peGluVmFsaWQsICclczogWW91XFwncmUgYXR0ZW1wdGluZyB0byBpbmNsdWRlIGEgbWl4aW4gdGhhdCBpcyBlaXRoZXIgbnVsbCAnICsgJ29yIG5vdCBhbiBvYmplY3QuIENoZWNrIHRoZSBtaXhpbnMgaW5jbHVkZWQgYnkgdGhlIGNvbXBvbmVudCwgJyArICdhcyB3ZWxsIGFzIGFueSBtaXhpbnMgdGhleSBpbmNsdWRlIHRoZW1zZWx2ZXMuICcgKyAnRXhwZWN0ZWQgb2JqZWN0IGJ1dCBnb3QgJXMuJywgQ29uc3RydWN0b3IuZGlzcGxheU5hbWUgfHwgJ1JlYWN0Q2xhc3MnLCBzcGVjID09PSBudWxsID8gbnVsbCA6IHR5cGVvZlNwZWMpIDogdm9pZCAwO1xuICAgIH1cblxuICAgIHJldHVybjtcbiAgfVxuXG4gICEodHlwZW9mIHNwZWMgIT09ICdmdW5jdGlvbicpID8gXCJkZXZlbG9wbWVudFwiICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdSZWFjdENsYXNzOiBZb3VcXCdyZSBhdHRlbXB0aW5nIHRvIHVzZSBhIGNvbXBvbmVudCBjbGFzcyBvciBmdW5jdGlvbiBhcyBhIG1peGluLiBJbnN0ZWFkLCBqdXN0IHVzZSBhIHJlZ3VsYXIgb2JqZWN0LicpIDogX3Byb2RJbnZhcmlhbnQoJzc1JykgOiB2b2lkIDA7XG4gICEhUmVhY3RFbGVtZW50LmlzVmFsaWRFbGVtZW50KHNwZWMpID8gXCJkZXZlbG9wbWVudFwiICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdSZWFjdENsYXNzOiBZb3VcXCdyZSBhdHRlbXB0aW5nIHRvIHVzZSBhIGNvbXBvbmVudCBhcyBhIG1peGluLiBJbnN0ZWFkLCBqdXN0IHVzZSBhIHJlZ3VsYXIgb2JqZWN0LicpIDogX3Byb2RJbnZhcmlhbnQoJzc2JykgOiB2b2lkIDA7XG5cbiAgdmFyIHByb3RvID0gQ29uc3RydWN0b3IucHJvdG90eXBlO1xuICB2YXIgYXV0b0JpbmRQYWlycyA9IHByb3RvLl9fcmVhY3RBdXRvQmluZFBhaXJzO1xuXG4gIC8vIEJ5IGhhbmRsaW5nIG1peGlucyBiZWZvcmUgYW55IG90aGVyIHByb3BlcnRpZXMsIHdlIGVuc3VyZSB0aGUgc2FtZVxuICAvLyBjaGFpbmluZyBvcmRlciBpcyBhcHBsaWVkIHRvIG1ldGhvZHMgd2l0aCBERUZJTkVfTUFOWSBwb2xpY3ksIHdoZXRoZXJcbiAgLy8gbWl4aW5zIGFyZSBsaXN0ZWQgYmVmb3JlIG9yIGFmdGVyIHRoZXNlIG1ldGhvZHMgaW4gdGhlIHNwZWMuXG4gIGlmIChzcGVjLmhhc093blByb3BlcnR5KE1JWElOU19LRVkpKSB7XG4gICAgUkVTRVJWRURfU1BFQ19LRVlTLm1peGlucyhDb25zdHJ1Y3Rvciwgc3BlYy5taXhpbnMpO1xuICB9XG5cbiAgZm9yICh2YXIgbmFtZSBpbiBzcGVjKSB7XG4gICAgaWYgKCFzcGVjLmhhc093blByb3BlcnR5KG5hbWUpKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBpZiAobmFtZSA9PT0gTUlYSU5TX0tFWSkge1xuICAgICAgLy8gV2UgaGF2ZSBhbHJlYWR5IGhhbmRsZWQgbWl4aW5zIGluIGEgc3BlY2lhbCBjYXNlIGFib3ZlLlxuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgdmFyIHByb3BlcnR5ID0gc3BlY1tuYW1lXTtcbiAgICB2YXIgaXNBbHJlYWR5RGVmaW5lZCA9IHByb3RvLmhhc093blByb3BlcnR5KG5hbWUpO1xuICAgIHZhbGlkYXRlTWV0aG9kT3ZlcnJpZGUoaXNBbHJlYWR5RGVmaW5lZCwgbmFtZSk7XG5cbiAgICBpZiAoUkVTRVJWRURfU1BFQ19LRVlTLmhhc093blByb3BlcnR5KG5hbWUpKSB7XG4gICAgICBSRVNFUlZFRF9TUEVDX0tFWVNbbmFtZV0oQ29uc3RydWN0b3IsIHByb3BlcnR5KTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gU2V0dXAgbWV0aG9kcyBvbiBwcm90b3R5cGU6XG4gICAgICAvLyBUaGUgZm9sbG93aW5nIG1lbWJlciBtZXRob2RzIHNob3VsZCBub3QgYmUgYXV0b21hdGljYWxseSBib3VuZDpcbiAgICAgIC8vIDEuIEV4cGVjdGVkIFJlYWN0Q2xhc3MgbWV0aG9kcyAoaW4gdGhlIFwiaW50ZXJmYWNlXCIpLlxuICAgICAgLy8gMi4gT3ZlcnJpZGRlbiBtZXRob2RzICh0aGF0IHdlcmUgbWl4ZWQgaW4pLlxuICAgICAgdmFyIGlzUmVhY3RDbGFzc01ldGhvZCA9IFJlYWN0Q2xhc3NJbnRlcmZhY2UuaGFzT3duUHJvcGVydHkobmFtZSk7XG4gICAgICB2YXIgaXNGdW5jdGlvbiA9IHR5cGVvZiBwcm9wZXJ0eSA9PT0gJ2Z1bmN0aW9uJztcbiAgICAgIHZhciBzaG91bGRBdXRvQmluZCA9IGlzRnVuY3Rpb24gJiYgIWlzUmVhY3RDbGFzc01ldGhvZCAmJiAhaXNBbHJlYWR5RGVmaW5lZCAmJiBzcGVjLmF1dG9iaW5kICE9PSBmYWxzZTtcblxuICAgICAgaWYgKHNob3VsZEF1dG9CaW5kKSB7XG4gICAgICAgIGF1dG9CaW5kUGFpcnMucHVzaChuYW1lLCBwcm9wZXJ0eSk7XG4gICAgICAgIHByb3RvW25hbWVdID0gcHJvcGVydHk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoaXNBbHJlYWR5RGVmaW5lZCkge1xuICAgICAgICAgIHZhciBzcGVjUG9saWN5ID0gUmVhY3RDbGFzc0ludGVyZmFjZVtuYW1lXTtcblxuICAgICAgICAgIC8vIFRoZXNlIGNhc2VzIHNob3VsZCBhbHJlYWR5IGJlIGNhdWdodCBieSB2YWxpZGF0ZU1ldGhvZE92ZXJyaWRlLlxuICAgICAgICAgICEoaXNSZWFjdENsYXNzTWV0aG9kICYmIChzcGVjUG9saWN5ID09PSAnREVGSU5FX01BTllfTUVSR0VEJyB8fCBzcGVjUG9saWN5ID09PSAnREVGSU5FX01BTlknKSkgPyBcImRldmVsb3BtZW50XCIgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ1JlYWN0Q2xhc3M6IFVuZXhwZWN0ZWQgc3BlYyBwb2xpY3kgJXMgZm9yIGtleSAlcyB3aGVuIG1peGluZyBpbiBjb21wb25lbnQgc3BlY3MuJywgc3BlY1BvbGljeSwgbmFtZSkgOiBfcHJvZEludmFyaWFudCgnNzcnLCBzcGVjUG9saWN5LCBuYW1lKSA6IHZvaWQgMDtcblxuICAgICAgICAgIC8vIEZvciBtZXRob2RzIHdoaWNoIGFyZSBkZWZpbmVkIG1vcmUgdGhhbiBvbmNlLCBjYWxsIHRoZSBleGlzdGluZ1xuICAgICAgICAgIC8vIG1ldGhvZHMgYmVmb3JlIGNhbGxpbmcgdGhlIG5ldyBwcm9wZXJ0eSwgbWVyZ2luZyBpZiBhcHByb3ByaWF0ZS5cbiAgICAgICAgICBpZiAoc3BlY1BvbGljeSA9PT0gJ0RFRklORV9NQU5ZX01FUkdFRCcpIHtcbiAgICAgICAgICAgIHByb3RvW25hbWVdID0gY3JlYXRlTWVyZ2VkUmVzdWx0RnVuY3Rpb24ocHJvdG9bbmFtZV0sIHByb3BlcnR5KTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHNwZWNQb2xpY3kgPT09ICdERUZJTkVfTUFOWScpIHtcbiAgICAgICAgICAgIHByb3RvW25hbWVdID0gY3JlYXRlQ2hhaW5lZEZ1bmN0aW9uKHByb3RvW25hbWVdLCBwcm9wZXJ0eSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHByb3RvW25hbWVdID0gcHJvcGVydHk7XG4gICAgICAgICAgaWYgKFwiZGV2ZWxvcG1lbnRcIiAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgICAgICAvLyBBZGQgdmVyYm9zZSBkaXNwbGF5TmFtZSB0byB0aGUgZnVuY3Rpb24sIHdoaWNoIGhlbHBzIHdoZW4gbG9va2luZ1xuICAgICAgICAgICAgLy8gYXQgcHJvZmlsaW5nIHRvb2xzLlxuICAgICAgICAgICAgaWYgKHR5cGVvZiBwcm9wZXJ0eSA9PT0gJ2Z1bmN0aW9uJyAmJiBzcGVjLmRpc3BsYXlOYW1lKSB7XG4gICAgICAgICAgICAgIHByb3RvW25hbWVdLmRpc3BsYXlOYW1lID0gc3BlYy5kaXNwbGF5TmFtZSArICdfJyArIG5hbWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIG1peFN0YXRpY1NwZWNJbnRvQ29tcG9uZW50KENvbnN0cnVjdG9yLCBzdGF0aWNzKSB7XG4gIGlmICghc3RhdGljcykge1xuICAgIHJldHVybjtcbiAgfVxuICBmb3IgKHZhciBuYW1lIGluIHN0YXRpY3MpIHtcbiAgICB2YXIgcHJvcGVydHkgPSBzdGF0aWNzW25hbWVdO1xuICAgIGlmICghc3RhdGljcy5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgdmFyIGlzUmVzZXJ2ZWQgPSBuYW1lIGluIFJFU0VSVkVEX1NQRUNfS0VZUztcbiAgICAhIWlzUmVzZXJ2ZWQgPyBcImRldmVsb3BtZW50XCIgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ1JlYWN0Q2xhc3M6IFlvdSBhcmUgYXR0ZW1wdGluZyB0byBkZWZpbmUgYSByZXNlcnZlZCBwcm9wZXJ0eSwgYCVzYCwgdGhhdCBzaG91bGRuXFwndCBiZSBvbiB0aGUgXCJzdGF0aWNzXCIga2V5LiBEZWZpbmUgaXQgYXMgYW4gaW5zdGFuY2UgcHJvcGVydHkgaW5zdGVhZDsgaXQgd2lsbCBzdGlsbCBiZSBhY2Nlc3NpYmxlIG9uIHRoZSBjb25zdHJ1Y3Rvci4nLCBuYW1lKSA6IF9wcm9kSW52YXJpYW50KCc3OCcsIG5hbWUpIDogdm9pZCAwO1xuXG4gICAgdmFyIGlzSW5oZXJpdGVkID0gbmFtZSBpbiBDb25zdHJ1Y3RvcjtcbiAgICAhIWlzSW5oZXJpdGVkID8gXCJkZXZlbG9wbWVudFwiICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdSZWFjdENsYXNzOiBZb3UgYXJlIGF0dGVtcHRpbmcgdG8gZGVmaW5lIGAlc2Agb24geW91ciBjb21wb25lbnQgbW9yZSB0aGFuIG9uY2UuIFRoaXMgY29uZmxpY3QgbWF5IGJlIGR1ZSB0byBhIG1peGluLicsIG5hbWUpIDogX3Byb2RJbnZhcmlhbnQoJzc5JywgbmFtZSkgOiB2b2lkIDA7XG4gICAgQ29uc3RydWN0b3JbbmFtZV0gPSBwcm9wZXJ0eTtcbiAgfVxufVxuXG4vKipcbiAqIE1lcmdlIHR3byBvYmplY3RzLCBidXQgdGhyb3cgaWYgYm90aCBjb250YWluIHRoZSBzYW1lIGtleS5cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gb25lIFRoZSBmaXJzdCBvYmplY3QsIHdoaWNoIGlzIG11dGF0ZWQuXG4gKiBAcGFyYW0ge29iamVjdH0gdHdvIFRoZSBzZWNvbmQgb2JqZWN0XG4gKiBAcmV0dXJuIHtvYmplY3R9IG9uZSBhZnRlciBpdCBoYXMgYmVlbiBtdXRhdGVkIHRvIGNvbnRhaW4gZXZlcnl0aGluZyBpbiB0d28uXG4gKi9cbmZ1bmN0aW9uIG1lcmdlSW50b1dpdGhOb0R1cGxpY2F0ZUtleXMob25lLCB0d28pIHtcbiAgIShvbmUgJiYgdHdvICYmIHR5cGVvZiBvbmUgPT09ICdvYmplY3QnICYmIHR5cGVvZiB0d28gPT09ICdvYmplY3QnKSA/IFwiZGV2ZWxvcG1lbnRcIiAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnbWVyZ2VJbnRvV2l0aE5vRHVwbGljYXRlS2V5cygpOiBDYW5ub3QgbWVyZ2Ugbm9uLW9iamVjdHMuJykgOiBfcHJvZEludmFyaWFudCgnODAnKSA6IHZvaWQgMDtcblxuICBmb3IgKHZhciBrZXkgaW4gdHdvKSB7XG4gICAgaWYgKHR3by5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAhKG9uZVtrZXldID09PSB1bmRlZmluZWQpID8gXCJkZXZlbG9wbWVudFwiICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdtZXJnZUludG9XaXRoTm9EdXBsaWNhdGVLZXlzKCk6IFRyaWVkIHRvIG1lcmdlIHR3byBvYmplY3RzIHdpdGggdGhlIHNhbWUga2V5OiBgJXNgLiBUaGlzIGNvbmZsaWN0IG1heSBiZSBkdWUgdG8gYSBtaXhpbjsgaW4gcGFydGljdWxhciwgdGhpcyBtYXkgYmUgY2F1c2VkIGJ5IHR3byBnZXRJbml0aWFsU3RhdGUoKSBvciBnZXREZWZhdWx0UHJvcHMoKSBtZXRob2RzIHJldHVybmluZyBvYmplY3RzIHdpdGggY2xhc2hpbmcga2V5cy4nLCBrZXkpIDogX3Byb2RJbnZhcmlhbnQoJzgxJywga2V5KSA6IHZvaWQgMDtcbiAgICAgIG9uZVtrZXldID0gdHdvW2tleV07XG4gICAgfVxuICB9XG4gIHJldHVybiBvbmU7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIGZ1bmN0aW9uIHRoYXQgaW52b2tlcyB0d28gZnVuY3Rpb25zIGFuZCBtZXJnZXMgdGhlaXIgcmV0dXJuIHZhbHVlcy5cbiAqXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBvbmUgRnVuY3Rpb24gdG8gaW52b2tlIGZpcnN0LlxuICogQHBhcmFtIHtmdW5jdGlvbn0gdHdvIEZ1bmN0aW9uIHRvIGludm9rZSBzZWNvbmQuXG4gKiBAcmV0dXJuIHtmdW5jdGlvbn0gRnVuY3Rpb24gdGhhdCBpbnZva2VzIHRoZSB0d28gYXJndW1lbnQgZnVuY3Rpb25zLlxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gY3JlYXRlTWVyZ2VkUmVzdWx0RnVuY3Rpb24ob25lLCB0d28pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIG1lcmdlZFJlc3VsdCgpIHtcbiAgICB2YXIgYSA9IG9uZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIHZhciBiID0gdHdvLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgaWYgKGEgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIGI7XG4gICAgfSBlbHNlIGlmIChiID09IG51bGwpIHtcbiAgICAgIHJldHVybiBhO1xuICAgIH1cbiAgICB2YXIgYyA9IHt9O1xuICAgIG1lcmdlSW50b1dpdGhOb0R1cGxpY2F0ZUtleXMoYywgYSk7XG4gICAgbWVyZ2VJbnRvV2l0aE5vRHVwbGljYXRlS2V5cyhjLCBiKTtcbiAgICByZXR1cm4gYztcbiAgfTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgZnVuY3Rpb24gdGhhdCBpbnZva2VzIHR3byBmdW5jdGlvbnMgYW5kIGlnbm9yZXMgdGhlaXIgcmV0dXJuIHZhbGVzLlxuICpcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IG9uZSBGdW5jdGlvbiB0byBpbnZva2UgZmlyc3QuXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSB0d28gRnVuY3Rpb24gdG8gaW52b2tlIHNlY29uZC5cbiAqIEByZXR1cm4ge2Z1bmN0aW9ufSBGdW5jdGlvbiB0aGF0IGludm9rZXMgdGhlIHR3byBhcmd1bWVudCBmdW5jdGlvbnMuXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBjcmVhdGVDaGFpbmVkRnVuY3Rpb24ob25lLCB0d28pIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIGNoYWluZWRGdW5jdGlvbigpIHtcbiAgICBvbmUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB0d28uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgfTtcbn1cblxuLyoqXG4gKiBCaW5kcyBhIG1ldGhvZCB0byB0aGUgY29tcG9uZW50LlxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBjb21wb25lbnQgQ29tcG9uZW50IHdob3NlIG1ldGhvZCBpcyBnb2luZyB0byBiZSBib3VuZC5cbiAqIEBwYXJhbSB7ZnVuY3Rpb259IG1ldGhvZCBNZXRob2QgdG8gYmUgYm91bmQuXG4gKiBAcmV0dXJuIHtmdW5jdGlvbn0gVGhlIGJvdW5kIG1ldGhvZC5cbiAqL1xuZnVuY3Rpb24gYmluZEF1dG9CaW5kTWV0aG9kKGNvbXBvbmVudCwgbWV0aG9kKSB7XG4gIHZhciBib3VuZE1ldGhvZCA9IG1ldGhvZC5iaW5kKGNvbXBvbmVudCk7XG4gIGlmIChcImRldmVsb3BtZW50XCIgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIGJvdW5kTWV0aG9kLl9fcmVhY3RCb3VuZENvbnRleHQgPSBjb21wb25lbnQ7XG4gICAgYm91bmRNZXRob2QuX19yZWFjdEJvdW5kTWV0aG9kID0gbWV0aG9kO1xuICAgIGJvdW5kTWV0aG9kLl9fcmVhY3RCb3VuZEFyZ3VtZW50cyA9IG51bGw7XG4gICAgdmFyIGNvbXBvbmVudE5hbWUgPSBjb21wb25lbnQuY29uc3RydWN0b3IuZGlzcGxheU5hbWU7XG4gICAgdmFyIF9iaW5kID0gYm91bmRNZXRob2QuYmluZDtcbiAgICBib3VuZE1ldGhvZC5iaW5kID0gZnVuY3Rpb24gKG5ld1RoaXMpIHtcbiAgICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gQXJyYXkoX2xlbiA+IDEgPyBfbGVuIC0gMSA6IDApLCBfa2V5ID0gMTsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgICBhcmdzW19rZXkgLSAxXSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICAgIH1cblxuICAgICAgLy8gVXNlciBpcyB0cnlpbmcgdG8gYmluZCgpIGFuIGF1dG9ib3VuZCBtZXRob2Q7IHdlIGVmZmVjdGl2ZWx5IHdpbGxcbiAgICAgIC8vIGlnbm9yZSB0aGUgdmFsdWUgb2YgXCJ0aGlzXCIgdGhhdCB0aGUgdXNlciBpcyB0cnlpbmcgdG8gdXNlLCBzb1xuICAgICAgLy8gbGV0J3Mgd2Fybi5cbiAgICAgIGlmIChuZXdUaGlzICE9PSBjb21wb25lbnQgJiYgbmV3VGhpcyAhPT0gbnVsbCkge1xuICAgICAgICBcImRldmVsb3BtZW50XCIgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoZmFsc2UsICdiaW5kKCk6IFJlYWN0IGNvbXBvbmVudCBtZXRob2RzIG1heSBvbmx5IGJlIGJvdW5kIHRvIHRoZSAnICsgJ2NvbXBvbmVudCBpbnN0YW5jZS4gU2VlICVzJywgY29tcG9uZW50TmFtZSkgOiB2b2lkIDA7XG4gICAgICB9IGVsc2UgaWYgKCFhcmdzLmxlbmd0aCkge1xuICAgICAgICBcImRldmVsb3BtZW50XCIgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoZmFsc2UsICdiaW5kKCk6IFlvdSBhcmUgYmluZGluZyBhIGNvbXBvbmVudCBtZXRob2QgdG8gdGhlIGNvbXBvbmVudC4gJyArICdSZWFjdCBkb2VzIHRoaXMgZm9yIHlvdSBhdXRvbWF0aWNhbGx5IGluIGEgaGlnaC1wZXJmb3JtYW5jZSAnICsgJ3dheSwgc28geW91IGNhbiBzYWZlbHkgcmVtb3ZlIHRoaXMgY2FsbC4gU2VlICVzJywgY29tcG9uZW50TmFtZSkgOiB2b2lkIDA7XG4gICAgICAgIHJldHVybiBib3VuZE1ldGhvZDtcbiAgICAgIH1cbiAgICAgIHZhciByZWJvdW5kTWV0aG9kID0gX2JpbmQuYXBwbHkoYm91bmRNZXRob2QsIGFyZ3VtZW50cyk7XG4gICAgICByZWJvdW5kTWV0aG9kLl9fcmVhY3RCb3VuZENvbnRleHQgPSBjb21wb25lbnQ7XG4gICAgICByZWJvdW5kTWV0aG9kLl9fcmVhY3RCb3VuZE1ldGhvZCA9IG1ldGhvZDtcbiAgICAgIHJlYm91bmRNZXRob2QuX19yZWFjdEJvdW5kQXJndW1lbnRzID0gYXJncztcbiAgICAgIHJldHVybiByZWJvdW5kTWV0aG9kO1xuICAgIH07XG4gIH1cbiAgcmV0dXJuIGJvdW5kTWV0aG9kO1xufVxuXG4vKipcbiAqIEJpbmRzIGFsbCBhdXRvLWJvdW5kIG1ldGhvZHMgaW4gYSBjb21wb25lbnQuXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IGNvbXBvbmVudCBDb21wb25lbnQgd2hvc2UgbWV0aG9kIGlzIGdvaW5nIHRvIGJlIGJvdW5kLlxuICovXG5mdW5jdGlvbiBiaW5kQXV0b0JpbmRNZXRob2RzKGNvbXBvbmVudCkge1xuICB2YXIgcGFpcnMgPSBjb21wb25lbnQuX19yZWFjdEF1dG9CaW5kUGFpcnM7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcGFpcnMubGVuZ3RoOyBpICs9IDIpIHtcbiAgICB2YXIgYXV0b0JpbmRLZXkgPSBwYWlyc1tpXTtcbiAgICB2YXIgbWV0aG9kID0gcGFpcnNbaSArIDFdO1xuICAgIGNvbXBvbmVudFthdXRvQmluZEtleV0gPSBiaW5kQXV0b0JpbmRNZXRob2QoY29tcG9uZW50LCBtZXRob2QpO1xuICB9XG59XG5cbi8qKlxuICogQWRkIG1vcmUgdG8gdGhlIFJlYWN0Q2xhc3MgYmFzZSBjbGFzcy4gVGhlc2UgYXJlIGFsbCBsZWdhY3kgZmVhdHVyZXMgYW5kXG4gKiB0aGVyZWZvcmUgbm90IGFscmVhZHkgcGFydCBvZiB0aGUgbW9kZXJuIFJlYWN0Q29tcG9uZW50LlxuICovXG52YXIgUmVhY3RDbGFzc01peGluID0ge1xuXG4gIC8qKlxuICAgKiBUT0RPOiBUaGlzIHdpbGwgYmUgZGVwcmVjYXRlZCBiZWNhdXNlIHN0YXRlIHNob3VsZCBhbHdheXMga2VlcCBhIGNvbnNpc3RlbnRcbiAgICogdHlwZSBzaWduYXR1cmUgYW5kIHRoZSBvbmx5IHVzZSBjYXNlIGZvciB0aGlzLCBpcyB0byBhdm9pZCB0aGF0LlxuICAgKi9cbiAgcmVwbGFjZVN0YXRlOiBmdW5jdGlvbiAobmV3U3RhdGUsIGNhbGxiYWNrKSB7XG4gICAgdGhpcy51cGRhdGVyLmVucXVldWVSZXBsYWNlU3RhdGUodGhpcywgbmV3U3RhdGUpO1xuICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgdGhpcy51cGRhdGVyLmVucXVldWVDYWxsYmFjayh0aGlzLCBjYWxsYmFjaywgJ3JlcGxhY2VTdGF0ZScpO1xuICAgIH1cbiAgfSxcblxuICAvKipcbiAgICogQ2hlY2tzIHdoZXRoZXIgb3Igbm90IHRoaXMgY29tcG9zaXRlIGNvbXBvbmVudCBpcyBtb3VudGVkLlxuICAgKiBAcmV0dXJuIHtib29sZWFufSBUcnVlIGlmIG1vdW50ZWQsIGZhbHNlIG90aGVyd2lzZS5cbiAgICogQHByb3RlY3RlZFxuICAgKiBAZmluYWxcbiAgICovXG4gIGlzTW91bnRlZDogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLnVwZGF0ZXIuaXNNb3VudGVkKHRoaXMpO1xuICB9XG59O1xuXG52YXIgUmVhY3RDbGFzc0NvbXBvbmVudCA9IGZ1bmN0aW9uICgpIHt9O1xuX2Fzc2lnbihSZWFjdENsYXNzQ29tcG9uZW50LnByb3RvdHlwZSwgUmVhY3RDb21wb25lbnQucHJvdG90eXBlLCBSZWFjdENsYXNzTWl4aW4pO1xuXG4vKipcbiAqIE1vZHVsZSBmb3IgY3JlYXRpbmcgY29tcG9zaXRlIGNvbXBvbmVudHMuXG4gKlxuICogQGNsYXNzIFJlYWN0Q2xhc3NcbiAqL1xudmFyIFJlYWN0Q2xhc3MgPSB7XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBjb21wb3NpdGUgY29tcG9uZW50IGNsYXNzIGdpdmVuIGEgY2xhc3Mgc3BlY2lmaWNhdGlvbi5cbiAgICogU2VlIGh0dHBzOi8vZmFjZWJvb2suZ2l0aHViLmlvL3JlYWN0L2RvY3MvdG9wLWxldmVsLWFwaS5odG1sI3JlYWN0LmNyZWF0ZWNsYXNzXG4gICAqXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBzcGVjIENsYXNzIHNwZWNpZmljYXRpb24gKHdoaWNoIG11c3QgZGVmaW5lIGByZW5kZXJgKS5cbiAgICogQHJldHVybiB7ZnVuY3Rpb259IENvbXBvbmVudCBjb25zdHJ1Y3RvciBmdW5jdGlvbi5cbiAgICogQHB1YmxpY1xuICAgKi9cbiAgY3JlYXRlQ2xhc3M6IGZ1bmN0aW9uIChzcGVjKSB7XG4gICAgLy8gVG8ga2VlcCBvdXIgd2FybmluZ3MgbW9yZSB1bmRlcnN0YW5kYWJsZSwgd2UnbGwgdXNlIGEgbGl0dGxlIGhhY2sgaGVyZSB0b1xuICAgIC8vIGVuc3VyZSB0aGF0IENvbnN0cnVjdG9yLm5hbWUgIT09ICdDb25zdHJ1Y3RvcicuIFRoaXMgbWFrZXMgc3VyZSB3ZSBkb24ndFxuICAgIC8vIHVubmVjZXNzYXJpbHkgaWRlbnRpZnkgYSBjbGFzcyB3aXRob3V0IGRpc3BsYXlOYW1lIGFzICdDb25zdHJ1Y3RvcicuXG4gICAgdmFyIENvbnN0cnVjdG9yID0gaWRlbnRpdHkoZnVuY3Rpb24gKHByb3BzLCBjb250ZXh0LCB1cGRhdGVyKSB7XG4gICAgICAvLyBUaGlzIGNvbnN0cnVjdG9yIGdldHMgb3ZlcnJpZGRlbiBieSBtb2Nrcy4gVGhlIGFyZ3VtZW50IGlzIHVzZWRcbiAgICAgIC8vIGJ5IG1vY2tzIHRvIGFzc2VydCBvbiB3aGF0IGdldHMgbW91bnRlZC5cblxuICAgICAgaWYgKFwiZGV2ZWxvcG1lbnRcIiAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgIFwiZGV2ZWxvcG1lbnRcIiAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyh0aGlzIGluc3RhbmNlb2YgQ29uc3RydWN0b3IsICdTb21ldGhpbmcgaXMgY2FsbGluZyBhIFJlYWN0IGNvbXBvbmVudCBkaXJlY3RseS4gVXNlIGEgZmFjdG9yeSBvciAnICsgJ0pTWCBpbnN0ZWFkLiBTZWU6IGh0dHBzOi8vZmIubWUvcmVhY3QtbGVnYWN5ZmFjdG9yeScpIDogdm9pZCAwO1xuICAgICAgfVxuXG4gICAgICAvLyBXaXJlIHVwIGF1dG8tYmluZGluZ1xuICAgICAgaWYgKHRoaXMuX19yZWFjdEF1dG9CaW5kUGFpcnMubGVuZ3RoKSB7XG4gICAgICAgIGJpbmRBdXRvQmluZE1ldGhvZHModGhpcyk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMucHJvcHMgPSBwcm9wcztcbiAgICAgIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG4gICAgICB0aGlzLnJlZnMgPSBlbXB0eU9iamVjdDtcbiAgICAgIHRoaXMudXBkYXRlciA9IHVwZGF0ZXIgfHwgUmVhY3ROb29wVXBkYXRlUXVldWU7XG5cbiAgICAgIHRoaXMuc3RhdGUgPSBudWxsO1xuXG4gICAgICAvLyBSZWFjdENsYXNzZXMgZG9lc24ndCBoYXZlIGNvbnN0cnVjdG9ycy4gSW5zdGVhZCwgdGhleSB1c2UgdGhlXG4gICAgICAvLyBnZXRJbml0aWFsU3RhdGUgYW5kIGNvbXBvbmVudFdpbGxNb3VudCBtZXRob2RzIGZvciBpbml0aWFsaXphdGlvbi5cblxuICAgICAgdmFyIGluaXRpYWxTdGF0ZSA9IHRoaXMuZ2V0SW5pdGlhbFN0YXRlID8gdGhpcy5nZXRJbml0aWFsU3RhdGUoKSA6IG51bGw7XG4gICAgICBpZiAoXCJkZXZlbG9wbWVudFwiICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgLy8gV2UgYWxsb3cgYXV0by1tb2NrcyB0byBwcm9jZWVkIGFzIGlmIHRoZXkncmUgcmV0dXJuaW5nIG51bGwuXG4gICAgICAgIGlmIChpbml0aWFsU3RhdGUgPT09IHVuZGVmaW5lZCAmJiB0aGlzLmdldEluaXRpYWxTdGF0ZS5faXNNb2NrRnVuY3Rpb24pIHtcbiAgICAgICAgICAvLyBUaGlzIGlzIHByb2JhYmx5IGJhZCBwcmFjdGljZS4gQ29uc2lkZXIgd2FybmluZyBoZXJlIGFuZFxuICAgICAgICAgIC8vIGRlcHJlY2F0aW5nIHRoaXMgY29udmVuaWVuY2UuXG4gICAgICAgICAgaW5pdGlhbFN0YXRlID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgISh0eXBlb2YgaW5pdGlhbFN0YXRlID09PSAnb2JqZWN0JyAmJiAhQXJyYXkuaXNBcnJheShpbml0aWFsU3RhdGUpKSA/IFwiZGV2ZWxvcG1lbnRcIiAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnJXMuZ2V0SW5pdGlhbFN0YXRlKCk6IG11c3QgcmV0dXJuIGFuIG9iamVjdCBvciBudWxsJywgQ29uc3RydWN0b3IuZGlzcGxheU5hbWUgfHwgJ1JlYWN0Q29tcG9zaXRlQ29tcG9uZW50JykgOiBfcHJvZEludmFyaWFudCgnODInLCBDb25zdHJ1Y3Rvci5kaXNwbGF5TmFtZSB8fCAnUmVhY3RDb21wb3NpdGVDb21wb25lbnQnKSA6IHZvaWQgMDtcblxuICAgICAgdGhpcy5zdGF0ZSA9IGluaXRpYWxTdGF0ZTtcbiAgICB9KTtcbiAgICBDb25zdHJ1Y3Rvci5wcm90b3R5cGUgPSBuZXcgUmVhY3RDbGFzc0NvbXBvbmVudCgpO1xuICAgIENvbnN0cnVjdG9yLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IENvbnN0cnVjdG9yO1xuICAgIENvbnN0cnVjdG9yLnByb3RvdHlwZS5fX3JlYWN0QXV0b0JpbmRQYWlycyA9IFtdO1xuXG4gICAgaW5qZWN0ZWRNaXhpbnMuZm9yRWFjaChtaXhTcGVjSW50b0NvbXBvbmVudC5iaW5kKG51bGwsIENvbnN0cnVjdG9yKSk7XG5cbiAgICBtaXhTcGVjSW50b0NvbXBvbmVudChDb25zdHJ1Y3Rvciwgc3BlYyk7XG5cbiAgICAvLyBJbml0aWFsaXplIHRoZSBkZWZhdWx0UHJvcHMgcHJvcGVydHkgYWZ0ZXIgYWxsIG1peGlucyBoYXZlIGJlZW4gbWVyZ2VkLlxuICAgIGlmIChDb25zdHJ1Y3Rvci5nZXREZWZhdWx0UHJvcHMpIHtcbiAgICAgIENvbnN0cnVjdG9yLmRlZmF1bHRQcm9wcyA9IENvbnN0cnVjdG9yLmdldERlZmF1bHRQcm9wcygpO1xuICAgIH1cblxuICAgIGlmIChcImRldmVsb3BtZW50XCIgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgLy8gVGhpcyBpcyBhIHRhZyB0byBpbmRpY2F0ZSB0aGF0IHRoZSB1c2Ugb2YgdGhlc2UgbWV0aG9kIG5hbWVzIGlzIG9rLFxuICAgICAgLy8gc2luY2UgaXQncyB1c2VkIHdpdGggY3JlYXRlQ2xhc3MuIElmIGl0J3Mgbm90LCB0aGVuIGl0J3MgbGlrZWx5IGFcbiAgICAgIC8vIG1pc3Rha2Ugc28gd2UnbGwgd2FybiB5b3UgdG8gdXNlIHRoZSBzdGF0aWMgcHJvcGVydHksIHByb3BlcnR5XG4gICAgICAvLyBpbml0aWFsaXplciBvciBjb25zdHJ1Y3RvciByZXNwZWN0aXZlbHkuXG4gICAgICBpZiAoQ29uc3RydWN0b3IuZ2V0RGVmYXVsdFByb3BzKSB7XG4gICAgICAgIENvbnN0cnVjdG9yLmdldERlZmF1bHRQcm9wcy5pc1JlYWN0Q2xhc3NBcHByb3ZlZCA9IHt9O1xuICAgICAgfVxuICAgICAgaWYgKENvbnN0cnVjdG9yLnByb3RvdHlwZS5nZXRJbml0aWFsU3RhdGUpIHtcbiAgICAgICAgQ29uc3RydWN0b3IucHJvdG90eXBlLmdldEluaXRpYWxTdGF0ZS5pc1JlYWN0Q2xhc3NBcHByb3ZlZCA9IHt9O1xuICAgICAgfVxuICAgIH1cblxuICAgICFDb25zdHJ1Y3Rvci5wcm90b3R5cGUucmVuZGVyID8gXCJkZXZlbG9wbWVudFwiICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdjcmVhdGVDbGFzcyguLi4pOiBDbGFzcyBzcGVjaWZpY2F0aW9uIG11c3QgaW1wbGVtZW50IGEgYHJlbmRlcmAgbWV0aG9kLicpIDogX3Byb2RJbnZhcmlhbnQoJzgzJykgOiB2b2lkIDA7XG5cbiAgICBpZiAoXCJkZXZlbG9wbWVudFwiICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIFwiZGV2ZWxvcG1lbnRcIiAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyghQ29uc3RydWN0b3IucHJvdG90eXBlLmNvbXBvbmVudFNob3VsZFVwZGF0ZSwgJyVzIGhhcyBhIG1ldGhvZCBjYWxsZWQgJyArICdjb21wb25lbnRTaG91bGRVcGRhdGUoKS4gRGlkIHlvdSBtZWFuIHNob3VsZENvbXBvbmVudFVwZGF0ZSgpPyAnICsgJ1RoZSBuYW1lIGlzIHBocmFzZWQgYXMgYSBxdWVzdGlvbiBiZWNhdXNlIHRoZSBmdW5jdGlvbiBpcyAnICsgJ2V4cGVjdGVkIHRvIHJldHVybiBhIHZhbHVlLicsIHNwZWMuZGlzcGxheU5hbWUgfHwgJ0EgY29tcG9uZW50JykgOiB2b2lkIDA7XG4gICAgICBcImRldmVsb3BtZW50XCIgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoIUNvbnN0cnVjdG9yLnByb3RvdHlwZS5jb21wb25lbnRXaWxsUmVjaWV2ZVByb3BzLCAnJXMgaGFzIGEgbWV0aG9kIGNhbGxlZCAnICsgJ2NvbXBvbmVudFdpbGxSZWNpZXZlUHJvcHMoKS4gRGlkIHlvdSBtZWFuIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMoKT8nLCBzcGVjLmRpc3BsYXlOYW1lIHx8ICdBIGNvbXBvbmVudCcpIDogdm9pZCAwO1xuICAgIH1cblxuICAgIC8vIFJlZHVjZSB0aW1lIHNwZW50IGRvaW5nIGxvb2t1cHMgYnkgc2V0dGluZyB0aGVzZSBvbiB0aGUgcHJvdG90eXBlLlxuICAgIGZvciAodmFyIG1ldGhvZE5hbWUgaW4gUmVhY3RDbGFzc0ludGVyZmFjZSkge1xuICAgICAgaWYgKCFDb25zdHJ1Y3Rvci5wcm90b3R5cGVbbWV0aG9kTmFtZV0pIHtcbiAgICAgICAgQ29uc3RydWN0b3IucHJvdG90eXBlW21ldGhvZE5hbWVdID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gQ29uc3RydWN0b3I7XG4gIH0sXG5cbiAgaW5qZWN0aW9uOiB7XG4gICAgaW5qZWN0TWl4aW46IGZ1bmN0aW9uIChtaXhpbikge1xuICAgICAgaW5qZWN0ZWRNaXhpbnMucHVzaChtaXhpbik7XG4gICAgfVxuICB9XG5cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3RDbGFzczsiLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgX3Byb2RJbnZhcmlhbnQgPSByZXF1aXJlKCcuL3JlYWN0UHJvZEludmFyaWFudCcpO1xuXG52YXIgUmVhY3ROb29wVXBkYXRlUXVldWUgPSByZXF1aXJlKCcuL1JlYWN0Tm9vcFVwZGF0ZVF1ZXVlJyk7XG5cbnZhciBjYW5EZWZpbmVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4vY2FuRGVmaW5lUHJvcGVydHknKTtcbnZhciBlbXB0eU9iamVjdCA9IHJlcXVpcmUoJ2ZianMvbGliL2VtcHR5T2JqZWN0Jyk7XG52YXIgaW52YXJpYW50ID0gcmVxdWlyZSgnZmJqcy9saWIvaW52YXJpYW50Jyk7XG52YXIgd2FybmluZyA9IHJlcXVpcmUoJ2ZianMvbGliL3dhcm5pbmcnKTtcblxuLyoqXG4gKiBCYXNlIGNsYXNzIGhlbHBlcnMgZm9yIHRoZSB1cGRhdGluZyBzdGF0ZSBvZiBhIGNvbXBvbmVudC5cbiAqL1xuZnVuY3Rpb24gUmVhY3RDb21wb25lbnQocHJvcHMsIGNvbnRleHQsIHVwZGF0ZXIpIHtcbiAgdGhpcy5wcm9wcyA9IHByb3BzO1xuICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuICB0aGlzLnJlZnMgPSBlbXB0eU9iamVjdDtcbiAgLy8gV2UgaW5pdGlhbGl6ZSB0aGUgZGVmYXVsdCB1cGRhdGVyIGJ1dCB0aGUgcmVhbCBvbmUgZ2V0cyBpbmplY3RlZCBieSB0aGVcbiAgLy8gcmVuZGVyZXIuXG4gIHRoaXMudXBkYXRlciA9IHVwZGF0ZXIgfHwgUmVhY3ROb29wVXBkYXRlUXVldWU7XG59XG5cblJlYWN0Q29tcG9uZW50LnByb3RvdHlwZS5pc1JlYWN0Q29tcG9uZW50ID0ge307XG5cbi8qKlxuICogU2V0cyBhIHN1YnNldCBvZiB0aGUgc3RhdGUuIEFsd2F5cyB1c2UgdGhpcyB0byBtdXRhdGVcbiAqIHN0YXRlLiBZb3Ugc2hvdWxkIHRyZWF0IGB0aGlzLnN0YXRlYCBhcyBpbW11dGFibGUuXG4gKlxuICogVGhlcmUgaXMgbm8gZ3VhcmFudGVlIHRoYXQgYHRoaXMuc3RhdGVgIHdpbGwgYmUgaW1tZWRpYXRlbHkgdXBkYXRlZCwgc29cbiAqIGFjY2Vzc2luZyBgdGhpcy5zdGF0ZWAgYWZ0ZXIgY2FsbGluZyB0aGlzIG1ldGhvZCBtYXkgcmV0dXJuIHRoZSBvbGQgdmFsdWUuXG4gKlxuICogVGhlcmUgaXMgbm8gZ3VhcmFudGVlIHRoYXQgY2FsbHMgdG8gYHNldFN0YXRlYCB3aWxsIHJ1biBzeW5jaHJvbm91c2x5LFxuICogYXMgdGhleSBtYXkgZXZlbnR1YWxseSBiZSBiYXRjaGVkIHRvZ2V0aGVyLiAgWW91IGNhbiBwcm92aWRlIGFuIG9wdGlvbmFsXG4gKiBjYWxsYmFjayB0aGF0IHdpbGwgYmUgZXhlY3V0ZWQgd2hlbiB0aGUgY2FsbCB0byBzZXRTdGF0ZSBpcyBhY3R1YWxseVxuICogY29tcGxldGVkLlxuICpcbiAqIFdoZW4gYSBmdW5jdGlvbiBpcyBwcm92aWRlZCB0byBzZXRTdGF0ZSwgaXQgd2lsbCBiZSBjYWxsZWQgYXQgc29tZSBwb2ludCBpblxuICogdGhlIGZ1dHVyZSAobm90IHN5bmNocm9ub3VzbHkpLiBJdCB3aWxsIGJlIGNhbGxlZCB3aXRoIHRoZSB1cCB0byBkYXRlXG4gKiBjb21wb25lbnQgYXJndW1lbnRzIChzdGF0ZSwgcHJvcHMsIGNvbnRleHQpLiBUaGVzZSB2YWx1ZXMgY2FuIGJlIGRpZmZlcmVudFxuICogZnJvbSB0aGlzLiogYmVjYXVzZSB5b3VyIGZ1bmN0aW9uIG1heSBiZSBjYWxsZWQgYWZ0ZXIgcmVjZWl2ZVByb3BzIGJ1dCBiZWZvcmVcbiAqIHNob3VsZENvbXBvbmVudFVwZGF0ZSwgYW5kIHRoaXMgbmV3IHN0YXRlLCBwcm9wcywgYW5kIGNvbnRleHQgd2lsbCBub3QgeWV0IGJlXG4gKiBhc3NpZ25lZCB0byB0aGlzLlxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fGZ1bmN0aW9ufSBwYXJ0aWFsU3RhdGUgTmV4dCBwYXJ0aWFsIHN0YXRlIG9yIGZ1bmN0aW9uIHRvXG4gKiAgICAgICAgcHJvZHVjZSBuZXh0IHBhcnRpYWwgc3RhdGUgdG8gYmUgbWVyZ2VkIHdpdGggY3VycmVudCBzdGF0ZS5cbiAqIEBwYXJhbSB7P2Z1bmN0aW9ufSBjYWxsYmFjayBDYWxsZWQgYWZ0ZXIgc3RhdGUgaXMgdXBkYXRlZC5cbiAqIEBmaW5hbFxuICogQHByb3RlY3RlZFxuICovXG5SZWFjdENvbXBvbmVudC5wcm90b3R5cGUuc2V0U3RhdGUgPSBmdW5jdGlvbiAocGFydGlhbFN0YXRlLCBjYWxsYmFjaykge1xuICAhKHR5cGVvZiBwYXJ0aWFsU3RhdGUgPT09ICdvYmplY3QnIHx8IHR5cGVvZiBwYXJ0aWFsU3RhdGUgPT09ICdmdW5jdGlvbicgfHwgcGFydGlhbFN0YXRlID09IG51bGwpID8gXCJkZXZlbG9wbWVudFwiICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdzZXRTdGF0ZSguLi4pOiB0YWtlcyBhbiBvYmplY3Qgb2Ygc3RhdGUgdmFyaWFibGVzIHRvIHVwZGF0ZSBvciBhIGZ1bmN0aW9uIHdoaWNoIHJldHVybnMgYW4gb2JqZWN0IG9mIHN0YXRlIHZhcmlhYmxlcy4nKSA6IF9wcm9kSW52YXJpYW50KCc4NScpIDogdm9pZCAwO1xuICB0aGlzLnVwZGF0ZXIuZW5xdWV1ZVNldFN0YXRlKHRoaXMsIHBhcnRpYWxTdGF0ZSk7XG4gIGlmIChjYWxsYmFjaykge1xuICAgIHRoaXMudXBkYXRlci5lbnF1ZXVlQ2FsbGJhY2sodGhpcywgY2FsbGJhY2ssICdzZXRTdGF0ZScpO1xuICB9XG59O1xuXG4vKipcbiAqIEZvcmNlcyBhbiB1cGRhdGUuIFRoaXMgc2hvdWxkIG9ubHkgYmUgaW52b2tlZCB3aGVuIGl0IGlzIGtub3duIHdpdGhcbiAqIGNlcnRhaW50eSB0aGF0IHdlIGFyZSAqKm5vdCoqIGluIGEgRE9NIHRyYW5zYWN0aW9uLlxuICpcbiAqIFlvdSBtYXkgd2FudCB0byBjYWxsIHRoaXMgd2hlbiB5b3Uga25vdyB0aGF0IHNvbWUgZGVlcGVyIGFzcGVjdCBvZiB0aGVcbiAqIGNvbXBvbmVudCdzIHN0YXRlIGhhcyBjaGFuZ2VkIGJ1dCBgc2V0U3RhdGVgIHdhcyBub3QgY2FsbGVkLlxuICpcbiAqIFRoaXMgd2lsbCBub3QgaW52b2tlIGBzaG91bGRDb21wb25lbnRVcGRhdGVgLCBidXQgaXQgd2lsbCBpbnZva2VcbiAqIGBjb21wb25lbnRXaWxsVXBkYXRlYCBhbmQgYGNvbXBvbmVudERpZFVwZGF0ZWAuXG4gKlxuICogQHBhcmFtIHs/ZnVuY3Rpb259IGNhbGxiYWNrIENhbGxlZCBhZnRlciB1cGRhdGUgaXMgY29tcGxldGUuXG4gKiBAZmluYWxcbiAqIEBwcm90ZWN0ZWRcbiAqL1xuUmVhY3RDb21wb25lbnQucHJvdG90eXBlLmZvcmNlVXBkYXRlID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gIHRoaXMudXBkYXRlci5lbnF1ZXVlRm9yY2VVcGRhdGUodGhpcyk7XG4gIGlmIChjYWxsYmFjaykge1xuICAgIHRoaXMudXBkYXRlci5lbnF1ZXVlQ2FsbGJhY2sodGhpcywgY2FsbGJhY2ssICdmb3JjZVVwZGF0ZScpO1xuICB9XG59O1xuXG4vKipcbiAqIERlcHJlY2F0ZWQgQVBJcy4gVGhlc2UgQVBJcyB1c2VkIHRvIGV4aXN0IG9uIGNsYXNzaWMgUmVhY3QgY2xhc3NlcyBidXQgc2luY2VcbiAqIHdlIHdvdWxkIGxpa2UgdG8gZGVwcmVjYXRlIHRoZW0sIHdlJ3JlIG5vdCBnb2luZyB0byBtb3ZlIHRoZW0gb3ZlciB0byB0aGlzXG4gKiBtb2Rlcm4gYmFzZSBjbGFzcy4gSW5zdGVhZCwgd2UgZGVmaW5lIGEgZ2V0dGVyIHRoYXQgd2FybnMgaWYgaXQncyBhY2Nlc3NlZC5cbiAqL1xuaWYgKFwiZGV2ZWxvcG1lbnRcIiAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIHZhciBkZXByZWNhdGVkQVBJcyA9IHtcbiAgICBpc01vdW50ZWQ6IFsnaXNNb3VudGVkJywgJ0luc3RlYWQsIG1ha2Ugc3VyZSB0byBjbGVhbiB1cCBzdWJzY3JpcHRpb25zIGFuZCBwZW5kaW5nIHJlcXVlc3RzIGluICcgKyAnY29tcG9uZW50V2lsbFVubW91bnQgdG8gcHJldmVudCBtZW1vcnkgbGVha3MuJ10sXG4gICAgcmVwbGFjZVN0YXRlOiBbJ3JlcGxhY2VTdGF0ZScsICdSZWZhY3RvciB5b3VyIGNvZGUgdG8gdXNlIHNldFN0YXRlIGluc3RlYWQgKHNlZSAnICsgJ2h0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9yZWFjdC9pc3N1ZXMvMzIzNikuJ11cbiAgfTtcbiAgdmFyIGRlZmluZURlcHJlY2F0aW9uV2FybmluZyA9IGZ1bmN0aW9uIChtZXRob2ROYW1lLCBpbmZvKSB7XG4gICAgaWYgKGNhbkRlZmluZVByb3BlcnR5KSB7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoUmVhY3RDb21wb25lbnQucHJvdG90eXBlLCBtZXRob2ROYW1lLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgIFwiZGV2ZWxvcG1lbnRcIiAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyhmYWxzZSwgJyVzKC4uLikgaXMgZGVwcmVjYXRlZCBpbiBwbGFpbiBKYXZhU2NyaXB0IFJlYWN0IGNsYXNzZXMuICVzJywgaW5mb1swXSwgaW5mb1sxXSkgOiB2b2lkIDA7XG4gICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9O1xuICBmb3IgKHZhciBmbk5hbWUgaW4gZGVwcmVjYXRlZEFQSXMpIHtcbiAgICBpZiAoZGVwcmVjYXRlZEFQSXMuaGFzT3duUHJvcGVydHkoZm5OYW1lKSkge1xuICAgICAgZGVmaW5lRGVwcmVjYXRpb25XYXJuaW5nKGZuTmFtZSwgZGVwcmVjYXRlZEFQSXNbZm5OYW1lXSk7XG4gICAgfVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3RDb21wb25lbnQ7IiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxNi1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgX3Byb2RJbnZhcmlhbnQgPSByZXF1aXJlKCcuL3JlYWN0UHJvZEludmFyaWFudCcpO1xuXG52YXIgUmVhY3RDdXJyZW50T3duZXIgPSByZXF1aXJlKCcuL1JlYWN0Q3VycmVudE93bmVyJyk7XG5cbnZhciBpbnZhcmlhbnQgPSByZXF1aXJlKCdmYmpzL2xpYi9pbnZhcmlhbnQnKTtcbnZhciB3YXJuaW5nID0gcmVxdWlyZSgnZmJqcy9saWIvd2FybmluZycpO1xuXG5mdW5jdGlvbiBpc05hdGl2ZShmbikge1xuICAvLyBCYXNlZCBvbiBpc05hdGl2ZSgpIGZyb20gTG9kYXNoXG4gIHZhciBmdW5jVG9TdHJpbmcgPSBGdW5jdGlvbi5wcm90b3R5cGUudG9TdHJpbmc7XG4gIHZhciBoYXNPd25Qcm9wZXJ0eSA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG4gIHZhciByZUlzTmF0aXZlID0gUmVnRXhwKCdeJyArIGZ1bmNUb1N0cmluZ1xuICAvLyBUYWtlIGFuIGV4YW1wbGUgbmF0aXZlIGZ1bmN0aW9uIHNvdXJjZSBmb3IgY29tcGFyaXNvblxuICAuY2FsbChoYXNPd25Qcm9wZXJ0eSlcbiAgLy8gU3RyaXAgcmVnZXggY2hhcmFjdGVycyBzbyB3ZSBjYW4gdXNlIGl0IGZvciByZWdleFxuICAucmVwbGFjZSgvW1xcXFxeJC4qKz8oKVtcXF17fXxdL2csICdcXFxcJCYnKVxuICAvLyBSZW1vdmUgaGFzT3duUHJvcGVydHkgZnJvbSB0aGUgdGVtcGxhdGUgdG8gbWFrZSBpdCBnZW5lcmljXG4gIC5yZXBsYWNlKC9oYXNPd25Qcm9wZXJ0eXwoZnVuY3Rpb24pLio/KD89XFxcXFxcKCl8IGZvciAuKz8oPz1cXFxcXFxdKS9nLCAnJDEuKj8nKSArICckJyk7XG4gIHRyeSB7XG4gICAgdmFyIHNvdXJjZSA9IGZ1bmNUb1N0cmluZy5jYWxsKGZuKTtcbiAgICByZXR1cm4gcmVJc05hdGl2ZS50ZXN0KHNvdXJjZSk7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG52YXIgY2FuVXNlQ29sbGVjdGlvbnMgPVxuLy8gQXJyYXkuZnJvbVxudHlwZW9mIEFycmF5LmZyb20gPT09ICdmdW5jdGlvbicgJiZcbi8vIE1hcFxudHlwZW9mIE1hcCA9PT0gJ2Z1bmN0aW9uJyAmJiBpc05hdGl2ZShNYXApICYmXG4vLyBNYXAucHJvdG90eXBlLmtleXNcbk1hcC5wcm90b3R5cGUgIT0gbnVsbCAmJiB0eXBlb2YgTWFwLnByb3RvdHlwZS5rZXlzID09PSAnZnVuY3Rpb24nICYmIGlzTmF0aXZlKE1hcC5wcm90b3R5cGUua2V5cykgJiZcbi8vIFNldFxudHlwZW9mIFNldCA9PT0gJ2Z1bmN0aW9uJyAmJiBpc05hdGl2ZShTZXQpICYmXG4vLyBTZXQucHJvdG90eXBlLmtleXNcblNldC5wcm90b3R5cGUgIT0gbnVsbCAmJiB0eXBlb2YgU2V0LnByb3RvdHlwZS5rZXlzID09PSAnZnVuY3Rpb24nICYmIGlzTmF0aXZlKFNldC5wcm90b3R5cGUua2V5cyk7XG5cbnZhciBzZXRJdGVtO1xudmFyIGdldEl0ZW07XG52YXIgcmVtb3ZlSXRlbTtcbnZhciBnZXRJdGVtSURzO1xudmFyIGFkZFJvb3Q7XG52YXIgcmVtb3ZlUm9vdDtcbnZhciBnZXRSb290SURzO1xuXG5pZiAoY2FuVXNlQ29sbGVjdGlvbnMpIHtcbiAgdmFyIGl0ZW1NYXAgPSBuZXcgTWFwKCk7XG4gIHZhciByb290SURTZXQgPSBuZXcgU2V0KCk7XG5cbiAgc2V0SXRlbSA9IGZ1bmN0aW9uIChpZCwgaXRlbSkge1xuICAgIGl0ZW1NYXAuc2V0KGlkLCBpdGVtKTtcbiAgfTtcbiAgZ2V0SXRlbSA9IGZ1bmN0aW9uIChpZCkge1xuICAgIHJldHVybiBpdGVtTWFwLmdldChpZCk7XG4gIH07XG4gIHJlbW92ZUl0ZW0gPSBmdW5jdGlvbiAoaWQpIHtcbiAgICBpdGVtTWFwWydkZWxldGUnXShpZCk7XG4gIH07XG4gIGdldEl0ZW1JRHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIEFycmF5LmZyb20oaXRlbU1hcC5rZXlzKCkpO1xuICB9O1xuXG4gIGFkZFJvb3QgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICByb290SURTZXQuYWRkKGlkKTtcbiAgfTtcbiAgcmVtb3ZlUm9vdCA9IGZ1bmN0aW9uIChpZCkge1xuICAgIHJvb3RJRFNldFsnZGVsZXRlJ10oaWQpO1xuICB9O1xuICBnZXRSb290SURzID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBBcnJheS5mcm9tKHJvb3RJRFNldC5rZXlzKCkpO1xuICB9O1xufSBlbHNlIHtcbiAgdmFyIGl0ZW1CeUtleSA9IHt9O1xuICB2YXIgcm9vdEJ5S2V5ID0ge307XG5cbiAgLy8gVXNlIG5vbi1udW1lcmljIGtleXMgdG8gcHJldmVudCBWOCBwZXJmb3JtYW5jZSBpc3N1ZXM6XG4gIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9yZWFjdC9wdWxsLzcyMzJcbiAgdmFyIGdldEtleUZyb21JRCA9IGZ1bmN0aW9uIChpZCkge1xuICAgIHJldHVybiAnLicgKyBpZDtcbiAgfTtcbiAgdmFyIGdldElERnJvbUtleSA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgICByZXR1cm4gcGFyc2VJbnQoa2V5LnN1YnN0cigxKSwgMTApO1xuICB9O1xuXG4gIHNldEl0ZW0gPSBmdW5jdGlvbiAoaWQsIGl0ZW0pIHtcbiAgICB2YXIga2V5ID0gZ2V0S2V5RnJvbUlEKGlkKTtcbiAgICBpdGVtQnlLZXlba2V5XSA9IGl0ZW07XG4gIH07XG4gIGdldEl0ZW0gPSBmdW5jdGlvbiAoaWQpIHtcbiAgICB2YXIga2V5ID0gZ2V0S2V5RnJvbUlEKGlkKTtcbiAgICByZXR1cm4gaXRlbUJ5S2V5W2tleV07XG4gIH07XG4gIHJlbW92ZUl0ZW0gPSBmdW5jdGlvbiAoaWQpIHtcbiAgICB2YXIga2V5ID0gZ2V0S2V5RnJvbUlEKGlkKTtcbiAgICBkZWxldGUgaXRlbUJ5S2V5W2tleV07XG4gIH07XG4gIGdldEl0ZW1JRHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKGl0ZW1CeUtleSkubWFwKGdldElERnJvbUtleSk7XG4gIH07XG5cbiAgYWRkUm9vdCA9IGZ1bmN0aW9uIChpZCkge1xuICAgIHZhciBrZXkgPSBnZXRLZXlGcm9tSUQoaWQpO1xuICAgIHJvb3RCeUtleVtrZXldID0gdHJ1ZTtcbiAgfTtcbiAgcmVtb3ZlUm9vdCA9IGZ1bmN0aW9uIChpZCkge1xuICAgIHZhciBrZXkgPSBnZXRLZXlGcm9tSUQoaWQpO1xuICAgIGRlbGV0ZSByb290QnlLZXlba2V5XTtcbiAgfTtcbiAgZ2V0Um9vdElEcyA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gT2JqZWN0LmtleXMocm9vdEJ5S2V5KS5tYXAoZ2V0SURGcm9tS2V5KTtcbiAgfTtcbn1cblxudmFyIHVubW91bnRlZElEcyA9IFtdO1xuXG5mdW5jdGlvbiBwdXJnZURlZXAoaWQpIHtcbiAgdmFyIGl0ZW0gPSBnZXRJdGVtKGlkKTtcbiAgaWYgKGl0ZW0pIHtcbiAgICB2YXIgY2hpbGRJRHMgPSBpdGVtLmNoaWxkSURzO1xuXG4gICAgcmVtb3ZlSXRlbShpZCk7XG4gICAgY2hpbGRJRHMuZm9yRWFjaChwdXJnZURlZXApO1xuICB9XG59XG5cbmZ1bmN0aW9uIGRlc2NyaWJlQ29tcG9uZW50RnJhbWUobmFtZSwgc291cmNlLCBvd25lck5hbWUpIHtcbiAgcmV0dXJuICdcXG4gICAgaW4gJyArIChuYW1lIHx8ICdVbmtub3duJykgKyAoc291cmNlID8gJyAoYXQgJyArIHNvdXJjZS5maWxlTmFtZS5yZXBsYWNlKC9eLipbXFxcXFxcL10vLCAnJykgKyAnOicgKyBzb3VyY2UubGluZU51bWJlciArICcpJyA6IG93bmVyTmFtZSA/ICcgKGNyZWF0ZWQgYnkgJyArIG93bmVyTmFtZSArICcpJyA6ICcnKTtcbn1cblxuZnVuY3Rpb24gZ2V0RGlzcGxheU5hbWUoZWxlbWVudCkge1xuICBpZiAoZWxlbWVudCA9PSBudWxsKSB7XG4gICAgcmV0dXJuICcjZW1wdHknO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBlbGVtZW50ID09PSAnc3RyaW5nJyB8fCB0eXBlb2YgZWxlbWVudCA9PT0gJ251bWJlcicpIHtcbiAgICByZXR1cm4gJyN0ZXh0JztcbiAgfSBlbHNlIGlmICh0eXBlb2YgZWxlbWVudC50eXBlID09PSAnc3RyaW5nJykge1xuICAgIHJldHVybiBlbGVtZW50LnR5cGU7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGVsZW1lbnQudHlwZS5kaXNwbGF5TmFtZSB8fCBlbGVtZW50LnR5cGUubmFtZSB8fCAnVW5rbm93bic7XG4gIH1cbn1cblxuZnVuY3Rpb24gZGVzY3JpYmVJRChpZCkge1xuICB2YXIgbmFtZSA9IFJlYWN0Q29tcG9uZW50VHJlZUhvb2suZ2V0RGlzcGxheU5hbWUoaWQpO1xuICB2YXIgZWxlbWVudCA9IFJlYWN0Q29tcG9uZW50VHJlZUhvb2suZ2V0RWxlbWVudChpZCk7XG4gIHZhciBvd25lcklEID0gUmVhY3RDb21wb25lbnRUcmVlSG9vay5nZXRPd25lcklEKGlkKTtcbiAgdmFyIG93bmVyTmFtZTtcbiAgaWYgKG93bmVySUQpIHtcbiAgICBvd25lck5hbWUgPSBSZWFjdENvbXBvbmVudFRyZWVIb29rLmdldERpc3BsYXlOYW1lKG93bmVySUQpO1xuICB9XG4gIFwiZGV2ZWxvcG1lbnRcIiAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyhlbGVtZW50LCAnUmVhY3RDb21wb25lbnRUcmVlSG9vazogTWlzc2luZyBSZWFjdCBlbGVtZW50IGZvciBkZWJ1Z0lEICVzIHdoZW4gJyArICdidWlsZGluZyBzdGFjaycsIGlkKSA6IHZvaWQgMDtcbiAgcmV0dXJuIGRlc2NyaWJlQ29tcG9uZW50RnJhbWUobmFtZSwgZWxlbWVudCAmJiBlbGVtZW50Ll9zb3VyY2UsIG93bmVyTmFtZSk7XG59XG5cbnZhciBSZWFjdENvbXBvbmVudFRyZWVIb29rID0ge1xuICBvblNldENoaWxkcmVuOiBmdW5jdGlvbiAoaWQsIG5leHRDaGlsZElEcykge1xuICAgIHZhciBpdGVtID0gZ2V0SXRlbShpZCk7XG4gICAgIWl0ZW0gPyBcImRldmVsb3BtZW50XCIgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ0l0ZW0gbXVzdCBoYXZlIGJlZW4gc2V0JykgOiBfcHJvZEludmFyaWFudCgnMTQ0JykgOiB2b2lkIDA7XG4gICAgaXRlbS5jaGlsZElEcyA9IG5leHRDaGlsZElEcztcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbmV4dENoaWxkSURzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgbmV4dENoaWxkSUQgPSBuZXh0Q2hpbGRJRHNbaV07XG4gICAgICB2YXIgbmV4dENoaWxkID0gZ2V0SXRlbShuZXh0Q2hpbGRJRCk7XG4gICAgICAhbmV4dENoaWxkID8gXCJkZXZlbG9wbWVudFwiICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdFeHBlY3RlZCBob29rIGV2ZW50cyB0byBmaXJlIGZvciB0aGUgY2hpbGQgYmVmb3JlIGl0cyBwYXJlbnQgaW5jbHVkZXMgaXQgaW4gb25TZXRDaGlsZHJlbigpLicpIDogX3Byb2RJbnZhcmlhbnQoJzE0MCcpIDogdm9pZCAwO1xuICAgICAgIShuZXh0Q2hpbGQuY2hpbGRJRHMgIT0gbnVsbCB8fCB0eXBlb2YgbmV4dENoaWxkLmVsZW1lbnQgIT09ICdvYmplY3QnIHx8IG5leHRDaGlsZC5lbGVtZW50ID09IG51bGwpID8gXCJkZXZlbG9wbWVudFwiICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdFeHBlY3RlZCBvblNldENoaWxkcmVuKCkgdG8gZmlyZSBmb3IgYSBjb250YWluZXIgY2hpbGQgYmVmb3JlIGl0cyBwYXJlbnQgaW5jbHVkZXMgaXQgaW4gb25TZXRDaGlsZHJlbigpLicpIDogX3Byb2RJbnZhcmlhbnQoJzE0MScpIDogdm9pZCAwO1xuICAgICAgIW5leHRDaGlsZC5pc01vdW50ZWQgPyBcImRldmVsb3BtZW50XCIgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ0V4cGVjdGVkIG9uTW91bnRDb21wb25lbnQoKSB0byBmaXJlIGZvciB0aGUgY2hpbGQgYmVmb3JlIGl0cyBwYXJlbnQgaW5jbHVkZXMgaXQgaW4gb25TZXRDaGlsZHJlbigpLicpIDogX3Byb2RJbnZhcmlhbnQoJzcxJykgOiB2b2lkIDA7XG4gICAgICBpZiAobmV4dENoaWxkLnBhcmVudElEID09IG51bGwpIHtcbiAgICAgICAgbmV4dENoaWxkLnBhcmVudElEID0gaWQ7XG4gICAgICAgIC8vIFRPRE86IFRoaXMgc2hvdWxkbid0IGJlIG5lY2Vzc2FyeSBidXQgbW91bnRpbmcgYSBuZXcgcm9vdCBkdXJpbmcgaW5cbiAgICAgICAgLy8gY29tcG9uZW50V2lsbE1vdW50IGN1cnJlbnRseSBjYXVzZXMgbm90LXlldC1tb3VudGVkIGNvbXBvbmVudHMgdG9cbiAgICAgICAgLy8gYmUgcHVyZ2VkIGZyb20gb3VyIHRyZWUgZGF0YSBzbyB0aGVpciBwYXJlbnQgaWQgaXMgbWlzc2luZy5cbiAgICAgIH1cbiAgICAgICEobmV4dENoaWxkLnBhcmVudElEID09PSBpZCkgPyBcImRldmVsb3BtZW50XCIgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ0V4cGVjdGVkIG9uQmVmb3JlTW91bnRDb21wb25lbnQoKSBwYXJlbnQgYW5kIG9uU2V0Q2hpbGRyZW4oKSB0byBiZSBjb25zaXN0ZW50ICglcyBoYXMgcGFyZW50cyAlcyBhbmQgJXMpLicsIG5leHRDaGlsZElELCBuZXh0Q2hpbGQucGFyZW50SUQsIGlkKSA6IF9wcm9kSW52YXJpYW50KCcxNDInLCBuZXh0Q2hpbGRJRCwgbmV4dENoaWxkLnBhcmVudElELCBpZCkgOiB2b2lkIDA7XG4gICAgfVxuICB9LFxuICBvbkJlZm9yZU1vdW50Q29tcG9uZW50OiBmdW5jdGlvbiAoaWQsIGVsZW1lbnQsIHBhcmVudElEKSB7XG4gICAgdmFyIGl0ZW0gPSB7XG4gICAgICBlbGVtZW50OiBlbGVtZW50LFxuICAgICAgcGFyZW50SUQ6IHBhcmVudElELFxuICAgICAgdGV4dDogbnVsbCxcbiAgICAgIGNoaWxkSURzOiBbXSxcbiAgICAgIGlzTW91bnRlZDogZmFsc2UsXG4gICAgICB1cGRhdGVDb3VudDogMFxuICAgIH07XG4gICAgc2V0SXRlbShpZCwgaXRlbSk7XG4gIH0sXG4gIG9uQmVmb3JlVXBkYXRlQ29tcG9uZW50OiBmdW5jdGlvbiAoaWQsIGVsZW1lbnQpIHtcbiAgICB2YXIgaXRlbSA9IGdldEl0ZW0oaWQpO1xuICAgIGlmICghaXRlbSB8fCAhaXRlbS5pc01vdW50ZWQpIHtcbiAgICAgIC8vIFdlIG1heSBlbmQgdXAgaGVyZSBhcyBhIHJlc3VsdCBvZiBzZXRTdGF0ZSgpIGluIGNvbXBvbmVudFdpbGxVbm1vdW50KCkuXG4gICAgICAvLyBJbiB0aGlzIGNhc2UsIGlnbm9yZSB0aGUgZWxlbWVudC5cbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaXRlbS5lbGVtZW50ID0gZWxlbWVudDtcbiAgfSxcbiAgb25Nb3VudENvbXBvbmVudDogZnVuY3Rpb24gKGlkKSB7XG4gICAgdmFyIGl0ZW0gPSBnZXRJdGVtKGlkKTtcbiAgICAhaXRlbSA/IFwiZGV2ZWxvcG1lbnRcIiAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnSXRlbSBtdXN0IGhhdmUgYmVlbiBzZXQnKSA6IF9wcm9kSW52YXJpYW50KCcxNDQnKSA6IHZvaWQgMDtcbiAgICBpdGVtLmlzTW91bnRlZCA9IHRydWU7XG4gICAgdmFyIGlzUm9vdCA9IGl0ZW0ucGFyZW50SUQgPT09IDA7XG4gICAgaWYgKGlzUm9vdCkge1xuICAgICAgYWRkUm9vdChpZCk7XG4gICAgfVxuICB9LFxuICBvblVwZGF0ZUNvbXBvbmVudDogZnVuY3Rpb24gKGlkKSB7XG4gICAgdmFyIGl0ZW0gPSBnZXRJdGVtKGlkKTtcbiAgICBpZiAoIWl0ZW0gfHwgIWl0ZW0uaXNNb3VudGVkKSB7XG4gICAgICAvLyBXZSBtYXkgZW5kIHVwIGhlcmUgYXMgYSByZXN1bHQgb2Ygc2V0U3RhdGUoKSBpbiBjb21wb25lbnRXaWxsVW5tb3VudCgpLlxuICAgICAgLy8gSW4gdGhpcyBjYXNlLCBpZ25vcmUgdGhlIGVsZW1lbnQuXG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGl0ZW0udXBkYXRlQ291bnQrKztcbiAgfSxcbiAgb25Vbm1vdW50Q29tcG9uZW50OiBmdW5jdGlvbiAoaWQpIHtcbiAgICB2YXIgaXRlbSA9IGdldEl0ZW0oaWQpO1xuICAgIGlmIChpdGVtKSB7XG4gICAgICAvLyBXZSBuZWVkIHRvIGNoZWNrIGlmIGl0IGV4aXN0cy5cbiAgICAgIC8vIGBpdGVtYCBtaWdodCBub3QgZXhpc3QgaWYgaXQgaXMgaW5zaWRlIGFuIGVycm9yIGJvdW5kYXJ5LCBhbmQgYSBzaWJsaW5nXG4gICAgICAvLyBlcnJvciBib3VuZGFyeSBjaGlsZCB0aHJldyB3aGlsZSBtb3VudGluZy4gVGhlbiB0aGlzIGluc3RhbmNlIG5ldmVyXG4gICAgICAvLyBnb3QgYSBjaGFuY2UgdG8gbW91bnQsIGJ1dCBpdCBzdGlsbCBnZXRzIGFuIHVubW91bnRpbmcgZXZlbnQgZHVyaW5nXG4gICAgICAvLyB0aGUgZXJyb3IgYm91bmRhcnkgY2xlYW51cC5cbiAgICAgIGl0ZW0uaXNNb3VudGVkID0gZmFsc2U7XG4gICAgICB2YXIgaXNSb290ID0gaXRlbS5wYXJlbnRJRCA9PT0gMDtcbiAgICAgIGlmIChpc1Jvb3QpIHtcbiAgICAgICAgcmVtb3ZlUm9vdChpZCk7XG4gICAgICB9XG4gICAgfVxuICAgIHVubW91bnRlZElEcy5wdXNoKGlkKTtcbiAgfSxcbiAgcHVyZ2VVbm1vdW50ZWRDb21wb25lbnRzOiBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKFJlYWN0Q29tcG9uZW50VHJlZUhvb2suX3ByZXZlbnRQdXJnaW5nKSB7XG4gICAgICAvLyBTaG91bGQgb25seSBiZSB1c2VkIGZvciB0ZXN0aW5nLlxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdW5tb3VudGVkSURzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWQgPSB1bm1vdW50ZWRJRHNbaV07XG4gICAgICBwdXJnZURlZXAoaWQpO1xuICAgIH1cbiAgICB1bm1vdW50ZWRJRHMubGVuZ3RoID0gMDtcbiAgfSxcbiAgaXNNb3VudGVkOiBmdW5jdGlvbiAoaWQpIHtcbiAgICB2YXIgaXRlbSA9IGdldEl0ZW0oaWQpO1xuICAgIHJldHVybiBpdGVtID8gaXRlbS5pc01vdW50ZWQgOiBmYWxzZTtcbiAgfSxcbiAgZ2V0Q3VycmVudFN0YWNrQWRkZW5kdW06IGZ1bmN0aW9uICh0b3BFbGVtZW50KSB7XG4gICAgdmFyIGluZm8gPSAnJztcbiAgICBpZiAodG9wRWxlbWVudCkge1xuICAgICAgdmFyIG5hbWUgPSBnZXREaXNwbGF5TmFtZSh0b3BFbGVtZW50KTtcbiAgICAgIHZhciBvd25lciA9IHRvcEVsZW1lbnQuX293bmVyO1xuICAgICAgaW5mbyArPSBkZXNjcmliZUNvbXBvbmVudEZyYW1lKG5hbWUsIHRvcEVsZW1lbnQuX3NvdXJjZSwgb3duZXIgJiYgb3duZXIuZ2V0TmFtZSgpKTtcbiAgICB9XG5cbiAgICB2YXIgY3VycmVudE93bmVyID0gUmVhY3RDdXJyZW50T3duZXIuY3VycmVudDtcbiAgICB2YXIgaWQgPSBjdXJyZW50T3duZXIgJiYgY3VycmVudE93bmVyLl9kZWJ1Z0lEO1xuXG4gICAgaW5mbyArPSBSZWFjdENvbXBvbmVudFRyZWVIb29rLmdldFN0YWNrQWRkZW5kdW1CeUlEKGlkKTtcbiAgICByZXR1cm4gaW5mbztcbiAgfSxcbiAgZ2V0U3RhY2tBZGRlbmR1bUJ5SUQ6IGZ1bmN0aW9uIChpZCkge1xuICAgIHZhciBpbmZvID0gJyc7XG4gICAgd2hpbGUgKGlkKSB7XG4gICAgICBpbmZvICs9IGRlc2NyaWJlSUQoaWQpO1xuICAgICAgaWQgPSBSZWFjdENvbXBvbmVudFRyZWVIb29rLmdldFBhcmVudElEKGlkKTtcbiAgICB9XG4gICAgcmV0dXJuIGluZm87XG4gIH0sXG4gIGdldENoaWxkSURzOiBmdW5jdGlvbiAoaWQpIHtcbiAgICB2YXIgaXRlbSA9IGdldEl0ZW0oaWQpO1xuICAgIHJldHVybiBpdGVtID8gaXRlbS5jaGlsZElEcyA6IFtdO1xuICB9LFxuICBnZXREaXNwbGF5TmFtZTogZnVuY3Rpb24gKGlkKSB7XG4gICAgdmFyIGVsZW1lbnQgPSBSZWFjdENvbXBvbmVudFRyZWVIb29rLmdldEVsZW1lbnQoaWQpO1xuICAgIGlmICghZWxlbWVudCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBnZXREaXNwbGF5TmFtZShlbGVtZW50KTtcbiAgfSxcbiAgZ2V0RWxlbWVudDogZnVuY3Rpb24gKGlkKSB7XG4gICAgdmFyIGl0ZW0gPSBnZXRJdGVtKGlkKTtcbiAgICByZXR1cm4gaXRlbSA/IGl0ZW0uZWxlbWVudCA6IG51bGw7XG4gIH0sXG4gIGdldE93bmVySUQ6IGZ1bmN0aW9uIChpZCkge1xuICAgIHZhciBlbGVtZW50ID0gUmVhY3RDb21wb25lbnRUcmVlSG9vay5nZXRFbGVtZW50KGlkKTtcbiAgICBpZiAoIWVsZW1lbnQgfHwgIWVsZW1lbnQuX293bmVyKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGVsZW1lbnQuX293bmVyLl9kZWJ1Z0lEO1xuICB9LFxuICBnZXRQYXJlbnRJRDogZnVuY3Rpb24gKGlkKSB7XG4gICAgdmFyIGl0ZW0gPSBnZXRJdGVtKGlkKTtcbiAgICByZXR1cm4gaXRlbSA/IGl0ZW0ucGFyZW50SUQgOiBudWxsO1xuICB9LFxuICBnZXRTb3VyY2U6IGZ1bmN0aW9uIChpZCkge1xuICAgIHZhciBpdGVtID0gZ2V0SXRlbShpZCk7XG4gICAgdmFyIGVsZW1lbnQgPSBpdGVtID8gaXRlbS5lbGVtZW50IDogbnVsbDtcbiAgICB2YXIgc291cmNlID0gZWxlbWVudCAhPSBudWxsID8gZWxlbWVudC5fc291cmNlIDogbnVsbDtcbiAgICByZXR1cm4gc291cmNlO1xuICB9LFxuICBnZXRUZXh0OiBmdW5jdGlvbiAoaWQpIHtcbiAgICB2YXIgZWxlbWVudCA9IFJlYWN0Q29tcG9uZW50VHJlZUhvb2suZ2V0RWxlbWVudChpZCk7XG4gICAgaWYgKHR5cGVvZiBlbGVtZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgcmV0dXJuIGVsZW1lbnQ7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgZWxlbWVudCA9PT0gJ251bWJlcicpIHtcbiAgICAgIHJldHVybiAnJyArIGVsZW1lbnQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfSxcbiAgZ2V0VXBkYXRlQ291bnQ6IGZ1bmN0aW9uIChpZCkge1xuICAgIHZhciBpdGVtID0gZ2V0SXRlbShpZCk7XG4gICAgcmV0dXJuIGl0ZW0gPyBpdGVtLnVwZGF0ZUNvdW50IDogMDtcbiAgfSxcblxuXG4gIGdldFJvb3RJRHM6IGdldFJvb3RJRHMsXG4gIGdldFJlZ2lzdGVyZWRJRHM6IGdldEl0ZW1JRHNcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3RDb21wb25lbnRUcmVlSG9vazsiLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbi8qKlxuICogS2VlcHMgdHJhY2sgb2YgdGhlIGN1cnJlbnQgb3duZXIuXG4gKlxuICogVGhlIGN1cnJlbnQgb3duZXIgaXMgdGhlIGNvbXBvbmVudCB3aG8gc2hvdWxkIG93biBhbnkgY29tcG9uZW50cyB0aGF0IGFyZVxuICogY3VycmVudGx5IGJlaW5nIGNvbnN0cnVjdGVkLlxuICovXG52YXIgUmVhY3RDdXJyZW50T3duZXIgPSB7XG5cbiAgLyoqXG4gICAqIEBpbnRlcm5hbFxuICAgKiBAdHlwZSB7UmVhY3RDb21wb25lbnR9XG4gICAqL1xuICBjdXJyZW50OiBudWxsXG5cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3RDdXJyZW50T3duZXI7IiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFJlYWN0RWxlbWVudCA9IHJlcXVpcmUoJy4vUmVhY3RFbGVtZW50Jyk7XG5cbi8qKlxuICogQ3JlYXRlIGEgZmFjdG9yeSB0aGF0IGNyZWF0ZXMgSFRNTCB0YWcgZWxlbWVudHMuXG4gKlxuICogQHByaXZhdGVcbiAqL1xudmFyIGNyZWF0ZURPTUZhY3RvcnkgPSBSZWFjdEVsZW1lbnQuY3JlYXRlRmFjdG9yeTtcbmlmIChcImRldmVsb3BtZW50XCIgIT09ICdwcm9kdWN0aW9uJykge1xuICB2YXIgUmVhY3RFbGVtZW50VmFsaWRhdG9yID0gcmVxdWlyZSgnLi9SZWFjdEVsZW1lbnRWYWxpZGF0b3InKTtcbiAgY3JlYXRlRE9NRmFjdG9yeSA9IFJlYWN0RWxlbWVudFZhbGlkYXRvci5jcmVhdGVGYWN0b3J5O1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBtYXBwaW5nIGZyb20gc3VwcG9ydGVkIEhUTUwgdGFncyB0byBgUmVhY3RET01Db21wb25lbnRgIGNsYXNzZXMuXG4gKiBUaGlzIGlzIGFsc28gYWNjZXNzaWJsZSB2aWEgYFJlYWN0LkRPTWAuXG4gKlxuICogQHB1YmxpY1xuICovXG52YXIgUmVhY3RET01GYWN0b3JpZXMgPSB7XG4gIGE6IGNyZWF0ZURPTUZhY3RvcnkoJ2EnKSxcbiAgYWJicjogY3JlYXRlRE9NRmFjdG9yeSgnYWJicicpLFxuICBhZGRyZXNzOiBjcmVhdGVET01GYWN0b3J5KCdhZGRyZXNzJyksXG4gIGFyZWE6IGNyZWF0ZURPTUZhY3RvcnkoJ2FyZWEnKSxcbiAgYXJ0aWNsZTogY3JlYXRlRE9NRmFjdG9yeSgnYXJ0aWNsZScpLFxuICBhc2lkZTogY3JlYXRlRE9NRmFjdG9yeSgnYXNpZGUnKSxcbiAgYXVkaW86IGNyZWF0ZURPTUZhY3RvcnkoJ2F1ZGlvJyksXG4gIGI6IGNyZWF0ZURPTUZhY3RvcnkoJ2InKSxcbiAgYmFzZTogY3JlYXRlRE9NRmFjdG9yeSgnYmFzZScpLFxuICBiZGk6IGNyZWF0ZURPTUZhY3RvcnkoJ2JkaScpLFxuICBiZG86IGNyZWF0ZURPTUZhY3RvcnkoJ2JkbycpLFxuICBiaWc6IGNyZWF0ZURPTUZhY3RvcnkoJ2JpZycpLFxuICBibG9ja3F1b3RlOiBjcmVhdGVET01GYWN0b3J5KCdibG9ja3F1b3RlJyksXG4gIGJvZHk6IGNyZWF0ZURPTUZhY3RvcnkoJ2JvZHknKSxcbiAgYnI6IGNyZWF0ZURPTUZhY3RvcnkoJ2JyJyksXG4gIGJ1dHRvbjogY3JlYXRlRE9NRmFjdG9yeSgnYnV0dG9uJyksXG4gIGNhbnZhczogY3JlYXRlRE9NRmFjdG9yeSgnY2FudmFzJyksXG4gIGNhcHRpb246IGNyZWF0ZURPTUZhY3RvcnkoJ2NhcHRpb24nKSxcbiAgY2l0ZTogY3JlYXRlRE9NRmFjdG9yeSgnY2l0ZScpLFxuICBjb2RlOiBjcmVhdGVET01GYWN0b3J5KCdjb2RlJyksXG4gIGNvbDogY3JlYXRlRE9NRmFjdG9yeSgnY29sJyksXG4gIGNvbGdyb3VwOiBjcmVhdGVET01GYWN0b3J5KCdjb2xncm91cCcpLFxuICBkYXRhOiBjcmVhdGVET01GYWN0b3J5KCdkYXRhJyksXG4gIGRhdGFsaXN0OiBjcmVhdGVET01GYWN0b3J5KCdkYXRhbGlzdCcpLFxuICBkZDogY3JlYXRlRE9NRmFjdG9yeSgnZGQnKSxcbiAgZGVsOiBjcmVhdGVET01GYWN0b3J5KCdkZWwnKSxcbiAgZGV0YWlsczogY3JlYXRlRE9NRmFjdG9yeSgnZGV0YWlscycpLFxuICBkZm46IGNyZWF0ZURPTUZhY3RvcnkoJ2RmbicpLFxuICBkaWFsb2c6IGNyZWF0ZURPTUZhY3RvcnkoJ2RpYWxvZycpLFxuICBkaXY6IGNyZWF0ZURPTUZhY3RvcnkoJ2RpdicpLFxuICBkbDogY3JlYXRlRE9NRmFjdG9yeSgnZGwnKSxcbiAgZHQ6IGNyZWF0ZURPTUZhY3RvcnkoJ2R0JyksXG4gIGVtOiBjcmVhdGVET01GYWN0b3J5KCdlbScpLFxuICBlbWJlZDogY3JlYXRlRE9NRmFjdG9yeSgnZW1iZWQnKSxcbiAgZmllbGRzZXQ6IGNyZWF0ZURPTUZhY3RvcnkoJ2ZpZWxkc2V0JyksXG4gIGZpZ2NhcHRpb246IGNyZWF0ZURPTUZhY3RvcnkoJ2ZpZ2NhcHRpb24nKSxcbiAgZmlndXJlOiBjcmVhdGVET01GYWN0b3J5KCdmaWd1cmUnKSxcbiAgZm9vdGVyOiBjcmVhdGVET01GYWN0b3J5KCdmb290ZXInKSxcbiAgZm9ybTogY3JlYXRlRE9NRmFjdG9yeSgnZm9ybScpLFxuICBoMTogY3JlYXRlRE9NRmFjdG9yeSgnaDEnKSxcbiAgaDI6IGNyZWF0ZURPTUZhY3RvcnkoJ2gyJyksXG4gIGgzOiBjcmVhdGVET01GYWN0b3J5KCdoMycpLFxuICBoNDogY3JlYXRlRE9NRmFjdG9yeSgnaDQnKSxcbiAgaDU6IGNyZWF0ZURPTUZhY3RvcnkoJ2g1JyksXG4gIGg2OiBjcmVhdGVET01GYWN0b3J5KCdoNicpLFxuICBoZWFkOiBjcmVhdGVET01GYWN0b3J5KCdoZWFkJyksXG4gIGhlYWRlcjogY3JlYXRlRE9NRmFjdG9yeSgnaGVhZGVyJyksXG4gIGhncm91cDogY3JlYXRlRE9NRmFjdG9yeSgnaGdyb3VwJyksXG4gIGhyOiBjcmVhdGVET01GYWN0b3J5KCdocicpLFxuICBodG1sOiBjcmVhdGVET01GYWN0b3J5KCdodG1sJyksXG4gIGk6IGNyZWF0ZURPTUZhY3RvcnkoJ2knKSxcbiAgaWZyYW1lOiBjcmVhdGVET01GYWN0b3J5KCdpZnJhbWUnKSxcbiAgaW1nOiBjcmVhdGVET01GYWN0b3J5KCdpbWcnKSxcbiAgaW5wdXQ6IGNyZWF0ZURPTUZhY3RvcnkoJ2lucHV0JyksXG4gIGluczogY3JlYXRlRE9NRmFjdG9yeSgnaW5zJyksXG4gIGtiZDogY3JlYXRlRE9NRmFjdG9yeSgna2JkJyksXG4gIGtleWdlbjogY3JlYXRlRE9NRmFjdG9yeSgna2V5Z2VuJyksXG4gIGxhYmVsOiBjcmVhdGVET01GYWN0b3J5KCdsYWJlbCcpLFxuICBsZWdlbmQ6IGNyZWF0ZURPTUZhY3RvcnkoJ2xlZ2VuZCcpLFxuICBsaTogY3JlYXRlRE9NRmFjdG9yeSgnbGknKSxcbiAgbGluazogY3JlYXRlRE9NRmFjdG9yeSgnbGluaycpLFxuICBtYWluOiBjcmVhdGVET01GYWN0b3J5KCdtYWluJyksXG4gIG1hcDogY3JlYXRlRE9NRmFjdG9yeSgnbWFwJyksXG4gIG1hcms6IGNyZWF0ZURPTUZhY3RvcnkoJ21hcmsnKSxcbiAgbWVudTogY3JlYXRlRE9NRmFjdG9yeSgnbWVudScpLFxuICBtZW51aXRlbTogY3JlYXRlRE9NRmFjdG9yeSgnbWVudWl0ZW0nKSxcbiAgbWV0YTogY3JlYXRlRE9NRmFjdG9yeSgnbWV0YScpLFxuICBtZXRlcjogY3JlYXRlRE9NRmFjdG9yeSgnbWV0ZXInKSxcbiAgbmF2OiBjcmVhdGVET01GYWN0b3J5KCduYXYnKSxcbiAgbm9zY3JpcHQ6IGNyZWF0ZURPTUZhY3RvcnkoJ25vc2NyaXB0JyksXG4gIG9iamVjdDogY3JlYXRlRE9NRmFjdG9yeSgnb2JqZWN0JyksXG4gIG9sOiBjcmVhdGVET01GYWN0b3J5KCdvbCcpLFxuICBvcHRncm91cDogY3JlYXRlRE9NRmFjdG9yeSgnb3B0Z3JvdXAnKSxcbiAgb3B0aW9uOiBjcmVhdGVET01GYWN0b3J5KCdvcHRpb24nKSxcbiAgb3V0cHV0OiBjcmVhdGVET01GYWN0b3J5KCdvdXRwdXQnKSxcbiAgcDogY3JlYXRlRE9NRmFjdG9yeSgncCcpLFxuICBwYXJhbTogY3JlYXRlRE9NRmFjdG9yeSgncGFyYW0nKSxcbiAgcGljdHVyZTogY3JlYXRlRE9NRmFjdG9yeSgncGljdHVyZScpLFxuICBwcmU6IGNyZWF0ZURPTUZhY3RvcnkoJ3ByZScpLFxuICBwcm9ncmVzczogY3JlYXRlRE9NRmFjdG9yeSgncHJvZ3Jlc3MnKSxcbiAgcTogY3JlYXRlRE9NRmFjdG9yeSgncScpLFxuICBycDogY3JlYXRlRE9NRmFjdG9yeSgncnAnKSxcbiAgcnQ6IGNyZWF0ZURPTUZhY3RvcnkoJ3J0JyksXG4gIHJ1Ynk6IGNyZWF0ZURPTUZhY3RvcnkoJ3J1YnknKSxcbiAgczogY3JlYXRlRE9NRmFjdG9yeSgncycpLFxuICBzYW1wOiBjcmVhdGVET01GYWN0b3J5KCdzYW1wJyksXG4gIHNjcmlwdDogY3JlYXRlRE9NRmFjdG9yeSgnc2NyaXB0JyksXG4gIHNlY3Rpb246IGNyZWF0ZURPTUZhY3RvcnkoJ3NlY3Rpb24nKSxcbiAgc2VsZWN0OiBjcmVhdGVET01GYWN0b3J5KCdzZWxlY3QnKSxcbiAgc21hbGw6IGNyZWF0ZURPTUZhY3RvcnkoJ3NtYWxsJyksXG4gIHNvdXJjZTogY3JlYXRlRE9NRmFjdG9yeSgnc291cmNlJyksXG4gIHNwYW46IGNyZWF0ZURPTUZhY3RvcnkoJ3NwYW4nKSxcbiAgc3Ryb25nOiBjcmVhdGVET01GYWN0b3J5KCdzdHJvbmcnKSxcbiAgc3R5bGU6IGNyZWF0ZURPTUZhY3RvcnkoJ3N0eWxlJyksXG4gIHN1YjogY3JlYXRlRE9NRmFjdG9yeSgnc3ViJyksXG4gIHN1bW1hcnk6IGNyZWF0ZURPTUZhY3RvcnkoJ3N1bW1hcnknKSxcbiAgc3VwOiBjcmVhdGVET01GYWN0b3J5KCdzdXAnKSxcbiAgdGFibGU6IGNyZWF0ZURPTUZhY3RvcnkoJ3RhYmxlJyksXG4gIHRib2R5OiBjcmVhdGVET01GYWN0b3J5KCd0Ym9keScpLFxuICB0ZDogY3JlYXRlRE9NRmFjdG9yeSgndGQnKSxcbiAgdGV4dGFyZWE6IGNyZWF0ZURPTUZhY3RvcnkoJ3RleHRhcmVhJyksXG4gIHRmb290OiBjcmVhdGVET01GYWN0b3J5KCd0Zm9vdCcpLFxuICB0aDogY3JlYXRlRE9NRmFjdG9yeSgndGgnKSxcbiAgdGhlYWQ6IGNyZWF0ZURPTUZhY3RvcnkoJ3RoZWFkJyksXG4gIHRpbWU6IGNyZWF0ZURPTUZhY3RvcnkoJ3RpbWUnKSxcbiAgdGl0bGU6IGNyZWF0ZURPTUZhY3RvcnkoJ3RpdGxlJyksXG4gIHRyOiBjcmVhdGVET01GYWN0b3J5KCd0cicpLFxuICB0cmFjazogY3JlYXRlRE9NRmFjdG9yeSgndHJhY2snKSxcbiAgdTogY3JlYXRlRE9NRmFjdG9yeSgndScpLFxuICB1bDogY3JlYXRlRE9NRmFjdG9yeSgndWwnKSxcbiAgJ3Zhcic6IGNyZWF0ZURPTUZhY3RvcnkoJ3ZhcicpLFxuICB2aWRlbzogY3JlYXRlRE9NRmFjdG9yeSgndmlkZW8nKSxcbiAgd2JyOiBjcmVhdGVET01GYWN0b3J5KCd3YnInKSxcblxuICAvLyBTVkdcbiAgY2lyY2xlOiBjcmVhdGVET01GYWN0b3J5KCdjaXJjbGUnKSxcbiAgY2xpcFBhdGg6IGNyZWF0ZURPTUZhY3RvcnkoJ2NsaXBQYXRoJyksXG4gIGRlZnM6IGNyZWF0ZURPTUZhY3RvcnkoJ2RlZnMnKSxcbiAgZWxsaXBzZTogY3JlYXRlRE9NRmFjdG9yeSgnZWxsaXBzZScpLFxuICBnOiBjcmVhdGVET01GYWN0b3J5KCdnJyksXG4gIGltYWdlOiBjcmVhdGVET01GYWN0b3J5KCdpbWFnZScpLFxuICBsaW5lOiBjcmVhdGVET01GYWN0b3J5KCdsaW5lJyksXG4gIGxpbmVhckdyYWRpZW50OiBjcmVhdGVET01GYWN0b3J5KCdsaW5lYXJHcmFkaWVudCcpLFxuICBtYXNrOiBjcmVhdGVET01GYWN0b3J5KCdtYXNrJyksXG4gIHBhdGg6IGNyZWF0ZURPTUZhY3RvcnkoJ3BhdGgnKSxcbiAgcGF0dGVybjogY3JlYXRlRE9NRmFjdG9yeSgncGF0dGVybicpLFxuICBwb2x5Z29uOiBjcmVhdGVET01GYWN0b3J5KCdwb2x5Z29uJyksXG4gIHBvbHlsaW5lOiBjcmVhdGVET01GYWN0b3J5KCdwb2x5bGluZScpLFxuICByYWRpYWxHcmFkaWVudDogY3JlYXRlRE9NRmFjdG9yeSgncmFkaWFsR3JhZGllbnQnKSxcbiAgcmVjdDogY3JlYXRlRE9NRmFjdG9yeSgncmVjdCcpLFxuICBzdG9wOiBjcmVhdGVET01GYWN0b3J5KCdzdG9wJyksXG4gIHN2ZzogY3JlYXRlRE9NRmFjdG9yeSgnc3ZnJyksXG4gIHRleHQ6IGNyZWF0ZURPTUZhY3RvcnkoJ3RleHQnKSxcbiAgdHNwYW46IGNyZWF0ZURPTUZhY3RvcnkoJ3RzcGFuJylcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3RET01GYWN0b3JpZXM7IiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxNC1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIF9hc3NpZ24gPSByZXF1aXJlKCdvYmplY3QtYXNzaWduJyk7XG5cbnZhciBSZWFjdEN1cnJlbnRPd25lciA9IHJlcXVpcmUoJy4vUmVhY3RDdXJyZW50T3duZXInKTtcblxudmFyIHdhcm5pbmcgPSByZXF1aXJlKCdmYmpzL2xpYi93YXJuaW5nJyk7XG52YXIgY2FuRGVmaW5lUHJvcGVydHkgPSByZXF1aXJlKCcuL2NhbkRlZmluZVByb3BlcnR5Jyk7XG52YXIgaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuXG52YXIgUkVBQ1RfRUxFTUVOVF9UWVBFID0gcmVxdWlyZSgnLi9SZWFjdEVsZW1lbnRTeW1ib2wnKTtcblxudmFyIFJFU0VSVkVEX1BST1BTID0ge1xuICBrZXk6IHRydWUsXG4gIHJlZjogdHJ1ZSxcbiAgX19zZWxmOiB0cnVlLFxuICBfX3NvdXJjZTogdHJ1ZVxufTtcblxudmFyIHNwZWNpYWxQcm9wS2V5V2FybmluZ1Nob3duLCBzcGVjaWFsUHJvcFJlZldhcm5pbmdTaG93bjtcblxuZnVuY3Rpb24gaGFzVmFsaWRSZWYoY29uZmlnKSB7XG4gIGlmIChcImRldmVsb3BtZW50XCIgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKGNvbmZpZywgJ3JlZicpKSB7XG4gICAgICB2YXIgZ2V0dGVyID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihjb25maWcsICdyZWYnKS5nZXQ7XG4gICAgICBpZiAoZ2V0dGVyICYmIGdldHRlci5pc1JlYWN0V2FybmluZykge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBjb25maWcucmVmICE9PSB1bmRlZmluZWQ7XG59XG5cbmZ1bmN0aW9uIGhhc1ZhbGlkS2V5KGNvbmZpZykge1xuICBpZiAoXCJkZXZlbG9wbWVudFwiICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChjb25maWcsICdrZXknKSkge1xuICAgICAgdmFyIGdldHRlciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoY29uZmlnLCAna2V5JykuZ2V0O1xuICAgICAgaWYgKGdldHRlciAmJiBnZXR0ZXIuaXNSZWFjdFdhcm5pbmcpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gY29uZmlnLmtleSAhPT0gdW5kZWZpbmVkO1xufVxuXG5mdW5jdGlvbiBkZWZpbmVLZXlQcm9wV2FybmluZ0dldHRlcihwcm9wcywgZGlzcGxheU5hbWUpIHtcbiAgdmFyIHdhcm5BYm91dEFjY2Vzc2luZ0tleSA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoIXNwZWNpYWxQcm9wS2V5V2FybmluZ1Nob3duKSB7XG4gICAgICBzcGVjaWFsUHJvcEtleVdhcm5pbmdTaG93biA9IHRydWU7XG4gICAgICBcImRldmVsb3BtZW50XCIgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoZmFsc2UsICclczogYGtleWAgaXMgbm90IGEgcHJvcC4gVHJ5aW5nIHRvIGFjY2VzcyBpdCB3aWxsIHJlc3VsdCAnICsgJ2luIGB1bmRlZmluZWRgIGJlaW5nIHJldHVybmVkLiBJZiB5b3UgbmVlZCB0byBhY2Nlc3MgdGhlIHNhbWUgJyArICd2YWx1ZSB3aXRoaW4gdGhlIGNoaWxkIGNvbXBvbmVudCwgeW91IHNob3VsZCBwYXNzIGl0IGFzIGEgZGlmZmVyZW50ICcgKyAncHJvcC4gKGh0dHBzOi8vZmIubWUvcmVhY3Qtc3BlY2lhbC1wcm9wcyknLCBkaXNwbGF5TmFtZSkgOiB2b2lkIDA7XG4gICAgfVxuICB9O1xuICB3YXJuQWJvdXRBY2Nlc3NpbmdLZXkuaXNSZWFjdFdhcm5pbmcgPSB0cnVlO1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkocHJvcHMsICdrZXknLCB7XG4gICAgZ2V0OiB3YXJuQWJvdXRBY2Nlc3NpbmdLZXksXG4gICAgY29uZmlndXJhYmxlOiB0cnVlXG4gIH0pO1xufVxuXG5mdW5jdGlvbiBkZWZpbmVSZWZQcm9wV2FybmluZ0dldHRlcihwcm9wcywgZGlzcGxheU5hbWUpIHtcbiAgdmFyIHdhcm5BYm91dEFjY2Vzc2luZ1JlZiA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAoIXNwZWNpYWxQcm9wUmVmV2FybmluZ1Nob3duKSB7XG4gICAgICBzcGVjaWFsUHJvcFJlZldhcm5pbmdTaG93biA9IHRydWU7XG4gICAgICBcImRldmVsb3BtZW50XCIgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoZmFsc2UsICclczogYHJlZmAgaXMgbm90IGEgcHJvcC4gVHJ5aW5nIHRvIGFjY2VzcyBpdCB3aWxsIHJlc3VsdCAnICsgJ2luIGB1bmRlZmluZWRgIGJlaW5nIHJldHVybmVkLiBJZiB5b3UgbmVlZCB0byBhY2Nlc3MgdGhlIHNhbWUgJyArICd2YWx1ZSB3aXRoaW4gdGhlIGNoaWxkIGNvbXBvbmVudCwgeW91IHNob3VsZCBwYXNzIGl0IGFzIGEgZGlmZmVyZW50ICcgKyAncHJvcC4gKGh0dHBzOi8vZmIubWUvcmVhY3Qtc3BlY2lhbC1wcm9wcyknLCBkaXNwbGF5TmFtZSkgOiB2b2lkIDA7XG4gICAgfVxuICB9O1xuICB3YXJuQWJvdXRBY2Nlc3NpbmdSZWYuaXNSZWFjdFdhcm5pbmcgPSB0cnVlO1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkocHJvcHMsICdyZWYnLCB7XG4gICAgZ2V0OiB3YXJuQWJvdXRBY2Nlc3NpbmdSZWYsXG4gICAgY29uZmlndXJhYmxlOiB0cnVlXG4gIH0pO1xufVxuXG4vKipcbiAqIEZhY3RvcnkgbWV0aG9kIHRvIGNyZWF0ZSBhIG5ldyBSZWFjdCBlbGVtZW50LiBUaGlzIG5vIGxvbmdlciBhZGhlcmVzIHRvXG4gKiB0aGUgY2xhc3MgcGF0dGVybiwgc28gZG8gbm90IHVzZSBuZXcgdG8gY2FsbCBpdC4gQWxzbywgbm8gaW5zdGFuY2VvZiBjaGVja1xuICogd2lsbCB3b3JrLiBJbnN0ZWFkIHRlc3QgJCR0eXBlb2YgZmllbGQgYWdhaW5zdCBTeW1ib2wuZm9yKCdyZWFjdC5lbGVtZW50JykgdG8gY2hlY2tcbiAqIGlmIHNvbWV0aGluZyBpcyBhIFJlYWN0IEVsZW1lbnQuXG4gKlxuICogQHBhcmFtIHsqfSB0eXBlXG4gKiBAcGFyYW0geyp9IGtleVxuICogQHBhcmFtIHtzdHJpbmd8b2JqZWN0fSByZWZcbiAqIEBwYXJhbSB7Kn0gc2VsZiBBICp0ZW1wb3JhcnkqIGhlbHBlciB0byBkZXRlY3QgcGxhY2VzIHdoZXJlIGB0aGlzYCBpc1xuICogZGlmZmVyZW50IGZyb20gdGhlIGBvd25lcmAgd2hlbiBSZWFjdC5jcmVhdGVFbGVtZW50IGlzIGNhbGxlZCwgc28gdGhhdCB3ZVxuICogY2FuIHdhcm4uIFdlIHdhbnQgdG8gZ2V0IHJpZCBvZiBvd25lciBhbmQgcmVwbGFjZSBzdHJpbmcgYHJlZmBzIHdpdGggYXJyb3dcbiAqIGZ1bmN0aW9ucywgYW5kIGFzIGxvbmcgYXMgYHRoaXNgIGFuZCBvd25lciBhcmUgdGhlIHNhbWUsIHRoZXJlIHdpbGwgYmUgbm9cbiAqIGNoYW5nZSBpbiBiZWhhdmlvci5cbiAqIEBwYXJhbSB7Kn0gc291cmNlIEFuIGFubm90YXRpb24gb2JqZWN0IChhZGRlZCBieSBhIHRyYW5zcGlsZXIgb3Igb3RoZXJ3aXNlKVxuICogaW5kaWNhdGluZyBmaWxlbmFtZSwgbGluZSBudW1iZXIsIGFuZC9vciBvdGhlciBpbmZvcm1hdGlvbi5cbiAqIEBwYXJhbSB7Kn0gb3duZXJcbiAqIEBwYXJhbSB7Kn0gcHJvcHNcbiAqIEBpbnRlcm5hbFxuICovXG52YXIgUmVhY3RFbGVtZW50ID0gZnVuY3Rpb24gKHR5cGUsIGtleSwgcmVmLCBzZWxmLCBzb3VyY2UsIG93bmVyLCBwcm9wcykge1xuICB2YXIgZWxlbWVudCA9IHtcbiAgICAvLyBUaGlzIHRhZyBhbGxvdyB1cyB0byB1bmlxdWVseSBpZGVudGlmeSB0aGlzIGFzIGEgUmVhY3QgRWxlbWVudFxuICAgICQkdHlwZW9mOiBSRUFDVF9FTEVNRU5UX1RZUEUsXG5cbiAgICAvLyBCdWlsdC1pbiBwcm9wZXJ0aWVzIHRoYXQgYmVsb25nIG9uIHRoZSBlbGVtZW50XG4gICAgdHlwZTogdHlwZSxcbiAgICBrZXk6IGtleSxcbiAgICByZWY6IHJlZixcbiAgICBwcm9wczogcHJvcHMsXG5cbiAgICAvLyBSZWNvcmQgdGhlIGNvbXBvbmVudCByZXNwb25zaWJsZSBmb3IgY3JlYXRpbmcgdGhpcyBlbGVtZW50LlxuICAgIF9vd25lcjogb3duZXJcbiAgfTtcblxuICBpZiAoXCJkZXZlbG9wbWVudFwiICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAvLyBUaGUgdmFsaWRhdGlvbiBmbGFnIGlzIGN1cnJlbnRseSBtdXRhdGl2ZS4gV2UgcHV0IGl0IG9uXG4gICAgLy8gYW4gZXh0ZXJuYWwgYmFja2luZyBzdG9yZSBzbyB0aGF0IHdlIGNhbiBmcmVlemUgdGhlIHdob2xlIG9iamVjdC5cbiAgICAvLyBUaGlzIGNhbiBiZSByZXBsYWNlZCB3aXRoIGEgV2Vha01hcCBvbmNlIHRoZXkgYXJlIGltcGxlbWVudGVkIGluXG4gICAgLy8gY29tbW9ubHkgdXNlZCBkZXZlbG9wbWVudCBlbnZpcm9ubWVudHMuXG4gICAgZWxlbWVudC5fc3RvcmUgPSB7fTtcblxuICAgIC8vIFRvIG1ha2UgY29tcGFyaW5nIFJlYWN0RWxlbWVudHMgZWFzaWVyIGZvciB0ZXN0aW5nIHB1cnBvc2VzLCB3ZSBtYWtlXG4gICAgLy8gdGhlIHZhbGlkYXRpb24gZmxhZyBub24tZW51bWVyYWJsZSAod2hlcmUgcG9zc2libGUsIHdoaWNoIHNob3VsZFxuICAgIC8vIGluY2x1ZGUgZXZlcnkgZW52aXJvbm1lbnQgd2UgcnVuIHRlc3RzIGluKSwgc28gdGhlIHRlc3QgZnJhbWV3b3JrXG4gICAgLy8gaWdub3JlcyBpdC5cbiAgICBpZiAoY2FuRGVmaW5lUHJvcGVydHkpIHtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlbGVtZW50Ll9zdG9yZSwgJ3ZhbGlkYXRlZCcsIHtcbiAgICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSxcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgICB2YWx1ZTogZmFsc2VcbiAgICAgIH0pO1xuICAgICAgLy8gc2VsZiBhbmQgc291cmNlIGFyZSBERVYgb25seSBwcm9wZXJ0aWVzLlxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGVsZW1lbnQsICdfc2VsZicsIHtcbiAgICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSxcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgIHdyaXRhYmxlOiBmYWxzZSxcbiAgICAgICAgdmFsdWU6IHNlbGZcbiAgICAgIH0pO1xuICAgICAgLy8gVHdvIGVsZW1lbnRzIGNyZWF0ZWQgaW4gdHdvIGRpZmZlcmVudCBwbGFjZXMgc2hvdWxkIGJlIGNvbnNpZGVyZWRcbiAgICAgIC8vIGVxdWFsIGZvciB0ZXN0aW5nIHB1cnBvc2VzIGFuZCB0aGVyZWZvcmUgd2UgaGlkZSBpdCBmcm9tIGVudW1lcmF0aW9uLlxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGVsZW1lbnQsICdfc291cmNlJywge1xuICAgICAgICBjb25maWd1cmFibGU6IGZhbHNlLFxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgd3JpdGFibGU6IGZhbHNlLFxuICAgICAgICB2YWx1ZTogc291cmNlXG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgZWxlbWVudC5fc3RvcmUudmFsaWRhdGVkID0gZmFsc2U7XG4gICAgICBlbGVtZW50Ll9zZWxmID0gc2VsZjtcbiAgICAgIGVsZW1lbnQuX3NvdXJjZSA9IHNvdXJjZTtcbiAgICB9XG4gICAgaWYgKE9iamVjdC5mcmVlemUpIHtcbiAgICAgIE9iamVjdC5mcmVlemUoZWxlbWVudC5wcm9wcyk7XG4gICAgICBPYmplY3QuZnJlZXplKGVsZW1lbnQpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBlbGVtZW50O1xufTtcblxuLyoqXG4gKiBDcmVhdGUgYW5kIHJldHVybiBhIG5ldyBSZWFjdEVsZW1lbnQgb2YgdGhlIGdpdmVuIHR5cGUuXG4gKiBTZWUgaHR0cHM6Ly9mYWNlYm9vay5naXRodWIuaW8vcmVhY3QvZG9jcy90b3AtbGV2ZWwtYXBpLmh0bWwjcmVhY3QuY3JlYXRlZWxlbWVudFxuICovXG5SZWFjdEVsZW1lbnQuY3JlYXRlRWxlbWVudCA9IGZ1bmN0aW9uICh0eXBlLCBjb25maWcsIGNoaWxkcmVuKSB7XG4gIHZhciBwcm9wTmFtZTtcblxuICAvLyBSZXNlcnZlZCBuYW1lcyBhcmUgZXh0cmFjdGVkXG4gIHZhciBwcm9wcyA9IHt9O1xuXG4gIHZhciBrZXkgPSBudWxsO1xuICB2YXIgcmVmID0gbnVsbDtcbiAgdmFyIHNlbGYgPSBudWxsO1xuICB2YXIgc291cmNlID0gbnVsbDtcblxuICBpZiAoY29uZmlnICE9IG51bGwpIHtcbiAgICBpZiAoaGFzVmFsaWRSZWYoY29uZmlnKSkge1xuICAgICAgcmVmID0gY29uZmlnLnJlZjtcbiAgICB9XG4gICAgaWYgKGhhc1ZhbGlkS2V5KGNvbmZpZykpIHtcbiAgICAgIGtleSA9ICcnICsgY29uZmlnLmtleTtcbiAgICB9XG5cbiAgICBzZWxmID0gY29uZmlnLl9fc2VsZiA9PT0gdW5kZWZpbmVkID8gbnVsbCA6IGNvbmZpZy5fX3NlbGY7XG4gICAgc291cmNlID0gY29uZmlnLl9fc291cmNlID09PSB1bmRlZmluZWQgPyBudWxsIDogY29uZmlnLl9fc291cmNlO1xuICAgIC8vIFJlbWFpbmluZyBwcm9wZXJ0aWVzIGFyZSBhZGRlZCB0byBhIG5ldyBwcm9wcyBvYmplY3RcbiAgICBmb3IgKHByb3BOYW1lIGluIGNvbmZpZykge1xuICAgICAgaWYgKGhhc093blByb3BlcnR5LmNhbGwoY29uZmlnLCBwcm9wTmFtZSkgJiYgIVJFU0VSVkVEX1BST1BTLmhhc093blByb3BlcnR5KHByb3BOYW1lKSkge1xuICAgICAgICBwcm9wc1twcm9wTmFtZV0gPSBjb25maWdbcHJvcE5hbWVdO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIENoaWxkcmVuIGNhbiBiZSBtb3JlIHRoYW4gb25lIGFyZ3VtZW50LCBhbmQgdGhvc2UgYXJlIHRyYW5zZmVycmVkIG9udG9cbiAgLy8gdGhlIG5ld2x5IGFsbG9jYXRlZCBwcm9wcyBvYmplY3QuXG4gIHZhciBjaGlsZHJlbkxlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGggLSAyO1xuICBpZiAoY2hpbGRyZW5MZW5ndGggPT09IDEpIHtcbiAgICBwcm9wcy5jaGlsZHJlbiA9IGNoaWxkcmVuO1xuICB9IGVsc2UgaWYgKGNoaWxkcmVuTGVuZ3RoID4gMSkge1xuICAgIHZhciBjaGlsZEFycmF5ID0gQXJyYXkoY2hpbGRyZW5MZW5ndGgpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2hpbGRyZW5MZW5ndGg7IGkrKykge1xuICAgICAgY2hpbGRBcnJheVtpXSA9IGFyZ3VtZW50c1tpICsgMl07XG4gICAgfVxuICAgIGlmIChcImRldmVsb3BtZW50XCIgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgaWYgKE9iamVjdC5mcmVlemUpIHtcbiAgICAgICAgT2JqZWN0LmZyZWV6ZShjaGlsZEFycmF5KTtcbiAgICAgIH1cbiAgICB9XG4gICAgcHJvcHMuY2hpbGRyZW4gPSBjaGlsZEFycmF5O1xuICB9XG5cbiAgLy8gUmVzb2x2ZSBkZWZhdWx0IHByb3BzXG4gIGlmICh0eXBlICYmIHR5cGUuZGVmYXVsdFByb3BzKSB7XG4gICAgdmFyIGRlZmF1bHRQcm9wcyA9IHR5cGUuZGVmYXVsdFByb3BzO1xuICAgIGZvciAocHJvcE5hbWUgaW4gZGVmYXVsdFByb3BzKSB7XG4gICAgICBpZiAocHJvcHNbcHJvcE5hbWVdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcHJvcHNbcHJvcE5hbWVdID0gZGVmYXVsdFByb3BzW3Byb3BOYW1lXTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgaWYgKFwiZGV2ZWxvcG1lbnRcIiAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgaWYgKGtleSB8fCByZWYpIHtcbiAgICAgIGlmICh0eXBlb2YgcHJvcHMuJCR0eXBlb2YgPT09ICd1bmRlZmluZWQnIHx8IHByb3BzLiQkdHlwZW9mICE9PSBSRUFDVF9FTEVNRU5UX1RZUEUpIHtcbiAgICAgICAgdmFyIGRpc3BsYXlOYW1lID0gdHlwZW9mIHR5cGUgPT09ICdmdW5jdGlvbicgPyB0eXBlLmRpc3BsYXlOYW1lIHx8IHR5cGUubmFtZSB8fCAnVW5rbm93bicgOiB0eXBlO1xuICAgICAgICBpZiAoa2V5KSB7XG4gICAgICAgICAgZGVmaW5lS2V5UHJvcFdhcm5pbmdHZXR0ZXIocHJvcHMsIGRpc3BsYXlOYW1lKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocmVmKSB7XG4gICAgICAgICAgZGVmaW5lUmVmUHJvcFdhcm5pbmdHZXR0ZXIocHJvcHMsIGRpc3BsYXlOYW1lKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gUmVhY3RFbGVtZW50KHR5cGUsIGtleSwgcmVmLCBzZWxmLCBzb3VyY2UsIFJlYWN0Q3VycmVudE93bmVyLmN1cnJlbnQsIHByb3BzKTtcbn07XG5cbi8qKlxuICogUmV0dXJuIGEgZnVuY3Rpb24gdGhhdCBwcm9kdWNlcyBSZWFjdEVsZW1lbnRzIG9mIGEgZ2l2ZW4gdHlwZS5cbiAqIFNlZSBodHRwczovL2ZhY2Vib29rLmdpdGh1Yi5pby9yZWFjdC9kb2NzL3RvcC1sZXZlbC1hcGkuaHRtbCNyZWFjdC5jcmVhdGVmYWN0b3J5XG4gKi9cblJlYWN0RWxlbWVudC5jcmVhdGVGYWN0b3J5ID0gZnVuY3Rpb24gKHR5cGUpIHtcbiAgdmFyIGZhY3RvcnkgPSBSZWFjdEVsZW1lbnQuY3JlYXRlRWxlbWVudC5iaW5kKG51bGwsIHR5cGUpO1xuICAvLyBFeHBvc2UgdGhlIHR5cGUgb24gdGhlIGZhY3RvcnkgYW5kIHRoZSBwcm90b3R5cGUgc28gdGhhdCBpdCBjYW4gYmVcbiAgLy8gZWFzaWx5IGFjY2Vzc2VkIG9uIGVsZW1lbnRzLiBFLmcuIGA8Rm9vIC8+LnR5cGUgPT09IEZvb2AuXG4gIC8vIFRoaXMgc2hvdWxkIG5vdCBiZSBuYW1lZCBgY29uc3RydWN0b3JgIHNpbmNlIHRoaXMgbWF5IG5vdCBiZSB0aGUgZnVuY3Rpb25cbiAgLy8gdGhhdCBjcmVhdGVkIHRoZSBlbGVtZW50LCBhbmQgaXQgbWF5IG5vdCBldmVuIGJlIGEgY29uc3RydWN0b3IuXG4gIC8vIExlZ2FjeSBob29rIFRPRE86IFdhcm4gaWYgdGhpcyBpcyBhY2Nlc3NlZFxuICBmYWN0b3J5LnR5cGUgPSB0eXBlO1xuICByZXR1cm4gZmFjdG9yeTtcbn07XG5cblJlYWN0RWxlbWVudC5jbG9uZUFuZFJlcGxhY2VLZXkgPSBmdW5jdGlvbiAob2xkRWxlbWVudCwgbmV3S2V5KSB7XG4gIHZhciBuZXdFbGVtZW50ID0gUmVhY3RFbGVtZW50KG9sZEVsZW1lbnQudHlwZSwgbmV3S2V5LCBvbGRFbGVtZW50LnJlZiwgb2xkRWxlbWVudC5fc2VsZiwgb2xkRWxlbWVudC5fc291cmNlLCBvbGRFbGVtZW50Ll9vd25lciwgb2xkRWxlbWVudC5wcm9wcyk7XG5cbiAgcmV0dXJuIG5ld0VsZW1lbnQ7XG59O1xuXG4vKipcbiAqIENsb25lIGFuZCByZXR1cm4gYSBuZXcgUmVhY3RFbGVtZW50IHVzaW5nIGVsZW1lbnQgYXMgdGhlIHN0YXJ0aW5nIHBvaW50LlxuICogU2VlIGh0dHBzOi8vZmFjZWJvb2suZ2l0aHViLmlvL3JlYWN0L2RvY3MvdG9wLWxldmVsLWFwaS5odG1sI3JlYWN0LmNsb25lZWxlbWVudFxuICovXG5SZWFjdEVsZW1lbnQuY2xvbmVFbGVtZW50ID0gZnVuY3Rpb24gKGVsZW1lbnQsIGNvbmZpZywgY2hpbGRyZW4pIHtcbiAgdmFyIHByb3BOYW1lO1xuXG4gIC8vIE9yaWdpbmFsIHByb3BzIGFyZSBjb3BpZWRcbiAgdmFyIHByb3BzID0gX2Fzc2lnbih7fSwgZWxlbWVudC5wcm9wcyk7XG5cbiAgLy8gUmVzZXJ2ZWQgbmFtZXMgYXJlIGV4dHJhY3RlZFxuICB2YXIga2V5ID0gZWxlbWVudC5rZXk7XG4gIHZhciByZWYgPSBlbGVtZW50LnJlZjtcbiAgLy8gU2VsZiBpcyBwcmVzZXJ2ZWQgc2luY2UgdGhlIG93bmVyIGlzIHByZXNlcnZlZC5cbiAgdmFyIHNlbGYgPSBlbGVtZW50Ll9zZWxmO1xuICAvLyBTb3VyY2UgaXMgcHJlc2VydmVkIHNpbmNlIGNsb25lRWxlbWVudCBpcyB1bmxpa2VseSB0byBiZSB0YXJnZXRlZCBieSBhXG4gIC8vIHRyYW5zcGlsZXIsIGFuZCB0aGUgb3JpZ2luYWwgc291cmNlIGlzIHByb2JhYmx5IGEgYmV0dGVyIGluZGljYXRvciBvZiB0aGVcbiAgLy8gdHJ1ZSBvd25lci5cbiAgdmFyIHNvdXJjZSA9IGVsZW1lbnQuX3NvdXJjZTtcblxuICAvLyBPd25lciB3aWxsIGJlIHByZXNlcnZlZCwgdW5sZXNzIHJlZiBpcyBvdmVycmlkZGVuXG4gIHZhciBvd25lciA9IGVsZW1lbnQuX293bmVyO1xuXG4gIGlmIChjb25maWcgIT0gbnVsbCkge1xuICAgIGlmIChoYXNWYWxpZFJlZihjb25maWcpKSB7XG4gICAgICAvLyBTaWxlbnRseSBzdGVhbCB0aGUgcmVmIGZyb20gdGhlIHBhcmVudC5cbiAgICAgIHJlZiA9IGNvbmZpZy5yZWY7XG4gICAgICBvd25lciA9IFJlYWN0Q3VycmVudE93bmVyLmN1cnJlbnQ7XG4gICAgfVxuICAgIGlmIChoYXNWYWxpZEtleShjb25maWcpKSB7XG4gICAgICBrZXkgPSAnJyArIGNvbmZpZy5rZXk7XG4gICAgfVxuXG4gICAgLy8gUmVtYWluaW5nIHByb3BlcnRpZXMgb3ZlcnJpZGUgZXhpc3RpbmcgcHJvcHNcbiAgICB2YXIgZGVmYXVsdFByb3BzO1xuICAgIGlmIChlbGVtZW50LnR5cGUgJiYgZWxlbWVudC50eXBlLmRlZmF1bHRQcm9wcykge1xuICAgICAgZGVmYXVsdFByb3BzID0gZWxlbWVudC50eXBlLmRlZmF1bHRQcm9wcztcbiAgICB9XG4gICAgZm9yIChwcm9wTmFtZSBpbiBjb25maWcpIHtcbiAgICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKGNvbmZpZywgcHJvcE5hbWUpICYmICFSRVNFUlZFRF9QUk9QUy5oYXNPd25Qcm9wZXJ0eShwcm9wTmFtZSkpIHtcbiAgICAgICAgaWYgKGNvbmZpZ1twcm9wTmFtZV0gPT09IHVuZGVmaW5lZCAmJiBkZWZhdWx0UHJvcHMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIC8vIFJlc29sdmUgZGVmYXVsdCBwcm9wc1xuICAgICAgICAgIHByb3BzW3Byb3BOYW1lXSA9IGRlZmF1bHRQcm9wc1twcm9wTmFtZV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcHJvcHNbcHJvcE5hbWVdID0gY29uZmlnW3Byb3BOYW1lXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIENoaWxkcmVuIGNhbiBiZSBtb3JlIHRoYW4gb25lIGFyZ3VtZW50LCBhbmQgdGhvc2UgYXJlIHRyYW5zZmVycmVkIG9udG9cbiAgLy8gdGhlIG5ld2x5IGFsbG9jYXRlZCBwcm9wcyBvYmplY3QuXG4gIHZhciBjaGlsZHJlbkxlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGggLSAyO1xuICBpZiAoY2hpbGRyZW5MZW5ndGggPT09IDEpIHtcbiAgICBwcm9wcy5jaGlsZHJlbiA9IGNoaWxkcmVuO1xuICB9IGVsc2UgaWYgKGNoaWxkcmVuTGVuZ3RoID4gMSkge1xuICAgIHZhciBjaGlsZEFycmF5ID0gQXJyYXkoY2hpbGRyZW5MZW5ndGgpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2hpbGRyZW5MZW5ndGg7IGkrKykge1xuICAgICAgY2hpbGRBcnJheVtpXSA9IGFyZ3VtZW50c1tpICsgMl07XG4gICAgfVxuICAgIHByb3BzLmNoaWxkcmVuID0gY2hpbGRBcnJheTtcbiAgfVxuXG4gIHJldHVybiBSZWFjdEVsZW1lbnQoZWxlbWVudC50eXBlLCBrZXksIHJlZiwgc2VsZiwgc291cmNlLCBvd25lciwgcHJvcHMpO1xufTtcblxuLyoqXG4gKiBWZXJpZmllcyB0aGUgb2JqZWN0IGlzIGEgUmVhY3RFbGVtZW50LlxuICogU2VlIGh0dHBzOi8vZmFjZWJvb2suZ2l0aHViLmlvL3JlYWN0L2RvY3MvdG9wLWxldmVsLWFwaS5odG1sI3JlYWN0LmlzdmFsaWRlbGVtZW50XG4gKiBAcGFyYW0gez9vYmplY3R9IG9iamVjdFxuICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBpZiBgb2JqZWN0YCBpcyBhIHZhbGlkIGNvbXBvbmVudC5cbiAqIEBmaW5hbFxuICovXG5SZWFjdEVsZW1lbnQuaXNWYWxpZEVsZW1lbnQgPSBmdW5jdGlvbiAob2JqZWN0KSB7XG4gIHJldHVybiB0eXBlb2Ygb2JqZWN0ID09PSAnb2JqZWN0JyAmJiBvYmplY3QgIT09IG51bGwgJiYgb2JqZWN0LiQkdHlwZW9mID09PSBSRUFDVF9FTEVNRU5UX1RZUEU7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0RWxlbWVudDsiLCIvKipcbiAqIENvcHlyaWdodCAyMDE0LXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbi8vIFRoZSBTeW1ib2wgdXNlZCB0byB0YWcgdGhlIFJlYWN0RWxlbWVudCB0eXBlLiBJZiB0aGVyZSBpcyBubyBuYXRpdmUgU3ltYm9sXG4vLyBub3IgcG9seWZpbGwsIHRoZW4gYSBwbGFpbiBudW1iZXIgaXMgdXNlZCBmb3IgcGVyZm9ybWFuY2UuXG5cbnZhciBSRUFDVF9FTEVNRU5UX1RZUEUgPSB0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nICYmIFN5bWJvbFsnZm9yJ10gJiYgU3ltYm9sWydmb3InXSgncmVhY3QuZWxlbWVudCcpIHx8IDB4ZWFjNztcblxubW9kdWxlLmV4cG9ydHMgPSBSRUFDVF9FTEVNRU5UX1RZUEU7IiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxNC1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICovXG5cbi8qKlxuICogUmVhY3RFbGVtZW50VmFsaWRhdG9yIHByb3ZpZGVzIGEgd3JhcHBlciBhcm91bmQgYSBlbGVtZW50IGZhY3RvcnlcbiAqIHdoaWNoIHZhbGlkYXRlcyB0aGUgcHJvcHMgcGFzc2VkIHRvIHRoZSBlbGVtZW50LiBUaGlzIGlzIGludGVuZGVkIHRvIGJlXG4gKiB1c2VkIG9ubHkgaW4gREVWIGFuZCBjb3VsZCBiZSByZXBsYWNlZCBieSBhIHN0YXRpYyB0eXBlIGNoZWNrZXIgZm9yIGxhbmd1YWdlc1xuICogdGhhdCBzdXBwb3J0IGl0LlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFJlYWN0Q3VycmVudE93bmVyID0gcmVxdWlyZSgnLi9SZWFjdEN1cnJlbnRPd25lcicpO1xudmFyIFJlYWN0Q29tcG9uZW50VHJlZUhvb2sgPSByZXF1aXJlKCcuL1JlYWN0Q29tcG9uZW50VHJlZUhvb2snKTtcbnZhciBSZWFjdEVsZW1lbnQgPSByZXF1aXJlKCcuL1JlYWN0RWxlbWVudCcpO1xuXG52YXIgY2hlY2tSZWFjdFR5cGVTcGVjID0gcmVxdWlyZSgnLi9jaGVja1JlYWN0VHlwZVNwZWMnKTtcblxudmFyIGNhbkRlZmluZVByb3BlcnR5ID0gcmVxdWlyZSgnLi9jYW5EZWZpbmVQcm9wZXJ0eScpO1xudmFyIGdldEl0ZXJhdG9yRm4gPSByZXF1aXJlKCcuL2dldEl0ZXJhdG9yRm4nKTtcbnZhciB3YXJuaW5nID0gcmVxdWlyZSgnZmJqcy9saWIvd2FybmluZycpO1xuXG5mdW5jdGlvbiBnZXREZWNsYXJhdGlvbkVycm9yQWRkZW5kdW0oKSB7XG4gIGlmIChSZWFjdEN1cnJlbnRPd25lci5jdXJyZW50KSB7XG4gICAgdmFyIG5hbWUgPSBSZWFjdEN1cnJlbnRPd25lci5jdXJyZW50LmdldE5hbWUoKTtcbiAgICBpZiAobmFtZSkge1xuICAgICAgcmV0dXJuICcgQ2hlY2sgdGhlIHJlbmRlciBtZXRob2Qgb2YgYCcgKyBuYW1lICsgJ2AuJztcbiAgICB9XG4gIH1cbiAgcmV0dXJuICcnO1xufVxuXG4vKipcbiAqIFdhcm4gaWYgdGhlcmUncyBubyBrZXkgZXhwbGljaXRseSBzZXQgb24gZHluYW1pYyBhcnJheXMgb2YgY2hpbGRyZW4gb3JcbiAqIG9iamVjdCBrZXlzIGFyZSBub3QgdmFsaWQuIFRoaXMgYWxsb3dzIHVzIHRvIGtlZXAgdHJhY2sgb2YgY2hpbGRyZW4gYmV0d2VlblxuICogdXBkYXRlcy5cbiAqL1xudmFyIG93bmVySGFzS2V5VXNlV2FybmluZyA9IHt9O1xuXG5mdW5jdGlvbiBnZXRDdXJyZW50Q29tcG9uZW50RXJyb3JJbmZvKHBhcmVudFR5cGUpIHtcbiAgdmFyIGluZm8gPSBnZXREZWNsYXJhdGlvbkVycm9yQWRkZW5kdW0oKTtcblxuICBpZiAoIWluZm8pIHtcbiAgICB2YXIgcGFyZW50TmFtZSA9IHR5cGVvZiBwYXJlbnRUeXBlID09PSAnc3RyaW5nJyA/IHBhcmVudFR5cGUgOiBwYXJlbnRUeXBlLmRpc3BsYXlOYW1lIHx8IHBhcmVudFR5cGUubmFtZTtcbiAgICBpZiAocGFyZW50TmFtZSkge1xuICAgICAgaW5mbyA9ICcgQ2hlY2sgdGhlIHRvcC1sZXZlbCByZW5kZXIgY2FsbCB1c2luZyA8JyArIHBhcmVudE5hbWUgKyAnPi4nO1xuICAgIH1cbiAgfVxuICByZXR1cm4gaW5mbztcbn1cblxuLyoqXG4gKiBXYXJuIGlmIHRoZSBlbGVtZW50IGRvZXNuJ3QgaGF2ZSBhbiBleHBsaWNpdCBrZXkgYXNzaWduZWQgdG8gaXQuXG4gKiBUaGlzIGVsZW1lbnQgaXMgaW4gYW4gYXJyYXkuIFRoZSBhcnJheSBjb3VsZCBncm93IGFuZCBzaHJpbmsgb3IgYmVcbiAqIHJlb3JkZXJlZC4gQWxsIGNoaWxkcmVuIHRoYXQgaGF2ZW4ndCBhbHJlYWR5IGJlZW4gdmFsaWRhdGVkIGFyZSByZXF1aXJlZCB0b1xuICogaGF2ZSBhIFwia2V5XCIgcHJvcGVydHkgYXNzaWduZWQgdG8gaXQuIEVycm9yIHN0YXR1c2VzIGFyZSBjYWNoZWQgc28gYSB3YXJuaW5nXG4gKiB3aWxsIG9ubHkgYmUgc2hvd24gb25jZS5cbiAqXG4gKiBAaW50ZXJuYWxcbiAqIEBwYXJhbSB7UmVhY3RFbGVtZW50fSBlbGVtZW50IEVsZW1lbnQgdGhhdCByZXF1aXJlcyBhIGtleS5cbiAqIEBwYXJhbSB7Kn0gcGFyZW50VHlwZSBlbGVtZW50J3MgcGFyZW50J3MgdHlwZS5cbiAqL1xuZnVuY3Rpb24gdmFsaWRhdGVFeHBsaWNpdEtleShlbGVtZW50LCBwYXJlbnRUeXBlKSB7XG4gIGlmICghZWxlbWVudC5fc3RvcmUgfHwgZWxlbWVudC5fc3RvcmUudmFsaWRhdGVkIHx8IGVsZW1lbnQua2V5ICE9IG51bGwpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgZWxlbWVudC5fc3RvcmUudmFsaWRhdGVkID0gdHJ1ZTtcblxuICB2YXIgbWVtb2l6ZXIgPSBvd25lckhhc0tleVVzZVdhcm5pbmcudW5pcXVlS2V5IHx8IChvd25lckhhc0tleVVzZVdhcm5pbmcudW5pcXVlS2V5ID0ge30pO1xuXG4gIHZhciBjdXJyZW50Q29tcG9uZW50RXJyb3JJbmZvID0gZ2V0Q3VycmVudENvbXBvbmVudEVycm9ySW5mbyhwYXJlbnRUeXBlKTtcbiAgaWYgKG1lbW9pemVyW2N1cnJlbnRDb21wb25lbnRFcnJvckluZm9dKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIG1lbW9pemVyW2N1cnJlbnRDb21wb25lbnRFcnJvckluZm9dID0gdHJ1ZTtcblxuICAvLyBVc3VhbGx5IHRoZSBjdXJyZW50IG93bmVyIGlzIHRoZSBvZmZlbmRlciwgYnV0IGlmIGl0IGFjY2VwdHMgY2hpbGRyZW4gYXMgYVxuICAvLyBwcm9wZXJ0eSwgaXQgbWF5IGJlIHRoZSBjcmVhdG9yIG9mIHRoZSBjaGlsZCB0aGF0J3MgcmVzcG9uc2libGUgZm9yXG4gIC8vIGFzc2lnbmluZyBpdCBhIGtleS5cbiAgdmFyIGNoaWxkT3duZXIgPSAnJztcbiAgaWYgKGVsZW1lbnQgJiYgZWxlbWVudC5fb3duZXIgJiYgZWxlbWVudC5fb3duZXIgIT09IFJlYWN0Q3VycmVudE93bmVyLmN1cnJlbnQpIHtcbiAgICAvLyBHaXZlIHRoZSBjb21wb25lbnQgdGhhdCBvcmlnaW5hbGx5IGNyZWF0ZWQgdGhpcyBjaGlsZC5cbiAgICBjaGlsZE93bmVyID0gJyBJdCB3YXMgcGFzc2VkIGEgY2hpbGQgZnJvbSAnICsgZWxlbWVudC5fb3duZXIuZ2V0TmFtZSgpICsgJy4nO1xuICB9XG5cbiAgXCJkZXZlbG9wbWVudFwiICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKGZhbHNlLCAnRWFjaCBjaGlsZCBpbiBhbiBhcnJheSBvciBpdGVyYXRvciBzaG91bGQgaGF2ZSBhIHVuaXF1ZSBcImtleVwiIHByb3AuJyArICclcyVzIFNlZSBodHRwczovL2ZiLm1lL3JlYWN0LXdhcm5pbmcta2V5cyBmb3IgbW9yZSBpbmZvcm1hdGlvbi4lcycsIGN1cnJlbnRDb21wb25lbnRFcnJvckluZm8sIGNoaWxkT3duZXIsIFJlYWN0Q29tcG9uZW50VHJlZUhvb2suZ2V0Q3VycmVudFN0YWNrQWRkZW5kdW0oZWxlbWVudCkpIDogdm9pZCAwO1xufVxuXG4vKipcbiAqIEVuc3VyZSB0aGF0IGV2ZXJ5IGVsZW1lbnQgZWl0aGVyIGlzIHBhc3NlZCBpbiBhIHN0YXRpYyBsb2NhdGlvbiwgaW4gYW5cbiAqIGFycmF5IHdpdGggYW4gZXhwbGljaXQga2V5cyBwcm9wZXJ0eSBkZWZpbmVkLCBvciBpbiBhbiBvYmplY3QgbGl0ZXJhbFxuICogd2l0aCB2YWxpZCBrZXkgcHJvcGVydHkuXG4gKlxuICogQGludGVybmFsXG4gKiBAcGFyYW0ge1JlYWN0Tm9kZX0gbm9kZSBTdGF0aWNhbGx5IHBhc3NlZCBjaGlsZCBvZiBhbnkgdHlwZS5cbiAqIEBwYXJhbSB7Kn0gcGFyZW50VHlwZSBub2RlJ3MgcGFyZW50J3MgdHlwZS5cbiAqL1xuZnVuY3Rpb24gdmFsaWRhdGVDaGlsZEtleXMobm9kZSwgcGFyZW50VHlwZSkge1xuICBpZiAodHlwZW9mIG5vZGUgIT09ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChBcnJheS5pc0FycmF5KG5vZGUpKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBub2RlLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgY2hpbGQgPSBub2RlW2ldO1xuICAgICAgaWYgKFJlYWN0RWxlbWVudC5pc1ZhbGlkRWxlbWVudChjaGlsZCkpIHtcbiAgICAgICAgdmFsaWRhdGVFeHBsaWNpdEtleShjaGlsZCwgcGFyZW50VHlwZSk7XG4gICAgICB9XG4gICAgfVxuICB9IGVsc2UgaWYgKFJlYWN0RWxlbWVudC5pc1ZhbGlkRWxlbWVudChub2RlKSkge1xuICAgIC8vIFRoaXMgZWxlbWVudCB3YXMgcGFzc2VkIGluIGEgdmFsaWQgbG9jYXRpb24uXG4gICAgaWYgKG5vZGUuX3N0b3JlKSB7XG4gICAgICBub2RlLl9zdG9yZS52YWxpZGF0ZWQgPSB0cnVlO1xuICAgIH1cbiAgfSBlbHNlIGlmIChub2RlKSB7XG4gICAgdmFyIGl0ZXJhdG9yRm4gPSBnZXRJdGVyYXRvckZuKG5vZGUpO1xuICAgIC8vIEVudHJ5IGl0ZXJhdG9ycyBwcm92aWRlIGltcGxpY2l0IGtleXMuXG4gICAgaWYgKGl0ZXJhdG9yRm4pIHtcbiAgICAgIGlmIChpdGVyYXRvckZuICE9PSBub2RlLmVudHJpZXMpIHtcbiAgICAgICAgdmFyIGl0ZXJhdG9yID0gaXRlcmF0b3JGbi5jYWxsKG5vZGUpO1xuICAgICAgICB2YXIgc3RlcDtcbiAgICAgICAgd2hpbGUgKCEoc3RlcCA9IGl0ZXJhdG9yLm5leHQoKSkuZG9uZSkge1xuICAgICAgICAgIGlmIChSZWFjdEVsZW1lbnQuaXNWYWxpZEVsZW1lbnQoc3RlcC52YWx1ZSkpIHtcbiAgICAgICAgICAgIHZhbGlkYXRlRXhwbGljaXRLZXkoc3RlcC52YWx1ZSwgcGFyZW50VHlwZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogR2l2ZW4gYW4gZWxlbWVudCwgdmFsaWRhdGUgdGhhdCBpdHMgcHJvcHMgZm9sbG93IHRoZSBwcm9wVHlwZXMgZGVmaW5pdGlvbixcbiAqIHByb3ZpZGVkIGJ5IHRoZSB0eXBlLlxuICpcbiAqIEBwYXJhbSB7UmVhY3RFbGVtZW50fSBlbGVtZW50XG4gKi9cbmZ1bmN0aW9uIHZhbGlkYXRlUHJvcFR5cGVzKGVsZW1lbnQpIHtcbiAgdmFyIGNvbXBvbmVudENsYXNzID0gZWxlbWVudC50eXBlO1xuICBpZiAodHlwZW9mIGNvbXBvbmVudENsYXNzICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhciBuYW1lID0gY29tcG9uZW50Q2xhc3MuZGlzcGxheU5hbWUgfHwgY29tcG9uZW50Q2xhc3MubmFtZTtcbiAgaWYgKGNvbXBvbmVudENsYXNzLnByb3BUeXBlcykge1xuICAgIGNoZWNrUmVhY3RUeXBlU3BlYyhjb21wb25lbnRDbGFzcy5wcm9wVHlwZXMsIGVsZW1lbnQucHJvcHMsICdwcm9wJywgbmFtZSwgZWxlbWVudCwgbnVsbCk7XG4gIH1cbiAgaWYgKHR5cGVvZiBjb21wb25lbnRDbGFzcy5nZXREZWZhdWx0UHJvcHMgPT09ICdmdW5jdGlvbicpIHtcbiAgICBcImRldmVsb3BtZW50XCIgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoY29tcG9uZW50Q2xhc3MuZ2V0RGVmYXVsdFByb3BzLmlzUmVhY3RDbGFzc0FwcHJvdmVkLCAnZ2V0RGVmYXVsdFByb3BzIGlzIG9ubHkgdXNlZCBvbiBjbGFzc2ljIFJlYWN0LmNyZWF0ZUNsYXNzICcgKyAnZGVmaW5pdGlvbnMuIFVzZSBhIHN0YXRpYyBwcm9wZXJ0eSBuYW1lZCBgZGVmYXVsdFByb3BzYCBpbnN0ZWFkLicpIDogdm9pZCAwO1xuICB9XG59XG5cbnZhciBSZWFjdEVsZW1lbnRWYWxpZGF0b3IgPSB7XG5cbiAgY3JlYXRlRWxlbWVudDogZnVuY3Rpb24gKHR5cGUsIHByb3BzLCBjaGlsZHJlbikge1xuICAgIHZhciB2YWxpZFR5cGUgPSB0eXBlb2YgdHlwZSA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIHR5cGUgPT09ICdmdW5jdGlvbic7XG4gICAgLy8gV2Ugd2FybiBpbiB0aGlzIGNhc2UgYnV0IGRvbid0IHRocm93LiBXZSBleHBlY3QgdGhlIGVsZW1lbnQgY3JlYXRpb24gdG9cbiAgICAvLyBzdWNjZWVkIGFuZCB0aGVyZSB3aWxsIGxpa2VseSBiZSBlcnJvcnMgaW4gcmVuZGVyLlxuICAgIGlmICghdmFsaWRUeXBlKSB7XG4gICAgICBpZiAodHlwZW9mIHR5cGUgIT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIHR5cGUgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHZhciBpbmZvID0gJyc7XG4gICAgICAgIGlmICh0eXBlID09PSB1bmRlZmluZWQgfHwgdHlwZW9mIHR5cGUgPT09ICdvYmplY3QnICYmIHR5cGUgIT09IG51bGwgJiYgT2JqZWN0LmtleXModHlwZSkubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgaW5mbyArPSAnIFlvdSBsaWtlbHkgZm9yZ290IHRvIGV4cG9ydCB5b3VyIGNvbXBvbmVudCBmcm9tIHRoZSBmaWxlICcgKyAnaXRcXCdzIGRlZmluZWQgaW4uJztcbiAgICAgICAgfVxuICAgICAgICBpbmZvICs9IGdldERlY2xhcmF0aW9uRXJyb3JBZGRlbmR1bSgpO1xuICAgICAgICBcImRldmVsb3BtZW50XCIgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoZmFsc2UsICdSZWFjdC5jcmVhdGVFbGVtZW50OiB0eXBlIGlzIGludmFsaWQgLS0gZXhwZWN0ZWQgYSBzdHJpbmcgKGZvciAnICsgJ2J1aWx0LWluIGNvbXBvbmVudHMpIG9yIGEgY2xhc3MvZnVuY3Rpb24gKGZvciBjb21wb3NpdGUgJyArICdjb21wb25lbnRzKSBidXQgZ290OiAlcy4lcycsIHR5cGUgPT0gbnVsbCA/IHR5cGUgOiB0eXBlb2YgdHlwZSwgaW5mbykgOiB2b2lkIDA7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIGVsZW1lbnQgPSBSZWFjdEVsZW1lbnQuY3JlYXRlRWxlbWVudC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuXG4gICAgLy8gVGhlIHJlc3VsdCBjYW4gYmUgbnVsbGlzaCBpZiBhIG1vY2sgb3IgYSBjdXN0b20gZnVuY3Rpb24gaXMgdXNlZC5cbiAgICAvLyBUT0RPOiBEcm9wIHRoaXMgd2hlbiB0aGVzZSBhcmUgbm8gbG9uZ2VyIGFsbG93ZWQgYXMgdGhlIHR5cGUgYXJndW1lbnQuXG4gICAgaWYgKGVsZW1lbnQgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIGVsZW1lbnQ7XG4gICAgfVxuXG4gICAgLy8gU2tpcCBrZXkgd2FybmluZyBpZiB0aGUgdHlwZSBpc24ndCB2YWxpZCBzaW5jZSBvdXIga2V5IHZhbGlkYXRpb24gbG9naWNcbiAgICAvLyBkb2Vzbid0IGV4cGVjdCBhIG5vbi1zdHJpbmcvZnVuY3Rpb24gdHlwZSBhbmQgY2FuIHRocm93IGNvbmZ1c2luZyBlcnJvcnMuXG4gICAgLy8gV2UgZG9uJ3Qgd2FudCBleGNlcHRpb24gYmVoYXZpb3IgdG8gZGlmZmVyIGJldHdlZW4gZGV2IGFuZCBwcm9kLlxuICAgIC8vIChSZW5kZXJpbmcgd2lsbCB0aHJvdyB3aXRoIGEgaGVscGZ1bCBtZXNzYWdlIGFuZCBhcyBzb29uIGFzIHRoZSB0eXBlIGlzXG4gICAgLy8gZml4ZWQsIHRoZSBrZXkgd2FybmluZ3Mgd2lsbCBhcHBlYXIuKVxuICAgIGlmICh2YWxpZFR5cGUpIHtcbiAgICAgIGZvciAodmFyIGkgPSAyOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhbGlkYXRlQ2hpbGRLZXlzKGFyZ3VtZW50c1tpXSwgdHlwZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFsaWRhdGVQcm9wVHlwZXMoZWxlbWVudCk7XG5cbiAgICByZXR1cm4gZWxlbWVudDtcbiAgfSxcblxuICBjcmVhdGVGYWN0b3J5OiBmdW5jdGlvbiAodHlwZSkge1xuICAgIHZhciB2YWxpZGF0ZWRGYWN0b3J5ID0gUmVhY3RFbGVtZW50VmFsaWRhdG9yLmNyZWF0ZUVsZW1lbnQuYmluZChudWxsLCB0eXBlKTtcbiAgICAvLyBMZWdhY3kgaG9vayBUT0RPOiBXYXJuIGlmIHRoaXMgaXMgYWNjZXNzZWRcbiAgICB2YWxpZGF0ZWRGYWN0b3J5LnR5cGUgPSB0eXBlO1xuXG4gICAgaWYgKFwiZGV2ZWxvcG1lbnRcIiAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICBpZiAoY2FuRGVmaW5lUHJvcGVydHkpIHtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHZhbGlkYXRlZEZhY3RvcnksICd0eXBlJywge1xuICAgICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgXCJkZXZlbG9wbWVudFwiICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKGZhbHNlLCAnRmFjdG9yeS50eXBlIGlzIGRlcHJlY2F0ZWQuIEFjY2VzcyB0aGUgY2xhc3MgZGlyZWN0bHkgJyArICdiZWZvcmUgcGFzc2luZyBpdCB0byBjcmVhdGVGYWN0b3J5LicpIDogdm9pZCAwO1xuICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICd0eXBlJywge1xuICAgICAgICAgICAgICB2YWx1ZTogdHlwZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gdHlwZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB2YWxpZGF0ZWRGYWN0b3J5O1xuICB9LFxuXG4gIGNsb25lRWxlbWVudDogZnVuY3Rpb24gKGVsZW1lbnQsIHByb3BzLCBjaGlsZHJlbikge1xuICAgIHZhciBuZXdFbGVtZW50ID0gUmVhY3RFbGVtZW50LmNsb25lRWxlbWVudC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIGZvciAodmFyIGkgPSAyOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YWxpZGF0ZUNoaWxkS2V5cyhhcmd1bWVudHNbaV0sIG5ld0VsZW1lbnQudHlwZSk7XG4gICAgfVxuICAgIHZhbGlkYXRlUHJvcFR5cGVzKG5ld0VsZW1lbnQpO1xuICAgIHJldHVybiBuZXdFbGVtZW50O1xuICB9XG5cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3RFbGVtZW50VmFsaWRhdG9yOyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTUtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciB3YXJuaW5nID0gcmVxdWlyZSgnZmJqcy9saWIvd2FybmluZycpO1xuXG5mdW5jdGlvbiB3YXJuTm9vcChwdWJsaWNJbnN0YW5jZSwgY2FsbGVyTmFtZSkge1xuICBpZiAoXCJkZXZlbG9wbWVudFwiICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICB2YXIgY29uc3RydWN0b3IgPSBwdWJsaWNJbnN0YW5jZS5jb25zdHJ1Y3RvcjtcbiAgICBcImRldmVsb3BtZW50XCIgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoZmFsc2UsICclcyguLi4pOiBDYW4gb25seSB1cGRhdGUgYSBtb3VudGVkIG9yIG1vdW50aW5nIGNvbXBvbmVudC4gJyArICdUaGlzIHVzdWFsbHkgbWVhbnMgeW91IGNhbGxlZCAlcygpIG9uIGFuIHVubW91bnRlZCBjb21wb25lbnQuICcgKyAnVGhpcyBpcyBhIG5vLW9wLiBQbGVhc2UgY2hlY2sgdGhlIGNvZGUgZm9yIHRoZSAlcyBjb21wb25lbnQuJywgY2FsbGVyTmFtZSwgY2FsbGVyTmFtZSwgY29uc3RydWN0b3IgJiYgKGNvbnN0cnVjdG9yLmRpc3BsYXlOYW1lIHx8IGNvbnN0cnVjdG9yLm5hbWUpIHx8ICdSZWFjdENsYXNzJykgOiB2b2lkIDA7XG4gIH1cbn1cblxuLyoqXG4gKiBUaGlzIGlzIHRoZSBhYnN0cmFjdCBBUEkgZm9yIGFuIHVwZGF0ZSBxdWV1ZS5cbiAqL1xudmFyIFJlYWN0Tm9vcFVwZGF0ZVF1ZXVlID0ge1xuXG4gIC8qKlxuICAgKiBDaGVja3Mgd2hldGhlciBvciBub3QgdGhpcyBjb21wb3NpdGUgY29tcG9uZW50IGlzIG1vdW50ZWQuXG4gICAqIEBwYXJhbSB7UmVhY3RDbGFzc30gcHVibGljSW5zdGFuY2UgVGhlIGluc3RhbmNlIHdlIHdhbnQgdG8gdGVzdC5cbiAgICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBpZiBtb3VudGVkLCBmYWxzZSBvdGhlcndpc2UuXG4gICAqIEBwcm90ZWN0ZWRcbiAgICogQGZpbmFsXG4gICAqL1xuICBpc01vdW50ZWQ6IGZ1bmN0aW9uIChwdWJsaWNJbnN0YW5jZSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfSxcblxuICAvKipcbiAgICogRW5xdWV1ZSBhIGNhbGxiYWNrIHRoYXQgd2lsbCBiZSBleGVjdXRlZCBhZnRlciBhbGwgdGhlIHBlbmRpbmcgdXBkYXRlc1xuICAgKiBoYXZlIHByb2Nlc3NlZC5cbiAgICpcbiAgICogQHBhcmFtIHtSZWFjdENsYXNzfSBwdWJsaWNJbnN0YW5jZSBUaGUgaW5zdGFuY2UgdG8gdXNlIGFzIGB0aGlzYCBjb250ZXh0LlxuICAgKiBAcGFyYW0gez9mdW5jdGlvbn0gY2FsbGJhY2sgQ2FsbGVkIGFmdGVyIHN0YXRlIGlzIHVwZGF0ZWQuXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgZW5xdWV1ZUNhbGxiYWNrOiBmdW5jdGlvbiAocHVibGljSW5zdGFuY2UsIGNhbGxiYWNrKSB7fSxcblxuICAvKipcbiAgICogRm9yY2VzIGFuIHVwZGF0ZS4gVGhpcyBzaG91bGQgb25seSBiZSBpbnZva2VkIHdoZW4gaXQgaXMga25vd24gd2l0aFxuICAgKiBjZXJ0YWludHkgdGhhdCB3ZSBhcmUgKipub3QqKiBpbiBhIERPTSB0cmFuc2FjdGlvbi5cbiAgICpcbiAgICogWW91IG1heSB3YW50IHRvIGNhbGwgdGhpcyB3aGVuIHlvdSBrbm93IHRoYXQgc29tZSBkZWVwZXIgYXNwZWN0IG9mIHRoZVxuICAgKiBjb21wb25lbnQncyBzdGF0ZSBoYXMgY2hhbmdlZCBidXQgYHNldFN0YXRlYCB3YXMgbm90IGNhbGxlZC5cbiAgICpcbiAgICogVGhpcyB3aWxsIG5vdCBpbnZva2UgYHNob3VsZENvbXBvbmVudFVwZGF0ZWAsIGJ1dCBpdCB3aWxsIGludm9rZVxuICAgKiBgY29tcG9uZW50V2lsbFVwZGF0ZWAgYW5kIGBjb21wb25lbnREaWRVcGRhdGVgLlxuICAgKlxuICAgKiBAcGFyYW0ge1JlYWN0Q2xhc3N9IHB1YmxpY0luc3RhbmNlIFRoZSBpbnN0YW5jZSB0aGF0IHNob3VsZCByZXJlbmRlci5cbiAgICogQGludGVybmFsXG4gICAqL1xuICBlbnF1ZXVlRm9yY2VVcGRhdGU6IGZ1bmN0aW9uIChwdWJsaWNJbnN0YW5jZSkge1xuICAgIHdhcm5Ob29wKHB1YmxpY0luc3RhbmNlLCAnZm9yY2VVcGRhdGUnKTtcbiAgfSxcblxuICAvKipcbiAgICogUmVwbGFjZXMgYWxsIG9mIHRoZSBzdGF0ZS4gQWx3YXlzIHVzZSB0aGlzIG9yIGBzZXRTdGF0ZWAgdG8gbXV0YXRlIHN0YXRlLlxuICAgKiBZb3Ugc2hvdWxkIHRyZWF0IGB0aGlzLnN0YXRlYCBhcyBpbW11dGFibGUuXG4gICAqXG4gICAqIFRoZXJlIGlzIG5vIGd1YXJhbnRlZSB0aGF0IGB0aGlzLnN0YXRlYCB3aWxsIGJlIGltbWVkaWF0ZWx5IHVwZGF0ZWQsIHNvXG4gICAqIGFjY2Vzc2luZyBgdGhpcy5zdGF0ZWAgYWZ0ZXIgY2FsbGluZyB0aGlzIG1ldGhvZCBtYXkgcmV0dXJuIHRoZSBvbGQgdmFsdWUuXG4gICAqXG4gICAqIEBwYXJhbSB7UmVhY3RDbGFzc30gcHVibGljSW5zdGFuY2UgVGhlIGluc3RhbmNlIHRoYXQgc2hvdWxkIHJlcmVuZGVyLlxuICAgKiBAcGFyYW0ge29iamVjdH0gY29tcGxldGVTdGF0ZSBOZXh0IHN0YXRlLlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIGVucXVldWVSZXBsYWNlU3RhdGU6IGZ1bmN0aW9uIChwdWJsaWNJbnN0YW5jZSwgY29tcGxldGVTdGF0ZSkge1xuICAgIHdhcm5Ob29wKHB1YmxpY0luc3RhbmNlLCAncmVwbGFjZVN0YXRlJyk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIFNldHMgYSBzdWJzZXQgb2YgdGhlIHN0YXRlLiBUaGlzIG9ubHkgZXhpc3RzIGJlY2F1c2UgX3BlbmRpbmdTdGF0ZSBpc1xuICAgKiBpbnRlcm5hbC4gVGhpcyBwcm92aWRlcyBhIG1lcmdpbmcgc3RyYXRlZ3kgdGhhdCBpcyBub3QgYXZhaWxhYmxlIHRvIGRlZXBcbiAgICogcHJvcGVydGllcyB3aGljaCBpcyBjb25mdXNpbmcuIFRPRE86IEV4cG9zZSBwZW5kaW5nU3RhdGUgb3IgZG9uJ3QgdXNlIGl0XG4gICAqIGR1cmluZyB0aGUgbWVyZ2UuXG4gICAqXG4gICAqIEBwYXJhbSB7UmVhY3RDbGFzc30gcHVibGljSW5zdGFuY2UgVGhlIGluc3RhbmNlIHRoYXQgc2hvdWxkIHJlcmVuZGVyLlxuICAgKiBAcGFyYW0ge29iamVjdH0gcGFydGlhbFN0YXRlIE5leHQgcGFydGlhbCBzdGF0ZSB0byBiZSBtZXJnZWQgd2l0aCBzdGF0ZS5cbiAgICogQGludGVybmFsXG4gICAqL1xuICBlbnF1ZXVlU2V0U3RhdGU6IGZ1bmN0aW9uIChwdWJsaWNJbnN0YW5jZSwgcGFydGlhbFN0YXRlKSB7XG4gICAgd2Fybk5vb3AocHVibGljSW5zdGFuY2UsICdzZXRTdGF0ZScpO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0Tm9vcFVwZGF0ZVF1ZXVlOyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIFxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFJlYWN0UHJvcFR5cGVMb2NhdGlvbk5hbWVzID0ge307XG5cbmlmIChcImRldmVsb3BtZW50XCIgIT09ICdwcm9kdWN0aW9uJykge1xuICBSZWFjdFByb3BUeXBlTG9jYXRpb25OYW1lcyA9IHtcbiAgICBwcm9wOiAncHJvcCcsXG4gICAgY29udGV4dDogJ2NvbnRleHQnLFxuICAgIGNoaWxkQ29udGV4dDogJ2NoaWxkIGNvbnRleHQnXG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3RQcm9wVHlwZUxvY2F0aW9uTmFtZXM7IiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFJlYWN0RWxlbWVudCA9IHJlcXVpcmUoJy4vUmVhY3RFbGVtZW50Jyk7XG52YXIgUmVhY3RQcm9wVHlwZUxvY2F0aW9uTmFtZXMgPSByZXF1aXJlKCcuL1JlYWN0UHJvcFR5cGVMb2NhdGlvbk5hbWVzJyk7XG52YXIgUmVhY3RQcm9wVHlwZXNTZWNyZXQgPSByZXF1aXJlKCcuL1JlYWN0UHJvcFR5cGVzU2VjcmV0Jyk7XG5cbnZhciBlbXB0eUZ1bmN0aW9uID0gcmVxdWlyZSgnZmJqcy9saWIvZW1wdHlGdW5jdGlvbicpO1xudmFyIGdldEl0ZXJhdG9yRm4gPSByZXF1aXJlKCcuL2dldEl0ZXJhdG9yRm4nKTtcbnZhciB3YXJuaW5nID0gcmVxdWlyZSgnZmJqcy9saWIvd2FybmluZycpO1xuXG4vKipcbiAqIENvbGxlY3Rpb24gb2YgbWV0aG9kcyB0aGF0IGFsbG93IGRlY2xhcmF0aW9uIGFuZCB2YWxpZGF0aW9uIG9mIHByb3BzIHRoYXQgYXJlXG4gKiBzdXBwbGllZCB0byBSZWFjdCBjb21wb25lbnRzLiBFeGFtcGxlIHVzYWdlOlxuICpcbiAqICAgdmFyIFByb3BzID0gcmVxdWlyZSgnUmVhY3RQcm9wVHlwZXMnKTtcbiAqICAgdmFyIE15QXJ0aWNsZSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAqICAgICBwcm9wVHlwZXM6IHtcbiAqICAgICAgIC8vIEFuIG9wdGlvbmFsIHN0cmluZyBwcm9wIG5hbWVkIFwiZGVzY3JpcHRpb25cIi5cbiAqICAgICAgIGRlc2NyaXB0aW9uOiBQcm9wcy5zdHJpbmcsXG4gKlxuICogICAgICAgLy8gQSByZXF1aXJlZCBlbnVtIHByb3AgbmFtZWQgXCJjYXRlZ29yeVwiLlxuICogICAgICAgY2F0ZWdvcnk6IFByb3BzLm9uZU9mKFsnTmV3cycsJ1Bob3RvcyddKS5pc1JlcXVpcmVkLFxuICpcbiAqICAgICAgIC8vIEEgcHJvcCBuYW1lZCBcImRpYWxvZ1wiIHRoYXQgcmVxdWlyZXMgYW4gaW5zdGFuY2Ugb2YgRGlhbG9nLlxuICogICAgICAgZGlhbG9nOiBQcm9wcy5pbnN0YW5jZU9mKERpYWxvZykuaXNSZXF1aXJlZFxuICogICAgIH0sXG4gKiAgICAgcmVuZGVyOiBmdW5jdGlvbigpIHsgLi4uIH1cbiAqICAgfSk7XG4gKlxuICogQSBtb3JlIGZvcm1hbCBzcGVjaWZpY2F0aW9uIG9mIGhvdyB0aGVzZSBtZXRob2RzIGFyZSB1c2VkOlxuICpcbiAqICAgdHlwZSA6PSBhcnJheXxib29sfGZ1bmN8b2JqZWN0fG51bWJlcnxzdHJpbmd8b25lT2YoWy4uLl0pfGluc3RhbmNlT2YoLi4uKVxuICogICBkZWNsIDo9IFJlYWN0UHJvcFR5cGVzLnt0eXBlfSguaXNSZXF1aXJlZCk/XG4gKlxuICogRWFjaCBhbmQgZXZlcnkgZGVjbGFyYXRpb24gcHJvZHVjZXMgYSBmdW5jdGlvbiB3aXRoIHRoZSBzYW1lIHNpZ25hdHVyZS4gVGhpc1xuICogYWxsb3dzIHRoZSBjcmVhdGlvbiBvZiBjdXN0b20gdmFsaWRhdGlvbiBmdW5jdGlvbnMuIEZvciBleGFtcGxlOlxuICpcbiAqICB2YXIgTXlMaW5rID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICogICAgcHJvcFR5cGVzOiB7XG4gKiAgICAgIC8vIEFuIG9wdGlvbmFsIHN0cmluZyBvciBVUkkgcHJvcCBuYW1lZCBcImhyZWZcIi5cbiAqICAgICAgaHJlZjogZnVuY3Rpb24ocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lKSB7XG4gKiAgICAgICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAqICAgICAgICBpZiAocHJvcFZhbHVlICE9IG51bGwgJiYgdHlwZW9mIHByb3BWYWx1ZSAhPT0gJ3N0cmluZycgJiZcbiAqICAgICAgICAgICAgIShwcm9wVmFsdWUgaW5zdGFuY2VvZiBVUkkpKSB7XG4gKiAgICAgICAgICByZXR1cm4gbmV3IEVycm9yKFxuICogICAgICAgICAgICAnRXhwZWN0ZWQgYSBzdHJpbmcgb3IgYW4gVVJJIGZvciAnICsgcHJvcE5hbWUgKyAnIGluICcgK1xuICogICAgICAgICAgICBjb21wb25lbnROYW1lXG4gKiAgICAgICAgICApO1xuICogICAgICAgIH1cbiAqICAgICAgfVxuICogICAgfSxcbiAqICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7Li4ufVxuICogIH0pO1xuICpcbiAqIEBpbnRlcm5hbFxuICovXG5cbnZhciBBTk9OWU1PVVMgPSAnPDxhbm9ueW1vdXM+Pic7XG5cbnZhciBSZWFjdFByb3BUeXBlcyA9IHtcbiAgYXJyYXk6IGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKCdhcnJheScpLFxuICBib29sOiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignYm9vbGVhbicpLFxuICBmdW5jOiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignZnVuY3Rpb24nKSxcbiAgbnVtYmVyOiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignbnVtYmVyJyksXG4gIG9iamVjdDogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ29iamVjdCcpLFxuICBzdHJpbmc6IGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKCdzdHJpbmcnKSxcbiAgc3ltYm9sOiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignc3ltYm9sJyksXG5cbiAgYW55OiBjcmVhdGVBbnlUeXBlQ2hlY2tlcigpLFxuICBhcnJheU9mOiBjcmVhdGVBcnJheU9mVHlwZUNoZWNrZXIsXG4gIGVsZW1lbnQ6IGNyZWF0ZUVsZW1lbnRUeXBlQ2hlY2tlcigpLFxuICBpbnN0YW5jZU9mOiBjcmVhdGVJbnN0YW5jZVR5cGVDaGVja2VyLFxuICBub2RlOiBjcmVhdGVOb2RlQ2hlY2tlcigpLFxuICBvYmplY3RPZjogY3JlYXRlT2JqZWN0T2ZUeXBlQ2hlY2tlcixcbiAgb25lT2Y6IGNyZWF0ZUVudW1UeXBlQ2hlY2tlcixcbiAgb25lT2ZUeXBlOiBjcmVhdGVVbmlvblR5cGVDaGVja2VyLFxuICBzaGFwZTogY3JlYXRlU2hhcGVUeXBlQ2hlY2tlclxufTtcblxuLyoqXG4gKiBpbmxpbmVkIE9iamVjdC5pcyBwb2x5ZmlsbCB0byBhdm9pZCByZXF1aXJpbmcgY29uc3VtZXJzIHNoaXAgdGhlaXIgb3duXG4gKiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9PYmplY3QvaXNcbiAqL1xuLyplc2xpbnQtZGlzYWJsZSBuby1zZWxmLWNvbXBhcmUqL1xuZnVuY3Rpb24gaXMoeCwgeSkge1xuICAvLyBTYW1lVmFsdWUgYWxnb3JpdGhtXG4gIGlmICh4ID09PSB5KSB7XG4gICAgLy8gU3RlcHMgMS01LCA3LTEwXG4gICAgLy8gU3RlcHMgNi5iLTYuZTogKzAgIT0gLTBcbiAgICByZXR1cm4geCAhPT0gMCB8fCAxIC8geCA9PT0gMSAvIHk7XG4gIH0gZWxzZSB7XG4gICAgLy8gU3RlcCA2LmE6IE5hTiA9PSBOYU5cbiAgICByZXR1cm4geCAhPT0geCAmJiB5ICE9PSB5O1xuICB9XG59XG4vKmVzbGludC1lbmFibGUgbm8tc2VsZi1jb21wYXJlKi9cblxuLyoqXG4gKiBXZSB1c2UgYW4gRXJyb3ItbGlrZSBvYmplY3QgZm9yIGJhY2t3YXJkIGNvbXBhdGliaWxpdHkgYXMgcGVvcGxlIG1heSBjYWxsXG4gKiBQcm9wVHlwZXMgZGlyZWN0bHkgYW5kIGluc3BlY3QgdGhlaXIgb3V0cHV0LiBIb3dldmVyIHdlIGRvbid0IHVzZSByZWFsXG4gKiBFcnJvcnMgYW55bW9yZS4gV2UgZG9uJ3QgaW5zcGVjdCB0aGVpciBzdGFjayBhbnl3YXksIGFuZCBjcmVhdGluZyB0aGVtXG4gKiBpcyBwcm9oaWJpdGl2ZWx5IGV4cGVuc2l2ZSBpZiB0aGV5IGFyZSBjcmVhdGVkIHRvbyBvZnRlbiwgc3VjaCBhcyB3aGF0XG4gKiBoYXBwZW5zIGluIG9uZU9mVHlwZSgpIGZvciBhbnkgdHlwZSBiZWZvcmUgdGhlIG9uZSB0aGF0IG1hdGNoZWQuXG4gKi9cbmZ1bmN0aW9uIFByb3BUeXBlRXJyb3IobWVzc2FnZSkge1xuICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xuICB0aGlzLnN0YWNrID0gJyc7XG59XG4vLyBNYWtlIGBpbnN0YW5jZW9mIEVycm9yYCBzdGlsbCB3b3JrIGZvciByZXR1cm5lZCBlcnJvcnMuXG5Qcm9wVHlwZUVycm9yLnByb3RvdHlwZSA9IEVycm9yLnByb3RvdHlwZTtcblxuZnVuY3Rpb24gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpIHtcbiAgaWYgKFwiZGV2ZWxvcG1lbnRcIiAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgdmFyIG1hbnVhbFByb3BUeXBlQ2FsbENhY2hlID0ge307XG4gIH1cbiAgZnVuY3Rpb24gY2hlY2tUeXBlKGlzUmVxdWlyZWQsIHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSwgc2VjcmV0KSB7XG4gICAgY29tcG9uZW50TmFtZSA9IGNvbXBvbmVudE5hbWUgfHwgQU5PTllNT1VTO1xuICAgIHByb3BGdWxsTmFtZSA9IHByb3BGdWxsTmFtZSB8fCBwcm9wTmFtZTtcbiAgICBpZiAoXCJkZXZlbG9wbWVudFwiICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIGlmIChzZWNyZXQgIT09IFJlYWN0UHJvcFR5cGVzU2VjcmV0ICYmIHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICB2YXIgY2FjaGVLZXkgPSBjb21wb25lbnROYW1lICsgJzonICsgcHJvcE5hbWU7XG4gICAgICAgIGlmICghbWFudWFsUHJvcFR5cGVDYWxsQ2FjaGVbY2FjaGVLZXldKSB7XG4gICAgICAgICAgXCJkZXZlbG9wbWVudFwiICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKGZhbHNlLCAnWW91IGFyZSBtYW51YWxseSBjYWxsaW5nIGEgUmVhY3QuUHJvcFR5cGVzIHZhbGlkYXRpb24gJyArICdmdW5jdGlvbiBmb3IgdGhlIGAlc2AgcHJvcCBvbiBgJXNgLiBUaGlzIGlzIGRlcHJlY2F0ZWQgJyArICdhbmQgd2lsbCBub3Qgd29yayBpbiBwcm9kdWN0aW9uIHdpdGggdGhlIG5leHQgbWFqb3IgdmVyc2lvbi4gJyArICdZb3UgbWF5IGJlIHNlZWluZyB0aGlzIHdhcm5pbmcgZHVlIHRvIGEgdGhpcmQtcGFydHkgUHJvcFR5cGVzICcgKyAnbGlicmFyeS4gU2VlIGh0dHBzOi8vZmIubWUvcmVhY3Qtd2FybmluZy1kb250LWNhbGwtcHJvcHR5cGVzICcgKyAnZm9yIGRldGFpbHMuJywgcHJvcEZ1bGxOYW1lLCBjb21wb25lbnROYW1lKSA6IHZvaWQgMDtcbiAgICAgICAgICBtYW51YWxQcm9wVHlwZUNhbGxDYWNoZVtjYWNoZUtleV0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChwcm9wc1twcm9wTmFtZV0gPT0gbnVsbCkge1xuICAgICAgdmFyIGxvY2F0aW9uTmFtZSA9IFJlYWN0UHJvcFR5cGVMb2NhdGlvbk5hbWVzW2xvY2F0aW9uXTtcbiAgICAgIGlmIChpc1JlcXVpcmVkKSB7XG4gICAgICAgIGlmIChwcm9wc1twcm9wTmFtZV0gPT09IG51bGwpIHtcbiAgICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ1RoZSAnICsgbG9jYXRpb25OYW1lICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIGlzIG1hcmtlZCBhcyByZXF1aXJlZCAnICsgKCdpbiBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgYnV0IGl0cyB2YWx1ZSBpcyBgbnVsbGAuJykpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignVGhlICcgKyBsb2NhdGlvbk5hbWUgKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2AgaXMgbWFya2VkIGFzIHJlcXVpcmVkIGluICcgKyAoJ2AnICsgY29tcG9uZW50TmFtZSArICdgLCBidXQgaXRzIHZhbHVlIGlzIGB1bmRlZmluZWRgLicpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBudWxsO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKTtcbiAgICB9XG4gIH1cblxuICB2YXIgY2hhaW5lZENoZWNrVHlwZSA9IGNoZWNrVHlwZS5iaW5kKG51bGwsIGZhbHNlKTtcbiAgY2hhaW5lZENoZWNrVHlwZS5pc1JlcXVpcmVkID0gY2hlY2tUeXBlLmJpbmQobnVsbCwgdHJ1ZSk7XG5cbiAgcmV0dXJuIGNoYWluZWRDaGVja1R5cGU7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKGV4cGVjdGVkVHlwZSkge1xuICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUsIHNlY3JldCkge1xuICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgdmFyIHByb3BUeXBlID0gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKTtcbiAgICBpZiAocHJvcFR5cGUgIT09IGV4cGVjdGVkVHlwZSkge1xuICAgICAgdmFyIGxvY2F0aW9uTmFtZSA9IFJlYWN0UHJvcFR5cGVMb2NhdGlvbk5hbWVzW2xvY2F0aW9uXTtcbiAgICAgIC8vIGBwcm9wVmFsdWVgIGJlaW5nIGluc3RhbmNlIG9mLCBzYXksIGRhdGUvcmVnZXhwLCBwYXNzIHRoZSAnb2JqZWN0J1xuICAgICAgLy8gY2hlY2ssIGJ1dCB3ZSBjYW4gb2ZmZXIgYSBtb3JlIHByZWNpc2UgZXJyb3IgbWVzc2FnZSBoZXJlIHJhdGhlciB0aGFuXG4gICAgICAvLyAnb2YgdHlwZSBgb2JqZWN0YCcuXG4gICAgICB2YXIgcHJlY2lzZVR5cGUgPSBnZXRQcmVjaXNlVHlwZShwcm9wVmFsdWUpO1xuXG4gICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uTmFtZSArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlICcgKyAoJ2AnICsgcHJlY2lzZVR5cGUgKyAnYCBzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgJykgKyAoJ2AnICsgZXhwZWN0ZWRUeXBlICsgJ2AuJykpO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVBbnlUeXBlQ2hlY2tlcigpIHtcbiAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKGVtcHR5RnVuY3Rpb24udGhhdFJldHVybnMobnVsbCkpO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVBcnJheU9mVHlwZUNoZWNrZXIodHlwZUNoZWNrZXIpIHtcbiAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgaWYgKHR5cGVvZiB0eXBlQ2hlY2tlciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdQcm9wZXJ0eSBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIGNvbXBvbmVudCBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCBoYXMgaW52YWxpZCBQcm9wVHlwZSBub3RhdGlvbiBpbnNpZGUgYXJyYXlPZi4nKTtcbiAgICB9XG4gICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkocHJvcFZhbHVlKSkge1xuICAgICAgdmFyIGxvY2F0aW9uTmFtZSA9IFJlYWN0UHJvcFR5cGVMb2NhdGlvbk5hbWVzW2xvY2F0aW9uXTtcbiAgICAgIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uTmFtZSArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlICcgKyAoJ2AnICsgcHJvcFR5cGUgKyAnYCBzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgYW4gYXJyYXkuJykpO1xuICAgIH1cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BWYWx1ZS5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGVycm9yID0gdHlwZUNoZWNrZXIocHJvcFZhbHVlLCBpLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lICsgJ1snICsgaSArICddJywgUmVhY3RQcm9wVHlwZXNTZWNyZXQpO1xuICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgcmV0dXJuIGVycm9yO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVFbGVtZW50VHlwZUNoZWNrZXIoKSB7XG4gIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgaWYgKCFSZWFjdEVsZW1lbnQuaXNWYWxpZEVsZW1lbnQocHJvcFZhbHVlKSkge1xuICAgICAgdmFyIGxvY2F0aW9uTmFtZSA9IFJlYWN0UHJvcFR5cGVMb2NhdGlvbk5hbWVzW2xvY2F0aW9uXTtcbiAgICAgIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uTmFtZSArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlICcgKyAoJ2AnICsgcHJvcFR5cGUgKyAnYCBzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgYSBzaW5nbGUgUmVhY3RFbGVtZW50LicpKTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlSW5zdGFuY2VUeXBlQ2hlY2tlcihleHBlY3RlZENsYXNzKSB7XG4gIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgIGlmICghKHByb3BzW3Byb3BOYW1lXSBpbnN0YW5jZW9mIGV4cGVjdGVkQ2xhc3MpKSB7XG4gICAgICB2YXIgbG9jYXRpb25OYW1lID0gUmVhY3RQcm9wVHlwZUxvY2F0aW9uTmFtZXNbbG9jYXRpb25dO1xuICAgICAgdmFyIGV4cGVjdGVkQ2xhc3NOYW1lID0gZXhwZWN0ZWRDbGFzcy5uYW1lIHx8IEFOT05ZTU9VUztcbiAgICAgIHZhciBhY3R1YWxDbGFzc05hbWUgPSBnZXRDbGFzc05hbWUocHJvcHNbcHJvcE5hbWVdKTtcbiAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb25OYW1lICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgJyArICgnYCcgKyBhY3R1YWxDbGFzc05hbWUgKyAnYCBzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgJykgKyAoJ2luc3RhbmNlIG9mIGAnICsgZXhwZWN0ZWRDbGFzc05hbWUgKyAnYC4nKSk7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG4gIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUVudW1UeXBlQ2hlY2tlcihleHBlY3RlZFZhbHVlcykge1xuICBpZiAoIUFycmF5LmlzQXJyYXkoZXhwZWN0ZWRWYWx1ZXMpKSB7XG4gICAgXCJkZXZlbG9wbWVudFwiICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKGZhbHNlLCAnSW52YWxpZCBhcmd1bWVudCBzdXBwbGllZCB0byBvbmVPZiwgZXhwZWN0ZWQgYW4gaW5zdGFuY2Ugb2YgYXJyYXkuJykgOiB2b2lkIDA7XG4gICAgcmV0dXJuIGVtcHR5RnVuY3Rpb24udGhhdFJldHVybnNOdWxsO1xuICB9XG5cbiAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGV4cGVjdGVkVmFsdWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAoaXMocHJvcFZhbHVlLCBleHBlY3RlZFZhbHVlc1tpXSkpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIGxvY2F0aW9uTmFtZSA9IFJlYWN0UHJvcFR5cGVMb2NhdGlvbk5hbWVzW2xvY2F0aW9uXTtcbiAgICB2YXIgdmFsdWVzU3RyaW5nID0gSlNPTi5zdHJpbmdpZnkoZXhwZWN0ZWRWYWx1ZXMpO1xuICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb25OYW1lICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHZhbHVlIGAnICsgcHJvcFZhbHVlICsgJ2AgJyArICgnc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkIG9uZSBvZiAnICsgdmFsdWVzU3RyaW5nICsgJy4nKSk7XG4gIH1cbiAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlT2JqZWN0T2ZUeXBlQ2hlY2tlcih0eXBlQ2hlY2tlcikge1xuICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICBpZiAodHlwZW9mIHR5cGVDaGVja2VyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ1Byb3BlcnR5IGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgY29tcG9uZW50IGAnICsgY29tcG9uZW50TmFtZSArICdgIGhhcyBpbnZhbGlkIFByb3BUeXBlIG5vdGF0aW9uIGluc2lkZSBvYmplY3RPZi4nKTtcbiAgICB9XG4gICAgdmFyIHByb3BWYWx1ZSA9IHByb3BzW3Byb3BOYW1lXTtcbiAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgIGlmIChwcm9wVHlwZSAhPT0gJ29iamVjdCcpIHtcbiAgICAgIHZhciBsb2NhdGlvbk5hbWUgPSBSZWFjdFByb3BUeXBlTG9jYXRpb25OYW1lc1tsb2NhdGlvbl07XG4gICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uTmFtZSArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlICcgKyAoJ2AnICsgcHJvcFR5cGUgKyAnYCBzdXBwbGllZCB0byBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgZXhwZWN0ZWQgYW4gb2JqZWN0LicpKTtcbiAgICB9XG4gICAgZm9yICh2YXIga2V5IGluIHByb3BWYWx1ZSkge1xuICAgICAgaWYgKHByb3BWYWx1ZS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgIHZhciBlcnJvciA9IHR5cGVDaGVja2VyKHByb3BWYWx1ZSwga2V5LCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lICsgJy4nICsga2V5LCBSZWFjdFByb3BUeXBlc1NlY3JldCk7XG4gICAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgICAgcmV0dXJuIGVycm9yO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG4gIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVVuaW9uVHlwZUNoZWNrZXIoYXJyYXlPZlR5cGVDaGVja2Vycykge1xuICBpZiAoIUFycmF5LmlzQXJyYXkoYXJyYXlPZlR5cGVDaGVja2VycykpIHtcbiAgICBcImRldmVsb3BtZW50XCIgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoZmFsc2UsICdJbnZhbGlkIGFyZ3VtZW50IHN1cHBsaWVkIHRvIG9uZU9mVHlwZSwgZXhwZWN0ZWQgYW4gaW5zdGFuY2Ugb2YgYXJyYXkuJykgOiB2b2lkIDA7XG4gICAgcmV0dXJuIGVtcHR5RnVuY3Rpb24udGhhdFJldHVybnNOdWxsO1xuICB9XG5cbiAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcnJheU9mVHlwZUNoZWNrZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgY2hlY2tlciA9IGFycmF5T2ZUeXBlQ2hlY2tlcnNbaV07XG4gICAgICBpZiAoY2hlY2tlcihwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUsIFJlYWN0UHJvcFR5cGVzU2VjcmV0KSA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBsb2NhdGlvbk5hbWUgPSBSZWFjdFByb3BUeXBlTG9jYXRpb25OYW1lc1tsb2NhdGlvbl07XG4gICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbk5hbWUgKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agc3VwcGxpZWQgdG8gJyArICgnYCcgKyBjb21wb25lbnROYW1lICsgJ2AuJykpO1xuICB9XG4gIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZU5vZGVDaGVja2VyKCkge1xuICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICBpZiAoIWlzTm9kZShwcm9wc1twcm9wTmFtZV0pKSB7XG4gICAgICB2YXIgbG9jYXRpb25OYW1lID0gUmVhY3RQcm9wVHlwZUxvY2F0aW9uTmFtZXNbbG9jYXRpb25dO1xuICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbk5hbWUgKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agc3VwcGxpZWQgdG8gJyArICgnYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkIGEgUmVhY3ROb2RlLicpKTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlU2hhcGVUeXBlQ2hlY2tlcihzaGFwZVR5cGVzKSB7XG4gIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgdmFyIHByb3BUeXBlID0gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKTtcbiAgICBpZiAocHJvcFR5cGUgIT09ICdvYmplY3QnKSB7XG4gICAgICB2YXIgbG9jYXRpb25OYW1lID0gUmVhY3RQcm9wVHlwZUxvY2F0aW9uTmFtZXNbbG9jYXRpb25dO1xuICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbk5hbWUgKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdHlwZSBgJyArIHByb3BUeXBlICsgJ2AgJyArICgnc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkIGBvYmplY3RgLicpKTtcbiAgICB9XG4gICAgZm9yICh2YXIga2V5IGluIHNoYXBlVHlwZXMpIHtcbiAgICAgIHZhciBjaGVja2VyID0gc2hhcGVUeXBlc1trZXldO1xuICAgICAgaWYgKCFjaGVja2VyKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgdmFyIGVycm9yID0gY2hlY2tlcihwcm9wVmFsdWUsIGtleSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSArICcuJyArIGtleSwgUmVhY3RQcm9wVHlwZXNTZWNyZXQpO1xuICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgIHJldHVybiBlcnJvcjtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbn1cblxuZnVuY3Rpb24gaXNOb2RlKHByb3BWYWx1ZSkge1xuICBzd2l0Y2ggKHR5cGVvZiBwcm9wVmFsdWUpIHtcbiAgICBjYXNlICdudW1iZXInOlxuICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgY2FzZSAndW5kZWZpbmVkJzpcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIGNhc2UgJ2Jvb2xlYW4nOlxuICAgICAgcmV0dXJuICFwcm9wVmFsdWU7XG4gICAgY2FzZSAnb2JqZWN0JzpcbiAgICAgIGlmIChBcnJheS5pc0FycmF5KHByb3BWYWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuIHByb3BWYWx1ZS5ldmVyeShpc05vZGUpO1xuICAgICAgfVxuICAgICAgaWYgKHByb3BWYWx1ZSA9PT0gbnVsbCB8fCBSZWFjdEVsZW1lbnQuaXNWYWxpZEVsZW1lbnQocHJvcFZhbHVlKSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgdmFyIGl0ZXJhdG9yRm4gPSBnZXRJdGVyYXRvckZuKHByb3BWYWx1ZSk7XG4gICAgICBpZiAoaXRlcmF0b3JGbikge1xuICAgICAgICB2YXIgaXRlcmF0b3IgPSBpdGVyYXRvckZuLmNhbGwocHJvcFZhbHVlKTtcbiAgICAgICAgdmFyIHN0ZXA7XG4gICAgICAgIGlmIChpdGVyYXRvckZuICE9PSBwcm9wVmFsdWUuZW50cmllcykge1xuICAgICAgICAgIHdoaWxlICghKHN0ZXAgPSBpdGVyYXRvci5uZXh0KCkpLmRvbmUpIHtcbiAgICAgICAgICAgIGlmICghaXNOb2RlKHN0ZXAudmFsdWUpKSB7XG4gICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gSXRlcmF0b3Igd2lsbCBwcm92aWRlIGVudHJ5IFtrLHZdIHR1cGxlcyByYXRoZXIgdGhhbiB2YWx1ZXMuXG4gICAgICAgICAgd2hpbGUgKCEoc3RlcCA9IGl0ZXJhdG9yLm5leHQoKSkuZG9uZSkge1xuICAgICAgICAgICAgdmFyIGVudHJ5ID0gc3RlcC52YWx1ZTtcbiAgICAgICAgICAgIGlmIChlbnRyeSkge1xuICAgICAgICAgICAgICBpZiAoIWlzTm9kZShlbnRyeVsxXSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG5mdW5jdGlvbiBpc1N5bWJvbChwcm9wVHlwZSwgcHJvcFZhbHVlKSB7XG4gIC8vIE5hdGl2ZSBTeW1ib2wuXG4gIGlmIChwcm9wVHlwZSA9PT0gJ3N5bWJvbCcpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIC8vIDE5LjQuMy41IFN5bWJvbC5wcm90b3R5cGVbQEB0b1N0cmluZ1RhZ10gPT09ICdTeW1ib2wnXG4gIGlmIChwcm9wVmFsdWVbJ0BAdG9TdHJpbmdUYWcnXSA9PT0gJ1N5bWJvbCcpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIC8vIEZhbGxiYWNrIGZvciBub24tc3BlYyBjb21wbGlhbnQgU3ltYm9scyB3aGljaCBhcmUgcG9seWZpbGxlZC5cbiAgaWYgKHR5cGVvZiBTeW1ib2wgPT09ICdmdW5jdGlvbicgJiYgcHJvcFZhbHVlIGluc3RhbmNlb2YgU3ltYm9sKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICByZXR1cm4gZmFsc2U7XG59XG5cbi8vIEVxdWl2YWxlbnQgb2YgYHR5cGVvZmAgYnV0IHdpdGggc3BlY2lhbCBoYW5kbGluZyBmb3IgYXJyYXkgYW5kIHJlZ2V4cC5cbmZ1bmN0aW9uIGdldFByb3BUeXBlKHByb3BWYWx1ZSkge1xuICB2YXIgcHJvcFR5cGUgPSB0eXBlb2YgcHJvcFZhbHVlO1xuICBpZiAoQXJyYXkuaXNBcnJheShwcm9wVmFsdWUpKSB7XG4gICAgcmV0dXJuICdhcnJheSc7XG4gIH1cbiAgaWYgKHByb3BWYWx1ZSBpbnN0YW5jZW9mIFJlZ0V4cCkge1xuICAgIC8vIE9sZCB3ZWJraXRzIChhdCBsZWFzdCB1bnRpbCBBbmRyb2lkIDQuMCkgcmV0dXJuICdmdW5jdGlvbicgcmF0aGVyIHRoYW5cbiAgICAvLyAnb2JqZWN0JyBmb3IgdHlwZW9mIGEgUmVnRXhwLiBXZSdsbCBub3JtYWxpemUgdGhpcyBoZXJlIHNvIHRoYXQgL2JsYS9cbiAgICAvLyBwYXNzZXMgUHJvcFR5cGVzLm9iamVjdC5cbiAgICByZXR1cm4gJ29iamVjdCc7XG4gIH1cbiAgaWYgKGlzU3ltYm9sKHByb3BUeXBlLCBwcm9wVmFsdWUpKSB7XG4gICAgcmV0dXJuICdzeW1ib2wnO1xuICB9XG4gIHJldHVybiBwcm9wVHlwZTtcbn1cblxuLy8gVGhpcyBoYW5kbGVzIG1vcmUgdHlwZXMgdGhhbiBgZ2V0UHJvcFR5cGVgLiBPbmx5IHVzZWQgZm9yIGVycm9yIG1lc3NhZ2VzLlxuLy8gU2VlIGBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcmAuXG5mdW5jdGlvbiBnZXRQcmVjaXNlVHlwZShwcm9wVmFsdWUpIHtcbiAgdmFyIHByb3BUeXBlID0gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKTtcbiAgaWYgKHByb3BUeXBlID09PSAnb2JqZWN0Jykge1xuICAgIGlmIChwcm9wVmFsdWUgaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgICByZXR1cm4gJ2RhdGUnO1xuICAgIH0gZWxzZSBpZiAocHJvcFZhbHVlIGluc3RhbmNlb2YgUmVnRXhwKSB7XG4gICAgICByZXR1cm4gJ3JlZ2V4cCc7XG4gICAgfVxuICB9XG4gIHJldHVybiBwcm9wVHlwZTtcbn1cblxuLy8gUmV0dXJucyBjbGFzcyBuYW1lIG9mIHRoZSBvYmplY3QsIGlmIGFueS5cbmZ1bmN0aW9uIGdldENsYXNzTmFtZShwcm9wVmFsdWUpIHtcbiAgaWYgKCFwcm9wVmFsdWUuY29uc3RydWN0b3IgfHwgIXByb3BWYWx1ZS5jb25zdHJ1Y3Rvci5uYW1lKSB7XG4gICAgcmV0dXJuIEFOT05ZTU9VUztcbiAgfVxuICByZXR1cm4gcHJvcFZhbHVlLmNvbnN0cnVjdG9yLm5hbWU7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3RQcm9wVHlwZXM7IiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUmVhY3RQcm9wVHlwZXNTZWNyZXQgPSAnU0VDUkVUX0RPX05PVF9QQVNTX1RISVNfT1JfWU9VX1dJTExfQkVfRklSRUQnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0UHJvcFR5cGVzU2VjcmV0OyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBfYXNzaWduID0gcmVxdWlyZSgnb2JqZWN0LWFzc2lnbicpO1xuXG52YXIgUmVhY3RDb21wb25lbnQgPSByZXF1aXJlKCcuL1JlYWN0Q29tcG9uZW50Jyk7XG52YXIgUmVhY3ROb29wVXBkYXRlUXVldWUgPSByZXF1aXJlKCcuL1JlYWN0Tm9vcFVwZGF0ZVF1ZXVlJyk7XG5cbnZhciBlbXB0eU9iamVjdCA9IHJlcXVpcmUoJ2ZianMvbGliL2VtcHR5T2JqZWN0Jyk7XG5cbi8qKlxuICogQmFzZSBjbGFzcyBoZWxwZXJzIGZvciB0aGUgdXBkYXRpbmcgc3RhdGUgb2YgYSBjb21wb25lbnQuXG4gKi9cbmZ1bmN0aW9uIFJlYWN0UHVyZUNvbXBvbmVudChwcm9wcywgY29udGV4dCwgdXBkYXRlcikge1xuICAvLyBEdXBsaWNhdGVkIGZyb20gUmVhY3RDb21wb25lbnQuXG4gIHRoaXMucHJvcHMgPSBwcm9wcztcbiAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcbiAgdGhpcy5yZWZzID0gZW1wdHlPYmplY3Q7XG4gIC8vIFdlIGluaXRpYWxpemUgdGhlIGRlZmF1bHQgdXBkYXRlciBidXQgdGhlIHJlYWwgb25lIGdldHMgaW5qZWN0ZWQgYnkgdGhlXG4gIC8vIHJlbmRlcmVyLlxuICB0aGlzLnVwZGF0ZXIgPSB1cGRhdGVyIHx8IFJlYWN0Tm9vcFVwZGF0ZVF1ZXVlO1xufVxuXG5mdW5jdGlvbiBDb21wb25lbnREdW1teSgpIHt9XG5Db21wb25lbnREdW1teS5wcm90b3R5cGUgPSBSZWFjdENvbXBvbmVudC5wcm90b3R5cGU7XG5SZWFjdFB1cmVDb21wb25lbnQucHJvdG90eXBlID0gbmV3IENvbXBvbmVudER1bW15KCk7XG5SZWFjdFB1cmVDb21wb25lbnQucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gUmVhY3RQdXJlQ29tcG9uZW50O1xuLy8gQXZvaWQgYW4gZXh0cmEgcHJvdG90eXBlIGp1bXAgZm9yIHRoZXNlIG1ldGhvZHMuXG5fYXNzaWduKFJlYWN0UHVyZUNvbXBvbmVudC5wcm90b3R5cGUsIFJlYWN0Q29tcG9uZW50LnByb3RvdHlwZSk7XG5SZWFjdFB1cmVDb21wb25lbnQucHJvdG90eXBlLmlzUHVyZVJlYWN0Q29tcG9uZW50ID0gdHJ1ZTtcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdFB1cmVDb21wb25lbnQ7IiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSAnMTUuNC4yJzsiLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBjYW5EZWZpbmVQcm9wZXJ0eSA9IGZhbHNlO1xuaWYgKFwiZGV2ZWxvcG1lbnRcIiAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIHRyeSB7XG4gICAgLy8gJEZsb3dGaXhNZSBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svZmxvdy9pc3N1ZXMvMjg1XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHt9LCAneCcsIHsgZ2V0OiBmdW5jdGlvbiAoKSB7fSB9KTtcbiAgICBjYW5EZWZpbmVQcm9wZXJ0eSA9IHRydWU7XG4gIH0gY2F0Y2ggKHgpIHtcbiAgICAvLyBJRSB3aWxsIGZhaWwgb24gZGVmaW5lUHJvcGVydHlcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNhbkRlZmluZVByb3BlcnR5OyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBfcHJvZEludmFyaWFudCA9IHJlcXVpcmUoJy4vcmVhY3RQcm9kSW52YXJpYW50Jyk7XG5cbnZhciBSZWFjdFByb3BUeXBlTG9jYXRpb25OYW1lcyA9IHJlcXVpcmUoJy4vUmVhY3RQcm9wVHlwZUxvY2F0aW9uTmFtZXMnKTtcbnZhciBSZWFjdFByb3BUeXBlc1NlY3JldCA9IHJlcXVpcmUoJy4vUmVhY3RQcm9wVHlwZXNTZWNyZXQnKTtcblxudmFyIGludmFyaWFudCA9IHJlcXVpcmUoJ2ZianMvbGliL2ludmFyaWFudCcpO1xudmFyIHdhcm5pbmcgPSByZXF1aXJlKCdmYmpzL2xpYi93YXJuaW5nJyk7XG5cbnZhciBSZWFjdENvbXBvbmVudFRyZWVIb29rO1xuXG5pZiAodHlwZW9mIHByb2Nlc3MgIT09ICd1bmRlZmluZWQnICYmIHByb2Nlc3MuZW52ICYmIFwiZGV2ZWxvcG1lbnRcIiA9PT0gJ3Rlc3QnKSB7XG4gIC8vIFRlbXBvcmFyeSBoYWNrLlxuICAvLyBJbmxpbmUgcmVxdWlyZXMgZG9uJ3Qgd29yayB3ZWxsIHdpdGggSmVzdDpcbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL3JlYWN0L2lzc3Vlcy83MjQwXG4gIC8vIFJlbW92ZSB0aGUgaW5saW5lIHJlcXVpcmVzIHdoZW4gd2UgZG9uJ3QgbmVlZCB0aGVtIGFueW1vcmU6XG4gIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9yZWFjdC9wdWxsLzcxNzhcbiAgUmVhY3RDb21wb25lbnRUcmVlSG9vayA9IHJlcXVpcmUoJy4vUmVhY3RDb21wb25lbnRUcmVlSG9vaycpO1xufVxuXG52YXIgbG9nZ2VkVHlwZUZhaWx1cmVzID0ge307XG5cbi8qKlxuICogQXNzZXJ0IHRoYXQgdGhlIHZhbHVlcyBtYXRjaCB3aXRoIHRoZSB0eXBlIHNwZWNzLlxuICogRXJyb3IgbWVzc2FnZXMgYXJlIG1lbW9yaXplZCBhbmQgd2lsbCBvbmx5IGJlIHNob3duIG9uY2UuXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IHR5cGVTcGVjcyBNYXAgb2YgbmFtZSB0byBhIFJlYWN0UHJvcFR5cGVcbiAqIEBwYXJhbSB7b2JqZWN0fSB2YWx1ZXMgUnVudGltZSB2YWx1ZXMgdGhhdCBuZWVkIHRvIGJlIHR5cGUtY2hlY2tlZFxuICogQHBhcmFtIHtzdHJpbmd9IGxvY2F0aW9uIGUuZy4gXCJwcm9wXCIsIFwiY29udGV4dFwiLCBcImNoaWxkIGNvbnRleHRcIlxuICogQHBhcmFtIHtzdHJpbmd9IGNvbXBvbmVudE5hbWUgTmFtZSBvZiB0aGUgY29tcG9uZW50IGZvciBlcnJvciBtZXNzYWdlcy5cbiAqIEBwYXJhbSB7P29iamVjdH0gZWxlbWVudCBUaGUgUmVhY3QgZWxlbWVudCB0aGF0IGlzIGJlaW5nIHR5cGUtY2hlY2tlZFxuICogQHBhcmFtIHs/bnVtYmVyfSBkZWJ1Z0lEIFRoZSBSZWFjdCBjb21wb25lbnQgaW5zdGFuY2UgdGhhdCBpcyBiZWluZyB0eXBlLWNoZWNrZWRcbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGNoZWNrUmVhY3RUeXBlU3BlYyh0eXBlU3BlY3MsIHZhbHVlcywgbG9jYXRpb24sIGNvbXBvbmVudE5hbWUsIGVsZW1lbnQsIGRlYnVnSUQpIHtcbiAgZm9yICh2YXIgdHlwZVNwZWNOYW1lIGluIHR5cGVTcGVjcykge1xuICAgIGlmICh0eXBlU3BlY3MuaGFzT3duUHJvcGVydHkodHlwZVNwZWNOYW1lKSkge1xuICAgICAgdmFyIGVycm9yO1xuICAgICAgLy8gUHJvcCB0eXBlIHZhbGlkYXRpb24gbWF5IHRocm93LiBJbiBjYXNlIHRoZXkgZG8sIHdlIGRvbid0IHdhbnQgdG9cbiAgICAgIC8vIGZhaWwgdGhlIHJlbmRlciBwaGFzZSB3aGVyZSBpdCBkaWRuJ3QgZmFpbCBiZWZvcmUuIFNvIHdlIGxvZyBpdC5cbiAgICAgIC8vIEFmdGVyIHRoZXNlIGhhdmUgYmVlbiBjbGVhbmVkIHVwLCB3ZSdsbCBsZXQgdGhlbSB0aHJvdy5cbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgaXMgaW50ZW50aW9uYWxseSBhbiBpbnZhcmlhbnQgdGhhdCBnZXRzIGNhdWdodC4gSXQncyB0aGUgc2FtZVxuICAgICAgICAvLyBiZWhhdmlvciBhcyB3aXRob3V0IHRoaXMgc3RhdGVtZW50IGV4Y2VwdCB3aXRoIGEgYmV0dGVyIG1lc3NhZ2UuXG4gICAgICAgICEodHlwZW9mIHR5cGVTcGVjc1t0eXBlU3BlY05hbWVdID09PSAnZnVuY3Rpb24nKSA/IFwiZGV2ZWxvcG1lbnRcIiAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnJXM6ICVzIHR5cGUgYCVzYCBpcyBpbnZhbGlkOyBpdCBtdXN0IGJlIGEgZnVuY3Rpb24sIHVzdWFsbHkgZnJvbSBSZWFjdC5Qcm9wVHlwZXMuJywgY29tcG9uZW50TmFtZSB8fCAnUmVhY3QgY2xhc3MnLCBSZWFjdFByb3BUeXBlTG9jYXRpb25OYW1lc1tsb2NhdGlvbl0sIHR5cGVTcGVjTmFtZSkgOiBfcHJvZEludmFyaWFudCgnODQnLCBjb21wb25lbnROYW1lIHx8ICdSZWFjdCBjbGFzcycsIFJlYWN0UHJvcFR5cGVMb2NhdGlvbk5hbWVzW2xvY2F0aW9uXSwgdHlwZVNwZWNOYW1lKSA6IHZvaWQgMDtcbiAgICAgICAgZXJyb3IgPSB0eXBlU3BlY3NbdHlwZVNwZWNOYW1lXSh2YWx1ZXMsIHR5cGVTcGVjTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIG51bGwsIFJlYWN0UHJvcFR5cGVzU2VjcmV0KTtcbiAgICAgIH0gY2F0Y2ggKGV4KSB7XG4gICAgICAgIGVycm9yID0gZXg7XG4gICAgICB9XG4gICAgICBcImRldmVsb3BtZW50XCIgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoIWVycm9yIHx8IGVycm9yIGluc3RhbmNlb2YgRXJyb3IsICclczogdHlwZSBzcGVjaWZpY2F0aW9uIG9mICVzIGAlc2AgaXMgaW52YWxpZDsgdGhlIHR5cGUgY2hlY2tlciAnICsgJ2Z1bmN0aW9uIG11c3QgcmV0dXJuIGBudWxsYCBvciBhbiBgRXJyb3JgIGJ1dCByZXR1cm5lZCBhICVzLiAnICsgJ1lvdSBtYXkgaGF2ZSBmb3Jnb3R0ZW4gdG8gcGFzcyBhbiBhcmd1bWVudCB0byB0aGUgdHlwZSBjaGVja2VyICcgKyAnY3JlYXRvciAoYXJyYXlPZiwgaW5zdGFuY2VPZiwgb2JqZWN0T2YsIG9uZU9mLCBvbmVPZlR5cGUsIGFuZCAnICsgJ3NoYXBlIGFsbCByZXF1aXJlIGFuIGFyZ3VtZW50KS4nLCBjb21wb25lbnROYW1lIHx8ICdSZWFjdCBjbGFzcycsIFJlYWN0UHJvcFR5cGVMb2NhdGlvbk5hbWVzW2xvY2F0aW9uXSwgdHlwZVNwZWNOYW1lLCB0eXBlb2YgZXJyb3IpIDogdm9pZCAwO1xuICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgRXJyb3IgJiYgIShlcnJvci5tZXNzYWdlIGluIGxvZ2dlZFR5cGVGYWlsdXJlcykpIHtcbiAgICAgICAgLy8gT25seSBtb25pdG9yIHRoaXMgZmFpbHVyZSBvbmNlIGJlY2F1c2UgdGhlcmUgdGVuZHMgdG8gYmUgYSBsb3Qgb2YgdGhlXG4gICAgICAgIC8vIHNhbWUgZXJyb3IuXG4gICAgICAgIGxvZ2dlZFR5cGVGYWlsdXJlc1tlcnJvci5tZXNzYWdlXSA9IHRydWU7XG5cbiAgICAgICAgdmFyIGNvbXBvbmVudFN0YWNrSW5mbyA9ICcnO1xuXG4gICAgICAgIGlmIChcImRldmVsb3BtZW50XCIgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgIGlmICghUmVhY3RDb21wb25lbnRUcmVlSG9vaykge1xuICAgICAgICAgICAgUmVhY3RDb21wb25lbnRUcmVlSG9vayA9IHJlcXVpcmUoJy4vUmVhY3RDb21wb25lbnRUcmVlSG9vaycpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoZGVidWdJRCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgY29tcG9uZW50U3RhY2tJbmZvID0gUmVhY3RDb21wb25lbnRUcmVlSG9vay5nZXRTdGFja0FkZGVuZHVtQnlJRChkZWJ1Z0lEKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKGVsZW1lbnQgIT09IG51bGwpIHtcbiAgICAgICAgICAgIGNvbXBvbmVudFN0YWNrSW5mbyA9IFJlYWN0Q29tcG9uZW50VHJlZUhvb2suZ2V0Q3VycmVudFN0YWNrQWRkZW5kdW0oZWxlbWVudCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgXCJkZXZlbG9wbWVudFwiICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKGZhbHNlLCAnRmFpbGVkICVzIHR5cGU6ICVzJXMnLCBsb2NhdGlvbiwgZXJyb3IubWVzc2FnZSwgY29tcG9uZW50U3RhY2tJbmZvKSA6IHZvaWQgMDtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjaGVja1JlYWN0VHlwZVNwZWM7IiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG4vKiBnbG9iYWwgU3ltYm9sICovXG5cbnZhciBJVEVSQVRPUl9TWU1CT0wgPSB0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nICYmIFN5bWJvbC5pdGVyYXRvcjtcbnZhciBGQVVYX0lURVJBVE9SX1NZTUJPTCA9ICdAQGl0ZXJhdG9yJzsgLy8gQmVmb3JlIFN5bWJvbCBzcGVjLlxuXG4vKipcbiAqIFJldHVybnMgdGhlIGl0ZXJhdG9yIG1ldGhvZCBmdW5jdGlvbiBjb250YWluZWQgb24gdGhlIGl0ZXJhYmxlIG9iamVjdC5cbiAqXG4gKiBCZSBzdXJlIHRvIGludm9rZSB0aGUgZnVuY3Rpb24gd2l0aCB0aGUgaXRlcmFibGUgYXMgY29udGV4dDpcbiAqXG4gKiAgICAgdmFyIGl0ZXJhdG9yRm4gPSBnZXRJdGVyYXRvckZuKG15SXRlcmFibGUpO1xuICogICAgIGlmIChpdGVyYXRvckZuKSB7XG4gKiAgICAgICB2YXIgaXRlcmF0b3IgPSBpdGVyYXRvckZuLmNhbGwobXlJdGVyYWJsZSk7XG4gKiAgICAgICAuLi5cbiAqICAgICB9XG4gKlxuICogQHBhcmFtIHs/b2JqZWN0fSBtYXliZUl0ZXJhYmxlXG4gKiBAcmV0dXJuIHs/ZnVuY3Rpb259XG4gKi9cbmZ1bmN0aW9uIGdldEl0ZXJhdG9yRm4obWF5YmVJdGVyYWJsZSkge1xuICB2YXIgaXRlcmF0b3JGbiA9IG1heWJlSXRlcmFibGUgJiYgKElURVJBVE9SX1NZTUJPTCAmJiBtYXliZUl0ZXJhYmxlW0lURVJBVE9SX1NZTUJPTF0gfHwgbWF5YmVJdGVyYWJsZVtGQVVYX0lURVJBVE9SX1NZTUJPTF0pO1xuICBpZiAodHlwZW9mIGl0ZXJhdG9yRm4gPT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gaXRlcmF0b3JGbjtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGdldEl0ZXJhdG9yRm47IiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICovXG4ndXNlIHN0cmljdCc7XG5cbnZhciBfcHJvZEludmFyaWFudCA9IHJlcXVpcmUoJy4vcmVhY3RQcm9kSW52YXJpYW50Jyk7XG5cbnZhciBSZWFjdEVsZW1lbnQgPSByZXF1aXJlKCcuL1JlYWN0RWxlbWVudCcpO1xuXG52YXIgaW52YXJpYW50ID0gcmVxdWlyZSgnZmJqcy9saWIvaW52YXJpYW50Jyk7XG5cbi8qKlxuICogUmV0dXJucyB0aGUgZmlyc3QgY2hpbGQgaW4gYSBjb2xsZWN0aW9uIG9mIGNoaWxkcmVuIGFuZCB2ZXJpZmllcyB0aGF0IHRoZXJlXG4gKiBpcyBvbmx5IG9uZSBjaGlsZCBpbiB0aGUgY29sbGVjdGlvbi5cbiAqXG4gKiBTZWUgaHR0cHM6Ly9mYWNlYm9vay5naXRodWIuaW8vcmVhY3QvZG9jcy90b3AtbGV2ZWwtYXBpLmh0bWwjcmVhY3QuY2hpbGRyZW4ub25seVxuICpcbiAqIFRoZSBjdXJyZW50IGltcGxlbWVudGF0aW9uIG9mIHRoaXMgZnVuY3Rpb24gYXNzdW1lcyB0aGF0IGEgc2luZ2xlIGNoaWxkIGdldHNcbiAqIHBhc3NlZCB3aXRob3V0IGEgd3JhcHBlciwgYnV0IHRoZSBwdXJwb3NlIG9mIHRoaXMgaGVscGVyIGZ1bmN0aW9uIGlzIHRvXG4gKiBhYnN0cmFjdCBhd2F5IHRoZSBwYXJ0aWN1bGFyIHN0cnVjdHVyZSBvZiBjaGlsZHJlbi5cbiAqXG4gKiBAcGFyYW0gez9vYmplY3R9IGNoaWxkcmVuIENoaWxkIGNvbGxlY3Rpb24gc3RydWN0dXJlLlxuICogQHJldHVybiB7UmVhY3RFbGVtZW50fSBUaGUgZmlyc3QgYW5kIG9ubHkgYFJlYWN0RWxlbWVudGAgY29udGFpbmVkIGluIHRoZVxuICogc3RydWN0dXJlLlxuICovXG5mdW5jdGlvbiBvbmx5Q2hpbGQoY2hpbGRyZW4pIHtcbiAgIVJlYWN0RWxlbWVudC5pc1ZhbGlkRWxlbWVudChjaGlsZHJlbikgPyBcImRldmVsb3BtZW50XCIgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ1JlYWN0LkNoaWxkcmVuLm9ubHkgZXhwZWN0ZWQgdG8gcmVjZWl2ZSBhIHNpbmdsZSBSZWFjdCBlbGVtZW50IGNoaWxkLicpIDogX3Byb2RJbnZhcmlhbnQoJzE0MycpIDogdm9pZCAwO1xuICByZXR1cm4gY2hpbGRyZW47XG59XG5cbm1vZHVsZS5leHBvcnRzID0gb25seUNoaWxkOyIsIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBcbiAqL1xuJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIFdBUk5JTkc6IERPIE5PVCBtYW51YWxseSByZXF1aXJlIHRoaXMgbW9kdWxlLlxuICogVGhpcyBpcyBhIHJlcGxhY2VtZW50IGZvciBgaW52YXJpYW50KC4uLilgIHVzZWQgYnkgdGhlIGVycm9yIGNvZGUgc3lzdGVtXG4gKiBhbmQgd2lsbCBfb25seV8gYmUgcmVxdWlyZWQgYnkgdGhlIGNvcnJlc3BvbmRpbmcgYmFiZWwgcGFzcy5cbiAqIEl0IGFsd2F5cyB0aHJvd3MuXG4gKi9cblxuZnVuY3Rpb24gcmVhY3RQcm9kSW52YXJpYW50KGNvZGUpIHtcbiAgdmFyIGFyZ0NvdW50ID0gYXJndW1lbnRzLmxlbmd0aCAtIDE7XG5cbiAgdmFyIG1lc3NhZ2UgPSAnTWluaWZpZWQgUmVhY3QgZXJyb3IgIycgKyBjb2RlICsgJzsgdmlzaXQgJyArICdodHRwOi8vZmFjZWJvb2suZ2l0aHViLmlvL3JlYWN0L2RvY3MvZXJyb3ItZGVjb2Rlci5odG1sP2ludmFyaWFudD0nICsgY29kZTtcblxuICBmb3IgKHZhciBhcmdJZHggPSAwOyBhcmdJZHggPCBhcmdDb3VudDsgYXJnSWR4KyspIHtcbiAgICBtZXNzYWdlICs9ICcmYXJnc1tdPScgKyBlbmNvZGVVUklDb21wb25lbnQoYXJndW1lbnRzW2FyZ0lkeCArIDFdKTtcbiAgfVxuXG4gIG1lc3NhZ2UgKz0gJyBmb3IgdGhlIGZ1bGwgbWVzc2FnZSBvciB1c2UgdGhlIG5vbi1taW5pZmllZCBkZXYgZW52aXJvbm1lbnQnICsgJyBmb3IgZnVsbCBlcnJvcnMgYW5kIGFkZGl0aW9uYWwgaGVscGZ1bCB3YXJuaW5ncy4nO1xuXG4gIHZhciBlcnJvciA9IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgZXJyb3IubmFtZSA9ICdJbnZhcmlhbnQgVmlvbGF0aW9uJztcbiAgZXJyb3IuZnJhbWVzVG9Qb3AgPSAxOyAvLyB3ZSBkb24ndCBjYXJlIGFib3V0IHJlYWN0UHJvZEludmFyaWFudCdzIG93biBmcmFtZVxuXG4gIHRocm93IGVycm9yO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHJlYWN0UHJvZEludmFyaWFudDsiLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgX3Byb2RJbnZhcmlhbnQgPSByZXF1aXJlKCcuL3JlYWN0UHJvZEludmFyaWFudCcpO1xuXG52YXIgUmVhY3RDdXJyZW50T3duZXIgPSByZXF1aXJlKCcuL1JlYWN0Q3VycmVudE93bmVyJyk7XG52YXIgUkVBQ1RfRUxFTUVOVF9UWVBFID0gcmVxdWlyZSgnLi9SZWFjdEVsZW1lbnRTeW1ib2wnKTtcblxudmFyIGdldEl0ZXJhdG9yRm4gPSByZXF1aXJlKCcuL2dldEl0ZXJhdG9yRm4nKTtcbnZhciBpbnZhcmlhbnQgPSByZXF1aXJlKCdmYmpzL2xpYi9pbnZhcmlhbnQnKTtcbnZhciBLZXlFc2NhcGVVdGlscyA9IHJlcXVpcmUoJy4vS2V5RXNjYXBlVXRpbHMnKTtcbnZhciB3YXJuaW5nID0gcmVxdWlyZSgnZmJqcy9saWIvd2FybmluZycpO1xuXG52YXIgU0VQQVJBVE9SID0gJy4nO1xudmFyIFNVQlNFUEFSQVRPUiA9ICc6JztcblxuLyoqXG4gKiBUaGlzIGlzIGlubGluZWQgZnJvbSBSZWFjdEVsZW1lbnQgc2luY2UgdGhpcyBmaWxlIGlzIHNoYXJlZCBiZXR3ZWVuXG4gKiBpc29tb3JwaGljIGFuZCByZW5kZXJlcnMuIFdlIGNvdWxkIGV4dHJhY3QgdGhpcyB0byBhXG4gKlxuICovXG5cbi8qKlxuICogVE9ETzogVGVzdCB0aGF0IGEgc2luZ2xlIGNoaWxkIGFuZCBhbiBhcnJheSB3aXRoIG9uZSBpdGVtIGhhdmUgdGhlIHNhbWUga2V5XG4gKiBwYXR0ZXJuLlxuICovXG5cbnZhciBkaWRXYXJuQWJvdXRNYXBzID0gZmFsc2U7XG5cbi8qKlxuICogR2VuZXJhdGUgYSBrZXkgc3RyaW5nIHRoYXQgaWRlbnRpZmllcyBhIGNvbXBvbmVudCB3aXRoaW4gYSBzZXQuXG4gKlxuICogQHBhcmFtIHsqfSBjb21wb25lbnQgQSBjb21wb25lbnQgdGhhdCBjb3VsZCBjb250YWluIGEgbWFudWFsIGtleS5cbiAqIEBwYXJhbSB7bnVtYmVyfSBpbmRleCBJbmRleCB0aGF0IGlzIHVzZWQgaWYgYSBtYW51YWwga2V5IGlzIG5vdCBwcm92aWRlZC5cbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xuZnVuY3Rpb24gZ2V0Q29tcG9uZW50S2V5KGNvbXBvbmVudCwgaW5kZXgpIHtcbiAgLy8gRG8gc29tZSB0eXBlY2hlY2tpbmcgaGVyZSBzaW5jZSB3ZSBjYWxsIHRoaXMgYmxpbmRseS4gV2Ugd2FudCB0byBlbnN1cmVcbiAgLy8gdGhhdCB3ZSBkb24ndCBibG9jayBwb3RlbnRpYWwgZnV0dXJlIEVTIEFQSXMuXG4gIGlmIChjb21wb25lbnQgJiYgdHlwZW9mIGNvbXBvbmVudCA9PT0gJ29iamVjdCcgJiYgY29tcG9uZW50LmtleSAhPSBudWxsKSB7XG4gICAgLy8gRXhwbGljaXQga2V5XG4gICAgcmV0dXJuIEtleUVzY2FwZVV0aWxzLmVzY2FwZShjb21wb25lbnQua2V5KTtcbiAgfVxuICAvLyBJbXBsaWNpdCBrZXkgZGV0ZXJtaW5lZCBieSB0aGUgaW5kZXggaW4gdGhlIHNldFxuICByZXR1cm4gaW5kZXgudG9TdHJpbmcoMzYpO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7Pyp9IGNoaWxkcmVuIENoaWxkcmVuIHRyZWUgY29udGFpbmVyLlxuICogQHBhcmFtIHshc3RyaW5nfSBuYW1lU29GYXIgTmFtZSBvZiB0aGUga2V5IHBhdGggc28gZmFyLlxuICogQHBhcmFtIHshZnVuY3Rpb259IGNhbGxiYWNrIENhbGxiYWNrIHRvIGludm9rZSB3aXRoIGVhY2ggY2hpbGQgZm91bmQuXG4gKiBAcGFyYW0gez8qfSB0cmF2ZXJzZUNvbnRleHQgVXNlZCB0byBwYXNzIGluZm9ybWF0aW9uIHRocm91Z2hvdXQgdGhlIHRyYXZlcnNhbFxuICogcHJvY2Vzcy5cbiAqIEByZXR1cm4geyFudW1iZXJ9IFRoZSBudW1iZXIgb2YgY2hpbGRyZW4gaW4gdGhpcyBzdWJ0cmVlLlxuICovXG5mdW5jdGlvbiB0cmF2ZXJzZUFsbENoaWxkcmVuSW1wbChjaGlsZHJlbiwgbmFtZVNvRmFyLCBjYWxsYmFjaywgdHJhdmVyc2VDb250ZXh0KSB7XG4gIHZhciB0eXBlID0gdHlwZW9mIGNoaWxkcmVuO1xuXG4gIGlmICh0eXBlID09PSAndW5kZWZpbmVkJyB8fCB0eXBlID09PSAnYm9vbGVhbicpIHtcbiAgICAvLyBBbGwgb2YgdGhlIGFib3ZlIGFyZSBwZXJjZWl2ZWQgYXMgbnVsbC5cbiAgICBjaGlsZHJlbiA9IG51bGw7XG4gIH1cblxuICBpZiAoY2hpbGRyZW4gPT09IG51bGwgfHwgdHlwZSA9PT0gJ3N0cmluZycgfHwgdHlwZSA9PT0gJ251bWJlcicgfHxcbiAgLy8gVGhlIGZvbGxvd2luZyBpcyBpbmxpbmVkIGZyb20gUmVhY3RFbGVtZW50LiBUaGlzIG1lYW5zIHdlIGNhbiBvcHRpbWl6ZVxuICAvLyBzb21lIGNoZWNrcy4gUmVhY3QgRmliZXIgYWxzbyBpbmxpbmVzIHRoaXMgbG9naWMgZm9yIHNpbWlsYXIgcHVycG9zZXMuXG4gIHR5cGUgPT09ICdvYmplY3QnICYmIGNoaWxkcmVuLiQkdHlwZW9mID09PSBSRUFDVF9FTEVNRU5UX1RZUEUpIHtcbiAgICBjYWxsYmFjayh0cmF2ZXJzZUNvbnRleHQsIGNoaWxkcmVuLFxuICAgIC8vIElmIGl0J3MgdGhlIG9ubHkgY2hpbGQsIHRyZWF0IHRoZSBuYW1lIGFzIGlmIGl0IHdhcyB3cmFwcGVkIGluIGFuIGFycmF5XG4gICAgLy8gc28gdGhhdCBpdCdzIGNvbnNpc3RlbnQgaWYgdGhlIG51bWJlciBvZiBjaGlsZHJlbiBncm93cy5cbiAgICBuYW1lU29GYXIgPT09ICcnID8gU0VQQVJBVE9SICsgZ2V0Q29tcG9uZW50S2V5KGNoaWxkcmVuLCAwKSA6IG5hbWVTb0Zhcik7XG4gICAgcmV0dXJuIDE7XG4gIH1cblxuICB2YXIgY2hpbGQ7XG4gIHZhciBuZXh0TmFtZTtcbiAgdmFyIHN1YnRyZWVDb3VudCA9IDA7IC8vIENvdW50IG9mIGNoaWxkcmVuIGZvdW5kIGluIHRoZSBjdXJyZW50IHN1YnRyZWUuXG4gIHZhciBuZXh0TmFtZVByZWZpeCA9IG5hbWVTb0ZhciA9PT0gJycgPyBTRVBBUkFUT1IgOiBuYW1lU29GYXIgKyBTVUJTRVBBUkFUT1I7XG5cbiAgaWYgKEFycmF5LmlzQXJyYXkoY2hpbGRyZW4pKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgY2hpbGQgPSBjaGlsZHJlbltpXTtcbiAgICAgIG5leHROYW1lID0gbmV4dE5hbWVQcmVmaXggKyBnZXRDb21wb25lbnRLZXkoY2hpbGQsIGkpO1xuICAgICAgc3VidHJlZUNvdW50ICs9IHRyYXZlcnNlQWxsQ2hpbGRyZW5JbXBsKGNoaWxkLCBuZXh0TmFtZSwgY2FsbGJhY2ssIHRyYXZlcnNlQ29udGV4dCk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHZhciBpdGVyYXRvckZuID0gZ2V0SXRlcmF0b3JGbihjaGlsZHJlbik7XG4gICAgaWYgKGl0ZXJhdG9yRm4pIHtcbiAgICAgIHZhciBpdGVyYXRvciA9IGl0ZXJhdG9yRm4uY2FsbChjaGlsZHJlbik7XG4gICAgICB2YXIgc3RlcDtcbiAgICAgIGlmIChpdGVyYXRvckZuICE9PSBjaGlsZHJlbi5lbnRyaWVzKSB7XG4gICAgICAgIHZhciBpaSA9IDA7XG4gICAgICAgIHdoaWxlICghKHN0ZXAgPSBpdGVyYXRvci5uZXh0KCkpLmRvbmUpIHtcbiAgICAgICAgICBjaGlsZCA9IHN0ZXAudmFsdWU7XG4gICAgICAgICAgbmV4dE5hbWUgPSBuZXh0TmFtZVByZWZpeCArIGdldENvbXBvbmVudEtleShjaGlsZCwgaWkrKyk7XG4gICAgICAgICAgc3VidHJlZUNvdW50ICs9IHRyYXZlcnNlQWxsQ2hpbGRyZW5JbXBsKGNoaWxkLCBuZXh0TmFtZSwgY2FsbGJhY2ssIHRyYXZlcnNlQ29udGV4dCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChcImRldmVsb3BtZW50XCIgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgIHZhciBtYXBzQXNDaGlsZHJlbkFkZGVuZHVtID0gJyc7XG4gICAgICAgICAgaWYgKFJlYWN0Q3VycmVudE93bmVyLmN1cnJlbnQpIHtcbiAgICAgICAgICAgIHZhciBtYXBzQXNDaGlsZHJlbk93bmVyTmFtZSA9IFJlYWN0Q3VycmVudE93bmVyLmN1cnJlbnQuZ2V0TmFtZSgpO1xuICAgICAgICAgICAgaWYgKG1hcHNBc0NoaWxkcmVuT3duZXJOYW1lKSB7XG4gICAgICAgICAgICAgIG1hcHNBc0NoaWxkcmVuQWRkZW5kdW0gPSAnIENoZWNrIHRoZSByZW5kZXIgbWV0aG9kIG9mIGAnICsgbWFwc0FzQ2hpbGRyZW5Pd25lck5hbWUgKyAnYC4nO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBcImRldmVsb3BtZW50XCIgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoZGlkV2FybkFib3V0TWFwcywgJ1VzaW5nIE1hcHMgYXMgY2hpbGRyZW4gaXMgbm90IHlldCBmdWxseSBzdXBwb3J0ZWQuIEl0IGlzIGFuICcgKyAnZXhwZXJpbWVudGFsIGZlYXR1cmUgdGhhdCBtaWdodCBiZSByZW1vdmVkLiBDb252ZXJ0IGl0IHRvIGEgJyArICdzZXF1ZW5jZSAvIGl0ZXJhYmxlIG9mIGtleWVkIFJlYWN0RWxlbWVudHMgaW5zdGVhZC4lcycsIG1hcHNBc0NoaWxkcmVuQWRkZW5kdW0pIDogdm9pZCAwO1xuICAgICAgICAgIGRpZFdhcm5BYm91dE1hcHMgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIC8vIEl0ZXJhdG9yIHdpbGwgcHJvdmlkZSBlbnRyeSBbayx2XSB0dXBsZXMgcmF0aGVyIHRoYW4gdmFsdWVzLlxuICAgICAgICB3aGlsZSAoIShzdGVwID0gaXRlcmF0b3IubmV4dCgpKS5kb25lKSB7XG4gICAgICAgICAgdmFyIGVudHJ5ID0gc3RlcC52YWx1ZTtcbiAgICAgICAgICBpZiAoZW50cnkpIHtcbiAgICAgICAgICAgIGNoaWxkID0gZW50cnlbMV07XG4gICAgICAgICAgICBuZXh0TmFtZSA9IG5leHROYW1lUHJlZml4ICsgS2V5RXNjYXBlVXRpbHMuZXNjYXBlKGVudHJ5WzBdKSArIFNVQlNFUEFSQVRPUiArIGdldENvbXBvbmVudEtleShjaGlsZCwgMCk7XG4gICAgICAgICAgICBzdWJ0cmVlQ291bnQgKz0gdHJhdmVyc2VBbGxDaGlsZHJlbkltcGwoY2hpbGQsIG5leHROYW1lLCBjYWxsYmFjaywgdHJhdmVyc2VDb250ZXh0KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdvYmplY3QnKSB7XG4gICAgICB2YXIgYWRkZW5kdW0gPSAnJztcbiAgICAgIGlmIChcImRldmVsb3BtZW50XCIgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICBhZGRlbmR1bSA9ICcgSWYgeW91IG1lYW50IHRvIHJlbmRlciBhIGNvbGxlY3Rpb24gb2YgY2hpbGRyZW4sIHVzZSBhbiBhcnJheSAnICsgJ2luc3RlYWQgb3Igd3JhcCB0aGUgb2JqZWN0IHVzaW5nIGNyZWF0ZUZyYWdtZW50KG9iamVjdCkgZnJvbSB0aGUgJyArICdSZWFjdCBhZGQtb25zLic7XG4gICAgICAgIGlmIChjaGlsZHJlbi5faXNSZWFjdEVsZW1lbnQpIHtcbiAgICAgICAgICBhZGRlbmR1bSA9ICcgSXQgbG9va3MgbGlrZSB5b3VcXCdyZSB1c2luZyBhbiBlbGVtZW50IGNyZWF0ZWQgYnkgYSBkaWZmZXJlbnQgJyArICd2ZXJzaW9uIG9mIFJlYWN0LiBNYWtlIHN1cmUgdG8gdXNlIG9ubHkgb25lIGNvcHkgb2YgUmVhY3QuJztcbiAgICAgICAgfVxuICAgICAgICBpZiAoUmVhY3RDdXJyZW50T3duZXIuY3VycmVudCkge1xuICAgICAgICAgIHZhciBuYW1lID0gUmVhY3RDdXJyZW50T3duZXIuY3VycmVudC5nZXROYW1lKCk7XG4gICAgICAgICAgaWYgKG5hbWUpIHtcbiAgICAgICAgICAgIGFkZGVuZHVtICs9ICcgQ2hlY2sgdGhlIHJlbmRlciBtZXRob2Qgb2YgYCcgKyBuYW1lICsgJ2AuJztcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHZhciBjaGlsZHJlblN0cmluZyA9IFN0cmluZyhjaGlsZHJlbik7XG4gICAgICAhZmFsc2UgPyBcImRldmVsb3BtZW50XCIgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ09iamVjdHMgYXJlIG5vdCB2YWxpZCBhcyBhIFJlYWN0IGNoaWxkIChmb3VuZDogJXMpLiVzJywgY2hpbGRyZW5TdHJpbmcgPT09ICdbb2JqZWN0IE9iamVjdF0nID8gJ29iamVjdCB3aXRoIGtleXMgeycgKyBPYmplY3Qua2V5cyhjaGlsZHJlbikuam9pbignLCAnKSArICd9JyA6IGNoaWxkcmVuU3RyaW5nLCBhZGRlbmR1bSkgOiBfcHJvZEludmFyaWFudCgnMzEnLCBjaGlsZHJlblN0cmluZyA9PT0gJ1tvYmplY3QgT2JqZWN0XScgPyAnb2JqZWN0IHdpdGgga2V5cyB7JyArIE9iamVjdC5rZXlzKGNoaWxkcmVuKS5qb2luKCcsICcpICsgJ30nIDogY2hpbGRyZW5TdHJpbmcsIGFkZGVuZHVtKSA6IHZvaWQgMDtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gc3VidHJlZUNvdW50O1xufVxuXG4vKipcbiAqIFRyYXZlcnNlcyBjaGlsZHJlbiB0aGF0IGFyZSB0eXBpY2FsbHkgc3BlY2lmaWVkIGFzIGBwcm9wcy5jaGlsZHJlbmAsIGJ1dFxuICogbWlnaHQgYWxzbyBiZSBzcGVjaWZpZWQgdGhyb3VnaCBhdHRyaWJ1dGVzOlxuICpcbiAqIC0gYHRyYXZlcnNlQWxsQ2hpbGRyZW4odGhpcy5wcm9wcy5jaGlsZHJlbiwgLi4uKWBcbiAqIC0gYHRyYXZlcnNlQWxsQ2hpbGRyZW4odGhpcy5wcm9wcy5sZWZ0UGFuZWxDaGlsZHJlbiwgLi4uKWBcbiAqXG4gKiBUaGUgYHRyYXZlcnNlQ29udGV4dGAgaXMgYW4gb3B0aW9uYWwgYXJndW1lbnQgdGhhdCBpcyBwYXNzZWQgdGhyb3VnaCB0aGVcbiAqIGVudGlyZSB0cmF2ZXJzYWwuIEl0IGNhbiBiZSB1c2VkIHRvIHN0b3JlIGFjY3VtdWxhdGlvbnMgb3IgYW55dGhpbmcgZWxzZSB0aGF0XG4gKiB0aGUgY2FsbGJhY2sgbWlnaHQgZmluZCByZWxldmFudC5cbiAqXG4gKiBAcGFyYW0gez8qfSBjaGlsZHJlbiBDaGlsZHJlbiB0cmVlIG9iamVjdC5cbiAqIEBwYXJhbSB7IWZ1bmN0aW9ufSBjYWxsYmFjayBUbyBpbnZva2UgdXBvbiB0cmF2ZXJzaW5nIGVhY2ggY2hpbGQuXG4gKiBAcGFyYW0gez8qfSB0cmF2ZXJzZUNvbnRleHQgQ29udGV4dCBmb3IgdHJhdmVyc2FsLlxuICogQHJldHVybiB7IW51bWJlcn0gVGhlIG51bWJlciBvZiBjaGlsZHJlbiBpbiB0aGlzIHN1YnRyZWUuXG4gKi9cbmZ1bmN0aW9uIHRyYXZlcnNlQWxsQ2hpbGRyZW4oY2hpbGRyZW4sIGNhbGxiYWNrLCB0cmF2ZXJzZUNvbnRleHQpIHtcbiAgaWYgKGNoaWxkcmVuID09IG51bGwpIHtcbiAgICByZXR1cm4gMDtcbiAgfVxuXG4gIHJldHVybiB0cmF2ZXJzZUFsbENoaWxkcmVuSW1wbChjaGlsZHJlbiwgJycsIGNhbGxiYWNrLCB0cmF2ZXJzZUNvbnRleHQpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHRyYXZlcnNlQWxsQ2hpbGRyZW47IiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vbGliL1JlYWN0Jyk7XG4iLCIoZnVuY3Rpb24oc2VsZikge1xuICAndXNlIHN0cmljdCc7XG5cbiAgaWYgKHNlbGYuZmV0Y2gpIHtcbiAgICByZXR1cm5cbiAgfVxuXG4gIHZhciBzdXBwb3J0ID0ge1xuICAgIHNlYXJjaFBhcmFtczogJ1VSTFNlYXJjaFBhcmFtcycgaW4gc2VsZixcbiAgICBpdGVyYWJsZTogJ1N5bWJvbCcgaW4gc2VsZiAmJiAnaXRlcmF0b3InIGluIFN5bWJvbCxcbiAgICBibG9iOiAnRmlsZVJlYWRlcicgaW4gc2VsZiAmJiAnQmxvYicgaW4gc2VsZiAmJiAoZnVuY3Rpb24oKSB7XG4gICAgICB0cnkge1xuICAgICAgICBuZXcgQmxvYigpXG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgICB9IGNhdGNoKGUpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICB9XG4gICAgfSkoKSxcbiAgICBmb3JtRGF0YTogJ0Zvcm1EYXRhJyBpbiBzZWxmLFxuICAgIGFycmF5QnVmZmVyOiAnQXJyYXlCdWZmZXInIGluIHNlbGZcbiAgfVxuXG4gIGlmIChzdXBwb3J0LmFycmF5QnVmZmVyKSB7XG4gICAgdmFyIHZpZXdDbGFzc2VzID0gW1xuICAgICAgJ1tvYmplY3QgSW50OEFycmF5XScsXG4gICAgICAnW29iamVjdCBVaW50OEFycmF5XScsXG4gICAgICAnW29iamVjdCBVaW50OENsYW1wZWRBcnJheV0nLFxuICAgICAgJ1tvYmplY3QgSW50MTZBcnJheV0nLFxuICAgICAgJ1tvYmplY3QgVWludDE2QXJyYXldJyxcbiAgICAgICdbb2JqZWN0IEludDMyQXJyYXldJyxcbiAgICAgICdbb2JqZWN0IFVpbnQzMkFycmF5XScsXG4gICAgICAnW29iamVjdCBGbG9hdDMyQXJyYXldJyxcbiAgICAgICdbb2JqZWN0IEZsb2F0NjRBcnJheV0nXG4gICAgXVxuXG4gICAgdmFyIGlzRGF0YVZpZXcgPSBmdW5jdGlvbihvYmopIHtcbiAgICAgIHJldHVybiBvYmogJiYgRGF0YVZpZXcucHJvdG90eXBlLmlzUHJvdG90eXBlT2Yob2JqKVxuICAgIH1cblxuICAgIHZhciBpc0FycmF5QnVmZmVyVmlldyA9IEFycmF5QnVmZmVyLmlzVmlldyB8fCBmdW5jdGlvbihvYmopIHtcbiAgICAgIHJldHVybiBvYmogJiYgdmlld0NsYXNzZXMuaW5kZXhPZihPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqKSkgPiAtMVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIG5vcm1hbGl6ZU5hbWUobmFtZSkge1xuICAgIGlmICh0eXBlb2YgbmFtZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgIG5hbWUgPSBTdHJpbmcobmFtZSlcbiAgICB9XG4gICAgaWYgKC9bXmEtejAtOVxcLSMkJSYnKisuXFxeX2B8fl0vaS50ZXN0KG5hbWUpKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIGNoYXJhY3RlciBpbiBoZWFkZXIgZmllbGQgbmFtZScpXG4gICAgfVxuICAgIHJldHVybiBuYW1lLnRvTG93ZXJDYXNlKClcbiAgfVxuXG4gIGZ1bmN0aW9uIG5vcm1hbGl6ZVZhbHVlKHZhbHVlKSB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHZhbHVlID0gU3RyaW5nKHZhbHVlKVxuICAgIH1cbiAgICByZXR1cm4gdmFsdWVcbiAgfVxuXG4gIC8vIEJ1aWxkIGEgZGVzdHJ1Y3RpdmUgaXRlcmF0b3IgZm9yIHRoZSB2YWx1ZSBsaXN0XG4gIGZ1bmN0aW9uIGl0ZXJhdG9yRm9yKGl0ZW1zKSB7XG4gICAgdmFyIGl0ZXJhdG9yID0ge1xuICAgICAgbmV4dDogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciB2YWx1ZSA9IGl0ZW1zLnNoaWZ0KClcbiAgICAgICAgcmV0dXJuIHtkb25lOiB2YWx1ZSA9PT0gdW5kZWZpbmVkLCB2YWx1ZTogdmFsdWV9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHN1cHBvcnQuaXRlcmFibGUpIHtcbiAgICAgIGl0ZXJhdG9yW1N5bWJvbC5pdGVyYXRvcl0gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGl0ZXJhdG9yXG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGl0ZXJhdG9yXG4gIH1cblxuICBmdW5jdGlvbiBIZWFkZXJzKGhlYWRlcnMpIHtcbiAgICB0aGlzLm1hcCA9IHt9XG5cbiAgICBpZiAoaGVhZGVycyBpbnN0YW5jZW9mIEhlYWRlcnMpIHtcbiAgICAgIGhlYWRlcnMuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSwgbmFtZSkge1xuICAgICAgICB0aGlzLmFwcGVuZChuYW1lLCB2YWx1ZSlcbiAgICAgIH0sIHRoaXMpXG5cbiAgICB9IGVsc2UgaWYgKGhlYWRlcnMpIHtcbiAgICAgIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKGhlYWRlcnMpLmZvckVhY2goZnVuY3Rpb24obmFtZSkge1xuICAgICAgICB0aGlzLmFwcGVuZChuYW1lLCBoZWFkZXJzW25hbWVdKVxuICAgICAgfSwgdGhpcylcbiAgICB9XG4gIH1cblxuICBIZWFkZXJzLnByb3RvdHlwZS5hcHBlbmQgPSBmdW5jdGlvbihuYW1lLCB2YWx1ZSkge1xuICAgIG5hbWUgPSBub3JtYWxpemVOYW1lKG5hbWUpXG4gICAgdmFsdWUgPSBub3JtYWxpemVWYWx1ZSh2YWx1ZSlcbiAgICB2YXIgbGlzdCA9IHRoaXMubWFwW25hbWVdXG4gICAgaWYgKCFsaXN0KSB7XG4gICAgICBsaXN0ID0gW11cbiAgICAgIHRoaXMubWFwW25hbWVdID0gbGlzdFxuICAgIH1cbiAgICBsaXN0LnB1c2godmFsdWUpXG4gIH1cblxuICBIZWFkZXJzLnByb3RvdHlwZVsnZGVsZXRlJ10gPSBmdW5jdGlvbihuYW1lKSB7XG4gICAgZGVsZXRlIHRoaXMubWFwW25vcm1hbGl6ZU5hbWUobmFtZSldXG4gIH1cblxuICBIZWFkZXJzLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbihuYW1lKSB7XG4gICAgdmFyIHZhbHVlcyA9IHRoaXMubWFwW25vcm1hbGl6ZU5hbWUobmFtZSldXG4gICAgcmV0dXJuIHZhbHVlcyA/IHZhbHVlc1swXSA6IG51bGxcbiAgfVxuXG4gIEhlYWRlcnMucHJvdG90eXBlLmdldEFsbCA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICByZXR1cm4gdGhpcy5tYXBbbm9ybWFsaXplTmFtZShuYW1lKV0gfHwgW11cbiAgfVxuXG4gIEhlYWRlcnMucHJvdG90eXBlLmhhcyA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAuaGFzT3duUHJvcGVydHkobm9ybWFsaXplTmFtZShuYW1lKSlcbiAgfVxuXG4gIEhlYWRlcnMucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uKG5hbWUsIHZhbHVlKSB7XG4gICAgdGhpcy5tYXBbbm9ybWFsaXplTmFtZShuYW1lKV0gPSBbbm9ybWFsaXplVmFsdWUodmFsdWUpXVxuICB9XG5cbiAgSGVhZGVycy5wcm90b3R5cGUuZm9yRWFjaCA9IGZ1bmN0aW9uKGNhbGxiYWNrLCB0aGlzQXJnKSB7XG4gICAgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModGhpcy5tYXApLmZvckVhY2goZnVuY3Rpb24obmFtZSkge1xuICAgICAgdGhpcy5tYXBbbmFtZV0uZm9yRWFjaChmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICBjYWxsYmFjay5jYWxsKHRoaXNBcmcsIHZhbHVlLCBuYW1lLCB0aGlzKVxuICAgICAgfSwgdGhpcylcbiAgICB9LCB0aGlzKVxuICB9XG5cbiAgSGVhZGVycy5wcm90b3R5cGUua2V5cyA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBpdGVtcyA9IFtdXG4gICAgdGhpcy5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlLCBuYW1lKSB7IGl0ZW1zLnB1c2gobmFtZSkgfSlcbiAgICByZXR1cm4gaXRlcmF0b3JGb3IoaXRlbXMpXG4gIH1cblxuICBIZWFkZXJzLnByb3RvdHlwZS52YWx1ZXMgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgaXRlbXMgPSBbXVxuICAgIHRoaXMuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSkgeyBpdGVtcy5wdXNoKHZhbHVlKSB9KVxuICAgIHJldHVybiBpdGVyYXRvckZvcihpdGVtcylcbiAgfVxuXG4gIEhlYWRlcnMucHJvdG90eXBlLmVudHJpZXMgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgaXRlbXMgPSBbXVxuICAgIHRoaXMuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSwgbmFtZSkgeyBpdGVtcy5wdXNoKFtuYW1lLCB2YWx1ZV0pIH0pXG4gICAgcmV0dXJuIGl0ZXJhdG9yRm9yKGl0ZW1zKVxuICB9XG5cbiAgaWYgKHN1cHBvcnQuaXRlcmFibGUpIHtcbiAgICBIZWFkZXJzLnByb3RvdHlwZVtTeW1ib2wuaXRlcmF0b3JdID0gSGVhZGVycy5wcm90b3R5cGUuZW50cmllc1xuICB9XG5cbiAgZnVuY3Rpb24gY29uc3VtZWQoYm9keSkge1xuICAgIGlmIChib2R5LmJvZHlVc2VkKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IFR5cGVFcnJvcignQWxyZWFkeSByZWFkJykpXG4gICAgfVxuICAgIGJvZHkuYm9keVVzZWQgPSB0cnVlXG4gIH1cblxuICBmdW5jdGlvbiBmaWxlUmVhZGVyUmVhZHkocmVhZGVyKSB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgcmVhZGVyLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXNvbHZlKHJlYWRlci5yZXN1bHQpXG4gICAgICB9XG4gICAgICByZWFkZXIub25lcnJvciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZWplY3QocmVhZGVyLmVycm9yKVxuICAgICAgfVxuICAgIH0pXG4gIH1cblxuICBmdW5jdGlvbiByZWFkQmxvYkFzQXJyYXlCdWZmZXIoYmxvYikge1xuICAgIHZhciByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpXG4gICAgdmFyIHByb21pc2UgPSBmaWxlUmVhZGVyUmVhZHkocmVhZGVyKVxuICAgIHJlYWRlci5yZWFkQXNBcnJheUJ1ZmZlcihibG9iKVxuICAgIHJldHVybiBwcm9taXNlXG4gIH1cblxuICBmdW5jdGlvbiByZWFkQmxvYkFzVGV4dChibG9iKSB7XG4gICAgdmFyIHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKClcbiAgICB2YXIgcHJvbWlzZSA9IGZpbGVSZWFkZXJSZWFkeShyZWFkZXIpXG4gICAgcmVhZGVyLnJlYWRBc1RleHQoYmxvYilcbiAgICByZXR1cm4gcHJvbWlzZVxuICB9XG5cbiAgZnVuY3Rpb24gcmVhZEFycmF5QnVmZmVyQXNUZXh0KGJ1Zikge1xuICAgIHZhciB2aWV3ID0gbmV3IFVpbnQ4QXJyYXkoYnVmKVxuICAgIHZhciBjaGFycyA9IG5ldyBBcnJheSh2aWV3Lmxlbmd0aClcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdmlldy5sZW5ndGg7IGkrKykge1xuICAgICAgY2hhcnNbaV0gPSBTdHJpbmcuZnJvbUNoYXJDb2RlKHZpZXdbaV0pXG4gICAgfVxuICAgIHJldHVybiBjaGFycy5qb2luKCcnKVxuICB9XG5cbiAgZnVuY3Rpb24gYnVmZmVyQ2xvbmUoYnVmKSB7XG4gICAgaWYgKGJ1Zi5zbGljZSkge1xuICAgICAgcmV0dXJuIGJ1Zi5zbGljZSgwKVxuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdmlldyA9IG5ldyBVaW50OEFycmF5KGJ1Zi5ieXRlTGVuZ3RoKVxuICAgICAgdmlldy5zZXQobmV3IFVpbnQ4QXJyYXkoYnVmKSlcbiAgICAgIHJldHVybiB2aWV3LmJ1ZmZlclxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIEJvZHkoKSB7XG4gICAgdGhpcy5ib2R5VXNlZCA9IGZhbHNlXG5cbiAgICB0aGlzLl9pbml0Qm9keSA9IGZ1bmN0aW9uKGJvZHkpIHtcbiAgICAgIHRoaXMuX2JvZHlJbml0ID0gYm9keVxuICAgICAgaWYgKCFib2R5KSB7XG4gICAgICAgIHRoaXMuX2JvZHlUZXh0ID0gJydcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGJvZHkgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHRoaXMuX2JvZHlUZXh0ID0gYm9keVxuICAgICAgfSBlbHNlIGlmIChzdXBwb3J0LmJsb2IgJiYgQmxvYi5wcm90b3R5cGUuaXNQcm90b3R5cGVPZihib2R5KSkge1xuICAgICAgICB0aGlzLl9ib2R5QmxvYiA9IGJvZHlcbiAgICAgIH0gZWxzZSBpZiAoc3VwcG9ydC5mb3JtRGF0YSAmJiBGb3JtRGF0YS5wcm90b3R5cGUuaXNQcm90b3R5cGVPZihib2R5KSkge1xuICAgICAgICB0aGlzLl9ib2R5Rm9ybURhdGEgPSBib2R5XG4gICAgICB9IGVsc2UgaWYgKHN1cHBvcnQuc2VhcmNoUGFyYW1zICYmIFVSTFNlYXJjaFBhcmFtcy5wcm90b3R5cGUuaXNQcm90b3R5cGVPZihib2R5KSkge1xuICAgICAgICB0aGlzLl9ib2R5VGV4dCA9IGJvZHkudG9TdHJpbmcoKVxuICAgICAgfSBlbHNlIGlmIChzdXBwb3J0LmFycmF5QnVmZmVyICYmIHN1cHBvcnQuYmxvYiAmJiBpc0RhdGFWaWV3KGJvZHkpKSB7XG4gICAgICAgIHRoaXMuX2JvZHlBcnJheUJ1ZmZlciA9IGJ1ZmZlckNsb25lKGJvZHkuYnVmZmVyKVxuICAgICAgICAvLyBJRSAxMC0xMSBjYW4ndCBoYW5kbGUgYSBEYXRhVmlldyBib2R5LlxuICAgICAgICB0aGlzLl9ib2R5SW5pdCA9IG5ldyBCbG9iKFt0aGlzLl9ib2R5QXJyYXlCdWZmZXJdKVxuICAgICAgfSBlbHNlIGlmIChzdXBwb3J0LmFycmF5QnVmZmVyICYmIChBcnJheUJ1ZmZlci5wcm90b3R5cGUuaXNQcm90b3R5cGVPZihib2R5KSB8fCBpc0FycmF5QnVmZmVyVmlldyhib2R5KSkpIHtcbiAgICAgICAgdGhpcy5fYm9keUFycmF5QnVmZmVyID0gYnVmZmVyQ2xvbmUoYm9keSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcigndW5zdXBwb3J0ZWQgQm9keUluaXQgdHlwZScpXG4gICAgICB9XG5cbiAgICAgIGlmICghdGhpcy5oZWFkZXJzLmdldCgnY29udGVudC10eXBlJykpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBib2R5ID09PSAnc3RyaW5nJykge1xuICAgICAgICAgIHRoaXMuaGVhZGVycy5zZXQoJ2NvbnRlbnQtdHlwZScsICd0ZXh0L3BsYWluO2NoYXJzZXQ9VVRGLTgnKVxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX2JvZHlCbG9iICYmIHRoaXMuX2JvZHlCbG9iLnR5cGUpIHtcbiAgICAgICAgICB0aGlzLmhlYWRlcnMuc2V0KCdjb250ZW50LXR5cGUnLCB0aGlzLl9ib2R5QmxvYi50eXBlKVxuICAgICAgICB9IGVsc2UgaWYgKHN1cHBvcnQuc2VhcmNoUGFyYW1zICYmIFVSTFNlYXJjaFBhcmFtcy5wcm90b3R5cGUuaXNQcm90b3R5cGVPZihib2R5KSkge1xuICAgICAgICAgIHRoaXMuaGVhZGVycy5zZXQoJ2NvbnRlbnQtdHlwZScsICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7Y2hhcnNldD1VVEYtOCcpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoc3VwcG9ydC5ibG9iKSB7XG4gICAgICB0aGlzLmJsb2IgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHJlamVjdGVkID0gY29uc3VtZWQodGhpcylcbiAgICAgICAgaWYgKHJlamVjdGVkKSB7XG4gICAgICAgICAgcmV0dXJuIHJlamVjdGVkXG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5fYm9keUJsb2IpIHtcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRoaXMuX2JvZHlCbG9iKVxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX2JvZHlBcnJheUJ1ZmZlcikge1xuICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUobmV3IEJsb2IoW3RoaXMuX2JvZHlBcnJheUJ1ZmZlcl0pKVxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuX2JvZHlGb3JtRGF0YSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignY291bGQgbm90IHJlYWQgRm9ybURhdGEgYm9keSBhcyBibG9iJylcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG5ldyBCbG9iKFt0aGlzLl9ib2R5VGV4dF0pKVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHRoaXMuYXJyYXlCdWZmZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHRoaXMuX2JvZHlBcnJheUJ1ZmZlcikge1xuICAgICAgICAgIHJldHVybiBjb25zdW1lZCh0aGlzKSB8fCBQcm9taXNlLnJlc29sdmUodGhpcy5fYm9keUFycmF5QnVmZmVyKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiB0aGlzLmJsb2IoKS50aGVuKHJlYWRCbG9iQXNBcnJheUJ1ZmZlcilcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMudGV4dCA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHJlamVjdGVkID0gY29uc3VtZWQodGhpcylcbiAgICAgIGlmIChyZWplY3RlZCkge1xuICAgICAgICByZXR1cm4gcmVqZWN0ZWRcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuX2JvZHlCbG9iKSB7XG4gICAgICAgIHJldHVybiByZWFkQmxvYkFzVGV4dCh0aGlzLl9ib2R5QmxvYilcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5fYm9keUFycmF5QnVmZmVyKSB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUocmVhZEFycmF5QnVmZmVyQXNUZXh0KHRoaXMuX2JvZHlBcnJheUJ1ZmZlcikpXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuX2JvZHlGb3JtRGF0YSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2NvdWxkIG5vdCByZWFkIEZvcm1EYXRhIGJvZHkgYXMgdGV4dCcpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHRoaXMuX2JvZHlUZXh0KVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChzdXBwb3J0LmZvcm1EYXRhKSB7XG4gICAgICB0aGlzLmZvcm1EYXRhID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRleHQoKS50aGVuKGRlY29kZSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLmpzb24gPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLnRleHQoKS50aGVuKEpTT04ucGFyc2UpXG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIC8vIEhUVFAgbWV0aG9kcyB3aG9zZSBjYXBpdGFsaXphdGlvbiBzaG91bGQgYmUgbm9ybWFsaXplZFxuICB2YXIgbWV0aG9kcyA9IFsnREVMRVRFJywgJ0dFVCcsICdIRUFEJywgJ09QVElPTlMnLCAnUE9TVCcsICdQVVQnXVxuXG4gIGZ1bmN0aW9uIG5vcm1hbGl6ZU1ldGhvZChtZXRob2QpIHtcbiAgICB2YXIgdXBjYXNlZCA9IG1ldGhvZC50b1VwcGVyQ2FzZSgpXG4gICAgcmV0dXJuIChtZXRob2RzLmluZGV4T2YodXBjYXNlZCkgPiAtMSkgPyB1cGNhc2VkIDogbWV0aG9kXG4gIH1cblxuICBmdW5jdGlvbiBSZXF1ZXN0KGlucHV0LCBvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge31cbiAgICB2YXIgYm9keSA9IG9wdGlvbnMuYm9keVxuXG4gICAgaWYgKHR5cGVvZiBpbnB1dCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHRoaXMudXJsID0gaW5wdXRcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGlucHV0LmJvZHlVc2VkKSB7XG4gICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FscmVhZHkgcmVhZCcpXG4gICAgICB9XG4gICAgICB0aGlzLnVybCA9IGlucHV0LnVybFxuICAgICAgdGhpcy5jcmVkZW50aWFscyA9IGlucHV0LmNyZWRlbnRpYWxzXG4gICAgICBpZiAoIW9wdGlvbnMuaGVhZGVycykge1xuICAgICAgICB0aGlzLmhlYWRlcnMgPSBuZXcgSGVhZGVycyhpbnB1dC5oZWFkZXJzKVxuICAgICAgfVxuICAgICAgdGhpcy5tZXRob2QgPSBpbnB1dC5tZXRob2RcbiAgICAgIHRoaXMubW9kZSA9IGlucHV0Lm1vZGVcbiAgICAgIGlmICghYm9keSAmJiBpbnB1dC5fYm9keUluaXQgIT0gbnVsbCkge1xuICAgICAgICBib2R5ID0gaW5wdXQuX2JvZHlJbml0XG4gICAgICAgIGlucHV0LmJvZHlVc2VkID0gdHJ1ZVxuICAgICAgfVxuICAgIH1cblxuICAgIHRoaXMuY3JlZGVudGlhbHMgPSBvcHRpb25zLmNyZWRlbnRpYWxzIHx8IHRoaXMuY3JlZGVudGlhbHMgfHwgJ29taXQnXG4gICAgaWYgKG9wdGlvbnMuaGVhZGVycyB8fCAhdGhpcy5oZWFkZXJzKSB7XG4gICAgICB0aGlzLmhlYWRlcnMgPSBuZXcgSGVhZGVycyhvcHRpb25zLmhlYWRlcnMpXG4gICAgfVxuICAgIHRoaXMubWV0aG9kID0gbm9ybWFsaXplTWV0aG9kKG9wdGlvbnMubWV0aG9kIHx8IHRoaXMubWV0aG9kIHx8ICdHRVQnKVxuICAgIHRoaXMubW9kZSA9IG9wdGlvbnMubW9kZSB8fCB0aGlzLm1vZGUgfHwgbnVsbFxuICAgIHRoaXMucmVmZXJyZXIgPSBudWxsXG5cbiAgICBpZiAoKHRoaXMubWV0aG9kID09PSAnR0VUJyB8fCB0aGlzLm1ldGhvZCA9PT0gJ0hFQUQnKSAmJiBib2R5KSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdCb2R5IG5vdCBhbGxvd2VkIGZvciBHRVQgb3IgSEVBRCByZXF1ZXN0cycpXG4gICAgfVxuICAgIHRoaXMuX2luaXRCb2R5KGJvZHkpXG4gIH1cblxuICBSZXF1ZXN0LnByb3RvdHlwZS5jbG9uZSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBuZXcgUmVxdWVzdCh0aGlzLCB7IGJvZHk6IHRoaXMuX2JvZHlJbml0IH0pXG4gIH1cblxuICBmdW5jdGlvbiBkZWNvZGUoYm9keSkge1xuICAgIHZhciBmb3JtID0gbmV3IEZvcm1EYXRhKClcbiAgICBib2R5LnRyaW0oKS5zcGxpdCgnJicpLmZvckVhY2goZnVuY3Rpb24oYnl0ZXMpIHtcbiAgICAgIGlmIChieXRlcykge1xuICAgICAgICB2YXIgc3BsaXQgPSBieXRlcy5zcGxpdCgnPScpXG4gICAgICAgIHZhciBuYW1lID0gc3BsaXQuc2hpZnQoKS5yZXBsYWNlKC9cXCsvZywgJyAnKVxuICAgICAgICB2YXIgdmFsdWUgPSBzcGxpdC5qb2luKCc9JykucmVwbGFjZSgvXFwrL2csICcgJylcbiAgICAgICAgZm9ybS5hcHBlbmQoZGVjb2RlVVJJQ29tcG9uZW50KG5hbWUpLCBkZWNvZGVVUklDb21wb25lbnQodmFsdWUpKVxuICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuIGZvcm1cbiAgfVxuXG4gIGZ1bmN0aW9uIHBhcnNlSGVhZGVycyhyYXdIZWFkZXJzKSB7XG4gICAgdmFyIGhlYWRlcnMgPSBuZXcgSGVhZGVycygpXG4gICAgcmF3SGVhZGVycy5zcGxpdCgnXFxyXFxuJykuZm9yRWFjaChmdW5jdGlvbihsaW5lKSB7XG4gICAgICB2YXIgcGFydHMgPSBsaW5lLnNwbGl0KCc6JylcbiAgICAgIHZhciBrZXkgPSBwYXJ0cy5zaGlmdCgpLnRyaW0oKVxuICAgICAgaWYgKGtleSkge1xuICAgICAgICB2YXIgdmFsdWUgPSBwYXJ0cy5qb2luKCc6JykudHJpbSgpXG4gICAgICAgIGhlYWRlcnMuYXBwZW5kKGtleSwgdmFsdWUpXG4gICAgICB9XG4gICAgfSlcbiAgICByZXR1cm4gaGVhZGVyc1xuICB9XG5cbiAgQm9keS5jYWxsKFJlcXVlc3QucHJvdG90eXBlKVxuXG4gIGZ1bmN0aW9uIFJlc3BvbnNlKGJvZHlJbml0LCBvcHRpb25zKSB7XG4gICAgaWYgKCFvcHRpb25zKSB7XG4gICAgICBvcHRpb25zID0ge31cbiAgICB9XG5cbiAgICB0aGlzLnR5cGUgPSAnZGVmYXVsdCdcbiAgICB0aGlzLnN0YXR1cyA9ICdzdGF0dXMnIGluIG9wdGlvbnMgPyBvcHRpb25zLnN0YXR1cyA6IDIwMFxuICAgIHRoaXMub2sgPSB0aGlzLnN0YXR1cyA+PSAyMDAgJiYgdGhpcy5zdGF0dXMgPCAzMDBcbiAgICB0aGlzLnN0YXR1c1RleHQgPSAnc3RhdHVzVGV4dCcgaW4gb3B0aW9ucyA/IG9wdGlvbnMuc3RhdHVzVGV4dCA6ICdPSydcbiAgICB0aGlzLmhlYWRlcnMgPSBuZXcgSGVhZGVycyhvcHRpb25zLmhlYWRlcnMpXG4gICAgdGhpcy51cmwgPSBvcHRpb25zLnVybCB8fCAnJ1xuICAgIHRoaXMuX2luaXRCb2R5KGJvZHlJbml0KVxuICB9XG5cbiAgQm9keS5jYWxsKFJlc3BvbnNlLnByb3RvdHlwZSlcblxuICBSZXNwb25zZS5wcm90b3R5cGUuY2xvbmUgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gbmV3IFJlc3BvbnNlKHRoaXMuX2JvZHlJbml0LCB7XG4gICAgICBzdGF0dXM6IHRoaXMuc3RhdHVzLFxuICAgICAgc3RhdHVzVGV4dDogdGhpcy5zdGF0dXNUZXh0LFxuICAgICAgaGVhZGVyczogbmV3IEhlYWRlcnModGhpcy5oZWFkZXJzKSxcbiAgICAgIHVybDogdGhpcy51cmxcbiAgICB9KVxuICB9XG5cbiAgUmVzcG9uc2UuZXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgcmVzcG9uc2UgPSBuZXcgUmVzcG9uc2UobnVsbCwge3N0YXR1czogMCwgc3RhdHVzVGV4dDogJyd9KVxuICAgIHJlc3BvbnNlLnR5cGUgPSAnZXJyb3InXG4gICAgcmV0dXJuIHJlc3BvbnNlXG4gIH1cblxuICB2YXIgcmVkaXJlY3RTdGF0dXNlcyA9IFszMDEsIDMwMiwgMzAzLCAzMDcsIDMwOF1cblxuICBSZXNwb25zZS5yZWRpcmVjdCA9IGZ1bmN0aW9uKHVybCwgc3RhdHVzKSB7XG4gICAgaWYgKHJlZGlyZWN0U3RhdHVzZXMuaW5kZXhPZihzdGF0dXMpID09PSAtMSkge1xuICAgICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0ludmFsaWQgc3RhdHVzIGNvZGUnKVxuICAgIH1cblxuICAgIHJldHVybiBuZXcgUmVzcG9uc2UobnVsbCwge3N0YXR1czogc3RhdHVzLCBoZWFkZXJzOiB7bG9jYXRpb246IHVybH19KVxuICB9XG5cbiAgc2VsZi5IZWFkZXJzID0gSGVhZGVyc1xuICBzZWxmLlJlcXVlc3QgPSBSZXF1ZXN0XG4gIHNlbGYuUmVzcG9uc2UgPSBSZXNwb25zZVxuXG4gIHNlbGYuZmV0Y2ggPSBmdW5jdGlvbihpbnB1dCwgaW5pdCkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIHZhciByZXF1ZXN0ID0gbmV3IFJlcXVlc3QoaW5wdXQsIGluaXQpXG4gICAgICB2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KClcblxuICAgICAgeGhyLm9ubG9hZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgb3B0aW9ucyA9IHtcbiAgICAgICAgICBzdGF0dXM6IHhoci5zdGF0dXMsXG4gICAgICAgICAgc3RhdHVzVGV4dDogeGhyLnN0YXR1c1RleHQsXG4gICAgICAgICAgaGVhZGVyczogcGFyc2VIZWFkZXJzKHhoci5nZXRBbGxSZXNwb25zZUhlYWRlcnMoKSB8fCAnJylcbiAgICAgICAgfVxuICAgICAgICBvcHRpb25zLnVybCA9ICdyZXNwb25zZVVSTCcgaW4geGhyID8geGhyLnJlc3BvbnNlVVJMIDogb3B0aW9ucy5oZWFkZXJzLmdldCgnWC1SZXF1ZXN0LVVSTCcpXG4gICAgICAgIHZhciBib2R5ID0gJ3Jlc3BvbnNlJyBpbiB4aHIgPyB4aHIucmVzcG9uc2UgOiB4aHIucmVzcG9uc2VUZXh0XG4gICAgICAgIHJlc29sdmUobmV3IFJlc3BvbnNlKGJvZHksIG9wdGlvbnMpKVxuICAgICAgfVxuXG4gICAgICB4aHIub25lcnJvciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZWplY3QobmV3IFR5cGVFcnJvcignTmV0d29yayByZXF1ZXN0IGZhaWxlZCcpKVxuICAgICAgfVxuXG4gICAgICB4aHIub250aW1lb3V0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJlamVjdChuZXcgVHlwZUVycm9yKCdOZXR3b3JrIHJlcXVlc3QgZmFpbGVkJykpXG4gICAgICB9XG5cbiAgICAgIHhoci5vcGVuKHJlcXVlc3QubWV0aG9kLCByZXF1ZXN0LnVybCwgdHJ1ZSlcblxuICAgICAgaWYgKHJlcXVlc3QuY3JlZGVudGlhbHMgPT09ICdpbmNsdWRlJykge1xuICAgICAgICB4aHIud2l0aENyZWRlbnRpYWxzID0gdHJ1ZVxuICAgICAgfVxuXG4gICAgICBpZiAoJ3Jlc3BvbnNlVHlwZScgaW4geGhyICYmIHN1cHBvcnQuYmxvYikge1xuICAgICAgICB4aHIucmVzcG9uc2VUeXBlID0gJ2Jsb2InXG4gICAgICB9XG5cbiAgICAgIHJlcXVlc3QuaGVhZGVycy5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlLCBuYW1lKSB7XG4gICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKG5hbWUsIHZhbHVlKVxuICAgICAgfSlcblxuICAgICAgeGhyLnNlbmQodHlwZW9mIHJlcXVlc3QuX2JvZHlJbml0ID09PSAndW5kZWZpbmVkJyA/IG51bGwgOiByZXF1ZXN0Ll9ib2R5SW5pdClcbiAgICB9KVxuICB9XG4gIHNlbGYuZmV0Y2gucG9seWZpbGwgPSB0cnVlXG59KSh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcgPyBzZWxmIDogdGhpcyk7XG4iLCIndXNlIHN0cmljdCc7T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsJ19fZXNNb2R1bGUnLHt2YWx1ZTp0cnVlfSk7dmFyIF9leHRlbmRzPU9iamVjdC5hc3NpZ258fGZ1bmN0aW9uKHRhcmdldCl7Zm9yKHZhciBpPTE7aTxhcmd1bWVudHMubGVuZ3RoO2krKyl7dmFyIHNvdXJjZT1hcmd1bWVudHNbaV07Zm9yKHZhciBrZXkgaW4gc291cmNlKXtpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLGtleSkpe3RhcmdldFtrZXldPXNvdXJjZVtrZXldfX19cmV0dXJuIHRhcmdldH07ZXhwb3J0cy5nZXREYXRhPWdldERhdGE7cmVxdWlyZSgnd2hhdHdnLWZldGNoJyk7ZnVuY3Rpb24gX2RlZmluZVByb3BlcnR5KG9iaixrZXksdmFsdWUpe2lmKGtleSBpbiBvYmope09iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosa2V5LHt2YWx1ZTp2YWx1ZSxlbnVtZXJhYmxlOnRydWUsY29uZmlndXJhYmxlOnRydWUsd3JpdGFibGU6dHJ1ZX0pfWVsc2V7b2JqW2tleV09dmFsdWV9cmV0dXJuIG9ian12YXIgcm9vdFVybD0nL2FwaS8nO2Z1bmN0aW9uIGdldERhdGEoc291cmNlcyxjb21wb25lbnQsbm90aWZpY2F0aW9uKXt2YXIgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbj10cnVlO3ZhciBfZGlkSXRlcmF0b3JFcnJvcj1mYWxzZTt2YXIgX2l0ZXJhdG9yRXJyb3I9dW5kZWZpbmVkO3RyeXt2YXIgX2xvb3A9ZnVuY3Rpb24gX2xvb3AoKXt2YXIgX3JlZj1fc3RlcC52YWx1ZTt2YXIgdHlwZT1fcmVmLnR5cGUscGF0aD1fcmVmLnBhdGgsYnJhbmNoPV9yZWYuYnJhbmNoLGRhdGE9X3JlZi5kYXRhLGNhbGxiYWNrPV9yZWYuY2FsbGJhY2s7bm90aWZpY2F0aW9uLm5vdGlmeSh7a2luZDonc3BlY2lhbCcsdGV4dDpicmFuY2grJyB0cmFuc2ZlcnJpbmcgZGF0YSAuLi4nLGJ1c3k6MX0pO3ZhciBzZXR0aW5ncz17Y3JlZGVudGlhbHM6J3NhbWUtb3JpZ2luJ307aWYoZGF0YSE9bnVsbCl7c2V0dGluZ3M9X2V4dGVuZHMoe30sc2V0dGluZ3Mse21ldGhvZDonUE9TVCcsYm9keTpKU09OLnN0cmluZ2lmeShkYXRhKSxoZWFkZXJzOnsnQ29udGVudC1UeXBlJzonYXBwbGljYXRpb24vanNvbid9fSl9ZmV0Y2goJycrcm9vdFVybCt0eXBlK3BhdGgsc2V0dGluZ3MpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2Upe3JldHVybiByZXNwb25zZS5qc29uKCl9KS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlRGF0YSl7dmFyIF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24yPXRydWU7dmFyIF9kaWRJdGVyYXRvckVycm9yMj1mYWxzZTt2YXIgX2l0ZXJhdG9yRXJyb3IyPXVuZGVmaW5lZDt0cnl7Zm9yKHZhciBfaXRlcmF0b3IyPShyZXNwb25zZURhdGEubXNnc3x8W10pW1N5bWJvbC5pdGVyYXRvcl0oKSxfc3RlcDI7IShfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMj0oX3N0ZXAyPV9pdGVyYXRvcjIubmV4dCgpKS5kb25lKTtfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMj10cnVlKXt2YXIgbXNnPV9zdGVwMi52YWx1ZTtub3RpZmljYXRpb24ubm90aWZ5KG1zZyl9fWNhdGNoKGVycil7X2RpZEl0ZXJhdG9yRXJyb3IyPXRydWU7X2l0ZXJhdG9yRXJyb3IyPWVycn1maW5hbGx5e3RyeXtpZighX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjImJl9pdGVyYXRvcjIucmV0dXJuKXtfaXRlcmF0b3IyLnJldHVybigpfX1maW5hbGx5e2lmKF9kaWRJdGVyYXRvckVycm9yMil7dGhyb3cgX2l0ZXJhdG9yRXJyb3IyfX19dmFyIGtpbmQ9cmVzcG9uc2VEYXRhLmdvb2Q/J2luZm8nOidlcnJvcic7dmFyIHN0YXRtPXJlc3BvbnNlRGF0YS5nb29kPydkYXRhIGZldGNoZWQnOidzZXJ2ZXIgZXJyb3InO25vdGlmaWNhdGlvbi5ub3RpZnkoe2tpbmQ6a2luZCx0ZXh0OmJyYW5jaCsnICcrc3RhdG0rJy4nLGJ1c3k6LTF9KTt0cnl7aWYoY2FsbGJhY2s9PW51bGwpe2NvbXBvbmVudC5zZXRTdGF0ZShfZXh0ZW5kcyh7fSxjb21wb25lbnQuc3RhdGV8fHt9LF9kZWZpbmVQcm9wZXJ0eSh7fSxicmFuY2gscmVzcG9uc2VEYXRhLmRhdGEpKSl9ZWxzZXtjYWxsYmFjayhyZXNwb25zZURhdGEuZGF0YSl9bm90aWZpY2F0aW9uLm5vdGlmeSh7a2luZDonaW5mbycsdGV4dDpicmFuY2grJyBwcm9jZXNzZWQuJyxidXN5OjB9KX1jYXRjaChlcnJvcil7Y29uc29sZS5lcnJvcihlcnJvcik7bm90aWZpY2F0aW9uLm5vdGlmeSh7a2luZDonZXJyb3InLHRleHQ6YnJhbmNoKycgcHJvY2Vzc2luZyBlcnJvci4nLGJ1c3k6MH0pfX0pLmNhdGNoKGZ1bmN0aW9uKGVycm9yKXtjb25zb2xlLmVycm9yKGVycm9yKTtub3RpZmljYXRpb24ubm90aWZ5KHtraW5kOidlcnJvcicsdGV4dDpicmFuY2grJyB0cmFuc21pc3Npb24gZXJyb3IuJyxidXN5Oi0xfSl9KX07Zm9yKHZhciBfaXRlcmF0b3I9c291cmNlc1tTeW1ib2wuaXRlcmF0b3JdKCksX3N0ZXA7IShfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uPShfc3RlcD1faXRlcmF0b3IubmV4dCgpKS5kb25lKTtfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uPXRydWUpe19sb29wKCl9fWNhdGNoKGVycil7X2RpZEl0ZXJhdG9yRXJyb3I9dHJ1ZTtfaXRlcmF0b3JFcnJvcj1lcnJ9ZmluYWxseXt0cnl7aWYoIV9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24mJl9pdGVyYXRvci5yZXR1cm4pe19pdGVyYXRvci5yZXR1cm4oKX19ZmluYWxseXtpZihfZGlkSXRlcmF0b3JFcnJvcil7dGhyb3cgX2l0ZXJhdG9yRXJyb3J9fX19IiwiXCJ1c2Ugc3RyaWN0XCI7T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOnRydWV9KTt2YXIgY291bnRyeUJvcmRlcnM9ZXhwb3J0cy5jb3VudHJ5Qm9yZGVycz17XCJmZWF0dXJlc1wiOlt7XCJnZW9tZXRyeVwiOntcImNvb3JkaW5hdGVzXCI6W10sXCJ0eXBlXCI6XCJQb2x5Z29uXCJ9LFwidHlwZVwiOlwiRmVhdHVyZVwiLFwicHJvcGVydGllc1wiOntcImlzbzJcIjpcIkFEXCIsXCJsbmdcIjoxLjUsXCJsYXRcIjo0Mi41fX0se1wiZ2VvbWV0cnlcIjp7XCJjb29yZGluYXRlc1wiOltbWzE5LjQsNDFdLFsxOS41LDQxLjNdLFsxOS41LDQxLjZdLFsxOS42LDQxLjddLFsxOS41LDQxLjhdLFsxOS40LDQxLjldLFsxOS4zLDQxLjldLFsxOS40LDQyLjFdLFsxOS41LDQyLjRdLFsxOS42LDQyLjZdLFsxOS43LDQyLjddLFsxOS43LDQyLjVdLFsxOS45LDQyLjVdLFsyMC4xLDQyLjZdLFsyMC4yLDQyLjVdLFsyMC4yLDQyLjNdLFsyMC40LDQyLjNdLFsyMC41LDQyLjJdLFsyMC42LDQxLjldLFsyMC41LDQxLjddLFsyMC41LDQxLjVdLFsyMC41LDQxLjRdLFsyMC41LDQxLjJdLFsyMC42LDQxLjFdLFsyMC43LDQwLjldLFsyMC45LDQwLjldLFsyMSw0MC44XSxbMjEuMSw0MC43XSxbMjEsNDAuNl0sWzIwLjksNDAuNV0sWzIwLjgsNDAuNF0sWzIwLjcsNDAuM10sWzIwLjcsNDAuMV0sWzIwLjUsNDAuMV0sWzIwLjMsNDBdLFsyMC40LDM5LjldLFsyMC4zLDM5LjhdLFsyMC4yLDM5LjZdLFsyMC4xLDM5LjddLFsyMCwzOS44XSxbMTkuOSwzOS45XSxbMTkuOCw0MC4xXSxbMTkuNiw0MC4xXSxbMTkuNCw0MC4yXSxbMTkuMyw0MC40XSxbMTkuNSw0MC4zXSxbMTkuNSw0MC42XSxbMTkuMyw0MC42XSxbMTkuNCw0MC43XSxbMTkuNCw0MC45XSxbMTkuNSw0MV0sWzE5LjQsNDFdXV0sXCJ0eXBlXCI6XCJQb2x5Z29uXCJ9LFwidHlwZVwiOlwiRmVhdHVyZVwiLFwicHJvcGVydGllc1wiOntcImlzbzJcIjpcIkFMXCIsXCJsbmdcIjoyMCxcImxhdFwiOjQxfX0se1wiZ2VvbWV0cnlcIjp7XCJjb29yZGluYXRlc1wiOltbW1s0NS4yLDQxLjJdLFs0NS4xLDQxLjFdLFs0NS40LDQxXSxbNDUuNiw0MC44XSxbNDUuNSw0MC43XSxbNDUuNCw0MC42XSxbNDUuNiw0MC40XSxbNDUuOSw0MC4zXSxbNDYsNDAuMl0sWzQ1LjksNDBdLFs0NS43LDQwXSxbNDUuOCwzOS45XSxbNDUuOSwzOS44XSxbNDYsMzkuN10sWzQ2LjIsMzkuNl0sWzQ2LjQsMzkuNl0sWzQ2LjUsMzkuNV0sWzQ2LjQsMzkuNF0sWzQ2LjYsMzkuMl0sWzQ2LjQsMzkuMl0sWzQ2LjUsMzldLFs0Ni40LDM4LjldLFs0Ni4yLDM4LjldLFs0Ni4xLDM4LjldLFs0NiwzOS4zXSxbNDUuOCwzOS40XSxbNDUuOCwzOS42XSxbNDUuNiwzOS42XSxbNDUuNSwzOS41XSxbNDUuMywzOS42XSxbNDUsMzkuOF0sWzQ0LjksMzkuN10sWzQ0LjcsMzkuN10sWzQ0LjYsMzkuOV0sWzQ0LjUsNDBdLFs0NC4zLDQwXSxbNDQsNDBdLFs0My43LDQwLjFdLFs0My43LDQwLjJdLFs0My42LDQwLjRdLFs0My43LDQwLjVdLFs0My43LDQwLjddLFs0My43LDQwLjhdLFs0My42LDQxXSxbNDMuNSw0MS4xXSxbNDMuNyw0MS4xXSxbNDMuOCw0MS4yXSxbNDQsNDEuMl0sWzQ0LjIsNDEuMl0sWzQ0LjQsNDEuMl0sWzQ0LjYsNDEuMl0sWzQ0LjgsNDEuMl0sWzQ1LDQxLjNdLFs0NS4xLDQxLjJdLFs0NS4yLDQxLjJdXV0sW11dLFwidHlwZVwiOlwiTXVsdGlQb2x5Z29uXCJ9LFwidHlwZVwiOlwiRmVhdHVyZVwiLFwicHJvcGVydGllc1wiOntcImlzbzJcIjpcIkFNXCIsXCJsbmdcIjo0NSxcImxhdFwiOjQwfX0se1wiZ2VvbWV0cnlcIjp7XCJjb29yZGluYXRlc1wiOltbWzEzLjgsNDguOF0sWzE0LjIsNDguNl0sWzE0LjYsNDguNl0sWzE0LjksNDguOF0sWzE1LjEsNDldLFsxNS41LDQ5XSxbMTUuOCw0OC45XSxbMTYuNCw0OC43XSxbMTYuNyw0OC44XSxbMTYuOSw0OC42XSxbMTYuOSw0OC4zXSxbMTcuMSw0OC4xXSxbMTcuMSw0Ny44XSxbMTYuOCw0Ny43XSxbMTYuNCw0Ny43XSxbMTYuNyw0Ny41XSxbMTYuNCw0Ny4yXSxbMTYuMyw0N10sWzE1LjgsNDYuN10sWzE1LjEsNDYuNl0sWzE0LjgsNDYuNV0sWzEzLjksNDYuNV0sWzEzLjYsNDYuNl0sWzEyLjgsNDYuN10sWzEyLjUsNDYuN10sWzEyLjEsNDddLFsxMS44LDQ3XSxbMTEuMiw0N10sWzEwLjksNDYuOF0sWzEwLjYsNDYuOF0sWzEwLjMsNDYuOV0sWzkuOSw0Ni45XSxbOS42LDQ3LjJdLFs5LjcsNDcuNV0sWzEwLDQ3LjVdLFsxMC40LDQ3LjRdLFsxMC40LDQ3LjZdLFsxMC45LDQ3LjVdLFsxMS41LDQ3LjVdLFsxMiw0Ny42XSxbMTIuNSw0Ny43XSxbMTIuNyw0Ny43XSxbMTMuMSw0Ny42XSxbMTIuOSw0Ny44XSxbMTIuOCw0OF0sWzEzLjIsNDguM10sWzEzLjQsNDguNV0sWzEzLjcsNDguNl0sWzEzLjgsNDguOF1dXSxcInR5cGVcIjpcIlBvbHlnb25cIn0sXCJ0eXBlXCI6XCJGZWF0dXJlXCIsXCJwcm9wZXJ0aWVzXCI6e1wiaXNvMlwiOlwiQVRcIixcImxuZ1wiOjEzLjMsXCJsYXRcIjo0Ny4zfX0se1wiZ2VvbWV0cnlcIjp7XCJjb29yZGluYXRlc1wiOltbW1s0Ni42LDQxLjldLFs0Ni45LDQxLjddLFs0Ny4zLDQxLjRdLFs0Ny43LDQxLjJdLFs0OCw0MS40XSxbNDguNSw0MS44XSxbNDguOCw0MS43XSxbNDkuMSw0MS4zXSxbNDkuMiw0MV0sWzQ5LjUsNDAuN10sWzQ5LjksNDAuNl0sWzUwLjQsNDAuNF0sWzUwLjEsNDAuNF0sWzQ5LjUsNDAuMl0sWzQ5LjQsMzkuOV0sWzQ5LjMsMzkuNF0sWzQ5LjIsMzkuM10sWzQ5LjEsMzkuMV0sWzQ5LDM5XSxbNDguOSwzOC41XSxbNDguNywzOC40XSxbNDguMywzOC42XSxbNDguMSwzOC44XSxbNDguMiwzOV0sWzQ4LjEsMzkuMl0sWzQ4LjMsMzkuNF0sWzQ4LjIsMzkuNl0sWzQ3LjgsMzkuN10sWzQ3LjMsMzkuNF0sWzQ2LjksMzkuMl0sWzQ2LjcsMzldLFs0Ni41LDM5LjFdLFs0Ni42LDM5LjNdLFs0Ni41LDM5LjZdLFs0Ni4xLDM5LjddLFs0NS44LDM5LjhdLFs0NS42LDQwXSxbNDYsNDAuM10sWzQ1LjUsNDAuNV0sWzQ1LjUsNDAuOF0sWzQ1LjMsNDFdLFs0NS4xLDQxLjJdLFs0NS4xLDQxLjRdLFs0NS40LDQxLjVdLFs0NS45LDQxLjJdLFs0Ni4zLDQxLjJdLFs0Ni41LDQxXSxbNDYuNyw0MS4zXSxbNDYuMiw0MS42XSxbNDYuNCw0MS44XSxbNDYuNiw0MS45XV1dLFtbWzQ1LjEsMzkuOF0sWzQ1LjMsMzkuNl0sWzQ1LjMsMzkuNV0sWzQ1LjUsMzkuNV0sWzQ1LjYsMzkuNV0sWzQ1LjYsMzkuNl0sWzQ1LjcsMzkuNl0sWzQ1LjgsMzkuNl0sWzQ1LjgsMzkuNV0sWzQ1LjgsMzkuNF0sWzQ1LjksMzkuM10sWzQ2LDM5LjNdLFs0NiwzOS4yXSxbNDYuMSwzOC45XSxbNDYuMiwzOC44XSxbNDYsMzguOV0sWzQ1LjgsMzguOV0sWzQ1LjYsMzldLFs0NS41LDM5XSxbNDUuNCwzOV0sWzQ1LjQsMzkuMV0sWzQ1LjMsMzkuMl0sWzQ1LjIsMzkuMl0sWzQ1LjEsMzkuMl0sWzQ1LjEsMzkuM10sWzQ1LjEsMzkuNF0sWzQ1LDM5LjRdLFs0NC45LDM5LjVdLFs0NC45LDM5LjZdLFs0NC44LDM5LjZdLFs0NC44LDM5LjddLFs0NC45LDM5LjddLFs0NSwzOS43XSxbNDUsMzkuOF0sWzQ1LjEsMzkuOF1dXSxbXSxbXV0sXCJ0eXBlXCI6XCJNdWx0aVBvbHlnb25cIn0sXCJ0eXBlXCI6XCJGZWF0dXJlXCIsXCJwcm9wZXJ0aWVzXCI6e1wiaXNvMlwiOlwiQVpcIixcImxuZ1wiOjQ3LjUsXCJsYXRcIjo0MC41fX0se1wiZ2VvbWV0cnlcIjp7XCJjb29yZGluYXRlc1wiOltbWzE3LjYsNDIuOV0sWzE3LjQsNDMuMl0sWzE3LjMsNDMuNV0sWzE3LDQzLjVdLFsxNi44LDQzLjddLFsxNi42LDQzLjldLFsxNi40LDQ0LjFdLFsxNi4yLDQ0LjJdLFsxNi4yLDQ0LjRdLFsxNiw0NC43XSxbMTUuNyw0NC44XSxbMTUuOCw0NS4yXSxbMTYuMSw0NS4xXSxbMTYuNCw0NV0sWzE2LjYsNDUuMl0sWzE2LjksNDUuM10sWzE3LjIsNDUuMV0sWzE3LjUsNDUuMV0sWzE3LjgsNDUuMV0sWzE4LjEsNDUuMV0sWzE4LjQsNDUuMV0sWzE4LjgsNDQuOV0sWzE5LjEsNDQuOV0sWzE5LjQsNDQuOV0sWzE5LjIsNDQuNl0sWzE5LjEsNDQuM10sWzE5LjUsNDQuMV0sWzE5LjUsNDRdLFsxOS4yLDQ0XSxbMTkuNSw0My44XSxbMTkuNCw0My42XSxbMTksNDMuNl0sWzE5LDQzLjRdLFsxOSw0My4yXSxbMTguOCw0My4zXSxbMTguNyw0My4xXSxbMTguNSw0M10sWzE4LjYsNDIuN10sWzE4LjQsNDIuNl0sWzE4LjIsNDIuN10sWzE3LjgsNDIuOV0sWzE3LjYsNDIuOV1dXSxcInR5cGVcIjpcIlBvbHlnb25cIn0sXCJ0eXBlXCI6XCJGZWF0dXJlXCIsXCJwcm9wZXJ0aWVzXCI6e1wiaXNvMlwiOlwiQkFcIixcImxuZ1wiOjE4LFwibGF0XCI6NDR9fSx7XCJnZW9tZXRyeVwiOntcImNvb3JkaW5hdGVzXCI6W1tbNC4zLDUxLjNdLFs0LjQsNTEuNF0sWzQuNSw1MS41XSxbNC41LDUxLjRdLFs0LjcsNTEuNF0sWzQuOCw1MS41XSxbNC45LDUxLjRdLFs1LDUxLjVdLFs1LjEsNTEuNF0sWzUuMiw1MS4zXSxbNS40LDUxLjNdLFs1LjYsNTEuM10sWzUuOCw1MS4yXSxbNS45LDUxLjFdLFs1LjgsNTFdLFs1LjYsNTAuOV0sWzUuNyw1MC44XSxbNS45LDUwLjhdLFs2LjEsNTAuN10sWzYuMyw1MC42XSxbNi4zLDUwLjVdLFs2LjQsNTAuM10sWzYuMiw1MC4yXSxbNi4xLDUwLjFdLFs1LjksNTAuMV0sWzUuNyw0OS45XSxbNS44LDQ5LjhdLFs1LjksNDkuNl0sWzUuOCw0OS41XSxbNS42LDQ5LjVdLFs1LjQsNDkuNl0sWzUsNDkuOF0sWzQuOCw1MF0sWzQuOSw1MC4xXSxbNC44LDUwLjJdLFs0LjcsNTBdLFs0LjQsNDkuOV0sWzQuMiw1MF0sWzQuMiw1MC4xXSxbNC4yLDUwLjNdLFs0LDUwLjNdLFszLjgsNTAuNF0sWzMuNyw1MC41XSxbMy41LDUwLjVdLFszLjMsNTAuNV0sWzMuMiw1MC44XSxbMyw1MC44XSxbMi44LDUwLjhdLFsyLjYsNTAuOV0sWzIuNSw1MS4xXSxbMi45LDUxLjJdLFszLDUxLjNdLFszLjIsNTEuM10sWzMuNCw1MS4zXSxbMy41LDUxLjJdLFszLjYsNTEuM10sWzMuOCw1MS4zXSxbMy45LDUxLjJdLFs0LjEsNTEuM10sWzQuMiw1MS40XSxbNC4zLDUxLjNdXV0sXCJ0eXBlXCI6XCJQb2x5Z29uXCJ9LFwidHlwZVwiOlwiRmVhdHVyZVwiLFwicHJvcGVydGllc1wiOntcImlzbzJcIjpcIkJFXCIsXCJsbmdcIjo0LFwibGF0XCI6NTAuOH19LHtcImdlb21ldHJ5XCI6e1wiY29vcmRpbmF0ZXNcIjpbW1syNy45LDQyLjhdLFsyNy42LDQyLjZdLFsyNy41LDQyLjRdLFsyNy44LDQyLjJdLFsyOCw0Ml0sWzI3LjYsNDJdLFsyNy4zLDQyLjFdLFsyNyw0Ml0sWzI2LjUsNDEuOF0sWzI2LjQsNDEuN10sWzI2LjIsNDEuNV0sWzI1LjksNDEuM10sWzI1LjUsNDEuM10sWzI1LjEsNDEuNF0sWzI0LjYsNDEuNF0sWzI0LjMsNDEuNl0sWzI0LjEsNDEuNV0sWzIzLjcsNDEuNF0sWzIzLjMsNDEuNF0sWzIzLDQxLjNdLFsyMyw0MS42XSxbMjIuOSw0MS45XSxbMjIuNSw0Mi4xXSxbMjIuNiw0Mi41XSxbMjIuNCw0Mi44XSxbMjMsNDMuMV0sWzIyLjgsNDMuNF0sWzIyLjUsNDMuNV0sWzIyLjUsNDQuMV0sWzIyLjksNDQuMV0sWzIyLjgsNDMuOV0sWzIzLjEsNDMuOF0sWzIzLjQsNDMuOV0sWzI0LDQzLjddLFsyNC40LDQzLjddLFsyNC42LDQzLjddLFsyNSw0My43XSxbMjUuNCw0My42XSxbMjUuOCw0My43XSxbMjYuMSw0NF0sWzI2LjcsNDQuMV0sWzI3LjEsNDQuMV0sWzI3LjUsNDRdLFsyNy45LDQ0XSxbMjguMSw0My44XSxbMjguNSw0My43XSxbMjguNiw0My40XSxbMjguMiw0My40XSxbMjcuOSw0My4yXSxbMjcuOSw0Mi44XV1dLFwidHlwZVwiOlwiUG9seWdvblwifSxcInR5cGVcIjpcIkZlYXR1cmVcIixcInByb3BlcnRpZXNcIjp7XCJpc28yXCI6XCJCR1wiLFwibG5nXCI6MjUsXCJsYXRcIjo0M319LHtcImdlb21ldHJ5XCI6e1wiY29vcmRpbmF0ZXNcIjpbW1syNi42LDU1LjddLFsyNyw1NS44XSxbMjcuNiw1NS44XSxbMjcuOSw1Ni4xXSxbMjguMyw1Nl0sWzI4LjcsNTZdLFsyOS4xLDU2XSxbMjkuNCw1NS44XSxbMzAsNTUuOV0sWzMwLjgsNTUuNl0sWzMwLjksNTUuMl0sWzMwLjksNTQuOV0sWzMxLjEsNTQuNl0sWzMxLjMsNTQuMl0sWzMxLjksNTRdLFszMi4xLDUzLjhdLFszMi41LDUzLjZdLFszMi41LDUzLjJdLFszMiw1My4xXSxbMzEuNCw1My4yXSxbMzEuNSw1Mi45XSxbMzEuNiw1Mi41XSxbMzEuOCw1Mi4xXSxbMzEuMyw1Mi4xXSxbMzEsNTJdLFszMC42LDUxLjZdLFszMC40LDUxLjRdLFsyOS45LDUxLjVdLFsyOS40LDUxLjRdLFsyOS4xLDUxLjZdLFsyOC43LDUxLjVdLFsyOC4zLDUxLjZdLFsyOCw1MS42XSxbMjcuNyw1MS42XSxbMjcuMiw1MS43XSxbMjYuOSw1MS44XSxbMjYuNCw1MS44XSxbMjYsNTEuOV0sWzI1LjQsNTEuOV0sWzI1LDUxLjldLFsyNC4zLDUxLjddLFsyMy43LDUxLjddLFsyMy41LDUxLjddLFsyMy43LDUyXSxbMjMuMiw1Mi4zXSxbMjMuNyw1Mi42XSxbMjMuOSw1M10sWzIzLjYsNTMuN10sWzIzLjgsNTMuOV0sWzI0LjIsNTRdLFsyNC41LDU0XSxbMjQuOSw1NC4xXSxbMjUuMyw1NC4zXSxbMjUuNSw1NC4yXSxbMjUuOCw1NC4zXSxbMjUuNyw1NC42XSxbMjUuOSw1NC45XSxbMjYuMyw1NS4xXSxbMjYuNiw1NS4zXSxbMjYuNiw1NS43XV1dLFwidHlwZVwiOlwiUG9seWdvblwifSxcInR5cGVcIjpcIkZlYXR1cmVcIixcInByb3BlcnRpZXNcIjp7XCJpc28yXCI6XCJCWVwiLFwibG5nXCI6MjgsXCJsYXRcIjo1M319LHtcImdlb21ldHJ5XCI6e1wiY29vcmRpbmF0ZXNcIjpbW1s3LjcsNDcuNV0sWzgsNDcuNl0sWzguMyw0Ny42XSxbOC42LDQ3LjZdLFs4LjQsNDcuN10sWzguNyw0Ny44XSxbOC45LDQ3LjddLFs5LjMsNDcuN10sWzkuNyw0Ny41XSxbOS41LDQ3LjNdLFs5LjYsNDcuMV0sWzkuOSw0Ni45XSxbMTAuMiw0Ni45XSxbMTAuNCw0N10sWzEwLjUsNDYuNl0sWzEwLjMsNDYuNV0sWzEwLjEsNDYuNl0sWzEwLDQ2LjRdLFsxMC4yLDQ2LjNdLFs5LjksNDYuNF0sWzkuNyw0Ni4zXSxbOS41LDQ2LjRdLFs5LjMsNDYuNV0sWzkuMyw0Ni4zXSxbOS4xLDQ2LjFdLFs5LDQ1LjldLFs4LjksNDUuOV0sWzguOCw0Ni4xXSxbOC42LDQ2LjFdLFs4LjQsNDYuM10sWzguNSw0Ni41XSxbOC4zLDQ2LjRdLFs4LjEsNDYuMV0sWzcuOSw0NS45XSxbNy43LDQ2XSxbNy41LDQ1LjldLFs3LjIsNDUuOV0sWzcsNDZdLFs2LjgsNDYuMl0sWzYuNyw0Ni41XSxbNi4zLDQ2LjRdLFs2LjMsNDYuM10sWzYsNDYuMV0sWzYuMSw0Ni4yXSxbNi4xLDQ2LjZdLFs2LjQsNDYuOF0sWzYuNSw0N10sWzYuNyw0Ny4xXSxbNyw0Ny4zXSxbNyw0Ny41XSxbNy4zLDQ3LjRdLFs3LjUsNDcuNV0sWzcuNyw0Ny42XSxbNy43LDQ3LjVdXV0sXCJ0eXBlXCI6XCJQb2x5Z29uXCJ9LFwidHlwZVwiOlwiRmVhdHVyZVwiLFwicHJvcGVydGllc1wiOntcImlzbzJcIjpcIkNIXCIsXCJsbmdcIjo4LFwibGF0XCI6NDd9fSx7XCJnZW9tZXRyeVwiOntcImNvb3JkaW5hdGVzXCI6W1tbMzMuNywzNS40XSxbMzMuOSwzNS40XSxbMzQuMywzNS42XSxbMzQuNSwzNS43XSxbMzQuNiwzNS42XSxbMzQuMywzNS41XSxbMzQuMSwzNS40XSxbMzMuOSwzNS4zXSxbMzQsMzUuMV0sWzM0LjEsMzVdLFszMy45LDM0LjldLFszMy44LDM1XSxbMzMuNiwzNC45XSxbMzMuNSwzNC44XSxbMzMuMywzNC43XSxbMzMuMSwzNC43XSxbMzMsMzQuNl0sWzMyLjksMzQuN10sWzMyLjgsMzQuNl0sWzMyLjcsMzQuN10sWzMyLjUsMzQuN10sWzMyLjQsMzQuOF0sWzMyLjMsMzVdLFszMi40LDM1XSxbMzIuNSwzNS4xXSxbMzIuNiwzNS4yXSxbMzIuOCwzNS4yXSxbMzIuOSwzNS4yXSxbMzIuOSwzNS40XSxbMzMuMywzNS4zXSxbMzMuNSwzNS4zXSxbMzMuNywzNS40XV1dLFwidHlwZVwiOlwiUG9seWdvblwifSxcInR5cGVcIjpcIkZlYXR1cmVcIixcInByb3BlcnRpZXNcIjp7XCJpc28yXCI6XCJDWVwiLFwibG5nXCI6MzMsXCJsYXRcIjozNX19LHtcImdlb21ldHJ5XCI6e1wiY29vcmRpbmF0ZXNcIjpbW1sxNC43LDQ4LjZdLFsxNC40LDQ4LjZdLFsxNC4xLDQ4LjddLFsxMy44LDQ4LjhdLFsxMy42LDQ4LjldLFsxMy40LDQ5XSxbMTMuMiw0OS4yXSxbMTIuOCw0OS4zXSxbMTIuNiw0OS42XSxbMTIuNSw0OS45XSxbMTIuMyw1MF0sWzEyLjIsNTAuMl0sWzEyLjMsNTAuMl0sWzEyLjYsNTAuNF0sWzEyLjgsNTAuNV0sWzEzLjEsNTAuNV0sWzEzLjMsNTAuNl0sWzEzLjUsNTAuN10sWzEzLjksNTAuOF0sWzE0LjMsNTAuOV0sWzE0LjMsNTEuMV0sWzE0LjYsNTAuOV0sWzE0LjgsNTAuOV0sWzE1LjIsNTFdLFsxNS40LDUwLjhdLFsxNS44LDUwLjddLFsxNi4xLDUwLjZdLFsxNi4zLDUwLjddLFsxNi4zLDUwLjVdLFsxNi40LDUwLjRdLFsxNi41LDUwLjJdLFsxNi43LDUwLjFdLFsxNi45LDUwLjJdLFsxNi45LDUwLjNdLFsxNy4yLDUwLjRdLFsxNy40LDUwLjNdLFsxNy44LDUwLjNdLFsxNy42LDUwLjJdLFsxNy44LDUwXSxbMTguMSw1MC4xXSxbMTguNCw0OS45XSxbMTguNiw0OS44XSxbMTguOCw0OS42XSxbMTguNyw0OS41XSxbMTguNCw0OS4zXSxbMTguMiw0OS4yXSxbMTguMSw0OV0sWzE3LjcsNDguOV0sWzE3LjQsNDguOF0sWzE3LjEsNDguOF0sWzE2LjksNDguNl0sWzE2LjcsNDguN10sWzE2LjUsNDguOF0sWzE2LjMsNDguN10sWzE1LjgsNDguOV0sWzE1LjUsNDguOV0sWzE1LjMsNDldLFsxNSw0OV0sWzE0LjksNDguOF0sWzE0LjcsNDguNl1dXSxcInR5cGVcIjpcIlBvbHlnb25cIn0sXCJ0eXBlXCI6XCJGZWF0dXJlXCIsXCJwcm9wZXJ0aWVzXCI6e1wiaXNvMlwiOlwiQ1pcIixcImxuZ1wiOjE1LjUsXCJsYXRcIjo0OS44fX0se1wiZ2VvbWV0cnlcIjp7XCJjb29yZGluYXRlc1wiOltbW1sxMSw1NC40XSxbMTAuOCw1My45XSxbMTEuNiw1NF0sWzEyLjQsNTQuNF0sWzEyLjUsNTQuMl0sWzEzLjcsNTQuMl0sWzE0LjMsNTMuN10sWzE0LjIsNTIuOF0sWzE0LjUsNTIuNF0sWzE0LjcsNTEuN10sWzE1LDUxLjRdLFsxNC42LDUwLjldLFsxNCw1MC44XSxbMTMuMiw1MC42XSxbMTIuNiw1MC40XSxbMTIuMyw1MC4xXSxbMTIuNiw0OS41XSxbMTMuNCw0OV0sWzEzLjgsNDguNl0sWzEzLjQsNDguNF0sWzEzLDQ3LjldLFsxMyw0Ny41XSxbMTIuMiw0Ny42XSxbMTEuMSw0Ny40XSxbMTAuNSw0Ny41XSxbOS43LDQ3LjZdLFs4LjgsNDcuN10sWzguNiw0Ny43XSxbNy44LDQ3LjZdLFs3LjYsNDguMV0sWzguMSw0OC44XSxbNy42LDQ5LjFdLFs2LjksNDkuMl0sWzYuNSw0OS43XSxbNi4xLDUwLjFdLFs2LjMsNTAuNl0sWzUuOSw1MV0sWzYuMiw1MS42XSxbNi42LDUxLjldLFs2LjksNTIuMl0sWzYuOSw1Mi40XSxbNyw1Mi42XSxbNy4yLDUzLjNdLFs3LjIsNTMuNl0sWzgsNTMuN10sWzguMyw1My40XSxbOC41LDUzLjddLFs5LjIsNTMuOV0sWzkuOCw1My41XSxbOC45LDU0LjFdLFs4LjcsNTQuNF0sWzguNyw1NC44XSxbOC40LDU1XSxbOS4zLDU0LjhdLFsxMCw1NC42XSxbMTAuNyw1NC4zXSxbMTEsNTQuNF1dXSxbW1sxMy40LDU0LjZdLFsxMy41LDU0LjZdLFsxMy42LDU0LjZdLFsxMy43LDU0LjZdLFsxMy43LDU0LjVdLFsxMy42LDU0LjVdLFsxMy42LDU0LjRdLFsxMy43LDU0LjRdLFsxMy43LDU0LjNdLFsxMy41LDU0LjNdLFsxMy40LDU0LjNdLFsxMy40LDU0LjJdLFsxMy4zLDU0LjJdLFsxMy4zLDU0LjNdLFsxMy4yLDU0LjNdLFsxMy4xLDU0LjNdLFsxMy4xLDU0LjRdLFsxMy4yLDU0LjRdLFsxMy4zLDU0LjRdLFsxMy4yLDU0LjVdLFsxMy4xLDU0LjVdLFsxMy4yLDU0LjZdLFsxMy4zLDU0LjZdLFsxMy40LDU0LjVdLFsxMy41LDU0LjVdLFsxMy4yLDU0LjddLFsxMy4zLDU0LjddLFsxMy40LDU0LjddLFsxMy40LDU0LjZdXV0sW1tbMTQsNTQuMV0sWzE0LjEsNTRdLFsxNC4yLDUzLjldLFsxNC4xLDUzLjldLFsxNCw1My45XSxbMTQsNTMuOF0sWzEzLjksNTMuOF0sWzEzLjgsNTMuOV0sWzEzLjksNTMuOV0sWzE0LDU0XSxbMTMuOSw1NC4xXSxbMTMuOSw1NF0sWzEzLjgsNTRdLFsxMy44LDU0LjFdLFsxMy44LDU0LjJdLFsxNCw1NC4xXV1dLFtdLFtdLFtdLFtdXSxcInR5cGVcIjpcIk11bHRpUG9seWdvblwifSxcInR5cGVcIjpcIkZlYXR1cmVcIixcInByb3BlcnRpZXNcIjp7XCJpc28yXCI6XCJERVwiLFwibG5nXCI6OSxcImxhdFwiOjUxfX0se1wiZ2VvbWV0cnlcIjp7XCJjb29yZGluYXRlc1wiOltbW1sxMC40LDU3LjZdLFsxMC40LDU3LjVdLFsxMC41LDU3LjVdLFsxMC41LDU3LjRdLFsxMC41LDU3LjJdLFsxMC40LDU3LjJdLFsxMC40LDU3LjFdLFsxMC4zLDU3XSxbMTAuMiw1N10sWzEwLjEsNTddLFsxMCw1Ny4xXSxbOS41LDU3XSxbOS4zLDU3XSxbOS4yLDU3XSxbOS4xLDU3XSxbOS4xLDU3LjFdLFs5LDU3XSxbOC45LDU3XSxbOC44LDU3XSxbOC44LDU2LjldLFs4LjcsNTddLFs4LjcsNTYuOV0sWzguNiw1Ni45XSxbOC42LDU2LjhdLFs4LjUsNTYuOF0sWzguNSw1Ni43XSxbOC40LDU2LjddLFs4LjYsNTYuN10sWzguNiw1Ni42XSxbOC41LDU2LjZdLFs4LjIsNTYuN10sWzguMiw1Ni44XSxbOC4zLDU2LjhdLFs4LjMsNTYuOV0sWzguNCw1Ni45XSxbOC41LDU3XSxbOC42LDU3LjFdLFs4LjcsNTcuMV0sWzguOCw1Ny4xXSxbOC45LDU3LjFdLFs5LDU3LjJdLFs5LjIsNTcuMV0sWzkuMyw1Ny4xXSxbOS40LDU3LjJdLFs5LjUsNTcuMl0sWzkuNiw1Ny4yXSxbOS42LDU3LjNdLFs5LjcsNTcuNF0sWzkuOCw1Ny40XSxbOS44LDU3LjVdLFs5LjksNTcuNl0sWzEwLDU3LjZdLFsxMC4xLDU3LjZdLFsxMC4yLDU3LjZdLFsxMC4zLDU3LjZdLFsxMC40LDU3LjddLFsxMC41LDU3LjddLFsxMC42LDU3LjddLFsxMC41LDU3LjZdLFsxMC40LDU3LjZdXV0sW1tbMTAsNTcuMV0sWzEwLjMsNTddLFsxMC4zLDU2LjddLFs5LjksNTYuNl0sWzEwLjQsNTYuN10sWzEwLjIsNTYuNl0sWzEwLjUsNTYuNV0sWzEwLjksNTYuNV0sWzEwLjcsNTYuMl0sWzEwLjYsNTYuMV0sWzEwLjUsNTYuM10sWzEwLjIsNTYuMV0sWzEwLjMsNTUuOV0sWzEwLjEsNTUuOF0sWzkuOSw1NS44XSxbOS44LDU1LjddLFs5LjgsNTUuNl0sWzkuNyw1NS4zXSxbOS41LDU1LjJdLFs5LjYsNTVdLFs5LjgsNTQuOV0sWzkuNiw1NC45XSxbOS40LDU0LjhdLFs5LjIsNTQuOV0sWzguNyw1NC45XSxbOC42LDU1LjFdLFs4LjYsNTUuMl0sWzguNiw1NS40XSxbOC40LDU1LjVdLFs4LjEsNTUuNV0sWzguMiw1NS44XSxbOC4xLDU2XSxbOC4zLDU1LjldLFs4LjMsNTYuMV0sWzguMSw1Ni4zXSxbOC4yLDU2LjZdLFs4LjQsNTYuNl0sWzguNiw1Ni41XSxbOC44LDU2LjZdLFs4LjksNTYuOF0sWzkuMiw1Ni43XSxbOSw1Ni42XSxbOS4zLDU2LjVdLFs5LjMsNTYuN10sWzkuNCw1N10sWzkuNyw1N10sWzkuOSw1Ny4xXSxbMTAsNTcuMV1dXSxbW1sxMi42LDU2XSxbMTIuNiw1NS45XSxbMTIuNiw1NS43XSxbMTIuNSw1NS42XSxbMTIuMyw1NS42XSxbMTIuMiw1NS40XSxbMTIuNCw1NS40XSxbMTIuNSw1NS4zXSxbMTIuMiw1NS4yXSxbMTIsNTUuMV0sWzEyLjIsNTUuMV0sWzEyLjEsNTVdLFsxMS45LDU1XSxbMTEuNyw1NS4xXSxbMTEuOCw1NS4yXSxbMTEuNiw1NS4yXSxbMTEuNCw1NS4yXSxbMTEuMiw1NS4yXSxbMTEuMiw1NS40XSxbMTEuMSw1NS43XSxbMTAuOSw1NS43XSxbMTEuMyw1NS43XSxbMTEuNSw1NS45XSxbMTEuMyw1Nl0sWzExLjYsNTUuOV0sWzExLjcsNTZdLFsxMS44LDU1LjldLFsxMS44LDU1LjhdLFsxMS45LDU1LjldLFsxMiw1NS44XSxbMTIuMSw1NS43XSxbMTEuOSw1NS43XSxbMTEuOSw1Nl0sWzEyLjMsNTYuMV0sWzEyLjYsNTZdXV0sW1tbMTAuNyw1NS41XSxbMTAuOCw1NS40XSxbMTAuOCw1NS4zXSxbMTAuOCw1NS4yXSxbMTAuOCw1NS4xXSxbMTAuNyw1NS4xXSxbMTAuNiw1NS4xXSxbMTAuNSw1NV0sWzEwLjIsNTUuMV0sWzEwLjEsNTUuMV0sWzEwLjEsNTUuMl0sWzEwLDU1LjJdLFs5LjksNTUuM10sWzkuOCw1NS40XSxbOS44LDU1LjVdLFs5LjcsNTUuNV0sWzkuOSw1NS41XSxbMTAsNTUuNV0sWzEwLjEsNTUuNl0sWzEwLjIsNTUuNl0sWzEwLjMsNTUuNl0sWzEwLjQsNTUuNl0sWzEwLjUsNTUuNV0sWzEwLjQsNTUuNV0sWzEwLjQsNTUuNF0sWzEwLjUsNTUuNF0sWzEwLjYsNTUuNV0sWzEwLjYsNTUuNl0sWzEwLjcsNTUuNl0sWzEwLjcsNTUuNV1dXSxbW1sxMS41LDU0LjhdLFsxMS42LDU0LjhdLFsxMS42LDU0LjldLFsxMS43LDU0LjldLFsxMS44LDU0LjhdLFsxMS45LDU0LjddLFsxMS44LDU0LjddLFsxMS44LDU0LjZdLFsxMS43LDU0LjZdLFsxMS43LDU0LjddLFsxMS42LDU0LjddLFsxMS41LDU0LjZdLFsxMS40LDU0LjZdLFsxMS40LDU0LjddLFsxMS4zLDU0LjddLFsxMS4yLDU0LjddLFsxMS4xLDU0LjddLFsxMSw1NC44XSxbMTEsNTQuOV0sWzExLjEsNTQuOV0sWzExLjEsNTVdLFsxMS4yLDU1XSxbMTEuMyw1NC45XSxbMTEuNCw1NC45XSxbMTEuNSw1NC44XV1dLFtbWzEyLDU0LjldLFsxMi4xLDU0LjldLFsxMi4yLDU0LjhdLFsxMi4xLDU0LjhdLFsxMiw1NC43XSxbMTIsNTQuNl0sWzExLjksNTQuNl0sWzExLjksNTQuN10sWzExLjksNTQuOF0sWzExLjgsNTQuOF0sWzExLjgsNTQuOV0sWzExLjcsNTQuOV0sWzExLjcsNTVdLFsxMS44LDU1XSxbMTEuOSw1NV0sWzExLjksNTQuOV0sWzEyLDU0LjldXV0sW11dLFwidHlwZVwiOlwiTXVsdGlQb2x5Z29uXCJ9LFwidHlwZVwiOlwiRmVhdHVyZVwiLFwicHJvcGVydGllc1wiOntcImlzbzJcIjpcIkRLXCIsXCJsbmdcIjoxMCxcImxhdFwiOjU2fX0se1wiZ2VvbWV0cnlcIjp7XCJjb29yZGluYXRlc1wiOltbW1syNS44LDU5LjZdLFsyNi4xLDU5LjZdLFsyNi41LDU5LjVdLFsyNi43LDU5LjZdLFsyNi45LDU5LjVdLFsyNy4yLDU5LjRdLFsyNy42LDU5LjRdLFsyOCw1OS40XSxbMjguMSw1OS40XSxbMjguMSw1OS4zXSxbMjcuOSw1OS4yXSxbMjcuNyw1OV0sWzI3LjQsNTguOF0sWzI3LjUsNTguNV0sWzI3LjUsNTguMl0sWzI3LjcsNTguMV0sWzI3LjgsNTcuOF0sWzI3LjUsNTcuOF0sWzI3LjQsNTcuNl0sWzI3LjEsNTcuNl0sWzI2LjcsNTcuNl0sWzI2LjUsNTcuNV0sWzI2LDU3LjhdLFsyNS42LDU3LjldLFsyNS4zLDU4LjFdLFsyNS4yLDU4LjFdLFsyNSw1OF0sWzI0LjUsNThdLFsyNC4zLDU3LjldLFsyNC41LDU4LjJdLFsyNC41LDU4LjRdLFsyNC4zLDU4LjNdLFsyNC4xLDU4LjNdLFsyMy44LDU4LjRdLFsyMy42LDU4LjVdLFsyMy42LDU4LjddLFsyMy44LDU4LjhdLFsyMy40LDU4LjldLFsyMy42LDU5XSxbMjMuNCw1OS4xXSxbMjMuNiw1OS4yXSxbMjMuOCw1OS4zXSxbMjQsNTkuNF0sWzI0LjMsNTkuNF0sWzI0LjUsNTkuNV0sWzI0LjgsNTkuNl0sWzI1LjIsNTkuNV0sWzI1LjUsNTkuNl0sWzI1LjcsNTkuNl0sWzI1LjgsNTkuNl1dXSxbW1syMyw1OC42XSxbMjMuMSw1OC42XSxbMjMuMyw1OC41XSxbMjMuMyw1OC40XSxbMjMuMiw1OC40XSxbMjMuMSw1OC40XSxbMjMsNTguNF0sWzIyLjgsNTguMl0sWzIyLjYsNTguMl0sWzIyLjUsNTguMl0sWzIyLjQsNTguMl0sWzIyLjMsNTguMl0sWzIyLjMsNTguMV0sWzIyLjIsNThdLFsyMi4xLDU3LjldLFsyMiw1Ny45XSxbMjIsNThdLFsyMi4xLDU4LjFdLFsyMi4yLDU4LjFdLFsyMi4yLDU4LjJdLFsyMi4xLDU4LjJdLFsyMS45LDU4LjNdLFsyMS44LDU4LjNdLFsyMiw1OC4zXSxbMjIsNTguNF0sWzIxLjksNTguNV0sWzIxLjgsNTguNV0sWzIyLDU4LjVdLFsyMi4xLDU4LjVdLFsyMi4yLDU4LjVdLFsyMi4zLDU4LjZdLFsyMi41LDU4LjZdLFsyMi42LDU4LjZdLFsyMi44LDU4LjZdLFsyMi45LDU4LjZdLFsyMyw1OC42XV1dLFtbWzIyLjcsNTldLFsyMi44LDU5XSxbMjIuOSw1OV0sWzIzLDU5XSxbMjMsNTguOV0sWzIzLDU4LjhdLFsyMi45LDU4LjhdLFsyMi44LDU4LjhdLFsyMi43LDU4LjhdLFsyMi43LDU4LjddLFsyMi42LDU4LjddLFsyMi41LDU4LjddLFsyMi41LDU4LjhdLFsyMi40LDU4LjhdLFsyMi40LDU4LjldLFsyMi4zLDU4LjldLFsyMi4yLDU4LjldLFsyMi4xLDU4LjldLFsyMiw1OC45XSxbMjIuMSw1OV0sWzIyLjQsNTldLFsyMi41LDU5XSxbMjIuNiw1OS4xXSxbMjIuNyw1OS4xXSxbMjIuNyw1OV1dXSxbXSxbXSxbXV0sXCJ0eXBlXCI6XCJNdWx0aVBvbHlnb25cIn0sXCJ0eXBlXCI6XCJGZWF0dXJlXCIsXCJwcm9wZXJ0aWVzXCI6e1wiaXNvMlwiOlwiRUVcIixcImxuZ1wiOjI2LFwibGF0XCI6NTl9fSx7XCJnZW9tZXRyeVwiOntcImNvb3JkaW5hdGVzXCI6W1tbWy03LjksNDMuOF0sWy03LjIsNDMuNl0sWy02LjMsNDMuNl0sWy01LjYsNDMuNl0sWy00LjksNDMuNF0sWy00LjIsNDMuNF0sWy0zLjIsNDMuNF0sWy0yLjUsNDMuM10sWy0xLjgsNDMuM10sWy0xLjQsNDNdLFstMC44LDQyLjldLFstMC4zLDQyLjhdLFswLjMsNDIuN10sWzAuOCw0Mi44XSxbMS40LDQyLjZdLFsyLDQyLjRdLFsyLjcsNDIuM10sWzMuMyw0Mi4yXSxbMy4xLDQxLjhdLFsyLjMsNDEuNF0sWzEuNyw0MS4yXSxbMC45LDQxXSxbMC41LDQwLjVdLFstMC4xLDM5LjldLFstMC4xLDM5XSxbMC4xLDM4LjddLFstMC41LDM4LjNdLFstMC45LDM3LjddLFstMS40LDM3LjVdLFstMS45LDM3XSxbLTIuMywzNi44XSxbLTIuOSwzNi43XSxbLTMuNywzNi43XSxbLTQuNSwzNi43XSxbLTUuMiwzNi40XSxbLTUuOSwzNi4yXSxbLTYuMiwzNi42XSxbLTYuOSwzNy4yXSxbLTcuNCwzNy40XSxbLTcuMywzOF0sWy03LjEsMzguMl0sWy03LjEsMzguOV0sWy03LjQsMzkuNV0sWy03LjEsMzkuN10sWy02LjgsNDAuM10sWy02LjksNDFdLFstNi40LDQxLjRdLFstNi41LDQxLjddLFstNi45LDQxLjldLFstNy4zLDQxLjhdLFstOCw0MS44XSxbLTguMiw0Mi4xXSxbLTguNyw0Ml0sWy04LjYsNDIuNF0sWy04LjksNDIuNF0sWy04LjksNDIuNl0sWy05LjEsNDIuOF0sWy05LjEsNDMuMl0sWy04LjQsNDMuNF0sWy03LjksNDMuOF1dXSxbW1szLjIsMzkuN10sWzMuMywzOS43XSxbMy4zLDM5LjhdLFszLjQsMzkuOF0sWzMuNSwzOS43XSxbMy40LDM5LjZdLFszLjQsMzkuNV0sWzMuMywzOS41XSxbMy4zLDM5LjRdLFszLjIsMzkuNF0sWzMuMSwzOS4zXSxbMywzOS4zXSxbMi44LDM5LjRdLFsyLjcsMzkuNF0sWzIuNywzOS41XSxbMi44LDM5LjVdLFsyLjcsMzkuNl0sWzIuNSwzOS41XSxbMi40LDM5LjVdLFsyLjQsMzkuNl0sWzIuNSwzOS43XSxbMi43LDM5LjhdLFsyLjgsMzkuOF0sWzMsMzkuOV0sWzMuMSwzOS45XSxbMy4xLDM5LjhdLFszLjIsMzkuOF0sWzMuMiwzOS43XV1dLFtbWy0xNC4zLDI4XSxbLTE0LjQsMjhdLFstMTQuNCwyOC4xXSxbLTE0LjMsMjguMV0sWy0xNC4zLDI4LjJdLFstMTQuMiwyOC4yXSxbLTE0LjIsMjguM10sWy0xNC4xLDI4LjRdLFstMTQuMSwyOC41XSxbLTE0LjEsMjguNl0sWy0xNCwyOC42XSxbLTE0LDI4LjddLFstMTMuOSwyOC43XSxbLTEzLjksMjguOF0sWy0xMy44LDI4LjddLFstMTMuOCwyOC42XSxbLTEzLjgsMjguNV0sWy0xMy45LDI4LjRdLFstMTMuOSwyOC4zXSxbLTEzLjksMjguMl0sWy0xNCwyOC4yXSxbLTE0LjEsMjguMl0sWy0xNC4yLDI4LjFdLFstMTQuMywyOF1dXSxbW1stMTYuMywyOC40XSxbLTE2LjQsMjguNF0sWy0xNi40LDI4LjJdLFstMTYuNCwyOC4xXSxbLTE2LjUsMjguMV0sWy0xNi41LDI4XSxbLTE2LjYsMjhdLFstMTYuNywyOF0sWy0xNi43LDI4LjFdLFstMTYuOCwyOC4xXSxbLTE2LjgsMjguMl0sWy0xNi45LDI4LjNdLFstMTYuOSwyOC40XSxbLTE2LjgsMjguNF0sWy0xNi43LDI4LjRdLFstMTYuNiwyOC40XSxbLTE2LjUsMjguNF0sWy0xNi40LDI4LjVdLFstMTYuMywyOC42XSxbLTE2LjIsMjguNl0sWy0xNi4yLDI4LjVdLFstMTYuMywyOC40XV1dLFtbWy0xNS42LDI3LjhdLFstMTUuNiwyNy43XSxbLTE1LjcsMjcuOF0sWy0xNS44LDI3LjhdLFstMTUuOCwyNy45XSxbLTE1LjgsMjhdLFstMTUuNywyOF0sWy0xNS43LDI4LjFdLFstMTUuNywyOC4yXSxbLTE1LjYsMjguMl0sWy0xNS40LDI4LjFdLFstMTUuNCwyOF0sWy0xNS40LDI3LjhdLFstMTUuNSwyNy44XSxbLTE1LjYsMjcuOF1dXSxbW1s0LjMsNDBdLFs0LjMsMzkuOV0sWzQuMywzOS44XSxbNC4yLDM5LjhdLFs0LjEsMzkuOV0sWzQsMzkuOV0sWzMuOSwzOS45XSxbMy44LDM5LjldLFszLjgsNDBdLFszLjgsNDAuMV0sWzMuOSw0MC4xXSxbNC4xLDQwLjFdLFs0LjIsNDAuMV0sWzQuMiw0MF0sWzQuMyw0MF1dXSxbXV0sXCJ0eXBlXCI6XCJNdWx0aVBvbHlnb25cIn0sXCJ0eXBlXCI6XCJGZWF0dXJlXCIsXCJwcm9wZXJ0aWVzXCI6e1wiaXNvMlwiOlwiRVNcIixcImxuZ1wiOi00LFwibGF0XCI6NDB9fSx7XCJnZW9tZXRyeVwiOntcImNvb3JkaW5hdGVzXCI6W1tbWzI4LjIsNjkuOV0sWzI5LjMsNjkuNV0sWzI4LjksNjldLFsyOC41LDY4LjZdLFsyOS45LDY3LjddLFsyOS4xLDY2LjldLFsyOS44LDY2LjJdLFsyOS44LDY1LjZdLFsyOS44LDY1LjJdLFsyOS43LDY0LjhdLFszMCw2NC41XSxbMzAuNiw2NF0sWzMwLjMsNjMuNl0sWzMxLjUsNjNdLFszMC44LDYyLjNdLFsyOS43LDYxLjVdLFsyOC44LDYxLjFdLFsyOC4xLDYwLjddLFsyNy4yLDYwLjZdLFsyNi42LDYwLjZdLFsyNS45LDYwLjRdLFsyNS43LDYwLjRdLFsyNC42LDYwLjFdLFsyMy42LDYwXSxbMjMuMiw1OS45XSxbMjMsNjAuMl0sWzIyLjUsNjAuMl0sWzIxLjksNjAuNV0sWzIxLjQsNjAuOF0sWzIxLjUsNjEuNV0sWzIxLjMsNjJdLFsyMS4xLDYyLjZdLFsyMS42LDYzLjFdLFsyMi4zLDYzLjNdLFsyMi43LDYzLjddLFsyMy40LDY0XSxbMjQuMiw2NC41XSxbMjUsNjQuOV0sWzI1LjMsNjVdLFsyNS4yLDY1LjZdLFsyNC43LDY1LjldLFsyMy43LDY2LjJdLFsyNCw2Ni44XSxbMjMuOCw2Ny40XSxbMjMuNSw2Ny45XSxbMjMsNjguM10sWzIyLjEsNjguNV0sWzIxLjIsNjguOF0sWzIwLjgsNjkuMV0sWzIyLDY5LjFdLFsyMi45LDY4LjddLFsyMy43LDY4LjddLFsyNC41LDY4LjddLFsyNS40LDY4LjldLFsyNS44LDY5LjRdLFsyNi40LDY5LjhdLFsyNy4zLDY5LjldLFsyOC4yLDY5LjldXV0sW10sW10sW10sW10sW10sW11dLFwidHlwZVwiOlwiTXVsdGlQb2x5Z29uXCJ9LFwidHlwZVwiOlwiRmVhdHVyZVwiLFwicHJvcGVydGllc1wiOntcImlzbzJcIjpcIkZJXCIsXCJsbmdcIjoyNixcImxhdFwiOjY0fX0se1wiZ2VvbWV0cnlcIjp7XCJjb29yZGluYXRlc1wiOltbW1syLjUsNTEuMV0sWzMuMiw1MC43XSxbNCw1MC4zXSxbNC41LDQ5LjldLFs1LDQ5LjhdLFs2LjEsNDkuNV0sWzYuOSw0OS4yXSxbNy43LDQ5XSxbNy45LDQ4LjddLFs3LjUsNDcuOF0sWzcuMSw0Ny41XSxbNi42LDQ3XSxbNi4xLDQ2LjRdLFs2LjIsNDYuM10sWzYuOSw0Ni4xXSxbNy4xLDQ1LjVdLFs2LjcsNDUuMV0sWzYuOSw0NC41XSxbNy43LDQ0LjJdLFs3LjIsNDMuN10sWzYuMiw0My4xXSxbNS4zLDQzLjRdLFs1LDQzLjZdLFs0LjYsNDMuNF0sWzMuOCw0My41XSxbMyw0Mi45XSxbMi43LDQyLjRdLFsxLjksNDIuNF0sWzEuNCw0Mi42XSxbMC43LDQyLjhdLFstMC4xLDQyLjddLFstMC44LDQzXSxbLTEuNCw0My4xXSxbLTEuNiw0My40XSxbLTEuMyw0NC41XSxbLTEuMiw0NV0sWy0wLjgsNDUuNF0sWy0wLjcsNDUuNF0sWy0xLjEsNDYuMV0sWy0xLjksNDYuNl0sWy0yLjIsNDcuMl0sWy0yLjQsNDcuM10sWy0yLjksNDcuNV0sWy0zLjYsNDcuOF0sWy00LjQsNDcuOF0sWy00LjMsNDguMV0sWy00LjIsNDguM10sWy00LjUsNDguNl0sWy0zLjUsNDguN10sWy0yLjcsNDguNV0sWy0xLjksNDguN10sWy0xLjUsNDguN10sWy0xLjgsNDkuNF0sWy0xLjQsNDkuN10sWy0xLDQ5LjRdLFstMC4xLDQ5LjNdLFswLjIsNDkuNV0sWzEuMiw1MF0sWzEuNiw1MC44XSxbMi41LDUxLjFdXV0sW1tbOS40LDQyLjddLFs5LjQsNDIuNl0sWzkuNSw0Mi42XSxbOS41LDQyLjVdLFs5LjYsNDIuM10sWzkuNiw0Mi4yXSxbOS42LDQyLjFdLFs5LjUsNDIuMV0sWzkuNCw0Ml0sWzkuNCw0MS45XSxbOS40LDQxLjhdLFs5LjQsNDEuN10sWzkuNCw0MS42XSxbOS4zLDQxLjZdLFs5LjMsNDEuNV0sWzkuMiw0MS41XSxbOS4yLDQxLjRdLFs5LjMsNDEuNF0sWzkuMSw0MS40XSxbOSw0MS41XSxbOC45LDQxLjVdLFs4LjgsNDEuNl0sWzguOSw0MS42XSxbOC45LDQxLjddLFs4LjgsNDEuN10sWzguNyw0MS43XSxbOC43LDQxLjhdLFs4LjgsNDEuOV0sWzguNyw0MS45XSxbOC42LDQxLjldLFs4LjYsNDJdLFs4LjcsNDJdLFs4LjcsNDIuMV0sWzguNiw0Mi4xXSxbOC42LDQyLjJdLFs4LjYsNDIuM10sWzguNyw0Mi4zXSxbOC42LDQyLjRdLFs4LjcsNDIuNV0sWzguNyw0Mi42XSxbOC45LDQyLjZdLFs5LjEsNDIuN10sWzkuMiw0Mi43XSxbOS4zLDQyLjddLFs5LjMsNDIuOF0sWzkuMyw0M10sWzkuNCw0M10sWzkuNSw0M10sWzkuNSw0Mi44XSxbOS41LDQyLjddLFs5LjQsNDIuN11dXSxbXSxbXSxbXSxbXSxbXV0sXCJ0eXBlXCI6XCJNdWx0aVBvbHlnb25cIn0sXCJ0eXBlXCI6XCJGZWF0dXJlXCIsXCJwcm9wZXJ0aWVzXCI6e1wiaXNvMlwiOlwiRlJcIixcImxuZ1wiOjIsXCJsYXRcIjo0Nn19LHtcImdlb21ldHJ5XCI6e1wiY29vcmRpbmF0ZXNcIjpbW1tbLTQuMiw1My4yXSxbLTMuMSw1My4yXSxbLTMsNTMuOF0sWy0zLjUsNTQuNF0sWy0zLjEsNTVdLFstNC40LDU0LjldLFstNSw1NC44XSxbLTUsNTUuMl0sWy00LjgsNTUuOV0sWy01LjIsNTUuOF0sWy01LjQsNTUuOV0sWy01LjgsNTUuNF0sWy01LjUsNTYuMl0sWy01LjMsNTYuNV0sWy01LjgsNTYuNV0sWy02LjEsNTYuOF0sWy01LjUsNTddLFstNS41LDU3LjRdLFstNS42LDU3LjZdLFstNS4yLDU3LjldLFstNS4yLDU4LjNdLFstNC42LDU4LjVdLFstMy40LDU4LjZdLFstMy42LDU4LjFdLFstNCw1Ny44XSxbLTQsNTcuNl0sWy0yLjksNTcuN10sWy0xLjgsNTcuNV0sWy0yLjUsNTYuNl0sWy0zLDU2LjRdLFstMy4yLDU2LjFdLFstMi44LDU2LjFdLFstMS44LDU1LjZdLFstMS4zLDU0LjhdLFstMC4yLDU0LjJdLFswLDUzLjZdLFswLjIsNTMuNV0sWzAuMiw1Mi45XSxbMS4yLDUyLjldLFsxLjcsNTIuM10sWzAuOSw1MS44XSxbMC40LDUxLjRdLFsxLjQsNTEuMV0sWzAuNCw1MC44XSxbLTAuOCw1MC43XSxbLTIuMSw1MC43XSxbLTIuOCw1MC43XSxbLTMuOCw1MC4yXSxbLTQuOSw1MC4yXSxbLTUuNyw1MC4xXSxbLTQuNyw1MC43XSxbLTQsNTEuMl0sWy0yLjksNTEuNF0sWy0zLjIsNTEuNV0sWy00LjIsNTEuNV0sWy00LjgsNTEuNl0sWy01LjIsNTEuOV0sWy00LjEsNTIuM10sWy00LjUsNTIuOF0sWy00LjIsNTMuMl1dXSxbW1stNi4yLDU4LjRdLFstNi4yLDU4LjNdLFstNi4zLDU4LjNdLFstNi4zLDU4LjJdLFstNi4yLDU4LjJdLFstNi4xLDU4LjNdLFstNi40LDU4LjJdLFstNi40LDU4LjFdLFstNi41LDU4LjFdLFstNi42LDU4LjFdLFstNi40LDU4XSxbLTYuNSw1OF0sWy02LjUsNTcuOV0sWy02LjYsNTcuOV0sWy02LjcsNTcuOV0sWy02LjcsNThdLFstNi42LDU4XSxbLTYuNyw1OC4xXSxbLTYuOCw1OF0sWy02LjcsNTcuOF0sWy03LDU3LjddLFstNy4xLDU3LjhdLFstNyw1Ny44XSxbLTYuOCw1Ny45XSxbLTYuOSw1Ny45XSxbLTYuOSw1OF0sWy03LDU4XSxbLTcuMSw1OF0sWy03LjEsNTguMV0sWy03LjEsNTguMl0sWy03LDU4LjJdLFstNi45LDU4LjJdLFstNi45LDU4LjFdLFstNi44LDU4LjJdLFstNi43LDU4LjJdLFstNi44LDU4LjNdLFstNi43LDU4LjNdLFstNi42LDU4LjNdLFstNi42LDU4LjRdLFstNi40LDU4LjVdLFstNi4zLDU4LjVdLFstNi4yLDU4LjVdLFstNi4yLDU4LjRdXV0sW1tbLTYuNCw1NS4yXSxbLTYuMiw1NS4yXSxbLTYsNTUuMl0sWy01LjgsNTQuOV0sWy01LjcsNTQuOF0sWy01LjgsNTQuN10sWy01LjksNTQuNl0sWy01LjUsNTQuN10sWy01LjUsNTQuNV0sWy01LjUsNTQuNF0sWy01LjYsNTQuNl0sWy01LjcsNTQuNV0sWy01LjYsNTQuM10sWy01LjcsNTQuMl0sWy01LjksNTQuMl0sWy02LDU0LjFdLFstNi4xLDU0XSxbLTYuMyw1NC4xXSxbLTYuNiw1NC4xXSxbLTYuNyw1NC4xXSxbLTYuOSw1NC4zXSxbLTcsNTQuNF0sWy03LjIsNTQuM10sWy03LjEsNTQuMl0sWy03LjYsNTQuMV0sWy03LjcsNTQuMl0sWy03LjksNTQuMl0sWy04LDU0LjRdLFstOC4yLDU0LjRdLFstOCw1NC41XSxbLTcuOSw1NC42XSxbLTcuOCw1NC43XSxbLTcuNiw1NC44XSxbLTcuNSw1NC45XSxbLTcuNCw1NV0sWy03LjMsNTUuMV0sWy03LDU1XSxbLTcsNTUuMl0sWy02LjgsNTUuMl0sWy02LjYsNTUuMl0sWy02LjQsNTUuMl1dXSxbW1stNi4xLDU3LjZdLFstNi4xLDU3LjVdLFstNi4xLDU3LjRdLFstNi4xLDU3LjNdLFstNS45LDU3LjJdLFstNS44LDU3LjNdLFstNS43LDU3LjNdLFstNS42LDU3LjNdLFstNS43LDU3LjJdLFstNS44LDU3LjFdLFstNS45LDU3LjFdLFstNS45LDU3XSxbLTYsNTddLFstNiw1Ny4xXSxbLTYsNTcuMl0sWy02LjEsNTcuMV0sWy02LjIsNTcuMl0sWy02LjMsNTcuMl0sWy02LjQsNTcuM10sWy02LjUsNTcuM10sWy02LjMsNTcuM10sWy02LjUsNTcuNF0sWy02LjYsNTcuNF0sWy02LjYsNTcuM10sWy02LjcsNTcuNF0sWy02LjgsNTcuNF0sWy02LjcsNTcuNV0sWy02LjYsNTcuNl0sWy02LjYsNTcuNV0sWy02LjUsNTcuNV0sWy02LjQsNTcuNV0sWy02LjQsNTcuNl0sWy02LjMsNTcuN10sWy02LjIsNTcuNl0sWy02LjEsNTcuNl1dXSxbW1stMS4zLDYwLjVdLFstMS4yLDYwLjVdLFstMSw2MC40XSxbLTEuMSw2MC40XSxbLTEuMSw2MC4zXSxbLTEuMiw2MC4zXSxbLTEuMiw2MC4yXSxbLTEuMSw2MC4yXSxbLTEuMSw2MC4xXSxbLTEuMiw2MC4xXSxbLTEuMiw2MF0sWy0xLjMsNTkuOV0sWy0xLjQsNTkuOV0sWy0xLjMsNjBdLFstMS4zLDYwLjFdLFstMS4zLDYwLjJdLFstMS40LDYwLjNdLFstMS40LDYwLjJdLFstMS41LDYwLjJdLFstMS42LDYwLjJdLFstMS43LDYwLjJdLFstMS43LDYwLjNdLFstMS42LDYwLjNdLFstMS41LDYwLjNdLFstMS4zLDYwLjNdLFstMS4zLDYwLjRdLFstMS40LDYwLjVdLFstMS41LDYwLjVdLFstMS42LDYwLjVdLFstMS40LDYwLjZdLFstMS4zLDYwLjZdLFstMS4zLDYwLjVdXV0sW1tbLTUuOCw1Ni41XSxbLTUuNyw1Ni41XSxbLTUuNiw1Ni40XSxbLTUuNyw1Ni40XSxbLTUuOCw1Ni4zXSxbLTUuOSw1Ni4zXSxbLTUuOSw1Ni40XSxbLTYsNTYuM10sWy02LjMsNTYuM10sWy02LjQsNTYuM10sWy02LjIsNTYuM10sWy02LjEsNTYuNF0sWy02LDU2LjRdLFstNi4yLDU2LjRdLFstNiw1Ni41XSxbLTYuMSw1Ni41XSxbLTYuMyw1Ni41XSxbLTYuMyw1Ni42XSxbLTYuMiw1Ni42XSxbLTYuMSw1Ni43XSxbLTYuMSw1Ni42XSxbLTYsNTYuNl0sWy01LjksNTYuNV0sWy01LjgsNTYuNV1dXSxbW1stNi4xLDU1LjldLFstNi4xLDU1LjhdLFstNiw1NS44XSxbLTYsNTUuN10sWy02LjEsNTUuNl0sWy02LjIsNTUuNl0sWy02LjMsNTUuNl0sWy02LjMsNTUuN10sWy02LjMsNTUuOF0sWy02LjQsNTUuOF0sWy02LjQsNTUuN10sWy02LjUsNTUuN10sWy02LjQsNTUuOV0sWy02LjMsNTUuOV0sWy02LjIsNTUuOV0sWy02LjEsNTUuOV1dXV0sXCJ0eXBlXCI6XCJNdWx0aVBvbHlnb25cIn0sXCJ0eXBlXCI6XCJGZWF0dXJlXCIsXCJwcm9wZXJ0aWVzXCI6e1wiaXNvMlwiOlwiR0JcIixcImxuZ1wiOi0yLFwibGF0XCI6NTR9fSx7XCJnZW9tZXRyeVwiOntcImNvb3JkaW5hdGVzXCI6W1tbNDEuNSw0Mi40XSxbNDEuNSw0Mi43XSxbNDEuMiw0Mi44XSxbNDEsNDNdLFs0MC44LDQzLjFdLFs0MC4zLDQzLjJdLFs0MC4xLDQzLjRdLFs0MC4xLDQzLjZdLFs0MC40LDQzLjZdLFs0MC43LDQzLjVdLFs0MSw0My40XSxbNDEuNCw0My4zXSxbNDIuMSw0My4yXSxbNDIuNCw0My4yXSxbNDIuNyw0My4yXSxbNDIuOSw0My4xXSxbNDMuMiw0Mi45XSxbNDMuNiw0Mi45XSxbNDMuOCw0Mi44XSxbNDMuNyw0Mi42XSxbNDQuMiw0Mi42XSxbNDQuNSw0Mi44XSxbNDQuNyw0Mi43XSxbNDQuOSw0Mi44XSxbNDUuMiw0Mi43XSxbNDUuNCw0Mi41XSxbNDUuNiw0Mi42XSxbNDUuOCw0Mi41XSxbNDUuNiw0Mi4yXSxbNDYuMSw0Ml0sWzQ2LjQsNDEuOV0sWzQ2LjMsNDEuOF0sWzQ2LjIsNDEuNl0sWzQ2LjYsNDEuNF0sWzQ2LjcsNDEuMV0sWzQ2LjUsNDEuMV0sWzQ2LjMsNDEuMl0sWzQ2LDQxLjJdLFs0NS43LDQxLjNdLFs0NS4zLDQxLjVdLFs0NS4xLDQxLjRdLFs0NC45LDQxLjJdLFs0NC42LDQxLjJdLFs0NC4zLDQxLjJdLFs0NCw0MS4yXSxbNDMuOCw0MS4xXSxbNDMuNSw0MS4xXSxbNDMuMyw0MS4yXSxbNDMsNDEuNF0sWzQyLjcsNDEuNl0sWzQyLjUsNDEuNF0sWzQyLjIsNDEuNV0sWzQxLjksNDEuNV0sWzQxLjcsNDEuNV0sWzQxLjYsNDEuNl0sWzQxLjgsNDEuOF0sWzQxLjcsNDIuMV0sWzQxLjYsNDIuM10sWzQxLjUsNDIuNF1dXSxcInR5cGVcIjpcIlBvbHlnb25cIn0sXCJ0eXBlXCI6XCJGZWF0dXJlXCIsXCJwcm9wZXJ0aWVzXCI6e1wiaXNvMlwiOlwiR0VcIixcImxuZ1wiOjQzLjUsXCJsYXRcIjo0Mn19LHtcImdlb21ldHJ5XCI6e1wiY29vcmRpbmF0ZXNcIjpbW1tbMjMuOSwzNS41XSxbMjQsMzUuNV0sWzI0LjEsMzUuNV0sWzI0LjEsMzUuNl0sWzI0LjIsMzUuNl0sWzI0LjIsMzUuNV0sWzI0LjMsMzUuNF0sWzI0LjQsMzUuNF0sWzI0LjUsMzUuNF0sWzI0LjYsMzUuNF0sWzI0LjgsMzUuNF0sWzI1LDM1LjRdLFsyNS4xLDM1LjNdLFsyNS4yLDM1LjNdLFsyNS4zLDM1LjNdLFsyNS40LDM1LjNdLFsyNS41LDM1LjNdLFsyNS42LDM1LjNdLFsyNS43LDM1LjNdLFsyNS44LDM1LjNdLFsyNS43LDM1LjJdLFsyNS43LDM1LjFdLFsyNS44LDM1LjFdLFsyNS45LDM1LjJdLFsyNiwzNS4yXSxbMjYuMSwzNS4yXSxbMjYuMiwzNS4yXSxbMjYuMywzNS4zXSxbMjYuMywzNS4xXSxbMjYuMiwzNV0sWzI2LjEsMzVdLFsyNiwzNV0sWzI1LjYsMzVdLFsyNS41LDM1XSxbMjUuMywzNV0sWzI1LjIsMzVdLFsyNSwzNC45XSxbMjQuOSwzNC45XSxbMjQuOCwzNC45XSxbMjQuOCwzNV0sWzI0LjcsMzUuMV0sWzI0LjYsMzUuMV0sWzI0LjUsMzUuMV0sWzI0LjQsMzUuMl0sWzI0LjIsMzUuMl0sWzI0LjEsMzUuMl0sWzI0LDM1LjJdLFsyMy45LDM1LjJdLFsyMy44LDM1LjJdLFsyMy43LDM1LjJdLFsyMy42LDM1LjJdLFsyMy41LDM1LjNdLFsyMy42LDM1LjVdLFsyMy42LDM1LjZdLFsyMy43LDM1LjVdLFsyMy43LDM1LjZdLFsyMy43LDM1LjddLFsyMy44LDM1LjddLFsyMy44LDM1LjZdLFsyMy44LDM1LjVdLFsyMy45LDM1LjVdXV0sW1tbMjYuMyw0MS43XSxbMjYuNCw0MS4zXSxbMjYuMSw0MC44XSxbMjUuNyw0MC45XSxbMjUuMiw0MV0sWzI0LjQsNDAuOV0sWzIzLjgsNDAuOF0sWzI0LDQwLjRdLFsyNC4xLDQwLjNdLFsyNCw0MC4xXSxbMjMuNCw0MC4zXSxbMjMuNywzOS45XSxbMjIuOCw0MC41XSxbMjIuNiw0MC41XSxbMjIuNyw0MF0sWzIzLjMsMzkuM10sWzIzLjIsMzkuM10sWzIzLDM5LjFdLFsyMi41LDM4LjldLFsyMy4yLDM4LjZdLFsyMy42LDM4LjVdLFsyNC4xLDM4LjJdLFsyNCwzNy43XSxbMjMuMywzOF0sWzIzLjIsMzcuNl0sWzIzLjQsMzcuNF0sWzIyLjksMzcuNV0sWzIyLjksMzcuMV0sWzIzLDM2LjddLFsyMi45LDM2LjZdLFsyMi41LDM2LjRdLFsyMiwzN10sWzIxLjcsMzYuOF0sWzIxLjcsMzcuNF0sWzIxLjEsMzcuOF0sWzIxLjYsMzguMV0sWzIyLjIsMzguMl0sWzIzLDM4XSxbMjMuMSwzOC4yXSxbMjIuNSwzOC40XSxbMjEuNywzOC40XSxbMjEuMywzOC4zXSxbMjAuOCwzOC44XSxbMjEuMSwzOV0sWzIwLjcsMzkuMV0sWzIwLjIsMzkuNl0sWzIwLjQsMzkuOV0sWzIwLjcsNDAuMl0sWzIxLDQwLjZdLFsyMS4yLDQwLjldLFsyMS45LDQxLjFdLFsyMi42LDQxLjFdLFsyMy4xLDQxLjNdLFsyMy43LDQxLjRdLFsyNC4yLDQxLjZdLFsyNC45LDQxLjRdLFsyNS42LDQxLjNdLFsyNi4yLDQxLjVdLFsyNi4zLDQxLjddXV0sW1tbMjMuNSwzOC45XSxbMjMuNSwzOC44XSxbMjMuNiwzOC44XSxbMjMuOCwzOC43XSxbMjMuOSwzOC43XSxbMjQsMzguN10sWzI0LjIsMzguNl0sWzI0LjIsMzguNF0sWzI0LjIsMzguMl0sWzI0LjMsMzguMl0sWzI0LjQsMzguMV0sWzI0LjUsMzguMV0sWzI0LjYsMzguMV0sWzI0LjYsMzhdLFsyNC41LDM4XSxbMjQuNCwzOF0sWzI0LjMsMzhdLFsyNC4xLDM4LjJdLFsyNC4xLDM4LjNdLFsyNCwzOC40XSxbMjQuMSwzOC40XSxbMjMuOSwzOC40XSxbMjMuOCwzOC40XSxbMjMuNywzOC40XSxbMjMuNiwzOC40XSxbMjMuNiwzOC41XSxbMjMuNiwzOC42XSxbMjMuNSwzOC42XSxbMjMuMywzOC43XSxbMjMuMiwzOC44XSxbMjMuMSwzOC45XSxbMjMuMSwzOC44XSxbMjIuOCwzOC44XSxbMjIuOCwzOC45XSxbMjIuOSwzOC45XSxbMjMuMSwzOV0sWzIzLjMsMzldLFsyMy40LDM5XSxbMjMuNCwzOC45XSxbMjMuNSwzOC45XV1dLFtbWzI2LjQsMzkuM10sWzI2LjUsMzkuMl0sWzI2LjYsMzkuMV0sWzI2LjYsMzldLFsyNi41LDM5XSxbMjYuNCwzOV0sWzI2LjMsMzldLFsyNi4yLDM5XSxbMjYuMSwzOV0sWzI2LjEsMzkuMV0sWzI2LjIsMzkuMV0sWzI2LjMsMzkuMl0sWzI2LjIsMzkuMl0sWzI2LDM5LjFdLFsyNS45LDM5LjFdLFsyNS45LDM5LjJdLFsyNS44LDM5LjJdLFsyNS45LDM5LjNdLFsyNiwzOS4zXSxbMjYuMiwzOS4zXSxbMjYuMiwzOS40XSxbMjYuMywzOS40XSxbMjYuNCwzOS4zXV1dLFtbWzI3LjgsMzUuOV0sWzI3LjcsMzUuOV0sWzI3LjcsMzZdLFsyNy43LDM2LjFdLFsyNy43LDM2LjJdLFsyNy44LDM2LjNdLFsyNy45LDM2LjNdLFsyOC4xLDM2LjRdLFsyOC4yLDM2LjRdLFsyOC4yLDM2LjVdLFsyOC4yLDM2LjNdLFsyOC4xLDM2LjJdLFsyOC4xLDM2LjFdLFsyOCwzNi4xXSxbMjgsMzZdLFsyNy45LDM2XSxbMjcuOSwzNS45XSxbMjcuOCwzNS45XV1dLFtbWzI2LDM4LjJdLFsyNiwzOC4xXSxbMjUuOSwzOC4yXSxbMjUuOSwzOC4zXSxbMjYsMzguM10sWzI2LDM4LjRdLFsyNS45LDM4LjVdLFsyNS44LDM4LjVdLFsyNS44LDM4LjZdLFsyNS45LDM4LjZdLFsyNiwzOC42XSxbMjYuMSwzOC42XSxbMjYuMiwzOC42XSxbMjYuMiwzOC41XSxbMjYuMSwzOC40XSxbMjYuMiwzOC4zXSxbMjYuMSwzOC4yXSxbMjYsMzguMl1dXSxbW1sxOS45LDM5LjhdLFsyMCwzOS44XSxbMTkuOSwzOS43XSxbMTkuOCwzOS43XSxbMTkuOCwzOS42XSxbMTkuOSwzOS41XSxbMjAsMzkuNF0sWzIwLjEsMzkuNF0sWzIwLjEsMzkuNV0sWzE5LjksMzkuNF0sWzE5LjgsMzkuNV0sWzE5LjcsMzkuNl0sWzE5LjcsMzkuN10sWzE5LjYsMzkuN10sWzE5LjYsMzkuOF0sWzE5LjcsMzkuOF0sWzE5LjgsMzkuOF0sWzE5LjksMzkuOF1dXV0sXCJ0eXBlXCI6XCJNdWx0aVBvbHlnb25cIn0sXCJ0eXBlXCI6XCJGZWF0dXJlXCIsXCJwcm9wZXJ0aWVzXCI6e1wiaXNvMlwiOlwiR1JcIixcImxuZ1wiOjIyLFwibGF0XCI6Mzl9fSx7XCJnZW9tZXRyeVwiOntcImNvb3JkaW5hdGVzXCI6W1tbWzE2LjYsNDYuNV0sWzE2LjksNDYuM10sWzE3LjIsNDYuMl0sWzE3LjQsNDZdLFsxNy43LDQ1LjldLFsxOC4yLDQ1LjhdLFsxOC42LDQ1LjhdLFsxOC45LDQ1LjhdLFsxOC45LDQ1LjVdLFsxOSw0NS40XSxbMTkuNCw0NS4yXSxbMTkuMSw0NC45XSxbMTguOCw0NV0sWzE4LjIsNDUuMV0sWzE3LjgsNDUuMV0sWzE3LjMsNDUuMl0sWzE3LDQ1LjJdLFsxNi42LDQ1LjJdLFsxNi4zLDQ1XSxbMTUuOSw0NS4yXSxbMTUuNyw0NC44XSxbMTYsNDQuNl0sWzE2LjEsNDQuMl0sWzE2LjQsNDQuMV0sWzE2LjcsNDMuOV0sWzE3LDQzLjZdLFsxNy4zLDQzLjVdLFsxNy42LDQzLjFdLFsxNy41LDQzXSxbMTcuMSw0My4yXSxbMTYuNyw0My40XSxbMTYuNCw0My42XSxbMTYuMSw0My41XSxbMTUuOSw0My43XSxbMTUuNSw0My45XSxbMTUuMiw0NC4yXSxbMTUuMyw0NC4zXSxbMTUuMiw0NC40XSxbMTQuOSw0NC44XSxbMTQuNyw0NS4xXSxbMTQuNCw0NS4zXSxbMTQuMiw0NS4yXSxbMTQsNDQuOV0sWzEzLjgsNDVdLFsxMy41LDQ1LjRdLFsxMy45LDQ1LjVdLFsxNC41LDQ1LjVdLFsxNC43LDQ1LjVdLFsxNS4xLDQ1LjVdLFsxNS40LDQ1LjddLFsxNS42LDQ1LjhdLFsxNS43LDQ2LjFdLFsxNS44LDQ2LjJdLFsxNi4zLDQ2LjRdLFsxNi41LDQ2LjVdLFsxNi42LDQ2LjVdXV0sW1tbMTcuMyw0M10sWzE3LjQsNDNdLFsxNy40LDQyLjldLFsxNy41LDQyLjldLFsxNy43LDQyLjldLFsxNy42LDQyLjldLFsxNy44LDQyLjldLFsxNy45LDQyLjhdLFsxOCw0Mi44XSxbMTguMiw0Mi43XSxbMTguMiw0Mi42XSxbMTguMyw0Mi42XSxbMTguNCw0Mi42XSxbMTguNSw0Mi42XSxbMTguNSw0Mi41XSxbMTguNSw0Mi40XSxbMTguNCw0Mi41XSxbMTguMSw0Mi43XSxbMTcuOCw0Mi44XSxbMTcuNyw0Mi44XSxbMTcuNiw0Mi44XSxbMTcuMiw0M10sWzE3LjEsNDNdLFsxNyw0M10sWzE3LjMsNDNdXV0sW1tbMTQuNSw0NC45XSxbMTQuNCw0NC45XSxbMTQuNSw0NC44XSxbMTQuNSw0NC43XSxbMTQuNSw0NC42XSxbMTQuNCw0NC43XSxbMTQuNCw0NC44XSxbMTQuMyw0NC44XSxbMTQuMyw0NC45XSxbMTQuNCw0NV0sWzE0LjMsNDUuMV0sWzE0LjMsNDUuMl0sWzE0LjQsNDUuMl0sWzE0LjQsNDUuMV0sWzE0LjUsNDVdLFsxNC41LDQ0LjldXV0sW1tbMTQuOCw0NC42XSxbMTQuOSw0NC42XSxbMTUsNDQuNl0sWzE1LDQ0LjVdLFsxNS4xLDQ0LjVdLFsxNC45LDQ0LjVdLFsxNS4xLDQ0LjRdLFsxNS4yLDQ0LjRdLFsxNS4yLDQ0LjNdLFsxNS4zLDQ0LjNdLFsxNS4xLDQ0LjNdLFsxNSw0NC40XSxbMTQuNyw0NC43XSxbMTQuOCw0NC43XSxbMTQuOCw0NC42XV1dLFtdLFtdLFtdXSxcInR5cGVcIjpcIk11bHRpUG9seWdvblwifSxcInR5cGVcIjpcIkZlYXR1cmVcIixcInByb3BlcnRpZXNcIjp7XCJpc28yXCI6XCJIUlwiLFwibG5nXCI6MTUuNSxcImxhdFwiOjQ1LjJ9fSx7XCJnZW9tZXRyeVwiOntcImNvb3JkaW5hdGVzXCI6W1tbMTguOCw0NS45XSxbMTguNCw0NS44XSxbMTgsNDUuOF0sWzE3LjYsNDUuOV0sWzE3LjMsNDZdLFsxNy4xLDQ2LjJdLFsxNi45LDQ2LjRdLFsxNi41LDQ2LjVdLFsxNi4zLDQ2LjldLFsxNi40LDQ3XSxbMTYuNSw0Ny4zXSxbMTYuNyw0Ny42XSxbMTYuNSw0Ny43XSxbMTYuOSw0Ny43XSxbMTcuMSw0Ny45XSxbMTcuNCw0OF0sWzE3LjgsNDcuN10sWzE4LjEsNDcuOF0sWzE4LjQsNDcuOF0sWzE4LjgsNDcuOF0sWzE4LjgsNDguMV0sWzE5LjIsNDguMV0sWzE5LjcsNDguMl0sWzIwLjEsNDguMl0sWzIwLjQsNDguNF0sWzIwLjgsNDguNl0sWzIxLjEsNDguNV0sWzIxLjUsNDguNV0sWzIxLjgsNDguM10sWzIyLjEsNDguNF0sWzIyLjQsNDguMl0sWzIyLjYsNDguMV0sWzIyLjksNDhdLFsyMi41LDQ3LjhdLFsyMi4yLDQ3LjZdLFsyMS45LDQ3LjRdLFsyMS43LDQ3LjFdLFsyMS41LDQ2LjddLFsyMS4yLDQ2LjRdLFsyMSw0Ni4zXSxbMjAuNyw0Ni4yXSxbMjAuNSw0Ni4yXSxbMjAuMiw0Ni4yXSxbMTkuOCw0Ni4yXSxbMTkuNSw0Ni4xXSxbMTksNDZdLFsxOC44LDQ1LjldXV0sXCJ0eXBlXCI6XCJQb2x5Z29uXCJ9LFwidHlwZVwiOlwiRmVhdHVyZVwiLFwicHJvcGVydGllc1wiOntcImlzbzJcIjpcIkhVXCIsXCJsbmdcIjoyMCxcImxhdFwiOjQ3fX0se1wiZ2VvbWV0cnlcIjp7XCJjb29yZGluYXRlc1wiOltbW1stNy40LDU1XSxbLTcuNyw1NC43XSxbLTgsNTQuNV0sWy03LjksNTQuM10sWy03LjYsNTQuMV0sWy03LjEsNTQuNF0sWy02LjcsNTQuMV0sWy02LjIsNTQuMV0sWy02LjQsNTMuOV0sWy02LjIsNTMuN10sWy02LjIsNTMuNF0sWy02LjEsNTIuOV0sWy02LjIsNTIuNl0sWy02LjMsNTIuM10sWy02LjgsNTIuMl0sWy03LjEsNTIuMV0sWy03LjUsNTJdLFstNy45LDUxLjldLFstOC4zLDUxLjldLFstOC41LDUxLjddLFstOSw1MS42XSxbLTkuNiw1MS41XSxbLTkuNyw1MS42XSxbLTkuNSw1MS44XSxbLTEwLjEsNTEuNl0sWy05LjcsNTEuOV0sWy0xMC40LDUxLjldLFstOS44LDUyLjFdLFstMTAuMSw1Mi4xXSxbLTEwLjUsNTIuMl0sWy05LjcsNTIuMl0sWy05LjcsNTIuNl0sWy05LDUyLjZdLFstOS4xLDUyLjZdLFstOS42LDUyLjddLFstOS4zLDUzLjJdLFstOC45LDUzLjFdLFstOS40LDUzLjJdLFstOS43LDUzLjRdLFstOS44LDUzLjRdLFstMTAsNTMuNl0sWy05LjksNTMuOF0sWy05LjcsNTMuOV0sWy05LjksNTQuMV0sWy0xMC4xLDU0LjNdLFstOS42LDU0LjNdLFstOS4xLDU0LjJdLFstOC42LDU0LjNdLFstOC4zLDU0LjVdLFstOC44LDU0LjddLFstOC40LDU0LjhdLFstOC41LDU1XSxbLTcuOCw1NS4yXSxbLTcuNSw1NS4xXSxbLTcuNSw1NV0sWy03LjQsNTUuM10sWy03LDU1LjJdLFstNy4zLDU1XSxbLTcuNCw1NV1dXSxbXSxbXSxbXSxbXV0sXCJ0eXBlXCI6XCJNdWx0aVBvbHlnb25cIn0sXCJ0eXBlXCI6XCJGZWF0dXJlXCIsXCJwcm9wZXJ0aWVzXCI6e1wiaXNvMlwiOlwiSUVcIixcImxuZ1wiOi04LFwibGF0XCI6NTN9fSx7XCJnZW9tZXRyeVwiOntcImNvb3JkaW5hdGVzXCI6W1tbLTE1LjEsNjYuMV0sWy0xNC42LDY1LjldLFstMTQuMyw2NS44XSxbLTEzLjksNjUuNl0sWy0xMy44LDY1LjJdLFstMTQsNjUuMV0sWy0xNCw2NC44XSxbLTE0LjUsNjQuNl0sWy0xNS4yLDY0LjNdLFstMTYuMiw2NF0sWy0xNy4xLDYzLjhdLFstMTcuOSw2My41XSxbLTE5LjMsNjMuNF0sWy0yMC41LDYzLjddLFstMjAuOCw2My44XSxbLTIxLjQsNjMuOV0sWy0yMi4zLDYzLjldLFstMjIuMyw2NF0sWy0yMS44LDY0LjNdLFstMjIuMSw2NC4zXSxbLTIyLjEsNjQuNV0sWy0yMi43LDY0LjhdLFstMjMuNiw2NC43XSxbLTIzLjgsNjQuOV0sWy0yMi40LDY1LjFdLFstMjEuOCw2NS4yXSxbLTIyLjIsNjUuM10sWy0yMi4yLDY1LjRdLFstMjIuOCw2NS41XSxbLTIzLjcsNjUuNF0sWy0yNC4zLDY1LjZdLFstMjQsNjUuN10sWy0yMy41LDY1LjZdLFstMjMuNiw2NS44XSxbLTIzLjcsNjZdLFstMjMuNiw2Ni4yXSxbLTIyLjcsNjYuMV0sWy0yMi41LDY1LjhdLFstMjIuNyw2Ni4zXSxbLTIzLjIsNjYuNF0sWy0yMiw2Ni4zXSxbLTIxLjYsNjUuOV0sWy0yMS42LDY1LjZdLFstMjEuMSw2NS41XSxbLTIwLjQsNjUuNV0sWy0yMC4xLDY2LjFdLFstMTkuNSw2NS43XSxbLTE5LjIsNjYuMV0sWy0xOC41LDY2LjFdLFstMTgsNjUuN10sWy0xOCw2Ni4yXSxbLTE3LjIsNjYuMl0sWy0xNi40LDY2LjJdLFstMTUuOSw2Ni40XSxbLTE1LjIsNjYuM10sWy0xNC45LDY2LjJdLFstMTUuMSw2Ni4xXV1dLFwidHlwZVwiOlwiUG9seWdvblwifSxcInR5cGVcIjpcIkZlYXR1cmVcIixcInByb3BlcnRpZXNcIjp7XCJpc28yXCI6XCJJU1wiLFwibG5nXCI6LTE4LFwibGF0XCI6NjV9fSx7XCJnZW9tZXRyeVwiOntcImNvb3JkaW5hdGVzXCI6W1tbWzEyLjEsNDddLFsxMi44LDQ2LjZdLFsxMy41LDQ2LjRdLFsxMy41LDQ2LjFdLFsxMy45LDQ1LjZdLFsxMy4xLDQ1LjhdLFsxMi40LDQ1LjRdLFsxMi40LDQ1XSxbMTIuMyw0NC41XSxbMTMsNDMuOF0sWzEzLjYsNDMuNV0sWzE0LjEsNDIuNV0sWzE0LjksNDJdLFsxNS43LDQxLjldLFsxNS45LDQxLjZdLFsxNyw0MS4xXSxbMTguMSw0MC41XSxbMTguNCwzOS44XSxbMTcuOSw0MC4zXSxbMTcuMyw0MC41XSxbMTYuNiw0MC4xXSxbMTYuOCwzOS42XSxbMTcuMSwzOC45XSxbMTYuNiwzOC42XSxbMTYuMSwzOC4xXSxbMTUuNiwzOF0sWzE1LjgsMzguNl0sWzE2LjIsMzldLFsxNS45LDM5LjVdLFsxNS42LDQwLjFdLFsxNC45LDQwLjJdLFsxNC43LDQwLjZdLFsxNC4yLDQwLjhdLFsxMy42LDQxLjNdLFsxMi45LDQxLjRdLFsxMi4yLDQxLjldLFsxMS42LDQyLjNdLFsxMS4yLDQyLjZdLFsxMC42LDQzXSxbMTAuMyw0My42XSxbOS40LDQ0LjNdLFs4LjQsNDQuMl0sWzcuNyw0My44XSxbNy42LDQ0LjJdLFs2LjksNDQuNV0sWzYuNiw0NS4xXSxbNy4yLDQ1LjRdLFs2LjksNDUuOF0sWzcuNiw0Nl0sWzguMiw0Ni4yXSxbOC40LDQ2LjJdLFs4LjksNDUuOV0sWzkuMiw0Ni4yXSxbOS41LDQ2LjNdLFsxMC4xLDQ2LjJdLFsxMC4zLDQ2LjZdLFsxMC42LDQ2LjldLFsxMS41LDQ3XSxbMTIuMSw0N11dXSxbW1sxNS41LDM4LjFdLFsxNS40LDM3LjldLFsxNS4yLDM3LjddLFsxNS4yLDM3LjVdLFsxNS4xLDM3LjRdLFsxNS4yLDM3LjJdLFsxNS4zLDM3LjFdLFsxNS4yLDM3XSxbMTUuMSwzNi45XSxbMTUuMSwzNi43XSxbMTUsMzYuN10sWzE0LjgsMzYuN10sWzE0LjYsMzYuOF0sWzE0LjQsMzYuOV0sWzE0LjMsMzddLFsxNC4xLDM3LjFdLFsxMy45LDM3LjFdLFsxMy42LDM3LjJdLFsxMy41LDM3LjNdLFsxMy4zLDM3LjRdLFsxMy4xLDM3LjVdLFsxMywzNy42XSxbMTIuOCwzNy42XSxbMTIuNSwzNy43XSxbMTIuNSwzNy44XSxbMTIuNSwzOF0sWzEyLjcsMzguMV0sWzEyLjksMzhdLFsxMywzOC4xXSxbMTMuMSwzOC4yXSxbMTMuNCwzOC4yXSxbMTMuNywzOF0sWzEzLjksMzhdLFsxNC4xLDM4XSxbMTQuMywzOF0sWzE0LjUsMzhdLFsxNC43LDM4LjFdLFsxNC45LDM4LjJdLFsxNS4xLDM4LjFdLFsxNS4zLDM4LjJdLFsxNS42LDM4LjNdLFsxNS42LDM4LjJdLFsxNS41LDM4LjFdXV0sW1tbOS41LDQxLjFdLFs5LjYsNDFdLFs5LjYsNDAuOV0sWzkuNyw0MC43XSxbOS43LDQwLjZdLFs5LjgsNDAuNV0sWzkuNyw0MC40XSxbOS42LDQwLjNdLFs5LjcsNDAuMV0sWzkuNywzOS45XSxbOS43LDM5LjddLFs5LjYsMzkuNV0sWzkuNiwzOS4zXSxbOS42LDM5LjFdLFs5LjQsMzkuMV0sWzkuMywzOS4yXSxbOSwzOS4xXSxbOC45LDM4LjldLFs4LjcsMzguOV0sWzguNiwzOV0sWzguNSwzOV0sWzguMywzOS4xXSxbOC40LDM5LjJdLFs4LjQsMzkuNF0sWzguNCwzOS42XSxbOC40LDM5LjhdLFs4LjUsMzkuN10sWzguNiwzOS45XSxbOC40LDM5LjldLFs4LjUsNDAuMV0sWzguNSw0MC4zXSxbOC4zLDQwLjZdLFs4LjEsNDAuNl0sWzguMSw0MC43XSxbOC4zLDQwLjldLFs4LjQsNDAuOF0sWzguNiw0MC44XSxbOC43LDQwLjldLFs4LjgsNDFdLFs5LDQxLjFdLFs5LjIsNDEuMl0sWzkuNSw0MS4xXV1dLFtdLFtdLFtdLFtdXSxcInR5cGVcIjpcIk11bHRpUG9seWdvblwifSxcInR5cGVcIjpcIkZlYXR1cmVcIixcInByb3BlcnRpZXNcIjp7XCJpc28yXCI6XCJJVFwiLFwibG5nXCI6MTIuOCxcImxhdFwiOjQyLjh9fSx7XCJnZW9tZXRyeVwiOntcImNvb3JkaW5hdGVzXCI6W10sXCJ0eXBlXCI6XCJQb2x5Z29uXCJ9LFwidHlwZVwiOlwiRmVhdHVyZVwiLFwicHJvcGVydGllc1wiOntcImlzbzJcIjpcIkxJXCIsXCJsbmdcIjo5LjUsXCJsYXRcIjo0Ny4zfX0se1wiZ2VvbWV0cnlcIjp7XCJjb29yZGluYXRlc1wiOltbW1syNSw1Ni4zXSxbMjUuMyw1Ni4yXSxbMjUuNyw1Ni4xXSxbMjYuMSw1NS45XSxbMjYuMyw1NS44XSxbMjYuNSw1NS43XSxbMjYuNSw1NS40XSxbMjYuOCw1NS4zXSxbMjYuNSw1NS4yXSxbMjYuMiw1NV0sWzI1LjksNTQuOV0sWzI1LjcsNTQuN10sWzI1LjcsNTQuNV0sWzI1LjUsNTQuM10sWzI1LjgsNTQuM10sWzI1LjYsNTQuMV0sWzI1LjYsNTQuMl0sWzI1LjIsNTQuMl0sWzI1LDU0LjJdLFsyNC44LDU0XSxbMjQuNSw1NF0sWzI0LjMsNTMuOV0sWzI0LjEsNTRdLFsyMy45LDUzLjldLFsyMy42LDUzLjldLFsyMy41LDU0LjFdLFsyMy4zLDU0LjJdLFsyMyw1NC40XSxbMjIuNyw1NC40XSxbMjIuOCw1NC44XSxbMjIuOCw1NC45XSxbMjIuNSw1NS4xXSxbMjIuMSw1NS4xXSxbMjEuNyw1NS4yXSxbMjEuMyw1NS4zXSxbMjEuMiw1NS40XSxbMjEuMiw1NS42XSxbMjEsNTUuOV0sWzIxLjEsNTYuMV0sWzIxLjMsNTYuMl0sWzIxLjcsNTYuM10sWzIyLjEsNTYuNF0sWzIyLjUsNTYuNF0sWzIyLjgsNTYuNF0sWzIzLDU2LjNdLFsyMy4yLDU2LjRdLFsyMy40LDU2LjNdLFsyMy42LDU2LjRdLFsyNCw1Ni4zXSxbMjQuMyw1Ni4zXSxbMjQuNiw1Ni4zXSxbMjQuOSw1Ni41XSxbMjUsNTYuM11dXSxbXV0sXCJ0eXBlXCI6XCJNdWx0aVBvbHlnb25cIn0sXCJ0eXBlXCI6XCJGZWF0dXJlXCIsXCJwcm9wZXJ0aWVzXCI6e1wiaXNvMlwiOlwiTFRcIixcImxuZ1wiOjI0LFwibGF0XCI6NTZ9fSx7XCJnZW9tZXRyeVwiOntcImNvb3JkaW5hdGVzXCI6W1tbNiw1MC4yXSxbNi4xLDUwLjFdLFs2LjEsNTBdLFs2LjIsNTBdLFs2LjIsNDkuOV0sWzYuMyw0OS45XSxbNi4zLDQ5LjhdLFs2LjQsNDkuOF0sWzYuNSw0OS44XSxbNi41LDQ5LjddLFs2LjQsNDkuN10sWzYuNCw0OS41XSxbNi4zLDQ5LjVdLFs2LjIsNDkuNV0sWzYuMSw0OS41XSxbNiw0OS40XSxbNS45LDQ5LjVdLFs1LjgsNDkuNV0sWzUuOCw0OS42XSxbNS45LDQ5LjZdLFs1LjksNDkuN10sWzUuOCw0OS44XSxbNS43LDQ5LjhdLFs1LjcsNDkuOV0sWzUuOCw1MF0sWzUuOSw1MC4xXSxbNiw1MC4yXV1dLFwidHlwZVwiOlwiUG9seWdvblwifSxcInR5cGVcIjpcIkZlYXR1cmVcIixcInByb3BlcnRpZXNcIjp7XCJpc28yXCI6XCJMVVwiLFwibG5nXCI6Ni4yLFwibGF0XCI6NDkuOH19LHtcImdlb21ldHJ5XCI6e1wiY29vcmRpbmF0ZXNcIjpbW1syMS4xLDU2LjRdLFsyMSw1Ni43XSxbMjEuMSw1Ni45XSxbMjEuNCw1N10sWzIxLjQsNTcuM10sWzIxLjYsNTcuNV0sWzIxLjgsNTcuNl0sWzIyLjEsNTcuNl0sWzIyLjYsNTcuOF0sWzIyLjcsNTcuNl0sWzIyLjksNTcuNF0sWzIzLjIsNTcuM10sWzIzLjMsNTcuMV0sWzIzLjcsNTddLFsyNCw1N10sWzI0LjQsNTcuM10sWzI0LjMsNTcuN10sWzI0LjQsNTcuOV0sWzI0LjYsNThdLFsyNSw1OC4xXSxbMjUuMiw1OF0sWzI1LjQsNThdLFsyNS44LDU3LjldLFsyNi4yLDU3LjddLFsyNi42LDU3LjVdLFsyNi45LDU3LjZdLFsyNy4zLDU3LjVdLFsyNy41LDU3LjRdLFsyNy44LDU3LjNdLFsyNy44LDU3LjJdLFsyNy44LDU2LjldLFsyNy45LDU2LjddLFsyOC4yLDU2LjRdLFsyOC4xLDU2LjJdLFsyNy43LDU2XSxbMjcuNiw1NS44XSxbMjcuMiw1NS44XSxbMjYuOSw1NS44XSxbMjYuNyw1NS43XSxbMjYuNCw1NS43XSxbMjYuMiw1NS44XSxbMjYsNTZdLFsyNS42LDU2LjJdLFsyNS4yLDU2LjJdLFsyNSw1Ni40XSxbMjQuNyw1Ni40XSxbMjQuNCw1Ni4zXSxbMjQuMSw1Ni4zXSxbMjMuNyw1Ni40XSxbMjMuNSw1Ni4zXSxbMjMuMyw1Ni40XSxbMjMuMSw1Ni4zXSxbMjIuOSw1Ni40XSxbMjIuNiw1Ni40XSxbMjIuMiw1Ni40XSxbMjEuOSw1Ni40XSxbMjEuNCw1Ni4yXSxbMjEuMiw1Ni4xXSxbMjEsNTYuMl0sWzIxLjEsNTYuNF1dXSxcInR5cGVcIjpcIlBvbHlnb25cIn0sXCJ0eXBlXCI6XCJGZWF0dXJlXCIsXCJwcm9wZXJ0aWVzXCI6e1wiaXNvMlwiOlwiTFZcIixcImxuZ1wiOjI1LFwibGF0XCI6NTd9fSx7XCJnZW9tZXRyeVwiOntcImNvb3JkaW5hdGVzXCI6W10sXCJ0eXBlXCI6XCJQb2x5Z29uXCJ9LFwidHlwZVwiOlwiRmVhdHVyZVwiLFwicHJvcGVydGllc1wiOntcImlzbzJcIjpcIk1DXCIsXCJsbmdcIjo3LjQsXCJsYXRcIjo0My43fX0se1wiZ2VvbWV0cnlcIjp7XCJjb29yZGluYXRlc1wiOltbWzI4LjEsNDYuOV0sWzI4LDQ3XSxbMjcuOSw0Ny4xXSxbMjcuNyw0Ny4zXSxbMjcuNiw0Ny40XSxbMjcuNCw0Ny42XSxbMjcuMyw0Ny43XSxbMjcuMiw0Ny45XSxbMjcsNDguMl0sWzI2LjcsNDguM10sWzI2LjgsNDguM10sWzI3LjIsNDguNF0sWzI3LjUsNDguNV0sWzI3LjgsNDguNF0sWzI3LjksNDguM10sWzI4LjEsNDguM10sWzI4LjIsNDguMl0sWzI4LjQsNDguMl0sWzI4LjUsNDguMV0sWzI4LjcsNDguMV0sWzI4LjksNDhdLFsyOS4xLDQ3LjldLFsyOS4yLDQ4XSxbMjkuMiw0Ny42XSxbMjkuMSw0Ny41XSxbMjkuMiw0Ny41XSxbMjkuMyw0Ny40XSxbMjkuNCw0Ny4zXSxbMjkuNiw0Ny4zXSxbMjkuNiw0N10sWzI5LjcsNDYuOV0sWzI5LjksNDYuOF0sWzMwLDQ2LjZdLFsyOS45LDQ2LjVdLFszMCw0Ni40XSxbMjkuOSw0Ni40XSxbMjkuOCw0Ni40XSxbMjkuNiw0Ni40XSxbMjkuNSw0Ni41XSxbMjkuMyw0Ni40XSxbMjkuMiw0Ni41XSxbMjguOSw0Ni40XSxbMjksNDYuMl0sWzI4LjksNDZdLFsyOC43LDQ2XSxbMjguOCw0NS45XSxbMjguNyw0NS44XSxbMjguNSw0NS43XSxbMjguNSw0NS41XSxbMjguMyw0NS41XSxbMjguMiw0NS40XSxbMjguMiw0NS42XSxbMjguMSw0NS45XSxbMjguMSw0Ni4xXSxbMjguMiw0Ni4zXSxbMjguMyw0Ni40XSxbMjguMiw0Ni43XSxbMjguMSw0Ni45XV1dLFwidHlwZVwiOlwiUG9seWdvblwifSxcInR5cGVcIjpcIkZlYXR1cmVcIixcInByb3BlcnRpZXNcIjp7XCJpc28yXCI6XCJNRFwiLFwibG5nXCI6MjksXCJsYXRcIjo0N319LHtcImdlb21ldHJ5XCI6e1wiY29vcmRpbmF0ZXNcIjpbW1sxOC41LDQyLjZdLFsxOC42LDQyLjddLFsxOC41LDQyLjhdLFsxOC42LDQzXSxbMTguNyw0My4xXSxbMTguNyw0My4zXSxbMTguOSw0My40XSxbMTksNDMuMl0sWzE5LjEsNDMuM10sWzE5LDQzLjVdLFsxOSw0My42XSxbMTkuMyw0My41XSxbMTkuNCw0My40XSxbMTkuNiw0My4zXSxbMTkuNyw0My4yXSxbMTkuOSw0My4xXSxbMjAsNDNdLFsyMC4yLDQzXSxbMjAuNCw0Mi44XSxbMjAuMSw0Mi44XSxbMjAsNDIuN10sWzIwLjEsNDIuNl0sWzE5LjksNDIuNV0sWzE5LjcsNDIuNV0sWzE5LjcsNDIuN10sWzE5LjYsNDIuNl0sWzE5LjUsNDIuNF0sWzE5LjQsNDIuMV0sWzE5LjMsNDEuOV0sWzE5LjIsNDEuOV0sWzE5LjEsNDJdLFsxOSw0Mi4xXSxbMTguOSw0Mi4zXSxbMTguNyw0Mi40XSxbMTguNSw0Mi40XSxbMTguNSw0Mi41XSxbMTguNSw0Mi42XV1dLFwidHlwZVwiOlwiUG9seWdvblwifSxcInR5cGVcIjpcIkZlYXR1cmVcIixcInByb3BlcnRpZXNcIjp7XCJpc28yXCI6XCJNRVwiLFwibG5nXCI6MTkuMyxcImxhdFwiOjQyLjV9fSx7XCJnZW9tZXRyeVwiOntcImNvb3JkaW5hdGVzXCI6W1tbMjAuOCw0MC45XSxbMjAuNyw0MS4xXSxbMjAuNiw0MS4yXSxbMjAuNSw0MS4zXSxbMjAuNiw0MS40XSxbMjAuNSw0MS42XSxbMjAuNSw0MS44XSxbMjAuNyw0MS45XSxbMjAuOCw0Ml0sWzIwLjksNDIuMV0sWzIxLjIsNDIuMV0sWzIxLjMsNDIuMl0sWzIxLjYsNDIuM10sWzIxLjgsNDIuM10sWzIyLDQyLjNdLFsyMi4yLDQyLjNdLFsyMi40LDQyLjNdLFsyMi41LDQyLjFdLFsyMi43LDQyLjFdLFsyMi45LDQxLjldLFsyMyw0MS44XSxbMjMsNDEuNl0sWzIzLDQxLjRdLFsyMi44LDQxLjNdLFsyMi43LDQxLjJdLFsyMi42LDQxLjFdLFsyMi40LDQxLjFdLFsyMi4zLDQxLjJdLFsyMiw0MS4xXSxbMjEuOSw0MV0sWzIxLjYsNDAuOV0sWzIxLjQsNDAuOV0sWzIxLjIsNDAuOV0sWzIxLDQwLjldLFsyMC44LDQwLjldXV0sXCJ0eXBlXCI6XCJQb2x5Z29uXCJ9LFwidHlwZVwiOlwiRmVhdHVyZVwiLFwicHJvcGVydGllc1wiOntcImlzbzJcIjpcIk1LXCIsXCJsbmdcIjoyMixcImxhdFwiOjQxLjh9fSx7XCJnZW9tZXRyeVwiOntcImNvb3JkaW5hdGVzXCI6W1tdLFtdXSxcInR5cGVcIjpcIk11bHRpUG9seWdvblwifSxcInR5cGVcIjpcIkZlYXR1cmVcIixcInByb3BlcnRpZXNcIjp7XCJpc28yXCI6XCJNVFwiLFwibG5nXCI6MTQuNixcImxhdFwiOjM1Ljh9fSx7XCJnZW9tZXRyeVwiOntcImNvb3JkaW5hdGVzXCI6W1tbWzYuOSw1My40XSxbNy4yLDUzXSxbNy4xLDUyLjddLFs2LjksNTIuN10sWzYuNyw1Mi41XSxbNyw1Mi41XSxbNy4xLDUyLjJdLFs2LjgsNTIuMV0sWzYuOCw1MS45XSxbNi40LDUxLjhdLFs2LDUxLjddLFs2LjIsNTEuNF0sWzYsNTEuMV0sWzYuMSw1MC45XSxbNS45LDUwLjhdLFs1LjYsNTAuOV0sWzUuOSw1MS4yXSxbNS41LDUxLjNdLFs1LjEsNTEuM10sWzUsNTEuNF0sWzQuNyw1MS41XSxbNC41LDUxLjVdLFs0LjMsNTEuNF0sWzMuOCw1MS40XSxbMy41LDUxLjZdLFszLjksNTEuNl0sWzQuMSw1MS41XSxbNC4xLDUxLjZdLFszLjcsNTEuN10sWzQuMSw1MS44XSxbNCw1Ml0sWzQuNSw1Mi4zXSxbNC43LDUyLjVdLFs1LDUyLjRdLFs1LjQsNTIuM10sWzUuNiw1Mi40XSxbNS45LDUyLjVdLFs1LjYsNTIuN10sWzUuNiw1Mi45XSxbNS4zLDUzLjFdLFs1LjEsNTIuOF0sWzUuMiw1Mi43XSxbNS4xLDUyLjVdLFs0LjcsNTIuOF0sWzQuOCw1Mi45XSxbNS41LDUzLjJdLFs2LjEsNTMuNF0sWzYuNyw1My41XSxbNi45LDUzLjRdXV0sW1tbMy44LDUxLjNdLFszLjksNTEuM10sWzQsNTEuNF0sWzQuMiw1MS40XSxbNC4yLDUxLjNdLFs0LjEsNTEuM10sWzQsNTEuMl0sWzMuOSw1MS4yXSxbMy44LDUxLjJdLFszLjcsNTEuM10sWzMuNiw1MS4zXSxbMy41LDUxLjNdLFszLjUsNTEuMl0sWzMuNCw1MS4yXSxbMy40LDUxLjNdLFszLjQsNTEuNF0sWzMuNSw1MS40XSxbMy42LDUxLjRdLFszLjcsNTEuNF0sWzMuOCw1MS4zXV1dLFtbWzUuOCw1Mi40XSxbNS43LDUyLjRdLFs1LjYsNTIuNF0sWzUuNSw1Mi40XSxbNS41LDUyLjNdLFs1LjYsNTIuM10sWzUuNCw1Mi4zXSxbNS4zLDUyLjNdLFs1LjIsNTIuM10sWzUuMSw1Mi4zXSxbNS4xLDUyLjRdLFs1LjIsNTIuNF0sWzUuMyw1Mi41XSxbNS40LDUyLjVdLFs1LjUsNTIuNV0sWzUuNiw1Mi42XSxbNS44LDUyLjZdLFs1LjksNTIuNV0sWzUuOCw1Mi41XSxbNS44LDUyLjRdXV0sW10sW10sW10sW11dLFwidHlwZVwiOlwiTXVsdGlQb2x5Z29uXCJ9LFwidHlwZVwiOlwiRmVhdHVyZVwiLFwicHJvcGVydGllc1wiOntcImlzbzJcIjpcIk5MXCIsXCJsbmdcIjo1LjgsXCJsYXRcIjo1Mi41fX0se1wiZ2VvbWV0cnlcIjp7XCJjb29yZGluYXRlc1wiOltbW1s1LjMsNjEuNl0sWzUuMiw2MS45XSxbNi4zLDYyLjRdLFs2LjQsNjIuNV0sWzcuNiw2Mi44XSxbOC4zLDYyLjhdLFs4LjgsNjMuM10sWzEwLjYsNjMuNF0sWzExLDY0XSxbOS42LDYzLjddLFsxMC45LDY0LjZdLFsxMS4yLDY0LjddLFsxMi40LDY1LjNdLFsxMi45LDY2LjFdLFsxMyw2Ni40XSxbMTMuOCw2Ni45XSxbMTUuNSw2Ny4yXSxbMTUuNSw2Ny40XSxbMTUsNjcuOF0sWzE2LDY4LjJdLFsxNi40LDY4LjNdLFsxNy4xLDY4LjVdLFsxNy43LDY5LjFdLFsxOS4yLDY5LjNdLFsxOS43LDY5LjRdLFsyMC44LDY5LjhdLFsyMS41LDcwLjFdLFsyMi43LDcwLjFdLFsyNC4yLDcwLjZdLFsyNS4zLDcwLjldLFsyNS4zLDcwLjFdLFsyNi42LDcwLjRdLFsyNy43LDcxLjFdLFsyOC4zLDcwLjddLFsyOS4zLDcwLjddLFszMC43LDcwLjNdLFsyOS43LDY5LjldLFszMC45LDY5LjVdLFsyOS4xLDY5LjRdLFsyNi4yLDY5LjhdLFsyNC40LDY4LjddLFsyMS43LDY5LjNdLFsxOS45LDY4LjNdLFsxNi4xLDY3LjRdLFsxNC4zLDY1LjFdLFsxMi4zLDYzLjddLFsxMi44LDYxLjRdLFsxMS45LDU5LjhdLFsxMC42LDU5LjldLFsxMCw1OV0sWzcuMiw1OF0sWzUuNiw1OV0sWzYuNSw1OS4zXSxbNS4yLDU5LjVdLFs2LjIsNjAuM10sWzUuNyw2MC40XSxbNSw2MC44XSxbNi4zLDYxLjFdLFs2LjcsNjEuNF0sWzUuMyw2MS42XV1dLFtbWzE2LDY4LjhdLFsxNiw2OC43XSxbMTUuOSw2OC43XSxbMTUuOSw2OC42XSxbMTUuOCw2OC42XSxbMTUuNyw2OC41XSxbMTUuOCw2OC41XSxbMTYuMSw2OC43XSxbMTYuMSw2OC44XSxbMTYuMiw2OC45XSxbMTYuNCw2OC45XSxbMTYuNCw2OC44XSxbMTYuNSw2OC44XSxbMTYuNiw2OC43XSxbMTYuNiw2OC42XSxbMTYuNSw2OC42XSxbMTYuNCw2OC42XSxbMTYuMyw2OC42XSxbMTYuMiw2OC41XSxbMTYuMSw2OC41XSxbMTYsNjguNV0sWzE2LDY4LjRdLFsxNS45LDY4LjRdLFsxNS44LDY4LjRdLFsxNS43LDY4LjNdLFsxNS42LDY4LjNdLFsxNS41LDY4LjNdLFsxNS40LDY4LjNdLFsxNS4zLDY4LjNdLFsxNS40LDY4LjRdLFsxNS41LDY4LjRdLFsxNS42LDY4LjVdLFsxNS41LDY4LjVdLFsxNS4zLDY4LjRdLFsxNS4yLDY4LjNdLFsxNS4xLDY4LjNdLFsxNSw2OC4yXSxbMTUsNjguM10sWzE1LjEsNjguNF0sWzE1LjIsNjguNV0sWzE1LjMsNjguNV0sWzE1LjIsNjguNl0sWzE1LjMsNjguNl0sWzE1LjQsNjguNl0sWzE1LjUsNjguN10sWzE1LjQsNjguN10sWzE1LjYsNjguN10sWzE1LjcsNjguN10sWzE1LjUsNjguOF0sWzE1LjYsNjguOV0sWzE1LjcsNjldLFsxNS45LDY5XSxbMTUuOSw2OC45XSxbMTUuOSw2OC44XSxbMTYsNjguOF1dXSxbW1sxNy42LDY5LjVdLFsxNy43LDY5LjVdLFsxNy43LDY5LjZdLFsxNy44LDY5LjZdLFsxNy45LDY5LjZdLFsxOCw2OS41XSxbMTguMSw2OS40XSxbMTguMSw2OS4zXSxbMTgsNjkuM10sWzE3LjksNjkuM10sWzE3LjksNjkuMl0sWzE4LDY5LjJdLFsxNy42LDY5LjJdLFsxNy41LDY5LjJdLFsxNy40LDY5LjJdLFsxNy4yLDY5LjFdLFsxNy4yLDY5XSxbMTcuMSw2OV0sWzE3LDY5XSxbMTcuMSw2OS4xXSxbMTcsNjkuMV0sWzE2LjksNjkuMV0sWzE2LjgsNjldLFsxNi44LDY5LjFdLFsxNy4xLDY5LjJdLFsxNy4yLDY5LjJdLFsxNyw2OS4yXSxbMTYuOSw2OS4yXSxbMTcuMSw2OS4zXSxbMTcsNjkuM10sWzE2LjksNjkuM10sWzE3LDY5LjRdLFsxNi45LDY5LjRdLFsxNy4yLDY5LjRdLFsxNy4zLDY5LjRdLFsxNy40LDY5LjRdLFsxNy41LDY5LjRdLFsxNy4yLDY5LjVdLFsxNy4zLDY5LjVdLFsxNy40LDY5LjVdLFsxNy41LDY5LjVdLFsxNy41LDY5LjZdLFsxNy42LDY5LjZdLFsxNy42LDY5LjVdXV0sW1tbMjMuNSw3MC44XSxbMjMuNCw3MC43XSxbMjMuMyw3MC43XSxbMjMuMiw3MC43XSxbMjMuMSw3MC42XSxbMjIuOSw3MC41XSxbMjIuOCw3MC41XSxbMjIuOCw3MC42XSxbMjIuNyw3MC42XSxbMjIuNiw3MC42XSxbMjIuNiw3MC41XSxbMjIuNSw3MC41XSxbMjIuMyw3MC41XSxbMjIuMiw3MC41XSxbMjIuMSw3MC41XSxbMjIuMyw3MC42XSxbMjIuMiw3MC42XSxbMjIuMSw3MC42XSxbMjIsNzAuNl0sWzIxLjksNzAuNl0sWzIyLDcwLjddLFsyMi4xLDcwLjddLFsyMi4zLDcwLjddLFsyMi40LDcwLjddLFsyMi41LDcwLjddLFsyMi42LDcwLjddLFsyMi43LDcwLjddLFsyMi44LDcwLjddLFsyMi44LDcwLjhdLFsyMi45LDcwLjddLFsyMyw3MC43XSxbMjMuMSw3MC43XSxbMjMuMiw3MC44XSxbMjMuMyw3MC44XSxbMjMuMyw3MC45XSxbMjMuNCw3MC45XSxbMjMuNCw3MC44XSxbMjMuNSw3MC44XV1dLFtbWzE1LjQsNjguOF0sWzE1LjQsNjguN10sWzE1LjMsNjguNl0sWzE1LjEsNjguNl0sWzE1LDY4LjZdLFsxNC45LDY4LjZdLFsxNC44LDY4LjZdLFsxNC45LDY4LjddLFsxNS4xLDY4LjddLFsxNS4yLDY4LjddLFsxNS4xLDY4LjhdLFsxNSw2OC44XSxbMTUsNjguN10sWzE0LjgsNjguN10sWzE0LjcsNjguN10sWzE0LjUsNjguNl0sWzE0LjQsNjguNl0sWzE0LjQsNjguN10sWzE0LjQsNjguOF0sWzE0LjUsNjguOF0sWzE0LjYsNjguOF0sWzE0LjcsNjguOF0sWzE0LjksNjguOF0sWzE0LjksNjguOV0sWzE1LDY4LjldLFsxNS4xLDY4LjldLFsxNS4yLDY4LjhdLFsxNSw2OV0sWzE1LjEsNjldLFsxNS4yLDY5XSxbMTUuMiw2OC45XSxbMTUuMyw2OC45XSxbMTUuNCw2OC44XV1dLFtbWzE4LjksNjkuN10sWzE4LjgsNjkuN10sWzE4LjgsNjkuNl0sWzE4LjcsNjkuNl0sWzE4LjYsNjkuNl0sWzE4LjUsNjkuNl0sWzE4LjQsNjkuNV0sWzE4LjMsNjkuNV0sWzE4LjIsNjkuNV0sWzE4LDY5LjZdLFsxOC4xLDY5LjZdLFsxOC4yLDY5LjZdLFsxOC4zLDY5LjZdLFsxOC4yLDY5LjddLFsxOC4zLDY5LjddLFsxOC40LDY5LjddLFsxOC42LDY5LjddLFsxOC41LDY5LjddLFsxOC4zLDY5LjhdLFsxOC40LDY5LjhdLFsxOC41LDY5LjhdLFsxOC42LDY5LjhdLFsxOC43LDY5LjddLFsxOC44LDY5LjhdLFsxOC43LDY5LjhdLFsxOC43LDY5LjldLFsxOC44LDY5LjldLFsxOSw2OS44XSxbMTkuMSw2OS44XSxbMTksNjkuN10sWzE4LjksNjkuN11dXSxbW1sxOS4zLDcwXSxbMTkuNCw3MF0sWzE5LjUsNzBdLFsxOS41LDcwLjFdLFsxOS42LDcwXSxbMTkuNyw3MF0sWzE5LjUsNjkuOV0sWzE5LjQsNjkuOF0sWzE5LjMsNjkuOF0sWzE5LjIsNjkuOF0sWzE5LjEsNjkuOF0sWzE5LDY5LjhdLFsxOSw2OS45XSxbMTguOSw2OS45XSxbMTguOCw2OS45XSxbMTguNyw2OS45XSxbMTguOCw3MF0sWzE4LjksNzBdLFsxOSw3MF0sWzE5LjEsNzBdLFsxOS4xLDcwLjFdLFsxOS4yLDcwLjFdLFsxOS4zLDcwLjFdLFsxOS4zLDcwXV1dXSxcInR5cGVcIjpcIk11bHRpUG9seWdvblwifSxcInR5cGVcIjpcIkZlYXR1cmVcIixcInByb3BlcnRpZXNcIjp7XCJpc28yXCI6XCJOT1wiLFwibG5nXCI6MTAsXCJsYXRcIjo2Mn19LHtcImdlb21ldHJ5XCI6e1wiY29vcmRpbmF0ZXNcIjpbW1sxOC45LDQ5LjVdLFsxOC41LDQ5LjldLFsxNy45LDUwXSxbMTcuOCw1MC4yXSxbMTcuMiw1MC4zXSxbMTcsNTAuMl0sWzE2LjYsNTAuMl0sWzE2LjIsNTAuNF0sWzE2LjEsNTAuN10sWzE1LjUsNTAuOF0sWzE1LDUwLjldLFsxNSw1MS40XSxbMTQuOCw1MS42XSxbMTQuOCw1Mi4xXSxbMTQuNiw1Mi41XSxbMTQuMiw1Mi44XSxbMTQuNCw1My4zXSxbMTQuNiw1My44XSxbMTQuMiw1My45XSxbMTUsNTQuMV0sWzE1LjgsNTQuMl0sWzE2LjMsNTQuNF0sWzE2LjksNTQuNl0sWzE3LjQsNTQuN10sWzE3LjksNTQuOF0sWzE4LjYsNTQuN10sWzE4LjUsNTQuNl0sWzE4LjksNTQuNF0sWzE5LjQsNTQuNF0sWzE5LjIsNTQuM10sWzE5LjksNTQuNF0sWzIwLjcsNTQuNF0sWzIxLjUsNTQuM10sWzIyLjMsNTQuM10sWzIyLjksNTQuNF0sWzIzLjUsNTQuMl0sWzIzLjYsNTMuNl0sWzIzLjksNTIuOF0sWzIzLjQsNTIuNV0sWzIzLjYsNTIuMV0sWzIzLjYsNTEuN10sWzIzLjcsNTEuMl0sWzI0LjEsNTAuOV0sWzI0LDUwLjRdLFsyMy41LDUwLjJdLFsyMi43LDQ5LjZdLFsyMi45LDQ5LjFdLFsyMi4zLDQ5LjFdLFsyMS41LDQ5LjRdLFsyMC45LDQ5LjNdLFsyMC4yLDQ5LjNdLFsxOS44LDQ5LjNdLFsxOS40LDQ5LjZdLFsxOC45LDQ5LjVdXV0sXCJ0eXBlXCI6XCJQb2x5Z29uXCJ9LFwidHlwZVwiOlwiRmVhdHVyZVwiLFwicHJvcGVydGllc1wiOntcImlzbzJcIjpcIlBMXCIsXCJsbmdcIjoyMCxcImxhdFwiOjUyfX0se1wiZ2VvbWV0cnlcIjp7XCJjb29yZGluYXRlc1wiOltbW1stOC4yLDQxLjldLFstNy45LDQxLjldLFstNy42LDQxLjhdLFstNy4yLDQxLjldLFstNi45LDQyXSxbLTYuNiw0Ml0sWy02LjUsNDEuN10sWy02LjIsNDEuNl0sWy02LjQsNDEuM10sWy02LjgsNDEuMV0sWy02LjgsNDAuOV0sWy02LjgsNDAuNF0sWy03LDQwLjFdLFstNy4xLDM5LjddLFstNy40LDM5LjZdLFstNy4zLDM5LjRdLFstNywzOS4xXSxbLTcuMiwzOC44XSxbLTcuMiwzOC4zXSxbLTcsMzguMV0sWy03LjMsMzhdLFstNy40LDM3LjddLFstNy40LDM3LjNdLFstNy42LDM3LjFdLFstOC4xLDM3LjFdLFstOC43LDM3LjFdLFstOSwzNy4xXSxbLTguOCwzNy40XSxbLTguOCwzNy45XSxbLTguOCwzOC4zXSxbLTguOSwzOC41XSxbLTkuMiwzOC41XSxbLTkuMSwzOC42XSxbLTksMzguOV0sWy05LjQsMzguN10sWy05LjQsMzguOV0sWy05LjMsMzkuMl0sWy05LjMsMzkuNF0sWy05LDM5LjddLFstOC45LDQwLjFdLFstOC44LDQwLjVdLFstOC43LDQwLjhdLFstOC43LDQxLjJdLFstOC45LDQxLjddLFstOC43LDQyXSxbLTguNCw0Mi4xXSxbLTguMSw0Mi4xXSxbLTguMiw0MS45XV1dLFtbWy0yNS42LDM3LjhdLFstMjUuNSwzNy44XSxbLTI1LjQsMzcuOF0sWy0yNS40LDM3LjldLFstMjUuMywzNy45XSxbLTI1LjIsMzcuOV0sWy0yNS4xLDM3LjhdLFstMjUuMiwzNy43XSxbLTI1LjMsMzcuN10sWy0yNS41LDM3LjddLFstMjUuNiwzNy43XSxbLTI1LjcsMzcuN10sWy0yNS43LDM3LjhdLFstMjUuOCwzNy44XSxbLTI1LjksMzcuOF0sWy0yNS45LDM3LjldLFstMjUuOCwzNy45XSxbLTI1LjcsMzcuOV0sWy0yNS42LDM3LjhdXV0sW10sW10sW10sW10sW11dLFwidHlwZVwiOlwiTXVsdGlQb2x5Z29uXCJ9LFwidHlwZVwiOlwiRmVhdHVyZVwiLFwicHJvcGVydGllc1wiOntcImlzbzJcIjpcIlBUXCIsXCJsbmdcIjotOCxcImxhdFwiOjM5LjV9fSx7XCJnZW9tZXRyeVwiOntcImNvb3JkaW5hdGVzXCI6W1tbMjAuNyw0Ni4yXSxbMjEsNDYuMl0sWzIxLjMsNDYuNl0sWzIxLjcsNDddLFsyMS45LDQ3LjRdLFsyMi4yLDQ3LjddLFsyMi43LDQ3LjhdLFsyMy4xLDQ4LjFdLFsyMy41LDQ4XSxbMjQuMiw0Ny45XSxbMjQuNiw0Ny45XSxbMjQuOSw0Ny43XSxbMjUuMiw0Ny45XSxbMjUuOCw0OF0sWzI2LjMsNDguMV0sWzI2LjcsNDguM10sWzI3LjIsNDcuOF0sWzI3LjYsNDcuNF0sWzI3LjksNDddLFsyOC4yLDQ2LjddLFsyOC4xLDQ2LjJdLFsyOC4yLDQ1LjZdLFsyOC4zLDQ1LjNdLFsyOC44LDQ1LjNdLFsyOS41LDQ1LjRdLFsyOS42LDQ1LjJdLFsyOS41LDQ0LjhdLFsyOSw0NC44XSxbMjguOSw0NV0sWzI4LjgsNDQuNl0sWzI4LjksNDQuNV0sWzI4LjYsNDQuMl0sWzI4LjYsNDMuN10sWzI4LjEsNDMuOF0sWzI3LjgsNDRdLFsyNy4zLDQ0LjFdLFsyNi44LDQ0LjFdLFsyNi4xLDQ0XSxbMjUuNyw0My43XSxbMjUuMyw0My43XSxbMjQuNyw0My43XSxbMjQuNCw0My43XSxbMjMuOCw0My44XSxbMjMuMyw0My44XSxbMjIuOSw0My45XSxbMjIuOSw0NC4xXSxbMjIuNSw0NC40XSxbMjIuOCw0NC41XSxbMjIuMyw0NC43XSxbMjEuOSw0NC42XSxbMjEuNSw0NC44XSxbMjEuNSw0NV0sWzIxLjQsNDUuMl0sWzIwLjgsNDUuN10sWzIwLjUsNDUuOV0sWzIwLjYsNDYuMl0sWzIwLjcsNDYuMl1dXSxcInR5cGVcIjpcIlBvbHlnb25cIn0sXCJ0eXBlXCI6XCJGZWF0dXJlXCIsXCJwcm9wZXJ0aWVzXCI6e1wiaXNvMlwiOlwiUk9cIixcImxuZ1wiOjI1LFwibGF0XCI6NDZ9fSx7XCJnZW9tZXRyeVwiOntcImNvb3JkaW5hdGVzXCI6W1tbMjAuMSw0Mi42XSxbMjAuMSw0Mi44XSxbMjAuMiw0M10sWzE5LjksNDMuMV0sWzE5LjYsNDMuM10sWzE5LjMsNDMuNV0sWzE5LjUsNDMuN10sWzE5LjMsNDRdLFsxOS42LDQ0XSxbMTkuMiw0NC4zXSxbMTkuMiw0NC42XSxbMTkuMyw0NC45XSxbMTkuMSw0NV0sWzE5LjQsNDUuMl0sWzE5LDQ1LjVdLFsxOC45LDQ1LjZdLFsxOC44LDQ1LjldLFsxOS4yLDQ2XSxbMTkuNyw0Ni4yXSxbMjAsNDYuMl0sWzIwLjMsNDYuMV0sWzIwLjcsNDUuOF0sWzIwLjgsNDUuNl0sWzIxLjQsNDUuMl0sWzIxLjQsNDVdLFsyMS40LDQ0LjldLFsyMS42LDQ0LjddLFsyMiw0NC42XSxbMjIuMyw0NC43XSxbMjIuNyw0NC42XSxbMjIuNiw0NC41XSxbMjIuNiw0NC4zXSxbMjIuNiw0NC4xXSxbMjIuNCw0My43XSxbMjIuNyw0My40XSxbMjMsNDMuMl0sWzIyLjUsNDIuOV0sWzIyLjUsNDIuNV0sWzIyLjMsNDIuNF0sWzIxLjksNDIuM10sWzIxLjUsNDIuM10sWzIxLjEsNDIuMl0sWzIwLjgsNDEuOV0sWzIwLjUsNDIuMl0sWzIwLjIsNDIuM10sWzIwLjEsNDIuNl1dXSxcInR5cGVcIjpcIlBvbHlnb25cIn0sXCJ0eXBlXCI6XCJGZWF0dXJlXCIsXCJwcm9wZXJ0aWVzXCI6e1wiaXNvMlwiOlwiUlNcIixcImxuZ1wiOjIxLFwibGF0XCI6NDR9fSx7XCJnZW9tZXRyeVwiOntcImNvb3JkaW5hdGVzXCI6W1tbWzEwNC4zLDc3LjddLFsxMTAuOSw3Ni44XSxbMTEwLDc0LjRdLFsxMTAuNiw3My44XSxbMTE3LDczLjZdLFsxMjcuMyw3MS40XSxbMTM1LjMsNzEuNl0sWzE0My4xLDcyLjddLFsxNDguNSw3Mi4zXSxbMTU5LDcwLjldLFsxNjguMiw2OS41XSxbMTc4LjIsNjkuNF0sWzE3Nyw2NC43XSxbMTczLjQsNjEuNl0sWzE2NC4zLDYwLjFdLFsxNjEuNyw1NS42XSxbMTU1LjksNTRdLFsxNjQsNjEuNF0sWzE1OS44LDYxLjNdLFsxNTIuNiw1OV0sWzE0NC41LDU5LjRdLFsxMzYuNyw1My44XSxbMTQxLjMsNTIuM10sWzEzNSw0My41XSxbMTMzLjUsNDUuNl0sWzEyNy41LDUwLjJdLFsxMjAuNSw1MS45XSxbMTA5LjYsNDkuMl0sWzk4LjcsNTEuOF0sWzg5LjcsNDkuOF0sWzgwLjMsNTAuOV0sWzcxLjEsNTQuM10sWzYxLjQsNTQuMV0sWzU3LjksNTEuMV0sWzQ4LjcsNTAuNV0sWzQ3LjUsNDUuNV0sWzQzLjEsNDNdLFszOC40LDQ2LjddLFszNy44LDUwLjFdLFszMS45LDU0XSxbMjkuNSw2MF0sWzI5LjYsNjUuM10sWzMzLDY5LjVdLFszOC42LDY2LjFdLFszNC42LDY1LjJdLFszOS43LDY1LjVdLFs0Ni41LDY4XSxbNTIuMyw2OC4zXSxbNTksNjguOV0sWzY3LjMsNjguN10sWzcwLjIsNzIuOV0sWzcyLjMsNjcuM10sWzc0LjUsNjguN10sWzc0LDY5LjFdLFs3OCw3MV0sWzgyLjksNzEuN10sWzgwLjUsNzMuMl0sWzg2LjUsNzQuM10sWzkzLjIsNzUuOF0sWzk5LjEsNzUuNV0sWzEwNC4zLDc3LjddXV0sW1tbNjguMyw3N10sWzY4LjksNzYuNl0sWzY3LjcsNzYuMl0sWzY2LjcsNzYuMV0sWzY1LjIsNzUuOF0sWzY0LjIsNzUuN10sWzYzLjIsNzUuNl0sWzYyLjMsNzUuNF0sWzYxLjQsNzUuMl0sWzYwLjcsNzUuMV0sWzYwLjUsNzVdLFs2MC41LDc0LjldLFs2MC4xLDc0LjddLFs1OS45LDc0LjZdLFs1OS4yLDc0LjZdLFs1OC42LDc0LjVdLFs1OC43LDc0LjJdLFs1OC4yLDc0LjFdLFs1Ny42LDc0LjJdLFs1Ny45LDczLjldLFs1Ny4zLDczLjhdLFs1Nyw3My44XSxbNTcsNzMuNl0sWzU3LDczLjRdLFs1Ni42LDczLjNdLFs1NS45LDczLjRdLFs1NSw3My40XSxbNTQuMSw3My40XSxbNTQuNSw3My42XSxbNTQuNCw3My43XSxbNTMuNiw3My43XSxbNTQuMiw3My45XSxbNTQuOCw3NC4xXSxbNTUuOSw3NC4xXSxbNTUuNyw3NC4zXSxbNTYuMyw3NC41XSxbNTUuOSw3NC43XSxbNTcsNzQuN10sWzU1LjksNzQuOF0sWzU2LjQsNzVdLFs1NS44LDc1LjFdLFs1Ni4zLDc1LjJdLFs1Ni45LDc1LjNdLFs1Ny41LDc1LjNdLFs1OCw3NS42XSxbNTguNSw3NS44XSxbNTkuNCw3NS45XSxbNjAuMyw3Nl0sWzYwLjUsNzZdLFs2MC45LDc2LjJdLFs2MS44LDc2LjNdLFs2Mi44LDc2LjNdLFs2My43LDc2LjNdLFs2NC44LDc2LjVdLFs2NS41LDc2LjZdLFs2NS45LDc2LjddLFs2Ni43LDc2LjldLFs2Ny42LDc3XSxbNjguMyw3N11dXSxbW1s5Ny42LDgwLjJdLFs5OCw4MC4xXSxbOTcuNiw3OS44XSxbOTcuMyw3OS43XSxbOTcuNyw3OS44XSxbOTcuOSw3OS45XSxbOTguMiw3OS45XSxbOTguNiw4MF0sWzk4LjUsODAuMV0sWzk4LjgsODBdLFs5OS4xLDgwXSxbOTkuNSw3OS45XSxbOTkuOCw3OS45XSxbMTAwLDc5LjddLFs5OS43LDc5LjZdLFs5OS43LDc5LjNdLFs5OS40LDc5LjNdLFs5OS4xLDc5LjNdLFs5OS42LDc5LjJdLFs5OS43LDc5LjFdLFs5OS45LDc5XSxbOTkuNyw3OC45XSxbOTkuNCw3OC44XSxbOTksNzguOF0sWzk4LjYsNzguOF0sWzk4LDc4LjhdLFs5Ny42LDc4LjhdLFs5Ny4yLDc4LjldLFs5Ni45LDc5XSxbOTYuMyw3OV0sWzk2LjEsNzldLFs5NS43LDc5XSxbOTUuNyw3OS4xXSxbOTUuMyw3OS4xXSxbOTUsNzldLFs5NC42LDc5LjJdLFs5NC4zLDc5LjJdLFs5NC40LDc5LjRdLFs5NC4yLDc5LjVdLFs5NC4xLDc5LjRdLFs5My43LDc5LjVdLFs5My44LDc5LjZdLFs5My41LDc5LjVdLFs5My4yLDc5LjRdLFs5My4yLDc5LjVdLFs5Mi45LDc5LjZdLFs5My44LDc5LjddLFs5NC4zLDc5LjhdLFs5NC42LDc5LjhdLFs5NC4yLDc5LjldLFs5NC42LDgwXSxbOTUsODAuMV0sWzk1LjIsODBdLFs5NS40LDgwLjFdLFs5Niw4MC4xXSxbOTYuNCw4MC4xXSxbOTcuMSw4MC4yXSxbOTcuNSw4MC4yXSxbOTcuNiw4MC4yXV1dLFtbWy0xNzkuNiw2OC45XSxbLTE3OS4xLDY4LjhdLFstMTc4LjgsNjguNl0sWy0xNzgsNjguM10sWy0xNzguNCw2OC42XSxbLTE3Ny40LDY4LjJdLFstMTc2LjgsNjguMV0sWy0xNzUuNiw2Ny44XSxbLTE3NS4zLDY3LjRdLFstMTc0LjgsNjcuNF0sWy0xNzQuOCw2Ni43XSxbLTE3NC41LDY2LjZdLFstMTc0LjMsNjYuNF0sWy0xNzQsNjYuMl0sWy0xNzQuMSw2Ni42XSxbLTE3NC40LDY3XSxbLTE3NC4yLDY3LjFdLFstMTczLjQsNjcuMV0sWy0xNzMuNCw2Ni44XSxbLTE3Mi42LDY2LjldLFstMTczLDY3LjFdLFstMTcxLjcsNjddLFstMTcxLjMsNjYuN10sWy0xNzAuNSw2Ni4zXSxbLTE3MC4yLDY2LjNdLFstMTY5LjksNjYuMV0sWy0xNzAsNjZdLFstMTcwLjUsNjUuN10sWy0xNzEuMyw2NS44XSxbLTE3MS4xLDY1LjVdLFstMTcxLjksNjUuNV0sWy0xNzIuMyw2NS42XSxbLTE3Mi43LDY1LjZdLFstMTcyLjMsNjUuNF0sWy0xNzIuNyw2NS4yXSxbLTE3Mi40LDY0LjldLFstMTczLjIsNjQuOF0sWy0xNzMuMSw2NC43XSxbLTE3Mi40LDY0LjRdLFstMTczLDY0LjVdLFstMTczLjMsNjQuM10sWy0xNzMuNCw2NC41XSxbLTE3NC4xLDY0LjVdLFstMTc1LDY0LjhdLFstMTc1LjgsNjQuOV0sWy0xNzUuOSw2NS40XSxbLTE3Ni42LDY1LjZdLFstMTc3LjUsNjUuNV0sWy0xNzguNiw2NS41XSxbLTE3OC45LDY1LjldLFstMTc4LjUsNjYuM10sWy0xNzkuMSw2Ni4yXSxbLTE3OS4yLDY2LjJdLFstMTc5LjcsNjYuMl0sWy0xNzkuNCw2NS42XSxbLTE3OS42LDY1LjJdLFstMTgwLDY2LjFdLFstMTc5LjYsNjguOV1dXSxbW1sxMjguMSw3Mi42XSxbMTI4LjYsNzIuNV0sWzEyOC43LDcyLjVdLFsxMjguOCw3Mi41XSxbMTI4LjksNzIuNV0sWzEyOSw3Mi41XSxbMTI5LjEsNzIuNV0sWzEyOS4yLDcyLjVdLFsxMjkuMyw3Mi41XSxbMTI5LjMsNzIuNF0sWzEyOS40LDcyLjRdLFsxMjkuNSw3Mi40XSxbMTI5LjUsNzIuM10sWzEyOS40LDcyLjNdLFsxMjkuMyw3Mi4zXSxbMTI5LjUsNzIuMl0sWzEyOS42LDcyLjJdLFsxMjkuNCw3Mi4yXSxbMTI5LjIsNzIuMV0sWzEyOS4zLDcyLjFdLFsxMjkuNCw3Mi4xXSxbMTI5LjUsNzIuMV0sWzEyOSw3Mi4xXSxbMTI4LjksNzIuMV0sWzEyOC44LDcyLjFdLFsxMjguNyw3Mi4xXSxbMTI4LjUsNzIuMV0sWzEyOC41LDcyLjJdLFsxMjguNiw3Mi4yXSxbMTI4LjQsNzIuMl0sWzEyOC4yLDcyLjJdLFsxMjgsNzIuM10sWzEyNy45LDcyLjNdLFsxMjcuNyw3Mi40XSxbMTI3LjYsNzIuNF0sWzEyNy41LDcyLjRdLFsxMjcuNCw3Mi40XSxbMTI3LjMsNzIuNF0sWzEyNy4yLDcyLjRdLFsxMjcuMSw3Mi40XSxbMTI3LDcyLjRdLFsxMjYuOCw3Mi40XSxbMTI2LjcsNzIuNF0sWzEyNi42LDcyLjVdLFsxMjYuNyw3Mi41XSxbMTI2LjgsNzIuNV0sWzEyNi45LDcyLjVdLFsxMjcsNzIuNV0sWzEyNyw3Mi42XSxbMTI3LjEsNzIuNl0sWzEyNy4yLDcyLjZdLFsxMjcuMyw3Mi42XSxbMTI3LjQsNzIuNl0sWzEyNy41LDcyLjZdLFsxMjcuNyw3Mi42XSxbMTI3LjgsNzIuNl0sWzEyOCw3Mi42XSxbMTI4LjEsNzIuNl1dXSxbW1sxMjQuNiw3My43XSxbMTI0LjgsNzMuN10sWzEyNSw3My42XSxbMTI1LjEsNzMuN10sWzEyNS4yLDczLjddLFsxMjUuMiw3My41XSxbMTI1LjQsNzMuNl0sWzEyNS41LDczLjVdLFsxMjUuNiw3My40XSxbMTI1LjksNzMuNV0sWzEyNi4yLDczLjZdLFsxMjYuMyw3My41XSxbMTI2LjMsNzMuNF0sWzEyNi4yLDczLjRdLFsxMjYuNSw3My40XSxbMTI2LjYsNzMuM10sWzEyNi43LDczLjJdLFsxMjYuNiw3M10sWzEyNi40LDczXSxbMTI2LjMsNzIuOV0sWzEyNi40LDcyLjhdLFsxMjYuMiw3Mi41XSxbMTI2LjMsNzIuNF0sWzEyNi4xLDcyLjNdLFsxMjUuOSw3Mi40XSxbMTI1LjcsNzIuNF0sWzEyNS41LDcyLjRdLFsxMjUuMyw3Mi41XSxbMTI1LjIsNzIuNl0sWzEyNSw3Mi42XSxbMTI0LjgsNzIuNl0sWzEyNC43LDcyLjddLFsxMjQuNCw3Mi43XSxbMTI0LjIsNzIuOF0sWzEyNCw3Mi44XSxbMTIzLjgsNzIuOF0sWzEyMy42LDcyLjhdLFsxMjMuNCw3Mi44XSxbMTIzLjMsNzIuOV0sWzEyMy4xLDcyLjldLFsxMjIuOSw3Mi45XSxbMTIyLjUsNzIuOV0sWzEyMi40LDczXSxbMTIyLjcsNzNdLFsxMjIuOSw3M10sWzEyMy40LDczLjJdLFsxMjMuNiw3My4yXSxbMTIzLjQsNzMuM10sWzEyMy4yLDczLjZdLFsxMjMuNCw3My42XSxbMTIzLjUsNzMuN10sWzEyMy43LDczLjZdLFsxMjMuOSw3My43XSxbMTI0LDczLjhdLFsxMjQsNzMuN10sWzEyNC4yLDczLjhdLFsxMjQuNCw3My44XSxbMTI0LjYsNzMuN11dXSxbW1s1NC43LDgxLjFdLFs1NC45LDgxLjFdLFs1NSw4MS4xXSxbNTUuMSw4MS4xXSxbNTUuMiw4MS4xXSxbNTUuMyw4MV0sWzU1LjQsODFdLFs1NS41LDgxXSxbNTUuNiw4MV0sWzU1LjgsODFdLFs1Niw4MV0sWzU2LjEsODFdLFs1Ni40LDgxXSxbNTYuNiw4MV0sWzU2LjYsODAuOV0sWzU2LjcsODAuOV0sWzU2LjgsODAuOV0sWzU2LjksODAuOV0sWzU3LDgwLjldLFs1Ny4xLDgwLjldLFs1Ny4yLDgwLjldLFs1Ny4zLDgwLjldLFs1Ny41LDgwLjhdLFs1Ny42LDgwLjhdLFs1Ny43LDgwLjhdLFs1Ny41LDgwLjddLFs1Ny40LDgwLjddLFs1Ny4zLDgwLjddLFs1Ny4yLDgwLjddLFs1Ny4xLDgwLjddLFs1Nyw4MC43XSxbNTYuOSw4MC43XSxbNTYuOCw4MC44XSxbNTYuNyw4MC44XSxbNTYuNiw4MC44XSxbNTYuNSw4MC44XSxbNTYuMyw4MC44XSxbNTYuMiw4MC44XSxbNTYuMSw4MC44XSxbNTYsODAuOF0sWzU1LjgsODAuOV0sWzU1LjcsODAuOV0sWzU1LjYsODAuOV0sWzU1LjUsODAuOV0sWzU1LjQsODAuOV0sWzU1LjIsODFdLFs1NS4xLDgxXSxbNTUsODAuOV0sWzU1LDgxXSxbNTQuOSw4MV0sWzU0LjgsODFdLFs1NC43LDgxXSxbNTQuNiw4MV0sWzU0LjUsODFdLFs1NC40LDgxXSxbNTQuNiw4MS4xXSxbNTQuNyw4MS4xXV1dXSxcInR5cGVcIjpcIk11bHRpUG9seWdvblwifSxcInR5cGVcIjpcIkZlYXR1cmVcIixcInByb3BlcnRpZXNcIjp7XCJpc28yXCI6XCJSVVwiLFwibG5nXCI6MTAwLFwibGF0XCI6NjB9fSx7XCJnZW9tZXRyeVwiOntcImNvb3JkaW5hdGVzXCI6W1tbWzIxLjgsNjguNl0sWzIzLDY4LjNdLFsyMy41LDY3LjZdLFsyMy43LDY3XSxbMjMuNyw2Ni4yXSxbMjMuNSw2NS44XSxbMjIuNCw2NS45XSxbMjIuMSw2NS41XSxbMjEuNiw2NS4yXSxbMjEuMiw2NC44XSxbMjEuNiw2NC40XSxbMjAuNCw2My43XSxbMTkuNSw2My42XSxbMTguOSw2My4yXSxbMTcuOSw2Mi44XSxbMTcuNSw2Mi40XSxbMTcuNSw2Ml0sWzE3LjIsNjEuNl0sWzE3LjUsNjAuNl0sWzE4LjQsNjAuM10sWzE5LjEsNTkuOF0sWzE4LjIsNTkuNF0sWzE3LjcsNTkuNl0sWzE3LjQsNTkuNV0sWzE2LjUsNTkuNV0sWzE3LjEsNTkuNF0sWzE4LjQsNTkuM10sWzE3LjksNTguOV0sWzE3LjEsNTguOF0sWzE2LjIsNTguNl0sWzE2LjgsNTguMl0sWzE2LjcsNTcuN10sWzE2LjYsNTcuMV0sWzE2LDU2LjNdLFsxNC44LDU2LjFdLFsxNC4zLDU1LjZdLFsxMy40LDU1LjNdLFsxMi43LDU2LjJdLFsxMi44LDU2LjZdLFsxMi4yLDU3LjNdLFsxMS43LDU3LjhdLFsxMS4yLDU4LjNdLFsxMS40LDU5LjFdLFsxMS44LDU5LjddLFsxMi42LDYwLjRdLFsxMi42LDYxLjFdLFsxMi4zLDYyLjFdLFsxMi4yLDYzXSxbMTIuNyw2NF0sWzE0LjEsNjQuNV0sWzE0LjQsNjUuMl0sWzE1LDY2LjFdLFsxNi4yLDY3LjNdLFsxNy42LDY4XSxbMTguNiw2OC41XSxbMjAsNjguNV0sWzIwLjgsNjldLFsyMS44LDY4LjZdXV0sW1tbMTguMiw1Ni45XSxbMTguMSw1Ni45XSxbMTguMiw1N10sWzE4LjMsNTddLFsxOC4zLDU3LjFdLFsxOC4yLDU3LjFdLFsxOC4xLDU3LjJdLFsxOC4yLDU3LjNdLFsxOC4xLDU3LjRdLFsxOC4xLDU3LjVdLFsxOC4xLDU3LjZdLFsxOC4yLDU3LjZdLFsxOC4zLDU3LjZdLFsxOC4zLDU3LjddLFsxOC40LDU3LjddLFsxOC40LDU3LjhdLFsxOC41LDU3LjhdLFsxOC43LDU3LjldLFsxOC45LDU3LjldLFsxOSw1Ny45XSxbMTksNTcuOF0sWzE4LjksNTcuN10sWzE4LjgsNTcuN10sWzE4LjgsNTcuNV0sWzE4LjgsNTcuNF0sWzE4LjcsNTcuMl0sWzE4LjYsNTcuMl0sWzE4LjUsNTcuMl0sWzE4LjQsNTcuMl0sWzE4LjQsNTcuMV0sWzE4LjMsNTYuOV0sWzE4LjIsNTYuOV1dXSxbW1sxNi44LDU2LjhdLFsxNi43LDU2LjddLFsxNi42LDU2LjVdLFsxNi42LDU2LjRdLFsxNi42LDU2LjNdLFsxNi41LDU2LjJdLFsxNi40LDU2LjJdLFsxNi40LDU2LjNdLFsxNi40LDU2LjVdLFsxNi40LDU2LjZdLFsxNi41LDU2LjhdLFsxNi42LDU2LjldLFsxNi43LDU2LjldLFsxNi44LDU3LjFdLFsxNi45LDU3LjFdLFsxNyw1Ny4yXSxbMTcsNTcuM10sWzE3LDU3LjRdLFsxNy4xLDU3LjRdLFsxNy4xLDU3LjNdLFsxNy4xLDU3LjJdLFsxNyw1Ny4xXSxbMTYuOSw1N10sWzE2LjksNTYuOV0sWzE2LjgsNTYuOF1dXSxbXSxbXSxbXSxbXV0sXCJ0eXBlXCI6XCJNdWx0aVBvbHlnb25cIn0sXCJ0eXBlXCI6XCJGZWF0dXJlXCIsXCJwcm9wZXJ0aWVzXCI6e1wiaXNvMlwiOlwiU0VcIixcImxuZ1wiOjE1LFwibGF0XCI6NjJ9fSx7XCJnZW9tZXRyeVwiOntcImNvb3JkaW5hdGVzXCI6W1tbMTMuNyw0Ni41XSxbMTMuOSw0Ni41XSxbMTQuMiw0Ni40XSxbMTQuOCw0Ni41XSxbMTQuOSw0Ni42XSxbMTUuMSw0Ni43XSxbMTUuNCw0Ni43XSxbMTUuOCw0Ni43XSxbMTYsNDYuOF0sWzE2LjIsNDYuOV0sWzE2LjMsNDYuOF0sWzE2LjQsNDYuN10sWzE2LjYsNDYuNV0sWzE2LjMsNDYuNV0sWzE2LjMsNDYuNF0sWzE2LjEsNDYuM10sWzE1LjgsNDYuMl0sWzE1LjYsNDYuMl0sWzE1LjcsNDYuMV0sWzE1LjcsNDUuOV0sWzE1LjYsNDUuOF0sWzE1LjMsNDUuOF0sWzE1LjQsNDUuN10sWzE1LjMsNDUuNV0sWzE1LjEsNDUuNV0sWzE0LjksNDUuNV0sWzE0LjcsNDUuNV0sWzE0LjYsNDUuN10sWzE0LjUsNDUuNV0sWzE0LjEsNDUuNV0sWzEzLjksNDUuNV0sWzEzLjYsNDUuNV0sWzEzLjgsNDUuNV0sWzEzLjcsNDUuNl0sWzEzLjgsNDUuN10sWzEzLjcsNDUuOF0sWzEzLjYsNDUuOV0sWzEzLjUsNDZdLFsxMy42LDQ2LjFdLFsxMy43LDQ2LjJdLFsxMy41LDQ2LjJdLFsxMy40LDQ2LjNdLFsxMy43LDQ2LjRdLFsxMy43LDQ2LjVdXV0sXCJ0eXBlXCI6XCJQb2x5Z29uXCJ9LFwidHlwZVwiOlwiRmVhdHVyZVwiLFwicHJvcGVydGllc1wiOntcImlzbzJcIjpcIlNJXCIsXCJsbmdcIjoxNC44LFwibGF0XCI6NDYuMX19LHtcImdlb21ldHJ5XCI6e1wiY29vcmRpbmF0ZXNcIjpbW1sxNy4zLDQ4XSxbMTcuMSw0OC4xXSxbMTcsNDguM10sWzE2LjksNDguNF0sWzE3LDQ4LjddLFsxNy4yLDQ4LjldLFsxNy41LDQ4LjhdLFsxNy44LDQ4LjldLFsxOC4xLDQ5LjFdLFsxOC4yLDQ5LjNdLFsxOC41LDQ5LjVdLFsxOC44LDQ5LjVdLFsxOSw0OS40XSxbMTkuMyw0OS41XSxbMTkuNSw0OS41XSxbMTkuOCw0OS40XSxbMTkuOSw0OS4yXSxbMjAuMSw0OS4zXSxbMjAuNCw0OS40XSxbMjAuOCw0OS4zXSxbMjEsNDkuNF0sWzIxLjQsNDkuNF0sWzIxLjgsNDkuNF0sWzIyLjIsNDkuMl0sWzIyLjUsNDkuMV0sWzIyLjUsNDldLFsyMi40LDQ4LjhdLFsyMi4yLDQ4LjRdLFsyMS45LDQ4LjRdLFsyMS43LDQ4LjRdLFsyMS41LDQ4LjVdLFsyMS4yLDQ4LjVdLFsyMC45LDQ4LjVdLFsyMC43LDQ4LjZdLFsyMC40LDQ4LjRdLFsyMC4yLDQ4LjNdLFsxOS45LDQ4LjFdLFsxOS42LDQ4LjJdLFsxOS4yLDQ4LjFdLFsxOC45LDQ4LjFdLFsxOC44LDQ3LjldLFsxOC43LDQ3LjhdLFsxOC40LDQ3LjhdLFsxOC4yLDQ3LjddLFsxNy45LDQ3LjhdLFsxNy43LDQ3LjhdLFsxNy40LDQ4XSxbMTcuMyw0OF1dXSxcInR5cGVcIjpcIlBvbHlnb25cIn0sXCJ0eXBlXCI6XCJGZWF0dXJlXCIsXCJwcm9wZXJ0aWVzXCI6e1wiaXNvMlwiOlwiU0tcIixcImxuZ1wiOjE5LjUsXCJsYXRcIjo0OC43fX0se1wiZ2VvbWV0cnlcIjp7XCJjb29yZGluYXRlc1wiOltdLFwidHlwZVwiOlwiUG9seWdvblwifSxcInR5cGVcIjpcIkZlYXR1cmVcIixcInByb3BlcnRpZXNcIjp7XCJpc28yXCI6XCJTTVwiLFwibG5nXCI6MTIuNCxcImxhdFwiOjQzLjh9fSx7XCJnZW9tZXRyeVwiOntcImNvb3JkaW5hdGVzXCI6W1tbWzM1LjEsNDJdLFszNi4xLDQxLjddLFszNi42LDQxLjRdLFszNy40LDQxLjFdLFszOC4yLDQwLjldLFszOS4xLDQxLjFdLFs0MC4zLDQxXSxbNDEuNCw0MS40XSxbNDIuMyw0MS41XSxbNDMuMiw0MS4yXSxbNDMuNyw0MC43XSxbNDQsNDBdLFs0NC44LDM5LjZdLFs0NC4yLDM5XSxbNDQuNSwzOC4zXSxbNDQuNiwzNy40XSxbNDQuMiwzNy4xXSxbNDMuNSwzNy4yXSxbNDIuNCwzNy4xXSxbNDEuNSwzNy4xXSxbNDAuMywzNi45XSxbMzksMzYuN10sWzM4LDM2LjhdLFszNywzNi43XSxbMzYuNSwzNi4yXSxbMzYsMzUuOV0sWzM2LDM2LjVdLFszNS43LDM2LjhdLFszNC45LDM2LjhdLFszNCwzNi4zXSxbMzIuOCwzNl0sWzMyLDM2LjVdLFszMC43LDM2LjldLFszMC4zLDM2LjNdLFsyOS4zLDM2LjJdLFsyOC45LDM2LjddLFsyOC4yLDM2LjddLFsyNy43LDM2LjddLFsyNy44LDM3XSxbMjcuNSwzNy4xXSxbMjcuMiwzNy41XSxbMjYuOCwzOC4yXSxbMjYuNCwzOC4zXSxbMjYuNSwzOC42XSxbMjcsMzguNV0sWzI2LjgsMzldLFsyNywzOS42XSxbMjYuMiwzOS43XSxbMjYuNyw0MC4zXSxbMjcuNSw0MC4zXSxbMjgsNDAuNF0sWzI5LDQwLjVdLFsyOS42LDQwLjddLFsyOS4xLDQwLjldLFsyOS45LDQxLjFdLFszMC45LDQxLjFdLFszMiw0MS41XSxbMzMuMiw0Ml0sWzM0LjIsNDJdLFszNS4xLDQyXV1dLFtbWzI3LjQsNDJdLFsyNy42LDQyXSxbMjcuOCw0Ml0sWzI4LDQyXSxbMjgsNDEuOF0sWzI4LjIsNDEuNV0sWzI4LjUsNDEuNF0sWzI4LjksNDEuM10sWzI5LDQxLjNdLFsyOS4xLDQxLjJdLFsyOSw0MS4xXSxbMjguOCw0MV0sWzI4LjYsNDEuMV0sWzI4LjUsNDFdLFsyOC40LDQxLjFdLFsyOC4xLDQxLjFdLFsyNy45LDQxXSxbMjcuNyw0MV0sWzI3LjUsNDAuOV0sWzI3LjQsNDAuOF0sWzI3LjIsNDAuNl0sWzI3LDQwLjZdLFsyNi43LDQwLjVdLFsyNi42LDQwLjRdLFsyNi40LDQwLjJdLFsyNi4yLDQwLjFdLFsyNi4yLDQwLjJdLFsyNi4zLDQwLjNdLFsyNi40LDQwLjRdLFsyNi42LDQwLjVdLFsyNi44LDQwLjddLFsyNi42LDQwLjZdLFsyNi4zLDQwLjZdLFsyNi4xLDQwLjddLFsyNi4xLDQwLjhdLFsyNi4yLDQwLjldLFsyNi40LDQxXSxbMjYuMyw0MS4yXSxbMjYuNiw0MS4zXSxbMjYuNiw0MS41XSxbMjYuNSw0MS42XSxbMjYuMyw0MS43XSxbMjYuNCw0MS44XSxbMjYuNiw0MS45XSxbMjYuOSw0Ml0sWzI3LDQyLjFdLFsyNy4yLDQyLjFdLFsyNy40LDQyLjFdLFsyNy40LDQyXV1dLFtdLFtdLFtdXSxcInR5cGVcIjpcIk11bHRpUG9seWdvblwifSxcInR5cGVcIjpcIkZlYXR1cmVcIixcInByb3BlcnRpZXNcIjp7XCJpc28yXCI6XCJUUlwiLFwibG5nXCI6MzUsXCJsYXRcIjozOX19LHtcImdlb21ldHJ5XCI6e1wiY29vcmRpbmF0ZXNcIjpbW1tbMzMuNCw1Mi40XSxbMzQuMiw1MS43XSxbMzUuMSw1MS4xXSxbMzUuNSw1MC41XSxbMzYuNSw1MC4yXSxbMzcuNyw1MC4xXSxbMzguNyw0OS45XSxbMzkuNSw0OS44XSxbNDAuMiw0OS4yXSxbNDAsNDguOF0sWzM5LjgsNDcuOV0sWzM4LjgsNDcuOV0sWzM4LjEsNDcuMV0sWzM2LjgsNDYuOF0sWzM1LjUsNDYuNV0sWzM1LDQ2LjJdLFszNC4yLDQ2LjNdLFszNC4xLDQ1LjldLFszNS4xLDQ1LjVdLFszNC43LDQ2LjFdLFszNi4xLDQ1LjVdLFszNS45LDQ1XSxbMzQuNyw0NC44XSxbMzMuNCw0NC42XSxbMzMuMSw0NS4yXSxbMzIuOCw0NS42XSxbMzMuNiw0Nl0sWzMyLjUsNDYuMV0sWzMxLjUsNDYuNl0sWzMyLjIsNDYuNl0sWzMxLjksNDcuMV0sWzMwLjksNDYuNl0sWzI5LjksNDUuN10sWzI5LjcsNDUuMl0sWzI4LjQsNDUuM10sWzI4LjgsNDUuOV0sWzI5LjQsNDYuNV0sWzMwLDQ2LjZdLFsyOS4zLDQ3LjVdLFsyOC43LDQ4LjFdLFsyNy44LDQ4LjVdLFsyNi4xLDQ4XSxbMjQuOSw0Ny43XSxbMjMuOCw0OF0sWzIyLjcsNDguMV0sWzIyLjUsNDguOV0sWzIyLjgsNDkuN10sWzI0LjEsNTAuN10sWzIzLjcsNTEuNV0sWzI0LjksNTEuOV0sWzI2LjIsNTEuOV0sWzI3LjIsNTEuN10sWzI4LjIsNTEuN10sWzI5LjIsNTEuNl0sWzMwLjMsNTEuNF0sWzMwLjksNTIuMV0sWzMyLjMsNTIuMV0sWzMzLjQsNTIuNF1dXSxbXSxbXSxbXV0sXCJ0eXBlXCI6XCJNdWx0aVBvbHlnb25cIn0sXCJ0eXBlXCI6XCJGZWF0dXJlXCIsXCJwcm9wZXJ0aWVzXCI6e1wiaXNvMlwiOlwiVUFcIixcImxuZ1wiOjMyLFwibGF0XCI6NDl9fSx7XCJnZW9tZXRyeVwiOntcImNvb3JkaW5hdGVzXCI6W1tbNjQuNCwzOV0sWzYzLjcsMzkuM10sWzYyLjksMzkuN10sWzYyLjMsNDAuNF0sWzYxLjcsNDEuMl0sWzYwLjksNDEuM10sWzYwLjIsNDEuM10sWzYwLjMsNDEuOF0sWzU5LjQsNDIuM10sWzU4LjgsNDIuN10sWzU4LjEsNDIuNl0sWzU3LjksNDIuNF0sWzU3LjQsNDIuMl0sWzU3LDQxLjVdLFs1Ni40LDQxLjNdLFs1Niw0Mi44XSxbNTYuMyw0NS4xXSxbNTgsNDUuNV0sWzYyLDQzLjVdLFs2NCw0My42XSxbNjUuNiw0My4yXSxbNjYsNDIuM10sWzY2LjksNDEuMV0sWzY3LjksNDEuMl0sWzY4LjMsNDAuN10sWzY4LjksNDEuMV0sWzY5LjYsNDEuN10sWzcwLjUsNDIuMV0sWzcxLjIsNDIuMl0sWzcwLjUsNDEuOF0sWzcwLjYsNDEuNV0sWzcxLjQsNDEuM10sWzcxLjYsNDEuNl0sWzcyLjMsNDFdLFs3My4xLDQwLjhdLFs3Mi40LDQwLjRdLFs3MS41LDQwLjJdLFs3MC44LDQwLjJdLFs3MC40LDQwLjVdLFs3MC40LDQxLjFdLFs2OS44LDQwLjZdLFs2OS4zLDQwLjZdLFs2OC43LDQwLjJdLFs2OC45LDQwXSxbNjguNSwzOS42XSxbNjcuNCwzOS41XSxbNjcuOSwzOV0sWzY4LjEsMzguNF0sWzY4LjEsMzcuOF0sWzY3LjcsMzcuMl0sWzY2LjgsMzcuNF0sWzY2LjcsMzhdLFs2NS44LDM4LjJdLFs2NC45LDM4LjddLFs2NC40LDM5XV1dLFwidHlwZVwiOlwiUG9seWdvblwifSxcInR5cGVcIjpcIkZlYXR1cmVcIixcInByb3BlcnRpZXNcIjp7XCJpc28yXCI6XCJVWlwiLFwibG5nXCI6NjQsXCJsYXRcIjo0MX19LHtcImdlb21ldHJ5XCI6e1wiY29vcmRpbmF0ZXNcIjpbXSxcInR5cGVcIjpcIlBvbHlnb25cIn0sXCJ0eXBlXCI6XCJGZWF0dXJlXCIsXCJwcm9wZXJ0aWVzXCI6e1wiaXNvMlwiOlwiVkFcIixcImxuZ1wiOjEyLjQsXCJsYXRcIjo0MS45fX0se1wiZ2VvbWV0cnlcIjp7XCJjb29yZGluYXRlc1wiOltbWzIwLjgsNDIuMV0sWzIwLjcsNDEuOF0sWzIwLjYsNDEuOV0sWzIwLjUsNDIuMl0sWzIwLjMsNDIuM10sWzIwLjEsNDIuNl0sWzIwLjMsNDIuOF0sWzIwLjUsNDIuOV0sWzIwLjYsNDMuMl0sWzIwLjgsNDMuM10sWzIxLDQzLjFdLFsyMS4xLDQzLjFdLFsyMS4zLDQyLjldLFsyMS40LDQyLjldLFsyMS42LDQyLjddLFsyMS44LDQyLjddLFsyMS43LDQyLjRdLFsyMS41LDQyLjNdLFsyMS42LDQyLjJdLFsyMS40LDQyLjJdLFsyMC44LDQyLjFdXV0sXCJ0eXBlXCI6XCJQb2x5Z29uXCJ9LFwidHlwZVwiOlwiRmVhdHVyZVwiLFwicHJvcGVydGllc1wiOntcImlzbzJcIjpcIlhLXCIsXCJsbmdcIjoyMS4yLFwibGF0XCI6NDIuN319XSxcInR5cGVcIjpcIkZlYXR1cmVDb2xsZWN0aW9uXCJ9OyIsIid1c2Ugc3RyaWN0JztPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywnX19lc01vZHVsZScse3ZhbHVlOnRydWV9KTtleHBvcnRzLm5ld0ZpbHRlclNldHRpbmdzPWV4cG9ydHMuc2V0Zj11bmRlZmluZWQ7dmFyIF90eXBlb2Y9dHlwZW9mIFN5bWJvbD09PSdmdW5jdGlvbicmJnR5cGVvZiBTeW1ib2wuaXRlcmF0b3I9PT0nc3ltYm9sJz9mdW5jdGlvbihvYmope3JldHVybiB0eXBlb2Ygb2JqfTpmdW5jdGlvbihvYmope3JldHVybiBvYmomJnR5cGVvZiBTeW1ib2w9PT0nZnVuY3Rpb24nJiZvYmouY29uc3RydWN0b3I9PT1TeW1ib2wmJm9iaiE9PVN5bWJvbC5wcm90b3R5cGU/J3N5bWJvbCc6dHlwZW9mIG9ian07dmFyIF9zbGljZWRUb0FycmF5PWZ1bmN0aW9uKCl7ZnVuY3Rpb24gc2xpY2VJdGVyYXRvcihhcnIsaSl7dmFyIF9hcnI9W107dmFyIF9uPXRydWU7dmFyIF9kPWZhbHNlO3ZhciBfZT11bmRlZmluZWQ7dHJ5e2Zvcih2YXIgX2k9YXJyW1N5bWJvbC5pdGVyYXRvcl0oKSxfczshKF9uPShfcz1faS5uZXh0KCkpLmRvbmUpO19uPXRydWUpe19hcnIucHVzaChfcy52YWx1ZSk7aWYoaSYmX2Fyci5sZW5ndGg9PT1pKWJyZWFrfX1jYXRjaChlcnIpe19kPXRydWU7X2U9ZXJyfWZpbmFsbHl7dHJ5e2lmKCFfbiYmX2lbJ3JldHVybiddKV9pWydyZXR1cm4nXSgpfWZpbmFsbHl7aWYoX2QpdGhyb3cgX2V9fXJldHVybiBfYXJyfXJldHVybiBmdW5jdGlvbihhcnIsaSl7aWYoQXJyYXkuaXNBcnJheShhcnIpKXtyZXR1cm4gYXJyfWVsc2UgaWYoU3ltYm9sLml0ZXJhdG9yIGluIE9iamVjdChhcnIpKXtyZXR1cm4gc2xpY2VJdGVyYXRvcihhcnIsaSl9ZWxzZXt0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlJyl9fX0oKTtleHBvcnRzLmNvbXBpbGVGaWx0ZXJpbmc9Y29tcGlsZUZpbHRlcmluZztleHBvcnRzLmNvbXB1dGVGaWx0ZXJpbmc9Y29tcHV0ZUZpbHRlcmluZztleHBvcnRzLnBsYWNlRmFjZXRzPXBsYWNlRmFjZXRzO2V4cG9ydHMudGVzdEFsbENoZWNrcz10ZXN0QWxsQ2hlY2tzO3ZhciBfbG9jYWxzdG9yYWdlPXJlcXVpcmUoJ2xvY2Fsc3RvcmFnZS5qcycpO2Z1bmN0aW9uIF90b0NvbnN1bWFibGVBcnJheShhcnIpe2lmKEFycmF5LmlzQXJyYXkoYXJyKSl7Zm9yKHZhciBpPTAsYXJyMj1BcnJheShhcnIubGVuZ3RoKTtpPGFyci5sZW5ndGg7aSsrKXthcnIyW2ldPWFycltpXX1yZXR1cm4gYXJyMn1lbHNle3JldHVybiBBcnJheS5mcm9tKGFycil9fXZhciBpbml0Zj1mdW5jdGlvbiBpbml0Zih0YWcsa2V5LGRlZmF1bHRWYWwpe3ZhciBsc2tleT0nZmx0XycrdGFnKycuJytrZXk7cmV0dXJuKDAsX2xvY2Fsc3RvcmFnZS5sc0hhcykobHNrZXkpPygwLF9sb2NhbHN0b3JhZ2UubHNHZXQpKGxza2V5KTpkZWZhdWx0VmFsfTt2YXIgc2V0Zj1leHBvcnRzLnNldGY9ZnVuY3Rpb24gc2V0Zih0YWcsa2V5LHZhbCl7dmFyIGxza2V5PSdmbHRfJyt0YWcrJy4nK2tleTsoMCxfbG9jYWxzdG9yYWdlLmxzU2V0KShsc2tleSx2YWwpfTtmdW5jdGlvbiBjb21waWxlRmlsdGVyaW5nKGNvbnRyaWJzLGZpZWxkcyxmaWx0ZXJMaXN0KXt2YXIgcHJlc2VudEZpbHRlckxpc3Q9ZmlsdGVyTGlzdC5maWx0ZXIoZnVuY3Rpb24oeCl7cmV0dXJuIGZpZWxkc1t4LmZpZWxkXX0pO3ZhciBmaWx0ZXJGaWVsZHM9cHJlc2VudEZpbHRlckxpc3QuZmlsdGVyKGZ1bmN0aW9uKHgpe3JldHVybiB4Lm5hbWUhPT0nRnVsbFRleHQnfSkubWFwKGZ1bmN0aW9uKHgpe3JldHVybiB4LmZpZWxkfSk7dmFyIGZpZWxkVmFsdWVzPW5ldyBNYXAoZmlsdGVyRmllbGRzLm1hcChmdW5jdGlvbihmKXtyZXR1cm5bZixuZXcgTWFwKFtbJycsJy1ub25lLSddXSldfSkpO3ZhciBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uPXRydWU7dmFyIF9kaWRJdGVyYXRvckVycm9yPWZhbHNlO3ZhciBfaXRlcmF0b3JFcnJvcj11bmRlZmluZWQ7dHJ5e2Zvcih2YXIgX2l0ZXJhdG9yPWNvbnRyaWJzW1N5bWJvbC5pdGVyYXRvcl0oKSxfc3RlcDshKF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb249KF9zdGVwPV9pdGVyYXRvci5uZXh0KCkpLmRvbmUpO19pdGVyYXRvck5vcm1hbENvbXBsZXRpb249dHJ1ZSl7dmFyIHJvdz1fc3RlcC52YWx1ZTt2YXIgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjI9dHJ1ZTt2YXIgX2RpZEl0ZXJhdG9yRXJyb3IyPWZhbHNlO3ZhciBfaXRlcmF0b3JFcnJvcjI9dW5kZWZpbmVkO3RyeXtmb3IodmFyIF9pdGVyYXRvcjI9ZmlsdGVyRmllbGRzW1N5bWJvbC5pdGVyYXRvcl0oKSxfc3RlcDI7IShfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMj0oX3N0ZXAyPV9pdGVyYXRvcjIubmV4dCgpKS5kb25lKTtfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMj10cnVlKXt2YXIgZmllbGQ9X3N0ZXAyLnZhbHVlO3ZhciBmRmllbGRWYWx1ZXM9ZmllbGRWYWx1ZXMuZ2V0KGZpZWxkKTt2YXIgbWV0YXJhdz1yb3dbZmllbGRdO2lmKG1ldGFyYXchPW51bGwmJm1ldGFyYXcubGVuZ3RoIT09MCl7dmFyIF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24zPXRydWU7dmFyIF9kaWRJdGVyYXRvckVycm9yMz1mYWxzZTt2YXIgX2l0ZXJhdG9yRXJyb3IzPXVuZGVmaW5lZDt0cnl7Zm9yKHZhciBfaXRlcmF0b3IzPW1ldGFyYXdbU3ltYm9sLml0ZXJhdG9yXSgpLF9zdGVwMzshKF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24zPShfc3RlcDM9X2l0ZXJhdG9yMy5uZXh0KCkpLmRvbmUpO19pdGVyYXRvck5vcm1hbENvbXBsZXRpb24zPXRydWUpe3ZhciBfcmVmMj1fc3RlcDMudmFsdWU7dmFyIHZhbHVlSWQ9X3JlZjIuX2lkLHZhbHVlUmVwPV9yZWYyLnZhbHVlO2lmKCFmRmllbGRWYWx1ZXMuaGFzKHZhbHVlSWQpKXtmRmllbGRWYWx1ZXMuc2V0KHZhbHVlSWQsdmFsdWVSZXApfX19Y2F0Y2goZXJyKXtfZGlkSXRlcmF0b3JFcnJvcjM9dHJ1ZTtfaXRlcmF0b3JFcnJvcjM9ZXJyfWZpbmFsbHl7dHJ5e2lmKCFfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMyYmX2l0ZXJhdG9yMy5yZXR1cm4pe19pdGVyYXRvcjMucmV0dXJuKCl9fWZpbmFsbHl7aWYoX2RpZEl0ZXJhdG9yRXJyb3IzKXt0aHJvdyBfaXRlcmF0b3JFcnJvcjN9fX19fX1jYXRjaChlcnIpe19kaWRJdGVyYXRvckVycm9yMj10cnVlO19pdGVyYXRvckVycm9yMj1lcnJ9ZmluYWxseXt0cnl7aWYoIV9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24yJiZfaXRlcmF0b3IyLnJldHVybil7X2l0ZXJhdG9yMi5yZXR1cm4oKX19ZmluYWxseXtpZihfZGlkSXRlcmF0b3JFcnJvcjIpe3Rocm93IF9pdGVyYXRvckVycm9yMn19fX19Y2F0Y2goZXJyKXtfZGlkSXRlcmF0b3JFcnJvcj10cnVlO19pdGVyYXRvckVycm9yPWVycn1maW5hbGx5e3RyeXtpZighX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiYmX2l0ZXJhdG9yLnJldHVybil7X2l0ZXJhdG9yLnJldHVybigpfX1maW5hbGx5e2lmKF9kaWRJdGVyYXRvckVycm9yKXt0aHJvdyBfaXRlcmF0b3JFcnJvcn19fXZhciBmaWx0ZXJJbml0PW5ldyBNYXAocHJlc2VudEZpbHRlckxpc3QubWFwKGZ1bmN0aW9uKGZpbHRlclNwZWMsZmlsdGVySWQpe3JldHVybltmaWx0ZXJJZCxmaWx0ZXJTcGVjLm5hbWU9PT0nRnVsbFRleHQnP2luaXRmKGZpbHRlcklkLCcnLCcnKTpuZXcgTWFwKFtdLmNvbmNhdChfdG9Db25zdW1hYmxlQXJyYXkoZmllbGRWYWx1ZXMuZ2V0KGZpbHRlclNwZWMuZmllbGQpLmtleXMoKSkpLm1hcChmdW5jdGlvbih2YWx1ZUlkKXtyZXR1cm5bdmFsdWVJZCxpbml0ZihmaWx0ZXJJZCx2YWx1ZUlkLHRydWUpXX0pKV19KSk7cmV0dXJue2ZpZWxkVmFsdWVzOmZpZWxkVmFsdWVzLGZpbHRlckluaXQ6ZmlsdGVySW5pdH19ZnVuY3Rpb24gY29tcHV0ZUZpbHRlcmluZyhjb250cmlicyxmaWVsZHMsZmlsdGVyTGlzdCxmaWVsZFZhbHVlcyxmaWx0ZXJTZXR0aW5ncyl7dmFyIHByZXNlbnRGaWx0ZXJMaXN0PWZpbHRlckxpc3QuZmlsdGVyKGZ1bmN0aW9uKHgpe3JldHVybiBmaWVsZHNbeC5maWVsZF19KTt2YXIgZmlsdGVyQ2hlY2tzPW5ldyBNYXAocHJlc2VudEZpbHRlckxpc3QubWFwKGZ1bmN0aW9uKGZpbHRlclNwZWMsZmlsdGVySWQpe3JldHVybltmaWx0ZXJJZCwoZmlsdGVyU3BlYy5uYW1lPT09J0Z1bGxUZXh0Jz9mdWxsVGV4dENoZWNrOmZhY2V0Q2hlY2spKGZpbHRlclNwZWMuZmllbGQsZmlsdGVyU2V0dGluZ3MuZ2V0KGZpbHRlcklkKSldfSkpO3ZhciBmaWx0ZXJlZERhdGE9W107dmFyIG90aGVyRmlsdGVyZWREYXRhPW5ldyBNYXAocHJlc2VudEZpbHRlckxpc3QubWFwKGZ1bmN0aW9uKGZpbHRlclNwZWMsZmlsdGVySWQpe3JldHVybltmaWx0ZXJJZCxbXV19KSk7dmFyIF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb240PXRydWU7dmFyIF9kaWRJdGVyYXRvckVycm9yND1mYWxzZTt2YXIgX2l0ZXJhdG9yRXJyb3I0PXVuZGVmaW5lZDt0cnl7dmFyIF9sb29wPWZ1bmN0aW9uIF9sb29wKCl7dmFyIHJvdz1fc3RlcDQudmFsdWU7dmFyIHRoZV9vbmVfZmFpbD1udWxsO3ZhciB2PXRydWU7dmFyIGRpc2NhcmQ9ZmFsc2U7dmFyIF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb241PXRydWU7dmFyIF9kaWRJdGVyYXRvckVycm9yNT1mYWxzZTt2YXIgX2l0ZXJhdG9yRXJyb3I1PXVuZGVmaW5lZDt0cnl7Zm9yKHZhciBfaXRlcmF0b3I1PWZpbHRlckNoZWNrc1tTeW1ib2wuaXRlcmF0b3JdKCksX3N0ZXA1OyEoX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjU9KF9zdGVwNT1faXRlcmF0b3I1Lm5leHQoKSkuZG9uZSk7X2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjU9dHJ1ZSl7dmFyIF9zdGVwNSR2YWx1ZT1fc2xpY2VkVG9BcnJheShfc3RlcDUudmFsdWUsMiksZmlsdGVySWQ9X3N0ZXA1JHZhbHVlWzBdLGZpbHRlckNoZWNrPV9zdGVwNSR2YWx1ZVsxXTt2YXIgcGFzcz1maWx0ZXJDaGVjayhyb3cpO2lmKCFwYXNzKXt2PWZhbHNlO2lmKHRoZV9vbmVfZmFpbD09PW51bGwpe3RoZV9vbmVfZmFpbD1maWx0ZXJJZH1lbHNle2Rpc2NhcmQ9dHJ1ZTticmVha319fX1jYXRjaChlcnIpe19kaWRJdGVyYXRvckVycm9yNT10cnVlO19pdGVyYXRvckVycm9yNT1lcnJ9ZmluYWxseXt0cnl7aWYoIV9pdGVyYXRvck5vcm1hbENvbXBsZXRpb241JiZfaXRlcmF0b3I1LnJldHVybil7X2l0ZXJhdG9yNS5yZXR1cm4oKX19ZmluYWxseXtpZihfZGlkSXRlcmF0b3JFcnJvcjUpe3Rocm93IF9pdGVyYXRvckVycm9yNX19fWlmKCFkaXNjYXJkKXtpZih2KXtmaWx0ZXJlZERhdGEucHVzaChyb3cpO3ByZXNlbnRGaWx0ZXJMaXN0LmZvckVhY2goZnVuY3Rpb24oZmlsdGVyU3BlYyxmaWx0ZXJJZCl7b3RoZXJGaWx0ZXJlZERhdGEuZ2V0KGZpbHRlcklkKS5wdXNoKHJvdyl9KX1lbHNle290aGVyRmlsdGVyZWREYXRhLmdldCh0aGVfb25lX2ZhaWwpLnB1c2gocm93KX19fTtmb3IodmFyIF9pdGVyYXRvcjQ9Y29udHJpYnNbU3ltYm9sLml0ZXJhdG9yXSgpLF9zdGVwNDshKF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb240PShfc3RlcDQ9X2l0ZXJhdG9yNC5uZXh0KCkpLmRvbmUpO19pdGVyYXRvck5vcm1hbENvbXBsZXRpb240PXRydWUpe19sb29wKCl9fWNhdGNoKGVycil7X2RpZEl0ZXJhdG9yRXJyb3I0PXRydWU7X2l0ZXJhdG9yRXJyb3I0PWVycn1maW5hbGx5e3RyeXtpZighX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjQmJl9pdGVyYXRvcjQucmV0dXJuKXtfaXRlcmF0b3I0LnJldHVybigpfX1maW5hbGx5e2lmKF9kaWRJdGVyYXRvckVycm9yNCl7dGhyb3cgX2l0ZXJhdG9yRXJyb3I0fX19dmFyIGFtb3VudHM9bmV3IE1hcChwcmVzZW50RmlsdGVyTGlzdC5tYXAoZnVuY3Rpb24oZmlsdGVyU3BlYyxmaWx0ZXJJZCl7dmFyIGZpZWxkPWZpbHRlclNwZWMuZmllbGQ7cmV0dXJuW2ZpbHRlcklkLGZpbHRlclNwZWMubmFtZT09PSdGdWxsVGV4dCc/bnVsbDpjb3VudEZhY2V0cyhmaWVsZCxmaWVsZFZhbHVlcy5nZXQoZmllbGQpLG90aGVyRmlsdGVyZWREYXRhLmdldChmaWx0ZXJJZCkpXX0pKTtyZXR1cm57ZmlsdGVyZWREYXRhOmZpbHRlcmVkRGF0YSxmaWx0ZXJlZEFtb3VudE90aGVyczpuZXcgTWFwKFtdLmNvbmNhdChfdG9Db25zdW1hYmxlQXJyYXkob3RoZXJGaWx0ZXJlZERhdGEuZW50cmllcygpKSkubWFwKGZ1bmN0aW9uKF9yZWYzKXt2YXIgX3JlZjQ9X3NsaWNlZFRvQXJyYXkoX3JlZjMsMiksZmlsdGVySWQ9X3JlZjRbMF0seD1fcmVmNFsxXTtyZXR1cm5bZmlsdGVySWQseC5sZW5ndGhdfSkpLGFtb3VudHM6YW1vdW50c319dmFyIG5ld0ZpbHRlclNldHRpbmdzPWV4cG9ydHMubmV3RmlsdGVyU2V0dGluZ3M9ZnVuY3Rpb24gbmV3RmlsdGVyU2V0dGluZ3MoZmlsdGVyU2V0dGluZ3MsZmlsdGVySWQsZGF0YSl7dmFyIGZyZXNoRmlsdGVyU2V0dGluZ3M9bmV3IE1hcChbXS5jb25jYXQoX3RvQ29uc3VtYWJsZUFycmF5KGZpbHRlclNldHRpbmdzLmVudHJpZXMoKSkpKTtzd2l0Y2godHlwZW9mIGRhdGE9PT0ndW5kZWZpbmVkJz8ndW5kZWZpbmVkJzpfdHlwZW9mKGRhdGEpKXtjYXNlJ2Jvb2xlYW4nOnt2YXIgZmlsdGVyU2V0dGluZz1mcmVzaEZpbHRlclNldHRpbmdzLmdldChmaWx0ZXJJZCk7ZnJlc2hGaWx0ZXJTZXR0aW5ncy5zZXQoZmlsdGVySWQsbmV3IE1hcChbXS5jb25jYXQoX3RvQ29uc3VtYWJsZUFycmF5KGZpbHRlclNldHRpbmcua2V5cygpKSkubWFwKGZ1bmN0aW9uKHZhbHVlSWQpe3JldHVyblt2YWx1ZUlkLGRhdGFdfSkpKTticmVha31jYXNlJ3N0cmluZyc6e2ZyZXNoRmlsdGVyU2V0dGluZ3Muc2V0KGZpbHRlcklkLGRhdGEpO2JyZWFrfWRlZmF1bHQ6e3ZhciBfZGF0YT1fc2xpY2VkVG9BcnJheShkYXRhLDIpLHZhbHVlSWQ9X2RhdGFbMF0sX2ZpbHRlclNldHRpbmc9X2RhdGFbMV07ZnJlc2hGaWx0ZXJTZXR0aW5ncy5nZXQoZmlsdGVySWQpLnNldCh2YWx1ZUlkLF9maWx0ZXJTZXR0aW5nKTticmVha319cmV0dXJuIGZyZXNoRmlsdGVyU2V0dGluZ3N9O3ZhciBmdWxsVGV4dENoZWNrPWZ1bmN0aW9uIGZ1bGxUZXh0Q2hlY2soZmllbGQsdGVybSl7dmFyIHNlYXJjaD10ZXJtLnRvTG93ZXJDYXNlKCk7aWYoc2VhcmNoPT1udWxsfHxzZWFyY2g9PScnKXtyZXR1cm4gZnVuY3Rpb24ocm93KXtyZXR1cm4gdHJ1ZX19cmV0dXJuIGZ1bmN0aW9uKHJvdyl7dmFyIHZhbD1yb3dbZmllbGRdO3ZhbD12YWwhPW51bGw/dmFsWzBdOnZhbDtyZXR1cm4gdmFsIT1udWxsJiZ2YWwudG9Mb3dlckNhc2UoKS5pbmRleE9mKHNlYXJjaCkhPT0tMX19O3ZhciBmYWNldENoZWNrPWZ1bmN0aW9uIGZhY2V0Q2hlY2soZmllbGQsZmFjZXRWYWx1ZXMpe2lmKGZhY2V0VmFsdWVzLnNpemU9PT0wKXtyZXR1cm4gZnVuY3Rpb24ocm93KXtyZXR1cm4gZmFsc2V9fXJldHVybiBmdW5jdGlvbihyb3cpe3ZhciBmaWVsZFZhbHM9cm93W2ZpZWxkXTtpZihmaWVsZFZhbHM9PW51bGx8fGZpZWxkVmFscy5sZW5ndGg9PTApe3JldHVybiBmYWNldFZhbHVlcy5nZXQoJycpfXZhciBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uNj10cnVlO3ZhciBfZGlkSXRlcmF0b3JFcnJvcjY9ZmFsc2U7dmFyIF9pdGVyYXRvckVycm9yNj11bmRlZmluZWQ7dHJ5e2Zvcih2YXIgX2l0ZXJhdG9yNj1maWVsZFZhbHNbU3ltYm9sLml0ZXJhdG9yXSgpLF9zdGVwNjshKF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb242PShfc3RlcDY9X2l0ZXJhdG9yNi5uZXh0KCkpLmRvbmUpO19pdGVyYXRvck5vcm1hbENvbXBsZXRpb242PXRydWUpe3ZhciBfcmVmNj1fc3RlcDYudmFsdWU7dmFyIHZhbHVlSWQ9X3JlZjYuX2lkO2lmKGZhY2V0VmFsdWVzLmdldCh2YWx1ZUlkKSl7cmV0dXJuIHRydWV9fX1jYXRjaChlcnIpe19kaWRJdGVyYXRvckVycm9yNj10cnVlO19pdGVyYXRvckVycm9yNj1lcnJ9ZmluYWxseXt0cnl7aWYoIV9pdGVyYXRvck5vcm1hbENvbXBsZXRpb242JiZfaXRlcmF0b3I2LnJldHVybil7X2l0ZXJhdG9yNi5yZXR1cm4oKX19ZmluYWxseXtpZihfZGlkSXRlcmF0b3JFcnJvcjYpe3Rocm93IF9pdGVyYXRvckVycm9yNn19fXJldHVybiBmYWxzZX19O2Z1bmN0aW9uIGNvdW50RmFjZXRzKGZpZWxkLGZpZWxkVmFsdWVzLHJvd3Mpe3ZhciBmYWNldEFtb3VudHM9bmV3IE1hcDt2YXIgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjc9dHJ1ZTt2YXIgX2RpZEl0ZXJhdG9yRXJyb3I3PWZhbHNlO3ZhciBfaXRlcmF0b3JFcnJvcjc9dW5kZWZpbmVkO3RyeXtmb3IodmFyIF9pdGVyYXRvcjc9ZmllbGRWYWx1ZXMua2V5cygpW1N5bWJvbC5pdGVyYXRvcl0oKSxfc3RlcDc7IShfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uNz0oX3N0ZXA3PV9pdGVyYXRvcjcubmV4dCgpKS5kb25lKTtfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uNz10cnVlKXt2YXIgdmFsdWVJZD1fc3RlcDcudmFsdWU7ZmFjZXRBbW91bnRzLnNldCh2YWx1ZUlkLDApfX1jYXRjaChlcnIpe19kaWRJdGVyYXRvckVycm9yNz10cnVlO19pdGVyYXRvckVycm9yNz1lcnJ9ZmluYWxseXt0cnl7aWYoIV9pdGVyYXRvck5vcm1hbENvbXBsZXRpb243JiZfaXRlcmF0b3I3LnJldHVybil7X2l0ZXJhdG9yNy5yZXR1cm4oKX19ZmluYWxseXtpZihfZGlkSXRlcmF0b3JFcnJvcjcpe3Rocm93IF9pdGVyYXRvckVycm9yN319fXZhciBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uOD10cnVlO3ZhciBfZGlkSXRlcmF0b3JFcnJvcjg9ZmFsc2U7dmFyIF9pdGVyYXRvckVycm9yOD11bmRlZmluZWQ7dHJ5e2Zvcih2YXIgX2l0ZXJhdG9yOD1yb3dzW1N5bWJvbC5pdGVyYXRvcl0oKSxfc3RlcDg7IShfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uOD0oX3N0ZXA4PV9pdGVyYXRvcjgubmV4dCgpKS5kb25lKTtfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uOD10cnVlKXt2YXIgX3Jvdz1fc3RlcDgudmFsdWU7dmFyIGZpZWxkVmFscz1fcm93W2ZpZWxkXTtpZihmaWVsZFZhbHM9PW51bGx8fGZpZWxkVmFscy5sZW5ndGg9PTApe2ZhY2V0QW1vdW50cy5zZXQoJycsZmFjZXRBbW91bnRzLmdldCgnJykrMSl9ZWxzZXt2YXIgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjk9dHJ1ZTt2YXIgX2RpZEl0ZXJhdG9yRXJyb3I5PWZhbHNlO3ZhciBfaXRlcmF0b3JFcnJvcjk9dW5kZWZpbmVkO3RyeXtmb3IodmFyIF9pdGVyYXRvcjk9ZmllbGRWYWxzW1N5bWJvbC5pdGVyYXRvcl0oKSxfc3RlcDk7IShfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uOT0oX3N0ZXA5PV9pdGVyYXRvcjkubmV4dCgpKS5kb25lKTtfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uOT10cnVlKXt2YXIgX3JlZjg9X3N0ZXA5LnZhbHVlO3ZhciBfdmFsdWVJZD1fcmVmOC5faWQ7ZmFjZXRBbW91bnRzLnNldChfdmFsdWVJZCxmYWNldEFtb3VudHMuZ2V0KF92YWx1ZUlkKSsxKX19Y2F0Y2goZXJyKXtfZGlkSXRlcmF0b3JFcnJvcjk9dHJ1ZTtfaXRlcmF0b3JFcnJvcjk9ZXJyfWZpbmFsbHl7dHJ5e2lmKCFfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uOSYmX2l0ZXJhdG9yOS5yZXR1cm4pe19pdGVyYXRvcjkucmV0dXJuKCl9fWZpbmFsbHl7aWYoX2RpZEl0ZXJhdG9yRXJyb3I5KXt0aHJvdyBfaXRlcmF0b3JFcnJvcjl9fX19fX1jYXRjaChlcnIpe19kaWRJdGVyYXRvckVycm9yOD10cnVlO19pdGVyYXRvckVycm9yOD1lcnJ9ZmluYWxseXt0cnl7aWYoIV9pdGVyYXRvck5vcm1hbENvbXBsZXRpb244JiZfaXRlcmF0b3I4LnJldHVybil7X2l0ZXJhdG9yOC5yZXR1cm4oKX19ZmluYWxseXtpZihfZGlkSXRlcmF0b3JFcnJvcjgpe3Rocm93IF9pdGVyYXRvckVycm9yOH19fXJldHVybiBmYWNldEFtb3VudHN9ZnVuY3Rpb24gcGxhY2VGYWNldHMoZmllbGRWYWx1ZXMsbWF4Q29scyl7aWYoZmllbGRWYWx1ZXM9PW51bGwpe3JldHVybltdfXZhciBmYWNldHM9W10uY29uY2F0KF90b0NvbnN1bWFibGVBcnJheShmaWVsZFZhbHVlcy5lbnRyaWVzKCkpKS5zb3J0KGZ1bmN0aW9uKHgseSl7cmV0dXJuIHhbMV0ubG9jYWxlQ29tcGFyZSh5WzFdKX0pO2lmKGZhY2V0cy5sZW5ndGg9PTApe3JldHVybltdfXZhciByb3dzPVtdO3ZhciBsZj1mYWNldHMubGVuZ3RoO3ZhciBucm93cz1NYXRoLmZsb29yKGxmL21heENvbHMpKyhsZiVtYXhDb2xzPzE6MCk7dmFyIG5jb2xzPU1hdGguZmxvb3IobGYvbnJvd3MpKyhsZiVucm93cz8xOjApO2Zvcih2YXIgcj0wO3I8bnJvd3M7cisrKXt2YXIgX3JvdzI9W107Zm9yKHZhciBjPTA7YzxuY29scztjKyspe3ZhciBmPW5yb3dzKmMrcjtfcm93Mi5wdXNoKGY8bGY/ZmFjZXRzW2ZdOm51bGwpfXJvd3MucHVzaChfcm93Mil9cmV0dXJuIHJvd3N9ZnVuY3Rpb24gdGVzdEFsbENoZWNrcyhmaWx0ZXJTZXR0aW5ncyl7dmFyIGFsbFRydWU9dHJ1ZTt2YXIgYWxsRmFsc2U9dHJ1ZTt2YXIgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjEwPXRydWU7dmFyIF9kaWRJdGVyYXRvckVycm9yMTA9ZmFsc2U7dmFyIF9pdGVyYXRvckVycm9yMTA9dW5kZWZpbmVkO3RyeXtmb3IodmFyIF9pdGVyYXRvcjEwPWZpbHRlclNldHRpbmdzLmtleXMoKVtTeW1ib2wuaXRlcmF0b3JdKCksX3N0ZXAxMDshKF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24xMD0oX3N0ZXAxMD1faXRlcmF0b3IxMC5uZXh0KCkpLmRvbmUpO19pdGVyYXRvck5vcm1hbENvbXBsZXRpb24xMD10cnVlKXt2YXIgdmFsdWVJZD1fc3RlcDEwLnZhbHVlO2lmKGZpbHRlclNldHRpbmdzLmdldCh2YWx1ZUlkKSl7YWxsRmFsc2U9ZmFsc2V9ZWxzZXthbGxUcnVlPWZhbHNlfX19Y2F0Y2goZXJyKXtfZGlkSXRlcmF0b3JFcnJvcjEwPXRydWU7X2l0ZXJhdG9yRXJyb3IxMD1lcnJ9ZmluYWxseXt0cnl7aWYoIV9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24xMCYmX2l0ZXJhdG9yMTAucmV0dXJuKXtfaXRlcmF0b3IxMC5yZXR1cm4oKX19ZmluYWxseXtpZihfZGlkSXRlcmF0b3JFcnJvcjEwKXt0aHJvdyBfaXRlcmF0b3JFcnJvcjEwfX19cmV0dXJue2FsbFRydWU6YWxsVHJ1ZSxhbGxGYWxzZTphbGxGYWxzZX19IiwiJ3VzZSBzdHJpY3QnO09iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCdfX2VzTW9kdWxlJyx7dmFsdWU6dHJ1ZX0pO2V4cG9ydHMuc2F2ZVN0YXRlPWV4cG9ydHMud2l0aENvbnRleHQ9dW5kZWZpbmVkO3ZhciBfanN4RmlsZU5hbWU9Jy9Vc2Vycy9kaXJrL2dpdGh1Yi9kYXJpYWgvY2xpZW50L3NyYy9qcy9saWIvaG9jLmpzJzt2YXIgX2V4dGVuZHM9T2JqZWN0LmFzc2lnbnx8ZnVuY3Rpb24odGFyZ2V0KXtmb3IodmFyIGk9MTtpPGFyZ3VtZW50cy5sZW5ndGg7aSsrKXt2YXIgc291cmNlPWFyZ3VtZW50c1tpXTtmb3IodmFyIGtleSBpbiBzb3VyY2Upe2lmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2Usa2V5KSl7dGFyZ2V0W2tleV09c291cmNlW2tleV19fX1yZXR1cm4gdGFyZ2V0fTt2YXIgX2NyZWF0ZUNsYXNzPWZ1bmN0aW9uKCl7ZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQscHJvcHMpe2Zvcih2YXIgaT0wO2k8cHJvcHMubGVuZ3RoO2krKyl7dmFyIGRlc2NyaXB0b3I9cHJvcHNbaV07ZGVzY3JpcHRvci5lbnVtZXJhYmxlPWRlc2NyaXB0b3IuZW51bWVyYWJsZXx8ZmFsc2U7ZGVzY3JpcHRvci5jb25maWd1cmFibGU9dHJ1ZTtpZigndmFsdWUnaW4gZGVzY3JpcHRvcilkZXNjcmlwdG9yLndyaXRhYmxlPXRydWU7T2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCxkZXNjcmlwdG9yLmtleSxkZXNjcmlwdG9yKX19cmV0dXJuIGZ1bmN0aW9uKENvbnN0cnVjdG9yLHByb3RvUHJvcHMsc3RhdGljUHJvcHMpe2lmKHByb3RvUHJvcHMpZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUscHJvdG9Qcm9wcyk7aWYoc3RhdGljUHJvcHMpZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3RvcixzdGF0aWNQcm9wcyk7cmV0dXJuIENvbnN0cnVjdG9yfX0oKTt2YXIgX3JlYWN0PXJlcXVpcmUoJ3JlYWN0Jyk7dmFyIF9yZWFjdDI9X2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcmVhY3QpO2Z1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKXtyZXR1cm4gb2JqJiZvYmouX19lc01vZHVsZT9vYmo6e2RlZmF1bHQ6b2JqfX1mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsQ29uc3RydWN0b3Ipe2lmKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3Rvcikpe3Rocm93IG5ldyBUeXBlRXJyb3IoJ0Nhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvbicpfX1mdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLGNhbGwpe2lmKCFzZWxmKXt0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoJ3RoaXMgaGFzblxcJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzblxcJ3QgYmVlbiBjYWxsZWQnKX1yZXR1cm4gY2FsbCYmKHR5cGVvZiBjYWxsPT09J29iamVjdCd8fHR5cGVvZiBjYWxsPT09J2Z1bmN0aW9uJyk/Y2FsbDpzZWxmfWZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcyxzdXBlckNsYXNzKXtpZih0eXBlb2Ygc3VwZXJDbGFzcyE9PSdmdW5jdGlvbicmJnN1cGVyQ2xhc3MhPT1udWxsKXt0aHJvdyBuZXcgVHlwZUVycm9yKCdTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90ICcrdHlwZW9mIHN1cGVyQ2xhc3MpfXN1YkNsYXNzLnByb3RvdHlwZT1PYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MmJnN1cGVyQ2xhc3MucHJvdG90eXBlLHtjb25zdHJ1Y3Rvcjp7dmFsdWU6c3ViQ2xhc3MsZW51bWVyYWJsZTpmYWxzZSx3cml0YWJsZTp0cnVlLGNvbmZpZ3VyYWJsZTp0cnVlfX0pO2lmKHN1cGVyQ2xhc3MpT2JqZWN0LnNldFByb3RvdHlwZU9mP09iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcyxzdXBlckNsYXNzKTpzdWJDbGFzcy5fX3Byb3RvX189c3VwZXJDbGFzc312YXIgd2l0aENvbnRleHQ9ZXhwb3J0cy53aXRoQ29udGV4dD1mdW5jdGlvbiB3aXRoQ29udGV4dChDb21wb25lbnRJbm5lcil7dmFyIENvbXBvbmVudE91dGVyPWZ1bmN0aW9uKF9Db21wb25lbnQpe19pbmhlcml0cyhDb21wb25lbnRPdXRlcixfQ29tcG9uZW50KTtmdW5jdGlvbiBDb21wb25lbnRPdXRlcigpe19jbGFzc0NhbGxDaGVjayh0aGlzLENvbXBvbmVudE91dGVyKTtyZXR1cm4gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywoQ29tcG9uZW50T3V0ZXIuX19wcm90b19ffHxPYmplY3QuZ2V0UHJvdG90eXBlT2YoQ29tcG9uZW50T3V0ZXIpKS5hcHBseSh0aGlzLGFyZ3VtZW50cykpfV9jcmVhdGVDbGFzcyhDb21wb25lbnRPdXRlcixbe2tleToncmVuZGVyJyx2YWx1ZTpmdW5jdGlvbiByZW5kZXIoKXt2YXIgbmV3UHJvcHM9X2V4dGVuZHMoe30sdGhpcy5wcm9wcyx0aGlzLmNvbnRleHQuZ2xvYmFscyk7cmV0dXJuIF9yZWFjdDIuZGVmYXVsdC5jcmVhdGVFbGVtZW50KENvbXBvbmVudElubmVyLF9leHRlbmRzKHt9LG5ld1Byb3BzLHtfX3NvdXJjZTp7ZmlsZU5hbWU6X2pzeEZpbGVOYW1lLGxpbmVOdW1iZXI6Njl9fSkpfX1dKTtyZXR1cm4gQ29tcG9uZW50T3V0ZXJ9KF9yZWFjdC5Db21wb25lbnQpO0NvbXBvbmVudE91dGVyLmNvbnRleHRUeXBlcz17Z2xvYmFsczpfcmVhY3QuUHJvcFR5cGVzLm9iamVjdH07cmV0dXJuIENvbXBvbmVudE91dGVyfTt2YXIgc2F2ZVN0YXRlPWV4cG9ydHMuc2F2ZVN0YXRlPWZ1bmN0aW9uIHNhdmVTdGF0ZShDb21wb25lbnRJbm5lcixrZXksaW5pdGlhbFN0YXRlKXt2YXIgQ29tcG9uZW50T3V0ZXI9ZnVuY3Rpb24oX0NvbXBvbmVudElubmVyKXtfaW5oZXJpdHMoQ29tcG9uZW50T3V0ZXIsX0NvbXBvbmVudElubmVyKTtfY3JlYXRlQ2xhc3MoQ29tcG9uZW50T3V0ZXIsW3trZXk6J3NldFN0YXRlS2V5Jyx2YWx1ZTpmdW5jdGlvbiBzZXRTdGF0ZUtleSh0YWcpe3ZhciBzdGF0ZUtleT10aGlzLnN0YXRlS2V5LGtleT10aGlzLmtleTt0aGlzLnN0YXRlS2V5PXRoaXMua2V5Kyh0YWc9PW51bGw/Jyc6Jy4nK3RhZyl9fSx7a2V5OidzdGF0ZUxvYWQnLHZhbHVlOmZ1bmN0aW9uIHN0YXRlTG9hZCgpe3ZhciBzdG9yZT10aGlzLnN0b3JlLHN0YXRlS2V5PXRoaXMuc3RhdGVLZXksaW5pdGlhbFN0YXRlPXRoaXMuaW5pdGlhbFN0YXRlLHByb3BzPXRoaXMucHJvcHM7c3RvcmUubG9hZCh0aGlzLHN0YXRlS2V5LHR5cGVvZiBpbml0aWFsU3RhdGU9PSdmdW5jdGlvbic/aW5pdGlhbFN0YXRlKHByb3BzKTppbml0aWFsU3RhdGUpfX0se2tleTonc3RhdGVTYXZlJyx2YWx1ZTpmdW5jdGlvbiBzdGF0ZVNhdmUoKXt2YXIgc3RvcmU9dGhpcy5zdG9yZSxzdGF0ZUtleT10aGlzLnN0YXRlS2V5O3N0b3JlLnNhdmUodGhpcyxzdGF0ZUtleSl9fV0pO2Z1bmN0aW9uIENvbXBvbmVudE91dGVyKHByb3BzKXtfY2xhc3NDYWxsQ2hlY2sodGhpcyxDb21wb25lbnRPdXRlcik7dmFyIF90aGlzMj1fcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLChDb21wb25lbnRPdXRlci5fX3Byb3RvX198fE9iamVjdC5nZXRQcm90b3R5cGVPZihDb21wb25lbnRPdXRlcikpLmNhbGwodGhpcyxwcm9wcykpO3ZhciBzdG9yZT1wcm9wcy5zdG9yZSx0YWc9cHJvcHMudGFnO190aGlzMi5zdG9yZT1zdG9yZTtfdGhpczIudGFnPXRhZztfdGhpczIua2V5PWtleTtfdGhpczIuaW5pdGlhbFN0YXRlPWluaXRpYWxTdGF0ZTtfdGhpczIuc2V0U3RhdGVLZXkodGFnKTtfdGhpczIuc3RhdGVMb2FkKCk7cmV0dXJuIF90aGlzMn1fY3JlYXRlQ2xhc3MoQ29tcG9uZW50T3V0ZXIsW3trZXk6J2NvbXBvbmVudFdpbGxVbm1vdW50Jyx2YWx1ZTpmdW5jdGlvbiBjb21wb25lbnRXaWxsVW5tb3VudCgpe3RoaXMuc3RhdGVTYXZlKCl9fSx7a2V5Oidjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzJyx2YWx1ZTpmdW5jdGlvbiBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5ld1Byb3BzKXt2YXIgb2xkVGFnPXRoaXMucHJvcHMudGFnO3ZhciB0YWc9bmV3UHJvcHMudGFnO2lmKG9sZFRhZyE9PXRhZyl7dGhpcy5zdGF0ZVNhdmUoKTt0aGlzLnNldFN0YXRlS2V5KHRhZyk7dGhpcy5zdGF0ZUxvYWQoKX19fV0pO3JldHVybiBDb21wb25lbnRPdXRlcn0oQ29tcG9uZW50SW5uZXIpO3JldHVybiBDb21wb25lbnRPdXRlcn07IiwiXCJ1c2Ugc3RyaWN0XCI7T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOnRydWV9KTt2YXIgbHNIYXM9ZXhwb3J0cy5sc0hhcz1mdW5jdGlvbiBsc0hhcyhrZXkpe3JldHVybiBsb2NhbFN0b3JhZ2UuZ2V0SXRlbShrZXkpIT1udWxsfTt2YXIgbHNHZXQ9ZXhwb3J0cy5sc0dldD1mdW5jdGlvbiBsc0dldChrZXkpe2lmKGxvY2FsU3RvcmFnZT09bnVsbCl7cmV0dXJuIG51bGx9dmFyIHZhbD1sb2NhbFN0b3JhZ2UuZ2V0SXRlbShrZXkpO3JldHVybiB2YWw9PW51bGw/bnVsbDpKU09OLnBhcnNlKHZhbCl9O3ZhciBsc1NldD1leHBvcnRzLmxzU2V0PWZ1bmN0aW9uIGxzU2V0KGtleSx2YWwpe2lmKGxvY2FsU3RvcmFnZT09bnVsbCl7cmV0dXJufWxvY2FsU3RvcmFnZS5zZXRJdGVtKGtleSxKU09OLnN0cmluZ2lmeSh2YWwpKX07IiwiXCJ1c2Ugc3RyaWN0XCI7T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOnRydWV9KTt2YXIgX2NyZWF0ZUNsYXNzPWZ1bmN0aW9uKCl7ZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQscHJvcHMpe2Zvcih2YXIgaT0wO2k8cHJvcHMubGVuZ3RoO2krKyl7dmFyIGRlc2NyaXB0b3I9cHJvcHNbaV07ZGVzY3JpcHRvci5lbnVtZXJhYmxlPWRlc2NyaXB0b3IuZW51bWVyYWJsZXx8ZmFsc2U7ZGVzY3JpcHRvci5jb25maWd1cmFibGU9dHJ1ZTtpZihcInZhbHVlXCJpbiBkZXNjcmlwdG9yKWRlc2NyaXB0b3Iud3JpdGFibGU9dHJ1ZTtPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LGRlc2NyaXB0b3Iua2V5LGRlc2NyaXB0b3IpfX1yZXR1cm4gZnVuY3Rpb24oQ29uc3RydWN0b3IscHJvdG9Qcm9wcyxzdGF0aWNQcm9wcyl7aWYocHJvdG9Qcm9wcylkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSxwcm90b1Byb3BzKTtpZihzdGF0aWNQcm9wcylkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLHN0YXRpY1Byb3BzKTtyZXR1cm4gQ29uc3RydWN0b3J9fSgpO2Z1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSxDb25zdHJ1Y3Rvcil7aWYoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSl7dGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKX19dmFyIFN0b3JlPWZ1bmN0aW9uKCl7ZnVuY3Rpb24gU3RvcmUoKXtfY2xhc3NDYWxsQ2hlY2sodGhpcyxTdG9yZSk7dGhpcy5kYXRhPW5ldyBNYXB9X2NyZWF0ZUNsYXNzKFN0b3JlLFt7a2V5OlwibG9hZFwiLHZhbHVlOmZ1bmN0aW9uIGxvYWQoY29tcG9uZW50LGtleSxpbml0aWFsU3RhdGUpe2lmKHRoaXMuZGF0YS5oYXMoa2V5KSl7Y29tcG9uZW50LnN0YXRlPXRoaXMuZGF0YS5nZXQoa2V5KX1lbHNle2NvbXBvbmVudC5zdGF0ZT1pbml0aWFsU3RhdGV9fX0se2tleTpcInNhdmVcIix2YWx1ZTpmdW5jdGlvbiBzYXZlKGNvbXBvbmVudCxrZXkpe3RoaXMuZGF0YS5zZXQoa2V5LGNvbXBvbmVudC5zdGF0ZSl9fSx7a2V5OlwiZ2V0XCIsdmFsdWU6ZnVuY3Rpb24gZ2V0KGtleSl7aWYoIXRoaXMuZGF0YS5oYXMoa2V5KSl7dGhpcy5kYXRhLnNldChrZXkse30pfXJldHVybiB0aGlzLmRhdGEuZ2V0KGtleSl9fV0pO3JldHVybiBTdG9yZX0oKTtleHBvcnRzLmRlZmF1bHQ9U3RvcmU7IiwiJ3VzZSBzdHJpY3QnO09iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCdfX2VzTW9kdWxlJyx7dmFsdWU6dHJ1ZX0pO3ZhciBfZXh0ZW5kcz1PYmplY3QuYXNzaWdufHxmdW5jdGlvbih0YXJnZXQpe2Zvcih2YXIgaT0xO2k8YXJndW1lbnRzLmxlbmd0aDtpKyspe3ZhciBzb3VyY2U9YXJndW1lbnRzW2ldO2Zvcih2YXIga2V5IGluIHNvdXJjZSl7aWYoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSxrZXkpKXt0YXJnZXRba2V5XT1zb3VyY2Vba2V5XX19fXJldHVybiB0YXJnZXR9O2V4cG9ydHMuY29sdW1uU3R5bGU9Y29sdW1uU3R5bGU7dmFyIHNjcm9sbEJhcldpZHRoPTUwO3ZhciB0b3BIZWlnaHQ9ODA7dmFyIHdpbkhlaWdodD13aW5kb3cuaW5uZXJIZWlnaHQtdG9wSGVpZ2h0O3ZhciBkaXZXaWR0aFNwZWM9e2xlZnQ6MTIwLHJpZ2h0TGVmdDozODB9O3ZhciBkaXZXaWR0aD1fZXh0ZW5kcyh7fSxkaXZXaWR0aFNwZWMse3JpZ2h0OndpbmRvdy5pbm5lcldpZHRoLWRpdldpZHRoU3BlYy5sZWZ0LXNjcm9sbEJhcldpZHRoLHJpZ2h0UmlnaHQ6d2luZG93LmlubmVyV2lkdGgtZGl2V2lkdGhTcGVjLmxlZnQtZGl2V2lkdGhTcGVjLnJpZ2h0TGVmdC0yKnNjcm9sbEJhcldpZHRofSk7dmFyIGZsb2F0U3BlYz17bGVmdDonbGVmdCcscmlnaHQ6J3JpZ2h0JyxyaWdodExlZnQ6J2xlZnQnLHJpZ2h0UmlnaHQ6J3JpZ2h0J307ZnVuY3Rpb24gY29sdW1uU3R5bGUoa2luZCl7cmV0dXJue3dpZHRoOmRpdldpZHRoW2tpbmRdLGhlaWdodDp3aW5IZWlnaHQsb3ZlcmZsb3c6J2F1dG8nLCdXZWJraXRPdmVyZmxvd1Njcm9sbGluZyc6J3RvdWNoJyxmbG9hdDpmbG9hdFNwZWNba2luZF0sJ3BhZGRpbmdMZWZ0JzpraW5kPT0nJz8nMWVtJzonMGVtJywncGFkZGluZ1JpZ2h0JzpraW5kPT0nJz8nMWVtJzonMGVtJ319Il19
