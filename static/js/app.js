(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/array/from"), __esModule: true };
},{"core-js/library/fn/array/from":23}],2:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/get-iterator"), __esModule: true };
},{"core-js/library/fn/get-iterator":24}],3:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/is-iterable"), __esModule: true };
},{"core-js/library/fn/is-iterable":25}],4:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/assign"), __esModule: true };
},{"core-js/library/fn/object/assign":26}],5:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/create"), __esModule: true };
},{"core-js/library/fn/object/create":27}],6:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/define-property"), __esModule: true };
},{"core-js/library/fn/object/define-property":28}],7:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/entries"), __esModule: true };
},{"core-js/library/fn/object/entries":29}],8:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/get-prototype-of"), __esModule: true };
},{"core-js/library/fn/object/get-prototype-of":30}],9:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/keys"), __esModule: true };
},{"core-js/library/fn/object/keys":31}],10:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/object/set-prototype-of"), __esModule: true };
},{"core-js/library/fn/object/set-prototype-of":32}],11:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/symbol"), __esModule: true };
},{"core-js/library/fn/symbol":33}],12:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/symbol/iterator"), __esModule: true };
},{"core-js/library/fn/symbol/iterator":34}],13:[function(require,module,exports){
"use strict";

exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};
},{}],14:[function(require,module,exports){
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
},{"../core-js/object/define-property":6}],15:[function(require,module,exports){
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
},{"../core-js/object/define-property":6}],16:[function(require,module,exports){
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
},{"../core-js/object/assign":4}],17:[function(require,module,exports){
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
},{"../core-js/object/create":5,"../core-js/object/set-prototype-of":10,"../helpers/typeof":22}],18:[function(require,module,exports){
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
},{}],19:[function(require,module,exports){
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
},{"../helpers/typeof":22}],20:[function(require,module,exports){
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
},{"../core-js/get-iterator":2,"../core-js/is-iterable":3}],21:[function(require,module,exports){
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
},{"../core-js/array/from":1}],22:[function(require,module,exports){
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
},{"../core-js/symbol":11,"../core-js/symbol/iterator":12}],23:[function(require,module,exports){
require('../../modules/es6.string.iterator');
require('../../modules/es6.array.from');
module.exports = require('../../modules/_core').Array.from;
},{"../../modules/_core":41,"../../modules/es6.array.from":103,"../../modules/es6.string.iterator":112}],24:[function(require,module,exports){
require('../modules/web.dom.iterable');
require('../modules/es6.string.iterator');
module.exports = require('../modules/core.get-iterator');
},{"../modules/core.get-iterator":101,"../modules/es6.string.iterator":112,"../modules/web.dom.iterable":117}],25:[function(require,module,exports){
require('../modules/web.dom.iterable');
require('../modules/es6.string.iterator');
module.exports = require('../modules/core.is-iterable');
},{"../modules/core.is-iterable":102,"../modules/es6.string.iterator":112,"../modules/web.dom.iterable":117}],26:[function(require,module,exports){
require('../../modules/es6.object.assign');
module.exports = require('../../modules/_core').Object.assign;
},{"../../modules/_core":41,"../../modules/es6.object.assign":105}],27:[function(require,module,exports){
require('../../modules/es6.object.create');
var $Object = require('../../modules/_core').Object;
module.exports = function create(P, D){
  return $Object.create(P, D);
};
},{"../../modules/_core":41,"../../modules/es6.object.create":106}],28:[function(require,module,exports){
require('../../modules/es6.object.define-property');
var $Object = require('../../modules/_core').Object;
module.exports = function defineProperty(it, key, desc){
  return $Object.defineProperty(it, key, desc);
};
},{"../../modules/_core":41,"../../modules/es6.object.define-property":107}],29:[function(require,module,exports){
require('../../modules/es7.object.entries');
module.exports = require('../../modules/_core').Object.entries;
},{"../../modules/_core":41,"../../modules/es7.object.entries":114}],30:[function(require,module,exports){
require('../../modules/es6.object.get-prototype-of');
module.exports = require('../../modules/_core').Object.getPrototypeOf;
},{"../../modules/_core":41,"../../modules/es6.object.get-prototype-of":108}],31:[function(require,module,exports){
require('../../modules/es6.object.keys');
module.exports = require('../../modules/_core').Object.keys;
},{"../../modules/_core":41,"../../modules/es6.object.keys":109}],32:[function(require,module,exports){
require('../../modules/es6.object.set-prototype-of');
module.exports = require('../../modules/_core').Object.setPrototypeOf;
},{"../../modules/_core":41,"../../modules/es6.object.set-prototype-of":110}],33:[function(require,module,exports){
require('../../modules/es6.symbol');
require('../../modules/es6.object.to-string');
require('../../modules/es7.symbol.async-iterator');
require('../../modules/es7.symbol.observable');
module.exports = require('../../modules/_core').Symbol;
},{"../../modules/_core":41,"../../modules/es6.object.to-string":111,"../../modules/es6.symbol":113,"../../modules/es7.symbol.async-iterator":115,"../../modules/es7.symbol.observable":116}],34:[function(require,module,exports){
require('../../modules/es6.string.iterator');
require('../../modules/web.dom.iterable');
module.exports = require('../../modules/_wks-ext').f('iterator');
},{"../../modules/_wks-ext":98,"../../modules/es6.string.iterator":112,"../../modules/web.dom.iterable":117}],35:[function(require,module,exports){
module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};
},{}],36:[function(require,module,exports){
module.exports = function(){ /* empty */ };
},{}],37:[function(require,module,exports){
var isObject = require('./_is-object');
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};
},{"./_is-object":59}],38:[function(require,module,exports){
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
},{"./_to-index":90,"./_to-iobject":92,"./_to-length":93}],39:[function(require,module,exports){
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
},{"./_cof":40,"./_wks":99}],40:[function(require,module,exports){
var toString = {}.toString;

module.exports = function(it){
  return toString.call(it).slice(8, -1);
};
},{}],41:[function(require,module,exports){
var core = module.exports = {version: '2.4.0'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef
},{}],42:[function(require,module,exports){
'use strict';
var $defineProperty = require('./_object-dp')
  , createDesc      = require('./_property-desc');

module.exports = function(object, index, value){
  if(index in object)$defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};
},{"./_object-dp":71,"./_property-desc":83}],43:[function(require,module,exports){
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
},{"./_a-function":35}],44:[function(require,module,exports){
// 7.2.1 RequireObjectCoercible(argument)
module.exports = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};
},{}],45:[function(require,module,exports){
// Thank's IE8 for his funny defineProperty
module.exports = !require('./_fails')(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});
},{"./_fails":50}],46:[function(require,module,exports){
var isObject = require('./_is-object')
  , document = require('./_global').document
  // in old IE typeof document.createElement is 'object'
  , is = isObject(document) && isObject(document.createElement);
module.exports = function(it){
  return is ? document.createElement(it) : {};
};
},{"./_global":51,"./_is-object":59}],47:[function(require,module,exports){
// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');
},{}],48:[function(require,module,exports){
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
},{"./_object-gops":76,"./_object-keys":79,"./_object-pie":80}],49:[function(require,module,exports){
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
},{"./_core":41,"./_ctx":43,"./_global":51,"./_hide":53}],50:[function(require,module,exports){
module.exports = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};
},{}],51:[function(require,module,exports){
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef
},{}],52:[function(require,module,exports){
var hasOwnProperty = {}.hasOwnProperty;
module.exports = function(it, key){
  return hasOwnProperty.call(it, key);
};
},{}],53:[function(require,module,exports){
var dP         = require('./_object-dp')
  , createDesc = require('./_property-desc');
module.exports = require('./_descriptors') ? function(object, key, value){
  return dP.f(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};
},{"./_descriptors":45,"./_object-dp":71,"./_property-desc":83}],54:[function(require,module,exports){
module.exports = require('./_global').document && document.documentElement;
},{"./_global":51}],55:[function(require,module,exports){
module.exports = !require('./_descriptors') && !require('./_fails')(function(){
  return Object.defineProperty(require('./_dom-create')('div'), 'a', {get: function(){ return 7; }}).a != 7;
});
},{"./_descriptors":45,"./_dom-create":46,"./_fails":50}],56:[function(require,module,exports){
// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = require('./_cof');
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return cof(it) == 'String' ? it.split('') : Object(it);
};
},{"./_cof":40}],57:[function(require,module,exports){
// check on default Array iterator
var Iterators  = require('./_iterators')
  , ITERATOR   = require('./_wks')('iterator')
  , ArrayProto = Array.prototype;

module.exports = function(it){
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};
},{"./_iterators":65,"./_wks":99}],58:[function(require,module,exports){
// 7.2.2 IsArray(argument)
var cof = require('./_cof');
module.exports = Array.isArray || function isArray(arg){
  return cof(arg) == 'Array';
};
},{"./_cof":40}],59:[function(require,module,exports){
module.exports = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};
},{}],60:[function(require,module,exports){
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
},{"./_an-object":37}],61:[function(require,module,exports){
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
},{"./_hide":53,"./_object-create":70,"./_property-desc":83,"./_set-to-string-tag":86,"./_wks":99}],62:[function(require,module,exports){
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
},{"./_export":49,"./_has":52,"./_hide":53,"./_iter-create":61,"./_iterators":65,"./_library":67,"./_object-gpo":77,"./_redefine":84,"./_set-to-string-tag":86,"./_wks":99}],63:[function(require,module,exports){
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
},{"./_wks":99}],64:[function(require,module,exports){
module.exports = function(done, value){
  return {value: value, done: !!done};
};
},{}],65:[function(require,module,exports){
module.exports = {};
},{}],66:[function(require,module,exports){
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
},{"./_object-keys":79,"./_to-iobject":92}],67:[function(require,module,exports){
module.exports = true;
},{}],68:[function(require,module,exports){
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
},{"./_fails":50,"./_has":52,"./_is-object":59,"./_object-dp":71,"./_uid":96}],69:[function(require,module,exports){
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
},{"./_fails":50,"./_iobject":56,"./_object-gops":76,"./_object-keys":79,"./_object-pie":80,"./_to-object":94}],70:[function(require,module,exports){
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

},{"./_an-object":37,"./_dom-create":46,"./_enum-bug-keys":47,"./_html":54,"./_object-dps":72,"./_shared-key":87}],71:[function(require,module,exports){
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
},{"./_an-object":37,"./_descriptors":45,"./_ie8-dom-define":55,"./_to-primitive":95}],72:[function(require,module,exports){
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
},{"./_an-object":37,"./_descriptors":45,"./_object-dp":71,"./_object-keys":79}],73:[function(require,module,exports){
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
},{"./_descriptors":45,"./_has":52,"./_ie8-dom-define":55,"./_object-pie":80,"./_property-desc":83,"./_to-iobject":92,"./_to-primitive":95}],74:[function(require,module,exports){
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

},{"./_object-gopn":75,"./_to-iobject":92}],75:[function(require,module,exports){
// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys      = require('./_object-keys-internal')
  , hiddenKeys = require('./_enum-bug-keys').concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
  return $keys(O, hiddenKeys);
};
},{"./_enum-bug-keys":47,"./_object-keys-internal":78}],76:[function(require,module,exports){
exports.f = Object.getOwnPropertySymbols;
},{}],77:[function(require,module,exports){
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
},{"./_has":52,"./_shared-key":87,"./_to-object":94}],78:[function(require,module,exports){
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
},{"./_array-includes":38,"./_has":52,"./_shared-key":87,"./_to-iobject":92}],79:[function(require,module,exports){
// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys       = require('./_object-keys-internal')
  , enumBugKeys = require('./_enum-bug-keys');

module.exports = Object.keys || function keys(O){
  return $keys(O, enumBugKeys);
};
},{"./_enum-bug-keys":47,"./_object-keys-internal":78}],80:[function(require,module,exports){
exports.f = {}.propertyIsEnumerable;
},{}],81:[function(require,module,exports){
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
},{"./_core":41,"./_export":49,"./_fails":50}],82:[function(require,module,exports){
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
},{"./_object-keys":79,"./_object-pie":80,"./_to-iobject":92}],83:[function(require,module,exports){
module.exports = function(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
};
},{}],84:[function(require,module,exports){
module.exports = require('./_hide');
},{"./_hide":53}],85:[function(require,module,exports){
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
},{"./_an-object":37,"./_ctx":43,"./_is-object":59,"./_object-gopd":73}],86:[function(require,module,exports){
var def = require('./_object-dp').f
  , has = require('./_has')
  , TAG = require('./_wks')('toStringTag');

module.exports = function(it, tag, stat){
  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
};
},{"./_has":52,"./_object-dp":71,"./_wks":99}],87:[function(require,module,exports){
var shared = require('./_shared')('keys')
  , uid    = require('./_uid');
module.exports = function(key){
  return shared[key] || (shared[key] = uid(key));
};
},{"./_shared":88,"./_uid":96}],88:[function(require,module,exports){
var global = require('./_global')
  , SHARED = '__core-js_shared__'
  , store  = global[SHARED] || (global[SHARED] = {});
module.exports = function(key){
  return store[key] || (store[key] = {});
};
},{"./_global":51}],89:[function(require,module,exports){
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
},{"./_defined":44,"./_to-integer":91}],90:[function(require,module,exports){
var toInteger = require('./_to-integer')
  , max       = Math.max
  , min       = Math.min;
module.exports = function(index, length){
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};
},{"./_to-integer":91}],91:[function(require,module,exports){
// 7.1.4 ToInteger
var ceil  = Math.ceil
  , floor = Math.floor;
module.exports = function(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};
},{}],92:[function(require,module,exports){
// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = require('./_iobject')
  , defined = require('./_defined');
module.exports = function(it){
  return IObject(defined(it));
};
},{"./_defined":44,"./_iobject":56}],93:[function(require,module,exports){
// 7.1.15 ToLength
var toInteger = require('./_to-integer')
  , min       = Math.min;
module.exports = function(it){
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};
},{"./_to-integer":91}],94:[function(require,module,exports){
// 7.1.13 ToObject(argument)
var defined = require('./_defined');
module.exports = function(it){
  return Object(defined(it));
};
},{"./_defined":44}],95:[function(require,module,exports){
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
},{"./_is-object":59}],96:[function(require,module,exports){
var id = 0
  , px = Math.random();
module.exports = function(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};
},{}],97:[function(require,module,exports){
var global         = require('./_global')
  , core           = require('./_core')
  , LIBRARY        = require('./_library')
  , wksExt         = require('./_wks-ext')
  , defineProperty = require('./_object-dp').f;
module.exports = function(name){
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
};
},{"./_core":41,"./_global":51,"./_library":67,"./_object-dp":71,"./_wks-ext":98}],98:[function(require,module,exports){
exports.f = require('./_wks');
},{"./_wks":99}],99:[function(require,module,exports){
var store      = require('./_shared')('wks')
  , uid        = require('./_uid')
  , Symbol     = require('./_global').Symbol
  , USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function(name){
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;
},{"./_global":51,"./_shared":88,"./_uid":96}],100:[function(require,module,exports){
var classof   = require('./_classof')
  , ITERATOR  = require('./_wks')('iterator')
  , Iterators = require('./_iterators');
module.exports = require('./_core').getIteratorMethod = function(it){
  if(it != undefined)return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};
},{"./_classof":39,"./_core":41,"./_iterators":65,"./_wks":99}],101:[function(require,module,exports){
var anObject = require('./_an-object')
  , get      = require('./core.get-iterator-method');
module.exports = require('./_core').getIterator = function(it){
  var iterFn = get(it);
  if(typeof iterFn != 'function')throw TypeError(it + ' is not iterable!');
  return anObject(iterFn.call(it));
};
},{"./_an-object":37,"./_core":41,"./core.get-iterator-method":100}],102:[function(require,module,exports){
var classof   = require('./_classof')
  , ITERATOR  = require('./_wks')('iterator')
  , Iterators = require('./_iterators');
module.exports = require('./_core').isIterable = function(it){
  var O = Object(it);
  return O[ITERATOR] !== undefined
    || '@@iterator' in O
    || Iterators.hasOwnProperty(classof(O));
};
},{"./_classof":39,"./_core":41,"./_iterators":65,"./_wks":99}],103:[function(require,module,exports){
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

},{"./_create-property":42,"./_ctx":43,"./_export":49,"./_is-array-iter":57,"./_iter-call":60,"./_iter-detect":63,"./_to-length":93,"./_to-object":94,"./core.get-iterator-method":100}],104:[function(require,module,exports){
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
},{"./_add-to-unscopables":36,"./_iter-define":62,"./_iter-step":64,"./_iterators":65,"./_to-iobject":92}],105:[function(require,module,exports){
// 19.1.3.1 Object.assign(target, source)
var $export = require('./_export');

$export($export.S + $export.F, 'Object', {assign: require('./_object-assign')});
},{"./_export":49,"./_object-assign":69}],106:[function(require,module,exports){
var $export = require('./_export')
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', {create: require('./_object-create')});
},{"./_export":49,"./_object-create":70}],107:[function(require,module,exports){
var $export = require('./_export');
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !require('./_descriptors'), 'Object', {defineProperty: require('./_object-dp').f});
},{"./_descriptors":45,"./_export":49,"./_object-dp":71}],108:[function(require,module,exports){
// 19.1.2.9 Object.getPrototypeOf(O)
var toObject        = require('./_to-object')
  , $getPrototypeOf = require('./_object-gpo');

require('./_object-sap')('getPrototypeOf', function(){
  return function getPrototypeOf(it){
    return $getPrototypeOf(toObject(it));
  };
});
},{"./_object-gpo":77,"./_object-sap":81,"./_to-object":94}],109:[function(require,module,exports){
// 19.1.2.14 Object.keys(O)
var toObject = require('./_to-object')
  , $keys    = require('./_object-keys');

require('./_object-sap')('keys', function(){
  return function keys(it){
    return $keys(toObject(it));
  };
});
},{"./_object-keys":79,"./_object-sap":81,"./_to-object":94}],110:[function(require,module,exports){
// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = require('./_export');
$export($export.S, 'Object', {setPrototypeOf: require('./_set-proto').set});
},{"./_export":49,"./_set-proto":85}],111:[function(require,module,exports){

},{}],112:[function(require,module,exports){
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
},{"./_iter-define":62,"./_string-at":89}],113:[function(require,module,exports){
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
},{"./_an-object":37,"./_descriptors":45,"./_enum-keys":48,"./_export":49,"./_fails":50,"./_global":51,"./_has":52,"./_hide":53,"./_is-array":58,"./_keyof":66,"./_library":67,"./_meta":68,"./_object-create":70,"./_object-dp":71,"./_object-gopd":73,"./_object-gopn":75,"./_object-gopn-ext":74,"./_object-gops":76,"./_object-keys":79,"./_object-pie":80,"./_property-desc":83,"./_redefine":84,"./_set-to-string-tag":86,"./_shared":88,"./_to-iobject":92,"./_to-primitive":95,"./_uid":96,"./_wks":99,"./_wks-define":97,"./_wks-ext":98}],114:[function(require,module,exports){
// https://github.com/tc39/proposal-object-values-entries
var $export  = require('./_export')
  , $entries = require('./_object-to-array')(true);

$export($export.S, 'Object', {
  entries: function entries(it){
    return $entries(it);
  }
});
},{"./_export":49,"./_object-to-array":82}],115:[function(require,module,exports){
require('./_wks-define')('asyncIterator');
},{"./_wks-define":97}],116:[function(require,module,exports){
require('./_wks-define')('observable');
},{"./_wks-define":97}],117:[function(require,module,exports){
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
},{"./_global":51,"./_hide":53,"./_iterators":65,"./_wks":99,"./es6.array.iterator":104}],118:[function(require,module,exports){
(function (global){
/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

module.exports = freeGlobal;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],119:[function(require,module,exports){
var freeGlobal = require('./_freeGlobal');

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;

},{"./_freeGlobal":118}],120:[function(require,module,exports){
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

},{"./isObject":121,"./now":124,"./toNumber":126}],121:[function(require,module,exports){
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

},{}],122:[function(require,module,exports){
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

},{}],123:[function(require,module,exports){
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

},{"./isObjectLike":122}],124:[function(require,module,exports){
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

},{"./_root":119}],125:[function(require,module,exports){
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

},{"./debounce":120,"./isObject":121}],126:[function(require,module,exports){
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

},{"./isObject":121,"./isSymbol":123}],127:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});exports.getAlt=exports.nextAlt=undefined;var _defineProperty2=require('babel-runtime/helpers/defineProperty');var _defineProperty3=_interopRequireDefault(_defineProperty2);var _extends3=require('babel-runtime/helpers/extends');var _extends4=_interopRequireDefault(_extends3);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var nextAlt=exports.nextAlt=function nextAlt(tag,nAlts,initial){return{type:'nextAlt',tag:tag,nAlts:nAlts,initial:initial}};exports.default=function(){var state=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};var _ref=arguments[1];var type=_ref.type,tag=_ref.tag,initial=_ref.initial,nAlts=_ref.nAlts;switch(type){case'nextAlt':{var _state$tag=state[tag],oldAlt=_state$tag===undefined?initial||0:_state$tag;var newAlt=(oldAlt+1)%nAlts;return(0,_extends4.default)({},state,(0,_defineProperty3.default)({},tag,newAlt))}default:return state;}};var getAlt=exports.getAlt=function getAlt(_ref2,_ref3){var alter=_ref2.alter;var tag=_ref3.tag,initial=_ref3.initial;var _alter$tag=alter[tag],alt=_alter$tag===undefined?initial||0:_alter$tag;return{alt:alt}};

},{"babel-runtime/helpers/defineProperty":15,"babel-runtime/helpers/extends":16}],128:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});exports.getDoc=undefined;var _defineProperty2=require('babel-runtime/helpers/defineProperty');var _defineProperty3=_interopRequireDefault(_defineProperty2);var _extends4=require('babel-runtime/helpers/extends');var _extends5=_interopRequireDefault(_extends4);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}exports.default=function(){var state=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};var _ref=arguments[1];var type=_ref.type,path=_ref.path,data=_ref.data;switch(type){case'fetchDoc':{if(data==null){return(0,_extends5.default)({},state,(0,_defineProperty3.default)({},path,null))}return(0,_extends5.default)({},state,(0,_defineProperty3.default)({},path,data))}default:return state;}};var getDoc=exports.getDoc=function getDoc(_ref2,_ref3){var doc=_ref2.doc;var docDir=_ref3.docDir,docName=_ref3.docName,docExt=_ref3.docExt;return{data:doc[docDir+'/'+docName+'.'+docExt]}};

},{"babel-runtime/helpers/defineProperty":15,"babel-runtime/helpers/extends":16}],129:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});exports.testAllChecks=exports.placeFacets=exports.getFilterApplied=exports.getFieldValues=exports.getFilterSetting=exports.setupFiltering=exports.changeFacetAll=exports.changeFacet=exports.changeFulltext=undefined;var _entries=require('babel-runtime/core-js/object/entries');var _entries2=_interopRequireDefault(_entries);var _getIterator2=require('babel-runtime/core-js/get-iterator');var _getIterator3=_interopRequireDefault(_getIterator2);var _classCallCheck2=require('babel-runtime/helpers/classCallCheck');var _classCallCheck3=_interopRequireDefault(_classCallCheck2);var _slicedToArray2=require('babel-runtime/helpers/slicedToArray');var _slicedToArray3=_interopRequireDefault(_slicedToArray2);var _keys=require('babel-runtime/core-js/object/keys');var _keys2=_interopRequireDefault(_keys);var _defineProperty2=require('babel-runtime/helpers/defineProperty');var _defineProperty3=_interopRequireDefault(_defineProperty2);var _extends6=require('babel-runtime/helpers/extends');var _extends7=_interopRequireDefault(_extends6);var _objectWithoutProperties2=require('babel-runtime/helpers/objectWithoutProperties');var _objectWithoutProperties3=_interopRequireDefault(_objectWithoutProperties2);var _memoBind=require('memoBind.js');var _memoBind2=_interopRequireDefault(_memoBind);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var changeFulltext=exports.changeFulltext=function changeFulltext(filterId,searchString){return{type:'fulltext',filterId:filterId,data:searchString}};var changeFacet=exports.changeFacet=function changeFacet(filterId,valueId,onOff){return{type:'facet',filterId:filterId,data:[valueId,onOff]}};var changeFacetAll=exports.changeFacetAll=function changeFacetAll(filterId,onOff){return{type:'facetAll',filterId:filterId,data:onOff}};var setupFiltering=exports.setupFiltering=function setupFiltering(table,tables){return function(dispatch){var fieldValues=(0,_memoBind2.default)(fCC,'compileFiltering',[table],[tables]);var filterSettings=(0,_memoBind2.default)(fCC,'initFiltering',[table],[tables,fieldValues]);dispatch({type:'setupFiltering',filterSettings:filterSettings})}};exports.default=function(){var state=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{filterSettings:{},initialized:false};var _ref=arguments[1];var type=_ref.type,filterId=_ref.filterId,data=_ref.data,rest=(0,_objectWithoutProperties3.default)(_ref,['type','filterId','data']);switch(type){case'setupFiltering':{return(0,_extends7.default)({},state,rest,{initialized:true})}case'fulltext':{return(0,_extends7.default)({},state,{filterSettings:(0,_extends7.default)({},state.filterSettings,(0,_defineProperty3.default)({},filterId,data))})}case'facetAll':{var sameSettings={};(0,_keys2.default)(state.filterSettings[filterId]).forEach(function(valueId){sameSettings[valueId]=data});return(0,_extends7.default)({},state,{filterSettings:(0,_extends7.default)({},state.filterSettings,(0,_defineProperty3.default)({},filterId,sameSettings))})}case'facet':{var _data=(0,_slicedToArray3.default)(data,2),valueId=_data[0],filterSetting=_data[1];return(0,_extends7.default)({},state,{filterSettings:(0,_extends7.default)({},state.filterSettings,(0,_defineProperty3.default)({},filterId,(0,_extends7.default)({},state.filterSettings[filterId],(0,_defineProperty3.default)({},valueId,filterSetting))))})}default:return state;}};var getFilterSetting=exports.getFilterSetting=function getFilterSetting(_ref2,_ref3){var filterSettings=_ref2.filter.filterSettings;var filterId=_ref3.filterId;return{filterSetting:filterSettings[filterId]}};var getFieldValues=exports.getFieldValues=function getFieldValues(_ref4,_ref5){var tables=_ref4.tables;var table=_ref5.table,filterField=_ref5.filterField;return{fieldValues:(0,_memoBind2.default)(fCC,'compileFiltering',[table],[tables])[filterField]}};var getFilterApplied=exports.getFilterApplied=function getFilterApplied(_ref6,_ref7){var tables=_ref6.tables,_ref6$filter=_ref6.filter,filterSettings=_ref6$filter.filterSettings,initialized=_ref6$filter.initialized;var table=_ref7.table;var fieldValues=(0,_memoBind2.default)(fCC,'compileFiltering',[table],[tables]);if(initialized){return(0,_extends7.default)({tables:tables,initialized:initialized,fieldValues:fieldValues,filterSettings:filterSettings},computeFiltering(table,tables,fieldValues,filterSettings))}else{return{tables:tables,initialized:initialized,fieldValues:fieldValues}}};var FilterCompileCache=function FilterCompileCache(){(0,_classCallCheck3.default)(this,FilterCompileCache);this.compileFiltering=function(table,tables){var _tables$table=tables[table],entities=_tables$table.entities,order=_tables$table.order,fields=_tables$table.fields,filterList=_tables$table.filterList;var presentFilterList=filterList.filter(function(x){return fields[x.field]});var filterFields=presentFilterList.filter(function(x){return x.type!=='FullText'}).map(function(x){return x.field});var fieldValues={};var _iteratorNormalCompletion=true;var _didIteratorError=false;var _iteratorError=undefined;try{for(var _iterator=(0,_getIterator3.default)(filterFields),_step;!(_iteratorNormalCompletion=(_step=_iterator.next()).done);_iteratorNormalCompletion=true){var f=_step.value;fieldValues[f]=(0,_defineProperty3.default)({},'','-none-')}}catch(err){_didIteratorError=true;_iteratorError=err}finally{try{if(!_iteratorNormalCompletion&&_iterator.return){_iterator.return()}}finally{if(_didIteratorError){throw _iteratorError}}}var _iteratorNormalCompletion2=true;var _didIteratorError2=false;var _iteratorError2=undefined;try{for(var _iterator2=(0,_getIterator3.default)(order),_step2;!(_iteratorNormalCompletion2=(_step2=_iterator2.next()).done);_iteratorNormalCompletion2=true){var eId=_step2.value;var entity=entities[eId];var _iteratorNormalCompletion3=true;var _didIteratorError3=false;var _iteratorError3=undefined;try{for(var _iterator3=(0,_getIterator3.default)(filterFields),_step3;!(_iteratorNormalCompletion3=(_step3=_iterator3.next()).done);_iteratorNormalCompletion3=true){var field=_step3.value;var fFieldValues=fieldValues[field];var efValue=entity.values[field];if(efValue!=null&&efValue.length!==0){var _iteratorNormalCompletion4=true;var _didIteratorError4=false;var _iteratorError4=undefined;try{for(var _iterator4=(0,_getIterator3.default)(efValue),_step4;!(_iteratorNormalCompletion4=(_step4=_iterator4.next()).done);_iteratorNormalCompletion4=true){var _ref9=_step4.value;var valueId=_ref9._id,valueRep=_ref9.value;fFieldValues[valueId]=valueRep}}catch(err){_didIteratorError4=true;_iteratorError4=err}finally{try{if(!_iteratorNormalCompletion4&&_iterator4.return){_iterator4.return()}}finally{if(_didIteratorError4){throw _iteratorError4}}}}}}catch(err){_didIteratorError3=true;_iteratorError3=err}finally{try{if(!_iteratorNormalCompletion3&&_iterator3.return){_iterator3.return()}}finally{if(_didIteratorError3){throw _iteratorError3}}}}}catch(err){_didIteratorError2=true;_iteratorError2=err}finally{try{if(!_iteratorNormalCompletion2&&_iterator2.return){_iterator2.return()}}finally{if(_didIteratorError2){throw _iteratorError2}}}return fieldValues};this.initFiltering=function(table,tables,fieldValues){var _tables$table2=tables[table],entities=_tables$table2.entities,order=_tables$table2.order,fields=_tables$table2.fields,filterList=_tables$table2.filterList;var presentFilterList=filterList.filter(function(x){return fields[x.field]});var filterSettings={};presentFilterList.forEach(function(filterSpec,filterId){if(filterSpec.type=='FullText'){filterSettings[filterId]=''}else{var facets={};(0,_keys2.default)(fieldValues[filterSpec.field]).forEach(function(valueId){facets[valueId]=true});filterSettings[filterId]=facets}});return filterSettings}};var fCC=new FilterCompileCache;var computeFiltering=function computeFiltering(table,tables,fieldValues,filterSettings){var _tables$table3=tables[table],entities=_tables$table3.entities,order=_tables$table3.order,fields=_tables$table3.fields,filterList=_tables$table3.filterList;var presentFilterList=filterList.filter(function(x){return fields[x.field]});var filterChecks={};var otherFilteredData={};presentFilterList.forEach(function(filterSpec,filterId){filterChecks[filterId]=(filterSpec.type==='FullText'?fulltextCheck:facetCheck)(filterSpec.field,filterSettings[filterId]);otherFilteredData[filterId]=[]});var filteredData=[];var _iteratorNormalCompletion5=true;var _didIteratorError5=false;var _iteratorError5=undefined;try{var _loop=function _loop(){var eId=_step5.value;var entity=entities[eId];var theOneFail=null;var v=true;var discard=false;(0,_entries2.default)(filterChecks).forEach(function(_ref13){var _ref14=(0,_slicedToArray3.default)(_ref13,2),filterId=_ref14[0],filterCheck=_ref14[1];if(!discard){var pass=filterCheck(entity);if(!pass){v=false;if(theOneFail===null){theOneFail=filterId}else{discard=true}}}});if(!discard){var _id=entity.values._id;if(v){filteredData.push(_id);presentFilterList.forEach(function(filterSpec,filterId){otherFilteredData[filterId].push(_id)})}else{otherFilteredData[theOneFail].push(_id)}}};for(var _iterator5=(0,_getIterator3.default)(order),_step5;!(_iteratorNormalCompletion5=(_step5=_iterator5.next()).done);_iteratorNormalCompletion5=true){_loop()}}catch(err){_didIteratorError5=true;_iteratorError5=err}finally{try{if(!_iteratorNormalCompletion5&&_iterator5.return){_iterator5.return()}}finally{if(_didIteratorError5){throw _iteratorError5}}}var amounts={};presentFilterList.forEach(function(_ref10,filterId){var field=_ref10.field,type=_ref10.type;amounts[filterId]=type==='FullText'?null:countFacets(field,fieldValues[field],otherFilteredData[filterId],entities)});var filteredAmountOthers={};(0,_entries2.default)(otherFilteredData).forEach(function(_ref11){var _ref12=(0,_slicedToArray3.default)(_ref11,2),filterId=_ref12[0],x=_ref12[1];filteredAmountOthers[filterId]=x.length});return{filteredData:filteredData,filteredAmountOthers:filteredAmountOthers,amounts:amounts}};var fulltextCheck=function fulltextCheck(field,term){var search=term.toLowerCase();if(search==null||search==''){return function(){return true}}return function(entity){var val=entity.values[field];val=val!=null?val[0]:val;return val!=null&&val.toLowerCase().indexOf(search)!==-1}};var facetCheck=function facetCheck(field,facetSettings){if(facetSettings.size===0){return function(){return false}}return function(entity){var fieldVals=entity.values[field];if(fieldVals==null||fieldVals.length==0){return facetSettings['']}var _iteratorNormalCompletion6=true;var _didIteratorError6=false;var _iteratorError6=undefined;try{for(var _iterator6=(0,_getIterator3.default)(fieldVals),_step6;!(_iteratorNormalCompletion6=(_step6=_iterator6.next()).done);_iteratorNormalCompletion6=true){var _ref16=_step6.value;var valueId=_ref16._id;if(facetSettings[valueId]){return true}}}catch(err){_didIteratorError6=true;_iteratorError6=err}finally{try{if(!_iteratorNormalCompletion6&&_iterator6.return){_iterator6.return()}}finally{if(_didIteratorError6){throw _iteratorError6}}}return false}};var countFacets=function countFacets(field,fieldValues,filteredData,entities){var facetAmounts={};(0,_keys2.default)(fieldValues).forEach(function(valueId){facetAmounts[valueId]=0});var _iteratorNormalCompletion7=true;var _didIteratorError7=false;var _iteratorError7=undefined;try{for(var _iterator7=(0,_getIterator3.default)(filteredData),_step7;!(_iteratorNormalCompletion7=(_step7=_iterator7.next()).done);_iteratorNormalCompletion7=true){var eId=_step7.value;var fieldVals=entities[eId].values[field];if(fieldVals==null||fieldVals.length==0){facetAmounts['']+=1}else{var _iteratorNormalCompletion8=true;var _didIteratorError8=false;var _iteratorError8=undefined;try{for(var _iterator8=(0,_getIterator3.default)(fieldVals),_step8;!(_iteratorNormalCompletion8=(_step8=_iterator8.next()).done);_iteratorNormalCompletion8=true){var _ref18=_step8.value;var valueId=_ref18._id;facetAmounts[valueId]+=1}}catch(err){_didIteratorError8=true;_iteratorError8=err}finally{try{if(!_iteratorNormalCompletion8&&_iterator8.return){_iterator8.return()}}finally{if(_didIteratorError8){throw _iteratorError8}}}}}}catch(err){_didIteratorError7=true;_iteratorError7=err}finally{try{if(!_iteratorNormalCompletion7&&_iterator7.return){_iterator7.return()}}finally{if(_didIteratorError7){throw _iteratorError7}}}return facetAmounts};var placeFacets=exports.placeFacets=function placeFacets(fieldValues,maxCols){if(fieldValues==null){return[]}var facets=(0,_entries2.default)(fieldValues).sort(function(x,y){return x[1].localeCompare(y[1])});if(facets.length==0){return[]}var rows=[];var lf=facets.length;var nrows=Math.floor(lf/maxCols)+(lf%maxCols?1:0);var ncols=Math.floor(lf/nrows)+(lf%nrows?1:0);for(var r=0;r<nrows;r++){var row=[];for(var c=0;c<ncols;c++){var f=nrows*c+r;row.push(f<lf?facets[f]:null)}rows.push(row)}return rows};var testAllChecks=exports.testAllChecks=function testAllChecks(filterSettings){var allTrue=true;var allFalse=true;var _iteratorNormalCompletion9=true;var _didIteratorError9=false;var _iteratorError9=undefined;try{for(var _iterator9=(0,_getIterator3.default)((0,_entries2.default)(filterSettings)),_step9;!(_iteratorNormalCompletion9=(_step9=_iterator9.next()).done);_iteratorNormalCompletion9=true){var _step9$value=(0,_slicedToArray3.default)(_step9.value,2),valueId=_step9$value[0],valueRep=_step9$value[1];if(valueRep){allFalse=false}else{allTrue=false}}}catch(err){_didIteratorError9=true;_iteratorError9=err}finally{try{if(!_iteratorNormalCompletion9&&_iterator9.return){_iterator9.return()}}finally{if(_didIteratorError9){throw _iteratorError9}}}return{allTrue:allTrue,allFalse:allFalse}};

},{"babel-runtime/core-js/get-iterator":2,"babel-runtime/core-js/object/entries":7,"babel-runtime/core-js/object/keys":9,"babel-runtime/helpers/classCallCheck":13,"babel-runtime/helpers/defineProperty":15,"babel-runtime/helpers/extends":16,"babel-runtime/helpers/objectWithoutProperties":18,"babel-runtime/helpers/slicedToArray":20,"memoBind.js":"memoBind.js"}],130:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});exports.getMe=undefined;var _extends2=require('babel-runtime/helpers/extends');var _extends3=_interopRequireDefault(_extends2);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}exports.default=function(){var state=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};var _ref=arguments[1];var type=_ref.type,path=_ref.path,data=_ref.data;switch(type){case'fetchMe':{if(data==null){return{}}return(0,_extends3.default)({},data)}default:return state;}};var getMe=exports.getMe=function getMe(_ref2){var me=_ref2.me;return{me:me}};

},{"babel-runtime/helpers/extends":16}],131:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});exports.getNotifications=exports.getNotify=exports.display=exports.clear=exports.notify=exports.succeed=exports.err=exports.ask=undefined;var _toConsumableArray2=require('babel-runtime/helpers/toConsumableArray');var _toConsumableArray3=_interopRequireDefault(_toConsumableArray2);var _extends2=require('babel-runtime/helpers/extends');var _extends3=_interopRequireDefault(_extends2);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var ask=exports.ask=function ask(desc){return{type:'async',status:'pending',desc:desc}};var err=exports.err=function err(desc,msgs){return{type:'async',status:'error',desc:desc,msgs:msgs}};var succeed=exports.succeed=function succeed(desc){return{type:'async',status:'success',desc:desc}};var notify=exports.notify=function notify(msgs){return{type:'msgs',msgs:msgs}};var clear=exports.clear=function clear(){return{type:'clear'}};var display=exports.display=function display(onOff){return{type:'display',onOff:onOff}};exports.default=function(){var state=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{items:[],busy:0,show:false};var _ref=arguments[1];var type=_ref.type,desc=_ref.desc,status=_ref.status,msgs=_ref.msgs,onOff=_ref.onOff;switch(type){case'async':{var items=state.items,busy=state.busy,_msgs=state.msgs;var extraMsgs=_msgs||[];switch(status){case'pending':{return(0,_extends3.default)({},state,{items:[].concat((0,_toConsumableArray3.default)(items),(0,_toConsumableArray3.default)(extraMsgs),[{kind:'special',text:'waiting for '+desc}]),busy:busy+1,show:true})}case'success':{return(0,_extends3.default)({},state,{items:[].concat((0,_toConsumableArray3.default)(items),(0,_toConsumableArray3.default)(extraMsgs),[{kind:'info',text:desc+' ok'}]),busy:busy-1,show:false})}case'error':{return(0,_extends3.default)({},state,{items:[].concat((0,_toConsumableArray3.default)(items),(0,_toConsumableArray3.default)(extraMsgs),[{kind:'error',text:desc+' failed'}]),busy:busy-1,show:true})}default:return state;}}case'msgs':{var _items=state.items;return(0,_extends3.default)({},state,{items:[].concat((0,_toConsumableArray3.default)(_items),(0,_toConsumableArray3.default)(msgs)),show:true})}case'clear':{return(0,_extends3.default)({},state,{items:[],show:false})}case'display':{return(0,_extends3.default)({},state,{show:onOff})}default:return state;}};var getNotify=exports.getNotify=function getNotify(_ref2){var notify=_ref2.notify;return{notify:notify}};var getNotifications=exports.getNotifications=function getNotifications(_ref3){var notify=_ref3.notify;var items=notify.items,busy=notify.busy,show=notify.show;var lastNote=-1;var lastKind='';items.forEach(function(item,i){var kind=item.kind,text=item.text;if(kind=='error'){lastNote=i;lastKind='error'}else if(kind=='warning'){if(lastKind!='error'){lastNote=i;lastKind='warning'}}});return{notifications:items,busy:busy,show:show,lastMsg:items.length-1,lastNote:lastNote,lastKind:lastKind}};

},{"babel-runtime/helpers/extends":16,"babel-runtime/helpers/toConsumableArray":21}],132:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});exports.combineSelectors=undefined;var _assign=require('babel-runtime/core-js/object/assign');var _assign2=_interopRequireDefault(_assign);var _getIterator2=require('babel-runtime/core-js/get-iterator');var _getIterator3=_interopRequireDefault(_getIterator2);var _redux=require('redux');var _win=require('win.js');var _win2=_interopRequireDefault(_win);var _notify=require('notify.js');var _notify2=_interopRequireDefault(_notify);var _doc=require('doc.js');var _doc2=_interopRequireDefault(_doc);var _tables=require('tables.js');var _tables2=_interopRequireDefault(_tables);var _me=require('me.js');var _me2=_interopRequireDefault(_me);var _filter=require('filter.js');var _filter2=_interopRequireDefault(_filter);var _alter=require('alter.js');var _alter2=_interopRequireDefault(_alter);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}exports.default=(0,_redux.combineReducers)({win:_win2.default,notify:_notify2.default,doc:_doc2.default,tables:_tables2.default,me:_me2.default,filter:_filter2.default,alter:_alter2.default});var combineSelectors=exports.combineSelectors=function combineSelectors(){var _arguments=arguments;return function(state,props){var result={};var _iteratorNormalCompletion=true;var _didIteratorError=false;var _iteratorError=undefined;try{for(var _iterator=(0,_getIterator3.default)(_arguments),_step;!(_iteratorNormalCompletion=(_step=_iterator.next()).done);_iteratorNormalCompletion=true){var selector=_step.value;(0,_assign2.default)(result,selector(state,props))}}catch(err){_didIteratorError=true;_iteratorError=err}finally{try{if(!_iteratorNormalCompletion&&_iterator.return){_iterator.return()}}finally{if(_didIteratorError){throw _iteratorError}}}return result}};

},{"alter.js":127,"babel-runtime/core-js/get-iterator":2,"babel-runtime/core-js/object/assign":4,"doc.js":128,"filter.js":129,"me.js":130,"notify.js":131,"redux":"redux","tables.js":134,"win.js":135}],133:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});exports.fetchData=undefined;var _extends2=require('babel-runtime/helpers/extends');var _extends3=_interopRequireDefault(_extends2);require('whatwg-fetch');var _notify=require('notify.js');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var rootUrl='/api/';var fetchData=exports.fetchData=function fetchData(task){return function(dispatch){var type=task.type,path=task.path,contentType=task.contentType,desc=task.desc;dispatch((0,_notify.ask)(desc));dispatch((0,_extends3.default)({},task,{data:null}));var settings={credentials:'same-origin'};fetch(''+rootUrl+contentType+path,settings).then(function(response){return response.json()}).then(function(json){var msgs=json.msgs,good=json.good,data=json.data;if(good){dispatch((0,_notify.succeed)(desc));dispatch((0,_extends3.default)({},task,{data:data}))}else{dispatch((0,_notify.err)(desc,msgs))}}).catch(function(error){console.err(error);dispatch((0,_notify.err)(desc,[{kind:'error',text:error}]))})}};

},{"babel-runtime/helpers/extends":16,"notify.js":131,"whatwg-fetch":"whatwg-fetch"}],134:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});exports.getTableFilters=exports.getUser=exports.getCountry=exports.getTables=undefined;var _objectWithoutProperties2=require('babel-runtime/helpers/objectWithoutProperties');var _objectWithoutProperties3=_interopRequireDefault(_objectWithoutProperties2);var _defineProperty2=require('babel-runtime/helpers/defineProperty');var _defineProperty3=_interopRequireDefault(_defineProperty2);var _extends9=require('babel-runtime/helpers/extends');var _extends10=_interopRequireDefault(_extends9);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}exports.default=function(){var state=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};var _ref=arguments[1];var type=_ref.type,path=_ref.path,data=_ref.data,table=_ref.table;switch(type){case'fetchTable':{if(data==null){return(0,_extends10.default)({},state,(0,_defineProperty3.default)({},table,null))}return(0,_extends10.default)({},state,(0,_defineProperty3.default)({},table,data))}case'fetchTableMy':{if(data==null){if(state[table]==null){return(0,_extends10.default)({},state,(0,_defineProperty3.default)({},table,null))}return(0,_extends10.default)({},state,(0,_defineProperty3.default)({},table,(0,_extends10.default)({},state[table],{my:null})))}var entities=data.entities,order=data.order,rest=(0,_objectWithoutProperties3.default)(data,['entities','order']);return(0,_extends10.default)({},state,(0,_defineProperty3.default)({},table,(0,_extends10.default)({},state[table],rest,{my:order,entities:(0,_extends10.default)({},(state[table]||{}).entities,entities)})))}case'fetchItem':{if(data==null){return state}var _id=data.values._id;return(0,_extends10.default)({},state,(0,_defineProperty3.default)({},table,(0,_extends10.default)({},state[table],{entities:(0,_extends10.default)({},state[table].entities,(0,_defineProperty3.default)({},_id,data))})))}default:return state;}};var getTables=exports.getTables=function getTables(_ref2){var tables=_ref2.tables;return{tables:tables}};var getCountry=exports.getCountry=function getCountry(_ref3){var country=_ref3.tables.country;return{country:country}};var getUser=exports.getUser=function getUser(_ref4){var user=_ref4.tables.user;return{user:user}};var getTableFilters=exports.getTableFilters=function getTableFilters(_ref5,_ref6){var tables=_ref5.tables;var table=_ref6.table;var _tables$table=tables[table],fields=_tables$table.fields,filterList=_tables$table.filterList;return{fields:fields,filterList:filterList}};

},{"babel-runtime/helpers/defineProperty":15,"babel-runtime/helpers/extends":16,"babel-runtime/helpers/objectWithoutProperties":18}],135:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});exports.getWinDim=exports.changeWinDim=undefined;var _extends2=require('babel-runtime/helpers/extends');var _extends3=_interopRequireDefault(_extends2);exports.columnStyle=columnStyle;function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var changeWinDim=exports.changeWinDim=function changeWinDim(){return function(dispatch){dispatch((0,_extends3.default)({type:'windim'},initWinDim()))}};exports.default=function(){var state=arguments.length>0&&arguments[0]!==undefined?arguments[0]:initWinDim();var _ref=arguments[1];var type=_ref.type,height=_ref.height,width=_ref.width;switch(type){case'windim':{return{height:height,width:width}}default:return state;}};var getWinDim=exports.getWinDim=function getWinDim(_ref2){var _ref2$win=_ref2.win,height=_ref2$win.height,width=_ref2$win.width;return{height:height,width:width}};var initWinDim=function initWinDim(){var _window=window,height=_window.innerHeight,width=_window.innerWidth;return{height:height,width:width}};var scrollBarWidth=40;var leftMargin=0;var topHeight=50;var topMargin=5;var divWidthSpec={left:120,rightLeft:380,rightLeftNav:150};var floatSpec={left:'left',right:'right',rightLeft:'left',rightLeftNav:'left',rightRight:'right',rightRightBody:'right'};function columnStyle(kind,_ref3){var height=_ref3.height,width=_ref3.width;var divHeight={left:height-topHeight,right:height-topHeight,rightLeft:height-topHeight-topMargin,rightLeftNav:height-topHeight-topMargin,rightRight:height-topHeight-topMargin,rightRightBody:height-topHeight-topMargin};var left=divWidthSpec.left,rightLeft=divWidthSpec.rightLeft,rightLeftNav=divWidthSpec.rightLeftNav;var divWidth=(0,_extends3.default)({},divWidthSpec,{right:width-left-scrollBarWidth,rightRight:width-left-rightLeft-2*scrollBarWidth-leftMargin,rightRightBody:width-left-rightLeftNav-2*scrollBarWidth-leftMargin});return{width:divWidth[kind],height:divHeight[kind],float:floatSpec[kind]}}

},{"babel-runtime/helpers/extends":16}],136:[function(require,module,exports){
'use strict';var _jsxFileName='/Users/dirk/github/dariah/client/src/js/app/main.jsx';var _react=require('react');var _react2=_interopRequireDefault(_react);var _reactDom=require('react-dom');var _reactRouter=require('react-router');var _Root=require('Root.jsx');var _Root2=_interopRequireDefault(_Root);var _App=require('App.jsx');var _App2=_interopRequireDefault(_App);var _SubApp=require('SubApp.jsx');var _SubApp2=_interopRequireDefault(_SubApp);var _Backoffice=require('Backoffice.jsx');var _Backoffice2=_interopRequireDefault(_Backoffice);var _ItemFiltered=require('ItemFiltered.jsx');var _ItemFiltered2=_interopRequireDefault(_ItemFiltered);var _ItemMy=require('ItemMy.jsx');var _ItemMy2=_interopRequireDefault(_ItemMy);var _ItemRecordPre=require('ItemRecordPre.jsx');var _ItemRecordPre2=_interopRequireDefault(_ItemRecordPre);var _Doc=require('Doc.jsx');var _Doc2=_interopRequireDefault(_Doc);var _NotFound=require('NotFound.jsx');var _NotFound2=_interopRequireDefault(_NotFound);var _configureStore=require('configureStore.js');var _configureStore2=_interopRequireDefault(_configureStore);var _reducers=require('reducers.js');var _reducers2=_interopRequireDefault(_reducers);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var store=(0,_configureStore2.default)(_reducers2.default);(0,_reactDom.render)(_react2.default.createElement(_Root2.default,{store:store,__source:{fileName:_jsxFileName,lineNumber:21}},_react2.default.createElement(_reactRouter.Router,{history:_reactRouter.browserHistory,__source:{fileName:_jsxFileName,lineNumber:22}},_react2.default.createElement(_reactRouter.Redirect,{from:'/about',to:'/docs/about.md',__source:{fileName:_jsxFileName,lineNumber:23}}),_react2.default.createElement(_reactRouter.Redirect,{from:'/docs/about',to:'/docs/about.md',__source:{fileName:_jsxFileName,lineNumber:24}}),_react2.default.createElement(_reactRouter.Redirect,{from:'/about.md',to:'/docs/about.md',__source:{fileName:_jsxFileName,lineNumber:25}}),_react2.default.createElement(_reactRouter.Redirect,{from:'/login',to:'/docs/about.md',__source:{fileName:_jsxFileName,lineNumber:26}}),_react2.default.createElement(_reactRouter.Redirect,{from:'/logout',to:'/docs/about.md',__source:{fileName:_jsxFileName,lineNumber:27}}),_react2.default.createElement(_reactRouter.Redirect,{from:'/slogout',to:'/docs/about.md',__source:{fileName:_jsxFileName,lineNumber:28}}),_react2.default.createElement(_reactRouter.Route,{path:'/',component:_App2.default,__source:{fileName:_jsxFileName,lineNumber:29}},_react2.default.createElement(_reactRouter.IndexRoute,{component:_App2.default,__source:{fileName:_jsxFileName,lineNumber:30}}),_react2.default.createElement(_reactRouter.IndexRedirect,{to:'/docs/about.md',__source:{fileName:_jsxFileName,lineNumber:31}}),_react2.default.createElement(_reactRouter.Route,{path:'docs/:docFile',component:_Doc2.default,__source:{fileName:_jsxFileName,lineNumber:32}}),_react2.default.createElement(_reactRouter.Route,{path:'tech/docs/gen/:docFile',component:_Doc2.default,__source:{fileName:_jsxFileName,lineNumber:33}}),_react2.default.createElement(_reactRouter.Route,{path:'tech/docs/:docFile',component:_Doc2.default,__source:{fileName:_jsxFileName,lineNumber:34}}),_react2.default.createElement(_reactRouter.Route,{path:':table',component:_SubApp2.default,__source:{fileName:_jsxFileName,lineNumber:35}},_react2.default.createElement(_reactRouter.Route,{path:'list',component:_ItemFiltered2.default,__source:{fileName:_jsxFileName,lineNumber:36}}),_react2.default.createElement(_reactRouter.Route,{path:'mylist',component:_ItemMy2.default,__source:{fileName:_jsxFileName,lineNumber:37}},_react2.default.createElement(_reactRouter.Route,{path:':eId',component:_ItemRecordPre2.default,ownOnly:true,__source:{fileName:_jsxFileName,lineNumber:38}})),_react2.default.createElement(_reactRouter.Route,{path:':func',component:_Backoffice2.default,__source:{fileName:_jsxFileName,lineNumber:40}}))),_react2.default.createElement(_reactRouter.Route,{path:'*',component:_NotFound2.default,__source:{fileName:_jsxFileName,lineNumber:43}}))),document.getElementById('body'));

},{"App.jsx":140,"Backoffice.jsx":141,"Doc.jsx":143,"ItemFiltered.jsx":162,"ItemMy.jsx":163,"ItemRecordPre.jsx":152,"NotFound.jsx":154,"Root.jsx":156,"SubApp.jsx":159,"configureStore.js":"configureStore.js","react":"react","react-dom":"react-dom","react-router":"react-router","reducers.js":132}],137:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _getPrototypeOf=require('babel-runtime/core-js/object/get-prototype-of');var _getPrototypeOf2=_interopRequireDefault(_getPrototypeOf);var _classCallCheck2=require('babel-runtime/helpers/classCallCheck');var _classCallCheck3=_interopRequireDefault(_classCallCheck2);var _createClass2=require('babel-runtime/helpers/createClass');var _createClass3=_interopRequireDefault(_createClass2);var _possibleConstructorReturn2=require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3=_interopRequireDefault(_possibleConstructorReturn2);var _inherits2=require('babel-runtime/helpers/inherits');var _inherits3=_interopRequireDefault(_inherits2);var _jsxFileName='/Users/dirk/github/dariah/client/src/js/app/object/CheckboxI.jsx';var _react=require('react');var _react2=_interopRequireDefault(_react);var _reactRedux=require('react-redux');var _filter=require('filter.js');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var indeterminate=function indeterminate(states){return!states.allTrue&&!states.allFalse};var CheckboxI=function(_Component){(0,_inherits3.default)(CheckboxI,_Component);function CheckboxI(){var _ref;var _temp,_this,_ret;(0,_classCallCheck3.default)(this,CheckboxI);for(var _len=arguments.length,args=Array(_len),_key=0;_key<_len;_key++){args[_key]=arguments[_key]}return _ret=(_temp=(_this=(0,_possibleConstructorReturn3.default)(this,(_ref=CheckboxI.__proto__||(0,_getPrototypeOf2.default)(CheckboxI)).call.apply(_ref,[this].concat(args))),_this),_this.handleCheck=function(){var _this2=_this,_this2$props=_this2.props,filterSetting=_this2$props.filterSetting,filterId=_this2$props.filterId,handle=_this2$props.handle;var states=(0,_filter.testAllChecks)(filterSetting);return handle(filterId,_this.dom.indeterminate||!states.allTrue)},_this.setIndeterminate=function(domElem){var _this3=_this,filterSetting=_this3.props.filterSetting;var states=(0,_filter.testAllChecks)(filterSetting);if(domElem){_this.dom=domElem;domElem.indeterminate=indeterminate(states)}},_temp),(0,_possibleConstructorReturn3.default)(_this,_ret)}(0,_createClass3.default)(CheckboxI,[{key:'componentDidUpdate',value:function componentDidUpdate(){var filterSetting=this.props.filterSetting;var states=(0,_filter.testAllChecks)(filterSetting);this.dom.indeterminate=indeterminate(states)}},{key:'render',value:function render(){var filterSetting=this.props.filterSetting;var states=(0,_filter.testAllChecks)(filterSetting);return _react2.default.createElement('input',{ref:this.setIndeterminate,type:'checkbox',checked:states.allTrue,onChange:this.handleCheck,__source:{fileName:_jsxFileName,lineNumber:30}})}}]);return CheckboxI}(_react.Component);exports.default=(0,_reactRedux.connect)(_filter.getFilterSetting,{handle:_filter.changeFacetAll})(CheckboxI);

},{"babel-runtime/core-js/object/get-prototype-of":8,"babel-runtime/helpers/classCallCheck":13,"babel-runtime/helpers/createClass":14,"babel-runtime/helpers/inherits":17,"babel-runtime/helpers/possibleConstructorReturn":19,"filter.js":129,"react":"react","react-redux":"react-redux"}],138:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _slicedToArray2=require('babel-runtime/helpers/slicedToArray');var _slicedToArray3=_interopRequireDefault(_slicedToArray2);var _entries=require('babel-runtime/core-js/object/entries');var _entries2=_interopRequireDefault(_entries);var _extends2=require('babel-runtime/helpers/extends');var _extends3=_interopRequireDefault(_extends2);var _objectWithoutProperties2=require('babel-runtime/helpers/objectWithoutProperties');var _objectWithoutProperties3=_interopRequireDefault(_objectWithoutProperties2);var _getPrototypeOf=require('babel-runtime/core-js/object/get-prototype-of');var _getPrototypeOf2=_interopRequireDefault(_getPrototypeOf);var _classCallCheck2=require('babel-runtime/helpers/classCallCheck');var _classCallCheck3=_interopRequireDefault(_classCallCheck2);var _createClass2=require('babel-runtime/helpers/createClass');var _createClass3=_interopRequireDefault(_createClass2);var _possibleConstructorReturn2=require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3=_interopRequireDefault(_possibleConstructorReturn2);var _inherits2=require('babel-runtime/helpers/inherits');var _inherits3=_interopRequireDefault(_inherits2);var _defineProperty2=require('babel-runtime/helpers/defineProperty');var _defineProperty3=_interopRequireDefault(_defineProperty2);var _MARKER_COLOR,_COUNTRY_STYLE,_jsxFileName='/Users/dirk/github/dariah/client/src/js/app/object/EUMap.jsx';var _react=require('react');var _react2=_interopRequireDefault(_react);var _reactRedux=require('react-redux');var _ByValue=require('ByValue.jsx');var _ByValue2=_interopRequireDefault(_ByValue);var _leaflet=require('leaflet');var _leaflet2=_interopRequireDefault(_leaflet);var _europeGeo=require('europe.geo.js');var _filter=require('filter.js');var _tables=require('tables.js');var _reducers=require('reducers.js');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var mapOptions={HEIGHT:250,MAX_RADIUS:25,LEVEL_OFF:10,ZOOM_INIT:3,MAP_CENTER:[52,12],MAP_BOUNDS:[[30,-20],[70,40]],MARKER_COLOR:(_MARKER_COLOR={},(0,_defineProperty3.default)(_MARKER_COLOR,true,{color:'#008800',fillColor:'#00cc00'}),(0,_defineProperty3.default)(_MARKER_COLOR,false,{color:'#888844',fillColor:'#bbbb66'}),_MARKER_COLOR),MARKER_SHAPE:{weight:1,fill:true,fillOpacity:0.8},COUNTRY_STYLE:(_COUNTRY_STYLE={},(0,_defineProperty3.default)(_COUNTRY_STYLE,true,{color:'#884422',weight:2,fill:true,fillColor:'#aa7766',fillOpacity:1}),(0,_defineProperty3.default)(_COUNTRY_STYLE,false,{color:'#777777',weight:1,fill:true,fillColor:'#bbbbbb',fillOpacity:1}),_COUNTRY_STYLE)};var computeRadius=function computeRadius(_id,filteredAmountOthers,amounts){var amount=amounts?amounts[_id]||0:0;if(amount==0){return 0}var MAX_RADIUS=mapOptions.MAX_RADIUS,LEVEL_OFF=mapOptions.LEVEL_OFF;var proportional=MAX_RADIUS*amount/filteredAmountOthers;if(filteredAmountOthers<LEVEL_OFF){return proportional}return LEVEL_OFF*Math.sqrt(proportional)};var EUMap=function(_Component){(0,_inherits3.default)(EUMap,_Component);function EUMap(props){(0,_classCallCheck3.default)(this,EUMap);var _this=(0,_possibleConstructorReturn3.default)(this,(EUMap.__proto__||(0,_getPrototypeOf2.default)(EUMap)).call(this,props));_this.setMap=function(dom){if(dom){_this.dom=dom}};_this.inDariah=function(feature){return!!_this.idFromIso[feature.properties.iso2]};_this.features={};return _this}(0,_createClass3.default)(EUMap,[{key:'render',value:function render(){var _props=this.props,country=_props.country,byValueProps=(0,_objectWithoutProperties3.default)(_props,['country']),setMap=this.setMap;return _react2.default.createElement('div',{__source:{fileName:_jsxFileName,lineNumber:68}},_react2.default.createElement('div',{ref:setMap,__source:{fileName:_jsxFileName,lineNumber:69}}),_react2.default.createElement(_ByValue2.default,(0,_extends3.default)({},byValueProps,{__source:{fileName:_jsxFileName,lineNumber:72}})))}},{key:'componentDidMount',value:function componentDidMount(){var _this2=this;var _props2=this.props,filterSetting=_props2.filterSetting,filteredAmountOthers=_props2.filteredAmountOthers,amounts=_props2.amounts,country=_props2.country,dom=this.dom;var HEIGHT=mapOptions.HEIGHT,MAP_CENTER=mapOptions.MAP_CENTER,ZOOM_INIT=mapOptions.ZOOM_INIT,MAP_BOUNDS=mapOptions.MAP_BOUNDS,MARKER_COLOR=mapOptions.MARKER_COLOR,MARKER_SHAPE=mapOptions.MARKER_SHAPE,COUNTRY_STYLE=mapOptions.COUNTRY_STYLE;dom.style.height=HEIGHT;this.map=_leaflet2.default.map(dom,{attributionControl:false,center:MAP_CENTER,zoom:ZOOM_INIT,maxBounds:MAP_BOUNDS});var order=country.order,entities=country.entities;this.idFromIso={};order.forEach(function(_id){var iso=entities[_id].values.iso;_this2.idFromIso[iso]=_id});_leaflet2.default.geoJSON(_europeGeo.countryBorders,{style:function style(feature){return COUNTRY_STYLE[_this2.inDariah(feature)]},onEachFeature:function onEachFeature(feature){if(_this2.inDariah(feature)){var _feature$properties=feature.properties,iso2=_feature$properties.iso2,lat=_feature$properties.lat,lng=_feature$properties.lng;var _id=_this2.idFromIso[iso2];var isOn=filterSetting[_id];var marker=_leaflet2.default.circleMarker([lat,lng],(0,_extends3.default)({},MARKER_COLOR[isOn],{radius:computeRadius(_id,filteredAmountOthers,amounts)},MARKER_SHAPE,{pane:'markerPane'})).addTo(_this2.map);_this2.features[iso2]=marker}}}).addTo(this.map)}},{key:'componentDidUpdate',value:function componentDidUpdate(){var _this3=this;var _props3=this.props,filterSetting=_props3.filterSetting,filteredAmountOthers=_props3.filteredAmountOthers,amounts=_props3.amounts;var MARKER_COLOR=mapOptions.MARKER_COLOR;(0,_entries2.default)(this.features).forEach(function(_ref){var _ref2=(0,_slicedToArray3.default)(_ref,2),iso2=_ref2[0],marker=_ref2[1];var _id=_this3.idFromIso[iso2];var isOn=filterSetting[_id];marker.setRadius(computeRadius(_id,filteredAmountOthers,amounts));marker.setStyle(MARKER_COLOR[isOn])})}}]);return EUMap}(_react.Component);EUMap.displayName='EUMap';exports.default=(0,_reactRedux.connect)((0,_reducers.combineSelectors)(_tables.getCountry,_filter.getFilterSetting))(EUMap);

},{"ByValue.jsx":142,"babel-runtime/core-js/object/entries":7,"babel-runtime/core-js/object/get-prototype-of":8,"babel-runtime/helpers/classCallCheck":13,"babel-runtime/helpers/createClass":14,"babel-runtime/helpers/defineProperty":15,"babel-runtime/helpers/extends":16,"babel-runtime/helpers/inherits":17,"babel-runtime/helpers/objectWithoutProperties":18,"babel-runtime/helpers/possibleConstructorReturn":19,"babel-runtime/helpers/slicedToArray":20,"europe.geo.js":"europe.geo.js","filter.js":129,"leaflet":"leaflet","react":"react","react-redux":"react-redux","reducers.js":132,"tables.js":134}],139:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _extends2=require('babel-runtime/helpers/extends');var _extends3=_interopRequireDefault(_extends2);var _objectWithoutProperties2=require('babel-runtime/helpers/objectWithoutProperties');var _objectWithoutProperties3=_interopRequireDefault(_objectWithoutProperties2);var _jsxFileName='/Users/dirk/github/dariah/client/src/js/app/pure/Alternative.jsx';var _react=require('react');var _react2=_interopRequireDefault(_react);var _reactRedux=require('react-redux');var _alter=require('alter.js');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var handleNext=function handleNext(_ref){var tag=_ref.tag,alternatives=_ref.alternatives,initial=_ref.initial,next=_ref.next;return function(event){event.preventDefault();next(tag,alternatives.length,initial)}};var Alternative=function Alternative(_ref2){var controlPlacement=_ref2.controlPlacement,controls=_ref2.controls,alt=_ref2.alt,alternatives=_ref2.alternatives,rest=(0,_objectWithoutProperties3.default)(_ref2,['controlPlacement','controls','alt','alternatives']);return _react2.default.createElement('div',{__source:{fileName:_jsxFileName,lineNumber:11}},controlPlacement(controls[alt](handleNext((0,_extends3.default)({alternatives:alternatives},rest)))),alternatives[alt])};exports.default=(0,_reactRedux.connect)(_alter.getAlt,{next:_alter.nextAlt})(Alternative);

},{"alter.js":127,"babel-runtime/helpers/extends":16,"babel-runtime/helpers/objectWithoutProperties":18,"react":"react","react-redux":"react-redux"}],140:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _jsxFileName='/Users/dirk/github/dariah/client/src/js/app/pure/App.jsx';var _react=require('react');var _react2=_interopRequireDefault(_react);var _reactRedux=require('react-redux');var _Login=require('Login.jsx');var _Login2=_interopRequireDefault(_Login);var _NavLink=require('NavLink.jsx');var _NavLink2=_interopRequireDefault(_NavLink);var _Static=require('Static.jsx');var _Static2=_interopRequireDefault(_Static);var _Notification=require('Notification.jsx');var _Notification2=_interopRequireDefault(_Notification);var _win=require('win.js');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var App=function App(_ref){var children=_ref.children,height=_ref.height,width=_ref.width;var text=width+' x '+height;return _react2.default.createElement('div',{__source:{fileName:_jsxFileName,lineNumber:12}},_react2.default.createElement(_Notification2.default,{__source:{fileName:_jsxFileName,lineNumber:13}}),_react2.default.createElement('p',{className:'nav small top',__source:{fileName:_jsxFileName,lineNumber:14}},_react2.default.createElement('img',{src:'/static/images/inkind_logo_small.png',title:'information about this site',__source:{fileName:_jsxFileName,lineNumber:15}}),_react2.default.createElement(_NavLink2.default,{to:'/contrib',__source:{fileName:_jsxFileName,lineNumber:19}},'Contributions'),_react2.default.createElement(_NavLink2.default,{to:'/backoffice',__source:{fileName:_jsxFileName,lineNumber:20}},'Backoffice'),_react2.default.createElement(_Static2.default,{__source:{fileName:_jsxFileName,lineNumber:21}}),_react2.default.createElement('span',{className:'resize',title:text,__source:{fileName:_jsxFileName,lineNumber:22}},text),_react2.default.createElement(_Login2.default,{__source:{fileName:_jsxFileName,lineNumber:23}})),_react2.default.createElement('div',{__source:{fileName:_jsxFileName,lineNumber:25}},children))};exports.default=(0,_reactRedux.connect)(_win.getWinDim)(App);

},{"Login.jsx":165,"NavLink.jsx":153,"Notification.jsx":166,"Static.jsx":158,"react":"react","react-redux":"react-redux","win.js":135}],141:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _jsxFileName='/Users/dirk/github/dariah/client/src/js/app/pure/Backoffice.jsx';var _react=require('react');var _react2=_interopRequireDefault(_react);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var Backoffice=function Backoffice(_ref){var func=_ref.params.func;var headings={type:'Contribution types',assess:'Assessment criteria',package:'Assessment packages'};var bodies={type:'Will be implemented',assess:'Will be implemented',package:'Will be implemented'};var heading=headings[func]||'No such function';var body=bodies[func]||'Nothing to wait for';return _react2.default.createElement('div',{__source:{fileName:_jsxFileName,lineNumber:17}},_react2.default.createElement('h1',{__source:{fileName:_jsxFileName,lineNumber:18}},heading),_react2.default.createElement('p',{__source:{fileName:_jsxFileName,lineNumber:19}},body))};exports.default=Backoffice;

},{"react":"react"}],142:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _slicedToArray2=require('babel-runtime/helpers/slicedToArray');var _slicedToArray3=_interopRequireDefault(_slicedToArray2);var _jsxFileName='/Users/dirk/github/dariah/client/src/js/app/pure/ByValue.jsx';var _react=require('react');var _react2=_interopRequireDefault(_react);var _reactRedux=require('react-redux');var _Facet=require('Facet.jsx');var _Facet2=_interopRequireDefault(_Facet);var _CheckboxI=require('CheckboxI.jsx');var _CheckboxI2=_interopRequireDefault(_CheckboxI);var _Stat=require('Stat.jsx');var _Stat2=_interopRequireDefault(_Stat);var _Alternative=require('Alternative.jsx');var _Alternative2=_interopRequireDefault(_Alternative);var _filter=require('filter.js');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var ByValue=function ByValue(_ref){var table=_ref.table,filterId=_ref.filterId,filterField=_ref.filterField,filterLabel=_ref.filterLabel,fieldValues=_ref.fieldValues,filteredAmount=_ref.filteredAmount,filteredAmountOthers=_ref.filteredAmountOthers,amounts=_ref.amounts,maxCols=_ref.maxCols,expanded=_ref.expanded;var rows=(0,_filter.placeFacets)(fieldValues,maxCols);var control1=function control1(handler){return _react2.default.createElement('span',{className:'button-small fa fa-chevron-down',onClick:handler,__source:{fileName:_jsxFileName,lineNumber:18}})};var control2=function control2(handler){return _react2.default.createElement('span',{className:'button-small fa fa-chevron-right',onClick:handler,__source:{fileName:_jsxFileName,lineNumber:19}})};var controlPlacement=function controlPlacement(control){return _react2.default.createElement('p',{className:'facet',__source:{fileName:_jsxFileName,lineNumber:21}},_react2.default.createElement(_CheckboxI2.default,{filterId:filterId,__source:{fileName:_jsxFileName,lineNumber:22}}),' ',filterLabel,' ',_react2.default.createElement(_Stat2.default,{subTotal:filteredAmount,total:filteredAmountOthers,__source:{fileName:_jsxFileName,lineNumber:25}}),' ',control)};return _react2.default.createElement('div',{className:'facet',__source:{fileName:_jsxFileName,lineNumber:30}},rows===null?_react2.default.createElement('p',{__source:{fileName:_jsxFileName,lineNumber:31}},' -no facets '):_react2.default.createElement(_Alternative2.default,{tag:table+'_'+filterId,controlPlacement:controlPlacement,controls:[control1,control2],initial:expanded?0:1,alternatives:[_react2.default.createElement('table',{key:'table',__source:{fileName:_jsxFileName,lineNumber:38}},_react2.default.createElement('tbody',{__source:{fileName:_jsxFileName,lineNumber:39}},rows.map(function(entity,i){return _react2.default.createElement('tr',{key:i,__source:{fileName:_jsxFileName,lineNumber:41}},entity.map(function(f,j){if(f===null){return _react2.default.createElement('td',{key:j,__source:{fileName:_jsxFileName,lineNumber:44}})}var _f=(0,_slicedToArray3.default)(f,2),valueId=_f[0],valueRep=_f[1];var facetClass=j==0?'facet':'facet mid';return[_react2.default.createElement('td',{key:valueId,className:facetClass,__source:{fileName:_jsxFileName,lineNumber:49}},_react2.default.createElement(_Facet2.default,{filterId:filterId,valueId:valueId,valueRep:valueRep,__source:{fileName:_jsxFileName,lineNumber:53}})),_react2.default.createElement('td',{key:'stat',className:'statistic',__source:{fileName:_jsxFileName,lineNumber:60}},_react2.default.createElement(_Stat2.default,{subTotal:amounts[valueId],__source:{fileName:_jsxFileName,lineNumber:64}}))]}))}))),_react2.default.createElement('div',{key:'div',__source:{fileName:_jsxFileName,lineNumber:72}})],__source:{fileName:_jsxFileName,lineNumber:32}}))};exports.default=(0,_reactRedux.connect)(_filter.getFieldValues)(ByValue);

},{"Alternative.jsx":139,"CheckboxI.jsx":137,"Facet.jsx":146,"Stat.jsx":157,"babel-runtime/helpers/slicedToArray":20,"filter.js":129,"react":"react","react-redux":"react-redux"}],143:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _slicedToArray2=require('babel-runtime/helpers/slicedToArray');var _slicedToArray3=_interopRequireDefault(_slicedToArray2);var _jsxFileName='/Users/dirk/github/dariah/client/src/js/app/pure/Doc.jsx';var _react=require('react');var _react2=_interopRequireDefault(_react);var _DocMd=require('DocMd.jsx');var _DocMd2=_interopRequireDefault(_DocMd);var _DocPdf=require('DocPdf.jsx');var _DocPdf2=_interopRequireDefault(_DocPdf);var _DocHtml=require('DocHtml.jsx');var _DocHtml2=_interopRequireDefault(_DocHtml);var _NotFound=require('NotFound.jsx');var _NotFound2=_interopRequireDefault(_NotFound);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var docType={md:_DocMd2.default,pdf:_DocPdf2.default,html:_DocHtml2.default};var Doc=function Doc(_ref){var docPath=_ref.location.pathname;var _$exec$slice=/^(.*)\/([^/]+)$/g.exec(docPath).slice(1),_$exec$slice2=(0,_slicedToArray3.default)(_$exec$slice,2),docDir=_$exec$slice2[0],docFile=_$exec$slice2[1];var _$exec$slice3=/^(.*)\.([^.]+)$/g.exec(docFile).slice(1),_$exec$slice4=(0,_slicedToArray3.default)(_$exec$slice3,2),docName=_$exec$slice4[0],docExt=_$exec$slice4[1];var DocClass=docType[docExt];return DocClass==null?_react2.default.createElement(_NotFound2.default,{params:{splat:'document '+docPath},__source:{fileName:_jsxFileName,lineNumber:19}}):_react2.default.createElement(DocClass,{docDir:docDir,docName:docName,docExt:docExt,tag:docName,__source:{fileName:_jsxFileName,lineNumber:21}})};exports.default=Doc;

},{"DocHtml.jsx":144,"DocMd.jsx":160,"DocPdf.jsx":145,"NotFound.jsx":154,"babel-runtime/helpers/slicedToArray":20,"react":"react"}],144:[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:true});var _jsxFileName="/Users/dirk/github/dariah/client/src/js/app/pure/DocHtml.jsx";var _react=require("react");var _react2=_interopRequireDefault(_react);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var DocHtml=function DocHtml(_ref){var docDir=_ref.docDir,docName=_ref.docName,docExt=_ref.docExt;var src="/api/file"+docDir+"/"+docName+"."+docExt;return _react2.default.createElement("iframe",{height:"100%",width:"100%",src:src,__source:{fileName:_jsxFileName,lineNumber:6}})};exports.default=DocHtml;

},{"react":"react"}],145:[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:true});var _jsxFileName="/Users/dirk/github/dariah/client/src/js/app/pure/DocPdf.jsx";var _react=require("react");var _react2=_interopRequireDefault(_react);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var DocPdf=function DocPdf(_ref){var docDir=_ref.docDir,docName=_ref.docName,docExt=_ref.docExt;var href="/api/file"+docDir+"/"+docName+"."+docExt;var iOS=/iPad|iPhone|iPod/.test(navigator.userAgent)&&!window.MSStream;return iOS?_react2.default.createElement("p",{__source:{fileName:_jsxFileName,lineNumber:7}},_react2.default.createElement("a",{target:"_blank",rel:"noopener noreferrer",href:href,__source:{fileName:_jsxFileName,lineNumber:8}},docName)," (open pdf in a new tab)"):_react2.default.createElement("object",{height:"100%",width:"100%",data:href,type:"application/pdf",__source:{fileName:_jsxFileName,lineNumber:11}},_react2.default.createElement("a",{target:"_blank",rel:"noopener noreferrer",href:href,__source:{fileName:_jsxFileName,lineNumber:17}},docName)," (open pdf in a new tab)")};exports.default=DocPdf;

},{"react":"react"}],146:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _jsxFileName='/Users/dirk/github/dariah/client/src/js/app/pure/Facet.jsx';var _react=require('react');var _react2=_interopRequireDefault(_react);var _reactRedux=require('react-redux');var _filter=require('filter.js');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var Facet=function Facet(_ref){var filterId=_ref.filterId,valueId=_ref.valueId,valueRep=_ref.valueRep,filterSetting=_ref.filterSetting,handle=_ref.handle;var isOn=filterSetting[valueId];return _react2.default.createElement('span',{__source:{fileName:_jsxFileName,lineNumber:8}},_react2.default.createElement('input',{type:'checkbox',checked:isOn,className:'facet',onChange:function onChange(){return handle(filterId,valueId,!isOn)},__source:{fileName:_jsxFileName,lineNumber:9}}),' '+valueRep)};exports.default=(0,_reactRedux.connect)(_filter.getFilterSetting,{handle:_filter.changeFacet})(Facet);

},{"filter.js":129,"react":"react","react-redux":"react-redux"}],147:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _jsxFileName='/Users/dirk/github/dariah/client/src/js/app/pure/Filter.jsx';var _react=require('react');var _react2=_interopRequireDefault(_react);var _reactRedux=require('react-redux');var _FullText=require('FullText.jsx');var _FullText2=_interopRequireDefault(_FullText);var _ByValue=require('ByValue.jsx');var _ByValue2=_interopRequireDefault(_ByValue);var _EUMap=require('EUMap.jsx');var _EUMap2=_interopRequireDefault(_EUMap);var _tables=require('tables.js');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var filterClass={FullText:_FullText2.default,EUMap:_EUMap2.default,ByValue:_ByValue2.default};var Filter=function Filter(_ref){var tables=_ref.tables,table=_ref.table,fields=_ref.fields,filterList=_ref.filterList,filteredAmount=_ref.filteredAmount,filteredAmountOthers=_ref.filteredAmountOthers,amounts=_ref.amounts;return _react2.default.createElement('div',{__source:{fileName:_jsxFileName,lineNumber:24}},filterList.filter(function(x){return fields[x.field]}).map(function(filter,filterId){var type=filter.type;var Fclass=filterClass[type];if(false&&type!='FullText'){return _react2.default.createElement('p',{key:filterId,__source:{fileName:_jsxFileName,lineNumber:29}},type)}return _react2.default.createElement(Fclass,{key:filterId,table:table,filterId:filterId,filterField:filter.field,filterLabel:filter.label,maxCols:filter.maxCols,filteredAmount:filteredAmount,filteredAmountOthers:filteredAmountOthers[filterId],amounts:amounts[filterId],expanded:filter.expanded,__source:{fileName:_jsxFileName,lineNumber:32}})}))};exports.default=(0,_reactRedux.connect)(_tables.getTableFilters)(Filter);

},{"ByValue.jsx":142,"EUMap.jsx":138,"FullText.jsx":148,"react":"react","react-redux":"react-redux","tables.js":134}],148:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _jsxFileName='/Users/dirk/github/dariah/client/src/js/app/pure/FullText.jsx';var _react=require('react');var _react2=_interopRequireDefault(_react);var _reactRedux=require('react-redux');var _Stat=require('Stat.jsx');var _Stat2=_interopRequireDefault(_Stat);var _filter=require('filter.js');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var FullText=function FullText(_ref){var filterId=_ref.filterId,filterField=_ref.filterField,filterLabel=_ref.filterLabel,filterSetting=_ref.filterSetting,filteredAmount=_ref.filteredAmount,filteredAmountOthers=_ref.filteredAmountOthers,handle=_ref.handle;return _react2.default.createElement('div',{__source:{fileName:_jsxFileName,lineNumber:13}},_react2.default.createElement('p',{title:'Search in '+filterField,__source:{fileName:_jsxFileName,lineNumber:14}},_react2.default.createElement('input',{type:'text',className:'search',placeholder:'search in '+filterLabel,value:filterSetting,onChange:function onChange(event){return handle(filterId,event.target.value)},__source:{fileName:_jsxFileName,lineNumber:15}}),' ',_react2.default.createElement(_Stat2.default,{subTotal:filteredAmount,total:filteredAmountOthers,__source:{fileName:_jsxFileName,lineNumber:22}})))};exports.default=(0,_reactRedux.connect)(_filter.getFilterSetting,{handle:_filter.changeFulltext})(FullText);

},{"Stat.jsx":157,"filter.js":129,"react":"react","react-redux":"react-redux"}],149:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _jsxFileName='/Users/dirk/github/dariah/client/src/js/app/pure/ItemField.jsx';var _react=require('react');var _react2=_interopRequireDefault(_react);var _reactRedux=require('react-redux');var _reducers=require('reducers.js');var _tables=require('tables.js');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var trimDate=function trimDate(text){return text==null?'':text.replace(/\.[0-9]+/,'')};var userAsString=function userAsString(_ref,user){var valId=_ref._id;var valRep=void 0;var entity=user.entities[valId];if(entity){var _entity$values=entity.values,eppn=_entity$values.eppn,firstName=_entity$values.firstName,lastName=_entity$values.lastName,emailPre=_entity$values.emailPre,authority=_entity$values.authority,mayLogin=_entity$values.mayLogin;var email=emailPre||'';var linkText=[firstName||'',lastName||''].filter(function(x){return x}).join(' ');if(linkText==''){linkText=email}var namePart=linkText&&email?'['+linkText+'](mailto:'+email+')':linkText+email;var eppnPart=eppn?' eppn='+eppn+' ':'';var authorityPart=authority?' authenticated by='+authority+' ':'';var mayLoginPart=mayLogin?' active='+mayLogin+' ':'';valRep=[namePart,eppnPart,authorityPart,mayLoginPart].filter(function(x){return x}).join('; ')}else{valRep='UNKNOWN'}return valRep};var countryAsString=function countryAsString(_ref2,country){var valId=_ref2._id;var entity=country.entities[valId];if(entity){var _entity$values2=entity.values,name=_entity$values2.name,iso=_entity$values2.iso;return iso+': '+name}else{return'UNKNOWN'}};var valueAsString=function valueAsString(value,_ref3){var valType=_ref3.valType,convert=_ref3.convert,initial=_ref3.initial,user=_ref3.user,country=_ref3.country;if(value==null){return''}switch(valType){case'rel':{switch(convert){case'user':{return userAsString(value,user)}case'country':{return countryAsString(value,country)}default:return value.value;}}case'datetime':{return trimDate(value)}default:{return value}}};var ItemField=function ItemField(_ref4){var label=_ref4.label,values=_ref4.values,valType=_ref4.valType,convert=_ref4.convert,initial=_ref4.initial,user=_ref4.user,country=_ref4.country;var props={valType:valType,convert:convert,initial:initial,user:user,country:country};return _react2.default.createElement('p',{__source:{fileName:_jsxFileName,lineNumber:69}},_react2.default.createElement('label',{__source:{fileName:_jsxFileName,lineNumber:70}},_react2.default.createElement('b',{__source:{fileName:_jsxFileName,lineNumber:70}},label,':')),' ',values.map(function(value,i){return _react2.default.createElement('span',{key:i,__source:{fileName:_jsxFileName,lineNumber:73}},i!=0?' | ':'',_react2.default.createElement('span',{__source:{fileName:_jsxFileName,lineNumber:73}},valueAsString(value,props)))}))};exports.default=(0,_reactRedux.connect)((0,_reducers.combineSelectors)(_tables.getUser,_tables.getCountry))(ItemField);

},{"react":"react","react-redux":"react-redux","reducers.js":132,"tables.js":134}],150:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _typeof2=require('babel-runtime/helpers/typeof');var _typeof3=_interopRequireDefault(_typeof2);var _slicedToArray2=require('babel-runtime/helpers/slicedToArray');var _slicedToArray3=_interopRequireDefault(_slicedToArray2);var _jsxFileName='/Users/dirk/github/dariah/client/src/js/app/pure/ItemHead.jsx';var _react=require('react');var _react2=_interopRequireDefault(_react);var _Alternative=require('Alternative.jsx');var _Alternative2=_interopRequireDefault(_Alternative);var _ItemRecord=require('ItemRecord.jsx');var _ItemRecord2=_interopRequireDefault(_ItemRecord);var _NavLink=require('NavLink.jsx');var _NavLink2=_interopRequireDefault(_NavLink);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var ItemHead=function ItemHead(_ref){var table=_ref.table,values=_ref.values,title=_ref.title,inplace=_ref.inplace;var eId=values._id,entityHeadPre=values[title];var entityHead=void 0;if(!entityHeadPre){entityHead='-empty-'}else{var _entityHeadPre=(0,_slicedToArray3.default)(entityHeadPre,1);entityHead=_entityHeadPre[0];if((typeof entityHead==='undefined'?'undefined':(0,_typeof3.default)(entityHead))=='object'){var _entityHead=entityHead,value=_entityHead.value;entityHead=value}}var control1=function control1(handler){return _react2.default.createElement('span',{className:'button-small fa fa-chevron-down',onClick:handler,__source:{fileName:_jsxFileName,lineNumber:18}})};var control2=function control2(handler){return _react2.default.createElement('span',{className:'button-small fa fa-chevron-right',onClick:handler,__source:{fileName:_jsxFileName,lineNumber:19}})};var controlPlacement=function controlPlacement(control){return _react2.default.createElement('p',{__source:{fileName:_jsxFileName,lineNumber:21}},control,_react2.default.createElement('span',{__source:{fileName:_jsxFileName,lineNumber:23}},entityHead))};return _react2.default.createElement('tr',{id:eId,__source:{fileName:_jsxFileName,lineNumber:30}},_react2.default.createElement('td',{__source:{fileName:_jsxFileName,lineNumber:31}},inplace?_react2.default.createElement(_Alternative2.default,{tag:table+'_'+eId,controlPlacement:controlPlacement,controls:[control1,control2],alternatives:[_react2.default.createElement(_ItemRecord2.default,{key:'show',table:table,eId:eId,__source:{fileName:_jsxFileName,lineNumber:38}}),''],initial:1,__source:{fileName:_jsxFileName,lineNumber:33}}):_react2.default.createElement(_NavLink2.default,{className:'nav',to:'/'+table+'/mylist/'+eId,__source:{fileName:_jsxFileName,lineNumber:47}},_react2.default.createElement('span',{__source:{fileName:_jsxFileName,lineNumber:48}},entityHead))))};exports.default=ItemHead;

},{"Alternative.jsx":139,"ItemRecord.jsx":164,"NavLink.jsx":153,"babel-runtime/helpers/slicedToArray":20,"babel-runtime/helpers/typeof":22,"react":"react"}],151:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _jsxFileName='/Users/dirk/github/dariah/client/src/js/app/pure/ItemList.jsx';var _react=require('react');var _react2=_interopRequireDefault(_react);var _reactRedux=require('react-redux');var _ItemHead=require('ItemHead.jsx');var _ItemHead2=_interopRequireDefault(_ItemHead);var _tables=require('tables.js');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var ItemList=function ItemList(_ref){var tables=_ref.tables,table=_ref.table,title=_ref.title,filteredData=_ref.filteredData,inplace=_ref.inplace;var entities=tables[table].entities;return _react2.default.createElement('div',{__source:{fileName:_jsxFileName,lineNumber:9}},_react2.default.createElement('table',{__source:{fileName:_jsxFileName,lineNumber:10}},_react2.default.createElement('tbody',{__source:{fileName:_jsxFileName,lineNumber:11}},filteredData.map(function(eId){var values=entities[eId].values;return _react2.default.createElement(_ItemHead2.default,{key:eId,table:table,title:title,values:values,inplace:inplace,__source:{fileName:_jsxFileName,lineNumber:15}})}))))};exports.default=(0,_reactRedux.connect)(_tables.getTables)(ItemList);

},{"ItemHead.jsx":150,"react":"react","react-redux":"react-redux","tables.js":134}],152:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _jsxFileName='/Users/dirk/github/dariah/client/src/js/app/pure/ItemRecordPre.jsx';var _react=require('react');var _react2=_interopRequireDefault(_react);var _ItemRecord=require('ItemRecord.jsx');var _ItemRecord2=_interopRequireDefault(_ItemRecord);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var ItemRecordPre=function ItemRecordPre(_ref){var _ref$params=_ref.params,table=_ref$params.table,eId=_ref$params.eId,ownOnly=_ref.route.ownOnly;return _react2.default.createElement(_ItemRecord2.default,{table:table,eId:eId,ownOnly:ownOnly,__source:{fileName:_jsxFileName,lineNumber:6}})};exports.default=ItemRecordPre;

},{"ItemRecord.jsx":164,"react":"react"}],153:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _extends2=require('babel-runtime/helpers/extends');var _extends3=_interopRequireDefault(_extends2);var _jsxFileName='/Users/dirk/github/dariah/client/src/js/app/pure/NavLink.jsx';var _react=require('react');var _react2=_interopRequireDefault(_react);var _reactRouter=require('react-router');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var NavLink=function NavLink(props){return _react2.default.createElement(_reactRouter.Link,(0,_extends3.default)({},props,{activeClassName:'active',__source:{fileName:_jsxFileName,lineNumber:4}}))};exports.default=NavLink;

},{"babel-runtime/helpers/extends":16,"react":"react","react-router":"react-router"}],154:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _jsxFileName='/Users/dirk/github/dariah/client/src/js/app/pure/NotFound.jsx';var _react=require('react');var _react2=_interopRequireDefault(_react);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var NotFound=function NotFound(_ref){var splat=_ref.params.splat;return _react2.default.createElement('h1',{__source:{fileName:_jsxFileName,lineNumber:3}},'404: ',_react2.default.createElement('code',{__source:{fileName:_jsxFileName,lineNumber:3}},splat),' not found on this site.')};exports.default=NotFound;

},{"react":"react"}],155:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _jsxFileName='/Users/dirk/github/dariah/client/src/js/app/pure/Pane.jsx';var _react=require('react');var _react2=_interopRequireDefault(_react);var _reactRedux=require('react-redux');var _win=require('win.js');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var Pane=function Pane(_ref){var format=_ref.format,position=_ref.position,children=_ref.children,height=_ref.height,width=_ref.width;return _react2.default.createElement('div',{className:format,style:(0,_win.columnStyle)(position,{height:height,width:width}),__source:{fileName:_jsxFileName,lineNumber:6}},children)};exports.default=(0,_reactRedux.connect)(_win.getWinDim)(Pane);

},{"react":"react","react-redux":"react-redux","win.js":135}],156:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _jsxFileName='/Users/dirk/github/dariah/client/src/js/app/pure/Root.jsx';var _react=require('react');var _react2=_interopRequireDefault(_react);var _reactRedux=require('react-redux');var _Window=require('Window.jsx');var _Window2=_interopRequireDefault(_Window);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var Root=function Root(_ref){var store=_ref.store,children=_ref.children;return _react2.default.createElement(_reactRedux.Provider,{store:store,__source:{fileName:_jsxFileName,lineNumber:6}},_react2.default.createElement(_Window2.default,{__source:{fileName:_jsxFileName,lineNumber:7}},children))};exports.default=Root;

},{"Window.jsx":167,"react":"react","react-redux":"react-redux"}],157:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _jsxFileName='/Users/dirk/github/dariah/client/src/js/app/pure/Stat.jsx';var _react=require('react');var _react2=_interopRequireDefault(_react);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var Stat=function Stat(_ref){var subTotal=_ref.subTotal,total=_ref.total;return _react2.default.createElement('span',{className:'good-o',__source:{fileName:_jsxFileName,lineNumber:4}},subTotal==null?'':''+subTotal,total==null||subTotal==null?'':' of ',_react2.default.createElement('strong',{__source:{fileName:_jsxFileName,lineNumber:7}},total==null?'':''+total))};exports.default=Stat;

},{"react":"react"}],158:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _jsxFileName='/Users/dirk/github/dariah/client/src/js/app/pure/Static.jsx';var _react=require('react');var _react2=_interopRequireDefault(_react);var _NavLink=require('NavLink.jsx');var _NavLink2=_interopRequireDefault(_NavLink);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var Static=function Static(){return _react2.default.createElement('span',{className:'small',__source:{fileName:_jsxFileName,lineNumber:5}},_react2.default.createElement(_NavLink2.default,{to:'/docs/about.md',__source:{fileName:_jsxFileName,lineNumber:6}},'About'),_react2.default.createElement(_NavLink2.default,{to:'/tech/docs/design.pdf',__source:{fileName:_jsxFileName,lineNumber:7}},'diagrams'),_react2.default.createElement(_NavLink2.default,{to:'/tech/docs/deploy.md',__source:{fileName:_jsxFileName,lineNumber:8}},'deploy'),_react2.default.createElement('a',{href:'/api/file/tech/docs/gen/index.html',target:'_blank',rel:'noopener noreferrer',__source:{fileName:_jsxFileName,lineNumber:9}},'tech doc'))};exports.default=Static;

},{"NavLink.jsx":153,"react":"react"}],159:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _jsxFileName='/Users/dirk/github/dariah/client/src/js/app/pure/SubApp.jsx';var _react=require('react');var _react2=_interopRequireDefault(_react);var _reactRedux=require('react-redux');var _NavLink=require('NavLink.jsx');var _NavLink2=_interopRequireDefault(_NavLink);var _Pane=require('Pane.jsx');var _Pane2=_interopRequireDefault(_Pane);var _win=require('win.js');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var SubApp=function SubApp(_ref){var table=_ref.params.table,children=_ref.children,height=_ref.height,width=_ref.width;return _react2.default.createElement('div',{__source:{fileName:_jsxFileName,lineNumber:8}},_react2.default.createElement(_Pane2.default,{format:'nav sized',position:'left',__source:{fileName:_jsxFileName,lineNumber:9}},table=='contrib'?_react2.default.createElement('div',{__source:{fileName:_jsxFileName,lineNumber:11}},_react2.default.createElement('p',{__source:{fileName:_jsxFileName,lineNumber:12}},_react2.default.createElement(_NavLink2.default,{to:'/'+table+'/list',__source:{fileName:_jsxFileName,lineNumber:12}},'All items')),_react2.default.createElement('p',{__source:{fileName:_jsxFileName,lineNumber:13}},_react2.default.createElement(_NavLink2.default,{to:'/'+table+'/mylist',__source:{fileName:_jsxFileName,lineNumber:13}},'My work'))):_react2.default.createElement('div',{__source:{fileName:_jsxFileName,lineNumber:16}},_react2.default.createElement('p',{__source:{fileName:_jsxFileName,lineNumber:17}},_react2.default.createElement(_NavLink2.default,{to:'/'+table+'/type',__source:{fileName:_jsxFileName,lineNumber:17}},'Types')),_react2.default.createElement('p',{__source:{fileName:_jsxFileName,lineNumber:18}},_react2.default.createElement(_NavLink2.default,{to:'/'+table+'/assess',__source:{fileName:_jsxFileName,lineNumber:18}},'Criteria')),_react2.default.createElement('p',{__source:{fileName:_jsxFileName,lineNumber:19}},_react2.default.createElement(_NavLink2.default,{to:'/'+table+'/package',__source:{fileName:_jsxFileName,lineNumber:19}},'Packages')))),_react2.default.createElement(_Pane2.default,{format:'sized',position:'right',__source:{fileName:_jsxFileName,lineNumber:23}},children))};exports.default=(0,_reactRedux.connect)(_win.getWinDim)(SubApp);

},{"NavLink.jsx":153,"Pane.jsx":155,"react":"react","react-redux":"react-redux","win.js":135}],160:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _getPrototypeOf=require('babel-runtime/core-js/object/get-prototype-of');var _getPrototypeOf2=_interopRequireDefault(_getPrototypeOf);var _classCallCheck2=require('babel-runtime/helpers/classCallCheck');var _classCallCheck3=_interopRequireDefault(_classCallCheck2);var _createClass2=require('babel-runtime/helpers/createClass');var _createClass3=_interopRequireDefault(_createClass2);var _possibleConstructorReturn2=require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3=_interopRequireDefault(_possibleConstructorReturn2);var _inherits2=require('babel-runtime/helpers/inherits');var _inherits3=_interopRequireDefault(_inherits2);var _jsxFileName='/Users/dirk/github/dariah/client/src/js/app/state/DocMd.jsx';var _react=require('react');var _react2=_interopRequireDefault(_react);var _reactRedux=require('react-redux');var _reactMarkdown=require('react-markdown');var _reactMarkdown2=_interopRequireDefault(_reactMarkdown);var _reactRouter=require('react-router');var _Alternative=require('Alternative.jsx');var _Alternative2=_interopRequireDefault(_Alternative);var _server=require('server.js');var _doc=require('doc.js');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var RouterLink=function RouterLink(_ref){var children=_ref.children,href=_ref.href;return href.match(/^(https?:)?\/\//)?_react2.default.createElement('a',{href:href,__source:{fileName:_jsxFileName,lineNumber:11}},children):_react2.default.createElement(_reactRouter.Link,{to:href,__source:{fileName:_jsxFileName,lineNumber:12}},children)};var DocMd=function(_Component){(0,_inherits3.default)(DocMd,_Component);function DocMd(){(0,_classCallCheck3.default)(this,DocMd);return(0,_possibleConstructorReturn3.default)(this,(DocMd.__proto__||(0,_getPrototypeOf2.default)(DocMd)).apply(this,arguments))}(0,_createClass3.default)(DocMd,[{key:'render',value:function render(){var _props=this.props,docName=_props.docName,data=_props.data;var controlPlacement=function controlPlacement(control){return _react2.default.createElement('p',{style:{float:'right'},__source:{fileName:_jsxFileName,lineNumber:18}},control)};var control1=function control1(handler){return _react2.default.createElement('a',{className:'control fa fa-hand-o-down',href:'#',title:'markdown source',onClick:handler,__source:{fileName:_jsxFileName,lineNumber:19}})};var control2=function control2(handler){return _react2.default.createElement('a',{className:'control fa fa-file-code-o',href:'#',title:'formatted',onClick:handler,__source:{fileName:_jsxFileName,lineNumber:20}})};if(data==null){return _react2.default.createElement('div',{__source:{fileName:_jsxFileName,lineNumber:23}},'No document '+docName)}return _react2.default.createElement('div',{style:{paddingLeft:'0.5em'},__source:{fileName:_jsxFileName,lineNumber:26}},_react2.default.createElement(_Alternative2.default,{tag:docName,controlPlacement:controlPlacement,controls:[control1,control2],alternatives:[_react2.default.createElement('div',{key:'fmt',__source:{fileName:_jsxFileName,lineNumber:32}},_react2.default.createElement(_reactMarkdown2.default,{source:data,renderers:{Link:RouterLink},__source:{fileName:_jsxFileName,lineNumber:33}})),_react2.default.createElement('div',{key:'src',__source:{fileName:_jsxFileName,lineNumber:39}},_react2.default.createElement('pre',{className:'md-source',__source:{fileName:_jsxFileName,lineNumber:40}},data))],__source:{fileName:_jsxFileName,lineNumber:27}}))}},{key:'componentDidMount',value:function componentDidMount(){var _props2=this.props,docDir=_props2.docDir,docName=_props2.docName,docExt=_props2.docExt,fetch=_props2.fetch;var path=docDir+'/'+docName+'.'+docExt;fetch({type:'fetchDoc',contentType:'json',path:path,desc:'document '+docName})}}]);return DocMd}(_react.Component);exports.default=(0,_reactRedux.connect)(_doc.getDoc,{fetch:_server.fetchData})(DocMd);

},{"Alternative.jsx":139,"babel-runtime/core-js/object/get-prototype-of":8,"babel-runtime/helpers/classCallCheck":13,"babel-runtime/helpers/createClass":14,"babel-runtime/helpers/inherits":17,"babel-runtime/helpers/possibleConstructorReturn":19,"doc.js":128,"react":"react","react-markdown":"react-markdown","react-redux":"react-redux","react-router":"react-router","server.js":133}],161:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _getPrototypeOf=require('babel-runtime/core-js/object/get-prototype-of');var _getPrototypeOf2=_interopRequireDefault(_getPrototypeOf);var _classCallCheck2=require('babel-runtime/helpers/classCallCheck');var _classCallCheck3=_interopRequireDefault(_classCallCheck2);var _createClass2=require('babel-runtime/helpers/createClass');var _createClass3=_interopRequireDefault(_createClass2);var _possibleConstructorReturn2=require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3=_interopRequireDefault(_possibleConstructorReturn2);var _inherits2=require('babel-runtime/helpers/inherits');var _inherits3=_interopRequireDefault(_inherits2);var _jsxFileName='/Users/dirk/github/dariah/client/src/js/app/state/FilterCompute.jsx';var _react=require('react');var _react2=_interopRequireDefault(_react);var _reactRedux=require('react-redux');var _ItemList=require('ItemList.jsx');var _ItemList2=_interopRequireDefault(_ItemList);var _Filter=require('Filter.jsx');var _Filter2=_interopRequireDefault(_Filter);var _Pane=require('Pane.jsx');var _Pane2=_interopRequireDefault(_Pane);var _filter=require('filter.js');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var FilterCompute=function(_Component){(0,_inherits3.default)(FilterCompute,_Component);function FilterCompute(props){(0,_classCallCheck3.default)(this,FilterCompute);var _this=(0,_possibleConstructorReturn3.default)(this,(FilterCompute.__proto__||(0,_getPrototypeOf2.default)(FilterCompute)).call(this));var tables=props.tables,table=props.table,initialized=props.initialized,init=props.init;if(!initialized){init(table,tables)}return _this}(0,_createClass3.default)(FilterCompute,[{key:'render',value:function render(){var initialized=this.props.initialized;if(!initialized){return _react2.default.createElement('div',{__source:{fileName:_jsxFileName,lineNumber:17}})}var _props=this.props,tables=_props.tables,table=_props.table,filteredData=_props.filteredData,filteredAmountOthers=_props.filteredAmountOthers,amounts=_props.amounts;var _tables$table=tables[table],order=_tables$table.order,title=_tables$table.title;return _react2.default.createElement('div',{__source:{fileName:_jsxFileName,lineNumber:21}},_react2.default.createElement(_Pane2.default,{format:'sized',position:'rightLeft',__source:{fileName:_jsxFileName,lineNumber:22}},_react2.default.createElement('p',{__source:{fileName:_jsxFileName,lineNumber:23}},'Total ',_react2.default.createElement('span',{className:'good-o',__source:{fileName:_jsxFileName,lineNumber:23}},order.length)),_react2.default.createElement(_Filter2.default,{table:table,filteredAmount:filteredData.length,filteredAmountOthers:filteredAmountOthers,amounts:amounts,__source:{fileName:_jsxFileName,lineNumber:24}})),_react2.default.createElement(_Pane2.default,{format:'sized',position:'rightRight',__source:{fileName:_jsxFileName,lineNumber:31}},_react2.default.createElement(_ItemList2.default,{table:table,title:title,filteredData:filteredData,inplace:true,__source:{fileName:_jsxFileName,lineNumber:32}})))}}]);return FilterCompute}(_react.Component);exports.default=(0,_reactRedux.connect)(_filter.getFilterApplied,{init:_filter.setupFiltering})(FilterCompute);

},{"Filter.jsx":147,"ItemList.jsx":151,"Pane.jsx":155,"babel-runtime/core-js/object/get-prototype-of":8,"babel-runtime/helpers/classCallCheck":13,"babel-runtime/helpers/createClass":14,"babel-runtime/helpers/inherits":17,"babel-runtime/helpers/possibleConstructorReturn":19,"filter.js":129,"react":"react","react-redux":"react-redux"}],162:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _getPrototypeOf=require('babel-runtime/core-js/object/get-prototype-of');var _getPrototypeOf2=_interopRequireDefault(_getPrototypeOf);var _classCallCheck2=require('babel-runtime/helpers/classCallCheck');var _classCallCheck3=_interopRequireDefault(_classCallCheck2);var _createClass2=require('babel-runtime/helpers/createClass');var _createClass3=_interopRequireDefault(_createClass2);var _possibleConstructorReturn2=require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3=_interopRequireDefault(_possibleConstructorReturn2);var _inherits2=require('babel-runtime/helpers/inherits');var _inherits3=_interopRequireDefault(_inherits2);var _jsxFileName='/Users/dirk/github/dariah/client/src/js/app/state/ItemFiltered.jsx';var _react=require('react');var _react2=_interopRequireDefault(_react);var _reactRedux=require('react-redux');var _FilterCompute=require('FilterCompute.jsx');var _FilterCompute2=_interopRequireDefault(_FilterCompute);var _server=require('server.js');var _tables=require('tables.js');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var ItemFiltered=function(_Component){(0,_inherits3.default)(ItemFiltered,_Component);function ItemFiltered(){(0,_classCallCheck3.default)(this,ItemFiltered);return(0,_possibleConstructorReturn3.default)(this,(ItemFiltered.__proto__||(0,_getPrototypeOf2.default)(ItemFiltered)).apply(this,arguments))}(0,_createClass3.default)(ItemFiltered,[{key:'render',value:function render(){var _props=this.props,table=_props.params.table,tables=_props.tables;if(tables==null||tables[table]==null||tables.country==null||tables.user==null){return _react2.default.createElement('div',{__source:{fileName:_jsxFileName,lineNumber:12}})}return _react2.default.createElement(_FilterCompute2.default,{table:table,__source:{fileName:_jsxFileName,lineNumber:15}})}},{key:'componentDidMount',value:function componentDidMount(){var _props2=this.props,table=_props2.params.table,tables=_props2.tables,fetch=_props2.fetch;if(tables==null||tables[table]==null){fetch({type:'fetchTable',contentType:'db',path:'/list?table='+table,desc:table+' table',table:table})}if(tables==null||tables.country==null){fetch({type:'fetchTable',contentType:'db',path:'/member_country',desc:'country table',table:'country'})}if(tables==null||tables.user==null){fetch({type:'fetchTable',contentType:'db',path:'/user',desc:'user table',table:'user'})}}}]);return ItemFiltered}(_react.Component);exports.default=(0,_reactRedux.connect)(_tables.getTables,{fetch:_server.fetchData})(ItemFiltered);

},{"FilterCompute.jsx":161,"babel-runtime/core-js/object/get-prototype-of":8,"babel-runtime/helpers/classCallCheck":13,"babel-runtime/helpers/createClass":14,"babel-runtime/helpers/inherits":17,"babel-runtime/helpers/possibleConstructorReturn":19,"react":"react","react-redux":"react-redux","server.js":133,"tables.js":134}],163:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _getPrototypeOf=require('babel-runtime/core-js/object/get-prototype-of');var _getPrototypeOf2=_interopRequireDefault(_getPrototypeOf);var _classCallCheck2=require('babel-runtime/helpers/classCallCheck');var _classCallCheck3=_interopRequireDefault(_classCallCheck2);var _createClass2=require('babel-runtime/helpers/createClass');var _createClass3=_interopRequireDefault(_createClass2);var _possibleConstructorReturn2=require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3=_interopRequireDefault(_possibleConstructorReturn2);var _inherits2=require('babel-runtime/helpers/inherits');var _inherits3=_interopRequireDefault(_inherits2);var _jsxFileName='/Users/dirk/github/dariah/client/src/js/app/state/ItemMy.jsx';var _react=require('react');var _react2=_interopRequireDefault(_react);var _reactRedux=require('react-redux');var _server=require('server.js');var _tables=require('tables.js');var _ItemList=require('ItemList.jsx');var _ItemList2=_interopRequireDefault(_ItemList);var _Pane=require('Pane.jsx');var _Pane2=_interopRequireDefault(_Pane);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var ItemMy=function(_Component){(0,_inherits3.default)(ItemMy,_Component);function ItemMy(){(0,_classCallCheck3.default)(this,ItemMy);return(0,_possibleConstructorReturn3.default)(this,(ItemMy.__proto__||(0,_getPrototypeOf2.default)(ItemMy)).apply(this,arguments))}(0,_createClass3.default)(ItemMy,[{key:'render',value:function render(){var _props=this.props,table=_props.params.table,tables=_props.tables,children=_props.children;if(tables==null||tables[table]==null||tables[table].my==null||tables.country==null||tables.user==null){return _react2.default.createElement('div',{__source:{fileName:_jsxFileName,lineNumber:18}})}var _tables$table=tables[table],entities=_tables$table.entities,title=_tables$table.title,perm=_tables$table.perm,my=_tables$table.my;return _react2.default.createElement('div',{__source:{fileName:_jsxFileName,lineNumber:22}},_react2.default.createElement(_Pane2.default,{format:'nav sized',position:'rightLeftNav',__source:{fileName:_jsxFileName,lineNumber:23}},_react2.default.createElement('p',{__source:{fileName:_jsxFileName,lineNumber:24}},my.length+' items ',perm!=null&&perm.insert?_react2.default.createElement('span',{className:'fa fa-plus button-large insert',title:'New item',__source:{fileName:_jsxFileName,lineNumber:27}}):null),_react2.default.createElement(_ItemList2.default,{table:table,title:title,filteredData:my,inplace:false,__source:{fileName:_jsxFileName,lineNumber:33}})),_react2.default.createElement(_Pane2.default,{format:'sized',position:'rightRightBody',__source:{fileName:_jsxFileName,lineNumber:35}},children))}},{key:'componentDidMount',value:function componentDidMount(){var _props2=this.props,table=_props2.params.table,tables=_props2.tables,fetch=_props2.fetch;if(tables==null||tables[table]==null||tables[table].my==null){fetch({type:'fetchTableMy',contentType:'db',path:'/my?table='+table,desc:table+' table (my records)',table:table})}if(tables==null||tables.country==null){fetch({type:'fetchTable',contentType:'db',path:'/member_country',desc:'country table',table:'country'})}if(tables==null||tables.user==null){fetch({type:'fetchTable',contentType:'db',path:'/user',desc:'user table',table:'user'})}}}]);return ItemMy}(_react.Component);exports.default=(0,_reactRedux.connect)(_tables.getTables,{fetch:_server.fetchData})(ItemMy);

},{"ItemList.jsx":151,"Pane.jsx":155,"babel-runtime/core-js/object/get-prototype-of":8,"babel-runtime/helpers/classCallCheck":13,"babel-runtime/helpers/createClass":14,"babel-runtime/helpers/inherits":17,"babel-runtime/helpers/possibleConstructorReturn":19,"react":"react","react-redux":"react-redux","server.js":133,"tables.js":134}],164:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _extends2=require('babel-runtime/helpers/extends');var _extends3=_interopRequireDefault(_extends2);var _objectWithoutProperties2=require('babel-runtime/helpers/objectWithoutProperties');var _objectWithoutProperties3=_interopRequireDefault(_objectWithoutProperties2);var _getIterator2=require('babel-runtime/core-js/get-iterator');var _getIterator3=_interopRequireDefault(_getIterator2);var _getPrototypeOf=require('babel-runtime/core-js/object/get-prototype-of');var _getPrototypeOf2=_interopRequireDefault(_getPrototypeOf);var _classCallCheck2=require('babel-runtime/helpers/classCallCheck');var _classCallCheck3=_interopRequireDefault(_classCallCheck2);var _createClass2=require('babel-runtime/helpers/createClass');var _createClass3=_interopRequireDefault(_createClass2);var _possibleConstructorReturn2=require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3=_interopRequireDefault(_possibleConstructorReturn2);var _inherits2=require('babel-runtime/helpers/inherits');var _inherits3=_interopRequireDefault(_inherits2);var _jsxFileName='/Users/dirk/github/dariah/client/src/js/app/state/ItemRecord.jsx';var _react=require('react');var _react2=_interopRequireDefault(_react);var _reactRedux=require('react-redux');var _server=require('server.js');var _tables=require('tables.js');var _ItemField=require('ItemField.jsx');var _ItemField2=_interopRequireDefault(_ItemField);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var ItemRecord=function(_Component){(0,_inherits3.default)(ItemRecord,_Component);function ItemRecord(){var _ref;var _temp,_this,_ret;(0,_classCallCheck3.default)(this,ItemRecord);for(var _len=arguments.length,args=Array(_len),_key=0;_key<_len;_key++){args[_key]=arguments[_key]}return _ret=(_temp=(_this=(0,_possibleConstructorReturn3.default)(this,(_ref=ItemRecord.__proto__||(0,_getPrototypeOf2.default)(ItemRecord)).call.apply(_ref,[this].concat(args))),_this),_this.getEntity=function(){var _this2=_this,_this2$props=_this2.props,tables=_this2$props.tables,table=_this2$props.table,eId=_this2$props.eId;var entity=tables[table].entities[eId];return entity},_temp),(0,_possibleConstructorReturn3.default)(_this,_ret)}(0,_createClass3.default)(ItemRecord,[{key:'parseFields',value:function parseFields(){var _props=this.props,tables=_props.tables,table=_props.table,eId=_props.eId;var _tables$table=tables[table],fieldSpecs=_tables$table.fieldSpecs,fieldOrder=_tables$table.fieldOrder;var entity=this.getEntity();var perm=entity.perm,fields=entity.fields,values=entity.values;var fragments=[];var hasEditable=false;var _iteratorNormalCompletion=true;var _didIteratorError=false;var _iteratorError=undefined;try{for(var _iterator=(0,_getIterator3.default)(fieldOrder),_step;!(_iteratorNormalCompletion=(_step=_iterator.next()).done);_iteratorNormalCompletion=true){var name=_step.value;var f=fields[name];if(f==null){continue}var _fieldSpecs$name=fieldSpecs[name],label=_fieldSpecs$name.label,initial=_fieldSpecs$name.initial,specs=(0,_objectWithoutProperties3.default)(_fieldSpecs$name,['label','initial']);var editable=perm.update[name];if(editable){hasEditable=true}fragments.push(_react2.default.createElement(_ItemField2.default,(0,_extends3.default)({key:name,table:table,eId:eId,editable:!!editable,name:name,label:label,values:values[name],initial:initial},specs,{__source:{fileName:_jsxFileName,lineNumber:25}})))}}catch(err){_didIteratorError=true;_iteratorError=err}finally{try{if(!_iteratorNormalCompletion&&_iterator.return){_iterator.return()}}finally{if(_didIteratorError){throw _iteratorError}}}return{fragments:fragments,hasEditable:hasEditable}}},{key:'render',value:function render(){var _props2=this.props,tables=_props2.tables,table=_props2.table,eId=_props2.eId;if(this.needValues()){return _react2.default.createElement('div',{__source:{fileName:_jsxFileName,lineNumber:52}})}var entity=this.getEntity();var perm=entity.perm;var _parseFields=this.parseFields(),fragments=_parseFields.fragments,hasEditable=_parseFields.hasEditable;return _react2.default.createElement('div',{className:'widget-medium',__source:{fileName:_jsxFileName,lineNumber:59}},_react2.default.createElement('p',{__source:{fileName:_jsxFileName,lineNumber:60}},'record in ',table),_react2.default.createElement('p',{__source:{fileName:_jsxFileName,lineNumber:61}},hasEditable?[_react2.default.createElement('span',{key:'save',className:'button-large',__source:{fileName:_jsxFileName,lineNumber:63}},'Save'),perm.delete?_react2.default.createElement('span',{key:'delete',className:'fa fa-trash button-large delete',title:'delete this item',__source:{fileName:_jsxFileName,lineNumber:68}}):null]:null),_react2.default.createElement('div',{__source:{fileName:_jsxFileName,lineNumber:76}},fragments))}},{key:'fetchEntity',value:function fetchEntity(){var _props3=this.props,table=_props3.table,eId=_props3.eId,ownOnly=_props3.ownOnly,fetch=_props3.fetch;if(this.needValues()){fetch({type:'fetchItem',contentType:'db',path:'/view?table='+table+'&id='+eId+(ownOnly?'&own=true':''),desc:table+' record '+eId,table:table})}}},{key:'needValues',value:function needValues(){var _props4=this.props,tables=_props4.tables,table=_props4.table,eId=_props4.eId;return tables==null||tables[table]==null||tables[table].entities[eId]==null||!tables[table].entities[eId].complete}},{key:'componentDidMount',value:function componentDidMount(){if(this.needValues()){this.fetchEntity()}}},{key:'componentDidUpdate',value:function componentDidUpdate(prevProps){var prevTable=prevProps.table,prevEId=prevProps.eId;var _props5=this.props,table=_props5.table,eId=_props5.eId;if((table!=prevTable||eId!=prevEId)&&this.needValues()){this.fetchEntity()}}}]);return ItemRecord}(_react.Component);exports.default=(0,_reactRedux.connect)(_tables.getTables,{fetch:_server.fetchData})(ItemRecord);

},{"ItemField.jsx":149,"babel-runtime/core-js/get-iterator":2,"babel-runtime/core-js/object/get-prototype-of":8,"babel-runtime/helpers/classCallCheck":13,"babel-runtime/helpers/createClass":14,"babel-runtime/helpers/extends":16,"babel-runtime/helpers/inherits":17,"babel-runtime/helpers/objectWithoutProperties":18,"babel-runtime/helpers/possibleConstructorReturn":19,"react":"react","react-redux":"react-redux","server.js":133,"tables.js":134}],165:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _keys=require('babel-runtime/core-js/object/keys');var _keys2=_interopRequireDefault(_keys);var _getPrototypeOf=require('babel-runtime/core-js/object/get-prototype-of');var _getPrototypeOf2=_interopRequireDefault(_getPrototypeOf);var _classCallCheck2=require('babel-runtime/helpers/classCallCheck');var _classCallCheck3=_interopRequireDefault(_classCallCheck2);var _createClass2=require('babel-runtime/helpers/createClass');var _createClass3=_interopRequireDefault(_createClass2);var _possibleConstructorReturn2=require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3=_interopRequireDefault(_possibleConstructorReturn2);var _inherits2=require('babel-runtime/helpers/inherits');var _inherits3=_interopRequireDefault(_inherits2);var _jsxFileName='/Users/dirk/github/dariah/client/src/js/app/state/Login.jsx';var _react=require('react');var _react2=_interopRequireDefault(_react);var _reactRedux=require('react-redux');var _server=require('server.js');var _me=require('me.js');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var Login=function(_Component){(0,_inherits3.default)(Login,_Component);function Login(){(0,_classCallCheck3.default)(this,Login);return(0,_possibleConstructorReturn3.default)(this,(Login.__proto__||(0,_getPrototypeOf2.default)(Login)).apply(this,arguments))}(0,_createClass3.default)(Login,[{key:'render',value:function render(){var me=this.props.me;return _react2.default.createElement('span',{className:'login',__source:{fileName:_jsxFileName,lineNumber:10}},me.eppn&&(0,_keys2.default)(me).length>0?_react2.default.createElement('span',{__source:{fileName:_jsxFileName,lineNumber:12}},_react2.default.createElement('strong',{className:'fa fa-user',title:me.eppn,__source:{fileName:_jsxFileName,lineNumber:13}},me.eppn.split('@')[0]),_react2.default.createElement('span',{className:'fa fa-hashtag',__source:{fileName:_jsxFileName,lineNumber:14}}),me.authority,' ',_react2.default.createElement('em',{__source:{fileName:_jsxFileName,lineNumber:15}},me.groupDesc||'not authenticated'),_react2.default.createElement('a',{href:'/logout',className:'control fa fa-user-times',title:'log out',__source:{fileName:_jsxFileName,lineNumber:16}}),_react2.default.createElement('a',{href:'/slogout',className:'control fa fa-users',title:'sign out',__source:{fileName:_jsxFileName,lineNumber:17}})):_react2.default.createElement('a',{href:'/login',className:'control fa fa-user-plus',__source:{fileName:_jsxFileName,lineNumber:20}},' login'))}},{key:'componentDidMount',value:function componentDidMount(){var fetch=this.props.fetch;fetch({type:'fetchMe',contentType:'db',path:'/who/ami',desc:'me'})}}]);return Login}(_react.Component);exports.default=(0,_reactRedux.connect)(_me.getMe,{fetch:_server.fetchData})(Login);

},{"babel-runtime/core-js/object/get-prototype-of":8,"babel-runtime/core-js/object/keys":9,"babel-runtime/helpers/classCallCheck":13,"babel-runtime/helpers/createClass":14,"babel-runtime/helpers/inherits":17,"babel-runtime/helpers/possibleConstructorReturn":19,"me.js":130,"react":"react","react-redux":"react-redux","server.js":133}],166:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _getPrototypeOf=require('babel-runtime/core-js/object/get-prototype-of');var _getPrototypeOf2=_interopRequireDefault(_getPrototypeOf);var _classCallCheck2=require('babel-runtime/helpers/classCallCheck');var _classCallCheck3=_interopRequireDefault(_classCallCheck2);var _createClass2=require('babel-runtime/helpers/createClass');var _createClass3=_interopRequireDefault(_createClass2);var _possibleConstructorReturn2=require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3=_interopRequireDefault(_possibleConstructorReturn2);var _inherits2=require('babel-runtime/helpers/inherits');var _inherits3=_interopRequireDefault(_inherits2);var _jsxFileName='/Users/dirk/github/dariah/client/src/js/app/state/Notification.jsx';var _react=require('react');var _react2=_interopRequireDefault(_react);var _reactRedux=require('react-redux');var _notify=require('notify.js');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var Notification=function(_Component){(0,_inherits3.default)(Notification,_Component);function Notification(props){(0,_classCallCheck3.default)(this,Notification);var _this=(0,_possibleConstructorReturn3.default)(this,(Notification.__proto__||(0,_getPrototypeOf2.default)(Notification)).call(this,props));_this.refDom=function(label){return function(dom){if(dom){_this.dom[label]=dom}}};_this.dom={};return _this}(0,_createClass3.default)(Notification,[{key:'render',value:function render(){var _this2=this;var _props=this.props,notifications=_props.notifications,lastMsg=_props.lastMsg,lastNote=_props.lastNote,lastKind=_props.lastKind,busy=_props.busy,show=_props.show,display=_props.display,clear=_props.clear;var highlight=lastNote>-1;var busyBlocks=new Array(busy).fill(1);return _react2.default.createElement('div',{__source:{fileName:_jsxFileName,lineNumber:19}},_react2.default.createElement('p',{className:'msg-spinner',__source:{fileName:_jsxFileName,lineNumber:20}},_react2.default.createElement('span',{title:'show/hide notifications and progress messages',className:highlight?'spin-'+lastKind:'spin-ok',__source:{fileName:_jsxFileName,lineNumber:21}},busyBlocks.map(function(b,i){return _react2.default.createElement('span',{key:i,className:'msg-dot fa fa-caret-left',__source:{fileName:_jsxFileName,lineNumber:25}})}),_react2.default.createElement('span',{className:'fa fa-'+(busy==0?'circle-o':'spinner fa-spin'),onClick:function onClick(){return display(!show)},__source:{fileName:_jsxFileName,lineNumber:26}}))),show?_react2.default.createElement('div',{ref:this.refDom('notbox'),className:'msg-box',onClick:function onClick(){return display(false)},__source:{fileName:_jsxFileName,lineNumber:33}},notifications.map(function(msg,i){return _react2.default.createElement('p',{key:i,ref:_this2.refDom('m'+i),className:'msg-line '+[msg.kind]+'-o '+(msg.kind!='info'?'msg-high':''),__source:{fileName:_jsxFileName,lineNumber:39}},msg.text)}),_react2.default.createElement('p',{className:'msg-dismiss',__source:{fileName:_jsxFileName,lineNumber:46}},'(click panel to hide)'),_react2.default.createElement('p',{className:'msg-trash',__source:{fileName:_jsxFileName,lineNumber:47}},_react2.default.createElement('a',{href:'#',title:'clear messages',className:'control fa fa-trash',onClick:function onClick(){return clear()},__source:{fileName:_jsxFileName,lineNumber:48}}))):null)}},{key:'componentDidMount',value:function componentDidMount(){this.setView()}},{key:'componentDidUpdate',value:function componentDidUpdate(){this.setView()}},{key:'setView',value:function setView(on){var show=this.props.show;if(show){this.setScroll()}}},{key:'setScroll',value:function setScroll(){var show=this.props.show;if(show){var _props2=this.props,lastMsg=_props2.lastMsg,lastNote=_props2.lastNote;var highlight=lastNote>-1;if(highlight){this.dom['m'+lastNote].scrollIntoView()}else{if(lastMsg>-1){this.dom['m'+lastMsg].scrollIntoView()}}}}}]);return Notification}(_react.Component);exports.default=(0,_reactRedux.connect)(_notify.getNotifications,{clear:_notify.clear,display:_notify.display})(Notification);

},{"babel-runtime/core-js/object/get-prototype-of":8,"babel-runtime/helpers/classCallCheck":13,"babel-runtime/helpers/createClass":14,"babel-runtime/helpers/inherits":17,"babel-runtime/helpers/possibleConstructorReturn":19,"notify.js":131,"react":"react","react-redux":"react-redux"}],167:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _getPrototypeOf=require('babel-runtime/core-js/object/get-prototype-of');var _getPrototypeOf2=_interopRequireDefault(_getPrototypeOf);var _classCallCheck2=require('babel-runtime/helpers/classCallCheck');var _classCallCheck3=_interopRequireDefault(_classCallCheck2);var _createClass2=require('babel-runtime/helpers/createClass');var _createClass3=_interopRequireDefault(_createClass2);var _possibleConstructorReturn2=require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3=_interopRequireDefault(_possibleConstructorReturn2);var _inherits2=require('babel-runtime/helpers/inherits');var _inherits3=_interopRequireDefault(_inherits2);var _react=require('react');var _reactRedux=require('react-redux');var _throttle=require('lodash/throttle');var _throttle2=_interopRequireDefault(_throttle);var _win=require('win.js');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var Window=function(_Component){(0,_inherits3.default)(Window,_Component);function Window(){var _ref;var _temp,_this,_ret;(0,_classCallCheck3.default)(this,Window);for(var _len=arguments.length,args=Array(_len),_key=0;_key<_len;_key++){args[_key]=arguments[_key]}return _ret=(_temp=(_this=(0,_possibleConstructorReturn3.default)(this,(_ref=Window.__proto__||(0,_getPrototypeOf2.default)(Window)).call.apply(_ref,[this].concat(args))),_this),_this.newWindowSize=(0,_throttle2.default)(function(event){var _this2=_this,resize=_this2.props.resize;resize()},1000),_temp),(0,_possibleConstructorReturn3.default)(_this,_ret)}(0,_createClass3.default)(Window,[{key:'render',value:function render(){var children=this.props.children;return _react.Children.only(children)}},{key:'componentDidMount',value:function componentDidMount(){window.addEventListener('resize',this.newWindowSize)}},{key:'componentWillUnmount',value:function componentWillUnmount(){window.removeEventListener('resize',this.newWindowSize)}}]);return Window}(_react.Component);exports.default=(0,_reactRedux.connect)(_win.getWinDim,{resize:_win.changeWinDim})(Window);

},{"babel-runtime/core-js/object/get-prototype-of":8,"babel-runtime/helpers/classCallCheck":13,"babel-runtime/helpers/createClass":14,"babel-runtime/helpers/inherits":17,"babel-runtime/helpers/possibleConstructorReturn":19,"lodash/throttle":125,"react":"react","react-redux":"react-redux","win.js":135}]},{},[136])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL2FycmF5L2Zyb20uanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL2dldC1pdGVyYXRvci5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvaXMtaXRlcmFibGUuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9hc3NpZ24uanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9jcmVhdGUuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9kZWZpbmUtcHJvcGVydHkuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9lbnRyaWVzLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvZ2V0LXByb3RvdHlwZS1vZi5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2tleXMuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9zZXQtcHJvdG90eXBlLW9mLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9zeW1ib2wuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL3N5bWJvbC9pdGVyYXRvci5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2hlbHBlcnMvY2xhc3NDYWxsQ2hlY2suanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9oZWxwZXJzL2NyZWF0ZUNsYXNzLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvaGVscGVycy9kZWZpbmVQcm9wZXJ0eS5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2hlbHBlcnMvZXh0ZW5kcy5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2hlbHBlcnMvaW5oZXJpdHMuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9oZWxwZXJzL29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvaGVscGVycy9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvaGVscGVycy9zbGljZWRUb0FycmF5LmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvaGVscGVycy90b0NvbnN1bWFibGVBcnJheS5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2hlbHBlcnMvdHlwZW9mLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9hcnJheS9mcm9tLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9nZXQtaXRlcmF0b3IuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL2lzLWl0ZXJhYmxlLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvYXNzaWduLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvY3JlYXRlLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvZGVmaW5lLXByb3BlcnR5LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvZW50cmllcy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2dldC1wcm90b3R5cGUtb2YuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9rZXlzLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3Qvc2V0LXByb3RvdHlwZS1vZi5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vc3ltYm9sL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9zeW1ib2wvaXRlcmF0b3IuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2EtZnVuY3Rpb24uanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FkZC10by11bnNjb3BhYmxlcy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYW4tb2JqZWN0LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hcnJheS1pbmNsdWRlcy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY2xhc3NvZi5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY29mLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jb3JlLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jcmVhdGUtcHJvcGVydHkuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2N0eC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZGVmaW5lZC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZGVzY3JpcHRvcnMuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2RvbS1jcmVhdGUuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2VudW0tYnVnLWtleXMuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2VudW0ta2V5cy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZXhwb3J0LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19mYWlscy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZ2xvYmFsLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19oYXMuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2hpZGUuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2h0bWwuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2llOC1kb20tZGVmaW5lLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pb2JqZWN0LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pcy1hcnJheS1pdGVyLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pcy1hcnJheS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXMtb2JqZWN0LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pdGVyLWNhbGwuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXItY3JlYXRlLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pdGVyLWRlZmluZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlci1kZXRlY3QuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXItc3RlcC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlcmF0b3JzLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19rZXlvZi5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fbGlicmFyeS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fbWV0YS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWFzc2lnbi5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWNyZWF0ZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWRwLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZHBzLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZ29wZC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWdvcG4tZXh0LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZ29wbi5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWdvcHMuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1ncG8uanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1rZXlzLWludGVybmFsLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3Qta2V5cy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LXBpZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LXNhcC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LXRvLWFycmF5LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19wcm9wZXJ0eS1kZXNjLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19yZWRlZmluZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2V0LXByb3RvLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zZXQtdG8tc3RyaW5nLXRhZy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2hhcmVkLWtleS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2hhcmVkLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zdHJpbmctYXQuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWluZGV4LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1pbnRlZ2VyLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1pb2JqZWN0LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1sZW5ndGguanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLW9iamVjdC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8tcHJpbWl0aXZlLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL191aWQuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3drcy1kZWZpbmUuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3drcy1leHQuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3drcy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9jb3JlLmdldC1pdGVyYXRvci1tZXRob2QuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvY29yZS5nZXQtaXRlcmF0b3IuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvY29yZS5pcy1pdGVyYWJsZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYuYXJyYXkuZnJvbS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYuYXJyYXkuaXRlcmF0b3IuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5hc3NpZ24uanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5jcmVhdGUuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5kZWZpbmUtcHJvcGVydHkuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5nZXQtcHJvdG90eXBlLW9mLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3Qua2V5cy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LnNldC1wcm90b3R5cGUtb2YuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC50by1zdHJpbmcuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2LnN0cmluZy5pdGVyYXRvci5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYuc3ltYm9sLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNy5vYmplY3QuZW50cmllcy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczcuc3ltYm9sLmFzeW5jLWl0ZXJhdG9yLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNy5zeW1ib2wub2JzZXJ2YWJsZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy93ZWIuZG9tLml0ZXJhYmxlLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fZnJlZUdsb2JhbC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX3Jvb3QuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2RlYm91bmNlLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9pc09iamVjdC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvaXNPYmplY3RMaWtlLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9pc1N5bWJvbC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvbm93LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC90aHJvdHRsZS5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvdG9OdW1iZXIuanMiLCJzcmMvanMvYXBwL2R1eC9hbHRlci5qcyIsInNyYy9qcy9hcHAvZHV4L2RvYy5qcyIsInNyYy9qcy9hcHAvZHV4L2ZpbHRlci5qcyIsInNyYy9qcy9hcHAvZHV4L21lLmpzIiwic3JjL2pzL2FwcC9kdXgvbm90aWZ5LmpzIiwic3JjL2pzL2FwcC9kdXgvcmVkdWNlcnMuanMiLCJzcmMvanMvYXBwL2R1eC9zZXJ2ZXIuanMiLCJzcmMvanMvYXBwL2R1eC90YWJsZXMuanMiLCJzcmMvanMvYXBwL2R1eC93aW4uanMiLCJzcmMvanMvYXBwL21haW4uanN4Iiwic3JjL2pzL2FwcC9vYmplY3QvQ2hlY2tib3hJLmpzeCIsInNyYy9qcy9hcHAvb2JqZWN0L0VVTWFwLmpzeCIsInNyYy9qcy9hcHAvcHVyZS9BbHRlcm5hdGl2ZS5qc3giLCJzcmMvanMvYXBwL3B1cmUvQXBwLmpzeCIsInNyYy9qcy9hcHAvcHVyZS9CYWNrb2ZmaWNlLmpzeCIsInNyYy9qcy9hcHAvcHVyZS9CeVZhbHVlLmpzeCIsInNyYy9qcy9hcHAvcHVyZS9Eb2MuanN4Iiwic3JjL2pzL2FwcC9wdXJlL0RvY0h0bWwuanN4Iiwic3JjL2pzL2FwcC9wdXJlL0RvY1BkZi5qc3giLCJzcmMvanMvYXBwL3B1cmUvRmFjZXQuanN4Iiwic3JjL2pzL2FwcC9wdXJlL0ZpbHRlci5qc3giLCJzcmMvanMvYXBwL3B1cmUvRnVsbFRleHQuanN4Iiwic3JjL2pzL2FwcC9wdXJlL0l0ZW1GaWVsZC5qc3giLCJzcmMvanMvYXBwL3B1cmUvSXRlbUhlYWQuanN4Iiwic3JjL2pzL2FwcC9wdXJlL0l0ZW1MaXN0LmpzeCIsInNyYy9qcy9hcHAvcHVyZS9JdGVtUmVjb3JkUHJlLmpzeCIsInNyYy9qcy9hcHAvcHVyZS9OYXZMaW5rLmpzeCIsInNyYy9qcy9hcHAvcHVyZS9Ob3RGb3VuZC5qc3giLCJzcmMvanMvYXBwL3B1cmUvUGFuZS5qc3giLCJzcmMvanMvYXBwL3B1cmUvUm9vdC5qc3giLCJzcmMvanMvYXBwL3B1cmUvU3RhdC5qc3giLCJzcmMvanMvYXBwL3B1cmUvU3RhdGljLmpzeCIsInNyYy9qcy9hcHAvcHVyZS9TdWJBcHAuanN4Iiwic3JjL2pzL2FwcC9zdGF0ZS9Eb2NNZC5qc3giLCJzcmMvanMvYXBwL3N0YXRlL0ZpbHRlckNvbXB1dGUuanN4Iiwic3JjL2pzL2FwcC9zdGF0ZS9JdGVtRmlsdGVyZWQuanN4Iiwic3JjL2pzL2FwcC9zdGF0ZS9JdGVtTXkuanN4Iiwic3JjL2pzL2FwcC9zdGF0ZS9JdGVtUmVjb3JkLmpzeCIsInNyYy9qcy9hcHAvc3RhdGUvTG9naW4uanN4Iiwic3JjL2pzL2FwcC9zdGF0ZS9Ob3RpZmljYXRpb24uanN4Iiwic3JjL2pzL2FwcC9zdGF0ZS9XaW5kb3cuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7O0FDQUE7O0FDQUE7O0FDQUE7O0FDQUE7O0FDQUE7O0FDQUE7O0FDQUE7O0FDQUE7O0FDQUE7O0FDQUE7O0FDQUE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7O0FDRkE7QUFDQTtBQUNBOztBQ0ZBO0FBQ0E7QUFDQTs7QUNGQTtBQUNBOztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBOztBQ0RBO0FBQ0E7O0FDREE7QUFDQTs7QUNEQTtBQUNBOztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBOztBQ0ZBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTs7QUNBQTtBQUNBO0FBQ0E7O0FDRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBOztBQ0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7O0FDRkE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakNBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTs7QUNGQTtBQUNBO0FBQ0E7O0FDRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7O0FDRkE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMU9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTs7QUNBQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1TEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzsyYUM3RE8sR0FBTSx5QkFBVSxRQUFWLFFBQVUsQ0FBQyxHQUFELENBQU0sS0FBTixDQUFhLE9BQWIsUUFBMEIsQ0FBRSxLQUFNLFNBQVIsQ0FBbUIsT0FBbkIsQ0FBd0IsV0FBeEIsQ0FBK0IsZUFBL0IsQ0FBMUIsQ0FBaEIsQyxnQkFJUSxVQUErQyxJQUE5QyxNQUE4QywyREFBdEMsRUFBc0MsMEJBQWhDLEtBQWdDLE1BQWhDLElBQWdDLENBQTFCLEdBQTBCLE1BQTFCLEdBQTBCLENBQXJCLE9BQXFCLE1BQXJCLE9BQXFCLENBQVosS0FBWSxNQUFaLEtBQVksQ0FDNUQsT0FBUSxJQUFSLEVBQ0UsSUFBSyxTQUFMLENBQWdCLGdCQUM2QixLQUQ3QixDQUNMLEdBREssRUFDQyxNQURELHdCQUNXLFNBQVcsQ0FEdEIsWUFFZCxHQUFNLFFBQVMsQ0FBQyxPQUFTLENBQVYsRUFBZSxLQUE5QixDQUNBLCtCQUFZLEtBQVosaUNBQW9CLEdBQXBCLENBQTBCLE1BQTFCLEVBQ0QsQ0FDRCxRQUFTLE1BQU8sTUFBUCxDQU5YLENBUUQsQyxDQUlNLEdBQU0sdUJBQVMsUUFBVCxPQUFTLGFBQWlDLElBQTlCLE1BQThCLE9BQTlCLEtBQThCLElBQW5CLElBQW1CLE9BQW5CLEdBQW1CLENBQWQsT0FBYyxPQUFkLE9BQWMsZ0JBQ2YsS0FEZSxDQUM1QyxHQUQ0QyxFQUN0QyxHQURzQyx3QkFDaEMsU0FBVyxDQURxQixZQUVyRCxNQUFPLENBQUUsT0FBRixDQUNSLENBSE07OzsyYUNmUSxVQUFzQyxJQUFyQyxNQUFxQywyREFBN0IsRUFBNkIsMEJBQXZCLEtBQXVCLE1BQXZCLElBQXVCLENBQWpCLElBQWlCLE1BQWpCLElBQWlCLENBQVgsSUFBVyxNQUFYLElBQVcsQ0FDbkQsT0FBUSxJQUFSLEVBQ0UsSUFBSyxVQUFMLENBQWlCLENBQ2YsR0FBSSxNQUFRLElBQVosQ0FBa0IsQ0FBQywrQkFBWSxLQUFaLGlDQUFvQixJQUFwQixDQUEyQixJQUEzQixFQUFrQyxDQUNyRCwrQkFBWSxLQUFaLGlDQUFvQixJQUFwQixDQUEyQixJQUEzQixFQUNELENBQ0QsUUFBUyxNQUFPLE1BQVAsQ0FMWCxDQU9ELEMsQ0FJTSxHQUFNLHVCQUFTLFFBQVQsT0FBUyxhQUEwQyxJQUF2QyxJQUF1QyxPQUF2QyxHQUF1QyxJQUE5QixPQUE4QixPQUE5QixNQUE4QixDQUF0QixPQUFzQixPQUF0QixPQUFzQixDQUFiLE1BQWEsT0FBYixNQUFhLENBQzlELE1BQU8sQ0FBRSxLQUFNLElBQU8sTUFBUCxLQUFpQixPQUFqQixLQUE0QixNQUE1QixDQUFSLENBQ1IsQ0FGTTs7O212Q0NuQlAscUMsbUlBSU8sR0FBTSx1Q0FBaUIsUUFBakIsZUFBaUIsQ0FBQyxRQUFELENBQVcsWUFBWCxRQUE2QixDQUFFLEtBQU0sVUFBUixDQUFvQixpQkFBcEIsQ0FBOEIsS0FBTSxZQUFwQyxDQUE3QixDQUF2QixDQUNBLEdBQU0saUNBQWMsUUFBZCxZQUFjLENBQUMsUUFBRCxDQUFXLE9BQVgsQ0FBb0IsS0FBcEIsUUFBK0IsQ0FBRSxLQUFNLE9BQVIsQ0FBaUIsaUJBQWpCLENBQTJCLEtBQU0sQ0FBQyxPQUFELENBQVUsS0FBVixDQUFqQyxDQUEvQixDQUFwQixDQUNBLEdBQU0sdUNBQWlCLFFBQWpCLGVBQWlCLENBQUMsUUFBRCxDQUFXLEtBQVgsUUFBc0IsQ0FBRSxLQUFNLFVBQVIsQ0FBb0IsaUJBQXBCLENBQThCLEtBQU0sS0FBcEMsQ0FBdEIsQ0FBdkIsQ0FFQSxHQUFNLHVDQUFpQixRQUFqQixlQUFpQixDQUFDLEtBQUQsQ0FBUSxNQUFSLFFBQW1CLG1CQUFZLENBQzNELEdBQU0sYUFBYyx1QkFBUyxHQUFULENBQWMsa0JBQWQsQ0FBa0MsQ0FBQyxLQUFELENBQWxDLENBQTJDLENBQUMsTUFBRCxDQUEzQyxDQUFwQixDQUNBLEdBQU0sZ0JBQWlCLHVCQUFTLEdBQVQsQ0FBYyxlQUFkLENBQStCLENBQUMsS0FBRCxDQUEvQixDQUF3QyxDQUFDLE1BQUQsQ0FBUyxXQUFULENBQXhDLENBQXZCLENBQ0EsU0FBUyxDQUFFLEtBQU0sZ0JBQVIsQ0FBMEIsNkJBQTFCLENBQVQsQ0FDRCxDQUo2QixDQUF2QixDLGdCQVFRLFVBRzBCLElBSHpCLE1BR3lCLDJEQUhuQixDQUNwQixlQUFnQixFQURJLENBRXBCLFlBQWEsS0FGTyxDQUdtQiwwQkFBcEMsS0FBb0MsTUFBcEMsSUFBb0MsQ0FBOUIsUUFBOEIsTUFBOUIsUUFBOEIsQ0FBcEIsSUFBb0IsTUFBcEIsSUFBb0IsQ0FBWCxJQUFXLHdFQUN2QyxPQUFRLElBQVIsRUFDRSxJQUFLLGdCQUFMLENBQXVCLENBQ3JCLCtCQUFZLEtBQVosQ0FBc0IsSUFBdEIsRUFBNEIsWUFBYSxJQUF6QyxFQUNELENBQ0QsSUFBSyxVQUFMLENBQWlCLENBQ2YsK0JBQ0ssS0FETCxFQUVFLHdDQUNLLE1BQU0sY0FEWCxpQ0FFRyxRQUZILENBRWMsSUFGZCxFQUZGLEVBT0QsQ0FDRCxJQUFLLFVBQUwsQ0FBaUIsQ0FDZixHQUFNLGNBQWUsRUFBckIsQ0FDQSxtQkFBWSxNQUFNLGNBQU4sQ0FBcUIsUUFBckIsQ0FBWixFQUE0QyxPQUE1QyxDQUFvRCxpQkFBVyxDQUFDLGFBQWEsT0FBYixFQUF3QixJQUFLLENBQTdGLEVBQ0EsK0JBQ0ssS0FETCxFQUVFLHdDQUNLLE1BQU0sY0FEWCxpQ0FFRyxRQUZILENBRWMsWUFGZCxFQUZGLEVBT0QsQ0FDRCxJQUFLLE9BQUwsQ0FBYyx1Q0FDcUIsSUFEckIsSUFDTCxPQURLLFVBQ0ksYUFESixVQUVaLCtCQUNLLEtBREwsRUFFRSx3Q0FDSyxNQUFNLGNBRFgsaUNBRUcsUUFGSCwwQkFHTyxNQUFNLGNBQU4sQ0FBcUIsUUFBckIsQ0FIUCxpQ0FJSyxPQUpMLENBSWUsYUFKZixJQUZGLEVBVUQsQ0FDRCxRQUFTLE1BQU8sTUFBUCxDQXJDWCxDQXVDRCxDLENBSU0sR0FBTSwyQ0FBbUIsUUFBbkIsaUJBQW1CLGlCQUFhLGVBQWIsT0FBRyxNQUFILENBQWEsY0FBYixJQUFtQyxTQUFuQyxPQUFtQyxRQUFuQyxPQUFtRCxDQUNqRixjQUFlLGVBQWUsUUFBZixDQURrRSxDQUFuRCxDQUF6QixDQUlBLEdBQU0sdUNBQWlCLFFBQWpCLGVBQWlCLGlCQUFHLE9BQUgsT0FBRyxNQUFILElBQWUsTUFBZixPQUFlLEtBQWYsQ0FBc0IsV0FBdEIsT0FBc0IsV0FBdEIsT0FBeUMsQ0FDckUsWUFBYSx1QkFBUyxHQUFULENBQWMsa0JBQWQsQ0FBa0MsQ0FBQyxLQUFELENBQWxDLENBQTJDLENBQUMsTUFBRCxDQUEzQyxFQUFxRCxXQUFyRCxDQUR3RCxDQUF6QyxDQUF2QixDQUlBLEdBQU0sMkNBQW1CLFFBQW5CLGlCQUFtQixhQUFvRSxJQUFqRSxPQUFpRSxPQUFqRSxNQUFpRSxvQkFBekQsTUFBeUQsQ0FBL0MsY0FBK0MsY0FBL0MsY0FBK0MsQ0FBL0IsV0FBK0IsY0FBL0IsV0FBK0IsSUFBWixNQUFZLE9BQVosS0FBWSxDQUNsRyxHQUFNLGFBQWMsdUJBQVMsR0FBVCxDQUFjLGtCQUFkLENBQWtDLENBQUMsS0FBRCxDQUFsQyxDQUEyQyxDQUFDLE1BQUQsQ0FBM0MsQ0FBcEIsQ0FDQSxHQUFJLFdBQUosQ0FBaUIsQ0FDZiw2QkFDRSxhQURGLENBRUUsdUJBRkYsQ0FHRSx1QkFIRixDQUlFLDZCQUpGLEVBS0ssaUJBQWlCLEtBQWpCLENBQXdCLE1BQXhCLENBQWdDLFdBQWhDLENBQTZDLGNBQTdDLENBTEwsQ0FPRCxDQVJELElBU0ssQ0FDSCxNQUFPLENBQ0wsYUFESyxDQUVMLHVCQUZLLENBR0wsdUJBSEssQ0FLUixDQUNGLENBbEJNLEMsR0FzQkQsbUIsMEZBQ0osZ0IsQ0FBbUIsU0FBQyxLQUFELENBQVEsTUFBUixDQUFtQixtQkFDeUIsTUFEekIsQ0FDM0IsS0FEMkIsRUFDakIsUUFEaUIsZUFDakIsUUFEaUIsQ0FDUCxLQURPLGVBQ1AsS0FETyxDQUNBLE1BREEsZUFDQSxNQURBLENBQ1EsVUFEUixlQUNRLFVBRFIsQ0FFcEMsR0FBTSxtQkFBb0IsV0FBVyxNQUFYLENBQWtCLGtCQUFLLFFBQU8sRUFBRSxLQUFULENBQUwsQ0FBbEIsQ0FBMUIsQ0FDQSxHQUFNLGNBQWUsa0JBQWtCLE1BQWxCLENBQXlCLGtCQUFLLEdBQUUsSUFBRixHQUFXLFVBQWhCLENBQXpCLEVBQXFELEdBQXJELENBQXlELGtCQUFLLEdBQUUsS0FBUCxDQUF6RCxDQUFyQixDQUNBLEdBQU0sYUFBYyxFQUFwQixDQUpvQyxnR0FLcEMsNENBQWdCLFlBQWhCLGtHQUE4QixJQUFuQixFQUFtQixhQUM1QixZQUFZLENBQVosa0NBQW1CLEVBQW5CLENBQXdCLFFBQXhCLENBQ0QsQ0FQbUMsK1JBUXBDLDZDQUFrQixLQUFsQix1R0FBeUIsSUFBZCxJQUFjLGNBQ3ZCLEdBQU0sUUFBUyxTQUFTLEdBQVQsQ0FBZixDQUR1QixtR0FFdkIsNkNBQW9CLFlBQXBCLHVHQUFrQyxJQUF2QixNQUF1QixjQUNoQyxHQUFNLGNBQWUsWUFBWSxLQUFaLENBQXJCLENBRGdDLEdBRUwsUUFGSyxDQUVTLE1BRlQsQ0FFeEIsTUFGd0IsQ0FFYixLQUZhLEVBR2hDLEdBQUksU0FBVyxJQUFYLEVBQW1CLFFBQVEsTUFBUixHQUFtQixDQUExQyxDQUE2QyxvR0FDM0MsNkNBQThDLE9BQTlDLHVHQUF1RCwyQkFBdEMsUUFBc0MsT0FBM0MsR0FBMkMsQ0FBdEIsUUFBc0IsT0FBN0IsS0FBNkIsQ0FDckQsYUFBYSxPQUFiLEVBQXdCLFFBQ3pCLENBSDBDLG1NQUk1QyxDQUNGLENBVnNCLG1NQVd4QixDQW5CbUMsbU1Bb0JwQyxNQUFPLFlBQ1IsQyxNQUNELGEsQ0FBZ0IsU0FBQyxLQUFELENBQVEsTUFBUixDQUFnQixXQUFoQixDQUFnQyxvQkFDZSxNQURmLENBQ3JDLEtBRHFDLEVBQzNCLFFBRDJCLGdCQUMzQixRQUQyQixDQUNqQixLQURpQixnQkFDakIsS0FEaUIsQ0FDVixNQURVLGdCQUNWLE1BRFUsQ0FDRixVQURFLGdCQUNGLFVBREUsQ0FFOUMsR0FBTSxtQkFBb0IsV0FBVyxNQUFYLENBQWtCLGtCQUFLLFFBQU8sRUFBRSxLQUFULENBQUwsQ0FBbEIsQ0FBMUIsQ0FDQSxHQUFNLGdCQUFpQixFQUF2QixDQUNBLGtCQUFrQixPQUFsQixDQUEwQixTQUFDLFVBQUQsQ0FBYSxRQUFiLENBQTBCLENBQ2xELEdBQUksV0FBVyxJQUFYLEVBQW1CLFVBQXZCLENBQW1DLENBQ2pDLGVBQWUsUUFBZixFQUEyQixFQUM1QixDQUZELElBR0ssQ0FDSCxHQUFNLFFBQVMsRUFBZixDQUNBLG1CQUFZLFlBQVksV0FBVyxLQUF2QixDQUFaLEVBQTJDLE9BQTNDLENBQW1ELGlCQUFXLENBQUMsT0FBTyxPQUFQLEVBQWtCLElBQUssQ0FBdEYsRUFDQSxlQUFlLFFBQWYsRUFBMkIsTUFDNUIsQ0FDRixDQVRELEVBVUEsTUFBTyxlQUNSLEMsRUFFSCxHQUFNLEtBQU0sR0FBSSxtQkFBaEIsQ0FFQSxHQUFNLGtCQUFtQixRQUFuQixpQkFBbUIsQ0FBQyxLQUFELENBQVEsTUFBUixDQUFnQixXQUFoQixDQUE2QixjQUE3QixDQUFnRCxvQkFDVixNQURVLENBQzlELEtBRDhELEVBQ3BELFFBRG9ELGdCQUNwRCxRQURvRCxDQUMxQyxLQUQwQyxnQkFDMUMsS0FEMEMsQ0FDbkMsTUFEbUMsZ0JBQ25DLE1BRG1DLENBQzNCLFVBRDJCLGdCQUMzQixVQUQyQixDQUV2RSxHQUFNLG1CQUFvQixXQUFXLE1BQVgsQ0FBa0Isa0JBQUssUUFBTyxFQUFFLEtBQVQsQ0FBTCxDQUFsQixDQUExQixDQUNBLEdBQU0sY0FBZSxFQUFyQixDQUNBLEdBQU0sbUJBQW9CLEVBQTFCLENBQ0Esa0JBQWtCLE9BQWxCLENBQTBCLFNBQUMsVUFBRCxDQUFhLFFBQWIsQ0FBMEIsQ0FDbEQsYUFBYSxRQUFiLEVBQXlCLENBQUMsV0FBVyxJQUFYLEdBQW9CLFVBQXBCLENBQWlDLGFBQWpDLENBQWlELFVBQWxELEVBQThELFdBQVcsS0FBekUsQ0FBZ0YsZUFBZSxRQUFmLENBQWhGLENBQXpCLENBQ0Esa0JBQWtCLFFBQWxCLEVBQThCLEVBQy9CLENBSEQsRUFJQSxHQUFNLGNBQWUsRUFBckIsQ0FUdUUsaUlBVzVELElBWDRELGNBWXJFLEdBQU0sUUFBUyxTQUFTLEdBQVQsQ0FBZixDQUNBLEdBQUksWUFBYSxJQUFqQixDQUNBLEdBQUksR0FBSSxJQUFSLENBQ0EsR0FBSSxTQUFVLEtBQWQsQ0FDQSxzQkFBZSxZQUFmLEVBQTZCLE9BQTdCLENBQXFDLGdCQUE2QixrREFBM0IsUUFBMkIsV0FBakIsV0FBaUIsV0FDaEUsR0FBSSxDQUFDLE9BQUwsQ0FBYyxDQUNaLEdBQU0sTUFBTyxZQUFZLE1BQVosQ0FBYixDQUNBLEdBQUksQ0FBQyxJQUFMLENBQVcsQ0FDVCxFQUFJLEtBQUosQ0FDQSxHQUFJLGFBQWUsSUFBbkIsQ0FBeUIsQ0FDdkIsV0FBYSxRQUNkLENBRkQsSUFHSyxDQUNILFFBQVUsSUFDWCxDQUNGLENBQ0YsQ0FDRixDQWJELEVBY0EsR0FBSSxDQUFDLE9BQUwsQ0FBYyxJQUNNLElBRE4sQ0FDZ0IsTUFEaEIsQ0FDSixNQURJLENBQ00sR0FETixDQUVaLEdBQUksQ0FBSixDQUFPLENBQ0wsYUFBYSxJQUFiLENBQWtCLEdBQWxCLEVBQ0Esa0JBQWtCLE9BQWxCLENBQTBCLFNBQUMsVUFBRCxDQUFhLFFBQWIsQ0FBMEIsQ0FDbEQsa0JBQWtCLFFBQWxCLEVBQTRCLElBQTVCLENBQWlDLEdBQWpDLENBQ0QsQ0FGRCxDQUdELENBTEQsSUFNSyxDQUNILGtCQUFrQixVQUFsQixFQUE4QixJQUE5QixDQUFtQyxHQUFuQyxDQUNELENBQ0YsQ0F6Q29FLEVBV3ZFLDZDQUFrQixLQUFsQix1R0FBeUIsUUErQnhCLENBMUNzRSxtTUEyQ3ZFLEdBQU0sU0FBVSxFQUFoQixDQUNBLGtCQUFrQixPQUFsQixDQUEwQixnQkFBa0IsUUFBbEIsQ0FBK0IsSUFBNUIsTUFBNEIsUUFBNUIsS0FBNEIsQ0FBckIsSUFBcUIsUUFBckIsSUFBcUIsQ0FDdkQsUUFBUSxRQUFSLEVBQW9CLE9BQVMsVUFBVCxDQUFzQixJQUF0QixDQUE2QixZQUFZLEtBQVosQ0FBbUIsWUFBWSxLQUFaLENBQW5CLENBQXVDLGtCQUFrQixRQUFsQixDQUF2QyxDQUFvRSxRQUFwRSxDQUNsRCxDQUZELEVBR0EsR0FBTSxzQkFBdUIsRUFBN0IsQ0FDQSxzQkFBZSxpQkFBZixFQUFrQyxPQUFsQyxDQUEwQyxnQkFBbUIsa0RBQWpCLFFBQWlCLFdBQVAsQ0FBTyxXQUFDLHFCQUFxQixRQUFyQixFQUFpQyxFQUFFLE1BQU8sQ0FBeEcsRUFDQSxNQUFPLENBQ0wseUJBREssQ0FFTCx5Q0FGSyxDQUdMLGVBSEssQ0FLUixDQXRERCxDQXdEQSxHQUFNLGVBQWdCLFFBQWhCLGNBQWdCLENBQUMsS0FBRCxDQUFRLElBQVIsQ0FBaUIsQ0FDckMsR0FBTSxRQUFTLEtBQUssV0FBTCxFQUFmLENBQ0EsR0FBSSxRQUFVLElBQVYsRUFBa0IsUUFBVSxFQUFoQyxDQUFvQyxDQUNsQyxNQUFPLGtCQUFNLEtBQU4sQ0FDUixDQUNELE1BQU8saUJBQVUsSUFDVSxJQURWLENBQ29CLE1BRHBCLENBQ1QsTUFEUyxDQUNFLEtBREYsRUFFZixJQUFPLEtBQU8sSUFBUixDQUFnQixJQUFJLENBQUosQ0FBaEIsQ0FBeUIsR0FBL0IsQ0FDQSxNQUFPLE1BQU8sSUFBUCxFQUFlLElBQUksV0FBSixHQUFrQixPQUFsQixDQUEwQixNQUExQixJQUFzQyxDQUFDLENBQzlELENBQ0YsQ0FWRCxDQVlBLEdBQU0sWUFBYSxRQUFiLFdBQWEsQ0FBQyxLQUFELENBQVEsYUFBUixDQUEwQixDQUMzQyxHQUFJLGNBQWMsSUFBZCxHQUF1QixDQUEzQixDQUE4QixDQUM1QixNQUFPLGtCQUFNLE1BQU4sQ0FDUixDQUNELE1BQU8saUJBQVUsSUFDWSxVQURaLENBQzRCLE1BRDVCLENBQ1AsTUFETyxDQUNJLEtBREosRUFFZixHQUFJLFdBQWEsSUFBYixFQUFxQixVQUFVLE1BQVYsRUFBb0IsQ0FBN0MsQ0FBZ0QsQ0FDOUMsTUFBTyxlQUFjLEVBQWQsQ0FDUixDQUpjLG1HQUtmLDZDQUE2QixTQUE3Qix1R0FBd0MsNEJBQXZCLFFBQXVCLFFBQTVCLEdBQTRCLENBQ3RDLEdBQUksY0FBYyxPQUFkLENBQUosQ0FBNEIsQ0FDMUIsTUFBTyxLQUNSLENBQ0YsQ0FUYyxtTUFVZixNQUFPLE1BQ1IsQ0FDRixDQWhCRCxDQWtCQSxHQUFNLGFBQWMsUUFBZCxZQUFjLENBQUMsS0FBRCxDQUFRLFdBQVIsQ0FBcUIsWUFBckIsQ0FBbUMsUUFBbkMsQ0FBZ0QsQ0FDbEUsR0FBTSxjQUFlLEVBQXJCLENBQ0EsbUJBQVksV0FBWixFQUF5QixPQUF6QixDQUFpQyxpQkFBVyxDQUMxQyxhQUFhLE9BQWIsRUFBd0IsQ0FDekIsQ0FGRCxFQUZrRSxtR0FLbEUsNkNBQWtCLFlBQWxCLHVHQUFnQyxJQUFyQixJQUFxQixpQkFDSCxVQURHLENBQ2EsU0FBUyxHQUFULENBRGIsQ0FDdEIsTUFEc0IsQ0FDWCxLQURXLEVBRTlCLEdBQUksV0FBYSxJQUFiLEVBQXFCLFVBQVUsTUFBVixFQUFvQixDQUE3QyxDQUFnRCxDQUM5QyxhQUFhLEVBQWIsR0FBb0IsQ0FDckIsQ0FGRCxJQUdLLG9HQUNILDZDQUE2QixTQUE3Qix1R0FBd0MsNEJBQXZCLFFBQXVCLFFBQTVCLEdBQTRCLENBQ3RDLGFBQWEsT0FBYixHQUF5QixDQUMxQixDQUhFLG1NQUlKLENBQ0YsQ0FmaUUsbU1BZ0JsRSxNQUFPLGFBQ1IsQ0FqQkQsQ0FtQk8sR0FBTSxpQ0FBYyxRQUFkLFlBQWMsQ0FBQyxXQUFELENBQWMsT0FBZCxDQUEwQixDQUNuRCxHQUFJLGFBQWUsSUFBbkIsQ0FBeUIsQ0FBQyxNQUFPLEVBQUcsQ0FDcEMsR0FBTSxRQUFTLHNCQUFlLFdBQWYsRUFBNEIsSUFBNUIsQ0FBaUMsU0FBQyxDQUFELENBQUksQ0FBSixRQUFVLEdBQUUsQ0FBRixFQUFLLGFBQUwsQ0FBbUIsRUFBRSxDQUFGLENBQW5CLENBQVYsQ0FBakMsQ0FBZixDQUNBLEdBQUksT0FBTyxNQUFQLEVBQWlCLENBQXJCLENBQXdCLENBQUMsTUFBTyxFQUFHLENBQ25DLEdBQU0sTUFBTyxFQUFiLENBSm1ELEdBS25DLEdBTG1DLENBSzVCLE1BTDRCLENBSzNDLE1BTDJDLENBTW5ELEdBQU0sT0FBUSxLQUFLLEtBQUwsQ0FBVyxHQUFLLE9BQWhCLEdBQTZCLEdBQUssT0FBTixDQUFpQixDQUFqQixDQUFxQixDQUFqRCxDQUFkLENBQ0EsR0FBTSxPQUFRLEtBQUssS0FBTCxDQUFXLEdBQUssS0FBaEIsR0FBMkIsR0FBSyxLQUFOLENBQWUsQ0FBZixDQUFtQixDQUE3QyxDQUFkLENBQ0EsSUFBSyxHQUFJLEdBQUksQ0FBYixDQUFnQixFQUFJLEtBQXBCLENBQTJCLEdBQTNCLENBQWdDLENBQzlCLEdBQU0sS0FBTSxFQUFaLENBQ0EsSUFBSyxHQUFJLEdBQUksQ0FBYixDQUFnQixFQUFJLEtBQXBCLENBQTJCLEdBQTNCLENBQWdDLENBQzlCLEdBQU0sR0FBSSxNQUFRLENBQVIsQ0FBWSxDQUF0QixDQUNBLElBQUksSUFBSixDQUFVLEVBQUksRUFBTCxDQUFXLE9BQU8sQ0FBUCxDQUFYLENBQXVCLElBQWhDLENBQ0QsQ0FDRCxLQUFLLElBQUwsQ0FBVSxHQUFWLENBQ0QsQ0FDRCxNQUFPLEtBQ1IsQ0FqQk0sQ0FtQkEsR0FBTSxxQ0FBZ0IsUUFBaEIsY0FBZ0IsZ0JBQWtCLENBQzdDLEdBQUksU0FBVSxJQUFkLENBQ0EsR0FBSSxVQUFXLElBQWYsQ0FGNkMsbUdBRzdDLDZDQUFrQyxzQkFBZSxjQUFmLENBQWxDLHVHQUFrRSw4REFBdEQsT0FBc0QsaUJBQTdDLFFBQTZDLGlCQUNoRSxHQUFJLFFBQUosQ0FBYyxDQUFDLFNBQVcsS0FBTSxDQUFoQyxJQUNLLENBQUMsUUFBVSxLQUFNLENBQ3ZCLENBTjRDLG1NQU83QyxNQUFPLENBQUUsZUFBRixDQUFXLGlCQUFYLENBQ1IsQ0FSTTs7O3VTQzVQUSxVQUFzQyxJQUFyQyxNQUFxQywyREFBN0IsRUFBNkIsMEJBQXZCLEtBQXVCLE1BQXZCLElBQXVCLENBQWpCLElBQWlCLE1BQWpCLElBQWlCLENBQVgsSUFBVyxNQUFYLElBQVcsQ0FDbkQsT0FBUSxJQUFSLEVBQ0UsSUFBSyxTQUFMLENBQWdCLENBQ2QsR0FBSSxNQUFRLElBQVosQ0FBa0IsQ0FBQyxNQUFPLEVBQUcsQ0FDN0IsK0JBQVksSUFBWixDQUNELENBQ0QsUUFBUyxNQUFPLE1BQVAsQ0FMWCxDQU9ELEMsQ0FJTSxHQUFNLHFCQUFRLFFBQVIsTUFBUSxXQUFHLEdBQUgsT0FBRyxFQUFILE9BQWEsQ0FBRSxLQUFGLENBQWIsQ0FBZDs7O3doQkNqQkEsR0FBTSxpQkFBVSxRQUFWLElBQVUsQ0FBQyxJQUFELFFBQWlCLENBQUUsS0FBTSxPQUFSLENBQWlCLE9BQVEsU0FBekIsQ0FBb0MsU0FBcEMsQ0FBakIsQ0FBaEIsQ0FDQSxHQUFNLGlCQUFVLFFBQVYsSUFBVSxDQUFDLElBQUQsQ0FBTyxJQUFQLFFBQWlCLENBQUUsS0FBTSxPQUFSLENBQWlCLE9BQVEsT0FBekIsQ0FBb0MsU0FBcEMsQ0FBMEMsU0FBMUMsQ0FBakIsQ0FBaEIsQ0FDQSxHQUFNLHlCQUFVLFFBQVYsUUFBVSxDQUFDLElBQUQsUUFBaUIsQ0FBRSxLQUFNLE9BQVIsQ0FBaUIsT0FBUSxTQUF6QixDQUFvQyxTQUFwQyxDQUFqQixDQUFoQixDQUVBLEdBQU0sdUJBQVUsUUFBVixPQUFVLENBQUMsSUFBRCxRQUFpQixDQUFFLEtBQU0sTUFBUixDQUFnQixTQUFoQixDQUFqQixDQUFoQixDQUNBLEdBQU0scUJBQVUsUUFBVixNQUFVLFNBQWlCLENBQUUsS0FBTSxPQUFSLENBQWpCLENBQWhCLENBQ0EsR0FBTSx5QkFBVSxRQUFWLFFBQVUsQ0FBQyxLQUFELFFBQWlCLENBQUUsS0FBTSxTQUFSLENBQW1CLFdBQW5CLENBQWpCLENBQWhCLEMsZ0JBSVEsVUFBc0YsSUFBckYsTUFBcUYsMkRBQTdFLENBQUUsTUFBTyxFQUFULENBQWEsS0FBTSxDQUFuQixDQUFzQixLQUFNLEtBQTVCLENBQTZFLDBCQUF0QyxLQUFzQyxNQUF0QyxJQUFzQyxDQUFoQyxJQUFnQyxNQUFoQyxJQUFnQyxDQUExQixNQUEwQixNQUExQixNQUEwQixDQUFsQixJQUFrQixNQUFsQixJQUFrQixDQUFaLEtBQVksTUFBWixLQUFZLENBQ25HLE9BQVEsSUFBUixFQUNFLElBQUssT0FBTCxDQUFjLElBQ0osTUFESSxDQUNrQixLQURsQixDQUNKLEtBREksQ0FDRyxJQURILENBQ2tCLEtBRGxCLENBQ0csSUFESCxDQUNTLEtBRFQsQ0FDa0IsS0FEbEIsQ0FDUyxJQURULENBRVosR0FBTSxXQUFZLE9BQVEsRUFBMUIsQ0FDQSxPQUFRLE1BQVIsRUFDRSxJQUFLLFNBQUwsQ0FBZ0IsQ0FDZCwrQkFDSyxLQURMLEVBQ1ksZ0RBQ0wsS0FESyxrQ0FFTCxTQUZLLEdBR1IsQ0FBRSxLQUFNLFNBQVIsQ0FBbUIsb0JBQXFCLElBQXhDLENBSFEsRUFEWixDQU1FLEtBQU0sS0FBTyxDQU5mLENBT0UsS0FBTSxJQVBSLEVBU0QsQ0FDRCxJQUFLLFNBQUwsQ0FBZ0IsQ0FDZCwrQkFDSyxLQURMLEVBRUUsZ0RBQ0ssS0FETCxrQ0FFSyxTQUZMLEdBR0UsQ0FBRSxLQUFNLE1BQVIsQ0FBZ0IsS0FBUyxJQUFULE1BQWhCLENBSEYsRUFGRixDQU9FLEtBQU0sS0FBTyxDQVBmLENBUUUsS0FBTSxLQVJSLEVBVUQsQ0FFRCxJQUFLLE9BQUwsQ0FBYyxDQUNaLCtCQUNLLEtBREwsRUFFRSxnREFDSyxLQURMLGtDQUVLLFNBRkwsR0FHRSxDQUFFLEtBQU0sT0FBUixDQUFpQixLQUFTLElBQVQsVUFBakIsQ0FIRixFQUZGLENBT0UsS0FBTSxLQUFPLENBUGYsQ0FRRSxLQUFNLElBUlIsRUFVRCxDQUNELFFBQVMsTUFBTyxNQUFQLENBckNYLENBdUNELENBQ0QsSUFBSyxNQUFMLENBQWEsSUFDSCxPQURHLENBQ08sS0FEUCxDQUNILEtBREcsQ0FFWCwrQkFDSyxLQURMLEVBRUUsZ0RBQ0ssTUFETCxrQ0FFSyxJQUZMLEVBRkYsQ0FNRSxLQUFNLElBTlIsRUFRRCxDQUNELElBQUssT0FBTCxDQUFjLENBQ1osK0JBQ0ssS0FETCxFQUVFLE1BQU8sRUFGVCxDQUdFLEtBQU0sS0FIUixFQUtELENBQ0QsSUFBSyxTQUFMLENBQWdCLENBQ2QsK0JBQ0ssS0FETCxFQUVFLEtBQU0sS0FGUixFQUlELENBQ0QsUUFBUyxNQUFPLE1BQVAsQ0FwRVgsQ0FzRUQsQyxDQUlNLEdBQU0sNkJBQVksUUFBWixVQUFZLFdBQUcsT0FBSCxPQUFHLE1BQUgsT0FBaUIsQ0FBRSxhQUFGLENBQWpCLENBQWxCLENBRUEsR0FBTSwyQ0FBbUIsUUFBbkIsaUJBQW1CLE9BQWdCLElBQWIsT0FBYSxPQUFiLE1BQWEsSUFDdEMsTUFEc0MsQ0FDaEIsTUFEZ0IsQ0FDdEMsS0FEc0MsQ0FDL0IsSUFEK0IsQ0FDaEIsTUFEZ0IsQ0FDL0IsSUFEK0IsQ0FDekIsSUFEeUIsQ0FDaEIsTUFEZ0IsQ0FDekIsSUFEeUIsQ0FFOUMsR0FBSSxVQUFXLENBQUMsQ0FBaEIsQ0FDQSxHQUFJLFVBQVcsRUFBZixDQUNBLE1BQU0sT0FBTixDQUFjLFNBQUMsSUFBRCxDQUFPLENBQVAsQ0FBYSxJQUNqQixLQURpQixDQUNGLElBREUsQ0FDakIsSUFEaUIsQ0FDWCxJQURXLENBQ0YsSUFERSxDQUNYLElBRFcsQ0FFekIsR0FBSSxNQUFRLE9BQVosQ0FBcUIsQ0FDbkIsU0FBVyxDQUFYLENBQ0EsU0FBVyxPQUNaLENBSEQsSUFJSyxJQUFJLE1BQVEsU0FBWixDQUF1QixDQUMxQixHQUFJLFVBQVksT0FBaEIsQ0FBeUIsQ0FDdkIsU0FBVyxDQUFYLENBQ0EsU0FBVyxTQUNaLENBQ0YsQ0FDRixDQVpELEVBYUEsTUFBTyxDQUFFLGNBQWUsS0FBakIsQ0FBd0IsU0FBeEIsQ0FBOEIsU0FBOUIsQ0FBb0MsUUFBUyxNQUFNLE1BQU4sQ0FBZSxDQUE1RCxDQUErRCxpQkFBL0QsQ0FBeUUsaUJBQXpFLENBQ1IsQ0FsQk07Ozt5VUN6RlAsNEJBQ0EsMkIsdUNBQ0EsaUMsNkNBQ0EsMkIsdUNBQ0EsaUMsNkNBQ0EseUIscUNBQ0EsaUMsNkNBQ0EsK0IsNklBSWUsMkJBQWdCLENBQzdCLGlCQUQ2QixDQUU3Qix1QkFGNkIsQ0FHN0IsaUJBSDZCLENBSTdCLHVCQUo2QixDQUs3QixlQUw2QixDQU03Qix1QkFONkIsQ0FPN0IscUJBUDZCLENBQWhCLEMsQ0FlUixHQUFNLDJDQUFtQixRQUFuQixpQkFBbUIsRUFBVywwQkFDekMsTUFBTyxVQUFDLEtBQUQsQ0FBUSxLQUFSLENBQWtCLENBQ3ZCLEdBQU0sUUFBUyxFQUFmLENBRHVCLGdHQUV2Qix3SkFBa0MsSUFBdkIsU0FBdUIsYUFDaEMscUJBQWMsTUFBZCxDQUFzQixTQUFTLEtBQVQsQ0FBZ0IsS0FBaEIsQ0FBdEIsQ0FDRCxDQUpzQiw0TEFLdkIsTUFBTyxPQUNSLENBQ0YsQ0FSTTs7O3lNQzFCUCx3QkFFQSxpQyxrRkFFQSxHQUFNLFNBQVUsT0FBaEIsQ0FzQk8sR0FBTSw2QkFBWSxRQUFaLFVBQVksYUFBUSxtQkFBWSxJQUNuQyxLQURtQyxDQUNELElBREMsQ0FDbkMsSUFEbUMsQ0FDN0IsSUFENkIsQ0FDRCxJQURDLENBQzdCLElBRDZCLENBQ3ZCLFdBRHVCLENBQ0QsSUFEQyxDQUN2QixXQUR1QixDQUNWLElBRFUsQ0FDRCxJQURDLENBQ1YsSUFEVSxDQUUzQyxTQUFTLGdCQUFJLElBQUosQ0FBVCxFQUNBLGtDQUFjLElBQWQsRUFBb0IsS0FBTSxJQUExQixJQUVBLEdBQU0sVUFBVyxDQUFDLFlBQWEsYUFBZCxDQUFqQixDQUNBLFNBQVMsT0FBVCxDQUFtQixXQUFuQixDQUFpQyxJQUFqQyxDQUF5QyxRQUF6QyxFQUNDLElBREQsQ0FDTSx5QkFBWSxVQUFTLElBQVQsRUFBWixDQUROLEVBRUMsSUFGRCxDQUVNLGNBQVEsSUFDSixLQURJLENBQ2lCLElBRGpCLENBQ0osSUFESSxDQUNFLElBREYsQ0FDaUIsSUFEakIsQ0FDRSxJQURGLENBQ1EsSUFEUixDQUNpQixJQURqQixDQUNRLElBRFIsQ0FFWixHQUFJLElBQUosQ0FBVSxDQUNSLFNBQVMsb0JBQVEsSUFBUixDQUFULEVBQ0Esa0NBQWMsSUFBZCxFQUFvQixTQUFwQixHQUNELENBSEQsSUFJSyxDQUNILFNBQVMsZ0JBQUksSUFBSixDQUFVLElBQVYsQ0FBVCxDQUNELENBQ0YsQ0FYRCxFQVlDLEtBWkQsQ0FZTyxlQUFTLENBQ1osUUFBUSxHQUFSLENBQVksS0FBWixFQUNBLFNBQVMsZ0JBQUksSUFBSixDQUFVLENBQUMsQ0FBQyxLQUFNLE9BQVAsQ0FBZ0IsS0FBTSxLQUF0QixDQUFELENBQVYsQ0FBVCxDQUNILENBZkQsQ0FnQkQsQ0F0QndCLENBQWxCOzs7aXBCQ25CUSxVQUEyQyxJQUExQyxNQUEwQywyREFBcEMsRUFBb0MsMEJBQTlCLEtBQThCLE1BQTlCLElBQThCLENBQXhCLElBQXdCLE1BQXhCLElBQXdCLENBQWxCLElBQWtCLE1BQWxCLElBQWtCLENBQVosS0FBWSxNQUFaLEtBQVksQ0FDeEQsT0FBUSxJQUFSLEVBQ0UsSUFBSyxZQUFMLENBQW1CLENBQ2pCLEdBQUksTUFBUSxJQUFaLENBQWtCLENBQUMsZ0NBQVksS0FBWixpQ0FBb0IsS0FBcEIsQ0FBNEIsSUFBNUIsRUFBbUMsQ0FDdEQsZ0NBQ0ssS0FETCxpQ0FFRyxLQUZILENBRVcsSUFGWCxFQUlELENBQ0QsSUFBSyxjQUFMLENBQXFCLENBQ25CLEdBQUksTUFBUSxJQUFaLENBQWtCLENBQ2hCLEdBQUksTUFBTSxLQUFOLEdBQWdCLElBQXBCLENBQTBCLENBQUUsZ0NBQVksS0FBWixpQ0FBb0IsS0FBcEIsQ0FBNEIsSUFBNUIsRUFBbUMsQ0FDL0QsZ0NBQ0ssS0FETCxpQ0FFRyxLQUZILDJCQUdPLE1BQU0sS0FBTixDQUhQLEVBSUksR0FBSSxJQUpSLElBT0QsQ0FWa0IsR0FXWCxTQVhXLENBV2tCLElBWGxCLENBV1gsUUFYVyxDQVdELEtBWEMsQ0FXa0IsSUFYbEIsQ0FXRCxLQVhDLENBV1MsSUFYVCx1Q0FXa0IsSUFYbEIsdUJBWW5CLGdDQUNLLEtBREwsaUNBRUcsS0FGSCwyQkFHTyxNQUFNLEtBQU4sQ0FIUCxDQUlPLElBSlAsRUFLSSxHQUFJLEtBTFIsQ0FNSSxtQ0FDSyxDQUFDLE1BQU0sS0FBTixHQUFnQixFQUFqQixFQUFxQixRQUQxQixDQUVLLFFBRkwsQ0FOSixJQVlELENBQ0QsSUFBSyxXQUFMLENBQWtCLENBQ2hCLEdBQUksTUFBUSxJQUFaLENBQWtCLENBQUMsTUFBTyxNQUFNLENBRGhCLEdBRUUsSUFGRixDQUVZLElBRlosQ0FFUixNQUZRLENBRUUsR0FGRixDQUdoQixnQ0FDSyxLQURMLGlDQUVHLEtBRkgsMkJBR08sTUFBTSxLQUFOLENBSFAsRUFJSSxtQ0FDSyxNQUFNLEtBQU4sRUFBYSxRQURsQixpQ0FFRyxHQUZILENBRVMsSUFGVCxFQUpKLElBVUQsQ0FDRCxRQUFTLE1BQU8sTUFBUCxDQS9DWCxDQWlERCxDLENBSU0sR0FBTSw2QkFBWSxRQUFaLFVBQVksV0FBRyxPQUFILE9BQUcsTUFBSCxPQUFpQixDQUFFLGFBQUYsQ0FBakIsQ0FBbEIsQ0FFQSxHQUFNLCtCQUFhLFFBQWIsV0FBYSxXQUFhLFFBQWIsT0FBRyxNQUFILENBQWEsT0FBYixPQUE4QixDQUFFLGVBQUYsQ0FBOUIsQ0FBbkIsQ0FFQSxHQUFNLHlCQUFVLFFBQVYsUUFBVSxXQUFhLEtBQWIsT0FBRyxNQUFILENBQWEsSUFBYixPQUEyQixDQUFFLFNBQUYsQ0FBM0IsQ0FBaEIsQ0FFQSxHQUFNLHlDQUFtQixRQUFuQixnQkFBbUIsYUFBMkIsSUFBeEIsT0FBd0IsT0FBeEIsTUFBd0IsSUFBWixNQUFZLE9BQVosS0FBWSxtQkFDYixNQURhLENBQ2hELEtBRGdELEVBQ3RDLE1BRHNDLGVBQ3RDLE1BRHNDLENBQzlCLFVBRDhCLGVBQzlCLFVBRDhCLENBRXpELE1BQU8sQ0FBRSxhQUFGLENBQVUscUJBQVYsQ0FDUixDQUhNOzs7c09DbEJTLFcsQ0FBQSxXLG1GQS9DVCxHQUFNLG1DQUFlLFFBQWYsYUFBZSxTQUFNLG1CQUFZLENBQzVDLGdDQUFXLEtBQU0sUUFBakIsRUFBOEIsWUFBOUIsRUFDRCxDQUYyQixDQUFyQixDLGdCQU1RLFVBQW1ELElBQWxELE1BQWtELDJEQUExQyxZQUEwQywwQkFBMUIsS0FBMEIsTUFBMUIsSUFBMEIsQ0FBcEIsTUFBb0IsTUFBcEIsTUFBb0IsQ0FBWixLQUFZLE1BQVosS0FBWSxDQUNoRSxPQUFRLElBQVIsRUFDRSxJQUFLLFFBQUwsQ0FBZSxDQUNiLE1BQU8sQ0FBRSxhQUFGLENBQVUsV0FBVixDQUNSLENBQ0QsUUFBUyxNQUFPLE1BQVAsQ0FKWCxDQU1ELEMsQ0FJTSxHQUFNLDZCQUFZLFFBQVosVUFBWSw0QkFBRyxHQUFILENBQVUsTUFBVixXQUFVLE1BQVYsQ0FBa0IsS0FBbEIsV0FBa0IsS0FBbEIsT0FBaUMsQ0FBRSxhQUFGLENBQVUsV0FBVixDQUFqQyxDQUFsQixDQUlQLEdBQU0sWUFBYSxRQUFiLFdBQWEsRUFBTSxhQUM0QixNQUQ1QixDQUNGLE1BREUsU0FDZixXQURlLENBQ2tCLEtBRGxCLFNBQ00sVUFETixDQUV2QixNQUFPLENBQUUsYUFBRixDQUFVLFdBQVYsQ0FDUixDQUhELENBS0EsR0FBTSxnQkFBaUIsRUFBdkIsQ0FDQSxHQUFNLFlBQWEsQ0FBbkIsQ0FFQSxHQUFNLFdBQVksRUFBbEIsQ0FDQSxHQUFNLFdBQVksQ0FBbEIsQ0FFQSxHQUFNLGNBQWUsQ0FDbkIsS0FBTSxHQURhLENBRW5CLFVBQVcsR0FGUSxDQUduQixhQUFjLEdBSEssQ0FBckIsQ0FNQSxHQUFNLFdBQVksQ0FDaEIsS0FBTSxNQURVLENBRWhCLE1BQU8sT0FGUyxDQUdoQixVQUFXLE1BSEssQ0FJaEIsYUFBYyxNQUpFLENBS2hCLFdBQVksT0FMSSxDQU1oQixlQUFnQixPQU5BLENBQWxCLENBU08sUUFBUyxZQUFULENBQXFCLElBQXJCLE9BQThDLElBQWpCLE9BQWlCLE9BQWpCLE1BQWlCLENBQVQsS0FBUyxPQUFULEtBQVMsQ0FDbkQsR0FBTSxXQUFZLENBQ2hCLEtBQU0sT0FBUyxTQURDLENBRWhCLE1BQU8sT0FBUyxTQUZBLENBR2hCLFVBQVcsT0FBUyxTQUFULENBQXFCLFNBSGhCLENBSWhCLGFBQWMsT0FBUyxTQUFULENBQXFCLFNBSm5CLENBS2hCLFdBQVksT0FBUyxTQUFULENBQXFCLFNBTGpCLENBTWhCLGVBQWdCLE9BQVMsU0FBVCxDQUFxQixTQU5yQixDQUFsQixDQURtRCxHQVMzQyxLQVQyQyxDQVNULFlBVFMsQ0FTM0MsSUFUMkMsQ0FTckMsU0FUcUMsQ0FTVCxZQVRTLENBU3JDLFNBVHFDLENBUzFCLFlBVDBCLENBU1QsWUFUUyxDQVMxQixZQVQwQixDQVVuRCxHQUFNLG1DQUNELFlBREMsRUFFSixNQUFPLE1BQVEsSUFBUixDQUFlLGNBRmxCLENBR0osV0FBWSxNQUFRLElBQVIsQ0FBZSxTQUFmLENBQTJCLEVBQUksY0FBL0IsQ0FBZ0QsVUFIeEQsQ0FJSixlQUFnQixNQUFRLElBQVIsQ0FBZSxZQUFmLENBQThCLEVBQUksY0FBbEMsQ0FBbUQsVUFKL0QsRUFBTixDQU9BLE1BQU8sQ0FDTCxNQUFPLFNBQVMsSUFBVCxDQURGLENBRUwsT0FBUSxVQUFVLElBQVYsQ0FGSCxDQUdMLE1BQU8sVUFBVSxJQUFWLENBSEYsQ0FLUjs7O3FGQ3ZFRCw0QiwyQ0FDQSxtQ0FDQSx5Q0FFQSw4Qix5Q0FDQSw0Qix1Q0FDQSxrQyw2Q0FDQSwwQyxxREFDQSw4Qyx5REFDQSxrQyw2Q0FDQSxnRCwyREFDQSw0Qix1Q0FDQSxzQyxpREFFQSxpRCw2REFDQSxxQyxtSUFFQSxHQUFNLE9BQVEsZ0RBQWQsQ0FFQSxxQkFDRSw4Q0FBTSxNQUFPLEtBQWIsaURBQ0UsbURBQVEsbUNBQVIsaURBQ0UscURBQVUsS0FBSyxRQUFmLENBQXdCLEdBQUcsZ0JBQTNCLGlEQURGLENBRUUscURBQVUsS0FBSyxhQUFmLENBQTZCLEdBQUcsZ0JBQWhDLGlEQUZGLENBR0UscURBQVUsS0FBSyxXQUFmLENBQTJCLEdBQUcsZ0JBQTlCLGlEQUhGLENBSUUscURBQVUsS0FBSyxRQUFmLENBQXdCLEdBQUcsZ0JBQTNCLGlEQUpGLENBS0UscURBQVUsS0FBSyxTQUFmLENBQXlCLEdBQUcsZ0JBQTVCLGlEQUxGLENBTUUscURBQVUsS0FBSyxVQUFmLENBQTBCLEdBQUcsZ0JBQTdCLGlEQU5GLENBT0Usa0RBQU8sS0FBSyxHQUFaLENBQWdCLHVCQUFoQixpREFDRSx1REFBWSx1QkFBWixpREFERixDQUVFLDBEQUFlLEdBQUcsZ0JBQWxCLGlEQUZGLENBR0Usa0RBQU8sS0FBSyxlQUFaLENBQTRCLHVCQUE1QixpREFIRixDQUlFLGtEQUFPLEtBQUssd0JBQVosQ0FBcUMsdUJBQXJDLGlEQUpGLENBS0Usa0RBQU8sS0FBSyxvQkFBWixDQUFpQyx1QkFBakMsaURBTEYsQ0FNRSxrREFBTyxLQUFLLFFBQVosQ0FBcUIsMEJBQXJCLGlEQUNFLGtEQUFPLEtBQUssTUFBWixDQUFtQixnQ0FBbkIsaURBREYsQ0FFRSxrREFBTyxLQUFLLFFBQVosQ0FBcUIsMEJBQXJCLGlEQUNFLGtEQUFPLEtBQUssTUFBWixDQUFtQixpQ0FBbkIsQ0FBNkMsUUFBUyxJQUF0RCxpREFERixDQUZGLENBS0Usa0RBQU8sS0FBSyxPQUFaLENBQW9CLDhCQUFwQixpREFMRixDQU5GLENBUEYsQ0FxQkUsa0RBQU8sS0FBSyxHQUFaLENBQWdCLDRCQUFoQixpREFyQkYsQ0FERixDQURGLENBMkJFLFNBQVMsY0FBVCxDQUF3QixNQUF4QixDQTNCRjs7O3d6QkNuQkEsNEIsMkNBQ0EsdUNBQ0EsaUMsa0ZBRUEsR0FBTSxlQUFnQixRQUFoQixjQUFnQixlQUFVLENBQUMsT0FBTyxPQUFSLEVBQW1CLENBQUMsT0FBTyxRQUFyQyxDQUF0QixDLEdBRU0sVSxvY0FNSixXLENBQWMsVUFBTSxzQ0FDVixLQURVLENBQ0YsYUFERSxjQUNGLGFBREUsQ0FDYSxRQURiLGNBQ2EsUUFEYixDQUN1QixNQUR2QixjQUN1QixNQUR2QixDQUVsQixHQUFNLFFBQVMsMEJBQWMsYUFBZCxDQUFmLENBQ0EsTUFBTyxRQUFPLFFBQVAsQ0FBaUIsTUFBSyxHQUFMLENBQVMsYUFBVCxFQUEwQixDQUFDLE9BQU8sT0FBbkQsQ0FDUixDLE9BQ0QsZ0IsQ0FBbUIsaUJBQVcsa0JBQ1gsYUFEVyxRQUNwQixLQURvQixDQUNYLGFBRFcsQ0FFNUIsR0FBTSxRQUFTLDBCQUFjLGFBQWQsQ0FBZixDQUNBLEdBQUksT0FBSixDQUFhLENBQ1gsTUFBSyxHQUFMLENBQVcsT0FBWCxDQUNBLFFBQVEsYUFBUixDQUF3QixjQUFjLE1BQWQsQ0FDekIsQ0FDRixDLDhKQWpCb0IsSUFDRixjQURFLENBQ2tCLElBRGxCLENBQ1gsS0FEVyxDQUNGLGFBREUsQ0FFbkIsR0FBTSxRQUFTLDBCQUFjLGFBQWQsQ0FBZixDQUNBLEtBQUssR0FBTCxDQUFTLGFBQVQsQ0FBeUIsY0FBYyxNQUFkLENBQzFCLEMsdUNBY1EsSUFDVSxjQURWLENBQzhCLElBRDlCLENBQ0MsS0FERCxDQUNVLGFBRFYsQ0FFUCxHQUFNLFFBQVMsMEJBQWMsYUFBZCxDQUFmLENBQ0EsTUFDRSx3Q0FDSSxJQUFLLEtBQUssZ0JBRGQsQ0FFSSxLQUFLLFVBRlQsQ0FHSSxRQUFTLE9BQU8sT0FIcEIsQ0FJSSxTQUFVLEtBQUssV0FKbkIsaURBT0gsQyx3REFHWSxpREFBMEIsQ0FBRSw2QkFBRixDQUExQixFQUFzRCxTQUF0RCxDOzs7NjhDQ3ZDZiw0QiwyQ0FDQSx1Q0FDQSxvQywrQ0FDQSxnQywrQ0FDQSx3Q0FDQSxpQ0FDQSxpQ0FDQSxxQyxrRkFFQSxHQUFNLFlBQWEsQ0FDakIsT0FBUSxHQURTLENBRWpCLFdBQVksRUFGSyxDQUdqQixVQUFXLEVBSE0sQ0FJakIsVUFBVyxDQUpNLENBS2pCLFdBQVksQ0FBQyxFQUFELENBQUssRUFBTCxDQUxLLENBTWpCLFdBQVksQ0FBQyxDQUFDLEVBQUQsQ0FBSyxDQUFDLEVBQU4sQ0FBRCxDQUFZLENBQUMsRUFBRCxDQUFLLEVBQUwsQ0FBWixDQU5LLENBT2pCLDBFQUNHLElBREgsQ0FDVSxDQUNOLE1BQU8sU0FERCxDQUVOLFVBQVcsU0FGTCxDQURWLDZDQUtHLEtBTEgsQ0FLVyxDQUNQLE1BQU8sU0FEQSxDQUVQLFVBQVcsU0FGSixDQUxYLGdCQVBpQixDQWlCakIsYUFBYyxDQUNaLE9BQVEsQ0FESSxDQUVaLEtBQU0sSUFGTSxDQUdaLFlBQWEsR0FIRCxDQWpCRyxDQXNCakIsNkVBQ0csSUFESCxDQUNVLENBQ04sTUFBTyxTQURELENBRU4sT0FBUSxDQUZGLENBR04sS0FBTSxJQUhBLENBSU4sVUFBVyxTQUpMLENBS04sWUFBYSxDQUxQLENBRFYsOENBUUcsS0FSSCxDQVFXLENBQ1AsTUFBTyxTQURBLENBRVAsT0FBUSxDQUZELENBR1AsS0FBTSxJQUhDLENBSVAsVUFBVyxTQUpKLENBS1AsWUFBYSxDQUxOLENBUlgsaUJBdEJpQixDQUFuQixDQXdDQSxHQUFNLGVBQWdCLFFBQWhCLGNBQWdCLENBQUMsR0FBRCxDQUFNLG9CQUFOLENBQTRCLE9BQTVCLENBQXdDLENBQzVELEdBQU0sUUFBUyxRQUFXLFFBQVEsR0FBUixHQUFnQixDQUEzQixDQUFnQyxDQUEvQyxDQUNBLEdBQUksUUFBVSxDQUFkLENBQWlCLENBQUMsTUFBTyxFQUFFLENBRmlDLEdBR3BELFdBSG9ELENBRzFCLFVBSDBCLENBR3BELFVBSG9ELENBR3hDLFNBSHdDLENBRzFCLFVBSDBCLENBR3hDLFNBSHdDLENBSTVELEdBQU0sY0FBZSxXQUFhLE1BQWIsQ0FBc0Isb0JBQTNDLENBQ0EsR0FBSSxxQkFBdUIsU0FBM0IsQ0FBc0MsQ0FBQyxNQUFPLGFBQWEsQ0FDM0QsTUFBTyxXQUFZLEtBQUssSUFBTCxDQUFVLFlBQVYsQ0FDcEIsQ0FQRCxDLEdBU00sTSwrREFDSixlQUFZLEtBQVosQ0FBbUIsa0tBQ1gsS0FEVyxTQUluQixNQUptQixDQUlWLGFBQU8sQ0FBQyxHQUFJLEdBQUosQ0FBUyxDQUFDLE1BQUssR0FBTCxDQUFXLEdBQUksQ0FBQyxDQUp4QixPQXVEbkIsUUF2RG1CLENBdURSLHdCQUFXLENBQUMsQ0FBQyxNQUFLLFNBQUwsQ0FBZSxRQUFRLFVBQVIsQ0FBbUIsSUFBbEMsQ0FBYixDQXZEUSxDQUVqQixNQUFLLFFBQUwsQ0FBZ0IsRUFBaEIsQ0FGaUIsWUFHbEIsQyxzRUFFUSxZQUNpRCxJQURqRCxDQUNDLEtBREQsQ0FDVSxPQURWLFFBQ1UsT0FEVixDQUNzQixZQUR0QiwyREFDc0MsTUFEdEMsQ0FDaUQsSUFEakQsQ0FDc0MsTUFEdEMsQ0FFUCxNQUNFLHNGQUNFLHFDQUNFLElBQUssTUFEUCxpREFERixDQUlFLHlFQUFhLFlBQWIsbURBSkYsQ0FPSCxDLDZEQUVtQiw2QkFJZCxJQUpjLENBRWhCLEtBRmdCLENBRVAsYUFGTyxTQUVQLGFBRk8sQ0FFUSxvQkFGUixTQUVRLG9CQUZSLENBRThCLE9BRjlCLFNBRThCLE9BRjlCLENBRXVDLE9BRnZDLFNBRXVDLE9BRnZDLENBR2hCLEdBSGdCLENBSWQsSUFKYyxDQUdoQixHQUhnQixJQUtWLE9BTFUsQ0FLK0UsVUFML0UsQ0FLVixNQUxVLENBS0YsVUFMRSxDQUsrRSxVQUwvRSxDQUtGLFVBTEUsQ0FLVSxTQUxWLENBSytFLFVBTC9FLENBS1UsU0FMVixDQUtxQixVQUxyQixDQUsrRSxVQUwvRSxDQUtxQixVQUxyQixDQUtpQyxZQUxqQyxDQUsrRSxVQUwvRSxDQUtpQyxZQUxqQyxDQUsrQyxZQUwvQyxDQUsrRSxVQUwvRSxDQUsrQyxZQUwvQyxDQUs2RCxhQUw3RCxDQUsrRSxVQUwvRSxDQUs2RCxhQUw3RCxDQU1sQixJQUFJLEtBQUosQ0FBVSxNQUFWLENBQW1CLE1BQW5CLENBQ0EsS0FBSyxHQUFMLENBQVcsa0JBQUUsR0FBRixDQUFNLEdBQU4sQ0FBVyxDQUNwQixtQkFBb0IsS0FEQSxDQUVwQixPQUFRLFVBRlksQ0FHcEIsS0FBTSxTQUhjLENBSXBCLFVBQVcsVUFKUyxDQUFYLENBQVgsQ0FQa0IsR0FhVixNQWJVLENBYVUsT0FiVixDQWFWLEtBYlUsQ0FhSCxRQWJHLENBYVUsT0FiVixDQWFILFFBYkcsQ0FjbEIsS0FBSyxTQUFMLENBQWlCLEVBQWpCLENBQ0EsTUFBTSxPQUFOLENBQWMsYUFBTyxJQUNRLElBRFIsQ0FDb0IsUUFEcEIsQ0FDVixHQURVLEVBQ0YsTUFERSxDQUNRLEdBRFIsQ0FFbkIsT0FBSyxTQUFMLENBQWUsR0FBZixFQUFzQixHQUN2QixDQUhELEVBSUEsa0JBQUUsT0FBRiwyQkFBMEIsQ0FDeEIsTUFBTyw4QkFBVyxlQUFjLE9BQUssUUFBTCxDQUFjLE9BQWQsQ0FBZCxDQUFYLENBRGlCLENBRXhCLGNBQWUsK0JBQVcsQ0FDeEIsR0FBSSxPQUFLLFFBQUwsQ0FBYyxPQUFkLENBQUosQ0FBNEIseUJBQ2lCLE9BRGpCLENBQ2xCLFVBRGtCLENBQ0osSUFESSxxQkFDSixJQURJLENBQ0UsR0FERixxQkFDRSxHQURGLENBQ08sR0FEUCxxQkFDTyxHQURQLENBRTFCLEdBQU0sS0FBTSxPQUFLLFNBQUwsQ0FBZSxJQUFmLENBQVosQ0FDQSxHQUFNLE1BQU8sY0FBYyxHQUFkLENBQWIsQ0FDQSxHQUFNLFFBQVMsa0JBQUUsWUFBRixDQUFlLENBQUMsR0FBRCxDQUFNLEdBQU4sQ0FBZiwwQkFDVixhQUFhLElBQWIsQ0FEVSxFQUViLE9BQVEsY0FBYyxHQUFkLENBQW1CLG9CQUFuQixDQUF5QyxPQUF6QyxDQUZLLEVBR1YsWUFIVSxFQUliLEtBQU0sWUFKTyxJQUtaLEtBTFksQ0FLTixPQUFLLEdBTEMsQ0FBZixDQU1BLE9BQUssUUFBTCxDQUFjLElBQWQsRUFBc0IsTUFDdkIsQ0FDRixDQWZ1QixDQUExQixFQWdCRyxLQWhCSCxDQWdCUyxLQUFLLEdBaEJkLENBaUJELEMsK0RBSW9CLDZCQUNpRCxJQURqRCxDQUNYLEtBRFcsQ0FDRixhQURFLFNBQ0YsYUFERSxDQUNhLG9CQURiLFNBQ2Esb0JBRGIsQ0FDbUMsT0FEbkMsU0FDbUMsT0FEbkMsSUFFWCxhQUZXLENBRU0sVUFGTixDQUVYLFlBRlcsQ0FHbkIsc0JBQWUsS0FBSyxRQUFwQixFQUE4QixPQUE5QixDQUFzQyxjQUFvQiwrQ0FBbEIsSUFBa0IsVUFBWixNQUFZLFVBQ3hELEdBQU0sS0FBTSxPQUFLLFNBQUwsQ0FBZSxJQUFmLENBQVosQ0FDQSxHQUFNLE1BQU8sY0FBYyxHQUFkLENBQWIsQ0FDQSxPQUFPLFNBQVAsQ0FBaUIsY0FBYyxHQUFkLENBQW1CLG9CQUFuQixDQUF5QyxPQUF6QyxDQUFqQixFQUNBLE9BQU8sUUFBUCxDQUFnQixhQUFhLElBQWIsQ0FBaEIsQ0FDRCxDQUxELENBTUQsQyxvQ0FHSCxNQUFNLFdBQU4sQ0FBb0IsT0FBcEIsQyxnQkFFZSx3QkFBUSwyRUFBUixFQUF3RCxLQUF4RCxDOzs7d2FDbElmLDRCLDJDQUNBLHVDQUNBLCtCLGtGQUVBLEdBQU0sWUFBYSxRQUFiLFdBQWEsVUFBRyxJQUFILE1BQUcsR0FBSCxDQUFRLFlBQVIsTUFBUSxZQUFSLENBQXNCLE9BQXRCLE1BQXNCLE9BQXRCLENBQStCLElBQS9CLE1BQStCLElBQS9CLE9BQTBDLGdCQUFTLENBQ3BFLE1BQU0sY0FBTixHQUNBLEtBQUssR0FBTCxDQUFVLGFBQWEsTUFBdkIsQ0FBK0IsT0FBL0IsQ0FDRCxDQUhrQixDQUFuQixDQUtBLEdBQU0sYUFBYyxRQUFkLFlBQWMsV0FBRyxpQkFBSCxPQUFHLGdCQUFILENBQXFCLFFBQXJCLE9BQXFCLFFBQXJCLENBQStCLEdBQS9CLE9BQStCLEdBQS9CLENBQW9DLFlBQXBDLE9BQW9DLFlBQXBDLENBQXFELElBQXJELHlHQUNsQixzRkFDRyxpQkFBaUIsU0FBUyxHQUFULEVBQWMsa0NBQWEseUJBQWIsRUFBOEIsSUFBOUIsRUFBZCxDQUFqQixDQURILENBRUcsYUFBYSxHQUFiLENBRkgsQ0FEa0IsQ0FBcEIsQyxnQkFPZSxzQ0FBZ0IsQ0FBRSxtQkFBRixDQUFoQixFQUFtQyxXQUFuQyxDOzs7a0pDaEJmLDRCLDJDQUNBLHVDQUNBLGdDLDJDQUNBLG9DLCtDQUNBLGtDLDZDQUNBLDhDLHlEQUNBLDJCLGtGQUVBLEdBQU0sS0FBTSxRQUFOLElBQU0sTUFBaUMsSUFBOUIsU0FBOEIsTUFBOUIsUUFBOEIsQ0FBcEIsTUFBb0IsTUFBcEIsTUFBb0IsQ0FBWixLQUFZLE1BQVosS0FBWSxDQUMzQyxHQUFNLE1BQVUsS0FBVixPQUFxQixNQUEzQixDQUNBLE1BQ0Usc0ZBQ0Usc0dBREYsQ0FFRSxtQ0FBRyxVQUFVLGVBQWIsaURBQ0UscUNBQ0UsSUFBSSxzQ0FETixDQUVFLE1BQU0sNkJBRlIsaURBREYsQ0FLRSxpREFBUyxHQUFHLFVBQVosaURBQXlCLGVBQXpCLENBTEYsQ0FNRSxpREFBUyxHQUFHLGFBQVosaURBQTRCLFlBQTVCLENBTkYsQ0FPRSxnR0FQRixDQVFFLHNDQUFNLFVBQVUsUUFBaEIsQ0FBeUIsTUFBTyxJQUFoQyxpREFBdUMsSUFBdkMsQ0FSRixDQVNFLCtGQVRGLENBRkYsQ0FhRSxxRkFBTSxRQUFOLENBYkYsQ0FnQkgsQ0FuQkQsQyxnQkFxQmUsd0NBQW1CLEdBQW5CLEM7Ozt5SkM3QmYsNEIsNkhBRUEsR0FBTSxZQUFhLFFBQWIsV0FBYSxNQUEwQixJQUFiLEtBQWEsTUFBdkIsTUFBdUIsQ0FBYixJQUFhLENBQzNDLEdBQU0sVUFBVyxDQUNmLEtBQU0sb0JBRFMsQ0FFZixPQUFRLHFCQUZPLENBR2YsUUFBUyxxQkFITSxDQUFqQixDQUtBLEdBQU0sUUFBUyxDQUNiLEtBQU0scUJBRE8sQ0FFYixPQUFRLHFCQUZLLENBR2IsUUFBUyxxQkFISSxDQUFmLENBS0EsR0FBTSxTQUFVLFNBQVMsSUFBVCxHQUFrQixrQkFBbEMsQ0FDQSxHQUFNLE1BQU8sT0FBTyxJQUFQLEdBQWdCLHFCQUE3QixDQUNBLE1BQ0Usc0ZBQ0Usb0ZBQUssT0FBTCxDQURGLENBRUUsbUZBQUksSUFBSixDQUZGLENBS0gsQ0FuQkQsQyxnQkFxQmUsVTs7O3FSQ3ZCZiw0QiwyQ0FDQSx1Q0FDQSxnQywyQ0FDQSx3QyxtREFDQSw4Qix5Q0FDQSw0Qyx1REFDQSxpQyxrRkFFQSxHQUFNLFNBQVUsUUFBVixRQUFVLE1BT1YsSUFOSixNQU1JLE1BTkosS0FNSSxDQUxKLFFBS0ksTUFMSixRQUtJLENBTE0sV0FLTixNQUxNLFdBS04sQ0FMbUIsV0FLbkIsTUFMbUIsV0FLbkIsQ0FKSixXQUlJLE1BSkosV0FJSSxDQUhKLGNBR0ksTUFISixjQUdJLENBSFksb0JBR1osTUFIWSxvQkFHWixDQUZKLE9BRUksTUFGSixPQUVJLENBRkssT0FFTCxNQUZLLE9BRUwsQ0FESixRQUNJLE1BREosUUFDSSxDQUNKLEdBQU0sTUFBTyx3QkFBWSxXQUFaLENBQXlCLE9BQXpCLENBQWIsQ0FDQSxHQUFNLFVBQVcsUUFBWCxTQUFXLGdCQUFZLHVDQUFNLFVBQVUsaUNBQWhCLENBQWtELFFBQVMsT0FBM0QsaURBQVosQ0FBakIsQ0FDQSxHQUFNLFVBQVcsUUFBWCxTQUFXLGdCQUFZLHVDQUFNLFVBQVUsa0NBQWhCLENBQW1ELFFBQVMsT0FBNUQsaURBQVosQ0FBakIsQ0FDQSxHQUFNLGtCQUFtQixRQUFuQixpQkFBbUIsZ0JBQ3ZCLG9DQUFHLFVBQVUsT0FBYixpREFDRSxtREFDRSxTQUFVLFFBRFosaURBREYsS0FHTSxXQUhOLENBR21CLEdBSG5CLENBSUUsOENBQU0sU0FBVSxjQUFoQixDQUFnQyxNQUFPLG9CQUF2QyxpREFKRixDQUlrRSxHQUpsRSxDQUtHLE9BTEgsQ0FEdUIsQ0FBekIsQ0FTQSxNQUNFLHNDQUFLLFVBQVUsT0FBZixpREFDRSxPQUFTLElBQVQsQ0FBaUIsbUZBQUksY0FBSixDQUFqQixDQUNFLHFEQUNFLElBQVEsS0FBUixLQUFpQixRQURuQixDQUVFLGlCQUFrQixnQkFGcEIsQ0FHRSxTQUFVLENBQUMsUUFBRCxDQUFXLFFBQVgsQ0FIWixDQUlFLFFBQVMsU0FBVyxDQUFYLENBQWUsQ0FKMUIsQ0FLRSxhQUFjLENBQ1gsdUNBQU8sSUFBSSxPQUFYLGlEQUNDLHVGQUNHLEtBQUssR0FBTCxDQUFTLFNBQUMsTUFBRCxDQUFTLENBQVQsUUFDUixxQ0FBSSxJQUFLLENBQVQsaURBQ0csT0FBTyxHQUFQLENBQVcsU0FBQyxDQUFELENBQUksQ0FBSixDQUFVLENBQ3BCLEdBQUksSUFBTSxJQUFWLENBQWdCLENBQ2QsTUFBTyxxQ0FBSSxJQUFLLENBQVQsaURBQ1IsQ0FIbUIsbUNBSVEsQ0FKUixJQUliLE9BSmEsT0FJSixRQUpJLE9BS3BCLEdBQU0sWUFBYyxHQUFLLENBQU4sQ0FBVyxPQUFYLENBQXFCLFdBQXhDLENBQ0EsTUFBTyxDQUNMLG9DQUNDLElBQUssT0FETixDQUVDLFVBQVcsVUFGWixpREFJRSwrQ0FDRSxTQUFVLFFBRFosQ0FFRSxRQUFTLE9BRlgsQ0FHRSxTQUFVLFFBSFosaURBSkYsQ0FESyxDQVlMLG9DQUNFLElBQUksTUFETixDQUVFLFVBQVUsV0FGWixpREFJRSw4Q0FBTSxTQUFVLFFBQVEsT0FBUixDQUFoQixpREFKRixDQVpLLENBbUJSLENBekJBLENBREgsQ0FEUSxDQUFULENBREgsQ0FERCxDQURXLENBbUNYLHFDQUFLLElBQUksS0FBVCxpREFuQ1csQ0FMaEIsaURBRkosQ0FnREgsQ0FyRUQsQyxnQkF1RWUsZ0RBQXdCLE9BQXhCLEM7OztpUkMvRWYsNEIsMkNBRUEsZ0MsMkNBQ0Esa0MsNkNBQ0Esb0MsK0NBQ0Esc0MsbUlBRUEsR0FBTSxTQUFVLENBQ2Qsa0JBRGMsQ0FFZCxvQkFGYyxDQUdkLHNCQUhjLENBQWhCLENBTUEsR0FBTSxLQUFNLFFBQU4sSUFBTSxNQUF5QyxJQUFoQixRQUFnQixNQUF0QyxRQUFzQyxDQUExQixRQUEwQixrQkFDekIsbUJBQW1CLElBQW5CLENBQXdCLE9BQXhCLEVBQWlDLEtBQWpDLENBQXVDLENBQXZDLENBRHlCLDJEQUM1QyxNQUQ0QyxrQkFDcEMsT0FEb0Msb0NBRXpCLG1CQUFtQixJQUFuQixDQUF3QixPQUF4QixFQUFpQyxLQUFqQyxDQUF1QyxDQUF2QyxDQUZ5Qiw0REFFNUMsT0FGNEMsa0JBRW5DLE1BRm1DLHFCQUdqQyxTQUhpQyxDQUdwQixPQUhvQixDQUcxQyxNQUgwQyxFQUluRCxNQUFPLFdBQVksSUFBWixDQUNMLGtEQUFVLE9BQVEsQ0FBQyxrQkFBbUIsT0FBcEIsQ0FBbEIsaURBREssQ0FHTCw4QkFBQyxRQUFELEVBQVUsT0FBUSxNQUFsQixDQUEwQixRQUFTLE9BQW5DLENBQTRDLE9BQVEsTUFBcEQsQ0FBNEQsSUFBSyxPQUFqRSxpREFFSCxDQVRELEMsZ0JBV2UsRzs7O3NKQ3hCZiw0Qiw2SEFFQSxHQUFNLFNBQVUsUUFBVixRQUFVLE1BQWlDLElBQTlCLE9BQThCLE1BQTlCLE1BQThCLENBQXRCLE9BQXNCLE1BQXRCLE9BQXNCLENBQWIsTUFBYSxNQUFiLE1BQWEsQ0FDL0MsR0FBTSxpQkFBa0IsTUFBbEIsS0FBNEIsT0FBNUIsS0FBdUMsTUFBN0MsQ0FDQSxNQUNFLHlDQUNFLE9BQU8sTUFEVCxDQUVFLE1BQU0sTUFGUixDQUdFLElBQUssR0FIUCxnREFNSCxDQVRELEMsZ0JBV2UsTzs7O3FKQ2JmLDRCLDZIQUVBLEdBQU0sUUFBUyxRQUFULE9BQVMsTUFBaUMsSUFBOUIsT0FBOEIsTUFBOUIsTUFBOEIsQ0FBdEIsT0FBc0IsTUFBdEIsT0FBc0IsQ0FBYixNQUFhLE1BQWIsTUFBYSxDQUM5QyxHQUFNLGtCQUFtQixNQUFuQixLQUE2QixPQUE3QixLQUF3QyxNQUE5QyxDQUNBLEdBQU0sS0FBTSxtQkFBbUIsSUFBbkIsQ0FBd0IsVUFBVSxTQUFsQyxHQUFnRCxDQUFDLE9BQU8sUUFBcEUsQ0FDQSxNQUFPLEtBQ0wsa0ZBQ0UsbUNBQUcsT0FBTyxRQUFWLENBQW1CLElBQUkscUJBQXZCLENBQTZDLEtBQU0sSUFBbkQsZ0RBQTJELE9BQTNELENBREYsQ0FDMEUsMEJBRDFFLENBREssQ0FLTCx3Q0FDRSxPQUFPLE1BRFQsQ0FFRSxNQUFNLE1BRlIsQ0FHRSxLQUFNLElBSFIsQ0FJRSxLQUFLLGlCQUpQLGlEQU1FLG1DQUFHLE9BQU8sUUFBVixDQUFtQixJQUFJLHFCQUF2QixDQUE2QyxLQUFNLElBQW5ELGlEQUEyRCxPQUEzRCxDQU5GLENBTTBFLDBCQU4xRSxDQVNILENBakJELEMsZ0JBbUJlLE07OztvSkNyQmYsNEIsMkNBQ0EsdUNBQ0EsaUMsa0ZBRUEsR0FBTSxPQUFRLFFBQVIsTUFBUSxNQUE0RCxJQUF6RCxTQUF5RCxNQUF6RCxRQUF5RCxDQUEvQyxPQUErQyxNQUEvQyxPQUErQyxDQUF0QyxRQUFzQyxNQUF0QyxRQUFzQyxDQUE1QixhQUE0QixNQUE1QixhQUE0QixDQUFiLE1BQWEsTUFBYixNQUFhLElBQ3JELEtBRHFELENBQzVDLGFBRDRDLENBQy9ELE9BRCtELEVBRXhFLE1BQ0Esc0ZBQ0UsdUNBQ0UsS0FBSyxVQURQLENBRUUsUUFBUyxJQUZYLENBR0UsVUFBVSxPQUhaLENBSUUsU0FBVSwwQkFBTSxRQUFPLFFBQVAsQ0FBaUIsT0FBakIsQ0FBMEIsQ0FBQyxJQUEzQixDQUFOLENBSlosZ0RBREYsS0FPTyxRQVBQLENBVUQsQ0FiRCxDLGdCQWVlLGlEQUEwQixDQUFFLDBCQUFGLENBQTFCLEVBQW1ELEtBQW5ELEM7OztxSkNuQmYsNEIsMkNBQ0EsdUNBRUEsc0MsaURBQ0Esb0MsK0NBQ0EsZ0MsMkNBRUEsaUMsa0ZBRUEsR0FBTSxhQUFjLENBQ2xCLDJCQURrQixDQUVsQixxQkFGa0IsQ0FHbEIseUJBSGtCLENBQXBCLENBTUEsR0FBTSxRQUFTLFFBQVQsT0FBUyxVQUNiLE9BRGEsTUFDYixNQURhLENBRWIsS0FGYSxNQUViLEtBRmEsQ0FHYixNQUhhLE1BR2IsTUFIYSxDQUliLFVBSmEsTUFJYixVQUphLENBS2IsY0FMYSxNQUtiLGNBTGEsQ0FLRyxvQkFMSCxNQUtHLG9CQUxILENBTWIsT0FOYSxNQU1iLE9BTmEsT0FRYixzRkFDRyxXQUFXLE1BQVgsQ0FBa0Isa0JBQUssUUFBTyxFQUFFLEtBQVQsQ0FBTCxDQUFsQixFQUF3QyxHQUF4QyxDQUE0QyxTQUFDLE1BQUQsQ0FBUyxRQUFULENBQXNCLElBQ3pELEtBRHlELENBQ2hELE1BRGdELENBQ3pELElBRHlELElBRWpELE9BRmlELENBRXRDLFdBRnNDLENBRXhELElBRndELEVBR2pFLEdBQUksT0FBUyxNQUFRLFVBQXJCLENBQWlDLENBQy9CLE1BQU8sb0NBQUcsSUFBSyxRQUFSLGlEQUFtQixJQUFuQixDQUNSLENBQ0QsTUFDRSwrQkFBQyxNQUFELEVBQ0UsSUFBSyxRQURQLENBRUUsTUFBTyxLQUZULENBR0UsU0FBVSxRQUhaLENBSUUsWUFBYSxPQUFPLEtBSnRCLENBS0UsWUFBYSxPQUFPLEtBTHRCLENBTUUsUUFBUyxPQUFPLE9BTmxCLENBT0UsZUFBZ0IsY0FQbEIsQ0FRRSxxQkFBc0IscUJBQXFCLFFBQXJCLENBUnhCLENBU0UsUUFBUyxRQUFRLFFBQVIsQ0FUWCxDQVVFLFNBQVUsT0FBTyxRQVZuQixpREFZQSxDQW5CSCxDQURILENBUmEsQ0FBZixDLGdCQWlDZSxpREFBeUIsTUFBekIsQzs7O3VKQ2hEZiw0QiwyQ0FDQSx1Q0FDQSw4Qix5Q0FDQSxpQyxrRkFHQSxHQUFNLFVBQVcsUUFBWCxTQUFXLFVBQ2YsU0FEZSxNQUNmLFFBRGUsQ0FDTCxXQURLLE1BQ0wsV0FESyxDQUNRLFdBRFIsTUFDUSxXQURSLENBRWYsYUFGZSxNQUVmLGFBRmUsQ0FHZixjQUhlLE1BR2YsY0FIZSxDQUdDLG9CQUhELE1BR0Msb0JBSEQsQ0FJZixNQUplLE1BSWYsTUFKZSxPQU1mLHNGQUNFLG1DQUFHLG1CQUFvQixXQUF2QixpREFDRSx1Q0FDRSxLQUFLLE1BRFAsQ0FFRSxVQUFVLFFBRlosQ0FHRSx5QkFBMEIsV0FINUIsQ0FJRSxNQUFPLGFBSlQsQ0FLRSxTQUFVLCtCQUFTLFFBQU8sUUFBUCxDQUFpQixNQUFNLE1BQU4sQ0FBYSxLQUE5QixDQUFULENBTFosaURBREYsQ0FPSyxHQVBMLENBUUUsOENBQU0sU0FBVSxjQUFoQixDQUFnQyxNQUFPLG9CQUF2QyxpREFSRixDQURGLENBTmUsQ0FBakIsQyxnQkFvQmUsaURBQTBCLENBQUUsNkJBQUYsQ0FBMUIsRUFBc0QsUUFBdEQsQzs7O3dKQzFCZiw0QiwyQ0FDQSx1Q0FDQSxxQ0FDQSxpQyxrRkFFQSxHQUFNLFVBQVcsUUFBWCxTQUFXLGFBQVUsT0FBUSxJQUFULENBQWlCLEVBQWpCLENBQXNCLEtBQUssT0FBTCxDQUFhLFVBQWIsQ0FBeUIsRUFBekIsQ0FBL0IsQ0FBakIsQ0FFQSxHQUFNLGNBQWUsUUFBZixhQUFlLE1BQWlCLElBQWpCLENBQTBCLElBQWxCLE1BQWtCLE1BQXZCLEdBQXVCLENBQzdDLEdBQUksY0FBSixDQUQ2QyxHQUVoQixPQUZnQixDQUVILElBRkcsQ0FFckMsUUFGcUMsQ0FFeEIsS0FGd0IsRUFHN0MsR0FBSSxNQUFKLENBQVksb0JBQ3VFLE1BRHZFLENBQ0YsTUFERSxDQUNRLElBRFIsZ0JBQ1EsSUFEUixDQUNjLFNBRGQsZ0JBQ2MsU0FEZCxDQUN5QixRQUR6QixnQkFDeUIsUUFEekIsQ0FDbUMsUUFEbkMsZ0JBQ21DLFFBRG5DLENBQzZDLFNBRDdDLGdCQUM2QyxTQUQ3QyxDQUN3RCxRQUR4RCxnQkFDd0QsUUFEeEQsQ0FFVixHQUFNLE9BQVEsVUFBWSxFQUExQixDQUNBLEdBQUksVUFBVyxDQUFDLFdBQWEsRUFBZCxDQUFrQixVQUFZLEVBQTlCLEVBQWtDLE1BQWxDLENBQXlDLGtCQUFLLEVBQUwsQ0FBekMsRUFBaUQsSUFBakQsQ0FBc0QsR0FBdEQsQ0FBZixDQUNBLEdBQUksVUFBWSxFQUFoQixDQUFvQixDQUFDLFNBQVcsS0FBTSxDQUN0QyxHQUFNLFVBQVksVUFBWSxLQUFiLEtBQ1gsUUFEVyxhQUNTLEtBRFQsS0FHZixTQUFXLEtBSGIsQ0FLQSxHQUFNLFVBQVcsY0FBZ0IsSUFBaEIsS0FBMEIsRUFBM0MsQ0FDQSxHQUFNLGVBQWdCLCtCQUFpQyxTQUFqQyxLQUFnRCxFQUF0RSxDQUNBLEdBQU0sY0FBZSxvQkFBc0IsUUFBdEIsS0FBb0MsRUFBekQsQ0FDQSxPQUFTLENBQUMsUUFBRCxDQUFXLFFBQVgsQ0FBcUIsYUFBckIsQ0FBb0MsWUFBcEMsRUFBa0QsTUFBbEQsQ0FBeUQsa0JBQUssRUFBTCxDQUF6RCxFQUFpRSxJQUFqRSxDQUFzRSxJQUF0RSxDQUNWLENBZEQsSUFlSyxDQUNILE9BQVMsU0FDVixDQUNELE1BQU8sT0FDUixDQXRCRCxDQXdCQSxHQUFNLGlCQUFrQixRQUFsQixnQkFBa0IsT0FBaUIsT0FBakIsQ0FBNkIsSUFBckIsTUFBcUIsT0FBMUIsR0FBMEIsSUFDdEIsT0FEc0IsQ0FDVCxPQURTLENBQzNDLFFBRDJDLENBQzlCLEtBRDhCLEVBRW5ELEdBQUksTUFBSixDQUFZLHFCQUN3QixNQUR4QixDQUNGLE1BREUsQ0FDUSxJQURSLGlCQUNRLElBRFIsQ0FDYyxHQURkLGlCQUNjLEdBRGQsQ0FFVixNQUFVLElBQVYsTUFBa0IsSUFDbkIsQ0FIRCxJQUlLLENBQ0gsTUFBTyxTQUNSLENBQ0YsQ0FURCxDQVdBLEdBQU0sZUFBZ0IsUUFBaEIsY0FBZ0IsQ0FBQyxLQUFELE9BQXlELElBQS9DLFFBQStDLE9BQS9DLE9BQStDLENBQXRDLE9BQXNDLE9BQXRDLE9BQXNDLENBQTdCLE9BQTZCLE9BQTdCLE9BQTZCLENBQXBCLElBQW9CLE9BQXBCLElBQW9CLENBQWQsT0FBYyxPQUFkLE9BQWMsQ0FDN0UsR0FBSSxPQUFTLElBQWIsQ0FBbUIsQ0FBQyxNQUFPLEVBQUcsQ0FDOUIsT0FBUSxPQUFSLEVBQ0UsSUFBSyxLQUFMLENBQVksQ0FDVixPQUFRLE9BQVIsRUFDRSxJQUFLLE1BQUwsQ0FBYSxDQUNYLE1BQU8sY0FBYSxLQUFiLENBQW9CLElBQXBCLENBQ1IsQ0FDRCxJQUFLLFNBQUwsQ0FBZ0IsQ0FDZCxNQUFPLGlCQUFnQixLQUFoQixDQUF1QixPQUF2QixDQUNSLENBQ0QsUUFBUyxNQUFPLE9BQU0sS0FBYixDQVBYLENBU0QsQ0FDRCxJQUFLLFVBQUwsQ0FBaUIsQ0FDZixNQUFPLFVBQVMsS0FBVCxDQUNSLENBQ0QsUUFBUyxDQUNQLE1BQU8sTUFDUixDQWpCSCxDQW1CRCxDQXJCRCxDQXVCQSxHQUFNLFdBQVksUUFBWixVQUFZLE9BQWlFLElBQTlELE1BQThELE9BQTlELEtBQThELENBQXZELE1BQXVELE9BQXZELE1BQXVELENBQS9DLE9BQStDLE9BQS9DLE9BQStDLENBQXRDLE9BQXNDLE9BQXRDLE9BQXNDLENBQTdCLE9BQTZCLE9BQTdCLE9BQTZCLENBQXBCLElBQW9CLE9BQXBCLElBQW9CLENBQWQsT0FBYyxPQUFkLE9BQWMsQ0FDakYsR0FBTSxPQUFRLENBQUUsZUFBRixDQUFXLGVBQVgsQ0FBb0IsZUFBcEIsQ0FBNkIsU0FBN0IsQ0FBbUMsZUFBbkMsQ0FBZCxDQUNBLE1BQ0Usb0ZBQ0UsdUZBQU8sbUZBQUksS0FBSixLQUFQLENBREYsQ0FDaUMsR0FEakMsQ0FHSSxPQUFPLEdBQVAsQ0FBVyxTQUFDLEtBQUQsQ0FBUSxDQUFSLFFBQ1QsdUNBQU0sSUFBSyxDQUFYLGlEQUFnQixHQUFLLENBQU4sQ0FBUyxLQUFULENBQWlCLEVBQWhDLENBQW1DLHNGQUFPLGNBQWMsS0FBZCxDQUFxQixLQUFyQixDQUFQLENBQW5DLENBRFMsQ0FBWCxDQUhKLENBU0gsQ0FaRCxDLGdCQWNlLHdCQUFRLGtFQUFSLEVBQStDLFNBQS9DLEM7Ozt5WEMvRWYsNEIsMkNBQ0EsNEMsdURBQ0EsMEMscURBQ0Esb0MsaUlBRUEsR0FBTSxVQUFXLFFBQVgsU0FBVyxNQUF1QyxJQUFwQyxNQUFvQyxNQUFwQyxLQUFvQyxDQUE3QixNQUE2QixNQUE3QixNQUE2QixDQUFyQixLQUFxQixNQUFyQixLQUFxQixDQUFkLE9BQWMsTUFBZCxPQUFjLElBQ3pDLElBRHlDLENBQ1QsTUFEUyxDQUM5QyxHQUQ4QyxDQUMzQixhQUQyQixDQUNULE1BRFMsQ0FDbkMsS0FEbUMsRUFFdEQsR0FBSSxrQkFBSixDQUNBLEdBQUksQ0FBQyxhQUFMLENBQW9CLENBQUMsV0FBYSxTQUFVLENBQTVDLElBQ0ssZ0RBQ1ksYUFEWixJQUNGLFVBREUsbUJBRUgsR0FBSSxPQUFPLFdBQVAsZ0RBQU8sVUFBUCxJQUFxQixRQUF6QixDQUFtQyxpQkFDZixVQURlLENBQ3pCLEtBRHlCLGFBQ3pCLEtBRHlCLENBRWpDLFdBQWEsS0FDZCxDQUNGLENBRUQsR0FBTSxVQUFXLFFBQVgsU0FBVyxnQkFBWSx1Q0FBTSxVQUFVLGlDQUFoQixDQUFrRCxRQUFTLE9BQTNELGlEQUFaLENBQWpCLENBQ0EsR0FBTSxVQUFXLFFBQVgsU0FBVyxnQkFBWSx1Q0FBTSxVQUFVLGtDQUFoQixDQUFtRCxRQUFTLE9BQTVELGlEQUFaLENBQWpCLENBQ0EsR0FBTSxrQkFBbUIsUUFBbkIsaUJBQW1CLGdCQUN2QixvRkFDRyxPQURILENBRUUsc0ZBQ0csVUFESCxDQUZGLENBRHVCLENBQXpCLENBU0EsTUFDRSxxQ0FBSSxHQUFJLEdBQVIsaURBQ0Usb0ZBQ0UsUUFDRSxxREFDRSxJQUFRLEtBQVIsS0FBaUIsR0FEbkIsQ0FFRSxpQkFBa0IsZ0JBRnBCLENBR0UsU0FBVSxDQUFDLFFBQUQsQ0FBVyxRQUFYLENBSFosQ0FJRSxhQUFjLENBQ1osb0RBQ0UsSUFBSSxNQUROLENBRUUsTUFBTyxLQUZULENBR0UsSUFBSyxHQUhQLGlEQURZLENBTVgsRUFOVyxDQUpoQixDQVdFLFFBQVMsQ0FYWCxpREFERixDQWVFLGlEQUFTLFVBQVUsS0FBbkIsQ0FBeUIsT0FBUSxLQUFSLFlBQXdCLEdBQWpELGlEQUNFLHNGQUNHLFVBREgsQ0FERixDQWhCSixDQURGLENBMkJILENBbkRELEMsZ0JBcURlLFE7Ozt1SkMxRGYsNEIsMkNBQ0EsdUNBQ0Esc0MsaURBQ0EsaUMsa0ZBRUEsR0FBTSxVQUFXLFFBQVgsU0FBVyxNQUFxRCxJQUFsRCxPQUFrRCxNQUFsRCxNQUFrRCxDQUExQyxLQUEwQyxNQUExQyxLQUEwQyxDQUFuQyxLQUFtQyxNQUFuQyxLQUFtQyxDQUE1QixZQUE0QixNQUE1QixZQUE0QixDQUFkLE9BQWMsTUFBZCxPQUFjLElBQ2pELFNBRGlELENBQ2xDLE1BRGtDLENBQzNELEtBRDJELEVBQ2pELFFBRGlELENBRXBFLE1BQ0UscUZBQ0UsdUZBQ0UsdUZBQ0EsYUFBYSxHQUFiLENBQWlCLGFBQU8sSUFDZCxPQURjLENBQ0gsU0FBUyxHQUFULENBREcsQ0FDZCxNQURjLENBRXRCLE1BQ0UsbURBQVUsSUFBSyxHQUFmLENBQW9CLE1BQU8sS0FBM0IsQ0FBa0MsTUFBTyxLQUF6QyxDQUFnRCxPQUFRLE1BQXhELENBQWdFLFFBQVMsT0FBekUsaURBRUgsQ0FMRCxDQURBLENBREYsQ0FERixDQWFILENBaEJELEMsZ0JBa0JlLDJDQUFtQixRQUFuQixDOzs7NEpDdkJmLDRCLDJDQUVBLDBDLHVJQUVBLEdBQU0sZUFBZ0IsUUFBaEIsY0FBZ0IsNEJBQUcsTUFBSCxDQUFhLEtBQWIsYUFBYSxLQUFiLENBQW9CLEdBQXBCLGFBQW9CLEdBQXBCLENBQW9DLE9BQXBDLE1BQTJCLEtBQTNCLENBQW9DLE9BQXBDLE9BQ3BCLHFEQUFZLE1BQU8sS0FBbkIsQ0FBMEIsSUFBSyxHQUEvQixDQUFvQyxRQUFTLE9BQTdDLGdEQURvQixDQUF0QixDLGdCQUllLGE7Ozs2UENSZiw0QiwyQ0FDQSx5QyxrRkFFQSxHQUFNLFNBQVUsUUFBVixRQUFVLGNBQVMsMEVBQVUsS0FBVixFQUFpQixnQkFBZ0IsUUFBakMsaURBQVQsQ0FBaEIsQyxnQkFFZSxPOzs7dUpDTGYsNEIsNkhBRUEsR0FBTSxVQUFXLFFBQVgsU0FBVyxVQUFZLE1BQVosTUFBRSxNQUFGLENBQVksS0FBWixPQUEyQixvRkFBSyxPQUFMLENBQWEscUZBQU8sS0FBUCxDQUFiLENBQWtDLDBCQUFsQyxDQUEzQixDQUFqQixDLGdCQUVlLFE7OzttSkNKZiw0QiwyQ0FDQSx1Q0FDQSwyQixrRkFFQSxHQUFNLE1BQU8sUUFBUCxLQUFPLFVBQUcsT0FBSCxNQUFHLE1BQUgsQ0FBVyxRQUFYLE1BQVcsUUFBWCxDQUFxQixRQUFyQixNQUFxQixRQUFyQixDQUErQixNQUEvQixNQUErQixNQUEvQixDQUF1QyxLQUF2QyxNQUF1QyxLQUF2QyxPQUNYLHNDQUNFLFVBQVcsTUFEYixDQUVFLE1BQU8scUJBQVksUUFBWixDQUFzQixDQUFFLGFBQUYsQ0FBVSxXQUFWLENBQXRCLENBRlQsZ0RBSUcsUUFKSCxDQURXLENBQWIsQyxnQkFTZSx3Q0FBbUIsSUFBbkIsQzs7O21KQ2JmLDRCLDJDQUNBLHVDQUNBLGtDLCtIQUVBLEdBQU0sTUFBTyxRQUFQLEtBQU8sVUFBRyxNQUFILE1BQUcsS0FBSCxDQUFVLFFBQVYsTUFBVSxRQUFWLE9BQ1gscURBQVUsTUFBTyxLQUFqQixnREFDRSwrRkFDRyxRQURILENBREYsQ0FEVyxDQUFiLEMsZ0JBUWUsSTs7O21KQ1pmLDRCLDZIQUVBLEdBQU0sTUFBTyxRQUFQLEtBQU8sVUFBRSxTQUFGLE1BQUUsUUFBRixDQUFZLEtBQVosTUFBWSxLQUFaLE9BQ1gsdUNBQU0sVUFBVSxRQUFoQixnREFDRyxVQUFZLElBQVosQ0FBbUIsRUFBbkIsSUFBMkIsUUFEOUIsQ0FFSSxPQUFTLElBQVQsRUFBaUIsVUFBWSxJQUE5QixDQUFzQyxFQUF0QyxDQUEyQyxNQUY5QyxDQUdFLHVGQUFTLE9BQVMsSUFBVCxDQUFnQixFQUFoQixJQUF3QixLQUFqQyxDQUhGLENBRFcsQ0FBYixDLGdCQVFlLEk7OztxSkNWZiw0QiwyQ0FDQSxvQyxpSUFFQSxHQUFNLFFBQVMsUUFBVCxPQUFTLFNBQ2IsdUNBQU0sVUFBVSxPQUFoQixnREFDRSxpREFBUyxHQUFHLGdCQUFaLGdEQUErQixPQUEvQixDQURGLENBRUUsaURBQVMsR0FBRyx1QkFBWixnREFBc0MsVUFBdEMsQ0FGRixDQUdFLGlEQUFTLEdBQUcsc0JBQVosZ0RBQXFDLFFBQXJDLENBSEYsQ0FJRSxtQ0FBRyxLQUFLLG9DQUFSLENBQTZDLE9BQU8sUUFBcEQsQ0FBNkQsSUFBSSxxQkFBakUsZ0RBQXlGLFVBQXpGLENBSkYsQ0FEYSxDQUFmLEMsZ0JBU2UsTTs7O3FKQ1pmLDRCLDJDQUNBLHVDQUNBLG9DLCtDQUNBLDhCLHlDQUNBLDJCLGtGQUVBLEdBQU0sUUFBUyxRQUFULE9BQVMsVUFBWSxNQUFaLE1BQUUsTUFBRixDQUFZLEtBQVosQ0FBcUIsUUFBckIsTUFBcUIsUUFBckIsQ0FBK0IsTUFBL0IsTUFBK0IsTUFBL0IsQ0FBdUMsS0FBdkMsTUFBdUMsS0FBdkMsT0FDYixxRkFDRSw4Q0FBTSxPQUFPLFdBQWIsQ0FBeUIsU0FBUyxNQUFsQyxnREFDSSxPQUFTLFNBQVYsQ0FDQyxxRkFDRSxtRkFBRyxpREFBUyxPQUFRLEtBQVIsUUFBVCxpREFBaUMsV0FBakMsQ0FBSCxDQURGLENBRUUsbUZBQUcsaURBQVMsT0FBUSxLQUFSLFVBQVQsaURBQW1DLFNBQW5DLENBQUgsQ0FGRixDQURELENBTUMscUZBQ0UsbUZBQUcsaURBQVMsT0FBUSxLQUFSLFFBQVQsaURBQWlDLE9BQWpDLENBQUgsQ0FERixDQUVFLG1GQUFHLGlEQUFTLE9BQVEsS0FBUixVQUFULGlEQUFtQyxVQUFuQyxDQUFILENBRkYsQ0FHRSxtRkFBRyxpREFBUyxPQUFRLEtBQVIsV0FBVCxpREFBb0MsVUFBcEMsQ0FBSCxDQUhGLENBUEosQ0FERixDQWVFLDhDQUFNLE9BQU8sT0FBYixDQUFxQixTQUFTLE9BQTlCLGlEQUNJLFFBREosQ0FmRixDQURhLENBQWYsQyxnQkFzQmUsd0NBQW1CLE1BQW5CLEM7OzttekJDNUJmLDRCLDJDQUNBLHVDQUNBLDZDLDJEQUNBLHlDQUNBLDRDLHVEQUNBLGlDQUNBLDJCLGtGQUVBLEdBQU0sWUFBYSxRQUFiLFdBQWEsVUFBRyxTQUFILE1BQUcsUUFBSCxDQUFhLElBQWIsTUFBYSxJQUFiLE9BQ2pCLE1BQUssS0FBTCxDQUFXLGlCQUFYLEVBQ0ksbUNBQUcsS0FBTSxJQUFULGlEQUFpQixRQUFqQixDQURKLENBRUksaURBQU0sR0FBSSxJQUFWLGlEQUFrQixRQUFsQixDQUhhLENBQW5CLEMsR0FNTSxNLGdVQUNLLFlBQzZCLElBRDdCLENBQ0EsS0FEQSxDQUNTLE9BRFQsUUFDUyxPQURULENBQ2tCLElBRGxCLFFBQ2tCLElBRGxCLENBRVAsR0FBTSxrQkFBbUIsUUFBbkIsaUJBQW1CLGdCQUFXLG9DQUFHLE1BQU8sQ0FBQyxNQUFPLE9BQVIsQ0FBVixpREFBOEIsT0FBOUIsQ0FBWCxDQUF6QixDQUNBLEdBQU0sVUFBVyxRQUFYLFNBQVcsZ0JBQVcsb0NBQUcsVUFBVSwyQkFBYixDQUF5QyxLQUFLLEdBQTlDLENBQWtELE1BQU0saUJBQXhELENBQTBFLFFBQVMsT0FBbkYsaURBQVgsQ0FBakIsQ0FDQSxHQUFNLFVBQVcsUUFBWCxTQUFXLGdCQUFXLG9DQUFHLFVBQVUsMkJBQWIsQ0FBeUMsS0FBSyxHQUE5QyxDQUFrRCxNQUFNLFdBQXhELENBQW9FLFFBQVMsT0FBN0UsaURBQVgsQ0FBakIsQ0FFQSxHQUFJLE1BQVEsSUFBWixDQUFrQixDQUNoQixNQUFPLHFHQUFxQixPQUFyQixDQUNSLENBQ0QsTUFDRSxzQ0FBSyxNQUFPLENBQUMsWUFBYSxPQUFkLENBQVosaURBQ0UscURBQ0UsSUFBSyxPQURQLENBRUUsaUJBQWtCLGdCQUZwQixDQUdFLFNBQVUsQ0FBQyxRQUFELENBQVcsUUFBWCxDQUhaLENBSUUsYUFBYyxDQUNaLHFDQUFLLElBQUksS0FBVCxpREFDRSx1REFDRSxPQUFRLElBRFYsQ0FFRSxVQUFXLENBQUMsS0FBTSxVQUFQLENBRmIsaURBREYsQ0FEWSxDQVFaLHFDQUFLLElBQUksS0FBVCxpREFDRSxxQ0FBSyxVQUFVLFdBQWYsaURBQTZCLElBQTdCLENBREYsQ0FSWSxDQUpoQixpREFERixDQW9CSCxDLDZEQUNtQixhQUNtQyxJQURuQyxDQUNYLEtBRFcsQ0FDRixNQURFLFNBQ0YsTUFERSxDQUNNLE9BRE4sU0FDTSxPQUROLENBQ2UsTUFEZixTQUNlLE1BRGYsQ0FDdUIsS0FEdkIsU0FDdUIsS0FEdkIsQ0FFbEIsR0FBTSxNQUFVLE1BQVYsS0FBb0IsT0FBcEIsS0FBK0IsTUFBckMsQ0FDQSxNQUFNLENBQUUsS0FBTSxVQUFSLENBQW9CLFlBQWEsTUFBakMsQ0FBeUMsU0FBekMsQ0FBK0MsaUJBQWtCLE9BQWpFLENBQU4sQ0FDRCxDLG9EQUdZLG9DQUFnQixDQUFFLHVCQUFGLENBQWhCLEVBQXNDLEtBQXRDLEM7OzsyekJDckRmLDRCLDJDQUNBLHVDQUNBLHNDLGlEQUNBLGtDLDZDQUNBLDhCLHlDQUVBLGlDLHFGQUVNLGMsdUVBQ0osdUJBQVksS0FBWixDQUFtQiwrTEFFVCxPQUZTLENBRTRCLEtBRjVCLENBRVQsTUFGUyxDQUVELEtBRkMsQ0FFNEIsS0FGNUIsQ0FFRCxLQUZDLENBRU0sV0FGTixDQUU0QixLQUY1QixDQUVNLFdBRk4sQ0FFbUIsSUFGbkIsQ0FFNEIsS0FGNUIsQ0FFbUIsSUFGbkIsQ0FHakIsR0FBSSxDQUFDLFdBQUwsQ0FBa0IsQ0FBQyxLQUFLLEtBQUwsQ0FBWSxNQUFaLENBQW9CLENBSHRCLFlBSWxCLEMsOEVBQ1EsSUFDVSxZQURWLENBQzRCLElBRDVCLENBQ0MsS0FERCxDQUNVLFdBRFYsQ0FFUCxHQUFJLENBQUMsV0FBTCxDQUFrQixDQUFDLE1BQU8sc0ZBQU8sQ0FGMUIsV0FHMEUsSUFIMUUsQ0FHQyxLQUhELENBR1UsTUFIVixRQUdVLE1BSFYsQ0FHa0IsS0FIbEIsUUFHa0IsS0FIbEIsQ0FHeUIsWUFIekIsUUFHeUIsWUFIekIsQ0FHdUMsb0JBSHZDLFFBR3VDLG9CQUh2QyxDQUc2RCxPQUg3RCxRQUc2RCxPQUg3RCxtQkFJK0IsTUFKL0IsQ0FJRSxLQUpGLEVBSVksS0FKWixlQUlZLEtBSlosQ0FJbUIsS0FKbkIsZUFJbUIsS0FKbkIsQ0FLUCxNQUNFLHNGQUNFLDhDQUFNLE9BQU8sT0FBYixDQUFxQixTQUFTLFdBQTlCLGlEQUNFLG1GQUFJLFFBQUosQ0FBYSxzQ0FBTSxVQUFVLFFBQWhCLGlEQUEyQixNQUFNLE1BQWpDLENBQWIsQ0FERixDQUVFLGdEQUNFLE1BQU8sS0FEVCxDQUVFLGVBQWdCLGFBQWEsTUFGL0IsQ0FHRSxxQkFBc0Isb0JBSHhCLENBSUUsUUFBUyxPQUpYLGlEQUZGLENBREYsQ0FVRSw4Q0FBTSxPQUFPLE9BQWIsQ0FBcUIsU0FBUyxZQUE5QixpREFDRSxrREFBVSxNQUFPLEtBQWpCLENBQXdCLE1BQU8sS0FBL0IsQ0FBc0MsYUFBYyxZQUFwRCxDQUFrRSxRQUFTLElBQTNFLGlEQURGLENBVkYsQ0FlSCxDLDREQUdZLGlEQUEwQixDQUFFLDJCQUFGLENBQTFCLEVBQW9ELGFBQXBELEM7OzswekJDdENmLDRCLDJDQUNBLHVDQUVBLGdELDJEQUNBLGlDQUNBLGlDLHFGQUVNLGEsMFdBQ0ssWUFDMEMsSUFEMUMsQ0FDQyxLQURELENBQ29CLEtBRHBCLFFBQ1UsTUFEVixDQUNvQixLQURwQixDQUM2QixNQUQ3QixRQUM2QixNQUQ3QixDQUVQLEdBQUksUUFBVSxJQUFWLEVBQWtCLE9BQU8sS0FBUCxHQUFpQixJQUFuQyxFQUEyQyxPQUFPLE9BQVAsRUFBa0IsSUFBN0QsRUFBcUUsT0FBTyxJQUFQLEVBQWUsSUFBeEYsQ0FBOEYsQ0FDNUYsTUFBTyxzRkFDUixDQUNELE1BQ0Usd0RBQWUsTUFBTyxLQUF0QixpREFFSCxDLDZEQUNtQixhQUN1QyxJQUR2QyxDQUNWLEtBRFUsQ0FDUyxLQURULFNBQ0QsTUFEQyxDQUNTLEtBRFQsQ0FDa0IsTUFEbEIsU0FDa0IsTUFEbEIsQ0FDMEIsS0FEMUIsU0FDMEIsS0FEMUIsQ0FFbEIsR0FBSSxRQUFVLElBQVYsRUFBa0IsT0FBTyxLQUFQLEdBQWlCLElBQXZDLENBQTZDLENBQzNDLE1BQU0sQ0FBRSxLQUFNLFlBQVIsQ0FBc0IsWUFBYSxJQUFuQyxDQUF5QyxvQkFBcUIsS0FBOUQsQ0FBdUUsS0FBUyxLQUFULFNBQXZFLENBQStGLFdBQS9GLENBQU4sQ0FDRCxDQUNELEdBQUksUUFBVSxJQUFWLEVBQWtCLE9BQU8sT0FBUCxFQUFrQixJQUF4QyxDQUE4QyxDQUM1QyxNQUFNLENBQUUsS0FBTSxZQUFSLENBQXNCLFlBQWEsSUFBbkMsQ0FBeUMsc0JBQXpDLENBQWtFLG9CQUFsRSxDQUF5RixNQUFPLFNBQWhHLENBQU4sQ0FDRCxDQUNELEdBQUksUUFBVSxJQUFWLEVBQWtCLE9BQU8sSUFBUCxFQUFlLElBQXJDLENBQTJDLENBQ3pDLE1BQU0sQ0FBRSxLQUFNLFlBQVIsQ0FBc0IsWUFBYSxJQUFuQyxDQUF5QyxZQUF6QyxDQUF3RCxpQkFBeEQsQ0FBNEUsTUFBTyxNQUFuRixDQUFOLENBQ0QsQ0FDRixDLDJEQUdZLDBDQUFtQixDQUFFLHVCQUFGLENBQW5CLEVBQXlDLFlBQXpDLEM7OztvekJDL0JmLDRCLDJDQUNBLHVDQUNBLGlDQUNBLGlDQUVBLHNDLGlEQUNBLDhCLDhIQUVNLE8sc1VBQ0ssWUFHSCxJQUhHLENBRUwsS0FGSyxDQUVjLEtBRmQsUUFFSSxNQUZKLENBRWMsS0FGZCxDQUV1QixNQUZ2QixRQUV1QixNQUZ2QixDQUUrQixRQUYvQixRQUUrQixRQUYvQixDQUlQLEdBQ0UsUUFBVSxJQUFWLEVBQWtCLE9BQU8sS0FBUCxHQUFpQixJQUFuQyxFQUEyQyxPQUFPLEtBQVAsRUFBYyxFQUFkLEVBQW9CLElBQS9ELEVBQ0EsT0FBTyxPQUFQLEVBQWtCLElBRGxCLEVBQzBCLE9BQU8sSUFBUCxFQUFlLElBRjNDLENBR0UsQ0FDQSxNQUFPLHNGQUNSLENBVE0sa0JBVStCLE9BQU8sS0FBUCxDQVYvQixDQVVDLFFBVkQsZUFVQyxRQVZELENBVVcsS0FWWCxlQVVXLEtBVlgsQ0FVa0IsSUFWbEIsZUFVa0IsSUFWbEIsQ0FVd0IsRUFWeEIsZUFVd0IsRUFWeEIsQ0FXUCxNQUNFLHNGQUNFLDhDQUFNLE9BQU8sV0FBYixDQUF5QixTQUFTLGNBQWxDLGlEQUNFLG1GQUNNLEdBQUcsTUFEVCxXQUVJLE1BQVEsSUFBUixFQUFnQixLQUFLLE1BQXRCLENBQ0Msc0NBQ0UsVUFBVSxnQ0FEWixDQUVFLE1BQU0sVUFGUixpREFERCxDQUtHLElBUE4sQ0FERixDQVVFLGtEQUFVLE1BQU8sS0FBakIsQ0FBd0IsTUFBTyxLQUEvQixDQUFzQyxhQUFjLEVBQXBELENBQXdELFFBQVMsS0FBakUsaURBVkYsQ0FERixDQWFFLDhDQUFNLE9BQU8sT0FBYixDQUFxQixTQUFTLGdCQUE5QixpREFDSSxRQURKLENBYkYsQ0FrQkgsQyw2REFDbUIsYUFPZCxJQVBjLENBRWhCLEtBRmdCLENBR0osS0FISSxTQUdkLE1BSGMsQ0FHSixLQUhJLENBSWQsTUFKYyxTQUlkLE1BSmMsQ0FLZCxLQUxjLFNBS2QsS0FMYyxDQVFsQixHQUFJLFFBQVUsSUFBVixFQUFrQixPQUFPLEtBQVAsR0FBaUIsSUFBbkMsRUFBMkMsT0FBTyxLQUFQLEVBQWMsRUFBZCxFQUFvQixJQUFuRSxDQUF5RSxDQUN2RSxNQUFNLENBQUUsS0FBTSxjQUFSLENBQXdCLFlBQWEsSUFBckMsQ0FBMkMsa0JBQW1CLEtBQTlELENBQXVFLEtBQVMsS0FBVCxzQkFBdkUsQ0FBNEcsV0FBNUcsQ0FBTixDQUNELENBQ0QsR0FBSSxRQUFVLElBQVYsRUFBa0IsT0FBTyxPQUFQLEVBQWtCLElBQXhDLENBQThDLENBQzVDLE1BQU0sQ0FBRSxLQUFNLFlBQVIsQ0FBc0IsWUFBYSxJQUFuQyxDQUF5QyxzQkFBekMsQ0FBa0Usb0JBQWxFLENBQXlGLE1BQU8sU0FBaEcsQ0FBTixDQUNELENBQ0QsR0FBSSxRQUFVLElBQVYsRUFBa0IsT0FBTyxJQUFQLEVBQWUsSUFBckMsQ0FBMkMsQ0FDekMsTUFBTSxDQUFFLEtBQU0sWUFBUixDQUFzQixZQUFhLElBQW5DLENBQXlDLFlBQXpDLENBQXdELGlCQUF4RCxDQUE0RSxNQUFPLE1BQW5GLENBQU4sQ0FDRCxDQUNGLEMscURBR1ksMENBQW1CLENBQUUsdUJBQUYsQ0FBbkIsRUFBeUMsTUFBekMsQzs7OzhyQ0M1RGYsNEIsMkNBQ0EsdUNBRUEsaUNBQ0EsaUNBRUEsd0Msd0lBRU0sVyx5Y0FnQ0osUyxDQUFZLFVBQU0sc0NBQ1IsS0FEUSxDQUNDLE1BREQsY0FDQyxNQURELENBQ1MsS0FEVCxjQUNTLEtBRFQsQ0FDZ0IsR0FEaEIsY0FDZ0IsR0FEaEIsSUFFc0IsT0FGdEIsQ0FFcUMsTUFGckMsQ0FFUCxLQUZPLEVBRUcsUUFGSCxDQUVnQixHQUZoQixFQUdoQixNQUFPLE9BQ1IsQyxpSkFuQ2EsWUFDOEIsSUFEOUIsQ0FDSixLQURJLENBQ0ssTUFETCxRQUNLLE1BREwsQ0FDYSxLQURiLFFBQ2EsS0FEYixDQUNvQixHQURwQixRQUNvQixHQURwQixtQkFFb0MsTUFGcEMsQ0FFSCxLQUZHLEVBRU8sVUFGUCxlQUVPLFVBRlAsQ0FFbUIsVUFGbkIsZUFFbUIsVUFGbkIsQ0FHWixHQUFNLFFBQVMsS0FBSyxTQUFMLEVBQWYsQ0FIWSxHQUlKLEtBSkksQ0FJcUIsTUFKckIsQ0FJSixJQUpJLENBSUUsTUFKRixDQUlxQixNQUpyQixDQUlFLE1BSkYsQ0FJVSxNQUpWLENBSXFCLE1BSnJCLENBSVUsTUFKVixDQU1aLEdBQU0sV0FBWSxFQUFsQixDQUNBLEdBQUksYUFBYyxLQUFsQixDQVBZLGdHQVFaLDRDQUFtQixVQUFuQixrR0FBK0IsSUFBcEIsS0FBb0IsZ0JBQ2IsRUFEYSxDQUNQLE1BRE8sQ0FDcEIsSUFEb0IsRUFFN0IsR0FBSSxHQUFLLElBQVQsQ0FBZSxDQUFDLFFBQVMsQ0FGSSxxQkFHb0IsVUFIcEIsQ0FHcEIsSUFIb0IsRUFHWCxLQUhXLGtCQUdYLEtBSFcsQ0FHSixPQUhJLGtCQUdKLE9BSEksQ0FHUSxLQUhSLGdGQUlILFNBSkcsQ0FJWSxJQUpaLENBSXJCLE1BSnFCLENBSVYsSUFKVSxFQUs3QixHQUFJLFFBQUosQ0FBYyxDQUFDLFlBQWMsSUFBSyxDQUNsQyxVQUFVLElBQVYsQ0FDRSx5RUFDRSxJQUFLLElBRFAsQ0FFRSxNQUFPLEtBRlQsQ0FHRSxJQUFLLEdBSFAsQ0FJRSxTQUFVLENBQUMsQ0FBQyxRQUpkLENBS0UsS0FBTSxJQUxSLENBTUUsTUFBTyxLQU5ULENBT0UsT0FBUSxPQUFPLElBQVAsQ0FQVixDQVFFLFFBQVMsT0FSWCxFQVNNLEtBVE4sbURBREYsQ0FhRCxDQTNCVyw0TEE0QlosTUFBTyxDQUFDLG1CQUFELENBQVksdUJBQVosQ0FDUixDLHVDQVFRLGFBR0gsSUFIRyxDQUVMLEtBRkssQ0FFSSxNQUZKLFNBRUksTUFGSixDQUVZLEtBRlosU0FFWSxLQUZaLENBRW1CLEdBRm5CLFNBRW1CLEdBRm5CLENBSVAsR0FBSSxLQUFLLFVBQUwsRUFBSixDQUF1QixDQUNyQixNQUFPLHNGQUNSLENBRUQsR0FBTSxRQUFTLEtBQUssU0FBTCxFQUFmLENBUk8sR0FTTyxLQVRQLENBU2dCLE1BVGhCLENBU0MsSUFURCxrQkFVNEIsS0FBSyxXQUFMLEVBVjVCLENBVUMsU0FWRCxjQVVDLFNBVkQsQ0FVWSxXQVZaLGNBVVksV0FWWixDQVdQLE1BQ0Usc0NBQUssVUFBVSxlQUFmLGlEQUNFLGdHQUFjLEtBQWQsQ0FERixDQUVFLG1GQUNHLFlBQWMsQ0FDYixzQ0FDRSxJQUFJLE1BRE4sQ0FFRSx3QkFGRix3REFEYSxDQUtiLEtBQUssTUFBTCxDQUNFLHNDQUNFLElBQUksUUFETixDQUVFLFVBQVcsaUNBRmIsQ0FHRSxNQUFNLGtCQUhSLGlEQURGLENBTUksSUFYUyxDQUFkLENBWUcsSUFiTixDQUZGLENBaUJFLHFGQUNHLFNBREgsQ0FqQkYsQ0FzQkgsQyxpREFDYSxhQUNzQyxJQUR0QyxDQUNKLEtBREksQ0FDSyxLQURMLFNBQ0ssS0FETCxDQUNZLEdBRFosU0FDWSxHQURaLENBQ2lCLE9BRGpCLFNBQ2lCLE9BRGpCLENBQzBCLEtBRDFCLFNBQzBCLEtBRDFCLENBRVosR0FBSSxLQUFLLFVBQUwsRUFBSixDQUF1QixDQUNyQixNQUFNLENBQ0osS0FBTSxXQURGLENBRUosWUFBYSxJQUZULENBR0osb0JBQXFCLEtBQXJCLFFBQWlDLEdBQWpDLEVBQXVDLFFBQVUsV0FBVixDQUF3QixFQUEvRCxDQUhJLENBSUosS0FBUyxLQUFULFlBQXlCLEdBSnJCLENBS0osV0FMSSxDQUFOLENBT0QsQ0FDRixDLCtDQUNZLGFBQytCLElBRC9CLENBQ0gsS0FERyxDQUNNLE1BRE4sU0FDTSxNQUROLENBQ2MsS0FEZCxTQUNjLEtBRGQsQ0FDcUIsR0FEckIsU0FDcUIsR0FEckIsQ0FFWCxNQUFRLFNBQVUsSUFBVixFQUFrQixPQUFPLEtBQVAsR0FBaUIsSUFBbkMsRUFBMkMsT0FBTyxLQUFQLEVBQWMsUUFBZCxDQUF1QixHQUF2QixHQUErQixJQUExRSxFQUFrRixDQUFDLE9BQU8sS0FBUCxFQUFjLFFBQWQsQ0FBdUIsR0FBdkIsRUFBNEIsUUFDeEgsQyw2REFDbUIsQ0FDbEIsR0FBSSxLQUFLLFVBQUwsRUFBSixDQUF1QixDQUFDLEtBQUssV0FBTCxFQUFtQixDQUM1QyxDLDhEQUNrQixTLENBQVcsSUFDYixVQURhLENBQ2UsU0FEZixDQUNwQixLQURvQixDQUNHLE9BREgsQ0FDZSxTQURmLENBQ0YsR0FERSxhQUVNLElBRk4sQ0FFcEIsS0FGb0IsQ0FFWCxLQUZXLFNBRVgsS0FGVyxDQUVKLEdBRkksU0FFSixHQUZJLENBRzVCLEdBQUksQ0FBQyxPQUFTLFNBQVQsRUFBc0IsS0FBTyxPQUE5QixHQUEwQyxLQUFLLFVBQUwsRUFBOUMsQ0FBaUUsQ0FBQyxLQUFLLFdBQUwsRUFBbUIsQ0FDdEYsQyx5REFHWSwwQ0FBbUIsQ0FBRSx1QkFBRixDQUFuQixFQUF5QyxVQUF6QyxDOzs7bTVCQzNHZiw0QiwyQ0FDQSx1Q0FDQSxpQ0FDQSx5QixxRkFFTSxNLGdVQUNLLElBQ1UsR0FEVixDQUNtQixJQURuQixDQUNDLEtBREQsQ0FDVSxFQURWLENBRVAsTUFDRSx1Q0FBTSxVQUFVLE9BQWhCLGlEQUNFLEdBQUcsSUFBSCxFQUFXLG1CQUFZLEVBQVosRUFBZ0IsTUFBaEIsQ0FBeUIsQ0FBcEMsQ0FDRSxzRkFDRSx3Q0FBUSxVQUFVLFlBQWxCLENBQStCLE1BQU8sR0FBRyxJQUF6QyxpREFBaUQsR0FBRyxJQUFILENBQVEsS0FBUixDQUFjLEdBQWQsRUFBbUIsQ0FBbkIsQ0FBakQsQ0FERixDQUVFLHNDQUFNLFVBQVUsZUFBaEIsaURBRkYsQ0FFcUMsR0FBRyxTQUZ4QyxDQUVtRCxHQUZuRCxDQUdFLG9GQUFLLEdBQUcsU0FBSCxFQUFnQixtQkFBckIsQ0FIRixDQUlFLG1DQUFHLEtBQUssU0FBUixDQUFrQixVQUFVLDBCQUE1QixDQUF1RCxNQUFNLFNBQTdELGlEQUpGLENBS0UsbUNBQUcsS0FBSyxVQUFSLENBQW1CLFVBQVUscUJBQTdCLENBQW1ELE1BQU0sVUFBekQsaURBTEYsQ0FERixDQVNFLG1DQUFHLEtBQUssUUFBUixDQUFpQixVQUFVLHlCQUEzQixpREFBdUQsUUFBdkQsQ0FWSixDQWNILEMsNkRBQ21CLElBQ0QsTUFEQyxDQUNXLElBRFgsQ0FDVixLQURVLENBQ0QsS0FEQyxDQUVsQixNQUFNLENBQUUsS0FBTSxTQUFSLENBQW1CLFlBQWEsSUFBaEMsQ0FBc0MsS0FBTSxVQUE1QyxDQUF3RCxLQUFNLElBQTlELENBQU4sQ0FDRCxDLG9EQUdZLGtDQUFlLENBQUUsdUJBQUYsQ0FBZixFQUFxQyxLQUFyQyxDOzs7MHpCQzlCZiw0QiwyQ0FDQSx1Q0FDQSxpQyxxRkFFTSxhLHNFQUNKLHNCQUFZLEtBQVosQ0FBbUIsdUxBQ1gsS0FEVyxTQUluQixNQUptQixDQUlWLHNCQUFTLGNBQU8sQ0FDdkIsR0FBSSxHQUFKLENBQVMsQ0FBQyxNQUFLLEdBQUwsQ0FBUyxLQUFULEVBQWtCLEdBQUksQ0FDakMsQ0FGUSxDQUpVLENBRWpCLE1BQUssR0FBTCxDQUFXLEVBQVgsQ0FGaUIsWUFHbEIsQyw2RUFLUSw0QkFDdUYsSUFEdkYsQ0FDQyxLQURELENBQ1UsYUFEVixRQUNVLGFBRFYsQ0FDeUIsT0FEekIsUUFDeUIsT0FEekIsQ0FDa0MsUUFEbEMsUUFDa0MsUUFEbEMsQ0FDNEMsUUFENUMsUUFDNEMsUUFENUMsQ0FDc0QsSUFEdEQsUUFDc0QsSUFEdEQsQ0FDNEQsSUFENUQsUUFDNEQsSUFENUQsQ0FDa0UsT0FEbEUsUUFDa0UsT0FEbEUsQ0FDMkUsS0FEM0UsUUFDMkUsS0FEM0UsQ0FFUCxHQUFNLFdBQVksU0FBVyxDQUFDLENBQTlCLENBQ0EsR0FBTSxZQUFhLEdBQUksTUFBSixDQUFVLElBQVYsRUFBZ0IsSUFBaEIsQ0FBcUIsQ0FBckIsQ0FBbkIsQ0FDQSxNQUNFLHNGQUNFLG1DQUFHLFVBQVUsYUFBYixpREFDRSxzQ0FDRSxNQUFNLCtDQURSLENBRUUsVUFBVyxrQkFBb0IsUUFBcEIsQ0FBaUMsU0FGOUMsaURBSUksV0FBVyxHQUFYLENBQWUsU0FBQyxDQUFELENBQUksQ0FBSixRQUFVLHVDQUFNLElBQUssQ0FBWCxDQUFjLFVBQVUsMEJBQXhCLGlEQUFWLENBQWYsQ0FKSixDQUtFLHNDQUNFLG9CQUFvQixNQUFRLENBQVIsQ0FBWSxVQUFaLENBQXlCLGlCQUE3QyxDQURGLENBRUUsUUFBUyx5QkFBTSxTQUFRLENBQUMsSUFBVCxDQUFOLENBRlgsaURBTEYsQ0FERixDQURGLENBYUcsS0FDQyxxQ0FDRSxJQUFLLEtBQUssTUFBTCxDQUFZLFFBQVosQ0FEUCxDQUVFLFVBQVUsU0FGWixDQUdFLFFBQVMseUJBQU0sU0FBUSxLQUFSLENBQU4sQ0FIWCxpREFLRyxhQUFELENBQWdCLEdBQWhCLENBQW9CLFNBQUMsR0FBRCxDQUFNLENBQU4sUUFDbEIsb0NBQ0UsSUFBSyxDQURQLENBRUUsSUFBSyxPQUFLLE1BQUwsS0FBZ0IsQ0FBaEIsQ0FGUCxDQUdFLHNCQUF1QixDQUFDLElBQUksSUFBTCxDQUF2QixRQUF3QyxJQUFJLElBQUosRUFBWSxNQUFiLENBQXVCLFVBQXZCLENBQW9DLEVBQTNFLENBSEYsaURBSUUsSUFBSSxJQUpOLENBRGtCLENBQXBCLENBTEYsQ0FhRSxtQ0FBRyxVQUFVLGFBQWIsaURBQTZCLHVCQUE3QixDQWJGLENBY0UsbUNBQUcsVUFBVSxXQUFiLGlEQUNFLG1DQUNFLEtBQUssR0FEUCxDQUVFLE1BQU0sZ0JBRlIsQ0FHRSxVQUFVLHFCQUhaLENBSUUsUUFBUyx5QkFBTSxRQUFOLENBSlgsaURBREYsQ0FkRixDQURELENBd0JFLElBckNMLENBd0NILEMsNkRBQ21CLENBQ2xCLEtBQUssT0FBTCxFQUNELEMsK0RBQ29CLENBQ25CLEtBQUssT0FBTCxFQUNELEMsd0NBQ08sRSxDQUFJLElBQ08sS0FEUCxDQUNrQixJQURsQixDQUNGLEtBREUsQ0FDTyxJQURQLENBRVYsR0FBSSxJQUFKLENBQVUsQ0FBQyxLQUFLLFNBQUwsRUFBaUIsQ0FDN0IsQyw2Q0FDVyxJQUNPLEtBRFAsQ0FDa0IsSUFEbEIsQ0FDRixLQURFLENBQ08sSUFEUCxDQUVWLEdBQUksSUFBSixDQUFVLGFBQ2lDLElBRGpDLENBQ0EsS0FEQSxDQUNTLE9BRFQsU0FDUyxPQURULENBQ2tCLFFBRGxCLFNBQ2tCLFFBRGxCLENBRVIsR0FBTSxXQUFZLFNBQVcsQ0FBQyxDQUE5QixDQUNBLEdBQUksU0FBSixDQUFlLENBQ2IsS0FBSyxHQUFMLEtBQWEsUUFBYixFQUF5QixjQUF6QixFQUNELENBRkQsSUFHSyxDQUNILEdBQUksUUFBVSxDQUFDLENBQWYsQ0FBa0IsQ0FDaEIsS0FBSyxHQUFMLEtBQWEsT0FBYixFQUF3QixjQUF4QixFQUNELENBQ0YsQ0FDRixDQUNGLEMsMkRBR1ksaURBQTBCLENBQUUsbUJBQUYsQ0FBUyx1QkFBVCxDQUExQixFQUE4QyxZQUE5QyxDOzs7b3VCQ3RGZiw0QkFDQSx1Q0FDQSx5QyxpREFDQSwyQixxRkFFTSxPLHFiQUtKLGEsQ0FBZ0IsdUJBQVMsZUFBUyxrQkFDZixNQURlLFFBQ3hCLEtBRHdCLENBQ2YsTUFEZSxDQUVoQyxRQUNELENBSGUsQ0FHYixJQUhhLEMsbUlBSlAsSUFDVSxTQURWLENBQ3lCLElBRHpCLENBQ0MsS0FERCxDQUNVLFFBRFYsQ0FFUCxNQUFPLGlCQUFTLElBQVQsQ0FBYyxRQUFkLENBQ1IsQyw2REFNbUIsQ0FDbEIsT0FBTyxnQkFBUCxDQUF3QixRQUF4QixDQUFrQyxLQUFLLGFBQXZDLENBQ0QsQyxtRUFDc0IsQ0FDckIsT0FBTyxtQkFBUCxDQUEyQixRQUEzQixDQUFxQyxLQUFLLGFBQTFDLENBQ0QsQyxxREFHWSx1Q0FBbUIsQ0FBRSx3QkFBRixDQUFuQixFQUE2QyxNQUE3QyxDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9hcnJheS9mcm9tXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07IiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL2dldC1pdGVyYXRvclwiKSwgX19lc01vZHVsZTogdHJ1ZSB9OyIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9pcy1pdGVyYWJsZVwiKSwgX19lc01vZHVsZTogdHJ1ZSB9OyIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvYXNzaWduXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07IiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9jcmVhdGVcIiksIF9fZXNNb2R1bGU6IHRydWUgfTsiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2RlZmluZS1wcm9wZXJ0eVwiKSwgX19lc01vZHVsZTogdHJ1ZSB9OyIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvZW50cmllc1wiKSwgX19lc01vZHVsZTogdHJ1ZSB9OyIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvZ2V0LXByb3RvdHlwZS1vZlwiKSwgX19lc01vZHVsZTogdHJ1ZSB9OyIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9vYmplY3Qva2V5c1wiKSwgX19lc01vZHVsZTogdHJ1ZSB9OyIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9vYmplY3Qvc2V0LXByb3RvdHlwZS1vZlwiKSwgX19lc01vZHVsZTogdHJ1ZSB9OyIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9zeW1ib2xcIiksIF9fZXNNb2R1bGU6IHRydWUgfTsiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vc3ltYm9sL2l0ZXJhdG9yXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHtcbiAgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpO1xuICB9XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX2RlZmluZVByb3BlcnR5ID0gcmVxdWlyZShcIi4uL2NvcmUtanMvb2JqZWN0L2RlZmluZS1wcm9wZXJ0eVwiKTtcblxudmFyIF9kZWZpbmVQcm9wZXJ0eTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9kZWZpbmVQcm9wZXJ0eSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTtcbiAgICAgIGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTtcbiAgICAgIGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTtcbiAgICAgIGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7XG4gICAgICAoMCwgX2RlZmluZVByb3BlcnR5Mi5kZWZhdWx0KSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykge1xuICAgIGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7XG4gICAgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7XG4gICAgcmV0dXJuIENvbnN0cnVjdG9yO1xuICB9O1xufSgpOyIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX2RlZmluZVByb3BlcnR5ID0gcmVxdWlyZShcIi4uL2NvcmUtanMvb2JqZWN0L2RlZmluZS1wcm9wZXJ0eVwiKTtcblxudmFyIF9kZWZpbmVQcm9wZXJ0eTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9kZWZpbmVQcm9wZXJ0eSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChvYmosIGtleSwgdmFsdWUpIHtcbiAgaWYgKGtleSBpbiBvYmopIHtcbiAgICAoMCwgX2RlZmluZVByb3BlcnR5Mi5kZWZhdWx0KShvYmosIGtleSwge1xuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgb2JqW2tleV0gPSB2YWx1ZTtcbiAgfVxuXG4gIHJldHVybiBvYmo7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX2Fzc2lnbiA9IHJlcXVpcmUoXCIuLi9jb3JlLWpzL29iamVjdC9hc3NpZ25cIik7XG5cbnZhciBfYXNzaWduMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2Fzc2lnbik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IF9hc3NpZ24yLmRlZmF1bHQgfHwgZnVuY3Rpb24gKHRhcmdldCkge1xuICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07XG5cbiAgICBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7XG4gICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHNvdXJjZSwga2V5KSkge1xuICAgICAgICB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX3NldFByb3RvdHlwZU9mID0gcmVxdWlyZShcIi4uL2NvcmUtanMvb2JqZWN0L3NldC1wcm90b3R5cGUtb2ZcIik7XG5cbnZhciBfc2V0UHJvdG90eXBlT2YyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfc2V0UHJvdG90eXBlT2YpO1xuXG52YXIgX2NyZWF0ZSA9IHJlcXVpcmUoXCIuLi9jb3JlLWpzL29iamVjdC9jcmVhdGVcIik7XG5cbnZhciBfY3JlYXRlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NyZWF0ZSk7XG5cbnZhciBfdHlwZW9mMiA9IHJlcXVpcmUoXCIuLi9oZWxwZXJzL3R5cGVvZlwiKTtcblxudmFyIF90eXBlb2YzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdHlwZW9mMik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChzdWJDbGFzcywgc3VwZXJDbGFzcykge1xuICBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIgKyAodHlwZW9mIHN1cGVyQ2xhc3MgPT09IFwidW5kZWZpbmVkXCIgPyBcInVuZGVmaW5lZFwiIDogKDAsIF90eXBlb2YzLmRlZmF1bHQpKHN1cGVyQ2xhc3MpKSk7XG4gIH1cblxuICBzdWJDbGFzcy5wcm90b3R5cGUgPSAoMCwgX2NyZWF0ZTIuZGVmYXVsdCkoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwge1xuICAgIGNvbnN0cnVjdG9yOiB7XG4gICAgICB2YWx1ZTogc3ViQ2xhc3MsXG4gICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfVxuICB9KTtcbiAgaWYgKHN1cGVyQ2xhc3MpIF9zZXRQcm90b3R5cGVPZjIuZGVmYXVsdCA/ICgwLCBfc2V0UHJvdG90eXBlT2YyLmRlZmF1bHQpKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAob2JqLCBrZXlzKSB7XG4gIHZhciB0YXJnZXQgPSB7fTtcblxuICBmb3IgKHZhciBpIGluIG9iaikge1xuICAgIGlmIChrZXlzLmluZGV4T2YoaSkgPj0gMCkgY29udGludWU7XG4gICAgaWYgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBpKSkgY29udGludWU7XG4gICAgdGFyZ2V0W2ldID0gb2JqW2ldO1xuICB9XG5cbiAgcmV0dXJuIHRhcmdldDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfdHlwZW9mMiA9IHJlcXVpcmUoXCIuLi9oZWxwZXJzL3R5cGVvZlwiKTtcblxudmFyIF90eXBlb2YzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdHlwZW9mMik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChzZWxmLCBjYWxsKSB7XG4gIGlmICghc2VsZikge1xuICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTtcbiAgfVxuXG4gIHJldHVybiBjYWxsICYmICgodHlwZW9mIGNhbGwgPT09IFwidW5kZWZpbmVkXCIgPyBcInVuZGVmaW5lZFwiIDogKDAsIF90eXBlb2YzLmRlZmF1bHQpKGNhbGwpKSA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSA/IGNhbGwgOiBzZWxmO1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9pc0l0ZXJhYmxlMiA9IHJlcXVpcmUoXCIuLi9jb3JlLWpzL2lzLWl0ZXJhYmxlXCIpO1xuXG52YXIgX2lzSXRlcmFibGUzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaXNJdGVyYWJsZTIpO1xuXG52YXIgX2dldEl0ZXJhdG9yMiA9IHJlcXVpcmUoXCIuLi9jb3JlLWpzL2dldC1pdGVyYXRvclwiKTtcblxudmFyIF9nZXRJdGVyYXRvcjMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9nZXRJdGVyYXRvcjIpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIHNsaWNlSXRlcmF0b3IoYXJyLCBpKSB7XG4gICAgdmFyIF9hcnIgPSBbXTtcbiAgICB2YXIgX24gPSB0cnVlO1xuICAgIHZhciBfZCA9IGZhbHNlO1xuICAgIHZhciBfZSA9IHVuZGVmaW5lZDtcblxuICAgIHRyeSB7XG4gICAgICBmb3IgKHZhciBfaSA9ICgwLCBfZ2V0SXRlcmF0b3IzLmRlZmF1bHQpKGFyciksIF9zOyAhKF9uID0gKF9zID0gX2kubmV4dCgpKS5kb25lKTsgX24gPSB0cnVlKSB7XG4gICAgICAgIF9hcnIucHVzaChfcy52YWx1ZSk7XG5cbiAgICAgICAgaWYgKGkgJiYgX2Fyci5sZW5ndGggPT09IGkpIGJyZWFrO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgX2QgPSB0cnVlO1xuICAgICAgX2UgPSBlcnI7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGlmICghX24gJiYgX2lbXCJyZXR1cm5cIl0pIF9pW1wicmV0dXJuXCJdKCk7XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICBpZiAoX2QpIHRocm93IF9lO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBfYXJyO1xuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIChhcnIsIGkpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSB7XG4gICAgICByZXR1cm4gYXJyO1xuICAgIH0gZWxzZSBpZiAoKDAsIF9pc0l0ZXJhYmxlMy5kZWZhdWx0KShPYmplY3QoYXJyKSkpIHtcbiAgICAgIHJldHVybiBzbGljZUl0ZXJhdG9yKGFyciwgaSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJJbnZhbGlkIGF0dGVtcHQgdG8gZGVzdHJ1Y3R1cmUgbm9uLWl0ZXJhYmxlIGluc3RhbmNlXCIpO1xuICAgIH1cbiAgfTtcbn0oKTsiLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9mcm9tID0gcmVxdWlyZShcIi4uL2NvcmUtanMvYXJyYXkvZnJvbVwiKTtcblxudmFyIF9mcm9tMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2Zyb20pO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoYXJyKSB7XG4gIGlmIChBcnJheS5pc0FycmF5KGFycikpIHtcbiAgICBmb3IgKHZhciBpID0gMCwgYXJyMiA9IEFycmF5KGFyci5sZW5ndGgpOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICBhcnIyW2ldID0gYXJyW2ldO1xuICAgIH1cblxuICAgIHJldHVybiBhcnIyO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiAoMCwgX2Zyb20yLmRlZmF1bHQpKGFycik7XG4gIH1cbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfaXRlcmF0b3IgPSByZXF1aXJlKFwiLi4vY29yZS1qcy9zeW1ib2wvaXRlcmF0b3JcIik7XG5cbnZhciBfaXRlcmF0b3IyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaXRlcmF0b3IpO1xuXG52YXIgX3N5bWJvbCA9IHJlcXVpcmUoXCIuLi9jb3JlLWpzL3N5bWJvbFwiKTtcblxudmFyIF9zeW1ib2wyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfc3ltYm9sKTtcblxudmFyIF90eXBlb2YgPSB0eXBlb2YgX3N5bWJvbDIuZGVmYXVsdCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBfaXRlcmF0b3IyLmRlZmF1bHQgPT09IFwic3ltYm9sXCIgPyBmdW5jdGlvbiAob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9IDogZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBfc3ltYm9sMi5kZWZhdWx0ID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBfc3ltYm9sMi5kZWZhdWx0ICYmIG9iaiAhPT0gX3N5bWJvbDIuZGVmYXVsdC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gdHlwZW9mIF9zeW1ib2wyLmRlZmF1bHQgPT09IFwiZnVuY3Rpb25cIiAmJiBfdHlwZW9mKF9pdGVyYXRvcjIuZGVmYXVsdCkgPT09IFwic3ltYm9sXCIgPyBmdW5jdGlvbiAob2JqKSB7XG4gIHJldHVybiB0eXBlb2Ygb2JqID09PSBcInVuZGVmaW5lZFwiID8gXCJ1bmRlZmluZWRcIiA6IF90eXBlb2Yob2JqKTtcbn0gOiBmdW5jdGlvbiAob2JqKSB7XG4gIHJldHVybiBvYmogJiYgdHlwZW9mIF9zeW1ib2wyLmRlZmF1bHQgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IF9zeW1ib2wyLmRlZmF1bHQgJiYgb2JqICE9PSBfc3ltYm9sMi5kZWZhdWx0LnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqID09PSBcInVuZGVmaW5lZFwiID8gXCJ1bmRlZmluZWRcIiA6IF90eXBlb2Yob2JqKTtcbn07IiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYuc3RyaW5nLml0ZXJhdG9yJyk7XG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5hcnJheS5mcm9tJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5BcnJheS5mcm9tOyIsInJlcXVpcmUoJy4uL21vZHVsZXMvd2ViLmRvbS5pdGVyYWJsZScpO1xucmVxdWlyZSgnLi4vbW9kdWxlcy9lczYuc3RyaW5nLml0ZXJhdG9yJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uL21vZHVsZXMvY29yZS5nZXQtaXRlcmF0b3InKTsiLCJyZXF1aXJlKCcuLi9tb2R1bGVzL3dlYi5kb20uaXRlcmFibGUnKTtcbnJlcXVpcmUoJy4uL21vZHVsZXMvZXM2LnN0cmluZy5pdGVyYXRvcicpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi9tb2R1bGVzL2NvcmUuaXMtaXRlcmFibGUnKTsiLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5vYmplY3QuYXNzaWduJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5PYmplY3QuYXNzaWduOyIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm9iamVjdC5jcmVhdGUnKTtcbnZhciAkT2JqZWN0ID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLk9iamVjdDtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY3JlYXRlKFAsIEQpe1xuICByZXR1cm4gJE9iamVjdC5jcmVhdGUoUCwgRCk7XG59OyIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm9iamVjdC5kZWZpbmUtcHJvcGVydHknKTtcbnZhciAkT2JqZWN0ID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLk9iamVjdDtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkoaXQsIGtleSwgZGVzYyl7XG4gIHJldHVybiAkT2JqZWN0LmRlZmluZVByb3BlcnR5KGl0LCBrZXksIGRlc2MpO1xufTsiLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNy5vYmplY3QuZW50cmllcycpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJykuT2JqZWN0LmVudHJpZXM7IiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYub2JqZWN0LmdldC1wcm90b3R5cGUtb2YnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLk9iamVjdC5nZXRQcm90b3R5cGVPZjsiLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5vYmplY3Qua2V5cycpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJykuT2JqZWN0LmtleXM7IiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYub2JqZWN0LnNldC1wcm90b3R5cGUtb2YnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLk9iamVjdC5zZXRQcm90b3R5cGVPZjsiLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5zeW1ib2wnKTtcbnJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm9iamVjdC50by1zdHJpbmcnKTtcbnJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM3LnN5bWJvbC5hc3luYy1pdGVyYXRvcicpO1xucmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczcuc3ltYm9sLm9ic2VydmFibGUnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLlN5bWJvbDsiLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5zdHJpbmcuaXRlcmF0b3InKTtcbnJlcXVpcmUoJy4uLy4uL21vZHVsZXMvd2ViLmRvbS5pdGVyYWJsZScpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL193a3MtZXh0JykuZignaXRlcmF0b3InKTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgaWYodHlwZW9mIGl0ICE9ICdmdW5jdGlvbicpdGhyb3cgVHlwZUVycm9yKGl0ICsgJyBpcyBub3QgYSBmdW5jdGlvbiEnKTtcbiAgcmV0dXJuIGl0O1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCl7IC8qIGVtcHR5ICovIH07IiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgaWYoIWlzT2JqZWN0KGl0KSl0aHJvdyBUeXBlRXJyb3IoaXQgKyAnIGlzIG5vdCBhbiBvYmplY3QhJyk7XG4gIHJldHVybiBpdDtcbn07IiwiLy8gZmFsc2UgLT4gQXJyYXkjaW5kZXhPZlxuLy8gdHJ1ZSAgLT4gQXJyYXkjaW5jbHVkZXNcbnZhciB0b0lPYmplY3QgPSByZXF1aXJlKCcuL190by1pb2JqZWN0JylcbiAgLCB0b0xlbmd0aCAgPSByZXF1aXJlKCcuL190by1sZW5ndGgnKVxuICAsIHRvSW5kZXggICA9IHJlcXVpcmUoJy4vX3RvLWluZGV4Jyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKElTX0lOQ0xVREVTKXtcbiAgcmV0dXJuIGZ1bmN0aW9uKCR0aGlzLCBlbCwgZnJvbUluZGV4KXtcbiAgICB2YXIgTyAgICAgID0gdG9JT2JqZWN0KCR0aGlzKVxuICAgICAgLCBsZW5ndGggPSB0b0xlbmd0aChPLmxlbmd0aClcbiAgICAgICwgaW5kZXggID0gdG9JbmRleChmcm9tSW5kZXgsIGxlbmd0aClcbiAgICAgICwgdmFsdWU7XG4gICAgLy8gQXJyYXkjaW5jbHVkZXMgdXNlcyBTYW1lVmFsdWVaZXJvIGVxdWFsaXR5IGFsZ29yaXRobVxuICAgIGlmKElTX0lOQ0xVREVTICYmIGVsICE9IGVsKXdoaWxlKGxlbmd0aCA+IGluZGV4KXtcbiAgICAgIHZhbHVlID0gT1tpbmRleCsrXTtcbiAgICAgIGlmKHZhbHVlICE9IHZhbHVlKXJldHVybiB0cnVlO1xuICAgIC8vIEFycmF5I3RvSW5kZXggaWdub3JlcyBob2xlcywgQXJyYXkjaW5jbHVkZXMgLSBub3RcbiAgICB9IGVsc2UgZm9yKDtsZW5ndGggPiBpbmRleDsgaW5kZXgrKylpZihJU19JTkNMVURFUyB8fCBpbmRleCBpbiBPKXtcbiAgICAgIGlmKE9baW5kZXhdID09PSBlbClyZXR1cm4gSVNfSU5DTFVERVMgfHwgaW5kZXggfHwgMDtcbiAgICB9IHJldHVybiAhSVNfSU5DTFVERVMgJiYgLTE7XG4gIH07XG59OyIsIi8vIGdldHRpbmcgdGFnIGZyb20gMTkuMS4zLjYgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZygpXG52YXIgY29mID0gcmVxdWlyZSgnLi9fY29mJylcbiAgLCBUQUcgPSByZXF1aXJlKCcuL193a3MnKSgndG9TdHJpbmdUYWcnKVxuICAvLyBFUzMgd3JvbmcgaGVyZVxuICAsIEFSRyA9IGNvZihmdW5jdGlvbigpeyByZXR1cm4gYXJndW1lbnRzOyB9KCkpID09ICdBcmd1bWVudHMnO1xuXG4vLyBmYWxsYmFjayBmb3IgSUUxMSBTY3JpcHQgQWNjZXNzIERlbmllZCBlcnJvclxudmFyIHRyeUdldCA9IGZ1bmN0aW9uKGl0LCBrZXkpe1xuICB0cnkge1xuICAgIHJldHVybiBpdFtrZXldO1xuICB9IGNhdGNoKGUpeyAvKiBlbXB0eSAqLyB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgdmFyIE8sIFQsIEI7XG4gIHJldHVybiBpdCA9PT0gdW5kZWZpbmVkID8gJ1VuZGVmaW5lZCcgOiBpdCA9PT0gbnVsbCA/ICdOdWxsJ1xuICAgIC8vIEBAdG9TdHJpbmdUYWcgY2FzZVxuICAgIDogdHlwZW9mIChUID0gdHJ5R2V0KE8gPSBPYmplY3QoaXQpLCBUQUcpKSA9PSAnc3RyaW5nJyA/IFRcbiAgICAvLyBidWlsdGluVGFnIGNhc2VcbiAgICA6IEFSRyA/IGNvZihPKVxuICAgIC8vIEVTMyBhcmd1bWVudHMgZmFsbGJhY2tcbiAgICA6IChCID0gY29mKE8pKSA9PSAnT2JqZWN0JyAmJiB0eXBlb2YgTy5jYWxsZWUgPT0gJ2Z1bmN0aW9uJyA/ICdBcmd1bWVudHMnIDogQjtcbn07IiwidmFyIHRvU3RyaW5nID0ge30udG9TdHJpbmc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbChpdCkuc2xpY2UoOCwgLTEpO1xufTsiLCJ2YXIgY29yZSA9IG1vZHVsZS5leHBvcnRzID0ge3ZlcnNpb246ICcyLjQuMCd9O1xuaWYodHlwZW9mIF9fZSA9PSAnbnVtYmVyJylfX2UgPSBjb3JlOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmIiwiJ3VzZSBzdHJpY3QnO1xudmFyICRkZWZpbmVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpXG4gICwgY3JlYXRlRGVzYyAgICAgID0gcmVxdWlyZSgnLi9fcHJvcGVydHktZGVzYycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG9iamVjdCwgaW5kZXgsIHZhbHVlKXtcbiAgaWYoaW5kZXggaW4gb2JqZWN0KSRkZWZpbmVQcm9wZXJ0eS5mKG9iamVjdCwgaW5kZXgsIGNyZWF0ZURlc2MoMCwgdmFsdWUpKTtcbiAgZWxzZSBvYmplY3RbaW5kZXhdID0gdmFsdWU7XG59OyIsIi8vIG9wdGlvbmFsIC8gc2ltcGxlIGNvbnRleHQgYmluZGluZ1xudmFyIGFGdW5jdGlvbiA9IHJlcXVpcmUoJy4vX2EtZnVuY3Rpb24nKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZm4sIHRoYXQsIGxlbmd0aCl7XG4gIGFGdW5jdGlvbihmbik7XG4gIGlmKHRoYXQgPT09IHVuZGVmaW5lZClyZXR1cm4gZm47XG4gIHN3aXRjaChsZW5ndGgpe1xuICAgIGNhc2UgMTogcmV0dXJuIGZ1bmN0aW9uKGEpe1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSk7XG4gICAgfTtcbiAgICBjYXNlIDI6IHJldHVybiBmdW5jdGlvbihhLCBiKXtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEsIGIpO1xuICAgIH07XG4gICAgY2FzZSAzOiByZXR1cm4gZnVuY3Rpb24oYSwgYiwgYyl7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhLCBiLCBjKTtcbiAgICB9O1xuICB9XG4gIHJldHVybiBmdW5jdGlvbigvKiAuLi5hcmdzICovKXtcbiAgICByZXR1cm4gZm4uYXBwbHkodGhhdCwgYXJndW1lbnRzKTtcbiAgfTtcbn07IiwiLy8gNy4yLjEgUmVxdWlyZU9iamVjdENvZXJjaWJsZShhcmd1bWVudClcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICBpZihpdCA9PSB1bmRlZmluZWQpdGhyb3cgVHlwZUVycm9yKFwiQ2FuJ3QgY2FsbCBtZXRob2Qgb24gIFwiICsgaXQpO1xuICByZXR1cm4gaXQ7XG59OyIsIi8vIFRoYW5rJ3MgSUU4IGZvciBoaXMgZnVubnkgZGVmaW5lUHJvcGVydHlcbm1vZHVsZS5leHBvcnRzID0gIXJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24oKXtcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh7fSwgJ2EnLCB7Z2V0OiBmdW5jdGlvbigpeyByZXR1cm4gNzsgfX0pLmEgIT0gNztcbn0pOyIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpXG4gICwgZG9jdW1lbnQgPSByZXF1aXJlKCcuL19nbG9iYWwnKS5kb2N1bWVudFxuICAvLyBpbiBvbGQgSUUgdHlwZW9mIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgaXMgJ29iamVjdCdcbiAgLCBpcyA9IGlzT2JqZWN0KGRvY3VtZW50KSAmJiBpc09iamVjdChkb2N1bWVudC5jcmVhdGVFbGVtZW50KTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gaXMgPyBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGl0KSA6IHt9O1xufTsiLCIvLyBJRSA4LSBkb24ndCBlbnVtIGJ1ZyBrZXlzXG5tb2R1bGUuZXhwb3J0cyA9IChcbiAgJ2NvbnN0cnVjdG9yLGhhc093blByb3BlcnR5LGlzUHJvdG90eXBlT2YscHJvcGVydHlJc0VudW1lcmFibGUsdG9Mb2NhbGVTdHJpbmcsdG9TdHJpbmcsdmFsdWVPZidcbikuc3BsaXQoJywnKTsiLCIvLyBhbGwgZW51bWVyYWJsZSBvYmplY3Qga2V5cywgaW5jbHVkZXMgc3ltYm9sc1xudmFyIGdldEtleXMgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cycpXG4gICwgZ09QUyAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1nb3BzJylcbiAgLCBwSUUgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LXBpZScpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHZhciByZXN1bHQgICAgID0gZ2V0S2V5cyhpdClcbiAgICAsIGdldFN5bWJvbHMgPSBnT1BTLmY7XG4gIGlmKGdldFN5bWJvbHMpe1xuICAgIHZhciBzeW1ib2xzID0gZ2V0U3ltYm9scyhpdClcbiAgICAgICwgaXNFbnVtICA9IHBJRS5mXG4gICAgICAsIGkgICAgICAgPSAwXG4gICAgICAsIGtleTtcbiAgICB3aGlsZShzeW1ib2xzLmxlbmd0aCA+IGkpaWYoaXNFbnVtLmNhbGwoaXQsIGtleSA9IHN5bWJvbHNbaSsrXSkpcmVzdWx0LnB1c2goa2V5KTtcbiAgfSByZXR1cm4gcmVzdWx0O1xufTsiLCJ2YXIgZ2xvYmFsICAgID0gcmVxdWlyZSgnLi9fZ2xvYmFsJylcbiAgLCBjb3JlICAgICAgPSByZXF1aXJlKCcuL19jb3JlJylcbiAgLCBjdHggICAgICAgPSByZXF1aXJlKCcuL19jdHgnKVxuICAsIGhpZGUgICAgICA9IHJlcXVpcmUoJy4vX2hpZGUnKVxuICAsIFBST1RPVFlQRSA9ICdwcm90b3R5cGUnO1xuXG52YXIgJGV4cG9ydCA9IGZ1bmN0aW9uKHR5cGUsIG5hbWUsIHNvdXJjZSl7XG4gIHZhciBJU19GT1JDRUQgPSB0eXBlICYgJGV4cG9ydC5GXG4gICAgLCBJU19HTE9CQUwgPSB0eXBlICYgJGV4cG9ydC5HXG4gICAgLCBJU19TVEFUSUMgPSB0eXBlICYgJGV4cG9ydC5TXG4gICAgLCBJU19QUk9UTyAgPSB0eXBlICYgJGV4cG9ydC5QXG4gICAgLCBJU19CSU5EICAgPSB0eXBlICYgJGV4cG9ydC5CXG4gICAgLCBJU19XUkFQICAgPSB0eXBlICYgJGV4cG9ydC5XXG4gICAgLCBleHBvcnRzICAgPSBJU19HTE9CQUwgPyBjb3JlIDogY29yZVtuYW1lXSB8fCAoY29yZVtuYW1lXSA9IHt9KVxuICAgICwgZXhwUHJvdG8gID0gZXhwb3J0c1tQUk9UT1RZUEVdXG4gICAgLCB0YXJnZXQgICAgPSBJU19HTE9CQUwgPyBnbG9iYWwgOiBJU19TVEFUSUMgPyBnbG9iYWxbbmFtZV0gOiAoZ2xvYmFsW25hbWVdIHx8IHt9KVtQUk9UT1RZUEVdXG4gICAgLCBrZXksIG93biwgb3V0O1xuICBpZihJU19HTE9CQUwpc291cmNlID0gbmFtZTtcbiAgZm9yKGtleSBpbiBzb3VyY2Upe1xuICAgIC8vIGNvbnRhaW5zIGluIG5hdGl2ZVxuICAgIG93biA9ICFJU19GT1JDRUQgJiYgdGFyZ2V0ICYmIHRhcmdldFtrZXldICE9PSB1bmRlZmluZWQ7XG4gICAgaWYob3duICYmIGtleSBpbiBleHBvcnRzKWNvbnRpbnVlO1xuICAgIC8vIGV4cG9ydCBuYXRpdmUgb3IgcGFzc2VkXG4gICAgb3V0ID0gb3duID8gdGFyZ2V0W2tleV0gOiBzb3VyY2Vba2V5XTtcbiAgICAvLyBwcmV2ZW50IGdsb2JhbCBwb2xsdXRpb24gZm9yIG5hbWVzcGFjZXNcbiAgICBleHBvcnRzW2tleV0gPSBJU19HTE9CQUwgJiYgdHlwZW9mIHRhcmdldFtrZXldICE9ICdmdW5jdGlvbicgPyBzb3VyY2Vba2V5XVxuICAgIC8vIGJpbmQgdGltZXJzIHRvIGdsb2JhbCBmb3IgY2FsbCBmcm9tIGV4cG9ydCBjb250ZXh0XG4gICAgOiBJU19CSU5EICYmIG93biA/IGN0eChvdXQsIGdsb2JhbClcbiAgICAvLyB3cmFwIGdsb2JhbCBjb25zdHJ1Y3RvcnMgZm9yIHByZXZlbnQgY2hhbmdlIHRoZW0gaW4gbGlicmFyeVxuICAgIDogSVNfV1JBUCAmJiB0YXJnZXRba2V5XSA9PSBvdXQgPyAoZnVuY3Rpb24oQyl7XG4gICAgICB2YXIgRiA9IGZ1bmN0aW9uKGEsIGIsIGMpe1xuICAgICAgICBpZih0aGlzIGluc3RhbmNlb2YgQyl7XG4gICAgICAgICAgc3dpdGNoKGFyZ3VtZW50cy5sZW5ndGgpe1xuICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4gbmV3IEM7XG4gICAgICAgICAgICBjYXNlIDE6IHJldHVybiBuZXcgQyhhKTtcbiAgICAgICAgICAgIGNhc2UgMjogcmV0dXJuIG5ldyBDKGEsIGIpO1xuICAgICAgICAgIH0gcmV0dXJuIG5ldyBDKGEsIGIsIGMpO1xuICAgICAgICB9IHJldHVybiBDLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9O1xuICAgICAgRltQUk9UT1RZUEVdID0gQ1tQUk9UT1RZUEVdO1xuICAgICAgcmV0dXJuIEY7XG4gICAgLy8gbWFrZSBzdGF0aWMgdmVyc2lvbnMgZm9yIHByb3RvdHlwZSBtZXRob2RzXG4gICAgfSkob3V0KSA6IElTX1BST1RPICYmIHR5cGVvZiBvdXQgPT0gJ2Z1bmN0aW9uJyA/IGN0eChGdW5jdGlvbi5jYWxsLCBvdXQpIDogb3V0O1xuICAgIC8vIGV4cG9ydCBwcm90byBtZXRob2RzIHRvIGNvcmUuJUNPTlNUUlVDVE9SJS5tZXRob2RzLiVOQU1FJVxuICAgIGlmKElTX1BST1RPKXtcbiAgICAgIChleHBvcnRzLnZpcnR1YWwgfHwgKGV4cG9ydHMudmlydHVhbCA9IHt9KSlba2V5XSA9IG91dDtcbiAgICAgIC8vIGV4cG9ydCBwcm90byBtZXRob2RzIHRvIGNvcmUuJUNPTlNUUlVDVE9SJS5wcm90b3R5cGUuJU5BTUUlXG4gICAgICBpZih0eXBlICYgJGV4cG9ydC5SICYmIGV4cFByb3RvICYmICFleHBQcm90b1trZXldKWhpZGUoZXhwUHJvdG8sIGtleSwgb3V0KTtcbiAgICB9XG4gIH1cbn07XG4vLyB0eXBlIGJpdG1hcFxuJGV4cG9ydC5GID0gMTsgICAvLyBmb3JjZWRcbiRleHBvcnQuRyA9IDI7ICAgLy8gZ2xvYmFsXG4kZXhwb3J0LlMgPSA0OyAgIC8vIHN0YXRpY1xuJGV4cG9ydC5QID0gODsgICAvLyBwcm90b1xuJGV4cG9ydC5CID0gMTY7ICAvLyBiaW5kXG4kZXhwb3J0LlcgPSAzMjsgIC8vIHdyYXBcbiRleHBvcnQuVSA9IDY0OyAgLy8gc2FmZVxuJGV4cG9ydC5SID0gMTI4OyAvLyByZWFsIHByb3RvIG1ldGhvZCBmb3IgYGxpYnJhcnlgIFxubW9kdWxlLmV4cG9ydHMgPSAkZXhwb3J0OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZXhlYyl7XG4gIHRyeSB7XG4gICAgcmV0dXJuICEhZXhlYygpO1xuICB9IGNhdGNoKGUpe1xuICAgIHJldHVybiB0cnVlO1xuICB9XG59OyIsIi8vIGh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2lzc3Vlcy84NiNpc3N1ZWNvbW1lbnQtMTE1NzU5MDI4XG52YXIgZ2xvYmFsID0gbW9kdWxlLmV4cG9ydHMgPSB0eXBlb2Ygd2luZG93ICE9ICd1bmRlZmluZWQnICYmIHdpbmRvdy5NYXRoID09IE1hdGhcbiAgPyB3aW5kb3cgOiB0eXBlb2Ygc2VsZiAhPSAndW5kZWZpbmVkJyAmJiBzZWxmLk1hdGggPT0gTWF0aCA/IHNlbGYgOiBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuaWYodHlwZW9mIF9fZyA9PSAnbnVtYmVyJylfX2cgPSBnbG9iYWw7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWYiLCJ2YXIgaGFzT3duUHJvcGVydHkgPSB7fS5oYXNPd25Qcm9wZXJ0eTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQsIGtleSl7XG4gIHJldHVybiBoYXNPd25Qcm9wZXJ0eS5jYWxsKGl0LCBrZXkpO1xufTsiLCJ2YXIgZFAgICAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpXG4gICwgY3JlYXRlRGVzYyA9IHJlcXVpcmUoJy4vX3Byb3BlcnR5LWRlc2MnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSA/IGZ1bmN0aW9uKG9iamVjdCwga2V5LCB2YWx1ZSl7XG4gIHJldHVybiBkUC5mKG9iamVjdCwga2V5LCBjcmVhdGVEZXNjKDEsIHZhbHVlKSk7XG59IDogZnVuY3Rpb24ob2JqZWN0LCBrZXksIHZhbHVlKXtcbiAgb2JqZWN0W2tleV0gPSB2YWx1ZTtcbiAgcmV0dXJuIG9iamVjdDtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19nbG9iYWwnKS5kb2N1bWVudCAmJiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7IiwibW9kdWxlLmV4cG9ydHMgPSAhcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSAmJiAhcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbigpe1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KHJlcXVpcmUoJy4vX2RvbS1jcmVhdGUnKSgnZGl2JyksICdhJywge2dldDogZnVuY3Rpb24oKXsgcmV0dXJuIDc7IH19KS5hICE9IDc7XG59KTsiLCIvLyBmYWxsYmFjayBmb3Igbm9uLWFycmF5LWxpa2UgRVMzIGFuZCBub24tZW51bWVyYWJsZSBvbGQgVjggc3RyaW5nc1xudmFyIGNvZiA9IHJlcXVpcmUoJy4vX2NvZicpO1xubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QoJ3onKS5wcm9wZXJ0eUlzRW51bWVyYWJsZSgwKSA/IE9iamVjdCA6IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIGNvZihpdCkgPT0gJ1N0cmluZycgPyBpdC5zcGxpdCgnJykgOiBPYmplY3QoaXQpO1xufTsiLCIvLyBjaGVjayBvbiBkZWZhdWx0IEFycmF5IGl0ZXJhdG9yXG52YXIgSXRlcmF0b3JzICA9IHJlcXVpcmUoJy4vX2l0ZXJhdG9ycycpXG4gICwgSVRFUkFUT1IgICA9IHJlcXVpcmUoJy4vX3drcycpKCdpdGVyYXRvcicpXG4gICwgQXJyYXlQcm90byA9IEFycmF5LnByb3RvdHlwZTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBpdCAhPT0gdW5kZWZpbmVkICYmIChJdGVyYXRvcnMuQXJyYXkgPT09IGl0IHx8IEFycmF5UHJvdG9bSVRFUkFUT1JdID09PSBpdCk7XG59OyIsIi8vIDcuMi4yIElzQXJyYXkoYXJndW1lbnQpXG52YXIgY29mID0gcmVxdWlyZSgnLi9fY29mJyk7XG5tb2R1bGUuZXhwb3J0cyA9IEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24gaXNBcnJheShhcmcpe1xuICByZXR1cm4gY29mKGFyZykgPT0gJ0FycmF5Jztcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiB0eXBlb2YgaXQgPT09ICdvYmplY3QnID8gaXQgIT09IG51bGwgOiB0eXBlb2YgaXQgPT09ICdmdW5jdGlvbic7XG59OyIsIi8vIGNhbGwgc29tZXRoaW5nIG9uIGl0ZXJhdG9yIHN0ZXAgd2l0aCBzYWZlIGNsb3Npbmcgb24gZXJyb3JcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdGVyYXRvciwgZm4sIHZhbHVlLCBlbnRyaWVzKXtcbiAgdHJ5IHtcbiAgICByZXR1cm4gZW50cmllcyA/IGZuKGFuT2JqZWN0KHZhbHVlKVswXSwgdmFsdWVbMV0pIDogZm4odmFsdWUpO1xuICAvLyA3LjQuNiBJdGVyYXRvckNsb3NlKGl0ZXJhdG9yLCBjb21wbGV0aW9uKVxuICB9IGNhdGNoKGUpe1xuICAgIHZhciByZXQgPSBpdGVyYXRvclsncmV0dXJuJ107XG4gICAgaWYocmV0ICE9PSB1bmRlZmluZWQpYW5PYmplY3QocmV0LmNhbGwoaXRlcmF0b3IpKTtcbiAgICB0aHJvdyBlO1xuICB9XG59OyIsIid1c2Ugc3RyaWN0JztcbnZhciBjcmVhdGUgICAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1jcmVhdGUnKVxuICAsIGRlc2NyaXB0b3IgICAgID0gcmVxdWlyZSgnLi9fcHJvcGVydHktZGVzYycpXG4gICwgc2V0VG9TdHJpbmdUYWcgPSByZXF1aXJlKCcuL19zZXQtdG8tc3RyaW5nLXRhZycpXG4gICwgSXRlcmF0b3JQcm90b3R5cGUgPSB7fTtcblxuLy8gMjUuMS4yLjEuMSAlSXRlcmF0b3JQcm90b3R5cGUlW0BAaXRlcmF0b3JdKClcbnJlcXVpcmUoJy4vX2hpZGUnKShJdGVyYXRvclByb3RvdHlwZSwgcmVxdWlyZSgnLi9fd2tzJykoJ2l0ZXJhdG9yJyksIGZ1bmN0aW9uKCl7IHJldHVybiB0aGlzOyB9KTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihDb25zdHJ1Y3RvciwgTkFNRSwgbmV4dCl7XG4gIENvbnN0cnVjdG9yLnByb3RvdHlwZSA9IGNyZWF0ZShJdGVyYXRvclByb3RvdHlwZSwge25leHQ6IGRlc2NyaXB0b3IoMSwgbmV4dCl9KTtcbiAgc2V0VG9TdHJpbmdUYWcoQ29uc3RydWN0b3IsIE5BTUUgKyAnIEl0ZXJhdG9yJyk7XG59OyIsIid1c2Ugc3RyaWN0JztcbnZhciBMSUJSQVJZICAgICAgICA9IHJlcXVpcmUoJy4vX2xpYnJhcnknKVxuICAsICRleHBvcnQgICAgICAgID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgLCByZWRlZmluZSAgICAgICA9IHJlcXVpcmUoJy4vX3JlZGVmaW5lJylcbiAgLCBoaWRlICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2hpZGUnKVxuICAsIGhhcyAgICAgICAgICAgID0gcmVxdWlyZSgnLi9faGFzJylcbiAgLCBJdGVyYXRvcnMgICAgICA9IHJlcXVpcmUoJy4vX2l0ZXJhdG9ycycpXG4gICwgJGl0ZXJDcmVhdGUgICAgPSByZXF1aXJlKCcuL19pdGVyLWNyZWF0ZScpXG4gICwgc2V0VG9TdHJpbmdUYWcgPSByZXF1aXJlKCcuL19zZXQtdG8tc3RyaW5nLXRhZycpXG4gICwgZ2V0UHJvdG90eXBlT2YgPSByZXF1aXJlKCcuL19vYmplY3QtZ3BvJylcbiAgLCBJVEVSQVRPUiAgICAgICA9IHJlcXVpcmUoJy4vX3drcycpKCdpdGVyYXRvcicpXG4gICwgQlVHR1kgICAgICAgICAgPSAhKFtdLmtleXMgJiYgJ25leHQnIGluIFtdLmtleXMoKSkgLy8gU2FmYXJpIGhhcyBidWdneSBpdGVyYXRvcnMgdy9vIGBuZXh0YFxuICAsIEZGX0lURVJBVE9SICAgID0gJ0BAaXRlcmF0b3InXG4gICwgS0VZUyAgICAgICAgICAgPSAna2V5cydcbiAgLCBWQUxVRVMgICAgICAgICA9ICd2YWx1ZXMnO1xuXG52YXIgcmV0dXJuVGhpcyA9IGZ1bmN0aW9uKCl7IHJldHVybiB0aGlzOyB9O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKEJhc2UsIE5BTUUsIENvbnN0cnVjdG9yLCBuZXh0LCBERUZBVUxULCBJU19TRVQsIEZPUkNFRCl7XG4gICRpdGVyQ3JlYXRlKENvbnN0cnVjdG9yLCBOQU1FLCBuZXh0KTtcbiAgdmFyIGdldE1ldGhvZCA9IGZ1bmN0aW9uKGtpbmQpe1xuICAgIGlmKCFCVUdHWSAmJiBraW5kIGluIHByb3RvKXJldHVybiBwcm90b1traW5kXTtcbiAgICBzd2l0Y2goa2luZCl7XG4gICAgICBjYXNlIEtFWVM6IHJldHVybiBmdW5jdGlvbiBrZXlzKCl7IHJldHVybiBuZXcgQ29uc3RydWN0b3IodGhpcywga2luZCk7IH07XG4gICAgICBjYXNlIFZBTFVFUzogcmV0dXJuIGZ1bmN0aW9uIHZhbHVlcygpeyByZXR1cm4gbmV3IENvbnN0cnVjdG9yKHRoaXMsIGtpbmQpOyB9O1xuICAgIH0gcmV0dXJuIGZ1bmN0aW9uIGVudHJpZXMoKXsgcmV0dXJuIG5ldyBDb25zdHJ1Y3Rvcih0aGlzLCBraW5kKTsgfTtcbiAgfTtcbiAgdmFyIFRBRyAgICAgICAgPSBOQU1FICsgJyBJdGVyYXRvcidcbiAgICAsIERFRl9WQUxVRVMgPSBERUZBVUxUID09IFZBTFVFU1xuICAgICwgVkFMVUVTX0JVRyA9IGZhbHNlXG4gICAgLCBwcm90byAgICAgID0gQmFzZS5wcm90b3R5cGVcbiAgICAsICRuYXRpdmUgICAgPSBwcm90b1tJVEVSQVRPUl0gfHwgcHJvdG9bRkZfSVRFUkFUT1JdIHx8IERFRkFVTFQgJiYgcHJvdG9bREVGQVVMVF1cbiAgICAsICRkZWZhdWx0ICAgPSAkbmF0aXZlIHx8IGdldE1ldGhvZChERUZBVUxUKVxuICAgICwgJGVudHJpZXMgICA9IERFRkFVTFQgPyAhREVGX1ZBTFVFUyA/ICRkZWZhdWx0IDogZ2V0TWV0aG9kKCdlbnRyaWVzJykgOiB1bmRlZmluZWRcbiAgICAsICRhbnlOYXRpdmUgPSBOQU1FID09ICdBcnJheScgPyBwcm90by5lbnRyaWVzIHx8ICRuYXRpdmUgOiAkbmF0aXZlXG4gICAgLCBtZXRob2RzLCBrZXksIEl0ZXJhdG9yUHJvdG90eXBlO1xuICAvLyBGaXggbmF0aXZlXG4gIGlmKCRhbnlOYXRpdmUpe1xuICAgIEl0ZXJhdG9yUHJvdG90eXBlID0gZ2V0UHJvdG90eXBlT2YoJGFueU5hdGl2ZS5jYWxsKG5ldyBCYXNlKSk7XG4gICAgaWYoSXRlcmF0b3JQcm90b3R5cGUgIT09IE9iamVjdC5wcm90b3R5cGUpe1xuICAgICAgLy8gU2V0IEBAdG9TdHJpbmdUYWcgdG8gbmF0aXZlIGl0ZXJhdG9yc1xuICAgICAgc2V0VG9TdHJpbmdUYWcoSXRlcmF0b3JQcm90b3R5cGUsIFRBRywgdHJ1ZSk7XG4gICAgICAvLyBmaXggZm9yIHNvbWUgb2xkIGVuZ2luZXNcbiAgICAgIGlmKCFMSUJSQVJZICYmICFoYXMoSXRlcmF0b3JQcm90b3R5cGUsIElURVJBVE9SKSloaWRlKEl0ZXJhdG9yUHJvdG90eXBlLCBJVEVSQVRPUiwgcmV0dXJuVGhpcyk7XG4gICAgfVxuICB9XG4gIC8vIGZpeCBBcnJheSN7dmFsdWVzLCBAQGl0ZXJhdG9yfS5uYW1lIGluIFY4IC8gRkZcbiAgaWYoREVGX1ZBTFVFUyAmJiAkbmF0aXZlICYmICRuYXRpdmUubmFtZSAhPT0gVkFMVUVTKXtcbiAgICBWQUxVRVNfQlVHID0gdHJ1ZTtcbiAgICAkZGVmYXVsdCA9IGZ1bmN0aW9uIHZhbHVlcygpeyByZXR1cm4gJG5hdGl2ZS5jYWxsKHRoaXMpOyB9O1xuICB9XG4gIC8vIERlZmluZSBpdGVyYXRvclxuICBpZigoIUxJQlJBUlkgfHwgRk9SQ0VEKSAmJiAoQlVHR1kgfHwgVkFMVUVTX0JVRyB8fCAhcHJvdG9bSVRFUkFUT1JdKSl7XG4gICAgaGlkZShwcm90bywgSVRFUkFUT1IsICRkZWZhdWx0KTtcbiAgfVxuICAvLyBQbHVnIGZvciBsaWJyYXJ5XG4gIEl0ZXJhdG9yc1tOQU1FXSA9ICRkZWZhdWx0O1xuICBJdGVyYXRvcnNbVEFHXSAgPSByZXR1cm5UaGlzO1xuICBpZihERUZBVUxUKXtcbiAgICBtZXRob2RzID0ge1xuICAgICAgdmFsdWVzOiAgREVGX1ZBTFVFUyA/ICRkZWZhdWx0IDogZ2V0TWV0aG9kKFZBTFVFUyksXG4gICAgICBrZXlzOiAgICBJU19TRVQgICAgID8gJGRlZmF1bHQgOiBnZXRNZXRob2QoS0VZUyksXG4gICAgICBlbnRyaWVzOiAkZW50cmllc1xuICAgIH07XG4gICAgaWYoRk9SQ0VEKWZvcihrZXkgaW4gbWV0aG9kcyl7XG4gICAgICBpZighKGtleSBpbiBwcm90bykpcmVkZWZpbmUocHJvdG8sIGtleSwgbWV0aG9kc1trZXldKTtcbiAgICB9IGVsc2UgJGV4cG9ydCgkZXhwb3J0LlAgKyAkZXhwb3J0LkYgKiAoQlVHR1kgfHwgVkFMVUVTX0JVRyksIE5BTUUsIG1ldGhvZHMpO1xuICB9XG4gIHJldHVybiBtZXRob2RzO1xufTsiLCJ2YXIgSVRFUkFUT1IgICAgID0gcmVxdWlyZSgnLi9fd2tzJykoJ2l0ZXJhdG9yJylcbiAgLCBTQUZFX0NMT1NJTkcgPSBmYWxzZTtcblxudHJ5IHtcbiAgdmFyIHJpdGVyID0gWzddW0lURVJBVE9SXSgpO1xuICByaXRlclsncmV0dXJuJ10gPSBmdW5jdGlvbigpeyBTQUZFX0NMT1NJTkcgPSB0cnVlOyB9O1xuICBBcnJheS5mcm9tKHJpdGVyLCBmdW5jdGlvbigpeyB0aHJvdyAyOyB9KTtcbn0gY2F0Y2goZSl7IC8qIGVtcHR5ICovIH1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihleGVjLCBza2lwQ2xvc2luZyl7XG4gIGlmKCFza2lwQ2xvc2luZyAmJiAhU0FGRV9DTE9TSU5HKXJldHVybiBmYWxzZTtcbiAgdmFyIHNhZmUgPSBmYWxzZTtcbiAgdHJ5IHtcbiAgICB2YXIgYXJyICA9IFs3XVxuICAgICAgLCBpdGVyID0gYXJyW0lURVJBVE9SXSgpO1xuICAgIGl0ZXIubmV4dCA9IGZ1bmN0aW9uKCl7IHJldHVybiB7ZG9uZTogc2FmZSA9IHRydWV9OyB9O1xuICAgIGFycltJVEVSQVRPUl0gPSBmdW5jdGlvbigpeyByZXR1cm4gaXRlcjsgfTtcbiAgICBleGVjKGFycik7XG4gIH0gY2F0Y2goZSl7IC8qIGVtcHR5ICovIH1cbiAgcmV0dXJuIHNhZmU7XG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZG9uZSwgdmFsdWUpe1xuICByZXR1cm4ge3ZhbHVlOiB2YWx1ZSwgZG9uZTogISFkb25lfTtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSB7fTsiLCJ2YXIgZ2V0S2V5cyAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMnKVxuICAsIHRvSU9iamVjdCA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ob2JqZWN0LCBlbCl7XG4gIHZhciBPICAgICAgPSB0b0lPYmplY3Qob2JqZWN0KVxuICAgICwga2V5cyAgID0gZ2V0S2V5cyhPKVxuICAgICwgbGVuZ3RoID0ga2V5cy5sZW5ndGhcbiAgICAsIGluZGV4ICA9IDBcbiAgICAsIGtleTtcbiAgd2hpbGUobGVuZ3RoID4gaW5kZXgpaWYoT1trZXkgPSBrZXlzW2luZGV4KytdXSA9PT0gZWwpcmV0dXJuIGtleTtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSB0cnVlOyIsInZhciBNRVRBICAgICA9IHJlcXVpcmUoJy4vX3VpZCcpKCdtZXRhJylcbiAgLCBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpXG4gICwgaGFzICAgICAgPSByZXF1aXJlKCcuL19oYXMnKVxuICAsIHNldERlc2MgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJykuZlxuICAsIGlkICAgICAgID0gMDtcbnZhciBpc0V4dGVuc2libGUgPSBPYmplY3QuaXNFeHRlbnNpYmxlIHx8IGZ1bmN0aW9uKCl7XG4gIHJldHVybiB0cnVlO1xufTtcbnZhciBGUkVFWkUgPSAhcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbigpe1xuICByZXR1cm4gaXNFeHRlbnNpYmxlKE9iamVjdC5wcmV2ZW50RXh0ZW5zaW9ucyh7fSkpO1xufSk7XG52YXIgc2V0TWV0YSA9IGZ1bmN0aW9uKGl0KXtcbiAgc2V0RGVzYyhpdCwgTUVUQSwge3ZhbHVlOiB7XG4gICAgaTogJ08nICsgKytpZCwgLy8gb2JqZWN0IElEXG4gICAgdzoge30gICAgICAgICAgLy8gd2VhayBjb2xsZWN0aW9ucyBJRHNcbiAgfX0pO1xufTtcbnZhciBmYXN0S2V5ID0gZnVuY3Rpb24oaXQsIGNyZWF0ZSl7XG4gIC8vIHJldHVybiBwcmltaXRpdmUgd2l0aCBwcmVmaXhcbiAgaWYoIWlzT2JqZWN0KGl0KSlyZXR1cm4gdHlwZW9mIGl0ID09ICdzeW1ib2wnID8gaXQgOiAodHlwZW9mIGl0ID09ICdzdHJpbmcnID8gJ1MnIDogJ1AnKSArIGl0O1xuICBpZighaGFzKGl0LCBNRVRBKSl7XG4gICAgLy8gY2FuJ3Qgc2V0IG1ldGFkYXRhIHRvIHVuY2F1Z2h0IGZyb3plbiBvYmplY3RcbiAgICBpZighaXNFeHRlbnNpYmxlKGl0KSlyZXR1cm4gJ0YnO1xuICAgIC8vIG5vdCBuZWNlc3NhcnkgdG8gYWRkIG1ldGFkYXRhXG4gICAgaWYoIWNyZWF0ZSlyZXR1cm4gJ0UnO1xuICAgIC8vIGFkZCBtaXNzaW5nIG1ldGFkYXRhXG4gICAgc2V0TWV0YShpdCk7XG4gIC8vIHJldHVybiBvYmplY3QgSURcbiAgfSByZXR1cm4gaXRbTUVUQV0uaTtcbn07XG52YXIgZ2V0V2VhayA9IGZ1bmN0aW9uKGl0LCBjcmVhdGUpe1xuICBpZighaGFzKGl0LCBNRVRBKSl7XG4gICAgLy8gY2FuJ3Qgc2V0IG1ldGFkYXRhIHRvIHVuY2F1Z2h0IGZyb3plbiBvYmplY3RcbiAgICBpZighaXNFeHRlbnNpYmxlKGl0KSlyZXR1cm4gdHJ1ZTtcbiAgICAvLyBub3QgbmVjZXNzYXJ5IHRvIGFkZCBtZXRhZGF0YVxuICAgIGlmKCFjcmVhdGUpcmV0dXJuIGZhbHNlO1xuICAgIC8vIGFkZCBtaXNzaW5nIG1ldGFkYXRhXG4gICAgc2V0TWV0YShpdCk7XG4gIC8vIHJldHVybiBoYXNoIHdlYWsgY29sbGVjdGlvbnMgSURzXG4gIH0gcmV0dXJuIGl0W01FVEFdLnc7XG59O1xuLy8gYWRkIG1ldGFkYXRhIG9uIGZyZWV6ZS1mYW1pbHkgbWV0aG9kcyBjYWxsaW5nXG52YXIgb25GcmVlemUgPSBmdW5jdGlvbihpdCl7XG4gIGlmKEZSRUVaRSAmJiBtZXRhLk5FRUQgJiYgaXNFeHRlbnNpYmxlKGl0KSAmJiAhaGFzKGl0LCBNRVRBKSlzZXRNZXRhKGl0KTtcbiAgcmV0dXJuIGl0O1xufTtcbnZhciBtZXRhID0gbW9kdWxlLmV4cG9ydHMgPSB7XG4gIEtFWTogICAgICBNRVRBLFxuICBORUVEOiAgICAgZmFsc2UsXG4gIGZhc3RLZXk6ICBmYXN0S2V5LFxuICBnZXRXZWFrOiAgZ2V0V2VhayxcbiAgb25GcmVlemU6IG9uRnJlZXplXG59OyIsIid1c2Ugc3RyaWN0Jztcbi8vIDE5LjEuMi4xIE9iamVjdC5hc3NpZ24odGFyZ2V0LCBzb3VyY2UsIC4uLilcbnZhciBnZXRLZXlzICA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzJylcbiAgLCBnT1BTICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1nb3BzJylcbiAgLCBwSUUgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1waWUnKVxuICAsIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8tb2JqZWN0JylcbiAgLCBJT2JqZWN0ICA9IHJlcXVpcmUoJy4vX2lvYmplY3QnKVxuICAsICRhc3NpZ24gID0gT2JqZWN0LmFzc2lnbjtcblxuLy8gc2hvdWxkIHdvcmsgd2l0aCBzeW1ib2xzIGFuZCBzaG91bGQgaGF2ZSBkZXRlcm1pbmlzdGljIHByb3BlcnR5IG9yZGVyIChWOCBidWcpXG5tb2R1bGUuZXhwb3J0cyA9ICEkYXNzaWduIHx8IHJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24oKXtcbiAgdmFyIEEgPSB7fVxuICAgICwgQiA9IHt9XG4gICAgLCBTID0gU3ltYm9sKClcbiAgICAsIEsgPSAnYWJjZGVmZ2hpamtsbW5vcHFyc3QnO1xuICBBW1NdID0gNztcbiAgSy5zcGxpdCgnJykuZm9yRWFjaChmdW5jdGlvbihrKXsgQltrXSA9IGs7IH0pO1xuICByZXR1cm4gJGFzc2lnbih7fSwgQSlbU10gIT0gNyB8fCBPYmplY3Qua2V5cygkYXNzaWduKHt9LCBCKSkuam9pbignJykgIT0gSztcbn0pID8gZnVuY3Rpb24gYXNzaWduKHRhcmdldCwgc291cmNlKXsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuICB2YXIgVCAgICAgPSB0b09iamVjdCh0YXJnZXQpXG4gICAgLCBhTGVuICA9IGFyZ3VtZW50cy5sZW5ndGhcbiAgICAsIGluZGV4ID0gMVxuICAgICwgZ2V0U3ltYm9scyA9IGdPUFMuZlxuICAgICwgaXNFbnVtICAgICA9IHBJRS5mO1xuICB3aGlsZShhTGVuID4gaW5kZXgpe1xuICAgIHZhciBTICAgICAgPSBJT2JqZWN0KGFyZ3VtZW50c1tpbmRleCsrXSlcbiAgICAgICwga2V5cyAgID0gZ2V0U3ltYm9scyA/IGdldEtleXMoUykuY29uY2F0KGdldFN5bWJvbHMoUykpIDogZ2V0S2V5cyhTKVxuICAgICAgLCBsZW5ndGggPSBrZXlzLmxlbmd0aFxuICAgICAgLCBqICAgICAgPSAwXG4gICAgICAsIGtleTtcbiAgICB3aGlsZShsZW5ndGggPiBqKWlmKGlzRW51bS5jYWxsKFMsIGtleSA9IGtleXNbaisrXSkpVFtrZXldID0gU1trZXldO1xuICB9IHJldHVybiBUO1xufSA6ICRhc3NpZ247IiwiLy8gMTkuMS4yLjIgLyAxNS4yLjMuNSBPYmplY3QuY3JlYXRlKE8gWywgUHJvcGVydGllc10pXG52YXIgYW5PYmplY3QgICAgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKVxuICAsIGRQcyAgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwcycpXG4gICwgZW51bUJ1Z0tleXMgPSByZXF1aXJlKCcuL19lbnVtLWJ1Zy1rZXlzJylcbiAgLCBJRV9QUk9UTyAgICA9IHJlcXVpcmUoJy4vX3NoYXJlZC1rZXknKSgnSUVfUFJPVE8nKVxuICAsIEVtcHR5ICAgICAgID0gZnVuY3Rpb24oKXsgLyogZW1wdHkgKi8gfVxuICAsIFBST1RPVFlQRSAgID0gJ3Byb3RvdHlwZSc7XG5cbi8vIENyZWF0ZSBvYmplY3Qgd2l0aCBmYWtlIGBudWxsYCBwcm90b3R5cGU6IHVzZSBpZnJhbWUgT2JqZWN0IHdpdGggY2xlYXJlZCBwcm90b3R5cGVcbnZhciBjcmVhdGVEaWN0ID0gZnVuY3Rpb24oKXtcbiAgLy8gVGhyYXNoLCB3YXN0ZSBhbmQgc29kb215OiBJRSBHQyBidWdcbiAgdmFyIGlmcmFtZSA9IHJlcXVpcmUoJy4vX2RvbS1jcmVhdGUnKSgnaWZyYW1lJylcbiAgICAsIGkgICAgICA9IGVudW1CdWdLZXlzLmxlbmd0aFxuICAgICwgbHQgICAgID0gJzwnXG4gICAgLCBndCAgICAgPSAnPidcbiAgICAsIGlmcmFtZURvY3VtZW50O1xuICBpZnJhbWUuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgcmVxdWlyZSgnLi9faHRtbCcpLmFwcGVuZENoaWxkKGlmcmFtZSk7XG4gIGlmcmFtZS5zcmMgPSAnamF2YXNjcmlwdDonOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXNjcmlwdC11cmxcbiAgLy8gY3JlYXRlRGljdCA9IGlmcmFtZS5jb250ZW50V2luZG93Lk9iamVjdDtcbiAgLy8gaHRtbC5yZW1vdmVDaGlsZChpZnJhbWUpO1xuICBpZnJhbWVEb2N1bWVudCA9IGlmcmFtZS5jb250ZW50V2luZG93LmRvY3VtZW50O1xuICBpZnJhbWVEb2N1bWVudC5vcGVuKCk7XG4gIGlmcmFtZURvY3VtZW50LndyaXRlKGx0ICsgJ3NjcmlwdCcgKyBndCArICdkb2N1bWVudC5GPU9iamVjdCcgKyBsdCArICcvc2NyaXB0JyArIGd0KTtcbiAgaWZyYW1lRG9jdW1lbnQuY2xvc2UoKTtcbiAgY3JlYXRlRGljdCA9IGlmcmFtZURvY3VtZW50LkY7XG4gIHdoaWxlKGktLSlkZWxldGUgY3JlYXRlRGljdFtQUk9UT1RZUEVdW2VudW1CdWdLZXlzW2ldXTtcbiAgcmV0dXJuIGNyZWF0ZURpY3QoKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmNyZWF0ZSB8fCBmdW5jdGlvbiBjcmVhdGUoTywgUHJvcGVydGllcyl7XG4gIHZhciByZXN1bHQ7XG4gIGlmKE8gIT09IG51bGwpe1xuICAgIEVtcHR5W1BST1RPVFlQRV0gPSBhbk9iamVjdChPKTtcbiAgICByZXN1bHQgPSBuZXcgRW1wdHk7XG4gICAgRW1wdHlbUFJPVE9UWVBFXSA9IG51bGw7XG4gICAgLy8gYWRkIFwiX19wcm90b19fXCIgZm9yIE9iamVjdC5nZXRQcm90b3R5cGVPZiBwb2x5ZmlsbFxuICAgIHJlc3VsdFtJRV9QUk9UT10gPSBPO1xuICB9IGVsc2UgcmVzdWx0ID0gY3JlYXRlRGljdCgpO1xuICByZXR1cm4gUHJvcGVydGllcyA9PT0gdW5kZWZpbmVkID8gcmVzdWx0IDogZFBzKHJlc3VsdCwgUHJvcGVydGllcyk7XG59O1xuIiwidmFyIGFuT2JqZWN0ICAgICAgID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0JylcbiAgLCBJRThfRE9NX0RFRklORSA9IHJlcXVpcmUoJy4vX2llOC1kb20tZGVmaW5lJylcbiAgLCB0b1ByaW1pdGl2ZSAgICA9IHJlcXVpcmUoJy4vX3RvLXByaW1pdGl2ZScpXG4gICwgZFAgICAgICAgICAgICAgPSBPYmplY3QuZGVmaW5lUHJvcGVydHk7XG5cbmV4cG9ydHMuZiA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgPyBPYmplY3QuZGVmaW5lUHJvcGVydHkgOiBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKXtcbiAgYW5PYmplY3QoTyk7XG4gIFAgPSB0b1ByaW1pdGl2ZShQLCB0cnVlKTtcbiAgYW5PYmplY3QoQXR0cmlidXRlcyk7XG4gIGlmKElFOF9ET01fREVGSU5FKXRyeSB7XG4gICAgcmV0dXJuIGRQKE8sIFAsIEF0dHJpYnV0ZXMpO1xuICB9IGNhdGNoKGUpeyAvKiBlbXB0eSAqLyB9XG4gIGlmKCdnZXQnIGluIEF0dHJpYnV0ZXMgfHwgJ3NldCcgaW4gQXR0cmlidXRlcyl0aHJvdyBUeXBlRXJyb3IoJ0FjY2Vzc29ycyBub3Qgc3VwcG9ydGVkIScpO1xuICBpZigndmFsdWUnIGluIEF0dHJpYnV0ZXMpT1tQXSA9IEF0dHJpYnV0ZXMudmFsdWU7XG4gIHJldHVybiBPO1xufTsiLCJ2YXIgZFAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKVxuICAsIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0JylcbiAgLCBnZXRLZXlzICA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSA/IE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzIDogZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyhPLCBQcm9wZXJ0aWVzKXtcbiAgYW5PYmplY3QoTyk7XG4gIHZhciBrZXlzICAgPSBnZXRLZXlzKFByb3BlcnRpZXMpXG4gICAgLCBsZW5ndGggPSBrZXlzLmxlbmd0aFxuICAgICwgaSA9IDBcbiAgICAsIFA7XG4gIHdoaWxlKGxlbmd0aCA+IGkpZFAuZihPLCBQID0ga2V5c1tpKytdLCBQcm9wZXJ0aWVzW1BdKTtcbiAgcmV0dXJuIE87XG59OyIsInZhciBwSUUgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1waWUnKVxuICAsIGNyZWF0ZURlc2MgICAgID0gcmVxdWlyZSgnLi9fcHJvcGVydHktZGVzYycpXG4gICwgdG9JT2JqZWN0ICAgICAgPSByZXF1aXJlKCcuL190by1pb2JqZWN0JylcbiAgLCB0b1ByaW1pdGl2ZSAgICA9IHJlcXVpcmUoJy4vX3RvLXByaW1pdGl2ZScpXG4gICwgaGFzICAgICAgICAgICAgPSByZXF1aXJlKCcuL19oYXMnKVxuICAsIElFOF9ET01fREVGSU5FID0gcmVxdWlyZSgnLi9faWU4LWRvbS1kZWZpbmUnKVxuICAsIGdPUEQgICAgICAgICAgID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcjtcblxuZXhwb3J0cy5mID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSA/IGdPUEQgOiBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoTywgUCl7XG4gIE8gPSB0b0lPYmplY3QoTyk7XG4gIFAgPSB0b1ByaW1pdGl2ZShQLCB0cnVlKTtcbiAgaWYoSUU4X0RPTV9ERUZJTkUpdHJ5IHtcbiAgICByZXR1cm4gZ09QRChPLCBQKTtcbiAgfSBjYXRjaChlKXsgLyogZW1wdHkgKi8gfVxuICBpZihoYXMoTywgUCkpcmV0dXJuIGNyZWF0ZURlc2MoIXBJRS5mLmNhbGwoTywgUCksIE9bUF0pO1xufTsiLCIvLyBmYWxsYmFjayBmb3IgSUUxMSBidWdneSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyB3aXRoIGlmcmFtZSBhbmQgd2luZG93XG52YXIgdG9JT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpXG4gICwgZ09QTiAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdvcG4nKS5mXG4gICwgdG9TdHJpbmcgID0ge30udG9TdHJpbmc7XG5cbnZhciB3aW5kb3dOYW1lcyA9IHR5cGVvZiB3aW5kb3cgPT0gJ29iamVjdCcgJiYgd2luZG93ICYmIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzXG4gID8gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMod2luZG93KSA6IFtdO1xuXG52YXIgZ2V0V2luZG93TmFtZXMgPSBmdW5jdGlvbihpdCl7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGdPUE4oaXQpO1xuICB9IGNhdGNoKGUpe1xuICAgIHJldHVybiB3aW5kb3dOYW1lcy5zbGljZSgpO1xuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cy5mID0gZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlOYW1lcyhpdCl7XG4gIHJldHVybiB3aW5kb3dOYW1lcyAmJiB0b1N0cmluZy5jYWxsKGl0KSA9PSAnW29iamVjdCBXaW5kb3ddJyA/IGdldFdpbmRvd05hbWVzKGl0KSA6IGdPUE4odG9JT2JqZWN0KGl0KSk7XG59O1xuIiwiLy8gMTkuMS4yLjcgLyAxNS4yLjMuNCBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhPKVxudmFyICRrZXlzICAgICAgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cy1pbnRlcm5hbCcpXG4gICwgaGlkZGVuS2V5cyA9IHJlcXVpcmUoJy4vX2VudW0tYnVnLWtleXMnKS5jb25jYXQoJ2xlbmd0aCcsICdwcm90b3R5cGUnKTtcblxuZXhwb3J0cy5mID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMgfHwgZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlOYW1lcyhPKXtcbiAgcmV0dXJuICRrZXlzKE8sIGhpZGRlbktleXMpO1xufTsiLCJleHBvcnRzLmYgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzOyIsIi8vIDE5LjEuMi45IC8gMTUuMi4zLjIgT2JqZWN0LmdldFByb3RvdHlwZU9mKE8pXG52YXIgaGFzICAgICAgICAgPSByZXF1aXJlKCcuL19oYXMnKVxuICAsIHRvT2JqZWN0ICAgID0gcmVxdWlyZSgnLi9fdG8tb2JqZWN0JylcbiAgLCBJRV9QUk9UTyAgICA9IHJlcXVpcmUoJy4vX3NoYXJlZC1rZXknKSgnSUVfUFJPVE8nKVxuICAsIE9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YgfHwgZnVuY3Rpb24oTyl7XG4gIE8gPSB0b09iamVjdChPKTtcbiAgaWYoaGFzKE8sIElFX1BST1RPKSlyZXR1cm4gT1tJRV9QUk9UT107XG4gIGlmKHR5cGVvZiBPLmNvbnN0cnVjdG9yID09ICdmdW5jdGlvbicgJiYgTyBpbnN0YW5jZW9mIE8uY29uc3RydWN0b3Ipe1xuICAgIHJldHVybiBPLmNvbnN0cnVjdG9yLnByb3RvdHlwZTtcbiAgfSByZXR1cm4gTyBpbnN0YW5jZW9mIE9iamVjdCA/IE9iamVjdFByb3RvIDogbnVsbDtcbn07IiwidmFyIGhhcyAgICAgICAgICA9IHJlcXVpcmUoJy4vX2hhcycpXG4gICwgdG9JT2JqZWN0ICAgID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpXG4gICwgYXJyYXlJbmRleE9mID0gcmVxdWlyZSgnLi9fYXJyYXktaW5jbHVkZXMnKShmYWxzZSlcbiAgLCBJRV9QUk9UTyAgICAgPSByZXF1aXJlKCcuL19zaGFyZWQta2V5JykoJ0lFX1BST1RPJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ob2JqZWN0LCBuYW1lcyl7XG4gIHZhciBPICAgICAgPSB0b0lPYmplY3Qob2JqZWN0KVxuICAgICwgaSAgICAgID0gMFxuICAgICwgcmVzdWx0ID0gW11cbiAgICAsIGtleTtcbiAgZm9yKGtleSBpbiBPKWlmKGtleSAhPSBJRV9QUk9UTyloYXMoTywga2V5KSAmJiByZXN1bHQucHVzaChrZXkpO1xuICAvLyBEb24ndCBlbnVtIGJ1ZyAmIGhpZGRlbiBrZXlzXG4gIHdoaWxlKG5hbWVzLmxlbmd0aCA+IGkpaWYoaGFzKE8sIGtleSA9IG5hbWVzW2krK10pKXtcbiAgICB+YXJyYXlJbmRleE9mKHJlc3VsdCwga2V5KSB8fCByZXN1bHQucHVzaChrZXkpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59OyIsIi8vIDE5LjEuMi4xNCAvIDE1LjIuMy4xNCBPYmplY3Qua2V5cyhPKVxudmFyICRrZXlzICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMtaW50ZXJuYWwnKVxuICAsIGVudW1CdWdLZXlzID0gcmVxdWlyZSgnLi9fZW51bS1idWcta2V5cycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5rZXlzIHx8IGZ1bmN0aW9uIGtleXMoTyl7XG4gIHJldHVybiAka2V5cyhPLCBlbnVtQnVnS2V5cyk7XG59OyIsImV4cG9ydHMuZiA9IHt9LnByb3BlcnR5SXNFbnVtZXJhYmxlOyIsIi8vIG1vc3QgT2JqZWN0IG1ldGhvZHMgYnkgRVM2IHNob3VsZCBhY2NlcHQgcHJpbWl0aXZlc1xudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsIGNvcmUgICAgPSByZXF1aXJlKCcuL19jb3JlJylcbiAgLCBmYWlscyAgID0gcmVxdWlyZSgnLi9fZmFpbHMnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oS0VZLCBleGVjKXtcbiAgdmFyIGZuICA9IChjb3JlLk9iamVjdCB8fCB7fSlbS0VZXSB8fCBPYmplY3RbS0VZXVxuICAgICwgZXhwID0ge307XG4gIGV4cFtLRVldID0gZXhlYyhmbik7XG4gICRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogZmFpbHMoZnVuY3Rpb24oKXsgZm4oMSk7IH0pLCAnT2JqZWN0JywgZXhwKTtcbn07IiwidmFyIGdldEtleXMgICA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzJylcbiAgLCB0b0lPYmplY3QgPSByZXF1aXJlKCcuL190by1pb2JqZWN0JylcbiAgLCBpc0VudW0gICAgPSByZXF1aXJlKCcuL19vYmplY3QtcGllJykuZjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXNFbnRyaWVzKXtcbiAgcmV0dXJuIGZ1bmN0aW9uKGl0KXtcbiAgICB2YXIgTyAgICAgID0gdG9JT2JqZWN0KGl0KVxuICAgICAgLCBrZXlzICAgPSBnZXRLZXlzKE8pXG4gICAgICAsIGxlbmd0aCA9IGtleXMubGVuZ3RoXG4gICAgICAsIGkgICAgICA9IDBcbiAgICAgICwgcmVzdWx0ID0gW11cbiAgICAgICwga2V5O1xuICAgIHdoaWxlKGxlbmd0aCA+IGkpaWYoaXNFbnVtLmNhbGwoTywga2V5ID0ga2V5c1tpKytdKSl7XG4gICAgICByZXN1bHQucHVzaChpc0VudHJpZXMgPyBba2V5LCBPW2tleV1dIDogT1trZXldKTtcbiAgICB9IHJldHVybiByZXN1bHQ7XG4gIH07XG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oYml0bWFwLCB2YWx1ZSl7XG4gIHJldHVybiB7XG4gICAgZW51bWVyYWJsZSAgOiAhKGJpdG1hcCAmIDEpLFxuICAgIGNvbmZpZ3VyYWJsZTogIShiaXRtYXAgJiAyKSxcbiAgICB3cml0YWJsZSAgICA6ICEoYml0bWFwICYgNCksXG4gICAgdmFsdWUgICAgICAgOiB2YWx1ZVxuICB9O1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2hpZGUnKTsiLCIvLyBXb3JrcyB3aXRoIF9fcHJvdG9fXyBvbmx5LiBPbGQgdjggY2FuJ3Qgd29yayB3aXRoIG51bGwgcHJvdG8gb2JqZWN0cy5cbi8qIGVzbGludC1kaXNhYmxlIG5vLXByb3RvICovXG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKVxuICAsIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0Jyk7XG52YXIgY2hlY2sgPSBmdW5jdGlvbihPLCBwcm90byl7XG4gIGFuT2JqZWN0KE8pO1xuICBpZighaXNPYmplY3QocHJvdG8pICYmIHByb3RvICE9PSBudWxsKXRocm93IFR5cGVFcnJvcihwcm90byArIFwiOiBjYW4ndCBzZXQgYXMgcHJvdG90eXBlIVwiKTtcbn07XG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgc2V0OiBPYmplY3Quc2V0UHJvdG90eXBlT2YgfHwgKCdfX3Byb3RvX18nIGluIHt9ID8gLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgIGZ1bmN0aW9uKHRlc3QsIGJ1Z2d5LCBzZXQpe1xuICAgICAgdHJ5IHtcbiAgICAgICAgc2V0ID0gcmVxdWlyZSgnLi9fY3R4JykoRnVuY3Rpb24uY2FsbCwgcmVxdWlyZSgnLi9fb2JqZWN0LWdvcGQnKS5mKE9iamVjdC5wcm90b3R5cGUsICdfX3Byb3RvX18nKS5zZXQsIDIpO1xuICAgICAgICBzZXQodGVzdCwgW10pO1xuICAgICAgICBidWdneSA9ICEodGVzdCBpbnN0YW5jZW9mIEFycmF5KTtcbiAgICAgIH0gY2F0Y2goZSl7IGJ1Z2d5ID0gdHJ1ZTsgfVxuICAgICAgcmV0dXJuIGZ1bmN0aW9uIHNldFByb3RvdHlwZU9mKE8sIHByb3RvKXtcbiAgICAgICAgY2hlY2soTywgcHJvdG8pO1xuICAgICAgICBpZihidWdneSlPLl9fcHJvdG9fXyA9IHByb3RvO1xuICAgICAgICBlbHNlIHNldChPLCBwcm90byk7XG4gICAgICAgIHJldHVybiBPO1xuICAgICAgfTtcbiAgICB9KHt9LCBmYWxzZSkgOiB1bmRlZmluZWQpLFxuICBjaGVjazogY2hlY2tcbn07IiwidmFyIGRlZiA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpLmZcbiAgLCBoYXMgPSByZXF1aXJlKCcuL19oYXMnKVxuICAsIFRBRyA9IHJlcXVpcmUoJy4vX3drcycpKCd0b1N0cmluZ1RhZycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0LCB0YWcsIHN0YXQpe1xuICBpZihpdCAmJiAhaGFzKGl0ID0gc3RhdCA/IGl0IDogaXQucHJvdG90eXBlLCBUQUcpKWRlZihpdCwgVEFHLCB7Y29uZmlndXJhYmxlOiB0cnVlLCB2YWx1ZTogdGFnfSk7XG59OyIsInZhciBzaGFyZWQgPSByZXF1aXJlKCcuL19zaGFyZWQnKSgna2V5cycpXG4gICwgdWlkICAgID0gcmVxdWlyZSgnLi9fdWlkJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGtleSl7XG4gIHJldHVybiBzaGFyZWRba2V5XSB8fCAoc2hhcmVkW2tleV0gPSB1aWQoa2V5KSk7XG59OyIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKVxuICAsIFNIQVJFRCA9ICdfX2NvcmUtanNfc2hhcmVkX18nXG4gICwgc3RvcmUgID0gZ2xvYmFsW1NIQVJFRF0gfHwgKGdsb2JhbFtTSEFSRURdID0ge30pO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihrZXkpe1xuICByZXR1cm4gc3RvcmVba2V5XSB8fCAoc3RvcmVba2V5XSA9IHt9KTtcbn07IiwidmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4vX3RvLWludGVnZXInKVxuICAsIGRlZmluZWQgICA9IHJlcXVpcmUoJy4vX2RlZmluZWQnKTtcbi8vIHRydWUgIC0+IFN0cmluZyNhdFxuLy8gZmFsc2UgLT4gU3RyaW5nI2NvZGVQb2ludEF0XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKFRPX1NUUklORyl7XG4gIHJldHVybiBmdW5jdGlvbih0aGF0LCBwb3Mpe1xuICAgIHZhciBzID0gU3RyaW5nKGRlZmluZWQodGhhdCkpXG4gICAgICAsIGkgPSB0b0ludGVnZXIocG9zKVxuICAgICAgLCBsID0gcy5sZW5ndGhcbiAgICAgICwgYSwgYjtcbiAgICBpZihpIDwgMCB8fCBpID49IGwpcmV0dXJuIFRPX1NUUklORyA/ICcnIDogdW5kZWZpbmVkO1xuICAgIGEgPSBzLmNoYXJDb2RlQXQoaSk7XG4gICAgcmV0dXJuIGEgPCAweGQ4MDAgfHwgYSA+IDB4ZGJmZiB8fCBpICsgMSA9PT0gbCB8fCAoYiA9IHMuY2hhckNvZGVBdChpICsgMSkpIDwgMHhkYzAwIHx8IGIgPiAweGRmZmZcbiAgICAgID8gVE9fU1RSSU5HID8gcy5jaGFyQXQoaSkgOiBhXG4gICAgICA6IFRPX1NUUklORyA/IHMuc2xpY2UoaSwgaSArIDIpIDogKGEgLSAweGQ4MDAgPDwgMTApICsgKGIgLSAweGRjMDApICsgMHgxMDAwMDtcbiAgfTtcbn07IiwidmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4vX3RvLWludGVnZXInKVxuICAsIG1heCAgICAgICA9IE1hdGgubWF4XG4gICwgbWluICAgICAgID0gTWF0aC5taW47XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGluZGV4LCBsZW5ndGgpe1xuICBpbmRleCA9IHRvSW50ZWdlcihpbmRleCk7XG4gIHJldHVybiBpbmRleCA8IDAgPyBtYXgoaW5kZXggKyBsZW5ndGgsIDApIDogbWluKGluZGV4LCBsZW5ndGgpO1xufTsiLCIvLyA3LjEuNCBUb0ludGVnZXJcbnZhciBjZWlsICA9IE1hdGguY2VpbFxuICAsIGZsb29yID0gTWF0aC5mbG9vcjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gaXNOYU4oaXQgPSAraXQpID8gMCA6IChpdCA+IDAgPyBmbG9vciA6IGNlaWwpKGl0KTtcbn07IiwiLy8gdG8gaW5kZXhlZCBvYmplY3QsIHRvT2JqZWN0IHdpdGggZmFsbGJhY2sgZm9yIG5vbi1hcnJheS1saWtlIEVTMyBzdHJpbmdzXG52YXIgSU9iamVjdCA9IHJlcXVpcmUoJy4vX2lvYmplY3QnKVxuICAsIGRlZmluZWQgPSByZXF1aXJlKCcuL19kZWZpbmVkJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIElPYmplY3QoZGVmaW5lZChpdCkpO1xufTsiLCIvLyA3LjEuMTUgVG9MZW5ndGhcbnZhciB0b0ludGVnZXIgPSByZXF1aXJlKCcuL190by1pbnRlZ2VyJylcbiAgLCBtaW4gICAgICAgPSBNYXRoLm1pbjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gaXQgPiAwID8gbWluKHRvSW50ZWdlcihpdCksIDB4MWZmZmZmZmZmZmZmZmYpIDogMDsgLy8gcG93KDIsIDUzKSAtIDEgPT0gOTAwNzE5OTI1NDc0MDk5MVxufTsiLCIvLyA3LjEuMTMgVG9PYmplY3QoYXJndW1lbnQpXG52YXIgZGVmaW5lZCA9IHJlcXVpcmUoJy4vX2RlZmluZWQnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gT2JqZWN0KGRlZmluZWQoaXQpKTtcbn07IiwiLy8gNy4xLjEgVG9QcmltaXRpdmUoaW5wdXQgWywgUHJlZmVycmVkVHlwZV0pXG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbi8vIGluc3RlYWQgb2YgdGhlIEVTNiBzcGVjIHZlcnNpb24sIHdlIGRpZG4ndCBpbXBsZW1lbnQgQEB0b1ByaW1pdGl2ZSBjYXNlXG4vLyBhbmQgdGhlIHNlY29uZCBhcmd1bWVudCAtIGZsYWcgLSBwcmVmZXJyZWQgdHlwZSBpcyBhIHN0cmluZ1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCwgUyl7XG4gIGlmKCFpc09iamVjdChpdCkpcmV0dXJuIGl0O1xuICB2YXIgZm4sIHZhbDtcbiAgaWYoUyAmJiB0eXBlb2YgKGZuID0gaXQudG9TdHJpbmcpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaXQpKSlyZXR1cm4gdmFsO1xuICBpZih0eXBlb2YgKGZuID0gaXQudmFsdWVPZikgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKXJldHVybiB2YWw7XG4gIGlmKCFTICYmIHR5cGVvZiAoZm4gPSBpdC50b1N0cmluZykgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKXJldHVybiB2YWw7XG4gIHRocm93IFR5cGVFcnJvcihcIkNhbid0IGNvbnZlcnQgb2JqZWN0IHRvIHByaW1pdGl2ZSB2YWx1ZVwiKTtcbn07IiwidmFyIGlkID0gMFxuICAsIHB4ID0gTWF0aC5yYW5kb20oKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oa2V5KXtcbiAgcmV0dXJuICdTeW1ib2woJy5jb25jYXQoa2V5ID09PSB1bmRlZmluZWQgPyAnJyA6IGtleSwgJylfJywgKCsraWQgKyBweCkudG9TdHJpbmcoMzYpKTtcbn07IiwidmFyIGdsb2JhbCAgICAgICAgID0gcmVxdWlyZSgnLi9fZ2xvYmFsJylcbiAgLCBjb3JlICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2NvcmUnKVxuICAsIExJQlJBUlkgICAgICAgID0gcmVxdWlyZSgnLi9fbGlicmFyeScpXG4gICwgd2tzRXh0ICAgICAgICAgPSByZXF1aXJlKCcuL193a3MtZXh0JylcbiAgLCBkZWZpbmVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpLmY7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG5hbWUpe1xuICB2YXIgJFN5bWJvbCA9IGNvcmUuU3ltYm9sIHx8IChjb3JlLlN5bWJvbCA9IExJQlJBUlkgPyB7fSA6IGdsb2JhbC5TeW1ib2wgfHwge30pO1xuICBpZihuYW1lLmNoYXJBdCgwKSAhPSAnXycgJiYgIShuYW1lIGluICRTeW1ib2wpKWRlZmluZVByb3BlcnR5KCRTeW1ib2wsIG5hbWUsIHt2YWx1ZTogd2tzRXh0LmYobmFtZSl9KTtcbn07IiwiZXhwb3J0cy5mID0gcmVxdWlyZSgnLi9fd2tzJyk7IiwidmFyIHN0b3JlICAgICAgPSByZXF1aXJlKCcuL19zaGFyZWQnKSgnd2tzJylcbiAgLCB1aWQgICAgICAgID0gcmVxdWlyZSgnLi9fdWlkJylcbiAgLCBTeW1ib2wgICAgID0gcmVxdWlyZSgnLi9fZ2xvYmFsJykuU3ltYm9sXG4gICwgVVNFX1NZTUJPTCA9IHR5cGVvZiBTeW1ib2wgPT0gJ2Z1bmN0aW9uJztcblxudmFyICRleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihuYW1lKXtcbiAgcmV0dXJuIHN0b3JlW25hbWVdIHx8IChzdG9yZVtuYW1lXSA9XG4gICAgVVNFX1NZTUJPTCAmJiBTeW1ib2xbbmFtZV0gfHwgKFVTRV9TWU1CT0wgPyBTeW1ib2wgOiB1aWQpKCdTeW1ib2wuJyArIG5hbWUpKTtcbn07XG5cbiRleHBvcnRzLnN0b3JlID0gc3RvcmU7IiwidmFyIGNsYXNzb2YgICA9IHJlcXVpcmUoJy4vX2NsYXNzb2YnKVxuICAsIElURVJBVE9SICA9IHJlcXVpcmUoJy4vX3drcycpKCdpdGVyYXRvcicpXG4gICwgSXRlcmF0b3JzID0gcmVxdWlyZSgnLi9faXRlcmF0b3JzJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2NvcmUnKS5nZXRJdGVyYXRvck1ldGhvZCA9IGZ1bmN0aW9uKGl0KXtcbiAgaWYoaXQgIT0gdW5kZWZpbmVkKXJldHVybiBpdFtJVEVSQVRPUl1cbiAgICB8fCBpdFsnQEBpdGVyYXRvciddXG4gICAgfHwgSXRlcmF0b3JzW2NsYXNzb2YoaXQpXTtcbn07IiwidmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0JylcbiAgLCBnZXQgICAgICA9IHJlcXVpcmUoJy4vY29yZS5nZXQtaXRlcmF0b3ItbWV0aG9kJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2NvcmUnKS5nZXRJdGVyYXRvciA9IGZ1bmN0aW9uKGl0KXtcbiAgdmFyIGl0ZXJGbiA9IGdldChpdCk7XG4gIGlmKHR5cGVvZiBpdGVyRm4gIT0gJ2Z1bmN0aW9uJyl0aHJvdyBUeXBlRXJyb3IoaXQgKyAnIGlzIG5vdCBpdGVyYWJsZSEnKTtcbiAgcmV0dXJuIGFuT2JqZWN0KGl0ZXJGbi5jYWxsKGl0KSk7XG59OyIsInZhciBjbGFzc29mICAgPSByZXF1aXJlKCcuL19jbGFzc29mJylcbiAgLCBJVEVSQVRPUiAgPSByZXF1aXJlKCcuL193a3MnKSgnaXRlcmF0b3InKVxuICAsIEl0ZXJhdG9ycyA9IHJlcXVpcmUoJy4vX2l0ZXJhdG9ycycpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19jb3JlJykuaXNJdGVyYWJsZSA9IGZ1bmN0aW9uKGl0KXtcbiAgdmFyIE8gPSBPYmplY3QoaXQpO1xuICByZXR1cm4gT1tJVEVSQVRPUl0gIT09IHVuZGVmaW5lZFxuICAgIHx8ICdAQGl0ZXJhdG9yJyBpbiBPXG4gICAgfHwgSXRlcmF0b3JzLmhhc093blByb3BlcnR5KGNsYXNzb2YoTykpO1xufTsiLCIndXNlIHN0cmljdCc7XG52YXIgY3R4ICAgICAgICAgICAgPSByZXF1aXJlKCcuL19jdHgnKVxuICAsICRleHBvcnQgICAgICAgID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgLCB0b09iamVjdCAgICAgICA9IHJlcXVpcmUoJy4vX3RvLW9iamVjdCcpXG4gICwgY2FsbCAgICAgICAgICAgPSByZXF1aXJlKCcuL19pdGVyLWNhbGwnKVxuICAsIGlzQXJyYXlJdGVyICAgID0gcmVxdWlyZSgnLi9faXMtYXJyYXktaXRlcicpXG4gICwgdG9MZW5ndGggICAgICAgPSByZXF1aXJlKCcuL190by1sZW5ndGgnKVxuICAsIGNyZWF0ZVByb3BlcnR5ID0gcmVxdWlyZSgnLi9fY3JlYXRlLXByb3BlcnR5JylcbiAgLCBnZXRJdGVyRm4gICAgICA9IHJlcXVpcmUoJy4vY29yZS5nZXQtaXRlcmF0b3ItbWV0aG9kJyk7XG5cbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogIXJlcXVpcmUoJy4vX2l0ZXItZGV0ZWN0JykoZnVuY3Rpb24oaXRlcil7IEFycmF5LmZyb20oaXRlcik7IH0pLCAnQXJyYXknLCB7XG4gIC8vIDIyLjEuMi4xIEFycmF5LmZyb20oYXJyYXlMaWtlLCBtYXBmbiA9IHVuZGVmaW5lZCwgdGhpc0FyZyA9IHVuZGVmaW5lZClcbiAgZnJvbTogZnVuY3Rpb24gZnJvbShhcnJheUxpa2UvKiwgbWFwZm4gPSB1bmRlZmluZWQsIHRoaXNBcmcgPSB1bmRlZmluZWQqLyl7XG4gICAgdmFyIE8gICAgICAgPSB0b09iamVjdChhcnJheUxpa2UpXG4gICAgICAsIEMgICAgICAgPSB0eXBlb2YgdGhpcyA9PSAnZnVuY3Rpb24nID8gdGhpcyA6IEFycmF5XG4gICAgICAsIGFMZW4gICAgPSBhcmd1bWVudHMubGVuZ3RoXG4gICAgICAsIG1hcGZuICAgPSBhTGVuID4gMSA/IGFyZ3VtZW50c1sxXSA6IHVuZGVmaW5lZFxuICAgICAgLCBtYXBwaW5nID0gbWFwZm4gIT09IHVuZGVmaW5lZFxuICAgICAgLCBpbmRleCAgID0gMFxuICAgICAgLCBpdGVyRm4gID0gZ2V0SXRlckZuKE8pXG4gICAgICAsIGxlbmd0aCwgcmVzdWx0LCBzdGVwLCBpdGVyYXRvcjtcbiAgICBpZihtYXBwaW5nKW1hcGZuID0gY3R4KG1hcGZuLCBhTGVuID4gMiA/IGFyZ3VtZW50c1syXSA6IHVuZGVmaW5lZCwgMik7XG4gICAgLy8gaWYgb2JqZWN0IGlzbid0IGl0ZXJhYmxlIG9yIGl0J3MgYXJyYXkgd2l0aCBkZWZhdWx0IGl0ZXJhdG9yIC0gdXNlIHNpbXBsZSBjYXNlXG4gICAgaWYoaXRlckZuICE9IHVuZGVmaW5lZCAmJiAhKEMgPT0gQXJyYXkgJiYgaXNBcnJheUl0ZXIoaXRlckZuKSkpe1xuICAgICAgZm9yKGl0ZXJhdG9yID0gaXRlckZuLmNhbGwoTyksIHJlc3VsdCA9IG5ldyBDOyAhKHN0ZXAgPSBpdGVyYXRvci5uZXh0KCkpLmRvbmU7IGluZGV4Kyspe1xuICAgICAgICBjcmVhdGVQcm9wZXJ0eShyZXN1bHQsIGluZGV4LCBtYXBwaW5nID8gY2FsbChpdGVyYXRvciwgbWFwZm4sIFtzdGVwLnZhbHVlLCBpbmRleF0sIHRydWUpIDogc3RlcC52YWx1ZSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGxlbmd0aCA9IHRvTGVuZ3RoKE8ubGVuZ3RoKTtcbiAgICAgIGZvcihyZXN1bHQgPSBuZXcgQyhsZW5ndGgpOyBsZW5ndGggPiBpbmRleDsgaW5kZXgrKyl7XG4gICAgICAgIGNyZWF0ZVByb3BlcnR5KHJlc3VsdCwgaW5kZXgsIG1hcHBpbmcgPyBtYXBmbihPW2luZGV4XSwgaW5kZXgpIDogT1tpbmRleF0pO1xuICAgICAgfVxuICAgIH1cbiAgICByZXN1bHQubGVuZ3RoID0gaW5kZXg7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxufSk7XG4iLCIndXNlIHN0cmljdCc7XG52YXIgYWRkVG9VbnNjb3BhYmxlcyA9IHJlcXVpcmUoJy4vX2FkZC10by11bnNjb3BhYmxlcycpXG4gICwgc3RlcCAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2l0ZXItc3RlcCcpXG4gICwgSXRlcmF0b3JzICAgICAgICA9IHJlcXVpcmUoJy4vX2l0ZXJhdG9ycycpXG4gICwgdG9JT2JqZWN0ICAgICAgICA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKTtcblxuLy8gMjIuMS4zLjQgQXJyYXkucHJvdG90eXBlLmVudHJpZXMoKVxuLy8gMjIuMS4zLjEzIEFycmF5LnByb3RvdHlwZS5rZXlzKClcbi8vIDIyLjEuMy4yOSBBcnJheS5wcm90b3R5cGUudmFsdWVzKClcbi8vIDIyLjEuMy4zMCBBcnJheS5wcm90b3R5cGVbQEBpdGVyYXRvcl0oKVxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19pdGVyLWRlZmluZScpKEFycmF5LCAnQXJyYXknLCBmdW5jdGlvbihpdGVyYXRlZCwga2luZCl7XG4gIHRoaXMuX3QgPSB0b0lPYmplY3QoaXRlcmF0ZWQpOyAvLyB0YXJnZXRcbiAgdGhpcy5faSA9IDA7ICAgICAgICAgICAgICAgICAgIC8vIG5leHQgaW5kZXhcbiAgdGhpcy5fayA9IGtpbmQ7ICAgICAgICAgICAgICAgIC8vIGtpbmRcbi8vIDIyLjEuNS4yLjEgJUFycmF5SXRlcmF0b3JQcm90b3R5cGUlLm5leHQoKVxufSwgZnVuY3Rpb24oKXtcbiAgdmFyIE8gICAgID0gdGhpcy5fdFxuICAgICwga2luZCAgPSB0aGlzLl9rXG4gICAgLCBpbmRleCA9IHRoaXMuX2krKztcbiAgaWYoIU8gfHwgaW5kZXggPj0gTy5sZW5ndGgpe1xuICAgIHRoaXMuX3QgPSB1bmRlZmluZWQ7XG4gICAgcmV0dXJuIHN0ZXAoMSk7XG4gIH1cbiAgaWYoa2luZCA9PSAna2V5cycgIClyZXR1cm4gc3RlcCgwLCBpbmRleCk7XG4gIGlmKGtpbmQgPT0gJ3ZhbHVlcycpcmV0dXJuIHN0ZXAoMCwgT1tpbmRleF0pO1xuICByZXR1cm4gc3RlcCgwLCBbaW5kZXgsIE9baW5kZXhdXSk7XG59LCAndmFsdWVzJyk7XG5cbi8vIGFyZ3VtZW50c0xpc3RbQEBpdGVyYXRvcl0gaXMgJUFycmF5UHJvdG9fdmFsdWVzJSAoOS40LjQuNiwgOS40LjQuNylcbkl0ZXJhdG9ycy5Bcmd1bWVudHMgPSBJdGVyYXRvcnMuQXJyYXk7XG5cbmFkZFRvVW5zY29wYWJsZXMoJ2tleXMnKTtcbmFkZFRvVW5zY29wYWJsZXMoJ3ZhbHVlcycpO1xuYWRkVG9VbnNjb3BhYmxlcygnZW50cmllcycpOyIsIi8vIDE5LjEuMy4xIE9iamVjdC5hc3NpZ24odGFyZ2V0LCBzb3VyY2UpXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiwgJ09iamVjdCcsIHthc3NpZ246IHJlcXVpcmUoJy4vX29iamVjdC1hc3NpZ24nKX0pOyIsInZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jylcbi8vIDE5LjEuMi4yIC8gMTUuMi4zLjUgT2JqZWN0LmNyZWF0ZShPIFssIFByb3BlcnRpZXNdKVxuJGV4cG9ydCgkZXhwb3J0LlMsICdPYmplY3QnLCB7Y3JlYXRlOiByZXF1aXJlKCcuL19vYmplY3QtY3JlYXRlJyl9KTsiLCJ2YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuLy8gMTkuMS4yLjQgLyAxNS4yLjMuNiBPYmplY3QuZGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcylcbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogIXJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJyksICdPYmplY3QnLCB7ZGVmaW5lUHJvcGVydHk6IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpLmZ9KTsiLCIvLyAxOS4xLjIuOSBPYmplY3QuZ2V0UHJvdG90eXBlT2YoTylcbnZhciB0b09iamVjdCAgICAgICAgPSByZXF1aXJlKCcuL190by1vYmplY3QnKVxuICAsICRnZXRQcm90b3R5cGVPZiA9IHJlcXVpcmUoJy4vX29iamVjdC1ncG8nKTtcblxucmVxdWlyZSgnLi9fb2JqZWN0LXNhcCcpKCdnZXRQcm90b3R5cGVPZicsIGZ1bmN0aW9uKCl7XG4gIHJldHVybiBmdW5jdGlvbiBnZXRQcm90b3R5cGVPZihpdCl7XG4gICAgcmV0dXJuICRnZXRQcm90b3R5cGVPZih0b09iamVjdChpdCkpO1xuICB9O1xufSk7IiwiLy8gMTkuMS4yLjE0IE9iamVjdC5rZXlzKE8pXG52YXIgdG9PYmplY3QgPSByZXF1aXJlKCcuL190by1vYmplY3QnKVxuICAsICRrZXlzICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMnKTtcblxucmVxdWlyZSgnLi9fb2JqZWN0LXNhcCcpKCdrZXlzJywgZnVuY3Rpb24oKXtcbiAgcmV0dXJuIGZ1bmN0aW9uIGtleXMoaXQpe1xuICAgIHJldHVybiAka2V5cyh0b09iamVjdChpdCkpO1xuICB9O1xufSk7IiwiLy8gMTkuMS4zLjE5IE9iamVjdC5zZXRQcm90b3R5cGVPZihPLCBwcm90bylcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG4kZXhwb3J0KCRleHBvcnQuUywgJ09iamVjdCcsIHtzZXRQcm90b3R5cGVPZjogcmVxdWlyZSgnLi9fc2V0LXByb3RvJykuc2V0fSk7IiwiIiwiJ3VzZSBzdHJpY3QnO1xudmFyICRhdCAgPSByZXF1aXJlKCcuL19zdHJpbmctYXQnKSh0cnVlKTtcblxuLy8gMjEuMS4zLjI3IFN0cmluZy5wcm90b3R5cGVbQEBpdGVyYXRvcl0oKVxucmVxdWlyZSgnLi9faXRlci1kZWZpbmUnKShTdHJpbmcsICdTdHJpbmcnLCBmdW5jdGlvbihpdGVyYXRlZCl7XG4gIHRoaXMuX3QgPSBTdHJpbmcoaXRlcmF0ZWQpOyAvLyB0YXJnZXRcbiAgdGhpcy5faSA9IDA7ICAgICAgICAgICAgICAgIC8vIG5leHQgaW5kZXhcbi8vIDIxLjEuNS4yLjEgJVN0cmluZ0l0ZXJhdG9yUHJvdG90eXBlJS5uZXh0KClcbn0sIGZ1bmN0aW9uKCl7XG4gIHZhciBPICAgICA9IHRoaXMuX3RcbiAgICAsIGluZGV4ID0gdGhpcy5faVxuICAgICwgcG9pbnQ7XG4gIGlmKGluZGV4ID49IE8ubGVuZ3RoKXJldHVybiB7dmFsdWU6IHVuZGVmaW5lZCwgZG9uZTogdHJ1ZX07XG4gIHBvaW50ID0gJGF0KE8sIGluZGV4KTtcbiAgdGhpcy5faSArPSBwb2ludC5sZW5ndGg7XG4gIHJldHVybiB7dmFsdWU6IHBvaW50LCBkb25lOiBmYWxzZX07XG59KTsiLCIndXNlIHN0cmljdCc7XG4vLyBFQ01BU2NyaXB0IDYgc3ltYm9scyBzaGltXG52YXIgZ2xvYmFsICAgICAgICAgPSByZXF1aXJlKCcuL19nbG9iYWwnKVxuICAsIGhhcyAgICAgICAgICAgID0gcmVxdWlyZSgnLi9faGFzJylcbiAgLCBERVNDUklQVE9SUyAgICA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJylcbiAgLCAkZXhwb3J0ICAgICAgICA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4gICwgcmVkZWZpbmUgICAgICAgPSByZXF1aXJlKCcuL19yZWRlZmluZScpXG4gICwgTUVUQSAgICAgICAgICAgPSByZXF1aXJlKCcuL19tZXRhJykuS0VZXG4gICwgJGZhaWxzICAgICAgICAgPSByZXF1aXJlKCcuL19mYWlscycpXG4gICwgc2hhcmVkICAgICAgICAgPSByZXF1aXJlKCcuL19zaGFyZWQnKVxuICAsIHNldFRvU3RyaW5nVGFnID0gcmVxdWlyZSgnLi9fc2V0LXRvLXN0cmluZy10YWcnKVxuICAsIHVpZCAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fdWlkJylcbiAgLCB3a3MgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX3drcycpXG4gICwgd2tzRXh0ICAgICAgICAgPSByZXF1aXJlKCcuL193a3MtZXh0JylcbiAgLCB3a3NEZWZpbmUgICAgICA9IHJlcXVpcmUoJy4vX3drcy1kZWZpbmUnKVxuICAsIGtleU9mICAgICAgICAgID0gcmVxdWlyZSgnLi9fa2V5b2YnKVxuICAsIGVudW1LZXlzICAgICAgID0gcmVxdWlyZSgnLi9fZW51bS1rZXlzJylcbiAgLCBpc0FycmF5ICAgICAgICA9IHJlcXVpcmUoJy4vX2lzLWFycmF5JylcbiAgLCBhbk9iamVjdCAgICAgICA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpXG4gICwgdG9JT2JqZWN0ICAgICAgPSByZXF1aXJlKCcuL190by1pb2JqZWN0JylcbiAgLCB0b1ByaW1pdGl2ZSAgICA9IHJlcXVpcmUoJy4vX3RvLXByaW1pdGl2ZScpXG4gICwgY3JlYXRlRGVzYyAgICAgPSByZXF1aXJlKCcuL19wcm9wZXJ0eS1kZXNjJylcbiAgLCBfY3JlYXRlICAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1jcmVhdGUnKVxuICAsIGdPUE5FeHQgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdvcG4tZXh0JylcbiAgLCAkR09QRCAgICAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1nb3BkJylcbiAgLCAkRFAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpXG4gICwgJGtleXMgICAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cycpXG4gICwgZ09QRCAgICAgICAgICAgPSAkR09QRC5mXG4gICwgZFAgICAgICAgICAgICAgPSAkRFAuZlxuICAsIGdPUE4gICAgICAgICAgID0gZ09QTkV4dC5mXG4gICwgJFN5bWJvbCAgICAgICAgPSBnbG9iYWwuU3ltYm9sXG4gICwgJEpTT04gICAgICAgICAgPSBnbG9iYWwuSlNPTlxuICAsIF9zdHJpbmdpZnkgICAgID0gJEpTT04gJiYgJEpTT04uc3RyaW5naWZ5XG4gICwgUFJPVE9UWVBFICAgICAgPSAncHJvdG90eXBlJ1xuICAsIEhJRERFTiAgICAgICAgID0gd2tzKCdfaGlkZGVuJylcbiAgLCBUT19QUklNSVRJVkUgICA9IHdrcygndG9QcmltaXRpdmUnKVxuICAsIGlzRW51bSAgICAgICAgID0ge30ucHJvcGVydHlJc0VudW1lcmFibGVcbiAgLCBTeW1ib2xSZWdpc3RyeSA9IHNoYXJlZCgnc3ltYm9sLXJlZ2lzdHJ5JylcbiAgLCBBbGxTeW1ib2xzICAgICA9IHNoYXJlZCgnc3ltYm9scycpXG4gICwgT1BTeW1ib2xzICAgICAgPSBzaGFyZWQoJ29wLXN5bWJvbHMnKVxuICAsIE9iamVjdFByb3RvICAgID0gT2JqZWN0W1BST1RPVFlQRV1cbiAgLCBVU0VfTkFUSVZFICAgICA9IHR5cGVvZiAkU3ltYm9sID09ICdmdW5jdGlvbidcbiAgLCBRT2JqZWN0ICAgICAgICA9IGdsb2JhbC5RT2JqZWN0O1xuLy8gRG9uJ3QgdXNlIHNldHRlcnMgaW4gUXQgU2NyaXB0LCBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvMTczXG52YXIgc2V0dGVyID0gIVFPYmplY3QgfHwgIVFPYmplY3RbUFJPVE9UWVBFXSB8fCAhUU9iamVjdFtQUk9UT1RZUEVdLmZpbmRDaGlsZDtcblxuLy8gZmFsbGJhY2sgZm9yIG9sZCBBbmRyb2lkLCBodHRwczovL2NvZGUuZ29vZ2xlLmNvbS9wL3Y4L2lzc3Vlcy9kZXRhaWw/aWQ9Njg3XG52YXIgc2V0U3ltYm9sRGVzYyA9IERFU0NSSVBUT1JTICYmICRmYWlscyhmdW5jdGlvbigpe1xuICByZXR1cm4gX2NyZWF0ZShkUCh7fSwgJ2EnLCB7XG4gICAgZ2V0OiBmdW5jdGlvbigpeyByZXR1cm4gZFAodGhpcywgJ2EnLCB7dmFsdWU6IDd9KS5hOyB9XG4gIH0pKS5hICE9IDc7XG59KSA/IGZ1bmN0aW9uKGl0LCBrZXksIEQpe1xuICB2YXIgcHJvdG9EZXNjID0gZ09QRChPYmplY3RQcm90bywga2V5KTtcbiAgaWYocHJvdG9EZXNjKWRlbGV0ZSBPYmplY3RQcm90b1trZXldO1xuICBkUChpdCwga2V5LCBEKTtcbiAgaWYocHJvdG9EZXNjICYmIGl0ICE9PSBPYmplY3RQcm90bylkUChPYmplY3RQcm90bywga2V5LCBwcm90b0Rlc2MpO1xufSA6IGRQO1xuXG52YXIgd3JhcCA9IGZ1bmN0aW9uKHRhZyl7XG4gIHZhciBzeW0gPSBBbGxTeW1ib2xzW3RhZ10gPSBfY3JlYXRlKCRTeW1ib2xbUFJPVE9UWVBFXSk7XG4gIHN5bS5fayA9IHRhZztcbiAgcmV0dXJuIHN5bTtcbn07XG5cbnZhciBpc1N5bWJvbCA9IFVTRV9OQVRJVkUgJiYgdHlwZW9mICRTeW1ib2wuaXRlcmF0b3IgPT0gJ3N5bWJvbCcgPyBmdW5jdGlvbihpdCl7XG4gIHJldHVybiB0eXBlb2YgaXQgPT0gJ3N5bWJvbCc7XG59IDogZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gaXQgaW5zdGFuY2VvZiAkU3ltYm9sO1xufTtcblxudmFyICRkZWZpbmVQcm9wZXJ0eSA9IGZ1bmN0aW9uIGRlZmluZVByb3BlcnR5KGl0LCBrZXksIEQpe1xuICBpZihpdCA9PT0gT2JqZWN0UHJvdG8pJGRlZmluZVByb3BlcnR5KE9QU3ltYm9scywga2V5LCBEKTtcbiAgYW5PYmplY3QoaXQpO1xuICBrZXkgPSB0b1ByaW1pdGl2ZShrZXksIHRydWUpO1xuICBhbk9iamVjdChEKTtcbiAgaWYoaGFzKEFsbFN5bWJvbHMsIGtleSkpe1xuICAgIGlmKCFELmVudW1lcmFibGUpe1xuICAgICAgaWYoIWhhcyhpdCwgSElEREVOKSlkUChpdCwgSElEREVOLCBjcmVhdGVEZXNjKDEsIHt9KSk7XG4gICAgICBpdFtISURERU5dW2tleV0gPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZihoYXMoaXQsIEhJRERFTikgJiYgaXRbSElEREVOXVtrZXldKWl0W0hJRERFTl1ba2V5XSA9IGZhbHNlO1xuICAgICAgRCA9IF9jcmVhdGUoRCwge2VudW1lcmFibGU6IGNyZWF0ZURlc2MoMCwgZmFsc2UpfSk7XG4gICAgfSByZXR1cm4gc2V0U3ltYm9sRGVzYyhpdCwga2V5LCBEKTtcbiAgfSByZXR1cm4gZFAoaXQsIGtleSwgRCk7XG59O1xudmFyICRkZWZpbmVQcm9wZXJ0aWVzID0gZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyhpdCwgUCl7XG4gIGFuT2JqZWN0KGl0KTtcbiAgdmFyIGtleXMgPSBlbnVtS2V5cyhQID0gdG9JT2JqZWN0KFApKVxuICAgICwgaSAgICA9IDBcbiAgICAsIGwgPSBrZXlzLmxlbmd0aFxuICAgICwga2V5O1xuICB3aGlsZShsID4gaSkkZGVmaW5lUHJvcGVydHkoaXQsIGtleSA9IGtleXNbaSsrXSwgUFtrZXldKTtcbiAgcmV0dXJuIGl0O1xufTtcbnZhciAkY3JlYXRlID0gZnVuY3Rpb24gY3JlYXRlKGl0LCBQKXtcbiAgcmV0dXJuIFAgPT09IHVuZGVmaW5lZCA/IF9jcmVhdGUoaXQpIDogJGRlZmluZVByb3BlcnRpZXMoX2NyZWF0ZShpdCksIFApO1xufTtcbnZhciAkcHJvcGVydHlJc0VudW1lcmFibGUgPSBmdW5jdGlvbiBwcm9wZXJ0eUlzRW51bWVyYWJsZShrZXkpe1xuICB2YXIgRSA9IGlzRW51bS5jYWxsKHRoaXMsIGtleSA9IHRvUHJpbWl0aXZlKGtleSwgdHJ1ZSkpO1xuICBpZih0aGlzID09PSBPYmplY3RQcm90byAmJiBoYXMoQWxsU3ltYm9scywga2V5KSAmJiAhaGFzKE9QU3ltYm9scywga2V5KSlyZXR1cm4gZmFsc2U7XG4gIHJldHVybiBFIHx8ICFoYXModGhpcywga2V5KSB8fCAhaGFzKEFsbFN5bWJvbHMsIGtleSkgfHwgaGFzKHRoaXMsIEhJRERFTikgJiYgdGhpc1tISURERU5dW2tleV0gPyBFIDogdHJ1ZTtcbn07XG52YXIgJGdldE93blByb3BlcnR5RGVzY3JpcHRvciA9IGZ1bmN0aW9uIGdldE93blByb3BlcnR5RGVzY3JpcHRvcihpdCwga2V5KXtcbiAgaXQgID0gdG9JT2JqZWN0KGl0KTtcbiAga2V5ID0gdG9QcmltaXRpdmUoa2V5LCB0cnVlKTtcbiAgaWYoaXQgPT09IE9iamVjdFByb3RvICYmIGhhcyhBbGxTeW1ib2xzLCBrZXkpICYmICFoYXMoT1BTeW1ib2xzLCBrZXkpKXJldHVybjtcbiAgdmFyIEQgPSBnT1BEKGl0LCBrZXkpO1xuICBpZihEICYmIGhhcyhBbGxTeW1ib2xzLCBrZXkpICYmICEoaGFzKGl0LCBISURERU4pICYmIGl0W0hJRERFTl1ba2V5XSkpRC5lbnVtZXJhYmxlID0gdHJ1ZTtcbiAgcmV0dXJuIEQ7XG59O1xudmFyICRnZXRPd25Qcm9wZXJ0eU5hbWVzID0gZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlOYW1lcyhpdCl7XG4gIHZhciBuYW1lcyAgPSBnT1BOKHRvSU9iamVjdChpdCkpXG4gICAgLCByZXN1bHQgPSBbXVxuICAgICwgaSAgICAgID0gMFxuICAgICwga2V5O1xuICB3aGlsZShuYW1lcy5sZW5ndGggPiBpKXtcbiAgICBpZighaGFzKEFsbFN5bWJvbHMsIGtleSA9IG5hbWVzW2krK10pICYmIGtleSAhPSBISURERU4gJiYga2V5ICE9IE1FVEEpcmVzdWx0LnB1c2goa2V5KTtcbiAgfSByZXR1cm4gcmVzdWx0O1xufTtcbnZhciAkZ2V0T3duUHJvcGVydHlTeW1ib2xzID0gZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlTeW1ib2xzKGl0KXtcbiAgdmFyIElTX09QICA9IGl0ID09PSBPYmplY3RQcm90b1xuICAgICwgbmFtZXMgID0gZ09QTihJU19PUCA/IE9QU3ltYm9scyA6IHRvSU9iamVjdChpdCkpXG4gICAgLCByZXN1bHQgPSBbXVxuICAgICwgaSAgICAgID0gMFxuICAgICwga2V5O1xuICB3aGlsZShuYW1lcy5sZW5ndGggPiBpKXtcbiAgICBpZihoYXMoQWxsU3ltYm9scywga2V5ID0gbmFtZXNbaSsrXSkgJiYgKElTX09QID8gaGFzKE9iamVjdFByb3RvLCBrZXkpIDogdHJ1ZSkpcmVzdWx0LnB1c2goQWxsU3ltYm9sc1trZXldKTtcbiAgfSByZXR1cm4gcmVzdWx0O1xufTtcblxuLy8gMTkuNC4xLjEgU3ltYm9sKFtkZXNjcmlwdGlvbl0pXG5pZighVVNFX05BVElWRSl7XG4gICRTeW1ib2wgPSBmdW5jdGlvbiBTeW1ib2woKXtcbiAgICBpZih0aGlzIGluc3RhbmNlb2YgJFN5bWJvbCl0aHJvdyBUeXBlRXJyb3IoJ1N5bWJvbCBpcyBub3QgYSBjb25zdHJ1Y3RvciEnKTtcbiAgICB2YXIgdGFnID0gdWlkKGFyZ3VtZW50cy5sZW5ndGggPiAwID8gYXJndW1lbnRzWzBdIDogdW5kZWZpbmVkKTtcbiAgICB2YXIgJHNldCA9IGZ1bmN0aW9uKHZhbHVlKXtcbiAgICAgIGlmKHRoaXMgPT09IE9iamVjdFByb3RvKSRzZXQuY2FsbChPUFN5bWJvbHMsIHZhbHVlKTtcbiAgICAgIGlmKGhhcyh0aGlzLCBISURERU4pICYmIGhhcyh0aGlzW0hJRERFTl0sIHRhZykpdGhpc1tISURERU5dW3RhZ10gPSBmYWxzZTtcbiAgICAgIHNldFN5bWJvbERlc2ModGhpcywgdGFnLCBjcmVhdGVEZXNjKDEsIHZhbHVlKSk7XG4gICAgfTtcbiAgICBpZihERVNDUklQVE9SUyAmJiBzZXR0ZXIpc2V0U3ltYm9sRGVzYyhPYmplY3RQcm90bywgdGFnLCB7Y29uZmlndXJhYmxlOiB0cnVlLCBzZXQ6ICRzZXR9KTtcbiAgICByZXR1cm4gd3JhcCh0YWcpO1xuICB9O1xuICByZWRlZmluZSgkU3ltYm9sW1BST1RPVFlQRV0sICd0b1N0cmluZycsIGZ1bmN0aW9uIHRvU3RyaW5nKCl7XG4gICAgcmV0dXJuIHRoaXMuX2s7XG4gIH0pO1xuXG4gICRHT1BELmYgPSAkZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO1xuICAkRFAuZiAgID0gJGRlZmluZVByb3BlcnR5O1xuICByZXF1aXJlKCcuL19vYmplY3QtZ29wbicpLmYgPSBnT1BORXh0LmYgPSAkZ2V0T3duUHJvcGVydHlOYW1lcztcbiAgcmVxdWlyZSgnLi9fb2JqZWN0LXBpZScpLmYgID0gJHByb3BlcnR5SXNFbnVtZXJhYmxlO1xuICByZXF1aXJlKCcuL19vYmplY3QtZ29wcycpLmYgPSAkZ2V0T3duUHJvcGVydHlTeW1ib2xzO1xuXG4gIGlmKERFU0NSSVBUT1JTICYmICFyZXF1aXJlKCcuL19saWJyYXJ5Jykpe1xuICAgIHJlZGVmaW5lKE9iamVjdFByb3RvLCAncHJvcGVydHlJc0VudW1lcmFibGUnLCAkcHJvcGVydHlJc0VudW1lcmFibGUsIHRydWUpO1xuICB9XG5cbiAgd2tzRXh0LmYgPSBmdW5jdGlvbihuYW1lKXtcbiAgICByZXR1cm4gd3JhcCh3a3MobmFtZSkpO1xuICB9XG59XG5cbiRleHBvcnQoJGV4cG9ydC5HICsgJGV4cG9ydC5XICsgJGV4cG9ydC5GICogIVVTRV9OQVRJVkUsIHtTeW1ib2w6ICRTeW1ib2x9KTtcblxuZm9yKHZhciBzeW1ib2xzID0gKFxuICAvLyAxOS40LjIuMiwgMTkuNC4yLjMsIDE5LjQuMi40LCAxOS40LjIuNiwgMTkuNC4yLjgsIDE5LjQuMi45LCAxOS40LjIuMTAsIDE5LjQuMi4xMSwgMTkuNC4yLjEyLCAxOS40LjIuMTMsIDE5LjQuMi4xNFxuICAnaGFzSW5zdGFuY2UsaXNDb25jYXRTcHJlYWRhYmxlLGl0ZXJhdG9yLG1hdGNoLHJlcGxhY2Usc2VhcmNoLHNwZWNpZXMsc3BsaXQsdG9QcmltaXRpdmUsdG9TdHJpbmdUYWcsdW5zY29wYWJsZXMnXG4pLnNwbGl0KCcsJyksIGkgPSAwOyBzeW1ib2xzLmxlbmd0aCA+IGk7ICl3a3Moc3ltYm9sc1tpKytdKTtcblxuZm9yKHZhciBzeW1ib2xzID0gJGtleXMod2tzLnN0b3JlKSwgaSA9IDA7IHN5bWJvbHMubGVuZ3RoID4gaTsgKXdrc0RlZmluZShzeW1ib2xzW2krK10pO1xuXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICFVU0VfTkFUSVZFLCAnU3ltYm9sJywge1xuICAvLyAxOS40LjIuMSBTeW1ib2wuZm9yKGtleSlcbiAgJ2Zvcic6IGZ1bmN0aW9uKGtleSl7XG4gICAgcmV0dXJuIGhhcyhTeW1ib2xSZWdpc3RyeSwga2V5ICs9ICcnKVxuICAgICAgPyBTeW1ib2xSZWdpc3RyeVtrZXldXG4gICAgICA6IFN5bWJvbFJlZ2lzdHJ5W2tleV0gPSAkU3ltYm9sKGtleSk7XG4gIH0sXG4gIC8vIDE5LjQuMi41IFN5bWJvbC5rZXlGb3Ioc3ltKVxuICBrZXlGb3I6IGZ1bmN0aW9uIGtleUZvcihrZXkpe1xuICAgIGlmKGlzU3ltYm9sKGtleSkpcmV0dXJuIGtleU9mKFN5bWJvbFJlZ2lzdHJ5LCBrZXkpO1xuICAgIHRocm93IFR5cGVFcnJvcihrZXkgKyAnIGlzIG5vdCBhIHN5bWJvbCEnKTtcbiAgfSxcbiAgdXNlU2V0dGVyOiBmdW5jdGlvbigpeyBzZXR0ZXIgPSB0cnVlOyB9LFxuICB1c2VTaW1wbGU6IGZ1bmN0aW9uKCl7IHNldHRlciA9IGZhbHNlOyB9XG59KTtcblxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAhVVNFX05BVElWRSwgJ09iamVjdCcsIHtcbiAgLy8gMTkuMS4yLjIgT2JqZWN0LmNyZWF0ZShPIFssIFByb3BlcnRpZXNdKVxuICBjcmVhdGU6ICRjcmVhdGUsXG4gIC8vIDE5LjEuMi40IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKVxuICBkZWZpbmVQcm9wZXJ0eTogJGRlZmluZVByb3BlcnR5LFxuICAvLyAxOS4xLjIuMyBPYmplY3QuZGVmaW5lUHJvcGVydGllcyhPLCBQcm9wZXJ0aWVzKVxuICBkZWZpbmVQcm9wZXJ0aWVzOiAkZGVmaW5lUHJvcGVydGllcyxcbiAgLy8gMTkuMS4yLjYgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihPLCBQKVxuICBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I6ICRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IsXG4gIC8vIDE5LjEuMi43IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKE8pXG4gIGdldE93blByb3BlcnR5TmFtZXM6ICRnZXRPd25Qcm9wZXJ0eU5hbWVzLFxuICAvLyAxOS4xLjIuOCBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKE8pXG4gIGdldE93blByb3BlcnR5U3ltYm9sczogJGdldE93blByb3BlcnR5U3ltYm9sc1xufSk7XG5cbi8vIDI0LjMuMiBKU09OLnN0cmluZ2lmeSh2YWx1ZSBbLCByZXBsYWNlciBbLCBzcGFjZV1dKVxuJEpTT04gJiYgJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAoIVVTRV9OQVRJVkUgfHwgJGZhaWxzKGZ1bmN0aW9uKCl7XG4gIHZhciBTID0gJFN5bWJvbCgpO1xuICAvLyBNUyBFZGdlIGNvbnZlcnRzIHN5bWJvbCB2YWx1ZXMgdG8gSlNPTiBhcyB7fVxuICAvLyBXZWJLaXQgY29udmVydHMgc3ltYm9sIHZhbHVlcyB0byBKU09OIGFzIG51bGxcbiAgLy8gVjggdGhyb3dzIG9uIGJveGVkIHN5bWJvbHNcbiAgcmV0dXJuIF9zdHJpbmdpZnkoW1NdKSAhPSAnW251bGxdJyB8fCBfc3RyaW5naWZ5KHthOiBTfSkgIT0gJ3t9JyB8fCBfc3RyaW5naWZ5KE9iamVjdChTKSkgIT0gJ3t9Jztcbn0pKSwgJ0pTT04nLCB7XG4gIHN0cmluZ2lmeTogZnVuY3Rpb24gc3RyaW5naWZ5KGl0KXtcbiAgICBpZihpdCA9PT0gdW5kZWZpbmVkIHx8IGlzU3ltYm9sKGl0KSlyZXR1cm47IC8vIElFOCByZXR1cm5zIHN0cmluZyBvbiB1bmRlZmluZWRcbiAgICB2YXIgYXJncyA9IFtpdF1cbiAgICAgICwgaSAgICA9IDFcbiAgICAgICwgcmVwbGFjZXIsICRyZXBsYWNlcjtcbiAgICB3aGlsZShhcmd1bWVudHMubGVuZ3RoID4gaSlhcmdzLnB1c2goYXJndW1lbnRzW2krK10pO1xuICAgIHJlcGxhY2VyID0gYXJnc1sxXTtcbiAgICBpZih0eXBlb2YgcmVwbGFjZXIgPT0gJ2Z1bmN0aW9uJykkcmVwbGFjZXIgPSByZXBsYWNlcjtcbiAgICBpZigkcmVwbGFjZXIgfHwgIWlzQXJyYXkocmVwbGFjZXIpKXJlcGxhY2VyID0gZnVuY3Rpb24oa2V5LCB2YWx1ZSl7XG4gICAgICBpZigkcmVwbGFjZXIpdmFsdWUgPSAkcmVwbGFjZXIuY2FsbCh0aGlzLCBrZXksIHZhbHVlKTtcbiAgICAgIGlmKCFpc1N5bWJvbCh2YWx1ZSkpcmV0dXJuIHZhbHVlO1xuICAgIH07XG4gICAgYXJnc1sxXSA9IHJlcGxhY2VyO1xuICAgIHJldHVybiBfc3RyaW5naWZ5LmFwcGx5KCRKU09OLCBhcmdzKTtcbiAgfVxufSk7XG5cbi8vIDE5LjQuMy40IFN5bWJvbC5wcm90b3R5cGVbQEB0b1ByaW1pdGl2ZV0oaGludClcbiRTeW1ib2xbUFJPVE9UWVBFXVtUT19QUklNSVRJVkVdIHx8IHJlcXVpcmUoJy4vX2hpZGUnKSgkU3ltYm9sW1BST1RPVFlQRV0sIFRPX1BSSU1JVElWRSwgJFN5bWJvbFtQUk9UT1RZUEVdLnZhbHVlT2YpO1xuLy8gMTkuNC4zLjUgU3ltYm9sLnByb3RvdHlwZVtAQHRvU3RyaW5nVGFnXVxuc2V0VG9TdHJpbmdUYWcoJFN5bWJvbCwgJ1N5bWJvbCcpO1xuLy8gMjAuMi4xLjkgTWF0aFtAQHRvU3RyaW5nVGFnXVxuc2V0VG9TdHJpbmdUYWcoTWF0aCwgJ01hdGgnLCB0cnVlKTtcbi8vIDI0LjMuMyBKU09OW0BAdG9TdHJpbmdUYWddXG5zZXRUb1N0cmluZ1RhZyhnbG9iYWwuSlNPTiwgJ0pTT04nLCB0cnVlKTsiLCIvLyBodHRwczovL2dpdGh1Yi5jb20vdGMzOS9wcm9wb3NhbC1vYmplY3QtdmFsdWVzLWVudHJpZXNcbnZhciAkZXhwb3J0ICA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4gICwgJGVudHJpZXMgPSByZXF1aXJlKCcuL19vYmplY3QtdG8tYXJyYXknKSh0cnVlKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMsICdPYmplY3QnLCB7XG4gIGVudHJpZXM6IGZ1bmN0aW9uIGVudHJpZXMoaXQpe1xuICAgIHJldHVybiAkZW50cmllcyhpdCk7XG4gIH1cbn0pOyIsInJlcXVpcmUoJy4vX3drcy1kZWZpbmUnKSgnYXN5bmNJdGVyYXRvcicpOyIsInJlcXVpcmUoJy4vX3drcy1kZWZpbmUnKSgnb2JzZXJ2YWJsZScpOyIsInJlcXVpcmUoJy4vZXM2LmFycmF5Lml0ZXJhdG9yJyk7XG52YXIgZ2xvYmFsICAgICAgICA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpXG4gICwgaGlkZSAgICAgICAgICA9IHJlcXVpcmUoJy4vX2hpZGUnKVxuICAsIEl0ZXJhdG9ycyAgICAgPSByZXF1aXJlKCcuL19pdGVyYXRvcnMnKVxuICAsIFRPX1NUUklOR19UQUcgPSByZXF1aXJlKCcuL193a3MnKSgndG9TdHJpbmdUYWcnKTtcblxuZm9yKHZhciBjb2xsZWN0aW9ucyA9IFsnTm9kZUxpc3QnLCAnRE9NVG9rZW5MaXN0JywgJ01lZGlhTGlzdCcsICdTdHlsZVNoZWV0TGlzdCcsICdDU1NSdWxlTGlzdCddLCBpID0gMDsgaSA8IDU7IGkrKyl7XG4gIHZhciBOQU1FICAgICAgID0gY29sbGVjdGlvbnNbaV1cbiAgICAsIENvbGxlY3Rpb24gPSBnbG9iYWxbTkFNRV1cbiAgICAsIHByb3RvICAgICAgPSBDb2xsZWN0aW9uICYmIENvbGxlY3Rpb24ucHJvdG90eXBlO1xuICBpZihwcm90byAmJiAhcHJvdG9bVE9fU1RSSU5HX1RBR10paGlkZShwcm90bywgVE9fU1RSSU5HX1RBRywgTkFNRSk7XG4gIEl0ZXJhdG9yc1tOQU1FXSA9IEl0ZXJhdG9ycy5BcnJheTtcbn0iLCIvKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYGdsb2JhbGAgZnJvbSBOb2RlLmpzLiAqL1xudmFyIGZyZWVHbG9iYWwgPSB0eXBlb2YgZ2xvYmFsID09ICdvYmplY3QnICYmIGdsb2JhbCAmJiBnbG9iYWwuT2JqZWN0ID09PSBPYmplY3QgJiYgZ2xvYmFsO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZyZWVHbG9iYWw7XG4iLCJ2YXIgZnJlZUdsb2JhbCA9IHJlcXVpcmUoJy4vX2ZyZWVHbG9iYWwnKTtcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBzZWxmYC4gKi9cbnZhciBmcmVlU2VsZiA9IHR5cGVvZiBzZWxmID09ICdvYmplY3QnICYmIHNlbGYgJiYgc2VsZi5PYmplY3QgPT09IE9iamVjdCAmJiBzZWxmO1xuXG4vKiogVXNlZCBhcyBhIHJlZmVyZW5jZSB0byB0aGUgZ2xvYmFsIG9iamVjdC4gKi9cbnZhciByb290ID0gZnJlZUdsb2JhbCB8fCBmcmVlU2VsZiB8fCBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJvb3Q7XG4iLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL2lzT2JqZWN0JyksXG4gICAgbm93ID0gcmVxdWlyZSgnLi9ub3cnKSxcbiAgICB0b051bWJlciA9IHJlcXVpcmUoJy4vdG9OdW1iZXInKTtcblxuLyoqIEVycm9yIG1lc3NhZ2UgY29uc3RhbnRzLiAqL1xudmFyIEZVTkNfRVJST1JfVEVYVCA9ICdFeHBlY3RlZCBhIGZ1bmN0aW9uJztcblxuLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgZm9yIHRob3NlIHdpdGggdGhlIHNhbWUgbmFtZSBhcyBvdGhlciBgbG9kYXNoYCBtZXRob2RzLiAqL1xudmFyIG5hdGl2ZU1heCA9IE1hdGgubWF4LFxuICAgIG5hdGl2ZU1pbiA9IE1hdGgubWluO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBkZWJvdW5jZWQgZnVuY3Rpb24gdGhhdCBkZWxheXMgaW52b2tpbmcgYGZ1bmNgIHVudGlsIGFmdGVyIGB3YWl0YFxuICogbWlsbGlzZWNvbmRzIGhhdmUgZWxhcHNlZCBzaW5jZSB0aGUgbGFzdCB0aW1lIHRoZSBkZWJvdW5jZWQgZnVuY3Rpb24gd2FzXG4gKiBpbnZva2VkLiBUaGUgZGVib3VuY2VkIGZ1bmN0aW9uIGNvbWVzIHdpdGggYSBgY2FuY2VsYCBtZXRob2QgdG8gY2FuY2VsXG4gKiBkZWxheWVkIGBmdW5jYCBpbnZvY2F0aW9ucyBhbmQgYSBgZmx1c2hgIG1ldGhvZCB0byBpbW1lZGlhdGVseSBpbnZva2UgdGhlbS5cbiAqIFByb3ZpZGUgYG9wdGlvbnNgIHRvIGluZGljYXRlIHdoZXRoZXIgYGZ1bmNgIHNob3VsZCBiZSBpbnZva2VkIG9uIHRoZVxuICogbGVhZGluZyBhbmQvb3IgdHJhaWxpbmcgZWRnZSBvZiB0aGUgYHdhaXRgIHRpbWVvdXQuIFRoZSBgZnVuY2AgaXMgaW52b2tlZFxuICogd2l0aCB0aGUgbGFzdCBhcmd1bWVudHMgcHJvdmlkZWQgdG8gdGhlIGRlYm91bmNlZCBmdW5jdGlvbi4gU3Vic2VxdWVudFxuICogY2FsbHMgdG8gdGhlIGRlYm91bmNlZCBmdW5jdGlvbiByZXR1cm4gdGhlIHJlc3VsdCBvZiB0aGUgbGFzdCBgZnVuY2BcbiAqIGludm9jYXRpb24uXG4gKlxuICogKipOb3RlOioqIElmIGBsZWFkaW5nYCBhbmQgYHRyYWlsaW5nYCBvcHRpb25zIGFyZSBgdHJ1ZWAsIGBmdW5jYCBpc1xuICogaW52b2tlZCBvbiB0aGUgdHJhaWxpbmcgZWRnZSBvZiB0aGUgdGltZW91dCBvbmx5IGlmIHRoZSBkZWJvdW5jZWQgZnVuY3Rpb25cbiAqIGlzIGludm9rZWQgbW9yZSB0aGFuIG9uY2UgZHVyaW5nIHRoZSBgd2FpdGAgdGltZW91dC5cbiAqXG4gKiBJZiBgd2FpdGAgaXMgYDBgIGFuZCBgbGVhZGluZ2AgaXMgYGZhbHNlYCwgYGZ1bmNgIGludm9jYXRpb24gaXMgZGVmZXJyZWRcbiAqIHVudGlsIHRvIHRoZSBuZXh0IHRpY2ssIHNpbWlsYXIgdG8gYHNldFRpbWVvdXRgIHdpdGggYSB0aW1lb3V0IG9mIGAwYC5cbiAqXG4gKiBTZWUgW0RhdmlkIENvcmJhY2hvJ3MgYXJ0aWNsZV0oaHR0cHM6Ly9jc3MtdHJpY2tzLmNvbS9kZWJvdW5jaW5nLXRocm90dGxpbmctZXhwbGFpbmVkLWV4YW1wbGVzLylcbiAqIGZvciBkZXRhaWxzIG92ZXIgdGhlIGRpZmZlcmVuY2VzIGJldHdlZW4gYF8uZGVib3VuY2VgIGFuZCBgXy50aHJvdHRsZWAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byBkZWJvdW5jZS5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbd2FpdD0wXSBUaGUgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyB0byBkZWxheS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucz17fV0gVGhlIG9wdGlvbnMgb2JqZWN0LlxuICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5sZWFkaW5nPWZhbHNlXVxuICogIFNwZWNpZnkgaW52b2tpbmcgb24gdGhlIGxlYWRpbmcgZWRnZSBvZiB0aGUgdGltZW91dC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0aW9ucy5tYXhXYWl0XVxuICogIFRoZSBtYXhpbXVtIHRpbWUgYGZ1bmNgIGlzIGFsbG93ZWQgdG8gYmUgZGVsYXllZCBiZWZvcmUgaXQncyBpbnZva2VkLlxuICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy50cmFpbGluZz10cnVlXVxuICogIFNwZWNpZnkgaW52b2tpbmcgb24gdGhlIHRyYWlsaW5nIGVkZ2Ugb2YgdGhlIHRpbWVvdXQuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBkZWJvdW5jZWQgZnVuY3Rpb24uXG4gKiBAZXhhbXBsZVxuICpcbiAqIC8vIEF2b2lkIGNvc3RseSBjYWxjdWxhdGlvbnMgd2hpbGUgdGhlIHdpbmRvdyBzaXplIGlzIGluIGZsdXguXG4gKiBqUXVlcnkod2luZG93KS5vbigncmVzaXplJywgXy5kZWJvdW5jZShjYWxjdWxhdGVMYXlvdXQsIDE1MCkpO1xuICpcbiAqIC8vIEludm9rZSBgc2VuZE1haWxgIHdoZW4gY2xpY2tlZCwgZGVib3VuY2luZyBzdWJzZXF1ZW50IGNhbGxzLlxuICogalF1ZXJ5KGVsZW1lbnQpLm9uKCdjbGljaycsIF8uZGVib3VuY2Uoc2VuZE1haWwsIDMwMCwge1xuICogICAnbGVhZGluZyc6IHRydWUsXG4gKiAgICd0cmFpbGluZyc6IGZhbHNlXG4gKiB9KSk7XG4gKlxuICogLy8gRW5zdXJlIGBiYXRjaExvZ2AgaXMgaW52b2tlZCBvbmNlIGFmdGVyIDEgc2Vjb25kIG9mIGRlYm91bmNlZCBjYWxscy5cbiAqIHZhciBkZWJvdW5jZWQgPSBfLmRlYm91bmNlKGJhdGNoTG9nLCAyNTAsIHsgJ21heFdhaXQnOiAxMDAwIH0pO1xuICogdmFyIHNvdXJjZSA9IG5ldyBFdmVudFNvdXJjZSgnL3N0cmVhbScpO1xuICogalF1ZXJ5KHNvdXJjZSkub24oJ21lc3NhZ2UnLCBkZWJvdW5jZWQpO1xuICpcbiAqIC8vIENhbmNlbCB0aGUgdHJhaWxpbmcgZGVib3VuY2VkIGludm9jYXRpb24uXG4gKiBqUXVlcnkod2luZG93KS5vbigncG9wc3RhdGUnLCBkZWJvdW5jZWQuY2FuY2VsKTtcbiAqL1xuZnVuY3Rpb24gZGVib3VuY2UoZnVuYywgd2FpdCwgb3B0aW9ucykge1xuICB2YXIgbGFzdEFyZ3MsXG4gICAgICBsYXN0VGhpcyxcbiAgICAgIG1heFdhaXQsXG4gICAgICByZXN1bHQsXG4gICAgICB0aW1lcklkLFxuICAgICAgbGFzdENhbGxUaW1lLFxuICAgICAgbGFzdEludm9rZVRpbWUgPSAwLFxuICAgICAgbGVhZGluZyA9IGZhbHNlLFxuICAgICAgbWF4aW5nID0gZmFsc2UsXG4gICAgICB0cmFpbGluZyA9IHRydWU7XG5cbiAgaWYgKHR5cGVvZiBmdW5jICE9ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKEZVTkNfRVJST1JfVEVYVCk7XG4gIH1cbiAgd2FpdCA9IHRvTnVtYmVyKHdhaXQpIHx8IDA7XG4gIGlmIChpc09iamVjdChvcHRpb25zKSkge1xuICAgIGxlYWRpbmcgPSAhIW9wdGlvbnMubGVhZGluZztcbiAgICBtYXhpbmcgPSAnbWF4V2FpdCcgaW4gb3B0aW9ucztcbiAgICBtYXhXYWl0ID0gbWF4aW5nID8gbmF0aXZlTWF4KHRvTnVtYmVyKG9wdGlvbnMubWF4V2FpdCkgfHwgMCwgd2FpdCkgOiBtYXhXYWl0O1xuICAgIHRyYWlsaW5nID0gJ3RyYWlsaW5nJyBpbiBvcHRpb25zID8gISFvcHRpb25zLnRyYWlsaW5nIDogdHJhaWxpbmc7XG4gIH1cblxuICBmdW5jdGlvbiBpbnZva2VGdW5jKHRpbWUpIHtcbiAgICB2YXIgYXJncyA9IGxhc3RBcmdzLFxuICAgICAgICB0aGlzQXJnID0gbGFzdFRoaXM7XG5cbiAgICBsYXN0QXJncyA9IGxhc3RUaGlzID0gdW5kZWZpbmVkO1xuICAgIGxhc3RJbnZva2VUaW1lID0gdGltZTtcbiAgICByZXN1bHQgPSBmdW5jLmFwcGx5KHRoaXNBcmcsIGFyZ3MpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBmdW5jdGlvbiBsZWFkaW5nRWRnZSh0aW1lKSB7XG4gICAgLy8gUmVzZXQgYW55IGBtYXhXYWl0YCB0aW1lci5cbiAgICBsYXN0SW52b2tlVGltZSA9IHRpbWU7XG4gICAgLy8gU3RhcnQgdGhlIHRpbWVyIGZvciB0aGUgdHJhaWxpbmcgZWRnZS5cbiAgICB0aW1lcklkID0gc2V0VGltZW91dCh0aW1lckV4cGlyZWQsIHdhaXQpO1xuICAgIC8vIEludm9rZSB0aGUgbGVhZGluZyBlZGdlLlxuICAgIHJldHVybiBsZWFkaW5nID8gaW52b2tlRnVuYyh0aW1lKSA6IHJlc3VsdDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbWFpbmluZ1dhaXQodGltZSkge1xuICAgIHZhciB0aW1lU2luY2VMYXN0Q2FsbCA9IHRpbWUgLSBsYXN0Q2FsbFRpbWUsXG4gICAgICAgIHRpbWVTaW5jZUxhc3RJbnZva2UgPSB0aW1lIC0gbGFzdEludm9rZVRpbWUsXG4gICAgICAgIHJlc3VsdCA9IHdhaXQgLSB0aW1lU2luY2VMYXN0Q2FsbDtcblxuICAgIHJldHVybiBtYXhpbmcgPyBuYXRpdmVNaW4ocmVzdWx0LCBtYXhXYWl0IC0gdGltZVNpbmNlTGFzdEludm9rZSkgOiByZXN1bHQ7XG4gIH1cblxuICBmdW5jdGlvbiBzaG91bGRJbnZva2UodGltZSkge1xuICAgIHZhciB0aW1lU2luY2VMYXN0Q2FsbCA9IHRpbWUgLSBsYXN0Q2FsbFRpbWUsXG4gICAgICAgIHRpbWVTaW5jZUxhc3RJbnZva2UgPSB0aW1lIC0gbGFzdEludm9rZVRpbWU7XG5cbiAgICAvLyBFaXRoZXIgdGhpcyBpcyB0aGUgZmlyc3QgY2FsbCwgYWN0aXZpdHkgaGFzIHN0b3BwZWQgYW5kIHdlJ3JlIGF0IHRoZVxuICAgIC8vIHRyYWlsaW5nIGVkZ2UsIHRoZSBzeXN0ZW0gdGltZSBoYXMgZ29uZSBiYWNrd2FyZHMgYW5kIHdlJ3JlIHRyZWF0aW5nXG4gICAgLy8gaXQgYXMgdGhlIHRyYWlsaW5nIGVkZ2UsIG9yIHdlJ3ZlIGhpdCB0aGUgYG1heFdhaXRgIGxpbWl0LlxuICAgIHJldHVybiAobGFzdENhbGxUaW1lID09PSB1bmRlZmluZWQgfHwgKHRpbWVTaW5jZUxhc3RDYWxsID49IHdhaXQpIHx8XG4gICAgICAodGltZVNpbmNlTGFzdENhbGwgPCAwKSB8fCAobWF4aW5nICYmIHRpbWVTaW5jZUxhc3RJbnZva2UgPj0gbWF4V2FpdCkpO1xuICB9XG5cbiAgZnVuY3Rpb24gdGltZXJFeHBpcmVkKCkge1xuICAgIHZhciB0aW1lID0gbm93KCk7XG4gICAgaWYgKHNob3VsZEludm9rZSh0aW1lKSkge1xuICAgICAgcmV0dXJuIHRyYWlsaW5nRWRnZSh0aW1lKTtcbiAgICB9XG4gICAgLy8gUmVzdGFydCB0aGUgdGltZXIuXG4gICAgdGltZXJJZCA9IHNldFRpbWVvdXQodGltZXJFeHBpcmVkLCByZW1haW5pbmdXYWl0KHRpbWUpKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHRyYWlsaW5nRWRnZSh0aW1lKSB7XG4gICAgdGltZXJJZCA9IHVuZGVmaW5lZDtcblxuICAgIC8vIE9ubHkgaW52b2tlIGlmIHdlIGhhdmUgYGxhc3RBcmdzYCB3aGljaCBtZWFucyBgZnVuY2AgaGFzIGJlZW5cbiAgICAvLyBkZWJvdW5jZWQgYXQgbGVhc3Qgb25jZS5cbiAgICBpZiAodHJhaWxpbmcgJiYgbGFzdEFyZ3MpIHtcbiAgICAgIHJldHVybiBpbnZva2VGdW5jKHRpbWUpO1xuICAgIH1cbiAgICBsYXN0QXJncyA9IGxhc3RUaGlzID0gdW5kZWZpbmVkO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBmdW5jdGlvbiBjYW5jZWwoKSB7XG4gICAgaWYgKHRpbWVySWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgY2xlYXJUaW1lb3V0KHRpbWVySWQpO1xuICAgIH1cbiAgICBsYXN0SW52b2tlVGltZSA9IDA7XG4gICAgbGFzdEFyZ3MgPSBsYXN0Q2FsbFRpbWUgPSBsYXN0VGhpcyA9IHRpbWVySWQgPSB1bmRlZmluZWQ7XG4gIH1cblxuICBmdW5jdGlvbiBmbHVzaCgpIHtcbiAgICByZXR1cm4gdGltZXJJZCA9PT0gdW5kZWZpbmVkID8gcmVzdWx0IDogdHJhaWxpbmdFZGdlKG5vdygpKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRlYm91bmNlZCgpIHtcbiAgICB2YXIgdGltZSA9IG5vdygpLFxuICAgICAgICBpc0ludm9raW5nID0gc2hvdWxkSW52b2tlKHRpbWUpO1xuXG4gICAgbGFzdEFyZ3MgPSBhcmd1bWVudHM7XG4gICAgbGFzdFRoaXMgPSB0aGlzO1xuICAgIGxhc3RDYWxsVGltZSA9IHRpbWU7XG5cbiAgICBpZiAoaXNJbnZva2luZykge1xuICAgICAgaWYgKHRpbWVySWQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gbGVhZGluZ0VkZ2UobGFzdENhbGxUaW1lKTtcbiAgICAgIH1cbiAgICAgIGlmIChtYXhpbmcpIHtcbiAgICAgICAgLy8gSGFuZGxlIGludm9jYXRpb25zIGluIGEgdGlnaHQgbG9vcC5cbiAgICAgICAgdGltZXJJZCA9IHNldFRpbWVvdXQodGltZXJFeHBpcmVkLCB3YWl0KTtcbiAgICAgICAgcmV0dXJuIGludm9rZUZ1bmMobGFzdENhbGxUaW1lKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHRpbWVySWQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGltZXJJZCA9IHNldFRpbWVvdXQodGltZXJFeHBpcmVkLCB3YWl0KTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuICBkZWJvdW5jZWQuY2FuY2VsID0gY2FuY2VsO1xuICBkZWJvdW5jZWQuZmx1c2ggPSBmbHVzaDtcbiAgcmV0dXJuIGRlYm91bmNlZDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkZWJvdW5jZTtcbiIsIi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgdGhlXG4gKiBbbGFuZ3VhZ2UgdHlwZV0oaHR0cDovL3d3dy5lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLWVjbWFzY3JpcHQtbGFuZ3VhZ2UtdHlwZXMpXG4gKiBvZiBgT2JqZWN0YC4gKGUuZy4gYXJyYXlzLCBmdW5jdGlvbnMsIG9iamVjdHMsIHJlZ2V4ZXMsIGBuZXcgTnVtYmVyKDApYCwgYW5kIGBuZXcgU3RyaW5nKCcnKWApXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gb2JqZWN0LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3Qoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KF8ubm9vcCk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChudWxsKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbHVlKSB7XG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbHVlO1xuICByZXR1cm4gdmFsdWUgIT0gbnVsbCAmJiAodHlwZSA9PSAnb2JqZWN0JyB8fCB0eXBlID09ICdmdW5jdGlvbicpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzT2JqZWN0O1xuIiwiLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZS4gQSB2YWx1ZSBpcyBvYmplY3QtbGlrZSBpZiBpdCdzIG5vdCBgbnVsbGBcbiAqIGFuZCBoYXMgYSBgdHlwZW9mYCByZXN1bHQgb2YgXCJvYmplY3RcIi5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZSh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShudWxsKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0TGlrZSh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgIT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT0gJ29iamVjdCc7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNPYmplY3RMaWtlO1xuIiwidmFyIGlzT2JqZWN0TGlrZSA9IHJlcXVpcmUoJy4vaXNPYmplY3RMaWtlJyk7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBzeW1ib2xUYWcgPSAnW29iamVjdCBTeW1ib2xdJztcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlXG4gKiBbYHRvU3RyaW5nVGFnYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIG9mIHZhbHVlcy5cbiAqL1xudmFyIG9iamVjdFRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhIGBTeW1ib2xgIHByaW1pdGl2ZSBvciBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBzeW1ib2wsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc1N5bWJvbChTeW1ib2wuaXRlcmF0b3IpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNTeW1ib2woJ2FiYycpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNTeW1ib2wodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnc3ltYm9sJyB8fFxuICAgIChpc09iamVjdExpa2UodmFsdWUpICYmIG9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpID09IHN5bWJvbFRhZyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNTeW1ib2w7XG4iLCJ2YXIgcm9vdCA9IHJlcXVpcmUoJy4vX3Jvb3QnKTtcblxuLyoqXG4gKiBHZXRzIHRoZSB0aW1lc3RhbXAgb2YgdGhlIG51bWJlciBvZiBtaWxsaXNlY29uZHMgdGhhdCBoYXZlIGVsYXBzZWQgc2luY2VcbiAqIHRoZSBVbml4IGVwb2NoICgxIEphbnVhcnkgMTk3MCAwMDowMDowMCBVVEMpLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMi40LjBcbiAqIEBjYXRlZ29yeSBEYXRlXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSB0aW1lc3RhbXAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uZGVmZXIoZnVuY3Rpb24oc3RhbXApIHtcbiAqICAgY29uc29sZS5sb2coXy5ub3coKSAtIHN0YW1wKTtcbiAqIH0sIF8ubm93KCkpO1xuICogLy8gPT4gTG9ncyB0aGUgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyBpdCB0b29rIGZvciB0aGUgZGVmZXJyZWQgaW52b2NhdGlvbi5cbiAqL1xudmFyIG5vdyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gcm9vdC5EYXRlLm5vdygpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBub3c7XG4iLCJ2YXIgZGVib3VuY2UgPSByZXF1aXJlKCcuL2RlYm91bmNlJyksXG4gICAgaXNPYmplY3QgPSByZXF1aXJlKCcuL2lzT2JqZWN0Jyk7XG5cbi8qKiBFcnJvciBtZXNzYWdlIGNvbnN0YW50cy4gKi9cbnZhciBGVU5DX0VSUk9SX1RFWFQgPSAnRXhwZWN0ZWQgYSBmdW5jdGlvbic7XG5cbi8qKlxuICogQ3JlYXRlcyBhIHRocm90dGxlZCBmdW5jdGlvbiB0aGF0IG9ubHkgaW52b2tlcyBgZnVuY2AgYXQgbW9zdCBvbmNlIHBlclxuICogZXZlcnkgYHdhaXRgIG1pbGxpc2Vjb25kcy4gVGhlIHRocm90dGxlZCBmdW5jdGlvbiBjb21lcyB3aXRoIGEgYGNhbmNlbGBcbiAqIG1ldGhvZCB0byBjYW5jZWwgZGVsYXllZCBgZnVuY2AgaW52b2NhdGlvbnMgYW5kIGEgYGZsdXNoYCBtZXRob2QgdG9cbiAqIGltbWVkaWF0ZWx5IGludm9rZSB0aGVtLiBQcm92aWRlIGBvcHRpb25zYCB0byBpbmRpY2F0ZSB3aGV0aGVyIGBmdW5jYFxuICogc2hvdWxkIGJlIGludm9rZWQgb24gdGhlIGxlYWRpbmcgYW5kL29yIHRyYWlsaW5nIGVkZ2Ugb2YgdGhlIGB3YWl0YFxuICogdGltZW91dC4gVGhlIGBmdW5jYCBpcyBpbnZva2VkIHdpdGggdGhlIGxhc3QgYXJndW1lbnRzIHByb3ZpZGVkIHRvIHRoZVxuICogdGhyb3R0bGVkIGZ1bmN0aW9uLiBTdWJzZXF1ZW50IGNhbGxzIHRvIHRoZSB0aHJvdHRsZWQgZnVuY3Rpb24gcmV0dXJuIHRoZVxuICogcmVzdWx0IG9mIHRoZSBsYXN0IGBmdW5jYCBpbnZvY2F0aW9uLlxuICpcbiAqICoqTm90ZToqKiBJZiBgbGVhZGluZ2AgYW5kIGB0cmFpbGluZ2Agb3B0aW9ucyBhcmUgYHRydWVgLCBgZnVuY2AgaXNcbiAqIGludm9rZWQgb24gdGhlIHRyYWlsaW5nIGVkZ2Ugb2YgdGhlIHRpbWVvdXQgb25seSBpZiB0aGUgdGhyb3R0bGVkIGZ1bmN0aW9uXG4gKiBpcyBpbnZva2VkIG1vcmUgdGhhbiBvbmNlIGR1cmluZyB0aGUgYHdhaXRgIHRpbWVvdXQuXG4gKlxuICogSWYgYHdhaXRgIGlzIGAwYCBhbmQgYGxlYWRpbmdgIGlzIGBmYWxzZWAsIGBmdW5jYCBpbnZvY2F0aW9uIGlzIGRlZmVycmVkXG4gKiB1bnRpbCB0byB0aGUgbmV4dCB0aWNrLCBzaW1pbGFyIHRvIGBzZXRUaW1lb3V0YCB3aXRoIGEgdGltZW91dCBvZiBgMGAuXG4gKlxuICogU2VlIFtEYXZpZCBDb3JiYWNobydzIGFydGljbGVdKGh0dHBzOi8vY3NzLXRyaWNrcy5jb20vZGVib3VuY2luZy10aHJvdHRsaW5nLWV4cGxhaW5lZC1leGFtcGxlcy8pXG4gKiBmb3IgZGV0YWlscyBvdmVyIHRoZSBkaWZmZXJlbmNlcyBiZXR3ZWVuIGBfLnRocm90dGxlYCBhbmQgYF8uZGVib3VuY2VgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gdGhyb3R0bGUuXG4gKiBAcGFyYW0ge251bWJlcn0gW3dhaXQ9MF0gVGhlIG51bWJlciBvZiBtaWxsaXNlY29uZHMgdG8gdGhyb3R0bGUgaW52b2NhdGlvbnMgdG8uXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnM9e31dIFRoZSBvcHRpb25zIG9iamVjdC5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMubGVhZGluZz10cnVlXVxuICogIFNwZWNpZnkgaW52b2tpbmcgb24gdGhlIGxlYWRpbmcgZWRnZSBvZiB0aGUgdGltZW91dC5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMudHJhaWxpbmc9dHJ1ZV1cbiAqICBTcGVjaWZ5IGludm9raW5nIG9uIHRoZSB0cmFpbGluZyBlZGdlIG9mIHRoZSB0aW1lb3V0LlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgdGhyb3R0bGVkIGZ1bmN0aW9uLlxuICogQGV4YW1wbGVcbiAqXG4gKiAvLyBBdm9pZCBleGNlc3NpdmVseSB1cGRhdGluZyB0aGUgcG9zaXRpb24gd2hpbGUgc2Nyb2xsaW5nLlxuICogalF1ZXJ5KHdpbmRvdykub24oJ3Njcm9sbCcsIF8udGhyb3R0bGUodXBkYXRlUG9zaXRpb24sIDEwMCkpO1xuICpcbiAqIC8vIEludm9rZSBgcmVuZXdUb2tlbmAgd2hlbiB0aGUgY2xpY2sgZXZlbnQgaXMgZmlyZWQsIGJ1dCBub3QgbW9yZSB0aGFuIG9uY2UgZXZlcnkgNSBtaW51dGVzLlxuICogdmFyIHRocm90dGxlZCA9IF8udGhyb3R0bGUocmVuZXdUb2tlbiwgMzAwMDAwLCB7ICd0cmFpbGluZyc6IGZhbHNlIH0pO1xuICogalF1ZXJ5KGVsZW1lbnQpLm9uKCdjbGljaycsIHRocm90dGxlZCk7XG4gKlxuICogLy8gQ2FuY2VsIHRoZSB0cmFpbGluZyB0aHJvdHRsZWQgaW52b2NhdGlvbi5cbiAqIGpRdWVyeSh3aW5kb3cpLm9uKCdwb3BzdGF0ZScsIHRocm90dGxlZC5jYW5jZWwpO1xuICovXG5mdW5jdGlvbiB0aHJvdHRsZShmdW5jLCB3YWl0LCBvcHRpb25zKSB7XG4gIHZhciBsZWFkaW5nID0gdHJ1ZSxcbiAgICAgIHRyYWlsaW5nID0gdHJ1ZTtcblxuICBpZiAodHlwZW9mIGZ1bmMgIT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoRlVOQ19FUlJPUl9URVhUKTtcbiAgfVxuICBpZiAoaXNPYmplY3Qob3B0aW9ucykpIHtcbiAgICBsZWFkaW5nID0gJ2xlYWRpbmcnIGluIG9wdGlvbnMgPyAhIW9wdGlvbnMubGVhZGluZyA6IGxlYWRpbmc7XG4gICAgdHJhaWxpbmcgPSAndHJhaWxpbmcnIGluIG9wdGlvbnMgPyAhIW9wdGlvbnMudHJhaWxpbmcgOiB0cmFpbGluZztcbiAgfVxuICByZXR1cm4gZGVib3VuY2UoZnVuYywgd2FpdCwge1xuICAgICdsZWFkaW5nJzogbGVhZGluZyxcbiAgICAnbWF4V2FpdCc6IHdhaXQsXG4gICAgJ3RyYWlsaW5nJzogdHJhaWxpbmdcbiAgfSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdGhyb3R0bGU7XG4iLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL2lzT2JqZWN0JyksXG4gICAgaXNTeW1ib2wgPSByZXF1aXJlKCcuL2lzU3ltYm9sJyk7XG5cbi8qKiBVc2VkIGFzIHJlZmVyZW5jZXMgZm9yIHZhcmlvdXMgYE51bWJlcmAgY29uc3RhbnRzLiAqL1xudmFyIE5BTiA9IDAgLyAwO1xuXG4vKiogVXNlZCB0byBtYXRjaCBsZWFkaW5nIGFuZCB0cmFpbGluZyB3aGl0ZXNwYWNlLiAqL1xudmFyIHJlVHJpbSA9IC9eXFxzK3xcXHMrJC9nO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgYmFkIHNpZ25lZCBoZXhhZGVjaW1hbCBzdHJpbmcgdmFsdWVzLiAqL1xudmFyIHJlSXNCYWRIZXggPSAvXlstK10weFswLTlhLWZdKyQvaTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IGJpbmFyeSBzdHJpbmcgdmFsdWVzLiAqL1xudmFyIHJlSXNCaW5hcnkgPSAvXjBiWzAxXSskL2k7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBvY3RhbCBzdHJpbmcgdmFsdWVzLiAqL1xudmFyIHJlSXNPY3RhbCA9IC9eMG9bMC03XSskL2k7XG5cbi8qKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyB3aXRob3V0IGEgZGVwZW5kZW5jeSBvbiBgcm9vdGAuICovXG52YXIgZnJlZVBhcnNlSW50ID0gcGFyc2VJbnQ7XG5cbi8qKlxuICogQ29udmVydHMgYHZhbHVlYCB0byBhIG51bWJlci5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcHJvY2Vzcy5cbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIG51bWJlci5cbiAqIEBleGFtcGxlXG4gKlxuICogXy50b051bWJlcigzLjIpO1xuICogLy8gPT4gMy4yXG4gKlxuICogXy50b051bWJlcihOdW1iZXIuTUlOX1ZBTFVFKTtcbiAqIC8vID0+IDVlLTMyNFxuICpcbiAqIF8udG9OdW1iZXIoSW5maW5pdHkpO1xuICogLy8gPT4gSW5maW5pdHlcbiAqXG4gKiBfLnRvTnVtYmVyKCczLjInKTtcbiAqIC8vID0+IDMuMlxuICovXG5mdW5jdGlvbiB0b051bWJlcih2YWx1ZSkge1xuICBpZiAodHlwZW9mIHZhbHVlID09ICdudW1iZXInKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG4gIGlmIChpc1N5bWJvbCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gTkFOO1xuICB9XG4gIGlmIChpc09iamVjdCh2YWx1ZSkpIHtcbiAgICB2YXIgb3RoZXIgPSB0eXBlb2YgdmFsdWUudmFsdWVPZiA9PSAnZnVuY3Rpb24nID8gdmFsdWUudmFsdWVPZigpIDogdmFsdWU7XG4gICAgdmFsdWUgPSBpc09iamVjdChvdGhlcikgPyAob3RoZXIgKyAnJykgOiBvdGhlcjtcbiAgfVxuICBpZiAodHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIHZhbHVlID09PSAwID8gdmFsdWUgOiArdmFsdWU7XG4gIH1cbiAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKHJlVHJpbSwgJycpO1xuICB2YXIgaXNCaW5hcnkgPSByZUlzQmluYXJ5LnRlc3QodmFsdWUpO1xuICByZXR1cm4gKGlzQmluYXJ5IHx8IHJlSXNPY3RhbC50ZXN0KHZhbHVlKSlcbiAgICA/IGZyZWVQYXJzZUludCh2YWx1ZS5zbGljZSgyKSwgaXNCaW5hcnkgPyAyIDogOClcbiAgICA6IChyZUlzQmFkSGV4LnRlc3QodmFsdWUpID8gTkFOIDogK3ZhbHVlKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB0b051bWJlcjtcbiIsIi8qIEFDVElPTlMgKi9cbi8qXG4gKiBBY3Rpb25zIGFyZSBkaXNwYXRjaCBpbiB0aGUgcHJvY2VzcyBvZiBmZXRjaGluZyBkYXRhIGZyb20gdGhlIHNlcnZlclxuICovXG5cbmV4cG9ydCBjb25zdCBuZXh0QWx0ID0gKHRhZywgbkFsdHMsIGluaXRpYWwpID0+ICh7IHR5cGU6ICduZXh0QWx0JywgdGFnLCBuQWx0cywgaW5pdGlhbCB9KVxuXG4vKiBSRURVQ0VSICovXG5cbmV4cG9ydCBkZWZhdWx0IChzdGF0ZSA9IHt9LCB7IHR5cGUsIHRhZywgaW5pdGlhbCwgbkFsdHMgfSkgPT4ge1xuICBzd2l0Y2ggKHR5cGUpIHtcbiAgICBjYXNlICduZXh0QWx0Jzoge1xuICAgICAgY29uc3QgeyBbdGFnXTogb2xkQWx0ID0gKGluaXRpYWwgfHwgMCkgfSA9IHN0YXRlXG4gICAgICBjb25zdCBuZXdBbHQgPSAob2xkQWx0ICsgMSkgJSBuQWx0c1xuICAgICAgcmV0dXJuIHsgLi4uc3RhdGUsIFt0YWddOiBuZXdBbHQgfVxuICAgIH1cbiAgICBkZWZhdWx0OiByZXR1cm4gc3RhdGVcbiAgfVxufVxuXG4vKiBTRUxFQ1RPUlMgKi9cblxuZXhwb3J0IGNvbnN0IGdldEFsdCA9ICh7IGFsdGVyIH0sIHsgdGFnLCBpbml0aWFsIH0pID0+IHtcbiAgY29uc3QgeyBbdGFnXTogYWx0ID0gaW5pdGlhbCB8fCAwIH0gPSBhbHRlclxuICByZXR1cm4geyBhbHQgfVxufVxuXG4vKiBIRUxQRVJTICovXG5cblxuIiwiLyogQUNUSU9OUyAqL1xuLypcbiAqIEFjdGlvbnMgYXJlIGRpc3BhdGNoIGluIHRoZSBwcm9jZXNzIG9mIGZldGNoaW5nIGRhdGEgZnJvbSB0aGUgc2VydmVyXG4gKi9cblxuLyogUkVEVUNFUiAqL1xuXG5leHBvcnQgZGVmYXVsdCAoc3RhdGUgPSB7fSwgeyB0eXBlLCBwYXRoLCBkYXRhIH0pID0+IHtcbiAgc3dpdGNoICh0eXBlKSB7XG4gICAgY2FzZSAnZmV0Y2hEb2MnOiB7XG4gICAgICBpZiAoZGF0YSA9PSBudWxsKSB7cmV0dXJuIHsgLi4uc3RhdGUsIFtwYXRoXTogbnVsbCB9fVxuICAgICAgcmV0dXJuIHsgLi4uc3RhdGUsIFtwYXRoXTogZGF0YSB9XG4gICAgfVxuICAgIGRlZmF1bHQ6IHJldHVybiBzdGF0ZVxuICB9XG59XG5cbi8qIFNFTEVDVE9SUyAqL1xuXG5leHBvcnQgY29uc3QgZ2V0RG9jID0gKHsgZG9jIH0sIHsgZG9jRGlyLCBkb2NOYW1lLCBkb2NFeHQgfSkgPT4ge1xuICByZXR1cm4geyBkYXRhOiBkb2NbYCR7ZG9jRGlyfS8ke2RvY05hbWV9LiR7ZG9jRXh0fWBdIH1cbn1cblxuLyogSEVMUEVSUyAqL1xuXG4iLCJpbXBvcnQgbWVtb0JpbmQgZnJvbSAnbWVtb0JpbmQuanMnXG5cbi8qIEFDVElPTlMgKi9cblxuZXhwb3J0IGNvbnN0IGNoYW5nZUZ1bGx0ZXh0ID0gKGZpbHRlcklkLCBzZWFyY2hTdHJpbmcpID0+ICh7IHR5cGU6ICdmdWxsdGV4dCcsIGZpbHRlcklkLCBkYXRhOiBzZWFyY2hTdHJpbmcgfSlcbmV4cG9ydCBjb25zdCBjaGFuZ2VGYWNldCA9IChmaWx0ZXJJZCwgdmFsdWVJZCwgb25PZmYpID0+ICh7IHR5cGU6ICdmYWNldCcsIGZpbHRlcklkLCBkYXRhOiBbdmFsdWVJZCwgb25PZmZdIH0pXG5leHBvcnQgY29uc3QgY2hhbmdlRmFjZXRBbGwgPSAoZmlsdGVySWQsIG9uT2ZmKSA9PiAoeyB0eXBlOiAnZmFjZXRBbGwnLCBmaWx0ZXJJZCwgZGF0YTogb25PZmYgfSlcblxuZXhwb3J0IGNvbnN0IHNldHVwRmlsdGVyaW5nID0gKHRhYmxlLCB0YWJsZXMpID0+IGRpc3BhdGNoID0+IHtcbiAgY29uc3QgZmllbGRWYWx1ZXMgPSBtZW1vQmluZChmQ0MsICdjb21waWxlRmlsdGVyaW5nJywgW3RhYmxlXSwgW3RhYmxlc10pXG4gIGNvbnN0IGZpbHRlclNldHRpbmdzID0gbWVtb0JpbmQoZkNDLCAnaW5pdEZpbHRlcmluZycsIFt0YWJsZV0sIFt0YWJsZXMsIGZpZWxkVmFsdWVzXSlcbiAgZGlzcGF0Y2goeyB0eXBlOiAnc2V0dXBGaWx0ZXJpbmcnLCBmaWx0ZXJTZXR0aW5ncyB9KVxufVxuXG4vKiBSRURVQ0VSICovXG5cbmV4cG9ydCBkZWZhdWx0IChzdGF0ZT17XG4gIGZpbHRlclNldHRpbmdzOiB7fSxcbiAgaW5pdGlhbGl6ZWQ6IGZhbHNlLFxufSwgeyB0eXBlLCBmaWx0ZXJJZCwgZGF0YSwgLi4ucmVzdCB9KSA9PiB7XG4gIHN3aXRjaCAodHlwZSkge1xuICAgIGNhc2UgJ3NldHVwRmlsdGVyaW5nJzoge1xuICAgICAgcmV0dXJuIHsgLi4uc3RhdGUsIC4uLnJlc3QsIGluaXRpYWxpemVkOiB0cnVlIH1cbiAgICB9XG4gICAgY2FzZSAnZnVsbHRleHQnOiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgZmlsdGVyU2V0dGluZ3M6IHtcbiAgICAgICAgICAuLi5zdGF0ZS5maWx0ZXJTZXR0aW5ncyxcbiAgICAgICAgICBbZmlsdGVySWRdOiBkYXRhLFxuICAgICAgICB9LFxuICAgICAgfVxuICAgIH1cbiAgICBjYXNlICdmYWNldEFsbCc6IHtcbiAgICAgIGNvbnN0IHNhbWVTZXR0aW5ncyA9IHt9XG4gICAgICBPYmplY3Qua2V5cyhzdGF0ZS5maWx0ZXJTZXR0aW5nc1tmaWx0ZXJJZF0pLmZvckVhY2godmFsdWVJZCA9PiB7c2FtZVNldHRpbmdzW3ZhbHVlSWRdID0gZGF0YX0pXG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgZmlsdGVyU2V0dGluZ3M6IHtcbiAgICAgICAgICAuLi5zdGF0ZS5maWx0ZXJTZXR0aW5ncyxcbiAgICAgICAgICBbZmlsdGVySWRdOiBzYW1lU2V0dGluZ3MsXG4gICAgICAgIH0sXG4gICAgICB9XG4gICAgfVxuICAgIGNhc2UgJ2ZhY2V0Jzoge1xuICAgICAgY29uc3QgW3ZhbHVlSWQsIGZpbHRlclNldHRpbmddID0gZGF0YVxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIGZpbHRlclNldHRpbmdzOiB7XG4gICAgICAgICAgLi4uc3RhdGUuZmlsdGVyU2V0dGluZ3MsXG4gICAgICAgICAgW2ZpbHRlcklkXToge1xuICAgICAgICAgICAgLi4uc3RhdGUuZmlsdGVyU2V0dGluZ3NbZmlsdGVySWRdLFxuICAgICAgICAgICAgW3ZhbHVlSWRdOiBmaWx0ZXJTZXR0aW5nLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9XG4gICAgfVxuICAgIGRlZmF1bHQ6IHJldHVybiBzdGF0ZVxuICB9XG59XG5cbi8qIFNFTEVDVE9SUyAqL1xuXG5leHBvcnQgY29uc3QgZ2V0RmlsdGVyU2V0dGluZyA9ICh7IGZpbHRlcjogeyBmaWx0ZXJTZXR0aW5ncyB9IH0sIHsgZmlsdGVySWQgfSkgPT4gKHtcbiAgZmlsdGVyU2V0dGluZzogZmlsdGVyU2V0dGluZ3NbZmlsdGVySWRdLFxufSlcblxuZXhwb3J0IGNvbnN0IGdldEZpZWxkVmFsdWVzID0gKHsgdGFibGVzIH0sIHsgdGFibGUsIGZpbHRlckZpZWxkIH0pID0+ICh7XG4gIGZpZWxkVmFsdWVzOiBtZW1vQmluZChmQ0MsICdjb21waWxlRmlsdGVyaW5nJywgW3RhYmxlXSwgW3RhYmxlc10pW2ZpbHRlckZpZWxkXVxufSlcblxuZXhwb3J0IGNvbnN0IGdldEZpbHRlckFwcGxpZWQgPSAoeyB0YWJsZXMsIGZpbHRlcjogeyBmaWx0ZXJTZXR0aW5ncywgaW5pdGlhbGl6ZWQgfSB9LCB7IHRhYmxlIH0pID0+IHtcbiAgY29uc3QgZmllbGRWYWx1ZXMgPSBtZW1vQmluZChmQ0MsICdjb21waWxlRmlsdGVyaW5nJywgW3RhYmxlXSwgW3RhYmxlc10pXG4gIGlmIChpbml0aWFsaXplZCkge1xuICAgIHJldHVybiB7XG4gICAgICB0YWJsZXMsXG4gICAgICBpbml0aWFsaXplZCxcbiAgICAgIGZpZWxkVmFsdWVzLFxuICAgICAgZmlsdGVyU2V0dGluZ3MsXG4gICAgICAuLi5jb21wdXRlRmlsdGVyaW5nKHRhYmxlLCB0YWJsZXMsIGZpZWxkVmFsdWVzLCBmaWx0ZXJTZXR0aW5ncyksXG4gICAgfVxuICB9XG4gIGVsc2Uge1xuICAgIHJldHVybiB7XG4gICAgICB0YWJsZXMsXG4gICAgICBpbml0aWFsaXplZCxcbiAgICAgIGZpZWxkVmFsdWVzLFxuICAgIH1cbiAgfVxufVxuXG4vKiBIRUxQRVJTICovXG5cbmNsYXNzIEZpbHRlckNvbXBpbGVDYWNoZSB7XG4gIGNvbXBpbGVGaWx0ZXJpbmcgPSAodGFibGUsIHRhYmxlcykgPT4ge1xuICAgIGNvbnN0IHsgW3RhYmxlXTogeyBlbnRpdGllcywgb3JkZXIsIGZpZWxkcywgZmlsdGVyTGlzdCB9IH0gPSB0YWJsZXNcbiAgICBjb25zdCBwcmVzZW50RmlsdGVyTGlzdCA9IGZpbHRlckxpc3QuZmlsdGVyKHggPT4gZmllbGRzW3guZmllbGRdKVxuICAgIGNvbnN0IGZpbHRlckZpZWxkcyA9IHByZXNlbnRGaWx0ZXJMaXN0LmZpbHRlcih4ID0+IHgudHlwZSAhPT0gJ0Z1bGxUZXh0JykubWFwKHggPT4geC5maWVsZClcbiAgICBjb25zdCBmaWVsZFZhbHVlcyA9IHt9XG4gICAgZm9yIChjb25zdCBmIG9mIGZpbHRlckZpZWxkcykge1xuICAgICAgZmllbGRWYWx1ZXNbZl0gPSB7WycnXTogJy1ub25lLSd9XG4gICAgfVxuICAgIGZvciAoY29uc3QgZUlkIG9mIG9yZGVyKSB7XG4gICAgICBjb25zdCBlbnRpdHkgPSBlbnRpdGllc1tlSWRdXG4gICAgICBmb3IgKGNvbnN0IGZpZWxkIG9mIGZpbHRlckZpZWxkcykge1xuICAgICAgICBjb25zdCBmRmllbGRWYWx1ZXMgPSBmaWVsZFZhbHVlc1tmaWVsZF1cbiAgICAgICAgY29uc3QgeyB2YWx1ZXM6IHsgW2ZpZWxkXTogZWZWYWx1ZSB9IH0gPSBlbnRpdHlcbiAgICAgICAgaWYgKGVmVmFsdWUgIT0gbnVsbCAmJiBlZlZhbHVlLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICAgIGZvciAoY29uc3Qge19pZDogdmFsdWVJZCwgdmFsdWU6IHZhbHVlUmVwfSBvZiBlZlZhbHVlKSB7XG4gICAgICAgICAgICBmRmllbGRWYWx1ZXNbdmFsdWVJZF0gPSB2YWx1ZVJlcFxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmllbGRWYWx1ZXNcbiAgfVxuICBpbml0RmlsdGVyaW5nID0gKHRhYmxlLCB0YWJsZXMsIGZpZWxkVmFsdWVzKSA9PiB7XG4gICAgY29uc3QgeyBbdGFibGVdOiB7IGVudGl0aWVzLCBvcmRlciwgZmllbGRzLCBmaWx0ZXJMaXN0IH0gfSA9IHRhYmxlc1xuICAgIGNvbnN0IHByZXNlbnRGaWx0ZXJMaXN0ID0gZmlsdGVyTGlzdC5maWx0ZXIoeCA9PiBmaWVsZHNbeC5maWVsZF0pXG4gICAgY29uc3QgZmlsdGVyU2V0dGluZ3MgPSB7fVxuICAgIHByZXNlbnRGaWx0ZXJMaXN0LmZvckVhY2goKGZpbHRlclNwZWMsIGZpbHRlcklkKSA9PiB7XG4gICAgICBpZiAoZmlsdGVyU3BlYy50eXBlID09ICdGdWxsVGV4dCcpIHtcbiAgICAgICAgZmlsdGVyU2V0dGluZ3NbZmlsdGVySWRdID0gJydcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBjb25zdCBmYWNldHMgPSB7fVxuICAgICAgICBPYmplY3Qua2V5cyhmaWVsZFZhbHVlc1tmaWx0ZXJTcGVjLmZpZWxkXSkuZm9yRWFjaCh2YWx1ZUlkID0+IHtmYWNldHNbdmFsdWVJZF0gPSB0cnVlfSlcbiAgICAgICAgZmlsdGVyU2V0dGluZ3NbZmlsdGVySWRdID0gZmFjZXRzXG4gICAgICB9XG4gICAgfSlcbiAgICByZXR1cm4gZmlsdGVyU2V0dGluZ3NcbiAgfVxufVxuY29uc3QgZkNDID0gbmV3IEZpbHRlckNvbXBpbGVDYWNoZSgpXG5cbmNvbnN0IGNvbXB1dGVGaWx0ZXJpbmcgPSAodGFibGUsIHRhYmxlcywgZmllbGRWYWx1ZXMsIGZpbHRlclNldHRpbmdzKSA9PiB7XG4gIGNvbnN0IHsgW3RhYmxlXTogeyBlbnRpdGllcywgb3JkZXIsIGZpZWxkcywgZmlsdGVyTGlzdCB9IH0gPSB0YWJsZXNcbiAgY29uc3QgcHJlc2VudEZpbHRlckxpc3QgPSBmaWx0ZXJMaXN0LmZpbHRlcih4ID0+IGZpZWxkc1t4LmZpZWxkXSlcbiAgY29uc3QgZmlsdGVyQ2hlY2tzID0ge31cbiAgY29uc3Qgb3RoZXJGaWx0ZXJlZERhdGEgPSB7fVxuICBwcmVzZW50RmlsdGVyTGlzdC5mb3JFYWNoKChmaWx0ZXJTcGVjLCBmaWx0ZXJJZCkgPT4ge1xuICAgIGZpbHRlckNoZWNrc1tmaWx0ZXJJZF0gPSAoZmlsdGVyU3BlYy50eXBlID09PSAnRnVsbFRleHQnID8gZnVsbHRleHRDaGVjayA6IGZhY2V0Q2hlY2spKGZpbHRlclNwZWMuZmllbGQsIGZpbHRlclNldHRpbmdzW2ZpbHRlcklkXSlcbiAgICBvdGhlckZpbHRlcmVkRGF0YVtmaWx0ZXJJZF0gPSBbXVxuICB9KVxuICBjb25zdCBmaWx0ZXJlZERhdGEgPSBbXVxuXG4gIGZvciAoY29uc3QgZUlkIG9mIG9yZGVyKSB7XG4gICAgY29uc3QgZW50aXR5ID0gZW50aXRpZXNbZUlkXVxuICAgIGxldCB0aGVPbmVGYWlsID0gbnVsbFxuICAgIGxldCB2ID0gdHJ1ZVxuICAgIGxldCBkaXNjYXJkID0gZmFsc2VcbiAgICBPYmplY3QuZW50cmllcyhmaWx0ZXJDaGVja3MpLmZvckVhY2goKFtmaWx0ZXJJZCwgZmlsdGVyQ2hlY2tdKSA9PiB7XG4gICAgICBpZiAoIWRpc2NhcmQpIHtcbiAgICAgICAgY29uc3QgcGFzcyA9IGZpbHRlckNoZWNrKGVudGl0eSlcbiAgICAgICAgaWYgKCFwYXNzKSB7XG4gICAgICAgICAgdiA9IGZhbHNlXG4gICAgICAgICAgaWYgKHRoZU9uZUZhaWwgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHRoZU9uZUZhaWwgPSBmaWx0ZXJJZFxuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGRpc2NhcmQgPSB0cnVlXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSlcbiAgICBpZiAoIWRpc2NhcmQpIHtcbiAgICAgIGNvbnN0IHsgdmFsdWVzOiB7IF9pZCB9IH0gPSBlbnRpdHlcbiAgICAgIGlmICh2KSB7XG4gICAgICAgIGZpbHRlcmVkRGF0YS5wdXNoKF9pZClcbiAgICAgICAgcHJlc2VudEZpbHRlckxpc3QuZm9yRWFjaCgoZmlsdGVyU3BlYywgZmlsdGVySWQpID0+IHtcbiAgICAgICAgICBvdGhlckZpbHRlcmVkRGF0YVtmaWx0ZXJJZF0ucHVzaChfaWQpXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgb3RoZXJGaWx0ZXJlZERhdGFbdGhlT25lRmFpbF0ucHVzaChfaWQpXG4gICAgICB9XG4gICAgfVxuICB9XG4gIGNvbnN0IGFtb3VudHMgPSB7fVxuICBwcmVzZW50RmlsdGVyTGlzdC5mb3JFYWNoKCh7IGZpZWxkLCB0eXBlIH0sIGZpbHRlcklkKSA9PiB7XG4gICAgYW1vdW50c1tmaWx0ZXJJZF0gPSB0eXBlID09PSAnRnVsbFRleHQnID8gbnVsbCA6IGNvdW50RmFjZXRzKGZpZWxkLCBmaWVsZFZhbHVlc1tmaWVsZF0sIG90aGVyRmlsdGVyZWREYXRhW2ZpbHRlcklkXSwgZW50aXRpZXMpXG4gIH0pXG4gIGNvbnN0IGZpbHRlcmVkQW1vdW50T3RoZXJzID0ge31cbiAgT2JqZWN0LmVudHJpZXMob3RoZXJGaWx0ZXJlZERhdGEpLmZvckVhY2goKFtmaWx0ZXJJZCwgeF0pID0+IHtmaWx0ZXJlZEFtb3VudE90aGVyc1tmaWx0ZXJJZF0gPSB4Lmxlbmd0aH0pXG4gIHJldHVybiB7XG4gICAgZmlsdGVyZWREYXRhLFxuICAgIGZpbHRlcmVkQW1vdW50T3RoZXJzLFxuICAgIGFtb3VudHMsXG4gIH1cbn1cblxuY29uc3QgZnVsbHRleHRDaGVjayA9IChmaWVsZCwgdGVybSkgPT4ge1xuICBjb25zdCBzZWFyY2ggPSB0ZXJtLnRvTG93ZXJDYXNlKClcbiAgaWYgKHNlYXJjaCA9PSBudWxsIHx8IHNlYXJjaCA9PSAnJykge1xuICAgIHJldHVybiAoKSA9PiB0cnVlXG4gIH1cbiAgcmV0dXJuIGVudGl0eSA9PiB7XG4gICAgbGV0IHsgdmFsdWVzOiB7IFtmaWVsZF06IHZhbCB9IH0gPSBlbnRpdHlcbiAgICB2YWwgPSAodmFsICE9IG51bGwpID8gdmFsWzBdIDogdmFsXG4gICAgcmV0dXJuIHZhbCAhPSBudWxsICYmIHZhbC50b0xvd2VyQ2FzZSgpLmluZGV4T2Yoc2VhcmNoKSAhPT0gLTFcbiAgfVxufVxuXG5jb25zdCBmYWNldENoZWNrID0gKGZpZWxkLCBmYWNldFNldHRpbmdzKSA9PiB7XG4gIGlmIChmYWNldFNldHRpbmdzLnNpemUgPT09IDApIHtcbiAgICByZXR1cm4gKCkgPT4gZmFsc2VcbiAgfVxuICByZXR1cm4gZW50aXR5ID0+IHtcbiAgICBjb25zdCB7IHZhbHVlczogeyBbZmllbGRdOiBmaWVsZFZhbHMgfSB9ID0gZW50aXR5XG4gICAgaWYgKGZpZWxkVmFscyA9PSBudWxsIHx8IGZpZWxkVmFscy5sZW5ndGggPT0gMCkge1xuICAgICAgcmV0dXJuIGZhY2V0U2V0dGluZ3NbJyddXG4gICAgfVxuICAgIGZvciAoY29uc3Qge19pZDogdmFsdWVJZH0gb2YgZmllbGRWYWxzKSB7XG4gICAgICBpZiAoZmFjZXRTZXR0aW5nc1t2YWx1ZUlkXSkge1xuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2VcbiAgfVxufVxuXG5jb25zdCBjb3VudEZhY2V0cyA9IChmaWVsZCwgZmllbGRWYWx1ZXMsIGZpbHRlcmVkRGF0YSwgZW50aXRpZXMpID0+IHtcbiAgY29uc3QgZmFjZXRBbW91bnRzID0ge31cbiAgT2JqZWN0LmtleXMoZmllbGRWYWx1ZXMpLmZvckVhY2godmFsdWVJZCA9PiB7XG4gICAgZmFjZXRBbW91bnRzW3ZhbHVlSWRdID0gMFxuICB9KVxuICBmb3IgKGNvbnN0IGVJZCBvZiBmaWx0ZXJlZERhdGEpIHtcbiAgICBjb25zdCB7IHZhbHVlczogeyBbZmllbGRdOiBmaWVsZFZhbHMgfSB9ID0gZW50aXRpZXNbZUlkXVxuICAgIGlmIChmaWVsZFZhbHMgPT0gbnVsbCB8fCBmaWVsZFZhbHMubGVuZ3RoID09IDApIHtcbiAgICAgIGZhY2V0QW1vdW50c1snJ10gKz0gMVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGZvciAoY29uc3Qge19pZDogdmFsdWVJZH0gb2YgZmllbGRWYWxzKSB7XG4gICAgICAgIGZhY2V0QW1vdW50c1t2YWx1ZUlkXSArPSAxXG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBmYWNldEFtb3VudHNcbn1cblxuZXhwb3J0IGNvbnN0IHBsYWNlRmFjZXRzID0gKGZpZWxkVmFsdWVzLCBtYXhDb2xzKSA9PiB7XG4gIGlmIChmaWVsZFZhbHVlcyA9PSBudWxsKSB7cmV0dXJuIFtdfVxuICBjb25zdCBmYWNldHMgPSBPYmplY3QuZW50cmllcyhmaWVsZFZhbHVlcykuc29ydCgoeCwgeSkgPT4geFsxXS5sb2NhbGVDb21wYXJlKHlbMV0pKVxuICBpZiAoZmFjZXRzLmxlbmd0aCA9PSAwKSB7cmV0dXJuIFtdfVxuICBjb25zdCByb3dzID0gW11cbiAgY29uc3QgeyBsZW5ndGg6IGxmIH0gPSBmYWNldHNcbiAgY29uc3QgbnJvd3MgPSBNYXRoLmZsb29yKGxmIC8gbWF4Q29scykgKyAoKGxmICUgbWF4Q29scykgPyAxIDogMClcbiAgY29uc3QgbmNvbHMgPSBNYXRoLmZsb29yKGxmIC8gbnJvd3MpICsgKChsZiAlIG5yb3dzKSA/IDEgOiAwKVxuICBmb3IgKGxldCByID0gMDsgciA8IG5yb3dzOyByKyspIHtcbiAgICBjb25zdCByb3cgPSBbXVxuICAgIGZvciAobGV0IGMgPSAwOyBjIDwgbmNvbHM7IGMrKykge1xuICAgICAgY29uc3QgZiA9IG5yb3dzICogYyArIHJcbiAgICAgIHJvdy5wdXNoKChmIDwgbGYpID8gZmFjZXRzW2ZdIDogbnVsbClcbiAgICB9XG4gICAgcm93cy5wdXNoKHJvdylcbiAgfVxuICByZXR1cm4gcm93c1xufVxuXG5leHBvcnQgY29uc3QgdGVzdEFsbENoZWNrcyA9IGZpbHRlclNldHRpbmdzID0+IHtcbiAgbGV0IGFsbFRydWUgPSB0cnVlXG4gIGxldCBhbGxGYWxzZSA9IHRydWVcbiAgZm9yIChjb25zdCBbdmFsdWVJZCwgdmFsdWVSZXBdIG9mIE9iamVjdC5lbnRyaWVzKGZpbHRlclNldHRpbmdzKSkge1xuICAgIGlmICh2YWx1ZVJlcCkge2FsbEZhbHNlID0gZmFsc2V9XG4gICAgZWxzZSB7YWxsVHJ1ZSA9IGZhbHNlfVxuICB9XG4gIHJldHVybiB7IGFsbFRydWUsIGFsbEZhbHNlIH1cbn1cblxuIiwiLyogQUNUSU9OUyAqL1xuLypcbiAqIEFjdGlvbnMgYXJlIGRpc3BhdGNoIGluIHRoZSBwcm9jZXNzIG9mIGZldGNoaW5nIGRhdGEgZnJvbSB0aGUgc2VydmVyXG4gKi9cblxuLyogUkVEVUNFUiAqL1xuXG5leHBvcnQgZGVmYXVsdCAoc3RhdGUgPSB7fSwgeyB0eXBlLCBwYXRoLCBkYXRhIH0pID0+IHtcbiAgc3dpdGNoICh0eXBlKSB7XG4gICAgY2FzZSAnZmV0Y2hNZSc6IHtcbiAgICAgIGlmIChkYXRhID09IG51bGwpIHtyZXR1cm4ge319XG4gICAgICByZXR1cm4geyAuLi5kYXRhIH1cbiAgICB9XG4gICAgZGVmYXVsdDogcmV0dXJuIHN0YXRlXG4gIH1cbn1cblxuLyogU0VMRUNUT1JTICovXG5cbmV4cG9ydCBjb25zdCBnZXRNZSA9ICh7IG1lIH0pID0+ICh7IG1lIH0pXG5cbi8qIEhFTFBFUlMgKi9cblxuIiwiLyogQUNUSU9OUyAqL1xuXG5leHBvcnQgY29uc3QgYXNrID0gICAgIChkZXNjKSAgICAgICA9PiAoeyB0eXBlOiAnYXN5bmMnLCBzdGF0dXM6ICdwZW5kaW5nJywgZGVzYyB9KVxuZXhwb3J0IGNvbnN0IGVyciA9ICAgICAoZGVzYywgbXNncykgPT4gKHsgdHlwZTogJ2FzeW5jJywgc3RhdHVzOiAnZXJyb3InLCAgIGRlc2MsIG1zZ3MgfSlcbmV4cG9ydCBjb25zdCBzdWNjZWVkID0gKGRlc2MpICAgICAgID0+ICh7IHR5cGU6ICdhc3luYycsIHN0YXR1czogJ3N1Y2Nlc3MnLCBkZXNjIH0pXG5cbmV4cG9ydCBjb25zdCBub3RpZnkgPSAgKG1zZ3MpICAgICAgID0+ICh7IHR5cGU6ICdtc2dzJywgbXNncyB9KVxuZXhwb3J0IGNvbnN0IGNsZWFyICA9ICAoKSAgICAgICAgICAgPT4gKHsgdHlwZTogJ2NsZWFyJyB9KVxuZXhwb3J0IGNvbnN0IGRpc3BsYXkgPSAob25PZmYpICAgICAgPT4gKHsgdHlwZTogJ2Rpc3BsYXknLCBvbk9mZiB9KVxuXG4vKiBSRURVQ0VSICovXG5cbmV4cG9ydCBkZWZhdWx0IChzdGF0ZSA9IHsgaXRlbXM6IFtdLCBidXN5OiAwLCBzaG93OiBmYWxzZSB9LCB7IHR5cGUsIGRlc2MsIHN0YXR1cywgbXNncywgb25PZmYgfSkgPT4ge1xuICBzd2l0Y2ggKHR5cGUpIHtcbiAgICBjYXNlICdhc3luYyc6IHtcbiAgICAgIGNvbnN0IHsgaXRlbXMsIGJ1c3ksIG1zZ3MgfSA9IHN0YXRlXG4gICAgICBjb25zdCBleHRyYU1zZ3MgPSBtc2dzIHx8IFtdXG4gICAgICBzd2l0Y2ggKHN0YXR1cykge1xuICAgICAgICBjYXNlICdwZW5kaW5nJzoge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAuLi5zdGF0ZSwgaXRlbXM6IFtcbiAgICAgICAgICAgICAgLi4uaXRlbXMsXG4gICAgICAgICAgICAgIC4uLmV4dHJhTXNncyxcbiAgICAgICAgICAgICAgeyBraW5kOiAnc3BlY2lhbCcsIHRleHQ6IGB3YWl0aW5nIGZvciAke2Rlc2N9YCB9LFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIGJ1c3k6IGJ1c3kgKyAxLFxuICAgICAgICAgICAgc2hvdzogdHJ1ZSxcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSAnc3VjY2Vzcyc6IHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICAuLi5pdGVtcyxcbiAgICAgICAgICAgICAgLi4uZXh0cmFNc2dzLFxuICAgICAgICAgICAgICB7IGtpbmQ6ICdpbmZvJywgdGV4dDogYCR7ZGVzY30gb2tgIH0sXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgYnVzeTogYnVzeSAtIDEsXG4gICAgICAgICAgICBzaG93OiBmYWxzZSxcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIGNhc2UgJ2Vycm9yJzoge1xuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgIC4uLml0ZW1zLFxuICAgICAgICAgICAgICAuLi5leHRyYU1zZ3MsXG4gICAgICAgICAgICAgIHsga2luZDogJ2Vycm9yJywgdGV4dDogYCR7ZGVzY30gZmFpbGVkYCB9LFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIGJ1c3k6IGJ1c3kgLSAxLFxuICAgICAgICAgICAgc2hvdzogdHJ1ZSxcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZGVmYXVsdDogcmV0dXJuIHN0YXRlXG4gICAgICB9XG4gICAgfVxuICAgIGNhc2UgJ21zZ3MnOiB7XG4gICAgICBjb25zdCB7IGl0ZW1zIH0gPSBzdGF0ZVxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgLi4uaXRlbXMsXG4gICAgICAgICAgLi4ubXNncyxcbiAgICAgICAgXSxcbiAgICAgICAgc2hvdzogdHJ1ZSxcbiAgICAgIH1cbiAgICB9XG4gICAgY2FzZSAnY2xlYXInOiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgaXRlbXM6IFtdLFxuICAgICAgICBzaG93OiBmYWxzZVxuICAgICAgfVxuICAgIH1cbiAgICBjYXNlICdkaXNwbGF5Jzoge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIHNob3c6IG9uT2ZmLFxuICAgICAgfVxuICAgIH1cbiAgICBkZWZhdWx0OiByZXR1cm4gc3RhdGVcbiAgfVxufVxuXG4vKiBTRUxFQ1RPUlMgKi9cblxuZXhwb3J0IGNvbnN0IGdldE5vdGlmeSA9ICh7IG5vdGlmeSB9KSA9PiAoeyBub3RpZnkgfSlcblxuZXhwb3J0IGNvbnN0IGdldE5vdGlmaWNhdGlvbnMgPSAoeyBub3RpZnkgfSkgPT4ge1xuICBjb25zdCB7IGl0ZW1zLCBidXN5LCBzaG93IH0gPSBub3RpZnlcbiAgbGV0IGxhc3ROb3RlID0gLTFcbiAgbGV0IGxhc3RLaW5kID0gJydcbiAgaXRlbXMuZm9yRWFjaCgoaXRlbSwgaSkgPT4ge1xuICAgIGNvbnN0IHsga2luZCwgdGV4dCB9ID0gaXRlbVxuICAgIGlmIChraW5kID09ICdlcnJvcicpIHtcbiAgICAgIGxhc3ROb3RlID0gaVxuICAgICAgbGFzdEtpbmQgPSAnZXJyb3InXG4gICAgfVxuICAgIGVsc2UgaWYgKGtpbmQgPT0gJ3dhcm5pbmcnKSB7XG4gICAgICBpZiAobGFzdEtpbmQgIT0gJ2Vycm9yJykge1xuICAgICAgICBsYXN0Tm90ZSA9IGlcbiAgICAgICAgbGFzdEtpbmQgPSAnd2FybmluZydcbiAgICAgIH1cbiAgICB9XG4gIH0pXG4gIHJldHVybiB7IG5vdGlmaWNhdGlvbnM6IGl0ZW1zLCBidXN5LCBzaG93LCBsYXN0TXNnOiBpdGVtcy5sZW5ndGggLSAxLCBsYXN0Tm90ZSwgbGFzdEtpbmQgfVxufVxuXG4vKiBIRUxQRVJTICovXG5cbiIsImltcG9ydCB7IGNvbWJpbmVSZWR1Y2VycyB9IGZyb20gJ3JlZHV4J1xuaW1wb3J0IHdpbiBmcm9tICd3aW4uanMnXG5pbXBvcnQgbm90aWZ5IGZyb20gJ25vdGlmeS5qcydcbmltcG9ydCBkb2MgZnJvbSAnZG9jLmpzJ1xuaW1wb3J0IHRhYmxlcyBmcm9tICd0YWJsZXMuanMnXG5pbXBvcnQgbWUgZnJvbSAnbWUuanMnXG5pbXBvcnQgZmlsdGVyIGZyb20gJ2ZpbHRlci5qcydcbmltcG9ydCBhbHRlciBmcm9tICdhbHRlci5qcydcblxuLyogUk9PVCBSRURVQ0VSICovXG5cbmV4cG9ydCBkZWZhdWx0IGNvbWJpbmVSZWR1Y2Vycyh7XG4gIHdpbixcbiAgbm90aWZ5LFxuICBkb2MsXG4gIHRhYmxlcyxcbiAgbWUsXG4gIGZpbHRlcixcbiAgYWx0ZXIsXG59KVxuXG4vKiBTRUxFQ1RPUlMgKi9cbi8qXG4gKiBDb21iaW5lIHNldmVyYWwgc2VsZWN0b3JzXG4gKi9cblxuZXhwb3J0IGNvbnN0IGNvbWJpbmVTZWxlY3RvcnMgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIChzdGF0ZSwgcHJvcHMpID0+IHtcbiAgICBjb25zdCByZXN1bHQgPSB7fVxuICAgIGZvciAoY29uc3Qgc2VsZWN0b3Igb2YgYXJndW1lbnRzKSB7XG4gICAgICBPYmplY3QuYXNzaWduKHJlc3VsdCwgc2VsZWN0b3Ioc3RhdGUsIHByb3BzKSlcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdFxuICB9XG59XG4iLCJpbXBvcnQgJ3doYXR3Zy1mZXRjaCdcblxuaW1wb3J0IHsgYXNrLCBlcnIsIHN1Y2NlZWQgfSBmcm9tICdub3RpZnkuanMnXG5cbmNvbnN0IHJvb3RVcmwgPSAnL2FwaS8nXG5cbi8qIEFDVElPTlMgKi9cbi8qXG4gKiBHZW5lcmljIGFjdGlvbiB0byBmZXRjaCBkYXRhIGZyb20gdGhlIHNlcnZlci5cbiAqIFRoZSBxdWVyeSBpcyBjb25maWd1cmVkIGJ5IHRoZSB0YXNrIG9iamVjdC5cbiAqIEl0IGNhbiBiZSB1c2VkIGZvciBkYXRhYmFzZSBxdWVyaWVzIG9yIGZpbGUgY29udGVudC5cbiAqIER1cmluZyByZXF1ZXN0LCBub3RpZnkgYWN0aW9ucyB3aWxsIGJlIGRpc3BhdGNoZWQuXG4gKi9cblxuLyogUkVEVUNFUiAqL1xuLypcbiAqIG5vIGRlZGljYXRlZCByZWR1Y2VyLlxuICogUmVzdWx0cyBvZiBhY3Rpb25zIHdpbGwgYmUgcmVkdWNlZCBieSBkZWRpY2F0ZWQgcmVkdWNlcnMuXG4gKi9cblxuLyogU0VMRUNUT1JTICovXG4vKlxuICogbm8gZGVkaWNhdGVkIHNlbGVjdG9ycy5cbiAqIFNlZSB0aGUgc2VsZWN0b3JzIGNvcnJlc3BvbmRpbmcgdG8gdGhlIGRlZGljYXRlZCByZWR1Y2Vycy5cbiAqL1xuXG5leHBvcnQgY29uc3QgZmV0Y2hEYXRhID0gdGFzayA9PiBkaXNwYXRjaCA9PiB7XG4gIGNvbnN0IHsgdHlwZSwgcGF0aCwgY29udGVudFR5cGUsIGRlc2MgfSA9IHRhc2tcbiAgZGlzcGF0Y2goYXNrKGRlc2MpKVxuICBkaXNwYXRjaCh7IC4uLnRhc2ssIGRhdGE6IG51bGwgfSlcblxuICBjb25zdCBzZXR0aW5ncyA9IHtjcmVkZW50aWFsczogJ3NhbWUtb3JpZ2luJ31cbiAgZmV0Y2goYCR7cm9vdFVybH0ke2NvbnRlbnRUeXBlfSR7cGF0aH1gLCBzZXR0aW5ncylcbiAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxuICAudGhlbihqc29uID0+IHtcbiAgICBjb25zdCB7IG1zZ3MsIGdvb2QsIGRhdGEgfSA9IGpzb25cbiAgICBpZiAoZ29vZCkge1xuICAgICAgZGlzcGF0Y2goc3VjY2VlZChkZXNjKSlcbiAgICAgIGRpc3BhdGNoKHsgLi4udGFzaywgZGF0YSB9KVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGRpc3BhdGNoKGVycihkZXNjLCBtc2dzKSlcbiAgICB9XG4gIH0pXG4gIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICBjb25zb2xlLmVycihlcnJvcilcbiAgICAgIGRpc3BhdGNoKGVycihkZXNjLCBbe2tpbmQ6ICdlcnJvcicsIHRleHQ6IGVycm9yfV0pKVxuICB9KVxufVxuXG4vKiBIRUxQRVJTICovXG5cbiIsIi8qIEFDVElPTlMgKi9cbi8qXG4gKiBBY3Rpb25zIGFyZSBkaXNwYXRjaCBpbiB0aGUgcHJvY2VzcyBvZiBmZXRjaGluZyBkYXRhIGZyb20gdGhlIHNlcnZlclxuICovXG5cbi8qIFJFRFVDRVIgKi9cblxuZXhwb3J0IGRlZmF1bHQgKHN0YXRlPXt9LCB7IHR5cGUsIHBhdGgsIGRhdGEsIHRhYmxlIH0pID0+IHtcbiAgc3dpdGNoICh0eXBlKSB7XG4gICAgY2FzZSAnZmV0Y2hUYWJsZSc6IHtcbiAgICAgIGlmIChkYXRhID09IG51bGwpIHtyZXR1cm4geyAuLi5zdGF0ZSwgW3RhYmxlXTogbnVsbCB9fVxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIFt0YWJsZV06IGRhdGEsXG4gICAgICB9XG4gICAgfVxuICAgIGNhc2UgJ2ZldGNoVGFibGVNeSc6IHtcbiAgICAgIGlmIChkYXRhID09IG51bGwpIHtcbiAgICAgICAgaWYgKHN0YXRlW3RhYmxlXSA9PSBudWxsKSB7IHJldHVybiB7IC4uLnN0YXRlLCBbdGFibGVdOiBudWxsIH19XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgICAgW3RhYmxlXToge1xuICAgICAgICAgICAgLi4uc3RhdGVbdGFibGVdLFxuICAgICAgICAgICAgbXk6IG51bGwsXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBjb25zdCB7IGVudGl0aWVzLCBvcmRlciwgLi4ucmVzdCB9ID0gZGF0YVxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIFt0YWJsZV06IHtcbiAgICAgICAgICAuLi5zdGF0ZVt0YWJsZV0sXG4gICAgICAgICAgLi4ucmVzdCxcbiAgICAgICAgICBteTogb3JkZXIsXG4gICAgICAgICAgZW50aXRpZXM6IHtcbiAgICAgICAgICAgIC4uLihzdGF0ZVt0YWJsZV0gfHwge30pLmVudGl0aWVzLFxuICAgICAgICAgICAgLi4uZW50aXRpZXMsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH1cbiAgICB9XG4gICAgY2FzZSAnZmV0Y2hJdGVtJzoge1xuICAgICAgaWYgKGRhdGEgPT0gbnVsbCkge3JldHVybiBzdGF0ZX1cbiAgICAgIGNvbnN0IHsgdmFsdWVzOiB7IF9pZCB9IH0gPSBkYXRhXG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgW3RhYmxlXToge1xuICAgICAgICAgIC4uLnN0YXRlW3RhYmxlXSxcbiAgICAgICAgICBlbnRpdGllczoge1xuICAgICAgICAgICAgLi4uc3RhdGVbdGFibGVdLmVudGl0aWVzLFxuICAgICAgICAgICAgW19pZF06IGRhdGEsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH1cbiAgICB9XG4gICAgZGVmYXVsdDogcmV0dXJuIHN0YXRlXG4gIH1cbn1cblxuLyogU0VMRUNUT1JTICovXG5cbmV4cG9ydCBjb25zdCBnZXRUYWJsZXMgPSAoeyB0YWJsZXMgfSkgPT4gKHsgdGFibGVzIH0pXG5cbmV4cG9ydCBjb25zdCBnZXRDb3VudHJ5ID0gKHsgdGFibGVzOiB7IGNvdW50cnkgfSB9KSA9PiAoeyBjb3VudHJ5IH0pXG5cbmV4cG9ydCBjb25zdCBnZXRVc2VyID0gKHsgdGFibGVzOiB7IHVzZXIgfSB9KSA9PiAoeyB1c2VyIH0pXG5cbmV4cG9ydCBjb25zdCBnZXRUYWJsZUZpbHRlcnMgPSAgKHsgdGFibGVzIH0sIHsgdGFibGUgfSkgPT4ge1xuICBjb25zdCB7IFt0YWJsZV06IHsgZmllbGRzLCBmaWx0ZXJMaXN0IH0gfSA9IHRhYmxlc1xuICByZXR1cm4geyBmaWVsZHMsIGZpbHRlckxpc3QgfVxufVxuXG4vKiBIRUxQRVJTICovXG5cbiIsIi8qIEFDVElPTlMgKi9cblxuZXhwb3J0IGNvbnN0IGNoYW5nZVdpbkRpbSA9ICgpID0+IGRpc3BhdGNoID0+IHtcbiAgZGlzcGF0Y2goeyB0eXBlOiAnd2luZGltJywgLi4uaW5pdFdpbkRpbSgpIH0pXG59XG5cbi8qIFJFRFVDRVIgKi9cblxuZXhwb3J0IGRlZmF1bHQgKHN0YXRlID0gaW5pdFdpbkRpbSgpLCB7IHR5cGUsIGhlaWdodCwgd2lkdGggfSkgPT4ge1xuICBzd2l0Y2ggKHR5cGUpIHtcbiAgICBjYXNlICd3aW5kaW0nOiB7XG4gICAgICByZXR1cm4geyBoZWlnaHQsIHdpZHRoIH1cbiAgICB9XG4gICAgZGVmYXVsdDogcmV0dXJuIHN0YXRlXG4gIH1cbn1cblxuLyogU0VMRUNUT1JTICovXG5cbmV4cG9ydCBjb25zdCBnZXRXaW5EaW0gPSAoeyB3aW46IHsgaGVpZ2h0LCB3aWR0aCB9IH0pID0+ICh7IGhlaWdodCwgd2lkdGggfSlcblxuLyogSEVMUEVSUyAqL1xuXG5jb25zdCBpbml0V2luRGltID0gKCkgPT4ge1xuICBjb25zdCB7IGlubmVySGVpZ2h0OiBoZWlnaHQsIGlubmVyV2lkdGg6IHdpZHRoIH0gPSB3aW5kb3dcbiAgcmV0dXJuIHsgaGVpZ2h0LCB3aWR0aCB9XG59XG5cbmNvbnN0IHNjcm9sbEJhcldpZHRoID0gNDBcbmNvbnN0IGxlZnRNYXJnaW4gPSAwXG5cbmNvbnN0IHRvcEhlaWdodCA9IDUwXG5jb25zdCB0b3BNYXJnaW4gPSA1XG5cbmNvbnN0IGRpdldpZHRoU3BlYyA9IHtcbiAgbGVmdDogMTIwLFxuICByaWdodExlZnQ6IDM4MCxcbiAgcmlnaHRMZWZ0TmF2OiAxNTAsXG59XG5cbmNvbnN0IGZsb2F0U3BlYyA9IHtcbiAgbGVmdDogJ2xlZnQnLFxuICByaWdodDogJ3JpZ2h0JyxcbiAgcmlnaHRMZWZ0OiAnbGVmdCcsXG4gIHJpZ2h0TGVmdE5hdjogJ2xlZnQnLFxuICByaWdodFJpZ2h0OiAncmlnaHQnLFxuICByaWdodFJpZ2h0Qm9keTogJ3JpZ2h0Jyxcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvbHVtblN0eWxlKGtpbmQsIHsgaGVpZ2h0LCB3aWR0aCB9KSB7XG4gIGNvbnN0IGRpdkhlaWdodCA9IHtcbiAgICBsZWZ0OiBoZWlnaHQgLSB0b3BIZWlnaHQsXG4gICAgcmlnaHQ6IGhlaWdodCAtIHRvcEhlaWdodCxcbiAgICByaWdodExlZnQ6IGhlaWdodCAtIHRvcEhlaWdodCAtIHRvcE1hcmdpbixcbiAgICByaWdodExlZnROYXY6IGhlaWdodCAtIHRvcEhlaWdodCAtIHRvcE1hcmdpbixcbiAgICByaWdodFJpZ2h0OiBoZWlnaHQgLSB0b3BIZWlnaHQgLSB0b3BNYXJnaW4sXG4gICAgcmlnaHRSaWdodEJvZHk6IGhlaWdodCAtIHRvcEhlaWdodCAtIHRvcE1hcmdpbixcbiAgfVxuICBjb25zdCB7IGxlZnQsIHJpZ2h0TGVmdCwgcmlnaHRMZWZ0TmF2IH0gPSBkaXZXaWR0aFNwZWNcbiAgY29uc3QgZGl2V2lkdGggPSB7XG4gICAgLi4uZGl2V2lkdGhTcGVjLFxuICAgIHJpZ2h0OiB3aWR0aCAtIGxlZnQgLSBzY3JvbGxCYXJXaWR0aCxcbiAgICByaWdodFJpZ2h0OiB3aWR0aCAtIGxlZnQgLSByaWdodExlZnQgLSAyICogc2Nyb2xsQmFyV2lkdGggLSBsZWZ0TWFyZ2luLFxuICAgIHJpZ2h0UmlnaHRCb2R5OiB3aWR0aCAtIGxlZnQgLSByaWdodExlZnROYXYgLSAyICogc2Nyb2xsQmFyV2lkdGggLSBsZWZ0TWFyZ2luLFxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICB3aWR0aDogZGl2V2lkdGhba2luZF0sXG4gICAgaGVpZ2h0OiBkaXZIZWlnaHRba2luZF0sXG4gICAgZmxvYXQ6IGZsb2F0U3BlY1traW5kXSxcbiAgfVxufVxuXG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgeyByZW5kZXIgfSBmcm9tICdyZWFjdC1kb20nXG5pbXBvcnQgeyBSb3V0ZXIsIFJvdXRlLCBSZWRpcmVjdCwgSW5kZXhSb3V0ZSwgSW5kZXhSZWRpcmVjdCwgYnJvd3Nlckhpc3RvcnkgfSBmcm9tICdyZWFjdC1yb3V0ZXInXG5cbmltcG9ydCBSb290IGZyb20gJ1Jvb3QuanN4J1xuaW1wb3J0IEFwcCBmcm9tICdBcHAuanN4J1xuaW1wb3J0IFN1YkFwcCBmcm9tICdTdWJBcHAuanN4J1xuaW1wb3J0IEJhY2tvZmZpY2UgZnJvbSAnQmFja29mZmljZS5qc3gnXG5pbXBvcnQgSXRlbUZpbHRlcmVkIGZyb20gJ0l0ZW1GaWx0ZXJlZC5qc3gnXG5pbXBvcnQgSXRlbU15IGZyb20gJ0l0ZW1NeS5qc3gnXG5pbXBvcnQgSXRlbVJlY29yZFByZSBmcm9tICdJdGVtUmVjb3JkUHJlLmpzeCdcbmltcG9ydCBEb2MgZnJvbSAnRG9jLmpzeCdcbmltcG9ydCBOb3RGb3VuZCBmcm9tICdOb3RGb3VuZC5qc3gnXG5cbmltcG9ydCBjb25maWd1cmVTdG9yZSBmcm9tICdjb25maWd1cmVTdG9yZS5qcydcbmltcG9ydCByb290UmVkdWNlciBmcm9tICdyZWR1Y2Vycy5qcydcblxuY29uc3Qgc3RvcmUgPSBjb25maWd1cmVTdG9yZShyb290UmVkdWNlcilcblxucmVuZGVyKFxuICA8Um9vdCBzdG9yZT17c3RvcmV9PlxuICAgIDxSb3V0ZXIgaGlzdG9yeT17YnJvd3Nlckhpc3Rvcnl9ID5cbiAgICAgIDxSZWRpcmVjdCBmcm9tPVwiL2Fib3V0XCIgdG89XCIvZG9jcy9hYm91dC5tZFwiIC8+XG4gICAgICA8UmVkaXJlY3QgZnJvbT1cIi9kb2NzL2Fib3V0XCIgdG89XCIvZG9jcy9hYm91dC5tZFwiIC8+XG4gICAgICA8UmVkaXJlY3QgZnJvbT1cIi9hYm91dC5tZFwiIHRvPVwiL2RvY3MvYWJvdXQubWRcIiAvPlxuICAgICAgPFJlZGlyZWN0IGZyb209XCIvbG9naW5cIiB0bz1cIi9kb2NzL2Fib3V0Lm1kXCIgLz5cbiAgICAgIDxSZWRpcmVjdCBmcm9tPVwiL2xvZ291dFwiIHRvPVwiL2RvY3MvYWJvdXQubWRcIiAvPlxuICAgICAgPFJlZGlyZWN0IGZyb209XCIvc2xvZ291dFwiIHRvPVwiL2RvY3MvYWJvdXQubWRcIiAvPlxuICAgICAgPFJvdXRlIHBhdGg9XCIvXCIgY29tcG9uZW50PXtBcHB9ID5cbiAgICAgICAgPEluZGV4Um91dGUgY29tcG9uZW50PXtBcHB9IC8+XG4gICAgICAgIDxJbmRleFJlZGlyZWN0IHRvPVwiL2RvY3MvYWJvdXQubWRcIiAvPlxuICAgICAgICA8Um91dGUgcGF0aD1cImRvY3MvOmRvY0ZpbGVcIiBjb21wb25lbnQ9e0RvY30gLz5cbiAgICAgICAgPFJvdXRlIHBhdGg9XCJ0ZWNoL2RvY3MvZ2VuLzpkb2NGaWxlXCIgY29tcG9uZW50PXtEb2N9IC8+XG4gICAgICAgIDxSb3V0ZSBwYXRoPVwidGVjaC9kb2NzLzpkb2NGaWxlXCIgY29tcG9uZW50PXtEb2N9IC8+XG4gICAgICAgIDxSb3V0ZSBwYXRoPVwiOnRhYmxlXCIgY29tcG9uZW50PXtTdWJBcHB9ID5cbiAgICAgICAgICA8Um91dGUgcGF0aD1cImxpc3RcIiBjb21wb25lbnQ9e0l0ZW1GaWx0ZXJlZH0gLz5cbiAgICAgICAgICA8Um91dGUgcGF0aD1cIm15bGlzdFwiIGNvbXBvbmVudD17SXRlbU15fSA+XG4gICAgICAgICAgICA8Um91dGUgcGF0aD1cIjplSWRcIiBjb21wb25lbnQ9e0l0ZW1SZWNvcmRQcmV9IG93bk9ubHk9e3RydWV9IC8+XG4gICAgICAgICAgPC9Sb3V0ZT5cbiAgICAgICAgICA8Um91dGUgcGF0aD1cIjpmdW5jXCIgY29tcG9uZW50PXtCYWNrb2ZmaWNlfSAvPlxuICAgICAgICA8L1JvdXRlPlxuICAgICAgPC9Sb3V0ZT5cbiAgICAgIDxSb3V0ZSBwYXRoPVwiKlwiIGNvbXBvbmVudD17Tm90Rm91bmR9IC8+XG4gICAgPC9Sb3V0ZXI+XG4gIDwvUm9vdD5cbiAgLFxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYm9keScpXG4pXG5cbiIsImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCdcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCdcbmltcG9ydCB7IGNoYW5nZUZhY2V0QWxsLCBnZXRGaWx0ZXJTZXR0aW5nLCB0ZXN0QWxsQ2hlY2tzIH0gZnJvbSAnZmlsdGVyLmpzJ1xuXG5jb25zdCBpbmRldGVybWluYXRlID0gc3RhdGVzID0+ICFzdGF0ZXMuYWxsVHJ1ZSAmJiAhc3RhdGVzLmFsbEZhbHNlXG5cbmNsYXNzIENoZWNrYm94SSBleHRlbmRzIENvbXBvbmVudCB7XG4gIGNvbXBvbmVudERpZFVwZGF0ZSgpIHtcbiAgICBjb25zdCB7IHByb3BzOiB7IGZpbHRlclNldHRpbmcgfSB9ID0gdGhpc1xuICAgIGNvbnN0IHN0YXRlcyA9IHRlc3RBbGxDaGVja3MoZmlsdGVyU2V0dGluZylcbiAgICB0aGlzLmRvbS5pbmRldGVybWluYXRlID0gaW5kZXRlcm1pbmF0ZShzdGF0ZXMpXG4gIH1cbiAgaGFuZGxlQ2hlY2sgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBwcm9wczoge2ZpbHRlclNldHRpbmcsIGZpbHRlcklkLCBoYW5kbGUgfSB9ID0gdGhpc1xuICAgIGNvbnN0IHN0YXRlcyA9IHRlc3RBbGxDaGVja3MoZmlsdGVyU2V0dGluZylcbiAgICByZXR1cm4gaGFuZGxlKGZpbHRlcklkLCB0aGlzLmRvbS5pbmRldGVybWluYXRlIHx8ICFzdGF0ZXMuYWxsVHJ1ZSlcbiAgfVxuICBzZXRJbmRldGVybWluYXRlID0gZG9tRWxlbSA9PiB7XG4gICAgY29uc3QgeyBwcm9wczogeyBmaWx0ZXJTZXR0aW5nIH0gfSA9IHRoaXNcbiAgICBjb25zdCBzdGF0ZXMgPSB0ZXN0QWxsQ2hlY2tzKGZpbHRlclNldHRpbmcpXG4gICAgaWYgKGRvbUVsZW0pIHtcbiAgICAgIHRoaXMuZG9tID0gZG9tRWxlbVxuICAgICAgZG9tRWxlbS5pbmRldGVybWluYXRlID0gaW5kZXRlcm1pbmF0ZShzdGF0ZXMpXG4gICAgfVxuICB9XG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IHByb3BzOiB7IGZpbHRlclNldHRpbmcgfSB9ID0gdGhpc1xuICAgIGNvbnN0IHN0YXRlcyA9IHRlc3RBbGxDaGVja3MoZmlsdGVyU2V0dGluZylcbiAgICByZXR1cm4gKFxuICAgICAgPGlucHV0XG4gICAgICAgICAgcmVmPXt0aGlzLnNldEluZGV0ZXJtaW5hdGV9XG4gICAgICAgICAgdHlwZT1cImNoZWNrYm94XCJcbiAgICAgICAgICBjaGVja2VkPXtzdGF0ZXMuYWxsVHJ1ZX1cbiAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVDaGVja31cbiAgICAgIC8+XG4gICAgKVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QoZ2V0RmlsdGVyU2V0dGluZywgeyBoYW5kbGU6IGNoYW5nZUZhY2V0QWxsIH0pKENoZWNrYm94SSlcbiIsImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCdcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCdcbmltcG9ydCBCeVZhbHVlIGZyb20gJ0J5VmFsdWUuanN4J1xuaW1wb3J0IEwgZnJvbSAnbGVhZmxldCdcbmltcG9ydCB7Y291bnRyeUJvcmRlcnN9IGZyb20gJ2V1cm9wZS5nZW8uanMnXG5pbXBvcnQgeyBnZXRGaWx0ZXJTZXR0aW5nIH0gZnJvbSAnZmlsdGVyLmpzJ1xuaW1wb3J0IHsgZ2V0Q291bnRyeSB9IGZyb20gJ3RhYmxlcy5qcydcbmltcG9ydCB7IGNvbWJpbmVTZWxlY3RvcnMgfSBmcm9tICdyZWR1Y2Vycy5qcydcblxuY29uc3QgbWFwT3B0aW9ucyA9IHtcbiAgSEVJR0hUOiAyNTAsXG4gIE1BWF9SQURJVVM6IDI1LFxuICBMRVZFTF9PRkY6IDEwLFxuICBaT09NX0lOSVQ6IDMsXG4gIE1BUF9DRU5URVI6IFs1MiwgMTJdLFxuICBNQVBfQk9VTkRTOiBbWzMwLCAtMjBdLCBbNzAsIDQwXV0sXG4gIE1BUktFUl9DT0xPUjoge1xuICAgIFt0cnVlXToge1xuICAgICAgY29sb3I6ICcjMDA4ODAwJyxcbiAgICAgIGZpbGxDb2xvcjogJyMwMGNjMDAnLFxuICAgIH0sXG4gICAgW2ZhbHNlXToge1xuICAgICAgY29sb3I6ICcjODg4ODQ0JyxcbiAgICAgIGZpbGxDb2xvcjogJyNiYmJiNjYnLFxuICAgIH0sXG4gIH0sXG4gIE1BUktFUl9TSEFQRToge1xuICAgIHdlaWdodDogMSxcbiAgICBmaWxsOiB0cnVlLFxuICAgIGZpbGxPcGFjaXR5OiAwLjgsXG4gIH0sXG4gIENPVU5UUllfU1RZTEU6IHtcbiAgICBbdHJ1ZV06IHtcbiAgICAgIGNvbG9yOiAnIzg4NDQyMicsXG4gICAgICB3ZWlnaHQ6IDIsXG4gICAgICBmaWxsOiB0cnVlLFxuICAgICAgZmlsbENvbG9yOiAnI2FhNzc2NicsXG4gICAgICBmaWxsT3BhY2l0eTogMSxcbiAgICB9LFxuICAgIFtmYWxzZV06IHtcbiAgICAgIGNvbG9yOiAnIzc3Nzc3NycsXG4gICAgICB3ZWlnaHQ6IDEsXG4gICAgICBmaWxsOiB0cnVlLFxuICAgICAgZmlsbENvbG9yOiAnI2JiYmJiYicsXG4gICAgICBmaWxsT3BhY2l0eTogMSxcbiAgICB9LFxuICB9LFxufVxuXG5jb25zdCBjb21wdXRlUmFkaXVzID0gKF9pZCwgZmlsdGVyZWRBbW91bnRPdGhlcnMsIGFtb3VudHMpID0+IHtcbiAgY29uc3QgYW1vdW50ID0gYW1vdW50cyA/IChhbW91bnRzW19pZF0gfHwgMCkgOiAwXG4gIGlmIChhbW91bnQgPT0gMCkge3JldHVybiAwfVxuICBjb25zdCB7IE1BWF9SQURJVVMsIExFVkVMX09GRiB9ID0gbWFwT3B0aW9uc1xuICBjb25zdCBwcm9wb3J0aW9uYWwgPSBNQVhfUkFESVVTICogYW1vdW50IC8gZmlsdGVyZWRBbW91bnRPdGhlcnNcbiAgaWYgKGZpbHRlcmVkQW1vdW50T3RoZXJzIDwgTEVWRUxfT0ZGKSB7cmV0dXJuIHByb3BvcnRpb25hbH1cbiAgcmV0dXJuIExFVkVMX09GRiAqIE1hdGguc3FydChwcm9wb3J0aW9uYWwpXG59XG5cbmNsYXNzIEVVTWFwIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcylcbiAgICB0aGlzLmZlYXR1cmVzID0ge31cbiAgfVxuICBzZXRNYXAgPSBkb20gPT4ge2lmIChkb20pIHt0aGlzLmRvbSA9IGRvbX19XG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IHByb3BzOiB7IGNvdW50cnksIC4uLmJ5VmFsdWVQcm9wcyB9LCBzZXRNYXAgfSA9IHRoaXNcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdj5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIHJlZj17c2V0TWFwfVxuICAgICAgICAvPlxuICAgICAgICA8QnlWYWx1ZSB7Li4uYnlWYWx1ZVByb3BzfSAvPlxuICAgICAgPC9kaXY+XG4gICAgKVxuICB9XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgY29uc3Qge1xuICAgICAgcHJvcHM6IHsgZmlsdGVyU2V0dGluZywgZmlsdGVyZWRBbW91bnRPdGhlcnMsIGFtb3VudHMsIGNvdW50cnkgfSxcbiAgICAgIGRvbSxcbiAgICB9ID0gdGhpc1xuICAgIGNvbnN0IHsgSEVJR0hULCBNQVBfQ0VOVEVSLCBaT09NX0lOSVQsIE1BUF9CT1VORFMsIE1BUktFUl9DT0xPUiwgTUFSS0VSX1NIQVBFLCBDT1VOVFJZX1NUWUxFIH0gPSBtYXBPcHRpb25zXG4gICAgZG9tLnN0eWxlLmhlaWdodCA9IEhFSUdIVFxuICAgIHRoaXMubWFwID0gTC5tYXAoZG9tLCB7XG4gICAgICBhdHRyaWJ1dGlvbkNvbnRyb2w6IGZhbHNlLFxuICAgICAgY2VudGVyOiBNQVBfQ0VOVEVSLFxuICAgICAgem9vbTogWk9PTV9JTklULFxuICAgICAgbWF4Qm91bmRzOiBNQVBfQk9VTkRTLFxuICAgIH0pXG4gICAgY29uc3QgeyBvcmRlciwgZW50aXRpZXMgfSA9IGNvdW50cnlcbiAgICB0aGlzLmlkRnJvbUlzbyA9IHt9XG4gICAgb3JkZXIuZm9yRWFjaChfaWQgPT4ge1xuICAgICAgY29uc3QgeyBbX2lkXTogeyB2YWx1ZXM6IHsgaXNvIH0gfSB9ID0gZW50aXRpZXNcbiAgICAgIHRoaXMuaWRGcm9tSXNvW2lzb10gPSBfaWRcbiAgICB9KVxuICAgIEwuZ2VvSlNPTihjb3VudHJ5Qm9yZGVycywge1xuICAgICAgc3R5bGU6IGZlYXR1cmUgPT4gQ09VTlRSWV9TVFlMRVt0aGlzLmluRGFyaWFoKGZlYXR1cmUpXSxcbiAgICAgIG9uRWFjaEZlYXR1cmU6IGZlYXR1cmUgPT4ge1xuICAgICAgICBpZiAodGhpcy5pbkRhcmlhaChmZWF0dXJlKSkge1xuICAgICAgICAgIGNvbnN0IHsgcHJvcGVydGllczogeyBpc28yLCBsYXQsIGxuZyB9IH0gPSBmZWF0dXJlXG4gICAgICAgICAgY29uc3QgX2lkID0gdGhpcy5pZEZyb21Jc29baXNvMl1cbiAgICAgICAgICBjb25zdCBpc09uID0gZmlsdGVyU2V0dGluZ1tfaWRdXG4gICAgICAgICAgY29uc3QgbWFya2VyID0gTC5jaXJjbGVNYXJrZXIoW2xhdCwgbG5nXSwge1xuICAgICAgICAgICAgLi4uTUFSS0VSX0NPTE9SW2lzT25dLFxuICAgICAgICAgICAgcmFkaXVzOiBjb21wdXRlUmFkaXVzKF9pZCwgZmlsdGVyZWRBbW91bnRPdGhlcnMsIGFtb3VudHMpLFxuICAgICAgICAgICAgLi4uTUFSS0VSX1NIQVBFLFxuICAgICAgICAgICAgcGFuZTogJ21hcmtlclBhbmUnLFxuICAgICAgICAgIH0pLmFkZFRvKHRoaXMubWFwKVxuICAgICAgICAgIHRoaXMuZmVhdHVyZXNbaXNvMl0gPSBtYXJrZXJcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICB9KS5hZGRUbyh0aGlzLm1hcClcbiAgfVxuXG4gIGluRGFyaWFoID0gZmVhdHVyZSA9PiAhIXRoaXMuaWRGcm9tSXNvW2ZlYXR1cmUucHJvcGVydGllcy5pc28yXVxuXG4gIGNvbXBvbmVudERpZFVwZGF0ZSgpIHtcbiAgICBjb25zdCB7IHByb3BzOiB7IGZpbHRlclNldHRpbmcsIGZpbHRlcmVkQW1vdW50T3RoZXJzLCBhbW91bnRzIH0gfSA9IHRoaXNcbiAgICBjb25zdCB7IE1BUktFUl9DT0xPUiB9ID0gbWFwT3B0aW9uc1xuICAgIE9iamVjdC5lbnRyaWVzKHRoaXMuZmVhdHVyZXMpLmZvckVhY2goKFtpc28yLCBtYXJrZXJdKSA9PiB7XG4gICAgICBjb25zdCBfaWQgPSB0aGlzLmlkRnJvbUlzb1tpc28yXVxuICAgICAgY29uc3QgaXNPbiA9IGZpbHRlclNldHRpbmdbX2lkXVxuICAgICAgbWFya2VyLnNldFJhZGl1cyhjb21wdXRlUmFkaXVzKF9pZCwgZmlsdGVyZWRBbW91bnRPdGhlcnMsIGFtb3VudHMpKVxuICAgICAgbWFya2VyLnNldFN0eWxlKE1BUktFUl9DT0xPUltpc09uXSlcbiAgICB9KVxuICB9XG59XG5cbkVVTWFwLmRpc3BsYXlOYW1lID0gJ0VVTWFwJ1xuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KGNvbWJpbmVTZWxlY3RvcnMoZ2V0Q291bnRyeSwgZ2V0RmlsdGVyU2V0dGluZykpKEVVTWFwKVxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4J1xuaW1wb3J0IHsgZ2V0QWx0LCBuZXh0QWx0IH0gZnJvbSAnYWx0ZXIuanMnXG5cbmNvbnN0IGhhbmRsZU5leHQgPSAoeyB0YWcsIGFsdGVybmF0aXZlcywgaW5pdGlhbCwgbmV4dCB9KSA9PiBldmVudCA9PiB7XG4gIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gIG5leHQodGFnLCBhbHRlcm5hdGl2ZXMubGVuZ3RoLCBpbml0aWFsKVxufVxuXG5jb25zdCBBbHRlcm5hdGl2ZSA9ICh7IGNvbnRyb2xQbGFjZW1lbnQsIGNvbnRyb2xzLCBhbHQsIGFsdGVybmF0aXZlcywgLi4ucmVzdCB9KSA9PiAoXG4gIDxkaXY+XG4gICAge2NvbnRyb2xQbGFjZW1lbnQoY29udHJvbHNbYWx0XShoYW5kbGVOZXh0KHsgYWx0ZXJuYXRpdmVzLCAuLi5yZXN0IH0pKSl9XG4gICAge2FsdGVybmF0aXZlc1thbHRdfVxuICA8L2Rpdj5cbilcblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChnZXRBbHQsIHsgbmV4dDogbmV4dEFsdCB9KShBbHRlcm5hdGl2ZSlcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCdcbmltcG9ydCBMb2dpbiBmcm9tICdMb2dpbi5qc3gnXG5pbXBvcnQgTmF2TGluayBmcm9tICdOYXZMaW5rLmpzeCdcbmltcG9ydCBTdGF0aWMgZnJvbSAnU3RhdGljLmpzeCdcbmltcG9ydCBOb3RpZmljYXRpb24gZnJvbSAnTm90aWZpY2F0aW9uLmpzeCdcbmltcG9ydCB7IGdldFdpbkRpbSB9IGZyb20gJ3dpbi5qcydcblxuY29uc3QgQXBwID0gKHsgY2hpbGRyZW4sIGhlaWdodCwgd2lkdGggfSkgPT4ge1xuICBjb25zdCB0ZXh0ID0gYCR7d2lkdGh9IHggJHtoZWlnaHR9YFxuICByZXR1cm4gKFxuICAgIDxkaXY+XG4gICAgICA8Tm90aWZpY2F0aW9uIC8+XG4gICAgICA8cCBjbGFzc05hbWU9XCJuYXYgc21hbGwgdG9wXCIgPlxuICAgICAgICA8aW1nXG4gICAgICAgICAgc3JjPVwiL3N0YXRpYy9pbWFnZXMvaW5raW5kX2xvZ29fc21hbGwucG5nXCJcbiAgICAgICAgICB0aXRsZT1cImluZm9ybWF0aW9uIGFib3V0IHRoaXMgc2l0ZVwiXG4gICAgICAgIC8+XG4gICAgICAgIDxOYXZMaW5rIHRvPVwiL2NvbnRyaWJcIiA+eydDb250cmlidXRpb25zJ308L05hdkxpbms+XG4gICAgICAgIDxOYXZMaW5rIHRvPVwiL2JhY2tvZmZpY2VcIiA+eydCYWNrb2ZmaWNlJ308L05hdkxpbms+XG4gICAgICAgIDxTdGF0aWMgLz5cbiAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwicmVzaXplXCIgdGl0bGU9e3RleHR9Pnt0ZXh0fTwvc3Bhbj5cbiAgICAgICAgPExvZ2luIC8+XG4gICAgICA8L3A+XG4gICAgICA8ZGl2PntjaGlsZHJlbn08L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKVxufVxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KGdldFdpbkRpbSkoQXBwKVxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuXG5jb25zdCBCYWNrb2ZmaWNlID0gKHsgcGFyYW1zOiB7IGZ1bmMgfSB9KSA9PiB7XG4gIGNvbnN0IGhlYWRpbmdzID0ge1xuICAgIHR5cGU6ICdDb250cmlidXRpb24gdHlwZXMnLFxuICAgIGFzc2VzczogJ0Fzc2Vzc21lbnQgY3JpdGVyaWEnLFxuICAgIHBhY2thZ2U6ICdBc3Nlc3NtZW50IHBhY2thZ2VzJyxcbiAgfVxuICBjb25zdCBib2RpZXMgPSB7XG4gICAgdHlwZTogJ1dpbGwgYmUgaW1wbGVtZW50ZWQnLFxuICAgIGFzc2VzczogJ1dpbGwgYmUgaW1wbGVtZW50ZWQnLFxuICAgIHBhY2thZ2U6ICdXaWxsIGJlIGltcGxlbWVudGVkJyxcbiAgfVxuICBjb25zdCBoZWFkaW5nID0gaGVhZGluZ3NbZnVuY10gfHwgJ05vIHN1Y2ggZnVuY3Rpb24nXG4gIGNvbnN0IGJvZHkgPSBib2RpZXNbZnVuY10gfHwgJ05vdGhpbmcgdG8gd2FpdCBmb3InXG4gIHJldHVybiAoXG4gICAgPGRpdj5cbiAgICAgIDxoMT57aGVhZGluZ308L2gxPlxuICAgICAgPHA+e2JvZHl9PC9wPlxuICAgIDwvZGl2PlxuICApXG59XG5cbmV4cG9ydCBkZWZhdWx0IEJhY2tvZmZpY2VcblxuXG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnXG5pbXBvcnQgRmFjZXQgZnJvbSAnRmFjZXQuanN4J1xuaW1wb3J0IENoZWNrYm94SSBmcm9tICdDaGVja2JveEkuanN4J1xuaW1wb3J0IFN0YXQgZnJvbSAnU3RhdC5qc3gnXG5pbXBvcnQgQWx0ZXJuYXRpdmUgZnJvbSAnQWx0ZXJuYXRpdmUuanN4J1xuaW1wb3J0IHsgZ2V0RmllbGRWYWx1ZXMsIHBsYWNlRmFjZXRzIH0gZnJvbSAnZmlsdGVyLmpzJ1xuXG5jb25zdCBCeVZhbHVlID0gKHtcbiAgdGFibGUsXG4gIGZpbHRlcklkLCBmaWx0ZXJGaWVsZCwgZmlsdGVyTGFiZWwsXG4gIGZpZWxkVmFsdWVzLFxuICBmaWx0ZXJlZEFtb3VudCwgZmlsdGVyZWRBbW91bnRPdGhlcnMsXG4gIGFtb3VudHMsIG1heENvbHMsIFxuICBleHBhbmRlZCxcbn0pID0+IHtcbiAgY29uc3Qgcm93cyA9IHBsYWNlRmFjZXRzKGZpZWxkVmFsdWVzLCBtYXhDb2xzKVxuICBjb25zdCBjb250cm9sMSA9IGhhbmRsZXIgPT4gKDxzcGFuIGNsYXNzTmFtZT1cImJ1dHRvbi1zbWFsbCBmYSBmYS1jaGV2cm9uLWRvd25cIiBvbkNsaWNrPXtoYW5kbGVyfSAvPilcbiAgY29uc3QgY29udHJvbDIgPSBoYW5kbGVyID0+ICg8c3BhbiBjbGFzc05hbWU9XCJidXR0b24tc21hbGwgZmEgZmEtY2hldnJvbi1yaWdodFwiIG9uQ2xpY2s9e2hhbmRsZXJ9IC8+KVxuICBjb25zdCBjb250cm9sUGxhY2VtZW50ID0gY29udHJvbCA9PiAoXG4gICAgPHAgY2xhc3NOYW1lPVwiZmFjZXRcIiA+XG4gICAgICA8Q2hlY2tib3hJXG4gICAgICAgIGZpbHRlcklkPXtmaWx0ZXJJZH1cbiAgICAgIC8+IHtmaWx0ZXJMYWJlbH17JyAnfVxuICAgICAgPFN0YXQgc3ViVG90YWw9e2ZpbHRlcmVkQW1vdW50fSB0b3RhbD17ZmlsdGVyZWRBbW91bnRPdGhlcnN9IC8+eycgJ31cbiAgICAgIHtjb250cm9sfVxuICAgIDwvcD5cbiAgKVxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwiZmFjZXRcIiA+e1xuICAgICAgcm93cyA9PT0gbnVsbCA/ICg8cD57JyAtbm8gZmFjZXRzICd9PC9wPikgOiAoXG4gICAgICAgIDxBbHRlcm5hdGl2ZVxuICAgICAgICAgIHRhZz17YCR7dGFibGV9XyR7ZmlsdGVySWR9YH1cbiAgICAgICAgICBjb250cm9sUGxhY2VtZW50PXtjb250cm9sUGxhY2VtZW50fVxuICAgICAgICAgIGNvbnRyb2xzPXtbY29udHJvbDEsIGNvbnRyb2wyXX1cbiAgICAgICAgICBpbml0aWFsPXtleHBhbmRlZCA/IDAgOiAxfVxuICAgICAgICAgIGFsdGVybmF0aXZlcz17W1xuICAgICAgICAgICAgKDx0YWJsZSBrZXk9XCJ0YWJsZVwiID5cbiAgICAgICAgICAgICAgPHRib2R5PlxuICAgICAgICAgICAgICAgIHtyb3dzLm1hcCgoZW50aXR5LCBpKSA9PiAoXG4gICAgICAgICAgICAgICAgICA8dHIga2V5PXtpfSA+XG4gICAgICAgICAgICAgICAgICAgIHtlbnRpdHkubWFwKChmLCBqKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgaWYgKGYgPT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiA8dGQga2V5PXtqfSAvPlxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCBbdmFsdWVJZCwgdmFsdWVSZXBdID0gZlxuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGZhY2V0Q2xhc3MgPSAoaiA9PSAwKSA/IFwiZmFjZXRcIiA6IFwiZmFjZXQgbWlkXCJcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWyhcbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZFxuICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17dmFsdWVJZH1cbiAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2ZhY2V0Q2xhc3N9XG4gICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxGYWNldFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlcklkPXtmaWx0ZXJJZH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZUlkPXt2YWx1ZUlkfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlUmVwPXt2YWx1ZVJlcH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgKSwgKFxuICAgICAgICAgICAgICAgICAgICAgICAgPHRkXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGtleT1cInN0YXRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJzdGF0aXN0aWNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8U3RhdCBzdWJUb3RhbD17YW1vdW50c1t2YWx1ZUlkXX0gLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgICAgICAgKV1cbiAgICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICA8L3RyPlxuICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgICAgICA8L3RhYmxlPiksXG4gICAgICAgICAgICAoPGRpdiBrZXk9XCJkaXZcIiAvPiksXG4gICAgICAgICAgXX1cbiAgICAgICAgLz5cbiAgICAgICl9XG4gICAgPC9kaXY+XG4gIClcbn1cblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChnZXRGaWVsZFZhbHVlcykoQnlWYWx1ZSlcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcblxuaW1wb3J0IERvY01kIGZyb20gJ0RvY01kLmpzeCdcbmltcG9ydCBEb2NQZGYgZnJvbSAnRG9jUGRmLmpzeCdcbmltcG9ydCBEb2NIdG1sIGZyb20gJ0RvY0h0bWwuanN4J1xuaW1wb3J0IE5vdEZvdW5kIGZyb20gJ05vdEZvdW5kLmpzeCdcblxuY29uc3QgZG9jVHlwZSA9IHtcbiAgbWQ6IERvY01kLFxuICBwZGY6IERvY1BkZixcbiAgaHRtbDogRG9jSHRtbCxcbn1cblxuY29uc3QgRG9jID0gKHsgbG9jYXRpb246IHsgcGF0aG5hbWU6IGRvY1BhdGggfSB9KSA9PiB7XG4gIGNvbnN0IFtkb2NEaXIsIGRvY0ZpbGVdID0gL14oLiopXFwvKFteL10rKSQvZy5leGVjKGRvY1BhdGgpLnNsaWNlKDEpXG4gIGNvbnN0IFtkb2NOYW1lLCBkb2NFeHRdID0gL14oLiopXFwuKFteLl0rKSQvZy5leGVjKGRvY0ZpbGUpLnNsaWNlKDEpXG4gIGNvbnN0IHsgW2RvY0V4dF06IERvY0NsYXNzIH0gPSBkb2NUeXBlXG4gIHJldHVybiBEb2NDbGFzcyA9PSBudWxsID8gKFxuICAgIDxOb3RGb3VuZCBwYXJhbXM9e3tzcGxhdDogYGRvY3VtZW50ICR7ZG9jUGF0aH1gfX0gLz5cbiAgKSA6IChcbiAgICA8RG9jQ2xhc3MgZG9jRGlyPXtkb2NEaXJ9IGRvY05hbWU9e2RvY05hbWV9IGRvY0V4dD17ZG9jRXh0fSB0YWc9e2RvY05hbWV9IC8+XG4gIClcbn1cblxuZXhwb3J0IGRlZmF1bHQgRG9jXG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5cbmNvbnN0IERvY0h0bWwgPSAoeyBkb2NEaXIsIGRvY05hbWUsIGRvY0V4dCB9KSA9PiB7XG4gIGNvbnN0IHNyYyA9IGAvYXBpL2ZpbGUke2RvY0Rpcn0vJHtkb2NOYW1lfS4ke2RvY0V4dH1gXG4gIHJldHVybiAoXG4gICAgPGlmcmFtZVxuICAgICAgaGVpZ2h0PVwiMTAwJVwiXG4gICAgICB3aWR0aD1cIjEwMCVcIlxuICAgICAgc3JjPXtzcmN9XG4gICAgLz5cbiAgKVxufVxuXG5leHBvcnQgZGVmYXVsdCBEb2NIdG1sXG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5cbmNvbnN0IERvY1BkZiA9ICh7IGRvY0RpciwgZG9jTmFtZSwgZG9jRXh0IH0pID0+IHtcbiAgY29uc3QgaHJlZiA9IGAvYXBpL2ZpbGUke2RvY0Rpcn0vJHtkb2NOYW1lfS4ke2RvY0V4dH1gXG4gIGNvbnN0IGlPUyA9IC9pUGFkfGlQaG9uZXxpUG9kLy50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpICYmICF3aW5kb3cuTVNTdHJlYW1cbiAgcmV0dXJuIGlPUyA/IChcbiAgICA8cD5cbiAgICAgIDxhIHRhcmdldD1cIl9ibGFua1wiIHJlbD1cIm5vb3BlbmVyIG5vcmVmZXJyZXJcIiBocmVmPXtocmVmfSA+e2RvY05hbWV9PC9hPnsnIChvcGVuIHBkZiBpbiBhIG5ldyB0YWIpJ31cbiAgICA8L3A+XG4gICkgOiAoXG4gICAgPG9iamVjdFxuICAgICAgaGVpZ2h0PVwiMTAwJVwiXG4gICAgICB3aWR0aD1cIjEwMCVcIlxuICAgICAgZGF0YT17aHJlZn1cbiAgICAgIHR5cGU9XCJhcHBsaWNhdGlvbi9wZGZcIlxuICAgID5cbiAgICAgIDxhIHRhcmdldD1cIl9ibGFua1wiIHJlbD1cIm5vb3BlbmVyIG5vcmVmZXJyZXJcIiBocmVmPXtocmVmfSA+e2RvY05hbWV9PC9hPnsnIChvcGVuIHBkZiBpbiBhIG5ldyB0YWIpJ31cbiAgICA8L29iamVjdD5cbiAgKVxufVxuXG5leHBvcnQgZGVmYXVsdCBEb2NQZGZcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCdcbmltcG9ydCB7IGNoYW5nZUZhY2V0LCBnZXRGaWx0ZXJTZXR0aW5nIH0gZnJvbSAnZmlsdGVyLmpzJ1xuXG5jb25zdCBGYWNldCA9ICh7IGZpbHRlcklkLCB2YWx1ZUlkLCB2YWx1ZVJlcCwgZmlsdGVyU2V0dGluZywgaGFuZGxlIH0pID0+IHtcbiAgY29uc3QgeyBbdmFsdWVJZF06IGlzT24gfSA9IGZpbHRlclNldHRpbmdcbiAgcmV0dXJuIChcbiAgPHNwYW4+XG4gICAgPGlucHV0XG4gICAgICB0eXBlPVwiY2hlY2tib3hcIlxuICAgICAgY2hlY2tlZD17aXNPbn1cbiAgICAgIGNsYXNzTmFtZT1cImZhY2V0XCJcbiAgICAgIG9uQ2hhbmdlPXsoKSA9PiBoYW5kbGUoZmlsdGVySWQsIHZhbHVlSWQsICFpc09uKX1cbiAgICAvPlxuICAgIHtgICR7dmFsdWVSZXB9YH1cbiAgPC9zcGFuPlxuKVxufVxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KGdldEZpbHRlclNldHRpbmcsIHsgaGFuZGxlOiBjaGFuZ2VGYWNldCB9KShGYWNldClcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCdcblxuaW1wb3J0IEZ1bGxUZXh0IGZyb20gJ0Z1bGxUZXh0LmpzeCdcbmltcG9ydCBCeVZhbHVlIGZyb20gJ0J5VmFsdWUuanN4J1xuaW1wb3J0IEVVTWFwIGZyb20gJ0VVTWFwLmpzeCdcblxuaW1wb3J0IHsgZ2V0VGFibGVGaWx0ZXJzIH0gZnJvbSAndGFibGVzLmpzJ1xuXG5jb25zdCBmaWx0ZXJDbGFzcyA9IHtcbiAgRnVsbFRleHQsXG4gIEVVTWFwLFxuICBCeVZhbHVlLFxufVxuXG5jb25zdCBGaWx0ZXIgPSAoe1xuICB0YWJsZXMsXG4gIHRhYmxlLFxuICBmaWVsZHMsXG4gIGZpbHRlckxpc3QsIFxuICBmaWx0ZXJlZEFtb3VudCwgZmlsdGVyZWRBbW91bnRPdGhlcnMsXG4gIGFtb3VudHMsXG59KSA9PiAoXG4gIDxkaXY+XG4gICAge2ZpbHRlckxpc3QuZmlsdGVyKHggPT4gZmllbGRzW3guZmllbGRdKS5tYXAoKGZpbHRlciwgZmlsdGVySWQpID0+IHtcbiAgICAgIGNvbnN0IHsgdHlwZSB9ID0gZmlsdGVyXG4gICAgICBjb25zdCB7IFt0eXBlXTogRmNsYXNzIH0gPSBmaWx0ZXJDbGFzc1xuICAgICAgaWYgKGZhbHNlICYmIHR5cGUgIT0gJ0Z1bGxUZXh0Jykge1xuICAgICAgICByZXR1cm4gPHAga2V5PXtmaWx0ZXJJZH0+e3R5cGV9PC9wPlxuICAgICAgfVxuICAgICAgcmV0dXJuIChcbiAgICAgICAgPEZjbGFzc1xuICAgICAgICAgIGtleT17ZmlsdGVySWR9XG4gICAgICAgICAgdGFibGU9e3RhYmxlfVxuICAgICAgICAgIGZpbHRlcklkPXtmaWx0ZXJJZH1cbiAgICAgICAgICBmaWx0ZXJGaWVsZD17ZmlsdGVyLmZpZWxkfVxuICAgICAgICAgIGZpbHRlckxhYmVsPXtmaWx0ZXIubGFiZWx9XG4gICAgICAgICAgbWF4Q29scz17ZmlsdGVyLm1heENvbHN9XG4gICAgICAgICAgZmlsdGVyZWRBbW91bnQ9e2ZpbHRlcmVkQW1vdW50fVxuICAgICAgICAgIGZpbHRlcmVkQW1vdW50T3RoZXJzPXtmaWx0ZXJlZEFtb3VudE90aGVyc1tmaWx0ZXJJZF19XG4gICAgICAgICAgYW1vdW50cz17YW1vdW50c1tmaWx0ZXJJZF19XG4gICAgICAgICAgZXhwYW5kZWQ9e2ZpbHRlci5leHBhbmRlZH1cbiAgICAgICAgLz5cbiAgICAgICl9XG4gICAgKX1cbiAgPC9kaXY+XG4pXG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QoZ2V0VGFibGVGaWx0ZXJzKShGaWx0ZXIpXG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnXG5pbXBvcnQgU3RhdCBmcm9tICdTdGF0LmpzeCdcbmltcG9ydCB7IGNoYW5nZUZ1bGx0ZXh0LCBnZXRGaWx0ZXJTZXR0aW5nIH0gZnJvbSAnZmlsdGVyLmpzJ1xuXG5cbmNvbnN0IEZ1bGxUZXh0ID0gKHtcbiAgZmlsdGVySWQsIGZpbHRlckZpZWxkLCBmaWx0ZXJMYWJlbCxcbiAgZmlsdGVyU2V0dGluZyxcbiAgZmlsdGVyZWRBbW91bnQsIGZpbHRlcmVkQW1vdW50T3RoZXJzLFxuICBoYW5kbGUsXG59KSA9PiAoXG4gIDxkaXY+XG4gICAgPHAgdGl0bGU9e2BTZWFyY2ggaW4gJHtmaWx0ZXJGaWVsZH1gfSA+XG4gICAgICA8aW5wdXRcbiAgICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgICBjbGFzc05hbWU9XCJzZWFyY2hcIlxuICAgICAgICBwbGFjZWhvbGRlcj17YHNlYXJjaCBpbiAke2ZpbHRlckxhYmVsfWB9XG4gICAgICAgIHZhbHVlPXtmaWx0ZXJTZXR0aW5nfVxuICAgICAgICBvbkNoYW5nZT17ZXZlbnQgPT4gaGFuZGxlKGZpbHRlcklkLCBldmVudC50YXJnZXQudmFsdWUpfVxuICAgICAgLz57JyAnfVxuICAgICAgPFN0YXQgc3ViVG90YWw9e2ZpbHRlcmVkQW1vdW50fSB0b3RhbD17ZmlsdGVyZWRBbW91bnRPdGhlcnN9IC8+XG4gICAgPC9wPlxuICA8L2Rpdj5cbilcblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChnZXRGaWx0ZXJTZXR0aW5nLCB7IGhhbmRsZTogY2hhbmdlRnVsbHRleHQgfSkoRnVsbFRleHQpXG4iLCJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnXG5pbXBvcnQgeyBjb21iaW5lU2VsZWN0b3JzIH0gZnJvbSAncmVkdWNlcnMuanMnXG5pbXBvcnQgeyBnZXRVc2VyLCBnZXRDb3VudHJ5IH0gZnJvbSAndGFibGVzLmpzJ1xuXG5jb25zdCB0cmltRGF0ZSA9IHRleHQgPT4gKCh0ZXh0ID09IG51bGwpID8gJycgOiB0ZXh0LnJlcGxhY2UoL1xcLlswLTldKy8sICcnKSlcblxuY29uc3QgdXNlckFzU3RyaW5nID0gKHsgX2lkOiB2YWxJZCB9LCB1c2VyKSA9PiB7XG4gIGxldCB2YWxSZXBcbiAgY29uc3QgeyBlbnRpdGllczogeyBbdmFsSWRdOiBlbnRpdHkgfSB9ID0gdXNlclxuICBpZiAoZW50aXR5KSB7XG4gICAgY29uc3QgeyB2YWx1ZXM6IHsgZXBwbiwgZmlyc3ROYW1lLCBsYXN0TmFtZSwgZW1haWxQcmUsIGF1dGhvcml0eSwgbWF5TG9naW4gfSB9ID0gZW50aXR5XG4gICAgY29uc3QgZW1haWwgPSBlbWFpbFByZSB8fCAnJ1xuICAgIGxldCBsaW5rVGV4dCA9IFtmaXJzdE5hbWUgfHwgJycsIGxhc3ROYW1lIHx8ICcnXS5maWx0ZXIoeCA9PiB4KS5qb2luKCcgJylcbiAgICBpZiAobGlua1RleHQgPT0gJycpIHtsaW5rVGV4dCA9IGVtYWlsfVxuICAgIGNvbnN0IG5hbWVQYXJ0ID0gKGxpbmtUZXh0ICYmIGVtYWlsKSA/IChcbiAgICAgIGBbJHtsaW5rVGV4dH1dKG1haWx0bzoke2VtYWlsfSlgXG4gICAgKSA6IChcbiAgICAgIGxpbmtUZXh0ICsgZW1haWxcbiAgICApXG4gICAgY29uc3QgZXBwblBhcnQgPSBlcHBuID8gYCBlcHBuPSR7ZXBwbn0gYCA6ICcnXG4gICAgY29uc3QgYXV0aG9yaXR5UGFydCA9IGF1dGhvcml0eSA/IGAgYXV0aGVudGljYXRlZCBieT0ke2F1dGhvcml0eX0gYCA6ICcnXG4gICAgY29uc3QgbWF5TG9naW5QYXJ0ID0gbWF5TG9naW4gPyBgIGFjdGl2ZT0ke21heUxvZ2lufSBgIDogJydcbiAgICB2YWxSZXAgPSBbbmFtZVBhcnQsIGVwcG5QYXJ0LCBhdXRob3JpdHlQYXJ0LCBtYXlMb2dpblBhcnRdLmZpbHRlcih4ID0+IHgpLmpvaW4oJzsgJylcbiAgfVxuICBlbHNlIHtcbiAgICB2YWxSZXAgPSAnVU5LTk9XTidcbiAgfVxuICByZXR1cm4gdmFsUmVwXG59XG5cbmNvbnN0IGNvdW50cnlBc1N0cmluZyA9ICh7IF9pZDogdmFsSWQgfSwgY291bnRyeSkgPT4ge1xuICBjb25zdCB7IGVudGl0aWVzOiB7IFt2YWxJZF06IGVudGl0eSB9IH0gPSBjb3VudHJ5XG4gIGlmIChlbnRpdHkpIHtcbiAgICBjb25zdCB7IHZhbHVlczogeyBuYW1lLCBpc28gfSB9ID0gZW50aXR5XG4gICAgcmV0dXJuIGAke2lzb306ICR7bmFtZX1gXG4gIH1cbiAgZWxzZSB7XG4gICAgcmV0dXJuICdVTktOT1dOJ1xuICB9XG59XG5cbmNvbnN0IHZhbHVlQXNTdHJpbmcgPSAodmFsdWUsIHsgdmFsVHlwZSwgY29udmVydCwgaW5pdGlhbCwgdXNlciwgY291bnRyeSB9KSA9PiB7XG4gIGlmICh2YWx1ZSA9PSBudWxsKSB7cmV0dXJuICcnfVxuICBzd2l0Y2ggKHZhbFR5cGUpIHtcbiAgICBjYXNlICdyZWwnOiB7XG4gICAgICBzd2l0Y2ggKGNvbnZlcnQpIHtcbiAgICAgICAgY2FzZSAndXNlcic6IHtcbiAgICAgICAgICByZXR1cm4gdXNlckFzU3RyaW5nKHZhbHVlLCB1c2VyKVxuICAgICAgICB9XG4gICAgICAgIGNhc2UgJ2NvdW50cnknOiB7XG4gICAgICAgICAgcmV0dXJuIGNvdW50cnlBc1N0cmluZyh2YWx1ZSwgY291bnRyeSlcbiAgICAgICAgfVxuICAgICAgICBkZWZhdWx0OiByZXR1cm4gdmFsdWUudmFsdWVcbiAgICAgIH1cbiAgICB9XG4gICAgY2FzZSAnZGF0ZXRpbWUnOiB7XG4gICAgICByZXR1cm4gdHJpbURhdGUodmFsdWUpXG4gICAgfVxuICAgIGRlZmF1bHQ6IHtcbiAgICAgIHJldHVybiB2YWx1ZVxuICAgIH1cbiAgfVxufVxuXG5jb25zdCBJdGVtRmllbGQgPSAoeyBsYWJlbCwgdmFsdWVzLCB2YWxUeXBlLCBjb252ZXJ0LCBpbml0aWFsLCB1c2VyLCBjb3VudHJ5IH0pID0+IHtcbiAgY29uc3QgcHJvcHMgPSB7IHZhbFR5cGUsIGNvbnZlcnQsIGluaXRpYWwsIHVzZXIsIGNvdW50cnkgfVxuICByZXR1cm4gKFxuICAgIDxwPlxuICAgICAgPGxhYmVsPjxiPntsYWJlbH06PC9iPjwvbGFiZWw+eycgJ31cbiAgICAgIHtcbiAgICAgICAgdmFsdWVzLm1hcCgodmFsdWUsIGkpID0+IChcbiAgICAgICAgICA8c3BhbiBrZXk9e2l9PnsoaSAhPSAwKT8nIHwgJyA6ICcnfTxzcGFuPnt2YWx1ZUFzU3RyaW5nKHZhbHVlLCBwcm9wcyl9PC9zcGFuPjwvc3Bhbj5cbiAgICAgICAgKSlcbiAgICAgIH1cbiAgICA8L3A+XG4gIClcbn1cblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChjb21iaW5lU2VsZWN0b3JzKGdldFVzZXIsIGdldENvdW50cnkpKShJdGVtRmllbGQpXG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgQWx0ZXJuYXRpdmUgZnJvbSAnQWx0ZXJuYXRpdmUuanN4J1xuaW1wb3J0IEl0ZW1SZWNvcmQgZnJvbSAnSXRlbVJlY29yZC5qc3gnXG5pbXBvcnQgTmF2TGluayBmcm9tICdOYXZMaW5rLmpzeCdcblxuY29uc3QgSXRlbUhlYWQgPSAoeyB0YWJsZSwgdmFsdWVzLCB0aXRsZSwgaW5wbGFjZSB9KSA9PiB7XG4gIGNvbnN0IHsgX2lkOiBlSWQsIFt0aXRsZV06IGVudGl0eUhlYWRQcmUgfSA9IHZhbHVlc1xuICBsZXQgZW50aXR5SGVhZFxuICBpZiAoIWVudGl0eUhlYWRQcmUpIHtlbnRpdHlIZWFkID0gJy1lbXB0eS0nfVxuICBlbHNlIHtcbiAgICBbZW50aXR5SGVhZF0gPSBlbnRpdHlIZWFkUHJlXG4gICAgaWYgKHR5cGVvZiBlbnRpdHlIZWFkID09ICdvYmplY3QnKSB7XG4gICAgICBjb25zdCB7IHZhbHVlIH0gPSBlbnRpdHlIZWFkXG4gICAgICBlbnRpdHlIZWFkID0gdmFsdWVcbiAgICB9XG4gIH1cblxuICBjb25zdCBjb250cm9sMSA9IGhhbmRsZXIgPT4gKDxzcGFuIGNsYXNzTmFtZT1cImJ1dHRvbi1zbWFsbCBmYSBmYS1jaGV2cm9uLWRvd25cIiBvbkNsaWNrPXtoYW5kbGVyfSAvPilcbiAgY29uc3QgY29udHJvbDIgPSBoYW5kbGVyID0+ICg8c3BhbiBjbGFzc05hbWU9XCJidXR0b24tc21hbGwgZmEgZmEtY2hldnJvbi1yaWdodFwiIG9uQ2xpY2s9e2hhbmRsZXJ9IC8+KVxuICBjb25zdCBjb250cm9sUGxhY2VtZW50ID0gY29udHJvbCA9PiAoXG4gICAgPHA+XG4gICAgICB7Y29udHJvbH1cbiAgICAgIDxzcGFuPlxuICAgICAgICB7ZW50aXR5SGVhZH1cbiAgICAgIDwvc3Bhbj5cbiAgICA8L3A+XG4gIClcblxuICByZXR1cm4gKFxuICAgIDx0ciBpZD17ZUlkfSA+XG4gICAgICA8dGQ+e1xuICAgICAgICBpbnBsYWNlID8gKFxuICAgICAgICAgIDxBbHRlcm5hdGl2ZVxuICAgICAgICAgICAgdGFnPXtgJHt0YWJsZX1fJHtlSWR9YH1cbiAgICAgICAgICAgIGNvbnRyb2xQbGFjZW1lbnQ9e2NvbnRyb2xQbGFjZW1lbnR9XG4gICAgICAgICAgICBjb250cm9scz17W2NvbnRyb2wxLCBjb250cm9sMl19XG4gICAgICAgICAgICBhbHRlcm5hdGl2ZXM9e1soXG4gICAgICAgICAgICAgIDxJdGVtUmVjb3JkXG4gICAgICAgICAgICAgICAga2V5PVwic2hvd1wiXG4gICAgICAgICAgICAgICAgdGFibGU9e3RhYmxlfVxuICAgICAgICAgICAgICAgIGVJZD17ZUlkfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgKSwgJyddfVxuICAgICAgICAgICAgaW5pdGlhbD17MX1cbiAgICAgICAgICAvPlxuICAgICAgICApIDogKFxuICAgICAgICAgIDxOYXZMaW5rIGNsYXNzTmFtZT1cIm5hdlwiIHRvPXtgLyR7dGFibGV9L215bGlzdC8ke2VJZH1gfSA+XG4gICAgICAgICAgICA8c3Bhbj5cbiAgICAgICAgICAgICAge2VudGl0eUhlYWR9XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgPC9OYXZMaW5rPlxuICAgICAgICApXG4gICAgICB9XG4gICAgICA8L3RkPlxuICAgIDwvdHI+XG4gIClcbn1cblxuZXhwb3J0IGRlZmF1bHQgSXRlbUhlYWRcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCdcbmltcG9ydCBJdGVtSGVhZCBmcm9tICdJdGVtSGVhZC5qc3gnXG5pbXBvcnQgeyBnZXRUYWJsZXMgfSBmcm9tICd0YWJsZXMuanMnXG5cbmNvbnN0IEl0ZW1MaXN0ID0gKHsgdGFibGVzLCB0YWJsZSwgdGl0bGUsIGZpbHRlcmVkRGF0YSwgaW5wbGFjZSB9KSA9PiB7XG4gIGNvbnN0IHsgW3RhYmxlXTogeyBlbnRpdGllcyB9IH0gPSB0YWJsZXMgXG4gIHJldHVybiAoXG4gICAgPGRpdj5cbiAgICAgIDx0YWJsZT5cbiAgICAgICAgPHRib2R5PntcbiAgICAgICAgZmlsdGVyZWREYXRhLm1hcChlSWQgPT4ge1xuICAgICAgICAgIGNvbnN0IHsgdmFsdWVzIH0gPSBlbnRpdGllc1tlSWRdXG4gICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxJdGVtSGVhZCBrZXk9e2VJZH0gdGFibGU9e3RhYmxlfSB0aXRsZT17dGl0bGV9IHZhbHVlcz17dmFsdWVzfSBpbnBsYWNlPXtpbnBsYWNlfSAvPlxuICAgICAgICAgIClcbiAgICAgICAgfSlcbiAgICAgICAgfTwvdGJvZHk+XG4gICAgICA8L3RhYmxlPlxuICAgIDwvZGl2PlxuICApXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QoZ2V0VGFibGVzKShJdGVtTGlzdClcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcblxuaW1wb3J0IEl0ZW1SZWNvcmQgZnJvbSAnSXRlbVJlY29yZC5qc3gnXG5cbmNvbnN0IEl0ZW1SZWNvcmRQcmUgPSAoeyBwYXJhbXM6IHsgdGFibGUsIGVJZCB9LCByb3V0ZTogeyBvd25Pbmx5IH0gfSkgPT4gKFxuICA8SXRlbVJlY29yZCB0YWJsZT17dGFibGV9IGVJZD17ZUlkfSBvd25Pbmx5PXtvd25Pbmx5fSAvPlxuKVxuXG5leHBvcnQgZGVmYXVsdCBJdGVtUmVjb3JkUHJlXG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBMaW5rIH0gZnJvbSAncmVhY3Qtcm91dGVyJ1xuXG5jb25zdCBOYXZMaW5rID0gcHJvcHMgPT4gPExpbmsgey4uLnByb3BzfSBhY3RpdmVDbGFzc05hbWU9XCJhY3RpdmVcIiAvPlxuXG5leHBvcnQgZGVmYXVsdCBOYXZMaW5rXG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5cbmNvbnN0IE5vdEZvdW5kID0gKHtwYXJhbXM6IHsgc3BsYXQgfSB9KSA9PiAoPGgxPnsnNDA0OiAnfTxjb2RlPntzcGxhdH08L2NvZGU+eycgbm90IGZvdW5kIG9uIHRoaXMgc2l0ZS4nfTwvaDE+KVxuXG5leHBvcnQgZGVmYXVsdCBOb3RGb3VuZFxuXG4iLCJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4J1xuaW1wb3J0IHsgZ2V0V2luRGltLCBjb2x1bW5TdHlsZSB9IGZyb20gJ3dpbi5qcydcblxuY29uc3QgUGFuZSA9ICh7IGZvcm1hdCwgcG9zaXRpb24sIGNoaWxkcmVuLCBoZWlnaHQsIHdpZHRoIH0pID0+IChcbiAgPGRpdlxuICAgIGNsYXNzTmFtZT17Zm9ybWF0fVxuICAgIHN0eWxlPXtjb2x1bW5TdHlsZShwb3NpdGlvbiwgeyBoZWlnaHQsIHdpZHRoIH0pfVxuICA+XG4gICAge2NoaWxkcmVufVxuICA8L2Rpdj5cbilcblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChnZXRXaW5EaW0pKFBhbmUpXG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBQcm92aWRlciB9IGZyb20gJ3JlYWN0LXJlZHV4J1xuaW1wb3J0IFdpbmRvdyBmcm9tICdXaW5kb3cuanN4J1xuXG5jb25zdCBSb290ID0gKHsgc3RvcmUsIGNoaWxkcmVuIH0pID0+IChcbiAgPFByb3ZpZGVyIHN0b3JlPXtzdG9yZX0+XG4gICAgPFdpbmRvdz5cbiAgICAgIHtjaGlsZHJlbn1cbiAgICA8L1dpbmRvdz5cbiAgPC9Qcm92aWRlcj5cbilcblxuZXhwb3J0IGRlZmF1bHQgUm9vdFxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuXG5jb25zdCBTdGF0ID0gKHtzdWJUb3RhbCwgdG90YWx9KSA9PiAoXG4gIDxzcGFuIGNsYXNzTmFtZT1cImdvb2Qtb1wiID5cbiAgICB7c3ViVG90YWwgPT0gbnVsbCA/ICcnIDogYCR7c3ViVG90YWx9YH1cbiAgICB7KHRvdGFsID09IG51bGwgfHwgc3ViVG90YWwgPT0gbnVsbCkgPyAnJyA6ICcgb2YgJ31cbiAgICA8c3Ryb25nPnt0b3RhbCA9PSBudWxsID8gJycgOiBgJHt0b3RhbH1gfTwvc3Ryb25nPlxuICA8L3NwYW4+XG4pXG5cbmV4cG9ydCBkZWZhdWx0IFN0YXRcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCBOYXZMaW5rIGZyb20gJ05hdkxpbmsuanN4J1xuXG5jb25zdCBTdGF0aWMgPSAoKSA9PiAoXG4gIDxzcGFuIGNsYXNzTmFtZT1cInNtYWxsXCIgPlxuICAgIDxOYXZMaW5rIHRvPVwiL2RvY3MvYWJvdXQubWRcIiA+eydBYm91dCd9PC9OYXZMaW5rPlxuICAgIDxOYXZMaW5rIHRvPVwiL3RlY2gvZG9jcy9kZXNpZ24ucGRmXCIgPnsnZGlhZ3JhbXMnfTwvTmF2TGluaz5cbiAgICA8TmF2TGluayB0bz1cIi90ZWNoL2RvY3MvZGVwbG95Lm1kXCIgPnsnZGVwbG95J308L05hdkxpbms+XG4gICAgPGEgaHJlZj1cIi9hcGkvZmlsZS90ZWNoL2RvY3MvZ2VuL2luZGV4Lmh0bWxcIiB0YXJnZXQ9XCJfYmxhbmtcIiByZWw9XCJub29wZW5lciBub3JlZmVycmVyXCIgPnsndGVjaCBkb2MnfTwvYT5cbiAgPC9zcGFuPlxuKVxuXG5leHBvcnQgZGVmYXVsdCBTdGF0aWNcblxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4J1xuaW1wb3J0IE5hdkxpbmsgZnJvbSAnTmF2TGluay5qc3gnXG5pbXBvcnQgUGFuZSBmcm9tICdQYW5lLmpzeCdcbmltcG9ydCB7IGdldFdpbkRpbSB9IGZyb20gJ3dpbi5qcydcblxuY29uc3QgU3ViQXBwID0gKHtwYXJhbXM6IHsgdGFibGUgfSwgY2hpbGRyZW4sIGhlaWdodCwgd2lkdGggfSkgPT4gKFxuICA8ZGl2PlxuICAgIDxQYW5lIGZvcm1hdD1cIm5hdiBzaXplZFwiIHBvc2l0aW9uPVwibGVmdFwiPlxuICAgICAgeyh0YWJsZSA9PSAnY29udHJpYicpID8gKFxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxwPjxOYXZMaW5rIHRvPXtgLyR7dGFibGV9L2xpc3RgfSA+eydBbGwgaXRlbXMnfTwvTmF2TGluaz48L3A+XG4gICAgICAgICAgPHA+PE5hdkxpbmsgdG89e2AvJHt0YWJsZX0vbXlsaXN0YH0gPnsnTXkgd29yayd9PC9OYXZMaW5rPjwvcD5cbiAgICAgICAgPC9kaXY+XG4gICAgICApIDogKFxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIDxwPjxOYXZMaW5rIHRvPXtgLyR7dGFibGV9L3R5cGVgfSA+eydUeXBlcyd9PC9OYXZMaW5rPjwvcD5cbiAgICAgICAgICA8cD48TmF2TGluayB0bz17YC8ke3RhYmxlfS9hc3Nlc3NgfSA+eydDcml0ZXJpYSd9PC9OYXZMaW5rPjwvcD5cbiAgICAgICAgICA8cD48TmF2TGluayB0bz17YC8ke3RhYmxlfS9wYWNrYWdlYH0gPnsnUGFja2FnZXMnfTwvTmF2TGluaz48L3A+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKX1cbiAgICA8L1BhbmU+XG4gICAgPFBhbmUgZm9ybWF0PVwic2l6ZWRcIiBwb3NpdGlvbj1cInJpZ2h0XCI+XG4gICAgICB7IGNoaWxkcmVuIH1cbiAgICA8L1BhbmU+XG4gIDwvZGl2PlxuKVxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KGdldFdpbkRpbSkoU3ViQXBwKVxuIiwiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCdcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCdcbmltcG9ydCBNYXJrZG93biBmcm9tICdyZWFjdC1tYXJrZG93bidcbmltcG9ydCB7IExpbmsgfSBmcm9tICdyZWFjdC1yb3V0ZXInXG5pbXBvcnQgQWx0ZXJuYXRpdmUgZnJvbSAnQWx0ZXJuYXRpdmUuanN4J1xuaW1wb3J0IHsgZmV0Y2hEYXRhIH0gZnJvbSAnc2VydmVyLmpzJ1xuaW1wb3J0IHsgZ2V0RG9jIH0gZnJvbSAnZG9jLmpzJ1xuXG5jb25zdCBSb3V0ZXJMaW5rID0gKHsgY2hpbGRyZW4sIGhyZWYgfSkgPT4gKFxuICBocmVmLm1hdGNoKC9eKGh0dHBzPzopP1xcL1xcLy8pXG4gICAgPyA8YSBocmVmPXtocmVmfSA+e2NoaWxkcmVufTwvYT5cbiAgICA6IDxMaW5rIHRvPXtocmVmfSA+e2NoaWxkcmVufTwvTGluaz5cbilcblxuY2xhc3MgRG9jTWQgZXh0ZW5kcyBDb21wb25lbnQge1xuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge3Byb3BzOiB7IGRvY05hbWUsIGRhdGEgfSB9ID0gdGhpc1xuICAgIGNvbnN0IGNvbnRyb2xQbGFjZW1lbnQgPSBjb250cm9sID0+IDxwIHN0eWxlPXt7ZmxvYXQ6ICdyaWdodCd9fSA+e2NvbnRyb2x9PC9wPlxuICAgIGNvbnN0IGNvbnRyb2wxID0gaGFuZGxlciA9PiA8YSBjbGFzc05hbWU9XCJjb250cm9sIGZhIGZhLWhhbmQtby1kb3duXCIgaHJlZj1cIiNcIiB0aXRsZT1cIm1hcmtkb3duIHNvdXJjZVwiIG9uQ2xpY2s9e2hhbmRsZXJ9IC8+XG4gICAgY29uc3QgY29udHJvbDIgPSBoYW5kbGVyID0+IDxhIGNsYXNzTmFtZT1cImNvbnRyb2wgZmEgZmEtZmlsZS1jb2RlLW9cIiBocmVmPVwiI1wiIHRpdGxlPVwiZm9ybWF0dGVkXCIgb25DbGljaz17aGFuZGxlcn0gLz5cblxuICAgIGlmIChkYXRhID09IG51bGwpIHtcbiAgICAgIHJldHVybiA8ZGl2PntgTm8gZG9jdW1lbnQgJHtkb2NOYW1lfWB9PC9kaXY+XG4gICAgfVxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IHN0eWxlPXt7cGFkZGluZ0xlZnQ6ICcwLjVlbSd9fSA+XG4gICAgICAgIDxBbHRlcm5hdGl2ZVxuICAgICAgICAgIHRhZz17ZG9jTmFtZX1cbiAgICAgICAgICBjb250cm9sUGxhY2VtZW50PXtjb250cm9sUGxhY2VtZW50fVxuICAgICAgICAgIGNvbnRyb2xzPXtbY29udHJvbDEsIGNvbnRyb2wyXX1cbiAgICAgICAgICBhbHRlcm5hdGl2ZXM9e1soXG4gICAgICAgICAgICA8ZGl2IGtleT1cImZtdFwiID5cbiAgICAgICAgICAgICAgPE1hcmtkb3duXG4gICAgICAgICAgICAgICAgc291cmNlPXtkYXRhfVxuICAgICAgICAgICAgICAgIHJlbmRlcmVycz17e0xpbms6IFJvdXRlckxpbmt9fVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKSwgKFxuICAgICAgICAgICAgPGRpdiBrZXk9XCJzcmNcIiA+XG4gICAgICAgICAgICAgIDxwcmUgY2xhc3NOYW1lPVwibWQtc291cmNlXCIgPntkYXRhfTwvcHJlPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKV19XG4gICAgICAgIC8+XG4gICAgICA8L2Rpdj5cbiAgICApXG4gIH1cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgY29uc3Qge3Byb3BzOiB7IGRvY0RpciwgZG9jTmFtZSwgZG9jRXh0LCBmZXRjaCB9IH0gPSB0aGlzXG4gICAgY29uc3QgcGF0aCA9IGAke2RvY0Rpcn0vJHtkb2NOYW1lfS4ke2RvY0V4dH1gXG4gICAgZmV0Y2goeyB0eXBlOiAnZmV0Y2hEb2MnLCBjb250ZW50VHlwZTogJ2pzb24nLCBwYXRoLCBkZXNjOiBgZG9jdW1lbnQgJHtkb2NOYW1lfWAgfSlcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KGdldERvYywgeyBmZXRjaDogZmV0Y2hEYXRhIH0pKERvY01kKVxuIiwiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4J1xuaW1wb3J0IEl0ZW1MaXN0IGZyb20gJ0l0ZW1MaXN0LmpzeCdcbmltcG9ydCBGaWx0ZXIgZnJvbSAnRmlsdGVyLmpzeCdcbmltcG9ydCBQYW5lIGZyb20gJ1BhbmUuanN4J1xuXG5pbXBvcnQgeyBzZXR1cEZpbHRlcmluZywgZ2V0RmlsdGVyQXBwbGllZCB9IGZyb20gJ2ZpbHRlci5qcydcblxuY2xhc3MgRmlsdGVyQ29tcHV0ZSBleHRlbmRzIENvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIoKVxuICAgIGNvbnN0IHsgdGFibGVzLCB0YWJsZSwgaW5pdGlhbGl6ZWQsIGluaXQgfSA9IHByb3BzXG4gICAgaWYgKCFpbml0aWFsaXplZCkge2luaXQodGFibGUsIHRhYmxlcyl9XG4gIH1cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgcHJvcHM6IHsgaW5pdGlhbGl6ZWQgfSB9ID0gdGhpc1xuICAgIGlmICghaW5pdGlhbGl6ZWQpIHtyZXR1cm4gPGRpdi8+fVxuICAgIGNvbnN0IHsgcHJvcHM6IHsgdGFibGVzLCB0YWJsZSwgZmlsdGVyZWREYXRhLCBmaWx0ZXJlZEFtb3VudE90aGVycywgYW1vdW50c30gfSA9IHRoaXNcbiAgICBjb25zdCB7IFt0YWJsZV06IHsgb3JkZXIsIHRpdGxlIH0gfSA9IHRhYmxlc1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICA8UGFuZSBmb3JtYXQ9XCJzaXplZFwiIHBvc2l0aW9uPVwicmlnaHRMZWZ0XCI+XG4gICAgICAgICAgPHA+eydUb3RhbCAnfTxzcGFuIGNsYXNzTmFtZT1cImdvb2Qtb1wiID57b3JkZXIubGVuZ3RofTwvc3Bhbj48L3A+XG4gICAgICAgICAgPEZpbHRlclxuICAgICAgICAgICAgdGFibGU9e3RhYmxlfVxuICAgICAgICAgICAgZmlsdGVyZWRBbW91bnQ9e2ZpbHRlcmVkRGF0YS5sZW5ndGh9XG4gICAgICAgICAgICBmaWx0ZXJlZEFtb3VudE90aGVycz17ZmlsdGVyZWRBbW91bnRPdGhlcnN9XG4gICAgICAgICAgICBhbW91bnRzPXthbW91bnRzfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvUGFuZT5cbiAgICAgICAgPFBhbmUgZm9ybWF0PVwic2l6ZWRcIiBwb3NpdGlvbj1cInJpZ2h0UmlnaHRcIj5cbiAgICAgICAgICA8SXRlbUxpc3QgdGFibGU9e3RhYmxlfSB0aXRsZT17dGl0bGV9IGZpbHRlcmVkRGF0YT17ZmlsdGVyZWREYXRhfSBpbnBsYWNlPXt0cnVlfSAvPlxuICAgICAgICA8L1BhbmU+XG4gICAgICA8L2Rpdj5cbiAgICApXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChnZXRGaWx0ZXJBcHBsaWVkLCB7IGluaXQ6IHNldHVwRmlsdGVyaW5nIH0pKEZpbHRlckNvbXB1dGUpXG4iLCJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnXG5cbmltcG9ydCBGaWx0ZXJDb21wdXRlIGZyb20gJ0ZpbHRlckNvbXB1dGUuanN4J1xuaW1wb3J0IHsgZmV0Y2hEYXRhIH0gZnJvbSAnc2VydmVyLmpzJ1xuaW1wb3J0IHsgZ2V0VGFibGVzIH0gZnJvbSAndGFibGVzLmpzJ1xuXG5jbGFzcyBJdGVtRmlsdGVyZWQgZXh0ZW5kcyBDb21wb25lbnQge1xuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBwcm9wczogeyBwYXJhbXM6IHsgdGFibGUgfSwgdGFibGVzIH0gfSA9IHRoaXNcbiAgICBpZiAodGFibGVzID09IG51bGwgfHwgdGFibGVzW3RhYmxlXSA9PSBudWxsIHx8IHRhYmxlcy5jb3VudHJ5ID09IG51bGwgfHwgdGFibGVzLnVzZXIgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIDxkaXYgLz5cbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgIDxGaWx0ZXJDb21wdXRlIHRhYmxlPXt0YWJsZX0gLz5cbiAgICApXG4gIH1cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgY29uc3QgeyBwcm9wczogeyBwYXJhbXM6IHsgdGFibGUgfSwgdGFibGVzLCBmZXRjaCwgfSB9ID0gdGhpc1xuICAgIGlmICh0YWJsZXMgPT0gbnVsbCB8fCB0YWJsZXNbdGFibGVdID09IG51bGwpIHtcbiAgICAgIGZldGNoKHsgdHlwZTogJ2ZldGNoVGFibGUnLCBjb250ZW50VHlwZTogJ2RiJywgcGF0aDogYC9saXN0P3RhYmxlPSR7dGFibGV9YCwgZGVzYzogYCR7dGFibGV9IHRhYmxlYCwgdGFibGUgfSlcbiAgICB9XG4gICAgaWYgKHRhYmxlcyA9PSBudWxsIHx8IHRhYmxlcy5jb3VudHJ5ID09IG51bGwpIHtcbiAgICAgIGZldGNoKHsgdHlwZTogJ2ZldGNoVGFibGUnLCBjb250ZW50VHlwZTogJ2RiJywgcGF0aDogYC9tZW1iZXJfY291bnRyeWAsIGRlc2M6IGBjb3VudHJ5IHRhYmxlYCwgdGFibGU6ICdjb3VudHJ5JyB9KVxuICAgIH1cbiAgICBpZiAodGFibGVzID09IG51bGwgfHwgdGFibGVzLnVzZXIgPT0gbnVsbCkge1xuICAgICAgZmV0Y2goeyB0eXBlOiAnZmV0Y2hUYWJsZScsIGNvbnRlbnRUeXBlOiAnZGInLCBwYXRoOiBgL3VzZXJgLCBkZXNjOiBgdXNlciB0YWJsZWAsIHRhYmxlOiAndXNlcicgfSlcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChnZXRUYWJsZXMsIHsgZmV0Y2g6IGZldGNoRGF0YSB9KShJdGVtRmlsdGVyZWQpXG4iLCJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnXG5pbXBvcnQgeyBmZXRjaERhdGEgfSBmcm9tICdzZXJ2ZXIuanMnXG5pbXBvcnQgeyBnZXRUYWJsZXMgfSBmcm9tICd0YWJsZXMuanMnXG5cbmltcG9ydCBJdGVtTGlzdCBmcm9tICdJdGVtTGlzdC5qc3gnXG5pbXBvcnQgUGFuZSBmcm9tICdQYW5lLmpzeCdcblxuY2xhc3MgSXRlbU15IGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtcbiAgICAgIHByb3BzOiB7IHBhcmFtczogeyB0YWJsZSB9LCB0YWJsZXMsIGNoaWxkcmVuIH0sXG4gICAgfSA9IHRoaXNcbiAgICBpZiAoXG4gICAgICB0YWJsZXMgPT0gbnVsbCB8fCB0YWJsZXNbdGFibGVdID09IG51bGwgfHwgdGFibGVzW3RhYmxlXS5teSA9PSBudWxsIHx8XG4gICAgICB0YWJsZXMuY291bnRyeSA9PSBudWxsIHx8IHRhYmxlcy51c2VyID09IG51bGxcbiAgICApIHtcbiAgICAgIHJldHVybiA8ZGl2IC8+XG4gICAgfVxuICAgIGNvbnN0IHsgZW50aXRpZXMsIHRpdGxlLCBwZXJtLCBteSB9ID0gdGFibGVzW3RhYmxlXVxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICA8UGFuZSBmb3JtYXQ9XCJuYXYgc2l6ZWRcIiBwb3NpdGlvbj1cInJpZ2h0TGVmdE5hdlwiPlxuICAgICAgICAgIDxwPlxuICAgICAgICAgICAge2Ake215Lmxlbmd0aH0gaXRlbXMgYH1cbiAgICAgICAgICAgIHsocGVybSAhPSBudWxsICYmIHBlcm0uaW5zZXJ0KSA/IChcbiAgICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmYSBmYS1wbHVzIGJ1dHRvbi1sYXJnZSBpbnNlcnRcIlxuICAgICAgICAgICAgICAgIHRpdGxlPVwiTmV3IGl0ZW1cIlxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgKSA6IG51bGx9XG4gICAgICAgICAgPC9wPlxuICAgICAgICAgIDxJdGVtTGlzdCB0YWJsZT17dGFibGV9IHRpdGxlPXt0aXRsZX0gZmlsdGVyZWREYXRhPXtteX0gaW5wbGFjZT17ZmFsc2V9IC8+XG4gICAgICAgIDwvUGFuZT5cbiAgICAgICAgPFBhbmUgZm9ybWF0PVwic2l6ZWRcIiBwb3NpdGlvbj1cInJpZ2h0UmlnaHRCb2R5XCI+XG4gICAgICAgICAgeyBjaGlsZHJlbiB9XG4gICAgICAgIDwvUGFuZT5cbiAgICAgIDwvZGl2PlxuICAgIClcbiAgfVxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICBjb25zdCB7XG4gICAgICBwcm9wczoge1xuICAgICAgICBwYXJhbXM6IHsgdGFibGUgfSxcbiAgICAgICAgdGFibGVzLFxuICAgICAgICBmZXRjaCxcbiAgICAgIH0sXG4gICAgfSA9IHRoaXNcbiAgICBpZiAodGFibGVzID09IG51bGwgfHwgdGFibGVzW3RhYmxlXSA9PSBudWxsIHx8IHRhYmxlc1t0YWJsZV0ubXkgPT0gbnVsbCkge1xuICAgICAgZmV0Y2goeyB0eXBlOiAnZmV0Y2hUYWJsZU15JywgY29udGVudFR5cGU6ICdkYicsIHBhdGg6IGAvbXk/dGFibGU9JHt0YWJsZX1gLCBkZXNjOiBgJHt0YWJsZX0gdGFibGUgKG15IHJlY29yZHMpYCwgdGFibGUgfSlcbiAgICB9XG4gICAgaWYgKHRhYmxlcyA9PSBudWxsIHx8IHRhYmxlcy5jb3VudHJ5ID09IG51bGwpIHtcbiAgICAgIGZldGNoKHsgdHlwZTogJ2ZldGNoVGFibGUnLCBjb250ZW50VHlwZTogJ2RiJywgcGF0aDogYC9tZW1iZXJfY291bnRyeWAsIGRlc2M6IGBjb3VudHJ5IHRhYmxlYCwgdGFibGU6ICdjb3VudHJ5JyB9KVxuICAgIH1cbiAgICBpZiAodGFibGVzID09IG51bGwgfHwgdGFibGVzLnVzZXIgPT0gbnVsbCkge1xuICAgICAgZmV0Y2goeyB0eXBlOiAnZmV0Y2hUYWJsZScsIGNvbnRlbnRUeXBlOiAnZGInLCBwYXRoOiBgL3VzZXJgLCBkZXNjOiBgdXNlciB0YWJsZWAsIHRhYmxlOiAndXNlcicgfSlcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChnZXRUYWJsZXMsIHsgZmV0Y2g6IGZldGNoRGF0YSB9KShJdGVtTXkpXG5cblxuIiwiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4J1xuXG5pbXBvcnQgeyBmZXRjaERhdGEgfSBmcm9tICdzZXJ2ZXIuanMnXG5pbXBvcnQgeyBnZXRUYWJsZXMgfSBmcm9tICd0YWJsZXMuanMnXG5cbmltcG9ydCBJdGVtRmllbGQgZnJvbSAnSXRlbUZpZWxkLmpzeCdcblxuY2xhc3MgSXRlbVJlY29yZCBleHRlbmRzIENvbXBvbmVudCB7XG4gIHBhcnNlRmllbGRzKCkge1xuICAgIGNvbnN0IHsgcHJvcHM6IHsgdGFibGVzLCB0YWJsZSwgZUlkIH0gfSA9IHRoaXNcbiAgICBjb25zdCB7IFt0YWJsZV06IHsgZmllbGRTcGVjcywgZmllbGRPcmRlciB9IH0gPSB0YWJsZXNcbiAgICBjb25zdCBlbnRpdHkgPSB0aGlzLmdldEVudGl0eSgpXG4gICAgY29uc3QgeyBwZXJtLCBmaWVsZHMsIHZhbHVlcyB9ID0gZW50aXR5XG5cbiAgICBjb25zdCBmcmFnbWVudHMgPSBbXVxuICAgIGxldCBoYXNFZGl0YWJsZSA9IGZhbHNlXG4gICAgZm9yIChjb25zdCBuYW1lIG9mIGZpZWxkT3JkZXIpIHtcbiAgICAgIGNvbnN0IHsgW25hbWVdOiBmIH0gPSBmaWVsZHNcbiAgICAgIGlmIChmID09IG51bGwpIHtjb250aW51ZX1cbiAgICAgIGNvbnN0IHsgW25hbWVdOiB7IGxhYmVsLCBpbml0aWFsLCAuLi5zcGVjcyB9IH0gPSBmaWVsZFNwZWNzXG4gICAgICBjb25zdCB7IHVwZGF0ZTogeyBbbmFtZV06IGVkaXRhYmxlIH0gfSA9IHBlcm1cbiAgICAgIGlmIChlZGl0YWJsZSkge2hhc0VkaXRhYmxlID0gdHJ1ZX1cbiAgICAgIGZyYWdtZW50cy5wdXNoKFxuICAgICAgICA8SXRlbUZpZWxkXG4gICAgICAgICAga2V5PXtuYW1lfVxuICAgICAgICAgIHRhYmxlPXt0YWJsZX1cbiAgICAgICAgICBlSWQ9e2VJZH1cbiAgICAgICAgICBlZGl0YWJsZT17ISFlZGl0YWJsZX1cbiAgICAgICAgICBuYW1lPXtuYW1lfVxuICAgICAgICAgIGxhYmVsPXtsYWJlbH1cbiAgICAgICAgICB2YWx1ZXM9e3ZhbHVlc1tuYW1lXX1cbiAgICAgICAgICBpbml0aWFsPXtpbml0aWFsfVxuICAgICAgICAgIHsuLi5zcGVjc31cbiAgICAgICAgLz5cbiAgICAgIClcbiAgICB9XG4gICAgcmV0dXJuIHtmcmFnbWVudHMsIGhhc0VkaXRhYmxlfVxuICB9XG5cbiAgZ2V0RW50aXR5ID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgcHJvcHM6IHsgdGFibGVzLCB0YWJsZSwgZUlkICB9IH0gPSB0aGlzXG4gICAgY29uc3QgeyBbdGFibGVdOiB7IGVudGl0aWVzOiB7IFtlSWRdOiBlbnRpdHkgfSB9IH0gPSB0YWJsZXNcbiAgICByZXR1cm4gZW50aXR5XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge1xuICAgICAgcHJvcHM6IHsgdGFibGVzLCB0YWJsZSwgZUlkIH0sXG4gICAgfSA9IHRoaXNcbiAgICBpZiAodGhpcy5uZWVkVmFsdWVzKCkpIHtcbiAgICAgIHJldHVybiA8ZGl2IC8+XG4gICAgfVxuXG4gICAgY29uc3QgZW50aXR5ID0gdGhpcy5nZXRFbnRpdHkoKVxuICAgIGNvbnN0IHsgcGVybTogcGVybSB9ID0gZW50aXR5XG4gICAgY29uc3QgeyBmcmFnbWVudHMsIGhhc0VkaXRhYmxlIH0gPSB0aGlzLnBhcnNlRmllbGRzKClcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3aWRnZXQtbWVkaXVtXCIgPlxuICAgICAgICA8cD5yZWNvcmQgaW4ge3RhYmxlfTwvcD5cbiAgICAgICAgPHA+XG4gICAgICAgICAge2hhc0VkaXRhYmxlID8gW1xuICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAga2V5PVwic2F2ZVwiXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17YGJ1dHRvbi1sYXJnZWB9XG4gICAgICAgICAgICA+U2F2ZTwvc3Bhbj4sXG4gICAgICAgICAgICBwZXJtLmRlbGV0ZSA/IChcbiAgICAgICAgICAgICAgPHNwYW5cbiAgICAgICAgICAgICAgICBrZXk9XCJkZWxldGVcIlxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17J2ZhIGZhLXRyYXNoIGJ1dHRvbi1sYXJnZSBkZWxldGUnfVxuICAgICAgICAgICAgICAgIHRpdGxlPVwiZGVsZXRlIHRoaXMgaXRlbVwiXG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICApIDogbnVsbCxcbiAgICAgICAgICBdIDogbnVsbH1cbiAgICAgICAgPC9wPlxuICAgICAgICA8ZGl2PlxuICAgICAgICAgIHtmcmFnbWVudHN9XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKVxuICB9XG4gIGZldGNoRW50aXR5KCkge1xuICAgIGNvbnN0IHsgcHJvcHM6IHsgdGFibGUsIGVJZCwgb3duT25seSwgZmV0Y2ggfSB9ID0gdGhpc1xuICAgIGlmICh0aGlzLm5lZWRWYWx1ZXMoKSkge1xuICAgICAgZmV0Y2goe1xuICAgICAgICB0eXBlOiAnZmV0Y2hJdGVtJyxcbiAgICAgICAgY29udGVudFR5cGU6ICdkYicsXG4gICAgICAgIHBhdGg6IGAvdmlldz90YWJsZT0ke3RhYmxlfSZpZD0ke2VJZH0ke293bk9ubHkgPyAnJm93bj10cnVlJyA6ICcnfWAsXG4gICAgICAgIGRlc2M6IGAke3RhYmxlfSByZWNvcmQgJHtlSWR9YCxcbiAgICAgICAgdGFibGUsXG4gICAgICB9KVxuICAgIH1cbiAgfVxuICBuZWVkVmFsdWVzKCkge1xuICAgIGNvbnN0IHsgcHJvcHM6IHsgdGFibGVzLCB0YWJsZSwgZUlkIH0gfSA9IHRoaXNcbiAgICByZXR1cm4gKHRhYmxlcyA9PSBudWxsIHx8IHRhYmxlc1t0YWJsZV0gPT0gbnVsbCB8fCB0YWJsZXNbdGFibGVdLmVudGl0aWVzW2VJZF0gPT0gbnVsbCB8fCAhdGFibGVzW3RhYmxlXS5lbnRpdGllc1tlSWRdLmNvbXBsZXRlKVxuICB9XG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIGlmICh0aGlzLm5lZWRWYWx1ZXMoKSkge3RoaXMuZmV0Y2hFbnRpdHkoKX1cbiAgfVxuICBjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzKSB7XG4gICAgY29uc3QgeyB0YWJsZTogcHJldlRhYmxlLCBlSWQ6IHByZXZFSWQgfSA9IHByZXZQcm9wc1xuICAgIGNvbnN0IHsgcHJvcHM6IHsgdGFibGUsIGVJZCB9IH0gPSB0aGlzXG4gICAgaWYgKCh0YWJsZSAhPSBwcmV2VGFibGUgfHwgZUlkICE9IHByZXZFSWQpICYmIHRoaXMubmVlZFZhbHVlcygpKSB7dGhpcy5mZXRjaEVudGl0eSgpfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QoZ2V0VGFibGVzLCB7IGZldGNoOiBmZXRjaERhdGEgfSkoSXRlbVJlY29yZClcblxuIiwiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCdcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCdcbmltcG9ydCB7IGZldGNoRGF0YSB9IGZyb20gJ3NlcnZlci5qcydcbmltcG9ydCB7IGdldE1lIH0gZnJvbSAnbWUuanMnXG5cbmNsYXNzIExvZ2luIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgcHJvcHM6IHsgbWUgfSB9ID0gdGhpc1xuICAgIHJldHVybiAoXG4gICAgICA8c3BhbiBjbGFzc05hbWU9XCJsb2dpblwiID57XG4gICAgICAgIG1lLmVwcG4gJiYgT2JqZWN0LmtleXMobWUpLmxlbmd0aCA+IDAgPyAoXG4gICAgICAgICAgPHNwYW4+XG4gICAgICAgICAgICA8c3Ryb25nIGNsYXNzTmFtZT1cImZhIGZhLXVzZXJcIiB0aXRsZT17bWUuZXBwbn0gPnttZS5lcHBuLnNwbGl0KCdAJylbMF19PC9zdHJvbmc+XG4gICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJmYSBmYS1oYXNodGFnXCIgLz57bWUuYXV0aG9yaXR5fXsnICd9XG4gICAgICAgICAgICA8ZW0+e21lLmdyb3VwRGVzYyB8fCAnbm90IGF1dGhlbnRpY2F0ZWQnfTwvZW0+XG4gICAgICAgICAgICA8YSBocmVmPVwiL2xvZ291dFwiIGNsYXNzTmFtZT1cImNvbnRyb2wgZmEgZmEtdXNlci10aW1lc1wiIHRpdGxlPVwibG9nIG91dFwiIC8+XG4gICAgICAgICAgICA8YSBocmVmPVwiL3Nsb2dvdXRcIiBjbGFzc05hbWU9XCJjb250cm9sIGZhIGZhLXVzZXJzXCIgdGl0bGU9XCJzaWduIG91dFwiIC8+XG4gICAgICAgICAgPC9zcGFuPlxuICAgICAgICApIDogKFxuICAgICAgICAgIDxhIGhyZWY9XCIvbG9naW5cIiBjbGFzc05hbWU9XCJjb250cm9sIGZhIGZhLXVzZXItcGx1c1wiID57JyBsb2dpbid9PC9hPlxuICAgICAgICApfVxuICAgICAgPC9zcGFuPlxuICAgIClcbiAgfVxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICBjb25zdCB7IHByb3BzOiB7IGZldGNoIH0gfSA9IHRoaXNcbiAgICBmZXRjaCh7IHR5cGU6ICdmZXRjaE1lJywgY29udGVudFR5cGU6ICdkYicsIHBhdGg6ICcvd2hvL2FtaScsIGRlc2M6ICdtZScgfSlcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KGdldE1lLCB7IGZldGNoOiBmZXRjaERhdGEgfSkoTG9naW4pXG5cbiIsImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCdcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCdcbmltcG9ydCB7IGdldE5vdGlmaWNhdGlvbnMsIGNsZWFyLCBkaXNwbGF5IH0gZnJvbSAnbm90aWZ5LmpzJ1xuXG5jbGFzcyBOb3RpZmljYXRpb24gZXh0ZW5kcyBDb21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKVxuICAgIHRoaXMuZG9tID0ge31cbiAgfVxuICByZWZEb20gPSBsYWJlbCA9PiBkb20gPT4ge1xuICAgIGlmIChkb20pIHt0aGlzLmRvbVtsYWJlbF0gPSBkb219XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBwcm9wczogeyBub3RpZmljYXRpb25zLCBsYXN0TXNnLCBsYXN0Tm90ZSwgbGFzdEtpbmQsIGJ1c3ksIHNob3csIGRpc3BsYXksIGNsZWFyIH0gfSA9IHRoaXNcbiAgICBjb25zdCBoaWdobGlnaHQgPSBsYXN0Tm90ZSA+IC0xXG4gICAgY29uc3QgYnVzeUJsb2NrcyA9IG5ldyBBcnJheShidXN5KS5maWxsKDEpXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIDxwIGNsYXNzTmFtZT1cIm1zZy1zcGlubmVyXCIgPlxuICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICB0aXRsZT1cInNob3cvaGlkZSBub3RpZmljYXRpb25zIGFuZCBwcm9ncmVzcyBtZXNzYWdlc1wiXG4gICAgICAgICAgICBjbGFzc05hbWU9e2hpZ2hsaWdodCA/IGBzcGluLSR7bGFzdEtpbmR9YCA6ICdzcGluLW9rJ31cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7IGJ1c3lCbG9ja3MubWFwKChiLCBpKSA9PiA8c3BhbiBrZXk9e2l9IGNsYXNzTmFtZT1cIm1zZy1kb3QgZmEgZmEtY2FyZXQtbGVmdFwiIC8+KSB9XG4gICAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgICBjbGFzc05hbWU9e2BmYSBmYS0ke2J1c3kgPT0gMCA/ICdjaXJjbGUtbycgOiAnc3Bpbm5lciBmYS1zcGluJ31gfVxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBkaXNwbGF5KCFzaG93KX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9zcGFuPlxuICAgICAgICA8L3A+XG4gICAgICAgIHtzaG93PyAoXG4gICAgICAgICAgPGRpdlxuICAgICAgICAgICAgcmVmPXt0aGlzLnJlZkRvbSgnbm90Ym94Jyl9XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJtc2ctYm94XCJcbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IGRpc3BsYXkoZmFsc2UpfVxuICAgICAgICAgID57XG4gICAgICAgICAgICAobm90aWZpY2F0aW9ucykubWFwKChtc2csIGkpID0+IChcbiAgICAgICAgICAgICAgPHBcbiAgICAgICAgICAgICAgICBrZXk9e2l9XG4gICAgICAgICAgICAgICAgcmVmPXt0aGlzLnJlZkRvbShgbSR7aX1gKX1cbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2Btc2ctbGluZSAke1ttc2cua2luZF19LW8gJHsobXNnLmtpbmQgIT0gJ2luZm8nKSA/ICdtc2ctaGlnaCcgOiAnJ31gfVxuICAgICAgICAgICAgICA+e21zZy50ZXh0fTwvcD5cbiAgICAgICAgICAgICkpXG4gICAgICAgICAgfVxuICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwibXNnLWRpc21pc3NcIiA+eycoY2xpY2sgcGFuZWwgdG8gaGlkZSknfTwvcD5cbiAgICAgICAgICAgIDxwIGNsYXNzTmFtZT1cIm1zZy10cmFzaFwiID5cbiAgICAgICAgICAgICAgPGFcbiAgICAgICAgICAgICAgICBocmVmPVwiI1wiXG4gICAgICAgICAgICAgICAgdGl0bGU9XCJjbGVhciBtZXNzYWdlc1wiXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiY29udHJvbCBmYSBmYS10cmFzaFwiXG4gICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gY2xlYXIoKX1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTogbnVsbH1cbiAgICAgIDwvZGl2PlxuICAgIClcbiAgfVxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICB0aGlzLnNldFZpZXcoKVxuICB9XG4gIGNvbXBvbmVudERpZFVwZGF0ZSgpIHtcbiAgICB0aGlzLnNldFZpZXcoKVxuICB9XG4gIHNldFZpZXcob24pIHtcbiAgICBjb25zdCB7IHByb3BzOiB7IHNob3cgfSB9ID0gdGhpc1xuICAgIGlmIChzaG93KSB7dGhpcy5zZXRTY3JvbGwoKX1cbiAgfVxuICBzZXRTY3JvbGwoKSB7XG4gICAgY29uc3QgeyBwcm9wczogeyBzaG93IH0gfSA9IHRoaXNcbiAgICBpZiAoc2hvdykge1xuICAgICAgY29uc3QgeyBwcm9wczogeyBsYXN0TXNnLCBsYXN0Tm90ZSB9IH0gPSB0aGlzXG4gICAgICBjb25zdCBoaWdobGlnaHQgPSBsYXN0Tm90ZSA+IC0xXG4gICAgICBpZiAoaGlnaGxpZ2h0KSB7XG4gICAgICAgIHRoaXMuZG9tW2BtJHtsYXN0Tm90ZX1gXS5zY3JvbGxJbnRvVmlldygpXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgaWYgKGxhc3RNc2cgPiAtMSkge1xuICAgICAgICAgIHRoaXMuZG9tW2BtJHtsYXN0TXNnfWBdLnNjcm9sbEludG9WaWV3KClcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KGdldE5vdGlmaWNhdGlvbnMsIHsgY2xlYXIsIGRpc3BsYXkgfSkoTm90aWZpY2F0aW9uKVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBQcm9wVHlwZXMsIENoaWxkcmVuIH0gZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnXG5pbXBvcnQgdGhyb3R0bGUgZnJvbSAnbG9kYXNoL3Rocm90dGxlJ1xuaW1wb3J0IHsgZ2V0V2luRGltLCBjaGFuZ2VXaW5EaW0gfSBmcm9tICd3aW4uanMnXG5cbmNsYXNzIFdpbmRvdyBleHRlbmRzIENvbXBvbmVudCB7XG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IHByb3BzOiB7IGNoaWxkcmVuIH0gfSA9IHRoaXNcbiAgICByZXR1cm4gQ2hpbGRyZW4ub25seShjaGlsZHJlbilcbiAgfVxuICBuZXdXaW5kb3dTaXplID0gdGhyb3R0bGUoZXZlbnQgPT4ge1xuICAgIGNvbnN0IHsgcHJvcHM6IHsgcmVzaXplIH0gfSA9IHRoaXNcbiAgICByZXNpemUoKVxuICB9LCAxMDAwKVxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIHRoaXMubmV3V2luZG93U2l6ZSlcbiAgfVxuICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLCB0aGlzLm5ld1dpbmRvd1NpemUpXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChnZXRXaW5EaW0sIHsgcmVzaXplOiBjaGFuZ2VXaW5EaW0gfSkoV2luZG93KVxuIl19
