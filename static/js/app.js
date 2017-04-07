(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/array/from"), __esModule: true };
},{"core-js/library/fn/array/from":24}],2:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/get-iterator"), __esModule: true };
},{"core-js/library/fn/get-iterator":25}],3:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/is-iterable"), __esModule: true };
},{"core-js/library/fn/is-iterable":26}],4:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/json/stringify"), __esModule: true };
},{"core-js/library/fn/json/stringify":27}],5:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/assign"), __esModule: true };
},{"core-js/library/fn/object/assign":28}],6:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/create"), __esModule: true };
},{"core-js/library/fn/object/create":29}],7:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/define-property"), __esModule: true };
},{"core-js/library/fn/object/define-property":30}],8:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/entries"), __esModule: true };
},{"core-js/library/fn/object/entries":31}],9:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/get-prototype-of"), __esModule: true };
},{"core-js/library/fn/object/get-prototype-of":32}],10:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/keys"), __esModule: true };
},{"core-js/library/fn/object/keys":33}],11:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/set-prototype-of"), __esModule: true };
},{"core-js/library/fn/object/set-prototype-of":34}],12:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/symbol"), __esModule: true };
},{"core-js/library/fn/symbol":35}],13:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/symbol/iterator"), __esModule: true };
},{"core-js/library/fn/symbol/iterator":36}],14:[function(require,module,exports){
"use strict";

exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};
},{}],15:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _defineProperty = require("../core-js/object/define-property");

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();
},{"../core-js/object/define-property":7}],16:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _defineProperty = require("../core-js/object/define-property");

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (obj, key, value) {
  if (key in obj) {
    (0, _defineProperty2.default)(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};
},{"../core-js/object/define-property":7}],17:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _assign = require("../core-js/object/assign");

var _assign2 = _interopRequireDefault(_assign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _assign2.default || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};
},{"../core-js/object/assign":5}],18:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _setPrototypeOf = require("../core-js/object/set-prototype-of");

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = require("../core-js/object/create");

var _create2 = _interopRequireDefault(_create);

var _typeof2 = require("../helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
  }

  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
};
},{"../core-js/object/create":6,"../core-js/object/set-prototype-of":11,"../helpers/typeof":23}],19:[function(require,module,exports){
"use strict";

exports.__esModule = true;

exports.default = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};
},{}],20:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _typeof2 = require("../helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
};
},{"../helpers/typeof":23}],21:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _isIterable2 = require("../core-js/is-iterable");

var _isIterable3 = _interopRequireDefault(_isIterable2);

var _getIterator2 = require("../core-js/get-iterator");

var _getIterator3 = _interopRequireDefault(_getIterator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = (0, _getIterator3.default)(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if ((0, _isIterable3.default)(Object(arr))) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();
},{"../core-js/get-iterator":2,"../core-js/is-iterable":3}],22:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _from = require("../core-js/array/from");

var _from2 = _interopRequireDefault(_from);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  } else {
    return (0, _from2.default)(arr);
  }
};
},{"../core-js/array/from":1}],23:[function(require,module,exports){
"use strict";

exports.__esModule = true;

var _iterator = require("../core-js/symbol/iterator");

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = require("../core-js/symbol");

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};
},{"../core-js/symbol":12,"../core-js/symbol/iterator":13}],24:[function(require,module,exports){
require('../../modules/es6.string.iterator');
require('../../modules/es6.array.from');
module.exports = require('../../modules/_core').Array.from;
},{"../../modules/_core":43,"../../modules/es6.array.from":105,"../../modules/es6.string.iterator":114}],25:[function(require,module,exports){
require('../modules/web.dom.iterable');
require('../modules/es6.string.iterator');
module.exports = require('../modules/core.get-iterator');
},{"../modules/core.get-iterator":103,"../modules/es6.string.iterator":114,"../modules/web.dom.iterable":119}],26:[function(require,module,exports){
require('../modules/web.dom.iterable');
require('../modules/es6.string.iterator');
module.exports = require('../modules/core.is-iterable');
},{"../modules/core.is-iterable":104,"../modules/es6.string.iterator":114,"../modules/web.dom.iterable":119}],27:[function(require,module,exports){
var core  = require('../../modules/_core')
  , $JSON = core.JSON || (core.JSON = {stringify: JSON.stringify});
module.exports = function stringify(it){ // eslint-disable-line no-unused-vars
  return $JSON.stringify.apply($JSON, arguments);
};
},{"../../modules/_core":43}],28:[function(require,module,exports){
require('../../modules/es6.object.assign');
module.exports = require('../../modules/_core').Object.assign;
},{"../../modules/_core":43,"../../modules/es6.object.assign":107}],29:[function(require,module,exports){
require('../../modules/es6.object.create');
var $Object = require('../../modules/_core').Object;
module.exports = function create(P, D){
  return $Object.create(P, D);
};
},{"../../modules/_core":43,"../../modules/es6.object.create":108}],30:[function(require,module,exports){
require('../../modules/es6.object.define-property');
var $Object = require('../../modules/_core').Object;
module.exports = function defineProperty(it, key, desc){
  return $Object.defineProperty(it, key, desc);
};
},{"../../modules/_core":43,"../../modules/es6.object.define-property":109}],31:[function(require,module,exports){
require('../../modules/es7.object.entries');
module.exports = require('../../modules/_core').Object.entries;
},{"../../modules/_core":43,"../../modules/es7.object.entries":116}],32:[function(require,module,exports){
require('../../modules/es6.object.get-prototype-of');
module.exports = require('../../modules/_core').Object.getPrototypeOf;
},{"../../modules/_core":43,"../../modules/es6.object.get-prototype-of":110}],33:[function(require,module,exports){
require('../../modules/es6.object.keys');
module.exports = require('../../modules/_core').Object.keys;
},{"../../modules/_core":43,"../../modules/es6.object.keys":111}],34:[function(require,module,exports){
require('../../modules/es6.object.set-prototype-of');
module.exports = require('../../modules/_core').Object.setPrototypeOf;
},{"../../modules/_core":43,"../../modules/es6.object.set-prototype-of":112}],35:[function(require,module,exports){
require('../../modules/es6.symbol');
require('../../modules/es6.object.to-string');
require('../../modules/es7.symbol.async-iterator');
require('../../modules/es7.symbol.observable');
module.exports = require('../../modules/_core').Symbol;
},{"../../modules/_core":43,"../../modules/es6.object.to-string":113,"../../modules/es6.symbol":115,"../../modules/es7.symbol.async-iterator":117,"../../modules/es7.symbol.observable":118}],36:[function(require,module,exports){
require('../../modules/es6.string.iterator');
require('../../modules/web.dom.iterable');
module.exports = require('../../modules/_wks-ext').f('iterator');
},{"../../modules/_wks-ext":100,"../../modules/es6.string.iterator":114,"../../modules/web.dom.iterable":119}],37:[function(require,module,exports){
module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};
},{}],38:[function(require,module,exports){
module.exports = function(){ /* empty */ };
},{}],39:[function(require,module,exports){
var isObject = require('./_is-object');
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};
},{"./_is-object":61}],40:[function(require,module,exports){
// false -> Array#indexOf
// true  -> Array#includes
var toIObject = require('./_to-iobject')
  , toLength  = require('./_to-length')
  , toIndex   = require('./_to-index');
module.exports = function(IS_INCLUDES){
  return function($this, el, fromIndex){
    var O      = toIObject($this)
      , length = toLength(O.length)
      , index  = toIndex(fromIndex, length)
      , value;
    // Array#includes uses SameValueZero equality algorithm
    if(IS_INCLUDES && el != el)while(length > index){
      value = O[index++];
      if(value != value)return true;
    // Array#toIndex ignores holes, Array#includes - not
    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
      if(O[index] === el)return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};
},{"./_to-index":92,"./_to-iobject":94,"./_to-length":95}],41:[function(require,module,exports){
// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = require('./_cof')
  , TAG = require('./_wks')('toStringTag')
  // ES3 wrong here
  , ARG = cof(function(){ return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function(it, key){
  try {
    return it[key];
  } catch(e){ /* empty */ }
};

module.exports = function(it){
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};
},{"./_cof":42,"./_wks":101}],42:[function(require,module,exports){
var toString = {}.toString;

module.exports = function(it){
  return toString.call(it).slice(8, -1);
};
},{}],43:[function(require,module,exports){
var core = module.exports = {version: '2.4.0'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef
},{}],44:[function(require,module,exports){
'use strict';
var $defineProperty = require('./_object-dp')
  , createDesc      = require('./_property-desc');

module.exports = function(object, index, value){
  if(index in object)$defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};
},{"./_object-dp":73,"./_property-desc":85}],45:[function(require,module,exports){
// optional / simple context binding
var aFunction = require('./_a-function');
module.exports = function(fn, that, length){
  aFunction(fn);
  if(that === undefined)return fn;
  switch(length){
    case 1: return function(a){
      return fn.call(that, a);
    };
    case 2: return function(a, b){
      return fn.call(that, a, b);
    };
    case 3: return function(a, b, c){
      return fn.call(that, a, b, c);
    };
  }
  return function(/* ...args */){
    return fn.apply(that, arguments);
  };
};
},{"./_a-function":37}],46:[function(require,module,exports){
// 7.2.1 RequireObjectCoercible(argument)
module.exports = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};
},{}],47:[function(require,module,exports){
// Thank's IE8 for his funny defineProperty
module.exports = !require('./_fails')(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});
},{"./_fails":52}],48:[function(require,module,exports){
var isObject = require('./_is-object')
  , document = require('./_global').document
  // in old IE typeof document.createElement is 'object'
  , is = isObject(document) && isObject(document.createElement);
module.exports = function(it){
  return is ? document.createElement(it) : {};
};
},{"./_global":53,"./_is-object":61}],49:[function(require,module,exports){
// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');
},{}],50:[function(require,module,exports){
// all enumerable object keys, includes symbols
var getKeys = require('./_object-keys')
  , gOPS    = require('./_object-gops')
  , pIE     = require('./_object-pie');
module.exports = function(it){
  var result     = getKeys(it)
    , getSymbols = gOPS.f;
  if(getSymbols){
    var symbols = getSymbols(it)
      , isEnum  = pIE.f
      , i       = 0
      , key;
    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
  } return result;
};
},{"./_object-gops":78,"./_object-keys":81,"./_object-pie":82}],51:[function(require,module,exports){
var global    = require('./_global')
  , core      = require('./_core')
  , ctx       = require('./_ctx')
  , hide      = require('./_hide')
  , PROTOTYPE = 'prototype';

var $export = function(type, name, source){
  var IS_FORCED = type & $export.F
    , IS_GLOBAL = type & $export.G
    , IS_STATIC = type & $export.S
    , IS_PROTO  = type & $export.P
    , IS_BIND   = type & $export.B
    , IS_WRAP   = type & $export.W
    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
    , expProto  = exports[PROTOTYPE]
    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
    , key, own, out;
  if(IS_GLOBAL)source = name;
  for(key in source){
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if(own && key in exports)continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function(C){
      var F = function(a, b, c){
        if(this instanceof C){
          switch(arguments.length){
            case 0: return new C;
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if(IS_PROTO){
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library` 
module.exports = $export;
},{"./_core":43,"./_ctx":45,"./_global":53,"./_hide":55}],52:[function(require,module,exports){
module.exports = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};
},{}],53:[function(require,module,exports){
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef
},{}],54:[function(require,module,exports){
var hasOwnProperty = {}.hasOwnProperty;
module.exports = function(it, key){
  return hasOwnProperty.call(it, key);
};
},{}],55:[function(require,module,exports){
var dP         = require('./_object-dp')
  , createDesc = require('./_property-desc');
module.exports = require('./_descriptors') ? function(object, key, value){
  return dP.f(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};
},{"./_descriptors":47,"./_object-dp":73,"./_property-desc":85}],56:[function(require,module,exports){
module.exports = require('./_global').document && document.documentElement;
},{"./_global":53}],57:[function(require,module,exports){
module.exports = !require('./_descriptors') && !require('./_fails')(function(){
  return Object.defineProperty(require('./_dom-create')('div'), 'a', {get: function(){ return 7; }}).a != 7;
});
},{"./_descriptors":47,"./_dom-create":48,"./_fails":52}],58:[function(require,module,exports){
// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = require('./_cof');
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return cof(it) == 'String' ? it.split('') : Object(it);
};
},{"./_cof":42}],59:[function(require,module,exports){
// check on default Array iterator
var Iterators  = require('./_iterators')
  , ITERATOR   = require('./_wks')('iterator')
  , ArrayProto = Array.prototype;

module.exports = function(it){
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};
},{"./_iterators":67,"./_wks":101}],60:[function(require,module,exports){
// 7.2.2 IsArray(argument)
var cof = require('./_cof');
module.exports = Array.isArray || function isArray(arg){
  return cof(arg) == 'Array';
};
},{"./_cof":42}],61:[function(require,module,exports){
module.exports = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};
},{}],62:[function(require,module,exports){
// call something on iterator step with safe closing on error
var anObject = require('./_an-object');
module.exports = function(iterator, fn, value, entries){
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch(e){
    var ret = iterator['return'];
    if(ret !== undefined)anObject(ret.call(iterator));
    throw e;
  }
};
},{"./_an-object":39}],63:[function(require,module,exports){
'use strict';
var create         = require('./_object-create')
  , descriptor     = require('./_property-desc')
  , setToStringTag = require('./_set-to-string-tag')
  , IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
require('./_hide')(IteratorPrototype, require('./_wks')('iterator'), function(){ return this; });

module.exports = function(Constructor, NAME, next){
  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
  setToStringTag(Constructor, NAME + ' Iterator');
};
},{"./_hide":55,"./_object-create":72,"./_property-desc":85,"./_set-to-string-tag":88,"./_wks":101}],64:[function(require,module,exports){
'use strict';
var LIBRARY        = require('./_library')
  , $export        = require('./_export')
  , redefine       = require('./_redefine')
  , hide           = require('./_hide')
  , has            = require('./_has')
  , Iterators      = require('./_iterators')
  , $iterCreate    = require('./_iter-create')
  , setToStringTag = require('./_set-to-string-tag')
  , getPrototypeOf = require('./_object-gpo')
  , ITERATOR       = require('./_wks')('iterator')
  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
  , FF_ITERATOR    = '@@iterator'
  , KEYS           = 'keys'
  , VALUES         = 'values';

var returnThis = function(){ return this; };

module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
  $iterCreate(Constructor, NAME, next);
  var getMethod = function(kind){
    if(!BUGGY && kind in proto)return proto[kind];
    switch(kind){
      case KEYS: return function keys(){ return new Constructor(this, kind); };
      case VALUES: return function values(){ return new Constructor(this, kind); };
    } return function entries(){ return new Constructor(this, kind); };
  };
  var TAG        = NAME + ' Iterator'
    , DEF_VALUES = DEFAULT == VALUES
    , VALUES_BUG = false
    , proto      = Base.prototype
    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
    , $default   = $native || getMethod(DEFAULT)
    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
    , methods, key, IteratorPrototype;
  // Fix native
  if($anyNative){
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
    if(IteratorPrototype !== Object.prototype){
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if(DEF_VALUES && $native && $native.name !== VALUES){
    VALUES_BUG = true;
    $default = function values(){ return $native.call(this); };
  }
  // Define iterator
  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG]  = returnThis;
  if(DEFAULT){
    methods = {
      values:  DEF_VALUES ? $default : getMethod(VALUES),
      keys:    IS_SET     ? $default : getMethod(KEYS),
      entries: $entries
    };
    if(FORCED)for(key in methods){
      if(!(key in proto))redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};
},{"./_export":51,"./_has":54,"./_hide":55,"./_iter-create":63,"./_iterators":67,"./_library":69,"./_object-gpo":79,"./_redefine":86,"./_set-to-string-tag":88,"./_wks":101}],65:[function(require,module,exports){
var ITERATOR     = require('./_wks')('iterator')
  , SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function(){ SAFE_CLOSING = true; };
  Array.from(riter, function(){ throw 2; });
} catch(e){ /* empty */ }

module.exports = function(exec, skipClosing){
  if(!skipClosing && !SAFE_CLOSING)return false;
  var safe = false;
  try {
    var arr  = [7]
      , iter = arr[ITERATOR]();
    iter.next = function(){ return {done: safe = true}; };
    arr[ITERATOR] = function(){ return iter; };
    exec(arr);
  } catch(e){ /* empty */ }
  return safe;
};
},{"./_wks":101}],66:[function(require,module,exports){
module.exports = function(done, value){
  return {value: value, done: !!done};
};
},{}],67:[function(require,module,exports){
module.exports = {};
},{}],68:[function(require,module,exports){
var getKeys   = require('./_object-keys')
  , toIObject = require('./_to-iobject');
module.exports = function(object, el){
  var O      = toIObject(object)
    , keys   = getKeys(O)
    , length = keys.length
    , index  = 0
    , key;
  while(length > index)if(O[key = keys[index++]] === el)return key;
};
},{"./_object-keys":81,"./_to-iobject":94}],69:[function(require,module,exports){
module.exports = true;
},{}],70:[function(require,module,exports){
var META     = require('./_uid')('meta')
  , isObject = require('./_is-object')
  , has      = require('./_has')
  , setDesc  = require('./_object-dp').f
  , id       = 0;
var isExtensible = Object.isExtensible || function(){
  return true;
};
var FREEZE = !require('./_fails')(function(){
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function(it){
  setDesc(it, META, {value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  }});
};
var fastKey = function(it, create){
  // return primitive with prefix
  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if(!has(it, META)){
    // can't set metadata to uncaught frozen object
    if(!isExtensible(it))return 'F';
    // not necessary to add metadata
    if(!create)return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function(it, create){
  if(!has(it, META)){
    // can't set metadata to uncaught frozen object
    if(!isExtensible(it))return true;
    // not necessary to add metadata
    if(!create)return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function(it){
  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY:      META,
  NEED:     false,
  fastKey:  fastKey,
  getWeak:  getWeak,
  onFreeze: onFreeze
};
},{"./_fails":52,"./_has":54,"./_is-object":61,"./_object-dp":73,"./_uid":98}],71:[function(require,module,exports){
'use strict';
// 19.1.2.1 Object.assign(target, source, ...)
var getKeys  = require('./_object-keys')
  , gOPS     = require('./_object-gops')
  , pIE      = require('./_object-pie')
  , toObject = require('./_to-object')
  , IObject  = require('./_iobject')
  , $assign  = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || require('./_fails')(function(){
  var A = {}
    , B = {}
    , S = Symbol()
    , K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function(k){ B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
  var T     = toObject(target)
    , aLen  = arguments.length
    , index = 1
    , getSymbols = gOPS.f
    , isEnum     = pIE.f;
  while(aLen > index){
    var S      = IObject(arguments[index++])
      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
      , length = keys.length
      , j      = 0
      , key;
    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
  } return T;
} : $assign;
},{"./_fails":52,"./_iobject":58,"./_object-gops":78,"./_object-keys":81,"./_object-pie":82,"./_to-object":96}],72:[function(require,module,exports){
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject    = require('./_an-object')
  , dPs         = require('./_object-dps')
  , enumBugKeys = require('./_enum-bug-keys')
  , IE_PROTO    = require('./_shared-key')('IE_PROTO')
  , Empty       = function(){ /* empty */ }
  , PROTOTYPE   = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function(){
  // Thrash, waste and sodomy: IE GC bug
  var iframe = require('./_dom-create')('iframe')
    , i      = enumBugKeys.length
    , lt     = '<'
    , gt     = '>'
    , iframeDocument;
  iframe.style.display = 'none';
  require('./_html').appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties){
  var result;
  if(O !== null){
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty;
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};

},{"./_an-object":39,"./_dom-create":48,"./_enum-bug-keys":49,"./_html":56,"./_object-dps":74,"./_shared-key":89}],73:[function(require,module,exports){
var anObject       = require('./_an-object')
  , IE8_DOM_DEFINE = require('./_ie8-dom-define')
  , toPrimitive    = require('./_to-primitive')
  , dP             = Object.defineProperty;

exports.f = require('./_descriptors') ? Object.defineProperty : function defineProperty(O, P, Attributes){
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if(IE8_DOM_DEFINE)try {
    return dP(O, P, Attributes);
  } catch(e){ /* empty */ }
  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
  if('value' in Attributes)O[P] = Attributes.value;
  return O;
};
},{"./_an-object":39,"./_descriptors":47,"./_ie8-dom-define":57,"./_to-primitive":97}],74:[function(require,module,exports){
var dP       = require('./_object-dp')
  , anObject = require('./_an-object')
  , getKeys  = require('./_object-keys');

module.exports = require('./_descriptors') ? Object.defineProperties : function defineProperties(O, Properties){
  anObject(O);
  var keys   = getKeys(Properties)
    , length = keys.length
    , i = 0
    , P;
  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
  return O;
};
},{"./_an-object":39,"./_descriptors":47,"./_object-dp":73,"./_object-keys":81}],75:[function(require,module,exports){
var pIE            = require('./_object-pie')
  , createDesc     = require('./_property-desc')
  , toIObject      = require('./_to-iobject')
  , toPrimitive    = require('./_to-primitive')
  , has            = require('./_has')
  , IE8_DOM_DEFINE = require('./_ie8-dom-define')
  , gOPD           = Object.getOwnPropertyDescriptor;

exports.f = require('./_descriptors') ? gOPD : function getOwnPropertyDescriptor(O, P){
  O = toIObject(O);
  P = toPrimitive(P, true);
  if(IE8_DOM_DEFINE)try {
    return gOPD(O, P);
  } catch(e){ /* empty */ }
  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
};
},{"./_descriptors":47,"./_has":54,"./_ie8-dom-define":57,"./_object-pie":82,"./_property-desc":85,"./_to-iobject":94,"./_to-primitive":97}],76:[function(require,module,exports){
// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = require('./_to-iobject')
  , gOPN      = require('./_object-gopn').f
  , toString  = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function(it){
  try {
    return gOPN(it);
  } catch(e){
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it){
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};

},{"./_object-gopn":77,"./_to-iobject":94}],77:[function(require,module,exports){
// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys      = require('./_object-keys-internal')
  , hiddenKeys = require('./_enum-bug-keys').concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
  return $keys(O, hiddenKeys);
};
},{"./_enum-bug-keys":49,"./_object-keys-internal":80}],78:[function(require,module,exports){
exports.f = Object.getOwnPropertySymbols;
},{}],79:[function(require,module,exports){
// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has         = require('./_has')
  , toObject    = require('./_to-object')
  , IE_PROTO    = require('./_shared-key')('IE_PROTO')
  , ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function(O){
  O = toObject(O);
  if(has(O, IE_PROTO))return O[IE_PROTO];
  if(typeof O.constructor == 'function' && O instanceof O.constructor){
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};
},{"./_has":54,"./_shared-key":89,"./_to-object":96}],80:[function(require,module,exports){
var has          = require('./_has')
  , toIObject    = require('./_to-iobject')
  , arrayIndexOf = require('./_array-includes')(false)
  , IE_PROTO     = require('./_shared-key')('IE_PROTO');

module.exports = function(object, names){
  var O      = toIObject(object)
    , i      = 0
    , result = []
    , key;
  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while(names.length > i)if(has(O, key = names[i++])){
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};
},{"./_array-includes":40,"./_has":54,"./_shared-key":89,"./_to-iobject":94}],81:[function(require,module,exports){
// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys       = require('./_object-keys-internal')
  , enumBugKeys = require('./_enum-bug-keys');

module.exports = Object.keys || function keys(O){
  return $keys(O, enumBugKeys);
};
},{"./_enum-bug-keys":49,"./_object-keys-internal":80}],82:[function(require,module,exports){
exports.f = {}.propertyIsEnumerable;
},{}],83:[function(require,module,exports){
// most Object methods by ES6 should accept primitives
var $export = require('./_export')
  , core    = require('./_core')
  , fails   = require('./_fails');
module.exports = function(KEY, exec){
  var fn  = (core.Object || {})[KEY] || Object[KEY]
    , exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
};
},{"./_core":43,"./_export":51,"./_fails":52}],84:[function(require,module,exports){
var getKeys   = require('./_object-keys')
  , toIObject = require('./_to-iobject')
  , isEnum    = require('./_object-pie').f;
module.exports = function(isEntries){
  return function(it){
    var O      = toIObject(it)
      , keys   = getKeys(O)
      , length = keys.length
      , i      = 0
      , result = []
      , key;
    while(length > i)if(isEnum.call(O, key = keys[i++])){
      result.push(isEntries ? [key, O[key]] : O[key]);
    } return result;
  };
};
},{"./_object-keys":81,"./_object-pie":82,"./_to-iobject":94}],85:[function(require,module,exports){
module.exports = function(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
};
},{}],86:[function(require,module,exports){
module.exports = require('./_hide');
},{"./_hide":55}],87:[function(require,module,exports){
// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = require('./_is-object')
  , anObject = require('./_an-object');
var check = function(O, proto){
  anObject(O);
  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function(test, buggy, set){
      try {
        set = require('./_ctx')(Function.call, require('./_object-gopd').f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch(e){ buggy = true; }
      return function setPrototypeOf(O, proto){
        check(O, proto);
        if(buggy)O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};
},{"./_an-object":39,"./_ctx":45,"./_is-object":61,"./_object-gopd":75}],88:[function(require,module,exports){
var def = require('./_object-dp').f
  , has = require('./_has')
  , TAG = require('./_wks')('toStringTag');

module.exports = function(it, tag, stat){
  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
};
},{"./_has":54,"./_object-dp":73,"./_wks":101}],89:[function(require,module,exports){
var shared = require('./_shared')('keys')
  , uid    = require('./_uid');
module.exports = function(key){
  return shared[key] || (shared[key] = uid(key));
};
},{"./_shared":90,"./_uid":98}],90:[function(require,module,exports){
var global = require('./_global')
  , SHARED = '__core-js_shared__'
  , store  = global[SHARED] || (global[SHARED] = {});
module.exports = function(key){
  return store[key] || (store[key] = {});
};
},{"./_global":53}],91:[function(require,module,exports){
var toInteger = require('./_to-integer')
  , defined   = require('./_defined');
// true  -> String#at
// false -> String#codePointAt
module.exports = function(TO_STRING){
  return function(that, pos){
    var s = String(defined(that))
      , i = toInteger(pos)
      , l = s.length
      , a, b;
    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};
},{"./_defined":46,"./_to-integer":93}],92:[function(require,module,exports){
var toInteger = require('./_to-integer')
  , max       = Math.max
  , min       = Math.min;
module.exports = function(index, length){
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};
},{"./_to-integer":93}],93:[function(require,module,exports){
// 7.1.4 ToInteger
var ceil  = Math.ceil
  , floor = Math.floor;
module.exports = function(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};
},{}],94:[function(require,module,exports){
// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = require('./_iobject')
  , defined = require('./_defined');
module.exports = function(it){
  return IObject(defined(it));
};
},{"./_defined":46,"./_iobject":58}],95:[function(require,module,exports){
// 7.1.15 ToLength
var toInteger = require('./_to-integer')
  , min       = Math.min;
module.exports = function(it){
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};
},{"./_to-integer":93}],96:[function(require,module,exports){
// 7.1.13 ToObject(argument)
var defined = require('./_defined');
module.exports = function(it){
  return Object(defined(it));
};
},{"./_defined":46}],97:[function(require,module,exports){
// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = require('./_is-object');
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function(it, S){
  if(!isObject(it))return it;
  var fn, val;
  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  throw TypeError("Can't convert object to primitive value");
};
},{"./_is-object":61}],98:[function(require,module,exports){
var id = 0
  , px = Math.random();
module.exports = function(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};
},{}],99:[function(require,module,exports){
var global         = require('./_global')
  , core           = require('./_core')
  , LIBRARY        = require('./_library')
  , wksExt         = require('./_wks-ext')
  , defineProperty = require('./_object-dp').f;
module.exports = function(name){
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
};
},{"./_core":43,"./_global":53,"./_library":69,"./_object-dp":73,"./_wks-ext":100}],100:[function(require,module,exports){
exports.f = require('./_wks');
},{"./_wks":101}],101:[function(require,module,exports){
var store      = require('./_shared')('wks')
  , uid        = require('./_uid')
  , Symbol     = require('./_global').Symbol
  , USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function(name){
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;
},{"./_global":53,"./_shared":90,"./_uid":98}],102:[function(require,module,exports){
var classof   = require('./_classof')
  , ITERATOR  = require('./_wks')('iterator')
  , Iterators = require('./_iterators');
module.exports = require('./_core').getIteratorMethod = function(it){
  if(it != undefined)return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};
},{"./_classof":41,"./_core":43,"./_iterators":67,"./_wks":101}],103:[function(require,module,exports){
var anObject = require('./_an-object')
  , get      = require('./core.get-iterator-method');
module.exports = require('./_core').getIterator = function(it){
  var iterFn = get(it);
  if(typeof iterFn != 'function')throw TypeError(it + ' is not iterable!');
  return anObject(iterFn.call(it));
};
},{"./_an-object":39,"./_core":43,"./core.get-iterator-method":102}],104:[function(require,module,exports){
var classof   = require('./_classof')
  , ITERATOR  = require('./_wks')('iterator')
  , Iterators = require('./_iterators');
module.exports = require('./_core').isIterable = function(it){
  var O = Object(it);
  return O[ITERATOR] !== undefined
    || '@@iterator' in O
    || Iterators.hasOwnProperty(classof(O));
};
},{"./_classof":41,"./_core":43,"./_iterators":67,"./_wks":101}],105:[function(require,module,exports){
'use strict';
var ctx            = require('./_ctx')
  , $export        = require('./_export')
  , toObject       = require('./_to-object')
  , call           = require('./_iter-call')
  , isArrayIter    = require('./_is-array-iter')
  , toLength       = require('./_to-length')
  , createProperty = require('./_create-property')
  , getIterFn      = require('./core.get-iterator-method');

$export($export.S + $export.F * !require('./_iter-detect')(function(iter){ Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike/*, mapfn = undefined, thisArg = undefined*/){
    var O       = toObject(arrayLike)
      , C       = typeof this == 'function' ? this : Array
      , aLen    = arguments.length
      , mapfn   = aLen > 1 ? arguments[1] : undefined
      , mapping = mapfn !== undefined
      , index   = 0
      , iterFn  = getIterFn(O)
      , length, result, step, iterator;
    if(mapping)mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if(iterFn != undefined && !(C == Array && isArrayIter(iterFn))){
      for(iterator = iterFn.call(O), result = new C; !(step = iterator.next()).done; index++){
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for(result = new C(length); length > index; index++){
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});

},{"./_create-property":44,"./_ctx":45,"./_export":51,"./_is-array-iter":59,"./_iter-call":62,"./_iter-detect":65,"./_to-length":95,"./_to-object":96,"./core.get-iterator-method":102}],106:[function(require,module,exports){
'use strict';
var addToUnscopables = require('./_add-to-unscopables')
  , step             = require('./_iter-step')
  , Iterators        = require('./_iterators')
  , toIObject        = require('./_to-iobject');

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = require('./_iter-define')(Array, 'Array', function(iterated, kind){
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , kind  = this._k
    , index = this._i++;
  if(!O || index >= O.length){
    this._t = undefined;
    return step(1);
  }
  if(kind == 'keys'  )return step(0, index);
  if(kind == 'values')return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');
},{"./_add-to-unscopables":38,"./_iter-define":64,"./_iter-step":66,"./_iterators":67,"./_to-iobject":94}],107:[function(require,module,exports){
// 19.1.3.1 Object.assign(target, source)
var $export = require('./_export');

$export($export.S + $export.F, 'Object', {assign: require('./_object-assign')});
},{"./_export":51,"./_object-assign":71}],108:[function(require,module,exports){
var $export = require('./_export')
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', {create: require('./_object-create')});
},{"./_export":51,"./_object-create":72}],109:[function(require,module,exports){
var $export = require('./_export');
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !require('./_descriptors'), 'Object', {defineProperty: require('./_object-dp').f});
},{"./_descriptors":47,"./_export":51,"./_object-dp":73}],110:[function(require,module,exports){
// 19.1.2.9 Object.getPrototypeOf(O)
var toObject        = require('./_to-object')
  , $getPrototypeOf = require('./_object-gpo');

require('./_object-sap')('getPrototypeOf', function(){
  return function getPrototypeOf(it){
    return $getPrototypeOf(toObject(it));
  };
});
},{"./_object-gpo":79,"./_object-sap":83,"./_to-object":96}],111:[function(require,module,exports){
// 19.1.2.14 Object.keys(O)
var toObject = require('./_to-object')
  , $keys    = require('./_object-keys');

require('./_object-sap')('keys', function(){
  return function keys(it){
    return $keys(toObject(it));
  };
});
},{"./_object-keys":81,"./_object-sap":83,"./_to-object":96}],112:[function(require,module,exports){
// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = require('./_export');
$export($export.S, 'Object', {setPrototypeOf: require('./_set-proto').set});
},{"./_export":51,"./_set-proto":87}],113:[function(require,module,exports){

},{}],114:[function(require,module,exports){
'use strict';
var $at  = require('./_string-at')(true);

// 21.1.3.27 String.prototype[@@iterator]()
require('./_iter-define')(String, 'String', function(iterated){
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function(){
  var O     = this._t
    , index = this._i
    , point;
  if(index >= O.length)return {value: undefined, done: true};
  point = $at(O, index);
  this._i += point.length;
  return {value: point, done: false};
});
},{"./_iter-define":64,"./_string-at":91}],115:[function(require,module,exports){
'use strict';
// ECMAScript 6 symbols shim
var global         = require('./_global')
  , has            = require('./_has')
  , DESCRIPTORS    = require('./_descriptors')
  , $export        = require('./_export')
  , redefine       = require('./_redefine')
  , META           = require('./_meta').KEY
  , $fails         = require('./_fails')
  , shared         = require('./_shared')
  , setToStringTag = require('./_set-to-string-tag')
  , uid            = require('./_uid')
  , wks            = require('./_wks')
  , wksExt         = require('./_wks-ext')
  , wksDefine      = require('./_wks-define')
  , keyOf          = require('./_keyof')
  , enumKeys       = require('./_enum-keys')
  , isArray        = require('./_is-array')
  , anObject       = require('./_an-object')
  , toIObject      = require('./_to-iobject')
  , toPrimitive    = require('./_to-primitive')
  , createDesc     = require('./_property-desc')
  , _create        = require('./_object-create')
  , gOPNExt        = require('./_object-gopn-ext')
  , $GOPD          = require('./_object-gopd')
  , $DP            = require('./_object-dp')
  , $keys          = require('./_object-keys')
  , gOPD           = $GOPD.f
  , dP             = $DP.f
  , gOPN           = gOPNExt.f
  , $Symbol        = global.Symbol
  , $JSON          = global.JSON
  , _stringify     = $JSON && $JSON.stringify
  , PROTOTYPE      = 'prototype'
  , HIDDEN         = wks('_hidden')
  , TO_PRIMITIVE   = wks('toPrimitive')
  , isEnum         = {}.propertyIsEnumerable
  , SymbolRegistry = shared('symbol-registry')
  , AllSymbols     = shared('symbols')
  , OPSymbols      = shared('op-symbols')
  , ObjectProto    = Object[PROTOTYPE]
  , USE_NATIVE     = typeof $Symbol == 'function'
  , QObject        = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function(){
  return _create(dP({}, 'a', {
    get: function(){ return dP(this, 'a', {value: 7}).a; }
  })).a != 7;
}) ? function(it, key, D){
  var protoDesc = gOPD(ObjectProto, key);
  if(protoDesc)delete ObjectProto[key];
  dP(it, key, D);
  if(protoDesc && it !== ObjectProto)dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function(tag){
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function(it){
  return typeof it == 'symbol';
} : function(it){
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D){
  if(it === ObjectProto)$defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if(has(AllSymbols, key)){
    if(!D.enumerable){
      if(!has(it, HIDDEN))dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
      D = _create(D, {enumerable: createDesc(0, false)});
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P){
  anObject(it);
  var keys = enumKeys(P = toIObject(P))
    , i    = 0
    , l = keys.length
    , key;
  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P){
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key){
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if(this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
  it  = toIObject(it);
  key = toPrimitive(key, true);
  if(it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return;
  var D = gOPD(it, key);
  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it){
  var names  = gOPN(toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i){
    if(!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
  var IS_OP  = it === ObjectProto
    , names  = gOPN(IS_OP ? OPSymbols : toIObject(it))
    , result = []
    , i      = 0
    , key;
  while(names.length > i){
    if(has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true))result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if(!USE_NATIVE){
  $Symbol = function Symbol(){
    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function(value){
      if(this === ObjectProto)$set.call(OPSymbols, value);
      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if(DESCRIPTORS && setter)setSymbolDesc(ObjectProto, tag, {configurable: true, set: $set});
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString(){
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f   = $defineProperty;
  require('./_object-gopn').f = gOPNExt.f = $getOwnPropertyNames;
  require('./_object-pie').f  = $propertyIsEnumerable;
  require('./_object-gops').f = $getOwnPropertySymbols;

  if(DESCRIPTORS && !require('./_library')){
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function(name){
    return wrap(wks(name));
  }
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, {Symbol: $Symbol});

for(var symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), i = 0; symbols.length > i; )wks(symbols[i++]);

for(var symbols = $keys(wks.store), i = 0; symbols.length > i; )wksDefine(symbols[i++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function(key){
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(key){
    if(isSymbol(key))return keyOf(SymbolRegistry, key);
    throw TypeError(key + ' is not a symbol!');
  },
  useSetter: function(){ setter = true; },
  useSimple: function(){ setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function(){
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it){
    if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
    var args = [it]
      , i    = 1
      , replacer, $replacer;
    while(arguments.length > i)args.push(arguments[i++]);
    replacer = args[1];
    if(typeof replacer == 'function')$replacer = replacer;
    if($replacer || !isArray(replacer))replacer = function(key, value){
      if($replacer)value = $replacer.call(this, key, value);
      if(!isSymbol(value))return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || require('./_hide')($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);
},{"./_an-object":39,"./_descriptors":47,"./_enum-keys":50,"./_export":51,"./_fails":52,"./_global":53,"./_has":54,"./_hide":55,"./_is-array":60,"./_keyof":68,"./_library":69,"./_meta":70,"./_object-create":72,"./_object-dp":73,"./_object-gopd":75,"./_object-gopn":77,"./_object-gopn-ext":76,"./_object-gops":78,"./_object-keys":81,"./_object-pie":82,"./_property-desc":85,"./_redefine":86,"./_set-to-string-tag":88,"./_shared":90,"./_to-iobject":94,"./_to-primitive":97,"./_uid":98,"./_wks":101,"./_wks-define":99,"./_wks-ext":100}],116:[function(require,module,exports){
// https://github.com/tc39/proposal-object-values-entries
var $export  = require('./_export')
  , $entries = require('./_object-to-array')(true);

$export($export.S, 'Object', {
  entries: function entries(it){
    return $entries(it);
  }
});
},{"./_export":51,"./_object-to-array":84}],117:[function(require,module,exports){
require('./_wks-define')('asyncIterator');
},{"./_wks-define":99}],118:[function(require,module,exports){
require('./_wks-define')('observable');
},{"./_wks-define":99}],119:[function(require,module,exports){
require('./es6.array.iterator');
var global        = require('./_global')
  , hide          = require('./_hide')
  , Iterators     = require('./_iterators')
  , TO_STRING_TAG = require('./_wks')('toStringTag');

for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
  var NAME       = collections[i]
    , Collection = global[NAME]
    , proto      = Collection && Collection.prototype;
  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}
},{"./_global":53,"./_hide":55,"./_iterators":67,"./_wks":101,"./es6.array.iterator":106}],120:[function(require,module,exports){
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

},{"./_hashClear":158,"./_hashDelete":159,"./_hashGet":160,"./_hashHas":161,"./_hashSet":162}],121:[function(require,module,exports){
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

},{"./_listCacheClear":169,"./_listCacheDelete":170,"./_listCacheGet":171,"./_listCacheHas":172,"./_listCacheSet":173}],122:[function(require,module,exports){
var getNative = require('./_getNative'),
    root = require('./_root');

/* Built-in method references that are verified to be native. */
var Map = getNative(root, 'Map');

module.exports = Map;

},{"./_getNative":155,"./_root":184}],123:[function(require,module,exports){
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

},{"./_mapCacheClear":174,"./_mapCacheDelete":175,"./_mapCacheGet":176,"./_mapCacheHas":177,"./_mapCacheSet":178}],124:[function(require,module,exports){
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

},{"./_ListCache":121,"./_stackClear":187,"./_stackDelete":188,"./_stackGet":189,"./_stackHas":190,"./_stackSet":191}],125:[function(require,module,exports){
var root = require('./_root');

/** Built-in value references. */
var Uint8Array = root.Uint8Array;

module.exports = Uint8Array;

},{"./_root":184}],126:[function(require,module,exports){
/**
 * A faster alternative to `Function#apply`, this function invokes `func`
 * with the `this` binding of `thisArg` and the arguments of `args`.
 *
 * @private
 * @param {Function} func The function to invoke.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} args The arguments to invoke `func` with.
 * @returns {*} Returns the result of `func`.
 */
function apply(func, thisArg, args) {
  switch (args.length) {
    case 0: return func.call(thisArg);
    case 1: return func.call(thisArg, args[0]);
    case 2: return func.call(thisArg, args[0], args[1]);
    case 3: return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}

module.exports = apply;

},{}],127:[function(require,module,exports){
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

},{"./_baseTimes":142,"./_isIndex":164,"./isArguments":197,"./isArray":198,"./isBuffer":201,"./isTypedArray":208}],128:[function(require,module,exports){
var baseAssignValue = require('./_baseAssignValue'),
    eq = require('./eq');

/**
 * This function is like `assignValue` except that it doesn't assign
 * `undefined` values.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignMergeValue(object, key, value) {
  if ((value !== undefined && !eq(object[key], value)) ||
      (value === undefined && !(key in object))) {
    baseAssignValue(object, key, value);
  }
}

module.exports = assignMergeValue;

},{"./_baseAssignValue":131,"./eq":195}],129:[function(require,module,exports){
var baseAssignValue = require('./_baseAssignValue'),
    eq = require('./eq');

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
      (value === undefined && !(key in object))) {
    baseAssignValue(object, key, value);
  }
}

module.exports = assignValue;

},{"./_baseAssignValue":131,"./eq":195}],130:[function(require,module,exports){
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

},{"./eq":195}],131:[function(require,module,exports){
var defineProperty = require('./_defineProperty');

/**
 * The base implementation of `assignValue` and `assignMergeValue` without
 * value checks.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function baseAssignValue(object, key, value) {
  if (key == '__proto__' && defineProperty) {
    defineProperty(object, key, {
      'configurable': true,
      'enumerable': true,
      'value': value,
      'writable': true
    });
  } else {
    object[key] = value;
  }
}

module.exports = baseAssignValue;

},{"./_defineProperty":152}],132:[function(require,module,exports){
var isObject = require('./isObject');

/** Built-in value references. */
var objectCreate = Object.create;

/**
 * The base implementation of `_.create` without support for assigning
 * properties to the created object.
 *
 * @private
 * @param {Object} proto The object to inherit from.
 * @returns {Object} Returns the new object.
 */
var baseCreate = (function() {
  function object() {}
  return function(proto) {
    if (!isObject(proto)) {
      return {};
    }
    if (objectCreate) {
      return objectCreate(proto);
    }
    object.prototype = proto;
    var result = new object;
    object.prototype = undefined;
    return result;
  };
}());

module.exports = baseCreate;

},{"./isObject":204}],133:[function(require,module,exports){
var createBaseFor = require('./_createBaseFor');

/**
 * The base implementation of `baseForOwn` which iterates over `object`
 * properties returned by `keysFunc` and invokes `iteratee` for each property.
 * Iteratee functions may exit iteration early by explicitly returning `false`.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @returns {Object} Returns `object`.
 */
var baseFor = createBaseFor();

module.exports = baseFor;

},{"./_createBaseFor":151}],134:[function(require,module,exports){
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

},{"./isObjectLike":205}],135:[function(require,module,exports){
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

},{"./_isMasked":167,"./_toSource":192,"./isFunction":202,"./isObject":204}],136:[function(require,module,exports){
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

},{"./isLength":203,"./isObjectLike":205}],137:[function(require,module,exports){
var isObject = require('./isObject'),
    isPrototype = require('./_isPrototype'),
    nativeKeysIn = require('./_nativeKeysIn');

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeysIn(object) {
  if (!isObject(object)) {
    return nativeKeysIn(object);
  }
  var isProto = isPrototype(object),
      result = [];

  for (var key in object) {
    if (!(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}

module.exports = baseKeysIn;

},{"./_isPrototype":168,"./_nativeKeysIn":180,"./isObject":204}],138:[function(require,module,exports){
var Stack = require('./_Stack'),
    assignMergeValue = require('./_assignMergeValue'),
    baseFor = require('./_baseFor'),
    baseMergeDeep = require('./_baseMergeDeep'),
    isObject = require('./isObject'),
    keysIn = require('./keysIn');

/**
 * The base implementation of `_.merge` without support for multiple sources.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @param {number} srcIndex The index of `source`.
 * @param {Function} [customizer] The function to customize merged values.
 * @param {Object} [stack] Tracks traversed source values and their merged
 *  counterparts.
 */
function baseMerge(object, source, srcIndex, customizer, stack) {
  if (object === source) {
    return;
  }
  baseFor(source, function(srcValue, key) {
    if (isObject(srcValue)) {
      stack || (stack = new Stack);
      baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
    }
    else {
      var newValue = customizer
        ? customizer(object[key], srcValue, (key + ''), object, source, stack)
        : undefined;

      if (newValue === undefined) {
        newValue = srcValue;
      }
      assignMergeValue(object, key, newValue);
    }
  }, keysIn);
}

module.exports = baseMerge;

},{"./_Stack":124,"./_assignMergeValue":128,"./_baseFor":133,"./_baseMergeDeep":139,"./isObject":204,"./keysIn":209}],139:[function(require,module,exports){
var assignMergeValue = require('./_assignMergeValue'),
    cloneBuffer = require('./_cloneBuffer'),
    cloneTypedArray = require('./_cloneTypedArray'),
    copyArray = require('./_copyArray'),
    initCloneObject = require('./_initCloneObject'),
    isArguments = require('./isArguments'),
    isArray = require('./isArray'),
    isArrayLikeObject = require('./isArrayLikeObject'),
    isBuffer = require('./isBuffer'),
    isFunction = require('./isFunction'),
    isObject = require('./isObject'),
    isPlainObject = require('./isPlainObject'),
    isTypedArray = require('./isTypedArray'),
    toPlainObject = require('./toPlainObject');

/**
 * A specialized version of `baseMerge` for arrays and objects which performs
 * deep merges and tracks traversed objects enabling objects with circular
 * references to be merged.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @param {string} key The key of the value to merge.
 * @param {number} srcIndex The index of `source`.
 * @param {Function} mergeFunc The function to merge values.
 * @param {Function} [customizer] The function to customize assigned values.
 * @param {Object} [stack] Tracks traversed source values and their merged
 *  counterparts.
 */
function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
  var objValue = object[key],
      srcValue = source[key],
      stacked = stack.get(srcValue);

  if (stacked) {
    assignMergeValue(object, key, stacked);
    return;
  }
  var newValue = customizer
    ? customizer(objValue, srcValue, (key + ''), object, source, stack)
    : undefined;

  var isCommon = newValue === undefined;

  if (isCommon) {
    var isArr = isArray(srcValue),
        isBuff = !isArr && isBuffer(srcValue),
        isTyped = !isArr && !isBuff && isTypedArray(srcValue);

    newValue = srcValue;
    if (isArr || isBuff || isTyped) {
      if (isArray(objValue)) {
        newValue = objValue;
      }
      else if (isArrayLikeObject(objValue)) {
        newValue = copyArray(objValue);
      }
      else if (isBuff) {
        isCommon = false;
        newValue = cloneBuffer(srcValue, true);
      }
      else if (isTyped) {
        isCommon = false;
        newValue = cloneTypedArray(srcValue, true);
      }
      else {
        newValue = [];
      }
    }
    else if (isPlainObject(srcValue) || isArguments(srcValue)) {
      newValue = objValue;
      if (isArguments(objValue)) {
        newValue = toPlainObject(objValue);
      }
      else if (!isObject(objValue) || (srcIndex && isFunction(objValue))) {
        newValue = initCloneObject(srcValue);
      }
    }
    else {
      isCommon = false;
    }
  }
  if (isCommon) {
    // Recursively merge objects and arrays (susceptible to call stack limits).
    stack.set(srcValue, newValue);
    mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
    stack['delete'](srcValue);
  }
  assignMergeValue(object, key, newValue);
}

module.exports = baseMergeDeep;

},{"./_assignMergeValue":128,"./_cloneBuffer":145,"./_cloneTypedArray":146,"./_copyArray":147,"./_initCloneObject":163,"./isArguments":197,"./isArray":198,"./isArrayLikeObject":200,"./isBuffer":201,"./isFunction":202,"./isObject":204,"./isPlainObject":206,"./isTypedArray":208,"./toPlainObject":216}],140:[function(require,module,exports){
var identity = require('./identity'),
    overRest = require('./_overRest'),
    setToString = require('./_setToString');

/**
 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 */
function baseRest(func, start) {
  return setToString(overRest(func, start, identity), func + '');
}

module.exports = baseRest;

},{"./_overRest":183,"./_setToString":185,"./identity":196}],141:[function(require,module,exports){
var constant = require('./constant'),
    defineProperty = require('./_defineProperty'),
    identity = require('./identity');

/**
 * The base implementation of `setToString` without support for hot loop shorting.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var baseSetToString = !defineProperty ? identity : function(func, string) {
  return defineProperty(func, 'toString', {
    'configurable': true,
    'enumerable': false,
    'value': constant(string),
    'writable': true
  });
};

module.exports = baseSetToString;

},{"./_defineProperty":152,"./constant":193,"./identity":196}],142:[function(require,module,exports){
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

},{}],143:[function(require,module,exports){
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

},{}],144:[function(require,module,exports){
var Uint8Array = require('./_Uint8Array');

/**
 * Creates a clone of `arrayBuffer`.
 *
 * @private
 * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
 * @returns {ArrayBuffer} Returns the cloned array buffer.
 */
function cloneArrayBuffer(arrayBuffer) {
  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
  new Uint8Array(result).set(new Uint8Array(arrayBuffer));
  return result;
}

module.exports = cloneArrayBuffer;

},{"./_Uint8Array":125}],145:[function(require,module,exports){
var root = require('./_root');

/** Detect free variable `exports`. */
var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined,
    allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined;

/**
 * Creates a clone of  `buffer`.
 *
 * @private
 * @param {Buffer} buffer The buffer to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Buffer} Returns the cloned buffer.
 */
function cloneBuffer(buffer, isDeep) {
  if (isDeep) {
    return buffer.slice();
  }
  var length = buffer.length,
      result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);

  buffer.copy(result);
  return result;
}

module.exports = cloneBuffer;

},{"./_root":184}],146:[function(require,module,exports){
var cloneArrayBuffer = require('./_cloneArrayBuffer');

/**
 * Creates a clone of `typedArray`.
 *
 * @private
 * @param {Object} typedArray The typed array to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned typed array.
 */
function cloneTypedArray(typedArray, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}

module.exports = cloneTypedArray;

},{"./_cloneArrayBuffer":144}],147:[function(require,module,exports){
/**
 * Copies the values of `source` to `array`.
 *
 * @private
 * @param {Array} source The array to copy values from.
 * @param {Array} [array=[]] The array to copy values to.
 * @returns {Array} Returns `array`.
 */
function copyArray(source, array) {
  var index = -1,
      length = source.length;

  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}

module.exports = copyArray;

},{}],148:[function(require,module,exports){
var assignValue = require('./_assignValue'),
    baseAssignValue = require('./_baseAssignValue');

/**
 * Copies properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Array} props The property identifiers to copy.
 * @param {Object} [object={}] The object to copy properties to.
 * @param {Function} [customizer] The function to customize copied values.
 * @returns {Object} Returns `object`.
 */
function copyObject(source, props, object, customizer) {
  var isNew = !object;
  object || (object = {});

  var index = -1,
      length = props.length;

  while (++index < length) {
    var key = props[index];

    var newValue = customizer
      ? customizer(object[key], source[key], key, object, source)
      : undefined;

    if (newValue === undefined) {
      newValue = source[key];
    }
    if (isNew) {
      baseAssignValue(object, key, newValue);
    } else {
      assignValue(object, key, newValue);
    }
  }
  return object;
}

module.exports = copyObject;

},{"./_assignValue":129,"./_baseAssignValue":131}],149:[function(require,module,exports){
var root = require('./_root');

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

module.exports = coreJsData;

},{"./_root":184}],150:[function(require,module,exports){
var baseRest = require('./_baseRest'),
    isIterateeCall = require('./_isIterateeCall');

/**
 * Creates a function like `_.assign`.
 *
 * @private
 * @param {Function} assigner The function to assign values.
 * @returns {Function} Returns the new assigner function.
 */
function createAssigner(assigner) {
  return baseRest(function(object, sources) {
    var index = -1,
        length = sources.length,
        customizer = length > 1 ? sources[length - 1] : undefined,
        guard = length > 2 ? sources[2] : undefined;

    customizer = (assigner.length > 3 && typeof customizer == 'function')
      ? (length--, customizer)
      : undefined;

    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
      customizer = length < 3 ? undefined : customizer;
      length = 1;
    }
    object = Object(object);
    while (++index < length) {
      var source = sources[index];
      if (source) {
        assigner(object, source, index, customizer);
      }
    }
    return object;
  });
}

module.exports = createAssigner;

},{"./_baseRest":140,"./_isIterateeCall":165}],151:[function(require,module,exports){
/**
 * Creates a base function for methods like `_.forIn` and `_.forOwn`.
 *
 * @private
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseFor(fromRight) {
  return function(object, iteratee, keysFunc) {
    var index = -1,
        iterable = Object(object),
        props = keysFunc(object),
        length = props.length;

    while (length--) {
      var key = props[fromRight ? length : ++index];
      if (iteratee(iterable[key], key, iterable) === false) {
        break;
      }
    }
    return object;
  };
}

module.exports = createBaseFor;

},{}],152:[function(require,module,exports){
var getNative = require('./_getNative');

var defineProperty = (function() {
  try {
    var func = getNative(Object, 'defineProperty');
    func({}, '', {});
    return func;
  } catch (e) {}
}());

module.exports = defineProperty;

},{"./_getNative":155}],153:[function(require,module,exports){
(function (global){
/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

module.exports = freeGlobal;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],154:[function(require,module,exports){
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

},{"./_isKeyable":166}],155:[function(require,module,exports){
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

},{"./_baseIsNative":135,"./_getValue":157}],156:[function(require,module,exports){
var overArg = require('./_overArg');

/** Built-in value references. */
var getPrototype = overArg(Object.getPrototypeOf, Object);

module.exports = getPrototype;

},{"./_overArg":182}],157:[function(require,module,exports){
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

},{}],158:[function(require,module,exports){
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

},{"./_nativeCreate":179}],159:[function(require,module,exports){
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

},{}],160:[function(require,module,exports){
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

},{"./_nativeCreate":179}],161:[function(require,module,exports){
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

},{"./_nativeCreate":179}],162:[function(require,module,exports){
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

},{"./_nativeCreate":179}],163:[function(require,module,exports){
var baseCreate = require('./_baseCreate'),
    getPrototype = require('./_getPrototype'),
    isPrototype = require('./_isPrototype');

/**
 * Initializes an object clone.
 *
 * @private
 * @param {Object} object The object to clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneObject(object) {
  return (typeof object.constructor == 'function' && !isPrototype(object))
    ? baseCreate(getPrototype(object))
    : {};
}

module.exports = initCloneObject;

},{"./_baseCreate":132,"./_getPrototype":156,"./_isPrototype":168}],164:[function(require,module,exports){
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

},{}],165:[function(require,module,exports){
var eq = require('./eq'),
    isArrayLike = require('./isArrayLike'),
    isIndex = require('./_isIndex'),
    isObject = require('./isObject');

/**
 * Checks if the given arguments are from an iteratee call.
 *
 * @private
 * @param {*} value The potential iteratee value argument.
 * @param {*} index The potential iteratee index or key argument.
 * @param {*} object The potential iteratee object argument.
 * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
 *  else `false`.
 */
function isIterateeCall(value, index, object) {
  if (!isObject(object)) {
    return false;
  }
  var type = typeof index;
  if (type == 'number'
        ? (isArrayLike(object) && isIndex(index, object.length))
        : (type == 'string' && index in object)
      ) {
    return eq(object[index], value);
  }
  return false;
}

module.exports = isIterateeCall;

},{"./_isIndex":164,"./eq":195,"./isArrayLike":199,"./isObject":204}],166:[function(require,module,exports){
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

},{}],167:[function(require,module,exports){
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

},{"./_coreJsData":149}],168:[function(require,module,exports){
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

},{}],169:[function(require,module,exports){
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

},{}],170:[function(require,module,exports){
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

},{"./_assocIndexOf":130}],171:[function(require,module,exports){
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

},{"./_assocIndexOf":130}],172:[function(require,module,exports){
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

},{"./_assocIndexOf":130}],173:[function(require,module,exports){
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

},{"./_assocIndexOf":130}],174:[function(require,module,exports){
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

},{"./_Hash":120,"./_ListCache":121,"./_Map":122}],175:[function(require,module,exports){
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

},{"./_getMapData":154}],176:[function(require,module,exports){
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

},{"./_getMapData":154}],177:[function(require,module,exports){
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

},{"./_getMapData":154}],178:[function(require,module,exports){
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

},{"./_getMapData":154}],179:[function(require,module,exports){
var getNative = require('./_getNative');

/* Built-in method references that are verified to be native. */
var nativeCreate = getNative(Object, 'create');

module.exports = nativeCreate;

},{"./_getNative":155}],180:[function(require,module,exports){
/**
 * This function is like
 * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * except that it includes inherited enumerable properties.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function nativeKeysIn(object) {
  var result = [];
  if (object != null) {
    for (var key in Object(object)) {
      result.push(key);
    }
  }
  return result;
}

module.exports = nativeKeysIn;

},{}],181:[function(require,module,exports){
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

},{"./_freeGlobal":153}],182:[function(require,module,exports){
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

},{}],183:[function(require,module,exports){
var apply = require('./_apply');

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * A specialized version of `baseRest` which transforms the rest array.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @param {Function} transform The rest array transform.
 * @returns {Function} Returns the new function.
 */
function overRest(func, start, transform) {
  start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
  return function() {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        array = Array(length);

    while (++index < length) {
      array[index] = args[start + index];
    }
    index = -1;
    var otherArgs = Array(start + 1);
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = transform(array);
    return apply(func, this, otherArgs);
  };
}

module.exports = overRest;

},{"./_apply":126}],184:[function(require,module,exports){
var freeGlobal = require('./_freeGlobal');

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;

},{"./_freeGlobal":153}],185:[function(require,module,exports){
var baseSetToString = require('./_baseSetToString'),
    shortOut = require('./_shortOut');

/**
 * Sets the `toString` method of `func` to return `string`.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var setToString = shortOut(baseSetToString);

module.exports = setToString;

},{"./_baseSetToString":141,"./_shortOut":186}],186:[function(require,module,exports){
/** Used to detect hot functions by number of calls within a span of milliseconds. */
var HOT_COUNT = 500,
    HOT_SPAN = 16;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeNow = Date.now;

/**
 * Creates a function that'll short out and invoke `identity` instead
 * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
 * milliseconds.
 *
 * @private
 * @param {Function} func The function to restrict.
 * @returns {Function} Returns the new shortable function.
 */
function shortOut(func) {
  var count = 0,
      lastCalled = 0;

  return function() {
    var stamp = nativeNow(),
        remaining = HOT_SPAN - (stamp - lastCalled);

    lastCalled = stamp;
    if (remaining > 0) {
      if (++count >= HOT_COUNT) {
        return arguments[0];
      }
    } else {
      count = 0;
    }
    return func.apply(undefined, arguments);
  };
}

module.exports = shortOut;

},{}],187:[function(require,module,exports){
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

},{"./_ListCache":121}],188:[function(require,module,exports){
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

},{}],189:[function(require,module,exports){
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

},{}],190:[function(require,module,exports){
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

},{}],191:[function(require,module,exports){
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

},{"./_ListCache":121,"./_Map":122,"./_MapCache":123}],192:[function(require,module,exports){
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

},{}],193:[function(require,module,exports){
/**
 * Creates a function that returns `value`.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {*} value The value to return from the new function.
 * @returns {Function} Returns the new constant function.
 * @example
 *
 * var objects = _.times(2, _.constant({ 'a': 1 }));
 *
 * console.log(objects);
 * // => [{ 'a': 1 }, { 'a': 1 }]
 *
 * console.log(objects[0] === objects[1]);
 * // => true
 */
function constant(value) {
  return function() {
    return value;
  };
}

module.exports = constant;

},{}],194:[function(require,module,exports){
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

},{"./isObject":204,"./now":212,"./toNumber":215}],195:[function(require,module,exports){
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

},{}],196:[function(require,module,exports){
/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */
function identity(value) {
  return value;
}

module.exports = identity;

},{}],197:[function(require,module,exports){
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

},{"./_baseIsArguments":134,"./isObjectLike":205}],198:[function(require,module,exports){
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

},{}],199:[function(require,module,exports){
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

},{"./isFunction":202,"./isLength":203}],200:[function(require,module,exports){
var isArrayLike = require('./isArrayLike'),
    isObjectLike = require('./isObjectLike');

/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}

module.exports = isArrayLikeObject;

},{"./isArrayLike":199,"./isObjectLike":205}],201:[function(require,module,exports){
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

},{"./_root":184,"./stubFalse":213}],202:[function(require,module,exports){
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

},{"./isObject":204}],203:[function(require,module,exports){
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

},{}],204:[function(require,module,exports){
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

},{}],205:[function(require,module,exports){
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

},{}],206:[function(require,module,exports){
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

},{"./_getPrototype":156,"./isObjectLike":205}],207:[function(require,module,exports){
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

},{"./isObjectLike":205}],208:[function(require,module,exports){
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

},{"./_baseIsTypedArray":136,"./_baseUnary":143,"./_nodeUtil":181}],209:[function(require,module,exports){
var arrayLikeKeys = require('./_arrayLikeKeys'),
    baseKeysIn = require('./_baseKeysIn'),
    isArrayLike = require('./isArrayLike');

/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
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
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */
function keysIn(object) {
  return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
}

module.exports = keysIn;

},{"./_arrayLikeKeys":127,"./_baseKeysIn":137,"./isArrayLike":199}],210:[function(require,module,exports){
var baseMerge = require('./_baseMerge'),
    createAssigner = require('./_createAssigner');

/**
 * This method is like `_.assign` except that it recursively merges own and
 * inherited enumerable string keyed properties of source objects into the
 * destination object. Source properties that resolve to `undefined` are
 * skipped if a destination value exists. Array and plain object properties
 * are merged recursively. Other objects and value types are overridden by
 * assignment. Source objects are applied from left to right. Subsequent
 * sources overwrite property assignments of previous sources.
 *
 * **Note:** This method mutates `object`.
 *
 * @static
 * @memberOf _
 * @since 0.5.0
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} [sources] The source objects.
 * @returns {Object} Returns `object`.
 * @example
 *
 * var object = {
 *   'a': [{ 'b': 2 }, { 'd': 4 }]
 * };
 *
 * var other = {
 *   'a': [{ 'c': 3 }, { 'e': 5 }]
 * };
 *
 * _.merge(object, other);
 * // => { 'a': [{ 'b': 2, 'c': 3 }, { 'd': 4, 'e': 5 }] }
 */
var merge = createAssigner(function(object, source, srcIndex) {
  baseMerge(object, source, srcIndex);
});

module.exports = merge;

},{"./_baseMerge":138,"./_createAssigner":150}],211:[function(require,module,exports){
var baseMerge = require('./_baseMerge'),
    createAssigner = require('./_createAssigner');

/**
 * This method is like `_.merge` except that it accepts `customizer` which
 * is invoked to produce the merged values of the destination and source
 * properties. If `customizer` returns `undefined`, merging is handled by the
 * method instead. The `customizer` is invoked with six arguments:
 * (objValue, srcValue, key, object, source, stack).
 *
 * **Note:** This method mutates `object`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} sources The source objects.
 * @param {Function} customizer The function to customize assigned values.
 * @returns {Object} Returns `object`.
 * @example
 *
 * function customizer(objValue, srcValue) {
 *   if (_.isArray(objValue)) {
 *     return objValue.concat(srcValue);
 *   }
 * }
 *
 * var object = { 'a': [1], 'b': [2] };
 * var other = { 'a': [3], 'b': [4] };
 *
 * _.mergeWith(object, other, customizer);
 * // => { 'a': [1, 3], 'b': [2, 4] }
 */
var mergeWith = createAssigner(function(object, source, srcIndex, customizer) {
  baseMerge(object, source, srcIndex, customizer);
});

module.exports = mergeWith;

},{"./_baseMerge":138,"./_createAssigner":150}],212:[function(require,module,exports){
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

},{"./_root":184}],213:[function(require,module,exports){
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

},{}],214:[function(require,module,exports){
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

},{"./debounce":194,"./isObject":204}],215:[function(require,module,exports){
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

},{"./isObject":204,"./isSymbol":207}],216:[function(require,module,exports){
var copyObject = require('./_copyObject'),
    keysIn = require('./keysIn');

/**
 * Converts `value` to a plain object flattening inherited enumerable string
 * keyed properties of `value` to own properties of the plain object.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {Object} Returns the converted plain object.
 * @example
 *
 * function Foo() {
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.assign({ 'a': 1 }, new Foo);
 * // => { 'a': 1, 'b': 2 }
 *
 * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
 * // => { 'a': 1, 'b': 2, 'c': 3 }
 */
function toPlainObject(value) {
  return copyObject(value, keysIn(value));
}

module.exports = toPlainObject;

},{"./_copyObject":148,"./keysIn":209}],217:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});exports.getAlt=exports.nextAlt=undefined;var _defineProperty2=require('babel-runtime/helpers/defineProperty');var _defineProperty3=_interopRequireDefault(_defineProperty2);var _merge2=require('lodash/merge');var _merge3=_interopRequireDefault(_merge2);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var nextAlt=exports.nextAlt=function nextAlt(tag,nAlts,initial){return{type:'nextAlt',tag:tag,nAlts:nAlts,initial:initial}};exports.default=function(){var state=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};var _ref=arguments[1];var type=_ref.type,tag=_ref.tag,initial=_ref.initial,nAlts=_ref.nAlts;switch(type){case'nextAlt':{var _state$tag=state[tag],oldAlt=_state$tag===undefined?initial||0:_state$tag;var newAlt=(oldAlt+1)%nAlts;return(0,_merge3.default)({},state,(0,_defineProperty3.default)({},tag,newAlt))}default:return state;}};var getAlt=exports.getAlt=function getAlt(_ref2,_ref3){var alter=_ref2.alter;var tag=_ref3.tag,initial=_ref3.initial;var _alter$tag=alter[tag],alt=_alter$tag===undefined?initial||0:_alter$tag;return{alt:alt}};

},{"babel-runtime/helpers/defineProperty":16,"lodash/merge":210}],218:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _redux=require('redux');var _reduxThunk=require('redux-thunk');var _reduxThunk2=_interopRequireDefault(_reduxThunk);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var configureStore=function configureStore(reducer){var middlewares=[_reduxThunk2.default];var storeComponents=[reducer];if("development"==='development'){var _require=require('redux-logger'),createLogger=_require.createLogger;middlewares.push(createLogger());storeComponents.push(window.__REDUX_DEVTOOLS_EXTENSION__&&window.__REDUX_DEVTOOLS_EXTENSION__())}storeComponents.push(_redux.applyMiddleware.apply(undefined,middlewares));var store=_redux.createStore.apply(undefined,storeComponents);return store};exports.default=configureStore;

},{"redux":"redux","redux-logger":"redux-logger","redux-thunk":"redux-thunk"}],219:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});exports.changedDoc=exports.needDoc=exports.getDoc=exports.fetchDoc=undefined;var _defineProperty2=require('babel-runtime/helpers/defineProperty');var _defineProperty3=_interopRequireDefault(_defineProperty2);var _merge2=require('lodash/merge');var _merge3=_interopRequireDefault(_merge2);var _server=require('server.js');var _helpers=require('helpers.js');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var fetchDoc=exports.fetchDoc=function fetchDoc(props){var docDir=props.docDir,docName=props.docName,docExt=props.docExt;var path=docDir+'/'+docName+'.'+docExt;return(0,_server.fetchData)({type:'fetchDoc',contentType:'json',path:path,desc:'document '+docName})};exports.default=function(){var state=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};var _ref=arguments[1];var type=_ref.type,path=_ref.path,data=_ref.data;switch(type){case'fetchDoc':{if(data==null){return state}return(0,_merge3.default)({},state,(0,_defineProperty3.default)({},path,data))}default:return state;}};var getDoc=exports.getDoc=function getDoc(_ref2,_ref3){var doc=_ref2.doc;var docDir=_ref3.docDir,docName=_ref3.docName,docExt=_ref3.docExt;return{text:doc[docDir+'/'+docName+'.'+docExt]}};var needDoc=exports.needDoc=function needDoc(props){return props.text==null};var changedDoc=exports.changedDoc=function changedDoc(newProps,oldProps){return(0,_helpers.propsChanged)(newProps,needDoc,oldProps,['docDir','docName','docExt'])};

},{"babel-runtime/helpers/defineProperty":16,"helpers.js":221,"lodash/merge":210,"server.js":225}],220:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});exports.testAllChecks=exports.placeFacets=exports.getFiltersApplied=exports.getFieldValues=exports.getFilterSetting=exports.setupFiltering=exports.changeFacetAll=exports.changeFacet=exports.changeFulltext=undefined;var _entries=require('babel-runtime/core-js/object/entries');var _entries2=_interopRequireDefault(_entries);var _getIterator2=require('babel-runtime/core-js/get-iterator');var _getIterator3=_interopRequireDefault(_getIterator2);var _classCallCheck2=require('babel-runtime/helpers/classCallCheck');var _classCallCheck3=_interopRequireDefault(_classCallCheck2);var _extends2=require('babel-runtime/helpers/extends');var _extends3=_interopRequireDefault(_extends2);var _slicedToArray2=require('babel-runtime/helpers/slicedToArray');var _slicedToArray3=_interopRequireDefault(_slicedToArray2);var _keys=require('babel-runtime/core-js/object/keys');var _keys2=_interopRequireDefault(_keys);var _defineProperty2=require('babel-runtime/helpers/defineProperty');var _defineProperty3=_interopRequireDefault(_defineProperty2);var _merge5=require('lodash/merge');var _merge6=_interopRequireDefault(_merge5);var _helpers=require('helpers.js');var _tables=require('tables.js');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var changeFulltext=exports.changeFulltext=function changeFulltext(table,filterId,searchString){return{type:'fulltext',table:table,filterId:filterId,data:searchString}};var changeFacet=exports.changeFacet=function changeFacet(table,filterId,valueId,onOff){return{type:'facet',table:table,filterId:filterId,data:[valueId,onOff]}};var changeFacetAll=exports.changeFacetAll=function changeFacetAll(table,filterId,onOff){return{type:'facetAll',table:table,filterId:filterId,data:onOff}};var setupFiltering=exports.setupFiltering=function setupFiltering(tables,table){return function(dispatch){var fieldValues=(0,_helpers.memoBind)(fCC,'compileFiltering',[table],[tables,table]);var filterSettings=(0,_helpers.memoBind)(fCC,'initFiltering',[table],[tables,table,fieldValues]);dispatch({type:'setupFiltering',table:table,filterSettings:filterSettings})}};exports.default=function(){var state=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};var _ref=arguments[1];var type=_ref.type,table=_ref.table,filterId=_ref.filterId,data=_ref.data,filterSettings=_ref.filterSettings;switch(type){case'setupFiltering':{return(0,_merge6.default)({},state,(0,_defineProperty3.default)({},table,{filterSettings:filterSettings,initialized:true}))}case'fulltext':{return(0,_merge6.default)({},state,(0,_defineProperty3.default)({},table,{filterSettings:(0,_defineProperty3.default)({},filterId,data)}))}case'facetAll':{var facets=state[table].filterSettings[filterId];var sameSettings={};(0,_keys2.default)(facets).forEach(function(valueId){sameSettings[valueId]=data});return(0,_merge6.default)({},state,(0,_defineProperty3.default)({},table,{filterSettings:(0,_defineProperty3.default)({},filterId,sameSettings)}))}case'facet':{var _data=(0,_slicedToArray3.default)(data,2),valueId=_data[0],filterSetting=_data[1];return(0,_merge6.default)({},state,(0,_defineProperty3.default)({},table,{filterSettings:(0,_defineProperty3.default)({},filterId,(0,_defineProperty3.default)({},valueId,filterSetting))}))}default:return state;}};var getFilterSetting=exports.getFilterSetting=function getFilterSetting(_ref2,_ref3){var filter=_ref2.filter;var table=_ref3.table,filterId=_ref3.filterId;return{filterSetting:filter[table].filterSettings[filterId]}};var getFieldValues=exports.getFieldValues=function getFieldValues(_ref4,_ref5){var tables=_ref4.tables;var table=_ref5.table,filterField=_ref5.filterField;return{fieldValues:(0,_helpers.memoBind)(fCC,'compileFiltering',[table],[tables,table])[filterField]}};var getFiltersApplied=exports.getFiltersApplied=function getFiltersApplied(_ref6,_ref7){var tables=_ref6.tables,filter=_ref6.filter;var table=_ref7.table;var _filter$table=filter[table],filterStatus=_filter$table===undefined?{filterSettings:{},initialized:false}:_filter$table;var filterSettings=filterStatus.filterSettings,initialized=filterStatus.initialized;var fieldValues=(0,_helpers.memoBind)(fCC,'compileFiltering',[table],[tables,table]);if(initialized){return(0,_extends3.default)({tables:tables,initialized:initialized,fieldValues:fieldValues,filterSettings:filterSettings},computeFiltering(tables,table,fieldValues,filterSettings))}else{return{tables:tables,initialized:initialized,fieldValues:fieldValues}}};var FilterCompileCache=function FilterCompileCache(){(0,_classCallCheck3.default)(this,FilterCompileCache);this.compileFiltering=function(tables,table){var _tables$table=tables[table],entities=_tables$table.entities,order=_tables$table.order,valueLists=_tables$table.valueLists,fields=_tables$table.fields,filterList=_tables$table.filterList,fieldSpecs=_tables$table.fieldSpecs;var presentFilterList=filterList.filter(function(x){return fields[x.field]});var filterFields=presentFilterList.filter(function(x){return x.type!=='FullText'}).map(function(x){return x.field});var fieldValues={};var _iteratorNormalCompletion=true;var _didIteratorError=false;var _iteratorError=undefined;try{var _loop=function _loop(){var field=_step.value;var valType=fieldSpecs[field].valType;var vals=valueLists[field];var fFieldValues=(0,_defineProperty3.default)({},'','-none-');var orderedVals=(0,_keys2.default)(vals).sort();if(typeof valType=='string'){orderedVals.forEach(function(v,i){fFieldValues[i]=v})}else{var rel=valType.values;orderedVals.forEach(function(v){fFieldValues[v]=(0,_tables.repr)(tables,rel,v)})}fieldValues[field]=fFieldValues};for(var _iterator=(0,_getIterator3.default)(filterFields),_step;!(_iteratorNormalCompletion=(_step=_iterator.next()).done);_iteratorNormalCompletion=true){_loop()}}catch(err){_didIteratorError=true;_iteratorError=err}finally{try{if(!_iteratorNormalCompletion&&_iterator.return){_iterator.return()}}finally{if(_didIteratorError){throw _iteratorError}}}return fieldValues};this.initFiltering=function(tables,table,fieldValues){var _tables$table2=tables[table],entities=_tables$table2.entities,order=_tables$table2.order,fields=_tables$table2.fields,filterList=_tables$table2.filterList;var presentFilterList=filterList.filter(function(x){return fields[x.field]});var filterSettings={};presentFilterList.forEach(function(filterSpec,filterId){if(filterSpec.type=='FullText'){filterSettings[filterId]=''}else{var facets={};(0,_keys2.default)(fieldValues[filterSpec.field]).forEach(function(valueId){facets[valueId]=true});filterSettings[filterId]=facets}});return filterSettings}};var fCC=new FilterCompileCache;var computeFiltering=function computeFiltering(tables,table,fieldValues,filterSettings){var _tables$table3=tables[table],entities=_tables$table3.entities,order=_tables$table3.order,fields=_tables$table3.fields,fieldSpecs=_tables$table3.fieldSpecs,filterList=_tables$table3.filterList;var presentFilterList=filterList.filter(function(x){return fields[x.field]});var filterChecks={};var otherFilteredData={};var makeFilterCheck=function makeFilterCheck(filterSpec,filterId){var field=filterSpec.field;var filterSetting=filterSettings[filterId];var fieldSpec=fieldSpecs[field];return(filterSpec.type==='FullText'?fulltextCheck:facetCheck)(tables,field,fieldSpec,filterSetting)};presentFilterList.forEach(function(filterSpec,filterId){filterChecks[filterId]=makeFilterCheck(filterSpec,filterId);otherFilteredData[filterId]=[]});var filteredData=[];var _iteratorNormalCompletion2=true;var _didIteratorError2=false;var _iteratorError2=undefined;try{var _loop2=function _loop2(){var eId=_step2.value;var entity=entities[eId];var theOneFail=null;var v=true;var discard=false;(0,_entries2.default)(filterChecks).forEach(function(_ref11){var _ref12=(0,_slicedToArray3.default)(_ref11,2),filterId=_ref12[0],filterCheck=_ref12[1];if(!discard){var pass=filterCheck(entity);if(!pass){v=false;if(theOneFail===null){theOneFail=filterId}else{discard=true}}}});if(!discard){var _id=entity.values._id;if(v){filteredData.push(_id);presentFilterList.forEach(function(filterSpec,filterId){otherFilteredData[filterId].push(_id)})}else{otherFilteredData[theOneFail].push(_id)}}};for(var _iterator2=(0,_getIterator3.default)(order),_step2;!(_iteratorNormalCompletion2=(_step2=_iterator2.next()).done);_iteratorNormalCompletion2=true){_loop2()}}catch(err){_didIteratorError2=true;_iteratorError2=err}finally{try{if(!_iteratorNormalCompletion2&&_iterator2.return){_iterator2.return()}}finally{if(_didIteratorError2){throw _iteratorError2}}}var amounts={};presentFilterList.forEach(function(_ref8,filterId){var field=_ref8.field,type=_ref8.type;var fieldSpec=fieldSpecs[field];amounts[filterId]=type==='FullText'?null:countFacets(tables,field,fieldSpec,fieldValues[field],otherFilteredData[filterId],entities)});var filteredAmountOthers={};(0,_entries2.default)(otherFilteredData).forEach(function(_ref9){var _ref10=(0,_slicedToArray3.default)(_ref9,2),filterId=_ref10[0],x=_ref10[1];filteredAmountOthers[filterId]=x.length});return{filteredData:filteredData,filteredAmountOthers:filteredAmountOthers,amounts:amounts}};var getUnpack=function getUnpack(tables,fieldSpec){var asString=arguments.length>2&&arguments[2]!==undefined?arguments[2]:false;var valType=fieldSpec.valType,multiple=fieldSpec.multiple;var unpack=void 0;if(typeof valType=='string'){unpack=multiple?asString?function(v){return v==null?'':v.join(' ')}:function(v){return v==null?[]:v}:asString?function(v){return v==null?'':v}:function(v){return v==null?[]:[v]}}else{var rel=valType.values;unpack=multiple?asString?function(v){return v==null?'':v.map(function(v){return(0,_tables.repr)(tables,rel,v).join(' ')})}:function(v){return v==null?[]:v}:asString?function(v){return v==null?'':(0,_tables.repr)(tables,rel,v)}:function(v){return v==null?[]:[v]}}return unpack};var fulltextCheck=function fulltextCheck(tables,field,fieldSpec,term){var unpack=getUnpack(tables,fieldSpec,true);var search=term.toLowerCase();if(search==null||search==''){return function(){return true}}return function(entity){var val=entity.values[field];var rep=unpack(val);return rep!=null&&rep.toLowerCase().indexOf(search)!==-1}};var facetCheck=function facetCheck(tables,field,fieldSpec,facetSettings){var unpack=getUnpack(tables,fieldSpec);if(facetSettings.size===0){return function(){return false}}return function(entity){var val=entity.values[field];var rep=unpack(val);if(rep.length==0){return facetSettings['']}var _iteratorNormalCompletion3=true;var _didIteratorError3=false;var _iteratorError3=undefined;try{for(var _iterator3=(0,_getIterator3.default)(rep),_step3;!(_iteratorNormalCompletion3=(_step3=_iterator3.next()).done);_iteratorNormalCompletion3=true){var r=_step3.value;if(facetSettings[r]){return true}}}catch(err){_didIteratorError3=true;_iteratorError3=err}finally{try{if(!_iteratorNormalCompletion3&&_iterator3.return){_iterator3.return()}}finally{if(_didIteratorError3){throw _iteratorError3}}}return false}};var countFacets=function countFacets(tables,field,fieldSpec,fieldValues,filteredData,entities){var unpack=getUnpack(tables,fieldSpec);var facetAmounts={};(0,_keys2.default)(fieldValues).forEach(function(r){facetAmounts[r]=0});var _iteratorNormalCompletion4=true;var _didIteratorError4=false;var _iteratorError4=undefined;try{for(var _iterator4=(0,_getIterator3.default)(filteredData),_step4;!(_iteratorNormalCompletion4=(_step4=_iterator4.next()).done);_iteratorNormalCompletion4=true){var eId=_step4.value;var val=entities[eId].values[field];var rep=unpack(val);if(rep.length==0){facetAmounts['']+=1}else{var _iteratorNormalCompletion5=true;var _didIteratorError5=false;var _iteratorError5=undefined;try{for(var _iterator5=(0,_getIterator3.default)(rep),_step5;!(_iteratorNormalCompletion5=(_step5=_iterator5.next()).done);_iteratorNormalCompletion5=true){var r=_step5.value;facetAmounts[r]+=1}}catch(err){_didIteratorError5=true;_iteratorError5=err}finally{try{if(!_iteratorNormalCompletion5&&_iterator5.return){_iterator5.return()}}finally{if(_didIteratorError5){throw _iteratorError5}}}}}}catch(err){_didIteratorError4=true;_iteratorError4=err}finally{try{if(!_iteratorNormalCompletion4&&_iterator4.return){_iterator4.return()}}finally{if(_didIteratorError4){throw _iteratorError4}}}return facetAmounts};var placeFacets=exports.placeFacets=function placeFacets(fieldValues,maxCols){if(fieldValues==null){return[]}var facets=(0,_entries2.default)(fieldValues).sort(function(x,y){return x[1].localeCompare(y[1])});if(facets.length==0){return[]}var rows=[];var lf=facets.length;var nrows=Math.floor(lf/maxCols)+(lf%maxCols?1:0);var ncols=Math.floor(lf/nrows)+(lf%nrows?1:0);for(var r=0;r<nrows;r++){var row=[];for(var c=0;c<ncols;c++){var f=nrows*c+r;row.push(f<lf?facets[f]:null)}rows.push(row)}return rows};var testAllChecks=exports.testAllChecks=function testAllChecks(filterSettings){var allTrue=true;var allFalse=true;var _iteratorNormalCompletion6=true;var _didIteratorError6=false;var _iteratorError6=undefined;try{for(var _iterator6=(0,_getIterator3.default)((0,_entries2.default)(filterSettings)),_step6;!(_iteratorNormalCompletion6=(_step6=_iterator6.next()).done);_iteratorNormalCompletion6=true){var _step6$value=(0,_slicedToArray3.default)(_step6.value,2),valueId=_step6$value[0],valueRep=_step6$value[1];if(valueRep){allFalse=false}else{allTrue=false}}}catch(err){_didIteratorError6=true;_iteratorError6=err}finally{try{if(!_iteratorNormalCompletion6&&_iterator6.return){_iterator6.return()}}finally{if(_didIteratorError6){throw _iteratorError6}}}return{allTrue:allTrue,allFalse:allFalse}};

},{"babel-runtime/core-js/get-iterator":2,"babel-runtime/core-js/object/entries":8,"babel-runtime/core-js/object/keys":10,"babel-runtime/helpers/classCallCheck":14,"babel-runtime/helpers/defineProperty":16,"babel-runtime/helpers/extends":17,"babel-runtime/helpers/slicedToArray":21,"helpers.js":221,"lodash/merge":210,"tables.js":226}],221:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});exports.combineSelectors=exports.propsChanged=undefined;var _assign=require('babel-runtime/core-js/object/assign');var _assign2=_interopRequireDefault(_assign);var _getIterator2=require('babel-runtime/core-js/get-iterator');var _getIterator3=_interopRequireDefault(_getIterator2);var _stringify=require('babel-runtime/core-js/json/stringify');var _stringify2=_interopRequireDefault(_stringify);var _typeof2=require('babel-runtime/helpers/typeof');var _typeof3=_interopRequireDefault(_typeof2);exports.memoBind=memoBind;function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function memoBind(thisArg,funcName,keyArgs,allArgs){if((typeof thisArg==='undefined'?'undefined':(0,_typeof3.default)(thisArg))!=='object'||!thisArg){throw new TypeError('Invalid thisArg parameter.')}var func=thisArg[funcName];if(typeof func!=='function'){throw new TypeError('\''+funcName+'\' is not a function.')}if(thisArg._memCache==null){thisArg._memCache={}}if(thisArg._memCache[funcName]==null){thisArg._memCache[funcName]={}}var cache=thisArg._memCache[funcName];var memoKey=(0,_stringify2.default)(keyArgs);if(cache[memoKey]==null){cache[memoKey]=func.apply(thisArg,allArgs)}return cache[memoKey]}var propsChanged=exports.propsChanged=function propsChanged(newProps,need,oldProps,keyPropNames){var result=false;if(oldProps==null){if(need(newProps)){result=true}}else{if(keyPropNames.some(function(a){return newProps[a]!=oldProps[a]})&&need(newProps)){result=true}}return result};var combineSelectors=exports.combineSelectors=function combineSelectors(){var _arguments=arguments;return function(state,props){var result={};var _iteratorNormalCompletion=true;var _didIteratorError=false;var _iteratorError=undefined;try{for(var _iterator=(0,_getIterator3.default)(_arguments),_step;!(_iteratorNormalCompletion=(_step=_iterator.next()).done);_iteratorNormalCompletion=true){var selector=_step.value;(0,_assign2.default)(result,selector(state,props))}}catch(err){_didIteratorError=true;_iteratorError=err}finally{try{if(!_iteratorNormalCompletion&&_iterator.return){_iterator.return()}}finally{if(_didIteratorError){throw _iteratorError}}}return result}};

},{"babel-runtime/core-js/get-iterator":2,"babel-runtime/core-js/json/stringify":4,"babel-runtime/core-js/object/assign":5,"babel-runtime/helpers/typeof":23}],222:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});exports.getMe=exports.fetchMe=undefined;var _extends2=require('babel-runtime/helpers/extends');var _extends3=_interopRequireDefault(_extends2);var _server=require('server.js');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var fetchMe=exports.fetchMe=function fetchMe(){return(0,_server.fetchData)({type:'fetchMe',contentType:'db',path:'/who/ami',desc:'me'})};exports.default=function(){var state=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};var _ref=arguments[1];var type=_ref.type,path=_ref.path,data=_ref.data;switch(type){case'fetchMe':{if(data==null){return{}}return(0,_extends3.default)({},data)}default:return state;}};var getMe=exports.getMe=function getMe(_ref2){var me=_ref2.me;return{me:me}};

},{"babel-runtime/helpers/extends":17,"server.js":225}],223:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});exports.getNotifications=exports.getNotify=exports.display=exports.clear=exports.notify=exports.succeed=exports.err=exports.ask=undefined;var _extends2=require('babel-runtime/helpers/extends');var _extends3=_interopRequireDefault(_extends2);var _toConsumableArray2=require('babel-runtime/helpers/toConsumableArray');var _toConsumableArray3=_interopRequireDefault(_toConsumableArray2);var _mergewith=require('lodash/mergewith');var _mergewith2=_interopRequireDefault(_mergewith);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var ask=exports.ask=function ask(desc){return{type:'async',status:'pending',desc:desc}};var err=exports.err=function err(desc,msgs){return{type:'async',status:'error',desc:desc,msgs:msgs}};var succeed=exports.succeed=function succeed(desc){return{type:'async',status:'success',desc:desc}};var notify=exports.notify=function notify(msgs){return{type:'msgs',msgs:msgs}};var clear=exports.clear=function clear(){return{type:'clear'}};var display=exports.display=function display(onOff){return{type:'display',onOff:onOff}};exports.default=function(){var state=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{items:[],busy:0,show:false};var _ref=arguments[1];var type=_ref.type,desc=_ref.desc,status=_ref.status,msgs=_ref.msgs,onOff=_ref.onOff;switch(type){case'async':{var items=state.items,busy=state.busy,show=state.show;var extraMsgs=msgs||[];switch(status){case'pending':{return(0,_mergewith2.default)({},state,{items:[].concat((0,_toConsumableArray3.default)(extraMsgs),[{kind:'special',text:'waiting for '+desc}]),busy:busy+1},addItems)}case'success':{return(0,_mergewith2.default)({},state,{items:[].concat((0,_toConsumableArray3.default)(extraMsgs),[{kind:'info',text:desc+' ok'}]),busy:busy-1},addItems)}case'error':{return(0,_mergewith2.default)({},state,{items:[].concat((0,_toConsumableArray3.default)(extraMsgs),[{kind:'error',text:desc+' failed'}]),busy:busy-1,show:true},addItems)}default:return state;}}case'msgs':{var _items=state.items;return(0,_mergewith2.default)({},state,{items:[].concat((0,_toConsumableArray3.default)(msgs)),show:true},addItems)}case'clear':{return(0,_extends3.default)({},state,{items:[],show:false})}case'display':{return(0,_extends3.default)({},state,{show:onOff})}default:return state;}};var getNotify=exports.getNotify=function getNotify(_ref2){var notify=_ref2.notify;return{notify:notify}};var getNotifications=exports.getNotifications=function getNotifications(_ref3){var notify=_ref3.notify;var items=notify.items,busy=notify.busy,show=notify.show;var lastNote=-1;var lastKind='';items.forEach(function(item,i){var kind=item.kind,text=item.text;if(kind=='error'){lastNote=i;lastKind='error'}else if(kind=='warning'){if(lastKind!='error'){lastNote=i;lastKind='warning'}}});return{notifications:items,busy:busy,show:show,lastMsg:items.length-1,lastNote:lastNote,lastKind:lastKind}};var addItems=function addItems(objValue,srcValue,key){if(key=='items'){return objValue==null?srcValue:objValue.concat(srcValue)}};

},{"babel-runtime/helpers/extends":17,"babel-runtime/helpers/toConsumableArray":22,"lodash/mergewith":211}],224:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _redux=require('redux');var _win=require('win.js');var _win2=_interopRequireDefault(_win);var _notify=require('notify.js');var _notify2=_interopRequireDefault(_notify);var _doc=require('doc.js');var _doc2=_interopRequireDefault(_doc);var _tables=require('tables.js');var _tables2=_interopRequireDefault(_tables);var _me=require('me.js');var _me2=_interopRequireDefault(_me);var _filter=require('filter.js');var _filter2=_interopRequireDefault(_filter);var _alter=require('alter.js');var _alter2=_interopRequireDefault(_alter);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}exports.default=(0,_redux.combineReducers)({win:_win2.default,notify:_notify2.default,doc:_doc2.default,tables:_tables2.default,me:_me2.default,filter:_filter2.default,alter:_alter2.default});

},{"alter.js":217,"doc.js":219,"filter.js":220,"me.js":222,"notify.js":223,"redux":"redux","tables.js":226,"win.js":227}],225:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});exports.fetchData=undefined;var _extends2=require('babel-runtime/helpers/extends');var _extends3=_interopRequireDefault(_extends2);require('whatwg-fetch');var _notify=require('notify.js');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var rootUrl='/api/';var fetchData=exports.fetchData=function fetchData(task){return function(dispatch){var path=task.path,contentType=task.contentType,desc=task.desc;dispatch((0,_notify.ask)(desc));dispatch((0,_extends3.default)({},task,{data:null}));var settings={credentials:'same-origin'};fetch(''+rootUrl+contentType+path,settings).then(function(response){return response.json()}).then(function(json){var msgs=json.msgs,good=json.good,data=json.data;if(good){dispatch((0,_notify.succeed)(desc));dispatch((0,_extends3.default)({},task,{data:data}))}else{dispatch((0,_notify.err)(desc,msgs))}}).catch(function(error){dispatch((0,_notify.err)(desc,[{kind:'error',text:error.toString()}]))})}};

},{"babel-runtime/helpers/extends":17,"notify.js":223,"whatwg-fetch":"whatwg-fetch"}],226:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});exports.repr=exports.changedItem=exports.needValues=exports.needTables=exports.getTableFilters=exports.getTables=exports.fetchItem=exports.fetchTableMy=exports.fetchTable=undefined;var _defineProperty2=require('babel-runtime/helpers/defineProperty');var _defineProperty3=_interopRequireDefault(_defineProperty2);var _mergewith=require('lodash/mergewith');var _mergewith2=_interopRequireDefault(_mergewith);var _server=require('server.js');var _helpers=require('helpers.js');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var fetchTable=exports.fetchTable=function fetchTable(table){return(0,_server.fetchData)({type:'fetchTable',contentType:'db',path:'/list?table='+table,desc:table+' table',table:table})};var fetchTableMy=exports.fetchTableMy=function fetchTableMy(table){return(0,_server.fetchData)({type:'fetchTableMy',contentType:'db',path:'/my?table='+table,desc:table+' table (my records)',table:table})};var fetchItem=exports.fetchItem=function fetchItem(props){var table=props.table,eId=props.eId,ownOnly=props.ownOnly;return(0,_server.fetchData)({type:'fetchItem',contentType:'db',path:'/view?table='+table+'&id='+eId+(ownOnly?'&own=true':''),desc:table+' record '+eId,table:table})};exports.default=function(){var state=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};var _ref=arguments[1];var type=_ref.type,path=_ref.path,data=_ref.data,table=_ref.table;switch(type){case'fetchTable':{if(data==null){return state}return(0,_mergewith2.default)({},state,data,setComplete)}case'fetchTableMy':{if(data==null){return state}return(0,_mergewith2.default)({},state,data,setComplete)}case'fetchItem':{if(data==null){return state}var _id=data.values._id;return(0,_mergewith2.default)({},state,(0,_defineProperty3.default)({},table,{entities:(0,_defineProperty3.default)({},_id,data)}),setComplete)}default:return state;}};var getTables=exports.getTables=function getTables(_ref2){var tables=_ref2.tables;return{tables:tables}};var getTableFilters=exports.getTableFilters=function getTableFilters(_ref3,_ref4){var tables=_ref3.tables;var table=_ref4.table;var _tables$table=tables[table],fields=_tables$table.fields,filterList=_tables$table.filterList;return{fields:fields,filterList:filterList}};var setComplete=function setComplete(newValue,oldValue,key){if(key=='complete'){return newValue||oldValue}};var needTables=exports.needTables=function needTables(tables,tableNames){var my=arguments.length>2&&arguments[2]!==undefined?arguments[2]:false;if(tables==null){return true}var tNames=!Array.isArray(tableNames)?[tableNames]:tableNames;return tNames.some(function(table){return tables[table]==null||my&&tables[table].my==null||!my&&tables[table].order==null})};var needValues=exports.needValues=function needValues(_ref5){var tables=_ref5.tables,table=_ref5.table,eId=_ref5.eId;var missing=tables==null||tables[table]==null||tables[table].entities[eId]==null;var complete=!missing&&tables[table].entities[eId].complete;return tables==null||tables[table]==null||tables[table].entities[eId]==null||!tables[table].entities[eId].complete};var changedItem=exports.changedItem=function changedItem(newProps,oldProps){return(0,_helpers.propsChanged)(newProps,needValues,oldProps,['table','eId'])};var repUser=function repUser(_ref6,valId){var user=_ref6.user;var valRep=void 0;var entity=user.entities[valId];if(entity){var _entity$values=entity.values,eppn=_entity$values.eppn,firstName=_entity$values.firstName,lastName=_entity$values.lastName,emailPre=_entity$values.emailPre,authority=_entity$values.authority,mayLogin=_entity$values.mayLogin;var email=emailPre||'';var linkText=[firstName||'',lastName||''].filter(function(x){return x}).join(' ');if(linkText==''){linkText=email}var namePart=linkText&&email?'['+linkText+'](mailto:'+email+')':linkText+email;var eppnPart=eppn?' eppn='+eppn+' ':'';var authorityPart=authority?' authenticated by='+authority+' ':'';var mayLoginPart=mayLogin?' active='+mayLogin+' ':'';valRep=[namePart,eppnPart,authorityPart,mayLoginPart].filter(function(x){return x}).join('; ')}else{valRep='UNKNOWN'}return valRep};var repCountry=function repCountry(_ref7,valId){var country=_ref7.country;var entity=country.entities[valId];if(entity){var _entity$values2=entity.values,name=_entity$values2.name,iso=_entity$values2.iso;return iso+': '+name}else{return'UNKNOWN'}};var repValue=function repValue(rel){return function(tables,valId){var entity=tables[rel].entities[valId];if(entity){var rep=entity.values.rep;return rep}else{return'UNKNOWN'}}};var repMap={user:repUser,country:repCountry,default:repValue};var repr=exports.repr=function repr(tables,rel,valId){return(repMap[rel]||repMap.default(rel))(tables,valId)};

},{"babel-runtime/helpers/defineProperty":16,"helpers.js":221,"lodash/mergewith":211,"server.js":225}],227:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});exports.getWinDim=exports.changeWinDim=undefined;var _extends2=require('babel-runtime/helpers/extends');var _extends3=_interopRequireDefault(_extends2);exports.columnStyle=columnStyle;function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var changeWinDim=exports.changeWinDim=function changeWinDim(){return function(dispatch){dispatch((0,_extends3.default)({type:'windim'},initWinDim()))}};exports.default=function(){var state=arguments.length>0&&arguments[0]!==undefined?arguments[0]:initWinDim();var _ref=arguments[1];var type=_ref.type,height=_ref.height,width=_ref.width;switch(type){case'windim':{return{height:height,width:width}}default:return state;}};var getWinDim=exports.getWinDim=function getWinDim(_ref2){var _ref2$win=_ref2.win,height=_ref2$win.height,width=_ref2$win.width;return{height:height,width:width}};var initWinDim=function initWinDim(){var _window=window,height=_window.innerHeight,width=_window.innerWidth;return{height:height,width:width}};var scrollBarWidth=40;var leftMargin=0;var topHeight=50;var topMargin=5;var divWidthSpec={left:120,rightLeft:380,rightLeftNav:150};var floatSpec={left:'left',right:'right',rightLeft:'left',rightLeftNav:'left',rightRight:'right',rightRightBody:'right'};function columnStyle(kind,_ref3){var height=_ref3.height,width=_ref3.width;var divHeight={left:height-topHeight,right:height-topHeight,rightLeft:height-topHeight-topMargin,rightLeftNav:height-topHeight-topMargin,rightRight:height-topHeight-topMargin,rightRightBody:height-topHeight-topMargin};var left=divWidthSpec.left,rightLeft=divWidthSpec.rightLeft,rightLeftNav=divWidthSpec.rightLeftNav;var divWidth=(0,_extends3.default)({},divWidthSpec,{right:width-left-scrollBarWidth,rightRight:width-left-rightLeft-2*scrollBarWidth-leftMargin,rightRightBody:width-left-rightLeftNav-2*scrollBarWidth-leftMargin});return{width:divWidth[kind],height:divHeight[kind],float:floatSpec[kind]}}

},{"babel-runtime/helpers/extends":17}],228:[function(require,module,exports){
'use strict';var _jsxFileName='/Users/dirk/github/dariah/client/src/js/app/main.jsx';var _react=require('react');var _react2=_interopRequireDefault(_react);var _reactDom=require('react-dom');var _reactRouter=require('react-router');var _Root=require('Root.jsx');var _Root2=_interopRequireDefault(_Root);var _App=require('App.jsx');var _App2=_interopRequireDefault(_App);var _SubApp=require('SubApp.jsx');var _SubApp2=_interopRequireDefault(_SubApp);var _Backoffice=require('Backoffice.jsx');var _Backoffice2=_interopRequireDefault(_Backoffice);var _ItemFiltered=require('ItemFiltered.jsx');var _ItemFiltered2=_interopRequireDefault(_ItemFiltered);var _ItemMy=require('ItemMy.jsx');var _ItemMy2=_interopRequireDefault(_ItemMy);var _ItemRecordPre=require('ItemRecordPre.jsx');var _ItemRecordPre2=_interopRequireDefault(_ItemRecordPre);var _Doc=require('Doc.jsx');var _Doc2=_interopRequireDefault(_Doc);var _NotFound=require('NotFound.jsx');var _NotFound2=_interopRequireDefault(_NotFound);var _configureStore=require('configureStore.js');var _configureStore2=_interopRequireDefault(_configureStore);var _rootReducer=require('rootReducer.js');var _rootReducer2=_interopRequireDefault(_rootReducer);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var store=(0,_configureStore2.default)(_rootReducer2.default);(0,_reactDom.render)(_react2.default.createElement(_Root2.default,{store:store,__source:{fileName:_jsxFileName,lineNumber:21}},_react2.default.createElement(_reactRouter.Router,{history:_reactRouter.browserHistory,__source:{fileName:_jsxFileName,lineNumber:22}},_react2.default.createElement(_reactRouter.Redirect,{from:'/about',to:'/docs/about.md',__source:{fileName:_jsxFileName,lineNumber:23}}),_react2.default.createElement(_reactRouter.Redirect,{from:'/docs/about',to:'/docs/about.md',__source:{fileName:_jsxFileName,lineNumber:24}}),_react2.default.createElement(_reactRouter.Redirect,{from:'/about.md',to:'/docs/about.md',__source:{fileName:_jsxFileName,lineNumber:25}}),_react2.default.createElement(_reactRouter.Redirect,{from:'/login',to:'/docs/about.md',__source:{fileName:_jsxFileName,lineNumber:26}}),_react2.default.createElement(_reactRouter.Redirect,{from:'/logout',to:'/docs/about.md',__source:{fileName:_jsxFileName,lineNumber:27}}),_react2.default.createElement(_reactRouter.Redirect,{from:'/slogout',to:'/docs/about.md',__source:{fileName:_jsxFileName,lineNumber:28}}),_react2.default.createElement(_reactRouter.Route,{path:'/',component:_App2.default,__source:{fileName:_jsxFileName,lineNumber:29}},_react2.default.createElement(_reactRouter.IndexRoute,{component:_App2.default,__source:{fileName:_jsxFileName,lineNumber:30}}),_react2.default.createElement(_reactRouter.IndexRedirect,{to:'/docs/about.md',__source:{fileName:_jsxFileName,lineNumber:31}}),_react2.default.createElement(_reactRouter.Route,{path:'docs/:docFile',component:_Doc2.default,__source:{fileName:_jsxFileName,lineNumber:32}}),_react2.default.createElement(_reactRouter.Route,{path:'tech/docs/gen/:docFile',component:_Doc2.default,__source:{fileName:_jsxFileName,lineNumber:33}}),_react2.default.createElement(_reactRouter.Route,{path:'tech/docs/:docFile',component:_Doc2.default,__source:{fileName:_jsxFileName,lineNumber:34}}),_react2.default.createElement(_reactRouter.Route,{path:':table',component:_SubApp2.default,__source:{fileName:_jsxFileName,lineNumber:35}},_react2.default.createElement(_reactRouter.Route,{path:'list',component:_ItemFiltered2.default,__source:{fileName:_jsxFileName,lineNumber:36}}),_react2.default.createElement(_reactRouter.Route,{path:'mylist',component:_ItemMy2.default,__source:{fileName:_jsxFileName,lineNumber:37}},_react2.default.createElement(_reactRouter.Route,{path:':eId',component:_ItemRecordPre2.default,ownOnly:true,__source:{fileName:_jsxFileName,lineNumber:38}})),_react2.default.createElement(_reactRouter.Route,{path:':func',component:_Backoffice2.default,__source:{fileName:_jsxFileName,lineNumber:40}}))),_react2.default.createElement(_reactRouter.Route,{path:'*',component:_NotFound2.default,__source:{fileName:_jsxFileName,lineNumber:43}}))),document.getElementById('body'));

},{"App.jsx":240,"Backoffice.jsx":241,"Doc.jsx":243,"ItemFiltered.jsx":233,"ItemMy.jsx":234,"ItemRecordPre.jsx":252,"NotFound.jsx":254,"Root.jsx":256,"SubApp.jsx":259,"configureStore.js":218,"react":"react","react-dom":"react-dom","react-router":"react-router","rootReducer.js":224}],229:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _getPrototypeOf=require('babel-runtime/core-js/object/get-prototype-of');var _getPrototypeOf2=_interopRequireDefault(_getPrototypeOf);var _classCallCheck2=require('babel-runtime/helpers/classCallCheck');var _classCallCheck3=_interopRequireDefault(_classCallCheck2);var _createClass2=require('babel-runtime/helpers/createClass');var _createClass3=_interopRequireDefault(_createClass2);var _possibleConstructorReturn2=require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3=_interopRequireDefault(_possibleConstructorReturn2);var _inherits2=require('babel-runtime/helpers/inherits');var _inherits3=_interopRequireDefault(_inherits2);var _jsxFileName='/Users/dirk/github/dariah/client/src/js/app/object/CheckboxI.jsx';var _react=require('react');var _react2=_interopRequireDefault(_react);var _reactRedux=require('react-redux');var _filter=require('filter.js');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var indeterminate=function indeterminate(states){return!states.allTrue&&!states.allFalse};var CheckboxI=function(_Component){(0,_inherits3.default)(CheckboxI,_Component);function CheckboxI(){var _ref;var _temp,_this,_ret;(0,_classCallCheck3.default)(this,CheckboxI);for(var _len=arguments.length,args=Array(_len),_key=0;_key<_len;_key++){args[_key]=arguments[_key]}return _ret=(_temp=(_this=(0,_possibleConstructorReturn3.default)(this,(_ref=CheckboxI.__proto__||(0,_getPrototypeOf2.default)(CheckboxI)).call.apply(_ref,[this].concat(args))),_this),_this.handleCheck=function(){var _this2=_this,_this2$props=_this2.props,filterSetting=_this2$props.filterSetting,table=_this2$props.table,filterId=_this2$props.filterId,handle=_this2$props.handle;var states=(0,_filter.testAllChecks)(filterSetting);return handle(table,filterId,_this.dom.indeterminate||!states.allTrue)},_this.setIndeterminate=function(domElem){var _this3=_this,filterSetting=_this3.props.filterSetting;var states=(0,_filter.testAllChecks)(filterSetting);if(domElem){_this.dom=domElem;domElem.indeterminate=indeterminate(states)}},_temp),(0,_possibleConstructorReturn3.default)(_this,_ret)}(0,_createClass3.default)(CheckboxI,[{key:'componentDidUpdate',value:function componentDidUpdate(){var filterSetting=this.props.filterSetting;var states=(0,_filter.testAllChecks)(filterSetting);this.dom.indeterminate=indeterminate(states)}},{key:'render',value:function render(){var filterSetting=this.props.filterSetting;var states=(0,_filter.testAllChecks)(filterSetting);return _react2.default.createElement('input',{ref:this.setIndeterminate,type:'checkbox',checked:states.allTrue,onChange:this.handleCheck,__source:{fileName:_jsxFileName,lineNumber:30}})}}]);return CheckboxI}(_react.Component);exports.default=(0,_reactRedux.connect)(_filter.getFilterSetting,{handle:_filter.changeFacetAll})(CheckboxI);

},{"babel-runtime/core-js/object/get-prototype-of":9,"babel-runtime/helpers/classCallCheck":14,"babel-runtime/helpers/createClass":15,"babel-runtime/helpers/inherits":18,"babel-runtime/helpers/possibleConstructorReturn":20,"filter.js":220,"react":"react","react-redux":"react-redux"}],230:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _getPrototypeOf=require('babel-runtime/core-js/object/get-prototype-of');var _getPrototypeOf2=_interopRequireDefault(_getPrototypeOf);var _classCallCheck2=require('babel-runtime/helpers/classCallCheck');var _classCallCheck3=_interopRequireDefault(_classCallCheck2);var _createClass2=require('babel-runtime/helpers/createClass');var _createClass3=_interopRequireDefault(_createClass2);var _possibleConstructorReturn2=require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3=_interopRequireDefault(_possibleConstructorReturn2);var _inherits2=require('babel-runtime/helpers/inherits');var _inherits3=_interopRequireDefault(_inherits2);var _jsxFileName='/Users/dirk/github/dariah/client/src/js/app/object/DocMd.jsx';var _react=require('react');var _react2=_interopRequireDefault(_react);var _reactRedux=require('react-redux');var _reactMarkdown=require('react-markdown');var _reactMarkdown2=_interopRequireDefault(_reactMarkdown);var _reactRouter=require('react-router');var _Alternative=require('Alternative.jsx');var _Alternative2=_interopRequireDefault(_Alternative);var _doc=require('doc.js');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var RouterLink=function RouterLink(_ref){var children=_ref.children,href=_ref.href;return href.match(/^(https?:)?\/\//)?_react2.default.createElement('a',{href:href,__source:{fileName:_jsxFileName,lineNumber:10}},children):_react2.default.createElement(_reactRouter.Link,{to:href,__source:{fileName:_jsxFileName,lineNumber:11}},children)};var DocMd=function(_Component){(0,_inherits3.default)(DocMd,_Component);function DocMd(){(0,_classCallCheck3.default)(this,DocMd);return(0,_possibleConstructorReturn3.default)(this,(DocMd.__proto__||(0,_getPrototypeOf2.default)(DocMd)).apply(this,arguments))}(0,_createClass3.default)(DocMd,[{key:'render',value:function render(){var _props=this.props,docName=_props.docName,text=_props.text;var controlPlacement=function controlPlacement(control){return _react2.default.createElement('p',{style:{float:'right'},__source:{fileName:_jsxFileName,lineNumber:17}},control)};var control1=function control1(handler){return _react2.default.createElement('a',{className:'control fa fa-hand-o-down',href:'#',title:'markdown source',onClick:handler,__source:{fileName:_jsxFileName,lineNumber:18}})};var control2=function control2(handler){return _react2.default.createElement('a',{className:'control fa fa-file-code-o',href:'#',title:'formatted',onClick:handler,__source:{fileName:_jsxFileName,lineNumber:19}})};if((0,_doc.needDoc)({text:text})){return _react2.default.createElement('div',{__source:{fileName:_jsxFileName,lineNumber:21}},'No document '+docName)}return _react2.default.createElement('div',{style:{paddingLeft:'0.5em'},__source:{fileName:_jsxFileName,lineNumber:23}},_react2.default.createElement(_Alternative2.default,{tag:docName,controlPlacement:controlPlacement,controls:[control1,control2],alternatives:[_react2.default.createElement('div',{key:'fmt',__source:{fileName:_jsxFileName,lineNumber:29}},_react2.default.createElement(_reactMarkdown2.default,{source:text,renderers:{Link:RouterLink},__source:{fileName:_jsxFileName,lineNumber:30}})),_react2.default.createElement('div',{key:'src',__source:{fileName:_jsxFileName,lineNumber:36}},_react2.default.createElement('pre',{className:'md-source',__source:{fileName:_jsxFileName,lineNumber:37}},text))],__source:{fileName:_jsxFileName,lineNumber:24}}))}},{key:'componentDidMount',value:function componentDidMount(){var props=this.props,fetch=this.props.fetch;fetch(props)}},{key:'componentDidUpdate',value:function componentDidUpdate(prevProps){var props=this.props,fetch=this.props.fetch;if((0,_doc.changedDoc)(props,prevProps)){fetch(props)}}}]);return DocMd}(_react.Component);exports.default=(0,_reactRedux.connect)(_doc.getDoc,{fetch:_doc.fetchDoc})(DocMd);

},{"Alternative.jsx":239,"babel-runtime/core-js/object/get-prototype-of":9,"babel-runtime/helpers/classCallCheck":14,"babel-runtime/helpers/createClass":15,"babel-runtime/helpers/inherits":18,"babel-runtime/helpers/possibleConstructorReturn":20,"doc.js":219,"react":"react","react-markdown":"react-markdown","react-redux":"react-redux","react-router":"react-router"}],231:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _slicedToArray2=require('babel-runtime/helpers/slicedToArray');var _slicedToArray3=_interopRequireDefault(_slicedToArray2);var _entries=require('babel-runtime/core-js/object/entries');var _entries2=_interopRequireDefault(_entries);var _extends2=require('babel-runtime/helpers/extends');var _extends3=_interopRequireDefault(_extends2);var _objectWithoutProperties2=require('babel-runtime/helpers/objectWithoutProperties');var _objectWithoutProperties3=_interopRequireDefault(_objectWithoutProperties2);var _getPrototypeOf=require('babel-runtime/core-js/object/get-prototype-of');var _getPrototypeOf2=_interopRequireDefault(_getPrototypeOf);var _classCallCheck2=require('babel-runtime/helpers/classCallCheck');var _classCallCheck3=_interopRequireDefault(_classCallCheck2);var _createClass2=require('babel-runtime/helpers/createClass');var _createClass3=_interopRequireDefault(_createClass2);var _possibleConstructorReturn2=require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3=_interopRequireDefault(_possibleConstructorReturn2);var _inherits2=require('babel-runtime/helpers/inherits');var _inherits3=_interopRequireDefault(_inherits2);var _defineProperty2=require('babel-runtime/helpers/defineProperty');var _defineProperty3=_interopRequireDefault(_defineProperty2);var _MARKER_COLOR,_COUNTRY_STYLE,_jsxFileName='/Users/dirk/github/dariah/client/src/js/app/object/EUMap.jsx';var _react=require('react');var _react2=_interopRequireDefault(_react);var _reactRedux=require('react-redux');var _ByValue=require('ByValue.jsx');var _ByValue2=_interopRequireDefault(_ByValue);var _leaflet=require('leaflet');var _leaflet2=_interopRequireDefault(_leaflet);var _europeGeo=require('europe.geo.js');var _filter=require('filter.js');var _tables=require('tables.js');var _helpers=require('helpers.js');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var mapOptions={HEIGHT:250,MAX_RADIUS:25,LEVEL_OFF:10,ZOOM_INIT:3,MAP_CENTER:[52,12],MAP_BOUNDS:[[30,-20],[70,40]],MARKER_COLOR:(_MARKER_COLOR={},(0,_defineProperty3.default)(_MARKER_COLOR,true,{color:'#008800',fillColor:'#00cc00'}),(0,_defineProperty3.default)(_MARKER_COLOR,false,{color:'#888844',fillColor:'#bbbb66'}),_MARKER_COLOR),MARKER_SHAPE:{weight:1,fill:true,fillOpacity:0.8},COUNTRY_STYLE:(_COUNTRY_STYLE={},(0,_defineProperty3.default)(_COUNTRY_STYLE,true,{color:'#884422',weight:2,fill:true,fillColor:'#aa7766',fillOpacity:1}),(0,_defineProperty3.default)(_COUNTRY_STYLE,false,{color:'#777777',weight:1,fill:true,fillColor:'#bbbbbb',fillOpacity:1}),_COUNTRY_STYLE)};var computeRadius=function computeRadius(_id,filteredAmountOthers,amounts){var amount=amounts?amounts[_id]||0:0;if(amount==0){return 0}var MAX_RADIUS=mapOptions.MAX_RADIUS,LEVEL_OFF=mapOptions.LEVEL_OFF;var proportional=MAX_RADIUS*amount/filteredAmountOthers;if(filteredAmountOthers<LEVEL_OFF){return proportional}return LEVEL_OFF*Math.sqrt(proportional)};var EUMap=function(_Component){(0,_inherits3.default)(EUMap,_Component);function EUMap(props){(0,_classCallCheck3.default)(this,EUMap);var _this=(0,_possibleConstructorReturn3.default)(this,(EUMap.__proto__||(0,_getPrototypeOf2.default)(EUMap)).call(this,props));_this.setMap=function(dom){if(dom){_this.dom=dom}};_this.inDariah=function(feature){return!!_this.idFromIso[feature.properties.iso2]};_this.features={};return _this}(0,_createClass3.default)(EUMap,[{key:'render',value:function render(){var _props=this.props,tables=_props.tables,byValueProps=(0,_objectWithoutProperties3.default)(_props,['tables']),setMap=this.setMap;return _react2.default.createElement('div',{__source:{fileName:_jsxFileName,lineNumber:68}},_react2.default.createElement('div',{ref:setMap,__source:{fileName:_jsxFileName,lineNumber:69}}),_react2.default.createElement(_ByValue2.default,(0,_extends3.default)({},byValueProps,{__source:{fileName:_jsxFileName,lineNumber:72}})))}},{key:'componentDidMount',value:function componentDidMount(){var _this2=this;var _props2=this.props,filterSetting=_props2.filterSetting,filteredAmountOthers=_props2.filteredAmountOthers,amounts=_props2.amounts,country=_props2.tables.country,dom=this.dom;var HEIGHT=mapOptions.HEIGHT,MAP_CENTER=mapOptions.MAP_CENTER,ZOOM_INIT=mapOptions.ZOOM_INIT,MAP_BOUNDS=mapOptions.MAP_BOUNDS,MARKER_COLOR=mapOptions.MARKER_COLOR,MARKER_SHAPE=mapOptions.MARKER_SHAPE,COUNTRY_STYLE=mapOptions.COUNTRY_STYLE;dom.style.height=HEIGHT;this.map=_leaflet2.default.map(dom,{attributionControl:false,center:MAP_CENTER,zoom:ZOOM_INIT,maxBounds:MAP_BOUNDS});var order=country.order,entities=country.entities;this.idFromIso={};order.forEach(function(_id){var iso=entities[_id].values.iso;_this2.idFromIso[iso]=_id});_leaflet2.default.geoJSON(_europeGeo.countryBorders,{style:function style(feature){return COUNTRY_STYLE[_this2.inDariah(feature)]},onEachFeature:function onEachFeature(feature){if(_this2.inDariah(feature)){var _feature$properties=feature.properties,iso2=_feature$properties.iso2,lat=_feature$properties.lat,lng=_feature$properties.lng;var _id=_this2.idFromIso[iso2];var isOn=filterSetting[_id];var marker=_leaflet2.default.circleMarker([lat,lng],(0,_extends3.default)({},MARKER_COLOR[isOn],{radius:computeRadius(_id,filteredAmountOthers,amounts)},MARKER_SHAPE,{pane:'markerPane'})).addTo(_this2.map);_this2.features[iso2]=marker}}}).addTo(this.map)}},{key:'componentDidUpdate',value:function componentDidUpdate(){var _this3=this;var _props3=this.props,filterSetting=_props3.filterSetting,filteredAmountOthers=_props3.filteredAmountOthers,amounts=_props3.amounts;var MARKER_COLOR=mapOptions.MARKER_COLOR;(0,_entries2.default)(this.features).forEach(function(_ref){var _ref2=(0,_slicedToArray3.default)(_ref,2),iso2=_ref2[0],marker=_ref2[1];var _id=_this3.idFromIso[iso2];var isOn=filterSetting[_id];marker.setRadius(computeRadius(_id,filteredAmountOthers,amounts));marker.setStyle(MARKER_COLOR[isOn])})}}]);return EUMap}(_react.Component);EUMap.displayName='EUMap';exports.default=(0,_reactRedux.connect)((0,_helpers.combineSelectors)(_tables.getTables,_filter.getFilterSetting))(EUMap);

},{"ByValue.jsx":242,"babel-runtime/core-js/object/entries":8,"babel-runtime/core-js/object/get-prototype-of":9,"babel-runtime/helpers/classCallCheck":14,"babel-runtime/helpers/createClass":15,"babel-runtime/helpers/defineProperty":16,"babel-runtime/helpers/extends":17,"babel-runtime/helpers/inherits":18,"babel-runtime/helpers/objectWithoutProperties":19,"babel-runtime/helpers/possibleConstructorReturn":20,"babel-runtime/helpers/slicedToArray":21,"europe.geo.js":"europe.geo.js","filter.js":220,"helpers.js":221,"leaflet":"leaflet","react":"react","react-redux":"react-redux","tables.js":226}],232:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _getPrototypeOf=require('babel-runtime/core-js/object/get-prototype-of');var _getPrototypeOf2=_interopRequireDefault(_getPrototypeOf);var _classCallCheck2=require('babel-runtime/helpers/classCallCheck');var _classCallCheck3=_interopRequireDefault(_classCallCheck2);var _createClass2=require('babel-runtime/helpers/createClass');var _createClass3=_interopRequireDefault(_createClass2);var _possibleConstructorReturn2=require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3=_interopRequireDefault(_possibleConstructorReturn2);var _inherits2=require('babel-runtime/helpers/inherits');var _inherits3=_interopRequireDefault(_inherits2);var _jsxFileName='/Users/dirk/github/dariah/client/src/js/app/object/FilterCompute.jsx';var _react=require('react');var _react2=_interopRequireDefault(_react);var _reactRedux=require('react-redux');var _ItemList=require('ItemList.jsx');var _ItemList2=_interopRequireDefault(_ItemList);var _Filter=require('Filter.jsx');var _Filter2=_interopRequireDefault(_Filter);var _Pane=require('Pane.jsx');var _Pane2=_interopRequireDefault(_Pane);var _filter=require('filter.js');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var FilterCompute=function(_Component){(0,_inherits3.default)(FilterCompute,_Component);function FilterCompute(props){(0,_classCallCheck3.default)(this,FilterCompute);var _this=(0,_possibleConstructorReturn3.default)(this,(FilterCompute.__proto__||(0,_getPrototypeOf2.default)(FilterCompute)).call(this));var tables=props.tables,table=props.table,initialized=props.initialized,init=props.init;if(!initialized){init(tables,table)}return _this}(0,_createClass3.default)(FilterCompute,[{key:'render',value:function render(){var initialized=this.props.initialized;if(!initialized){return _react2.default.createElement('div',{__source:{fileName:_jsxFileName,lineNumber:17}})}var _props=this.props,tables=_props.tables,table=_props.table,filteredData=_props.filteredData,filteredAmountOthers=_props.filteredAmountOthers,amounts=_props.amounts;var _tables$table=tables[table],order=_tables$table.order,title=_tables$table.title;return _react2.default.createElement('div',{__source:{fileName:_jsxFileName,lineNumber:21}},_react2.default.createElement(_Pane2.default,{format:'sized',position:'rightLeft',__source:{fileName:_jsxFileName,lineNumber:22}},_react2.default.createElement('p',{__source:{fileName:_jsxFileName,lineNumber:23}},'Total ',_react2.default.createElement('span',{className:'good-o',__source:{fileName:_jsxFileName,lineNumber:23}},order.length)),_react2.default.createElement(_Filter2.default,{table:table,filteredAmount:filteredData.length,filteredAmountOthers:filteredAmountOthers,amounts:amounts,__source:{fileName:_jsxFileName,lineNumber:24}})),_react2.default.createElement(_Pane2.default,{format:'sized',position:'rightRight',__source:{fileName:_jsxFileName,lineNumber:31}},_react2.default.createElement(_ItemList2.default,{table:table,title:title,filteredData:filteredData,inplace:true,__source:{fileName:_jsxFileName,lineNumber:32}})))}}]);return FilterCompute}(_react.Component);exports.default=(0,_reactRedux.connect)(_filter.getFiltersApplied,{init:_filter.setupFiltering})(FilterCompute);

},{"Filter.jsx":247,"ItemList.jsx":251,"Pane.jsx":255,"babel-runtime/core-js/object/get-prototype-of":9,"babel-runtime/helpers/classCallCheck":14,"babel-runtime/helpers/createClass":15,"babel-runtime/helpers/inherits":18,"babel-runtime/helpers/possibleConstructorReturn":20,"filter.js":220,"react":"react","react-redux":"react-redux"}],233:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _getPrototypeOf=require('babel-runtime/core-js/object/get-prototype-of');var _getPrototypeOf2=_interopRequireDefault(_getPrototypeOf);var _classCallCheck2=require('babel-runtime/helpers/classCallCheck');var _classCallCheck3=_interopRequireDefault(_classCallCheck2);var _createClass2=require('babel-runtime/helpers/createClass');var _createClass3=_interopRequireDefault(_createClass2);var _possibleConstructorReturn2=require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3=_interopRequireDefault(_possibleConstructorReturn2);var _inherits2=require('babel-runtime/helpers/inherits');var _inherits3=_interopRequireDefault(_inherits2);var _jsxFileName='/Users/dirk/github/dariah/client/src/js/app/object/ItemFiltered.jsx';var _react=require('react');var _react2=_interopRequireDefault(_react);var _reactRedux=require('react-redux');var _FilterCompute=require('FilterCompute.jsx');var _FilterCompute2=_interopRequireDefault(_FilterCompute);var _tables=require('tables.js');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var ItemFiltered=function(_Component){(0,_inherits3.default)(ItemFiltered,_Component);function ItemFiltered(){(0,_classCallCheck3.default)(this,ItemFiltered);return(0,_possibleConstructorReturn3.default)(this,(ItemFiltered.__proto__||(0,_getPrototypeOf2.default)(ItemFiltered)).apply(this,arguments))}(0,_createClass3.default)(ItemFiltered,[{key:'render',value:function render(){var _props=this.props,table=_props.params.table,tables=_props.tables;if((0,_tables.needTables)(tables,table)){return _react2.default.createElement('div',{__source:{fileName:_jsxFileName,lineNumber:10}})}return _react2.default.createElement(_FilterCompute2.default,{table:table,__source:{fileName:_jsxFileName,lineNumber:12}})}},{key:'componentDidMount',value:function componentDidMount(){var _props2=this.props,table=_props2.params.table,tables=_props2.tables,fetch=_props2.fetch;if((0,_tables.needTables)(tables,table)){fetch(table)}}}]);return ItemFiltered}(_react.Component);exports.default=(0,_reactRedux.connect)(_tables.getTables,{fetch:_tables.fetchTable})(ItemFiltered);

},{"FilterCompute.jsx":232,"babel-runtime/core-js/object/get-prototype-of":9,"babel-runtime/helpers/classCallCheck":14,"babel-runtime/helpers/createClass":15,"babel-runtime/helpers/inherits":18,"babel-runtime/helpers/possibleConstructorReturn":20,"react":"react","react-redux":"react-redux","tables.js":226}],234:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _getPrototypeOf=require('babel-runtime/core-js/object/get-prototype-of');var _getPrototypeOf2=_interopRequireDefault(_getPrototypeOf);var _classCallCheck2=require('babel-runtime/helpers/classCallCheck');var _classCallCheck3=_interopRequireDefault(_classCallCheck2);var _createClass2=require('babel-runtime/helpers/createClass');var _createClass3=_interopRequireDefault(_createClass2);var _possibleConstructorReturn2=require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3=_interopRequireDefault(_possibleConstructorReturn2);var _inherits2=require('babel-runtime/helpers/inherits');var _inherits3=_interopRequireDefault(_inherits2);var _jsxFileName='/Users/dirk/github/dariah/client/src/js/app/object/ItemMy.jsx';var _react=require('react');var _react2=_interopRequireDefault(_react);var _reactRedux=require('react-redux');var _tables=require('tables.js');var _ItemList=require('ItemList.jsx');var _ItemList2=_interopRequireDefault(_ItemList);var _Pane=require('Pane.jsx');var _Pane2=_interopRequireDefault(_Pane);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var ItemMy=function(_Component){(0,_inherits3.default)(ItemMy,_Component);function ItemMy(){(0,_classCallCheck3.default)(this,ItemMy);return(0,_possibleConstructorReturn3.default)(this,(ItemMy.__proto__||(0,_getPrototypeOf2.default)(ItemMy)).apply(this,arguments))}(0,_createClass3.default)(ItemMy,[{key:'render',value:function render(){var _props=this.props,table=_props.params.table,tables=_props.tables,children=_props.children;if((0,_tables.needTables)(tables,table,true)||(0,_tables.needTables)(tables,['country','user'])){return _react2.default.createElement('div',{__source:{fileName:_jsxFileName,lineNumber:11}})}var _tables$table=tables[table],title=_tables$table.title,perm=_tables$table.perm,my=_tables$table.my;return _react2.default.createElement('div',{__source:{fileName:_jsxFileName,lineNumber:14}},_react2.default.createElement(_Pane2.default,{format:'nav sized',position:'rightLeftNav',__source:{fileName:_jsxFileName,lineNumber:15}},_react2.default.createElement('p',{__source:{fileName:_jsxFileName,lineNumber:16}},my.length+' items ',perm!=null&&perm.insert?_react2.default.createElement('span',{className:'fa fa-plus',title:'new contribution',__source:{fileName:_jsxFileName,lineNumber:19}}):null),_react2.default.createElement(_ItemList2.default,{table:table,title:title,filteredData:my,inplace:false,__source:{fileName:_jsxFileName,lineNumber:22}})),_react2.default.createElement(_Pane2.default,{format:'sized',position:'rightRightBody',__source:{fileName:_jsxFileName,lineNumber:24}},children))}},{key:'componentDidMount',value:function componentDidMount(){var _props2=this.props,table=_props2.params.table,tables=_props2.tables,fetch=_props2.fetch;if((0,_tables.needTables)(tables,table,true)){fetch(table)}}}]);return ItemMy}(_react.Component);exports.default=(0,_reactRedux.connect)(_tables.getTables,{fetch:_tables.fetchTableMy})(ItemMy);

},{"ItemList.jsx":251,"Pane.jsx":255,"babel-runtime/core-js/object/get-prototype-of":9,"babel-runtime/helpers/classCallCheck":14,"babel-runtime/helpers/createClass":15,"babel-runtime/helpers/inherits":18,"babel-runtime/helpers/possibleConstructorReturn":20,"react":"react","react-redux":"react-redux","tables.js":226}],235:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _extends2=require('babel-runtime/helpers/extends');var _extends3=_interopRequireDefault(_extends2);var _objectWithoutProperties2=require('babel-runtime/helpers/objectWithoutProperties');var _objectWithoutProperties3=_interopRequireDefault(_objectWithoutProperties2);var _getIterator2=require('babel-runtime/core-js/get-iterator');var _getIterator3=_interopRequireDefault(_getIterator2);var _getPrototypeOf=require('babel-runtime/core-js/object/get-prototype-of');var _getPrototypeOf2=_interopRequireDefault(_getPrototypeOf);var _classCallCheck2=require('babel-runtime/helpers/classCallCheck');var _classCallCheck3=_interopRequireDefault(_classCallCheck2);var _createClass2=require('babel-runtime/helpers/createClass');var _createClass3=_interopRequireDefault(_createClass2);var _possibleConstructorReturn2=require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3=_interopRequireDefault(_possibleConstructorReturn2);var _inherits2=require('babel-runtime/helpers/inherits');var _inherits3=_interopRequireDefault(_inherits2);var _jsxFileName='/Users/dirk/github/dariah/client/src/js/app/object/ItemRecord.jsx';var _react=require('react');var _react2=_interopRequireDefault(_react);var _reactRedux=require('react-redux');var _tables=require('tables.js');var _ItemField=require('ItemField.jsx');var _ItemField2=_interopRequireDefault(_ItemField);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var ItemRecord=function(_Component){(0,_inherits3.default)(ItemRecord,_Component);function ItemRecord(){var _ref;var _temp,_this,_ret;(0,_classCallCheck3.default)(this,ItemRecord);for(var _len=arguments.length,args=Array(_len),_key=0;_key<_len;_key++){args[_key]=arguments[_key]}return _ret=(_temp=(_this=(0,_possibleConstructorReturn3.default)(this,(_ref=ItemRecord.__proto__||(0,_getPrototypeOf2.default)(ItemRecord)).call.apply(_ref,[this].concat(args))),_this),_this.getEntity=function(){var _this2=_this,_this2$props=_this2.props,tables=_this2$props.tables,table=_this2$props.table,eId=_this2$props.eId;var entity=tables[table].entities[eId];return entity},_temp),(0,_possibleConstructorReturn3.default)(_this,_ret)}(0,_createClass3.default)(ItemRecord,[{key:'parseFields',value:function parseFields(){var _props=this.props,tables=_props.tables,table=_props.table,eId=_props.eId;var _tables$table=tables[table],fieldSpecs=_tables$table.fieldSpecs,fieldOrder=_tables$table.fieldOrder;var entity=this.getEntity();var perm=entity.perm,fields=entity.fields,values=entity.values;var fragments=[];var hasEditable=false;var _iteratorNormalCompletion=true;var _didIteratorError=false;var _iteratorError=undefined;try{for(var _iterator=(0,_getIterator3.default)(fieldOrder),_step;!(_iteratorNormalCompletion=(_step=_iterator.next()).done);_iteratorNormalCompletion=true){var name=_step.value;var f=fields[name];if(f==null){continue}var _fieldSpecs$name=fieldSpecs[name],label=_fieldSpecs$name.label,initial=_fieldSpecs$name.initial,specs=(0,_objectWithoutProperties3.default)(_fieldSpecs$name,['label','initial']);var editable=perm.update[name];if(editable){hasEditable=true}fragments.push(_react2.default.createElement(_ItemField2.default,(0,_extends3.default)({key:name,table:table,eId:eId,editable:!!editable,name:name,label:label,values:values[name],initial:initial},specs,{__source:{fileName:_jsxFileName,lineNumber:24}})))}}catch(err){_didIteratorError=true;_iteratorError=err}finally{try{if(!_iteratorNormalCompletion&&_iterator.return){_iterator.return()}}finally{if(_didIteratorError){throw _iteratorError}}}return{fragments:fragments,hasEditable:hasEditable}}},{key:'render',value:function render(){var _props2=this.props,tables=_props2.tables,table=_props2.table,eId=_props2.eId;if((0,_tables.needValues)({tables:tables,table:table,eId:eId})){return _react2.default.createElement('div',{__source:{fileName:_jsxFileName,lineNumber:48}})}var entity=this.getEntity();var perm=entity.perm;var _parseFields=this.parseFields(),fragments=_parseFields.fragments,hasEditable=_parseFields.hasEditable;return _react2.default.createElement('div',{className:'widget-medium',__source:{fileName:_jsxFileName,lineNumber:54}},_react2.default.createElement('p',{__source:{fileName:_jsxFileName,lineNumber:55}},'record in '+table),_react2.default.createElement('p',{__source:{fileName:_jsxFileName,lineNumber:56}},hasEditable?[_react2.default.createElement('span',{key:'save',className:'button-large',__source:{fileName:_jsxFileName,lineNumber:58}},'Save'),perm.delete?_react2.default.createElement('span',{key:'delete',className:'fa fa-trash button-large delete',title:'delete this item',__source:{fileName:_jsxFileName,lineNumber:63}}):null]:null),_react2.default.createElement('div',{__source:{fileName:_jsxFileName,lineNumber:71}},fragments))}},{key:'componentDidMount',value:function componentDidMount(){var props=this.props,fetch=this.props.fetch;if((0,_tables.changedItem)(props,null)){fetch(props)}}},{key:'componentDidUpdate',value:function componentDidUpdate(prevProps){var props=this.props,fetch=this.props.fetch;if((0,_tables.changedItem)(props,prevProps)){fetch(props)}}}]);return ItemRecord}(_react.Component);exports.default=(0,_reactRedux.connect)(_tables.getTables,{fetch:_tables.fetchItem})(ItemRecord);

},{"ItemField.jsx":249,"babel-runtime/core-js/get-iterator":2,"babel-runtime/core-js/object/get-prototype-of":9,"babel-runtime/helpers/classCallCheck":14,"babel-runtime/helpers/createClass":15,"babel-runtime/helpers/extends":17,"babel-runtime/helpers/inherits":18,"babel-runtime/helpers/objectWithoutProperties":19,"babel-runtime/helpers/possibleConstructorReturn":20,"react":"react","react-redux":"react-redux","tables.js":226}],236:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _keys=require('babel-runtime/core-js/object/keys');var _keys2=_interopRequireDefault(_keys);var _getPrototypeOf=require('babel-runtime/core-js/object/get-prototype-of');var _getPrototypeOf2=_interopRequireDefault(_getPrototypeOf);var _classCallCheck2=require('babel-runtime/helpers/classCallCheck');var _classCallCheck3=_interopRequireDefault(_classCallCheck2);var _createClass2=require('babel-runtime/helpers/createClass');var _createClass3=_interopRequireDefault(_createClass2);var _possibleConstructorReturn2=require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3=_interopRequireDefault(_possibleConstructorReturn2);var _inherits2=require('babel-runtime/helpers/inherits');var _inherits3=_interopRequireDefault(_inherits2);var _jsxFileName='/Users/dirk/github/dariah/client/src/js/app/object/Login.jsx';var _react=require('react');var _react2=_interopRequireDefault(_react);var _reactRedux=require('react-redux');var _me=require('me.js');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var Login=function(_Component){(0,_inherits3.default)(Login,_Component);function Login(){(0,_classCallCheck3.default)(this,Login);return(0,_possibleConstructorReturn3.default)(this,(Login.__proto__||(0,_getPrototypeOf2.default)(Login)).apply(this,arguments))}(0,_createClass3.default)(Login,[{key:'render',value:function render(){var me=this.props.me;return _react2.default.createElement('span',{className:'login',__source:{fileName:_jsxFileName,lineNumber:9}},me.eppn&&(0,_keys2.default)(me).length>0?_react2.default.createElement('span',{__source:{fileName:_jsxFileName,lineNumber:11}},_react2.default.createElement('strong',{className:'fa fa-user',title:me.eppn,__source:{fileName:_jsxFileName,lineNumber:12}},me.eppn.split('@')[0]),_react2.default.createElement('span',{className:'fa fa-hashtag',__source:{fileName:_jsxFileName,lineNumber:13}}),me.authority,' ',_react2.default.createElement('em',{__source:{fileName:_jsxFileName,lineNumber:14}},me.groupDesc||'not authenticated'),_react2.default.createElement('a',{href:'/logout',className:'control fa fa-user-times',title:'log out',__source:{fileName:_jsxFileName,lineNumber:15}}),_react2.default.createElement('a',{href:'/slogout',className:'control fa fa-users',title:'sign out',__source:{fileName:_jsxFileName,lineNumber:16}})):_react2.default.createElement('a',{href:'/login',className:'control fa fa-user-plus',__source:{fileName:_jsxFileName,lineNumber:19}},' login'))}},{key:'componentDidMount',value:function componentDidMount(){var fetch=this.props.fetch;fetch({type:'fetchMe',contentType:'db',path:'/who/ami',desc:'me'})}}]);return Login}(_react.Component);exports.default=(0,_reactRedux.connect)(_me.getMe,{fetch:_me.fetchMe})(Login);

},{"babel-runtime/core-js/object/get-prototype-of":9,"babel-runtime/core-js/object/keys":10,"babel-runtime/helpers/classCallCheck":14,"babel-runtime/helpers/createClass":15,"babel-runtime/helpers/inherits":18,"babel-runtime/helpers/possibleConstructorReturn":20,"me.js":222,"react":"react","react-redux":"react-redux"}],237:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _getPrototypeOf=require('babel-runtime/core-js/object/get-prototype-of');var _getPrototypeOf2=_interopRequireDefault(_getPrototypeOf);var _classCallCheck2=require('babel-runtime/helpers/classCallCheck');var _classCallCheck3=_interopRequireDefault(_classCallCheck2);var _createClass2=require('babel-runtime/helpers/createClass');var _createClass3=_interopRequireDefault(_createClass2);var _possibleConstructorReturn2=require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3=_interopRequireDefault(_possibleConstructorReturn2);var _inherits2=require('babel-runtime/helpers/inherits');var _inherits3=_interopRequireDefault(_inherits2);var _jsxFileName='/Users/dirk/github/dariah/client/src/js/app/object/Notification.jsx';var _react=require('react');var _react2=_interopRequireDefault(_react);var _reactRedux=require('react-redux');var _notify=require('notify.js');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var Notification=function(_Component){(0,_inherits3.default)(Notification,_Component);function Notification(props){(0,_classCallCheck3.default)(this,Notification);var _this=(0,_possibleConstructorReturn3.default)(this,(Notification.__proto__||(0,_getPrototypeOf2.default)(Notification)).call(this,props));_this.refDom=function(label){return function(dom){if(dom){_this.dom[label]=dom}}};_this.handleBox=function(){var _this$props=_this.props,show=_this$props.show,display=_this$props.display;display(!show)};_this.handleHide=function(){var display=_this.props.display;display(false)};_this.handleClear=function(){var clear=_this.props.clear;clear()};_this.dom={};return _this}(0,_createClass3.default)(Notification,[{key:'render',value:function render(){var _this2=this;var _props=this.props,notifications=_props.notifications,lastNote=_props.lastNote,lastKind=_props.lastKind,busy=_props.busy,show=_props.show;var highlight=lastNote>-1;var busyBlocks=new Array(busy<0?0:busy).fill(1);return _react2.default.createElement('div',{__source:{fileName:_jsxFileName,lineNumber:31}},_react2.default.createElement('p',{className:'msg-spinner',__source:{fileName:_jsxFileName,lineNumber:32}},_react2.default.createElement('span',{title:'show/hide notifications and progress messages',className:highlight?'spin-'+lastKind:'spin-ok',__source:{fileName:_jsxFileName,lineNumber:33}},busyBlocks.map(function(b,i){return _react2.default.createElement('span',{key:i,className:'msg-dot fa fa-caret-left',__source:{fileName:_jsxFileName,lineNumber:37}})}),_react2.default.createElement('span',{className:'fa fa-'+(busy==0?'circle-o':'spinner fa-spin'),onClick:this.handleBox,__source:{fileName:_jsxFileName,lineNumber:38}}))),show?_react2.default.createElement('div',{ref:this.refDom('notbox'),className:'msg-box',onClick:this.handleHide,__source:{fileName:_jsxFileName,lineNumber:45}},notifications.map(function(msg,i){return _react2.default.createElement('p',{key:i,ref:_this2.refDom('m'+i),className:'msg-line '+[msg.kind]+'-o '+(msg.kind!='info'?'msg-high':''),__source:{fileName:_jsxFileName,lineNumber:51}},msg.text)}),_react2.default.createElement('p',{className:'msg-dismiss',__source:{fileName:_jsxFileName,lineNumber:58}},'(click panel to hide)'),_react2.default.createElement('p',{className:'msg-trash',__source:{fileName:_jsxFileName,lineNumber:59}},_react2.default.createElement('a',{href:'#',title:'clear messages',className:'control fa fa-trash',onClick:this.handleClear,__source:{fileName:_jsxFileName,lineNumber:60}}))):null)}},{key:'componentDidMount',value:function componentDidMount(){this.setView()}},{key:'componentDidUpdate',value:function componentDidUpdate(){this.setView()}},{key:'setView',value:function setView(){var show=this.props.show;if(show){this.setScroll()}}},{key:'setScroll',value:function setScroll(){var show=this.props.show;if(show){var _props2=this.props,lastMsg=_props2.lastMsg,lastNote=_props2.lastNote;var highlight=lastNote>-1;if(highlight){this.dom['m'+lastNote].scrollIntoView()}else{if(lastMsg>-1){this.dom['m'+lastMsg].scrollIntoView()}}}}}]);return Notification}(_react.Component);exports.default=(0,_reactRedux.connect)(_notify.getNotifications,{clear:_notify.clear,display:_notify.display})(Notification);

},{"babel-runtime/core-js/object/get-prototype-of":9,"babel-runtime/helpers/classCallCheck":14,"babel-runtime/helpers/createClass":15,"babel-runtime/helpers/inherits":18,"babel-runtime/helpers/possibleConstructorReturn":20,"notify.js":223,"react":"react","react-redux":"react-redux"}],238:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _getPrototypeOf=require('babel-runtime/core-js/object/get-prototype-of');var _getPrototypeOf2=_interopRequireDefault(_getPrototypeOf);var _classCallCheck2=require('babel-runtime/helpers/classCallCheck');var _classCallCheck3=_interopRequireDefault(_classCallCheck2);var _createClass2=require('babel-runtime/helpers/createClass');var _createClass3=_interopRequireDefault(_createClass2);var _possibleConstructorReturn2=require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3=_interopRequireDefault(_possibleConstructorReturn2);var _inherits2=require('babel-runtime/helpers/inherits');var _inherits3=_interopRequireDefault(_inherits2);var _react=require('react');var _reactRedux=require('react-redux');var _throttle=require('lodash/throttle');var _throttle2=_interopRequireDefault(_throttle);var _win=require('win.js');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var Window=function(_Component){(0,_inherits3.default)(Window,_Component);function Window(){var _ref;var _temp,_this,_ret;(0,_classCallCheck3.default)(this,Window);for(var _len=arguments.length,args=Array(_len),_key=0;_key<_len;_key++){args[_key]=arguments[_key]}return _ret=(_temp=(_this=(0,_possibleConstructorReturn3.default)(this,(_ref=Window.__proto__||(0,_getPrototypeOf2.default)(Window)).call.apply(_ref,[this].concat(args))),_this),_this.newWindowSize=(0,_throttle2.default)(function(){var _this2=_this,resize=_this2.props.resize;resize()},1000),_temp),(0,_possibleConstructorReturn3.default)(_this,_ret)}(0,_createClass3.default)(Window,[{key:'render',value:function render(){var children=this.props.children;return _react.Children.only(children)}},{key:'componentDidMount',value:function componentDidMount(){window.addEventListener('resize',this.newWindowSize)}},{key:'componentWillUnmount',value:function componentWillUnmount(){window.removeEventListener('resize',this.newWindowSize)}}]);return Window}(_react.Component);exports.default=(0,_reactRedux.connect)(_win.getWinDim,{resize:_win.changeWinDim})(Window);

},{"babel-runtime/core-js/object/get-prototype-of":9,"babel-runtime/helpers/classCallCheck":14,"babel-runtime/helpers/createClass":15,"babel-runtime/helpers/inherits":18,"babel-runtime/helpers/possibleConstructorReturn":20,"lodash/throttle":214,"react":"react","react-redux":"react-redux","win.js":227}],239:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _extends2=require('babel-runtime/helpers/extends');var _extends3=_interopRequireDefault(_extends2);var _objectWithoutProperties2=require('babel-runtime/helpers/objectWithoutProperties');var _objectWithoutProperties3=_interopRequireDefault(_objectWithoutProperties2);var _jsxFileName='/Users/dirk/github/dariah/client/src/js/app/pure/Alternative.jsx';var _react=require('react');var _react2=_interopRequireDefault(_react);var _reactRedux=require('react-redux');var _alter=require('alter.js');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var handleNext=function handleNext(_ref){var tag=_ref.tag,alternatives=_ref.alternatives,initial=_ref.initial,next=_ref.next;return function(event){event.preventDefault();next(tag,alternatives.length,initial)}};var Alternative=function Alternative(_ref2){var controlPlacement=_ref2.controlPlacement,controls=_ref2.controls,alt=_ref2.alt,alternatives=_ref2.alternatives,rest=(0,_objectWithoutProperties3.default)(_ref2,['controlPlacement','controls','alt','alternatives']);return _react2.default.createElement('div',{__source:{fileName:_jsxFileName,lineNumber:11}},controlPlacement(controls[alt](handleNext((0,_extends3.default)({alternatives:alternatives},rest)))),alternatives[alt])};exports.default=(0,_reactRedux.connect)(_alter.getAlt,{next:_alter.nextAlt})(Alternative);

},{"alter.js":217,"babel-runtime/helpers/extends":17,"babel-runtime/helpers/objectWithoutProperties":19,"react":"react","react-redux":"react-redux"}],240:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _jsxFileName='/Users/dirk/github/dariah/client/src/js/app/pure/App.jsx';var _react=require('react');var _react2=_interopRequireDefault(_react);var _reactRedux=require('react-redux');var _Login=require('Login.jsx');var _Login2=_interopRequireDefault(_Login);var _NavLink=require('NavLink.jsx');var _NavLink2=_interopRequireDefault(_NavLink);var _Static=require('Static.jsx');var _Static2=_interopRequireDefault(_Static);var _Notification=require('Notification.jsx');var _Notification2=_interopRequireDefault(_Notification);var _win=require('win.js');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var App=function App(_ref){var children=_ref.children,height=_ref.height,width=_ref.width;var text=width+' x '+height;return _react2.default.createElement('div',{__source:{fileName:_jsxFileName,lineNumber:12}},_react2.default.createElement(_Notification2.default,{__source:{fileName:_jsxFileName,lineNumber:13}}),_react2.default.createElement('p',{className:'nav small top',__source:{fileName:_jsxFileName,lineNumber:14}},_react2.default.createElement('img',{src:'/static/images/inkind_logo_small.png',title:'information about this site',__source:{fileName:_jsxFileName,lineNumber:15}}),_react2.default.createElement(_NavLink2.default,{to:'/contrib',__source:{fileName:_jsxFileName,lineNumber:19}},'Contributions'),_react2.default.createElement(_NavLink2.default,{to:'/backoffice',__source:{fileName:_jsxFileName,lineNumber:20}},'Backoffice'),_react2.default.createElement(_Static2.default,{__source:{fileName:_jsxFileName,lineNumber:21}}),_react2.default.createElement('span',{className:'resize',title:text,__source:{fileName:_jsxFileName,lineNumber:22}},text),_react2.default.createElement(_Login2.default,{__source:{fileName:_jsxFileName,lineNumber:23}})),_react2.default.createElement('div',{__source:{fileName:_jsxFileName,lineNumber:25}},children))};exports.default=(0,_reactRedux.connect)(_win.getWinDim)(App);

},{"Login.jsx":236,"NavLink.jsx":253,"Notification.jsx":237,"Static.jsx":258,"react":"react","react-redux":"react-redux","win.js":227}],241:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _jsxFileName='/Users/dirk/github/dariah/client/src/js/app/pure/Backoffice.jsx';var _react=require('react');var _react2=_interopRequireDefault(_react);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var Backoffice=function Backoffice(_ref){var func=_ref.params.func;var headings={type:'Contribution types',assess:'Assessment criteria',package:'Assessment packages'};var bodies={type:'Will be implemented',assess:'Will be implemented',package:'Will be implemented'};var heading=headings[func]||'No such function';var body=bodies[func]||'Nothing to wait for';return _react2.default.createElement('div',{__source:{fileName:_jsxFileName,lineNumber:17}},_react2.default.createElement('h1',{__source:{fileName:_jsxFileName,lineNumber:18}},heading),_react2.default.createElement('p',{__source:{fileName:_jsxFileName,lineNumber:19}},body))};exports.default=Backoffice;

},{"react":"react"}],242:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _slicedToArray2=require('babel-runtime/helpers/slicedToArray');var _slicedToArray3=_interopRequireDefault(_slicedToArray2);var _jsxFileName='/Users/dirk/github/dariah/client/src/js/app/pure/ByValue.jsx';var _react=require('react');var _react2=_interopRequireDefault(_react);var _reactRedux=require('react-redux');var _Facet=require('Facet.jsx');var _Facet2=_interopRequireDefault(_Facet);var _CheckboxI=require('CheckboxI.jsx');var _CheckboxI2=_interopRequireDefault(_CheckboxI);var _Stat=require('Stat.jsx');var _Stat2=_interopRequireDefault(_Stat);var _Alternative=require('Alternative.jsx');var _Alternative2=_interopRequireDefault(_Alternative);var _filter=require('filter.js');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var ByValue=function ByValue(_ref){var table=_ref.table,filterId=_ref.filterId,filterLabel=_ref.filterLabel,fieldValues=_ref.fieldValues,filteredAmount=_ref.filteredAmount,filteredAmountOthers=_ref.filteredAmountOthers,amounts=_ref.amounts,maxCols=_ref.maxCols,expanded=_ref.expanded;var rows=(0,_filter.placeFacets)(fieldValues,maxCols);var control1=function control1(handler){return _react2.default.createElement('span',{className:'button-small fa fa-chevron-down',onClick:handler,__source:{fileName:_jsxFileName,lineNumber:18}})};var control2=function control2(handler){return _react2.default.createElement('span',{className:'button-small fa fa-chevron-right',onClick:handler,__source:{fileName:_jsxFileName,lineNumber:19}})};var controlPlacement=function controlPlacement(control){return _react2.default.createElement('p',{className:'facet',__source:{fileName:_jsxFileName,lineNumber:21}},_react2.default.createElement(_CheckboxI2.default,{table:table,filterId:filterId,__source:{fileName:_jsxFileName,lineNumber:22}}),' ',filterLabel,' ',_react2.default.createElement(_Stat2.default,{subTotal:filteredAmount,total:filteredAmountOthers,__source:{fileName:_jsxFileName,lineNumber:26}}),' ',control)};return _react2.default.createElement('div',{className:'facet',__source:{fileName:_jsxFileName,lineNumber:31}},rows===null?_react2.default.createElement('p',{__source:{fileName:_jsxFileName,lineNumber:32}},' -no facets '):_react2.default.createElement(_Alternative2.default,{tag:table+'_'+filterId,controlPlacement:controlPlacement,controls:[control1,control2],initial:expanded?0:1,alternatives:[_react2.default.createElement('table',{key:'table',__source:{fileName:_jsxFileName,lineNumber:39}},_react2.default.createElement('tbody',{__source:{fileName:_jsxFileName,lineNumber:40}},rows.map(function(entity,i){return _react2.default.createElement('tr',{key:i,__source:{fileName:_jsxFileName,lineNumber:42}},entity.map(function(f,j){if(f===null){return _react2.default.createElement('td',{key:j,__source:{fileName:_jsxFileName,lineNumber:45}})}var _f=(0,_slicedToArray3.default)(f,2),valueId=_f[0],valueRep=_f[1];var facetClass=j==0?'facet':'facet mid';return[_react2.default.createElement('td',{key:valueId,className:facetClass,__source:{fileName:_jsxFileName,lineNumber:50}},_react2.default.createElement(_Facet2.default,{table:table,filterId:filterId,valueId:valueId,valueRep:valueRep,__source:{fileName:_jsxFileName,lineNumber:54}})),_react2.default.createElement('td',{key:'stat',className:'statistic',__source:{fileName:_jsxFileName,lineNumber:62}},_react2.default.createElement(_Stat2.default,{subTotal:amounts[valueId],__source:{fileName:_jsxFileName,lineNumber:66}}))]}))}))),_react2.default.createElement('div',{key:'div',__source:{fileName:_jsxFileName,lineNumber:74}})],__source:{fileName:_jsxFileName,lineNumber:33}}))};exports.default=(0,_reactRedux.connect)(_filter.getFieldValues)(ByValue);

},{"Alternative.jsx":239,"CheckboxI.jsx":229,"Facet.jsx":246,"Stat.jsx":257,"babel-runtime/helpers/slicedToArray":21,"filter.js":220,"react":"react","react-redux":"react-redux"}],243:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _slicedToArray2=require('babel-runtime/helpers/slicedToArray');var _slicedToArray3=_interopRequireDefault(_slicedToArray2);var _jsxFileName='/Users/dirk/github/dariah/client/src/js/app/pure/Doc.jsx';var _react=require('react');var _react2=_interopRequireDefault(_react);var _DocMd=require('DocMd.jsx');var _DocMd2=_interopRequireDefault(_DocMd);var _DocPdf=require('DocPdf.jsx');var _DocPdf2=_interopRequireDefault(_DocPdf);var _DocHtml=require('DocHtml.jsx');var _DocHtml2=_interopRequireDefault(_DocHtml);var _NotFound=require('NotFound.jsx');var _NotFound2=_interopRequireDefault(_NotFound);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var docType={md:_DocMd2.default,pdf:_DocPdf2.default,html:_DocHtml2.default};var Doc=function Doc(_ref){var docPath=_ref.location.pathname;var _$exec$slice=/^(.*)\/([^/]+)$/g.exec(docPath).slice(1),_$exec$slice2=(0,_slicedToArray3.default)(_$exec$slice,2),docDir=_$exec$slice2[0],docFile=_$exec$slice2[1];var _$exec$slice3=/^(.*)\.([^.]+)$/g.exec(docFile).slice(1),_$exec$slice4=(0,_slicedToArray3.default)(_$exec$slice3,2),docName=_$exec$slice4[0],docExt=_$exec$slice4[1];var DocClass=docType[docExt];return DocClass==null?_react2.default.createElement(_NotFound2.default,{params:{splat:'document '+docPath},__source:{fileName:_jsxFileName,lineNumber:19}}):_react2.default.createElement(DocClass,{docDir:docDir,docName:docName,docExt:docExt,tag:docName,__source:{fileName:_jsxFileName,lineNumber:21}})};exports.default=Doc;

},{"DocHtml.jsx":244,"DocMd.jsx":230,"DocPdf.jsx":245,"NotFound.jsx":254,"babel-runtime/helpers/slicedToArray":21,"react":"react"}],244:[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:true});var _jsxFileName="/Users/dirk/github/dariah/client/src/js/app/pure/DocHtml.jsx";var _react=require("react");var _react2=_interopRequireDefault(_react);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var DocHtml=function DocHtml(_ref){var docDir=_ref.docDir,docName=_ref.docName,docExt=_ref.docExt;var src="/api/file"+docDir+"/"+docName+"."+docExt;return _react2.default.createElement("iframe",{height:"100%",width:"100%",src:src,__source:{fileName:_jsxFileName,lineNumber:6}})};exports.default=DocHtml;

},{"react":"react"}],245:[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:true});var _jsxFileName="/Users/dirk/github/dariah/client/src/js/app/pure/DocPdf.jsx";var _react=require("react");var _react2=_interopRequireDefault(_react);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var DocPdf=function DocPdf(_ref){var docDir=_ref.docDir,docName=_ref.docName,docExt=_ref.docExt;var href="/api/file"+docDir+"/"+docName+"."+docExt;var iOS=/iPad|iPhone|iPod/.test(navigator.userAgent)&&!window.MSStream;return iOS?_react2.default.createElement("p",{__source:{fileName:_jsxFileName,lineNumber:7}},_react2.default.createElement("a",{target:"_blank",rel:"noopener noreferrer",href:href,__source:{fileName:_jsxFileName,lineNumber:8}},docName)," (open pdf in a new tab)"):_react2.default.createElement("object",{height:"100%",width:"100%",data:href,type:"application/pdf",__source:{fileName:_jsxFileName,lineNumber:11}},_react2.default.createElement("a",{target:"_blank",rel:"noopener noreferrer",href:href,__source:{fileName:_jsxFileName,lineNumber:17}},docName)," (open pdf in a new tab)")};exports.default=DocPdf;

},{"react":"react"}],246:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _jsxFileName='/Users/dirk/github/dariah/client/src/js/app/pure/Facet.jsx';var _react=require('react');var _react2=_interopRequireDefault(_react);var _reactRedux=require('react-redux');var _filter=require('filter.js');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var handleChange=function handleChange(handle,table,filterId,valueId,isOn){return function(){return handle(table,filterId,valueId,!isOn)}};var Facet=function Facet(_ref){var table=_ref.table,filterId=_ref.filterId,valueId=_ref.valueId,valueRep=_ref.valueRep,filterSetting=_ref.filterSetting,handle=_ref.handle;var isOn=filterSetting[valueId];return _react2.default.createElement('span',{__source:{fileName:_jsxFileName,lineNumber:10}},_react2.default.createElement('input',{type:'checkbox',checked:isOn,className:'facet',onChange:handleChange(handle,table,filterId,valueId,isOn),__source:{fileName:_jsxFileName,lineNumber:11}}),' '+valueRep)};exports.default=(0,_reactRedux.connect)(_filter.getFilterSetting,{handle:_filter.changeFacet})(Facet);

},{"filter.js":220,"react":"react","react-redux":"react-redux"}],247:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _jsxFileName='/Users/dirk/github/dariah/client/src/js/app/pure/Filter.jsx';var _react=require('react');var _react2=_interopRequireDefault(_react);var _reactRedux=require('react-redux');var _FullText=require('FullText.jsx');var _FullText2=_interopRequireDefault(_FullText);var _ByValue=require('ByValue.jsx');var _ByValue2=_interopRequireDefault(_ByValue);var _EUMap=require('EUMap.jsx');var _EUMap2=_interopRequireDefault(_EUMap);var _tables=require('tables.js');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var filterClass={FullText:_FullText2.default,EUMap:_EUMap2.default,ByValue:_ByValue2.default};var Filter=function Filter(_ref){var table=_ref.table,fields=_ref.fields,filterList=_ref.filterList,filteredAmount=_ref.filteredAmount,filteredAmountOthers=_ref.filteredAmountOthers,amounts=_ref.amounts;return _react2.default.createElement('div',{__source:{fileName:_jsxFileName,lineNumber:20}},filterList.filter(function(x){return fields[x.field]}).map(function(filter,filterId){var type=filter.type;var Fclass=filterClass[type];return _react2.default.createElement(Fclass,{key:filterId,table:table,filterId:filterId,filterField:filter.field,filterLabel:filter.label,maxCols:filter.maxCols,filteredAmount:filteredAmount,filteredAmountOthers:filteredAmountOthers[filterId],amounts:amounts[filterId],expanded:filter.expanded,__source:{fileName:_jsxFileName,lineNumber:25}})}))};exports.default=(0,_reactRedux.connect)(_tables.getTableFilters)(Filter);

},{"ByValue.jsx":242,"EUMap.jsx":231,"FullText.jsx":248,"react":"react","react-redux":"react-redux","tables.js":226}],248:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _jsxFileName='/Users/dirk/github/dariah/client/src/js/app/pure/FullText.jsx';var _react=require('react');var _react2=_interopRequireDefault(_react);var _reactRedux=require('react-redux');var _Stat=require('Stat.jsx');var _Stat2=_interopRequireDefault(_Stat);var _filter=require('filter.js');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var handleChange=function handleChange(handle,table,filterId){return function(event){return handle(table,filterId,event.target.value)}};var FullText=function FullText(_ref){var table=_ref.table,filterId=_ref.filterId,filterField=_ref.filterField,filterLabel=_ref.filterLabel,filterSetting=_ref.filterSetting,filteredAmount=_ref.filteredAmount,filteredAmountOthers=_ref.filteredAmountOthers,handle=_ref.handle;return _react2.default.createElement('div',{__source:{fileName:_jsxFileName,lineNumber:15}},_react2.default.createElement('p',{title:'Search in '+filterField,__source:{fileName:_jsxFileName,lineNumber:16}},_react2.default.createElement('input',{type:'text',className:'search',placeholder:'search in '+filterLabel,value:filterSetting,onChange:handleChange(handle,table,filterId),__source:{fileName:_jsxFileName,lineNumber:17}}),' ',_react2.default.createElement(_Stat2.default,{subTotal:filteredAmount,total:filteredAmountOthers,__source:{fileName:_jsxFileName,lineNumber:24}})))};exports.default=(0,_reactRedux.connect)(_filter.getFilterSetting,{handle:_filter.changeFulltext})(FullText);

},{"Stat.jsx":257,"filter.js":220,"react":"react","react-redux":"react-redux"}],249:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _jsxFileName='/Users/dirk/github/dariah/client/src/js/app/pure/ItemField.jsx';var _react=require('react');var _react2=_interopRequireDefault(_react);var _reactRedux=require('react-redux');var _tables=require('tables.js');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var trimDate=function trimDate(text){return text==null?'':text.replace(/\.[0-9]+/,'')};var valueAsString=function valueAsString(tables,table,valType,value){if(value==null){return''}if(typeof valType=='string'){switch(valType){case'datetime':return trimDate(value);default:return value;}}else{var rel=valType.values;return(0,_tables.repr)(tables,rel,value)}};var ItemField=function ItemField(_ref){var tables=_ref.tables,table=_ref.table,label=_ref.label,values=_ref.values,valType=_ref.valType,multiple=_ref.multiple;var theValues=multiple?values:[values];return _react2.default.createElement('p',{__source:{fileName:_jsxFileName,lineNumber:24}},_react2.default.createElement('label',{__source:{fileName:_jsxFileName,lineNumber:25}},_react2.default.createElement('b',{__source:{fileName:_jsxFileName,lineNumber:25}},label+':')),' ',theValues.map(function(value,i){return _react2.default.createElement('span',{key:i,__source:{fileName:_jsxFileName,lineNumber:28}},i!=0?' | ':'',_react2.default.createElement('span',{__source:{fileName:_jsxFileName,lineNumber:28}},valueAsString(tables,table,valType,value)))}))};exports.default=(0,_reactRedux.connect)(_tables.getTables)(ItemField);

},{"react":"react","react-redux":"react-redux","tables.js":226}],250:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _jsxFileName='/Users/dirk/github/dariah/client/src/js/app/pure/ItemHead.jsx';var _react=require('react');var _react2=_interopRequireDefault(_react);var _Alternative=require('Alternative.jsx');var _Alternative2=_interopRequireDefault(_Alternative);var _ItemRecord=require('ItemRecord.jsx');var _ItemRecord2=_interopRequireDefault(_ItemRecord);var _NavLink=require('NavLink.jsx');var _NavLink2=_interopRequireDefault(_NavLink);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var ItemHead=function ItemHead(_ref){var table=_ref.table,values=_ref.values,title=_ref.title,inplace=_ref.inplace;var eId=values._id,_values$title=values[title],entityHead=_values$title===undefined?'-empty-':_values$title;var control1=function control1(handler){return _react2.default.createElement('span',{className:'button-small fa fa-chevron-down',onClick:handler,__source:{fileName:_jsxFileName,lineNumber:9}})};var control2=function control2(handler){return _react2.default.createElement('span',{className:'button-small fa fa-chevron-right',onClick:handler,__source:{fileName:_jsxFileName,lineNumber:10}})};var controlPlacement=function controlPlacement(control){return _react2.default.createElement('p',{__source:{fileName:_jsxFileName,lineNumber:12}},control,_react2.default.createElement('span',{__source:{fileName:_jsxFileName,lineNumber:14}},entityHead))};return _react2.default.createElement('tr',{id:eId,__source:{fileName:_jsxFileName,lineNumber:21}},_react2.default.createElement('td',{__source:{fileName:_jsxFileName,lineNumber:22}},inplace?_react2.default.createElement(_Alternative2.default,{tag:table+'_'+eId,controlPlacement:controlPlacement,controls:[control1,control2],alternatives:[_react2.default.createElement(_ItemRecord2.default,{key:'show',table:table,eId:eId,__source:{fileName:_jsxFileName,lineNumber:29}}),''],initial:1,__source:{fileName:_jsxFileName,lineNumber:24}}):_react2.default.createElement(_NavLink2.default,{className:'nav',to:'/'+table+'/mylist/'+eId,__source:{fileName:_jsxFileName,lineNumber:38}},_react2.default.createElement('span',{__source:{fileName:_jsxFileName,lineNumber:39}},entityHead))))};exports.default=ItemHead;

},{"Alternative.jsx":239,"ItemRecord.jsx":235,"NavLink.jsx":253,"react":"react"}],251:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _jsxFileName='/Users/dirk/github/dariah/client/src/js/app/pure/ItemList.jsx';var _react=require('react');var _react2=_interopRequireDefault(_react);var _reactRedux=require('react-redux');var _ItemHead=require('ItemHead.jsx');var _ItemHead2=_interopRequireDefault(_ItemHead);var _tables=require('tables.js');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var ItemList=function ItemList(_ref){var tables=_ref.tables,table=_ref.table,title=_ref.title,filteredData=_ref.filteredData,inplace=_ref.inplace;var entities=tables[table].entities;return _react2.default.createElement('div',{__source:{fileName:_jsxFileName,lineNumber:9}},_react2.default.createElement('table',{__source:{fileName:_jsxFileName,lineNumber:10}},_react2.default.createElement('tbody',{__source:{fileName:_jsxFileName,lineNumber:11}},filteredData.map(function(eId){var values=entities[eId].values;return _react2.default.createElement(_ItemHead2.default,{key:eId,table:table,title:title,values:values,inplace:inplace,__source:{fileName:_jsxFileName,lineNumber:15}})}))))};exports.default=(0,_reactRedux.connect)(_tables.getTables)(ItemList);

},{"ItemHead.jsx":250,"react":"react","react-redux":"react-redux","tables.js":226}],252:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _jsxFileName='/Users/dirk/github/dariah/client/src/js/app/pure/ItemRecordPre.jsx';var _react=require('react');var _react2=_interopRequireDefault(_react);var _ItemRecord=require('ItemRecord.jsx');var _ItemRecord2=_interopRequireDefault(_ItemRecord);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var ItemRecordPre=function ItemRecordPre(_ref){var _ref$params=_ref.params,table=_ref$params.table,eId=_ref$params.eId,ownOnly=_ref.route.ownOnly;return _react2.default.createElement(_ItemRecord2.default,{table:table,eId:eId,ownOnly:ownOnly,__source:{fileName:_jsxFileName,lineNumber:6}})};exports.default=ItemRecordPre;

},{"ItemRecord.jsx":235,"react":"react"}],253:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _extends2=require('babel-runtime/helpers/extends');var _extends3=_interopRequireDefault(_extends2);var _jsxFileName='/Users/dirk/github/dariah/client/src/js/app/pure/NavLink.jsx';var _react=require('react');var _react2=_interopRequireDefault(_react);var _reactRouter=require('react-router');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var NavLink=function NavLink(props){return _react2.default.createElement(_reactRouter.Link,(0,_extends3.default)({},props,{activeClassName:'active',__source:{fileName:_jsxFileName,lineNumber:4}}))};exports.default=NavLink;

},{"babel-runtime/helpers/extends":17,"react":"react","react-router":"react-router"}],254:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _jsxFileName='/Users/dirk/github/dariah/client/src/js/app/pure/NotFound.jsx';var _react=require('react');var _react2=_interopRequireDefault(_react);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var NotFound=function NotFound(_ref){var splat=_ref.params.splat;return _react2.default.createElement('h1',{__source:{fileName:_jsxFileName,lineNumber:3}},'404: ',_react2.default.createElement('code',{__source:{fileName:_jsxFileName,lineNumber:3}},splat),' not found on this site.')};exports.default=NotFound;

},{"react":"react"}],255:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _jsxFileName='/Users/dirk/github/dariah/client/src/js/app/pure/Pane.jsx';var _react=require('react');var _react2=_interopRequireDefault(_react);var _reactRedux=require('react-redux');var _win=require('win.js');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var Pane=function Pane(_ref){var format=_ref.format,position=_ref.position,children=_ref.children,height=_ref.height,width=_ref.width;return _react2.default.createElement('div',{className:format,style:(0,_win.columnStyle)(position,{height:height,width:width}),__source:{fileName:_jsxFileName,lineNumber:6}},children)};exports.default=(0,_reactRedux.connect)(_win.getWinDim)(Pane);

},{"react":"react","react-redux":"react-redux","win.js":227}],256:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _jsxFileName='/Users/dirk/github/dariah/client/src/js/app/pure/Root.jsx';var _react=require('react');var _react2=_interopRequireDefault(_react);var _reactRedux=require('react-redux');var _Window=require('Window.jsx');var _Window2=_interopRequireDefault(_Window);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var Root=function Root(_ref){var store=_ref.store,children=_ref.children;return _react2.default.createElement(_reactRedux.Provider,{store:store,__source:{fileName:_jsxFileName,lineNumber:7}},_react2.default.createElement(_Window2.default,{__source:{fileName:_jsxFileName,lineNumber:8}},children))};exports.default=Root;

},{"Window.jsx":238,"react":"react","react-redux":"react-redux"}],257:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _jsxFileName='/Users/dirk/github/dariah/client/src/js/app/pure/Stat.jsx';var _react=require('react');var _react2=_interopRequireDefault(_react);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var Stat=function Stat(_ref){var subTotal=_ref.subTotal,total=_ref.total;return _react2.default.createElement('span',{className:'good-o',__source:{fileName:_jsxFileName,lineNumber:4}},subTotal==null?'':''+subTotal,total==null||subTotal==null?'':' of ',_react2.default.createElement('strong',{__source:{fileName:_jsxFileName,lineNumber:7}},total==null?'':''+total))};exports.default=Stat;

},{"react":"react"}],258:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _jsxFileName='/Users/dirk/github/dariah/client/src/js/app/pure/Static.jsx';var _react=require('react');var _react2=_interopRequireDefault(_react);var _NavLink=require('NavLink.jsx');var _NavLink2=_interopRequireDefault(_NavLink);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var Static=function Static(){return _react2.default.createElement('span',{className:'small',__source:{fileName:_jsxFileName,lineNumber:5}},_react2.default.createElement(_NavLink2.default,{to:'/docs/about.md',__source:{fileName:_jsxFileName,lineNumber:6}},'About'),_react2.default.createElement(_NavLink2.default,{to:'/tech/docs/design.pdf',__source:{fileName:_jsxFileName,lineNumber:7}},'diagrams'),_react2.default.createElement(_NavLink2.default,{to:'/tech/docs/deploy.md',__source:{fileName:_jsxFileName,lineNumber:8}},'deploy'),_react2.default.createElement('a',{href:'/api/file/tech/docs/gen/index.html',target:'_blank',rel:'noopener noreferrer',__source:{fileName:_jsxFileName,lineNumber:9}},'tech doc'))};exports.default=Static;

},{"NavLink.jsx":253,"react":"react"}],259:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _jsxFileName='/Users/dirk/github/dariah/client/src/js/app/pure/SubApp.jsx';var _react=require('react');var _react2=_interopRequireDefault(_react);var _reactRedux=require('react-redux');var _NavLink=require('NavLink.jsx');var _NavLink2=_interopRequireDefault(_NavLink);var _Pane=require('Pane.jsx');var _Pane2=_interopRequireDefault(_Pane);var _win=require('win.js');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var SubApp=function SubApp(_ref){var table=_ref.params.table,children=_ref.children;return _react2.default.createElement('div',{__source:{fileName:_jsxFileName,lineNumber:8}},_react2.default.createElement(_Pane2.default,{format:'nav sized',position:'left',__source:{fileName:_jsxFileName,lineNumber:9}},table=='contrib'?_react2.default.createElement('div',{__source:{fileName:_jsxFileName,lineNumber:11}},_react2.default.createElement('p',{__source:{fileName:_jsxFileName,lineNumber:12}},_react2.default.createElement(_NavLink2.default,{to:'/'+table+'/list',__source:{fileName:_jsxFileName,lineNumber:12}},'All items')),_react2.default.createElement('p',{__source:{fileName:_jsxFileName,lineNumber:13}},_react2.default.createElement(_NavLink2.default,{to:'/'+table+'/mylist',__source:{fileName:_jsxFileName,lineNumber:13}},'My work'))):_react2.default.createElement('div',{__source:{fileName:_jsxFileName,lineNumber:16}},_react2.default.createElement('p',{__source:{fileName:_jsxFileName,lineNumber:17}},_react2.default.createElement(_NavLink2.default,{to:'/'+table+'/type',__source:{fileName:_jsxFileName,lineNumber:17}},'Types')),_react2.default.createElement('p',{__source:{fileName:_jsxFileName,lineNumber:18}},_react2.default.createElement(_NavLink2.default,{to:'/'+table+'/assess',__source:{fileName:_jsxFileName,lineNumber:18}},'Criteria')),_react2.default.createElement('p',{__source:{fileName:_jsxFileName,lineNumber:19}},_react2.default.createElement(_NavLink2.default,{to:'/'+table+'/package',__source:{fileName:_jsxFileName,lineNumber:19}},'Packages')))),_react2.default.createElement(_Pane2.default,{format:'sized',position:'right',__source:{fileName:_jsxFileName,lineNumber:23}},children))};exports.default=(0,_reactRedux.connect)(_win.getWinDim)(SubApp);

},{"NavLink.jsx":253,"Pane.jsx":255,"react":"react","react-redux":"react-redux","win.js":227}]},{},[228])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL2FycmF5L2Zyb20uanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL2dldC1pdGVyYXRvci5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvaXMtaXRlcmFibGUuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL2pzb24vc3RyaW5naWZ5LmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvYXNzaWduLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvY3JlYXRlLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvZGVmaW5lLXByb3BlcnR5LmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvZW50cmllcy5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2dldC1wcm90b3R5cGUtb2YuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9rZXlzLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3Qvc2V0LXByb3RvdHlwZS1vZi5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvc3ltYm9sLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9zeW1ib2wvaXRlcmF0b3IuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9oZWxwZXJzL2NsYXNzQ2FsbENoZWNrLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvaGVscGVycy9jcmVhdGVDbGFzcy5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2hlbHBlcnMvZGVmaW5lUHJvcGVydHkuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9oZWxwZXJzL2V4dGVuZHMuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9oZWxwZXJzL2luaGVyaXRzLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvaGVscGVycy9vYmplY3RXaXRob3V0UHJvcGVydGllcy5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2hlbHBlcnMvcG9zc2libGVDb25zdHJ1Y3RvclJldHVybi5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2hlbHBlcnMvc2xpY2VkVG9BcnJheS5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2hlbHBlcnMvdG9Db25zdW1hYmxlQXJyYXkuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9oZWxwZXJzL3R5cGVvZi5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vYXJyYXkvZnJvbS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vZ2V0LWl0ZXJhdG9yLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9pcy1pdGVyYWJsZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vanNvbi9zdHJpbmdpZnkuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9hc3NpZ24uanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9jcmVhdGUuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9kZWZpbmUtcHJvcGVydHkuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9lbnRyaWVzLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvZ2V0LXByb3RvdHlwZS1vZi5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2tleXMuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9zZXQtcHJvdG90eXBlLW9mLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9zeW1ib2wvaW5kZXguanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL3N5bWJvbC9pdGVyYXRvci5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYS1mdW5jdGlvbi5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYWRkLXRvLXVuc2NvcGFibGVzLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hbi1vYmplY3QuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FycmF5LWluY2x1ZGVzLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jbGFzc29mLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jb2YuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2NvcmUuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2NyZWF0ZS1wcm9wZXJ0eS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY3R4LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19kZWZpbmVkLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19kZXNjcmlwdG9ycy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZG9tLWNyZWF0ZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZW51bS1idWcta2V5cy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZW51bS1rZXlzLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19leHBvcnQuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2ZhaWxzLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19nbG9iYWwuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2hhcy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faGlkZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faHRtbC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faWU4LWRvbS1kZWZpbmUuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2lvYmplY3QuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2lzLWFycmF5LWl0ZXIuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2lzLWFycmF5LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pcy1vYmplY3QuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXItY2FsbC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlci1jcmVhdGUuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXItZGVmaW5lLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pdGVyLWRldGVjdC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlci1zdGVwLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pdGVyYXRvcnMuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2tleW9mLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19saWJyYXJ5LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19tZXRhLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtYXNzaWduLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtY3JlYXRlLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZHAuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1kcHMuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1nb3BkLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZ29wbi1leHQuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1nb3BuLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZ29wcy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWdwby5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWtleXMtaW50ZXJuYWwuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1rZXlzLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtcGllLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3Qtc2FwLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtdG8tYXJyYXkuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3Byb3BlcnR5LWRlc2MuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3JlZGVmaW5lLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zZXQtcHJvdG8uanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3NldC10by1zdHJpbmctdGFnLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zaGFyZWQta2V5LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zaGFyZWQuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3N0cmluZy1hdC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8taW5kZXguanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWludGVnZXIuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWlvYmplY3QuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWxlbmd0aC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8tb2JqZWN0LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1wcmltaXRpdmUuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3VpZC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fd2tzLWRlZmluZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fd2tzLWV4dC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fd2tzLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2NvcmUuZ2V0LWl0ZXJhdG9yLW1ldGhvZC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9jb3JlLmdldC1pdGVyYXRvci5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9jb3JlLmlzLWl0ZXJhYmxlLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5hcnJheS5mcm9tLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5hcnJheS5pdGVyYXRvci5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LmFzc2lnbi5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LmNyZWF0ZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LmRlZmluZS1wcm9wZXJ0eS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LmdldC1wcm90b3R5cGUtb2YuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5rZXlzLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3Quc2V0LXByb3RvdHlwZS1vZi5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LnRvLXN0cmluZy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYuc3RyaW5nLml0ZXJhdG9yLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5zeW1ib2wuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM3Lm9iamVjdC5lbnRyaWVzLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNy5zeW1ib2wuYXN5bmMtaXRlcmF0b3IuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM3LnN5bWJvbC5vYnNlcnZhYmxlLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL3dlYi5kb20uaXRlcmFibGUuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19IYXNoLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fTGlzdENhY2hlLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fTWFwLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fTWFwQ2FjaGUuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19TdGFjay5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX1VpbnQ4QXJyYXkuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19hcHBseS5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX2FycmF5TGlrZUtleXMuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19hc3NpZ25NZXJnZVZhbHVlLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fYXNzaWduVmFsdWUuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19hc3NvY0luZGV4T2YuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19iYXNlQXNzaWduVmFsdWUuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19iYXNlQ3JlYXRlLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fYmFzZUZvci5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX2Jhc2VJc0FyZ3VtZW50cy5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX2Jhc2VJc05hdGl2ZS5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX2Jhc2VJc1R5cGVkQXJyYXkuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19iYXNlS2V5c0luLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fYmFzZU1lcmdlLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fYmFzZU1lcmdlRGVlcC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX2Jhc2VSZXN0LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fYmFzZVNldFRvU3RyaW5nLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fYmFzZVRpbWVzLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fYmFzZVVuYXJ5LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fY2xvbmVBcnJheUJ1ZmZlci5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX2Nsb25lQnVmZmVyLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fY2xvbmVUeXBlZEFycmF5LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fY29weUFycmF5LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fY29weU9iamVjdC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX2NvcmVKc0RhdGEuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19jcmVhdGVBc3NpZ25lci5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX2NyZWF0ZUJhc2VGb3IuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19kZWZpbmVQcm9wZXJ0eS5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX2ZyZWVHbG9iYWwuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19nZXRNYXBEYXRhLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fZ2V0TmF0aXZlLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fZ2V0UHJvdG90eXBlLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fZ2V0VmFsdWUuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19oYXNoQ2xlYXIuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19oYXNoRGVsZXRlLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9faGFzaEdldC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX2hhc2hIYXMuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19oYXNoU2V0LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9faW5pdENsb25lT2JqZWN0LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9faXNJbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX2lzSXRlcmF0ZWVDYWxsLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9faXNLZXlhYmxlLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9faXNNYXNrZWQuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19pc1Byb3RvdHlwZS5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX2xpc3RDYWNoZUNsZWFyLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fbGlzdENhY2hlRGVsZXRlLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fbGlzdENhY2hlR2V0LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fbGlzdENhY2hlSGFzLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fbGlzdENhY2hlU2V0LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fbWFwQ2FjaGVDbGVhci5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX21hcENhY2hlRGVsZXRlLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fbWFwQ2FjaGVHZXQuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19tYXBDYWNoZUhhcy5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX21hcENhY2hlU2V0LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fbmF0aXZlQ3JlYXRlLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fbmF0aXZlS2V5c0luLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fbm9kZVV0aWwuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19vdmVyQXJnLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fb3ZlclJlc3QuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19yb290LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fc2V0VG9TdHJpbmcuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19zaG9ydE91dC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX3N0YWNrQ2xlYXIuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19zdGFja0RlbGV0ZS5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX3N0YWNrR2V0LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fc3RhY2tIYXMuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL19zdGFja1NldC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX3RvU291cmNlLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9jb25zdGFudC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvZGVib3VuY2UuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2VxLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9pZGVudGl0eS5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvaXNBcmd1bWVudHMuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2lzQXJyYXkuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2lzQXJyYXlMaWtlLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9pc0FycmF5TGlrZU9iamVjdC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvaXNCdWZmZXIuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2lzRnVuY3Rpb24uanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2lzTGVuZ3RoLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9pc09iamVjdC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvaXNPYmplY3RMaWtlLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9pc1BsYWluT2JqZWN0LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9pc1N5bWJvbC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvaXNUeXBlZEFycmF5LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9rZXlzSW4uanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL21lcmdlLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9tZXJnZVdpdGguanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL25vdy5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvc3R1YkZhbHNlLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC90aHJvdHRsZS5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvdG9OdW1iZXIuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL3RvUGxhaW5PYmplY3QuanMiLCJzcmMvanMvYXBwL2R1eC9hbHRlci5qcyIsInNyYy9qcy9hcHAvZHV4L2NvbmZpZ3VyZVN0b3JlLmpzIiwic3JjL2pzL2FwcC9kdXgvZG9jLmpzIiwic3JjL2pzL2FwcC9kdXgvZmlsdGVyLmpzIiwic3JjL2pzL2FwcC9kdXgvaGVscGVycy5qcyIsInNyYy9qcy9hcHAvZHV4L21lLmpzIiwic3JjL2pzL2FwcC9kdXgvbm90aWZ5LmpzIiwic3JjL2pzL2FwcC9kdXgvcm9vdFJlZHVjZXIuanMiLCJzcmMvanMvYXBwL2R1eC9zZXJ2ZXIuanMiLCJzcmMvanMvYXBwL2R1eC90YWJsZXMuanMiLCJzcmMvanMvYXBwL2R1eC93aW4uanMiLCJzcmMvanMvYXBwL21haW4uanN4Iiwic3JjL2pzL2FwcC9vYmplY3QvQ2hlY2tib3hJLmpzeCIsInNyYy9qcy9hcHAvb2JqZWN0L0RvY01kLmpzeCIsInNyYy9qcy9hcHAvb2JqZWN0L0VVTWFwLmpzeCIsInNyYy9qcy9hcHAvb2JqZWN0L0ZpbHRlckNvbXB1dGUuanN4Iiwic3JjL2pzL2FwcC9vYmplY3QvSXRlbUZpbHRlcmVkLmpzeCIsInNyYy9qcy9hcHAvb2JqZWN0L0l0ZW1NeS5qc3giLCJzcmMvanMvYXBwL29iamVjdC9JdGVtUmVjb3JkLmpzeCIsInNyYy9qcy9hcHAvb2JqZWN0L0xvZ2luLmpzeCIsInNyYy9qcy9hcHAvb2JqZWN0L05vdGlmaWNhdGlvbi5qc3giLCJzcmMvanMvYXBwL29iamVjdC9XaW5kb3cuanN4Iiwic3JjL2pzL2FwcC9wdXJlL0FsdGVybmF0aXZlLmpzeCIsInNyYy9qcy9hcHAvcHVyZS9BcHAuanN4Iiwic3JjL2pzL2FwcC9wdXJlL0JhY2tvZmZpY2UuanN4Iiwic3JjL2pzL2FwcC9wdXJlL0J5VmFsdWUuanN4Iiwic3JjL2pzL2FwcC9wdXJlL0RvYy5qc3giLCJzcmMvanMvYXBwL3B1cmUvRG9jSHRtbC5qc3giLCJzcmMvanMvYXBwL3B1cmUvRG9jUGRmLmpzeCIsInNyYy9qcy9hcHAvcHVyZS9GYWNldC5qc3giLCJzcmMvanMvYXBwL3B1cmUvRmlsdGVyLmpzeCIsInNyYy9qcy9hcHAvcHVyZS9GdWxsVGV4dC5qc3giLCJzcmMvanMvYXBwL3B1cmUvSXRlbUZpZWxkLmpzeCIsInNyYy9qcy9hcHAvcHVyZS9JdGVtSGVhZC5qc3giLCJzcmMvanMvYXBwL3B1cmUvSXRlbUxpc3QuanN4Iiwic3JjL2pzL2FwcC9wdXJlL0l0ZW1SZWNvcmRQcmUuanN4Iiwic3JjL2pzL2FwcC9wdXJlL05hdkxpbmsuanN4Iiwic3JjL2pzL2FwcC9wdXJlL05vdEZvdW5kLmpzeCIsInNyYy9qcy9hcHAvcHVyZS9QYW5lLmpzeCIsInNyYy9qcy9hcHAvcHVyZS9Sb290LmpzeCIsInNyYy9qcy9hcHAvcHVyZS9TdGF0LmpzeCIsInNyYy9qcy9hcHAvcHVyZS9TdGF0aWMuanN4Iiwic3JjL2pzL2FwcC9wdXJlL1N1YkFwcC5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTs7QUNBQTs7QUNBQTs7QUNBQTs7QUNBQTs7QUNBQTs7QUNBQTs7QUNBQTs7QUNBQTs7QUNBQTs7QUNBQTs7QUNBQTs7QUNBQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEJBO0FBQ0E7QUFDQTs7QUNGQTtBQUNBO0FBQ0E7O0FDRkE7QUFDQTtBQUNBOztBQ0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTs7QUNEQTtBQUNBOztBQ0RBO0FBQ0E7O0FDREE7QUFDQTs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTs7QUNGQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBOztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7O0FDQUE7QUFDQTtBQUNBOztBQ0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTs7QUNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBOztBQ0ZBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pDQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7O0FDRkE7QUFDQTtBQUNBOztBQ0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBOztBQ0ZBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7O0FDQUE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1TEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQy9CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztrUENoQ0Esb0MsOEhBSU8sR0FB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QTZELElBQUkscUJBQWpFLGdEQUF5RixVQUF6RixDQUpGLENBRGEsQ0FBZixDLGdCQVNlLE07OztxSkNaZiw0QiwyQ0FDQSx1Q0FDQSxvQywrQ0FDQSw4Qix5Q0FDQSwyQixrRkFFQSxHQUFNLFFBQVMsUUFBVCxPQUFTLFVBQVksTUFBWixNQUFFLE1BQUYsQ0FBWSxLQUFaLENBQXFCLFFBQXJCLE1BQXFCLFFBQXJCLE9BQ2IscUZBQ0UsOENBQU0sT0FBTyxXQUFiLENBQXlCLFNBQVMsTUFBbEMsZ0RBQ0ksT0FBUyxTQUFWLENBQ0MscUZBQ0UsbUZBQUcsaURBQVMsT0FBUSxLQUFSLFFBQVQsaURBQWlDLFdBQWpDLENBQUgsQ0FERixDQUVFLG1GQUFHLGlEQUFTLE9BQVEsS0FBUixVQUFULGlEQUFtQyxTQUFuQyxDQUFILENBRkYsQ0FERCxDQU1DLHFGQUNFLG1GQUFHLGlEQUFTLE9BQVEsS0FBUixRQUFULGlEQUFpQyxPQUFqQyxDQUFILENBREYsQ0FFRSxtRkFBRyxpREFBUyxPQUFRLEtBQVIsVUFBVCxpREFBbUMsVUFBbkMsQ0FBSCxDQUZGLENBR0UsbUZBQUcsaURBQVMsT0FBUSxLQUFSLFdBQVQsaURBQW9DLFVBQXBDLENBQUgsQ0FIRixDQVBKLENBREYsQ0FlRSw4Q0FBTSxPQUFPLE9BQWIsQ0FBcUIsU0FBUyxPQUE5QixpREFDSSxRQURKLENBZkYsQ0FEYSxDQUFmLEMsZ0JBc0JlLHdDQUFtQixNQUFuQixDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9hcnJheS9mcm9tXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07IiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL2dldC1pdGVyYXRvclwiKSwgX19lc01vZHVsZTogdHJ1ZSB9OyIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9pcy1pdGVyYWJsZVwiKSwgX19lc01vZHVsZTogdHJ1ZSB9OyIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9qc29uL3N0cmluZ2lmeVwiKSwgX19lc01vZHVsZTogdHJ1ZSB9OyIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvYXNzaWduXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07IiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9jcmVhdGVcIiksIF9fZXNNb2R1bGU6IHRydWUgfTsiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2RlZmluZS1wcm9wZXJ0eVwiKSwgX19lc01vZHVsZTogdHJ1ZSB9OyIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvZW50cmllc1wiKSwgX19lc01vZHVsZTogdHJ1ZSB9OyIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvZ2V0LXByb3RvdHlwZS1vZlwiKSwgX19lc01vZHVsZTogdHJ1ZSB9OyIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9vYmplY3Qva2V5c1wiKSwgX19lc01vZHVsZTogdHJ1ZSB9OyIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9vYmplY3Qvc2V0LXByb3RvdHlwZS1vZlwiKSwgX19lc01vZHVsZTogdHJ1ZSB9OyIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9zeW1ib2xcIiksIF9fZXNNb2R1bGU6IHRydWUgfTsiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vc3ltYm9sL2l0ZXJhdG9yXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHtcbiAgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpO1xuICB9XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX2RlZmluZVByb3BlcnR5ID0gcmVxdWlyZShcIi4uL2NvcmUtanMvb2JqZWN0L2RlZmluZS1wcm9wZXJ0eVwiKTtcblxudmFyIF9kZWZpbmVQcm9wZXJ0eTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9kZWZpbmVQcm9wZXJ0eSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTtcbiAgICAgIGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTtcbiAgICAgIGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTtcbiAgICAgIGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7XG4gICAgICAoMCwgX2RlZmluZVByb3BlcnR5Mi5kZWZhdWx0KSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykge1xuICAgIGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7XG4gICAgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7XG4gICAgcmV0dXJuIENvbnN0cnVjdG9yO1xuICB9O1xufSgpOyIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX2RlZmluZVByb3BlcnR5ID0gcmVxdWlyZShcIi4uL2NvcmUtanMvb2JqZWN0L2RlZmluZS1wcm9wZXJ0eVwiKTtcblxudmFyIF9kZWZpbmVQcm9wZXJ0eTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9kZWZpbmVQcm9wZXJ0eSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChvYmosIGtleSwgdmFsdWUpIHtcbiAgaWYgKGtleSBpbiBvYmopIHtcbiAgICAoMCwgX2RlZmluZVByb3BlcnR5Mi5kZWZhdWx0KShvYmosIGtleSwge1xuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgb2JqW2tleV0gPSB2YWx1ZTtcbiAgfVxuXG4gIHJldHVybiBvYmo7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX2Fzc2lnbiA9IHJlcXVpcmUoXCIuLi9jb3JlLWpzL29iamVjdC9hc3NpZ25cIik7XG5cbnZhciBfYXNzaWduMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2Fzc2lnbik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IF9hc3NpZ24yLmRlZmF1bHQgfHwgZnVuY3Rpb24gKHRhcmdldCkge1xuICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07XG5cbiAgICBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7XG4gICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkge1xuICAgICAgICB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX3NldFByb3RvdHlwZU9mID0gcmVxdWlyZShcIi4uL2NvcmUtanMvb2JqZWN0L3NldC1wcm90b3R5cGUtb2ZcIik7XG5cbnZhciBfc2V0UHJvdG90eXBlT2YyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfc2V0UHJvdG90eXBlT2YpO1xuXG52YXIgX2NyZWF0ZSA9IHJlcXVpcmUoXCIuLi9jb3JlLWpzL29iamVjdC9jcmVhdGVcIik7XG5cbnZhciBfY3JlYXRlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NyZWF0ZSk7XG5cbnZhciBfdHlwZW9mMiA9IHJlcXVpcmUoXCIuLi9oZWxwZXJzL3R5cGVvZlwiKTtcblxudmFyIF90eXBlb2YzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdHlwZW9mMik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChzdWJDbGFzcywgc3VwZXJDbGFzcykge1xuICBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIgKyAodHlwZW9mIHN1cGVyQ2xhc3MgPT09IFwidW5kZWZpbmVkXCIgPyBcInVuZGVmaW5lZFwiIDogKDAsIF90eXBlb2YzLmRlZmF1bHQpKHN1cGVyQ2xhc3MpKSk7XG4gIH1cblxuICBzdWJDbGFzcy5wcm90b3R5cGUgPSAoMCwgX2NyZWF0ZTIuZGVmYXVsdCkoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwge1xuICAgIGNvbnN0cnVjdG9yOiB7XG4gICAgICB2YWx1ZTogc3ViQ2xhc3MsXG4gICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfVxuICB9KTtcbiAgaWYgKHN1cGVyQ2xhc3MpIF9zZXRQcm90b3R5cGVPZjIuZGVmYXVsdCA/ICgwLCBfc2V0UHJvdG90eXBlT2YyLmRlZmF1bHQpKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAob2JqLCBrZXlzKSB7XG4gIHZhciB0YXJnZXQgPSB7fTtcblxuICBmb3IgKHZhciBpIGluIG9iaikge1xuICAgIGlmIChrZXlzLmluZGV4T2YoaSkgPj0gMCkgY29udGludWU7XG4gICAgaWYgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBpKSkgY29udGludWU7XG4gICAgdGFyZ2V0W2ldID0gb2JqW2ldO1xuICB9XG5cbiAgcmV0dXJuIHRhcmdldDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfdHlwZW9mMiA9IHJlcXVpcmUoXCIuLi9oZWxwZXJzL3R5cGVvZlwiKTtcblxudmFyIF90eXBlb2YzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdHlwZW9mMik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChzZWxmLCBjYWxsKSB7XG4gIGlmICghc2VsZikge1xuICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTtcbiAgfVxuXG4gIHJldHVybiBjYWxsICYmICgodHlwZW9mIGNhbGwgPT09IFwidW5kZWZpbmVkXCIgPyBcInVuZGVmaW5lZFwiIDogKDAsIF90eXBlb2YzLmRlZmF1bHQpKGNhbGwpKSA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSA/IGNhbGwgOiBzZWxmO1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9pc0l0ZXJhYmxlMiA9IHJlcXVpcmUoXCIuLi9jb3JlLWpzL2lzLWl0ZXJhYmxlXCIpO1xuXG52YXIgX2lzSXRlcmFibGUzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaXNJdGVyYWJsZTIpO1xuXG52YXIgX2dldEl0ZXJhdG9yMiA9IHJlcXVpcmUoXCIuLi9jb3JlLWpzL2dldC1pdGVyYXRvclwiKTtcblxudmFyIF9nZXRJdGVyYXRvcjMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9nZXRJdGVyYXRvcjIpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIHNsaWNlSXRlcmF0b3IoYXJyLCBpKSB7XG4gICAgdmFyIF9hcnIgPSBbXTtcbiAgICB2YXIgX24gPSB0cnVlO1xuICAgIHZhciBfZCA9IGZhbHNlO1xuICAgIHZhciBfZSA9IHVuZGVmaW5lZDtcblxuICAgIHRyeSB7XG4gICAgICBmb3IgKHZhciBfaSA9ICgwLCBfZ2V0SXRlcmF0b3IzLmRlZmF1bHQpKGFyciksIF9zOyAhKF9uID0gKF9zID0gX2kubmV4dCgpKS5kb25lKTsgX24gPSB0cnVlKSB7XG4gICAgICAgIF9hcnIucHVzaChfcy52YWx1ZSk7XG5cbiAgICAgICAgaWYgKGkgJiYgX2Fyci5sZW5ndGggPT09IGkpIGJyZWFrO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgX2QgPSB0cnVlO1xuICAgICAgX2UgPSBlcnI7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGlmICghX24gJiYgX2lbXCJyZXR1cm5cIl0pIF9pW1wicmV0dXJuXCJdKCk7XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICBpZiAoX2QpIHRocm93IF9lO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBfYXJyO1xuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIChhcnIsIGkpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSB7XG4gICAgICByZXR1cm4gYXJyO1xuICAgIH0gZWxzZSBpZiAoKDAsIF9pc0l0ZXJhYmxlMy5kZWZhdWx0KShPYmplY3QoYXJyKSkpIHtcbiAgICAgIHJldHVybiBzbGljZUl0ZXJhdG9yKGFyciwgaSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlXCIpO1xuICAgIH1cbiAgfTtcbn0oKTsiLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9mcm9tID0gcmVxdWlyZShcIi4uL2NvcmUtanMvYXJyYXkvZnJvbVwiKTtcblxudmFyIF9mcm9tMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2Zyb20pO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoYXJyKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KGFycikpIHtcbiAgICBmb3IgKHZhciBpID0gMCwgYXJyMiA9IEFycmF5KGFyci5sZW5ndGgpOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICBhcnIyW2ldID0gYXJyW2ldO1xuICAgIH1cblxuICAgIHJldHVybiBhcnIyO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiAoMCwgX2Zyb20yLmRlZmF1bHQpKGFycik7XG4gIH1cbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfaXRlcmF0b3IgPSByZXF1aXJlKFwiLi4vY29yZS1qcy9zeW1ib2wvaXRlcmF0b3JcIik7XG5cbnZhciBfaXRlcmF0b3IyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaXRlcmF0b3IpO1xuXG52YXIgX3N5bWJvbCA9IHJlcXVpcmUoXCIuLi9jb3JlLWpzL3N5bWJvbFwiKTtcblxudmFyIF9zeW1ib2wyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfc3ltYm9sKTtcblxudmFyIF90eXBlb2YgPSB0eXBlb2YgX3N5bWJvbDIuZGVmYXVsdCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBfaXRlcmF0b3IyLmRlZmF1bHQgPT09IFwic3ltYm9sXCIgPyBmdW5jdGlvbiAob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9IDogZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBfc3ltYm9sMi5kZWZhdWx0ID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBfc3ltYm9sMi5kZWZhdWx0ICYmIG9iaiAhPT0gX3N5bWJvbDIuZGVmYXVsdC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gdHlwZW9mIF9zeW1ib2wyLmRlZmF1bHQgPT09IFwiZnVuY3Rpb25cIiAmJiBfdHlwZW9mKF9pdGVyYXRvcjIuZGVmYXVsdCkgPT09IFwic3ltYm9sXCIgPyBmdW5jdGlvbiAob2JqKSB7XG4gIHJldHVybiB0eXBlb2Ygb2JqID09PSBcInVuZGVmaW5lZFwiID8gXCJ1bmRlZmluZWRcIiA6IF90eXBlb2Yob2JqKTtcbn0gOiBmdW5jdGlvbiAob2JqKSB7XG4gIHJldHVybiBvYmogJiYgdHlwZW9mIF9zeW1ib2wyLmRlZmF1bHQgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IF9zeW1ib2wyLmRlZmF1bHQgJiYgb2JqICE9PSBfc3ltYm9sMi5kZWZhdWx0LnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqID09PSBcInVuZGVmaW5lZFwiID8gXCJ1bmRlZmluZWRcIiA6IF90eXBlb2Yob2JqKTtcbn07IiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYuc3RyaW5nLml0ZXJhdG9yJyk7XG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5hcnJheS5mcm9tJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5BcnJheS5mcm9tOyIsInJlcXVpcmUoJy4uL21vZHVsZXMvd2ViLmRvbS5pdGVyYWJsZScpO1xucmVxdWlyZSgnLi4vbW9kdWxlcy9lczYuc3RyaW5nLml0ZXJhdG9yJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uL21vZHVsZXMvY29yZS5nZXQtaXRlcmF0b3InKTsiLCJyZXF1aXJlKCcuLi9tb2R1bGVzL3dlYi5kb20uaXRlcmFibGUnKTtcbnJlcXVpcmUoJy4uL21vZHVsZXMvZXM2LnN0cmluZy5pdGVyYXRvcicpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi9tb2R1bGVzL2NvcmUuaXMtaXRlcmFibGUnKTsiLCJ2YXIgY29yZSAgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJylcbiAgLCAkSlNPTiA9IGNvcmUuSlNPTiB8fCAoY29yZS5KU09OID0ge3N0cmluZ2lmeTogSlNPTi5zdHJpbmdpZnl9KTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc3RyaW5naWZ5KGl0KXsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuICByZXR1cm4gJEpTT04uc3RyaW5naWZ5LmFwcGx5KCRKU09OLCBhcmd1bWVudHMpO1xufTsiLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5vYmplY3QuYXNzaWduJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5PYmplY3QuYXNzaWduOyIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm9iamVjdC5jcmVhdGUnKTtcbnZhciAkT2JqZWN0ID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLk9iamVjdDtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY3JlYXRlKFAsIEQpe1xuICByZXR1cm4gJE9iamVjdC5jcmVhdGUoUCwgRCk7XG59OyIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm9iamVjdC5kZWZpbmUtcHJvcGVydHknKTtcbnZhciAkT2JqZWN0ID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLk9iamVjdDtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkoaXQsIGtleSwgZGVzYyl7XG4gIHJldHVybiAkT2JqZWN0LmRlZmluZVByb3BlcnR5KGl0LCBrZXksIGRlc2MpO1xufTsiLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNy5vYmplY3QuZW50cmllcycpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJykuT2JqZWN0LmVudHJpZXM7IiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYub2JqZWN0LmdldC1wcm90b3R5cGUtb2YnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLk9iamVjdC5nZXRQcm90b3R5cGVPZjsiLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5vYmplY3Qua2V5cycpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJykuT2JqZWN0LmtleXM7IiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYub2JqZWN0LnNldC1wcm90b3R5cGUtb2YnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLk9iamVjdC5zZXRQcm90b3R5cGVPZjsiLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5zeW1ib2wnKTtcbnJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm9iamVjdC50by1zdHJpbmcnKTtcbnJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM3LnN5bWJvbC5hc3luYy1pdGVyYXRvcicpO1xucmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczcuc3ltYm9sLm9ic2VydmFibGUnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLlN5bWJvbDsiLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5zdHJpbmcuaXRlcmF0b3InKTtcbnJlcXVpcmUoJy4uLy4uL21vZHVsZXMvd2ViLmRvbS5pdGVyYWJsZScpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL193a3MtZXh0JykuZignaXRlcmF0b3InKTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgaWYodHlwZW9mIGl0ICE9ICdmdW5jdGlvbicpdGhyb3cgVHlwZUVycm9yKGl0ICsgJyBpcyBub3QgYSBmdW5jdGlvbiEnKTtcbiAgcmV0dXJuIGl0O1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCl7IC8qIGVtcHR5ICovIH07IiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgaWYoIWlzT2JqZWN0KGl0KSl0aHJvdyBUeXBlRXJyb3IoaXQgKyAnIGlzIG5vdCBhbiBvYmplY3QhJyk7XG4gIHJldHVybiBpdDtcbn07IiwiLy8gZmFsc2UgLT4gQXJyYXkjaW5kZXhPZlxuLy8gdHJ1ZSAgLT4gQXJyYXkjaW5jbHVkZXNcbnZhciB0b0lPYmplY3QgPSByZXF1aXJlKCcuL190by1pb2JqZWN0JylcbiAgLCB0b0xlbmd0aCAgPSByZXF1aXJlKCcuL190by1sZW5ndGgnKVxuICAsIHRvSW5kZXggICA9IHJlcXVpcmUoJy4vX3RvLWluZGV4Jyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKElTX0lOQ0xVREVTKXtcbiAgcmV0dXJuIGZ1bmN0aW9uKCR0aGlzLCBlbCwgZnJvbUluZGV4KXtcbiAgICB2YXIgTyAgICAgID0gdG9JT2JqZWN0KCR0aGlzKVxuICAgICAgLCBsZW5ndGggPSB0b0xlbmd0aChPLmxlbmd0aClcbiAgICAgICwgaW5kZXggID0gdG9JbmRleChmcm9tSW5kZXgsIGxlbmd0aClcbiAgICAgICwgdmFsdWU7XG4gICAgLy8gQXJyYXkjaW5jbHVkZXMgdXNlcyBTYW1lVmFsdWVaZXJvIGVxdWFsaXR5IGFsZ29yaXRobVxuICAgIGlmKElTX0lOQ0xVREVTICYmIGVsICE9IGVsKXdoaWxlKGxlbmd0aCA+IGluZGV4KXtcbiAgICAgIHZhbHVlID0gT1tpbmRleCsrXTtcbiAgICAgIGlmKHZhbHVlICE9IHZhbHVlKXJldHVybiB0cnVlO1xuICAgIC8vIEFycmF5I3RvSW5kZXggaWdub3JlcyBob2xlcywgQXJyYXkjaW5jbHVkZXMgLSBub3RcbiAgICB9IGVsc2UgZm9yKDtsZW5ndGggPiBpbmRleDsgaW5kZXgrKylpZihJU19JTkNMVURFUyB8fCBpbmRleCBpbiBPKXtcbiAgICAgIGlmKE9baW5kZXhdID09PSBlbClyZXR1cm4gSVNfSU5DTFVERVMgfHwgaW5kZXggfHwgMDtcbiAgICB9IHJldHVybiAhSVNfSU5DTFVERVMgJiYgLTE7XG4gIH07XG59OyIsIi8vIGdldHRpbmcgdGFnIGZyb20gMTkuMS4zLjYgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZygpXG52YXIgY29mID0gcmVxdWlyZSgnLi9fY29mJylcbiAgLCBUQUcgPSByZXF1aXJlKCcuL193a3MnKSgndG9TdHJpbmdUYWcnKVxuICAvLyBFUzMgd3JvbmcgaGVyZVxuICAsIEFSRyA9IGNvZihmdW5jdGlvbigpeyByZXR1cm4gYXJndW1lbnRzOyB9KCkpID09ICdBcmd1bWVudHMnO1xuXG4vLyBmYWxsYmFjayBmb3IgSUUxMSBTY3JpcHQgQWNjZXNzIERlbmllZCBlcnJvclxudmFyIHRyeUdldCA9IGZ1bmN0aW9uKGl0LCBrZXkpe1xuICB0cnkge1xuICAgIHJldHVybiBpdFtrZXldO1xuICB9IGNhdGNoKGUpeyAvKiBlbXB0eSAqLyB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgdmFyIE8sIFQsIEI7XG4gIHJldHVybiBpdCA9PT0gdW5kZWZpbmVkID8gJ1VuZGVmaW5lZCcgOiBpdCA9PT0gbnVsbCA/ICdOdWxsJ1xuICAgIC8vIEBAdG9TdHJpbmdUYWcgY2FzZVxuICAgIDogdHlwZW9mIChUID0gdHJ5R2V0KE8gPSBPYmplY3QoaXQpLCBUQUcpKSA9PSAnc3RyaW5nJyA/IFRcbiAgICAvLyBidWlsdGluVGFnIGNhc2VcbiAgICA6IEFSRyA/IGNvZihPKVxuICAgIC8vIEVTMyBhcmd1bWVudHMgZmFsbGJhY2tcbiAgICA6IChCID0gY29mKE8pKSA9PSAnT2JqZWN0JyAmJiB0eXBlb2YgTy5jYWxsZWUgPT0gJ2Z1bmN0aW9uJyA/ICdBcmd1bWVudHMnIDogQjtcbn07IiwidmFyIHRvU3RyaW5nID0ge30udG9TdHJpbmc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbChpdCkuc2xpY2UoOCwgLTEpO1xufTsiLCJ2YXIgY29yZSA9IG1vZHVsZS5leHBvcnRzID0ge3ZlcnNpb246ICcyLjQuMCd9O1xuaWYodHlwZW9mIF9fZSA9PSAnbnVtYmVyJylfX2UgPSBjb3JlOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmIiwiJ3VzZSBzdHJpY3QnO1xudmFyICRkZWZpbmVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpXG4gICwgY3JlYXRlRGVzYyAgICAgID0gcmVxdWlyZSgnLi9fcHJvcGVydHktZGVzYycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG9iamVjdCwgaW5kZXgsIHZhbHVlKXtcbiAgaWYoaW5kZXggaW4gb2JqZWN0KSRkZWZpbmVQcm9wZXJ0eS5mKG9iamVjdCwgaW5kZXgsIGNyZWF0ZURlc2MoMCwgdmFsdWUpKTtcbiAgZWxzZSBvYmplY3RbaW5kZXhdID0gdmFsdWU7XG59OyIsIi8vIG9wdGlvbmFsIC8gc2ltcGxlIGNvbnRleHQgYmluZGluZ1xudmFyIGFGdW5jdGlvbiA9IHJlcXVpcmUoJy4vX2EtZnVuY3Rpb24nKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZm4sIHRoYXQsIGxlbmd0aCl7XG4gIGFGdW5jdGlvbihmbik7XG4gIGlmKHRoYXQgPT09IHVuZGVmaW5lZClyZXR1cm4gZm47XG4gIHN3aXRjaChsZW5ndGgpe1xuICAgIGNhc2UgMTogcmV0dXJuIGZ1bmN0aW9uKGEpe1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSk7XG4gICAgfTtcbiAgICBjYXNlIDI6IHJldHVybiBmdW5jdGlvbihhLCBiKXtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEsIGIpO1xuICAgIH07XG4gICAgY2FzZSAzOiByZXR1cm4gZnVuY3Rpb24oYSwgYiwgYyl7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhLCBiLCBjKTtcbiAgICB9O1xuICB9XG4gIHJldHVybiBmdW5jdGlvbigvKiAuLi5hcmdzICovKXtcbiAgICByZXR1cm4gZm4uYXBwbHkodGhhdCwgYXJndW1lbnRzKTtcbiAgfTtcbn07IiwiLy8gNy4yLjEgUmVxdWlyZU9iamVjdENvZXJjaWJsZShhcmd1bWVudClcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICBpZihpdCA9PSB1bmRlZmluZWQpdGhyb3cgVHlwZUVycm9yKFwiQ2FuJ3QgY2FsbCBtZXRob2Qgb24gIFwiICsgaXQpO1xuICByZXR1cm4gaXQ7XG59OyIsIi8vIFRoYW5rJ3MgSUU4IGZvciBoaXMgZnVubnkgZGVmaW5lUHJvcGVydHlcbm1vZHVsZS5leHBvcnRzID0gIXJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24oKXtcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh7fSwgJ2EnLCB7Z2V0OiBmdW5jdGlvbigpeyByZXR1cm4gNzsgfX0pLmEgIT0gNztcbn0pOyIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpXG4gICwgZG9jdW1lbnQgPSByZXF1aXJlKCcuL19nbG9iYWwnKS5kb2N1bWVudFxuICAvLyBpbiBvbGQgSUUgdHlwZW9mIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgaXMgJ29iamVjdCdcbiAgLCBpcyA9IGlzT2JqZWN0KGRvY3VtZW50KSAmJiBpc09iamVjdChkb2N1bWVudC5jcmVhdGVFbGVtZW50KTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gaXMgPyBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGl0KSA6IHt9O1xufTsiLCIvLyBJRSA4LSBkb24ndCBlbnVtIGJ1ZyBrZXlzXG5tb2R1bGUuZXhwb3J0cyA9IChcbiAgJ2NvbnN0cnVjdG9yLGhhc093blByb3BlcnR5LGlzUHJvdG90eXBlT2YscHJvcGVydHlJc0VudW1lcmFibGUsdG9Mb2NhbGVTdHJpbmcsdG9TdHJpbmcsdmFsdWVPZidcbikuc3BsaXQoJywnKTsiLCIvLyBhbGwgZW51bWVyYWJsZSBvYmplY3Qga2V5cywgaW5jbHVkZXMgc3ltYm9sc1xudmFyIGdldEtleXMgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cycpXG4gICwgZ09QUyAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1nb3BzJylcbiAgLCBwSUUgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LXBpZScpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHZhciByZXN1bHQgICAgID0gZ2V0S2V5cyhpdClcbiAgICAsIGdldFN5bWJvbHMgPSBnT1BTLmY7XG4gIGlmKGdldFN5bWJvbHMpe1xuICAgIHZhciBzeW1ib2xzID0gZ2V0U3ltYm9scyhpdClcbiAgICAgICwgaXNFbnVtICA9IHBJRS5mXG4gICAgICAsIGkgICAgICAgPSAwXG4gICAgICAsIGtleTtcbiAgICB3aGlsZShzeW1ib2xzLmxlbmd0aCA+IGkpaWYoaXNFbnVtLmNhbGwoaXQsIGtleSA9IHN5bWJvbHNbaSsrXSkpcmVzdWx0LnB1c2goa2V5KTtcbiAgfSByZXR1cm4gcmVzdWx0O1xufTsiLCJ2YXIgZ2xvYmFsICAgID0gcmVxdWlyZSgnLi9fZ2xvYmFsJylcbiAgLCBjb3JlICAgICAgPSByZXF1aXJlKCcuL19jb3JlJylcbiAgLCBjdHggICAgICAgPSByZXF1aXJlKCcuL19jdHgnKVxuICAsIGhpZGUgICAgICA9IHJlcXVpcmUoJy4vX2hpZGUnKVxuICAsIFBST1RPVFlQRSA9ICdwcm90b3R5cGUnO1xuXG52YXIgJGV4cG9ydCA9IGZ1bmN0aW9uKHR5cGUsIG5hbWUsIHNvdXJjZSl7XG4gIHZhciBJU19GT1JDRUQgPSB0eXBlICYgJGV4cG9ydC5GXG4gICAgLCBJU19HTE9CQUwgPSB0eXBlICYgJGV4cG9ydC5HXG4gICAgLCBJU19TVEFUSUMgPSB0eXBlICYgJGV4cG9ydC5TXG4gICAgLCBJU19QUk9UTyAgPSB0eXBlICYgJGV4cG9ydC5QXG4gICAgLCBJU19CSU5EICAgPSB0eXBlICYgJGV4cG9ydC5CXG4gICAgLCBJU19XUkFQICAgPSB0eXBlICYgJGV4cG9ydC5XXG4gICAgLCBleHBvcnRzICAgPSBJU19HTE9CQUwgPyBjb3JlIDogY29yZVtuYW1lXSB8fCAoY29yZVtuYW1lXSA9IHt9KVxuICAgICwgZXhwUHJvdG8gID0gZXhwb3J0c1tQUk9UT1RZUEVdXG4gICAgLCB0YXJnZXQgICAgPSBJU19HTE9CQUwgPyBnbG9iYWwgOiBJU19TVEFUSUMgPyBnbG9iYWxbbmFtZV0gOiAoZ2xvYmFsW25hbWVdIHx8IHt9KVtQUk9UT1RZUEVdXG4gICAgLCBrZXksIG93biwgb3V0O1xuICBpZihJU19HTE9CQUwpc291cmNlID0gbmFtZTtcbiAgZm9yKGtleSBpbiBzb3VyY2Upe1xuICAgIC8vIGNvbnRhaW5zIGluIG5hdGl2ZVxuICAgIG93biA9ICFJU19GT1JDRUQgJiYgdGFyZ2V0ICYmIHRhcmdldFtrZXldICE9PSB1bmRlZmluZWQ7XG4gICAgaWYob3duICYmIGtleSBpbiBleHBvcnRzKWNvbnRpbnVlO1xuICAgIC8vIGV4cG9ydCBuYXRpdmUgb3IgcGFzc2VkXG4gICAgb3V0ID0gb3duID8gdGFyZ2V0W2tleV0gOiBzb3VyY2Vba2V5XTtcbiAgICAvLyBwcmV2ZW50IGdsb2JhbCBwb2xsdXRpb24gZm9yIG5hbWVzcGFjZXNcbiAgICBleHBvcnRzW2tleV0gPSBJU19HTE9CQUwgJiYgdHlwZW9mIHRhcmdldFtrZXldICE9ICdmdW5jdGlvbicgPyBzb3VyY2Vba2V5XVxuICAgIC8vIGJpbmQgdGltZXJzIHRvIGdsb2JhbCBmb3IgY2FsbCBmcm9tIGV4cG9ydCBjb250ZXh0XG4gICAgOiBJU19CSU5EICYmIG93biA/IGN0eChvdXQsIGdsb2JhbClcbiAgICAvLyB3cmFwIGdsb2JhbCBjb25zdHJ1Y3RvcnMgZm9yIHByZXZlbnQgY2hhbmdlIHRoZW0gaW4gbGlicmFyeVxuICAgIDogSVNfV1JBUCAmJiB0YXJnZXRba2V5XSA9PSBvdXQgPyAoZnVuY3Rpb24oQyl7XG4gICAgICB2YXIgRiA9IGZ1bmN0aW9uKGEsIGIsIGMpe1xuICAgICAgICBpZih0aGlzIGluc3RhbmNlb2YgQyl7XG4gICAgICAgICAgc3dpdGNoKGFyZ3VtZW50cy5sZW5ndGgpe1xuICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4gbmV3IEM7XG4gICAgICAgICAgICBjYXNlIDE6IHJldHVybiBuZXcgQyhhKTtcbiAgICAgICAgICAgIGNhc2UgMjogcmV0dXJuIG5ldyBDKGEsIGIpO1xuICAgICAgICAgIH0gcmV0dXJuIG5ldyBDKGEsIGIsIGMpO1xuICAgICAgICB9IHJldHVybiBDLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9O1xuICAgICAgRltQUk9UT1RZUEVdID0gQ1tQUk9UT1RZUEVdO1xuICAgICAgcmV0dXJuIEY7XG4gICAgLy8gbWFrZSBzdGF0aWMgdmVyc2lvbnMgZm9yIHByb3RvdHlwZSBtZXRob2RzXG4gICAgfSkob3V0KSA6IElTX1BST1RPICYmIHR5cGVvZiBvdXQgPT0gJ2Z1bmN0aW9uJyA/IGN0eChGdW5jdGlvbi5jYWxsLCBvdXQpIDogb3V0O1xuICAgIC8vIGV4cG9ydCBwcm90byBtZXRob2RzIHRvIGNvcmUuJUNPTlNUUlVDVE9SJS5tZXRob2RzLiVOQU1FJVxuICAgIGlmKElTX1BST1RPKXtcbiAgICAgIChleHBvcnRzLnZpcnR1YWwgfHwgKGV4cG9ydHMudmlydHVhbCA9IHt9KSlba2V5XSA9IG91dDtcbiAgICAgIC8vIGV4cG9ydCBwcm90byBtZXRob2RzIHRvIGNvcmUuJUNPTlNUUlVDVE9SJS5wcm90b3R5cGUuJU5BTUUlXG4gICAgICBpZih0eXBlICYgJGV4cG9ydC5SICYmIGV4cFByb3RvICYmICFleHBQcm90b1trZXldKWhpZGUoZXhwUHJvdG8sIGtleSwgb3V0KTtcbiAgICB9XG4gIH1cbn07XG4vLyB0eXBlIGJpdG1hcFxuJGV4cG9ydC5GID0gMTsgICAvLyBmb3JjZWRcbiRleHBvcnQuRyA9IDI7ICAgLy8gZ2xvYmFsXG4kZXhwb3J0LlMgPSA0OyAgIC8vIHN0YXRpY1xuJGV4cG9ydC5QID0gODsgICAvLyBwcm90b1xuJGV4cG9ydC5CID0gMTY7ICAvLyBiaW5kXG4kZXhwb3J0LlcgPSAzMjsgIC8vIHdyYXBcbiRleHBvcnQuVSA9IDY0OyAgLy8gc2FmZVxuJGV4cG9ydC5SID0gMTI4OyAvLyByZWFsIHByb3RvIG1ldGhvZCBmb3IgYGxpYnJhcnlgIFxubW9kdWxlLmV4cG9ydHMgPSAkZXhwb3J0OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZXhlYyl7XG4gIHRyeSB7XG4gICAgcmV0dXJuICEhZXhlYygpO1xuICB9IGNhdGNoKGUpe1xuICAgIHJldHVybiB0cnVlO1xuICB9XG59OyIsIi8vIGh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2lzc3Vlcy84NiNpc3N1ZWNvbW1lbnQtMTE1NzU5MDI4XG52YXIgZ2xvYmFsID0gbW9kdWxlLmV4cG9ydHMgPSB0eXBlb2Ygd2luZG93ICE9ICd1bmRlZmluZWQnICYmIHdpbmRvdy5NYXRoID09IE1hdGhcbiAgPyB3aW5kb3cgOiB0eXBlb2Ygc2VsZiAhPSAndW5kZWZpbmVkJyAmJiBzZWxmLk1hdGggPT0gTWF0aCA/IHNlbGYgOiBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuaWYodHlwZW9mIF9fZyA9PSAnbnVtYmVyJylfX2cgPSBnbG9iYWw7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWYiLCJ2YXIgaGFzT3duUHJvcGVydHkgPSB7fS5oYXNPd25Qcm9wZXJ0eTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQsIGtleSl7XG4gIHJldHVybiBoYXNPd25Qcm9wZXJ0eS5jYWxsKGl0LCBrZXkpO1xufTsiLCJ2YXIgZFAgICAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpXG4gICwgY3JlYXRlRGVzYyA9IHJlcXVpcmUoJy4vX3Byb3BlcnR5LWRlc2MnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSA/IGZ1bmN0aW9uKG9iamVjdCwga2V5LCB2YWx1ZSl7XG4gIHJldHVybiBkUC5mKG9iamVjdCwga2V5LCBjcmVhdGVEZXNjKDEsIHZhbHVlKSk7XG59IDogZnVuY3Rpb24ob2JqZWN0LCBrZXksIHZhbHVlKXtcbiAgb2JqZWN0W2tleV0gPSB2YWx1ZTtcbiAgcmV0dXJuIG9iamVjdDtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19nbG9iYWwnKS5kb2N1bWVudCAmJiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7IiwibW9kdWxlLmV4cG9ydHMgPSAhcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSAmJiAhcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbigpe1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KHJlcXVpcmUoJy4vX2RvbS1jcmVhdGUnKSgnZGl2JyksICdhJywge2dldDogZnVuY3Rpb24oKXsgcmV0dXJuIDc7IH19KS5hICE9IDc7XG59KTsiLCIvLyBmYWxsYmFjayBmb3Igbm9uLWFycmF5LWxpa2UgRVMzIGFuZCBub24tZW51bWVyYWJsZSBvbGQgVjggc3RyaW5nc1xudmFyIGNvZiA9IHJlcXVpcmUoJy4vX2NvZicpO1xubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QoJ3onKS5wcm9wZXJ0eUlzRW51bWVyYWJsZSgwKSA/IE9iamVjdCA6IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIGNvZihpdCkgPT0gJ1N0cmluZycgPyBpdC5zcGxpdCgnJykgOiBPYmplY3QoaXQpO1xufTsiLCIvLyBjaGVjayBvbiBkZWZhdWx0IEFycmF5IGl0ZXJhdG9yXG52YXIgSXRlcmF0b3JzICA9IHJlcXVpcmUoJy4vX2l0ZXJhdG9ycycpXG4gICwgSVRFUkFUT1IgICA9IHJlcXVpcmUoJy4vX3drcycpKCdpdGVyYXRvcicpXG4gICwgQXJyYXlQcm90byA9IEFycmF5LnByb3RvdHlwZTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBpdCAhPT0gdW5kZWZpbmVkICYmIChJdGVyYXRvcnMuQXJyYXkgPT09IGl0IHx8IEFycmF5UHJvdG9bSVRFUkFUT1JdID09PSBpdCk7XG59OyIsIi8vIDcuMi4yIElzQXJyYXkoYXJndW1lbnQpXG52YXIgY29mID0gcmVxdWlyZSgnLi9fY29mJyk7XG5tb2R1bGUuZXhwb3J0cyA9IEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24gaXNBcnJheShhcmcpe1xuICByZXR1cm4gY29mKGFyZykgPT0gJ0FycmF5Jztcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiB0eXBlb2YgaXQgPT09ICdvYmplY3QnID8gaXQgIT09IG51bGwgOiB0eXBlb2YgaXQgPT09ICdmdW5jdGlvbic7XG59OyIsIi8vIGNhbGwgc29tZXRoaW5nIG9uIGl0ZXJhdG9yIHN0ZXAgd2l0aCBzYWZlIGNsb3Npbmcgb24gZXJyb3JcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdGVyYXRvciwgZm4sIHZhbHVlLCBlbnRyaWVzKXtcbiAgdHJ5IHtcbiAgICByZXR1cm4gZW50cmllcyA/IGZuKGFuT2JqZWN0KHZhbHVlKVswXSwgdmFsdWVbMV0pIDogZm4odmFsdWUpO1xuICAvLyA3LjQuNiBJdGVyYXRvckNsb3NlKGl0ZXJhdG9yLCBjb21wbGV0aW9uKVxuICB9IGNhdGNoKGUpe1xuICAgIHZhciByZXQgPSBpdGVyYXRvclsncmV0dXJuJ107XG4gICAgaWYocmV0ICE9PSB1bmRlZmluZWQpYW5PYmplY3QocmV0LmNhbGwoaXRlcmF0b3IpKTtcbiAgICB0aHJvdyBlO1xuICB9XG59OyIsIid1c2Ugc3RyaWN0JztcbnZhciBjcmVhdGUgICAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1jcmVhdGUnKVxuICAsIGRlc2NyaXB0b3IgICAgID0gcmVxdWlyZSgnLi9fcHJvcGVydHktZGVzYycpXG4gICwgc2V0VG9TdHJpbmdUYWcgPSByZXF1aXJlKCcuL19zZXQtdG8tc3RyaW5nLXRhZycpXG4gICwgSXRlcmF0b3JQcm90b3R5cGUgPSB7fTtcblxuLy8gMjUuMS4yLjEuMSAlSXRlcmF0b3JQcm90b3R5cGUlW0BAaXRlcmF0b3JdKClcbnJlcXVpcmUoJy4vX2hpZGUnKShJdGVyYXRvclByb3RvdHlwZSwgcmVxdWlyZSgnLi9fd2tzJykoJ2l0ZXJhdG9yJyksIGZ1bmN0aW9uKCl7IHJldHVybiB0aGlzOyB9KTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihDb25zdHJ1Y3RvciwgTkFNRSwgbmV4dCl7XG4gIENvbnN0cnVjdG9yLnByb3RvdHlwZSA9IGNyZWF0ZShJdGVyYXRvclByb3RvdHlwZSwge25leHQ6IGRlc2NyaXB0b3IoMSwgbmV4dCl9KTtcbiAgc2V0VG9TdHJpbmdUYWcoQ29uc3RydWN0b3IsIE5BTUUgKyAnIEl0ZXJhdG9yJyk7XG59OyIsIid1c2Ugc3RyaWN0JztcbnZhciBMSUJSQVJZICAgICAgICA9IHJlcXVpcmUoJy4vX2xpYnJhcnknKVxuICAsICRleHBvcnQgICAgICAgID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgLCByZWRlZmluZSAgICAgICA9IHJlcXVpcmUoJy4vX3JlZGVmaW5lJylcbiAgLCBoaWRlICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2hpZGUnKVxuICAsIGhhcyAgICAgICAgICAgID0gcmVxdWlyZSgnLi9faGFzJylcbiAgLCBJdGVyYXRvcnMgICAgICA9IHJlcXVpcmUoJy4vX2l0ZXJhdG9ycycpXG4gICwgJGl0ZXJDcmVhdGUgICAgPSByZXF1aXJlKCcuL19pdGVyLWNyZWF0ZScpXG4gICwgc2V0VG9TdHJpbmdUYWcgPSByZXF1aXJlKCcuL19zZXQtdG8tc3RyaW5nLXRhZycpXG4gICwgZ2V0UHJvdG90eXBlT2YgPSByZXF1aXJlKCcuL19vYmplY3QtZ3BvJylcbiAgLCBJVEVSQVRPUiAgICAgICA9IHJlcXVpcmUoJy4vX3drcycpKCdpdGVyYXRvcicpXG4gICwgQlVHR1kgICAgICAgICAgPSAhKFtdLmtleXMgJiYgJ25leHQnIGluIFtdLmtleXMoKSkgLy8gU2FmYXJpIGhhcyBidWdneSBpdGVyYXRvcnMgdy9vIGBuZXh0YFxuICAsIEZGX0lURVJBVE9SICAgID0gJ0BAaXRlcmF0b3InXG4gICwgS0VZUyAgICAgICAgICAgPSAna2V5cydcbiAgLCBWQUxVRVMgICAgICAgICA9ICd2YWx1ZXMnO1xuXG52YXIgcmV0dXJuVGhpcyA9IGZ1bmN0aW9uKCl7IHJldHVybiB0aGlzOyB9O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKEJhc2UsIE5BTUUsIENvbnN0cnVjdG9yLCBuZXh0LCBERUZBVUxULCBJU19TRVQsIEZPUkNFRCl7XG4gICRpdGVyQ3JlYXRlKENvbnN0cnVjdG9yLCBOQU1FLCBuZXh0KTtcbiAgdmFyIGdldE1ldGhvZCA9IGZ1bmN0aW9uKGtpbmQpe1xuICAgIGlmKCFCVUdHWSAmJiBraW5kIGluIHByb3RvKXJldHVybiBwcm90b1traW5kXTtcbiAgICBzd2l0Y2goa2luZCl7XG4gICAgICBjYXNlIEtFWVM6IHJldHVybiBmdW5jdGlvbiBrZXlzKCl7IHJldHVybiBuZXcgQ29uc3RydWN0b3IodGhpcywga2luZCk7IH07XG4gICAgICBjYXNlIFZBTFVFUzogcmV0dXJuIGZ1bmN0aW9uIHZhbHVlcygpeyByZXR1cm4gbmV3IENvbnN0cnVjdG9yKHRoaXMsIGtpbmQpOyB9O1xuICAgIH0gcmV0dXJuIGZ1bmN0aW9uIGVudHJpZXMoKXsgcmV0dXJuIG5ldyBDb25zdHJ1Y3Rvcih0aGlzLCBraW5kKTsgfTtcbiAgfTtcbiAgdmFyIFRBRyAgICAgICAgPSBOQU1FICsgJyBJdGVyYXRvcidcbiAgICAsIERFRl9WQUxVRVMgPSBERUZBVUxUID09IFZBTFVFU1xuICAgICwgVkFMVUVTX0JVRyA9IGZhbHNlXG4gICAgLCBwcm90byAgICAgID0gQmFzZS5wcm90b3R5cGVcbiAgICAsICRuYXRpdmUgICAgPSBwcm90b1tJVEVSQVRPUl0gfHwgcHJvdG9bRkZfSVRFUkFUT1JdIHx8IERFRkFVTFQgJiYgcHJvdG9bREVGQVVMVF1cbiAgICAsICRkZWZhdWx0ICAgPSAkbmF0aXZlIHx8IGdldE1ldGhvZChERUZBVUxUKVxuICAgICwgJGVudHJpZXMgICA9IERFRkFVTFQgPyAhREVGX1ZBTFVFUyA/ICRkZWZhdWx0IDogZ2V0TWV0aG9kKCdlbnRyaWVzJykgOiB1bmRlZmluZWRcbiAgICAsICRhbnlOYXRpdmUgPSBOQU1FID09ICdBcnJheScgPyBwcm90by5lbnRyaWVzIHx8ICRuYXRpdmUgOiAkbmF0aXZlXG4gICAgLCBtZXRob2RzLCBrZXksIEl0ZXJhdG9yUHJvdG90eXBlO1xuICAvLyBGaXggbmF0aXZlXG4gIGlmKCRhbnlOYXRpdmUpe1xuICAgIEl0ZXJhdG9yUHJvdG90eXBlID0gZ2V0UHJvdG90eXBlT2YoJGFueU5hdGl2ZS5jYWxsKG5ldyBCYXNlKSk7XG4gICAgaWYoSXRlcmF0b3JQcm90b3R5cGUgIT09IE9iamVjdC5wcm90b3R5cGUpe1xuICAgICAgLy8gU2V0IEBAdG9TdHJpbmdUYWcgdG8gbmF0aXZlIGl0ZXJhdG9yc1xuICAgICAgc2V0VG9TdHJpbmdUYWcoSXRlcmF0b3JQcm90b3R5cGUsIFRBRywgdHJ1ZSk7XG4gICAgICAvLyBmaXggZm9yIHNvbWUgb2xkIGVuZ2luZXNcbiAgICAgIGlmKCFMSUJSQVJZICYmICFoYXMoSXRlcmF0b3JQcm90b3R5cGUsIElURVJBVE9SKSloaWRlKEl0ZXJhdG9yUHJvdG90eXBlLCBJVEVSQVRPUiwgcmV0dXJuVGhpcyk7XG4gICAgfVxuICB9XG4gIC8vIGZpeCBBcnJheSN7dmFsdWVzLCBAQGl0ZXJhdG9yfS5uYW1lIGluIFY4IC8gRkZcbiAgaWYoREVGX1ZBTFVFUyAmJiAkbmF0aXZlICYmICRuYXRpdmUubmFtZSAhPT0gVkFMVUVTKXtcbiAgICBWQUxVRVNfQlVHID0gdHJ1ZTtcbiAgICAkZGVmYXVsdCA9IGZ1bmN0aW9uIHZhbHVlcygpeyByZXR1cm4gJG5hdGl2ZS5jYWxsKHRoaXMpOyB9O1xuICB9XG4gIC8vIERlZmluZSBpdGVyYXRvclxuICBpZigoIUxJQlJBUlkgfHwgRk9SQ0VEKSAmJiAoQlVHR1kgfHwgVkFMVUVTX0JVRyB8fCAhcHJvdG9bSVRFUkFUT1JdKSl7XG4gICAgaGlkZShwcm90bywgSVRFUkFUT1IsICRkZWZhdWx0KTtcbiAgfVxuICAvLyBQbHVnIGZvciBsaWJyYXJ5XG4gIEl0ZXJhdG9yc1tOQU1FXSA9ICRkZWZhdWx0O1xuICBJdGVyYXRvcnNbVEFHXSAgPSByZXR1cm5UaGlzO1xuICBpZihERUZBVUxUKXtcbiAgICBtZXRob2RzID0ge1xuICAgICAgdmFsdWVzOiAgREVGX1ZBTFVFUyA/ICRkZWZhdWx0IDogZ2V0TWV0aG9kKFZBTFVFUyksXG4gICAgICBrZXlzOiAgICBJU19TRVQgICAgID8gJGRlZmF1bHQgOiBnZXRNZXRob2QoS0VZUyksXG4gICAgICBlbnRyaWVzOiAkZW50cmllc1xuICAgIH07XG4gICAgaWYoRk9SQ0VEKWZvcihrZXkgaW4gbWV0aG9kcyl7XG4gICAgICBpZighKGtleSBpbiBwcm90bykpcmVkZWZpbmUocHJvdG8sIGtleSwgbWV0aG9kc1trZXldKTtcbiAgICB9IGVsc2UgJGV4cG9ydCgkZXhwb3J0LlAgKyAkZXhwb3J0LkYgKiAoQlVHR1kgfHwgVkFMVUVTX0JVRyksIE5BTUUsIG1ldGhvZHMpO1xuICB9XG4gIHJldHVybiBtZXRob2RzO1xufTsiLCJ2YXIgSVRFUkFUT1IgICAgID0gcmVxdWlyZSgnLi9fd2tzJykoJ2l0ZXJhdG9yJylcbiAgLCBTQUZFX0NMT1NJTkcgPSBmYWxzZTtcblxudHJ5IHtcbiAgdmFyIHJpdGVyID0gWzddW0lURVJBVE9SXSgpO1xuICByaXRlclsncmV0dXJuJ10gPSBmdW5jdGlvbigpeyBTQUZFX0NMT1NJTkcgPSB0cnVlOyB9O1xuICBBcnJheS5mcm9tKHJpdGVyLCBmdW5jdGlvbigpeyB0aHJvdyAyOyB9KTtcbn0gY2F0Y2goZSl7IC8qIGVtcHR5ICovIH1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihleGVjLCBza2lwQ2xvc2luZyl7XG4gIGlmKCFza2lwQ2xvc2luZyAmJiAhU0FGRV9DTE9TSU5HKXJldHVybiBmYWxzZTtcbiAgdmFyIHNhZmUgPSBmYWxzZTtcbiAgdHJ5IHtcbiAgICB2YXIgYXJyICA9IFs3XVxuICAgICAgLCBpdGVyID0gYXJyW0lURVJBVE9SXSgpO1xuICAgIGl0ZXIubmV4dCA9IGZ1bmN0aW9uKCl7IHJldHVybiB7ZG9uZTogc2FmZSA9IHRydWV9OyB9O1xuICAgIGFycltJVEVSQVRPUl0gPSBmdW5jdGlvbigpeyByZXR1cm4gaXRlcjsgfTtcbiAgICBleGVjKGFycik7XG4gIH0gY2F0Y2goZSl7IC8qIGVtcHR5ICovIH1cbiAgcmV0dXJuIHNhZmU7XG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZG9uZSwgdmFsdWUpe1xuICByZXR1cm4ge3ZhbHVlOiB2YWx1ZSwgZG9uZTogISFkb25lfTtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSB7fTsiLCJ2YXIgZ2V0S2V5cyAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMnKVxuICAsIHRvSU9iamVjdCA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ob2JqZWN0LCBlbCl7XG4gIHZhciBPICAgICAgPSB0b0lPYmplY3Qob2JqZWN0KVxuICAgICwga2V5cyAgID0gZ2V0S2V5cyhPKVxuICAgICwgbGVuZ3RoID0ga2V5cy5sZW5ndGhcbiAgICAsIGluZGV4ICA9IDBcbiAgICAsIGtleTtcbiAgd2hpbGUobGVuZ3RoID4gaW5kZXgpaWYoT1trZXkgPSBrZXlzW2luZGV4KytdXSA9PT0gZWwpcmV0dXJuIGtleTtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSB0cnVlOyIsInZhciBNRVRBICAgICA9IHJlcXVpcmUoJy4vX3VpZCcpKCdtZXRhJylcbiAgLCBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpXG4gICwgaGFzICAgICAgPSByZXF1aXJlKCcuL19oYXMnKVxuICAsIHNldERlc2MgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJykuZlxuICAsIGlkICAgICAgID0gMDtcbnZhciBpc0V4dGVuc2libGUgPSBPYmplY3QuaXNFeHRlbnNpYmxlIHx8IGZ1bmN0aW9uKCl7XG4gIHJldHVybiB0cnVlO1xufTtcbnZhciBGUkVFWkUgPSAhcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbigpe1xuICByZXR1cm4gaXNFeHRlbnNpYmxlKE9iamVjdC5wcmV2ZW50RXh0ZW5zaW9ucyh7fSkpO1xufSk7XG52YXIgc2V0TWV0YSA9IGZ1bmN0aW9uKGl0KXtcbiAgc2V0RGVzYyhpdCwgTUVUQSwge3ZhbHVlOiB7XG4gICAgaTogJ08nICsgKytpZCwgLy8gb2JqZWN0IElEXG4gICAgdzoge30gICAgICAgICAgLy8gd2VhayBjb2xsZWN0aW9ucyBJRHNcbiAgfX0pO1xufTtcbnZhciBmYXN0S2V5ID0gZnVuY3Rpb24oaXQsIGNyZWF0ZSl7XG4gIC8vIHJldHVybiBwcmltaXRpdmUgd2l0aCBwcmVmaXhcbiAgaWYoIWlzT2JqZWN0KGl0KSlyZXR1cm4gdHlwZW9mIGl0ID09ICdzeW1ib2wnID8gaXQgOiAodHlwZW9mIGl0ID09ICdzdHJpbmcnID8gJ1MnIDogJ1AnKSArIGl0O1xuICBpZighaGFzKGl0LCBNRVRBKSl7XG4gICAgLy8gY2FuJ3Qgc2V0IG1ldGFkYXRhIHRvIHVuY2F1Z2h0IGZyb3plbiBvYmplY3RcbiAgICBpZighaXNFeHRlbnNpYmxlKGl0KSlyZXR1cm4gJ0YnO1xuICAgIC8vIG5vdCBuZWNlc3NhcnkgdG8gYWRkIG1ldGFkYXRhXG4gICAgaWYoIWNyZWF0ZSlyZXR1cm4gJ0UnO1xuICAgIC8vIGFkZCBtaXNzaW5nIG1ldGFkYXRhXG4gICAgc2V0TWV0YShpdCk7XG4gIC8vIHJldHVybiBvYmplY3QgSURcbiAgfSByZXR1cm4gaXRbTUVUQV0uaTtcbn07XG52YXIgZ2V0V2VhayA9IGZ1bmN0aW9uKGl0LCBjcmVhdGUpe1xuICBpZighaGFzKGl0LCBNRVRBKSl7XG4gICAgLy8gY2FuJ3Qgc2V0IG1ldGFkYXRhIHRvIHVuY2F1Z2h0IGZyb3plbiBvYmplY3RcbiAgICBpZighaXNFeHRlbnNpYmxlKGl0KSlyZXR1cm4gdHJ1ZTtcbiAgICAvLyBub3QgbmVjZXNzYXJ5IHRvIGFkZCBtZXRhZGF0YVxuICAgIGlmKCFjcmVhdGUpcmV0dXJuIGZhbHNlO1xuICAgIC8vIGFkZCBtaXNzaW5nIG1ldGFkYXRhXG4gICAgc2V0TWV0YShpdCk7XG4gIC8vIHJldHVybiBoYXNoIHdlYWsgY29sbGVjdGlvbnMgSURzXG4gIH0gcmV0dXJuIGl0W01FVEFdLnc7XG59O1xuLy8gYWRkIG1ldGFkYXRhIG9uIGZyZWV6ZS1mYW1pbHkgbWV0aG9kcyBjYWxsaW5nXG52YXIgb25GcmVlemUgPSBmdW5jdGlvbihpdCl7XG4gIGlmKEZSRUVaRSAmJiBtZXRhLk5FRUQgJiYgaXNFeHRlbnNpYmxlKGl0KSAmJiAhaGFzKGl0LCBNRVRBKSlzZXRNZXRhKGl0KTtcbiAgcmV0dXJuIGl0O1xufTtcbnZhciBtZXRhID0gbW9kdWxlLmV4cG9ydHMgPSB7XG4gIEtFWTogICAgICBNRVRBLFxuICBORUVEOiAgICAgZmFsc2UsXG4gIGZhc3RLZXk6ICBmYXN0S2V5LFxuICBnZXRXZWFrOiAgZ2V0V2VhayxcbiAgb25GcmVlemU6IG9uRnJlZXplXG59OyIsIid1c2Ugc3RyaWN0Jztcbi8vIDE5LjEuMi4xIE9iamVjdC5hc3NpZ24odGFyZ2V0LCBzb3VyY2UsIC4uLilcbnZhciBnZXRLZXlzICA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzJylcbiAgLCBnT1BTICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1nb3BzJylcbiAgLCBwSUUgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1waWUnKVxuICAsIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8tb2JqZWN0JylcbiAgLCBJT2JqZWN0ICA9IHJlcXVpcmUoJy4vX2lvYmplY3QnKVxuICAsICRhc3NpZ24gID0gT2JqZWN0LmFzc2lnbjtcblxuLy8gc2hvdWxkIHdvcmsgd2l0aCBzeW1ib2xzIGFuZCBzaG91bGQgaGF2ZSBkZXRlcm1pbmlzdGljIHByb3BlcnR5IG9yZGVyIChWOCBidWcpXG5tb2R1bGUuZXhwb3J0cyA9ICEkYXNzaWduIHx8IHJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24oKXtcbiAgdmFyIEEgPSB7fVxuICAgICwgQiA9IHt9XG4gICAgLCBTID0gU3ltYm9sKClcbiAgICAsIEsgPSAnYWJjZGVmZ2hpamtsbW5vcHFyc3QnO1xuICBBW1NdID0gNztcbiAgSy5zcGxpdCgnJykuZm9yRWFjaChmdW5jdGlvbihrKXsgQltrXSA9IGs7IH0pO1xuICByZXR1cm4gJGFzc2lnbih7fSwgQSlbU10gIT0gNyB8fCBPYmplY3Qua2V5cygkYXNzaWduKHt9LCBCKSkuam9pbignJykgIT0gSztcbn0pID8gZnVuY3Rpb24gYXNzaWduKHRhcmdldCwgc291cmNlKXsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuICB2YXIgVCAgICAgPSB0b09iamVjdCh0YXJnZXQpXG4gICAgLCBhTGVuICA9IGFyZ3VtZW50cy5sZW5ndGhcbiAgICAsIGluZGV4ID0gMVxuICAgICwgZ2V0U3ltYm9scyA9IGdPUFMuZlxuICAgICwgaXNFbnVtICAgICA9IHBJRS5mO1xuICB3aGlsZShhTGVuID4gaW5kZXgpe1xuICAgIHZhciBTICAgICAgPSBJT2JqZWN0KGFyZ3VtZW50c1tpbmRleCsrXSlcbiAgICAgICwga2V5cyAgID0gZ2V0U3ltYm9scyA/IGdldEtleXMoUykuY29uY2F0KGdldFN5bWJvbHMoUykpIDogZ2V0S2V5cyhTKVxuICAgICAgLCBsZW5ndGggPSBrZXlzLmxlbmd0aFxuICAgICAgLCBqICAgICAgPSAwXG4gICAgICAsIGtleTtcbiAgICB3aGlsZShsZW5ndGggPiBqKWlmKGlzRW51bS5jYWxsKFMsIGtleSA9IGtleXNbaisrXSkpVFtrZXldID0gU1trZXldO1xuICB9IHJldHVybiBUO1xufSA6ICRhc3NpZ247IiwiLy8gMTkuMS4yLjIgLyAxNS4yLjMuNSBPYmplY3QuY3JlYXRlKE8gWywgUHJvcGVydGllc10pXG52YXIgYW5PYmplY3QgICAgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKVxuICAsIGRQcyAgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwcycpXG4gICwgZW51bUJ1Z0tleXMgPSByZXF1aXJlKCcuL19lbnVtLWJ1Zy1rZXlzJylcbiAgLCBJRV9QUk9UTyAgICA9IHJlcXVpcmUoJy4vX3NoYXJlZC1rZXknKSgnSUVfUFJPVE8nKVxuICAsIEVtcHR5ICAgICAgID0gZnVuY3Rpb24oKXsgLyogZW1wdHkgKi8gfVxuICAsIFBST1RPVFlQRSAgID0gJ3Byb3RvdHlwZSc7XG5cbi8vIENyZWF0ZSBvYmplY3Qgd2l0aCBmYWtlIGBudWxsYCBwcm90b3R5cGU6IHVzZSBpZnJhbWUgT2JqZWN0IHdpdGggY2xlYXJlZCBwcm90b3R5cGVcbnZhciBjcmVhdGVEaWN0ID0gZnVuY3Rpb24oKXtcbiAgLy8gVGhyYXNoLCB3YXN0ZSBhbmQgc29kb215OiBJRSBHQyBidWdcbiAgdmFyIGlmcmFtZSA9IHJlcXVpcmUoJy4vX2RvbS1jcmVhdGUnKSgnaWZyYW1lJylcbiAgICAsIGkgICAgICA9IGVudW1CdWdLZXlzLmxlbmd0aFxuICAgICwgbHQgICAgID0gJzwnXG4gICAgLCBndCAgICAgPSAnPidcbiAgICAsIGlmcmFtZURvY3VtZW50O1xuICBpZnJhbWUuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgcmVxdWlyZSgnLi9faHRtbCcpLmFwcGVuZENoaWxkKGlmcmFtZSk7XG4gIGlmcmFtZS5zcmMgPSAnamF2YXNjcmlwdDonOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXNjcmlwdC11cmxcbiAgLy8gY3JlYXRlRGljdCA9IGlmcmFtZS5jb250ZW50V2luZG93Lk9iamVjdDtcbiAgLy8gaHRtbC5yZW1vdmVDaGlsZChpZnJhbWUpO1xuICBpZnJhbWVEb2N1bWVudCA9IGlmcmFtZS5jb250ZW50V2luZG93LmRvY3VtZW50O1xuICBpZnJhbWVEb2N1bWVudC5vcGVuKCk7XG4gIGlmcmFtZURvY3VtZW50LndyaXRlKGx0ICsgJ3NjcmlwdCcgKyBndCArICdkb2N1bWVudC5GPU9iamVjdCcgKyBsdCArICcvc2NyaXB0JyArIGd0KTtcbiAgaWZyYW1lRG9jdW1lbnQuY2xvc2UoKTtcbiAgY3JlYXRlRGljdCA9IGlmcmFtZURvY3VtZW50LkY7XG4gIHdoaWxlKGktLSlkZWxldGUgY3JlYXRlRGljdFtQUk9UT1RZUEVdW2VudW1CdWdLZXlzW2ldXTtcbiAgcmV0dXJuIGNyZWF0ZURpY3QoKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmNyZWF0ZSB8fCBmdW5jdGlvbiBjcmVhdGUoTywgUHJvcGVydGllcyl7XG4gIHZhciByZXN1bHQ7XG4gIGlmKE8gIT09IG51bGwpe1xuICAgIEVtcHR5W1BST1RPVFlQRV0gPSBhbk9iamVjdChPKTtcbiAgICByZXN1bHQgPSBuZXcgRW1wdHk7XG4gICAgRW1wdHlbUFJPVE9UWVBFXSA9IG51bGw7XG4gICAgLy8gYWRkIFwiX19wcm90b19fXCIgZm9yIE9iamVjdC5nZXRQcm90b3R5cGVPZiBwb2x5ZmlsbFxuICAgIHJlc3VsdFtJRV9QUk9UT10gPSBPO1xuICB9IGVsc2UgcmVzdWx0ID0gY3JlYXRlRGljdCgpO1xuICByZXR1cm4gUHJvcGVydGllcyA9PT0gdW5kZWZpbmVkID8gcmVzdWx0IDogZFBzKHJlc3VsdCwgUHJvcGVydGllcyk7XG59O1xuIiwidmFyIGFuT2JqZWN0ICAgICAgID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0JylcbiAgLCBJRThfRE9NX0RFRklORSA9IHJlcXVpcmUoJy4vX2llOC1kb20tZGVmaW5lJylcbiAgLCB0b1ByaW1pdGl2ZSAgICA9IHJlcXVpcmUoJy4vX3RvLXByaW1pdGl2ZScpXG4gICwgZFAgICAgICAgICAgICAgPSBPYmplY3QuZGVmaW5lUHJvcGVydHk7XG5cbmV4cG9ydHMuZiA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgPyBPYmplY3QuZGVmaW5lUHJvcGVydHkgOiBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKXtcbiAgYW5PYmplY3QoTyk7XG4gIFAgPSB0b1ByaW1pdGl2ZShQLCB0cnVlKTtcbiAgYW5PYmplY3QoQXR0cmlidXRlcyk7XG4gIGlmKElFOF9ET01fREVGSU5FKXRyeSB7XG4gICAgcmV0dXJuIGRQKE8sIFAsIEF0dHJpYnV0ZXMpO1xuICB9IGNhdGNoKGUpeyAvKiBlbXB0eSAqLyB9XG4gIGlmKCdnZXQnIGluIEF0dHJpYnV0ZXMgfHwgJ3NldCcgaW4gQXR0cmlidXRlcyl0aHJvdyBUeXBlRXJyb3IoJ0FjY2Vzc29ycyBub3Qgc3VwcG9ydGVkIScpO1xuICBpZigndmFsdWUnIGluIEF0dHJpYnV0ZXMpT1tQXSA9IEF0dHJpYnV0ZXMudmFsdWU7XG4gIHJldHVybiBPO1xufTsiLCJ2YXIgZFAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKVxuICAsIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0JylcbiAgLCBnZXRLZXlzICA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSA/IE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzIDogZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyhPLCBQcm9wZXJ0aWVzKXtcbiAgYW5PYmplY3QoTyk7XG4gIHZhciBrZXlzICAgPSBnZXRLZXlzKFByb3BlcnRpZXMpXG4gICAgLCBsZW5ndGggPSBrZXlzLmxlbmd0aFxuICAgICwgaSA9IDBcbiAgICAsIFA7XG4gIHdoaWxlKGxlbmd0aCA+IGkpZFAuZihPLCBQID0ga2V5c1tpKytdLCBQcm9wZXJ0aWVzW1BdKTtcbiAgcmV0dXJuIE87XG59OyIsInZhciBwSUUgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1waWUnKVxuICAsIGNyZWF0ZURlc2MgICAgID0gcmVxdWlyZSgnLi9fcHJvcGVydHktZGVzYycpXG4gICwgdG9JT2JqZWN0ICAgICAgPSByZXF1aXJlKCcuL190by1pb2JqZWN0JylcbiAgLCB0b1ByaW1pdGl2ZSAgICA9IHJlcXVpcmUoJy4vX3RvLXByaW1pdGl2ZScpXG4gICwgaGFzICAgICAgICAgICAgPSByZXF1aXJlKCcuL19oYXMnKVxuICAsIElFOF9ET01fREVGSU5FID0gcmVxdWlyZSgnLi9faWU4LWRvbS1kZWZpbmUnKVxuICAsIGdPUEQgICAgICAgICAgID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcjtcblxuZXhwb3J0cy5mID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSA/IGdPUEQgOiBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoTywgUCl7XG4gIE8gPSB0b0lPYmplY3QoTyk7XG4gIFAgPSB0b1ByaW1pdGl2ZShQLCB0cnVlKTtcbiAgaWYoSUU4X0RPTV9ERUZJTkUpdHJ5IHtcbiAgICByZXR1cm4gZ09QRChPLCBQKTtcbiAgfSBjYXRjaChlKXsgLyogZW1wdHkgKi8gfVxuICBpZihoYXMoTywgUCkpcmV0dXJuIGNyZWF0ZURlc2MoIXBJRS5mLmNhbGwoTywgUCksIE9bUF0pO1xufTsiLCIvLyBmYWxsYmFjayBmb3IgSUUxMSBidWdneSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyB3aXRoIGlmcmFtZSBhbmQgd2luZG93XG52YXIgdG9JT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpXG4gICwgZ09QTiAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdvcG4nKS5mXG4gICwgdG9TdHJpbmcgID0ge30udG9TdHJpbmc7XG5cbnZhciB3aW5kb3dOYW1lcyA9IHR5cGVvZiB3aW5kb3cgPT0gJ29iamVjdCcgJiYgd2luZG93ICYmIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzXG4gID8gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMod2luZG93KSA6IFtdO1xuXG52YXIgZ2V0V2luZG93TmFtZXMgPSBmdW5jdGlvbihpdCl7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGdPUE4oaXQpO1xuICB9IGNhdGNoKGUpe1xuICAgIHJldHVybiB3aW5kb3dOYW1lcy5zbGljZSgpO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cy5mID0gZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlOYW1lcyhpdCl7XG4gIHJldHVybiB3aW5kb3dOYW1lcyAmJiB0b1N0cmluZy5jYWxsKGl0KSA9PSAnW29iamVjdCBXaW5kb3ddJyA/IGdldFdpbmRvd05hbWVzKGl0KSA6IGdPUE4odG9JT2JqZWN0KGl0KSk7XG59O1xuIiwiLy8gMTkuMS4yLjcgLyAxNS4yLjMuNCBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhPKVxudmFyICRrZXlzICAgICAgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cy1pbnRlcm5hbCcpXG4gICwgaGlkZGVuS2V5cyA9IHJlcXVpcmUoJy4vX2VudW0tYnVnLWtleXMnKS5jb25jYXQoJ2xlbmd0aCcsICdwcm90b3R5cGUnKTtcblxuZXhwb3J0cy5mID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMgfHwgZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlOYW1lcyhPKXtcbiAgcmV0dXJuICRrZXlzKE8sIGhpZGRlbktleXMpO1xufTsiLCJleHBvcnRzLmYgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzOyIsIi8vIDE5LjEuMi45IC8gMTUuMi4zLjIgT2JqZWN0LmdldFByb3RvdHlwZU9mKE8pXG52YXIgaGFzICAgICAgICAgPSByZXF1aXJlKCcuL19oYXMnKVxuICAsIHRvT2JqZWN0ICAgID0gcmVxdWlyZSgnLi9fdG8tb2JqZWN0JylcbiAgLCBJRV9QUk9UTyAgICA9IHJlcXVpcmUoJy4vX3NoYXJlZC1rZXknKSgnSUVfUFJPVE8nKVxuICAsIE9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YgfHwgZnVuY3Rpb24oTyl7XG4gIE8gPSB0b09iamVjdChPKTtcbiAgaWYoaGFzKE8sIElFX1BST1RPKSlyZXR1cm4gT1tJRV9QUk9UT107XG4gIGlmKHR5cGVvZiBPLmNvbnN0cnVjdG9yID09ICdmdW5jdGlvbicgJiYgTyBpbnN0YW5jZW9mIE8uY29uc3RydWN0b3Ipe1xuICAgIHJldHVybiBPLmNvbnN0cnVjdG9yLnByb3RvdHlwZTtcbiAgfSByZXR1cm4gTyBpbnN0YW5jZW9mIE9iamVjdCA/IE9iamVjdFByb3RvIDogbnVsbDtcbn07IiwidmFyIGhhcyAgICAgICAgICA9IHJlcXVpcmUoJy4vX2hhcycpXG4gICwgdG9JT2JqZWN0ICAgID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpXG4gICwgYXJyYXlJbmRleE9mID0gcmVxdWlyZSgnLi9fYXJyYXktaW5jbHVkZXMnKShmYWxzZSlcbiAgLCBJRV9QUk9UTyAgICAgPSByZXF1aXJlKCcuL19zaGFyZWQta2V5JykoJ0lFX1BST1RPJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ob2JqZWN0LCBuYW1lcyl7XG4gIHZhciBPICAgICAgPSB0b0lPYmplY3Qob2JqZWN0KVxuICAgICwgaSAgICAgID0gMFxuICAgICwgcmVzdWx0ID0gW11cbiAgICAsIGtleTtcbiAgZm9yKGtleSBpbiBPKWlmKGtleSAhPSBJRV9QUk9UTyloYXMoTywga2V5KSAmJiByZXN1bHQucHVzaChrZXkpO1xuICAvLyBEb24ndCBlbnVtIGJ1ZyAmIGhpZGRlbiBrZXlzXG4gIHdoaWxlKG5hbWVzLmxlbmd0aCA+IGkpaWYoaGFzKE8sIGtleSA9IG5hbWVzW2krK10pKXtcbiAgICB+YXJyYXlJbmRleE9mKHJlc3VsdCwga2V5KSB8fCByZXN1bHQucHVzaChrZXkpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59OyIsIi8vIDE5LjEuMi4xNCAvIDE1LjIuMy4xNCBPYmplY3Qua2V5cyhPKVxudmFyICRrZXlzICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMtaW50ZXJuYWwnKVxuICAsIGVudW1CdWdLZXlzID0gcmVxdWlyZSgnLi9fZW51bS1idWcta2V5cycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5rZXlzIHx8IGZ1bmN0aW9uIGtleXMoTyl7XG4gIHJldHVybiAka2V5cyhPLCBlbnVtQnVnS2V5cyk7XG59OyIsImV4cG9ydHMuZiA9IHt9LnByb3BlcnR5SXNFbnVtZXJhYmxlOyIsIi8vIG1vc3QgT2JqZWN0IG1ldGhvZHMgYnkgRVM2IHNob3VsZCBhY2NlcHQgcHJpbWl0aXZlc1xudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsIGNvcmUgICAgPSByZXF1aXJlKCcuL19jb3JlJylcbiAgLCBmYWlscyAgID0gcmVxdWlyZSgnLi9fZmFpbHMnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oS0VZLCBleGVjKXtcbiAgdmFyIGZuICA9IChjb3JlLk9iamVjdCB8fCB7fSlbS0VZXSB8fCBPYmplY3RbS0VZXVxuICAgICwgZXhwID0ge307XG4gIGV4cFtLRVldID0gZXhlYyhmbik7XG4gICRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogZmFpbHMoZnVuY3Rpb24oKXsgZm4oMSk7IH0pLCAnT2JqZWN0JywgZXhwKTtcbn07IiwidmFyIGdldEtleXMgICA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzJylcbiAgLCB0b0lPYmplY3QgPSByZXF1aXJlKCcuL190by1pb2JqZWN0JylcbiAgLCBpc0VudW0gICAgPSByZXF1aXJlKCcuL19vYmplY3QtcGllJykuZjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXNFbnRyaWVzKXtcbiAgcmV0dXJuIGZ1bmN0aW9uKGl0KXtcbiAgICB2YXIgTyAgICAgID0gdG9JT2JqZWN0KGl0KVxuICAgICAgLCBrZXlzICAgPSBnZXRLZXlzKE8pXG4gICAgICAsIGxlbmd0aCA9IGtleXMubGVuZ3RoXG4gICAgICAsIGkgICAgICA9IDBcbiAgICAgICwgcmVzdWx0ID0gW11cbiAgICAgICwga2V5O1xuICAgIHdoaWxlKGxlbmd0aCA+IGkpaWYoaXNFbnVtLmNhbGwoTywga2V5ID0ga2V5c1tpKytdKSl7XG4gICAgICByZXN1bHQucHVzaChpc0VudHJpZXMgPyBba2V5LCBPW2tleV1dIDogT1trZXldKTtcbiAgICB9IHJldHVybiByZXN1bHQ7XG4gIH07XG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oYml0bWFwLCB2YWx1ZSl7XG4gIHJldHVybiB7XG4gICAgZW51bWVyYWJsZSAgOiAhKGJpdG1hcCAmIDEpLFxuICAgIGNvbmZpZ3VyYWJsZTogIShiaXRtYXAgJiAyKSxcbiAgICB3cml0YWJsZSAgICA6ICEoYml0bWFwICYgNCksXG4gICAgdmFsdWUgICAgICAgOiB2YWx1ZVxuICB9O1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2hpZGUnKTsiLCIvLyBXb3JrcyB3aXRoIF9fcHJvdG9fXyBvbmx5LiBPbGQgdjggY2FuJ3Qgd29yayB3aXRoIG51bGwgcHJvdG8gb2JqZWN0cy5cbi8qIGVzbGludC1kaXNhYmxlIG5vLXByb3RvICovXG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKVxuICAsIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0Jyk7XG52YXIgY2hlY2sgPSBmdW5jdGlvbihPLCBwcm90byl7XG4gIGFuT2JqZWN0KE8pO1xuICBpZighaXNPYmplY3QocHJvdG8pICYmIHByb3RvICE9PSBudWxsKXRocm93IFR5cGVFcnJvcihwcm90byArIFwiOiBjYW4ndCBzZXQgYXMgcHJvdG90eXBlIVwiKTtcbn07XG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgc2V0OiBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHwgKCdfX3Byb3RvX18nIGluIHt9ID8gLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgIGZ1bmN0aW9uKHRlc3QsIGJ1Z2d5LCBzZXQpe1xuICAgICAgdHJ5IHtcbiAgICAgICAgc2V0ID0gcmVxdWlyZSgnLi9fY3R4JykoRnVuY3Rpb24uY2FsbCwgcmVxdWlyZSgnLi9fb2JqZWN0LWdvcGQnKS5mKE9iamVjdC5wcm90b3R5cGUsICdfX3Byb3RvX18nKS5zZXQsIDIpO1xuICAgICAgICBzZXQodGVzdCwgW10pO1xuICAgICAgICBidWdneSA9ICEodGVzdCBpbnN0YW5jZW9mIEFycmF5KTtcbiAgICAgIH0gY2F0Y2goZSl7IGJ1Z2d5ID0gdHJ1ZTsgfVxuICAgICAgcmV0dXJuIGZ1bmN0aW9uIHNldFByb3RvdHlwZU9mKE8sIHByb3RvKXtcbiAgICAgICAgY2hlY2soTywgcHJvdG8pO1xuICAgICAgICBpZihidWdneSlPLl9fcHJvdG9fXyA9IHByb3RvO1xuICAgICAgICBlbHNlIHNldChPLCBwcm90byk7XG4gICAgICAgIHJldHVybiBPO1xuICAgICAgfTtcbiAgICB9KHt9LCBmYWxzZSkgOiB1bmRlZmluZWQpLFxuICBjaGVjazogY2hlY2tcbn07IiwidmFyIGRlZiA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpLmZcbiAgLCBoYXMgPSByZXF1aXJlKCcuL19oYXMnKVxuICAsIFRBRyA9IHJlcXVpcmUoJy4vX3drcycpKCd0b1N0cmluZ1RhZycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0LCB0YWcsIHN0YXQpe1xuICBpZihpdCAmJiAhaGFzKGl0ID0gc3RhdCA/IGl0IDogaXQucHJvdG90eXBlLCBUQUcpKWRlZihpdCwgVEFHLCB7Y29uZmlndXJhYmxlOiB0cnVlLCB2YWx1ZTogdGFnfSk7XG59OyIsInZhciBzaGFyZWQgPSByZXF1aXJlKCcuL19zaGFyZWQnKSgna2V5cycpXG4gICwgdWlkICAgID0gcmVxdWlyZSgnLi9fdWlkJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGtleSl7XG4gIHJldHVybiBzaGFyZWRba2V5XSB8fCAoc2hhcmVkW2tleV0gPSB1aWQoa2V5KSk7XG59OyIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKVxuICAsIFNIQVJFRCA9ICdfX2NvcmUtanNfc2hhcmVkX18nXG4gICwgc3RvcmUgID0gZ2xvYmFsW1NIQVJFRF0gfHwgKGdsb2JhbFtTSEFSRURdID0ge30pO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihrZXkpe1xuICByZXR1cm4gc3RvcmVba2V5XSB8fCAoc3RvcmVba2V5XSA9IHt9KTtcbn07IiwidmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4vX3RvLWludGVnZXInKVxuICAsIGRlZmluZWQgICA9IHJlcXVpcmUoJy4vX2RlZmluZWQnKTtcbi8vIHRydWUgIC0+IFN0cmluZyNhdFxuLy8gZmFsc2UgLT4gU3RyaW5nI2NvZGVQb2ludEF0XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKFRPX1NUUklORyl7XG4gIHJldHVybiBmdW5jdGlvbih0aGF0LCBwb3Mpe1xuICAgIHZhciBzID0gU3RyaW5nKGRlZmluZWQodGhhdCkpXG4gICAgICAsIGkgPSB0b0ludGVnZXIocG9zKVxuICAgICAgLCBsID0gcy5sZW5ndGhcbiAgICAgICwgYSwgYjtcbiAgICBpZihpIDwgMCB8fCBpID49IGwpcmV0dXJuIFRPX1NUUklORyA/ICcnIDogdW5kZWZpbmVkO1xuICAgIGEgPSBzLmNoYXJDb2RlQXQoaSk7XG4gICAgcmV0dXJuIGEgPCAweGQ4MDAgfHwgYSA+IDB4ZGJmZiB8fCBpICsgMSA9PT0gbCB8fCAoYiA9IHMuY2hhckNvZGVBdChpICsgMSkpIDwgMHhkYzAwIHx8IGIgPiAweGRmZmZcbiAgICAgID8gVE9fU1RSSU5HID8gcy5jaGFyQXQoaSkgOiBhXG4gICAgICA6IFRPX1NUUklORyA/IHMuc2xpY2UoaSwgaSArIDIpIDogKGEgLSAweGQ4MDAgPDwgMTApICsgKGIgLSAweGRjMDApICsgMHgxMDAwMDtcbiAgfTtcbn07IiwidmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4vX3RvLWludGVnZXInKVxuICAsIG1heCAgICAgICA9IE1hdGgubWF4XG4gICwgbWluICAgICAgID0gTWF0aC5taW47XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGluZGV4LCBsZW5ndGgpe1xuICBpbmRleCA9IHRvSW50ZWdlcihpbmRleCk7XG4gIHJldHVybiBpbmRleCA8IDAgPyBtYXgoaW5kZXggKyBsZW5ndGgsIDApIDogbWluKGluZGV4LCBsZW5ndGgpO1xufTsiLCIvLyA3LjEuNCBUb0ludGVnZXJcbnZhciBjZWlsICA9IE1hdGguY2VpbFxuICAsIGZsb29yID0gTWF0aC5mbG9vcjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gaXNOYU4oaXQgPSAraXQpID8gMCA6IChpdCA+IDAgPyBmbG9vciA6IGNlaWwpKGl0KTtcbn07IiwiLy8gdG8gaW5kZXhlZCBvYmplY3QsIHRvT2JqZWN0IHdpdGggZmFsbGJhY2sgZm9yIG5vbi1hcnJheS1saWtlIEVTMyBzdHJpbmdzXG52YXIgSU9iamVjdCA9IHJlcXVpcmUoJy4vX2lvYmplY3QnKVxuICAsIGRlZmluZWQgPSByZXF1aXJlKCcuL19kZWZpbmVkJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIElPYmplY3QoZGVmaW5lZChpdCkpO1xufTsiLCIvLyA3LjEuMTUgVG9MZW5ndGhcbnZhciB0b0ludGVnZXIgPSByZXF1aXJlKCcuL190by1pbnRlZ2VyJylcbiAgLCBtaW4gICAgICAgPSBNYXRoLm1pbjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gaXQgPiAwID8gbWluKHRvSW50ZWdlcihpdCksIDB4MWZmZmZmZmZmZmZmZmYpIDogMDsgLy8gcG93KDIsIDUzKSAtIDEgPT0gOTAwNzE5OTI1NDc0MDk5MVxufTsiLCIvLyA3LjEuMTMgVG9PYmplY3QoYXJndW1lbnQpXG52YXIgZGVmaW5lZCA9IHJlcXVpcmUoJy4vX2RlZmluZWQnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gT2JqZWN0KGRlZmluZWQoaXQpKTtcbn07IiwiLy8gNy4xLjEgVG9QcmltaXRpdmUoaW5wdXQgWywgUHJlZmVycmVkVHlwZV0pXG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbi8vIGluc3RlYWQgb2YgdGhlIEVTNiBzcGVjIHZlcnNpb24sIHdlIGRpZG4ndCBpbXBsZW1lbnQgQEB0b1ByaW1pdGl2ZSBjYXNlXG4vLyBhbmQgdGhlIHNlY29uZCBhcmd1bWVudCAtIGZsYWcgLSBwcmVmZXJyZWQgdHlwZSBpcyBhIHN0cmluZ1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCwgUyl7XG4gIGlmKCFpc09iamVjdChpdCkpcmV0dXJuIGl0O1xuICB2YXIgZm4sIHZhbDtcbiAgaWYoUyAmJiB0eXBlb2YgKGZuID0gaXQudG9TdHJpbmcpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaXQpKSlyZXR1cm4gdmFsO1xuICBpZih0eXBlb2YgKGZuID0gaXQudmFsdWVPZikgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKXJldHVybiB2YWw7XG4gIGlmKCFTICYmIHR5cGVvZiAoZm4gPSBpdC50b1N0cmluZykgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKXJldHVybiB2YWw7XG4gIHRocm93IFR5cGVFcnJvcihcIkNhbid0IGNvbnZlcnQgb2JqZWN0IHRvIHByaW1pdGl2ZSB2YWx1ZVwiKTtcbn07IiwidmFyIGlkID0gMFxuICAsIHB4ID0gTWF0aC5yYW5kb20oKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oa2V5KXtcbiAgcmV0dXJuICdTeW1ib2woJy5jb25jYXQoa2V5ID09PSB1bmRlZmluZWQgPyAnJyA6IGtleSwgJylfJywgKCsraWQgKyBweCkudG9TdHJpbmcoMzYpKTtcbn07IiwidmFyIGdsb2JhbCAgICAgICAgID0gcmVxdWlyZSgnLi9fZ2xvYmFsJylcbiAgLCBjb3JlICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2NvcmUnKVxuICAsIExJQlJBUlkgICAgICAgID0gcmVxdWlyZSgnLi9fbGlicmFyeScpXG4gICwgd2tzRXh0ICAgICAgICAgPSByZXF1aXJlKCcuL193a3MtZXh0JylcbiAgLCBkZWZpbmVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpLmY7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG5hbWUpe1xuICB2YXIgJFN5bWJvbCA9IGNvcmUuU3ltYm9sIHx8IChjb3JlLlN5bWJvbCA9IExJQlJBUlkgPyB7fSA6IGdsb2JhbC5TeW1ib2wgfHwge30pO1xuICBpZihuYW1lLmNoYXJBdCgwKSAhPSAnXycgJiYgIShuYW1lIGluICRTeW1ib2wpKWRlZmluZVByb3BlcnR5KCRTeW1ib2wsIG5hbWUsIHt2YWx1ZTogd2tzRXh0LmYobmFtZSl9KTtcbn07IiwiZXhwb3J0cy5mID0gcmVxdWlyZSgnLi9fd2tzJyk7IiwidmFyIHN0b3JlICAgICAgPSByZXF1aXJlKCcuL19zaGFyZWQnKSgnd2tzJylcbiAgLCB1aWQgICAgICAgID0gcmVxdWlyZSgnLi9fdWlkJylcbiAgLCBTeW1ib2wgICAgID0gcmVxdWlyZSgnLi9fZ2xvYmFsJykuU3ltYm9sXG4gICwgVVNFX1NZTUJPTCA9IHR5cGVvZiBTeW1ib2wgPT0gJ2Z1bmN0aW9uJztcblxudmFyICRleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihuYW1lKXtcbiAgcmV0dXJuIHN0b3JlW25hbWVdIHx8IChzdG9yZVtuYW1lXSA9XG4gICAgVVNFX1NZTUJPTCAmJiBTeW1ib2xbbmFtZV0gfHwgKFVTRV9TWU1CT0wgPyBTeW1ib2wgOiB1aWQpKCdTeW1ib2wuJyArIG5hbWUpKTtcbn07XG5cbiRleHBvcnRzLnN0b3JlID0gc3RvcmU7IiwidmFyIGNsYXNzb2YgICA9IHJlcXVpcmUoJy4vX2NsYXNzb2YnKVxuICAsIElURVJBVE9SICA9IHJlcXVpcmUoJy4vX3drcycpKCdpdGVyYXRvcicpXG4gICwgSXRlcmF0b3JzID0gcmVxdWlyZSgnLi9faXRlcmF0b3JzJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2NvcmUnKS5nZXRJdGVyYXRvck1ldGhvZCA9IGZ1bmN0aW9uKGl0KXtcbiAgaWYoaXQgIT0gdW5kZWZpbmVkKXJldHVybiBpdFtJVEVSQVRPUl1cbiAgICB8fCBpdFsnQEBpdGVyYXRvciddXG4gICAgfHwgSXRlcmF0b3JzW2NsYXNzb2YoaXQpXTtcbn07IiwidmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0JylcbiAgLCBnZXQgICAgICA9IHJlcXVpcmUoJy4vY29yZS5nZXQtaXRlcmF0b3ItbWV0aG9kJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2NvcmUnKS5nZXRJdGVyYXRvciA9IGZ1bmN0aW9uKGl0KXtcbiAgdmFyIGl0ZXJGbiA9IGdldChpdCk7XG4gIGlmKHR5cGVvZiBpdGVyRm4gIT0gJ2Z1bmN0aW9uJyl0aHJvdyBUeXBlRXJyb3IoaXQgKyAnIGlzIG5vdCBpdGVyYWJsZSEnKTtcbiAgcmV0dXJuIGFuT2JqZWN0KGl0ZXJGbi5jYWxsKGl0KSk7XG59OyIsInZhciBjbGFzc29mICAgPSByZXF1aXJlKCcuL19jbGFzc29mJylcbiAgLCBJVEVSQVRPUiAgPSByZXF1aXJlKCcuL193a3MnKSgnaXRlcmF0b3InKVxuICAsIEl0ZXJhdG9ycyA9IHJlcXVpcmUoJy4vX2l0ZXJhdG9ycycpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19jb3JlJykuaXNJdGVyYWJsZSA9IGZ1bmN0aW9uKGl0KXtcbiAgdmFyIE8gPSBPYmplY3QoaXQpO1xuICByZXR1cm4gT1tJVEVSQVRPUl0gIT09IHVuZGVmaW5lZFxuICAgIHx8ICdAQGl0ZXJhdG9yJyBpbiBPXG4gICAgfHwgSXRlcmF0b3JzLmhhc093blByb3BlcnR5KGNsYXNzb2YoTykpO1xufTsiLCIndXNlIHN0cmljdCc7XG52YXIgY3R4ICAgICAgICAgICAgPSByZXF1aXJlKCcuL19jdHgnKVxuICAsICRleHBvcnQgICAgICAgID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgLCB0b09iamVjdCAgICAgICA9IHJlcXVpcmUoJy4vX3RvLW9iamVjdCcpXG4gICwgY2FsbCAgICAgICAgICAgPSByZXF1aXJlKCcuL19pdGVyLWNhbGwnKVxuICAsIGlzQXJyYXlJdGVyICAgID0gcmVxdWlyZSgnLi9faXMtYXJyYXktaXRlcicpXG4gICwgdG9MZW5ndGggICAgICAgPSByZXF1aXJlKCcuL190by1sZW5ndGgnKVxuICAsIGNyZWF0ZVByb3BlcnR5ID0gcmVxdWlyZSgnLi9fY3JlYXRlLXByb3BlcnR5JylcbiAgLCBnZXRJdGVyRm4gICAgICA9IHJlcXVpcmUoJy4vY29yZS5nZXQtaXRlcmF0b3ItbWV0aG9kJyk7XG5cbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogIXJlcXVpcmUoJy4vX2l0ZXItZGV0ZWN0JykoZnVuY3Rpb24oaXRlcil7IEFycmF5LmZyb20oaXRlcik7IH0pLCAnQXJyYXknLCB7XG4gIC8vIDIyLjEuMi4xIEFycmF5LmZyb20oYXJyYXlMaWtlLCBtYXBmbiA9IHVuZGVmaW5lZCwgdGhpc0FyZyA9IHVuZGVmaW5lZClcbiAgZnJvbTogZnVuY3Rpb24gZnJvbShhcnJheUxpa2UvKiwgbWFwZm4gPSB1bmRlZmluZWQsIHRoaXNBcmcgPSB1bmRlZmluZWQqLyl7XG4gICAgdmFyIE8gICAgICAgPSB0b09iamVjdChhcnJheUxpa2UpXG4gICAgICAsIEMgICAgICAgPSB0eXBlb2YgdGhpcyA9PSAnZnVuY3Rpb24nID8gdGhpcyA6IEFycmF5XG4gICAgICAsIGFMZW4gICAgPSBhcmd1bWVudHMubGVuZ3RoXG4gICAgICAsIG1hcGZuICAgPSBhTGVuID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZFxuICAgICAgLCBtYXBwaW5nID0gbWFwZm4gIT09IHVuZGVmaW5lZFxuICAgICAgLCBpbmRleCAgID0gMFxuICAgICAgLCBpdGVyRm4gID0gZ2V0SXRlckZuKE8pXG4gICAgICAsIGxlbmd0aCwgcmVzdWx0LCBzdGVwLCBpdGVyYXRvcjtcbiAgICBpZihtYXBwaW5nKW1hcGZuID0gY3R4KG1hcGZuLCBhTGVuID4gMiA/IGFyZ3VtZW50c1syXSA6IHVuZGVmaW5lZCwgMik7XG4gICAgLy8gaWYgb2JqZWN0IGlzbid0IGl0ZXJhYmxlIG9yIGl0J3MgYXJyYXkgd2l0aCBkZWZhdWx0IGl0ZXJhdG9yIC0gdXNlIHNpbXBsZSBjYXNlXG4gICAgaWYoaXRlckZuICE9IHVuZGVmaW5lZCAmJiAhKEMgPT0gQXJyYXkgJiYgaXNBcnJheUl0ZXIoaXRlckZuKSkpe1xuICAgICAgZm9yKGl0ZXJhdG9yID0gaXRlckZuLmNhbGwoTyksIHJlc3VsdCA9IG5ldyBDOyAhKHN0ZXAgPSBpdGVyYXRvci5uZXh0KCkpLmRvbmU7IGluZGV4Kyspe1xuICAgICAgICBjcmVhdGVQcm9wZXJ0eShyZXN1bHQsIGluZGV4LCBtYXBwaW5nID8gY2FsbChpdGVyYXRvciwgbWFwZm4sIFtzdGVwLnZhbHVlLCBpbmRleF0sIHRydWUpIDogc3RlcC52YWx1ZSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGxlbmd0aCA9IHRvTGVuZ3RoKE8ubGVuZ3RoKTtcbiAgICAgIGZvcihyZXN1bHQgPSBuZXcgQyhsZW5ndGgpOyBsZW5ndGggPiBpbmRleDsgaW5kZXgrKyl7XG4gICAgICAgIGNyZWF0ZVByb3BlcnR5KHJlc3VsdCwgaW5kZXgsIG1hcHBpbmcgPyBtYXBmbihPW2luZGV4XSwgaW5kZXgpIDogT1tpbmRleF0pO1xuICAgICAgfVxuICAgIH1cbiAgICByZXN1bHQubGVuZ3RoID0gaW5kZXg7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxufSk7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgYWRkVG9VbnNjb3BhYmxlcyA9IHJlcXVpcmUoJy4vX2FkZC10by11bnNjb3BhYmxlcycpXG4gICwgc3RlcCAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2l0ZXItc3RlcCcpXG4gICwgSXRlcmF0b3JzICAgICAgICA9IHJlcXVpcmUoJy4vX2l0ZXJhdG9ycycpXG4gICwgdG9JT2JqZWN0ICAgICAgICA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKTtcblxuLy8gMjIuMS4zLjQgQXJyYXkucHJvdG90eXBlLmVudHJpZXMoKVxuLy8gMjIuMS4zLjEzIEFycmF5LnByb3RvdHlwZS5rZXlzKClcbi8vIDIyLjEuMy4yOSBBcnJheS5wcm90b3R5cGUudmFsdWVzKClcbi8vIDIyLjEuMy4zMCBBcnJheS5wcm90b3R5cGVbQEBpdGVyYXRvcl0oKVxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19pdGVyLWRlZmluZScpKEFycmF5LCAnQXJyYXknLCBmdW5jdGlvbihpdGVyYXRlZCwga2luZCl7XG4gIHRoaXMuX3QgPSB0b0lPYmplY3QoaXRlcmF0ZWQpOyAvLyB0YXJnZXRcbiAgdGhpcy5faSA9IDA7ICAgICAgICAgICAgICAgICAgIC8vIG5leHQgaW5kZXhcbiAgdGhpcy5fayA9IGtpbmQ7ICAgICAgICAgICAgICAgIC8vIGtpbmRcbi8vIDIyLjEuNS4yLjEgJUFycmF5SXRlcmF0b3JQcm90b3R5cGUlLm5leHQoKVxufSwgZnVuY3Rpb24oKXtcbiAgdmFyIE8gICAgID0gdGhpcy5fdFxuICAgICwga2luZCAgPSB0aGlzLl9rXG4gICAgLCBpbmRleCA9IHRoaXMuX2krKztcbiAgaWYoIU8gfHwgaW5kZXggPj0gTy5sZW5ndGgpe1xuICAgIHRoaXMuX3QgPSB1bmRlZmluZWQ7XG4gICAgcmV0dXJuIHN0ZXAoMSk7XG4gIH1cbiAgaWYoa2luZCA9PSAna2V5cycgIClyZXR1cm4gc3RlcCgwLCBpbmRleCk7XG4gIGlmKGtpbmQgPT0gJ3ZhbHVlcycpcmV0dXJuIHN0ZXAoMCwgT1tpbmRleF0pO1xuICByZXR1cm4gc3RlcCgwLCBbaW5kZXgsIE9baW5kZXhdXSk7XG59LCAndmFsdWVzJyk7XG5cbi8vIGFyZ3VtZW50c0xpc3RbQEBpdGVyYXRvcl0gaXMgJUFycmF5UHJvdG9fdmFsdWVzJSAoOS40LjQuNiwgOS40LjQuNylcbkl0ZXJhdG9ycy5Bcmd1bWVudHMgPSBJdGVyYXRvcnMuQXJyYXk7XG5cbmFkZFRvVW5zY29wYWJsZXMoJ2tleXMnKTtcbmFkZFRvVW5zY29wYWJsZXMoJ3ZhbHVlcycpO1xuYWRkVG9VbnNjb3BhYmxlcygnZW50cmllcycpOyIsIi8vIDE5LjEuMy4xIE9iamVjdC5hc3NpZ24odGFyZ2V0LCBzb3VyY2UpXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiwgJ09iamVjdCcsIHthc3NpZ246IHJlcXVpcmUoJy4vX29iamVjdC1hc3NpZ24nKX0pOyIsInZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jylcbi8vIDE5LjEuMi4yIC8gMTUuMi4zLjUgT2JqZWN0LmNyZWF0ZShPIFssIFByb3BlcnRpZXNdKVxuJGV4cG9ydCgkZXhwb3J0LlMsICdPYmplY3QnLCB7Y3JlYXRlOiByZXF1aXJlKCcuL19vYmplY3QtY3JlYXRlJyl9KTsiLCJ2YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuLy8gMTkuMS4yLjQgLyAxNS4yLjMuNiBPYmplY3QuZGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcylcbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogIXJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJyksICdPYmplY3QnLCB7ZGVmaW5lUHJvcGVydHk6IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpLmZ9KTsiLCIvLyAxOS4xLjIuOSBPYmplY3QuZ2V0UHJvdG90eXBlT2YoTylcbnZhciB0b09iamVjdCAgICAgICAgPSByZXF1aXJlKCcuL190by1vYmplY3QnKVxuICAsICRnZXRQcm90b3R5cGVPZiA9IHJlcXVpcmUoJy4vX29iamVjdC1ncG8nKTtcblxucmVxdWlyZSgnLi9fb2JqZWN0LXNhcCcpKCdnZXRQcm90b3R5cGVPZicsIGZ1bmN0aW9uKCl7XG4gIHJldHVybiBmdW5jdGlvbiBnZXRQcm90b3R5cGVPZihpdCl7XG4gICAgcmV0dXJuICRnZXRQcm90b3R5cGVPZih0b09iamVjdChpdCkpO1xuICB9O1xufSk7IiwiLy8gMTkuMS4yLjE0IE9iamVjdC5rZXlzKE8pXG52YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuL190by1vYmplY3QnKVxuICAsICRrZXlzICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMnKTtcblxucmVxdWlyZSgnLi9fb2JqZWN0LXNhcCcpKCdrZXlzJywgZnVuY3Rpb24oKXtcbiAgcmV0dXJuIGZ1bmN0aW9uIGtleXMoaXQpe1xuICAgIHJldHVybiAka2V5cyh0b09iamVjdChpdCkpO1xuICB9O1xufSk7IiwiLy8gMTkuMS4zLjE5IE9iamVjdC5zZXRQcm90b3R5cGVPZihPLCBwcm90bylcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG4kZXhwb3J0KCRleHBvcnQuUywgJ09iamVjdCcsIHtzZXRQcm90b3R5cGVPZjogcmVxdWlyZSgnLi9fc2V0LXByb3RvJykuc2V0fSk7IiwiIiwiJ3VzZSBzdHJpY3QnO1xudmFyICRhdCAgPSByZXF1aXJlKCcuL19zdHJpbmctYXQnKSh0cnVlKTtcblxuLy8gMjEuMS4zLjI3IFN0cmluZy5wcm90b3R5cGVbQEBpdGVyYXRvcl0oKVxucmVxdWlyZSgnLi9faXRlci1kZWZpbmUnKShTdHJpbmcsICdTdHJpbmcnLCBmdW5jdGlvbihpdGVyYXRlZCl7XG4gIHRoaXMuX3QgPSBTdHJpbmcoaXRlcmF0ZWQpOyAvLyB0YXJnZXRcbiAgdGhpcy5faSA9IDA7ICAgICAgICAgICAgICAgIC8vIG5leHQgaW5kZXhcbi8vIDIxLjEuNS4yLjEgJVN0cmluZ0l0ZXJhdG9yUHJvdG90eXBlJS5uZXh0KClcbn0sIGZ1bmN0aW9uKCl7XG4gIHZhciBPICAgICA9IHRoaXMuX3RcbiAgICAsIGluZGV4ID0gdGhpcy5faVxuICAgICwgcG9pbnQ7XG4gIGlmKGluZGV4ID49IE8ubGVuZ3RoKXJldHVybiB7dmFsdWU6IHVuZGVmaW5lZCwgZG9uZTogdHJ1ZX07XG4gIHBvaW50ID0gJGF0KE8sIGluZGV4KTtcbiAgdGhpcy5faSArPSBwb2ludC5sZW5ndGg7XG4gIHJldHVybiB7dmFsdWU6IHBvaW50LCBkb25lOiBmYWxzZX07XG59KTsiLCIndXNlIHN0cmljdCc7XG4vLyBFQ01BU2NyaXB0IDYgc3ltYm9scyBzaGltXG52YXIgZ2xvYmFsICAgICAgICAgPSByZXF1aXJlKCcuL19nbG9iYWwnKVxuICAsIGhhcyAgICAgICAgICAgID0gcmVxdWlyZSgnLi9faGFzJylcbiAgLCBERVNDUklQVE9SUyAgICA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJylcbiAgLCAkZXhwb3J0ICAgICAgICA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4gICwgcmVkZWZpbmUgICAgICAgPSByZXF1aXJlKCcuL19yZWRlZmluZScpXG4gICwgTUVUQSAgICAgICAgICAgPSByZXF1aXJlKCcuL19tZXRhJykuS0VZXG4gICwgJGZhaWxzICAgICAgICAgPSByZXF1aXJlKCcuL19mYWlscycpXG4gICwgc2hhcmVkICAgICAgICAgPSByZXF1aXJlKCcuL19zaGFyZWQnKVxuICAsIHNldFRvU3RyaW5nVGFnID0gcmVxdWlyZSgnLi9fc2V0LXRvLXN0cmluZy10YWcnKVxuICAsIHVpZCAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fdWlkJylcbiAgLCB3a3MgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX3drcycpXG4gICwgd2tzRXh0ICAgICAgICAgPSByZXF1aXJlKCcuL193a3MtZXh0JylcbiAgLCB3a3NEZWZpbmUgICAgICA9IHJlcXVpcmUoJy4vX3drcy1kZWZpbmUnKVxuICAsIGtleU9mICAgICAgICAgID0gcmVxdWlyZSgnLi9fa2V5b2YnKVxuICAsIGVudW1LZXlzICAgICAgID0gcmVxdWlyZSgnLi9fZW51bS1rZXlzJylcbiAgLCBpc0FycmF5ICAgICAgICA9IHJlcXVpcmUoJy4vX2lzLWFycmF5JylcbiAgLCBhbk9iamVjdCAgICAgICA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpXG4gICwgdG9JT2JqZWN0ICAgICAgPSByZXF1aXJlKCcuL190by1pb2JqZWN0JylcbiAgLCB0b1ByaW1pdGl2ZSAgICA9IHJlcXVpcmUoJy4vX3RvLXByaW1pdGl2ZScpXG4gICwgY3JlYXRlRGVzYyAgICAgPSByZXF1aXJlKCcuL19wcm9wZXJ0eS1kZXNjJylcbiAgLCBfY3JlYXRlICAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1jcmVhdGUnKVxuICAsIGdPUE5FeHQgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdvcG4tZXh0JylcbiAgLCAkR09QRCAgICAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1nb3BkJylcbiAgLCAkRFAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpXG4gICwgJGtleXMgICAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cycpXG4gICwgZ09QRCAgICAgICAgICAgPSAkR09QRC5mXG4gICwgZFAgICAgICAgICAgICAgPSAkRFAuZlxuICAsIGdPUE4gICAgICAgICAgID0gZ09QTkV4dC5mXG4gICwgJFN5bWJvbCAgICAgICAgPSBnbG9iYWwuU3ltYm9sXG4gICwgJEpTT04gICAgICAgICAgPSBnbG9iYWwuSlNPTlxuICAsIF9zdHJpbmdpZnkgICAgID0gJEpTT04gJiYgJEpTT04uc3RyaW5naWZ5XG4gICwgUFJPVE9UWVBFICAgICAgPSAncHJvdG90eXBlJ1xuICAsIEhJRERFTiAgICAgICAgID0gd2tzKCdfaGlkZGVuJylcbiAgLCBUT19QUklNSVRJVkUgICA9IHdrcygndG9QcmltaXRpdmUnKVxuICAsIGlzRW51bSAgICAgICAgID0ge30ucHJvcGVydHlJc0VudW1lcmFibGVcbiAgLCBTeW1ib2xSZWdpc3RyeSA9IHNoYXJlZCgnc3ltYm9sLXJlZ2lzdHJ5JylcbiAgLCBBbGxTeW1ib2xzICAgICA9IHNoYXJlZCgnc3ltYm9scycpXG4gICwgT1BTeW1ib2xzICAgICAgPSBzaGFyZWQoJ29wLXN5bWJvbHMnKVxuICAsIE9iamVjdFByb3RvICAgID0gT2JqZWN0W1BST1RPVFlQRV1cbiAgLCBVU0VfTkFUSVZFICAgICA9IHR5cGVvZiAkU3ltYm9sID09ICdmdW5jdGlvbidcbiAgLCBRT2JqZWN0ICAgICAgICA9IGdsb2JhbC5RT2JqZWN0O1xuLy8gRG9uJ3QgdXNlIHNldHRlcnMgaW4gUXQgU2NyaXB0LCBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvMTczXG52YXIgc2V0dGVyID0gIVFPYmplY3QgfHwgIVFPYmplY3RbUFJPVE9UWVBFXSB8fCAhUU9iamVjdFtQUk9UT1RZUEVdLmZpbmRDaGlsZDtcblxuLy8gZmFsbGJhY2sgZm9yIG9sZCBBbmRyb2lkLCBodHRwczovL2NvZGUuZ29vZ2xlLmNvbS9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9Njg3XG52YXIgc2V0U3ltYm9sRGVzYyA9IERFU0NSSVBUT1JTICYmICRmYWlscyhmdW5jdGlvbigpe1xuICByZXR1cm4gX2NyZWF0ZShkUCh7fSwgJ2EnLCB7XG4gICAgZ2V0OiBmdW5jdGlvbigpeyByZXR1cm4gZFAodGhpcywgJ2EnLCB7dmFsdWU6IDd9KS5hOyB9XG4gIH0pKS5hICE9IDc7XG59KSA/IGZ1bmN0aW9uKGl0LCBrZXksIEQpe1xuICB2YXIgcHJvdG9EZXNjID0gZ09QRChPYmplY3RQcm90bywga2V5KTtcbiAgaWYocHJvdG9EZXNjKWRlbGV0ZSBPYmplY3RQcm90b1trZXldO1xuICBkUChpdCwga2V5LCBEKTtcbiAgaWYocHJvdG9EZXNjICYmIGl0ICE9PSBPYmplY3RQcm90bylkUChPYmplY3RQcm90bywga2V5LCBwcm90b0Rlc2MpO1xufSA6IGRQO1xuXG52YXIgd3JhcCA9IGZ1bmN0aW9uKHRhZyl7XG4gIHZhciBzeW0gPSBBbGxTeW1ib2xzW3RhZ10gPSBfY3JlYXRlKCRTeW1ib2xbUFJPVE9UWVBFXSk7XG4gIHN5bS5fayA9IHRhZztcbiAgcmV0dXJuIHN5bTtcbn07XG5cbnZhciBpc1N5bWJvbCA9IFVTRV9OQVRJVkUgJiYgdHlwZW9mICRTeW1ib2wuaXRlcmF0b3IgPT0gJ3N5bWJvbCcgPyBmdW5jdGlvbihpdCl7XG4gIHJldHVybiB0eXBlb2YgaXQgPT0gJ3N5bWJvbCc7XG59IDogZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gaXQgaW5zdGFuY2VvZiAkU3ltYm9sO1xufTtcblxudmFyICRkZWZpbmVQcm9wZXJ0eSA9IGZ1bmN0aW9uIGRlZmluZVByb3BlcnR5KGl0LCBrZXksIEQpe1xuICBpZihpdCA9PT0gT2JqZWN0UHJvdG8pJGRlZmluZVByb3BlcnR5KE9QU3ltYm9scywga2V5LCBEKTtcbiAgYW5PYmplY3QoaXQpO1xuICBrZXkgPSB0b1ByaW1pdGl2ZShrZXksIHRydWUpO1xuICBhbk9iamVjdChEKTtcbiAgaWYoaGFzKEFsbFN5bWJvbHMsIGtleSkpe1xuICAgIGlmKCFELmVudW1lcmFibGUpe1xuICAgICAgaWYoIWhhcyhpdCwgSElEREVOKSlkUChpdCwgSElEREVOLCBjcmVhdGVEZXNjKDEsIHt9KSk7XG4gICAgICBpdFtISURERU5dW2tleV0gPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZihoYXMoaXQsIEhJRERFTikgJiYgaXRbSElEREVOXVtrZXldKWl0W0hJRERFTl1ba2V5XSA9IGZhbHNlO1xuICAgICAgRCA9IF9jcmVhdGUoRCwge2VudW1lcmFibGU6IGNyZWF0ZURlc2MoMCwgZmFsc2UpfSk7XG4gICAgfSByZXR1cm4gc2V0U3ltYm9sRGVzYyhpdCwga2V5LCBEKTtcbiAgfSByZXR1cm4gZFAoaXQsIGtleSwgRCk7XG59O1xudmFyICRkZWZpbmVQcm9wZXJ0aWVzID0gZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyhpdCwgUCl7XG4gIGFuT2JqZWN0KGl0KTtcbiAgdmFyIGtleXMgPSBlbnVtS2V5cyhQID0gdG9JT2JqZWN0KFApKVxuICAgICwgaSAgICA9IDBcbiAgICAsIGwgPSBrZXlzLmxlbmd0aFxuICAgICwga2V5O1xuICB3aGlsZShsID4gaSkkZGVmaW5lUHJvcGVydHkoaXQsIGtleSA9IGtleXNbaSsrXSwgUFtrZXldKTtcbiAgcmV0dXJuIGl0O1xufTtcbnZhciAkY3JlYXRlID0gZnVuY3Rpb24gY3JlYXRlKGl0LCBQKXtcbiAgcmV0dXJuIFAgPT09IHVuZGVmaW5lZCA/IF9jcmVhdGUoaXQpIDogJGRlZmluZVByb3BlcnRpZXMoX2NyZWF0ZShpdCksIFApO1xufTtcbnZhciAkcHJvcGVydHlJc0VudW1lcmFibGUgPSBmdW5jdGlvbiBwcm9wZXJ0eUlzRW51bWVyYWJsZShrZXkpe1xuICB2YXIgRSA9IGlzRW51bS5jYWxsKHRoaXMsIGtleSA9IHRvUHJpbWl0aXZlKGtleSwgdHJ1ZSkpO1xuICBpZih0aGlzID09PSBPYmplY3RQcm90byAmJiBoYXMoQWxsU3ltYm9scywga2V5KSAmJiAhaGFzKE9QU3ltYm9scywga2V5KSlyZXR1cm4gZmFsc2U7XG4gIHJldHVybiBFIHx8ICFoYXModGhpcywga2V5KSB8fCAhaGFzKEFsbFN5bWJvbHMsIGtleSkgfHwgaGFzKHRoaXMsIEhJRERFTikgJiYgdGhpc1tISURERU5dW2tleV0gPyBFIDogdHJ1ZTtcbn07XG52YXIgJGdldE93blByb3BlcnR5RGVzY3JpcHRvciA9IGZ1bmN0aW9uIGdldE93blByb3BlcnR5RGVzY3JpcHRvcihpdCwga2V5KXtcbiAgaXQgID0gdG9JT2JqZWN0KGl0KTtcbiAga2V5ID0gdG9QcmltaXRpdmUoa2V5LCB0cnVlKTtcbiAgaWYoaXQgPT09IE9iamVjdFByb3RvICYmIGhhcyhBbGxTeW1ib2xzLCBrZXkpICYmICFoYXMoT1BTeW1ib2xzLCBrZXkpKXJldHVybjtcbiAgdmFyIEQgPSBnT1BEKGl0LCBrZXkpO1xuICBpZihEICYmIGhhcyhBbGxTeW1ib2xzLCBrZXkpICYmICEoaGFzKGl0LCBISURERU4pICYmIGl0W0hJRERFTl1ba2V5XSkpRC5lbnVtZXJhYmxlID0gdHJ1ZTtcbiAgcmV0dXJuIEQ7XG59O1xudmFyICRnZXRPd25Qcm9wZXJ0eU5hbWVzID0gZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlOYW1lcyhpdCl7XG4gIHZhciBuYW1lcyAgPSBnT1BOKHRvSU9iamVjdChpdCkpXG4gICAgLCByZXN1bHQgPSBbXVxuICAgICwgaSAgICAgID0gMFxuICAgICwga2V5O1xuICB3aGlsZShuYW1lcy5sZW5ndGggPiBpKXtcbiAgICBpZighaGFzKEFsbFN5bWJvbHMsIGtleSA9IG5hbWVzW2krK10pICYmIGtleSAhPSBISURERU4gJiYga2V5ICE9IE1FVEEpcmVzdWx0LnB1c2goa2V5KTtcbiAgfSByZXR1cm4gcmVzdWx0O1xufTtcbnZhciAkZ2V0T3duUHJvcGVydHlTeW1ib2xzID0gZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlTeW1ib2xzKGl0KXtcbiAgdmFyIElTX09QICA9IGl0ID09PSBPYmplY3RQcm90b1xuICAgICwgbmFtZXMgID0gZ09QTihJU19PUCA/IE9QU3ltYm9scyA6IHRvSU9iamVjdChpdCkpXG4gICAgLCByZXN1bHQgPSBbXVxuICAgICwgaSAgICAgID0gMFxuICAgICwga2V5O1xuICB3aGlsZShuYW1lcy5sZW5ndGggPiBpKXtcbiAgICBpZihoYXMoQWxsU3ltYm9scywga2V5ID0gbmFtZXNbaSsrXSkgJiYgKElTX09QID8gaGFzKE9iamVjdFByb3RvLCBrZXkpIDogdHJ1ZSkpcmVzdWx0LnB1c2goQWxsU3ltYm9sc1trZXldKTtcbiAgfSByZXR1cm4gcmVzdWx0O1xufTtcblxuLy8gMTkuNC4xLjEgU3ltYm9sKFtkZXNjcmlwdGlvbl0pXG5pZighVVNFX05BVElWRSl7XG4gICRTeW1ib2wgPSBmdW5jdGlvbiBTeW1ib2woKXtcbiAgICBpZih0aGlzIGluc3RhbmNlb2YgJFN5bWJvbCl0aHJvdyBUeXBlRXJyb3IoJ1N5bWJvbCBpcyBub3QgYSBjb25zdHJ1Y3RvciEnKTtcbiAgICB2YXIgdGFnID0gdWlkKGFyZ3VtZW50cy5sZW5ndGggPiAwID8gYXJndW1lbnRzWzBdIDogdW5kZWZpbmVkKTtcbiAgICB2YXIgJHNldCA9IGZ1bmN0aW9uKHZhbHVlKXtcbiAgICAgIGlmKHRoaXMgPT09IE9iamVjdFByb3RvKSRzZXQuY2FsbChPUFN5bWJvbHMsIHZhbHVlKTtcbiAgICAgIGlmKGhhcyh0aGlzLCBISURERU4pICYmIGhhcyh0aGlzW0hJRERFTl0sIHRhZykpdGhpc1tISURERU5dW3RhZ10gPSBmYWxzZTtcbiAgICAgIHNldFN5bWJvbERlc2ModGhpcywgdGFnLCBjcmVhdGVEZXNjKDEsIHZhbHVlKSk7XG4gICAgfTtcbiAgICBpZihERVNDUklQVE9SUyAmJiBzZXR0ZXIpc2V0U3ltYm9sRGVzYyhPYmplY3RQcm90bywgdGFnLCB7Y29uZmlndXJhYmxlOiB0cnVlLCBzZXQ6ICRzZXR9KTtcbiAgICByZXR1cm4gd3JhcCh0YWcpO1xuICB9O1xuICByZWRlZmluZSgkU3ltYm9sW1BST1RPVFlQRV0sICd0b1N0cmluZycsIGZ1bmN0aW9uIHRvU3RyaW5nKCl7XG4gICAgcmV0dXJuIHRoaXMuX2s7XG4gIH0pO1xuXG4gICRHT1BELmYgPSAkZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO1xuICAkRFAuZiAgID0gJGRlZmluZVByb3BlcnR5O1xuICByZXF1aXJlKCcuL19vYmplY3QtZ29wbicpLmYgPSBnT1BORXh0LmYgPSAkZ2V0T3duUHJvcGVydHlOYW1lcztcbiAgcmVxdWlyZSgnLi9fb2JqZWN0LXBpZScpLmYgID0gJHByb3BlcnR5SXNFbnVtZXJhYmxlO1xuICByZXF1aXJlKCcuL19vYmplY3QtZ29wcycpLmYgPSAkZ2V0T3duUHJvcGVydHlTeW1ib2xzO1xuXG4gIGlmKERFU0NSSVBUT1JTICYmICFyZXF1aXJlKCcuL19saWJyYXJ5Jykpe1xuICAgIHJlZGVmaW5lKE9iamVjdFByb3RvLCAncHJvcGVydHlJc0VudW1lcmFibGUnLCAkcHJvcGVydHlJc0VudW1lcmFibGUsIHRydWUpO1xuICB9XG5cbiAgd2tzRXh0LmYgPSBmdW5jdGlvbihuYW1lKXtcbiAgICByZXR1cm4gd3JhcCh3a3MobmFtZSkpO1xuICB9XG59XG5cbiRleHBvcnQoJGV4cG9ydC5HICsgJGV4cG9ydC5XICsgJGV4cG9ydC5GICogIVVTRV9OQVRJVkUsIHtTeW1ib2w6ICRTeW1ib2x9KTtcblxuZm9yKHZhciBzeW1ib2xzID0gKFxuICAvLyAxOS40LjIuMiwgMTkuNC4yLjMsIDE5LjQuMi40LCAxOS40LjIuNiwgMTkuNC4yLjgsIDE5LjQuMi45LCAxOS40LjIuMTAsIDE5LjQuMi4xMSwgMTkuNC4yLjEyLCAxOS40LjIuMTMsIDE5LjQuMi4xNFxuICAnaGFzSW5zdGFuY2UsaXNDb25jYXRTcHJlYWRhYmxlLGl0ZXJhdG9yLG1hdGNoLHJlcGxhY2Usc2VhcmNoLHNwZWNpZXMsc3BsaXQsdG9QcmltaXRpdmUsdG9TdHJpbmdUYWcsdW5zY29wYWJsZXMnXG4pLnNwbGl0KCcsJyksIGkgPSAwOyBzeW1ib2xzLmxlbmd0aCA+IGk7ICl3a3Moc3ltYm9sc1tpKytdKTtcblxuZm9yKHZhciBzeW1ib2xzID0gJGtleXMod2tzLnN0b3JlKSwgaSA9IDA7IHN5bWJvbHMubGVuZ3RoID4gaTsgKXdrc0RlZmluZShzeW1ib2xzW2krK10pO1xuXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICFVU0VfTkFUSVZFLCAnU3ltYm9sJywge1xuICAvLyAxOS40LjIuMSBTeW1ib2wuZm9yKGtleSlcbiAgJ2Zvcic6IGZ1bmN0aW9uKGtleSl7XG4gICAgcmV0dXJuIGhhcyhTeW1ib2xSZWdpc3RyeSwga2V5ICs9ICcnKVxuICAgICAgPyBTeW1ib2xSZWdpc3RyeVtrZXldXG4gICAgICA6IFN5bWJvbFJlZ2lzdHJ5W2tleV0gPSAkU3ltYm9sKGtleSk7XG4gIH0sXG4gIC8vIDE5LjQuMi41IFN5bWJvbC5rZXlGb3Ioc3ltKVxuICBrZXlGb3I6IGZ1bmN0aW9uIGtleUZvcihrZXkpe1xuICAgIGlmKGlzU3ltYm9sKGtleSkpcmV0dXJuIGtleU9mKFN5bWJvbFJlZ2lzdHJ5LCBrZXkpO1xuICAgIHRocm93IFR5cGVFcnJvcihrZXkgKyAnIGlzIG5vdCBhIHN5bWJvbCEnKTtcbiAgfSxcbiAgdXNlU2V0dGVyOiBmdW5jdGlvbigpeyBzZXR0ZXIgPSB0cnVlOyB9LFxuICB1c2VTaW1wbGU6IGZ1bmN0aW9uKCl7IHNldHRlciA9IGZhbHNlOyB9XG59KTtcblxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAhVVNFX05BVElWRSwgJ09iamVjdCcsIHtcbiAgLy8gMTkuMS4yLjIgT2JqZWN0LmNyZWF0ZShPIFssIFByb3BlcnRpZXNdKVxuICBjcmVhdGU6ICRjcmVhdGUsXG4gIC8vIDE5LjEuMi40IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKVxuICBkZWZpbmVQcm9wZXJ0eTogJGRlZmluZVByb3BlcnR5LFxuICAvLyAxOS4xLjIuMyBPYmplY3QuZGVmaW5lUHJvcGVydGllcyhPLCBQcm9wZXJ0aWVzKVxuICBkZWZpbmVQcm9wZXJ0aWVzOiAkZGVmaW5lUHJvcGVydGllcyxcbiAgLy8gMTkuMS4yLjYgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihPLCBQKVxuICBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I6ICRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IsXG4gIC8vIDE5LjEuMi43IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKE8pXG4gIGdldE93blByb3BlcnR5TmFtZXM6ICRnZXRPd25Qcm9wZXJ0eU5hbWVzLFxuICAvLyAxOS4xLjIuOCBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKE8pXG4gIGdldE93blByb3BlcnR5U3ltYm9sczogJGdldE93blByb3BlcnR5U3ltYm9sc1xufSk7XG5cbi8vIDI0LjMuMiBKU09OLnN0cmluZ2lmeSh2YWx1ZSBbLCByZXBsYWNlciBbLCBzcGFjZV1dKVxuJEpTT04gJiYgJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAoIVVTRV9OQVRJVkUgfHwgJGZhaWxzKGZ1bmN0aW9uKCl7XG4gIHZhciBTID0gJFN5bWJvbCgpO1xuICAvLyBNUyBFZGdlIGNvbnZlcnRzIHN5bWJvbCB2YWx1ZXMgdG8gSlNPTiBhcyB7fVxuICAvLyBXZWJLaXQgY29udmVydHMgc3ltYm9sIHZhbHVlcyB0byBKU09OIGFzIG51bGxcbiAgLy8gVjggdGhyb3dzIG9uIGJveGVkIHN5bWJvbHNcbiAgcmV0dXJuIF9zdHJpbmdpZnkoW1NdKSAhPSAnW251bGxdJyB8fCBfc3RyaW5naWZ5KHthOiBTfSkgIT0gJ3t9JyB8fCBfc3RyaW5naWZ5KE9iamVjdChTKSkgIT0gJ3t9Jztcbn0pKSwgJ0pTT04nLCB7XG4gIHN0cmluZ2lmeTogZnVuY3Rpb24gc3RyaW5naWZ5KGl0KXtcbiAgICBpZihpdCA9PT0gdW5kZWZpbmVkIHx8IGlzU3ltYm9sKGl0KSlyZXR1cm47IC8vIElFOCByZXR1cm5zIHN0cmluZyBvbiB1bmRlZmluZWRcbiAgICB2YXIgYXJncyA9IFtpdF1cbiAgICAgICwgaSAgICA9IDFcbiAgICAgICwgcmVwbGFjZXIsICRyZXBsYWNlcjtcbiAgICB3aGlsZShhcmd1bWVudHMubGVuZ3RoID4gaSlhcmdzLnB1c2goYXJndW1lbnRzW2krK10pO1xuICAgIHJlcGxhY2VyID0gYXJnc1sxXTtcbiAgICBpZih0eXBlb2YgcmVwbGFjZXIgPT0gJ2Z1bmN0aW9uJykkcmVwbGFjZXIgPSByZXBsYWNlcjtcbiAgICBpZigkcmVwbGFjZXIgfHwgIWlzQXJyYXkocmVwbGFjZXIpKXJlcGxhY2VyID0gZnVuY3Rpb24oa2V5LCB2YWx1ZSl7XG4gICAgICBpZigkcmVwbGFjZXIpdmFsdWUgPSAkcmVwbGFjZXIuY2FsbCh0aGlzLCBrZXksIHZhbHVlKTtcbiAgICAgIGlmKCFpc1N5bWJvbCh2YWx1ZSkpcmV0dXJuIHZhbHVlO1xuICAgIH07XG4gICAgYXJnc1sxXSA9IHJlcGxhY2VyO1xuICAgIHJldHVybiBfc3RyaW5naWZ5LmFwcGx5KCRKU09OLCBhcmdzKTtcbiAgfVxufSk7XG5cbi8vIDE5LjQuMy40IFN5bWJvbC5wcm90b3R5cGVbQEB0b1ByaW1pdGl2ZV0oaGludClcbiRTeW1ib2xbUFJPVE9UWVBFXVtUT19QUklNSVRJVkVdIHx8IHJlcXVpcmUoJy4vX2hpZGUnKSgkU3ltYm9sW1BST1RPVFlQRV0sIFRPX1BSSU1JVElWRSwgJFN5bWJvbFtQUk9UT1RZUEVdLnZhbHVlT2YpO1xuLy8gMTkuNC4zLjUgU3ltYm9sLnByb3RvdHlwZVtAQHRvU3RyaW5nVGFnXVxuc2V0VG9TdHJpbmdUYWcoJFN5bWJvbCwgJ1N5bWJvbCcpO1xuLy8gMjAuMi4xLjkgTWF0aFtAQHRvU3RyaW5nVGFnXVxuc2V0VG9TdHJpbmdUYWcoTWF0aCwgJ01hdGgnLCB0cnVlKTtcbi8vIDI0LjMuMyBKU09OW0BAdG9TdHJpbmdUYWddXG5zZXRUb1N0cmluZ1RhZyhnbG9iYWwuSlNPTiwgJ0pTT04nLCB0cnVlKTsiLCIvLyBodHRwczovL2dpdGh1Yi5jb20vdGMzOS9wcm9wb3NhbC1vYmplY3QtdmFsdWVzLWVudHJpZXNcbnZhciAkZXhwb3J0ICA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4gICwgJGVudHJpZXMgPSByZXF1aXJlKCcuL19vYmplY3QtdG8tYXJyYXknKSh0cnVlKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMsICdPYmplY3QnLCB7XG4gIGVudHJpZXM6IGZ1bmN0aW9uIGVudHJpZXMoaXQpe1xuICAgIHJldHVybiAkZW50cmllcyhpdCk7XG4gIH1cbn0pOyIsInJlcXVpcmUoJy4vX3drcy1kZWZpbmUnKSgnYXN5bmNJdGVyYXRvcicpOyIsInJlcXVpcmUoJy4vX3drcy1kZWZpbmUnKSgnb2JzZXJ2YWJsZScpOyIsInJlcXVpcmUoJy4vZXM2LmFycmF5Lml0ZXJhdG9yJyk7XG52YXIgZ2xvYmFsICAgICAgICA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpXG4gICwgaGlkZSAgICAgICAgICA9IHJlcXVpcmUoJy4vX2hpZGUnKVxuICAsIEl0ZXJhdG9ycyAgICAgPSByZXF1aXJlKCcuL19pdGVyYXRvcnMnKVxuICAsIFRPX1NUUklOR19UQUcgPSByZXF1aXJlKCcuL193a3MnKSgndG9TdHJpbmdUYWcnKTtcblxuZm9yKHZhciBjb2xsZWN0aW9ucyA9IFsnTm9kZUxpc3QnLCAnRE9NVG9rZW5MaXN0JywgJ01lZGlhTGlzdCcsICdTdHlsZVNoZWV0TGlzdCcsICdDU1NSdWxlTGlzdCddLCBpID0gMDsgaSA8IDU7IGkrKyl7XG4gIHZhciBOQU1FICAgICAgID0gY29sbGVjdGlvbnNbaV1cbiAgICAsIENvbGxlY3Rpb24gPSBnbG9iYWxbTkFNRV1cbiAgICAsIHByb3RvICAgICAgPSBDb2xsZWN0aW9uICYmIENvbGxlY3Rpb24ucHJvdG90eXBlO1xuICBpZihwcm90byAmJiAhcHJvdG9bVE9fU1RSSU5HX1RBR10paGlkZShwcm90bywgVE9fU1RSSU5HX1RBRywgTkFNRSk7XG4gIEl0ZXJhdG9yc1tOQU1FXSA9IEl0ZXJhdG9ycy5BcnJheTtcbn0iLCJ2YXIgaGFzaENsZWFyID0gcmVxdWlyZSgnLi9faGFzaENsZWFyJyksXG4gICAgaGFzaERlbGV0ZSA9IHJlcXVpcmUoJy4vX2hhc2hEZWxldGUnKSxcbiAgICBoYXNoR2V0ID0gcmVxdWlyZSgnLi9faGFzaEdldCcpLFxuICAgIGhhc2hIYXMgPSByZXF1aXJlKCcuL19oYXNoSGFzJyksXG4gICAgaGFzaFNldCA9IHJlcXVpcmUoJy4vX2hhc2hTZXQnKTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgaGFzaCBvYmplY3QuXG4gKlxuICogQHByaXZhdGVcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtBcnJheX0gW2VudHJpZXNdIFRoZSBrZXktdmFsdWUgcGFpcnMgdG8gY2FjaGUuXG4gKi9cbmZ1bmN0aW9uIEhhc2goZW50cmllcykge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGVudHJpZXMgPyBlbnRyaWVzLmxlbmd0aCA6IDA7XG5cbiAgdGhpcy5jbGVhcigpO1xuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciBlbnRyeSA9IGVudHJpZXNbaW5kZXhdO1xuICAgIHRoaXMuc2V0KGVudHJ5WzBdLCBlbnRyeVsxXSk7XG4gIH1cbn1cblxuLy8gQWRkIG1ldGhvZHMgdG8gYEhhc2hgLlxuSGFzaC5wcm90b3R5cGUuY2xlYXIgPSBoYXNoQ2xlYXI7XG5IYXNoLnByb3RvdHlwZVsnZGVsZXRlJ10gPSBoYXNoRGVsZXRlO1xuSGFzaC5wcm90b3R5cGUuZ2V0ID0gaGFzaEdldDtcbkhhc2gucHJvdG90eXBlLmhhcyA9IGhhc2hIYXM7XG5IYXNoLnByb3RvdHlwZS5zZXQgPSBoYXNoU2V0O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEhhc2g7XG4iLCJ2YXIgbGlzdENhY2hlQ2xlYXIgPSByZXF1aXJlKCcuL19saXN0Q2FjaGVDbGVhcicpLFxuICAgIGxpc3RDYWNoZURlbGV0ZSA9IHJlcXVpcmUoJy4vX2xpc3RDYWNoZURlbGV0ZScpLFxuICAgIGxpc3RDYWNoZUdldCA9IHJlcXVpcmUoJy4vX2xpc3RDYWNoZUdldCcpLFxuICAgIGxpc3RDYWNoZUhhcyA9IHJlcXVpcmUoJy4vX2xpc3RDYWNoZUhhcycpLFxuICAgIGxpc3RDYWNoZVNldCA9IHJlcXVpcmUoJy4vX2xpc3RDYWNoZVNldCcpO1xuXG4vKipcbiAqIENyZWF0ZXMgYW4gbGlzdCBjYWNoZSBvYmplY3QuXG4gKlxuICogQHByaXZhdGVcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtBcnJheX0gW2VudHJpZXNdIFRoZSBrZXktdmFsdWUgcGFpcnMgdG8gY2FjaGUuXG4gKi9cbmZ1bmN0aW9uIExpc3RDYWNoZShlbnRyaWVzKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gZW50cmllcyA/IGVudHJpZXMubGVuZ3RoIDogMDtcblxuICB0aGlzLmNsZWFyKCk7XG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdmFyIGVudHJ5ID0gZW50cmllc1tpbmRleF07XG4gICAgdGhpcy5zZXQoZW50cnlbMF0sIGVudHJ5WzFdKTtcbiAgfVxufVxuXG4vLyBBZGQgbWV0aG9kcyB0byBgTGlzdENhY2hlYC5cbkxpc3RDYWNoZS5wcm90b3R5cGUuY2xlYXIgPSBsaXN0Q2FjaGVDbGVhcjtcbkxpc3RDYWNoZS5wcm90b3R5cGVbJ2RlbGV0ZSddID0gbGlzdENhY2hlRGVsZXRlO1xuTGlzdENhY2hlLnByb3RvdHlwZS5nZXQgPSBsaXN0Q2FjaGVHZXQ7XG5MaXN0Q2FjaGUucHJvdG90eXBlLmhhcyA9IGxpc3RDYWNoZUhhcztcbkxpc3RDYWNoZS5wcm90b3R5cGUuc2V0ID0gbGlzdENhY2hlU2V0O1xuXG5tb2R1bGUuZXhwb3J0cyA9IExpc3RDYWNoZTtcbiIsInZhciBnZXROYXRpdmUgPSByZXF1aXJlKCcuL19nZXROYXRpdmUnKSxcbiAgICByb290ID0gcmVxdWlyZSgnLi9fcm9vdCcpO1xuXG4vKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyB0aGF0IGFyZSB2ZXJpZmllZCB0byBiZSBuYXRpdmUuICovXG52YXIgTWFwID0gZ2V0TmF0aXZlKHJvb3QsICdNYXAnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBNYXA7XG4iLCJ2YXIgbWFwQ2FjaGVDbGVhciA9IHJlcXVpcmUoJy4vX21hcENhY2hlQ2xlYXInKSxcbiAgICBtYXBDYWNoZURlbGV0ZSA9IHJlcXVpcmUoJy4vX21hcENhY2hlRGVsZXRlJyksXG4gICAgbWFwQ2FjaGVHZXQgPSByZXF1aXJlKCcuL19tYXBDYWNoZUdldCcpLFxuICAgIG1hcENhY2hlSGFzID0gcmVxdWlyZSgnLi9fbWFwQ2FjaGVIYXMnKSxcbiAgICBtYXBDYWNoZVNldCA9IHJlcXVpcmUoJy4vX21hcENhY2hlU2V0Jyk7XG5cbi8qKlxuICogQ3JlYXRlcyBhIG1hcCBjYWNoZSBvYmplY3QgdG8gc3RvcmUga2V5LXZhbHVlIHBhaXJzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7QXJyYXl9IFtlbnRyaWVzXSBUaGUga2V5LXZhbHVlIHBhaXJzIHRvIGNhY2hlLlxuICovXG5mdW5jdGlvbiBNYXBDYWNoZShlbnRyaWVzKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gZW50cmllcyA/IGVudHJpZXMubGVuZ3RoIDogMDtcblxuICB0aGlzLmNsZWFyKCk7XG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdmFyIGVudHJ5ID0gZW50cmllc1tpbmRleF07XG4gICAgdGhpcy5zZXQoZW50cnlbMF0sIGVudHJ5WzFdKTtcbiAgfVxufVxuXG4vLyBBZGQgbWV0aG9kcyB0byBgTWFwQ2FjaGVgLlxuTWFwQ2FjaGUucHJvdG90eXBlLmNsZWFyID0gbWFwQ2FjaGVDbGVhcjtcbk1hcENhY2hlLnByb3RvdHlwZVsnZGVsZXRlJ10gPSBtYXBDYWNoZURlbGV0ZTtcbk1hcENhY2hlLnByb3RvdHlwZS5nZXQgPSBtYXBDYWNoZUdldDtcbk1hcENhY2hlLnByb3RvdHlwZS5oYXMgPSBtYXBDYWNoZUhhcztcbk1hcENhY2hlLnByb3RvdHlwZS5zZXQgPSBtYXBDYWNoZVNldDtcblxubW9kdWxlLmV4cG9ydHMgPSBNYXBDYWNoZTtcbiIsInZhciBMaXN0Q2FjaGUgPSByZXF1aXJlKCcuL19MaXN0Q2FjaGUnKSxcbiAgICBzdGFja0NsZWFyID0gcmVxdWlyZSgnLi9fc3RhY2tDbGVhcicpLFxuICAgIHN0YWNrRGVsZXRlID0gcmVxdWlyZSgnLi9fc3RhY2tEZWxldGUnKSxcbiAgICBzdGFja0dldCA9IHJlcXVpcmUoJy4vX3N0YWNrR2V0JyksXG4gICAgc3RhY2tIYXMgPSByZXF1aXJlKCcuL19zdGFja0hhcycpLFxuICAgIHN0YWNrU2V0ID0gcmVxdWlyZSgnLi9fc3RhY2tTZXQnKTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgc3RhY2sgY2FjaGUgb2JqZWN0IHRvIHN0b3JlIGtleS12YWx1ZSBwYWlycy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge0FycmF5fSBbZW50cmllc10gVGhlIGtleS12YWx1ZSBwYWlycyB0byBjYWNoZS5cbiAqL1xuZnVuY3Rpb24gU3RhY2soZW50cmllcykge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX18gPSBuZXcgTGlzdENhY2hlKGVudHJpZXMpO1xuICB0aGlzLnNpemUgPSBkYXRhLnNpemU7XG59XG5cbi8vIEFkZCBtZXRob2RzIHRvIGBTdGFja2AuXG5TdGFjay5wcm90b3R5cGUuY2xlYXIgPSBzdGFja0NsZWFyO1xuU3RhY2sucHJvdG90eXBlWydkZWxldGUnXSA9IHN0YWNrRGVsZXRlO1xuU3RhY2sucHJvdG90eXBlLmdldCA9IHN0YWNrR2V0O1xuU3RhY2sucHJvdG90eXBlLmhhcyA9IHN0YWNrSGFzO1xuU3RhY2sucHJvdG90eXBlLnNldCA9IHN0YWNrU2V0O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFN0YWNrO1xuIiwidmFyIHJvb3QgPSByZXF1aXJlKCcuL19yb290Jyk7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIFVpbnQ4QXJyYXkgPSByb290LlVpbnQ4QXJyYXk7XG5cbm1vZHVsZS5leHBvcnRzID0gVWludDhBcnJheTtcbiIsIi8qKlxuICogQSBmYXN0ZXIgYWx0ZXJuYXRpdmUgdG8gYEZ1bmN0aW9uI2FwcGx5YCwgdGhpcyBmdW5jdGlvbiBpbnZva2VzIGBmdW5jYFxuICogd2l0aCB0aGUgYHRoaXNgIGJpbmRpbmcgb2YgYHRoaXNBcmdgIGFuZCB0aGUgYXJndW1lbnRzIG9mIGBhcmdzYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gaW52b2tlLlxuICogQHBhcmFtIHsqfSB0aGlzQXJnIFRoZSBgdGhpc2AgYmluZGluZyBvZiBgZnVuY2AuXG4gKiBAcGFyYW0ge0FycmF5fSBhcmdzIFRoZSBhcmd1bWVudHMgdG8gaW52b2tlIGBmdW5jYCB3aXRoLlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIHJlc3VsdCBvZiBgZnVuY2AuXG4gKi9cbmZ1bmN0aW9uIGFwcGx5KGZ1bmMsIHRoaXNBcmcsIGFyZ3MpIHtcbiAgc3dpdGNoIChhcmdzLmxlbmd0aCkge1xuICAgIGNhc2UgMDogcmV0dXJuIGZ1bmMuY2FsbCh0aGlzQXJnKTtcbiAgICBjYXNlIDE6IHJldHVybiBmdW5jLmNhbGwodGhpc0FyZywgYXJnc1swXSk7XG4gICAgY2FzZSAyOiByZXR1cm4gZnVuYy5jYWxsKHRoaXNBcmcsIGFyZ3NbMF0sIGFyZ3NbMV0pO1xuICAgIGNhc2UgMzogcmV0dXJuIGZ1bmMuY2FsbCh0aGlzQXJnLCBhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdKTtcbiAgfVxuICByZXR1cm4gZnVuYy5hcHBseSh0aGlzQXJnLCBhcmdzKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBhcHBseTtcbiIsInZhciBiYXNlVGltZXMgPSByZXF1aXJlKCcuL19iYXNlVGltZXMnKSxcbiAgICBpc0FyZ3VtZW50cyA9IHJlcXVpcmUoJy4vaXNBcmd1bWVudHMnKSxcbiAgICBpc0FycmF5ID0gcmVxdWlyZSgnLi9pc0FycmF5JyksXG4gICAgaXNCdWZmZXIgPSByZXF1aXJlKCcuL2lzQnVmZmVyJyksXG4gICAgaXNJbmRleCA9IHJlcXVpcmUoJy4vX2lzSW5kZXgnKSxcbiAgICBpc1R5cGVkQXJyYXkgPSByZXF1aXJlKCcuL2lzVHlwZWRBcnJheScpO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIENyZWF0ZXMgYW4gYXJyYXkgb2YgdGhlIGVudW1lcmFibGUgcHJvcGVydHkgbmFtZXMgb2YgdGhlIGFycmF5LWxpa2UgYHZhbHVlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IGluaGVyaXRlZCBTcGVjaWZ5IHJldHVybmluZyBpbmhlcml0ZWQgcHJvcGVydHkgbmFtZXMuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzLlxuICovXG5mdW5jdGlvbiBhcnJheUxpa2VLZXlzKHZhbHVlLCBpbmhlcml0ZWQpIHtcbiAgdmFyIGlzQXJyID0gaXNBcnJheSh2YWx1ZSksXG4gICAgICBpc0FyZyA9ICFpc0FyciAmJiBpc0FyZ3VtZW50cyh2YWx1ZSksXG4gICAgICBpc0J1ZmYgPSAhaXNBcnIgJiYgIWlzQXJnICYmIGlzQnVmZmVyKHZhbHVlKSxcbiAgICAgIGlzVHlwZSA9ICFpc0FyciAmJiAhaXNBcmcgJiYgIWlzQnVmZiAmJiBpc1R5cGVkQXJyYXkodmFsdWUpLFxuICAgICAgc2tpcEluZGV4ZXMgPSBpc0FyciB8fCBpc0FyZyB8fCBpc0J1ZmYgfHwgaXNUeXBlLFxuICAgICAgcmVzdWx0ID0gc2tpcEluZGV4ZXMgPyBiYXNlVGltZXModmFsdWUubGVuZ3RoLCBTdHJpbmcpIDogW10sXG4gICAgICBsZW5ndGggPSByZXN1bHQubGVuZ3RoO1xuXG4gIGZvciAodmFyIGtleSBpbiB2YWx1ZSkge1xuICAgIGlmICgoaW5oZXJpdGVkIHx8IGhhc093blByb3BlcnR5LmNhbGwodmFsdWUsIGtleSkpICYmXG4gICAgICAgICEoc2tpcEluZGV4ZXMgJiYgKFxuICAgICAgICAgICAvLyBTYWZhcmkgOSBoYXMgZW51bWVyYWJsZSBgYXJndW1lbnRzLmxlbmd0aGAgaW4gc3RyaWN0IG1vZGUuXG4gICAgICAgICAgIGtleSA9PSAnbGVuZ3RoJyB8fFxuICAgICAgICAgICAvLyBOb2RlLmpzIDAuMTAgaGFzIGVudW1lcmFibGUgbm9uLWluZGV4IHByb3BlcnRpZXMgb24gYnVmZmVycy5cbiAgICAgICAgICAgKGlzQnVmZiAmJiAoa2V5ID09ICdvZmZzZXQnIHx8IGtleSA9PSAncGFyZW50JykpIHx8XG4gICAgICAgICAgIC8vIFBoYW50b21KUyAyIGhhcyBlbnVtZXJhYmxlIG5vbi1pbmRleCBwcm9wZXJ0aWVzIG9uIHR5cGVkIGFycmF5cy5cbiAgICAgICAgICAgKGlzVHlwZSAmJiAoa2V5ID09ICdidWZmZXInIHx8IGtleSA9PSAnYnl0ZUxlbmd0aCcgfHwga2V5ID09ICdieXRlT2Zmc2V0JykpIHx8XG4gICAgICAgICAgIC8vIFNraXAgaW5kZXggcHJvcGVydGllcy5cbiAgICAgICAgICAgaXNJbmRleChrZXksIGxlbmd0aClcbiAgICAgICAgKSkpIHtcbiAgICAgIHJlc3VsdC5wdXNoKGtleSk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYXJyYXlMaWtlS2V5cztcbiIsInZhciBiYXNlQXNzaWduVmFsdWUgPSByZXF1aXJlKCcuL19iYXNlQXNzaWduVmFsdWUnKSxcbiAgICBlcSA9IHJlcXVpcmUoJy4vZXEnKTtcblxuLyoqXG4gKiBUaGlzIGZ1bmN0aW9uIGlzIGxpa2UgYGFzc2lnblZhbHVlYCBleGNlcHQgdGhhdCBpdCBkb2Vzbid0IGFzc2lnblxuICogYHVuZGVmaW5lZGAgdmFsdWVzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gbW9kaWZ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBwcm9wZXJ0eSB0byBhc3NpZ24uXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBhc3NpZ24uXG4gKi9cbmZ1bmN0aW9uIGFzc2lnbk1lcmdlVmFsdWUob2JqZWN0LCBrZXksIHZhbHVlKSB7XG4gIGlmICgodmFsdWUgIT09IHVuZGVmaW5lZCAmJiAhZXEob2JqZWN0W2tleV0sIHZhbHVlKSkgfHxcbiAgICAgICh2YWx1ZSA9PT0gdW5kZWZpbmVkICYmICEoa2V5IGluIG9iamVjdCkpKSB7XG4gICAgYmFzZUFzc2lnblZhbHVlKG9iamVjdCwga2V5LCB2YWx1ZSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBhc3NpZ25NZXJnZVZhbHVlO1xuIiwidmFyIGJhc2VBc3NpZ25WYWx1ZSA9IHJlcXVpcmUoJy4vX2Jhc2VBc3NpZ25WYWx1ZScpLFxuICAgIGVxID0gcmVxdWlyZSgnLi9lcScpO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIEFzc2lnbnMgYHZhbHVlYCB0byBga2V5YCBvZiBgb2JqZWN0YCBpZiB0aGUgZXhpc3RpbmcgdmFsdWUgaXMgbm90IGVxdWl2YWxlbnRcbiAqIHVzaW5nIFtgU2FtZVZhbHVlWmVyb2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLXNhbWV2YWx1ZXplcm8pXG4gKiBmb3IgZXF1YWxpdHkgY29tcGFyaXNvbnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBtb2RpZnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHByb3BlcnR5IHRvIGFzc2lnbi5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGFzc2lnbi5cbiAqL1xuZnVuY3Rpb24gYXNzaWduVmFsdWUob2JqZWN0LCBrZXksIHZhbHVlKSB7XG4gIHZhciBvYmpWYWx1ZSA9IG9iamVjdFtrZXldO1xuICBpZiAoIShoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwga2V5KSAmJiBlcShvYmpWYWx1ZSwgdmFsdWUpKSB8fFxuICAgICAgKHZhbHVlID09PSB1bmRlZmluZWQgJiYgIShrZXkgaW4gb2JqZWN0KSkpIHtcbiAgICBiYXNlQXNzaWduVmFsdWUob2JqZWN0LCBrZXksIHZhbHVlKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFzc2lnblZhbHVlO1xuIiwidmFyIGVxID0gcmVxdWlyZSgnLi9lcScpO1xuXG4vKipcbiAqIEdldHMgdGhlIGluZGV4IGF0IHdoaWNoIHRoZSBga2V5YCBpcyBmb3VuZCBpbiBgYXJyYXlgIG9mIGtleS12YWx1ZSBwYWlycy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGluc3BlY3QuXG4gKiBAcGFyYW0geyp9IGtleSBUaGUga2V5IHRvIHNlYXJjaCBmb3IuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSBpbmRleCBvZiB0aGUgbWF0Y2hlZCB2YWx1ZSwgZWxzZSBgLTFgLlxuICovXG5mdW5jdGlvbiBhc3NvY0luZGV4T2YoYXJyYXksIGtleSkge1xuICB2YXIgbGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuICB3aGlsZSAobGVuZ3RoLS0pIHtcbiAgICBpZiAoZXEoYXJyYXlbbGVuZ3RoXVswXSwga2V5KSkge1xuICAgICAgcmV0dXJuIGxlbmd0aDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIC0xO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFzc29jSW5kZXhPZjtcbiIsInZhciBkZWZpbmVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4vX2RlZmluZVByb3BlcnR5Jyk7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYGFzc2lnblZhbHVlYCBhbmQgYGFzc2lnbk1lcmdlVmFsdWVgIHdpdGhvdXRcbiAqIHZhbHVlIGNoZWNrcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIG1vZGlmeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgcHJvcGVydHkgdG8gYXNzaWduLlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gYXNzaWduLlxuICovXG5mdW5jdGlvbiBiYXNlQXNzaWduVmFsdWUob2JqZWN0LCBrZXksIHZhbHVlKSB7XG4gIGlmIChrZXkgPT0gJ19fcHJvdG9fXycgJiYgZGVmaW5lUHJvcGVydHkpIHtcbiAgICBkZWZpbmVQcm9wZXJ0eShvYmplY3QsIGtleSwge1xuICAgICAgJ2NvbmZpZ3VyYWJsZSc6IHRydWUsXG4gICAgICAnZW51bWVyYWJsZSc6IHRydWUsXG4gICAgICAndmFsdWUnOiB2YWx1ZSxcbiAgICAgICd3cml0YWJsZSc6IHRydWVcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBvYmplY3Rba2V5XSA9IHZhbHVlO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZUFzc2lnblZhbHVlO1xuIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9pc09iamVjdCcpO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RDcmVhdGUgPSBPYmplY3QuY3JlYXRlO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmNyZWF0ZWAgd2l0aG91dCBzdXBwb3J0IGZvciBhc3NpZ25pbmdcbiAqIHByb3BlcnRpZXMgdG8gdGhlIGNyZWF0ZWQgb2JqZWN0LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gcHJvdG8gVGhlIG9iamVjdCB0byBpbmhlcml0IGZyb20uXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBuZXcgb2JqZWN0LlxuICovXG52YXIgYmFzZUNyZWF0ZSA9IChmdW5jdGlvbigpIHtcbiAgZnVuY3Rpb24gb2JqZWN0KCkge31cbiAgcmV0dXJuIGZ1bmN0aW9uKHByb3RvKSB7XG4gICAgaWYgKCFpc09iamVjdChwcm90bykpIHtcbiAgICAgIHJldHVybiB7fTtcbiAgICB9XG4gICAgaWYgKG9iamVjdENyZWF0ZSkge1xuICAgICAgcmV0dXJuIG9iamVjdENyZWF0ZShwcm90byk7XG4gICAgfVxuICAgIG9iamVjdC5wcm90b3R5cGUgPSBwcm90bztcbiAgICB2YXIgcmVzdWx0ID0gbmV3IG9iamVjdDtcbiAgICBvYmplY3QucHJvdG90eXBlID0gdW5kZWZpbmVkO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG59KCkpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VDcmVhdGU7XG4iLCJ2YXIgY3JlYXRlQmFzZUZvciA9IHJlcXVpcmUoJy4vX2NyZWF0ZUJhc2VGb3InKTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgYmFzZUZvck93bmAgd2hpY2ggaXRlcmF0ZXMgb3ZlciBgb2JqZWN0YFxuICogcHJvcGVydGllcyByZXR1cm5lZCBieSBga2V5c0Z1bmNgIGFuZCBpbnZva2VzIGBpdGVyYXRlZWAgZm9yIGVhY2ggcHJvcGVydHkuXG4gKiBJdGVyYXRlZSBmdW5jdGlvbnMgbWF5IGV4aXQgaXRlcmF0aW9uIGVhcmx5IGJ5IGV4cGxpY2l0bHkgcmV0dXJuaW5nIGBmYWxzZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHBhcmFtIHtGdW5jdGlvbn0ga2V5c0Z1bmMgVGhlIGZ1bmN0aW9uIHRvIGdldCB0aGUga2V5cyBvZiBgb2JqZWN0YC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYG9iamVjdGAuXG4gKi9cbnZhciBiYXNlRm9yID0gY3JlYXRlQmFzZUZvcigpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VGb3I7XG4iLCJ2YXIgaXNPYmplY3RMaWtlID0gcmVxdWlyZSgnLi9pc09iamVjdExpa2UnKTtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIGFyZ3NUYWcgPSAnW29iamVjdCBBcmd1bWVudHNdJztcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlXG4gKiBbYHRvU3RyaW5nVGFnYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIG9mIHZhbHVlcy5cbiAqL1xudmFyIG9iamVjdFRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uaXNBcmd1bWVudHNgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIGBhcmd1bWVudHNgIG9iamVjdCxcbiAqL1xuZnVuY3Rpb24gYmFzZUlzQXJndW1lbnRzKHZhbHVlKSB7XG4gIHJldHVybiBpc09iamVjdExpa2UodmFsdWUpICYmIG9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpID09IGFyZ3NUYWc7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZUlzQXJndW1lbnRzO1xuIiwidmFyIGlzRnVuY3Rpb24gPSByZXF1aXJlKCcuL2lzRnVuY3Rpb24nKSxcbiAgICBpc01hc2tlZCA9IHJlcXVpcmUoJy4vX2lzTWFza2VkJyksXG4gICAgaXNPYmplY3QgPSByZXF1aXJlKCcuL2lzT2JqZWN0JyksXG4gICAgdG9Tb3VyY2UgPSByZXF1aXJlKCcuL190b1NvdXJjZScpO1xuXG4vKipcbiAqIFVzZWQgdG8gbWF0Y2ggYFJlZ0V4cGBcbiAqIFtzeW50YXggY2hhcmFjdGVyc10oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtcGF0dGVybnMpLlxuICovXG52YXIgcmVSZWdFeHBDaGFyID0gL1tcXFxcXiQuKis/KClbXFxde318XS9nO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgaG9zdCBjb25zdHJ1Y3RvcnMgKFNhZmFyaSkuICovXG52YXIgcmVJc0hvc3RDdG9yID0gL15cXFtvYmplY3QgLis/Q29uc3RydWN0b3JcXF0kLztcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIGZ1bmNQcm90byA9IEZ1bmN0aW9uLnByb3RvdHlwZSxcbiAgICBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIHJlc29sdmUgdGhlIGRlY29tcGlsZWQgc291cmNlIG9mIGZ1bmN0aW9ucy4gKi9cbnZhciBmdW5jVG9TdHJpbmcgPSBmdW5jUHJvdG8udG9TdHJpbmc7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBpZiBhIG1ldGhvZCBpcyBuYXRpdmUuICovXG52YXIgcmVJc05hdGl2ZSA9IFJlZ0V4cCgnXicgK1xuICBmdW5jVG9TdHJpbmcuY2FsbChoYXNPd25Qcm9wZXJ0eSkucmVwbGFjZShyZVJlZ0V4cENoYXIsICdcXFxcJCYnKVxuICAucmVwbGFjZSgvaGFzT3duUHJvcGVydHl8KGZ1bmN0aW9uKS4qPyg/PVxcXFxcXCgpfCBmb3IgLis/KD89XFxcXFxcXSkvZywgJyQxLio/JykgKyAnJCdcbik7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uaXNOYXRpdmVgIHdpdGhvdXQgYmFkIHNoaW0gY2hlY2tzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgbmF0aXZlIGZ1bmN0aW9uLFxuICogIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUlzTmF0aXZlKHZhbHVlKSB7XG4gIGlmICghaXNPYmplY3QodmFsdWUpIHx8IGlzTWFza2VkKHZhbHVlKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICB2YXIgcGF0dGVybiA9IGlzRnVuY3Rpb24odmFsdWUpID8gcmVJc05hdGl2ZSA6IHJlSXNIb3N0Q3RvcjtcbiAgcmV0dXJuIHBhdHRlcm4udGVzdCh0b1NvdXJjZSh2YWx1ZSkpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VJc05hdGl2ZTtcbiIsInZhciBpc0xlbmd0aCA9IHJlcXVpcmUoJy4vaXNMZW5ndGgnKSxcbiAgICBpc09iamVjdExpa2UgPSByZXF1aXJlKCcuL2lzT2JqZWN0TGlrZScpO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgYXJnc1RhZyA9ICdbb2JqZWN0IEFyZ3VtZW50c10nLFxuICAgIGFycmF5VGFnID0gJ1tvYmplY3QgQXJyYXldJyxcbiAgICBib29sVGFnID0gJ1tvYmplY3QgQm9vbGVhbl0nLFxuICAgIGRhdGVUYWcgPSAnW29iamVjdCBEYXRlXScsXG4gICAgZXJyb3JUYWcgPSAnW29iamVjdCBFcnJvcl0nLFxuICAgIGZ1bmNUYWcgPSAnW29iamVjdCBGdW5jdGlvbl0nLFxuICAgIG1hcFRhZyA9ICdbb2JqZWN0IE1hcF0nLFxuICAgIG51bWJlclRhZyA9ICdbb2JqZWN0IE51bWJlcl0nLFxuICAgIG9iamVjdFRhZyA9ICdbb2JqZWN0IE9iamVjdF0nLFxuICAgIHJlZ2V4cFRhZyA9ICdbb2JqZWN0IFJlZ0V4cF0nLFxuICAgIHNldFRhZyA9ICdbb2JqZWN0IFNldF0nLFxuICAgIHN0cmluZ1RhZyA9ICdbb2JqZWN0IFN0cmluZ10nLFxuICAgIHdlYWtNYXBUYWcgPSAnW29iamVjdCBXZWFrTWFwXSc7XG5cbnZhciBhcnJheUJ1ZmZlclRhZyA9ICdbb2JqZWN0IEFycmF5QnVmZmVyXScsXG4gICAgZGF0YVZpZXdUYWcgPSAnW29iamVjdCBEYXRhVmlld10nLFxuICAgIGZsb2F0MzJUYWcgPSAnW29iamVjdCBGbG9hdDMyQXJyYXldJyxcbiAgICBmbG9hdDY0VGFnID0gJ1tvYmplY3QgRmxvYXQ2NEFycmF5XScsXG4gICAgaW50OFRhZyA9ICdbb2JqZWN0IEludDhBcnJheV0nLFxuICAgIGludDE2VGFnID0gJ1tvYmplY3QgSW50MTZBcnJheV0nLFxuICAgIGludDMyVGFnID0gJ1tvYmplY3QgSW50MzJBcnJheV0nLFxuICAgIHVpbnQ4VGFnID0gJ1tvYmplY3QgVWludDhBcnJheV0nLFxuICAgIHVpbnQ4Q2xhbXBlZFRhZyA9ICdbb2JqZWN0IFVpbnQ4Q2xhbXBlZEFycmF5XScsXG4gICAgdWludDE2VGFnID0gJ1tvYmplY3QgVWludDE2QXJyYXldJyxcbiAgICB1aW50MzJUYWcgPSAnW29iamVjdCBVaW50MzJBcnJheV0nO1xuXG4vKiogVXNlZCB0byBpZGVudGlmeSBgdG9TdHJpbmdUYWdgIHZhbHVlcyBvZiB0eXBlZCBhcnJheXMuICovXG52YXIgdHlwZWRBcnJheVRhZ3MgPSB7fTtcbnR5cGVkQXJyYXlUYWdzW2Zsb2F0MzJUYWddID0gdHlwZWRBcnJheVRhZ3NbZmxvYXQ2NFRhZ10gPVxudHlwZWRBcnJheVRhZ3NbaW50OFRhZ10gPSB0eXBlZEFycmF5VGFnc1tpbnQxNlRhZ10gPVxudHlwZWRBcnJheVRhZ3NbaW50MzJUYWddID0gdHlwZWRBcnJheVRhZ3NbdWludDhUYWddID1cbnR5cGVkQXJyYXlUYWdzW3VpbnQ4Q2xhbXBlZFRhZ10gPSB0eXBlZEFycmF5VGFnc1t1aW50MTZUYWddID1cbnR5cGVkQXJyYXlUYWdzW3VpbnQzMlRhZ10gPSB0cnVlO1xudHlwZWRBcnJheVRhZ3NbYXJnc1RhZ10gPSB0eXBlZEFycmF5VGFnc1thcnJheVRhZ10gPVxudHlwZWRBcnJheVRhZ3NbYXJyYXlCdWZmZXJUYWddID0gdHlwZWRBcnJheVRhZ3NbYm9vbFRhZ10gPVxudHlwZWRBcnJheVRhZ3NbZGF0YVZpZXdUYWddID0gdHlwZWRBcnJheVRhZ3NbZGF0ZVRhZ10gPVxudHlwZWRBcnJheVRhZ3NbZXJyb3JUYWddID0gdHlwZWRBcnJheVRhZ3NbZnVuY1RhZ10gPVxudHlwZWRBcnJheVRhZ3NbbWFwVGFnXSA9IHR5cGVkQXJyYXlUYWdzW251bWJlclRhZ10gPVxudHlwZWRBcnJheVRhZ3Nbb2JqZWN0VGFnXSA9IHR5cGVkQXJyYXlUYWdzW3JlZ2V4cFRhZ10gPVxudHlwZWRBcnJheVRhZ3Nbc2V0VGFnXSA9IHR5cGVkQXJyYXlUYWdzW3N0cmluZ1RhZ10gPVxudHlwZWRBcnJheVRhZ3Nbd2Vha01hcFRhZ10gPSBmYWxzZTtcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlXG4gKiBbYHRvU3RyaW5nVGFnYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIG9mIHZhbHVlcy5cbiAqL1xudmFyIG9iamVjdFRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uaXNUeXBlZEFycmF5YCB3aXRob3V0IE5vZGUuanMgb3B0aW1pemF0aW9ucy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHR5cGVkIGFycmF5LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VJc1R5cGVkQXJyYXkodmFsdWUpIHtcbiAgcmV0dXJuIGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiZcbiAgICBpc0xlbmd0aCh2YWx1ZS5sZW5ndGgpICYmICEhdHlwZWRBcnJheVRhZ3Nbb2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSldO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VJc1R5cGVkQXJyYXk7XG4iLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL2lzT2JqZWN0JyksXG4gICAgaXNQcm90b3R5cGUgPSByZXF1aXJlKCcuL19pc1Byb3RvdHlwZScpLFxuICAgIG5hdGl2ZUtleXNJbiA9IHJlcXVpcmUoJy4vX25hdGl2ZUtleXNJbicpO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmtleXNJbmAgd2hpY2ggZG9lc24ndCB0cmVhdCBzcGFyc2UgYXJyYXlzIGFzIGRlbnNlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzLlxuICovXG5mdW5jdGlvbiBiYXNlS2V5c0luKG9iamVjdCkge1xuICBpZiAoIWlzT2JqZWN0KG9iamVjdCkpIHtcbiAgICByZXR1cm4gbmF0aXZlS2V5c0luKG9iamVjdCk7XG4gIH1cbiAgdmFyIGlzUHJvdG8gPSBpc1Byb3RvdHlwZShvYmplY3QpLFxuICAgICAgcmVzdWx0ID0gW107XG5cbiAgZm9yICh2YXIga2V5IGluIG9iamVjdCkge1xuICAgIGlmICghKGtleSA9PSAnY29uc3RydWN0b3InICYmIChpc1Byb3RvIHx8ICFoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwga2V5KSkpKSB7XG4gICAgICByZXN1bHQucHVzaChrZXkpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VLZXlzSW47XG4iLCJ2YXIgU3RhY2sgPSByZXF1aXJlKCcuL19TdGFjaycpLFxuICAgIGFzc2lnbk1lcmdlVmFsdWUgPSByZXF1aXJlKCcuL19hc3NpZ25NZXJnZVZhbHVlJyksXG4gICAgYmFzZUZvciA9IHJlcXVpcmUoJy4vX2Jhc2VGb3InKSxcbiAgICBiYXNlTWVyZ2VEZWVwID0gcmVxdWlyZSgnLi9fYmFzZU1lcmdlRGVlcCcpLFxuICAgIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9pc09iamVjdCcpLFxuICAgIGtleXNJbiA9IHJlcXVpcmUoJy4va2V5c0luJyk7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8ubWVyZ2VgIHdpdGhvdXQgc3VwcG9ydCBmb3IgbXVsdGlwbGUgc291cmNlcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgZGVzdGluYXRpb24gb2JqZWN0LlxuICogQHBhcmFtIHtPYmplY3R9IHNvdXJjZSBUaGUgc291cmNlIG9iamVjdC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBzcmNJbmRleCBUaGUgaW5kZXggb2YgYHNvdXJjZWAuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY3VzdG9taXplcl0gVGhlIGZ1bmN0aW9uIHRvIGN1c3RvbWl6ZSBtZXJnZWQgdmFsdWVzLlxuICogQHBhcmFtIHtPYmplY3R9IFtzdGFja10gVHJhY2tzIHRyYXZlcnNlZCBzb3VyY2UgdmFsdWVzIGFuZCB0aGVpciBtZXJnZWRcbiAqICBjb3VudGVycGFydHMuXG4gKi9cbmZ1bmN0aW9uIGJhc2VNZXJnZShvYmplY3QsIHNvdXJjZSwgc3JjSW5kZXgsIGN1c3RvbWl6ZXIsIHN0YWNrKSB7XG4gIGlmIChvYmplY3QgPT09IHNvdXJjZSkge1xuICAgIHJldHVybjtcbiAgfVxuICBiYXNlRm9yKHNvdXJjZSwgZnVuY3Rpb24oc3JjVmFsdWUsIGtleSkge1xuICAgIGlmIChpc09iamVjdChzcmNWYWx1ZSkpIHtcbiAgICAgIHN0YWNrIHx8IChzdGFjayA9IG5ldyBTdGFjayk7XG4gICAgICBiYXNlTWVyZ2VEZWVwKG9iamVjdCwgc291cmNlLCBrZXksIHNyY0luZGV4LCBiYXNlTWVyZ2UsIGN1c3RvbWl6ZXIsIHN0YWNrKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB2YXIgbmV3VmFsdWUgPSBjdXN0b21pemVyXG4gICAgICAgID8gY3VzdG9taXplcihvYmplY3Rba2V5XSwgc3JjVmFsdWUsIChrZXkgKyAnJyksIG9iamVjdCwgc291cmNlLCBzdGFjaylcbiAgICAgICAgOiB1bmRlZmluZWQ7XG5cbiAgICAgIGlmIChuZXdWYWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIG5ld1ZhbHVlID0gc3JjVmFsdWU7XG4gICAgICB9XG4gICAgICBhc3NpZ25NZXJnZVZhbHVlKG9iamVjdCwga2V5LCBuZXdWYWx1ZSk7XG4gICAgfVxuICB9LCBrZXlzSW4pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VNZXJnZTtcbiIsInZhciBhc3NpZ25NZXJnZVZhbHVlID0gcmVxdWlyZSgnLi9fYXNzaWduTWVyZ2VWYWx1ZScpLFxuICAgIGNsb25lQnVmZmVyID0gcmVxdWlyZSgnLi9fY2xvbmVCdWZmZXInKSxcbiAgICBjbG9uZVR5cGVkQXJyYXkgPSByZXF1aXJlKCcuL19jbG9uZVR5cGVkQXJyYXknKSxcbiAgICBjb3B5QXJyYXkgPSByZXF1aXJlKCcuL19jb3B5QXJyYXknKSxcbiAgICBpbml0Q2xvbmVPYmplY3QgPSByZXF1aXJlKCcuL19pbml0Q2xvbmVPYmplY3QnKSxcbiAgICBpc0FyZ3VtZW50cyA9IHJlcXVpcmUoJy4vaXNBcmd1bWVudHMnKSxcbiAgICBpc0FycmF5ID0gcmVxdWlyZSgnLi9pc0FycmF5JyksXG4gICAgaXNBcnJheUxpa2VPYmplY3QgPSByZXF1aXJlKCcuL2lzQXJyYXlMaWtlT2JqZWN0JyksXG4gICAgaXNCdWZmZXIgPSByZXF1aXJlKCcuL2lzQnVmZmVyJyksXG4gICAgaXNGdW5jdGlvbiA9IHJlcXVpcmUoJy4vaXNGdW5jdGlvbicpLFxuICAgIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9pc09iamVjdCcpLFxuICAgIGlzUGxhaW5PYmplY3QgPSByZXF1aXJlKCcuL2lzUGxhaW5PYmplY3QnKSxcbiAgICBpc1R5cGVkQXJyYXkgPSByZXF1aXJlKCcuL2lzVHlwZWRBcnJheScpLFxuICAgIHRvUGxhaW5PYmplY3QgPSByZXF1aXJlKCcuL3RvUGxhaW5PYmplY3QnKTtcblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYGJhc2VNZXJnZWAgZm9yIGFycmF5cyBhbmQgb2JqZWN0cyB3aGljaCBwZXJmb3Jtc1xuICogZGVlcCBtZXJnZXMgYW5kIHRyYWNrcyB0cmF2ZXJzZWQgb2JqZWN0cyBlbmFibGluZyBvYmplY3RzIHdpdGggY2lyY3VsYXJcbiAqIHJlZmVyZW5jZXMgdG8gYmUgbWVyZ2VkLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBkZXN0aW5hdGlvbiBvYmplY3QuXG4gKiBAcGFyYW0ge09iamVjdH0gc291cmNlIFRoZSBzb3VyY2Ugb2JqZWN0LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBtZXJnZS5cbiAqIEBwYXJhbSB7bnVtYmVyfSBzcmNJbmRleCBUaGUgaW5kZXggb2YgYHNvdXJjZWAuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBtZXJnZUZ1bmMgVGhlIGZ1bmN0aW9uIHRvIG1lcmdlIHZhbHVlcy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IFtjdXN0b21pemVyXSBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIGFzc2lnbmVkIHZhbHVlcy5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbc3RhY2tdIFRyYWNrcyB0cmF2ZXJzZWQgc291cmNlIHZhbHVlcyBhbmQgdGhlaXIgbWVyZ2VkXG4gKiAgY291bnRlcnBhcnRzLlxuICovXG5mdW5jdGlvbiBiYXNlTWVyZ2VEZWVwKG9iamVjdCwgc291cmNlLCBrZXksIHNyY0luZGV4LCBtZXJnZUZ1bmMsIGN1c3RvbWl6ZXIsIHN0YWNrKSB7XG4gIHZhciBvYmpWYWx1ZSA9IG9iamVjdFtrZXldLFxuICAgICAgc3JjVmFsdWUgPSBzb3VyY2Vba2V5XSxcbiAgICAgIHN0YWNrZWQgPSBzdGFjay5nZXQoc3JjVmFsdWUpO1xuXG4gIGlmIChzdGFja2VkKSB7XG4gICAgYXNzaWduTWVyZ2VWYWx1ZShvYmplY3QsIGtleSwgc3RhY2tlZCk7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhciBuZXdWYWx1ZSA9IGN1c3RvbWl6ZXJcbiAgICA/IGN1c3RvbWl6ZXIob2JqVmFsdWUsIHNyY1ZhbHVlLCAoa2V5ICsgJycpLCBvYmplY3QsIHNvdXJjZSwgc3RhY2spXG4gICAgOiB1bmRlZmluZWQ7XG5cbiAgdmFyIGlzQ29tbW9uID0gbmV3VmFsdWUgPT09IHVuZGVmaW5lZDtcblxuICBpZiAoaXNDb21tb24pIHtcbiAgICB2YXIgaXNBcnIgPSBpc0FycmF5KHNyY1ZhbHVlKSxcbiAgICAgICAgaXNCdWZmID0gIWlzQXJyICYmIGlzQnVmZmVyKHNyY1ZhbHVlKSxcbiAgICAgICAgaXNUeXBlZCA9ICFpc0FyciAmJiAhaXNCdWZmICYmIGlzVHlwZWRBcnJheShzcmNWYWx1ZSk7XG5cbiAgICBuZXdWYWx1ZSA9IHNyY1ZhbHVlO1xuICAgIGlmIChpc0FyciB8fCBpc0J1ZmYgfHwgaXNUeXBlZCkge1xuICAgICAgaWYgKGlzQXJyYXkob2JqVmFsdWUpKSB7XG4gICAgICAgIG5ld1ZhbHVlID0gb2JqVmFsdWU7XG4gICAgICB9XG4gICAgICBlbHNlIGlmIChpc0FycmF5TGlrZU9iamVjdChvYmpWYWx1ZSkpIHtcbiAgICAgICAgbmV3VmFsdWUgPSBjb3B5QXJyYXkob2JqVmFsdWUpO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAoaXNCdWZmKSB7XG4gICAgICAgIGlzQ29tbW9uID0gZmFsc2U7XG4gICAgICAgIG5ld1ZhbHVlID0gY2xvbmVCdWZmZXIoc3JjVmFsdWUsIHRydWUpO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAoaXNUeXBlZCkge1xuICAgICAgICBpc0NvbW1vbiA9IGZhbHNlO1xuICAgICAgICBuZXdWYWx1ZSA9IGNsb25lVHlwZWRBcnJheShzcmNWYWx1ZSwgdHJ1ZSk7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgbmV3VmFsdWUgPSBbXTtcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSBpZiAoaXNQbGFpbk9iamVjdChzcmNWYWx1ZSkgfHwgaXNBcmd1bWVudHMoc3JjVmFsdWUpKSB7XG4gICAgICBuZXdWYWx1ZSA9IG9ialZhbHVlO1xuICAgICAgaWYgKGlzQXJndW1lbnRzKG9ialZhbHVlKSkge1xuICAgICAgICBuZXdWYWx1ZSA9IHRvUGxhaW5PYmplY3Qob2JqVmFsdWUpO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAoIWlzT2JqZWN0KG9ialZhbHVlKSB8fCAoc3JjSW5kZXggJiYgaXNGdW5jdGlvbihvYmpWYWx1ZSkpKSB7XG4gICAgICAgIG5ld1ZhbHVlID0gaW5pdENsb25lT2JqZWN0KHNyY1ZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBpc0NvbW1vbiA9IGZhbHNlO1xuICAgIH1cbiAgfVxuICBpZiAoaXNDb21tb24pIHtcbiAgICAvLyBSZWN1cnNpdmVseSBtZXJnZSBvYmplY3RzIGFuZCBhcnJheXMgKHN1c2NlcHRpYmxlIHRvIGNhbGwgc3RhY2sgbGltaXRzKS5cbiAgICBzdGFjay5zZXQoc3JjVmFsdWUsIG5ld1ZhbHVlKTtcbiAgICBtZXJnZUZ1bmMobmV3VmFsdWUsIHNyY1ZhbHVlLCBzcmNJbmRleCwgY3VzdG9taXplciwgc3RhY2spO1xuICAgIHN0YWNrWydkZWxldGUnXShzcmNWYWx1ZSk7XG4gIH1cbiAgYXNzaWduTWVyZ2VWYWx1ZShvYmplY3QsIGtleSwgbmV3VmFsdWUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VNZXJnZURlZXA7XG4iLCJ2YXIgaWRlbnRpdHkgPSByZXF1aXJlKCcuL2lkZW50aXR5JyksXG4gICAgb3ZlclJlc3QgPSByZXF1aXJlKCcuL19vdmVyUmVzdCcpLFxuICAgIHNldFRvU3RyaW5nID0gcmVxdWlyZSgnLi9fc2V0VG9TdHJpbmcnKTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5yZXN0YCB3aGljaCBkb2Vzbid0IHZhbGlkYXRlIG9yIGNvZXJjZSBhcmd1bWVudHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGFwcGx5IGEgcmVzdCBwYXJhbWV0ZXIgdG8uXG4gKiBAcGFyYW0ge251bWJlcn0gW3N0YXJ0PWZ1bmMubGVuZ3RoLTFdIFRoZSBzdGFydCBwb3NpdGlvbiBvZiB0aGUgcmVzdCBwYXJhbWV0ZXIuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gYmFzZVJlc3QoZnVuYywgc3RhcnQpIHtcbiAgcmV0dXJuIHNldFRvU3RyaW5nKG92ZXJSZXN0KGZ1bmMsIHN0YXJ0LCBpZGVudGl0eSksIGZ1bmMgKyAnJyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYmFzZVJlc3Q7XG4iLCJ2YXIgY29uc3RhbnQgPSByZXF1aXJlKCcuL2NvbnN0YW50JyksXG4gICAgZGVmaW5lUHJvcGVydHkgPSByZXF1aXJlKCcuL19kZWZpbmVQcm9wZXJ0eScpLFxuICAgIGlkZW50aXR5ID0gcmVxdWlyZSgnLi9pZGVudGl0eScpO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBzZXRUb1N0cmluZ2Agd2l0aG91dCBzdXBwb3J0IGZvciBob3QgbG9vcCBzaG9ydGluZy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gbW9kaWZ5LlxuICogQHBhcmFtIHtGdW5jdGlvbn0gc3RyaW5nIFRoZSBgdG9TdHJpbmdgIHJlc3VsdC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyBgZnVuY2AuXG4gKi9cbnZhciBiYXNlU2V0VG9TdHJpbmcgPSAhZGVmaW5lUHJvcGVydHkgPyBpZGVudGl0eSA6IGZ1bmN0aW9uKGZ1bmMsIHN0cmluZykge1xuICByZXR1cm4gZGVmaW5lUHJvcGVydHkoZnVuYywgJ3RvU3RyaW5nJywge1xuICAgICdjb25maWd1cmFibGUnOiB0cnVlLFxuICAgICdlbnVtZXJhYmxlJzogZmFsc2UsXG4gICAgJ3ZhbHVlJzogY29uc3RhbnQoc3RyaW5nKSxcbiAgICAnd3JpdGFibGUnOiB0cnVlXG4gIH0pO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlU2V0VG9TdHJpbmc7XG4iLCIvKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnRpbWVzYCB3aXRob3V0IHN1cHBvcnQgZm9yIGl0ZXJhdGVlIHNob3J0aGFuZHNcbiAqIG9yIG1heCBhcnJheSBsZW5ndGggY2hlY2tzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge251bWJlcn0gbiBUaGUgbnVtYmVyIG9mIHRpbWVzIHRvIGludm9rZSBgaXRlcmF0ZWVgLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcmVzdWx0cy5cbiAqL1xuZnVuY3Rpb24gYmFzZVRpbWVzKG4sIGl0ZXJhdGVlKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgcmVzdWx0ID0gQXJyYXkobik7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBuKSB7XG4gICAgcmVzdWx0W2luZGV4XSA9IGl0ZXJhdGVlKGluZGV4KTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGJhc2VUaW1lcztcbiIsIi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8udW5hcnlgIHdpdGhvdXQgc3VwcG9ydCBmb3Igc3RvcmluZyBtZXRhZGF0YS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gY2FwIGFyZ3VtZW50cyBmb3IuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBjYXBwZWQgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGJhc2VVbmFyeShmdW5jKSB7XG4gIHJldHVybiBmdW5jdGlvbih2YWx1ZSkge1xuICAgIHJldHVybiBmdW5jKHZhbHVlKTtcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlVW5hcnk7XG4iLCJ2YXIgVWludDhBcnJheSA9IHJlcXVpcmUoJy4vX1VpbnQ4QXJyYXknKTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgY2xvbmUgb2YgYGFycmF5QnVmZmVyYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheUJ1ZmZlcn0gYXJyYXlCdWZmZXIgVGhlIGFycmF5IGJ1ZmZlciB0byBjbG9uZS5cbiAqIEByZXR1cm5zIHtBcnJheUJ1ZmZlcn0gUmV0dXJucyB0aGUgY2xvbmVkIGFycmF5IGJ1ZmZlci5cbiAqL1xuZnVuY3Rpb24gY2xvbmVBcnJheUJ1ZmZlcihhcnJheUJ1ZmZlcikge1xuICB2YXIgcmVzdWx0ID0gbmV3IGFycmF5QnVmZmVyLmNvbnN0cnVjdG9yKGFycmF5QnVmZmVyLmJ5dGVMZW5ndGgpO1xuICBuZXcgVWludDhBcnJheShyZXN1bHQpLnNldChuZXcgVWludDhBcnJheShhcnJheUJ1ZmZlcikpO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNsb25lQXJyYXlCdWZmZXI7XG4iLCJ2YXIgcm9vdCA9IHJlcXVpcmUoJy4vX3Jvb3QnKTtcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBleHBvcnRzYC4gKi9cbnZhciBmcmVlRXhwb3J0cyA9IHR5cGVvZiBleHBvcnRzID09ICdvYmplY3QnICYmIGV4cG9ydHMgJiYgIWV4cG9ydHMubm9kZVR5cGUgJiYgZXhwb3J0cztcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBtb2R1bGVgLiAqL1xudmFyIGZyZWVNb2R1bGUgPSBmcmVlRXhwb3J0cyAmJiB0eXBlb2YgbW9kdWxlID09ICdvYmplY3QnICYmIG1vZHVsZSAmJiAhbW9kdWxlLm5vZGVUeXBlICYmIG1vZHVsZTtcblxuLyoqIERldGVjdCB0aGUgcG9wdWxhciBDb21tb25KUyBleHRlbnNpb24gYG1vZHVsZS5leHBvcnRzYC4gKi9cbnZhciBtb2R1bGVFeHBvcnRzID0gZnJlZU1vZHVsZSAmJiBmcmVlTW9kdWxlLmV4cG9ydHMgPT09IGZyZWVFeHBvcnRzO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBCdWZmZXIgPSBtb2R1bGVFeHBvcnRzID8gcm9vdC5CdWZmZXIgOiB1bmRlZmluZWQsXG4gICAgYWxsb2NVbnNhZmUgPSBCdWZmZXIgPyBCdWZmZXIuYWxsb2NVbnNhZmUgOiB1bmRlZmluZWQ7XG5cbi8qKlxuICogQ3JlYXRlcyBhIGNsb25lIG9mICBgYnVmZmVyYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtCdWZmZXJ9IGJ1ZmZlciBUaGUgYnVmZmVyIHRvIGNsb25lLlxuICogQHBhcmFtIHtib29sZWFufSBbaXNEZWVwXSBTcGVjaWZ5IGEgZGVlcCBjbG9uZS5cbiAqIEByZXR1cm5zIHtCdWZmZXJ9IFJldHVybnMgdGhlIGNsb25lZCBidWZmZXIuXG4gKi9cbmZ1bmN0aW9uIGNsb25lQnVmZmVyKGJ1ZmZlciwgaXNEZWVwKSB7XG4gIGlmIChpc0RlZXApIHtcbiAgICByZXR1cm4gYnVmZmVyLnNsaWNlKCk7XG4gIH1cbiAgdmFyIGxlbmd0aCA9IGJ1ZmZlci5sZW5ndGgsXG4gICAgICByZXN1bHQgPSBhbGxvY1Vuc2FmZSA/IGFsbG9jVW5zYWZlKGxlbmd0aCkgOiBuZXcgYnVmZmVyLmNvbnN0cnVjdG9yKGxlbmd0aCk7XG5cbiAgYnVmZmVyLmNvcHkocmVzdWx0KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjbG9uZUJ1ZmZlcjtcbiIsInZhciBjbG9uZUFycmF5QnVmZmVyID0gcmVxdWlyZSgnLi9fY2xvbmVBcnJheUJ1ZmZlcicpO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBjbG9uZSBvZiBgdHlwZWRBcnJheWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSB0eXBlZEFycmF5IFRoZSB0eXBlZCBhcnJheSB0byBjbG9uZS5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2lzRGVlcF0gU3BlY2lmeSBhIGRlZXAgY2xvbmUuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBjbG9uZWQgdHlwZWQgYXJyYXkuXG4gKi9cbmZ1bmN0aW9uIGNsb25lVHlwZWRBcnJheSh0eXBlZEFycmF5LCBpc0RlZXApIHtcbiAgdmFyIGJ1ZmZlciA9IGlzRGVlcCA/IGNsb25lQXJyYXlCdWZmZXIodHlwZWRBcnJheS5idWZmZXIpIDogdHlwZWRBcnJheS5idWZmZXI7XG4gIHJldHVybiBuZXcgdHlwZWRBcnJheS5jb25zdHJ1Y3RvcihidWZmZXIsIHR5cGVkQXJyYXkuYnl0ZU9mZnNldCwgdHlwZWRBcnJheS5sZW5ndGgpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNsb25lVHlwZWRBcnJheTtcbiIsIi8qKlxuICogQ29waWVzIHRoZSB2YWx1ZXMgb2YgYHNvdXJjZWAgdG8gYGFycmF5YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gc291cmNlIFRoZSBhcnJheSB0byBjb3B5IHZhbHVlcyBmcm9tLlxuICogQHBhcmFtIHtBcnJheX0gW2FycmF5PVtdXSBUaGUgYXJyYXkgdG8gY29weSB2YWx1ZXMgdG8uXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgYGFycmF5YC5cbiAqL1xuZnVuY3Rpb24gY29weUFycmF5KHNvdXJjZSwgYXJyYXkpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBzb3VyY2UubGVuZ3RoO1xuXG4gIGFycmF5IHx8IChhcnJheSA9IEFycmF5KGxlbmd0aCkpO1xuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIGFycmF5W2luZGV4XSA9IHNvdXJjZVtpbmRleF07XG4gIH1cbiAgcmV0dXJuIGFycmF5O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNvcHlBcnJheTtcbiIsInZhciBhc3NpZ25WYWx1ZSA9IHJlcXVpcmUoJy4vX2Fzc2lnblZhbHVlJyksXG4gICAgYmFzZUFzc2lnblZhbHVlID0gcmVxdWlyZSgnLi9fYmFzZUFzc2lnblZhbHVlJyk7XG5cbi8qKlxuICogQ29waWVzIHByb3BlcnRpZXMgb2YgYHNvdXJjZWAgdG8gYG9iamVjdGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBzb3VyY2UgVGhlIG9iamVjdCB0byBjb3B5IHByb3BlcnRpZXMgZnJvbS5cbiAqIEBwYXJhbSB7QXJyYXl9IHByb3BzIFRoZSBwcm9wZXJ0eSBpZGVudGlmaWVycyB0byBjb3B5LlxuICogQHBhcmFtIHtPYmplY3R9IFtvYmplY3Q9e31dIFRoZSBvYmplY3QgdG8gY29weSBwcm9wZXJ0aWVzIHRvLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2N1c3RvbWl6ZXJdIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgY29waWVkIHZhbHVlcy5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYG9iamVjdGAuXG4gKi9cbmZ1bmN0aW9uIGNvcHlPYmplY3Qoc291cmNlLCBwcm9wcywgb2JqZWN0LCBjdXN0b21pemVyKSB7XG4gIHZhciBpc05ldyA9ICFvYmplY3Q7XG4gIG9iamVjdCB8fCAob2JqZWN0ID0ge30pO1xuXG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gcHJvcHMubGVuZ3RoO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdmFyIGtleSA9IHByb3BzW2luZGV4XTtcblxuICAgIHZhciBuZXdWYWx1ZSA9IGN1c3RvbWl6ZXJcbiAgICAgID8gY3VzdG9taXplcihvYmplY3Rba2V5XSwgc291cmNlW2tleV0sIGtleSwgb2JqZWN0LCBzb3VyY2UpXG4gICAgICA6IHVuZGVmaW5lZDtcblxuICAgIGlmIChuZXdWYWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBuZXdWYWx1ZSA9IHNvdXJjZVtrZXldO1xuICAgIH1cbiAgICBpZiAoaXNOZXcpIHtcbiAgICAgIGJhc2VBc3NpZ25WYWx1ZShvYmplY3QsIGtleSwgbmV3VmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBhc3NpZ25WYWx1ZShvYmplY3QsIGtleSwgbmV3VmFsdWUpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gb2JqZWN0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNvcHlPYmplY3Q7XG4iLCJ2YXIgcm9vdCA9IHJlcXVpcmUoJy4vX3Jvb3QnKTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IG92ZXJyZWFjaGluZyBjb3JlLWpzIHNoaW1zLiAqL1xudmFyIGNvcmVKc0RhdGEgPSByb290WydfX2NvcmUtanNfc2hhcmVkX18nXTtcblxubW9kdWxlLmV4cG9ydHMgPSBjb3JlSnNEYXRhO1xuIiwidmFyIGJhc2VSZXN0ID0gcmVxdWlyZSgnLi9fYmFzZVJlc3QnKSxcbiAgICBpc0l0ZXJhdGVlQ2FsbCA9IHJlcXVpcmUoJy4vX2lzSXRlcmF0ZWVDYWxsJyk7XG5cbi8qKlxuICogQ3JlYXRlcyBhIGZ1bmN0aW9uIGxpa2UgYF8uYXNzaWduYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gYXNzaWduZXIgVGhlIGZ1bmN0aW9uIHRvIGFzc2lnbiB2YWx1ZXMuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBhc3NpZ25lciBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gY3JlYXRlQXNzaWduZXIoYXNzaWduZXIpIHtcbiAgcmV0dXJuIGJhc2VSZXN0KGZ1bmN0aW9uKG9iamVjdCwgc291cmNlcykge1xuICAgIHZhciBpbmRleCA9IC0xLFxuICAgICAgICBsZW5ndGggPSBzb3VyY2VzLmxlbmd0aCxcbiAgICAgICAgY3VzdG9taXplciA9IGxlbmd0aCA+IDEgPyBzb3VyY2VzW2xlbmd0aCAtIDFdIDogdW5kZWZpbmVkLFxuICAgICAgICBndWFyZCA9IGxlbmd0aCA+IDIgPyBzb3VyY2VzWzJdIDogdW5kZWZpbmVkO1xuXG4gICAgY3VzdG9taXplciA9IChhc3NpZ25lci5sZW5ndGggPiAzICYmIHR5cGVvZiBjdXN0b21pemVyID09ICdmdW5jdGlvbicpXG4gICAgICA/IChsZW5ndGgtLSwgY3VzdG9taXplcilcbiAgICAgIDogdW5kZWZpbmVkO1xuXG4gICAgaWYgKGd1YXJkICYmIGlzSXRlcmF0ZWVDYWxsKHNvdXJjZXNbMF0sIHNvdXJjZXNbMV0sIGd1YXJkKSkge1xuICAgICAgY3VzdG9taXplciA9IGxlbmd0aCA8IDMgPyB1bmRlZmluZWQgOiBjdXN0b21pemVyO1xuICAgICAgbGVuZ3RoID0gMTtcbiAgICB9XG4gICAgb2JqZWN0ID0gT2JqZWN0KG9iamVjdCk7XG4gICAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICAgIHZhciBzb3VyY2UgPSBzb3VyY2VzW2luZGV4XTtcbiAgICAgIGlmIChzb3VyY2UpIHtcbiAgICAgICAgYXNzaWduZXIob2JqZWN0LCBzb3VyY2UsIGluZGV4LCBjdXN0b21pemVyKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG9iamVjdDtcbiAgfSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY3JlYXRlQXNzaWduZXI7XG4iLCIvKipcbiAqIENyZWF0ZXMgYSBiYXNlIGZ1bmN0aW9uIGZvciBtZXRob2RzIGxpa2UgYF8uZm9ySW5gIGFuZCBgXy5mb3JPd25gLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtmcm9tUmlnaHRdIFNwZWNpZnkgaXRlcmF0aW5nIGZyb20gcmlnaHQgdG8gbGVmdC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGJhc2UgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUJhc2VGb3IoZnJvbVJpZ2h0KSB7XG4gIHJldHVybiBmdW5jdGlvbihvYmplY3QsIGl0ZXJhdGVlLCBrZXlzRnVuYykge1xuICAgIHZhciBpbmRleCA9IC0xLFxuICAgICAgICBpdGVyYWJsZSA9IE9iamVjdChvYmplY3QpLFxuICAgICAgICBwcm9wcyA9IGtleXNGdW5jKG9iamVjdCksXG4gICAgICAgIGxlbmd0aCA9IHByb3BzLmxlbmd0aDtcblxuICAgIHdoaWxlIChsZW5ndGgtLSkge1xuICAgICAgdmFyIGtleSA9IHByb3BzW2Zyb21SaWdodCA/IGxlbmd0aCA6ICsraW5kZXhdO1xuICAgICAgaWYgKGl0ZXJhdGVlKGl0ZXJhYmxlW2tleV0sIGtleSwgaXRlcmFibGUpID09PSBmYWxzZSkge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG9iamVjdDtcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVCYXNlRm9yO1xuIiwidmFyIGdldE5hdGl2ZSA9IHJlcXVpcmUoJy4vX2dldE5hdGl2ZScpO1xuXG52YXIgZGVmaW5lUHJvcGVydHkgPSAoZnVuY3Rpb24oKSB7XG4gIHRyeSB7XG4gICAgdmFyIGZ1bmMgPSBnZXROYXRpdmUoT2JqZWN0LCAnZGVmaW5lUHJvcGVydHknKTtcbiAgICBmdW5jKHt9LCAnJywge30pO1xuICAgIHJldHVybiBmdW5jO1xuICB9IGNhdGNoIChlKSB7fVxufSgpKTtcblxubW9kdWxlLmV4cG9ydHMgPSBkZWZpbmVQcm9wZXJ0eTtcbiIsIi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgZ2xvYmFsYCBmcm9tIE5vZGUuanMuICovXG52YXIgZnJlZUdsb2JhbCA9IHR5cGVvZiBnbG9iYWwgPT0gJ29iamVjdCcgJiYgZ2xvYmFsICYmIGdsb2JhbC5PYmplY3QgPT09IE9iamVjdCAmJiBnbG9iYWw7XG5cbm1vZHVsZS5leHBvcnRzID0gZnJlZUdsb2JhbDtcbiIsInZhciBpc0tleWFibGUgPSByZXF1aXJlKCcuL19pc0tleWFibGUnKTtcblxuLyoqXG4gKiBHZXRzIHRoZSBkYXRhIGZvciBgbWFwYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG1hcCBUaGUgbWFwIHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUgcmVmZXJlbmNlIGtleS5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBtYXAgZGF0YS5cbiAqL1xuZnVuY3Rpb24gZ2V0TWFwRGF0YShtYXAsIGtleSkge1xuICB2YXIgZGF0YSA9IG1hcC5fX2RhdGFfXztcbiAgcmV0dXJuIGlzS2V5YWJsZShrZXkpXG4gICAgPyBkYXRhW3R5cGVvZiBrZXkgPT0gJ3N0cmluZycgPyAnc3RyaW5nJyA6ICdoYXNoJ11cbiAgICA6IGRhdGEubWFwO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGdldE1hcERhdGE7XG4iLCJ2YXIgYmFzZUlzTmF0aXZlID0gcmVxdWlyZSgnLi9fYmFzZUlzTmF0aXZlJyksXG4gICAgZ2V0VmFsdWUgPSByZXF1aXJlKCcuL19nZXRWYWx1ZScpO1xuXG4vKipcbiAqIEdldHMgdGhlIG5hdGl2ZSBmdW5jdGlvbiBhdCBga2V5YCBvZiBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBtZXRob2QgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIGZ1bmN0aW9uIGlmIGl0J3MgbmF0aXZlLCBlbHNlIGB1bmRlZmluZWRgLlxuICovXG5mdW5jdGlvbiBnZXROYXRpdmUob2JqZWN0LCBrZXkpIHtcbiAgdmFyIHZhbHVlID0gZ2V0VmFsdWUob2JqZWN0LCBrZXkpO1xuICByZXR1cm4gYmFzZUlzTmF0aXZlKHZhbHVlKSA/IHZhbHVlIDogdW5kZWZpbmVkO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGdldE5hdGl2ZTtcbiIsInZhciBvdmVyQXJnID0gcmVxdWlyZSgnLi9fb3ZlckFyZycpO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBnZXRQcm90b3R5cGUgPSBvdmVyQXJnKE9iamVjdC5nZXRQcm90b3R5cGVPZiwgT2JqZWN0KTtcblxubW9kdWxlLmV4cG9ydHMgPSBnZXRQcm90b3R5cGU7XG4iLCIvKipcbiAqIEdldHMgdGhlIHZhbHVlIGF0IGBrZXlgIG9mIGBvYmplY3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gW29iamVjdF0gVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgcHJvcGVydHkgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIHByb3BlcnR5IHZhbHVlLlxuICovXG5mdW5jdGlvbiBnZXRWYWx1ZShvYmplY3QsIGtleSkge1xuICByZXR1cm4gb2JqZWN0ID09IG51bGwgPyB1bmRlZmluZWQgOiBvYmplY3Rba2V5XTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBnZXRWYWx1ZTtcbiIsInZhciBuYXRpdmVDcmVhdGUgPSByZXF1aXJlKCcuL19uYXRpdmVDcmVhdGUnKTtcblxuLyoqXG4gKiBSZW1vdmVzIGFsbCBrZXktdmFsdWUgZW50cmllcyBmcm9tIHRoZSBoYXNoLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBjbGVhclxuICogQG1lbWJlck9mIEhhc2hcbiAqL1xuZnVuY3Rpb24gaGFzaENsZWFyKCkge1xuICB0aGlzLl9fZGF0YV9fID0gbmF0aXZlQ3JlYXRlID8gbmF0aXZlQ3JlYXRlKG51bGwpIDoge307XG4gIHRoaXMuc2l6ZSA9IDA7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaGFzaENsZWFyO1xuIiwiLyoqXG4gKiBSZW1vdmVzIGBrZXlgIGFuZCBpdHMgdmFsdWUgZnJvbSB0aGUgaGFzaC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZGVsZXRlXG4gKiBAbWVtYmVyT2YgSGFzaFxuICogQHBhcmFtIHtPYmplY3R9IGhhc2ggVGhlIGhhc2ggdG8gbW9kaWZ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byByZW1vdmUuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGVudHJ5IHdhcyByZW1vdmVkLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGhhc2hEZWxldGUoa2V5KSB7XG4gIHZhciByZXN1bHQgPSB0aGlzLmhhcyhrZXkpICYmIGRlbGV0ZSB0aGlzLl9fZGF0YV9fW2tleV07XG4gIHRoaXMuc2l6ZSAtPSByZXN1bHQgPyAxIDogMDtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBoYXNoRGVsZXRlO1xuIiwidmFyIG5hdGl2ZUNyZWF0ZSA9IHJlcXVpcmUoJy4vX25hdGl2ZUNyZWF0ZScpO1xuXG4vKiogVXNlZCB0byBzdGFuZC1pbiBmb3IgYHVuZGVmaW5lZGAgaGFzaCB2YWx1ZXMuICovXG52YXIgSEFTSF9VTkRFRklORUQgPSAnX19sb2Rhc2hfaGFzaF91bmRlZmluZWRfXyc7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKlxuICogR2V0cyB0aGUgaGFzaCB2YWx1ZSBmb3IgYGtleWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGdldFxuICogQG1lbWJlck9mIEhhc2hcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIGVudHJ5IHZhbHVlLlxuICovXG5mdW5jdGlvbiBoYXNoR2V0KGtleSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX187XG4gIGlmIChuYXRpdmVDcmVhdGUpIHtcbiAgICB2YXIgcmVzdWx0ID0gZGF0YVtrZXldO1xuICAgIHJldHVybiByZXN1bHQgPT09IEhBU0hfVU5ERUZJTkVEID8gdW5kZWZpbmVkIDogcmVzdWx0O1xuICB9XG4gIHJldHVybiBoYXNPd25Qcm9wZXJ0eS5jYWxsKGRhdGEsIGtleSkgPyBkYXRhW2tleV0gOiB1bmRlZmluZWQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaGFzaEdldDtcbiIsInZhciBuYXRpdmVDcmVhdGUgPSByZXF1aXJlKCcuL19uYXRpdmVDcmVhdGUnKTtcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYSBoYXNoIHZhbHVlIGZvciBga2V5YCBleGlzdHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGhhc1xuICogQG1lbWJlck9mIEhhc2hcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgZW50cnkgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYW4gZW50cnkgZm9yIGBrZXlgIGV4aXN0cywgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBoYXNoSGFzKGtleSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX187XG4gIHJldHVybiBuYXRpdmVDcmVhdGUgPyBkYXRhW2tleV0gIT09IHVuZGVmaW5lZCA6IGhhc093blByb3BlcnR5LmNhbGwoZGF0YSwga2V5KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBoYXNoSGFzO1xuIiwidmFyIG5hdGl2ZUNyZWF0ZSA9IHJlcXVpcmUoJy4vX25hdGl2ZUNyZWF0ZScpO1xuXG4vKiogVXNlZCB0byBzdGFuZC1pbiBmb3IgYHVuZGVmaW5lZGAgaGFzaCB2YWx1ZXMuICovXG52YXIgSEFTSF9VTkRFRklORUQgPSAnX19sb2Rhc2hfaGFzaF91bmRlZmluZWRfXyc7XG5cbi8qKlxuICogU2V0cyB0aGUgaGFzaCBga2V5YCB0byBgdmFsdWVgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBzZXRcbiAqIEBtZW1iZXJPZiBIYXNoXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHNldC5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHNldC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIGhhc2ggaW5zdGFuY2UuXG4gKi9cbmZ1bmN0aW9uIGhhc2hTZXQoa2V5LCB2YWx1ZSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX187XG4gIHRoaXMuc2l6ZSArPSB0aGlzLmhhcyhrZXkpID8gMCA6IDE7XG4gIGRhdGFba2V5XSA9IChuYXRpdmVDcmVhdGUgJiYgdmFsdWUgPT09IHVuZGVmaW5lZCkgPyBIQVNIX1VOREVGSU5FRCA6IHZhbHVlO1xuICByZXR1cm4gdGhpcztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBoYXNoU2V0O1xuIiwidmFyIGJhc2VDcmVhdGUgPSByZXF1aXJlKCcuL19iYXNlQ3JlYXRlJyksXG4gICAgZ2V0UHJvdG90eXBlID0gcmVxdWlyZSgnLi9fZ2V0UHJvdG90eXBlJyksXG4gICAgaXNQcm90b3R5cGUgPSByZXF1aXJlKCcuL19pc1Byb3RvdHlwZScpO1xuXG4vKipcbiAqIEluaXRpYWxpemVzIGFuIG9iamVjdCBjbG9uZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGNsb25lLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgaW5pdGlhbGl6ZWQgY2xvbmUuXG4gKi9cbmZ1bmN0aW9uIGluaXRDbG9uZU9iamVjdChvYmplY3QpIHtcbiAgcmV0dXJuICh0eXBlb2Ygb2JqZWN0LmNvbnN0cnVjdG9yID09ICdmdW5jdGlvbicgJiYgIWlzUHJvdG90eXBlKG9iamVjdCkpXG4gICAgPyBiYXNlQ3JlYXRlKGdldFByb3RvdHlwZShvYmplY3QpKVxuICAgIDoge307XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5pdENsb25lT2JqZWN0O1xuIiwiLyoqIFVzZWQgYXMgcmVmZXJlbmNlcyBmb3IgdmFyaW91cyBgTnVtYmVyYCBjb25zdGFudHMuICovXG52YXIgTUFYX1NBRkVfSU5URUdFUiA9IDkwMDcxOTkyNTQ3NDA5OTE7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCB1bnNpZ25lZCBpbnRlZ2VyIHZhbHVlcy4gKi9cbnZhciByZUlzVWludCA9IC9eKD86MHxbMS05XVxcZCopJC87XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBhcnJheS1saWtlIGluZGV4LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbbGVuZ3RoPU1BWF9TQUZFX0lOVEVHRVJdIFRoZSB1cHBlciBib3VuZHMgb2YgYSB2YWxpZCBpbmRleC5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgaW5kZXgsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNJbmRleCh2YWx1ZSwgbGVuZ3RoKSB7XG4gIGxlbmd0aCA9IGxlbmd0aCA9PSBudWxsID8gTUFYX1NBRkVfSU5URUdFUiA6IGxlbmd0aDtcbiAgcmV0dXJuICEhbGVuZ3RoICYmXG4gICAgKHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJyB8fCByZUlzVWludC50ZXN0KHZhbHVlKSkgJiZcbiAgICAodmFsdWUgPiAtMSAmJiB2YWx1ZSAlIDEgPT0gMCAmJiB2YWx1ZSA8IGxlbmd0aCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNJbmRleDtcbiIsInZhciBlcSA9IHJlcXVpcmUoJy4vZXEnKSxcbiAgICBpc0FycmF5TGlrZSA9IHJlcXVpcmUoJy4vaXNBcnJheUxpa2UnKSxcbiAgICBpc0luZGV4ID0gcmVxdWlyZSgnLi9faXNJbmRleCcpLFxuICAgIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9pc09iamVjdCcpO1xuXG4vKipcbiAqIENoZWNrcyBpZiB0aGUgZ2l2ZW4gYXJndW1lbnRzIGFyZSBmcm9tIGFuIGl0ZXJhdGVlIGNhbGwuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHBvdGVudGlhbCBpdGVyYXRlZSB2YWx1ZSBhcmd1bWVudC5cbiAqIEBwYXJhbSB7Kn0gaW5kZXggVGhlIHBvdGVudGlhbCBpdGVyYXRlZSBpbmRleCBvciBrZXkgYXJndW1lbnQuXG4gKiBAcGFyYW0geyp9IG9iamVjdCBUaGUgcG90ZW50aWFsIGl0ZXJhdGVlIG9iamVjdCBhcmd1bWVudC5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgYXJndW1lbnRzIGFyZSBmcm9tIGFuIGl0ZXJhdGVlIGNhbGwsXG4gKiAgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0l0ZXJhdGVlQ2FsbCh2YWx1ZSwgaW5kZXgsIG9iamVjdCkge1xuICBpZiAoIWlzT2JqZWN0KG9iamVjdCkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIHR5cGUgPSB0eXBlb2YgaW5kZXg7XG4gIGlmICh0eXBlID09ICdudW1iZXInXG4gICAgICAgID8gKGlzQXJyYXlMaWtlKG9iamVjdCkgJiYgaXNJbmRleChpbmRleCwgb2JqZWN0Lmxlbmd0aCkpXG4gICAgICAgIDogKHR5cGUgPT0gJ3N0cmluZycgJiYgaW5kZXggaW4gb2JqZWN0KVxuICAgICAgKSB7XG4gICAgcmV0dXJuIGVxKG9iamVjdFtpbmRleF0sIHZhbHVlKTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNJdGVyYXRlZUNhbGw7XG4iLCIvKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIHN1aXRhYmxlIGZvciB1c2UgYXMgdW5pcXVlIG9iamVjdCBrZXkuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgc3VpdGFibGUsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNLZXlhYmxlKHZhbHVlKSB7XG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbHVlO1xuICByZXR1cm4gKHR5cGUgPT0gJ3N0cmluZycgfHwgdHlwZSA9PSAnbnVtYmVyJyB8fCB0eXBlID09ICdzeW1ib2wnIHx8IHR5cGUgPT0gJ2Jvb2xlYW4nKVxuICAgID8gKHZhbHVlICE9PSAnX19wcm90b19fJylcbiAgICA6ICh2YWx1ZSA9PT0gbnVsbCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNLZXlhYmxlO1xuIiwidmFyIGNvcmVKc0RhdGEgPSByZXF1aXJlKCcuL19jb3JlSnNEYXRhJyk7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBtZXRob2RzIG1hc3F1ZXJhZGluZyBhcyBuYXRpdmUuICovXG52YXIgbWFza1NyY0tleSA9IChmdW5jdGlvbigpIHtcbiAgdmFyIHVpZCA9IC9bXi5dKyQvLmV4ZWMoY29yZUpzRGF0YSAmJiBjb3JlSnNEYXRhLmtleXMgJiYgY29yZUpzRGF0YS5rZXlzLklFX1BST1RPIHx8ICcnKTtcbiAgcmV0dXJuIHVpZCA/ICgnU3ltYm9sKHNyYylfMS4nICsgdWlkKSA6ICcnO1xufSgpKTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYGZ1bmNgIGhhcyBpdHMgc291cmNlIG1hc2tlZC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYGZ1bmNgIGlzIG1hc2tlZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc01hc2tlZChmdW5jKSB7XG4gIHJldHVybiAhIW1hc2tTcmNLZXkgJiYgKG1hc2tTcmNLZXkgaW4gZnVuYyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNNYXNrZWQ7XG4iLCIvKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGxpa2VseSBhIHByb3RvdHlwZSBvYmplY3QuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBwcm90b3R5cGUsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNQcm90b3R5cGUodmFsdWUpIHtcbiAgdmFyIEN0b3IgPSB2YWx1ZSAmJiB2YWx1ZS5jb25zdHJ1Y3RvcixcbiAgICAgIHByb3RvID0gKHR5cGVvZiBDdG9yID09ICdmdW5jdGlvbicgJiYgQ3Rvci5wcm90b3R5cGUpIHx8IG9iamVjdFByb3RvO1xuXG4gIHJldHVybiB2YWx1ZSA9PT0gcHJvdG87XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNQcm90b3R5cGU7XG4iLCIvKipcbiAqIFJlbW92ZXMgYWxsIGtleS12YWx1ZSBlbnRyaWVzIGZyb20gdGhlIGxpc3QgY2FjaGUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGNsZWFyXG4gKiBAbWVtYmVyT2YgTGlzdENhY2hlXG4gKi9cbmZ1bmN0aW9uIGxpc3RDYWNoZUNsZWFyKCkge1xuICB0aGlzLl9fZGF0YV9fID0gW107XG4gIHRoaXMuc2l6ZSA9IDA7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbGlzdENhY2hlQ2xlYXI7XG4iLCJ2YXIgYXNzb2NJbmRleE9mID0gcmVxdWlyZSgnLi9fYXNzb2NJbmRleE9mJyk7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBhcnJheVByb3RvID0gQXJyYXkucHJvdG90eXBlO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBzcGxpY2UgPSBhcnJheVByb3RvLnNwbGljZTtcblxuLyoqXG4gKiBSZW1vdmVzIGBrZXlgIGFuZCBpdHMgdmFsdWUgZnJvbSB0aGUgbGlzdCBjYWNoZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZGVsZXRlXG4gKiBAbWVtYmVyT2YgTGlzdENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHJlbW92ZS5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgZW50cnkgd2FzIHJlbW92ZWQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gbGlzdENhY2hlRGVsZXRlKGtleSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX18sXG4gICAgICBpbmRleCA9IGFzc29jSW5kZXhPZihkYXRhLCBrZXkpO1xuXG4gIGlmIChpbmRleCA8IDApIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIGxhc3RJbmRleCA9IGRhdGEubGVuZ3RoIC0gMTtcbiAgaWYgKGluZGV4ID09IGxhc3RJbmRleCkge1xuICAgIGRhdGEucG9wKCk7XG4gIH0gZWxzZSB7XG4gICAgc3BsaWNlLmNhbGwoZGF0YSwgaW5kZXgsIDEpO1xuICB9XG4gIC0tdGhpcy5zaXplO1xuICByZXR1cm4gdHJ1ZTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBsaXN0Q2FjaGVEZWxldGU7XG4iLCJ2YXIgYXNzb2NJbmRleE9mID0gcmVxdWlyZSgnLi9fYXNzb2NJbmRleE9mJyk7XG5cbi8qKlxuICogR2V0cyB0aGUgbGlzdCBjYWNoZSB2YWx1ZSBmb3IgYGtleWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGdldFxuICogQG1lbWJlck9mIExpc3RDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgZW50cnkgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIGxpc3RDYWNoZUdldChrZXkpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fLFxuICAgICAgaW5kZXggPSBhc3NvY0luZGV4T2YoZGF0YSwga2V5KTtcblxuICByZXR1cm4gaW5kZXggPCAwID8gdW5kZWZpbmVkIDogZGF0YVtpbmRleF1bMV07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbGlzdENhY2hlR2V0O1xuIiwidmFyIGFzc29jSW5kZXhPZiA9IHJlcXVpcmUoJy4vX2Fzc29jSW5kZXhPZicpO1xuXG4vKipcbiAqIENoZWNrcyBpZiBhIGxpc3QgY2FjaGUgdmFsdWUgZm9yIGBrZXlgIGV4aXN0cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgaGFzXG4gKiBAbWVtYmVyT2YgTGlzdENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIGVudHJ5IHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGFuIGVudHJ5IGZvciBga2V5YCBleGlzdHMsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gbGlzdENhY2hlSGFzKGtleSkge1xuICByZXR1cm4gYXNzb2NJbmRleE9mKHRoaXMuX19kYXRhX18sIGtleSkgPiAtMTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBsaXN0Q2FjaGVIYXM7XG4iLCJ2YXIgYXNzb2NJbmRleE9mID0gcmVxdWlyZSgnLi9fYXNzb2NJbmRleE9mJyk7XG5cbi8qKlxuICogU2V0cyB0aGUgbGlzdCBjYWNoZSBga2V5YCB0byBgdmFsdWVgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBzZXRcbiAqIEBtZW1iZXJPZiBMaXN0Q2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gc2V0LlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2V0LlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgbGlzdCBjYWNoZSBpbnN0YW5jZS5cbiAqL1xuZnVuY3Rpb24gbGlzdENhY2hlU2V0KGtleSwgdmFsdWUpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fLFxuICAgICAgaW5kZXggPSBhc3NvY0luZGV4T2YoZGF0YSwga2V5KTtcblxuICBpZiAoaW5kZXggPCAwKSB7XG4gICAgKyt0aGlzLnNpemU7XG4gICAgZGF0YS5wdXNoKFtrZXksIHZhbHVlXSk7XG4gIH0gZWxzZSB7XG4gICAgZGF0YVtpbmRleF1bMV0gPSB2YWx1ZTtcbiAgfVxuICByZXR1cm4gdGhpcztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBsaXN0Q2FjaGVTZXQ7XG4iLCJ2YXIgSGFzaCA9IHJlcXVpcmUoJy4vX0hhc2gnKSxcbiAgICBMaXN0Q2FjaGUgPSByZXF1aXJlKCcuL19MaXN0Q2FjaGUnKSxcbiAgICBNYXAgPSByZXF1aXJlKCcuL19NYXAnKTtcblxuLyoqXG4gKiBSZW1vdmVzIGFsbCBrZXktdmFsdWUgZW50cmllcyBmcm9tIHRoZSBtYXAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGNsZWFyXG4gKiBAbWVtYmVyT2YgTWFwQ2FjaGVcbiAqL1xuZnVuY3Rpb24gbWFwQ2FjaGVDbGVhcigpIHtcbiAgdGhpcy5zaXplID0gMDtcbiAgdGhpcy5fX2RhdGFfXyA9IHtcbiAgICAnaGFzaCc6IG5ldyBIYXNoLFxuICAgICdtYXAnOiBuZXcgKE1hcCB8fCBMaXN0Q2FjaGUpLFxuICAgICdzdHJpbmcnOiBuZXcgSGFzaFxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG1hcENhY2hlQ2xlYXI7XG4iLCJ2YXIgZ2V0TWFwRGF0YSA9IHJlcXVpcmUoJy4vX2dldE1hcERhdGEnKTtcblxuLyoqXG4gKiBSZW1vdmVzIGBrZXlgIGFuZCBpdHMgdmFsdWUgZnJvbSB0aGUgbWFwLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBkZWxldGVcbiAqIEBtZW1iZXJPZiBNYXBDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byByZW1vdmUuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGVudHJ5IHdhcyByZW1vdmVkLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIG1hcENhY2hlRGVsZXRlKGtleSkge1xuICB2YXIgcmVzdWx0ID0gZ2V0TWFwRGF0YSh0aGlzLCBrZXkpWydkZWxldGUnXShrZXkpO1xuICB0aGlzLnNpemUgLT0gcmVzdWx0ID8gMSA6IDA7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbWFwQ2FjaGVEZWxldGU7XG4iLCJ2YXIgZ2V0TWFwRGF0YSA9IHJlcXVpcmUoJy4vX2dldE1hcERhdGEnKTtcblxuLyoqXG4gKiBHZXRzIHRoZSBtYXAgdmFsdWUgZm9yIGBrZXlgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBnZXRcbiAqIEBtZW1iZXJPZiBNYXBDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgZW50cnkgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIG1hcENhY2hlR2V0KGtleSkge1xuICByZXR1cm4gZ2V0TWFwRGF0YSh0aGlzLCBrZXkpLmdldChrZXkpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG1hcENhY2hlR2V0O1xuIiwidmFyIGdldE1hcERhdGEgPSByZXF1aXJlKCcuL19nZXRNYXBEYXRhJyk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGEgbWFwIHZhbHVlIGZvciBga2V5YCBleGlzdHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGhhc1xuICogQG1lbWJlck9mIE1hcENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIGVudHJ5IHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGFuIGVudHJ5IGZvciBga2V5YCBleGlzdHMsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gbWFwQ2FjaGVIYXMoa2V5KSB7XG4gIHJldHVybiBnZXRNYXBEYXRhKHRoaXMsIGtleSkuaGFzKGtleSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gbWFwQ2FjaGVIYXM7XG4iLCJ2YXIgZ2V0TWFwRGF0YSA9IHJlcXVpcmUoJy4vX2dldE1hcERhdGEnKTtcblxuLyoqXG4gKiBTZXRzIHRoZSBtYXAgYGtleWAgdG8gYHZhbHVlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgc2V0XG4gKiBAbWVtYmVyT2YgTWFwQ2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gc2V0LlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2V0LlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgbWFwIGNhY2hlIGluc3RhbmNlLlxuICovXG5mdW5jdGlvbiBtYXBDYWNoZVNldChrZXksIHZhbHVlKSB7XG4gIHZhciBkYXRhID0gZ2V0TWFwRGF0YSh0aGlzLCBrZXkpLFxuICAgICAgc2l6ZSA9IGRhdGEuc2l6ZTtcblxuICBkYXRhLnNldChrZXksIHZhbHVlKTtcbiAgdGhpcy5zaXplICs9IGRhdGEuc2l6ZSA9PSBzaXplID8gMCA6IDE7XG4gIHJldHVybiB0aGlzO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG1hcENhY2hlU2V0O1xuIiwidmFyIGdldE5hdGl2ZSA9IHJlcXVpcmUoJy4vX2dldE5hdGl2ZScpO1xuXG4vKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyB0aGF0IGFyZSB2ZXJpZmllZCB0byBiZSBuYXRpdmUuICovXG52YXIgbmF0aXZlQ3JlYXRlID0gZ2V0TmF0aXZlKE9iamVjdCwgJ2NyZWF0ZScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IG5hdGl2ZUNyZWF0ZTtcbiIsIi8qKlxuICogVGhpcyBmdW5jdGlvbiBpcyBsaWtlXG4gKiBbYE9iamVjdC5rZXlzYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtb2JqZWN0LmtleXMpXG4gKiBleGNlcHQgdGhhdCBpdCBpbmNsdWRlcyBpbmhlcml0ZWQgZW51bWVyYWJsZSBwcm9wZXJ0aWVzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzLlxuICovXG5mdW5jdGlvbiBuYXRpdmVLZXlzSW4ob2JqZWN0KSB7XG4gIHZhciByZXN1bHQgPSBbXTtcbiAgaWYgKG9iamVjdCAhPSBudWxsKSB7XG4gICAgZm9yICh2YXIga2V5IGluIE9iamVjdChvYmplY3QpKSB7XG4gICAgICByZXN1bHQucHVzaChrZXkpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG5hdGl2ZUtleXNJbjtcbiIsInZhciBmcmVlR2xvYmFsID0gcmVxdWlyZSgnLi9fZnJlZUdsb2JhbCcpO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYGV4cG9ydHNgLiAqL1xudmFyIGZyZWVFeHBvcnRzID0gdHlwZW9mIGV4cG9ydHMgPT0gJ29iamVjdCcgJiYgZXhwb3J0cyAmJiAhZXhwb3J0cy5ub2RlVHlwZSAmJiBleHBvcnRzO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYG1vZHVsZWAuICovXG52YXIgZnJlZU1vZHVsZSA9IGZyZWVFeHBvcnRzICYmIHR5cGVvZiBtb2R1bGUgPT0gJ29iamVjdCcgJiYgbW9kdWxlICYmICFtb2R1bGUubm9kZVR5cGUgJiYgbW9kdWxlO1xuXG4vKiogRGV0ZWN0IHRoZSBwb3B1bGFyIENvbW1vbkpTIGV4dGVuc2lvbiBgbW9kdWxlLmV4cG9ydHNgLiAqL1xudmFyIG1vZHVsZUV4cG9ydHMgPSBmcmVlTW9kdWxlICYmIGZyZWVNb2R1bGUuZXhwb3J0cyA9PT0gZnJlZUV4cG9ydHM7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgcHJvY2Vzc2AgZnJvbSBOb2RlLmpzLiAqL1xudmFyIGZyZWVQcm9jZXNzID0gbW9kdWxlRXhwb3J0cyAmJiBmcmVlR2xvYmFsLnByb2Nlc3M7XG5cbi8qKiBVc2VkIHRvIGFjY2VzcyBmYXN0ZXIgTm9kZS5qcyBoZWxwZXJzLiAqL1xudmFyIG5vZGVVdGlsID0gKGZ1bmN0aW9uKCkge1xuICB0cnkge1xuICAgIHJldHVybiBmcmVlUHJvY2VzcyAmJiBmcmVlUHJvY2Vzcy5iaW5kaW5nKCd1dGlsJyk7XG4gIH0gY2F0Y2ggKGUpIHt9XG59KCkpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IG5vZGVVdGlsO1xuIiwiLyoqXG4gKiBDcmVhdGVzIGEgdW5hcnkgZnVuY3Rpb24gdGhhdCBpbnZva2VzIGBmdW5jYCB3aXRoIGl0cyBhcmd1bWVudCB0cmFuc2Zvcm1lZC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gd3JhcC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHRyYW5zZm9ybSBUaGUgYXJndW1lbnQgdHJhbnNmb3JtLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIG92ZXJBcmcoZnVuYywgdHJhbnNmb3JtKSB7XG4gIHJldHVybiBmdW5jdGlvbihhcmcpIHtcbiAgICByZXR1cm4gZnVuYyh0cmFuc2Zvcm0oYXJnKSk7XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gb3ZlckFyZztcbiIsInZhciBhcHBseSA9IHJlcXVpcmUoJy4vX2FwcGx5Jyk7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIGZvciB0aG9zZSB3aXRoIHRoZSBzYW1lIG5hbWUgYXMgb3RoZXIgYGxvZGFzaGAgbWV0aG9kcy4gKi9cbnZhciBuYXRpdmVNYXggPSBNYXRoLm1heDtcblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYGJhc2VSZXN0YCB3aGljaCB0cmFuc2Zvcm1zIHRoZSByZXN0IGFycmF5LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBhcHBseSBhIHJlc3QgcGFyYW1ldGVyIHRvLlxuICogQHBhcmFtIHtudW1iZXJ9IFtzdGFydD1mdW5jLmxlbmd0aC0xXSBUaGUgc3RhcnQgcG9zaXRpb24gb2YgdGhlIHJlc3QgcGFyYW1ldGVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gdHJhbnNmb3JtIFRoZSByZXN0IGFycmF5IHRyYW5zZm9ybS5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBvdmVyUmVzdChmdW5jLCBzdGFydCwgdHJhbnNmb3JtKSB7XG4gIHN0YXJ0ID0gbmF0aXZlTWF4KHN0YXJ0ID09PSB1bmRlZmluZWQgPyAoZnVuYy5sZW5ndGggLSAxKSA6IHN0YXJ0LCAwKTtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHZhciBhcmdzID0gYXJndW1lbnRzLFxuICAgICAgICBpbmRleCA9IC0xLFxuICAgICAgICBsZW5ndGggPSBuYXRpdmVNYXgoYXJncy5sZW5ndGggLSBzdGFydCwgMCksXG4gICAgICAgIGFycmF5ID0gQXJyYXkobGVuZ3RoKTtcblxuICAgIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgICBhcnJheVtpbmRleF0gPSBhcmdzW3N0YXJ0ICsgaW5kZXhdO1xuICAgIH1cbiAgICBpbmRleCA9IC0xO1xuICAgIHZhciBvdGhlckFyZ3MgPSBBcnJheShzdGFydCArIDEpO1xuICAgIHdoaWxlICgrK2luZGV4IDwgc3RhcnQpIHtcbiAgICAgIG90aGVyQXJnc1tpbmRleF0gPSBhcmdzW2luZGV4XTtcbiAgICB9XG4gICAgb3RoZXJBcmdzW3N0YXJ0XSA9IHRyYW5zZm9ybShhcnJheSk7XG4gICAgcmV0dXJuIGFwcGx5KGZ1bmMsIHRoaXMsIG90aGVyQXJncyk7XG4gIH07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gb3ZlclJlc3Q7XG4iLCJ2YXIgZnJlZUdsb2JhbCA9IHJlcXVpcmUoJy4vX2ZyZWVHbG9iYWwnKTtcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBzZWxmYC4gKi9cbnZhciBmcmVlU2VsZiA9IHR5cGVvZiBzZWxmID09ICdvYmplY3QnICYmIHNlbGYgJiYgc2VsZi5PYmplY3QgPT09IE9iamVjdCAmJiBzZWxmO1xuXG4vKiogVXNlZCBhcyBhIHJlZmVyZW5jZSB0byB0aGUgZ2xvYmFsIG9iamVjdC4gKi9cbnZhciByb290ID0gZnJlZUdsb2JhbCB8fCBmcmVlU2VsZiB8fCBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJvb3Q7XG4iLCJ2YXIgYmFzZVNldFRvU3RyaW5nID0gcmVxdWlyZSgnLi9fYmFzZVNldFRvU3RyaW5nJyksXG4gICAgc2hvcnRPdXQgPSByZXF1aXJlKCcuL19zaG9ydE91dCcpO1xuXG4vKipcbiAqIFNldHMgdGhlIGB0b1N0cmluZ2AgbWV0aG9kIG9mIGBmdW5jYCB0byByZXR1cm4gYHN0cmluZ2AuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIG1vZGlmeS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHN0cmluZyBUaGUgYHRvU3RyaW5nYCByZXN1bHQuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgYGZ1bmNgLlxuICovXG52YXIgc2V0VG9TdHJpbmcgPSBzaG9ydE91dChiYXNlU2V0VG9TdHJpbmcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHNldFRvU3RyaW5nO1xuIiwiLyoqIFVzZWQgdG8gZGV0ZWN0IGhvdCBmdW5jdGlvbnMgYnkgbnVtYmVyIG9mIGNhbGxzIHdpdGhpbiBhIHNwYW4gb2YgbWlsbGlzZWNvbmRzLiAqL1xudmFyIEhPVF9DT1VOVCA9IDUwMCxcbiAgICBIT1RfU1BBTiA9IDE2O1xuXG4vKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyBmb3IgdGhvc2Ugd2l0aCB0aGUgc2FtZSBuYW1lIGFzIG90aGVyIGBsb2Rhc2hgIG1ldGhvZHMuICovXG52YXIgbmF0aXZlTm93ID0gRGF0ZS5ub3c7XG5cbi8qKlxuICogQ3JlYXRlcyBhIGZ1bmN0aW9uIHRoYXQnbGwgc2hvcnQgb3V0IGFuZCBpbnZva2UgYGlkZW50aXR5YCBpbnN0ZWFkXG4gKiBvZiBgZnVuY2Agd2hlbiBpdCdzIGNhbGxlZCBgSE9UX0NPVU5UYCBvciBtb3JlIHRpbWVzIGluIGBIT1RfU1BBTmBcbiAqIG1pbGxpc2Vjb25kcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gcmVzdHJpY3QuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBzaG9ydGFibGUgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIHNob3J0T3V0KGZ1bmMpIHtcbiAgdmFyIGNvdW50ID0gMCxcbiAgICAgIGxhc3RDYWxsZWQgPSAwO1xuXG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB2YXIgc3RhbXAgPSBuYXRpdmVOb3coKSxcbiAgICAgICAgcmVtYWluaW5nID0gSE9UX1NQQU4gLSAoc3RhbXAgLSBsYXN0Q2FsbGVkKTtcblxuICAgIGxhc3RDYWxsZWQgPSBzdGFtcDtcbiAgICBpZiAocmVtYWluaW5nID4gMCkge1xuICAgICAgaWYgKCsrY291bnQgPj0gSE9UX0NPVU5UKSB7XG4gICAgICAgIHJldHVybiBhcmd1bWVudHNbMF07XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvdW50ID0gMDtcbiAgICB9XG4gICAgcmV0dXJuIGZ1bmMuYXBwbHkodW5kZWZpbmVkLCBhcmd1bWVudHMpO1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNob3J0T3V0O1xuIiwidmFyIExpc3RDYWNoZSA9IHJlcXVpcmUoJy4vX0xpc3RDYWNoZScpO1xuXG4vKipcbiAqIFJlbW92ZXMgYWxsIGtleS12YWx1ZSBlbnRyaWVzIGZyb20gdGhlIHN0YWNrLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBjbGVhclxuICogQG1lbWJlck9mIFN0YWNrXG4gKi9cbmZ1bmN0aW9uIHN0YWNrQ2xlYXIoKSB7XG4gIHRoaXMuX19kYXRhX18gPSBuZXcgTGlzdENhY2hlO1xuICB0aGlzLnNpemUgPSAwO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN0YWNrQ2xlYXI7XG4iLCIvKipcbiAqIFJlbW92ZXMgYGtleWAgYW5kIGl0cyB2YWx1ZSBmcm9tIHRoZSBzdGFjay5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZGVsZXRlXG4gKiBAbWVtYmVyT2YgU3RhY2tcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gcmVtb3ZlLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBlbnRyeSB3YXMgcmVtb3ZlZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBzdGFja0RlbGV0ZShrZXkpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fLFxuICAgICAgcmVzdWx0ID0gZGF0YVsnZGVsZXRlJ10oa2V5KTtcblxuICB0aGlzLnNpemUgPSBkYXRhLnNpemU7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3RhY2tEZWxldGU7XG4iLCIvKipcbiAqIEdldHMgdGhlIHN0YWNrIHZhbHVlIGZvciBga2V5YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgZ2V0XG4gKiBAbWVtYmVyT2YgU3RhY2tcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIGVudHJ5IHZhbHVlLlxuICovXG5mdW5jdGlvbiBzdGFja0dldChrZXkpIHtcbiAgcmV0dXJuIHRoaXMuX19kYXRhX18uZ2V0KGtleSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3RhY2tHZXQ7XG4iLCIvKipcbiAqIENoZWNrcyBpZiBhIHN0YWNrIHZhbHVlIGZvciBga2V5YCBleGlzdHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGhhc1xuICogQG1lbWJlck9mIFN0YWNrXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIGVudHJ5IHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGFuIGVudHJ5IGZvciBga2V5YCBleGlzdHMsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gc3RhY2tIYXMoa2V5KSB7XG4gIHJldHVybiB0aGlzLl9fZGF0YV9fLmhhcyhrZXkpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHN0YWNrSGFzO1xuIiwidmFyIExpc3RDYWNoZSA9IHJlcXVpcmUoJy4vX0xpc3RDYWNoZScpLFxuICAgIE1hcCA9IHJlcXVpcmUoJy4vX01hcCcpLFxuICAgIE1hcENhY2hlID0gcmVxdWlyZSgnLi9fTWFwQ2FjaGUnKTtcblxuLyoqIFVzZWQgYXMgdGhlIHNpemUgdG8gZW5hYmxlIGxhcmdlIGFycmF5IG9wdGltaXphdGlvbnMuICovXG52YXIgTEFSR0VfQVJSQVlfU0laRSA9IDIwMDtcblxuLyoqXG4gKiBTZXRzIHRoZSBzdGFjayBga2V5YCB0byBgdmFsdWVgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBzZXRcbiAqIEBtZW1iZXJPZiBTdGFja1xuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIHRoZSBzdGFjayBjYWNoZSBpbnN0YW5jZS5cbiAqL1xuZnVuY3Rpb24gc3RhY2tTZXQoa2V5LCB2YWx1ZSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX187XG4gIGlmIChkYXRhIGluc3RhbmNlb2YgTGlzdENhY2hlKSB7XG4gICAgdmFyIHBhaXJzID0gZGF0YS5fX2RhdGFfXztcbiAgICBpZiAoIU1hcCB8fCAocGFpcnMubGVuZ3RoIDwgTEFSR0VfQVJSQVlfU0laRSAtIDEpKSB7XG4gICAgICBwYWlycy5wdXNoKFtrZXksIHZhbHVlXSk7XG4gICAgICB0aGlzLnNpemUgPSArK2RhdGEuc2l6ZTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICBkYXRhID0gdGhpcy5fX2RhdGFfXyA9IG5ldyBNYXBDYWNoZShwYWlycyk7XG4gIH1cbiAgZGF0YS5zZXQoa2V5LCB2YWx1ZSk7XG4gIHRoaXMuc2l6ZSA9IGRhdGEuc2l6ZTtcbiAgcmV0dXJuIHRoaXM7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3RhY2tTZXQ7XG4iLCIvKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgZnVuY1Byb3RvID0gRnVuY3Rpb24ucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byByZXNvbHZlIHRoZSBkZWNvbXBpbGVkIHNvdXJjZSBvZiBmdW5jdGlvbnMuICovXG52YXIgZnVuY1RvU3RyaW5nID0gZnVuY1Byb3RvLnRvU3RyaW5nO1xuXG4vKipcbiAqIENvbnZlcnRzIGBmdW5jYCB0byBpdHMgc291cmNlIGNvZGUuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIHByb2Nlc3MuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBzb3VyY2UgY29kZS5cbiAqL1xuZnVuY3Rpb24gdG9Tb3VyY2UoZnVuYykge1xuICBpZiAoZnVuYyAhPSBudWxsKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJldHVybiBmdW5jVG9TdHJpbmcuY2FsbChmdW5jKTtcbiAgICB9IGNhdGNoIChlKSB7fVxuICAgIHRyeSB7XG4gICAgICByZXR1cm4gKGZ1bmMgKyAnJyk7XG4gICAgfSBjYXRjaCAoZSkge31cbiAgfVxuICByZXR1cm4gJyc7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdG9Tb3VyY2U7XG4iLCIvKipcbiAqIENyZWF0ZXMgYSBmdW5jdGlvbiB0aGF0IHJldHVybnMgYHZhbHVlYC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDIuNC4wXG4gKiBAY2F0ZWdvcnkgVXRpbFxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcmV0dXJuIGZyb20gdGhlIG5ldyBmdW5jdGlvbi5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGNvbnN0YW50IGZ1bmN0aW9uLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgb2JqZWN0cyA9IF8udGltZXMoMiwgXy5jb25zdGFudCh7ICdhJzogMSB9KSk7XG4gKlxuICogY29uc29sZS5sb2cob2JqZWN0cyk7XG4gKiAvLyA9PiBbeyAnYSc6IDEgfSwgeyAnYSc6IDEgfV1cbiAqXG4gKiBjb25zb2xlLmxvZyhvYmplY3RzWzBdID09PSBvYmplY3RzWzFdKTtcbiAqIC8vID0+IHRydWVcbiAqL1xuZnVuY3Rpb24gY29uc3RhbnQodmFsdWUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjb25zdGFudDtcbiIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vaXNPYmplY3QnKSxcbiAgICBub3cgPSByZXF1aXJlKCcuL25vdycpLFxuICAgIHRvTnVtYmVyID0gcmVxdWlyZSgnLi90b051bWJlcicpO1xuXG4vKiogRXJyb3IgbWVzc2FnZSBjb25zdGFudHMuICovXG52YXIgRlVOQ19FUlJPUl9URVhUID0gJ0V4cGVjdGVkIGEgZnVuY3Rpb24nO1xuXG4vKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyBmb3IgdGhvc2Ugd2l0aCB0aGUgc2FtZSBuYW1lIGFzIG90aGVyIGBsb2Rhc2hgIG1ldGhvZHMuICovXG52YXIgbmF0aXZlTWF4ID0gTWF0aC5tYXgsXG4gICAgbmF0aXZlTWluID0gTWF0aC5taW47XG5cbi8qKlxuICogQ3JlYXRlcyBhIGRlYm91bmNlZCBmdW5jdGlvbiB0aGF0IGRlbGF5cyBpbnZva2luZyBgZnVuY2AgdW50aWwgYWZ0ZXIgYHdhaXRgXG4gKiBtaWxsaXNlY29uZHMgaGF2ZSBlbGFwc2VkIHNpbmNlIHRoZSBsYXN0IHRpbWUgdGhlIGRlYm91bmNlZCBmdW5jdGlvbiB3YXNcbiAqIGludm9rZWQuIFRoZSBkZWJvdW5jZWQgZnVuY3Rpb24gY29tZXMgd2l0aCBhIGBjYW5jZWxgIG1ldGhvZCB0byBjYW5jZWxcbiAqIGRlbGF5ZWQgYGZ1bmNgIGludm9jYXRpb25zIGFuZCBhIGBmbHVzaGAgbWV0aG9kIHRvIGltbWVkaWF0ZWx5IGludm9rZSB0aGVtLlxuICogUHJvdmlkZSBgb3B0aW9uc2AgdG8gaW5kaWNhdGUgd2hldGhlciBgZnVuY2Agc2hvdWxkIGJlIGludm9rZWQgb24gdGhlXG4gKiBsZWFkaW5nIGFuZC9vciB0cmFpbGluZyBlZGdlIG9mIHRoZSBgd2FpdGAgdGltZW91dC4gVGhlIGBmdW5jYCBpcyBpbnZva2VkXG4gKiB3aXRoIHRoZSBsYXN0IGFyZ3VtZW50cyBwcm92aWRlZCB0byB0aGUgZGVib3VuY2VkIGZ1bmN0aW9uLiBTdWJzZXF1ZW50XG4gKiBjYWxscyB0byB0aGUgZGVib3VuY2VkIGZ1bmN0aW9uIHJldHVybiB0aGUgcmVzdWx0IG9mIHRoZSBsYXN0IGBmdW5jYFxuICogaW52b2NhdGlvbi5cbiAqXG4gKiAqKk5vdGU6KiogSWYgYGxlYWRpbmdgIGFuZCBgdHJhaWxpbmdgIG9wdGlvbnMgYXJlIGB0cnVlYCwgYGZ1bmNgIGlzXG4gKiBpbnZva2VkIG9uIHRoZSB0cmFpbGluZyBlZGdlIG9mIHRoZSB0aW1lb3V0IG9ubHkgaWYgdGhlIGRlYm91bmNlZCBmdW5jdGlvblxuICogaXMgaW52b2tlZCBtb3JlIHRoYW4gb25jZSBkdXJpbmcgdGhlIGB3YWl0YCB0aW1lb3V0LlxuICpcbiAqIElmIGB3YWl0YCBpcyBgMGAgYW5kIGBsZWFkaW5nYCBpcyBgZmFsc2VgLCBgZnVuY2AgaW52b2NhdGlvbiBpcyBkZWZlcnJlZFxuICogdW50aWwgdG8gdGhlIG5leHQgdGljaywgc2ltaWxhciB0byBgc2V0VGltZW91dGAgd2l0aCBhIHRpbWVvdXQgb2YgYDBgLlxuICpcbiAqIFNlZSBbRGF2aWQgQ29yYmFjaG8ncyBhcnRpY2xlXShodHRwczovL2Nzcy10cmlja3MuY29tL2RlYm91bmNpbmctdGhyb3R0bGluZy1leHBsYWluZWQtZXhhbXBsZXMvKVxuICogZm9yIGRldGFpbHMgb3ZlciB0aGUgZGlmZmVyZW5jZXMgYmV0d2VlbiBgXy5kZWJvdW5jZWAgYW5kIGBfLnRocm90dGxlYC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGRlYm91bmNlLlxuICogQHBhcmFtIHtudW1iZXJ9IFt3YWl0PTBdIFRoZSBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIHRvIGRlbGF5LlxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zPXt9XSBUaGUgb3B0aW9ucyBvYmplY3QuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLmxlYWRpbmc9ZmFsc2VdXG4gKiAgU3BlY2lmeSBpbnZva2luZyBvbiB0aGUgbGVhZGluZyBlZGdlIG9mIHRoZSB0aW1lb3V0LlxuICogQHBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLm1heFdhaXRdXG4gKiAgVGhlIG1heGltdW0gdGltZSBgZnVuY2AgaXMgYWxsb3dlZCB0byBiZSBkZWxheWVkIGJlZm9yZSBpdCdzIGludm9rZWQuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLnRyYWlsaW5nPXRydWVdXG4gKiAgU3BlY2lmeSBpbnZva2luZyBvbiB0aGUgdHJhaWxpbmcgZWRnZSBvZiB0aGUgdGltZW91dC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGRlYm91bmNlZCBmdW5jdGlvbi5cbiAqIEBleGFtcGxlXG4gKlxuICogLy8gQXZvaWQgY29zdGx5IGNhbGN1bGF0aW9ucyB3aGlsZSB0aGUgd2luZG93IHNpemUgaXMgaW4gZmx1eC5cbiAqIGpRdWVyeSh3aW5kb3cpLm9uKCdyZXNpemUnLCBfLmRlYm91bmNlKGNhbGN1bGF0ZUxheW91dCwgMTUwKSk7XG4gKlxuICogLy8gSW52b2tlIGBzZW5kTWFpbGAgd2hlbiBjbGlja2VkLCBkZWJvdW5jaW5nIHN1YnNlcXVlbnQgY2FsbHMuXG4gKiBqUXVlcnkoZWxlbWVudCkub24oJ2NsaWNrJywgXy5kZWJvdW5jZShzZW5kTWFpbCwgMzAwLCB7XG4gKiAgICdsZWFkaW5nJzogdHJ1ZSxcbiAqICAgJ3RyYWlsaW5nJzogZmFsc2VcbiAqIH0pKTtcbiAqXG4gKiAvLyBFbnN1cmUgYGJhdGNoTG9nYCBpcyBpbnZva2VkIG9uY2UgYWZ0ZXIgMSBzZWNvbmQgb2YgZGVib3VuY2VkIGNhbGxzLlxuICogdmFyIGRlYm91bmNlZCA9IF8uZGVib3VuY2UoYmF0Y2hMb2csIDI1MCwgeyAnbWF4V2FpdCc6IDEwMDAgfSk7XG4gKiB2YXIgc291cmNlID0gbmV3IEV2ZW50U291cmNlKCcvc3RyZWFtJyk7XG4gKiBqUXVlcnkoc291cmNlKS5vbignbWVzc2FnZScsIGRlYm91bmNlZCk7XG4gKlxuICogLy8gQ2FuY2VsIHRoZSB0cmFpbGluZyBkZWJvdW5jZWQgaW52b2NhdGlvbi5cbiAqIGpRdWVyeSh3aW5kb3cpLm9uKCdwb3BzdGF0ZScsIGRlYm91bmNlZC5jYW5jZWwpO1xuICovXG5mdW5jdGlvbiBkZWJvdW5jZShmdW5jLCB3YWl0LCBvcHRpb25zKSB7XG4gIHZhciBsYXN0QXJncyxcbiAgICAgIGxhc3RUaGlzLFxuICAgICAgbWF4V2FpdCxcbiAgICAgIHJlc3VsdCxcbiAgICAgIHRpbWVySWQsXG4gICAgICBsYXN0Q2FsbFRpbWUsXG4gICAgICBsYXN0SW52b2tlVGltZSA9IDAsXG4gICAgICBsZWFkaW5nID0gZmFsc2UsXG4gICAgICBtYXhpbmcgPSBmYWxzZSxcbiAgICAgIHRyYWlsaW5nID0gdHJ1ZTtcblxuICBpZiAodHlwZW9mIGZ1bmMgIT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoRlVOQ19FUlJPUl9URVhUKTtcbiAgfVxuICB3YWl0ID0gdG9OdW1iZXIod2FpdCkgfHwgMDtcbiAgaWYgKGlzT2JqZWN0KG9wdGlvbnMpKSB7XG4gICAgbGVhZGluZyA9ICEhb3B0aW9ucy5sZWFkaW5nO1xuICAgIG1heGluZyA9ICdtYXhXYWl0JyBpbiBvcHRpb25zO1xuICAgIG1heFdhaXQgPSBtYXhpbmcgPyBuYXRpdmVNYXgodG9OdW1iZXIob3B0aW9ucy5tYXhXYWl0KSB8fCAwLCB3YWl0KSA6IG1heFdhaXQ7XG4gICAgdHJhaWxpbmcgPSAndHJhaWxpbmcnIGluIG9wdGlvbnMgPyAhIW9wdGlvbnMudHJhaWxpbmcgOiB0cmFpbGluZztcbiAgfVxuXG4gIGZ1bmN0aW9uIGludm9rZUZ1bmModGltZSkge1xuICAgIHZhciBhcmdzID0gbGFzdEFyZ3MsXG4gICAgICAgIHRoaXNBcmcgPSBsYXN0VGhpcztcblxuICAgIGxhc3RBcmdzID0gbGFzdFRoaXMgPSB1bmRlZmluZWQ7XG4gICAgbGFzdEludm9rZVRpbWUgPSB0aW1lO1xuICAgIHJlc3VsdCA9IGZ1bmMuYXBwbHkodGhpc0FyZywgYXJncyk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGxlYWRpbmdFZGdlKHRpbWUpIHtcbiAgICAvLyBSZXNldCBhbnkgYG1heFdhaXRgIHRpbWVyLlxuICAgIGxhc3RJbnZva2VUaW1lID0gdGltZTtcbiAgICAvLyBTdGFydCB0aGUgdGltZXIgZm9yIHRoZSB0cmFpbGluZyBlZGdlLlxuICAgIHRpbWVySWQgPSBzZXRUaW1lb3V0KHRpbWVyRXhwaXJlZCwgd2FpdCk7XG4gICAgLy8gSW52b2tlIHRoZSBsZWFkaW5nIGVkZ2UuXG4gICAgcmV0dXJuIGxlYWRpbmcgPyBpbnZva2VGdW5jKHRpbWUpIDogcmVzdWx0O1xuICB9XG5cbiAgZnVuY3Rpb24gcmVtYWluaW5nV2FpdCh0aW1lKSB7XG4gICAgdmFyIHRpbWVTaW5jZUxhc3RDYWxsID0gdGltZSAtIGxhc3RDYWxsVGltZSxcbiAgICAgICAgdGltZVNpbmNlTGFzdEludm9rZSA9IHRpbWUgLSBsYXN0SW52b2tlVGltZSxcbiAgICAgICAgcmVzdWx0ID0gd2FpdCAtIHRpbWVTaW5jZUxhc3RDYWxsO1xuXG4gICAgcmV0dXJuIG1heGluZyA/IG5hdGl2ZU1pbihyZXN1bHQsIG1heFdhaXQgLSB0aW1lU2luY2VMYXN0SW52b2tlKSA6IHJlc3VsdDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNob3VsZEludm9rZSh0aW1lKSB7XG4gICAgdmFyIHRpbWVTaW5jZUxhc3RDYWxsID0gdGltZSAtIGxhc3RDYWxsVGltZSxcbiAgICAgICAgdGltZVNpbmNlTGFzdEludm9rZSA9IHRpbWUgLSBsYXN0SW52b2tlVGltZTtcblxuICAgIC8vIEVpdGhlciB0aGlzIGlzIHRoZSBmaXJzdCBjYWxsLCBhY3Rpdml0eSBoYXMgc3RvcHBlZCBhbmQgd2UncmUgYXQgdGhlXG4gICAgLy8gdHJhaWxpbmcgZWRnZSwgdGhlIHN5c3RlbSB0aW1lIGhhcyBnb25lIGJhY2t3YXJkcyBhbmQgd2UncmUgdHJlYXRpbmdcbiAgICAvLyBpdCBhcyB0aGUgdHJhaWxpbmcgZWRnZSwgb3Igd2UndmUgaGl0IHRoZSBgbWF4V2FpdGAgbGltaXQuXG4gICAgcmV0dXJuIChsYXN0Q2FsbFRpbWUgPT09IHVuZGVmaW5lZCB8fCAodGltZVNpbmNlTGFzdENhbGwgPj0gd2FpdCkgfHxcbiAgICAgICh0aW1lU2luY2VMYXN0Q2FsbCA8IDApIHx8IChtYXhpbmcgJiYgdGltZVNpbmNlTGFzdEludm9rZSA+PSBtYXhXYWl0KSk7XG4gIH1cblxuICBmdW5jdGlvbiB0aW1lckV4cGlyZWQoKSB7XG4gICAgdmFyIHRpbWUgPSBub3coKTtcbiAgICBpZiAoc2hvdWxkSW52b2tlKHRpbWUpKSB7XG4gICAgICByZXR1cm4gdHJhaWxpbmdFZGdlKHRpbWUpO1xuICAgIH1cbiAgICAvLyBSZXN0YXJ0IHRoZSB0aW1lci5cbiAgICB0aW1lcklkID0gc2V0VGltZW91dCh0aW1lckV4cGlyZWQsIHJlbWFpbmluZ1dhaXQodGltZSkpO1xuICB9XG5cbiAgZnVuY3Rpb24gdHJhaWxpbmdFZGdlKHRpbWUpIHtcbiAgICB0aW1lcklkID0gdW5kZWZpbmVkO1xuXG4gICAgLy8gT25seSBpbnZva2UgaWYgd2UgaGF2ZSBgbGFzdEFyZ3NgIHdoaWNoIG1lYW5zIGBmdW5jYCBoYXMgYmVlblxuICAgIC8vIGRlYm91bmNlZCBhdCBsZWFzdCBvbmNlLlxuICAgIGlmICh0cmFpbGluZyAmJiBsYXN0QXJncykge1xuICAgICAgcmV0dXJuIGludm9rZUZ1bmModGltZSk7XG4gICAgfVxuICAgIGxhc3RBcmdzID0gbGFzdFRoaXMgPSB1bmRlZmluZWQ7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNhbmNlbCgpIHtcbiAgICBpZiAodGltZXJJZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBjbGVhclRpbWVvdXQodGltZXJJZCk7XG4gICAgfVxuICAgIGxhc3RJbnZva2VUaW1lID0gMDtcbiAgICBsYXN0QXJncyA9IGxhc3RDYWxsVGltZSA9IGxhc3RUaGlzID0gdGltZXJJZCA9IHVuZGVmaW5lZDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZsdXNoKCkge1xuICAgIHJldHVybiB0aW1lcklkID09PSB1bmRlZmluZWQgPyByZXN1bHQgOiB0cmFpbGluZ0VkZ2Uobm93KCkpO1xuICB9XG5cbiAgZnVuY3Rpb24gZGVib3VuY2VkKCkge1xuICAgIHZhciB0aW1lID0gbm93KCksXG4gICAgICAgIGlzSW52b2tpbmcgPSBzaG91bGRJbnZva2UodGltZSk7XG5cbiAgICBsYXN0QXJncyA9IGFyZ3VtZW50cztcbiAgICBsYXN0VGhpcyA9IHRoaXM7XG4gICAgbGFzdENhbGxUaW1lID0gdGltZTtcblxuICAgIGlmIChpc0ludm9raW5nKSB7XG4gICAgICBpZiAodGltZXJJZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiBsZWFkaW5nRWRnZShsYXN0Q2FsbFRpbWUpO1xuICAgICAgfVxuICAgICAgaWYgKG1heGluZykge1xuICAgICAgICAvLyBIYW5kbGUgaW52b2NhdGlvbnMgaW4gYSB0aWdodCBsb29wLlxuICAgICAgICB0aW1lcklkID0gc2V0VGltZW91dCh0aW1lckV4cGlyZWQsIHdhaXQpO1xuICAgICAgICByZXR1cm4gaW52b2tlRnVuYyhsYXN0Q2FsbFRpbWUpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAodGltZXJJZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aW1lcklkID0gc2V0VGltZW91dCh0aW1lckV4cGlyZWQsIHdhaXQpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG4gIGRlYm91bmNlZC5jYW5jZWwgPSBjYW5jZWw7XG4gIGRlYm91bmNlZC5mbHVzaCA9IGZsdXNoO1xuICByZXR1cm4gZGVib3VuY2VkO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRlYm91bmNlO1xuIiwiLyoqXG4gKiBQZXJmb3JtcyBhXG4gKiBbYFNhbWVWYWx1ZVplcm9gXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1zYW1ldmFsdWV6ZXJvKVxuICogY29tcGFyaXNvbiBiZXR3ZWVuIHR3byB2YWx1ZXMgdG8gZGV0ZXJtaW5lIGlmIHRoZXkgYXJlIGVxdWl2YWxlbnQuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0geyp9IG90aGVyIFRoZSBvdGhlciB2YWx1ZSB0byBjb21wYXJlLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSB2YWx1ZXMgYXJlIGVxdWl2YWxlbnQsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIG9iamVjdCA9IHsgJ2EnOiAxIH07XG4gKiB2YXIgb3RoZXIgPSB7ICdhJzogMSB9O1xuICpcbiAqIF8uZXEob2JqZWN0LCBvYmplY3QpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uZXEob2JqZWN0LCBvdGhlcik7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uZXEoJ2EnLCAnYScpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uZXEoJ2EnLCBPYmplY3QoJ2EnKSk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uZXEoTmFOLCBOYU4pO1xuICogLy8gPT4gdHJ1ZVxuICovXG5mdW5jdGlvbiBlcSh2YWx1ZSwgb3RoZXIpIHtcbiAgcmV0dXJuIHZhbHVlID09PSBvdGhlciB8fCAodmFsdWUgIT09IHZhbHVlICYmIG90aGVyICE9PSBvdGhlcik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZXE7XG4iLCIvKipcbiAqIFRoaXMgbWV0aG9kIHJldHVybnMgdGhlIGZpcnN0IGFyZ3VtZW50IGl0IHJlY2VpdmVzLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBzaW5jZSAwLjEuMFxuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBVdGlsXG4gKiBAcGFyYW0geyp9IHZhbHVlIEFueSB2YWx1ZS5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIGB2YWx1ZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBvYmplY3QgPSB7ICdhJzogMSB9O1xuICpcbiAqIGNvbnNvbGUubG9nKF8uaWRlbnRpdHkob2JqZWN0KSA9PT0gb2JqZWN0KTtcbiAqIC8vID0+IHRydWVcbiAqL1xuZnVuY3Rpb24gaWRlbnRpdHkodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlkZW50aXR5O1xuIiwidmFyIGJhc2VJc0FyZ3VtZW50cyA9IHJlcXVpcmUoJy4vX2Jhc2VJc0FyZ3VtZW50cycpLFxuICAgIGlzT2JqZWN0TGlrZSA9IHJlcXVpcmUoJy4vaXNPYmplY3RMaWtlJyk7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIHByb3BlcnR5SXNFbnVtZXJhYmxlID0gb2JqZWN0UHJvdG8ucHJvcGVydHlJc0VudW1lcmFibGU7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgbGlrZWx5IGFuIGBhcmd1bWVudHNgIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBgYXJndW1lbnRzYCBvYmplY3QsXG4gKiAgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzQXJndW1lbnRzKGZ1bmN0aW9uKCkgeyByZXR1cm4gYXJndW1lbnRzOyB9KCkpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcmd1bWVudHMoWzEsIDIsIDNdKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbnZhciBpc0FyZ3VtZW50cyA9IGJhc2VJc0FyZ3VtZW50cyhmdW5jdGlvbigpIHsgcmV0dXJuIGFyZ3VtZW50czsgfSgpKSA/IGJhc2VJc0FyZ3VtZW50cyA6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gIHJldHVybiBpc09iamVjdExpa2UodmFsdWUpICYmIGhhc093blByb3BlcnR5LmNhbGwodmFsdWUsICdjYWxsZWUnKSAmJlxuICAgICFwcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHZhbHVlLCAnY2FsbGVlJyk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGlzQXJndW1lbnRzO1xuIiwiLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGFuIGBBcnJheWAgb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIGFycmF5LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNBcnJheShbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheShkb2N1bWVudC5ib2R5LmNoaWxkcmVuKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0FycmF5KCdhYmMnKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0FycmF5KF8ubm9vcCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG52YXIgaXNBcnJheSA9IEFycmF5LmlzQXJyYXk7XG5cbm1vZHVsZS5leHBvcnRzID0gaXNBcnJheTtcbiIsInZhciBpc0Z1bmN0aW9uID0gcmVxdWlyZSgnLi9pc0Z1bmN0aW9uJyksXG4gICAgaXNMZW5ndGggPSByZXF1aXJlKCcuL2lzTGVuZ3RoJyk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYXJyYXktbGlrZS4gQSB2YWx1ZSBpcyBjb25zaWRlcmVkIGFycmF5LWxpa2UgaWYgaXQnc1xuICogbm90IGEgZnVuY3Rpb24gYW5kIGhhcyBhIGB2YWx1ZS5sZW5ndGhgIHRoYXQncyBhbiBpbnRlZ2VyIGdyZWF0ZXIgdGhhbiBvclxuICogZXF1YWwgdG8gYDBgIGFuZCBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gYE51bWJlci5NQVhfU0FGRV9JTlRFR0VSYC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhcnJheS1saWtlLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNBcnJheUxpa2UoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlKGRvY3VtZW50LmJvZHkuY2hpbGRyZW4pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheUxpa2UoJ2FiYycpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheUxpa2UoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXlMaWtlKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSAhPSBudWxsICYmIGlzTGVuZ3RoKHZhbHVlLmxlbmd0aCkgJiYgIWlzRnVuY3Rpb24odmFsdWUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzQXJyYXlMaWtlO1xuIiwidmFyIGlzQXJyYXlMaWtlID0gcmVxdWlyZSgnLi9pc0FycmF5TGlrZScpLFxuICAgIGlzT2JqZWN0TGlrZSA9IHJlcXVpcmUoJy4vaXNPYmplY3RMaWtlJyk7XG5cbi8qKlxuICogVGhpcyBtZXRob2QgaXMgbGlrZSBgXy5pc0FycmF5TGlrZWAgZXhjZXB0IHRoYXQgaXQgYWxzbyBjaGVja3MgaWYgYHZhbHVlYFxuICogaXMgYW4gb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIGFycmF5LWxpa2Ugb2JqZWN0LFxuICogIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FycmF5TGlrZU9iamVjdChbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheUxpa2VPYmplY3QoZG9jdW1lbnQuYm9keS5jaGlsZHJlbik7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5TGlrZU9iamVjdCgnYWJjJyk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNBcnJheUxpa2VPYmplY3QoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXlMaWtlT2JqZWN0KHZhbHVlKSB7XG4gIHJldHVybiBpc09iamVjdExpa2UodmFsdWUpICYmIGlzQXJyYXlMaWtlKHZhbHVlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc0FycmF5TGlrZU9iamVjdDtcbiIsInZhciByb290ID0gcmVxdWlyZSgnLi9fcm9vdCcpLFxuICAgIHN0dWJGYWxzZSA9IHJlcXVpcmUoJy4vc3R1YkZhbHNlJyk7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgZXhwb3J0c2AuICovXG52YXIgZnJlZUV4cG9ydHMgPSB0eXBlb2YgZXhwb3J0cyA9PSAnb2JqZWN0JyAmJiBleHBvcnRzICYmICFleHBvcnRzLm5vZGVUeXBlICYmIGV4cG9ydHM7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgbW9kdWxlYC4gKi9cbnZhciBmcmVlTW9kdWxlID0gZnJlZUV4cG9ydHMgJiYgdHlwZW9mIG1vZHVsZSA9PSAnb2JqZWN0JyAmJiBtb2R1bGUgJiYgIW1vZHVsZS5ub2RlVHlwZSAmJiBtb2R1bGU7XG5cbi8qKiBEZXRlY3QgdGhlIHBvcHVsYXIgQ29tbW9uSlMgZXh0ZW5zaW9uIGBtb2R1bGUuZXhwb3J0c2AuICovXG52YXIgbW9kdWxlRXhwb3J0cyA9IGZyZWVNb2R1bGUgJiYgZnJlZU1vZHVsZS5leHBvcnRzID09PSBmcmVlRXhwb3J0cztcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgQnVmZmVyID0gbW9kdWxlRXhwb3J0cyA/IHJvb3QuQnVmZmVyIDogdW5kZWZpbmVkO1xuXG4vKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyBmb3IgdGhvc2Ugd2l0aCB0aGUgc2FtZSBuYW1lIGFzIG90aGVyIGBsb2Rhc2hgIG1ldGhvZHMuICovXG52YXIgbmF0aXZlSXNCdWZmZXIgPSBCdWZmZXIgPyBCdWZmZXIuaXNCdWZmZXIgOiB1bmRlZmluZWQ7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSBidWZmZXIuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjMuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBidWZmZXIsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0J1ZmZlcihuZXcgQnVmZmVyKDIpKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQnVmZmVyKG5ldyBVaW50OEFycmF5KDIpKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbnZhciBpc0J1ZmZlciA9IG5hdGl2ZUlzQnVmZmVyIHx8IHN0dWJGYWxzZTtcblxubW9kdWxlLmV4cG9ydHMgPSBpc0J1ZmZlcjtcbiIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vaXNPYmplY3QnKTtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIGZ1bmNUYWcgPSAnW29iamVjdCBGdW5jdGlvbl0nLFxuICAgIGdlblRhZyA9ICdbb2JqZWN0IEdlbmVyYXRvckZ1bmN0aW9uXScsXG4gICAgcHJveHlUYWcgPSAnW29iamVjdCBQcm94eV0nO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGVcbiAqIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgb2JqZWN0VG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGEgYEZ1bmN0aW9uYCBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBmdW5jdGlvbiwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzRnVuY3Rpb24oXyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0Z1bmN0aW9uKC9hYmMvKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRnVuY3Rpb24odmFsdWUpIHtcbiAgLy8gVGhlIHVzZSBvZiBgT2JqZWN0I3RvU3RyaW5nYCBhdm9pZHMgaXNzdWVzIHdpdGggdGhlIGB0eXBlb2ZgIG9wZXJhdG9yXG4gIC8vIGluIFNhZmFyaSA5IHdoaWNoIHJldHVybnMgJ29iamVjdCcgZm9yIHR5cGVkIGFycmF5IGFuZCBvdGhlciBjb25zdHJ1Y3RvcnMuXG4gIHZhciB0YWcgPSBpc09iamVjdCh2YWx1ZSkgPyBvYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKSA6ICcnO1xuICByZXR1cm4gdGFnID09IGZ1bmNUYWcgfHwgdGFnID09IGdlblRhZyB8fCB0YWcgPT0gcHJveHlUYWc7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNGdW5jdGlvbjtcbiIsIi8qKiBVc2VkIGFzIHJlZmVyZW5jZXMgZm9yIHZhcmlvdXMgYE51bWJlcmAgY29uc3RhbnRzLiAqL1xudmFyIE1BWF9TQUZFX0lOVEVHRVIgPSA5MDA3MTk5MjU0NzQwOTkxO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgYXJyYXktbGlrZSBsZW5ndGguXG4gKlxuICogKipOb3RlOioqIFRoaXMgbWV0aG9kIGlzIGxvb3NlbHkgYmFzZWQgb25cbiAqIFtgVG9MZW5ndGhgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy10b2xlbmd0aCkuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBsZW5ndGgsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0xlbmd0aCgzKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzTGVuZ3RoKE51bWJlci5NSU5fVkFMVUUpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzTGVuZ3RoKEluZmluaXR5KTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0xlbmd0aCgnMycpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNMZW5ndGgodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJyAmJlxuICAgIHZhbHVlID4gLTEgJiYgdmFsdWUgJSAxID09IDAgJiYgdmFsdWUgPD0gTUFYX1NBRkVfSU5URUdFUjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc0xlbmd0aDtcbiIsIi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgdGhlXG4gKiBbbGFuZ3VhZ2UgdHlwZV0oaHR0cDovL3d3dy5lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLWVjbWFzY3JpcHQtbGFuZ3VhZ2UtdHlwZXMpXG4gKiBvZiBgT2JqZWN0YC4gKGUuZy4gYXJyYXlzLCBmdW5jdGlvbnMsIG9iamVjdHMsIHJlZ2V4ZXMsIGBuZXcgTnVtYmVyKDApYCwgYW5kIGBuZXcgU3RyaW5nKCcnKWApXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gb2JqZWN0LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3Qoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KF8ubm9vcCk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChudWxsKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbHVlKSB7XG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbHVlO1xuICByZXR1cm4gdmFsdWUgIT0gbnVsbCAmJiAodHlwZSA9PSAnb2JqZWN0JyB8fCB0eXBlID09ICdmdW5jdGlvbicpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzT2JqZWN0O1xuIiwiLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZS4gQSB2YWx1ZSBpcyBvYmplY3QtbGlrZSBpZiBpdCdzIG5vdCBgbnVsbGBcbiAqIGFuZCBoYXMgYSBgdHlwZW9mYCByZXN1bHQgb2YgXCJvYmplY3RcIi5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZSh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShudWxsKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0TGlrZSh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgIT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT0gJ29iamVjdCc7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNPYmplY3RMaWtlO1xuIiwidmFyIGdldFByb3RvdHlwZSA9IHJlcXVpcmUoJy4vX2dldFByb3RvdHlwZScpLFxuICAgIGlzT2JqZWN0TGlrZSA9IHJlcXVpcmUoJy4vaXNPYmplY3RMaWtlJyk7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RUYWcgPSAnW29iamVjdCBPYmplY3RdJztcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIGZ1bmNQcm90byA9IEZ1bmN0aW9uLnByb3RvdHlwZSxcbiAgICBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKiBVc2VkIHRvIHJlc29sdmUgdGhlIGRlY29tcGlsZWQgc291cmNlIG9mIGZ1bmN0aW9ucy4gKi9cbnZhciBmdW5jVG9TdHJpbmcgPSBmdW5jUHJvdG8udG9TdHJpbmc7XG5cbi8qKiBVc2VkIHRvIGNoZWNrIG9iamVjdHMgZm9yIG93biBwcm9wZXJ0aWVzLiAqL1xudmFyIGhhc093blByb3BlcnR5ID0gb2JqZWN0UHJvdG8uaGFzT3duUHJvcGVydHk7XG5cbi8qKiBVc2VkIHRvIGluZmVyIHRoZSBgT2JqZWN0YCBjb25zdHJ1Y3Rvci4gKi9cbnZhciBvYmplY3RDdG9yU3RyaW5nID0gZnVuY1RvU3RyaW5nLmNhbGwoT2JqZWN0KTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlXG4gKiBbYHRvU3RyaW5nVGFnYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIG9mIHZhbHVlcy5cbiAqL1xudmFyIG9iamVjdFRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSBwbGFpbiBvYmplY3QsIHRoYXQgaXMsIGFuIG9iamVjdCBjcmVhdGVkIGJ5IHRoZVxuICogYE9iamVjdGAgY29uc3RydWN0b3Igb3Igb25lIHdpdGggYSBgW1tQcm90b3R5cGVdXWAgb2YgYG51bGxgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC44LjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgcGxhaW4gb2JqZWN0LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIGZ1bmN0aW9uIEZvbygpIHtcbiAqICAgdGhpcy5hID0gMTtcbiAqIH1cbiAqXG4gKiBfLmlzUGxhaW5PYmplY3QobmV3IEZvbyk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNQbGFpbk9iamVjdChbMSwgMiwgM10pO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzUGxhaW5PYmplY3QoeyAneCc6IDAsICd5JzogMCB9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzUGxhaW5PYmplY3QoT2JqZWN0LmNyZWF0ZShudWxsKSk7XG4gKiAvLyA9PiB0cnVlXG4gKi9cbmZ1bmN0aW9uIGlzUGxhaW5PYmplY3QodmFsdWUpIHtcbiAgaWYgKCFpc09iamVjdExpa2UodmFsdWUpIHx8IG9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpICE9IG9iamVjdFRhZykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICB2YXIgcHJvdG8gPSBnZXRQcm90b3R5cGUodmFsdWUpO1xuICBpZiAocHJvdG8gPT09IG51bGwpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICB2YXIgQ3RvciA9IGhhc093blByb3BlcnR5LmNhbGwocHJvdG8sICdjb25zdHJ1Y3RvcicpICYmIHByb3RvLmNvbnN0cnVjdG9yO1xuICByZXR1cm4gKHR5cGVvZiBDdG9yID09ICdmdW5jdGlvbicgJiZcbiAgICBDdG9yIGluc3RhbmNlb2YgQ3RvciAmJiBmdW5jVG9TdHJpbmcuY2FsbChDdG9yKSA9PSBvYmplY3RDdG9yU3RyaW5nKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc1BsYWluT2JqZWN0O1xuIiwidmFyIGlzT2JqZWN0TGlrZSA9IHJlcXVpcmUoJy4vaXNPYmplY3RMaWtlJyk7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBzeW1ib2xUYWcgPSAnW29iamVjdCBTeW1ib2xdJztcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlXG4gKiBbYHRvU3RyaW5nVGFnYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIG9mIHZhbHVlcy5cbiAqL1xudmFyIG9iamVjdFRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhIGBTeW1ib2xgIHByaW1pdGl2ZSBvciBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBzeW1ib2wsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc1N5bWJvbChTeW1ib2wuaXRlcmF0b3IpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNTeW1ib2woJ2FiYycpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNTeW1ib2wodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnc3ltYm9sJyB8fFxuICAgIChpc09iamVjdExpa2UodmFsdWUpICYmIG9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpID09IHN5bWJvbFRhZyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNTeW1ib2w7XG4iLCJ2YXIgYmFzZUlzVHlwZWRBcnJheSA9IHJlcXVpcmUoJy4vX2Jhc2VJc1R5cGVkQXJyYXknKSxcbiAgICBiYXNlVW5hcnkgPSByZXF1aXJlKCcuL19iYXNlVW5hcnknKSxcbiAgICBub2RlVXRpbCA9IHJlcXVpcmUoJy4vX25vZGVVdGlsJyk7XG5cbi8qIE5vZGUuanMgaGVscGVyIHJlZmVyZW5jZXMuICovXG52YXIgbm9kZUlzVHlwZWRBcnJheSA9IG5vZGVVdGlsICYmIG5vZGVVdGlsLmlzVHlwZWRBcnJheTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGEgdHlwZWQgYXJyYXkuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAzLjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSB0eXBlZCBhcnJheSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzVHlwZWRBcnJheShuZXcgVWludDhBcnJheSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc1R5cGVkQXJyYXkoW10pO1xuICogLy8gPT4gZmFsc2VcbiAqL1xudmFyIGlzVHlwZWRBcnJheSA9IG5vZGVJc1R5cGVkQXJyYXkgPyBiYXNlVW5hcnkobm9kZUlzVHlwZWRBcnJheSkgOiBiYXNlSXNUeXBlZEFycmF5O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGlzVHlwZWRBcnJheTtcbiIsInZhciBhcnJheUxpa2VLZXlzID0gcmVxdWlyZSgnLi9fYXJyYXlMaWtlS2V5cycpLFxuICAgIGJhc2VLZXlzSW4gPSByZXF1aXJlKCcuL19iYXNlS2V5c0luJyksXG4gICAgaXNBcnJheUxpa2UgPSByZXF1aXJlKCcuL2lzQXJyYXlMaWtlJyk7XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBhcnJheSBvZiB0aGUgb3duIGFuZCBpbmhlcml0ZWQgZW51bWVyYWJsZSBwcm9wZXJ0eSBuYW1lcyBvZiBgb2JqZWN0YC5cbiAqXG4gKiAqKk5vdGU6KiogTm9uLW9iamVjdCB2YWx1ZXMgYXJlIGNvZXJjZWQgdG8gb2JqZWN0cy5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDMuMC4wXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzLlxuICogQGV4YW1wbGVcbiAqXG4gKiBmdW5jdGlvbiBGb28oKSB7XG4gKiAgIHRoaXMuYSA9IDE7XG4gKiAgIHRoaXMuYiA9IDI7XG4gKiB9XG4gKlxuICogRm9vLnByb3RvdHlwZS5jID0gMztcbiAqXG4gKiBfLmtleXNJbihuZXcgRm9vKTtcbiAqIC8vID0+IFsnYScsICdiJywgJ2MnXSAoaXRlcmF0aW9uIG9yZGVyIGlzIG5vdCBndWFyYW50ZWVkKVxuICovXG5mdW5jdGlvbiBrZXlzSW4ob2JqZWN0KSB7XG4gIHJldHVybiBpc0FycmF5TGlrZShvYmplY3QpID8gYXJyYXlMaWtlS2V5cyhvYmplY3QsIHRydWUpIDogYmFzZUtleXNJbihvYmplY3QpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGtleXNJbjtcbiIsInZhciBiYXNlTWVyZ2UgPSByZXF1aXJlKCcuL19iYXNlTWVyZ2UnKSxcbiAgICBjcmVhdGVBc3NpZ25lciA9IHJlcXVpcmUoJy4vX2NyZWF0ZUFzc2lnbmVyJyk7XG5cbi8qKlxuICogVGhpcyBtZXRob2QgaXMgbGlrZSBgXy5hc3NpZ25gIGV4Y2VwdCB0aGF0IGl0IHJlY3Vyc2l2ZWx5IG1lcmdlcyBvd24gYW5kXG4gKiBpbmhlcml0ZWQgZW51bWVyYWJsZSBzdHJpbmcga2V5ZWQgcHJvcGVydGllcyBvZiBzb3VyY2Ugb2JqZWN0cyBpbnRvIHRoZVxuICogZGVzdGluYXRpb24gb2JqZWN0LiBTb3VyY2UgcHJvcGVydGllcyB0aGF0IHJlc29sdmUgdG8gYHVuZGVmaW5lZGAgYXJlXG4gKiBza2lwcGVkIGlmIGEgZGVzdGluYXRpb24gdmFsdWUgZXhpc3RzLiBBcnJheSBhbmQgcGxhaW4gb2JqZWN0IHByb3BlcnRpZXNcbiAqIGFyZSBtZXJnZWQgcmVjdXJzaXZlbHkuIE90aGVyIG9iamVjdHMgYW5kIHZhbHVlIHR5cGVzIGFyZSBvdmVycmlkZGVuIGJ5XG4gKiBhc3NpZ25tZW50LiBTb3VyY2Ugb2JqZWN0cyBhcmUgYXBwbGllZCBmcm9tIGxlZnQgdG8gcmlnaHQuIFN1YnNlcXVlbnRcbiAqIHNvdXJjZXMgb3ZlcndyaXRlIHByb3BlcnR5IGFzc2lnbm1lbnRzIG9mIHByZXZpb3VzIHNvdXJjZXMuXG4gKlxuICogKipOb3RlOioqIFRoaXMgbWV0aG9kIG11dGF0ZXMgYG9iamVjdGAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjUuMFxuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgZGVzdGluYXRpb24gb2JqZWN0LlxuICogQHBhcmFtIHsuLi5PYmplY3R9IFtzb3VyY2VzXSBUaGUgc291cmNlIG9iamVjdHMuXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBSZXR1cm5zIGBvYmplY3RgLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgb2JqZWN0ID0ge1xuICogICAnYSc6IFt7ICdiJzogMiB9LCB7ICdkJzogNCB9XVxuICogfTtcbiAqXG4gKiB2YXIgb3RoZXIgPSB7XG4gKiAgICdhJzogW3sgJ2MnOiAzIH0sIHsgJ2UnOiA1IH1dXG4gKiB9O1xuICpcbiAqIF8ubWVyZ2Uob2JqZWN0LCBvdGhlcik7XG4gKiAvLyA9PiB7ICdhJzogW3sgJ2InOiAyLCAnYyc6IDMgfSwgeyAnZCc6IDQsICdlJzogNSB9XSB9XG4gKi9cbnZhciBtZXJnZSA9IGNyZWF0ZUFzc2lnbmVyKGZ1bmN0aW9uKG9iamVjdCwgc291cmNlLCBzcmNJbmRleCkge1xuICBiYXNlTWVyZ2Uob2JqZWN0LCBzb3VyY2UsIHNyY0luZGV4KTtcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IG1lcmdlO1xuIiwidmFyIGJhc2VNZXJnZSA9IHJlcXVpcmUoJy4vX2Jhc2VNZXJnZScpLFxuICAgIGNyZWF0ZUFzc2lnbmVyID0gcmVxdWlyZSgnLi9fY3JlYXRlQXNzaWduZXInKTtcblxuLyoqXG4gKiBUaGlzIG1ldGhvZCBpcyBsaWtlIGBfLm1lcmdlYCBleGNlcHQgdGhhdCBpdCBhY2NlcHRzIGBjdXN0b21pemVyYCB3aGljaFxuICogaXMgaW52b2tlZCB0byBwcm9kdWNlIHRoZSBtZXJnZWQgdmFsdWVzIG9mIHRoZSBkZXN0aW5hdGlvbiBhbmQgc291cmNlXG4gKiBwcm9wZXJ0aWVzLiBJZiBgY3VzdG9taXplcmAgcmV0dXJucyBgdW5kZWZpbmVkYCwgbWVyZ2luZyBpcyBoYW5kbGVkIGJ5IHRoZVxuICogbWV0aG9kIGluc3RlYWQuIFRoZSBgY3VzdG9taXplcmAgaXMgaW52b2tlZCB3aXRoIHNpeCBhcmd1bWVudHM6XG4gKiAob2JqVmFsdWUsIHNyY1ZhbHVlLCBrZXksIG9iamVjdCwgc291cmNlLCBzdGFjaykuXG4gKlxuICogKipOb3RlOioqIFRoaXMgbWV0aG9kIG11dGF0ZXMgYG9iamVjdGAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IE9iamVjdFxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgZGVzdGluYXRpb24gb2JqZWN0LlxuICogQHBhcmFtIHsuLi5PYmplY3R9IHNvdXJjZXMgVGhlIHNvdXJjZSBvYmplY3RzLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY3VzdG9taXplciBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIGFzc2lnbmVkIHZhbHVlcy5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYG9iamVjdGAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIGZ1bmN0aW9uIGN1c3RvbWl6ZXIob2JqVmFsdWUsIHNyY1ZhbHVlKSB7XG4gKiAgIGlmIChfLmlzQXJyYXkob2JqVmFsdWUpKSB7XG4gKiAgICAgcmV0dXJuIG9ialZhbHVlLmNvbmNhdChzcmNWYWx1ZSk7XG4gKiAgIH1cbiAqIH1cbiAqXG4gKiB2YXIgb2JqZWN0ID0geyAnYSc6IFsxXSwgJ2InOiBbMl0gfTtcbiAqIHZhciBvdGhlciA9IHsgJ2EnOiBbM10sICdiJzogWzRdIH07XG4gKlxuICogXy5tZXJnZVdpdGgob2JqZWN0LCBvdGhlciwgY3VzdG9taXplcik7XG4gKiAvLyA9PiB7ICdhJzogWzEsIDNdLCAnYic6IFsyLCA0XSB9XG4gKi9cbnZhciBtZXJnZVdpdGggPSBjcmVhdGVBc3NpZ25lcihmdW5jdGlvbihvYmplY3QsIHNvdXJjZSwgc3JjSW5kZXgsIGN1c3RvbWl6ZXIpIHtcbiAgYmFzZU1lcmdlKG9iamVjdCwgc291cmNlLCBzcmNJbmRleCwgY3VzdG9taXplcik7XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBtZXJnZVdpdGg7XG4iLCJ2YXIgcm9vdCA9IHJlcXVpcmUoJy4vX3Jvb3QnKTtcblxuLyoqXG4gKiBHZXRzIHRoZSB0aW1lc3RhbXAgb2YgdGhlIG51bWJlciBvZiBtaWxsaXNlY29uZHMgdGhhdCBoYXZlIGVsYXBzZWQgc2luY2VcbiAqIHRoZSBVbml4IGVwb2NoICgxIEphbnVhcnkgMTk3MCAwMDowMDowMCBVVEMpLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMi40LjBcbiAqIEBjYXRlZ29yeSBEYXRlXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSB0aW1lc3RhbXAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uZGVmZXIoZnVuY3Rpb24oc3RhbXApIHtcbiAqICAgY29uc29sZS5sb2coXy5ub3coKSAtIHN0YW1wKTtcbiAqIH0sIF8ubm93KCkpO1xuICogLy8gPT4gTG9ncyB0aGUgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyBpdCB0b29rIGZvciB0aGUgZGVmZXJyZWQgaW52b2NhdGlvbi5cbiAqL1xudmFyIG5vdyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gcm9vdC5EYXRlLm5vdygpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBub3c7XG4iLCIvKipcbiAqIFRoaXMgbWV0aG9kIHJldHVybnMgYGZhbHNlYC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMTMuMFxuICogQGNhdGVnb3J5IFV0aWxcbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8udGltZXMoMiwgXy5zdHViRmFsc2UpO1xuICogLy8gPT4gW2ZhbHNlLCBmYWxzZV1cbiAqL1xuZnVuY3Rpb24gc3R1YkZhbHNlKCkge1xuICByZXR1cm4gZmFsc2U7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3R1YkZhbHNlO1xuIiwidmFyIGRlYm91bmNlID0gcmVxdWlyZSgnLi9kZWJvdW5jZScpLFxuICAgIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9pc09iamVjdCcpO1xuXG4vKiogRXJyb3IgbWVzc2FnZSBjb25zdGFudHMuICovXG52YXIgRlVOQ19FUlJPUl9URVhUID0gJ0V4cGVjdGVkIGEgZnVuY3Rpb24nO1xuXG4vKipcbiAqIENyZWF0ZXMgYSB0aHJvdHRsZWQgZnVuY3Rpb24gdGhhdCBvbmx5IGludm9rZXMgYGZ1bmNgIGF0IG1vc3Qgb25jZSBwZXJcbiAqIGV2ZXJ5IGB3YWl0YCBtaWxsaXNlY29uZHMuIFRoZSB0aHJvdHRsZWQgZnVuY3Rpb24gY29tZXMgd2l0aCBhIGBjYW5jZWxgXG4gKiBtZXRob2QgdG8gY2FuY2VsIGRlbGF5ZWQgYGZ1bmNgIGludm9jYXRpb25zIGFuZCBhIGBmbHVzaGAgbWV0aG9kIHRvXG4gKiBpbW1lZGlhdGVseSBpbnZva2UgdGhlbS4gUHJvdmlkZSBgb3B0aW9uc2AgdG8gaW5kaWNhdGUgd2hldGhlciBgZnVuY2BcbiAqIHNob3VsZCBiZSBpbnZva2VkIG9uIHRoZSBsZWFkaW5nIGFuZC9vciB0cmFpbGluZyBlZGdlIG9mIHRoZSBgd2FpdGBcbiAqIHRpbWVvdXQuIFRoZSBgZnVuY2AgaXMgaW52b2tlZCB3aXRoIHRoZSBsYXN0IGFyZ3VtZW50cyBwcm92aWRlZCB0byB0aGVcbiAqIHRocm90dGxlZCBmdW5jdGlvbi4gU3Vic2VxdWVudCBjYWxscyB0byB0aGUgdGhyb3R0bGVkIGZ1bmN0aW9uIHJldHVybiB0aGVcbiAqIHJlc3VsdCBvZiB0aGUgbGFzdCBgZnVuY2AgaW52b2NhdGlvbi5cbiAqXG4gKiAqKk5vdGU6KiogSWYgYGxlYWRpbmdgIGFuZCBgdHJhaWxpbmdgIG9wdGlvbnMgYXJlIGB0cnVlYCwgYGZ1bmNgIGlzXG4gKiBpbnZva2VkIG9uIHRoZSB0cmFpbGluZyBlZGdlIG9mIHRoZSB0aW1lb3V0IG9ubHkgaWYgdGhlIHRocm90dGxlZCBmdW5jdGlvblxuICogaXMgaW52b2tlZCBtb3JlIHRoYW4gb25jZSBkdXJpbmcgdGhlIGB3YWl0YCB0aW1lb3V0LlxuICpcbiAqIElmIGB3YWl0YCBpcyBgMGAgYW5kIGBsZWFkaW5nYCBpcyBgZmFsc2VgLCBgZnVuY2AgaW52b2NhdGlvbiBpcyBkZWZlcnJlZFxuICogdW50aWwgdG8gdGhlIG5leHQgdGljaywgc2ltaWxhciB0byBgc2V0VGltZW91dGAgd2l0aCBhIHRpbWVvdXQgb2YgYDBgLlxuICpcbiAqIFNlZSBbRGF2aWQgQ29yYmFjaG8ncyBhcnRpY2xlXShodHRwczovL2Nzcy10cmlja3MuY29tL2RlYm91bmNpbmctdGhyb3R0bGluZy1leHBsYWluZWQtZXhhbXBsZXMvKVxuICogZm9yIGRldGFpbHMgb3ZlciB0aGUgZGlmZmVyZW5jZXMgYmV0d2VlbiBgXy50aHJvdHRsZWAgYW5kIGBfLmRlYm91bmNlYC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIHRocm90dGxlLlxuICogQHBhcmFtIHtudW1iZXJ9IFt3YWl0PTBdIFRoZSBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIHRvIHRocm90dGxlIGludm9jYXRpb25zIHRvLlxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zPXt9XSBUaGUgb3B0aW9ucyBvYmplY3QuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLmxlYWRpbmc9dHJ1ZV1cbiAqICBTcGVjaWZ5IGludm9raW5nIG9uIHRoZSBsZWFkaW5nIGVkZ2Ugb2YgdGhlIHRpbWVvdXQuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLnRyYWlsaW5nPXRydWVdXG4gKiAgU3BlY2lmeSBpbnZva2luZyBvbiB0aGUgdHJhaWxpbmcgZWRnZSBvZiB0aGUgdGltZW91dC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IHRocm90dGxlZCBmdW5jdGlvbi5cbiAqIEBleGFtcGxlXG4gKlxuICogLy8gQXZvaWQgZXhjZXNzaXZlbHkgdXBkYXRpbmcgdGhlIHBvc2l0aW9uIHdoaWxlIHNjcm9sbGluZy5cbiAqIGpRdWVyeSh3aW5kb3cpLm9uKCdzY3JvbGwnLCBfLnRocm90dGxlKHVwZGF0ZVBvc2l0aW9uLCAxMDApKTtcbiAqXG4gKiAvLyBJbnZva2UgYHJlbmV3VG9rZW5gIHdoZW4gdGhlIGNsaWNrIGV2ZW50IGlzIGZpcmVkLCBidXQgbm90IG1vcmUgdGhhbiBvbmNlIGV2ZXJ5IDUgbWludXRlcy5cbiAqIHZhciB0aHJvdHRsZWQgPSBfLnRocm90dGxlKHJlbmV3VG9rZW4sIDMwMDAwMCwgeyAndHJhaWxpbmcnOiBmYWxzZSB9KTtcbiAqIGpRdWVyeShlbGVtZW50KS5vbignY2xpY2snLCB0aHJvdHRsZWQpO1xuICpcbiAqIC8vIENhbmNlbCB0aGUgdHJhaWxpbmcgdGhyb3R0bGVkIGludm9jYXRpb24uXG4gKiBqUXVlcnkod2luZG93KS5vbigncG9wc3RhdGUnLCB0aHJvdHRsZWQuY2FuY2VsKTtcbiAqL1xuZnVuY3Rpb24gdGhyb3R0bGUoZnVuYywgd2FpdCwgb3B0aW9ucykge1xuICB2YXIgbGVhZGluZyA9IHRydWUsXG4gICAgICB0cmFpbGluZyA9IHRydWU7XG5cbiAgaWYgKHR5cGVvZiBmdW5jICE9ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKEZVTkNfRVJST1JfVEVYVCk7XG4gIH1cbiAgaWYgKGlzT2JqZWN0KG9wdGlvbnMpKSB7XG4gICAgbGVhZGluZyA9ICdsZWFkaW5nJyBpbiBvcHRpb25zID8gISFvcHRpb25zLmxlYWRpbmcgOiBsZWFkaW5nO1xuICAgIHRyYWlsaW5nID0gJ3RyYWlsaW5nJyBpbiBvcHRpb25zID8gISFvcHRpb25zLnRyYWlsaW5nIDogdHJhaWxpbmc7XG4gIH1cbiAgcmV0dXJuIGRlYm91bmNlKGZ1bmMsIHdhaXQsIHtcbiAgICAnbGVhZGluZyc6IGxlYWRpbmcsXG4gICAgJ21heFdhaXQnOiB3YWl0LFxuICAgICd0cmFpbGluZyc6IHRyYWlsaW5nXG4gIH0pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHRocm90dGxlO1xuIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9pc09iamVjdCcpLFxuICAgIGlzU3ltYm9sID0gcmVxdWlyZSgnLi9pc1N5bWJvbCcpO1xuXG4vKiogVXNlZCBhcyByZWZlcmVuY2VzIGZvciB2YXJpb3VzIGBOdW1iZXJgIGNvbnN0YW50cy4gKi9cbnZhciBOQU4gPSAwIC8gMDtcblxuLyoqIFVzZWQgdG8gbWF0Y2ggbGVhZGluZyBhbmQgdHJhaWxpbmcgd2hpdGVzcGFjZS4gKi9cbnZhciByZVRyaW0gPSAvXlxccyt8XFxzKyQvZztcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IGJhZCBzaWduZWQgaGV4YWRlY2ltYWwgc3RyaW5nIHZhbHVlcy4gKi9cbnZhciByZUlzQmFkSGV4ID0gL15bLStdMHhbMC05YS1mXSskL2k7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBiaW5hcnkgc3RyaW5nIHZhbHVlcy4gKi9cbnZhciByZUlzQmluYXJ5ID0gL14wYlswMV0rJC9pO1xuXG4vKiogVXNlZCB0byBkZXRlY3Qgb2N0YWwgc3RyaW5nIHZhbHVlcy4gKi9cbnZhciByZUlzT2N0YWwgPSAvXjBvWzAtN10rJC9pO1xuXG4vKiogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgd2l0aG91dCBhIGRlcGVuZGVuY3kgb24gYHJvb3RgLiAqL1xudmFyIGZyZWVQYXJzZUludCA9IHBhcnNlSW50O1xuXG4vKipcbiAqIENvbnZlcnRzIGB2YWx1ZWAgdG8gYSBudW1iZXIuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHByb2Nlc3MuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSBudW1iZXIuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8udG9OdW1iZXIoMy4yKTtcbiAqIC8vID0+IDMuMlxuICpcbiAqIF8udG9OdW1iZXIoTnVtYmVyLk1JTl9WQUxVRSk7XG4gKiAvLyA9PiA1ZS0zMjRcbiAqXG4gKiBfLnRvTnVtYmVyKEluZmluaXR5KTtcbiAqIC8vID0+IEluZmluaXR5XG4gKlxuICogXy50b051bWJlcignMy4yJyk7XG4gKiAvLyA9PiAzLjJcbiAqL1xuZnVuY3Rpb24gdG9OdW1iZXIodmFsdWUpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJykge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuICBpZiAoaXNTeW1ib2wodmFsdWUpKSB7XG4gICAgcmV0dXJuIE5BTjtcbiAgfVxuICBpZiAoaXNPYmplY3QodmFsdWUpKSB7XG4gICAgdmFyIG90aGVyID0gdHlwZW9mIHZhbHVlLnZhbHVlT2YgPT0gJ2Z1bmN0aW9uJyA/IHZhbHVlLnZhbHVlT2YoKSA6IHZhbHVlO1xuICAgIHZhbHVlID0gaXNPYmplY3Qob3RoZXIpID8gKG90aGVyICsgJycpIDogb3RoZXI7XG4gIH1cbiAgaWYgKHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykge1xuICAgIHJldHVybiB2YWx1ZSA9PT0gMCA/IHZhbHVlIDogK3ZhbHVlO1xuICB9XG4gIHZhbHVlID0gdmFsdWUucmVwbGFjZShyZVRyaW0sICcnKTtcbiAgdmFyIGlzQmluYXJ5ID0gcmVJc0JpbmFyeS50ZXN0KHZhbHVlKTtcbiAgcmV0dXJuIChpc0JpbmFyeSB8fCByZUlzT2N0YWwudGVzdCh2YWx1ZSkpXG4gICAgPyBmcmVlUGFyc2VJbnQodmFsdWUuc2xpY2UoMiksIGlzQmluYXJ5ID8gMiA6IDgpXG4gICAgOiAocmVJc0JhZEhleC50ZXN0KHZhbHVlKSA/IE5BTiA6ICt2YWx1ZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdG9OdW1iZXI7XG4iLCJ2YXIgY29weU9iamVjdCA9IHJlcXVpcmUoJy4vX2NvcHlPYmplY3QnKSxcbiAgICBrZXlzSW4gPSByZXF1aXJlKCcuL2tleXNJbicpO1xuXG4vKipcbiAqIENvbnZlcnRzIGB2YWx1ZWAgdG8gYSBwbGFpbiBvYmplY3QgZmxhdHRlbmluZyBpbmhlcml0ZWQgZW51bWVyYWJsZSBzdHJpbmdcbiAqIGtleWVkIHByb3BlcnRpZXMgb2YgYHZhbHVlYCB0byBvd24gcHJvcGVydGllcyBvZiB0aGUgcGxhaW4gb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMy4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjb252ZXJ0LlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgY29udmVydGVkIHBsYWluIG9iamVjdC5cbiAqIEBleGFtcGxlXG4gKlxuICogZnVuY3Rpb24gRm9vKCkge1xuICogICB0aGlzLmIgPSAyO1xuICogfVxuICpcbiAqIEZvby5wcm90b3R5cGUuYyA9IDM7XG4gKlxuICogXy5hc3NpZ24oeyAnYSc6IDEgfSwgbmV3IEZvbyk7XG4gKiAvLyA9PiB7ICdhJzogMSwgJ2InOiAyIH1cbiAqXG4gKiBfLmFzc2lnbih7ICdhJzogMSB9LCBfLnRvUGxhaW5PYmplY3QobmV3IEZvbykpO1xuICogLy8gPT4geyAnYSc6IDEsICdiJzogMiwgJ2MnOiAzIH1cbiAqL1xuZnVuY3Rpb24gdG9QbGFpbk9iamVjdCh2YWx1ZSkge1xuICByZXR1cm4gY29weU9iamVjdCh2YWx1ZSwga2V5c0luKHZhbHVlKSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdG9QbGFpbk9iamVjdDtcbiIsImltcG9ydCBtZXJnZSBmcm9tICdsb2Rhc2gvbWVyZ2UnXG5cbi8qIEFDVElPTlMgKi9cblxuZXhwb3J0IGNvbnN0IG5leHRBbHQgPSAodGFnLCBuQWx0cywgaW5pdGlhbCkgPT4gKHsgdHlwZTogJ25leHRBbHQnLCB0YWcsIG5BbHRzLCBpbml0aWFsIH0pXG5cbi8qIFJFRFVDRVIgKi9cblxuZXhwb3J0IGRlZmF1bHQgKHN0YXRlID0ge30sIHsgdHlwZSwgdGFnLCBpbml0aWFsLCBuQWx0cyB9KSA9PiB7XG4gIHN3aXRjaCAodHlwZSkge1xuICAgIGNhc2UgJ25leHRBbHQnOiB7XG4gICAgICBjb25zdCB7IFt0YWddOiBvbGRBbHQgPSAoaW5pdGlhbCB8fCAwKSB9ID0gc3RhdGVcbiAgICAgIGNvbnN0IG5ld0FsdCA9IChvbGRBbHQgKyAxKSAlIG5BbHRzXG4gICAgICByZXR1cm4gbWVyZ2Uoe30sIHN0YXRlLCB7IFt0YWddOiBuZXdBbHQgfSlcbiAgICB9XG4gICAgZGVmYXVsdDogcmV0dXJuIHN0YXRlXG4gIH1cbn1cblxuLyogU0VMRUNUT1JTICovXG5cbmV4cG9ydCBjb25zdCBnZXRBbHQgPSAoeyBhbHRlciB9LCB7IHRhZywgaW5pdGlhbCB9KSA9PiB7XG4gIGNvbnN0IHsgW3RhZ106IGFsdCA9IGluaXRpYWwgfHwgMCB9ID0gYWx0ZXJcbiAgcmV0dXJuIHsgYWx0IH1cbn1cblxuLyogSEVMUEVSUyAqL1xuXG4iLCJpbXBvcnQgeyBjcmVhdGVTdG9yZSwgYXBwbHlNaWRkbGV3YXJlIH0gZnJvbSAncmVkdXgnXG5pbXBvcnQgdGh1bmtNaWRkbGV3YXJlIGZyb20gJ3JlZHV4LXRodW5rJ1xuXG5jb25zdCBjb25maWd1cmVTdG9yZSA9IChyZWR1Y2VyKSA9PiB7XG4gIGNvbnN0IG1pZGRsZXdhcmVzID0gW3RodW5rTWlkZGxld2FyZV1cbiAgY29uc3Qgc3RvcmVDb21wb25lbnRzID0gW3JlZHVjZXJdXG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gYGRldmVsb3BtZW50YCkge1xuICAgIGNvbnN0IHsgY3JlYXRlTG9nZ2VyIH0gPSByZXF1aXJlKGByZWR1eC1sb2dnZXJgKVxuICAgIG1pZGRsZXdhcmVzLnB1c2goY3JlYXRlTG9nZ2VyKCkpXG4gICAgc3RvcmVDb21wb25lbnRzLnB1c2goXG4gICAgICB3aW5kb3cuX19SRURVWF9ERVZUT09MU19FWFRFTlNJT05fXyAmJiB3aW5kb3cuX19SRURVWF9ERVZUT09MU19FWFRFTlNJT05fXygpLFxuICAgIClcbiAgfVxuICBzdG9yZUNvbXBvbmVudHMucHVzaChcbiAgICBhcHBseU1pZGRsZXdhcmUoLi4ubWlkZGxld2FyZXMpLFxuICApXG5cbiAgY29uc3Qgc3RvcmUgPSBjcmVhdGVTdG9yZShcbiAgICAuLi5zdG9yZUNvbXBvbmVudHNcbiAgKVxuICByZXR1cm4gc3RvcmVcbn1cblxuZXhwb3J0IGRlZmF1bHQgY29uZmlndXJlU3RvcmVcbiIsImltcG9ydCBtZXJnZSBmcm9tICdsb2Rhc2gvbWVyZ2UnXG5cbmltcG9ydCB7IGZldGNoRGF0YSB9IGZyb20gJ3NlcnZlci5qcydcbmltcG9ydCB7IHByb3BzQ2hhbmdlZCB9IGZyb20gJ2hlbHBlcnMuanMnXG5cbi8qIEFDVElPTlMgKi9cbi8qXG4gKiBNb3N0IGFjdGlvbnMgY2FsbCBmZXRjaERhdGEsIHdoaWNoIHdpbGwgZGlzcGF0Y2ggdGhlIHVsdGltYXRlIGZldGNoIGFjdGlvbi5cbiAqL1xuXG5leHBvcnQgY29uc3QgZmV0Y2hEb2MgPSAocHJvcHMpID0+IHtcbiAgY29uc3QgeyBkb2NEaXIsIGRvY05hbWUsIGRvY0V4dCB9ID0gcHJvcHNcbiAgY29uc3QgcGF0aCA9IGAke2RvY0Rpcn0vJHtkb2NOYW1lfS4ke2RvY0V4dH1gXG4gIHJldHVybiBmZXRjaERhdGEoeyB0eXBlOiAnZmV0Y2hEb2MnLCBjb250ZW50VHlwZTogJ2pzb24nLCBwYXRoLCBkZXNjOiBgZG9jdW1lbnQgJHtkb2NOYW1lfWAgfSlcbn1cblxuLyogUkVEVUNFUiAqL1xuXG5leHBvcnQgZGVmYXVsdCAoc3RhdGUgPSB7fSwgeyB0eXBlLCBwYXRoLCBkYXRhIH0pID0+IHtcbiAgc3dpdGNoICh0eXBlKSB7XG4gICAgY2FzZSAnZmV0Y2hEb2MnOiB7XG4gICAgICBpZiAoZGF0YSA9PSBudWxsKSB7cmV0dXJuIHN0YXRlfVxuICAgICAgcmV0dXJuIG1lcmdlKHt9LCBzdGF0ZSwgeyBbcGF0aF06IGRhdGEgfSlcbiAgICB9XG4gICAgZGVmYXVsdDogcmV0dXJuIHN0YXRlXG4gIH1cbn1cblxuLyogU0VMRUNUT1JTICovXG5cbmV4cG9ydCBjb25zdCBnZXREb2MgPSAoeyBkb2MgfSwgeyBkb2NEaXIsIGRvY05hbWUsIGRvY0V4dCB9KSA9PiB7XG4gIHJldHVybiB7IHRleHQ6IGRvY1tgJHtkb2NEaXJ9LyR7ZG9jTmFtZX0uJHtkb2NFeHR9YF0gfVxufVxuXG4vKiBIRUxQRVJTICovXG5cbmV4cG9ydCBjb25zdCBuZWVkRG9jID0gcHJvcHMgPT4gKHByb3BzLnRleHQgPT0gbnVsbClcblxuZXhwb3J0IGNvbnN0IGNoYW5nZWREb2MgPSAobmV3UHJvcHMsIG9sZFByb3BzKSA9PiAoXG4gIHByb3BzQ2hhbmdlZChuZXdQcm9wcywgbmVlZERvYywgb2xkUHJvcHMsIFsnZG9jRGlyJywgJ2RvY05hbWUnLCAnZG9jRXh0J10pXG4pXG5cbiIsImltcG9ydCBtZXJnZSBmcm9tICdsb2Rhc2gvbWVyZ2UnXG5pbXBvcnQgeyBtZW1vQmluZCB9IGZyb20gJ2hlbHBlcnMuanMnXG5pbXBvcnQgeyByZXByIH0gZnJvbSAndGFibGVzLmpzJ1xuXG4vKiBBQ1RJT05TICovXG5cbmV4cG9ydCBjb25zdCBjaGFuZ2VGdWxsdGV4dCA9ICh0YWJsZSwgZmlsdGVySWQsIHNlYXJjaFN0cmluZykgPT4gKHsgdHlwZTogJ2Z1bGx0ZXh0JywgdGFibGUsIGZpbHRlcklkLCBkYXRhOiBzZWFyY2hTdHJpbmcgfSlcbmV4cG9ydCBjb25zdCBjaGFuZ2VGYWNldCA9ICh0YWJsZSwgZmlsdGVySWQsIHZhbHVlSWQsIG9uT2ZmKSA9PiAoeyB0eXBlOiAnZmFjZXQnLCB0YWJsZSwgZmlsdGVySWQsIGRhdGE6IFt2YWx1ZUlkLCBvbk9mZl0gfSlcbmV4cG9ydCBjb25zdCBjaGFuZ2VGYWNldEFsbCA9ICh0YWJsZSwgZmlsdGVySWQsIG9uT2ZmKSA9PiAoeyB0eXBlOiAnZmFjZXRBbGwnLCB0YWJsZSwgZmlsdGVySWQsIGRhdGE6IG9uT2ZmIH0pXG5cbmV4cG9ydCBjb25zdCBzZXR1cEZpbHRlcmluZyA9ICh0YWJsZXMsIHRhYmxlKSA9PiBkaXNwYXRjaCA9PiB7XG4gIGNvbnN0IGZpZWxkVmFsdWVzID0gbWVtb0JpbmQoZkNDLCAnY29tcGlsZUZpbHRlcmluZycsIFt0YWJsZV0sIFt0YWJsZXMsIHRhYmxlXSlcbiAgY29uc3QgZmlsdGVyU2V0dGluZ3MgPSBtZW1vQmluZChmQ0MsICdpbml0RmlsdGVyaW5nJywgW3RhYmxlXSwgW3RhYmxlcywgdGFibGUsIGZpZWxkVmFsdWVzXSlcbiAgZGlzcGF0Y2goeyB0eXBlOiAnc2V0dXBGaWx0ZXJpbmcnLCB0YWJsZSwgZmlsdGVyU2V0dGluZ3MgfSlcbn1cblxuLyogUkVEVUNFUiAqL1xuXG5leHBvcnQgZGVmYXVsdCAoc3RhdGU9e30sIHsgdHlwZSwgdGFibGUsIGZpbHRlcklkLCBkYXRhLCBmaWx0ZXJTZXR0aW5ncyB9KSA9PiB7XG4gIHN3aXRjaCAodHlwZSkge1xuICAgIGNhc2UgJ3NldHVwRmlsdGVyaW5nJzoge1xuICAgICAgcmV0dXJuIG1lcmdlKHt9LCBzdGF0ZSwgeyBbdGFibGVdOiB7IGZpbHRlclNldHRpbmdzLCBpbml0aWFsaXplZDogdHJ1ZSB9IH0pXG4gICAgfVxuICAgIGNhc2UgJ2Z1bGx0ZXh0Jzoge1xuICAgICAgcmV0dXJuIG1lcmdlKHt9LCBzdGF0ZSwgeyBbdGFibGVdOiB7IGZpbHRlclNldHRpbmdzOiB7IFtmaWx0ZXJJZF06IGRhdGEgfSB9IH0pXG4gICAgfVxuICAgIGNhc2UgJ2ZhY2V0QWxsJzoge1xuICAgICAgY29uc3QgeyBbdGFibGVdOiB7IGZpbHRlclNldHRpbmdzOiB7IFtmaWx0ZXJJZF06IGZhY2V0cyB9IH0gfSA9IHN0YXRlXG4gICAgICBjb25zdCBzYW1lU2V0dGluZ3MgPSB7fVxuICAgICAgT2JqZWN0LmtleXMoZmFjZXRzKS5mb3JFYWNoKHZhbHVlSWQgPT4ge3NhbWVTZXR0aW5nc1t2YWx1ZUlkXSA9IGRhdGF9KVxuICAgICAgcmV0dXJuIG1lcmdlKHt9LCBzdGF0ZSwgeyBbdGFibGVdOiB7IGZpbHRlclNldHRpbmdzOiB7IFtmaWx0ZXJJZF06IHNhbWVTZXR0aW5ncyB9IH0gfSlcbiAgICB9XG4gICAgY2FzZSAnZmFjZXQnOiB7XG4gICAgICBjb25zdCBbdmFsdWVJZCwgZmlsdGVyU2V0dGluZ10gPSBkYXRhXG4gICAgICByZXR1cm4gbWVyZ2Uoe30sIHN0YXRlLCB7IFt0YWJsZV06IHsgZmlsdGVyU2V0dGluZ3M6IHsgW2ZpbHRlcklkXTogeyBbdmFsdWVJZF06IGZpbHRlclNldHRpbmcgfSB9IH0gfSlcbiAgICB9XG4gICAgZGVmYXVsdDogcmV0dXJuIHN0YXRlXG4gIH1cbn1cblxuLyogU0VMRUNUT1JTICovXG5cbmV4cG9ydCBjb25zdCBnZXRGaWx0ZXJTZXR0aW5nID0gKHsgZmlsdGVyIH0sIHsgdGFibGUsIGZpbHRlcklkIH0pID0+ICh7XG4gIGZpbHRlclNldHRpbmc6IGZpbHRlclt0YWJsZV0uZmlsdGVyU2V0dGluZ3NbZmlsdGVySWRdLFxufSlcblxuZXhwb3J0IGNvbnN0IGdldEZpZWxkVmFsdWVzID0gKHsgdGFibGVzIH0sIHsgdGFibGUsIGZpbHRlckZpZWxkIH0pID0+ICh7XG4gIGZpZWxkVmFsdWVzOiBtZW1vQmluZChmQ0MsICdjb21waWxlRmlsdGVyaW5nJywgW3RhYmxlXSwgW3RhYmxlcywgdGFibGVdKVtmaWx0ZXJGaWVsZF1cbn0pXG5cbmV4cG9ydCBjb25zdCBnZXRGaWx0ZXJzQXBwbGllZCA9ICh7IHRhYmxlcywgZmlsdGVyIH0sIHsgdGFibGUgfSkgPT4ge1xuICBjb25zdCB7IFt0YWJsZV06IGZpbHRlclN0YXR1cyA9IHsgZmlsdGVyU2V0dGluZ3M6IHt9LCBpbml0aWFsaXplZDogZmFsc2UgfSB9ID0gZmlsdGVyXG4gIGNvbnN0IHsgZmlsdGVyU2V0dGluZ3MsIGluaXRpYWxpemVkIH0gPSBmaWx0ZXJTdGF0dXNcbiAgY29uc3QgZmllbGRWYWx1ZXMgPSBtZW1vQmluZChmQ0MsICdjb21waWxlRmlsdGVyaW5nJywgW3RhYmxlXSwgW3RhYmxlcywgdGFibGVdKVxuICBpZiAoaW5pdGlhbGl6ZWQpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdGFibGVzLFxuICAgICAgaW5pdGlhbGl6ZWQsXG4gICAgICBmaWVsZFZhbHVlcyxcbiAgICAgIGZpbHRlclNldHRpbmdzLFxuICAgICAgLi4uY29tcHV0ZUZpbHRlcmluZyh0YWJsZXMsIHRhYmxlLCBmaWVsZFZhbHVlcywgZmlsdGVyU2V0dGluZ3MpLFxuICAgIH1cbiAgfVxuICBlbHNlIHtcbiAgICByZXR1cm4ge1xuICAgICAgdGFibGVzLFxuICAgICAgaW5pdGlhbGl6ZWQsXG4gICAgICBmaWVsZFZhbHVlcyxcbiAgICB9XG4gIH1cbn1cblxuLyogSEVMUEVSUyAqL1xuXG5jbGFzcyBGaWx0ZXJDb21waWxlQ2FjaGUge1xuICBjb21waWxlRmlsdGVyaW5nID0gKHRhYmxlcywgdGFibGUpID0+IHtcbiAgICBjb25zdCB7IFt0YWJsZV06IHsgZW50aXRpZXMsIG9yZGVyLCB2YWx1ZUxpc3RzLCBmaWVsZHMsIGZpbHRlckxpc3QsIGZpZWxkU3BlY3MgfSB9ID0gdGFibGVzXG4gICAgY29uc3QgcHJlc2VudEZpbHRlckxpc3QgPSBmaWx0ZXJMaXN0LmZpbHRlcih4ID0+IGZpZWxkc1t4LmZpZWxkXSlcbiAgICBjb25zdCBmaWx0ZXJGaWVsZHMgPSBwcmVzZW50RmlsdGVyTGlzdC5maWx0ZXIoeCA9PiB4LnR5cGUgIT09ICdGdWxsVGV4dCcpLm1hcCh4ID0+IHguZmllbGQpXG4gICAgY29uc3QgZmllbGRWYWx1ZXMgPSB7fVxuICAgIGZvciAoY29uc3QgZmllbGQgb2YgZmlsdGVyRmllbGRzKSB7XG4gICAgICBjb25zdCB7IFtmaWVsZF06IHsgdmFsVHlwZSB9IH0gPSBmaWVsZFNwZWNzIFxuICAgICAgY29uc3QgeyBbZmllbGRdOiB2YWxzIH0gPSB2YWx1ZUxpc3RzXG4gICAgICBjb25zdCBmRmllbGRWYWx1ZXMgPSB7WycnXTogJy1ub25lLSd9XG4gICAgICBjb25zdCBvcmRlcmVkVmFscyA9IE9iamVjdC5rZXlzKHZhbHMpLnNvcnQoKVxuICAgICAgaWYgKHR5cGVvZiB2YWxUeXBlID09ICdzdHJpbmcnKSB7XG4gICAgICAgIG9yZGVyZWRWYWxzLmZvckVhY2goKHYsaSkgPT4ge2ZGaWVsZFZhbHVlc1tpXSA9IHZ9KVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGNvbnN0IHsgdmFsdWVzOiByZWwgfSA9IHZhbFR5cGVcbiAgICAgICAgb3JkZXJlZFZhbHMuZm9yRWFjaCh2ID0+IHtcbiAgICAgICAgICBmRmllbGRWYWx1ZXNbdl0gPSByZXByKHRhYmxlcywgcmVsLCB2KVxuICAgICAgICB9KSBcbiAgICAgIH1cbiAgICAgIGZpZWxkVmFsdWVzW2ZpZWxkXSA9IGZGaWVsZFZhbHVlc1xuICAgIH1cbiAgICByZXR1cm4gZmllbGRWYWx1ZXNcbiAgfVxuICBpbml0RmlsdGVyaW5nID0gKHRhYmxlcywgdGFibGUsIGZpZWxkVmFsdWVzKSA9PiB7XG4gICAgY29uc3QgeyBbdGFibGVdOiB7IGVudGl0aWVzLCBvcmRlciwgZmllbGRzLCBmaWx0ZXJMaXN0IH0gfSA9IHRhYmxlc1xuICAgIGNvbnN0IHByZXNlbnRGaWx0ZXJMaXN0ID0gZmlsdGVyTGlzdC5maWx0ZXIoeCA9PiBmaWVsZHNbeC5maWVsZF0pXG4gICAgY29uc3QgZmlsdGVyU2V0dGluZ3MgPSB7fVxuICAgIHByZXNlbnRGaWx0ZXJMaXN0LmZvckVhY2goKGZpbHRlclNwZWMsIGZpbHRlcklkKSA9PiB7XG4gICAgICBpZiAoZmlsdGVyU3BlYy50eXBlID09ICdGdWxsVGV4dCcpIHtcbiAgICAgICAgZmlsdGVyU2V0dGluZ3NbZmlsdGVySWRdID0gJydcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBjb25zdCBmYWNldHMgPSB7fVxuICAgICAgICBPYmplY3Qua2V5cyhmaWVsZFZhbHVlc1tmaWx0ZXJTcGVjLmZpZWxkXSkuZm9yRWFjaCh2YWx1ZUlkID0+IHtmYWNldHNbdmFsdWVJZF0gPSB0cnVlfSlcbiAgICAgICAgZmlsdGVyU2V0dGluZ3NbZmlsdGVySWRdID0gZmFjZXRzXG4gICAgICB9XG4gICAgfSlcbiAgICByZXR1cm4gZmlsdGVyU2V0dGluZ3NcbiAgfVxufVxuY29uc3QgZkNDID0gbmV3IEZpbHRlckNvbXBpbGVDYWNoZSgpXG5cblxuY29uc3QgY29tcHV0ZUZpbHRlcmluZyA9ICh0YWJsZXMsIHRhYmxlLCBmaWVsZFZhbHVlcywgZmlsdGVyU2V0dGluZ3MpID0+IHtcbiAgY29uc3QgeyBbdGFibGVdOiB7IGVudGl0aWVzLCBvcmRlciwgZmllbGRzLCBmaWVsZFNwZWNzLCBmaWx0ZXJMaXN0IH0gfSA9IHRhYmxlc1xuICBjb25zdCBwcmVzZW50RmlsdGVyTGlzdCA9IGZpbHRlckxpc3QuZmlsdGVyKHggPT4gZmllbGRzW3guZmllbGRdKVxuICBjb25zdCBmaWx0ZXJDaGVja3MgPSB7fVxuICBjb25zdCBvdGhlckZpbHRlcmVkRGF0YSA9IHt9XG5cbiAgY29uc3QgbWFrZUZpbHRlckNoZWNrPSAoZmlsdGVyU3BlYywgZmlsdGVySWQpID0+IHtcbiAgICBjb25zdCB7IGZpZWxkIH0gPSBmaWx0ZXJTcGVjXG4gICAgY29uc3QgeyBbZmlsdGVySWRdOiBmaWx0ZXJTZXR0aW5nIH0gPSBmaWx0ZXJTZXR0aW5nc1xuICAgIGNvbnN0IHsgW2ZpZWxkXTogZmllbGRTcGVjIH0gPSBmaWVsZFNwZWNzXG4gICAgcmV0dXJuIChcbiAgICAgIGZpbHRlclNwZWMudHlwZSA9PT0gJ0Z1bGxUZXh0JyA/XG4gICAgICAgICAgZnVsbHRleHRDaGVjayA6XG4gICAgICAgICAgZmFjZXRDaGVja1xuICAgICAgKSh0YWJsZXMsIGZpZWxkLCBmaWVsZFNwZWMsIGZpbHRlclNldHRpbmcpXG4gIH1cblxuICBwcmVzZW50RmlsdGVyTGlzdC5mb3JFYWNoKChmaWx0ZXJTcGVjLCBmaWx0ZXJJZCkgPT4ge1xuICAgIGZpbHRlckNoZWNrc1tmaWx0ZXJJZF0gPSBtYWtlRmlsdGVyQ2hlY2soZmlsdGVyU3BlYywgZmlsdGVySWQpXG4gICAgb3RoZXJGaWx0ZXJlZERhdGFbZmlsdGVySWRdID0gW11cbiAgfSlcbiAgY29uc3QgZmlsdGVyZWREYXRhID0gW11cblxuICBmb3IgKGNvbnN0IGVJZCBvZiBvcmRlcikge1xuICAgIGNvbnN0IGVudGl0eSA9IGVudGl0aWVzW2VJZF1cbiAgICBsZXQgdGhlT25lRmFpbCA9IG51bGxcbiAgICBsZXQgdiA9IHRydWVcbiAgICBsZXQgZGlzY2FyZCA9IGZhbHNlXG4gICAgT2JqZWN0LmVudHJpZXMoZmlsdGVyQ2hlY2tzKS5mb3JFYWNoKChbZmlsdGVySWQsIGZpbHRlckNoZWNrXSkgPT4ge1xuICAgICAgaWYgKCFkaXNjYXJkKSB7XG4gICAgICAgIGNvbnN0IHBhc3MgPSBmaWx0ZXJDaGVjayhlbnRpdHkpXG4gICAgICAgIGlmICghcGFzcykge1xuICAgICAgICAgIHYgPSBmYWxzZVxuICAgICAgICAgIGlmICh0aGVPbmVGYWlsID09PSBudWxsKSB7dGhlT25lRmFpbCA9IGZpbHRlcklkfVxuICAgICAgICAgIGVsc2Uge2Rpc2NhcmQgPSB0cnVlfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcbiAgICBpZiAoIWRpc2NhcmQpIHtcbiAgICAgIGNvbnN0IHsgdmFsdWVzOiB7IF9pZCB9IH0gPSBlbnRpdHlcbiAgICAgIGlmICh2KSB7XG4gICAgICAgIGZpbHRlcmVkRGF0YS5wdXNoKF9pZClcbiAgICAgICAgcHJlc2VudEZpbHRlckxpc3QuZm9yRWFjaCgoZmlsdGVyU3BlYywgZmlsdGVySWQpID0+IHtcbiAgICAgICAgICBvdGhlckZpbHRlcmVkRGF0YVtmaWx0ZXJJZF0ucHVzaChfaWQpXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgICBlbHNlIHtvdGhlckZpbHRlcmVkRGF0YVt0aGVPbmVGYWlsXS5wdXNoKF9pZCl9XG4gICAgfVxuICB9XG4gIGNvbnN0IGFtb3VudHMgPSB7fVxuICBwcmVzZW50RmlsdGVyTGlzdC5mb3JFYWNoKCh7IGZpZWxkLCB0eXBlIH0sIGZpbHRlcklkKSA9PiB7XG4gICAgY29uc3QgeyBbZmllbGRdOiBmaWVsZFNwZWMgfSA9IGZpZWxkU3BlY3NcbiAgICBhbW91bnRzW2ZpbHRlcklkXSA9IHR5cGUgPT09ICdGdWxsVGV4dCcgPyBudWxsIDogY291bnRGYWNldHMoXG4gICAgICB0YWJsZXMsIGZpZWxkLCBmaWVsZFNwZWMsIGZpZWxkVmFsdWVzW2ZpZWxkXSwgb3RoZXJGaWx0ZXJlZERhdGFbZmlsdGVySWRdLCBlbnRpdGllc1xuICAgIClcbiAgfSlcbiAgY29uc3QgZmlsdGVyZWRBbW91bnRPdGhlcnMgPSB7fVxuICBPYmplY3QuZW50cmllcyhvdGhlckZpbHRlcmVkRGF0YSkuZm9yRWFjaCgoW2ZpbHRlcklkLCB4XSkgPT4ge2ZpbHRlcmVkQW1vdW50T3RoZXJzW2ZpbHRlcklkXSA9IHgubGVuZ3RofSlcbiAgcmV0dXJuIHtcbiAgICBmaWx0ZXJlZERhdGEsXG4gICAgZmlsdGVyZWRBbW91bnRPdGhlcnMsXG4gICAgYW1vdW50cyxcbiAgfVxufVxuXG5jb25zdCBnZXRVbnBhY2sgPSAodGFibGVzLCBmaWVsZFNwZWMsIGFzU3RyaW5nPWZhbHNlKSA9PiB7XG4gIGNvbnN0IHsgdmFsVHlwZSwgbXVsdGlwbGUgfSA9IGZpZWxkU3BlYyBcbiAgbGV0IHVucGFjaztcbiAgaWYgKHR5cGVvZiB2YWxUeXBlID09ICdzdHJpbmcnKSB7XG4gICAgdW5wYWNrID0gbXVsdGlwbGUgPyAoXG4gICAgICBhc1N0cmluZyA/IChcbiAgICAgICAgdiA9PiAodiA9PSBudWxsKSA/ICcnIDogdi5qb2luKCcgJylcbiAgICAgICkgOiAoXG4gICAgICAgIHYgPT4gKHYgPT0gbnVsbCkgPyBbXSA6IHZcbiAgICAgIClcbiAgICApIDogKFxuICAgICAgYXNTdHJpbmcgPyAoXG4gICAgICAgIHYgPT4gKHYgPT0gbnVsbCkgPyAnJyA6IHZcbiAgICAgICkgOiAoXG4gICAgICAgIHYgPT4gKHYgPT0gbnVsbCkgPyBbXSA6IFt2XVxuICAgICAgKVxuICAgIClcbiAgfVxuICBlbHNlIHtcbiAgICBjb25zdCB7IHZhbHVlczogcmVsIH0gPSB2YWxUeXBlXG4gICAgdW5wYWNrID0gbXVsdGlwbGUgPyAoXG4gICAgICBhc1N0cmluZyA/IChcbiAgICAgICAgdiA9PiAodiA9PSBudWxsKSA/ICcnIDogdi5tYXAodiA9PiByZXByKHRhYmxlcywgcmVsLCB2KS5qb2luKCcgJykpXG4gICAgICApIDogKFxuICAgICAgICB2ID0+ICh2ID09IG51bGwpID8gW10gOiB2XG4gICAgICApXG4gICAgKSA6IChcbiAgICAgIGFzU3RyaW5nID8gKFxuICAgICAgICB2ID0+ICh2ID09IG51bGwpID8gJycgOiByZXByKHRhYmxlcywgcmVsLCB2KVxuICAgICAgKSA6IChcbiAgICAgICAgdiA9PiAodiA9PSBudWxsKSA/IFtdIDogW3ZdXG4gICAgICApXG4gICAgKVxuICB9XG4gIHJldHVybiB1bnBhY2tcbn1cblxuY29uc3QgZnVsbHRleHRDaGVjayA9ICh0YWJsZXMsIGZpZWxkLCBmaWVsZFNwZWMsIHRlcm0pID0+IHtcbiAgY29uc3QgdW5wYWNrID0gZ2V0VW5wYWNrKHRhYmxlcywgZmllbGRTcGVjLCB0cnVlKVxuICBjb25zdCBzZWFyY2ggPSB0ZXJtLnRvTG93ZXJDYXNlKClcbiAgaWYgKHNlYXJjaCA9PSBudWxsIHx8IHNlYXJjaCA9PSAnJykge1xuICAgIHJldHVybiAoKSA9PiB0cnVlXG4gIH1cbiAgcmV0dXJuIGVudGl0eSA9PiB7XG4gICAgY29uc3QgeyB2YWx1ZXM6IHsgW2ZpZWxkXTogdmFsIH0gfSA9IGVudGl0eVxuICAgIGNvbnN0IHJlcCA9IHVucGFjayh2YWwpXG4gICAgcmV0dXJuIHJlcCAhPSBudWxsICYmIHJlcC50b0xvd2VyQ2FzZSgpLmluZGV4T2Yoc2VhcmNoKSAhPT0gLTFcbiAgfVxufVxuXG5jb25zdCBmYWNldENoZWNrID0gKHRhYmxlcywgZmllbGQsIGZpZWxkU3BlYywgZmFjZXRTZXR0aW5ncykgPT4ge1xuICBjb25zdCB1bnBhY2sgPSBnZXRVbnBhY2sodGFibGVzLCBmaWVsZFNwZWMpXG4gIGlmIChmYWNldFNldHRpbmdzLnNpemUgPT09IDApIHtcbiAgICByZXR1cm4gKCkgPT4gZmFsc2VcbiAgfVxuICByZXR1cm4gZW50aXR5ID0+IHtcbiAgICBjb25zdCB7IHZhbHVlczogeyBbZmllbGRdOiB2YWwgfSB9ID0gZW50aXR5XG4gICAgY29uc3QgcmVwID0gdW5wYWNrKHZhbClcbiAgICBpZiAocmVwLmxlbmd0aCA9PSAwKSB7XG4gICAgICByZXR1cm4gZmFjZXRTZXR0aW5nc1snJ11cbiAgICB9XG4gICAgZm9yIChjb25zdCByIG9mIHJlcCkge1xuICAgICAgaWYgKGZhY2V0U2V0dGluZ3Nbcl0pIHtcbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cbn1cblxuY29uc3QgY291bnRGYWNldHMgPSAodGFibGVzLCBmaWVsZCwgZmllbGRTcGVjLCBmaWVsZFZhbHVlcywgZmlsdGVyZWREYXRhLCBlbnRpdGllcykgPT4ge1xuICBjb25zdCB1bnBhY2sgPSBnZXRVbnBhY2sodGFibGVzLCBmaWVsZFNwZWMpXG4gIGNvbnN0IGZhY2V0QW1vdW50cyA9IHt9XG4gIE9iamVjdC5rZXlzKGZpZWxkVmFsdWVzKS5mb3JFYWNoKHIgPT4ge2ZhY2V0QW1vdW50c1tyXSA9IDB9KVxuICBmb3IgKGNvbnN0IGVJZCBvZiBmaWx0ZXJlZERhdGEpIHtcbiAgICBjb25zdCB7IFtlSWRdOiB7IHZhbHVlczogeyBbZmllbGRdOiB2YWwgfSB9IH0gPSBlbnRpdGllc1xuICAgIGNvbnN0IHJlcCA9IHVucGFjayh2YWwpXG4gICAgaWYgKHJlcC5sZW5ndGggPT0gMCkge1xuICAgICAgZmFjZXRBbW91bnRzWycnXSArPSAxXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgZm9yIChjb25zdCByIG9mIHJlcCkge1xuICAgICAgICBmYWNldEFtb3VudHNbcl0gKz0gMVxuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gZmFjZXRBbW91bnRzXG59XG5cbmV4cG9ydCBjb25zdCBwbGFjZUZhY2V0cyA9IChmaWVsZFZhbHVlcywgbWF4Q29scykgPT4ge1xuICBpZiAoZmllbGRWYWx1ZXMgPT0gbnVsbCkge3JldHVybiBbXX1cbiAgY29uc3QgZmFjZXRzID0gT2JqZWN0LmVudHJpZXMoZmllbGRWYWx1ZXMpLnNvcnQoKHgsIHkpID0+IHhbMV0ubG9jYWxlQ29tcGFyZSh5WzFdKSlcbiAgaWYgKGZhY2V0cy5sZW5ndGggPT0gMCkge3JldHVybiBbXX1cbiAgY29uc3Qgcm93cyA9IFtdXG4gIGNvbnN0IHsgbGVuZ3RoOiBsZiB9ID0gZmFjZXRzXG4gIGNvbnN0IG5yb3dzID0gTWF0aC5mbG9vcihsZiAvIG1heENvbHMpICsgKChsZiAlIG1heENvbHMpID8gMSA6IDApXG4gIGNvbnN0IG5jb2xzID0gTWF0aC5mbG9vcihsZiAvIG5yb3dzKSArICgobGYgJSBucm93cykgPyAxIDogMClcbiAgZm9yIChsZXQgciA9IDA7IHIgPCBucm93czsgcisrKSB7XG4gICAgY29uc3Qgcm93ID0gW11cbiAgICBmb3IgKGxldCBjID0gMDsgYyA8IG5jb2xzOyBjKyspIHtcbiAgICAgIGNvbnN0IGYgPSBucm93cyAqIGMgKyByXG4gICAgICByb3cucHVzaCgoZiA8IGxmKSA/IGZhY2V0c1tmXSA6IG51bGwpXG4gICAgfVxuICAgIHJvd3MucHVzaChyb3cpXG4gIH1cbiAgcmV0dXJuIHJvd3Ncbn1cblxuZXhwb3J0IGNvbnN0IHRlc3RBbGxDaGVja3MgPSBmaWx0ZXJTZXR0aW5ncyA9PiB7XG4gIGxldCBhbGxUcnVlID0gdHJ1ZVxuICBsZXQgYWxsRmFsc2UgPSB0cnVlXG4gIGZvciAoY29uc3QgW3ZhbHVlSWQsIHZhbHVlUmVwXSBvZiBPYmplY3QuZW50cmllcyhmaWx0ZXJTZXR0aW5ncykpIHtcbiAgICBpZiAodmFsdWVSZXApIHthbGxGYWxzZSA9IGZhbHNlfVxuICAgIGVsc2Uge2FsbFRydWUgPSBmYWxzZX1cbiAgfVxuICByZXR1cm4geyBhbGxUcnVlLCBhbGxGYWxzZSB9XG59XG5cbiIsImV4cG9ydCBmdW5jdGlvbiBtZW1vQmluZCh0aGlzQXJnLCBmdW5jTmFtZSwga2V5QXJncywgYWxsQXJncykge1xuICBpZiAodHlwZW9mIHRoaXNBcmcgIT09ICdvYmplY3QnIHx8ICF0aGlzQXJnKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignSW52YWxpZCB0aGlzQXJnIHBhcmFtZXRlci4nKVxuICB9XG5cbiAgY29uc3QgeyBbZnVuY05hbWVdOiBmdW5jIH0gPSB0aGlzQXJnXG4gIGlmICh0eXBlb2YgZnVuYyAhPT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoYCcke2Z1bmNOYW1lfScgaXMgbm90IGEgZnVuY3Rpb24uYClcbiAgfVxuXG4gIGlmICh0aGlzQXJnLl9tZW1DYWNoZSA9PSBudWxsKSB7dGhpc0FyZy5fbWVtQ2FjaGUgPSB7fX1cbiAgaWYgKHRoaXNBcmcuX21lbUNhY2hlW2Z1bmNOYW1lXSA9PSBudWxsKSB7XG4gICAgdGhpc0FyZy5fbWVtQ2FjaGVbZnVuY05hbWVdID0ge31cbiAgfVxuICBjb25zdCBjYWNoZSA9IHRoaXNBcmcuX21lbUNhY2hlW2Z1bmNOYW1lXVxuXG4gIGNvbnN0IG1lbW9LZXkgPSBKU09OLnN0cmluZ2lmeShrZXlBcmdzKVxuICBpZiAoY2FjaGVbbWVtb0tleV0gPT0gbnVsbCkge1xuICAgIGNhY2hlW21lbW9LZXldID0gZnVuYy5hcHBseSh0aGlzQXJnLCBhbGxBcmdzKVxuICB9XG4gIHJldHVybiBjYWNoZVttZW1vS2V5XVxufVxuXG5leHBvcnQgY29uc3QgcHJvcHNDaGFuZ2VkID0gKG5ld1Byb3BzLCBuZWVkLCBvbGRQcm9wcywga2V5UHJvcE5hbWVzKSA9PiB7XG4gIGxldCByZXN1bHQgPSBmYWxzZVxuICBpZiAob2xkUHJvcHMgPT0gbnVsbCkge1xuICAgIGlmIChuZWVkKG5ld1Byb3BzKSkge3Jlc3VsdCA9IHRydWV9XG4gIH1cbiAgZWxzZSB7XG4gICAgaWYgKGtleVByb3BOYW1lcy5zb21lKGEgPT4gbmV3UHJvcHNbYV0gIT0gb2xkUHJvcHNbYV0pICYmIG5lZWQobmV3UHJvcHMpKSB7cmVzdWx0ID0gdHJ1ZX1cbiAgfVxuICByZXR1cm4gcmVzdWx0XG59XG5cbmV4cG9ydCBjb25zdCBjb21iaW5lU2VsZWN0b3JzID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiAoc3RhdGUsIHByb3BzKSA9PiB7XG4gICAgY29uc3QgcmVzdWx0ID0ge31cbiAgICBmb3IgKGNvbnN0IHNlbGVjdG9yIG9mIGFyZ3VtZW50cykge1xuICAgICAgT2JqZWN0LmFzc2lnbihyZXN1bHQsIHNlbGVjdG9yKHN0YXRlLCBwcm9wcykpXG4gICAgfVxuICAgIHJldHVybiByZXN1bHRcbiAgfVxufVxuIiwiaW1wb3J0IHsgZmV0Y2hEYXRhIH0gZnJvbSAnc2VydmVyLmpzJ1xuXG4vKiBBQ1RJT05TICovXG4vKlxuICogTW9zdCBhY3Rpb25zIGNhbGwgZmV0Y2hEYXRhLCB3aGljaCB3aWxsIGRpc3BhdGNoIHRoZSB1bHRpbWF0ZSBmZXRjaCBhY3Rpb24uXG4gKi9cbmV4cG9ydCBjb25zdCBmZXRjaE1lID0gKCkgPT4gKFxuICBmZXRjaERhdGEoeyB0eXBlOiAnZmV0Y2hNZScsIGNvbnRlbnRUeXBlOiAnZGInLCBwYXRoOiAnL3doby9hbWknLCBkZXNjOiAnbWUnIH0pXG4pXG5cbi8qIFJFRFVDRVIgKi9cblxuZXhwb3J0IGRlZmF1bHQgKHN0YXRlID0ge30sIHsgdHlwZSwgcGF0aCwgZGF0YSB9KSA9PiB7XG4gIHN3aXRjaCAodHlwZSkge1xuICAgIGNhc2UgJ2ZldGNoTWUnOiB7XG4gICAgICBpZiAoZGF0YSA9PSBudWxsKSB7cmV0dXJuIHt9fVxuICAgICAgcmV0dXJuIHsgLi4uZGF0YSB9XG4gICAgfVxuICAgIGRlZmF1bHQ6IHJldHVybiBzdGF0ZVxuICB9XG59XG5cbi8qIFNFTEVDVE9SUyAqL1xuXG5leHBvcnQgY29uc3QgZ2V0TWUgPSAoeyBtZSB9KSA9PiAoeyBtZSB9KVxuXG4vKiBIRUxQRVJTICovXG5cbiIsImltcG9ydCBtZXJnZVdpdGggZnJvbSAnbG9kYXNoL21lcmdld2l0aCdcblxuLyogQUNUSU9OUyAqL1xuXG5leHBvcnQgY29uc3QgYXNrID0gICAgIChkZXNjKSAgICAgICA9PiAoeyB0eXBlOiAnYXN5bmMnLCBzdGF0dXM6ICdwZW5kaW5nJywgZGVzYyB9KVxuZXhwb3J0IGNvbnN0IGVyciA9ICAgICAoZGVzYywgbXNncykgPT4gKHsgdHlwZTogJ2FzeW5jJywgc3RhdHVzOiAnZXJyb3InLCAgIGRlc2MsIG1zZ3MgfSlcbmV4cG9ydCBjb25zdCBzdWNjZWVkID0gKGRlc2MpICAgICAgID0+ICh7IHR5cGU6ICdhc3luYycsIHN0YXR1czogJ3N1Y2Nlc3MnLCBkZXNjIH0pXG5cbmV4cG9ydCBjb25zdCBub3RpZnkgPSAgKG1zZ3MpICAgICAgID0+ICh7IHR5cGU6ICdtc2dzJywgbXNncyB9KVxuZXhwb3J0IGNvbnN0IGNsZWFyICA9ICAoKSAgICAgICAgICAgPT4gKHsgdHlwZTogJ2NsZWFyJyB9KVxuZXhwb3J0IGNvbnN0IGRpc3BsYXkgPSAob25PZmYpICAgICAgPT4gKHsgdHlwZTogJ2Rpc3BsYXknLCBvbk9mZiB9KVxuXG4vKiBSRURVQ0VSICovXG5cbmV4cG9ydCBkZWZhdWx0IChzdGF0ZSA9IHsgaXRlbXM6IFtdLCBidXN5OiAwLCBzaG93OiBmYWxzZSB9LCB7IHR5cGUsIGRlc2MsIHN0YXR1cywgbXNncywgb25PZmYgfSkgPT4ge1xuICBzd2l0Y2ggKHR5cGUpIHtcbiAgICBjYXNlICdhc3luYyc6IHtcbiAgICAgIGNvbnN0IHsgaXRlbXMsIGJ1c3ksIHNob3cgfSA9IHN0YXRlXG4gICAgICBjb25zdCBleHRyYU1zZ3MgPSBtc2dzIHx8IFtdXG4gICAgICBzd2l0Y2ggKHN0YXR1cykge1xuICAgICAgICBjYXNlICdwZW5kaW5nJzoge1xuICAgICAgICAgIHJldHVybiBtZXJnZVdpdGgoe30sIHN0YXRlLCB7XG4gICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICAuLi5leHRyYU1zZ3MsXG4gICAgICAgICAgICAgIHsga2luZDogJ3NwZWNpYWwnLCB0ZXh0OiBgd2FpdGluZyBmb3IgJHtkZXNjfWB9XG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgYnVzeTogYnVzeSArIDEsXG4gICAgICAgICAgfSwgYWRkSXRlbXMpXG4gICAgICAgIH1cbiAgICAgICAgY2FzZSAnc3VjY2Vzcyc6IHtcbiAgICAgICAgICByZXR1cm4gbWVyZ2VXaXRoKHt9LCBzdGF0ZSwge1xuICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgLi4uZXh0cmFNc2dzLFxuICAgICAgICAgICAgICB7IGtpbmQ6ICdpbmZvJywgdGV4dDogYCR7ZGVzY30gb2tgIH0sXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgYnVzeTogYnVzeSAtIDEsXG4gICAgICAgICAgfSwgYWRkSXRlbXMpXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGNhc2UgJ2Vycm9yJzoge1xuICAgICAgICAgIHJldHVybiBtZXJnZVdpdGgoe30sIHN0YXRlLCB7XG4gICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICAuLi5leHRyYU1zZ3MsXG4gICAgICAgICAgICAgIHsga2luZDogJ2Vycm9yJywgdGV4dDogYCR7ZGVzY30gZmFpbGVkYCB9LFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIGJ1c3k6IGJ1c3kgLSAxLFxuICAgICAgICAgICAgc2hvdzogdHJ1ZSxcbiAgICAgICAgICB9LCBhZGRJdGVtcylcbiAgICAgICAgfVxuICAgICAgICBkZWZhdWx0OiByZXR1cm4gc3RhdGVcbiAgICAgIH1cbiAgICB9XG4gICAgY2FzZSAnbXNncyc6IHtcbiAgICAgIGNvbnN0IHsgaXRlbXMgfSA9IHN0YXRlXG4gICAgICByZXR1cm4gbWVyZ2VXaXRoKHt9LCBzdGF0ZSwge1xuICAgICAgICBpdGVtczogW1xuICAgICAgICAgIC4uLm1zZ3MsXG4gICAgICAgIF0sXG4gICAgICAgIHNob3c6IHRydWUsXG4gICAgICB9LCBhZGRJdGVtcylcbiAgICB9XG4gICAgY2FzZSAnY2xlYXInOiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgaXRlbXM6IFtdLFxuICAgICAgICBzaG93OiBmYWxzZVxuICAgICAgfVxuICAgIH1cbiAgICBjYXNlICdkaXNwbGF5Jzoge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIHNob3c6IG9uT2ZmLFxuICAgICAgfVxuICAgIH1cbiAgICBkZWZhdWx0OiByZXR1cm4gc3RhdGVcbiAgfVxufVxuXG4vKiBTRUxFQ1RPUlMgKi9cblxuZXhwb3J0IGNvbnN0IGdldE5vdGlmeSA9ICh7IG5vdGlmeSB9KSA9PiAoeyBub3RpZnkgfSlcblxuZXhwb3J0IGNvbnN0IGdldE5vdGlmaWNhdGlvbnMgPSAoeyBub3RpZnkgfSkgPT4ge1xuICBjb25zdCB7IGl0ZW1zLCBidXN5LCBzaG93IH0gPSBub3RpZnlcbiAgbGV0IGxhc3ROb3RlID0gLTFcbiAgbGV0IGxhc3RLaW5kID0gJydcbiAgaXRlbXMuZm9yRWFjaCgoaXRlbSwgaSkgPT4ge1xuICAgIGNvbnN0IHsga2luZCwgdGV4dCB9ID0gaXRlbVxuICAgIGlmIChraW5kID09ICdlcnJvcicpIHtcbiAgICAgIGxhc3ROb3RlID0gaVxuICAgICAgbGFzdEtpbmQgPSAnZXJyb3InXG4gICAgfVxuICAgIGVsc2UgaWYgKGtpbmQgPT0gJ3dhcm5pbmcnKSB7XG4gICAgICBpZiAobGFzdEtpbmQgIT0gJ2Vycm9yJykge1xuICAgICAgICBsYXN0Tm90ZSA9IGlcbiAgICAgICAgbGFzdEtpbmQgPSAnd2FybmluZydcbiAgICAgIH1cbiAgICB9XG4gIH0pXG4gIHJldHVybiB7IG5vdGlmaWNhdGlvbnM6IGl0ZW1zLCBidXN5LCBzaG93LCBsYXN0TXNnOiBpdGVtcy5sZW5ndGggLSAxLCBsYXN0Tm90ZSwgbGFzdEtpbmQgfVxufVxuXG4vKiBIRUxQRVJTICovXG5cbmNvbnN0IGFkZEl0ZW1zID0gKG9ialZhbHVlLCBzcmNWYWx1ZSwga2V5KSA9PiB7XG4gIGlmIChrZXkgPT0gJ2l0ZW1zJykge1xuICAgIHJldHVybiAob2JqVmFsdWUgPT0gbnVsbCkgPyBzcmNWYWx1ZSA6IG9ialZhbHVlLmNvbmNhdChzcmNWYWx1ZSlcbiAgfVxufVxuXG4iLCJpbXBvcnQgeyBjb21iaW5lUmVkdWNlcnMgfSBmcm9tICdyZWR1eCdcbmltcG9ydCB3aW4gZnJvbSAnd2luLmpzJ1xuaW1wb3J0IG5vdGlmeSBmcm9tICdub3RpZnkuanMnXG5pbXBvcnQgZG9jIGZyb20gJ2RvYy5qcydcbmltcG9ydCB0YWJsZXMgZnJvbSAndGFibGVzLmpzJ1xuaW1wb3J0IG1lIGZyb20gJ21lLmpzJ1xuaW1wb3J0IGZpbHRlciBmcm9tICdmaWx0ZXIuanMnXG5pbXBvcnQgYWx0ZXIgZnJvbSAnYWx0ZXIuanMnXG5cbi8qIEFDVElPTlMgKi9cblxuLyogUk9PVCBSRURVQ0VSICovXG5cbmV4cG9ydCBkZWZhdWx0IGNvbWJpbmVSZWR1Y2Vycyh7XG4gIHdpbixcbiAgbm90aWZ5LFxuICBkb2MsXG4gIHRhYmxlcyxcbiAgbWUsXG4gIGZpbHRlcixcbiAgYWx0ZXIsXG59KVxuXG4iLCJpbXBvcnQgJ3doYXR3Zy1mZXRjaCdcblxuaW1wb3J0IHsgYXNrLCBlcnIsIHN1Y2NlZWQgfSBmcm9tICdub3RpZnkuanMnXG5cbmNvbnN0IHJvb3RVcmwgPSAnL2FwaS8nXG5cbi8qIEFDVElPTlMgKi9cbi8qXG4gKiBHZW5lcmljIGFjdGlvbiB0byBmZXRjaCBkYXRhIGZyb20gdGhlIHNlcnZlci5cbiAqIFRoZSBxdWVyeSBpcyBjb25maWd1cmVkIGJ5IHRoZSB0YXNrIG9iamVjdC5cbiAqIEl0IGNhbiBiZSB1c2VkIGZvciBkYXRhYmFzZSBxdWVyaWVzIG9yIGZpbGUgY29udGVudC5cbiAqIER1cmluZyByZXF1ZXN0LCBub3RpZnkgYWN0aW9ucyB3aWxsIGJlIGRpc3BhdGNoZWQuXG4gKi9cblxuZXhwb3J0IGNvbnN0IGZldGNoRGF0YSA9IHRhc2sgPT4gZGlzcGF0Y2ggPT4ge1xuICBjb25zdCB7IHBhdGgsIGNvbnRlbnRUeXBlLCBkZXNjIH0gPSB0YXNrXG4gIGRpc3BhdGNoKGFzayhkZXNjKSlcbiAgZGlzcGF0Y2goeyAuLi50YXNrLCBkYXRhOiBudWxsIH0pXG5cbiAgY29uc3Qgc2V0dGluZ3MgPSB7Y3JlZGVudGlhbHM6ICdzYW1lLW9yaWdpbid9XG4gIGZldGNoKGAke3Jvb3RVcmx9JHtjb250ZW50VHlwZX0ke3BhdGh9YCwgc2V0dGluZ3MpXG4gIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcbiAgLnRoZW4oanNvbiA9PiB7XG4gICAgY29uc3QgeyBtc2dzLCBnb29kLCBkYXRhIH0gPSBqc29uXG4gICAgaWYgKGdvb2QpIHtcbiAgICAgIGRpc3BhdGNoKHN1Y2NlZWQoZGVzYykpXG4gICAgICBkaXNwYXRjaCh7IC4uLnRhc2ssIGRhdGEgfSlcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBkaXNwYXRjaChlcnIoZGVzYywgbXNncykpXG4gICAgfVxuICB9KVxuICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgZGlzcGF0Y2goZXJyKGRlc2MsIFt7a2luZDogJ2Vycm9yJywgdGV4dDogZXJyb3IudG9TdHJpbmcoKX1dKSlcbiAgfSlcbn1cblxuLyogUkVEVUNFUiAqL1xuLypcbiAqIG5vIGRlZGljYXRlZCByZWR1Y2VyLlxuICogUmVzdWx0cyBvZiBhY3Rpb25zIHdpbGwgYmUgcmVkdWNlZCBieSBkZWRpY2F0ZWQgcmVkdWNlcnMuXG4gKi9cblxuLyogU0VMRUNUT1JTICovXG4vKlxuICogbm8gZGVkaWNhdGVkIHNlbGVjdG9ycy5cbiAqIFNlZSB0aGUgc2VsZWN0b3JzIGNvcnJlc3BvbmRpbmcgdG8gdGhlIGRlZGljYXRlZCByZWR1Y2Vycy5cbiAqL1xuXG4vKiBIRUxQRVJTICovXG5cbiIsImltcG9ydCBtZXJnZVdpdGggZnJvbSAnbG9kYXNoL21lcmdld2l0aCdcbmltcG9ydCB7IGZldGNoRGF0YSB9IGZyb20gJ3NlcnZlci5qcydcbmltcG9ydCB7IHByb3BzQ2hhbmdlZCB9IGZyb20gJ2hlbHBlcnMuanMnXG5cbi8qIEFDVElPTlMgKi9cbi8qXG4gKiBNb3N0IGFjdGlvbnMgY2FsbCBmZXRjaERhdGEsIHdoaWNoIHdpbGwgZGlzcGF0Y2ggdGhlIHVsdGltYXRlIGZldGNoIGFjdGlvbi5cbiAqL1xuXG5leHBvcnQgY29uc3QgZmV0Y2hUYWJsZSA9ICh0YWJsZSkgPT4gKFxuICBmZXRjaERhdGEoeyB0eXBlOiAnZmV0Y2hUYWJsZScsIGNvbnRlbnRUeXBlOiAnZGInLCBwYXRoOiBgL2xpc3Q/dGFibGU9JHt0YWJsZX1gLCBkZXNjOiBgJHt0YWJsZX0gdGFibGVgLCB0YWJsZSB9KVxuKVxuZXhwb3J0IGNvbnN0IGZldGNoVGFibGVNeSA9ICh0YWJsZSkgPT4gKFxuICBmZXRjaERhdGEoeyB0eXBlOiAnZmV0Y2hUYWJsZU15JywgY29udGVudFR5cGU6ICdkYicsIHBhdGg6IGAvbXk/dGFibGU9JHt0YWJsZX1gLCBkZXNjOiBgJHt0YWJsZX0gdGFibGUgKG15IHJlY29yZHMpYCwgdGFibGUgfSlcbilcbmV4cG9ydCBjb25zdCBmZXRjaEl0ZW0gPSAocHJvcHMpID0+IHtcbiAgY29uc3QgeyB0YWJsZSwgZUlkLCBvd25Pbmx5IH0gPSBwcm9wc1xuICByZXR1cm4gZmV0Y2hEYXRhKHtcbiAgICB0eXBlOiAnZmV0Y2hJdGVtJyxcbiAgICBjb250ZW50VHlwZTogJ2RiJyxcbiAgICBwYXRoOiBgL3ZpZXc/dGFibGU9JHt0YWJsZX0maWQ9JHtlSWR9JHtvd25Pbmx5ID8gJyZvd249dHJ1ZScgOiAnJ31gLFxuICAgIGRlc2M6IGAke3RhYmxlfSByZWNvcmQgJHtlSWR9YCxcbiAgICB0YWJsZSxcbiAgfSlcbn1cblxuLyogUkVEVUNFUiAqL1xuXG5leHBvcnQgZGVmYXVsdCAoc3RhdGU9e30sIHsgdHlwZSwgcGF0aCwgZGF0YSwgdGFibGUgfSkgPT4ge1xuICBzd2l0Y2ggKHR5cGUpIHtcbiAgICBjYXNlICdmZXRjaFRhYmxlJzoge1xuICAgICAgaWYgKGRhdGEgPT0gbnVsbCkge3JldHVybiBzdGF0ZX1cbiAgICAgIHJldHVybiBtZXJnZVdpdGgoe30sIHN0YXRlLCBkYXRhLCBzZXRDb21wbGV0ZSlcbiAgICB9XG4gICAgY2FzZSAnZmV0Y2hUYWJsZU15Jzoge1xuICAgICAgaWYgKGRhdGEgPT0gbnVsbCkge3JldHVybiBzdGF0ZX1cbiAgICAgIHJldHVybiBtZXJnZVdpdGgoe30sIHN0YXRlLCBkYXRhLCBzZXRDb21wbGV0ZSlcbiAgICB9XG4gICAgY2FzZSAnZmV0Y2hJdGVtJzoge1xuICAgICAgaWYgKGRhdGEgPT0gbnVsbCkge3JldHVybiBzdGF0ZX1cbiAgICAgIGNvbnN0IHsgdmFsdWVzOiB7IF9pZCB9IH0gPSBkYXRhXG4gICAgICByZXR1cm4gbWVyZ2VXaXRoKHt9LCBzdGF0ZSwgeyBbdGFibGVdOiB7IGVudGl0aWVzOiB7IFtfaWRdOiBkYXRhIH0gfSB9LCBzZXRDb21wbGV0ZSlcbiAgICB9XG4gICAgZGVmYXVsdDogcmV0dXJuIHN0YXRlXG4gIH1cbn1cblxuLyogU0VMRUNUT1JTICovXG5cbmV4cG9ydCBjb25zdCBnZXRUYWJsZXMgPSAoeyB0YWJsZXMgfSkgPT4gKHsgdGFibGVzIH0pXG5cbmV4cG9ydCBjb25zdCBnZXRUYWJsZUZpbHRlcnMgPSAgKHsgdGFibGVzIH0sIHsgdGFibGUgfSkgPT4ge1xuICBjb25zdCB7IFt0YWJsZV06IHsgZmllbGRzLCBmaWx0ZXJMaXN0IH0gfSA9IHRhYmxlc1xuICByZXR1cm4geyBmaWVsZHMsIGZpbHRlckxpc3QgfVxufVxuXG4vKiBIRUxQRVJTICovXG5cbmNvbnN0IHNldENvbXBsZXRlID0gKG5ld1ZhbHVlLCBvbGRWYWx1ZSwga2V5KSA9PiB7XG4gIGlmIChrZXkgPT0gJ2NvbXBsZXRlJykge3JldHVybiBuZXdWYWx1ZSB8fCBvbGRWYWx1ZX1cbn1cblxuZXhwb3J0IGNvbnN0IG5lZWRUYWJsZXMgPSAodGFibGVzLCB0YWJsZU5hbWVzLCBteT1mYWxzZSkgPT4ge1xuICBpZiAodGFibGVzID09IG51bGwpIHtyZXR1cm4gdHJ1ZX1cbiAgY29uc3QgdE5hbWVzID0gKCFBcnJheS5pc0FycmF5KHRhYmxlTmFtZXMpKSA/IFt0YWJsZU5hbWVzXSA6IHRhYmxlTmFtZXNcbiAgcmV0dXJuIHROYW1lcy5zb21lKHRhYmxlID0+IChcbiAgICB0YWJsZXNbdGFibGVdID09IG51bGwgfHxcbiAgICAobXkgJiYgdGFibGVzW3RhYmxlXS5teSA9PSBudWxsKSB8fFxuICAgICghbXkgJiYgdGFibGVzW3RhYmxlXS5vcmRlciA9PSBudWxsKVxuICApKVxufVxuXG5leHBvcnQgY29uc3QgbmVlZFZhbHVlcyA9ICh7IHRhYmxlcywgdGFibGUsIGVJZCB9KSA9PiB7XG4gIGNvbnN0IG1pc3NpbmcgPSB0YWJsZXMgPT0gbnVsbCB8fCB0YWJsZXNbdGFibGVdID09IG51bGwgfHwgdGFibGVzW3RhYmxlXS5lbnRpdGllc1tlSWRdID09IG51bGxcbiAgY29uc3QgY29tcGxldGUgPSAhbWlzc2luZyAmJiB0YWJsZXNbdGFibGVdLmVudGl0aWVzW2VJZF0uY29tcGxldGVcbiAgcmV0dXJuIHRhYmxlcyA9PSBudWxsIHx8IHRhYmxlc1t0YWJsZV0gPT0gbnVsbCB8fCB0YWJsZXNbdGFibGVdLmVudGl0aWVzW2VJZF0gPT0gbnVsbCB8fCAhdGFibGVzW3RhYmxlXS5lbnRpdGllc1tlSWRdLmNvbXBsZXRlXG59XG5cbmV4cG9ydCBjb25zdCBjaGFuZ2VkSXRlbSA9IChuZXdQcm9wcywgb2xkUHJvcHMpID0+IChcbiAgcHJvcHNDaGFuZ2VkKG5ld1Byb3BzLCBuZWVkVmFsdWVzLCBvbGRQcm9wcywgWyd0YWJsZScsICdlSWQnXSlcbilcblxuY29uc3QgcmVwVXNlciA9ICh7IHVzZXIgfSwgdmFsSWQpID0+IHtcbiAgbGV0IHZhbFJlcFxuICBjb25zdCB7IGVudGl0aWVzOiB7IFt2YWxJZF06IGVudGl0eSB9IH0gPSB1c2VyXG4gIGlmIChlbnRpdHkpIHtcbiAgICBjb25zdCB7IHZhbHVlczogeyBlcHBuLCBmaXJzdE5hbWUsIGxhc3ROYW1lLCBlbWFpbFByZSwgYXV0aG9yaXR5LCBtYXlMb2dpbiB9IH0gPSBlbnRpdHlcbiAgICBjb25zdCBlbWFpbCA9IGVtYWlsUHJlIHx8ICcnXG4gICAgbGV0IGxpbmtUZXh0ID0gW2ZpcnN0TmFtZSB8fCAnJywgbGFzdE5hbWUgfHwgJyddLmZpbHRlcih4ID0+IHgpLmpvaW4oJyAnKVxuICAgIGlmIChsaW5rVGV4dCA9PSAnJykge2xpbmtUZXh0ID0gZW1haWx9XG4gICAgY29uc3QgbmFtZVBhcnQgPSAobGlua1RleHQgJiYgZW1haWwpID8gKFxuICAgICAgYFske2xpbmtUZXh0fV0obWFpbHRvOiR7ZW1haWx9KWBcbiAgICApIDogKFxuICAgICAgbGlua1RleHQgKyBlbWFpbFxuICAgIClcbiAgICBjb25zdCBlcHBuUGFydCA9IGVwcG4gPyBgIGVwcG49JHtlcHBufSBgIDogJydcbiAgICBjb25zdCBhdXRob3JpdHlQYXJ0ID0gYXV0aG9yaXR5ID8gYCBhdXRoZW50aWNhdGVkIGJ5PSR7YXV0aG9yaXR5fSBgIDogJydcbiAgICBjb25zdCBtYXlMb2dpblBhcnQgPSBtYXlMb2dpbiA/IGAgYWN0aXZlPSR7bWF5TG9naW59IGAgOiAnJ1xuICAgIHZhbFJlcCA9IFtuYW1lUGFydCwgZXBwblBhcnQsIGF1dGhvcml0eVBhcnQsIG1heUxvZ2luUGFydF0uZmlsdGVyKHggPT4geCkuam9pbignOyAnKVxuICB9XG4gIGVsc2Uge3ZhbFJlcCA9ICdVTktOT1dOJ31cbiAgcmV0dXJuIHZhbFJlcFxufVxuXG5jb25zdCByZXBDb3VudHJ5ID0gKHsgY291bnRyeSB9LCB2YWxJZCkgPT4ge1xuICBjb25zdCB7IGVudGl0aWVzOiB7IFt2YWxJZF06IGVudGl0eSB9IH0gPSBjb3VudHJ5XG4gIGlmIChlbnRpdHkpIHtcbiAgICBjb25zdCB7IHZhbHVlczogeyBuYW1lLCBpc28gfSB9ID0gZW50aXR5XG4gICAgcmV0dXJuIGAke2lzb306ICR7bmFtZX1gXG4gIH1cbiAgZWxzZSB7cmV0dXJuICdVTktOT1dOJ31cbn1cblxuY29uc3QgcmVwVmFsdWUgPSByZWwgPT4gKHRhYmxlcywgdmFsSWQpID0+IHtcbiAgY29uc3QgeyBbcmVsXTogeyBlbnRpdGllczogeyBbdmFsSWRdOiBlbnRpdHkgfSB9IH0gPSB0YWJsZXNcbiAgaWYgKGVudGl0eSkge1xuICAgIGNvbnN0IHsgdmFsdWVzOiB7IHJlcCB9IH0gPSBlbnRpdHlcbiAgICByZXR1cm4gcmVwXG4gIH1cbiAgZWxzZSB7cmV0dXJuICdVTktOT1dOJ31cbn1cblxuY29uc3QgcmVwTWFwID0ge1xuICB1c2VyOiByZXBVc2VyLFxuICBjb3VudHJ5OiByZXBDb3VudHJ5LFxuICBkZWZhdWx0OiByZXBWYWx1ZSxcbn1cblxuZXhwb3J0IGNvbnN0IHJlcHIgPSAodGFibGVzLCByZWwsIHZhbElkKSA9PiAocmVwTWFwW3JlbF0gfHwgcmVwTWFwLmRlZmF1bHQocmVsKSkodGFibGVzLCB2YWxJZClcblxuIiwiLyogQUNUSU9OUyAqL1xuXG5leHBvcnQgY29uc3QgY2hhbmdlV2luRGltID0gKCkgPT4gZGlzcGF0Y2ggPT4ge1xuICBkaXNwYXRjaCh7IHR5cGU6ICd3aW5kaW0nLCAuLi5pbml0V2luRGltKCkgfSlcbn1cblxuLyogUkVEVUNFUiAqL1xuXG5leHBvcnQgZGVmYXVsdCAoc3RhdGUgPSBpbml0V2luRGltKCksIHsgdHlwZSwgaGVpZ2h0LCB3aWR0aCB9KSA9PiB7XG4gIHN3aXRjaCAodHlwZSkge1xuICAgIGNhc2UgJ3dpbmRpbSc6IHtcbiAgICAgIHJldHVybiB7IGhlaWdodCwgd2lkdGggfVxuICAgIH1cbiAgICBkZWZhdWx0OiByZXR1cm4gc3RhdGVcbiAgfVxufVxuXG4vKiBTRUxFQ1RPUlMgKi9cblxuZXhwb3J0IGNvbnN0IGdldFdpbkRpbSA9ICh7IHdpbjogeyBoZWlnaHQsIHdpZHRoIH0gfSkgPT4gKHsgaGVpZ2h0LCB3aWR0aCB9KVxuXG4vKiBIRUxQRVJTICovXG5cbmNvbnN0IGluaXRXaW5EaW0gPSAoKSA9PiB7XG4gIGNvbnN0IHsgaW5uZXJIZWlnaHQ6IGhlaWdodCwgaW5uZXJXaWR0aDogd2lkdGggfSA9IHdpbmRvd1xuICByZXR1cm4geyBoZWlnaHQsIHdpZHRoIH1cbn1cblxuY29uc3Qgc2Nyb2xsQmFyV2lkdGggPSA0MFxuY29uc3QgbGVmdE1hcmdpbiA9IDBcblxuY29uc3QgdG9wSGVpZ2h0ID0gNTBcbmNvbnN0IHRvcE1hcmdpbiA9IDVcblxuY29uc3QgZGl2V2lkdGhTcGVjID0ge1xuICBsZWZ0OiAxMjAsXG4gIHJpZ2h0TGVmdDogMzgwLFxuICByaWdodExlZnROYXY6IDE1MCxcbn1cblxuY29uc3QgZmxvYXRTcGVjID0ge1xuICBsZWZ0OiAnbGVmdCcsXG4gIHJpZ2h0OiAncmlnaHQnLFxuICByaWdodExlZnQ6ICdsZWZ0JyxcbiAgcmlnaHRMZWZ0TmF2OiAnbGVmdCcsXG4gIHJpZ2h0UmlnaHQ6ICdyaWdodCcsXG4gIHJpZ2h0UmlnaHRCb2R5OiAncmlnaHQnLFxufVxuXG5leHBvcnQgZnVuY3Rpb24gY29sdW1uU3R5bGUoa2luZCwgeyBoZWlnaHQsIHdpZHRoIH0pIHtcbiAgY29uc3QgZGl2SGVpZ2h0ID0ge1xuICAgIGxlZnQ6IGhlaWdodCAtIHRvcEhlaWdodCxcbiAgICByaWdodDogaGVpZ2h0IC0gdG9wSGVpZ2h0LFxuICAgIHJpZ2h0TGVmdDogaGVpZ2h0IC0gdG9wSGVpZ2h0IC0gdG9wTWFyZ2luLFxuICAgIHJpZ2h0TGVmdE5hdjogaGVpZ2h0IC0gdG9wSGVpZ2h0IC0gdG9wTWFyZ2luLFxuICAgIHJpZ2h0UmlnaHQ6IGhlaWdodCAtIHRvcEhlaWdodCAtIHRvcE1hcmdpbixcbiAgICByaWdodFJpZ2h0Qm9keTogaGVpZ2h0IC0gdG9wSGVpZ2h0IC0gdG9wTWFyZ2luLFxuICB9XG4gIGNvbnN0IHsgbGVmdCwgcmlnaHRMZWZ0LCByaWdodExlZnROYXYgfSA9IGRpdldpZHRoU3BlY1xuICBjb25zdCBkaXZXaWR0aCA9IHtcbiAgICAuLi5kaXZXaWR0aFNwZWMsXG4gICAgcmlnaHQ6IHdpZHRoIC0gbGVmdCAtIHNjcm9sbEJhcldpZHRoLFxuICAgIHJpZ2h0UmlnaHQ6IHdpZHRoIC0gbGVmdCAtIHJpZ2h0TGVmdCAtIDIgKiBzY3JvbGxCYXJXaWR0aCAtIGxlZnRNYXJnaW4sXG4gICAgcmlnaHRSaWdodEJvZHk6IHdpZHRoIC0gbGVmdCAtIHJpZ2h0TGVmdE5hdiAtIDIgKiBzY3JvbGxCYXJXaWR0aCAtIGxlZnRNYXJnaW4sXG4gIH1cblxuICByZXR1cm4ge1xuICAgIHdpZHRoOiBkaXZXaWR0aFtraW5kXSxcbiAgICBoZWlnaHQ6IGRpdkhlaWdodFtraW5kXSxcbiAgICBmbG9hdDogZmxvYXRTcGVjW2tpbmRdLFxuICB9XG59XG5cbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCB7IHJlbmRlciB9IGZyb20gJ3JlYWN0LWRvbSdcbmltcG9ydCB7IFJvdXRlciwgUm91dGUsIFJlZGlyZWN0LCBJbmRleFJvdXRlLCBJbmRleFJlZGlyZWN0LCBicm93c2VySGlzdG9yeSB9IGZyb20gJ3JlYWN0LXJvdXRlcidcblxuaW1wb3J0IFJvb3QgZnJvbSAnUm9vdC5qc3gnXG5pbXBvcnQgQXBwIGZyb20gJ0FwcC5qc3gnXG5pbXBvcnQgU3ViQXBwIGZyb20gJ1N1YkFwcC5qc3gnXG5pbXBvcnQgQmFja29mZmljZSBmcm9tICdCYWNrb2ZmaWNlLmpzeCdcbmltcG9ydCBJdGVtRmlsdGVyZWQgZnJvbSAnSXRlbUZpbHRlcmVkLmpzeCdcbmltcG9ydCBJdGVtTXkgZnJvbSAnSXRlbU15LmpzeCdcbmltcG9ydCBJdGVtUmVjb3JkUHJlIGZyb20gJ0l0ZW1SZWNvcmRQcmUuanN4J1xuaW1wb3J0IERvYyBmcm9tICdEb2MuanN4J1xuaW1wb3J0IE5vdEZvdW5kIGZyb20gJ05vdEZvdW5kLmpzeCdcblxuaW1wb3J0IGNvbmZpZ3VyZVN0b3JlIGZyb20gJ2NvbmZpZ3VyZVN0b3JlLmpzJ1xuaW1wb3J0IHJvb3RSZWR1Y2VyIGZyb20gJ3Jvb3RSZWR1Y2VyLmpzJ1xuXG5jb25zdCBzdG9yZSA9IGNvbmZpZ3VyZVN0b3JlKHJvb3RSZWR1Y2VyKVxuXG5yZW5kZXIoXG4gIDxSb290IHN0b3JlPXtzdG9yZX0+XG4gICAgPFJvdXRlciBoaXN0b3J5PXticm93c2VySGlzdG9yeX0gPlxuICAgICAgPFJlZGlyZWN0IGZyb209XCIvYWJvdXRcIiB0bz1cIi9kb2NzL2Fib3V0Lm1kXCIgLz5cbiAgICAgIDxSZWRpcmVjdCBmcm9tPVwiL2RvY3MvYWJvdXRcIiB0bz1cIi9kb2NzL2Fib3V0Lm1kXCIgLz5cbiAgICAgIDxSZWRpcmVjdCBmcm9tPVwiL2Fib3V0Lm1kXCIgdG89XCIvZG9jcy9hYm91dC5tZFwiIC8+XG4gICAgICA8UmVkaXJlY3QgZnJvbT1cIi9sb2dpblwiIHRvPVwiL2RvY3MvYWJvdXQubWRcIiAvPlxuICAgICAgPFJlZGlyZWN0IGZyb209XCIvbG9nb3V0XCIgdG89XCIvZG9jcy9hYm91dC5tZFwiIC8+XG4gICAgICA8UmVkaXJlY3QgZnJvbT1cIi9zbG9nb3V0XCIgdG89XCIvZG9jcy9hYm91dC5tZFwiIC8+XG4gICAgICA8Um91dGUgcGF0aD1cIi9cIiBjb21wb25lbnQ9e0FwcH0gPlxuICAgICAgICA8SW5kZXhSb3V0ZSBjb21wb25lbnQ9e0FwcH0gLz5cbiAgICAgICAgPEluZGV4UmVkaXJlY3QgdG89XCIvZG9jcy9hYm91dC5tZFwiIC8+XG4gICAgICAgIDxSb3V0ZSBwYXRoPVwiZG9jcy86ZG9jRmlsZVwiIGNvbXBvbmVudD17RG9jfSAvPlxuICAgICAgICA8Um91dGUgcGF0aD1cInRlY2gvZG9jcy9nZW4vOmRvY0ZpbGVcIiBjb21wb25lbnQ9e0RvY30gLz5cbiAgICAgICAgPFJvdXRlIHBhdGg9XCJ0ZWNoL2RvY3MvOmRvY0ZpbGVcIiBjb21wb25lbnQ9e0RvY30gLz5cbiAgICAgICAgPFJvdXRlIHBhdGg9XCI6dGFibGVcIiBjb21wb25lbnQ9e1N1YkFwcH0gPlxuICAgICAgICAgIDxSb3V0ZSBwYXRoPVwibGlzdFwiIGNvbXBvbmVudD17SXRlbUZpbHRlcmVkfSAvPlxuICAgICAgICAgIDxSb3V0ZSBwYXRoPVwibXlsaXN0XCIgY29tcG9uZW50PXtJdGVtTXl9ID5cbiAgICAgICAgICAgIDxSb3V0ZSBwYXRoPVwiOmVJZFwiIGNvbXBvbmVudD17SXRlbVJlY29yZFByZX0gb3duT25seT17dHJ1ZX0gLz5cbiAgICAgICAgICA8L1JvdXRlPlxuICAgICAgICAgIDxSb3V0ZSBwYXRoPVwiOmZ1bmNcIiBjb21wb25lbnQ9e0JhY2tvZmZpY2V9IC8+XG4gICAgICAgIDwvUm91dGU+XG4gICAgICA8L1JvdXRlPlxuICAgICAgPFJvdXRlIHBhdGg9XCIqXCIgY29tcG9uZW50PXtOb3RGb3VuZH0gLz5cbiAgICA8L1JvdXRlcj5cbiAgPC9Sb290PlxuICAsXG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdib2R5JylcbilcblxuIiwiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4J1xuaW1wb3J0IHsgY2hhbmdlRmFjZXRBbGwsIGdldEZpbHRlclNldHRpbmcsIHRlc3RBbGxDaGVja3MgfSBmcm9tICdmaWx0ZXIuanMnXG5cbmNvbnN0IGluZGV0ZXJtaW5hdGUgPSBzdGF0ZXMgPT4gIXN0YXRlcy5hbGxUcnVlICYmICFzdGF0ZXMuYWxsRmFsc2VcblxuY2xhc3MgQ2hlY2tib3hJIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgY29tcG9uZW50RGlkVXBkYXRlKCkge1xuICAgIGNvbnN0IHsgcHJvcHM6IHsgZmlsdGVyU2V0dGluZyB9IH0gPSB0aGlzXG4gICAgY29uc3Qgc3RhdGVzID0gdGVzdEFsbENoZWNrcyhmaWx0ZXJTZXR0aW5nKVxuICAgIHRoaXMuZG9tLmluZGV0ZXJtaW5hdGUgPSBpbmRldGVybWluYXRlKHN0YXRlcylcbiAgfVxuICBoYW5kbGVDaGVjayA9ICgpID0+IHtcbiAgICBjb25zdCB7IHByb3BzOiB7ZmlsdGVyU2V0dGluZywgdGFibGUsIGZpbHRlcklkLCBoYW5kbGUgfSB9ID0gdGhpc1xuICAgIGNvbnN0IHN0YXRlcyA9IHRlc3RBbGxDaGVja3MoZmlsdGVyU2V0dGluZylcbiAgICByZXR1cm4gaGFuZGxlKHRhYmxlLCBmaWx0ZXJJZCwgdGhpcy5kb20uaW5kZXRlcm1pbmF0ZSB8fCAhc3RhdGVzLmFsbFRydWUpXG4gIH1cbiAgc2V0SW5kZXRlcm1pbmF0ZSA9IGRvbUVsZW0gPT4ge1xuICAgIGNvbnN0IHsgcHJvcHM6IHsgZmlsdGVyU2V0dGluZyB9IH0gPSB0aGlzXG4gICAgY29uc3Qgc3RhdGVzID0gdGVzdEFsbENoZWNrcyhmaWx0ZXJTZXR0aW5nKVxuICAgIGlmIChkb21FbGVtKSB7XG4gICAgICB0aGlzLmRvbSA9IGRvbUVsZW1cbiAgICAgIGRvbUVsZW0uaW5kZXRlcm1pbmF0ZSA9IGluZGV0ZXJtaW5hdGUoc3RhdGVzKVxuICAgIH1cbiAgfVxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBwcm9wczogeyBmaWx0ZXJTZXR0aW5nIH0gfSA9IHRoaXNcbiAgICBjb25zdCBzdGF0ZXMgPSB0ZXN0QWxsQ2hlY2tzKGZpbHRlclNldHRpbmcpXG4gICAgcmV0dXJuIChcbiAgICAgIDxpbnB1dFxuICAgICAgICAgIHJlZj17dGhpcy5zZXRJbmRldGVybWluYXRlfVxuICAgICAgICAgIHR5cGU9XCJjaGVja2JveFwiXG4gICAgICAgICAgY2hlY2tlZD17c3RhdGVzLmFsbFRydWV9XG4gICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hlY2t9XG4gICAgICAvPlxuICAgIClcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KGdldEZpbHRlclNldHRpbmcsIHsgaGFuZGxlOiBjaGFuZ2VGYWNldEFsbCB9KShDaGVja2JveEkpXG4iLCJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4J1xuaW1wb3J0IE1hcmtkb3duIGZyb20gJ3JlYWN0LW1hcmtkb3duJ1xuaW1wb3J0IHsgTGluayB9IGZyb20gJ3JlYWN0LXJvdXRlcidcbmltcG9ydCBBbHRlcm5hdGl2ZSBmcm9tICdBbHRlcm5hdGl2ZS5qc3gnXG5pbXBvcnQgeyBnZXREb2MsIG5lZWREb2MsIGNoYW5nZWREb2MsIGZldGNoRG9jIH0gZnJvbSAnZG9jLmpzJ1xuXG5jb25zdCBSb3V0ZXJMaW5rID0gKHsgY2hpbGRyZW4sIGhyZWYgfSkgPT4gKFxuICBocmVmLm1hdGNoKC9eKGh0dHBzPzopP1xcL1xcLy8pXG4gICAgPyA8YSBocmVmPXtocmVmfSA+e2NoaWxkcmVufTwvYT5cbiAgICA6IDxMaW5rIHRvPXtocmVmfSA+e2NoaWxkcmVufTwvTGluaz5cbilcblxuY2xhc3MgRG9jTWQgZXh0ZW5kcyBDb21wb25lbnQge1xuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge3Byb3BzOiB7IGRvY05hbWUsIHRleHQgfSB9ID0gdGhpc1xuICAgIGNvbnN0IGNvbnRyb2xQbGFjZW1lbnQgPSBjb250cm9sID0+IDxwIHN0eWxlPXt7ZmxvYXQ6ICdyaWdodCd9fSA+e2NvbnRyb2x9PC9wPlxuICAgIGNvbnN0IGNvbnRyb2wxID0gaGFuZGxlciA9PiA8YSBjbGFzc05hbWU9XCJjb250cm9sIGZhIGZhLWhhbmQtby1kb3duXCIgaHJlZj1cIiNcIiB0aXRsZT1cIm1hcmtkb3duIHNvdXJjZVwiIG9uQ2xpY2s9e2hhbmRsZXJ9IC8+XG4gICAgY29uc3QgY29udHJvbDIgPSBoYW5kbGVyID0+IDxhIGNsYXNzTmFtZT1cImNvbnRyb2wgZmEgZmEtZmlsZS1jb2RlLW9cIiBocmVmPVwiI1wiIHRpdGxlPVwiZm9ybWF0dGVkXCIgb25DbGljaz17aGFuZGxlcn0gLz5cblxuICAgIGlmIChuZWVkRG9jKHsgdGV4dCB9KSkge3JldHVybiA8ZGl2PntgTm8gZG9jdW1lbnQgJHtkb2NOYW1lfWB9PC9kaXY+fVxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IHN0eWxlPXt7cGFkZGluZ0xlZnQ6ICcwLjVlbSd9fSA+XG4gICAgICAgIDxBbHRlcm5hdGl2ZVxuICAgICAgICAgIHRhZz17ZG9jTmFtZX1cbiAgICAgICAgICBjb250cm9sUGxhY2VtZW50PXtjb250cm9sUGxhY2VtZW50fVxuICAgICAgICAgIGNvbnRyb2xzPXtbY29udHJvbDEsIGNvbnRyb2wyXX1cbiAgICAgICAgICBhbHRlcm5hdGl2ZXM9e1soXG4gICAgICAgICAgICA8ZGl2IGtleT1cImZtdFwiID5cbiAgICAgICAgICAgICAgPE1hcmtkb3duXG4gICAgICAgICAgICAgICAgc291cmNlPXt0ZXh0fVxuICAgICAgICAgICAgICAgIHJlbmRlcmVycz17e0xpbms6IFJvdXRlckxpbmt9fVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKSwgKFxuICAgICAgICAgICAgPGRpdiBrZXk9XCJzcmNcIiA+XG4gICAgICAgICAgICAgIDxwcmUgY2xhc3NOYW1lPVwibWQtc291cmNlXCIgPnt0ZXh0fTwvcHJlPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKV19XG4gICAgICAgIC8+XG4gICAgICA8L2Rpdj5cbiAgICApXG4gIH1cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgY29uc3QgeyBwcm9wcywgcHJvcHM6IHsgZmV0Y2ggfSB9ID0gdGhpc1xuICAgIGZldGNoKHByb3BzKVxuICB9XG4gIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMpIHtcbiAgICBjb25zdCB7IHByb3BzLCBwcm9wczogeyBmZXRjaCB9IH0gPSB0aGlzXG4gICAgaWYgKGNoYW5nZWREb2MocHJvcHMsIHByZXZQcm9wcykpIHtcbiAgICAgIGZldGNoKHByb3BzKVxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KGdldERvYywgeyBmZXRjaDogZmV0Y2hEb2MgfSkoRG9jTWQpXG4iLCJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnXG5pbXBvcnQgQnlWYWx1ZSBmcm9tICdCeVZhbHVlLmpzeCdcbmltcG9ydCBMIGZyb20gJ2xlYWZsZXQnXG5pbXBvcnQge2NvdW50cnlCb3JkZXJzfSBmcm9tICdldXJvcGUuZ2VvLmpzJ1xuaW1wb3J0IHsgZ2V0RmlsdGVyU2V0dGluZyB9IGZyb20gJ2ZpbHRlci5qcydcbmltcG9ydCB7IGdldFRhYmxlcyB9IGZyb20gJ3RhYmxlcy5qcydcbmltcG9ydCB7IGNvbWJpbmVTZWxlY3RvcnMgfSBmcm9tICdoZWxwZXJzLmpzJ1xuXG5jb25zdCBtYXBPcHRpb25zID0ge1xuICBIRUlHSFQ6IDI1MCxcbiAgTUFYX1JBRElVUzogMjUsXG4gIExFVkVMX09GRjogMTAsXG4gIFpPT01fSU5JVDogMyxcbiAgTUFQX0NFTlRFUjogWzUyLCAxMl0sXG4gIE1BUF9CT1VORFM6IFtbMzAsIC0yMF0sIFs3MCwgNDBdXSxcbiAgTUFSS0VSX0NPTE9SOiB7XG4gICAgW3RydWVdOiB7XG4gICAgICBjb2xvcjogJyMwMDg4MDAnLFxuICAgICAgZmlsbENvbG9yOiAnIzAwY2MwMCcsXG4gICAgfSxcbiAgICBbZmFsc2VdOiB7XG4gICAgICBjb2xvcjogJyM4ODg4NDQnLFxuICAgICAgZmlsbENvbG9yOiAnI2JiYmI2NicsXG4gICAgfSxcbiAgfSxcbiAgTUFSS0VSX1NIQVBFOiB7XG4gICAgd2VpZ2h0OiAxLFxuICAgIGZpbGw6IHRydWUsXG4gICAgZmlsbE9wYWNpdHk6IDAuOCxcbiAgfSxcbiAgQ09VTlRSWV9TVFlMRToge1xuICAgIFt0cnVlXToge1xuICAgICAgY29sb3I6ICcjODg0NDIyJyxcbiAgICAgIHdlaWdodDogMixcbiAgICAgIGZpbGw6IHRydWUsXG4gICAgICBmaWxsQ29sb3I6ICcjYWE3NzY2JyxcbiAgICAgIGZpbGxPcGFjaXR5OiAxLFxuICAgIH0sXG4gICAgW2ZhbHNlXToge1xuICAgICAgY29sb3I6ICcjNzc3Nzc3JyxcbiAgICAgIHdlaWdodDogMSxcbiAgICAgIGZpbGw6IHRydWUsXG4gICAgICBmaWxsQ29sb3I6ICcjYmJiYmJiJyxcbiAgICAgIGZpbGxPcGFjaXR5OiAxLFxuICAgIH0sXG4gIH0sXG59XG5cbmNvbnN0IGNvbXB1dGVSYWRpdXMgPSAoX2lkLCBmaWx0ZXJlZEFtb3VudE90aGVycywgYW1vdW50cykgPT4ge1xuICBjb25zdCBhbW91bnQgPSBhbW91bnRzID8gKGFtb3VudHNbX2lkXSB8fCAwKSA6IDBcbiAgaWYgKGFtb3VudCA9PSAwKSB7cmV0dXJuIDB9XG4gIGNvbnN0IHsgTUFYX1JBRElVUywgTEVWRUxfT0ZGIH0gPSBtYXBPcHRpb25zXG4gIGNvbnN0IHByb3BvcnRpb25hbCA9IE1BWF9SQURJVVMgKiBhbW91bnQgLyBmaWx0ZXJlZEFtb3VudE90aGVyc1xuICBpZiAoZmlsdGVyZWRBbW91bnRPdGhlcnMgPCBMRVZFTF9PRkYpIHtyZXR1cm4gcHJvcG9ydGlvbmFsfVxuICByZXR1cm4gTEVWRUxfT0ZGICogTWF0aC5zcXJ0KHByb3BvcnRpb25hbClcbn1cblxuY2xhc3MgRVVNYXAgZXh0ZW5kcyBDb21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKVxuICAgIHRoaXMuZmVhdHVyZXMgPSB7fVxuICB9XG4gIHNldE1hcCA9IGRvbSA9PiB7aWYgKGRvbSkge3RoaXMuZG9tID0gZG9tfX1cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgcHJvcHM6IHsgdGFibGVzLCAuLi5ieVZhbHVlUHJvcHMgfSwgc2V0TWFwIH0gPSB0aGlzXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIDxkaXZcbiAgICAgICAgICByZWY9e3NldE1hcH1cbiAgICAgICAgLz5cbiAgICAgICAgPEJ5VmFsdWUgey4uLmJ5VmFsdWVQcm9wc30gLz5cbiAgICAgIDwvZGl2PlxuICAgIClcbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIGNvbnN0IHtcbiAgICAgIHByb3BzOiB7IGZpbHRlclNldHRpbmcsIGZpbHRlcmVkQW1vdW50T3RoZXJzLCBhbW91bnRzLCB0YWJsZXM6IHsgY291bnRyeSB9IH0sXG4gICAgICBkb20sXG4gICAgfSA9IHRoaXNcbiAgICBjb25zdCB7IEhFSUdIVCwgTUFQX0NFTlRFUiwgWk9PTV9JTklULCBNQVBfQk9VTkRTLCBNQVJLRVJfQ09MT1IsIE1BUktFUl9TSEFQRSwgQ09VTlRSWV9TVFlMRSB9ID0gbWFwT3B0aW9uc1xuICAgIGRvbS5zdHlsZS5oZWlnaHQgPSBIRUlHSFRcbiAgICB0aGlzLm1hcCA9IEwubWFwKGRvbSwge1xuICAgICAgYXR0cmlidXRpb25Db250cm9sOiBmYWxzZSxcbiAgICAgIGNlbnRlcjogTUFQX0NFTlRFUixcbiAgICAgIHpvb206IFpPT01fSU5JVCxcbiAgICAgIG1heEJvdW5kczogTUFQX0JPVU5EUyxcbiAgICB9KVxuICAgIGNvbnN0IHsgb3JkZXIsIGVudGl0aWVzIH0gPSBjb3VudHJ5XG4gICAgdGhpcy5pZEZyb21Jc28gPSB7fVxuICAgIG9yZGVyLmZvckVhY2goX2lkID0+IHtcbiAgICAgIGNvbnN0IHsgW19pZF06IHsgdmFsdWVzOiB7IGlzbyB9IH0gfSA9IGVudGl0aWVzXG4gICAgICB0aGlzLmlkRnJvbUlzb1tpc29dID0gX2lkXG4gICAgfSlcbiAgICBMLmdlb0pTT04oY291bnRyeUJvcmRlcnMsIHtcbiAgICAgIHN0eWxlOiBmZWF0dXJlID0+IENPVU5UUllfU1RZTEVbdGhpcy5pbkRhcmlhaChmZWF0dXJlKV0sXG4gICAgICBvbkVhY2hGZWF0dXJlOiBmZWF0dXJlID0+IHtcbiAgICAgICAgaWYgKHRoaXMuaW5EYXJpYWgoZmVhdHVyZSkpIHtcbiAgICAgICAgICBjb25zdCB7IHByb3BlcnRpZXM6IHsgaXNvMiwgbGF0LCBsbmcgfSB9ID0gZmVhdHVyZVxuICAgICAgICAgIGNvbnN0IHsgaWRGcm9tSXNvOiB7IFtpc28yXTogX2lkIH0gfSA9IHRoaXNcbiAgICAgICAgICBjb25zdCB7IFtfaWRdOiBpc09uIH0gPSBmaWx0ZXJTZXR0aW5nXG4gICAgICAgICAgY29uc3QgbWFya2VyID0gTC5jaXJjbGVNYXJrZXIoW2xhdCwgbG5nXSwge1xuICAgICAgICAgICAgLi4uTUFSS0VSX0NPTE9SW2lzT25dLFxuICAgICAgICAgICAgcmFkaXVzOiBjb21wdXRlUmFkaXVzKF9pZCwgZmlsdGVyZWRBbW91bnRPdGhlcnMsIGFtb3VudHMpLFxuICAgICAgICAgICAgLi4uTUFSS0VSX1NIQVBFLFxuICAgICAgICAgICAgcGFuZTogJ21hcmtlclBhbmUnLFxuICAgICAgICAgIH0pLmFkZFRvKHRoaXMubWFwKVxuICAgICAgICAgIHRoaXMuZmVhdHVyZXNbaXNvMl0gPSBtYXJrZXJcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICB9KS5hZGRUbyh0aGlzLm1hcClcbiAgfVxuXG4gIGluRGFyaWFoID0gZmVhdHVyZSA9PiAhIXRoaXMuaWRGcm9tSXNvW2ZlYXR1cmUucHJvcGVydGllcy5pc28yXVxuXG4gIGNvbXBvbmVudERpZFVwZGF0ZSgpIHtcbiAgICBjb25zdCB7IHByb3BzOiB7IGZpbHRlclNldHRpbmcsIGZpbHRlcmVkQW1vdW50T3RoZXJzLCBhbW91bnRzIH0gfSA9IHRoaXNcbiAgICBjb25zdCB7IE1BUktFUl9DT0xPUiB9ID0gbWFwT3B0aW9uc1xuICAgIE9iamVjdC5lbnRyaWVzKHRoaXMuZmVhdHVyZXMpLmZvckVhY2goKFtpc28yLCBtYXJrZXJdKSA9PiB7XG4gICAgICBjb25zdCB7IGlkRnJvbUlzbzogeyBbaXNvMl06IF9pZCB9IH0gPSB0aGlzXG4gICAgICBjb25zdCB7IFtfaWRdOiBpc09uIH0gPSBmaWx0ZXJTZXR0aW5nXG4gICAgICBtYXJrZXIuc2V0UmFkaXVzKGNvbXB1dGVSYWRpdXMoX2lkLCBmaWx0ZXJlZEFtb3VudE90aGVycywgYW1vdW50cykpXG4gICAgICBtYXJrZXIuc2V0U3R5bGUoTUFSS0VSX0NPTE9SW2lzT25dKVxuICAgIH0pXG4gIH1cbn1cblxuRVVNYXAuZGlzcGxheU5hbWUgPSAnRVVNYXAnXG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QoY29tYmluZVNlbGVjdG9ycyhnZXRUYWJsZXMsIGdldEZpbHRlclNldHRpbmcpKShFVU1hcClcbiIsImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCdcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCdcbmltcG9ydCBJdGVtTGlzdCBmcm9tICdJdGVtTGlzdC5qc3gnXG5pbXBvcnQgRmlsdGVyIGZyb20gJ0ZpbHRlci5qc3gnXG5pbXBvcnQgUGFuZSBmcm9tICdQYW5lLmpzeCdcblxuaW1wb3J0IHsgc2V0dXBGaWx0ZXJpbmcsIGdldEZpbHRlcnNBcHBsaWVkIH0gZnJvbSAnZmlsdGVyLmpzJ1xuXG5jbGFzcyBGaWx0ZXJDb21wdXRlIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcigpXG4gICAgY29uc3QgeyB0YWJsZXMsIHRhYmxlLCBpbml0aWFsaXplZCwgaW5pdCB9ID0gcHJvcHNcbiAgICBpZiAoIWluaXRpYWxpemVkKSB7aW5pdCh0YWJsZXMsIHRhYmxlKX1cbiAgfVxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBwcm9wczogeyBpbml0aWFsaXplZCB9IH0gPSB0aGlzXG4gICAgaWYgKCFpbml0aWFsaXplZCkge3JldHVybiA8ZGl2IC8+fVxuICAgIGNvbnN0IHsgcHJvcHM6IHsgdGFibGVzLCB0YWJsZSwgZmlsdGVyZWREYXRhLCBmaWx0ZXJlZEFtb3VudE90aGVycywgYW1vdW50c30gfSA9IHRoaXNcbiAgICBjb25zdCB7IFt0YWJsZV06IHsgb3JkZXIsIHRpdGxlIH0gfSA9IHRhYmxlc1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICA8UGFuZSBmb3JtYXQ9XCJzaXplZFwiIHBvc2l0aW9uPVwicmlnaHRMZWZ0XCI+XG4gICAgICAgICAgPHA+eydUb3RhbCAnfTxzcGFuIGNsYXNzTmFtZT1cImdvb2Qtb1wiID57b3JkZXIubGVuZ3RofTwvc3Bhbj48L3A+XG4gICAgICAgICAgPEZpbHRlclxuICAgICAgICAgICAgdGFibGU9e3RhYmxlfVxuICAgICAgICAgICAgZmlsdGVyZWRBbW91bnQ9e2ZpbHRlcmVkRGF0YS5sZW5ndGh9XG4gICAgICAgICAgICBmaWx0ZXJlZEFtb3VudE90aGVycz17ZmlsdGVyZWRBbW91bnRPdGhlcnN9XG4gICAgICAgICAgICBhbW91bnRzPXthbW91bnRzfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvUGFuZT5cbiAgICAgICAgPFBhbmUgZm9ybWF0PVwic2l6ZWRcIiBwb3NpdGlvbj1cInJpZ2h0UmlnaHRcIj5cbiAgICAgICAgICA8SXRlbUxpc3QgdGFibGU9e3RhYmxlfSB0aXRsZT17dGl0bGV9IGZpbHRlcmVkRGF0YT17ZmlsdGVyZWREYXRhfSBpbnBsYWNlPXt0cnVlfSAvPlxuICAgICAgICA8L1BhbmU+XG4gICAgICA8L2Rpdj5cbiAgICApXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChnZXRGaWx0ZXJzQXBwbGllZCwgeyBpbml0OiBzZXR1cEZpbHRlcmluZyB9KShGaWx0ZXJDb21wdXRlKVxuIiwiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4J1xuXG5pbXBvcnQgRmlsdGVyQ29tcHV0ZSBmcm9tICdGaWx0ZXJDb21wdXRlLmpzeCdcbmltcG9ydCB7IGdldFRhYmxlcywgbmVlZFRhYmxlcywgZmV0Y2hUYWJsZSB9IGZyb20gJ3RhYmxlcy5qcydcblxuY2xhc3MgSXRlbUZpbHRlcmVkIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgcHJvcHM6IHsgcGFyYW1zOiB7IHRhYmxlIH0sIHRhYmxlcyB9IH0gPSB0aGlzXG4gICAgaWYgKG5lZWRUYWJsZXModGFibGVzLCB0YWJsZSkpIHtyZXR1cm4gPGRpdiAvPn1cbiAgICByZXR1cm4gKFxuICAgICAgPEZpbHRlckNvbXB1dGUgdGFibGU9e3RhYmxlfSAvPlxuICAgIClcbiAgfVxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICBjb25zdCB7IHByb3BzOiB7IHBhcmFtczogeyB0YWJsZSB9LCB0YWJsZXMsIGZldGNoIH0gfSA9IHRoaXNcbiAgICBpZiAobmVlZFRhYmxlcyh0YWJsZXMsIHRhYmxlKSkge2ZldGNoKHRhYmxlKX1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KGdldFRhYmxlcywgeyBmZXRjaDogZmV0Y2hUYWJsZSB9KShJdGVtRmlsdGVyZWQpXG4iLCJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnXG5pbXBvcnQgeyBnZXRUYWJsZXMsIG5lZWRUYWJsZXMsIGZldGNoVGFibGVNeSB9IGZyb20gJ3RhYmxlcy5qcydcblxuaW1wb3J0IEl0ZW1MaXN0IGZyb20gJ0l0ZW1MaXN0LmpzeCdcbmltcG9ydCBQYW5lIGZyb20gJ1BhbmUuanN4J1xuXG5jbGFzcyBJdGVtTXkgZXh0ZW5kcyBDb21wb25lbnQge1xuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBwcm9wczogeyBwYXJhbXM6IHsgdGFibGUgfSwgdGFibGVzLCBjaGlsZHJlbiB9IH0gPSB0aGlzXG4gICAgaWYgKG5lZWRUYWJsZXModGFibGVzLCB0YWJsZSwgdHJ1ZSkgfHwgbmVlZFRhYmxlcyh0YWJsZXMsIFsnY291bnRyeScsICd1c2VyJ10pKSB7cmV0dXJuIDxkaXYgLz59XG4gICAgY29uc3QgeyBbdGFibGVdOiB7IHRpdGxlLCBwZXJtLCBteSB9IH0gPSB0YWJsZXNcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPFBhbmUgZm9ybWF0PVwibmF2IHNpemVkXCIgcG9zaXRpb249XCJyaWdodExlZnROYXZcIj5cbiAgICAgICAgICA8cD5cbiAgICAgICAgICAgIHtgJHtteS5sZW5ndGh9IGl0ZW1zIGB9XG4gICAgICAgICAgICB7KHBlcm0gIT0gbnVsbCAmJiBwZXJtLmluc2VydCkgPyAoXG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZhIGZhLXBsdXNcIiB0aXRsZT1cIm5ldyBjb250cmlidXRpb25cIiAvPlxuICAgICAgICAgICAgKSA6IG51bGx9XG4gICAgICAgICAgPC9wPlxuICAgICAgICAgIDxJdGVtTGlzdCB0YWJsZT17dGFibGV9IHRpdGxlPXt0aXRsZX0gZmlsdGVyZWREYXRhPXtteX0gaW5wbGFjZT17ZmFsc2V9IC8+XG4gICAgICAgIDwvUGFuZT5cbiAgICAgICAgPFBhbmUgZm9ybWF0PVwic2l6ZWRcIiBwb3NpdGlvbj1cInJpZ2h0UmlnaHRCb2R5XCI+XG4gICAgICAgICAgeyBjaGlsZHJlbiB9XG4gICAgICAgIDwvUGFuZT5cbiAgICAgIDwvZGl2PlxuICAgIClcbiAgfVxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICBjb25zdCB7IHByb3BzOiB7IHBhcmFtczogeyB0YWJsZSB9LCB0YWJsZXMsIGZldGNoIH0gfSA9IHRoaXNcbiAgICBpZiAobmVlZFRhYmxlcyh0YWJsZXMsIHRhYmxlLCB0cnVlKSkge2ZldGNoKHRhYmxlKX1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KGdldFRhYmxlcywgeyBmZXRjaDogZmV0Y2hUYWJsZU15IH0pKEl0ZW1NeSlcblxuIiwiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4J1xuXG5pbXBvcnQgeyBnZXRUYWJsZXMsIG5lZWRWYWx1ZXMsIGNoYW5nZWRJdGVtLCBmZXRjaEl0ZW0gfSBmcm9tICd0YWJsZXMuanMnXG5cbmltcG9ydCBJdGVtRmllbGQgZnJvbSAnSXRlbUZpZWxkLmpzeCdcblxuY2xhc3MgSXRlbVJlY29yZCBleHRlbmRzIENvbXBvbmVudCB7XG4gIHBhcnNlRmllbGRzKCkge1xuICAgIGNvbnN0IHsgcHJvcHM6IHsgdGFibGVzLCB0YWJsZSwgZUlkIH0gfSA9IHRoaXNcbiAgICBjb25zdCB7IFt0YWJsZV06IHsgZmllbGRTcGVjcywgZmllbGRPcmRlciB9IH0gPSB0YWJsZXNcbiAgICBjb25zdCBlbnRpdHkgPSB0aGlzLmdldEVudGl0eSgpXG4gICAgY29uc3QgeyBwZXJtLCBmaWVsZHMsIHZhbHVlcyB9ID0gZW50aXR5XG5cbiAgICBjb25zdCBmcmFnbWVudHMgPSBbXVxuICAgIGxldCBoYXNFZGl0YWJsZSA9IGZhbHNlXG4gICAgZm9yIChjb25zdCBuYW1lIG9mIGZpZWxkT3JkZXIpIHtcbiAgICAgIGNvbnN0IHsgW25hbWVdOiBmIH0gPSBmaWVsZHNcbiAgICAgIGlmIChmID09IG51bGwpIHtjb250aW51ZX1cbiAgICAgIGNvbnN0IHsgW25hbWVdOiB7IGxhYmVsLCBpbml0aWFsLCAuLi5zcGVjcyB9IH0gPSBmaWVsZFNwZWNzXG4gICAgICBjb25zdCB7IHVwZGF0ZTogeyBbbmFtZV06IGVkaXRhYmxlIH0gfSA9IHBlcm1cbiAgICAgIGlmIChlZGl0YWJsZSkge2hhc0VkaXRhYmxlID0gdHJ1ZX1cbiAgICAgIGZyYWdtZW50cy5wdXNoKFxuICAgICAgICA8SXRlbUZpZWxkXG4gICAgICAgICAga2V5PXtuYW1lfVxuICAgICAgICAgIHRhYmxlPXt0YWJsZX1cbiAgICAgICAgICBlSWQ9e2VJZH1cbiAgICAgICAgICBlZGl0YWJsZT17ISFlZGl0YWJsZX1cbiAgICAgICAgICBuYW1lPXtuYW1lfVxuICAgICAgICAgIGxhYmVsPXtsYWJlbH1cbiAgICAgICAgICB2YWx1ZXM9e3ZhbHVlc1tuYW1lXX1cbiAgICAgICAgICBpbml0aWFsPXtpbml0aWFsfVxuICAgICAgICAgIHsuLi5zcGVjc31cbiAgICAgICAgLz5cbiAgICAgIClcbiAgICB9XG4gICAgcmV0dXJuIHtmcmFnbWVudHMsIGhhc0VkaXRhYmxlfVxuICB9XG5cbiAgZ2V0RW50aXR5ID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgcHJvcHM6IHsgdGFibGVzLCB0YWJsZSwgZUlkIH0gfSA9IHRoaXNcbiAgICBjb25zdCB7IFt0YWJsZV06IHsgZW50aXRpZXM6IHsgW2VJZF06IGVudGl0eSB9IH0gfSA9IHRhYmxlc1xuICAgIHJldHVybiBlbnRpdHlcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IHByb3BzOiB7IHRhYmxlcywgdGFibGUsIGVJZCB9IH0gPSB0aGlzXG4gICAgaWYgKG5lZWRWYWx1ZXMoeyB0YWJsZXMsIHRhYmxlLCBlSWQgfSkpIHtyZXR1cm4gPGRpdiAvPn1cblxuICAgIGNvbnN0IGVudGl0eSA9IHRoaXMuZ2V0RW50aXR5KClcbiAgICBjb25zdCB7IHBlcm0gfSA9IGVudGl0eVxuICAgIGNvbnN0IHsgZnJhZ21lbnRzLCBoYXNFZGl0YWJsZSB9ID0gdGhpcy5wYXJzZUZpZWxkcygpXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwid2lkZ2V0LW1lZGl1bVwiID5cbiAgICAgICAgPHA+e2ByZWNvcmQgaW4gJHt0YWJsZX1gfTwvcD5cbiAgICAgICAgPHA+XG4gICAgICAgICAge2hhc0VkaXRhYmxlID8gW1xuICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAga2V5PVwic2F2ZVwiXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17YGJ1dHRvbi1sYXJnZWB9XG4gICAgICAgICAgICA+eydTYXZlJ308L3NwYW4+LFxuICAgICAgICAgICAgcGVybS5kZWxldGUgPyAoXG4gICAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgICAga2V5PVwiZGVsZXRlXCJcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9eydmYSBmYS10cmFzaCBidXR0b24tbGFyZ2UgZGVsZXRlJ31cbiAgICAgICAgICAgICAgICB0aXRsZT1cImRlbGV0ZSB0aGlzIGl0ZW1cIlxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgKSA6IG51bGwsXG4gICAgICAgICAgXSA6IG51bGx9XG4gICAgICAgIDwvcD5cbiAgICAgICAgPGRpdj57ZnJhZ21lbnRzfTwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKVxuICB9XG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIGNvbnN0IHsgcHJvcHMsIHByb3BzOiB7IGZldGNoIH0gfSA9IHRoaXNcbiAgICBpZiAoY2hhbmdlZEl0ZW0ocHJvcHMsIG51bGwpKSB7ZmV0Y2gocHJvcHMpfVxuICB9XG4gIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMpIHtcbiAgICBjb25zdCB7IHByb3BzLCBwcm9wczogeyBmZXRjaCB9IH0gPSB0aGlzXG4gICAgaWYgKGNoYW5nZWRJdGVtKHByb3BzLCBwcmV2UHJvcHMpKSB7ZmV0Y2gocHJvcHMpfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QoZ2V0VGFibGVzLCB7IGZldGNoOiBmZXRjaEl0ZW0gfSkoSXRlbVJlY29yZClcblxuIiwiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCdcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCdcbmltcG9ydCB7IGdldE1lLCBmZXRjaE1lIH0gZnJvbSAnbWUuanMnXG5cbmNsYXNzIExvZ2luIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgcHJvcHM6IHsgbWUgfSB9ID0gdGhpc1xuICAgIHJldHVybiAoXG4gICAgICA8c3BhbiBjbGFzc05hbWU9XCJsb2dpblwiID57XG4gICAgICAgIG1lLmVwcG4gJiYgT2JqZWN0LmtleXMobWUpLmxlbmd0aCA+IDAgPyAoXG4gICAgICAgICAgPHNwYW4+XG4gICAgICAgICAgICA8c3Ryb25nIGNsYXNzTmFtZT1cImZhIGZhLXVzZXJcIiB0aXRsZT17bWUuZXBwbn0gPnttZS5lcHBuLnNwbGl0KCdAJylbMF19PC9zdHJvbmc+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmYSBmYS1oYXNodGFnXCIgLz57bWUuYXV0aG9yaXR5fXsnICd9XG4gICAgICAgICAgICA8ZW0+e21lLmdyb3VwRGVzYyB8fCAnbm90IGF1dGhlbnRpY2F0ZWQnfTwvZW0+XG4gICAgICAgICAgICA8YSBocmVmPVwiL2xvZ291dFwiIGNsYXNzTmFtZT1cImNvbnRyb2wgZmEgZmEtdXNlci10aW1lc1wiIHRpdGxlPVwibG9nIG91dFwiIC8+XG4gICAgICAgICAgICA8YSBocmVmPVwiL3Nsb2dvdXRcIiBjbGFzc05hbWU9XCJjb250cm9sIGZhIGZhLXVzZXJzXCIgdGl0bGU9XCJzaWduIG91dFwiIC8+XG4gICAgICAgICAgPC9zcGFuPlxuICAgICAgICApIDogKFxuICAgICAgICAgIDxhIGhyZWY9XCIvbG9naW5cIiBjbGFzc05hbWU9XCJjb250cm9sIGZhIGZhLXVzZXItcGx1c1wiID57JyBsb2dpbid9PC9hPlxuICAgICAgICApfVxuICAgICAgPC9zcGFuPlxuICAgIClcbiAgfVxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICBjb25zdCB7IHByb3BzOiB7IGZldGNoIH0gfSA9IHRoaXNcbiAgICBmZXRjaCh7IHR5cGU6ICdmZXRjaE1lJywgY29udGVudFR5cGU6ICdkYicsIHBhdGg6ICcvd2hvL2FtaScsIGRlc2M6ICdtZScgfSlcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KGdldE1lLCB7IGZldGNoOiBmZXRjaE1lIH0pKExvZ2luKVxuXG4iLCJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnXG5pbXBvcnQgeyBnZXROb3RpZmljYXRpb25zLCBjbGVhciwgZGlzcGxheSB9IGZyb20gJ25vdGlmeS5qcydcblxuY2xhc3MgTm90aWZpY2F0aW9uIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcylcbiAgICB0aGlzLmRvbSA9IHt9XG4gIH1cbiAgcmVmRG9tID0gbGFiZWwgPT4gZG9tID0+IHtcbiAgICBpZiAoZG9tKSB7dGhpcy5kb21bbGFiZWxdID0gZG9tfVxuICB9XG4gIGhhbmRsZUJveCA9ICgpID0+IHtcbiAgICBjb25zdCB7IHByb3BzOiB7IHNob3csIGRpc3BsYXkgfSB9ID0gdGhpc1xuICAgIGRpc3BsYXkoIXNob3cpXG4gIH1cbiAgaGFuZGxlSGlkZSA9ICgpID0+IHtcbiAgICBjb25zdCB7IHByb3BzOiB7IGRpc3BsYXkgfSB9ID0gdGhpc1xuICAgIGRpc3BsYXkoZmFsc2UpXG4gIH1cbiAgaGFuZGxlQ2xlYXIgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBwcm9wczogeyBjbGVhciB9IH0gPSB0aGlzXG4gICAgY2xlYXIoKVxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgcHJvcHM6IHsgbm90aWZpY2F0aW9ucywgbGFzdE5vdGUsIGxhc3RLaW5kLCBidXN5LCBzaG93IH0gfSA9IHRoaXNcbiAgICBjb25zdCBoaWdobGlnaHQgPSBsYXN0Tm90ZSA+IC0xXG4gICAgY29uc3QgYnVzeUJsb2NrcyA9IG5ldyBBcnJheSgoYnVzeSA8IDApID8gMCA6IGJ1c3kpLmZpbGwoMSlcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPHAgY2xhc3NOYW1lPVwibXNnLXNwaW5uZXJcIiA+XG4gICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgIHRpdGxlPVwic2hvdy9oaWRlIG5vdGlmaWNhdGlvbnMgYW5kIHByb2dyZXNzIG1lc3NhZ2VzXCJcbiAgICAgICAgICAgIGNsYXNzTmFtZT17aGlnaGxpZ2h0ID8gYHNwaW4tJHtsYXN0S2luZH1gIDogJ3NwaW4tb2snfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHsgYnVzeUJsb2Nrcy5tYXAoKGIsIGkpID0+IDxzcGFuIGtleT17aX0gY2xhc3NOYW1lPVwibXNnLWRvdCBmYSBmYS1jYXJldC1sZWZ0XCIgLz4pIH1cbiAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17YGZhIGZhLSR7YnVzeSA9PSAwID8gJ2NpcmNsZS1vJyA6ICdzcGlubmVyIGZhLXNwaW4nfWB9XG4gICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQm94fVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L3NwYW4+XG4gICAgICAgIDwvcD5cbiAgICAgICAge3Nob3cgPyAoXG4gICAgICAgICAgPGRpdlxuICAgICAgICAgICAgcmVmPXt0aGlzLnJlZkRvbSgnbm90Ym94Jyl9XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJtc2ctYm94XCJcbiAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlSGlkZX1cbiAgICAgICAgICA+e1xuICAgICAgICAgICAgKG5vdGlmaWNhdGlvbnMpLm1hcCgobXNnLCBpKSA9PiAoXG4gICAgICAgICAgICAgIDxwXG4gICAgICAgICAgICAgICAga2V5PXtpfVxuICAgICAgICAgICAgICAgIHJlZj17dGhpcy5yZWZEb20oYG0ke2l9YCl9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgbXNnLWxpbmUgJHtbbXNnLmtpbmRdfS1vICR7KG1zZy5raW5kICE9ICdpbmZvJykgPyAnbXNnLWhpZ2gnIDogJyd9YH1cbiAgICAgICAgICAgICAgPnttc2cudGV4dH08L3A+XG4gICAgICAgICAgICApKVxuICAgICAgICAgIH1cbiAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cIm1zZy1kaXNtaXNzXCIgPnsnKGNsaWNrIHBhbmVsIHRvIGhpZGUpJ308L3A+XG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJtc2ctdHJhc2hcIiA+XG4gICAgICAgICAgICAgIDxhXG4gICAgICAgICAgICAgICAgaHJlZj1cIiNcIlxuICAgICAgICAgICAgICAgIHRpdGxlPVwiY2xlYXIgbWVzc2FnZXNcIlxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImNvbnRyb2wgZmEgZmEtdHJhc2hcIlxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMuaGFuZGxlQ2xlYXJ9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICkgOiBudWxsfVxuICAgICAgPC9kaXY+XG4gICAgKVxuICB9XG4gIGNvbXBvbmVudERpZE1vdW50KCkge3RoaXMuc2V0VmlldygpfVxuICBjb21wb25lbnREaWRVcGRhdGUoKSB7dGhpcy5zZXRWaWV3KCl9XG5cbiAgc2V0VmlldygpIHtcbiAgICBjb25zdCB7IHByb3BzOiB7IHNob3cgfSB9ID0gdGhpc1xuICAgIGlmIChzaG93KSB7dGhpcy5zZXRTY3JvbGwoKX1cbiAgfVxuICBzZXRTY3JvbGwoKSB7XG4gICAgY29uc3QgeyBwcm9wczogeyBzaG93IH0gfSA9IHRoaXNcbiAgICBpZiAoc2hvdykge1xuICAgICAgY29uc3QgeyBwcm9wczogeyBsYXN0TXNnLCBsYXN0Tm90ZSB9IH0gPSB0aGlzXG4gICAgICBjb25zdCBoaWdobGlnaHQgPSBsYXN0Tm90ZSA+IC0xXG4gICAgICBpZiAoaGlnaGxpZ2h0KSB7XG4gICAgICAgIHRoaXMuZG9tW2BtJHtsYXN0Tm90ZX1gXS5zY3JvbGxJbnRvVmlldygpXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgaWYgKGxhc3RNc2cgPiAtMSkge1xuICAgICAgICAgIHRoaXMuZG9tW2BtJHtsYXN0TXNnfWBdLnNjcm9sbEludG9WaWV3KClcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KGdldE5vdGlmaWNhdGlvbnMsIHsgY2xlYXIsIGRpc3BsYXkgfSkoTm90aWZpY2F0aW9uKVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBDaGlsZHJlbiB9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4J1xuaW1wb3J0IHRocm90dGxlIGZyb20gJ2xvZGFzaC90aHJvdHRsZSdcbmltcG9ydCB7IGdldFdpbkRpbSwgY2hhbmdlV2luRGltIH0gZnJvbSAnd2luLmpzJ1xuXG5jbGFzcyBXaW5kb3cgZXh0ZW5kcyBDb21wb25lbnQge1xuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBwcm9wczogeyBjaGlsZHJlbiB9IH0gPSB0aGlzXG4gICAgcmV0dXJuIENoaWxkcmVuLm9ubHkoY2hpbGRyZW4pXG4gIH1cbiAgbmV3V2luZG93U2l6ZSA9IHRocm90dGxlKCgpID0+IHtcbiAgICBjb25zdCB7IHByb3BzOiB7IHJlc2l6ZSB9IH0gPSB0aGlzXG4gICAgcmVzaXplKClcbiAgfSwgMTAwMClcblxuICBjb21wb25lbnREaWRNb3VudCgpIHt3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCB0aGlzLm5ld1dpbmRvd1NpemUpfVxuICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHt3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCB0aGlzLm5ld1dpbmRvd1NpemUpfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KGdldFdpbkRpbSwgeyByZXNpemU6IGNoYW5nZVdpbkRpbSB9KShXaW5kb3cpXG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnXG5pbXBvcnQgeyBnZXRBbHQsIG5leHRBbHQgfSBmcm9tICdhbHRlci5qcydcblxuY29uc3QgaGFuZGxlTmV4dCA9ICh7IHRhZywgYWx0ZXJuYXRpdmVzLCBpbml0aWFsLCBuZXh0IH0pID0+IGV2ZW50ID0+IHtcbiAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICBuZXh0KHRhZywgYWx0ZXJuYXRpdmVzLmxlbmd0aCwgaW5pdGlhbClcbn1cblxuY29uc3QgQWx0ZXJuYXRpdmUgPSAoeyBjb250cm9sUGxhY2VtZW50LCBjb250cm9scywgYWx0LCBhbHRlcm5hdGl2ZXMsIC4uLnJlc3QgfSkgPT4gKFxuICA8ZGl2PlxuICAgIHtjb250cm9sUGxhY2VtZW50KGNvbnRyb2xzW2FsdF0oaGFuZGxlTmV4dCh7IGFsdGVybmF0aXZlcywgLi4ucmVzdCB9KSkpfVxuICAgIHthbHRlcm5hdGl2ZXNbYWx0XX1cbiAgPC9kaXY+XG4pXG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QoZ2V0QWx0LCB7IG5leHQ6IG5leHRBbHQgfSkoQWx0ZXJuYXRpdmUpXG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnXG5pbXBvcnQgTG9naW4gZnJvbSAnTG9naW4uanN4J1xuaW1wb3J0IE5hdkxpbmsgZnJvbSAnTmF2TGluay5qc3gnXG5pbXBvcnQgU3RhdGljIGZyb20gJ1N0YXRpYy5qc3gnXG5pbXBvcnQgTm90aWZpY2F0aW9uIGZyb20gJ05vdGlmaWNhdGlvbi5qc3gnXG5pbXBvcnQgeyBnZXRXaW5EaW0gfSBmcm9tICd3aW4uanMnXG5cbmNvbnN0IEFwcCA9ICh7IGNoaWxkcmVuLCBoZWlnaHQsIHdpZHRoIH0pID0+IHtcbiAgY29uc3QgdGV4dCA9IGAke3dpZHRofSB4ICR7aGVpZ2h0fWBcbiAgcmV0dXJuIChcbiAgICA8ZGl2PlxuICAgICAgPE5vdGlmaWNhdGlvbiAvPlxuICAgICAgPHAgY2xhc3NOYW1lPVwibmF2IHNtYWxsIHRvcFwiID5cbiAgICAgICAgPGltZ1xuICAgICAgICAgIHNyYz1cIi9zdGF0aWMvaW1hZ2VzL2lua2luZF9sb2dvX3NtYWxsLnBuZ1wiXG4gICAgICAgICAgdGl0bGU9XCJpbmZvcm1hdGlvbiBhYm91dCB0aGlzIHNpdGVcIlxuICAgICAgICAvPlxuICAgICAgICA8TmF2TGluayB0bz1cIi9jb250cmliXCIgPnsnQ29udHJpYnV0aW9ucyd9PC9OYXZMaW5rPlxuICAgICAgICA8TmF2TGluayB0bz1cIi9iYWNrb2ZmaWNlXCIgPnsnQmFja29mZmljZSd9PC9OYXZMaW5rPlxuICAgICAgICA8U3RhdGljIC8+XG4gICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInJlc2l6ZVwiIHRpdGxlPXt0ZXh0fT57dGV4dH08L3NwYW4+XG4gICAgICAgIDxMb2dpbiAvPlxuICAgICAgPC9wPlxuICAgICAgPGRpdj57Y2hpbGRyZW59PC9kaXY+XG4gICAgPC9kaXY+XG4gIClcbn1cblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChnZXRXaW5EaW0pKEFwcClcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcblxuY29uc3QgQmFja29mZmljZSA9ICh7IHBhcmFtczogeyBmdW5jIH0gfSkgPT4ge1xuICBjb25zdCBoZWFkaW5ncyA9IHtcbiAgICB0eXBlOiAnQ29udHJpYnV0aW9uIHR5cGVzJyxcbiAgICBhc3Nlc3M6ICdBc3Nlc3NtZW50IGNyaXRlcmlhJyxcbiAgICBwYWNrYWdlOiAnQXNzZXNzbWVudCBwYWNrYWdlcycsXG4gIH1cbiAgY29uc3QgYm9kaWVzID0ge1xuICAgIHR5cGU6ICdXaWxsIGJlIGltcGxlbWVudGVkJyxcbiAgICBhc3Nlc3M6ICdXaWxsIGJlIGltcGxlbWVudGVkJyxcbiAgICBwYWNrYWdlOiAnV2lsbCBiZSBpbXBsZW1lbnRlZCcsXG4gIH1cbiAgY29uc3QgaGVhZGluZyA9IGhlYWRpbmdzW2Z1bmNdIHx8ICdObyBzdWNoIGZ1bmN0aW9uJ1xuICBjb25zdCBib2R5ID0gYm9kaWVzW2Z1bmNdIHx8ICdOb3RoaW5nIHRvIHdhaXQgZm9yJ1xuICByZXR1cm4gKFxuICAgIDxkaXY+XG4gICAgICA8aDE+e2hlYWRpbmd9PC9oMT5cbiAgICAgIDxwPntib2R5fTwvcD5cbiAgICA8L2Rpdj5cbiAgKVxufVxuXG5leHBvcnQgZGVmYXVsdCBCYWNrb2ZmaWNlXG5cblxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4J1xuaW1wb3J0IEZhY2V0IGZyb20gJ0ZhY2V0LmpzeCdcbmltcG9ydCBDaGVja2JveEkgZnJvbSAnQ2hlY2tib3hJLmpzeCdcbmltcG9ydCBTdGF0IGZyb20gJ1N0YXQuanN4J1xuaW1wb3J0IEFsdGVybmF0aXZlIGZyb20gJ0FsdGVybmF0aXZlLmpzeCdcbmltcG9ydCB7IGdldEZpZWxkVmFsdWVzLCBwbGFjZUZhY2V0cyB9IGZyb20gJ2ZpbHRlci5qcydcblxuY29uc3QgQnlWYWx1ZSA9ICh7XG4gIHRhYmxlLFxuICBmaWx0ZXJJZCwgZmlsdGVyTGFiZWwsXG4gIGZpZWxkVmFsdWVzLFxuICBmaWx0ZXJlZEFtb3VudCwgZmlsdGVyZWRBbW91bnRPdGhlcnMsXG4gIGFtb3VudHMsIG1heENvbHMsXG4gIGV4cGFuZGVkLFxufSkgPT4ge1xuICBjb25zdCByb3dzID0gcGxhY2VGYWNldHMoZmllbGRWYWx1ZXMsIG1heENvbHMpXG4gIGNvbnN0IGNvbnRyb2wxID0gaGFuZGxlciA9PiAoPHNwYW4gY2xhc3NOYW1lPVwiYnV0dG9uLXNtYWxsIGZhIGZhLWNoZXZyb24tZG93blwiIG9uQ2xpY2s9e2hhbmRsZXJ9IC8+KVxuICBjb25zdCBjb250cm9sMiA9IGhhbmRsZXIgPT4gKDxzcGFuIGNsYXNzTmFtZT1cImJ1dHRvbi1zbWFsbCBmYSBmYS1jaGV2cm9uLXJpZ2h0XCIgb25DbGljaz17aGFuZGxlcn0gLz4pXG4gIGNvbnN0IGNvbnRyb2xQbGFjZW1lbnQgPSBjb250cm9sID0+IChcbiAgICA8cCBjbGFzc05hbWU9XCJmYWNldFwiID5cbiAgICAgIDxDaGVja2JveElcbiAgICAgICAgdGFibGU9e3RhYmxlfVxuICAgICAgICBmaWx0ZXJJZD17ZmlsdGVySWR9XG4gICAgICAvPiB7ZmlsdGVyTGFiZWx9eycgJ31cbiAgICAgIDxTdGF0IHN1YlRvdGFsPXtmaWx0ZXJlZEFtb3VudH0gdG90YWw9e2ZpbHRlcmVkQW1vdW50T3RoZXJzfSAvPnsnICd9XG4gICAgICB7Y29udHJvbH1cbiAgICA8L3A+XG4gIClcbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImZhY2V0XCIgPntcbiAgICAgIHJvd3MgPT09IG51bGwgPyAoPHA+eycgLW5vIGZhY2V0cyAnfTwvcD4pIDogKFxuICAgICAgICA8QWx0ZXJuYXRpdmVcbiAgICAgICAgICB0YWc9e2Ake3RhYmxlfV8ke2ZpbHRlcklkfWB9XG4gICAgICAgICAgY29udHJvbFBsYWNlbWVudD17Y29udHJvbFBsYWNlbWVudH1cbiAgICAgICAgICBjb250cm9scz17W2NvbnRyb2wxLCBjb250cm9sMl19XG4gICAgICAgICAgaW5pdGlhbD17ZXhwYW5kZWQgPyAwIDogMX1cbiAgICAgICAgICBhbHRlcm5hdGl2ZXM9e1tcbiAgICAgICAgICAgICg8dGFibGUga2V5PVwidGFibGVcIiA+XG4gICAgICAgICAgICAgIDx0Ym9keT5cbiAgICAgICAgICAgICAgICB7cm93cy5tYXAoKGVudGl0eSwgaSkgPT4gKFxuICAgICAgICAgICAgICAgICAgPHRyIGtleT17aX0gPlxuICAgICAgICAgICAgICAgICAgICB7ZW50aXR5Lm1hcCgoZiwgaikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgIGlmIChmID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gPHRkIGtleT17an0gLz5cbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgY29uc3QgW3ZhbHVlSWQsIHZhbHVlUmVwXSA9IGZcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCBmYWNldENsYXNzID0gKGogPT0gMCkgPyBcImZhY2V0XCIgOiBcImZhY2V0IG1pZFwiXG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsoXG4gICAgICAgICAgICAgICAgICAgICAgICA8dGRcbiAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9e3ZhbHVlSWR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtmYWNldENsYXNzfVxuICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8RmFjZXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YWJsZT17dGFibGV9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVySWQ9e2ZpbHRlcklkfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlSWQ9e3ZhbHVlSWR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVSZXA9e3ZhbHVlUmVwfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICApLCAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8dGRcbiAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PVwic3RhdFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInN0YXRpc3RpY1wiXG4gICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxTdGF0IHN1YlRvdGFsPXthbW91bnRzW3ZhbHVlSWRdfSAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICApXVxuICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICAgIDwvdGFibGU+KSxcbiAgICAgICAgICAgICg8ZGl2IGtleT1cImRpdlwiIC8+KSxcbiAgICAgICAgICBdfVxuICAgICAgICAvPlxuICAgICAgKX1cbiAgICA8L2Rpdj5cbiAgKVxufVxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KGdldEZpZWxkVmFsdWVzKShCeVZhbHVlKVxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuXG5pbXBvcnQgRG9jTWQgZnJvbSAnRG9jTWQuanN4J1xuaW1wb3J0IERvY1BkZiBmcm9tICdEb2NQZGYuanN4J1xuaW1wb3J0IERvY0h0bWwgZnJvbSAnRG9jSHRtbC5qc3gnXG5pbXBvcnQgTm90Rm91bmQgZnJvbSAnTm90Rm91bmQuanN4J1xuXG5jb25zdCBkb2NUeXBlID0ge1xuICBtZDogRG9jTWQsXG4gIHBkZjogRG9jUGRmLFxuICBodG1sOiBEb2NIdG1sLFxufVxuXG5jb25zdCBEb2MgPSAoeyBsb2NhdGlvbjogeyBwYXRobmFtZTogZG9jUGF0aCB9IH0pID0+IHtcbiAgY29uc3QgW2RvY0RpciwgZG9jRmlsZV0gPSAvXiguKilcXC8oW14vXSspJC9nLmV4ZWMoZG9jUGF0aCkuc2xpY2UoMSlcbiAgY29uc3QgW2RvY05hbWUsIGRvY0V4dF0gPSAvXiguKilcXC4oW14uXSspJC9nLmV4ZWMoZG9jRmlsZSkuc2xpY2UoMSlcbiAgY29uc3QgeyBbZG9jRXh0XTogRG9jQ2xhc3MgfSA9IGRvY1R5cGVcbiAgcmV0dXJuIERvY0NsYXNzID09IG51bGwgPyAoXG4gICAgPE5vdEZvdW5kIHBhcmFtcz17e3NwbGF0OiBgZG9jdW1lbnQgJHtkb2NQYXRofWB9fSAvPlxuICApIDogKFxuICAgIDxEb2NDbGFzcyBkb2NEaXI9e2RvY0Rpcn0gZG9jTmFtZT17ZG9jTmFtZX0gZG9jRXh0PXtkb2NFeHR9IHRhZz17ZG9jTmFtZX0gLz5cbiAgKVxufVxuXG5leHBvcnQgZGVmYXVsdCBEb2NcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcblxuY29uc3QgRG9jSHRtbCA9ICh7IGRvY0RpciwgZG9jTmFtZSwgZG9jRXh0IH0pID0+IHtcbiAgY29uc3Qgc3JjID0gYC9hcGkvZmlsZSR7ZG9jRGlyfS8ke2RvY05hbWV9LiR7ZG9jRXh0fWBcbiAgcmV0dXJuIChcbiAgICA8aWZyYW1lXG4gICAgICBoZWlnaHQ9XCIxMDAlXCJcbiAgICAgIHdpZHRoPVwiMTAwJVwiXG4gICAgICBzcmM9e3NyY31cbiAgICAvPlxuICApXG59XG5cbmV4cG9ydCBkZWZhdWx0IERvY0h0bWxcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcblxuY29uc3QgRG9jUGRmID0gKHsgZG9jRGlyLCBkb2NOYW1lLCBkb2NFeHQgfSkgPT4ge1xuICBjb25zdCBocmVmID0gYC9hcGkvZmlsZSR7ZG9jRGlyfS8ke2RvY05hbWV9LiR7ZG9jRXh0fWBcbiAgY29uc3QgaU9TID0gL2lQYWR8aVBob25lfGlQb2QvLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCkgJiYgIXdpbmRvdy5NU1N0cmVhbVxuICByZXR1cm4gaU9TID8gKFxuICAgIDxwPlxuICAgICAgPGEgdGFyZ2V0PVwiX2JsYW5rXCIgcmVsPVwibm9vcGVuZXIgbm9yZWZlcnJlclwiIGhyZWY9e2hyZWZ9ID57ZG9jTmFtZX08L2E+eycgKG9wZW4gcGRmIGluIGEgbmV3IHRhYiknfVxuICAgIDwvcD5cbiAgKSA6IChcbiAgICA8b2JqZWN0XG4gICAgICBoZWlnaHQ9XCIxMDAlXCJcbiAgICAgIHdpZHRoPVwiMTAwJVwiXG4gICAgICBkYXRhPXtocmVmfVxuICAgICAgdHlwZT1cImFwcGxpY2F0aW9uL3BkZlwiXG4gICAgPlxuICAgICAgPGEgdGFyZ2V0PVwiX2JsYW5rXCIgcmVsPVwibm9vcGVuZXIgbm9yZWZlcnJlclwiIGhyZWY9e2hyZWZ9ID57ZG9jTmFtZX08L2E+eycgKG9wZW4gcGRmIGluIGEgbmV3IHRhYiknfVxuICAgIDwvb2JqZWN0PlxuICApXG59XG5cbmV4cG9ydCBkZWZhdWx0IERvY1BkZlxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4J1xuaW1wb3J0IHsgY2hhbmdlRmFjZXQsIGdldEZpbHRlclNldHRpbmcgfSBmcm9tICdmaWx0ZXIuanMnXG5cbmNvbnN0IGhhbmRsZUNoYW5nZSA9IChoYW5kbGUsIHRhYmxlLCBmaWx0ZXJJZCwgdmFsdWVJZCwgaXNPbikgPT4gKCkgPT4gaGFuZGxlKHRhYmxlLCBmaWx0ZXJJZCwgdmFsdWVJZCwgIWlzT24pXG5cbmNvbnN0IEZhY2V0ID0gKHsgdGFibGUsIGZpbHRlcklkLCB2YWx1ZUlkLCB2YWx1ZVJlcCwgZmlsdGVyU2V0dGluZywgaGFuZGxlIH0pID0+IHtcbiAgY29uc3QgeyBbdmFsdWVJZF06IGlzT24gfSA9IGZpbHRlclNldHRpbmdcbiAgcmV0dXJuIChcbiAgICA8c3Bhbj5cbiAgICAgIDxpbnB1dFxuICAgICAgICB0eXBlPVwiY2hlY2tib3hcIlxuICAgICAgICBjaGVja2VkPXtpc09ufVxuICAgICAgICBjbGFzc05hbWU9XCJmYWNldFwiXG4gICAgICAgIG9uQ2hhbmdlPXtoYW5kbGVDaGFuZ2UoaGFuZGxlLCB0YWJsZSwgZmlsdGVySWQsIHZhbHVlSWQsIGlzT24pfVxuICAgICAgLz5cbiAgICAgIHtgICR7dmFsdWVSZXB9YH1cbiAgICA8L3NwYW4+XG4gIClcbn1cblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChnZXRGaWx0ZXJTZXR0aW5nLCB7IGhhbmRsZTogY2hhbmdlRmFjZXQgfSkoRmFjZXQpXG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnXG5cbmltcG9ydCBGdWxsVGV4dCBmcm9tICdGdWxsVGV4dC5qc3gnXG5pbXBvcnQgQnlWYWx1ZSBmcm9tICdCeVZhbHVlLmpzeCdcbmltcG9ydCBFVU1hcCBmcm9tICdFVU1hcC5qc3gnXG5cbmltcG9ydCB7IGdldFRhYmxlRmlsdGVycyB9IGZyb20gJ3RhYmxlcy5qcydcblxuY29uc3QgZmlsdGVyQ2xhc3MgPSB7XG4gIEZ1bGxUZXh0LFxuICBFVU1hcCxcbiAgQnlWYWx1ZSxcbn1cblxuY29uc3QgRmlsdGVyID0gKHtcbiAgdGFibGUsIGZpZWxkcyxcbiAgZmlsdGVyTGlzdCwgZmlsdGVyZWRBbW91bnQsIGZpbHRlcmVkQW1vdW50T3RoZXJzLCBhbW91bnRzLFxufSkgPT4gKFxuICA8ZGl2PlxuICAgIHtmaWx0ZXJMaXN0LmZpbHRlcih4ID0+IGZpZWxkc1t4LmZpZWxkXSkubWFwKChmaWx0ZXIsIGZpbHRlcklkKSA9PiB7XG4gICAgICBjb25zdCB7IHR5cGUgfSA9IGZpbHRlclxuICAgICAgY29uc3QgeyBbdHlwZV06IEZjbGFzcyB9ID0gZmlsdGVyQ2xhc3NcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxGY2xhc3NcbiAgICAgICAgICBrZXk9e2ZpbHRlcklkfVxuICAgICAgICAgIHRhYmxlPXt0YWJsZX1cbiAgICAgICAgICBmaWx0ZXJJZD17ZmlsdGVySWR9XG4gICAgICAgICAgZmlsdGVyRmllbGQ9e2ZpbHRlci5maWVsZH1cbiAgICAgICAgICBmaWx0ZXJMYWJlbD17ZmlsdGVyLmxhYmVsfVxuICAgICAgICAgIG1heENvbHM9e2ZpbHRlci5tYXhDb2xzfVxuICAgICAgICAgIGZpbHRlcmVkQW1vdW50PXtmaWx0ZXJlZEFtb3VudH1cbiAgICAgICAgICBmaWx0ZXJlZEFtb3VudE90aGVycz17ZmlsdGVyZWRBbW91bnRPdGhlcnNbZmlsdGVySWRdfVxuICAgICAgICAgIGFtb3VudHM9e2Ftb3VudHNbZmlsdGVySWRdfVxuICAgICAgICAgIGV4cGFuZGVkPXtmaWx0ZXIuZXhwYW5kZWR9XG4gICAgICAgIC8+XG4gICAgICApfVxuICAgICl9XG4gIDwvZGl2PlxuKVxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KGdldFRhYmxlRmlsdGVycykoRmlsdGVyKVxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4J1xuaW1wb3J0IFN0YXQgZnJvbSAnU3RhdC5qc3gnXG5pbXBvcnQgeyBjaGFuZ2VGdWxsdGV4dCwgZ2V0RmlsdGVyU2V0dGluZyB9IGZyb20gJ2ZpbHRlci5qcydcblxuY29uc3QgaGFuZGxlQ2hhbmdlID0gKGhhbmRsZSwgdGFibGUsIGZpbHRlcklkKSA9PiBldmVudCA9PiBoYW5kbGUodGFibGUsIGZpbHRlcklkLCBldmVudC50YXJnZXQudmFsdWUpXG5cbmNvbnN0IEZ1bGxUZXh0ID0gKHtcbiAgdGFibGUsXG4gIGZpbHRlcklkLCBmaWx0ZXJGaWVsZCwgZmlsdGVyTGFiZWwsXG4gIGZpbHRlclNldHRpbmcsXG4gIGZpbHRlcmVkQW1vdW50LCBmaWx0ZXJlZEFtb3VudE90aGVycyxcbiAgaGFuZGxlLFxufSkgPT4gKFxuICA8ZGl2PlxuICAgIDxwIHRpdGxlPXtgU2VhcmNoIGluICR7ZmlsdGVyRmllbGR9YH0gPlxuICAgICAgPGlucHV0XG4gICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgY2xhc3NOYW1lPVwic2VhcmNoXCJcbiAgICAgICAgcGxhY2Vob2xkZXI9e2BzZWFyY2ggaW4gJHtmaWx0ZXJMYWJlbH1gfVxuICAgICAgICB2YWx1ZT17ZmlsdGVyU2V0dGluZ31cbiAgICAgICAgb25DaGFuZ2U9e2hhbmRsZUNoYW5nZShoYW5kbGUsIHRhYmxlLCBmaWx0ZXJJZCl9XG4gICAgICAvPnsnICd9XG4gICAgICA8U3RhdCBzdWJUb3RhbD17ZmlsdGVyZWRBbW91bnR9IHRvdGFsPXtmaWx0ZXJlZEFtb3VudE90aGVyc30gLz5cbiAgICA8L3A+XG4gIDwvZGl2PlxuKVxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KGdldEZpbHRlclNldHRpbmcsIHsgaGFuZGxlOiBjaGFuZ2VGdWxsdGV4dCB9KShGdWxsVGV4dClcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCdcbmltcG9ydCB7IGdldFRhYmxlcywgcmVwciB9IGZyb20gJ3RhYmxlcy5qcydcblxuY29uc3QgdHJpbURhdGUgPSB0ZXh0ID0+ICgodGV4dCA9PSBudWxsKSA/ICcnIDogdGV4dC5yZXBsYWNlKC9cXC5bMC05XSsvLCAnJykpXG5cbmNvbnN0IHZhbHVlQXNTdHJpbmcgPSAodGFibGVzLCB0YWJsZSwgdmFsVHlwZSwgdmFsdWUpID0+IHtcbiAgaWYgKHZhbHVlID09IG51bGwpIHtyZXR1cm4gJyd9XG4gIGlmICh0eXBlb2YgdmFsVHlwZSA9PSAnc3RyaW5nJykge1xuICAgIHN3aXRjaCAodmFsVHlwZSkge1xuICAgICAgY2FzZSAnZGF0ZXRpbWUnOiByZXR1cm4gdHJpbURhdGUodmFsdWUpXG4gICAgICBkZWZhdWx0OiByZXR1cm4gdmFsdWVcbiAgICB9XG4gIH1cbiAgZWxzZSB7XG4gICAgY29uc3QgeyB2YWx1ZXM6IHJlbCB9ID0gdmFsVHlwZVxuICAgIHJldHVybiByZXByKHRhYmxlcywgcmVsLCB2YWx1ZSlcbiAgfVxufVxuXG5jb25zdCBJdGVtRmllbGQgPSAoeyB0YWJsZXMsIHRhYmxlLCBsYWJlbCwgdmFsdWVzLCB2YWxUeXBlLCBtdWx0aXBsZSB9KSA9PiB7XG4gIGNvbnN0IHRoZVZhbHVlcyA9IG11bHRpcGxlID8gdmFsdWVzIDogW3ZhbHVlc11cbiAgcmV0dXJuIChcbiAgICA8cD5cbiAgICAgIDxsYWJlbD48Yj57YCR7bGFiZWx9OmB9PC9iPjwvbGFiZWw+eycgJ31cbiAgICAgIHtcbiAgICAgICAgdGhlVmFsdWVzLm1hcCgodmFsdWUsIGkpID0+IChcbiAgICAgICAgICA8c3BhbiBrZXk9e2l9PnsoaSAhPSAwKSA/ICcgfCAnIDogJyd9PHNwYW4+e3ZhbHVlQXNTdHJpbmcodGFibGVzLCB0YWJsZSwgdmFsVHlwZSwgdmFsdWUpfTwvc3Bhbj48L3NwYW4+XG4gICAgICAgICkpXG4gICAgICB9XG4gICAgPC9wPlxuICApXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QoZ2V0VGFibGVzKShJdGVtRmllbGQpXG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgQWx0ZXJuYXRpdmUgZnJvbSAnQWx0ZXJuYXRpdmUuanN4J1xuaW1wb3J0IEl0ZW1SZWNvcmQgZnJvbSAnSXRlbVJlY29yZC5qc3gnXG5pbXBvcnQgTmF2TGluayBmcm9tICdOYXZMaW5rLmpzeCdcblxuY29uc3QgSXRlbUhlYWQgPSAoeyB0YWJsZSwgdmFsdWVzLCB0aXRsZSwgaW5wbGFjZSB9KSA9PiB7XG4gIGNvbnN0IHsgX2lkOiBlSWQsIFt0aXRsZV06IGVudGl0eUhlYWQgPSAnLWVtcHR5LScgfSA9IHZhbHVlc1xuXG4gIGNvbnN0IGNvbnRyb2wxID0gaGFuZGxlciA9PiAoPHNwYW4gY2xhc3NOYW1lPVwiYnV0dG9uLXNtYWxsIGZhIGZhLWNoZXZyb24tZG93blwiIG9uQ2xpY2s9e2hhbmRsZXJ9IC8+KVxuICBjb25zdCBjb250cm9sMiA9IGhhbmRsZXIgPT4gKDxzcGFuIGNsYXNzTmFtZT1cImJ1dHRvbi1zbWFsbCBmYSBmYS1jaGV2cm9uLXJpZ2h0XCIgb25DbGljaz17aGFuZGxlcn0gLz4pXG4gIGNvbnN0IGNvbnRyb2xQbGFjZW1lbnQgPSBjb250cm9sID0+IChcbiAgICA8cD5cbiAgICAgIHtjb250cm9sfVxuICAgICAgPHNwYW4+XG4gICAgICAgIHtlbnRpdHlIZWFkfVxuICAgICAgPC9zcGFuPlxuICAgIDwvcD5cbiAgKVxuXG4gIHJldHVybiAoXG4gICAgPHRyIGlkPXtlSWR9ID5cbiAgICAgIDx0ZD57XG4gICAgICAgIGlucGxhY2UgPyAoXG4gICAgICAgICAgPEFsdGVybmF0aXZlXG4gICAgICAgICAgICB0YWc9e2Ake3RhYmxlfV8ke2VJZH1gfVxuICAgICAgICAgICAgY29udHJvbFBsYWNlbWVudD17Y29udHJvbFBsYWNlbWVudH1cbiAgICAgICAgICAgIGNvbnRyb2xzPXtbY29udHJvbDEsIGNvbnRyb2wyXX1cbiAgICAgICAgICAgIGFsdGVybmF0aXZlcz17WyhcbiAgICAgICAgICAgICAgPEl0ZW1SZWNvcmRcbiAgICAgICAgICAgICAgICBrZXk9XCJzaG93XCJcbiAgICAgICAgICAgICAgICB0YWJsZT17dGFibGV9XG4gICAgICAgICAgICAgICAgZUlkPXtlSWR9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICApLCAnJ119XG4gICAgICAgICAgICBpbml0aWFsPXsxfVxuICAgICAgICAgIC8+XG4gICAgICAgICkgOiAoXG4gICAgICAgICAgPE5hdkxpbmsgY2xhc3NOYW1lPVwibmF2XCIgdG89e2AvJHt0YWJsZX0vbXlsaXN0LyR7ZUlkfWB9ID5cbiAgICAgICAgICAgIDxzcGFuPntlbnRpdHlIZWFkfTwvc3Bhbj5cbiAgICAgICAgICA8L05hdkxpbms+XG4gICAgICAgIClcbiAgICAgIH1cbiAgICAgIDwvdGQ+XG4gICAgPC90cj5cbiAgKVxufVxuXG5leHBvcnQgZGVmYXVsdCBJdGVtSGVhZFxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4J1xuaW1wb3J0IEl0ZW1IZWFkIGZyb20gJ0l0ZW1IZWFkLmpzeCdcbmltcG9ydCB7IGdldFRhYmxlcyB9IGZyb20gJ3RhYmxlcy5qcydcblxuY29uc3QgSXRlbUxpc3QgPSAoeyB0YWJsZXMsIHRhYmxlLCB0aXRsZSwgZmlsdGVyZWREYXRhLCBpbnBsYWNlIH0pID0+IHtcbiAgY29uc3QgeyBbdGFibGVdOiB7IGVudGl0aWVzIH0gfSA9IHRhYmxlc1xuICByZXR1cm4gKFxuICAgIDxkaXY+XG4gICAgICA8dGFibGU+XG4gICAgICAgIDx0Ym9keT57XG4gICAgICAgIGZpbHRlcmVkRGF0YS5tYXAoZUlkID0+IHtcbiAgICAgICAgICBjb25zdCB7IFtlSWRdOiB7IHZhbHVlcyB9IH0gPSBlbnRpdGllc1xuICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8SXRlbUhlYWQga2V5PXtlSWR9IHRhYmxlPXt0YWJsZX0gdGl0bGU9e3RpdGxlfSB2YWx1ZXM9e3ZhbHVlc30gaW5wbGFjZT17aW5wbGFjZX0gLz5cbiAgICAgICAgICApXG4gICAgICAgIH0pXG4gICAgICAgIH08L3Rib2R5PlxuICAgICAgPC90YWJsZT5cbiAgICA8L2Rpdj5cbiAgKVxufVxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KGdldFRhYmxlcykoSXRlbUxpc3QpXG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5cbmltcG9ydCBJdGVtUmVjb3JkIGZyb20gJ0l0ZW1SZWNvcmQuanN4J1xuXG5jb25zdCBJdGVtUmVjb3JkUHJlID0gKHsgcGFyYW1zOiB7IHRhYmxlLCBlSWQgfSwgcm91dGU6IHsgb3duT25seSB9IH0pID0+IChcbiAgPEl0ZW1SZWNvcmQgdGFibGU9e3RhYmxlfSBlSWQ9e2VJZH0gb3duT25seT17b3duT25seX0gLz5cbilcblxuZXhwb3J0IGRlZmF1bHQgSXRlbVJlY29yZFByZVxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgTGluayB9IGZyb20gJ3JlYWN0LXJvdXRlcidcblxuY29uc3QgTmF2TGluayA9IHByb3BzID0+IDxMaW5rIHsuLi5wcm9wc30gYWN0aXZlQ2xhc3NOYW1lPVwiYWN0aXZlXCIgLz5cblxuZXhwb3J0IGRlZmF1bHQgTmF2TGlua1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuXG5jb25zdCBOb3RGb3VuZCA9ICh7cGFyYW1zOiB7IHNwbGF0IH0gfSkgPT4gKDxoMT57JzQwNDogJ308Y29kZT57c3BsYXR9PC9jb2RlPnsnIG5vdCBmb3VuZCBvbiB0aGlzIHNpdGUuJ308L2gxPilcblxuZXhwb3J0IGRlZmF1bHQgTm90Rm91bmRcblxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4J1xuaW1wb3J0IHsgZ2V0V2luRGltLCBjb2x1bW5TdHlsZSB9IGZyb20gJ3dpbi5qcydcblxuY29uc3QgUGFuZSA9ICh7IGZvcm1hdCwgcG9zaXRpb24sIGNoaWxkcmVuLCBoZWlnaHQsIHdpZHRoIH0pID0+IChcbiAgPGRpdlxuICAgIGNsYXNzTmFtZT17Zm9ybWF0fVxuICAgIHN0eWxlPXtjb2x1bW5TdHlsZShwb3NpdGlvbiwgeyBoZWlnaHQsIHdpZHRoIH0pfVxuICA+XG4gICAge2NoaWxkcmVufVxuICA8L2Rpdj5cbilcblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChnZXRXaW5EaW0pKFBhbmUpXG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBQcm92aWRlciB9IGZyb20gJ3JlYWN0LXJlZHV4J1xuXG5pbXBvcnQgV2luZG93IGZyb20gJ1dpbmRvdy5qc3gnXG5cbmNvbnN0IFJvb3QgPSAoeyBzdG9yZSwgY2hpbGRyZW4gfSkgPT4gKFxuICA8UHJvdmlkZXIgc3RvcmU9e3N0b3JlfT5cbiAgICA8V2luZG93PlxuICAgICAge2NoaWxkcmVufVxuICAgIDwvV2luZG93PlxuICA8L1Byb3ZpZGVyPlxuKVxuXG5leHBvcnQgZGVmYXVsdCBSb290XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5cbmNvbnN0IFN0YXQgPSAoe3N1YlRvdGFsLCB0b3RhbH0pID0+IChcbiAgPHNwYW4gY2xhc3NOYW1lPVwiZ29vZC1vXCIgPlxuICAgIHtzdWJUb3RhbCA9PSBudWxsID8gJycgOiBgJHtzdWJUb3RhbH1gfVxuICAgIHsodG90YWwgPT0gbnVsbCB8fCBzdWJUb3RhbCA9PSBudWxsKSA/ICcnIDogJyBvZiAnfVxuICAgIDxzdHJvbmc+e3RvdGFsID09IG51bGwgPyAnJyA6IGAke3RvdGFsfWB9PC9zdHJvbmc+XG4gIDwvc3Bhbj5cbilcblxuZXhwb3J0IGRlZmF1bHQgU3RhdFxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IE5hdkxpbmsgZnJvbSAnTmF2TGluay5qc3gnXG5cbmNvbnN0IFN0YXRpYyA9ICgpID0+IChcbiAgPHNwYW4gY2xhc3NOYW1lPVwic21hbGxcIiA+XG4gICAgPE5hdkxpbmsgdG89XCIvZG9jcy9hYm91dC5tZFwiID57J0Fib3V0J308L05hdkxpbms+XG4gICAgPE5hdkxpbmsgdG89XCIvdGVjaC9kb2NzL2Rlc2lnbi5wZGZcIiA+eydkaWFncmFtcyd9PC9OYXZMaW5rPlxuICAgIDxOYXZMaW5rIHRvPVwiL3RlY2gvZG9jcy9kZXBsb3kubWRcIiA+eydkZXBsb3knfTwvTmF2TGluaz5cbiAgICA8YSBocmVmPVwiL2FwaS9maWxlL3RlY2gvZG9jcy9nZW4vaW5kZXguaHRtbFwiIHRhcmdldD1cIl9ibGFua1wiIHJlbD1cIm5vb3BlbmVyIG5vcmVmZXJyZXJcIiA+eyd0ZWNoIGRvYyd9PC9hPlxuICA8L3NwYW4+XG4pXG5cbmV4cG9ydCBkZWZhdWx0IFN0YXRpY1xuXG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnXG5pbXBvcnQgTmF2TGluayBmcm9tICdOYXZMaW5rLmpzeCdcbmltcG9ydCBQYW5lIGZyb20gJ1BhbmUuanN4J1xuaW1wb3J0IHsgZ2V0V2luRGltIH0gZnJvbSAnd2luLmpzJ1xuXG5jb25zdCBTdWJBcHAgPSAoe3BhcmFtczogeyB0YWJsZSB9LCBjaGlsZHJlbiB9KSA9PiAoXG4gIDxkaXY+XG4gICAgPFBhbmUgZm9ybWF0PVwibmF2IHNpemVkXCIgcG9zaXRpb249XCJsZWZ0XCI+XG4gICAgICB7KHRhYmxlID09ICdjb250cmliJykgPyAoXG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPHA+PE5hdkxpbmsgdG89e2AvJHt0YWJsZX0vbGlzdGB9ID57J0FsbCBpdGVtcyd9PC9OYXZMaW5rPjwvcD5cbiAgICAgICAgICA8cD48TmF2TGluayB0bz17YC8ke3RhYmxlfS9teWxpc3RgfSA+eydNeSB3b3JrJ308L05hdkxpbms+PC9wPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICkgOiAoXG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPHA+PE5hdkxpbmsgdG89e2AvJHt0YWJsZX0vdHlwZWB9ID57J1R5cGVzJ308L05hdkxpbms+PC9wPlxuICAgICAgICAgIDxwPjxOYXZMaW5rIHRvPXtgLyR7dGFibGV9L2Fzc2Vzc2B9ID57J0NyaXRlcmlhJ308L05hdkxpbms+PC9wPlxuICAgICAgICAgIDxwPjxOYXZMaW5rIHRvPXtgLyR7dGFibGV9L3BhY2thZ2VgfSA+eydQYWNrYWdlcyd9PC9OYXZMaW5rPjwvcD5cbiAgICAgICAgPC9kaXY+XG4gICAgICApfVxuICAgIDwvUGFuZT5cbiAgICA8UGFuZSBmb3JtYXQ9XCJzaXplZFwiIHBvc2l0aW9uPVwicmlnaHRcIj5cbiAgICAgIHsgY2hpbGRyZW4gfVxuICAgIDwvUGFuZT5cbiAgPC9kaXY+XG4pXG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QoZ2V0V2luRGltKShTdWJBcHApXG4iXX0=
