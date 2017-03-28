require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
/*!
 * deep-diff.
 * Licensed under the MIT License.
 */
;(function(root, factory) {
  'use strict';
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([], function() {
      return factory();
    });
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    // Browser globals (root is window)
    root.DeepDiff = factory();
  }
}(this, function(undefined) {
  'use strict';

  var $scope, conflict, conflictResolution = [];
  if (typeof global === 'object' && global) {
    $scope = global;
  } else if (typeof window !== 'undefined') {
    $scope = window;
  } else {
    $scope = {};
  }
  conflict = $scope.DeepDiff;
  if (conflict) {
    conflictResolution.push(
      function() {
        if ('undefined' !== typeof conflict && $scope.DeepDiff === accumulateDiff) {
          $scope.DeepDiff = conflict;
          conflict = undefined;
        }
      });
  }

  // nodejs compatible on server side and in the browser.
  function inherits(ctor, superCtor) {
    ctor.super_ = superCtor;
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  }

  function Diff(kind, path) {
    Object.defineProperty(this, 'kind', {
      value: kind,
      enumerable: true
    });
    if (path && path.length) {
      Object.defineProperty(this, 'path', {
        value: path,
        enumerable: true
      });
    }
  }

  function DiffEdit(path, origin, value) {
    DiffEdit.super_.call(this, 'E', path);
    Object.defineProperty(this, 'lhs', {
      value: origin,
      enumerable: true
    });
    Object.defineProperty(this, 'rhs', {
      value: value,
      enumerable: true
    });
  }
  inherits(DiffEdit, Diff);

  function DiffNew(path, value) {
    DiffNew.super_.call(this, 'N', path);
    Object.defineProperty(this, 'rhs', {
      value: value,
      enumerable: true
    });
  }
  inherits(DiffNew, Diff);

  function DiffDeleted(path, value) {
    DiffDeleted.super_.call(this, 'D', path);
    Object.defineProperty(this, 'lhs', {
      value: value,
      enumerable: true
    });
  }
  inherits(DiffDeleted, Diff);

  function DiffArray(path, index, item) {
    DiffArray.super_.call(this, 'A', path);
    Object.defineProperty(this, 'index', {
      value: index,
      enumerable: true
    });
    Object.defineProperty(this, 'item', {
      value: item,
      enumerable: true
    });
  }
  inherits(DiffArray, Diff);

  function arrayRemove(arr, from, to) {
    var rest = arr.slice((to || from) + 1 || arr.length);
    arr.length = from < 0 ? arr.length + from : from;
    arr.push.apply(arr, rest);
    return arr;
  }

  function realTypeOf(subject) {
    var type = typeof subject;
    if (type !== 'object') {
      return type;
    }

    if (subject === Math) {
      return 'math';
    } else if (subject === null) {
      return 'null';
    } else if (Array.isArray(subject)) {
      return 'array';
    } else if (Object.prototype.toString.call(subject) === '[object Date]') {
      return 'date';
    } else if (typeof subject.toString !== 'undefined' && /^\/.*\//.test(subject.toString())) {
      return 'regexp';
    }
    return 'object';
  }

  function deepDiff(lhs, rhs, changes, prefilter, path, key, stack) {
    path = path || [];
    var currentPath = path.slice(0);
    if (typeof key !== 'undefined') {
      if (prefilter) {
        if (typeof(prefilter) === 'function' && prefilter(currentPath, key)) { return; }
        else if (typeof(prefilter) === 'object') {
          if (prefilter.prefilter && prefilter.prefilter(currentPath, key)) { return; }
          if (prefilter.normalize) {
            var alt = prefilter.normalize(currentPath, key, lhs, rhs);
            if (alt) {
              lhs = alt[0];
              rhs = alt[1];
            }
          }
        }
      }
      currentPath.push(key);
    }

    // Use string comparison for regexes
    if (realTypeOf(lhs) === 'regexp' && realTypeOf(rhs) === 'regexp') {
      lhs = lhs.toString();
      rhs = rhs.toString();
    }

    var ltype = typeof lhs;
    var rtype = typeof rhs;
    if (ltype === 'undefined') {
      if (rtype !== 'undefined') {
        changes(new DiffNew(currentPath, rhs));
      }
    } else if (rtype === 'undefined') {
      changes(new DiffDeleted(currentPath, lhs));
    } else if (realTypeOf(lhs) !== realTypeOf(rhs)) {
      changes(new DiffEdit(currentPath, lhs, rhs));
    } else if (Object.prototype.toString.call(lhs) === '[object Date]' && Object.prototype.toString.call(rhs) === '[object Date]' && ((lhs - rhs) !== 0)) {
      changes(new DiffEdit(currentPath, lhs, rhs));
    } else if (ltype === 'object' && lhs !== null && rhs !== null) {
      stack = stack || [];
      if (stack.indexOf(lhs) < 0) {
        stack.push(lhs);
        if (Array.isArray(lhs)) {
          var i, len = lhs.length;
          for (i = 0; i < lhs.length; i++) {
            if (i >= rhs.length) {
              changes(new DiffArray(currentPath, i, new DiffDeleted(undefined, lhs[i])));
            } else {
              deepDiff(lhs[i], rhs[i], changes, prefilter, currentPath, i, stack);
            }
          }
          while (i < rhs.length) {
            changes(new DiffArray(currentPath, i, new DiffNew(undefined, rhs[i++])));
          }
        } else {
          var akeys = Object.keys(lhs);
          var pkeys = Object.keys(rhs);
          akeys.forEach(function(k, i) {
            var other = pkeys.indexOf(k);
            if (other >= 0) {
              deepDiff(lhs[k], rhs[k], changes, prefilter, currentPath, k, stack);
              pkeys = arrayRemove(pkeys, other);
            } else {
              deepDiff(lhs[k], undefined, changes, prefilter, currentPath, k, stack);
            }
          });
          pkeys.forEach(function(k) {
            deepDiff(undefined, rhs[k], changes, prefilter, currentPath, k, stack);
          });
        }
        stack.length = stack.length - 1;
      }
    } else if (lhs !== rhs) {
      if (!(ltype === 'number' && isNaN(lhs) && isNaN(rhs))) {
        changes(new DiffEdit(currentPath, lhs, rhs));
      }
    }
  }

  function accumulateDiff(lhs, rhs, prefilter, accum) {
    accum = accum || [];
    deepDiff(lhs, rhs,
      function(diff) {
        if (diff) {
          accum.push(diff);
        }
      },
      prefilter);
    return (accum.length) ? accum : undefined;
  }

  function applyArrayChange(arr, index, change) {
    if (change.path && change.path.length) {
      var it = arr[index],
          i, u = change.path.length - 1;
      for (i = 0; i < u; i++) {
        it = it[change.path[i]];
      }
      switch (change.kind) {
        case 'A':
          applyArrayChange(it[change.path[i]], change.index, change.item);
          break;
        case 'D':
          delete it[change.path[i]];
          break;
        case 'E':
        case 'N':
          it[change.path[i]] = change.rhs;
          break;
      }
    } else {
      switch (change.kind) {
        case 'A':
          applyArrayChange(arr[index], change.index, change.item);
          break;
        case 'D':
          arr = arrayRemove(arr, index);
          break;
        case 'E':
        case 'N':
          arr[index] = change.rhs;
          break;
      }
    }
    return arr;
  }

  function applyChange(target, source, change) {
    if (target && source && change && change.kind) {
      var it = target,
          i = -1,
          last = change.path ? change.path.length - 1 : 0;
      while (++i < last) {
        if (typeof it[change.path[i]] === 'undefined') {
          it[change.path[i]] = (typeof change.path[i] === 'number') ? [] : {};
        }
        it = it[change.path[i]];
      }
      switch (change.kind) {
        case 'A':
          applyArrayChange(change.path ? it[change.path[i]] : it, change.index, change.item);
          break;
        case 'D':
          delete it[change.path[i]];
          break;
        case 'E':
        case 'N':
          it[change.path[i]] = change.rhs;
          break;
      }
    }
  }

  function revertArrayChange(arr, index, change) {
    if (change.path && change.path.length) {
      // the structure of the object at the index has changed...
      var it = arr[index],
          i, u = change.path.length - 1;
      for (i = 0; i < u; i++) {
        it = it[change.path[i]];
      }
      switch (change.kind) {
        case 'A':
          revertArrayChange(it[change.path[i]], change.index, change.item);
          break;
        case 'D':
          it[change.path[i]] = change.lhs;
          break;
        case 'E':
          it[change.path[i]] = change.lhs;
          break;
        case 'N':
          delete it[change.path[i]];
          break;
      }
    } else {
      // the array item is different...
      switch (change.kind) {
        case 'A':
          revertArrayChange(arr[index], change.index, change.item);
          break;
        case 'D':
          arr[index] = change.lhs;
          break;
        case 'E':
          arr[index] = change.lhs;
          break;
        case 'N':
          arr = arrayRemove(arr, index);
          break;
      }
    }
    return arr;
  }

  function revertChange(target, source, change) {
    if (target && source && change && change.kind) {
      var it = target,
          i, u;
      u = change.path.length - 1;
      for (i = 0; i < u; i++) {
        if (typeof it[change.path[i]] === 'undefined') {
          it[change.path[i]] = {};
        }
        it = it[change.path[i]];
      }
      switch (change.kind) {
        case 'A':
          // Array was modified...
          // it will be an array...
          revertArrayChange(it[change.path[i]], change.index, change.item);
          break;
        case 'D':
          // Item was deleted...
          it[change.path[i]] = change.lhs;
          break;
        case 'E':
          // Item was edited...
          it[change.path[i]] = change.lhs;
          break;
        case 'N':
          // Item is new...
          delete it[change.path[i]];
          break;
      }
    }
  }

  function applyDiff(target, source, filter) {
    if (target && source) {
      var onChange = function(change) {
        if (!filter || filter(target, source, change)) {
          applyChange(target, source, change);
        }
      };
      deepDiff(target, source, onChange);
    }
  }

  Object.defineProperties(accumulateDiff, {

    diff: {
      value: accumulateDiff,
      enumerable: true
    },
    observableDiff: {
      value: deepDiff,
      enumerable: true
    },
    applyDiff: {
      value: applyDiff,
      enumerable: true
    },
    applyChange: {
      value: applyChange,
      enumerable: true
    },
    revertChange: {
      value: revertChange,
      enumerable: true
    },
    isConflict: {
      value: function() {
        return 'undefined' !== typeof conflict;
      },
      enumerable: true
    },
    noConflict: {
      value: function() {
        if (conflictResolution) {
          conflictResolution.forEach(function(it) {
            it();
          });
          conflictResolution = null;
        }
        return accumulateDiff;
      },
      enumerable: true
    }
  });

  return accumulateDiff;
}));

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],2:[function(require,module,exports){
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

var emptyObject = {};

if ("development" !== 'production') {
  Object.freeze(emptyObject);
}

module.exports = emptyObject;
},{}],4:[function(require,module,exports){
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
},{}],5:[function(require,module,exports){
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
},{"./emptyFunction":2}],6:[function(require,module,exports){
var overArg = require('./_overArg');

/** Built-in value references. */
var getPrototype = overArg(Object.getPrototypeOf, Object);

module.exports = getPrototype;

},{"./_overArg":7}],7:[function(require,module,exports){
/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

module.exports = overArg;

},{}],8:[function(require,module,exports){
/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

module.exports = isObjectLike;

},{}],9:[function(require,module,exports){
var getPrototype = require('./_getPrototype'),
    isObjectLike = require('./isObjectLike');

/** `Object#toString` result references. */
var objectTag = '[object Object]';

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to infer the `Object` constructor. */
var objectCtorString = funcToString.call(Object);

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @static
 * @memberOf _
 * @since 0.8.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */
function isPlainObject(value) {
  if (!isObjectLike(value) || objectToString.call(value) != objectTag) {
    return false;
  }
  var proto = getPrototype(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
  return (typeof Ctor == 'function' &&
    Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString);
}

module.exports = isPlainObject;

},{"./_getPrototype":6,"./isObjectLike":8}],10:[function(require,module,exports){
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

},{}],11:[function(require,module,exports){
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

},{}],12:[function(require,module,exports){
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
},{}],13:[function(require,module,exports){
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
},{"./reactProdInvariant":34,"fbjs/lib/invariant":4}],14:[function(require,module,exports){
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
},{"./ReactChildren":15,"./ReactClass":16,"./ReactComponent":17,"./ReactDOMFactories":20,"./ReactElement":21,"./ReactElementValidator":23,"./ReactPropTypes":26,"./ReactPureComponent":28,"./ReactVersion":29,"./onlyChild":33,"fbjs/lib/warning":5,"object-assign":10}],15:[function(require,module,exports){
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
},{"./PooledClass":13,"./ReactElement":21,"./traverseAllChildren":35,"fbjs/lib/emptyFunction":2}],16:[function(require,module,exports){
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
},{"./ReactComponent":17,"./ReactElement":21,"./ReactNoopUpdateQueue":24,"./ReactPropTypeLocationNames":25,"./reactProdInvariant":34,"fbjs/lib/emptyObject":3,"fbjs/lib/invariant":4,"fbjs/lib/warning":5,"object-assign":10}],17:[function(require,module,exports){
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
},{"./ReactNoopUpdateQueue":24,"./canDefineProperty":30,"./reactProdInvariant":34,"fbjs/lib/emptyObject":3,"fbjs/lib/invariant":4,"fbjs/lib/warning":5}],18:[function(require,module,exports){
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
},{"./ReactCurrentOwner":19,"./reactProdInvariant":34,"fbjs/lib/invariant":4,"fbjs/lib/warning":5}],19:[function(require,module,exports){
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
},{}],20:[function(require,module,exports){
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
},{"./ReactElement":21,"./ReactElementValidator":23}],21:[function(require,module,exports){
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
},{"./ReactCurrentOwner":19,"./ReactElementSymbol":22,"./canDefineProperty":30,"fbjs/lib/warning":5,"object-assign":10}],22:[function(require,module,exports){
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
},{}],23:[function(require,module,exports){
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
},{"./ReactComponentTreeHook":18,"./ReactCurrentOwner":19,"./ReactElement":21,"./canDefineProperty":30,"./checkReactTypeSpec":31,"./getIteratorFn":32,"fbjs/lib/warning":5}],24:[function(require,module,exports){
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
},{"fbjs/lib/warning":5}],25:[function(require,module,exports){
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
},{}],26:[function(require,module,exports){
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
},{"./ReactElement":21,"./ReactPropTypeLocationNames":25,"./ReactPropTypesSecret":27,"./getIteratorFn":32,"fbjs/lib/emptyFunction":2,"fbjs/lib/warning":5}],27:[function(require,module,exports){
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
},{"./ReactComponent":17,"./ReactNoopUpdateQueue":24,"fbjs/lib/emptyObject":3,"object-assign":10}],29:[function(require,module,exports){
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
},{}],30:[function(require,module,exports){
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
},{}],31:[function(require,module,exports){
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

},{"./ReactComponentTreeHook":18,"./ReactPropTypeLocationNames":25,"./ReactPropTypesSecret":27,"./reactProdInvariant":34,"_process":11,"fbjs/lib/invariant":4,"fbjs/lib/warning":5}],32:[function(require,module,exports){
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
},{}],33:[function(require,module,exports){
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
},{"./ReactElement":21,"./reactProdInvariant":34,"fbjs/lib/invariant":4}],34:[function(require,module,exports){
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
},{}],35:[function(require,module,exports){
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
},{"./KeyEscapeUtils":12,"./ReactCurrentOwner":19,"./ReactElementSymbol":22,"./getIteratorFn":32,"./reactProdInvariant":34,"fbjs/lib/invariant":4,"fbjs/lib/warning":5}],36:[function(require,module,exports){
'use strict';

module.exports = require('./lib/React');

},{"./lib/React":14}],37:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.printBuffer = printBuffer;

var _helpers = require('./helpers');

var _diff = require('./diff');

var _diff2 = _interopRequireDefault(_diff);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * Get log level string based on supplied params
 *
 * @param {string | function | object} level - console[level]
 * @param {object} action - selected action
 * @param {array} payload - selected payload
 * @param {string} type - log entry type
 *
 * @returns {string} level
 */
function getLogLevel(level, action, payload, type) {
  switch (typeof level === 'undefined' ? 'undefined' : _typeof(level)) {
    case 'object':
      return typeof level[type] === 'function' ? level[type].apply(level, _toConsumableArray(payload)) : level[type];
    case 'function':
      return level(action);
    default:
      return level;
  }
}

function defaultTitleFormatter(options) {
  var timestamp = options.timestamp,
      duration = options.duration;


  return function (action, time, took) {
    var parts = ['action'];

    parts.push('%c' + String(action.type));
    if (timestamp) parts.push('%c@ ' + time);
    if (duration) parts.push('%c(in ' + took.toFixed(2) + ' ms)');

    return parts.join(' ');
  };
}

function printBuffer(buffer, options) {
  var logger = options.logger,
      actionTransformer = options.actionTransformer,
      _options$titleFormatt = options.titleFormatter,
      titleFormatter = _options$titleFormatt === undefined ? defaultTitleFormatter(options) : _options$titleFormatt,
      collapsed = options.collapsed,
      colors = options.colors,
      level = options.level,
      diff = options.diff;


  buffer.forEach(function (logEntry, key) {
    var started = logEntry.started,
        startedTime = logEntry.startedTime,
        action = logEntry.action,
        prevState = logEntry.prevState,
        error = logEntry.error;
    var took = logEntry.took,
        nextState = logEntry.nextState;

    var nextEntry = buffer[key + 1];

    if (nextEntry) {
      nextState = nextEntry.prevState;
      took = nextEntry.started - started;
    }

    // Message
    var formattedAction = actionTransformer(action);
    var isCollapsed = typeof collapsed === 'function' ? collapsed(function () {
      return nextState;
    }, action, logEntry) : collapsed;

    var formattedTime = (0, _helpers.formatTime)(startedTime);
    var titleCSS = colors.title ? 'color: ' + colors.title(formattedAction) + ';' : '';
    var headerCSS = ['color: gray; font-weight: lighter;'];
    headerCSS.push(titleCSS);
    if (options.timestamp) headerCSS.push('color: gray; font-weight: lighter;');
    if (options.duration) headerCSS.push('color: gray; font-weight: lighter;');
    var title = titleFormatter(formattedAction, formattedTime, took);

    // Render
    try {
      if (isCollapsed) {
        if (colors.title) logger.groupCollapsed.apply(logger, ['%c ' + title].concat(headerCSS));else logger.groupCollapsed(title);
      } else {
        if (colors.title) logger.group.apply(logger, ['%c ' + title].concat(headerCSS));else logger.group(title);
      }
    } catch (e) {
      logger.log(title);
    }

    var prevStateLevel = getLogLevel(level, formattedAction, [prevState], 'prevState');
    var actionLevel = getLogLevel(level, formattedAction, [formattedAction], 'action');
    var errorLevel = getLogLevel(level, formattedAction, [error, prevState], 'error');
    var nextStateLevel = getLogLevel(level, formattedAction, [nextState], 'nextState');

    if (prevStateLevel) {
      if (colors.prevState) logger[prevStateLevel]('%c prev state', 'color: ' + colors.prevState(prevState) + '; font-weight: bold', prevState);else logger[prevStateLevel]('prev state', prevState);
    }

    if (actionLevel) {
      if (colors.action) logger[actionLevel]('%c action    ', 'color: ' + colors.action(formattedAction) + '; font-weight: bold', formattedAction);else logger[actionLevel]('action    ', formattedAction);
    }

    if (error && errorLevel) {
      if (colors.error) logger[errorLevel]('%c error     ', 'color: ' + colors.error(error, prevState) + '; font-weight: bold;', error);else logger[errorLevel]('error     ', error);
    }

    if (nextStateLevel) {
      if (colors.nextState) logger[nextStateLevel]('%c next state', 'color: ' + colors.nextState(nextState) + '; font-weight: bold', nextState);else logger[nextStateLevel]('next state', nextState);
    }

    if (diff) {
      (0, _diff2.default)(prevState, nextState, logger, isCollapsed);
    }

    try {
      logger.groupEnd();
    } catch (e) {
      logger.log('\u2014\u2014 log end \u2014\u2014');
    }
  });
}
},{"./diff":39,"./helpers":40}],38:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  level: "log",
  logger: console,
  logErrors: true,
  collapsed: undefined,
  predicate: undefined,
  duration: false,
  timestamp: true,
  stateTransformer: function stateTransformer(state) {
    return state;
  },
  actionTransformer: function actionTransformer(action) {
    return action;
  },
  errorTransformer: function errorTransformer(error) {
    return error;
  },
  colors: {
    title: function title() {
      return "inherit";
    },
    prevState: function prevState() {
      return "#9E9E9E";
    },
    action: function action() {
      return "#03A9F4";
    },
    nextState: function nextState() {
      return "#4CAF50";
    },
    error: function error() {
      return "#F20404";
    }
  },
  diff: false,
  diffPredicate: undefined,

  // Deprecated options
  transformer: undefined
};
module.exports = exports["default"];
},{}],39:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = diffLogger;

var _deepDiff = require('deep-diff');

var _deepDiff2 = _interopRequireDefault(_deepDiff);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// https://github.com/flitbit/diff#differences
var dictionary = {
  'E': {
    color: '#2196F3',
    text: 'CHANGED:'
  },
  'N': {
    color: '#4CAF50',
    text: 'ADDED:'
  },
  'D': {
    color: '#F44336',
    text: 'DELETED:'
  },
  'A': {
    color: '#2196F3',
    text: 'ARRAY:'
  }
};

function style(kind) {
  return 'color: ' + dictionary[kind].color + '; font-weight: bold';
}

function render(diff) {
  var kind = diff.kind,
      path = diff.path,
      lhs = diff.lhs,
      rhs = diff.rhs,
      index = diff.index,
      item = diff.item;


  switch (kind) {
    case 'E':
      return [path.join('.'), lhs, '\u2192', rhs];
    case 'N':
      return [path.join('.'), rhs];
    case 'D':
      return [path.join('.')];
    case 'A':
      return [path.join('.') + '[' + index + ']', item];
    default:
      return [];
  }
}

function diffLogger(prevState, newState, logger, isCollapsed) {
  var diff = (0, _deepDiff2.default)(prevState, newState);

  try {
    if (isCollapsed) {
      logger.groupCollapsed('diff');
    } else {
      logger.group('diff');
    }
  } catch (e) {
    logger.log('diff');
  }

  if (diff) {
    diff.forEach(function (elem) {
      var kind = elem.kind;

      var output = render(elem);

      logger.log.apply(logger, ['%c ' + dictionary[kind].text, style(kind)].concat(_toConsumableArray(output)));
    });
  } else {
    logger.log('\u2014\u2014 no diff \u2014\u2014');
  }

  try {
    logger.groupEnd();
  } catch (e) {
    logger.log('\u2014\u2014 diff end \u2014\u2014 ');
  }
}
module.exports = exports['default'];
},{"deep-diff":1}],40:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var repeat = exports.repeat = function repeat(str, times) {
  return new Array(times + 1).join(str);
};

var pad = exports.pad = function pad(num, maxLength) {
  return repeat("0", maxLength - num.toString().length) + num;
};

var formatTime = exports.formatTime = function formatTime(time) {
  return pad(time.getHours(), 2) + ":" + pad(time.getMinutes(), 2) + ":" + pad(time.getSeconds(), 2) + "." + pad(time.getMilliseconds(), 3);
};

// Use performance API if it's available in order to get better precision
var timer = exports.timer = typeof performance !== "undefined" && performance !== null && typeof performance.now === "function" ? performance : Date;
},{}],41:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logger = exports.createLogger = exports.defaults = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _core = require('./core');

var _helpers = require('./helpers');

var _defaults = require('./defaults');

var _defaults2 = _interopRequireDefault(_defaults);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Creates logger with following options
 *
 * @namespace
 * @param {object} options - options for logger
 * @param {string | function | object} options.level - console[level]
 * @param {boolean} options.duration - print duration of each action?
 * @param {boolean} options.timestamp - print timestamp with each action?
 * @param {object} options.colors - custom colors
 * @param {object} options.logger - implementation of the `console` API
 * @param {boolean} options.logErrors - should errors in action execution be caught, logged, and re-thrown?
 * @param {boolean} options.collapsed - is group collapsed?
 * @param {boolean} options.predicate - condition which resolves logger behavior
 * @param {function} options.stateTransformer - transform state before print
 * @param {function} options.actionTransformer - transform action before print
 * @param {function} options.errorTransformer - transform error before print
 *
 * @returns {function} logger middleware
 */
function createLogger() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var loggerOptions = _extends({}, _defaults2.default, options);

  var logger = loggerOptions.logger,
      stateTransformer = loggerOptions.stateTransformer,
      errorTransformer = loggerOptions.errorTransformer,
      predicate = loggerOptions.predicate,
      logErrors = loggerOptions.logErrors,
      diffPredicate = loggerOptions.diffPredicate;

  // Return if 'console' object is not defined

  if (typeof logger === 'undefined') {
    return function () {
      return function (next) {
        return function (action) {
          return next(action);
        };
      };
    };
  }

  // Detect if 'createLogger' was passed directly to 'applyMiddleware'.
  if (options.getState && options.dispatch) {
    // eslint-disable-next-line no-console
    console.error('[redux-logger] redux-logger not installed. Make sure to pass logger instance as middleware:\n// Logger with default options\nimport { logger } from \'redux-logger\'\nconst store = createStore(\n  reducer,\n  applyMiddleware(logger)\n)\n// Or you can create your own logger with custom options http://bit.ly/redux-logger-options\nimport createLogger from \'redux-logger\'\nconst logger = createLogger({\n  // ...options\n});\nconst store = createStore(\n  reducer,\n  applyMiddleware(logger)\n)\n');

    return function () {
      return function (next) {
        return function (action) {
          return next(action);
        };
      };
    };
  }

  var logBuffer = [];

  return function (_ref) {
    var getState = _ref.getState;
    return function (next) {
      return function (action) {
        // Exit early if predicate function returns 'false'
        if (typeof predicate === 'function' && !predicate(getState, action)) {
          return next(action);
        }

        var logEntry = {};

        logBuffer.push(logEntry);

        logEntry.started = _helpers.timer.now();
        logEntry.startedTime = new Date();
        logEntry.prevState = stateTransformer(getState());
        logEntry.action = action;

        var returnedValue = void 0;
        if (logErrors) {
          try {
            returnedValue = next(action);
          } catch (e) {
            logEntry.error = errorTransformer(e);
          }
        } else {
          returnedValue = next(action);
        }

        logEntry.took = _helpers.timer.now() - logEntry.started;
        logEntry.nextState = stateTransformer(getState());

        var diff = loggerOptions.diff && typeof diffPredicate === 'function' ? diffPredicate(getState, action) : loggerOptions.diff;

        (0, _core.printBuffer)(logBuffer, _extends({}, loggerOptions, { diff: diff }));
        logBuffer.length = 0;

        if (logEntry.error) throw logEntry.error;
        return returnedValue;
      };
    };
  };
}

var defaultLogger = function defaultLogger() {
  var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      dispatch = _ref2.dispatch,
      getState = _ref2.getState;

  if (typeof dispatch === 'function' || typeof getState === 'function') {
    return createLogger()({ dispatch: dispatch, getState: getState });
  } else {
    // eslint-disable-next-line no-console
    console.error('\n[redux-logger v3] BREAKING CHANGE\n[redux-logger v3] Since 3.0.0 redux-logger exports by default logger with default settings.\n[redux-logger v3] Change\n[redux-logger v3] import createLogger from \'redux-logger\'\n[redux-logger v3] to\n[redux-logger v3] import { createLogger } from \'redux-logger\'\n');
  }
};

exports.defaults = _defaults2.default;
exports.createLogger = createLogger;
exports.logger = defaultLogger;
exports.default = defaultLogger;
},{"./core":37,"./defaults":38,"./helpers":40}],42:[function(require,module,exports){
'use strict';

exports.__esModule = true;
function createThunkMiddleware(extraArgument) {
  return function (_ref) {
    var dispatch = _ref.dispatch,
        getState = _ref.getState;
    return function (next) {
      return function (action) {
        if (typeof action === 'function') {
          return action(dispatch, getState, extraArgument);
        }

        return next(action);
      };
    };
  };
}

var thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;

exports['default'] = thunk;
},{}],43:[function(require,module,exports){
'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports['default'] = applyMiddleware;

var _compose = require('./compose');

var _compose2 = _interopRequireDefault(_compose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/**
 * Creates a store enhancer that applies middleware to the dispatch method
 * of the Redux store. This is handy for a variety of tasks, such as expressing
 * asynchronous actions in a concise manner, or logging every action payload.
 *
 * See `redux-thunk` package as an example of the Redux middleware.
 *
 * Because middleware is potentially asynchronous, this should be the first
 * store enhancer in the composition chain.
 *
 * Note that each middleware will be given the `dispatch` and `getState` functions
 * as named arguments.
 *
 * @param {...Function} middlewares The middleware chain to be applied.
 * @returns {Function} A store enhancer applying the middleware.
 */
function applyMiddleware() {
  for (var _len = arguments.length, middlewares = Array(_len), _key = 0; _key < _len; _key++) {
    middlewares[_key] = arguments[_key];
  }

  return function (createStore) {
    return function (reducer, preloadedState, enhancer) {
      var store = createStore(reducer, preloadedState, enhancer);
      var _dispatch = store.dispatch;
      var chain = [];

      var middlewareAPI = {
        getState: store.getState,
        dispatch: function dispatch(action) {
          return _dispatch(action);
        }
      };
      chain = middlewares.map(function (middleware) {
        return middleware(middlewareAPI);
      });
      _dispatch = _compose2['default'].apply(undefined, chain)(store.dispatch);

      return _extends({}, store, {
        dispatch: _dispatch
      });
    };
  };
}
},{"./compose":46}],44:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = bindActionCreators;
function bindActionCreator(actionCreator, dispatch) {
  return function () {
    return dispatch(actionCreator.apply(undefined, arguments));
  };
}

/**
 * Turns an object whose values are action creators, into an object with the
 * same keys, but with every function wrapped into a `dispatch` call so they
 * may be invoked directly. This is just a convenience method, as you can call
 * `store.dispatch(MyActionCreators.doSomething())` yourself just fine.
 *
 * For convenience, you can also pass a single function as the first argument,
 * and get a function in return.
 *
 * @param {Function|Object} actionCreators An object whose values are action
 * creator functions. One handy way to obtain it is to use ES6 `import * as`
 * syntax. You may also pass a single function.
 *
 * @param {Function} dispatch The `dispatch` function available on your Redux
 * store.
 *
 * @returns {Function|Object} The object mimicking the original object, but with
 * every action creator wrapped into the `dispatch` call. If you passed a
 * function as `actionCreators`, the return value will also be a single
 * function.
 */
function bindActionCreators(actionCreators, dispatch) {
  if (typeof actionCreators === 'function') {
    return bindActionCreator(actionCreators, dispatch);
  }

  if (typeof actionCreators !== 'object' || actionCreators === null) {
    throw new Error('bindActionCreators expected an object or a function, instead received ' + (actionCreators === null ? 'null' : typeof actionCreators) + '. ' + 'Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?');
  }

  var keys = Object.keys(actionCreators);
  var boundActionCreators = {};
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var actionCreator = actionCreators[key];
    if (typeof actionCreator === 'function') {
      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
    }
  }
  return boundActionCreators;
}
},{}],45:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = combineReducers;

var _createStore = require('./createStore');

var _isPlainObject = require('lodash/isPlainObject');

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

var _warning = require('./utils/warning');

var _warning2 = _interopRequireDefault(_warning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function getUndefinedStateErrorMessage(key, action) {
  var actionType = action && action.type;
  var actionName = actionType && '"' + actionType.toString() + '"' || 'an action';

  return 'Given action ' + actionName + ', reducer "' + key + '" returned undefined. ' + 'To ignore an action, you must explicitly return the previous state.';
}

function getUnexpectedStateShapeWarningMessage(inputState, reducers, action, unexpectedKeyCache) {
  var reducerKeys = Object.keys(reducers);
  var argumentName = action && action.type === _createStore.ActionTypes.INIT ? 'preloadedState argument passed to createStore' : 'previous state received by the reducer';

  if (reducerKeys.length === 0) {
    return 'Store does not have a valid reducer. Make sure the argument passed ' + 'to combineReducers is an object whose values are reducers.';
  }

  if (!(0, _isPlainObject2['default'])(inputState)) {
    return 'The ' + argumentName + ' has unexpected type of "' + {}.toString.call(inputState).match(/\s([a-z|A-Z]+)/)[1] + '". Expected argument to be an object with the following ' + ('keys: "' + reducerKeys.join('", "') + '"');
  }

  var unexpectedKeys = Object.keys(inputState).filter(function (key) {
    return !reducers.hasOwnProperty(key) && !unexpectedKeyCache[key];
  });

  unexpectedKeys.forEach(function (key) {
    unexpectedKeyCache[key] = true;
  });

  if (unexpectedKeys.length > 0) {
    return 'Unexpected ' + (unexpectedKeys.length > 1 ? 'keys' : 'key') + ' ' + ('"' + unexpectedKeys.join('", "') + '" found in ' + argumentName + '. ') + 'Expected to find one of the known reducer keys instead: ' + ('"' + reducerKeys.join('", "') + '". Unexpected keys will be ignored.');
  }
}

function assertReducerSanity(reducers) {
  Object.keys(reducers).forEach(function (key) {
    var reducer = reducers[key];
    var initialState = reducer(undefined, { type: _createStore.ActionTypes.INIT });

    if (typeof initialState === 'undefined') {
      throw new Error('Reducer "' + key + '" returned undefined during initialization. ' + 'If the state passed to the reducer is undefined, you must ' + 'explicitly return the initial state. The initial state may ' + 'not be undefined.');
    }

    var type = '@@redux/PROBE_UNKNOWN_ACTION_' + Math.random().toString(36).substring(7).split('').join('.');
    if (typeof reducer(undefined, { type: type }) === 'undefined') {
      throw new Error('Reducer "' + key + '" returned undefined when probed with a random type. ' + ('Don\'t try to handle ' + _createStore.ActionTypes.INIT + ' or other actions in "redux/*" ') + 'namespace. They are considered private. Instead, you must return the ' + 'current state for any unknown actions, unless it is undefined, ' + 'in which case you must return the initial state, regardless of the ' + 'action type. The initial state may not be undefined.');
    }
  });
}

/**
 * Turns an object whose values are different reducer functions, into a single
 * reducer function. It will call every child reducer, and gather their results
 * into a single state object, whose keys correspond to the keys of the passed
 * reducer functions.
 *
 * @param {Object} reducers An object whose values correspond to different
 * reducer functions that need to be combined into one. One handy way to obtain
 * it is to use ES6 `import * as reducers` syntax. The reducers may never return
 * undefined for any action. Instead, they should return their initial state
 * if the state passed to them was undefined, and the current state for any
 * unrecognized action.
 *
 * @returns {Function} A reducer function that invokes every reducer inside the
 * passed object, and builds a state object with the same shape.
 */
function combineReducers(reducers) {
  var reducerKeys = Object.keys(reducers);
  var finalReducers = {};
  for (var i = 0; i < reducerKeys.length; i++) {
    var key = reducerKeys[i];

    if ("development" !== 'production') {
      if (typeof reducers[key] === 'undefined') {
        (0, _warning2['default'])('No reducer provided for key "' + key + '"');
      }
    }

    if (typeof reducers[key] === 'function') {
      finalReducers[key] = reducers[key];
    }
  }
  var finalReducerKeys = Object.keys(finalReducers);

  if ("development" !== 'production') {
    var unexpectedKeyCache = {};
  }

  var sanityError;
  try {
    assertReducerSanity(finalReducers);
  } catch (e) {
    sanityError = e;
  }

  return function combination() {
    var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
    var action = arguments[1];

    if (sanityError) {
      throw sanityError;
    }

    if ("development" !== 'production') {
      var warningMessage = getUnexpectedStateShapeWarningMessage(state, finalReducers, action, unexpectedKeyCache);
      if (warningMessage) {
        (0, _warning2['default'])(warningMessage);
      }
    }

    var hasChanged = false;
    var nextState = {};
    for (var i = 0; i < finalReducerKeys.length; i++) {
      var key = finalReducerKeys[i];
      var reducer = finalReducers[key];
      var previousStateForKey = state[key];
      var nextStateForKey = reducer(previousStateForKey, action);
      if (typeof nextStateForKey === 'undefined') {
        var errorMessage = getUndefinedStateErrorMessage(key, action);
        throw new Error(errorMessage);
      }
      nextState[key] = nextStateForKey;
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    }
    return hasChanged ? nextState : state;
  };
}
},{"./createStore":47,"./utils/warning":49,"lodash/isPlainObject":9}],46:[function(require,module,exports){
"use strict";

exports.__esModule = true;
exports["default"] = compose;
/**
 * Composes single-argument functions from right to left. The rightmost
 * function can take multiple arguments as it provides the signature for
 * the resulting composite function.
 *
 * @param {...Function} funcs The functions to compose.
 * @returns {Function} A function obtained by composing the argument functions
 * from right to left. For example, compose(f, g, h) is identical to doing
 * (...args) => f(g(h(...args))).
 */

function compose() {
  for (var _len = arguments.length, funcs = Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }

  if (funcs.length === 0) {
    return function (arg) {
      return arg;
    };
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  var last = funcs[funcs.length - 1];
  var rest = funcs.slice(0, -1);
  return function () {
    return rest.reduceRight(function (composed, f) {
      return f(composed);
    }, last.apply(undefined, arguments));
  };
}
},{}],47:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports.ActionTypes = undefined;
exports['default'] = createStore;

var _isPlainObject = require('lodash/isPlainObject');

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

var _symbolObservable = require('symbol-observable');

var _symbolObservable2 = _interopRequireDefault(_symbolObservable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/**
 * These are private action types reserved by Redux.
 * For any unknown actions, you must return the current state.
 * If the current state is undefined, you must return the initial state.
 * Do not reference these action types directly in your code.
 */
var ActionTypes = exports.ActionTypes = {
  INIT: '@@redux/INIT'
};

/**
 * Creates a Redux store that holds the state tree.
 * The only way to change the data in the store is to call `dispatch()` on it.
 *
 * There should only be a single store in your app. To specify how different
 * parts of the state tree respond to actions, you may combine several reducers
 * into a single reducer function by using `combineReducers`.
 *
 * @param {Function} reducer A function that returns the next state tree, given
 * the current state tree and the action to handle.
 *
 * @param {any} [preloadedState] The initial state. You may optionally specify it
 * to hydrate the state from the server in universal apps, or to restore a
 * previously serialized user session.
 * If you use `combineReducers` to produce the root reducer function, this must be
 * an object with the same shape as `combineReducers` keys.
 *
 * @param {Function} enhancer The store enhancer. You may optionally specify it
 * to enhance the store with third-party capabilities such as middleware,
 * time travel, persistence, etc. The only store enhancer that ships with Redux
 * is `applyMiddleware()`.
 *
 * @returns {Store} A Redux store that lets you read the state, dispatch actions
 * and subscribe to changes.
 */
function createStore(reducer, preloadedState, enhancer) {
  var _ref2;

  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
    enhancer = preloadedState;
    preloadedState = undefined;
  }

  if (typeof enhancer !== 'undefined') {
    if (typeof enhancer !== 'function') {
      throw new Error('Expected the enhancer to be a function.');
    }

    return enhancer(createStore)(reducer, preloadedState);
  }

  if (typeof reducer !== 'function') {
    throw new Error('Expected the reducer to be a function.');
  }

  var currentReducer = reducer;
  var currentState = preloadedState;
  var currentListeners = [];
  var nextListeners = currentListeners;
  var isDispatching = false;

  function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice();
    }
  }

  /**
   * Reads the state tree managed by the store.
   *
   * @returns {any} The current state tree of your application.
   */
  function getState() {
    return currentState;
  }

  /**
   * Adds a change listener. It will be called any time an action is dispatched,
   * and some part of the state tree may potentially have changed. You may then
   * call `getState()` to read the current state tree inside the callback.
   *
   * You may call `dispatch()` from a change listener, with the following
   * caveats:
   *
   * 1. The subscriptions are snapshotted just before every `dispatch()` call.
   * If you subscribe or unsubscribe while the listeners are being invoked, this
   * will not have any effect on the `dispatch()` that is currently in progress.
   * However, the next `dispatch()` call, whether nested or not, will use a more
   * recent snapshot of the subscription list.
   *
   * 2. The listener should not expect to see all state changes, as the state
   * might have been updated multiple times during a nested `dispatch()` before
   * the listener is called. It is, however, guaranteed that all subscribers
   * registered before the `dispatch()` started will be called with the latest
   * state by the time it exits.
   *
   * @param {Function} listener A callback to be invoked on every dispatch.
   * @returns {Function} A function to remove this change listener.
   */
  function subscribe(listener) {
    if (typeof listener !== 'function') {
      throw new Error('Expected listener to be a function.');
    }

    var isSubscribed = true;

    ensureCanMutateNextListeners();
    nextListeners.push(listener);

    return function unsubscribe() {
      if (!isSubscribed) {
        return;
      }

      isSubscribed = false;

      ensureCanMutateNextListeners();
      var index = nextListeners.indexOf(listener);
      nextListeners.splice(index, 1);
    };
  }

  /**
   * Dispatches an action. It is the only way to trigger a state change.
   *
   * The `reducer` function, used to create the store, will be called with the
   * current state tree and the given `action`. Its return value will
   * be considered the **next** state of the tree, and the change listeners
   * will be notified.
   *
   * The base implementation only supports plain object actions. If you want to
   * dispatch a Promise, an Observable, a thunk, or something else, you need to
   * wrap your store creating function into the corresponding middleware. For
   * example, see the documentation for the `redux-thunk` package. Even the
   * middleware will eventually dispatch plain object actions using this method.
   *
   * @param {Object} action A plain object representing “what changed”. It is
   * a good idea to keep actions serializable so you can record and replay user
   * sessions, or use the time travelling `redux-devtools`. An action must have
   * a `type` property which may not be `undefined`. It is a good idea to use
   * string constants for action types.
   *
   * @returns {Object} For convenience, the same action object you dispatched.
   *
   * Note that, if you use a custom middleware, it may wrap `dispatch()` to
   * return something else (for example, a Promise you can await).
   */
  function dispatch(action) {
    if (!(0, _isPlainObject2['default'])(action)) {
      throw new Error('Actions must be plain objects. ' + 'Use custom middleware for async actions.');
    }

    if (typeof action.type === 'undefined') {
      throw new Error('Actions may not have an undefined "type" property. ' + 'Have you misspelled a constant?');
    }

    if (isDispatching) {
      throw new Error('Reducers may not dispatch actions.');
    }

    try {
      isDispatching = true;
      currentState = currentReducer(currentState, action);
    } finally {
      isDispatching = false;
    }

    var listeners = currentListeners = nextListeners;
    for (var i = 0; i < listeners.length; i++) {
      listeners[i]();
    }

    return action;
  }

  /**
   * Replaces the reducer currently used by the store to calculate the state.
   *
   * You might need this if your app implements code splitting and you want to
   * load some of the reducers dynamically. You might also need this if you
   * implement a hot reloading mechanism for Redux.
   *
   * @param {Function} nextReducer The reducer for the store to use instead.
   * @returns {void}
   */
  function replaceReducer(nextReducer) {
    if (typeof nextReducer !== 'function') {
      throw new Error('Expected the nextReducer to be a function.');
    }

    currentReducer = nextReducer;
    dispatch({ type: ActionTypes.INIT });
  }

  /**
   * Interoperability point for observable/reactive libraries.
   * @returns {observable} A minimal observable of state changes.
   * For more information, see the observable proposal:
   * https://github.com/zenparsing/es-observable
   */
  function observable() {
    var _ref;

    var outerSubscribe = subscribe;
    return _ref = {
      /**
       * The minimal observable subscription method.
       * @param {Object} observer Any object that can be used as an observer.
       * The observer object should have a `next` method.
       * @returns {subscription} An object with an `unsubscribe` method that can
       * be used to unsubscribe the observable from the store, and prevent further
       * emission of values from the observable.
       */
      subscribe: function subscribe(observer) {
        if (typeof observer !== 'object') {
          throw new TypeError('Expected the observer to be an object.');
        }

        function observeState() {
          if (observer.next) {
            observer.next(getState());
          }
        }

        observeState();
        var unsubscribe = outerSubscribe(observeState);
        return { unsubscribe: unsubscribe };
      }
    }, _ref[_symbolObservable2['default']] = function () {
      return this;
    }, _ref;
  }

  // When a store is created, an "INIT" action is dispatched so that every
  // reducer returns their initial state. This effectively populates
  // the initial state tree.
  dispatch({ type: ActionTypes.INIT });

  return _ref2 = {
    dispatch: dispatch,
    subscribe: subscribe,
    getState: getState,
    replaceReducer: replaceReducer
  }, _ref2[_symbolObservable2['default']] = observable, _ref2;
}
},{"lodash/isPlainObject":9,"symbol-observable":50}],48:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports.compose = exports.applyMiddleware = exports.bindActionCreators = exports.combineReducers = exports.createStore = undefined;

var _createStore = require('./createStore');

var _createStore2 = _interopRequireDefault(_createStore);

var _combineReducers = require('./combineReducers');

var _combineReducers2 = _interopRequireDefault(_combineReducers);

var _bindActionCreators = require('./bindActionCreators');

var _bindActionCreators2 = _interopRequireDefault(_bindActionCreators);

var _applyMiddleware = require('./applyMiddleware');

var _applyMiddleware2 = _interopRequireDefault(_applyMiddleware);

var _compose = require('./compose');

var _compose2 = _interopRequireDefault(_compose);

var _warning = require('./utils/warning');

var _warning2 = _interopRequireDefault(_warning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/*
* This is a dummy function to check if the function name has been altered by minification.
* If the function has been minified and NODE_ENV !== 'production', warn the user.
*/
function isCrushed() {}

if ("development" !== 'production' && typeof isCrushed.name === 'string' && isCrushed.name !== 'isCrushed') {
  (0, _warning2['default'])('You are currently using minified code outside of NODE_ENV === \'production\'. ' + 'This means that you are running a slower development build of Redux. ' + 'You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify ' + 'or DefinePlugin for webpack (http://stackoverflow.com/questions/30030031) ' + 'to ensure you have the correct code for your production build.');
}

exports.createStore = _createStore2['default'];
exports.combineReducers = _combineReducers2['default'];
exports.bindActionCreators = _bindActionCreators2['default'];
exports.applyMiddleware = _applyMiddleware2['default'];
exports.compose = _compose2['default'];
},{"./applyMiddleware":43,"./bindActionCreators":44,"./combineReducers":45,"./compose":46,"./createStore":47,"./utils/warning":49}],49:[function(require,module,exports){
'use strict';

exports.__esModule = true;
exports['default'] = warning;
/**
 * Prints a warning in the console if it exists.
 *
 * @param {String} message The warning message.
 * @returns {void}
 */
function warning(message) {
  /* eslint-disable no-console */
  if (typeof console !== 'undefined' && typeof console.error === 'function') {
    console.error(message);
  }
  /* eslint-enable no-console */
  try {
    // This error was thrown as a convenience so that if you enable
    // "break on all exceptions" in your console,
    // it would pause the execution at this line.
    throw new Error(message);
    /* eslint-disable no-empty */
  } catch (e) {}
  /* eslint-enable no-empty */
}
},{}],50:[function(require,module,exports){
module.exports = require('./lib/index');

},{"./lib/index":51}],51:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ponyfill = require('./ponyfill');

var _ponyfill2 = _interopRequireDefault(_ponyfill);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var root; /* global window */


if (typeof self !== 'undefined') {
  root = self;
} else if (typeof window !== 'undefined') {
  root = window;
} else if (typeof global !== 'undefined') {
  root = global;
} else if (typeof module !== 'undefined') {
  root = module;
} else {
  root = Function('return this')();
}

var result = (0, _ponyfill2['default'])(root);
exports['default'] = result;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./ponyfill":52}],52:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports['default'] = symbolObservablePonyfill;
function symbolObservablePonyfill(root) {
	var result;
	var _Symbol = root.Symbol;

	if (typeof _Symbol === 'function') {
		if (_Symbol.observable) {
			result = _Symbol.observable;
		} else {
			result = _Symbol('observable');
			_Symbol.observable = result;
		}
	} else {
		result = '@@observable';
	}

	return result;
};
},{}],53:[function(require,module,exports){
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

},{}],"configureStore.js":[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _redux=require('redux');var _reduxThunk=require('redux-thunk');var _reduxThunk2=_interopRequireDefault(_reduxThunk);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var configureStore=function configureStore(reducer){var middlewares=[_reduxThunk2.default];if("development"==='development'){var _require=require('redux-logger'),createLogger=_require.createLogger;middlewares.push(createLogger())}var store=(0,_redux.createStore)(reducer,_redux.applyMiddleware.apply(undefined,middlewares));return store};exports.default=configureStore;
},{"redux":48,"redux-logger":41,"redux-thunk":42}],"data.js":[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key]}}}return target};exports.getData=getData;require('whatwg-fetch');function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true})}else{obj[key]=value}return obj}var rootUrl='/api/';function getData(sources,component,notification){var _iteratorNormalCompletion=true;var _didIteratorError=false;var _iteratorError=undefined;try{var _loop=function _loop(){var _ref=_step.value;var type=_ref.type,path=_ref.path,branch=_ref.branch,data=_ref.data,callback=_ref.callback;notification.notify({kind:'special',text:branch+' transferring data ...',busy:1});var settings={credentials:'same-origin'};if(data!=null){settings=_extends({},settings,{method:'POST',body:JSON.stringify(data),headers:{'Content-Type':'application/json'}})}fetch(''+rootUrl+type+path,settings).then(function(response){return response.json()}).then(function(responseData){var _iteratorNormalCompletion2=true;var _didIteratorError2=false;var _iteratorError2=undefined;try{for(var _iterator2=(responseData.msgs||[])[Symbol.iterator](),_step2;!(_iteratorNormalCompletion2=(_step2=_iterator2.next()).done);_iteratorNormalCompletion2=true){var msg=_step2.value;notification.notify(msg)}}catch(err){_didIteratorError2=true;_iteratorError2=err}finally{try{if(!_iteratorNormalCompletion2&&_iterator2.return){_iterator2.return()}}finally{if(_didIteratorError2){throw _iteratorError2}}}var kind=responseData.good?'info':'error';var statm=responseData.good?'data fetched':'server error';notification.notify({kind:kind,text:branch+' '+statm+'.',busy:-1});try{if(callback==null){component.setState(_defineProperty({},branch,responseData.data))}else{callback(responseData.data)}notification.notify({kind:'info',text:branch+' processed.',busy:0})}catch(error){notification.notify({kind:'error',text:branch+' processing error.',busy:0,cause:error})}}).catch(function(error){notification.notify({kind:'error',text:branch+' transmission error.',busy:-1,cause:error})})};for(var _iterator=sources[Symbol.iterator](),_step;!(_iteratorNormalCompletion=(_step=_iterator.next()).done);_iteratorNormalCompletion=true){_loop()}}catch(err){_didIteratorError=true;_iteratorError=err}finally{try{if(!_iteratorNormalCompletion&&_iterator.return){_iterator.return()}}finally{if(_didIteratorError){throw _iteratorError}}}}
},{"whatwg-fetch":53}],"europe.geo.js":[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:true});var countryBorders=exports.countryBorders={"features":[{"geometry":{"coordinates":[],"type":"Polygon"},"type":"Feature","properties":{"iso2":"AD","lng":1.5,"lat":42.5}},{"geometry":{"coordinates":[[[19.4,41],[19.5,41.3],[19.5,41.6],[19.6,41.7],[19.5,41.8],[19.4,41.9],[19.3,41.9],[19.4,42.1],[19.5,42.4],[19.6,42.6],[19.7,42.7],[19.7,42.5],[19.9,42.5],[20.1,42.6],[20.2,42.5],[20.2,42.3],[20.4,42.3],[20.5,42.2],[20.6,41.9],[20.5,41.7],[20.5,41.5],[20.5,41.4],[20.5,41.2],[20.6,41.1],[20.7,40.9],[20.9,40.9],[21,40.8],[21.1,40.7],[21,40.6],[20.9,40.5],[20.8,40.4],[20.7,40.3],[20.7,40.1],[20.5,40.1],[20.3,40],[20.4,39.9],[20.3,39.8],[20.2,39.6],[20.1,39.7],[20,39.8],[19.9,39.9],[19.8,40.1],[19.6,40.1],[19.4,40.2],[19.3,40.4],[19.5,40.3],[19.5,40.6],[19.3,40.6],[19.4,40.7],[19.4,40.9],[19.5,41],[19.4,41]]],"type":"Polygon"},"type":"Feature","properties":{"iso2":"AL","lng":20,"lat":41}},{"geometry":{"coordinates":[[[[45.2,41.2],[45.1,41.1],[45.4,41],[45.6,40.8],[45.5,40.7],[45.4,40.6],[45.6,40.4],[45.9,40.3],[46,40.2],[45.9,40],[45.7,40],[45.8,39.9],[45.9,39.8],[46,39.7],[46.2,39.6],[46.4,39.6],[46.5,39.5],[46.4,39.4],[46.6,39.2],[46.4,39.2],[46.5,39],[46.4,38.9],[46.2,38.9],[46.1,38.9],[46,39.3],[45.8,39.4],[45.8,39.6],[45.6,39.6],[45.5,39.5],[45.3,39.6],[45,39.8],[44.9,39.7],[44.7,39.7],[44.6,39.9],[44.5,40],[44.3,40],[44,40],[43.7,40.1],[43.7,40.2],[43.6,40.4],[43.7,40.5],[43.7,40.7],[43.7,40.8],[43.6,41],[43.5,41.1],[43.7,41.1],[43.8,41.2],[44,41.2],[44.2,41.2],[44.4,41.2],[44.6,41.2],[44.8,41.2],[45,41.3],[45.1,41.2],[45.2,41.2]]],[]],"type":"MultiPolygon"},"type":"Feature","properties":{"iso2":"AM","lng":45,"lat":40}},{"geometry":{"coordinates":[[[13.8,48.8],[14.2,48.6],[14.6,48.6],[14.9,48.8],[15.1,49],[15.5,49],[15.8,48.9],[16.4,48.7],[16.7,48.8],[16.9,48.6],[16.9,48.3],[17.1,48.1],[17.1,47.8],[16.8,47.7],[16.4,47.7],[16.7,47.5],[16.4,47.2],[16.3,47],[15.8,46.7],[15.1,46.6],[14.8,46.5],[13.9,46.5],[13.6,46.6],[12.8,46.7],[12.5,46.7],[12.1,47],[11.8,47],[11.2,47],[10.9,46.8],[10.6,46.8],[10.3,46.9],[9.9,46.9],[9.6,47.2],[9.7,47.5],[10,47.5],[10.4,47.4],[10.4,47.6],[10.9,47.5],[11.5,47.5],[12,47.6],[12.5,47.7],[12.7,47.7],[13.1,47.6],[12.9,47.8],[12.8,48],[13.2,48.3],[13.4,48.5],[13.7,48.6],[13.8,48.8]]],"type":"Polygon"},"type":"Feature","properties":{"iso2":"AT","lng":13.3,"lat":47.3}},{"geometry":{"coordinates":[[[[46.6,41.9],[46.9,41.7],[47.3,41.4],[47.7,41.2],[48,41.4],[48.5,41.8],[48.8,41.7],[49.1,41.3],[49.2,41],[49.5,40.7],[49.9,40.6],[50.4,40.4],[50.1,40.4],[49.5,40.2],[49.4,39.9],[49.3,39.4],[49.2,39.3],[49.1,39.1],[49,39],[48.9,38.5],[48.7,38.4],[48.3,38.6],[48.1,38.8],[48.2,39],[48.1,39.2],[48.3,39.4],[48.2,39.6],[47.8,39.7],[47.3,39.4],[46.9,39.2],[46.7,39],[46.5,39.1],[46.6,39.3],[46.5,39.6],[46.1,39.7],[45.8,39.8],[45.6,40],[46,40.3],[45.5,40.5],[45.5,40.8],[45.3,41],[45.1,41.2],[45.1,41.4],[45.4,41.5],[45.9,41.2],[46.3,41.2],[46.5,41],[46.7,41.3],[46.2,41.6],[46.4,41.8],[46.6,41.9]]],[[[45.1,39.8],[45.3,39.6],[45.3,39.5],[45.5,39.5],[45.6,39.5],[45.6,39.6],[45.7,39.6],[45.8,39.6],[45.8,39.5],[45.8,39.4],[45.9,39.3],[46,39.3],[46,39.2],[46.1,38.9],[46.2,38.8],[46,38.9],[45.8,38.9],[45.6,39],[45.5,39],[45.4,39],[45.4,39.1],[45.3,39.2],[45.2,39.2],[45.1,39.2],[45.1,39.3],[45.1,39.4],[45,39.4],[44.9,39.5],[44.9,39.6],[44.8,39.6],[44.8,39.7],[44.9,39.7],[45,39.7],[45,39.8],[45.1,39.8]]],[],[]],"type":"MultiPolygon"},"type":"Feature","properties":{"iso2":"AZ","lng":47.5,"lat":40.5}},{"geometry":{"coordinates":[[[17.6,42.9],[17.4,43.2],[17.3,43.5],[17,43.5],[16.8,43.7],[16.6,43.9],[16.4,44.1],[16.2,44.2],[16.2,44.4],[16,44.7],[15.7,44.8],[15.8,45.2],[16.1,45.1],[16.4,45],[16.6,45.2],[16.9,45.3],[17.2,45.1],[17.5,45.1],[17.8,45.1],[18.1,45.1],[18.4,45.1],[18.8,44.9],[19.1,44.9],[19.4,44.9],[19.2,44.6],[19.1,44.3],[19.5,44.1],[19.5,44],[19.2,44],[19.5,43.8],[19.4,43.6],[19,43.6],[19,43.4],[19,43.2],[18.8,43.3],[18.7,43.1],[18.5,43],[18.6,42.7],[18.4,42.6],[18.2,42.7],[17.8,42.9],[17.6,42.9]]],"type":"Polygon"},"type":"Feature","properties":{"iso2":"BA","lng":18,"lat":44}},{"geometry":{"coordinates":[[[4.3,51.3],[4.4,51.4],[4.5,51.5],[4.5,51.4],[4.7,51.4],[4.8,51.5],[4.9,51.4],[5,51.5],[5.1,51.4],[5.2,51.3],[5.4,51.3],[5.6,51.3],[5.8,51.2],[5.9,51.1],[5.8,51],[5.6,50.9],[5.7,50.8],[5.9,50.8],[6.1,50.7],[6.3,50.6],[6.3,50.5],[6.4,50.3],[6.2,50.2],[6.1,50.1],[5.9,50.1],[5.7,49.9],[5.8,49.8],[5.9,49.6],[5.8,49.5],[5.6,49.5],[5.4,49.6],[5,49.8],[4.8,50],[4.9,50.1],[4.8,50.2],[4.7,50],[4.4,49.9],[4.2,50],[4.2,50.1],[4.2,50.3],[4,50.3],[3.8,50.4],[3.7,50.5],[3.5,50.5],[3.3,50.5],[3.2,50.8],[3,50.8],[2.8,50.8],[2.6,50.9],[2.5,51.1],[2.9,51.2],[3,51.3],[3.2,51.3],[3.4,51.3],[3.5,51.2],[3.6,51.3],[3.8,51.3],[3.9,51.2],[4.1,51.3],[4.2,51.4],[4.3,51.3]]],"type":"Polygon"},"type":"Feature","properties":{"iso2":"BE","lng":4,"lat":50.8}},{"geometry":{"coordinates":[[[27.9,42.8],[27.6,42.6],[27.5,42.4],[27.8,42.2],[28,42],[27.6,42],[27.3,42.1],[27,42],[26.5,41.8],[26.4,41.7],[26.2,41.5],[25.9,41.3],[25.5,41.3],[25.1,41.4],[24.6,41.4],[24.3,41.6],[24.1,41.5],[23.7,41.4],[23.3,41.4],[23,41.3],[23,41.6],[22.9,41.9],[22.5,42.1],[22.6,42.5],[22.4,42.8],[23,43.1],[22.8,43.4],[22.5,43.5],[22.5,44.1],[22.9,44.1],[22.8,43.9],[23.1,43.8],[23.4,43.9],[24,43.7],[24.4,43.7],[24.6,43.7],[25,43.7],[25.4,43.6],[25.8,43.7],[26.1,44],[26.7,44.1],[27.1,44.1],[27.5,44],[27.9,44],[28.1,43.8],[28.5,43.7],[28.6,43.4],[28.2,43.4],[27.9,43.2],[27.9,42.8]]],"type":"Polygon"},"type":"Feature","properties":{"iso2":"BG","lng":25,"lat":43}},{"geometry":{"coordinates":[[[26.6,55.7],[27,55.8],[27.6,55.8],[27.9,56.1],[28.3,56],[28.7,56],[29.1,56],[29.4,55.8],[30,55.9],[30.8,55.6],[30.9,55.2],[30.9,54.9],[31.1,54.6],[31.3,54.2],[31.9,54],[32.1,53.8],[32.5,53.6],[32.5,53.2],[32,53.1],[31.4,53.2],[31.5,52.9],[31.6,52.5],[31.8,52.1],[31.3,52.1],[31,52],[30.6,51.6],[30.4,51.4],[29.9,51.5],[29.4,51.4],[29.1,51.6],[28.7,51.5],[28.3,51.6],[28,51.6],[27.7,51.6],[27.2,51.7],[26.9,51.8],[26.4,51.8],[26,51.9],[25.4,51.9],[25,51.9],[24.3,51.7],[23.7,51.7],[23.5,51.7],[23.7,52],[23.2,52.3],[23.7,52.6],[23.9,53],[23.6,53.7],[23.8,53.9],[24.2,54],[24.5,54],[24.9,54.1],[25.3,54.3],[25.5,54.2],[25.8,54.3],[25.7,54.6],[25.9,54.9],[26.3,55.1],[26.6,55.3],[26.6,55.7]]],"type":"Polygon"},"type":"Feature","properties":{"iso2":"BY","lng":28,"lat":53}},{"geometry":{"coordinates":[[[7.7,47.5],[8,47.6],[8.3,47.6],[8.6,47.6],[8.4,47.7],[8.7,47.8],[8.9,47.7],[9.3,47.7],[9.7,47.5],[9.5,47.3],[9.6,47.1],[9.9,46.9],[10.2,46.9],[10.4,47],[10.5,46.6],[10.3,46.5],[10.1,46.6],[10,46.4],[10.2,46.3],[9.9,46.4],[9.7,46.3],[9.5,46.4],[9.3,46.5],[9.3,46.3],[9.1,46.1],[9,45.9],[8.9,45.9],[8.8,46.1],[8.6,46.1],[8.4,46.3],[8.5,46.5],[8.3,46.4],[8.1,46.1],[7.9,45.9],[7.7,46],[7.5,45.9],[7.2,45.9],[7,46],[6.8,46.2],[6.7,46.5],[6.3,46.4],[6.3,46.3],[6,46.1],[6.1,46.2],[6.1,46.6],[6.4,46.8],[6.5,47],[6.7,47.1],[7,47.3],[7,47.5],[7.3,47.4],[7.5,47.5],[7.7,47.6],[7.7,47.5]]],"type":"Polygon"},"type":"Feature","properties":{"iso2":"CH","lng":8,"lat":47}},{"geometry":{"coordinates":[[[33.7,35.4],[33.9,35.4],[34.3,35.6],[34.5,35.7],[34.6,35.6],[34.3,35.5],[34.1,35.4],[33.9,35.3],[34,35.1],[34.1,35],[33.9,34.9],[33.8,35],[33.6,34.9],[33.5,34.8],[33.3,34.7],[33.1,34.7],[33,34.6],[32.9,34.7],[32.8,34.6],[32.7,34.7],[32.5,34.7],[32.4,34.8],[32.3,35],[32.4,35],[32.5,35.1],[32.6,35.2],[32.8,35.2],[32.9,35.2],[32.9,35.4],[33.3,35.3],[33.5,35.3],[33.7,35.4]]],"type":"Polygon"},"type":"Feature","properties":{"iso2":"CY","lng":33,"lat":35}},{"geometry":{"coordinates":[[[14.7,48.6],[14.4,48.6],[14.1,48.7],[13.8,48.8],[13.6,48.9],[13.4,49],[13.2,49.2],[12.8,49.3],[12.6,49.6],[12.5,49.9],[12.3,50],[12.2,50.2],[12.3,50.2],[12.6,50.4],[12.8,50.5],[13.1,50.5],[13.3,50.6],[13.5,50.7],[13.9,50.8],[14.3,50.9],[14.3,51.1],[14.6,50.9],[14.8,50.9],[15.2,51],[15.4,50.8],[15.8,50.7],[16.1,50.6],[16.3,50.7],[16.3,50.5],[16.4,50.4],[16.5,50.2],[16.7,50.1],[16.9,50.2],[16.9,50.3],[17.2,50.4],[17.4,50.3],[17.8,50.3],[17.6,50.2],[17.8,50],[18.1,50.1],[18.4,49.9],[18.6,49.8],[18.8,49.6],[18.7,49.5],[18.4,49.3],[18.2,49.2],[18.1,49],[17.7,48.9],[17.4,48.8],[17.1,48.8],[16.9,48.6],[16.7,48.7],[16.5,48.8],[16.3,48.7],[15.8,48.9],[15.5,48.9],[15.3,49],[15,49],[14.9,48.8],[14.7,48.6]]],"type":"Polygon"},"type":"Feature","properties":{"iso2":"CZ","lng":15.5,"lat":49.8}},{"geometry":{"coordinates":[[[[11,54.4],[10.8,53.9],[11.6,54],[12.4,54.4],[12.5,54.2],[13.7,54.2],[14.3,53.7],[14.2,52.8],[14.5,52.4],[14.7,51.7],[15,51.4],[14.6,50.9],[14,50.8],[13.2,50.6],[12.6,50.4],[12.3,50.1],[12.6,49.5],[13.4,49],[13.8,48.6],[13.4,48.4],[13,47.9],[13,47.5],[12.2,47.6],[11.1,47.4],[10.5,47.5],[9.7,47.6],[8.8,47.7],[8.6,47.7],[7.8,47.6],[7.6,48.1],[8.1,48.8],[7.6,49.1],[6.9,49.2],[6.5,49.7],[6.1,50.1],[6.3,50.6],[5.9,51],[6.2,51.6],[6.6,51.9],[6.9,52.2],[6.9,52.4],[7,52.6],[7.2,53.3],[7.2,53.6],[8,53.7],[8.3,53.4],[8.5,53.7],[9.2,53.9],[9.8,53.5],[8.9,54.1],[8.7,54.4],[8.7,54.8],[8.4,55],[9.3,54.8],[10,54.6],[10.7,54.3],[11,54.4]]],[[[13.4,54.6],[13.5,54.6],[13.6,54.6],[13.7,54.6],[13.7,54.5],[13.6,54.5],[13.6,54.4],[13.7,54.4],[13.7,54.3],[13.5,54.3],[13.4,54.3],[13.4,54.2],[13.3,54.2],[13.3,54.3],[13.2,54.3],[13.1,54.3],[13.1,54.4],[13.2,54.4],[13.3,54.4],[13.2,54.5],[13.1,54.5],[13.2,54.6],[13.3,54.6],[13.4,54.5],[13.5,54.5],[13.2,54.7],[13.3,54.7],[13.4,54.7],[13.4,54.6]]],[[[14,54.1],[14.1,54],[14.2,53.9],[14.1,53.9],[14,53.9],[14,53.8],[13.9,53.8],[13.8,53.9],[13.9,53.9],[14,54],[13.9,54.1],[13.9,54],[13.8,54],[13.8,54.1],[13.8,54.2],[14,54.1]]],[],[],[],[]],"type":"MultiPolygon"},"type":"Feature","properties":{"iso2":"DE","lng":9,"lat":51}},{"geometry":{"coordinates":[[[[10.4,57.6],[10.4,57.5],[10.5,57.5],[10.5,57.4],[10.5,57.2],[10.4,57.2],[10.4,57.1],[10.3,57],[10.2,57],[10.1,57],[10,57.1],[9.5,57],[9.3,57],[9.2,57],[9.1,57],[9.1,57.1],[9,57],[8.9,57],[8.8,57],[8.8,56.9],[8.7,57],[8.7,56.9],[8.6,56.9],[8.6,56.8],[8.5,56.8],[8.5,56.7],[8.4,56.7],[8.6,56.7],[8.6,56.6],[8.5,56.6],[8.2,56.7],[8.2,56.8],[8.3,56.8],[8.3,56.9],[8.4,56.9],[8.5,57],[8.6,57.1],[8.7,57.1],[8.8,57.1],[8.9,57.1],[9,57.2],[9.2,57.1],[9.3,57.1],[9.4,57.2],[9.5,57.2],[9.6,57.2],[9.6,57.3],[9.7,57.4],[9.8,57.4],[9.8,57.5],[9.9,57.6],[10,57.6],[10.1,57.6],[10.2,57.6],[10.3,57.6],[10.4,57.7],[10.5,57.7],[10.6,57.7],[10.5,57.6],[10.4,57.6]]],[[[10,57.1],[10.3,57],[10.3,56.7],[9.9,56.6],[10.4,56.7],[10.2,56.6],[10.5,56.5],[10.9,56.5],[10.7,56.2],[10.6,56.1],[10.5,56.3],[10.2,56.1],[10.3,55.9],[10.1,55.8],[9.9,55.8],[9.8,55.7],[9.8,55.6],[9.7,55.3],[9.5,55.2],[9.6,55],[9.8,54.9],[9.6,54.9],[9.4,54.8],[9.2,54.9],[8.7,54.9],[8.6,55.1],[8.6,55.2],[8.6,55.4],[8.4,55.5],[8.1,55.5],[8.2,55.8],[8.1,56],[8.3,55.9],[8.3,56.1],[8.1,56.3],[8.2,56.6],[8.4,56.6],[8.6,56.5],[8.8,56.6],[8.9,56.8],[9.2,56.7],[9,56.6],[9.3,56.5],[9.3,56.7],[9.4,57],[9.7,57],[9.9,57.1],[10,57.1]]],[[[12.6,56],[12.6,55.9],[12.6,55.7],[12.5,55.6],[12.3,55.6],[12.2,55.4],[12.4,55.4],[12.5,55.3],[12.2,55.2],[12,55.1],[12.2,55.1],[12.1,55],[11.9,55],[11.7,55.1],[11.8,55.2],[11.6,55.2],[11.4,55.2],[11.2,55.2],[11.2,55.4],[11.1,55.7],[10.9,55.7],[11.3,55.7],[11.5,55.9],[11.3,56],[11.6,55.9],[11.7,56],[11.8,55.9],[11.8,55.8],[11.9,55.9],[12,55.8],[12.1,55.7],[11.9,55.7],[11.9,56],[12.3,56.1],[12.6,56]]],[[[10.7,55.5],[10.8,55.4],[10.8,55.3],[10.8,55.2],[10.8,55.1],[10.7,55.1],[10.6,55.1],[10.5,55],[10.2,55.1],[10.1,55.1],[10.1,55.2],[10,55.2],[9.9,55.3],[9.8,55.4],[9.8,55.5],[9.7,55.5],[9.9,55.5],[10,55.5],[10.1,55.6],[10.2,55.6],[10.3,55.6],[10.4,55.6],[10.5,55.5],[10.4,55.5],[10.4,55.4],[10.5,55.4],[10.6,55.5],[10.6,55.6],[10.7,55.6],[10.7,55.5]]],[[[11.5,54.8],[11.6,54.8],[11.6,54.9],[11.7,54.9],[11.8,54.8],[11.9,54.7],[11.8,54.7],[11.8,54.6],[11.7,54.6],[11.7,54.7],[11.6,54.7],[11.5,54.6],[11.4,54.6],[11.4,54.7],[11.3,54.7],[11.2,54.7],[11.1,54.7],[11,54.8],[11,54.9],[11.1,54.9],[11.1,55],[11.2,55],[11.3,54.9],[11.4,54.9],[11.5,54.8]]],[[[12,54.9],[12.1,54.9],[12.2,54.8],[12.1,54.8],[12,54.7],[12,54.6],[11.9,54.6],[11.9,54.7],[11.9,54.8],[11.8,54.8],[11.8,54.9],[11.7,54.9],[11.7,55],[11.8,55],[11.9,55],[11.9,54.9],[12,54.9]]],[]],"type":"MultiPolygon"},"type":"Feature","properties":{"iso2":"DK","lng":10,"lat":56}},{"geometry":{"coordinates":[[[[25.8,59.6],[26.1,59.6],[26.5,59.5],[26.7,59.6],[26.9,59.5],[27.2,59.4],[27.6,59.4],[28,59.4],[28.1,59.4],[28.1,59.3],[27.9,59.2],[27.7,59],[27.4,58.8],[27.5,58.5],[27.5,58.2],[27.7,58.1],[27.8,57.8],[27.5,57.8],[27.4,57.6],[27.1,57.6],[26.7,57.6],[26.5,57.5],[26,57.8],[25.6,57.9],[25.3,58.1],[25.2,58.1],[25,58],[24.5,58],[24.3,57.9],[24.5,58.2],[24.5,58.4],[24.3,58.3],[24.1,58.3],[23.8,58.4],[23.6,58.5],[23.6,58.7],[23.8,58.8],[23.4,58.9],[23.6,59],[23.4,59.1],[23.6,59.2],[23.8,59.3],[24,59.4],[24.3,59.4],[24.5,59.5],[24.8,59.6],[25.2,59.5],[25.5,59.6],[25.7,59.6],[25.8,59.6]]],[[[23,58.6],[23.1,58.6],[23.3,58.5],[23.3,58.4],[23.2,58.4],[23.1,58.4],[23,58.4],[22.8,58.2],[22.6,58.2],[22.5,58.2],[22.4,58.2],[22.3,58.2],[22.3,58.1],[22.2,58],[22.1,57.9],[22,57.9],[22,58],[22.1,58.1],[22.2,58.1],[22.2,58.2],[22.1,58.2],[21.9,58.3],[21.8,58.3],[22,58.3],[22,58.4],[21.9,58.5],[21.8,58.5],[22,58.5],[22.1,58.5],[22.2,58.5],[22.3,58.6],[22.5,58.6],[22.6,58.6],[22.8,58.6],[22.9,58.6],[23,58.6]]],[[[22.7,59],[22.8,59],[22.9,59],[23,59],[23,58.9],[23,58.8],[22.9,58.8],[22.8,58.8],[22.7,58.8],[22.7,58.7],[22.6,58.7],[22.5,58.7],[22.5,58.8],[22.4,58.8],[22.4,58.9],[22.3,58.9],[22.2,58.9],[22.1,58.9],[22,58.9],[22.1,59],[22.4,59],[22.5,59],[22.6,59.1],[22.7,59.1],[22.7,59]]],[],[],[]],"type":"MultiPolygon"},"type":"Feature","properties":{"iso2":"EE","lng":26,"lat":59}},{"geometry":{"coordinates":[[[[-7.9,43.8],[-7.2,43.6],[-6.3,43.6],[-5.6,43.6],[-4.9,43.4],[-4.2,43.4],[-3.2,43.4],[-2.5,43.3],[-1.8,43.3],[-1.4,43],[-0.8,42.9],[-0.3,42.8],[0.3,42.7],[0.8,42.8],[1.4,42.6],[2,42.4],[2.7,42.3],[3.3,42.2],[3.1,41.8],[2.3,41.4],[1.7,41.2],[0.9,41],[0.5,40.5],[-0.1,39.9],[-0.1,39],[0.1,38.7],[-0.5,38.3],[-0.9,37.7],[-1.4,37.5],[-1.9,37],[-2.3,36.8],[-2.9,36.7],[-3.7,36.7],[-4.5,36.7],[-5.2,36.4],[-5.9,36.2],[-6.2,36.6],[-6.9,37.2],[-7.4,37.4],[-7.3,38],[-7.1,38.2],[-7.1,38.9],[-7.4,39.5],[-7.1,39.7],[-6.8,40.3],[-6.9,41],[-6.4,41.4],[-6.5,41.7],[-6.9,41.9],[-7.3,41.8],[-8,41.8],[-8.2,42.1],[-8.7,42],[-8.6,42.4],[-8.9,42.4],[-8.9,42.6],[-9.1,42.8],[-9.1,43.2],[-8.4,43.4],[-7.9,43.8]]],[[[3.2,39.7],[3.3,39.7],[3.3,39.8],[3.4,39.8],[3.5,39.7],[3.4,39.6],[3.4,39.5],[3.3,39.5],[3.3,39.4],[3.2,39.4],[3.1,39.3],[3,39.3],[2.8,39.4],[2.7,39.4],[2.7,39.5],[2.8,39.5],[2.7,39.6],[2.5,39.5],[2.4,39.5],[2.4,39.6],[2.5,39.7],[2.7,39.8],[2.8,39.8],[3,39.9],[3.1,39.9],[3.1,39.8],[3.2,39.8],[3.2,39.7]]],[[[-14.3,28],[-14.4,28],[-14.4,28.1],[-14.3,28.1],[-14.3,28.2],[-14.2,28.2],[-14.2,28.3],[-14.1,28.4],[-14.1,28.5],[-14.1,28.6],[-14,28.6],[-14,28.7],[-13.9,28.7],[-13.9,28.8],[-13.8,28.7],[-13.8,28.6],[-13.8,28.5],[-13.9,28.4],[-13.9,28.3],[-13.9,28.2],[-14,28.2],[-14.1,28.2],[-14.2,28.1],[-14.3,28]]],[[[-16.3,28.4],[-16.4,28.4],[-16.4,28.2],[-16.4,28.1],[-16.5,28.1],[-16.5,28],[-16.6,28],[-16.7,28],[-16.7,28.1],[-16.8,28.1],[-16.8,28.2],[-16.9,28.3],[-16.9,28.4],[-16.8,28.4],[-16.7,28.4],[-16.6,28.4],[-16.5,28.4],[-16.4,28.5],[-16.3,28.6],[-16.2,28.6],[-16.2,28.5],[-16.3,28.4]]],[[[-15.6,27.8],[-15.6,27.7],[-15.7,27.8],[-15.8,27.8],[-15.8,27.9],[-15.8,28],[-15.7,28],[-15.7,28.1],[-15.7,28.2],[-15.6,28.2],[-15.4,28.1],[-15.4,28],[-15.4,27.8],[-15.5,27.8],[-15.6,27.8]]],[[[4.3,40],[4.3,39.9],[4.3,39.8],[4.2,39.8],[4.1,39.9],[4,39.9],[3.9,39.9],[3.8,39.9],[3.8,40],[3.8,40.1],[3.9,40.1],[4.1,40.1],[4.2,40.1],[4.2,40],[4.3,40]]],[]],"type":"MultiPolygon"},"type":"Feature","properties":{"iso2":"ES","lng":-4,"lat":40}},{"geometry":{"coordinates":[[[[28.2,69.9],[29.3,69.5],[28.9,69],[28.5,68.6],[29.9,67.7],[29.1,66.9],[29.8,66.2],[29.8,65.6],[29.8,65.2],[29.7,64.8],[30,64.5],[30.6,64],[30.3,63.6],[31.5,63],[30.8,62.3],[29.7,61.5],[28.8,61.1],[28.1,60.7],[27.2,60.6],[26.6,60.6],[25.9,60.4],[25.7,60.4],[24.6,60.1],[23.6,60],[23.2,59.9],[23,60.2],[22.5,60.2],[21.9,60.5],[21.4,60.8],[21.5,61.5],[21.3,62],[21.1,62.6],[21.6,63.1],[22.3,63.3],[22.7,63.7],[23.4,64],[24.2,64.5],[25,64.9],[25.3,65],[25.2,65.6],[24.7,65.9],[23.7,66.2],[24,66.8],[23.8,67.4],[23.5,67.9],[23,68.3],[22.1,68.5],[21.2,68.8],[20.8,69.1],[22,69.1],[22.9,68.7],[23.7,68.7],[24.5,68.7],[25.4,68.9],[25.8,69.4],[26.4,69.8],[27.3,69.9],[28.2,69.9]]],[],[],[],[],[],[]],"type":"MultiPolygon"},"type":"Feature","properties":{"iso2":"FI","lng":26,"lat":64}},{"geometry":{"coordinates":[[[[2.5,51.1],[3.2,50.7],[4,50.3],[4.5,49.9],[5,49.8],[6.1,49.5],[6.9,49.2],[7.7,49],[7.9,48.7],[7.5,47.8],[7.1,47.5],[6.6,47],[6.1,46.4],[6.2,46.3],[6.9,46.1],[7.1,45.5],[6.7,45.1],[6.9,44.5],[7.7,44.2],[7.2,43.7],[6.2,43.1],[5.3,43.4],[5,43.6],[4.6,43.4],[3.8,43.5],[3,42.9],[2.7,42.4],[1.9,42.4],[1.4,42.6],[0.7,42.8],[-0.1,42.7],[-0.8,43],[-1.4,43.1],[-1.6,43.4],[-1.3,44.5],[-1.2,45],[-0.8,45.4],[-0.7,45.4],[-1.1,46.1],[-1.9,46.6],[-2.2,47.2],[-2.4,47.3],[-2.9,47.5],[-3.6,47.8],[-4.4,47.8],[-4.3,48.1],[-4.2,48.3],[-4.5,48.6],[-3.5,48.7],[-2.7,48.5],[-1.9,48.7],[-1.5,48.7],[-1.8,49.4],[-1.4,49.7],[-1,49.4],[-0.1,49.3],[0.2,49.5],[1.2,50],[1.6,50.8],[2.5,51.1]]],[[[9.4,42.7],[9.4,42.6],[9.5,42.6],[9.5,42.5],[9.6,42.3],[9.6,42.2],[9.6,42.1],[9.5,42.1],[9.4,42],[9.4,41.9],[9.4,41.8],[9.4,41.7],[9.4,41.6],[9.3,41.6],[9.3,41.5],[9.2,41.5],[9.2,41.4],[9.3,41.4],[9.1,41.4],[9,41.5],[8.9,41.5],[8.8,41.6],[8.9,41.6],[8.9,41.7],[8.8,41.7],[8.7,41.7],[8.7,41.8],[8.8,41.9],[8.7,41.9],[8.6,41.9],[8.6,42],[8.7,42],[8.7,42.1],[8.6,42.1],[8.6,42.2],[8.6,42.3],[8.7,42.3],[8.6,42.4],[8.7,42.5],[8.7,42.6],[8.9,42.6],[9.1,42.7],[9.2,42.7],[9.3,42.7],[9.3,42.8],[9.3,43],[9.4,43],[9.5,43],[9.5,42.8],[9.5,42.7],[9.4,42.7]]],[],[],[],[],[]],"type":"MultiPolygon"},"type":"Feature","properties":{"iso2":"FR","lng":2,"lat":46}},{"geometry":{"coordinates":[[[[-4.2,53.2],[-3.1,53.2],[-3,53.8],[-3.5,54.4],[-3.1,55],[-4.4,54.9],[-5,54.8],[-5,55.2],[-4.8,55.9],[-5.2,55.8],[-5.4,55.9],[-5.8,55.4],[-5.5,56.2],[-5.3,56.5],[-5.8,56.5],[-6.1,56.8],[-5.5,57],[-5.5,57.4],[-5.6,57.6],[-5.2,57.9],[-5.2,58.3],[-4.6,58.5],[-3.4,58.6],[-3.6,58.1],[-4,57.8],[-4,57.6],[-2.9,57.7],[-1.8,57.5],[-2.5,56.6],[-3,56.4],[-3.2,56.1],[-2.8,56.1],[-1.8,55.6],[-1.3,54.8],[-0.2,54.2],[0,53.6],[0.2,53.5],[0.2,52.9],[1.2,52.9],[1.7,52.3],[0.9,51.8],[0.4,51.4],[1.4,51.1],[0.4,50.8],[-0.8,50.7],[-2.1,50.7],[-2.8,50.7],[-3.8,50.2],[-4.9,50.2],[-5.7,50.1],[-4.7,50.7],[-4,51.2],[-2.9,51.4],[-3.2,51.5],[-4.2,51.5],[-4.8,51.6],[-5.2,51.9],[-4.1,52.3],[-4.5,52.8],[-4.2,53.2]]],[[[-6.2,58.4],[-6.2,58.3],[-6.3,58.3],[-6.3,58.2],[-6.2,58.2],[-6.1,58.3],[-6.4,58.2],[-6.4,58.1],[-6.5,58.1],[-6.6,58.1],[-6.4,58],[-6.5,58],[-6.5,57.9],[-6.6,57.9],[-6.7,57.9],[-6.7,58],[-6.6,58],[-6.7,58.1],[-6.8,58],[-6.7,57.8],[-7,57.7],[-7.1,57.8],[-7,57.8],[-6.8,57.9],[-6.9,57.9],[-6.9,58],[-7,58],[-7.1,58],[-7.1,58.1],[-7.1,58.2],[-7,58.2],[-6.9,58.2],[-6.9,58.1],[-6.8,58.2],[-6.7,58.2],[-6.8,58.3],[-6.7,58.3],[-6.6,58.3],[-6.6,58.4],[-6.4,58.5],[-6.3,58.5],[-6.2,58.5],[-6.2,58.4]]],[[[-6.4,55.2],[-6.2,55.2],[-6,55.2],[-5.8,54.9],[-5.7,54.8],[-5.8,54.7],[-5.9,54.6],[-5.5,54.7],[-5.5,54.5],[-5.5,54.4],[-5.6,54.6],[-5.7,54.5],[-5.6,54.3],[-5.7,54.2],[-5.9,54.2],[-6,54.1],[-6.1,54],[-6.3,54.1],[-6.6,54.1],[-6.7,54.1],[-6.9,54.3],[-7,54.4],[-7.2,54.3],[-7.1,54.2],[-7.6,54.1],[-7.7,54.2],[-7.9,54.2],[-8,54.4],[-8.2,54.4],[-8,54.5],[-7.9,54.6],[-7.8,54.7],[-7.6,54.8],[-7.5,54.9],[-7.4,55],[-7.3,55.1],[-7,55],[-7,55.2],[-6.8,55.2],[-6.6,55.2],[-6.4,55.2]]],[[[-6.1,57.6],[-6.1,57.5],[-6.1,57.4],[-6.1,57.3],[-5.9,57.2],[-5.8,57.3],[-5.7,57.3],[-5.6,57.3],[-5.7,57.2],[-5.8,57.1],[-5.9,57.1],[-5.9,57],[-6,57],[-6,57.1],[-6,57.2],[-6.1,57.1],[-6.2,57.2],[-6.3,57.2],[-6.4,57.3],[-6.5,57.3],[-6.3,57.3],[-6.5,57.4],[-6.6,57.4],[-6.6,57.3],[-6.7,57.4],[-6.8,57.4],[-6.7,57.5],[-6.6,57.6],[-6.6,57.5],[-6.5,57.5],[-6.4,57.5],[-6.4,57.6],[-6.3,57.7],[-6.2,57.6],[-6.1,57.6]]],[[[-1.3,60.5],[-1.2,60.5],[-1,60.4],[-1.1,60.4],[-1.1,60.3],[-1.2,60.3],[-1.2,60.2],[-1.1,60.2],[-1.1,60.1],[-1.2,60.1],[-1.2,60],[-1.3,59.9],[-1.4,59.9],[-1.3,60],[-1.3,60.1],[-1.3,60.2],[-1.4,60.3],[-1.4,60.2],[-1.5,60.2],[-1.6,60.2],[-1.7,60.2],[-1.7,60.3],[-1.6,60.3],[-1.5,60.3],[-1.3,60.3],[-1.3,60.4],[-1.4,60.5],[-1.5,60.5],[-1.6,60.5],[-1.4,60.6],[-1.3,60.6],[-1.3,60.5]]],[[[-5.8,56.5],[-5.7,56.5],[-5.6,56.4],[-5.7,56.4],[-5.8,56.3],[-5.9,56.3],[-5.9,56.4],[-6,56.3],[-6.3,56.3],[-6.4,56.3],[-6.2,56.3],[-6.1,56.4],[-6,56.4],[-6.2,56.4],[-6,56.5],[-6.1,56.5],[-6.3,56.5],[-6.3,56.6],[-6.2,56.6],[-6.1,56.7],[-6.1,56.6],[-6,56.6],[-5.9,56.5],[-5.8,56.5]]],[[[-6.1,55.9],[-6.1,55.8],[-6,55.8],[-6,55.7],[-6.1,55.6],[-6.2,55.6],[-6.3,55.6],[-6.3,55.7],[-6.3,55.8],[-6.4,55.8],[-6.4,55.7],[-6.5,55.7],[-6.4,55.9],[-6.3,55.9],[-6.2,55.9],[-6.1,55.9]]]],"type":"MultiPolygon"},"type":"Feature","properties":{"iso2":"GB","lng":-2,"lat":54}},{"geometry":{"coordinates":[[[41.5,42.4],[41.5,42.7],[41.2,42.8],[41,43],[40.8,43.1],[40.3,43.2],[40.1,43.4],[40.1,43.6],[40.4,43.6],[40.7,43.5],[41,43.4],[41.4,43.3],[42.1,43.2],[42.4,43.2],[42.7,43.2],[42.9,43.1],[43.2,42.9],[43.6,42.9],[43.8,42.8],[43.7,42.6],[44.2,42.6],[44.5,42.8],[44.7,42.7],[44.9,42.8],[45.2,42.7],[45.4,42.5],[45.6,42.6],[45.8,42.5],[45.6,42.2],[46.1,42],[46.4,41.9],[46.3,41.8],[46.2,41.6],[46.6,41.4],[46.7,41.1],[46.5,41.1],[46.3,41.2],[46,41.2],[45.7,41.3],[45.3,41.5],[45.1,41.4],[44.9,41.2],[44.6,41.2],[44.3,41.2],[44,41.2],[43.8,41.1],[43.5,41.1],[43.3,41.2],[43,41.4],[42.7,41.6],[42.5,41.4],[42.2,41.5],[41.9,41.5],[41.7,41.5],[41.6,41.6],[41.8,41.8],[41.7,42.1],[41.6,42.3],[41.5,42.4]]],"type":"Polygon"},"type":"Feature","properties":{"iso2":"GE","lng":43.5,"lat":42}},{"geometry":{"coordinates":[[[[23.9,35.5],[24,35.5],[24.1,35.5],[24.1,35.6],[24.2,35.6],[24.2,35.5],[24.3,35.4],[24.4,35.4],[24.5,35.4],[24.6,35.4],[24.8,35.4],[25,35.4],[25.1,35.3],[25.2,35.3],[25.3,35.3],[25.4,35.3],[25.5,35.3],[25.6,35.3],[25.7,35.3],[25.8,35.3],[25.7,35.2],[25.7,35.1],[25.8,35.1],[25.9,35.2],[26,35.2],[26.1,35.2],[26.2,35.2],[26.3,35.3],[26.3,35.1],[26.2,35],[26.1,35],[26,35],[25.6,35],[25.5,35],[25.3,35],[25.2,35],[25,34.9],[24.9,34.9],[24.8,34.9],[24.8,35],[24.7,35.1],[24.6,35.1],[24.5,35.1],[24.4,35.2],[24.2,35.2],[24.1,35.2],[24,35.2],[23.9,35.2],[23.8,35.2],[23.7,35.2],[23.6,35.2],[23.5,35.3],[23.6,35.5],[23.6,35.6],[23.7,35.5],[23.7,35.6],[23.7,35.7],[23.8,35.7],[23.8,35.6],[23.8,35.5],[23.9,35.5]]],[[[26.3,41.7],[26.4,41.3],[26.1,40.8],[25.7,40.9],[25.2,41],[24.4,40.9],[23.8,40.8],[24,40.4],[24.1,40.3],[24,40.1],[23.4,40.3],[23.7,39.9],[22.8,40.5],[22.6,40.5],[22.7,40],[23.3,39.3],[23.2,39.3],[23,39.1],[22.5,38.9],[23.2,38.6],[23.6,38.5],[24.1,38.2],[24,37.7],[23.3,38],[23.2,37.6],[23.4,37.4],[22.9,37.5],[22.9,37.1],[23,36.7],[22.9,36.6],[22.5,36.4],[22,37],[21.7,36.8],[21.7,37.4],[21.1,37.8],[21.6,38.1],[22.2,38.2],[23,38],[23.1,38.2],[22.5,38.4],[21.7,38.4],[21.3,38.3],[20.8,38.8],[21.1,39],[20.7,39.1],[20.2,39.6],[20.4,39.9],[20.7,40.2],[21,40.6],[21.2,40.9],[21.9,41.1],[22.6,41.1],[23.1,41.3],[23.7,41.4],[24.2,41.6],[24.9,41.4],[25.6,41.3],[26.2,41.5],[26.3,41.7]]],[[[23.5,38.9],[23.5,38.8],[23.6,38.8],[23.8,38.7],[23.9,38.7],[24,38.7],[24.2,38.6],[24.2,38.4],[24.2,38.2],[24.3,38.2],[24.4,38.1],[24.5,38.1],[24.6,38.1],[24.6,38],[24.5,38],[24.4,38],[24.3,38],[24.1,38.2],[24.1,38.3],[24,38.4],[24.1,38.4],[23.9,38.4],[23.8,38.4],[23.7,38.4],[23.6,38.4],[23.6,38.5],[23.6,38.6],[23.5,38.6],[23.3,38.7],[23.2,38.8],[23.1,38.9],[23.1,38.8],[22.8,38.8],[22.8,38.9],[22.9,38.9],[23.1,39],[23.3,39],[23.4,39],[23.4,38.9],[23.5,38.9]]],[[[26.4,39.3],[26.5,39.2],[26.6,39.1],[26.6,39],[26.5,39],[26.4,39],[26.3,39],[26.2,39],[26.1,39],[26.1,39.1],[26.2,39.1],[26.3,39.2],[26.2,39.2],[26,39.1],[25.9,39.1],[25.9,39.2],[25.8,39.2],[25.9,39.3],[26,39.3],[26.2,39.3],[26.2,39.4],[26.3,39.4],[26.4,39.3]]],[[[27.8,35.9],[27.7,35.9],[27.7,36],[27.7,36.1],[27.7,36.2],[27.8,36.3],[27.9,36.3],[28.1,36.4],[28.2,36.4],[28.2,36.5],[28.2,36.3],[28.1,36.2],[28.1,36.1],[28,36.1],[28,36],[27.9,36],[27.9,35.9],[27.8,35.9]]],[[[26,38.2],[26,38.1],[25.9,38.2],[25.9,38.3],[26,38.3],[26,38.4],[25.9,38.5],[25.8,38.5],[25.8,38.6],[25.9,38.6],[26,38.6],[26.1,38.6],[26.2,38.6],[26.2,38.5],[26.1,38.4],[26.2,38.3],[26.1,38.2],[26,38.2]]],[[[19.9,39.8],[20,39.8],[19.9,39.7],[19.8,39.7],[19.8,39.6],[19.9,39.5],[20,39.4],[20.1,39.4],[20.1,39.5],[19.9,39.4],[19.8,39.5],[19.7,39.6],[19.7,39.7],[19.6,39.7],[19.6,39.8],[19.7,39.8],[19.8,39.8],[19.9,39.8]]]],"type":"MultiPolygon"},"type":"Feature","properties":{"iso2":"GR","lng":22,"lat":39}},{"geometry":{"coordinates":[[[[16.6,46.5],[16.9,46.3],[17.2,46.2],[17.4,46],[17.7,45.9],[18.2,45.8],[18.6,45.8],[18.9,45.8],[18.9,45.5],[19,45.4],[19.4,45.2],[19.1,44.9],[18.8,45],[18.2,45.1],[17.8,45.1],[17.3,45.2],[17,45.2],[16.6,45.2],[16.3,45],[15.9,45.2],[15.7,44.8],[16,44.6],[16.1,44.2],[16.4,44.1],[16.7,43.9],[17,43.6],[17.3,43.5],[17.6,43.1],[17.5,43],[17.1,43.2],[16.7,43.4],[16.4,43.6],[16.1,43.5],[15.9,43.7],[15.5,43.9],[15.2,44.2],[15.3,44.3],[15.2,44.4],[14.9,44.8],[14.7,45.1],[14.4,45.3],[14.2,45.2],[14,44.9],[13.8,45],[13.5,45.4],[13.9,45.5],[14.5,45.5],[14.7,45.5],[15.1,45.5],[15.4,45.7],[15.6,45.8],[15.7,46.1],[15.8,46.2],[16.3,46.4],[16.5,46.5],[16.6,46.5]]],[[[17.3,43],[17.4,43],[17.4,42.9],[17.5,42.9],[17.7,42.9],[17.6,42.9],[17.8,42.9],[17.9,42.8],[18,42.8],[18.2,42.7],[18.2,42.6],[18.3,42.6],[18.4,42.6],[18.5,42.6],[18.5,42.5],[18.5,42.4],[18.4,42.5],[18.1,42.7],[17.8,42.8],[17.7,42.8],[17.6,42.8],[17.2,43],[17.1,43],[17,43],[17.3,43]]],[[[14.5,44.9],[14.4,44.9],[14.5,44.8],[14.5,44.7],[14.5,44.6],[14.4,44.7],[14.4,44.8],[14.3,44.8],[14.3,44.9],[14.4,45],[14.3,45.1],[14.3,45.2],[14.4,45.2],[14.4,45.1],[14.5,45],[14.5,44.9]]],[[[14.8,44.6],[14.9,44.6],[15,44.6],[15,44.5],[15.1,44.5],[14.9,44.5],[15.1,44.4],[15.2,44.4],[15.2,44.3],[15.3,44.3],[15.1,44.3],[15,44.4],[14.7,44.7],[14.8,44.7],[14.8,44.6]]],[],[],[]],"type":"MultiPolygon"},"type":"Feature","properties":{"iso2":"HR","lng":15.5,"lat":45.2}},{"geometry":{"coordinates":[[[18.8,45.9],[18.4,45.8],[18,45.8],[17.6,45.9],[17.3,46],[17.1,46.2],[16.9,46.4],[16.5,46.5],[16.3,46.9],[16.4,47],[16.5,47.3],[16.7,47.6],[16.5,47.7],[16.9,47.7],[17.1,47.9],[17.4,48],[17.8,47.7],[18.1,47.8],[18.4,47.8],[18.8,47.8],[18.8,48.1],[19.2,48.1],[19.7,48.2],[20.1,48.2],[20.4,48.4],[20.8,48.6],[21.1,48.5],[21.5,48.5],[21.8,48.3],[22.1,48.4],[22.4,48.2],[22.6,48.1],[22.9,48],[22.5,47.8],[22.2,47.6],[21.9,47.4],[21.7,47.1],[21.5,46.7],[21.2,46.4],[21,46.3],[20.7,46.2],[20.5,46.2],[20.2,46.2],[19.8,46.2],[19.5,46.1],[19,46],[18.8,45.9]]],"type":"Polygon"},"type":"Feature","properties":{"iso2":"HU","lng":20,"lat":47}},{"geometry":{"coordinates":[[[[-7.4,55],[-7.7,54.7],[-8,54.5],[-7.9,54.3],[-7.6,54.1],[-7.1,54.4],[-6.7,54.1],[-6.2,54.1],[-6.4,53.9],[-6.2,53.7],[-6.2,53.4],[-6.1,52.9],[-6.2,52.6],[-6.3,52.3],[-6.8,52.2],[-7.1,52.1],[-7.5,52],[-7.9,51.9],[-8.3,51.9],[-8.5,51.7],[-9,51.6],[-9.6,51.5],[-9.7,51.6],[-9.5,51.8],[-10.1,51.6],[-9.7,51.9],[-10.4,51.9],[-9.8,52.1],[-10.1,52.1],[-10.5,52.2],[-9.7,52.2],[-9.7,52.6],[-9,52.6],[-9.1,52.6],[-9.6,52.7],[-9.3,53.2],[-8.9,53.1],[-9.4,53.2],[-9.7,53.4],[-9.8,53.4],[-10,53.6],[-9.9,53.8],[-9.7,53.9],[-9.9,54.1],[-10.1,54.3],[-9.6,54.3],[-9.1,54.2],[-8.6,54.3],[-8.3,54.5],[-8.8,54.7],[-8.4,54.8],[-8.5,55],[-7.8,55.2],[-7.5,55.1],[-7.5,55],[-7.4,55.3],[-7,55.2],[-7.3,55],[-7.4,55]]],[],[],[],[]],"type":"MultiPolygon"},"type":"Feature","properties":{"iso2":"IE","lng":-8,"lat":53}},{"geometry":{"coordinates":[[[-15.1,66.1],[-14.6,65.9],[-14.3,65.8],[-13.9,65.6],[-13.8,65.2],[-14,65.1],[-14,64.8],[-14.5,64.6],[-15.2,64.3],[-16.2,64],[-17.1,63.8],[-17.9,63.5],[-19.3,63.4],[-20.5,63.7],[-20.8,63.8],[-21.4,63.9],[-22.3,63.9],[-22.3,64],[-21.8,64.3],[-22.1,64.3],[-22.1,64.5],[-22.7,64.8],[-23.6,64.7],[-23.8,64.9],[-22.4,65.1],[-21.8,65.2],[-22.2,65.3],[-22.2,65.4],[-22.8,65.5],[-23.7,65.4],[-24.3,65.6],[-24,65.7],[-23.5,65.6],[-23.6,65.8],[-23.7,66],[-23.6,66.2],[-22.7,66.1],[-22.5,65.8],[-22.7,66.3],[-23.2,66.4],[-22,66.3],[-21.6,65.9],[-21.6,65.6],[-21.1,65.5],[-20.4,65.5],[-20.1,66.1],[-19.5,65.7],[-19.2,66.1],[-18.5,66.1],[-18,65.7],[-18,66.2],[-17.2,66.2],[-16.4,66.2],[-15.9,66.4],[-15.2,66.3],[-14.9,66.2],[-15.1,66.1]]],"type":"Polygon"},"type":"Feature","properties":{"iso2":"IS","lng":-18,"lat":65}},{"geometry":{"coordinates":[[[[12.1,47],[12.8,46.6],[13.5,46.4],[13.5,46.1],[13.9,45.6],[13.1,45.8],[12.4,45.4],[12.4,45],[12.3,44.5],[13,43.8],[13.6,43.5],[14.1,42.5],[14.9,42],[15.7,41.9],[15.9,41.6],[17,41.1],[18.1,40.5],[18.4,39.8],[17.9,40.3],[17.3,40.5],[16.6,40.1],[16.8,39.6],[17.1,38.9],[16.6,38.6],[16.1,38.1],[15.6,38],[15.8,38.6],[16.2,39],[15.9,39.5],[15.6,40.1],[14.9,40.2],[14.7,40.6],[14.2,40.8],[13.6,41.3],[12.9,41.4],[12.2,41.9],[11.6,42.3],[11.2,42.6],[10.6,43],[10.3,43.6],[9.4,44.3],[8.4,44.2],[7.7,43.8],[7.6,44.2],[6.9,44.5],[6.6,45.1],[7.2,45.4],[6.9,45.8],[7.6,46],[8.2,46.2],[8.4,46.2],[8.9,45.9],[9.2,46.2],[9.5,46.3],[10.1,46.2],[10.3,46.6],[10.6,46.9],[11.5,47],[12.1,47]]],[[[15.5,38.1],[15.4,37.9],[15.2,37.7],[15.2,37.5],[15.1,37.4],[15.2,37.2],[15.3,37.1],[15.2,37],[15.1,36.9],[15.1,36.7],[15,36.7],[14.8,36.7],[14.6,36.8],[14.4,36.9],[14.3,37],[14.1,37.1],[13.9,37.1],[13.6,37.2],[13.5,37.3],[13.3,37.4],[13.1,37.5],[13,37.6],[12.8,37.6],[12.5,37.7],[12.5,37.8],[12.5,38],[12.7,38.1],[12.9,38],[13,38.1],[13.1,38.2],[13.4,38.2],[13.7,38],[13.9,38],[14.1,38],[14.3,38],[14.5,38],[14.7,38.1],[14.9,38.2],[15.1,38.1],[15.3,38.2],[15.6,38.3],[15.6,38.2],[15.5,38.1]]],[[[9.5,41.1],[9.6,41],[9.6,40.9],[9.7,40.7],[9.7,40.6],[9.8,40.5],[9.7,40.4],[9.6,40.3],[9.7,40.1],[9.7,39.9],[9.7,39.7],[9.6,39.5],[9.6,39.3],[9.6,39.1],[9.4,39.1],[9.3,39.2],[9,39.1],[8.9,38.9],[8.7,38.9],[8.6,39],[8.5,39],[8.3,39.1],[8.4,39.2],[8.4,39.4],[8.4,39.6],[8.4,39.8],[8.5,39.7],[8.6,39.9],[8.4,39.9],[8.5,40.1],[8.5,40.3],[8.3,40.6],[8.1,40.6],[8.1,40.7],[8.3,40.9],[8.4,40.8],[8.6,40.8],[8.7,40.9],[8.8,41],[9,41.1],[9.2,41.2],[9.5,41.1]]],[],[],[],[]],"type":"MultiPolygon"},"type":"Feature","properties":{"iso2":"IT","lng":12.8,"lat":42.8}},{"geometry":{"coordinates":[],"type":"Polygon"},"type":"Feature","properties":{"iso2":"LI","lng":9.5,"lat":47.3}},{"geometry":{"coordinates":[[[[25,56.3],[25.3,56.2],[25.7,56.1],[26.1,55.9],[26.3,55.8],[26.5,55.7],[26.5,55.4],[26.8,55.3],[26.5,55.2],[26.2,55],[25.9,54.9],[25.7,54.7],[25.7,54.5],[25.5,54.3],[25.8,54.3],[25.6,54.1],[25.6,54.2],[25.2,54.2],[25,54.2],[24.8,54],[24.5,54],[24.3,53.9],[24.1,54],[23.9,53.9],[23.6,53.9],[23.5,54.1],[23.3,54.2],[23,54.4],[22.7,54.4],[22.8,54.8],[22.8,54.9],[22.5,55.1],[22.1,55.1],[21.7,55.2],[21.3,55.3],[21.2,55.4],[21.2,55.6],[21,55.9],[21.1,56.1],[21.3,56.2],[21.7,56.3],[22.1,56.4],[22.5,56.4],[22.8,56.4],[23,56.3],[23.2,56.4],[23.4,56.3],[23.6,56.4],[24,56.3],[24.3,56.3],[24.6,56.3],[24.9,56.5],[25,56.3]]],[]],"type":"MultiPolygon"},"type":"Feature","properties":{"iso2":"LT","lng":24,"lat":56}},{"geometry":{"coordinates":[[[6,50.2],[6.1,50.1],[6.1,50],[6.2,50],[6.2,49.9],[6.3,49.9],[6.3,49.8],[6.4,49.8],[6.5,49.8],[6.5,49.7],[6.4,49.7],[6.4,49.5],[6.3,49.5],[6.2,49.5],[6.1,49.5],[6,49.4],[5.9,49.5],[5.8,49.5],[5.8,49.6],[5.9,49.6],[5.9,49.7],[5.8,49.8],[5.7,49.8],[5.7,49.9],[5.8,50],[5.9,50.1],[6,50.2]]],"type":"Polygon"},"type":"Feature","properties":{"iso2":"LU","lng":6.2,"lat":49.8}},{"geometry":{"coordinates":[[[21.1,56.4],[21,56.7],[21.1,56.9],[21.4,57],[21.4,57.3],[21.6,57.5],[21.8,57.6],[22.1,57.6],[22.6,57.8],[22.7,57.6],[22.9,57.4],[23.2,57.3],[23.3,57.1],[23.7,57],[24,57],[24.4,57.3],[24.3,57.7],[24.4,57.9],[24.6,58],[25,58.1],[25.2,58],[25.4,58],[25.8,57.9],[26.2,57.7],[26.6,57.5],[26.9,57.6],[27.3,57.5],[27.5,57.4],[27.8,57.3],[27.8,57.2],[27.8,56.9],[27.9,56.7],[28.2,56.4],[28.1,56.2],[27.7,56],[27.6,55.8],[27.2,55.8],[26.9,55.8],[26.7,55.7],[26.4,55.7],[26.2,55.8],[26,56],[25.6,56.2],[25.2,56.2],[25,56.4],[24.7,56.4],[24.4,56.3],[24.1,56.3],[23.7,56.4],[23.5,56.3],[23.3,56.4],[23.1,56.3],[22.9,56.4],[22.6,56.4],[22.2,56.4],[21.9,56.4],[21.4,56.2],[21.2,56.1],[21,56.2],[21.1,56.4]]],"type":"Polygon"},"type":"Feature","properties":{"iso2":"LV","lng":25,"lat":57}},{"geometry":{"coordinates":[],"type":"Polygon"},"type":"Feature","properties":{"iso2":"MC","lng":7.4,"lat":43.7}},{"geometry":{"coordinates":[[[28.1,46.9],[28,47],[27.9,47.1],[27.7,47.3],[27.6,47.4],[27.4,47.6],[27.3,47.7],[27.2,47.9],[27,48.2],[26.7,48.3],[26.8,48.3],[27.2,48.4],[27.5,48.5],[27.8,48.4],[27.9,48.3],[28.1,48.3],[28.2,48.2],[28.4,48.2],[28.5,48.1],[28.7,48.1],[28.9,48],[29.1,47.9],[29.2,48],[29.2,47.6],[29.1,47.5],[29.2,47.5],[29.3,47.4],[29.4,47.3],[29.6,47.3],[29.6,47],[29.7,46.9],[29.9,46.8],[30,46.6],[29.9,46.5],[30,46.4],[29.9,46.4],[29.8,46.4],[29.6,46.4],[29.5,46.5],[29.3,46.4],[29.2,46.5],[28.9,46.4],[29,46.2],[28.9,46],[28.7,46],[28.8,45.9],[28.7,45.8],[28.5,45.7],[28.5,45.5],[28.3,45.5],[28.2,45.4],[28.2,45.6],[28.1,45.9],[28.1,46.1],[28.2,46.3],[28.3,46.4],[28.2,46.7],[28.1,46.9]]],"type":"Polygon"},"type":"Feature","properties":{"iso2":"MD","lng":29,"lat":47}},{"geometry":{"coordinates":[[[18.5,42.6],[18.6,42.7],[18.5,42.8],[18.6,43],[18.7,43.1],[18.7,43.3],[18.9,43.4],[19,43.2],[19.1,43.3],[19,43.5],[19,43.6],[19.3,43.5],[19.4,43.4],[19.6,43.3],[19.7,43.2],[19.9,43.1],[20,43],[20.2,43],[20.4,42.8],[20.1,42.8],[20,42.7],[20.1,42.6],[19.9,42.5],[19.7,42.5],[19.7,42.7],[19.6,42.6],[19.5,42.4],[19.4,42.1],[19.3,41.9],[19.2,41.9],[19.1,42],[19,42.1],[18.9,42.3],[18.7,42.4],[18.5,42.4],[18.5,42.5],[18.5,42.6]]],"type":"Polygon"},"type":"Feature","properties":{"iso2":"ME","lng":19.3,"lat":42.5}},{"geometry":{"coordinates":[[[20.8,40.9],[20.7,41.1],[20.6,41.2],[20.5,41.3],[20.6,41.4],[20.5,41.6],[20.5,41.8],[20.7,41.9],[20.8,42],[20.9,42.1],[21.2,42.1],[21.3,42.2],[21.6,42.3],[21.8,42.3],[22,42.3],[22.2,42.3],[22.4,42.3],[22.5,42.1],[22.7,42.1],[22.9,41.9],[23,41.8],[23,41.6],[23,41.4],[22.8,41.3],[22.7,41.2],[22.6,41.1],[22.4,41.1],[22.3,41.2],[22,41.1],[21.9,41],[21.6,40.9],[21.4,40.9],[21.2,40.9],[21,40.9],[20.8,40.9]]],"type":"Polygon"},"type":"Feature","properties":{"iso2":"MK","lng":22,"lat":41.8}},{"geometry":{"coordinates":[[],[]],"type":"MultiPolygon"},"type":"Feature","properties":{"iso2":"MT","lng":14.6,"lat":35.8}},{"geometry":{"coordinates":[[[[6.9,53.4],[7.2,53],[7.1,52.7],[6.9,52.7],[6.7,52.5],[7,52.5],[7.1,52.2],[6.8,52.1],[6.8,51.9],[6.4,51.8],[6,51.7],[6.2,51.4],[6,51.1],[6.1,50.9],[5.9,50.8],[5.6,50.9],[5.9,51.2],[5.5,51.3],[5.1,51.3],[5,51.4],[4.7,51.5],[4.5,51.5],[4.3,51.4],[3.8,51.4],[3.5,51.6],[3.9,51.6],[4.1,51.5],[4.1,51.6],[3.7,51.7],[4.1,51.8],[4,52],[4.5,52.3],[4.7,52.5],[5,52.4],[5.4,52.3],[5.6,52.4],[5.9,52.5],[5.6,52.7],[5.6,52.9],[5.3,53.1],[5.1,52.8],[5.2,52.7],[5.1,52.5],[4.7,52.8],[4.8,52.9],[5.5,53.2],[6.1,53.4],[6.7,53.5],[6.9,53.4]]],[[[3.8,51.3],[3.9,51.3],[4,51.4],[4.2,51.4],[4.2,51.3],[4.1,51.3],[4,51.2],[3.9,51.2],[3.8,51.2],[3.7,51.3],[3.6,51.3],[3.5,51.3],[3.5,51.2],[3.4,51.2],[3.4,51.3],[3.4,51.4],[3.5,51.4],[3.6,51.4],[3.7,51.4],[3.8,51.3]]],[[[5.8,52.4],[5.7,52.4],[5.6,52.4],[5.5,52.4],[5.5,52.3],[5.6,52.3],[5.4,52.3],[5.3,52.3],[5.2,52.3],[5.1,52.3],[5.1,52.4],[5.2,52.4],[5.3,52.5],[5.4,52.5],[5.5,52.5],[5.6,52.6],[5.8,52.6],[5.9,52.5],[5.8,52.5],[5.8,52.4]]],[],[],[],[]],"type":"MultiPolygon"},"type":"Feature","properties":{"iso2":"NL","lng":5.8,"lat":52.5}},{"geometry":{"coordinates":[[[[5.3,61.6],[5.2,61.9],[6.3,62.4],[6.4,62.5],[7.6,62.8],[8.3,62.8],[8.8,63.3],[10.6,63.4],[11,64],[9.6,63.7],[10.9,64.6],[11.2,64.7],[12.4,65.3],[12.9,66.1],[13,66.4],[13.8,66.9],[15.5,67.2],[15.5,67.4],[15,67.8],[16,68.2],[16.4,68.3],[17.1,68.5],[17.7,69.1],[19.2,69.3],[19.7,69.4],[20.8,69.8],[21.5,70.1],[22.7,70.1],[24.2,70.6],[25.3,70.9],[25.3,70.1],[26.6,70.4],[27.7,71.1],[28.3,70.7],[29.3,70.7],[30.7,70.3],[29.7,69.9],[30.9,69.5],[29.1,69.4],[26.2,69.8],[24.4,68.7],[21.7,69.3],[19.9,68.3],[16.1,67.4],[14.3,65.1],[12.3,63.7],[12.8,61.4],[11.9,59.8],[10.6,59.9],[10,59],[7.2,58],[5.6,59],[6.5,59.3],[5.2,59.5],[6.2,60.3],[5.7,60.4],[5,60.8],[6.3,61.1],[6.7,61.4],[5.3,61.6]]],[[[16,68.8],[16,68.7],[15.9,68.7],[15.9,68.6],[15.8,68.6],[15.7,68.5],[15.8,68.5],[16.1,68.7],[16.1,68.8],[16.2,68.9],[16.4,68.9],[16.4,68.8],[16.5,68.8],[16.6,68.7],[16.6,68.6],[16.5,68.6],[16.4,68.6],[16.3,68.6],[16.2,68.5],[16.1,68.5],[16,68.5],[16,68.4],[15.9,68.4],[15.8,68.4],[15.7,68.3],[15.6,68.3],[15.5,68.3],[15.4,68.3],[15.3,68.3],[15.4,68.4],[15.5,68.4],[15.6,68.5],[15.5,68.5],[15.3,68.4],[15.2,68.3],[15.1,68.3],[15,68.2],[15,68.3],[15.1,68.4],[15.2,68.5],[15.3,68.5],[15.2,68.6],[15.3,68.6],[15.4,68.6],[15.5,68.7],[15.4,68.7],[15.6,68.7],[15.7,68.7],[15.5,68.8],[15.6,68.9],[15.7,69],[15.9,69],[15.9,68.9],[15.9,68.8],[16,68.8]]],[[[17.6,69.5],[17.7,69.5],[17.7,69.6],[17.8,69.6],[17.9,69.6],[18,69.5],[18.1,69.4],[18.1,69.3],[18,69.3],[17.9,69.3],[17.9,69.2],[18,69.2],[17.6,69.2],[17.5,69.2],[17.4,69.2],[17.2,69.1],[17.2,69],[17.1,69],[17,69],[17.1,69.1],[17,69.1],[16.9,69.1],[16.8,69],[16.8,69.1],[17.1,69.2],[17.2,69.2],[17,69.2],[16.9,69.2],[17.1,69.3],[17,69.3],[16.9,69.3],[17,69.4],[16.9,69.4],[17.2,69.4],[17.3,69.4],[17.4,69.4],[17.5,69.4],[17.2,69.5],[17.3,69.5],[17.4,69.5],[17.5,69.5],[17.5,69.6],[17.6,69.6],[17.6,69.5]]],[[[23.5,70.8],[23.4,70.7],[23.3,70.7],[23.2,70.7],[23.1,70.6],[22.9,70.5],[22.8,70.5],[22.8,70.6],[22.7,70.6],[22.6,70.6],[22.6,70.5],[22.5,70.5],[22.3,70.5],[22.2,70.5],[22.1,70.5],[22.3,70.6],[22.2,70.6],[22.1,70.6],[22,70.6],[21.9,70.6],[22,70.7],[22.1,70.7],[22.3,70.7],[22.4,70.7],[22.5,70.7],[22.6,70.7],[22.7,70.7],[22.8,70.7],[22.8,70.8],[22.9,70.7],[23,70.7],[23.1,70.7],[23.2,70.8],[23.3,70.8],[23.3,70.9],[23.4,70.9],[23.4,70.8],[23.5,70.8]]],[[[15.4,68.8],[15.4,68.7],[15.3,68.6],[15.1,68.6],[15,68.6],[14.9,68.6],[14.8,68.6],[14.9,68.7],[15.1,68.7],[15.2,68.7],[15.1,68.8],[15,68.8],[15,68.7],[14.8,68.7],[14.7,68.7],[14.5,68.6],[14.4,68.6],[14.4,68.7],[14.4,68.8],[14.5,68.8],[14.6,68.8],[14.7,68.8],[14.9,68.8],[14.9,68.9],[15,68.9],[15.1,68.9],[15.2,68.8],[15,69],[15.1,69],[15.2,69],[15.2,68.9],[15.3,68.9],[15.4,68.8]]],[[[18.9,69.7],[18.8,69.7],[18.8,69.6],[18.7,69.6],[18.6,69.6],[18.5,69.6],[18.4,69.5],[18.3,69.5],[18.2,69.5],[18,69.6],[18.1,69.6],[18.2,69.6],[18.3,69.6],[18.2,69.7],[18.3,69.7],[18.4,69.7],[18.6,69.7],[18.5,69.7],[18.3,69.8],[18.4,69.8],[18.5,69.8],[18.6,69.8],[18.7,69.7],[18.8,69.8],[18.7,69.8],[18.7,69.9],[18.8,69.9],[19,69.8],[19.1,69.8],[19,69.7],[18.9,69.7]]],[[[19.3,70],[19.4,70],[19.5,70],[19.5,70.1],[19.6,70],[19.7,70],[19.5,69.9],[19.4,69.8],[19.3,69.8],[19.2,69.8],[19.1,69.8],[19,69.8],[19,69.9],[18.9,69.9],[18.8,69.9],[18.7,69.9],[18.8,70],[18.9,70],[19,70],[19.1,70],[19.1,70.1],[19.2,70.1],[19.3,70.1],[19.3,70]]]],"type":"MultiPolygon"},"type":"Feature","properties":{"iso2":"NO","lng":10,"lat":62}},{"geometry":{"coordinates":[[[18.9,49.5],[18.5,49.9],[17.9,50],[17.8,50.2],[17.2,50.3],[17,50.2],[16.6,50.2],[16.2,50.4],[16.1,50.7],[15.5,50.8],[15,50.9],[15,51.4],[14.8,51.6],[14.8,52.1],[14.6,52.5],[14.2,52.8],[14.4,53.3],[14.6,53.8],[14.2,53.9],[15,54.1],[15.8,54.2],[16.3,54.4],[16.9,54.6],[17.4,54.7],[17.9,54.8],[18.6,54.7],[18.5,54.6],[18.9,54.4],[19.4,54.4],[19.2,54.3],[19.9,54.4],[20.7,54.4],[21.5,54.3],[22.3,54.3],[22.9,54.4],[23.5,54.2],[23.6,53.6],[23.9,52.8],[23.4,52.5],[23.6,52.1],[23.6,51.7],[23.7,51.2],[24.1,50.9],[24,50.4],[23.5,50.2],[22.7,49.6],[22.9,49.1],[22.3,49.1],[21.5,49.4],[20.9,49.3],[20.2,49.3],[19.8,49.3],[19.4,49.6],[18.9,49.5]]],"type":"Polygon"},"type":"Feature","properties":{"iso2":"PL","lng":20,"lat":52}},{"geometry":{"coordinates":[[[[-8.2,41.9],[-7.9,41.9],[-7.6,41.8],[-7.2,41.9],[-6.9,42],[-6.6,42],[-6.5,41.7],[-6.2,41.6],[-6.4,41.3],[-6.8,41.1],[-6.8,40.9],[-6.8,40.4],[-7,40.1],[-7.1,39.7],[-7.4,39.6],[-7.3,39.4],[-7,39.1],[-7.2,38.8],[-7.2,38.3],[-7,38.1],[-7.3,38],[-7.4,37.7],[-7.4,37.3],[-7.6,37.1],[-8.1,37.1],[-8.7,37.1],[-9,37.1],[-8.8,37.4],[-8.8,37.9],[-8.8,38.3],[-8.9,38.5],[-9.2,38.5],[-9.1,38.6],[-9,38.9],[-9.4,38.7],[-9.4,38.9],[-9.3,39.2],[-9.3,39.4],[-9,39.7],[-8.9,40.1],[-8.8,40.5],[-8.7,40.8],[-8.7,41.2],[-8.9,41.7],[-8.7,42],[-8.4,42.1],[-8.1,42.1],[-8.2,41.9]]],[[[-25.6,37.8],[-25.5,37.8],[-25.4,37.8],[-25.4,37.9],[-25.3,37.9],[-25.2,37.9],[-25.1,37.8],[-25.2,37.7],[-25.3,37.7],[-25.5,37.7],[-25.6,37.7],[-25.7,37.7],[-25.7,37.8],[-25.8,37.8],[-25.9,37.8],[-25.9,37.9],[-25.8,37.9],[-25.7,37.9],[-25.6,37.8]]],[],[],[],[],[]],"type":"MultiPolygon"},"type":"Feature","properties":{"iso2":"PT","lng":-8,"lat":39.5}},{"geometry":{"coordinates":[[[20.7,46.2],[21,46.2],[21.3,46.6],[21.7,47],[21.9,47.4],[22.2,47.7],[22.7,47.8],[23.1,48.1],[23.5,48],[24.2,47.9],[24.6,47.9],[24.9,47.7],[25.2,47.9],[25.8,48],[26.3,48.1],[26.7,48.3],[27.2,47.8],[27.6,47.4],[27.9,47],[28.2,46.7],[28.1,46.2],[28.2,45.6],[28.3,45.3],[28.8,45.3],[29.5,45.4],[29.6,45.2],[29.5,44.8],[29,44.8],[28.9,45],[28.8,44.6],[28.9,44.5],[28.6,44.2],[28.6,43.7],[28.1,43.8],[27.8,44],[27.3,44.1],[26.8,44.1],[26.1,44],[25.7,43.7],[25.3,43.7],[24.7,43.7],[24.4,43.7],[23.8,43.8],[23.3,43.8],[22.9,43.9],[22.9,44.1],[22.5,44.4],[22.8,44.5],[22.3,44.7],[21.9,44.6],[21.5,44.8],[21.5,45],[21.4,45.2],[20.8,45.7],[20.5,45.9],[20.6,46.2],[20.7,46.2]]],"type":"Polygon"},"type":"Feature","properties":{"iso2":"RO","lng":25,"lat":46}},{"geometry":{"coordinates":[[[20.1,42.6],[20.1,42.8],[20.2,43],[19.9,43.1],[19.6,43.3],[19.3,43.5],[19.5,43.7],[19.3,44],[19.6,44],[19.2,44.3],[19.2,44.6],[19.3,44.9],[19.1,45],[19.4,45.2],[19,45.5],[18.9,45.6],[18.8,45.9],[19.2,46],[19.7,46.2],[20,46.2],[20.3,46.1],[20.7,45.8],[20.8,45.6],[21.4,45.2],[21.4,45],[21.4,44.9],[21.6,44.7],[22,44.6],[22.3,44.7],[22.7,44.6],[22.6,44.5],[22.6,44.3],[22.6,44.1],[22.4,43.7],[22.7,43.4],[23,43.2],[22.5,42.9],[22.5,42.5],[22.3,42.4],[21.9,42.3],[21.5,42.3],[21.1,42.2],[20.8,41.9],[20.5,42.2],[20.2,42.3],[20.1,42.6]]],"type":"Polygon"},"type":"Feature","properties":{"iso2":"RS","lng":21,"lat":44}},{"geometry":{"coordinates":[[[[104.3,77.7],[110.9,76.8],[110,74.4],[110.6,73.8],[117,73.6],[127.3,71.4],[135.3,71.6],[143.1,72.7],[148.5,72.3],[159,70.9],[168.2,69.5],[178.2,69.4],[177,64.7],[173.4,61.6],[164.3,60.1],[161.7,55.6],[155.9,54],[164,61.4],[159.8,61.3],[152.6,59],[144.5,59.4],[136.7,53.8],[141.3,52.3],[135,43.5],[133.5,45.6],[127.5,50.2],[120.5,51.9],[109.6,49.2],[98.7,51.8],[89.7,49.8],[80.3,50.9],[71.1,54.3],[61.4,54.1],[57.9,51.1],[48.7,50.5],[47.5,45.5],[43.1,43],[38.4,46.7],[37.8,50.1],[31.9,54],[29.5,60],[29.6,65.3],[33,69.5],[38.6,66.1],[34.6,65.2],[39.7,65.5],[46.5,68],[52.3,68.3],[59,68.9],[67.3,68.7],[70.2,72.9],[72.3,67.3],[74.5,68.7],[74,69.1],[78,71],[82.9,71.7],[80.5,73.2],[86.5,74.3],[93.2,75.8],[99.1,75.5],[104.3,77.7]]],[[[68.3,77],[68.9,76.6],[67.7,76.2],[66.7,76.1],[65.2,75.8],[64.2,75.7],[63.2,75.6],[62.3,75.4],[61.4,75.2],[60.7,75.1],[60.5,75],[60.5,74.9],[60.1,74.7],[59.9,74.6],[59.2,74.6],[58.6,74.5],[58.7,74.2],[58.2,74.1],[57.6,74.2],[57.9,73.9],[57.3,73.8],[57,73.8],[57,73.6],[57,73.4],[56.6,73.3],[55.9,73.4],[55,73.4],[54.1,73.4],[54.5,73.6],[54.4,73.7],[53.6,73.7],[54.2,73.9],[54.8,74.1],[55.9,74.1],[55.7,74.3],[56.3,74.5],[55.9,74.7],[57,74.7],[55.9,74.8],[56.4,75],[55.8,75.1],[56.3,75.2],[56.9,75.3],[57.5,75.3],[58,75.6],[58.5,75.8],[59.4,75.9],[60.3,76],[60.5,76],[60.9,76.2],[61.8,76.3],[62.8,76.3],[63.7,76.3],[64.8,76.5],[65.5,76.6],[65.9,76.7],[66.7,76.9],[67.6,77],[68.3,77]]],[[[97.6,80.2],[98,80.1],[97.6,79.8],[97.3,79.7],[97.7,79.8],[97.9,79.9],[98.2,79.9],[98.6,80],[98.5,80.1],[98.8,80],[99.1,80],[99.5,79.9],[99.8,79.9],[100,79.7],[99.7,79.6],[99.7,79.3],[99.4,79.3],[99.1,79.3],[99.6,79.2],[99.7,79.1],[99.9,79],[99.7,78.9],[99.4,78.8],[99,78.8],[98.6,78.8],[98,78.8],[97.6,78.8],[97.2,78.9],[96.9,79],[96.3,79],[96.1,79],[95.7,79],[95.7,79.1],[95.3,79.1],[95,79],[94.6,79.2],[94.3,79.2],[94.4,79.4],[94.2,79.5],[94.1,79.4],[93.7,79.5],[93.8,79.6],[93.5,79.5],[93.2,79.4],[93.2,79.5],[92.9,79.6],[93.8,79.7],[94.3,79.8],[94.6,79.8],[94.2,79.9],[94.6,80],[95,80.1],[95.2,80],[95.4,80.1],[96,80.1],[96.4,80.1],[97.1,80.2],[97.5,80.2],[97.6,80.2]]],[[[-179.6,68.9],[-179.1,68.8],[-178.8,68.6],[-178,68.3],[-178.4,68.6],[-177.4,68.2],[-176.8,68.1],[-175.6,67.8],[-175.3,67.4],[-174.8,67.4],[-174.8,66.7],[-174.5,66.6],[-174.3,66.4],[-174,66.2],[-174.1,66.6],[-174.4,67],[-174.2,67.1],[-173.4,67.1],[-173.4,66.8],[-172.6,66.9],[-173,67.1],[-171.7,67],[-171.3,66.7],[-170.5,66.3],[-170.2,66.3],[-169.9,66.1],[-170,66],[-170.5,65.7],[-171.3,65.8],[-171.1,65.5],[-171.9,65.5],[-172.3,65.6],[-172.7,65.6],[-172.3,65.4],[-172.7,65.2],[-172.4,64.9],[-173.2,64.8],[-173.1,64.7],[-172.4,64.4],[-173,64.5],[-173.3,64.3],[-173.4,64.5],[-174.1,64.5],[-175,64.8],[-175.8,64.9],[-175.9,65.4],[-176.6,65.6],[-177.5,65.5],[-178.6,65.5],[-178.9,65.9],[-178.5,66.3],[-179.1,66.2],[-179.2,66.2],[-179.7,66.2],[-179.4,65.6],[-179.6,65.2],[-180,66.1],[-179.6,68.9]]],[[[128.1,72.6],[128.6,72.5],[128.7,72.5],[128.8,72.5],[128.9,72.5],[129,72.5],[129.1,72.5],[129.2,72.5],[129.3,72.5],[129.3,72.4],[129.4,72.4],[129.5,72.4],[129.5,72.3],[129.4,72.3],[129.3,72.3],[129.5,72.2],[129.6,72.2],[129.4,72.2],[129.2,72.1],[129.3,72.1],[129.4,72.1],[129.5,72.1],[129,72.1],[128.9,72.1],[128.8,72.1],[128.7,72.1],[128.5,72.1],[128.5,72.2],[128.6,72.2],[128.4,72.2],[128.2,72.2],[128,72.3],[127.9,72.3],[127.7,72.4],[127.6,72.4],[127.5,72.4],[127.4,72.4],[127.3,72.4],[127.2,72.4],[127.1,72.4],[127,72.4],[126.8,72.4],[126.7,72.4],[126.6,72.5],[126.7,72.5],[126.8,72.5],[126.9,72.5],[127,72.5],[127,72.6],[127.1,72.6],[127.2,72.6],[127.3,72.6],[127.4,72.6],[127.5,72.6],[127.7,72.6],[127.8,72.6],[128,72.6],[128.1,72.6]]],[[[124.6,73.7],[124.8,73.7],[125,73.6],[125.1,73.7],[125.2,73.7],[125.2,73.5],[125.4,73.6],[125.5,73.5],[125.6,73.4],[125.9,73.5],[126.2,73.6],[126.3,73.5],[126.3,73.4],[126.2,73.4],[126.5,73.4],[126.6,73.3],[126.7,73.2],[126.6,73],[126.4,73],[126.3,72.9],[126.4,72.8],[126.2,72.5],[126.3,72.4],[126.1,72.3],[125.9,72.4],[125.7,72.4],[125.5,72.4],[125.3,72.5],[125.2,72.6],[125,72.6],[124.8,72.6],[124.7,72.7],[124.4,72.7],[124.2,72.8],[124,72.8],[123.8,72.8],[123.6,72.8],[123.4,72.8],[123.3,72.9],[123.1,72.9],[122.9,72.9],[122.5,72.9],[122.4,73],[122.7,73],[122.9,73],[123.4,73.2],[123.6,73.2],[123.4,73.3],[123.2,73.6],[123.4,73.6],[123.5,73.7],[123.7,73.6],[123.9,73.7],[124,73.8],[124,73.7],[124.2,73.8],[124.4,73.8],[124.6,73.7]]],[[[54.7,81.1],[54.9,81.1],[55,81.1],[55.1,81.1],[55.2,81.1],[55.3,81],[55.4,81],[55.5,81],[55.6,81],[55.8,81],[56,81],[56.1,81],[56.4,81],[56.6,81],[56.6,80.9],[56.7,80.9],[56.8,80.9],[56.9,80.9],[57,80.9],[57.1,80.9],[57.2,80.9],[57.3,80.9],[57.5,80.8],[57.6,80.8],[57.7,80.8],[57.5,80.7],[57.4,80.7],[57.3,80.7],[57.2,80.7],[57.1,80.7],[57,80.7],[56.9,80.7],[56.8,80.8],[56.7,80.8],[56.6,80.8],[56.5,80.8],[56.3,80.8],[56.2,80.8],[56.1,80.8],[56,80.8],[55.8,80.9],[55.7,80.9],[55.6,80.9],[55.5,80.9],[55.4,80.9],[55.2,81],[55.1,81],[55,80.9],[55,81],[54.9,81],[54.8,81],[54.7,81],[54.6,81],[54.5,81],[54.4,81],[54.6,81.1],[54.7,81.1]]]],"type":"MultiPolygon"},"type":"Feature","properties":{"iso2":"RU","lng":100,"lat":60}},{"geometry":{"coordinates":[[[[21.8,68.6],[23,68.3],[23.5,67.6],[23.7,67],[23.7,66.2],[23.5,65.8],[22.4,65.9],[22.1,65.5],[21.6,65.2],[21.2,64.8],[21.6,64.4],[20.4,63.7],[19.5,63.6],[18.9,63.2],[17.9,62.8],[17.5,62.4],[17.5,62],[17.2,61.6],[17.5,60.6],[18.4,60.3],[19.1,59.8],[18.2,59.4],[17.7,59.6],[17.4,59.5],[16.5,59.5],[17.1,59.4],[18.4,59.3],[17.9,58.9],[17.1,58.8],[16.2,58.6],[16.8,58.2],[16.7,57.7],[16.6,57.1],[16,56.3],[14.8,56.1],[14.3,55.6],[13.4,55.3],[12.7,56.2],[12.8,56.6],[12.2,57.3],[11.7,57.8],[11.2,58.3],[11.4,59.1],[11.8,59.7],[12.6,60.4],[12.6,61.1],[12.3,62.1],[12.2,63],[12.7,64],[14.1,64.5],[14.4,65.2],[15,66.1],[16.2,67.3],[17.6,68],[18.6,68.5],[20,68.5],[20.8,69],[21.8,68.6]]],[[[18.2,56.9],[18.1,56.9],[18.2,57],[18.3,57],[18.3,57.1],[18.2,57.1],[18.1,57.2],[18.2,57.3],[18.1,57.4],[18.1,57.5],[18.1,57.6],[18.2,57.6],[18.3,57.6],[18.3,57.7],[18.4,57.7],[18.4,57.8],[18.5,57.8],[18.7,57.9],[18.9,57.9],[19,57.9],[19,57.8],[18.9,57.7],[18.8,57.7],[18.8,57.5],[18.8,57.4],[18.7,57.2],[18.6,57.2],[18.5,57.2],[18.4,57.2],[18.4,57.1],[18.3,56.9],[18.2,56.9]]],[[[16.8,56.8],[16.7,56.7],[16.6,56.5],[16.6,56.4],[16.6,56.3],[16.5,56.2],[16.4,56.2],[16.4,56.3],[16.4,56.5],[16.4,56.6],[16.5,56.8],[16.6,56.9],[16.7,56.9],[16.8,57.1],[16.9,57.1],[17,57.2],[17,57.3],[17,57.4],[17.1,57.4],[17.1,57.3],[17.1,57.2],[17,57.1],[16.9,57],[16.9,56.9],[16.8,56.8]]],[],[],[],[]],"type":"MultiPolygon"},"type":"Feature","properties":{"iso2":"SE","lng":15,"lat":62}},{"geometry":{"coordinates":[[[13.7,46.5],[13.9,46.5],[14.2,46.4],[14.8,46.5],[14.9,46.6],[15.1,46.7],[15.4,46.7],[15.8,46.7],[16,46.8],[16.2,46.9],[16.3,46.8],[16.4,46.7],[16.6,46.5],[16.3,46.5],[16.3,46.4],[16.1,46.3],[15.8,46.2],[15.6,46.2],[15.7,46.1],[15.7,45.9],[15.6,45.8],[15.3,45.8],[15.4,45.7],[15.3,45.5],[15.1,45.5],[14.9,45.5],[14.7,45.5],[14.6,45.7],[14.5,45.5],[14.1,45.5],[13.9,45.5],[13.6,45.5],[13.8,45.5],[13.7,45.6],[13.8,45.7],[13.7,45.8],[13.6,45.9],[13.5,46],[13.6,46.1],[13.7,46.2],[13.5,46.2],[13.4,46.3],[13.7,46.4],[13.7,46.5]]],"type":"Polygon"},"type":"Feature","properties":{"iso2":"SI","lng":14.8,"lat":46.1}},{"geometry":{"coordinates":[[[17.3,48],[17.1,48.1],[17,48.3],[16.9,48.4],[17,48.7],[17.2,48.9],[17.5,48.8],[17.8,48.9],[18.1,49.1],[18.2,49.3],[18.5,49.5],[18.8,49.5],[19,49.4],[19.3,49.5],[19.5,49.5],[19.8,49.4],[19.9,49.2],[20.1,49.3],[20.4,49.4],[20.8,49.3],[21,49.4],[21.4,49.4],[21.8,49.4],[22.2,49.2],[22.5,49.1],[22.5,49],[22.4,48.8],[22.2,48.4],[21.9,48.4],[21.7,48.4],[21.5,48.5],[21.2,48.5],[20.9,48.5],[20.7,48.6],[20.4,48.4],[20.2,48.3],[19.9,48.1],[19.6,48.2],[19.2,48.1],[18.9,48.1],[18.8,47.9],[18.7,47.8],[18.4,47.8],[18.2,47.7],[17.9,47.8],[17.7,47.8],[17.4,48],[17.3,48]]],"type":"Polygon"},"type":"Feature","properties":{"iso2":"SK","lng":19.5,"lat":48.7}},{"geometry":{"coordinates":[],"type":"Polygon"},"type":"Feature","properties":{"iso2":"SM","lng":12.4,"lat":43.8}},{"geometry":{"coordinates":[[[[35.1,42],[36.1,41.7],[36.6,41.4],[37.4,41.1],[38.2,40.9],[39.1,41.1],[40.3,41],[41.4,41.4],[42.3,41.5],[43.2,41.2],[43.7,40.7],[44,40],[44.8,39.6],[44.2,39],[44.5,38.3],[44.6,37.4],[44.2,37.1],[43.5,37.2],[42.4,37.1],[41.5,37.1],[40.3,36.9],[39,36.7],[38,36.8],[37,36.7],[36.5,36.2],[36,35.9],[36,36.5],[35.7,36.8],[34.9,36.8],[34,36.3],[32.8,36],[32,36.5],[30.7,36.9],[30.3,36.3],[29.3,36.2],[28.9,36.7],[28.2,36.7],[27.7,36.7],[27.8,37],[27.5,37.1],[27.2,37.5],[26.8,38.2],[26.4,38.3],[26.5,38.6],[27,38.5],[26.8,39],[27,39.6],[26.2,39.7],[26.7,40.3],[27.5,40.3],[28,40.4],[29,40.5],[29.6,40.7],[29.1,40.9],[29.9,41.1],[30.9,41.1],[32,41.5],[33.2,42],[34.2,42],[35.1,42]]],[[[27.4,42],[27.6,42],[27.8,42],[28,42],[28,41.8],[28.2,41.5],[28.5,41.4],[28.9,41.3],[29,41.3],[29.1,41.2],[29,41.1],[28.8,41],[28.6,41.1],[28.5,41],[28.4,41.1],[28.1,41.1],[27.9,41],[27.7,41],[27.5,40.9],[27.4,40.8],[27.2,40.6],[27,40.6],[26.7,40.5],[26.6,40.4],[26.4,40.2],[26.2,40.1],[26.2,40.2],[26.3,40.3],[26.4,40.4],[26.6,40.5],[26.8,40.7],[26.6,40.6],[26.3,40.6],[26.1,40.7],[26.1,40.8],[26.2,40.9],[26.4,41],[26.3,41.2],[26.6,41.3],[26.6,41.5],[26.5,41.6],[26.3,41.7],[26.4,41.8],[26.6,41.9],[26.9,42],[27,42.1],[27.2,42.1],[27.4,42.1],[27.4,42]]],[],[],[]],"type":"MultiPolygon"},"type":"Feature","properties":{"iso2":"TR","lng":35,"lat":39}},{"geometry":{"coordinates":[[[[33.4,52.4],[34.2,51.7],[35.1,51.1],[35.5,50.5],[36.5,50.2],[37.7,50.1],[38.7,49.9],[39.5,49.8],[40.2,49.2],[40,48.8],[39.8,47.9],[38.8,47.9],[38.1,47.1],[36.8,46.8],[35.5,46.5],[35,46.2],[34.2,46.3],[34.1,45.9],[35.1,45.5],[34.7,46.1],[36.1,45.5],[35.9,45],[34.7,44.8],[33.4,44.6],[33.1,45.2],[32.8,45.6],[33.6,46],[32.5,46.1],[31.5,46.6],[32.2,46.6],[31.9,47.1],[30.9,46.6],[29.9,45.7],[29.7,45.2],[28.4,45.3],[28.8,45.9],[29.4,46.5],[30,46.6],[29.3,47.5],[28.7,48.1],[27.8,48.5],[26.1,48],[24.9,47.7],[23.8,48],[22.7,48.1],[22.5,48.9],[22.8,49.7],[24.1,50.7],[23.7,51.5],[24.9,51.9],[26.2,51.9],[27.2,51.7],[28.2,51.7],[29.2,51.6],[30.3,51.4],[30.9,52.1],[32.3,52.1],[33.4,52.4]]],[],[],[]],"type":"MultiPolygon"},"type":"Feature","properties":{"iso2":"UA","lng":32,"lat":49}},{"geometry":{"coordinates":[[[64.4,39],[63.7,39.3],[62.9,39.7],[62.3,40.4],[61.7,41.2],[60.9,41.3],[60.2,41.3],[60.3,41.8],[59.4,42.3],[58.8,42.7],[58.1,42.6],[57.9,42.4],[57.4,42.2],[57,41.5],[56.4,41.3],[56,42.8],[56.3,45.1],[58,45.5],[62,43.5],[64,43.6],[65.6,43.2],[66,42.3],[66.9,41.1],[67.9,41.2],[68.3,40.7],[68.9,41.1],[69.6,41.7],[70.5,42.1],[71.2,42.2],[70.5,41.8],[70.6,41.5],[71.4,41.3],[71.6,41.6],[72.3,41],[73.1,40.8],[72.4,40.4],[71.5,40.2],[70.8,40.2],[70.4,40.5],[70.4,41.1],[69.8,40.6],[69.3,40.6],[68.7,40.2],[68.9,40],[68.5,39.6],[67.4,39.5],[67.9,39],[68.1,38.4],[68.1,37.8],[67.7,37.2],[66.8,37.4],[66.7,38],[65.8,38.2],[64.9,38.7],[64.4,39]]],"type":"Polygon"},"type":"Feature","properties":{"iso2":"UZ","lng":64,"lat":41}},{"geometry":{"coordinates":[],"type":"Polygon"},"type":"Feature","properties":{"iso2":"VA","lng":12.4,"lat":41.9}},{"geometry":{"coordinates":[[[20.8,42.1],[20.7,41.8],[20.6,41.9],[20.5,42.2],[20.3,42.3],[20.1,42.6],[20.3,42.8],[20.5,42.9],[20.6,43.2],[20.8,43.3],[21,43.1],[21.1,43.1],[21.3,42.9],[21.4,42.9],[21.6,42.7],[21.8,42.7],[21.7,42.4],[21.5,42.3],[21.6,42.2],[21.4,42.2],[20.8,42.1]]],"type":"Polygon"},"type":"Feature","properties":{"iso2":"XK","lng":21.2,"lat":42.7}}],"type":"FeatureCollection"};
},{}],"filtering.js":[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});exports.newFilterSettings=exports.setf=undefined;var _typeof=typeof Symbol==='function'&&typeof Symbol.iterator==='symbol'?function(obj){return typeof obj}:function(obj){return obj&&typeof Symbol==='function'&&obj.constructor===Symbol&&obj!==Symbol.prototype?'symbol':typeof obj};var _slicedToArray=function(){function sliceIterator(arr,i){var _arr=[];var _n=true;var _d=false;var _e=undefined;try{for(var _i=arr[Symbol.iterator](),_s;!(_n=(_s=_i.next()).done);_n=true){_arr.push(_s.value);if(i&&_arr.length===i)break}}catch(err){_d=true;_e=err}finally{try{if(!_n&&_i['return'])_i['return']()}finally{if(_d)throw _e}}return _arr}return function(arr,i){if(Array.isArray(arr)){return arr}else if(Symbol.iterator in Object(arr)){return sliceIterator(arr,i)}else{throw new TypeError('Invalid attempt to destructure non-iterable instance')}}}();exports.compileFiltering=compileFiltering;exports.computeFiltering=computeFiltering;exports.placeFacets=placeFacets;exports.testAllChecks=testAllChecks;var _localstorage=require('localstorage.js');function _toConsumableArray(arr){if(Array.isArray(arr)){for(var i=0,arr2=Array(arr.length);i<arr.length;i++){arr2[i]=arr[i]}return arr2}else{return Array.from(arr)}}var initf=function initf(tag,key,defaultVal){var lskey='flt_'+tag+'.'+key;return(0,_localstorage.lsHas)(lskey)?(0,_localstorage.lsGet)(lskey):defaultVal};var setf=exports.setf=function setf(tag,key,val){var lskey='flt_'+tag+'.'+key;(0,_localstorage.lsSet)(lskey,val)};function compileFiltering(records,order,fields,filterList){var presentFilterList=filterList.filter(function(x){return fields[x.field]});var filterFields=presentFilterList.filter(function(x){return x.type!=='FullText'}).map(function(x){return x.field});var fieldValues=new Map(filterFields.map(function(f){return[f,new Map([['','-none-']])]}));var _iteratorNormalCompletion=true;var _didIteratorError=false;var _iteratorError=undefined;try{for(var _iterator=order[Symbol.iterator](),_step;!(_iteratorNormalCompletion=(_step=_iterator.next()).done);_iteratorNormalCompletion=true){var rid=_step.value;var row=records[rid];var _iteratorNormalCompletion2=true;var _didIteratorError2=false;var _iteratorError2=undefined;try{for(var _iterator2=filterFields[Symbol.iterator](),_step2;!(_iteratorNormalCompletion2=(_step2=_iterator2.next()).done);_iteratorNormalCompletion2=true){var field=_step2.value;var fFieldValues=fieldValues.get(field);var metaraw=row[field];if(metaraw!=null&&metaraw.length!==0){var _iteratorNormalCompletion3=true;var _didIteratorError3=false;var _iteratorError3=undefined;try{for(var _iterator3=metaraw[Symbol.iterator](),_step3;!(_iteratorNormalCompletion3=(_step3=_iterator3.next()).done);_iteratorNormalCompletion3=true){var _ref2=_step3.value;var valueId=_ref2._id,valueRep=_ref2.value;if(!fFieldValues.has(valueId)){fFieldValues.set(valueId,valueRep)}}}catch(err){_didIteratorError3=true;_iteratorError3=err}finally{try{if(!_iteratorNormalCompletion3&&_iterator3.return){_iterator3.return()}}finally{if(_didIteratorError3){throw _iteratorError3}}}}}}catch(err){_didIteratorError2=true;_iteratorError2=err}finally{try{if(!_iteratorNormalCompletion2&&_iterator2.return){_iterator2.return()}}finally{if(_didIteratorError2){throw _iteratorError2}}}}}catch(err){_didIteratorError=true;_iteratorError=err}finally{try{if(!_iteratorNormalCompletion&&_iterator.return){_iterator.return()}}finally{if(_didIteratorError){throw _iteratorError}}}var filterInit=new Map(presentFilterList.map(function(filterSpec,filterId){return[filterId,filterSpec.type==='FullText'?initf(filterId,'',''):new Map([].concat(_toConsumableArray(fieldValues.get(filterSpec.field).keys())).map(function(valueId){return[valueId,initf(filterId,valueId,true)]}))]}));return{fieldValues:fieldValues,filterInit:filterInit}}function computeFiltering(records,order,fields,filterList,fieldValues,filterSettings){var presentFilterList=filterList.filter(function(x){return fields[x.field]});var filterChecks=new Map(presentFilterList.map(function(filterSpec,filterId){return[filterId,(filterSpec.type==='FullText'?fullTextCheck:facetCheck)(filterSpec.field,filterSettings.get(filterId))]}));var filteredData=[];var otherFilteredData=new Map(presentFilterList.map(function(filterSpec,filterId){return[filterId,[]]}));var _iteratorNormalCompletion4=true;var _didIteratorError4=false;var _iteratorError4=undefined;try{var _loop=function _loop(){var rid=_step4.value;var row=records[rid];var theOneFail=null;var v=true;var discard=false;var _iteratorNormalCompletion5=true;var _didIteratorError5=false;var _iteratorError5=undefined;try{for(var _iterator5=filterChecks[Symbol.iterator](),_step5;!(_iteratorNormalCompletion5=(_step5=_iterator5.next()).done);_iteratorNormalCompletion5=true){var _step5$value=_slicedToArray(_step5.value,2),filterId=_step5$value[0],filterCheck=_step5$value[1];var pass=filterCheck(row);if(!pass){v=false;if(theOneFail===null){theOneFail=filterId}else{discard=true;break}}}}catch(err){_didIteratorError5=true;_iteratorError5=err}finally{try{if(!_iteratorNormalCompletion5&&_iterator5.return){_iterator5.return()}}finally{if(_didIteratorError5){throw _iteratorError5}}}if(!discard){if(v){filteredData.push(row);presentFilterList.forEach(function(filterSpec,filterId){otherFilteredData.get(filterId).push(row)})}else{otherFilteredData.get(theOneFail).push(row)}}};for(var _iterator4=order[Symbol.iterator](),_step4;!(_iteratorNormalCompletion4=(_step4=_iterator4.next()).done);_iteratorNormalCompletion4=true){_loop()}}catch(err){_didIteratorError4=true;_iteratorError4=err}finally{try{if(!_iteratorNormalCompletion4&&_iterator4.return){_iterator4.return()}}finally{if(_didIteratorError4){throw _iteratorError4}}}var amounts=new Map(presentFilterList.map(function(_ref3,filterId){var field=_ref3.field,type=_ref3.type;return[filterId,type==='FullText'?null:countFacets(field,fieldValues.get(field),otherFilteredData.get(filterId))]}));return{filteredData:filteredData,filteredAmountOthers:new Map([].concat(_toConsumableArray(otherFilteredData.entries())).map(function(_ref4){var _ref5=_slicedToArray(_ref4,2),filterId=_ref5[0],x=_ref5[1];return[filterId,x.length]})),amounts:amounts}}var newFilterSettings=exports.newFilterSettings=function newFilterSettings(filterSettings,filterId,data){switch(typeof data==='undefined'?'undefined':_typeof(data)){case'boolean':{var filterSetting=filterSettings.get(filterId);filterSettings.set(filterId,new Map([].concat(_toConsumableArray(filterSetting.keys())).map(function(valueId){return[valueId,data]})));break}case'string':{filterSettings.set(filterId,data);break}default:{var _data=_slicedToArray(data,2),valueId=_data[0],_filterSetting=_data[1];filterSettings.get(filterId).set(valueId,_filterSetting);break}}return filterSettings};var fullTextCheck=function fullTextCheck(field,term){var search=term.toLowerCase();if(search==null||search==''){return function(){return true}}return function(row){var val=row[field];val=val!=null?val[0]:val;return val!=null&&val.toLowerCase().indexOf(search)!==-1}};var facetCheck=function facetCheck(field,facetValues){if(facetValues.size===0){return function(){return false}}return function(row){var fieldVals=row[field];if(fieldVals==null||fieldVals.length==0){return facetValues.get('')}var _iteratorNormalCompletion6=true;var _didIteratorError6=false;var _iteratorError6=undefined;try{for(var _iterator6=fieldVals[Symbol.iterator](),_step6;!(_iteratorNormalCompletion6=(_step6=_iterator6.next()).done);_iteratorNormalCompletion6=true){var _ref7=_step6.value;var valueId=_ref7._id;if(facetValues.get(valueId)){return true}}}catch(err){_didIteratorError6=true;_iteratorError6=err}finally{try{if(!_iteratorNormalCompletion6&&_iterator6.return){_iterator6.return()}}finally{if(_didIteratorError6){throw _iteratorError6}}}return false}};function countFacets(field,fieldValues,rows){var facetAmounts=new Map;var _iteratorNormalCompletion7=true;var _didIteratorError7=false;var _iteratorError7=undefined;try{for(var _iterator7=fieldValues.keys()[Symbol.iterator](),_step7;!(_iteratorNormalCompletion7=(_step7=_iterator7.next()).done);_iteratorNormalCompletion7=true){var valueId=_step7.value;facetAmounts.set(valueId,0)}}catch(err){_didIteratorError7=true;_iteratorError7=err}finally{try{if(!_iteratorNormalCompletion7&&_iterator7.return){_iterator7.return()}}finally{if(_didIteratorError7){throw _iteratorError7}}}var _iteratorNormalCompletion8=true;var _didIteratorError8=false;var _iteratorError8=undefined;try{for(var _iterator8=rows[Symbol.iterator](),_step8;!(_iteratorNormalCompletion8=(_step8=_iterator8.next()).done);_iteratorNormalCompletion8=true){var _ref9=_step8.value;var fieldVals=_ref9[field];if(fieldVals==null||fieldVals.length==0){facetAmounts.set('',facetAmounts.get('')+1)}else{var _iteratorNormalCompletion9=true;var _didIteratorError9=false;var _iteratorError9=undefined;try{for(var _iterator9=fieldVals[Symbol.iterator](),_step9;!(_iteratorNormalCompletion9=(_step9=_iterator9.next()).done);_iteratorNormalCompletion9=true){var _ref11=_step9.value;var _valueId=_ref11._id;facetAmounts.set(_valueId,facetAmounts.get(_valueId)+1)}}catch(err){_didIteratorError9=true;_iteratorError9=err}finally{try{if(!_iteratorNormalCompletion9&&_iterator9.return){_iterator9.return()}}finally{if(_didIteratorError9){throw _iteratorError9}}}}}}catch(err){_didIteratorError8=true;_iteratorError8=err}finally{try{if(!_iteratorNormalCompletion8&&_iterator8.return){_iterator8.return()}}finally{if(_didIteratorError8){throw _iteratorError8}}}return facetAmounts}function placeFacets(fieldValues,maxCols){if(fieldValues==null){return[]}var facets=[].concat(_toConsumableArray(fieldValues.entries())).sort(function(x,y){return x[1].localeCompare(y[1])});if(facets.length==0){return[]}var rows=[];var lf=facets.length;var nrows=Math.floor(lf/maxCols)+(lf%maxCols?1:0);var ncols=Math.floor(lf/nrows)+(lf%nrows?1:0);for(var r=0;r<nrows;r++){var _row=[];for(var c=0;c<ncols;c++){var f=nrows*c+r;_row.push(f<lf?facets[f]:null)}rows.push(_row)}return rows}function testAllChecks(filterSettings){var allTrue=true;var allFalse=true;var _iteratorNormalCompletion10=true;var _didIteratorError10=false;var _iteratorError10=undefined;try{for(var _iterator10=filterSettings.keys()[Symbol.iterator](),_step10;!(_iteratorNormalCompletion10=(_step10=_iterator10.next()).done);_iteratorNormalCompletion10=true){var valueId=_step10.value;if(filterSettings.get(valueId)){allFalse=false}else{allTrue=false}}}catch(err){_didIteratorError10=true;_iteratorError10=err}finally{try{if(!_iteratorNormalCompletion10&&_iterator10.return){_iterator10.return()}}finally{if(_didIteratorError10){throw _iteratorError10}}}return{allTrue:allTrue,allFalse:allFalse}}
},{"localstorage.js":"localstorage.js"}],"hoc.js":[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});exports.saveState=exports.withContext=undefined;var _get=function get(object,property,receiver){if(object===null)object=Function.prototype;var desc=Object.getOwnPropertyDescriptor(object,property);if(desc===undefined){var parent=Object.getPrototypeOf(object);if(parent===null){return undefined}else{return get(parent,property,receiver)}}else if('value'in desc){return desc.value}else{var getter=desc.get;if(getter===undefined){return undefined}return getter.call(receiver)}};var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if('value'in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor}}();var _jsxFileName='/Users/dirk/github/dariah/client/src/js/lib/hoc.js';var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key]}}}return target};var _react=require('react');var _react2=_interopRequireDefault(_react);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function')}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called')}return call&&(typeof call==='object'||typeof call==='function')?call:self}function _inherits(subClass,superClass){if(typeof superClass!=='function'&&superClass!==null){throw new TypeError('Super expression must either be null or a function, not '+typeof superClass)}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass}var withContext=exports.withContext=function withContext(ComponentInner){var ComponentOuter=function ComponentOuter(props,context){var newProps=_extends({},props,context.globals);return _react2.default.createElement(ComponentInner,_extends({},newProps,{__source:{fileName:_jsxFileName,lineNumber:6}}))};ComponentOuter.displayName='wc('+(ComponentInner.displayName||ComponentInner.name||'ComponentInner')+')';ComponentOuter.contextTypes={globals:_react.PropTypes.object};return ComponentOuter};var getTag=function getTag(tag,params){return tag==null?params==null?null:params.tag:tag};var saveState=exports.saveState=function saveState(ComponentInner,key,initialState){var ComponentOuter=function(_ComponentInner){_inherits(ComponentOuter,_ComponentInner);_createClass(ComponentOuter,[{key:'setStateKey',value:function setStateKey(tag){this.stateKey=this.key+(tag==null?'':'.'+tag)}},{key:'stateLoad',value:function stateLoad(isInit){var store=this.store,stateKey=this.stateKey,initialState=this.initialState,props=this.props;store.load(this,stateKey,typeof initialState=='function'?initialState(props):initialState,isInit)}},{key:'stateSave',value:function stateSave(){var store=this.store,stateKey=this.stateKey;store.save(this,stateKey)}}]);function ComponentOuter(props){_classCallCheck(this,ComponentOuter);var _this=_possibleConstructorReturn(this,(ComponentOuter.__proto__||Object.getPrototypeOf(ComponentOuter)).call(this,props));var store=props.store,tag=props.tag,params=props.params;_this.store=store;_this.tag=getTag(tag,params);_this.key=key;_this.initialState=initialState;_this.setStateKey(tag);_this.stateLoad(true);return _this}_createClass(ComponentOuter,[{key:'componentWillUnmount',value:function componentWillUnmount(){if(_get(ComponentOuter.prototype.__proto__||Object.getPrototypeOf(ComponentOuter.prototype),'componentWillUnmount',this)!=null){_get(ComponentOuter.prototype.__proto__||Object.getPrototypeOf(ComponentOuter.prototype),'componentWillUnmount',this).call(this)}this.stateSave()}},{key:'componentWillReceiveProps',value:function componentWillReceiveProps(newProps){if(_get(ComponentOuter.prototype.__proto__||Object.getPrototypeOf(ComponentOuter.prototype),'componentWillReceiveProps',this)!=null){_get(ComponentOuter.prototype.__proto__||Object.getPrototypeOf(ComponentOuter.prototype),'componentWillReceiveProps',this).call(this,newProps)}var _props=this.props,oldTag=_props.tag,oldParams=_props.params;var tag=newProps.tag,params=newProps.params;var realTag=getTag(tag,params);var oldRealTag=getTag(oldTag,oldParams);if(oldRealTag!==realTag){this.stateSave();this.setStateKey(realTag);this.stateLoad(false)}}}]);return ComponentOuter}(ComponentInner);ComponentOuter.displayName='ss('+(ComponentInner.displayName||ComponentInner.name||'ComponentInner')+')';return ComponentOuter};
},{"react":36}],"localstorage.js":[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:true});var lsClear=exports.lsClear=function lsClear(){localStorage.clear()};var lsHas=exports.lsHas=function lsHas(key){return localStorage.getItem(key)!=null};var lsGet=exports.lsGet=function lsGet(key){if(localStorage==null){return null}var val=localStorage.getItem(key);return val==null?null:JSON.parse(val)};var lsSet=exports.lsSet=function lsSet(key,val){if(localStorage==null){return}localStorage.setItem(key,JSON.stringify(val))};
},{}],"memoBind.js":[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _typeof=typeof Symbol==='function'&&typeof Symbol.iterator==='symbol'?function(obj){return typeof obj}:function(obj){return obj&&typeof Symbol==='function'&&obj.constructor===Symbol&&obj!==Symbol.prototype?'symbol':typeof obj};exports.default=memoBind;function _toConsumableArray(arr){if(Array.isArray(arr)){for(var i=0,arr2=Array(arr.length);i<arr.length;i++){arr2[i]=arr[i]}return arr2}else{return Array.from(arr)}}function memoBind(thisArg,funcName,keyArgs,extraArgs){if((typeof thisArg==='undefined'?'undefined':_typeof(thisArg))!=='object'||!thisArg){throw new TypeError('Invalid thisArg parameter.')}var func=thisArg[funcName];if(typeof func!=='function'){throw new TypeError('\''+funcName+'\' is not a function.')}if(thisArg._memCache==null){thisArg._memCache=new Map}if(!thisArg._memCache.has(funcName)){thisArg._memCache.set(funcName,new Map)}var cache=thisArg._memCache.get(funcName);var memoKey=JSON.stringify(keyArgs);if(!cache.has(memoKey)){cache.set(memoKey,func.apply(thisArg,[].concat(_toConsumableArray(keyArgs),_toConsumableArray(extraArgs||[]))))}return cache.get(memoKey)}
},{}],"store.js":[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor}}();function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function")}}var Store=function(){function Store(){_classCallCheck(this,Store);this.data=new Map}_createClass(Store,[{key:"load",value:function load(component,key,initialState,isInit){if(this.data.has(key)){if(isInit){component.state=this.data.get(key)}else{component.setState(this.data.get(key))}}else{if(isInit){component.state=initialState}else{component.setState(initialState)}}}},{key:"save",value:function save(component,key){this.data.set(key,component.state)}},{key:"get",value:function get(key){if(!this.data.has(key)){this.data.set(key,{})}return this.data.get(key)}}]);return Store}();exports.default=Store;
},{}],"window.js":[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key]}}}return target};exports.columnStyle=columnStyle;var scrollBarWidth=40;var leftMargin=0;var topHeight=50;var topMargin=5;var divWidthSpec={left:120,rightLeft:380,rightLeftNav:150};var floatSpec={left:'left',right:'right',rightLeft:'left',rightLeftNav:'left',rightRight:'right',rightRightBody:'right'};function columnStyle(kind,_ref){var height=_ref.height,width=_ref.width;var divHeight={left:height-topHeight,right:height-topHeight,rightLeft:height-topHeight-topMargin,rightLeftNav:height-topHeight-topMargin,rightRight:height-topHeight-topMargin,rightRightBody:height-topHeight-topMargin};var left=divWidthSpec.left,rightLeft=divWidthSpec.rightLeft,rightLeftNav=divWidthSpec.rightLeftNav;var divWidth=_extends({},divWidthSpec,{right:width-left-scrollBarWidth,rightRight:width-left-rightLeft-2*scrollBarWidth-leftMargin,rightRightBody:width-left-rightLeftNav-2*scrollBarWidth-leftMargin});return{width:divWidth[kind],height:divHeight[kind],float:floatSpec[kind]}}
},{}]},{},[])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvZGVlcC1kaWZmL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2ZianMvbGliL2VtcHR5RnVuY3Rpb24uanMiLCJub2RlX21vZHVsZXMvZmJqcy9saWIvZW1wdHlPYmplY3QuanMiLCJub2RlX21vZHVsZXMvZmJqcy9saWIvaW52YXJpYW50LmpzIiwibm9kZV9tb2R1bGVzL2ZianMvbGliL3dhcm5pbmcuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19nZXRQcm90b3R5cGUuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19vdmVyQXJnLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9pc09iamVjdExpa2UuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2lzUGxhaW5PYmplY3QuanMiLCJub2RlX21vZHVsZXMvb2JqZWN0LWFzc2lnbi9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanMiLCJub2RlX21vZHVsZXMvcmVhY3QvbGliL0tleUVzY2FwZVV0aWxzLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0L2xpYi9Qb29sZWRDbGFzcy5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC9saWIvUmVhY3QuanMiLCJub2RlX21vZHVsZXMvcmVhY3QvbGliL1JlYWN0Q2hpbGRyZW4uanMiLCJub2RlX21vZHVsZXMvcmVhY3QvbGliL1JlYWN0Q2xhc3MuanMiLCJub2RlX21vZHVsZXMvcmVhY3QvbGliL1JlYWN0Q29tcG9uZW50LmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0L2xpYi9SZWFjdENvbXBvbmVudFRyZWVIb29rLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0L2xpYi9SZWFjdEN1cnJlbnRPd25lci5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC9saWIvUmVhY3RET01GYWN0b3JpZXMuanMiLCJub2RlX21vZHVsZXMvcmVhY3QvbGliL1JlYWN0RWxlbWVudC5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC9saWIvUmVhY3RFbGVtZW50U3ltYm9sLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0L2xpYi9SZWFjdEVsZW1lbnRWYWxpZGF0b3IuanMiLCJub2RlX21vZHVsZXMvcmVhY3QvbGliL1JlYWN0Tm9vcFVwZGF0ZVF1ZXVlLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0L2xpYi9SZWFjdFByb3BUeXBlTG9jYXRpb25OYW1lcy5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC9saWIvUmVhY3RQcm9wVHlwZXMuanMiLCJub2RlX21vZHVsZXMvcmVhY3QvbGliL1JlYWN0UHJvcFR5cGVzU2VjcmV0LmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0L2xpYi9SZWFjdFB1cmVDb21wb25lbnQuanMiLCJub2RlX21vZHVsZXMvcmVhY3QvbGliL1JlYWN0VmVyc2lvbi5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC9saWIvY2FuRGVmaW5lUHJvcGVydHkuanMiLCJub2RlX21vZHVsZXMvcmVhY3QvbGliL2NoZWNrUmVhY3RUeXBlU3BlYy5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC9saWIvZ2V0SXRlcmF0b3JGbi5qcyIsIm5vZGVfbW9kdWxlcy9yZWFjdC9saWIvb25seUNoaWxkLmpzIiwibm9kZV9tb2R1bGVzL3JlYWN0L2xpYi9yZWFjdFByb2RJbnZhcmlhbnQuanMiLCJub2RlX21vZHVsZXMvcmVhY3QvbGliL3RyYXZlcnNlQWxsQ2hpbGRyZW4uanMiLCJub2RlX21vZHVsZXMvcmVhY3QvcmVhY3QuanMiLCJub2RlX21vZHVsZXMvcmVkdXgtbG9nZ2VyL2xpYi9jb3JlLmpzIiwibm9kZV9tb2R1bGVzL3JlZHV4LWxvZ2dlci9saWIvZGVmYXVsdHMuanMiLCJub2RlX21vZHVsZXMvcmVkdXgtbG9nZ2VyL2xpYi9kaWZmLmpzIiwibm9kZV9tb2R1bGVzL3JlZHV4LWxvZ2dlci9saWIvaGVscGVycy5qcyIsIm5vZGVfbW9kdWxlcy9yZWR1eC1sb2dnZXIvbGliL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3JlZHV4LXRodW5rL2xpYi9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9yZWR1eC9saWIvYXBwbHlNaWRkbGV3YXJlLmpzIiwibm9kZV9tb2R1bGVzL3JlZHV4L2xpYi9iaW5kQWN0aW9uQ3JlYXRvcnMuanMiLCJub2RlX21vZHVsZXMvcmVkdXgvbGliL2NvbWJpbmVSZWR1Y2Vycy5qcyIsIm5vZGVfbW9kdWxlcy9yZWR1eC9saWIvY29tcG9zZS5qcyIsIm5vZGVfbW9kdWxlcy9yZWR1eC9saWIvY3JlYXRlU3RvcmUuanMiLCJub2RlX21vZHVsZXMvcmVkdXgvbGliL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3JlZHV4L2xpYi91dGlscy93YXJuaW5nLmpzIiwibm9kZV9tb2R1bGVzL3N5bWJvbC1vYnNlcnZhYmxlL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3N5bWJvbC1vYnNlcnZhYmxlL2xpYi9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9zeW1ib2wtb2JzZXJ2YWJsZS9saWIvcG9ueWZpbGwuanMiLCJub2RlX21vZHVsZXMvd2hhdHdnLWZldGNoL2ZldGNoLmpzIiwiY29uZmlndXJlU3RvcmUuanMiLCJkYXRhLmpzIiwiZXVyb3BlLmdlby5qcyIsImZpbHRlcmluZy5qcyIsImhvYy5qcyIsImxvY2Fsc3RvcmFnZS5qcyIsIm1lbW9CaW5kLmpzIiwic3RvcmUuanMiLCJ3aW5kb3cuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDdGFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25GQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNVVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25WQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4T0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ3hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDckZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUtBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1SUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcFFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4QkE7QUFDQTs7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xkQTs7QUNBQTs7QUNBQTs7QUNBQTs7QUNBQTs7QUNBQTs7QUNBQTs7QUNBQTs7QUNBQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvKiFcbiAqIGRlZXAtZGlmZi5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cbiAqL1xuOyhmdW5jdGlvbihyb290LCBmYWN0b3J5KSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgIC8vIEFNRC4gUmVnaXN0ZXIgYXMgYW4gYW5vbnltb3VzIG1vZHVsZS5cbiAgICBkZWZpbmUoW10sIGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGZhY3RvcnkoKTtcbiAgICB9KTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpIHtcbiAgICAvLyBOb2RlLiBEb2VzIG5vdCB3b3JrIHdpdGggc3RyaWN0IENvbW1vbkpTLCBidXRcbiAgICAvLyBvbmx5IENvbW1vbkpTLWxpa2UgZW52aXJvbm1lbnRzIHRoYXQgc3VwcG9ydCBtb2R1bGUuZXhwb3J0cyxcbiAgICAvLyBsaWtlIE5vZGUuXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG4gIH0gZWxzZSB7XG4gICAgLy8gQnJvd3NlciBnbG9iYWxzIChyb290IGlzIHdpbmRvdylcbiAgICByb290LkRlZXBEaWZmID0gZmFjdG9yeSgpO1xuICB9XG59KHRoaXMsIGZ1bmN0aW9uKHVuZGVmaW5lZCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyICRzY29wZSwgY29uZmxpY3QsIGNvbmZsaWN0UmVzb2x1dGlvbiA9IFtdO1xuICBpZiAodHlwZW9mIGdsb2JhbCA9PT0gJ29iamVjdCcgJiYgZ2xvYmFsKSB7XG4gICAgJHNjb3BlID0gZ2xvYmFsO1xuICB9IGVsc2UgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgJHNjb3BlID0gd2luZG93O1xuICB9IGVsc2Uge1xuICAgICRzY29wZSA9IHt9O1xuICB9XG4gIGNvbmZsaWN0ID0gJHNjb3BlLkRlZXBEaWZmO1xuICBpZiAoY29uZmxpY3QpIHtcbiAgICBjb25mbGljdFJlc29sdXRpb24ucHVzaChcbiAgICAgIGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoJ3VuZGVmaW5lZCcgIT09IHR5cGVvZiBjb25mbGljdCAmJiAkc2NvcGUuRGVlcERpZmYgPT09IGFjY3VtdWxhdGVEaWZmKSB7XG4gICAgICAgICAgJHNjb3BlLkRlZXBEaWZmID0gY29uZmxpY3Q7XG4gICAgICAgICAgY29uZmxpY3QgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICB9XG5cbiAgLy8gbm9kZWpzIGNvbXBhdGlibGUgb24gc2VydmVyIHNpZGUgYW5kIGluIHRoZSBicm93c2VyLlxuICBmdW5jdGlvbiBpbmhlcml0cyhjdG9yLCBzdXBlckN0b3IpIHtcbiAgICBjdG9yLnN1cGVyXyA9IHN1cGVyQ3RvcjtcbiAgICBjdG9yLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDdG9yLnByb3RvdHlwZSwge1xuICAgICAgY29uc3RydWN0b3I6IHtcbiAgICAgICAgdmFsdWU6IGN0b3IsXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBEaWZmKGtpbmQsIHBhdGgpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ2tpbmQnLCB7XG4gICAgICB2YWx1ZToga2luZCxcbiAgICAgIGVudW1lcmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBpZiAocGF0aCAmJiBwYXRoLmxlbmd0aCkge1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdwYXRoJywge1xuICAgICAgICB2YWx1ZTogcGF0aCxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gRGlmZkVkaXQocGF0aCwgb3JpZ2luLCB2YWx1ZSkge1xuICAgIERpZmZFZGl0LnN1cGVyXy5jYWxsKHRoaXMsICdFJywgcGF0aCk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdsaHMnLCB7XG4gICAgICB2YWx1ZTogb3JpZ2luLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAncmhzJywge1xuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICB9XG4gIGluaGVyaXRzKERpZmZFZGl0LCBEaWZmKTtcblxuICBmdW5jdGlvbiBEaWZmTmV3KHBhdGgsIHZhbHVlKSB7XG4gICAgRGlmZk5ldy5zdXBlcl8uY2FsbCh0aGlzLCAnTicsIHBhdGgpO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAncmhzJywge1xuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICB9XG4gIGluaGVyaXRzKERpZmZOZXcsIERpZmYpO1xuXG4gIGZ1bmN0aW9uIERpZmZEZWxldGVkKHBhdGgsIHZhbHVlKSB7XG4gICAgRGlmZkRlbGV0ZWQuc3VwZXJfLmNhbGwodGhpcywgJ0QnLCBwYXRoKTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ2xocycsIHtcbiAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgIGVudW1lcmFibGU6IHRydWVcbiAgICB9KTtcbiAgfVxuICBpbmhlcml0cyhEaWZmRGVsZXRlZCwgRGlmZik7XG5cbiAgZnVuY3Rpb24gRGlmZkFycmF5KHBhdGgsIGluZGV4LCBpdGVtKSB7XG4gICAgRGlmZkFycmF5LnN1cGVyXy5jYWxsKHRoaXMsICdBJywgcGF0aCk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdpbmRleCcsIHtcbiAgICAgIHZhbHVlOiBpbmRleCxcbiAgICAgIGVudW1lcmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ2l0ZW0nLCB7XG4gICAgICB2YWx1ZTogaXRlbSxcbiAgICAgIGVudW1lcmFibGU6IHRydWVcbiAgICB9KTtcbiAgfVxuICBpbmhlcml0cyhEaWZmQXJyYXksIERpZmYpO1xuXG4gIGZ1bmN0aW9uIGFycmF5UmVtb3ZlKGFyciwgZnJvbSwgdG8pIHtcbiAgICB2YXIgcmVzdCA9IGFyci5zbGljZSgodG8gfHwgZnJvbSkgKyAxIHx8IGFyci5sZW5ndGgpO1xuICAgIGFyci5sZW5ndGggPSBmcm9tIDwgMCA/IGFyci5sZW5ndGggKyBmcm9tIDogZnJvbTtcbiAgICBhcnIucHVzaC5hcHBseShhcnIsIHJlc3QpO1xuICAgIHJldHVybiBhcnI7XG4gIH1cblxuICBmdW5jdGlvbiByZWFsVHlwZU9mKHN1YmplY3QpIHtcbiAgICB2YXIgdHlwZSA9IHR5cGVvZiBzdWJqZWN0O1xuICAgIGlmICh0eXBlICE9PSAnb2JqZWN0Jykge1xuICAgICAgcmV0dXJuIHR5cGU7XG4gICAgfVxuXG4gICAgaWYgKHN1YmplY3QgPT09IE1hdGgpIHtcbiAgICAgIHJldHVybiAnbWF0aCc7XG4gICAgfSBlbHNlIGlmIChzdWJqZWN0ID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gJ251bGwnO1xuICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShzdWJqZWN0KSkge1xuICAgICAgcmV0dXJuICdhcnJheSc7XG4gICAgfSBlbHNlIGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoc3ViamVjdCkgPT09ICdbb2JqZWN0IERhdGVdJykge1xuICAgICAgcmV0dXJuICdkYXRlJztcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBzdWJqZWN0LnRvU3RyaW5nICE9PSAndW5kZWZpbmVkJyAmJiAvXlxcLy4qXFwvLy50ZXN0KHN1YmplY3QudG9TdHJpbmcoKSkpIHtcbiAgICAgIHJldHVybiAncmVnZXhwJztcbiAgICB9XG4gICAgcmV0dXJuICdvYmplY3QnO1xuICB9XG5cbiAgZnVuY3Rpb24gZGVlcERpZmYobGhzLCByaHMsIGNoYW5nZXMsIHByZWZpbHRlciwgcGF0aCwga2V5LCBzdGFjaykge1xuICAgIHBhdGggPSBwYXRoIHx8IFtdO1xuICAgIHZhciBjdXJyZW50UGF0aCA9IHBhdGguc2xpY2UoMCk7XG4gICAgaWYgKHR5cGVvZiBrZXkgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBpZiAocHJlZmlsdGVyKSB7XG4gICAgICAgIGlmICh0eXBlb2YocHJlZmlsdGVyKSA9PT0gJ2Z1bmN0aW9uJyAmJiBwcmVmaWx0ZXIoY3VycmVudFBhdGgsIGtleSkpIHsgcmV0dXJuOyB9XG4gICAgICAgIGVsc2UgaWYgKHR5cGVvZihwcmVmaWx0ZXIpID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgIGlmIChwcmVmaWx0ZXIucHJlZmlsdGVyICYmIHByZWZpbHRlci5wcmVmaWx0ZXIoY3VycmVudFBhdGgsIGtleSkpIHsgcmV0dXJuOyB9XG4gICAgICAgICAgaWYgKHByZWZpbHRlci5ub3JtYWxpemUpIHtcbiAgICAgICAgICAgIHZhciBhbHQgPSBwcmVmaWx0ZXIubm9ybWFsaXplKGN1cnJlbnRQYXRoLCBrZXksIGxocywgcmhzKTtcbiAgICAgICAgICAgIGlmIChhbHQpIHtcbiAgICAgICAgICAgICAgbGhzID0gYWx0WzBdO1xuICAgICAgICAgICAgICByaHMgPSBhbHRbMV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBjdXJyZW50UGF0aC5wdXNoKGtleSk7XG4gICAgfVxuXG4gICAgLy8gVXNlIHN0cmluZyBjb21wYXJpc29uIGZvciByZWdleGVzXG4gICAgaWYgKHJlYWxUeXBlT2YobGhzKSA9PT0gJ3JlZ2V4cCcgJiYgcmVhbFR5cGVPZihyaHMpID09PSAncmVnZXhwJykge1xuICAgICAgbGhzID0gbGhzLnRvU3RyaW5nKCk7XG4gICAgICByaHMgPSByaHMudG9TdHJpbmcoKTtcbiAgICB9XG5cbiAgICB2YXIgbHR5cGUgPSB0eXBlb2YgbGhzO1xuICAgIHZhciBydHlwZSA9IHR5cGVvZiByaHM7XG4gICAgaWYgKGx0eXBlID09PSAndW5kZWZpbmVkJykge1xuICAgICAgaWYgKHJ0eXBlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBjaGFuZ2VzKG5ldyBEaWZmTmV3KGN1cnJlbnRQYXRoLCByaHMpKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHJ0eXBlID09PSAndW5kZWZpbmVkJykge1xuICAgICAgY2hhbmdlcyhuZXcgRGlmZkRlbGV0ZWQoY3VycmVudFBhdGgsIGxocykpO1xuICAgIH0gZWxzZSBpZiAocmVhbFR5cGVPZihsaHMpICE9PSByZWFsVHlwZU9mKHJocykpIHtcbiAgICAgIGNoYW5nZXMobmV3IERpZmZFZGl0KGN1cnJlbnRQYXRoLCBsaHMsIHJocykpO1xuICAgIH0gZWxzZSBpZiAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGxocykgPT09ICdbb2JqZWN0IERhdGVdJyAmJiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwocmhzKSA9PT0gJ1tvYmplY3QgRGF0ZV0nICYmICgobGhzIC0gcmhzKSAhPT0gMCkpIHtcbiAgICAgIGNoYW5nZXMobmV3IERpZmZFZGl0KGN1cnJlbnRQYXRoLCBsaHMsIHJocykpO1xuICAgIH0gZWxzZSBpZiAobHR5cGUgPT09ICdvYmplY3QnICYmIGxocyAhPT0gbnVsbCAmJiByaHMgIT09IG51bGwpIHtcbiAgICAgIHN0YWNrID0gc3RhY2sgfHwgW107XG4gICAgICBpZiAoc3RhY2suaW5kZXhPZihsaHMpIDwgMCkge1xuICAgICAgICBzdGFjay5wdXNoKGxocyk7XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGxocykpIHtcbiAgICAgICAgICB2YXIgaSwgbGVuID0gbGhzLmxlbmd0aDtcbiAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbGhzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoaSA+PSByaHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgIGNoYW5nZXMobmV3IERpZmZBcnJheShjdXJyZW50UGF0aCwgaSwgbmV3IERpZmZEZWxldGVkKHVuZGVmaW5lZCwgbGhzW2ldKSkpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgZGVlcERpZmYobGhzW2ldLCByaHNbaV0sIGNoYW5nZXMsIHByZWZpbHRlciwgY3VycmVudFBhdGgsIGksIHN0YWNrKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgd2hpbGUgKGkgPCByaHMubGVuZ3RoKSB7XG4gICAgICAgICAgICBjaGFuZ2VzKG5ldyBEaWZmQXJyYXkoY3VycmVudFBhdGgsIGksIG5ldyBEaWZmTmV3KHVuZGVmaW5lZCwgcmhzW2krK10pKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhciBha2V5cyA9IE9iamVjdC5rZXlzKGxocyk7XG4gICAgICAgICAgdmFyIHBrZXlzID0gT2JqZWN0LmtleXMocmhzKTtcbiAgICAgICAgICBha2V5cy5mb3JFYWNoKGZ1bmN0aW9uKGssIGkpIHtcbiAgICAgICAgICAgIHZhciBvdGhlciA9IHBrZXlzLmluZGV4T2Yoayk7XG4gICAgICAgICAgICBpZiAob3RoZXIgPj0gMCkge1xuICAgICAgICAgICAgICBkZWVwRGlmZihsaHNba10sIHJoc1trXSwgY2hhbmdlcywgcHJlZmlsdGVyLCBjdXJyZW50UGF0aCwgaywgc3RhY2spO1xuICAgICAgICAgICAgICBwa2V5cyA9IGFycmF5UmVtb3ZlKHBrZXlzLCBvdGhlcik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBkZWVwRGlmZihsaHNba10sIHVuZGVmaW5lZCwgY2hhbmdlcywgcHJlZmlsdGVyLCBjdXJyZW50UGF0aCwgaywgc3RhY2spO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIHBrZXlzLmZvckVhY2goZnVuY3Rpb24oaykge1xuICAgICAgICAgICAgZGVlcERpZmYodW5kZWZpbmVkLCByaHNba10sIGNoYW5nZXMsIHByZWZpbHRlciwgY3VycmVudFBhdGgsIGssIHN0YWNrKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBzdGFjay5sZW5ndGggPSBzdGFjay5sZW5ndGggLSAxO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAobGhzICE9PSByaHMpIHtcbiAgICAgIGlmICghKGx0eXBlID09PSAnbnVtYmVyJyAmJiBpc05hTihsaHMpICYmIGlzTmFOKHJocykpKSB7XG4gICAgICAgIGNoYW5nZXMobmV3IERpZmZFZGl0KGN1cnJlbnRQYXRoLCBsaHMsIHJocykpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGFjY3VtdWxhdGVEaWZmKGxocywgcmhzLCBwcmVmaWx0ZXIsIGFjY3VtKSB7XG4gICAgYWNjdW0gPSBhY2N1bSB8fCBbXTtcbiAgICBkZWVwRGlmZihsaHMsIHJocyxcbiAgICAgIGZ1bmN0aW9uKGRpZmYpIHtcbiAgICAgICAgaWYgKGRpZmYpIHtcbiAgICAgICAgICBhY2N1bS5wdXNoKGRpZmYpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgcHJlZmlsdGVyKTtcbiAgICByZXR1cm4gKGFjY3VtLmxlbmd0aCkgPyBhY2N1bSA6IHVuZGVmaW5lZDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGFwcGx5QXJyYXlDaGFuZ2UoYXJyLCBpbmRleCwgY2hhbmdlKSB7XG4gICAgaWYgKGNoYW5nZS5wYXRoICYmIGNoYW5nZS5wYXRoLmxlbmd0aCkge1xuICAgICAgdmFyIGl0ID0gYXJyW2luZGV4XSxcbiAgICAgICAgICBpLCB1ID0gY2hhbmdlLnBhdGgubGVuZ3RoIC0gMTtcbiAgICAgIGZvciAoaSA9IDA7IGkgPCB1OyBpKyspIHtcbiAgICAgICAgaXQgPSBpdFtjaGFuZ2UucGF0aFtpXV07XG4gICAgICB9XG4gICAgICBzd2l0Y2ggKGNoYW5nZS5raW5kKSB7XG4gICAgICAgIGNhc2UgJ0EnOlxuICAgICAgICAgIGFwcGx5QXJyYXlDaGFuZ2UoaXRbY2hhbmdlLnBhdGhbaV1dLCBjaGFuZ2UuaW5kZXgsIGNoYW5nZS5pdGVtKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnRCc6XG4gICAgICAgICAgZGVsZXRlIGl0W2NoYW5nZS5wYXRoW2ldXTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnRSc6XG4gICAgICAgIGNhc2UgJ04nOlxuICAgICAgICAgIGl0W2NoYW5nZS5wYXRoW2ldXSA9IGNoYW5nZS5yaHM7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHN3aXRjaCAoY2hhbmdlLmtpbmQpIHtcbiAgICAgICAgY2FzZSAnQSc6XG4gICAgICAgICAgYXBwbHlBcnJheUNoYW5nZShhcnJbaW5kZXhdLCBjaGFuZ2UuaW5kZXgsIGNoYW5nZS5pdGVtKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnRCc6XG4gICAgICAgICAgYXJyID0gYXJyYXlSZW1vdmUoYXJyLCBpbmRleCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ0UnOlxuICAgICAgICBjYXNlICdOJzpcbiAgICAgICAgICBhcnJbaW5kZXhdID0gY2hhbmdlLnJocztcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGFycjtcbiAgfVxuXG4gIGZ1bmN0aW9uIGFwcGx5Q2hhbmdlKHRhcmdldCwgc291cmNlLCBjaGFuZ2UpIHtcbiAgICBpZiAodGFyZ2V0ICYmIHNvdXJjZSAmJiBjaGFuZ2UgJiYgY2hhbmdlLmtpbmQpIHtcbiAgICAgIHZhciBpdCA9IHRhcmdldCxcbiAgICAgICAgICBpID0gLTEsXG4gICAgICAgICAgbGFzdCA9IGNoYW5nZS5wYXRoID8gY2hhbmdlLnBhdGgubGVuZ3RoIC0gMSA6IDA7XG4gICAgICB3aGlsZSAoKytpIDwgbGFzdCkge1xuICAgICAgICBpZiAodHlwZW9mIGl0W2NoYW5nZS5wYXRoW2ldXSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICBpdFtjaGFuZ2UucGF0aFtpXV0gPSAodHlwZW9mIGNoYW5nZS5wYXRoW2ldID09PSAnbnVtYmVyJykgPyBbXSA6IHt9O1xuICAgICAgICB9XG4gICAgICAgIGl0ID0gaXRbY2hhbmdlLnBhdGhbaV1dO1xuICAgICAgfVxuICAgICAgc3dpdGNoIChjaGFuZ2Uua2luZCkge1xuICAgICAgICBjYXNlICdBJzpcbiAgICAgICAgICBhcHBseUFycmF5Q2hhbmdlKGNoYW5nZS5wYXRoID8gaXRbY2hhbmdlLnBhdGhbaV1dIDogaXQsIGNoYW5nZS5pbmRleCwgY2hhbmdlLml0ZW0pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdEJzpcbiAgICAgICAgICBkZWxldGUgaXRbY2hhbmdlLnBhdGhbaV1dO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdFJzpcbiAgICAgICAgY2FzZSAnTic6XG4gICAgICAgICAgaXRbY2hhbmdlLnBhdGhbaV1dID0gY2hhbmdlLnJocztcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiByZXZlcnRBcnJheUNoYW5nZShhcnIsIGluZGV4LCBjaGFuZ2UpIHtcbiAgICBpZiAoY2hhbmdlLnBhdGggJiYgY2hhbmdlLnBhdGgubGVuZ3RoKSB7XG4gICAgICAvLyB0aGUgc3RydWN0dXJlIG9mIHRoZSBvYmplY3QgYXQgdGhlIGluZGV4IGhhcyBjaGFuZ2VkLi4uXG4gICAgICB2YXIgaXQgPSBhcnJbaW5kZXhdLFxuICAgICAgICAgIGksIHUgPSBjaGFuZ2UucGF0aC5sZW5ndGggLSAxO1xuICAgICAgZm9yIChpID0gMDsgaSA8IHU7IGkrKykge1xuICAgICAgICBpdCA9IGl0W2NoYW5nZS5wYXRoW2ldXTtcbiAgICAgIH1cbiAgICAgIHN3aXRjaCAoY2hhbmdlLmtpbmQpIHtcbiAgICAgICAgY2FzZSAnQSc6XG4gICAgICAgICAgcmV2ZXJ0QXJyYXlDaGFuZ2UoaXRbY2hhbmdlLnBhdGhbaV1dLCBjaGFuZ2UuaW5kZXgsIGNoYW5nZS5pdGVtKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnRCc6XG4gICAgICAgICAgaXRbY2hhbmdlLnBhdGhbaV1dID0gY2hhbmdlLmxocztcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnRSc6XG4gICAgICAgICAgaXRbY2hhbmdlLnBhdGhbaV1dID0gY2hhbmdlLmxocztcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnTic6XG4gICAgICAgICAgZGVsZXRlIGl0W2NoYW5nZS5wYXRoW2ldXTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gdGhlIGFycmF5IGl0ZW0gaXMgZGlmZmVyZW50Li4uXG4gICAgICBzd2l0Y2ggKGNoYW5nZS5raW5kKSB7XG4gICAgICAgIGNhc2UgJ0EnOlxuICAgICAgICAgIHJldmVydEFycmF5Q2hhbmdlKGFycltpbmRleF0sIGNoYW5nZS5pbmRleCwgY2hhbmdlLml0ZW0pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdEJzpcbiAgICAgICAgICBhcnJbaW5kZXhdID0gY2hhbmdlLmxocztcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnRSc6XG4gICAgICAgICAgYXJyW2luZGV4XSA9IGNoYW5nZS5saHM7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ04nOlxuICAgICAgICAgIGFyciA9IGFycmF5UmVtb3ZlKGFyciwgaW5kZXgpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gYXJyO1xuICB9XG5cbiAgZnVuY3Rpb24gcmV2ZXJ0Q2hhbmdlKHRhcmdldCwgc291cmNlLCBjaGFuZ2UpIHtcbiAgICBpZiAodGFyZ2V0ICYmIHNvdXJjZSAmJiBjaGFuZ2UgJiYgY2hhbmdlLmtpbmQpIHtcbiAgICAgIHZhciBpdCA9IHRhcmdldCxcbiAgICAgICAgICBpLCB1O1xuICAgICAgdSA9IGNoYW5nZS5wYXRoLmxlbmd0aCAtIDE7XG4gICAgICBmb3IgKGkgPSAwOyBpIDwgdTsgaSsrKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRbY2hhbmdlLnBhdGhbaV1dID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIGl0W2NoYW5nZS5wYXRoW2ldXSA9IHt9O1xuICAgICAgICB9XG4gICAgICAgIGl0ID0gaXRbY2hhbmdlLnBhdGhbaV1dO1xuICAgICAgfVxuICAgICAgc3dpdGNoIChjaGFuZ2Uua2luZCkge1xuICAgICAgICBjYXNlICdBJzpcbiAgICAgICAgICAvLyBBcnJheSB3YXMgbW9kaWZpZWQuLi5cbiAgICAgICAgICAvLyBpdCB3aWxsIGJlIGFuIGFycmF5Li4uXG4gICAgICAgICAgcmV2ZXJ0QXJyYXlDaGFuZ2UoaXRbY2hhbmdlLnBhdGhbaV1dLCBjaGFuZ2UuaW5kZXgsIGNoYW5nZS5pdGVtKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnRCc6XG4gICAgICAgICAgLy8gSXRlbSB3YXMgZGVsZXRlZC4uLlxuICAgICAgICAgIGl0W2NoYW5nZS5wYXRoW2ldXSA9IGNoYW5nZS5saHM7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ0UnOlxuICAgICAgICAgIC8vIEl0ZW0gd2FzIGVkaXRlZC4uLlxuICAgICAgICAgIGl0W2NoYW5nZS5wYXRoW2ldXSA9IGNoYW5nZS5saHM7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ04nOlxuICAgICAgICAgIC8vIEl0ZW0gaXMgbmV3Li4uXG4gICAgICAgICAgZGVsZXRlIGl0W2NoYW5nZS5wYXRoW2ldXTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBhcHBseURpZmYodGFyZ2V0LCBzb3VyY2UsIGZpbHRlcikge1xuICAgIGlmICh0YXJnZXQgJiYgc291cmNlKSB7XG4gICAgICB2YXIgb25DaGFuZ2UgPSBmdW5jdGlvbihjaGFuZ2UpIHtcbiAgICAgICAgaWYgKCFmaWx0ZXIgfHwgZmlsdGVyKHRhcmdldCwgc291cmNlLCBjaGFuZ2UpKSB7XG4gICAgICAgICAgYXBwbHlDaGFuZ2UodGFyZ2V0LCBzb3VyY2UsIGNoYW5nZSk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICBkZWVwRGlmZih0YXJnZXQsIHNvdXJjZSwgb25DaGFuZ2UpO1xuICAgIH1cbiAgfVxuXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKGFjY3VtdWxhdGVEaWZmLCB7XG5cbiAgICBkaWZmOiB7XG4gICAgICB2YWx1ZTogYWNjdW11bGF0ZURpZmYsXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlXG4gICAgfSxcbiAgICBvYnNlcnZhYmxlRGlmZjoge1xuICAgICAgdmFsdWU6IGRlZXBEaWZmLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZVxuICAgIH0sXG4gICAgYXBwbHlEaWZmOiB7XG4gICAgICB2YWx1ZTogYXBwbHlEaWZmLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZVxuICAgIH0sXG4gICAgYXBwbHlDaGFuZ2U6IHtcbiAgICAgIHZhbHVlOiBhcHBseUNoYW5nZSxcbiAgICAgIGVudW1lcmFibGU6IHRydWVcbiAgICB9LFxuICAgIHJldmVydENoYW5nZToge1xuICAgICAgdmFsdWU6IHJldmVydENoYW5nZSxcbiAgICAgIGVudW1lcmFibGU6IHRydWVcbiAgICB9LFxuICAgIGlzQ29uZmxpY3Q6IHtcbiAgICAgIHZhbHVlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuICd1bmRlZmluZWQnICE9PSB0eXBlb2YgY29uZmxpY3Q7XG4gICAgICB9LFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZVxuICAgIH0sXG4gICAgbm9Db25mbGljdDoge1xuICAgICAgdmFsdWU6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoY29uZmxpY3RSZXNvbHV0aW9uKSB7XG4gICAgICAgICAgY29uZmxpY3RSZXNvbHV0aW9uLmZvckVhY2goZnVuY3Rpb24oaXQpIHtcbiAgICAgICAgICAgIGl0KCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgY29uZmxpY3RSZXNvbHV0aW9uID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYWNjdW11bGF0ZURpZmY7XG4gICAgICB9LFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZVxuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIGFjY3VtdWxhdGVEaWZmO1xufSkpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBcbiAqL1xuXG5mdW5jdGlvbiBtYWtlRW1wdHlGdW5jdGlvbihhcmcpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gYXJnO1xuICB9O1xufVxuXG4vKipcbiAqIFRoaXMgZnVuY3Rpb24gYWNjZXB0cyBhbmQgZGlzY2FyZHMgaW5wdXRzOyBpdCBoYXMgbm8gc2lkZSBlZmZlY3RzLiBUaGlzIGlzXG4gKiBwcmltYXJpbHkgdXNlZnVsIGlkaW9tYXRpY2FsbHkgZm9yIG92ZXJyaWRhYmxlIGZ1bmN0aW9uIGVuZHBvaW50cyB3aGljaFxuICogYWx3YXlzIG5lZWQgdG8gYmUgY2FsbGFibGUsIHNpbmNlIEpTIGxhY2tzIGEgbnVsbC1jYWxsIGlkaW9tIGFsYSBDb2NvYS5cbiAqL1xudmFyIGVtcHR5RnVuY3Rpb24gPSBmdW5jdGlvbiBlbXB0eUZ1bmN0aW9uKCkge307XG5cbmVtcHR5RnVuY3Rpb24udGhhdFJldHVybnMgPSBtYWtlRW1wdHlGdW5jdGlvbjtcbmVtcHR5RnVuY3Rpb24udGhhdFJldHVybnNGYWxzZSA9IG1ha2VFbXB0eUZ1bmN0aW9uKGZhbHNlKTtcbmVtcHR5RnVuY3Rpb24udGhhdFJldHVybnNUcnVlID0gbWFrZUVtcHR5RnVuY3Rpb24odHJ1ZSk7XG5lbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zTnVsbCA9IG1ha2VFbXB0eUZ1bmN0aW9uKG51bGwpO1xuZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJuc1RoaXMgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB0aGlzO1xufTtcbmVtcHR5RnVuY3Rpb24udGhhdFJldHVybnNBcmd1bWVudCA9IGZ1bmN0aW9uIChhcmcpIHtcbiAgcmV0dXJuIGFyZztcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZW1wdHlGdW5jdGlvbjsiLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGVtcHR5T2JqZWN0ID0ge307XG5cbmlmIChcImRldmVsb3BtZW50XCIgIT09ICdwcm9kdWN0aW9uJykge1xuICBPYmplY3QuZnJlZXplKGVtcHR5T2JqZWN0KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBlbXB0eU9iamVjdDsiLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBVc2UgaW52YXJpYW50KCkgdG8gYXNzZXJ0IHN0YXRlIHdoaWNoIHlvdXIgcHJvZ3JhbSBhc3N1bWVzIHRvIGJlIHRydWUuXG4gKlxuICogUHJvdmlkZSBzcHJpbnRmLXN0eWxlIGZvcm1hdCAob25seSAlcyBpcyBzdXBwb3J0ZWQpIGFuZCBhcmd1bWVudHNcbiAqIHRvIHByb3ZpZGUgaW5mb3JtYXRpb24gYWJvdXQgd2hhdCBicm9rZSBhbmQgd2hhdCB5b3Ugd2VyZVxuICogZXhwZWN0aW5nLlxuICpcbiAqIFRoZSBpbnZhcmlhbnQgbWVzc2FnZSB3aWxsIGJlIHN0cmlwcGVkIGluIHByb2R1Y3Rpb24sIGJ1dCB0aGUgaW52YXJpYW50XG4gKiB3aWxsIHJlbWFpbiB0byBlbnN1cmUgbG9naWMgZG9lcyBub3QgZGlmZmVyIGluIHByb2R1Y3Rpb24uXG4gKi9cblxudmFyIHZhbGlkYXRlRm9ybWF0ID0gZnVuY3Rpb24gdmFsaWRhdGVGb3JtYXQoZm9ybWF0KSB7fTtcblxuaWYgKFwiZGV2ZWxvcG1lbnRcIiAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gIHZhbGlkYXRlRm9ybWF0ID0gZnVuY3Rpb24gdmFsaWRhdGVGb3JtYXQoZm9ybWF0KSB7XG4gICAgaWYgKGZvcm1hdCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2ludmFyaWFudCByZXF1aXJlcyBhbiBlcnJvciBtZXNzYWdlIGFyZ3VtZW50Jyk7XG4gICAgfVxuICB9O1xufVxuXG5mdW5jdGlvbiBpbnZhcmlhbnQoY29uZGl0aW9uLCBmb3JtYXQsIGEsIGIsIGMsIGQsIGUsIGYpIHtcbiAgdmFsaWRhdGVGb3JtYXQoZm9ybWF0KTtcblxuICBpZiAoIWNvbmRpdGlvbikge1xuICAgIHZhciBlcnJvcjtcbiAgICBpZiAoZm9ybWF0ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGVycm9yID0gbmV3IEVycm9yKCdNaW5pZmllZCBleGNlcHRpb24gb2NjdXJyZWQ7IHVzZSB0aGUgbm9uLW1pbmlmaWVkIGRldiBlbnZpcm9ubWVudCAnICsgJ2ZvciB0aGUgZnVsbCBlcnJvciBtZXNzYWdlIGFuZCBhZGRpdGlvbmFsIGhlbHBmdWwgd2FybmluZ3MuJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciBhcmdzID0gW2EsIGIsIGMsIGQsIGUsIGZdO1xuICAgICAgdmFyIGFyZ0luZGV4ID0gMDtcbiAgICAgIGVycm9yID0gbmV3IEVycm9yKGZvcm1hdC5yZXBsYWNlKC8lcy9nLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBhcmdzW2FyZ0luZGV4KytdO1xuICAgICAgfSkpO1xuICAgICAgZXJyb3IubmFtZSA9ICdJbnZhcmlhbnQgVmlvbGF0aW9uJztcbiAgICB9XG5cbiAgICBlcnJvci5mcmFtZXNUb1BvcCA9IDE7IC8vIHdlIGRvbid0IGNhcmUgYWJvdXQgaW52YXJpYW50J3Mgb3duIGZyYW1lXG4gICAgdGhyb3cgZXJyb3I7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnZhcmlhbnQ7IiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxNC0yMDE1LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGVtcHR5RnVuY3Rpb24gPSByZXF1aXJlKCcuL2VtcHR5RnVuY3Rpb24nKTtcblxuLyoqXG4gKiBTaW1pbGFyIHRvIGludmFyaWFudCBidXQgb25seSBsb2dzIGEgd2FybmluZyBpZiB0aGUgY29uZGl0aW9uIGlzIG5vdCBtZXQuXG4gKiBUaGlzIGNhbiBiZSB1c2VkIHRvIGxvZyBpc3N1ZXMgaW4gZGV2ZWxvcG1lbnQgZW52aXJvbm1lbnRzIGluIGNyaXRpY2FsXG4gKiBwYXRocy4gUmVtb3ZpbmcgdGhlIGxvZ2dpbmcgY29kZSBmb3IgcHJvZHVjdGlvbiBlbnZpcm9ubWVudHMgd2lsbCBrZWVwIHRoZVxuICogc2FtZSBsb2dpYyBhbmQgZm9sbG93IHRoZSBzYW1lIGNvZGUgcGF0aHMuXG4gKi9cblxudmFyIHdhcm5pbmcgPSBlbXB0eUZ1bmN0aW9uO1xuXG5pZiAoXCJkZXZlbG9wbWVudFwiICE9PSAncHJvZHVjdGlvbicpIHtcbiAgKGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgcHJpbnRXYXJuaW5nID0gZnVuY3Rpb24gcHJpbnRXYXJuaW5nKGZvcm1hdCkge1xuICAgICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBBcnJheShfbGVuID4gMSA/IF9sZW4gLSAxIDogMCksIF9rZXkgPSAxOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICAgIGFyZ3NbX2tleSAtIDFdID0gYXJndW1lbnRzW19rZXldO1xuICAgICAgfVxuXG4gICAgICB2YXIgYXJnSW5kZXggPSAwO1xuICAgICAgdmFyIG1lc3NhZ2UgPSAnV2FybmluZzogJyArIGZvcm1hdC5yZXBsYWNlKC8lcy9nLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBhcmdzW2FyZ0luZGV4KytdO1xuICAgICAgfSk7XG4gICAgICBpZiAodHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IobWVzc2FnZSk7XG4gICAgICB9XG4gICAgICB0cnkge1xuICAgICAgICAvLyAtLS0gV2VsY29tZSB0byBkZWJ1Z2dpbmcgUmVhY3QgLS0tXG4gICAgICAgIC8vIFRoaXMgZXJyb3Igd2FzIHRocm93biBhcyBhIGNvbnZlbmllbmNlIHNvIHRoYXQgeW91IGNhbiB1c2UgdGhpcyBzdGFja1xuICAgICAgICAvLyB0byBmaW5kIHRoZSBjYWxsc2l0ZSB0aGF0IGNhdXNlZCB0aGlzIHdhcm5pbmcgdG8gZmlyZS5cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UpO1xuICAgICAgfSBjYXRjaCAoeCkge31cbiAgICB9O1xuXG4gICAgd2FybmluZyA9IGZ1bmN0aW9uIHdhcm5pbmcoY29uZGl0aW9uLCBmb3JtYXQpIHtcbiAgICAgIGlmIChmb3JtYXQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2B3YXJuaW5nKGNvbmRpdGlvbiwgZm9ybWF0LCAuLi5hcmdzKWAgcmVxdWlyZXMgYSB3YXJuaW5nICcgKyAnbWVzc2FnZSBhcmd1bWVudCcpO1xuICAgICAgfVxuXG4gICAgICBpZiAoZm9ybWF0LmluZGV4T2YoJ0ZhaWxlZCBDb21wb3NpdGUgcHJvcFR5cGU6ICcpID09PSAwKSB7XG4gICAgICAgIHJldHVybjsgLy8gSWdub3JlIENvbXBvc2l0ZUNvbXBvbmVudCBwcm9wdHlwZSBjaGVjay5cbiAgICAgIH1cblxuICAgICAgaWYgKCFjb25kaXRpb24pIHtcbiAgICAgICAgZm9yICh2YXIgX2xlbjIgPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gQXJyYXkoX2xlbjIgPiAyID8gX2xlbjIgLSAyIDogMCksIF9rZXkyID0gMjsgX2tleTIgPCBfbGVuMjsgX2tleTIrKykge1xuICAgICAgICAgIGFyZ3NbX2tleTIgLSAyXSA9IGFyZ3VtZW50c1tfa2V5Ml07XG4gICAgICAgIH1cblxuICAgICAgICBwcmludFdhcm5pbmcuYXBwbHkodW5kZWZpbmVkLCBbZm9ybWF0XS5jb25jYXQoYXJncykpO1xuICAgICAgfVxuICAgIH07XG4gIH0pKCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gd2FybmluZzsiLCJ2YXIgb3ZlckFyZyA9IHJlcXVpcmUoJy4vX292ZXJBcmcnKTtcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgZ2V0UHJvdG90eXBlID0gb3ZlckFyZyhPYmplY3QuZ2V0UHJvdG90eXBlT2YsIE9iamVjdCk7XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0UHJvdG90eXBlO1xuIiwiLyoqXG4gKiBDcmVhdGVzIGEgdW5hcnkgZnVuY3Rpb24gdGhhdCBpbnZva2VzIGBmdW5jYCB3aXRoIGl0cyBhcmd1bWVudCB0cmFuc2Zvcm1lZC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gd3JhcC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHRyYW5zZm9ybSBUaGUgYXJndW1lbnQgdHJhbnNmb3JtLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIG92ZXJBcmcoZnVuYywgdHJhbnNmb3JtKSB7XG4gIHJldHVybiBmdW5jdGlvbihhcmcpIHtcbiAgICByZXR1cm4gZnVuYyh0cmFuc2Zvcm0oYXJnKSk7XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gb3ZlckFyZztcbiIsIi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UuIEEgdmFsdWUgaXMgb2JqZWN0LWxpa2UgaWYgaXQncyBub3QgYG51bGxgXG4gKiBhbmQgaGFzIGEgYHR5cGVvZmAgcmVzdWx0IG9mIFwib2JqZWN0XCIuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdExpa2Uoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc09iamVjdExpa2UobnVsbCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdExpa2UodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlICE9IG51bGwgJiYgdHlwZW9mIHZhbHVlID09ICdvYmplY3QnO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzT2JqZWN0TGlrZTtcbiIsInZhciBnZXRQcm90b3R5cGUgPSByZXF1aXJlKCcuL19nZXRQcm90b3R5cGUnKSxcbiAgICBpc09iamVjdExpa2UgPSByZXF1aXJlKCcuL2lzT2JqZWN0TGlrZScpO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0VGFnID0gJ1tvYmplY3QgT2JqZWN0XSc7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBmdW5jUHJvdG8gPSBGdW5jdGlvbi5wcm90b3R5cGUsXG4gICAgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byByZXNvbHZlIHRoZSBkZWNvbXBpbGVkIHNvdXJjZSBvZiBmdW5jdGlvbnMuICovXG52YXIgZnVuY1RvU3RyaW5nID0gZnVuY1Byb3RvLnRvU3RyaW5nO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKiogVXNlZCB0byBpbmZlciB0aGUgYE9iamVjdGAgY29uc3RydWN0b3IuICovXG52YXIgb2JqZWN0Q3RvclN0cmluZyA9IGZ1bmNUb1N0cmluZy5jYWxsKE9iamVjdCk7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZVxuICogW2B0b1N0cmluZ1RhZ2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBvYmplY3RUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgcGxhaW4gb2JqZWN0LCB0aGF0IGlzLCBhbiBvYmplY3QgY3JlYXRlZCBieSB0aGVcbiAqIGBPYmplY3RgIGNvbnN0cnVjdG9yIG9yIG9uZSB3aXRoIGEgYFtbUHJvdG90eXBlXV1gIG9mIGBudWxsYC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuOC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHBsYWluIG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBmdW5jdGlvbiBGb28oKSB7XG4gKiAgIHRoaXMuYSA9IDE7XG4gKiB9XG4gKlxuICogXy5pc1BsYWluT2JqZWN0KG5ldyBGb28pO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzUGxhaW5PYmplY3QoWzEsIDIsIDNdKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc1BsYWluT2JqZWN0KHsgJ3gnOiAwLCAneSc6IDAgfSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc1BsYWluT2JqZWN0KE9iamVjdC5jcmVhdGUobnVsbCkpO1xuICogLy8gPT4gdHJ1ZVxuICovXG5mdW5jdGlvbiBpc1BsYWluT2JqZWN0KHZhbHVlKSB7XG4gIGlmICghaXNPYmplY3RMaWtlKHZhbHVlKSB8fCBvYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKSAhPSBvYmplY3RUYWcpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIHByb3RvID0gZ2V0UHJvdG90eXBlKHZhbHVlKTtcbiAgaWYgKHByb3RvID09PSBudWxsKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgdmFyIEN0b3IgPSBoYXNPd25Qcm9wZXJ0eS5jYWxsKHByb3RvLCAnY29uc3RydWN0b3InKSAmJiBwcm90by5jb25zdHJ1Y3RvcjtcbiAgcmV0dXJuICh0eXBlb2YgQ3RvciA9PSAnZnVuY3Rpb24nICYmXG4gICAgQ3RvciBpbnN0YW5jZW9mIEN0b3IgJiYgZnVuY1RvU3RyaW5nLmNhbGwoQ3RvcikgPT0gb2JqZWN0Q3RvclN0cmluZyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNQbGFpbk9iamVjdDtcbiIsIid1c2Ugc3RyaWN0Jztcbi8qIGVzbGludC1kaXNhYmxlIG5vLXVudXNlZC12YXJzICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xudmFyIHByb3BJc0VudW1lcmFibGUgPSBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlO1xuXG5mdW5jdGlvbiB0b09iamVjdCh2YWwpIHtcblx0aWYgKHZhbCA9PT0gbnVsbCB8fCB2YWwgPT09IHVuZGVmaW5lZCkge1xuXHRcdHRocm93IG5ldyBUeXBlRXJyb3IoJ09iamVjdC5hc3NpZ24gY2Fubm90IGJlIGNhbGxlZCB3aXRoIG51bGwgb3IgdW5kZWZpbmVkJyk7XG5cdH1cblxuXHRyZXR1cm4gT2JqZWN0KHZhbCk7XG59XG5cbmZ1bmN0aW9uIHNob3VsZFVzZU5hdGl2ZSgpIHtcblx0dHJ5IHtcblx0XHRpZiAoIU9iamVjdC5hc3NpZ24pIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHQvLyBEZXRlY3QgYnVnZ3kgcHJvcGVydHkgZW51bWVyYXRpb24gb3JkZXIgaW4gb2xkZXIgVjggdmVyc2lvbnMuXG5cblx0XHQvLyBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvdjgvaXNzdWVzL2RldGFpbD9pZD00MTE4XG5cdFx0dmFyIHRlc3QxID0gbmV3IFN0cmluZygnYWJjJyk7ICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG5cdFx0dGVzdDFbNV0gPSAnZGUnO1xuXHRcdGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0ZXN0MSlbMF0gPT09ICc1Jykge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblxuXHRcdC8vIGh0dHBzOi8vYnVncy5jaHJvbWl1bS5vcmcvcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTMwNTZcblx0XHR2YXIgdGVzdDIgPSB7fTtcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IDEwOyBpKyspIHtcblx0XHRcdHRlc3QyWydfJyArIFN0cmluZy5mcm9tQ2hhckNvZGUoaSldID0gaTtcblx0XHR9XG5cdFx0dmFyIG9yZGVyMiA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRlc3QyKS5tYXAoZnVuY3Rpb24gKG4pIHtcblx0XHRcdHJldHVybiB0ZXN0MltuXTtcblx0XHR9KTtcblx0XHRpZiAob3JkZXIyLmpvaW4oJycpICE9PSAnMDEyMzQ1Njc4OScpIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHQvLyBodHRwczovL2J1Z3MuY2hyb21pdW0ub3JnL3AvdjgvaXNzdWVzL2RldGFpbD9pZD0zMDU2XG5cdFx0dmFyIHRlc3QzID0ge307XG5cdFx0J2FiY2RlZmdoaWprbG1ub3BxcnN0Jy5zcGxpdCgnJykuZm9yRWFjaChmdW5jdGlvbiAobGV0dGVyKSB7XG5cdFx0XHR0ZXN0M1tsZXR0ZXJdID0gbGV0dGVyO1xuXHRcdH0pO1xuXHRcdGlmIChPYmplY3Qua2V5cyhPYmplY3QuYXNzaWduKHt9LCB0ZXN0MykpLmpvaW4oJycpICE9PVxuXHRcdFx0XHQnYWJjZGVmZ2hpamtsbW5vcHFyc3QnKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRydWU7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHQvLyBXZSBkb24ndCBleHBlY3QgYW55IG9mIHRoZSBhYm92ZSB0byB0aHJvdywgYnV0IGJldHRlciB0byBiZSBzYWZlLlxuXHRcdHJldHVybiBmYWxzZTtcblx0fVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNob3VsZFVzZU5hdGl2ZSgpID8gT2JqZWN0LmFzc2lnbiA6IGZ1bmN0aW9uICh0YXJnZXQsIHNvdXJjZSkge1xuXHR2YXIgZnJvbTtcblx0dmFyIHRvID0gdG9PYmplY3QodGFyZ2V0KTtcblx0dmFyIHN5bWJvbHM7XG5cblx0Zm9yICh2YXIgcyA9IDE7IHMgPCBhcmd1bWVudHMubGVuZ3RoOyBzKyspIHtcblx0XHRmcm9tID0gT2JqZWN0KGFyZ3VtZW50c1tzXSk7XG5cblx0XHRmb3IgKHZhciBrZXkgaW4gZnJvbSkge1xuXHRcdFx0aWYgKGhhc093blByb3BlcnR5LmNhbGwoZnJvbSwga2V5KSkge1xuXHRcdFx0XHR0b1trZXldID0gZnJvbVtrZXldO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKSB7XG5cdFx0XHRzeW1ib2xzID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhmcm9tKTtcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgc3ltYm9scy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRpZiAocHJvcElzRW51bWVyYWJsZS5jYWxsKGZyb20sIHN5bWJvbHNbaV0pKSB7XG5cdFx0XHRcdFx0dG9bc3ltYm9sc1tpXV0gPSBmcm9tW3N5bWJvbHNbaV1dO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIHRvO1xufTtcbiIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG4vLyBjYWNoZWQgZnJvbSB3aGF0ZXZlciBnbG9iYWwgaXMgcHJlc2VudCBzbyB0aGF0IHRlc3QgcnVubmVycyB0aGF0IHN0dWIgaXRcbi8vIGRvbid0IGJyZWFrIHRoaW5ncy4gIEJ1dCB3ZSBuZWVkIHRvIHdyYXAgaXQgaW4gYSB0cnkgY2F0Y2ggaW4gY2FzZSBpdCBpc1xuLy8gd3JhcHBlZCBpbiBzdHJpY3QgbW9kZSBjb2RlIHdoaWNoIGRvZXNuJ3QgZGVmaW5lIGFueSBnbG9iYWxzLiAgSXQncyBpbnNpZGUgYVxuLy8gZnVuY3Rpb24gYmVjYXVzZSB0cnkvY2F0Y2hlcyBkZW9wdGltaXplIGluIGNlcnRhaW4gZW5naW5lcy5cblxudmFyIGNhY2hlZFNldFRpbWVvdXQ7XG52YXIgY2FjaGVkQ2xlYXJUaW1lb3V0O1xuXG5mdW5jdGlvbiBkZWZhdWx0U2V0VGltb3V0KCkge1xuICAgIHRocm93IG5ldyBFcnJvcignc2V0VGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuZnVuY3Rpb24gZGVmYXVsdENsZWFyVGltZW91dCAoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdjbGVhclRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbihmdW5jdGlvbiAoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBzZXRUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBjbGVhclRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgfVxufSAoKSlcbmZ1bmN0aW9uIHJ1blRpbWVvdXQoZnVuKSB7XG4gICAgaWYgKGNhY2hlZFNldFRpbWVvdXQgPT09IHNldFRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIC8vIGlmIHNldFRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRTZXRUaW1lb3V0ID09PSBkZWZhdWx0U2V0VGltb3V0IHx8ICFjYWNoZWRTZXRUaW1lb3V0KSAmJiBzZXRUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfSBjYXRjaChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbChudWxsLCBmdW4sIDApO1xuICAgICAgICB9IGNhdGNoKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3JcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwodGhpcywgZnVuLCAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG59XG5mdW5jdGlvbiBydW5DbGVhclRpbWVvdXQobWFya2VyKSB7XG4gICAgaWYgKGNhY2hlZENsZWFyVGltZW91dCA9PT0gY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIC8vIGlmIGNsZWFyVGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZENsZWFyVGltZW91dCA9PT0gZGVmYXVsdENsZWFyVGltZW91dCB8fCAhY2FjaGVkQ2xlYXJUaW1lb3V0KSAmJiBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0ICB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKG51bGwsIG1hcmtlcik7XG4gICAgICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3IuXG4gICAgICAgICAgICAvLyBTb21lIHZlcnNpb25zIG9mIEkuRS4gaGF2ZSBkaWZmZXJlbnQgcnVsZXMgZm9yIGNsZWFyVGltZW91dCB2cyBzZXRUaW1lb3V0XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwodGhpcywgbWFya2VyKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG5cbn1cbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICAgIGlmICghZHJhaW5pbmcgfHwgIWN1cnJlbnRRdWV1ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgfVxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGltZW91dCA9IHJ1blRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgICBkcmFpbmluZyA9IHRydWU7XG5cbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIHJ1bkNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgICAgIHJ1blRpbWVvdXQoZHJhaW5RdWV1ZSk7XG4gICAgfVxufTtcblxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gICAgdGhpcy5mdW4gPSBmdW47XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG4iLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbi8qKlxuICogRXNjYXBlIGFuZCB3cmFwIGtleSBzbyBpdCBpcyBzYWZlIHRvIHVzZSBhcyBhIHJlYWN0aWRcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IHRvIGJlIGVzY2FwZWQuXG4gKiBAcmV0dXJuIHtzdHJpbmd9IHRoZSBlc2NhcGVkIGtleS5cbiAqL1xuXG5mdW5jdGlvbiBlc2NhcGUoa2V5KSB7XG4gIHZhciBlc2NhcGVSZWdleCA9IC9bPTpdL2c7XG4gIHZhciBlc2NhcGVyTG9va3VwID0ge1xuICAgICc9JzogJz0wJyxcbiAgICAnOic6ICc9MidcbiAgfTtcbiAgdmFyIGVzY2FwZWRTdHJpbmcgPSAoJycgKyBrZXkpLnJlcGxhY2UoZXNjYXBlUmVnZXgsIGZ1bmN0aW9uIChtYXRjaCkge1xuICAgIHJldHVybiBlc2NhcGVyTG9va3VwW21hdGNoXTtcbiAgfSk7XG5cbiAgcmV0dXJuICckJyArIGVzY2FwZWRTdHJpbmc7XG59XG5cbi8qKlxuICogVW5lc2NhcGUgYW5kIHVud3JhcCBrZXkgZm9yIGh1bWFuLXJlYWRhYmxlIGRpc3BsYXlcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IHRvIHVuZXNjYXBlLlxuICogQHJldHVybiB7c3RyaW5nfSB0aGUgdW5lc2NhcGVkIGtleS5cbiAqL1xuZnVuY3Rpb24gdW5lc2NhcGUoa2V5KSB7XG4gIHZhciB1bmVzY2FwZVJlZ2V4ID0gLyg9MHw9MikvZztcbiAgdmFyIHVuZXNjYXBlckxvb2t1cCA9IHtcbiAgICAnPTAnOiAnPScsXG4gICAgJz0yJzogJzonXG4gIH07XG4gIHZhciBrZXlTdWJzdHJpbmcgPSBrZXlbMF0gPT09ICcuJyAmJiBrZXlbMV0gPT09ICckJyA/IGtleS5zdWJzdHJpbmcoMikgOiBrZXkuc3Vic3RyaW5nKDEpO1xuXG4gIHJldHVybiAoJycgKyBrZXlTdWJzdHJpbmcpLnJlcGxhY2UodW5lc2NhcGVSZWdleCwgZnVuY3Rpb24gKG1hdGNoKSB7XG4gICAgcmV0dXJuIHVuZXNjYXBlckxvb2t1cFttYXRjaF07XG4gIH0pO1xufVxuXG52YXIgS2V5RXNjYXBlVXRpbHMgPSB7XG4gIGVzY2FwZTogZXNjYXBlLFxuICB1bmVzY2FwZTogdW5lc2NhcGVcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gS2V5RXNjYXBlVXRpbHM7IiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgX3Byb2RJbnZhcmlhbnQgPSByZXF1aXJlKCcuL3JlYWN0UHJvZEludmFyaWFudCcpO1xuXG52YXIgaW52YXJpYW50ID0gcmVxdWlyZSgnZmJqcy9saWIvaW52YXJpYW50Jyk7XG5cbi8qKlxuICogU3RhdGljIHBvb2xlcnMuIFNldmVyYWwgY3VzdG9tIHZlcnNpb25zIGZvciBlYWNoIHBvdGVudGlhbCBudW1iZXIgb2ZcbiAqIGFyZ3VtZW50cy4gQSBjb21wbGV0ZWx5IGdlbmVyaWMgcG9vbGVyIGlzIGVhc3kgdG8gaW1wbGVtZW50LCBidXQgd291bGRcbiAqIHJlcXVpcmUgYWNjZXNzaW5nIHRoZSBgYXJndW1lbnRzYCBvYmplY3QuIEluIGVhY2ggb2YgdGhlc2UsIGB0aGlzYCByZWZlcnMgdG9cbiAqIHRoZSBDbGFzcyBpdHNlbGYsIG5vdCBhbiBpbnN0YW5jZS4gSWYgYW55IG90aGVycyBhcmUgbmVlZGVkLCBzaW1wbHkgYWRkIHRoZW1cbiAqIGhlcmUsIG9yIGluIHRoZWlyIG93biBmaWxlcy5cbiAqL1xudmFyIG9uZUFyZ3VtZW50UG9vbGVyID0gZnVuY3Rpb24gKGNvcHlGaWVsZHNGcm9tKSB7XG4gIHZhciBLbGFzcyA9IHRoaXM7XG4gIGlmIChLbGFzcy5pbnN0YW5jZVBvb2wubGVuZ3RoKSB7XG4gICAgdmFyIGluc3RhbmNlID0gS2xhc3MuaW5zdGFuY2VQb29sLnBvcCgpO1xuICAgIEtsYXNzLmNhbGwoaW5zdGFuY2UsIGNvcHlGaWVsZHNGcm9tKTtcbiAgICByZXR1cm4gaW5zdGFuY2U7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG5ldyBLbGFzcyhjb3B5RmllbGRzRnJvbSk7XG4gIH1cbn07XG5cbnZhciB0d29Bcmd1bWVudFBvb2xlciA9IGZ1bmN0aW9uIChhMSwgYTIpIHtcbiAgdmFyIEtsYXNzID0gdGhpcztcbiAgaWYgKEtsYXNzLmluc3RhbmNlUG9vbC5sZW5ndGgpIHtcbiAgICB2YXIgaW5zdGFuY2UgPSBLbGFzcy5pbnN0YW5jZVBvb2wucG9wKCk7XG4gICAgS2xhc3MuY2FsbChpbnN0YW5jZSwgYTEsIGEyKTtcbiAgICByZXR1cm4gaW5zdGFuY2U7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG5ldyBLbGFzcyhhMSwgYTIpO1xuICB9XG59O1xuXG52YXIgdGhyZWVBcmd1bWVudFBvb2xlciA9IGZ1bmN0aW9uIChhMSwgYTIsIGEzKSB7XG4gIHZhciBLbGFzcyA9IHRoaXM7XG4gIGlmIChLbGFzcy5pbnN0YW5jZVBvb2wubGVuZ3RoKSB7XG4gICAgdmFyIGluc3RhbmNlID0gS2xhc3MuaW5zdGFuY2VQb29sLnBvcCgpO1xuICAgIEtsYXNzLmNhbGwoaW5zdGFuY2UsIGExLCBhMiwgYTMpO1xuICAgIHJldHVybiBpbnN0YW5jZTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbmV3IEtsYXNzKGExLCBhMiwgYTMpO1xuICB9XG59O1xuXG52YXIgZm91ckFyZ3VtZW50UG9vbGVyID0gZnVuY3Rpb24gKGExLCBhMiwgYTMsIGE0KSB7XG4gIHZhciBLbGFzcyA9IHRoaXM7XG4gIGlmIChLbGFzcy5pbnN0YW5jZVBvb2wubGVuZ3RoKSB7XG4gICAgdmFyIGluc3RhbmNlID0gS2xhc3MuaW5zdGFuY2VQb29sLnBvcCgpO1xuICAgIEtsYXNzLmNhbGwoaW5zdGFuY2UsIGExLCBhMiwgYTMsIGE0KTtcbiAgICByZXR1cm4gaW5zdGFuY2U7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG5ldyBLbGFzcyhhMSwgYTIsIGEzLCBhNCk7XG4gIH1cbn07XG5cbnZhciBzdGFuZGFyZFJlbGVhc2VyID0gZnVuY3Rpb24gKGluc3RhbmNlKSB7XG4gIHZhciBLbGFzcyA9IHRoaXM7XG4gICEoaW5zdGFuY2UgaW5zdGFuY2VvZiBLbGFzcykgPyBcImRldmVsb3BtZW50XCIgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ1RyeWluZyB0byByZWxlYXNlIGFuIGluc3RhbmNlIGludG8gYSBwb29sIG9mIGEgZGlmZmVyZW50IHR5cGUuJykgOiBfcHJvZEludmFyaWFudCgnMjUnKSA6IHZvaWQgMDtcbiAgaW5zdGFuY2UuZGVzdHJ1Y3RvcigpO1xuICBpZiAoS2xhc3MuaW5zdGFuY2VQb29sLmxlbmd0aCA8IEtsYXNzLnBvb2xTaXplKSB7XG4gICAgS2xhc3MuaW5zdGFuY2VQb29sLnB1c2goaW5zdGFuY2UpO1xuICB9XG59O1xuXG52YXIgREVGQVVMVF9QT09MX1NJWkUgPSAxMDtcbnZhciBERUZBVUxUX1BPT0xFUiA9IG9uZUFyZ3VtZW50UG9vbGVyO1xuXG4vKipcbiAqIEF1Z21lbnRzIGBDb3B5Q29uc3RydWN0b3JgIHRvIGJlIGEgcG9vbGFibGUgY2xhc3MsIGF1Z21lbnRpbmcgb25seSB0aGUgY2xhc3NcbiAqIGl0c2VsZiAoc3RhdGljYWxseSkgbm90IGFkZGluZyBhbnkgcHJvdG90eXBpY2FsIGZpZWxkcy4gQW55IENvcHlDb25zdHJ1Y3RvclxuICogeW91IGdpdmUgdGhpcyBtYXkgaGF2ZSBhIGBwb29sU2l6ZWAgcHJvcGVydHksIGFuZCB3aWxsIGxvb2sgZm9yIGFcbiAqIHByb3RvdHlwaWNhbCBgZGVzdHJ1Y3RvcmAgb24gaW5zdGFuY2VzLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IENvcHlDb25zdHJ1Y3RvciBDb25zdHJ1Y3RvciB0aGF0IGNhbiBiZSB1c2VkIHRvIHJlc2V0LlxuICogQHBhcmFtIHtGdW5jdGlvbn0gcG9vbGVyIEN1c3RvbWl6YWJsZSBwb29sZXIuXG4gKi9cbnZhciBhZGRQb29saW5nVG8gPSBmdW5jdGlvbiAoQ29weUNvbnN0cnVjdG9yLCBwb29sZXIpIHtcbiAgLy8gQ2FzdGluZyBhcyBhbnkgc28gdGhhdCBmbG93IGlnbm9yZXMgdGhlIGFjdHVhbCBpbXBsZW1lbnRhdGlvbiBhbmQgdHJ1c3RzXG4gIC8vIGl0IHRvIG1hdGNoIHRoZSB0eXBlIHdlIGRlY2xhcmVkXG4gIHZhciBOZXdLbGFzcyA9IENvcHlDb25zdHJ1Y3RvcjtcbiAgTmV3S2xhc3MuaW5zdGFuY2VQb29sID0gW107XG4gIE5ld0tsYXNzLmdldFBvb2xlZCA9IHBvb2xlciB8fCBERUZBVUxUX1BPT0xFUjtcbiAgaWYgKCFOZXdLbGFzcy5wb29sU2l6ZSkge1xuICAgIE5ld0tsYXNzLnBvb2xTaXplID0gREVGQVVMVF9QT09MX1NJWkU7XG4gIH1cbiAgTmV3S2xhc3MucmVsZWFzZSA9IHN0YW5kYXJkUmVsZWFzZXI7XG4gIHJldHVybiBOZXdLbGFzcztcbn07XG5cbnZhciBQb29sZWRDbGFzcyA9IHtcbiAgYWRkUG9vbGluZ1RvOiBhZGRQb29saW5nVG8sXG4gIG9uZUFyZ3VtZW50UG9vbGVyOiBvbmVBcmd1bWVudFBvb2xlcixcbiAgdHdvQXJndW1lbnRQb29sZXI6IHR3b0FyZ3VtZW50UG9vbGVyLFxuICB0aHJlZUFyZ3VtZW50UG9vbGVyOiB0aHJlZUFyZ3VtZW50UG9vbGVyLFxuICBmb3VyQXJndW1lbnRQb29sZXI6IGZvdXJBcmd1bWVudFBvb2xlclxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBQb29sZWRDbGFzczsiLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgX2Fzc2lnbiA9IHJlcXVpcmUoJ29iamVjdC1hc3NpZ24nKTtcblxudmFyIFJlYWN0Q2hpbGRyZW4gPSByZXF1aXJlKCcuL1JlYWN0Q2hpbGRyZW4nKTtcbnZhciBSZWFjdENvbXBvbmVudCA9IHJlcXVpcmUoJy4vUmVhY3RDb21wb25lbnQnKTtcbnZhciBSZWFjdFB1cmVDb21wb25lbnQgPSByZXF1aXJlKCcuL1JlYWN0UHVyZUNvbXBvbmVudCcpO1xudmFyIFJlYWN0Q2xhc3MgPSByZXF1aXJlKCcuL1JlYWN0Q2xhc3MnKTtcbnZhciBSZWFjdERPTUZhY3RvcmllcyA9IHJlcXVpcmUoJy4vUmVhY3RET01GYWN0b3JpZXMnKTtcbnZhciBSZWFjdEVsZW1lbnQgPSByZXF1aXJlKCcuL1JlYWN0RWxlbWVudCcpO1xudmFyIFJlYWN0UHJvcFR5cGVzID0gcmVxdWlyZSgnLi9SZWFjdFByb3BUeXBlcycpO1xudmFyIFJlYWN0VmVyc2lvbiA9IHJlcXVpcmUoJy4vUmVhY3RWZXJzaW9uJyk7XG5cbnZhciBvbmx5Q2hpbGQgPSByZXF1aXJlKCcuL29ubHlDaGlsZCcpO1xudmFyIHdhcm5pbmcgPSByZXF1aXJlKCdmYmpzL2xpYi93YXJuaW5nJyk7XG5cbnZhciBjcmVhdGVFbGVtZW50ID0gUmVhY3RFbGVtZW50LmNyZWF0ZUVsZW1lbnQ7XG52YXIgY3JlYXRlRmFjdG9yeSA9IFJlYWN0RWxlbWVudC5jcmVhdGVGYWN0b3J5O1xudmFyIGNsb25lRWxlbWVudCA9IFJlYWN0RWxlbWVudC5jbG9uZUVsZW1lbnQ7XG5cbmlmIChcImRldmVsb3BtZW50XCIgIT09ICdwcm9kdWN0aW9uJykge1xuICB2YXIgUmVhY3RFbGVtZW50VmFsaWRhdG9yID0gcmVxdWlyZSgnLi9SZWFjdEVsZW1lbnRWYWxpZGF0b3InKTtcbiAgY3JlYXRlRWxlbWVudCA9IFJlYWN0RWxlbWVudFZhbGlkYXRvci5jcmVhdGVFbGVtZW50O1xuICBjcmVhdGVGYWN0b3J5ID0gUmVhY3RFbGVtZW50VmFsaWRhdG9yLmNyZWF0ZUZhY3Rvcnk7XG4gIGNsb25lRWxlbWVudCA9IFJlYWN0RWxlbWVudFZhbGlkYXRvci5jbG9uZUVsZW1lbnQ7XG59XG5cbnZhciBfX3NwcmVhZCA9IF9hc3NpZ247XG5cbmlmIChcImRldmVsb3BtZW50XCIgIT09ICdwcm9kdWN0aW9uJykge1xuICB2YXIgd2FybmVkID0gZmFsc2U7XG4gIF9fc3ByZWFkID0gZnVuY3Rpb24gKCkge1xuICAgIFwiZGV2ZWxvcG1lbnRcIiAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyh3YXJuZWQsICdSZWFjdC5fX3NwcmVhZCBpcyBkZXByZWNhdGVkIGFuZCBzaG91bGQgbm90IGJlIHVzZWQuIFVzZSAnICsgJ09iamVjdC5hc3NpZ24gZGlyZWN0bHkgb3IgYW5vdGhlciBoZWxwZXIgZnVuY3Rpb24gd2l0aCBzaW1pbGFyICcgKyAnc2VtYW50aWNzLiBZb3UgbWF5IGJlIHNlZWluZyB0aGlzIHdhcm5pbmcgZHVlIHRvIHlvdXIgY29tcGlsZXIuICcgKyAnU2VlIGh0dHBzOi8vZmIubWUvcmVhY3Qtc3ByZWFkLWRlcHJlY2F0aW9uIGZvciBtb3JlIGRldGFpbHMuJykgOiB2b2lkIDA7XG4gICAgd2FybmVkID0gdHJ1ZTtcbiAgICByZXR1cm4gX2Fzc2lnbi5hcHBseShudWxsLCBhcmd1bWVudHMpO1xuICB9O1xufVxuXG52YXIgUmVhY3QgPSB7XG5cbiAgLy8gTW9kZXJuXG5cbiAgQ2hpbGRyZW46IHtcbiAgICBtYXA6IFJlYWN0Q2hpbGRyZW4ubWFwLFxuICAgIGZvckVhY2g6IFJlYWN0Q2hpbGRyZW4uZm9yRWFjaCxcbiAgICBjb3VudDogUmVhY3RDaGlsZHJlbi5jb3VudCxcbiAgICB0b0FycmF5OiBSZWFjdENoaWxkcmVuLnRvQXJyYXksXG4gICAgb25seTogb25seUNoaWxkXG4gIH0sXG5cbiAgQ29tcG9uZW50OiBSZWFjdENvbXBvbmVudCxcbiAgUHVyZUNvbXBvbmVudDogUmVhY3RQdXJlQ29tcG9uZW50LFxuXG4gIGNyZWF0ZUVsZW1lbnQ6IGNyZWF0ZUVsZW1lbnQsXG4gIGNsb25lRWxlbWVudDogY2xvbmVFbGVtZW50LFxuICBpc1ZhbGlkRWxlbWVudDogUmVhY3RFbGVtZW50LmlzVmFsaWRFbGVtZW50LFxuXG4gIC8vIENsYXNzaWNcblxuICBQcm9wVHlwZXM6IFJlYWN0UHJvcFR5cGVzLFxuICBjcmVhdGVDbGFzczogUmVhY3RDbGFzcy5jcmVhdGVDbGFzcyxcbiAgY3JlYXRlRmFjdG9yeTogY3JlYXRlRmFjdG9yeSxcbiAgY3JlYXRlTWl4aW46IGZ1bmN0aW9uIChtaXhpbikge1xuICAgIC8vIEN1cnJlbnRseSBhIG5vb3AuIFdpbGwgYmUgdXNlZCB0byB2YWxpZGF0ZSBhbmQgdHJhY2UgbWl4aW5zLlxuICAgIHJldHVybiBtaXhpbjtcbiAgfSxcblxuICAvLyBUaGlzIGxvb2tzIERPTSBzcGVjaWZpYyBidXQgdGhlc2UgYXJlIGFjdHVhbGx5IGlzb21vcnBoaWMgaGVscGVyc1xuICAvLyBzaW5jZSB0aGV5IGFyZSBqdXN0IGdlbmVyYXRpbmcgRE9NIHN0cmluZ3MuXG4gIERPTTogUmVhY3RET01GYWN0b3JpZXMsXG5cbiAgdmVyc2lvbjogUmVhY3RWZXJzaW9uLFxuXG4gIC8vIERlcHJlY2F0ZWQgaG9vayBmb3IgSlNYIHNwcmVhZCwgZG9uJ3QgdXNlIHRoaXMgZm9yIGFueXRoaW5nLlxuICBfX3NwcmVhZDogX19zcHJlYWRcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3Q7IiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFBvb2xlZENsYXNzID0gcmVxdWlyZSgnLi9Qb29sZWRDbGFzcycpO1xudmFyIFJlYWN0RWxlbWVudCA9IHJlcXVpcmUoJy4vUmVhY3RFbGVtZW50Jyk7XG5cbnZhciBlbXB0eUZ1bmN0aW9uID0gcmVxdWlyZSgnZmJqcy9saWIvZW1wdHlGdW5jdGlvbicpO1xudmFyIHRyYXZlcnNlQWxsQ2hpbGRyZW4gPSByZXF1aXJlKCcuL3RyYXZlcnNlQWxsQ2hpbGRyZW4nKTtcblxudmFyIHR3b0FyZ3VtZW50UG9vbGVyID0gUG9vbGVkQ2xhc3MudHdvQXJndW1lbnRQb29sZXI7XG52YXIgZm91ckFyZ3VtZW50UG9vbGVyID0gUG9vbGVkQ2xhc3MuZm91ckFyZ3VtZW50UG9vbGVyO1xuXG52YXIgdXNlclByb3ZpZGVkS2V5RXNjYXBlUmVnZXggPSAvXFwvKy9nO1xuZnVuY3Rpb24gZXNjYXBlVXNlclByb3ZpZGVkS2V5KHRleHQpIHtcbiAgcmV0dXJuICgnJyArIHRleHQpLnJlcGxhY2UodXNlclByb3ZpZGVkS2V5RXNjYXBlUmVnZXgsICckJi8nKTtcbn1cblxuLyoqXG4gKiBQb29sZWRDbGFzcyByZXByZXNlbnRpbmcgdGhlIGJvb2trZWVwaW5nIGFzc29jaWF0ZWQgd2l0aCBwZXJmb3JtaW5nIGEgY2hpbGRcbiAqIHRyYXZlcnNhbC4gQWxsb3dzIGF2b2lkaW5nIGJpbmRpbmcgY2FsbGJhY2tzLlxuICpcbiAqIEBjb25zdHJ1Y3RvciBGb3JFYWNoQm9va0tlZXBpbmdcbiAqIEBwYXJhbSB7IWZ1bmN0aW9ufSBmb3JFYWNoRnVuY3Rpb24gRnVuY3Rpb24gdG8gcGVyZm9ybSB0cmF2ZXJzYWwgd2l0aC5cbiAqIEBwYXJhbSB7Pyp9IGZvckVhY2hDb250ZXh0IENvbnRleHQgdG8gcGVyZm9ybSBjb250ZXh0IHdpdGguXG4gKi9cbmZ1bmN0aW9uIEZvckVhY2hCb29rS2VlcGluZyhmb3JFYWNoRnVuY3Rpb24sIGZvckVhY2hDb250ZXh0KSB7XG4gIHRoaXMuZnVuYyA9IGZvckVhY2hGdW5jdGlvbjtcbiAgdGhpcy5jb250ZXh0ID0gZm9yRWFjaENvbnRleHQ7XG4gIHRoaXMuY291bnQgPSAwO1xufVxuRm9yRWFjaEJvb2tLZWVwaW5nLnByb3RvdHlwZS5kZXN0cnVjdG9yID0gZnVuY3Rpb24gKCkge1xuICB0aGlzLmZ1bmMgPSBudWxsO1xuICB0aGlzLmNvbnRleHQgPSBudWxsO1xuICB0aGlzLmNvdW50ID0gMDtcbn07XG5Qb29sZWRDbGFzcy5hZGRQb29saW5nVG8oRm9yRWFjaEJvb2tLZWVwaW5nLCB0d29Bcmd1bWVudFBvb2xlcik7XG5cbmZ1bmN0aW9uIGZvckVhY2hTaW5nbGVDaGlsZChib29rS2VlcGluZywgY2hpbGQsIG5hbWUpIHtcbiAgdmFyIGZ1bmMgPSBib29rS2VlcGluZy5mdW5jLFxuICAgICAgY29udGV4dCA9IGJvb2tLZWVwaW5nLmNvbnRleHQ7XG5cbiAgZnVuYy5jYWxsKGNvbnRleHQsIGNoaWxkLCBib29rS2VlcGluZy5jb3VudCsrKTtcbn1cblxuLyoqXG4gKiBJdGVyYXRlcyB0aHJvdWdoIGNoaWxkcmVuIHRoYXQgYXJlIHR5cGljYWxseSBzcGVjaWZpZWQgYXMgYHByb3BzLmNoaWxkcmVuYC5cbiAqXG4gKiBTZWUgaHR0cHM6Ly9mYWNlYm9vay5naXRodWIuaW8vcmVhY3QvZG9jcy90b3AtbGV2ZWwtYXBpLmh0bWwjcmVhY3QuY2hpbGRyZW4uZm9yZWFjaFxuICpcbiAqIFRoZSBwcm92aWRlZCBmb3JFYWNoRnVuYyhjaGlsZCwgaW5kZXgpIHdpbGwgYmUgY2FsbGVkIGZvciBlYWNoXG4gKiBsZWFmIGNoaWxkLlxuICpcbiAqIEBwYXJhbSB7Pyp9IGNoaWxkcmVuIENoaWxkcmVuIHRyZWUgY29udGFpbmVyLlxuICogQHBhcmFtIHtmdW5jdGlvbigqLCBpbnQpfSBmb3JFYWNoRnVuY1xuICogQHBhcmFtIHsqfSBmb3JFYWNoQ29udGV4dCBDb250ZXh0IGZvciBmb3JFYWNoQ29udGV4dC5cbiAqL1xuZnVuY3Rpb24gZm9yRWFjaENoaWxkcmVuKGNoaWxkcmVuLCBmb3JFYWNoRnVuYywgZm9yRWFjaENvbnRleHQpIHtcbiAgaWYgKGNoaWxkcmVuID09IG51bGwpIHtcbiAgICByZXR1cm4gY2hpbGRyZW47XG4gIH1cbiAgdmFyIHRyYXZlcnNlQ29udGV4dCA9IEZvckVhY2hCb29rS2VlcGluZy5nZXRQb29sZWQoZm9yRWFjaEZ1bmMsIGZvckVhY2hDb250ZXh0KTtcbiAgdHJhdmVyc2VBbGxDaGlsZHJlbihjaGlsZHJlbiwgZm9yRWFjaFNpbmdsZUNoaWxkLCB0cmF2ZXJzZUNvbnRleHQpO1xuICBGb3JFYWNoQm9va0tlZXBpbmcucmVsZWFzZSh0cmF2ZXJzZUNvbnRleHQpO1xufVxuXG4vKipcbiAqIFBvb2xlZENsYXNzIHJlcHJlc2VudGluZyB0aGUgYm9va2tlZXBpbmcgYXNzb2NpYXRlZCB3aXRoIHBlcmZvcm1pbmcgYSBjaGlsZFxuICogbWFwcGluZy4gQWxsb3dzIGF2b2lkaW5nIGJpbmRpbmcgY2FsbGJhY2tzLlxuICpcbiAqIEBjb25zdHJ1Y3RvciBNYXBCb29rS2VlcGluZ1xuICogQHBhcmFtIHshKn0gbWFwUmVzdWx0IE9iamVjdCBjb250YWluaW5nIHRoZSBvcmRlcmVkIG1hcCBvZiByZXN1bHRzLlxuICogQHBhcmFtIHshZnVuY3Rpb259IG1hcEZ1bmN0aW9uIEZ1bmN0aW9uIHRvIHBlcmZvcm0gbWFwcGluZyB3aXRoLlxuICogQHBhcmFtIHs/Kn0gbWFwQ29udGV4dCBDb250ZXh0IHRvIHBlcmZvcm0gbWFwcGluZyB3aXRoLlxuICovXG5mdW5jdGlvbiBNYXBCb29rS2VlcGluZyhtYXBSZXN1bHQsIGtleVByZWZpeCwgbWFwRnVuY3Rpb24sIG1hcENvbnRleHQpIHtcbiAgdGhpcy5yZXN1bHQgPSBtYXBSZXN1bHQ7XG4gIHRoaXMua2V5UHJlZml4ID0ga2V5UHJlZml4O1xuICB0aGlzLmZ1bmMgPSBtYXBGdW5jdGlvbjtcbiAgdGhpcy5jb250ZXh0ID0gbWFwQ29udGV4dDtcbiAgdGhpcy5jb3VudCA9IDA7XG59XG5NYXBCb29rS2VlcGluZy5wcm90b3R5cGUuZGVzdHJ1Y3RvciA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5yZXN1bHQgPSBudWxsO1xuICB0aGlzLmtleVByZWZpeCA9IG51bGw7XG4gIHRoaXMuZnVuYyA9IG51bGw7XG4gIHRoaXMuY29udGV4dCA9IG51bGw7XG4gIHRoaXMuY291bnQgPSAwO1xufTtcblBvb2xlZENsYXNzLmFkZFBvb2xpbmdUbyhNYXBCb29rS2VlcGluZywgZm91ckFyZ3VtZW50UG9vbGVyKTtcblxuZnVuY3Rpb24gbWFwU2luZ2xlQ2hpbGRJbnRvQ29udGV4dChib29rS2VlcGluZywgY2hpbGQsIGNoaWxkS2V5KSB7XG4gIHZhciByZXN1bHQgPSBib29rS2VlcGluZy5yZXN1bHQsXG4gICAgICBrZXlQcmVmaXggPSBib29rS2VlcGluZy5rZXlQcmVmaXgsXG4gICAgICBmdW5jID0gYm9va0tlZXBpbmcuZnVuYyxcbiAgICAgIGNvbnRleHQgPSBib29rS2VlcGluZy5jb250ZXh0O1xuXG5cbiAgdmFyIG1hcHBlZENoaWxkID0gZnVuYy5jYWxsKGNvbnRleHQsIGNoaWxkLCBib29rS2VlcGluZy5jb3VudCsrKTtcbiAgaWYgKEFycmF5LmlzQXJyYXkobWFwcGVkQ2hpbGQpKSB7XG4gICAgbWFwSW50b1dpdGhLZXlQcmVmaXhJbnRlcm5hbChtYXBwZWRDaGlsZCwgcmVzdWx0LCBjaGlsZEtleSwgZW1wdHlGdW5jdGlvbi50aGF0UmV0dXJuc0FyZ3VtZW50KTtcbiAgfSBlbHNlIGlmIChtYXBwZWRDaGlsZCAhPSBudWxsKSB7XG4gICAgaWYgKFJlYWN0RWxlbWVudC5pc1ZhbGlkRWxlbWVudChtYXBwZWRDaGlsZCkpIHtcbiAgICAgIG1hcHBlZENoaWxkID0gUmVhY3RFbGVtZW50LmNsb25lQW5kUmVwbGFjZUtleShtYXBwZWRDaGlsZCxcbiAgICAgIC8vIEtlZXAgYm90aCB0aGUgKG1hcHBlZCkgYW5kIG9sZCBrZXlzIGlmIHRoZXkgZGlmZmVyLCBqdXN0IGFzXG4gICAgICAvLyB0cmF2ZXJzZUFsbENoaWxkcmVuIHVzZWQgdG8gZG8gZm9yIG9iamVjdHMgYXMgY2hpbGRyZW5cbiAgICAgIGtleVByZWZpeCArIChtYXBwZWRDaGlsZC5rZXkgJiYgKCFjaGlsZCB8fCBjaGlsZC5rZXkgIT09IG1hcHBlZENoaWxkLmtleSkgPyBlc2NhcGVVc2VyUHJvdmlkZWRLZXkobWFwcGVkQ2hpbGQua2V5KSArICcvJyA6ICcnKSArIGNoaWxkS2V5KTtcbiAgICB9XG4gICAgcmVzdWx0LnB1c2gobWFwcGVkQ2hpbGQpO1xuICB9XG59XG5cbmZ1bmN0aW9uIG1hcEludG9XaXRoS2V5UHJlZml4SW50ZXJuYWwoY2hpbGRyZW4sIGFycmF5LCBwcmVmaXgsIGZ1bmMsIGNvbnRleHQpIHtcbiAgdmFyIGVzY2FwZWRQcmVmaXggPSAnJztcbiAgaWYgKHByZWZpeCAhPSBudWxsKSB7XG4gICAgZXNjYXBlZFByZWZpeCA9IGVzY2FwZVVzZXJQcm92aWRlZEtleShwcmVmaXgpICsgJy8nO1xuICB9XG4gIHZhciB0cmF2ZXJzZUNvbnRleHQgPSBNYXBCb29rS2VlcGluZy5nZXRQb29sZWQoYXJyYXksIGVzY2FwZWRQcmVmaXgsIGZ1bmMsIGNvbnRleHQpO1xuICB0cmF2ZXJzZUFsbENoaWxkcmVuKGNoaWxkcmVuLCBtYXBTaW5nbGVDaGlsZEludG9Db250ZXh0LCB0cmF2ZXJzZUNvbnRleHQpO1xuICBNYXBCb29rS2VlcGluZy5yZWxlYXNlKHRyYXZlcnNlQ29udGV4dCk7XG59XG5cbi8qKlxuICogTWFwcyBjaGlsZHJlbiB0aGF0IGFyZSB0eXBpY2FsbHkgc3BlY2lmaWVkIGFzIGBwcm9wcy5jaGlsZHJlbmAuXG4gKlxuICogU2VlIGh0dHBzOi8vZmFjZWJvb2suZ2l0aHViLmlvL3JlYWN0L2RvY3MvdG9wLWxldmVsLWFwaS5odG1sI3JlYWN0LmNoaWxkcmVuLm1hcFxuICpcbiAqIFRoZSBwcm92aWRlZCBtYXBGdW5jdGlvbihjaGlsZCwga2V5LCBpbmRleCkgd2lsbCBiZSBjYWxsZWQgZm9yIGVhY2hcbiAqIGxlYWYgY2hpbGQuXG4gKlxuICogQHBhcmFtIHs/Kn0gY2hpbGRyZW4gQ2hpbGRyZW4gdHJlZSBjb250YWluZXIuXG4gKiBAcGFyYW0ge2Z1bmN0aW9uKCosIGludCl9IGZ1bmMgVGhlIG1hcCBmdW5jdGlvbi5cbiAqIEBwYXJhbSB7Kn0gY29udGV4dCBDb250ZXh0IGZvciBtYXBGdW5jdGlvbi5cbiAqIEByZXR1cm4ge29iamVjdH0gT2JqZWN0IGNvbnRhaW5pbmcgdGhlIG9yZGVyZWQgbWFwIG9mIHJlc3VsdHMuXG4gKi9cbmZ1bmN0aW9uIG1hcENoaWxkcmVuKGNoaWxkcmVuLCBmdW5jLCBjb250ZXh0KSB7XG4gIGlmIChjaGlsZHJlbiA9PSBudWxsKSB7XG4gICAgcmV0dXJuIGNoaWxkcmVuO1xuICB9XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgbWFwSW50b1dpdGhLZXlQcmVmaXhJbnRlcm5hbChjaGlsZHJlbiwgcmVzdWx0LCBudWxsLCBmdW5jLCBjb250ZXh0KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gZm9yRWFjaFNpbmdsZUNoaWxkRHVtbXkodHJhdmVyc2VDb250ZXh0LCBjaGlsZCwgbmFtZSkge1xuICByZXR1cm4gbnVsbDtcbn1cblxuLyoqXG4gKiBDb3VudCB0aGUgbnVtYmVyIG9mIGNoaWxkcmVuIHRoYXQgYXJlIHR5cGljYWxseSBzcGVjaWZpZWQgYXNcbiAqIGBwcm9wcy5jaGlsZHJlbmAuXG4gKlxuICogU2VlIGh0dHBzOi8vZmFjZWJvb2suZ2l0aHViLmlvL3JlYWN0L2RvY3MvdG9wLWxldmVsLWFwaS5odG1sI3JlYWN0LmNoaWxkcmVuLmNvdW50XG4gKlxuICogQHBhcmFtIHs/Kn0gY2hpbGRyZW4gQ2hpbGRyZW4gdHJlZSBjb250YWluZXIuXG4gKiBAcmV0dXJuIHtudW1iZXJ9IFRoZSBudW1iZXIgb2YgY2hpbGRyZW4uXG4gKi9cbmZ1bmN0aW9uIGNvdW50Q2hpbGRyZW4oY2hpbGRyZW4sIGNvbnRleHQpIHtcbiAgcmV0dXJuIHRyYXZlcnNlQWxsQ2hpbGRyZW4oY2hpbGRyZW4sIGZvckVhY2hTaW5nbGVDaGlsZER1bW15LCBudWxsKTtcbn1cblxuLyoqXG4gKiBGbGF0dGVuIGEgY2hpbGRyZW4gb2JqZWN0ICh0eXBpY2FsbHkgc3BlY2lmaWVkIGFzIGBwcm9wcy5jaGlsZHJlbmApIGFuZFxuICogcmV0dXJuIGFuIGFycmF5IHdpdGggYXBwcm9wcmlhdGVseSByZS1rZXllZCBjaGlsZHJlbi5cbiAqXG4gKiBTZWUgaHR0cHM6Ly9mYWNlYm9vay5naXRodWIuaW8vcmVhY3QvZG9jcy90b3AtbGV2ZWwtYXBpLmh0bWwjcmVhY3QuY2hpbGRyZW4udG9hcnJheVxuICovXG5mdW5jdGlvbiB0b0FycmF5KGNoaWxkcmVuKSB7XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgbWFwSW50b1dpdGhLZXlQcmVmaXhJbnRlcm5hbChjaGlsZHJlbiwgcmVzdWx0LCBudWxsLCBlbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zQXJndW1lbnQpO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG52YXIgUmVhY3RDaGlsZHJlbiA9IHtcbiAgZm9yRWFjaDogZm9yRWFjaENoaWxkcmVuLFxuICBtYXA6IG1hcENoaWxkcmVuLFxuICBtYXBJbnRvV2l0aEtleVByZWZpeEludGVybmFsOiBtYXBJbnRvV2l0aEtleVByZWZpeEludGVybmFsLFxuICBjb3VudDogY291bnRDaGlsZHJlbixcbiAgdG9BcnJheTogdG9BcnJheVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdENoaWxkcmVuOyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBfcHJvZEludmFyaWFudCA9IHJlcXVpcmUoJy4vcmVhY3RQcm9kSW52YXJpYW50JyksXG4gICAgX2Fzc2lnbiA9IHJlcXVpcmUoJ29iamVjdC1hc3NpZ24nKTtcblxudmFyIFJlYWN0Q29tcG9uZW50ID0gcmVxdWlyZSgnLi9SZWFjdENvbXBvbmVudCcpO1xudmFyIFJlYWN0RWxlbWVudCA9IHJlcXVpcmUoJy4vUmVhY3RFbGVtZW50Jyk7XG52YXIgUmVhY3RQcm9wVHlwZUxvY2F0aW9uTmFtZXMgPSByZXF1aXJlKCcuL1JlYWN0UHJvcFR5cGVMb2NhdGlvbk5hbWVzJyk7XG52YXIgUmVhY3ROb29wVXBkYXRlUXVldWUgPSByZXF1aXJlKCcuL1JlYWN0Tm9vcFVwZGF0ZVF1ZXVlJyk7XG5cbnZhciBlbXB0eU9iamVjdCA9IHJlcXVpcmUoJ2ZianMvbGliL2VtcHR5T2JqZWN0Jyk7XG52YXIgaW52YXJpYW50ID0gcmVxdWlyZSgnZmJqcy9saWIvaW52YXJpYW50Jyk7XG52YXIgd2FybmluZyA9IHJlcXVpcmUoJ2ZianMvbGliL3dhcm5pbmcnKTtcblxudmFyIE1JWElOU19LRVkgPSAnbWl4aW5zJztcblxuLy8gSGVscGVyIGZ1bmN0aW9uIHRvIGFsbG93IHRoZSBjcmVhdGlvbiBvZiBhbm9ueW1vdXMgZnVuY3Rpb25zIHdoaWNoIGRvIG5vdFxuLy8gaGF2ZSAubmFtZSBzZXQgdG8gdGhlIG5hbWUgb2YgdGhlIHZhcmlhYmxlIGJlaW5nIGFzc2lnbmVkIHRvLlxuZnVuY3Rpb24gaWRlbnRpdHkoZm4pIHtcbiAgcmV0dXJuIGZuO1xufVxuXG4vKipcbiAqIFBvbGljaWVzIHRoYXQgZGVzY3JpYmUgbWV0aG9kcyBpbiBgUmVhY3RDbGFzc0ludGVyZmFjZWAuXG4gKi9cblxuXG52YXIgaW5qZWN0ZWRNaXhpbnMgPSBbXTtcblxuLyoqXG4gKiBDb21wb3NpdGUgY29tcG9uZW50cyBhcmUgaGlnaGVyLWxldmVsIGNvbXBvbmVudHMgdGhhdCBjb21wb3NlIG90aGVyIGNvbXBvc2l0ZVxuICogb3IgaG9zdCBjb21wb25lbnRzLlxuICpcbiAqIFRvIGNyZWF0ZSBhIG5ldyB0eXBlIG9mIGBSZWFjdENsYXNzYCwgcGFzcyBhIHNwZWNpZmljYXRpb24gb2ZcbiAqIHlvdXIgbmV3IGNsYXNzIHRvIGBSZWFjdC5jcmVhdGVDbGFzc2AuIFRoZSBvbmx5IHJlcXVpcmVtZW50IG9mIHlvdXIgY2xhc3NcbiAqIHNwZWNpZmljYXRpb24gaXMgdGhhdCB5b3UgaW1wbGVtZW50IGEgYHJlbmRlcmAgbWV0aG9kLlxuICpcbiAqICAgdmFyIE15Q29tcG9uZW50ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICogICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gKiAgICAgICByZXR1cm4gPGRpdj5IZWxsbyBXb3JsZDwvZGl2PjtcbiAqICAgICB9XG4gKiAgIH0pO1xuICpcbiAqIFRoZSBjbGFzcyBzcGVjaWZpY2F0aW9uIHN1cHBvcnRzIGEgc3BlY2lmaWMgcHJvdG9jb2wgb2YgbWV0aG9kcyB0aGF0IGhhdmVcbiAqIHNwZWNpYWwgbWVhbmluZyAoZS5nLiBgcmVuZGVyYCkuIFNlZSBgUmVhY3RDbGFzc0ludGVyZmFjZWAgZm9yXG4gKiBtb3JlIHRoZSBjb21wcmVoZW5zaXZlIHByb3RvY29sLiBBbnkgb3RoZXIgcHJvcGVydGllcyBhbmQgbWV0aG9kcyBpbiB0aGVcbiAqIGNsYXNzIHNwZWNpZmljYXRpb24gd2lsbCBiZSBhdmFpbGFibGUgb24gdGhlIHByb3RvdHlwZS5cbiAqXG4gKiBAaW50ZXJmYWNlIFJlYWN0Q2xhc3NJbnRlcmZhY2VcbiAqIEBpbnRlcm5hbFxuICovXG52YXIgUmVhY3RDbGFzc0ludGVyZmFjZSA9IHtcblxuICAvKipcbiAgICogQW4gYXJyYXkgb2YgTWl4aW4gb2JqZWN0cyB0byBpbmNsdWRlIHdoZW4gZGVmaW5pbmcgeW91ciBjb21wb25lbnQuXG4gICAqXG4gICAqIEB0eXBlIHthcnJheX1cbiAgICogQG9wdGlvbmFsXG4gICAqL1xuICBtaXhpbnM6ICdERUZJTkVfTUFOWScsXG5cbiAgLyoqXG4gICAqIEFuIG9iamVjdCBjb250YWluaW5nIHByb3BlcnRpZXMgYW5kIG1ldGhvZHMgdGhhdCBzaG91bGQgYmUgZGVmaW5lZCBvblxuICAgKiB0aGUgY29tcG9uZW50J3MgY29uc3RydWN0b3IgaW5zdGVhZCBvZiBpdHMgcHJvdG90eXBlIChzdGF0aWMgbWV0aG9kcykuXG4gICAqXG4gICAqIEB0eXBlIHtvYmplY3R9XG4gICAqIEBvcHRpb25hbFxuICAgKi9cbiAgc3RhdGljczogJ0RFRklORV9NQU5ZJyxcblxuICAvKipcbiAgICogRGVmaW5pdGlvbiBvZiBwcm9wIHR5cGVzIGZvciB0aGlzIGNvbXBvbmVudC5cbiAgICpcbiAgICogQHR5cGUge29iamVjdH1cbiAgICogQG9wdGlvbmFsXG4gICAqL1xuICBwcm9wVHlwZXM6ICdERUZJTkVfTUFOWScsXG5cbiAgLyoqXG4gICAqIERlZmluaXRpb24gb2YgY29udGV4dCB0eXBlcyBmb3IgdGhpcyBjb21wb25lbnQuXG4gICAqXG4gICAqIEB0eXBlIHtvYmplY3R9XG4gICAqIEBvcHRpb25hbFxuICAgKi9cbiAgY29udGV4dFR5cGVzOiAnREVGSU5FX01BTlknLFxuXG4gIC8qKlxuICAgKiBEZWZpbml0aW9uIG9mIGNvbnRleHQgdHlwZXMgdGhpcyBjb21wb25lbnQgc2V0cyBmb3IgaXRzIGNoaWxkcmVuLlxuICAgKlxuICAgKiBAdHlwZSB7b2JqZWN0fVxuICAgKiBAb3B0aW9uYWxcbiAgICovXG4gIGNoaWxkQ29udGV4dFR5cGVzOiAnREVGSU5FX01BTlknLFxuXG4gIC8vID09PT0gRGVmaW5pdGlvbiBtZXRob2RzID09PT1cblxuICAvKipcbiAgICogSW52b2tlZCB3aGVuIHRoZSBjb21wb25lbnQgaXMgbW91bnRlZC4gVmFsdWVzIGluIHRoZSBtYXBwaW5nIHdpbGwgYmUgc2V0IG9uXG4gICAqIGB0aGlzLnByb3BzYCBpZiB0aGF0IHByb3AgaXMgbm90IHNwZWNpZmllZCAoaS5lLiB1c2luZyBhbiBgaW5gIGNoZWNrKS5cbiAgICpcbiAgICogVGhpcyBtZXRob2QgaXMgaW52b2tlZCBiZWZvcmUgYGdldEluaXRpYWxTdGF0ZWAgYW5kIHRoZXJlZm9yZSBjYW5ub3QgcmVseVxuICAgKiBvbiBgdGhpcy5zdGF0ZWAgb3IgdXNlIGB0aGlzLnNldFN0YXRlYC5cbiAgICpcbiAgICogQHJldHVybiB7b2JqZWN0fVxuICAgKiBAb3B0aW9uYWxcbiAgICovXG4gIGdldERlZmF1bHRQcm9wczogJ0RFRklORV9NQU5ZX01FUkdFRCcsXG5cbiAgLyoqXG4gICAqIEludm9rZWQgb25jZSBiZWZvcmUgdGhlIGNvbXBvbmVudCBpcyBtb3VudGVkLiBUaGUgcmV0dXJuIHZhbHVlIHdpbGwgYmUgdXNlZFxuICAgKiBhcyB0aGUgaW5pdGlhbCB2YWx1ZSBvZiBgdGhpcy5zdGF0ZWAuXG4gICAqXG4gICAqICAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcbiAgICogICAgIHJldHVybiB7XG4gICAqICAgICAgIGlzT246IGZhbHNlLFxuICAgKiAgICAgICBmb29CYXo6IG5ldyBCYXpGb28oKVxuICAgKiAgICAgfVxuICAgKiAgIH1cbiAgICpcbiAgICogQHJldHVybiB7b2JqZWN0fVxuICAgKiBAb3B0aW9uYWxcbiAgICovXG4gIGdldEluaXRpYWxTdGF0ZTogJ0RFRklORV9NQU5ZX01FUkdFRCcsXG5cbiAgLyoqXG4gICAqIEByZXR1cm4ge29iamVjdH1cbiAgICogQG9wdGlvbmFsXG4gICAqL1xuICBnZXRDaGlsZENvbnRleHQ6ICdERUZJTkVfTUFOWV9NRVJHRUQnLFxuXG4gIC8qKlxuICAgKiBVc2VzIHByb3BzIGZyb20gYHRoaXMucHJvcHNgIGFuZCBzdGF0ZSBmcm9tIGB0aGlzLnN0YXRlYCB0byByZW5kZXIgdGhlXG4gICAqIHN0cnVjdHVyZSBvZiB0aGUgY29tcG9uZW50LlxuICAgKlxuICAgKiBObyBndWFyYW50ZWVzIGFyZSBtYWRlIGFib3V0IHdoZW4gb3IgaG93IG9mdGVuIHRoaXMgbWV0aG9kIGlzIGludm9rZWQsIHNvXG4gICAqIGl0IG11c3Qgbm90IGhhdmUgc2lkZSBlZmZlY3RzLlxuICAgKlxuICAgKiAgIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAqICAgICB2YXIgbmFtZSA9IHRoaXMucHJvcHMubmFtZTtcbiAgICogICAgIHJldHVybiA8ZGl2PkhlbGxvLCB7bmFtZX0hPC9kaXY+O1xuICAgKiAgIH1cbiAgICpcbiAgICogQHJldHVybiB7UmVhY3RDb21wb25lbnR9XG4gICAqIEBub3NpZGVlZmZlY3RzXG4gICAqIEByZXF1aXJlZFxuICAgKi9cbiAgcmVuZGVyOiAnREVGSU5FX09OQ0UnLFxuXG4gIC8vID09PT0gRGVsZWdhdGUgbWV0aG9kcyA9PT09XG5cbiAgLyoqXG4gICAqIEludm9rZWQgd2hlbiB0aGUgY29tcG9uZW50IGlzIGluaXRpYWxseSBjcmVhdGVkIGFuZCBhYm91dCB0byBiZSBtb3VudGVkLlxuICAgKiBUaGlzIG1heSBoYXZlIHNpZGUgZWZmZWN0cywgYnV0IGFueSBleHRlcm5hbCBzdWJzY3JpcHRpb25zIG9yIGRhdGEgY3JlYXRlZFxuICAgKiBieSB0aGlzIG1ldGhvZCBtdXN0IGJlIGNsZWFuZWQgdXAgaW4gYGNvbXBvbmVudFdpbGxVbm1vdW50YC5cbiAgICpcbiAgICogQG9wdGlvbmFsXG4gICAqL1xuICBjb21wb25lbnRXaWxsTW91bnQ6ICdERUZJTkVfTUFOWScsXG5cbiAgLyoqXG4gICAqIEludm9rZWQgd2hlbiB0aGUgY29tcG9uZW50IGhhcyBiZWVuIG1vdW50ZWQgYW5kIGhhcyBhIERPTSByZXByZXNlbnRhdGlvbi5cbiAgICogSG93ZXZlciwgdGhlcmUgaXMgbm8gZ3VhcmFudGVlIHRoYXQgdGhlIERPTSBub2RlIGlzIGluIHRoZSBkb2N1bWVudC5cbiAgICpcbiAgICogVXNlIHRoaXMgYXMgYW4gb3Bwb3J0dW5pdHkgdG8gb3BlcmF0ZSBvbiB0aGUgRE9NIHdoZW4gdGhlIGNvbXBvbmVudCBoYXNcbiAgICogYmVlbiBtb3VudGVkIChpbml0aWFsaXplZCBhbmQgcmVuZGVyZWQpIGZvciB0aGUgZmlyc3QgdGltZS5cbiAgICpcbiAgICogQHBhcmFtIHtET01FbGVtZW50fSByb290Tm9kZSBET00gZWxlbWVudCByZXByZXNlbnRpbmcgdGhlIGNvbXBvbmVudC5cbiAgICogQG9wdGlvbmFsXG4gICAqL1xuICBjb21wb25lbnREaWRNb3VudDogJ0RFRklORV9NQU5ZJyxcblxuICAvKipcbiAgICogSW52b2tlZCBiZWZvcmUgdGhlIGNvbXBvbmVudCByZWNlaXZlcyBuZXcgcHJvcHMuXG4gICAqXG4gICAqIFVzZSB0aGlzIGFzIGFuIG9wcG9ydHVuaXR5IHRvIHJlYWN0IHRvIGEgcHJvcCB0cmFuc2l0aW9uIGJ5IHVwZGF0aW5nIHRoZVxuICAgKiBzdGF0ZSB1c2luZyBgdGhpcy5zZXRTdGF0ZWAuIEN1cnJlbnQgcHJvcHMgYXJlIGFjY2Vzc2VkIHZpYSBgdGhpcy5wcm9wc2AuXG4gICAqXG4gICAqICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wczogZnVuY3Rpb24obmV4dFByb3BzLCBuZXh0Q29udGV4dCkge1xuICAgKiAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAqICAgICAgIGxpa2VzSW5jcmVhc2luZzogbmV4dFByb3BzLmxpa2VDb3VudCA+IHRoaXMucHJvcHMubGlrZUNvdW50XG4gICAqICAgICB9KTtcbiAgICogICB9XG4gICAqXG4gICAqIE5PVEU6IFRoZXJlIGlzIG5vIGVxdWl2YWxlbnQgYGNvbXBvbmVudFdpbGxSZWNlaXZlU3RhdGVgLiBBbiBpbmNvbWluZyBwcm9wXG4gICAqIHRyYW5zaXRpb24gbWF5IGNhdXNlIGEgc3RhdGUgY2hhbmdlLCBidXQgdGhlIG9wcG9zaXRlIGlzIG5vdCB0cnVlLiBJZiB5b3VcbiAgICogbmVlZCBpdCwgeW91IGFyZSBwcm9iYWJseSBsb29raW5nIGZvciBgY29tcG9uZW50V2lsbFVwZGF0ZWAuXG4gICAqXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBuZXh0UHJvcHNcbiAgICogQG9wdGlvbmFsXG4gICAqL1xuICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzOiAnREVGSU5FX01BTlknLFxuXG4gIC8qKlxuICAgKiBJbnZva2VkIHdoaWxlIGRlY2lkaW5nIGlmIHRoZSBjb21wb25lbnQgc2hvdWxkIGJlIHVwZGF0ZWQgYXMgYSByZXN1bHQgb2ZcbiAgICogcmVjZWl2aW5nIG5ldyBwcm9wcywgc3RhdGUgYW5kL29yIGNvbnRleHQuXG4gICAqXG4gICAqIFVzZSB0aGlzIGFzIGFuIG9wcG9ydHVuaXR5IHRvIGByZXR1cm4gZmFsc2VgIHdoZW4geW91J3JlIGNlcnRhaW4gdGhhdCB0aGVcbiAgICogdHJhbnNpdGlvbiB0byB0aGUgbmV3IHByb3BzL3N0YXRlL2NvbnRleHQgd2lsbCBub3QgcmVxdWlyZSBhIGNvbXBvbmVudFxuICAgKiB1cGRhdGUuXG4gICAqXG4gICAqICAgc2hvdWxkQ29tcG9uZW50VXBkYXRlOiBmdW5jdGlvbihuZXh0UHJvcHMsIG5leHRTdGF0ZSwgbmV4dENvbnRleHQpIHtcbiAgICogICAgIHJldHVybiAhZXF1YWwobmV4dFByb3BzLCB0aGlzLnByb3BzKSB8fFxuICAgKiAgICAgICAhZXF1YWwobmV4dFN0YXRlLCB0aGlzLnN0YXRlKSB8fFxuICAgKiAgICAgICAhZXF1YWwobmV4dENvbnRleHQsIHRoaXMuY29udGV4dCk7XG4gICAqICAgfVxuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdH0gbmV4dFByb3BzXG4gICAqIEBwYXJhbSB7P29iamVjdH0gbmV4dFN0YXRlXG4gICAqIEBwYXJhbSB7P29iamVjdH0gbmV4dENvbnRleHRcbiAgICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgY29tcG9uZW50IHNob3VsZCB1cGRhdGUuXG4gICAqIEBvcHRpb25hbFxuICAgKi9cbiAgc2hvdWxkQ29tcG9uZW50VXBkYXRlOiAnREVGSU5FX09OQ0UnLFxuXG4gIC8qKlxuICAgKiBJbnZva2VkIHdoZW4gdGhlIGNvbXBvbmVudCBpcyBhYm91dCB0byB1cGRhdGUgZHVlIHRvIGEgdHJhbnNpdGlvbiBmcm9tXG4gICAqIGB0aGlzLnByb3BzYCwgYHRoaXMuc3RhdGVgIGFuZCBgdGhpcy5jb250ZXh0YCB0byBgbmV4dFByb3BzYCwgYG5leHRTdGF0ZWBcbiAgICogYW5kIGBuZXh0Q29udGV4dGAuXG4gICAqXG4gICAqIFVzZSB0aGlzIGFzIGFuIG9wcG9ydHVuaXR5IHRvIHBlcmZvcm0gcHJlcGFyYXRpb24gYmVmb3JlIGFuIHVwZGF0ZSBvY2N1cnMuXG4gICAqXG4gICAqIE5PVEU6IFlvdSAqKmNhbm5vdCoqIHVzZSBgdGhpcy5zZXRTdGF0ZSgpYCBpbiB0aGlzIG1ldGhvZC5cbiAgICpcbiAgICogQHBhcmFtIHtvYmplY3R9IG5leHRQcm9wc1xuICAgKiBAcGFyYW0gez9vYmplY3R9IG5leHRTdGF0ZVxuICAgKiBAcGFyYW0gez9vYmplY3R9IG5leHRDb250ZXh0XG4gICAqIEBwYXJhbSB7UmVhY3RSZWNvbmNpbGVUcmFuc2FjdGlvbn0gdHJhbnNhY3Rpb25cbiAgICogQG9wdGlvbmFsXG4gICAqL1xuICBjb21wb25lbnRXaWxsVXBkYXRlOiAnREVGSU5FX01BTlknLFxuXG4gIC8qKlxuICAgKiBJbnZva2VkIHdoZW4gdGhlIGNvbXBvbmVudCdzIERPTSByZXByZXNlbnRhdGlvbiBoYXMgYmVlbiB1cGRhdGVkLlxuICAgKlxuICAgKiBVc2UgdGhpcyBhcyBhbiBvcHBvcnR1bml0eSB0byBvcGVyYXRlIG9uIHRoZSBET00gd2hlbiB0aGUgY29tcG9uZW50IGhhc1xuICAgKiBiZWVuIHVwZGF0ZWQuXG4gICAqXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBwcmV2UHJvcHNcbiAgICogQHBhcmFtIHs/b2JqZWN0fSBwcmV2U3RhdGVcbiAgICogQHBhcmFtIHs/b2JqZWN0fSBwcmV2Q29udGV4dFxuICAgKiBAcGFyYW0ge0RPTUVsZW1lbnR9IHJvb3ROb2RlIERPTSBlbGVtZW50IHJlcHJlc2VudGluZyB0aGUgY29tcG9uZW50LlxuICAgKiBAb3B0aW9uYWxcbiAgICovXG4gIGNvbXBvbmVudERpZFVwZGF0ZTogJ0RFRklORV9NQU5ZJyxcblxuICAvKipcbiAgICogSW52b2tlZCB3aGVuIHRoZSBjb21wb25lbnQgaXMgYWJvdXQgdG8gYmUgcmVtb3ZlZCBmcm9tIGl0cyBwYXJlbnQgYW5kIGhhdmVcbiAgICogaXRzIERPTSByZXByZXNlbnRhdGlvbiBkZXN0cm95ZWQuXG4gICAqXG4gICAqIFVzZSB0aGlzIGFzIGFuIG9wcG9ydHVuaXR5IHRvIGRlYWxsb2NhdGUgYW55IGV4dGVybmFsIHJlc291cmNlcy5cbiAgICpcbiAgICogTk9URTogVGhlcmUgaXMgbm8gYGNvbXBvbmVudERpZFVubW91bnRgIHNpbmNlIHlvdXIgY29tcG9uZW50IHdpbGwgaGF2ZSBiZWVuXG4gICAqIGRlc3Ryb3llZCBieSB0aGF0IHBvaW50LlxuICAgKlxuICAgKiBAb3B0aW9uYWxcbiAgICovXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50OiAnREVGSU5FX01BTlknLFxuXG4gIC8vID09PT0gQWR2YW5jZWQgbWV0aG9kcyA9PT09XG5cbiAgLyoqXG4gICAqIFVwZGF0ZXMgdGhlIGNvbXBvbmVudCdzIGN1cnJlbnRseSBtb3VudGVkIERPTSByZXByZXNlbnRhdGlvbi5cbiAgICpcbiAgICogQnkgZGVmYXVsdCwgdGhpcyBpbXBsZW1lbnRzIFJlYWN0J3MgcmVuZGVyaW5nIGFuZCByZWNvbmNpbGlhdGlvbiBhbGdvcml0aG0uXG4gICAqIFNvcGhpc3RpY2F0ZWQgY2xpZW50cyBtYXkgd2lzaCB0byBvdmVycmlkZSB0aGlzLlxuICAgKlxuICAgKiBAcGFyYW0ge1JlYWN0UmVjb25jaWxlVHJhbnNhY3Rpb259IHRyYW5zYWN0aW9uXG4gICAqIEBpbnRlcm5hbFxuICAgKiBAb3ZlcnJpZGFibGVcbiAgICovXG4gIHVwZGF0ZUNvbXBvbmVudDogJ09WRVJSSURFX0JBU0UnXG5cbn07XG5cbi8qKlxuICogTWFwcGluZyBmcm9tIGNsYXNzIHNwZWNpZmljYXRpb24ga2V5cyB0byBzcGVjaWFsIHByb2Nlc3NpbmcgZnVuY3Rpb25zLlxuICpcbiAqIEFsdGhvdWdoIHRoZXNlIGFyZSBkZWNsYXJlZCBsaWtlIGluc3RhbmNlIHByb3BlcnRpZXMgaW4gdGhlIHNwZWNpZmljYXRpb25cbiAqIHdoZW4gZGVmaW5pbmcgY2xhc3NlcyB1c2luZyBgUmVhY3QuY3JlYXRlQ2xhc3NgLCB0aGV5IGFyZSBhY3R1YWxseSBzdGF0aWNcbiAqIGFuZCBhcmUgYWNjZXNzaWJsZSBvbiB0aGUgY29uc3RydWN0b3IgaW5zdGVhZCBvZiB0aGUgcHJvdG90eXBlLiBEZXNwaXRlXG4gKiBiZWluZyBzdGF0aWMsIHRoZXkgbXVzdCBiZSBkZWZpbmVkIG91dHNpZGUgb2YgdGhlIFwic3RhdGljc1wiIGtleSB1bmRlclxuICogd2hpY2ggYWxsIG90aGVyIHN0YXRpYyBtZXRob2RzIGFyZSBkZWZpbmVkLlxuICovXG52YXIgUkVTRVJWRURfU1BFQ19LRVlTID0ge1xuICBkaXNwbGF5TmFtZTogZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBkaXNwbGF5TmFtZSkge1xuICAgIENvbnN0cnVjdG9yLmRpc3BsYXlOYW1lID0gZGlzcGxheU5hbWU7XG4gIH0sXG4gIG1peGluczogZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBtaXhpbnMpIHtcbiAgICBpZiAobWl4aW5zKSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG1peGlucy5sZW5ndGg7IGkrKykge1xuICAgICAgICBtaXhTcGVjSW50b0NvbXBvbmVudChDb25zdHJ1Y3RvciwgbWl4aW5zW2ldKTtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIGNoaWxkQ29udGV4dFR5cGVzOiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIGNoaWxkQ29udGV4dFR5cGVzKSB7XG4gICAgaWYgKFwiZGV2ZWxvcG1lbnRcIiAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICB2YWxpZGF0ZVR5cGVEZWYoQ29uc3RydWN0b3IsIGNoaWxkQ29udGV4dFR5cGVzLCAnY2hpbGRDb250ZXh0Jyk7XG4gICAgfVxuICAgIENvbnN0cnVjdG9yLmNoaWxkQ29udGV4dFR5cGVzID0gX2Fzc2lnbih7fSwgQ29uc3RydWN0b3IuY2hpbGRDb250ZXh0VHlwZXMsIGNoaWxkQ29udGV4dFR5cGVzKTtcbiAgfSxcbiAgY29udGV4dFR5cGVzOiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIGNvbnRleHRUeXBlcykge1xuICAgIGlmIChcImRldmVsb3BtZW50XCIgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgdmFsaWRhdGVUeXBlRGVmKENvbnN0cnVjdG9yLCBjb250ZXh0VHlwZXMsICdjb250ZXh0Jyk7XG4gICAgfVxuICAgIENvbnN0cnVjdG9yLmNvbnRleHRUeXBlcyA9IF9hc3NpZ24oe30sIENvbnN0cnVjdG9yLmNvbnRleHRUeXBlcywgY29udGV4dFR5cGVzKTtcbiAgfSxcbiAgLyoqXG4gICAqIFNwZWNpYWwgY2FzZSBnZXREZWZhdWx0UHJvcHMgd2hpY2ggc2hvdWxkIG1vdmUgaW50byBzdGF0aWNzIGJ1dCByZXF1aXJlc1xuICAgKiBhdXRvbWF0aWMgbWVyZ2luZy5cbiAgICovXG4gIGdldERlZmF1bHRQcm9wczogZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBnZXREZWZhdWx0UHJvcHMpIHtcbiAgICBpZiAoQ29uc3RydWN0b3IuZ2V0RGVmYXVsdFByb3BzKSB7XG4gICAgICBDb25zdHJ1Y3Rvci5nZXREZWZhdWx0UHJvcHMgPSBjcmVhdGVNZXJnZWRSZXN1bHRGdW5jdGlvbihDb25zdHJ1Y3Rvci5nZXREZWZhdWx0UHJvcHMsIGdldERlZmF1bHRQcm9wcyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIENvbnN0cnVjdG9yLmdldERlZmF1bHRQcm9wcyA9IGdldERlZmF1bHRQcm9wcztcbiAgICB9XG4gIH0sXG4gIHByb3BUeXBlczogZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm9wVHlwZXMpIHtcbiAgICBpZiAoXCJkZXZlbG9wbWVudFwiICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIHZhbGlkYXRlVHlwZURlZihDb25zdHJ1Y3RvciwgcHJvcFR5cGVzLCAncHJvcCcpO1xuICAgIH1cbiAgICBDb25zdHJ1Y3Rvci5wcm9wVHlwZXMgPSBfYXNzaWduKHt9LCBDb25zdHJ1Y3Rvci5wcm9wVHlwZXMsIHByb3BUeXBlcyk7XG4gIH0sXG4gIHN0YXRpY3M6IGZ1bmN0aW9uIChDb25zdHJ1Y3Rvciwgc3RhdGljcykge1xuICAgIG1peFN0YXRpY1NwZWNJbnRvQ29tcG9uZW50KENvbnN0cnVjdG9yLCBzdGF0aWNzKTtcbiAgfSxcbiAgYXV0b2JpbmQ6IGZ1bmN0aW9uICgpIHt9IH07XG5cbmZ1bmN0aW9uIHZhbGlkYXRlVHlwZURlZihDb25zdHJ1Y3RvciwgdHlwZURlZiwgbG9jYXRpb24pIHtcbiAgZm9yICh2YXIgcHJvcE5hbWUgaW4gdHlwZURlZikge1xuICAgIGlmICh0eXBlRGVmLmhhc093blByb3BlcnR5KHByb3BOYW1lKSkge1xuICAgICAgLy8gdXNlIGEgd2FybmluZyBpbnN0ZWFkIG9mIGFuIGludmFyaWFudCBzbyBjb21wb25lbnRzXG4gICAgICAvLyBkb24ndCBzaG93IHVwIGluIHByb2QgYnV0IG9ubHkgaW4gX19ERVZfX1xuICAgICAgXCJkZXZlbG9wbWVudFwiICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKHR5cGVvZiB0eXBlRGVmW3Byb3BOYW1lXSA9PT0gJ2Z1bmN0aW9uJywgJyVzOiAlcyB0eXBlIGAlc2AgaXMgaW52YWxpZDsgaXQgbXVzdCBiZSBhIGZ1bmN0aW9uLCB1c3VhbGx5IGZyb20gJyArICdSZWFjdC5Qcm9wVHlwZXMuJywgQ29uc3RydWN0b3IuZGlzcGxheU5hbWUgfHwgJ1JlYWN0Q2xhc3MnLCBSZWFjdFByb3BUeXBlTG9jYXRpb25OYW1lc1tsb2NhdGlvbl0sIHByb3BOYW1lKSA6IHZvaWQgMDtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gdmFsaWRhdGVNZXRob2RPdmVycmlkZShpc0FscmVhZHlEZWZpbmVkLCBuYW1lKSB7XG4gIHZhciBzcGVjUG9saWN5ID0gUmVhY3RDbGFzc0ludGVyZmFjZS5oYXNPd25Qcm9wZXJ0eShuYW1lKSA/IFJlYWN0Q2xhc3NJbnRlcmZhY2VbbmFtZV0gOiBudWxsO1xuXG4gIC8vIERpc2FsbG93IG92ZXJyaWRpbmcgb2YgYmFzZSBjbGFzcyBtZXRob2RzIHVubGVzcyBleHBsaWNpdGx5IGFsbG93ZWQuXG4gIGlmIChSZWFjdENsYXNzTWl4aW4uaGFzT3duUHJvcGVydHkobmFtZSkpIHtcbiAgICAhKHNwZWNQb2xpY3kgPT09ICdPVkVSUklERV9CQVNFJykgPyBcImRldmVsb3BtZW50XCIgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ1JlYWN0Q2xhc3NJbnRlcmZhY2U6IFlvdSBhcmUgYXR0ZW1wdGluZyB0byBvdmVycmlkZSBgJXNgIGZyb20geW91ciBjbGFzcyBzcGVjaWZpY2F0aW9uLiBFbnN1cmUgdGhhdCB5b3VyIG1ldGhvZCBuYW1lcyBkbyBub3Qgb3ZlcmxhcCB3aXRoIFJlYWN0IG1ldGhvZHMuJywgbmFtZSkgOiBfcHJvZEludmFyaWFudCgnNzMnLCBuYW1lKSA6IHZvaWQgMDtcbiAgfVxuXG4gIC8vIERpc2FsbG93IGRlZmluaW5nIG1ldGhvZHMgbW9yZSB0aGFuIG9uY2UgdW5sZXNzIGV4cGxpY2l0bHkgYWxsb3dlZC5cbiAgaWYgKGlzQWxyZWFkeURlZmluZWQpIHtcbiAgICAhKHNwZWNQb2xpY3kgPT09ICdERUZJTkVfTUFOWScgfHwgc3BlY1BvbGljeSA9PT0gJ0RFRklORV9NQU5ZX01FUkdFRCcpID8gXCJkZXZlbG9wbWVudFwiICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdSZWFjdENsYXNzSW50ZXJmYWNlOiBZb3UgYXJlIGF0dGVtcHRpbmcgdG8gZGVmaW5lIGAlc2Agb24geW91ciBjb21wb25lbnQgbW9yZSB0aGFuIG9uY2UuIFRoaXMgY29uZmxpY3QgbWF5IGJlIGR1ZSB0byBhIG1peGluLicsIG5hbWUpIDogX3Byb2RJbnZhcmlhbnQoJzc0JywgbmFtZSkgOiB2b2lkIDA7XG4gIH1cbn1cblxuLyoqXG4gKiBNaXhpbiBoZWxwZXIgd2hpY2ggaGFuZGxlcyBwb2xpY3kgdmFsaWRhdGlvbiBhbmQgcmVzZXJ2ZWRcbiAqIHNwZWNpZmljYXRpb24ga2V5cyB3aGVuIGJ1aWxkaW5nIFJlYWN0IGNsYXNzZXMuXG4gKi9cbmZ1bmN0aW9uIG1peFNwZWNJbnRvQ29tcG9uZW50KENvbnN0cnVjdG9yLCBzcGVjKSB7XG4gIGlmICghc3BlYykge1xuICAgIGlmIChcImRldmVsb3BtZW50XCIgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgdmFyIHR5cGVvZlNwZWMgPSB0eXBlb2Ygc3BlYztcbiAgICAgIHZhciBpc01peGluVmFsaWQgPSB0eXBlb2ZTcGVjID09PSAnb2JqZWN0JyAmJiBzcGVjICE9PSBudWxsO1xuXG4gICAgICBcImRldmVsb3BtZW50XCIgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoaXNNaXhpblZhbGlkLCAnJXM6IFlvdVxcJ3JlIGF0dGVtcHRpbmcgdG8gaW5jbHVkZSBhIG1peGluIHRoYXQgaXMgZWl0aGVyIG51bGwgJyArICdvciBub3QgYW4gb2JqZWN0LiBDaGVjayB0aGUgbWl4aW5zIGluY2x1ZGVkIGJ5IHRoZSBjb21wb25lbnQsICcgKyAnYXMgd2VsbCBhcyBhbnkgbWl4aW5zIHRoZXkgaW5jbHVkZSB0aGVtc2VsdmVzLiAnICsgJ0V4cGVjdGVkIG9iamVjdCBidXQgZ290ICVzLicsIENvbnN0cnVjdG9yLmRpc3BsYXlOYW1lIHx8ICdSZWFjdENsYXNzJywgc3BlYyA9PT0gbnVsbCA/IG51bGwgOiB0eXBlb2ZTcGVjKSA6IHZvaWQgMDtcbiAgICB9XG5cbiAgICByZXR1cm47XG4gIH1cblxuICAhKHR5cGVvZiBzcGVjICE9PSAnZnVuY3Rpb24nKSA/IFwiZGV2ZWxvcG1lbnRcIiAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnUmVhY3RDbGFzczogWW91XFwncmUgYXR0ZW1wdGluZyB0byB1c2UgYSBjb21wb25lbnQgY2xhc3Mgb3IgZnVuY3Rpb24gYXMgYSBtaXhpbi4gSW5zdGVhZCwganVzdCB1c2UgYSByZWd1bGFyIG9iamVjdC4nKSA6IF9wcm9kSW52YXJpYW50KCc3NScpIDogdm9pZCAwO1xuICAhIVJlYWN0RWxlbWVudC5pc1ZhbGlkRWxlbWVudChzcGVjKSA/IFwiZGV2ZWxvcG1lbnRcIiAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnUmVhY3RDbGFzczogWW91XFwncmUgYXR0ZW1wdGluZyB0byB1c2UgYSBjb21wb25lbnQgYXMgYSBtaXhpbi4gSW5zdGVhZCwganVzdCB1c2UgYSByZWd1bGFyIG9iamVjdC4nKSA6IF9wcm9kSW52YXJpYW50KCc3NicpIDogdm9pZCAwO1xuXG4gIHZhciBwcm90byA9IENvbnN0cnVjdG9yLnByb3RvdHlwZTtcbiAgdmFyIGF1dG9CaW5kUGFpcnMgPSBwcm90by5fX3JlYWN0QXV0b0JpbmRQYWlycztcblxuICAvLyBCeSBoYW5kbGluZyBtaXhpbnMgYmVmb3JlIGFueSBvdGhlciBwcm9wZXJ0aWVzLCB3ZSBlbnN1cmUgdGhlIHNhbWVcbiAgLy8gY2hhaW5pbmcgb3JkZXIgaXMgYXBwbGllZCB0byBtZXRob2RzIHdpdGggREVGSU5FX01BTlkgcG9saWN5LCB3aGV0aGVyXG4gIC8vIG1peGlucyBhcmUgbGlzdGVkIGJlZm9yZSBvciBhZnRlciB0aGVzZSBtZXRob2RzIGluIHRoZSBzcGVjLlxuICBpZiAoc3BlYy5oYXNPd25Qcm9wZXJ0eShNSVhJTlNfS0VZKSkge1xuICAgIFJFU0VSVkVEX1NQRUNfS0VZUy5taXhpbnMoQ29uc3RydWN0b3IsIHNwZWMubWl4aW5zKTtcbiAgfVxuXG4gIGZvciAodmFyIG5hbWUgaW4gc3BlYykge1xuICAgIGlmICghc3BlYy5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgaWYgKG5hbWUgPT09IE1JWElOU19LRVkpIHtcbiAgICAgIC8vIFdlIGhhdmUgYWxyZWFkeSBoYW5kbGVkIG1peGlucyBpbiBhIHNwZWNpYWwgY2FzZSBhYm92ZS5cbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIHZhciBwcm9wZXJ0eSA9IHNwZWNbbmFtZV07XG4gICAgdmFyIGlzQWxyZWFkeURlZmluZWQgPSBwcm90by5oYXNPd25Qcm9wZXJ0eShuYW1lKTtcbiAgICB2YWxpZGF0ZU1ldGhvZE92ZXJyaWRlKGlzQWxyZWFkeURlZmluZWQsIG5hbWUpO1xuXG4gICAgaWYgKFJFU0VSVkVEX1NQRUNfS0VZUy5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuICAgICAgUkVTRVJWRURfU1BFQ19LRVlTW25hbWVdKENvbnN0cnVjdG9yLCBwcm9wZXJ0eSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFNldHVwIG1ldGhvZHMgb24gcHJvdG90eXBlOlxuICAgICAgLy8gVGhlIGZvbGxvd2luZyBtZW1iZXIgbWV0aG9kcyBzaG91bGQgbm90IGJlIGF1dG9tYXRpY2FsbHkgYm91bmQ6XG4gICAgICAvLyAxLiBFeHBlY3RlZCBSZWFjdENsYXNzIG1ldGhvZHMgKGluIHRoZSBcImludGVyZmFjZVwiKS5cbiAgICAgIC8vIDIuIE92ZXJyaWRkZW4gbWV0aG9kcyAodGhhdCB3ZXJlIG1peGVkIGluKS5cbiAgICAgIHZhciBpc1JlYWN0Q2xhc3NNZXRob2QgPSBSZWFjdENsYXNzSW50ZXJmYWNlLmhhc093blByb3BlcnR5KG5hbWUpO1xuICAgICAgdmFyIGlzRnVuY3Rpb24gPSB0eXBlb2YgcHJvcGVydHkgPT09ICdmdW5jdGlvbic7XG4gICAgICB2YXIgc2hvdWxkQXV0b0JpbmQgPSBpc0Z1bmN0aW9uICYmICFpc1JlYWN0Q2xhc3NNZXRob2QgJiYgIWlzQWxyZWFkeURlZmluZWQgJiYgc3BlYy5hdXRvYmluZCAhPT0gZmFsc2U7XG5cbiAgICAgIGlmIChzaG91bGRBdXRvQmluZCkge1xuICAgICAgICBhdXRvQmluZFBhaXJzLnB1c2gobmFtZSwgcHJvcGVydHkpO1xuICAgICAgICBwcm90b1tuYW1lXSA9IHByb3BlcnR5O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGlzQWxyZWFkeURlZmluZWQpIHtcbiAgICAgICAgICB2YXIgc3BlY1BvbGljeSA9IFJlYWN0Q2xhc3NJbnRlcmZhY2VbbmFtZV07XG5cbiAgICAgICAgICAvLyBUaGVzZSBjYXNlcyBzaG91bGQgYWxyZWFkeSBiZSBjYXVnaHQgYnkgdmFsaWRhdGVNZXRob2RPdmVycmlkZS5cbiAgICAgICAgICAhKGlzUmVhY3RDbGFzc01ldGhvZCAmJiAoc3BlY1BvbGljeSA9PT0gJ0RFRklORV9NQU5ZX01FUkdFRCcgfHwgc3BlY1BvbGljeSA9PT0gJ0RFRklORV9NQU5ZJykpID8gXCJkZXZlbG9wbWVudFwiICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdSZWFjdENsYXNzOiBVbmV4cGVjdGVkIHNwZWMgcG9saWN5ICVzIGZvciBrZXkgJXMgd2hlbiBtaXhpbmcgaW4gY29tcG9uZW50IHNwZWNzLicsIHNwZWNQb2xpY3ksIG5hbWUpIDogX3Byb2RJbnZhcmlhbnQoJzc3Jywgc3BlY1BvbGljeSwgbmFtZSkgOiB2b2lkIDA7XG5cbiAgICAgICAgICAvLyBGb3IgbWV0aG9kcyB3aGljaCBhcmUgZGVmaW5lZCBtb3JlIHRoYW4gb25jZSwgY2FsbCB0aGUgZXhpc3RpbmdcbiAgICAgICAgICAvLyBtZXRob2RzIGJlZm9yZSBjYWxsaW5nIHRoZSBuZXcgcHJvcGVydHksIG1lcmdpbmcgaWYgYXBwcm9wcmlhdGUuXG4gICAgICAgICAgaWYgKHNwZWNQb2xpY3kgPT09ICdERUZJTkVfTUFOWV9NRVJHRUQnKSB7XG4gICAgICAgICAgICBwcm90b1tuYW1lXSA9IGNyZWF0ZU1lcmdlZFJlc3VsdEZ1bmN0aW9uKHByb3RvW25hbWVdLCBwcm9wZXJ0eSk7XG4gICAgICAgICAgfSBlbHNlIGlmIChzcGVjUG9saWN5ID09PSAnREVGSU5FX01BTlknKSB7XG4gICAgICAgICAgICBwcm90b1tuYW1lXSA9IGNyZWF0ZUNoYWluZWRGdW5jdGlvbihwcm90b1tuYW1lXSwgcHJvcGVydHkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBwcm90b1tuYW1lXSA9IHByb3BlcnR5O1xuICAgICAgICAgIGlmIChcImRldmVsb3BtZW50XCIgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICAgICAgLy8gQWRkIHZlcmJvc2UgZGlzcGxheU5hbWUgdG8gdGhlIGZ1bmN0aW9uLCB3aGljaCBoZWxwcyB3aGVuIGxvb2tpbmdcbiAgICAgICAgICAgIC8vIGF0IHByb2ZpbGluZyB0b29scy5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgcHJvcGVydHkgPT09ICdmdW5jdGlvbicgJiYgc3BlYy5kaXNwbGF5TmFtZSkge1xuICAgICAgICAgICAgICBwcm90b1tuYW1lXS5kaXNwbGF5TmFtZSA9IHNwZWMuZGlzcGxheU5hbWUgKyAnXycgKyBuYW1lO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBtaXhTdGF0aWNTcGVjSW50b0NvbXBvbmVudChDb25zdHJ1Y3Rvciwgc3RhdGljcykge1xuICBpZiAoIXN0YXRpY3MpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgZm9yICh2YXIgbmFtZSBpbiBzdGF0aWNzKSB7XG4gICAgdmFyIHByb3BlcnR5ID0gc3RhdGljc1tuYW1lXTtcbiAgICBpZiAoIXN0YXRpY3MuaGFzT3duUHJvcGVydHkobmFtZSkpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIHZhciBpc1Jlc2VydmVkID0gbmFtZSBpbiBSRVNFUlZFRF9TUEVDX0tFWVM7XG4gICAgISFpc1Jlc2VydmVkID8gXCJkZXZlbG9wbWVudFwiICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdSZWFjdENsYXNzOiBZb3UgYXJlIGF0dGVtcHRpbmcgdG8gZGVmaW5lIGEgcmVzZXJ2ZWQgcHJvcGVydHksIGAlc2AsIHRoYXQgc2hvdWxkblxcJ3QgYmUgb24gdGhlIFwic3RhdGljc1wiIGtleS4gRGVmaW5lIGl0IGFzIGFuIGluc3RhbmNlIHByb3BlcnR5IGluc3RlYWQ7IGl0IHdpbGwgc3RpbGwgYmUgYWNjZXNzaWJsZSBvbiB0aGUgY29uc3RydWN0b3IuJywgbmFtZSkgOiBfcHJvZEludmFyaWFudCgnNzgnLCBuYW1lKSA6IHZvaWQgMDtcblxuICAgIHZhciBpc0luaGVyaXRlZCA9IG5hbWUgaW4gQ29uc3RydWN0b3I7XG4gICAgISFpc0luaGVyaXRlZCA/IFwiZGV2ZWxvcG1lbnRcIiAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnUmVhY3RDbGFzczogWW91IGFyZSBhdHRlbXB0aW5nIHRvIGRlZmluZSBgJXNgIG9uIHlvdXIgY29tcG9uZW50IG1vcmUgdGhhbiBvbmNlLiBUaGlzIGNvbmZsaWN0IG1heSBiZSBkdWUgdG8gYSBtaXhpbi4nLCBuYW1lKSA6IF9wcm9kSW52YXJpYW50KCc3OScsIG5hbWUpIDogdm9pZCAwO1xuICAgIENvbnN0cnVjdG9yW25hbWVdID0gcHJvcGVydHk7XG4gIH1cbn1cblxuLyoqXG4gKiBNZXJnZSB0d28gb2JqZWN0cywgYnV0IHRocm93IGlmIGJvdGggY29udGFpbiB0aGUgc2FtZSBrZXkuXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IG9uZSBUaGUgZmlyc3Qgb2JqZWN0LCB3aGljaCBpcyBtdXRhdGVkLlxuICogQHBhcmFtIHtvYmplY3R9IHR3byBUaGUgc2Vjb25kIG9iamVjdFxuICogQHJldHVybiB7b2JqZWN0fSBvbmUgYWZ0ZXIgaXQgaGFzIGJlZW4gbXV0YXRlZCB0byBjb250YWluIGV2ZXJ5dGhpbmcgaW4gdHdvLlxuICovXG5mdW5jdGlvbiBtZXJnZUludG9XaXRoTm9EdXBsaWNhdGVLZXlzKG9uZSwgdHdvKSB7XG4gICEob25lICYmIHR3byAmJiB0eXBlb2Ygb25lID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgdHdvID09PSAnb2JqZWN0JykgPyBcImRldmVsb3BtZW50XCIgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ21lcmdlSW50b1dpdGhOb0R1cGxpY2F0ZUtleXMoKTogQ2Fubm90IG1lcmdlIG5vbi1vYmplY3RzLicpIDogX3Byb2RJbnZhcmlhbnQoJzgwJykgOiB2b2lkIDA7XG5cbiAgZm9yICh2YXIga2V5IGluIHR3bykge1xuICAgIGlmICh0d28uaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgIShvbmVba2V5XSA9PT0gdW5kZWZpbmVkKSA/IFwiZGV2ZWxvcG1lbnRcIiAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnbWVyZ2VJbnRvV2l0aE5vRHVwbGljYXRlS2V5cygpOiBUcmllZCB0byBtZXJnZSB0d28gb2JqZWN0cyB3aXRoIHRoZSBzYW1lIGtleTogYCVzYC4gVGhpcyBjb25mbGljdCBtYXkgYmUgZHVlIHRvIGEgbWl4aW47IGluIHBhcnRpY3VsYXIsIHRoaXMgbWF5IGJlIGNhdXNlZCBieSB0d28gZ2V0SW5pdGlhbFN0YXRlKCkgb3IgZ2V0RGVmYXVsdFByb3BzKCkgbWV0aG9kcyByZXR1cm5pbmcgb2JqZWN0cyB3aXRoIGNsYXNoaW5nIGtleXMuJywga2V5KSA6IF9wcm9kSW52YXJpYW50KCc4MScsIGtleSkgOiB2b2lkIDA7XG4gICAgICBvbmVba2V5XSA9IHR3b1trZXldO1xuICAgIH1cbiAgfVxuICByZXR1cm4gb25lO1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBmdW5jdGlvbiB0aGF0IGludm9rZXMgdHdvIGZ1bmN0aW9ucyBhbmQgbWVyZ2VzIHRoZWlyIHJldHVybiB2YWx1ZXMuXG4gKlxuICogQHBhcmFtIHtmdW5jdGlvbn0gb25lIEZ1bmN0aW9uIHRvIGludm9rZSBmaXJzdC5cbiAqIEBwYXJhbSB7ZnVuY3Rpb259IHR3byBGdW5jdGlvbiB0byBpbnZva2Ugc2Vjb25kLlxuICogQHJldHVybiB7ZnVuY3Rpb259IEZ1bmN0aW9uIHRoYXQgaW52b2tlcyB0aGUgdHdvIGFyZ3VtZW50IGZ1bmN0aW9ucy5cbiAqIEBwcml2YXRlXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZU1lcmdlZFJlc3VsdEZ1bmN0aW9uKG9uZSwgdHdvKSB7XG4gIHJldHVybiBmdW5jdGlvbiBtZXJnZWRSZXN1bHQoKSB7XG4gICAgdmFyIGEgPSBvbmUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB2YXIgYiA9IHR3by5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIGlmIChhID09IG51bGwpIHtcbiAgICAgIHJldHVybiBiO1xuICAgIH0gZWxzZSBpZiAoYiA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gYTtcbiAgICB9XG4gICAgdmFyIGMgPSB7fTtcbiAgICBtZXJnZUludG9XaXRoTm9EdXBsaWNhdGVLZXlzKGMsIGEpO1xuICAgIG1lcmdlSW50b1dpdGhOb0R1cGxpY2F0ZUtleXMoYywgYik7XG4gICAgcmV0dXJuIGM7XG4gIH07XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIGZ1bmN0aW9uIHRoYXQgaW52b2tlcyB0d28gZnVuY3Rpb25zIGFuZCBpZ25vcmVzIHRoZWlyIHJldHVybiB2YWxlcy5cbiAqXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBvbmUgRnVuY3Rpb24gdG8gaW52b2tlIGZpcnN0LlxuICogQHBhcmFtIHtmdW5jdGlvbn0gdHdvIEZ1bmN0aW9uIHRvIGludm9rZSBzZWNvbmQuXG4gKiBAcmV0dXJuIHtmdW5jdGlvbn0gRnVuY3Rpb24gdGhhdCBpbnZva2VzIHRoZSB0d28gYXJndW1lbnQgZnVuY3Rpb25zLlxuICogQHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gY3JlYXRlQ2hhaW5lZEZ1bmN0aW9uKG9uZSwgdHdvKSB7XG4gIHJldHVybiBmdW5jdGlvbiBjaGFpbmVkRnVuY3Rpb24oKSB7XG4gICAgb25lLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgdHdvLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH07XG59XG5cbi8qKlxuICogQmluZHMgYSBtZXRob2QgdG8gdGhlIGNvbXBvbmVudC5cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gY29tcG9uZW50IENvbXBvbmVudCB3aG9zZSBtZXRob2QgaXMgZ29pbmcgdG8gYmUgYm91bmQuXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBtZXRob2QgTWV0aG9kIHRvIGJlIGJvdW5kLlxuICogQHJldHVybiB7ZnVuY3Rpb259IFRoZSBib3VuZCBtZXRob2QuXG4gKi9cbmZ1bmN0aW9uIGJpbmRBdXRvQmluZE1ldGhvZChjb21wb25lbnQsIG1ldGhvZCkge1xuICB2YXIgYm91bmRNZXRob2QgPSBtZXRob2QuYmluZChjb21wb25lbnQpO1xuICBpZiAoXCJkZXZlbG9wbWVudFwiICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICBib3VuZE1ldGhvZC5fX3JlYWN0Qm91bmRDb250ZXh0ID0gY29tcG9uZW50O1xuICAgIGJvdW5kTWV0aG9kLl9fcmVhY3RCb3VuZE1ldGhvZCA9IG1ldGhvZDtcbiAgICBib3VuZE1ldGhvZC5fX3JlYWN0Qm91bmRBcmd1bWVudHMgPSBudWxsO1xuICAgIHZhciBjb21wb25lbnROYW1lID0gY29tcG9uZW50LmNvbnN0cnVjdG9yLmRpc3BsYXlOYW1lO1xuICAgIHZhciBfYmluZCA9IGJvdW5kTWV0aG9kLmJpbmQ7XG4gICAgYm91bmRNZXRob2QuYmluZCA9IGZ1bmN0aW9uIChuZXdUaGlzKSB7XG4gICAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IEFycmF5KF9sZW4gPiAxID8gX2xlbiAtIDEgOiAwKSwgX2tleSA9IDE7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICAgICAgYXJnc1tfa2V5IC0gMV0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgICB9XG5cbiAgICAgIC8vIFVzZXIgaXMgdHJ5aW5nIHRvIGJpbmQoKSBhbiBhdXRvYm91bmQgbWV0aG9kOyB3ZSBlZmZlY3RpdmVseSB3aWxsXG4gICAgICAvLyBpZ25vcmUgdGhlIHZhbHVlIG9mIFwidGhpc1wiIHRoYXQgdGhlIHVzZXIgaXMgdHJ5aW5nIHRvIHVzZSwgc29cbiAgICAgIC8vIGxldCdzIHdhcm4uXG4gICAgICBpZiAobmV3VGhpcyAhPT0gY29tcG9uZW50ICYmIG5ld1RoaXMgIT09IG51bGwpIHtcbiAgICAgICAgXCJkZXZlbG9wbWVudFwiICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKGZhbHNlLCAnYmluZCgpOiBSZWFjdCBjb21wb25lbnQgbWV0aG9kcyBtYXkgb25seSBiZSBib3VuZCB0byB0aGUgJyArICdjb21wb25lbnQgaW5zdGFuY2UuIFNlZSAlcycsIGNvbXBvbmVudE5hbWUpIDogdm9pZCAwO1xuICAgICAgfSBlbHNlIGlmICghYXJncy5sZW5ndGgpIHtcbiAgICAgICAgXCJkZXZlbG9wbWVudFwiICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKGZhbHNlLCAnYmluZCgpOiBZb3UgYXJlIGJpbmRpbmcgYSBjb21wb25lbnQgbWV0aG9kIHRvIHRoZSBjb21wb25lbnQuICcgKyAnUmVhY3QgZG9lcyB0aGlzIGZvciB5b3UgYXV0b21hdGljYWxseSBpbiBhIGhpZ2gtcGVyZm9ybWFuY2UgJyArICd3YXksIHNvIHlvdSBjYW4gc2FmZWx5IHJlbW92ZSB0aGlzIGNhbGwuIFNlZSAlcycsIGNvbXBvbmVudE5hbWUpIDogdm9pZCAwO1xuICAgICAgICByZXR1cm4gYm91bmRNZXRob2Q7XG4gICAgICB9XG4gICAgICB2YXIgcmVib3VuZE1ldGhvZCA9IF9iaW5kLmFwcGx5KGJvdW5kTWV0aG9kLCBhcmd1bWVudHMpO1xuICAgICAgcmVib3VuZE1ldGhvZC5fX3JlYWN0Qm91bmRDb250ZXh0ID0gY29tcG9uZW50O1xuICAgICAgcmVib3VuZE1ldGhvZC5fX3JlYWN0Qm91bmRNZXRob2QgPSBtZXRob2Q7XG4gICAgICByZWJvdW5kTWV0aG9kLl9fcmVhY3RCb3VuZEFyZ3VtZW50cyA9IGFyZ3M7XG4gICAgICByZXR1cm4gcmVib3VuZE1ldGhvZDtcbiAgICB9O1xuICB9XG4gIHJldHVybiBib3VuZE1ldGhvZDtcbn1cblxuLyoqXG4gKiBCaW5kcyBhbGwgYXV0by1ib3VuZCBtZXRob2RzIGluIGEgY29tcG9uZW50LlxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBjb21wb25lbnQgQ29tcG9uZW50IHdob3NlIG1ldGhvZCBpcyBnb2luZyB0byBiZSBib3VuZC5cbiAqL1xuZnVuY3Rpb24gYmluZEF1dG9CaW5kTWV0aG9kcyhjb21wb25lbnQpIHtcbiAgdmFyIHBhaXJzID0gY29tcG9uZW50Ll9fcmVhY3RBdXRvQmluZFBhaXJzO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHBhaXJzLmxlbmd0aDsgaSArPSAyKSB7XG4gICAgdmFyIGF1dG9CaW5kS2V5ID0gcGFpcnNbaV07XG4gICAgdmFyIG1ldGhvZCA9IHBhaXJzW2kgKyAxXTtcbiAgICBjb21wb25lbnRbYXV0b0JpbmRLZXldID0gYmluZEF1dG9CaW5kTWV0aG9kKGNvbXBvbmVudCwgbWV0aG9kKTtcbiAgfVxufVxuXG4vKipcbiAqIEFkZCBtb3JlIHRvIHRoZSBSZWFjdENsYXNzIGJhc2UgY2xhc3MuIFRoZXNlIGFyZSBhbGwgbGVnYWN5IGZlYXR1cmVzIGFuZFxuICogdGhlcmVmb3JlIG5vdCBhbHJlYWR5IHBhcnQgb2YgdGhlIG1vZGVybiBSZWFjdENvbXBvbmVudC5cbiAqL1xudmFyIFJlYWN0Q2xhc3NNaXhpbiA9IHtcblxuICAvKipcbiAgICogVE9ETzogVGhpcyB3aWxsIGJlIGRlcHJlY2F0ZWQgYmVjYXVzZSBzdGF0ZSBzaG91bGQgYWx3YXlzIGtlZXAgYSBjb25zaXN0ZW50XG4gICAqIHR5cGUgc2lnbmF0dXJlIGFuZCB0aGUgb25seSB1c2UgY2FzZSBmb3IgdGhpcywgaXMgdG8gYXZvaWQgdGhhdC5cbiAgICovXG4gIHJlcGxhY2VTdGF0ZTogZnVuY3Rpb24gKG5ld1N0YXRlLCBjYWxsYmFjaykge1xuICAgIHRoaXMudXBkYXRlci5lbnF1ZXVlUmVwbGFjZVN0YXRlKHRoaXMsIG5ld1N0YXRlKTtcbiAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgIHRoaXMudXBkYXRlci5lbnF1ZXVlQ2FsbGJhY2sodGhpcywgY2FsbGJhY2ssICdyZXBsYWNlU3RhdGUnKTtcbiAgICB9XG4gIH0sXG5cbiAgLyoqXG4gICAqIENoZWNrcyB3aGV0aGVyIG9yIG5vdCB0aGlzIGNvbXBvc2l0ZSBjb21wb25lbnQgaXMgbW91bnRlZC5cbiAgICogQHJldHVybiB7Ym9vbGVhbn0gVHJ1ZSBpZiBtb3VudGVkLCBmYWxzZSBvdGhlcndpc2UuXG4gICAqIEBwcm90ZWN0ZWRcbiAgICogQGZpbmFsXG4gICAqL1xuICBpc01vdW50ZWQ6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy51cGRhdGVyLmlzTW91bnRlZCh0aGlzKTtcbiAgfVxufTtcblxudmFyIFJlYWN0Q2xhc3NDb21wb25lbnQgPSBmdW5jdGlvbiAoKSB7fTtcbl9hc3NpZ24oUmVhY3RDbGFzc0NvbXBvbmVudC5wcm90b3R5cGUsIFJlYWN0Q29tcG9uZW50LnByb3RvdHlwZSwgUmVhY3RDbGFzc01peGluKTtcblxuLyoqXG4gKiBNb2R1bGUgZm9yIGNyZWF0aW5nIGNvbXBvc2l0ZSBjb21wb25lbnRzLlxuICpcbiAqIEBjbGFzcyBSZWFjdENsYXNzXG4gKi9cbnZhciBSZWFjdENsYXNzID0ge1xuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgY29tcG9zaXRlIGNvbXBvbmVudCBjbGFzcyBnaXZlbiBhIGNsYXNzIHNwZWNpZmljYXRpb24uXG4gICAqIFNlZSBodHRwczovL2ZhY2Vib29rLmdpdGh1Yi5pby9yZWFjdC9kb2NzL3RvcC1sZXZlbC1hcGkuaHRtbCNyZWFjdC5jcmVhdGVjbGFzc1xuICAgKlxuICAgKiBAcGFyYW0ge29iamVjdH0gc3BlYyBDbGFzcyBzcGVjaWZpY2F0aW9uICh3aGljaCBtdXN0IGRlZmluZSBgcmVuZGVyYCkuXG4gICAqIEByZXR1cm4ge2Z1bmN0aW9ufSBDb21wb25lbnQgY29uc3RydWN0b3IgZnVuY3Rpb24uXG4gICAqIEBwdWJsaWNcbiAgICovXG4gIGNyZWF0ZUNsYXNzOiBmdW5jdGlvbiAoc3BlYykge1xuICAgIC8vIFRvIGtlZXAgb3VyIHdhcm5pbmdzIG1vcmUgdW5kZXJzdGFuZGFibGUsIHdlJ2xsIHVzZSBhIGxpdHRsZSBoYWNrIGhlcmUgdG9cbiAgICAvLyBlbnN1cmUgdGhhdCBDb25zdHJ1Y3Rvci5uYW1lICE9PSAnQ29uc3RydWN0b3InLiBUaGlzIG1ha2VzIHN1cmUgd2UgZG9uJ3RcbiAgICAvLyB1bm5lY2Vzc2FyaWx5IGlkZW50aWZ5IGEgY2xhc3Mgd2l0aG91dCBkaXNwbGF5TmFtZSBhcyAnQ29uc3RydWN0b3InLlxuICAgIHZhciBDb25zdHJ1Y3RvciA9IGlkZW50aXR5KGZ1bmN0aW9uIChwcm9wcywgY29udGV4dCwgdXBkYXRlcikge1xuICAgICAgLy8gVGhpcyBjb25zdHJ1Y3RvciBnZXRzIG92ZXJyaWRkZW4gYnkgbW9ja3MuIFRoZSBhcmd1bWVudCBpcyB1c2VkXG4gICAgICAvLyBieSBtb2NrcyB0byBhc3NlcnQgb24gd2hhdCBnZXRzIG1vdW50ZWQuXG5cbiAgICAgIGlmIChcImRldmVsb3BtZW50XCIgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgICBcImRldmVsb3BtZW50XCIgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcodGhpcyBpbnN0YW5jZW9mIENvbnN0cnVjdG9yLCAnU29tZXRoaW5nIGlzIGNhbGxpbmcgYSBSZWFjdCBjb21wb25lbnQgZGlyZWN0bHkuIFVzZSBhIGZhY3Rvcnkgb3IgJyArICdKU1ggaW5zdGVhZC4gU2VlOiBodHRwczovL2ZiLm1lL3JlYWN0LWxlZ2FjeWZhY3RvcnknKSA6IHZvaWQgMDtcbiAgICAgIH1cblxuICAgICAgLy8gV2lyZSB1cCBhdXRvLWJpbmRpbmdcbiAgICAgIGlmICh0aGlzLl9fcmVhY3RBdXRvQmluZFBhaXJzLmxlbmd0aCkge1xuICAgICAgICBiaW5kQXV0b0JpbmRNZXRob2RzKHRoaXMpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnByb3BzID0gcHJvcHM7XG4gICAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuICAgICAgdGhpcy5yZWZzID0gZW1wdHlPYmplY3Q7XG4gICAgICB0aGlzLnVwZGF0ZXIgPSB1cGRhdGVyIHx8IFJlYWN0Tm9vcFVwZGF0ZVF1ZXVlO1xuXG4gICAgICB0aGlzLnN0YXRlID0gbnVsbDtcblxuICAgICAgLy8gUmVhY3RDbGFzc2VzIGRvZXNuJ3QgaGF2ZSBjb25zdHJ1Y3RvcnMuIEluc3RlYWQsIHRoZXkgdXNlIHRoZVxuICAgICAgLy8gZ2V0SW5pdGlhbFN0YXRlIGFuZCBjb21wb25lbnRXaWxsTW91bnQgbWV0aG9kcyBmb3IgaW5pdGlhbGl6YXRpb24uXG5cbiAgICAgIHZhciBpbml0aWFsU3RhdGUgPSB0aGlzLmdldEluaXRpYWxTdGF0ZSA/IHRoaXMuZ2V0SW5pdGlhbFN0YXRlKCkgOiBudWxsO1xuICAgICAgaWYgKFwiZGV2ZWxvcG1lbnRcIiAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICAgIC8vIFdlIGFsbG93IGF1dG8tbW9ja3MgdG8gcHJvY2VlZCBhcyBpZiB0aGV5J3JlIHJldHVybmluZyBudWxsLlxuICAgICAgICBpZiAoaW5pdGlhbFN0YXRlID09PSB1bmRlZmluZWQgJiYgdGhpcy5nZXRJbml0aWFsU3RhdGUuX2lzTW9ja0Z1bmN0aW9uKSB7XG4gICAgICAgICAgLy8gVGhpcyBpcyBwcm9iYWJseSBiYWQgcHJhY3RpY2UuIENvbnNpZGVyIHdhcm5pbmcgaGVyZSBhbmRcbiAgICAgICAgICAvLyBkZXByZWNhdGluZyB0aGlzIGNvbnZlbmllbmNlLlxuICAgICAgICAgIGluaXRpYWxTdGF0ZSA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgICEodHlwZW9mIGluaXRpYWxTdGF0ZSA9PT0gJ29iamVjdCcgJiYgIUFycmF5LmlzQXJyYXkoaW5pdGlhbFN0YXRlKSkgPyBcImRldmVsb3BtZW50XCIgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJyVzLmdldEluaXRpYWxTdGF0ZSgpOiBtdXN0IHJldHVybiBhbiBvYmplY3Qgb3IgbnVsbCcsIENvbnN0cnVjdG9yLmRpc3BsYXlOYW1lIHx8ICdSZWFjdENvbXBvc2l0ZUNvbXBvbmVudCcpIDogX3Byb2RJbnZhcmlhbnQoJzgyJywgQ29uc3RydWN0b3IuZGlzcGxheU5hbWUgfHwgJ1JlYWN0Q29tcG9zaXRlQ29tcG9uZW50JykgOiB2b2lkIDA7XG5cbiAgICAgIHRoaXMuc3RhdGUgPSBpbml0aWFsU3RhdGU7XG4gICAgfSk7XG4gICAgQ29uc3RydWN0b3IucHJvdG90eXBlID0gbmV3IFJlYWN0Q2xhc3NDb21wb25lbnQoKTtcbiAgICBDb25zdHJ1Y3Rvci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBDb25zdHJ1Y3RvcjtcbiAgICBDb25zdHJ1Y3Rvci5wcm90b3R5cGUuX19yZWFjdEF1dG9CaW5kUGFpcnMgPSBbXTtcblxuICAgIGluamVjdGVkTWl4aW5zLmZvckVhY2gobWl4U3BlY0ludG9Db21wb25lbnQuYmluZChudWxsLCBDb25zdHJ1Y3RvcikpO1xuXG4gICAgbWl4U3BlY0ludG9Db21wb25lbnQoQ29uc3RydWN0b3IsIHNwZWMpO1xuXG4gICAgLy8gSW5pdGlhbGl6ZSB0aGUgZGVmYXVsdFByb3BzIHByb3BlcnR5IGFmdGVyIGFsbCBtaXhpbnMgaGF2ZSBiZWVuIG1lcmdlZC5cbiAgICBpZiAoQ29uc3RydWN0b3IuZ2V0RGVmYXVsdFByb3BzKSB7XG4gICAgICBDb25zdHJ1Y3Rvci5kZWZhdWx0UHJvcHMgPSBDb25zdHJ1Y3Rvci5nZXREZWZhdWx0UHJvcHMoKTtcbiAgICB9XG5cbiAgICBpZiAoXCJkZXZlbG9wbWVudFwiICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIC8vIFRoaXMgaXMgYSB0YWcgdG8gaW5kaWNhdGUgdGhhdCB0aGUgdXNlIG9mIHRoZXNlIG1ldGhvZCBuYW1lcyBpcyBvayxcbiAgICAgIC8vIHNpbmNlIGl0J3MgdXNlZCB3aXRoIGNyZWF0ZUNsYXNzLiBJZiBpdCdzIG5vdCwgdGhlbiBpdCdzIGxpa2VseSBhXG4gICAgICAvLyBtaXN0YWtlIHNvIHdlJ2xsIHdhcm4geW91IHRvIHVzZSB0aGUgc3RhdGljIHByb3BlcnR5LCBwcm9wZXJ0eVxuICAgICAgLy8gaW5pdGlhbGl6ZXIgb3IgY29uc3RydWN0b3IgcmVzcGVjdGl2ZWx5LlxuICAgICAgaWYgKENvbnN0cnVjdG9yLmdldERlZmF1bHRQcm9wcykge1xuICAgICAgICBDb25zdHJ1Y3Rvci5nZXREZWZhdWx0UHJvcHMuaXNSZWFjdENsYXNzQXBwcm92ZWQgPSB7fTtcbiAgICAgIH1cbiAgICAgIGlmIChDb25zdHJ1Y3Rvci5wcm90b3R5cGUuZ2V0SW5pdGlhbFN0YXRlKSB7XG4gICAgICAgIENvbnN0cnVjdG9yLnByb3RvdHlwZS5nZXRJbml0aWFsU3RhdGUuaXNSZWFjdENsYXNzQXBwcm92ZWQgPSB7fTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAhQ29uc3RydWN0b3IucHJvdG90eXBlLnJlbmRlciA/IFwiZGV2ZWxvcG1lbnRcIiAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnY3JlYXRlQ2xhc3MoLi4uKTogQ2xhc3Mgc3BlY2lmaWNhdGlvbiBtdXN0IGltcGxlbWVudCBhIGByZW5kZXJgIG1ldGhvZC4nKSA6IF9wcm9kSW52YXJpYW50KCc4MycpIDogdm9pZCAwO1xuXG4gICAgaWYgKFwiZGV2ZWxvcG1lbnRcIiAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICBcImRldmVsb3BtZW50XCIgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoIUNvbnN0cnVjdG9yLnByb3RvdHlwZS5jb21wb25lbnRTaG91bGRVcGRhdGUsICclcyBoYXMgYSBtZXRob2QgY2FsbGVkICcgKyAnY29tcG9uZW50U2hvdWxkVXBkYXRlKCkuIERpZCB5b3UgbWVhbiBzaG91bGRDb21wb25lbnRVcGRhdGUoKT8gJyArICdUaGUgbmFtZSBpcyBwaHJhc2VkIGFzIGEgcXVlc3Rpb24gYmVjYXVzZSB0aGUgZnVuY3Rpb24gaXMgJyArICdleHBlY3RlZCB0byByZXR1cm4gYSB2YWx1ZS4nLCBzcGVjLmRpc3BsYXlOYW1lIHx8ICdBIGNvbXBvbmVudCcpIDogdm9pZCAwO1xuICAgICAgXCJkZXZlbG9wbWVudFwiICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKCFDb25zdHJ1Y3Rvci5wcm90b3R5cGUuY29tcG9uZW50V2lsbFJlY2lldmVQcm9wcywgJyVzIGhhcyBhIG1ldGhvZCBjYWxsZWQgJyArICdjb21wb25lbnRXaWxsUmVjaWV2ZVByb3BzKCkuIERpZCB5b3UgbWVhbiBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKCk/Jywgc3BlYy5kaXNwbGF5TmFtZSB8fCAnQSBjb21wb25lbnQnKSA6IHZvaWQgMDtcbiAgICB9XG5cbiAgICAvLyBSZWR1Y2UgdGltZSBzcGVudCBkb2luZyBsb29rdXBzIGJ5IHNldHRpbmcgdGhlc2Ugb24gdGhlIHByb3RvdHlwZS5cbiAgICBmb3IgKHZhciBtZXRob2ROYW1lIGluIFJlYWN0Q2xhc3NJbnRlcmZhY2UpIHtcbiAgICAgIGlmICghQ29uc3RydWN0b3IucHJvdG90eXBlW21ldGhvZE5hbWVdKSB7XG4gICAgICAgIENvbnN0cnVjdG9yLnByb3RvdHlwZVttZXRob2ROYW1lXSA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIENvbnN0cnVjdG9yO1xuICB9LFxuXG4gIGluamVjdGlvbjoge1xuICAgIGluamVjdE1peGluOiBmdW5jdGlvbiAobWl4aW4pIHtcbiAgICAgIGluamVjdGVkTWl4aW5zLnB1c2gobWl4aW4pO1xuICAgIH1cbiAgfVxuXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0Q2xhc3M7IiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIF9wcm9kSW52YXJpYW50ID0gcmVxdWlyZSgnLi9yZWFjdFByb2RJbnZhcmlhbnQnKTtcblxudmFyIFJlYWN0Tm9vcFVwZGF0ZVF1ZXVlID0gcmVxdWlyZSgnLi9SZWFjdE5vb3BVcGRhdGVRdWV1ZScpO1xuXG52YXIgY2FuRGVmaW5lUHJvcGVydHkgPSByZXF1aXJlKCcuL2NhbkRlZmluZVByb3BlcnR5Jyk7XG52YXIgZW1wdHlPYmplY3QgPSByZXF1aXJlKCdmYmpzL2xpYi9lbXB0eU9iamVjdCcpO1xudmFyIGludmFyaWFudCA9IHJlcXVpcmUoJ2ZianMvbGliL2ludmFyaWFudCcpO1xudmFyIHdhcm5pbmcgPSByZXF1aXJlKCdmYmpzL2xpYi93YXJuaW5nJyk7XG5cbi8qKlxuICogQmFzZSBjbGFzcyBoZWxwZXJzIGZvciB0aGUgdXBkYXRpbmcgc3RhdGUgb2YgYSBjb21wb25lbnQuXG4gKi9cbmZ1bmN0aW9uIFJlYWN0Q29tcG9uZW50KHByb3BzLCBjb250ZXh0LCB1cGRhdGVyKSB7XG4gIHRoaXMucHJvcHMgPSBwcm9wcztcbiAgdGhpcy5jb250ZXh0ID0gY29udGV4dDtcbiAgdGhpcy5yZWZzID0gZW1wdHlPYmplY3Q7XG4gIC8vIFdlIGluaXRpYWxpemUgdGhlIGRlZmF1bHQgdXBkYXRlciBidXQgdGhlIHJlYWwgb25lIGdldHMgaW5qZWN0ZWQgYnkgdGhlXG4gIC8vIHJlbmRlcmVyLlxuICB0aGlzLnVwZGF0ZXIgPSB1cGRhdGVyIHx8IFJlYWN0Tm9vcFVwZGF0ZVF1ZXVlO1xufVxuXG5SZWFjdENvbXBvbmVudC5wcm90b3R5cGUuaXNSZWFjdENvbXBvbmVudCA9IHt9O1xuXG4vKipcbiAqIFNldHMgYSBzdWJzZXQgb2YgdGhlIHN0YXRlLiBBbHdheXMgdXNlIHRoaXMgdG8gbXV0YXRlXG4gKiBzdGF0ZS4gWW91IHNob3VsZCB0cmVhdCBgdGhpcy5zdGF0ZWAgYXMgaW1tdXRhYmxlLlxuICpcbiAqIFRoZXJlIGlzIG5vIGd1YXJhbnRlZSB0aGF0IGB0aGlzLnN0YXRlYCB3aWxsIGJlIGltbWVkaWF0ZWx5IHVwZGF0ZWQsIHNvXG4gKiBhY2Nlc3NpbmcgYHRoaXMuc3RhdGVgIGFmdGVyIGNhbGxpbmcgdGhpcyBtZXRob2QgbWF5IHJldHVybiB0aGUgb2xkIHZhbHVlLlxuICpcbiAqIFRoZXJlIGlzIG5vIGd1YXJhbnRlZSB0aGF0IGNhbGxzIHRvIGBzZXRTdGF0ZWAgd2lsbCBydW4gc3luY2hyb25vdXNseSxcbiAqIGFzIHRoZXkgbWF5IGV2ZW50dWFsbHkgYmUgYmF0Y2hlZCB0b2dldGhlci4gIFlvdSBjYW4gcHJvdmlkZSBhbiBvcHRpb25hbFxuICogY2FsbGJhY2sgdGhhdCB3aWxsIGJlIGV4ZWN1dGVkIHdoZW4gdGhlIGNhbGwgdG8gc2V0U3RhdGUgaXMgYWN0dWFsbHlcbiAqIGNvbXBsZXRlZC5cbiAqXG4gKiBXaGVuIGEgZnVuY3Rpb24gaXMgcHJvdmlkZWQgdG8gc2V0U3RhdGUsIGl0IHdpbGwgYmUgY2FsbGVkIGF0IHNvbWUgcG9pbnQgaW5cbiAqIHRoZSBmdXR1cmUgKG5vdCBzeW5jaHJvbm91c2x5KS4gSXQgd2lsbCBiZSBjYWxsZWQgd2l0aCB0aGUgdXAgdG8gZGF0ZVxuICogY29tcG9uZW50IGFyZ3VtZW50cyAoc3RhdGUsIHByb3BzLCBjb250ZXh0KS4gVGhlc2UgdmFsdWVzIGNhbiBiZSBkaWZmZXJlbnRcbiAqIGZyb20gdGhpcy4qIGJlY2F1c2UgeW91ciBmdW5jdGlvbiBtYXkgYmUgY2FsbGVkIGFmdGVyIHJlY2VpdmVQcm9wcyBidXQgYmVmb3JlXG4gKiBzaG91bGRDb21wb25lbnRVcGRhdGUsIGFuZCB0aGlzIG5ldyBzdGF0ZSwgcHJvcHMsIGFuZCBjb250ZXh0IHdpbGwgbm90IHlldCBiZVxuICogYXNzaWduZWQgdG8gdGhpcy5cbiAqXG4gKiBAcGFyYW0ge29iamVjdHxmdW5jdGlvbn0gcGFydGlhbFN0YXRlIE5leHQgcGFydGlhbCBzdGF0ZSBvciBmdW5jdGlvbiB0b1xuICogICAgICAgIHByb2R1Y2UgbmV4dCBwYXJ0aWFsIHN0YXRlIHRvIGJlIG1lcmdlZCB3aXRoIGN1cnJlbnQgc3RhdGUuXG4gKiBAcGFyYW0gez9mdW5jdGlvbn0gY2FsbGJhY2sgQ2FsbGVkIGFmdGVyIHN0YXRlIGlzIHVwZGF0ZWQuXG4gKiBAZmluYWxcbiAqIEBwcm90ZWN0ZWRcbiAqL1xuUmVhY3RDb21wb25lbnQucHJvdG90eXBlLnNldFN0YXRlID0gZnVuY3Rpb24gKHBhcnRpYWxTdGF0ZSwgY2FsbGJhY2spIHtcbiAgISh0eXBlb2YgcGFydGlhbFN0YXRlID09PSAnb2JqZWN0JyB8fCB0eXBlb2YgcGFydGlhbFN0YXRlID09PSAnZnVuY3Rpb24nIHx8IHBhcnRpYWxTdGF0ZSA9PSBudWxsKSA/IFwiZGV2ZWxvcG1lbnRcIiAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnc2V0U3RhdGUoLi4uKTogdGFrZXMgYW4gb2JqZWN0IG9mIHN0YXRlIHZhcmlhYmxlcyB0byB1cGRhdGUgb3IgYSBmdW5jdGlvbiB3aGljaCByZXR1cm5zIGFuIG9iamVjdCBvZiBzdGF0ZSB2YXJpYWJsZXMuJykgOiBfcHJvZEludmFyaWFudCgnODUnKSA6IHZvaWQgMDtcbiAgdGhpcy51cGRhdGVyLmVucXVldWVTZXRTdGF0ZSh0aGlzLCBwYXJ0aWFsU3RhdGUpO1xuICBpZiAoY2FsbGJhY2spIHtcbiAgICB0aGlzLnVwZGF0ZXIuZW5xdWV1ZUNhbGxiYWNrKHRoaXMsIGNhbGxiYWNrLCAnc2V0U3RhdGUnKTtcbiAgfVxufTtcblxuLyoqXG4gKiBGb3JjZXMgYW4gdXBkYXRlLiBUaGlzIHNob3VsZCBvbmx5IGJlIGludm9rZWQgd2hlbiBpdCBpcyBrbm93biB3aXRoXG4gKiBjZXJ0YWludHkgdGhhdCB3ZSBhcmUgKipub3QqKiBpbiBhIERPTSB0cmFuc2FjdGlvbi5cbiAqXG4gKiBZb3UgbWF5IHdhbnQgdG8gY2FsbCB0aGlzIHdoZW4geW91IGtub3cgdGhhdCBzb21lIGRlZXBlciBhc3BlY3Qgb2YgdGhlXG4gKiBjb21wb25lbnQncyBzdGF0ZSBoYXMgY2hhbmdlZCBidXQgYHNldFN0YXRlYCB3YXMgbm90IGNhbGxlZC5cbiAqXG4gKiBUaGlzIHdpbGwgbm90IGludm9rZSBgc2hvdWxkQ29tcG9uZW50VXBkYXRlYCwgYnV0IGl0IHdpbGwgaW52b2tlXG4gKiBgY29tcG9uZW50V2lsbFVwZGF0ZWAgYW5kIGBjb21wb25lbnREaWRVcGRhdGVgLlxuICpcbiAqIEBwYXJhbSB7P2Z1bmN0aW9ufSBjYWxsYmFjayBDYWxsZWQgYWZ0ZXIgdXBkYXRlIGlzIGNvbXBsZXRlLlxuICogQGZpbmFsXG4gKiBAcHJvdGVjdGVkXG4gKi9cblJlYWN0Q29tcG9uZW50LnByb3RvdHlwZS5mb3JjZVVwZGF0ZSA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICB0aGlzLnVwZGF0ZXIuZW5xdWV1ZUZvcmNlVXBkYXRlKHRoaXMpO1xuICBpZiAoY2FsbGJhY2spIHtcbiAgICB0aGlzLnVwZGF0ZXIuZW5xdWV1ZUNhbGxiYWNrKHRoaXMsIGNhbGxiYWNrLCAnZm9yY2VVcGRhdGUnKTtcbiAgfVxufTtcblxuLyoqXG4gKiBEZXByZWNhdGVkIEFQSXMuIFRoZXNlIEFQSXMgdXNlZCB0byBleGlzdCBvbiBjbGFzc2ljIFJlYWN0IGNsYXNzZXMgYnV0IHNpbmNlXG4gKiB3ZSB3b3VsZCBsaWtlIHRvIGRlcHJlY2F0ZSB0aGVtLCB3ZSdyZSBub3QgZ29pbmcgdG8gbW92ZSB0aGVtIG92ZXIgdG8gdGhpc1xuICogbW9kZXJuIGJhc2UgY2xhc3MuIEluc3RlYWQsIHdlIGRlZmluZSBhIGdldHRlciB0aGF0IHdhcm5zIGlmIGl0J3MgYWNjZXNzZWQuXG4gKi9cbmlmIChcImRldmVsb3BtZW50XCIgIT09ICdwcm9kdWN0aW9uJykge1xuICB2YXIgZGVwcmVjYXRlZEFQSXMgPSB7XG4gICAgaXNNb3VudGVkOiBbJ2lzTW91bnRlZCcsICdJbnN0ZWFkLCBtYWtlIHN1cmUgdG8gY2xlYW4gdXAgc3Vic2NyaXB0aW9ucyBhbmQgcGVuZGluZyByZXF1ZXN0cyBpbiAnICsgJ2NvbXBvbmVudFdpbGxVbm1vdW50IHRvIHByZXZlbnQgbWVtb3J5IGxlYWtzLiddLFxuICAgIHJlcGxhY2VTdGF0ZTogWydyZXBsYWNlU3RhdGUnLCAnUmVmYWN0b3IgeW91ciBjb2RlIHRvIHVzZSBzZXRTdGF0ZSBpbnN0ZWFkIChzZWUgJyArICdodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVhY3QvaXNzdWVzLzMyMzYpLiddXG4gIH07XG4gIHZhciBkZWZpbmVEZXByZWNhdGlvbldhcm5pbmcgPSBmdW5jdGlvbiAobWV0aG9kTmFtZSwgaW5mbykge1xuICAgIGlmIChjYW5EZWZpbmVQcm9wZXJ0eSkge1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFJlYWN0Q29tcG9uZW50LnByb3RvdHlwZSwgbWV0aG9kTmFtZSwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBcImRldmVsb3BtZW50XCIgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoZmFsc2UsICclcyguLi4pIGlzIGRlcHJlY2F0ZWQgaW4gcGxhaW4gSmF2YVNjcmlwdCBSZWFjdCBjbGFzc2VzLiAlcycsIGluZm9bMF0sIGluZm9bMV0pIDogdm9pZCAwO1xuICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcbiAgZm9yICh2YXIgZm5OYW1lIGluIGRlcHJlY2F0ZWRBUElzKSB7XG4gICAgaWYgKGRlcHJlY2F0ZWRBUElzLmhhc093blByb3BlcnR5KGZuTmFtZSkpIHtcbiAgICAgIGRlZmluZURlcHJlY2F0aW9uV2FybmluZyhmbk5hbWUsIGRlcHJlY2F0ZWRBUElzW2ZuTmFtZV0pO1xuICAgIH1cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0Q29tcG9uZW50OyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTYtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIFxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIF9wcm9kSW52YXJpYW50ID0gcmVxdWlyZSgnLi9yZWFjdFByb2RJbnZhcmlhbnQnKTtcblxudmFyIFJlYWN0Q3VycmVudE93bmVyID0gcmVxdWlyZSgnLi9SZWFjdEN1cnJlbnRPd25lcicpO1xuXG52YXIgaW52YXJpYW50ID0gcmVxdWlyZSgnZmJqcy9saWIvaW52YXJpYW50Jyk7XG52YXIgd2FybmluZyA9IHJlcXVpcmUoJ2ZianMvbGliL3dhcm5pbmcnKTtcblxuZnVuY3Rpb24gaXNOYXRpdmUoZm4pIHtcbiAgLy8gQmFzZWQgb24gaXNOYXRpdmUoKSBmcm9tIExvZGFzaFxuICB2YXIgZnVuY1RvU3RyaW5nID0gRnVuY3Rpb24ucHJvdG90eXBlLnRvU3RyaW5nO1xuICB2YXIgaGFzT3duUHJvcGVydHkgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuICB2YXIgcmVJc05hdGl2ZSA9IFJlZ0V4cCgnXicgKyBmdW5jVG9TdHJpbmdcbiAgLy8gVGFrZSBhbiBleGFtcGxlIG5hdGl2ZSBmdW5jdGlvbiBzb3VyY2UgZm9yIGNvbXBhcmlzb25cbiAgLmNhbGwoaGFzT3duUHJvcGVydHkpXG4gIC8vIFN0cmlwIHJlZ2V4IGNoYXJhY3RlcnMgc28gd2UgY2FuIHVzZSBpdCBmb3IgcmVnZXhcbiAgLnJlcGxhY2UoL1tcXFxcXiQuKis/KClbXFxde318XS9nLCAnXFxcXCQmJylcbiAgLy8gUmVtb3ZlIGhhc093blByb3BlcnR5IGZyb20gdGhlIHRlbXBsYXRlIHRvIG1ha2UgaXQgZ2VuZXJpY1xuICAucmVwbGFjZSgvaGFzT3duUHJvcGVydHl8KGZ1bmN0aW9uKS4qPyg/PVxcXFxcXCgpfCBmb3IgLis/KD89XFxcXFxcXSkvZywgJyQxLio/JykgKyAnJCcpO1xuICB0cnkge1xuICAgIHZhciBzb3VyY2UgPSBmdW5jVG9TdHJpbmcuY2FsbChmbik7XG4gICAgcmV0dXJuIHJlSXNOYXRpdmUudGVzdChzb3VyY2UpO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxudmFyIGNhblVzZUNvbGxlY3Rpb25zID1cbi8vIEFycmF5LmZyb21cbnR5cGVvZiBBcnJheS5mcm9tID09PSAnZnVuY3Rpb24nICYmXG4vLyBNYXBcbnR5cGVvZiBNYXAgPT09ICdmdW5jdGlvbicgJiYgaXNOYXRpdmUoTWFwKSAmJlxuLy8gTWFwLnByb3RvdHlwZS5rZXlzXG5NYXAucHJvdG90eXBlICE9IG51bGwgJiYgdHlwZW9mIE1hcC5wcm90b3R5cGUua2V5cyA9PT0gJ2Z1bmN0aW9uJyAmJiBpc05hdGl2ZShNYXAucHJvdG90eXBlLmtleXMpICYmXG4vLyBTZXRcbnR5cGVvZiBTZXQgPT09ICdmdW5jdGlvbicgJiYgaXNOYXRpdmUoU2V0KSAmJlxuLy8gU2V0LnByb3RvdHlwZS5rZXlzXG5TZXQucHJvdG90eXBlICE9IG51bGwgJiYgdHlwZW9mIFNldC5wcm90b3R5cGUua2V5cyA9PT0gJ2Z1bmN0aW9uJyAmJiBpc05hdGl2ZShTZXQucHJvdG90eXBlLmtleXMpO1xuXG52YXIgc2V0SXRlbTtcbnZhciBnZXRJdGVtO1xudmFyIHJlbW92ZUl0ZW07XG52YXIgZ2V0SXRlbUlEcztcbnZhciBhZGRSb290O1xudmFyIHJlbW92ZVJvb3Q7XG52YXIgZ2V0Um9vdElEcztcblxuaWYgKGNhblVzZUNvbGxlY3Rpb25zKSB7XG4gIHZhciBpdGVtTWFwID0gbmV3IE1hcCgpO1xuICB2YXIgcm9vdElEU2V0ID0gbmV3IFNldCgpO1xuXG4gIHNldEl0ZW0gPSBmdW5jdGlvbiAoaWQsIGl0ZW0pIHtcbiAgICBpdGVtTWFwLnNldChpZCwgaXRlbSk7XG4gIH07XG4gIGdldEl0ZW0gPSBmdW5jdGlvbiAoaWQpIHtcbiAgICByZXR1cm4gaXRlbU1hcC5nZXQoaWQpO1xuICB9O1xuICByZW1vdmVJdGVtID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgaXRlbU1hcFsnZGVsZXRlJ10oaWQpO1xuICB9O1xuICBnZXRJdGVtSURzID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBBcnJheS5mcm9tKGl0ZW1NYXAua2V5cygpKTtcbiAgfTtcblxuICBhZGRSb290ID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgcm9vdElEU2V0LmFkZChpZCk7XG4gIH07XG4gIHJlbW92ZVJvb3QgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICByb290SURTZXRbJ2RlbGV0ZSddKGlkKTtcbiAgfTtcbiAgZ2V0Um9vdElEcyA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gQXJyYXkuZnJvbShyb290SURTZXQua2V5cygpKTtcbiAgfTtcbn0gZWxzZSB7XG4gIHZhciBpdGVtQnlLZXkgPSB7fTtcbiAgdmFyIHJvb3RCeUtleSA9IHt9O1xuXG4gIC8vIFVzZSBub24tbnVtZXJpYyBrZXlzIHRvIHByZXZlbnQgVjggcGVyZm9ybWFuY2UgaXNzdWVzOlxuICAvLyBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVhY3QvcHVsbC83MjMyXG4gIHZhciBnZXRLZXlGcm9tSUQgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICByZXR1cm4gJy4nICsgaWQ7XG4gIH07XG4gIHZhciBnZXRJREZyb21LZXkgPSBmdW5jdGlvbiAoa2V5KSB7XG4gICAgcmV0dXJuIHBhcnNlSW50KGtleS5zdWJzdHIoMSksIDEwKTtcbiAgfTtcblxuICBzZXRJdGVtID0gZnVuY3Rpb24gKGlkLCBpdGVtKSB7XG4gICAgdmFyIGtleSA9IGdldEtleUZyb21JRChpZCk7XG4gICAgaXRlbUJ5S2V5W2tleV0gPSBpdGVtO1xuICB9O1xuICBnZXRJdGVtID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgdmFyIGtleSA9IGdldEtleUZyb21JRChpZCk7XG4gICAgcmV0dXJuIGl0ZW1CeUtleVtrZXldO1xuICB9O1xuICByZW1vdmVJdGVtID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgdmFyIGtleSA9IGdldEtleUZyb21JRChpZCk7XG4gICAgZGVsZXRlIGl0ZW1CeUtleVtrZXldO1xuICB9O1xuICBnZXRJdGVtSURzID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBPYmplY3Qua2V5cyhpdGVtQnlLZXkpLm1hcChnZXRJREZyb21LZXkpO1xuICB9O1xuXG4gIGFkZFJvb3QgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICB2YXIga2V5ID0gZ2V0S2V5RnJvbUlEKGlkKTtcbiAgICByb290QnlLZXlba2V5XSA9IHRydWU7XG4gIH07XG4gIHJlbW92ZVJvb3QgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICB2YXIga2V5ID0gZ2V0S2V5RnJvbUlEKGlkKTtcbiAgICBkZWxldGUgcm9vdEJ5S2V5W2tleV07XG4gIH07XG4gIGdldFJvb3RJRHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKHJvb3RCeUtleSkubWFwKGdldElERnJvbUtleSk7XG4gIH07XG59XG5cbnZhciB1bm1vdW50ZWRJRHMgPSBbXTtcblxuZnVuY3Rpb24gcHVyZ2VEZWVwKGlkKSB7XG4gIHZhciBpdGVtID0gZ2V0SXRlbShpZCk7XG4gIGlmIChpdGVtKSB7XG4gICAgdmFyIGNoaWxkSURzID0gaXRlbS5jaGlsZElEcztcblxuICAgIHJlbW92ZUl0ZW0oaWQpO1xuICAgIGNoaWxkSURzLmZvckVhY2gocHVyZ2VEZWVwKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBkZXNjcmliZUNvbXBvbmVudEZyYW1lKG5hbWUsIHNvdXJjZSwgb3duZXJOYW1lKSB7XG4gIHJldHVybiAnXFxuICAgIGluICcgKyAobmFtZSB8fCAnVW5rbm93bicpICsgKHNvdXJjZSA/ICcgKGF0ICcgKyBzb3VyY2UuZmlsZU5hbWUucmVwbGFjZSgvXi4qW1xcXFxcXC9dLywgJycpICsgJzonICsgc291cmNlLmxpbmVOdW1iZXIgKyAnKScgOiBvd25lck5hbWUgPyAnIChjcmVhdGVkIGJ5ICcgKyBvd25lck5hbWUgKyAnKScgOiAnJyk7XG59XG5cbmZ1bmN0aW9uIGdldERpc3BsYXlOYW1lKGVsZW1lbnQpIHtcbiAgaWYgKGVsZW1lbnQgPT0gbnVsbCkge1xuICAgIHJldHVybiAnI2VtcHR5JztcbiAgfSBlbHNlIGlmICh0eXBlb2YgZWxlbWVudCA9PT0gJ3N0cmluZycgfHwgdHlwZW9mIGVsZW1lbnQgPT09ICdudW1iZXInKSB7XG4gICAgcmV0dXJuICcjdGV4dCc7XG4gIH0gZWxzZSBpZiAodHlwZW9mIGVsZW1lbnQudHlwZSA9PT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gZWxlbWVudC50eXBlO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBlbGVtZW50LnR5cGUuZGlzcGxheU5hbWUgfHwgZWxlbWVudC50eXBlLm5hbWUgfHwgJ1Vua25vd24nO1xuICB9XG59XG5cbmZ1bmN0aW9uIGRlc2NyaWJlSUQoaWQpIHtcbiAgdmFyIG5hbWUgPSBSZWFjdENvbXBvbmVudFRyZWVIb29rLmdldERpc3BsYXlOYW1lKGlkKTtcbiAgdmFyIGVsZW1lbnQgPSBSZWFjdENvbXBvbmVudFRyZWVIb29rLmdldEVsZW1lbnQoaWQpO1xuICB2YXIgb3duZXJJRCA9IFJlYWN0Q29tcG9uZW50VHJlZUhvb2suZ2V0T3duZXJJRChpZCk7XG4gIHZhciBvd25lck5hbWU7XG4gIGlmIChvd25lcklEKSB7XG4gICAgb3duZXJOYW1lID0gUmVhY3RDb21wb25lbnRUcmVlSG9vay5nZXREaXNwbGF5TmFtZShvd25lcklEKTtcbiAgfVxuICBcImRldmVsb3BtZW50XCIgIT09ICdwcm9kdWN0aW9uJyA/IHdhcm5pbmcoZWxlbWVudCwgJ1JlYWN0Q29tcG9uZW50VHJlZUhvb2s6IE1pc3NpbmcgUmVhY3QgZWxlbWVudCBmb3IgZGVidWdJRCAlcyB3aGVuICcgKyAnYnVpbGRpbmcgc3RhY2snLCBpZCkgOiB2b2lkIDA7XG4gIHJldHVybiBkZXNjcmliZUNvbXBvbmVudEZyYW1lKG5hbWUsIGVsZW1lbnQgJiYgZWxlbWVudC5fc291cmNlLCBvd25lck5hbWUpO1xufVxuXG52YXIgUmVhY3RDb21wb25lbnRUcmVlSG9vayA9IHtcbiAgb25TZXRDaGlsZHJlbjogZnVuY3Rpb24gKGlkLCBuZXh0Q2hpbGRJRHMpIHtcbiAgICB2YXIgaXRlbSA9IGdldEl0ZW0oaWQpO1xuICAgICFpdGVtID8gXCJkZXZlbG9wbWVudFwiICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdJdGVtIG11c3QgaGF2ZSBiZWVuIHNldCcpIDogX3Byb2RJbnZhcmlhbnQoJzE0NCcpIDogdm9pZCAwO1xuICAgIGl0ZW0uY2hpbGRJRHMgPSBuZXh0Q2hpbGRJRHM7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5leHRDaGlsZElEcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIG5leHRDaGlsZElEID0gbmV4dENoaWxkSURzW2ldO1xuICAgICAgdmFyIG5leHRDaGlsZCA9IGdldEl0ZW0obmV4dENoaWxkSUQpO1xuICAgICAgIW5leHRDaGlsZCA/IFwiZGV2ZWxvcG1lbnRcIiAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnRXhwZWN0ZWQgaG9vayBldmVudHMgdG8gZmlyZSBmb3IgdGhlIGNoaWxkIGJlZm9yZSBpdHMgcGFyZW50IGluY2x1ZGVzIGl0IGluIG9uU2V0Q2hpbGRyZW4oKS4nKSA6IF9wcm9kSW52YXJpYW50KCcxNDAnKSA6IHZvaWQgMDtcbiAgICAgICEobmV4dENoaWxkLmNoaWxkSURzICE9IG51bGwgfHwgdHlwZW9mIG5leHRDaGlsZC5lbGVtZW50ICE9PSAnb2JqZWN0JyB8fCBuZXh0Q2hpbGQuZWxlbWVudCA9PSBudWxsKSA/IFwiZGV2ZWxvcG1lbnRcIiAhPT0gJ3Byb2R1Y3Rpb24nID8gaW52YXJpYW50KGZhbHNlLCAnRXhwZWN0ZWQgb25TZXRDaGlsZHJlbigpIHRvIGZpcmUgZm9yIGEgY29udGFpbmVyIGNoaWxkIGJlZm9yZSBpdHMgcGFyZW50IGluY2x1ZGVzIGl0IGluIG9uU2V0Q2hpbGRyZW4oKS4nKSA6IF9wcm9kSW52YXJpYW50KCcxNDEnKSA6IHZvaWQgMDtcbiAgICAgICFuZXh0Q2hpbGQuaXNNb3VudGVkID8gXCJkZXZlbG9wbWVudFwiICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdFeHBlY3RlZCBvbk1vdW50Q29tcG9uZW50KCkgdG8gZmlyZSBmb3IgdGhlIGNoaWxkIGJlZm9yZSBpdHMgcGFyZW50IGluY2x1ZGVzIGl0IGluIG9uU2V0Q2hpbGRyZW4oKS4nKSA6IF9wcm9kSW52YXJpYW50KCc3MScpIDogdm9pZCAwO1xuICAgICAgaWYgKG5leHRDaGlsZC5wYXJlbnRJRCA9PSBudWxsKSB7XG4gICAgICAgIG5leHRDaGlsZC5wYXJlbnRJRCA9IGlkO1xuICAgICAgICAvLyBUT0RPOiBUaGlzIHNob3VsZG4ndCBiZSBuZWNlc3NhcnkgYnV0IG1vdW50aW5nIGEgbmV3IHJvb3QgZHVyaW5nIGluXG4gICAgICAgIC8vIGNvbXBvbmVudFdpbGxNb3VudCBjdXJyZW50bHkgY2F1c2VzIG5vdC15ZXQtbW91bnRlZCBjb21wb25lbnRzIHRvXG4gICAgICAgIC8vIGJlIHB1cmdlZCBmcm9tIG91ciB0cmVlIGRhdGEgc28gdGhlaXIgcGFyZW50IGlkIGlzIG1pc3NpbmcuXG4gICAgICB9XG4gICAgICAhKG5leHRDaGlsZC5wYXJlbnRJRCA9PT0gaWQpID8gXCJkZXZlbG9wbWVudFwiICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdFeHBlY3RlZCBvbkJlZm9yZU1vdW50Q29tcG9uZW50KCkgcGFyZW50IGFuZCBvblNldENoaWxkcmVuKCkgdG8gYmUgY29uc2lzdGVudCAoJXMgaGFzIHBhcmVudHMgJXMgYW5kICVzKS4nLCBuZXh0Q2hpbGRJRCwgbmV4dENoaWxkLnBhcmVudElELCBpZCkgOiBfcHJvZEludmFyaWFudCgnMTQyJywgbmV4dENoaWxkSUQsIG5leHRDaGlsZC5wYXJlbnRJRCwgaWQpIDogdm9pZCAwO1xuICAgIH1cbiAgfSxcbiAgb25CZWZvcmVNb3VudENvbXBvbmVudDogZnVuY3Rpb24gKGlkLCBlbGVtZW50LCBwYXJlbnRJRCkge1xuICAgIHZhciBpdGVtID0ge1xuICAgICAgZWxlbWVudDogZWxlbWVudCxcbiAgICAgIHBhcmVudElEOiBwYXJlbnRJRCxcbiAgICAgIHRleHQ6IG51bGwsXG4gICAgICBjaGlsZElEczogW10sXG4gICAgICBpc01vdW50ZWQ6IGZhbHNlLFxuICAgICAgdXBkYXRlQ291bnQ6IDBcbiAgICB9O1xuICAgIHNldEl0ZW0oaWQsIGl0ZW0pO1xuICB9LFxuICBvbkJlZm9yZVVwZGF0ZUNvbXBvbmVudDogZnVuY3Rpb24gKGlkLCBlbGVtZW50KSB7XG4gICAgdmFyIGl0ZW0gPSBnZXRJdGVtKGlkKTtcbiAgICBpZiAoIWl0ZW0gfHwgIWl0ZW0uaXNNb3VudGVkKSB7XG4gICAgICAvLyBXZSBtYXkgZW5kIHVwIGhlcmUgYXMgYSByZXN1bHQgb2Ygc2V0U3RhdGUoKSBpbiBjb21wb25lbnRXaWxsVW5tb3VudCgpLlxuICAgICAgLy8gSW4gdGhpcyBjYXNlLCBpZ25vcmUgdGhlIGVsZW1lbnQuXG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGl0ZW0uZWxlbWVudCA9IGVsZW1lbnQ7XG4gIH0sXG4gIG9uTW91bnRDb21wb25lbnQ6IGZ1bmN0aW9uIChpZCkge1xuICAgIHZhciBpdGVtID0gZ2V0SXRlbShpZCk7XG4gICAgIWl0ZW0gPyBcImRldmVsb3BtZW50XCIgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJ0l0ZW0gbXVzdCBoYXZlIGJlZW4gc2V0JykgOiBfcHJvZEludmFyaWFudCgnMTQ0JykgOiB2b2lkIDA7XG4gICAgaXRlbS5pc01vdW50ZWQgPSB0cnVlO1xuICAgIHZhciBpc1Jvb3QgPSBpdGVtLnBhcmVudElEID09PSAwO1xuICAgIGlmIChpc1Jvb3QpIHtcbiAgICAgIGFkZFJvb3QoaWQpO1xuICAgIH1cbiAgfSxcbiAgb25VcGRhdGVDb21wb25lbnQ6IGZ1bmN0aW9uIChpZCkge1xuICAgIHZhciBpdGVtID0gZ2V0SXRlbShpZCk7XG4gICAgaWYgKCFpdGVtIHx8ICFpdGVtLmlzTW91bnRlZCkge1xuICAgICAgLy8gV2UgbWF5IGVuZCB1cCBoZXJlIGFzIGEgcmVzdWx0IG9mIHNldFN0YXRlKCkgaW4gY29tcG9uZW50V2lsbFVubW91bnQoKS5cbiAgICAgIC8vIEluIHRoaXMgY2FzZSwgaWdub3JlIHRoZSBlbGVtZW50LlxuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpdGVtLnVwZGF0ZUNvdW50Kys7XG4gIH0sXG4gIG9uVW5tb3VudENvbXBvbmVudDogZnVuY3Rpb24gKGlkKSB7XG4gICAgdmFyIGl0ZW0gPSBnZXRJdGVtKGlkKTtcbiAgICBpZiAoaXRlbSkge1xuICAgICAgLy8gV2UgbmVlZCB0byBjaGVjayBpZiBpdCBleGlzdHMuXG4gICAgICAvLyBgaXRlbWAgbWlnaHQgbm90IGV4aXN0IGlmIGl0IGlzIGluc2lkZSBhbiBlcnJvciBib3VuZGFyeSwgYW5kIGEgc2libGluZ1xuICAgICAgLy8gZXJyb3IgYm91bmRhcnkgY2hpbGQgdGhyZXcgd2hpbGUgbW91bnRpbmcuIFRoZW4gdGhpcyBpbnN0YW5jZSBuZXZlclxuICAgICAgLy8gZ290IGEgY2hhbmNlIHRvIG1vdW50LCBidXQgaXQgc3RpbGwgZ2V0cyBhbiB1bm1vdW50aW5nIGV2ZW50IGR1cmluZ1xuICAgICAgLy8gdGhlIGVycm9yIGJvdW5kYXJ5IGNsZWFudXAuXG4gICAgICBpdGVtLmlzTW91bnRlZCA9IGZhbHNlO1xuICAgICAgdmFyIGlzUm9vdCA9IGl0ZW0ucGFyZW50SUQgPT09IDA7XG4gICAgICBpZiAoaXNSb290KSB7XG4gICAgICAgIHJlbW92ZVJvb3QoaWQpO1xuICAgICAgfVxuICAgIH1cbiAgICB1bm1vdW50ZWRJRHMucHVzaChpZCk7XG4gIH0sXG4gIHB1cmdlVW5tb3VudGVkQ29tcG9uZW50czogZnVuY3Rpb24gKCkge1xuICAgIGlmIChSZWFjdENvbXBvbmVudFRyZWVIb29rLl9wcmV2ZW50UHVyZ2luZykge1xuICAgICAgLy8gU2hvdWxkIG9ubHkgYmUgdXNlZCBmb3IgdGVzdGluZy5cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHVubW91bnRlZElEcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkID0gdW5tb3VudGVkSURzW2ldO1xuICAgICAgcHVyZ2VEZWVwKGlkKTtcbiAgICB9XG4gICAgdW5tb3VudGVkSURzLmxlbmd0aCA9IDA7XG4gIH0sXG4gIGlzTW91bnRlZDogZnVuY3Rpb24gKGlkKSB7XG4gICAgdmFyIGl0ZW0gPSBnZXRJdGVtKGlkKTtcbiAgICByZXR1cm4gaXRlbSA/IGl0ZW0uaXNNb3VudGVkIDogZmFsc2U7XG4gIH0sXG4gIGdldEN1cnJlbnRTdGFja0FkZGVuZHVtOiBmdW5jdGlvbiAodG9wRWxlbWVudCkge1xuICAgIHZhciBpbmZvID0gJyc7XG4gICAgaWYgKHRvcEVsZW1lbnQpIHtcbiAgICAgIHZhciBuYW1lID0gZ2V0RGlzcGxheU5hbWUodG9wRWxlbWVudCk7XG4gICAgICB2YXIgb3duZXIgPSB0b3BFbGVtZW50Ll9vd25lcjtcbiAgICAgIGluZm8gKz0gZGVzY3JpYmVDb21wb25lbnRGcmFtZShuYW1lLCB0b3BFbGVtZW50Ll9zb3VyY2UsIG93bmVyICYmIG93bmVyLmdldE5hbWUoKSk7XG4gICAgfVxuXG4gICAgdmFyIGN1cnJlbnRPd25lciA9IFJlYWN0Q3VycmVudE93bmVyLmN1cnJlbnQ7XG4gICAgdmFyIGlkID0gY3VycmVudE93bmVyICYmIGN1cnJlbnRPd25lci5fZGVidWdJRDtcblxuICAgIGluZm8gKz0gUmVhY3RDb21wb25lbnRUcmVlSG9vay5nZXRTdGFja0FkZGVuZHVtQnlJRChpZCk7XG4gICAgcmV0dXJuIGluZm87XG4gIH0sXG4gIGdldFN0YWNrQWRkZW5kdW1CeUlEOiBmdW5jdGlvbiAoaWQpIHtcbiAgICB2YXIgaW5mbyA9ICcnO1xuICAgIHdoaWxlIChpZCkge1xuICAgICAgaW5mbyArPSBkZXNjcmliZUlEKGlkKTtcbiAgICAgIGlkID0gUmVhY3RDb21wb25lbnRUcmVlSG9vay5nZXRQYXJlbnRJRChpZCk7XG4gICAgfVxuICAgIHJldHVybiBpbmZvO1xuICB9LFxuICBnZXRDaGlsZElEczogZnVuY3Rpb24gKGlkKSB7XG4gICAgdmFyIGl0ZW0gPSBnZXRJdGVtKGlkKTtcbiAgICByZXR1cm4gaXRlbSA/IGl0ZW0uY2hpbGRJRHMgOiBbXTtcbiAgfSxcbiAgZ2V0RGlzcGxheU5hbWU6IGZ1bmN0aW9uIChpZCkge1xuICAgIHZhciBlbGVtZW50ID0gUmVhY3RDb21wb25lbnRUcmVlSG9vay5nZXRFbGVtZW50KGlkKTtcbiAgICBpZiAoIWVsZW1lbnQpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gZ2V0RGlzcGxheU5hbWUoZWxlbWVudCk7XG4gIH0sXG4gIGdldEVsZW1lbnQ6IGZ1bmN0aW9uIChpZCkge1xuICAgIHZhciBpdGVtID0gZ2V0SXRlbShpZCk7XG4gICAgcmV0dXJuIGl0ZW0gPyBpdGVtLmVsZW1lbnQgOiBudWxsO1xuICB9LFxuICBnZXRPd25lcklEOiBmdW5jdGlvbiAoaWQpIHtcbiAgICB2YXIgZWxlbWVudCA9IFJlYWN0Q29tcG9uZW50VHJlZUhvb2suZ2V0RWxlbWVudChpZCk7XG4gICAgaWYgKCFlbGVtZW50IHx8ICFlbGVtZW50Ll9vd25lcikge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBlbGVtZW50Ll9vd25lci5fZGVidWdJRDtcbiAgfSxcbiAgZ2V0UGFyZW50SUQ6IGZ1bmN0aW9uIChpZCkge1xuICAgIHZhciBpdGVtID0gZ2V0SXRlbShpZCk7XG4gICAgcmV0dXJuIGl0ZW0gPyBpdGVtLnBhcmVudElEIDogbnVsbDtcbiAgfSxcbiAgZ2V0U291cmNlOiBmdW5jdGlvbiAoaWQpIHtcbiAgICB2YXIgaXRlbSA9IGdldEl0ZW0oaWQpO1xuICAgIHZhciBlbGVtZW50ID0gaXRlbSA/IGl0ZW0uZWxlbWVudCA6IG51bGw7XG4gICAgdmFyIHNvdXJjZSA9IGVsZW1lbnQgIT0gbnVsbCA/IGVsZW1lbnQuX3NvdXJjZSA6IG51bGw7XG4gICAgcmV0dXJuIHNvdXJjZTtcbiAgfSxcbiAgZ2V0VGV4dDogZnVuY3Rpb24gKGlkKSB7XG4gICAgdmFyIGVsZW1lbnQgPSBSZWFjdENvbXBvbmVudFRyZWVIb29rLmdldEVsZW1lbnQoaWQpO1xuICAgIGlmICh0eXBlb2YgZWxlbWVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiBlbGVtZW50O1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGVsZW1lbnQgPT09ICdudW1iZXInKSB7XG4gICAgICByZXR1cm4gJycgKyBlbGVtZW50O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH0sXG4gIGdldFVwZGF0ZUNvdW50OiBmdW5jdGlvbiAoaWQpIHtcbiAgICB2YXIgaXRlbSA9IGdldEl0ZW0oaWQpO1xuICAgIHJldHVybiBpdGVtID8gaXRlbS51cGRhdGVDb3VudCA6IDA7XG4gIH0sXG5cblxuICBnZXRSb290SURzOiBnZXRSb290SURzLFxuICBnZXRSZWdpc3RlcmVkSURzOiBnZXRJdGVtSURzXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0Q29tcG9uZW50VHJlZUhvb2s7IiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIEtlZXBzIHRyYWNrIG9mIHRoZSBjdXJyZW50IG93bmVyLlxuICpcbiAqIFRoZSBjdXJyZW50IG93bmVyIGlzIHRoZSBjb21wb25lbnQgd2hvIHNob3VsZCBvd24gYW55IGNvbXBvbmVudHMgdGhhdCBhcmVcbiAqIGN1cnJlbnRseSBiZWluZyBjb25zdHJ1Y3RlZC5cbiAqL1xudmFyIFJlYWN0Q3VycmVudE93bmVyID0ge1xuXG4gIC8qKlxuICAgKiBAaW50ZXJuYWxcbiAgICogQHR5cGUge1JlYWN0Q29tcG9uZW50fVxuICAgKi9cbiAgY3VycmVudDogbnVsbFxuXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0Q3VycmVudE93bmVyOyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBSZWFjdEVsZW1lbnQgPSByZXF1aXJlKCcuL1JlYWN0RWxlbWVudCcpO1xuXG4vKipcbiAqIENyZWF0ZSBhIGZhY3RvcnkgdGhhdCBjcmVhdGVzIEhUTUwgdGFnIGVsZW1lbnRzLlxuICpcbiAqIEBwcml2YXRlXG4gKi9cbnZhciBjcmVhdGVET01GYWN0b3J5ID0gUmVhY3RFbGVtZW50LmNyZWF0ZUZhY3Rvcnk7XG5pZiAoXCJkZXZlbG9wbWVudFwiICE9PSAncHJvZHVjdGlvbicpIHtcbiAgdmFyIFJlYWN0RWxlbWVudFZhbGlkYXRvciA9IHJlcXVpcmUoJy4vUmVhY3RFbGVtZW50VmFsaWRhdG9yJyk7XG4gIGNyZWF0ZURPTUZhY3RvcnkgPSBSZWFjdEVsZW1lbnRWYWxpZGF0b3IuY3JlYXRlRmFjdG9yeTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgbWFwcGluZyBmcm9tIHN1cHBvcnRlZCBIVE1MIHRhZ3MgdG8gYFJlYWN0RE9NQ29tcG9uZW50YCBjbGFzc2VzLlxuICogVGhpcyBpcyBhbHNvIGFjY2Vzc2libGUgdmlhIGBSZWFjdC5ET01gLlxuICpcbiAqIEBwdWJsaWNcbiAqL1xudmFyIFJlYWN0RE9NRmFjdG9yaWVzID0ge1xuICBhOiBjcmVhdGVET01GYWN0b3J5KCdhJyksXG4gIGFiYnI6IGNyZWF0ZURPTUZhY3RvcnkoJ2FiYnInKSxcbiAgYWRkcmVzczogY3JlYXRlRE9NRmFjdG9yeSgnYWRkcmVzcycpLFxuICBhcmVhOiBjcmVhdGVET01GYWN0b3J5KCdhcmVhJyksXG4gIGFydGljbGU6IGNyZWF0ZURPTUZhY3RvcnkoJ2FydGljbGUnKSxcbiAgYXNpZGU6IGNyZWF0ZURPTUZhY3RvcnkoJ2FzaWRlJyksXG4gIGF1ZGlvOiBjcmVhdGVET01GYWN0b3J5KCdhdWRpbycpLFxuICBiOiBjcmVhdGVET01GYWN0b3J5KCdiJyksXG4gIGJhc2U6IGNyZWF0ZURPTUZhY3RvcnkoJ2Jhc2UnKSxcbiAgYmRpOiBjcmVhdGVET01GYWN0b3J5KCdiZGknKSxcbiAgYmRvOiBjcmVhdGVET01GYWN0b3J5KCdiZG8nKSxcbiAgYmlnOiBjcmVhdGVET01GYWN0b3J5KCdiaWcnKSxcbiAgYmxvY2txdW90ZTogY3JlYXRlRE9NRmFjdG9yeSgnYmxvY2txdW90ZScpLFxuICBib2R5OiBjcmVhdGVET01GYWN0b3J5KCdib2R5JyksXG4gIGJyOiBjcmVhdGVET01GYWN0b3J5KCdicicpLFxuICBidXR0b246IGNyZWF0ZURPTUZhY3RvcnkoJ2J1dHRvbicpLFxuICBjYW52YXM6IGNyZWF0ZURPTUZhY3RvcnkoJ2NhbnZhcycpLFxuICBjYXB0aW9uOiBjcmVhdGVET01GYWN0b3J5KCdjYXB0aW9uJyksXG4gIGNpdGU6IGNyZWF0ZURPTUZhY3RvcnkoJ2NpdGUnKSxcbiAgY29kZTogY3JlYXRlRE9NRmFjdG9yeSgnY29kZScpLFxuICBjb2w6IGNyZWF0ZURPTUZhY3RvcnkoJ2NvbCcpLFxuICBjb2xncm91cDogY3JlYXRlRE9NRmFjdG9yeSgnY29sZ3JvdXAnKSxcbiAgZGF0YTogY3JlYXRlRE9NRmFjdG9yeSgnZGF0YScpLFxuICBkYXRhbGlzdDogY3JlYXRlRE9NRmFjdG9yeSgnZGF0YWxpc3QnKSxcbiAgZGQ6IGNyZWF0ZURPTUZhY3RvcnkoJ2RkJyksXG4gIGRlbDogY3JlYXRlRE9NRmFjdG9yeSgnZGVsJyksXG4gIGRldGFpbHM6IGNyZWF0ZURPTUZhY3RvcnkoJ2RldGFpbHMnKSxcbiAgZGZuOiBjcmVhdGVET01GYWN0b3J5KCdkZm4nKSxcbiAgZGlhbG9nOiBjcmVhdGVET01GYWN0b3J5KCdkaWFsb2cnKSxcbiAgZGl2OiBjcmVhdGVET01GYWN0b3J5KCdkaXYnKSxcbiAgZGw6IGNyZWF0ZURPTUZhY3RvcnkoJ2RsJyksXG4gIGR0OiBjcmVhdGVET01GYWN0b3J5KCdkdCcpLFxuICBlbTogY3JlYXRlRE9NRmFjdG9yeSgnZW0nKSxcbiAgZW1iZWQ6IGNyZWF0ZURPTUZhY3RvcnkoJ2VtYmVkJyksXG4gIGZpZWxkc2V0OiBjcmVhdGVET01GYWN0b3J5KCdmaWVsZHNldCcpLFxuICBmaWdjYXB0aW9uOiBjcmVhdGVET01GYWN0b3J5KCdmaWdjYXB0aW9uJyksXG4gIGZpZ3VyZTogY3JlYXRlRE9NRmFjdG9yeSgnZmlndXJlJyksXG4gIGZvb3RlcjogY3JlYXRlRE9NRmFjdG9yeSgnZm9vdGVyJyksXG4gIGZvcm06IGNyZWF0ZURPTUZhY3RvcnkoJ2Zvcm0nKSxcbiAgaDE6IGNyZWF0ZURPTUZhY3RvcnkoJ2gxJyksXG4gIGgyOiBjcmVhdGVET01GYWN0b3J5KCdoMicpLFxuICBoMzogY3JlYXRlRE9NRmFjdG9yeSgnaDMnKSxcbiAgaDQ6IGNyZWF0ZURPTUZhY3RvcnkoJ2g0JyksXG4gIGg1OiBjcmVhdGVET01GYWN0b3J5KCdoNScpLFxuICBoNjogY3JlYXRlRE9NRmFjdG9yeSgnaDYnKSxcbiAgaGVhZDogY3JlYXRlRE9NRmFjdG9yeSgnaGVhZCcpLFxuICBoZWFkZXI6IGNyZWF0ZURPTUZhY3RvcnkoJ2hlYWRlcicpLFxuICBoZ3JvdXA6IGNyZWF0ZURPTUZhY3RvcnkoJ2hncm91cCcpLFxuICBocjogY3JlYXRlRE9NRmFjdG9yeSgnaHInKSxcbiAgaHRtbDogY3JlYXRlRE9NRmFjdG9yeSgnaHRtbCcpLFxuICBpOiBjcmVhdGVET01GYWN0b3J5KCdpJyksXG4gIGlmcmFtZTogY3JlYXRlRE9NRmFjdG9yeSgnaWZyYW1lJyksXG4gIGltZzogY3JlYXRlRE9NRmFjdG9yeSgnaW1nJyksXG4gIGlucHV0OiBjcmVhdGVET01GYWN0b3J5KCdpbnB1dCcpLFxuICBpbnM6IGNyZWF0ZURPTUZhY3RvcnkoJ2lucycpLFxuICBrYmQ6IGNyZWF0ZURPTUZhY3RvcnkoJ2tiZCcpLFxuICBrZXlnZW46IGNyZWF0ZURPTUZhY3RvcnkoJ2tleWdlbicpLFxuICBsYWJlbDogY3JlYXRlRE9NRmFjdG9yeSgnbGFiZWwnKSxcbiAgbGVnZW5kOiBjcmVhdGVET01GYWN0b3J5KCdsZWdlbmQnKSxcbiAgbGk6IGNyZWF0ZURPTUZhY3RvcnkoJ2xpJyksXG4gIGxpbms6IGNyZWF0ZURPTUZhY3RvcnkoJ2xpbmsnKSxcbiAgbWFpbjogY3JlYXRlRE9NRmFjdG9yeSgnbWFpbicpLFxuICBtYXA6IGNyZWF0ZURPTUZhY3RvcnkoJ21hcCcpLFxuICBtYXJrOiBjcmVhdGVET01GYWN0b3J5KCdtYXJrJyksXG4gIG1lbnU6IGNyZWF0ZURPTUZhY3RvcnkoJ21lbnUnKSxcbiAgbWVudWl0ZW06IGNyZWF0ZURPTUZhY3RvcnkoJ21lbnVpdGVtJyksXG4gIG1ldGE6IGNyZWF0ZURPTUZhY3RvcnkoJ21ldGEnKSxcbiAgbWV0ZXI6IGNyZWF0ZURPTUZhY3RvcnkoJ21ldGVyJyksXG4gIG5hdjogY3JlYXRlRE9NRmFjdG9yeSgnbmF2JyksXG4gIG5vc2NyaXB0OiBjcmVhdGVET01GYWN0b3J5KCdub3NjcmlwdCcpLFxuICBvYmplY3Q6IGNyZWF0ZURPTUZhY3RvcnkoJ29iamVjdCcpLFxuICBvbDogY3JlYXRlRE9NRmFjdG9yeSgnb2wnKSxcbiAgb3B0Z3JvdXA6IGNyZWF0ZURPTUZhY3RvcnkoJ29wdGdyb3VwJyksXG4gIG9wdGlvbjogY3JlYXRlRE9NRmFjdG9yeSgnb3B0aW9uJyksXG4gIG91dHB1dDogY3JlYXRlRE9NRmFjdG9yeSgnb3V0cHV0JyksXG4gIHA6IGNyZWF0ZURPTUZhY3RvcnkoJ3AnKSxcbiAgcGFyYW06IGNyZWF0ZURPTUZhY3RvcnkoJ3BhcmFtJyksXG4gIHBpY3R1cmU6IGNyZWF0ZURPTUZhY3RvcnkoJ3BpY3R1cmUnKSxcbiAgcHJlOiBjcmVhdGVET01GYWN0b3J5KCdwcmUnKSxcbiAgcHJvZ3Jlc3M6IGNyZWF0ZURPTUZhY3RvcnkoJ3Byb2dyZXNzJyksXG4gIHE6IGNyZWF0ZURPTUZhY3RvcnkoJ3EnKSxcbiAgcnA6IGNyZWF0ZURPTUZhY3RvcnkoJ3JwJyksXG4gIHJ0OiBjcmVhdGVET01GYWN0b3J5KCdydCcpLFxuICBydWJ5OiBjcmVhdGVET01GYWN0b3J5KCdydWJ5JyksXG4gIHM6IGNyZWF0ZURPTUZhY3RvcnkoJ3MnKSxcbiAgc2FtcDogY3JlYXRlRE9NRmFjdG9yeSgnc2FtcCcpLFxuICBzY3JpcHQ6IGNyZWF0ZURPTUZhY3RvcnkoJ3NjcmlwdCcpLFxuICBzZWN0aW9uOiBjcmVhdGVET01GYWN0b3J5KCdzZWN0aW9uJyksXG4gIHNlbGVjdDogY3JlYXRlRE9NRmFjdG9yeSgnc2VsZWN0JyksXG4gIHNtYWxsOiBjcmVhdGVET01GYWN0b3J5KCdzbWFsbCcpLFxuICBzb3VyY2U6IGNyZWF0ZURPTUZhY3RvcnkoJ3NvdXJjZScpLFxuICBzcGFuOiBjcmVhdGVET01GYWN0b3J5KCdzcGFuJyksXG4gIHN0cm9uZzogY3JlYXRlRE9NRmFjdG9yeSgnc3Ryb25nJyksXG4gIHN0eWxlOiBjcmVhdGVET01GYWN0b3J5KCdzdHlsZScpLFxuICBzdWI6IGNyZWF0ZURPTUZhY3RvcnkoJ3N1YicpLFxuICBzdW1tYXJ5OiBjcmVhdGVET01GYWN0b3J5KCdzdW1tYXJ5JyksXG4gIHN1cDogY3JlYXRlRE9NRmFjdG9yeSgnc3VwJyksXG4gIHRhYmxlOiBjcmVhdGVET01GYWN0b3J5KCd0YWJsZScpLFxuICB0Ym9keTogY3JlYXRlRE9NRmFjdG9yeSgndGJvZHknKSxcbiAgdGQ6IGNyZWF0ZURPTUZhY3RvcnkoJ3RkJyksXG4gIHRleHRhcmVhOiBjcmVhdGVET01GYWN0b3J5KCd0ZXh0YXJlYScpLFxuICB0Zm9vdDogY3JlYXRlRE9NRmFjdG9yeSgndGZvb3QnKSxcbiAgdGg6IGNyZWF0ZURPTUZhY3RvcnkoJ3RoJyksXG4gIHRoZWFkOiBjcmVhdGVET01GYWN0b3J5KCd0aGVhZCcpLFxuICB0aW1lOiBjcmVhdGVET01GYWN0b3J5KCd0aW1lJyksXG4gIHRpdGxlOiBjcmVhdGVET01GYWN0b3J5KCd0aXRsZScpLFxuICB0cjogY3JlYXRlRE9NRmFjdG9yeSgndHInKSxcbiAgdHJhY2s6IGNyZWF0ZURPTUZhY3RvcnkoJ3RyYWNrJyksXG4gIHU6IGNyZWF0ZURPTUZhY3RvcnkoJ3UnKSxcbiAgdWw6IGNyZWF0ZURPTUZhY3RvcnkoJ3VsJyksXG4gICd2YXInOiBjcmVhdGVET01GYWN0b3J5KCd2YXInKSxcbiAgdmlkZW86IGNyZWF0ZURPTUZhY3RvcnkoJ3ZpZGVvJyksXG4gIHdicjogY3JlYXRlRE9NRmFjdG9yeSgnd2JyJyksXG5cbiAgLy8gU1ZHXG4gIGNpcmNsZTogY3JlYXRlRE9NRmFjdG9yeSgnY2lyY2xlJyksXG4gIGNsaXBQYXRoOiBjcmVhdGVET01GYWN0b3J5KCdjbGlwUGF0aCcpLFxuICBkZWZzOiBjcmVhdGVET01GYWN0b3J5KCdkZWZzJyksXG4gIGVsbGlwc2U6IGNyZWF0ZURPTUZhY3RvcnkoJ2VsbGlwc2UnKSxcbiAgZzogY3JlYXRlRE9NRmFjdG9yeSgnZycpLFxuICBpbWFnZTogY3JlYXRlRE9NRmFjdG9yeSgnaW1hZ2UnKSxcbiAgbGluZTogY3JlYXRlRE9NRmFjdG9yeSgnbGluZScpLFxuICBsaW5lYXJHcmFkaWVudDogY3JlYXRlRE9NRmFjdG9yeSgnbGluZWFyR3JhZGllbnQnKSxcbiAgbWFzazogY3JlYXRlRE9NRmFjdG9yeSgnbWFzaycpLFxuICBwYXRoOiBjcmVhdGVET01GYWN0b3J5KCdwYXRoJyksXG4gIHBhdHRlcm46IGNyZWF0ZURPTUZhY3RvcnkoJ3BhdHRlcm4nKSxcbiAgcG9seWdvbjogY3JlYXRlRE9NRmFjdG9yeSgncG9seWdvbicpLFxuICBwb2x5bGluZTogY3JlYXRlRE9NRmFjdG9yeSgncG9seWxpbmUnKSxcbiAgcmFkaWFsR3JhZGllbnQ6IGNyZWF0ZURPTUZhY3RvcnkoJ3JhZGlhbEdyYWRpZW50JyksXG4gIHJlY3Q6IGNyZWF0ZURPTUZhY3RvcnkoJ3JlY3QnKSxcbiAgc3RvcDogY3JlYXRlRE9NRmFjdG9yeSgnc3RvcCcpLFxuICBzdmc6IGNyZWF0ZURPTUZhY3RvcnkoJ3N2ZycpLFxuICB0ZXh0OiBjcmVhdGVET01GYWN0b3J5KCd0ZXh0JyksXG4gIHRzcGFuOiBjcmVhdGVET01GYWN0b3J5KCd0c3BhbicpXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0RE9NRmFjdG9yaWVzOyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTQtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBfYXNzaWduID0gcmVxdWlyZSgnb2JqZWN0LWFzc2lnbicpO1xuXG52YXIgUmVhY3RDdXJyZW50T3duZXIgPSByZXF1aXJlKCcuL1JlYWN0Q3VycmVudE93bmVyJyk7XG5cbnZhciB3YXJuaW5nID0gcmVxdWlyZSgnZmJqcy9saWIvd2FybmluZycpO1xudmFyIGNhbkRlZmluZVByb3BlcnR5ID0gcmVxdWlyZSgnLi9jYW5EZWZpbmVQcm9wZXJ0eScpO1xudmFyIGhhc093blByb3BlcnR5ID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcblxudmFyIFJFQUNUX0VMRU1FTlRfVFlQRSA9IHJlcXVpcmUoJy4vUmVhY3RFbGVtZW50U3ltYm9sJyk7XG5cbnZhciBSRVNFUlZFRF9QUk9QUyA9IHtcbiAga2V5OiB0cnVlLFxuICByZWY6IHRydWUsXG4gIF9fc2VsZjogdHJ1ZSxcbiAgX19zb3VyY2U6IHRydWVcbn07XG5cbnZhciBzcGVjaWFsUHJvcEtleVdhcm5pbmdTaG93biwgc3BlY2lhbFByb3BSZWZXYXJuaW5nU2hvd247XG5cbmZ1bmN0aW9uIGhhc1ZhbGlkUmVmKGNvbmZpZykge1xuICBpZiAoXCJkZXZlbG9wbWVudFwiICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChjb25maWcsICdyZWYnKSkge1xuICAgICAgdmFyIGdldHRlciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoY29uZmlnLCAncmVmJykuZ2V0O1xuICAgICAgaWYgKGdldHRlciAmJiBnZXR0ZXIuaXNSZWFjdFdhcm5pbmcpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gY29uZmlnLnJlZiAhPT0gdW5kZWZpbmVkO1xufVxuXG5mdW5jdGlvbiBoYXNWYWxpZEtleShjb25maWcpIHtcbiAgaWYgKFwiZGV2ZWxvcG1lbnRcIiAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgaWYgKGhhc093blByb3BlcnR5LmNhbGwoY29uZmlnLCAna2V5JykpIHtcbiAgICAgIHZhciBnZXR0ZXIgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGNvbmZpZywgJ2tleScpLmdldDtcbiAgICAgIGlmIChnZXR0ZXIgJiYgZ2V0dGVyLmlzUmVhY3RXYXJuaW5nKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIGNvbmZpZy5rZXkgIT09IHVuZGVmaW5lZDtcbn1cblxuZnVuY3Rpb24gZGVmaW5lS2V5UHJvcFdhcm5pbmdHZXR0ZXIocHJvcHMsIGRpc3BsYXlOYW1lKSB7XG4gIHZhciB3YXJuQWJvdXRBY2Nlc3NpbmdLZXkgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKCFzcGVjaWFsUHJvcEtleVdhcm5pbmdTaG93bikge1xuICAgICAgc3BlY2lhbFByb3BLZXlXYXJuaW5nU2hvd24gPSB0cnVlO1xuICAgICAgXCJkZXZlbG9wbWVudFwiICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKGZhbHNlLCAnJXM6IGBrZXlgIGlzIG5vdCBhIHByb3AuIFRyeWluZyB0byBhY2Nlc3MgaXQgd2lsbCByZXN1bHQgJyArICdpbiBgdW5kZWZpbmVkYCBiZWluZyByZXR1cm5lZC4gSWYgeW91IG5lZWQgdG8gYWNjZXNzIHRoZSBzYW1lICcgKyAndmFsdWUgd2l0aGluIHRoZSBjaGlsZCBjb21wb25lbnQsIHlvdSBzaG91bGQgcGFzcyBpdCBhcyBhIGRpZmZlcmVudCAnICsgJ3Byb3AuIChodHRwczovL2ZiLm1lL3JlYWN0LXNwZWNpYWwtcHJvcHMpJywgZGlzcGxheU5hbWUpIDogdm9pZCAwO1xuICAgIH1cbiAgfTtcbiAgd2FybkFib3V0QWNjZXNzaW5nS2V5LmlzUmVhY3RXYXJuaW5nID0gdHJ1ZTtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHByb3BzLCAna2V5Jywge1xuICAgIGdldDogd2FybkFib3V0QWNjZXNzaW5nS2V5LFxuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICB9KTtcbn1cblxuZnVuY3Rpb24gZGVmaW5lUmVmUHJvcFdhcm5pbmdHZXR0ZXIocHJvcHMsIGRpc3BsYXlOYW1lKSB7XG4gIHZhciB3YXJuQWJvdXRBY2Nlc3NpbmdSZWYgPSBmdW5jdGlvbiAoKSB7XG4gICAgaWYgKCFzcGVjaWFsUHJvcFJlZldhcm5pbmdTaG93bikge1xuICAgICAgc3BlY2lhbFByb3BSZWZXYXJuaW5nU2hvd24gPSB0cnVlO1xuICAgICAgXCJkZXZlbG9wbWVudFwiICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKGZhbHNlLCAnJXM6IGByZWZgIGlzIG5vdCBhIHByb3AuIFRyeWluZyB0byBhY2Nlc3MgaXQgd2lsbCByZXN1bHQgJyArICdpbiBgdW5kZWZpbmVkYCBiZWluZyByZXR1cm5lZC4gSWYgeW91IG5lZWQgdG8gYWNjZXNzIHRoZSBzYW1lICcgKyAndmFsdWUgd2l0aGluIHRoZSBjaGlsZCBjb21wb25lbnQsIHlvdSBzaG91bGQgcGFzcyBpdCBhcyBhIGRpZmZlcmVudCAnICsgJ3Byb3AuIChodHRwczovL2ZiLm1lL3JlYWN0LXNwZWNpYWwtcHJvcHMpJywgZGlzcGxheU5hbWUpIDogdm9pZCAwO1xuICAgIH1cbiAgfTtcbiAgd2FybkFib3V0QWNjZXNzaW5nUmVmLmlzUmVhY3RXYXJuaW5nID0gdHJ1ZTtcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHByb3BzLCAncmVmJywge1xuICAgIGdldDogd2FybkFib3V0QWNjZXNzaW5nUmVmLFxuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICB9KTtcbn1cblxuLyoqXG4gKiBGYWN0b3J5IG1ldGhvZCB0byBjcmVhdGUgYSBuZXcgUmVhY3QgZWxlbWVudC4gVGhpcyBubyBsb25nZXIgYWRoZXJlcyB0b1xuICogdGhlIGNsYXNzIHBhdHRlcm4sIHNvIGRvIG5vdCB1c2UgbmV3IHRvIGNhbGwgaXQuIEFsc28sIG5vIGluc3RhbmNlb2YgY2hlY2tcbiAqIHdpbGwgd29yay4gSW5zdGVhZCB0ZXN0ICQkdHlwZW9mIGZpZWxkIGFnYWluc3QgU3ltYm9sLmZvcigncmVhY3QuZWxlbWVudCcpIHRvIGNoZWNrXG4gKiBpZiBzb21ldGhpbmcgaXMgYSBSZWFjdCBFbGVtZW50LlxuICpcbiAqIEBwYXJhbSB7Kn0gdHlwZVxuICogQHBhcmFtIHsqfSBrZXlcbiAqIEBwYXJhbSB7c3RyaW5nfG9iamVjdH0gcmVmXG4gKiBAcGFyYW0geyp9IHNlbGYgQSAqdGVtcG9yYXJ5KiBoZWxwZXIgdG8gZGV0ZWN0IHBsYWNlcyB3aGVyZSBgdGhpc2AgaXNcbiAqIGRpZmZlcmVudCBmcm9tIHRoZSBgb3duZXJgIHdoZW4gUmVhY3QuY3JlYXRlRWxlbWVudCBpcyBjYWxsZWQsIHNvIHRoYXQgd2VcbiAqIGNhbiB3YXJuLiBXZSB3YW50IHRvIGdldCByaWQgb2Ygb3duZXIgYW5kIHJlcGxhY2Ugc3RyaW5nIGByZWZgcyB3aXRoIGFycm93XG4gKiBmdW5jdGlvbnMsIGFuZCBhcyBsb25nIGFzIGB0aGlzYCBhbmQgb3duZXIgYXJlIHRoZSBzYW1lLCB0aGVyZSB3aWxsIGJlIG5vXG4gKiBjaGFuZ2UgaW4gYmVoYXZpb3IuXG4gKiBAcGFyYW0geyp9IHNvdXJjZSBBbiBhbm5vdGF0aW9uIG9iamVjdCAoYWRkZWQgYnkgYSB0cmFuc3BpbGVyIG9yIG90aGVyd2lzZSlcbiAqIGluZGljYXRpbmcgZmlsZW5hbWUsIGxpbmUgbnVtYmVyLCBhbmQvb3Igb3RoZXIgaW5mb3JtYXRpb24uXG4gKiBAcGFyYW0geyp9IG93bmVyXG4gKiBAcGFyYW0geyp9IHByb3BzXG4gKiBAaW50ZXJuYWxcbiAqL1xudmFyIFJlYWN0RWxlbWVudCA9IGZ1bmN0aW9uICh0eXBlLCBrZXksIHJlZiwgc2VsZiwgc291cmNlLCBvd25lciwgcHJvcHMpIHtcbiAgdmFyIGVsZW1lbnQgPSB7XG4gICAgLy8gVGhpcyB0YWcgYWxsb3cgdXMgdG8gdW5pcXVlbHkgaWRlbnRpZnkgdGhpcyBhcyBhIFJlYWN0IEVsZW1lbnRcbiAgICAkJHR5cGVvZjogUkVBQ1RfRUxFTUVOVF9UWVBFLFxuXG4gICAgLy8gQnVpbHQtaW4gcHJvcGVydGllcyB0aGF0IGJlbG9uZyBvbiB0aGUgZWxlbWVudFxuICAgIHR5cGU6IHR5cGUsXG4gICAga2V5OiBrZXksXG4gICAgcmVmOiByZWYsXG4gICAgcHJvcHM6IHByb3BzLFxuXG4gICAgLy8gUmVjb3JkIHRoZSBjb21wb25lbnQgcmVzcG9uc2libGUgZm9yIGNyZWF0aW5nIHRoaXMgZWxlbWVudC5cbiAgICBfb3duZXI6IG93bmVyXG4gIH07XG5cbiAgaWYgKFwiZGV2ZWxvcG1lbnRcIiAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgLy8gVGhlIHZhbGlkYXRpb24gZmxhZyBpcyBjdXJyZW50bHkgbXV0YXRpdmUuIFdlIHB1dCBpdCBvblxuICAgIC8vIGFuIGV4dGVybmFsIGJhY2tpbmcgc3RvcmUgc28gdGhhdCB3ZSBjYW4gZnJlZXplIHRoZSB3aG9sZSBvYmplY3QuXG4gICAgLy8gVGhpcyBjYW4gYmUgcmVwbGFjZWQgd2l0aCBhIFdlYWtNYXAgb25jZSB0aGV5IGFyZSBpbXBsZW1lbnRlZCBpblxuICAgIC8vIGNvbW1vbmx5IHVzZWQgZGV2ZWxvcG1lbnQgZW52aXJvbm1lbnRzLlxuICAgIGVsZW1lbnQuX3N0b3JlID0ge307XG5cbiAgICAvLyBUbyBtYWtlIGNvbXBhcmluZyBSZWFjdEVsZW1lbnRzIGVhc2llciBmb3IgdGVzdGluZyBwdXJwb3Nlcywgd2UgbWFrZVxuICAgIC8vIHRoZSB2YWxpZGF0aW9uIGZsYWcgbm9uLWVudW1lcmFibGUgKHdoZXJlIHBvc3NpYmxlLCB3aGljaCBzaG91bGRcbiAgICAvLyBpbmNsdWRlIGV2ZXJ5IGVudmlyb25tZW50IHdlIHJ1biB0ZXN0cyBpbiksIHNvIHRoZSB0ZXN0IGZyYW1ld29ya1xuICAgIC8vIGlnbm9yZXMgaXQuXG4gICAgaWYgKGNhbkRlZmluZVByb3BlcnR5KSB7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoZWxlbWVudC5fc3RvcmUsICd2YWxpZGF0ZWQnLCB7XG4gICAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgdmFsdWU6IGZhbHNlXG4gICAgICB9KTtcbiAgICAgIC8vIHNlbGYgYW5kIHNvdXJjZSBhcmUgREVWIG9ubHkgcHJvcGVydGllcy5cbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlbGVtZW50LCAnX3NlbGYnLCB7XG4gICAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICB3cml0YWJsZTogZmFsc2UsXG4gICAgICAgIHZhbHVlOiBzZWxmXG4gICAgICB9KTtcbiAgICAgIC8vIFR3byBlbGVtZW50cyBjcmVhdGVkIGluIHR3byBkaWZmZXJlbnQgcGxhY2VzIHNob3VsZCBiZSBjb25zaWRlcmVkXG4gICAgICAvLyBlcXVhbCBmb3IgdGVzdGluZyBwdXJwb3NlcyBhbmQgdGhlcmVmb3JlIHdlIGhpZGUgaXQgZnJvbSBlbnVtZXJhdGlvbi5cbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlbGVtZW50LCAnX3NvdXJjZScsIHtcbiAgICAgICAgY29uZmlndXJhYmxlOiBmYWxzZSxcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgIHdyaXRhYmxlOiBmYWxzZSxcbiAgICAgICAgdmFsdWU6IHNvdXJjZVxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVsZW1lbnQuX3N0b3JlLnZhbGlkYXRlZCA9IGZhbHNlO1xuICAgICAgZWxlbWVudC5fc2VsZiA9IHNlbGY7XG4gICAgICBlbGVtZW50Ll9zb3VyY2UgPSBzb3VyY2U7XG4gICAgfVxuICAgIGlmIChPYmplY3QuZnJlZXplKSB7XG4gICAgICBPYmplY3QuZnJlZXplKGVsZW1lbnQucHJvcHMpO1xuICAgICAgT2JqZWN0LmZyZWV6ZShlbGVtZW50KTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZWxlbWVudDtcbn07XG5cbi8qKlxuICogQ3JlYXRlIGFuZCByZXR1cm4gYSBuZXcgUmVhY3RFbGVtZW50IG9mIHRoZSBnaXZlbiB0eXBlLlxuICogU2VlIGh0dHBzOi8vZmFjZWJvb2suZ2l0aHViLmlvL3JlYWN0L2RvY3MvdG9wLWxldmVsLWFwaS5odG1sI3JlYWN0LmNyZWF0ZWVsZW1lbnRcbiAqL1xuUmVhY3RFbGVtZW50LmNyZWF0ZUVsZW1lbnQgPSBmdW5jdGlvbiAodHlwZSwgY29uZmlnLCBjaGlsZHJlbikge1xuICB2YXIgcHJvcE5hbWU7XG5cbiAgLy8gUmVzZXJ2ZWQgbmFtZXMgYXJlIGV4dHJhY3RlZFxuICB2YXIgcHJvcHMgPSB7fTtcblxuICB2YXIga2V5ID0gbnVsbDtcbiAgdmFyIHJlZiA9IG51bGw7XG4gIHZhciBzZWxmID0gbnVsbDtcbiAgdmFyIHNvdXJjZSA9IG51bGw7XG5cbiAgaWYgKGNvbmZpZyAhPSBudWxsKSB7XG4gICAgaWYgKGhhc1ZhbGlkUmVmKGNvbmZpZykpIHtcbiAgICAgIHJlZiA9IGNvbmZpZy5yZWY7XG4gICAgfVxuICAgIGlmIChoYXNWYWxpZEtleShjb25maWcpKSB7XG4gICAgICBrZXkgPSAnJyArIGNvbmZpZy5rZXk7XG4gICAgfVxuXG4gICAgc2VsZiA9IGNvbmZpZy5fX3NlbGYgPT09IHVuZGVmaW5lZCA/IG51bGwgOiBjb25maWcuX19zZWxmO1xuICAgIHNvdXJjZSA9IGNvbmZpZy5fX3NvdXJjZSA9PT0gdW5kZWZpbmVkID8gbnVsbCA6IGNvbmZpZy5fX3NvdXJjZTtcbiAgICAvLyBSZW1haW5pbmcgcHJvcGVydGllcyBhcmUgYWRkZWQgdG8gYSBuZXcgcHJvcHMgb2JqZWN0XG4gICAgZm9yIChwcm9wTmFtZSBpbiBjb25maWcpIHtcbiAgICAgIGlmIChoYXNPd25Qcm9wZXJ0eS5jYWxsKGNvbmZpZywgcHJvcE5hbWUpICYmICFSRVNFUlZFRF9QUk9QUy5oYXNPd25Qcm9wZXJ0eShwcm9wTmFtZSkpIHtcbiAgICAgICAgcHJvcHNbcHJvcE5hbWVdID0gY29uZmlnW3Byb3BOYW1lXTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBDaGlsZHJlbiBjYW4gYmUgbW9yZSB0aGFuIG9uZSBhcmd1bWVudCwgYW5kIHRob3NlIGFyZSB0cmFuc2ZlcnJlZCBvbnRvXG4gIC8vIHRoZSBuZXdseSBhbGxvY2F0ZWQgcHJvcHMgb2JqZWN0LlxuICB2YXIgY2hpbGRyZW5MZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoIC0gMjtcbiAgaWYgKGNoaWxkcmVuTGVuZ3RoID09PSAxKSB7XG4gICAgcHJvcHMuY2hpbGRyZW4gPSBjaGlsZHJlbjtcbiAgfSBlbHNlIGlmIChjaGlsZHJlbkxlbmd0aCA+IDEpIHtcbiAgICB2YXIgY2hpbGRBcnJheSA9IEFycmF5KGNoaWxkcmVuTGVuZ3RoKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoaWxkcmVuTGVuZ3RoOyBpKyspIHtcbiAgICAgIGNoaWxkQXJyYXlbaV0gPSBhcmd1bWVudHNbaSArIDJdO1xuICAgIH1cbiAgICBpZiAoXCJkZXZlbG9wbWVudFwiICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIGlmIChPYmplY3QuZnJlZXplKSB7XG4gICAgICAgIE9iamVjdC5mcmVlemUoY2hpbGRBcnJheSk7XG4gICAgICB9XG4gICAgfVxuICAgIHByb3BzLmNoaWxkcmVuID0gY2hpbGRBcnJheTtcbiAgfVxuXG4gIC8vIFJlc29sdmUgZGVmYXVsdCBwcm9wc1xuICBpZiAodHlwZSAmJiB0eXBlLmRlZmF1bHRQcm9wcykge1xuICAgIHZhciBkZWZhdWx0UHJvcHMgPSB0eXBlLmRlZmF1bHRQcm9wcztcbiAgICBmb3IgKHByb3BOYW1lIGluIGRlZmF1bHRQcm9wcykge1xuICAgICAgaWYgKHByb3BzW3Byb3BOYW1lXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHByb3BzW3Byb3BOYW1lXSA9IGRlZmF1bHRQcm9wc1twcm9wTmFtZV07XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGlmIChcImRldmVsb3BtZW50XCIgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIGlmIChrZXkgfHwgcmVmKSB7XG4gICAgICBpZiAodHlwZW9mIHByb3BzLiQkdHlwZW9mID09PSAndW5kZWZpbmVkJyB8fCBwcm9wcy4kJHR5cGVvZiAhPT0gUkVBQ1RfRUxFTUVOVF9UWVBFKSB7XG4gICAgICAgIHZhciBkaXNwbGF5TmFtZSA9IHR5cGVvZiB0eXBlID09PSAnZnVuY3Rpb24nID8gdHlwZS5kaXNwbGF5TmFtZSB8fCB0eXBlLm5hbWUgfHwgJ1Vua25vd24nIDogdHlwZTtcbiAgICAgICAgaWYgKGtleSkge1xuICAgICAgICAgIGRlZmluZUtleVByb3BXYXJuaW5nR2V0dGVyKHByb3BzLCBkaXNwbGF5TmFtZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJlZikge1xuICAgICAgICAgIGRlZmluZVJlZlByb3BXYXJuaW5nR2V0dGVyKHByb3BzLCBkaXNwbGF5TmFtZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIFJlYWN0RWxlbWVudCh0eXBlLCBrZXksIHJlZiwgc2VsZiwgc291cmNlLCBSZWFjdEN1cnJlbnRPd25lci5jdXJyZW50LCBwcm9wcyk7XG59O1xuXG4vKipcbiAqIFJldHVybiBhIGZ1bmN0aW9uIHRoYXQgcHJvZHVjZXMgUmVhY3RFbGVtZW50cyBvZiBhIGdpdmVuIHR5cGUuXG4gKiBTZWUgaHR0cHM6Ly9mYWNlYm9vay5naXRodWIuaW8vcmVhY3QvZG9jcy90b3AtbGV2ZWwtYXBpLmh0bWwjcmVhY3QuY3JlYXRlZmFjdG9yeVxuICovXG5SZWFjdEVsZW1lbnQuY3JlYXRlRmFjdG9yeSA9IGZ1bmN0aW9uICh0eXBlKSB7XG4gIHZhciBmYWN0b3J5ID0gUmVhY3RFbGVtZW50LmNyZWF0ZUVsZW1lbnQuYmluZChudWxsLCB0eXBlKTtcbiAgLy8gRXhwb3NlIHRoZSB0eXBlIG9uIHRoZSBmYWN0b3J5IGFuZCB0aGUgcHJvdG90eXBlIHNvIHRoYXQgaXQgY2FuIGJlXG4gIC8vIGVhc2lseSBhY2Nlc3NlZCBvbiBlbGVtZW50cy4gRS5nLiBgPEZvbyAvPi50eXBlID09PSBGb29gLlxuICAvLyBUaGlzIHNob3VsZCBub3QgYmUgbmFtZWQgYGNvbnN0cnVjdG9yYCBzaW5jZSB0aGlzIG1heSBub3QgYmUgdGhlIGZ1bmN0aW9uXG4gIC8vIHRoYXQgY3JlYXRlZCB0aGUgZWxlbWVudCwgYW5kIGl0IG1heSBub3QgZXZlbiBiZSBhIGNvbnN0cnVjdG9yLlxuICAvLyBMZWdhY3kgaG9vayBUT0RPOiBXYXJuIGlmIHRoaXMgaXMgYWNjZXNzZWRcbiAgZmFjdG9yeS50eXBlID0gdHlwZTtcbiAgcmV0dXJuIGZhY3Rvcnk7XG59O1xuXG5SZWFjdEVsZW1lbnQuY2xvbmVBbmRSZXBsYWNlS2V5ID0gZnVuY3Rpb24gKG9sZEVsZW1lbnQsIG5ld0tleSkge1xuICB2YXIgbmV3RWxlbWVudCA9IFJlYWN0RWxlbWVudChvbGRFbGVtZW50LnR5cGUsIG5ld0tleSwgb2xkRWxlbWVudC5yZWYsIG9sZEVsZW1lbnQuX3NlbGYsIG9sZEVsZW1lbnQuX3NvdXJjZSwgb2xkRWxlbWVudC5fb3duZXIsIG9sZEVsZW1lbnQucHJvcHMpO1xuXG4gIHJldHVybiBuZXdFbGVtZW50O1xufTtcblxuLyoqXG4gKiBDbG9uZSBhbmQgcmV0dXJuIGEgbmV3IFJlYWN0RWxlbWVudCB1c2luZyBlbGVtZW50IGFzIHRoZSBzdGFydGluZyBwb2ludC5cbiAqIFNlZSBodHRwczovL2ZhY2Vib29rLmdpdGh1Yi5pby9yZWFjdC9kb2NzL3RvcC1sZXZlbC1hcGkuaHRtbCNyZWFjdC5jbG9uZWVsZW1lbnRcbiAqL1xuUmVhY3RFbGVtZW50LmNsb25lRWxlbWVudCA9IGZ1bmN0aW9uIChlbGVtZW50LCBjb25maWcsIGNoaWxkcmVuKSB7XG4gIHZhciBwcm9wTmFtZTtcblxuICAvLyBPcmlnaW5hbCBwcm9wcyBhcmUgY29waWVkXG4gIHZhciBwcm9wcyA9IF9hc3NpZ24oe30sIGVsZW1lbnQucHJvcHMpO1xuXG4gIC8vIFJlc2VydmVkIG5hbWVzIGFyZSBleHRyYWN0ZWRcbiAgdmFyIGtleSA9IGVsZW1lbnQua2V5O1xuICB2YXIgcmVmID0gZWxlbWVudC5yZWY7XG4gIC8vIFNlbGYgaXMgcHJlc2VydmVkIHNpbmNlIHRoZSBvd25lciBpcyBwcmVzZXJ2ZWQuXG4gIHZhciBzZWxmID0gZWxlbWVudC5fc2VsZjtcbiAgLy8gU291cmNlIGlzIHByZXNlcnZlZCBzaW5jZSBjbG9uZUVsZW1lbnQgaXMgdW5saWtlbHkgdG8gYmUgdGFyZ2V0ZWQgYnkgYVxuICAvLyB0cmFuc3BpbGVyLCBhbmQgdGhlIG9yaWdpbmFsIHNvdXJjZSBpcyBwcm9iYWJseSBhIGJldHRlciBpbmRpY2F0b3Igb2YgdGhlXG4gIC8vIHRydWUgb3duZXIuXG4gIHZhciBzb3VyY2UgPSBlbGVtZW50Ll9zb3VyY2U7XG5cbiAgLy8gT3duZXIgd2lsbCBiZSBwcmVzZXJ2ZWQsIHVubGVzcyByZWYgaXMgb3ZlcnJpZGRlblxuICB2YXIgb3duZXIgPSBlbGVtZW50Ll9vd25lcjtcblxuICBpZiAoY29uZmlnICE9IG51bGwpIHtcbiAgICBpZiAoaGFzVmFsaWRSZWYoY29uZmlnKSkge1xuICAgICAgLy8gU2lsZW50bHkgc3RlYWwgdGhlIHJlZiBmcm9tIHRoZSBwYXJlbnQuXG4gICAgICByZWYgPSBjb25maWcucmVmO1xuICAgICAgb3duZXIgPSBSZWFjdEN1cnJlbnRPd25lci5jdXJyZW50O1xuICAgIH1cbiAgICBpZiAoaGFzVmFsaWRLZXkoY29uZmlnKSkge1xuICAgICAga2V5ID0gJycgKyBjb25maWcua2V5O1xuICAgIH1cblxuICAgIC8vIFJlbWFpbmluZyBwcm9wZXJ0aWVzIG92ZXJyaWRlIGV4aXN0aW5nIHByb3BzXG4gICAgdmFyIGRlZmF1bHRQcm9wcztcbiAgICBpZiAoZWxlbWVudC50eXBlICYmIGVsZW1lbnQudHlwZS5kZWZhdWx0UHJvcHMpIHtcbiAgICAgIGRlZmF1bHRQcm9wcyA9IGVsZW1lbnQudHlwZS5kZWZhdWx0UHJvcHM7XG4gICAgfVxuICAgIGZvciAocHJvcE5hbWUgaW4gY29uZmlnKSB7XG4gICAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChjb25maWcsIHByb3BOYW1lKSAmJiAhUkVTRVJWRURfUFJPUFMuaGFzT3duUHJvcGVydHkocHJvcE5hbWUpKSB7XG4gICAgICAgIGlmIChjb25maWdbcHJvcE5hbWVdID09PSB1bmRlZmluZWQgJiYgZGVmYXVsdFByb3BzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAvLyBSZXNvbHZlIGRlZmF1bHQgcHJvcHNcbiAgICAgICAgICBwcm9wc1twcm9wTmFtZV0gPSBkZWZhdWx0UHJvcHNbcHJvcE5hbWVdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHByb3BzW3Byb3BOYW1lXSA9IGNvbmZpZ1twcm9wTmFtZV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBDaGlsZHJlbiBjYW4gYmUgbW9yZSB0aGFuIG9uZSBhcmd1bWVudCwgYW5kIHRob3NlIGFyZSB0cmFuc2ZlcnJlZCBvbnRvXG4gIC8vIHRoZSBuZXdseSBhbGxvY2F0ZWQgcHJvcHMgb2JqZWN0LlxuICB2YXIgY2hpbGRyZW5MZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoIC0gMjtcbiAgaWYgKGNoaWxkcmVuTGVuZ3RoID09PSAxKSB7XG4gICAgcHJvcHMuY2hpbGRyZW4gPSBjaGlsZHJlbjtcbiAgfSBlbHNlIGlmIChjaGlsZHJlbkxlbmd0aCA+IDEpIHtcbiAgICB2YXIgY2hpbGRBcnJheSA9IEFycmF5KGNoaWxkcmVuTGVuZ3RoKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoaWxkcmVuTGVuZ3RoOyBpKyspIHtcbiAgICAgIGNoaWxkQXJyYXlbaV0gPSBhcmd1bWVudHNbaSArIDJdO1xuICAgIH1cbiAgICBwcm9wcy5jaGlsZHJlbiA9IGNoaWxkQXJyYXk7XG4gIH1cblxuICByZXR1cm4gUmVhY3RFbGVtZW50KGVsZW1lbnQudHlwZSwga2V5LCByZWYsIHNlbGYsIHNvdXJjZSwgb3duZXIsIHByb3BzKTtcbn07XG5cbi8qKlxuICogVmVyaWZpZXMgdGhlIG9iamVjdCBpcyBhIFJlYWN0RWxlbWVudC5cbiAqIFNlZSBodHRwczovL2ZhY2Vib29rLmdpdGh1Yi5pby9yZWFjdC9kb2NzL3RvcC1sZXZlbC1hcGkuaHRtbCNyZWFjdC5pc3ZhbGlkZWxlbWVudFxuICogQHBhcmFtIHs/b2JqZWN0fSBvYmplY3RcbiAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgYG9iamVjdGAgaXMgYSB2YWxpZCBjb21wb25lbnQuXG4gKiBAZmluYWxcbiAqL1xuUmVhY3RFbGVtZW50LmlzVmFsaWRFbGVtZW50ID0gZnVuY3Rpb24gKG9iamVjdCkge1xuICByZXR1cm4gdHlwZW9mIG9iamVjdCA9PT0gJ29iamVjdCcgJiYgb2JqZWN0ICE9PSBudWxsICYmIG9iamVjdC4kJHR5cGVvZiA9PT0gUkVBQ1RfRUxFTUVOVF9UWVBFO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdEVsZW1lbnQ7IiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxNC1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG4vLyBUaGUgU3ltYm9sIHVzZWQgdG8gdGFnIHRoZSBSZWFjdEVsZW1lbnQgdHlwZS4gSWYgdGhlcmUgaXMgbm8gbmF0aXZlIFN5bWJvbFxuLy8gbm9yIHBvbHlmaWxsLCB0aGVuIGEgcGxhaW4gbnVtYmVyIGlzIHVzZWQgZm9yIHBlcmZvcm1hbmNlLlxuXG52YXIgUkVBQ1RfRUxFTUVOVF9UWVBFID0gdHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJyAmJiBTeW1ib2xbJ2ZvciddICYmIFN5bWJvbFsnZm9yJ10oJ3JlYWN0LmVsZW1lbnQnKSB8fCAweGVhYzc7XG5cbm1vZHVsZS5leHBvcnRzID0gUkVBQ1RfRUxFTUVOVF9UWVBFOyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTQtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqL1xuXG4vKipcbiAqIFJlYWN0RWxlbWVudFZhbGlkYXRvciBwcm92aWRlcyBhIHdyYXBwZXIgYXJvdW5kIGEgZWxlbWVudCBmYWN0b3J5XG4gKiB3aGljaCB2YWxpZGF0ZXMgdGhlIHByb3BzIHBhc3NlZCB0byB0aGUgZWxlbWVudC4gVGhpcyBpcyBpbnRlbmRlZCB0byBiZVxuICogdXNlZCBvbmx5IGluIERFViBhbmQgY291bGQgYmUgcmVwbGFjZWQgYnkgYSBzdGF0aWMgdHlwZSBjaGVja2VyIGZvciBsYW5ndWFnZXNcbiAqIHRoYXQgc3VwcG9ydCBpdC5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBSZWFjdEN1cnJlbnRPd25lciA9IHJlcXVpcmUoJy4vUmVhY3RDdXJyZW50T3duZXInKTtcbnZhciBSZWFjdENvbXBvbmVudFRyZWVIb29rID0gcmVxdWlyZSgnLi9SZWFjdENvbXBvbmVudFRyZWVIb29rJyk7XG52YXIgUmVhY3RFbGVtZW50ID0gcmVxdWlyZSgnLi9SZWFjdEVsZW1lbnQnKTtcblxudmFyIGNoZWNrUmVhY3RUeXBlU3BlYyA9IHJlcXVpcmUoJy4vY2hlY2tSZWFjdFR5cGVTcGVjJyk7XG5cbnZhciBjYW5EZWZpbmVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4vY2FuRGVmaW5lUHJvcGVydHknKTtcbnZhciBnZXRJdGVyYXRvckZuID0gcmVxdWlyZSgnLi9nZXRJdGVyYXRvckZuJyk7XG52YXIgd2FybmluZyA9IHJlcXVpcmUoJ2ZianMvbGliL3dhcm5pbmcnKTtcblxuZnVuY3Rpb24gZ2V0RGVjbGFyYXRpb25FcnJvckFkZGVuZHVtKCkge1xuICBpZiAoUmVhY3RDdXJyZW50T3duZXIuY3VycmVudCkge1xuICAgIHZhciBuYW1lID0gUmVhY3RDdXJyZW50T3duZXIuY3VycmVudC5nZXROYW1lKCk7XG4gICAgaWYgKG5hbWUpIHtcbiAgICAgIHJldHVybiAnIENoZWNrIHRoZSByZW5kZXIgbWV0aG9kIG9mIGAnICsgbmFtZSArICdgLic7XG4gICAgfVxuICB9XG4gIHJldHVybiAnJztcbn1cblxuLyoqXG4gKiBXYXJuIGlmIHRoZXJlJ3Mgbm8ga2V5IGV4cGxpY2l0bHkgc2V0IG9uIGR5bmFtaWMgYXJyYXlzIG9mIGNoaWxkcmVuIG9yXG4gKiBvYmplY3Qga2V5cyBhcmUgbm90IHZhbGlkLiBUaGlzIGFsbG93cyB1cyB0byBrZWVwIHRyYWNrIG9mIGNoaWxkcmVuIGJldHdlZW5cbiAqIHVwZGF0ZXMuXG4gKi9cbnZhciBvd25lckhhc0tleVVzZVdhcm5pbmcgPSB7fTtcblxuZnVuY3Rpb24gZ2V0Q3VycmVudENvbXBvbmVudEVycm9ySW5mbyhwYXJlbnRUeXBlKSB7XG4gIHZhciBpbmZvID0gZ2V0RGVjbGFyYXRpb25FcnJvckFkZGVuZHVtKCk7XG5cbiAgaWYgKCFpbmZvKSB7XG4gICAgdmFyIHBhcmVudE5hbWUgPSB0eXBlb2YgcGFyZW50VHlwZSA9PT0gJ3N0cmluZycgPyBwYXJlbnRUeXBlIDogcGFyZW50VHlwZS5kaXNwbGF5TmFtZSB8fCBwYXJlbnRUeXBlLm5hbWU7XG4gICAgaWYgKHBhcmVudE5hbWUpIHtcbiAgICAgIGluZm8gPSAnIENoZWNrIHRoZSB0b3AtbGV2ZWwgcmVuZGVyIGNhbGwgdXNpbmcgPCcgKyBwYXJlbnROYW1lICsgJz4uJztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGluZm87XG59XG5cbi8qKlxuICogV2FybiBpZiB0aGUgZWxlbWVudCBkb2Vzbid0IGhhdmUgYW4gZXhwbGljaXQga2V5IGFzc2lnbmVkIHRvIGl0LlxuICogVGhpcyBlbGVtZW50IGlzIGluIGFuIGFycmF5LiBUaGUgYXJyYXkgY291bGQgZ3JvdyBhbmQgc2hyaW5rIG9yIGJlXG4gKiByZW9yZGVyZWQuIEFsbCBjaGlsZHJlbiB0aGF0IGhhdmVuJ3QgYWxyZWFkeSBiZWVuIHZhbGlkYXRlZCBhcmUgcmVxdWlyZWQgdG9cbiAqIGhhdmUgYSBcImtleVwiIHByb3BlcnR5IGFzc2lnbmVkIHRvIGl0LiBFcnJvciBzdGF0dXNlcyBhcmUgY2FjaGVkIHNvIGEgd2FybmluZ1xuICogd2lsbCBvbmx5IGJlIHNob3duIG9uY2UuXG4gKlxuICogQGludGVybmFsXG4gKiBAcGFyYW0ge1JlYWN0RWxlbWVudH0gZWxlbWVudCBFbGVtZW50IHRoYXQgcmVxdWlyZXMgYSBrZXkuXG4gKiBAcGFyYW0geyp9IHBhcmVudFR5cGUgZWxlbWVudCdzIHBhcmVudCdzIHR5cGUuXG4gKi9cbmZ1bmN0aW9uIHZhbGlkYXRlRXhwbGljaXRLZXkoZWxlbWVudCwgcGFyZW50VHlwZSkge1xuICBpZiAoIWVsZW1lbnQuX3N0b3JlIHx8IGVsZW1lbnQuX3N0b3JlLnZhbGlkYXRlZCB8fCBlbGVtZW50LmtleSAhPSBudWxsKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGVsZW1lbnQuX3N0b3JlLnZhbGlkYXRlZCA9IHRydWU7XG5cbiAgdmFyIG1lbW9pemVyID0gb3duZXJIYXNLZXlVc2VXYXJuaW5nLnVuaXF1ZUtleSB8fCAob3duZXJIYXNLZXlVc2VXYXJuaW5nLnVuaXF1ZUtleSA9IHt9KTtcblxuICB2YXIgY3VycmVudENvbXBvbmVudEVycm9ySW5mbyA9IGdldEN1cnJlbnRDb21wb25lbnRFcnJvckluZm8ocGFyZW50VHlwZSk7XG4gIGlmIChtZW1vaXplcltjdXJyZW50Q29tcG9uZW50RXJyb3JJbmZvXSkge1xuICAgIHJldHVybjtcbiAgfVxuICBtZW1vaXplcltjdXJyZW50Q29tcG9uZW50RXJyb3JJbmZvXSA9IHRydWU7XG5cbiAgLy8gVXN1YWxseSB0aGUgY3VycmVudCBvd25lciBpcyB0aGUgb2ZmZW5kZXIsIGJ1dCBpZiBpdCBhY2NlcHRzIGNoaWxkcmVuIGFzIGFcbiAgLy8gcHJvcGVydHksIGl0IG1heSBiZSB0aGUgY3JlYXRvciBvZiB0aGUgY2hpbGQgdGhhdCdzIHJlc3BvbnNpYmxlIGZvclxuICAvLyBhc3NpZ25pbmcgaXQgYSBrZXkuXG4gIHZhciBjaGlsZE93bmVyID0gJyc7XG4gIGlmIChlbGVtZW50ICYmIGVsZW1lbnQuX293bmVyICYmIGVsZW1lbnQuX293bmVyICE9PSBSZWFjdEN1cnJlbnRPd25lci5jdXJyZW50KSB7XG4gICAgLy8gR2l2ZSB0aGUgY29tcG9uZW50IHRoYXQgb3JpZ2luYWxseSBjcmVhdGVkIHRoaXMgY2hpbGQuXG4gICAgY2hpbGRPd25lciA9ICcgSXQgd2FzIHBhc3NlZCBhIGNoaWxkIGZyb20gJyArIGVsZW1lbnQuX293bmVyLmdldE5hbWUoKSArICcuJztcbiAgfVxuXG4gIFwiZGV2ZWxvcG1lbnRcIiAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyhmYWxzZSwgJ0VhY2ggY2hpbGQgaW4gYW4gYXJyYXkgb3IgaXRlcmF0b3Igc2hvdWxkIGhhdmUgYSB1bmlxdWUgXCJrZXlcIiBwcm9wLicgKyAnJXMlcyBTZWUgaHR0cHM6Ly9mYi5tZS9yZWFjdC13YXJuaW5nLWtleXMgZm9yIG1vcmUgaW5mb3JtYXRpb24uJXMnLCBjdXJyZW50Q29tcG9uZW50RXJyb3JJbmZvLCBjaGlsZE93bmVyLCBSZWFjdENvbXBvbmVudFRyZWVIb29rLmdldEN1cnJlbnRTdGFja0FkZGVuZHVtKGVsZW1lbnQpKSA6IHZvaWQgMDtcbn1cblxuLyoqXG4gKiBFbnN1cmUgdGhhdCBldmVyeSBlbGVtZW50IGVpdGhlciBpcyBwYXNzZWQgaW4gYSBzdGF0aWMgbG9jYXRpb24sIGluIGFuXG4gKiBhcnJheSB3aXRoIGFuIGV4cGxpY2l0IGtleXMgcHJvcGVydHkgZGVmaW5lZCwgb3IgaW4gYW4gb2JqZWN0IGxpdGVyYWxcbiAqIHdpdGggdmFsaWQga2V5IHByb3BlcnR5LlxuICpcbiAqIEBpbnRlcm5hbFxuICogQHBhcmFtIHtSZWFjdE5vZGV9IG5vZGUgU3RhdGljYWxseSBwYXNzZWQgY2hpbGQgb2YgYW55IHR5cGUuXG4gKiBAcGFyYW0geyp9IHBhcmVudFR5cGUgbm9kZSdzIHBhcmVudCdzIHR5cGUuXG4gKi9cbmZ1bmN0aW9uIHZhbGlkYXRlQ2hpbGRLZXlzKG5vZGUsIHBhcmVudFR5cGUpIHtcbiAgaWYgKHR5cGVvZiBub2RlICE9PSAnb2JqZWN0Jykge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoQXJyYXkuaXNBcnJheShub2RlKSkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbm9kZS5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGNoaWxkID0gbm9kZVtpXTtcbiAgICAgIGlmIChSZWFjdEVsZW1lbnQuaXNWYWxpZEVsZW1lbnQoY2hpbGQpKSB7XG4gICAgICAgIHZhbGlkYXRlRXhwbGljaXRLZXkoY2hpbGQsIHBhcmVudFR5cGUpO1xuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIGlmIChSZWFjdEVsZW1lbnQuaXNWYWxpZEVsZW1lbnQobm9kZSkpIHtcbiAgICAvLyBUaGlzIGVsZW1lbnQgd2FzIHBhc3NlZCBpbiBhIHZhbGlkIGxvY2F0aW9uLlxuICAgIGlmIChub2RlLl9zdG9yZSkge1xuICAgICAgbm9kZS5fc3RvcmUudmFsaWRhdGVkID0gdHJ1ZTtcbiAgICB9XG4gIH0gZWxzZSBpZiAobm9kZSkge1xuICAgIHZhciBpdGVyYXRvckZuID0gZ2V0SXRlcmF0b3JGbihub2RlKTtcbiAgICAvLyBFbnRyeSBpdGVyYXRvcnMgcHJvdmlkZSBpbXBsaWNpdCBrZXlzLlxuICAgIGlmIChpdGVyYXRvckZuKSB7XG4gICAgICBpZiAoaXRlcmF0b3JGbiAhPT0gbm9kZS5lbnRyaWVzKSB7XG4gICAgICAgIHZhciBpdGVyYXRvciA9IGl0ZXJhdG9yRm4uY2FsbChub2RlKTtcbiAgICAgICAgdmFyIHN0ZXA7XG4gICAgICAgIHdoaWxlICghKHN0ZXAgPSBpdGVyYXRvci5uZXh0KCkpLmRvbmUpIHtcbiAgICAgICAgICBpZiAoUmVhY3RFbGVtZW50LmlzVmFsaWRFbGVtZW50KHN0ZXAudmFsdWUpKSB7XG4gICAgICAgICAgICB2YWxpZGF0ZUV4cGxpY2l0S2V5KHN0ZXAudmFsdWUsIHBhcmVudFR5cGUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIEdpdmVuIGFuIGVsZW1lbnQsIHZhbGlkYXRlIHRoYXQgaXRzIHByb3BzIGZvbGxvdyB0aGUgcHJvcFR5cGVzIGRlZmluaXRpb24sXG4gKiBwcm92aWRlZCBieSB0aGUgdHlwZS5cbiAqXG4gKiBAcGFyYW0ge1JlYWN0RWxlbWVudH0gZWxlbWVudFxuICovXG5mdW5jdGlvbiB2YWxpZGF0ZVByb3BUeXBlcyhlbGVtZW50KSB7XG4gIHZhciBjb21wb25lbnRDbGFzcyA9IGVsZW1lbnQudHlwZTtcbiAgaWYgKHR5cGVvZiBjb21wb25lbnRDbGFzcyAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybjtcbiAgfVxuICB2YXIgbmFtZSA9IGNvbXBvbmVudENsYXNzLmRpc3BsYXlOYW1lIHx8IGNvbXBvbmVudENsYXNzLm5hbWU7XG4gIGlmIChjb21wb25lbnRDbGFzcy5wcm9wVHlwZXMpIHtcbiAgICBjaGVja1JlYWN0VHlwZVNwZWMoY29tcG9uZW50Q2xhc3MucHJvcFR5cGVzLCBlbGVtZW50LnByb3BzLCAncHJvcCcsIG5hbWUsIGVsZW1lbnQsIG51bGwpO1xuICB9XG4gIGlmICh0eXBlb2YgY29tcG9uZW50Q2xhc3MuZ2V0RGVmYXVsdFByb3BzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgXCJkZXZlbG9wbWVudFwiICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKGNvbXBvbmVudENsYXNzLmdldERlZmF1bHRQcm9wcy5pc1JlYWN0Q2xhc3NBcHByb3ZlZCwgJ2dldERlZmF1bHRQcm9wcyBpcyBvbmx5IHVzZWQgb24gY2xhc3NpYyBSZWFjdC5jcmVhdGVDbGFzcyAnICsgJ2RlZmluaXRpb25zLiBVc2UgYSBzdGF0aWMgcHJvcGVydHkgbmFtZWQgYGRlZmF1bHRQcm9wc2AgaW5zdGVhZC4nKSA6IHZvaWQgMDtcbiAgfVxufVxuXG52YXIgUmVhY3RFbGVtZW50VmFsaWRhdG9yID0ge1xuXG4gIGNyZWF0ZUVsZW1lbnQ6IGZ1bmN0aW9uICh0eXBlLCBwcm9wcywgY2hpbGRyZW4pIHtcbiAgICB2YXIgdmFsaWRUeXBlID0gdHlwZW9mIHR5cGUgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiB0eXBlID09PSAnZnVuY3Rpb24nO1xuICAgIC8vIFdlIHdhcm4gaW4gdGhpcyBjYXNlIGJ1dCBkb24ndCB0aHJvdy4gV2UgZXhwZWN0IHRoZSBlbGVtZW50IGNyZWF0aW9uIHRvXG4gICAgLy8gc3VjY2VlZCBhbmQgdGhlcmUgd2lsbCBsaWtlbHkgYmUgZXJyb3JzIGluIHJlbmRlci5cbiAgICBpZiAoIXZhbGlkVHlwZSkge1xuICAgICAgaWYgKHR5cGVvZiB0eXBlICE9PSAnZnVuY3Rpb24nICYmIHR5cGVvZiB0eXBlICE9PSAnc3RyaW5nJykge1xuICAgICAgICB2YXIgaW5mbyA9ICcnO1xuICAgICAgICBpZiAodHlwZSA9PT0gdW5kZWZpbmVkIHx8IHR5cGVvZiB0eXBlID09PSAnb2JqZWN0JyAmJiB0eXBlICE9PSBudWxsICYmIE9iamVjdC5rZXlzKHR5cGUpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIGluZm8gKz0gJyBZb3UgbGlrZWx5IGZvcmdvdCB0byBleHBvcnQgeW91ciBjb21wb25lbnQgZnJvbSB0aGUgZmlsZSAnICsgJ2l0XFwncyBkZWZpbmVkIGluLic7XG4gICAgICAgIH1cbiAgICAgICAgaW5mbyArPSBnZXREZWNsYXJhdGlvbkVycm9yQWRkZW5kdW0oKTtcbiAgICAgICAgXCJkZXZlbG9wbWVudFwiICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKGZhbHNlLCAnUmVhY3QuY3JlYXRlRWxlbWVudDogdHlwZSBpcyBpbnZhbGlkIC0tIGV4cGVjdGVkIGEgc3RyaW5nIChmb3IgJyArICdidWlsdC1pbiBjb21wb25lbnRzKSBvciBhIGNsYXNzL2Z1bmN0aW9uIChmb3IgY29tcG9zaXRlICcgKyAnY29tcG9uZW50cykgYnV0IGdvdDogJXMuJXMnLCB0eXBlID09IG51bGwgPyB0eXBlIDogdHlwZW9mIHR5cGUsIGluZm8pIDogdm9pZCAwO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBlbGVtZW50ID0gUmVhY3RFbGVtZW50LmNyZWF0ZUVsZW1lbnQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblxuICAgIC8vIFRoZSByZXN1bHQgY2FuIGJlIG51bGxpc2ggaWYgYSBtb2NrIG9yIGEgY3VzdG9tIGZ1bmN0aW9uIGlzIHVzZWQuXG4gICAgLy8gVE9ETzogRHJvcCB0aGlzIHdoZW4gdGhlc2UgYXJlIG5vIGxvbmdlciBhbGxvd2VkIGFzIHRoZSB0eXBlIGFyZ3VtZW50LlxuICAgIGlmIChlbGVtZW50ID09IG51bGwpIHtcbiAgICAgIHJldHVybiBlbGVtZW50O1xuICAgIH1cblxuICAgIC8vIFNraXAga2V5IHdhcm5pbmcgaWYgdGhlIHR5cGUgaXNuJ3QgdmFsaWQgc2luY2Ugb3VyIGtleSB2YWxpZGF0aW9uIGxvZ2ljXG4gICAgLy8gZG9lc24ndCBleHBlY3QgYSBub24tc3RyaW5nL2Z1bmN0aW9uIHR5cGUgYW5kIGNhbiB0aHJvdyBjb25mdXNpbmcgZXJyb3JzLlxuICAgIC8vIFdlIGRvbid0IHdhbnQgZXhjZXB0aW9uIGJlaGF2aW9yIHRvIGRpZmZlciBiZXR3ZWVuIGRldiBhbmQgcHJvZC5cbiAgICAvLyAoUmVuZGVyaW5nIHdpbGwgdGhyb3cgd2l0aCBhIGhlbHBmdWwgbWVzc2FnZSBhbmQgYXMgc29vbiBhcyB0aGUgdHlwZSBpc1xuICAgIC8vIGZpeGVkLCB0aGUga2V5IHdhcm5pbmdzIHdpbGwgYXBwZWFyLilcbiAgICBpZiAodmFsaWRUeXBlKSB7XG4gICAgICBmb3IgKHZhciBpID0gMjsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YWxpZGF0ZUNoaWxkS2V5cyhhcmd1bWVudHNbaV0sIHR5cGUpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhbGlkYXRlUHJvcFR5cGVzKGVsZW1lbnQpO1xuXG4gICAgcmV0dXJuIGVsZW1lbnQ7XG4gIH0sXG5cbiAgY3JlYXRlRmFjdG9yeTogZnVuY3Rpb24gKHR5cGUpIHtcbiAgICB2YXIgdmFsaWRhdGVkRmFjdG9yeSA9IFJlYWN0RWxlbWVudFZhbGlkYXRvci5jcmVhdGVFbGVtZW50LmJpbmQobnVsbCwgdHlwZSk7XG4gICAgLy8gTGVnYWN5IGhvb2sgVE9ETzogV2FybiBpZiB0aGlzIGlzIGFjY2Vzc2VkXG4gICAgdmFsaWRhdGVkRmFjdG9yeS50eXBlID0gdHlwZTtcblxuICAgIGlmIChcImRldmVsb3BtZW50XCIgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgaWYgKGNhbkRlZmluZVByb3BlcnR5KSB7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh2YWxpZGF0ZWRGYWN0b3J5LCAndHlwZScsIHtcbiAgICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIFwiZGV2ZWxvcG1lbnRcIiAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyhmYWxzZSwgJ0ZhY3RvcnkudHlwZSBpcyBkZXByZWNhdGVkLiBBY2Nlc3MgdGhlIGNsYXNzIGRpcmVjdGx5ICcgKyAnYmVmb3JlIHBhc3NpbmcgaXQgdG8gY3JlYXRlRmFjdG9yeS4nKSA6IHZvaWQgMDtcbiAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAndHlwZScsIHtcbiAgICAgICAgICAgICAgdmFsdWU6IHR5cGVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIHR5cGU7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdmFsaWRhdGVkRmFjdG9yeTtcbiAgfSxcblxuICBjbG9uZUVsZW1lbnQ6IGZ1bmN0aW9uIChlbGVtZW50LCBwcm9wcywgY2hpbGRyZW4pIHtcbiAgICB2YXIgbmV3RWxlbWVudCA9IFJlYWN0RWxlbWVudC5jbG9uZUVsZW1lbnQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICBmb3IgKHZhciBpID0gMjsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFsaWRhdGVDaGlsZEtleXMoYXJndW1lbnRzW2ldLCBuZXdFbGVtZW50LnR5cGUpO1xuICAgIH1cbiAgICB2YWxpZGF0ZVByb3BUeXBlcyhuZXdFbGVtZW50KTtcbiAgICByZXR1cm4gbmV3RWxlbWVudDtcbiAgfVxuXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0RWxlbWVudFZhbGlkYXRvcjsiLCIvKipcbiAqIENvcHlyaWdodCAyMDE1LXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgd2FybmluZyA9IHJlcXVpcmUoJ2ZianMvbGliL3dhcm5pbmcnKTtcblxuZnVuY3Rpb24gd2Fybk5vb3AocHVibGljSW5zdGFuY2UsIGNhbGxlck5hbWUpIHtcbiAgaWYgKFwiZGV2ZWxvcG1lbnRcIiAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgdmFyIGNvbnN0cnVjdG9yID0gcHVibGljSW5zdGFuY2UuY29uc3RydWN0b3I7XG4gICAgXCJkZXZlbG9wbWVudFwiICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKGZhbHNlLCAnJXMoLi4uKTogQ2FuIG9ubHkgdXBkYXRlIGEgbW91bnRlZCBvciBtb3VudGluZyBjb21wb25lbnQuICcgKyAnVGhpcyB1c3VhbGx5IG1lYW5zIHlvdSBjYWxsZWQgJXMoKSBvbiBhbiB1bm1vdW50ZWQgY29tcG9uZW50LiAnICsgJ1RoaXMgaXMgYSBuby1vcC4gUGxlYXNlIGNoZWNrIHRoZSBjb2RlIGZvciB0aGUgJXMgY29tcG9uZW50LicsIGNhbGxlck5hbWUsIGNhbGxlck5hbWUsIGNvbnN0cnVjdG9yICYmIChjb25zdHJ1Y3Rvci5kaXNwbGF5TmFtZSB8fCBjb25zdHJ1Y3Rvci5uYW1lKSB8fCAnUmVhY3RDbGFzcycpIDogdm9pZCAwO1xuICB9XG59XG5cbi8qKlxuICogVGhpcyBpcyB0aGUgYWJzdHJhY3QgQVBJIGZvciBhbiB1cGRhdGUgcXVldWUuXG4gKi9cbnZhciBSZWFjdE5vb3BVcGRhdGVRdWV1ZSA9IHtcblxuICAvKipcbiAgICogQ2hlY2tzIHdoZXRoZXIgb3Igbm90IHRoaXMgY29tcG9zaXRlIGNvbXBvbmVudCBpcyBtb3VudGVkLlxuICAgKiBAcGFyYW0ge1JlYWN0Q2xhc3N9IHB1YmxpY0luc3RhbmNlIFRoZSBpbnN0YW5jZSB3ZSB3YW50IHRvIHRlc3QuXG4gICAqIEByZXR1cm4ge2Jvb2xlYW59IFRydWUgaWYgbW91bnRlZCwgZmFsc2Ugb3RoZXJ3aXNlLlxuICAgKiBAcHJvdGVjdGVkXG4gICAqIEBmaW5hbFxuICAgKi9cbiAgaXNNb3VudGVkOiBmdW5jdGlvbiAocHVibGljSW5zdGFuY2UpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH0sXG5cbiAgLyoqXG4gICAqIEVucXVldWUgYSBjYWxsYmFjayB0aGF0IHdpbGwgYmUgZXhlY3V0ZWQgYWZ0ZXIgYWxsIHRoZSBwZW5kaW5nIHVwZGF0ZXNcbiAgICogaGF2ZSBwcm9jZXNzZWQuXG4gICAqXG4gICAqIEBwYXJhbSB7UmVhY3RDbGFzc30gcHVibGljSW5zdGFuY2UgVGhlIGluc3RhbmNlIHRvIHVzZSBhcyBgdGhpc2AgY29udGV4dC5cbiAgICogQHBhcmFtIHs/ZnVuY3Rpb259IGNhbGxiYWNrIENhbGxlZCBhZnRlciBzdGF0ZSBpcyB1cGRhdGVkLlxuICAgKiBAaW50ZXJuYWxcbiAgICovXG4gIGVucXVldWVDYWxsYmFjazogZnVuY3Rpb24gKHB1YmxpY0luc3RhbmNlLCBjYWxsYmFjaykge30sXG5cbiAgLyoqXG4gICAqIEZvcmNlcyBhbiB1cGRhdGUuIFRoaXMgc2hvdWxkIG9ubHkgYmUgaW52b2tlZCB3aGVuIGl0IGlzIGtub3duIHdpdGhcbiAgICogY2VydGFpbnR5IHRoYXQgd2UgYXJlICoqbm90KiogaW4gYSBET00gdHJhbnNhY3Rpb24uXG4gICAqXG4gICAqIFlvdSBtYXkgd2FudCB0byBjYWxsIHRoaXMgd2hlbiB5b3Uga25vdyB0aGF0IHNvbWUgZGVlcGVyIGFzcGVjdCBvZiB0aGVcbiAgICogY29tcG9uZW50J3Mgc3RhdGUgaGFzIGNoYW5nZWQgYnV0IGBzZXRTdGF0ZWAgd2FzIG5vdCBjYWxsZWQuXG4gICAqXG4gICAqIFRoaXMgd2lsbCBub3QgaW52b2tlIGBzaG91bGRDb21wb25lbnRVcGRhdGVgLCBidXQgaXQgd2lsbCBpbnZva2VcbiAgICogYGNvbXBvbmVudFdpbGxVcGRhdGVgIGFuZCBgY29tcG9uZW50RGlkVXBkYXRlYC5cbiAgICpcbiAgICogQHBhcmFtIHtSZWFjdENsYXNzfSBwdWJsaWNJbnN0YW5jZSBUaGUgaW5zdGFuY2UgdGhhdCBzaG91bGQgcmVyZW5kZXIuXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgZW5xdWV1ZUZvcmNlVXBkYXRlOiBmdW5jdGlvbiAocHVibGljSW5zdGFuY2UpIHtcbiAgICB3YXJuTm9vcChwdWJsaWNJbnN0YW5jZSwgJ2ZvcmNlVXBkYXRlJyk7XG4gIH0sXG5cbiAgLyoqXG4gICAqIFJlcGxhY2VzIGFsbCBvZiB0aGUgc3RhdGUuIEFsd2F5cyB1c2UgdGhpcyBvciBgc2V0U3RhdGVgIHRvIG11dGF0ZSBzdGF0ZS5cbiAgICogWW91IHNob3VsZCB0cmVhdCBgdGhpcy5zdGF0ZWAgYXMgaW1tdXRhYmxlLlxuICAgKlxuICAgKiBUaGVyZSBpcyBubyBndWFyYW50ZWUgdGhhdCBgdGhpcy5zdGF0ZWAgd2lsbCBiZSBpbW1lZGlhdGVseSB1cGRhdGVkLCBzb1xuICAgKiBhY2Nlc3NpbmcgYHRoaXMuc3RhdGVgIGFmdGVyIGNhbGxpbmcgdGhpcyBtZXRob2QgbWF5IHJldHVybiB0aGUgb2xkIHZhbHVlLlxuICAgKlxuICAgKiBAcGFyYW0ge1JlYWN0Q2xhc3N9IHB1YmxpY0luc3RhbmNlIFRoZSBpbnN0YW5jZSB0aGF0IHNob3VsZCByZXJlbmRlci5cbiAgICogQHBhcmFtIHtvYmplY3R9IGNvbXBsZXRlU3RhdGUgTmV4dCBzdGF0ZS5cbiAgICogQGludGVybmFsXG4gICAqL1xuICBlbnF1ZXVlUmVwbGFjZVN0YXRlOiBmdW5jdGlvbiAocHVibGljSW5zdGFuY2UsIGNvbXBsZXRlU3RhdGUpIHtcbiAgICB3YXJuTm9vcChwdWJsaWNJbnN0YW5jZSwgJ3JlcGxhY2VTdGF0ZScpO1xuICB9LFxuXG4gIC8qKlxuICAgKiBTZXRzIGEgc3Vic2V0IG9mIHRoZSBzdGF0ZS4gVGhpcyBvbmx5IGV4aXN0cyBiZWNhdXNlIF9wZW5kaW5nU3RhdGUgaXNcbiAgICogaW50ZXJuYWwuIFRoaXMgcHJvdmlkZXMgYSBtZXJnaW5nIHN0cmF0ZWd5IHRoYXQgaXMgbm90IGF2YWlsYWJsZSB0byBkZWVwXG4gICAqIHByb3BlcnRpZXMgd2hpY2ggaXMgY29uZnVzaW5nLiBUT0RPOiBFeHBvc2UgcGVuZGluZ1N0YXRlIG9yIGRvbid0IHVzZSBpdFxuICAgKiBkdXJpbmcgdGhlIG1lcmdlLlxuICAgKlxuICAgKiBAcGFyYW0ge1JlYWN0Q2xhc3N9IHB1YmxpY0luc3RhbmNlIFRoZSBpbnN0YW5jZSB0aGF0IHNob3VsZCByZXJlbmRlci5cbiAgICogQHBhcmFtIHtvYmplY3R9IHBhcnRpYWxTdGF0ZSBOZXh0IHBhcnRpYWwgc3RhdGUgdG8gYmUgbWVyZ2VkIHdpdGggc3RhdGUuXG4gICAqIEBpbnRlcm5hbFxuICAgKi9cbiAgZW5xdWV1ZVNldFN0YXRlOiBmdW5jdGlvbiAocHVibGljSW5zdGFuY2UsIHBhcnRpYWxTdGF0ZSkge1xuICAgIHdhcm5Ob29wKHB1YmxpY0luc3RhbmNlLCAnc2V0U3RhdGUnKTtcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdE5vb3BVcGRhdGVRdWV1ZTsiLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKiBcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBSZWFjdFByb3BUeXBlTG9jYXRpb25OYW1lcyA9IHt9O1xuXG5pZiAoXCJkZXZlbG9wbWVudFwiICE9PSAncHJvZHVjdGlvbicpIHtcbiAgUmVhY3RQcm9wVHlwZUxvY2F0aW9uTmFtZXMgPSB7XG4gICAgcHJvcDogJ3Byb3AnLFxuICAgIGNvbnRleHQ6ICdjb250ZXh0JyxcbiAgICBjaGlsZENvbnRleHQ6ICdjaGlsZCBjb250ZXh0J1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0UHJvcFR5cGVMb2NhdGlvbk5hbWVzOyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBSZWFjdEVsZW1lbnQgPSByZXF1aXJlKCcuL1JlYWN0RWxlbWVudCcpO1xudmFyIFJlYWN0UHJvcFR5cGVMb2NhdGlvbk5hbWVzID0gcmVxdWlyZSgnLi9SZWFjdFByb3BUeXBlTG9jYXRpb25OYW1lcycpO1xudmFyIFJlYWN0UHJvcFR5cGVzU2VjcmV0ID0gcmVxdWlyZSgnLi9SZWFjdFByb3BUeXBlc1NlY3JldCcpO1xuXG52YXIgZW1wdHlGdW5jdGlvbiA9IHJlcXVpcmUoJ2ZianMvbGliL2VtcHR5RnVuY3Rpb24nKTtcbnZhciBnZXRJdGVyYXRvckZuID0gcmVxdWlyZSgnLi9nZXRJdGVyYXRvckZuJyk7XG52YXIgd2FybmluZyA9IHJlcXVpcmUoJ2ZianMvbGliL3dhcm5pbmcnKTtcblxuLyoqXG4gKiBDb2xsZWN0aW9uIG9mIG1ldGhvZHMgdGhhdCBhbGxvdyBkZWNsYXJhdGlvbiBhbmQgdmFsaWRhdGlvbiBvZiBwcm9wcyB0aGF0IGFyZVxuICogc3VwcGxpZWQgdG8gUmVhY3QgY29tcG9uZW50cy4gRXhhbXBsZSB1c2FnZTpcbiAqXG4gKiAgIHZhciBQcm9wcyA9IHJlcXVpcmUoJ1JlYWN0UHJvcFR5cGVzJyk7XG4gKiAgIHZhciBNeUFydGljbGUgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gKiAgICAgcHJvcFR5cGVzOiB7XG4gKiAgICAgICAvLyBBbiBvcHRpb25hbCBzdHJpbmcgcHJvcCBuYW1lZCBcImRlc2NyaXB0aW9uXCIuXG4gKiAgICAgICBkZXNjcmlwdGlvbjogUHJvcHMuc3RyaW5nLFxuICpcbiAqICAgICAgIC8vIEEgcmVxdWlyZWQgZW51bSBwcm9wIG5hbWVkIFwiY2F0ZWdvcnlcIi5cbiAqICAgICAgIGNhdGVnb3J5OiBQcm9wcy5vbmVPZihbJ05ld3MnLCdQaG90b3MnXSkuaXNSZXF1aXJlZCxcbiAqXG4gKiAgICAgICAvLyBBIHByb3AgbmFtZWQgXCJkaWFsb2dcIiB0aGF0IHJlcXVpcmVzIGFuIGluc3RhbmNlIG9mIERpYWxvZy5cbiAqICAgICAgIGRpYWxvZzogUHJvcHMuaW5zdGFuY2VPZihEaWFsb2cpLmlzUmVxdWlyZWRcbiAqICAgICB9LFxuICogICAgIHJlbmRlcjogZnVuY3Rpb24oKSB7IC4uLiB9XG4gKiAgIH0pO1xuICpcbiAqIEEgbW9yZSBmb3JtYWwgc3BlY2lmaWNhdGlvbiBvZiBob3cgdGhlc2UgbWV0aG9kcyBhcmUgdXNlZDpcbiAqXG4gKiAgIHR5cGUgOj0gYXJyYXl8Ym9vbHxmdW5jfG9iamVjdHxudW1iZXJ8c3RyaW5nfG9uZU9mKFsuLi5dKXxpbnN0YW5jZU9mKC4uLilcbiAqICAgZGVjbCA6PSBSZWFjdFByb3BUeXBlcy57dHlwZX0oLmlzUmVxdWlyZWQpP1xuICpcbiAqIEVhY2ggYW5kIGV2ZXJ5IGRlY2xhcmF0aW9uIHByb2R1Y2VzIGEgZnVuY3Rpb24gd2l0aCB0aGUgc2FtZSBzaWduYXR1cmUuIFRoaXNcbiAqIGFsbG93cyB0aGUgY3JlYXRpb24gb2YgY3VzdG9tIHZhbGlkYXRpb24gZnVuY3Rpb25zLiBGb3IgZXhhbXBsZTpcbiAqXG4gKiAgdmFyIE15TGluayA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAqICAgIHByb3BUeXBlczoge1xuICogICAgICAvLyBBbiBvcHRpb25hbCBzdHJpbmcgb3IgVVJJIHByb3AgbmFtZWQgXCJocmVmXCIuXG4gKiAgICAgIGhyZWY6IGZ1bmN0aW9uKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSkge1xuICogICAgICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gKiAgICAgICAgaWYgKHByb3BWYWx1ZSAhPSBudWxsICYmIHR5cGVvZiBwcm9wVmFsdWUgIT09ICdzdHJpbmcnICYmXG4gKiAgICAgICAgICAgICEocHJvcFZhbHVlIGluc3RhbmNlb2YgVVJJKSkge1xuICogICAgICAgICAgcmV0dXJuIG5ldyBFcnJvcihcbiAqICAgICAgICAgICAgJ0V4cGVjdGVkIGEgc3RyaW5nIG9yIGFuIFVSSSBmb3IgJyArIHByb3BOYW1lICsgJyBpbiAnICtcbiAqICAgICAgICAgICAgY29tcG9uZW50TmFtZVxuICogICAgICAgICAgKTtcbiAqICAgICAgICB9XG4gKiAgICAgIH1cbiAqICAgIH0sXG4gKiAgICByZW5kZXI6IGZ1bmN0aW9uKCkgey4uLn1cbiAqICB9KTtcbiAqXG4gKiBAaW50ZXJuYWxcbiAqL1xuXG52YXIgQU5PTllNT1VTID0gJzw8YW5vbnltb3VzPj4nO1xuXG52YXIgUmVhY3RQcm9wVHlwZXMgPSB7XG4gIGFycmF5OiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignYXJyYXknKSxcbiAgYm9vbDogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ2Jvb2xlYW4nKSxcbiAgZnVuYzogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ2Z1bmN0aW9uJyksXG4gIG51bWJlcjogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ251bWJlcicpLFxuICBvYmplY3Q6IGNyZWF0ZVByaW1pdGl2ZVR5cGVDaGVja2VyKCdvYmplY3QnKSxcbiAgc3RyaW5nOiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcignc3RyaW5nJyksXG4gIHN5bWJvbDogY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXIoJ3N5bWJvbCcpLFxuXG4gIGFueTogY3JlYXRlQW55VHlwZUNoZWNrZXIoKSxcbiAgYXJyYXlPZjogY3JlYXRlQXJyYXlPZlR5cGVDaGVja2VyLFxuICBlbGVtZW50OiBjcmVhdGVFbGVtZW50VHlwZUNoZWNrZXIoKSxcbiAgaW5zdGFuY2VPZjogY3JlYXRlSW5zdGFuY2VUeXBlQ2hlY2tlcixcbiAgbm9kZTogY3JlYXRlTm9kZUNoZWNrZXIoKSxcbiAgb2JqZWN0T2Y6IGNyZWF0ZU9iamVjdE9mVHlwZUNoZWNrZXIsXG4gIG9uZU9mOiBjcmVhdGVFbnVtVHlwZUNoZWNrZXIsXG4gIG9uZU9mVHlwZTogY3JlYXRlVW5pb25UeXBlQ2hlY2tlcixcbiAgc2hhcGU6IGNyZWF0ZVNoYXBlVHlwZUNoZWNrZXJcbn07XG5cbi8qKlxuICogaW5saW5lZCBPYmplY3QuaXMgcG9seWZpbGwgdG8gYXZvaWQgcmVxdWlyaW5nIGNvbnN1bWVycyBzaGlwIHRoZWlyIG93blxuICogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvT2JqZWN0L2lzXG4gKi9cbi8qZXNsaW50LWRpc2FibGUgbm8tc2VsZi1jb21wYXJlKi9cbmZ1bmN0aW9uIGlzKHgsIHkpIHtcbiAgLy8gU2FtZVZhbHVlIGFsZ29yaXRobVxuICBpZiAoeCA9PT0geSkge1xuICAgIC8vIFN0ZXBzIDEtNSwgNy0xMFxuICAgIC8vIFN0ZXBzIDYuYi02LmU6ICswICE9IC0wXG4gICAgcmV0dXJuIHggIT09IDAgfHwgMSAvIHggPT09IDEgLyB5O1xuICB9IGVsc2Uge1xuICAgIC8vIFN0ZXAgNi5hOiBOYU4gPT0gTmFOXG4gICAgcmV0dXJuIHggIT09IHggJiYgeSAhPT0geTtcbiAgfVxufVxuLyplc2xpbnQtZW5hYmxlIG5vLXNlbGYtY29tcGFyZSovXG5cbi8qKlxuICogV2UgdXNlIGFuIEVycm9yLWxpa2Ugb2JqZWN0IGZvciBiYWNrd2FyZCBjb21wYXRpYmlsaXR5IGFzIHBlb3BsZSBtYXkgY2FsbFxuICogUHJvcFR5cGVzIGRpcmVjdGx5IGFuZCBpbnNwZWN0IHRoZWlyIG91dHB1dC4gSG93ZXZlciB3ZSBkb24ndCB1c2UgcmVhbFxuICogRXJyb3JzIGFueW1vcmUuIFdlIGRvbid0IGluc3BlY3QgdGhlaXIgc3RhY2sgYW55d2F5LCBhbmQgY3JlYXRpbmcgdGhlbVxuICogaXMgcHJvaGliaXRpdmVseSBleHBlbnNpdmUgaWYgdGhleSBhcmUgY3JlYXRlZCB0b28gb2Z0ZW4sIHN1Y2ggYXMgd2hhdFxuICogaGFwcGVucyBpbiBvbmVPZlR5cGUoKSBmb3IgYW55IHR5cGUgYmVmb3JlIHRoZSBvbmUgdGhhdCBtYXRjaGVkLlxuICovXG5mdW5jdGlvbiBQcm9wVHlwZUVycm9yKG1lc3NhZ2UpIHtcbiAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcbiAgdGhpcy5zdGFjayA9ICcnO1xufVxuLy8gTWFrZSBgaW5zdGFuY2VvZiBFcnJvcmAgc3RpbGwgd29yayBmb3IgcmV0dXJuZWQgZXJyb3JzLlxuUHJvcFR5cGVFcnJvci5wcm90b3R5cGUgPSBFcnJvci5wcm90b3R5cGU7XG5cbmZ1bmN0aW9uIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKSB7XG4gIGlmIChcImRldmVsb3BtZW50XCIgIT09ICdwcm9kdWN0aW9uJykge1xuICAgIHZhciBtYW51YWxQcm9wVHlwZUNhbGxDYWNoZSA9IHt9O1xuICB9XG4gIGZ1bmN0aW9uIGNoZWNrVHlwZShpc1JlcXVpcmVkLCBwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUsIHNlY3JldCkge1xuICAgIGNvbXBvbmVudE5hbWUgPSBjb21wb25lbnROYW1lIHx8IEFOT05ZTU9VUztcbiAgICBwcm9wRnVsbE5hbWUgPSBwcm9wRnVsbE5hbWUgfHwgcHJvcE5hbWU7XG4gICAgaWYgKFwiZGV2ZWxvcG1lbnRcIiAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICBpZiAoc2VjcmV0ICE9PSBSZWFjdFByb3BUeXBlc1NlY3JldCAmJiB0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgdmFyIGNhY2hlS2V5ID0gY29tcG9uZW50TmFtZSArICc6JyArIHByb3BOYW1lO1xuICAgICAgICBpZiAoIW1hbnVhbFByb3BUeXBlQ2FsbENhY2hlW2NhY2hlS2V5XSkge1xuICAgICAgICAgIFwiZGV2ZWxvcG1lbnRcIiAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyhmYWxzZSwgJ1lvdSBhcmUgbWFudWFsbHkgY2FsbGluZyBhIFJlYWN0LlByb3BUeXBlcyB2YWxpZGF0aW9uICcgKyAnZnVuY3Rpb24gZm9yIHRoZSBgJXNgIHByb3Agb24gYCVzYC4gVGhpcyBpcyBkZXByZWNhdGVkICcgKyAnYW5kIHdpbGwgbm90IHdvcmsgaW4gcHJvZHVjdGlvbiB3aXRoIHRoZSBuZXh0IG1ham9yIHZlcnNpb24uICcgKyAnWW91IG1heSBiZSBzZWVpbmcgdGhpcyB3YXJuaW5nIGR1ZSB0byBhIHRoaXJkLXBhcnR5IFByb3BUeXBlcyAnICsgJ2xpYnJhcnkuIFNlZSBodHRwczovL2ZiLm1lL3JlYWN0LXdhcm5pbmctZG9udC1jYWxsLXByb3B0eXBlcyAnICsgJ2ZvciBkZXRhaWxzLicsIHByb3BGdWxsTmFtZSwgY29tcG9uZW50TmFtZSkgOiB2b2lkIDA7XG4gICAgICAgICAgbWFudWFsUHJvcFR5cGVDYWxsQ2FjaGVbY2FjaGVLZXldID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAocHJvcHNbcHJvcE5hbWVdID09IG51bGwpIHtcbiAgICAgIHZhciBsb2NhdGlvbk5hbWUgPSBSZWFjdFByb3BUeXBlTG9jYXRpb25OYW1lc1tsb2NhdGlvbl07XG4gICAgICBpZiAoaXNSZXF1aXJlZCkge1xuICAgICAgICBpZiAocHJvcHNbcHJvcE5hbWVdID09PSBudWxsKSB7XG4gICAgICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdUaGUgJyArIGxvY2F0aW9uTmFtZSArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBpcyBtYXJrZWQgYXMgcmVxdWlyZWQgJyArICgnaW4gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGJ1dCBpdHMgdmFsdWUgaXMgYG51bGxgLicpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ1RoZSAnICsgbG9jYXRpb25OYW1lICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIGlzIG1hcmtlZCBhcyByZXF1aXJlZCBpbiAnICsgKCdgJyArIGNvbXBvbmVudE5hbWUgKyAnYCwgYnV0IGl0cyB2YWx1ZSBpcyBgdW5kZWZpbmVkYC4nKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSk7XG4gICAgfVxuICB9XG5cbiAgdmFyIGNoYWluZWRDaGVja1R5cGUgPSBjaGVja1R5cGUuYmluZChudWxsLCBmYWxzZSk7XG4gIGNoYWluZWRDaGVja1R5cGUuaXNSZXF1aXJlZCA9IGNoZWNrVHlwZS5iaW5kKG51bGwsIHRydWUpO1xuXG4gIHJldHVybiBjaGFpbmVkQ2hlY2tUeXBlO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVQcmltaXRpdmVUeXBlQ2hlY2tlcihleHBlY3RlZFR5cGUpIHtcbiAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lLCBzZWNyZXQpIHtcbiAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gICAgaWYgKHByb3BUeXBlICE9PSBleHBlY3RlZFR5cGUpIHtcbiAgICAgIHZhciBsb2NhdGlvbk5hbWUgPSBSZWFjdFByb3BUeXBlTG9jYXRpb25OYW1lc1tsb2NhdGlvbl07XG4gICAgICAvLyBgcHJvcFZhbHVlYCBiZWluZyBpbnN0YW5jZSBvZiwgc2F5LCBkYXRlL3JlZ2V4cCwgcGFzcyB0aGUgJ29iamVjdCdcbiAgICAgIC8vIGNoZWNrLCBidXQgd2UgY2FuIG9mZmVyIGEgbW9yZSBwcmVjaXNlIGVycm9yIG1lc3NhZ2UgaGVyZSByYXRoZXIgdGhhblxuICAgICAgLy8gJ29mIHR5cGUgYG9iamVjdGAnLlxuICAgICAgdmFyIHByZWNpc2VUeXBlID0gZ2V0UHJlY2lzZVR5cGUocHJvcFZhbHVlKTtcblxuICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbk5hbWUgKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdHlwZSAnICsgKCdgJyArIHByZWNpc2VUeXBlICsgJ2Agc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkICcpICsgKCdgJyArIGV4cGVjdGVkVHlwZSArICdgLicpKTtcbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlQW55VHlwZUNoZWNrZXIoKSB7XG4gIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcihlbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zKG51bGwpKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlQXJyYXlPZlR5cGVDaGVja2VyKHR5cGVDaGVja2VyKSB7XG4gIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgIGlmICh0eXBlb2YgdHlwZUNoZWNrZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignUHJvcGVydHkgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiBjb21wb25lbnQgYCcgKyBjb21wb25lbnROYW1lICsgJ2AgaGFzIGludmFsaWQgUHJvcFR5cGUgbm90YXRpb24gaW5zaWRlIGFycmF5T2YuJyk7XG4gICAgfVxuICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgaWYgKCFBcnJheS5pc0FycmF5KHByb3BWYWx1ZSkpIHtcbiAgICAgIHZhciBsb2NhdGlvbk5hbWUgPSBSZWFjdFByb3BUeXBlTG9jYXRpb25OYW1lc1tsb2NhdGlvbl07XG4gICAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbk5hbWUgKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdHlwZSAnICsgKCdgJyArIHByb3BUeXBlICsgJ2Agc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkIGFuIGFycmF5LicpKTtcbiAgICB9XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wVmFsdWUubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBlcnJvciA9IHR5cGVDaGVja2VyKHByb3BWYWx1ZSwgaSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSArICdbJyArIGkgKyAnXScsIFJlYWN0UHJvcFR5cGVzU2VjcmV0KTtcbiAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICAgIHJldHVybiBlcnJvcjtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgcmV0dXJuIGNyZWF0ZUNoYWluYWJsZVR5cGVDaGVja2VyKHZhbGlkYXRlKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlRWxlbWVudFR5cGVDaGVja2VyKCkge1xuICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgIGlmICghUmVhY3RFbGVtZW50LmlzVmFsaWRFbGVtZW50KHByb3BWYWx1ZSkpIHtcbiAgICAgIHZhciBsb2NhdGlvbk5hbWUgPSBSZWFjdFByb3BUeXBlTG9jYXRpb25OYW1lc1tsb2NhdGlvbl07XG4gICAgICB2YXIgcHJvcFR5cGUgPSBnZXRQcm9wVHlwZShwcm9wVmFsdWUpO1xuICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbk5hbWUgKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdHlwZSAnICsgKCdgJyArIHByb3BUeXBlICsgJ2Agc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkIGEgc2luZ2xlIFJlYWN0RWxlbWVudC4nKSk7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG4gIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUluc3RhbmNlVHlwZUNoZWNrZXIoZXhwZWN0ZWRDbGFzcykge1xuICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICBpZiAoIShwcm9wc1twcm9wTmFtZV0gaW5zdGFuY2VvZiBleHBlY3RlZENsYXNzKSkge1xuICAgICAgdmFyIGxvY2F0aW9uTmFtZSA9IFJlYWN0UHJvcFR5cGVMb2NhdGlvbk5hbWVzW2xvY2F0aW9uXTtcbiAgICAgIHZhciBleHBlY3RlZENsYXNzTmFtZSA9IGV4cGVjdGVkQ2xhc3MubmFtZSB8fCBBTk9OWU1PVVM7XG4gICAgICB2YXIgYWN0dWFsQ2xhc3NOYW1lID0gZ2V0Q2xhc3NOYW1lKHByb3BzW3Byb3BOYW1lXSk7XG4gICAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uTmFtZSArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB0eXBlICcgKyAoJ2AnICsgYWN0dWFsQ2xhc3NOYW1lICsgJ2Agc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkICcpICsgKCdpbnN0YW5jZSBvZiBgJyArIGV4cGVjdGVkQ2xhc3NOYW1lICsgJ2AuJykpO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVFbnVtVHlwZUNoZWNrZXIoZXhwZWN0ZWRWYWx1ZXMpIHtcbiAgaWYgKCFBcnJheS5pc0FycmF5KGV4cGVjdGVkVmFsdWVzKSkge1xuICAgIFwiZGV2ZWxvcG1lbnRcIiAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyhmYWxzZSwgJ0ludmFsaWQgYXJndW1lbnQgc3VwcGxpZWQgdG8gb25lT2YsIGV4cGVjdGVkIGFuIGluc3RhbmNlIG9mIGFycmF5LicpIDogdm9pZCAwO1xuICAgIHJldHVybiBlbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zTnVsbDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBleHBlY3RlZFZhbHVlcy5sZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGlzKHByb3BWYWx1ZSwgZXhwZWN0ZWRWYWx1ZXNbaV0pKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgIH1cblxuICAgIHZhciBsb2NhdGlvbk5hbWUgPSBSZWFjdFByb3BUeXBlTG9jYXRpb25OYW1lc1tsb2NhdGlvbl07XG4gICAgdmFyIHZhbHVlc1N0cmluZyA9IEpTT04uc3RyaW5naWZ5KGV4cGVjdGVkVmFsdWVzKTtcbiAgICByZXR1cm4gbmV3IFByb3BUeXBlRXJyb3IoJ0ludmFsaWQgJyArIGxvY2F0aW9uTmFtZSArICcgYCcgKyBwcm9wRnVsbE5hbWUgKyAnYCBvZiB2YWx1ZSBgJyArIHByb3BWYWx1ZSArICdgICcgKyAoJ3N1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBvbmUgb2YgJyArIHZhbHVlc1N0cmluZyArICcuJykpO1xuICB9XG4gIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZU9iamVjdE9mVHlwZUNoZWNrZXIodHlwZUNoZWNrZXIpIHtcbiAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgaWYgKHR5cGVvZiB0eXBlQ2hlY2tlciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdQcm9wZXJ0eSBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIGNvbXBvbmVudCBgJyArIGNvbXBvbmVudE5hbWUgKyAnYCBoYXMgaW52YWxpZCBQcm9wVHlwZSBub3RhdGlvbiBpbnNpZGUgb2JqZWN0T2YuJyk7XG4gICAgfVxuICAgIHZhciBwcm9wVmFsdWUgPSBwcm9wc1twcm9wTmFtZV07XG4gICAgdmFyIHByb3BUeXBlID0gZ2V0UHJvcFR5cGUocHJvcFZhbHVlKTtcbiAgICBpZiAocHJvcFR5cGUgIT09ICdvYmplY3QnKSB7XG4gICAgICB2YXIgbG9jYXRpb25OYW1lID0gUmVhY3RQcm9wVHlwZUxvY2F0aW9uTmFtZXNbbG9jYXRpb25dO1xuICAgICAgcmV0dXJuIG5ldyBQcm9wVHlwZUVycm9yKCdJbnZhbGlkICcgKyBsb2NhdGlvbk5hbWUgKyAnIGAnICsgcHJvcEZ1bGxOYW1lICsgJ2Agb2YgdHlwZSAnICsgKCdgJyArIHByb3BUeXBlICsgJ2Agc3VwcGxpZWQgdG8gYCcgKyBjb21wb25lbnROYW1lICsgJ2AsIGV4cGVjdGVkIGFuIG9iamVjdC4nKSk7XG4gICAgfVxuICAgIGZvciAodmFyIGtleSBpbiBwcm9wVmFsdWUpIHtcbiAgICAgIGlmIChwcm9wVmFsdWUuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICB2YXIgZXJyb3IgPSB0eXBlQ2hlY2tlcihwcm9wVmFsdWUsIGtleSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSArICcuJyArIGtleSwgUmVhY3RQcm9wVHlwZXNTZWNyZXQpO1xuICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICAgIHJldHVybiBlcnJvcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVVbmlvblR5cGVDaGVja2VyKGFycmF5T2ZUeXBlQ2hlY2tlcnMpIHtcbiAgaWYgKCFBcnJheS5pc0FycmF5KGFycmF5T2ZUeXBlQ2hlY2tlcnMpKSB7XG4gICAgXCJkZXZlbG9wbWVudFwiICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKGZhbHNlLCAnSW52YWxpZCBhcmd1bWVudCBzdXBwbGllZCB0byBvbmVPZlR5cGUsIGV4cGVjdGVkIGFuIGluc3RhbmNlIG9mIGFycmF5LicpIDogdm9pZCAwO1xuICAgIHJldHVybiBlbXB0eUZ1bmN0aW9uLnRoYXRSZXR1cm5zTnVsbDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHZhbGlkYXRlKHByb3BzLCBwcm9wTmFtZSwgY29tcG9uZW50TmFtZSwgbG9jYXRpb24sIHByb3BGdWxsTmFtZSkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyYXlPZlR5cGVDaGVja2Vycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGNoZWNrZXIgPSBhcnJheU9mVHlwZUNoZWNrZXJzW2ldO1xuICAgICAgaWYgKGNoZWNrZXIocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lLCBSZWFjdFByb3BUeXBlc1NlY3JldCkgPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgbG9jYXRpb25OYW1lID0gUmVhY3RQcm9wVHlwZUxvY2F0aW9uTmFtZXNbbG9jYXRpb25dO1xuICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb25OYW1lICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIHN1cHBsaWVkIHRvICcgKyAoJ2AnICsgY29tcG9uZW50TmFtZSArICdgLicpKTtcbiAgfVxuICByZXR1cm4gY3JlYXRlQ2hhaW5hYmxlVHlwZUNoZWNrZXIodmFsaWRhdGUpO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVOb2RlQ2hlY2tlcigpIHtcbiAgZnVuY3Rpb24gdmFsaWRhdGUocHJvcHMsIHByb3BOYW1lLCBjb21wb25lbnROYW1lLCBsb2NhdGlvbiwgcHJvcEZ1bGxOYW1lKSB7XG4gICAgaWYgKCFpc05vZGUocHJvcHNbcHJvcE5hbWVdKSkge1xuICAgICAgdmFyIGxvY2F0aW9uTmFtZSA9IFJlYWN0UHJvcFR5cGVMb2NhdGlvbk5hbWVzW2xvY2F0aW9uXTtcbiAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb25OYW1lICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIHN1cHBsaWVkIHRvICcgKyAoJ2AnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBhIFJlYWN0Tm9kZS4nKSk7XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG4gIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVNoYXBlVHlwZUNoZWNrZXIoc2hhcGVUeXBlcykge1xuICBmdW5jdGlvbiB2YWxpZGF0ZShwcm9wcywgcHJvcE5hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUpIHtcbiAgICB2YXIgcHJvcFZhbHVlID0gcHJvcHNbcHJvcE5hbWVdO1xuICAgIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gICAgaWYgKHByb3BUeXBlICE9PSAnb2JqZWN0Jykge1xuICAgICAgdmFyIGxvY2F0aW9uTmFtZSA9IFJlYWN0UHJvcFR5cGVMb2NhdGlvbk5hbWVzW2xvY2F0aW9uXTtcbiAgICAgIHJldHVybiBuZXcgUHJvcFR5cGVFcnJvcignSW52YWxpZCAnICsgbG9jYXRpb25OYW1lICsgJyBgJyArIHByb3BGdWxsTmFtZSArICdgIG9mIHR5cGUgYCcgKyBwcm9wVHlwZSArICdgICcgKyAoJ3N1cHBsaWVkIHRvIGAnICsgY29tcG9uZW50TmFtZSArICdgLCBleHBlY3RlZCBgb2JqZWN0YC4nKSk7XG4gICAgfVxuICAgIGZvciAodmFyIGtleSBpbiBzaGFwZVR5cGVzKSB7XG4gICAgICB2YXIgY2hlY2tlciA9IHNoYXBlVHlwZXNba2V5XTtcbiAgICAgIGlmICghY2hlY2tlcikge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIHZhciBlcnJvciA9IGNoZWNrZXIocHJvcFZhbHVlLCBrZXksIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBwcm9wRnVsbE5hbWUgKyAnLicgKyBrZXksIFJlYWN0UHJvcFR5cGVzU2VjcmV0KTtcbiAgICAgIGlmIChlcnJvcikge1xuICAgICAgICByZXR1cm4gZXJyb3I7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG4gIHJldHVybiBjcmVhdGVDaGFpbmFibGVUeXBlQ2hlY2tlcih2YWxpZGF0ZSk7XG59XG5cbmZ1bmN0aW9uIGlzTm9kZShwcm9wVmFsdWUpIHtcbiAgc3dpdGNoICh0eXBlb2YgcHJvcFZhbHVlKSB7XG4gICAgY2FzZSAnbnVtYmVyJzpcbiAgICBjYXNlICdzdHJpbmcnOlxuICAgIGNhc2UgJ3VuZGVmaW5lZCc6XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICBjYXNlICdib29sZWFuJzpcbiAgICAgIHJldHVybiAhcHJvcFZhbHVlO1xuICAgIGNhc2UgJ29iamVjdCc6XG4gICAgICBpZiAoQXJyYXkuaXNBcnJheShwcm9wVmFsdWUpKSB7XG4gICAgICAgIHJldHVybiBwcm9wVmFsdWUuZXZlcnkoaXNOb2RlKTtcbiAgICAgIH1cbiAgICAgIGlmIChwcm9wVmFsdWUgPT09IG51bGwgfHwgUmVhY3RFbGVtZW50LmlzVmFsaWRFbGVtZW50KHByb3BWYWx1ZSkpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG5cbiAgICAgIHZhciBpdGVyYXRvckZuID0gZ2V0SXRlcmF0b3JGbihwcm9wVmFsdWUpO1xuICAgICAgaWYgKGl0ZXJhdG9yRm4pIHtcbiAgICAgICAgdmFyIGl0ZXJhdG9yID0gaXRlcmF0b3JGbi5jYWxsKHByb3BWYWx1ZSk7XG4gICAgICAgIHZhciBzdGVwO1xuICAgICAgICBpZiAoaXRlcmF0b3JGbiAhPT0gcHJvcFZhbHVlLmVudHJpZXMpIHtcbiAgICAgICAgICB3aGlsZSAoIShzdGVwID0gaXRlcmF0b3IubmV4dCgpKS5kb25lKSB7XG4gICAgICAgICAgICBpZiAoIWlzTm9kZShzdGVwLnZhbHVlKSkge1xuICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIEl0ZXJhdG9yIHdpbGwgcHJvdmlkZSBlbnRyeSBbayx2XSB0dXBsZXMgcmF0aGVyIHRoYW4gdmFsdWVzLlxuICAgICAgICAgIHdoaWxlICghKHN0ZXAgPSBpdGVyYXRvci5uZXh0KCkpLmRvbmUpIHtcbiAgICAgICAgICAgIHZhciBlbnRyeSA9IHN0ZXAudmFsdWU7XG4gICAgICAgICAgICBpZiAoZW50cnkpIHtcbiAgICAgICAgICAgICAgaWYgKCFpc05vZGUoZW50cnlbMV0pKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cblxuZnVuY3Rpb24gaXNTeW1ib2wocHJvcFR5cGUsIHByb3BWYWx1ZSkge1xuICAvLyBOYXRpdmUgU3ltYm9sLlxuICBpZiAocHJvcFR5cGUgPT09ICdzeW1ib2wnKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICAvLyAxOS40LjMuNSBTeW1ib2wucHJvdG90eXBlW0BAdG9TdHJpbmdUYWddID09PSAnU3ltYm9sJ1xuICBpZiAocHJvcFZhbHVlWydAQHRvU3RyaW5nVGFnJ10gPT09ICdTeW1ib2wnKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICAvLyBGYWxsYmFjayBmb3Igbm9uLXNwZWMgY29tcGxpYW50IFN5bWJvbHMgd2hpY2ggYXJlIHBvbHlmaWxsZWQuXG4gIGlmICh0eXBlb2YgU3ltYm9sID09PSAnZnVuY3Rpb24nICYmIHByb3BWYWx1ZSBpbnN0YW5jZW9mIFN5bWJvbCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG4vLyBFcXVpdmFsZW50IG9mIGB0eXBlb2ZgIGJ1dCB3aXRoIHNwZWNpYWwgaGFuZGxpbmcgZm9yIGFycmF5IGFuZCByZWdleHAuXG5mdW5jdGlvbiBnZXRQcm9wVHlwZShwcm9wVmFsdWUpIHtcbiAgdmFyIHByb3BUeXBlID0gdHlwZW9mIHByb3BWYWx1ZTtcbiAgaWYgKEFycmF5LmlzQXJyYXkocHJvcFZhbHVlKSkge1xuICAgIHJldHVybiAnYXJyYXknO1xuICB9XG4gIGlmIChwcm9wVmFsdWUgaW5zdGFuY2VvZiBSZWdFeHApIHtcbiAgICAvLyBPbGQgd2Via2l0cyAoYXQgbGVhc3QgdW50aWwgQW5kcm9pZCA0LjApIHJldHVybiAnZnVuY3Rpb24nIHJhdGhlciB0aGFuXG4gICAgLy8gJ29iamVjdCcgZm9yIHR5cGVvZiBhIFJlZ0V4cC4gV2UnbGwgbm9ybWFsaXplIHRoaXMgaGVyZSBzbyB0aGF0IC9ibGEvXG4gICAgLy8gcGFzc2VzIFByb3BUeXBlcy5vYmplY3QuXG4gICAgcmV0dXJuICdvYmplY3QnO1xuICB9XG4gIGlmIChpc1N5bWJvbChwcm9wVHlwZSwgcHJvcFZhbHVlKSkge1xuICAgIHJldHVybiAnc3ltYm9sJztcbiAgfVxuICByZXR1cm4gcHJvcFR5cGU7XG59XG5cbi8vIFRoaXMgaGFuZGxlcyBtb3JlIHR5cGVzIHRoYW4gYGdldFByb3BUeXBlYC4gT25seSB1c2VkIGZvciBlcnJvciBtZXNzYWdlcy5cbi8vIFNlZSBgY3JlYXRlUHJpbWl0aXZlVHlwZUNoZWNrZXJgLlxuZnVuY3Rpb24gZ2V0UHJlY2lzZVR5cGUocHJvcFZhbHVlKSB7XG4gIHZhciBwcm9wVHlwZSA9IGdldFByb3BUeXBlKHByb3BWYWx1ZSk7XG4gIGlmIChwcm9wVHlwZSA9PT0gJ29iamVjdCcpIHtcbiAgICBpZiAocHJvcFZhbHVlIGluc3RhbmNlb2YgRGF0ZSkge1xuICAgICAgcmV0dXJuICdkYXRlJztcbiAgICB9IGVsc2UgaWYgKHByb3BWYWx1ZSBpbnN0YW5jZW9mIFJlZ0V4cCkge1xuICAgICAgcmV0dXJuICdyZWdleHAnO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcHJvcFR5cGU7XG59XG5cbi8vIFJldHVybnMgY2xhc3MgbmFtZSBvZiB0aGUgb2JqZWN0LCBpZiBhbnkuXG5mdW5jdGlvbiBnZXRDbGFzc05hbWUocHJvcFZhbHVlKSB7XG4gIGlmICghcHJvcFZhbHVlLmNvbnN0cnVjdG9yIHx8ICFwcm9wVmFsdWUuY29uc3RydWN0b3IubmFtZSkge1xuICAgIHJldHVybiBBTk9OWU1PVVM7XG4gIH1cbiAgcmV0dXJuIHByb3BWYWx1ZS5jb25zdHJ1Y3Rvci5uYW1lO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0UHJvcFR5cGVzOyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIFxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFJlYWN0UHJvcFR5cGVzU2VjcmV0ID0gJ1NFQ1JFVF9ET19OT1RfUEFTU19USElTX09SX1lPVV9XSUxMX0JFX0ZJUkVEJztcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdFByb3BUeXBlc1NlY3JldDsiLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgX2Fzc2lnbiA9IHJlcXVpcmUoJ29iamVjdC1hc3NpZ24nKTtcblxudmFyIFJlYWN0Q29tcG9uZW50ID0gcmVxdWlyZSgnLi9SZWFjdENvbXBvbmVudCcpO1xudmFyIFJlYWN0Tm9vcFVwZGF0ZVF1ZXVlID0gcmVxdWlyZSgnLi9SZWFjdE5vb3BVcGRhdGVRdWV1ZScpO1xuXG52YXIgZW1wdHlPYmplY3QgPSByZXF1aXJlKCdmYmpzL2xpYi9lbXB0eU9iamVjdCcpO1xuXG4vKipcbiAqIEJhc2UgY2xhc3MgaGVscGVycyBmb3IgdGhlIHVwZGF0aW5nIHN0YXRlIG9mIGEgY29tcG9uZW50LlxuICovXG5mdW5jdGlvbiBSZWFjdFB1cmVDb21wb25lbnQocHJvcHMsIGNvbnRleHQsIHVwZGF0ZXIpIHtcbiAgLy8gRHVwbGljYXRlZCBmcm9tIFJlYWN0Q29tcG9uZW50LlxuICB0aGlzLnByb3BzID0gcHJvcHM7XG4gIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG4gIHRoaXMucmVmcyA9IGVtcHR5T2JqZWN0O1xuICAvLyBXZSBpbml0aWFsaXplIHRoZSBkZWZhdWx0IHVwZGF0ZXIgYnV0IHRoZSByZWFsIG9uZSBnZXRzIGluamVjdGVkIGJ5IHRoZVxuICAvLyByZW5kZXJlci5cbiAgdGhpcy51cGRhdGVyID0gdXBkYXRlciB8fCBSZWFjdE5vb3BVcGRhdGVRdWV1ZTtcbn1cblxuZnVuY3Rpb24gQ29tcG9uZW50RHVtbXkoKSB7fVxuQ29tcG9uZW50RHVtbXkucHJvdG90eXBlID0gUmVhY3RDb21wb25lbnQucHJvdG90eXBlO1xuUmVhY3RQdXJlQ29tcG9uZW50LnByb3RvdHlwZSA9IG5ldyBDb21wb25lbnREdW1teSgpO1xuUmVhY3RQdXJlQ29tcG9uZW50LnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IFJlYWN0UHVyZUNvbXBvbmVudDtcbi8vIEF2b2lkIGFuIGV4dHJhIHByb3RvdHlwZSBqdW1wIGZvciB0aGVzZSBtZXRob2RzLlxuX2Fzc2lnbihSZWFjdFB1cmVDb21wb25lbnQucHJvdG90eXBlLCBSZWFjdENvbXBvbmVudC5wcm90b3R5cGUpO1xuUmVhY3RQdXJlQ29tcG9uZW50LnByb3RvdHlwZS5pc1B1cmVSZWFjdENvbXBvbmVudCA9IHRydWU7XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3RQdXJlQ29tcG9uZW50OyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gJzE1LjQuMic7IiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgY2FuRGVmaW5lUHJvcGVydHkgPSBmYWxzZTtcbmlmIChcImRldmVsb3BtZW50XCIgIT09ICdwcm9kdWN0aW9uJykge1xuICB0cnkge1xuICAgIC8vICRGbG93Rml4TWUgaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL2Zsb3cvaXNzdWVzLzI4NVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh7fSwgJ3gnLCB7IGdldDogZnVuY3Rpb24gKCkge30gfSk7XG4gICAgY2FuRGVmaW5lUHJvcGVydHkgPSB0cnVlO1xuICB9IGNhdGNoICh4KSB7XG4gICAgLy8gSUUgd2lsbCBmYWlsIG9uIGRlZmluZVByb3BlcnR5XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjYW5EZWZpbmVQcm9wZXJ0eTsiLCIvKipcbiAqIENvcHlyaWdodCAyMDEzLXByZXNlbnQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLiBBbiBhZGRpdGlvbmFsIGdyYW50XG4gKiBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluIHRoZSBzYW1lIGRpcmVjdG9yeS5cbiAqXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgX3Byb2RJbnZhcmlhbnQgPSByZXF1aXJlKCcuL3JlYWN0UHJvZEludmFyaWFudCcpO1xuXG52YXIgUmVhY3RQcm9wVHlwZUxvY2F0aW9uTmFtZXMgPSByZXF1aXJlKCcuL1JlYWN0UHJvcFR5cGVMb2NhdGlvbk5hbWVzJyk7XG52YXIgUmVhY3RQcm9wVHlwZXNTZWNyZXQgPSByZXF1aXJlKCcuL1JlYWN0UHJvcFR5cGVzU2VjcmV0Jyk7XG5cbnZhciBpbnZhcmlhbnQgPSByZXF1aXJlKCdmYmpzL2xpYi9pbnZhcmlhbnQnKTtcbnZhciB3YXJuaW5nID0gcmVxdWlyZSgnZmJqcy9saWIvd2FybmluZycpO1xuXG52YXIgUmVhY3RDb21wb25lbnRUcmVlSG9vaztcblxuaWYgKHR5cGVvZiBwcm9jZXNzICE9PSAndW5kZWZpbmVkJyAmJiBwcm9jZXNzLmVudiAmJiBcImRldmVsb3BtZW50XCIgPT09ICd0ZXN0Jykge1xuICAvLyBUZW1wb3JhcnkgaGFjay5cbiAgLy8gSW5saW5lIHJlcXVpcmVzIGRvbid0IHdvcmsgd2VsbCB3aXRoIEplc3Q6XG4gIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9yZWFjdC9pc3N1ZXMvNzI0MFxuICAvLyBSZW1vdmUgdGhlIGlubGluZSByZXF1aXJlcyB3aGVuIHdlIGRvbid0IG5lZWQgdGhlbSBhbnltb3JlOlxuICAvLyBodHRwczovL2dpdGh1Yi5jb20vZmFjZWJvb2svcmVhY3QvcHVsbC83MTc4XG4gIFJlYWN0Q29tcG9uZW50VHJlZUhvb2sgPSByZXF1aXJlKCcuL1JlYWN0Q29tcG9uZW50VHJlZUhvb2snKTtcbn1cblxudmFyIGxvZ2dlZFR5cGVGYWlsdXJlcyA9IHt9O1xuXG4vKipcbiAqIEFzc2VydCB0aGF0IHRoZSB2YWx1ZXMgbWF0Y2ggd2l0aCB0aGUgdHlwZSBzcGVjcy5cbiAqIEVycm9yIG1lc3NhZ2VzIGFyZSBtZW1vcml6ZWQgYW5kIHdpbGwgb25seSBiZSBzaG93biBvbmNlLlxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSB0eXBlU3BlY3MgTWFwIG9mIG5hbWUgdG8gYSBSZWFjdFByb3BUeXBlXG4gKiBAcGFyYW0ge29iamVjdH0gdmFsdWVzIFJ1bnRpbWUgdmFsdWVzIHRoYXQgbmVlZCB0byBiZSB0eXBlLWNoZWNrZWRcbiAqIEBwYXJhbSB7c3RyaW5nfSBsb2NhdGlvbiBlLmcuIFwicHJvcFwiLCBcImNvbnRleHRcIiwgXCJjaGlsZCBjb250ZXh0XCJcbiAqIEBwYXJhbSB7c3RyaW5nfSBjb21wb25lbnROYW1lIE5hbWUgb2YgdGhlIGNvbXBvbmVudCBmb3IgZXJyb3IgbWVzc2FnZXMuXG4gKiBAcGFyYW0gez9vYmplY3R9IGVsZW1lbnQgVGhlIFJlYWN0IGVsZW1lbnQgdGhhdCBpcyBiZWluZyB0eXBlLWNoZWNrZWRcbiAqIEBwYXJhbSB7P251bWJlcn0gZGVidWdJRCBUaGUgUmVhY3QgY29tcG9uZW50IGluc3RhbmNlIHRoYXQgaXMgYmVpbmcgdHlwZS1jaGVja2VkXG4gKiBAcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBjaGVja1JlYWN0VHlwZVNwZWModHlwZVNwZWNzLCB2YWx1ZXMsIGxvY2F0aW9uLCBjb21wb25lbnROYW1lLCBlbGVtZW50LCBkZWJ1Z0lEKSB7XG4gIGZvciAodmFyIHR5cGVTcGVjTmFtZSBpbiB0eXBlU3BlY3MpIHtcbiAgICBpZiAodHlwZVNwZWNzLmhhc093blByb3BlcnR5KHR5cGVTcGVjTmFtZSkpIHtcbiAgICAgIHZhciBlcnJvcjtcbiAgICAgIC8vIFByb3AgdHlwZSB2YWxpZGF0aW9uIG1heSB0aHJvdy4gSW4gY2FzZSB0aGV5IGRvLCB3ZSBkb24ndCB3YW50IHRvXG4gICAgICAvLyBmYWlsIHRoZSByZW5kZXIgcGhhc2Ugd2hlcmUgaXQgZGlkbid0IGZhaWwgYmVmb3JlLiBTbyB3ZSBsb2cgaXQuXG4gICAgICAvLyBBZnRlciB0aGVzZSBoYXZlIGJlZW4gY2xlYW5lZCB1cCwgd2UnbGwgbGV0IHRoZW0gdGhyb3cuXG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIGlzIGludGVudGlvbmFsbHkgYW4gaW52YXJpYW50IHRoYXQgZ2V0cyBjYXVnaHQuIEl0J3MgdGhlIHNhbWVcbiAgICAgICAgLy8gYmVoYXZpb3IgYXMgd2l0aG91dCB0aGlzIHN0YXRlbWVudCBleGNlcHQgd2l0aCBhIGJldHRlciBtZXNzYWdlLlxuICAgICAgICAhKHR5cGVvZiB0eXBlU3BlY3NbdHlwZVNwZWNOYW1lXSA9PT0gJ2Z1bmN0aW9uJykgPyBcImRldmVsb3BtZW50XCIgIT09ICdwcm9kdWN0aW9uJyA/IGludmFyaWFudChmYWxzZSwgJyVzOiAlcyB0eXBlIGAlc2AgaXMgaW52YWxpZDsgaXQgbXVzdCBiZSBhIGZ1bmN0aW9uLCB1c3VhbGx5IGZyb20gUmVhY3QuUHJvcFR5cGVzLicsIGNvbXBvbmVudE5hbWUgfHwgJ1JlYWN0IGNsYXNzJywgUmVhY3RQcm9wVHlwZUxvY2F0aW9uTmFtZXNbbG9jYXRpb25dLCB0eXBlU3BlY05hbWUpIDogX3Byb2RJbnZhcmlhbnQoJzg0JywgY29tcG9uZW50TmFtZSB8fCAnUmVhY3QgY2xhc3MnLCBSZWFjdFByb3BUeXBlTG9jYXRpb25OYW1lc1tsb2NhdGlvbl0sIHR5cGVTcGVjTmFtZSkgOiB2b2lkIDA7XG4gICAgICAgIGVycm9yID0gdHlwZVNwZWNzW3R5cGVTcGVjTmFtZV0odmFsdWVzLCB0eXBlU3BlY05hbWUsIGNvbXBvbmVudE5hbWUsIGxvY2F0aW9uLCBudWxsLCBSZWFjdFByb3BUeXBlc1NlY3JldCk7XG4gICAgICB9IGNhdGNoIChleCkge1xuICAgICAgICBlcnJvciA9IGV4O1xuICAgICAgfVxuICAgICAgXCJkZXZlbG9wbWVudFwiICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKCFlcnJvciB8fCBlcnJvciBpbnN0YW5jZW9mIEVycm9yLCAnJXM6IHR5cGUgc3BlY2lmaWNhdGlvbiBvZiAlcyBgJXNgIGlzIGludmFsaWQ7IHRoZSB0eXBlIGNoZWNrZXIgJyArICdmdW5jdGlvbiBtdXN0IHJldHVybiBgbnVsbGAgb3IgYW4gYEVycm9yYCBidXQgcmV0dXJuZWQgYSAlcy4gJyArICdZb3UgbWF5IGhhdmUgZm9yZ290dGVuIHRvIHBhc3MgYW4gYXJndW1lbnQgdG8gdGhlIHR5cGUgY2hlY2tlciAnICsgJ2NyZWF0b3IgKGFycmF5T2YsIGluc3RhbmNlT2YsIG9iamVjdE9mLCBvbmVPZiwgb25lT2ZUeXBlLCBhbmQgJyArICdzaGFwZSBhbGwgcmVxdWlyZSBhbiBhcmd1bWVudCkuJywgY29tcG9uZW50TmFtZSB8fCAnUmVhY3QgY2xhc3MnLCBSZWFjdFByb3BUeXBlTG9jYXRpb25OYW1lc1tsb2NhdGlvbl0sIHR5cGVTcGVjTmFtZSwgdHlwZW9mIGVycm9yKSA6IHZvaWQgMDtcbiAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEVycm9yICYmICEoZXJyb3IubWVzc2FnZSBpbiBsb2dnZWRUeXBlRmFpbHVyZXMpKSB7XG4gICAgICAgIC8vIE9ubHkgbW9uaXRvciB0aGlzIGZhaWx1cmUgb25jZSBiZWNhdXNlIHRoZXJlIHRlbmRzIHRvIGJlIGEgbG90IG9mIHRoZVxuICAgICAgICAvLyBzYW1lIGVycm9yLlxuICAgICAgICBsb2dnZWRUeXBlRmFpbHVyZXNbZXJyb3IubWVzc2FnZV0gPSB0cnVlO1xuXG4gICAgICAgIHZhciBjb21wb25lbnRTdGFja0luZm8gPSAnJztcblxuICAgICAgICBpZiAoXCJkZXZlbG9wbWVudFwiICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICBpZiAoIVJlYWN0Q29tcG9uZW50VHJlZUhvb2spIHtcbiAgICAgICAgICAgIFJlYWN0Q29tcG9uZW50VHJlZUhvb2sgPSByZXF1aXJlKCcuL1JlYWN0Q29tcG9uZW50VHJlZUhvb2snKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGRlYnVnSUQgIT09IG51bGwpIHtcbiAgICAgICAgICAgIGNvbXBvbmVudFN0YWNrSW5mbyA9IFJlYWN0Q29tcG9uZW50VHJlZUhvb2suZ2V0U3RhY2tBZGRlbmR1bUJ5SUQoZGVidWdJRCk7XG4gICAgICAgICAgfSBlbHNlIGlmIChlbGVtZW50ICE9PSBudWxsKSB7XG4gICAgICAgICAgICBjb21wb25lbnRTdGFja0luZm8gPSBSZWFjdENvbXBvbmVudFRyZWVIb29rLmdldEN1cnJlbnRTdGFja0FkZGVuZHVtKGVsZW1lbnQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIFwiZGV2ZWxvcG1lbnRcIiAhPT0gJ3Byb2R1Y3Rpb24nID8gd2FybmluZyhmYWxzZSwgJ0ZhaWxlZCAlcyB0eXBlOiAlcyVzJywgbG9jYXRpb24sIGVycm9yLm1lc3NhZ2UsIGNvbXBvbmVudFN0YWNrSW5mbykgOiB2b2lkIDA7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY2hlY2tSZWFjdFR5cGVTcGVjOyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqIFxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuLyogZ2xvYmFsIFN5bWJvbCAqL1xuXG52YXIgSVRFUkFUT1JfU1lNQk9MID0gdHlwZW9mIFN5bWJvbCA9PT0gJ2Z1bmN0aW9uJyAmJiBTeW1ib2wuaXRlcmF0b3I7XG52YXIgRkFVWF9JVEVSQVRPUl9TWU1CT0wgPSAnQEBpdGVyYXRvcic7IC8vIEJlZm9yZSBTeW1ib2wgc3BlYy5cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBpdGVyYXRvciBtZXRob2QgZnVuY3Rpb24gY29udGFpbmVkIG9uIHRoZSBpdGVyYWJsZSBvYmplY3QuXG4gKlxuICogQmUgc3VyZSB0byBpbnZva2UgdGhlIGZ1bmN0aW9uIHdpdGggdGhlIGl0ZXJhYmxlIGFzIGNvbnRleHQ6XG4gKlxuICogICAgIHZhciBpdGVyYXRvckZuID0gZ2V0SXRlcmF0b3JGbihteUl0ZXJhYmxlKTtcbiAqICAgICBpZiAoaXRlcmF0b3JGbikge1xuICogICAgICAgdmFyIGl0ZXJhdG9yID0gaXRlcmF0b3JGbi5jYWxsKG15SXRlcmFibGUpO1xuICogICAgICAgLi4uXG4gKiAgICAgfVxuICpcbiAqIEBwYXJhbSB7P29iamVjdH0gbWF5YmVJdGVyYWJsZVxuICogQHJldHVybiB7P2Z1bmN0aW9ufVxuICovXG5mdW5jdGlvbiBnZXRJdGVyYXRvckZuKG1heWJlSXRlcmFibGUpIHtcbiAgdmFyIGl0ZXJhdG9yRm4gPSBtYXliZUl0ZXJhYmxlICYmIChJVEVSQVRPUl9TWU1CT0wgJiYgbWF5YmVJdGVyYWJsZVtJVEVSQVRPUl9TWU1CT0xdIHx8IG1heWJlSXRlcmFibGVbRkFVWF9JVEVSQVRPUl9TWU1CT0xdKTtcbiAgaWYgKHR5cGVvZiBpdGVyYXRvckZuID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIGl0ZXJhdG9yRm47XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBnZXRJdGVyYXRvckZuOyIsIi8qKlxuICogQ29weXJpZ2h0IDIwMTMtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQlNELXN0eWxlIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4gKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuIEFuIGFkZGl0aW9uYWwgZ3JhbnRcbiAqIG9mIHBhdGVudCByaWdodHMgY2FuIGJlIGZvdW5kIGluIHRoZSBQQVRFTlRTIGZpbGUgaW4gdGhlIHNhbWUgZGlyZWN0b3J5LlxuICpcbiAqL1xuJ3VzZSBzdHJpY3QnO1xuXG52YXIgX3Byb2RJbnZhcmlhbnQgPSByZXF1aXJlKCcuL3JlYWN0UHJvZEludmFyaWFudCcpO1xuXG52YXIgUmVhY3RFbGVtZW50ID0gcmVxdWlyZSgnLi9SZWFjdEVsZW1lbnQnKTtcblxudmFyIGludmFyaWFudCA9IHJlcXVpcmUoJ2ZianMvbGliL2ludmFyaWFudCcpO1xuXG4vKipcbiAqIFJldHVybnMgdGhlIGZpcnN0IGNoaWxkIGluIGEgY29sbGVjdGlvbiBvZiBjaGlsZHJlbiBhbmQgdmVyaWZpZXMgdGhhdCB0aGVyZVxuICogaXMgb25seSBvbmUgY2hpbGQgaW4gdGhlIGNvbGxlY3Rpb24uXG4gKlxuICogU2VlIGh0dHBzOi8vZmFjZWJvb2suZ2l0aHViLmlvL3JlYWN0L2RvY3MvdG9wLWxldmVsLWFwaS5odG1sI3JlYWN0LmNoaWxkcmVuLm9ubHlcbiAqXG4gKiBUaGUgY3VycmVudCBpbXBsZW1lbnRhdGlvbiBvZiB0aGlzIGZ1bmN0aW9uIGFzc3VtZXMgdGhhdCBhIHNpbmdsZSBjaGlsZCBnZXRzXG4gKiBwYXNzZWQgd2l0aG91dCBhIHdyYXBwZXIsIGJ1dCB0aGUgcHVycG9zZSBvZiB0aGlzIGhlbHBlciBmdW5jdGlvbiBpcyB0b1xuICogYWJzdHJhY3QgYXdheSB0aGUgcGFydGljdWxhciBzdHJ1Y3R1cmUgb2YgY2hpbGRyZW4uXG4gKlxuICogQHBhcmFtIHs/b2JqZWN0fSBjaGlsZHJlbiBDaGlsZCBjb2xsZWN0aW9uIHN0cnVjdHVyZS5cbiAqIEByZXR1cm4ge1JlYWN0RWxlbWVudH0gVGhlIGZpcnN0IGFuZCBvbmx5IGBSZWFjdEVsZW1lbnRgIGNvbnRhaW5lZCBpbiB0aGVcbiAqIHN0cnVjdHVyZS5cbiAqL1xuZnVuY3Rpb24gb25seUNoaWxkKGNoaWxkcmVuKSB7XG4gICFSZWFjdEVsZW1lbnQuaXNWYWxpZEVsZW1lbnQoY2hpbGRyZW4pID8gXCJkZXZlbG9wbWVudFwiICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdSZWFjdC5DaGlsZHJlbi5vbmx5IGV4cGVjdGVkIHRvIHJlY2VpdmUgYSBzaW5nbGUgUmVhY3QgZWxlbWVudCBjaGlsZC4nKSA6IF9wcm9kSW52YXJpYW50KCcxNDMnKSA6IHZvaWQgMDtcbiAgcmV0dXJuIGNoaWxkcmVuO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG9ubHlDaGlsZDsiLCIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICogXG4gKi9cbid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBXQVJOSU5HOiBETyBOT1QgbWFudWFsbHkgcmVxdWlyZSB0aGlzIG1vZHVsZS5cbiAqIFRoaXMgaXMgYSByZXBsYWNlbWVudCBmb3IgYGludmFyaWFudCguLi4pYCB1c2VkIGJ5IHRoZSBlcnJvciBjb2RlIHN5c3RlbVxuICogYW5kIHdpbGwgX29ubHlfIGJlIHJlcXVpcmVkIGJ5IHRoZSBjb3JyZXNwb25kaW5nIGJhYmVsIHBhc3MuXG4gKiBJdCBhbHdheXMgdGhyb3dzLlxuICovXG5cbmZ1bmN0aW9uIHJlYWN0UHJvZEludmFyaWFudChjb2RlKSB7XG4gIHZhciBhcmdDb3VudCA9IGFyZ3VtZW50cy5sZW5ndGggLSAxO1xuXG4gIHZhciBtZXNzYWdlID0gJ01pbmlmaWVkIFJlYWN0IGVycm9yICMnICsgY29kZSArICc7IHZpc2l0ICcgKyAnaHR0cDovL2ZhY2Vib29rLmdpdGh1Yi5pby9yZWFjdC9kb2NzL2Vycm9yLWRlY29kZXIuaHRtbD9pbnZhcmlhbnQ9JyArIGNvZGU7XG5cbiAgZm9yICh2YXIgYXJnSWR4ID0gMDsgYXJnSWR4IDwgYXJnQ291bnQ7IGFyZ0lkeCsrKSB7XG4gICAgbWVzc2FnZSArPSAnJmFyZ3NbXT0nICsgZW5jb2RlVVJJQ29tcG9uZW50KGFyZ3VtZW50c1thcmdJZHggKyAxXSk7XG4gIH1cblxuICBtZXNzYWdlICs9ICcgZm9yIHRoZSBmdWxsIG1lc3NhZ2Ugb3IgdXNlIHRoZSBub24tbWluaWZpZWQgZGV2IGVudmlyb25tZW50JyArICcgZm9yIGZ1bGwgZXJyb3JzIGFuZCBhZGRpdGlvbmFsIGhlbHBmdWwgd2FybmluZ3MuJztcblxuICB2YXIgZXJyb3IgPSBuZXcgRXJyb3IobWVzc2FnZSk7XG4gIGVycm9yLm5hbWUgPSAnSW52YXJpYW50IFZpb2xhdGlvbic7XG4gIGVycm9yLmZyYW1lc1RvUG9wID0gMTsgLy8gd2UgZG9uJ3QgY2FyZSBhYm91dCByZWFjdFByb2RJbnZhcmlhbnQncyBvd24gZnJhbWVcblxuICB0aHJvdyBlcnJvcjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSByZWFjdFByb2RJbnZhcmlhbnQ7IiwiLyoqXG4gKiBDb3B5cmlnaHQgMjAxMy1wcmVzZW50LCBGYWNlYm9vaywgSW5jLlxuICogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBCU0Qtc3R5bGUgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS4gQW4gYWRkaXRpb25hbCBncmFudFxuICogb2YgcGF0ZW50IHJpZ2h0cyBjYW4gYmUgZm91bmQgaW4gdGhlIFBBVEVOVFMgZmlsZSBpbiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIF9wcm9kSW52YXJpYW50ID0gcmVxdWlyZSgnLi9yZWFjdFByb2RJbnZhcmlhbnQnKTtcblxudmFyIFJlYWN0Q3VycmVudE93bmVyID0gcmVxdWlyZSgnLi9SZWFjdEN1cnJlbnRPd25lcicpO1xudmFyIFJFQUNUX0VMRU1FTlRfVFlQRSA9IHJlcXVpcmUoJy4vUmVhY3RFbGVtZW50U3ltYm9sJyk7XG5cbnZhciBnZXRJdGVyYXRvckZuID0gcmVxdWlyZSgnLi9nZXRJdGVyYXRvckZuJyk7XG52YXIgaW52YXJpYW50ID0gcmVxdWlyZSgnZmJqcy9saWIvaW52YXJpYW50Jyk7XG52YXIgS2V5RXNjYXBlVXRpbHMgPSByZXF1aXJlKCcuL0tleUVzY2FwZVV0aWxzJyk7XG52YXIgd2FybmluZyA9IHJlcXVpcmUoJ2ZianMvbGliL3dhcm5pbmcnKTtcblxudmFyIFNFUEFSQVRPUiA9ICcuJztcbnZhciBTVUJTRVBBUkFUT1IgPSAnOic7XG5cbi8qKlxuICogVGhpcyBpcyBpbmxpbmVkIGZyb20gUmVhY3RFbGVtZW50IHNpbmNlIHRoaXMgZmlsZSBpcyBzaGFyZWQgYmV0d2VlblxuICogaXNvbW9ycGhpYyBhbmQgcmVuZGVyZXJzLiBXZSBjb3VsZCBleHRyYWN0IHRoaXMgdG8gYVxuICpcbiAqL1xuXG4vKipcbiAqIFRPRE86IFRlc3QgdGhhdCBhIHNpbmdsZSBjaGlsZCBhbmQgYW4gYXJyYXkgd2l0aCBvbmUgaXRlbSBoYXZlIHRoZSBzYW1lIGtleVxuICogcGF0dGVybi5cbiAqL1xuXG52YXIgZGlkV2FybkFib3V0TWFwcyA9IGZhbHNlO1xuXG4vKipcbiAqIEdlbmVyYXRlIGEga2V5IHN0cmluZyB0aGF0IGlkZW50aWZpZXMgYSBjb21wb25lbnQgd2l0aGluIGEgc2V0LlxuICpcbiAqIEBwYXJhbSB7Kn0gY29tcG9uZW50IEEgY29tcG9uZW50IHRoYXQgY291bGQgY29udGFpbiBhIG1hbnVhbCBrZXkuXG4gKiBAcGFyYW0ge251bWJlcn0gaW5kZXggSW5kZXggdGhhdCBpcyB1c2VkIGlmIGEgbWFudWFsIGtleSBpcyBub3QgcHJvdmlkZWQuXG4gKiBAcmV0dXJuIHtzdHJpbmd9XG4gKi9cbmZ1bmN0aW9uIGdldENvbXBvbmVudEtleShjb21wb25lbnQsIGluZGV4KSB7XG4gIC8vIERvIHNvbWUgdHlwZWNoZWNraW5nIGhlcmUgc2luY2Ugd2UgY2FsbCB0aGlzIGJsaW5kbHkuIFdlIHdhbnQgdG8gZW5zdXJlXG4gIC8vIHRoYXQgd2UgZG9uJ3QgYmxvY2sgcG90ZW50aWFsIGZ1dHVyZSBFUyBBUElzLlxuICBpZiAoY29tcG9uZW50ICYmIHR5cGVvZiBjb21wb25lbnQgPT09ICdvYmplY3QnICYmIGNvbXBvbmVudC5rZXkgIT0gbnVsbCkge1xuICAgIC8vIEV4cGxpY2l0IGtleVxuICAgIHJldHVybiBLZXlFc2NhcGVVdGlscy5lc2NhcGUoY29tcG9uZW50LmtleSk7XG4gIH1cbiAgLy8gSW1wbGljaXQga2V5IGRldGVybWluZWQgYnkgdGhlIGluZGV4IGluIHRoZSBzZXRcbiAgcmV0dXJuIGluZGV4LnRvU3RyaW5nKDM2KTtcbn1cblxuLyoqXG4gKiBAcGFyYW0gez8qfSBjaGlsZHJlbiBDaGlsZHJlbiB0cmVlIGNvbnRhaW5lci5cbiAqIEBwYXJhbSB7IXN0cmluZ30gbmFtZVNvRmFyIE5hbWUgb2YgdGhlIGtleSBwYXRoIHNvIGZhci5cbiAqIEBwYXJhbSB7IWZ1bmN0aW9ufSBjYWxsYmFjayBDYWxsYmFjayB0byBpbnZva2Ugd2l0aCBlYWNoIGNoaWxkIGZvdW5kLlxuICogQHBhcmFtIHs/Kn0gdHJhdmVyc2VDb250ZXh0IFVzZWQgdG8gcGFzcyBpbmZvcm1hdGlvbiB0aHJvdWdob3V0IHRoZSB0cmF2ZXJzYWxcbiAqIHByb2Nlc3MuXG4gKiBAcmV0dXJuIHshbnVtYmVyfSBUaGUgbnVtYmVyIG9mIGNoaWxkcmVuIGluIHRoaXMgc3VidHJlZS5cbiAqL1xuZnVuY3Rpb24gdHJhdmVyc2VBbGxDaGlsZHJlbkltcGwoY2hpbGRyZW4sIG5hbWVTb0ZhciwgY2FsbGJhY2ssIHRyYXZlcnNlQ29udGV4dCkge1xuICB2YXIgdHlwZSA9IHR5cGVvZiBjaGlsZHJlbjtcblxuICBpZiAodHlwZSA9PT0gJ3VuZGVmaW5lZCcgfHwgdHlwZSA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgLy8gQWxsIG9mIHRoZSBhYm92ZSBhcmUgcGVyY2VpdmVkIGFzIG51bGwuXG4gICAgY2hpbGRyZW4gPSBudWxsO1xuICB9XG5cbiAgaWYgKGNoaWxkcmVuID09PSBudWxsIHx8IHR5cGUgPT09ICdzdHJpbmcnIHx8IHR5cGUgPT09ICdudW1iZXInIHx8XG4gIC8vIFRoZSBmb2xsb3dpbmcgaXMgaW5saW5lZCBmcm9tIFJlYWN0RWxlbWVudC4gVGhpcyBtZWFucyB3ZSBjYW4gb3B0aW1pemVcbiAgLy8gc29tZSBjaGVja3MuIFJlYWN0IEZpYmVyIGFsc28gaW5saW5lcyB0aGlzIGxvZ2ljIGZvciBzaW1pbGFyIHB1cnBvc2VzLlxuICB0eXBlID09PSAnb2JqZWN0JyAmJiBjaGlsZHJlbi4kJHR5cGVvZiA9PT0gUkVBQ1RfRUxFTUVOVF9UWVBFKSB7XG4gICAgY2FsbGJhY2sodHJhdmVyc2VDb250ZXh0LCBjaGlsZHJlbixcbiAgICAvLyBJZiBpdCdzIHRoZSBvbmx5IGNoaWxkLCB0cmVhdCB0aGUgbmFtZSBhcyBpZiBpdCB3YXMgd3JhcHBlZCBpbiBhbiBhcnJheVxuICAgIC8vIHNvIHRoYXQgaXQncyBjb25zaXN0ZW50IGlmIHRoZSBudW1iZXIgb2YgY2hpbGRyZW4gZ3Jvd3MuXG4gICAgbmFtZVNvRmFyID09PSAnJyA/IFNFUEFSQVRPUiArIGdldENvbXBvbmVudEtleShjaGlsZHJlbiwgMCkgOiBuYW1lU29GYXIpO1xuICAgIHJldHVybiAxO1xuICB9XG5cbiAgdmFyIGNoaWxkO1xuICB2YXIgbmV4dE5hbWU7XG4gIHZhciBzdWJ0cmVlQ291bnQgPSAwOyAvLyBDb3VudCBvZiBjaGlsZHJlbiBmb3VuZCBpbiB0aGUgY3VycmVudCBzdWJ0cmVlLlxuICB2YXIgbmV4dE5hbWVQcmVmaXggPSBuYW1lU29GYXIgPT09ICcnID8gU0VQQVJBVE9SIDogbmFtZVNvRmFyICsgU1VCU0VQQVJBVE9SO1xuXG4gIGlmIChBcnJheS5pc0FycmF5KGNoaWxkcmVuKSkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNoaWxkID0gY2hpbGRyZW5baV07XG4gICAgICBuZXh0TmFtZSA9IG5leHROYW1lUHJlZml4ICsgZ2V0Q29tcG9uZW50S2V5KGNoaWxkLCBpKTtcbiAgICAgIHN1YnRyZWVDb3VudCArPSB0cmF2ZXJzZUFsbENoaWxkcmVuSW1wbChjaGlsZCwgbmV4dE5hbWUsIGNhbGxiYWNrLCB0cmF2ZXJzZUNvbnRleHQpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB2YXIgaXRlcmF0b3JGbiA9IGdldEl0ZXJhdG9yRm4oY2hpbGRyZW4pO1xuICAgIGlmIChpdGVyYXRvckZuKSB7XG4gICAgICB2YXIgaXRlcmF0b3IgPSBpdGVyYXRvckZuLmNhbGwoY2hpbGRyZW4pO1xuICAgICAgdmFyIHN0ZXA7XG4gICAgICBpZiAoaXRlcmF0b3JGbiAhPT0gY2hpbGRyZW4uZW50cmllcykge1xuICAgICAgICB2YXIgaWkgPSAwO1xuICAgICAgICB3aGlsZSAoIShzdGVwID0gaXRlcmF0b3IubmV4dCgpKS5kb25lKSB7XG4gICAgICAgICAgY2hpbGQgPSBzdGVwLnZhbHVlO1xuICAgICAgICAgIG5leHROYW1lID0gbmV4dE5hbWVQcmVmaXggKyBnZXRDb21wb25lbnRLZXkoY2hpbGQsIGlpKyspO1xuICAgICAgICAgIHN1YnRyZWVDb3VudCArPSB0cmF2ZXJzZUFsbENoaWxkcmVuSW1wbChjaGlsZCwgbmV4dE5hbWUsIGNhbGxiYWNrLCB0cmF2ZXJzZUNvbnRleHQpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoXCJkZXZlbG9wbWVudFwiICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgICB2YXIgbWFwc0FzQ2hpbGRyZW5BZGRlbmR1bSA9ICcnO1xuICAgICAgICAgIGlmIChSZWFjdEN1cnJlbnRPd25lci5jdXJyZW50KSB7XG4gICAgICAgICAgICB2YXIgbWFwc0FzQ2hpbGRyZW5Pd25lck5hbWUgPSBSZWFjdEN1cnJlbnRPd25lci5jdXJyZW50LmdldE5hbWUoKTtcbiAgICAgICAgICAgIGlmIChtYXBzQXNDaGlsZHJlbk93bmVyTmFtZSkge1xuICAgICAgICAgICAgICBtYXBzQXNDaGlsZHJlbkFkZGVuZHVtID0gJyBDaGVjayB0aGUgcmVuZGVyIG1ldGhvZCBvZiBgJyArIG1hcHNBc0NoaWxkcmVuT3duZXJOYW1lICsgJ2AuJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgXCJkZXZlbG9wbWVudFwiICE9PSAncHJvZHVjdGlvbicgPyB3YXJuaW5nKGRpZFdhcm5BYm91dE1hcHMsICdVc2luZyBNYXBzIGFzIGNoaWxkcmVuIGlzIG5vdCB5ZXQgZnVsbHkgc3VwcG9ydGVkLiBJdCBpcyBhbiAnICsgJ2V4cGVyaW1lbnRhbCBmZWF0dXJlIHRoYXQgbWlnaHQgYmUgcmVtb3ZlZC4gQ29udmVydCBpdCB0byBhICcgKyAnc2VxdWVuY2UgLyBpdGVyYWJsZSBvZiBrZXllZCBSZWFjdEVsZW1lbnRzIGluc3RlYWQuJXMnLCBtYXBzQXNDaGlsZHJlbkFkZGVuZHVtKSA6IHZvaWQgMDtcbiAgICAgICAgICBkaWRXYXJuQWJvdXRNYXBzID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICAvLyBJdGVyYXRvciB3aWxsIHByb3ZpZGUgZW50cnkgW2ssdl0gdHVwbGVzIHJhdGhlciB0aGFuIHZhbHVlcy5cbiAgICAgICAgd2hpbGUgKCEoc3RlcCA9IGl0ZXJhdG9yLm5leHQoKSkuZG9uZSkge1xuICAgICAgICAgIHZhciBlbnRyeSA9IHN0ZXAudmFsdWU7XG4gICAgICAgICAgaWYgKGVudHJ5KSB7XG4gICAgICAgICAgICBjaGlsZCA9IGVudHJ5WzFdO1xuICAgICAgICAgICAgbmV4dE5hbWUgPSBuZXh0TmFtZVByZWZpeCArIEtleUVzY2FwZVV0aWxzLmVzY2FwZShlbnRyeVswXSkgKyBTVUJTRVBBUkFUT1IgKyBnZXRDb21wb25lbnRLZXkoY2hpbGQsIDApO1xuICAgICAgICAgICAgc3VidHJlZUNvdW50ICs9IHRyYXZlcnNlQWxsQ2hpbGRyZW5JbXBsKGNoaWxkLCBuZXh0TmFtZSwgY2FsbGJhY2ssIHRyYXZlcnNlQ29udGV4dCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0eXBlID09PSAnb2JqZWN0Jykge1xuICAgICAgdmFyIGFkZGVuZHVtID0gJyc7XG4gICAgICBpZiAoXCJkZXZlbG9wbWVudFwiICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgICAgYWRkZW5kdW0gPSAnIElmIHlvdSBtZWFudCB0byByZW5kZXIgYSBjb2xsZWN0aW9uIG9mIGNoaWxkcmVuLCB1c2UgYW4gYXJyYXkgJyArICdpbnN0ZWFkIG9yIHdyYXAgdGhlIG9iamVjdCB1c2luZyBjcmVhdGVGcmFnbWVudChvYmplY3QpIGZyb20gdGhlICcgKyAnUmVhY3QgYWRkLW9ucy4nO1xuICAgICAgICBpZiAoY2hpbGRyZW4uX2lzUmVhY3RFbGVtZW50KSB7XG4gICAgICAgICAgYWRkZW5kdW0gPSAnIEl0IGxvb2tzIGxpa2UgeW91XFwncmUgdXNpbmcgYW4gZWxlbWVudCBjcmVhdGVkIGJ5IGEgZGlmZmVyZW50ICcgKyAndmVyc2lvbiBvZiBSZWFjdC4gTWFrZSBzdXJlIHRvIHVzZSBvbmx5IG9uZSBjb3B5IG9mIFJlYWN0Lic7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFJlYWN0Q3VycmVudE93bmVyLmN1cnJlbnQpIHtcbiAgICAgICAgICB2YXIgbmFtZSA9IFJlYWN0Q3VycmVudE93bmVyLmN1cnJlbnQuZ2V0TmFtZSgpO1xuICAgICAgICAgIGlmIChuYW1lKSB7XG4gICAgICAgICAgICBhZGRlbmR1bSArPSAnIENoZWNrIHRoZSByZW5kZXIgbWV0aG9kIG9mIGAnICsgbmFtZSArICdgLic7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICB2YXIgY2hpbGRyZW5TdHJpbmcgPSBTdHJpbmcoY2hpbGRyZW4pO1xuICAgICAgIWZhbHNlID8gXCJkZXZlbG9wbWVudFwiICE9PSAncHJvZHVjdGlvbicgPyBpbnZhcmlhbnQoZmFsc2UsICdPYmplY3RzIGFyZSBub3QgdmFsaWQgYXMgYSBSZWFjdCBjaGlsZCAoZm91bmQ6ICVzKS4lcycsIGNoaWxkcmVuU3RyaW5nID09PSAnW29iamVjdCBPYmplY3RdJyA/ICdvYmplY3Qgd2l0aCBrZXlzIHsnICsgT2JqZWN0LmtleXMoY2hpbGRyZW4pLmpvaW4oJywgJykgKyAnfScgOiBjaGlsZHJlblN0cmluZywgYWRkZW5kdW0pIDogX3Byb2RJbnZhcmlhbnQoJzMxJywgY2hpbGRyZW5TdHJpbmcgPT09ICdbb2JqZWN0IE9iamVjdF0nID8gJ29iamVjdCB3aXRoIGtleXMgeycgKyBPYmplY3Qua2V5cyhjaGlsZHJlbikuam9pbignLCAnKSArICd9JyA6IGNoaWxkcmVuU3RyaW5nLCBhZGRlbmR1bSkgOiB2b2lkIDA7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHN1YnRyZWVDb3VudDtcbn1cblxuLyoqXG4gKiBUcmF2ZXJzZXMgY2hpbGRyZW4gdGhhdCBhcmUgdHlwaWNhbGx5IHNwZWNpZmllZCBhcyBgcHJvcHMuY2hpbGRyZW5gLCBidXRcbiAqIG1pZ2h0IGFsc28gYmUgc3BlY2lmaWVkIHRocm91Z2ggYXR0cmlidXRlczpcbiAqXG4gKiAtIGB0cmF2ZXJzZUFsbENoaWxkcmVuKHRoaXMucHJvcHMuY2hpbGRyZW4sIC4uLilgXG4gKiAtIGB0cmF2ZXJzZUFsbENoaWxkcmVuKHRoaXMucHJvcHMubGVmdFBhbmVsQ2hpbGRyZW4sIC4uLilgXG4gKlxuICogVGhlIGB0cmF2ZXJzZUNvbnRleHRgIGlzIGFuIG9wdGlvbmFsIGFyZ3VtZW50IHRoYXQgaXMgcGFzc2VkIHRocm91Z2ggdGhlXG4gKiBlbnRpcmUgdHJhdmVyc2FsLiBJdCBjYW4gYmUgdXNlZCB0byBzdG9yZSBhY2N1bXVsYXRpb25zIG9yIGFueXRoaW5nIGVsc2UgdGhhdFxuICogdGhlIGNhbGxiYWNrIG1pZ2h0IGZpbmQgcmVsZXZhbnQuXG4gKlxuICogQHBhcmFtIHs/Kn0gY2hpbGRyZW4gQ2hpbGRyZW4gdHJlZSBvYmplY3QuXG4gKiBAcGFyYW0geyFmdW5jdGlvbn0gY2FsbGJhY2sgVG8gaW52b2tlIHVwb24gdHJhdmVyc2luZyBlYWNoIGNoaWxkLlxuICogQHBhcmFtIHs/Kn0gdHJhdmVyc2VDb250ZXh0IENvbnRleHQgZm9yIHRyYXZlcnNhbC5cbiAqIEByZXR1cm4geyFudW1iZXJ9IFRoZSBudW1iZXIgb2YgY2hpbGRyZW4gaW4gdGhpcyBzdWJ0cmVlLlxuICovXG5mdW5jdGlvbiB0cmF2ZXJzZUFsbENoaWxkcmVuKGNoaWxkcmVuLCBjYWxsYmFjaywgdHJhdmVyc2VDb250ZXh0KSB7XG4gIGlmIChjaGlsZHJlbiA9PSBudWxsKSB7XG4gICAgcmV0dXJuIDA7XG4gIH1cblxuICByZXR1cm4gdHJhdmVyc2VBbGxDaGlsZHJlbkltcGwoY2hpbGRyZW4sICcnLCBjYWxsYmFjaywgdHJhdmVyc2VDb250ZXh0KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB0cmF2ZXJzZUFsbENoaWxkcmVuOyIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2xpYi9SZWFjdCcpO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX3R5cGVvZiA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiID8gZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfSA6IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07XG5cbmV4cG9ydHMucHJpbnRCdWZmZXIgPSBwcmludEJ1ZmZlcjtcblxudmFyIF9oZWxwZXJzID0gcmVxdWlyZSgnLi9oZWxwZXJzJyk7XG5cbnZhciBfZGlmZiA9IHJlcXVpcmUoJy4vZGlmZicpO1xuXG52YXIgX2RpZmYyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZGlmZik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF90b0NvbnN1bWFibGVBcnJheShhcnIpIHsgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgeyBmb3IgKHZhciBpID0gMCwgYXJyMiA9IEFycmF5KGFyci5sZW5ndGgpOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7IGFycjJbaV0gPSBhcnJbaV07IH0gcmV0dXJuIGFycjI7IH0gZWxzZSB7IHJldHVybiBBcnJheS5mcm9tKGFycik7IH0gfVxuXG4vKipcbiAqIEdldCBsb2cgbGV2ZWwgc3RyaW5nIGJhc2VkIG9uIHN1cHBsaWVkIHBhcmFtc1xuICpcbiAqIEBwYXJhbSB7c3RyaW5nIHwgZnVuY3Rpb24gfCBvYmplY3R9IGxldmVsIC0gY29uc29sZVtsZXZlbF1cbiAqIEBwYXJhbSB7b2JqZWN0fSBhY3Rpb24gLSBzZWxlY3RlZCBhY3Rpb25cbiAqIEBwYXJhbSB7YXJyYXl9IHBheWxvYWQgLSBzZWxlY3RlZCBwYXlsb2FkXG4gKiBAcGFyYW0ge3N0cmluZ30gdHlwZSAtIGxvZyBlbnRyeSB0eXBlXG4gKlxuICogQHJldHVybnMge3N0cmluZ30gbGV2ZWxcbiAqL1xuZnVuY3Rpb24gZ2V0TG9nTGV2ZWwobGV2ZWwsIGFjdGlvbiwgcGF5bG9hZCwgdHlwZSkge1xuICBzd2l0Y2ggKHR5cGVvZiBsZXZlbCA9PT0gJ3VuZGVmaW5lZCcgPyAndW5kZWZpbmVkJyA6IF90eXBlb2YobGV2ZWwpKSB7XG4gICAgY2FzZSAnb2JqZWN0JzpcbiAgICAgIHJldHVybiB0eXBlb2YgbGV2ZWxbdHlwZV0gPT09ICdmdW5jdGlvbicgPyBsZXZlbFt0eXBlXS5hcHBseShsZXZlbCwgX3RvQ29uc3VtYWJsZUFycmF5KHBheWxvYWQpKSA6IGxldmVsW3R5cGVdO1xuICAgIGNhc2UgJ2Z1bmN0aW9uJzpcbiAgICAgIHJldHVybiBsZXZlbChhY3Rpb24pO1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gbGV2ZWw7XG4gIH1cbn1cblxuZnVuY3Rpb24gZGVmYXVsdFRpdGxlRm9ybWF0dGVyKG9wdGlvbnMpIHtcbiAgdmFyIHRpbWVzdGFtcCA9IG9wdGlvbnMudGltZXN0YW1wLFxuICAgICAgZHVyYXRpb24gPSBvcHRpb25zLmR1cmF0aW9uO1xuXG5cbiAgcmV0dXJuIGZ1bmN0aW9uIChhY3Rpb24sIHRpbWUsIHRvb2spIHtcbiAgICB2YXIgcGFydHMgPSBbJ2FjdGlvbiddO1xuXG4gICAgcGFydHMucHVzaCgnJWMnICsgU3RyaW5nKGFjdGlvbi50eXBlKSk7XG4gICAgaWYgKHRpbWVzdGFtcCkgcGFydHMucHVzaCgnJWNAICcgKyB0aW1lKTtcbiAgICBpZiAoZHVyYXRpb24pIHBhcnRzLnB1c2goJyVjKGluICcgKyB0b29rLnRvRml4ZWQoMikgKyAnIG1zKScpO1xuXG4gICAgcmV0dXJuIHBhcnRzLmpvaW4oJyAnKTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gcHJpbnRCdWZmZXIoYnVmZmVyLCBvcHRpb25zKSB7XG4gIHZhciBsb2dnZXIgPSBvcHRpb25zLmxvZ2dlcixcbiAgICAgIGFjdGlvblRyYW5zZm9ybWVyID0gb3B0aW9ucy5hY3Rpb25UcmFuc2Zvcm1lcixcbiAgICAgIF9vcHRpb25zJHRpdGxlRm9ybWF0dCA9IG9wdGlvbnMudGl0bGVGb3JtYXR0ZXIsXG4gICAgICB0aXRsZUZvcm1hdHRlciA9IF9vcHRpb25zJHRpdGxlRm9ybWF0dCA9PT0gdW5kZWZpbmVkID8gZGVmYXVsdFRpdGxlRm9ybWF0dGVyKG9wdGlvbnMpIDogX29wdGlvbnMkdGl0bGVGb3JtYXR0LFxuICAgICAgY29sbGFwc2VkID0gb3B0aW9ucy5jb2xsYXBzZWQsXG4gICAgICBjb2xvcnMgPSBvcHRpb25zLmNvbG9ycyxcbiAgICAgIGxldmVsID0gb3B0aW9ucy5sZXZlbCxcbiAgICAgIGRpZmYgPSBvcHRpb25zLmRpZmY7XG5cblxuICBidWZmZXIuZm9yRWFjaChmdW5jdGlvbiAobG9nRW50cnksIGtleSkge1xuICAgIHZhciBzdGFydGVkID0gbG9nRW50cnkuc3RhcnRlZCxcbiAgICAgICAgc3RhcnRlZFRpbWUgPSBsb2dFbnRyeS5zdGFydGVkVGltZSxcbiAgICAgICAgYWN0aW9uID0gbG9nRW50cnkuYWN0aW9uLFxuICAgICAgICBwcmV2U3RhdGUgPSBsb2dFbnRyeS5wcmV2U3RhdGUsXG4gICAgICAgIGVycm9yID0gbG9nRW50cnkuZXJyb3I7XG4gICAgdmFyIHRvb2sgPSBsb2dFbnRyeS50b29rLFxuICAgICAgICBuZXh0U3RhdGUgPSBsb2dFbnRyeS5uZXh0U3RhdGU7XG5cbiAgICB2YXIgbmV4dEVudHJ5ID0gYnVmZmVyW2tleSArIDFdO1xuXG4gICAgaWYgKG5leHRFbnRyeSkge1xuICAgICAgbmV4dFN0YXRlID0gbmV4dEVudHJ5LnByZXZTdGF0ZTtcbiAgICAgIHRvb2sgPSBuZXh0RW50cnkuc3RhcnRlZCAtIHN0YXJ0ZWQ7XG4gICAgfVxuXG4gICAgLy8gTWVzc2FnZVxuICAgIHZhciBmb3JtYXR0ZWRBY3Rpb24gPSBhY3Rpb25UcmFuc2Zvcm1lcihhY3Rpb24pO1xuICAgIHZhciBpc0NvbGxhcHNlZCA9IHR5cGVvZiBjb2xsYXBzZWQgPT09ICdmdW5jdGlvbicgPyBjb2xsYXBzZWQoZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIG5leHRTdGF0ZTtcbiAgICB9LCBhY3Rpb24sIGxvZ0VudHJ5KSA6IGNvbGxhcHNlZDtcblxuICAgIHZhciBmb3JtYXR0ZWRUaW1lID0gKDAsIF9oZWxwZXJzLmZvcm1hdFRpbWUpKHN0YXJ0ZWRUaW1lKTtcbiAgICB2YXIgdGl0bGVDU1MgPSBjb2xvcnMudGl0bGUgPyAnY29sb3I6ICcgKyBjb2xvcnMudGl0bGUoZm9ybWF0dGVkQWN0aW9uKSArICc7JyA6ICcnO1xuICAgIHZhciBoZWFkZXJDU1MgPSBbJ2NvbG9yOiBncmF5OyBmb250LXdlaWdodDogbGlnaHRlcjsnXTtcbiAgICBoZWFkZXJDU1MucHVzaCh0aXRsZUNTUyk7XG4gICAgaWYgKG9wdGlvbnMudGltZXN0YW1wKSBoZWFkZXJDU1MucHVzaCgnY29sb3I6IGdyYXk7IGZvbnQtd2VpZ2h0OiBsaWdodGVyOycpO1xuICAgIGlmIChvcHRpb25zLmR1cmF0aW9uKSBoZWFkZXJDU1MucHVzaCgnY29sb3I6IGdyYXk7IGZvbnQtd2VpZ2h0OiBsaWdodGVyOycpO1xuICAgIHZhciB0aXRsZSA9IHRpdGxlRm9ybWF0dGVyKGZvcm1hdHRlZEFjdGlvbiwgZm9ybWF0dGVkVGltZSwgdG9vayk7XG5cbiAgICAvLyBSZW5kZXJcbiAgICB0cnkge1xuICAgICAgaWYgKGlzQ29sbGFwc2VkKSB7XG4gICAgICAgIGlmIChjb2xvcnMudGl0bGUpIGxvZ2dlci5ncm91cENvbGxhcHNlZC5hcHBseShsb2dnZXIsIFsnJWMgJyArIHRpdGxlXS5jb25jYXQoaGVhZGVyQ1NTKSk7ZWxzZSBsb2dnZXIuZ3JvdXBDb2xsYXBzZWQodGl0bGUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGNvbG9ycy50aXRsZSkgbG9nZ2VyLmdyb3VwLmFwcGx5KGxvZ2dlciwgWyclYyAnICsgdGl0bGVdLmNvbmNhdChoZWFkZXJDU1MpKTtlbHNlIGxvZ2dlci5ncm91cCh0aXRsZSk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgbG9nZ2VyLmxvZyh0aXRsZSk7XG4gICAgfVxuXG4gICAgdmFyIHByZXZTdGF0ZUxldmVsID0gZ2V0TG9nTGV2ZWwobGV2ZWwsIGZvcm1hdHRlZEFjdGlvbiwgW3ByZXZTdGF0ZV0sICdwcmV2U3RhdGUnKTtcbiAgICB2YXIgYWN0aW9uTGV2ZWwgPSBnZXRMb2dMZXZlbChsZXZlbCwgZm9ybWF0dGVkQWN0aW9uLCBbZm9ybWF0dGVkQWN0aW9uXSwgJ2FjdGlvbicpO1xuICAgIHZhciBlcnJvckxldmVsID0gZ2V0TG9nTGV2ZWwobGV2ZWwsIGZvcm1hdHRlZEFjdGlvbiwgW2Vycm9yLCBwcmV2U3RhdGVdLCAnZXJyb3InKTtcbiAgICB2YXIgbmV4dFN0YXRlTGV2ZWwgPSBnZXRMb2dMZXZlbChsZXZlbCwgZm9ybWF0dGVkQWN0aW9uLCBbbmV4dFN0YXRlXSwgJ25leHRTdGF0ZScpO1xuXG4gICAgaWYgKHByZXZTdGF0ZUxldmVsKSB7XG4gICAgICBpZiAoY29sb3JzLnByZXZTdGF0ZSkgbG9nZ2VyW3ByZXZTdGF0ZUxldmVsXSgnJWMgcHJldiBzdGF0ZScsICdjb2xvcjogJyArIGNvbG9ycy5wcmV2U3RhdGUocHJldlN0YXRlKSArICc7IGZvbnQtd2VpZ2h0OiBib2xkJywgcHJldlN0YXRlKTtlbHNlIGxvZ2dlcltwcmV2U3RhdGVMZXZlbF0oJ3ByZXYgc3RhdGUnLCBwcmV2U3RhdGUpO1xuICAgIH1cblxuICAgIGlmIChhY3Rpb25MZXZlbCkge1xuICAgICAgaWYgKGNvbG9ycy5hY3Rpb24pIGxvZ2dlclthY3Rpb25MZXZlbF0oJyVjIGFjdGlvbiAgICAnLCAnY29sb3I6ICcgKyBjb2xvcnMuYWN0aW9uKGZvcm1hdHRlZEFjdGlvbikgKyAnOyBmb250LXdlaWdodDogYm9sZCcsIGZvcm1hdHRlZEFjdGlvbik7ZWxzZSBsb2dnZXJbYWN0aW9uTGV2ZWxdKCdhY3Rpb24gICAgJywgZm9ybWF0dGVkQWN0aW9uKTtcbiAgICB9XG5cbiAgICBpZiAoZXJyb3IgJiYgZXJyb3JMZXZlbCkge1xuICAgICAgaWYgKGNvbG9ycy5lcnJvcikgbG9nZ2VyW2Vycm9yTGV2ZWxdKCclYyBlcnJvciAgICAgJywgJ2NvbG9yOiAnICsgY29sb3JzLmVycm9yKGVycm9yLCBwcmV2U3RhdGUpICsgJzsgZm9udC13ZWlnaHQ6IGJvbGQ7JywgZXJyb3IpO2Vsc2UgbG9nZ2VyW2Vycm9yTGV2ZWxdKCdlcnJvciAgICAgJywgZXJyb3IpO1xuICAgIH1cblxuICAgIGlmIChuZXh0U3RhdGVMZXZlbCkge1xuICAgICAgaWYgKGNvbG9ycy5uZXh0U3RhdGUpIGxvZ2dlcltuZXh0U3RhdGVMZXZlbF0oJyVjIG5leHQgc3RhdGUnLCAnY29sb3I6ICcgKyBjb2xvcnMubmV4dFN0YXRlKG5leHRTdGF0ZSkgKyAnOyBmb250LXdlaWdodDogYm9sZCcsIG5leHRTdGF0ZSk7ZWxzZSBsb2dnZXJbbmV4dFN0YXRlTGV2ZWxdKCduZXh0IHN0YXRlJywgbmV4dFN0YXRlKTtcbiAgICB9XG5cbiAgICBpZiAoZGlmZikge1xuICAgICAgKDAsIF9kaWZmMi5kZWZhdWx0KShwcmV2U3RhdGUsIG5leHRTdGF0ZSwgbG9nZ2VyLCBpc0NvbGxhcHNlZCk7XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIGxvZ2dlci5ncm91cEVuZCgpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGxvZ2dlci5sb2coJ1xcdTIwMTRcXHUyMDE0IGxvZyBlbmQgXFx1MjAxNFxcdTIwMTQnKTtcbiAgICB9XG4gIH0pO1xufSIsIlwidXNlIHN0cmljdFwiO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5kZWZhdWx0ID0ge1xuICBsZXZlbDogXCJsb2dcIixcbiAgbG9nZ2VyOiBjb25zb2xlLFxuICBsb2dFcnJvcnM6IHRydWUsXG4gIGNvbGxhcHNlZDogdW5kZWZpbmVkLFxuICBwcmVkaWNhdGU6IHVuZGVmaW5lZCxcbiAgZHVyYXRpb246IGZhbHNlLFxuICB0aW1lc3RhbXA6IHRydWUsXG4gIHN0YXRlVHJhbnNmb3JtZXI6IGZ1bmN0aW9uIHN0YXRlVHJhbnNmb3JtZXIoc3RhdGUpIHtcbiAgICByZXR1cm4gc3RhdGU7XG4gIH0sXG4gIGFjdGlvblRyYW5zZm9ybWVyOiBmdW5jdGlvbiBhY3Rpb25UcmFuc2Zvcm1lcihhY3Rpb24pIHtcbiAgICByZXR1cm4gYWN0aW9uO1xuICB9LFxuICBlcnJvclRyYW5zZm9ybWVyOiBmdW5jdGlvbiBlcnJvclRyYW5zZm9ybWVyKGVycm9yKSB7XG4gICAgcmV0dXJuIGVycm9yO1xuICB9LFxuICBjb2xvcnM6IHtcbiAgICB0aXRsZTogZnVuY3Rpb24gdGl0bGUoKSB7XG4gICAgICByZXR1cm4gXCJpbmhlcml0XCI7XG4gICAgfSxcbiAgICBwcmV2U3RhdGU6IGZ1bmN0aW9uIHByZXZTdGF0ZSgpIHtcbiAgICAgIHJldHVybiBcIiM5RTlFOUVcIjtcbiAgICB9LFxuICAgIGFjdGlvbjogZnVuY3Rpb24gYWN0aW9uKCkge1xuICAgICAgcmV0dXJuIFwiIzAzQTlGNFwiO1xuICAgIH0sXG4gICAgbmV4dFN0YXRlOiBmdW5jdGlvbiBuZXh0U3RhdGUoKSB7XG4gICAgICByZXR1cm4gXCIjNENBRjUwXCI7XG4gICAgfSxcbiAgICBlcnJvcjogZnVuY3Rpb24gZXJyb3IoKSB7XG4gICAgICByZXR1cm4gXCIjRjIwNDA0XCI7XG4gICAgfVxuICB9LFxuICBkaWZmOiBmYWxzZSxcbiAgZGlmZlByZWRpY2F0ZTogdW5kZWZpbmVkLFxuXG4gIC8vIERlcHJlY2F0ZWQgb3B0aW9uc1xuICB0cmFuc2Zvcm1lcjogdW5kZWZpbmVkXG59O1xubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzW1wiZGVmYXVsdFwiXTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSBkaWZmTG9nZ2VyO1xuXG52YXIgX2RlZXBEaWZmID0gcmVxdWlyZSgnZGVlcC1kaWZmJyk7XG5cbnZhciBfZGVlcERpZmYyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZGVlcERpZmYpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfdG9Db25zdW1hYmxlQXJyYXkoYXJyKSB7IGlmIChBcnJheS5pc0FycmF5KGFycikpIHsgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBBcnJheShhcnIubGVuZ3RoKTsgaSA8IGFyci5sZW5ndGg7IGkrKykgeyBhcnIyW2ldID0gYXJyW2ldOyB9IHJldHVybiBhcnIyOyB9IGVsc2UgeyByZXR1cm4gQXJyYXkuZnJvbShhcnIpOyB9IH1cblxuLy8gaHR0cHM6Ly9naXRodWIuY29tL2ZsaXRiaXQvZGlmZiNkaWZmZXJlbmNlc1xudmFyIGRpY3Rpb25hcnkgPSB7XG4gICdFJzoge1xuICAgIGNvbG9yOiAnIzIxOTZGMycsXG4gICAgdGV4dDogJ0NIQU5HRUQ6J1xuICB9LFxuICAnTic6IHtcbiAgICBjb2xvcjogJyM0Q0FGNTAnLFxuICAgIHRleHQ6ICdBRERFRDonXG4gIH0sXG4gICdEJzoge1xuICAgIGNvbG9yOiAnI0Y0NDMzNicsXG4gICAgdGV4dDogJ0RFTEVURUQ6J1xuICB9LFxuICAnQSc6IHtcbiAgICBjb2xvcjogJyMyMTk2RjMnLFxuICAgIHRleHQ6ICdBUlJBWTonXG4gIH1cbn07XG5cbmZ1bmN0aW9uIHN0eWxlKGtpbmQpIHtcbiAgcmV0dXJuICdjb2xvcjogJyArIGRpY3Rpb25hcnlba2luZF0uY29sb3IgKyAnOyBmb250LXdlaWdodDogYm9sZCc7XG59XG5cbmZ1bmN0aW9uIHJlbmRlcihkaWZmKSB7XG4gIHZhciBraW5kID0gZGlmZi5raW5kLFxuICAgICAgcGF0aCA9IGRpZmYucGF0aCxcbiAgICAgIGxocyA9IGRpZmYubGhzLFxuICAgICAgcmhzID0gZGlmZi5yaHMsXG4gICAgICBpbmRleCA9IGRpZmYuaW5kZXgsXG4gICAgICBpdGVtID0gZGlmZi5pdGVtO1xuXG5cbiAgc3dpdGNoIChraW5kKSB7XG4gICAgY2FzZSAnRSc6XG4gICAgICByZXR1cm4gW3BhdGguam9pbignLicpLCBsaHMsICdcXHUyMTkyJywgcmhzXTtcbiAgICBjYXNlICdOJzpcbiAgICAgIHJldHVybiBbcGF0aC5qb2luKCcuJyksIHJoc107XG4gICAgY2FzZSAnRCc6XG4gICAgICByZXR1cm4gW3BhdGguam9pbignLicpXTtcbiAgICBjYXNlICdBJzpcbiAgICAgIHJldHVybiBbcGF0aC5qb2luKCcuJykgKyAnWycgKyBpbmRleCArICddJywgaXRlbV07XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBbXTtcbiAgfVxufVxuXG5mdW5jdGlvbiBkaWZmTG9nZ2VyKHByZXZTdGF0ZSwgbmV3U3RhdGUsIGxvZ2dlciwgaXNDb2xsYXBzZWQpIHtcbiAgdmFyIGRpZmYgPSAoMCwgX2RlZXBEaWZmMi5kZWZhdWx0KShwcmV2U3RhdGUsIG5ld1N0YXRlKTtcblxuICB0cnkge1xuICAgIGlmIChpc0NvbGxhcHNlZCkge1xuICAgICAgbG9nZ2VyLmdyb3VwQ29sbGFwc2VkKCdkaWZmJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxvZ2dlci5ncm91cCgnZGlmZicpO1xuICAgIH1cbiAgfSBjYXRjaCAoZSkge1xuICAgIGxvZ2dlci5sb2coJ2RpZmYnKTtcbiAgfVxuXG4gIGlmIChkaWZmKSB7XG4gICAgZGlmZi5mb3JFYWNoKGZ1bmN0aW9uIChlbGVtKSB7XG4gICAgICB2YXIga2luZCA9IGVsZW0ua2luZDtcblxuICAgICAgdmFyIG91dHB1dCA9IHJlbmRlcihlbGVtKTtcblxuICAgICAgbG9nZ2VyLmxvZy5hcHBseShsb2dnZXIsIFsnJWMgJyArIGRpY3Rpb25hcnlba2luZF0udGV4dCwgc3R5bGUoa2luZCldLmNvbmNhdChfdG9Db25zdW1hYmxlQXJyYXkob3V0cHV0KSkpO1xuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIGxvZ2dlci5sb2coJ1xcdTIwMTRcXHUyMDE0IG5vIGRpZmYgXFx1MjAxNFxcdTIwMTQnKTtcbiAgfVxuXG4gIHRyeSB7XG4gICAgbG9nZ2VyLmdyb3VwRW5kKCk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBsb2dnZXIubG9nKCdcXHUyMDE0XFx1MjAxNCBkaWZmIGVuZCBcXHUyMDE0XFx1MjAxNCAnKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBleHBvcnRzWydkZWZhdWx0J107IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG52YXIgcmVwZWF0ID0gZXhwb3J0cy5yZXBlYXQgPSBmdW5jdGlvbiByZXBlYXQoc3RyLCB0aW1lcykge1xuICByZXR1cm4gbmV3IEFycmF5KHRpbWVzICsgMSkuam9pbihzdHIpO1xufTtcblxudmFyIHBhZCA9IGV4cG9ydHMucGFkID0gZnVuY3Rpb24gcGFkKG51bSwgbWF4TGVuZ3RoKSB7XG4gIHJldHVybiByZXBlYXQoXCIwXCIsIG1heExlbmd0aCAtIG51bS50b1N0cmluZygpLmxlbmd0aCkgKyBudW07XG59O1xuXG52YXIgZm9ybWF0VGltZSA9IGV4cG9ydHMuZm9ybWF0VGltZSA9IGZ1bmN0aW9uIGZvcm1hdFRpbWUodGltZSkge1xuICByZXR1cm4gcGFkKHRpbWUuZ2V0SG91cnMoKSwgMikgKyBcIjpcIiArIHBhZCh0aW1lLmdldE1pbnV0ZXMoKSwgMikgKyBcIjpcIiArIHBhZCh0aW1lLmdldFNlY29uZHMoKSwgMikgKyBcIi5cIiArIHBhZCh0aW1lLmdldE1pbGxpc2Vjb25kcygpLCAzKTtcbn07XG5cbi8vIFVzZSBwZXJmb3JtYW5jZSBBUEkgaWYgaXQncyBhdmFpbGFibGUgaW4gb3JkZXIgdG8gZ2V0IGJldHRlciBwcmVjaXNpb25cbnZhciB0aW1lciA9IGV4cG9ydHMudGltZXIgPSB0eXBlb2YgcGVyZm9ybWFuY2UgIT09IFwidW5kZWZpbmVkXCIgJiYgcGVyZm9ybWFuY2UgIT09IG51bGwgJiYgdHlwZW9mIHBlcmZvcm1hbmNlLm5vdyA9PT0gXCJmdW5jdGlvblwiID8gcGVyZm9ybWFuY2UgOiBEYXRlOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMubG9nZ2VyID0gZXhwb3J0cy5jcmVhdGVMb2dnZXIgPSBleHBvcnRzLmRlZmF1bHRzID0gdW5kZWZpbmVkO1xuXG52YXIgX2V4dGVuZHMgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uICh0YXJnZXQpIHsgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHsgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTsgZm9yICh2YXIga2V5IGluIHNvdXJjZSkgeyBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkgeyB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldOyB9IH0gfSByZXR1cm4gdGFyZ2V0OyB9O1xuXG52YXIgX2NvcmUgPSByZXF1aXJlKCcuL2NvcmUnKTtcblxudmFyIF9oZWxwZXJzID0gcmVxdWlyZSgnLi9oZWxwZXJzJyk7XG5cbnZhciBfZGVmYXVsdHMgPSByZXF1aXJlKCcuL2RlZmF1bHRzJyk7XG5cbnZhciBfZGVmYXVsdHMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZGVmYXVsdHMpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG4vKipcbiAqIENyZWF0ZXMgbG9nZ2VyIHdpdGggZm9sbG93aW5nIG9wdGlvbnNcbiAqXG4gKiBAbmFtZXNwYWNlXG4gKiBAcGFyYW0ge29iamVjdH0gb3B0aW9ucyAtIG9wdGlvbnMgZm9yIGxvZ2dlclxuICogQHBhcmFtIHtzdHJpbmcgfCBmdW5jdGlvbiB8IG9iamVjdH0gb3B0aW9ucy5sZXZlbCAtIGNvbnNvbGVbbGV2ZWxdXG4gKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMuZHVyYXRpb24gLSBwcmludCBkdXJhdGlvbiBvZiBlYWNoIGFjdGlvbj9cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy50aW1lc3RhbXAgLSBwcmludCB0aW1lc3RhbXAgd2l0aCBlYWNoIGFjdGlvbj9cbiAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zLmNvbG9ycyAtIGN1c3RvbSBjb2xvcnNcbiAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zLmxvZ2dlciAtIGltcGxlbWVudGF0aW9uIG9mIHRoZSBgY29uc29sZWAgQVBJXG4gKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMubG9nRXJyb3JzIC0gc2hvdWxkIGVycm9ycyBpbiBhY3Rpb24gZXhlY3V0aW9uIGJlIGNhdWdodCwgbG9nZ2VkLCBhbmQgcmUtdGhyb3duP1xuICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLmNvbGxhcHNlZCAtIGlzIGdyb3VwIGNvbGxhcHNlZD9cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wcmVkaWNhdGUgLSBjb25kaXRpb24gd2hpY2ggcmVzb2x2ZXMgbG9nZ2VyIGJlaGF2aW9yXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBvcHRpb25zLnN0YXRlVHJhbnNmb3JtZXIgLSB0cmFuc2Zvcm0gc3RhdGUgYmVmb3JlIHByaW50XG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBvcHRpb25zLmFjdGlvblRyYW5zZm9ybWVyIC0gdHJhbnNmb3JtIGFjdGlvbiBiZWZvcmUgcHJpbnRcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IG9wdGlvbnMuZXJyb3JUcmFuc2Zvcm1lciAtIHRyYW5zZm9ybSBlcnJvciBiZWZvcmUgcHJpbnRcbiAqXG4gKiBAcmV0dXJucyB7ZnVuY3Rpb259IGxvZ2dlciBtaWRkbGV3YXJlXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUxvZ2dlcigpIHtcbiAgdmFyIG9wdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IHt9O1xuXG4gIHZhciBsb2dnZXJPcHRpb25zID0gX2V4dGVuZHMoe30sIF9kZWZhdWx0czIuZGVmYXVsdCwgb3B0aW9ucyk7XG5cbiAgdmFyIGxvZ2dlciA9IGxvZ2dlck9wdGlvbnMubG9nZ2VyLFxuICAgICAgc3RhdGVUcmFuc2Zvcm1lciA9IGxvZ2dlck9wdGlvbnMuc3RhdGVUcmFuc2Zvcm1lcixcbiAgICAgIGVycm9yVHJhbnNmb3JtZXIgPSBsb2dnZXJPcHRpb25zLmVycm9yVHJhbnNmb3JtZXIsXG4gICAgICBwcmVkaWNhdGUgPSBsb2dnZXJPcHRpb25zLnByZWRpY2F0ZSxcbiAgICAgIGxvZ0Vycm9ycyA9IGxvZ2dlck9wdGlvbnMubG9nRXJyb3JzLFxuICAgICAgZGlmZlByZWRpY2F0ZSA9IGxvZ2dlck9wdGlvbnMuZGlmZlByZWRpY2F0ZTtcblxuICAvLyBSZXR1cm4gaWYgJ2NvbnNvbGUnIG9iamVjdCBpcyBub3QgZGVmaW5lZFxuXG4gIGlmICh0eXBlb2YgbG9nZ2VyID09PSAndW5kZWZpbmVkJykge1xuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKG5leHQpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChhY3Rpb24pIHtcbiAgICAgICAgICByZXR1cm4gbmV4dChhY3Rpb24pO1xuICAgICAgICB9O1xuICAgICAgfTtcbiAgICB9O1xuICB9XG5cbiAgLy8gRGV0ZWN0IGlmICdjcmVhdGVMb2dnZXInIHdhcyBwYXNzZWQgZGlyZWN0bHkgdG8gJ2FwcGx5TWlkZGxld2FyZScuXG4gIGlmIChvcHRpb25zLmdldFN0YXRlICYmIG9wdGlvbnMuZGlzcGF0Y2gpIHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc29sZVxuICAgIGNvbnNvbGUuZXJyb3IoJ1tyZWR1eC1sb2dnZXJdIHJlZHV4LWxvZ2dlciBub3QgaW5zdGFsbGVkLiBNYWtlIHN1cmUgdG8gcGFzcyBsb2dnZXIgaW5zdGFuY2UgYXMgbWlkZGxld2FyZTpcXG4vLyBMb2dnZXIgd2l0aCBkZWZhdWx0IG9wdGlvbnNcXG5pbXBvcnQgeyBsb2dnZXIgfSBmcm9tIFxcJ3JlZHV4LWxvZ2dlclxcJ1xcbmNvbnN0IHN0b3JlID0gY3JlYXRlU3RvcmUoXFxuICByZWR1Y2VyLFxcbiAgYXBwbHlNaWRkbGV3YXJlKGxvZ2dlcilcXG4pXFxuLy8gT3IgeW91IGNhbiBjcmVhdGUgeW91ciBvd24gbG9nZ2VyIHdpdGggY3VzdG9tIG9wdGlvbnMgaHR0cDovL2JpdC5seS9yZWR1eC1sb2dnZXItb3B0aW9uc1xcbmltcG9ydCBjcmVhdGVMb2dnZXIgZnJvbSBcXCdyZWR1eC1sb2dnZXJcXCdcXG5jb25zdCBsb2dnZXIgPSBjcmVhdGVMb2dnZXIoe1xcbiAgLy8gLi4ub3B0aW9uc1xcbn0pO1xcbmNvbnN0IHN0b3JlID0gY3JlYXRlU3RvcmUoXFxuICByZWR1Y2VyLFxcbiAgYXBwbHlNaWRkbGV3YXJlKGxvZ2dlcilcXG4pXFxuJyk7XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uIChuZXh0KSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoYWN0aW9uKSB7XG4gICAgICAgICAgcmV0dXJuIG5leHQoYWN0aW9uKTtcbiAgICAgICAgfTtcbiAgICAgIH07XG4gICAgfTtcbiAgfVxuXG4gIHZhciBsb2dCdWZmZXIgPSBbXTtcblxuICByZXR1cm4gZnVuY3Rpb24gKF9yZWYpIHtcbiAgICB2YXIgZ2V0U3RhdGUgPSBfcmVmLmdldFN0YXRlO1xuICAgIHJldHVybiBmdW5jdGlvbiAobmV4dCkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uIChhY3Rpb24pIHtcbiAgICAgICAgLy8gRXhpdCBlYXJseSBpZiBwcmVkaWNhdGUgZnVuY3Rpb24gcmV0dXJucyAnZmFsc2UnXG4gICAgICAgIGlmICh0eXBlb2YgcHJlZGljYXRlID09PSAnZnVuY3Rpb24nICYmICFwcmVkaWNhdGUoZ2V0U3RhdGUsIGFjdGlvbikpIHtcbiAgICAgICAgICByZXR1cm4gbmV4dChhY3Rpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGxvZ0VudHJ5ID0ge307XG5cbiAgICAgICAgbG9nQnVmZmVyLnB1c2gobG9nRW50cnkpO1xuXG4gICAgICAgIGxvZ0VudHJ5LnN0YXJ0ZWQgPSBfaGVscGVycy50aW1lci5ub3coKTtcbiAgICAgICAgbG9nRW50cnkuc3RhcnRlZFRpbWUgPSBuZXcgRGF0ZSgpO1xuICAgICAgICBsb2dFbnRyeS5wcmV2U3RhdGUgPSBzdGF0ZVRyYW5zZm9ybWVyKGdldFN0YXRlKCkpO1xuICAgICAgICBsb2dFbnRyeS5hY3Rpb24gPSBhY3Rpb247XG5cbiAgICAgICAgdmFyIHJldHVybmVkVmFsdWUgPSB2b2lkIDA7XG4gICAgICAgIGlmIChsb2dFcnJvcnMpIHtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgcmV0dXJuZWRWYWx1ZSA9IG5leHQoYWN0aW9uKTtcbiAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICBsb2dFbnRyeS5lcnJvciA9IGVycm9yVHJhbnNmb3JtZXIoZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybmVkVmFsdWUgPSBuZXh0KGFjdGlvbik7XG4gICAgICAgIH1cblxuICAgICAgICBsb2dFbnRyeS50b29rID0gX2hlbHBlcnMudGltZXIubm93KCkgLSBsb2dFbnRyeS5zdGFydGVkO1xuICAgICAgICBsb2dFbnRyeS5uZXh0U3RhdGUgPSBzdGF0ZVRyYW5zZm9ybWVyKGdldFN0YXRlKCkpO1xuXG4gICAgICAgIHZhciBkaWZmID0gbG9nZ2VyT3B0aW9ucy5kaWZmICYmIHR5cGVvZiBkaWZmUHJlZGljYXRlID09PSAnZnVuY3Rpb24nID8gZGlmZlByZWRpY2F0ZShnZXRTdGF0ZSwgYWN0aW9uKSA6IGxvZ2dlck9wdGlvbnMuZGlmZjtcblxuICAgICAgICAoMCwgX2NvcmUucHJpbnRCdWZmZXIpKGxvZ0J1ZmZlciwgX2V4dGVuZHMoe30sIGxvZ2dlck9wdGlvbnMsIHsgZGlmZjogZGlmZiB9KSk7XG4gICAgICAgIGxvZ0J1ZmZlci5sZW5ndGggPSAwO1xuXG4gICAgICAgIGlmIChsb2dFbnRyeS5lcnJvcikgdGhyb3cgbG9nRW50cnkuZXJyb3I7XG4gICAgICAgIHJldHVybiByZXR1cm5lZFZhbHVlO1xuICAgICAgfTtcbiAgICB9O1xuICB9O1xufVxuXG52YXIgZGVmYXVsdExvZ2dlciA9IGZ1bmN0aW9uIGRlZmF1bHRMb2dnZXIoKSB7XG4gIHZhciBfcmVmMiA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDoge30sXG4gICAgICBkaXNwYXRjaCA9IF9yZWYyLmRpc3BhdGNoLFxuICAgICAgZ2V0U3RhdGUgPSBfcmVmMi5nZXRTdGF0ZTtcblxuICBpZiAodHlwZW9mIGRpc3BhdGNoID09PSAnZnVuY3Rpb24nIHx8IHR5cGVvZiBnZXRTdGF0ZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBjcmVhdGVMb2dnZXIoKSh7IGRpc3BhdGNoOiBkaXNwYXRjaCwgZ2V0U3RhdGU6IGdldFN0YXRlIH0pO1xuICB9IGVsc2Uge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgY29uc29sZS5lcnJvcignXFxuW3JlZHV4LWxvZ2dlciB2M10gQlJFQUtJTkcgQ0hBTkdFXFxuW3JlZHV4LWxvZ2dlciB2M10gU2luY2UgMy4wLjAgcmVkdXgtbG9nZ2VyIGV4cG9ydHMgYnkgZGVmYXVsdCBsb2dnZXIgd2l0aCBkZWZhdWx0IHNldHRpbmdzLlxcbltyZWR1eC1sb2dnZXIgdjNdIENoYW5nZVxcbltyZWR1eC1sb2dnZXIgdjNdIGltcG9ydCBjcmVhdGVMb2dnZXIgZnJvbSBcXCdyZWR1eC1sb2dnZXJcXCdcXG5bcmVkdXgtbG9nZ2VyIHYzXSB0b1xcbltyZWR1eC1sb2dnZXIgdjNdIGltcG9ydCB7IGNyZWF0ZUxvZ2dlciB9IGZyb20gXFwncmVkdXgtbG9nZ2VyXFwnXFxuJyk7XG4gIH1cbn07XG5cbmV4cG9ydHMuZGVmYXVsdHMgPSBfZGVmYXVsdHMyLmRlZmF1bHQ7XG5leHBvcnRzLmNyZWF0ZUxvZ2dlciA9IGNyZWF0ZUxvZ2dlcjtcbmV4cG9ydHMubG9nZ2VyID0gZGVmYXVsdExvZ2dlcjtcbmV4cG9ydHMuZGVmYXVsdCA9IGRlZmF1bHRMb2dnZXI7IiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuZnVuY3Rpb24gY3JlYXRlVGh1bmtNaWRkbGV3YXJlKGV4dHJhQXJndW1lbnQpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChfcmVmKSB7XG4gICAgdmFyIGRpc3BhdGNoID0gX3JlZi5kaXNwYXRjaCxcbiAgICAgICAgZ2V0U3RhdGUgPSBfcmVmLmdldFN0YXRlO1xuICAgIHJldHVybiBmdW5jdGlvbiAobmV4dCkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uIChhY3Rpb24pIHtcbiAgICAgICAgaWYgKHR5cGVvZiBhY3Rpb24gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICByZXR1cm4gYWN0aW9uKGRpc3BhdGNoLCBnZXRTdGF0ZSwgZXh0cmFBcmd1bWVudCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gbmV4dChhY3Rpb24pO1xuICAgICAgfTtcbiAgICB9O1xuICB9O1xufVxuXG52YXIgdGh1bmsgPSBjcmVhdGVUaHVua01pZGRsZXdhcmUoKTtcbnRodW5rLndpdGhFeHRyYUFyZ3VtZW50ID0gY3JlYXRlVGh1bmtNaWRkbGV3YXJlO1xuXG5leHBvcnRzWydkZWZhdWx0J10gPSB0aHVuazsiLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCkgeyBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgeyB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldOyBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7IHRhcmdldFtrZXldID0gc291cmNlW2tleV07IH0gfSB9IHJldHVybiB0YXJnZXQ7IH07XG5cbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IGFwcGx5TWlkZGxld2FyZTtcblxudmFyIF9jb21wb3NlID0gcmVxdWlyZSgnLi9jb21wb3NlJyk7XG5cbnZhciBfY29tcG9zZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jb21wb3NlKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgJ2RlZmF1bHQnOiBvYmogfTsgfVxuXG4vKipcbiAqIENyZWF0ZXMgYSBzdG9yZSBlbmhhbmNlciB0aGF0IGFwcGxpZXMgbWlkZGxld2FyZSB0byB0aGUgZGlzcGF0Y2ggbWV0aG9kXG4gKiBvZiB0aGUgUmVkdXggc3RvcmUuIFRoaXMgaXMgaGFuZHkgZm9yIGEgdmFyaWV0eSBvZiB0YXNrcywgc3VjaCBhcyBleHByZXNzaW5nXG4gKiBhc3luY2hyb25vdXMgYWN0aW9ucyBpbiBhIGNvbmNpc2UgbWFubmVyLCBvciBsb2dnaW5nIGV2ZXJ5IGFjdGlvbiBwYXlsb2FkLlxuICpcbiAqIFNlZSBgcmVkdXgtdGh1bmtgIHBhY2thZ2UgYXMgYW4gZXhhbXBsZSBvZiB0aGUgUmVkdXggbWlkZGxld2FyZS5cbiAqXG4gKiBCZWNhdXNlIG1pZGRsZXdhcmUgaXMgcG90ZW50aWFsbHkgYXN5bmNocm9ub3VzLCB0aGlzIHNob3VsZCBiZSB0aGUgZmlyc3RcbiAqIHN0b3JlIGVuaGFuY2VyIGluIHRoZSBjb21wb3NpdGlvbiBjaGFpbi5cbiAqXG4gKiBOb3RlIHRoYXQgZWFjaCBtaWRkbGV3YXJlIHdpbGwgYmUgZ2l2ZW4gdGhlIGBkaXNwYXRjaGAgYW5kIGBnZXRTdGF0ZWAgZnVuY3Rpb25zXG4gKiBhcyBuYW1lZCBhcmd1bWVudHMuXG4gKlxuICogQHBhcmFtIHsuLi5GdW5jdGlvbn0gbWlkZGxld2FyZXMgVGhlIG1pZGRsZXdhcmUgY2hhaW4gdG8gYmUgYXBwbGllZC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gQSBzdG9yZSBlbmhhbmNlciBhcHBseWluZyB0aGUgbWlkZGxld2FyZS5cbiAqL1xuZnVuY3Rpb24gYXBwbHlNaWRkbGV3YXJlKCkge1xuICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgbWlkZGxld2FyZXMgPSBBcnJheShfbGVuKSwgX2tleSA9IDA7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICBtaWRkbGV3YXJlc1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbiAoY3JlYXRlU3RvcmUpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKHJlZHVjZXIsIHByZWxvYWRlZFN0YXRlLCBlbmhhbmNlcikge1xuICAgICAgdmFyIHN0b3JlID0gY3JlYXRlU3RvcmUocmVkdWNlciwgcHJlbG9hZGVkU3RhdGUsIGVuaGFuY2VyKTtcbiAgICAgIHZhciBfZGlzcGF0Y2ggPSBzdG9yZS5kaXNwYXRjaDtcbiAgICAgIHZhciBjaGFpbiA9IFtdO1xuXG4gICAgICB2YXIgbWlkZGxld2FyZUFQSSA9IHtcbiAgICAgICAgZ2V0U3RhdGU6IHN0b3JlLmdldFN0YXRlLFxuICAgICAgICBkaXNwYXRjaDogZnVuY3Rpb24gZGlzcGF0Y2goYWN0aW9uKSB7XG4gICAgICAgICAgcmV0dXJuIF9kaXNwYXRjaChhY3Rpb24pO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgY2hhaW4gPSBtaWRkbGV3YXJlcy5tYXAoZnVuY3Rpb24gKG1pZGRsZXdhcmUpIHtcbiAgICAgICAgcmV0dXJuIG1pZGRsZXdhcmUobWlkZGxld2FyZUFQSSk7XG4gICAgICB9KTtcbiAgICAgIF9kaXNwYXRjaCA9IF9jb21wb3NlMlsnZGVmYXVsdCddLmFwcGx5KHVuZGVmaW5lZCwgY2hhaW4pKHN0b3JlLmRpc3BhdGNoKTtcblxuICAgICAgcmV0dXJuIF9leHRlbmRzKHt9LCBzdG9yZSwge1xuICAgICAgICBkaXNwYXRjaDogX2Rpc3BhdGNoXG4gICAgICB9KTtcbiAgICB9O1xuICB9O1xufSIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IGJpbmRBY3Rpb25DcmVhdG9ycztcbmZ1bmN0aW9uIGJpbmRBY3Rpb25DcmVhdG9yKGFjdGlvbkNyZWF0b3IsIGRpc3BhdGNoKSB7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIGRpc3BhdGNoKGFjdGlvbkNyZWF0b3IuYXBwbHkodW5kZWZpbmVkLCBhcmd1bWVudHMpKTtcbiAgfTtcbn1cblxuLyoqXG4gKiBUdXJucyBhbiBvYmplY3Qgd2hvc2UgdmFsdWVzIGFyZSBhY3Rpb24gY3JlYXRvcnMsIGludG8gYW4gb2JqZWN0IHdpdGggdGhlXG4gKiBzYW1lIGtleXMsIGJ1dCB3aXRoIGV2ZXJ5IGZ1bmN0aW9uIHdyYXBwZWQgaW50byBhIGBkaXNwYXRjaGAgY2FsbCBzbyB0aGV5XG4gKiBtYXkgYmUgaW52b2tlZCBkaXJlY3RseS4gVGhpcyBpcyBqdXN0IGEgY29udmVuaWVuY2UgbWV0aG9kLCBhcyB5b3UgY2FuIGNhbGxcbiAqIGBzdG9yZS5kaXNwYXRjaChNeUFjdGlvbkNyZWF0b3JzLmRvU29tZXRoaW5nKCkpYCB5b3Vyc2VsZiBqdXN0IGZpbmUuXG4gKlxuICogRm9yIGNvbnZlbmllbmNlLCB5b3UgY2FuIGFsc28gcGFzcyBhIHNpbmdsZSBmdW5jdGlvbiBhcyB0aGUgZmlyc3QgYXJndW1lbnQsXG4gKiBhbmQgZ2V0IGEgZnVuY3Rpb24gaW4gcmV0dXJuLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb258T2JqZWN0fSBhY3Rpb25DcmVhdG9ycyBBbiBvYmplY3Qgd2hvc2UgdmFsdWVzIGFyZSBhY3Rpb25cbiAqIGNyZWF0b3IgZnVuY3Rpb25zLiBPbmUgaGFuZHkgd2F5IHRvIG9idGFpbiBpdCBpcyB0byB1c2UgRVM2IGBpbXBvcnQgKiBhc2BcbiAqIHN5bnRheC4gWW91IG1heSBhbHNvIHBhc3MgYSBzaW5nbGUgZnVuY3Rpb24uXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZGlzcGF0Y2ggVGhlIGBkaXNwYXRjaGAgZnVuY3Rpb24gYXZhaWxhYmxlIG9uIHlvdXIgUmVkdXhcbiAqIHN0b3JlLlxuICpcbiAqIEByZXR1cm5zIHtGdW5jdGlvbnxPYmplY3R9IFRoZSBvYmplY3QgbWltaWNraW5nIHRoZSBvcmlnaW5hbCBvYmplY3QsIGJ1dCB3aXRoXG4gKiBldmVyeSBhY3Rpb24gY3JlYXRvciB3cmFwcGVkIGludG8gdGhlIGBkaXNwYXRjaGAgY2FsbC4gSWYgeW91IHBhc3NlZCBhXG4gKiBmdW5jdGlvbiBhcyBgYWN0aW9uQ3JlYXRvcnNgLCB0aGUgcmV0dXJuIHZhbHVlIHdpbGwgYWxzbyBiZSBhIHNpbmdsZVxuICogZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGJpbmRBY3Rpb25DcmVhdG9ycyhhY3Rpb25DcmVhdG9ycywgZGlzcGF0Y2gpIHtcbiAgaWYgKHR5cGVvZiBhY3Rpb25DcmVhdG9ycyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiBiaW5kQWN0aW9uQ3JlYXRvcihhY3Rpb25DcmVhdG9ycywgZGlzcGF0Y2gpO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBhY3Rpb25DcmVhdG9ycyAhPT0gJ29iamVjdCcgfHwgYWN0aW9uQ3JlYXRvcnMgPT09IG51bGwpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2JpbmRBY3Rpb25DcmVhdG9ycyBleHBlY3RlZCBhbiBvYmplY3Qgb3IgYSBmdW5jdGlvbiwgaW5zdGVhZCByZWNlaXZlZCAnICsgKGFjdGlvbkNyZWF0b3JzID09PSBudWxsID8gJ251bGwnIDogdHlwZW9mIGFjdGlvbkNyZWF0b3JzKSArICcuICcgKyAnRGlkIHlvdSB3cml0ZSBcImltcG9ydCBBY3Rpb25DcmVhdG9ycyBmcm9tXCIgaW5zdGVhZCBvZiBcImltcG9ydCAqIGFzIEFjdGlvbkNyZWF0b3JzIGZyb21cIj8nKTtcbiAgfVxuXG4gIHZhciBrZXlzID0gT2JqZWN0LmtleXMoYWN0aW9uQ3JlYXRvcnMpO1xuICB2YXIgYm91bmRBY3Rpb25DcmVhdG9ycyA9IHt9O1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIga2V5ID0ga2V5c1tpXTtcbiAgICB2YXIgYWN0aW9uQ3JlYXRvciA9IGFjdGlvbkNyZWF0b3JzW2tleV07XG4gICAgaWYgKHR5cGVvZiBhY3Rpb25DcmVhdG9yID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBib3VuZEFjdGlvbkNyZWF0b3JzW2tleV0gPSBiaW5kQWN0aW9uQ3JlYXRvcihhY3Rpb25DcmVhdG9yLCBkaXNwYXRjaCk7XG4gICAgfVxuICB9XG4gIHJldHVybiBib3VuZEFjdGlvbkNyZWF0b3JzO1xufSIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IGNvbWJpbmVSZWR1Y2VycztcblxudmFyIF9jcmVhdGVTdG9yZSA9IHJlcXVpcmUoJy4vY3JlYXRlU3RvcmUnKTtcblxudmFyIF9pc1BsYWluT2JqZWN0ID0gcmVxdWlyZSgnbG9kYXNoL2lzUGxhaW5PYmplY3QnKTtcblxudmFyIF9pc1BsYWluT2JqZWN0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2lzUGxhaW5PYmplY3QpO1xuXG52YXIgX3dhcm5pbmcgPSByZXF1aXJlKCcuL3V0aWxzL3dhcm5pbmcnKTtcblxudmFyIF93YXJuaW5nMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3dhcm5pbmcpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIGdldFVuZGVmaW5lZFN0YXRlRXJyb3JNZXNzYWdlKGtleSwgYWN0aW9uKSB7XG4gIHZhciBhY3Rpb25UeXBlID0gYWN0aW9uICYmIGFjdGlvbi50eXBlO1xuICB2YXIgYWN0aW9uTmFtZSA9IGFjdGlvblR5cGUgJiYgJ1wiJyArIGFjdGlvblR5cGUudG9TdHJpbmcoKSArICdcIicgfHwgJ2FuIGFjdGlvbic7XG5cbiAgcmV0dXJuICdHaXZlbiBhY3Rpb24gJyArIGFjdGlvbk5hbWUgKyAnLCByZWR1Y2VyIFwiJyArIGtleSArICdcIiByZXR1cm5lZCB1bmRlZmluZWQuICcgKyAnVG8gaWdub3JlIGFuIGFjdGlvbiwgeW91IG11c3QgZXhwbGljaXRseSByZXR1cm4gdGhlIHByZXZpb3VzIHN0YXRlLic7XG59XG5cbmZ1bmN0aW9uIGdldFVuZXhwZWN0ZWRTdGF0ZVNoYXBlV2FybmluZ01lc3NhZ2UoaW5wdXRTdGF0ZSwgcmVkdWNlcnMsIGFjdGlvbiwgdW5leHBlY3RlZEtleUNhY2hlKSB7XG4gIHZhciByZWR1Y2VyS2V5cyA9IE9iamVjdC5rZXlzKHJlZHVjZXJzKTtcbiAgdmFyIGFyZ3VtZW50TmFtZSA9IGFjdGlvbiAmJiBhY3Rpb24udHlwZSA9PT0gX2NyZWF0ZVN0b3JlLkFjdGlvblR5cGVzLklOSVQgPyAncHJlbG9hZGVkU3RhdGUgYXJndW1lbnQgcGFzc2VkIHRvIGNyZWF0ZVN0b3JlJyA6ICdwcmV2aW91cyBzdGF0ZSByZWNlaXZlZCBieSB0aGUgcmVkdWNlcic7XG5cbiAgaWYgKHJlZHVjZXJLZXlzLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiAnU3RvcmUgZG9lcyBub3QgaGF2ZSBhIHZhbGlkIHJlZHVjZXIuIE1ha2Ugc3VyZSB0aGUgYXJndW1lbnQgcGFzc2VkICcgKyAndG8gY29tYmluZVJlZHVjZXJzIGlzIGFuIG9iamVjdCB3aG9zZSB2YWx1ZXMgYXJlIHJlZHVjZXJzLic7XG4gIH1cblxuICBpZiAoISgwLCBfaXNQbGFpbk9iamVjdDJbJ2RlZmF1bHQnXSkoaW5wdXRTdGF0ZSkpIHtcbiAgICByZXR1cm4gJ1RoZSAnICsgYXJndW1lbnROYW1lICsgJyBoYXMgdW5leHBlY3RlZCB0eXBlIG9mIFwiJyArIHt9LnRvU3RyaW5nLmNhbGwoaW5wdXRTdGF0ZSkubWF0Y2goL1xccyhbYS16fEEtWl0rKS8pWzFdICsgJ1wiLiBFeHBlY3RlZCBhcmd1bWVudCB0byBiZSBhbiBvYmplY3Qgd2l0aCB0aGUgZm9sbG93aW5nICcgKyAoJ2tleXM6IFwiJyArIHJlZHVjZXJLZXlzLmpvaW4oJ1wiLCBcIicpICsgJ1wiJyk7XG4gIH1cblxuICB2YXIgdW5leHBlY3RlZEtleXMgPSBPYmplY3Qua2V5cyhpbnB1dFN0YXRlKS5maWx0ZXIoZnVuY3Rpb24gKGtleSkge1xuICAgIHJldHVybiAhcmVkdWNlcnMuaGFzT3duUHJvcGVydHkoa2V5KSAmJiAhdW5leHBlY3RlZEtleUNhY2hlW2tleV07XG4gIH0pO1xuXG4gIHVuZXhwZWN0ZWRLZXlzLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgIHVuZXhwZWN0ZWRLZXlDYWNoZVtrZXldID0gdHJ1ZTtcbiAgfSk7XG5cbiAgaWYgKHVuZXhwZWN0ZWRLZXlzLmxlbmd0aCA+IDApIHtcbiAgICByZXR1cm4gJ1VuZXhwZWN0ZWQgJyArICh1bmV4cGVjdGVkS2V5cy5sZW5ndGggPiAxID8gJ2tleXMnIDogJ2tleScpICsgJyAnICsgKCdcIicgKyB1bmV4cGVjdGVkS2V5cy5qb2luKCdcIiwgXCInKSArICdcIiBmb3VuZCBpbiAnICsgYXJndW1lbnROYW1lICsgJy4gJykgKyAnRXhwZWN0ZWQgdG8gZmluZCBvbmUgb2YgdGhlIGtub3duIHJlZHVjZXIga2V5cyBpbnN0ZWFkOiAnICsgKCdcIicgKyByZWR1Y2VyS2V5cy5qb2luKCdcIiwgXCInKSArICdcIi4gVW5leHBlY3RlZCBrZXlzIHdpbGwgYmUgaWdub3JlZC4nKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBhc3NlcnRSZWR1Y2VyU2FuaXR5KHJlZHVjZXJzKSB7XG4gIE9iamVjdC5rZXlzKHJlZHVjZXJzKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICB2YXIgcmVkdWNlciA9IHJlZHVjZXJzW2tleV07XG4gICAgdmFyIGluaXRpYWxTdGF0ZSA9IHJlZHVjZXIodW5kZWZpbmVkLCB7IHR5cGU6IF9jcmVhdGVTdG9yZS5BY3Rpb25UeXBlcy5JTklUIH0pO1xuXG4gICAgaWYgKHR5cGVvZiBpbml0aWFsU3RhdGUgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1JlZHVjZXIgXCInICsga2V5ICsgJ1wiIHJldHVybmVkIHVuZGVmaW5lZCBkdXJpbmcgaW5pdGlhbGl6YXRpb24uICcgKyAnSWYgdGhlIHN0YXRlIHBhc3NlZCB0byB0aGUgcmVkdWNlciBpcyB1bmRlZmluZWQsIHlvdSBtdXN0ICcgKyAnZXhwbGljaXRseSByZXR1cm4gdGhlIGluaXRpYWwgc3RhdGUuIFRoZSBpbml0aWFsIHN0YXRlIG1heSAnICsgJ25vdCBiZSB1bmRlZmluZWQuJyk7XG4gICAgfVxuXG4gICAgdmFyIHR5cGUgPSAnQEByZWR1eC9QUk9CRV9VTktOT1dOX0FDVElPTl8nICsgTWF0aC5yYW5kb20oKS50b1N0cmluZygzNikuc3Vic3RyaW5nKDcpLnNwbGl0KCcnKS5qb2luKCcuJyk7XG4gICAgaWYgKHR5cGVvZiByZWR1Y2VyKHVuZGVmaW5lZCwgeyB0eXBlOiB0eXBlIH0pID09PSAndW5kZWZpbmVkJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdSZWR1Y2VyIFwiJyArIGtleSArICdcIiByZXR1cm5lZCB1bmRlZmluZWQgd2hlbiBwcm9iZWQgd2l0aCBhIHJhbmRvbSB0eXBlLiAnICsgKCdEb25cXCd0IHRyeSB0byBoYW5kbGUgJyArIF9jcmVhdGVTdG9yZS5BY3Rpb25UeXBlcy5JTklUICsgJyBvciBvdGhlciBhY3Rpb25zIGluIFwicmVkdXgvKlwiICcpICsgJ25hbWVzcGFjZS4gVGhleSBhcmUgY29uc2lkZXJlZCBwcml2YXRlLiBJbnN0ZWFkLCB5b3UgbXVzdCByZXR1cm4gdGhlICcgKyAnY3VycmVudCBzdGF0ZSBmb3IgYW55IHVua25vd24gYWN0aW9ucywgdW5sZXNzIGl0IGlzIHVuZGVmaW5lZCwgJyArICdpbiB3aGljaCBjYXNlIHlvdSBtdXN0IHJldHVybiB0aGUgaW5pdGlhbCBzdGF0ZSwgcmVnYXJkbGVzcyBvZiB0aGUgJyArICdhY3Rpb24gdHlwZS4gVGhlIGluaXRpYWwgc3RhdGUgbWF5IG5vdCBiZSB1bmRlZmluZWQuJyk7XG4gICAgfVxuICB9KTtcbn1cblxuLyoqXG4gKiBUdXJucyBhbiBvYmplY3Qgd2hvc2UgdmFsdWVzIGFyZSBkaWZmZXJlbnQgcmVkdWNlciBmdW5jdGlvbnMsIGludG8gYSBzaW5nbGVcbiAqIHJlZHVjZXIgZnVuY3Rpb24uIEl0IHdpbGwgY2FsbCBldmVyeSBjaGlsZCByZWR1Y2VyLCBhbmQgZ2F0aGVyIHRoZWlyIHJlc3VsdHNcbiAqIGludG8gYSBzaW5nbGUgc3RhdGUgb2JqZWN0LCB3aG9zZSBrZXlzIGNvcnJlc3BvbmQgdG8gdGhlIGtleXMgb2YgdGhlIHBhc3NlZFxuICogcmVkdWNlciBmdW5jdGlvbnMuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHJlZHVjZXJzIEFuIG9iamVjdCB3aG9zZSB2YWx1ZXMgY29ycmVzcG9uZCB0byBkaWZmZXJlbnRcbiAqIHJlZHVjZXIgZnVuY3Rpb25zIHRoYXQgbmVlZCB0byBiZSBjb21iaW5lZCBpbnRvIG9uZS4gT25lIGhhbmR5IHdheSB0byBvYnRhaW5cbiAqIGl0IGlzIHRvIHVzZSBFUzYgYGltcG9ydCAqIGFzIHJlZHVjZXJzYCBzeW50YXguIFRoZSByZWR1Y2VycyBtYXkgbmV2ZXIgcmV0dXJuXG4gKiB1bmRlZmluZWQgZm9yIGFueSBhY3Rpb24uIEluc3RlYWQsIHRoZXkgc2hvdWxkIHJldHVybiB0aGVpciBpbml0aWFsIHN0YXRlXG4gKiBpZiB0aGUgc3RhdGUgcGFzc2VkIHRvIHRoZW0gd2FzIHVuZGVmaW5lZCwgYW5kIHRoZSBjdXJyZW50IHN0YXRlIGZvciBhbnlcbiAqIHVucmVjb2duaXplZCBhY3Rpb24uXG4gKlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBBIHJlZHVjZXIgZnVuY3Rpb24gdGhhdCBpbnZva2VzIGV2ZXJ5IHJlZHVjZXIgaW5zaWRlIHRoZVxuICogcGFzc2VkIG9iamVjdCwgYW5kIGJ1aWxkcyBhIHN0YXRlIG9iamVjdCB3aXRoIHRoZSBzYW1lIHNoYXBlLlxuICovXG5mdW5jdGlvbiBjb21iaW5lUmVkdWNlcnMocmVkdWNlcnMpIHtcbiAgdmFyIHJlZHVjZXJLZXlzID0gT2JqZWN0LmtleXMocmVkdWNlcnMpO1xuICB2YXIgZmluYWxSZWR1Y2VycyA9IHt9O1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHJlZHVjZXJLZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGtleSA9IHJlZHVjZXJLZXlzW2ldO1xuXG4gICAgaWYgKFwiZGV2ZWxvcG1lbnRcIiAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICBpZiAodHlwZW9mIHJlZHVjZXJzW2tleV0gPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICgwLCBfd2FybmluZzJbJ2RlZmF1bHQnXSkoJ05vIHJlZHVjZXIgcHJvdmlkZWQgZm9yIGtleSBcIicgKyBrZXkgKyAnXCInKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIHJlZHVjZXJzW2tleV0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGZpbmFsUmVkdWNlcnNba2V5XSA9IHJlZHVjZXJzW2tleV07XG4gICAgfVxuICB9XG4gIHZhciBmaW5hbFJlZHVjZXJLZXlzID0gT2JqZWN0LmtleXMoZmluYWxSZWR1Y2Vycyk7XG5cbiAgaWYgKFwiZGV2ZWxvcG1lbnRcIiAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgdmFyIHVuZXhwZWN0ZWRLZXlDYWNoZSA9IHt9O1xuICB9XG5cbiAgdmFyIHNhbml0eUVycm9yO1xuICB0cnkge1xuICAgIGFzc2VydFJlZHVjZXJTYW5pdHkoZmluYWxSZWR1Y2Vycyk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBzYW5pdHlFcnJvciA9IGU7XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24gY29tYmluYXRpb24oKSB7XG4gICAgdmFyIHN0YXRlID0gYXJndW1lbnRzLmxlbmd0aCA8PSAwIHx8IGFyZ3VtZW50c1swXSA9PT0gdW5kZWZpbmVkID8ge30gOiBhcmd1bWVudHNbMF07XG4gICAgdmFyIGFjdGlvbiA9IGFyZ3VtZW50c1sxXTtcblxuICAgIGlmIChzYW5pdHlFcnJvcikge1xuICAgICAgdGhyb3cgc2FuaXR5RXJyb3I7XG4gICAgfVxuXG4gICAgaWYgKFwiZGV2ZWxvcG1lbnRcIiAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICB2YXIgd2FybmluZ01lc3NhZ2UgPSBnZXRVbmV4cGVjdGVkU3RhdGVTaGFwZVdhcm5pbmdNZXNzYWdlKHN0YXRlLCBmaW5hbFJlZHVjZXJzLCBhY3Rpb24sIHVuZXhwZWN0ZWRLZXlDYWNoZSk7XG4gICAgICBpZiAod2FybmluZ01lc3NhZ2UpIHtcbiAgICAgICAgKDAsIF93YXJuaW5nMlsnZGVmYXVsdCddKSh3YXJuaW5nTWVzc2FnZSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmFyIGhhc0NoYW5nZWQgPSBmYWxzZTtcbiAgICB2YXIgbmV4dFN0YXRlID0ge307XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBmaW5hbFJlZHVjZXJLZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIga2V5ID0gZmluYWxSZWR1Y2VyS2V5c1tpXTtcbiAgICAgIHZhciByZWR1Y2VyID0gZmluYWxSZWR1Y2Vyc1trZXldO1xuICAgICAgdmFyIHByZXZpb3VzU3RhdGVGb3JLZXkgPSBzdGF0ZVtrZXldO1xuICAgICAgdmFyIG5leHRTdGF0ZUZvcktleSA9IHJlZHVjZXIocHJldmlvdXNTdGF0ZUZvcktleSwgYWN0aW9uKTtcbiAgICAgIGlmICh0eXBlb2YgbmV4dFN0YXRlRm9yS2V5ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICB2YXIgZXJyb3JNZXNzYWdlID0gZ2V0VW5kZWZpbmVkU3RhdGVFcnJvck1lc3NhZ2Uoa2V5LCBhY3Rpb24pO1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyb3JNZXNzYWdlKTtcbiAgICAgIH1cbiAgICAgIG5leHRTdGF0ZVtrZXldID0gbmV4dFN0YXRlRm9yS2V5O1xuICAgICAgaGFzQ2hhbmdlZCA9IGhhc0NoYW5nZWQgfHwgbmV4dFN0YXRlRm9yS2V5ICE9PSBwcmV2aW91c1N0YXRlRm9yS2V5O1xuICAgIH1cbiAgICByZXR1cm4gaGFzQ2hhbmdlZCA/IG5leHRTdGF0ZSA6IHN0YXRlO1xuICB9O1xufSIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuZXhwb3J0c1tcImRlZmF1bHRcIl0gPSBjb21wb3NlO1xuLyoqXG4gKiBDb21wb3NlcyBzaW5nbGUtYXJndW1lbnQgZnVuY3Rpb25zIGZyb20gcmlnaHQgdG8gbGVmdC4gVGhlIHJpZ2h0bW9zdFxuICogZnVuY3Rpb24gY2FuIHRha2UgbXVsdGlwbGUgYXJndW1lbnRzIGFzIGl0IHByb3ZpZGVzIHRoZSBzaWduYXR1cmUgZm9yXG4gKiB0aGUgcmVzdWx0aW5nIGNvbXBvc2l0ZSBmdW5jdGlvbi5cbiAqXG4gKiBAcGFyYW0gey4uLkZ1bmN0aW9ufSBmdW5jcyBUaGUgZnVuY3Rpb25zIHRvIGNvbXBvc2UuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IEEgZnVuY3Rpb24gb2J0YWluZWQgYnkgY29tcG9zaW5nIHRoZSBhcmd1bWVudCBmdW5jdGlvbnNcbiAqIGZyb20gcmlnaHQgdG8gbGVmdC4gRm9yIGV4YW1wbGUsIGNvbXBvc2UoZiwgZywgaCkgaXMgaWRlbnRpY2FsIHRvIGRvaW5nXG4gKiAoLi4uYXJncykgPT4gZihnKGgoLi4uYXJncykpKS5cbiAqL1xuXG5mdW5jdGlvbiBjb21wb3NlKCkge1xuICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgZnVuY3MgPSBBcnJheShfbGVuKSwgX2tleSA9IDA7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICBmdW5jc1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgfVxuXG4gIGlmIChmdW5jcy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKGFyZykge1xuICAgICAgcmV0dXJuIGFyZztcbiAgICB9O1xuICB9XG5cbiAgaWYgKGZ1bmNzLmxlbmd0aCA9PT0gMSkge1xuICAgIHJldHVybiBmdW5jc1swXTtcbiAgfVxuXG4gIHZhciBsYXN0ID0gZnVuY3NbZnVuY3MubGVuZ3RoIC0gMV07XG4gIHZhciByZXN0ID0gZnVuY3Muc2xpY2UoMCwgLTEpO1xuICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiByZXN0LnJlZHVjZVJpZ2h0KGZ1bmN0aW9uIChjb21wb3NlZCwgZikge1xuICAgICAgcmV0dXJuIGYoY29tcG9zZWQpO1xuICAgIH0sIGxhc3QuYXBwbHkodW5kZWZpbmVkLCBhcmd1bWVudHMpKTtcbiAgfTtcbn0iLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5leHBvcnRzLkFjdGlvblR5cGVzID0gdW5kZWZpbmVkO1xuZXhwb3J0c1snZGVmYXVsdCddID0gY3JlYXRlU3RvcmU7XG5cbnZhciBfaXNQbGFpbk9iamVjdCA9IHJlcXVpcmUoJ2xvZGFzaC9pc1BsYWluT2JqZWN0Jyk7XG5cbnZhciBfaXNQbGFpbk9iamVjdDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pc1BsYWluT2JqZWN0KTtcblxudmFyIF9zeW1ib2xPYnNlcnZhYmxlID0gcmVxdWlyZSgnc3ltYm9sLW9ic2VydmFibGUnKTtcblxudmFyIF9zeW1ib2xPYnNlcnZhYmxlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3N5bWJvbE9ic2VydmFibGUpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9OyB9XG5cbi8qKlxuICogVGhlc2UgYXJlIHByaXZhdGUgYWN0aW9uIHR5cGVzIHJlc2VydmVkIGJ5IFJlZHV4LlxuICogRm9yIGFueSB1bmtub3duIGFjdGlvbnMsIHlvdSBtdXN0IHJldHVybiB0aGUgY3VycmVudCBzdGF0ZS5cbiAqIElmIHRoZSBjdXJyZW50IHN0YXRlIGlzIHVuZGVmaW5lZCwgeW91IG11c3QgcmV0dXJuIHRoZSBpbml0aWFsIHN0YXRlLlxuICogRG8gbm90IHJlZmVyZW5jZSB0aGVzZSBhY3Rpb24gdHlwZXMgZGlyZWN0bHkgaW4geW91ciBjb2RlLlxuICovXG52YXIgQWN0aW9uVHlwZXMgPSBleHBvcnRzLkFjdGlvblR5cGVzID0ge1xuICBJTklUOiAnQEByZWR1eC9JTklUJ1xufTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgUmVkdXggc3RvcmUgdGhhdCBob2xkcyB0aGUgc3RhdGUgdHJlZS5cbiAqIFRoZSBvbmx5IHdheSB0byBjaGFuZ2UgdGhlIGRhdGEgaW4gdGhlIHN0b3JlIGlzIHRvIGNhbGwgYGRpc3BhdGNoKClgIG9uIGl0LlxuICpcbiAqIFRoZXJlIHNob3VsZCBvbmx5IGJlIGEgc2luZ2xlIHN0b3JlIGluIHlvdXIgYXBwLiBUbyBzcGVjaWZ5IGhvdyBkaWZmZXJlbnRcbiAqIHBhcnRzIG9mIHRoZSBzdGF0ZSB0cmVlIHJlc3BvbmQgdG8gYWN0aW9ucywgeW91IG1heSBjb21iaW5lIHNldmVyYWwgcmVkdWNlcnNcbiAqIGludG8gYSBzaW5nbGUgcmVkdWNlciBmdW5jdGlvbiBieSB1c2luZyBgY29tYmluZVJlZHVjZXJzYC5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSByZWR1Y2VyIEEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZSBuZXh0IHN0YXRlIHRyZWUsIGdpdmVuXG4gKiB0aGUgY3VycmVudCBzdGF0ZSB0cmVlIGFuZCB0aGUgYWN0aW9uIHRvIGhhbmRsZS5cbiAqXG4gKiBAcGFyYW0ge2FueX0gW3ByZWxvYWRlZFN0YXRlXSBUaGUgaW5pdGlhbCBzdGF0ZS4gWW91IG1heSBvcHRpb25hbGx5IHNwZWNpZnkgaXRcbiAqIHRvIGh5ZHJhdGUgdGhlIHN0YXRlIGZyb20gdGhlIHNlcnZlciBpbiB1bml2ZXJzYWwgYXBwcywgb3IgdG8gcmVzdG9yZSBhXG4gKiBwcmV2aW91c2x5IHNlcmlhbGl6ZWQgdXNlciBzZXNzaW9uLlxuICogSWYgeW91IHVzZSBgY29tYmluZVJlZHVjZXJzYCB0byBwcm9kdWNlIHRoZSByb290IHJlZHVjZXIgZnVuY3Rpb24sIHRoaXMgbXVzdCBiZVxuICogYW4gb2JqZWN0IHdpdGggdGhlIHNhbWUgc2hhcGUgYXMgYGNvbWJpbmVSZWR1Y2Vyc2Aga2V5cy5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBlbmhhbmNlciBUaGUgc3RvcmUgZW5oYW5jZXIuIFlvdSBtYXkgb3B0aW9uYWxseSBzcGVjaWZ5IGl0XG4gKiB0byBlbmhhbmNlIHRoZSBzdG9yZSB3aXRoIHRoaXJkLXBhcnR5IGNhcGFiaWxpdGllcyBzdWNoIGFzIG1pZGRsZXdhcmUsXG4gKiB0aW1lIHRyYXZlbCwgcGVyc2lzdGVuY2UsIGV0Yy4gVGhlIG9ubHkgc3RvcmUgZW5oYW5jZXIgdGhhdCBzaGlwcyB3aXRoIFJlZHV4XG4gKiBpcyBgYXBwbHlNaWRkbGV3YXJlKClgLlxuICpcbiAqIEByZXR1cm5zIHtTdG9yZX0gQSBSZWR1eCBzdG9yZSB0aGF0IGxldHMgeW91IHJlYWQgdGhlIHN0YXRlLCBkaXNwYXRjaCBhY3Rpb25zXG4gKiBhbmQgc3Vic2NyaWJlIHRvIGNoYW5nZXMuXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZVN0b3JlKHJlZHVjZXIsIHByZWxvYWRlZFN0YXRlLCBlbmhhbmNlcikge1xuICB2YXIgX3JlZjI7XG5cbiAgaWYgKHR5cGVvZiBwcmVsb2FkZWRTdGF0ZSA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2YgZW5oYW5jZXIgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgZW5oYW5jZXIgPSBwcmVsb2FkZWRTdGF0ZTtcbiAgICBwcmVsb2FkZWRTdGF0ZSA9IHVuZGVmaW5lZDtcbiAgfVxuXG4gIGlmICh0eXBlb2YgZW5oYW5jZXIgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgaWYgKHR5cGVvZiBlbmhhbmNlciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdFeHBlY3RlZCB0aGUgZW5oYW5jZXIgdG8gYmUgYSBmdW5jdGlvbi4nKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZW5oYW5jZXIoY3JlYXRlU3RvcmUpKHJlZHVjZXIsIHByZWxvYWRlZFN0YXRlKTtcbiAgfVxuXG4gIGlmICh0eXBlb2YgcmVkdWNlciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBFcnJvcignRXhwZWN0ZWQgdGhlIHJlZHVjZXIgdG8gYmUgYSBmdW5jdGlvbi4nKTtcbiAgfVxuXG4gIHZhciBjdXJyZW50UmVkdWNlciA9IHJlZHVjZXI7XG4gIHZhciBjdXJyZW50U3RhdGUgPSBwcmVsb2FkZWRTdGF0ZTtcbiAgdmFyIGN1cnJlbnRMaXN0ZW5lcnMgPSBbXTtcbiAgdmFyIG5leHRMaXN0ZW5lcnMgPSBjdXJyZW50TGlzdGVuZXJzO1xuICB2YXIgaXNEaXNwYXRjaGluZyA9IGZhbHNlO1xuXG4gIGZ1bmN0aW9uIGVuc3VyZUNhbk11dGF0ZU5leHRMaXN0ZW5lcnMoKSB7XG4gICAgaWYgKG5leHRMaXN0ZW5lcnMgPT09IGN1cnJlbnRMaXN0ZW5lcnMpIHtcbiAgICAgIG5leHRMaXN0ZW5lcnMgPSBjdXJyZW50TGlzdGVuZXJzLnNsaWNlKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFJlYWRzIHRoZSBzdGF0ZSB0cmVlIG1hbmFnZWQgYnkgdGhlIHN0b3JlLlxuICAgKlxuICAgKiBAcmV0dXJucyB7YW55fSBUaGUgY3VycmVudCBzdGF0ZSB0cmVlIG9mIHlvdXIgYXBwbGljYXRpb24uXG4gICAqL1xuICBmdW5jdGlvbiBnZXRTdGF0ZSgpIHtcbiAgICByZXR1cm4gY3VycmVudFN0YXRlO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgYSBjaGFuZ2UgbGlzdGVuZXIuIEl0IHdpbGwgYmUgY2FsbGVkIGFueSB0aW1lIGFuIGFjdGlvbiBpcyBkaXNwYXRjaGVkLFxuICAgKiBhbmQgc29tZSBwYXJ0IG9mIHRoZSBzdGF0ZSB0cmVlIG1heSBwb3RlbnRpYWxseSBoYXZlIGNoYW5nZWQuIFlvdSBtYXkgdGhlblxuICAgKiBjYWxsIGBnZXRTdGF0ZSgpYCB0byByZWFkIHRoZSBjdXJyZW50IHN0YXRlIHRyZWUgaW5zaWRlIHRoZSBjYWxsYmFjay5cbiAgICpcbiAgICogWW91IG1heSBjYWxsIGBkaXNwYXRjaCgpYCBmcm9tIGEgY2hhbmdlIGxpc3RlbmVyLCB3aXRoIHRoZSBmb2xsb3dpbmdcbiAgICogY2F2ZWF0czpcbiAgICpcbiAgICogMS4gVGhlIHN1YnNjcmlwdGlvbnMgYXJlIHNuYXBzaG90dGVkIGp1c3QgYmVmb3JlIGV2ZXJ5IGBkaXNwYXRjaCgpYCBjYWxsLlxuICAgKiBJZiB5b3Ugc3Vic2NyaWJlIG9yIHVuc3Vic2NyaWJlIHdoaWxlIHRoZSBsaXN0ZW5lcnMgYXJlIGJlaW5nIGludm9rZWQsIHRoaXNcbiAgICogd2lsbCBub3QgaGF2ZSBhbnkgZWZmZWN0IG9uIHRoZSBgZGlzcGF0Y2goKWAgdGhhdCBpcyBjdXJyZW50bHkgaW4gcHJvZ3Jlc3MuXG4gICAqIEhvd2V2ZXIsIHRoZSBuZXh0IGBkaXNwYXRjaCgpYCBjYWxsLCB3aGV0aGVyIG5lc3RlZCBvciBub3QsIHdpbGwgdXNlIGEgbW9yZVxuICAgKiByZWNlbnQgc25hcHNob3Qgb2YgdGhlIHN1YnNjcmlwdGlvbiBsaXN0LlxuICAgKlxuICAgKiAyLiBUaGUgbGlzdGVuZXIgc2hvdWxkIG5vdCBleHBlY3QgdG8gc2VlIGFsbCBzdGF0ZSBjaGFuZ2VzLCBhcyB0aGUgc3RhdGVcbiAgICogbWlnaHQgaGF2ZSBiZWVuIHVwZGF0ZWQgbXVsdGlwbGUgdGltZXMgZHVyaW5nIGEgbmVzdGVkIGBkaXNwYXRjaCgpYCBiZWZvcmVcbiAgICogdGhlIGxpc3RlbmVyIGlzIGNhbGxlZC4gSXQgaXMsIGhvd2V2ZXIsIGd1YXJhbnRlZWQgdGhhdCBhbGwgc3Vic2NyaWJlcnNcbiAgICogcmVnaXN0ZXJlZCBiZWZvcmUgdGhlIGBkaXNwYXRjaCgpYCBzdGFydGVkIHdpbGwgYmUgY2FsbGVkIHdpdGggdGhlIGxhdGVzdFxuICAgKiBzdGF0ZSBieSB0aGUgdGltZSBpdCBleGl0cy5cbiAgICpcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gbGlzdGVuZXIgQSBjYWxsYmFjayB0byBiZSBpbnZva2VkIG9uIGV2ZXJ5IGRpc3BhdGNoLlxuICAgKiBAcmV0dXJucyB7RnVuY3Rpb259IEEgZnVuY3Rpb24gdG8gcmVtb3ZlIHRoaXMgY2hhbmdlIGxpc3RlbmVyLlxuICAgKi9cbiAgZnVuY3Rpb24gc3Vic2NyaWJlKGxpc3RlbmVyKSB7XG4gICAgaWYgKHR5cGVvZiBsaXN0ZW5lciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdFeHBlY3RlZCBsaXN0ZW5lciB0byBiZSBhIGZ1bmN0aW9uLicpO1xuICAgIH1cblxuICAgIHZhciBpc1N1YnNjcmliZWQgPSB0cnVlO1xuXG4gICAgZW5zdXJlQ2FuTXV0YXRlTmV4dExpc3RlbmVycygpO1xuICAgIG5leHRMaXN0ZW5lcnMucHVzaChsaXN0ZW5lcik7XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gdW5zdWJzY3JpYmUoKSB7XG4gICAgICBpZiAoIWlzU3Vic2NyaWJlZCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlzU3Vic2NyaWJlZCA9IGZhbHNlO1xuXG4gICAgICBlbnN1cmVDYW5NdXRhdGVOZXh0TGlzdGVuZXJzKCk7XG4gICAgICB2YXIgaW5kZXggPSBuZXh0TGlzdGVuZXJzLmluZGV4T2YobGlzdGVuZXIpO1xuICAgICAgbmV4dExpc3RlbmVycy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogRGlzcGF0Y2hlcyBhbiBhY3Rpb24uIEl0IGlzIHRoZSBvbmx5IHdheSB0byB0cmlnZ2VyIGEgc3RhdGUgY2hhbmdlLlxuICAgKlxuICAgKiBUaGUgYHJlZHVjZXJgIGZ1bmN0aW9uLCB1c2VkIHRvIGNyZWF0ZSB0aGUgc3RvcmUsIHdpbGwgYmUgY2FsbGVkIHdpdGggdGhlXG4gICAqIGN1cnJlbnQgc3RhdGUgdHJlZSBhbmQgdGhlIGdpdmVuIGBhY3Rpb25gLiBJdHMgcmV0dXJuIHZhbHVlIHdpbGxcbiAgICogYmUgY29uc2lkZXJlZCB0aGUgKipuZXh0Kiogc3RhdGUgb2YgdGhlIHRyZWUsIGFuZCB0aGUgY2hhbmdlIGxpc3RlbmVyc1xuICAgKiB3aWxsIGJlIG5vdGlmaWVkLlxuICAgKlxuICAgKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvbmx5IHN1cHBvcnRzIHBsYWluIG9iamVjdCBhY3Rpb25zLiBJZiB5b3Ugd2FudCB0b1xuICAgKiBkaXNwYXRjaCBhIFByb21pc2UsIGFuIE9ic2VydmFibGUsIGEgdGh1bmssIG9yIHNvbWV0aGluZyBlbHNlLCB5b3UgbmVlZCB0b1xuICAgKiB3cmFwIHlvdXIgc3RvcmUgY3JlYXRpbmcgZnVuY3Rpb24gaW50byB0aGUgY29ycmVzcG9uZGluZyBtaWRkbGV3YXJlLiBGb3JcbiAgICogZXhhbXBsZSwgc2VlIHRoZSBkb2N1bWVudGF0aW9uIGZvciB0aGUgYHJlZHV4LXRodW5rYCBwYWNrYWdlLiBFdmVuIHRoZVxuICAgKiBtaWRkbGV3YXJlIHdpbGwgZXZlbnR1YWxseSBkaXNwYXRjaCBwbGFpbiBvYmplY3QgYWN0aW9ucyB1c2luZyB0aGlzIG1ldGhvZC5cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IGFjdGlvbiBBIHBsYWluIG9iamVjdCByZXByZXNlbnRpbmcg4oCcd2hhdCBjaGFuZ2Vk4oCdLiBJdCBpc1xuICAgKiBhIGdvb2QgaWRlYSB0byBrZWVwIGFjdGlvbnMgc2VyaWFsaXphYmxlIHNvIHlvdSBjYW4gcmVjb3JkIGFuZCByZXBsYXkgdXNlclxuICAgKiBzZXNzaW9ucywgb3IgdXNlIHRoZSB0aW1lIHRyYXZlbGxpbmcgYHJlZHV4LWRldnRvb2xzYC4gQW4gYWN0aW9uIG11c3QgaGF2ZVxuICAgKiBhIGB0eXBlYCBwcm9wZXJ0eSB3aGljaCBtYXkgbm90IGJlIGB1bmRlZmluZWRgLiBJdCBpcyBhIGdvb2QgaWRlYSB0byB1c2VcbiAgICogc3RyaW5nIGNvbnN0YW50cyBmb3IgYWN0aW9uIHR5cGVzLlxuICAgKlxuICAgKiBAcmV0dXJucyB7T2JqZWN0fSBGb3IgY29udmVuaWVuY2UsIHRoZSBzYW1lIGFjdGlvbiBvYmplY3QgeW91IGRpc3BhdGNoZWQuXG4gICAqXG4gICAqIE5vdGUgdGhhdCwgaWYgeW91IHVzZSBhIGN1c3RvbSBtaWRkbGV3YXJlLCBpdCBtYXkgd3JhcCBgZGlzcGF0Y2goKWAgdG9cbiAgICogcmV0dXJuIHNvbWV0aGluZyBlbHNlIChmb3IgZXhhbXBsZSwgYSBQcm9taXNlIHlvdSBjYW4gYXdhaXQpLlxuICAgKi9cbiAgZnVuY3Rpb24gZGlzcGF0Y2goYWN0aW9uKSB7XG4gICAgaWYgKCEoMCwgX2lzUGxhaW5PYmplY3QyWydkZWZhdWx0J10pKGFjdGlvbikpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQWN0aW9ucyBtdXN0IGJlIHBsYWluIG9iamVjdHMuICcgKyAnVXNlIGN1c3RvbSBtaWRkbGV3YXJlIGZvciBhc3luYyBhY3Rpb25zLicpO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgYWN0aW9uLnR5cGUgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0FjdGlvbnMgbWF5IG5vdCBoYXZlIGFuIHVuZGVmaW5lZCBcInR5cGVcIiBwcm9wZXJ0eS4gJyArICdIYXZlIHlvdSBtaXNzcGVsbGVkIGEgY29uc3RhbnQ/Jyk7XG4gICAgfVxuXG4gICAgaWYgKGlzRGlzcGF0Y2hpbmcpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignUmVkdWNlcnMgbWF5IG5vdCBkaXNwYXRjaCBhY3Rpb25zLicpO1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICBpc0Rpc3BhdGNoaW5nID0gdHJ1ZTtcbiAgICAgIGN1cnJlbnRTdGF0ZSA9IGN1cnJlbnRSZWR1Y2VyKGN1cnJlbnRTdGF0ZSwgYWN0aW9uKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgaXNEaXNwYXRjaGluZyA9IGZhbHNlO1xuICAgIH1cblxuICAgIHZhciBsaXN0ZW5lcnMgPSBjdXJyZW50TGlzdGVuZXJzID0gbmV4dExpc3RlbmVycztcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3RlbmVycy5sZW5ndGg7IGkrKykge1xuICAgICAgbGlzdGVuZXJzW2ldKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGFjdGlvbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZXBsYWNlcyB0aGUgcmVkdWNlciBjdXJyZW50bHkgdXNlZCBieSB0aGUgc3RvcmUgdG8gY2FsY3VsYXRlIHRoZSBzdGF0ZS5cbiAgICpcbiAgICogWW91IG1pZ2h0IG5lZWQgdGhpcyBpZiB5b3VyIGFwcCBpbXBsZW1lbnRzIGNvZGUgc3BsaXR0aW5nIGFuZCB5b3Ugd2FudCB0b1xuICAgKiBsb2FkIHNvbWUgb2YgdGhlIHJlZHVjZXJzIGR5bmFtaWNhbGx5LiBZb3UgbWlnaHQgYWxzbyBuZWVkIHRoaXMgaWYgeW91XG4gICAqIGltcGxlbWVudCBhIGhvdCByZWxvYWRpbmcgbWVjaGFuaXNtIGZvciBSZWR1eC5cbiAgICpcbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gbmV4dFJlZHVjZXIgVGhlIHJlZHVjZXIgZm9yIHRoZSBzdG9yZSB0byB1c2UgaW5zdGVhZC5cbiAgICogQHJldHVybnMge3ZvaWR9XG4gICAqL1xuICBmdW5jdGlvbiByZXBsYWNlUmVkdWNlcihuZXh0UmVkdWNlcikge1xuICAgIGlmICh0eXBlb2YgbmV4dFJlZHVjZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignRXhwZWN0ZWQgdGhlIG5leHRSZWR1Y2VyIHRvIGJlIGEgZnVuY3Rpb24uJyk7XG4gICAgfVxuXG4gICAgY3VycmVudFJlZHVjZXIgPSBuZXh0UmVkdWNlcjtcbiAgICBkaXNwYXRjaCh7IHR5cGU6IEFjdGlvblR5cGVzLklOSVQgfSk7XG4gIH1cblxuICAvKipcbiAgICogSW50ZXJvcGVyYWJpbGl0eSBwb2ludCBmb3Igb2JzZXJ2YWJsZS9yZWFjdGl2ZSBsaWJyYXJpZXMuXG4gICAqIEByZXR1cm5zIHtvYnNlcnZhYmxlfSBBIG1pbmltYWwgb2JzZXJ2YWJsZSBvZiBzdGF0ZSBjaGFuZ2VzLlxuICAgKiBGb3IgbW9yZSBpbmZvcm1hdGlvbiwgc2VlIHRoZSBvYnNlcnZhYmxlIHByb3Bvc2FsOlxuICAgKiBodHRwczovL2dpdGh1Yi5jb20vemVucGFyc2luZy9lcy1vYnNlcnZhYmxlXG4gICAqL1xuICBmdW5jdGlvbiBvYnNlcnZhYmxlKCkge1xuICAgIHZhciBfcmVmO1xuXG4gICAgdmFyIG91dGVyU3Vic2NyaWJlID0gc3Vic2NyaWJlO1xuICAgIHJldHVybiBfcmVmID0ge1xuICAgICAgLyoqXG4gICAgICAgKiBUaGUgbWluaW1hbCBvYnNlcnZhYmxlIHN1YnNjcmlwdGlvbiBtZXRob2QuXG4gICAgICAgKiBAcGFyYW0ge09iamVjdH0gb2JzZXJ2ZXIgQW55IG9iamVjdCB0aGF0IGNhbiBiZSB1c2VkIGFzIGFuIG9ic2VydmVyLlxuICAgICAgICogVGhlIG9ic2VydmVyIG9iamVjdCBzaG91bGQgaGF2ZSBhIGBuZXh0YCBtZXRob2QuXG4gICAgICAgKiBAcmV0dXJucyB7c3Vic2NyaXB0aW9ufSBBbiBvYmplY3Qgd2l0aCBhbiBgdW5zdWJzY3JpYmVgIG1ldGhvZCB0aGF0IGNhblxuICAgICAgICogYmUgdXNlZCB0byB1bnN1YnNjcmliZSB0aGUgb2JzZXJ2YWJsZSBmcm9tIHRoZSBzdG9yZSwgYW5kIHByZXZlbnQgZnVydGhlclxuICAgICAgICogZW1pc3Npb24gb2YgdmFsdWVzIGZyb20gdGhlIG9ic2VydmFibGUuXG4gICAgICAgKi9cbiAgICAgIHN1YnNjcmliZTogZnVuY3Rpb24gc3Vic2NyaWJlKG9ic2VydmVyKSB7XG4gICAgICAgIGlmICh0eXBlb2Ygb2JzZXJ2ZXIgIT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignRXhwZWN0ZWQgdGhlIG9ic2VydmVyIHRvIGJlIGFuIG9iamVjdC4nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIG9ic2VydmVTdGF0ZSgpIHtcbiAgICAgICAgICBpZiAob2JzZXJ2ZXIubmV4dCkge1xuICAgICAgICAgICAgb2JzZXJ2ZXIubmV4dChnZXRTdGF0ZSgpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBvYnNlcnZlU3RhdGUoKTtcbiAgICAgICAgdmFyIHVuc3Vic2NyaWJlID0gb3V0ZXJTdWJzY3JpYmUob2JzZXJ2ZVN0YXRlKTtcbiAgICAgICAgcmV0dXJuIHsgdW5zdWJzY3JpYmU6IHVuc3Vic2NyaWJlIH07XG4gICAgICB9XG4gICAgfSwgX3JlZltfc3ltYm9sT2JzZXJ2YWJsZTJbJ2RlZmF1bHQnXV0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9LCBfcmVmO1xuICB9XG5cbiAgLy8gV2hlbiBhIHN0b3JlIGlzIGNyZWF0ZWQsIGFuIFwiSU5JVFwiIGFjdGlvbiBpcyBkaXNwYXRjaGVkIHNvIHRoYXQgZXZlcnlcbiAgLy8gcmVkdWNlciByZXR1cm5zIHRoZWlyIGluaXRpYWwgc3RhdGUuIFRoaXMgZWZmZWN0aXZlbHkgcG9wdWxhdGVzXG4gIC8vIHRoZSBpbml0aWFsIHN0YXRlIHRyZWUuXG4gIGRpc3BhdGNoKHsgdHlwZTogQWN0aW9uVHlwZXMuSU5JVCB9KTtcblxuICByZXR1cm4gX3JlZjIgPSB7XG4gICAgZGlzcGF0Y2g6IGRpc3BhdGNoLFxuICAgIHN1YnNjcmliZTogc3Vic2NyaWJlLFxuICAgIGdldFN0YXRlOiBnZXRTdGF0ZSxcbiAgICByZXBsYWNlUmVkdWNlcjogcmVwbGFjZVJlZHVjZXJcbiAgfSwgX3JlZjJbX3N5bWJvbE9ic2VydmFibGUyWydkZWZhdWx0J11dID0gb2JzZXJ2YWJsZSwgX3JlZjI7XG59IiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuZXhwb3J0cy5jb21wb3NlID0gZXhwb3J0cy5hcHBseU1pZGRsZXdhcmUgPSBleHBvcnRzLmJpbmRBY3Rpb25DcmVhdG9ycyA9IGV4cG9ydHMuY29tYmluZVJlZHVjZXJzID0gZXhwb3J0cy5jcmVhdGVTdG9yZSA9IHVuZGVmaW5lZDtcblxudmFyIF9jcmVhdGVTdG9yZSA9IHJlcXVpcmUoJy4vY3JlYXRlU3RvcmUnKTtcblxudmFyIF9jcmVhdGVTdG9yZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jcmVhdGVTdG9yZSk7XG5cbnZhciBfY29tYmluZVJlZHVjZXJzID0gcmVxdWlyZSgnLi9jb21iaW5lUmVkdWNlcnMnKTtcblxudmFyIF9jb21iaW5lUmVkdWNlcnMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY29tYmluZVJlZHVjZXJzKTtcblxudmFyIF9iaW5kQWN0aW9uQ3JlYXRvcnMgPSByZXF1aXJlKCcuL2JpbmRBY3Rpb25DcmVhdG9ycycpO1xuXG52YXIgX2JpbmRBY3Rpb25DcmVhdG9yczIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9iaW5kQWN0aW9uQ3JlYXRvcnMpO1xuXG52YXIgX2FwcGx5TWlkZGxld2FyZSA9IHJlcXVpcmUoJy4vYXBwbHlNaWRkbGV3YXJlJyk7XG5cbnZhciBfYXBwbHlNaWRkbGV3YXJlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2FwcGx5TWlkZGxld2FyZSk7XG5cbnZhciBfY29tcG9zZSA9IHJlcXVpcmUoJy4vY29tcG9zZScpO1xuXG52YXIgX2NvbXBvc2UyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY29tcG9zZSk7XG5cbnZhciBfd2FybmluZyA9IHJlcXVpcmUoJy4vdXRpbHMvd2FybmluZycpO1xuXG52YXIgX3dhcm5pbmcyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfd2FybmluZyk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7ICdkZWZhdWx0Jzogb2JqIH07IH1cblxuLypcbiogVGhpcyBpcyBhIGR1bW15IGZ1bmN0aW9uIHRvIGNoZWNrIGlmIHRoZSBmdW5jdGlvbiBuYW1lIGhhcyBiZWVuIGFsdGVyZWQgYnkgbWluaWZpY2F0aW9uLlxuKiBJZiB0aGUgZnVuY3Rpb24gaGFzIGJlZW4gbWluaWZpZWQgYW5kIE5PREVfRU5WICE9PSAncHJvZHVjdGlvbicsIHdhcm4gdGhlIHVzZXIuXG4qL1xuZnVuY3Rpb24gaXNDcnVzaGVkKCkge31cblxuaWYgKFwiZGV2ZWxvcG1lbnRcIiAhPT0gJ3Byb2R1Y3Rpb24nICYmIHR5cGVvZiBpc0NydXNoZWQubmFtZSA9PT0gJ3N0cmluZycgJiYgaXNDcnVzaGVkLm5hbWUgIT09ICdpc0NydXNoZWQnKSB7XG4gICgwLCBfd2FybmluZzJbJ2RlZmF1bHQnXSkoJ1lvdSBhcmUgY3VycmVudGx5IHVzaW5nIG1pbmlmaWVkIGNvZGUgb3V0c2lkZSBvZiBOT0RFX0VOViA9PT0gXFwncHJvZHVjdGlvblxcJy4gJyArICdUaGlzIG1lYW5zIHRoYXQgeW91IGFyZSBydW5uaW5nIGEgc2xvd2VyIGRldmVsb3BtZW50IGJ1aWxkIG9mIFJlZHV4LiAnICsgJ1lvdSBjYW4gdXNlIGxvb3NlLWVudmlmeSAoaHR0cHM6Ly9naXRodWIuY29tL3plcnRvc2gvbG9vc2UtZW52aWZ5KSBmb3IgYnJvd3NlcmlmeSAnICsgJ29yIERlZmluZVBsdWdpbiBmb3Igd2VicGFjayAoaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8zMDAzMDAzMSkgJyArICd0byBlbnN1cmUgeW91IGhhdmUgdGhlIGNvcnJlY3QgY29kZSBmb3IgeW91ciBwcm9kdWN0aW9uIGJ1aWxkLicpO1xufVxuXG5leHBvcnRzLmNyZWF0ZVN0b3JlID0gX2NyZWF0ZVN0b3JlMlsnZGVmYXVsdCddO1xuZXhwb3J0cy5jb21iaW5lUmVkdWNlcnMgPSBfY29tYmluZVJlZHVjZXJzMlsnZGVmYXVsdCddO1xuZXhwb3J0cy5iaW5kQWN0aW9uQ3JlYXRvcnMgPSBfYmluZEFjdGlvbkNyZWF0b3JzMlsnZGVmYXVsdCddO1xuZXhwb3J0cy5hcHBseU1pZGRsZXdhcmUgPSBfYXBwbHlNaWRkbGV3YXJlMlsnZGVmYXVsdCddO1xuZXhwb3J0cy5jb21wb3NlID0gX2NvbXBvc2UyWydkZWZhdWx0J107IiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuZXhwb3J0c1snZGVmYXVsdCddID0gd2FybmluZztcbi8qKlxuICogUHJpbnRzIGEgd2FybmluZyBpbiB0aGUgY29uc29sZSBpZiBpdCBleGlzdHMuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG1lc3NhZ2UgVGhlIHdhcm5pbmcgbWVzc2FnZS5cbiAqIEByZXR1cm5zIHt2b2lkfVxuICovXG5mdW5jdGlvbiB3YXJuaW5nKG1lc3NhZ2UpIHtcbiAgLyogZXNsaW50LWRpc2FibGUgbm8tY29uc29sZSAqL1xuICBpZiAodHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBjb25zb2xlLmVycm9yID09PSAnZnVuY3Rpb24nKSB7XG4gICAgY29uc29sZS5lcnJvcihtZXNzYWdlKTtcbiAgfVxuICAvKiBlc2xpbnQtZW5hYmxlIG5vLWNvbnNvbGUgKi9cbiAgdHJ5IHtcbiAgICAvLyBUaGlzIGVycm9yIHdhcyB0aHJvd24gYXMgYSBjb252ZW5pZW5jZSBzbyB0aGF0IGlmIHlvdSBlbmFibGVcbiAgICAvLyBcImJyZWFrIG9uIGFsbCBleGNlcHRpb25zXCIgaW4geW91ciBjb25zb2xlLFxuICAgIC8vIGl0IHdvdWxkIHBhdXNlIHRoZSBleGVjdXRpb24gYXQgdGhpcyBsaW5lLlxuICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgICAvKiBlc2xpbnQtZGlzYWJsZSBuby1lbXB0eSAqL1xuICB9IGNhdGNoIChlKSB7fVxuICAvKiBlc2xpbnQtZW5hYmxlIG5vLWVtcHR5ICovXG59IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2xpYi9pbmRleCcpO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX3BvbnlmaWxsID0gcmVxdWlyZSgnLi9wb255ZmlsbCcpO1xuXG52YXIgX3BvbnlmaWxsMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3BvbnlmaWxsKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgJ2RlZmF1bHQnOiBvYmogfTsgfVxuXG52YXIgcm9vdDsgLyogZ2xvYmFsIHdpbmRvdyAqL1xuXG5cbmlmICh0eXBlb2Ygc2VsZiAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgcm9vdCA9IHNlbGY7XG59IGVsc2UgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gIHJvb3QgPSB3aW5kb3c7XG59IGVsc2UgaWYgKHR5cGVvZiBnbG9iYWwgIT09ICd1bmRlZmluZWQnKSB7XG4gIHJvb3QgPSBnbG9iYWw7XG59IGVsc2UgaWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnKSB7XG4gIHJvb3QgPSBtb2R1bGU7XG59IGVsc2Uge1xuICByb290ID0gRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcbn1cblxudmFyIHJlc3VsdCA9ICgwLCBfcG9ueWZpbGwyWydkZWZhdWx0J10pKHJvb3QpO1xuZXhwb3J0c1snZGVmYXVsdCddID0gcmVzdWx0OyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG5cdHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IHN5bWJvbE9ic2VydmFibGVQb255ZmlsbDtcbmZ1bmN0aW9uIHN5bWJvbE9ic2VydmFibGVQb255ZmlsbChyb290KSB7XG5cdHZhciByZXN1bHQ7XG5cdHZhciBfU3ltYm9sID0gcm9vdC5TeW1ib2w7XG5cblx0aWYgKHR5cGVvZiBfU3ltYm9sID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0aWYgKF9TeW1ib2wub2JzZXJ2YWJsZSkge1xuXHRcdFx0cmVzdWx0ID0gX1N5bWJvbC5vYnNlcnZhYmxlO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXN1bHQgPSBfU3ltYm9sKCdvYnNlcnZhYmxlJyk7XG5cdFx0XHRfU3ltYm9sLm9ic2VydmFibGUgPSByZXN1bHQ7XG5cdFx0fVxuXHR9IGVsc2Uge1xuXHRcdHJlc3VsdCA9ICdAQG9ic2VydmFibGUnO1xuXHR9XG5cblx0cmV0dXJuIHJlc3VsdDtcbn07IiwiKGZ1bmN0aW9uKHNlbGYpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGlmIChzZWxmLmZldGNoKSB7XG4gICAgcmV0dXJuXG4gIH1cblxuICB2YXIgc3VwcG9ydCA9IHtcbiAgICBzZWFyY2hQYXJhbXM6ICdVUkxTZWFyY2hQYXJhbXMnIGluIHNlbGYsXG4gICAgaXRlcmFibGU6ICdTeW1ib2wnIGluIHNlbGYgJiYgJ2l0ZXJhdG9yJyBpbiBTeW1ib2wsXG4gICAgYmxvYjogJ0ZpbGVSZWFkZXInIGluIHNlbGYgJiYgJ0Jsb2InIGluIHNlbGYgJiYgKGZ1bmN0aW9uKCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgbmV3IEJsb2IoKVxuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgfSBjYXRjaChlKSB7XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgfVxuICAgIH0pKCksXG4gICAgZm9ybURhdGE6ICdGb3JtRGF0YScgaW4gc2VsZixcbiAgICBhcnJheUJ1ZmZlcjogJ0FycmF5QnVmZmVyJyBpbiBzZWxmXG4gIH1cblxuICBpZiAoc3VwcG9ydC5hcnJheUJ1ZmZlcikge1xuICAgIHZhciB2aWV3Q2xhc3NlcyA9IFtcbiAgICAgICdbb2JqZWN0IEludDhBcnJheV0nLFxuICAgICAgJ1tvYmplY3QgVWludDhBcnJheV0nLFxuICAgICAgJ1tvYmplY3QgVWludDhDbGFtcGVkQXJyYXldJyxcbiAgICAgICdbb2JqZWN0IEludDE2QXJyYXldJyxcbiAgICAgICdbb2JqZWN0IFVpbnQxNkFycmF5XScsXG4gICAgICAnW29iamVjdCBJbnQzMkFycmF5XScsXG4gICAgICAnW29iamVjdCBVaW50MzJBcnJheV0nLFxuICAgICAgJ1tvYmplY3QgRmxvYXQzMkFycmF5XScsXG4gICAgICAnW29iamVjdCBGbG9hdDY0QXJyYXldJ1xuICAgIF1cblxuICAgIHZhciBpc0RhdGFWaWV3ID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgICByZXR1cm4gb2JqICYmIERhdGFWaWV3LnByb3RvdHlwZS5pc1Byb3RvdHlwZU9mKG9iailcbiAgICB9XG5cbiAgICB2YXIgaXNBcnJheUJ1ZmZlclZpZXcgPSBBcnJheUJ1ZmZlci5pc1ZpZXcgfHwgZnVuY3Rpb24ob2JqKSB7XG4gICAgICByZXR1cm4gb2JqICYmIHZpZXdDbGFzc2VzLmluZGV4T2YoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iaikpID4gLTFcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBub3JtYWxpemVOYW1lKG5hbWUpIHtcbiAgICBpZiAodHlwZW9mIG5hbWUgIT09ICdzdHJpbmcnKSB7XG4gICAgICBuYW1lID0gU3RyaW5nKG5hbWUpXG4gICAgfVxuICAgIGlmICgvW15hLXowLTlcXC0jJCUmJyorLlxcXl9gfH5dL2kudGVzdChuYW1lKSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSW52YWxpZCBjaGFyYWN0ZXIgaW4gaGVhZGVyIGZpZWxkIG5hbWUnKVxuICAgIH1cbiAgICByZXR1cm4gbmFtZS50b0xvd2VyQ2FzZSgpXG4gIH1cblxuICBmdW5jdGlvbiBub3JtYWxpemVWYWx1ZSh2YWx1ZSkge1xuICAgIGlmICh0eXBlb2YgdmFsdWUgIT09ICdzdHJpbmcnKSB7XG4gICAgICB2YWx1ZSA9IFN0cmluZyh2YWx1ZSlcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlXG4gIH1cblxuICAvLyBCdWlsZCBhIGRlc3RydWN0aXZlIGl0ZXJhdG9yIGZvciB0aGUgdmFsdWUgbGlzdFxuICBmdW5jdGlvbiBpdGVyYXRvckZvcihpdGVtcykge1xuICAgIHZhciBpdGVyYXRvciA9IHtcbiAgICAgIG5leHQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgdmFsdWUgPSBpdGVtcy5zaGlmdCgpXG4gICAgICAgIHJldHVybiB7ZG9uZTogdmFsdWUgPT09IHVuZGVmaW5lZCwgdmFsdWU6IHZhbHVlfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChzdXBwb3J0Lml0ZXJhYmxlKSB7XG4gICAgICBpdGVyYXRvcltTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBpdGVyYXRvclxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBpdGVyYXRvclxuICB9XG5cbiAgZnVuY3Rpb24gSGVhZGVycyhoZWFkZXJzKSB7XG4gICAgdGhpcy5tYXAgPSB7fVxuXG4gICAgaWYgKGhlYWRlcnMgaW5zdGFuY2VvZiBIZWFkZXJzKSB7XG4gICAgICBoZWFkZXJzLmZvckVhY2goZnVuY3Rpb24odmFsdWUsIG5hbWUpIHtcbiAgICAgICAgdGhpcy5hcHBlbmQobmFtZSwgdmFsdWUpXG4gICAgICB9LCB0aGlzKVxuXG4gICAgfSBlbHNlIGlmIChoZWFkZXJzKSB7XG4gICAgICBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhoZWFkZXJzKS5mb3JFYWNoKGZ1bmN0aW9uKG5hbWUpIHtcbiAgICAgICAgdGhpcy5hcHBlbmQobmFtZSwgaGVhZGVyc1tuYW1lXSlcbiAgICAgIH0sIHRoaXMpXG4gICAgfVxuICB9XG5cbiAgSGVhZGVycy5wcm90b3R5cGUuYXBwZW5kID0gZnVuY3Rpb24obmFtZSwgdmFsdWUpIHtcbiAgICBuYW1lID0gbm9ybWFsaXplTmFtZShuYW1lKVxuICAgIHZhbHVlID0gbm9ybWFsaXplVmFsdWUodmFsdWUpXG4gICAgdmFyIGxpc3QgPSB0aGlzLm1hcFtuYW1lXVxuICAgIGlmICghbGlzdCkge1xuICAgICAgbGlzdCA9IFtdXG4gICAgICB0aGlzLm1hcFtuYW1lXSA9IGxpc3RcbiAgICB9XG4gICAgbGlzdC5wdXNoKHZhbHVlKVxuICB9XG5cbiAgSGVhZGVycy5wcm90b3R5cGVbJ2RlbGV0ZSddID0gZnVuY3Rpb24obmFtZSkge1xuICAgIGRlbGV0ZSB0aGlzLm1hcFtub3JtYWxpemVOYW1lKG5hbWUpXVxuICB9XG5cbiAgSGVhZGVycy5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24obmFtZSkge1xuICAgIHZhciB2YWx1ZXMgPSB0aGlzLm1hcFtub3JtYWxpemVOYW1lKG5hbWUpXVxuICAgIHJldHVybiB2YWx1ZXMgPyB2YWx1ZXNbMF0gOiBudWxsXG4gIH1cblxuICBIZWFkZXJzLnByb3RvdHlwZS5nZXRBbGwgPSBmdW5jdGlvbihuYW1lKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwW25vcm1hbGl6ZU5hbWUobmFtZSldIHx8IFtdXG4gIH1cblxuICBIZWFkZXJzLnByb3RvdHlwZS5oYXMgPSBmdW5jdGlvbihuYW1lKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwLmhhc093blByb3BlcnR5KG5vcm1hbGl6ZU5hbWUobmFtZSkpXG4gIH1cblxuICBIZWFkZXJzLnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbihuYW1lLCB2YWx1ZSkge1xuICAgIHRoaXMubWFwW25vcm1hbGl6ZU5hbWUobmFtZSldID0gW25vcm1hbGl6ZVZhbHVlKHZhbHVlKV1cbiAgfVxuXG4gIEhlYWRlcnMucHJvdG90eXBlLmZvckVhY2ggPSBmdW5jdGlvbihjYWxsYmFjaywgdGhpc0FyZykge1xuICAgIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRoaXMubWFwKS5mb3JFYWNoKGZ1bmN0aW9uKG5hbWUpIHtcbiAgICAgIHRoaXMubWFwW25hbWVdLmZvckVhY2goZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgY2FsbGJhY2suY2FsbCh0aGlzQXJnLCB2YWx1ZSwgbmFtZSwgdGhpcylcbiAgICAgIH0sIHRoaXMpXG4gICAgfSwgdGhpcylcbiAgfVxuXG4gIEhlYWRlcnMucHJvdG90eXBlLmtleXMgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgaXRlbXMgPSBbXVxuICAgIHRoaXMuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSwgbmFtZSkgeyBpdGVtcy5wdXNoKG5hbWUpIH0pXG4gICAgcmV0dXJuIGl0ZXJhdG9yRm9yKGl0ZW1zKVxuICB9XG5cbiAgSGVhZGVycy5wcm90b3R5cGUudmFsdWVzID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGl0ZW1zID0gW11cbiAgICB0aGlzLmZvckVhY2goZnVuY3Rpb24odmFsdWUpIHsgaXRlbXMucHVzaCh2YWx1ZSkgfSlcbiAgICByZXR1cm4gaXRlcmF0b3JGb3IoaXRlbXMpXG4gIH1cblxuICBIZWFkZXJzLnByb3RvdHlwZS5lbnRyaWVzID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGl0ZW1zID0gW11cbiAgICB0aGlzLmZvckVhY2goZnVuY3Rpb24odmFsdWUsIG5hbWUpIHsgaXRlbXMucHVzaChbbmFtZSwgdmFsdWVdKSB9KVxuICAgIHJldHVybiBpdGVyYXRvckZvcihpdGVtcylcbiAgfVxuXG4gIGlmIChzdXBwb3J0Lml0ZXJhYmxlKSB7XG4gICAgSGVhZGVycy5wcm90b3R5cGVbU3ltYm9sLml0ZXJhdG9yXSA9IEhlYWRlcnMucHJvdG90eXBlLmVudHJpZXNcbiAgfVxuXG4gIGZ1bmN0aW9uIGNvbnN1bWVkKGJvZHkpIHtcbiAgICBpZiAoYm9keS5ib2R5VXNlZCkge1xuICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBUeXBlRXJyb3IoJ0FscmVhZHkgcmVhZCcpKVxuICAgIH1cbiAgICBib2R5LmJvZHlVc2VkID0gdHJ1ZVxuICB9XG5cbiAgZnVuY3Rpb24gZmlsZVJlYWRlclJlYWR5KHJlYWRlcikge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgIHJlYWRlci5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmVzb2x2ZShyZWFkZXIucmVzdWx0KVxuICAgICAgfVxuICAgICAgcmVhZGVyLm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmVqZWN0KHJlYWRlci5lcnJvcilcbiAgICAgIH1cbiAgICB9KVxuICB9XG5cbiAgZnVuY3Rpb24gcmVhZEJsb2JBc0FycmF5QnVmZmVyKGJsb2IpIHtcbiAgICB2YXIgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKVxuICAgIHZhciBwcm9taXNlID0gZmlsZVJlYWRlclJlYWR5KHJlYWRlcilcbiAgICByZWFkZXIucmVhZEFzQXJyYXlCdWZmZXIoYmxvYilcbiAgICByZXR1cm4gcHJvbWlzZVxuICB9XG5cbiAgZnVuY3Rpb24gcmVhZEJsb2JBc1RleHQoYmxvYikge1xuICAgIHZhciByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpXG4gICAgdmFyIHByb21pc2UgPSBmaWxlUmVhZGVyUmVhZHkocmVhZGVyKVxuICAgIHJlYWRlci5yZWFkQXNUZXh0KGJsb2IpXG4gICAgcmV0dXJuIHByb21pc2VcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlYWRBcnJheUJ1ZmZlckFzVGV4dChidWYpIHtcbiAgICB2YXIgdmlldyA9IG5ldyBVaW50OEFycmF5KGJ1ZilcbiAgICB2YXIgY2hhcnMgPSBuZXcgQXJyYXkodmlldy5sZW5ndGgpXG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHZpZXcubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNoYXJzW2ldID0gU3RyaW5nLmZyb21DaGFyQ29kZSh2aWV3W2ldKVxuICAgIH1cbiAgICByZXR1cm4gY2hhcnMuam9pbignJylcbiAgfVxuXG4gIGZ1bmN0aW9uIGJ1ZmZlckNsb25lKGJ1Zikge1xuICAgIGlmIChidWYuc2xpY2UpIHtcbiAgICAgIHJldHVybiBidWYuc2xpY2UoMClcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHZpZXcgPSBuZXcgVWludDhBcnJheShidWYuYnl0ZUxlbmd0aClcbiAgICAgIHZpZXcuc2V0KG5ldyBVaW50OEFycmF5KGJ1ZikpXG4gICAgICByZXR1cm4gdmlldy5idWZmZXJcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBCb2R5KCkge1xuICAgIHRoaXMuYm9keVVzZWQgPSBmYWxzZVxuXG4gICAgdGhpcy5faW5pdEJvZHkgPSBmdW5jdGlvbihib2R5KSB7XG4gICAgICB0aGlzLl9ib2R5SW5pdCA9IGJvZHlcbiAgICAgIGlmICghYm9keSkge1xuICAgICAgICB0aGlzLl9ib2R5VGV4dCA9ICcnXG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBib2R5ID09PSAnc3RyaW5nJykge1xuICAgICAgICB0aGlzLl9ib2R5VGV4dCA9IGJvZHlcbiAgICAgIH0gZWxzZSBpZiAoc3VwcG9ydC5ibG9iICYmIEJsb2IucHJvdG90eXBlLmlzUHJvdG90eXBlT2YoYm9keSkpIHtcbiAgICAgICAgdGhpcy5fYm9keUJsb2IgPSBib2R5XG4gICAgICB9IGVsc2UgaWYgKHN1cHBvcnQuZm9ybURhdGEgJiYgRm9ybURhdGEucHJvdG90eXBlLmlzUHJvdG90eXBlT2YoYm9keSkpIHtcbiAgICAgICAgdGhpcy5fYm9keUZvcm1EYXRhID0gYm9keVxuICAgICAgfSBlbHNlIGlmIChzdXBwb3J0LnNlYXJjaFBhcmFtcyAmJiBVUkxTZWFyY2hQYXJhbXMucHJvdG90eXBlLmlzUHJvdG90eXBlT2YoYm9keSkpIHtcbiAgICAgICAgdGhpcy5fYm9keVRleHQgPSBib2R5LnRvU3RyaW5nKClcbiAgICAgIH0gZWxzZSBpZiAoc3VwcG9ydC5hcnJheUJ1ZmZlciAmJiBzdXBwb3J0LmJsb2IgJiYgaXNEYXRhVmlldyhib2R5KSkge1xuICAgICAgICB0aGlzLl9ib2R5QXJyYXlCdWZmZXIgPSBidWZmZXJDbG9uZShib2R5LmJ1ZmZlcilcbiAgICAgICAgLy8gSUUgMTAtMTEgY2FuJ3QgaGFuZGxlIGEgRGF0YVZpZXcgYm9keS5cbiAgICAgICAgdGhpcy5fYm9keUluaXQgPSBuZXcgQmxvYihbdGhpcy5fYm9keUFycmF5QnVmZmVyXSlcbiAgICAgIH0gZWxzZSBpZiAoc3VwcG9ydC5hcnJheUJ1ZmZlciAmJiAoQXJyYXlCdWZmZXIucHJvdG90eXBlLmlzUHJvdG90eXBlT2YoYm9keSkgfHwgaXNBcnJheUJ1ZmZlclZpZXcoYm9keSkpKSB7XG4gICAgICAgIHRoaXMuX2JvZHlBcnJheUJ1ZmZlciA9IGJ1ZmZlckNsb25lKGJvZHkpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3Vuc3VwcG9ydGVkIEJvZHlJbml0IHR5cGUnKVxuICAgICAgfVxuXG4gICAgICBpZiAoIXRoaXMuaGVhZGVycy5nZXQoJ2NvbnRlbnQtdHlwZScpKSB7XG4gICAgICAgIGlmICh0eXBlb2YgYm9keSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICB0aGlzLmhlYWRlcnMuc2V0KCdjb250ZW50LXR5cGUnLCAndGV4dC9wbGFpbjtjaGFyc2V0PVVURi04JylcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9ib2R5QmxvYiAmJiB0aGlzLl9ib2R5QmxvYi50eXBlKSB7XG4gICAgICAgICAgdGhpcy5oZWFkZXJzLnNldCgnY29udGVudC10eXBlJywgdGhpcy5fYm9keUJsb2IudHlwZSlcbiAgICAgICAgfSBlbHNlIGlmIChzdXBwb3J0LnNlYXJjaFBhcmFtcyAmJiBVUkxTZWFyY2hQYXJhbXMucHJvdG90eXBlLmlzUHJvdG90eXBlT2YoYm9keSkpIHtcbiAgICAgICAgICB0aGlzLmhlYWRlcnMuc2V0KCdjb250ZW50LXR5cGUnLCAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkO2NoYXJzZXQ9VVRGLTgnKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHN1cHBvcnQuYmxvYikge1xuICAgICAgdGhpcy5ibG9iID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciByZWplY3RlZCA9IGNvbnN1bWVkKHRoaXMpXG4gICAgICAgIGlmIChyZWplY3RlZCkge1xuICAgICAgICAgIHJldHVybiByZWplY3RlZFxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuX2JvZHlCbG9iKSB7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aGlzLl9ib2R5QmxvYilcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9ib2R5QXJyYXlCdWZmZXIpIHtcbiAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG5ldyBCbG9iKFt0aGlzLl9ib2R5QXJyYXlCdWZmZXJdKSlcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLl9ib2R5Rm9ybURhdGEpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2NvdWxkIG5vdCByZWFkIEZvcm1EYXRhIGJvZHkgYXMgYmxvYicpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShuZXcgQmxvYihbdGhpcy5fYm9keVRleHRdKSlcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB0aGlzLmFycmF5QnVmZmVyID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICh0aGlzLl9ib2R5QXJyYXlCdWZmZXIpIHtcbiAgICAgICAgICByZXR1cm4gY29uc3VtZWQodGhpcykgfHwgUHJvbWlzZS5yZXNvbHZlKHRoaXMuX2JvZHlBcnJheUJ1ZmZlcilcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5ibG9iKCkudGhlbihyZWFkQmxvYkFzQXJyYXlCdWZmZXIpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLnRleHQgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciByZWplY3RlZCA9IGNvbnN1bWVkKHRoaXMpXG4gICAgICBpZiAocmVqZWN0ZWQpIHtcbiAgICAgICAgcmV0dXJuIHJlamVjdGVkXG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLl9ib2R5QmxvYikge1xuICAgICAgICByZXR1cm4gcmVhZEJsb2JBc1RleHQodGhpcy5fYm9keUJsb2IpXG4gICAgICB9IGVsc2UgaWYgKHRoaXMuX2JvZHlBcnJheUJ1ZmZlcikge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHJlYWRBcnJheUJ1ZmZlckFzVGV4dCh0aGlzLl9ib2R5QXJyYXlCdWZmZXIpKVxuICAgICAgfSBlbHNlIGlmICh0aGlzLl9ib2R5Rm9ybURhdGEpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdjb3VsZCBub3QgcmVhZCBGb3JtRGF0YSBib2R5IGFzIHRleHQnKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh0aGlzLl9ib2R5VGV4dClcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoc3VwcG9ydC5mb3JtRGF0YSkge1xuICAgICAgdGhpcy5mb3JtRGF0YSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdGhpcy50ZXh0KCkudGhlbihkZWNvZGUpXG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5qc29uID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy50ZXh0KCkudGhlbihKU09OLnBhcnNlKVxuICAgIH1cblxuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICAvLyBIVFRQIG1ldGhvZHMgd2hvc2UgY2FwaXRhbGl6YXRpb24gc2hvdWxkIGJlIG5vcm1hbGl6ZWRcbiAgdmFyIG1ldGhvZHMgPSBbJ0RFTEVURScsICdHRVQnLCAnSEVBRCcsICdPUFRJT05TJywgJ1BPU1QnLCAnUFVUJ11cblxuICBmdW5jdGlvbiBub3JtYWxpemVNZXRob2QobWV0aG9kKSB7XG4gICAgdmFyIHVwY2FzZWQgPSBtZXRob2QudG9VcHBlckNhc2UoKVxuICAgIHJldHVybiAobWV0aG9kcy5pbmRleE9mKHVwY2FzZWQpID4gLTEpID8gdXBjYXNlZCA6IG1ldGhvZFxuICB9XG5cbiAgZnVuY3Rpb24gUmVxdWVzdChpbnB1dCwgb3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9XG4gICAgdmFyIGJvZHkgPSBvcHRpb25zLmJvZHlcblxuICAgIGlmICh0eXBlb2YgaW5wdXQgPT09ICdzdHJpbmcnKSB7XG4gICAgICB0aGlzLnVybCA9IGlucHV0XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChpbnB1dC5ib2R5VXNlZCkge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBbHJlYWR5IHJlYWQnKVxuICAgICAgfVxuICAgICAgdGhpcy51cmwgPSBpbnB1dC51cmxcbiAgICAgIHRoaXMuY3JlZGVudGlhbHMgPSBpbnB1dC5jcmVkZW50aWFsc1xuICAgICAgaWYgKCFvcHRpb25zLmhlYWRlcnMpIHtcbiAgICAgICAgdGhpcy5oZWFkZXJzID0gbmV3IEhlYWRlcnMoaW5wdXQuaGVhZGVycylcbiAgICAgIH1cbiAgICAgIHRoaXMubWV0aG9kID0gaW5wdXQubWV0aG9kXG4gICAgICB0aGlzLm1vZGUgPSBpbnB1dC5tb2RlXG4gICAgICBpZiAoIWJvZHkgJiYgaW5wdXQuX2JvZHlJbml0ICE9IG51bGwpIHtcbiAgICAgICAgYm9keSA9IGlucHV0Ll9ib2R5SW5pdFxuICAgICAgICBpbnB1dC5ib2R5VXNlZCA9IHRydWVcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLmNyZWRlbnRpYWxzID0gb3B0aW9ucy5jcmVkZW50aWFscyB8fCB0aGlzLmNyZWRlbnRpYWxzIHx8ICdvbWl0J1xuICAgIGlmIChvcHRpb25zLmhlYWRlcnMgfHwgIXRoaXMuaGVhZGVycykge1xuICAgICAgdGhpcy5oZWFkZXJzID0gbmV3IEhlYWRlcnMob3B0aW9ucy5oZWFkZXJzKVxuICAgIH1cbiAgICB0aGlzLm1ldGhvZCA9IG5vcm1hbGl6ZU1ldGhvZChvcHRpb25zLm1ldGhvZCB8fCB0aGlzLm1ldGhvZCB8fCAnR0VUJylcbiAgICB0aGlzLm1vZGUgPSBvcHRpb25zLm1vZGUgfHwgdGhpcy5tb2RlIHx8IG51bGxcbiAgICB0aGlzLnJlZmVycmVyID0gbnVsbFxuXG4gICAgaWYgKCh0aGlzLm1ldGhvZCA9PT0gJ0dFVCcgfHwgdGhpcy5tZXRob2QgPT09ICdIRUFEJykgJiYgYm9keSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQm9keSBub3QgYWxsb3dlZCBmb3IgR0VUIG9yIEhFQUQgcmVxdWVzdHMnKVxuICAgIH1cbiAgICB0aGlzLl9pbml0Qm9keShib2R5KVxuICB9XG5cbiAgUmVxdWVzdC5wcm90b3R5cGUuY2xvbmUgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gbmV3IFJlcXVlc3QodGhpcywgeyBib2R5OiB0aGlzLl9ib2R5SW5pdCB9KVxuICB9XG5cbiAgZnVuY3Rpb24gZGVjb2RlKGJvZHkpIHtcbiAgICB2YXIgZm9ybSA9IG5ldyBGb3JtRGF0YSgpXG4gICAgYm9keS50cmltKCkuc3BsaXQoJyYnKS5mb3JFYWNoKGZ1bmN0aW9uKGJ5dGVzKSB7XG4gICAgICBpZiAoYnl0ZXMpIHtcbiAgICAgICAgdmFyIHNwbGl0ID0gYnl0ZXMuc3BsaXQoJz0nKVxuICAgICAgICB2YXIgbmFtZSA9IHNwbGl0LnNoaWZ0KCkucmVwbGFjZSgvXFwrL2csICcgJylcbiAgICAgICAgdmFyIHZhbHVlID0gc3BsaXQuam9pbignPScpLnJlcGxhY2UoL1xcKy9nLCAnICcpXG4gICAgICAgIGZvcm0uYXBwZW5kKGRlY29kZVVSSUNvbXBvbmVudChuYW1lKSwgZGVjb2RlVVJJQ29tcG9uZW50KHZhbHVlKSlcbiAgICAgIH1cbiAgICB9KVxuICAgIHJldHVybiBmb3JtXG4gIH1cblxuICBmdW5jdGlvbiBwYXJzZUhlYWRlcnMocmF3SGVhZGVycykge1xuICAgIHZhciBoZWFkZXJzID0gbmV3IEhlYWRlcnMoKVxuICAgIHJhd0hlYWRlcnMuc3BsaXQoJ1xcclxcbicpLmZvckVhY2goZnVuY3Rpb24obGluZSkge1xuICAgICAgdmFyIHBhcnRzID0gbGluZS5zcGxpdCgnOicpXG4gICAgICB2YXIga2V5ID0gcGFydHMuc2hpZnQoKS50cmltKClcbiAgICAgIGlmIChrZXkpIHtcbiAgICAgICAgdmFyIHZhbHVlID0gcGFydHMuam9pbignOicpLnRyaW0oKVxuICAgICAgICBoZWFkZXJzLmFwcGVuZChrZXksIHZhbHVlKVxuICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuIGhlYWRlcnNcbiAgfVxuXG4gIEJvZHkuY2FsbChSZXF1ZXN0LnByb3RvdHlwZSlcblxuICBmdW5jdGlvbiBSZXNwb25zZShib2R5SW5pdCwgb3B0aW9ucykge1xuICAgIGlmICghb3B0aW9ucykge1xuICAgICAgb3B0aW9ucyA9IHt9XG4gICAgfVxuXG4gICAgdGhpcy50eXBlID0gJ2RlZmF1bHQnXG4gICAgdGhpcy5zdGF0dXMgPSAnc3RhdHVzJyBpbiBvcHRpb25zID8gb3B0aW9ucy5zdGF0dXMgOiAyMDBcbiAgICB0aGlzLm9rID0gdGhpcy5zdGF0dXMgPj0gMjAwICYmIHRoaXMuc3RhdHVzIDwgMzAwXG4gICAgdGhpcy5zdGF0dXNUZXh0ID0gJ3N0YXR1c1RleHQnIGluIG9wdGlvbnMgPyBvcHRpb25zLnN0YXR1c1RleHQgOiAnT0snXG4gICAgdGhpcy5oZWFkZXJzID0gbmV3IEhlYWRlcnMob3B0aW9ucy5oZWFkZXJzKVxuICAgIHRoaXMudXJsID0gb3B0aW9ucy51cmwgfHwgJydcbiAgICB0aGlzLl9pbml0Qm9keShib2R5SW5pdClcbiAgfVxuXG4gIEJvZHkuY2FsbChSZXNwb25zZS5wcm90b3R5cGUpXG5cbiAgUmVzcG9uc2UucHJvdG90eXBlLmNsb25lID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIG5ldyBSZXNwb25zZSh0aGlzLl9ib2R5SW5pdCwge1xuICAgICAgc3RhdHVzOiB0aGlzLnN0YXR1cyxcbiAgICAgIHN0YXR1c1RleHQ6IHRoaXMuc3RhdHVzVGV4dCxcbiAgICAgIGhlYWRlcnM6IG5ldyBIZWFkZXJzKHRoaXMuaGVhZGVycyksXG4gICAgICB1cmw6IHRoaXMudXJsXG4gICAgfSlcbiAgfVxuXG4gIFJlc3BvbnNlLmVycm9yID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHJlc3BvbnNlID0gbmV3IFJlc3BvbnNlKG51bGwsIHtzdGF0dXM6IDAsIHN0YXR1c1RleHQ6ICcnfSlcbiAgICByZXNwb25zZS50eXBlID0gJ2Vycm9yJ1xuICAgIHJldHVybiByZXNwb25zZVxuICB9XG5cbiAgdmFyIHJlZGlyZWN0U3RhdHVzZXMgPSBbMzAxLCAzMDIsIDMwMywgMzA3LCAzMDhdXG5cbiAgUmVzcG9uc2UucmVkaXJlY3QgPSBmdW5jdGlvbih1cmwsIHN0YXR1cykge1xuICAgIGlmIChyZWRpcmVjdFN0YXR1c2VzLmluZGV4T2Yoc3RhdHVzKSA9PT0gLTEpIHtcbiAgICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdJbnZhbGlkIHN0YXR1cyBjb2RlJylcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IFJlc3BvbnNlKG51bGwsIHtzdGF0dXM6IHN0YXR1cywgaGVhZGVyczoge2xvY2F0aW9uOiB1cmx9fSlcbiAgfVxuXG4gIHNlbGYuSGVhZGVycyA9IEhlYWRlcnNcbiAgc2VsZi5SZXF1ZXN0ID0gUmVxdWVzdFxuICBzZWxmLlJlc3BvbnNlID0gUmVzcG9uc2VcblxuICBzZWxmLmZldGNoID0gZnVuY3Rpb24oaW5wdXQsIGluaXQpIHtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICB2YXIgcmVxdWVzdCA9IG5ldyBSZXF1ZXN0KGlucHV0LCBpbml0KVxuICAgICAgdmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpXG5cbiAgICAgIHhoci5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIG9wdGlvbnMgPSB7XG4gICAgICAgICAgc3RhdHVzOiB4aHIuc3RhdHVzLFxuICAgICAgICAgIHN0YXR1c1RleHQ6IHhoci5zdGF0dXNUZXh0LFxuICAgICAgICAgIGhlYWRlcnM6IHBhcnNlSGVhZGVycyh4aHIuZ2V0QWxsUmVzcG9uc2VIZWFkZXJzKCkgfHwgJycpXG4gICAgICAgIH1cbiAgICAgICAgb3B0aW9ucy51cmwgPSAncmVzcG9uc2VVUkwnIGluIHhociA/IHhoci5yZXNwb25zZVVSTCA6IG9wdGlvbnMuaGVhZGVycy5nZXQoJ1gtUmVxdWVzdC1VUkwnKVxuICAgICAgICB2YXIgYm9keSA9ICdyZXNwb25zZScgaW4geGhyID8geGhyLnJlc3BvbnNlIDogeGhyLnJlc3BvbnNlVGV4dFxuICAgICAgICByZXNvbHZlKG5ldyBSZXNwb25zZShib2R5LCBvcHRpb25zKSlcbiAgICAgIH1cblxuICAgICAgeGhyLm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmVqZWN0KG5ldyBUeXBlRXJyb3IoJ05ldHdvcmsgcmVxdWVzdCBmYWlsZWQnKSlcbiAgICAgIH1cblxuICAgICAgeGhyLm9udGltZW91dCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZWplY3QobmV3IFR5cGVFcnJvcignTmV0d29yayByZXF1ZXN0IGZhaWxlZCcpKVxuICAgICAgfVxuXG4gICAgICB4aHIub3BlbihyZXF1ZXN0Lm1ldGhvZCwgcmVxdWVzdC51cmwsIHRydWUpXG5cbiAgICAgIGlmIChyZXF1ZXN0LmNyZWRlbnRpYWxzID09PSAnaW5jbHVkZScpIHtcbiAgICAgICAgeGhyLndpdGhDcmVkZW50aWFscyA9IHRydWVcbiAgICAgIH1cblxuICAgICAgaWYgKCdyZXNwb25zZVR5cGUnIGluIHhociAmJiBzdXBwb3J0LmJsb2IpIHtcbiAgICAgICAgeGhyLnJlc3BvbnNlVHlwZSA9ICdibG9iJ1xuICAgICAgfVxuXG4gICAgICByZXF1ZXN0LmhlYWRlcnMuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSwgbmFtZSkge1xuICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcihuYW1lLCB2YWx1ZSlcbiAgICAgIH0pXG5cbiAgICAgIHhoci5zZW5kKHR5cGVvZiByZXF1ZXN0Ll9ib2R5SW5pdCA9PT0gJ3VuZGVmaW5lZCcgPyBudWxsIDogcmVxdWVzdC5fYm9keUluaXQpXG4gICAgfSlcbiAgfVxuICBzZWxmLmZldGNoLnBvbHlmaWxsID0gdHJ1ZVxufSkodHlwZW9mIHNlbGYgIT09ICd1bmRlZmluZWQnID8gc2VsZiA6IHRoaXMpO1xuIiwiJ3VzZSBzdHJpY3QnO09iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCdfX2VzTW9kdWxlJyx7dmFsdWU6dHJ1ZX0pO3ZhciBfcmVkdXg9cmVxdWlyZSgncmVkdXgnKTt2YXIgX3JlZHV4VGh1bms9cmVxdWlyZSgncmVkdXgtdGh1bmsnKTt2YXIgX3JlZHV4VGh1bmsyPV9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3JlZHV4VGh1bmspO2Z1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKXtyZXR1cm4gb2JqJiZvYmouX19lc01vZHVsZT9vYmo6e2RlZmF1bHQ6b2JqfX12YXIgY29uZmlndXJlU3RvcmU9ZnVuY3Rpb24gY29uZmlndXJlU3RvcmUocmVkdWNlcil7dmFyIG1pZGRsZXdhcmVzPVtfcmVkdXhUaHVuazIuZGVmYXVsdF07aWYoXCJkZXZlbG9wbWVudFwiPT09J2RldmVsb3BtZW50Jyl7dmFyIF9yZXF1aXJlPXJlcXVpcmUoJ3JlZHV4LWxvZ2dlcicpLGNyZWF0ZUxvZ2dlcj1fcmVxdWlyZS5jcmVhdGVMb2dnZXI7bWlkZGxld2FyZXMucHVzaChjcmVhdGVMb2dnZXIoKSl9dmFyIHN0b3JlPSgwLF9yZWR1eC5jcmVhdGVTdG9yZSkocmVkdWNlcixfcmVkdXguYXBwbHlNaWRkbGV3YXJlLmFwcGx5KHVuZGVmaW5lZCxtaWRkbGV3YXJlcykpO3JldHVybiBzdG9yZX07ZXhwb3J0cy5kZWZhdWx0PWNvbmZpZ3VyZVN0b3JlOyIsIid1c2Ugc3RyaWN0JztPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywnX19lc01vZHVsZScse3ZhbHVlOnRydWV9KTt2YXIgX2V4dGVuZHM9T2JqZWN0LmFzc2lnbnx8ZnVuY3Rpb24odGFyZ2V0KXtmb3IodmFyIGk9MTtpPGFyZ3VtZW50cy5sZW5ndGg7aSsrKXt2YXIgc291cmNlPWFyZ3VtZW50c1tpXTtmb3IodmFyIGtleSBpbiBzb3VyY2Upe2lmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2Usa2V5KSl7dGFyZ2V0W2tleV09c291cmNlW2tleV19fX1yZXR1cm4gdGFyZ2V0fTtleHBvcnRzLmdldERhdGE9Z2V0RGF0YTtyZXF1aXJlKCd3aGF0d2ctZmV0Y2gnKTtmdW5jdGlvbiBfZGVmaW5lUHJvcGVydHkob2JqLGtleSx2YWx1ZSl7aWYoa2V5IGluIG9iail7T2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaixrZXkse3ZhbHVlOnZhbHVlLGVudW1lcmFibGU6dHJ1ZSxjb25maWd1cmFibGU6dHJ1ZSx3cml0YWJsZTp0cnVlfSl9ZWxzZXtvYmpba2V5XT12YWx1ZX1yZXR1cm4gb2JqfXZhciByb290VXJsPScvYXBpLyc7ZnVuY3Rpb24gZ2V0RGF0YShzb3VyY2VzLGNvbXBvbmVudCxub3RpZmljYXRpb24pe3ZhciBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uPXRydWU7dmFyIF9kaWRJdGVyYXRvckVycm9yPWZhbHNlO3ZhciBfaXRlcmF0b3JFcnJvcj11bmRlZmluZWQ7dHJ5e3ZhciBfbG9vcD1mdW5jdGlvbiBfbG9vcCgpe3ZhciBfcmVmPV9zdGVwLnZhbHVlO3ZhciB0eXBlPV9yZWYudHlwZSxwYXRoPV9yZWYucGF0aCxicmFuY2g9X3JlZi5icmFuY2gsZGF0YT1fcmVmLmRhdGEsY2FsbGJhY2s9X3JlZi5jYWxsYmFjaztub3RpZmljYXRpb24ubm90aWZ5KHtraW5kOidzcGVjaWFsJyx0ZXh0OmJyYW5jaCsnIHRyYW5zZmVycmluZyBkYXRhIC4uLicsYnVzeToxfSk7dmFyIHNldHRpbmdzPXtjcmVkZW50aWFsczonc2FtZS1vcmlnaW4nfTtpZihkYXRhIT1udWxsKXtzZXR0aW5ncz1fZXh0ZW5kcyh7fSxzZXR0aW5ncyx7bWV0aG9kOidQT1NUJyxib2R5OkpTT04uc3RyaW5naWZ5KGRhdGEpLGhlYWRlcnM6eydDb250ZW50LVR5cGUnOidhcHBsaWNhdGlvbi9qc29uJ319KX1mZXRjaCgnJytyb290VXJsK3R5cGUrcGF0aCxzZXR0aW5ncykudGhlbihmdW5jdGlvbihyZXNwb25zZSl7cmV0dXJuIHJlc3BvbnNlLmpzb24oKX0pLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2VEYXRhKXt2YXIgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjI9dHJ1ZTt2YXIgX2RpZEl0ZXJhdG9yRXJyb3IyPWZhbHNlO3ZhciBfaXRlcmF0b3JFcnJvcjI9dW5kZWZpbmVkO3RyeXtmb3IodmFyIF9pdGVyYXRvcjI9KHJlc3BvbnNlRGF0YS5tc2dzfHxbXSlbU3ltYm9sLml0ZXJhdG9yXSgpLF9zdGVwMjshKF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24yPShfc3RlcDI9X2l0ZXJhdG9yMi5uZXh0KCkpLmRvbmUpO19pdGVyYXRvck5vcm1hbENvbXBsZXRpb24yPXRydWUpe3ZhciBtc2c9X3N0ZXAyLnZhbHVlO25vdGlmaWNhdGlvbi5ub3RpZnkobXNnKX19Y2F0Y2goZXJyKXtfZGlkSXRlcmF0b3JFcnJvcjI9dHJ1ZTtfaXRlcmF0b3JFcnJvcjI9ZXJyfWZpbmFsbHl7dHJ5e2lmKCFfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMiYmX2l0ZXJhdG9yMi5yZXR1cm4pe19pdGVyYXRvcjIucmV0dXJuKCl9fWZpbmFsbHl7aWYoX2RpZEl0ZXJhdG9yRXJyb3IyKXt0aHJvdyBfaXRlcmF0b3JFcnJvcjJ9fX12YXIga2luZD1yZXNwb25zZURhdGEuZ29vZD8naW5mbyc6J2Vycm9yJzt2YXIgc3RhdG09cmVzcG9uc2VEYXRhLmdvb2Q/J2RhdGEgZmV0Y2hlZCc6J3NlcnZlciBlcnJvcic7bm90aWZpY2F0aW9uLm5vdGlmeSh7a2luZDpraW5kLHRleHQ6YnJhbmNoKycgJytzdGF0bSsnLicsYnVzeTotMX0pO3RyeXtpZihjYWxsYmFjaz09bnVsbCl7Y29tcG9uZW50LnNldFN0YXRlKF9kZWZpbmVQcm9wZXJ0eSh7fSxicmFuY2gscmVzcG9uc2VEYXRhLmRhdGEpKX1lbHNle2NhbGxiYWNrKHJlc3BvbnNlRGF0YS5kYXRhKX1ub3RpZmljYXRpb24ubm90aWZ5KHtraW5kOidpbmZvJyx0ZXh0OmJyYW5jaCsnIHByb2Nlc3NlZC4nLGJ1c3k6MH0pfWNhdGNoKGVycm9yKXtub3RpZmljYXRpb24ubm90aWZ5KHtraW5kOidlcnJvcicsdGV4dDpicmFuY2grJyBwcm9jZXNzaW5nIGVycm9yLicsYnVzeTowLGNhdXNlOmVycm9yfSl9fSkuY2F0Y2goZnVuY3Rpb24oZXJyb3Ipe25vdGlmaWNhdGlvbi5ub3RpZnkoe2tpbmQ6J2Vycm9yJyx0ZXh0OmJyYW5jaCsnIHRyYW5zbWlzc2lvbiBlcnJvci4nLGJ1c3k6LTEsY2F1c2U6ZXJyb3J9KX0pfTtmb3IodmFyIF9pdGVyYXRvcj1zb3VyY2VzW1N5bWJvbC5pdGVyYXRvcl0oKSxfc3RlcDshKF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb249KF9zdGVwPV9pdGVyYXRvci5uZXh0KCkpLmRvbmUpO19pdGVyYXRvck5vcm1hbENvbXBsZXRpb249dHJ1ZSl7X2xvb3AoKX19Y2F0Y2goZXJyKXtfZGlkSXRlcmF0b3JFcnJvcj10cnVlO19pdGVyYXRvckVycm9yPWVycn1maW5hbGx5e3RyeXtpZighX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbiYmX2l0ZXJhdG9yLnJldHVybil7X2l0ZXJhdG9yLnJldHVybigpfX1maW5hbGx5e2lmKF9kaWRJdGVyYXRvckVycm9yKXt0aHJvdyBfaXRlcmF0b3JFcnJvcn19fX0iLCJcInVzZSBzdHJpY3RcIjtPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cyxcIl9fZXNNb2R1bGVcIix7dmFsdWU6dHJ1ZX0pO3ZhciBjb3VudHJ5Qm9yZGVycz1leHBvcnRzLmNvdW50cnlCb3JkZXJzPXtcImZlYXR1cmVzXCI6W3tcImdlb21ldHJ5XCI6e1wiY29vcmRpbmF0ZXNcIjpbXSxcInR5cGVcIjpcIlBvbHlnb25cIn0sXCJ0eXBlXCI6XCJGZWF0dXJlXCIsXCJwcm9wZXJ0aWVzXCI6e1wiaXNvMlwiOlwiQURcIixcImxuZ1wiOjEuNSxcImxhdFwiOjQyLjV9fSx7XCJnZW9tZXRyeVwiOntcImNvb3JkaW5hdGVzXCI6W1tbMTkuNCw0MV0sWzE5LjUsNDEuM10sWzE5LjUsNDEuNl0sWzE5LjYsNDEuN10sWzE5LjUsNDEuOF0sWzE5LjQsNDEuOV0sWzE5LjMsNDEuOV0sWzE5LjQsNDIuMV0sWzE5LjUsNDIuNF0sWzE5LjYsNDIuNl0sWzE5LjcsNDIuN10sWzE5LjcsNDIuNV0sWzE5LjksNDIuNV0sWzIwLjEsNDIuNl0sWzIwLjIsNDIuNV0sWzIwLjIsNDIuM10sWzIwLjQsNDIuM10sWzIwLjUsNDIuMl0sWzIwLjYsNDEuOV0sWzIwLjUsNDEuN10sWzIwLjUsNDEuNV0sWzIwLjUsNDEuNF0sWzIwLjUsNDEuMl0sWzIwLjYsNDEuMV0sWzIwLjcsNDAuOV0sWzIwLjksNDAuOV0sWzIxLDQwLjhdLFsyMS4xLDQwLjddLFsyMSw0MC42XSxbMjAuOSw0MC41XSxbMjAuOCw0MC40XSxbMjAuNyw0MC4zXSxbMjAuNyw0MC4xXSxbMjAuNSw0MC4xXSxbMjAuMyw0MF0sWzIwLjQsMzkuOV0sWzIwLjMsMzkuOF0sWzIwLjIsMzkuNl0sWzIwLjEsMzkuN10sWzIwLDM5LjhdLFsxOS45LDM5LjldLFsxOS44LDQwLjFdLFsxOS42LDQwLjFdLFsxOS40LDQwLjJdLFsxOS4zLDQwLjRdLFsxOS41LDQwLjNdLFsxOS41LDQwLjZdLFsxOS4zLDQwLjZdLFsxOS40LDQwLjddLFsxOS40LDQwLjldLFsxOS41LDQxXSxbMTkuNCw0MV1dXSxcInR5cGVcIjpcIlBvbHlnb25cIn0sXCJ0eXBlXCI6XCJGZWF0dXJlXCIsXCJwcm9wZXJ0aWVzXCI6e1wiaXNvMlwiOlwiQUxcIixcImxuZ1wiOjIwLFwibGF0XCI6NDF9fSx7XCJnZW9tZXRyeVwiOntcImNvb3JkaW5hdGVzXCI6W1tbWzQ1LjIsNDEuMl0sWzQ1LjEsNDEuMV0sWzQ1LjQsNDFdLFs0NS42LDQwLjhdLFs0NS41LDQwLjddLFs0NS40LDQwLjZdLFs0NS42LDQwLjRdLFs0NS45LDQwLjNdLFs0Niw0MC4yXSxbNDUuOSw0MF0sWzQ1LjcsNDBdLFs0NS44LDM5LjldLFs0NS45LDM5LjhdLFs0NiwzOS43XSxbNDYuMiwzOS42XSxbNDYuNCwzOS42XSxbNDYuNSwzOS41XSxbNDYuNCwzOS40XSxbNDYuNiwzOS4yXSxbNDYuNCwzOS4yXSxbNDYuNSwzOV0sWzQ2LjQsMzguOV0sWzQ2LjIsMzguOV0sWzQ2LjEsMzguOV0sWzQ2LDM5LjNdLFs0NS44LDM5LjRdLFs0NS44LDM5LjZdLFs0NS42LDM5LjZdLFs0NS41LDM5LjVdLFs0NS4zLDM5LjZdLFs0NSwzOS44XSxbNDQuOSwzOS43XSxbNDQuNywzOS43XSxbNDQuNiwzOS45XSxbNDQuNSw0MF0sWzQ0LjMsNDBdLFs0NCw0MF0sWzQzLjcsNDAuMV0sWzQzLjcsNDAuMl0sWzQzLjYsNDAuNF0sWzQzLjcsNDAuNV0sWzQzLjcsNDAuN10sWzQzLjcsNDAuOF0sWzQzLjYsNDFdLFs0My41LDQxLjFdLFs0My43LDQxLjFdLFs0My44LDQxLjJdLFs0NCw0MS4yXSxbNDQuMiw0MS4yXSxbNDQuNCw0MS4yXSxbNDQuNiw0MS4yXSxbNDQuOCw0MS4yXSxbNDUsNDEuM10sWzQ1LjEsNDEuMl0sWzQ1LjIsNDEuMl1dXSxbXV0sXCJ0eXBlXCI6XCJNdWx0aVBvbHlnb25cIn0sXCJ0eXBlXCI6XCJGZWF0dXJlXCIsXCJwcm9wZXJ0aWVzXCI6e1wiaXNvMlwiOlwiQU1cIixcImxuZ1wiOjQ1LFwibGF0XCI6NDB9fSx7XCJnZW9tZXRyeVwiOntcImNvb3JkaW5hdGVzXCI6W1tbMTMuOCw0OC44XSxbMTQuMiw0OC42XSxbMTQuNiw0OC42XSxbMTQuOSw0OC44XSxbMTUuMSw0OV0sWzE1LjUsNDldLFsxNS44LDQ4LjldLFsxNi40LDQ4LjddLFsxNi43LDQ4LjhdLFsxNi45LDQ4LjZdLFsxNi45LDQ4LjNdLFsxNy4xLDQ4LjFdLFsxNy4xLDQ3LjhdLFsxNi44LDQ3LjddLFsxNi40LDQ3LjddLFsxNi43LDQ3LjVdLFsxNi40LDQ3LjJdLFsxNi4zLDQ3XSxbMTUuOCw0Ni43XSxbMTUuMSw0Ni42XSxbMTQuOCw0Ni41XSxbMTMuOSw0Ni41XSxbMTMuNiw0Ni42XSxbMTIuOCw0Ni43XSxbMTIuNSw0Ni43XSxbMTIuMSw0N10sWzExLjgsNDddLFsxMS4yLDQ3XSxbMTAuOSw0Ni44XSxbMTAuNiw0Ni44XSxbMTAuMyw0Ni45XSxbOS45LDQ2LjldLFs5LjYsNDcuMl0sWzkuNyw0Ny41XSxbMTAsNDcuNV0sWzEwLjQsNDcuNF0sWzEwLjQsNDcuNl0sWzEwLjksNDcuNV0sWzExLjUsNDcuNV0sWzEyLDQ3LjZdLFsxMi41LDQ3LjddLFsxMi43LDQ3LjddLFsxMy4xLDQ3LjZdLFsxMi45LDQ3LjhdLFsxMi44LDQ4XSxbMTMuMiw0OC4zXSxbMTMuNCw0OC41XSxbMTMuNyw0OC42XSxbMTMuOCw0OC44XV1dLFwidHlwZVwiOlwiUG9seWdvblwifSxcInR5cGVcIjpcIkZlYXR1cmVcIixcInByb3BlcnRpZXNcIjp7XCJpc28yXCI6XCJBVFwiLFwibG5nXCI6MTMuMyxcImxhdFwiOjQ3LjN9fSx7XCJnZW9tZXRyeVwiOntcImNvb3JkaW5hdGVzXCI6W1tbWzQ2LjYsNDEuOV0sWzQ2LjksNDEuN10sWzQ3LjMsNDEuNF0sWzQ3LjcsNDEuMl0sWzQ4LDQxLjRdLFs0OC41LDQxLjhdLFs0OC44LDQxLjddLFs0OS4xLDQxLjNdLFs0OS4yLDQxXSxbNDkuNSw0MC43XSxbNDkuOSw0MC42XSxbNTAuNCw0MC40XSxbNTAuMSw0MC40XSxbNDkuNSw0MC4yXSxbNDkuNCwzOS45XSxbNDkuMywzOS40XSxbNDkuMiwzOS4zXSxbNDkuMSwzOS4xXSxbNDksMzldLFs0OC45LDM4LjVdLFs0OC43LDM4LjRdLFs0OC4zLDM4LjZdLFs0OC4xLDM4LjhdLFs0OC4yLDM5XSxbNDguMSwzOS4yXSxbNDguMywzOS40XSxbNDguMiwzOS42XSxbNDcuOCwzOS43XSxbNDcuMywzOS40XSxbNDYuOSwzOS4yXSxbNDYuNywzOV0sWzQ2LjUsMzkuMV0sWzQ2LjYsMzkuM10sWzQ2LjUsMzkuNl0sWzQ2LjEsMzkuN10sWzQ1LjgsMzkuOF0sWzQ1LjYsNDBdLFs0Niw0MC4zXSxbNDUuNSw0MC41XSxbNDUuNSw0MC44XSxbNDUuMyw0MV0sWzQ1LjEsNDEuMl0sWzQ1LjEsNDEuNF0sWzQ1LjQsNDEuNV0sWzQ1LjksNDEuMl0sWzQ2LjMsNDEuMl0sWzQ2LjUsNDFdLFs0Ni43LDQxLjNdLFs0Ni4yLDQxLjZdLFs0Ni40LDQxLjhdLFs0Ni42LDQxLjldXV0sW1tbNDUuMSwzOS44XSxbNDUuMywzOS42XSxbNDUuMywzOS41XSxbNDUuNSwzOS41XSxbNDUuNiwzOS41XSxbNDUuNiwzOS42XSxbNDUuNywzOS42XSxbNDUuOCwzOS42XSxbNDUuOCwzOS41XSxbNDUuOCwzOS40XSxbNDUuOSwzOS4zXSxbNDYsMzkuM10sWzQ2LDM5LjJdLFs0Ni4xLDM4LjldLFs0Ni4yLDM4LjhdLFs0NiwzOC45XSxbNDUuOCwzOC45XSxbNDUuNiwzOV0sWzQ1LjUsMzldLFs0NS40LDM5XSxbNDUuNCwzOS4xXSxbNDUuMywzOS4yXSxbNDUuMiwzOS4yXSxbNDUuMSwzOS4yXSxbNDUuMSwzOS4zXSxbNDUuMSwzOS40XSxbNDUsMzkuNF0sWzQ0LjksMzkuNV0sWzQ0LjksMzkuNl0sWzQ0LjgsMzkuNl0sWzQ0LjgsMzkuN10sWzQ0LjksMzkuN10sWzQ1LDM5LjddLFs0NSwzOS44XSxbNDUuMSwzOS44XV1dLFtdLFtdXSxcInR5cGVcIjpcIk11bHRpUG9seWdvblwifSxcInR5cGVcIjpcIkZlYXR1cmVcIixcInByb3BlcnRpZXNcIjp7XCJpc28yXCI6XCJBWlwiLFwibG5nXCI6NDcuNSxcImxhdFwiOjQwLjV9fSx7XCJnZW9tZXRyeVwiOntcImNvb3JkaW5hdGVzXCI6W1tbMTcuNiw0Mi45XSxbMTcuNCw0My4yXSxbMTcuMyw0My41XSxbMTcsNDMuNV0sWzE2LjgsNDMuN10sWzE2LjYsNDMuOV0sWzE2LjQsNDQuMV0sWzE2LjIsNDQuMl0sWzE2LjIsNDQuNF0sWzE2LDQ0LjddLFsxNS43LDQ0LjhdLFsxNS44LDQ1LjJdLFsxNi4xLDQ1LjFdLFsxNi40LDQ1XSxbMTYuNiw0NS4yXSxbMTYuOSw0NS4zXSxbMTcuMiw0NS4xXSxbMTcuNSw0NS4xXSxbMTcuOCw0NS4xXSxbMTguMSw0NS4xXSxbMTguNCw0NS4xXSxbMTguOCw0NC45XSxbMTkuMSw0NC45XSxbMTkuNCw0NC45XSxbMTkuMiw0NC42XSxbMTkuMSw0NC4zXSxbMTkuNSw0NC4xXSxbMTkuNSw0NF0sWzE5LjIsNDRdLFsxOS41LDQzLjhdLFsxOS40LDQzLjZdLFsxOSw0My42XSxbMTksNDMuNF0sWzE5LDQzLjJdLFsxOC44LDQzLjNdLFsxOC43LDQzLjFdLFsxOC41LDQzXSxbMTguNiw0Mi43XSxbMTguNCw0Mi42XSxbMTguMiw0Mi43XSxbMTcuOCw0Mi45XSxbMTcuNiw0Mi45XV1dLFwidHlwZVwiOlwiUG9seWdvblwifSxcInR5cGVcIjpcIkZlYXR1cmVcIixcInByb3BlcnRpZXNcIjp7XCJpc28yXCI6XCJCQVwiLFwibG5nXCI6MTgsXCJsYXRcIjo0NH19LHtcImdlb21ldHJ5XCI6e1wiY29vcmRpbmF0ZXNcIjpbW1s0LjMsNTEuM10sWzQuNCw1MS40XSxbNC41LDUxLjVdLFs0LjUsNTEuNF0sWzQuNyw1MS40XSxbNC44LDUxLjVdLFs0LjksNTEuNF0sWzUsNTEuNV0sWzUuMSw1MS40XSxbNS4yLDUxLjNdLFs1LjQsNTEuM10sWzUuNiw1MS4zXSxbNS44LDUxLjJdLFs1LjksNTEuMV0sWzUuOCw1MV0sWzUuNiw1MC45XSxbNS43LDUwLjhdLFs1LjksNTAuOF0sWzYuMSw1MC43XSxbNi4zLDUwLjZdLFs2LjMsNTAuNV0sWzYuNCw1MC4zXSxbNi4yLDUwLjJdLFs2LjEsNTAuMV0sWzUuOSw1MC4xXSxbNS43LDQ5LjldLFs1LjgsNDkuOF0sWzUuOSw0OS42XSxbNS44LDQ5LjVdLFs1LjYsNDkuNV0sWzUuNCw0OS42XSxbNSw0OS44XSxbNC44LDUwXSxbNC45LDUwLjFdLFs0LjgsNTAuMl0sWzQuNyw1MF0sWzQuNCw0OS45XSxbNC4yLDUwXSxbNC4yLDUwLjFdLFs0LjIsNTAuM10sWzQsNTAuM10sWzMuOCw1MC40XSxbMy43LDUwLjVdLFszLjUsNTAuNV0sWzMuMyw1MC41XSxbMy4yLDUwLjhdLFszLDUwLjhdLFsyLjgsNTAuOF0sWzIuNiw1MC45XSxbMi41LDUxLjFdLFsyLjksNTEuMl0sWzMsNTEuM10sWzMuMiw1MS4zXSxbMy40LDUxLjNdLFszLjUsNTEuMl0sWzMuNiw1MS4zXSxbMy44LDUxLjNdLFszLjksNTEuMl0sWzQuMSw1MS4zXSxbNC4yLDUxLjRdLFs0LjMsNTEuM11dXSxcInR5cGVcIjpcIlBvbHlnb25cIn0sXCJ0eXBlXCI6XCJGZWF0dXJlXCIsXCJwcm9wZXJ0aWVzXCI6e1wiaXNvMlwiOlwiQkVcIixcImxuZ1wiOjQsXCJsYXRcIjo1MC44fX0se1wiZ2VvbWV0cnlcIjp7XCJjb29yZGluYXRlc1wiOltbWzI3LjksNDIuOF0sWzI3LjYsNDIuNl0sWzI3LjUsNDIuNF0sWzI3LjgsNDIuMl0sWzI4LDQyXSxbMjcuNiw0Ml0sWzI3LjMsNDIuMV0sWzI3LDQyXSxbMjYuNSw0MS44XSxbMjYuNCw0MS43XSxbMjYuMiw0MS41XSxbMjUuOSw0MS4zXSxbMjUuNSw0MS4zXSxbMjUuMSw0MS40XSxbMjQuNiw0MS40XSxbMjQuMyw0MS42XSxbMjQuMSw0MS41XSxbMjMuNyw0MS40XSxbMjMuMyw0MS40XSxbMjMsNDEuM10sWzIzLDQxLjZdLFsyMi45LDQxLjldLFsyMi41LDQyLjFdLFsyMi42LDQyLjVdLFsyMi40LDQyLjhdLFsyMyw0My4xXSxbMjIuOCw0My40XSxbMjIuNSw0My41XSxbMjIuNSw0NC4xXSxbMjIuOSw0NC4xXSxbMjIuOCw0My45XSxbMjMuMSw0My44XSxbMjMuNCw0My45XSxbMjQsNDMuN10sWzI0LjQsNDMuN10sWzI0LjYsNDMuN10sWzI1LDQzLjddLFsyNS40LDQzLjZdLFsyNS44LDQzLjddLFsyNi4xLDQ0XSxbMjYuNyw0NC4xXSxbMjcuMSw0NC4xXSxbMjcuNSw0NF0sWzI3LjksNDRdLFsyOC4xLDQzLjhdLFsyOC41LDQzLjddLFsyOC42LDQzLjRdLFsyOC4yLDQzLjRdLFsyNy45LDQzLjJdLFsyNy45LDQyLjhdXV0sXCJ0eXBlXCI6XCJQb2x5Z29uXCJ9LFwidHlwZVwiOlwiRmVhdHVyZVwiLFwicHJvcGVydGllc1wiOntcImlzbzJcIjpcIkJHXCIsXCJsbmdcIjoyNSxcImxhdFwiOjQzfX0se1wiZ2VvbWV0cnlcIjp7XCJjb29yZGluYXRlc1wiOltbWzI2LjYsNTUuN10sWzI3LDU1LjhdLFsyNy42LDU1LjhdLFsyNy45LDU2LjFdLFsyOC4zLDU2XSxbMjguNyw1Nl0sWzI5LjEsNTZdLFsyOS40LDU1LjhdLFszMCw1NS45XSxbMzAuOCw1NS42XSxbMzAuOSw1NS4yXSxbMzAuOSw1NC45XSxbMzEuMSw1NC42XSxbMzEuMyw1NC4yXSxbMzEuOSw1NF0sWzMyLjEsNTMuOF0sWzMyLjUsNTMuNl0sWzMyLjUsNTMuMl0sWzMyLDUzLjFdLFszMS40LDUzLjJdLFszMS41LDUyLjldLFszMS42LDUyLjVdLFszMS44LDUyLjFdLFszMS4zLDUyLjFdLFszMSw1Ml0sWzMwLjYsNTEuNl0sWzMwLjQsNTEuNF0sWzI5LjksNTEuNV0sWzI5LjQsNTEuNF0sWzI5LjEsNTEuNl0sWzI4LjcsNTEuNV0sWzI4LjMsNTEuNl0sWzI4LDUxLjZdLFsyNy43LDUxLjZdLFsyNy4yLDUxLjddLFsyNi45LDUxLjhdLFsyNi40LDUxLjhdLFsyNiw1MS45XSxbMjUuNCw1MS45XSxbMjUsNTEuOV0sWzI0LjMsNTEuN10sWzIzLjcsNTEuN10sWzIzLjUsNTEuN10sWzIzLjcsNTJdLFsyMy4yLDUyLjNdLFsyMy43LDUyLjZdLFsyMy45LDUzXSxbMjMuNiw1My43XSxbMjMuOCw1My45XSxbMjQuMiw1NF0sWzI0LjUsNTRdLFsyNC45LDU0LjFdLFsyNS4zLDU0LjNdLFsyNS41LDU0LjJdLFsyNS44LDU0LjNdLFsyNS43LDU0LjZdLFsyNS45LDU0LjldLFsyNi4zLDU1LjFdLFsyNi42LDU1LjNdLFsyNi42LDU1LjddXV0sXCJ0eXBlXCI6XCJQb2x5Z29uXCJ9LFwidHlwZVwiOlwiRmVhdHVyZVwiLFwicHJvcGVydGllc1wiOntcImlzbzJcIjpcIkJZXCIsXCJsbmdcIjoyOCxcImxhdFwiOjUzfX0se1wiZ2VvbWV0cnlcIjp7XCJjb29yZGluYXRlc1wiOltbWzcuNyw0Ny41XSxbOCw0Ny42XSxbOC4zLDQ3LjZdLFs4LjYsNDcuNl0sWzguNCw0Ny43XSxbOC43LDQ3LjhdLFs4LjksNDcuN10sWzkuMyw0Ny43XSxbOS43LDQ3LjVdLFs5LjUsNDcuM10sWzkuNiw0Ny4xXSxbOS45LDQ2LjldLFsxMC4yLDQ2LjldLFsxMC40LDQ3XSxbMTAuNSw0Ni42XSxbMTAuMyw0Ni41XSxbMTAuMSw0Ni42XSxbMTAsNDYuNF0sWzEwLjIsNDYuM10sWzkuOSw0Ni40XSxbOS43LDQ2LjNdLFs5LjUsNDYuNF0sWzkuMyw0Ni41XSxbOS4zLDQ2LjNdLFs5LjEsNDYuMV0sWzksNDUuOV0sWzguOSw0NS45XSxbOC44LDQ2LjFdLFs4LjYsNDYuMV0sWzguNCw0Ni4zXSxbOC41LDQ2LjVdLFs4LjMsNDYuNF0sWzguMSw0Ni4xXSxbNy45LDQ1LjldLFs3LjcsNDZdLFs3LjUsNDUuOV0sWzcuMiw0NS45XSxbNyw0Nl0sWzYuOCw0Ni4yXSxbNi43LDQ2LjVdLFs2LjMsNDYuNF0sWzYuMyw0Ni4zXSxbNiw0Ni4xXSxbNi4xLDQ2LjJdLFs2LjEsNDYuNl0sWzYuNCw0Ni44XSxbNi41LDQ3XSxbNi43LDQ3LjFdLFs3LDQ3LjNdLFs3LDQ3LjVdLFs3LjMsNDcuNF0sWzcuNSw0Ny41XSxbNy43LDQ3LjZdLFs3LjcsNDcuNV1dXSxcInR5cGVcIjpcIlBvbHlnb25cIn0sXCJ0eXBlXCI6XCJGZWF0dXJlXCIsXCJwcm9wZXJ0aWVzXCI6e1wiaXNvMlwiOlwiQ0hcIixcImxuZ1wiOjgsXCJsYXRcIjo0N319LHtcImdlb21ldHJ5XCI6e1wiY29vcmRpbmF0ZXNcIjpbW1szMy43LDM1LjRdLFszMy45LDM1LjRdLFszNC4zLDM1LjZdLFszNC41LDM1LjddLFszNC42LDM1LjZdLFszNC4zLDM1LjVdLFszNC4xLDM1LjRdLFszMy45LDM1LjNdLFszNCwzNS4xXSxbMzQuMSwzNV0sWzMzLjksMzQuOV0sWzMzLjgsMzVdLFszMy42LDM0LjldLFszMy41LDM0LjhdLFszMy4zLDM0LjddLFszMy4xLDM0LjddLFszMywzNC42XSxbMzIuOSwzNC43XSxbMzIuOCwzNC42XSxbMzIuNywzNC43XSxbMzIuNSwzNC43XSxbMzIuNCwzNC44XSxbMzIuMywzNV0sWzMyLjQsMzVdLFszMi41LDM1LjFdLFszMi42LDM1LjJdLFszMi44LDM1LjJdLFszMi45LDM1LjJdLFszMi45LDM1LjRdLFszMy4zLDM1LjNdLFszMy41LDM1LjNdLFszMy43LDM1LjRdXV0sXCJ0eXBlXCI6XCJQb2x5Z29uXCJ9LFwidHlwZVwiOlwiRmVhdHVyZVwiLFwicHJvcGVydGllc1wiOntcImlzbzJcIjpcIkNZXCIsXCJsbmdcIjozMyxcImxhdFwiOjM1fX0se1wiZ2VvbWV0cnlcIjp7XCJjb29yZGluYXRlc1wiOltbWzE0LjcsNDguNl0sWzE0LjQsNDguNl0sWzE0LjEsNDguN10sWzEzLjgsNDguOF0sWzEzLjYsNDguOV0sWzEzLjQsNDldLFsxMy4yLDQ5LjJdLFsxMi44LDQ5LjNdLFsxMi42LDQ5LjZdLFsxMi41LDQ5LjldLFsxMi4zLDUwXSxbMTIuMiw1MC4yXSxbMTIuMyw1MC4yXSxbMTIuNiw1MC40XSxbMTIuOCw1MC41XSxbMTMuMSw1MC41XSxbMTMuMyw1MC42XSxbMTMuNSw1MC43XSxbMTMuOSw1MC44XSxbMTQuMyw1MC45XSxbMTQuMyw1MS4xXSxbMTQuNiw1MC45XSxbMTQuOCw1MC45XSxbMTUuMiw1MV0sWzE1LjQsNTAuOF0sWzE1LjgsNTAuN10sWzE2LjEsNTAuNl0sWzE2LjMsNTAuN10sWzE2LjMsNTAuNV0sWzE2LjQsNTAuNF0sWzE2LjUsNTAuMl0sWzE2LjcsNTAuMV0sWzE2LjksNTAuMl0sWzE2LjksNTAuM10sWzE3LjIsNTAuNF0sWzE3LjQsNTAuM10sWzE3LjgsNTAuM10sWzE3LjYsNTAuMl0sWzE3LjgsNTBdLFsxOC4xLDUwLjFdLFsxOC40LDQ5LjldLFsxOC42LDQ5LjhdLFsxOC44LDQ5LjZdLFsxOC43LDQ5LjVdLFsxOC40LDQ5LjNdLFsxOC4yLDQ5LjJdLFsxOC4xLDQ5XSxbMTcuNyw0OC45XSxbMTcuNCw0OC44XSxbMTcuMSw0OC44XSxbMTYuOSw0OC42XSxbMTYuNyw0OC43XSxbMTYuNSw0OC44XSxbMTYuMyw0OC43XSxbMTUuOCw0OC45XSxbMTUuNSw0OC45XSxbMTUuMyw0OV0sWzE1LDQ5XSxbMTQuOSw0OC44XSxbMTQuNyw0OC42XV1dLFwidHlwZVwiOlwiUG9seWdvblwifSxcInR5cGVcIjpcIkZlYXR1cmVcIixcInByb3BlcnRpZXNcIjp7XCJpc28yXCI6XCJDWlwiLFwibG5nXCI6MTUuNSxcImxhdFwiOjQ5Ljh9fSx7XCJnZW9tZXRyeVwiOntcImNvb3JkaW5hdGVzXCI6W1tbWzExLDU0LjRdLFsxMC44LDUzLjldLFsxMS42LDU0XSxbMTIuNCw1NC40XSxbMTIuNSw1NC4yXSxbMTMuNyw1NC4yXSxbMTQuMyw1My43XSxbMTQuMiw1Mi44XSxbMTQuNSw1Mi40XSxbMTQuNyw1MS43XSxbMTUsNTEuNF0sWzE0LjYsNTAuOV0sWzE0LDUwLjhdLFsxMy4yLDUwLjZdLFsxMi42LDUwLjRdLFsxMi4zLDUwLjFdLFsxMi42LDQ5LjVdLFsxMy40LDQ5XSxbMTMuOCw0OC42XSxbMTMuNCw0OC40XSxbMTMsNDcuOV0sWzEzLDQ3LjVdLFsxMi4yLDQ3LjZdLFsxMS4xLDQ3LjRdLFsxMC41LDQ3LjVdLFs5LjcsNDcuNl0sWzguOCw0Ny43XSxbOC42LDQ3LjddLFs3LjgsNDcuNl0sWzcuNiw0OC4xXSxbOC4xLDQ4LjhdLFs3LjYsNDkuMV0sWzYuOSw0OS4yXSxbNi41LDQ5LjddLFs2LjEsNTAuMV0sWzYuMyw1MC42XSxbNS45LDUxXSxbNi4yLDUxLjZdLFs2LjYsNTEuOV0sWzYuOSw1Mi4yXSxbNi45LDUyLjRdLFs3LDUyLjZdLFs3LjIsNTMuM10sWzcuMiw1My42XSxbOCw1My43XSxbOC4zLDUzLjRdLFs4LjUsNTMuN10sWzkuMiw1My45XSxbOS44LDUzLjVdLFs4LjksNTQuMV0sWzguNyw1NC40XSxbOC43LDU0LjhdLFs4LjQsNTVdLFs5LjMsNTQuOF0sWzEwLDU0LjZdLFsxMC43LDU0LjNdLFsxMSw1NC40XV1dLFtbWzEzLjQsNTQuNl0sWzEzLjUsNTQuNl0sWzEzLjYsNTQuNl0sWzEzLjcsNTQuNl0sWzEzLjcsNTQuNV0sWzEzLjYsNTQuNV0sWzEzLjYsNTQuNF0sWzEzLjcsNTQuNF0sWzEzLjcsNTQuM10sWzEzLjUsNTQuM10sWzEzLjQsNTQuM10sWzEzLjQsNTQuMl0sWzEzLjMsNTQuMl0sWzEzLjMsNTQuM10sWzEzLjIsNTQuM10sWzEzLjEsNTQuM10sWzEzLjEsNTQuNF0sWzEzLjIsNTQuNF0sWzEzLjMsNTQuNF0sWzEzLjIsNTQuNV0sWzEzLjEsNTQuNV0sWzEzLjIsNTQuNl0sWzEzLjMsNTQuNl0sWzEzLjQsNTQuNV0sWzEzLjUsNTQuNV0sWzEzLjIsNTQuN10sWzEzLjMsNTQuN10sWzEzLjQsNTQuN10sWzEzLjQsNTQuNl1dXSxbW1sxNCw1NC4xXSxbMTQuMSw1NF0sWzE0LjIsNTMuOV0sWzE0LjEsNTMuOV0sWzE0LDUzLjldLFsxNCw1My44XSxbMTMuOSw1My44XSxbMTMuOCw1My45XSxbMTMuOSw1My45XSxbMTQsNTRdLFsxMy45LDU0LjFdLFsxMy45LDU0XSxbMTMuOCw1NF0sWzEzLjgsNTQuMV0sWzEzLjgsNTQuMl0sWzE0LDU0LjFdXV0sW10sW10sW10sW11dLFwidHlwZVwiOlwiTXVsdGlQb2x5Z29uXCJ9LFwidHlwZVwiOlwiRmVhdHVyZVwiLFwicHJvcGVydGllc1wiOntcImlzbzJcIjpcIkRFXCIsXCJsbmdcIjo5LFwibGF0XCI6NTF9fSx7XCJnZW9tZXRyeVwiOntcImNvb3JkaW5hdGVzXCI6W1tbWzEwLjQsNTcuNl0sWzEwLjQsNTcuNV0sWzEwLjUsNTcuNV0sWzEwLjUsNTcuNF0sWzEwLjUsNTcuMl0sWzEwLjQsNTcuMl0sWzEwLjQsNTcuMV0sWzEwLjMsNTddLFsxMC4yLDU3XSxbMTAuMSw1N10sWzEwLDU3LjFdLFs5LjUsNTddLFs5LjMsNTddLFs5LjIsNTddLFs5LjEsNTddLFs5LjEsNTcuMV0sWzksNTddLFs4LjksNTddLFs4LjgsNTddLFs4LjgsNTYuOV0sWzguNyw1N10sWzguNyw1Ni45XSxbOC42LDU2LjldLFs4LjYsNTYuOF0sWzguNSw1Ni44XSxbOC41LDU2LjddLFs4LjQsNTYuN10sWzguNiw1Ni43XSxbOC42LDU2LjZdLFs4LjUsNTYuNl0sWzguMiw1Ni43XSxbOC4yLDU2LjhdLFs4LjMsNTYuOF0sWzguMyw1Ni45XSxbOC40LDU2LjldLFs4LjUsNTddLFs4LjYsNTcuMV0sWzguNyw1Ny4xXSxbOC44LDU3LjFdLFs4LjksNTcuMV0sWzksNTcuMl0sWzkuMiw1Ny4xXSxbOS4zLDU3LjFdLFs5LjQsNTcuMl0sWzkuNSw1Ny4yXSxbOS42LDU3LjJdLFs5LjYsNTcuM10sWzkuNyw1Ny40XSxbOS44LDU3LjRdLFs5LjgsNTcuNV0sWzkuOSw1Ny42XSxbMTAsNTcuNl0sWzEwLjEsNTcuNl0sWzEwLjIsNTcuNl0sWzEwLjMsNTcuNl0sWzEwLjQsNTcuN10sWzEwLjUsNTcuN10sWzEwLjYsNTcuN10sWzEwLjUsNTcuNl0sWzEwLjQsNTcuNl1dXSxbW1sxMCw1Ny4xXSxbMTAuMyw1N10sWzEwLjMsNTYuN10sWzkuOSw1Ni42XSxbMTAuNCw1Ni43XSxbMTAuMiw1Ni42XSxbMTAuNSw1Ni41XSxbMTAuOSw1Ni41XSxbMTAuNyw1Ni4yXSxbMTAuNiw1Ni4xXSxbMTAuNSw1Ni4zXSxbMTAuMiw1Ni4xXSxbMTAuMyw1NS45XSxbMTAuMSw1NS44XSxbOS45LDU1LjhdLFs5LjgsNTUuN10sWzkuOCw1NS42XSxbOS43LDU1LjNdLFs5LjUsNTUuMl0sWzkuNiw1NV0sWzkuOCw1NC45XSxbOS42LDU0LjldLFs5LjQsNTQuOF0sWzkuMiw1NC45XSxbOC43LDU0LjldLFs4LjYsNTUuMV0sWzguNiw1NS4yXSxbOC42LDU1LjRdLFs4LjQsNTUuNV0sWzguMSw1NS41XSxbOC4yLDU1LjhdLFs4LjEsNTZdLFs4LjMsNTUuOV0sWzguMyw1Ni4xXSxbOC4xLDU2LjNdLFs4LjIsNTYuNl0sWzguNCw1Ni42XSxbOC42LDU2LjVdLFs4LjgsNTYuNl0sWzguOSw1Ni44XSxbOS4yLDU2LjddLFs5LDU2LjZdLFs5LjMsNTYuNV0sWzkuMyw1Ni43XSxbOS40LDU3XSxbOS43LDU3XSxbOS45LDU3LjFdLFsxMCw1Ny4xXV1dLFtbWzEyLjYsNTZdLFsxMi42LDU1LjldLFsxMi42LDU1LjddLFsxMi41LDU1LjZdLFsxMi4zLDU1LjZdLFsxMi4yLDU1LjRdLFsxMi40LDU1LjRdLFsxMi41LDU1LjNdLFsxMi4yLDU1LjJdLFsxMiw1NS4xXSxbMTIuMiw1NS4xXSxbMTIuMSw1NV0sWzExLjksNTVdLFsxMS43LDU1LjFdLFsxMS44LDU1LjJdLFsxMS42LDU1LjJdLFsxMS40LDU1LjJdLFsxMS4yLDU1LjJdLFsxMS4yLDU1LjRdLFsxMS4xLDU1LjddLFsxMC45LDU1LjddLFsxMS4zLDU1LjddLFsxMS41LDU1LjldLFsxMS4zLDU2XSxbMTEuNiw1NS45XSxbMTEuNyw1Nl0sWzExLjgsNTUuOV0sWzExLjgsNTUuOF0sWzExLjksNTUuOV0sWzEyLDU1LjhdLFsxMi4xLDU1LjddLFsxMS45LDU1LjddLFsxMS45LDU2XSxbMTIuMyw1Ni4xXSxbMTIuNiw1Nl1dXSxbW1sxMC43LDU1LjVdLFsxMC44LDU1LjRdLFsxMC44LDU1LjNdLFsxMC44LDU1LjJdLFsxMC44LDU1LjFdLFsxMC43LDU1LjFdLFsxMC42LDU1LjFdLFsxMC41LDU1XSxbMTAuMiw1NS4xXSxbMTAuMSw1NS4xXSxbMTAuMSw1NS4yXSxbMTAsNTUuMl0sWzkuOSw1NS4zXSxbOS44LDU1LjRdLFs5LjgsNTUuNV0sWzkuNyw1NS41XSxbOS45LDU1LjVdLFsxMCw1NS41XSxbMTAuMSw1NS42XSxbMTAuMiw1NS42XSxbMTAuMyw1NS42XSxbMTAuNCw1NS42XSxbMTAuNSw1NS41XSxbMTAuNCw1NS41XSxbMTAuNCw1NS40XSxbMTAuNSw1NS40XSxbMTAuNiw1NS41XSxbMTAuNiw1NS42XSxbMTAuNyw1NS42XSxbMTAuNyw1NS41XV1dLFtbWzExLjUsNTQuOF0sWzExLjYsNTQuOF0sWzExLjYsNTQuOV0sWzExLjcsNTQuOV0sWzExLjgsNTQuOF0sWzExLjksNTQuN10sWzExLjgsNTQuN10sWzExLjgsNTQuNl0sWzExLjcsNTQuNl0sWzExLjcsNTQuN10sWzExLjYsNTQuN10sWzExLjUsNTQuNl0sWzExLjQsNTQuNl0sWzExLjQsNTQuN10sWzExLjMsNTQuN10sWzExLjIsNTQuN10sWzExLjEsNTQuN10sWzExLDU0LjhdLFsxMSw1NC45XSxbMTEuMSw1NC45XSxbMTEuMSw1NV0sWzExLjIsNTVdLFsxMS4zLDU0LjldLFsxMS40LDU0LjldLFsxMS41LDU0LjhdXV0sW1tbMTIsNTQuOV0sWzEyLjEsNTQuOV0sWzEyLjIsNTQuOF0sWzEyLjEsNTQuOF0sWzEyLDU0LjddLFsxMiw1NC42XSxbMTEuOSw1NC42XSxbMTEuOSw1NC43XSxbMTEuOSw1NC44XSxbMTEuOCw1NC44XSxbMTEuOCw1NC45XSxbMTEuNyw1NC45XSxbMTEuNyw1NV0sWzExLjgsNTVdLFsxMS45LDU1XSxbMTEuOSw1NC45XSxbMTIsNTQuOV1dXSxbXV0sXCJ0eXBlXCI6XCJNdWx0aVBvbHlnb25cIn0sXCJ0eXBlXCI6XCJGZWF0dXJlXCIsXCJwcm9wZXJ0aWVzXCI6e1wiaXNvMlwiOlwiREtcIixcImxuZ1wiOjEwLFwibGF0XCI6NTZ9fSx7XCJnZW9tZXRyeVwiOntcImNvb3JkaW5hdGVzXCI6W1tbWzI1LjgsNTkuNl0sWzI2LjEsNTkuNl0sWzI2LjUsNTkuNV0sWzI2LjcsNTkuNl0sWzI2LjksNTkuNV0sWzI3LjIsNTkuNF0sWzI3LjYsNTkuNF0sWzI4LDU5LjRdLFsyOC4xLDU5LjRdLFsyOC4xLDU5LjNdLFsyNy45LDU5LjJdLFsyNy43LDU5XSxbMjcuNCw1OC44XSxbMjcuNSw1OC41XSxbMjcuNSw1OC4yXSxbMjcuNyw1OC4xXSxbMjcuOCw1Ny44XSxbMjcuNSw1Ny44XSxbMjcuNCw1Ny42XSxbMjcuMSw1Ny42XSxbMjYuNyw1Ny42XSxbMjYuNSw1Ny41XSxbMjYsNTcuOF0sWzI1LjYsNTcuOV0sWzI1LjMsNTguMV0sWzI1LjIsNTguMV0sWzI1LDU4XSxbMjQuNSw1OF0sWzI0LjMsNTcuOV0sWzI0LjUsNTguMl0sWzI0LjUsNTguNF0sWzI0LjMsNTguM10sWzI0LjEsNTguM10sWzIzLjgsNTguNF0sWzIzLjYsNTguNV0sWzIzLjYsNTguN10sWzIzLjgsNTguOF0sWzIzLjQsNTguOV0sWzIzLjYsNTldLFsyMy40LDU5LjFdLFsyMy42LDU5LjJdLFsyMy44LDU5LjNdLFsyNCw1OS40XSxbMjQuMyw1OS40XSxbMjQuNSw1OS41XSxbMjQuOCw1OS42XSxbMjUuMiw1OS41XSxbMjUuNSw1OS42XSxbMjUuNyw1OS42XSxbMjUuOCw1OS42XV1dLFtbWzIzLDU4LjZdLFsyMy4xLDU4LjZdLFsyMy4zLDU4LjVdLFsyMy4zLDU4LjRdLFsyMy4yLDU4LjRdLFsyMy4xLDU4LjRdLFsyMyw1OC40XSxbMjIuOCw1OC4yXSxbMjIuNiw1OC4yXSxbMjIuNSw1OC4yXSxbMjIuNCw1OC4yXSxbMjIuMyw1OC4yXSxbMjIuMyw1OC4xXSxbMjIuMiw1OF0sWzIyLjEsNTcuOV0sWzIyLDU3LjldLFsyMiw1OF0sWzIyLjEsNTguMV0sWzIyLjIsNTguMV0sWzIyLjIsNTguMl0sWzIyLjEsNTguMl0sWzIxLjksNTguM10sWzIxLjgsNTguM10sWzIyLDU4LjNdLFsyMiw1OC40XSxbMjEuOSw1OC41XSxbMjEuOCw1OC41XSxbMjIsNTguNV0sWzIyLjEsNTguNV0sWzIyLjIsNTguNV0sWzIyLjMsNTguNl0sWzIyLjUsNTguNl0sWzIyLjYsNTguNl0sWzIyLjgsNTguNl0sWzIyLjksNTguNl0sWzIzLDU4LjZdXV0sW1tbMjIuNyw1OV0sWzIyLjgsNTldLFsyMi45LDU5XSxbMjMsNTldLFsyMyw1OC45XSxbMjMsNTguOF0sWzIyLjksNTguOF0sWzIyLjgsNTguOF0sWzIyLjcsNTguOF0sWzIyLjcsNTguN10sWzIyLjYsNTguN10sWzIyLjUsNTguN10sWzIyLjUsNTguOF0sWzIyLjQsNTguOF0sWzIyLjQsNTguOV0sWzIyLjMsNTguOV0sWzIyLjIsNTguOV0sWzIyLjEsNTguOV0sWzIyLDU4LjldLFsyMi4xLDU5XSxbMjIuNCw1OV0sWzIyLjUsNTldLFsyMi42LDU5LjFdLFsyMi43LDU5LjFdLFsyMi43LDU5XV1dLFtdLFtdLFtdXSxcInR5cGVcIjpcIk11bHRpUG9seWdvblwifSxcInR5cGVcIjpcIkZlYXR1cmVcIixcInByb3BlcnRpZXNcIjp7XCJpc28yXCI6XCJFRVwiLFwibG5nXCI6MjYsXCJsYXRcIjo1OX19LHtcImdlb21ldHJ5XCI6e1wiY29vcmRpbmF0ZXNcIjpbW1tbLTcuOSw0My44XSxbLTcuMiw0My42XSxbLTYuMyw0My42XSxbLTUuNiw0My42XSxbLTQuOSw0My40XSxbLTQuMiw0My40XSxbLTMuMiw0My40XSxbLTIuNSw0My4zXSxbLTEuOCw0My4zXSxbLTEuNCw0M10sWy0wLjgsNDIuOV0sWy0wLjMsNDIuOF0sWzAuMyw0Mi43XSxbMC44LDQyLjhdLFsxLjQsNDIuNl0sWzIsNDIuNF0sWzIuNyw0Mi4zXSxbMy4zLDQyLjJdLFszLjEsNDEuOF0sWzIuMyw0MS40XSxbMS43LDQxLjJdLFswLjksNDFdLFswLjUsNDAuNV0sWy0wLjEsMzkuOV0sWy0wLjEsMzldLFswLjEsMzguN10sWy0wLjUsMzguM10sWy0wLjksMzcuN10sWy0xLjQsMzcuNV0sWy0xLjksMzddLFstMi4zLDM2LjhdLFstMi45LDM2LjddLFstMy43LDM2LjddLFstNC41LDM2LjddLFstNS4yLDM2LjRdLFstNS45LDM2LjJdLFstNi4yLDM2LjZdLFstNi45LDM3LjJdLFstNy40LDM3LjRdLFstNy4zLDM4XSxbLTcuMSwzOC4yXSxbLTcuMSwzOC45XSxbLTcuNCwzOS41XSxbLTcuMSwzOS43XSxbLTYuOCw0MC4zXSxbLTYuOSw0MV0sWy02LjQsNDEuNF0sWy02LjUsNDEuN10sWy02LjksNDEuOV0sWy03LjMsNDEuOF0sWy04LDQxLjhdLFstOC4yLDQyLjFdLFstOC43LDQyXSxbLTguNiw0Mi40XSxbLTguOSw0Mi40XSxbLTguOSw0Mi42XSxbLTkuMSw0Mi44XSxbLTkuMSw0My4yXSxbLTguNCw0My40XSxbLTcuOSw0My44XV1dLFtbWzMuMiwzOS43XSxbMy4zLDM5LjddLFszLjMsMzkuOF0sWzMuNCwzOS44XSxbMy41LDM5LjddLFszLjQsMzkuNl0sWzMuNCwzOS41XSxbMy4zLDM5LjVdLFszLjMsMzkuNF0sWzMuMiwzOS40XSxbMy4xLDM5LjNdLFszLDM5LjNdLFsyLjgsMzkuNF0sWzIuNywzOS40XSxbMi43LDM5LjVdLFsyLjgsMzkuNV0sWzIuNywzOS42XSxbMi41LDM5LjVdLFsyLjQsMzkuNV0sWzIuNCwzOS42XSxbMi41LDM5LjddLFsyLjcsMzkuOF0sWzIuOCwzOS44XSxbMywzOS45XSxbMy4xLDM5LjldLFszLjEsMzkuOF0sWzMuMiwzOS44XSxbMy4yLDM5LjddXV0sW1tbLTE0LjMsMjhdLFstMTQuNCwyOF0sWy0xNC40LDI4LjFdLFstMTQuMywyOC4xXSxbLTE0LjMsMjguMl0sWy0xNC4yLDI4LjJdLFstMTQuMiwyOC4zXSxbLTE0LjEsMjguNF0sWy0xNC4xLDI4LjVdLFstMTQuMSwyOC42XSxbLTE0LDI4LjZdLFstMTQsMjguN10sWy0xMy45LDI4LjddLFstMTMuOSwyOC44XSxbLTEzLjgsMjguN10sWy0xMy44LDI4LjZdLFstMTMuOCwyOC41XSxbLTEzLjksMjguNF0sWy0xMy45LDI4LjNdLFstMTMuOSwyOC4yXSxbLTE0LDI4LjJdLFstMTQuMSwyOC4yXSxbLTE0LjIsMjguMV0sWy0xNC4zLDI4XV1dLFtbWy0xNi4zLDI4LjRdLFstMTYuNCwyOC40XSxbLTE2LjQsMjguMl0sWy0xNi40LDI4LjFdLFstMTYuNSwyOC4xXSxbLTE2LjUsMjhdLFstMTYuNiwyOF0sWy0xNi43LDI4XSxbLTE2LjcsMjguMV0sWy0xNi44LDI4LjFdLFstMTYuOCwyOC4yXSxbLTE2LjksMjguM10sWy0xNi45LDI4LjRdLFstMTYuOCwyOC40XSxbLTE2LjcsMjguNF0sWy0xNi42LDI4LjRdLFstMTYuNSwyOC40XSxbLTE2LjQsMjguNV0sWy0xNi4zLDI4LjZdLFstMTYuMiwyOC42XSxbLTE2LjIsMjguNV0sWy0xNi4zLDI4LjRdXV0sW1tbLTE1LjYsMjcuOF0sWy0xNS42LDI3LjddLFstMTUuNywyNy44XSxbLTE1LjgsMjcuOF0sWy0xNS44LDI3LjldLFstMTUuOCwyOF0sWy0xNS43LDI4XSxbLTE1LjcsMjguMV0sWy0xNS43LDI4LjJdLFstMTUuNiwyOC4yXSxbLTE1LjQsMjguMV0sWy0xNS40LDI4XSxbLTE1LjQsMjcuOF0sWy0xNS41LDI3LjhdLFstMTUuNiwyNy44XV1dLFtbWzQuMyw0MF0sWzQuMywzOS45XSxbNC4zLDM5LjhdLFs0LjIsMzkuOF0sWzQuMSwzOS45XSxbNCwzOS45XSxbMy45LDM5LjldLFszLjgsMzkuOV0sWzMuOCw0MF0sWzMuOCw0MC4xXSxbMy45LDQwLjFdLFs0LjEsNDAuMV0sWzQuMiw0MC4xXSxbNC4yLDQwXSxbNC4zLDQwXV1dLFtdXSxcInR5cGVcIjpcIk11bHRpUG9seWdvblwifSxcInR5cGVcIjpcIkZlYXR1cmVcIixcInByb3BlcnRpZXNcIjp7XCJpc28yXCI6XCJFU1wiLFwibG5nXCI6LTQsXCJsYXRcIjo0MH19LHtcImdlb21ldHJ5XCI6e1wiY29vcmRpbmF0ZXNcIjpbW1tbMjguMiw2OS45XSxbMjkuMyw2OS41XSxbMjguOSw2OV0sWzI4LjUsNjguNl0sWzI5LjksNjcuN10sWzI5LjEsNjYuOV0sWzI5LjgsNjYuMl0sWzI5LjgsNjUuNl0sWzI5LjgsNjUuMl0sWzI5LjcsNjQuOF0sWzMwLDY0LjVdLFszMC42LDY0XSxbMzAuMyw2My42XSxbMzEuNSw2M10sWzMwLjgsNjIuM10sWzI5LjcsNjEuNV0sWzI4LjgsNjEuMV0sWzI4LjEsNjAuN10sWzI3LjIsNjAuNl0sWzI2LjYsNjAuNl0sWzI1LjksNjAuNF0sWzI1LjcsNjAuNF0sWzI0LjYsNjAuMV0sWzIzLjYsNjBdLFsyMy4yLDU5LjldLFsyMyw2MC4yXSxbMjIuNSw2MC4yXSxbMjEuOSw2MC41XSxbMjEuNCw2MC44XSxbMjEuNSw2MS41XSxbMjEuMyw2Ml0sWzIxLjEsNjIuNl0sWzIxLjYsNjMuMV0sWzIyLjMsNjMuM10sWzIyLjcsNjMuN10sWzIzLjQsNjRdLFsyNC4yLDY0LjVdLFsyNSw2NC45XSxbMjUuMyw2NV0sWzI1LjIsNjUuNl0sWzI0LjcsNjUuOV0sWzIzLjcsNjYuMl0sWzI0LDY2LjhdLFsyMy44LDY3LjRdLFsyMy41LDY3LjldLFsyMyw2OC4zXSxbMjIuMSw2OC41XSxbMjEuMiw2OC44XSxbMjAuOCw2OS4xXSxbMjIsNjkuMV0sWzIyLjksNjguN10sWzIzLjcsNjguN10sWzI0LjUsNjguN10sWzI1LjQsNjguOV0sWzI1LjgsNjkuNF0sWzI2LjQsNjkuOF0sWzI3LjMsNjkuOV0sWzI4LjIsNjkuOV1dXSxbXSxbXSxbXSxbXSxbXSxbXV0sXCJ0eXBlXCI6XCJNdWx0aVBvbHlnb25cIn0sXCJ0eXBlXCI6XCJGZWF0dXJlXCIsXCJwcm9wZXJ0aWVzXCI6e1wiaXNvMlwiOlwiRklcIixcImxuZ1wiOjI2LFwibGF0XCI6NjR9fSx7XCJnZW9tZXRyeVwiOntcImNvb3JkaW5hdGVzXCI6W1tbWzIuNSw1MS4xXSxbMy4yLDUwLjddLFs0LDUwLjNdLFs0LjUsNDkuOV0sWzUsNDkuOF0sWzYuMSw0OS41XSxbNi45LDQ5LjJdLFs3LjcsNDldLFs3LjksNDguN10sWzcuNSw0Ny44XSxbNy4xLDQ3LjVdLFs2LjYsNDddLFs2LjEsNDYuNF0sWzYuMiw0Ni4zXSxbNi45LDQ2LjFdLFs3LjEsNDUuNV0sWzYuNyw0NS4xXSxbNi45LDQ0LjVdLFs3LjcsNDQuMl0sWzcuMiw0My43XSxbNi4yLDQzLjFdLFs1LjMsNDMuNF0sWzUsNDMuNl0sWzQuNiw0My40XSxbMy44LDQzLjVdLFszLDQyLjldLFsyLjcsNDIuNF0sWzEuOSw0Mi40XSxbMS40LDQyLjZdLFswLjcsNDIuOF0sWy0wLjEsNDIuN10sWy0wLjgsNDNdLFstMS40LDQzLjFdLFstMS42LDQzLjRdLFstMS4zLDQ0LjVdLFstMS4yLDQ1XSxbLTAuOCw0NS40XSxbLTAuNyw0NS40XSxbLTEuMSw0Ni4xXSxbLTEuOSw0Ni42XSxbLTIuMiw0Ny4yXSxbLTIuNCw0Ny4zXSxbLTIuOSw0Ny41XSxbLTMuNiw0Ny44XSxbLTQuNCw0Ny44XSxbLTQuMyw0OC4xXSxbLTQuMiw0OC4zXSxbLTQuNSw0OC42XSxbLTMuNSw0OC43XSxbLTIuNyw0OC41XSxbLTEuOSw0OC43XSxbLTEuNSw0OC43XSxbLTEuOCw0OS40XSxbLTEuNCw0OS43XSxbLTEsNDkuNF0sWy0wLjEsNDkuM10sWzAuMiw0OS41XSxbMS4yLDUwXSxbMS42LDUwLjhdLFsyLjUsNTEuMV1dXSxbW1s5LjQsNDIuN10sWzkuNCw0Mi42XSxbOS41LDQyLjZdLFs5LjUsNDIuNV0sWzkuNiw0Mi4zXSxbOS42LDQyLjJdLFs5LjYsNDIuMV0sWzkuNSw0Mi4xXSxbOS40LDQyXSxbOS40LDQxLjldLFs5LjQsNDEuOF0sWzkuNCw0MS43XSxbOS40LDQxLjZdLFs5LjMsNDEuNl0sWzkuMyw0MS41XSxbOS4yLDQxLjVdLFs5LjIsNDEuNF0sWzkuMyw0MS40XSxbOS4xLDQxLjRdLFs5LDQxLjVdLFs4LjksNDEuNV0sWzguOCw0MS42XSxbOC45LDQxLjZdLFs4LjksNDEuN10sWzguOCw0MS43XSxbOC43LDQxLjddLFs4LjcsNDEuOF0sWzguOCw0MS45XSxbOC43LDQxLjldLFs4LjYsNDEuOV0sWzguNiw0Ml0sWzguNyw0Ml0sWzguNyw0Mi4xXSxbOC42LDQyLjFdLFs4LjYsNDIuMl0sWzguNiw0Mi4zXSxbOC43LDQyLjNdLFs4LjYsNDIuNF0sWzguNyw0Mi41XSxbOC43LDQyLjZdLFs4LjksNDIuNl0sWzkuMSw0Mi43XSxbOS4yLDQyLjddLFs5LjMsNDIuN10sWzkuMyw0Mi44XSxbOS4zLDQzXSxbOS40LDQzXSxbOS41LDQzXSxbOS41LDQyLjhdLFs5LjUsNDIuN10sWzkuNCw0Mi43XV1dLFtdLFtdLFtdLFtdLFtdXSxcInR5cGVcIjpcIk11bHRpUG9seWdvblwifSxcInR5cGVcIjpcIkZlYXR1cmVcIixcInByb3BlcnRpZXNcIjp7XCJpc28yXCI6XCJGUlwiLFwibG5nXCI6MixcImxhdFwiOjQ2fX0se1wiZ2VvbWV0cnlcIjp7XCJjb29yZGluYXRlc1wiOltbW1stNC4yLDUzLjJdLFstMy4xLDUzLjJdLFstMyw1My44XSxbLTMuNSw1NC40XSxbLTMuMSw1NV0sWy00LjQsNTQuOV0sWy01LDU0LjhdLFstNSw1NS4yXSxbLTQuOCw1NS45XSxbLTUuMiw1NS44XSxbLTUuNCw1NS45XSxbLTUuOCw1NS40XSxbLTUuNSw1Ni4yXSxbLTUuMyw1Ni41XSxbLTUuOCw1Ni41XSxbLTYuMSw1Ni44XSxbLTUuNSw1N10sWy01LjUsNTcuNF0sWy01LjYsNTcuNl0sWy01LjIsNTcuOV0sWy01LjIsNTguM10sWy00LjYsNTguNV0sWy0zLjQsNTguNl0sWy0zLjYsNTguMV0sWy00LDU3LjhdLFstNCw1Ny42XSxbLTIuOSw1Ny43XSxbLTEuOCw1Ny41XSxbLTIuNSw1Ni42XSxbLTMsNTYuNF0sWy0zLjIsNTYuMV0sWy0yLjgsNTYuMV0sWy0xLjgsNTUuNl0sWy0xLjMsNTQuOF0sWy0wLjIsNTQuMl0sWzAsNTMuNl0sWzAuMiw1My41XSxbMC4yLDUyLjldLFsxLjIsNTIuOV0sWzEuNyw1Mi4zXSxbMC45LDUxLjhdLFswLjQsNTEuNF0sWzEuNCw1MS4xXSxbMC40LDUwLjhdLFstMC44LDUwLjddLFstMi4xLDUwLjddLFstMi44LDUwLjddLFstMy44LDUwLjJdLFstNC45LDUwLjJdLFstNS43LDUwLjFdLFstNC43LDUwLjddLFstNCw1MS4yXSxbLTIuOSw1MS40XSxbLTMuMiw1MS41XSxbLTQuMiw1MS41XSxbLTQuOCw1MS42XSxbLTUuMiw1MS45XSxbLTQuMSw1Mi4zXSxbLTQuNSw1Mi44XSxbLTQuMiw1My4yXV1dLFtbWy02LjIsNTguNF0sWy02LjIsNTguM10sWy02LjMsNTguM10sWy02LjMsNTguMl0sWy02LjIsNTguMl0sWy02LjEsNTguM10sWy02LjQsNTguMl0sWy02LjQsNTguMV0sWy02LjUsNTguMV0sWy02LjYsNTguMV0sWy02LjQsNThdLFstNi41LDU4XSxbLTYuNSw1Ny45XSxbLTYuNiw1Ny45XSxbLTYuNyw1Ny45XSxbLTYuNyw1OF0sWy02LjYsNThdLFstNi43LDU4LjFdLFstNi44LDU4XSxbLTYuNyw1Ny44XSxbLTcsNTcuN10sWy03LjEsNTcuOF0sWy03LDU3LjhdLFstNi44LDU3LjldLFstNi45LDU3LjldLFstNi45LDU4XSxbLTcsNThdLFstNy4xLDU4XSxbLTcuMSw1OC4xXSxbLTcuMSw1OC4yXSxbLTcsNTguMl0sWy02LjksNTguMl0sWy02LjksNTguMV0sWy02LjgsNTguMl0sWy02LjcsNTguMl0sWy02LjgsNTguM10sWy02LjcsNTguM10sWy02LjYsNTguM10sWy02LjYsNTguNF0sWy02LjQsNTguNV0sWy02LjMsNTguNV0sWy02LjIsNTguNV0sWy02LjIsNTguNF1dXSxbW1stNi40LDU1LjJdLFstNi4yLDU1LjJdLFstNiw1NS4yXSxbLTUuOCw1NC45XSxbLTUuNyw1NC44XSxbLTUuOCw1NC43XSxbLTUuOSw1NC42XSxbLTUuNSw1NC43XSxbLTUuNSw1NC41XSxbLTUuNSw1NC40XSxbLTUuNiw1NC42XSxbLTUuNyw1NC41XSxbLTUuNiw1NC4zXSxbLTUuNyw1NC4yXSxbLTUuOSw1NC4yXSxbLTYsNTQuMV0sWy02LjEsNTRdLFstNi4zLDU0LjFdLFstNi42LDU0LjFdLFstNi43LDU0LjFdLFstNi45LDU0LjNdLFstNyw1NC40XSxbLTcuMiw1NC4zXSxbLTcuMSw1NC4yXSxbLTcuNiw1NC4xXSxbLTcuNyw1NC4yXSxbLTcuOSw1NC4yXSxbLTgsNTQuNF0sWy04LjIsNTQuNF0sWy04LDU0LjVdLFstNy45LDU0LjZdLFstNy44LDU0LjddLFstNy42LDU0LjhdLFstNy41LDU0LjldLFstNy40LDU1XSxbLTcuMyw1NS4xXSxbLTcsNTVdLFstNyw1NS4yXSxbLTYuOCw1NS4yXSxbLTYuNiw1NS4yXSxbLTYuNCw1NS4yXV1dLFtbWy02LjEsNTcuNl0sWy02LjEsNTcuNV0sWy02LjEsNTcuNF0sWy02LjEsNTcuM10sWy01LjksNTcuMl0sWy01LjgsNTcuM10sWy01LjcsNTcuM10sWy01LjYsNTcuM10sWy01LjcsNTcuMl0sWy01LjgsNTcuMV0sWy01LjksNTcuMV0sWy01LjksNTddLFstNiw1N10sWy02LDU3LjFdLFstNiw1Ny4yXSxbLTYuMSw1Ny4xXSxbLTYuMiw1Ny4yXSxbLTYuMyw1Ny4yXSxbLTYuNCw1Ny4zXSxbLTYuNSw1Ny4zXSxbLTYuMyw1Ny4zXSxbLTYuNSw1Ny40XSxbLTYuNiw1Ny40XSxbLTYuNiw1Ny4zXSxbLTYuNyw1Ny40XSxbLTYuOCw1Ny40XSxbLTYuNyw1Ny41XSxbLTYuNiw1Ny42XSxbLTYuNiw1Ny41XSxbLTYuNSw1Ny41XSxbLTYuNCw1Ny41XSxbLTYuNCw1Ny42XSxbLTYuMyw1Ny43XSxbLTYuMiw1Ny42XSxbLTYuMSw1Ny42XV1dLFtbWy0xLjMsNjAuNV0sWy0xLjIsNjAuNV0sWy0xLDYwLjRdLFstMS4xLDYwLjRdLFstMS4xLDYwLjNdLFstMS4yLDYwLjNdLFstMS4yLDYwLjJdLFstMS4xLDYwLjJdLFstMS4xLDYwLjFdLFstMS4yLDYwLjFdLFstMS4yLDYwXSxbLTEuMyw1OS45XSxbLTEuNCw1OS45XSxbLTEuMyw2MF0sWy0xLjMsNjAuMV0sWy0xLjMsNjAuMl0sWy0xLjQsNjAuM10sWy0xLjQsNjAuMl0sWy0xLjUsNjAuMl0sWy0xLjYsNjAuMl0sWy0xLjcsNjAuMl0sWy0xLjcsNjAuM10sWy0xLjYsNjAuM10sWy0xLjUsNjAuM10sWy0xLjMsNjAuM10sWy0xLjMsNjAuNF0sWy0xLjQsNjAuNV0sWy0xLjUsNjAuNV0sWy0xLjYsNjAuNV0sWy0xLjQsNjAuNl0sWy0xLjMsNjAuNl0sWy0xLjMsNjAuNV1dXSxbW1stNS44LDU2LjVdLFstNS43LDU2LjVdLFstNS42LDU2LjRdLFstNS43LDU2LjRdLFstNS44LDU2LjNdLFstNS45LDU2LjNdLFstNS45LDU2LjRdLFstNiw1Ni4zXSxbLTYuMyw1Ni4zXSxbLTYuNCw1Ni4zXSxbLTYuMiw1Ni4zXSxbLTYuMSw1Ni40XSxbLTYsNTYuNF0sWy02LjIsNTYuNF0sWy02LDU2LjVdLFstNi4xLDU2LjVdLFstNi4zLDU2LjVdLFstNi4zLDU2LjZdLFstNi4yLDU2LjZdLFstNi4xLDU2LjddLFstNi4xLDU2LjZdLFstNiw1Ni42XSxbLTUuOSw1Ni41XSxbLTUuOCw1Ni41XV1dLFtbWy02LjEsNTUuOV0sWy02LjEsNTUuOF0sWy02LDU1LjhdLFstNiw1NS43XSxbLTYuMSw1NS42XSxbLTYuMiw1NS42XSxbLTYuMyw1NS42XSxbLTYuMyw1NS43XSxbLTYuMyw1NS44XSxbLTYuNCw1NS44XSxbLTYuNCw1NS43XSxbLTYuNSw1NS43XSxbLTYuNCw1NS45XSxbLTYuMyw1NS45XSxbLTYuMiw1NS45XSxbLTYuMSw1NS45XV1dXSxcInR5cGVcIjpcIk11bHRpUG9seWdvblwifSxcInR5cGVcIjpcIkZlYXR1cmVcIixcInByb3BlcnRpZXNcIjp7XCJpc28yXCI6XCJHQlwiLFwibG5nXCI6LTIsXCJsYXRcIjo1NH19LHtcImdlb21ldHJ5XCI6e1wiY29vcmRpbmF0ZXNcIjpbW1s0MS41LDQyLjRdLFs0MS41LDQyLjddLFs0MS4yLDQyLjhdLFs0MSw0M10sWzQwLjgsNDMuMV0sWzQwLjMsNDMuMl0sWzQwLjEsNDMuNF0sWzQwLjEsNDMuNl0sWzQwLjQsNDMuNl0sWzQwLjcsNDMuNV0sWzQxLDQzLjRdLFs0MS40LDQzLjNdLFs0Mi4xLDQzLjJdLFs0Mi40LDQzLjJdLFs0Mi43LDQzLjJdLFs0Mi45LDQzLjFdLFs0My4yLDQyLjldLFs0My42LDQyLjldLFs0My44LDQyLjhdLFs0My43LDQyLjZdLFs0NC4yLDQyLjZdLFs0NC41LDQyLjhdLFs0NC43LDQyLjddLFs0NC45LDQyLjhdLFs0NS4yLDQyLjddLFs0NS40LDQyLjVdLFs0NS42LDQyLjZdLFs0NS44LDQyLjVdLFs0NS42LDQyLjJdLFs0Ni4xLDQyXSxbNDYuNCw0MS45XSxbNDYuMyw0MS44XSxbNDYuMiw0MS42XSxbNDYuNiw0MS40XSxbNDYuNyw0MS4xXSxbNDYuNSw0MS4xXSxbNDYuMyw0MS4yXSxbNDYsNDEuMl0sWzQ1LjcsNDEuM10sWzQ1LjMsNDEuNV0sWzQ1LjEsNDEuNF0sWzQ0LjksNDEuMl0sWzQ0LjYsNDEuMl0sWzQ0LjMsNDEuMl0sWzQ0LDQxLjJdLFs0My44LDQxLjFdLFs0My41LDQxLjFdLFs0My4zLDQxLjJdLFs0Myw0MS40XSxbNDIuNyw0MS42XSxbNDIuNSw0MS40XSxbNDIuMiw0MS41XSxbNDEuOSw0MS41XSxbNDEuNyw0MS41XSxbNDEuNiw0MS42XSxbNDEuOCw0MS44XSxbNDEuNyw0Mi4xXSxbNDEuNiw0Mi4zXSxbNDEuNSw0Mi40XV1dLFwidHlwZVwiOlwiUG9seWdvblwifSxcInR5cGVcIjpcIkZlYXR1cmVcIixcInByb3BlcnRpZXNcIjp7XCJpc28yXCI6XCJHRVwiLFwibG5nXCI6NDMuNSxcImxhdFwiOjQyfX0se1wiZ2VvbWV0cnlcIjp7XCJjb29yZGluYXRlc1wiOltbW1syMy45LDM1LjVdLFsyNCwzNS41XSxbMjQuMSwzNS41XSxbMjQuMSwzNS42XSxbMjQuMiwzNS42XSxbMjQuMiwzNS41XSxbMjQuMywzNS40XSxbMjQuNCwzNS40XSxbMjQuNSwzNS40XSxbMjQuNiwzNS40XSxbMjQuOCwzNS40XSxbMjUsMzUuNF0sWzI1LjEsMzUuM10sWzI1LjIsMzUuM10sWzI1LjMsMzUuM10sWzI1LjQsMzUuM10sWzI1LjUsMzUuM10sWzI1LjYsMzUuM10sWzI1LjcsMzUuM10sWzI1LjgsMzUuM10sWzI1LjcsMzUuMl0sWzI1LjcsMzUuMV0sWzI1LjgsMzUuMV0sWzI1LjksMzUuMl0sWzI2LDM1LjJdLFsyNi4xLDM1LjJdLFsyNi4yLDM1LjJdLFsyNi4zLDM1LjNdLFsyNi4zLDM1LjFdLFsyNi4yLDM1XSxbMjYuMSwzNV0sWzI2LDM1XSxbMjUuNiwzNV0sWzI1LjUsMzVdLFsyNS4zLDM1XSxbMjUuMiwzNV0sWzI1LDM0LjldLFsyNC45LDM0LjldLFsyNC44LDM0LjldLFsyNC44LDM1XSxbMjQuNywzNS4xXSxbMjQuNiwzNS4xXSxbMjQuNSwzNS4xXSxbMjQuNCwzNS4yXSxbMjQuMiwzNS4yXSxbMjQuMSwzNS4yXSxbMjQsMzUuMl0sWzIzLjksMzUuMl0sWzIzLjgsMzUuMl0sWzIzLjcsMzUuMl0sWzIzLjYsMzUuMl0sWzIzLjUsMzUuM10sWzIzLjYsMzUuNV0sWzIzLjYsMzUuNl0sWzIzLjcsMzUuNV0sWzIzLjcsMzUuNl0sWzIzLjcsMzUuN10sWzIzLjgsMzUuN10sWzIzLjgsMzUuNl0sWzIzLjgsMzUuNV0sWzIzLjksMzUuNV1dXSxbW1syNi4zLDQxLjddLFsyNi40LDQxLjNdLFsyNi4xLDQwLjhdLFsyNS43LDQwLjldLFsyNS4yLDQxXSxbMjQuNCw0MC45XSxbMjMuOCw0MC44XSxbMjQsNDAuNF0sWzI0LjEsNDAuM10sWzI0LDQwLjFdLFsyMy40LDQwLjNdLFsyMy43LDM5LjldLFsyMi44LDQwLjVdLFsyMi42LDQwLjVdLFsyMi43LDQwXSxbMjMuMywzOS4zXSxbMjMuMiwzOS4zXSxbMjMsMzkuMV0sWzIyLjUsMzguOV0sWzIzLjIsMzguNl0sWzIzLjYsMzguNV0sWzI0LjEsMzguMl0sWzI0LDM3LjddLFsyMy4zLDM4XSxbMjMuMiwzNy42XSxbMjMuNCwzNy40XSxbMjIuOSwzNy41XSxbMjIuOSwzNy4xXSxbMjMsMzYuN10sWzIyLjksMzYuNl0sWzIyLjUsMzYuNF0sWzIyLDM3XSxbMjEuNywzNi44XSxbMjEuNywzNy40XSxbMjEuMSwzNy44XSxbMjEuNiwzOC4xXSxbMjIuMiwzOC4yXSxbMjMsMzhdLFsyMy4xLDM4LjJdLFsyMi41LDM4LjRdLFsyMS43LDM4LjRdLFsyMS4zLDM4LjNdLFsyMC44LDM4LjhdLFsyMS4xLDM5XSxbMjAuNywzOS4xXSxbMjAuMiwzOS42XSxbMjAuNCwzOS45XSxbMjAuNyw0MC4yXSxbMjEsNDAuNl0sWzIxLjIsNDAuOV0sWzIxLjksNDEuMV0sWzIyLjYsNDEuMV0sWzIzLjEsNDEuM10sWzIzLjcsNDEuNF0sWzI0LjIsNDEuNl0sWzI0LjksNDEuNF0sWzI1LjYsNDEuM10sWzI2LjIsNDEuNV0sWzI2LjMsNDEuN11dXSxbW1syMy41LDM4LjldLFsyMy41LDM4LjhdLFsyMy42LDM4LjhdLFsyMy44LDM4LjddLFsyMy45LDM4LjddLFsyNCwzOC43XSxbMjQuMiwzOC42XSxbMjQuMiwzOC40XSxbMjQuMiwzOC4yXSxbMjQuMywzOC4yXSxbMjQuNCwzOC4xXSxbMjQuNSwzOC4xXSxbMjQuNiwzOC4xXSxbMjQuNiwzOF0sWzI0LjUsMzhdLFsyNC40LDM4XSxbMjQuMywzOF0sWzI0LjEsMzguMl0sWzI0LjEsMzguM10sWzI0LDM4LjRdLFsyNC4xLDM4LjRdLFsyMy45LDM4LjRdLFsyMy44LDM4LjRdLFsyMy43LDM4LjRdLFsyMy42LDM4LjRdLFsyMy42LDM4LjVdLFsyMy42LDM4LjZdLFsyMy41LDM4LjZdLFsyMy4zLDM4LjddLFsyMy4yLDM4LjhdLFsyMy4xLDM4LjldLFsyMy4xLDM4LjhdLFsyMi44LDM4LjhdLFsyMi44LDM4LjldLFsyMi45LDM4LjldLFsyMy4xLDM5XSxbMjMuMywzOV0sWzIzLjQsMzldLFsyMy40LDM4LjldLFsyMy41LDM4LjldXV0sW1tbMjYuNCwzOS4zXSxbMjYuNSwzOS4yXSxbMjYuNiwzOS4xXSxbMjYuNiwzOV0sWzI2LjUsMzldLFsyNi40LDM5XSxbMjYuMywzOV0sWzI2LjIsMzldLFsyNi4xLDM5XSxbMjYuMSwzOS4xXSxbMjYuMiwzOS4xXSxbMjYuMywzOS4yXSxbMjYuMiwzOS4yXSxbMjYsMzkuMV0sWzI1LjksMzkuMV0sWzI1LjksMzkuMl0sWzI1LjgsMzkuMl0sWzI1LjksMzkuM10sWzI2LDM5LjNdLFsyNi4yLDM5LjNdLFsyNi4yLDM5LjRdLFsyNi4zLDM5LjRdLFsyNi40LDM5LjNdXV0sW1tbMjcuOCwzNS45XSxbMjcuNywzNS45XSxbMjcuNywzNl0sWzI3LjcsMzYuMV0sWzI3LjcsMzYuMl0sWzI3LjgsMzYuM10sWzI3LjksMzYuM10sWzI4LjEsMzYuNF0sWzI4LjIsMzYuNF0sWzI4LjIsMzYuNV0sWzI4LjIsMzYuM10sWzI4LjEsMzYuMl0sWzI4LjEsMzYuMV0sWzI4LDM2LjFdLFsyOCwzNl0sWzI3LjksMzZdLFsyNy45LDM1LjldLFsyNy44LDM1LjldXV0sW1tbMjYsMzguMl0sWzI2LDM4LjFdLFsyNS45LDM4LjJdLFsyNS45LDM4LjNdLFsyNiwzOC4zXSxbMjYsMzguNF0sWzI1LjksMzguNV0sWzI1LjgsMzguNV0sWzI1LjgsMzguNl0sWzI1LjksMzguNl0sWzI2LDM4LjZdLFsyNi4xLDM4LjZdLFsyNi4yLDM4LjZdLFsyNi4yLDM4LjVdLFsyNi4xLDM4LjRdLFsyNi4yLDM4LjNdLFsyNi4xLDM4LjJdLFsyNiwzOC4yXV1dLFtbWzE5LjksMzkuOF0sWzIwLDM5LjhdLFsxOS45LDM5LjddLFsxOS44LDM5LjddLFsxOS44LDM5LjZdLFsxOS45LDM5LjVdLFsyMCwzOS40XSxbMjAuMSwzOS40XSxbMjAuMSwzOS41XSxbMTkuOSwzOS40XSxbMTkuOCwzOS41XSxbMTkuNywzOS42XSxbMTkuNywzOS43XSxbMTkuNiwzOS43XSxbMTkuNiwzOS44XSxbMTkuNywzOS44XSxbMTkuOCwzOS44XSxbMTkuOSwzOS44XV1dXSxcInR5cGVcIjpcIk11bHRpUG9seWdvblwifSxcInR5cGVcIjpcIkZlYXR1cmVcIixcInByb3BlcnRpZXNcIjp7XCJpc28yXCI6XCJHUlwiLFwibG5nXCI6MjIsXCJsYXRcIjozOX19LHtcImdlb21ldHJ5XCI6e1wiY29vcmRpbmF0ZXNcIjpbW1tbMTYuNiw0Ni41XSxbMTYuOSw0Ni4zXSxbMTcuMiw0Ni4yXSxbMTcuNCw0Nl0sWzE3LjcsNDUuOV0sWzE4LjIsNDUuOF0sWzE4LjYsNDUuOF0sWzE4LjksNDUuOF0sWzE4LjksNDUuNV0sWzE5LDQ1LjRdLFsxOS40LDQ1LjJdLFsxOS4xLDQ0LjldLFsxOC44LDQ1XSxbMTguMiw0NS4xXSxbMTcuOCw0NS4xXSxbMTcuMyw0NS4yXSxbMTcsNDUuMl0sWzE2LjYsNDUuMl0sWzE2LjMsNDVdLFsxNS45LDQ1LjJdLFsxNS43LDQ0LjhdLFsxNiw0NC42XSxbMTYuMSw0NC4yXSxbMTYuNCw0NC4xXSxbMTYuNyw0My45XSxbMTcsNDMuNl0sWzE3LjMsNDMuNV0sWzE3LjYsNDMuMV0sWzE3LjUsNDNdLFsxNy4xLDQzLjJdLFsxNi43LDQzLjRdLFsxNi40LDQzLjZdLFsxNi4xLDQzLjVdLFsxNS45LDQzLjddLFsxNS41LDQzLjldLFsxNS4yLDQ0LjJdLFsxNS4zLDQ0LjNdLFsxNS4yLDQ0LjRdLFsxNC45LDQ0LjhdLFsxNC43LDQ1LjFdLFsxNC40LDQ1LjNdLFsxNC4yLDQ1LjJdLFsxNCw0NC45XSxbMTMuOCw0NV0sWzEzLjUsNDUuNF0sWzEzLjksNDUuNV0sWzE0LjUsNDUuNV0sWzE0LjcsNDUuNV0sWzE1LjEsNDUuNV0sWzE1LjQsNDUuN10sWzE1LjYsNDUuOF0sWzE1LjcsNDYuMV0sWzE1LjgsNDYuMl0sWzE2LjMsNDYuNF0sWzE2LjUsNDYuNV0sWzE2LjYsNDYuNV1dXSxbW1sxNy4zLDQzXSxbMTcuNCw0M10sWzE3LjQsNDIuOV0sWzE3LjUsNDIuOV0sWzE3LjcsNDIuOV0sWzE3LjYsNDIuOV0sWzE3LjgsNDIuOV0sWzE3LjksNDIuOF0sWzE4LDQyLjhdLFsxOC4yLDQyLjddLFsxOC4yLDQyLjZdLFsxOC4zLDQyLjZdLFsxOC40LDQyLjZdLFsxOC41LDQyLjZdLFsxOC41LDQyLjVdLFsxOC41LDQyLjRdLFsxOC40LDQyLjVdLFsxOC4xLDQyLjddLFsxNy44LDQyLjhdLFsxNy43LDQyLjhdLFsxNy42LDQyLjhdLFsxNy4yLDQzXSxbMTcuMSw0M10sWzE3LDQzXSxbMTcuMyw0M11dXSxbW1sxNC41LDQ0LjldLFsxNC40LDQ0LjldLFsxNC41LDQ0LjhdLFsxNC41LDQ0LjddLFsxNC41LDQ0LjZdLFsxNC40LDQ0LjddLFsxNC40LDQ0LjhdLFsxNC4zLDQ0LjhdLFsxNC4zLDQ0LjldLFsxNC40LDQ1XSxbMTQuMyw0NS4xXSxbMTQuMyw0NS4yXSxbMTQuNCw0NS4yXSxbMTQuNCw0NS4xXSxbMTQuNSw0NV0sWzE0LjUsNDQuOV1dXSxbW1sxNC44LDQ0LjZdLFsxNC45LDQ0LjZdLFsxNSw0NC42XSxbMTUsNDQuNV0sWzE1LjEsNDQuNV0sWzE0LjksNDQuNV0sWzE1LjEsNDQuNF0sWzE1LjIsNDQuNF0sWzE1LjIsNDQuM10sWzE1LjMsNDQuM10sWzE1LjEsNDQuM10sWzE1LDQ0LjRdLFsxNC43LDQ0LjddLFsxNC44LDQ0LjddLFsxNC44LDQ0LjZdXV0sW10sW10sW11dLFwidHlwZVwiOlwiTXVsdGlQb2x5Z29uXCJ9LFwidHlwZVwiOlwiRmVhdHVyZVwiLFwicHJvcGVydGllc1wiOntcImlzbzJcIjpcIkhSXCIsXCJsbmdcIjoxNS41LFwibGF0XCI6NDUuMn19LHtcImdlb21ldHJ5XCI6e1wiY29vcmRpbmF0ZXNcIjpbW1sxOC44LDQ1LjldLFsxOC40LDQ1LjhdLFsxOCw0NS44XSxbMTcuNiw0NS45XSxbMTcuMyw0Nl0sWzE3LjEsNDYuMl0sWzE2LjksNDYuNF0sWzE2LjUsNDYuNV0sWzE2LjMsNDYuOV0sWzE2LjQsNDddLFsxNi41LDQ3LjNdLFsxNi43LDQ3LjZdLFsxNi41LDQ3LjddLFsxNi45LDQ3LjddLFsxNy4xLDQ3LjldLFsxNy40LDQ4XSxbMTcuOCw0Ny43XSxbMTguMSw0Ny44XSxbMTguNCw0Ny44XSxbMTguOCw0Ny44XSxbMTguOCw0OC4xXSxbMTkuMiw0OC4xXSxbMTkuNyw0OC4yXSxbMjAuMSw0OC4yXSxbMjAuNCw0OC40XSxbMjAuOCw0OC42XSxbMjEuMSw0OC41XSxbMjEuNSw0OC41XSxbMjEuOCw0OC4zXSxbMjIuMSw0OC40XSxbMjIuNCw0OC4yXSxbMjIuNiw0OC4xXSxbMjIuOSw0OF0sWzIyLjUsNDcuOF0sWzIyLjIsNDcuNl0sWzIxLjksNDcuNF0sWzIxLjcsNDcuMV0sWzIxLjUsNDYuN10sWzIxLjIsNDYuNF0sWzIxLDQ2LjNdLFsyMC43LDQ2LjJdLFsyMC41LDQ2LjJdLFsyMC4yLDQ2LjJdLFsxOS44LDQ2LjJdLFsxOS41LDQ2LjFdLFsxOSw0Nl0sWzE4LjgsNDUuOV1dXSxcInR5cGVcIjpcIlBvbHlnb25cIn0sXCJ0eXBlXCI6XCJGZWF0dXJlXCIsXCJwcm9wZXJ0aWVzXCI6e1wiaXNvMlwiOlwiSFVcIixcImxuZ1wiOjIwLFwibGF0XCI6NDd9fSx7XCJnZW9tZXRyeVwiOntcImNvb3JkaW5hdGVzXCI6W1tbWy03LjQsNTVdLFstNy43LDU0LjddLFstOCw1NC41XSxbLTcuOSw1NC4zXSxbLTcuNiw1NC4xXSxbLTcuMSw1NC40XSxbLTYuNyw1NC4xXSxbLTYuMiw1NC4xXSxbLTYuNCw1My45XSxbLTYuMiw1My43XSxbLTYuMiw1My40XSxbLTYuMSw1Mi45XSxbLTYuMiw1Mi42XSxbLTYuMyw1Mi4zXSxbLTYuOCw1Mi4yXSxbLTcuMSw1Mi4xXSxbLTcuNSw1Ml0sWy03LjksNTEuOV0sWy04LjMsNTEuOV0sWy04LjUsNTEuN10sWy05LDUxLjZdLFstOS42LDUxLjVdLFstOS43LDUxLjZdLFstOS41LDUxLjhdLFstMTAuMSw1MS42XSxbLTkuNyw1MS45XSxbLTEwLjQsNTEuOV0sWy05LjgsNTIuMV0sWy0xMC4xLDUyLjFdLFstMTAuNSw1Mi4yXSxbLTkuNyw1Mi4yXSxbLTkuNyw1Mi42XSxbLTksNTIuNl0sWy05LjEsNTIuNl0sWy05LjYsNTIuN10sWy05LjMsNTMuMl0sWy04LjksNTMuMV0sWy05LjQsNTMuMl0sWy05LjcsNTMuNF0sWy05LjgsNTMuNF0sWy0xMCw1My42XSxbLTkuOSw1My44XSxbLTkuNyw1My45XSxbLTkuOSw1NC4xXSxbLTEwLjEsNTQuM10sWy05LjYsNTQuM10sWy05LjEsNTQuMl0sWy04LjYsNTQuM10sWy04LjMsNTQuNV0sWy04LjgsNTQuN10sWy04LjQsNTQuOF0sWy04LjUsNTVdLFstNy44LDU1LjJdLFstNy41LDU1LjFdLFstNy41LDU1XSxbLTcuNCw1NS4zXSxbLTcsNTUuMl0sWy03LjMsNTVdLFstNy40LDU1XV1dLFtdLFtdLFtdLFtdXSxcInR5cGVcIjpcIk11bHRpUG9seWdvblwifSxcInR5cGVcIjpcIkZlYXR1cmVcIixcInByb3BlcnRpZXNcIjp7XCJpc28yXCI6XCJJRVwiLFwibG5nXCI6LTgsXCJsYXRcIjo1M319LHtcImdlb21ldHJ5XCI6e1wiY29vcmRpbmF0ZXNcIjpbW1stMTUuMSw2Ni4xXSxbLTE0LjYsNjUuOV0sWy0xNC4zLDY1LjhdLFstMTMuOSw2NS42XSxbLTEzLjgsNjUuMl0sWy0xNCw2NS4xXSxbLTE0LDY0LjhdLFstMTQuNSw2NC42XSxbLTE1LjIsNjQuM10sWy0xNi4yLDY0XSxbLTE3LjEsNjMuOF0sWy0xNy45LDYzLjVdLFstMTkuMyw2My40XSxbLTIwLjUsNjMuN10sWy0yMC44LDYzLjhdLFstMjEuNCw2My45XSxbLTIyLjMsNjMuOV0sWy0yMi4zLDY0XSxbLTIxLjgsNjQuM10sWy0yMi4xLDY0LjNdLFstMjIuMSw2NC41XSxbLTIyLjcsNjQuOF0sWy0yMy42LDY0LjddLFstMjMuOCw2NC45XSxbLTIyLjQsNjUuMV0sWy0yMS44LDY1LjJdLFstMjIuMiw2NS4zXSxbLTIyLjIsNjUuNF0sWy0yMi44LDY1LjVdLFstMjMuNyw2NS40XSxbLTI0LjMsNjUuNl0sWy0yNCw2NS43XSxbLTIzLjUsNjUuNl0sWy0yMy42LDY1LjhdLFstMjMuNyw2Nl0sWy0yMy42LDY2LjJdLFstMjIuNyw2Ni4xXSxbLTIyLjUsNjUuOF0sWy0yMi43LDY2LjNdLFstMjMuMiw2Ni40XSxbLTIyLDY2LjNdLFstMjEuNiw2NS45XSxbLTIxLjYsNjUuNl0sWy0yMS4xLDY1LjVdLFstMjAuNCw2NS41XSxbLTIwLjEsNjYuMV0sWy0xOS41LDY1LjddLFstMTkuMiw2Ni4xXSxbLTE4LjUsNjYuMV0sWy0xOCw2NS43XSxbLTE4LDY2LjJdLFstMTcuMiw2Ni4yXSxbLTE2LjQsNjYuMl0sWy0xNS45LDY2LjRdLFstMTUuMiw2Ni4zXSxbLTE0LjksNjYuMl0sWy0xNS4xLDY2LjFdXV0sXCJ0eXBlXCI6XCJQb2x5Z29uXCJ9LFwidHlwZVwiOlwiRmVhdHVyZVwiLFwicHJvcGVydGllc1wiOntcImlzbzJcIjpcIklTXCIsXCJsbmdcIjotMTgsXCJsYXRcIjo2NX19LHtcImdlb21ldHJ5XCI6e1wiY29vcmRpbmF0ZXNcIjpbW1tbMTIuMSw0N10sWzEyLjgsNDYuNl0sWzEzLjUsNDYuNF0sWzEzLjUsNDYuMV0sWzEzLjksNDUuNl0sWzEzLjEsNDUuOF0sWzEyLjQsNDUuNF0sWzEyLjQsNDVdLFsxMi4zLDQ0LjVdLFsxMyw0My44XSxbMTMuNiw0My41XSxbMTQuMSw0Mi41XSxbMTQuOSw0Ml0sWzE1LjcsNDEuOV0sWzE1LjksNDEuNl0sWzE3LDQxLjFdLFsxOC4xLDQwLjVdLFsxOC40LDM5LjhdLFsxNy45LDQwLjNdLFsxNy4zLDQwLjVdLFsxNi42LDQwLjFdLFsxNi44LDM5LjZdLFsxNy4xLDM4LjldLFsxNi42LDM4LjZdLFsxNi4xLDM4LjFdLFsxNS42LDM4XSxbMTUuOCwzOC42XSxbMTYuMiwzOV0sWzE1LjksMzkuNV0sWzE1LjYsNDAuMV0sWzE0LjksNDAuMl0sWzE0LjcsNDAuNl0sWzE0LjIsNDAuOF0sWzEzLjYsNDEuM10sWzEyLjksNDEuNF0sWzEyLjIsNDEuOV0sWzExLjYsNDIuM10sWzExLjIsNDIuNl0sWzEwLjYsNDNdLFsxMC4zLDQzLjZdLFs5LjQsNDQuM10sWzguNCw0NC4yXSxbNy43LDQzLjhdLFs3LjYsNDQuMl0sWzYuOSw0NC41XSxbNi42LDQ1LjFdLFs3LjIsNDUuNF0sWzYuOSw0NS44XSxbNy42LDQ2XSxbOC4yLDQ2LjJdLFs4LjQsNDYuMl0sWzguOSw0NS45XSxbOS4yLDQ2LjJdLFs5LjUsNDYuM10sWzEwLjEsNDYuMl0sWzEwLjMsNDYuNl0sWzEwLjYsNDYuOV0sWzExLjUsNDddLFsxMi4xLDQ3XV1dLFtbWzE1LjUsMzguMV0sWzE1LjQsMzcuOV0sWzE1LjIsMzcuN10sWzE1LjIsMzcuNV0sWzE1LjEsMzcuNF0sWzE1LjIsMzcuMl0sWzE1LjMsMzcuMV0sWzE1LjIsMzddLFsxNS4xLDM2LjldLFsxNS4xLDM2LjddLFsxNSwzNi43XSxbMTQuOCwzNi43XSxbMTQuNiwzNi44XSxbMTQuNCwzNi45XSxbMTQuMywzN10sWzE0LjEsMzcuMV0sWzEzLjksMzcuMV0sWzEzLjYsMzcuMl0sWzEzLjUsMzcuM10sWzEzLjMsMzcuNF0sWzEzLjEsMzcuNV0sWzEzLDM3LjZdLFsxMi44LDM3LjZdLFsxMi41LDM3LjddLFsxMi41LDM3LjhdLFsxMi41LDM4XSxbMTIuNywzOC4xXSxbMTIuOSwzOF0sWzEzLDM4LjFdLFsxMy4xLDM4LjJdLFsxMy40LDM4LjJdLFsxMy43LDM4XSxbMTMuOSwzOF0sWzE0LjEsMzhdLFsxNC4zLDM4XSxbMTQuNSwzOF0sWzE0LjcsMzguMV0sWzE0LjksMzguMl0sWzE1LjEsMzguMV0sWzE1LjMsMzguMl0sWzE1LjYsMzguM10sWzE1LjYsMzguMl0sWzE1LjUsMzguMV1dXSxbW1s5LjUsNDEuMV0sWzkuNiw0MV0sWzkuNiw0MC45XSxbOS43LDQwLjddLFs5LjcsNDAuNl0sWzkuOCw0MC41XSxbOS43LDQwLjRdLFs5LjYsNDAuM10sWzkuNyw0MC4xXSxbOS43LDM5LjldLFs5LjcsMzkuN10sWzkuNiwzOS41XSxbOS42LDM5LjNdLFs5LjYsMzkuMV0sWzkuNCwzOS4xXSxbOS4zLDM5LjJdLFs5LDM5LjFdLFs4LjksMzguOV0sWzguNywzOC45XSxbOC42LDM5XSxbOC41LDM5XSxbOC4zLDM5LjFdLFs4LjQsMzkuMl0sWzguNCwzOS40XSxbOC40LDM5LjZdLFs4LjQsMzkuOF0sWzguNSwzOS43XSxbOC42LDM5LjldLFs4LjQsMzkuOV0sWzguNSw0MC4xXSxbOC41LDQwLjNdLFs4LjMsNDAuNl0sWzguMSw0MC42XSxbOC4xLDQwLjddLFs4LjMsNDAuOV0sWzguNCw0MC44XSxbOC42LDQwLjhdLFs4LjcsNDAuOV0sWzguOCw0MV0sWzksNDEuMV0sWzkuMiw0MS4yXSxbOS41LDQxLjFdXV0sW10sW10sW10sW11dLFwidHlwZVwiOlwiTXVsdGlQb2x5Z29uXCJ9LFwidHlwZVwiOlwiRmVhdHVyZVwiLFwicHJvcGVydGllc1wiOntcImlzbzJcIjpcIklUXCIsXCJsbmdcIjoxMi44LFwibGF0XCI6NDIuOH19LHtcImdlb21ldHJ5XCI6e1wiY29vcmRpbmF0ZXNcIjpbXSxcInR5cGVcIjpcIlBvbHlnb25cIn0sXCJ0eXBlXCI6XCJGZWF0dXJlXCIsXCJwcm9wZXJ0aWVzXCI6e1wiaXNvMlwiOlwiTElcIixcImxuZ1wiOjkuNSxcImxhdFwiOjQ3LjN9fSx7XCJnZW9tZXRyeVwiOntcImNvb3JkaW5hdGVzXCI6W1tbWzI1LDU2LjNdLFsyNS4zLDU2LjJdLFsyNS43LDU2LjFdLFsyNi4xLDU1LjldLFsyNi4zLDU1LjhdLFsyNi41LDU1LjddLFsyNi41LDU1LjRdLFsyNi44LDU1LjNdLFsyNi41LDU1LjJdLFsyNi4yLDU1XSxbMjUuOSw1NC45XSxbMjUuNyw1NC43XSxbMjUuNyw1NC41XSxbMjUuNSw1NC4zXSxbMjUuOCw1NC4zXSxbMjUuNiw1NC4xXSxbMjUuNiw1NC4yXSxbMjUuMiw1NC4yXSxbMjUsNTQuMl0sWzI0LjgsNTRdLFsyNC41LDU0XSxbMjQuMyw1My45XSxbMjQuMSw1NF0sWzIzLjksNTMuOV0sWzIzLjYsNTMuOV0sWzIzLjUsNTQuMV0sWzIzLjMsNTQuMl0sWzIzLDU0LjRdLFsyMi43LDU0LjRdLFsyMi44LDU0LjhdLFsyMi44LDU0LjldLFsyMi41LDU1LjFdLFsyMi4xLDU1LjFdLFsyMS43LDU1LjJdLFsyMS4zLDU1LjNdLFsyMS4yLDU1LjRdLFsyMS4yLDU1LjZdLFsyMSw1NS45XSxbMjEuMSw1Ni4xXSxbMjEuMyw1Ni4yXSxbMjEuNyw1Ni4zXSxbMjIuMSw1Ni40XSxbMjIuNSw1Ni40XSxbMjIuOCw1Ni40XSxbMjMsNTYuM10sWzIzLjIsNTYuNF0sWzIzLjQsNTYuM10sWzIzLjYsNTYuNF0sWzI0LDU2LjNdLFsyNC4zLDU2LjNdLFsyNC42LDU2LjNdLFsyNC45LDU2LjVdLFsyNSw1Ni4zXV1dLFtdXSxcInR5cGVcIjpcIk11bHRpUG9seWdvblwifSxcInR5cGVcIjpcIkZlYXR1cmVcIixcInByb3BlcnRpZXNcIjp7XCJpc28yXCI6XCJMVFwiLFwibG5nXCI6MjQsXCJsYXRcIjo1Nn19LHtcImdlb21ldHJ5XCI6e1wiY29vcmRpbmF0ZXNcIjpbW1s2LDUwLjJdLFs2LjEsNTAuMV0sWzYuMSw1MF0sWzYuMiw1MF0sWzYuMiw0OS45XSxbNi4zLDQ5LjldLFs2LjMsNDkuOF0sWzYuNCw0OS44XSxbNi41LDQ5LjhdLFs2LjUsNDkuN10sWzYuNCw0OS43XSxbNi40LDQ5LjVdLFs2LjMsNDkuNV0sWzYuMiw0OS41XSxbNi4xLDQ5LjVdLFs2LDQ5LjRdLFs1LjksNDkuNV0sWzUuOCw0OS41XSxbNS44LDQ5LjZdLFs1LjksNDkuNl0sWzUuOSw0OS43XSxbNS44LDQ5LjhdLFs1LjcsNDkuOF0sWzUuNyw0OS45XSxbNS44LDUwXSxbNS45LDUwLjFdLFs2LDUwLjJdXV0sXCJ0eXBlXCI6XCJQb2x5Z29uXCJ9LFwidHlwZVwiOlwiRmVhdHVyZVwiLFwicHJvcGVydGllc1wiOntcImlzbzJcIjpcIkxVXCIsXCJsbmdcIjo2LjIsXCJsYXRcIjo0OS44fX0se1wiZ2VvbWV0cnlcIjp7XCJjb29yZGluYXRlc1wiOltbWzIxLjEsNTYuNF0sWzIxLDU2LjddLFsyMS4xLDU2LjldLFsyMS40LDU3XSxbMjEuNCw1Ny4zXSxbMjEuNiw1Ny41XSxbMjEuOCw1Ny42XSxbMjIuMSw1Ny42XSxbMjIuNiw1Ny44XSxbMjIuNyw1Ny42XSxbMjIuOSw1Ny40XSxbMjMuMiw1Ny4zXSxbMjMuMyw1Ny4xXSxbMjMuNyw1N10sWzI0LDU3XSxbMjQuNCw1Ny4zXSxbMjQuMyw1Ny43XSxbMjQuNCw1Ny45XSxbMjQuNiw1OF0sWzI1LDU4LjFdLFsyNS4yLDU4XSxbMjUuNCw1OF0sWzI1LjgsNTcuOV0sWzI2LjIsNTcuN10sWzI2LjYsNTcuNV0sWzI2LjksNTcuNl0sWzI3LjMsNTcuNV0sWzI3LjUsNTcuNF0sWzI3LjgsNTcuM10sWzI3LjgsNTcuMl0sWzI3LjgsNTYuOV0sWzI3LjksNTYuN10sWzI4LjIsNTYuNF0sWzI4LjEsNTYuMl0sWzI3LjcsNTZdLFsyNy42LDU1LjhdLFsyNy4yLDU1LjhdLFsyNi45LDU1LjhdLFsyNi43LDU1LjddLFsyNi40LDU1LjddLFsyNi4yLDU1LjhdLFsyNiw1Nl0sWzI1LjYsNTYuMl0sWzI1LjIsNTYuMl0sWzI1LDU2LjRdLFsyNC43LDU2LjRdLFsyNC40LDU2LjNdLFsyNC4xLDU2LjNdLFsyMy43LDU2LjRdLFsyMy41LDU2LjNdLFsyMy4zLDU2LjRdLFsyMy4xLDU2LjNdLFsyMi45LDU2LjRdLFsyMi42LDU2LjRdLFsyMi4yLDU2LjRdLFsyMS45LDU2LjRdLFsyMS40LDU2LjJdLFsyMS4yLDU2LjFdLFsyMSw1Ni4yXSxbMjEuMSw1Ni40XV1dLFwidHlwZVwiOlwiUG9seWdvblwifSxcInR5cGVcIjpcIkZlYXR1cmVcIixcInByb3BlcnRpZXNcIjp7XCJpc28yXCI6XCJMVlwiLFwibG5nXCI6MjUsXCJsYXRcIjo1N319LHtcImdlb21ldHJ5XCI6e1wiY29vcmRpbmF0ZXNcIjpbXSxcInR5cGVcIjpcIlBvbHlnb25cIn0sXCJ0eXBlXCI6XCJGZWF0dXJlXCIsXCJwcm9wZXJ0aWVzXCI6e1wiaXNvMlwiOlwiTUNcIixcImxuZ1wiOjcuNCxcImxhdFwiOjQzLjd9fSx7XCJnZW9tZXRyeVwiOntcImNvb3JkaW5hdGVzXCI6W1tbMjguMSw0Ni45XSxbMjgsNDddLFsyNy45LDQ3LjFdLFsyNy43LDQ3LjNdLFsyNy42LDQ3LjRdLFsyNy40LDQ3LjZdLFsyNy4zLDQ3LjddLFsyNy4yLDQ3LjldLFsyNyw0OC4yXSxbMjYuNyw0OC4zXSxbMjYuOCw0OC4zXSxbMjcuMiw0OC40XSxbMjcuNSw0OC41XSxbMjcuOCw0OC40XSxbMjcuOSw0OC4zXSxbMjguMSw0OC4zXSxbMjguMiw0OC4yXSxbMjguNCw0OC4yXSxbMjguNSw0OC4xXSxbMjguNyw0OC4xXSxbMjguOSw0OF0sWzI5LjEsNDcuOV0sWzI5LjIsNDhdLFsyOS4yLDQ3LjZdLFsyOS4xLDQ3LjVdLFsyOS4yLDQ3LjVdLFsyOS4zLDQ3LjRdLFsyOS40LDQ3LjNdLFsyOS42LDQ3LjNdLFsyOS42LDQ3XSxbMjkuNyw0Ni45XSxbMjkuOSw0Ni44XSxbMzAsNDYuNl0sWzI5LjksNDYuNV0sWzMwLDQ2LjRdLFsyOS45LDQ2LjRdLFsyOS44LDQ2LjRdLFsyOS42LDQ2LjRdLFsyOS41LDQ2LjVdLFsyOS4zLDQ2LjRdLFsyOS4yLDQ2LjVdLFsyOC45LDQ2LjRdLFsyOSw0Ni4yXSxbMjguOSw0Nl0sWzI4LjcsNDZdLFsyOC44LDQ1LjldLFsyOC43LDQ1LjhdLFsyOC41LDQ1LjddLFsyOC41LDQ1LjVdLFsyOC4zLDQ1LjVdLFsyOC4yLDQ1LjRdLFsyOC4yLDQ1LjZdLFsyOC4xLDQ1LjldLFsyOC4xLDQ2LjFdLFsyOC4yLDQ2LjNdLFsyOC4zLDQ2LjRdLFsyOC4yLDQ2LjddLFsyOC4xLDQ2LjldXV0sXCJ0eXBlXCI6XCJQb2x5Z29uXCJ9LFwidHlwZVwiOlwiRmVhdHVyZVwiLFwicHJvcGVydGllc1wiOntcImlzbzJcIjpcIk1EXCIsXCJsbmdcIjoyOSxcImxhdFwiOjQ3fX0se1wiZ2VvbWV0cnlcIjp7XCJjb29yZGluYXRlc1wiOltbWzE4LjUsNDIuNl0sWzE4LjYsNDIuN10sWzE4LjUsNDIuOF0sWzE4LjYsNDNdLFsxOC43LDQzLjFdLFsxOC43LDQzLjNdLFsxOC45LDQzLjRdLFsxOSw0My4yXSxbMTkuMSw0My4zXSxbMTksNDMuNV0sWzE5LDQzLjZdLFsxOS4zLDQzLjVdLFsxOS40LDQzLjRdLFsxOS42LDQzLjNdLFsxOS43LDQzLjJdLFsxOS45LDQzLjFdLFsyMCw0M10sWzIwLjIsNDNdLFsyMC40LDQyLjhdLFsyMC4xLDQyLjhdLFsyMCw0Mi43XSxbMjAuMSw0Mi42XSxbMTkuOSw0Mi41XSxbMTkuNyw0Mi41XSxbMTkuNyw0Mi43XSxbMTkuNiw0Mi42XSxbMTkuNSw0Mi40XSxbMTkuNCw0Mi4xXSxbMTkuMyw0MS45XSxbMTkuMiw0MS45XSxbMTkuMSw0Ml0sWzE5LDQyLjFdLFsxOC45LDQyLjNdLFsxOC43LDQyLjRdLFsxOC41LDQyLjRdLFsxOC41LDQyLjVdLFsxOC41LDQyLjZdXV0sXCJ0eXBlXCI6XCJQb2x5Z29uXCJ9LFwidHlwZVwiOlwiRmVhdHVyZVwiLFwicHJvcGVydGllc1wiOntcImlzbzJcIjpcIk1FXCIsXCJsbmdcIjoxOS4zLFwibGF0XCI6NDIuNX19LHtcImdlb21ldHJ5XCI6e1wiY29vcmRpbmF0ZXNcIjpbW1syMC44LDQwLjldLFsyMC43LDQxLjFdLFsyMC42LDQxLjJdLFsyMC41LDQxLjNdLFsyMC42LDQxLjRdLFsyMC41LDQxLjZdLFsyMC41LDQxLjhdLFsyMC43LDQxLjldLFsyMC44LDQyXSxbMjAuOSw0Mi4xXSxbMjEuMiw0Mi4xXSxbMjEuMyw0Mi4yXSxbMjEuNiw0Mi4zXSxbMjEuOCw0Mi4zXSxbMjIsNDIuM10sWzIyLjIsNDIuM10sWzIyLjQsNDIuM10sWzIyLjUsNDIuMV0sWzIyLjcsNDIuMV0sWzIyLjksNDEuOV0sWzIzLDQxLjhdLFsyMyw0MS42XSxbMjMsNDEuNF0sWzIyLjgsNDEuM10sWzIyLjcsNDEuMl0sWzIyLjYsNDEuMV0sWzIyLjQsNDEuMV0sWzIyLjMsNDEuMl0sWzIyLDQxLjFdLFsyMS45LDQxXSxbMjEuNiw0MC45XSxbMjEuNCw0MC45XSxbMjEuMiw0MC45XSxbMjEsNDAuOV0sWzIwLjgsNDAuOV1dXSxcInR5cGVcIjpcIlBvbHlnb25cIn0sXCJ0eXBlXCI6XCJGZWF0dXJlXCIsXCJwcm9wZXJ0aWVzXCI6e1wiaXNvMlwiOlwiTUtcIixcImxuZ1wiOjIyLFwibGF0XCI6NDEuOH19LHtcImdlb21ldHJ5XCI6e1wiY29vcmRpbmF0ZXNcIjpbW10sW11dLFwidHlwZVwiOlwiTXVsdGlQb2x5Z29uXCJ9LFwidHlwZVwiOlwiRmVhdHVyZVwiLFwicHJvcGVydGllc1wiOntcImlzbzJcIjpcIk1UXCIsXCJsbmdcIjoxNC42LFwibGF0XCI6MzUuOH19LHtcImdlb21ldHJ5XCI6e1wiY29vcmRpbmF0ZXNcIjpbW1tbNi45LDUzLjRdLFs3LjIsNTNdLFs3LjEsNTIuN10sWzYuOSw1Mi43XSxbNi43LDUyLjVdLFs3LDUyLjVdLFs3LjEsNTIuMl0sWzYuOCw1Mi4xXSxbNi44LDUxLjldLFs2LjQsNTEuOF0sWzYsNTEuN10sWzYuMiw1MS40XSxbNiw1MS4xXSxbNi4xLDUwLjldLFs1LjksNTAuOF0sWzUuNiw1MC45XSxbNS45LDUxLjJdLFs1LjUsNTEuM10sWzUuMSw1MS4zXSxbNSw1MS40XSxbNC43LDUxLjVdLFs0LjUsNTEuNV0sWzQuMyw1MS40XSxbMy44LDUxLjRdLFszLjUsNTEuNl0sWzMuOSw1MS42XSxbNC4xLDUxLjVdLFs0LjEsNTEuNl0sWzMuNyw1MS43XSxbNC4xLDUxLjhdLFs0LDUyXSxbNC41LDUyLjNdLFs0LjcsNTIuNV0sWzUsNTIuNF0sWzUuNCw1Mi4zXSxbNS42LDUyLjRdLFs1LjksNTIuNV0sWzUuNiw1Mi43XSxbNS42LDUyLjldLFs1LjMsNTMuMV0sWzUuMSw1Mi44XSxbNS4yLDUyLjddLFs1LjEsNTIuNV0sWzQuNyw1Mi44XSxbNC44LDUyLjldLFs1LjUsNTMuMl0sWzYuMSw1My40XSxbNi43LDUzLjVdLFs2LjksNTMuNF1dXSxbW1szLjgsNTEuM10sWzMuOSw1MS4zXSxbNCw1MS40XSxbNC4yLDUxLjRdLFs0LjIsNTEuM10sWzQuMSw1MS4zXSxbNCw1MS4yXSxbMy45LDUxLjJdLFszLjgsNTEuMl0sWzMuNyw1MS4zXSxbMy42LDUxLjNdLFszLjUsNTEuM10sWzMuNSw1MS4yXSxbMy40LDUxLjJdLFszLjQsNTEuM10sWzMuNCw1MS40XSxbMy41LDUxLjRdLFszLjYsNTEuNF0sWzMuNyw1MS40XSxbMy44LDUxLjNdXV0sW1tbNS44LDUyLjRdLFs1LjcsNTIuNF0sWzUuNiw1Mi40XSxbNS41LDUyLjRdLFs1LjUsNTIuM10sWzUuNiw1Mi4zXSxbNS40LDUyLjNdLFs1LjMsNTIuM10sWzUuMiw1Mi4zXSxbNS4xLDUyLjNdLFs1LjEsNTIuNF0sWzUuMiw1Mi40XSxbNS4zLDUyLjVdLFs1LjQsNTIuNV0sWzUuNSw1Mi41XSxbNS42LDUyLjZdLFs1LjgsNTIuNl0sWzUuOSw1Mi41XSxbNS44LDUyLjVdLFs1LjgsNTIuNF1dXSxbXSxbXSxbXSxbXV0sXCJ0eXBlXCI6XCJNdWx0aVBvbHlnb25cIn0sXCJ0eXBlXCI6XCJGZWF0dXJlXCIsXCJwcm9wZXJ0aWVzXCI6e1wiaXNvMlwiOlwiTkxcIixcImxuZ1wiOjUuOCxcImxhdFwiOjUyLjV9fSx7XCJnZW9tZXRyeVwiOntcImNvb3JkaW5hdGVzXCI6W1tbWzUuMyw2MS42XSxbNS4yLDYxLjldLFs2LjMsNjIuNF0sWzYuNCw2Mi41XSxbNy42LDYyLjhdLFs4LjMsNjIuOF0sWzguOCw2My4zXSxbMTAuNiw2My40XSxbMTEsNjRdLFs5LjYsNjMuN10sWzEwLjksNjQuNl0sWzExLjIsNjQuN10sWzEyLjQsNjUuM10sWzEyLjksNjYuMV0sWzEzLDY2LjRdLFsxMy44LDY2LjldLFsxNS41LDY3LjJdLFsxNS41LDY3LjRdLFsxNSw2Ny44XSxbMTYsNjguMl0sWzE2LjQsNjguM10sWzE3LjEsNjguNV0sWzE3LjcsNjkuMV0sWzE5LjIsNjkuM10sWzE5LjcsNjkuNF0sWzIwLjgsNjkuOF0sWzIxLjUsNzAuMV0sWzIyLjcsNzAuMV0sWzI0LjIsNzAuNl0sWzI1LjMsNzAuOV0sWzI1LjMsNzAuMV0sWzI2LjYsNzAuNF0sWzI3LjcsNzEuMV0sWzI4LjMsNzAuN10sWzI5LjMsNzAuN10sWzMwLjcsNzAuM10sWzI5LjcsNjkuOV0sWzMwLjksNjkuNV0sWzI5LjEsNjkuNF0sWzI2LjIsNjkuOF0sWzI0LjQsNjguN10sWzIxLjcsNjkuM10sWzE5LjksNjguM10sWzE2LjEsNjcuNF0sWzE0LjMsNjUuMV0sWzEyLjMsNjMuN10sWzEyLjgsNjEuNF0sWzExLjksNTkuOF0sWzEwLjYsNTkuOV0sWzEwLDU5XSxbNy4yLDU4XSxbNS42LDU5XSxbNi41LDU5LjNdLFs1LjIsNTkuNV0sWzYuMiw2MC4zXSxbNS43LDYwLjRdLFs1LDYwLjhdLFs2LjMsNjEuMV0sWzYuNyw2MS40XSxbNS4zLDYxLjZdXV0sW1tbMTYsNjguOF0sWzE2LDY4LjddLFsxNS45LDY4LjddLFsxNS45LDY4LjZdLFsxNS44LDY4LjZdLFsxNS43LDY4LjVdLFsxNS44LDY4LjVdLFsxNi4xLDY4LjddLFsxNi4xLDY4LjhdLFsxNi4yLDY4LjldLFsxNi40LDY4LjldLFsxNi40LDY4LjhdLFsxNi41LDY4LjhdLFsxNi42LDY4LjddLFsxNi42LDY4LjZdLFsxNi41LDY4LjZdLFsxNi40LDY4LjZdLFsxNi4zLDY4LjZdLFsxNi4yLDY4LjVdLFsxNi4xLDY4LjVdLFsxNiw2OC41XSxbMTYsNjguNF0sWzE1LjksNjguNF0sWzE1LjgsNjguNF0sWzE1LjcsNjguM10sWzE1LjYsNjguM10sWzE1LjUsNjguM10sWzE1LjQsNjguM10sWzE1LjMsNjguM10sWzE1LjQsNjguNF0sWzE1LjUsNjguNF0sWzE1LjYsNjguNV0sWzE1LjUsNjguNV0sWzE1LjMsNjguNF0sWzE1LjIsNjguM10sWzE1LjEsNjguM10sWzE1LDY4LjJdLFsxNSw2OC4zXSxbMTUuMSw2OC40XSxbMTUuMiw2OC41XSxbMTUuMyw2OC41XSxbMTUuMiw2OC42XSxbMTUuMyw2OC42XSxbMTUuNCw2OC42XSxbMTUuNSw2OC43XSxbMTUuNCw2OC43XSxbMTUuNiw2OC43XSxbMTUuNyw2OC43XSxbMTUuNSw2OC44XSxbMTUuNiw2OC45XSxbMTUuNyw2OV0sWzE1LjksNjldLFsxNS45LDY4LjldLFsxNS45LDY4LjhdLFsxNiw2OC44XV1dLFtbWzE3LjYsNjkuNV0sWzE3LjcsNjkuNV0sWzE3LjcsNjkuNl0sWzE3LjgsNjkuNl0sWzE3LjksNjkuNl0sWzE4LDY5LjVdLFsxOC4xLDY5LjRdLFsxOC4xLDY5LjNdLFsxOCw2OS4zXSxbMTcuOSw2OS4zXSxbMTcuOSw2OS4yXSxbMTgsNjkuMl0sWzE3LjYsNjkuMl0sWzE3LjUsNjkuMl0sWzE3LjQsNjkuMl0sWzE3LjIsNjkuMV0sWzE3LjIsNjldLFsxNy4xLDY5XSxbMTcsNjldLFsxNy4xLDY5LjFdLFsxNyw2OS4xXSxbMTYuOSw2OS4xXSxbMTYuOCw2OV0sWzE2LjgsNjkuMV0sWzE3LjEsNjkuMl0sWzE3LjIsNjkuMl0sWzE3LDY5LjJdLFsxNi45LDY5LjJdLFsxNy4xLDY5LjNdLFsxNyw2OS4zXSxbMTYuOSw2OS4zXSxbMTcsNjkuNF0sWzE2LjksNjkuNF0sWzE3LjIsNjkuNF0sWzE3LjMsNjkuNF0sWzE3LjQsNjkuNF0sWzE3LjUsNjkuNF0sWzE3LjIsNjkuNV0sWzE3LjMsNjkuNV0sWzE3LjQsNjkuNV0sWzE3LjUsNjkuNV0sWzE3LjUsNjkuNl0sWzE3LjYsNjkuNl0sWzE3LjYsNjkuNV1dXSxbW1syMy41LDcwLjhdLFsyMy40LDcwLjddLFsyMy4zLDcwLjddLFsyMy4yLDcwLjddLFsyMy4xLDcwLjZdLFsyMi45LDcwLjVdLFsyMi44LDcwLjVdLFsyMi44LDcwLjZdLFsyMi43LDcwLjZdLFsyMi42LDcwLjZdLFsyMi42LDcwLjVdLFsyMi41LDcwLjVdLFsyMi4zLDcwLjVdLFsyMi4yLDcwLjVdLFsyMi4xLDcwLjVdLFsyMi4zLDcwLjZdLFsyMi4yLDcwLjZdLFsyMi4xLDcwLjZdLFsyMiw3MC42XSxbMjEuOSw3MC42XSxbMjIsNzAuN10sWzIyLjEsNzAuN10sWzIyLjMsNzAuN10sWzIyLjQsNzAuN10sWzIyLjUsNzAuN10sWzIyLjYsNzAuN10sWzIyLjcsNzAuN10sWzIyLjgsNzAuN10sWzIyLjgsNzAuOF0sWzIyLjksNzAuN10sWzIzLDcwLjddLFsyMy4xLDcwLjddLFsyMy4yLDcwLjhdLFsyMy4zLDcwLjhdLFsyMy4zLDcwLjldLFsyMy40LDcwLjldLFsyMy40LDcwLjhdLFsyMy41LDcwLjhdXV0sW1tbMTUuNCw2OC44XSxbMTUuNCw2OC43XSxbMTUuMyw2OC42XSxbMTUuMSw2OC42XSxbMTUsNjguNl0sWzE0LjksNjguNl0sWzE0LjgsNjguNl0sWzE0LjksNjguN10sWzE1LjEsNjguN10sWzE1LjIsNjguN10sWzE1LjEsNjguOF0sWzE1LDY4LjhdLFsxNSw2OC43XSxbMTQuOCw2OC43XSxbMTQuNyw2OC43XSxbMTQuNSw2OC42XSxbMTQuNCw2OC42XSxbMTQuNCw2OC43XSxbMTQuNCw2OC44XSxbMTQuNSw2OC44XSxbMTQuNiw2OC44XSxbMTQuNyw2OC44XSxbMTQuOSw2OC44XSxbMTQuOSw2OC45XSxbMTUsNjguOV0sWzE1LjEsNjguOV0sWzE1LjIsNjguOF0sWzE1LDY5XSxbMTUuMSw2OV0sWzE1LjIsNjldLFsxNS4yLDY4LjldLFsxNS4zLDY4LjldLFsxNS40LDY4LjhdXV0sW1tbMTguOSw2OS43XSxbMTguOCw2OS43XSxbMTguOCw2OS42XSxbMTguNyw2OS42XSxbMTguNiw2OS42XSxbMTguNSw2OS42XSxbMTguNCw2OS41XSxbMTguMyw2OS41XSxbMTguMiw2OS41XSxbMTgsNjkuNl0sWzE4LjEsNjkuNl0sWzE4LjIsNjkuNl0sWzE4LjMsNjkuNl0sWzE4LjIsNjkuN10sWzE4LjMsNjkuN10sWzE4LjQsNjkuN10sWzE4LjYsNjkuN10sWzE4LjUsNjkuN10sWzE4LjMsNjkuOF0sWzE4LjQsNjkuOF0sWzE4LjUsNjkuOF0sWzE4LjYsNjkuOF0sWzE4LjcsNjkuN10sWzE4LjgsNjkuOF0sWzE4LjcsNjkuOF0sWzE4LjcsNjkuOV0sWzE4LjgsNjkuOV0sWzE5LDY5LjhdLFsxOS4xLDY5LjhdLFsxOSw2OS43XSxbMTguOSw2OS43XV1dLFtbWzE5LjMsNzBdLFsxOS40LDcwXSxbMTkuNSw3MF0sWzE5LjUsNzAuMV0sWzE5LjYsNzBdLFsxOS43LDcwXSxbMTkuNSw2OS45XSxbMTkuNCw2OS44XSxbMTkuMyw2OS44XSxbMTkuMiw2OS44XSxbMTkuMSw2OS44XSxbMTksNjkuOF0sWzE5LDY5LjldLFsxOC45LDY5LjldLFsxOC44LDY5LjldLFsxOC43LDY5LjldLFsxOC44LDcwXSxbMTguOSw3MF0sWzE5LDcwXSxbMTkuMSw3MF0sWzE5LjEsNzAuMV0sWzE5LjIsNzAuMV0sWzE5LjMsNzAuMV0sWzE5LjMsNzBdXV1dLFwidHlwZVwiOlwiTXVsdGlQb2x5Z29uXCJ9LFwidHlwZVwiOlwiRmVhdHVyZVwiLFwicHJvcGVydGllc1wiOntcImlzbzJcIjpcIk5PXCIsXCJsbmdcIjoxMCxcImxhdFwiOjYyfX0se1wiZ2VvbWV0cnlcIjp7XCJjb29yZGluYXRlc1wiOltbWzE4LjksNDkuNV0sWzE4LjUsNDkuOV0sWzE3LjksNTBdLFsxNy44LDUwLjJdLFsxNy4yLDUwLjNdLFsxNyw1MC4yXSxbMTYuNiw1MC4yXSxbMTYuMiw1MC40XSxbMTYuMSw1MC43XSxbMTUuNSw1MC44XSxbMTUsNTAuOV0sWzE1LDUxLjRdLFsxNC44LDUxLjZdLFsxNC44LDUyLjFdLFsxNC42LDUyLjVdLFsxNC4yLDUyLjhdLFsxNC40LDUzLjNdLFsxNC42LDUzLjhdLFsxNC4yLDUzLjldLFsxNSw1NC4xXSxbMTUuOCw1NC4yXSxbMTYuMyw1NC40XSxbMTYuOSw1NC42XSxbMTcuNCw1NC43XSxbMTcuOSw1NC44XSxbMTguNiw1NC43XSxbMTguNSw1NC42XSxbMTguOSw1NC40XSxbMTkuNCw1NC40XSxbMTkuMiw1NC4zXSxbMTkuOSw1NC40XSxbMjAuNyw1NC40XSxbMjEuNSw1NC4zXSxbMjIuMyw1NC4zXSxbMjIuOSw1NC40XSxbMjMuNSw1NC4yXSxbMjMuNiw1My42XSxbMjMuOSw1Mi44XSxbMjMuNCw1Mi41XSxbMjMuNiw1Mi4xXSxbMjMuNiw1MS43XSxbMjMuNyw1MS4yXSxbMjQuMSw1MC45XSxbMjQsNTAuNF0sWzIzLjUsNTAuMl0sWzIyLjcsNDkuNl0sWzIyLjksNDkuMV0sWzIyLjMsNDkuMV0sWzIxLjUsNDkuNF0sWzIwLjksNDkuM10sWzIwLjIsNDkuM10sWzE5LjgsNDkuM10sWzE5LjQsNDkuNl0sWzE4LjksNDkuNV1dXSxcInR5cGVcIjpcIlBvbHlnb25cIn0sXCJ0eXBlXCI6XCJGZWF0dXJlXCIsXCJwcm9wZXJ0aWVzXCI6e1wiaXNvMlwiOlwiUExcIixcImxuZ1wiOjIwLFwibGF0XCI6NTJ9fSx7XCJnZW9tZXRyeVwiOntcImNvb3JkaW5hdGVzXCI6W1tbWy04LjIsNDEuOV0sWy03LjksNDEuOV0sWy03LjYsNDEuOF0sWy03LjIsNDEuOV0sWy02LjksNDJdLFstNi42LDQyXSxbLTYuNSw0MS43XSxbLTYuMiw0MS42XSxbLTYuNCw0MS4zXSxbLTYuOCw0MS4xXSxbLTYuOCw0MC45XSxbLTYuOCw0MC40XSxbLTcsNDAuMV0sWy03LjEsMzkuN10sWy03LjQsMzkuNl0sWy03LjMsMzkuNF0sWy03LDM5LjFdLFstNy4yLDM4LjhdLFstNy4yLDM4LjNdLFstNywzOC4xXSxbLTcuMywzOF0sWy03LjQsMzcuN10sWy03LjQsMzcuM10sWy03LjYsMzcuMV0sWy04LjEsMzcuMV0sWy04LjcsMzcuMV0sWy05LDM3LjFdLFstOC44LDM3LjRdLFstOC44LDM3LjldLFstOC44LDM4LjNdLFstOC45LDM4LjVdLFstOS4yLDM4LjVdLFstOS4xLDM4LjZdLFstOSwzOC45XSxbLTkuNCwzOC43XSxbLTkuNCwzOC45XSxbLTkuMywzOS4yXSxbLTkuMywzOS40XSxbLTksMzkuN10sWy04LjksNDAuMV0sWy04LjgsNDAuNV0sWy04LjcsNDAuOF0sWy04LjcsNDEuMl0sWy04LjksNDEuN10sWy04LjcsNDJdLFstOC40LDQyLjFdLFstOC4xLDQyLjFdLFstOC4yLDQxLjldXV0sW1tbLTI1LjYsMzcuOF0sWy0yNS41LDM3LjhdLFstMjUuNCwzNy44XSxbLTI1LjQsMzcuOV0sWy0yNS4zLDM3LjldLFstMjUuMiwzNy45XSxbLTI1LjEsMzcuOF0sWy0yNS4yLDM3LjddLFstMjUuMywzNy43XSxbLTI1LjUsMzcuN10sWy0yNS42LDM3LjddLFstMjUuNywzNy43XSxbLTI1LjcsMzcuOF0sWy0yNS44LDM3LjhdLFstMjUuOSwzNy44XSxbLTI1LjksMzcuOV0sWy0yNS44LDM3LjldLFstMjUuNywzNy45XSxbLTI1LjYsMzcuOF1dXSxbXSxbXSxbXSxbXSxbXV0sXCJ0eXBlXCI6XCJNdWx0aVBvbHlnb25cIn0sXCJ0eXBlXCI6XCJGZWF0dXJlXCIsXCJwcm9wZXJ0aWVzXCI6e1wiaXNvMlwiOlwiUFRcIixcImxuZ1wiOi04LFwibGF0XCI6MzkuNX19LHtcImdlb21ldHJ5XCI6e1wiY29vcmRpbmF0ZXNcIjpbW1syMC43LDQ2LjJdLFsyMSw0Ni4yXSxbMjEuMyw0Ni42XSxbMjEuNyw0N10sWzIxLjksNDcuNF0sWzIyLjIsNDcuN10sWzIyLjcsNDcuOF0sWzIzLjEsNDguMV0sWzIzLjUsNDhdLFsyNC4yLDQ3LjldLFsyNC42LDQ3LjldLFsyNC45LDQ3LjddLFsyNS4yLDQ3LjldLFsyNS44LDQ4XSxbMjYuMyw0OC4xXSxbMjYuNyw0OC4zXSxbMjcuMiw0Ny44XSxbMjcuNiw0Ny40XSxbMjcuOSw0N10sWzI4LjIsNDYuN10sWzI4LjEsNDYuMl0sWzI4LjIsNDUuNl0sWzI4LjMsNDUuM10sWzI4LjgsNDUuM10sWzI5LjUsNDUuNF0sWzI5LjYsNDUuMl0sWzI5LjUsNDQuOF0sWzI5LDQ0LjhdLFsyOC45LDQ1XSxbMjguOCw0NC42XSxbMjguOSw0NC41XSxbMjguNiw0NC4yXSxbMjguNiw0My43XSxbMjguMSw0My44XSxbMjcuOCw0NF0sWzI3LjMsNDQuMV0sWzI2LjgsNDQuMV0sWzI2LjEsNDRdLFsyNS43LDQzLjddLFsyNS4zLDQzLjddLFsyNC43LDQzLjddLFsyNC40LDQzLjddLFsyMy44LDQzLjhdLFsyMy4zLDQzLjhdLFsyMi45LDQzLjldLFsyMi45LDQ0LjFdLFsyMi41LDQ0LjRdLFsyMi44LDQ0LjVdLFsyMi4zLDQ0LjddLFsyMS45LDQ0LjZdLFsyMS41LDQ0LjhdLFsyMS41LDQ1XSxbMjEuNCw0NS4yXSxbMjAuOCw0NS43XSxbMjAuNSw0NS45XSxbMjAuNiw0Ni4yXSxbMjAuNyw0Ni4yXV1dLFwidHlwZVwiOlwiUG9seWdvblwifSxcInR5cGVcIjpcIkZlYXR1cmVcIixcInByb3BlcnRpZXNcIjp7XCJpc28yXCI6XCJST1wiLFwibG5nXCI6MjUsXCJsYXRcIjo0Nn19LHtcImdlb21ldHJ5XCI6e1wiY29vcmRpbmF0ZXNcIjpbW1syMC4xLDQyLjZdLFsyMC4xLDQyLjhdLFsyMC4yLDQzXSxbMTkuOSw0My4xXSxbMTkuNiw0My4zXSxbMTkuMyw0My41XSxbMTkuNSw0My43XSxbMTkuMyw0NF0sWzE5LjYsNDRdLFsxOS4yLDQ0LjNdLFsxOS4yLDQ0LjZdLFsxOS4zLDQ0LjldLFsxOS4xLDQ1XSxbMTkuNCw0NS4yXSxbMTksNDUuNV0sWzE4LjksNDUuNl0sWzE4LjgsNDUuOV0sWzE5LjIsNDZdLFsxOS43LDQ2LjJdLFsyMCw0Ni4yXSxbMjAuMyw0Ni4xXSxbMjAuNyw0NS44XSxbMjAuOCw0NS42XSxbMjEuNCw0NS4yXSxbMjEuNCw0NV0sWzIxLjQsNDQuOV0sWzIxLjYsNDQuN10sWzIyLDQ0LjZdLFsyMi4zLDQ0LjddLFsyMi43LDQ0LjZdLFsyMi42LDQ0LjVdLFsyMi42LDQ0LjNdLFsyMi42LDQ0LjFdLFsyMi40LDQzLjddLFsyMi43LDQzLjRdLFsyMyw0My4yXSxbMjIuNSw0Mi45XSxbMjIuNSw0Mi41XSxbMjIuMyw0Mi40XSxbMjEuOSw0Mi4zXSxbMjEuNSw0Mi4zXSxbMjEuMSw0Mi4yXSxbMjAuOCw0MS45XSxbMjAuNSw0Mi4yXSxbMjAuMiw0Mi4zXSxbMjAuMSw0Mi42XV1dLFwidHlwZVwiOlwiUG9seWdvblwifSxcInR5cGVcIjpcIkZlYXR1cmVcIixcInByb3BlcnRpZXNcIjp7XCJpc28yXCI6XCJSU1wiLFwibG5nXCI6MjEsXCJsYXRcIjo0NH19LHtcImdlb21ldHJ5XCI6e1wiY29vcmRpbmF0ZXNcIjpbW1tbMTA0LjMsNzcuN10sWzExMC45LDc2LjhdLFsxMTAsNzQuNF0sWzExMC42LDczLjhdLFsxMTcsNzMuNl0sWzEyNy4zLDcxLjRdLFsxMzUuMyw3MS42XSxbMTQzLjEsNzIuN10sWzE0OC41LDcyLjNdLFsxNTksNzAuOV0sWzE2OC4yLDY5LjVdLFsxNzguMiw2OS40XSxbMTc3LDY0LjddLFsxNzMuNCw2MS42XSxbMTY0LjMsNjAuMV0sWzE2MS43LDU1LjZdLFsxNTUuOSw1NF0sWzE2NCw2MS40XSxbMTU5LjgsNjEuM10sWzE1Mi42LDU5XSxbMTQ0LjUsNTkuNF0sWzEzNi43LDUzLjhdLFsxNDEuMyw1Mi4zXSxbMTM1LDQzLjVdLFsxMzMuNSw0NS42XSxbMTI3LjUsNTAuMl0sWzEyMC41LDUxLjldLFsxMDkuNiw0OS4yXSxbOTguNyw1MS44XSxbODkuNyw0OS44XSxbODAuMyw1MC45XSxbNzEuMSw1NC4zXSxbNjEuNCw1NC4xXSxbNTcuOSw1MS4xXSxbNDguNyw1MC41XSxbNDcuNSw0NS41XSxbNDMuMSw0M10sWzM4LjQsNDYuN10sWzM3LjgsNTAuMV0sWzMxLjksNTRdLFsyOS41LDYwXSxbMjkuNiw2NS4zXSxbMzMsNjkuNV0sWzM4LjYsNjYuMV0sWzM0LjYsNjUuMl0sWzM5LjcsNjUuNV0sWzQ2LjUsNjhdLFs1Mi4zLDY4LjNdLFs1OSw2OC45XSxbNjcuMyw2OC43XSxbNzAuMiw3Mi45XSxbNzIuMyw2Ny4zXSxbNzQuNSw2OC43XSxbNzQsNjkuMV0sWzc4LDcxXSxbODIuOSw3MS43XSxbODAuNSw3My4yXSxbODYuNSw3NC4zXSxbOTMuMiw3NS44XSxbOTkuMSw3NS41XSxbMTA0LjMsNzcuN11dXSxbW1s2OC4zLDc3XSxbNjguOSw3Ni42XSxbNjcuNyw3Ni4yXSxbNjYuNyw3Ni4xXSxbNjUuMiw3NS44XSxbNjQuMiw3NS43XSxbNjMuMiw3NS42XSxbNjIuMyw3NS40XSxbNjEuNCw3NS4yXSxbNjAuNyw3NS4xXSxbNjAuNSw3NV0sWzYwLjUsNzQuOV0sWzYwLjEsNzQuN10sWzU5LjksNzQuNl0sWzU5LjIsNzQuNl0sWzU4LjYsNzQuNV0sWzU4LjcsNzQuMl0sWzU4LjIsNzQuMV0sWzU3LjYsNzQuMl0sWzU3LjksNzMuOV0sWzU3LjMsNzMuOF0sWzU3LDczLjhdLFs1Nyw3My42XSxbNTcsNzMuNF0sWzU2LjYsNzMuM10sWzU1LjksNzMuNF0sWzU1LDczLjRdLFs1NC4xLDczLjRdLFs1NC41LDczLjZdLFs1NC40LDczLjddLFs1My42LDczLjddLFs1NC4yLDczLjldLFs1NC44LDc0LjFdLFs1NS45LDc0LjFdLFs1NS43LDc0LjNdLFs1Ni4zLDc0LjVdLFs1NS45LDc0LjddLFs1Nyw3NC43XSxbNTUuOSw3NC44XSxbNTYuNCw3NV0sWzU1LjgsNzUuMV0sWzU2LjMsNzUuMl0sWzU2LjksNzUuM10sWzU3LjUsNzUuM10sWzU4LDc1LjZdLFs1OC41LDc1LjhdLFs1OS40LDc1LjldLFs2MC4zLDc2XSxbNjAuNSw3Nl0sWzYwLjksNzYuMl0sWzYxLjgsNzYuM10sWzYyLjgsNzYuM10sWzYzLjcsNzYuM10sWzY0LjgsNzYuNV0sWzY1LjUsNzYuNl0sWzY1LjksNzYuN10sWzY2LjcsNzYuOV0sWzY3LjYsNzddLFs2OC4zLDc3XV1dLFtbWzk3LjYsODAuMl0sWzk4LDgwLjFdLFs5Ny42LDc5LjhdLFs5Ny4zLDc5LjddLFs5Ny43LDc5LjhdLFs5Ny45LDc5LjldLFs5OC4yLDc5LjldLFs5OC42LDgwXSxbOTguNSw4MC4xXSxbOTguOCw4MF0sWzk5LjEsODBdLFs5OS41LDc5LjldLFs5OS44LDc5LjldLFsxMDAsNzkuN10sWzk5LjcsNzkuNl0sWzk5LjcsNzkuM10sWzk5LjQsNzkuM10sWzk5LjEsNzkuM10sWzk5LjYsNzkuMl0sWzk5LjcsNzkuMV0sWzk5LjksNzldLFs5OS43LDc4LjldLFs5OS40LDc4LjhdLFs5OSw3OC44XSxbOTguNiw3OC44XSxbOTgsNzguOF0sWzk3LjYsNzguOF0sWzk3LjIsNzguOV0sWzk2LjksNzldLFs5Ni4zLDc5XSxbOTYuMSw3OV0sWzk1LjcsNzldLFs5NS43LDc5LjFdLFs5NS4zLDc5LjFdLFs5NSw3OV0sWzk0LjYsNzkuMl0sWzk0LjMsNzkuMl0sWzk0LjQsNzkuNF0sWzk0LjIsNzkuNV0sWzk0LjEsNzkuNF0sWzkzLjcsNzkuNV0sWzkzLjgsNzkuNl0sWzkzLjUsNzkuNV0sWzkzLjIsNzkuNF0sWzkzLjIsNzkuNV0sWzkyLjksNzkuNl0sWzkzLjgsNzkuN10sWzk0LjMsNzkuOF0sWzk0LjYsNzkuOF0sWzk0LjIsNzkuOV0sWzk0LjYsODBdLFs5NSw4MC4xXSxbOTUuMiw4MF0sWzk1LjQsODAuMV0sWzk2LDgwLjFdLFs5Ni40LDgwLjFdLFs5Ny4xLDgwLjJdLFs5Ny41LDgwLjJdLFs5Ny42LDgwLjJdXV0sW1tbLTE3OS42LDY4LjldLFstMTc5LjEsNjguOF0sWy0xNzguOCw2OC42XSxbLTE3OCw2OC4zXSxbLTE3OC40LDY4LjZdLFstMTc3LjQsNjguMl0sWy0xNzYuOCw2OC4xXSxbLTE3NS42LDY3LjhdLFstMTc1LjMsNjcuNF0sWy0xNzQuOCw2Ny40XSxbLTE3NC44LDY2LjddLFstMTc0LjUsNjYuNl0sWy0xNzQuMyw2Ni40XSxbLTE3NCw2Ni4yXSxbLTE3NC4xLDY2LjZdLFstMTc0LjQsNjddLFstMTc0LjIsNjcuMV0sWy0xNzMuNCw2Ny4xXSxbLTE3My40LDY2LjhdLFstMTcyLjYsNjYuOV0sWy0xNzMsNjcuMV0sWy0xNzEuNyw2N10sWy0xNzEuMyw2Ni43XSxbLTE3MC41LDY2LjNdLFstMTcwLjIsNjYuM10sWy0xNjkuOSw2Ni4xXSxbLTE3MCw2Nl0sWy0xNzAuNSw2NS43XSxbLTE3MS4zLDY1LjhdLFstMTcxLjEsNjUuNV0sWy0xNzEuOSw2NS41XSxbLTE3Mi4zLDY1LjZdLFstMTcyLjcsNjUuNl0sWy0xNzIuMyw2NS40XSxbLTE3Mi43LDY1LjJdLFstMTcyLjQsNjQuOV0sWy0xNzMuMiw2NC44XSxbLTE3My4xLDY0LjddLFstMTcyLjQsNjQuNF0sWy0xNzMsNjQuNV0sWy0xNzMuMyw2NC4zXSxbLTE3My40LDY0LjVdLFstMTc0LjEsNjQuNV0sWy0xNzUsNjQuOF0sWy0xNzUuOCw2NC45XSxbLTE3NS45LDY1LjRdLFstMTc2LjYsNjUuNl0sWy0xNzcuNSw2NS41XSxbLTE3OC42LDY1LjVdLFstMTc4LjksNjUuOV0sWy0xNzguNSw2Ni4zXSxbLTE3OS4xLDY2LjJdLFstMTc5LjIsNjYuMl0sWy0xNzkuNyw2Ni4yXSxbLTE3OS40LDY1LjZdLFstMTc5LjYsNjUuMl0sWy0xODAsNjYuMV0sWy0xNzkuNiw2OC45XV1dLFtbWzEyOC4xLDcyLjZdLFsxMjguNiw3Mi41XSxbMTI4LjcsNzIuNV0sWzEyOC44LDcyLjVdLFsxMjguOSw3Mi41XSxbMTI5LDcyLjVdLFsxMjkuMSw3Mi41XSxbMTI5LjIsNzIuNV0sWzEyOS4zLDcyLjVdLFsxMjkuMyw3Mi40XSxbMTI5LjQsNzIuNF0sWzEyOS41LDcyLjRdLFsxMjkuNSw3Mi4zXSxbMTI5LjQsNzIuM10sWzEyOS4zLDcyLjNdLFsxMjkuNSw3Mi4yXSxbMTI5LjYsNzIuMl0sWzEyOS40LDcyLjJdLFsxMjkuMiw3Mi4xXSxbMTI5LjMsNzIuMV0sWzEyOS40LDcyLjFdLFsxMjkuNSw3Mi4xXSxbMTI5LDcyLjFdLFsxMjguOSw3Mi4xXSxbMTI4LjgsNzIuMV0sWzEyOC43LDcyLjFdLFsxMjguNSw3Mi4xXSxbMTI4LjUsNzIuMl0sWzEyOC42LDcyLjJdLFsxMjguNCw3Mi4yXSxbMTI4LjIsNzIuMl0sWzEyOCw3Mi4zXSxbMTI3LjksNzIuM10sWzEyNy43LDcyLjRdLFsxMjcuNiw3Mi40XSxbMTI3LjUsNzIuNF0sWzEyNy40LDcyLjRdLFsxMjcuMyw3Mi40XSxbMTI3LjIsNzIuNF0sWzEyNy4xLDcyLjRdLFsxMjcsNzIuNF0sWzEyNi44LDcyLjRdLFsxMjYuNyw3Mi40XSxbMTI2LjYsNzIuNV0sWzEyNi43LDcyLjVdLFsxMjYuOCw3Mi41XSxbMTI2LjksNzIuNV0sWzEyNyw3Mi41XSxbMTI3LDcyLjZdLFsxMjcuMSw3Mi42XSxbMTI3LjIsNzIuNl0sWzEyNy4zLDcyLjZdLFsxMjcuNCw3Mi42XSxbMTI3LjUsNzIuNl0sWzEyNy43LDcyLjZdLFsxMjcuOCw3Mi42XSxbMTI4LDcyLjZdLFsxMjguMSw3Mi42XV1dLFtbWzEyNC42LDczLjddLFsxMjQuOCw3My43XSxbMTI1LDczLjZdLFsxMjUuMSw3My43XSxbMTI1LjIsNzMuN10sWzEyNS4yLDczLjVdLFsxMjUuNCw3My42XSxbMTI1LjUsNzMuNV0sWzEyNS42LDczLjRdLFsxMjUuOSw3My41XSxbMTI2LjIsNzMuNl0sWzEyNi4zLDczLjVdLFsxMjYuMyw3My40XSxbMTI2LjIsNzMuNF0sWzEyNi41LDczLjRdLFsxMjYuNiw3My4zXSxbMTI2LjcsNzMuMl0sWzEyNi42LDczXSxbMTI2LjQsNzNdLFsxMjYuMyw3Mi45XSxbMTI2LjQsNzIuOF0sWzEyNi4yLDcyLjVdLFsxMjYuMyw3Mi40XSxbMTI2LjEsNzIuM10sWzEyNS45LDcyLjRdLFsxMjUuNyw3Mi40XSxbMTI1LjUsNzIuNF0sWzEyNS4zLDcyLjVdLFsxMjUuMiw3Mi42XSxbMTI1LDcyLjZdLFsxMjQuOCw3Mi42XSxbMTI0LjcsNzIuN10sWzEyNC40LDcyLjddLFsxMjQuMiw3Mi44XSxbMTI0LDcyLjhdLFsxMjMuOCw3Mi44XSxbMTIzLjYsNzIuOF0sWzEyMy40LDcyLjhdLFsxMjMuMyw3Mi45XSxbMTIzLjEsNzIuOV0sWzEyMi45LDcyLjldLFsxMjIuNSw3Mi45XSxbMTIyLjQsNzNdLFsxMjIuNyw3M10sWzEyMi45LDczXSxbMTIzLjQsNzMuMl0sWzEyMy42LDczLjJdLFsxMjMuNCw3My4zXSxbMTIzLjIsNzMuNl0sWzEyMy40LDczLjZdLFsxMjMuNSw3My43XSxbMTIzLjcsNzMuNl0sWzEyMy45LDczLjddLFsxMjQsNzMuOF0sWzEyNCw3My43XSxbMTI0LjIsNzMuOF0sWzEyNC40LDczLjhdLFsxMjQuNiw3My43XV1dLFtbWzU0LjcsODEuMV0sWzU0LjksODEuMV0sWzU1LDgxLjFdLFs1NS4xLDgxLjFdLFs1NS4yLDgxLjFdLFs1NS4zLDgxXSxbNTUuNCw4MV0sWzU1LjUsODFdLFs1NS42LDgxXSxbNTUuOCw4MV0sWzU2LDgxXSxbNTYuMSw4MV0sWzU2LjQsODFdLFs1Ni42LDgxXSxbNTYuNiw4MC45XSxbNTYuNyw4MC45XSxbNTYuOCw4MC45XSxbNTYuOSw4MC45XSxbNTcsODAuOV0sWzU3LjEsODAuOV0sWzU3LjIsODAuOV0sWzU3LjMsODAuOV0sWzU3LjUsODAuOF0sWzU3LjYsODAuOF0sWzU3LjcsODAuOF0sWzU3LjUsODAuN10sWzU3LjQsODAuN10sWzU3LjMsODAuN10sWzU3LjIsODAuN10sWzU3LjEsODAuN10sWzU3LDgwLjddLFs1Ni45LDgwLjddLFs1Ni44LDgwLjhdLFs1Ni43LDgwLjhdLFs1Ni42LDgwLjhdLFs1Ni41LDgwLjhdLFs1Ni4zLDgwLjhdLFs1Ni4yLDgwLjhdLFs1Ni4xLDgwLjhdLFs1Niw4MC44XSxbNTUuOCw4MC45XSxbNTUuNyw4MC45XSxbNTUuNiw4MC45XSxbNTUuNSw4MC45XSxbNTUuNCw4MC45XSxbNTUuMiw4MV0sWzU1LjEsODFdLFs1NSw4MC45XSxbNTUsODFdLFs1NC45LDgxXSxbNTQuOCw4MV0sWzU0LjcsODFdLFs1NC42LDgxXSxbNTQuNSw4MV0sWzU0LjQsODFdLFs1NC42LDgxLjFdLFs1NC43LDgxLjFdXV1dLFwidHlwZVwiOlwiTXVsdGlQb2x5Z29uXCJ9LFwidHlwZVwiOlwiRmVhdHVyZVwiLFwicHJvcGVydGllc1wiOntcImlzbzJcIjpcIlJVXCIsXCJsbmdcIjoxMDAsXCJsYXRcIjo2MH19LHtcImdlb21ldHJ5XCI6e1wiY29vcmRpbmF0ZXNcIjpbW1tbMjEuOCw2OC42XSxbMjMsNjguM10sWzIzLjUsNjcuNl0sWzIzLjcsNjddLFsyMy43LDY2LjJdLFsyMy41LDY1LjhdLFsyMi40LDY1LjldLFsyMi4xLDY1LjVdLFsyMS42LDY1LjJdLFsyMS4yLDY0LjhdLFsyMS42LDY0LjRdLFsyMC40LDYzLjddLFsxOS41LDYzLjZdLFsxOC45LDYzLjJdLFsxNy45LDYyLjhdLFsxNy41LDYyLjRdLFsxNy41LDYyXSxbMTcuMiw2MS42XSxbMTcuNSw2MC42XSxbMTguNCw2MC4zXSxbMTkuMSw1OS44XSxbMTguMiw1OS40XSxbMTcuNyw1OS42XSxbMTcuNCw1OS41XSxbMTYuNSw1OS41XSxbMTcuMSw1OS40XSxbMTguNCw1OS4zXSxbMTcuOSw1OC45XSxbMTcuMSw1OC44XSxbMTYuMiw1OC42XSxbMTYuOCw1OC4yXSxbMTYuNyw1Ny43XSxbMTYuNiw1Ny4xXSxbMTYsNTYuM10sWzE0LjgsNTYuMV0sWzE0LjMsNTUuNl0sWzEzLjQsNTUuM10sWzEyLjcsNTYuMl0sWzEyLjgsNTYuNl0sWzEyLjIsNTcuM10sWzExLjcsNTcuOF0sWzExLjIsNTguM10sWzExLjQsNTkuMV0sWzExLjgsNTkuN10sWzEyLjYsNjAuNF0sWzEyLjYsNjEuMV0sWzEyLjMsNjIuMV0sWzEyLjIsNjNdLFsxMi43LDY0XSxbMTQuMSw2NC41XSxbMTQuNCw2NS4yXSxbMTUsNjYuMV0sWzE2LjIsNjcuM10sWzE3LjYsNjhdLFsxOC42LDY4LjVdLFsyMCw2OC41XSxbMjAuOCw2OV0sWzIxLjgsNjguNl1dXSxbW1sxOC4yLDU2LjldLFsxOC4xLDU2LjldLFsxOC4yLDU3XSxbMTguMyw1N10sWzE4LjMsNTcuMV0sWzE4LjIsNTcuMV0sWzE4LjEsNTcuMl0sWzE4LjIsNTcuM10sWzE4LjEsNTcuNF0sWzE4LjEsNTcuNV0sWzE4LjEsNTcuNl0sWzE4LjIsNTcuNl0sWzE4LjMsNTcuNl0sWzE4LjMsNTcuN10sWzE4LjQsNTcuN10sWzE4LjQsNTcuOF0sWzE4LjUsNTcuOF0sWzE4LjcsNTcuOV0sWzE4LjksNTcuOV0sWzE5LDU3LjldLFsxOSw1Ny44XSxbMTguOSw1Ny43XSxbMTguOCw1Ny43XSxbMTguOCw1Ny41XSxbMTguOCw1Ny40XSxbMTguNyw1Ny4yXSxbMTguNiw1Ny4yXSxbMTguNSw1Ny4yXSxbMTguNCw1Ny4yXSxbMTguNCw1Ny4xXSxbMTguMyw1Ni45XSxbMTguMiw1Ni45XV1dLFtbWzE2LjgsNTYuOF0sWzE2LjcsNTYuN10sWzE2LjYsNTYuNV0sWzE2LjYsNTYuNF0sWzE2LjYsNTYuM10sWzE2LjUsNTYuMl0sWzE2LjQsNTYuMl0sWzE2LjQsNTYuM10sWzE2LjQsNTYuNV0sWzE2LjQsNTYuNl0sWzE2LjUsNTYuOF0sWzE2LjYsNTYuOV0sWzE2LjcsNTYuOV0sWzE2LjgsNTcuMV0sWzE2LjksNTcuMV0sWzE3LDU3LjJdLFsxNyw1Ny4zXSxbMTcsNTcuNF0sWzE3LjEsNTcuNF0sWzE3LjEsNTcuM10sWzE3LjEsNTcuMl0sWzE3LDU3LjFdLFsxNi45LDU3XSxbMTYuOSw1Ni45XSxbMTYuOCw1Ni44XV1dLFtdLFtdLFtdLFtdXSxcInR5cGVcIjpcIk11bHRpUG9seWdvblwifSxcInR5cGVcIjpcIkZlYXR1cmVcIixcInByb3BlcnRpZXNcIjp7XCJpc28yXCI6XCJTRVwiLFwibG5nXCI6MTUsXCJsYXRcIjo2Mn19LHtcImdlb21ldHJ5XCI6e1wiY29vcmRpbmF0ZXNcIjpbW1sxMy43LDQ2LjVdLFsxMy45LDQ2LjVdLFsxNC4yLDQ2LjRdLFsxNC44LDQ2LjVdLFsxNC45LDQ2LjZdLFsxNS4xLDQ2LjddLFsxNS40LDQ2LjddLFsxNS44LDQ2LjddLFsxNiw0Ni44XSxbMTYuMiw0Ni45XSxbMTYuMyw0Ni44XSxbMTYuNCw0Ni43XSxbMTYuNiw0Ni41XSxbMTYuMyw0Ni41XSxbMTYuMyw0Ni40XSxbMTYuMSw0Ni4zXSxbMTUuOCw0Ni4yXSxbMTUuNiw0Ni4yXSxbMTUuNyw0Ni4xXSxbMTUuNyw0NS45XSxbMTUuNiw0NS44XSxbMTUuMyw0NS44XSxbMTUuNCw0NS43XSxbMTUuMyw0NS41XSxbMTUuMSw0NS41XSxbMTQuOSw0NS41XSxbMTQuNyw0NS41XSxbMTQuNiw0NS43XSxbMTQuNSw0NS41XSxbMTQuMSw0NS41XSxbMTMuOSw0NS41XSxbMTMuNiw0NS41XSxbMTMuOCw0NS41XSxbMTMuNyw0NS42XSxbMTMuOCw0NS43XSxbMTMuNyw0NS44XSxbMTMuNiw0NS45XSxbMTMuNSw0Nl0sWzEzLjYsNDYuMV0sWzEzLjcsNDYuMl0sWzEzLjUsNDYuMl0sWzEzLjQsNDYuM10sWzEzLjcsNDYuNF0sWzEzLjcsNDYuNV1dXSxcInR5cGVcIjpcIlBvbHlnb25cIn0sXCJ0eXBlXCI6XCJGZWF0dXJlXCIsXCJwcm9wZXJ0aWVzXCI6e1wiaXNvMlwiOlwiU0lcIixcImxuZ1wiOjE0LjgsXCJsYXRcIjo0Ni4xfX0se1wiZ2VvbWV0cnlcIjp7XCJjb29yZGluYXRlc1wiOltbWzE3LjMsNDhdLFsxNy4xLDQ4LjFdLFsxNyw0OC4zXSxbMTYuOSw0OC40XSxbMTcsNDguN10sWzE3LjIsNDguOV0sWzE3LjUsNDguOF0sWzE3LjgsNDguOV0sWzE4LjEsNDkuMV0sWzE4LjIsNDkuM10sWzE4LjUsNDkuNV0sWzE4LjgsNDkuNV0sWzE5LDQ5LjRdLFsxOS4zLDQ5LjVdLFsxOS41LDQ5LjVdLFsxOS44LDQ5LjRdLFsxOS45LDQ5LjJdLFsyMC4xLDQ5LjNdLFsyMC40LDQ5LjRdLFsyMC44LDQ5LjNdLFsyMSw0OS40XSxbMjEuNCw0OS40XSxbMjEuOCw0OS40XSxbMjIuMiw0OS4yXSxbMjIuNSw0OS4xXSxbMjIuNSw0OV0sWzIyLjQsNDguOF0sWzIyLjIsNDguNF0sWzIxLjksNDguNF0sWzIxLjcsNDguNF0sWzIxLjUsNDguNV0sWzIxLjIsNDguNV0sWzIwLjksNDguNV0sWzIwLjcsNDguNl0sWzIwLjQsNDguNF0sWzIwLjIsNDguM10sWzE5LjksNDguMV0sWzE5LjYsNDguMl0sWzE5LjIsNDguMV0sWzE4LjksNDguMV0sWzE4LjgsNDcuOV0sWzE4LjcsNDcuOF0sWzE4LjQsNDcuOF0sWzE4LjIsNDcuN10sWzE3LjksNDcuOF0sWzE3LjcsNDcuOF0sWzE3LjQsNDhdLFsxNy4zLDQ4XV1dLFwidHlwZVwiOlwiUG9seWdvblwifSxcInR5cGVcIjpcIkZlYXR1cmVcIixcInByb3BlcnRpZXNcIjp7XCJpc28yXCI6XCJTS1wiLFwibG5nXCI6MTkuNSxcImxhdFwiOjQ4Ljd9fSx7XCJnZW9tZXRyeVwiOntcImNvb3JkaW5hdGVzXCI6W10sXCJ0eXBlXCI6XCJQb2x5Z29uXCJ9LFwidHlwZVwiOlwiRmVhdHVyZVwiLFwicHJvcGVydGllc1wiOntcImlzbzJcIjpcIlNNXCIsXCJsbmdcIjoxMi40LFwibGF0XCI6NDMuOH19LHtcImdlb21ldHJ5XCI6e1wiY29vcmRpbmF0ZXNcIjpbW1tbMzUuMSw0Ml0sWzM2LjEsNDEuN10sWzM2LjYsNDEuNF0sWzM3LjQsNDEuMV0sWzM4LjIsNDAuOV0sWzM5LjEsNDEuMV0sWzQwLjMsNDFdLFs0MS40LDQxLjRdLFs0Mi4zLDQxLjVdLFs0My4yLDQxLjJdLFs0My43LDQwLjddLFs0NCw0MF0sWzQ0LjgsMzkuNl0sWzQ0LjIsMzldLFs0NC41LDM4LjNdLFs0NC42LDM3LjRdLFs0NC4yLDM3LjFdLFs0My41LDM3LjJdLFs0Mi40LDM3LjFdLFs0MS41LDM3LjFdLFs0MC4zLDM2LjldLFszOSwzNi43XSxbMzgsMzYuOF0sWzM3LDM2LjddLFszNi41LDM2LjJdLFszNiwzNS45XSxbMzYsMzYuNV0sWzM1LjcsMzYuOF0sWzM0LjksMzYuOF0sWzM0LDM2LjNdLFszMi44LDM2XSxbMzIsMzYuNV0sWzMwLjcsMzYuOV0sWzMwLjMsMzYuM10sWzI5LjMsMzYuMl0sWzI4LjksMzYuN10sWzI4LjIsMzYuN10sWzI3LjcsMzYuN10sWzI3LjgsMzddLFsyNy41LDM3LjFdLFsyNy4yLDM3LjVdLFsyNi44LDM4LjJdLFsyNi40LDM4LjNdLFsyNi41LDM4LjZdLFsyNywzOC41XSxbMjYuOCwzOV0sWzI3LDM5LjZdLFsyNi4yLDM5LjddLFsyNi43LDQwLjNdLFsyNy41LDQwLjNdLFsyOCw0MC40XSxbMjksNDAuNV0sWzI5LjYsNDAuN10sWzI5LjEsNDAuOV0sWzI5LjksNDEuMV0sWzMwLjksNDEuMV0sWzMyLDQxLjVdLFszMy4yLDQyXSxbMzQuMiw0Ml0sWzM1LjEsNDJdXV0sW1tbMjcuNCw0Ml0sWzI3LjYsNDJdLFsyNy44LDQyXSxbMjgsNDJdLFsyOCw0MS44XSxbMjguMiw0MS41XSxbMjguNSw0MS40XSxbMjguOSw0MS4zXSxbMjksNDEuM10sWzI5LjEsNDEuMl0sWzI5LDQxLjFdLFsyOC44LDQxXSxbMjguNiw0MS4xXSxbMjguNSw0MV0sWzI4LjQsNDEuMV0sWzI4LjEsNDEuMV0sWzI3LjksNDFdLFsyNy43LDQxXSxbMjcuNSw0MC45XSxbMjcuNCw0MC44XSxbMjcuMiw0MC42XSxbMjcsNDAuNl0sWzI2LjcsNDAuNV0sWzI2LjYsNDAuNF0sWzI2LjQsNDAuMl0sWzI2LjIsNDAuMV0sWzI2LjIsNDAuMl0sWzI2LjMsNDAuM10sWzI2LjQsNDAuNF0sWzI2LjYsNDAuNV0sWzI2LjgsNDAuN10sWzI2LjYsNDAuNl0sWzI2LjMsNDAuNl0sWzI2LjEsNDAuN10sWzI2LjEsNDAuOF0sWzI2LjIsNDAuOV0sWzI2LjQsNDFdLFsyNi4zLDQxLjJdLFsyNi42LDQxLjNdLFsyNi42LDQxLjVdLFsyNi41LDQxLjZdLFsyNi4zLDQxLjddLFsyNi40LDQxLjhdLFsyNi42LDQxLjldLFsyNi45LDQyXSxbMjcsNDIuMV0sWzI3LjIsNDIuMV0sWzI3LjQsNDIuMV0sWzI3LjQsNDJdXV0sW10sW10sW11dLFwidHlwZVwiOlwiTXVsdGlQb2x5Z29uXCJ9LFwidHlwZVwiOlwiRmVhdHVyZVwiLFwicHJvcGVydGllc1wiOntcImlzbzJcIjpcIlRSXCIsXCJsbmdcIjozNSxcImxhdFwiOjM5fX0se1wiZ2VvbWV0cnlcIjp7XCJjb29yZGluYXRlc1wiOltbW1szMy40LDUyLjRdLFszNC4yLDUxLjddLFszNS4xLDUxLjFdLFszNS41LDUwLjVdLFszNi41LDUwLjJdLFszNy43LDUwLjFdLFszOC43LDQ5LjldLFszOS41LDQ5LjhdLFs0MC4yLDQ5LjJdLFs0MCw0OC44XSxbMzkuOCw0Ny45XSxbMzguOCw0Ny45XSxbMzguMSw0Ny4xXSxbMzYuOCw0Ni44XSxbMzUuNSw0Ni41XSxbMzUsNDYuMl0sWzM0LjIsNDYuM10sWzM0LjEsNDUuOV0sWzM1LjEsNDUuNV0sWzM0LjcsNDYuMV0sWzM2LjEsNDUuNV0sWzM1LjksNDVdLFszNC43LDQ0LjhdLFszMy40LDQ0LjZdLFszMy4xLDQ1LjJdLFszMi44LDQ1LjZdLFszMy42LDQ2XSxbMzIuNSw0Ni4xXSxbMzEuNSw0Ni42XSxbMzIuMiw0Ni42XSxbMzEuOSw0Ny4xXSxbMzAuOSw0Ni42XSxbMjkuOSw0NS43XSxbMjkuNyw0NS4yXSxbMjguNCw0NS4zXSxbMjguOCw0NS45XSxbMjkuNCw0Ni41XSxbMzAsNDYuNl0sWzI5LjMsNDcuNV0sWzI4LjcsNDguMV0sWzI3LjgsNDguNV0sWzI2LjEsNDhdLFsyNC45LDQ3LjddLFsyMy44LDQ4XSxbMjIuNyw0OC4xXSxbMjIuNSw0OC45XSxbMjIuOCw0OS43XSxbMjQuMSw1MC43XSxbMjMuNyw1MS41XSxbMjQuOSw1MS45XSxbMjYuMiw1MS45XSxbMjcuMiw1MS43XSxbMjguMiw1MS43XSxbMjkuMiw1MS42XSxbMzAuMyw1MS40XSxbMzAuOSw1Mi4xXSxbMzIuMyw1Mi4xXSxbMzMuNCw1Mi40XV1dLFtdLFtdLFtdXSxcInR5cGVcIjpcIk11bHRpUG9seWdvblwifSxcInR5cGVcIjpcIkZlYXR1cmVcIixcInByb3BlcnRpZXNcIjp7XCJpc28yXCI6XCJVQVwiLFwibG5nXCI6MzIsXCJsYXRcIjo0OX19LHtcImdlb21ldHJ5XCI6e1wiY29vcmRpbmF0ZXNcIjpbW1s2NC40LDM5XSxbNjMuNywzOS4zXSxbNjIuOSwzOS43XSxbNjIuMyw0MC40XSxbNjEuNyw0MS4yXSxbNjAuOSw0MS4zXSxbNjAuMiw0MS4zXSxbNjAuMyw0MS44XSxbNTkuNCw0Mi4zXSxbNTguOCw0Mi43XSxbNTguMSw0Mi42XSxbNTcuOSw0Mi40XSxbNTcuNCw0Mi4yXSxbNTcsNDEuNV0sWzU2LjQsNDEuM10sWzU2LDQyLjhdLFs1Ni4zLDQ1LjFdLFs1OCw0NS41XSxbNjIsNDMuNV0sWzY0LDQzLjZdLFs2NS42LDQzLjJdLFs2Niw0Mi4zXSxbNjYuOSw0MS4xXSxbNjcuOSw0MS4yXSxbNjguMyw0MC43XSxbNjguOSw0MS4xXSxbNjkuNiw0MS43XSxbNzAuNSw0Mi4xXSxbNzEuMiw0Mi4yXSxbNzAuNSw0MS44XSxbNzAuNiw0MS41XSxbNzEuNCw0MS4zXSxbNzEuNiw0MS42XSxbNzIuMyw0MV0sWzczLjEsNDAuOF0sWzcyLjQsNDAuNF0sWzcxLjUsNDAuMl0sWzcwLjgsNDAuMl0sWzcwLjQsNDAuNV0sWzcwLjQsNDEuMV0sWzY5LjgsNDAuNl0sWzY5LjMsNDAuNl0sWzY4LjcsNDAuMl0sWzY4LjksNDBdLFs2OC41LDM5LjZdLFs2Ny40LDM5LjVdLFs2Ny45LDM5XSxbNjguMSwzOC40XSxbNjguMSwzNy44XSxbNjcuNywzNy4yXSxbNjYuOCwzNy40XSxbNjYuNywzOF0sWzY1LjgsMzguMl0sWzY0LjksMzguN10sWzY0LjQsMzldXV0sXCJ0eXBlXCI6XCJQb2x5Z29uXCJ9LFwidHlwZVwiOlwiRmVhdHVyZVwiLFwicHJvcGVydGllc1wiOntcImlzbzJcIjpcIlVaXCIsXCJsbmdcIjo2NCxcImxhdFwiOjQxfX0se1wiZ2VvbWV0cnlcIjp7XCJjb29yZGluYXRlc1wiOltdLFwidHlwZVwiOlwiUG9seWdvblwifSxcInR5cGVcIjpcIkZlYXR1cmVcIixcInByb3BlcnRpZXNcIjp7XCJpc28yXCI6XCJWQVwiLFwibG5nXCI6MTIuNCxcImxhdFwiOjQxLjl9fSx7XCJnZW9tZXRyeVwiOntcImNvb3JkaW5hdGVzXCI6W1tbMjAuOCw0Mi4xXSxbMjAuNyw0MS44XSxbMjAuNiw0MS45XSxbMjAuNSw0Mi4yXSxbMjAuMyw0Mi4zXSxbMjAuMSw0Mi42XSxbMjAuMyw0Mi44XSxbMjAuNSw0Mi45XSxbMjAuNiw0My4yXSxbMjAuOCw0My4zXSxbMjEsNDMuMV0sWzIxLjEsNDMuMV0sWzIxLjMsNDIuOV0sWzIxLjQsNDIuOV0sWzIxLjYsNDIuN10sWzIxLjgsNDIuN10sWzIxLjcsNDIuNF0sWzIxLjUsNDIuM10sWzIxLjYsNDIuMl0sWzIxLjQsNDIuMl0sWzIwLjgsNDIuMV1dXSxcInR5cGVcIjpcIlBvbHlnb25cIn0sXCJ0eXBlXCI6XCJGZWF0dXJlXCIsXCJwcm9wZXJ0aWVzXCI6e1wiaXNvMlwiOlwiWEtcIixcImxuZ1wiOjIxLjIsXCJsYXRcIjo0Mi43fX1dLFwidHlwZVwiOlwiRmVhdHVyZUNvbGxlY3Rpb25cIn07IiwiJ3VzZSBzdHJpY3QnO09iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCdfX2VzTW9kdWxlJyx7dmFsdWU6dHJ1ZX0pO2V4cG9ydHMubmV3RmlsdGVyU2V0dGluZ3M9ZXhwb3J0cy5zZXRmPXVuZGVmaW5lZDt2YXIgX3R5cGVvZj10eXBlb2YgU3ltYm9sPT09J2Z1bmN0aW9uJyYmdHlwZW9mIFN5bWJvbC5pdGVyYXRvcj09PSdzeW1ib2wnP2Z1bmN0aW9uKG9iail7cmV0dXJuIHR5cGVvZiBvYmp9OmZ1bmN0aW9uKG9iail7cmV0dXJuIG9iaiYmdHlwZW9mIFN5bWJvbD09PSdmdW5jdGlvbicmJm9iai5jb25zdHJ1Y3Rvcj09PVN5bWJvbCYmb2JqIT09U3ltYm9sLnByb3RvdHlwZT8nc3ltYm9sJzp0eXBlb2Ygb2JqfTt2YXIgX3NsaWNlZFRvQXJyYXk9ZnVuY3Rpb24oKXtmdW5jdGlvbiBzbGljZUl0ZXJhdG9yKGFycixpKXt2YXIgX2Fycj1bXTt2YXIgX249dHJ1ZTt2YXIgX2Q9ZmFsc2U7dmFyIF9lPXVuZGVmaW5lZDt0cnl7Zm9yKHZhciBfaT1hcnJbU3ltYm9sLml0ZXJhdG9yXSgpLF9zOyEoX249KF9zPV9pLm5leHQoKSkuZG9uZSk7X249dHJ1ZSl7X2Fyci5wdXNoKF9zLnZhbHVlKTtpZihpJiZfYXJyLmxlbmd0aD09PWkpYnJlYWt9fWNhdGNoKGVycil7X2Q9dHJ1ZTtfZT1lcnJ9ZmluYWxseXt0cnl7aWYoIV9uJiZfaVsncmV0dXJuJ10pX2lbJ3JldHVybiddKCl9ZmluYWxseXtpZihfZCl0aHJvdyBfZX19cmV0dXJuIF9hcnJ9cmV0dXJuIGZ1bmN0aW9uKGFycixpKXtpZihBcnJheS5pc0FycmF5KGFycikpe3JldHVybiBhcnJ9ZWxzZSBpZihTeW1ib2wuaXRlcmF0b3IgaW4gT2JqZWN0KGFycikpe3JldHVybiBzbGljZUl0ZXJhdG9yKGFycixpKX1lbHNle3Rocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2UnKX19fSgpO2V4cG9ydHMuY29tcGlsZUZpbHRlcmluZz1jb21waWxlRmlsdGVyaW5nO2V4cG9ydHMuY29tcHV0ZUZpbHRlcmluZz1jb21wdXRlRmlsdGVyaW5nO2V4cG9ydHMucGxhY2VGYWNldHM9cGxhY2VGYWNldHM7ZXhwb3J0cy50ZXN0QWxsQ2hlY2tzPXRlc3RBbGxDaGVja3M7dmFyIF9sb2NhbHN0b3JhZ2U9cmVxdWlyZSgnbG9jYWxzdG9yYWdlLmpzJyk7ZnVuY3Rpb24gX3RvQ29uc3VtYWJsZUFycmF5KGFycil7aWYoQXJyYXkuaXNBcnJheShhcnIpKXtmb3IodmFyIGk9MCxhcnIyPUFycmF5KGFyci5sZW5ndGgpO2k8YXJyLmxlbmd0aDtpKyspe2FycjJbaV09YXJyW2ldfXJldHVybiBhcnIyfWVsc2V7cmV0dXJuIEFycmF5LmZyb20oYXJyKX19dmFyIGluaXRmPWZ1bmN0aW9uIGluaXRmKHRhZyxrZXksZGVmYXVsdFZhbCl7dmFyIGxza2V5PSdmbHRfJyt0YWcrJy4nK2tleTtyZXR1cm4oMCxfbG9jYWxzdG9yYWdlLmxzSGFzKShsc2tleSk/KDAsX2xvY2Fsc3RvcmFnZS5sc0dldCkobHNrZXkpOmRlZmF1bHRWYWx9O3ZhciBzZXRmPWV4cG9ydHMuc2V0Zj1mdW5jdGlvbiBzZXRmKHRhZyxrZXksdmFsKXt2YXIgbHNrZXk9J2ZsdF8nK3RhZysnLicra2V5OygwLF9sb2NhbHN0b3JhZ2UubHNTZXQpKGxza2V5LHZhbCl9O2Z1bmN0aW9uIGNvbXBpbGVGaWx0ZXJpbmcocmVjb3JkcyxvcmRlcixmaWVsZHMsZmlsdGVyTGlzdCl7dmFyIHByZXNlbnRGaWx0ZXJMaXN0PWZpbHRlckxpc3QuZmlsdGVyKGZ1bmN0aW9uKHgpe3JldHVybiBmaWVsZHNbeC5maWVsZF19KTt2YXIgZmlsdGVyRmllbGRzPXByZXNlbnRGaWx0ZXJMaXN0LmZpbHRlcihmdW5jdGlvbih4KXtyZXR1cm4geC50eXBlIT09J0Z1bGxUZXh0J30pLm1hcChmdW5jdGlvbih4KXtyZXR1cm4geC5maWVsZH0pO3ZhciBmaWVsZFZhbHVlcz1uZXcgTWFwKGZpbHRlckZpZWxkcy5tYXAoZnVuY3Rpb24oZil7cmV0dXJuW2YsbmV3IE1hcChbWycnLCctbm9uZS0nXV0pXX0pKTt2YXIgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbj10cnVlO3ZhciBfZGlkSXRlcmF0b3JFcnJvcj1mYWxzZTt2YXIgX2l0ZXJhdG9yRXJyb3I9dW5kZWZpbmVkO3RyeXtmb3IodmFyIF9pdGVyYXRvcj1vcmRlcltTeW1ib2wuaXRlcmF0b3JdKCksX3N0ZXA7IShfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uPShfc3RlcD1faXRlcmF0b3IubmV4dCgpKS5kb25lKTtfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uPXRydWUpe3ZhciByaWQ9X3N0ZXAudmFsdWU7dmFyIHJvdz1yZWNvcmRzW3JpZF07dmFyIF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24yPXRydWU7dmFyIF9kaWRJdGVyYXRvckVycm9yMj1mYWxzZTt2YXIgX2l0ZXJhdG9yRXJyb3IyPXVuZGVmaW5lZDt0cnl7Zm9yKHZhciBfaXRlcmF0b3IyPWZpbHRlckZpZWxkc1tTeW1ib2wuaXRlcmF0b3JdKCksX3N0ZXAyOyEoX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjI9KF9zdGVwMj1faXRlcmF0b3IyLm5leHQoKSkuZG9uZSk7X2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjI9dHJ1ZSl7dmFyIGZpZWxkPV9zdGVwMi52YWx1ZTt2YXIgZkZpZWxkVmFsdWVzPWZpZWxkVmFsdWVzLmdldChmaWVsZCk7dmFyIG1ldGFyYXc9cm93W2ZpZWxkXTtpZihtZXRhcmF3IT1udWxsJiZtZXRhcmF3Lmxlbmd0aCE9PTApe3ZhciBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMz10cnVlO3ZhciBfZGlkSXRlcmF0b3JFcnJvcjM9ZmFsc2U7dmFyIF9pdGVyYXRvckVycm9yMz11bmRlZmluZWQ7dHJ5e2Zvcih2YXIgX2l0ZXJhdG9yMz1tZXRhcmF3W1N5bWJvbC5pdGVyYXRvcl0oKSxfc3RlcDM7IShfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMz0oX3N0ZXAzPV9pdGVyYXRvcjMubmV4dCgpKS5kb25lKTtfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMz10cnVlKXt2YXIgX3JlZjI9X3N0ZXAzLnZhbHVlO3ZhciB2YWx1ZUlkPV9yZWYyLl9pZCx2YWx1ZVJlcD1fcmVmMi52YWx1ZTtpZighZkZpZWxkVmFsdWVzLmhhcyh2YWx1ZUlkKSl7ZkZpZWxkVmFsdWVzLnNldCh2YWx1ZUlkLHZhbHVlUmVwKX19fWNhdGNoKGVycil7X2RpZEl0ZXJhdG9yRXJyb3IzPXRydWU7X2l0ZXJhdG9yRXJyb3IzPWVycn1maW5hbGx5e3RyeXtpZighX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjMmJl9pdGVyYXRvcjMucmV0dXJuKXtfaXRlcmF0b3IzLnJldHVybigpfX1maW5hbGx5e2lmKF9kaWRJdGVyYXRvckVycm9yMyl7dGhyb3cgX2l0ZXJhdG9yRXJyb3IzfX19fX19Y2F0Y2goZXJyKXtfZGlkSXRlcmF0b3JFcnJvcjI9dHJ1ZTtfaXRlcmF0b3JFcnJvcjI9ZXJyfWZpbmFsbHl7dHJ5e2lmKCFfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uMiYmX2l0ZXJhdG9yMi5yZXR1cm4pe19pdGVyYXRvcjIucmV0dXJuKCl9fWZpbmFsbHl7aWYoX2RpZEl0ZXJhdG9yRXJyb3IyKXt0aHJvdyBfaXRlcmF0b3JFcnJvcjJ9fX19fWNhdGNoKGVycil7X2RpZEl0ZXJhdG9yRXJyb3I9dHJ1ZTtfaXRlcmF0b3JFcnJvcj1lcnJ9ZmluYWxseXt0cnl7aWYoIV9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24mJl9pdGVyYXRvci5yZXR1cm4pe19pdGVyYXRvci5yZXR1cm4oKX19ZmluYWxseXtpZihfZGlkSXRlcmF0b3JFcnJvcil7dGhyb3cgX2l0ZXJhdG9yRXJyb3J9fX12YXIgZmlsdGVySW5pdD1uZXcgTWFwKHByZXNlbnRGaWx0ZXJMaXN0Lm1hcChmdW5jdGlvbihmaWx0ZXJTcGVjLGZpbHRlcklkKXtyZXR1cm5bZmlsdGVySWQsZmlsdGVyU3BlYy50eXBlPT09J0Z1bGxUZXh0Jz9pbml0ZihmaWx0ZXJJZCwnJywnJyk6bmV3IE1hcChbXS5jb25jYXQoX3RvQ29uc3VtYWJsZUFycmF5KGZpZWxkVmFsdWVzLmdldChmaWx0ZXJTcGVjLmZpZWxkKS5rZXlzKCkpKS5tYXAoZnVuY3Rpb24odmFsdWVJZCl7cmV0dXJuW3ZhbHVlSWQsaW5pdGYoZmlsdGVySWQsdmFsdWVJZCx0cnVlKV19KSldfSkpO3JldHVybntmaWVsZFZhbHVlczpmaWVsZFZhbHVlcyxmaWx0ZXJJbml0OmZpbHRlckluaXR9fWZ1bmN0aW9uIGNvbXB1dGVGaWx0ZXJpbmcocmVjb3JkcyxvcmRlcixmaWVsZHMsZmlsdGVyTGlzdCxmaWVsZFZhbHVlcyxmaWx0ZXJTZXR0aW5ncyl7dmFyIHByZXNlbnRGaWx0ZXJMaXN0PWZpbHRlckxpc3QuZmlsdGVyKGZ1bmN0aW9uKHgpe3JldHVybiBmaWVsZHNbeC5maWVsZF19KTt2YXIgZmlsdGVyQ2hlY2tzPW5ldyBNYXAocHJlc2VudEZpbHRlckxpc3QubWFwKGZ1bmN0aW9uKGZpbHRlclNwZWMsZmlsdGVySWQpe3JldHVybltmaWx0ZXJJZCwoZmlsdGVyU3BlYy50eXBlPT09J0Z1bGxUZXh0Jz9mdWxsVGV4dENoZWNrOmZhY2V0Q2hlY2spKGZpbHRlclNwZWMuZmllbGQsZmlsdGVyU2V0dGluZ3MuZ2V0KGZpbHRlcklkKSldfSkpO3ZhciBmaWx0ZXJlZERhdGE9W107dmFyIG90aGVyRmlsdGVyZWREYXRhPW5ldyBNYXAocHJlc2VudEZpbHRlckxpc3QubWFwKGZ1bmN0aW9uKGZpbHRlclNwZWMsZmlsdGVySWQpe3JldHVybltmaWx0ZXJJZCxbXV19KSk7dmFyIF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb240PXRydWU7dmFyIF9kaWRJdGVyYXRvckVycm9yND1mYWxzZTt2YXIgX2l0ZXJhdG9yRXJyb3I0PXVuZGVmaW5lZDt0cnl7dmFyIF9sb29wPWZ1bmN0aW9uIF9sb29wKCl7dmFyIHJpZD1fc3RlcDQudmFsdWU7dmFyIHJvdz1yZWNvcmRzW3JpZF07dmFyIHRoZU9uZUZhaWw9bnVsbDt2YXIgdj10cnVlO3ZhciBkaXNjYXJkPWZhbHNlO3ZhciBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uNT10cnVlO3ZhciBfZGlkSXRlcmF0b3JFcnJvcjU9ZmFsc2U7dmFyIF9pdGVyYXRvckVycm9yNT11bmRlZmluZWQ7dHJ5e2Zvcih2YXIgX2l0ZXJhdG9yNT1maWx0ZXJDaGVja3NbU3ltYm9sLml0ZXJhdG9yXSgpLF9zdGVwNTshKF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb241PShfc3RlcDU9X2l0ZXJhdG9yNS5uZXh0KCkpLmRvbmUpO19pdGVyYXRvck5vcm1hbENvbXBsZXRpb241PXRydWUpe3ZhciBfc3RlcDUkdmFsdWU9X3NsaWNlZFRvQXJyYXkoX3N0ZXA1LnZhbHVlLDIpLGZpbHRlcklkPV9zdGVwNSR2YWx1ZVswXSxmaWx0ZXJDaGVjaz1fc3RlcDUkdmFsdWVbMV07dmFyIHBhc3M9ZmlsdGVyQ2hlY2socm93KTtpZighcGFzcyl7dj1mYWxzZTtpZih0aGVPbmVGYWlsPT09bnVsbCl7dGhlT25lRmFpbD1maWx0ZXJJZH1lbHNle2Rpc2NhcmQ9dHJ1ZTticmVha319fX1jYXRjaChlcnIpe19kaWRJdGVyYXRvckVycm9yNT10cnVlO19pdGVyYXRvckVycm9yNT1lcnJ9ZmluYWxseXt0cnl7aWYoIV9pdGVyYXRvck5vcm1hbENvbXBsZXRpb241JiZfaXRlcmF0b3I1LnJldHVybil7X2l0ZXJhdG9yNS5yZXR1cm4oKX19ZmluYWxseXtpZihfZGlkSXRlcmF0b3JFcnJvcjUpe3Rocm93IF9pdGVyYXRvckVycm9yNX19fWlmKCFkaXNjYXJkKXtpZih2KXtmaWx0ZXJlZERhdGEucHVzaChyb3cpO3ByZXNlbnRGaWx0ZXJMaXN0LmZvckVhY2goZnVuY3Rpb24oZmlsdGVyU3BlYyxmaWx0ZXJJZCl7b3RoZXJGaWx0ZXJlZERhdGEuZ2V0KGZpbHRlcklkKS5wdXNoKHJvdyl9KX1lbHNle290aGVyRmlsdGVyZWREYXRhLmdldCh0aGVPbmVGYWlsKS5wdXNoKHJvdyl9fX07Zm9yKHZhciBfaXRlcmF0b3I0PW9yZGVyW1N5bWJvbC5pdGVyYXRvcl0oKSxfc3RlcDQ7IShfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uND0oX3N0ZXA0PV9pdGVyYXRvcjQubmV4dCgpKS5kb25lKTtfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uND10cnVlKXtfbG9vcCgpfX1jYXRjaChlcnIpe19kaWRJdGVyYXRvckVycm9yND10cnVlO19pdGVyYXRvckVycm9yND1lcnJ9ZmluYWxseXt0cnl7aWYoIV9pdGVyYXRvck5vcm1hbENvbXBsZXRpb240JiZfaXRlcmF0b3I0LnJldHVybil7X2l0ZXJhdG9yNC5yZXR1cm4oKX19ZmluYWxseXtpZihfZGlkSXRlcmF0b3JFcnJvcjQpe3Rocm93IF9pdGVyYXRvckVycm9yNH19fXZhciBhbW91bnRzPW5ldyBNYXAocHJlc2VudEZpbHRlckxpc3QubWFwKGZ1bmN0aW9uKF9yZWYzLGZpbHRlcklkKXt2YXIgZmllbGQ9X3JlZjMuZmllbGQsdHlwZT1fcmVmMy50eXBlO3JldHVybltmaWx0ZXJJZCx0eXBlPT09J0Z1bGxUZXh0Jz9udWxsOmNvdW50RmFjZXRzKGZpZWxkLGZpZWxkVmFsdWVzLmdldChmaWVsZCksb3RoZXJGaWx0ZXJlZERhdGEuZ2V0KGZpbHRlcklkKSldfSkpO3JldHVybntmaWx0ZXJlZERhdGE6ZmlsdGVyZWREYXRhLGZpbHRlcmVkQW1vdW50T3RoZXJzOm5ldyBNYXAoW10uY29uY2F0KF90b0NvbnN1bWFibGVBcnJheShvdGhlckZpbHRlcmVkRGF0YS5lbnRyaWVzKCkpKS5tYXAoZnVuY3Rpb24oX3JlZjQpe3ZhciBfcmVmNT1fc2xpY2VkVG9BcnJheShfcmVmNCwyKSxmaWx0ZXJJZD1fcmVmNVswXSx4PV9yZWY1WzFdO3JldHVybltmaWx0ZXJJZCx4Lmxlbmd0aF19KSksYW1vdW50czphbW91bnRzfX12YXIgbmV3RmlsdGVyU2V0dGluZ3M9ZXhwb3J0cy5uZXdGaWx0ZXJTZXR0aW5ncz1mdW5jdGlvbiBuZXdGaWx0ZXJTZXR0aW5ncyhmaWx0ZXJTZXR0aW5ncyxmaWx0ZXJJZCxkYXRhKXtzd2l0Y2godHlwZW9mIGRhdGE9PT0ndW5kZWZpbmVkJz8ndW5kZWZpbmVkJzpfdHlwZW9mKGRhdGEpKXtjYXNlJ2Jvb2xlYW4nOnt2YXIgZmlsdGVyU2V0dGluZz1maWx0ZXJTZXR0aW5ncy5nZXQoZmlsdGVySWQpO2ZpbHRlclNldHRpbmdzLnNldChmaWx0ZXJJZCxuZXcgTWFwKFtdLmNvbmNhdChfdG9Db25zdW1hYmxlQXJyYXkoZmlsdGVyU2V0dGluZy5rZXlzKCkpKS5tYXAoZnVuY3Rpb24odmFsdWVJZCl7cmV0dXJuW3ZhbHVlSWQsZGF0YV19KSkpO2JyZWFrfWNhc2Unc3RyaW5nJzp7ZmlsdGVyU2V0dGluZ3Muc2V0KGZpbHRlcklkLGRhdGEpO2JyZWFrfWRlZmF1bHQ6e3ZhciBfZGF0YT1fc2xpY2VkVG9BcnJheShkYXRhLDIpLHZhbHVlSWQ9X2RhdGFbMF0sX2ZpbHRlclNldHRpbmc9X2RhdGFbMV07ZmlsdGVyU2V0dGluZ3MuZ2V0KGZpbHRlcklkKS5zZXQodmFsdWVJZCxfZmlsdGVyU2V0dGluZyk7YnJlYWt9fXJldHVybiBmaWx0ZXJTZXR0aW5nc307dmFyIGZ1bGxUZXh0Q2hlY2s9ZnVuY3Rpb24gZnVsbFRleHRDaGVjayhmaWVsZCx0ZXJtKXt2YXIgc2VhcmNoPXRlcm0udG9Mb3dlckNhc2UoKTtpZihzZWFyY2g9PW51bGx8fHNlYXJjaD09Jycpe3JldHVybiBmdW5jdGlvbigpe3JldHVybiB0cnVlfX1yZXR1cm4gZnVuY3Rpb24ocm93KXt2YXIgdmFsPXJvd1tmaWVsZF07dmFsPXZhbCE9bnVsbD92YWxbMF06dmFsO3JldHVybiB2YWwhPW51bGwmJnZhbC50b0xvd2VyQ2FzZSgpLmluZGV4T2Yoc2VhcmNoKSE9PS0xfX07dmFyIGZhY2V0Q2hlY2s9ZnVuY3Rpb24gZmFjZXRDaGVjayhmaWVsZCxmYWNldFZhbHVlcyl7aWYoZmFjZXRWYWx1ZXMuc2l6ZT09PTApe3JldHVybiBmdW5jdGlvbigpe3JldHVybiBmYWxzZX19cmV0dXJuIGZ1bmN0aW9uKHJvdyl7dmFyIGZpZWxkVmFscz1yb3dbZmllbGRdO2lmKGZpZWxkVmFscz09bnVsbHx8ZmllbGRWYWxzLmxlbmd0aD09MCl7cmV0dXJuIGZhY2V0VmFsdWVzLmdldCgnJyl9dmFyIF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb242PXRydWU7dmFyIF9kaWRJdGVyYXRvckVycm9yNj1mYWxzZTt2YXIgX2l0ZXJhdG9yRXJyb3I2PXVuZGVmaW5lZDt0cnl7Zm9yKHZhciBfaXRlcmF0b3I2PWZpZWxkVmFsc1tTeW1ib2wuaXRlcmF0b3JdKCksX3N0ZXA2OyEoX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjY9KF9zdGVwNj1faXRlcmF0b3I2Lm5leHQoKSkuZG9uZSk7X2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjY9dHJ1ZSl7dmFyIF9yZWY3PV9zdGVwNi52YWx1ZTt2YXIgdmFsdWVJZD1fcmVmNy5faWQ7aWYoZmFjZXRWYWx1ZXMuZ2V0KHZhbHVlSWQpKXtyZXR1cm4gdHJ1ZX19fWNhdGNoKGVycil7X2RpZEl0ZXJhdG9yRXJyb3I2PXRydWU7X2l0ZXJhdG9yRXJyb3I2PWVycn1maW5hbGx5e3RyeXtpZighX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjYmJl9pdGVyYXRvcjYucmV0dXJuKXtfaXRlcmF0b3I2LnJldHVybigpfX1maW5hbGx5e2lmKF9kaWRJdGVyYXRvckVycm9yNil7dGhyb3cgX2l0ZXJhdG9yRXJyb3I2fX19cmV0dXJuIGZhbHNlfX07ZnVuY3Rpb24gY291bnRGYWNldHMoZmllbGQsZmllbGRWYWx1ZXMscm93cyl7dmFyIGZhY2V0QW1vdW50cz1uZXcgTWFwO3ZhciBfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uNz10cnVlO3ZhciBfZGlkSXRlcmF0b3JFcnJvcjc9ZmFsc2U7dmFyIF9pdGVyYXRvckVycm9yNz11bmRlZmluZWQ7dHJ5e2Zvcih2YXIgX2l0ZXJhdG9yNz1maWVsZFZhbHVlcy5rZXlzKClbU3ltYm9sLml0ZXJhdG9yXSgpLF9zdGVwNzshKF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb243PShfc3RlcDc9X2l0ZXJhdG9yNy5uZXh0KCkpLmRvbmUpO19pdGVyYXRvck5vcm1hbENvbXBsZXRpb243PXRydWUpe3ZhciB2YWx1ZUlkPV9zdGVwNy52YWx1ZTtmYWNldEFtb3VudHMuc2V0KHZhbHVlSWQsMCl9fWNhdGNoKGVycil7X2RpZEl0ZXJhdG9yRXJyb3I3PXRydWU7X2l0ZXJhdG9yRXJyb3I3PWVycn1maW5hbGx5e3RyeXtpZighX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjcmJl9pdGVyYXRvcjcucmV0dXJuKXtfaXRlcmF0b3I3LnJldHVybigpfX1maW5hbGx5e2lmKF9kaWRJdGVyYXRvckVycm9yNyl7dGhyb3cgX2l0ZXJhdG9yRXJyb3I3fX19dmFyIF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb244PXRydWU7dmFyIF9kaWRJdGVyYXRvckVycm9yOD1mYWxzZTt2YXIgX2l0ZXJhdG9yRXJyb3I4PXVuZGVmaW5lZDt0cnl7Zm9yKHZhciBfaXRlcmF0b3I4PXJvd3NbU3ltYm9sLml0ZXJhdG9yXSgpLF9zdGVwODshKF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb244PShfc3RlcDg9X2l0ZXJhdG9yOC5uZXh0KCkpLmRvbmUpO19pdGVyYXRvck5vcm1hbENvbXBsZXRpb244PXRydWUpe3ZhciBfcmVmOT1fc3RlcDgudmFsdWU7dmFyIGZpZWxkVmFscz1fcmVmOVtmaWVsZF07aWYoZmllbGRWYWxzPT1udWxsfHxmaWVsZFZhbHMubGVuZ3RoPT0wKXtmYWNldEFtb3VudHMuc2V0KCcnLGZhY2V0QW1vdW50cy5nZXQoJycpKzEpfWVsc2V7dmFyIF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb245PXRydWU7dmFyIF9kaWRJdGVyYXRvckVycm9yOT1mYWxzZTt2YXIgX2l0ZXJhdG9yRXJyb3I5PXVuZGVmaW5lZDt0cnl7Zm9yKHZhciBfaXRlcmF0b3I5PWZpZWxkVmFsc1tTeW1ib2wuaXRlcmF0b3JdKCksX3N0ZXA5OyEoX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjk9KF9zdGVwOT1faXRlcmF0b3I5Lm5leHQoKSkuZG9uZSk7X2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjk9dHJ1ZSl7dmFyIF9yZWYxMT1fc3RlcDkudmFsdWU7dmFyIF92YWx1ZUlkPV9yZWYxMS5faWQ7ZmFjZXRBbW91bnRzLnNldChfdmFsdWVJZCxmYWNldEFtb3VudHMuZ2V0KF92YWx1ZUlkKSsxKX19Y2F0Y2goZXJyKXtfZGlkSXRlcmF0b3JFcnJvcjk9dHJ1ZTtfaXRlcmF0b3JFcnJvcjk9ZXJyfWZpbmFsbHl7dHJ5e2lmKCFfaXRlcmF0b3JOb3JtYWxDb21wbGV0aW9uOSYmX2l0ZXJhdG9yOS5yZXR1cm4pe19pdGVyYXRvcjkucmV0dXJuKCl9fWZpbmFsbHl7aWYoX2RpZEl0ZXJhdG9yRXJyb3I5KXt0aHJvdyBfaXRlcmF0b3JFcnJvcjl9fX19fX1jYXRjaChlcnIpe19kaWRJdGVyYXRvckVycm9yOD10cnVlO19pdGVyYXRvckVycm9yOD1lcnJ9ZmluYWxseXt0cnl7aWYoIV9pdGVyYXRvck5vcm1hbENvbXBsZXRpb244JiZfaXRlcmF0b3I4LnJldHVybil7X2l0ZXJhdG9yOC5yZXR1cm4oKX19ZmluYWxseXtpZihfZGlkSXRlcmF0b3JFcnJvcjgpe3Rocm93IF9pdGVyYXRvckVycm9yOH19fXJldHVybiBmYWNldEFtb3VudHN9ZnVuY3Rpb24gcGxhY2VGYWNldHMoZmllbGRWYWx1ZXMsbWF4Q29scyl7aWYoZmllbGRWYWx1ZXM9PW51bGwpe3JldHVybltdfXZhciBmYWNldHM9W10uY29uY2F0KF90b0NvbnN1bWFibGVBcnJheShmaWVsZFZhbHVlcy5lbnRyaWVzKCkpKS5zb3J0KGZ1bmN0aW9uKHgseSl7cmV0dXJuIHhbMV0ubG9jYWxlQ29tcGFyZSh5WzFdKX0pO2lmKGZhY2V0cy5sZW5ndGg9PTApe3JldHVybltdfXZhciByb3dzPVtdO3ZhciBsZj1mYWNldHMubGVuZ3RoO3ZhciBucm93cz1NYXRoLmZsb29yKGxmL21heENvbHMpKyhsZiVtYXhDb2xzPzE6MCk7dmFyIG5jb2xzPU1hdGguZmxvb3IobGYvbnJvd3MpKyhsZiVucm93cz8xOjApO2Zvcih2YXIgcj0wO3I8bnJvd3M7cisrKXt2YXIgX3Jvdz1bXTtmb3IodmFyIGM9MDtjPG5jb2xzO2MrKyl7dmFyIGY9bnJvd3MqYytyO19yb3cucHVzaChmPGxmP2ZhY2V0c1tmXTpudWxsKX1yb3dzLnB1c2goX3Jvdyl9cmV0dXJuIHJvd3N9ZnVuY3Rpb24gdGVzdEFsbENoZWNrcyhmaWx0ZXJTZXR0aW5ncyl7dmFyIGFsbFRydWU9dHJ1ZTt2YXIgYWxsRmFsc2U9dHJ1ZTt2YXIgX2l0ZXJhdG9yTm9ybWFsQ29tcGxldGlvbjEwPXRydWU7dmFyIF9kaWRJdGVyYXRvckVycm9yMTA9ZmFsc2U7dmFyIF9pdGVyYXRvckVycm9yMTA9dW5kZWZpbmVkO3RyeXtmb3IodmFyIF9pdGVyYXRvcjEwPWZpbHRlclNldHRpbmdzLmtleXMoKVtTeW1ib2wuaXRlcmF0b3JdKCksX3N0ZXAxMDshKF9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24xMD0oX3N0ZXAxMD1faXRlcmF0b3IxMC5uZXh0KCkpLmRvbmUpO19pdGVyYXRvck5vcm1hbENvbXBsZXRpb24xMD10cnVlKXt2YXIgdmFsdWVJZD1fc3RlcDEwLnZhbHVlO2lmKGZpbHRlclNldHRpbmdzLmdldCh2YWx1ZUlkKSl7YWxsRmFsc2U9ZmFsc2V9ZWxzZXthbGxUcnVlPWZhbHNlfX19Y2F0Y2goZXJyKXtfZGlkSXRlcmF0b3JFcnJvcjEwPXRydWU7X2l0ZXJhdG9yRXJyb3IxMD1lcnJ9ZmluYWxseXt0cnl7aWYoIV9pdGVyYXRvck5vcm1hbENvbXBsZXRpb24xMCYmX2l0ZXJhdG9yMTAucmV0dXJuKXtfaXRlcmF0b3IxMC5yZXR1cm4oKX19ZmluYWxseXtpZihfZGlkSXRlcmF0b3JFcnJvcjEwKXt0aHJvdyBfaXRlcmF0b3JFcnJvcjEwfX19cmV0dXJue2FsbFRydWU6YWxsVHJ1ZSxhbGxGYWxzZTphbGxGYWxzZX19IiwiJ3VzZSBzdHJpY3QnO09iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCdfX2VzTW9kdWxlJyx7dmFsdWU6dHJ1ZX0pO2V4cG9ydHMuc2F2ZVN0YXRlPWV4cG9ydHMud2l0aENvbnRleHQ9dW5kZWZpbmVkO3ZhciBfZ2V0PWZ1bmN0aW9uIGdldChvYmplY3QscHJvcGVydHkscmVjZWl2ZXIpe2lmKG9iamVjdD09PW51bGwpb2JqZWN0PUZ1bmN0aW9uLnByb3RvdHlwZTt2YXIgZGVzYz1PYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iamVjdCxwcm9wZXJ0eSk7aWYoZGVzYz09PXVuZGVmaW5lZCl7dmFyIHBhcmVudD1PYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqZWN0KTtpZihwYXJlbnQ9PT1udWxsKXtyZXR1cm4gdW5kZWZpbmVkfWVsc2V7cmV0dXJuIGdldChwYXJlbnQscHJvcGVydHkscmVjZWl2ZXIpfX1lbHNlIGlmKCd2YWx1ZSdpbiBkZXNjKXtyZXR1cm4gZGVzYy52YWx1ZX1lbHNle3ZhciBnZXR0ZXI9ZGVzYy5nZXQ7aWYoZ2V0dGVyPT09dW5kZWZpbmVkKXtyZXR1cm4gdW5kZWZpbmVkfXJldHVybiBnZXR0ZXIuY2FsbChyZWNlaXZlcil9fTt2YXIgX2NyZWF0ZUNsYXNzPWZ1bmN0aW9uKCl7ZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQscHJvcHMpe2Zvcih2YXIgaT0wO2k8cHJvcHMubGVuZ3RoO2krKyl7dmFyIGRlc2NyaXB0b3I9cHJvcHNbaV07ZGVzY3JpcHRvci5lbnVtZXJhYmxlPWRlc2NyaXB0b3IuZW51bWVyYWJsZXx8ZmFsc2U7ZGVzY3JpcHRvci5jb25maWd1cmFibGU9dHJ1ZTtpZigndmFsdWUnaW4gZGVzY3JpcHRvcilkZXNjcmlwdG9yLndyaXRhYmxlPXRydWU7T2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCxkZXNjcmlwdG9yLmtleSxkZXNjcmlwdG9yKX19cmV0dXJuIGZ1bmN0aW9uKENvbnN0cnVjdG9yLHByb3RvUHJvcHMsc3RhdGljUHJvcHMpe2lmKHByb3RvUHJvcHMpZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUscHJvdG9Qcm9wcyk7aWYoc3RhdGljUHJvcHMpZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3RvcixzdGF0aWNQcm9wcyk7cmV0dXJuIENvbnN0cnVjdG9yfX0oKTt2YXIgX2pzeEZpbGVOYW1lPScvVXNlcnMvZGlyay9naXRodWIvZGFyaWFoL2NsaWVudC9zcmMvanMvbGliL2hvYy5qcyc7dmFyIF9leHRlbmRzPU9iamVjdC5hc3NpZ258fGZ1bmN0aW9uKHRhcmdldCl7Zm9yKHZhciBpPTE7aTxhcmd1bWVudHMubGVuZ3RoO2krKyl7dmFyIHNvdXJjZT1hcmd1bWVudHNbaV07Zm9yKHZhciBrZXkgaW4gc291cmNlKXtpZihPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLGtleSkpe3RhcmdldFtrZXldPXNvdXJjZVtrZXldfX19cmV0dXJuIHRhcmdldH07dmFyIF9yZWFjdD1yZXF1aXJlKCdyZWFjdCcpO3ZhciBfcmVhY3QyPV9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3JlYWN0KTtmdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iail7cmV0dXJuIG9iaiYmb2JqLl9fZXNNb2R1bGU/b2JqOntkZWZhdWx0Om9ian19ZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLENvbnN0cnVjdG9yKXtpZighKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKXt0aHJvdyBuZXcgVHlwZUVycm9yKCdDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb24nKX19ZnVuY3Rpb24gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oc2VsZixjYWxsKXtpZighc2VsZil7dGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKCd0aGlzIGhhc25cXCd0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc25cXCd0IGJlZW4gY2FsbGVkJyl9cmV0dXJuIGNhbGwmJih0eXBlb2YgY2FsbD09PSdvYmplY3QnfHx0eXBlb2YgY2FsbD09PSdmdW5jdGlvbicpP2NhbGw6c2VsZn1mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3Msc3VwZXJDbGFzcyl7aWYodHlwZW9mIHN1cGVyQ2xhc3MhPT0nZnVuY3Rpb24nJiZzdXBlckNsYXNzIT09bnVsbCl7dGhyb3cgbmV3IFR5cGVFcnJvcignU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCAnK3R5cGVvZiBzdXBlckNsYXNzKX1zdWJDbGFzcy5wcm90b3R5cGU9T2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzJiZzdXBlckNsYXNzLnByb3RvdHlwZSx7Y29uc3RydWN0b3I6e3ZhbHVlOnN1YkNsYXNzLGVudW1lcmFibGU6ZmFsc2Usd3JpdGFibGU6dHJ1ZSxjb25maWd1cmFibGU6dHJ1ZX19KTtpZihzdXBlckNsYXNzKU9iamVjdC5zZXRQcm90b3R5cGVPZj9PYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3Msc3VwZXJDbGFzcyk6c3ViQ2xhc3MuX19wcm90b19fPXN1cGVyQ2xhc3N9dmFyIHdpdGhDb250ZXh0PWV4cG9ydHMud2l0aENvbnRleHQ9ZnVuY3Rpb24gd2l0aENvbnRleHQoQ29tcG9uZW50SW5uZXIpe3ZhciBDb21wb25lbnRPdXRlcj1mdW5jdGlvbiBDb21wb25lbnRPdXRlcihwcm9wcyxjb250ZXh0KXt2YXIgbmV3UHJvcHM9X2V4dGVuZHMoe30scHJvcHMsY29udGV4dC5nbG9iYWxzKTtyZXR1cm4gX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoQ29tcG9uZW50SW5uZXIsX2V4dGVuZHMoe30sbmV3UHJvcHMse19fc291cmNlOntmaWxlTmFtZTpfanN4RmlsZU5hbWUsbGluZU51bWJlcjo2fX0pKX07Q29tcG9uZW50T3V0ZXIuZGlzcGxheU5hbWU9J3djKCcrKENvbXBvbmVudElubmVyLmRpc3BsYXlOYW1lfHxDb21wb25lbnRJbm5lci5uYW1lfHwnQ29tcG9uZW50SW5uZXInKSsnKSc7Q29tcG9uZW50T3V0ZXIuY29udGV4dFR5cGVzPXtnbG9iYWxzOl9yZWFjdC5Qcm9wVHlwZXMub2JqZWN0fTtyZXR1cm4gQ29tcG9uZW50T3V0ZXJ9O3ZhciBnZXRUYWc9ZnVuY3Rpb24gZ2V0VGFnKHRhZyxwYXJhbXMpe3JldHVybiB0YWc9PW51bGw/cGFyYW1zPT1udWxsP251bGw6cGFyYW1zLnRhZzp0YWd9O3ZhciBzYXZlU3RhdGU9ZXhwb3J0cy5zYXZlU3RhdGU9ZnVuY3Rpb24gc2F2ZVN0YXRlKENvbXBvbmVudElubmVyLGtleSxpbml0aWFsU3RhdGUpe3ZhciBDb21wb25lbnRPdXRlcj1mdW5jdGlvbihfQ29tcG9uZW50SW5uZXIpe19pbmhlcml0cyhDb21wb25lbnRPdXRlcixfQ29tcG9uZW50SW5uZXIpO19jcmVhdGVDbGFzcyhDb21wb25lbnRPdXRlcixbe2tleTonc2V0U3RhdGVLZXknLHZhbHVlOmZ1bmN0aW9uIHNldFN0YXRlS2V5KHRhZyl7dGhpcy5zdGF0ZUtleT10aGlzLmtleSsodGFnPT1udWxsPycnOicuJyt0YWcpfX0se2tleTonc3RhdGVMb2FkJyx2YWx1ZTpmdW5jdGlvbiBzdGF0ZUxvYWQoaXNJbml0KXt2YXIgc3RvcmU9dGhpcy5zdG9yZSxzdGF0ZUtleT10aGlzLnN0YXRlS2V5LGluaXRpYWxTdGF0ZT10aGlzLmluaXRpYWxTdGF0ZSxwcm9wcz10aGlzLnByb3BzO3N0b3JlLmxvYWQodGhpcyxzdGF0ZUtleSx0eXBlb2YgaW5pdGlhbFN0YXRlPT0nZnVuY3Rpb24nP2luaXRpYWxTdGF0ZShwcm9wcyk6aW5pdGlhbFN0YXRlLGlzSW5pdCl9fSx7a2V5OidzdGF0ZVNhdmUnLHZhbHVlOmZ1bmN0aW9uIHN0YXRlU2F2ZSgpe3ZhciBzdG9yZT10aGlzLnN0b3JlLHN0YXRlS2V5PXRoaXMuc3RhdGVLZXk7c3RvcmUuc2F2ZSh0aGlzLHN0YXRlS2V5KX19XSk7ZnVuY3Rpb24gQ29tcG9uZW50T3V0ZXIocHJvcHMpe19jbGFzc0NhbGxDaGVjayh0aGlzLENvbXBvbmVudE91dGVyKTt2YXIgX3RoaXM9X3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywoQ29tcG9uZW50T3V0ZXIuX19wcm90b19ffHxPYmplY3QuZ2V0UHJvdG90eXBlT2YoQ29tcG9uZW50T3V0ZXIpKS5jYWxsKHRoaXMscHJvcHMpKTt2YXIgc3RvcmU9cHJvcHMuc3RvcmUsdGFnPXByb3BzLnRhZyxwYXJhbXM9cHJvcHMucGFyYW1zO190aGlzLnN0b3JlPXN0b3JlO190aGlzLnRhZz1nZXRUYWcodGFnLHBhcmFtcyk7X3RoaXMua2V5PWtleTtfdGhpcy5pbml0aWFsU3RhdGU9aW5pdGlhbFN0YXRlO190aGlzLnNldFN0YXRlS2V5KHRhZyk7X3RoaXMuc3RhdGVMb2FkKHRydWUpO3JldHVybiBfdGhpc31fY3JlYXRlQ2xhc3MoQ29tcG9uZW50T3V0ZXIsW3trZXk6J2NvbXBvbmVudFdpbGxVbm1vdW50Jyx2YWx1ZTpmdW5jdGlvbiBjb21wb25lbnRXaWxsVW5tb3VudCgpe2lmKF9nZXQoQ29tcG9uZW50T3V0ZXIucHJvdG90eXBlLl9fcHJvdG9fX3x8T2JqZWN0LmdldFByb3RvdHlwZU9mKENvbXBvbmVudE91dGVyLnByb3RvdHlwZSksJ2NvbXBvbmVudFdpbGxVbm1vdW50Jyx0aGlzKSE9bnVsbCl7X2dldChDb21wb25lbnRPdXRlci5wcm90b3R5cGUuX19wcm90b19ffHxPYmplY3QuZ2V0UHJvdG90eXBlT2YoQ29tcG9uZW50T3V0ZXIucHJvdG90eXBlKSwnY29tcG9uZW50V2lsbFVubW91bnQnLHRoaXMpLmNhbGwodGhpcyl9dGhpcy5zdGF0ZVNhdmUoKX19LHtrZXk6J2NvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMnLHZhbHVlOmZ1bmN0aW9uIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV3UHJvcHMpe2lmKF9nZXQoQ29tcG9uZW50T3V0ZXIucHJvdG90eXBlLl9fcHJvdG9fX3x8T2JqZWN0LmdldFByb3RvdHlwZU9mKENvbXBvbmVudE91dGVyLnByb3RvdHlwZSksJ2NvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMnLHRoaXMpIT1udWxsKXtfZ2V0KENvbXBvbmVudE91dGVyLnByb3RvdHlwZS5fX3Byb3RvX198fE9iamVjdC5nZXRQcm90b3R5cGVPZihDb21wb25lbnRPdXRlci5wcm90b3R5cGUpLCdjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzJyx0aGlzKS5jYWxsKHRoaXMsbmV3UHJvcHMpfXZhciBfcHJvcHM9dGhpcy5wcm9wcyxvbGRUYWc9X3Byb3BzLnRhZyxvbGRQYXJhbXM9X3Byb3BzLnBhcmFtczt2YXIgdGFnPW5ld1Byb3BzLnRhZyxwYXJhbXM9bmV3UHJvcHMucGFyYW1zO3ZhciByZWFsVGFnPWdldFRhZyh0YWcscGFyYW1zKTt2YXIgb2xkUmVhbFRhZz1nZXRUYWcob2xkVGFnLG9sZFBhcmFtcyk7aWYob2xkUmVhbFRhZyE9PXJlYWxUYWcpe3RoaXMuc3RhdGVTYXZlKCk7dGhpcy5zZXRTdGF0ZUtleShyZWFsVGFnKTt0aGlzLnN0YXRlTG9hZChmYWxzZSl9fX1dKTtyZXR1cm4gQ29tcG9uZW50T3V0ZXJ9KENvbXBvbmVudElubmVyKTtDb21wb25lbnRPdXRlci5kaXNwbGF5TmFtZT0nc3MoJysoQ29tcG9uZW50SW5uZXIuZGlzcGxheU5hbWV8fENvbXBvbmVudElubmVyLm5hbWV8fCdDb21wb25lbnRJbm5lcicpKycpJztyZXR1cm4gQ29tcG9uZW50T3V0ZXJ9OyIsIlwidXNlIHN0cmljdFwiO09iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLFwiX19lc01vZHVsZVwiLHt2YWx1ZTp0cnVlfSk7dmFyIGxzQ2xlYXI9ZXhwb3J0cy5sc0NsZWFyPWZ1bmN0aW9uIGxzQ2xlYXIoKXtsb2NhbFN0b3JhZ2UuY2xlYXIoKX07dmFyIGxzSGFzPWV4cG9ydHMubHNIYXM9ZnVuY3Rpb24gbHNIYXMoa2V5KXtyZXR1cm4gbG9jYWxTdG9yYWdlLmdldEl0ZW0oa2V5KSE9bnVsbH07dmFyIGxzR2V0PWV4cG9ydHMubHNHZXQ9ZnVuY3Rpb24gbHNHZXQoa2V5KXtpZihsb2NhbFN0b3JhZ2U9PW51bGwpe3JldHVybiBudWxsfXZhciB2YWw9bG9jYWxTdG9yYWdlLmdldEl0ZW0oa2V5KTtyZXR1cm4gdmFsPT1udWxsP251bGw6SlNPTi5wYXJzZSh2YWwpfTt2YXIgbHNTZXQ9ZXhwb3J0cy5sc1NldD1mdW5jdGlvbiBsc1NldChrZXksdmFsKXtpZihsb2NhbFN0b3JhZ2U9PW51bGwpe3JldHVybn1sb2NhbFN0b3JhZ2Uuc2V0SXRlbShrZXksSlNPTi5zdHJpbmdpZnkodmFsKSl9OyIsIid1c2Ugc3RyaWN0JztPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywnX19lc01vZHVsZScse3ZhbHVlOnRydWV9KTt2YXIgX3R5cGVvZj10eXBlb2YgU3ltYm9sPT09J2Z1bmN0aW9uJyYmdHlwZW9mIFN5bWJvbC5pdGVyYXRvcj09PSdzeW1ib2wnP2Z1bmN0aW9uKG9iail7cmV0dXJuIHR5cGVvZiBvYmp9OmZ1bmN0aW9uKG9iail7cmV0dXJuIG9iaiYmdHlwZW9mIFN5bWJvbD09PSdmdW5jdGlvbicmJm9iai5jb25zdHJ1Y3Rvcj09PVN5bWJvbCYmb2JqIT09U3ltYm9sLnByb3RvdHlwZT8nc3ltYm9sJzp0eXBlb2Ygb2JqfTtleHBvcnRzLmRlZmF1bHQ9bWVtb0JpbmQ7ZnVuY3Rpb24gX3RvQ29uc3VtYWJsZUFycmF5KGFycil7aWYoQXJyYXkuaXNBcnJheShhcnIpKXtmb3IodmFyIGk9MCxhcnIyPUFycmF5KGFyci5sZW5ndGgpO2k8YXJyLmxlbmd0aDtpKyspe2FycjJbaV09YXJyW2ldfXJldHVybiBhcnIyfWVsc2V7cmV0dXJuIEFycmF5LmZyb20oYXJyKX19ZnVuY3Rpb24gbWVtb0JpbmQodGhpc0FyZyxmdW5jTmFtZSxrZXlBcmdzLGV4dHJhQXJncyl7aWYoKHR5cGVvZiB0aGlzQXJnPT09J3VuZGVmaW5lZCc/J3VuZGVmaW5lZCc6X3R5cGVvZih0aGlzQXJnKSkhPT0nb2JqZWN0J3x8IXRoaXNBcmcpe3Rocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgdGhpc0FyZyBwYXJhbWV0ZXIuJyl9dmFyIGZ1bmM9dGhpc0FyZ1tmdW5jTmFtZV07aWYodHlwZW9mIGZ1bmMhPT0nZnVuY3Rpb24nKXt0aHJvdyBuZXcgVHlwZUVycm9yKCdcXCcnK2Z1bmNOYW1lKydcXCcgaXMgbm90IGEgZnVuY3Rpb24uJyl9aWYodGhpc0FyZy5fbWVtQ2FjaGU9PW51bGwpe3RoaXNBcmcuX21lbUNhY2hlPW5ldyBNYXB9aWYoIXRoaXNBcmcuX21lbUNhY2hlLmhhcyhmdW5jTmFtZSkpe3RoaXNBcmcuX21lbUNhY2hlLnNldChmdW5jTmFtZSxuZXcgTWFwKX12YXIgY2FjaGU9dGhpc0FyZy5fbWVtQ2FjaGUuZ2V0KGZ1bmNOYW1lKTt2YXIgbWVtb0tleT1KU09OLnN0cmluZ2lmeShrZXlBcmdzKTtpZighY2FjaGUuaGFzKG1lbW9LZXkpKXtjYWNoZS5zZXQobWVtb0tleSxmdW5jLmFwcGx5KHRoaXNBcmcsW10uY29uY2F0KF90b0NvbnN1bWFibGVBcnJheShrZXlBcmdzKSxfdG9Db25zdW1hYmxlQXJyYXkoZXh0cmFBcmdzfHxbXSkpKSl9cmV0dXJuIGNhY2hlLmdldChtZW1vS2V5KX0iLCJcInVzZSBzdHJpY3RcIjtPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cyxcIl9fZXNNb2R1bGVcIix7dmFsdWU6dHJ1ZX0pO3ZhciBfY3JlYXRlQ2xhc3M9ZnVuY3Rpb24oKXtmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCxwcm9wcyl7Zm9yKHZhciBpPTA7aTxwcm9wcy5sZW5ndGg7aSsrKXt2YXIgZGVzY3JpcHRvcj1wcm9wc1tpXTtkZXNjcmlwdG9yLmVudW1lcmFibGU9ZGVzY3JpcHRvci5lbnVtZXJhYmxlfHxmYWxzZTtkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZT10cnVlO2lmKFwidmFsdWVcImluIGRlc2NyaXB0b3IpZGVzY3JpcHRvci53cml0YWJsZT10cnVlO09iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsZGVzY3JpcHRvci5rZXksZGVzY3JpcHRvcil9fXJldHVybiBmdW5jdGlvbihDb25zdHJ1Y3Rvcixwcm90b1Byb3BzLHN0YXRpY1Byb3BzKXtpZihwcm90b1Byb3BzKWRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLHByb3RvUHJvcHMpO2lmKHN0YXRpY1Byb3BzKWRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3Isc3RhdGljUHJvcHMpO3JldHVybiBDb25zdHJ1Y3Rvcn19KCk7ZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLENvbnN0cnVjdG9yKXtpZighKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKXt0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpfX12YXIgU3RvcmU9ZnVuY3Rpb24oKXtmdW5jdGlvbiBTdG9yZSgpe19jbGFzc0NhbGxDaGVjayh0aGlzLFN0b3JlKTt0aGlzLmRhdGE9bmV3IE1hcH1fY3JlYXRlQ2xhc3MoU3RvcmUsW3trZXk6XCJsb2FkXCIsdmFsdWU6ZnVuY3Rpb24gbG9hZChjb21wb25lbnQsa2V5LGluaXRpYWxTdGF0ZSxpc0luaXQpe2lmKHRoaXMuZGF0YS5oYXMoa2V5KSl7aWYoaXNJbml0KXtjb21wb25lbnQuc3RhdGU9dGhpcy5kYXRhLmdldChrZXkpfWVsc2V7Y29tcG9uZW50LnNldFN0YXRlKHRoaXMuZGF0YS5nZXQoa2V5KSl9fWVsc2V7aWYoaXNJbml0KXtjb21wb25lbnQuc3RhdGU9aW5pdGlhbFN0YXRlfWVsc2V7Y29tcG9uZW50LnNldFN0YXRlKGluaXRpYWxTdGF0ZSl9fX19LHtrZXk6XCJzYXZlXCIsdmFsdWU6ZnVuY3Rpb24gc2F2ZShjb21wb25lbnQsa2V5KXt0aGlzLmRhdGEuc2V0KGtleSxjb21wb25lbnQuc3RhdGUpfX0se2tleTpcImdldFwiLHZhbHVlOmZ1bmN0aW9uIGdldChrZXkpe2lmKCF0aGlzLmRhdGEuaGFzKGtleSkpe3RoaXMuZGF0YS5zZXQoa2V5LHt9KX1yZXR1cm4gdGhpcy5kYXRhLmdldChrZXkpfX1dKTtyZXR1cm4gU3RvcmV9KCk7ZXhwb3J0cy5kZWZhdWx0PVN0b3JlOyIsIid1c2Ugc3RyaWN0JztPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywnX19lc01vZHVsZScse3ZhbHVlOnRydWV9KTt2YXIgX2V4dGVuZHM9T2JqZWN0LmFzc2lnbnx8ZnVuY3Rpb24odGFyZ2V0KXtmb3IodmFyIGk9MTtpPGFyZ3VtZW50cy5sZW5ndGg7aSsrKXt2YXIgc291cmNlPWFyZ3VtZW50c1tpXTtmb3IodmFyIGtleSBpbiBzb3VyY2Upe2lmKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2Usa2V5KSl7dGFyZ2V0W2tleV09c291cmNlW2tleV19fX1yZXR1cm4gdGFyZ2V0fTtleHBvcnRzLmNvbHVtblN0eWxlPWNvbHVtblN0eWxlO3ZhciBzY3JvbGxCYXJXaWR0aD00MDt2YXIgbGVmdE1hcmdpbj0wO3ZhciB0b3BIZWlnaHQ9NTA7dmFyIHRvcE1hcmdpbj01O3ZhciBkaXZXaWR0aFNwZWM9e2xlZnQ6MTIwLHJpZ2h0TGVmdDozODAscmlnaHRMZWZ0TmF2OjE1MH07dmFyIGZsb2F0U3BlYz17bGVmdDonbGVmdCcscmlnaHQ6J3JpZ2h0JyxyaWdodExlZnQ6J2xlZnQnLHJpZ2h0TGVmdE5hdjonbGVmdCcscmlnaHRSaWdodDoncmlnaHQnLHJpZ2h0UmlnaHRCb2R5OidyaWdodCd9O2Z1bmN0aW9uIGNvbHVtblN0eWxlKGtpbmQsX3JlZil7dmFyIGhlaWdodD1fcmVmLmhlaWdodCx3aWR0aD1fcmVmLndpZHRoO3ZhciBkaXZIZWlnaHQ9e2xlZnQ6aGVpZ2h0LXRvcEhlaWdodCxyaWdodDpoZWlnaHQtdG9wSGVpZ2h0LHJpZ2h0TGVmdDpoZWlnaHQtdG9wSGVpZ2h0LXRvcE1hcmdpbixyaWdodExlZnROYXY6aGVpZ2h0LXRvcEhlaWdodC10b3BNYXJnaW4scmlnaHRSaWdodDpoZWlnaHQtdG9wSGVpZ2h0LXRvcE1hcmdpbixyaWdodFJpZ2h0Qm9keTpoZWlnaHQtdG9wSGVpZ2h0LXRvcE1hcmdpbn07dmFyIGxlZnQ9ZGl2V2lkdGhTcGVjLmxlZnQscmlnaHRMZWZ0PWRpdldpZHRoU3BlYy5yaWdodExlZnQscmlnaHRMZWZ0TmF2PWRpdldpZHRoU3BlYy5yaWdodExlZnROYXY7dmFyIGRpdldpZHRoPV9leHRlbmRzKHt9LGRpdldpZHRoU3BlYyx7cmlnaHQ6d2lkdGgtbGVmdC1zY3JvbGxCYXJXaWR0aCxyaWdodFJpZ2h0OndpZHRoLWxlZnQtcmlnaHRMZWZ0LTIqc2Nyb2xsQmFyV2lkdGgtbGVmdE1hcmdpbixyaWdodFJpZ2h0Qm9keTp3aWR0aC1sZWZ0LXJpZ2h0TGVmdE5hdi0yKnNjcm9sbEJhcldpZHRoLWxlZnRNYXJnaW59KTtyZXR1cm57d2lkdGg6ZGl2V2lkdGhba2luZF0saGVpZ2h0OmRpdkhlaWdodFtraW5kXSxmbG9hdDpmbG9hdFNwZWNba2luZF19fSJdfQ==
