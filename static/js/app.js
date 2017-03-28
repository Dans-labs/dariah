(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var getNative = require('./_getNative'),
    root = require('./_root');

/* Built-in method references that are verified to be native. */
var DataView = getNative(root, 'DataView');

module.exports = DataView;

},{"./_getNative":32,"./_root":59}],2:[function(require,module,exports){
var hashClear = require('./_hashClear'),
    hashDelete = require('./_hashDelete'),
    hashGet = require('./_hashGet'),
    hashHas = require('./_hashHas'),
    hashSet = require('./_hashSet');

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

module.exports = Hash;

},{"./_hashClear":35,"./_hashDelete":36,"./_hashGet":37,"./_hashHas":38,"./_hashSet":39}],3:[function(require,module,exports){
var listCacheClear = require('./_listCacheClear'),
    listCacheDelete = require('./_listCacheDelete'),
    listCacheGet = require('./_listCacheGet'),
    listCacheHas = require('./_listCacheHas'),
    listCacheSet = require('./_listCacheSet');

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

module.exports = ListCache;

},{"./_listCacheClear":44,"./_listCacheDelete":45,"./_listCacheGet":46,"./_listCacheHas":47,"./_listCacheSet":48}],4:[function(require,module,exports){
var getNative = require('./_getNative'),
    root = require('./_root');

/* Built-in method references that are verified to be native. */
var Map = getNative(root, 'Map');

module.exports = Map;

},{"./_getNative":32,"./_root":59}],5:[function(require,module,exports){
var mapCacheClear = require('./_mapCacheClear'),
    mapCacheDelete = require('./_mapCacheDelete'),
    mapCacheGet = require('./_mapCacheGet'),
    mapCacheHas = require('./_mapCacheHas'),
    mapCacheSet = require('./_mapCacheSet');

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

module.exports = MapCache;

},{"./_mapCacheClear":49,"./_mapCacheDelete":50,"./_mapCacheGet":51,"./_mapCacheHas":52,"./_mapCacheSet":53}],6:[function(require,module,exports){
var getNative = require('./_getNative'),
    root = require('./_root');

/* Built-in method references that are verified to be native. */
var Promise = getNative(root, 'Promise');

module.exports = Promise;

},{"./_getNative":32,"./_root":59}],7:[function(require,module,exports){
var getNative = require('./_getNative'),
    root = require('./_root');

/* Built-in method references that are verified to be native. */
var Set = getNative(root, 'Set');

module.exports = Set;

},{"./_getNative":32,"./_root":59}],8:[function(require,module,exports){
var MapCache = require('./_MapCache'),
    setCacheAdd = require('./_setCacheAdd'),
    setCacheHas = require('./_setCacheHas');

/**
 *
 * Creates an array cache object to store unique values.
 *
 * @private
 * @constructor
 * @param {Array} [values] The values to cache.
 */
function SetCache(values) {
  var index = -1,
      length = values ? values.length : 0;

  this.__data__ = new MapCache;
  while (++index < length) {
    this.add(values[index]);
  }
}

// Add methods to `SetCache`.
SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
SetCache.prototype.has = setCacheHas;

module.exports = SetCache;

},{"./_MapCache":5,"./_setCacheAdd":60,"./_setCacheHas":61}],9:[function(require,module,exports){
var ListCache = require('./_ListCache'),
    stackClear = require('./_stackClear'),
    stackDelete = require('./_stackDelete'),
    stackGet = require('./_stackGet'),
    stackHas = require('./_stackHas'),
    stackSet = require('./_stackSet');

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Stack(entries) {
  var data = this.__data__ = new ListCache(entries);
  this.size = data.size;
}

// Add methods to `Stack`.
Stack.prototype.clear = stackClear;
Stack.prototype['delete'] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;

module.exports = Stack;

},{"./_ListCache":3,"./_stackClear":63,"./_stackDelete":64,"./_stackGet":65,"./_stackHas":66,"./_stackSet":67}],10:[function(require,module,exports){
var root = require('./_root');

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;

},{"./_root":59}],11:[function(require,module,exports){
var root = require('./_root');

/** Built-in value references. */
var Uint8Array = root.Uint8Array;

module.exports = Uint8Array;

},{"./_root":59}],12:[function(require,module,exports){
var getNative = require('./_getNative'),
    root = require('./_root');

/* Built-in method references that are verified to be native. */
var WeakMap = getNative(root, 'WeakMap');

module.exports = WeakMap;

},{"./_getNative":32,"./_root":59}],13:[function(require,module,exports){
var baseTimes = require('./_baseTimes'),
    isArguments = require('./isArguments'),
    isArray = require('./isArray'),
    isBuffer = require('./isBuffer'),
    isIndex = require('./_isIndex'),
    isTypedArray = require('./isTypedArray');

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  var isArr = isArray(value),
      isArg = !isArr && isArguments(value),
      isBuff = !isArr && !isArg && isBuffer(value),
      isType = !isArr && !isArg && !isBuff && isTypedArray(value),
      skipIndexes = isArr || isArg || isBuff || isType,
      result = skipIndexes ? baseTimes(value.length, String) : [],
      length = result.length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) &&
        !(skipIndexes && (
           // Safari 9 has enumerable `arguments.length` in strict mode.
           key == 'length' ||
           // Node.js 0.10 has enumerable non-index properties on buffers.
           (isBuff && (key == 'offset' || key == 'parent')) ||
           // PhantomJS 2 has enumerable non-index properties on typed arrays.
           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
           // Skip index properties.
           isIndex(key, length)
        ))) {
      result.push(key);
    }
  }
  return result;
}

module.exports = arrayLikeKeys;

},{"./_baseTimes":23,"./_isIndex":40,"./isArguments":71,"./isArray":72,"./isBuffer":74,"./isTypedArray":81}],14:[function(require,module,exports){
/**
 * A specialized version of `_.some` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if any element passes the predicate check,
 *  else `false`.
 */
function arraySome(array, predicate) {
  var index = -1,
      length = array ? array.length : 0;

  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return true;
    }
  }
  return false;
}

module.exports = arraySome;

},{}],15:[function(require,module,exports){
var eq = require('./eq');

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

module.exports = assocIndexOf;

},{"./eq":70}],16:[function(require,module,exports){
/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/**
 * The base implementation of `getTag`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  return objectToString.call(value);
}

module.exports = baseGetTag;

},{}],17:[function(require,module,exports){
var isObjectLike = require('./isObjectLike');

/** `Object#toString` result references. */
var argsTag = '[object Arguments]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */
function baseIsArguments(value) {
  return isObjectLike(value) && objectToString.call(value) == argsTag;
}

module.exports = baseIsArguments;

},{"./isObjectLike":79}],18:[function(require,module,exports){
var baseIsEqualDeep = require('./_baseIsEqualDeep'),
    isObject = require('./isObject'),
    isObjectLike = require('./isObjectLike');

/**
 * The base implementation of `_.isEqual` which supports partial comparisons
 * and tracks traversed objects.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @param {Function} [customizer] The function to customize comparisons.
 * @param {boolean} [bitmask] The bitmask of comparison flags.
 *  The bitmask may be composed of the following flags:
 *     1 - Unordered comparison
 *     2 - Partial comparison
 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 */
function baseIsEqual(value, other, customizer, bitmask, stack) {
  if (value === other) {
    return true;
  }
  if (value == null || other == null || (!isObject(value) && !isObjectLike(other))) {
    return value !== value && other !== other;
  }
  return baseIsEqualDeep(value, other, baseIsEqual, customizer, bitmask, stack);
}

module.exports = baseIsEqual;

},{"./_baseIsEqualDeep":19,"./isObject":78,"./isObjectLike":79}],19:[function(require,module,exports){
var Stack = require('./_Stack'),
    equalArrays = require('./_equalArrays'),
    equalByTag = require('./_equalByTag'),
    equalObjects = require('./_equalObjects'),
    getTag = require('./_getTag'),
    isArray = require('./isArray'),
    isBuffer = require('./isBuffer'),
    isTypedArray = require('./isTypedArray');

/** Used to compose bitmasks for comparison styles. */
var PARTIAL_COMPARE_FLAG = 2;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    objectTag = '[object Object]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * A specialized version of `baseIsEqual` for arrays and objects which performs
 * deep comparisons and tracks traversed objects enabling objects with circular
 * references to be compared.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} [customizer] The function to customize comparisons.
 * @param {number} [bitmask] The bitmask of comparison flags. See `baseIsEqual`
 *  for more details.
 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function baseIsEqualDeep(object, other, equalFunc, customizer, bitmask, stack) {
  var objIsArr = isArray(object),
      othIsArr = isArray(other),
      objTag = arrayTag,
      othTag = arrayTag;

  if (!objIsArr) {
    objTag = getTag(object);
    objTag = objTag == argsTag ? objectTag : objTag;
  }
  if (!othIsArr) {
    othTag = getTag(other);
    othTag = othTag == argsTag ? objectTag : othTag;
  }
  var objIsObj = objTag == objectTag,
      othIsObj = othTag == objectTag,
      isSameTag = objTag == othTag;

  if (isSameTag && isBuffer(object)) {
    if (!isBuffer(other)) {
      return false;
    }
    objIsArr = true;
    objIsObj = false;
  }
  if (isSameTag && !objIsObj) {
    stack || (stack = new Stack);
    return (objIsArr || isTypedArray(object))
      ? equalArrays(object, other, equalFunc, customizer, bitmask, stack)
      : equalByTag(object, other, objTag, equalFunc, customizer, bitmask, stack);
  }
  if (!(bitmask & PARTIAL_COMPARE_FLAG)) {
    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

    if (objIsWrapped || othIsWrapped) {
      var objUnwrapped = objIsWrapped ? object.value() : object,
          othUnwrapped = othIsWrapped ? other.value() : other;

      stack || (stack = new Stack);
      return equalFunc(objUnwrapped, othUnwrapped, customizer, bitmask, stack);
    }
  }
  if (!isSameTag) {
    return false;
  }
  stack || (stack = new Stack);
  return equalObjects(object, other, equalFunc, customizer, bitmask, stack);
}

module.exports = baseIsEqualDeep;

},{"./_Stack":9,"./_equalArrays":27,"./_equalByTag":28,"./_equalObjects":29,"./_getTag":33,"./isArray":72,"./isBuffer":74,"./isTypedArray":81}],20:[function(require,module,exports){
var isFunction = require('./isFunction'),
    isMasked = require('./_isMasked'),
    isObject = require('./isObject'),
    toSource = require('./_toSource');

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

module.exports = baseIsNative;

},{"./_isMasked":42,"./_toSource":68,"./isFunction":76,"./isObject":78}],21:[function(require,module,exports){
var isLength = require('./isLength'),
    isObjectLike = require('./isObjectLike');

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
typedArrayTags[errorTag] = typedArrayTags[funcTag] =
typedArrayTags[mapTag] = typedArrayTags[numberTag] =
typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
typedArrayTags[setTag] = typedArrayTags[stringTag] =
typedArrayTags[weakMapTag] = false;

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
function baseIsTypedArray(value) {
  return isObjectLike(value) &&
    isLength(value.length) && !!typedArrayTags[objectToString.call(value)];
}

module.exports = baseIsTypedArray;

},{"./isLength":77,"./isObjectLike":79}],22:[function(require,module,exports){
var isPrototype = require('./_isPrototype'),
    nativeKeys = require('./_nativeKeys');

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

module.exports = baseKeys;

},{"./_isPrototype":43,"./_nativeKeys":56}],23:[function(require,module,exports){
/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

module.exports = baseTimes;

},{}],24:[function(require,module,exports){
/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}

module.exports = baseUnary;

},{}],25:[function(require,module,exports){
/**
 * Checks if a `cache` value for `key` exists.
 *
 * @private
 * @param {Object} cache The cache to query.
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function cacheHas(cache, key) {
  return cache.has(key);
}

module.exports = cacheHas;

},{}],26:[function(require,module,exports){
var root = require('./_root');

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

module.exports = coreJsData;

},{"./_root":59}],27:[function(require,module,exports){
var SetCache = require('./_SetCache'),
    arraySome = require('./_arraySome'),
    cacheHas = require('./_cacheHas');

/** Used to compose bitmasks for comparison styles. */
var UNORDERED_COMPARE_FLAG = 1,
    PARTIAL_COMPARE_FLAG = 2;

/**
 * A specialized version of `baseIsEqualDeep` for arrays with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Array} array The array to compare.
 * @param {Array} other The other array to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} customizer The function to customize comparisons.
 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
 *  for more details.
 * @param {Object} stack Tracks traversed `array` and `other` objects.
 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
 */
function equalArrays(array, other, equalFunc, customizer, bitmask, stack) {
  var isPartial = bitmask & PARTIAL_COMPARE_FLAG,
      arrLength = array.length,
      othLength = other.length;

  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
    return false;
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(array);
  if (stacked && stack.get(other)) {
    return stacked == other;
  }
  var index = -1,
      result = true,
      seen = (bitmask & UNORDERED_COMPARE_FLAG) ? new SetCache : undefined;

  stack.set(array, other);
  stack.set(other, array);

  // Ignore non-index properties.
  while (++index < arrLength) {
    var arrValue = array[index],
        othValue = other[index];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, arrValue, index, other, array, stack)
        : customizer(arrValue, othValue, index, array, other, stack);
    }
    if (compared !== undefined) {
      if (compared) {
        continue;
      }
      result = false;
      break;
    }
    // Recursively compare arrays (susceptible to call stack limits).
    if (seen) {
      if (!arraySome(other, function(othValue, othIndex) {
            if (!cacheHas(seen, othIndex) &&
                (arrValue === othValue || equalFunc(arrValue, othValue, customizer, bitmask, stack))) {
              return seen.push(othIndex);
            }
          })) {
        result = false;
        break;
      }
    } else if (!(
          arrValue === othValue ||
            equalFunc(arrValue, othValue, customizer, bitmask, stack)
        )) {
      result = false;
      break;
    }
  }
  stack['delete'](array);
  stack['delete'](other);
  return result;
}

module.exports = equalArrays;

},{"./_SetCache":8,"./_arraySome":14,"./_cacheHas":25}],28:[function(require,module,exports){
var Symbol = require('./_Symbol'),
    Uint8Array = require('./_Uint8Array'),
    eq = require('./eq'),
    equalArrays = require('./_equalArrays'),
    mapToArray = require('./_mapToArray'),
    setToArray = require('./_setToArray');

/** Used to compose bitmasks for comparison styles. */
var UNORDERED_COMPARE_FLAG = 1,
    PARTIAL_COMPARE_FLAG = 2;

/** `Object#toString` result references. */
var boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]';

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

/**
 * A specialized version of `baseIsEqualDeep` for comparing objects of
 * the same `toStringTag`.
 *
 * **Note:** This function only supports comparing values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {string} tag The `toStringTag` of the objects to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} customizer The function to customize comparisons.
 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
 *  for more details.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalByTag(object, other, tag, equalFunc, customizer, bitmask, stack) {
  switch (tag) {
    case dataViewTag:
      if ((object.byteLength != other.byteLength) ||
          (object.byteOffset != other.byteOffset)) {
        return false;
      }
      object = object.buffer;
      other = other.buffer;

    case arrayBufferTag:
      if ((object.byteLength != other.byteLength) ||
          !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
        return false;
      }
      return true;

    case boolTag:
    case dateTag:
    case numberTag:
      // Coerce booleans to `1` or `0` and dates to milliseconds.
      // Invalid dates are coerced to `NaN`.
      return eq(+object, +other);

    case errorTag:
      return object.name == other.name && object.message == other.message;

    case regexpTag:
    case stringTag:
      // Coerce regexes to strings and treat strings, primitives and objects,
      // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
      // for more details.
      return object == (other + '');

    case mapTag:
      var convert = mapToArray;

    case setTag:
      var isPartial = bitmask & PARTIAL_COMPARE_FLAG;
      convert || (convert = setToArray);

      if (object.size != other.size && !isPartial) {
        return false;
      }
      // Assume cyclic values are equal.
      var stacked = stack.get(object);
      if (stacked) {
        return stacked == other;
      }
      bitmask |= UNORDERED_COMPARE_FLAG;

      // Recursively compare objects (susceptible to call stack limits).
      stack.set(object, other);
      var result = equalArrays(convert(object), convert(other), equalFunc, customizer, bitmask, stack);
      stack['delete'](object);
      return result;

    case symbolTag:
      if (symbolValueOf) {
        return symbolValueOf.call(object) == symbolValueOf.call(other);
      }
  }
  return false;
}

module.exports = equalByTag;

},{"./_Symbol":10,"./_Uint8Array":11,"./_equalArrays":27,"./_mapToArray":54,"./_setToArray":62,"./eq":70}],29:[function(require,module,exports){
var keys = require('./keys');

/** Used to compose bitmasks for comparison styles. */
var PARTIAL_COMPARE_FLAG = 2;

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * A specialized version of `baseIsEqualDeep` for objects with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} customizer The function to customize comparisons.
 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual`
 *  for more details.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalObjects(object, other, equalFunc, customizer, bitmask, stack) {
  var isPartial = bitmask & PARTIAL_COMPARE_FLAG,
      objProps = keys(object),
      objLength = objProps.length,
      othProps = keys(other),
      othLength = othProps.length;

  if (objLength != othLength && !isPartial) {
    return false;
  }
  var index = objLength;
  while (index--) {
    var key = objProps[index];
    if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
      return false;
    }
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(object);
  if (stacked && stack.get(other)) {
    return stacked == other;
  }
  var result = true;
  stack.set(object, other);
  stack.set(other, object);

  var skipCtor = isPartial;
  while (++index < objLength) {
    key = objProps[index];
    var objValue = object[key],
        othValue = other[key];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, objValue, key, other, object, stack)
        : customizer(objValue, othValue, key, object, other, stack);
    }
    // Recursively compare objects (susceptible to call stack limits).
    if (!(compared === undefined
          ? (objValue === othValue || equalFunc(objValue, othValue, customizer, bitmask, stack))
          : compared
        )) {
      result = false;
      break;
    }
    skipCtor || (skipCtor = key == 'constructor');
  }
  if (result && !skipCtor) {
    var objCtor = object.constructor,
        othCtor = other.constructor;

    // Non `Object` object instances with different constructors are not equal.
    if (objCtor != othCtor &&
        ('constructor' in object && 'constructor' in other) &&
        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
      result = false;
    }
  }
  stack['delete'](object);
  stack['delete'](other);
  return result;
}

module.exports = equalObjects;

},{"./keys":82}],30:[function(require,module,exports){
(function (global){
/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

module.exports = freeGlobal;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],31:[function(require,module,exports){
var isKeyable = require('./_isKeyable');

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

module.exports = getMapData;

},{"./_isKeyable":41}],32:[function(require,module,exports){
var baseIsNative = require('./_baseIsNative'),
    getValue = require('./_getValue');

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

module.exports = getNative;

},{"./_baseIsNative":20,"./_getValue":34}],33:[function(require,module,exports){
var DataView = require('./_DataView'),
    Map = require('./_Map'),
    Promise = require('./_Promise'),
    Set = require('./_Set'),
    WeakMap = require('./_WeakMap'),
    baseGetTag = require('./_baseGetTag'),
    toSource = require('./_toSource');

/** `Object#toString` result references. */
var mapTag = '[object Map]',
    objectTag = '[object Object]',
    promiseTag = '[object Promise]',
    setTag = '[object Set]',
    weakMapTag = '[object WeakMap]';

var dataViewTag = '[object DataView]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Used to detect maps, sets, and weakmaps. */
var dataViewCtorString = toSource(DataView),
    mapCtorString = toSource(Map),
    promiseCtorString = toSource(Promise),
    setCtorString = toSource(Set),
    weakMapCtorString = toSource(WeakMap);

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
var getTag = baseGetTag;

// Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
    (Map && getTag(new Map) != mapTag) ||
    (Promise && getTag(Promise.resolve()) != promiseTag) ||
    (Set && getTag(new Set) != setTag) ||
    (WeakMap && getTag(new WeakMap) != weakMapTag)) {
  getTag = function(value) {
    var result = objectToString.call(value),
        Ctor = result == objectTag ? value.constructor : undefined,
        ctorString = Ctor ? toSource(Ctor) : undefined;

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString: return dataViewTag;
        case mapCtorString: return mapTag;
        case promiseCtorString: return promiseTag;
        case setCtorString: return setTag;
        case weakMapCtorString: return weakMapTag;
      }
    }
    return result;
  };
}

module.exports = getTag;

},{"./_DataView":1,"./_Map":4,"./_Promise":6,"./_Set":7,"./_WeakMap":12,"./_baseGetTag":16,"./_toSource":68}],34:[function(require,module,exports){
/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

module.exports = getValue;

},{}],35:[function(require,module,exports){
var nativeCreate = require('./_nativeCreate');

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
  this.size = 0;
}

module.exports = hashClear;

},{"./_nativeCreate":55}],36:[function(require,module,exports){
/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}

module.exports = hashDelete;

},{}],37:[function(require,module,exports){
var nativeCreate = require('./_nativeCreate');

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

module.exports = hashGet;

},{"./_nativeCreate":55}],38:[function(require,module,exports){
var nativeCreate = require('./_nativeCreate');

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
}

module.exports = hashHas;

},{"./_nativeCreate":55}],39:[function(require,module,exports){
var nativeCreate = require('./_nativeCreate');

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
  return this;
}

module.exports = hashSet;

},{"./_nativeCreate":55}],40:[function(require,module,exports){
/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length &&
    (typeof value == 'number' || reIsUint.test(value)) &&
    (value > -1 && value % 1 == 0 && value < length);
}

module.exports = isIndex;

},{}],41:[function(require,module,exports){
/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

module.exports = isKeyable;

},{}],42:[function(require,module,exports){
var coreJsData = require('./_coreJsData');

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

module.exports = isMasked;

},{"./_coreJsData":26}],43:[function(require,module,exports){
/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

module.exports = isPrototype;

},{}],44:[function(require,module,exports){
/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}

module.exports = listCacheClear;

},{}],45:[function(require,module,exports){
var assocIndexOf = require('./_assocIndexOf');

/** Used for built-in method references. */
var arrayProto = Array.prototype;

/** Built-in value references. */
var splice = arrayProto.splice;

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}

module.exports = listCacheDelete;

},{"./_assocIndexOf":15}],46:[function(require,module,exports){
var assocIndexOf = require('./_assocIndexOf');

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

module.exports = listCacheGet;

},{"./_assocIndexOf":15}],47:[function(require,module,exports){
var assocIndexOf = require('./_assocIndexOf');

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

module.exports = listCacheHas;

},{"./_assocIndexOf":15}],48:[function(require,module,exports){
var assocIndexOf = require('./_assocIndexOf');

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

module.exports = listCacheSet;

},{"./_assocIndexOf":15}],49:[function(require,module,exports){
var Hash = require('./_Hash'),
    ListCache = require('./_ListCache'),
    Map = require('./_Map');

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map || ListCache),
    'string': new Hash
  };
}

module.exports = mapCacheClear;

},{"./_Hash":2,"./_ListCache":3,"./_Map":4}],50:[function(require,module,exports){
var getMapData = require('./_getMapData');

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  var result = getMapData(this, key)['delete'](key);
  this.size -= result ? 1 : 0;
  return result;
}

module.exports = mapCacheDelete;

},{"./_getMapData":31}],51:[function(require,module,exports){
var getMapData = require('./_getMapData');

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

module.exports = mapCacheGet;

},{"./_getMapData":31}],52:[function(require,module,exports){
var getMapData = require('./_getMapData');

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

module.exports = mapCacheHas;

},{"./_getMapData":31}],53:[function(require,module,exports){
var getMapData = require('./_getMapData');

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  var data = getMapData(this, key),
      size = data.size;

  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}

module.exports = mapCacheSet;

},{"./_getMapData":31}],54:[function(require,module,exports){
/**
 * Converts `map` to its key-value pairs.
 *
 * @private
 * @param {Object} map The map to convert.
 * @returns {Array} Returns the key-value pairs.
 */
function mapToArray(map) {
  var index = -1,
      result = Array(map.size);

  map.forEach(function(value, key) {
    result[++index] = [key, value];
  });
  return result;
}

module.exports = mapToArray;

},{}],55:[function(require,module,exports){
var getNative = require('./_getNative');

/* Built-in method references that are verified to be native. */
var nativeCreate = getNative(Object, 'create');

module.exports = nativeCreate;

},{"./_getNative":32}],56:[function(require,module,exports){
var overArg = require('./_overArg');

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys = overArg(Object.keys, Object);

module.exports = nativeKeys;

},{"./_overArg":58}],57:[function(require,module,exports){
var freeGlobal = require('./_freeGlobal');

/** Detect free variable `exports`. */
var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Detect free variable `process` from Node.js. */
var freeProcess = moduleExports && freeGlobal.process;

/** Used to access faster Node.js helpers. */
var nodeUtil = (function() {
  try {
    return freeProcess && freeProcess.binding('util');
  } catch (e) {}
}());

module.exports = nodeUtil;

},{"./_freeGlobal":30}],58:[function(require,module,exports){
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

},{}],59:[function(require,module,exports){
var freeGlobal = require('./_freeGlobal');

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;

},{"./_freeGlobal":30}],60:[function(require,module,exports){
/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/**
 * Adds `value` to the array cache.
 *
 * @private
 * @name add
 * @memberOf SetCache
 * @alias push
 * @param {*} value The value to cache.
 * @returns {Object} Returns the cache instance.
 */
function setCacheAdd(value) {
  this.__data__.set(value, HASH_UNDEFINED);
  return this;
}

module.exports = setCacheAdd;

},{}],61:[function(require,module,exports){
/**
 * Checks if `value` is in the array cache.
 *
 * @private
 * @name has
 * @memberOf SetCache
 * @param {*} value The value to search for.
 * @returns {number} Returns `true` if `value` is found, else `false`.
 */
function setCacheHas(value) {
  return this.__data__.has(value);
}

module.exports = setCacheHas;

},{}],62:[function(require,module,exports){
/**
 * Converts `set` to an array of its values.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the values.
 */
function setToArray(set) {
  var index = -1,
      result = Array(set.size);

  set.forEach(function(value) {
    result[++index] = value;
  });
  return result;
}

module.exports = setToArray;

},{}],63:[function(require,module,exports){
var ListCache = require('./_ListCache');

/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
function stackClear() {
  this.__data__ = new ListCache;
  this.size = 0;
}

module.exports = stackClear;

},{"./_ListCache":3}],64:[function(require,module,exports){
/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete(key) {
  var data = this.__data__,
      result = data['delete'](key);

  this.size = data.size;
  return result;
}

module.exports = stackDelete;

},{}],65:[function(require,module,exports){
/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet(key) {
  return this.__data__.get(key);
}

module.exports = stackGet;

},{}],66:[function(require,module,exports){
/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas(key) {
  return this.__data__.has(key);
}

module.exports = stackHas;

},{}],67:[function(require,module,exports){
var ListCache = require('./_ListCache'),
    Map = require('./_Map'),
    MapCache = require('./_MapCache');

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */
function stackSet(key, value) {
  var data = this.__data__;
  if (data instanceof ListCache) {
    var pairs = data.__data__;
    if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new MapCache(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}

module.exports = stackSet;

},{"./_ListCache":3,"./_Map":4,"./_MapCache":5}],68:[function(require,module,exports){
/** Used for built-in method references. */
var funcProto = Function.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to process.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

module.exports = toSource;

},{}],69:[function(require,module,exports){
var isObject = require('./isObject'),
    now = require('./now'),
    toNumber = require('./toNumber');

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        result = wait - timeSinceLastCall;

    return maxing ? nativeMin(result, maxWait - timeSinceLastInvoke) : result;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

module.exports = debounce;

},{"./isObject":78,"./now":83,"./toNumber":86}],70:[function(require,module,exports){
/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

module.exports = eq;

},{}],71:[function(require,module,exports){
var baseIsArguments = require('./_baseIsArguments'),
    isObjectLike = require('./isObjectLike');

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
  return isObjectLike(value) && hasOwnProperty.call(value, 'callee') &&
    !propertyIsEnumerable.call(value, 'callee');
};

module.exports = isArguments;

},{"./_baseIsArguments":17,"./isObjectLike":79}],72:[function(require,module,exports){
/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

module.exports = isArray;

},{}],73:[function(require,module,exports){
var isFunction = require('./isFunction'),
    isLength = require('./isLength');

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

module.exports = isArrayLike;

},{"./isFunction":76,"./isLength":77}],74:[function(require,module,exports){
var root = require('./_root'),
    stubFalse = require('./stubFalse');

/** Detect free variable `exports`. */
var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */
var isBuffer = nativeIsBuffer || stubFalse;

module.exports = isBuffer;

},{"./_root":59,"./stubFalse":84}],75:[function(require,module,exports){
var baseIsEqual = require('./_baseIsEqual');

/**
 * Performs a deep comparison between two values to determine if they are
 * equivalent.
 *
 * **Note:** This method supports comparing arrays, array buffers, booleans,
 * date objects, error objects, maps, numbers, `Object` objects, regexes,
 * sets, strings, symbols, and typed arrays. `Object` objects are compared
 * by their own, not inherited, enumerable properties. Functions and DOM
 * nodes are **not** supported.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.isEqual(object, other);
 * // => true
 *
 * object === other;
 * // => false
 */
function isEqual(value, other) {
  return baseIsEqual(value, other);
}

module.exports = isEqual;

},{"./_baseIsEqual":18}],76:[function(require,module,exports){
var isObject = require('./isObject');

/** `Object#toString` result references. */
var funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    proxyTag = '[object Proxy]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed array and other constructors.
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag || tag == proxyTag;
}

module.exports = isFunction;

},{"./isObject":78}],77:[function(require,module,exports){
/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

module.exports = isLength;

},{}],78:[function(require,module,exports){
/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

module.exports = isObject;

},{}],79:[function(require,module,exports){
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

},{}],80:[function(require,module,exports){
var isObjectLike = require('./isObjectLike');

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && objectToString.call(value) == symbolTag);
}

module.exports = isSymbol;

},{"./isObjectLike":79}],81:[function(require,module,exports){
var baseIsTypedArray = require('./_baseIsTypedArray'),
    baseUnary = require('./_baseUnary'),
    nodeUtil = require('./_nodeUtil');

/* Node.js helper references. */
var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

module.exports = isTypedArray;

},{"./_baseIsTypedArray":21,"./_baseUnary":24,"./_nodeUtil":57}],82:[function(require,module,exports){
var arrayLikeKeys = require('./_arrayLikeKeys'),
    baseKeys = require('./_baseKeys'),
    isArrayLike = require('./isArrayLike');

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}

module.exports = keys;

},{"./_arrayLikeKeys":13,"./_baseKeys":22,"./isArrayLike":73}],83:[function(require,module,exports){
var root = require('./_root');

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function() {
  return root.Date.now();
};

module.exports = now;

},{"./_root":59}],84:[function(require,module,exports){
/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

module.exports = stubFalse;

},{}],85:[function(require,module,exports){
var debounce = require('./debounce'),
    isObject = require('./isObject');

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/**
 * Creates a throttled function that only invokes `func` at most once per
 * every `wait` milliseconds. The throttled function comes with a `cancel`
 * method to cancel delayed `func` invocations and a `flush` method to
 * immediately invoke them. Provide `options` to indicate whether `func`
 * should be invoked on the leading and/or trailing edge of the `wait`
 * timeout. The `func` is invoked with the last arguments provided to the
 * throttled function. Subsequent calls to the throttled function return the
 * result of the last `func` invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the throttled function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.throttle` and `_.debounce`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to throttle.
 * @param {number} [wait=0] The number of milliseconds to throttle invocations to.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=true]
 *  Specify invoking on the leading edge of the timeout.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new throttled function.
 * @example
 *
 * // Avoid excessively updating the position while scrolling.
 * jQuery(window).on('scroll', _.throttle(updatePosition, 100));
 *
 * // Invoke `renewToken` when the click event is fired, but not more than once every 5 minutes.
 * var throttled = _.throttle(renewToken, 300000, { 'trailing': false });
 * jQuery(element).on('click', throttled);
 *
 * // Cancel the trailing throttled invocation.
 * jQuery(window).on('popstate', throttled.cancel);
 */
function throttle(func, wait, options) {
  var leading = true,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  if (isObject(options)) {
    leading = 'leading' in options ? !!options.leading : leading;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }
  return debounce(func, wait, {
    'leading': leading,
    'maxWait': wait,
    'trailing': trailing
  });
}

module.exports = throttle;

},{"./debounce":69,"./isObject":78}],86:[function(require,module,exports){
var isObject = require('./isObject'),
    isSymbol = require('./isSymbol');

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

module.exports = toNumber;

},{"./isObject":78,"./isSymbol":80}],87:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});exports.fetchData=undefined;var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key]}}}return target};require('whatwg-fetch');var rootUrl='/api/';var ask=function ask(_ref){var desc=_ref.desc;return{type:'notify',status:'pending',desc:desc}};var err=function err(_ref2,data){var desc=_ref2.desc;return{type:'notify',status:'error',desc:desc,msgs:data}};var succeed=function succeed(_ref3){var desc=_ref3.desc;return{type:'notify',status:'success',desc:desc}};var fetchData=exports.fetchData=function fetchData(task){return function(dispatch){var type=task.type,path=task.path,contentType=task.contentType;dispatch(ask(task));dispatch(_extends({},task,{data:null}));var settings={credentials:'same-origin'};fetch(''+rootUrl+contentType+path,settings).then(function(response){return response.json()}).then(function(json){var msgs=json.msgs,good=json.good,data=json.data;if(good){dispatch(succeed(task));dispatch(_extends({},task,{data:data}))}else{dispatch(err(task,msgs))}}).catch(function(error){dispatch(err(task,[{kind:'error',text:error}]))})}};

},{"whatwg-fetch":"whatwg-fetch"}],88:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key]}}}return target};var getWinDim=exports.getWinDim=function getWinDim(){var _window=window,height=_window.innerHeight,width=_window.innerWidth;return{height:height,width:width}};var winDim=exports.winDim=function winDim(){return function(dispatch){dispatch(_extends({type:'windim'},getWinDim()))}};

},{}],89:[function(require,module,exports){
'use strict';var _jsxFileName='/Users/dirk/github/dariah/client/src/js/app/main.jsx';var _react=require('react');var _react2=_interopRequireDefault(_react);var _reactDom=require('react-dom');var _reactRedux=require('react-redux');var _reactRouter=require('react-router');var _Root=require('Root.jsx');var _Root2=_interopRequireDefault(_Root);var _App=require('App.jsx');var _App2=_interopRequireDefault(_App);var _SubApp=require('SubApp.jsx');var _SubApp2=_interopRequireDefault(_SubApp);var _Backoffice=require('Backoffice.jsx');var _Backoffice2=_interopRequireDefault(_Backoffice);var _ItemFiltered=require('ItemFiltered.jsx');var _ItemFiltered2=_interopRequireDefault(_ItemFiltered);var _ItemMy=require('ItemMy.jsx');var _ItemMy2=_interopRequireDefault(_ItemMy);var _ItemRecordPre=require('ItemRecordPre.jsx');var _ItemRecordPre2=_interopRequireDefault(_ItemRecordPre);var _Doc=require('Doc.jsx');var _Doc2=_interopRequireDefault(_Doc);var _NotFound=require('NotFound.jsx');var _NotFound2=_interopRequireDefault(_NotFound);var _configureStore=require('configureStore.js');var _configureStore2=_interopRequireDefault(_configureStore);var _reducers=require('reducers.js');var _reducers2=_interopRequireDefault(_reducers);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var store=(0,_configureStore2.default)(_reducers2.default);(0,_reactDom.render)(_react2.default.createElement(_Root2.default,{store:store,__source:{fileName:_jsxFileName,lineNumber:22}},_react2.default.createElement(_reactRouter.Router,{history:_reactRouter.browserHistory,__source:{fileName:_jsxFileName,lineNumber:23}},_react2.default.createElement(_reactRouter.Redirect,{from:'/about',to:'/docs/about.md',__source:{fileName:_jsxFileName,lineNumber:24}}),_react2.default.createElement(_reactRouter.Redirect,{from:'/docs/about',to:'/docs/about.md',__source:{fileName:_jsxFileName,lineNumber:25}}),_react2.default.createElement(_reactRouter.Redirect,{from:'/about.md',to:'/docs/about.md',__source:{fileName:_jsxFileName,lineNumber:26}}),_react2.default.createElement(_reactRouter.Redirect,{from:'/login',to:'/docs/about.md',__source:{fileName:_jsxFileName,lineNumber:27}}),_react2.default.createElement(_reactRouter.Redirect,{from:'/logout',to:'/docs/about.md',__source:{fileName:_jsxFileName,lineNumber:28}}),_react2.default.createElement(_reactRouter.Redirect,{from:'/slogout',to:'/docs/about.md',__source:{fileName:_jsxFileName,lineNumber:29}}),_react2.default.createElement(_reactRouter.Route,{path:'/',component:_App2.default,__source:{fileName:_jsxFileName,lineNumber:30}},_react2.default.createElement(_reactRouter.IndexRoute,{component:_App2.default,__source:{fileName:_jsxFileName,lineNumber:31}}),_react2.default.createElement(_reactRouter.IndexRedirect,{to:'/docs/about.md',__source:{fileName:_jsxFileName,lineNumber:32}}),_react2.default.createElement(_reactRouter.Route,{path:'docs/:docFile',component:_Doc2.default,__source:{fileName:_jsxFileName,lineNumber:33}}),_react2.default.createElement(_reactRouter.Route,{path:'tech/docs/gen/:docFile',component:_Doc2.default,__source:{fileName:_jsxFileName,lineNumber:34}}),_react2.default.createElement(_reactRouter.Route,{path:'tech/docs/:docFile',component:_Doc2.default,__source:{fileName:_jsxFileName,lineNumber:35}}),_react2.default.createElement(_reactRouter.Route,{path:':table',component:_SubApp2.default,__source:{fileName:_jsxFileName,lineNumber:36}},_react2.default.createElement(_reactRouter.Route,{path:'list',component:_ItemFiltered2.default,__source:{fileName:_jsxFileName,lineNumber:37}}),_react2.default.createElement(_reactRouter.Route,{path:'mylist',component:_ItemMy2.default,__source:{fileName:_jsxFileName,lineNumber:38}},_react2.default.createElement(_reactRouter.Route,{path:':recordId',component:_ItemRecordPre2.default,ownOnly:true,__source:{fileName:_jsxFileName,lineNumber:39}})),_react2.default.createElement(_reactRouter.Route,{path:':func',component:_Backoffice2.default,__source:{fileName:_jsxFileName,lineNumber:41}}))),_react2.default.createElement(_reactRouter.Route,{path:'*',component:_NotFound2.default,__source:{fileName:_jsxFileName,lineNumber:44}}))),document.getElementById('body'));

},{"App.jsx":92,"Backoffice.jsx":93,"Doc.jsx":95,"ItemFiltered.jsx":116,"ItemMy.jsx":117,"ItemRecordPre.jsx":103,"NotFound.jsx":106,"Root.jsx":107,"SubApp.jsx":110,"configureStore.js":"configureStore.js","react":"react","react-dom":"react-dom","react-redux":"react-redux","react-router":"react-router","reducers.js":111}],90:[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:true});var _jsxFileName="/Users/dirk/github/dariah/client/src/js/app/object/CheckboxI.jsx";var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor}}();var _react=require("react");var _react2=_interopRequireDefault(_react);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function")}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called")}return call&&(typeof call==="object"||typeof call==="function")?call:self}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass)}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass}var indeterminate=function indeterminate(states){return!states.allTrue&&!states.allFalse};var CheckboxI=function(_Component){_inherits(CheckboxI,_Component);function CheckboxI(){var _ref;var _temp,_this,_ret;_classCallCheck(this,CheckboxI);for(var _len=arguments.length,args=Array(_len),_key=0;_key<_len;_key++){args[_key]=arguments[_key]}return _ret=(_temp=(_this=_possibleConstructorReturn(this,(_ref=CheckboxI.__proto__||Object.getPrototypeOf(CheckboxI)).call.apply(_ref,[this].concat(args))),_this),_this.handleCheck=function(){var _this2=_this,_this2$props=_this2.props,states=_this2$props.states,filterId=_this2$props.filterId,updFilter=_this2$props.updFilter;return updFilter(filterId,_this.dom.indeterminate||!states.allTrue)},_this.setIndeterminate=function(domElem){var _this3=_this,states=_this3.props.states;if(domElem){_this.dom=domElem;domElem.indeterminate=indeterminate(states)}},_temp),_possibleConstructorReturn(_this,_ret)}_createClass(CheckboxI,[{key:"componentDidUpdate",value:function componentDidUpdate(){var states=this.props.states;this.dom.indeterminate=indeterminate(states)}},{key:"render",value:function render(){var states=this.props.states;return _react2.default.createElement("input",{ref:this.setIndeterminate,type:"checkbox",checked:states.allTrue,onChange:this.handleCheck,__source:{fileName:_jsxFileName,lineNumber:24}})}}]);return CheckboxI}(_react.Component);exports.default=CheckboxI;

},{"react":"react"}],91:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _slicedToArray=function(){function sliceIterator(arr,i){var _arr=[];var _n=true;var _d=false;var _e=undefined;try{for(var _i=arr[Symbol.iterator](),_s;!(_n=(_s=_i.next()).done);_n=true){_arr.push(_s.value);if(i&&_arr.length===i)break}}catch(err){_d=true;_e=err}finally{try{if(!_n&&_i['return'])_i['return']()}finally{if(_d)throw _e}}return _arr}return function(arr,i){if(Array.isArray(arr)){return arr}else if(Symbol.iterator in Object(arr)){return sliceIterator(arr,i)}else{throw new TypeError('Invalid attempt to destructure non-iterable instance')}}}();var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key]}}}return target};var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if('value'in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor}}();var _MARKER_COLOR,_COUNTRY_STYLE,_jsxFileName='/Users/dirk/github/dariah/client/src/js/app/object/EUMap.jsx';var _react=require('react');var _react2=_interopRequireDefault(_react);var _reactRedux=require('react-redux');var _ByValue=require('ByValue.jsx');var _ByValue2=_interopRequireDefault(_ByValue);var _leaflet=require('leaflet');var _leaflet2=_interopRequireDefault(_leaflet);var _europeGeo=require('europe.geo.js');var _hoc=require('hoc.js');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function _toConsumableArray(arr){if(Array.isArray(arr)){for(var i=0,arr2=Array(arr.length);i<arr.length;i++){arr2[i]=arr[i]}return arr2}else{return Array.from(arr)}}function _objectWithoutProperties(obj,keys){var target={};for(var i in obj){if(keys.indexOf(i)>=0)continue;if(!Object.prototype.hasOwnProperty.call(obj,i))continue;target[i]=obj[i]}return target}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function')}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called')}return call&&(typeof call==='object'||typeof call==='function')?call:self}function _inherits(subClass,superClass){if(typeof superClass!=='function'&&superClass!==null){throw new TypeError('Super expression must either be null or a function, not '+typeof superClass)}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass}function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true})}else{obj[key]=value}return obj}var mapOptions={HEIGHT:250,MAX_RADIUS:25,LEVEL_OFF:10,ZOOM_INIT:3,MAP_CENTER:[52,12],MAP_BOUNDS:[[30,-20],[70,40]],MARKER_COLOR:(_MARKER_COLOR={},_defineProperty(_MARKER_COLOR,true,{color:'#008800',fillColor:'#00cc00'}),_defineProperty(_MARKER_COLOR,false,{color:'#888844',fillColor:'#bbbb66'}),_MARKER_COLOR),MARKER_SHAPE:{weight:1,fill:true,fillOpacity:0.8},COUNTRY_STYLE:(_COUNTRY_STYLE={},_defineProperty(_COUNTRY_STYLE,true,{color:'#884422',weight:2,fill:true,fillColor:'#aa7766',fillOpacity:1}),_defineProperty(_COUNTRY_STYLE,false,{color:'#777777',weight:1,fill:true,fillColor:'#bbbbbb',fillOpacity:1}),_COUNTRY_STYLE)};var computeRadius=function computeRadius(i,filteredAmountOthers,amounts){var amount=amounts?amounts.has(i)?amounts.get(i):0:0;if(amount==0){return 0}var MAX_RADIUS=mapOptions.MAX_RADIUS,LEVEL_OFF=mapOptions.LEVEL_OFF;var proportional=MAX_RADIUS*amount/filteredAmountOthers;if(filteredAmountOthers<LEVEL_OFF){return proportional}return LEVEL_OFF*Math.sqrt(proportional)};var EUMap=function(_Component){_inherits(EUMap,_Component);function EUMap(props){_classCallCheck(this,EUMap);var _this=_possibleConstructorReturn(this,(EUMap.__proto__||Object.getPrototypeOf(EUMap)).call(this,props));_this.setMap=function(dom){if(dom){_this.dom=dom}};_this.inDariah=function(feature){return _this.idFromIso.has(feature.properties.iso2)};_this.features=new Map;return _this}_createClass(EUMap,[{key:'render',value:function render(){var _props=this.props,country=_props.country,byValueProps=_objectWithoutProperties(_props,['country']),setMap=this.setMap;return _react2.default.createElement('div',{__source:{fileName:_jsxFileName,lineNumber:66}},_react2.default.createElement('div',{ref:setMap,__source:{fileName:_jsxFileName,lineNumber:67}}),_react2.default.createElement(_ByValue2.default,_extends({},byValueProps,{__source:{fileName:_jsxFileName,lineNumber:70}})))}},{key:'componentDidMount',value:function componentDidMount(){var _this2=this;var _props2=this.props,filterSettings=_props2.filterSettings,filteredAmountOthers=_props2.filteredAmountOthers,amounts=_props2.amounts,country=_props2.country,dom=this.dom;var HEIGHT=mapOptions.HEIGHT,MAP_CENTER=mapOptions.MAP_CENTER,ZOOM_INIT=mapOptions.ZOOM_INIT,MAP_BOUNDS=mapOptions.MAP_BOUNDS,MARKER_COLOR=mapOptions.MARKER_COLOR,MARKER_SHAPE=mapOptions.MARKER_SHAPE,COUNTRY_STYLE=mapOptions.COUNTRY_STYLE;dom.style.height=HEIGHT;this.map=_leaflet2.default.map(dom,{attributionControl:false,center:MAP_CENTER,zoom:ZOOM_INIT,maxBounds:MAP_BOUNDS});this.idFromIso=new Map([].concat(_toConsumableArray(country)).map(function(_ref){var iso=_ref.iso,_id=_ref._id;return[iso,_id]}));_leaflet2.default.geoJSON(_europeGeo.countryBorders,{style:function style(feature){return COUNTRY_STYLE[_this2.inDariah(feature)]},onEachFeature:function onEachFeature(feature){if(_this2.inDariah(feature)){var _feature$properties=feature.properties,iso2=_feature$properties.iso2,lat=_feature$properties.lat,lng=_feature$properties.lng;var i=_this2.idFromIso.get(iso2);var isOn=filterSettings.get(i);var marker=_leaflet2.default.circleMarker([lat,lng],_extends({},MARKER_COLOR[isOn],{radius:computeRadius(i,filteredAmountOthers,amounts)},MARKER_SHAPE,{pane:'markerPane'})).addTo(_this2.map);_this2.features.set(iso2,marker)}}}).addTo(this.map)}},{key:'componentDidUpdate',value:function componentDidUpdate(){var _props3=this.props,filterSettings=_props3.filterSettings,filteredAmountOthers=_props3.filteredAmountOthers,amounts=_props3.amounts;var MARKER_COLOR=mapOptions.MARKER_COLOR;var _iteratorNormalCompletion=true;var _didIteratorError=false;var _iteratorError=undefined;try{for(var _iterator=this.features[Symbol.iterator](),_step;!(_iteratorNormalCompletion=(_step=_iterator.next()).done);_iteratorNormalCompletion=true){var _step$value=_slicedToArray(_step.value,2),iso2=_step$value[0],marker=_step$value[1];var i=this.idFromIso.get(iso2);var isOn=filterSettings.get(i);marker.setRadius(computeRadius(i,filteredAmountOthers,amounts));marker.setStyle(MARKER_COLOR[isOn])}}catch(err){_didIteratorError=true;_iteratorError=err}finally{try{if(!_iteratorNormalCompletion&&_iterator.return){_iterator.return()}}finally{if(_didIteratorError){throw _iteratorError}}}}}]);return EUMap}(_react.Component);EUMap.displayName='EUMap';var mapStateToProps=function mapStateToProps(_ref2){var country=_ref2.tables.country;return{country:country}};exports.default=(0,_reactRedux.connect)(mapStateToProps)((0,_hoc.withContext)(EUMap));

},{"ByValue.jsx":94,"europe.geo.js":"europe.geo.js","hoc.js":"hoc.js","leaflet":"leaflet","react":"react","react-redux":"react-redux"}],92:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _jsxFileName='/Users/dirk/github/dariah/client/src/js/app/pure/App.jsx';var _react=require('react');var _react2=_interopRequireDefault(_react);var _reactRedux=require('react-redux');var _Login=require('Login.jsx');var _Login2=_interopRequireDefault(_Login);var _NavLink=require('NavLink.jsx');var _NavLink2=_interopRequireDefault(_NavLink);var _Static=require('Static.jsx');var _Static2=_interopRequireDefault(_Static);var _Notification=require('Notification.jsx');var _Notification2=_interopRequireDefault(_Notification);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var App=function App(_ref){var children=_ref.children,height=_ref.height,width=_ref.width;var text=width+' x '+height;return _react2.default.createElement('div',{__source:{fileName:_jsxFileName,lineNumber:11}},_react2.default.createElement(_Notification2.default,{__source:{fileName:_jsxFileName,lineNumber:12}}),_react2.default.createElement('p',{className:'nav small top',__source:{fileName:_jsxFileName,lineNumber:13}},_react2.default.createElement('img',{src:'/static/images/inkind_logo_small.png',title:'information about this site',__source:{fileName:_jsxFileName,lineNumber:14}}),_react2.default.createElement(_NavLink2.default,{to:'/contrib',__source:{fileName:_jsxFileName,lineNumber:18}},'Contributions'),_react2.default.createElement(_NavLink2.default,{to:'/backoffice',__source:{fileName:_jsxFileName,lineNumber:19}},'Backoffice'),_react2.default.createElement(_Static2.default,{__source:{fileName:_jsxFileName,lineNumber:20}}),_react2.default.createElement('span',{className:'resize',title:text,__source:{fileName:_jsxFileName,lineNumber:21}},text),_react2.default.createElement(_Login2.default,{__source:{fileName:_jsxFileName,lineNumber:22}})),_react2.default.createElement('div',{__source:{fileName:_jsxFileName,lineNumber:24}},children))};var mapStateToProps=function mapStateToProps(_ref2){var _ref2$win=_ref2.win,height=_ref2$win.height,width=_ref2$win.width;return{height:height,width:width}};exports.default=(0,_reactRedux.connect)(mapStateToProps)(App);

},{"Login.jsx":119,"NavLink.jsx":105,"Notification.jsx":120,"Static.jsx":109,"react":"react","react-redux":"react-redux"}],93:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _jsxFileName='/Users/dirk/github/dariah/client/src/js/app/pure/Backoffice.jsx';var _react=require('react');var _react2=_interopRequireDefault(_react);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var Backoffice=function Backoffice(_ref){var func=_ref.params.func;var headings={type:'Contribution types',assess:'Assessment criteria',package:'Assessment packages'};var bodies={type:'Will be implemented',assess:'Will be implemented',package:'Will be implemented'};var heading=headings[func]||'No such function';var body=bodies[func]||'Nothing to wait for';return _react2.default.createElement('div',{__source:{fileName:_jsxFileName,lineNumber:17}},_react2.default.createElement('h1',{__source:{fileName:_jsxFileName,lineNumber:18}},heading),_react2.default.createElement('p',{__source:{fileName:_jsxFileName,lineNumber:19}},body))};exports.default=Backoffice;

},{"react":"react"}],94:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _slicedToArray=function(){function sliceIterator(arr,i){var _arr=[];var _n=true;var _d=false;var _e=undefined;try{for(var _i=arr[Symbol.iterator](),_s;!(_n=(_s=_i.next()).done);_n=true){_arr.push(_s.value);if(i&&_arr.length===i)break}}catch(err){_d=true;_e=err}finally{try{if(!_n&&_i['return'])_i['return']()}finally{if(_d)throw _e}}return _arr}return function(arr,i){if(Array.isArray(arr)){return arr}else if(Symbol.iterator in Object(arr)){return sliceIterator(arr,i)}else{throw new TypeError('Invalid attempt to destructure non-iterable instance')}}}();var _jsxFileName='/Users/dirk/github/dariah/client/src/js/app/pure/ByValue.jsx';var _react=require('react');var _react2=_interopRequireDefault(_react);var _Facet=require('Facet.jsx');var _Facet2=_interopRequireDefault(_Facet);var _CheckboxI=require('CheckboxI.jsx');var _CheckboxI2=_interopRequireDefault(_CheckboxI);var _Stat=require('Stat.jsx');var _Stat2=_interopRequireDefault(_Stat);var _Alternative=require('Alternative.jsx');var _Alternative2=_interopRequireDefault(_Alternative);var _filtering=require('filtering.js');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var ByValue=function ByValue(_ref){var table=_ref.table,filterId=_ref.filterId,filterField=_ref.filterField,filterLabel=_ref.filterLabel,fieldValues=_ref.fieldValues,filterSettings=_ref.filterSettings,filteredAmount=_ref.filteredAmount,filteredAmountOthers=_ref.filteredAmountOthers,amounts=_ref.amounts,maxCols=_ref.maxCols,updFilter=_ref.updFilter,expanded=_ref.expanded;var rows=(0,_filtering.placeFacets)(fieldValues,maxCols);var control1=function control1(handler){return _react2.default.createElement('span',{className:'button-small fa fa-chevron-down',onClick:handler,__source:{fileName:_jsxFileName,lineNumber:17}})};var control2=function control2(handler){return _react2.default.createElement('span',{className:'button-small fa fa-chevron-right',onClick:handler,__source:{fileName:_jsxFileName,lineNumber:18}})};var controlPlacement=function controlPlacement(control){return _react2.default.createElement('p',{className:'facet',__source:{fileName:_jsxFileName,lineNumber:20}},_react2.default.createElement(_CheckboxI2.default,{filterId:filterId,states:(0,_filtering.testAllChecks)(filterSettings),updFilter:updFilter,__source:{fileName:_jsxFileName,lineNumber:21}}),' ',filterLabel,' ',_react2.default.createElement(_Stat2.default,{subTotal:filteredAmount,total:filteredAmountOthers,__source:{fileName:_jsxFileName,lineNumber:26}}),' ',control)};return _react2.default.createElement('div',{className:'facet',__source:{fileName:_jsxFileName,lineNumber:31}},rows===null?_react2.default.createElement('p',{__source:{fileName:_jsxFileName,lineNumber:32}},' -no facets '):_react2.default.createElement(_Alternative2.default,{tag:table+'_'+filterField,controlPlacement:controlPlacement,controls:[control1,control2],initial:expanded?0:1,alternatives:[_react2.default.createElement('table',{key:'table',__source:{fileName:_jsxFileName,lineNumber:39}},_react2.default.createElement('tbody',{__source:{fileName:_jsxFileName,lineNumber:40}},rows.map(function(row,i){return _react2.default.createElement('tr',{key:i,__source:{fileName:_jsxFileName,lineNumber:42}},row.map(function(f,j){if(f===null){return _react2.default.createElement('td',{key:j,__source:{fileName:_jsxFileName,lineNumber:45}})}var _f=_slicedToArray(f,2),valueId=_f[0],valueRep=_f[1];var facetClass=j==0?'facet':'facet mid';return[_react2.default.createElement('td',{key:valueId,className:facetClass,__source:{fileName:_jsxFileName,lineNumber:50}},_react2.default.createElement(_Facet2.default,{filterId:filterId,valueId:valueId,valueRep:valueRep,checked:filterSettings.get(valueId),updFilter:updFilter,__source:{fileName:_jsxFileName,lineNumber:54}})),_react2.default.createElement('td',{key:'stat',className:'statistic',__source:{fileName:_jsxFileName,lineNumber:63}},_react2.default.createElement(_Stat2.default,{subTotal:amounts.get(valueId),__source:{fileName:_jsxFileName,lineNumber:67}}))]}))}))),_react2.default.createElement('div',{key:'div',__source:{fileName:_jsxFileName,lineNumber:75}})],__source:{fileName:_jsxFileName,lineNumber:33}}))};exports.default=ByValue;

},{"Alternative.jsx":112,"CheckboxI.jsx":90,"Facet.jsx":98,"Stat.jsx":108,"filtering.js":"filtering.js","react":"react"}],95:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _jsxFileName='/Users/dirk/github/dariah/client/src/js/app/pure/Doc.jsx';var _slicedToArray=function(){function sliceIterator(arr,i){var _arr=[];var _n=true;var _d=false;var _e=undefined;try{for(var _i=arr[Symbol.iterator](),_s;!(_n=(_s=_i.next()).done);_n=true){_arr.push(_s.value);if(i&&_arr.length===i)break}}catch(err){_d=true;_e=err}finally{try{if(!_n&&_i['return'])_i['return']()}finally{if(_d)throw _e}}return _arr}return function(arr,i){if(Array.isArray(arr)){return arr}else if(Symbol.iterator in Object(arr)){return sliceIterator(arr,i)}else{throw new TypeError('Invalid attempt to destructure non-iterable instance')}}}();var _react=require('react');var _react2=_interopRequireDefault(_react);var _DocMd=require('DocMd.jsx');var _DocMd2=_interopRequireDefault(_DocMd);var _DocPdf=require('DocPdf.jsx');var _DocPdf2=_interopRequireDefault(_DocPdf);var _DocHtml=require('DocHtml.jsx');var _DocHtml2=_interopRequireDefault(_DocHtml);var _NotFound=require('NotFound.jsx');var _NotFound2=_interopRequireDefault(_NotFound);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var docType={md:_DocMd2.default,pdf:_DocPdf2.default,html:_DocHtml2.default};var Doc=function Doc(_ref){var docPath=_ref.location.pathname;var _$exec$slice=/^(.*)\/([^/]+)$/g.exec(docPath).slice(1),_$exec$slice2=_slicedToArray(_$exec$slice,2),docDir=_$exec$slice2[0],docFile=_$exec$slice2[1];var _$exec$slice3=/^(.*)\.([^.]+)$/g.exec(docFile).slice(1),_$exec$slice4=_slicedToArray(_$exec$slice3,2),docName=_$exec$slice4[0],docExt=_$exec$slice4[1];var DocClass=docType[docExt];return DocClass==null?_react2.default.createElement(_NotFound2.default,{params:{splat:'document '+docPath},__source:{fileName:_jsxFileName,lineNumber:19}}):_react2.default.createElement(DocClass,{docDir:docDir,docName:docName,docExt:docExt,tag:docName,__source:{fileName:_jsxFileName,lineNumber:21}})};exports.default=Doc;

},{"DocHtml.jsx":96,"DocMd.jsx":113,"DocPdf.jsx":97,"NotFound.jsx":106,"react":"react"}],96:[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:true});var _jsxFileName="/Users/dirk/github/dariah/client/src/js/app/pure/DocHtml.jsx";var _react=require("react");var _react2=_interopRequireDefault(_react);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var DocHtml=function DocHtml(_ref){var docDir=_ref.docDir,docName=_ref.docName,docExt=_ref.docExt;var src="/api/file"+docDir+"/"+docName+"."+docExt;return _react2.default.createElement("iframe",{height:"100%",width:"100%",src:src,__source:{fileName:_jsxFileName,lineNumber:6}})};exports.default=DocHtml;

},{"react":"react"}],97:[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:true});var _jsxFileName="/Users/dirk/github/dariah/client/src/js/app/pure/DocPdf.jsx";var _react=require("react");var _react2=_interopRequireDefault(_react);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var DocPdf=function DocPdf(_ref){var docDir=_ref.docDir,docName=_ref.docName,docExt=_ref.docExt;var href="/api/file"+docDir+"/"+docName+"."+docExt;var iOS=/iPad|iPhone|iPod/.test(navigator.userAgent)&&!window.MSStream;return iOS?_react2.default.createElement("p",{__source:{fileName:_jsxFileName,lineNumber:7}},_react2.default.createElement("a",{target:"_blank",rel:"noopener noreferrer",href:href,__source:{fileName:_jsxFileName,lineNumber:8}},docName)," (open pdf in a new tab)"):_react2.default.createElement("object",{height:"100%",width:"100%",data:href,type:"application/pdf",__source:{fileName:_jsxFileName,lineNumber:11}},_react2.default.createElement("a",{target:"_blank",rel:"noopener noreferrer",href:href,__source:{fileName:_jsxFileName,lineNumber:17}},docName)," (open pdf in a new tab)")};exports.default=DocPdf;

},{"react":"react"}],98:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _jsxFileName='/Users/dirk/github/dariah/client/src/js/app/pure/Facet.jsx';var _react=require('react');var _react2=_interopRequireDefault(_react);var _memoBind=require('memoBind.js');var _memoBind2=_interopRequireDefault(_memoBind);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function')}}var callBacks=function callBacks(){_classCallCheck(this,callBacks);this.onChange=function(filterId,valueId,updFilter){return function(event){return updFilter(filterId,[valueId,event.target.checked])}}};var memo=new callBacks;var Facet=function Facet(_ref){var filterId=_ref.filterId,valueId=_ref.valueId,valueRep=_ref.valueRep,checked=_ref.checked,updFilter=_ref.updFilter;return _react2.default.createElement('span',{__source:{fileName:_jsxFileName,lineNumber:10}},_react2.default.createElement('input',{type:'checkbox',checked:checked,className:'facet',onChange:(0,_memoBind2.default)(memo,'onChange',[filterId,valueId],[updFilter]),__source:{fileName:_jsxFileName,lineNumber:11}}),' '+valueRep)};exports.default=Facet;

},{"memoBind.js":"memoBind.js","react":"react"}],99:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _jsxFileName='/Users/dirk/github/dariah/client/src/js/app/pure/Filter.jsx';var _react=require('react');var _react2=_interopRequireDefault(_react);var _FullText=require('FullText.jsx');var _FullText2=_interopRequireDefault(_FullText);var _ByValue=require('ByValue.jsx');var _ByValue2=_interopRequireDefault(_ByValue);var _EUMap=require('EUMap.jsx');var _EUMap2=_interopRequireDefault(_EUMap);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var filterClass={FullText:_FullText2.default,EUMap:_EUMap2.default,ByValue:_ByValue2.default};var Filter=function Filter(_ref){var table=_ref.table,fields=_ref.fields,fieldValues=_ref.fieldValues,filterList=_ref.filterList,filterSettings=_ref.filterSettings,filteredAmount=_ref.filteredAmount,filteredAmountOthers=_ref.filteredAmountOthers,amounts=_ref.amounts,updFilter=_ref.updFilter;return _react2.default.createElement('div',{__source:{fileName:_jsxFileName,lineNumber:21}},filterList.filter(function(x){return fields[x.field]}).map(function(filter,filterId){var type=filter.type;var Fclass=filterClass[type];return _react2.default.createElement(Fclass,{key:filterId,table:table,filterId:filterId,filterField:filter.field,filterLabel:filter.label,maxCols:filter.maxCols,filterSettings:filterSettings.get(filterId),fieldValues:fieldValues.get(filter.field),filteredAmount:filteredAmount,filteredAmountOthers:filteredAmountOthers.get(filterId),amounts:amounts.get(filterId),updFilter:updFilter,expanded:filter.expanded,__source:{fileName:_jsxFileName,lineNumber:26}})}))};exports.default=Filter;

},{"ByValue.jsx":94,"EUMap.jsx":91,"FullText.jsx":100,"react":"react"}],100:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _jsxFileName='/Users/dirk/github/dariah/client/src/js/app/pure/FullText.jsx';var _react=require('react');var _react2=_interopRequireDefault(_react);var _Stat=require('Stat.jsx');var _Stat2=_interopRequireDefault(_Stat);var _memoBind=require('memoBind.js');var _memoBind2=_interopRequireDefault(_memoBind);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function')}}var callBacks=function callBacks(){_classCallCheck(this,callBacks);this.onType=function(filterId,updFilter){return function(event){return updFilter(filterId,event.target.value)}}};var memo=new callBacks;var FullText=function FullText(_ref){var filterId=_ref.filterId,filterField=_ref.filterField,filterLabel=_ref.filterLabel,filterSettings=_ref.filterSettings,filteredAmount=_ref.filteredAmount,filteredAmountOthers=_ref.filteredAmountOthers,updFilter=_ref.updFilter;return _react2.default.createElement('div',{__source:{fileName:_jsxFileName,lineNumber:16}},_react2.default.createElement('p',{title:'Search in '+filterField,__source:{fileName:_jsxFileName,lineNumber:17}},_react2.default.createElement('input',{type:'text',className:'search',placeholder:'search in '+filterLabel,value:filterSettings,onChange:(0,_memoBind2.default)(memo,'onType',[filterId],[updFilter]),__source:{fileName:_jsxFileName,lineNumber:18}}),' ',_react2.default.createElement(_Stat2.default,{subTotal:filteredAmount,total:filteredAmountOthers,__source:{fileName:_jsxFileName,lineNumber:25}})))};exports.default=FullText;

},{"Stat.jsx":108,"memoBind.js":"memoBind.js","react":"react"}],101:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _jsxFileName='/Users/dirk/github/dariah/client/src/js/app/pure/ItemHead.jsx';var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key]}}}return target};var _typeof=typeof Symbol==='function'&&typeof Symbol.iterator==='symbol'?function(obj){return typeof obj}:function(obj){return obj&&typeof Symbol==='function'&&obj.constructor===Symbol&&obj!==Symbol.prototype?'symbol':typeof obj};var _slicedToArray=function(){function sliceIterator(arr,i){var _arr=[];var _n=true;var _d=false;var _e=undefined;try{for(var _i=arr[Symbol.iterator](),_s;!(_n=(_s=_i.next()).done);_n=true){_arr.push(_s.value);if(i&&_arr.length===i)break}}catch(err){_d=true;_e=err}finally{try{if(!_n&&_i['return'])_i['return']()}finally{if(_d)throw _e}}return _arr}return function(arr,i){if(Array.isArray(arr)){return arr}else if(Symbol.iterator in Object(arr)){return sliceIterator(arr,i)}else{throw new TypeError('Invalid attempt to destructure non-iterable instance')}}}();var _react=require('react');var _react2=_interopRequireDefault(_react);var _Alternative=require('Alternative.jsx');var _Alternative2=_interopRequireDefault(_Alternative);var _ItemRecord=require('ItemRecord.jsx');var _ItemRecord2=_interopRequireDefault(_ItemRecord);var _NavLink=require('NavLink.jsx');var _NavLink2=_interopRequireDefault(_NavLink);var _hoc=require('hoc.js');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var ItemHead=function ItemHead(_ref){var table=_ref.table,row=_ref.row,title=_ref.title,inplace=_ref.inplace,editStatus=_ref.editStatus;var rowId=row._id,rowHeadPre=row[title];var rowHead=void 0;if(!rowHeadPre){rowHead='-empty-'}else{var _rowHeadPre=_slicedToArray(rowHeadPre,1);rowHead=_rowHeadPre[0];if((typeof rowHead==='undefined'?'undefined':_typeof(rowHead))=='object'){var _rowHead=rowHead,value=_rowHead.value;rowHead=value}}var refProg=function refProg(prog){editStatus[table][rowId]=_extends({},editStatus[table][rowId],{prog:prog})};var refTitle=function refTitle(title){editStatus[table][rowId]=_extends({},editStatus[table][rowId],{title:title})};var control1=function control1(handler){return _react2.default.createElement('span',{className:'button-small fa fa-chevron-down',onClick:handler,__source:{fileName:_jsxFileName,lineNumber:21}})};var control2=function control2(handler){return _react2.default.createElement('span',{className:'button-small fa fa-chevron-right',onClick:handler,__source:{fileName:_jsxFileName,lineNumber:22}})};var controlPlacement=function controlPlacement(control){return _react2.default.createElement('p',{__source:{fileName:_jsxFileName,lineNumber:24}},control,_react2.default.createElement('span',{ref:refProg,__source:{fileName:_jsxFileName,lineNumber:26}}),' ',_react2.default.createElement('span',{ref:refTitle,__source:{fileName:_jsxFileName,lineNumber:27}},rowHead))};return _react2.default.createElement('tr',{id:rowId,__source:{fileName:_jsxFileName,lineNumber:34}},_react2.default.createElement('td',{__source:{fileName:_jsxFileName,lineNumber:35}},inplace?_react2.default.createElement(_Alternative2.default,{tag:table+'_'+rowId,controlPlacement:controlPlacement,controls:[control1,control2],alternatives:[_react2.default.createElement(_ItemRecord2.default,{key:'show',tag:table+'_'+rowId,table:table,recordId:rowId,__source:{fileName:_jsxFileName,lineNumber:42}}),''],initial:1,__source:{fileName:_jsxFileName,lineNumber:37}}):_react2.default.createElement(_NavLink2.default,{className:'nav',to:'/'+table+'/mylist/'+rowId,__source:{fileName:_jsxFileName,lineNumber:52}},_react2.default.createElement('span',{ref:refProg,__source:{fileName:_jsxFileName,lineNumber:53}}),' ',_react2.default.createElement('span',{ref:refTitle,__source:{fileName:_jsxFileName,lineNumber:54}},rowHead))))};exports.default=(0,_hoc.withContext)(ItemHead);

},{"Alternative.jsx":112,"ItemRecord.jsx":118,"NavLink.jsx":105,"hoc.js":"hoc.js","react":"react"}],102:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _jsxFileName='/Users/dirk/github/dariah/client/src/js/app/pure/ItemList.jsx';var _react=require('react');var _react2=_interopRequireDefault(_react);var _ItemHead=require('ItemHead.jsx');var _ItemHead2=_interopRequireDefault(_ItemHead);var _hoc=require('hoc.js');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var ItemList=function ItemList(_ref){var table=_ref.table,title=_ref.title,filteredData=_ref.filteredData,inplace=_ref.inplace,editStatus=_ref.editStatus;if(editStatus[table]==null){editStatus[table]={}}return _react2.default.createElement('div',{__source:{fileName:_jsxFileName,lineNumber:8}},_react2.default.createElement('table',{__source:{fileName:_jsxFileName,lineNumber:9}},_react2.default.createElement('tbody',{__source:{fileName:_jsxFileName,lineNumber:10}},filteredData.map(function(item){return _react2.default.createElement(_ItemHead2.default,{key:item._id,table:table,title:title,row:item,inplace:inplace,__source:{fileName:_jsxFileName,lineNumber:12}})}))))};exports.default=(0,_hoc.withContext)(ItemList);

},{"ItemHead.jsx":101,"hoc.js":"hoc.js","react":"react"}],103:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _jsxFileName='/Users/dirk/github/dariah/client/src/js/app/pure/ItemRecordPre.jsx';var _react=require('react');var _react2=_interopRequireDefault(_react);var _ItemRecord=require('ItemRecord.jsx');var _ItemRecord2=_interopRequireDefault(_ItemRecord);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var ItemRecordPre=function ItemRecordPre(_ref){var _ref$params=_ref.params,tag=_ref$params.tag,recordId=_ref$params.recordId,ownOnly=_ref.route.ownOnly;return _react2.default.createElement(_ItemRecord2.default,{tag:tag+'_'+recordId,table:tag,recordId:recordId,ownOnly:ownOnly,__source:{fileName:_jsxFileName,lineNumber:6}})};exports.default=ItemRecordPre;

},{"ItemRecord.jsx":118,"react":"react"}],104:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _jsxFileName='/Users/dirk/github/dariah/client/src/js/app/pure/LocalSettings.jsx';var _react=require('react');var _react2=_interopRequireDefault(_react);var _localstorage=require('localstorage.js');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var handle=function handle(){(0,_localstorage.lsClear)()};var LocalSettings=function LocalSettings(){return _react2.default.createElement('span',{className:'button-small fa fa-eraser',title:'forget my settings',onClick:handle,__source:{fileName:_jsxFileName,lineNumber:9}})};exports.default=LocalSettings;

},{"localstorage.js":"localstorage.js","react":"react"}],105:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key]}}}return target};var _jsxFileName='/Users/dirk/github/dariah/client/src/js/app/pure/NavLink.jsx';var _react=require('react');var _react2=_interopRequireDefault(_react);var _reactRouter=require('react-router');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var NavLink=function NavLink(props){return _react2.default.createElement(_reactRouter.Link,_extends({},props,{activeClassName:'active',__source:{fileName:_jsxFileName,lineNumber:4}}))};exports.default=NavLink;

},{"react":"react","react-router":"react-router"}],106:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _jsxFileName='/Users/dirk/github/dariah/client/src/js/app/pure/NotFound.jsx';var _react=require('react');var _react2=_interopRequireDefault(_react);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var NotFound=function NotFound(_ref){var splat=_ref.params.splat;return _react2.default.createElement('h1',{__source:{fileName:_jsxFileName,lineNumber:3}},'404: ',_react2.default.createElement('code',{__source:{fileName:_jsxFileName,lineNumber:3}},splat),' not found on this site.')};exports.default=NotFound;

},{"react":"react"}],107:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _jsxFileName='/Users/dirk/github/dariah/client/src/js/app/pure/Root.jsx';var _react=require('react');var _react2=_interopRequireDefault(_react);var _reactRedux=require('react-redux');var _Window=require('Window.jsx');var _Window2=_interopRequireDefault(_Window);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var Root=function Root(_ref){var store=_ref.store,children=_ref.children;return _react2.default.createElement(_reactRedux.Provider,{store:store,__source:{fileName:_jsxFileName,lineNumber:6}},_react2.default.createElement(_Window2.default,{__source:{fileName:_jsxFileName,lineNumber:7}},children))};exports.default=Root;

},{"Window.jsx":122,"react":"react","react-redux":"react-redux"}],108:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _jsxFileName='/Users/dirk/github/dariah/client/src/js/app/pure/Stat.jsx';var _react=require('react');var _react2=_interopRequireDefault(_react);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var Stat=function Stat(_ref){var subTotal=_ref.subTotal,total=_ref.total;return _react2.default.createElement('span',{className:'good-o',__source:{fileName:_jsxFileName,lineNumber:4}},subTotal==null?'':''+subTotal,total==null||subTotal==null?'':' of ',_react2.default.createElement('strong',{__source:{fileName:_jsxFileName,lineNumber:7}},total==null?'':''+total))};exports.default=Stat;

},{"react":"react"}],109:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _jsxFileName='/Users/dirk/github/dariah/client/src/js/app/pure/Static.jsx';var _react=require('react');var _react2=_interopRequireDefault(_react);var _NavLink=require('NavLink.jsx');var _NavLink2=_interopRequireDefault(_NavLink);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var Static=function Static(){return _react2.default.createElement('span',{className:'small',__source:{fileName:_jsxFileName,lineNumber:5}},_react2.default.createElement(_NavLink2.default,{to:'/docs/about.md',__source:{fileName:_jsxFileName,lineNumber:6}},'About'),_react2.default.createElement(_NavLink2.default,{to:'/tech/docs/design.pdf',__source:{fileName:_jsxFileName,lineNumber:7}},'diagrams'),_react2.default.createElement(_NavLink2.default,{to:'/tech/docs/deploy.md',__source:{fileName:_jsxFileName,lineNumber:8}},'deploy'),_react2.default.createElement('a',{href:'/api/file/tech/docs/gen/index.html',target:'_blank',rel:'noopener noreferrer',__source:{fileName:_jsxFileName,lineNumber:9}},'tech doc'))};exports.default=Static;

},{"NavLink.jsx":105,"react":"react"}],110:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _jsxFileName='/Users/dirk/github/dariah/client/src/js/app/pure/SubApp.jsx';var _react=require('react');var _react2=_interopRequireDefault(_react);var _reactRedux=require('react-redux');var _NavLink=require('NavLink.jsx');var _NavLink2=_interopRequireDefault(_NavLink);var _window=require('window.js');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var SubApp=function SubApp(_ref){var table=_ref.params.table,children=_ref.children,height=_ref.height,width=_ref.width;return _react2.default.createElement('div',{__source:{fileName:_jsxFileName,lineNumber:7}},_react2.default.createElement('div',{className:'nav sized',style:(0,_window.columnStyle)('left',{height:height,width:width}),__source:{fileName:_jsxFileName,lineNumber:8}},table=='contrib'?_react2.default.createElement('div',{__source:{fileName:_jsxFileName,lineNumber:13}},_react2.default.createElement('p',{__source:{fileName:_jsxFileName,lineNumber:14}},_react2.default.createElement(_NavLink2.default,{to:'/'+table+'/list',__source:{fileName:_jsxFileName,lineNumber:14}},'All items')),_react2.default.createElement('p',{__source:{fileName:_jsxFileName,lineNumber:15}},_react2.default.createElement(_NavLink2.default,{to:'/'+table+'/mylist',__source:{fileName:_jsxFileName,lineNumber:15}},'My work'))):_react2.default.createElement('div',{__source:{fileName:_jsxFileName,lineNumber:18}},_react2.default.createElement('p',{__source:{fileName:_jsxFileName,lineNumber:19}},_react2.default.createElement(_NavLink2.default,{to:'/'+table+'/type',__source:{fileName:_jsxFileName,lineNumber:19}},'Types')),_react2.default.createElement('p',{__source:{fileName:_jsxFileName,lineNumber:20}},_react2.default.createElement(_NavLink2.default,{to:'/'+table+'/assess',__source:{fileName:_jsxFileName,lineNumber:20}},'Criteria')),_react2.default.createElement('p',{__source:{fileName:_jsxFileName,lineNumber:21}},_react2.default.createElement(_NavLink2.default,{to:'/'+table+'/package',__source:{fileName:_jsxFileName,lineNumber:21}},'Packages')))),_react2.default.createElement('div',{__source:{fileName:_jsxFileName,lineNumber:25}},_react2.default.createElement('div',{className:'sized',style:(0,_window.columnStyle)('right',{height:height,width:width}),__source:{fileName:_jsxFileName,lineNumber:26}},children)))};var mapStateToProps=function mapStateToProps(_ref2){var _ref2$win=_ref2.win,height=_ref2$win.height,width=_ref2$win.width;return{height:height,width:width}};exports.default=(0,_reactRedux.connect)(mapStateToProps)(SubApp);

},{"NavLink.jsx":105,"react":"react","react-redux":"react-redux","window.js":"window.js"}],111:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key]}}}return target};var _redux=require('redux');var _ui=require('ui.js');function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true})}else{obj[key]=value}return obj}var win=function win(){var state=arguments.length>0&&arguments[0]!==undefined?arguments[0]:(0,_ui.getWinDim)();var _ref=arguments[1];var type=_ref.type,height=_ref.height,width=_ref.width;switch(type){case'windim':{return{height:height,width:width}}default:return state;}};var notify=function notify(){var state=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};var _ref2=arguments[1];var type=_ref2.type,desc=_ref2.desc,status=_ref2.status,msgs=_ref2.msgs;switch(type){case'notify':{switch(status){case('pending','success'):{return _extends({},state,_defineProperty({},desc,{status:status}))}case'error':{return _extends({},state,_defineProperty({},desc,{status:status,msgs:msgs}))}default:return state;}}default:return state;}};var doc=function doc(){var state=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};var _ref3=arguments[1];var type=_ref3.type,path=_ref3.path,data=_ref3.data;switch(type){case'fetchDoc':{if(data==null){return _extends({},state,_defineProperty({},path,null))}return _extends({},state,_defineProperty({},path,data))}default:return state;}};var me=function me(){var state=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};var _ref4=arguments[1];var type=_ref4.type,path=_ref4.path,data=_ref4.data;switch(type){case'fetchMe':{if(data==null){return{}}return _extends({},data)}default:return state;}};var lists=function lists(){var state=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};var _ref5=arguments[1];var type=_ref5.type,table=_ref5.table,listObj=_ref5.listObj;switch(type){case'setList':{return _extends({},state,_defineProperty({},table,listObj))}default:return state;}};var tables=function tables(){var state=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};var _ref6=arguments[1];var type=_ref6.type,path=_ref6.path,data=_ref6.data,table=_ref6.table;switch(type){case'fetchTable':{if(data==null){return _extends({},state,_defineProperty({},table,null))}return _extends({},state,_defineProperty({},table,data))}case'fetchTableMy':{if(data==null){if(state[table]==null){return _extends({},state,_defineProperty({},table,null))}return _extends({},state,_defineProperty({},table,_extends({},state[table],{my:null})))}var entities=data.entities,order=data.order;return _extends({},state,_defineProperty({},table,_extends({},state[table],{my:order,entities:_extends({},state[table].entities,entities)})))}default:return state;}};exports.default=(0,_redux.combineReducers)({win:win,notify:notify,doc:doc,tables:tables,lists:lists,me:me});

},{"redux":"redux","ui.js":88}],112:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _jsxFileName='/Users/dirk/github/dariah/client/src/js/app/state/Alternative.jsx';var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if('value'in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor}}();var _react=require('react');var _react2=_interopRequireDefault(_react);var _hoc=require('hoc.js');var _localstorage=require('localstorage.js');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function')}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called')}return call&&(typeof call==='object'||typeof call==='function')?call:self}function _inherits(subClass,superClass){if(typeof superClass!=='function'&&superClass!==null){throw new TypeError('Super expression must either be null or a function, not '+typeof superClass)}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass}var initAlt=function initAlt(_ref){var tag=_ref.tag;return{alt:(0,_localstorage.lsGet)(tag)}};var switchAlt=function switchAlt(prevState,props){var tag=props.tag,alternatives=props.alternatives,initial=props.initial;var oldAlt=prevState.alt==null?initial==null?0:initial:prevState.alt;var newAlt=(oldAlt+1)%alternatives.length;(0,_localstorage.lsSet)(tag,newAlt);return{alt:newAlt}};var Alternative=function(_Component){_inherits(Alternative,_Component);function Alternative(){var _ref2;var _temp,_this,_ret;_classCallCheck(this,Alternative);for(var _len=arguments.length,args=Array(_len),_key=0;_key<_len;_key++){args[_key]=arguments[_key]}return _ret=(_temp=(_this=_possibleConstructorReturn(this,(_ref2=Alternative.__proto__||Object.getPrototypeOf(Alternative)).call.apply(_ref2,[this].concat(args))),_this),_this.next=function(event){event.preventDefault();_this.setState(switchAlt)},_temp),_possibleConstructorReturn(_this,_ret)}_createClass(Alternative,[{key:'render',value:function render(){var _props=this.props,controlPlacement=_props.controlPlacement,controls=_props.controls,alternatives=_props.alternatives,initial=_props.initial,alt=this.state.alt;var altX=alt==null?initial==null?0:initial:alt;return _react2.default.createElement('div',{__source:{fileName:_jsxFileName,lineNumber:27}},controlPlacement(controls[altX](this.next)),alternatives[altX])}}]);return Alternative}(_react.Component);exports.default=(0,_hoc.withContext)((0,_hoc.saveState)(Alternative,'Alternative',initAlt));

},{"hoc.js":"hoc.js","localstorage.js":"localstorage.js","react":"react"}],113:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if('value'in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor}}();var _jsxFileName='/Users/dirk/github/dariah/client/src/js/app/state/DocMd.jsx';var _react=require('react');var _react2=_interopRequireDefault(_react);var _reactRedux=require('react-redux');var _reactMarkdown=require('react-markdown');var _reactMarkdown2=_interopRequireDefault(_reactMarkdown);var _reactRouter=require('react-router');var _Alternative=require('Alternative.jsx');var _Alternative2=_interopRequireDefault(_Alternative);var _server=require('server.js');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function')}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called')}return call&&(typeof call==='object'||typeof call==='function')?call:self}function _inherits(subClass,superClass){if(typeof superClass!=='function'&&superClass!==null){throw new TypeError('Super expression must either be null or a function, not '+typeof superClass)}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass}var RouterLink=function RouterLink(_ref){var children=_ref.children,href=_ref.href;return href.match(/^(https?:)?\/\//)?_react2.default.createElement('a',{href:href,__source:{fileName:_jsxFileName,lineNumber:10}},children):_react2.default.createElement(_reactRouter.Link,{to:href,__source:{fileName:_jsxFileName,lineNumber:11}},children)};var DocMd=function(_Component){_inherits(DocMd,_Component);function DocMd(){_classCallCheck(this,DocMd);return _possibleConstructorReturn(this,(DocMd.__proto__||Object.getPrototypeOf(DocMd)).apply(this,arguments))}_createClass(DocMd,[{key:'render',value:function render(){var _props=this.props,docName=_props.docName,data=_props.data;var controlPlacement=function controlPlacement(control){return _react2.default.createElement('p',{style:{float:'right'},__source:{fileName:_jsxFileName,lineNumber:17}},control)};var control1=function control1(handler){return _react2.default.createElement('a',{className:'control fa fa-hand-o-down',href:'#',title:'markdown source',onClick:handler,__source:{fileName:_jsxFileName,lineNumber:18}})};var control2=function control2(handler){return _react2.default.createElement('a',{className:'control fa fa-file-code-o',href:'#',title:'formatted',onClick:handler,__source:{fileName:_jsxFileName,lineNumber:19}})};if(data==null){return _react2.default.createElement('div',{__source:{fileName:_jsxFileName,lineNumber:22}},'No document '+docName)}return _react2.default.createElement('div',{style:{paddingLeft:'0.5em'},__source:{fileName:_jsxFileName,lineNumber:25}},_react2.default.createElement(_Alternative2.default,{tag:docName,controlPlacement:controlPlacement,controls:[control1,control2],alternatives:[_react2.default.createElement('div',{key:'fmt',__source:{fileName:_jsxFileName,lineNumber:31}},_react2.default.createElement(_reactMarkdown2.default,{source:data,renderers:{Link:RouterLink},__source:{fileName:_jsxFileName,lineNumber:32}})),_react2.default.createElement('div',{key:'src',__source:{fileName:_jsxFileName,lineNumber:38}},_react2.default.createElement('pre',{className:'md-source',__source:{fileName:_jsxFileName,lineNumber:39}},data))],__source:{fileName:_jsxFileName,lineNumber:26}}))}},{key:'componentDidMount',value:function componentDidMount(){var _props2=this.props,docDir=_props2.docDir,docName=_props2.docName,docExt=_props2.docExt,fetch=_props2.fetch;var path=docDir+'/'+docName+'.'+docExt;fetch({type:'fetchDoc',contentType:'json',path:path,desc:'document '+docName})}}]);return DocMd}(_react.Component);var mapStateToProps=function mapStateToProps(state,_ref2){var docDir=_ref2.docDir,docName=_ref2.docName,docExt=_ref2.docExt;return{data:state.doc[docDir+'/'+docName+'.'+docExt]}};exports.default=(0,_reactRedux.connect)(mapStateToProps,{fetch:_server.fetchData})(DocMd);

},{"Alternative.jsx":112,"react":"react","react-markdown":"react-markdown","react-redux":"react-redux","react-router":"react-router","server.js":87}],114:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _jsxFileName='/Users/dirk/github/dariah/client/src/js/app/state/FilterCompute.jsx';var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if('value'in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor}}();var _react=require('react');var _react2=_interopRequireDefault(_react);var _reactRedux=require('react-redux');var _ItemList=require('ItemList.jsx');var _ItemList2=_interopRequireDefault(_ItemList);var _Filter=require('Filter.jsx');var _Filter2=_interopRequireDefault(_Filter);var _filtering=require('filtering.js');var _window=require('window.js');var _hoc=require('hoc.js');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function')}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called')}return call&&(typeof call==='object'||typeof call==='function')?call:self}function _inherits(subClass,superClass){if(typeof superClass!=='function'&&superClass!==null){throw new TypeError('Super expression must either be null or a function, not '+typeof superClass)}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass}var FilterCompute=function(_Component){_inherits(FilterCompute,_Component);function FilterCompute(){var _ref;var _temp,_this,_ret;_classCallCheck(this,FilterCompute);for(var _len=arguments.length,args=Array(_len),_key=0;_key<_len;_key++){args[_key]=arguments[_key]}return _ret=(_temp=(_this=_possibleConstructorReturn(this,(_ref=FilterCompute.__proto__||Object.getPrototypeOf(FilterCompute)).call.apply(_ref,[this].concat(args))),_this),_this.updFilter=function(filterId,data){var _this2=_this,filterSettings=_this2.state.filterSettings;if(typeof data=='string'){(0,_filtering.setf)(filterId,'',data)}else if(typeof data=='boolean'){var _iteratorNormalCompletion=true;var _didIteratorError=false;var _iteratorError=undefined;try{for(var _iterator=filterSettings.get(filterId)[Symbol.iterator](),_step;!(_iteratorNormalCompletion=(_step=_iterator.next()).done);_iteratorNormalCompletion=true){var fval=_step.value;(0,_filtering.setf)(filterId,fval,data)}}catch(err){_didIteratorError=true;_iteratorError=err}finally{try{if(!_iteratorNormalCompletion&&_iterator.return){_iterator.return()}}finally{if(_didIteratorError){throw _iteratorError}}}}else{(0,_filtering.setf)(filterId,data[0],data[1])}_this.setState({filterSettings:(0,_filtering.newFilterSettings)(filterSettings,filterId,data)})},_temp),_possibleConstructorReturn(_this,_ret)}_createClass(FilterCompute,[{key:'render',value:function render(){var _props=this.props,table=_props.table,title=_props.title,records=_props.records,order=_props.order,fields=_props.fields,fieldValues=_props.fieldValues,filterList=_props.filterList,height=_props.height,width=_props.width,filterSettings=this.state.filterSettings;var _computeFiltering=(0,_filtering.computeFiltering)(records,order,fields,filterList,fieldValues,filterSettings),filteredData=_computeFiltering.filteredData,filteredAmountOthers=_computeFiltering.filteredAmountOthers,amounts=_computeFiltering.amounts;return _react2.default.createElement('div',{__source:{fileName:_jsxFileName,lineNumber:37}},_react2.default.createElement('div',{className:'sized',style:(0,_window.columnStyle)('rightLeft',{height:height,width:width}),__source:{fileName:_jsxFileName,lineNumber:38}},_react2.default.createElement('p',{__source:{fileName:_jsxFileName,lineNumber:42}},'Total ',_react2.default.createElement('span',{className:'good-o',__source:{fileName:_jsxFileName,lineNumber:42}},order.length)),_react2.default.createElement(_Filter2.default,{table:table,fields:fields,fieldValues:fieldValues,filteredAmount:filteredData.length,filteredAmountOthers:filteredAmountOthers,amounts:amounts,filterList:filterList,filterSettings:filterSettings,updFilter:this.updFilter,__source:{fileName:_jsxFileName,lineNumber:43}})),_react2.default.createElement('div',{className:'sized',style:(0,_window.columnStyle)('rightRight',{height:height,width:width}),__source:{fileName:_jsxFileName,lineNumber:55}},_react2.default.createElement(_ItemList2.default,{table:table,title:title,filteredData:filteredData,inplace:true,__source:{fileName:_jsxFileName,lineNumber:59}})))}}]);return FilterCompute}(_react.Component);var mapStateToProps=function mapStateToProps(_ref2){var _ref2$win=_ref2.win,height=_ref2$win.height,width=_ref2$win.width;return{height:height,width:width}};exports.default=(0,_reactRedux.connect)(mapStateToProps)((0,_hoc.withContext)((0,_hoc.saveState)(FilterCompute,'FilterCompute',function(_ref3){var filterInit=_ref3.filterInit;return{filterSettings:filterInit}})));

},{"Filter.jsx":99,"ItemList.jsx":102,"filtering.js":"filtering.js","hoc.js":"hoc.js","react":"react","react-redux":"react-redux","window.js":"window.js"}],115:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _slicedToArray=function(){function sliceIterator(arr,i){var _arr=[];var _n=true;var _d=false;var _e=undefined;try{for(var _i=arr[Symbol.iterator](),_s;!(_n=(_s=_i.next()).done);_n=true){_arr.push(_s.value);if(i&&_arr.length===i)break}}catch(err){_d=true;_e=err}finally{try{if(!_n&&_i['return'])_i['return']()}finally{if(_d)throw _e}}return _arr}return function(arr,i){if(Array.isArray(arr)){return arr}else if(Symbol.iterator in Object(arr)){return sliceIterator(arr,i)}else{throw new TypeError('Invalid attempt to destructure non-iterable instance')}}}();var _typeof=typeof Symbol==='function'&&typeof Symbol.iterator==='symbol'?function(obj){return typeof obj}:function(obj){return obj&&typeof Symbol==='function'&&obj.constructor===Symbol&&obj!==Symbol.prototype?'symbol':typeof obj};var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key]}}}return target};var _jsxFileName='/Users/dirk/github/dariah/client/src/js/app/state/ItemField.jsx';var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if('value'in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor}}();var _react=require('react');var _react2=_interopRequireDefault(_react);var _reactRedux=require('react-redux');var _reactMarkdown=require('react-markdown');var _reactMarkdown2=_interopRequireDefault(_reactMarkdown);var _isequal=require('lodash/isequal');var _isequal2=_interopRequireDefault(_isequal);var _RelSelect=require('RelSelect.jsx');var _RelSelect2=_interopRequireDefault(_RelSelect);var _Alternative=require('Alternative.jsx');var _Alternative2=_interopRequireDefault(_Alternative);var _data=require('data.js');var _hoc=require('hoc.js');var _memoBind=require('memoBind.js');var _memoBind2=_interopRequireDefault(_memoBind);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true})}else{obj[key]=value}return obj}function _objectWithoutProperties(obj,keys){var target={};for(var i in obj){if(keys.indexOf(i)>=0)continue;if(!Object.prototype.hasOwnProperty.call(obj,i))continue;target[i]=obj[i]}return target}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function')}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called')}return call&&(typeof call==='object'||typeof call==='function')?call:self}function _inherits(subClass,superClass){if(typeof superClass!=='function'&&superClass!==null){throw new TypeError('Super expression must either be null or a function, not '+typeof superClass)}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass}function _toConsumableArray(arr){if(Array.isArray(arr)){for(var i=0,arr2=Array(arr.length);i<arr.length;i++){arr2[i]=arr[i]}return arr2}else{return Array.from(arr)}}var sizes={url:50,email:30,range:6,datetime:25,text:50,_max:50};var trimDate=function trimDate(text){return{full:text,text:text==null?'':text.replace(/\.[0-9]+/,'')}};var condense=function condense(text){return{full:text,text:text==null?'':text.length>20?text.slice(0,8)+'...'+text.slice(-8):text}};var normalizeValues=function normalizeValues(_ref){var initValues=_ref.initValues,relValuesMap=_ref.relValuesMap,table=_ref.table,name=_ref.name;var savedValues=initValues==null?[]:initValues;var curValues=[].concat(_toConsumableArray(savedValues));var relValues=relValuesMap.has(table)?relValuesMap.get(table).has(name)?relValuesMap.get(table).get(name):null:null;return{curValues:curValues,savedValues:savedValues,reasons:{},saving:{},changed:false,valid:true,relValues:relValues}};var userAsString=function userAsString(_ref2,user){var valId=_ref2._id;var valRep=void 0;var valShort=void 0;var userData=user[valId];if(!userData){valRep='UNKNOWN';valShort='??'}else{var fname=userData.firstName||'';var lname=userData.lastName||'';var email=userData.email||'';var eppn=userData.eppn||'';var authority=userData.authority||'';var mayLogin=userData.mayLogin?'yes':'no';var linkText=[fname,lname].filter(function(x){return x}).join(' ');if(linkText==''){linkText=email}var namePart=linkText&&email?'['+linkText+'](mailto:'+email+')':linkText+email;var eppnPart=eppn?' eppn='+eppn+' ':'';var authorityPart=authority?' authenticated by='+authority+' ':'';var mayLoginPart=mayLogin?' active='+mayLogin+' ':'';valRep=[namePart,eppnPart,authorityPart,mayLoginPart].filter(function(x){return x}).join('; ');valShort=[fname,lname,eppn].filter(function(x){return x}).slice(0,2).join(' ')}return{text:valShort,full:valRep}};var countryAsString=function countryAsString(_ref3,country){var valId=_ref3._id;var valRep=void 0;var valShort=void 0;var countryData=country[valId];if(!countryData){valRep='UNKNOWN';valShort='??'}else{var _name=countryData.name,iso=countryData.iso;valShort=_name;valRep=iso+': '+_name}return{text:valShort,full:valShort,long:valRep}};var validate=function validate(val,valType,validation){var vstatus=true;var reason='';if(validation.nonEmpty&&(val==null||val=='')){reason='field may not be empty';vstatus=false}if(validation.min!=null||validation.max!=null){if(isNaN(val)){reason='value must be a number';vstatus=false}else{var valn=parseInt(val);if(!(validation.min<=valn)){reason='value must be at least '+validation.min;vstatus=false}if(!(validation.max>=val)){reason='value must be at most '+validation.max;vstatus=false}}}if(valType=='datetime'){var times=void 0;try{times=Date.parse(val)}catch(error){reason='not a valid date/time - '+error;vstatus=false}if(isNaN(times)){reason='not a valid date/time';vstatus=false}}return{vstatus:vstatus,reason:reason}};var ItemField=function(_Component){_inherits(ItemField,_Component);function ItemField(){var _ref4;var _temp,_this,_ret;_classCallCheck(this,ItemField);for(var _len=arguments.length,args=Array(_len),_key=0;_key<_len;_key++){args[_key]=arguments[_key]}return _ret=(_temp=(_this=_possibleConstructorReturn(this,(_ref4=ItemField.__proto__||Object.getPrototypeOf(ItemField)).call.apply(_ref4,[this].concat(args))),_this),_this.keyUp=function(i){return function(event){if(event.keyCode===13){event.target.blur();_this.setValToState(i,event.target.value,null,true)}}},_this.changeVal=function(i){return function(event){event.preventDefault();_this.setValToState(i,event.target.value,null,false)}},_this.changeRelVal=function(i){return function(_id,value){_this.setValToState(i,value,_id,true)}},_this.removeVal=function(i){return function(event){event.preventDefault();_this.setValToState(i,null,null,true)}},_this.saveField=function(){var _this2=_this,_this2$state=_this2.state,valid=_this2$state.valid,changed=_this2$state.changed,saving=_this2$state.saving;if(valid&&changed&&!saving.status){_this.toDb()}},_this.saved=function(data){var _this3=_this,_this3$props=_this3.props,name=_this3$props.name,updMod=_this3$props.updMod,updEdit=_this3$props.updEdit;if(data==null){_this.setState({saving:{status:'error'}})}else{var newValues=data[name],modValues=_objectWithoutProperties(data,[name]);_this.setState({saving:{status:'saved'},savedValues:newValues,curValues:newValues,changed:false,valid:true});updMod(modValues);updEdit(name,false,true,newValues)}},_this.urlFragment=function(i,valType,valText){var text=valText.text,full=valText.full;return _react2.default.createElement('a',{key:i,target:'_blank',rel:'noopener noreferrer',href:full,className:'link',__source:{fileName:_jsxFileName,lineNumber:327}},text)},_this.emailFragment=function(i,valType,valText){var full=valText.full;return _react2.default.createElement('a',{key:i,target:'_blank',rel:'noopener noreferrer',href:'mailto:'+full,className:'link',__source:{fileName:_jsxFileName,lineNumber:331}},full)},_this.textareaFragment=function(i,valType,valText){var full=valText.full;return _react2.default.createElement(_reactMarkdown2.default,{key:i,source:full,__source:{fileName:_jsxFileName,lineNumber:336}})},_this.defaultFragment=function(i,valType,valText){var text=valText.text,full=valText.full;var cl=(valType=='rel'?'tag':'varia')+'-medium';return _react2.default.createElement('span',{key:i,className:cl,title:full,__source:{fileName:_jsxFileName,lineNumber:345}},text)},_this.relEditFragment=function(i,_id,isNew,valType,extraClasses,valText){var text=valText.text,full=valText.full;var _this4=_this,multiple=_this4.props.multiple;return!multiple&&i==0||isNew?_this.relSelect(i,_id,isNew,extraClasses,valText):_react2.default.createElement('span',{key:i,className:'tag-medium',title:full,__source:{fileName:_jsxFileName,lineNumber:401}},text,' ',_this.editValControl(i,_id,isNew))},_this.textAreaControlPlacement=function(control){return _react2.default.createElement('p',{className:'stick',__source:{fileName:_jsxFileName,lineNumber:406}},control)},_this.textAreaControl1=function(handler){return _react2.default.createElement('span',{className:'button-small fa fa-pencil',onClick:handler,__source:{fileName:_jsxFileName,lineNumber:407}})},_this.textAreaControl2=function(handler){return _react2.default.createElement('span',{className:'button-small fa fa-hand-o-down',onClick:handler,__source:{fileName:_jsxFileName,lineNumber:408}})},_this.textareaEditFragment=function(i,_id,isNew,valType,extraClasses,valText){var cols=arguments.length>6&&arguments[6]!==undefined?arguments[6]:100;var rows=arguments.length>7&&arguments[7]!==undefined?arguments[7]:10;var _this5=_this,_this5$props=_this5.props,table=_this5$props.table,rowId=_this5$props.rowId,name=_this5$props.name;var full=valText.full;_this.saveLater=true;return _react2.default.createElement(_Alternative2.default,{key:i,tag:'md_'+table+'_'+rowId+'_'+name,controlPlacement:_this.textAreaControlPlacement,controls:[_this.textAreaControl1,_this.textAreaControl2],alternatives:[_react2.default.createElement(_reactMarkdown2.default,{key:'fmt',source:full,__source:{fileName:_jsxFileName,lineNumber:421}}),_react2.default.createElement('span',{key:'src',__source:{fileName:_jsxFileName,lineNumber:425}},_react2.default.createElement('textarea',{className:'input '+valType+' '+extraClasses.join(' '),value:full,cols:cols,rows:rows,placeholder:valText.initial,wrap:'soft',onChange:(0,_memoBind2.default)(_this,'changeVal',[i]),__source:{fileName:_jsxFileName,lineNumber:426}}),_this.editValControl(i,_id,isNew))],initial:0,__source:{fileName:_jsxFileName,lineNumber:415}})},_this.defaultEditFragment=function(i,_id,isNew,valType,extraClasses,valText){var size=arguments.length>6&&arguments[6]!==undefined?arguments[6]:50;var full=valText.full;_this.saveLater=true;return _react2.default.createElement('span',{key:i,__source:{fileName:_jsxFileName,lineNumber:446}},_react2.default.createElement('input',{type:'text',className:'input '+valType+' '+extraClasses.join(' '),value:full,placeholder:valText.initial,size:size,onChange:(0,_memoBind2.default)(_this,'changeVal',[i]),onKeyUp:(0,_memoBind2.default)(_this,'keyUp',[i]),__source:{fileName:_jsxFileName,lineNumber:447}}),_this.editValControl(i,_id,isNew))},_this.readonlyMakeFragment=function(valType){if(valType=='url'){return _this.urlFragment}if(valType=='email'){return _this.emailFragment}if(valType=='textarea'){return _this.textareaFragment}return _this.defaultFragment},_this.editMakeFragment=function(valType){if(valType=='rel'){return _this.relEditFragment}if(valType=='textarea'){return _this.textareaEditFragment}return _this.defaultEditFragment},_this.kneadControlPlacement=function(alt1){return function(control){return _react2.default.createElement('span',{__source:{fileName:_jsxFileName,lineNumber:553}},alt1,' ',control)}},_this.kneadControl1=function(handler){return _react2.default.createElement('span',{className:'button-small',onClick:handler,__source:{fileName:_jsxFileName,lineNumber:554}},'show more')},_this.kneadControl2=function(handler){return _react2.default.createElement('span',{className:'button-small',onClick:handler,__source:{fileName:_jsxFileName,lineNumber:555}},'show less')},_temp),_possibleConstructorReturn(_this,_ret)}_createClass(ItemField,[{key:'initEdit',value:function initEdit(initValues){this.setState({savedValues:initValues||[],curValues:[].concat(_toConsumableArray(initValues||[])),saving:{},changed:false,valid:true})}},{key:'setValToState',value:function setValToState(i,newVal,_id,doSave){var _state=this.state,reasons=_state.reasons,curValues=_state.curValues;var newReasons=void 0;var newValues=[].concat(_toConsumableArray(curValues));if(newVal==null){newValues=newValues.filter(function(x,j){return j!=i});newReasons=reasons}else{var _props=this.props,valType=_props.valType,validation=_props.validation;var _validate=validate(newVal,valType,validation),vstatus=_validate.vstatus,reason=_validate.reason;var sendVal=valType=='rel'?typeof newVal!='string'?newVal:{_id:_id,value:newVal}:newVal;if(vstatus&&valType=='rel'&&_id==null){}var refI=i==-1?newValues.length:i;if(i==-1){newValues.push(sendVal)}else{newValues[i]=sendVal}newReasons=_extends({},reasons,_defineProperty({},refI,reason))}var _checkForSave=this.checkForSave({newValues:newValues,newReasons:newReasons}),valid=_checkForSave.valid,changed=_checkForSave.changed;if(!doSave||!valid||!changed){this.setState({curValues:newValues,reasons:newReasons,saving:{},valid:valid,changed:changed})}else{this.toDb(newValues)}}},{key:'checkForSave',value:function checkForSave(info){var newValues=info.newValues,newReasons=info.newReasons;var _props2=this.props,name=_props2.name,updEdit=_props2.updEdit,savedValues=this.state.savedValues;var valid=Object.keys(newReasons).every(function(i){return!newReasons[i]});var changed=false;if(newValues.length!=savedValues.length){changed=true}else{for(var i in newValues){var cv=newValues[i];var sv=savedValues[i];if(sv==null){changed=true}else if((typeof cv==='undefined'?'undefined':_typeof(cv))=='object'){var _iteratorNormalCompletion=true;var _didIteratorError=false;var _iteratorError=undefined;try{for(var _iterator=Object.keys(cv)[Symbol.iterator](),_step;!(_iteratorNormalCompletion=(_step=_iterator.next()).done);_iteratorNormalCompletion=true){var k=_step.value;if(cv[k]!=sv[k]){changed=true;break}}}catch(err){_didIteratorError=true;_iteratorError=err}finally{try{if(!_iteratorNormalCompletion&&_iterator.return){_iterator.return()}}finally{if(_didIteratorError){throw _iteratorError}}}}else{if(cv!=sv){changed=true}}if(changed){break}}}updEdit(name,changed,valid,newValues);return{valid:valid,changed:changed}}},{key:'toDb',value:function toDb(newValues){var _props3=this.props,table=_props3.table,name=_props3.name,rowId=_props3.rowId,notification=_props3.notification,curValues=this.state.curValues;var sendValues=newValues==null?curValues:newValues;this.setState({reasons:{},saving:{status:'saving'}});(0,_data.getData)([{type:'db',path:'/mod?table='+table+'&action=update',branch:'save '+name,callback:this.saved,data:{_id:rowId,name:name,values:sendValues}}],this,notification.component)}},{key:'fullfillSave',value:function fullfillSave(){var _props4=this.props,editable=_props4.editable,saveConcern=_props4.saveConcern;if(editable&&saveConcern){this.saveField()}}},{key:'valueAsString',value:function valueAsString(valRaw){var _props5=this.props,valType=_props5.valType,convert=_props5.convert,user=_props5.user,country=_props5.country,initial=_props5.initial;if(valRaw==null){return{text:'',full:'',initial:valType=='rel'?true:initial}}switch(valType){case'rel':{switch(convert){case'user':{return userAsString(valRaw,user)}case'country':{return countryAsString(valRaw,country)}default:{return condense(valRaw.value)}}}case'datetime':{return trimDate(valRaw)}default:{return{text:valRaw,full:valRaw}}}}},{key:'relOptions',value:function relOptions(){var relValues=this.state.relValues;return relValues.map(function(rv){return[rv._id,condense(rv.value)]})}},{key:'userOptions',value:function userOptions(){var _this6=this;var user=this.props.user;return[].concat(_toConsumableArray(user)).map(function(rv){return[rv._id,_this6.valueAsString(rv)]})}},{key:'countryOptions',value:function countryOptions(){var _this7=this;var country=this.props.country;return[].concat(_toConsumableArray(country)).map(function(rv){return[rv._id,_this7.valueAsString(rv)]})}},{key:'relSelect',value:function relSelect(i,_id,isNew,extraClasses,valText){var text=valText.text,full=valText.full;var _props6=this.props,table=_props6.table,convert=_props6.convert,allowNew=_props6.allowNew,name=_props6.name,rowId=_props6.rowId,valid=this.state.valid;var valueList=convert=='user'?this.userOptions():convert=='country'?this.countryOptions():this.relOptions();return _react2.default.createElement(_RelSelect2.default,{tag:'relselect_'+table+'_'+rowId+'_'+name+'_'+i,table:table,key:i,isNew:isNew,allowNew:allowNew,valid:valid,valueList:valueList,initVal:_id,initText:text,initFull:full,extraClasses:extraClasses,onChange:(0,_memoBind2.default)(this,'changeRelVal',[i]),__source:{fileName:_jsxFileName,lineNumber:369}})}},{key:'editValControl',value:function editValControl(i,_id,isNew){var multiple=this.props.multiple;return isNew||!multiple?null:_react2.default.createElement('span',{className:'button-small fa fa-close',onClick:(0,_memoBind2.default)(this,'removeVal',[i]),__source:{fileName:_jsxFileName,lineNumber:388}})}},{key:'progIcon',value:function progIcon(){var editable=this.props.editable;var progIcon=void 0;if(editable){var _state2=this.state,status=_state2.saving.status,changed=_state2.changed,valid=_state2.valid;if(status=='saving'){progIcon='fa-spinner fa-spin'}else if(status=='saved'){progIcon='fa-check good'}else if(status=='error'){progIcon='fa-exclamation error'}else if(!valid){progIcon='fa-close error'}else if(changed){progIcon='fa-pencil warning'}else{progIcon='fa-circle-o hidden'}progIcon+=' fa progress'}else{progIcon='fa fa-lock progress info'}return _react2.default.createElement('span',{key:name,className:progIcon,__source:{fileName:_jsxFileName,lineNumber:490}})}},{key:'valuesAsReadonly',value:function valuesAsReadonly(){var _this8=this;var curValues=this.state.curValues;if(curValues.length==0){return _react2.default.createElement('span',{className:'warning',__source:{fileName:_jsxFileName,lineNumber:495}},'no value')}var _props7=this.props,valType=_props7.valType,multiple=_props7.multiple,_props7$appearance=_props7.appearance,cutoff=_props7$appearance.cutoff,reverse=_props7$appearance.reverse;var makeFragment=(0,_memoBind2.default)(this,'readonlyMakeFragment',[valType]);var alt2=[];var alt1=[];alt1.push(' ');var processValues=reverse?[].concat(_toConsumableArray(curValues)).reverse():curValues;processValues.forEach(function(v,i){var destAlt=!cutoff||i<=cutoff-1?alt1:alt2;var valText=_this8.valueAsString(v);var fragment=makeFragment(i,valType,valText);if(multiple||i==0){destAlt.push(fragment)}if(multiple){destAlt.push(' ')}});return this.knead(alt1,alt2)}},{key:'valuesAsControls',value:function valuesAsControls(){var _this9=this;var _props8=this.props,valType=_props8.valType,multiple=_props8.multiple,_props8$appearance=_props8.appearance,cutoff=_props8$appearance.cutoff,reverse=_props8$appearance.reverse,_state3=this.state,curValues=_state3.curValues,reasons=_state3.reasons;var makeFragment=(0,_memoBind2.default)(this,'editMakeFragment',[valType]);var alt2=[];var alt1=[];var enumCurValues=curValues.map(function(v,i){return[i,v]});var nValues=curValues.length;var processValues=reverse?enumCurValues.reverse():enumCurValues;if(multiple||nValues==0){processValues.push([nValues,null])}var size=sizes[valType]||sizes._max;var destAlt=alt1;var extraClasses=[];processValues.forEach(function(ev,j){var _ev=_slicedToArray(ev,2),i=_ev[0],v=_ev[1];var isNew=j==nValues;destAlt=!cutoff||j<=cutoff-1?alt1:alt2;var valText=_this9.valueAsString(v);var _id=v==null?null:v._id;extraClasses=[];var reason=reasons[i]||'';if(reason!=''){extraClasses.push('error')}var fragment=makeFragment(i,_id,isNew,valType,extraClasses,valText,size);if(multiple||j==0){destAlt.push(fragment);if(reason!=''){destAlt.push(' ');destAlt.push(_react2.default.createElement('span',{key:'r_'+i,className:'reason',__source:{fileName:_jsxFileName,lineNumber:545}},reason))}destAlt.push(' ')}});return this.knead(alt1,alt2)}},{key:'knead',value:function knead(alt1,alt2){var _props9=this.props,table=_props9.table,rowId=_props9.rowId,name=_props9.name;if(alt2.length==0){return alt1}return _react2.default.createElement(_Alternative2.default,{tag:'field_'+table+'_'+rowId+'_'+name,controlPlacement:(0,_memoBind2.default)(this,'kneadControlPlacement',[],[alt1]),controls:[this.kneadControl1,this.kneadControl2],alternatives:['',alt2],initial:0,__source:{fileName:_jsxFileName,lineNumber:561}})}},{key:'render',value:function render(){var _props10=this.props,label=_props10.label,editable=_props10.editable,valType=_props10.valType,convert=_props10.convert,relValues=this.state.relValues;if(editable&&relValues==null&&valType=='rel'&&convert!='user'&&convert!='country'){return null}var prog=this.progIcon();var values=editable?this.valuesAsControls():this.valuesAsReadonly();var onClick=editable&&this.saveLater?{onClick:this.saveField}:{};return _react2.default.createElement('tr',{__source:{fileName:_jsxFileName,lineNumber:583}},_react2.default.createElement('td',_extends({className:'label'},onClick,{__source:{fileName:_jsxFileName,lineNumber:584}}),label),_react2.default.createElement('td',_extends({className:'label'},onClick,{__source:{fileName:_jsxFileName,lineNumber:585}}),prog),_react2.default.createElement('td',{__source:{fileName:_jsxFileName,lineNumber:586}},_react2.default.createElement('div',{className:'values',__source:{fileName:_jsxFileName,lineNumber:586}},values)))}},{key:'fetchValues',value:function fetchValues(){var _props11=this.props,valType=_props11.valType,getValues=_props11.getValues,relValuesMap=_props11.relValuesMap,convert=_props11.convert,table=_props11.table,name=_props11.name,notification=_props11.notification,relValues=this.state.relValues;if(valType=='rel'&&convert!='user'&&convert!='country'){if(relValues==null){(0,_data.getData)([{type:'db',path:getValues,branch:'relValues'}],this,notification.component)}else{if(!relValuesMap.has(table)){relValuesMap.set(table,new Map)}if(!relValuesMap.get(table).has(name)){relValuesMap.get(table).set(name,relValues)}}}}},{key:'componentWillReceiveProps',value:function componentWillReceiveProps(nextProps){var initValues=this.props.initValues;var newInitValues=nextProps.initValues;if(!(0,_isequal2.default)(initValues,newInitValues)){this.initEdit(newInitValues)}}},{key:'componentDidMount',value:function componentDidMount(){this.fetchValues();this.fullfillSave()}},{key:'componentDidUpdate',value:function componentDidUpdate(){this.fetchValues();this.fullfillSave()}}]);return ItemField}(_react.Component);var mapStateToProps=function mapStateToProps(_ref5){var _ref5$tables=_ref5.tables,user=_ref5$tables.user,country=_ref5$tables.country;return{user:user,country:country}};exports.default=(0,_reactRedux.connect)(mapStateToProps)((0,_hoc.withContext)((0,_hoc.saveState)(ItemField,'ItemField',normalizeValues)));

},{"Alternative.jsx":112,"RelSelect.jsx":121,"data.js":"data.js","hoc.js":"hoc.js","lodash/isequal":75,"memoBind.js":"memoBind.js","react":"react","react-markdown":"react-markdown","react-redux":"react-redux"}],116:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _jsxFileName='/Users/dirk/github/dariah/client/src/js/app/state/ItemFiltered.jsx';var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if('value'in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor}}();var _react=require('react');var _react2=_interopRequireDefault(_react);var _reactRedux=require('react-redux');var _FilterCompute=require('FilterCompute.jsx');var _FilterCompute2=_interopRequireDefault(_FilterCompute);var _filtering=require('filtering.js');var _server=require('server.js');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function')}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called')}return call&&(typeof call==='object'||typeof call==='function')?call:self}function _inherits(subClass,superClass){if(typeof superClass!=='function'&&superClass!==null){throw new TypeError('Super expression must either be null or a function, not '+typeof superClass)}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass}var ItemFiltered=function(_Component){_inherits(ItemFiltered,_Component);function ItemFiltered(){_classCallCheck(this,ItemFiltered);return _possibleConstructorReturn(this,(ItemFiltered.__proto__||Object.getPrototypeOf(ItemFiltered)).apply(this,arguments))}_createClass(ItemFiltered,[{key:'render',value:function render(){var _props=this.props,table=_props.params.table,tables=_props.tables;if(tables==null||tables[table]==null||tables.country==null||tables.user==null){return _react2.default.createElement('div',{__source:{fileName:_jsxFileName,lineNumber:14}})}var _tables$table=tables[table],records=_tables$table.records,order=_tables$table.order,fields=_tables$table.fields,title=_tables$table.title,filterList=_tables$table.filterList;var _compileFiltering=(0,_filtering.compileFiltering)(records,order,fields,filterList),fieldValues=_compileFiltering.fieldValues,filterInit=_compileFiltering.filterInit;return _react2.default.createElement(_FilterCompute2.default,{tag:table,table:table,records:records,order:order,fields:fields,title:title,fieldValues:fieldValues,filterList:filterList,filterInit:filterInit,__source:{fileName:_jsxFileName,lineNumber:19}})}},{key:'componentDidMount',value:function componentDidMount(){var _props2=this.props,table=_props2.params.table,tables=_props2.tables,fetch=_props2.fetch;if(tables==null||tables[table]==null){fetch({type:'fetchTable',contentType:'db',path:'/list?table='+table,desc:table+' table}',table:table})}if(tables==null||tables.country==null){fetch({type:'fetchTable',contentType:'db',path:'/member_country',desc:'country table}',table:'country'})}if(tables==null||tables.user==null){fetch({type:'fetchTable',contentType:'db',path:'/user',desc:'user table}',table:'user'})}}}]);return ItemFiltered}(_react.Component);var mapStateToProps=function mapStateToProps(_ref){var tables=_ref.tables;return{tables:tables}};exports.default=(0,_reactRedux.connect)(mapStateToProps,{fetch:_server.fetchData})(ItemFiltered);

},{"FilterCompute.jsx":114,"filtering.js":"filtering.js","react":"react","react-redux":"react-redux","server.js":87}],117:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _jsxFileName='/Users/dirk/github/dariah/client/src/js/app/state/ItemMy.jsx';var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if('value'in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor}}();var _react=require('react');var _react2=_interopRequireDefault(_react);var _reactRedux=require('react-redux');var _server=require('server.js');var _ItemList=require('ItemList.jsx');var _ItemList2=_interopRequireDefault(_ItemList);var _data=require('data.js');var _hoc=require('hoc.js');var _window=require('window.js');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function')}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called')}return call&&(typeof call==='object'||typeof call==='function')?call:self}function _inherits(subClass,superClass){if(typeof superClass!=='function'&&superClass!==null){throw new TypeError('Super expression must either be null or a function, not '+typeof superClass)}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass}var ItemMy=function(_Component){_inherits(ItemMy,_Component);function ItemMy(){var _ref;var _temp,_this,_ret;_classCallCheck(this,ItemMy);for(var _len=arguments.length,args=Array(_len),_key=0;_key<_len;_key++){args[_key]=arguments[_key]}return _ret=(_temp=(_this=_possibleConstructorReturn(this,(_ref=ItemMy.__proto__||Object.getPrototypeOf(ItemMy)).call.apply(_ref,[this].concat(args))),_this),_this.inserted=function(data){var _this2=_this,_this2$props=_this2.props,table=_this2$props.params.table,router=_this2$props.router;if(data!=null){router.push('/'+table+'/mylist/'+data)}},_this.handleInsert=function(event){event.preventDefault();var _this3=_this,_this3$props=_this3.props,table=_this3$props.params.table,notification=_this3$props.notification;(0,_data.getData)([{type:'db',path:'/mod?table='+table+'&action=insert',branch:'insert',callback:_this.inserted},{type:'db',path:'/my?table='+table,branch:'listData'}],_this,notification.component)},_this.deleted=function(data){var _this4=_this,_this4$props=_this4.props,table=_this4$props.params.table,router=_this4$props.router;if(data!=null){router.push('/'+table+'/mylist')}},_this.deleteRow=function(recordId){return function(event){event.preventDefault();var _this5=_this,_this5$props=_this5.props,table=_this5$props.params.table,notification=_this5$props.notification;(0,_data.getData)([{type:'db',path:'/mod?table='+table+'&action=delete',branch:'delete',callback:_this.deleted,data:{_id:recordId}},{type:'db',path:'/my?table='+table,branch:'listData'}],_this,notification.component)}},_temp),_possibleConstructorReturn(_this,_ret)}_createClass(ItemMy,[{key:'render',value:function render(){var _props=this.props,table=_props.params.table,tables=_props.tables,children=_props.children,height=_props.height,width=_props.width;if(tables==null||tables[table]==null||tables[table].my==null||tables.country==null||tables.user==null){return _react2.default.createElement('div',{__source:{fileName:_jsxFileName,lineNumber:79}})}var _tables$table=tables[table],records=_tables$table.records,title=_tables$table.title,perm=_tables$table.perm,my=_tables$table.my;return _react2.default.createElement('div',{__source:{fileName:_jsxFileName,lineNumber:83}},_react2.default.createElement('div',{className:'nav sized',style:(0,_window.columnStyle)('rightLeftNav',{height:height,width:width}),__source:{fileName:_jsxFileName,lineNumber:84}},_react2.default.createElement('p',{__source:{fileName:_jsxFileName,lineNumber:88}},my.length+' items ',perm!=null&&perm.insert?_react2.default.createElement('span',{className:'fa fa-plus button-large insert',title:'New item',onClick:this.handleInsert,__source:{fileName:_jsxFileName,lineNumber:91}}):null),_react2.default.createElement(_ItemList2.default,{table:table,title:title,filteredData:my.map(function(_id){return records[_id]}),inplace:false,__source:{fileName:_jsxFileName,lineNumber:98}})),_react2.default.createElement('div',{className:'sized',style:(0,_window.columnStyle)('rightRightBody',{height:height,width:width}),__source:{fileName:_jsxFileName,lineNumber:100}},children))}},{key:'componentDidMount',value:function componentDidMount(){var _props2=this.props,table=_props2.params.table,tables=_props2.tables,fetch=_props2.fetch,setList=_props2.setList;if(tables==null||tables[table]==null||tables[table].my==null){fetch({type:'fetchTableMy',contentType:'db',path:'/my?table='+table,desc:table+' table (my records)}',table:table});setList({type:'setList',table:table,listObj:this})}if(tables==null||tables.country==null){fetch({type:'fetchTable',contentType:'db',path:'/member_country',desc:'country table}',table:'country'})}if(tables==null||tables.user==null){fetch({type:'fetchTable',contentType:'db',path:'/user',desc:'user table}',table:'user'})}}}]);return ItemMy}(_react.Component);var mapStateToProps=function mapStateToProps(_ref2){var tables=_ref2.tables,_ref2$win=_ref2.win,height=_ref2$win.height,width=_ref2$win.width;return{tables:tables,height:height,width:width}};exports.default=(0,_reactRedux.connect)(mapStateToProps,{fetch:_server.fetchData,setList:function setList(x){return function(dispatch){return x}}})((0,_hoc.withContext)(ItemMy));

},{"ItemList.jsx":102,"data.js":"data.js","hoc.js":"hoc.js","react":"react","react-redux":"react-redux","server.js":87,"window.js":"window.js"}],118:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _jsxFileName='/Users/dirk/github/dariah/client/src/js/app/state/ItemRecord.jsx';var _slicedToArray=function(){function sliceIterator(arr,i){var _arr=[];var _n=true;var _d=false;var _e=undefined;try{for(var _i=arr[Symbol.iterator](),_s;!(_n=(_s=_i.next()).done);_n=true){_arr.push(_s.value);if(i&&_arr.length===i)break}}catch(err){_d=true;_e=err}finally{try{if(!_n&&_i['return'])_i['return']()}finally{if(_d)throw _e}}return _arr}return function(arr,i){if(Array.isArray(arr)){return arr}else if(Symbol.iterator in Object(arr)){return sliceIterator(arr,i)}else{throw new TypeError('Invalid attempt to destructure non-iterable instance')}}}();var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key]}}}return target};var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if('value'in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor}}();var _react=require('react');var _react2=_interopRequireDefault(_react);var _reactRedux=require('react-redux');var _ItemField=require('ItemField.jsx');var _ItemField2=_interopRequireDefault(_ItemField);var _data=require('data.js');var _hoc=require('hoc.js');var _memoBind=require('memoBind.js');var _memoBind2=_interopRequireDefault(_memoBind);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true})}else{obj[key]=value}return obj}function _objectWithoutProperties(obj,keys){var target={};for(var i in obj){if(keys.indexOf(i)>=0)continue;if(!Object.prototype.hasOwnProperty.call(obj,i))continue;target[i]=obj[i]}return target}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function')}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called')}return call&&(typeof call==='object'||typeof call==='function')?call:self}function _inherits(subClass,superClass){if(typeof superClass!=='function'&&superClass!==null){throw new TypeError('Super expression must either be null or a function, not '+typeof superClass)}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass}var ItemRecord=function(_Component){_inherits(ItemRecord,_Component);function ItemRecord(){var _ref;var _temp,_this,_ret;_classCallCheck(this,ItemRecord);for(var _len=arguments.length,args=Array(_len),_key=0;_key<_len;_key++){args[_key]=arguments[_key]}return _ret=(_temp=(_this=_possibleConstructorReturn(this,(_ref=ItemRecord.__proto__||Object.getPrototypeOf(ItemRecord)).call.apply(_ref,[this].concat(args))),_this),_this.updMod=function(modifiedRowData){var updRow=function updRow(_ref2){var _ref2$fieldData=_ref2.fieldData,row=_ref2$fieldData.row,oldFieldData=_objectWithoutProperties(_ref2$fieldData,['row']);return _extends({},oldFieldData,{row:_extends({row:row},modifiedRowData)})};_this.setState(updRow)},_this.updEdit=function(name,changed,valid,newVals){var _this2=_this,_this2$props=_this2.props,editStatus=_this2$props.editStatus,table=_this2$props.table,recordId=_this2$props.recordId,_this2$state=_this2.state,title=_this2$state.fieldData.title,prevChanged=_this2$state.changed,prevValid=_this2$state.valid;if(name==title){var domTitle=editStatus[table][recordId].title;var _newVals=_slicedToArray(newVals,1);domTitle.innerHTML=_newVals[0]}var newState={changed:_extends({},prevChanged,_defineProperty({},name,changed)),valid:_extends({},prevValid,_defineProperty({},name,valid))};var _this$saveStatus=_this.saveStatus(newState),noChange=_this$saveStatus.noChange,allValid=_this$saveStatus.allValid,canSave=_this$saveStatus.canSave;_this.progIcon(noChange,allValid);if(!canSave){newState.saveConcern=false}_this.setState(newState)},_this.handleSaveAll=function(){var _this$saveStatus2=_this.saveStatus(),canSave=_this$saveStatus2.canSave;if(canSave){_this.setState({saveConcern:true})}},_temp),_possibleConstructorReturn(_this,_ret)}_createClass(ItemRecord,[{key:'progIcon',value:function progIcon(noChange,allValid){var _props=this.props,editStatus=_props.editStatus,table=_props.table,recordId=_props.recordId;var statusClass=noChange?'info':allValid?'warning':'error';var statusIcon=noChange?'':allValid?'fa-pencil':'fa-close';var domProg=editStatus[table][recordId].prog;domProg.className=statusClass+' fa '+statusIcon}},{key:'parseFields',value:function parseFields(){var table=this.props.table,_state=this.state,_state$fieldData=_state.fieldData,row=_state$fieldData.row,fields=_state$fieldData.fields,fieldSpecs=_state$fieldData.fieldSpecs,fieldOrder=_state$fieldData.fieldOrder,perm=_state$fieldData.perm,saveConcern=_state.saveConcern;var rowId=row._id;var fragments=[];var hasEditable=false;var _iteratorNormalCompletion=true;var _didIteratorError=false;var _iteratorError=undefined;try{for(var _iterator=fieldOrder[Symbol.iterator](),_step;!(_iteratorNormalCompletion=(_step=_iterator.next()).done);_iteratorNormalCompletion=true){var name=_step.value;var _fieldSpecs$name=fieldSpecs[name],label=_fieldSpecs$name.label,initial=_fieldSpecs$name.initial,specs=_objectWithoutProperties(_fieldSpecs$name,['label','initial']);var f=fields[name];if(f==null){continue}var editable=perm.update[name];if(editable){hasEditable=true}var initValues=row[name];fragments.push(_react2.default.createElement(_ItemField2.default,_extends({key:name,tag:'field_'+table+'_'+rowId+'_'+name,table:table,initValues:initValues,rowId:rowId,editable:!!editable,name:name,label:label,initial:initial,saveConcern:saveConcern,updMod:this.updMod,updEdit:this.updEdit},specs,{__source:{fileName:_jsxFileName,lineNumber:75}})))}}catch(err){_didIteratorError=true;_iteratorError=err}finally{try{if(!_iteratorNormalCompletion&&_iterator.return){_iterator.return()}}finally{if(_didIteratorError){throw _iteratorError}}}return{fragments:fragments,hasEditable:hasEditable}}},{key:'saveStatus',value:function saveStatus(newState){var state=this.state;var _ref3=newState==null?state:newState,changed=_ref3.changed,valid=_ref3.valid;var noChange=Object.keys(changed).every(function(n){return!changed[n]});var allValid=Object.keys(valid).every(function(n){return valid[n]});var canSave=!Object.keys(changed).every(function(n){return!changed[n]||!valid[n]});return{noChange:noChange,allValid:allValid,canSave:canSave}}},{key:'render',value:function render(){var _props2=this.props,table=_props2.table,lists=_props2.lists,_state$fieldData2=this.state.fieldData,row=_state$fieldData2.row,perm=_state$fieldData2.perm;if(row==null){return _react2.default.createElement('div',{__source:{fileName:_jsxFileName,lineNumber:110}})}var _saveStatus=this.saveStatus(),noChange=_saveStatus.noChange,allValid=_saveStatus.allValid,canSave=_saveStatus.canSave;var statusClass=noChange?'special':allValid?'warning':'error';var elemText=noChange?'all saved':allValid?'save changes':'make corrections';var rowId=row._id;var _parseFields=this.parseFields(),fragments=_parseFields.fragments,hasEditable=_parseFields.hasEditable;var parent=lists[table];return _react2.default.createElement('div',{className:'widget-medium',__source:{fileName:_jsxFileName,lineNumber:119}},_react2.default.createElement('p',{__source:{fileName:_jsxFileName,lineNumber:120}},hasEditable?[canSave?_react2.default.createElement('span',{key:'save',className:'button-large '+statusClass,onClick:this.handleSaveAll,__source:{fileName:_jsxFileName,lineNumber:123}},elemText):_react2.default.createElement('span',{key:'nosave',className:'button-large '+statusClass,__source:{fileName:_jsxFileName,lineNumber:129}},elemText),perm.delete?_react2.default.createElement('span',{key:'delete',className:'fa fa-trash button-large delete',title:'delete this item',onClick:parent?(0,_memoBind2.default)(parent,'deleteRow',[rowId]):null,__source:{fileName:_jsxFileName,lineNumber:135}}):null]:null),_react2.default.createElement('table',{__source:{fileName:_jsxFileName,lineNumber:144}},_react2.default.createElement('tbody',{__source:{fileName:_jsxFileName,lineNumber:145}},fragments)))}},{key:'fetchRow',value:function fetchRow(){var _props3=this.props,table=_props3.table,recordId=_props3.recordId,ownOnly=_props3.ownOnly,notification=_props3.notification,fieldData=this.state.fieldData;if(Object.keys(fieldData).length==0){(0,_data.getData)([{type:'db',path:'/view?table='+table+'&id='+recordId+(ownOnly?'&own=true':''),branch:'fieldData'}],this,notification.component)}}},{key:'componentDidMount',value:function componentDidMount(){this.fetchRow()}},{key:'componentDidUpdate',value:function componentDidUpdate(){this.fetchRow()}}]);return ItemRecord}(_react.Component);var mapStateToProps=function mapStateToProps(_ref4){var lists=_ref4.lists;return{lists:lists}};exports.default=(0,_reactRedux.connect)(mapStateToProps)((0,_hoc.withContext)((0,_hoc.saveState)(ItemRecord,'ItemRecord',{fieldData:{},changed:{},valid:{},saveConcern:false})));

},{"ItemField.jsx":115,"data.js":"data.js","hoc.js":"hoc.js","memoBind.js":"memoBind.js","react":"react","react-redux":"react-redux"}],119:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _jsxFileName='/Users/dirk/github/dariah/client/src/js/app/state/Login.jsx';var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if('value'in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor}}();var _react=require('react');var _react2=_interopRequireDefault(_react);var _reactRedux=require('react-redux');var _LocalSettings=require('LocalSettings.jsx');var _LocalSettings2=_interopRequireDefault(_LocalSettings);var _server=require('server.js');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function')}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called')}return call&&(typeof call==='object'||typeof call==='function')?call:self}function _inherits(subClass,superClass){if(typeof superClass!=='function'&&superClass!==null){throw new TypeError('Super expression must either be null or a function, not '+typeof superClass)}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass}var Login=function(_Component){_inherits(Login,_Component);function Login(){_classCallCheck(this,Login);return _possibleConstructorReturn(this,(Login.__proto__||Object.getPrototypeOf(Login)).apply(this,arguments))}_createClass(Login,[{key:'render',value:function render(){var me=this.props.me;return _react2.default.createElement('span',{className:'login',__source:{fileName:_jsxFileName,lineNumber:10}},me.eppn&&Object.keys(me).length>0?_react2.default.createElement('span',{__source:{fileName:_jsxFileName,lineNumber:12}},_react2.default.createElement('strong',{className:'fa fa-user',title:me.eppn,__source:{fileName:_jsxFileName,lineNumber:13}},me.eppn.split('@')[0]),_react2.default.createElement('span',{className:'fa fa-hashtag',__source:{fileName:_jsxFileName,lineNumber:14}}),me.authority,' ',_react2.default.createElement('em',{__source:{fileName:_jsxFileName,lineNumber:15}},me.groupDesc||'not authenticated'),_react2.default.createElement('a',{href:'/logout',className:'control fa fa-user-times',title:'log out',__source:{fileName:_jsxFileName,lineNumber:16}}),_react2.default.createElement('a',{href:'/slogout',className:'control fa fa-users',title:'sign out',__source:{fileName:_jsxFileName,lineNumber:17}})):_react2.default.createElement('a',{href:'/login',className:'control fa fa-user-plus',__source:{fileName:_jsxFileName,lineNumber:20}},' login'),_react2.default.createElement(_LocalSettings2.default,{__source:{fileName:_jsxFileName,lineNumber:22}}))}},{key:'componentDidMount',value:function componentDidMount(){var fetch=this.props.fetch;fetch({type:'fetchMe',contentType:'db',path:'/who/ami',desc:'me'})}}]);return Login}(_react.Component);var mapStateToProps=function mapStateToProps(_ref){var me=_ref.me;return{me:me}};exports.default=(0,_reactRedux.connect)(mapStateToProps,{fetch:_server.fetchData})(Login);

},{"LocalSettings.jsx":104,"react":"react","react-redux":"react-redux","server.js":87}],120:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _jsxFileName='/Users/dirk/github/dariah/client/src/js/app/state/Notification.jsx';var _slicedToArray=function(){function sliceIterator(arr,i){var _arr=[];var _n=true;var _d=false;var _e=undefined;try{for(var _i=arr[Symbol.iterator](),_s;!(_n=(_s=_i.next()).done);_n=true){_arr.push(_s.value);if(i&&_arr.length===i)break}}catch(err){_d=true;_e=err}finally{try{if(!_n&&_i['return'])_i['return']()}finally{if(_d)throw _e}}return _arr}return function(arr,i){if(Array.isArray(arr)){return arr}else if(Symbol.iterator in Object(arr)){return sliceIterator(arr,i)}else{throw new TypeError('Invalid attempt to destructure non-iterable instance')}}}();var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if('value'in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor}}();var _react=require('react');var _react2=_interopRequireDefault(_react);var _hoc=require('hoc.js');var _memoBind=require('memoBind.js');var _memoBind2=_interopRequireDefault(_memoBind);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function _toConsumableArray(arr){if(Array.isArray(arr)){for(var i=0,arr2=Array(arr.length);i<arr.length;i++){arr2[i]=arr[i]}return arr2}else{return Array.from(arr)}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function')}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called')}return call&&(typeof call==='object'||typeof call==='function')?call:self}function _inherits(subClass,superClass){if(typeof superClass!=='function'&&superClass!==null){throw new TypeError('Super expression must either be null or a function, not '+typeof superClass)}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass}var empty=[];var Notification=function(_Component){_inherits(Notification,_Component);function Notification(props){_classCallCheck(this,Notification);var _this=_possibleConstructorReturn(this,(Notification.__proto__||Object.getPrototypeOf(Notification)).call(this,props));_this.refDom=function(label){return function(dom){if(dom){_this.dom[label]=dom}}};_this.notificationHandler=function(action){return function(event){event.preventDefault();if(action==null){_this.clear()}else{_this.setView(action)}}};props.notification.component=_this;_this.msgs=[];_this.visible=false;_this.dom={};return _this}_createClass(Notification,[{key:'notify',value:function notify(msg){this.msgs.push(msg);this.setState({msgs:[].concat(_toConsumableArray(this.msgs))})}},{key:'clear',value:function clear(){this.msgs=[];this.setState({msgs:[]})}},{key:'computeProgress',value:function computeProgress(){var lastMsg=this.msgs.length-1;var lastNote=-1;var lastKind='info';var busy=0;this.msgs.forEach(function(msg,i){if(msg.kind=='error'){lastNote=i;lastKind='error'}else if(msg.kind=='warning'){if(lastKind!='error'){lastNote=i;lastKind='warning'}}busy+=msg.busy||0});if(busy<0){busy=0}var visible=this.visible||lastNote>-1;return[lastMsg,lastNote,lastKind,busy,visible]}},{key:'render',value:function render(){var _this2=this;var _computeProgress=this.computeProgress();var _computeProgress2=_slicedToArray(_computeProgress,5);this.lastMsg=_computeProgress2[0];this.lastNote=_computeProgress2[1];this.lastKind=_computeProgress2[2];this.busy=_computeProgress2[3];this.visible=_computeProgress2[4];var busyBlocks=new Array(this.busy).fill(1);return _react2.default.createElement('div',{__source:{fileName:_jsxFileName,lineNumber:60}},_react2.default.createElement('p',{className:'msg-spinner',__source:{fileName:_jsxFileName,lineNumber:61}},_react2.default.createElement('span',{title:'show/hide notifications and progress messages',className:this.lastNote>-1?'spin-'+this.lastKind:'spin-ok',__source:{fileName:_jsxFileName,lineNumber:62}},busyBlocks.map(function(b,i){return _react2.default.createElement('span',{key:i,className:'msg-dot fa fa-caret-left',__source:{fileName:_jsxFileName,lineNumber:66}})}),_react2.default.createElement('span',{className:'fa fa-'+(this.busy==0?'circle-o':'spinner fa-spin'),onClick:(0,_memoBind2.default)(this,'notificationHandler',[!this.visible]),__source:{fileName:_jsxFileName,lineNumber:67}}))),_react2.default.createElement('div',{ref:(0,_memoBind2.default)(this,'refDom',['notbox']),className:'msg-box',onClick:(0,_memoBind2.default)(this,'notificationHandler',[false]),__source:{fileName:_jsxFileName,lineNumber:73}},(this.msgs||empty).map(function(msg,index){return _react2.default.createElement('p',{title:msg.cause,key:index,ref:(0,_memoBind2.default)(_this2,'refDom',['m'+index]),className:'msg-line '+[msg.kind]+'-o '+(msg.kind!='info'?'msg-high':''),__source:{fileName:_jsxFileName,lineNumber:79}},msg.text)}),_react2.default.createElement('p',{className:'msg-dismiss',__source:{fileName:_jsxFileName,lineNumber:87}},'(click panel to hide)'),_react2.default.createElement('p',{className:'msg-trash',__source:{fileName:_jsxFileName,lineNumber:88}},_react2.default.createElement('a',{href:'#',title:'clear messages',className:'control fa fa-trash',onClick:(0,_memoBind2.default)(this,'notificationHandler',[null]),__source:{fileName:_jsxFileName,lineNumber:89}}))))}},{key:'componentDidMount',value:function componentDidMount(){this.setView()}},{key:'componentDidUpdate',value:function componentDidUpdate(){this.setView()}},{key:'setView',value:function setView(on){if(on!=null){this.visible=on}this.dom.notbox.style.display=this.visible?'block':'none';this.setScroll()}},{key:'setScroll',value:function setScroll(){if(this.visible){if(this.lastNote>-1){this.dom['m'+this.lastNote].scrollIntoView()}else{if(this.lastMsg>-1){this.dom['m'+this.lastMsg].scrollIntoView()}}}}}]);return Notification}(_react.Component);exports.default=(0,_hoc.withContext)((0,_hoc.saveState)(Notification,'Notification',{msgs:null}));

},{"hoc.js":"hoc.js","memoBind.js":"memoBind.js","react":"react"}],121:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _slicedToArray=function(){function sliceIterator(arr,i){var _arr=[];var _n=true;var _d=false;var _e=undefined;try{for(var _i=arr[Symbol.iterator](),_s;!(_n=(_s=_i.next()).done);_n=true){_arr.push(_s.value);if(i&&_arr.length===i)break}}catch(err){_d=true;_e=err}finally{try{if(!_n&&_i['return'])_i['return']()}finally{if(_d)throw _e}}return _arr}return function(arr,i){if(Array.isArray(arr)){return arr}else if(Symbol.iterator in Object(arr)){return sliceIterator(arr,i)}else{throw new TypeError('Invalid attempt to destructure non-iterable instance')}}}();var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if('value'in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor}}();var _jsxFileName='/Users/dirk/github/dariah/client/src/js/app/state/RelSelect.jsx';var _react=require('react');var _react2=_interopRequireDefault(_react);var _hoc=require('hoc.js');var _memoBind=require('memoBind.js');var _memoBind2=_interopRequireDefault(_memoBind);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function')}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called')}return call&&(typeof call==='object'||typeof call==='function')?call:self}function _inherits(subClass,superClass){if(typeof superClass!=='function'&&superClass!==null){throw new TypeError('Super expression must either be null or a function, not '+typeof superClass)}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass}var RelOption=function RelOption(_ref){var value=_ref.value,selected=_ref.selected,onHit=_ref.onHit;return _react2.default.createElement('p',{className:'option '+selected,onClick:onHit,__source:{fileName:_jsxFileName,lineNumber:7}},value.long||value.full)};var initState=function initState(_ref2){var initVal=_ref2.initVal,initFull=_ref2.initFull,initText=_ref2.initText;return{poppedUp:false,search:'',selVal:initVal,selFull:initFull,selText:initText}};var togglePopUp=function togglePopUp(_ref3){var poppedUp=_ref3.poppedUp;return{poppedUp:!poppedUp}};var RelSelect=function(_Component){_inherits(RelSelect,_Component);function RelSelect(){var _ref4;var _temp,_this,_ret;_classCallCheck(this,RelSelect);for(var _len=arguments.length,args=Array(_len),_key=0;_key<_len;_key++){args[_key]=arguments[_key]}return _ret=(_temp=(_this=_possibleConstructorReturn(this,(_ref4=RelSelect.__proto__||Object.getPrototypeOf(RelSelect)).call.apply(_ref4,[this].concat(args))),_this),_this.handlePopUp=function(){_this.setState(togglePopUp)},_this.handleSearch=function(event){var value=event.target.value;_this.setState({value:value})},_this.changeSel=function(selVal,selFull,selText){return function(){var _this2=_this,onChange=_this2.props.onChange;_this.setState({poppedUp:false,selVal:selVal,selFull:selFull,selText:selText});onChange(selVal,selFull,selText)}},_this.addVal=function(selText){return function(){var _this3=_this,onChange=_this3.props.onChange;var selVal=null;_this.setState({poppedUp:false,selVal:selVal,selFull:selText,selText:selText});onChange(null,selText)}},_this.setHeight=function(n){return function(domElem){if(domElem!=null){var height=Math.max(1,Math.min(n,25))*1.7;domElem.style.height=height+'em';domElem.scrollIntoView()}}},_temp),_possibleConstructorReturn(_this,_ret)}_createClass(RelSelect,[{key:'render',value:function render(){var _this4=this;var _props=this.props,isNew=_props.isNew,allowNew=_props.allowNew,valid=_props.valid,valueList=_props.valueList,extraClasses=_props.extraClasses,_state=this.state,poppedUp=_state.poppedUp,search=_state.search,selVal=_state.selVal,selFull=_state.selFull,selText=_state.selText;var pat=search.toLowerCase();var icon=poppedUp?isNew?'minus':'arrow-up':isNew?'plus':'arrow-down';var xclasses=extraClasses.join(' ');return _react2.default.createElement('div',{className:'select',__source:{fileName:_jsxFileName,lineNumber:60}},_react2.default.createElement('p',{className:'option-head tag-medium',__source:{fileName:_jsxFileName,lineNumber:61}},isNew?null:_react2.default.createElement('span',{className:xclasses,title:selFull,__source:{fileName:_jsxFileName,lineNumber:62}},selText),_react2.default.createElement('span',{className:'button-small fa fa-'+icon,onClick:this.handlePopUp,__source:{fileName:_jsxFileName,lineNumber:63}})),poppedUp||!valid?_react2.default.createElement('div',{className:'option-popup',__source:{fileName:_jsxFileName,lineNumber:69}},_react2.default.createElement('p',{className:'option-type',__source:{fileName:_jsxFileName,lineNumber:70}},_react2.default.createElement('input',{type:'text',placeholder:'search...',value:search,className:xclasses,onChange:this.handleSearch,__source:{fileName:_jsxFileName,lineNumber:71}}),allowNew&&search!=''?_react2.default.createElement('span',{className:'button-small fa fa-plus-square',onClick:(0,_memoBind2.default)(this,'addVal',[search]),__source:{fileName:_jsxFileName,lineNumber:79}}):null),_react2.default.createElement('div',{ref:this.setHeight(valueList.length),className:'options',__source:{fileName:_jsxFileName,lineNumber:85}},valueList.map(function(_ref5){var _ref6=_slicedToArray(_ref5,2),_id=_ref6[0],value=_ref6[1];return pat==null||pat==''||value==null||value.full==null||value.full.toLowerCase().indexOf(pat)!==-1?_react2.default.createElement(RelOption,{key:_id==null?'null':_id,value:value,selected:_id==selVal,onHit:(0,_memoBind2.default)(_this4,'changeSel',[_id],[value.full,value.text]),__source:{fileName:_jsxFileName,lineNumber:92}}):null}))):null)}}]);return RelSelect}(_react.Component);exports.default=(0,_hoc.withContext)((0,_hoc.saveState)(RelSelect,'RelSelect',initState));

},{"hoc.js":"hoc.js","memoBind.js":"memoBind.js","react":"react"}],122:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if('value'in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor}}();var _react=require('react');var _reactRedux=require('react-redux');var _throttle=require('lodash/throttle');var _throttle2=_interopRequireDefault(_throttle);var _ui=require('ui.js');var _store=require('store.js');var _store2=_interopRequireDefault(_store);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError('Cannot call a class as a function')}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called')}return call&&(typeof call==='object'||typeof call==='function')?call:self}function _inherits(subClass,superClass){if(typeof superClass!=='function'&&superClass!==null){throw new TypeError('Super expression must either be null or a function, not '+typeof superClass)}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass}var Window=function(_Component){_inherits(Window,_Component);function Window(props){_classCallCheck(this,Window);var _this=_possibleConstructorReturn(this,(Window.__proto__||Object.getPrototypeOf(Window)).call(this,props));_this.newWindowSize=(0,_throttle2.default)(function(event){var resize=_this.props.resize;resize()},1000);_this.globals={store:new _store2.default,notification:{component:null},relValuesMap:new Map,editStatus:{}};return _this}_createClass(Window,[{key:'getChildContext',value:function getChildContext(){var globals=this.globals;return{globals:globals}}},{key:'render',value:function render(){var children=this.props.children;return _react.Children.only(children)}},{key:'componentDidMount',value:function componentDidMount(){window.addEventListener('resize',this.newWindowSize)}},{key:'componentWillUnmount',value:function componentWillUnmount(){window.removeEventListener('resize',this.newWindowSize)}}]);return Window}(_react.Component);Window.childContextTypes={globals:_react.PropTypes.object.isRequired};var mapStateToProps=function mapStateToProps(_ref){var win=_ref.win;return{win:win}};exports.default=(0,_reactRedux.connect)(mapStateToProps,{resize:_ui.winDim})(Window);

},{"lodash/throttle":85,"react":"react","react-redux":"react-redux","store.js":"store.js","ui.js":88}]},{},[89])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19EYXRhVmlldy5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX0hhc2guanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19MaXN0Q2FjaGUuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19NYXAuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19NYXBDYWNoZS5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX1Byb21pc2UuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19TZXQuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19TZXRDYWNoZS5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX1N0YWNrLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fU3ltYm9sLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fVWludDhBcnJheS5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX1dlYWtNYXAuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19hcnJheUxpa2VLZXlzLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fYXJyYXlTb21lLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fYXNzb2NJbmRleE9mLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fYmFzZUdldFRhZy5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX2Jhc2VJc0FyZ3VtZW50cy5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX2Jhc2VJc0VxdWFsLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fYmFzZUlzRXF1YWxEZWVwLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fYmFzZUlzTmF0aXZlLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fYmFzZUlzVHlwZWRBcnJheS5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX2Jhc2VLZXlzLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fYmFzZVRpbWVzLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fYmFzZVVuYXJ5LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fY2FjaGVIYXMuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19jb3JlSnNEYXRhLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fZXF1YWxBcnJheXMuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19lcXVhbEJ5VGFnLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fZXF1YWxPYmplY3RzLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fZnJlZUdsb2JhbC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX2dldE1hcERhdGEuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19nZXROYXRpdmUuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19nZXRUYWcuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19nZXRWYWx1ZS5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX2hhc2hDbGVhci5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX2hhc2hEZWxldGUuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19oYXNoR2V0LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9faGFzaEhhcy5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX2hhc2hTZXQuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19pc0luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9faXNLZXlhYmxlLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9faXNNYXNrZWQuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19pc1Byb3RvdHlwZS5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX2xpc3RDYWNoZUNsZWFyLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fbGlzdENhY2hlRGVsZXRlLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fbGlzdENhY2hlR2V0LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fbGlzdENhY2hlSGFzLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fbGlzdENhY2hlU2V0LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fbWFwQ2FjaGVDbGVhci5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX21hcENhY2hlRGVsZXRlLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fbWFwQ2FjaGVHZXQuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19tYXBDYWNoZUhhcy5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX21hcENhY2hlU2V0LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fbWFwVG9BcnJheS5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX25hdGl2ZUNyZWF0ZS5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX25hdGl2ZUtleXMuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19ub2RlVXRpbC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX292ZXJBcmcuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19yb290LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fc2V0Q2FjaGVBZGQuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19zZXRDYWNoZUhhcy5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX3NldFRvQXJyYXkuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19zdGFja0NsZWFyLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fc3RhY2tEZWxldGUuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19zdGFja0dldC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX3N0YWNrSGFzLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fc3RhY2tTZXQuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL190b1NvdXJjZS5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvZGVib3VuY2UuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2VxLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9pc0FyZ3VtZW50cy5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvaXNBcnJheS5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvaXNBcnJheUxpa2UuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2lzQnVmZmVyLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9pc0VxdWFsLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9pc0Z1bmN0aW9uLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9pc0xlbmd0aC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvaXNPYmplY3QuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2lzT2JqZWN0TGlrZS5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvaXNTeW1ib2wuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2lzVHlwZWRBcnJheS5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gva2V5cy5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvbm93LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9zdHViRmFsc2UuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL3Rocm90dGxlLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC90b051bWJlci5qcyIsInNyYy9qcy9hcHAvYWN0aW9ucy9zZXJ2ZXIuanMiLCJzcmMvanMvYXBwL2FjdGlvbnMvdWkuanMiLCJzcmMvanMvYXBwL21haW4uanN4Iiwic3JjL2pzL2FwcC9vYmplY3QvQ2hlY2tib3hJLmpzeCIsInNyYy9qcy9hcHAvb2JqZWN0L0VVTWFwLmpzeCIsInNyYy9qcy9hcHAvcHVyZS9BcHAuanN4Iiwic3JjL2pzL2FwcC9wdXJlL0JhY2tvZmZpY2UuanN4Iiwic3JjL2pzL2FwcC9wdXJlL0J5VmFsdWUuanN4Iiwic3JjL2pzL2FwcC9wdXJlL0RvYy5qc3giLCJzcmMvanMvYXBwL3B1cmUvRG9jSHRtbC5qc3giLCJzcmMvanMvYXBwL3B1cmUvRG9jUGRmLmpzeCIsInNyYy9qcy9hcHAvcHVyZS9GYWNldC5qc3giLCJzcmMvanMvYXBwL3B1cmUvRmlsdGVyLmpzeCIsInNyYy9qcy9hcHAvcHVyZS9GdWxsVGV4dC5qc3giLCJzcmMvanMvYXBwL3B1cmUvSXRlbUhlYWQuanN4Iiwic3JjL2pzL2FwcC9wdXJlL0l0ZW1MaXN0LmpzeCIsInNyYy9qcy9hcHAvcHVyZS9JdGVtUmVjb3JkUHJlLmpzeCIsInNyYy9qcy9hcHAvcHVyZS9Mb2NhbFNldHRpbmdzLmpzeCIsInNyYy9qcy9hcHAvcHVyZS9OYXZMaW5rLmpzeCIsInNyYy9qcy9hcHAvcHVyZS9Ob3RGb3VuZC5qc3giLCJzcmMvanMvYXBwL3B1cmUvUm9vdC5qc3giLCJzcmMvanMvYXBwL3B1cmUvU3RhdC5qc3giLCJzcmMvanMvYXBwL3B1cmUvU3RhdGljLmpzeCIsInNyYy9qcy9hcHAvcHVyZS9TdWJBcHAuanN4Iiwic3JjL2pzL2FwcC9yZWR1Y2Vycy9yZWR1Y2Vycy5qcyIsInNyYy9qcy9hcHAvc3RhdGUvQWx0ZXJuYXRpdmUuanN4Iiwic3JjL2pzL2FwcC9zdGF0ZS9Eb2NNZC5qc3giLCJzcmMvanMvYXBwL3N0YXRlL0ZpbHRlckNvbXB1dGUuanN4Iiwic3JjL2pzL2FwcC9zdGF0ZS9JdGVtRmllbGQuanN4Iiwic3JjL2pzL2FwcC9zdGF0ZS9JdGVtRmlsdGVyZWQuanN4Iiwic3JjL2pzL2FwcC9zdGF0ZS9JdGVtTXkuanN4Iiwic3JjL2pzL2FwcC9zdGF0ZS9JdGVtUmVjb3JkLmpzeCIsInNyYy9qcy9hcHAvc3RhdGUvTG9naW4uanN4Iiwic3JjL2pzL2FwcC9zdGF0ZS9Ob3RpZmljYXRpb24uanN4Iiwic3JjL2pzL2FwcC9zdGF0ZS9SZWxTZWxlY3QuanN4Iiwic3JjL2pzL2FwcC9zdGF0ZS9XaW5kb3cuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUMxRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1TEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFD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Q0FDRCxDLHFDQUdILE9BQU8saUJBQVAsQ0FBMkIsQ0FDekIsUUFBUyxpQkFBVSxNQUFWLENBQWlCLFVBREQsQ0FBM0IsQ0FJQSxHQUFNLGlCQUFrQixRQUFsQixnQkFBa0IsVUFBSSxJQUFKLE1BQUksR0FBSixPQUFnQixDQUFFLE9BQUYsQ0FBaEIsQ0FBeEIsQyxnQkFFZSx3QkFBUSxlQUFSLENBQXlCLENBQUUsaUJBQUYsQ0FBekIsRUFBNkMsTUFBN0MsQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgZ2V0TmF0aXZlID0gcmVxdWlyZSgnLi9fZ2V0TmF0aXZlJyksXG4gICAgcm9vdCA9IHJlcXVpcmUoJy4vX3Jvb3QnKTtcblxuLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgdGhhdCBhcmUgdmVyaWZpZWQgdG8gYmUgbmF0aXZlLiAqL1xudmFyIERhdGFWaWV3ID0gZ2V0TmF0aXZlKHJvb3QsICdEYXRhVmlldycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IERhdGFWaWV3O1xuIiwidmFyIGhhc2hDbGVhciA9IHJlcXVpcmUoJy4vX2hhc2hDbGVhcicpLFxuICAgIGhhc2hEZWxldGUgPSByZXF1aXJlKCcuL19oYXNoRGVsZXRlJyksXG4gICAgaGFzaEdldCA9IHJlcXVpcmUoJy4vX2hhc2hHZXQnKSxcbiAgICBoYXNoSGFzID0gcmVxdWlyZSgnLi9faGFzaEhhcycpLFxuICAgIGhhc2hTZXQgPSByZXF1aXJlKCcuL19oYXNoU2V0Jyk7XG5cbi8qKlxuICogQ3JlYXRlcyBhIGhhc2ggb2JqZWN0LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7QXJyYXl9IFtlbnRyaWVzXSBUaGUga2V5LXZhbHVlIHBhaXJzIHRvIGNhY2hlLlxuICovXG5mdW5jdGlvbiBIYXNoKGVudHJpZXMpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBlbnRyaWVzID8gZW50cmllcy5sZW5ndGggOiAwO1xuXG4gIHRoaXMuY2xlYXIoKTtcbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIgZW50cnkgPSBlbnRyaWVzW2luZGV4XTtcbiAgICB0aGlzLnNldChlbnRyeVswXSwgZW50cnlbMV0pO1xuICB9XG59XG5cbi8vIEFkZCBtZXRob2RzIHRvIGBIYXNoYC5cbkhhc2gucHJvdG90eXBlLmNsZWFyID0gaGFzaENsZWFyO1xuSGFzaC5wcm90b3R5cGVbJ2RlbGV0ZSddID0gaGFzaERlbGV0ZTtcbkhhc2gucHJvdG90eXBlLmdldCA9IGhhc2hHZXQ7XG5IYXNoLnByb3RvdHlwZS5oYXMgPSBoYXNoSGFzO1xuSGFzaC5wcm90b3R5cGUuc2V0ID0gaGFzaFNldDtcblxubW9kdWxlLmV4cG9ydHMgPSBIYXNoO1xuIiwidmFyIGxpc3RDYWNoZUNsZWFyID0gcmVxdWlyZSgnLi9fbGlzdENhY2hlQ2xlYXInKSxcbiAgICBsaXN0Q2FjaGVEZWxldGUgPSByZXF1aXJlKCcuL19saXN0Q2FjaGVEZWxldGUnKSxcbiAgICBsaXN0Q2FjaGVHZXQgPSByZXF1aXJlKCcuL19saXN0Q2FjaGVHZXQnKSxcbiAgICBsaXN0Q2FjaGVIYXMgPSByZXF1aXJlKCcuL19saXN0Q2FjaGVIYXMnKSxcbiAgICBsaXN0Q2FjaGVTZXQgPSByZXF1aXJlKCcuL19saXN0Q2FjaGVTZXQnKTtcblxuLyoqXG4gKiBDcmVhdGVzIGFuIGxpc3QgY2FjaGUgb2JqZWN0LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7QXJyYXl9IFtlbnRyaWVzXSBUaGUga2V5LXZhbHVlIHBhaXJzIHRvIGNhY2hlLlxuICovXG5mdW5jdGlvbiBMaXN0Q2FjaGUoZW50cmllcykge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGVudHJpZXMgPyBlbnRyaWVzLmxlbmd0aCA6IDA7XG5cbiAgdGhpcy5jbGVhcigpO1xuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciBlbnRyeSA9IGVudHJpZXNbaW5kZXhdO1xuICAgIHRoaXMuc2V0KGVudHJ5WzBdLCBlbnRyeVsxXSk7XG4gIH1cbn1cblxuLy8gQWRkIG1ldGhvZHMgdG8gYExpc3RDYWNoZWAuXG5MaXN0Q2FjaGUucHJvdG90eXBlLmNsZWFyID0gbGlzdENhY2hlQ2xlYXI7XG5MaXN0Q2FjaGUucHJvdG90eXBlWydkZWxldGUnXSA9IGxpc3RDYWNoZURlbGV0ZTtcbkxpc3RDYWNoZS5wcm90b3R5cGUuZ2V0ID0gbGlzdENhY2hlR2V0O1xuTGlzdENhY2hlLnByb3RvdHlwZS5oYXMgPSBsaXN0Q2FjaGVIYXM7XG5MaXN0Q2FjaGUucHJvdG90eXBlLnNldCA9IGxpc3RDYWNoZVNldDtcblxubW9kdWxlLmV4cG9ydHMgPSBMaXN0Q2FjaGU7XG4iLCJ2YXIgZ2V0TmF0aXZlID0gcmVxdWlyZSgnLi9fZ2V0TmF0aXZlJyksXG4gICAgcm9vdCA9IHJlcXVpcmUoJy4vX3Jvb3QnKTtcblxuLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgdGhhdCBhcmUgdmVyaWZpZWQgdG8gYmUgbmF0aXZlLiAqL1xudmFyIE1hcCA9IGdldE5hdGl2ZShyb290LCAnTWFwJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gTWFwO1xuIiwidmFyIG1hcENhY2hlQ2xlYXIgPSByZXF1aXJlKCcuL19tYXBDYWNoZUNsZWFyJyksXG4gICAgbWFwQ2FjaGVEZWxldGUgPSByZXF1aXJlKCcuL19tYXBDYWNoZURlbGV0ZScpLFxuICAgIG1hcENhY2hlR2V0ID0gcmVxdWlyZSgnLi9fbWFwQ2FjaGVHZXQnKSxcbiAgICBtYXBDYWNoZUhhcyA9IHJlcXVpcmUoJy4vX21hcENhY2hlSGFzJyksXG4gICAgbWFwQ2FjaGVTZXQgPSByZXF1aXJlKCcuL19tYXBDYWNoZVNldCcpO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBtYXAgY2FjaGUgb2JqZWN0IHRvIHN0b3JlIGtleS12YWx1ZSBwYWlycy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge0FycmF5fSBbZW50cmllc10gVGhlIGtleS12YWx1ZSBwYWlycyB0byBjYWNoZS5cbiAqL1xuZnVuY3Rpb24gTWFwQ2FjaGUoZW50cmllcykge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGVudHJpZXMgPyBlbnRyaWVzLmxlbmd0aCA6IDA7XG5cbiAgdGhpcy5jbGVhcigpO1xuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciBlbnRyeSA9IGVudHJpZXNbaW5kZXhdO1xuICAgIHRoaXMuc2V0KGVudHJ5WzBdLCBlbnRyeVsxXSk7XG4gIH1cbn1cblxuLy8gQWRkIG1ldGhvZHMgdG8gYE1hcENhY2hlYC5cbk1hcENhY2hlLnByb3RvdHlwZS5jbGVhciA9IG1hcENhY2hlQ2xlYXI7XG5NYXBDYWNoZS5wcm90b3R5cGVbJ2RlbGV0ZSddID0gbWFwQ2FjaGVEZWxldGU7XG5NYXBDYWNoZS5wcm90b3R5cGUuZ2V0ID0gbWFwQ2FjaGVHZXQ7XG5NYXBDYWNoZS5wcm90b3R5cGUuaGFzID0gbWFwQ2FjaGVIYXM7XG5NYXBDYWNoZS5wcm90b3R5cGUuc2V0ID0gbWFwQ2FjaGVTZXQ7XG5cbm1vZHVsZS5leHBvcnRzID0gTWFwQ2FjaGU7XG4iLCJ2YXIgZ2V0TmF0aXZlID0gcmVxdWlyZSgnLi9fZ2V0TmF0aXZlJyksXG4gICAgcm9vdCA9IHJlcXVpcmUoJy4vX3Jvb3QnKTtcblxuLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgdGhhdCBhcmUgdmVyaWZpZWQgdG8gYmUgbmF0aXZlLiAqL1xudmFyIFByb21pc2UgPSBnZXROYXRpdmUocm9vdCwgJ1Byb21pc2UnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBQcm9taXNlO1xuIiwidmFyIGdldE5hdGl2ZSA9IHJlcXVpcmUoJy4vX2dldE5hdGl2ZScpLFxuICAgIHJvb3QgPSByZXF1aXJlKCcuL19yb290Jyk7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIHRoYXQgYXJlIHZlcmlmaWVkIHRvIGJlIG5hdGl2ZS4gKi9cbnZhciBTZXQgPSBnZXROYXRpdmUocm9vdCwgJ1NldCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFNldDtcbiIsInZhciBNYXBDYWNoZSA9IHJlcXVpcmUoJy4vX01hcENhY2hlJyksXG4gICAgc2V0Q2FjaGVBZGQgPSByZXF1aXJlKCcuL19zZXRDYWNoZUFkZCcpLFxuICAgIHNldENhY2hlSGFzID0gcmVxdWlyZSgnLi9fc2V0Q2FjaGVIYXMnKTtcblxuLyoqXG4gKlxuICogQ3JlYXRlcyBhbiBhcnJheSBjYWNoZSBvYmplY3QgdG8gc3RvcmUgdW5pcXVlIHZhbHVlcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge0FycmF5fSBbdmFsdWVzXSBUaGUgdmFsdWVzIHRvIGNhY2hlLlxuICovXG5mdW5jdGlvbiBTZXRDYWNoZSh2YWx1ZXMpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSB2YWx1ZXMgPyB2YWx1ZXMubGVuZ3RoIDogMDtcblxuICB0aGlzLl9fZGF0YV9fID0gbmV3IE1hcENhY2hlO1xuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHRoaXMuYWRkKHZhbHVlc1tpbmRleF0pO1xuICB9XG59XG5cbi8vIEFkZCBtZXRob2RzIHRvIGBTZXRDYWNoZWAuXG5TZXRDYWNoZS5wcm90b3R5cGUuYWRkID0gU2V0Q2FjaGUucHJvdG90eXBlLnB1c2ggPSBzZXRDYWNoZUFkZDtcblNldENhY2hlLnByb3RvdHlwZS5oYXMgPSBzZXRDYWNoZUhhcztcblxubW9kdWxlLmV4cG9ydHMgPSBTZXRDYWNoZTtcbiIsInZhciBMaXN0Q2FjaGUgPSByZXF1aXJlKCcuL19MaXN0Q2FjaGUnKSxcbiAgICBzdGFja0NsZWFyID0gcmVxdWlyZSgnLi9fc3RhY2tDbGVhcicpLFxuICAgIHN0YWNrRGVsZXRlID0gcmVxdWlyZSgnLi9fc3RhY2tEZWxldGUnKSxcbiAgICBzdGFja0dldCA9IHJlcXVpcmUoJy4vX3N0YWNrR2V0JyksXG4gICAgc3RhY2tIYXMgPSByZXF1aXJlKCcuL19zdGFja0hhcycpLFxuICAgIHN0YWNrU2V0ID0gcmVxdWlyZSgnLi9fc3RhY2tTZXQnKTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgc3RhY2sgY2FjaGUgb2JqZWN0IHRvIHN0b3JlIGtleS12YWx1ZSBwYWlycy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge0FycmF5fSBbZW50cmllc10gVGhlIGtleS12YWx1ZSBwYWlycyB0byBjYWNoZS5cbiAqL1xuZnVuY3Rpb24gU3RhY2soZW50cmllcykge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX18gPSBuZXcgTGlzdENhY2hlKGVudHJpZXMpO1xuICB0aGlzLnNpemUgPSBkYXRhLnNpemU7XG59XG5cbi8vIEFkZCBtZXRob2RzIHRvIGBTdGFja2AuXG5TdGFjay5wcm90b3R5cGUuY2xlYXIgPSBzdGFja0NsZWFyO1xuU3RhY2sucHJvdG90eXBlWydkZWxldGUnXSA9IHN0YWNrRGVsZXRlO1xuU3RhY2sucHJvdG90eXBlLmdldCA9IHN0YWNrR2V0O1xuU3RhY2sucHJvdG90eXBlLmhhcyA9IHN0YWNrSGFzO1xuU3RhY2sucHJvdG90eXBlLnNldCA9IHN0YWNrU2V0O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFN0YWNrO1xuIiwidmFyIHJvb3QgPSByZXF1aXJlKCcuL19yb290Jyk7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIFN5bWJvbCA9IHJvb3QuU3ltYm9sO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFN5bWJvbDtcbiIsInZhciByb290ID0gcmVxdWlyZSgnLi9fcm9vdCcpO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBVaW50OEFycmF5ID0gcm9vdC5VaW50OEFycmF5O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFVpbnQ4QXJyYXk7XG4iLCJ2YXIgZ2V0TmF0aXZlID0gcmVxdWlyZSgnLi9fZ2V0TmF0aXZlJyksXG4gICAgcm9vdCA9IHJlcXVpcmUoJy4vX3Jvb3QnKTtcblxuLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgdGhhdCBhcmUgdmVyaWZpZWQgdG8gYmUgbmF0aXZlLiAqL1xudmFyIFdlYWtNYXAgPSBnZXROYXRpdmUocm9vdCwgJ1dlYWtNYXAnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBXZWFrTWFwO1xuIiwidmFyIGJhc2VUaW1lcyA9IHJlcXVpcmUoJy4vX2Jhc2VUaW1lcycpLFxuICAgIGlzQXJndW1lbnRzID0gcmVxdWlyZSgnLi9pc0FyZ3VtZW50cycpLFxuICAgIGlzQXJyYXkgPSByZXF1aXJlKCcuL2lzQXJyYXknKSxcbiAgICBpc0J1ZmZlciA9IHJlcXVpcmUoJy4vaXNCdWZmZXInKSxcbiAgICBpc0luZGV4ID0gcmVxdWlyZSgnLi9faXNJbmRleCcpLFxuICAgIGlzVHlwZWRBcnJheSA9IHJlcXVpcmUoJy4vaXNUeXBlZEFycmF5Jyk7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBhcnJheSBvZiB0aGUgZW51bWVyYWJsZSBwcm9wZXJ0eSBuYW1lcyBvZiB0aGUgYXJyYXktbGlrZSBgdmFsdWVgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBxdWVyeS5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gaW5oZXJpdGVkIFNwZWNpZnkgcmV0dXJuaW5nIGluaGVyaXRlZCBwcm9wZXJ0eSBuYW1lcy5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMuXG4gKi9cbmZ1bmN0aW9uIGFycmF5TGlrZUtleXModmFsdWUsIGluaGVyaXRlZCkge1xuICB2YXIgaXNBcnIgPSBpc0FycmF5KHZhbHVlKSxcbiAgICAgIGlzQXJnID0gIWlzQXJyICYmIGlzQXJndW1lbnRzKHZhbHVlKSxcbiAgICAgIGlzQnVmZiA9ICFpc0FyciAmJiAhaXNBcmcgJiYgaXNCdWZmZXIodmFsdWUpLFxuICAgICAgaXNUeXBlID0gIWlzQXJyICYmICFpc0FyZyAmJiAhaXNCdWZmICYmIGlzVHlwZWRBcnJheSh2YWx1ZSksXG4gICAgICBza2lwSW5kZXhlcyA9IGlzQXJyIHx8IGlzQXJnIHx8IGlzQnVmZiB8fCBpc1R5cGUsXG4gICAgICByZXN1bHQgPSBza2lwSW5kZXhlcyA/IGJhc2VUaW1lcyh2YWx1ZS5sZW5ndGgsIFN0cmluZykgOiBbXSxcbiAgICAgIGxlbmd0aCA9IHJlc3VsdC5sZW5ndGg7XG5cbiAgZm9yICh2YXIga2V5IGluIHZhbHVlKSB7XG4gICAgaWYgKChpbmhlcml0ZWQgfHwgaGFzT3duUHJvcGVydHkuY2FsbCh2YWx1ZSwga2V5KSkgJiZcbiAgICAgICAgIShza2lwSW5kZXhlcyAmJiAoXG4gICAgICAgICAgIC8vIFNhZmFyaSA5IGhhcyBlbnVtZXJhYmxlIGBhcmd1bWVudHMubGVuZ3RoYCBpbiBzdHJpY3QgbW9kZS5cbiAgICAgICAgICAga2V5ID09ICdsZW5ndGgnIHx8XG4gICAgICAgICAgIC8vIE5vZGUuanMgMC4xMCBoYXMgZW51bWVyYWJsZSBub24taW5kZXggcHJvcGVydGllcyBvbiBidWZmZXJzLlxuICAgICAgICAgICAoaXNCdWZmICYmIChrZXkgPT0gJ29mZnNldCcgfHwga2V5ID09ICdwYXJlbnQnKSkgfHxcbiAgICAgICAgICAgLy8gUGhhbnRvbUpTIDIgaGFzIGVudW1lcmFibGUgbm9uLWluZGV4IHByb3BlcnRpZXMgb24gdHlwZWQgYXJyYXlzLlxuICAgICAgICAgICAoaXNUeXBlICYmIChrZXkgPT0gJ2J1ZmZlcicgfHwga2V5ID09ICdieXRlTGVuZ3RoJyB8fCBrZXkgPT0gJ2J5dGVPZmZzZXQnKSkgfHxcbiAgICAgICAgICAgLy8gU2tpcCBpbmRleCBwcm9wZXJ0aWVzLlxuICAgICAgICAgICBpc0luZGV4KGtleSwgbGVuZ3RoKVxuICAgICAgICApKSkge1xuICAgICAgcmVzdWx0LnB1c2goa2V5KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBhcnJheUxpa2VLZXlzO1xuIiwiLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYF8uc29tZWAgZm9yIGFycmF5cyB3aXRob3V0IHN1cHBvcnQgZm9yIGl0ZXJhdGVlXG4gKiBzaG9ydGhhbmRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBbYXJyYXldIFRoZSBhcnJheSB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBwcmVkaWNhdGUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBhbnkgZWxlbWVudCBwYXNzZXMgdGhlIHByZWRpY2F0ZSBjaGVjayxcbiAqICBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGFycmF5U29tZShhcnJheSwgcHJlZGljYXRlKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gYXJyYXkgPyBhcnJheS5sZW5ndGggOiAwO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgaWYgKHByZWRpY2F0ZShhcnJheVtpbmRleF0sIGluZGV4LCBhcnJheSkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYXJyYXlTb21lO1xuIiwidmFyIGVxID0gcmVxdWlyZSgnLi9lcScpO1xuXG4vKipcbiAqIEdldHMgdGhlIGluZGV4IGF0IHdoaWNoIHRoZSBga2V5YCBpcyBmb3VuZCBpbiBgYXJyYXlgIG9mIGtleS12YWx1ZSBwYWlycy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGluc3BlY3QuXG4gKiBAcGFyYW0geyp9IGtleSBUaGUga2V5IHRvIHNlYXJjaCBmb3IuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSBpbmRleCBvZiB0aGUgbWF0Y2hlZCB2YWx1ZSwgZWxzZSBgLTFgLlxuICovXG5mdW5jdGlvbiBhc3NvY0luZGV4T2YoYXJyYXksIGtleSkge1xuICB2YXIgbGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuICB3aGlsZSAobGVuZ3RoLS0pIHtcbiAgICBpZiAoZXEoYXJyYXlbbGVuZ3RoXVswXSwga2V5KSkge1xuICAgICAgcmV0dXJuIGxlbmd0aDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIC0xO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFzc29jSW5kZXhPZjtcbiIsIi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZVxuICogW2B0b1N0cmluZ1RhZ2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBvYmplY3RUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBnZXRUYWdgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGB0b1N0cmluZ1RhZ2AuXG4gKi9cbmZ1bmN0aW9uIGJhc2VHZXRUYWcodmFsdWUpIHtcbiAgcmV0dXJuIG9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VHZXRUYWc7XG4iLCJ2YXIgaXNPYmplY3RMaWtlID0gcmVxdWlyZSgnLi9pc09iamVjdExpa2UnKTtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIGFyZ3NUYWcgPSAnW29iamVjdCBBcmd1bWVudHNdJztcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlXG4gKiBbYHRvU3RyaW5nVGFnYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIG9mIHZhbHVlcy5cbiAqL1xudmFyIG9iamVjdFRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uaXNBcmd1bWVudHNgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIGBhcmd1bWVudHNgIG9iamVjdCxcbiAqL1xuZnVuY3Rpb24gYmFzZUlzQXJndW1lbnRzKHZhbHVlKSB7XG4gIHJldHVybiBpc09iamVjdExpa2UodmFsdWUpICYmIG9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpID09IGFyZ3NUYWc7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZUlzQXJndW1lbnRzO1xuIiwidmFyIGJhc2VJc0VxdWFsRGVlcCA9IHJlcXVpcmUoJy4vX2Jhc2VJc0VxdWFsRGVlcCcpLFxuICAgIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9pc09iamVjdCcpLFxuICAgIGlzT2JqZWN0TGlrZSA9IHJlcXVpcmUoJy4vaXNPYmplY3RMaWtlJyk7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uaXNFcXVhbGAgd2hpY2ggc3VwcG9ydHMgcGFydGlhbCBjb21wYXJpc29uc1xuICogYW5kIHRyYWNrcyB0cmF2ZXJzZWQgb2JqZWN0cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7Kn0gb3RoZXIgVGhlIG90aGVyIHZhbHVlIHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY3VzdG9taXplcl0gVGhlIGZ1bmN0aW9uIHRvIGN1c3RvbWl6ZSBjb21wYXJpc29ucy5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2JpdG1hc2tdIFRoZSBiaXRtYXNrIG9mIGNvbXBhcmlzb24gZmxhZ3MuXG4gKiAgVGhlIGJpdG1hc2sgbWF5IGJlIGNvbXBvc2VkIG9mIHRoZSBmb2xsb3dpbmcgZmxhZ3M6XG4gKiAgICAgMSAtIFVub3JkZXJlZCBjb21wYXJpc29uXG4gKiAgICAgMiAtIFBhcnRpYWwgY29tcGFyaXNvblxuICogQHBhcmFtIHtPYmplY3R9IFtzdGFja10gVHJhY2tzIHRyYXZlcnNlZCBgdmFsdWVgIGFuZCBgb3RoZXJgIG9iamVjdHMuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIHZhbHVlcyBhcmUgZXF1aXZhbGVudCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBiYXNlSXNFcXVhbCh2YWx1ZSwgb3RoZXIsIGN1c3RvbWl6ZXIsIGJpdG1hc2ssIHN0YWNrKSB7XG4gIGlmICh2YWx1ZSA9PT0gb3RoZXIpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICBpZiAodmFsdWUgPT0gbnVsbCB8fCBvdGhlciA9PSBudWxsIHx8ICghaXNPYmplY3QodmFsdWUpICYmICFpc09iamVjdExpa2Uob3RoZXIpKSkge1xuICAgIHJldHVybiB2YWx1ZSAhPT0gdmFsdWUgJiYgb3RoZXIgIT09IG90aGVyO1xuICB9XG4gIHJldHVybiBiYXNlSXNFcXVhbERlZXAodmFsdWUsIG90aGVyLCBiYXNlSXNFcXVhbCwgY3VzdG9taXplciwgYml0bWFzaywgc3RhY2spO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VJc0VxdWFsO1xuIiwidmFyIFN0YWNrID0gcmVxdWlyZSgnLi9fU3RhY2snKSxcbiAgICBlcXVhbEFycmF5cyA9IHJlcXVpcmUoJy4vX2VxdWFsQXJyYXlzJyksXG4gICAgZXF1YWxCeVRhZyA9IHJlcXVpcmUoJy4vX2VxdWFsQnlUYWcnKSxcbiAgICBlcXVhbE9iamVjdHMgPSByZXF1aXJlKCcuL19lcXVhbE9iamVjdHMnKSxcbiAgICBnZXRUYWcgPSByZXF1aXJlKCcuL19nZXRUYWcnKSxcbiAgICBpc0FycmF5ID0gcmVxdWlyZSgnLi9pc0FycmF5JyksXG4gICAgaXNCdWZmZXIgPSByZXF1aXJlKCcuL2lzQnVmZmVyJyksXG4gICAgaXNUeXBlZEFycmF5ID0gcmVxdWlyZSgnLi9pc1R5cGVkQXJyYXknKTtcblxuLyoqIFVzZWQgdG8gY29tcG9zZSBiaXRtYXNrcyBmb3IgY29tcGFyaXNvbiBzdHlsZXMuICovXG52YXIgUEFSVElBTF9DT01QQVJFX0ZMQUcgPSAyO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgYXJnc1RhZyA9ICdbb2JqZWN0IEFyZ3VtZW50c10nLFxuICAgIGFycmF5VGFnID0gJ1tvYmplY3QgQXJyYXldJyxcbiAgICBvYmplY3RUYWcgPSAnW29iamVjdCBPYmplY3RdJztcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYGJhc2VJc0VxdWFsYCBmb3IgYXJyYXlzIGFuZCBvYmplY3RzIHdoaWNoIHBlcmZvcm1zXG4gKiBkZWVwIGNvbXBhcmlzb25zIGFuZCB0cmFja3MgdHJhdmVyc2VkIG9iamVjdHMgZW5hYmxpbmcgb2JqZWN0cyB3aXRoIGNpcmN1bGFyXG4gKiByZWZlcmVuY2VzIHRvIGJlIGNvbXBhcmVkLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBvdGhlciBUaGUgb3RoZXIgb2JqZWN0IHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBlcXVhbEZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGRldGVybWluZSBlcXVpdmFsZW50cyBvZiB2YWx1ZXMuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY3VzdG9taXplcl0gVGhlIGZ1bmN0aW9uIHRvIGN1c3RvbWl6ZSBjb21wYXJpc29ucy5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbYml0bWFza10gVGhlIGJpdG1hc2sgb2YgY29tcGFyaXNvbiBmbGFncy4gU2VlIGBiYXNlSXNFcXVhbGBcbiAqICBmb3IgbW9yZSBkZXRhaWxzLlxuICogQHBhcmFtIHtPYmplY3R9IFtzdGFja10gVHJhY2tzIHRyYXZlcnNlZCBgb2JqZWN0YCBhbmQgYG90aGVyYCBvYmplY3RzLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBvYmplY3RzIGFyZSBlcXVpdmFsZW50LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VJc0VxdWFsRGVlcChvYmplY3QsIG90aGVyLCBlcXVhbEZ1bmMsIGN1c3RvbWl6ZXIsIGJpdG1hc2ssIHN0YWNrKSB7XG4gIHZhciBvYmpJc0FyciA9IGlzQXJyYXkob2JqZWN0KSxcbiAgICAgIG90aElzQXJyID0gaXNBcnJheShvdGhlciksXG4gICAgICBvYmpUYWcgPSBhcnJheVRhZyxcbiAgICAgIG90aFRhZyA9IGFycmF5VGFnO1xuXG4gIGlmICghb2JqSXNBcnIpIHtcbiAgICBvYmpUYWcgPSBnZXRUYWcob2JqZWN0KTtcbiAgICBvYmpUYWcgPSBvYmpUYWcgPT0gYXJnc1RhZyA/IG9iamVjdFRhZyA6IG9ialRhZztcbiAgfVxuICBpZiAoIW90aElzQXJyKSB7XG4gICAgb3RoVGFnID0gZ2V0VGFnKG90aGVyKTtcbiAgICBvdGhUYWcgPSBvdGhUYWcgPT0gYXJnc1RhZyA/IG9iamVjdFRhZyA6IG90aFRhZztcbiAgfVxuICB2YXIgb2JqSXNPYmogPSBvYmpUYWcgPT0gb2JqZWN0VGFnLFxuICAgICAgb3RoSXNPYmogPSBvdGhUYWcgPT0gb2JqZWN0VGFnLFxuICAgICAgaXNTYW1lVGFnID0gb2JqVGFnID09IG90aFRhZztcblxuICBpZiAoaXNTYW1lVGFnICYmIGlzQnVmZmVyKG9iamVjdCkpIHtcbiAgICBpZiAoIWlzQnVmZmVyKG90aGVyKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBvYmpJc0FyciA9IHRydWU7XG4gICAgb2JqSXNPYmogPSBmYWxzZTtcbiAgfVxuICBpZiAoaXNTYW1lVGFnICYmICFvYmpJc09iaikge1xuICAgIHN0YWNrIHx8IChzdGFjayA9IG5ldyBTdGFjayk7XG4gICAgcmV0dXJuIChvYmpJc0FyciB8fCBpc1R5cGVkQXJyYXkob2JqZWN0KSlcbiAgICAgID8gZXF1YWxBcnJheXMob2JqZWN0LCBvdGhlciwgZXF1YWxGdW5jLCBjdXN0b21pemVyLCBiaXRtYXNrLCBzdGFjaylcbiAgICAgIDogZXF1YWxCeVRhZyhvYmplY3QsIG90aGVyLCBvYmpUYWcsIGVxdWFsRnVuYywgY3VzdG9taXplciwgYml0bWFzaywgc3RhY2spO1xuICB9XG4gIGlmICghKGJpdG1hc2sgJiBQQVJUSUFMX0NPTVBBUkVfRkxBRykpIHtcbiAgICB2YXIgb2JqSXNXcmFwcGVkID0gb2JqSXNPYmogJiYgaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsICdfX3dyYXBwZWRfXycpLFxuICAgICAgICBvdGhJc1dyYXBwZWQgPSBvdGhJc09iaiAmJiBoYXNPd25Qcm9wZXJ0eS5jYWxsKG90aGVyLCAnX193cmFwcGVkX18nKTtcblxuICAgIGlmIChvYmpJc1dyYXBwZWQgfHwgb3RoSXNXcmFwcGVkKSB7XG4gICAgICB2YXIgb2JqVW53cmFwcGVkID0gb2JqSXNXcmFwcGVkID8gb2JqZWN0LnZhbHVlKCkgOiBvYmplY3QsXG4gICAgICAgICAgb3RoVW53cmFwcGVkID0gb3RoSXNXcmFwcGVkID8gb3RoZXIudmFsdWUoKSA6IG90aGVyO1xuXG4gICAgICBzdGFjayB8fCAoc3RhY2sgPSBuZXcgU3RhY2spO1xuICAgICAgcmV0dXJuIGVxdWFsRnVuYyhvYmpVbndyYXBwZWQsIG90aFVud3JhcHBlZCwgY3VzdG9taXplciwgYml0bWFzaywgc3RhY2spO1xuICAgIH1cbiAgfVxuICBpZiAoIWlzU2FtZVRhZykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBzdGFjayB8fCAoc3RhY2sgPSBuZXcgU3RhY2spO1xuICByZXR1cm4gZXF1YWxPYmplY3RzKG9iamVjdCwgb3RoZXIsIGVxdWFsRnVuYywgY3VzdG9taXplciwgYml0bWFzaywgc3RhY2spO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VJc0VxdWFsRGVlcDtcbiIsInZhciBpc0Z1bmN0aW9uID0gcmVxdWlyZSgnLi9pc0Z1bmN0aW9uJyksXG4gICAgaXNNYXNrZWQgPSByZXF1aXJlKCcuL19pc01hc2tlZCcpLFxuICAgIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9pc09iamVjdCcpLFxuICAgIHRvU291cmNlID0gcmVxdWlyZSgnLi9fdG9Tb3VyY2UnKTtcblxuLyoqXG4gKiBVc2VkIHRvIG1hdGNoIGBSZWdFeHBgXG4gKiBbc3ludGF4IGNoYXJhY3RlcnNdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLXBhdHRlcm5zKS5cbiAqL1xudmFyIHJlUmVnRXhwQ2hhciA9IC9bXFxcXF4kLiorPygpW1xcXXt9fF0vZztcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IGhvc3QgY29uc3RydWN0b3JzIChTYWZhcmkpLiAqL1xudmFyIHJlSXNIb3N0Q3RvciA9IC9eXFxbb2JqZWN0IC4rP0NvbnN0cnVjdG9yXFxdJC87XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBmdW5jUHJvdG8gPSBGdW5jdGlvbi5wcm90b3R5cGUsXG4gICAgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byByZXNvbHZlIHRoZSBkZWNvbXBpbGVkIHNvdXJjZSBvZiBmdW5jdGlvbnMuICovXG52YXIgZnVuY1RvU3RyaW5nID0gZnVuY1Byb3RvLnRvU3RyaW5nO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKiogVXNlZCB0byBkZXRlY3QgaWYgYSBtZXRob2QgaXMgbmF0aXZlLiAqL1xudmFyIHJlSXNOYXRpdmUgPSBSZWdFeHAoJ14nICtcbiAgZnVuY1RvU3RyaW5nLmNhbGwoaGFzT3duUHJvcGVydHkpLnJlcGxhY2UocmVSZWdFeHBDaGFyLCAnXFxcXCQmJylcbiAgLnJlcGxhY2UoL2hhc093blByb3BlcnR5fChmdW5jdGlvbikuKj8oPz1cXFxcXFwoKXwgZm9yIC4rPyg/PVxcXFxcXF0pL2csICckMS4qPycpICsgJyQnXG4pO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmlzTmF0aXZlYCB3aXRob3V0IGJhZCBzaGltIGNoZWNrcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIG5hdGl2ZSBmdW5jdGlvbixcbiAqICBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VJc05hdGl2ZSh2YWx1ZSkge1xuICBpZiAoIWlzT2JqZWN0KHZhbHVlKSB8fCBpc01hc2tlZCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIHBhdHRlcm4gPSBpc0Z1bmN0aW9uKHZhbHVlKSA/IHJlSXNOYXRpdmUgOiByZUlzSG9zdEN0b3I7XG4gIHJldHVybiBwYXR0ZXJuLnRlc3QodG9Tb3VyY2UodmFsdWUpKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlSXNOYXRpdmU7XG4iLCJ2YXIgaXNMZW5ndGggPSByZXF1aXJlKCcuL2lzTGVuZ3RoJyksXG4gICAgaXNPYmplY3RMaWtlID0gcmVxdWlyZSgnLi9pc09iamVjdExpa2UnKTtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIGFyZ3NUYWcgPSAnW29iamVjdCBBcmd1bWVudHNdJyxcbiAgICBhcnJheVRhZyA9ICdbb2JqZWN0IEFycmF5XScsXG4gICAgYm9vbFRhZyA9ICdbb2JqZWN0IEJvb2xlYW5dJyxcbiAgICBkYXRlVGFnID0gJ1tvYmplY3QgRGF0ZV0nLFxuICAgIGVycm9yVGFnID0gJ1tvYmplY3QgRXJyb3JdJyxcbiAgICBmdW5jVGFnID0gJ1tvYmplY3QgRnVuY3Rpb25dJyxcbiAgICBtYXBUYWcgPSAnW29iamVjdCBNYXBdJyxcbiAgICBudW1iZXJUYWcgPSAnW29iamVjdCBOdW1iZXJdJyxcbiAgICBvYmplY3RUYWcgPSAnW29iamVjdCBPYmplY3RdJyxcbiAgICByZWdleHBUYWcgPSAnW29iamVjdCBSZWdFeHBdJyxcbiAgICBzZXRUYWcgPSAnW29iamVjdCBTZXRdJyxcbiAgICBzdHJpbmdUYWcgPSAnW29iamVjdCBTdHJpbmddJyxcbiAgICB3ZWFrTWFwVGFnID0gJ1tvYmplY3QgV2Vha01hcF0nO1xuXG52YXIgYXJyYXlCdWZmZXJUYWcgPSAnW29iamVjdCBBcnJheUJ1ZmZlcl0nLFxuICAgIGRhdGFWaWV3VGFnID0gJ1tvYmplY3QgRGF0YVZpZXddJyxcbiAgICBmbG9hdDMyVGFnID0gJ1tvYmplY3QgRmxvYXQzMkFycmF5XScsXG4gICAgZmxvYXQ2NFRhZyA9ICdbb2JqZWN0IEZsb2F0NjRBcnJheV0nLFxuICAgIGludDhUYWcgPSAnW29iamVjdCBJbnQ4QXJyYXldJyxcbiAgICBpbnQxNlRhZyA9ICdbb2JqZWN0IEludDE2QXJyYXldJyxcbiAgICBpbnQzMlRhZyA9ICdbb2JqZWN0IEludDMyQXJyYXldJyxcbiAgICB1aW50OFRhZyA9ICdbb2JqZWN0IFVpbnQ4QXJyYXldJyxcbiAgICB1aW50OENsYW1wZWRUYWcgPSAnW29iamVjdCBVaW50OENsYW1wZWRBcnJheV0nLFxuICAgIHVpbnQxNlRhZyA9ICdbb2JqZWN0IFVpbnQxNkFycmF5XScsXG4gICAgdWludDMyVGFnID0gJ1tvYmplY3QgVWludDMyQXJyYXldJztcblxuLyoqIFVzZWQgdG8gaWRlbnRpZnkgYHRvU3RyaW5nVGFnYCB2YWx1ZXMgb2YgdHlwZWQgYXJyYXlzLiAqL1xudmFyIHR5cGVkQXJyYXlUYWdzID0ge307XG50eXBlZEFycmF5VGFnc1tmbG9hdDMyVGFnXSA9IHR5cGVkQXJyYXlUYWdzW2Zsb2F0NjRUYWddID1cbnR5cGVkQXJyYXlUYWdzW2ludDhUYWddID0gdHlwZWRBcnJheVRhZ3NbaW50MTZUYWddID1cbnR5cGVkQXJyYXlUYWdzW2ludDMyVGFnXSA9IHR5cGVkQXJyYXlUYWdzW3VpbnQ4VGFnXSA9XG50eXBlZEFycmF5VGFnc1t1aW50OENsYW1wZWRUYWddID0gdHlwZWRBcnJheVRhZ3NbdWludDE2VGFnXSA9XG50eXBlZEFycmF5VGFnc1t1aW50MzJUYWddID0gdHJ1ZTtcbnR5cGVkQXJyYXlUYWdzW2FyZ3NUYWddID0gdHlwZWRBcnJheVRhZ3NbYXJyYXlUYWddID1cbnR5cGVkQXJyYXlUYWdzW2FycmF5QnVmZmVyVGFnXSA9IHR5cGVkQXJyYXlUYWdzW2Jvb2xUYWddID1cbnR5cGVkQXJyYXlUYWdzW2RhdGFWaWV3VGFnXSA9IHR5cGVkQXJyYXlUYWdzW2RhdGVUYWddID1cbnR5cGVkQXJyYXlUYWdzW2Vycm9yVGFnXSA9IHR5cGVkQXJyYXlUYWdzW2Z1bmNUYWddID1cbnR5cGVkQXJyYXlUYWdzW21hcFRhZ10gPSB0eXBlZEFycmF5VGFnc1tudW1iZXJUYWddID1cbnR5cGVkQXJyYXlUYWdzW29iamVjdFRhZ10gPSB0eXBlZEFycmF5VGFnc1tyZWdleHBUYWddID1cbnR5cGVkQXJyYXlUYWdzW3NldFRhZ10gPSB0eXBlZEFycmF5VGFnc1tzdHJpbmdUYWddID1cbnR5cGVkQXJyYXlUYWdzW3dlYWtNYXBUYWddID0gZmFsc2U7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZVxuICogW2B0b1N0cmluZ1RhZ2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBvYmplY3RUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmlzVHlwZWRBcnJheWAgd2l0aG91dCBOb2RlLmpzIG9wdGltaXphdGlvbnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSB0eXBlZCBhcnJheSwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBiYXNlSXNUeXBlZEFycmF5KHZhbHVlKSB7XG4gIHJldHVybiBpc09iamVjdExpa2UodmFsdWUpICYmXG4gICAgaXNMZW5ndGgodmFsdWUubGVuZ3RoKSAmJiAhIXR5cGVkQXJyYXlUYWdzW29iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpXTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlSXNUeXBlZEFycmF5O1xuIiwidmFyIGlzUHJvdG90eXBlID0gcmVxdWlyZSgnLi9faXNQcm90b3R5cGUnKSxcbiAgICBuYXRpdmVLZXlzID0gcmVxdWlyZSgnLi9fbmF0aXZlS2V5cycpO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmtleXNgIHdoaWNoIGRvZXNuJ3QgdHJlYXQgc3BhcnNlIGFycmF5cyBhcyBkZW5zZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcy5cbiAqL1xuZnVuY3Rpb24gYmFzZUtleXMob2JqZWN0KSB7XG4gIGlmICghaXNQcm90b3R5cGUob2JqZWN0KSkge1xuICAgIHJldHVybiBuYXRpdmVLZXlzKG9iamVjdCk7XG4gIH1cbiAgdmFyIHJlc3VsdCA9IFtdO1xuICBmb3IgKHZhciBrZXkgaW4gT2JqZWN0KG9iamVjdCkpIHtcbiAgICBpZiAoaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIGtleSkgJiYga2V5ICE9ICdjb25zdHJ1Y3RvcicpIHtcbiAgICAgIHJlc3VsdC5wdXNoKGtleSk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZUtleXM7XG4iLCIvKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnRpbWVzYCB3aXRob3V0IHN1cHBvcnQgZm9yIGl0ZXJhdGVlIHNob3J0aGFuZHNcbiAqIG9yIG1heCBhcnJheSBsZW5ndGggY2hlY2tzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge251bWJlcn0gbiBUaGUgbnVtYmVyIG9mIHRpbWVzIHRvIGludm9rZSBgaXRlcmF0ZWVgLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcmVzdWx0cy5cbiAqL1xuZnVuY3Rpb24gYmFzZVRpbWVzKG4sIGl0ZXJhdGVlKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgcmVzdWx0ID0gQXJyYXkobik7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBuKSB7XG4gICAgcmVzdWx0W2luZGV4XSA9IGl0ZXJhdGVlKGluZGV4KTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VUaW1lcztcbiIsIi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8udW5hcnlgIHdpdGhvdXQgc3VwcG9ydCBmb3Igc3RvcmluZyBtZXRhZGF0YS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gY2FwIGFyZ3VtZW50cyBmb3IuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBjYXBwZWQgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGJhc2VVbmFyeShmdW5jKSB7XG4gIHJldHVybiBmdW5jdGlvbih2YWx1ZSkge1xuICAgIHJldHVybiBmdW5jKHZhbHVlKTtcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlVW5hcnk7XG4iLCIvKipcbiAqIENoZWNrcyBpZiBhIGBjYWNoZWAgdmFsdWUgZm9yIGBrZXlgIGV4aXN0cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IGNhY2hlIFRoZSBjYWNoZSB0byBxdWVyeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgZW50cnkgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYW4gZW50cnkgZm9yIGBrZXlgIGV4aXN0cywgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBjYWNoZUhhcyhjYWNoZSwga2V5KSB7XG4gIHJldHVybiBjYWNoZS5oYXMoa2V5KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjYWNoZUhhcztcbiIsInZhciByb290ID0gcmVxdWlyZSgnLi9fcm9vdCcpO1xuXG4vKiogVXNlZCB0byBkZXRlY3Qgb3ZlcnJlYWNoaW5nIGNvcmUtanMgc2hpbXMuICovXG52YXIgY29yZUpzRGF0YSA9IHJvb3RbJ19fY29yZS1qc19zaGFyZWRfXyddO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNvcmVKc0RhdGE7XG4iLCJ2YXIgU2V0Q2FjaGUgPSByZXF1aXJlKCcuL19TZXRDYWNoZScpLFxuICAgIGFycmF5U29tZSA9IHJlcXVpcmUoJy4vX2FycmF5U29tZScpLFxuICAgIGNhY2hlSGFzID0gcmVxdWlyZSgnLi9fY2FjaGVIYXMnKTtcblxuLyoqIFVzZWQgdG8gY29tcG9zZSBiaXRtYXNrcyBmb3IgY29tcGFyaXNvbiBzdHlsZXMuICovXG52YXIgVU5PUkRFUkVEX0NPTVBBUkVfRkxBRyA9IDEsXG4gICAgUEFSVElBTF9DT01QQVJFX0ZMQUcgPSAyO1xuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgYmFzZUlzRXF1YWxEZWVwYCBmb3IgYXJyYXlzIHdpdGggc3VwcG9ydCBmb3JcbiAqIHBhcnRpYWwgZGVlcCBjb21wYXJpc29ucy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge0FycmF5fSBvdGhlciBUaGUgb3RoZXIgYXJyYXkgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGVxdWFsRnVuYyBUaGUgZnVuY3Rpb24gdG8gZGV0ZXJtaW5lIGVxdWl2YWxlbnRzIG9mIHZhbHVlcy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGN1c3RvbWl6ZXIgVGhlIGZ1bmN0aW9uIHRvIGN1c3RvbWl6ZSBjb21wYXJpc29ucy5cbiAqIEBwYXJhbSB7bnVtYmVyfSBiaXRtYXNrIFRoZSBiaXRtYXNrIG9mIGNvbXBhcmlzb24gZmxhZ3MuIFNlZSBgYmFzZUlzRXF1YWxgXG4gKiAgZm9yIG1vcmUgZGV0YWlscy5cbiAqIEBwYXJhbSB7T2JqZWN0fSBzdGFjayBUcmFja3MgdHJhdmVyc2VkIGBhcnJheWAgYW5kIGBvdGhlcmAgb2JqZWN0cy5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgYXJyYXlzIGFyZSBlcXVpdmFsZW50LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGVxdWFsQXJyYXlzKGFycmF5LCBvdGhlciwgZXF1YWxGdW5jLCBjdXN0b21pemVyLCBiaXRtYXNrLCBzdGFjaykge1xuICB2YXIgaXNQYXJ0aWFsID0gYml0bWFzayAmIFBBUlRJQUxfQ09NUEFSRV9GTEFHLFxuICAgICAgYXJyTGVuZ3RoID0gYXJyYXkubGVuZ3RoLFxuICAgICAgb3RoTGVuZ3RoID0gb3RoZXIubGVuZ3RoO1xuXG4gIGlmIChhcnJMZW5ndGggIT0gb3RoTGVuZ3RoICYmICEoaXNQYXJ0aWFsICYmIG90aExlbmd0aCA+IGFyckxlbmd0aCkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgLy8gQXNzdW1lIGN5Y2xpYyB2YWx1ZXMgYXJlIGVxdWFsLlxuICB2YXIgc3RhY2tlZCA9IHN0YWNrLmdldChhcnJheSk7XG4gIGlmIChzdGFja2VkICYmIHN0YWNrLmdldChvdGhlcikpIHtcbiAgICByZXR1cm4gc3RhY2tlZCA9PSBvdGhlcjtcbiAgfVxuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIHJlc3VsdCA9IHRydWUsXG4gICAgICBzZWVuID0gKGJpdG1hc2sgJiBVTk9SREVSRURfQ09NUEFSRV9GTEFHKSA/IG5ldyBTZXRDYWNoZSA6IHVuZGVmaW5lZDtcblxuICBzdGFjay5zZXQoYXJyYXksIG90aGVyKTtcbiAgc3RhY2suc2V0KG90aGVyLCBhcnJheSk7XG5cbiAgLy8gSWdub3JlIG5vbi1pbmRleCBwcm9wZXJ0aWVzLlxuICB3aGlsZSAoKytpbmRleCA8IGFyckxlbmd0aCkge1xuICAgIHZhciBhcnJWYWx1ZSA9IGFycmF5W2luZGV4XSxcbiAgICAgICAgb3RoVmFsdWUgPSBvdGhlcltpbmRleF07XG5cbiAgICBpZiAoY3VzdG9taXplcikge1xuICAgICAgdmFyIGNvbXBhcmVkID0gaXNQYXJ0aWFsXG4gICAgICAgID8gY3VzdG9taXplcihvdGhWYWx1ZSwgYXJyVmFsdWUsIGluZGV4LCBvdGhlciwgYXJyYXksIHN0YWNrKVxuICAgICAgICA6IGN1c3RvbWl6ZXIoYXJyVmFsdWUsIG90aFZhbHVlLCBpbmRleCwgYXJyYXksIG90aGVyLCBzdGFjayk7XG4gICAgfVxuICAgIGlmIChjb21wYXJlZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBpZiAoY29tcGFyZWQpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICByZXN1bHQgPSBmYWxzZTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICAvLyBSZWN1cnNpdmVseSBjb21wYXJlIGFycmF5cyAoc3VzY2VwdGlibGUgdG8gY2FsbCBzdGFjayBsaW1pdHMpLlxuICAgIGlmIChzZWVuKSB7XG4gICAgICBpZiAoIWFycmF5U29tZShvdGhlciwgZnVuY3Rpb24ob3RoVmFsdWUsIG90aEluZGV4KSB7XG4gICAgICAgICAgICBpZiAoIWNhY2hlSGFzKHNlZW4sIG90aEluZGV4KSAmJlxuICAgICAgICAgICAgICAgIChhcnJWYWx1ZSA9PT0gb3RoVmFsdWUgfHwgZXF1YWxGdW5jKGFyclZhbHVlLCBvdGhWYWx1ZSwgY3VzdG9taXplciwgYml0bWFzaywgc3RhY2spKSkge1xuICAgICAgICAgICAgICByZXR1cm4gc2Vlbi5wdXNoKG90aEluZGV4KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KSkge1xuICAgICAgICByZXN1bHQgPSBmYWxzZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICghKFxuICAgICAgICAgIGFyclZhbHVlID09PSBvdGhWYWx1ZSB8fFxuICAgICAgICAgICAgZXF1YWxGdW5jKGFyclZhbHVlLCBvdGhWYWx1ZSwgY3VzdG9taXplciwgYml0bWFzaywgc3RhY2spXG4gICAgICAgICkpIHtcbiAgICAgIHJlc3VsdCA9IGZhbHNlO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHN0YWNrWydkZWxldGUnXShhcnJheSk7XG4gIHN0YWNrWydkZWxldGUnXShvdGhlcik7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZXF1YWxBcnJheXM7XG4iLCJ2YXIgU3ltYm9sID0gcmVxdWlyZSgnLi9fU3ltYm9sJyksXG4gICAgVWludDhBcnJheSA9IHJlcXVpcmUoJy4vX1VpbnQ4QXJyYXknKSxcbiAgICBlcSA9IHJlcXVpcmUoJy4vZXEnKSxcbiAgICBlcXVhbEFycmF5cyA9IHJlcXVpcmUoJy4vX2VxdWFsQXJyYXlzJyksXG4gICAgbWFwVG9BcnJheSA9IHJlcXVpcmUoJy4vX21hcFRvQXJyYXknKSxcbiAgICBzZXRUb0FycmF5ID0gcmVxdWlyZSgnLi9fc2V0VG9BcnJheScpO1xuXG4vKiogVXNlZCB0byBjb21wb3NlIGJpdG1hc2tzIGZvciBjb21wYXJpc29uIHN0eWxlcy4gKi9cbnZhciBVTk9SREVSRURfQ09NUEFSRV9GTEFHID0gMSxcbiAgICBQQVJUSUFMX0NPTVBBUkVfRkxBRyA9IDI7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBib29sVGFnID0gJ1tvYmplY3QgQm9vbGVhbl0nLFxuICAgIGRhdGVUYWcgPSAnW29iamVjdCBEYXRlXScsXG4gICAgZXJyb3JUYWcgPSAnW29iamVjdCBFcnJvcl0nLFxuICAgIG1hcFRhZyA9ICdbb2JqZWN0IE1hcF0nLFxuICAgIG51bWJlclRhZyA9ICdbb2JqZWN0IE51bWJlcl0nLFxuICAgIHJlZ2V4cFRhZyA9ICdbb2JqZWN0IFJlZ0V4cF0nLFxuICAgIHNldFRhZyA9ICdbb2JqZWN0IFNldF0nLFxuICAgIHN0cmluZ1RhZyA9ICdbb2JqZWN0IFN0cmluZ10nLFxuICAgIHN5bWJvbFRhZyA9ICdbb2JqZWN0IFN5bWJvbF0nO1xuXG52YXIgYXJyYXlCdWZmZXJUYWcgPSAnW29iamVjdCBBcnJheUJ1ZmZlcl0nLFxuICAgIGRhdGFWaWV3VGFnID0gJ1tvYmplY3QgRGF0YVZpZXddJztcblxuLyoqIFVzZWQgdG8gY29udmVydCBzeW1ib2xzIHRvIHByaW1pdGl2ZXMgYW5kIHN0cmluZ3MuICovXG52YXIgc3ltYm9sUHJvdG8gPSBTeW1ib2wgPyBTeW1ib2wucHJvdG90eXBlIDogdW5kZWZpbmVkLFxuICAgIHN5bWJvbFZhbHVlT2YgPSBzeW1ib2xQcm90byA/IHN5bWJvbFByb3RvLnZhbHVlT2YgOiB1bmRlZmluZWQ7XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBiYXNlSXNFcXVhbERlZXBgIGZvciBjb21wYXJpbmcgb2JqZWN0cyBvZlxuICogdGhlIHNhbWUgYHRvU3RyaW5nVGFnYC5cbiAqXG4gKiAqKk5vdGU6KiogVGhpcyBmdW5jdGlvbiBvbmx5IHN1cHBvcnRzIGNvbXBhcmluZyB2YWx1ZXMgd2l0aCB0YWdzIG9mXG4gKiBgQm9vbGVhbmAsIGBEYXRlYCwgYEVycm9yYCwgYE51bWJlcmAsIGBSZWdFeHBgLCBvciBgU3RyaW5nYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge09iamVjdH0gb3RoZXIgVGhlIG90aGVyIG9iamVjdCB0byBjb21wYXJlLlxuICogQHBhcmFtIHtzdHJpbmd9IHRhZyBUaGUgYHRvU3RyaW5nVGFnYCBvZiB0aGUgb2JqZWN0cyB0byBjb21wYXJlLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZXF1YWxGdW5jIFRoZSBmdW5jdGlvbiB0byBkZXRlcm1pbmUgZXF1aXZhbGVudHMgb2YgdmFsdWVzLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY3VzdG9taXplciBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIGNvbXBhcmlzb25zLlxuICogQHBhcmFtIHtudW1iZXJ9IGJpdG1hc2sgVGhlIGJpdG1hc2sgb2YgY29tcGFyaXNvbiBmbGFncy4gU2VlIGBiYXNlSXNFcXVhbGBcbiAqICBmb3IgbW9yZSBkZXRhaWxzLlxuICogQHBhcmFtIHtPYmplY3R9IHN0YWNrIFRyYWNrcyB0cmF2ZXJzZWQgYG9iamVjdGAgYW5kIGBvdGhlcmAgb2JqZWN0cy5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgb2JqZWN0cyBhcmUgZXF1aXZhbGVudCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBlcXVhbEJ5VGFnKG9iamVjdCwgb3RoZXIsIHRhZywgZXF1YWxGdW5jLCBjdXN0b21pemVyLCBiaXRtYXNrLCBzdGFjaykge1xuICBzd2l0Y2ggKHRhZykge1xuICAgIGNhc2UgZGF0YVZpZXdUYWc6XG4gICAgICBpZiAoKG9iamVjdC5ieXRlTGVuZ3RoICE9IG90aGVyLmJ5dGVMZW5ndGgpIHx8XG4gICAgICAgICAgKG9iamVjdC5ieXRlT2Zmc2V0ICE9IG90aGVyLmJ5dGVPZmZzZXQpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIG9iamVjdCA9IG9iamVjdC5idWZmZXI7XG4gICAgICBvdGhlciA9IG90aGVyLmJ1ZmZlcjtcblxuICAgIGNhc2UgYXJyYXlCdWZmZXJUYWc6XG4gICAgICBpZiAoKG9iamVjdC5ieXRlTGVuZ3RoICE9IG90aGVyLmJ5dGVMZW5ndGgpIHx8XG4gICAgICAgICAgIWVxdWFsRnVuYyhuZXcgVWludDhBcnJheShvYmplY3QpLCBuZXcgVWludDhBcnJheShvdGhlcikpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0cnVlO1xuXG4gICAgY2FzZSBib29sVGFnOlxuICAgIGNhc2UgZGF0ZVRhZzpcbiAgICBjYXNlIG51bWJlclRhZzpcbiAgICAgIC8vIENvZXJjZSBib29sZWFucyB0byBgMWAgb3IgYDBgIGFuZCBkYXRlcyB0byBtaWxsaXNlY29uZHMuXG4gICAgICAvLyBJbnZhbGlkIGRhdGVzIGFyZSBjb2VyY2VkIHRvIGBOYU5gLlxuICAgICAgcmV0dXJuIGVxKCtvYmplY3QsICtvdGhlcik7XG5cbiAgICBjYXNlIGVycm9yVGFnOlxuICAgICAgcmV0dXJuIG9iamVjdC5uYW1lID09IG90aGVyLm5hbWUgJiYgb2JqZWN0Lm1lc3NhZ2UgPT0gb3RoZXIubWVzc2FnZTtcblxuICAgIGNhc2UgcmVnZXhwVGFnOlxuICAgIGNhc2Ugc3RyaW5nVGFnOlxuICAgICAgLy8gQ29lcmNlIHJlZ2V4ZXMgdG8gc3RyaW5ncyBhbmQgdHJlYXQgc3RyaW5ncywgcHJpbWl0aXZlcyBhbmQgb2JqZWN0cyxcbiAgICAgIC8vIGFzIGVxdWFsLiBTZWUgaHR0cDovL3d3dy5lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLXJlZ2V4cC5wcm90b3R5cGUudG9zdHJpbmdcbiAgICAgIC8vIGZvciBtb3JlIGRldGFpbHMuXG4gICAgICByZXR1cm4gb2JqZWN0ID09IChvdGhlciArICcnKTtcblxuICAgIGNhc2UgbWFwVGFnOlxuICAgICAgdmFyIGNvbnZlcnQgPSBtYXBUb0FycmF5O1xuXG4gICAgY2FzZSBzZXRUYWc6XG4gICAgICB2YXIgaXNQYXJ0aWFsID0gYml0bWFzayAmIFBBUlRJQUxfQ09NUEFSRV9GTEFHO1xuICAgICAgY29udmVydCB8fCAoY29udmVydCA9IHNldFRvQXJyYXkpO1xuXG4gICAgICBpZiAob2JqZWN0LnNpemUgIT0gb3RoZXIuc2l6ZSAmJiAhaXNQYXJ0aWFsKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIC8vIEFzc3VtZSBjeWNsaWMgdmFsdWVzIGFyZSBlcXVhbC5cbiAgICAgIHZhciBzdGFja2VkID0gc3RhY2suZ2V0KG9iamVjdCk7XG4gICAgICBpZiAoc3RhY2tlZCkge1xuICAgICAgICByZXR1cm4gc3RhY2tlZCA9PSBvdGhlcjtcbiAgICAgIH1cbiAgICAgIGJpdG1hc2sgfD0gVU5PUkRFUkVEX0NPTVBBUkVfRkxBRztcblxuICAgICAgLy8gUmVjdXJzaXZlbHkgY29tcGFyZSBvYmplY3RzIChzdXNjZXB0aWJsZSB0byBjYWxsIHN0YWNrIGxpbWl0cykuXG4gICAgICBzdGFjay5zZXQob2JqZWN0LCBvdGhlcik7XG4gICAgICB2YXIgcmVzdWx0ID0gZXF1YWxBcnJheXMoY29udmVydChvYmplY3QpLCBjb252ZXJ0KG90aGVyKSwgZXF1YWxGdW5jLCBjdXN0b21pemVyLCBiaXRtYXNrLCBzdGFjayk7XG4gICAgICBzdGFja1snZGVsZXRlJ10ob2JqZWN0KTtcbiAgICAgIHJldHVybiByZXN1bHQ7XG5cbiAgICBjYXNlIHN5bWJvbFRhZzpcbiAgICAgIGlmIChzeW1ib2xWYWx1ZU9mKSB7XG4gICAgICAgIHJldHVybiBzeW1ib2xWYWx1ZU9mLmNhbGwob2JqZWN0KSA9PSBzeW1ib2xWYWx1ZU9mLmNhbGwob3RoZXIpO1xuICAgICAgfVxuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBlcXVhbEJ5VGFnO1xuIiwidmFyIGtleXMgPSByZXF1aXJlKCcuL2tleXMnKTtcblxuLyoqIFVzZWQgdG8gY29tcG9zZSBiaXRtYXNrcyBmb3IgY29tcGFyaXNvbiBzdHlsZXMuICovXG52YXIgUEFSVElBTF9DT01QQVJFX0ZMQUcgPSAyO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgYmFzZUlzRXF1YWxEZWVwYCBmb3Igb2JqZWN0cyB3aXRoIHN1cHBvcnQgZm9yXG4gKiBwYXJ0aWFsIGRlZXAgY29tcGFyaXNvbnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBjb21wYXJlLlxuICogQHBhcmFtIHtPYmplY3R9IG90aGVyIFRoZSBvdGhlciBvYmplY3QgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGVxdWFsRnVuYyBUaGUgZnVuY3Rpb24gdG8gZGV0ZXJtaW5lIGVxdWl2YWxlbnRzIG9mIHZhbHVlcy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGN1c3RvbWl6ZXIgVGhlIGZ1bmN0aW9uIHRvIGN1c3RvbWl6ZSBjb21wYXJpc29ucy5cbiAqIEBwYXJhbSB7bnVtYmVyfSBiaXRtYXNrIFRoZSBiaXRtYXNrIG9mIGNvbXBhcmlzb24gZmxhZ3MuIFNlZSBgYmFzZUlzRXF1YWxgXG4gKiAgZm9yIG1vcmUgZGV0YWlscy5cbiAqIEBwYXJhbSB7T2JqZWN0fSBzdGFjayBUcmFja3MgdHJhdmVyc2VkIGBvYmplY3RgIGFuZCBgb3RoZXJgIG9iamVjdHMuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIG9iamVjdHMgYXJlIGVxdWl2YWxlbnQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gZXF1YWxPYmplY3RzKG9iamVjdCwgb3RoZXIsIGVxdWFsRnVuYywgY3VzdG9taXplciwgYml0bWFzaywgc3RhY2spIHtcbiAgdmFyIGlzUGFydGlhbCA9IGJpdG1hc2sgJiBQQVJUSUFMX0NPTVBBUkVfRkxBRyxcbiAgICAgIG9ialByb3BzID0ga2V5cyhvYmplY3QpLFxuICAgICAgb2JqTGVuZ3RoID0gb2JqUHJvcHMubGVuZ3RoLFxuICAgICAgb3RoUHJvcHMgPSBrZXlzKG90aGVyKSxcbiAgICAgIG90aExlbmd0aCA9IG90aFByb3BzLmxlbmd0aDtcblxuICBpZiAob2JqTGVuZ3RoICE9IG90aExlbmd0aCAmJiAhaXNQYXJ0aWFsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHZhciBpbmRleCA9IG9iakxlbmd0aDtcbiAgd2hpbGUgKGluZGV4LS0pIHtcbiAgICB2YXIga2V5ID0gb2JqUHJvcHNbaW5kZXhdO1xuICAgIGlmICghKGlzUGFydGlhbCA/IGtleSBpbiBvdGhlciA6IGhhc093blByb3BlcnR5LmNhbGwob3RoZXIsIGtleSkpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG4gIC8vIEFzc3VtZSBjeWNsaWMgdmFsdWVzIGFyZSBlcXVhbC5cbiAgdmFyIHN0YWNrZWQgPSBzdGFjay5nZXQob2JqZWN0KTtcbiAgaWYgKHN0YWNrZWQgJiYgc3RhY2suZ2V0KG90aGVyKSkge1xuICAgIHJldHVybiBzdGFja2VkID09IG90aGVyO1xuICB9XG4gIHZhciByZXN1bHQgPSB0cnVlO1xuICBzdGFjay5zZXQob2JqZWN0LCBvdGhlcik7XG4gIHN0YWNrLnNldChvdGhlciwgb2JqZWN0KTtcblxuICB2YXIgc2tpcEN0b3IgPSBpc1BhcnRpYWw7XG4gIHdoaWxlICgrK2luZGV4IDwgb2JqTGVuZ3RoKSB7XG4gICAga2V5ID0gb2JqUHJvcHNbaW5kZXhdO1xuICAgIHZhciBvYmpWYWx1ZSA9IG9iamVjdFtrZXldLFxuICAgICAgICBvdGhWYWx1ZSA9IG90aGVyW2tleV07XG5cbiAgICBpZiAoY3VzdG9taXplcikge1xuICAgICAgdmFyIGNvbXBhcmVkID0gaXNQYXJ0aWFsXG4gICAgICAgID8gY3VzdG9taXplcihvdGhWYWx1ZSwgb2JqVmFsdWUsIGtleSwgb3RoZXIsIG9iamVjdCwgc3RhY2spXG4gICAgICAgIDogY3VzdG9taXplcihvYmpWYWx1ZSwgb3RoVmFsdWUsIGtleSwgb2JqZWN0LCBvdGhlciwgc3RhY2spO1xuICAgIH1cbiAgICAvLyBSZWN1cnNpdmVseSBjb21wYXJlIG9iamVjdHMgKHN1c2NlcHRpYmxlIHRvIGNhbGwgc3RhY2sgbGltaXRzKS5cbiAgICBpZiAoIShjb21wYXJlZCA9PT0gdW5kZWZpbmVkXG4gICAgICAgICAgPyAob2JqVmFsdWUgPT09IG90aFZhbHVlIHx8IGVxdWFsRnVuYyhvYmpWYWx1ZSwgb3RoVmFsdWUsIGN1c3RvbWl6ZXIsIGJpdG1hc2ssIHN0YWNrKSlcbiAgICAgICAgICA6IGNvbXBhcmVkXG4gICAgICAgICkpIHtcbiAgICAgIHJlc3VsdCA9IGZhbHNlO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHNraXBDdG9yIHx8IChza2lwQ3RvciA9IGtleSA9PSAnY29uc3RydWN0b3InKTtcbiAgfVxuICBpZiAocmVzdWx0ICYmICFza2lwQ3Rvcikge1xuICAgIHZhciBvYmpDdG9yID0gb2JqZWN0LmNvbnN0cnVjdG9yLFxuICAgICAgICBvdGhDdG9yID0gb3RoZXIuY29uc3RydWN0b3I7XG5cbiAgICAvLyBOb24gYE9iamVjdGAgb2JqZWN0IGluc3RhbmNlcyB3aXRoIGRpZmZlcmVudCBjb25zdHJ1Y3RvcnMgYXJlIG5vdCBlcXVhbC5cbiAgICBpZiAob2JqQ3RvciAhPSBvdGhDdG9yICYmXG4gICAgICAgICgnY29uc3RydWN0b3InIGluIG9iamVjdCAmJiAnY29uc3RydWN0b3InIGluIG90aGVyKSAmJlxuICAgICAgICAhKHR5cGVvZiBvYmpDdG9yID09ICdmdW5jdGlvbicgJiYgb2JqQ3RvciBpbnN0YW5jZW9mIG9iakN0b3IgJiZcbiAgICAgICAgICB0eXBlb2Ygb3RoQ3RvciA9PSAnZnVuY3Rpb24nICYmIG90aEN0b3IgaW5zdGFuY2VvZiBvdGhDdG9yKSkge1xuICAgICAgcmVzdWx0ID0gZmFsc2U7XG4gICAgfVxuICB9XG4gIHN0YWNrWydkZWxldGUnXShvYmplY3QpO1xuICBzdGFja1snZGVsZXRlJ10ob3RoZXIpO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGVxdWFsT2JqZWN0cztcbiIsIi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgZ2xvYmFsYCBmcm9tIE5vZGUuanMuICovXG52YXIgZnJlZUdsb2JhbCA9IHR5cGVvZiBnbG9iYWwgPT0gJ29iamVjdCcgJiYgZ2xvYmFsICYmIGdsb2JhbC5PYmplY3QgPT09IE9iamVjdCAmJiBnbG9iYWw7XG5cbm1vZHVsZS5leHBvcnRzID0gZnJlZUdsb2JhbDtcbiIsInZhciBpc0tleWFibGUgPSByZXF1aXJlKCcuL19pc0tleWFibGUnKTtcblxuLyoqXG4gKiBHZXRzIHRoZSBkYXRhIGZvciBgbWFwYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG1hcCBUaGUgbWFwIHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUgcmVmZXJlbmNlIGtleS5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBtYXAgZGF0YS5cbiAqL1xuZnVuY3Rpb24gZ2V0TWFwRGF0YShtYXAsIGtleSkge1xuICB2YXIgZGF0YSA9IG1hcC5fX2RhdGFfXztcbiAgcmV0dXJuIGlzS2V5YWJsZShrZXkpXG4gICAgPyBkYXRhW3R5cGVvZiBrZXkgPT0gJ3N0cmluZycgPyAnc3RyaW5nJyA6ICdoYXNoJ11cbiAgICA6IGRhdGEubWFwO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGdldE1hcERhdGE7XG4iLCJ2YXIgYmFzZUlzTmF0aXZlID0gcmVxdWlyZSgnLi9fYmFzZUlzTmF0aXZlJyksXG4gICAgZ2V0VmFsdWUgPSByZXF1aXJlKCcuL19nZXRWYWx1ZScpO1xuXG4vKipcbiAqIEdldHMgdGhlIG5hdGl2ZSBmdW5jdGlvbiBhdCBga2V5YCBvZiBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBtZXRob2QgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIGZ1bmN0aW9uIGlmIGl0J3MgbmF0aXZlLCBlbHNlIGB1bmRlZmluZWRgLlxuICovXG5mdW5jdGlvbiBnZXROYXRpdmUob2JqZWN0LCBrZXkpIHtcbiAgdmFyIHZhbHVlID0gZ2V0VmFsdWUob2JqZWN0LCBrZXkpO1xuICByZXR1cm4gYmFzZUlzTmF0aXZlKHZhbHVlKSA/IHZhbHVlIDogdW5kZWZpbmVkO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGdldE5hdGl2ZTtcbiIsInZhciBEYXRhVmlldyA9IHJlcXVpcmUoJy4vX0RhdGFWaWV3JyksXG4gICAgTWFwID0gcmVxdWlyZSgnLi9fTWFwJyksXG4gICAgUHJvbWlzZSA9IHJlcXVpcmUoJy4vX1Byb21pc2UnKSxcbiAgICBTZXQgPSByZXF1aXJlKCcuL19TZXQnKSxcbiAgICBXZWFrTWFwID0gcmVxdWlyZSgnLi9fV2Vha01hcCcpLFxuICAgIGJhc2VHZXRUYWcgPSByZXF1aXJlKCcuL19iYXNlR2V0VGFnJyksXG4gICAgdG9Tb3VyY2UgPSByZXF1aXJlKCcuL190b1NvdXJjZScpO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgbWFwVGFnID0gJ1tvYmplY3QgTWFwXScsXG4gICAgb2JqZWN0VGFnID0gJ1tvYmplY3QgT2JqZWN0XScsXG4gICAgcHJvbWlzZVRhZyA9ICdbb2JqZWN0IFByb21pc2VdJyxcbiAgICBzZXRUYWcgPSAnW29iamVjdCBTZXRdJyxcbiAgICB3ZWFrTWFwVGFnID0gJ1tvYmplY3QgV2Vha01hcF0nO1xuXG52YXIgZGF0YVZpZXdUYWcgPSAnW29iamVjdCBEYXRhVmlld10nO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGVcbiAqIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgb2JqZWN0VG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IG1hcHMsIHNldHMsIGFuZCB3ZWFrbWFwcy4gKi9cbnZhciBkYXRhVmlld0N0b3JTdHJpbmcgPSB0b1NvdXJjZShEYXRhVmlldyksXG4gICAgbWFwQ3RvclN0cmluZyA9IHRvU291cmNlKE1hcCksXG4gICAgcHJvbWlzZUN0b3JTdHJpbmcgPSB0b1NvdXJjZShQcm9taXNlKSxcbiAgICBzZXRDdG9yU3RyaW5nID0gdG9Tb3VyY2UoU2V0KSxcbiAgICB3ZWFrTWFwQ3RvclN0cmluZyA9IHRvU291cmNlKFdlYWtNYXApO1xuXG4vKipcbiAqIEdldHMgdGhlIGB0b1N0cmluZ1RhZ2Agb2YgYHZhbHVlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBgdG9TdHJpbmdUYWdgLlxuICovXG52YXIgZ2V0VGFnID0gYmFzZUdldFRhZztcblxuLy8gRmFsbGJhY2sgZm9yIGRhdGEgdmlld3MsIG1hcHMsIHNldHMsIGFuZCB3ZWFrIG1hcHMgaW4gSUUgMTEgYW5kIHByb21pc2VzIGluIE5vZGUuanMgPCA2LlxuaWYgKChEYXRhVmlldyAmJiBnZXRUYWcobmV3IERhdGFWaWV3KG5ldyBBcnJheUJ1ZmZlcigxKSkpICE9IGRhdGFWaWV3VGFnKSB8fFxuICAgIChNYXAgJiYgZ2V0VGFnKG5ldyBNYXApICE9IG1hcFRhZykgfHxcbiAgICAoUHJvbWlzZSAmJiBnZXRUYWcoUHJvbWlzZS5yZXNvbHZlKCkpICE9IHByb21pc2VUYWcpIHx8XG4gICAgKFNldCAmJiBnZXRUYWcobmV3IFNldCkgIT0gc2V0VGFnKSB8fFxuICAgIChXZWFrTWFwICYmIGdldFRhZyhuZXcgV2Vha01hcCkgIT0gd2Vha01hcFRhZykpIHtcbiAgZ2V0VGFnID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICB2YXIgcmVzdWx0ID0gb2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSksXG4gICAgICAgIEN0b3IgPSByZXN1bHQgPT0gb2JqZWN0VGFnID8gdmFsdWUuY29uc3RydWN0b3IgOiB1bmRlZmluZWQsXG4gICAgICAgIGN0b3JTdHJpbmcgPSBDdG9yID8gdG9Tb3VyY2UoQ3RvcikgOiB1bmRlZmluZWQ7XG5cbiAgICBpZiAoY3RvclN0cmluZykge1xuICAgICAgc3dpdGNoIChjdG9yU3RyaW5nKSB7XG4gICAgICAgIGNhc2UgZGF0YVZpZXdDdG9yU3RyaW5nOiByZXR1cm4gZGF0YVZpZXdUYWc7XG4gICAgICAgIGNhc2UgbWFwQ3RvclN0cmluZzogcmV0dXJuIG1hcFRhZztcbiAgICAgICAgY2FzZSBwcm9taXNlQ3RvclN0cmluZzogcmV0dXJuIHByb21pc2VUYWc7XG4gICAgICAgIGNhc2Ugc2V0Q3RvclN0cmluZzogcmV0dXJuIHNldFRhZztcbiAgICAgICAgY2FzZSB3ZWFrTWFwQ3RvclN0cmluZzogcmV0dXJuIHdlYWtNYXBUYWc7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0VGFnO1xuIiwiLyoqXG4gKiBHZXRzIHRoZSB2YWx1ZSBhdCBga2V5YCBvZiBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IFtvYmplY3RdIFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHByb3BlcnR5IHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBwcm9wZXJ0eSB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gZ2V0VmFsdWUob2JqZWN0LCBrZXkpIHtcbiAgcmV0dXJuIG9iamVjdCA9PSBudWxsID8gdW5kZWZpbmVkIDogb2JqZWN0W2tleV07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0VmFsdWU7XG4iLCJ2YXIgbmF0aXZlQ3JlYXRlID0gcmVxdWlyZSgnLi9fbmF0aXZlQ3JlYXRlJyk7XG5cbi8qKlxuICogUmVtb3ZlcyBhbGwga2V5LXZhbHVlIGVudHJpZXMgZnJvbSB0aGUgaGFzaC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgY2xlYXJcbiAqIEBtZW1iZXJPZiBIYXNoXG4gKi9cbmZ1bmN0aW9uIGhhc2hDbGVhcigpIHtcbiAgdGhpcy5fX2RhdGFfXyA9IG5hdGl2ZUNyZWF0ZSA/IG5hdGl2ZUNyZWF0ZShudWxsKSA6IHt9O1xuICB0aGlzLnNpemUgPSAwO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGhhc2hDbGVhcjtcbiIsIi8qKlxuICogUmVtb3ZlcyBga2V5YCBhbmQgaXRzIHZhbHVlIGZyb20gdGhlIGhhc2guXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGRlbGV0ZVxuICogQG1lbWJlck9mIEhhc2hcbiAqIEBwYXJhbSB7T2JqZWN0fSBoYXNoIFRoZSBoYXNoIHRvIG1vZGlmeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gcmVtb3ZlLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBlbnRyeSB3YXMgcmVtb3ZlZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBoYXNoRGVsZXRlKGtleSkge1xuICB2YXIgcmVzdWx0ID0gdGhpcy5oYXMoa2V5KSAmJiBkZWxldGUgdGhpcy5fX2RhdGFfX1trZXldO1xuICB0aGlzLnNpemUgLT0gcmVzdWx0ID8gMSA6IDA7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaGFzaERlbGV0ZTtcbiIsInZhciBuYXRpdmVDcmVhdGUgPSByZXF1aXJlKCcuL19uYXRpdmVDcmVhdGUnKTtcblxuLyoqIFVzZWQgdG8gc3RhbmQtaW4gZm9yIGB1bmRlZmluZWRgIGhhc2ggdmFsdWVzLiAqL1xudmFyIEhBU0hfVU5ERUZJTkVEID0gJ19fbG9kYXNoX2hhc2hfdW5kZWZpbmVkX18nO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIEdldHMgdGhlIGhhc2ggdmFsdWUgZm9yIGBrZXlgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBnZXRcbiAqIEBtZW1iZXJPZiBIYXNoXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBlbnRyeSB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gaGFzaEdldChrZXkpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fO1xuICBpZiAobmF0aXZlQ3JlYXRlKSB7XG4gICAgdmFyIHJlc3VsdCA9IGRhdGFba2V5XTtcbiAgICByZXR1cm4gcmVzdWx0ID09PSBIQVNIX1VOREVGSU5FRCA/IHVuZGVmaW5lZCA6IHJlc3VsdDtcbiAgfVxuICByZXR1cm4gaGFzT3duUHJvcGVydHkuY2FsbChkYXRhLCBrZXkpID8gZGF0YVtrZXldIDogdW5kZWZpbmVkO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGhhc2hHZXQ7XG4iLCJ2YXIgbmF0aXZlQ3JlYXRlID0gcmVxdWlyZSgnLi9fbmF0aXZlQ3JlYXRlJyk7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGEgaGFzaCB2YWx1ZSBmb3IgYGtleWAgZXhpc3RzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBoYXNcbiAqIEBtZW1iZXJPZiBIYXNoXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIGVudHJ5IHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGFuIGVudHJ5IGZvciBga2V5YCBleGlzdHMsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaGFzaEhhcyhrZXkpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fO1xuICByZXR1cm4gbmF0aXZlQ3JlYXRlID8gZGF0YVtrZXldICE9PSB1bmRlZmluZWQgOiBoYXNPd25Qcm9wZXJ0eS5jYWxsKGRhdGEsIGtleSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaGFzaEhhcztcbiIsInZhciBuYXRpdmVDcmVhdGUgPSByZXF1aXJlKCcuL19uYXRpdmVDcmVhdGUnKTtcblxuLyoqIFVzZWQgdG8gc3RhbmQtaW4gZm9yIGB1bmRlZmluZWRgIGhhc2ggdmFsdWVzLiAqL1xudmFyIEhBU0hfVU5ERUZJTkVEID0gJ19fbG9kYXNoX2hhc2hfdW5kZWZpbmVkX18nO1xuXG4vKipcbiAqIFNldHMgdGhlIGhhc2ggYGtleWAgdG8gYHZhbHVlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgc2V0XG4gKiBAbWVtYmVyT2YgSGFzaFxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBoYXNoIGluc3RhbmNlLlxuICovXG5mdW5jdGlvbiBoYXNoU2V0KGtleSwgdmFsdWUpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fO1xuICB0aGlzLnNpemUgKz0gdGhpcy5oYXMoa2V5KSA/IDAgOiAxO1xuICBkYXRhW2tleV0gPSAobmF0aXZlQ3JlYXRlICYmIHZhbHVlID09PSB1bmRlZmluZWQpID8gSEFTSF9VTkRFRklORUQgOiB2YWx1ZTtcbiAgcmV0dXJuIHRoaXM7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaGFzaFNldDtcbiIsIi8qKiBVc2VkIGFzIHJlZmVyZW5jZXMgZm9yIHZhcmlvdXMgYE51bWJlcmAgY29uc3RhbnRzLiAqL1xudmFyIE1BWF9TQUZFX0lOVEVHRVIgPSA5MDA3MTk5MjU0NzQwOTkxO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgdW5zaWduZWQgaW50ZWdlciB2YWx1ZXMuICovXG52YXIgcmVJc1VpbnQgPSAvXig/OjB8WzEtOV1cXGQqKSQvO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgYXJyYXktbGlrZSBpbmRleC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcGFyYW0ge251bWJlcn0gW2xlbmd0aD1NQVhfU0FGRV9JTlRFR0VSXSBUaGUgdXBwZXIgYm91bmRzIG9mIGEgdmFsaWQgaW5kZXguXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGluZGV4LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzSW5kZXgodmFsdWUsIGxlbmd0aCkge1xuICBsZW5ndGggPSBsZW5ndGggPT0gbnVsbCA/IE1BWF9TQUZFX0lOVEVHRVIgOiBsZW5ndGg7XG4gIHJldHVybiAhIWxlbmd0aCAmJlxuICAgICh0eXBlb2YgdmFsdWUgPT0gJ251bWJlcicgfHwgcmVJc1VpbnQudGVzdCh2YWx1ZSkpICYmXG4gICAgKHZhbHVlID4gLTEgJiYgdmFsdWUgJSAxID09IDAgJiYgdmFsdWUgPCBsZW5ndGgpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzSW5kZXg7XG4iLCIvKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIHN1aXRhYmxlIGZvciB1c2UgYXMgdW5pcXVlIG9iamVjdCBrZXkuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgc3VpdGFibGUsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNLZXlhYmxlKHZhbHVlKSB7XG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbHVlO1xuICByZXR1cm4gKHR5cGUgPT0gJ3N0cmluZycgfHwgdHlwZSA9PSAnbnVtYmVyJyB8fCB0eXBlID09ICdzeW1ib2wnIHx8IHR5cGUgPT0gJ2Jvb2xlYW4nKVxuICAgID8gKHZhbHVlICE9PSAnX19wcm90b19fJylcbiAgICA6ICh2YWx1ZSA9PT0gbnVsbCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNLZXlhYmxlO1xuIiwidmFyIGNvcmVKc0RhdGEgPSByZXF1aXJlKCcuL19jb3JlSnNEYXRhJyk7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBtZXRob2RzIG1hc3F1ZXJhZGluZyBhcyBuYXRpdmUuICovXG52YXIgbWFza1NyY0tleSA9IChmdW5jdGlvbigpIHtcbiAgdmFyIHVpZCA9IC9bXi5dKyQvLmV4ZWMoY29yZUpzRGF0YSAmJiBjb3JlSnNEYXRhLmtleXMgJiYgY29yZUpzRGF0YS5rZXlzLklFX1BST1RPIHx8ICcnKTtcbiAgcmV0dXJuIHVpZCA/ICgnU3ltYm9sKHNyYylfMS4nICsgdWlkKSA6ICcnO1xufSgpKTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYGZ1bmNgIGhhcyBpdHMgc291cmNlIG1hc2tlZC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYGZ1bmNgIGlzIG1hc2tlZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc01hc2tlZChmdW5jKSB7XG4gIHJldHVybiAhIW1hc2tTcmNLZXkgJiYgKG1hc2tTcmNLZXkgaW4gZnVuYyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNNYXNrZWQ7XG4iLCIvKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGxpa2VseSBhIHByb3RvdHlwZSBvYmplY3QuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBwcm90b3R5cGUsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNQcm90b3R5cGUodmFsdWUpIHtcbiAgdmFyIEN0b3IgPSB2YWx1ZSAmJiB2YWx1ZS5jb25zdHJ1Y3RvcixcbiAgICAgIHByb3RvID0gKHR5cGVvZiBDdG9yID09ICdmdW5jdGlvbicgJiYgQ3Rvci5wcm90b3R5cGUpIHx8IG9iamVjdFByb3RvO1xuXG4gIHJldHVybiB2YWx1ZSA9PT0gcHJvdG87XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNQcm90b3R5cGU7XG4iLCIvKipcbiAqIFJlbW92ZXMgYWxsIGtleS12YWx1ZSBlbnRyaWVzIGZyb20gdGhlIGxpc3QgY2FjaGUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGNsZWFyXG4gKiBAbWVtYmVyT2YgTGlzdENhY2hlXG4gKi9cbmZ1bmN0aW9uIGxpc3RDYWNoZUNsZWFyKCkge1xuICB0aGlzLl9fZGF0YV9fID0gW107XG4gIHRoaXMuc2l6ZSA9IDA7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbGlzdENhY2hlQ2xlYXI7XG4iLCJ2YXIgYXNzb2NJbmRleE9mID0gcmVxdWlyZSgnLi9fYXNzb2NJbmRleE9mJyk7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBhcnJheVByb3RvID0gQXJyYXkucHJvdG90eXBlO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBzcGxpY2UgPSBhcnJheVByb3RvLnNwbGljZTtcblxuLyoqXG4gKiBSZW1vdmVzIGBrZXlgIGFuZCBpdHMgdmFsdWUgZnJvbSB0aGUgbGlzdCBjYWNoZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZGVsZXRlXG4gKiBAbWVtYmVyT2YgTGlzdENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHJlbW92ZS5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgZW50cnkgd2FzIHJlbW92ZWQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gbGlzdENhY2hlRGVsZXRlKGtleSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX18sXG4gICAgICBpbmRleCA9IGFzc29jSW5kZXhPZihkYXRhLCBrZXkpO1xuXG4gIGlmIChpbmRleCA8IDApIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIGxhc3RJbmRleCA9IGRhdGEubGVuZ3RoIC0gMTtcbiAgaWYgKGluZGV4ID09IGxhc3RJbmRleCkge1xuICAgIGRhdGEucG9wKCk7XG4gIH0gZWxzZSB7XG4gICAgc3BsaWNlLmNhbGwoZGF0YSwgaW5kZXgsIDEpO1xuICB9XG4gIC0tdGhpcy5zaXplO1xuICByZXR1cm4gdHJ1ZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBsaXN0Q2FjaGVEZWxldGU7XG4iLCJ2YXIgYXNzb2NJbmRleE9mID0gcmVxdWlyZSgnLi9fYXNzb2NJbmRleE9mJyk7XG5cbi8qKlxuICogR2V0cyB0aGUgbGlzdCBjYWNoZSB2YWx1ZSBmb3IgYGtleWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGdldFxuICogQG1lbWJlck9mIExpc3RDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgZW50cnkgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIGxpc3RDYWNoZUdldChrZXkpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fLFxuICAgICAgaW5kZXggPSBhc3NvY0luZGV4T2YoZGF0YSwga2V5KTtcblxuICByZXR1cm4gaW5kZXggPCAwID8gdW5kZWZpbmVkIDogZGF0YVtpbmRleF1bMV07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbGlzdENhY2hlR2V0O1xuIiwidmFyIGFzc29jSW5kZXhPZiA9IHJlcXVpcmUoJy4vX2Fzc29jSW5kZXhPZicpO1xuXG4vKipcbiAqIENoZWNrcyBpZiBhIGxpc3QgY2FjaGUgdmFsdWUgZm9yIGBrZXlgIGV4aXN0cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgaGFzXG4gKiBAbWVtYmVyT2YgTGlzdENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIGVudHJ5IHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGFuIGVudHJ5IGZvciBga2V5YCBleGlzdHMsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gbGlzdENhY2hlSGFzKGtleSkge1xuICByZXR1cm4gYXNzb2NJbmRleE9mKHRoaXMuX19kYXRhX18sIGtleSkgPiAtMTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBsaXN0Q2FjaGVIYXM7XG4iLCJ2YXIgYXNzb2NJbmRleE9mID0gcmVxdWlyZSgnLi9fYXNzb2NJbmRleE9mJyk7XG5cbi8qKlxuICogU2V0cyB0aGUgbGlzdCBjYWNoZSBga2V5YCB0byBgdmFsdWVgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBzZXRcbiAqIEBtZW1iZXJPZiBMaXN0Q2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gc2V0LlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2V0LlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgbGlzdCBjYWNoZSBpbnN0YW5jZS5cbiAqL1xuZnVuY3Rpb24gbGlzdENhY2hlU2V0KGtleSwgdmFsdWUpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fLFxuICAgICAgaW5kZXggPSBhc3NvY0luZGV4T2YoZGF0YSwga2V5KTtcblxuICBpZiAoaW5kZXggPCAwKSB7XG4gICAgKyt0aGlzLnNpemU7XG4gICAgZGF0YS5wdXNoKFtrZXksIHZhbHVlXSk7XG4gIH0gZWxzZSB7XG4gICAgZGF0YVtpbmRleF1bMV0gPSB2YWx1ZTtcbiAgfVxuICByZXR1cm4gdGhpcztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBsaXN0Q2FjaGVTZXQ7XG4iLCJ2YXIgSGFzaCA9IHJlcXVpcmUoJy4vX0hhc2gnKSxcbiAgICBMaXN0Q2FjaGUgPSByZXF1aXJlKCcuL19MaXN0Q2FjaGUnKSxcbiAgICBNYXAgPSByZXF1aXJlKCcuL19NYXAnKTtcblxuLyoqXG4gKiBSZW1vdmVzIGFsbCBrZXktdmFsdWUgZW50cmllcyBmcm9tIHRoZSBtYXAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGNsZWFyXG4gKiBAbWVtYmVyT2YgTWFwQ2FjaGVcbiAqL1xuZnVuY3Rpb24gbWFwQ2FjaGVDbGVhcigpIHtcbiAgdGhpcy5zaXplID0gMDtcbiAgdGhpcy5fX2RhdGFfXyA9IHtcbiAgICAnaGFzaCc6IG5ldyBIYXNoLFxuICAgICdtYXAnOiBuZXcgKE1hcCB8fCBMaXN0Q2FjaGUpLFxuICAgICdzdHJpbmcnOiBuZXcgSGFzaFxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG1hcENhY2hlQ2xlYXI7XG4iLCJ2YXIgZ2V0TWFwRGF0YSA9IHJlcXVpcmUoJy4vX2dldE1hcERhdGEnKTtcblxuLyoqXG4gKiBSZW1vdmVzIGBrZXlgIGFuZCBpdHMgdmFsdWUgZnJvbSB0aGUgbWFwLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBkZWxldGVcbiAqIEBtZW1iZXJPZiBNYXBDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byByZW1vdmUuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGVudHJ5IHdhcyByZW1vdmVkLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIG1hcENhY2hlRGVsZXRlKGtleSkge1xuICB2YXIgcmVzdWx0ID0gZ2V0TWFwRGF0YSh0aGlzLCBrZXkpWydkZWxldGUnXShrZXkpO1xuICB0aGlzLnNpemUgLT0gcmVzdWx0ID8gMSA6IDA7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbWFwQ2FjaGVEZWxldGU7XG4iLCJ2YXIgZ2V0TWFwRGF0YSA9IHJlcXVpcmUoJy4vX2dldE1hcERhdGEnKTtcblxuLyoqXG4gKiBHZXRzIHRoZSBtYXAgdmFsdWUgZm9yIGBrZXlgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBnZXRcbiAqIEBtZW1iZXJPZiBNYXBDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgZW50cnkgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIG1hcENhY2hlR2V0KGtleSkge1xuICByZXR1cm4gZ2V0TWFwRGF0YSh0aGlzLCBrZXkpLmdldChrZXkpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG1hcENhY2hlR2V0O1xuIiwidmFyIGdldE1hcERhdGEgPSByZXF1aXJlKCcuL19nZXRNYXBEYXRhJyk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGEgbWFwIHZhbHVlIGZvciBga2V5YCBleGlzdHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGhhc1xuICogQG1lbWJlck9mIE1hcENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIGVudHJ5IHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGFuIGVudHJ5IGZvciBga2V5YCBleGlzdHMsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gbWFwQ2FjaGVIYXMoa2V5KSB7XG4gIHJldHVybiBnZXRNYXBEYXRhKHRoaXMsIGtleSkuaGFzKGtleSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbWFwQ2FjaGVIYXM7XG4iLCJ2YXIgZ2V0TWFwRGF0YSA9IHJlcXVpcmUoJy4vX2dldE1hcERhdGEnKTtcblxuLyoqXG4gKiBTZXRzIHRoZSBtYXAgYGtleWAgdG8gYHZhbHVlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgc2V0XG4gKiBAbWVtYmVyT2YgTWFwQ2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gc2V0LlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2V0LlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgbWFwIGNhY2hlIGluc3RhbmNlLlxuICovXG5mdW5jdGlvbiBtYXBDYWNoZVNldChrZXksIHZhbHVlKSB7XG4gIHZhciBkYXRhID0gZ2V0TWFwRGF0YSh0aGlzLCBrZXkpLFxuICAgICAgc2l6ZSA9IGRhdGEuc2l6ZTtcblxuICBkYXRhLnNldChrZXksIHZhbHVlKTtcbiAgdGhpcy5zaXplICs9IGRhdGEuc2l6ZSA9PSBzaXplID8gMCA6IDE7XG4gIHJldHVybiB0aGlzO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG1hcENhY2hlU2V0O1xuIiwiLyoqXG4gKiBDb252ZXJ0cyBgbWFwYCB0byBpdHMga2V5LXZhbHVlIHBhaXJzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gbWFwIFRoZSBtYXAgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUga2V5LXZhbHVlIHBhaXJzLlxuICovXG5mdW5jdGlvbiBtYXBUb0FycmF5KG1hcCkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIHJlc3VsdCA9IEFycmF5KG1hcC5zaXplKTtcblxuICBtYXAuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSwga2V5KSB7XG4gICAgcmVzdWx0WysraW5kZXhdID0gW2tleSwgdmFsdWVdO1xuICB9KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBtYXBUb0FycmF5O1xuIiwidmFyIGdldE5hdGl2ZSA9IHJlcXVpcmUoJy4vX2dldE5hdGl2ZScpO1xuXG4vKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyB0aGF0IGFyZSB2ZXJpZmllZCB0byBiZSBuYXRpdmUuICovXG52YXIgbmF0aXZlQ3JlYXRlID0gZ2V0TmF0aXZlKE9iamVjdCwgJ2NyZWF0ZScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IG5hdGl2ZUNyZWF0ZTtcbiIsInZhciBvdmVyQXJnID0gcmVxdWlyZSgnLi9fb3ZlckFyZycpO1xuXG4vKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyBmb3IgdGhvc2Ugd2l0aCB0aGUgc2FtZSBuYW1lIGFzIG90aGVyIGBsb2Rhc2hgIG1ldGhvZHMuICovXG52YXIgbmF0aXZlS2V5cyA9IG92ZXJBcmcoT2JqZWN0LmtleXMsIE9iamVjdCk7XG5cbm1vZHVsZS5leHBvcnRzID0gbmF0aXZlS2V5cztcbiIsInZhciBmcmVlR2xvYmFsID0gcmVxdWlyZSgnLi9fZnJlZUdsb2JhbCcpO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYGV4cG9ydHNgLiAqL1xudmFyIGZyZWVFeHBvcnRzID0gdHlwZW9mIGV4cG9ydHMgPT0gJ29iamVjdCcgJiYgZXhwb3J0cyAmJiAhZXhwb3J0cy5ub2RlVHlwZSAmJiBleHBvcnRzO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYG1vZHVsZWAuICovXG52YXIgZnJlZU1vZHVsZSA9IGZyZWVFeHBvcnRzICYmIHR5cGVvZiBtb2R1bGUgPT0gJ29iamVjdCcgJiYgbW9kdWxlICYmICFtb2R1bGUubm9kZVR5cGUgJiYgbW9kdWxlO1xuXG4vKiogRGV0ZWN0IHRoZSBwb3B1bGFyIENvbW1vbkpTIGV4dGVuc2lvbiBgbW9kdWxlLmV4cG9ydHNgLiAqL1xudmFyIG1vZHVsZUV4cG9ydHMgPSBmcmVlTW9kdWxlICYmIGZyZWVNb2R1bGUuZXhwb3J0cyA9PT0gZnJlZUV4cG9ydHM7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgcHJvY2Vzc2AgZnJvbSBOb2RlLmpzLiAqL1xudmFyIGZyZWVQcm9jZXNzID0gbW9kdWxlRXhwb3J0cyAmJiBmcmVlR2xvYmFsLnByb2Nlc3M7XG5cbi8qKiBVc2VkIHRvIGFjY2VzcyBmYXN0ZXIgTm9kZS5qcyBoZWxwZXJzLiAqL1xudmFyIG5vZGVVdGlsID0gKGZ1bmN0aW9uKCkge1xuICB0cnkge1xuICAgIHJldHVybiBmcmVlUHJvY2VzcyAmJiBmcmVlUHJvY2Vzcy5iaW5kaW5nKCd1dGlsJyk7XG4gIH0gY2F0Y2ggKGUpIHt9XG59KCkpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IG5vZGVVdGlsO1xuIiwiLyoqXG4gKiBDcmVhdGVzIGEgdW5hcnkgZnVuY3Rpb24gdGhhdCBpbnZva2VzIGBmdW5jYCB3aXRoIGl0cyBhcmd1bWVudCB0cmFuc2Zvcm1lZC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gd3JhcC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHRyYW5zZm9ybSBUaGUgYXJndW1lbnQgdHJhbnNmb3JtLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIG92ZXJBcmcoZnVuYywgdHJhbnNmb3JtKSB7XG4gIHJldHVybiBmdW5jdGlvbihhcmcpIHtcbiAgICByZXR1cm4gZnVuYyh0cmFuc2Zvcm0oYXJnKSk7XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gb3ZlckFyZztcbiIsInZhciBmcmVlR2xvYmFsID0gcmVxdWlyZSgnLi9fZnJlZUdsb2JhbCcpO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYHNlbGZgLiAqL1xudmFyIGZyZWVTZWxmID0gdHlwZW9mIHNlbGYgPT0gJ29iamVjdCcgJiYgc2VsZiAmJiBzZWxmLk9iamVjdCA9PT0gT2JqZWN0ICYmIHNlbGY7XG5cbi8qKiBVc2VkIGFzIGEgcmVmZXJlbmNlIHRvIHRoZSBnbG9iYWwgb2JqZWN0LiAqL1xudmFyIHJvb3QgPSBmcmVlR2xvYmFsIHx8IGZyZWVTZWxmIHx8IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cbm1vZHVsZS5leHBvcnRzID0gcm9vdDtcbiIsIi8qKiBVc2VkIHRvIHN0YW5kLWluIGZvciBgdW5kZWZpbmVkYCBoYXNoIHZhbHVlcy4gKi9cbnZhciBIQVNIX1VOREVGSU5FRCA9ICdfX2xvZGFzaF9oYXNoX3VuZGVmaW5lZF9fJztcblxuLyoqXG4gKiBBZGRzIGB2YWx1ZWAgdG8gdGhlIGFycmF5IGNhY2hlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBhZGRcbiAqIEBtZW1iZXJPZiBTZXRDYWNoZVxuICogQGFsaWFzIHB1c2hcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNhY2hlLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgY2FjaGUgaW5zdGFuY2UuXG4gKi9cbmZ1bmN0aW9uIHNldENhY2hlQWRkKHZhbHVlKSB7XG4gIHRoaXMuX19kYXRhX18uc2V0KHZhbHVlLCBIQVNIX1VOREVGSU5FRCk7XG4gIHJldHVybiB0aGlzO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNldENhY2hlQWRkO1xuIiwiLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBpbiB0aGUgYXJyYXkgY2FjaGUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGhhc1xuICogQG1lbWJlck9mIFNldENhY2hlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBzZWFyY2ggZm9yLlxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBmb3VuZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBzZXRDYWNoZUhhcyh2YWx1ZSkge1xuICByZXR1cm4gdGhpcy5fX2RhdGFfXy5oYXModmFsdWUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNldENhY2hlSGFzO1xuIiwiLyoqXG4gKiBDb252ZXJ0cyBgc2V0YCB0byBhbiBhcnJheSBvZiBpdHMgdmFsdWVzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gc2V0IFRoZSBzZXQgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgdmFsdWVzLlxuICovXG5mdW5jdGlvbiBzZXRUb0FycmF5KHNldCkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIHJlc3VsdCA9IEFycmF5KHNldC5zaXplKTtcblxuICBzZXQuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSkge1xuICAgIHJlc3VsdFsrK2luZGV4XSA9IHZhbHVlO1xuICB9KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzZXRUb0FycmF5O1xuIiwidmFyIExpc3RDYWNoZSA9IHJlcXVpcmUoJy4vX0xpc3RDYWNoZScpO1xuXG4vKipcbiAqIFJlbW92ZXMgYWxsIGtleS12YWx1ZSBlbnRyaWVzIGZyb20gdGhlIHN0YWNrLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBjbGVhclxuICogQG1lbWJlck9mIFN0YWNrXG4gKi9cbmZ1bmN0aW9uIHN0YWNrQ2xlYXIoKSB7XG4gIHRoaXMuX19kYXRhX18gPSBuZXcgTGlzdENhY2hlO1xuICB0aGlzLnNpemUgPSAwO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN0YWNrQ2xlYXI7XG4iLCIvKipcbiAqIFJlbW92ZXMgYGtleWAgYW5kIGl0cyB2YWx1ZSBmcm9tIHRoZSBzdGFjay5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZGVsZXRlXG4gKiBAbWVtYmVyT2YgU3RhY2tcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gcmVtb3ZlLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBlbnRyeSB3YXMgcmVtb3ZlZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBzdGFja0RlbGV0ZShrZXkpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fLFxuICAgICAgcmVzdWx0ID0gZGF0YVsnZGVsZXRlJ10oa2V5KTtcblxuICB0aGlzLnNpemUgPSBkYXRhLnNpemU7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3RhY2tEZWxldGU7XG4iLCIvKipcbiAqIEdldHMgdGhlIHN0YWNrIHZhbHVlIGZvciBga2V5YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZ2V0XG4gKiBAbWVtYmVyT2YgU3RhY2tcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIGVudHJ5IHZhbHVlLlxuICovXG5mdW5jdGlvbiBzdGFja0dldChrZXkpIHtcbiAgcmV0dXJuIHRoaXMuX19kYXRhX18uZ2V0KGtleSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3RhY2tHZXQ7XG4iLCIvKipcbiAqIENoZWNrcyBpZiBhIHN0YWNrIHZhbHVlIGZvciBga2V5YCBleGlzdHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGhhc1xuICogQG1lbWJlck9mIFN0YWNrXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIGVudHJ5IHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGFuIGVudHJ5IGZvciBga2V5YCBleGlzdHMsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gc3RhY2tIYXMoa2V5KSB7XG4gIHJldHVybiB0aGlzLl9fZGF0YV9fLmhhcyhrZXkpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN0YWNrSGFzO1xuIiwidmFyIExpc3RDYWNoZSA9IHJlcXVpcmUoJy4vX0xpc3RDYWNoZScpLFxuICAgIE1hcCA9IHJlcXVpcmUoJy4vX01hcCcpLFxuICAgIE1hcENhY2hlID0gcmVxdWlyZSgnLi9fTWFwQ2FjaGUnKTtcblxuLyoqIFVzZWQgYXMgdGhlIHNpemUgdG8gZW5hYmxlIGxhcmdlIGFycmF5IG9wdGltaXphdGlvbnMuICovXG52YXIgTEFSR0VfQVJSQVlfU0laRSA9IDIwMDtcblxuLyoqXG4gKiBTZXRzIHRoZSBzdGFjayBga2V5YCB0byBgdmFsdWVgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBzZXRcbiAqIEBtZW1iZXJPZiBTdGFja1xuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBzdGFjayBjYWNoZSBpbnN0YW5jZS5cbiAqL1xuZnVuY3Rpb24gc3RhY2tTZXQoa2V5LCB2YWx1ZSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX187XG4gIGlmIChkYXRhIGluc3RhbmNlb2YgTGlzdENhY2hlKSB7XG4gICAgdmFyIHBhaXJzID0gZGF0YS5fX2RhdGFfXztcbiAgICBpZiAoIU1hcCB8fCAocGFpcnMubGVuZ3RoIDwgTEFSR0VfQVJSQVlfU0laRSAtIDEpKSB7XG4gICAgICBwYWlycy5wdXNoKFtrZXksIHZhbHVlXSk7XG4gICAgICB0aGlzLnNpemUgPSArK2RhdGEuc2l6ZTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBkYXRhID0gdGhpcy5fX2RhdGFfXyA9IG5ldyBNYXBDYWNoZShwYWlycyk7XG4gIH1cbiAgZGF0YS5zZXQoa2V5LCB2YWx1ZSk7XG4gIHRoaXMuc2l6ZSA9IGRhdGEuc2l6ZTtcbiAgcmV0dXJuIHRoaXM7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3RhY2tTZXQ7XG4iLCIvKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgZnVuY1Byb3RvID0gRnVuY3Rpb24ucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byByZXNvbHZlIHRoZSBkZWNvbXBpbGVkIHNvdXJjZSBvZiBmdW5jdGlvbnMuICovXG52YXIgZnVuY1RvU3RyaW5nID0gZnVuY1Byb3RvLnRvU3RyaW5nO1xuXG4vKipcbiAqIENvbnZlcnRzIGBmdW5jYCB0byBpdHMgc291cmNlIGNvZGUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIHByb2Nlc3MuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBzb3VyY2UgY29kZS5cbiAqL1xuZnVuY3Rpb24gdG9Tb3VyY2UoZnVuYykge1xuICBpZiAoZnVuYyAhPSBudWxsKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBmdW5jVG9TdHJpbmcuY2FsbChmdW5jKTtcbiAgICB9IGNhdGNoIChlKSB7fVxuICAgIHRyeSB7XG4gICAgICByZXR1cm4gKGZ1bmMgKyAnJyk7XG4gICAgfSBjYXRjaCAoZSkge31cbiAgfVxuICByZXR1cm4gJyc7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdG9Tb3VyY2U7XG4iLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL2lzT2JqZWN0JyksXG4gICAgbm93ID0gcmVxdWlyZSgnLi9ub3cnKSxcbiAgICB0b051bWJlciA9IHJlcXVpcmUoJy4vdG9OdW1iZXInKTtcblxuLyoqIEVycm9yIG1lc3NhZ2UgY29uc3RhbnRzLiAqL1xudmFyIEZVTkNfRVJST1JfVEVYVCA9ICdFeHBlY3RlZCBhIGZ1bmN0aW9uJztcblxuLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgZm9yIHRob3NlIHdpdGggdGhlIHNhbWUgbmFtZSBhcyBvdGhlciBgbG9kYXNoYCBtZXRob2RzLiAqL1xudmFyIG5hdGl2ZU1heCA9IE1hdGgubWF4LFxuICAgIG5hdGl2ZU1pbiA9IE1hdGgubWluO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBkZWJvdW5jZWQgZnVuY3Rpb24gdGhhdCBkZWxheXMgaW52b2tpbmcgYGZ1bmNgIHVudGlsIGFmdGVyIGB3YWl0YFxuICogbWlsbGlzZWNvbmRzIGhhdmUgZWxhcHNlZCBzaW5jZSB0aGUgbGFzdCB0aW1lIHRoZSBkZWJvdW5jZWQgZnVuY3Rpb24gd2FzXG4gKiBpbnZva2VkLiBUaGUgZGVib3VuY2VkIGZ1bmN0aW9uIGNvbWVzIHdpdGggYSBgY2FuY2VsYCBtZXRob2QgdG8gY2FuY2VsXG4gKiBkZWxheWVkIGBmdW5jYCBpbnZvY2F0aW9ucyBhbmQgYSBgZmx1c2hgIG1ldGhvZCB0byBpbW1lZGlhdGVseSBpbnZva2UgdGhlbS5cbiAqIFByb3ZpZGUgYG9wdGlvbnNgIHRvIGluZGljYXRlIHdoZXRoZXIgYGZ1bmNgIHNob3VsZCBiZSBpbnZva2VkIG9uIHRoZVxuICogbGVhZGluZyBhbmQvb3IgdHJhaWxpbmcgZWRnZSBvZiB0aGUgYHdhaXRgIHRpbWVvdXQuIFRoZSBgZnVuY2AgaXMgaW52b2tlZFxuICogd2l0aCB0aGUgbGFzdCBhcmd1bWVudHMgcHJvdmlkZWQgdG8gdGhlIGRlYm91bmNlZCBmdW5jdGlvbi4gU3Vic2VxdWVudFxuICogY2FsbHMgdG8gdGhlIGRlYm91bmNlZCBmdW5jdGlvbiByZXR1cm4gdGhlIHJlc3VsdCBvZiB0aGUgbGFzdCBgZnVuY2BcbiAqIGludm9jYXRpb24uXG4gKlxuICogKipOb3RlOioqIElmIGBsZWFkaW5nYCBhbmQgYHRyYWlsaW5nYCBvcHRpb25zIGFyZSBgdHJ1ZWAsIGBmdW5jYCBpc1xuICogaW52b2tlZCBvbiB0aGUgdHJhaWxpbmcgZWRnZSBvZiB0aGUgdGltZW91dCBvbmx5IGlmIHRoZSBkZWJvdW5jZWQgZnVuY3Rpb25cbiAqIGlzIGludm9rZWQgbW9yZSB0aGFuIG9uY2UgZHVyaW5nIHRoZSBgd2FpdGAgdGltZW91dC5cbiAqXG4gKiBJZiBgd2FpdGAgaXMgYDBgIGFuZCBgbGVhZGluZ2AgaXMgYGZhbHNlYCwgYGZ1bmNgIGludm9jYXRpb24gaXMgZGVmZXJyZWRcbiAqIHVudGlsIHRvIHRoZSBuZXh0IHRpY2ssIHNpbWlsYXIgdG8gYHNldFRpbWVvdXRgIHdpdGggYSB0aW1lb3V0IG9mIGAwYC5cbiAqXG4gKiBTZWUgW0RhdmlkIENvcmJhY2hvJ3MgYXJ0aWNsZV0oaHR0cHM6Ly9jc3MtdHJpY2tzLmNvbS9kZWJvdW5jaW5nLXRocm90dGxpbmctZXhwbGFpbmVkLWV4YW1wbGVzLylcbiAqIGZvciBkZXRhaWxzIG92ZXIgdGhlIGRpZmZlcmVuY2VzIGJldHdlZW4gYF8uZGVib3VuY2VgIGFuZCBgXy50aHJvdHRsZWAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBkZWJvdW5jZS5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbd2FpdD0wXSBUaGUgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyB0byBkZWxheS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucz17fV0gVGhlIG9wdGlvbnMgb2JqZWN0LlxuICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5sZWFkaW5nPWZhbHNlXVxuICogIFNwZWNpZnkgaW52b2tpbmcgb24gdGhlIGxlYWRpbmcgZWRnZSBvZiB0aGUgdGltZW91dC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0aW9ucy5tYXhXYWl0XVxuICogIFRoZSBtYXhpbXVtIHRpbWUgYGZ1bmNgIGlzIGFsbG93ZWQgdG8gYmUgZGVsYXllZCBiZWZvcmUgaXQncyBpbnZva2VkLlxuICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy50cmFpbGluZz10cnVlXVxuICogIFNwZWNpZnkgaW52b2tpbmcgb24gdGhlIHRyYWlsaW5nIGVkZ2Ugb2YgdGhlIHRpbWVvdXQuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBkZWJvdW5jZWQgZnVuY3Rpb24uXG4gKiBAZXhhbXBsZVxuICpcbiAqIC8vIEF2b2lkIGNvc3RseSBjYWxjdWxhdGlvbnMgd2hpbGUgdGhlIHdpbmRvdyBzaXplIGlzIGluIGZsdXguXG4gKiBqUXVlcnkod2luZG93KS5vbigncmVzaXplJywgXy5kZWJvdW5jZShjYWxjdWxhdGVMYXlvdXQsIDE1MCkpO1xuICpcbiAqIC8vIEludm9rZSBgc2VuZE1haWxgIHdoZW4gY2xpY2tlZCwgZGVib3VuY2luZyBzdWJzZXF1ZW50IGNhbGxzLlxuICogalF1ZXJ5KGVsZW1lbnQpLm9uKCdjbGljaycsIF8uZGVib3VuY2Uoc2VuZE1haWwsIDMwMCwge1xuICogICAnbGVhZGluZyc6IHRydWUsXG4gKiAgICd0cmFpbGluZyc6IGZhbHNlXG4gKiB9KSk7XG4gKlxuICogLy8gRW5zdXJlIGBiYXRjaExvZ2AgaXMgaW52b2tlZCBvbmNlIGFmdGVyIDEgc2Vjb25kIG9mIGRlYm91bmNlZCBjYWxscy5cbiAqIHZhciBkZWJvdW5jZWQgPSBfLmRlYm91bmNlKGJhdGNoTG9nLCAyNTAsIHsgJ21heFdhaXQnOiAxMDAwIH0pO1xuICogdmFyIHNvdXJjZSA9IG5ldyBFdmVudFNvdXJjZSgnL3N0cmVhbScpO1xuICogalF1ZXJ5KHNvdXJjZSkub24oJ21lc3NhZ2UnLCBkZWJvdW5jZWQpO1xuICpcbiAqIC8vIENhbmNlbCB0aGUgdHJhaWxpbmcgZGVib3VuY2VkIGludm9jYXRpb24uXG4gKiBqUXVlcnkod2luZG93KS5vbigncG9wc3RhdGUnLCBkZWJvdW5jZWQuY2FuY2VsKTtcbiAqL1xuZnVuY3Rpb24gZGVib3VuY2UoZnVuYywgd2FpdCwgb3B0aW9ucykge1xuICB2YXIgbGFzdEFyZ3MsXG4gICAgICBsYXN0VGhpcyxcbiAgICAgIG1heFdhaXQsXG4gICAgICByZXN1bHQsXG4gICAgICB0aW1lcklkLFxuICAgICAgbGFzdENhbGxUaW1lLFxuICAgICAgbGFzdEludm9rZVRpbWUgPSAwLFxuICAgICAgbGVhZGluZyA9IGZhbHNlLFxuICAgICAgbWF4aW5nID0gZmFsc2UsXG4gICAgICB0cmFpbGluZyA9IHRydWU7XG5cbiAgaWYgKHR5cGVvZiBmdW5jICE9ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKEZVTkNfRVJST1JfVEVYVCk7XG4gIH1cbiAgd2FpdCA9IHRvTnVtYmVyKHdhaXQpIHx8IDA7XG4gIGlmIChpc09iamVjdChvcHRpb25zKSkge1xuICAgIGxlYWRpbmcgPSAhIW9wdGlvbnMubGVhZGluZztcbiAgICBtYXhpbmcgPSAnbWF4V2FpdCcgaW4gb3B0aW9ucztcbiAgICBtYXhXYWl0ID0gbWF4aW5nID8gbmF0aXZlTWF4KHRvTnVtYmVyKG9wdGlvbnMubWF4V2FpdCkgfHwgMCwgd2FpdCkgOiBtYXhXYWl0O1xuICAgIHRyYWlsaW5nID0gJ3RyYWlsaW5nJyBpbiBvcHRpb25zID8gISFvcHRpb25zLnRyYWlsaW5nIDogdHJhaWxpbmc7XG4gIH1cblxuICBmdW5jdGlvbiBpbnZva2VGdW5jKHRpbWUpIHtcbiAgICB2YXIgYXJncyA9IGxhc3RBcmdzLFxuICAgICAgICB0aGlzQXJnID0gbGFzdFRoaXM7XG5cbiAgICBsYXN0QXJncyA9IGxhc3RUaGlzID0gdW5kZWZpbmVkO1xuICAgIGxhc3RJbnZva2VUaW1lID0gdGltZTtcbiAgICByZXN1bHQgPSBmdW5jLmFwcGx5KHRoaXNBcmcsIGFyZ3MpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBmdW5jdGlvbiBsZWFkaW5nRWRnZSh0aW1lKSB7XG4gICAgLy8gUmVzZXQgYW55IGBtYXhXYWl0YCB0aW1lci5cbiAgICBsYXN0SW52b2tlVGltZSA9IHRpbWU7XG4gICAgLy8gU3RhcnQgdGhlIHRpbWVyIGZvciB0aGUgdHJhaWxpbmcgZWRnZS5cbiAgICB0aW1lcklkID0gc2V0VGltZW91dCh0aW1lckV4cGlyZWQsIHdhaXQpO1xuICAgIC8vIEludm9rZSB0aGUgbGVhZGluZyBlZGdlLlxuICAgIHJldHVybiBsZWFkaW5nID8gaW52b2tlRnVuYyh0aW1lKSA6IHJlc3VsdDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbWFpbmluZ1dhaXQodGltZSkge1xuICAgIHZhciB0aW1lU2luY2VMYXN0Q2FsbCA9IHRpbWUgLSBsYXN0Q2FsbFRpbWUsXG4gICAgICAgIHRpbWVTaW5jZUxhc3RJbnZva2UgPSB0aW1lIC0gbGFzdEludm9rZVRpbWUsXG4gICAgICAgIHJlc3VsdCA9IHdhaXQgLSB0aW1lU2luY2VMYXN0Q2FsbDtcblxuICAgIHJldHVybiBtYXhpbmcgPyBuYXRpdmVNaW4ocmVzdWx0LCBtYXhXYWl0IC0gdGltZVNpbmNlTGFzdEludm9rZSkgOiByZXN1bHQ7XG4gIH1cblxuICBmdW5jdGlvbiBzaG91bGRJbnZva2UodGltZSkge1xuICAgIHZhciB0aW1lU2luY2VMYXN0Q2FsbCA9IHRpbWUgLSBsYXN0Q2FsbFRpbWUsXG4gICAgICAgIHRpbWVTaW5jZUxhc3RJbnZva2UgPSB0aW1lIC0gbGFzdEludm9rZVRpbWU7XG5cbiAgICAvLyBFaXRoZXIgdGhpcyBpcyB0aGUgZmlyc3QgY2FsbCwgYWN0aXZpdHkgaGFzIHN0b3BwZWQgYW5kIHdlJ3JlIGF0IHRoZVxuICAgIC8vIHRyYWlsaW5nIGVkZ2UsIHRoZSBzeXN0ZW0gdGltZSBoYXMgZ29uZSBiYWNrd2FyZHMgYW5kIHdlJ3JlIHRyZWF0aW5nXG4gICAgLy8gaXQgYXMgdGhlIHRyYWlsaW5nIGVkZ2UsIG9yIHdlJ3ZlIGhpdCB0aGUgYG1heFdhaXRgIGxpbWl0LlxuICAgIHJldHVybiAobGFzdENhbGxUaW1lID09PSB1bmRlZmluZWQgfHwgKHRpbWVTaW5jZUxhc3RDYWxsID49IHdhaXQpIHx8XG4gICAgICAodGltZVNpbmNlTGFzdENhbGwgPCAwKSB8fCAobWF4aW5nICYmIHRpbWVTaW5jZUxhc3RJbnZva2UgPj0gbWF4V2FpdCkpO1xuICB9XG5cbiAgZnVuY3Rpb24gdGltZXJFeHBpcmVkKCkge1xuICAgIHZhciB0aW1lID0gbm93KCk7XG4gICAgaWYgKHNob3VsZEludm9rZSh0aW1lKSkge1xuICAgICAgcmV0dXJuIHRyYWlsaW5nRWRnZSh0aW1lKTtcbiAgICB9XG4gICAgLy8gUmVzdGFydCB0aGUgdGltZXIuXG4gICAgdGltZXJJZCA9IHNldFRpbWVvdXQodGltZXJFeHBpcmVkLCByZW1haW5pbmdXYWl0KHRpbWUpKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHRyYWlsaW5nRWRnZSh0aW1lKSB7XG4gICAgdGltZXJJZCA9IHVuZGVmaW5lZDtcblxuICAgIC8vIE9ubHkgaW52b2tlIGlmIHdlIGhhdmUgYGxhc3RBcmdzYCB3aGljaCBtZWFucyBgZnVuY2AgaGFzIGJlZW5cbiAgICAvLyBkZWJvdW5jZWQgYXQgbGVhc3Qgb25jZS5cbiAgICBpZiAodHJhaWxpbmcgJiYgbGFzdEFyZ3MpIHtcbiAgICAgIHJldHVybiBpbnZva2VGdW5jKHRpbWUpO1xuICAgIH1cbiAgICBsYXN0QXJncyA9IGxhc3RUaGlzID0gdW5kZWZpbmVkO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBmdW5jdGlvbiBjYW5jZWwoKSB7XG4gICAgaWYgKHRpbWVySWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgY2xlYXJUaW1lb3V0KHRpbWVySWQpO1xuICAgIH1cbiAgICBsYXN0SW52b2tlVGltZSA9IDA7XG4gICAgbGFzdEFyZ3MgPSBsYXN0Q2FsbFRpbWUgPSBsYXN0VGhpcyA9IHRpbWVySWQgPSB1bmRlZmluZWQ7XG4gIH1cblxuICBmdW5jdGlvbiBmbHVzaCgpIHtcbiAgICByZXR1cm4gdGltZXJJZCA9PT0gdW5kZWZpbmVkID8gcmVzdWx0IDogdHJhaWxpbmdFZGdlKG5vdygpKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRlYm91bmNlZCgpIHtcbiAgICB2YXIgdGltZSA9IG5vdygpLFxuICAgICAgICBpc0ludm9raW5nID0gc2hvdWxkSW52b2tlKHRpbWUpO1xuXG4gICAgbGFzdEFyZ3MgPSBhcmd1bWVudHM7XG4gICAgbGFzdFRoaXMgPSB0aGlzO1xuICAgIGxhc3RDYWxsVGltZSA9IHRpbWU7XG5cbiAgICBpZiAoaXNJbnZva2luZykge1xuICAgICAgaWYgKHRpbWVySWQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gbGVhZGluZ0VkZ2UobGFzdENhbGxUaW1lKTtcbiAgICAgIH1cbiAgICAgIGlmIChtYXhpbmcpIHtcbiAgICAgICAgLy8gSGFuZGxlIGludm9jYXRpb25zIGluIGEgdGlnaHQgbG9vcC5cbiAgICAgICAgdGltZXJJZCA9IHNldFRpbWVvdXQodGltZXJFeHBpcmVkLCB3YWl0KTtcbiAgICAgICAgcmV0dXJuIGludm9rZUZ1bmMobGFzdENhbGxUaW1lKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHRpbWVySWQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGltZXJJZCA9IHNldFRpbWVvdXQodGltZXJFeHBpcmVkLCB3YWl0KTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuICBkZWJvdW5jZWQuY2FuY2VsID0gY2FuY2VsO1xuICBkZWJvdW5jZWQuZmx1c2ggPSBmbHVzaDtcbiAgcmV0dXJuIGRlYm91bmNlZDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkZWJvdW5jZTtcbiIsIi8qKlxuICogUGVyZm9ybXMgYVxuICogW2BTYW1lVmFsdWVaZXJvYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtc2FtZXZhbHVlemVybylcbiAqIGNvbXBhcmlzb24gYmV0d2VlbiB0d28gdmFsdWVzIHRvIGRldGVybWluZSBpZiB0aGV5IGFyZSBlcXVpdmFsZW50LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjb21wYXJlLlxuICogQHBhcmFtIHsqfSBvdGhlciBUaGUgb3RoZXIgdmFsdWUgdG8gY29tcGFyZS5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgdmFsdWVzIGFyZSBlcXVpdmFsZW50LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBvYmplY3QgPSB7ICdhJzogMSB9O1xuICogdmFyIG90aGVyID0geyAnYSc6IDEgfTtcbiAqXG4gKiBfLmVxKG9iamVjdCwgb2JqZWN0KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmVxKG9iamVjdCwgb3RoZXIpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmVxKCdhJywgJ2EnKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmVxKCdhJywgT2JqZWN0KCdhJykpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmVxKE5hTiwgTmFOKTtcbiAqIC8vID0+IHRydWVcbiAqL1xuZnVuY3Rpb24gZXEodmFsdWUsIG90aGVyKSB7XG4gIHJldHVybiB2YWx1ZSA9PT0gb3RoZXIgfHwgKHZhbHVlICE9PSB2YWx1ZSAmJiBvdGhlciAhPT0gb3RoZXIpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGVxO1xuIiwidmFyIGJhc2VJc0FyZ3VtZW50cyA9IHJlcXVpcmUoJy4vX2Jhc2VJc0FyZ3VtZW50cycpLFxuICAgIGlzT2JqZWN0TGlrZSA9IHJlcXVpcmUoJy4vaXNPYmplY3RMaWtlJyk7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIHByb3BlcnR5SXNFbnVtZXJhYmxlID0gb2JqZWN0UHJvdG8ucHJvcGVydHlJc0VudW1lcmFibGU7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgbGlrZWx5IGFuIGBhcmd1bWVudHNgIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBgYXJndW1lbnRzYCBvYmplY3QsXG4gKiAgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzQXJndW1lbnRzKGZ1bmN0aW9uKCkgeyByZXR1cm4gYXJndW1lbnRzOyB9KCkpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcmd1bWVudHMoWzEsIDIsIDNdKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbnZhciBpc0FyZ3VtZW50cyA9IGJhc2VJc0FyZ3VtZW50cyhmdW5jdGlvbigpIHsgcmV0dXJuIGFyZ3VtZW50czsgfSgpKSA/IGJhc2VJc0FyZ3VtZW50cyA6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gIHJldHVybiBpc09iamVjdExpa2UodmFsdWUpICYmIGhhc093blByb3BlcnR5LmNhbGwodmFsdWUsICdjYWxsZWUnKSAmJlxuICAgICFwcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHZhbHVlLCAnY2FsbGVlJyk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGlzQXJndW1lbnRzO1xuIiwiLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGFuIGBBcnJheWAgb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIGFycmF5LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNBcnJheShbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheShkb2N1bWVudC5ib2R5LmNoaWxkcmVuKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0FycmF5KCdhYmMnKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0FycmF5KF8ubm9vcCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG52YXIgaXNBcnJheSA9IEFycmF5LmlzQXJyYXk7XG5cbm1vZHVsZS5leHBvcnRzID0gaXNBcnJheTtcbiIsInZhciBpc0Z1bmN0aW9uID0gcmVxdWlyZSgnLi9pc0Z1bmN0aW9uJyksXG4gICAgaXNMZW5ndGggPSByZXF1aXJlKCcuL2lzTGVuZ3RoJyk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYXJyYXktbGlrZS4gQSB2YWx1ZSBpcyBjb25zaWRlcmVkIGFycmF5LWxpa2UgaWYgaXQnc1xuICogbm90IGEgZnVuY3Rpb24gYW5kIGhhcyBhIGB2YWx1ZS5sZW5ndGhgIHRoYXQncyBhbiBpbnRlZ2VyIGdyZWF0ZXIgdGhhbiBvclxuICogZXF1YWwgdG8gYDBgIGFuZCBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gYE51bWJlci5NQVhfU0FGRV9JTlRFR0VSYC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhcnJheS1saWtlLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNBcnJheUxpa2UoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlKGRvY3VtZW50LmJvZHkuY2hpbGRyZW4pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheUxpa2UoJ2FiYycpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheUxpa2UoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXlMaWtlKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSAhPSBudWxsICYmIGlzTGVuZ3RoKHZhbHVlLmxlbmd0aCkgJiYgIWlzRnVuY3Rpb24odmFsdWUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzQXJyYXlMaWtlO1xuIiwidmFyIHJvb3QgPSByZXF1aXJlKCcuL19yb290JyksXG4gICAgc3R1YkZhbHNlID0gcmVxdWlyZSgnLi9zdHViRmFsc2UnKTtcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBleHBvcnRzYC4gKi9cbnZhciBmcmVlRXhwb3J0cyA9IHR5cGVvZiBleHBvcnRzID09ICdvYmplY3QnICYmIGV4cG9ydHMgJiYgIWV4cG9ydHMubm9kZVR5cGUgJiYgZXhwb3J0cztcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBtb2R1bGVgLiAqL1xudmFyIGZyZWVNb2R1bGUgPSBmcmVlRXhwb3J0cyAmJiB0eXBlb2YgbW9kdWxlID09ICdvYmplY3QnICYmIG1vZHVsZSAmJiAhbW9kdWxlLm5vZGVUeXBlICYmIG1vZHVsZTtcblxuLyoqIERldGVjdCB0aGUgcG9wdWxhciBDb21tb25KUyBleHRlbnNpb24gYG1vZHVsZS5leHBvcnRzYC4gKi9cbnZhciBtb2R1bGVFeHBvcnRzID0gZnJlZU1vZHVsZSAmJiBmcmVlTW9kdWxlLmV4cG9ydHMgPT09IGZyZWVFeHBvcnRzO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBCdWZmZXIgPSBtb2R1bGVFeHBvcnRzID8gcm9vdC5CdWZmZXIgOiB1bmRlZmluZWQ7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIGZvciB0aG9zZSB3aXRoIHRoZSBzYW1lIG5hbWUgYXMgb3RoZXIgYGxvZGFzaGAgbWV0aG9kcy4gKi9cbnZhciBuYXRpdmVJc0J1ZmZlciA9IEJ1ZmZlciA/IEJ1ZmZlci5pc0J1ZmZlciA6IHVuZGVmaW5lZDtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIGJ1ZmZlci5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMy4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIGJ1ZmZlciwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzQnVmZmVyKG5ldyBCdWZmZXIoMikpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNCdWZmZXIobmV3IFVpbnQ4QXJyYXkoMikpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xudmFyIGlzQnVmZmVyID0gbmF0aXZlSXNCdWZmZXIgfHwgc3R1YkZhbHNlO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGlzQnVmZmVyO1xuIiwidmFyIGJhc2VJc0VxdWFsID0gcmVxdWlyZSgnLi9fYmFzZUlzRXF1YWwnKTtcblxuLyoqXG4gKiBQZXJmb3JtcyBhIGRlZXAgY29tcGFyaXNvbiBiZXR3ZWVuIHR3byB2YWx1ZXMgdG8gZGV0ZXJtaW5lIGlmIHRoZXkgYXJlXG4gKiBlcXVpdmFsZW50LlxuICpcbiAqICoqTm90ZToqKiBUaGlzIG1ldGhvZCBzdXBwb3J0cyBjb21wYXJpbmcgYXJyYXlzLCBhcnJheSBidWZmZXJzLCBib29sZWFucyxcbiAqIGRhdGUgb2JqZWN0cywgZXJyb3Igb2JqZWN0cywgbWFwcywgbnVtYmVycywgYE9iamVjdGAgb2JqZWN0cywgcmVnZXhlcyxcbiAqIHNldHMsIHN0cmluZ3MsIHN5bWJvbHMsIGFuZCB0eXBlZCBhcnJheXMuIGBPYmplY3RgIG9iamVjdHMgYXJlIGNvbXBhcmVkXG4gKiBieSB0aGVpciBvd24sIG5vdCBpbmhlcml0ZWQsIGVudW1lcmFibGUgcHJvcGVydGllcy4gRnVuY3Rpb25zIGFuZCBET01cbiAqIG5vZGVzIGFyZSAqKm5vdCoqIHN1cHBvcnRlZC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7Kn0gb3RoZXIgVGhlIG90aGVyIHZhbHVlIHRvIGNvbXBhcmUuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIHZhbHVlcyBhcmUgZXF1aXZhbGVudCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgb2JqZWN0ID0geyAnYSc6IDEgfTtcbiAqIHZhciBvdGhlciA9IHsgJ2EnOiAxIH07XG4gKlxuICogXy5pc0VxdWFsKG9iamVjdCwgb3RoZXIpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIG9iamVjdCA9PT0gb3RoZXI7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0VxdWFsKHZhbHVlLCBvdGhlcikge1xuICByZXR1cm4gYmFzZUlzRXF1YWwodmFsdWUsIG90aGVyKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc0VxdWFsO1xuIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9pc09iamVjdCcpO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgZnVuY1RhZyA9ICdbb2JqZWN0IEZ1bmN0aW9uXScsXG4gICAgZ2VuVGFnID0gJ1tvYmplY3QgR2VuZXJhdG9yRnVuY3Rpb25dJyxcbiAgICBwcm94eVRhZyA9ICdbb2JqZWN0IFByb3h5XSc7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZVxuICogW2B0b1N0cmluZ1RhZ2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBvYmplY3RUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYSBgRnVuY3Rpb25gIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIGZ1bmN0aW9uLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNGdW5jdGlvbihfKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzRnVuY3Rpb24oL2FiYy8pO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNGdW5jdGlvbih2YWx1ZSkge1xuICAvLyBUaGUgdXNlIG9mIGBPYmplY3QjdG9TdHJpbmdgIGF2b2lkcyBpc3N1ZXMgd2l0aCB0aGUgYHR5cGVvZmAgb3BlcmF0b3JcbiAgLy8gaW4gU2FmYXJpIDkgd2hpY2ggcmV0dXJucyAnb2JqZWN0JyBmb3IgdHlwZWQgYXJyYXkgYW5kIG90aGVyIGNvbnN0cnVjdG9ycy5cbiAgdmFyIHRhZyA9IGlzT2JqZWN0KHZhbHVlKSA/IG9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpIDogJyc7XG4gIHJldHVybiB0YWcgPT0gZnVuY1RhZyB8fCB0YWcgPT0gZ2VuVGFnIHx8IHRhZyA9PSBwcm94eVRhZztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc0Z1bmN0aW9uO1xuIiwiLyoqIFVzZWQgYXMgcmVmZXJlbmNlcyBmb3IgdmFyaW91cyBgTnVtYmVyYCBjb25zdGFudHMuICovXG52YXIgTUFYX1NBRkVfSU5URUdFUiA9IDkwMDcxOTkyNTQ3NDA5OTE7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBhcnJheS1saWtlIGxlbmd0aC5cbiAqXG4gKiAqKk5vdGU6KiogVGhpcyBtZXRob2QgaXMgbG9vc2VseSBiYXNlZCBvblxuICogW2BUb0xlbmd0aGBdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLXRvbGVuZ3RoKS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGxlbmd0aCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzTGVuZ3RoKDMpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNMZW5ndGgoTnVtYmVyLk1JTl9WQUxVRSk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNMZW5ndGgoSW5maW5pdHkpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzTGVuZ3RoKCczJyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0xlbmd0aCh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09ICdudW1iZXInICYmXG4gICAgdmFsdWUgPiAtMSAmJiB2YWx1ZSAlIDEgPT0gMCAmJiB2YWx1ZSA8PSBNQVhfU0FGRV9JTlRFR0VSO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzTGVuZ3RoO1xuIiwiLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyB0aGVcbiAqIFtsYW5ndWFnZSB0eXBlXShodHRwOi8vd3d3LmVjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtZWNtYXNjcmlwdC1sYW5ndWFnZS10eXBlcylcbiAqIG9mIGBPYmplY3RgLiAoZS5nLiBhcnJheXMsIGZ1bmN0aW9ucywgb2JqZWN0cywgcmVnZXhlcywgYG5ldyBOdW1iZXIoMClgLCBhbmQgYG5ldyBTdHJpbmcoJycpYClcbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBvYmplY3QsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdCh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoXy5ub29wKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KG51bGwpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3QodmFsdWUpIHtcbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsdWU7XG4gIHJldHVybiB2YWx1ZSAhPSBudWxsICYmICh0eXBlID09ICdvYmplY3QnIHx8IHR5cGUgPT0gJ2Z1bmN0aW9uJyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNPYmplY3Q7XG4iLCIvKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLiBBIHZhbHVlIGlzIG9iamVjdC1saWtlIGlmIGl0J3Mgbm90IGBudWxsYFxuICogYW5kIGhhcyBhIGB0eXBlb2ZgIHJlc3VsdCBvZiBcIm9iamVjdFwiLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKF8ubm9vcCk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKG51bGwpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3RMaWtlKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSAhPSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PSAnb2JqZWN0Jztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc09iamVjdExpa2U7XG4iLCJ2YXIgaXNPYmplY3RMaWtlID0gcmVxdWlyZSgnLi9pc09iamVjdExpa2UnKTtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIHN5bWJvbFRhZyA9ICdbb2JqZWN0IFN5bWJvbF0nO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGVcbiAqIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgb2JqZWN0VG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGEgYFN5bWJvbGAgcHJpbWl0aXZlIG9yIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHN5bWJvbCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzU3ltYm9sKFN5bWJvbC5pdGVyYXRvcik7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc1N5bWJvbCgnYWJjJyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1N5bWJvbCh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09ICdzeW1ib2wnIHx8XG4gICAgKGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgb2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT0gc3ltYm9sVGFnKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc1N5bWJvbDtcbiIsInZhciBiYXNlSXNUeXBlZEFycmF5ID0gcmVxdWlyZSgnLi9fYmFzZUlzVHlwZWRBcnJheScpLFxuICAgIGJhc2VVbmFyeSA9IHJlcXVpcmUoJy4vX2Jhc2VVbmFyeScpLFxuICAgIG5vZGVVdGlsID0gcmVxdWlyZSgnLi9fbm9kZVV0aWwnKTtcblxuLyogTm9kZS5qcyBoZWxwZXIgcmVmZXJlbmNlcy4gKi9cbnZhciBub2RlSXNUeXBlZEFycmF5ID0gbm9kZVV0aWwgJiYgbm9kZVV0aWwuaXNUeXBlZEFycmF5O1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYSB0eXBlZCBhcnJheS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDMuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHR5cGVkIGFycmF5LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNUeXBlZEFycmF5KG5ldyBVaW50OEFycmF5KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzVHlwZWRBcnJheShbXSk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG52YXIgaXNUeXBlZEFycmF5ID0gbm9kZUlzVHlwZWRBcnJheSA/IGJhc2VVbmFyeShub2RlSXNUeXBlZEFycmF5KSA6IGJhc2VJc1R5cGVkQXJyYXk7XG5cbm1vZHVsZS5leHBvcnRzID0gaXNUeXBlZEFycmF5O1xuIiwidmFyIGFycmF5TGlrZUtleXMgPSByZXF1aXJlKCcuL19hcnJheUxpa2VLZXlzJyksXG4gICAgYmFzZUtleXMgPSByZXF1aXJlKCcuL19iYXNlS2V5cycpLFxuICAgIGlzQXJyYXlMaWtlID0gcmVxdWlyZSgnLi9pc0FycmF5TGlrZScpO1xuXG4vKipcbiAqIENyZWF0ZXMgYW4gYXJyYXkgb2YgdGhlIG93biBlbnVtZXJhYmxlIHByb3BlcnR5IG5hbWVzIG9mIGBvYmplY3RgLlxuICpcbiAqICoqTm90ZToqKiBOb24tb2JqZWN0IHZhbHVlcyBhcmUgY29lcmNlZCB0byBvYmplY3RzLiBTZWUgdGhlXG4gKiBbRVMgc3BlY10oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtb2JqZWN0LmtleXMpXG4gKiBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBzaW5jZSAwLjEuMFxuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMuXG4gKiBAZXhhbXBsZVxuICpcbiAqIGZ1bmN0aW9uIEZvbygpIHtcbiAqICAgdGhpcy5hID0gMTtcbiAqICAgdGhpcy5iID0gMjtcbiAqIH1cbiAqXG4gKiBGb28ucHJvdG90eXBlLmMgPSAzO1xuICpcbiAqIF8ua2V5cyhuZXcgRm9vKTtcbiAqIC8vID0+IFsnYScsICdiJ10gKGl0ZXJhdGlvbiBvcmRlciBpcyBub3QgZ3VhcmFudGVlZClcbiAqXG4gKiBfLmtleXMoJ2hpJyk7XG4gKiAvLyA9PiBbJzAnLCAnMSddXG4gKi9cbmZ1bmN0aW9uIGtleXMob2JqZWN0KSB7XG4gIHJldHVybiBpc0FycmF5TGlrZShvYmplY3QpID8gYXJyYXlMaWtlS2V5cyhvYmplY3QpIDogYmFzZUtleXMob2JqZWN0KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBrZXlzO1xuIiwidmFyIHJvb3QgPSByZXF1aXJlKCcuL19yb290Jyk7XG5cbi8qKlxuICogR2V0cyB0aGUgdGltZXN0YW1wIG9mIHRoZSBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIHRoYXQgaGF2ZSBlbGFwc2VkIHNpbmNlXG4gKiB0aGUgVW5peCBlcG9jaCAoMSBKYW51YXJ5IDE5NzAgMDA6MDA6MDAgVVRDKS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDIuNC4wXG4gKiBAY2F0ZWdvcnkgRGF0ZVxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgdGltZXN0YW1wLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmRlZmVyKGZ1bmN0aW9uKHN0YW1wKSB7XG4gKiAgIGNvbnNvbGUubG9nKF8ubm93KCkgLSBzdGFtcCk7XG4gKiB9LCBfLm5vdygpKTtcbiAqIC8vID0+IExvZ3MgdGhlIG51bWJlciBvZiBtaWxsaXNlY29uZHMgaXQgdG9vayBmb3IgdGhlIGRlZmVycmVkIGludm9jYXRpb24uXG4gKi9cbnZhciBub3cgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHJvb3QuRGF0ZS5ub3coKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gbm93O1xuIiwiLyoqXG4gKiBUaGlzIG1ldGhvZCByZXR1cm5zIGBmYWxzZWAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjEzLjBcbiAqIEBjYXRlZ29yeSBVdGlsXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLnRpbWVzKDIsIF8uc3R1YkZhbHNlKTtcbiAqIC8vID0+IFtmYWxzZSwgZmFsc2VdXG4gKi9cbmZ1bmN0aW9uIHN0dWJGYWxzZSgpIHtcbiAgcmV0dXJuIGZhbHNlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN0dWJGYWxzZTtcbiIsInZhciBkZWJvdW5jZSA9IHJlcXVpcmUoJy4vZGVib3VuY2UnKSxcbiAgICBpc09iamVjdCA9IHJlcXVpcmUoJy4vaXNPYmplY3QnKTtcblxuLyoqIEVycm9yIG1lc3NhZ2UgY29uc3RhbnRzLiAqL1xudmFyIEZVTkNfRVJST1JfVEVYVCA9ICdFeHBlY3RlZCBhIGZ1bmN0aW9uJztcblxuLyoqXG4gKiBDcmVhdGVzIGEgdGhyb3R0bGVkIGZ1bmN0aW9uIHRoYXQgb25seSBpbnZva2VzIGBmdW5jYCBhdCBtb3N0IG9uY2UgcGVyXG4gKiBldmVyeSBgd2FpdGAgbWlsbGlzZWNvbmRzLiBUaGUgdGhyb3R0bGVkIGZ1bmN0aW9uIGNvbWVzIHdpdGggYSBgY2FuY2VsYFxuICogbWV0aG9kIHRvIGNhbmNlbCBkZWxheWVkIGBmdW5jYCBpbnZvY2F0aW9ucyBhbmQgYSBgZmx1c2hgIG1ldGhvZCB0b1xuICogaW1tZWRpYXRlbHkgaW52b2tlIHRoZW0uIFByb3ZpZGUgYG9wdGlvbnNgIHRvIGluZGljYXRlIHdoZXRoZXIgYGZ1bmNgXG4gKiBzaG91bGQgYmUgaW52b2tlZCBvbiB0aGUgbGVhZGluZyBhbmQvb3IgdHJhaWxpbmcgZWRnZSBvZiB0aGUgYHdhaXRgXG4gKiB0aW1lb3V0LiBUaGUgYGZ1bmNgIGlzIGludm9rZWQgd2l0aCB0aGUgbGFzdCBhcmd1bWVudHMgcHJvdmlkZWQgdG8gdGhlXG4gKiB0aHJvdHRsZWQgZnVuY3Rpb24uIFN1YnNlcXVlbnQgY2FsbHMgdG8gdGhlIHRocm90dGxlZCBmdW5jdGlvbiByZXR1cm4gdGhlXG4gKiByZXN1bHQgb2YgdGhlIGxhc3QgYGZ1bmNgIGludm9jYXRpb24uXG4gKlxuICogKipOb3RlOioqIElmIGBsZWFkaW5nYCBhbmQgYHRyYWlsaW5nYCBvcHRpb25zIGFyZSBgdHJ1ZWAsIGBmdW5jYCBpc1xuICogaW52b2tlZCBvbiB0aGUgdHJhaWxpbmcgZWRnZSBvZiB0aGUgdGltZW91dCBvbmx5IGlmIHRoZSB0aHJvdHRsZWQgZnVuY3Rpb25cbiAqIGlzIGludm9rZWQgbW9yZSB0aGFuIG9uY2UgZHVyaW5nIHRoZSBgd2FpdGAgdGltZW91dC5cbiAqXG4gKiBJZiBgd2FpdGAgaXMgYDBgIGFuZCBgbGVhZGluZ2AgaXMgYGZhbHNlYCwgYGZ1bmNgIGludm9jYXRpb24gaXMgZGVmZXJyZWRcbiAqIHVudGlsIHRvIHRoZSBuZXh0IHRpY2ssIHNpbWlsYXIgdG8gYHNldFRpbWVvdXRgIHdpdGggYSB0aW1lb3V0IG9mIGAwYC5cbiAqXG4gKiBTZWUgW0RhdmlkIENvcmJhY2hvJ3MgYXJ0aWNsZV0oaHR0cHM6Ly9jc3MtdHJpY2tzLmNvbS9kZWJvdW5jaW5nLXRocm90dGxpbmctZXhwbGFpbmVkLWV4YW1wbGVzLylcbiAqIGZvciBkZXRhaWxzIG92ZXIgdGhlIGRpZmZlcmVuY2VzIGJldHdlZW4gYF8udGhyb3R0bGVgIGFuZCBgXy5kZWJvdW5jZWAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byB0aHJvdHRsZS5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbd2FpdD0wXSBUaGUgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyB0byB0aHJvdHRsZSBpbnZvY2F0aW9ucyB0by5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucz17fV0gVGhlIG9wdGlvbnMgb2JqZWN0LlxuICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5sZWFkaW5nPXRydWVdXG4gKiAgU3BlY2lmeSBpbnZva2luZyBvbiB0aGUgbGVhZGluZyBlZGdlIG9mIHRoZSB0aW1lb3V0LlxuICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy50cmFpbGluZz10cnVlXVxuICogIFNwZWNpZnkgaW52b2tpbmcgb24gdGhlIHRyYWlsaW5nIGVkZ2Ugb2YgdGhlIHRpbWVvdXQuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyB0aHJvdHRsZWQgZnVuY3Rpb24uXG4gKiBAZXhhbXBsZVxuICpcbiAqIC8vIEF2b2lkIGV4Y2Vzc2l2ZWx5IHVwZGF0aW5nIHRoZSBwb3NpdGlvbiB3aGlsZSBzY3JvbGxpbmcuXG4gKiBqUXVlcnkod2luZG93KS5vbignc2Nyb2xsJywgXy50aHJvdHRsZSh1cGRhdGVQb3NpdGlvbiwgMTAwKSk7XG4gKlxuICogLy8gSW52b2tlIGByZW5ld1Rva2VuYCB3aGVuIHRoZSBjbGljayBldmVudCBpcyBmaXJlZCwgYnV0IG5vdCBtb3JlIHRoYW4gb25jZSBldmVyeSA1IG1pbnV0ZXMuXG4gKiB2YXIgdGhyb3R0bGVkID0gXy50aHJvdHRsZShyZW5ld1Rva2VuLCAzMDAwMDAsIHsgJ3RyYWlsaW5nJzogZmFsc2UgfSk7XG4gKiBqUXVlcnkoZWxlbWVudCkub24oJ2NsaWNrJywgdGhyb3R0bGVkKTtcbiAqXG4gKiAvLyBDYW5jZWwgdGhlIHRyYWlsaW5nIHRocm90dGxlZCBpbnZvY2F0aW9uLlxuICogalF1ZXJ5KHdpbmRvdykub24oJ3BvcHN0YXRlJywgdGhyb3R0bGVkLmNhbmNlbCk7XG4gKi9cbmZ1bmN0aW9uIHRocm90dGxlKGZ1bmMsIHdhaXQsIG9wdGlvbnMpIHtcbiAgdmFyIGxlYWRpbmcgPSB0cnVlLFxuICAgICAgdHJhaWxpbmcgPSB0cnVlO1xuXG4gIGlmICh0eXBlb2YgZnVuYyAhPSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihGVU5DX0VSUk9SX1RFWFQpO1xuICB9XG4gIGlmIChpc09iamVjdChvcHRpb25zKSkge1xuICAgIGxlYWRpbmcgPSAnbGVhZGluZycgaW4gb3B0aW9ucyA/ICEhb3B0aW9ucy5sZWFkaW5nIDogbGVhZGluZztcbiAgICB0cmFpbGluZyA9ICd0cmFpbGluZycgaW4gb3B0aW9ucyA/ICEhb3B0aW9ucy50cmFpbGluZyA6IHRyYWlsaW5nO1xuICB9XG4gIHJldHVybiBkZWJvdW5jZShmdW5jLCB3YWl0LCB7XG4gICAgJ2xlYWRpbmcnOiBsZWFkaW5nLFxuICAgICdtYXhXYWl0Jzogd2FpdCxcbiAgICAndHJhaWxpbmcnOiB0cmFpbGluZ1xuICB9KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB0aHJvdHRsZTtcbiIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vaXNPYmplY3QnKSxcbiAgICBpc1N5bWJvbCA9IHJlcXVpcmUoJy4vaXNTeW1ib2wnKTtcblxuLyoqIFVzZWQgYXMgcmVmZXJlbmNlcyBmb3IgdmFyaW91cyBgTnVtYmVyYCBjb25zdGFudHMuICovXG52YXIgTkFOID0gMCAvIDA7XG5cbi8qKiBVc2VkIHRvIG1hdGNoIGxlYWRpbmcgYW5kIHRyYWlsaW5nIHdoaXRlc3BhY2UuICovXG52YXIgcmVUcmltID0gL15cXHMrfFxccyskL2c7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBiYWQgc2lnbmVkIGhleGFkZWNpbWFsIHN0cmluZyB2YWx1ZXMuICovXG52YXIgcmVJc0JhZEhleCA9IC9eWy0rXTB4WzAtOWEtZl0rJC9pO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgYmluYXJ5IHN0cmluZyB2YWx1ZXMuICovXG52YXIgcmVJc0JpbmFyeSA9IC9eMGJbMDFdKyQvaTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IG9jdGFsIHN0cmluZyB2YWx1ZXMuICovXG52YXIgcmVJc09jdGFsID0gL14wb1swLTddKyQvaTtcblxuLyoqIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIHdpdGhvdXQgYSBkZXBlbmRlbmN5IG9uIGByb290YC4gKi9cbnZhciBmcmVlUGFyc2VJbnQgPSBwYXJzZUludDtcblxuLyoqXG4gKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGEgbnVtYmVyLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBwcm9jZXNzLlxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgbnVtYmVyLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLnRvTnVtYmVyKDMuMik7XG4gKiAvLyA9PiAzLjJcbiAqXG4gKiBfLnRvTnVtYmVyKE51bWJlci5NSU5fVkFMVUUpO1xuICogLy8gPT4gNWUtMzI0XG4gKlxuICogXy50b051bWJlcihJbmZpbml0eSk7XG4gKiAvLyA9PiBJbmZpbml0eVxuICpcbiAqIF8udG9OdW1iZXIoJzMuMicpO1xuICogLy8gPT4gMy4yXG4gKi9cbmZ1bmN0aW9uIHRvTnVtYmVyKHZhbHVlKSB7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT0gJ251bWJlcicpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbiAgaWYgKGlzU3ltYm9sKHZhbHVlKSkge1xuICAgIHJldHVybiBOQU47XG4gIH1cbiAgaWYgKGlzT2JqZWN0KHZhbHVlKSkge1xuICAgIHZhciBvdGhlciA9IHR5cGVvZiB2YWx1ZS52YWx1ZU9mID09ICdmdW5jdGlvbicgPyB2YWx1ZS52YWx1ZU9mKCkgOiB2YWx1ZTtcbiAgICB2YWx1ZSA9IGlzT2JqZWN0KG90aGVyKSA/IChvdGhlciArICcnKSA6IG90aGVyO1xuICB9XG4gIGlmICh0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gdmFsdWUgPT09IDAgPyB2YWx1ZSA6ICt2YWx1ZTtcbiAgfVxuICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UocmVUcmltLCAnJyk7XG4gIHZhciBpc0JpbmFyeSA9IHJlSXNCaW5hcnkudGVzdCh2YWx1ZSk7XG4gIHJldHVybiAoaXNCaW5hcnkgfHwgcmVJc09jdGFsLnRlc3QodmFsdWUpKVxuICAgID8gZnJlZVBhcnNlSW50KHZhbHVlLnNsaWNlKDIpLCBpc0JpbmFyeSA/IDIgOiA4KVxuICAgIDogKHJlSXNCYWRIZXgudGVzdCh2YWx1ZSkgPyBOQU4gOiArdmFsdWUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHRvTnVtYmVyO1xuIiwiaW1wb3J0ICd3aGF0d2ctZmV0Y2gnXG5cbmNvbnN0IHJvb3RVcmwgPSAnL2FwaS8nXG5cbmNvbnN0IGFzayA9ICh7IGRlc2MgfSkgPT4gKHtcbiAgdHlwZTogJ25vdGlmeScsXG4gIHN0YXR1czogJ3BlbmRpbmcnLFxuICBkZXNjLFxufSlcblxuY29uc3QgZXJyID0gKHsgZGVzYyB9LCBkYXRhKSA9PiAoe1xuICB0eXBlOiAnbm90aWZ5JyxcbiAgc3RhdHVzOiAnZXJyb3InLFxuICBkZXNjLFxuICBtc2dzOiBkYXRhLFxufSlcblxuY29uc3Qgc3VjY2VlZCA9ICh7IGRlc2MgfSkgPT4gKHtcbiAgdHlwZTogJ25vdGlmeScsXG4gIHN0YXR1czogJ3N1Y2Nlc3MnLFxuICBkZXNjLFxufSlcblxuZXhwb3J0IGNvbnN0IGZldGNoRGF0YSA9IHRhc2sgPT4gZGlzcGF0Y2ggPT4ge1xuICBjb25zdCB7IHR5cGUsIHBhdGgsIGNvbnRlbnRUeXBlIH0gPSB0YXNrXG4gIGRpc3BhdGNoKGFzayh0YXNrKSlcbiAgZGlzcGF0Y2goeyAuLi50YXNrLCBkYXRhOiBudWxsIH0pXG5cbiAgY29uc3Qgc2V0dGluZ3MgPSB7Y3JlZGVudGlhbHM6ICdzYW1lLW9yaWdpbid9XG4gIGZldGNoKGAke3Jvb3RVcmx9JHtjb250ZW50VHlwZX0ke3BhdGh9YCwgc2V0dGluZ3MpXG4gIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcbiAgLnRoZW4oanNvbiA9PiB7XG4gICAgY29uc3QgeyBtc2dzLCBnb29kLCBkYXRhIH0gPSBqc29uXG4gICAgaWYgKGdvb2QpIHtcbiAgICAgIGRpc3BhdGNoKHN1Y2NlZWQodGFzaykpXG4gICAgICBkaXNwYXRjaCh7IC4uLnRhc2ssIGRhdGEgfSlcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBkaXNwYXRjaChlcnIodGFzaywgbXNncykpXG4gICAgfVxuICB9KVxuICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgZGlzcGF0Y2goZXJyKHRhc2ssIFt7a2luZDogJ2Vycm9yJywgdGV4dDogZXJyb3J9XSkpXG4gIH0pXG59XG5cbiIsImV4cG9ydCBjb25zdCBnZXRXaW5EaW0gPSAoKSA9PiB7XG4gIGNvbnN0IHsgaW5uZXJIZWlnaHQ6IGhlaWdodCwgaW5uZXJXaWR0aDogd2lkdGggfSA9IHdpbmRvd1xuICByZXR1cm4geyBoZWlnaHQsIHdpZHRoIH1cbn1cblxuZXhwb3J0IGNvbnN0IHdpbkRpbSA9ICgpID0+IGRpc3BhdGNoID0+IHtcbiAgZGlzcGF0Y2goeyB0eXBlOiAnd2luZGltJywgLi4uZ2V0V2luRGltKCkgfSlcbn1cbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCB7IHJlbmRlciB9IGZyb20gJ3JlYWN0LWRvbSdcbmltcG9ydCB7IFByb3ZpZGVyIH0gZnJvbSAncmVhY3QtcmVkdXgnXG5pbXBvcnQgeyBSb3V0ZXIsIFJvdXRlLCBSZWRpcmVjdCwgSW5kZXhSb3V0ZSwgSW5kZXhSZWRpcmVjdCwgYnJvd3Nlckhpc3RvcnkgfSBmcm9tICdyZWFjdC1yb3V0ZXInXG5cbmltcG9ydCBSb290IGZyb20gJ1Jvb3QuanN4J1xuaW1wb3J0IEFwcCBmcm9tICdBcHAuanN4J1xuaW1wb3J0IFN1YkFwcCBmcm9tICdTdWJBcHAuanN4J1xuaW1wb3J0IEJhY2tvZmZpY2UgZnJvbSAnQmFja29mZmljZS5qc3gnXG5pbXBvcnQgSXRlbUZpbHRlcmVkIGZyb20gJ0l0ZW1GaWx0ZXJlZC5qc3gnXG5pbXBvcnQgSXRlbU15IGZyb20gJ0l0ZW1NeS5qc3gnXG5pbXBvcnQgSXRlbVJlY29yZFByZSBmcm9tICdJdGVtUmVjb3JkUHJlLmpzeCdcbmltcG9ydCBEb2MgZnJvbSAnRG9jLmpzeCdcbmltcG9ydCBOb3RGb3VuZCBmcm9tICdOb3RGb3VuZC5qc3gnXG5cbmltcG9ydCBjb25maWd1cmVTdG9yZSBmcm9tICdjb25maWd1cmVTdG9yZS5qcydcbmltcG9ydCByZWR1Y2VyIGZyb20gJ3JlZHVjZXJzLmpzJ1xuXG5jb25zdCBzdG9yZSA9IGNvbmZpZ3VyZVN0b3JlKHJlZHVjZXIpXG5cbnJlbmRlcihcbiAgPFJvb3Qgc3RvcmU9e3N0b3JlfT5cbiAgICA8Um91dGVyIGhpc3Rvcnk9e2Jyb3dzZXJIaXN0b3J5fSA+XG4gICAgICA8UmVkaXJlY3QgZnJvbT1cIi9hYm91dFwiIHRvPVwiL2RvY3MvYWJvdXQubWRcIiAvPlxuICAgICAgPFJlZGlyZWN0IGZyb209XCIvZG9jcy9hYm91dFwiIHRvPVwiL2RvY3MvYWJvdXQubWRcIiAvPlxuICAgICAgPFJlZGlyZWN0IGZyb209XCIvYWJvdXQubWRcIiB0bz1cIi9kb2NzL2Fib3V0Lm1kXCIgLz5cbiAgICAgIDxSZWRpcmVjdCBmcm9tPVwiL2xvZ2luXCIgdG89XCIvZG9jcy9hYm91dC5tZFwiIC8+XG4gICAgICA8UmVkaXJlY3QgZnJvbT1cIi9sb2dvdXRcIiB0bz1cIi9kb2NzL2Fib3V0Lm1kXCIgLz5cbiAgICAgIDxSZWRpcmVjdCBmcm9tPVwiL3Nsb2dvdXRcIiB0bz1cIi9kb2NzL2Fib3V0Lm1kXCIgLz5cbiAgICAgIDxSb3V0ZSBwYXRoPVwiL1wiIGNvbXBvbmVudD17QXBwfSA+XG4gICAgICAgIDxJbmRleFJvdXRlIGNvbXBvbmVudD17QXBwfSAvPlxuICAgICAgICA8SW5kZXhSZWRpcmVjdCB0bz1cIi9kb2NzL2Fib3V0Lm1kXCIgLz5cbiAgICAgICAgPFJvdXRlIHBhdGg9XCJkb2NzLzpkb2NGaWxlXCIgY29tcG9uZW50PXtEb2N9IC8+XG4gICAgICAgIDxSb3V0ZSBwYXRoPVwidGVjaC9kb2NzL2dlbi86ZG9jRmlsZVwiIGNvbXBvbmVudD17RG9jfSAvPlxuICAgICAgICA8Um91dGUgcGF0aD1cInRlY2gvZG9jcy86ZG9jRmlsZVwiIGNvbXBvbmVudD17RG9jfSAvPlxuICAgICAgICA8Um91dGUgcGF0aD1cIjp0YWJsZVwiIGNvbXBvbmVudD17U3ViQXBwfSA+XG4gICAgICAgICAgPFJvdXRlIHBhdGg9XCJsaXN0XCIgY29tcG9uZW50PXtJdGVtRmlsdGVyZWR9IC8+XG4gICAgICAgICAgPFJvdXRlIHBhdGg9XCJteWxpc3RcIiBjb21wb25lbnQ9e0l0ZW1NeX0gPlxuICAgICAgICAgICAgPFJvdXRlIHBhdGg9XCI6cmVjb3JkSWRcIiBjb21wb25lbnQ9e0l0ZW1SZWNvcmRQcmV9IG93bk9ubHk9e3RydWV9IC8+XG4gICAgICAgICAgPC9Sb3V0ZT5cbiAgICAgICAgICA8Um91dGUgcGF0aD1cIjpmdW5jXCIgY29tcG9uZW50PXtCYWNrb2ZmaWNlfSAvPlxuICAgICAgICA8L1JvdXRlPlxuICAgICAgPC9Sb3V0ZT5cbiAgICAgIDxSb3V0ZSBwYXRoPVwiKlwiIGNvbXBvbmVudD17Tm90Rm91bmR9IC8+XG4gICAgPC9Sb3V0ZXI+XG4gIDwvUm9vdD5cbiAgLFxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYm9keScpXG4pXG5cbiIsImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCdcblxuY29uc3QgaW5kZXRlcm1pbmF0ZSA9IHN0YXRlcyA9PiAhc3RhdGVzLmFsbFRydWUgJiYgIXN0YXRlcy5hbGxGYWxzZVxuXG5jbGFzcyBDaGVja2JveEkgZXh0ZW5kcyBDb21wb25lbnQge1xuICBjb21wb25lbnREaWRVcGRhdGUoKSB7XG4gICAgY29uc3QgeyBwcm9wczogeyBzdGF0ZXMgfSB9ID0gdGhpc1xuICAgIHRoaXMuZG9tLmluZGV0ZXJtaW5hdGUgPSBpbmRldGVybWluYXRlKHN0YXRlcylcbiAgfVxuICBoYW5kbGVDaGVjayA9ICgpID0+IHtcbiAgICBjb25zdCB7IHByb3BzOiB7c3RhdGVzLCBmaWx0ZXJJZCwgdXBkRmlsdGVyIH0gfSA9IHRoaXNcbiAgICByZXR1cm4gdXBkRmlsdGVyKGZpbHRlcklkLCB0aGlzLmRvbS5pbmRldGVybWluYXRlIHx8ICFzdGF0ZXMuYWxsVHJ1ZSlcbiAgfVxuICBzZXRJbmRldGVybWluYXRlID0gZG9tRWxlbSA9PiB7XG4gICAgY29uc3QgeyBwcm9wczogeyBzdGF0ZXMgfSB9ID0gdGhpc1xuICAgIGlmIChkb21FbGVtKSB7XG4gICAgICB0aGlzLmRvbSA9IGRvbUVsZW1cbiAgICAgIGRvbUVsZW0uaW5kZXRlcm1pbmF0ZSA9IGluZGV0ZXJtaW5hdGUoc3RhdGVzKVxuICAgIH1cbiAgfVxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBwcm9wczogeyBzdGF0ZXMgfSB9ID0gdGhpc1xuICAgIHJldHVybiAoXG4gICAgICA8aW5wdXRcbiAgICAgICAgICByZWY9e3RoaXMuc2V0SW5kZXRlcm1pbmF0ZX1cbiAgICAgICAgICB0eXBlPVwiY2hlY2tib3hcIlxuICAgICAgICAgIGNoZWNrZWQ9e3N0YXRlcy5hbGxUcnVlfVxuICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUNoZWNrfVxuICAgICAgLz5cbiAgICApXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQ2hlY2tib3hJXG4iLCJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnXG5pbXBvcnQgQnlWYWx1ZSBmcm9tICdCeVZhbHVlLmpzeCdcbmltcG9ydCBMIGZyb20gJ2xlYWZsZXQnXG5pbXBvcnQge2NvdW50cnlCb3JkZXJzfSBmcm9tICdldXJvcGUuZ2VvLmpzJ1xuaW1wb3J0IHsgd2l0aENvbnRleHQgfSBmcm9tICdob2MuanMnXG5cbmNvbnN0IG1hcE9wdGlvbnMgPSB7XG4gIEhFSUdIVDogMjUwLFxuICBNQVhfUkFESVVTOiAyNSxcbiAgTEVWRUxfT0ZGOiAxMCxcbiAgWk9PTV9JTklUOiAzLFxuICBNQVBfQ0VOVEVSOiBbNTIsIDEyXSxcbiAgTUFQX0JPVU5EUzogW1szMCwgLTIwXSwgWzcwLCA0MF1dLFxuICBNQVJLRVJfQ09MT1I6IHtcbiAgICBbdHJ1ZV06IHtcbiAgICAgIGNvbG9yOiAnIzAwODgwMCcsXG4gICAgICBmaWxsQ29sb3I6ICcjMDBjYzAwJyxcbiAgICB9LFxuICAgIFtmYWxzZV06IHtcbiAgICAgIGNvbG9yOiAnIzg4ODg0NCcsXG4gICAgICBmaWxsQ29sb3I6ICcjYmJiYjY2JyxcbiAgICB9LFxuICB9LFxuICBNQVJLRVJfU0hBUEU6IHtcbiAgICB3ZWlnaHQ6IDEsXG4gICAgZmlsbDogdHJ1ZSxcbiAgICBmaWxsT3BhY2l0eTogMC44LFxuICB9LFxuICBDT1VOVFJZX1NUWUxFOiB7XG4gICAgW3RydWVdOiB7XG4gICAgICBjb2xvcjogJyM4ODQ0MjInLFxuICAgICAgd2VpZ2h0OiAyLFxuICAgICAgZmlsbDogdHJ1ZSxcbiAgICAgIGZpbGxDb2xvcjogJyNhYTc3NjYnLFxuICAgICAgZmlsbE9wYWNpdHk6IDEsXG4gICAgfSxcbiAgICBbZmFsc2VdOiB7XG4gICAgICBjb2xvcjogJyM3Nzc3NzcnLFxuICAgICAgd2VpZ2h0OiAxLFxuICAgICAgZmlsbDogdHJ1ZSxcbiAgICAgIGZpbGxDb2xvcjogJyNiYmJiYmInLFxuICAgICAgZmlsbE9wYWNpdHk6IDEsXG4gICAgfSxcbiAgfSxcbn1cblxuY29uc3QgY29tcHV0ZVJhZGl1cyA9IChpLCBmaWx0ZXJlZEFtb3VudE90aGVycywgYW1vdW50cykgPT4ge1xuICBjb25zdCBhbW91bnQgPSBhbW91bnRzID8gYW1vdW50cy5oYXMoaSkgPyBhbW91bnRzLmdldChpKSA6IDAgOiAwXG4gIGlmIChhbW91bnQgPT0gMCkge3JldHVybiAwfVxuICBjb25zdCB7IE1BWF9SQURJVVMsIExFVkVMX09GRiB9ID0gbWFwT3B0aW9uc1xuICBjb25zdCBwcm9wb3J0aW9uYWwgPSBNQVhfUkFESVVTICogYW1vdW50IC8gZmlsdGVyZWRBbW91bnRPdGhlcnNcbiAgaWYgKGZpbHRlcmVkQW1vdW50T3RoZXJzIDwgTEVWRUxfT0ZGKSB7cmV0dXJuIHByb3BvcnRpb25hbH1cbiAgcmV0dXJuIExFVkVMX09GRiAqIE1hdGguc3FydChwcm9wb3J0aW9uYWwpXG59XG5cbmNsYXNzIEVVTWFwIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcylcbiAgICB0aGlzLmZlYXR1cmVzID0gbmV3IE1hcCgpXG4gIH1cbiAgc2V0TWFwID0gZG9tID0+IHtpZiAoZG9tKSB7dGhpcy5kb20gPSBkb219fVxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBwcm9wczogeyBjb3VudHJ5LCAuLi5ieVZhbHVlUHJvcHMgfSwgc2V0TWFwIH0gPSB0aGlzXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIDxkaXZcbiAgICAgICAgICByZWY9e3NldE1hcH1cbiAgICAgICAgLz5cbiAgICAgICAgPEJ5VmFsdWUgey4uLmJ5VmFsdWVQcm9wc30gLz5cbiAgICAgIDwvZGl2PlxuICAgIClcbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIGNvbnN0IHtcbiAgICAgIHByb3BzOiB7IGZpbHRlclNldHRpbmdzLCBmaWx0ZXJlZEFtb3VudE90aGVycywgYW1vdW50cywgY291bnRyeSB9LFxuICAgICAgZG9tLFxuICAgIH0gPSB0aGlzXG4gICAgY29uc3QgeyBIRUlHSFQsIE1BUF9DRU5URVIsIFpPT01fSU5JVCwgTUFQX0JPVU5EUywgTUFSS0VSX0NPTE9SLCBNQVJLRVJfU0hBUEUsIENPVU5UUllfU1RZTEUgfSA9IG1hcE9wdGlvbnNcbiAgICBkb20uc3R5bGUuaGVpZ2h0ID0gSEVJR0hUXG4gICAgdGhpcy5tYXAgPSBMLm1hcChkb20sIHtcbiAgICAgIGF0dHJpYnV0aW9uQ29udHJvbDogZmFsc2UsXG4gICAgICBjZW50ZXI6IE1BUF9DRU5URVIsXG4gICAgICB6b29tOiBaT09NX0lOSVQsXG4gICAgICBtYXhCb3VuZHM6IE1BUF9CT1VORFMsXG4gICAgfSlcbiAgICB0aGlzLmlkRnJvbUlzbyA9IG5ldyBNYXAoWy4uLmNvdW50cnldLm1hcCgoeyBpc28sIF9pZCB9KSA9PiBbaXNvLCBfaWRdKSlcbiAgICBMLmdlb0pTT04oY291bnRyeUJvcmRlcnMsIHtcbiAgICAgIHN0eWxlOiBmZWF0dXJlID0+IENPVU5UUllfU1RZTEVbdGhpcy5pbkRhcmlhaChmZWF0dXJlKV0sXG4gICAgICBvbkVhY2hGZWF0dXJlOiBmZWF0dXJlID0+IHtcbiAgICAgICAgaWYgKHRoaXMuaW5EYXJpYWgoZmVhdHVyZSkpIHtcbiAgICAgICAgICBjb25zdCB7IHByb3BlcnRpZXM6IHsgaXNvMiwgbGF0LCBsbmcgfSB9ID0gZmVhdHVyZVxuICAgICAgICAgIGNvbnN0IGkgPSB0aGlzLmlkRnJvbUlzby5nZXQoaXNvMilcbiAgICAgICAgICBjb25zdCBpc09uID0gZmlsdGVyU2V0dGluZ3MuZ2V0KGkpXG4gICAgICAgICAgY29uc3QgbWFya2VyID0gTC5jaXJjbGVNYXJrZXIoW2xhdCwgbG5nXSwge1xuICAgICAgICAgICAgLi4uTUFSS0VSX0NPTE9SW2lzT25dLFxuICAgICAgICAgICAgcmFkaXVzOiBjb21wdXRlUmFkaXVzKGksIGZpbHRlcmVkQW1vdW50T3RoZXJzLCBhbW91bnRzKSxcbiAgICAgICAgICAgIC4uLk1BUktFUl9TSEFQRSxcbiAgICAgICAgICAgIHBhbmU6ICdtYXJrZXJQYW5lJyxcbiAgICAgICAgICB9KS5hZGRUbyh0aGlzLm1hcClcbiAgICAgICAgICB0aGlzLmZlYXR1cmVzLnNldChpc28yLCBtYXJrZXIpXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgfSkuYWRkVG8odGhpcy5tYXApXG4gIH1cblxuICBpbkRhcmlhaCA9IGZlYXR1cmUgPT4gdGhpcy5pZEZyb21Jc28uaGFzKGZlYXR1cmUucHJvcGVydGllcy5pc28yKVxuXG4gIGNvbXBvbmVudERpZFVwZGF0ZSgpIHtcbiAgICBjb25zdCB7IHByb3BzOiB7IGZpbHRlclNldHRpbmdzLCBmaWx0ZXJlZEFtb3VudE90aGVycywgYW1vdW50cyB9IH0gPSB0aGlzXG4gICAgY29uc3QgeyBNQVJLRVJfQ09MT1IgfSA9IG1hcE9wdGlvbnNcbiAgICBmb3IgKGNvbnN0IFtpc28yLCBtYXJrZXJdIG9mIHRoaXMuZmVhdHVyZXMpIHtcbiAgICAgIGNvbnN0IGkgPSB0aGlzLmlkRnJvbUlzby5nZXQoaXNvMilcbiAgICAgIGNvbnN0IGlzT24gPSBmaWx0ZXJTZXR0aW5ncy5nZXQoaSlcbiAgICAgIG1hcmtlci5zZXRSYWRpdXMoY29tcHV0ZVJhZGl1cyhpLCBmaWx0ZXJlZEFtb3VudE90aGVycywgYW1vdW50cykpXG4gICAgICBtYXJrZXIuc2V0U3R5bGUoTUFSS0VSX0NPTE9SW2lzT25dKVxuICAgIH1cbiAgfVxufVxuXG5FVU1hcC5kaXNwbGF5TmFtZSA9ICdFVU1hcCdcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHsgdGFibGVzOiB7IGNvdW50cnkgfSB9KSA9PiB7XG4gIHJldHVybiB7IGNvdW50cnkgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcykoXG4gICAgd2l0aENvbnRleHQoRVVNYXApXG4pXG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnXG5pbXBvcnQgTG9naW4gZnJvbSAnTG9naW4uanN4J1xuaW1wb3J0IE5hdkxpbmsgZnJvbSAnTmF2TGluay5qc3gnXG5pbXBvcnQgU3RhdGljIGZyb20gJ1N0YXRpYy5qc3gnXG5pbXBvcnQgTm90aWZpY2F0aW9uIGZyb20gJ05vdGlmaWNhdGlvbi5qc3gnXG5cbmNvbnN0IEFwcCA9ICh7IGNoaWxkcmVuLCBoZWlnaHQsIHdpZHRoIH0pID0+IHtcbiAgY29uc3QgdGV4dCA9IGAke3dpZHRofSB4ICR7aGVpZ2h0fWBcbiAgcmV0dXJuIChcbiAgICA8ZGl2PlxuICAgICAgPE5vdGlmaWNhdGlvbiAvPlxuICAgICAgPHAgY2xhc3NOYW1lPVwibmF2IHNtYWxsIHRvcFwiID5cbiAgICAgICAgPGltZ1xuICAgICAgICAgIHNyYz1cIi9zdGF0aWMvaW1hZ2VzL2lua2luZF9sb2dvX3NtYWxsLnBuZ1wiXG4gICAgICAgICAgdGl0bGU9XCJpbmZvcm1hdGlvbiBhYm91dCB0aGlzIHNpdGVcIlxuICAgICAgICAvPlxuICAgICAgICA8TmF2TGluayB0bz1cIi9jb250cmliXCIgPnsnQ29udHJpYnV0aW9ucyd9PC9OYXZMaW5rPlxuICAgICAgICA8TmF2TGluayB0bz1cIi9iYWNrb2ZmaWNlXCIgPnsnQmFja29mZmljZSd9PC9OYXZMaW5rPlxuICAgICAgICA8U3RhdGljIC8+XG4gICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInJlc2l6ZVwiIHRpdGxlPXt0ZXh0fT57dGV4dH08L3NwYW4+XG4gICAgICAgIDxMb2dpbiAvPlxuICAgICAgPC9wPlxuICAgICAgPGRpdj57Y2hpbGRyZW59PC9kaXY+XG4gICAgPC9kaXY+XG4gIClcbn1cblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHsgd2luOiB7IGhlaWdodCwgd2lkdGggfSB9KSA9PiAoeyBoZWlnaHQsIHdpZHRoIH0pXG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzKShBcHApXG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5cbmNvbnN0IEJhY2tvZmZpY2UgPSAoeyBwYXJhbXM6IHsgZnVuYyB9IH0pID0+IHtcbiAgY29uc3QgaGVhZGluZ3MgPSB7XG4gICAgdHlwZTogJ0NvbnRyaWJ1dGlvbiB0eXBlcycsXG4gICAgYXNzZXNzOiAnQXNzZXNzbWVudCBjcml0ZXJpYScsXG4gICAgcGFja2FnZTogJ0Fzc2Vzc21lbnQgcGFja2FnZXMnLFxuICB9XG4gIGNvbnN0IGJvZGllcyA9IHtcbiAgICB0eXBlOiAnV2lsbCBiZSBpbXBsZW1lbnRlZCcsXG4gICAgYXNzZXNzOiAnV2lsbCBiZSBpbXBsZW1lbnRlZCcsXG4gICAgcGFja2FnZTogJ1dpbGwgYmUgaW1wbGVtZW50ZWQnLFxuICB9XG4gIGNvbnN0IGhlYWRpbmcgPSBoZWFkaW5nc1tmdW5jXSB8fCAnTm8gc3VjaCBmdW5jdGlvbidcbiAgY29uc3QgYm9keSA9IGJvZGllc1tmdW5jXSB8fCAnTm90aGluZyB0byB3YWl0IGZvcidcbiAgcmV0dXJuIChcbiAgICA8ZGl2PlxuICAgICAgPGgxPntoZWFkaW5nfTwvaDE+XG4gICAgICA8cD57Ym9keX08L3A+XG4gICAgPC9kaXY+XG4gIClcbn1cblxuZXhwb3J0IGRlZmF1bHQgQmFja29mZmljZVxuXG5cbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCBGYWNldCBmcm9tICdGYWNldC5qc3gnXG5pbXBvcnQgQ2hlY2tib3hJIGZyb20gJ0NoZWNrYm94SS5qc3gnXG5pbXBvcnQgU3RhdCBmcm9tICdTdGF0LmpzeCdcbmltcG9ydCBBbHRlcm5hdGl2ZSBmcm9tICdBbHRlcm5hdGl2ZS5qc3gnXG5pbXBvcnQgeyBwbGFjZUZhY2V0cywgdGVzdEFsbENoZWNrcyB9IGZyb20gJ2ZpbHRlcmluZy5qcydcblxuY29uc3QgQnlWYWx1ZSA9ICh7XG4gIHRhYmxlLFxuICBmaWx0ZXJJZCwgZmlsdGVyRmllbGQsIGZpbHRlckxhYmVsLFxuICBmaWVsZFZhbHVlcywgZmlsdGVyU2V0dGluZ3MsXG4gIGZpbHRlcmVkQW1vdW50LCBmaWx0ZXJlZEFtb3VudE90aGVycyxcbiAgYW1vdW50cywgbWF4Q29scywgdXBkRmlsdGVyLFxuICBleHBhbmRlZCxcbn0pID0+IHtcbiAgY29uc3Qgcm93cyA9IHBsYWNlRmFjZXRzKGZpZWxkVmFsdWVzLCBtYXhDb2xzKVxuICBjb25zdCBjb250cm9sMSA9IGhhbmRsZXIgPT4gKDxzcGFuIGNsYXNzTmFtZT1cImJ1dHRvbi1zbWFsbCBmYSBmYS1jaGV2cm9uLWRvd25cIiBvbkNsaWNrPXtoYW5kbGVyfSAvPilcbiAgY29uc3QgY29udHJvbDIgPSBoYW5kbGVyID0+ICg8c3BhbiBjbGFzc05hbWU9XCJidXR0b24tc21hbGwgZmEgZmEtY2hldnJvbi1yaWdodFwiIG9uQ2xpY2s9e2hhbmRsZXJ9IC8+KVxuICBjb25zdCBjb250cm9sUGxhY2VtZW50ID0gY29udHJvbCA9PiAoXG4gICAgPHAgY2xhc3NOYW1lPVwiZmFjZXRcIiA+XG4gICAgICA8Q2hlY2tib3hJXG4gICAgICAgIGZpbHRlcklkPXtmaWx0ZXJJZH1cbiAgICAgICAgc3RhdGVzPXt0ZXN0QWxsQ2hlY2tzKGZpbHRlclNldHRpbmdzKX1cbiAgICAgICAgdXBkRmlsdGVyPXt1cGRGaWx0ZXJ9XG4gICAgICAvPiB7ZmlsdGVyTGFiZWx9eycgJ31cbiAgICAgIDxTdGF0IHN1YlRvdGFsPXtmaWx0ZXJlZEFtb3VudH0gdG90YWw9e2ZpbHRlcmVkQW1vdW50T3RoZXJzfSAvPnsnICd9XG4gICAgICB7Y29udHJvbH1cbiAgICA8L3A+XG4gIClcbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImZhY2V0XCIgPntcbiAgICAgIHJvd3MgPT09IG51bGwgPyAoPHA+eycgLW5vIGZhY2V0cyAnfTwvcD4pIDogKFxuICAgICAgICA8QWx0ZXJuYXRpdmVcbiAgICAgICAgICB0YWc9e2Ake3RhYmxlfV8ke2ZpbHRlckZpZWxkfWB9XG4gICAgICAgICAgY29udHJvbFBsYWNlbWVudD17Y29udHJvbFBsYWNlbWVudH1cbiAgICAgICAgICBjb250cm9scz17W2NvbnRyb2wxLCBjb250cm9sMl19XG4gICAgICAgICAgaW5pdGlhbD17ZXhwYW5kZWQgPyAwIDogMX1cbiAgICAgICAgICBhbHRlcm5hdGl2ZXM9e1tcbiAgICAgICAgICAgICg8dGFibGUga2V5PVwidGFibGVcIiA+XG4gICAgICAgICAgICAgIDx0Ym9keT5cbiAgICAgICAgICAgICAgICB7cm93cy5tYXAoKHJvdywgaSkgPT4gKFxuICAgICAgICAgICAgICAgICAgPHRyIGtleT17aX0gPlxuICAgICAgICAgICAgICAgICAgICB7cm93Lm1hcCgoZiwgaikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgIGlmIChmID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gPHRkIGtleT17an0gLz5cbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgY29uc3QgW3ZhbHVlSWQsIHZhbHVlUmVwXSA9IGZcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCBmYWNldENsYXNzID0gKGogPT0gMCkgPyBcImZhY2V0XCIgOiBcImZhY2V0IG1pZFwiXG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsoXG4gICAgICAgICAgICAgICAgICAgICAgICA8dGRcbiAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9e3ZhbHVlSWR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtmYWNldENsYXNzfVxuICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8RmFjZXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJJZD17ZmlsdGVySWR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVJZD17dmFsdWVJZH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZVJlcD17dmFsdWVSZXB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2tlZD17ZmlsdGVyU2V0dGluZ3MuZ2V0KHZhbHVlSWQpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVwZEZpbHRlcj17dXBkRmlsdGVyfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICApLCAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8dGRcbiAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PVwic3RhdFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInN0YXRpc3RpY1wiXG4gICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxTdGF0IHN1YlRvdGFsPXthbW91bnRzLmdldCh2YWx1ZUlkKX0gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgKV1cbiAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgICAgICA8L3RhYmxlPiksXG4gICAgICAgICAgICAoPGRpdiBrZXk9XCJkaXZcIiAvPiksXG4gICAgICAgICAgXX1cbiAgICAgICAgLz5cbiAgICAgICl9XG4gICAgPC9kaXY+XG4gIClcbn1cblxuZXhwb3J0IGRlZmF1bHQgQnlWYWx1ZVxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuXG5pbXBvcnQgRG9jTWQgZnJvbSAnRG9jTWQuanN4J1xuaW1wb3J0IERvY1BkZiBmcm9tICdEb2NQZGYuanN4J1xuaW1wb3J0IERvY0h0bWwgZnJvbSAnRG9jSHRtbC5qc3gnXG5pbXBvcnQgTm90Rm91bmQgZnJvbSAnTm90Rm91bmQuanN4J1xuXG5jb25zdCBkb2NUeXBlID0ge1xuICBtZDogRG9jTWQsXG4gIHBkZjogRG9jUGRmLFxuICBodG1sOiBEb2NIdG1sLFxufVxuXG5jb25zdCBEb2MgPSAoeyBsb2NhdGlvbjogeyBwYXRobmFtZTogZG9jUGF0aCB9IH0pID0+IHtcbiAgY29uc3QgW2RvY0RpciwgZG9jRmlsZV0gPSAvXiguKilcXC8oW14vXSspJC9nLmV4ZWMoZG9jUGF0aCkuc2xpY2UoMSlcbiAgY29uc3QgW2RvY05hbWUsIGRvY0V4dF0gPSAvXiguKilcXC4oW14uXSspJC9nLmV4ZWMoZG9jRmlsZSkuc2xpY2UoMSlcbiAgY29uc3QgeyBbZG9jRXh0XTogRG9jQ2xhc3MgfSA9IGRvY1R5cGVcbiAgcmV0dXJuIERvY0NsYXNzID09IG51bGwgPyAoXG4gICAgPE5vdEZvdW5kIHBhcmFtcz17e3NwbGF0OiBgZG9jdW1lbnQgJHtkb2NQYXRofWB9fSAvPlxuICApIDogKFxuICAgIDxEb2NDbGFzcyBkb2NEaXI9e2RvY0Rpcn0gZG9jTmFtZT17ZG9jTmFtZX0gZG9jRXh0PXtkb2NFeHR9IHRhZz17ZG9jTmFtZX0gLz5cbiAgKVxufVxuXG5leHBvcnQgZGVmYXVsdCBEb2NcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcblxuY29uc3QgRG9jSHRtbCA9ICh7IGRvY0RpciwgZG9jTmFtZSwgZG9jRXh0IH0pID0+IHtcbiAgY29uc3Qgc3JjID0gYC9hcGkvZmlsZSR7ZG9jRGlyfS8ke2RvY05hbWV9LiR7ZG9jRXh0fWBcbiAgcmV0dXJuIChcbiAgICA8aWZyYW1lXG4gICAgICBoZWlnaHQ9XCIxMDAlXCJcbiAgICAgIHdpZHRoPVwiMTAwJVwiXG4gICAgICBzcmM9e3NyY31cbiAgICAvPlxuICApXG59XG5cbmV4cG9ydCBkZWZhdWx0IERvY0h0bWxcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcblxuY29uc3QgRG9jUGRmID0gKHsgZG9jRGlyLCBkb2NOYW1lLCBkb2NFeHQgfSkgPT4ge1xuICBjb25zdCBocmVmID0gYC9hcGkvZmlsZSR7ZG9jRGlyfS8ke2RvY05hbWV9LiR7ZG9jRXh0fWBcbiAgY29uc3QgaU9TID0gL2lQYWR8aVBob25lfGlQb2QvLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCkgJiYgIXdpbmRvdy5NU1N0cmVhbVxuICByZXR1cm4gaU9TID8gKFxuICAgIDxwPlxuICAgICAgPGEgdGFyZ2V0PVwiX2JsYW5rXCIgcmVsPVwibm9vcGVuZXIgbm9yZWZlcnJlclwiIGhyZWY9e2hyZWZ9ID57ZG9jTmFtZX08L2E+eycgKG9wZW4gcGRmIGluIGEgbmV3IHRhYiknfVxuICAgIDwvcD5cbiAgKSA6IChcbiAgICA8b2JqZWN0XG4gICAgICBoZWlnaHQ9XCIxMDAlXCJcbiAgICAgIHdpZHRoPVwiMTAwJVwiXG4gICAgICBkYXRhPXtocmVmfVxuICAgICAgdHlwZT1cImFwcGxpY2F0aW9uL3BkZlwiXG4gICAgPlxuICAgICAgPGEgdGFyZ2V0PVwiX2JsYW5rXCIgcmVsPVwibm9vcGVuZXIgbm9yZWZlcnJlclwiIGhyZWY9e2hyZWZ9ID57ZG9jTmFtZX08L2E+eycgKG9wZW4gcGRmIGluIGEgbmV3IHRhYiknfVxuICAgIDwvb2JqZWN0PlxuICApXG59XG5cbmV4cG9ydCBkZWZhdWx0IERvY1BkZlxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IG1lbW9CaW5kIGZyb20gJ21lbW9CaW5kLmpzJ1xuXG5jbGFzcyBjYWxsQmFja3Mge1xuICBvbkNoYW5nZSA9IChmaWx0ZXJJZCwgdmFsdWVJZCwgdXBkRmlsdGVyKSA9PiBldmVudCA9PiB1cGRGaWx0ZXIoZmlsdGVySWQsIFt2YWx1ZUlkLCBldmVudC50YXJnZXQuY2hlY2tlZF0pXG59XG5jb25zdCBtZW1vID0gbmV3IGNhbGxCYWNrcygpXG5cbmNvbnN0IEZhY2V0ID0gKHsgZmlsdGVySWQsIHZhbHVlSWQsIHZhbHVlUmVwLCBjaGVja2VkLCB1cGRGaWx0ZXIgfSkgPT4gKFxuICA8c3Bhbj5cbiAgICA8aW5wdXRcbiAgICAgIHR5cGU9XCJjaGVja2JveFwiXG4gICAgICBjaGVja2VkPXtjaGVja2VkfVxuICAgICAgY2xhc3NOYW1lPVwiZmFjZXRcIlxuICAgICAgb25DaGFuZ2U9e21lbW9CaW5kKG1lbW8sICdvbkNoYW5nZScsIFtmaWx0ZXJJZCwgdmFsdWVJZF0sIFt1cGRGaWx0ZXJdKX1cbiAgICAvPlxuICAgIHtgICR7dmFsdWVSZXB9YH1cbiAgPC9zcGFuPlxuKVxuXG5leHBvcnQgZGVmYXVsdCBGYWNldFxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuXG5pbXBvcnQgRnVsbFRleHQgZnJvbSAnRnVsbFRleHQuanN4J1xuaW1wb3J0IEJ5VmFsdWUgZnJvbSAnQnlWYWx1ZS5qc3gnXG5pbXBvcnQgRVVNYXAgZnJvbSAnRVVNYXAuanN4J1xuXG5jb25zdCBmaWx0ZXJDbGFzcyA9IHtcbiAgRnVsbFRleHQsXG4gIEVVTWFwLFxuICBCeVZhbHVlLFxufVxuXG5jb25zdCBGaWx0ZXIgPSAoe1xuICB0YWJsZSxcbiAgZmllbGRzLCBmaWVsZFZhbHVlcyxcbiAgZmlsdGVyTGlzdCwgZmlsdGVyU2V0dGluZ3MsXG4gIGZpbHRlcmVkQW1vdW50LCBmaWx0ZXJlZEFtb3VudE90aGVycyxcbiAgYW1vdW50cyxcbiAgdXBkRmlsdGVyLFxufSkgPT4gKFxuICA8ZGl2PlxuICAgIHtmaWx0ZXJMaXN0LmZpbHRlcih4ID0+IGZpZWxkc1t4LmZpZWxkXSkubWFwKChmaWx0ZXIsIGZpbHRlcklkKSA9PiB7XG4gICAgICBjb25zdCB7IHR5cGUgfSA9IGZpbHRlclxuICAgICAgY29uc3QgeyBbdHlwZV06IEZjbGFzcyB9ID0gZmlsdGVyQ2xhc3NcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxGY2xhc3NcbiAgICAgICAgICBrZXk9e2ZpbHRlcklkfVxuICAgICAgICAgIHRhYmxlPXt0YWJsZX1cbiAgICAgICAgICBmaWx0ZXJJZD17ZmlsdGVySWR9XG4gICAgICAgICAgZmlsdGVyRmllbGQ9e2ZpbHRlci5maWVsZH1cbiAgICAgICAgICBmaWx0ZXJMYWJlbD17ZmlsdGVyLmxhYmVsfVxuICAgICAgICAgIG1heENvbHM9e2ZpbHRlci5tYXhDb2xzfVxuICAgICAgICAgIGZpbHRlclNldHRpbmdzPXtmaWx0ZXJTZXR0aW5ncy5nZXQoZmlsdGVySWQpfVxuICAgICAgICAgIGZpZWxkVmFsdWVzPXtmaWVsZFZhbHVlcy5nZXQoZmlsdGVyLmZpZWxkKX1cbiAgICAgICAgICBmaWx0ZXJlZEFtb3VudD17ZmlsdGVyZWRBbW91bnR9XG4gICAgICAgICAgZmlsdGVyZWRBbW91bnRPdGhlcnM9e2ZpbHRlcmVkQW1vdW50T3RoZXJzLmdldChmaWx0ZXJJZCl9XG4gICAgICAgICAgYW1vdW50cz17YW1vdW50cy5nZXQoZmlsdGVySWQpfVxuICAgICAgICAgIHVwZEZpbHRlcj17dXBkRmlsdGVyfVxuICAgICAgICAgIGV4cGFuZGVkPXtmaWx0ZXIuZXhwYW5kZWR9XG4gICAgICAgIC8+XG4gICAgICApfVxuICAgICl9XG4gIDwvZGl2PlxuKVxuXG5leHBvcnQgZGVmYXVsdCBGaWx0ZXJcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCBTdGF0IGZyb20gJ1N0YXQuanN4J1xuaW1wb3J0IG1lbW9CaW5kIGZyb20gJ21lbW9CaW5kLmpzJ1xuXG5jbGFzcyBjYWxsQmFja3Mge1xuICBvblR5cGUgPSAoZmlsdGVySWQsIHVwZEZpbHRlcikgPT4gZXZlbnQgPT4gdXBkRmlsdGVyKGZpbHRlcklkLCBldmVudC50YXJnZXQudmFsdWUpXG59XG5jb25zdCBtZW1vID0gbmV3IGNhbGxCYWNrcygpXG5cbmNvbnN0IEZ1bGxUZXh0ID0gKHtcbiAgZmlsdGVySWQsIGZpbHRlckZpZWxkLCBmaWx0ZXJMYWJlbCxcbiAgZmlsdGVyU2V0dGluZ3MsXG4gIGZpbHRlcmVkQW1vdW50LCBmaWx0ZXJlZEFtb3VudE90aGVycyxcbiAgdXBkRmlsdGVyLFxufSkgPT4gKFxuICA8ZGl2PlxuICAgIDxwIHRpdGxlPXtgU2VhcmNoIGluICR7ZmlsdGVyRmllbGR9YH0gPlxuICAgICAgPGlucHV0XG4gICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgY2xhc3NOYW1lPVwic2VhcmNoXCJcbiAgICAgICAgcGxhY2Vob2xkZXI9e2BzZWFyY2ggaW4gJHtmaWx0ZXJMYWJlbH1gfVxuICAgICAgICB2YWx1ZT17ZmlsdGVyU2V0dGluZ3N9XG4gICAgICAgIG9uQ2hhbmdlPXttZW1vQmluZChtZW1vLCAnb25UeXBlJywgW2ZpbHRlcklkXSwgW3VwZEZpbHRlcl0pfVxuICAgICAgLz57JyAnfVxuICAgICAgPFN0YXQgc3ViVG90YWw9e2ZpbHRlcmVkQW1vdW50fSB0b3RhbD17ZmlsdGVyZWRBbW91bnRPdGhlcnN9IC8+XG4gICAgPC9wPlxuICA8L2Rpdj5cbilcblxuZXhwb3J0IGRlZmF1bHQgRnVsbFRleHRcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCBBbHRlcm5hdGl2ZSBmcm9tICdBbHRlcm5hdGl2ZS5qc3gnXG5pbXBvcnQgSXRlbVJlY29yZCBmcm9tICdJdGVtUmVjb3JkLmpzeCdcbmltcG9ydCBOYXZMaW5rIGZyb20gJ05hdkxpbmsuanN4J1xuaW1wb3J0IHsgd2l0aENvbnRleHQgfSBmcm9tICdob2MuanMnXG5cbmNvbnN0IEl0ZW1IZWFkID0gKHsgdGFibGUsIHJvdywgdGl0bGUsIGlucGxhY2UsIGVkaXRTdGF0dXMgfSkgPT4ge1xuICBjb25zdCB7IF9pZDogcm93SWQsIFt0aXRsZV06IHJvd0hlYWRQcmUgfSA9IHJvd1xuICBsZXQgcm93SGVhZFxuICBpZiAoIXJvd0hlYWRQcmUpIHtyb3dIZWFkID0gJy1lbXB0eS0nfVxuICBlbHNlIHtcbiAgICBbcm93SGVhZF0gPSByb3dIZWFkUHJlXG4gICAgaWYgKHR5cGVvZiByb3dIZWFkID09ICdvYmplY3QnKSB7XG4gICAgICBjb25zdCB7IHZhbHVlIH0gPSByb3dIZWFkXG4gICAgICByb3dIZWFkID0gdmFsdWVcbiAgICB9XG4gIH1cblxuICBjb25zdCByZWZQcm9nID0gcHJvZyA9PiB7ZWRpdFN0YXR1c1t0YWJsZV1bcm93SWRdID0gey4uLmVkaXRTdGF0dXNbdGFibGVdW3Jvd0lkXSwgcHJvZ319XG4gIGNvbnN0IHJlZlRpdGxlID0gdGl0bGUgPT4ge2VkaXRTdGF0dXNbdGFibGVdW3Jvd0lkXSA9IHsuLi5lZGl0U3RhdHVzW3RhYmxlXVtyb3dJZF0sIHRpdGxlfX1cbiAgY29uc3QgY29udHJvbDEgPSBoYW5kbGVyID0+ICg8c3BhbiBjbGFzc05hbWU9XCJidXR0b24tc21hbGwgZmEgZmEtY2hldnJvbi1kb3duXCIgb25DbGljaz17aGFuZGxlcn0gLz4pXG4gIGNvbnN0IGNvbnRyb2wyID0gaGFuZGxlciA9PiAoPHNwYW4gY2xhc3NOYW1lPVwiYnV0dG9uLXNtYWxsIGZhIGZhLWNoZXZyb24tcmlnaHRcIiBvbkNsaWNrPXtoYW5kbGVyfSAvPilcbiAgY29uc3QgY29udHJvbFBsYWNlbWVudCA9IGNvbnRyb2wgPT4gKFxuICAgIDxwPlxuICAgICAge2NvbnRyb2x9XG4gICAgICA8c3BhbiByZWY9e3JlZlByb2d9IC8+eycgJ31cbiAgICAgIDxzcGFuIHJlZj17cmVmVGl0bGV9ID5cbiAgICAgICAge3Jvd0hlYWR9XG4gICAgICA8L3NwYW4+XG4gICAgPC9wPlxuICApXG5cbiAgcmV0dXJuIChcbiAgICA8dHIgaWQ9e3Jvd0lkfSA+XG4gICAgICA8dGQ+e1xuICAgICAgICBpbnBsYWNlID8gKFxuICAgICAgICAgIDxBbHRlcm5hdGl2ZVxuICAgICAgICAgICAgdGFnPXtgJHt0YWJsZX1fJHtyb3dJZH1gfVxuICAgICAgICAgICAgY29udHJvbFBsYWNlbWVudD17Y29udHJvbFBsYWNlbWVudH1cbiAgICAgICAgICAgIGNvbnRyb2xzPXtbY29udHJvbDEsIGNvbnRyb2wyXX1cbiAgICAgICAgICAgIGFsdGVybmF0aXZlcz17WyhcbiAgICAgICAgICAgICAgPEl0ZW1SZWNvcmRcbiAgICAgICAgICAgICAgICBrZXk9XCJzaG93XCJcbiAgICAgICAgICAgICAgICB0YWc9e2Ake3RhYmxlfV8ke3Jvd0lkfWB9XG4gICAgICAgICAgICAgICAgdGFibGU9e3RhYmxlfVxuICAgICAgICAgICAgICAgIHJlY29yZElkPXtyb3dJZH1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICksICcnXX1cbiAgICAgICAgICAgIGluaXRpYWw9ezF9XG4gICAgICAgICAgLz5cbiAgICAgICAgKSA6IChcbiAgICAgICAgICA8TmF2TGluayBjbGFzc05hbWU9XCJuYXZcIiB0bz17YC8ke3RhYmxlfS9teWxpc3QvJHtyb3dJZH1gfSA+XG4gICAgICAgICAgICA8c3BhbiByZWY9e3JlZlByb2d9IC8+eycgJ31cbiAgICAgICAgICAgIDxzcGFuIHJlZj17cmVmVGl0bGV9ID5cbiAgICAgICAgICAgICAge3Jvd0hlYWR9XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgPC9OYXZMaW5rPlxuICAgICAgICApXG4gICAgICB9XG4gICAgICA8L3RkPlxuICAgIDwvdHI+XG4gIClcbn1cblxuZXhwb3J0IGRlZmF1bHQgd2l0aENvbnRleHQoSXRlbUhlYWQpXG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgSXRlbUhlYWQgZnJvbSAnSXRlbUhlYWQuanN4J1xuaW1wb3J0IHsgd2l0aENvbnRleHQgfSBmcm9tICdob2MuanMnXG5cbmNvbnN0IEl0ZW1MaXN0ID0gKHsgdGFibGUsIHRpdGxlLCBmaWx0ZXJlZERhdGEsIGlucGxhY2UsIGVkaXRTdGF0dXMgfSkgPT4ge1xuICBpZiAoZWRpdFN0YXR1c1t0YWJsZV0gPT0gbnVsbCkge2VkaXRTdGF0dXNbdGFibGVdID0ge319XG4gIHJldHVybiAoXG4gICAgPGRpdj5cbiAgICAgIDx0YWJsZT5cbiAgICAgICAgPHRib2R5PntcbiAgICAgICAgZmlsdGVyZWREYXRhLm1hcChpdGVtID0+IChcbiAgICAgICAgICA8SXRlbUhlYWQga2V5PXtpdGVtLl9pZH0gdGFibGU9e3RhYmxlfSB0aXRsZT17dGl0bGV9IHJvdz17aXRlbX0gaW5wbGFjZT17aW5wbGFjZX0gLz5cbiAgICAgICAgKSlcbiAgICAgICAgfTwvdGJvZHk+XG4gICAgICA8L3RhYmxlPlxuICAgIDwvZGl2PlxuICApXG59XG5cbmV4cG9ydCBkZWZhdWx0IHdpdGhDb250ZXh0KEl0ZW1MaXN0KVxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuXG5pbXBvcnQgSXRlbVJlY29yZCBmcm9tICdJdGVtUmVjb3JkLmpzeCdcblxuY29uc3QgSXRlbVJlY29yZFByZSA9ICh7IHBhcmFtczogeyB0YWcsIHJlY29yZElkIH0sIHJvdXRlOiB7IG93bk9ubHkgfSB9KSA9PiAoXG4gIDxJdGVtUmVjb3JkIHRhZz17YCR7dGFnfV8ke3JlY29yZElkfWB9IHRhYmxlPXt0YWd9IHJlY29yZElkPXtyZWNvcmRJZH0gb3duT25seT17b3duT25seX0gLz5cbilcblxuZXhwb3J0IGRlZmF1bHQgSXRlbVJlY29yZFByZVxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgbHNDbGVhciB9IGZyb20gJ2xvY2Fsc3RvcmFnZS5qcydcblxuY29uc3QgaGFuZGxlID0gKCkgPT4ge1xuICBsc0NsZWFyKClcbn1cblxuY29uc3QgTG9jYWxTZXR0aW5ncyA9ICgpID0+IChcbiAgPHNwYW5cbiAgICBjbGFzc05hbWU9XCJidXR0b24tc21hbGwgZmEgZmEtZXJhc2VyXCJcbiAgICB0aXRsZT1cImZvcmdldCBteSBzZXR0aW5nc1wiXG4gICAgb25DbGljaz17aGFuZGxlfVxuICAvPlxuKVxuXG5leHBvcnQgZGVmYXVsdCBMb2NhbFNldHRpbmdzXG5cbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCB7IExpbmsgfSBmcm9tICdyZWFjdC1yb3V0ZXInXG5cbmNvbnN0IE5hdkxpbmsgPSBwcm9wcyA9PiA8TGluayB7Li4ucHJvcHN9IGFjdGl2ZUNsYXNzTmFtZT1cImFjdGl2ZVwiIC8+XG5cbmV4cG9ydCBkZWZhdWx0IE5hdkxpbmtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcblxuY29uc3QgTm90Rm91bmQgPSAoe3BhcmFtczogeyBzcGxhdCB9IH0pID0+ICg8aDE+eyc0MDQ6ICd9PGNvZGU+e3NwbGF0fTwvY29kZT57JyBub3QgZm91bmQgb24gdGhpcyBzaXRlLid9PC9oMT4pXG5cbmV4cG9ydCBkZWZhdWx0IE5vdEZvdW5kXG5cbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCB7IFByb3ZpZGVyIH0gZnJvbSAncmVhY3QtcmVkdXgnXG5pbXBvcnQgV2luZG93IGZyb20gJ1dpbmRvdy5qc3gnXG5cbmNvbnN0IFJvb3QgPSAoeyBzdG9yZSwgY2hpbGRyZW4gfSkgPT4gKFxuICA8UHJvdmlkZXIgc3RvcmU9e3N0b3JlfT5cbiAgICA8V2luZG93PlxuICAgICAge2NoaWxkcmVufVxuICAgIDwvV2luZG93PlxuICA8L1Byb3ZpZGVyPlxuKVxuXG5leHBvcnQgZGVmYXVsdCBSb290XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5cbmNvbnN0IFN0YXQgPSAoe3N1YlRvdGFsLCB0b3RhbH0pID0+IChcbiAgPHNwYW4gY2xhc3NOYW1lPVwiZ29vZC1vXCIgPlxuICAgIHtzdWJUb3RhbCA9PSBudWxsID8gJycgOiBgJHtzdWJUb3RhbH1gfVxuICAgIHsodG90YWwgPT0gbnVsbCB8fCBzdWJUb3RhbCA9PSBudWxsKSA/ICcnIDogJyBvZiAnfVxuICAgIDxzdHJvbmc+e3RvdGFsID09IG51bGwgPyAnJyA6IGAke3RvdGFsfWB9PC9zdHJvbmc+XG4gIDwvc3Bhbj5cbilcblxuZXhwb3J0IGRlZmF1bHQgU3RhdFxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IE5hdkxpbmsgZnJvbSAnTmF2TGluay5qc3gnXG5cbmNvbnN0IFN0YXRpYyA9ICgpID0+IChcbiAgPHNwYW4gY2xhc3NOYW1lPVwic21hbGxcIiA+XG4gICAgPE5hdkxpbmsgdG89XCIvZG9jcy9hYm91dC5tZFwiID57J0Fib3V0J308L05hdkxpbms+XG4gICAgPE5hdkxpbmsgdG89XCIvdGVjaC9kb2NzL2Rlc2lnbi5wZGZcIiA+eydkaWFncmFtcyd9PC9OYXZMaW5rPlxuICAgIDxOYXZMaW5rIHRvPVwiL3RlY2gvZG9jcy9kZXBsb3kubWRcIiA+eydkZXBsb3knfTwvTmF2TGluaz5cbiAgICA8YSBocmVmPVwiL2FwaS9maWxlL3RlY2gvZG9jcy9nZW4vaW5kZXguaHRtbFwiIHRhcmdldD1cIl9ibGFua1wiIHJlbD1cIm5vb3BlbmVyIG5vcmVmZXJyZXJcIiA+eyd0ZWNoIGRvYyd9PC9hPlxuICA8L3NwYW4+XG4pXG5cbmV4cG9ydCBkZWZhdWx0IFN0YXRpY1xuXG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnXG5pbXBvcnQgTmF2TGluayBmcm9tICdOYXZMaW5rLmpzeCdcbmltcG9ydCB7IGNvbHVtblN0eWxlIH0gZnJvbSAnd2luZG93LmpzJ1xuXG5jb25zdCBTdWJBcHAgPSAoe3BhcmFtczogeyB0YWJsZSB9LCBjaGlsZHJlbiwgaGVpZ2h0LCB3aWR0aCB9KSA9PiAoXG4gIDxkaXY+XG4gICAgPGRpdlxuICAgICAgY2xhc3NOYW1lPVwibmF2IHNpemVkXCJcbiAgICAgIHN0eWxlPXtjb2x1bW5TdHlsZSgnbGVmdCcsIHsgaGVpZ2h0LCB3aWR0aCB9KX1cbiAgICA+XG4gICAgICB7KHRhYmxlID09ICdjb250cmliJykgPyAoXG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPHA+PE5hdkxpbmsgdG89e2AvJHt0YWJsZX0vbGlzdGB9ID57J0FsbCBpdGVtcyd9PC9OYXZMaW5rPjwvcD5cbiAgICAgICAgICA8cD48TmF2TGluayB0bz17YC8ke3RhYmxlfS9teWxpc3RgfSA+eydNeSB3b3JrJ308L05hdkxpbms+PC9wPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICkgOiAoXG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPHA+PE5hdkxpbmsgdG89e2AvJHt0YWJsZX0vdHlwZWB9ID57J1R5cGVzJ308L05hdkxpbms+PC9wPlxuICAgICAgICAgIDxwPjxOYXZMaW5rIHRvPXtgLyR7dGFibGV9L2Fzc2Vzc2B9ID57J0NyaXRlcmlhJ308L05hdkxpbms+PC9wPlxuICAgICAgICAgIDxwPjxOYXZMaW5rIHRvPXtgLyR7dGFibGV9L3BhY2thZ2VgfSA+eydQYWNrYWdlcyd9PC9OYXZMaW5rPjwvcD5cbiAgICAgICAgPC9kaXY+XG4gICAgICApfVxuICAgIDwvZGl2PlxuICAgIDxkaXY+XG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzTmFtZT1cInNpemVkXCJcbiAgICAgICAgc3R5bGU9e2NvbHVtblN0eWxlKCdyaWdodCcsIHsgaGVpZ2h0LCB3aWR0aCB9KX1cbiAgICAgID5cbiAgICAgICAgeyBjaGlsZHJlbiB9XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG4pXG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9ICh7IHdpbjogeyBoZWlnaHQsIHdpZHRoIH0gfSkgPT4gKHsgaGVpZ2h0LCB3aWR0aCB9KVxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcykoU3ViQXBwKVxuIiwiaW1wb3J0IHsgY29tYmluZVJlZHVjZXJzIH0gZnJvbSAncmVkdXgnXG5pbXBvcnQgeyBnZXRXaW5EaW0gfSBmcm9tICd1aS5qcydcblxuY29uc3Qgd2luID0gKHN0YXRlID0gZ2V0V2luRGltKCksIHsgdHlwZSwgaGVpZ2h0LCB3aWR0aCB9KSA9PiB7XG4gIHN3aXRjaCAodHlwZSkge1xuICAgIGNhc2UgJ3dpbmRpbSc6IHtcbiAgICAgIHJldHVybiB7IGhlaWdodCwgd2lkdGggfVxuICAgIH1cbiAgICBkZWZhdWx0OiByZXR1cm4gc3RhdGVcbiAgfVxufVxuXG5jb25zdCBub3RpZnkgPSAoc3RhdGUgPSB7fSwgeyB0eXBlLCBkZXNjLCBzdGF0dXMsIG1zZ3MgfSkgPT4ge1xuICBzd2l0Y2ggKHR5cGUpIHtcbiAgICBjYXNlICdub3RpZnknOiB7XG4gICAgICBzd2l0Y2ggKHN0YXR1cykge1xuICAgICAgICBjYXNlICdwZW5kaW5nJywgJ3N1Y2Nlc3MnOiB7XG4gICAgICAgICAgcmV0dXJuIHsgLi4uc3RhdGUsIFtkZXNjXTogeyBzdGF0dXMgfSB9XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSAnZXJyb3InOiB7XG4gICAgICAgICAgcmV0dXJuIHsgLi4uc3RhdGUsIFtkZXNjXTogeyBzdGF0dXMsIG1zZ3MgfSB9XG4gICAgICAgIH1cbiAgICAgICAgZGVmYXVsdDogcmV0dXJuIHN0YXRlXG4gICAgICB9XG4gICAgfVxuICAgIGRlZmF1bHQ6IHJldHVybiBzdGF0ZVxuICB9XG59XG5cbmNvbnN0IGRvYyA9IChzdGF0ZSA9IHt9LCB7IHR5cGUsIHBhdGgsIGRhdGEgfSkgPT4ge1xuICBzd2l0Y2ggKHR5cGUpIHtcbiAgICBjYXNlICdmZXRjaERvYyc6IHtcbiAgICAgIGlmIChkYXRhID09IG51bGwpIHtyZXR1cm4geyAuLi5zdGF0ZSwgW3BhdGhdOiBudWxsIH19XG4gICAgICByZXR1cm4geyAuLi5zdGF0ZSwgW3BhdGhdOiBkYXRhIH1cbiAgICB9XG4gICAgZGVmYXVsdDogcmV0dXJuIHN0YXRlXG4gIH1cbn1cblxuY29uc3QgbWUgPSAoc3RhdGUgPSB7fSwgeyB0eXBlLCBwYXRoLCBkYXRhIH0pID0+IHtcbiAgc3dpdGNoICh0eXBlKSB7XG4gICAgY2FzZSAnZmV0Y2hNZSc6IHtcbiAgICAgIGlmIChkYXRhID09IG51bGwpIHtyZXR1cm4ge319XG4gICAgICByZXR1cm4geyAuLi5kYXRhIH1cbiAgICB9XG4gICAgZGVmYXVsdDogcmV0dXJuIHN0YXRlXG4gIH1cbn1cblxuY29uc3QgbGlzdHMgPSAoc3RhdGU9e30sIHsgdHlwZSwgdGFibGUsIGxpc3RPYmogfSkgPT4ge1xuICBzd2l0Y2ggKHR5cGUpIHtcbiAgICBjYXNlICdzZXRMaXN0Jzoge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIFt0YWJsZV06IGxpc3RPYmosXG4gICAgICB9XG4gICAgfVxuICAgIGRlZmF1bHQ6IHJldHVybiBzdGF0ZVxuICB9XG59XG5cbmNvbnN0IHRhYmxlcyA9IChzdGF0ZT17fSwgeyB0eXBlLCBwYXRoLCBkYXRhLCB0YWJsZSB9KSA9PiB7XG4gIHN3aXRjaCAodHlwZSkge1xuICAgIGNhc2UgJ2ZldGNoVGFibGUnOiB7XG4gICAgICBpZiAoZGF0YSA9PSBudWxsKSB7cmV0dXJuIHsgLi4uc3RhdGUsIFt0YWJsZV06IG51bGwgfX1cbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBbdGFibGVdOiBkYXRhLFxuICAgICAgfVxuICAgIH1cbiAgICBjYXNlICdmZXRjaFRhYmxlTXknOiB7XG4gICAgICBpZiAoZGF0YSA9PSBudWxsKSB7XG4gICAgICAgIGlmIChzdGF0ZVt0YWJsZV0gPT0gbnVsbCkgeyByZXR1cm4geyAuLi5zdGF0ZSwgW3RhYmxlXTogbnVsbCB9fVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIC4uLnN0YXRlLFxuICAgICAgICAgIFt0YWJsZV06IHtcbiAgICAgICAgICAgIC4uLnN0YXRlW3RhYmxlXSxcbiAgICAgICAgICAgIG15OiBudWxsLFxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgY29uc3QgeyBlbnRpdGllcywgb3JkZXIgfSA9IGRhdGFcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBbdGFibGVdOiB7XG4gICAgICAgICAgLi4uc3RhdGVbdGFibGVdLFxuICAgICAgICAgIG15OiBvcmRlcixcbiAgICAgICAgICBlbnRpdGllczoge1xuICAgICAgICAgICAgLi4uc3RhdGVbdGFibGVdLmVudGl0aWVzLFxuICAgICAgICAgICAgLi4uZW50aXRpZXMsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH1cbiAgICB9XG4gICAgZGVmYXVsdDogcmV0dXJuIHN0YXRlXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY29tYmluZVJlZHVjZXJzKHtcbiAgd2luLFxuICBub3RpZnksXG4gIGRvYyxcbiAgdGFibGVzLFxuICBsaXN0cyxcbiAgbWUsXG59KVxuXG4iLCJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnXG5pbXBvcnQgeyB3aXRoQ29udGV4dCwgc2F2ZVN0YXRlIH0gZnJvbSAnaG9jLmpzJ1xuaW1wb3J0IHsgbHNHZXQsIGxzU2V0IH0gZnJvbSAnbG9jYWxzdG9yYWdlLmpzJ1xuXG5jb25zdCBpbml0QWx0ID0gKHsgdGFnIH0pID0+ICh7YWx0OiBsc0dldCh0YWcpfSlcblxuY29uc3Qgc3dpdGNoQWx0ID0gKHByZXZTdGF0ZSwgcHJvcHMpID0+IHtcbiAgY29uc3QgeyB0YWcsIGFsdGVybmF0aXZlcywgaW5pdGlhbCB9ID0gcHJvcHNcbiAgY29uc3Qgb2xkQWx0ID0gKHByZXZTdGF0ZS5hbHQgPT0gbnVsbCkgPyAoKGluaXRpYWwgPT0gbnVsbCkgPyAwIDogaW5pdGlhbCkgOiBwcmV2U3RhdGUuYWx0XG4gIGNvbnN0IG5ld0FsdCA9IChvbGRBbHQgKyAxKSAlIGFsdGVybmF0aXZlcy5sZW5ndGhcbiAgbHNTZXQodGFnLCBuZXdBbHQpXG4gIHJldHVybiB7YWx0OiBuZXdBbHR9XG59XG5cbmNsYXNzIEFsdGVybmF0aXZlIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgbmV4dCA9IGV2ZW50ID0+IHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgdGhpcy5zZXRTdGF0ZShzd2l0Y2hBbHQpXG4gIH1cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIHByb3BzOiB7IGNvbnRyb2xQbGFjZW1lbnQsIGNvbnRyb2xzLCBhbHRlcm5hdGl2ZXMsIGluaXRpYWwgfSxcbiAgICAgIHN0YXRlOiB7IGFsdCB9LFxuICAgIH0gPSB0aGlzXG4gICAgY29uc3QgYWx0WCA9IChhbHQgPT0gbnVsbCkgPyAoKGluaXRpYWwgPT0gbnVsbCkgPyAwIDogaW5pdGlhbCkgOiBhbHRcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAge2NvbnRyb2xQbGFjZW1lbnQoY29udHJvbHNbYWx0WF0odGhpcy5uZXh0KSl9XG4gICAgICAgIHthbHRlcm5hdGl2ZXNbYWx0WF19XG4gICAgICA8L2Rpdj5cbiAgICApXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgd2l0aENvbnRleHQoc2F2ZVN0YXRlKEFsdGVybmF0aXZlLCAnQWx0ZXJuYXRpdmUnLCBpbml0QWx0KSlcbiIsImltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnXG5pbXBvcnQgTWFya2Rvd24gZnJvbSAncmVhY3QtbWFya2Rvd24nXG5pbXBvcnQgeyBMaW5rIH0gZnJvbSAncmVhY3Qtcm91dGVyJ1xuaW1wb3J0IEFsdGVybmF0aXZlIGZyb20gJ0FsdGVybmF0aXZlLmpzeCdcbmltcG9ydCB7IGZldGNoRGF0YSB9IGZyb20gJ3NlcnZlci5qcydcblxuY29uc3QgUm91dGVyTGluayA9ICh7IGNoaWxkcmVuLCBocmVmIH0pID0+IChcbiAgaHJlZi5tYXRjaCgvXihodHRwcz86KT9cXC9cXC8vKVxuICAgID8gPGEgaHJlZj17aHJlZn0gPntjaGlsZHJlbn08L2E+XG4gICAgOiA8TGluayB0bz17aHJlZn0gPntjaGlsZHJlbn08L0xpbms+XG4pXG5cbmNsYXNzIERvY01kIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtwcm9wczogeyBkb2NOYW1lLCBkYXRhIH0gfSA9IHRoaXNcbiAgICBjb25zdCBjb250cm9sUGxhY2VtZW50ID0gY29udHJvbCA9PiA8cCBzdHlsZT17e2Zsb2F0OiAncmlnaHQnfX0gPntjb250cm9sfTwvcD5cbiAgICBjb25zdCBjb250cm9sMSA9IGhhbmRsZXIgPT4gPGEgY2xhc3NOYW1lPVwiY29udHJvbCBmYSBmYS1oYW5kLW8tZG93blwiIGhyZWY9XCIjXCIgdGl0bGU9XCJtYXJrZG93biBzb3VyY2VcIiBvbkNsaWNrPXtoYW5kbGVyfSAvPlxuICAgIGNvbnN0IGNvbnRyb2wyID0gaGFuZGxlciA9PiA8YSBjbGFzc05hbWU9XCJjb250cm9sIGZhIGZhLWZpbGUtY29kZS1vXCIgaHJlZj1cIiNcIiB0aXRsZT1cImZvcm1hdHRlZFwiIG9uQ2xpY2s9e2hhbmRsZXJ9IC8+XG5cbiAgICBpZiAoZGF0YSA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gPGRpdj57YE5vIGRvY3VtZW50ICR7ZG9jTmFtZX1gfTwvZGl2PlxuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBzdHlsZT17e3BhZGRpbmdMZWZ0OiAnMC41ZW0nfX0gPlxuICAgICAgICA8QWx0ZXJuYXRpdmVcbiAgICAgICAgICB0YWc9e2RvY05hbWV9XG4gICAgICAgICAgY29udHJvbFBsYWNlbWVudD17Y29udHJvbFBsYWNlbWVudH1cbiAgICAgICAgICBjb250cm9scz17W2NvbnRyb2wxLCBjb250cm9sMl19XG4gICAgICAgICAgYWx0ZXJuYXRpdmVzPXtbKFxuICAgICAgICAgICAgPGRpdiBrZXk9XCJmbXRcIiA+XG4gICAgICAgICAgICAgIDxNYXJrZG93blxuICAgICAgICAgICAgICAgIHNvdXJjZT17ZGF0YX1cbiAgICAgICAgICAgICAgICByZW5kZXJlcnM9e3tMaW5rOiBSb3V0ZXJMaW5rfX1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICksIChcbiAgICAgICAgICAgIDxkaXYga2V5PVwic3JjXCIgPlxuICAgICAgICAgICAgICA8cHJlIGNsYXNzTmFtZT1cIm1kLXNvdXJjZVwiID57ZGF0YX08L3ByZT5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICldfVxuICAgICAgICAvPlxuICAgICAgPC9kaXY+XG4gICAgKVxuICB9XG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIGNvbnN0IHtwcm9wczogeyBkb2NEaXIsIGRvY05hbWUsIGRvY0V4dCwgZmV0Y2ggfSB9ID0gdGhpc1xuICAgIGNvbnN0IHBhdGggPSBgJHtkb2NEaXJ9LyR7ZG9jTmFtZX0uJHtkb2NFeHR9YFxuICAgIGZldGNoKHsgdHlwZTogJ2ZldGNoRG9jJywgY29udGVudFR5cGU6ICdqc29uJywgcGF0aCwgZGVzYzogYGRvY3VtZW50ICR7ZG9jTmFtZX1gIH0pXG4gIH1cbn1cblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHN0YXRlLCB7IGRvY0RpciwgZG9jTmFtZSwgZG9jRXh0IH0pID0+ICh7XG4gIGRhdGE6IHN0YXRlLmRvY1tgJHtkb2NEaXJ9LyR7ZG9jTmFtZX0uJHtkb2NFeHR9YF1cbn0pXG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCB7IGZldGNoOiBmZXRjaERhdGEgfSkoRG9jTWQpXG4iLCJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnXG5pbXBvcnQgSXRlbUxpc3QgZnJvbSAnSXRlbUxpc3QuanN4J1xuaW1wb3J0IEZpbHRlciBmcm9tICdGaWx0ZXIuanN4J1xuXG5pbXBvcnQgeyBuZXdGaWx0ZXJTZXR0aW5ncywgY29tcHV0ZUZpbHRlcmluZywgc2V0ZiB9IGZyb20gJ2ZpbHRlcmluZy5qcydcbmltcG9ydCB7IGNvbHVtblN0eWxlIH0gZnJvbSAnd2luZG93LmpzJ1xuaW1wb3J0IHsgd2l0aENvbnRleHQsIHNhdmVTdGF0ZSB9IGZyb20gJ2hvYy5qcydcblxuY2xhc3MgRmlsdGVyQ29tcHV0ZSBleHRlbmRzIENvbXBvbmVudCB7XG4gIHVwZEZpbHRlciA9IChmaWx0ZXJJZCwgZGF0YSkgPT4ge1xuICAgIGNvbnN0IHsgc3RhdGU6IHsgZmlsdGVyU2V0dGluZ3MgfSB9ID0gdGhpc1xuICAgIGlmICh0eXBlb2YgZGF0YSA9PSAnc3RyaW5nJykge1xuICAgICAgc2V0ZihmaWx0ZXJJZCwgJycsIGRhdGEpXG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiBkYXRhID09ICdib29sZWFuJykge1xuICAgICAgZm9yIChjb25zdCBmdmFsIG9mIGZpbHRlclNldHRpbmdzLmdldChmaWx0ZXJJZCkpIHtcbiAgICAgICAgc2V0ZihmaWx0ZXJJZCwgZnZhbCwgZGF0YSlcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBzZXRmKGZpbHRlcklkLCBkYXRhWzBdLCBkYXRhWzFdKVxuICAgIH1cbiAgICB0aGlzLnNldFN0YXRlKHsgZmlsdGVyU2V0dGluZ3M6IG5ld0ZpbHRlclNldHRpbmdzKGZpbHRlclNldHRpbmdzLCBmaWx0ZXJJZCwgZGF0YSkgfSlcbiAgfVxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge1xuICAgICAgcHJvcHM6IHsgdGFibGUsIHRpdGxlLCByZWNvcmRzLCBvcmRlciwgZmllbGRzLCBmaWVsZFZhbHVlcywgZmlsdGVyTGlzdCwgaGVpZ2h0LCB3aWR0aCB9LFxuICAgICAgc3RhdGU6IHsgZmlsdGVyU2V0dGluZ3MgfSxcbiAgICB9ID0gdGhpc1xuICAgIGNvbnN0IHtcbiAgICAgIGZpbHRlcmVkRGF0YSwgZmlsdGVyZWRBbW91bnRPdGhlcnMsIGFtb3VudHMsXG4gICAgfSA9IGNvbXB1dGVGaWx0ZXJpbmcoXG4gICAgICByZWNvcmRzLCBvcmRlciwgZmllbGRzLCBmaWx0ZXJMaXN0LCBmaWVsZFZhbHVlcywgZmlsdGVyU2V0dGluZ3MsXG4gICAgKVxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgY2xhc3NOYW1lPVwic2l6ZWRcIlxuICAgICAgICAgIHN0eWxlPXtjb2x1bW5TdHlsZSgncmlnaHRMZWZ0JywgeyBoZWlnaHQsIHdpZHRoIH0pfVxuICAgICAgICA+XG4gICAgICAgICAgPHA+eydUb3RhbCAnfTxzcGFuIGNsYXNzTmFtZT1cImdvb2Qtb1wiID57b3JkZXIubGVuZ3RofTwvc3Bhbj48L3A+XG4gICAgICAgICAgPEZpbHRlclxuICAgICAgICAgICAgdGFibGU9e3RhYmxlfVxuICAgICAgICAgICAgZmllbGRzPXtmaWVsZHN9XG4gICAgICAgICAgICBmaWVsZFZhbHVlcz17ZmllbGRWYWx1ZXN9XG4gICAgICAgICAgICBmaWx0ZXJlZEFtb3VudD17ZmlsdGVyZWREYXRhLmxlbmd0aH1cbiAgICAgICAgICAgIGZpbHRlcmVkQW1vdW50T3RoZXJzPXtmaWx0ZXJlZEFtb3VudE90aGVyc31cbiAgICAgICAgICAgIGFtb3VudHM9e2Ftb3VudHN9XG4gICAgICAgICAgICBmaWx0ZXJMaXN0PXtmaWx0ZXJMaXN0fVxuICAgICAgICAgICAgZmlsdGVyU2V0dGluZ3M9e2ZpbHRlclNldHRpbmdzfVxuICAgICAgICAgICAgdXBkRmlsdGVyPXt0aGlzLnVwZEZpbHRlcn1cbiAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIGNsYXNzTmFtZT1cInNpemVkXCJcbiAgICAgICAgICBzdHlsZT17Y29sdW1uU3R5bGUoJ3JpZ2h0UmlnaHQnLCB7IGhlaWdodCwgd2lkdGggfSl9XG4gICAgICAgID5cbiAgICAgICAgICA8SXRlbUxpc3QgdGFibGU9e3RhYmxlfSB0aXRsZT17dGl0bGV9IGZpbHRlcmVkRGF0YT17ZmlsdGVyZWREYXRhfSBpbnBsYWNlPXt0cnVlfSAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIClcbiAgfVxufVxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHsgd2luOiB7IGhlaWdodCwgd2lkdGggfSB9KSA9PiAoeyBoZWlnaHQsIHdpZHRoIH0pXG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzKShcbiAgd2l0aENvbnRleHQoc2F2ZVN0YXRlKEZpbHRlckNvbXB1dGUsICdGaWx0ZXJDb21wdXRlJywgKHtmaWx0ZXJJbml0fSkgPT4gKHtmaWx0ZXJTZXR0aW5nczogZmlsdGVySW5pdH0pKSlcbilcbiIsImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCdcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCdcbmltcG9ydCBNYXJrZG93biBmcm9tICdyZWFjdC1tYXJrZG93bidcbmltcG9ydCBpc2VxdWFsIGZyb20gJ2xvZGFzaC9pc2VxdWFsJ1xuXG5pbXBvcnQgUmVsU2VsZWN0IGZyb20gJ1JlbFNlbGVjdC5qc3gnXG5pbXBvcnQgQWx0ZXJuYXRpdmUgZnJvbSAnQWx0ZXJuYXRpdmUuanN4J1xuXG5pbXBvcnQgeyBnZXREYXRhIH0gZnJvbSAnZGF0YS5qcydcbmltcG9ydCB7IHdpdGhDb250ZXh0LCBzYXZlU3RhdGUgfSBmcm9tICdob2MuanMnXG5pbXBvcnQgbWVtb0JpbmQgZnJvbSAnbWVtb0JpbmQuanMnXG5cbmNvbnN0IHNpemVzID0ge1xuICB1cmw6IDUwLFxuICBlbWFpbDogMzAsXG4gIHJhbmdlOiA2LFxuICBkYXRldGltZTogMjUsXG4gIHRleHQ6IDUwLFxuICBfbWF4OiA1MCxcbn1cblxuY29uc3QgdHJpbURhdGUgPSB0ZXh0ID0+ICh7IGZ1bGw6IHRleHQsIHRleHQ6ICh0ZXh0ID09IG51bGwpID8gJycgOiAodGV4dC5yZXBsYWNlKC9cXC5bMC05XSsvLCAnJykpfSlcblxuY29uc3QgY29uZGVuc2UgPSB0ZXh0ID0+ICh7IGZ1bGw6IHRleHQsIHRleHQ6ICh0ZXh0ID09IG51bGwpID8gJycgOiAoKHRleHQubGVuZ3RoID4gMjApID8gYCR7dGV4dC5zbGljZSgwLCA4KX0uLi4ke3RleHQuc2xpY2UoLTgpfWAgOiB0ZXh0KX0pXG5cbmNvbnN0IG5vcm1hbGl6ZVZhbHVlcyA9ICh7aW5pdFZhbHVlcywgcmVsVmFsdWVzTWFwLCB0YWJsZSwgbmFtZSB9KSA9PiB7XG4gIGNvbnN0IHNhdmVkVmFsdWVzID0gKGluaXRWYWx1ZXMgPT0gbnVsbCkgPyBbXSA6IGluaXRWYWx1ZXNcbiAgY29uc3QgY3VyVmFsdWVzID0gWy4uLnNhdmVkVmFsdWVzXVxuICBjb25zdCByZWxWYWx1ZXMgPSByZWxWYWx1ZXNNYXAuaGFzKHRhYmxlKSA/IChyZWxWYWx1ZXNNYXAuZ2V0KHRhYmxlKS5oYXMobmFtZSkgPyByZWxWYWx1ZXNNYXAuZ2V0KHRhYmxlKS5nZXQobmFtZSkgOiBudWxsKSA6IG51bGxcbiAgcmV0dXJuIHsgY3VyVmFsdWVzLCBzYXZlZFZhbHVlcywgcmVhc29uczoge30sIHNhdmluZzoge30sIGNoYW5nZWQ6IGZhbHNlLCB2YWxpZDogdHJ1ZSwgcmVsVmFsdWVzIH1cbn1cblxuY29uc3QgdXNlckFzU3RyaW5nID0gKHsgX2lkOiB2YWxJZCB9LCB1c2VyKSA9PiB7XG4gIGxldCB2YWxSZXBcbiAgbGV0IHZhbFNob3J0XG4gIGNvbnN0IHVzZXJEYXRhID0gdXNlclt2YWxJZF1cbiAgaWYgKCF1c2VyRGF0YSkge1xuICAgIHZhbFJlcCA9ICdVTktOT1dOJ1xuICAgIHZhbFNob3J0ID0gJz8/J1xuICB9XG4gIGVsc2Uge1xuICAgIGNvbnN0IGZuYW1lID0gdXNlckRhdGEuZmlyc3ROYW1lIHx8ICcnXG4gICAgY29uc3QgbG5hbWUgPSB1c2VyRGF0YS5sYXN0TmFtZSB8fCAnJ1xuICAgIGNvbnN0IGVtYWlsID0gdXNlckRhdGEuZW1haWwgfHwgJydcbiAgICBjb25zdCBlcHBuID0gdXNlckRhdGEuZXBwbiB8fCAnJ1xuICAgIGNvbnN0IGF1dGhvcml0eSA9IHVzZXJEYXRhLmF1dGhvcml0eSB8fCAnJ1xuICAgIGNvbnN0IG1heUxvZ2luID0gdXNlckRhdGEubWF5TG9naW4gPyAneWVzJyA6ICdubydcbiAgICBsZXQgbGlua1RleHQgPSBbZm5hbWUsIGxuYW1lXS5maWx0ZXIoeCA9PiB4KS5qb2luKCcgJylcbiAgICBpZiAobGlua1RleHQgPT0gJycpIHtsaW5rVGV4dCA9IGVtYWlsfVxuICAgIGNvbnN0IG5hbWVQYXJ0ID0gKGxpbmtUZXh0ICYmIGVtYWlsKSA/IChcbiAgICAgIGBbJHtsaW5rVGV4dH1dKG1haWx0bzoke2VtYWlsfSlgXG4gICAgKSA6IChcbiAgICAgIGxpbmtUZXh0ICsgZW1haWxcbiAgICApXG4gICAgY29uc3QgZXBwblBhcnQgPSBlcHBuID8gYCBlcHBuPSR7ZXBwbn0gYCA6ICcnXG4gICAgY29uc3QgYXV0aG9yaXR5UGFydCA9IGF1dGhvcml0eSA/IGAgYXV0aGVudGljYXRlZCBieT0ke2F1dGhvcml0eX0gYCA6ICcnXG4gICAgY29uc3QgbWF5TG9naW5QYXJ0ID0gbWF5TG9naW4gPyBgIGFjdGl2ZT0ke21heUxvZ2lufSBgIDogJydcbiAgICB2YWxSZXAgPSBbbmFtZVBhcnQsIGVwcG5QYXJ0LCBhdXRob3JpdHlQYXJ0LCBtYXlMb2dpblBhcnRdLmZpbHRlcih4ID0+IHgpLmpvaW4oJzsgJylcbiAgICB2YWxTaG9ydCA9IFtmbmFtZSwgbG5hbWUsIGVwcG5dLmZpbHRlcih4ID0+IHgpLnNsaWNlKDAsIDIpLmpvaW4oJyAnKVxuICB9XG4gIHJldHVybiB7IHRleHQ6IHZhbFNob3J0LCBmdWxsOiB2YWxSZXAgfVxufVxuXG5jb25zdCBjb3VudHJ5QXNTdHJpbmcgPSAoeyBfaWQ6IHZhbElkIH0sIGNvdW50cnkpID0+IHtcbiAgbGV0IHZhbFJlcFxuICBsZXQgdmFsU2hvcnRcbiAgY29uc3QgY291bnRyeURhdGEgPSBjb3VudHJ5W3ZhbElkXVxuICBpZiAoIWNvdW50cnlEYXRhKSB7XG4gICAgdmFsUmVwID0gJ1VOS05PV04nXG4gICAgdmFsU2hvcnQgPSAnPz8nXG4gIH1cbiAgZWxzZSB7XG4gICAgY29uc3QgeyBuYW1lLCBpc28gfSA9IGNvdW50cnlEYXRhXG4gICAgdmFsU2hvcnQgPSBuYW1lXG4gICAgdmFsUmVwID0gYCR7aXNvfTogJHtuYW1lfWBcbiAgfVxuICByZXR1cm4ge3RleHQ6IHZhbFNob3J0LCBmdWxsOiB2YWxTaG9ydCwgbG9uZzogdmFsUmVwfVxufVxuXG5jb25zdCB2YWxpZGF0ZSA9ICh2YWwsIHZhbFR5cGUsIHZhbGlkYXRpb24pID0+IHtcbiAgbGV0IHZzdGF0dXMgPSB0cnVlXG4gIGxldCByZWFzb24gPSAnJ1xuICBpZiAodmFsaWRhdGlvbi5ub25FbXB0eSAmJiAodmFsID09IG51bGwgfHwgdmFsID09ICcnKSkge1xuICAgIHJlYXNvbiA9IGBmaWVsZCBtYXkgbm90IGJlIGVtcHR5YFxuICAgIHZzdGF0dXMgPSBmYWxzZVxuICB9XG4gIGlmICh2YWxpZGF0aW9uLm1pbiAhPSBudWxsIHx8IHZhbGlkYXRpb24ubWF4ICE9IG51bGwpIHtcbiAgICBpZiAoaXNOYU4odmFsKSkge1xuICAgICAgcmVhc29uID0gYHZhbHVlIG11c3QgYmUgYSBudW1iZXJgXG4gICAgICB2c3RhdHVzID0gZmFsc2VcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBjb25zdCB2YWxuID0gcGFyc2VJbnQodmFsKVxuICAgICAgaWYgKCEodmFsaWRhdGlvbi5taW4gPD0gdmFsbikpIHtcbiAgICAgICAgcmVhc29uID0gYHZhbHVlIG11c3QgYmUgYXQgbGVhc3QgJHt2YWxpZGF0aW9uLm1pbn1gXG4gICAgICAgIHZzdGF0dXMgPSBmYWxzZVxuICAgICAgfVxuICAgICAgaWYgKCEodmFsaWRhdGlvbi5tYXggPj0gdmFsKSkge1xuICAgICAgICByZWFzb24gPSBgdmFsdWUgbXVzdCBiZSBhdCBtb3N0ICR7dmFsaWRhdGlvbi5tYXh9YFxuICAgICAgICB2c3RhdHVzID0gZmFsc2VcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgaWYgKHZhbFR5cGUgPT0gJ2RhdGV0aW1lJykge1xuICAgIGxldCB0aW1lc1xuICAgIHRyeSB7XG4gICAgICB0aW1lcyA9IERhdGUucGFyc2UodmFsKVxuICAgIH1cbiAgICBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHJlYXNvbiA9IGBub3QgYSB2YWxpZCBkYXRlL3RpbWUgLSAke2Vycm9yfWBcbiAgICAgIHZzdGF0dXMgPSBmYWxzZVxuICAgIH1cbiAgICBpZiAoaXNOYU4odGltZXMpKSB7XG4gICAgICByZWFzb24gPSBgbm90IGEgdmFsaWQgZGF0ZS90aW1lYFxuICAgICAgdnN0YXR1cyA9IGZhbHNlXG4gICAgfVxuICB9XG4gIHJldHVybiB7IHZzdGF0dXMsIHJlYXNvbiB9XG59XG5cbmNsYXNzIEl0ZW1GaWVsZCBleHRlbmRzIENvbXBvbmVudCB7XG5cbiAgaW5pdEVkaXQoaW5pdFZhbHVlcykge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgc2F2ZWRWYWx1ZXM6IGluaXRWYWx1ZXMgfHwgW10sXG4gICAgICBjdXJWYWx1ZXM6IFsuLi4oaW5pdFZhbHVlcyB8fCBbXSldLFxuICAgICAgc2F2aW5nOiB7fSxcbiAgICAgIGNoYW5nZWQ6IGZhbHNlLFxuICAgICAgdmFsaWQ6IHRydWUsXG4gICAgfSlcbiAgfVxuXG4gIHNldFZhbFRvU3RhdGUoaSwgbmV3VmFsLCBfaWQsIGRvU2F2ZSkge1xuICAgIGNvbnN0IHsgc3RhdGU6IHsgcmVhc29ucywgY3VyVmFsdWVzIH0gfSA9IHRoaXNcbiAgICBsZXQgbmV3UmVhc29uc1xuICAgIGxldCBuZXdWYWx1ZXMgPSBbLi4uY3VyVmFsdWVzXVxuICAgIGlmIChuZXdWYWwgPT0gbnVsbCkge1xuICAgICAgbmV3VmFsdWVzID0gbmV3VmFsdWVzLmZpbHRlcigoeCwgaikgPT4gaiAhPSBpKVxuICAgICAgbmV3UmVhc29ucyA9IHJlYXNvbnNcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBjb25zdCB7IHByb3BzOiB7IHZhbFR5cGUsIHZhbGlkYXRpb24gfSB9ID0gdGhpc1xuICAgICAgY29uc3QgeyB2c3RhdHVzLCByZWFzb24gfSA9IHZhbGlkYXRlKG5ld1ZhbCwgdmFsVHlwZSwgdmFsaWRhdGlvbilcbiAgICAgIGNvbnN0IHNlbmRWYWwgPSAodmFsVHlwZSA9PSAncmVsJykgPyAoKHR5cGVvZiBuZXdWYWwgIT0gJ3N0cmluZycpID8gbmV3VmFsIDogeyBfaWQsIHZhbHVlOiBuZXdWYWwgfSkgOiBuZXdWYWxcbiAgICAgIGlmICh2c3RhdHVzICYmIHZhbFR5cGUgPT0gJ3JlbCcgJiYgX2lkID09IG51bGwpIHtcbiAgICAgICAgLyogYWRkIG5ldyB2YWx1ZSB0byB2YWx1ZSBsaXN0XG4gICAgICAgICAqIGFzc3VtZSB0aGF0IGZpZWxkcyB0aGF0IGhhdmUgYWxsb3dOZXcsIGRvIG5vdCBoYXZlIGFuIGFzc29jaWF0ZWQgdmFsdWUgdGFibGUuXG4gICAgICAgICAqIFRoaXMgYXBwIGdsZWFucyB0aGUgdmFsdWUgb2Ygc3VjaCBmaWVsZHMgZnJvbSB0aGUgYWN0dWFsIHZhbHVlcyBlbmNvdW50ZXJlZCBpbiB0aGUgYmlnIHRhYmxlLlxuICAgICAgICAgKiBXZSBtYWludGFpbiB0aGUgcmVsYXRlZCB2YWx1ZXMgaW4gdGhlIHJlbFZhbHVlc01hcCwgc28gd2UgaGF2ZSB0byB1cGRhdGUgaXQgd2l0aCB7X2lkOiBudWxsLCB2YWx1ZTogc2VuZFZhbH1cbiAgICAgICAgICogV2hhdCBpZiB3ZSBoYXZlIG11bHRpcGxlIG5ldyB2YWx1ZXMsIGFsbCB3aXRoIF9pZDogbnVsbCwgd2lsbCB0aGF0IGdvIHdyb25nP1xuICAgICAgICAgKiBZZXMuXG4gICAgICAgICAqIEl0IGlzIGJldHRlciB0byBmZXRjaCB0aGUgcmVsVmFsdWVzIGFuZXcuXG4gICAgICAgICAqIEluIG9yZGVyIHRvIGRvIHRoaXMsIHdlIGRvIHR3byB0aGluZ3M6XG4gICAgICAgICAqIDEuIHNldCB0aGUgY3VycmVudCBzdGF0ZSBmb3IgcmVsVmFsdWVzIHRvIG51bGxcbiAgICAgICAgICogMi4gc2V0IHRoZSBwcm9wIHJlbFZhbHVlc01hcC50YWJsZS5uYW1lIHRvIG51bGxcbiAgICAgICAgICpcbiAgICAgICAgICogVGhpcyBpcyBzdXJwcmlzaW5nbHkgZGlmZmljdWx0IHRvIGFjaGlldmUuXG4gICAgICAgICAqIEFuZCBhIHNpbXBsZSByZWZyZXNoIGFsc28gc29sdmVzIHRoZSBwcm9ibGVtLlxuICAgICAgICAgKiBTbzogcHV0IGEgKGxpbWl0ZWQpIHJlZnJlc2ggYnV0dG9uIG9uIHRoZSBpbnRlcmZhY2UsIGFsc28gZm9yIHRoZSBmaWx0ZXJzLlxuICAgICAgICAgKi9cbiAgICAgIH1cbiAgICAgIGNvbnN0IHJlZkkgPSAoaSA9PSAtMSkgPyBuZXdWYWx1ZXMubGVuZ3RoIDogaVxuICAgICAgaWYgKGkgPT0gLTEpIHtuZXdWYWx1ZXMucHVzaChzZW5kVmFsKX1cbiAgICAgIGVsc2Uge25ld1ZhbHVlc1tpXSA9IHNlbmRWYWx9XG4gICAgICBuZXdSZWFzb25zID0gey4uLnJlYXNvbnMsIFtyZWZJXTogcmVhc29ufVxuICAgIH1cbiAgICBjb25zdCB7IHZhbGlkLCBjaGFuZ2VkIH0gPSB0aGlzLmNoZWNrRm9yU2F2ZSh7IG5ld1ZhbHVlcywgbmV3UmVhc29ucyB9KVxuICAgIGlmICghZG9TYXZlIHx8ICF2YWxpZCB8fCAhY2hhbmdlZCkge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIGN1clZhbHVlczogbmV3VmFsdWVzLFxuICAgICAgICByZWFzb25zOiBuZXdSZWFzb25zLFxuICAgICAgICBzYXZpbmc6IHt9LFxuICAgICAgICB2YWxpZCxcbiAgICAgICAgY2hhbmdlZCxcbiAgICAgIH0pXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdGhpcy50b0RiKG5ld1ZhbHVlcylcbiAgICB9XG4gIH1cblxuICBrZXlVcCA9IGkgPT4gZXZlbnQgPT4ge1xuICAgIGlmIChldmVudC5rZXlDb2RlID09PSAxMykge1xuICAgICAgZXZlbnQudGFyZ2V0LmJsdXIoKVxuICAgICAgdGhpcy5zZXRWYWxUb1N0YXRlKGksIGV2ZW50LnRhcmdldC52YWx1ZSwgbnVsbCwgdHJ1ZSlcbiAgICB9XG4gIH1cblxuICBjaGFuZ2VWYWwgPSBpID0+IGV2ZW50ID0+IHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgdGhpcy5zZXRWYWxUb1N0YXRlKGksIGV2ZW50LnRhcmdldC52YWx1ZSwgbnVsbCwgZmFsc2UpXG4gIH1cblxuICBjaGFuZ2VSZWxWYWwgPSBpID0+IChfaWQsIHZhbHVlKSA9PiB7XG4gICAgdGhpcy5zZXRWYWxUb1N0YXRlKGksIHZhbHVlLCBfaWQsIHRydWUpXG4gIH1cblxuICByZW1vdmVWYWwgPSBpID0+IGV2ZW50ID0+IHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgdGhpcy5zZXRWYWxUb1N0YXRlKGksIG51bGwsIG51bGwsIHRydWUpXG4gIH1cblxuICBjaGVja0ZvclNhdmUoaW5mbykge1xuICAgIGNvbnN0IHsgbmV3VmFsdWVzLCBuZXdSZWFzb25zIH0gPSBpbmZvXG4gICAgY29uc3Qge1xuICAgICAgcHJvcHM6IHsgbmFtZSwgdXBkRWRpdCB9LFxuICAgICAgc3RhdGU6IHsgc2F2ZWRWYWx1ZXMgfSxcbiAgICB9ID0gdGhpc1xuICAgIGNvbnN0IHZhbGlkID0gT2JqZWN0LmtleXMobmV3UmVhc29ucykuZXZlcnkoaSA9PiAhbmV3UmVhc29uc1tpXSlcbiAgICBsZXQgY2hhbmdlZCA9IGZhbHNlXG4gICAgaWYgKG5ld1ZhbHVlcy5sZW5ndGggIT0gc2F2ZWRWYWx1ZXMubGVuZ3RoKSB7XG4gICAgICBjaGFuZ2VkID0gdHJ1ZVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGZvciAoY29uc3QgaSBpbiBuZXdWYWx1ZXMpIHtcbiAgICAgICAgY29uc3QgeyBbaV06IGN2IH0gPSBuZXdWYWx1ZXNcbiAgICAgICAgY29uc3QgeyBbaV06IHN2IH0gPSBzYXZlZFZhbHVlc1xuICAgICAgICBpZiAoc3YgPT0gbnVsbCkge1xuICAgICAgICAgIGNoYW5nZWQgPSB0cnVlXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodHlwZW9mIGN2ID09ICdvYmplY3QnKSB7XG4gICAgICAgICAgZm9yIChjb25zdCBrIG9mIE9iamVjdC5rZXlzKGN2KSkge1xuICAgICAgICAgICAgaWYgKGN2W2tdICE9IHN2W2tdKSB7XG4gICAgICAgICAgICAgIGNoYW5nZWQgPSB0cnVlXG4gICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGlmIChjdiAhPSBzdikge1xuICAgICAgICAgICAgY2hhbmdlZCA9IHRydWVcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNoYW5nZWQpIHtcbiAgICAgICAgICBicmVha1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHVwZEVkaXQobmFtZSwgY2hhbmdlZCwgdmFsaWQsIG5ld1ZhbHVlcylcbiAgICByZXR1cm4geyB2YWxpZCwgY2hhbmdlZCB9XG4gIH1cblxuICBzYXZlRmllbGQgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBzdGF0ZTogeyB2YWxpZCwgY2hhbmdlZCwgc2F2aW5nIH0gfSA9IHRoaXNcbiAgICBpZiAodmFsaWQgJiYgY2hhbmdlZCAmJiAhc2F2aW5nLnN0YXR1cykge1xuICAgICAgdGhpcy50b0RiKClcbiAgICB9XG4gIH1cblxuICBzYXZlZCA9IGRhdGEgPT4ge1xuICAgIGNvbnN0IHsgcHJvcHM6IHsgbmFtZSwgdXBkTW9kLCB1cGRFZGl0IH0gfSA9IHRoaXNcbiAgICBpZiAoZGF0YSA9PSBudWxsKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgc2F2aW5nOiB7c3RhdHVzOiAnZXJyb3InfSxcbiAgICAgIH0pXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgY29uc3QgeyBbbmFtZV06IG5ld1ZhbHVlcywgLi4ubW9kVmFsdWVzIH0gPSBkYXRhXG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgc2F2aW5nOiB7c3RhdHVzOiAnc2F2ZWQnfSxcbiAgICAgICAgc2F2ZWRWYWx1ZXM6IG5ld1ZhbHVlcyxcbiAgICAgICAgY3VyVmFsdWVzOiBuZXdWYWx1ZXMsXG4gICAgICAgIGNoYW5nZWQ6IGZhbHNlLFxuICAgICAgICB2YWxpZDogdHJ1ZSxcbiAgICAgIH0pXG4gICAgICB1cGRNb2QobW9kVmFsdWVzKVxuICAgICAgdXBkRWRpdChuYW1lLCBmYWxzZSwgdHJ1ZSwgbmV3VmFsdWVzKVxuICAgIH1cbiAgfVxuXG4gIHRvRGIobmV3VmFsdWVzKSB7XG4gICAgY29uc3Qge1xuICAgICAgcHJvcHM6IHsgdGFibGUsIG5hbWUsIHJvd0lkLCBub3RpZmljYXRpb24gfSxcbiAgICAgIHN0YXRlOiB7IGN1clZhbHVlcyB9LFxuICAgIH0gPSB0aGlzXG4gICAgY29uc3Qgc2VuZFZhbHVlcyA9IChuZXdWYWx1ZXMgPT0gbnVsbCkgPyBjdXJWYWx1ZXMgOiBuZXdWYWx1ZXNcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHJlYXNvbnM6IHt9LFxuICAgICAgc2F2aW5nOiB7c3RhdHVzOiAnc2F2aW5nJ30sXG4gICAgfSlcbiAgICBnZXREYXRhKFxuICAgICAgW1xuICAgICAgICB7XG4gICAgICAgICAgdHlwZTogJ2RiJyxcbiAgICAgICAgICBwYXRoOiBgL21vZD90YWJsZT0ke3RhYmxlfSZhY3Rpb249dXBkYXRlYCxcbiAgICAgICAgICBicmFuY2g6IGBzYXZlICR7bmFtZX1gLFxuICAgICAgICAgIGNhbGxiYWNrOiB0aGlzLnNhdmVkLFxuICAgICAgICAgIGRhdGE6IHtfaWQ6IHJvd0lkLCBuYW1lLCB2YWx1ZXM6IHNlbmRWYWx1ZXN9LFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICAgIHRoaXMsXG4gICAgICBub3RpZmljYXRpb24uY29tcG9uZW50XG4gICAgKVxuICB9XG5cbiAgZnVsbGZpbGxTYXZlKCkge1xuICAgIGNvbnN0IHsgcHJvcHM6IHsgZWRpdGFibGUsIHNhdmVDb25jZXJuIH0gfSA9IHRoaXNcbiAgICBpZiAoZWRpdGFibGUgJiYgc2F2ZUNvbmNlcm4pIHt0aGlzLnNhdmVGaWVsZCgpfVxuICB9XG5cbiAgdmFsdWVBc1N0cmluZyh2YWxSYXcpIHtcbiAgICBjb25zdCB7IHByb3BzOiB7IHZhbFR5cGUsIGNvbnZlcnQsIHVzZXIsIGNvdW50cnksIGluaXRpYWwgfSB9ID0gdGhpc1xuICAgIGlmICh2YWxSYXcgPT0gbnVsbCkge3JldHVybiB7IHRleHQ6ICcnLCBmdWxsOiAnJywgaW5pdGlhbDogKHZhbFR5cGUgPT0gJ3JlbCcpID8gdHJ1ZSA6IGluaXRpYWwgfX1cbiAgICBzd2l0Y2ggKHZhbFR5cGUpIHtcbiAgICAgIGNhc2UgJ3JlbCc6IHtcbiAgICAgICAgc3dpdGNoIChjb252ZXJ0KSB7XG4gICAgICAgICAgY2FzZSAndXNlcic6IHtcbiAgICAgICAgICAgIHJldHVybiB1c2VyQXNTdHJpbmcodmFsUmF3LCB1c2VyKVxuICAgICAgICAgIH1cbiAgICAgICAgICBjYXNlICdjb3VudHJ5Jzoge1xuICAgICAgICAgICAgcmV0dXJuIGNvdW50cnlBc1N0cmluZyh2YWxSYXcsIGNvdW50cnkpXG4gICAgICAgICAgfVxuICAgICAgICAgIGRlZmF1bHQ6IHtyZXR1cm4gY29uZGVuc2UodmFsUmF3LnZhbHVlKX1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgY2FzZSAnZGF0ZXRpbWUnOiB7XG4gICAgICAgIHJldHVybiB0cmltRGF0ZSh2YWxSYXcpXG4gICAgICB9XG4gICAgICBkZWZhdWx0OiB7XG4gICAgICAgIHJldHVybiB7dGV4dDogdmFsUmF3LCBmdWxsOiB2YWxSYXd9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgdXJsRnJhZ21lbnQgPSAoaSwgdmFsVHlwZSwgdmFsVGV4dCkgPT4ge1xuICAgIGNvbnN0IHsgdGV4dCwgZnVsbCB9ID0gdmFsVGV4dFxuICAgIHJldHVybiA8YSBrZXk9e2l9IHRhcmdldD1cIl9ibGFua1wiIHJlbD1cIm5vb3BlbmVyIG5vcmVmZXJyZXJcIiBocmVmPXtmdWxsfSBjbGFzc05hbWU9XCJsaW5rXCIgPnt0ZXh0fTwvYT5cbiAgfVxuICBlbWFpbEZyYWdtZW50ID0gKGksIHZhbFR5cGUsIHZhbFRleHQpID0+IHtcbiAgICBjb25zdCB7IGZ1bGwgfSA9IHZhbFRleHRcbiAgICByZXR1cm4gPGEga2V5PXtpfSB0YXJnZXQ9XCJfYmxhbmtcIiByZWw9XCJub29wZW5lciBub3JlZmVycmVyXCIgaHJlZj17YG1haWx0bzoke2Z1bGx9YH0gY2xhc3NOYW1lPVwibGlua1wiID57ZnVsbH08L2E+XG4gIH1cbiAgdGV4dGFyZWFGcmFnbWVudCA9IChpLCB2YWxUeXBlLCB2YWxUZXh0KSA9PiB7XG4gICAgY29uc3QgeyBmdWxsIH0gPSB2YWxUZXh0XG4gICAgcmV0dXJuIChcbiAgICAgIDxNYXJrZG93blxuICAgICAgICBrZXk9e2l9XG4gICAgICAgIHNvdXJjZT17ZnVsbH1cbiAgICAgIC8+XG4gICAgKVxuICB9XG4gIGRlZmF1bHRGcmFnbWVudCA9IChpLCB2YWxUeXBlLCB2YWxUZXh0KSA9PiB7XG4gICAgY29uc3QgeyB0ZXh0LCBmdWxsIH0gPSB2YWxUZXh0XG4gICAgY29uc3QgY2wgPSBgJHsodmFsVHlwZSA9PSAncmVsJykgPyAndGFnJyA6ICd2YXJpYSd9LW1lZGl1bWBcbiAgICByZXR1cm4gPHNwYW4ga2V5PXtpfSBjbGFzc05hbWU9e2NsfSB0aXRsZT17ZnVsbH0gPnt0ZXh0fTwvc3Bhbj5cbiAgfVxuXG4gIHJlbE9wdGlvbnMoKSB7XG4gICAgY29uc3QgeyBzdGF0ZTogeyByZWxWYWx1ZXMgfSB9ID0gdGhpc1xuICAgIHJldHVybiByZWxWYWx1ZXMubWFwKHJ2ID0+IFtydi5faWQsIGNvbmRlbnNlKHJ2LnZhbHVlKV0pXG4gIH1cbiAgdXNlck9wdGlvbnMoKSB7XG4gICAgY29uc3QgeyBwcm9wczogeyB1c2VyIH0gfSA9IHRoaXNcbiAgICByZXR1cm4gWy4uLnVzZXJdLm1hcChydiA9PiBbcnYuX2lkLCB0aGlzLnZhbHVlQXNTdHJpbmcocnYpXSlcbiAgfVxuICBjb3VudHJ5T3B0aW9ucygpIHtcbiAgICBjb25zdCB7IHByb3BzOiB7IGNvdW50cnkgfSB9ID0gdGhpc1xuICAgIHJldHVybiBbLi4uY291bnRyeV0ubWFwKHJ2ID0+IFtydi5faWQsIHRoaXMudmFsdWVBc1N0cmluZyhydildKVxuICB9XG5cbiAgcmVsU2VsZWN0KGksIF9pZCwgaXNOZXcsIGV4dHJhQ2xhc3NlcywgdmFsVGV4dCkge1xuICAgIGNvbnN0IHsgdGV4dCwgZnVsbCB9ID0gdmFsVGV4dFxuICAgIGNvbnN0IHtcbiAgICAgIHByb3BzOiB7IHRhYmxlLCBjb252ZXJ0LCBhbGxvd05ldywgbmFtZSwgcm93SWQgfSxcbiAgICAgIHN0YXRlOiB7IHZhbGlkIH0sXG4gICAgfSA9IHRoaXNcbiAgICBjb25zdCB2YWx1ZUxpc3QgPSAoY29udmVydCA9PSAndXNlcicpID8gdGhpcy51c2VyT3B0aW9ucygpIDogKChjb252ZXJ0ID09ICdjb3VudHJ5JykgPyB0aGlzLmNvdW50cnlPcHRpb25zKCkgOiB0aGlzLnJlbE9wdGlvbnMoKSlcbiAgICByZXR1cm4gKFxuICAgICAgPFJlbFNlbGVjdFxuICAgICAgICB0YWc9e2ByZWxzZWxlY3RfJHt0YWJsZX1fJHtyb3dJZH1fJHtuYW1lfV8ke2l9YH1cbiAgICAgICAgdGFibGU9e3RhYmxlfVxuICAgICAgICBrZXk9e2l9XG4gICAgICAgIGlzTmV3PXtpc05ld31cbiAgICAgICAgYWxsb3dOZXc9e2FsbG93TmV3fVxuICAgICAgICB2YWxpZD17dmFsaWR9XG4gICAgICAgIHZhbHVlTGlzdD17dmFsdWVMaXN0fVxuICAgICAgICBpbml0VmFsPXtfaWR9XG4gICAgICAgIGluaXRUZXh0PXt0ZXh0fVxuICAgICAgICBpbml0RnVsbD17ZnVsbH1cbiAgICAgICAgZXh0cmFDbGFzc2VzPXtleHRyYUNsYXNzZXN9XG4gICAgICAgIG9uQ2hhbmdlPXttZW1vQmluZCh0aGlzLCAnY2hhbmdlUmVsVmFsJywgW2ldKX1cbiAgICAgIC8+XG4gICAgKVxuICB9XG4gIGVkaXRWYWxDb250cm9sKGksIF9pZCwgaXNOZXcpIHtcbiAgICBjb25zdCB7IHByb3BzOiB7IG11bHRpcGxlIH0gfSA9IHRoaXNcbiAgICByZXR1cm4gKGlzTmV3IHx8ICFtdWx0aXBsZSkgPyBudWxsIDogKFxuICAgICAgPHNwYW5cbiAgICAgICAgY2xhc3NOYW1lPVwiYnV0dG9uLXNtYWxsIGZhIGZhLWNsb3NlXCJcbiAgICAgICAgb25DbGljaz17bWVtb0JpbmQodGhpcywgJ3JlbW92ZVZhbCcsIFtpXSl9XG4gICAgICAvPlxuICAgIClcbiAgfVxuXG4gIHJlbEVkaXRGcmFnbWVudCA9IChpLCBfaWQsIGlzTmV3LCB2YWxUeXBlLCBleHRyYUNsYXNzZXMsIHZhbFRleHQpID0+IHtcbiAgICBjb25zdCB7IHRleHQsIGZ1bGwgfSA9IHZhbFRleHRcbiAgICBjb25zdCB7IHByb3BzOiB7IG11bHRpcGxlIH0gfSA9IHRoaXNcbiAgICByZXR1cm4gKCghbXVsdGlwbGUgJiYgaSA9PSAwKSB8fCBpc05ldykgPyAoXG4gICAgICB0aGlzLnJlbFNlbGVjdChpLCBfaWQsIGlzTmV3LCBleHRyYUNsYXNzZXMsIHZhbFRleHQpXG4gICAgKSA6IChcbiAgICAgIDxzcGFuIGtleT17aX0gY2xhc3NOYW1lPVwidGFnLW1lZGl1bVwiIHRpdGxlPXtmdWxsfSA+e3RleHR9eycgJ31cbiAgICAgICAge3RoaXMuZWRpdFZhbENvbnRyb2woaSwgX2lkLCBpc05ldyl9XG4gICAgICA8L3NwYW4+XG4gICAgKVxuICB9XG4gIHRleHRBcmVhQ29udHJvbFBsYWNlbWVudCA9IGNvbnRyb2wgPT4gPHAgY2xhc3NOYW1lPVwic3RpY2tcIiA+e2NvbnRyb2x9PC9wPlxuICB0ZXh0QXJlYUNvbnRyb2wxID0gaGFuZGxlciA9PiA8c3BhbiBjbGFzc05hbWU9XCJidXR0b24tc21hbGwgZmEgZmEtcGVuY2lsXCIgb25DbGljaz17aGFuZGxlcn0gLz5cbiAgdGV4dEFyZWFDb250cm9sMiA9IGhhbmRsZXIgPT4gPHNwYW4gY2xhc3NOYW1lPVwiYnV0dG9uLXNtYWxsIGZhIGZhLWhhbmQtby1kb3duXCIgb25DbGljaz17aGFuZGxlcn0gLz5cblxuICB0ZXh0YXJlYUVkaXRGcmFnbWVudCA9IChpLCBfaWQsIGlzTmV3LCB2YWxUeXBlLCBleHRyYUNsYXNzZXMsIHZhbFRleHQsIGNvbHMgPSAxMDAsIHJvd3MgPSAxMCkgPT4ge1xuICAgIGNvbnN0IHsgcHJvcHM6IHsgdGFibGUsIHJvd0lkLCBuYW1lIH0gfSA9IHRoaXNcbiAgICBjb25zdCB7IGZ1bGwgfSA9IHZhbFRleHRcbiAgICB0aGlzLnNhdmVMYXRlciA9IHRydWVcbiAgICByZXR1cm4gKFxuICAgICAgPEFsdGVybmF0aXZlXG4gICAgICAgIGtleT17aX1cbiAgICAgICAgdGFnPXtgbWRfJHt0YWJsZX1fJHtyb3dJZH1fJHtuYW1lfWB9XG4gICAgICAgIGNvbnRyb2xQbGFjZW1lbnQ9e3RoaXMudGV4dEFyZWFDb250cm9sUGxhY2VtZW50fVxuICAgICAgICBjb250cm9scz17W3RoaXMudGV4dEFyZWFDb250cm9sMSwgdGhpcy50ZXh0QXJlYUNvbnRyb2wyXX1cbiAgICAgICAgYWx0ZXJuYXRpdmVzPXtbXG4gICAgICAgICAgPE1hcmtkb3duXG4gICAgICAgICAgICBrZXk9XCJmbXRcIlxuICAgICAgICAgICAgc291cmNlPXtmdWxsfVxuICAgICAgICAgIC8+LFxuICAgICAgICAgIDxzcGFuIGtleT1cInNyY1wiID5cbiAgICAgICAgICAgIDx0ZXh0YXJlYVxuICAgICAgICAgICAgICBjbGFzc05hbWU9e2BpbnB1dCAke3ZhbFR5cGV9ICR7ZXh0cmFDbGFzc2VzLmpvaW4oJyAnKX1gfVxuICAgICAgICAgICAgICB2YWx1ZT17ZnVsbH1cbiAgICAgICAgICAgICAgY29scz17Y29sc31cbiAgICAgICAgICAgICAgcm93cz17cm93c31cbiAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9e3ZhbFRleHQuaW5pdGlhbH1cbiAgICAgICAgICAgICAgd3JhcD1cInNvZnRcIlxuICAgICAgICAgICAgICBvbkNoYW5nZT17bWVtb0JpbmQodGhpcywgJ2NoYW5nZVZhbCcsIFtpXSl9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAge3RoaXMuZWRpdFZhbENvbnRyb2woaSwgX2lkLCBpc05ldyl9XG4gICAgICAgICAgPC9zcGFuPixcbiAgICAgICAgXX1cbiAgICAgICAgaW5pdGlhbD17MH1cbiAgICAgIC8+XG4gICAgKVxuICB9XG4gIGRlZmF1bHRFZGl0RnJhZ21lbnQgPSAoaSwgX2lkLCBpc05ldywgdmFsVHlwZSwgZXh0cmFDbGFzc2VzLCB2YWxUZXh0LCBzaXplID0gNTApID0+IHtcbiAgICBjb25zdCB7IGZ1bGwgfSA9IHZhbFRleHRcbiAgICB0aGlzLnNhdmVMYXRlciA9IHRydWVcbiAgICByZXR1cm4gKFxuICAgICAgPHNwYW4ga2V5PXtpfSA+XG4gICAgICAgIDxpbnB1dFxuICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICBjbGFzc05hbWU9e2BpbnB1dCAke3ZhbFR5cGV9ICR7ZXh0cmFDbGFzc2VzLmpvaW4oJyAnKX1gfVxuICAgICAgICAgIHZhbHVlPXtmdWxsfVxuICAgICAgICAgIHBsYWNlaG9sZGVyPXt2YWxUZXh0LmluaXRpYWx9XG4gICAgICAgICAgc2l6ZT17c2l6ZX1cbiAgICAgICAgICBvbkNoYW5nZT17bWVtb0JpbmQodGhpcywgJ2NoYW5nZVZhbCcsIFtpXSl9XG4gICAgICAgICAgb25LZXlVcD17bWVtb0JpbmQodGhpcywgJ2tleVVwJywgW2ldKX1cbiAgICAgICAgLz5cbiAgICAgICAge3RoaXMuZWRpdFZhbENvbnRyb2woaSwgX2lkLCBpc05ldyl9XG4gICAgICA8L3NwYW4+XG4gICAgKVxuICB9XG5cbiAgcmVhZG9ubHlNYWtlRnJhZ21lbnQgPSB2YWxUeXBlID0+IHtcbiAgICBpZiAodmFsVHlwZSA9PSAndXJsJykge3JldHVybiB0aGlzLnVybEZyYWdtZW50fVxuICAgIGlmICh2YWxUeXBlID09ICdlbWFpbCcpIHtyZXR1cm4gdGhpcy5lbWFpbEZyYWdtZW50fVxuICAgIGlmICh2YWxUeXBlID09ICd0ZXh0YXJlYScpIHtyZXR1cm4gdGhpcy50ZXh0YXJlYUZyYWdtZW50fVxuICAgIHJldHVybiB0aGlzLmRlZmF1bHRGcmFnbWVudFxuICB9XG5cbiAgZWRpdE1ha2VGcmFnbWVudCA9IHZhbFR5cGUgPT4ge1xuICAgIGlmICh2YWxUeXBlID09ICdyZWwnKSB7cmV0dXJuIHRoaXMucmVsRWRpdEZyYWdtZW50fVxuICAgIGlmICh2YWxUeXBlID09ICd0ZXh0YXJlYScpIHtyZXR1cm4gdGhpcy50ZXh0YXJlYUVkaXRGcmFnbWVudH1cbiAgICByZXR1cm4gdGhpcy5kZWZhdWx0RWRpdEZyYWdtZW50XG4gIH1cblxuICBwcm9nSWNvbigpIHtcbiAgICBjb25zdCB7IHByb3BzOiB7IGVkaXRhYmxlIH0gfSA9IHRoaXNcbiAgICBsZXQgcHJvZ0ljb25cbiAgICBpZiAoZWRpdGFibGUpIHtcbiAgICAgIGNvbnN0IHsgc3RhdGU6IHsgc2F2aW5nOiB7IHN0YXR1cyB9LCBjaGFuZ2VkLCB2YWxpZCB9IH0gPSB0aGlzXG4gICAgICBpZiAoc3RhdHVzID09ICdzYXZpbmcnKSB7cHJvZ0ljb24gPSAnZmEtc3Bpbm5lciBmYS1zcGluJ31cbiAgICAgIGVsc2UgaWYgKHN0YXR1cyA9PSAnc2F2ZWQnKSB7cHJvZ0ljb24gPSAnZmEtY2hlY2sgZ29vZCd9XG4gICAgICBlbHNlIGlmIChzdGF0dXMgPT0gJ2Vycm9yJykge3Byb2dJY29uID0gJ2ZhLWV4Y2xhbWF0aW9uIGVycm9yJ31cbiAgICAgIGVsc2UgaWYgKCF2YWxpZCkge3Byb2dJY29uID0gJ2ZhLWNsb3NlIGVycm9yJ31cbiAgICAgIGVsc2UgaWYgKGNoYW5nZWQpIHtwcm9nSWNvbiA9ICdmYS1wZW5jaWwgd2FybmluZyd9XG4gICAgICBlbHNlIHtwcm9nSWNvbiA9ICdmYS1jaXJjbGUtbyBoaWRkZW4nfVxuICAgICAgcHJvZ0ljb24gKz0gJyBmYSBwcm9ncmVzcydcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBwcm9nSWNvbiA9ICdmYSBmYS1sb2NrIHByb2dyZXNzIGluZm8nXG4gICAgfVxuICAgIHJldHVybiAoPHNwYW4ga2V5PXtuYW1lfSBjbGFzc05hbWU9e3Byb2dJY29ufSAvPilcbiAgfVxuXG4gIHZhbHVlc0FzUmVhZG9ubHkoKSB7XG4gICAgY29uc3QgeyBzdGF0ZTogeyBjdXJWYWx1ZXMgfSB9ID0gdGhpc1xuICAgIGlmIChjdXJWYWx1ZXMubGVuZ3RoID09IDApIHtyZXR1cm4gPHNwYW4gY2xhc3NOYW1lPVwid2FybmluZ1wiID57J25vIHZhbHVlJ308L3NwYW4+fVxuICAgIGNvbnN0IHsgcHJvcHM6IHsgdmFsVHlwZSwgbXVsdGlwbGUsIGFwcGVhcmFuY2U6IHsgY3V0b2ZmLCByZXZlcnNlIH0gfSB9ID0gdGhpc1xuICAgIGNvbnN0IG1ha2VGcmFnbWVudCA9IG1lbW9CaW5kKHRoaXMsICdyZWFkb25seU1ha2VGcmFnbWVudCcsIFt2YWxUeXBlXSlcbiAgICBjb25zdCBhbHQyID0gW11cbiAgICBjb25zdCBhbHQxID0gW11cbiAgICBhbHQxLnB1c2goJyAnKVxuICAgIGNvbnN0IHByb2Nlc3NWYWx1ZXMgPSByZXZlcnNlID8gWy4uLmN1clZhbHVlc10ucmV2ZXJzZSgpIDogY3VyVmFsdWVzXG4gICAgcHJvY2Vzc1ZhbHVlcy5mb3JFYWNoKCh2LCBpKSA9PiB7XG4gICAgICBjb25zdCBkZXN0QWx0ID0gKCFjdXRvZmYgfHwgaSA8PSBjdXRvZmYgLSAxKSA/IGFsdDEgOiBhbHQyXG4gICAgICBjb25zdCB2YWxUZXh0ID0gdGhpcy52YWx1ZUFzU3RyaW5nKHYpXG4gICAgICBjb25zdCBmcmFnbWVudCA9IG1ha2VGcmFnbWVudChpLCB2YWxUeXBlLCB2YWxUZXh0KVxuICAgICAgaWYgKG11bHRpcGxlIHx8IGkgPT0gMCkge2Rlc3RBbHQucHVzaChmcmFnbWVudCl9XG4gICAgICBpZiAobXVsdGlwbGUpIHtkZXN0QWx0LnB1c2goJyAnKX1cbiAgICB9KVxuICAgIHJldHVybiB0aGlzLmtuZWFkKGFsdDEsIGFsdDIpXG4gIH1cblxuICB2YWx1ZXNBc0NvbnRyb2xzKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIHByb3BzOiB7IHZhbFR5cGUsIG11bHRpcGxlLCBhcHBlYXJhbmNlOiB7IGN1dG9mZiwgcmV2ZXJzZSB9IH0sXG4gICAgICBzdGF0ZTogeyBjdXJWYWx1ZXMsIHJlYXNvbnMgfSxcbiAgICB9ID0gdGhpc1xuICAgIGNvbnN0IG1ha2VGcmFnbWVudCA9IG1lbW9CaW5kKHRoaXMsICdlZGl0TWFrZUZyYWdtZW50JywgW3ZhbFR5cGVdKVxuICAgIGNvbnN0IGFsdDIgPSBbXVxuICAgIGNvbnN0IGFsdDEgPSBbXVxuICAgIGNvbnN0IGVudW1DdXJWYWx1ZXMgPSBjdXJWYWx1ZXMubWFwKCh2LCBpKSA9PiBbaSwgdl0pXG4gICAgY29uc3QgeyBsZW5ndGg6IG5WYWx1ZXMgfSA9IGN1clZhbHVlc1xuICAgIGNvbnN0IHByb2Nlc3NWYWx1ZXMgPSByZXZlcnNlID8gZW51bUN1clZhbHVlcy5yZXZlcnNlKCkgOiBlbnVtQ3VyVmFsdWVzXG4gICAgaWYgKG11bHRpcGxlIHx8IG5WYWx1ZXMgPT0gMCkge1xuICAgICAgcHJvY2Vzc1ZhbHVlcy5wdXNoKFtuVmFsdWVzLCBudWxsXSlcbiAgICB9XG4gICAgY29uc3Qgc2l6ZSA9IHNpemVzW3ZhbFR5cGVdIHx8IHNpemVzLl9tYXhcbiAgICBsZXQgZGVzdEFsdCA9IGFsdDFcbiAgICBsZXQgZXh0cmFDbGFzc2VzID0gW11cbiAgICBwcm9jZXNzVmFsdWVzLmZvckVhY2goKGV2LCBqKSA9PiB7XG4gICAgICBjb25zdCBbaSwgdl0gPSBldlxuICAgICAgY29uc3QgaXNOZXcgPSBqID09IG5WYWx1ZXNcbiAgICAgIGRlc3RBbHQgPSAoIWN1dG9mZiB8fCBqIDw9IGN1dG9mZiAtIDEpID8gYWx0MSA6IGFsdDJcbiAgICAgIGNvbnN0IHZhbFRleHQgPSB0aGlzLnZhbHVlQXNTdHJpbmcodilcbiAgICAgIGNvbnN0IF9pZCA9ICh2ID09IG51bGwpID8gbnVsbCA6IHYuX2lkXG4gICAgICBleHRyYUNsYXNzZXMgPSBbXVxuICAgICAgY29uc3QgcmVhc29uID0gcmVhc29uc1tpXSB8fCAnJ1xuICAgICAgaWYgKHJlYXNvbiAhPSAnJykge1xuICAgICAgICBleHRyYUNsYXNzZXMucHVzaCgnZXJyb3InKVxuICAgICAgfVxuICAgICAgY29uc3QgZnJhZ21lbnQgPSBtYWtlRnJhZ21lbnQoaSwgX2lkLCBpc05ldywgdmFsVHlwZSwgZXh0cmFDbGFzc2VzLCB2YWxUZXh0LCBzaXplKVxuICAgICAgaWYgKG11bHRpcGxlIHx8IGogPT0gMCkge1xuICAgICAgICBkZXN0QWx0LnB1c2goZnJhZ21lbnQpXG4gICAgICAgIGlmIChyZWFzb24gIT0gJycpIHtcbiAgICAgICAgICBkZXN0QWx0LnB1c2goJyAnKVxuICAgICAgICAgIGRlc3RBbHQucHVzaCg8c3BhbiBrZXk9e2ByXyR7aX1gfSBjbGFzc05hbWU9XCJyZWFzb25cIiA+e3JlYXNvbn08L3NwYW4+KVxuICAgICAgICB9XG4gICAgICAgIGRlc3RBbHQucHVzaCgnICcpXG4gICAgICB9XG4gICAgfSlcbiAgICByZXR1cm4gdGhpcy5rbmVhZChhbHQxLCBhbHQyKVxuICB9XG5cbiAga25lYWRDb250cm9sUGxhY2VtZW50ID0gYWx0MSA9PiBjb250cm9sID0+IDxzcGFuPnthbHQxfXsnICd9e2NvbnRyb2x9PC9zcGFuPlxuICBrbmVhZENvbnRyb2wxID0gaGFuZGxlciA9PiA8c3BhbiBjbGFzc05hbWU9XCJidXR0b24tc21hbGxcIiBvbkNsaWNrPXtoYW5kbGVyfSA+eydzaG93IG1vcmUnfTwvc3Bhbj5cbiAga25lYWRDb250cm9sMiA9IGhhbmRsZXIgPT4gPHNwYW4gY2xhc3NOYW1lPVwiYnV0dG9uLXNtYWxsXCIgb25DbGljaz17aGFuZGxlcn0gPnsnc2hvdyBsZXNzJ308L3NwYW4+XG5cbiAga25lYWQoYWx0MSwgYWx0Mikge1xuICAgIGNvbnN0IHsgcHJvcHM6IHsgdGFibGUsIHJvd0lkLCBuYW1lIH0gfSA9IHRoaXNcbiAgICBpZiAoYWx0Mi5sZW5ndGggPT0gMCkge3JldHVybiBhbHQxfVxuICAgIHJldHVybiAoXG4gICAgICA8QWx0ZXJuYXRpdmVcbiAgICAgICAgdGFnPXtgZmllbGRfJHt0YWJsZX1fJHtyb3dJZH1fJHtuYW1lfWB9XG4gICAgICAgIGNvbnRyb2xQbGFjZW1lbnQ9e21lbW9CaW5kKHRoaXMsICdrbmVhZENvbnRyb2xQbGFjZW1lbnQnLCBbXSwgW2FsdDFdKX1cbiAgICAgICAgY29udHJvbHM9e1t0aGlzLmtuZWFkQ29udHJvbDEsIHRoaXMua25lYWRDb250cm9sMl19XG4gICAgICAgIGFsdGVybmF0aXZlcz17WycnLCBhbHQyXX1cbiAgICAgICAgaW5pdGlhbD17MH1cbiAgICAgIC8+XG4gICAgKVxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIHByb3BzOiB7IGxhYmVsLCBlZGl0YWJsZSwgdmFsVHlwZSwgY29udmVydCB9LFxuICAgICAgc3RhdGU6IHsgcmVsVmFsdWVzIH0sXG4gICAgfSA9IHRoaXNcbiAgICBpZiAoZWRpdGFibGUgJiYgcmVsVmFsdWVzID09IG51bGwgJiYgdmFsVHlwZSA9PSAncmVsJyAmJiBjb252ZXJ0ICE9ICd1c2VyJyAmJiBjb252ZXJ0ICE9ICdjb3VudHJ5Jykge1xuICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG4gICAgY29uc3QgcHJvZyA9IHRoaXMucHJvZ0ljb24oKVxuICAgIGNvbnN0IHZhbHVlcyA9IGVkaXRhYmxlID8gdGhpcy52YWx1ZXNBc0NvbnRyb2xzKCkgOiB0aGlzLnZhbHVlc0FzUmVhZG9ubHkoKVxuICAgIGNvbnN0IG9uQ2xpY2sgPSAoZWRpdGFibGUgJiYgdGhpcy5zYXZlTGF0ZXIpID8ge29uQ2xpY2s6IHRoaXMuc2F2ZUZpZWxkfSA6IHt9XG4gICAgcmV0dXJuIChcbiAgICAgIDx0cj5cbiAgICAgICAgPHRkIGNsYXNzTmFtZT1cImxhYmVsXCIgey4uLm9uQ2xpY2t9ID57bGFiZWx9PC90ZD5cbiAgICAgICAgPHRkIGNsYXNzTmFtZT1cImxhYmVsXCIgey4uLm9uQ2xpY2t9ID57cHJvZ308L3RkPlxuICAgICAgICA8dGQ+PGRpdiBjbGFzc05hbWU9XCJ2YWx1ZXNcIiA+e3ZhbHVlc308L2Rpdj48L3RkPlxuICAgICAgPC90cj5cbiAgICApXG4gIH1cblxuICBmZXRjaFZhbHVlcygpIHtcbiAgICBjb25zdCB7XG4gICAgICBwcm9wczogeyB2YWxUeXBlLCBnZXRWYWx1ZXMsIHJlbFZhbHVlc01hcCwgY29udmVydCwgdGFibGUsIG5hbWUsIG5vdGlmaWNhdGlvbiB9LFxuICAgICAgc3RhdGU6IHsgcmVsVmFsdWVzIH0sXG4gICAgfSA9IHRoaXNcbiAgICBpZiAodmFsVHlwZSA9PSAncmVsJyAmJiBjb252ZXJ0ICE9ICd1c2VyJyAmJiBjb252ZXJ0ICE9ICdjb3VudHJ5Jykge1xuICAgICAgaWYgKHJlbFZhbHVlcyA9PSBudWxsKSB7XG4gICAgICAgIGdldERhdGEoXG4gICAgICAgICAgW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICB0eXBlOiAnZGInLFxuICAgICAgICAgICAgICBwYXRoOiBnZXRWYWx1ZXMsXG4gICAgICAgICAgICAgIGJyYW5jaDogJ3JlbFZhbHVlcycsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIF0sXG4gICAgICAgICAgdGhpcyxcbiAgICAgICAgICBub3RpZmljYXRpb24uY29tcG9uZW50LFxuICAgICAgICApXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgaWYgKCFyZWxWYWx1ZXNNYXAuaGFzKHRhYmxlKSkge3JlbFZhbHVlc01hcC5zZXQodGFibGUsIG5ldyBNYXAoKSl9XG4gICAgICAgIGlmICghcmVsVmFsdWVzTWFwLmdldCh0YWJsZSkuaGFzKG5hbWUpKSB7cmVsVmFsdWVzTWFwLmdldCh0YWJsZSkuc2V0KG5hbWUsIHJlbFZhbHVlcyl9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHMpIHtcbiAgICBjb25zdCB7IHByb3BzOiB7IGluaXRWYWx1ZXMgfSB9ID0gdGhpc1xuICAgIGNvbnN0IHsgaW5pdFZhbHVlczogbmV3SW5pdFZhbHVlcyB9ID0gbmV4dFByb3BzXG4gICAgaWYgKCFpc2VxdWFsKGluaXRWYWx1ZXMsIG5ld0luaXRWYWx1ZXMpKSB7XG4gICAgICB0aGlzLmluaXRFZGl0KG5ld0luaXRWYWx1ZXMpXG4gICAgfVxuICB9XG4gIGNvbXBvbmVudERpZE1vdW50KCkge3RoaXMuZmV0Y2hWYWx1ZXMoKTsgdGhpcy5mdWxsZmlsbFNhdmUoKX1cbiAgY29tcG9uZW50RGlkVXBkYXRlKCkge3RoaXMuZmV0Y2hWYWx1ZXMoKTsgdGhpcy5mdWxsZmlsbFNhdmUoKX1cbn1cblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHsgdGFibGVzOiB7IHVzZXIsIGNvdW50cnkgfSB9KSA9PiB7XG4gIHJldHVybiB7IHVzZXIsIGNvdW50cnkgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcykoXG4gIHdpdGhDb250ZXh0KHNhdmVTdGF0ZShJdGVtRmllbGQsICdJdGVtRmllbGQnLCBub3JtYWxpemVWYWx1ZXMpKVxuKVxuIiwiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4J1xuXG5pbXBvcnQgRmlsdGVyQ29tcHV0ZSBmcm9tICdGaWx0ZXJDb21wdXRlLmpzeCdcbmltcG9ydCB7IGNvbXBpbGVGaWx0ZXJpbmcgfSBmcm9tICdmaWx0ZXJpbmcuanMnXG5pbXBvcnQgeyBmZXRjaERhdGEgfSBmcm9tICdzZXJ2ZXIuanMnXG5cbmNsYXNzIEl0ZW1GaWx0ZXJlZCBleHRlbmRzIENvbXBvbmVudCB7XG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7XG4gICAgICBwcm9wczogeyBwYXJhbXM6IHsgdGFibGUgfSwgdGFibGVzIH0sXG4gICAgfSA9IHRoaXNcbiAgICBpZiAodGFibGVzID09IG51bGwgfHwgdGFibGVzW3RhYmxlXSA9PSBudWxsIHx8IHRhYmxlcy5jb3VudHJ5ID09IG51bGwgfHwgdGFibGVzLnVzZXIgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIDxkaXYgLz5cbiAgICB9XG4gICAgY29uc3QgeyByZWNvcmRzLCBvcmRlciwgZmllbGRzLCB0aXRsZSwgZmlsdGVyTGlzdCB9ID0gdGFibGVzW3RhYmxlXVxuICAgIGNvbnN0IHsgZmllbGRWYWx1ZXMsIGZpbHRlckluaXQgfSA9IGNvbXBpbGVGaWx0ZXJpbmcocmVjb3Jkcywgb3JkZXIsIGZpZWxkcywgZmlsdGVyTGlzdClcbiAgICByZXR1cm4gKFxuICAgICAgPEZpbHRlckNvbXB1dGVcbiAgICAgICAgdGFnPXt0YWJsZX1cbiAgICAgICAgdGFibGU9e3RhYmxlfVxuICAgICAgICByZWNvcmRzPXtyZWNvcmRzfVxuICAgICAgICBvcmRlcj17b3JkZXJ9XG4gICAgICAgIGZpZWxkcz17ZmllbGRzfVxuICAgICAgICB0aXRsZT17dGl0bGV9XG4gICAgICAgIGZpZWxkVmFsdWVzPXtmaWVsZFZhbHVlc31cbiAgICAgICAgZmlsdGVyTGlzdD17ZmlsdGVyTGlzdH1cbiAgICAgICAgZmlsdGVySW5pdD17ZmlsdGVySW5pdH1cbiAgICAgIC8+XG4gICAgKVxuICB9XG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIGNvbnN0IHtcbiAgICAgIHByb3BzOiB7XG4gICAgICAgIHBhcmFtczogeyB0YWJsZSB9LFxuICAgICAgICB0YWJsZXMsXG4gICAgICAgIGZldGNoLFxuICAgICAgfSxcbiAgICB9ID0gdGhpc1xuICAgIGlmICh0YWJsZXMgPT0gbnVsbCB8fCB0YWJsZXNbdGFibGVdID09IG51bGwpIHtcbiAgICAgIGZldGNoKHsgdHlwZTogJ2ZldGNoVGFibGUnLCBjb250ZW50VHlwZTogJ2RiJywgcGF0aDogYC9saXN0P3RhYmxlPSR7dGFibGV9YCwgZGVzYzogYCR7dGFibGV9IHRhYmxlfWAsIHRhYmxlIH0pXG4gICAgfVxuICAgIGlmICh0YWJsZXMgPT0gbnVsbCB8fCB0YWJsZXMuY291bnRyeSA9PSBudWxsKSB7XG4gICAgICBmZXRjaCh7IHR5cGU6ICdmZXRjaFRhYmxlJywgY29udGVudFR5cGU6ICdkYicsIHBhdGg6IGAvbWVtYmVyX2NvdW50cnlgLCBkZXNjOiBgY291bnRyeSB0YWJsZX1gLCB0YWJsZTogJ2NvdW50cnknIH0pXG4gICAgfVxuICAgIGlmICh0YWJsZXMgPT0gbnVsbCB8fCB0YWJsZXMudXNlciA9PSBudWxsKSB7XG4gICAgICBmZXRjaCh7IHR5cGU6ICdmZXRjaFRhYmxlJywgY29udGVudFR5cGU6ICdkYicsIHBhdGg6IGAvdXNlcmAsIGRlc2M6IGB1c2VyIHRhYmxlfWAsIHRhYmxlOiAndXNlcicgfSlcbiAgICB9XG4gIH1cbn1cblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHsgdGFibGVzIH0pID0+ICh7IHRhYmxlcyB9KVxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgeyBmZXRjaDogZmV0Y2hEYXRhIH0pKEl0ZW1GaWx0ZXJlZClcbiIsImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCdcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCdcbmltcG9ydCB7IGZldGNoRGF0YSB9IGZyb20gJ3NlcnZlci5qcydcblxuaW1wb3J0IEl0ZW1MaXN0IGZyb20gJ0l0ZW1MaXN0LmpzeCdcblxuaW1wb3J0IHsgZ2V0RGF0YSB9IGZyb20gJ2RhdGEuanMnXG5pbXBvcnQgeyB3aXRoQ29udGV4dCwgc2F2ZVN0YXRlIH0gZnJvbSAnaG9jLmpzJ1xuaW1wb3J0IHsgY29sdW1uU3R5bGUgfSBmcm9tICd3aW5kb3cuanMnXG5cbmNsYXNzIEl0ZW1NeSBleHRlbmRzIENvbXBvbmVudCB7XG4gIGluc2VydGVkID0gZGF0YSA9PiB7XG4gICAgY29uc3QgeyBwcm9wczogeyBwYXJhbXM6IHsgdGFibGUgfSwgcm91dGVyIH0gfSA9IHRoaXNcbiAgICBpZiAoZGF0YSAhPSBudWxsKSB7XG4gICAgICByb3V0ZXIucHVzaChgLyR7dGFibGV9L215bGlzdC8ke2RhdGF9YClcbiAgICB9XG4gIH1cblxuICBoYW5kbGVJbnNlcnQgPSBldmVudCA9PiB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgIGNvbnN0IHsgcHJvcHM6IHsgcGFyYW1zOiB7IHRhYmxlIH0sIG5vdGlmaWNhdGlvbiB9IH0gPSB0aGlzXG4gICAgZ2V0RGF0YShcbiAgICAgIFtcbiAgICAgICAge1xuICAgICAgICAgIHR5cGU6ICdkYicsXG4gICAgICAgICAgcGF0aDogYC9tb2Q/dGFibGU9JHt0YWJsZX0mYWN0aW9uPWluc2VydGAsXG4gICAgICAgICAgYnJhbmNoOiAnaW5zZXJ0JyxcbiAgICAgICAgICBjYWxsYmFjazogdGhpcy5pbnNlcnRlZCxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHR5cGU6ICdkYicsXG4gICAgICAgICAgcGF0aDogYC9teT90YWJsZT0ke3RhYmxlfWAsXG4gICAgICAgICAgYnJhbmNoOiAnbGlzdERhdGEnLFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICAgIHRoaXMsXG4gICAgICBub3RpZmljYXRpb24uY29tcG9uZW50XG4gICAgKVxuICB9XG5cbiAgZGVsZXRlZCA9IGRhdGEgPT4ge1xuICAgIGNvbnN0IHsgcHJvcHM6IHsgcGFyYW1zOiB7IHRhYmxlIH0sIHJvdXRlciB9IH0gPSB0aGlzXG4gICAgaWYgKGRhdGEgIT0gbnVsbCkge1xuICAgICAgcm91dGVyLnB1c2goYC8ke3RhYmxlfS9teWxpc3RgKVxuICAgIH1cbiAgfVxuXG4gIGRlbGV0ZVJvdyA9IHJlY29yZElkID0+IGV2ZW50ID0+IHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG4gICAgY29uc3QgeyBwcm9wczogeyBwYXJhbXM6IHsgdGFibGUgfSwgbm90aWZpY2F0aW9uIH0gfSA9IHRoaXNcbiAgICBnZXREYXRhKFxuICAgICAgW1xuICAgICAgICB7XG4gICAgICAgICAgdHlwZTogJ2RiJyxcbiAgICAgICAgICBwYXRoOiBgL21vZD90YWJsZT0ke3RhYmxlfSZhY3Rpb249ZGVsZXRlYCxcbiAgICAgICAgICBicmFuY2g6IGBkZWxldGVgLFxuICAgICAgICAgIGNhbGxiYWNrOiB0aGlzLmRlbGV0ZWQsXG4gICAgICAgICAgZGF0YToge19pZDogcmVjb3JkSWR9LFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgdHlwZTogJ2RiJyxcbiAgICAgICAgICBwYXRoOiBgL215P3RhYmxlPSR7dGFibGV9YCxcbiAgICAgICAgICBicmFuY2g6ICdsaXN0RGF0YScsXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgICAgdGhpcyxcbiAgICAgIG5vdGlmaWNhdGlvbi5jb21wb25lbnRcbiAgICApXG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge1xuICAgICAgcHJvcHM6IHsgcGFyYW1zOiB7IHRhYmxlIH0sIHRhYmxlcywgY2hpbGRyZW4sIGhlaWdodCwgd2lkdGggfSxcbiAgICB9ID0gdGhpc1xuICAgIGlmIChcbiAgICAgIHRhYmxlcyA9PSBudWxsIHx8IHRhYmxlc1t0YWJsZV0gPT0gbnVsbCB8fCB0YWJsZXNbdGFibGVdLm15ID09IG51bGwgfHxcbiAgICAgIHRhYmxlcy5jb3VudHJ5ID09IG51bGwgfHwgdGFibGVzLnVzZXIgPT0gbnVsbFxuICAgICkge1xuICAgICAgcmV0dXJuIDxkaXYgLz5cbiAgICB9XG4gICAgY29uc3QgeyByZWNvcmRzLCB0aXRsZSwgcGVybSwgbXkgfSA9IHRhYmxlc1t0YWJsZV1cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIGNsYXNzTmFtZT1cIm5hdiBzaXplZFwiXG4gICAgICAgICAgc3R5bGU9e2NvbHVtblN0eWxlKCdyaWdodExlZnROYXYnLCB7IGhlaWdodCwgd2lkdGggfSl9XG4gICAgICAgID5cbiAgICAgICAgICA8cD5cbiAgICAgICAgICAgIHtgJHtteS5sZW5ndGh9IGl0ZW1zIGB9XG4gICAgICAgICAgICB7KHBlcm0gIT0gbnVsbCAmJiBwZXJtLmluc2VydCkgPyAoXG4gICAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZmEgZmEtcGx1cyBidXR0b24tbGFyZ2UgaW5zZXJ0XCJcbiAgICAgICAgICAgICAgICB0aXRsZT1cIk5ldyBpdGVtXCJcbiAgICAgICAgICAgICAgICBvbkNsaWNrPXt0aGlzLmhhbmRsZUluc2VydH1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICkgOiBudWxsfVxuICAgICAgICAgIDwvcD5cbiAgICAgICAgICA8SXRlbUxpc3QgdGFibGU9e3RhYmxlfSB0aXRsZT17dGl0bGV9IGZpbHRlcmVkRGF0YT17bXkubWFwKF9pZCA9PiByZWNvcmRzW19pZF0pfSBpbnBsYWNlPXtmYWxzZX0gLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXZcbiAgICAgICAgICBjbGFzc05hbWU9XCJzaXplZFwiXG4gICAgICAgICAgc3R5bGU9e2NvbHVtblN0eWxlKCdyaWdodFJpZ2h0Qm9keScsIHsgaGVpZ2h0LCB3aWR0aCB9KX1cbiAgICAgICAgPlxuICAgICAgICAgIHsgY2hpbGRyZW4gfVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIClcbiAgfVxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICBjb25zdCB7XG4gICAgICBwcm9wczoge1xuICAgICAgICBwYXJhbXM6IHsgdGFibGUgfSxcbiAgICAgICAgdGFibGVzLFxuICAgICAgICBmZXRjaCxcbiAgICAgICAgc2V0TGlzdCxcbiAgICAgIH0sXG4gICAgfSA9IHRoaXNcbiAgICBpZiAodGFibGVzID09IG51bGwgfHwgdGFibGVzW3RhYmxlXSA9PSBudWxsIHx8IHRhYmxlc1t0YWJsZV0ubXkgPT0gbnVsbCkge1xuICAgICAgZmV0Y2goeyB0eXBlOiAnZmV0Y2hUYWJsZU15JywgY29udGVudFR5cGU6ICdkYicsIHBhdGg6IGAvbXk/dGFibGU9JHt0YWJsZX1gLCBkZXNjOiBgJHt0YWJsZX0gdGFibGUgKG15IHJlY29yZHMpfWAsIHRhYmxlIH0pXG4gICAgICBzZXRMaXN0KHsgdHlwZTogJ3NldExpc3QnLCB0YWJsZSwgbGlzdE9iajogdGhpcyB9KVxuICAgIH1cbiAgICBpZiAodGFibGVzID09IG51bGwgfHwgdGFibGVzLmNvdW50cnkgPT0gbnVsbCkge1xuICAgICAgZmV0Y2goeyB0eXBlOiAnZmV0Y2hUYWJsZScsIGNvbnRlbnRUeXBlOiAnZGInLCBwYXRoOiBgL21lbWJlcl9jb3VudHJ5YCwgZGVzYzogYGNvdW50cnkgdGFibGV9YCwgdGFibGU6ICdjb3VudHJ5JyB9KVxuICAgIH1cbiAgICBpZiAodGFibGVzID09IG51bGwgfHwgdGFibGVzLnVzZXIgPT0gbnVsbCkge1xuICAgICAgZmV0Y2goeyB0eXBlOiAnZmV0Y2hUYWJsZScsIGNvbnRlbnRUeXBlOiAnZGInLCBwYXRoOiBgL3VzZXJgLCBkZXNjOiBgdXNlciB0YWJsZX1gLCB0YWJsZTogJ3VzZXInIH0pXG4gICAgfVxuICB9XG59XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9ICh7IHRhYmxlcywgd2luOiB7IGhlaWdodCwgd2lkdGggfSB9KSA9PiAoeyB0YWJsZXMsIGhlaWdodCwgd2lkdGggfSlcblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIHsgZmV0Y2g6IGZldGNoRGF0YSwgc2V0TGlzdDogeD0+ZGlzcGF0Y2g9PnggfSkoXG4gIHdpdGhDb250ZXh0KEl0ZW1NeSlcbilcblxuXG4iLCJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnXG5pbXBvcnQgSXRlbUZpZWxkIGZyb20gJ0l0ZW1GaWVsZC5qc3gnXG5cbmltcG9ydCB7IGdldERhdGEgfSBmcm9tICdkYXRhLmpzJ1xuaW1wb3J0IHsgd2l0aENvbnRleHQsIHNhdmVTdGF0ZSB9IGZyb20gJ2hvYy5qcydcbmltcG9ydCBtZW1vQmluZCBmcm9tICdtZW1vQmluZC5qcydcblxuY2xhc3MgSXRlbVJlY29yZCBleHRlbmRzIENvbXBvbmVudCB7XG4gIHVwZE1vZCA9IG1vZGlmaWVkUm93RGF0YSA9PiB7XG4gICAgY29uc3QgdXBkUm93ID0gKHsgZmllbGREYXRhOiB7IHJvdywgLi4ub2xkRmllbGREYXRhIH0gfSkgPT4gKHtcbiAgICAgIC4uLm9sZEZpZWxkRGF0YSxcbiAgICAgIHJvdzogeyByb3csIC4uLm1vZGlmaWVkUm93RGF0YSB9LFxuICAgIH0pXG5cbiAgICB0aGlzLnNldFN0YXRlKHVwZFJvdylcbiAgfVxuICBwcm9nSWNvbihub0NoYW5nZSwgYWxsVmFsaWQpIHtcbiAgICBjb25zdCB7IHByb3BzOiB7IGVkaXRTdGF0dXMsIHRhYmxlLCByZWNvcmRJZCB9IH0gPSB0aGlzXG4gICAgY29uc3Qgc3RhdHVzQ2xhc3MgPSBub0NoYW5nZSA/ICdpbmZvJyA6IChhbGxWYWxpZCA/ICd3YXJuaW5nJyA6ICdlcnJvcicpXG4gICAgY29uc3Qgc3RhdHVzSWNvbiA9IG5vQ2hhbmdlID8gJycgOiAoYWxsVmFsaWQgPyAnZmEtcGVuY2lsJyA6ICdmYS1jbG9zZScpXG4gICAgY29uc3QgeyBbdGFibGVdOiB7IFtyZWNvcmRJZF06IHsgcHJvZzogZG9tUHJvZyB9IH0gfSA9IGVkaXRTdGF0dXNcbiAgICBkb21Qcm9nLmNsYXNzTmFtZSA9IGAke3N0YXR1c0NsYXNzfSBmYSAke3N0YXR1c0ljb259YFxuICB9XG5cbiAgdXBkRWRpdCA9IChuYW1lLCBjaGFuZ2VkLCB2YWxpZCwgbmV3VmFscykgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIHByb3BzOiB7IGVkaXRTdGF0dXMsIHRhYmxlLCByZWNvcmRJZCB9LFxuICAgICAgc3RhdGU6IHtcbiAgICAgICAgZmllbGREYXRhOiB7IHRpdGxlIH0sXG4gICAgICAgIGNoYW5nZWQ6IHByZXZDaGFuZ2VkLFxuICAgICAgICB2YWxpZDogcHJldlZhbGlkLFxuICAgICAgfSxcbiAgICB9ID0gdGhpc1xuICAgIGlmIChuYW1lID09IHRpdGxlKSB7XG4gICAgICBjb25zdCB7IFt0YWJsZV06IHsgW3JlY29yZElkXTogeyB0aXRsZTogZG9tVGl0bGUgfSB9IH0gPSBlZGl0U3RhdHVzO1xuICAgICAgW2RvbVRpdGxlLmlubmVySFRNTF0gPSBuZXdWYWxzXG4gICAgfVxuICAgIGNvbnN0IG5ld1N0YXRlID0ge1xuICAgICAgY2hhbmdlZDogey4uLnByZXZDaGFuZ2VkLCBbbmFtZV06IGNoYW5nZWR9LFxuICAgICAgdmFsaWQ6IHsuLi5wcmV2VmFsaWQsIFtuYW1lXTogdmFsaWR9LFxuICAgIH1cbiAgICBjb25zdCB7IG5vQ2hhbmdlLCBhbGxWYWxpZCwgY2FuU2F2ZSB9ID0gdGhpcy5zYXZlU3RhdHVzKG5ld1N0YXRlKVxuICAgIHRoaXMucHJvZ0ljb24obm9DaGFuZ2UsIGFsbFZhbGlkKVxuICAgIGlmICghY2FuU2F2ZSkge1xuICAgICAgbmV3U3RhdGUuc2F2ZUNvbmNlcm4gPSBmYWxzZVxuICAgIH1cbiAgICB0aGlzLnNldFN0YXRlKG5ld1N0YXRlKVxuICB9XG4gIGhhbmRsZVNhdmVBbGwgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBjYW5TYXZlIH0gPSB0aGlzLnNhdmVTdGF0dXMoKVxuICAgIGlmIChjYW5TYXZlKSB7XG4gICAgICB0aGlzLnNldFN0YXRlKHtzYXZlQ29uY2VybjogdHJ1ZX0pXG4gICAgfVxuICB9XG4gIHBhcnNlRmllbGRzKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIHByb3BzOiB7IHRhYmxlIH0sXG4gICAgICBzdGF0ZToge1xuICAgICAgICBmaWVsZERhdGE6IHsgcm93LCBmaWVsZHMsIGZpZWxkU3BlY3MsIGZpZWxkT3JkZXIsIHBlcm0gfSxcbiAgICAgICAgc2F2ZUNvbmNlcm4sXG4gICAgICB9LFxuICAgIH0gPSB0aGlzXG4gICAgY29uc3QgeyBfaWQ6IHJvd0lkIH0gPSByb3dcbiAgICBjb25zdCBmcmFnbWVudHMgPSBbXVxuICAgIGxldCBoYXNFZGl0YWJsZSA9IGZhbHNlXG4gICAgZm9yIChjb25zdCBuYW1lIG9mIGZpZWxkT3JkZXIpIHtcbiAgICAgIGNvbnN0IHsgW25hbWVdOiB7IGxhYmVsLCBpbml0aWFsLCAuLi5zcGVjcyB9IH0gPSBmaWVsZFNwZWNzXG4gICAgICBjb25zdCB7IFtuYW1lXTogZiB9ID0gZmllbGRzXG4gICAgICBpZiAoZiA9PSBudWxsKSB7Y29udGludWV9XG4gICAgICBjb25zdCB7IHVwZGF0ZTogeyBbbmFtZV06IGVkaXRhYmxlIH0gfSA9IHBlcm1cbiAgICAgIGlmIChlZGl0YWJsZSkge2hhc0VkaXRhYmxlID0gdHJ1ZX1cbiAgICAgIGNvbnN0IHsgW25hbWVdOiBpbml0VmFsdWVzIH0gPSByb3dcbiAgICAgIGZyYWdtZW50cy5wdXNoKFxuICAgICAgICA8SXRlbUZpZWxkXG4gICAgICAgICAga2V5PXtuYW1lfVxuICAgICAgICAgIHRhZz17YGZpZWxkXyR7dGFibGV9XyR7cm93SWR9XyR7bmFtZX1gfVxuICAgICAgICAgIHRhYmxlPXt0YWJsZX1cbiAgICAgICAgICBpbml0VmFsdWVzPXtpbml0VmFsdWVzfVxuICAgICAgICAgIHJvd0lkPXtyb3dJZH1cbiAgICAgICAgICBlZGl0YWJsZT17ISFlZGl0YWJsZX1cbiAgICAgICAgICBuYW1lPXtuYW1lfVxuICAgICAgICAgIGxhYmVsPXtsYWJlbH1cbiAgICAgICAgICBpbml0aWFsPXtpbml0aWFsfVxuICAgICAgICAgIHNhdmVDb25jZXJuPXtzYXZlQ29uY2Vybn1cbiAgICAgICAgICB1cGRNb2Q9e3RoaXMudXBkTW9kfVxuICAgICAgICAgIHVwZEVkaXQ9e3RoaXMudXBkRWRpdH1cbiAgICAgICAgICB7Li4uc3BlY3N9XG4gICAgICAgIC8+XG4gICAgICApXG4gICAgfVxuICAgIHJldHVybiB7ZnJhZ21lbnRzLCBoYXNFZGl0YWJsZX1cbiAgfVxuXG4gIHNhdmVTdGF0dXMobmV3U3RhdGUpIHtcbiAgICBjb25zdCB7IHN0YXRlIH0gPSB0aGlzXG4gICAgY29uc3QgeyBjaGFuZ2VkLCB2YWxpZCB9ID0gKG5ld1N0YXRlID09IG51bGwpID8gc3RhdGUgOiBuZXdTdGF0ZVxuICAgIGNvbnN0IG5vQ2hhbmdlID0gT2JqZWN0LmtleXMoY2hhbmdlZCkuZXZlcnkobiA9PiAhY2hhbmdlZFtuXSlcbiAgICBjb25zdCBhbGxWYWxpZCA9IE9iamVjdC5rZXlzKHZhbGlkKS5ldmVyeShuID0+IHZhbGlkW25dKVxuICAgIGNvbnN0IGNhblNhdmUgPSAhT2JqZWN0LmtleXMoY2hhbmdlZCkuZXZlcnkobiA9PiAoIWNoYW5nZWRbbl0gfHwgIXZhbGlkW25dKSlcbiAgICByZXR1cm4geyBub0NoYW5nZSwgYWxsVmFsaWQsIGNhblNhdmUgfVxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIHByb3BzOiB7IHRhYmxlLCBsaXN0cyB9LFxuICAgICAgc3RhdGU6IHsgZmllbGREYXRhOiB7IHJvdywgcGVybSB9IH0sXG4gICAgfSA9IHRoaXNcbiAgICBpZiAocm93ID09IG51bGwpIHtcbiAgICAgIHJldHVybiA8ZGl2IC8+XG4gICAgfVxuICAgIGNvbnN0IHsgbm9DaGFuZ2UsIGFsbFZhbGlkLCBjYW5TYXZlIH0gPSB0aGlzLnNhdmVTdGF0dXMoKVxuICAgIGNvbnN0IHN0YXR1c0NsYXNzID0gbm9DaGFuZ2UgPyAnc3BlY2lhbCcgOiAoYWxsVmFsaWQgPyAnd2FybmluZycgOiAnZXJyb3InKVxuICAgIGNvbnN0IGVsZW1UZXh0ID0gbm9DaGFuZ2UgPyAnYWxsIHNhdmVkJyA6IChhbGxWYWxpZCA/ICdzYXZlIGNoYW5nZXMnIDogJ21ha2UgY29ycmVjdGlvbnMnKVxuICAgIGNvbnN0IHsgX2lkOiByb3dJZCB9ID0gcm93XG4gICAgY29uc3QgeyBmcmFnbWVudHMsIGhhc0VkaXRhYmxlIH0gPSB0aGlzLnBhcnNlRmllbGRzKClcbiAgICBjb25zdCB7IFt0YWJsZV06IHBhcmVudCB9ID0gbGlzdHNcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3aWRnZXQtbWVkaXVtXCIgPlxuICAgICAgICA8cD5cbiAgICAgICAgICB7aGFzRWRpdGFibGUgPyBbXG4gICAgICAgICAgICBjYW5TYXZlID8gKFxuICAgICAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgICAgIGtleT1cInNhdmVcIlxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17YGJ1dHRvbi1sYXJnZSAke3N0YXR1c0NsYXNzfWB9XG4gICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVTYXZlQWxsfVxuICAgICAgICAgICAgICA+e2VsZW1UZXh0fTwvc3Bhbj5cbiAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgICAga2V5PVwibm9zYXZlXCJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2BidXR0b24tbGFyZ2UgJHtzdGF0dXNDbGFzc31gfVxuICAgICAgICAgICAgICA+e2VsZW1UZXh0fTwvc3Bhbj5cbiAgICAgICAgICAgICksXG4gICAgICAgICAgICBwZXJtLmRlbGV0ZSA/IChcbiAgICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAgICBrZXk9XCJkZWxldGVcIlxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17J2ZhIGZhLXRyYXNoIGJ1dHRvbi1sYXJnZSBkZWxldGUnfVxuICAgICAgICAgICAgICAgIHRpdGxlPVwiZGVsZXRlIHRoaXMgaXRlbVwiXG4gICAgICAgICAgICAgICAgb25DbGljaz17cGFyZW50ID8gbWVtb0JpbmQocGFyZW50LCAnZGVsZXRlUm93JywgW3Jvd0lkXSkgOiBudWxsfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgKSA6IG51bGwsXG4gICAgICAgICAgXSA6IG51bGx9XG4gICAgICAgIDwvcD5cbiAgICAgICAgPHRhYmxlPlxuICAgICAgICAgIDx0Ym9keT5cbiAgICAgICAgICAgIHtmcmFnbWVudHN9XG4gICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgPC90YWJsZT5cbiAgICAgIDwvZGl2PlxuICAgIClcbiAgfVxuICBmZXRjaFJvdygpIHtcbiAgICBjb25zdCB7XG4gICAgICBwcm9wczogeyB0YWJsZSwgcmVjb3JkSWQsIG93bk9ubHksIG5vdGlmaWNhdGlvbiB9LFxuICAgICAgc3RhdGU6IHsgZmllbGREYXRhIH0sXG4gICAgfSA9IHRoaXNcbiAgICBpZiAoT2JqZWN0LmtleXMoZmllbGREYXRhKS5sZW5ndGggPT0gMCkge1xuICAgICAgZ2V0RGF0YShcbiAgICAgICAgW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6ICdkYicsXG4gICAgICAgICAgICBwYXRoOiBgL3ZpZXc/dGFibGU9JHt0YWJsZX0maWQ9JHtyZWNvcmRJZH0ke293bk9ubHkgPyAnJm93bj10cnVlJyA6ICcnfWAsXG4gICAgICAgICAgICBicmFuY2g6ICdmaWVsZERhdGEnLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICAgIHRoaXMsXG4gICAgICAgIG5vdGlmaWNhdGlvbi5jb21wb25lbnRcbiAgICAgIClcbiAgICB9XG4gIH1cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7dGhpcy5mZXRjaFJvdygpfVxuICBjb21wb25lbnREaWRVcGRhdGUoKSB7dGhpcy5mZXRjaFJvdygpfVxufVxuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoeyBsaXN0cyB9KSA9PiAoeyBsaXN0cyB9KVxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcykoXG4gIHdpdGhDb250ZXh0KHNhdmVTdGF0ZShJdGVtUmVjb3JkLCAnSXRlbVJlY29yZCcsIHtcbiAgICBmaWVsZERhdGE6IHt9LFxuICAgIGNoYW5nZWQ6IHt9LFxuICAgIHZhbGlkOiB7fSxcbiAgICBzYXZlQ29uY2VybjogZmFsc2UsXG4gIH0pKVxuKVxuXG4iLCJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4J1xuaW1wb3J0IExvY2FsU2V0dGluZ3MgZnJvbSAnTG9jYWxTZXR0aW5ncy5qc3gnXG5pbXBvcnQgeyBmZXRjaERhdGEgfSBmcm9tICdzZXJ2ZXIuanMnXG5cbmNsYXNzIExvZ2luIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgcHJvcHM6IHsgbWUgfSB9ID0gdGhpc1xuICAgIHJldHVybiAoXG4gICAgICA8c3BhbiBjbGFzc05hbWU9XCJsb2dpblwiID57XG4gICAgICAgIG1lLmVwcG4gJiYgT2JqZWN0LmtleXMobWUpLmxlbmd0aCA+IDAgPyAoXG4gICAgICAgICAgPHNwYW4+XG4gICAgICAgICAgICA8c3Ryb25nIGNsYXNzTmFtZT1cImZhIGZhLXVzZXJcIiB0aXRsZT17bWUuZXBwbn0gPnttZS5lcHBuLnNwbGl0KCdAJylbMF19PC9zdHJvbmc+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmYSBmYS1oYXNodGFnXCIgLz57bWUuYXV0aG9yaXR5fXsnICd9XG4gICAgICAgICAgICA8ZW0+e21lLmdyb3VwRGVzYyB8fCAnbm90IGF1dGhlbnRpY2F0ZWQnfTwvZW0+XG4gICAgICAgICAgICA8YSBocmVmPVwiL2xvZ291dFwiIGNsYXNzTmFtZT1cImNvbnRyb2wgZmEgZmEtdXNlci10aW1lc1wiIHRpdGxlPVwibG9nIG91dFwiIC8+XG4gICAgICAgICAgICA8YSBocmVmPVwiL3Nsb2dvdXRcIiBjbGFzc05hbWU9XCJjb250cm9sIGZhIGZhLXVzZXJzXCIgdGl0bGU9XCJzaWduIG91dFwiIC8+XG4gICAgICAgICAgPC9zcGFuPlxuICAgICAgICApIDogKFxuICAgICAgICAgIDxhIGhyZWY9XCIvbG9naW5cIiBjbGFzc05hbWU9XCJjb250cm9sIGZhIGZhLXVzZXItcGx1c1wiID57JyBsb2dpbid9PC9hPlxuICAgICAgICApfVxuICAgICAgICA8TG9jYWxTZXR0aW5ncyAvPlxuICAgICAgPC9zcGFuPlxuICAgIClcbiAgfVxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICBjb25zdCB7IHByb3BzOiB7IGZldGNoIH0gfSA9IHRoaXNcbiAgICBmZXRjaCh7IHR5cGU6ICdmZXRjaE1lJywgY29udGVudFR5cGU6ICdkYicsIHBhdGg6ICcvd2hvL2FtaScsIGRlc2M6ICdtZScgfSlcbiAgfVxufVxuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoIHsgbWUgfSApID0+ICh7IG1lIH0pXG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCB7IGZldGNoOiBmZXRjaERhdGEgfSkoTG9naW4pXG5cbiIsImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCdcbmltcG9ydCB7IHdpdGhDb250ZXh0LCBzYXZlU3RhdGUgfSBmcm9tICdob2MuanMnXG5pbXBvcnQgbWVtb0JpbmQgZnJvbSAnbWVtb0JpbmQuanMnXG5cbmNvbnN0IGVtcHR5ID0gW11cblxuY2xhc3MgTm90aWZpY2F0aW9uIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcylcbiAgICBwcm9wcy5ub3RpZmljYXRpb24uY29tcG9uZW50ID0gdGhpc1xuICAgIHRoaXMubXNncyA9IFtdIC8vIHN5bmNocm9ub3VzIGxpc3Qgb2YgbWVzc2FnZXNcbiAgICB0aGlzLnZpc2libGUgPSBmYWxzZVxuICAgIHRoaXMuZG9tID0ge31cbiAgfVxuICBub3RpZnkobXNnKSB7XG4gICAgdGhpcy5tc2dzLnB1c2gobXNnKSAvLyBzeW5jaHJvbm91cyBhZGRpdGlvbiBvZiBtc2dcbiAgICB0aGlzLnNldFN0YXRlKHttc2dzOiBbLi4uKHRoaXMubXNncyldfSkgLy8gYXN5bmNocm9ub3VzIHVwZGF0ZSBvZiB0aGUgc3RhdGVcbiAgfVxuICBjbGVhcigpIHtcbiAgICB0aGlzLm1zZ3MgPSBbXSAvLyBzeW5jaHJvbm91cyBjbGVhcmluZyBvZiBtc2dcbiAgICB0aGlzLnNldFN0YXRlKHttc2dzOiBbXX0pIC8vIGFzeW5jaHJvbm91cyB1cGRhdGUgb2YgdGhlIHN0YXRlXG4gIH1cbiAgY29tcHV0ZVByb2dyZXNzKCkge1xuICAgIGNvbnN0IGxhc3RNc2cgPSB0aGlzLm1zZ3MubGVuZ3RoIC0gMVxuICAgIGxldCBsYXN0Tm90ZSA9IC0xXG4gICAgbGV0IGxhc3RLaW5kID0gJ2luZm8nXG4gICAgbGV0IGJ1c3kgPSAwXG4gICAgdGhpcy5tc2dzLmZvckVhY2goKG1zZywgaSkgPT4ge1xuICAgICAgaWYgKG1zZy5raW5kID09ICdlcnJvcicpIHtsYXN0Tm90ZSA9IGk7IGxhc3RLaW5kID0gJ2Vycm9yJ31cbiAgICAgIGVsc2UgaWYgKG1zZy5raW5kID09ICd3YXJuaW5nJykge1xuICAgICAgICBpZiAobGFzdEtpbmQgIT0gJ2Vycm9yJykge2xhc3ROb3RlID0gaTsgbGFzdEtpbmQgPSAnd2FybmluZyd9XG4gICAgICB9XG4gICAgICBidXN5ICs9IG1zZy5idXN5IHx8IDBcbiAgICB9KVxuICAgIGlmIChidXN5IDwgMCkge1xuICAgICAgLy9jb25zb2xlLndhcm4oYFNIT1VMRCBOT1QgSEFQUEVOOiBuZWdhdGl2ZSB2YWx1ZSBmb3IgYnVzeSAke2J1c3l9YClcbiAgICAgIGJ1c3kgPSAwXG4gICAgfVxuICAgIGNvbnN0IHZpc2libGUgPSB0aGlzLnZpc2libGUgfHwgKGxhc3ROb3RlID4gLTEpXG4gICAgcmV0dXJuIFtsYXN0TXNnLCBsYXN0Tm90ZSwgbGFzdEtpbmQsIGJ1c3ksIHZpc2libGVdXG4gIH1cbiAgcmVmRG9tID0gbGFiZWwgPT4gZG9tID0+IHtcbiAgICBpZiAoZG9tKSB7dGhpcy5kb21bbGFiZWxdID0gZG9tfVxuICB9XG5cbiAgbm90aWZpY2F0aW9uSGFuZGxlciA9IGFjdGlvbiA9PiBldmVudCA9PiB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgIGlmIChhY3Rpb24gPT0gbnVsbCkge1xuICAgICAgdGhpcy5jbGVhcigpXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdGhpcy5zZXRWaWV3KGFjdGlvbilcbiAgICB9XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgW3RoaXMubGFzdE1zZywgdGhpcy5sYXN0Tm90ZSwgdGhpcy5sYXN0S2luZCwgdGhpcy5idXN5LCB0aGlzLnZpc2libGVdID0gdGhpcy5jb21wdXRlUHJvZ3Jlc3MoKVxuICAgIGNvbnN0IGJ1c3lCbG9ja3MgPSBuZXcgQXJyYXkodGhpcy5idXN5KS5maWxsKDEpXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIDxwIGNsYXNzTmFtZT1cIm1zZy1zcGlubmVyXCIgPlxuICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICB0aXRsZT1cInNob3cvaGlkZSBub3RpZmljYXRpb25zIGFuZCBwcm9ncmVzcyBtZXNzYWdlc1wiXG4gICAgICAgICAgICBjbGFzc05hbWU9e3RoaXMubGFzdE5vdGUgPiAtMSA/IGBzcGluLSR7dGhpcy5sYXN0S2luZH1gIDogJ3NwaW4tb2snfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHsgYnVzeUJsb2Nrcy5tYXAoKGIsIGkpID0+IDxzcGFuIGtleT17aX0gY2xhc3NOYW1lPVwibXNnLWRvdCBmYSBmYS1jYXJldC1sZWZ0XCIgLz4pIH1cbiAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17YGZhIGZhLSR7dGhpcy5idXN5ID09IDAgPyAnY2lyY2xlLW8nIDogJ3NwaW5uZXIgZmEtc3Bpbid9YH1cbiAgICAgICAgICAgICAgb25DbGljaz17bWVtb0JpbmQodGhpcywgJ25vdGlmaWNhdGlvbkhhbmRsZXInLCBbIXRoaXMudmlzaWJsZV0pfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L3NwYW4+XG4gICAgICAgIDwvcD5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIHJlZj17bWVtb0JpbmQodGhpcywgJ3JlZkRvbScsIFsnbm90Ym94J10pfVxuICAgICAgICAgIGNsYXNzTmFtZT1cIm1zZy1ib3hcIlxuICAgICAgICAgIG9uQ2xpY2s9e21lbW9CaW5kKHRoaXMsICdub3RpZmljYXRpb25IYW5kbGVyJywgW2ZhbHNlXSl9XG4gICAgICAgID57XG4gICAgICAgICAgKHRoaXMubXNncyB8fCBlbXB0eSkubWFwKChtc2csIGluZGV4KSA9PiAoXG4gICAgICAgICAgICA8cFxuICAgICAgICAgICAgICB0aXRsZT17bXNnLmNhdXNlfVxuICAgICAgICAgICAgICBrZXk9e2luZGV4fVxuICAgICAgICAgICAgICByZWY9e21lbW9CaW5kKHRoaXMsICdyZWZEb20nLCBbYG0ke2luZGV4fWBdKX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgbXNnLWxpbmUgJHtbbXNnLmtpbmRdfS1vICR7KG1zZy5raW5kICE9ICdpbmZvJykgPyAnbXNnLWhpZ2gnIDogJyd9YH1cbiAgICAgICAgICAgID57bXNnLnRleHR9PC9wPlxuICAgICAgICAgICkpXG4gICAgICAgIH1cbiAgICAgICAgICA8cCBjbGFzc05hbWU9XCJtc2ctZGlzbWlzc1wiID57JyhjbGljayBwYW5lbCB0byBoaWRlKSd9PC9wPlxuICAgICAgICAgIDxwIGNsYXNzTmFtZT1cIm1zZy10cmFzaFwiID5cbiAgICAgICAgICAgIDxhXG4gICAgICAgICAgICAgIGhyZWY9XCIjXCJcbiAgICAgICAgICAgICAgdGl0bGU9XCJjbGVhciBtZXNzYWdlc1wiXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cImNvbnRyb2wgZmEgZmEtdHJhc2hcIlxuICAgICAgICAgICAgICBvbkNsaWNrPXttZW1vQmluZCh0aGlzLCAnbm90aWZpY2F0aW9uSGFuZGxlcicsIFtudWxsXSl9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvcD5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApXG4gIH1cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgdGhpcy5zZXRWaWV3KClcbiAgfVxuICBjb21wb25lbnREaWRVcGRhdGUoKSB7XG4gICAgdGhpcy5zZXRWaWV3KClcbiAgfVxuICBzZXRWaWV3KG9uKSB7XG4gICAgaWYgKG9uICE9IG51bGwpIHtcbiAgICAgIHRoaXMudmlzaWJsZSA9IG9uXG4gICAgfVxuICAgIHRoaXMuZG9tLm5vdGJveC5zdHlsZS5kaXNwbGF5ID0gdGhpcy52aXNpYmxlID8gJ2Jsb2NrJyA6ICdub25lJ1xuICAgIHRoaXMuc2V0U2Nyb2xsKClcbiAgfVxuICBzZXRTY3JvbGwoKSB7XG4gICAgaWYgKHRoaXMudmlzaWJsZSkge1xuICAgICAgaWYgKHRoaXMubGFzdE5vdGUgPiAtMSkge1xuICAgICAgICB0aGlzLmRvbVtgbSR7dGhpcy5sYXN0Tm90ZX1gXS5zY3JvbGxJbnRvVmlldygpXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgaWYgKHRoaXMubGFzdE1zZyA+IC0xKSB7XG4gICAgICAgICAgdGhpcy5kb21bYG0ke3RoaXMubGFzdE1zZ31gXS5zY3JvbGxJbnRvVmlldygpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgd2l0aENvbnRleHQoc2F2ZVN0YXRlKE5vdGlmaWNhdGlvbiwgJ05vdGlmaWNhdGlvbicsIHttc2dzOiBudWxsfSkpXG4iLCJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnXG5cbmltcG9ydCB7IHdpdGhDb250ZXh0LCBzYXZlU3RhdGUgfSBmcm9tICdob2MuanMnXG5pbXBvcnQgbWVtb0JpbmQgZnJvbSAnbWVtb0JpbmQuanMnXG5cbmNvbnN0IFJlbE9wdGlvbiA9ICh7IHZhbHVlLCBzZWxlY3RlZCwgb25IaXQgfSkgPT4gKFxuICA8cFxuICAgIGNsYXNzTmFtZT17YG9wdGlvbiAke3NlbGVjdGVkfWB9XG4gICAgb25DbGljaz17b25IaXR9XG4gID57dmFsdWUubG9uZyB8fCB2YWx1ZS5mdWxsfTwvcD5cbilcblxuY29uc3QgaW5pdFN0YXRlID0gKHsgaW5pdFZhbCwgaW5pdEZ1bGwsIGluaXRUZXh0IH0pID0+ICh7XG4gIHBvcHBlZFVwOiBmYWxzZSxcbiAgc2VhcmNoOiAnJyxcbiAgc2VsVmFsOiBpbml0VmFsLFxuICBzZWxGdWxsOiBpbml0RnVsbCxcbiAgc2VsVGV4dDogaW5pdFRleHQsXG59KVxuXG5jb25zdCB0b2dnbGVQb3BVcCA9ICh7IHBvcHBlZFVwIH0pID0+ICh7IHBvcHBlZFVwOiAhcG9wcGVkVXAgfSlcblxuY2xhc3MgUmVsU2VsZWN0IGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgaGFuZGxlUG9wVXAgPSAoKSA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSh0b2dnbGVQb3BVcClcbiAgfVxuICBoYW5kbGVTZWFyY2ggPSBldmVudCA9PiB7XG4gICAgY29uc3QgeyB0YXJnZXQ6IHsgdmFsdWUgfSB9ID0gZXZlbnRcbiAgICB0aGlzLnNldFN0YXRlKHsgdmFsdWUgfSlcbiAgfVxuICBjaGFuZ2VTZWwgPSAoc2VsVmFsLCBzZWxGdWxsLCBzZWxUZXh0KSA9PiAoKSA9PiB7XG4gICAgY29uc3QgeyBwcm9wczogeyBvbkNoYW5nZSB9IH0gPSB0aGlzXG4gICAgdGhpcy5zZXRTdGF0ZSh7cG9wcGVkVXA6IGZhbHNlLCBzZWxWYWwsIHNlbEZ1bGwsIHNlbFRleHR9KVxuICAgIG9uQ2hhbmdlKHNlbFZhbCwgc2VsRnVsbCwgc2VsVGV4dClcbiAgfVxuXG4gIGFkZFZhbCA9IHNlbFRleHQgPT4gKCkgPT4ge1xuICAgIGNvbnN0IHsgcHJvcHM6IHsgb25DaGFuZ2UgfSB9ID0gdGhpc1xuICAgIGNvbnN0IHNlbFZhbCA9IG51bGxcbiAgICB0aGlzLnNldFN0YXRlKHtwb3BwZWRVcDogZmFsc2UsIHNlbFZhbCwgc2VsRnVsbDogc2VsVGV4dCwgc2VsVGV4dH0pXG4gICAgb25DaGFuZ2UobnVsbCwgc2VsVGV4dClcbiAgfVxuICBzZXRIZWlnaHQgPSBuID0+IGRvbUVsZW0gPT4ge1xuICAgIGlmIChkb21FbGVtICE9IG51bGwpIHtcbiAgICAgIGNvbnN0IGhlaWdodCA9IE1hdGgubWF4KDEsIE1hdGgubWluKG4sIDI1KSkgKiAxLjdcbiAgICAgIGRvbUVsZW0uc3R5bGUuaGVpZ2h0ID0gYCR7aGVpZ2h0fWVtYFxuICAgICAgZG9tRWxlbS5zY3JvbGxJbnRvVmlldygpXG4gICAgfVxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIHByb3BzOiB7IGlzTmV3LCBhbGxvd05ldywgdmFsaWQsIHZhbHVlTGlzdCwgZXh0cmFDbGFzc2VzIH0sXG4gICAgICBzdGF0ZTogeyBwb3BwZWRVcCwgc2VhcmNoLCBzZWxWYWwsIHNlbEZ1bGwsIHNlbFRleHQgfSxcbiAgICB9ID0gdGhpc1xuICAgIGNvbnN0IHBhdCA9IHNlYXJjaC50b0xvd2VyQ2FzZSgpXG4gICAgY29uc3QgaWNvbiA9IHBvcHBlZFVwID8gKGlzTmV3ID8gJ21pbnVzJyA6ICdhcnJvdy11cCcpIDogKGlzTmV3ID8gJ3BsdXMnIDogJ2Fycm93LWRvd24nKVxuICAgIGNvbnN0IHhjbGFzc2VzID0gZXh0cmFDbGFzc2VzLmpvaW4oJyAnKVxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInNlbGVjdFwiID5cbiAgICAgICAgPHAgY2xhc3NOYW1lPVwib3B0aW9uLWhlYWQgdGFnLW1lZGl1bVwiID5cbiAgICAgICAgICB7KGlzTmV3ID8gbnVsbCA6IDxzcGFuIGNsYXNzTmFtZT17eGNsYXNzZXN9IHRpdGxlPXtzZWxGdWxsfSA+e3NlbFRleHR9PC9zcGFuPil9XG4gICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgIGNsYXNzTmFtZT17YGJ1dHRvbi1zbWFsbCBmYSBmYS0ke2ljb259YH1cbiAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlUG9wVXB9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9wPlxuICAgICAgICB7KHBvcHBlZFVwIHx8ICF2YWxpZCkgPyAoXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJvcHRpb24tcG9wdXBcIiA+XG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJvcHRpb24tdHlwZVwiID5cbiAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyPVwic2VhcmNoLi4uXCJcbiAgICAgICAgICAgICAgICB2YWx1ZT17c2VhcmNofVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17eGNsYXNzZXN9XG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlU2VhcmNofVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICB7KGFsbG93TmV3ICYmIHNlYXJjaCAhPSAnJykgPyAoXG4gICAgICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImJ1dHRvbi1zbWFsbCBmYSBmYS1wbHVzLXNxdWFyZVwiXG4gICAgICAgICAgICAgICAgICBvbkNsaWNrPXttZW1vQmluZCh0aGlzLCAnYWRkVmFsJywgW3NlYXJjaF0pfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICkgOiBudWxsfVxuICAgICAgICAgICAgPC9wPlxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICByZWY9e3RoaXMuc2V0SGVpZ2h0KHZhbHVlTGlzdC5sZW5ndGgpfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJvcHRpb25zXCJcbiAgICAgICAgICAgID57XG4gICAgICAgICAgICAgIHZhbHVlTGlzdC5tYXAoKFtfaWQsIHZhbHVlXSkgPT4gKFxuICAgICAgICAgICAgICAgIHBhdCA9PSBudWxsIHx8IHBhdCA9PSAnJyB8fCB2YWx1ZSA9PSBudWxsIHx8IHZhbHVlLmZ1bGwgPT0gbnVsbCB8fCB2YWx1ZS5mdWxsLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihwYXQpICE9PSAtMVxuICAgICAgICAgICAgICApID8gKFxuICAgICAgICAgICAgICAgIDxSZWxPcHRpb25cbiAgICAgICAgICAgICAgICAgIGtleT17KF9pZCA9PSBudWxsKSA/ICdudWxsJyA6IF9pZH1cbiAgICAgICAgICAgICAgICAgIHZhbHVlPXt2YWx1ZX1cbiAgICAgICAgICAgICAgICAgIHNlbGVjdGVkPXtfaWQgPT0gc2VsVmFsfVxuICAgICAgICAgICAgICAgICAgb25IaXQ9e21lbW9CaW5kKHRoaXMsICdjaGFuZ2VTZWwnLCBbX2lkXSwgW3ZhbHVlLmZ1bGwsIHZhbHVlLnRleHRdKX1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICApIDogbnVsbClcbiAgICAgICAgICAgIH08L2Rpdj5cbiAgICAgICAgICA8L2Rpdj4pIDogbnVsbFxuICAgICAgICB9XG4gICAgICA8L2Rpdj5cbiAgICApXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgd2l0aENvbnRleHQoc2F2ZVN0YXRlKFJlbFNlbGVjdCwgJ1JlbFNlbGVjdCcsIGluaXRTdGF0ZSkpXG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIFByb3BUeXBlcywgQ2hpbGRyZW4gfSBmcm9tICdyZWFjdCdcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCdcbmltcG9ydCB0aHJvdHRsZSBmcm9tICdsb2Rhc2gvdGhyb3R0bGUnXG5pbXBvcnQgeyB3aW5EaW0gfSBmcm9tICd1aS5qcydcblxuaW1wb3J0IFN0b3JlIGZyb20gJ3N0b3JlLmpzJ1xuXG5jbGFzcyBXaW5kb3cgZXh0ZW5kcyBDb21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKVxuICAgIHRoaXMuZ2xvYmFscyA9IHtcbiAgICAgIHN0b3JlOiBuZXcgU3RvcmUoKSxcbiAgICAgIG5vdGlmaWNhdGlvbjoge2NvbXBvbmVudDogbnVsbH0sXG4gICAgICByZWxWYWx1ZXNNYXA6IG5ldyBNYXAoKSxcbiAgICAgIGVkaXRTdGF0dXM6IHt9LFxuICAgIH1cbiAgfVxuICBnZXRDaGlsZENvbnRleHQoKSB7XG4gICAgY29uc3QgeyBnbG9iYWxzIH0gPSB0aGlzXG4gICAgcmV0dXJuIHsgZ2xvYmFscyB9XG4gIH1cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgcHJvcHM6IHsgY2hpbGRyZW4gfSB9ID0gdGhpc1xuICAgIHJldHVybiBDaGlsZHJlbi5vbmx5KGNoaWxkcmVuKVxuICB9XG4gIG5ld1dpbmRvd1NpemUgPSB0aHJvdHRsZShldmVudCA9PiB7XG4gICAgY29uc3QgeyBwcm9wczogeyByZXNpemUgfSB9ID0gdGhpc1xuICAgIHJlc2l6ZSgpXG4gIH0sIDEwMDApXG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgdGhpcy5uZXdXaW5kb3dTaXplKVxuICB9XG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIHRoaXMubmV3V2luZG93U2l6ZSlcbiAgfVxufVxuXG5XaW5kb3cuY2hpbGRDb250ZXh0VHlwZXMgPSB7XG4gIGdsb2JhbHM6IFByb3BUeXBlcy5vYmplY3QuaXNSZXF1aXJlZCxcbn1cblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKCB7IHdpbiB9ICkgPT4gKHsgd2luIH0pXG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCB7IHJlc2l6ZTogd2luRGltIH0pKFdpbmRvdylcbiJdfQ==
