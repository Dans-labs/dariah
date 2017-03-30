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
'use strict';Object.defineProperty(exports,'__esModule',{value:true});exports.nextAlt=exports.getAlt=undefined;var _defineProperty2=require('babel-runtime/helpers/defineProperty');var _defineProperty3=_interopRequireDefault(_defineProperty2);var _extends3=require('babel-runtime/helpers/extends');var _extends4=_interopRequireDefault(_extends3);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}exports.default=function(){var state=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};var _ref=arguments[1];var type=_ref.type,tag=_ref.tag,initial=_ref.initial,nAlts=_ref.nAlts;switch(type){case'nextAlt':{var _state$tag=state[tag],oldAlt=_state$tag===undefined?initial||0:_state$tag;var newAlt=(oldAlt+1)%nAlts;return(0,_extends4.default)({},state,(0,_defineProperty3.default)({},tag,newAlt))}default:return state;}};var getAlt=exports.getAlt=function getAlt(_ref2,_ref3){var alter=_ref2.alter;var tag=_ref3.tag,initial=_ref3.initial;var _alter$tag=alter[tag],alt=_alter$tag===undefined?initial||0:_alter$tag;return{alt:alt}};var nextAlt=exports.nextAlt=function nextAlt(tag,nAlts,initial){return{type:'nextAlt',tag:tag,nAlts:nAlts,initial:initial}};

},{"babel-runtime/helpers/defineProperty":15,"babel-runtime/helpers/extends":16}],128:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});exports.getDoc=undefined;var _defineProperty2=require('babel-runtime/helpers/defineProperty');var _defineProperty3=_interopRequireDefault(_defineProperty2);var _extends4=require('babel-runtime/helpers/extends');var _extends5=_interopRequireDefault(_extends4);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}exports.default=function(){var state=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};var _ref=arguments[1];var type=_ref.type,path=_ref.path,data=_ref.data;switch(type){case'fetchDoc':{if(data==null){return(0,_extends5.default)({},state,(0,_defineProperty3.default)({},path,null))}return(0,_extends5.default)({},state,(0,_defineProperty3.default)({},path,data))}default:return state;}};var getDoc=exports.getDoc=function getDoc(_ref2,_ref3){var doc=_ref2.doc;var docDir=_ref3.docDir,docName=_ref3.docName,docExt=_ref3.docExt;return{data:doc[docDir+'/'+docName+'.'+docExt]}};

},{"babel-runtime/helpers/defineProperty":15,"babel-runtime/helpers/extends":16}],129:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});exports.testAllChecks=exports.placeFacets=exports.setupFiltering=exports.changeFacetAll=exports.changeFacet=exports.changeFulltext=exports.getFilterApplied=exports.getFieldValues=exports.getFilterSetting=undefined;var _entries=require('babel-runtime/core-js/object/entries');var _entries2=_interopRequireDefault(_entries);var _getIterator2=require('babel-runtime/core-js/get-iterator');var _getIterator3=_interopRequireDefault(_getIterator2);var _classCallCheck2=require('babel-runtime/helpers/classCallCheck');var _classCallCheck3=_interopRequireDefault(_classCallCheck2);var _slicedToArray2=require('babel-runtime/helpers/slicedToArray');var _slicedToArray3=_interopRequireDefault(_slicedToArray2);var _keys=require('babel-runtime/core-js/object/keys');var _keys2=_interopRequireDefault(_keys);var _defineProperty2=require('babel-runtime/helpers/defineProperty');var _defineProperty3=_interopRequireDefault(_defineProperty2);var _extends6=require('babel-runtime/helpers/extends');var _extends7=_interopRequireDefault(_extends6);var _objectWithoutProperties2=require('babel-runtime/helpers/objectWithoutProperties');var _objectWithoutProperties3=_interopRequireDefault(_objectWithoutProperties2);var _memoBind=require('memoBind.js');var _memoBind2=_interopRequireDefault(_memoBind);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}exports.default=function(){var state=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{filterSettings:{},initialized:false};var _ref=arguments[1];var type=_ref.type,filterId=_ref.filterId,data=_ref.data,rest=(0,_objectWithoutProperties3.default)(_ref,['type','filterId','data']);switch(type){case'setupFiltering':{return(0,_extends7.default)({},state,rest,{initialized:true})}case'fulltext':{return(0,_extends7.default)({},state,{filterSettings:(0,_extends7.default)({},state.filterSettings,(0,_defineProperty3.default)({},filterId,data))})}case'facetAll':{var sameSettings={};(0,_keys2.default)(state.filterSettings[filterId]).forEach(function(valueId){sameSettings[valueId]=data});return(0,_extends7.default)({},state,{filterSettings:(0,_extends7.default)({},state.filterSettings,(0,_defineProperty3.default)({},filterId,sameSettings))})}case'facet':{var _data=(0,_slicedToArray3.default)(data,2),valueId=_data[0],filterSetting=_data[1];return(0,_extends7.default)({},state,{filterSettings:(0,_extends7.default)({},state.filterSettings,(0,_defineProperty3.default)({},filterId,(0,_extends7.default)({},state.filterSettings[filterId],(0,_defineProperty3.default)({},valueId,filterSetting))))})}default:return state;}};var getFilterSetting=exports.getFilterSetting=function getFilterSetting(_ref2,_ref3){var filterSettings=_ref2.filter.filterSettings;var filterId=_ref3.filterId;return{filterSetting:filterSettings[filterId]}};var getFieldValues=exports.getFieldValues=function getFieldValues(_ref4,_ref5){var tables=_ref4.tables;var table=_ref5.table,filterField=_ref5.filterField;return{fieldValues:(0,_memoBind2.default)(fCC,'compileFiltering',[table],[tables])[filterField]}};var getFilterApplied=exports.getFilterApplied=function getFilterApplied(_ref6,_ref7){var tables=_ref6.tables,_ref6$filter=_ref6.filter,filterSettings=_ref6$filter.filterSettings,initialized=_ref6$filter.initialized;var table=_ref7.table;var fieldValues=(0,_memoBind2.default)(fCC,'compileFiltering',[table],[tables]);if(initialized){return(0,_extends7.default)({tables:tables,initialized:initialized,fieldValues:fieldValues,filterSettings:filterSettings},computeFiltering(table,tables,fieldValues,filterSettings))}else{return{tables:tables,initialized:initialized,fieldValues:fieldValues}}};var changeFulltext=exports.changeFulltext=function changeFulltext(filterId,searchString){return{type:'fulltext',filterId:filterId,data:searchString}};var changeFacet=exports.changeFacet=function changeFacet(filterId,valueId,onOff){return{type:'facet',filterId:filterId,data:[valueId,onOff]}};var changeFacetAll=exports.changeFacetAll=function changeFacetAll(filterId,onOff){return{type:'facetAll',filterId:filterId,data:onOff}};var setupFiltering=exports.setupFiltering=function setupFiltering(table,tables){return function(dispatch){var fieldValues=(0,_memoBind2.default)(fCC,'compileFiltering',[table],[tables]);var filterSettings=(0,_memoBind2.default)(fCC,'initFiltering',[table],[tables,fieldValues]);dispatch({type:'setupFiltering',filterSettings:filterSettings})}};var FilterCompileCache=function FilterCompileCache(){(0,_classCallCheck3.default)(this,FilterCompileCache);this.compileFiltering=function(table,tables){var _tables$table=tables[table],entities=_tables$table.entities,order=_tables$table.order,fields=_tables$table.fields,filterList=_tables$table.filterList;var presentFilterList=filterList.filter(function(x){return fields[x.field]});var filterFields=presentFilterList.filter(function(x){return x.type!=='FullText'}).map(function(x){return x.field});var fieldValues={};var _iteratorNormalCompletion=true;var _didIteratorError=false;var _iteratorError=undefined;try{for(var _iterator=(0,_getIterator3.default)(filterFields),_step;!(_iteratorNormalCompletion=(_step=_iterator.next()).done);_iteratorNormalCompletion=true){var f=_step.value;fieldValues[f]=(0,_defineProperty3.default)({},'','-none-')}}catch(err){_didIteratorError=true;_iteratorError=err}finally{try{if(!_iteratorNormalCompletion&&_iterator.return){_iterator.return()}}finally{if(_didIteratorError){throw _iteratorError}}}var _iteratorNormalCompletion2=true;var _didIteratorError2=false;var _iteratorError2=undefined;try{for(var _iterator2=(0,_getIterator3.default)(order),_step2;!(_iteratorNormalCompletion2=(_step2=_iterator2.next()).done);_iteratorNormalCompletion2=true){var eId=_step2.value;var entity=entities[eId];var _iteratorNormalCompletion3=true;var _didIteratorError3=false;var _iteratorError3=undefined;try{for(var _iterator3=(0,_getIterator3.default)(filterFields),_step3;!(_iteratorNormalCompletion3=(_step3=_iterator3.next()).done);_iteratorNormalCompletion3=true){var field=_step3.value;var fFieldValues=fieldValues[field];var efValue=entity.values[field];if(efValue!=null&&efValue.length!==0){var _iteratorNormalCompletion4=true;var _didIteratorError4=false;var _iteratorError4=undefined;try{for(var _iterator4=(0,_getIterator3.default)(efValue),_step4;!(_iteratorNormalCompletion4=(_step4=_iterator4.next()).done);_iteratorNormalCompletion4=true){var _ref9=_step4.value;var valueId=_ref9._id,valueRep=_ref9.value;fFieldValues[valueId]=valueRep}}catch(err){_didIteratorError4=true;_iteratorError4=err}finally{try{if(!_iteratorNormalCompletion4&&_iterator4.return){_iterator4.return()}}finally{if(_didIteratorError4){throw _iteratorError4}}}}}}catch(err){_didIteratorError3=true;_iteratorError3=err}finally{try{if(!_iteratorNormalCompletion3&&_iterator3.return){_iterator3.return()}}finally{if(_didIteratorError3){throw _iteratorError3}}}}}catch(err){_didIteratorError2=true;_iteratorError2=err}finally{try{if(!_iteratorNormalCompletion2&&_iterator2.return){_iterator2.return()}}finally{if(_didIteratorError2){throw _iteratorError2}}}return fieldValues};this.initFiltering=function(table,tables,fieldValues){var _tables$table2=tables[table],entities=_tables$table2.entities,order=_tables$table2.order,fields=_tables$table2.fields,filterList=_tables$table2.filterList;var presentFilterList=filterList.filter(function(x){return fields[x.field]});var filterSettings={};presentFilterList.forEach(function(filterSpec,filterId){if(filterSpec.type=='FullText'){filterSettings[filterId]=''}else{var facets={};(0,_keys2.default)(fieldValues[filterSpec.field]).forEach(function(valueId){facets[valueId]=true});filterSettings[filterId]=facets}});return filterSettings}};var fCC=new FilterCompileCache;var computeFiltering=function computeFiltering(table,tables,fieldValues,filterSettings){var _tables$table3=tables[table],entities=_tables$table3.entities,order=_tables$table3.order,fields=_tables$table3.fields,filterList=_tables$table3.filterList;var presentFilterList=filterList.filter(function(x){return fields[x.field]});var filterChecks={};var otherFilteredData={};presentFilterList.forEach(function(filterSpec,filterId){filterChecks[filterId]=(filterSpec.type==='FullText'?fulltextCheck:facetCheck)(filterSpec.field,filterSettings[filterId]);otherFilteredData[filterId]=[]});var filteredData=[];var _iteratorNormalCompletion5=true;var _didIteratorError5=false;var _iteratorError5=undefined;try{var _loop=function _loop(){var eId=_step5.value;var entity=entities[eId];var theOneFail=null;var v=true;var discard=false;(0,_entries2.default)(filterChecks).forEach(function(_ref13){var _ref14=(0,_slicedToArray3.default)(_ref13,2),filterId=_ref14[0],filterCheck=_ref14[1];if(!discard){var pass=filterCheck(entity);if(!pass){v=false;if(theOneFail===null){theOneFail=filterId}else{discard=true}}}});if(!discard){var _id=entity.values._id;if(v){filteredData.push(_id);presentFilterList.forEach(function(filterSpec,filterId){otherFilteredData[filterId].push(_id)})}else{otherFilteredData[theOneFail].push(_id)}}};for(var _iterator5=(0,_getIterator3.default)(order),_step5;!(_iteratorNormalCompletion5=(_step5=_iterator5.next()).done);_iteratorNormalCompletion5=true){_loop()}}catch(err){_didIteratorError5=true;_iteratorError5=err}finally{try{if(!_iteratorNormalCompletion5&&_iterator5.return){_iterator5.return()}}finally{if(_didIteratorError5){throw _iteratorError5}}}var amounts={};presentFilterList.forEach(function(_ref10,filterId){var field=_ref10.field,type=_ref10.type;amounts[filterId]=type==='FullText'?null:countFacets(field,fieldValues[field],otherFilteredData[filterId],entities)});var filteredAmountOthers={};(0,_entries2.default)(otherFilteredData).forEach(function(_ref11){var _ref12=(0,_slicedToArray3.default)(_ref11,2),filterId=_ref12[0],x=_ref12[1];filteredAmountOthers[filterId]=x.length});return{filteredData:filteredData,filteredAmountOthers:filteredAmountOthers,amounts:amounts}};var fulltextCheck=function fulltextCheck(field,term){var search=term.toLowerCase();if(search==null||search==''){return function(){return true}}return function(entity){var val=entity.values[field];val=val!=null?val[0]:val;return val!=null&&val.toLowerCase().indexOf(search)!==-1}};var facetCheck=function facetCheck(field,facetSettings){if(facetSettings.size===0){return function(){return false}}return function(entity){var fieldVals=entity.values[field];if(fieldVals==null||fieldVals.length==0){return facetSettings['']}var _iteratorNormalCompletion6=true;var _didIteratorError6=false;var _iteratorError6=undefined;try{for(var _iterator6=(0,_getIterator3.default)(fieldVals),_step6;!(_iteratorNormalCompletion6=(_step6=_iterator6.next()).done);_iteratorNormalCompletion6=true){var _ref16=_step6.value;var valueId=_ref16._id;if(facetSettings[valueId]){return true}}}catch(err){_didIteratorError6=true;_iteratorError6=err}finally{try{if(!_iteratorNormalCompletion6&&_iterator6.return){_iterator6.return()}}finally{if(_didIteratorError6){throw _iteratorError6}}}return false}};var countFacets=function countFacets(field,fieldValues,filteredData,entities){var facetAmounts={};(0,_keys2.default)(fieldValues).forEach(function(valueId){facetAmounts[valueId]=0});var _iteratorNormalCompletion7=true;var _didIteratorError7=false;var _iteratorError7=undefined;try{for(var _iterator7=(0,_getIterator3.default)(filteredData),_step7;!(_iteratorNormalCompletion7=(_step7=_iterator7.next()).done);_iteratorNormalCompletion7=true){var eId=_step7.value;var fieldVals=entities[eId].values[field];if(fieldVals==null||fieldVals.length==0){facetAmounts['']+=1}else{var _iteratorNormalCompletion8=true;var _didIteratorError8=false;var _iteratorError8=undefined;try{for(var _iterator8=(0,_getIterator3.default)(fieldVals),_step8;!(_iteratorNormalCompletion8=(_step8=_iterator8.next()).done);_iteratorNormalCompletion8=true){var _ref18=_step8.value;var valueId=_ref18._id;facetAmounts[valueId]+=1}}catch(err){_didIteratorError8=true;_iteratorError8=err}finally{try{if(!_iteratorNormalCompletion8&&_iterator8.return){_iterator8.return()}}finally{if(_didIteratorError8){throw _iteratorError8}}}}}}catch(err){_didIteratorError7=true;_iteratorError7=err}finally{try{if(!_iteratorNormalCompletion7&&_iterator7.return){_iterator7.return()}}finally{if(_didIteratorError7){throw _iteratorError7}}}return facetAmounts};var placeFacets=exports.placeFacets=function placeFacets(fieldValues,maxCols){if(fieldValues==null){return[]}var facets=(0,_entries2.default)(fieldValues).sort(function(x,y){return x[1].localeCompare(y[1])});if(facets.length==0){return[]}var rows=[];var lf=facets.length;var nrows=Math.floor(lf/maxCols)+(lf%maxCols?1:0);var ncols=Math.floor(lf/nrows)+(lf%nrows?1:0);for(var r=0;r<nrows;r++){var row=[];for(var c=0;c<ncols;c++){var f=nrows*c+r;row.push(f<lf?facets[f]:null)}rows.push(row)}return rows};var testAllChecks=exports.testAllChecks=function testAllChecks(filterSettings){var allTrue=true;var allFalse=true;var _iteratorNormalCompletion9=true;var _didIteratorError9=false;var _iteratorError9=undefined;try{for(var _iterator9=(0,_getIterator3.default)((0,_entries2.default)(filterSettings)),_step9;!(_iteratorNormalCompletion9=(_step9=_iterator9.next()).done);_iteratorNormalCompletion9=true){var _step9$value=(0,_slicedToArray3.default)(_step9.value,2),valueId=_step9$value[0],valueRep=_step9$value[1];if(valueRep){allFalse=false}else{allTrue=false}}}catch(err){_didIteratorError9=true;_iteratorError9=err}finally{try{if(!_iteratorNormalCompletion9&&_iterator9.return){_iterator9.return()}}finally{if(_didIteratorError9){throw _iteratorError9}}}return{allTrue:allTrue,allFalse:allFalse}};

},{"babel-runtime/core-js/get-iterator":2,"babel-runtime/core-js/object/entries":7,"babel-runtime/core-js/object/keys":9,"babel-runtime/helpers/classCallCheck":13,"babel-runtime/helpers/defineProperty":15,"babel-runtime/helpers/extends":16,"babel-runtime/helpers/objectWithoutProperties":18,"babel-runtime/helpers/slicedToArray":20,"memoBind.js":"memoBind.js"}],130:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});exports.getMe=undefined;var _extends2=require('babel-runtime/helpers/extends');var _extends3=_interopRequireDefault(_extends2);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}exports.default=function(){var state=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};var _ref=arguments[1];var type=_ref.type,path=_ref.path,data=_ref.data;switch(type){case'fetchMe':{if(data==null){return{}}return(0,_extends3.default)({},data)}default:return state;}};var getMe=exports.getMe=function getMe(_ref2){var me=_ref2.me;return{me:me}};

},{"babel-runtime/helpers/extends":16}],131:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});exports.succeed=exports.err=exports.ask=exports.getNotify=undefined;var _defineProperty2=require('babel-runtime/helpers/defineProperty');var _defineProperty3=_interopRequireDefault(_defineProperty2);var _extends4=require('babel-runtime/helpers/extends');var _extends5=_interopRequireDefault(_extends4);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}exports.default=function(){var state=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};var _ref=arguments[1];var type=_ref.type,desc=_ref.desc,status=_ref.status,msgs=_ref.msgs;switch(type){case'notify':{switch(status){case('pending','success'):{return(0,_extends5.default)({},state,(0,_defineProperty3.default)({},desc,{status:status}))}case'error':{return(0,_extends5.default)({},state,(0,_defineProperty3.default)({},desc,{status:status,msgs:msgs}))}default:return state;}}default:return state;}};var getNotify=exports.getNotify=function getNotify(_ref2){var notify=_ref2.notify;return{notify:notify}};var ask=exports.ask=function ask(desc){return{type:'notify',status:'pending',desc:desc}};var err=exports.err=function err(desc,data){return{type:'notify',status:'error',desc:desc,msgs:data}};var succeed=exports.succeed=function succeed(desc){return{type:'notify',status:'success',desc:desc}};

},{"babel-runtime/helpers/defineProperty":15,"babel-runtime/helpers/extends":16}],132:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});exports.combineSelectors=undefined;var _assign=require('babel-runtime/core-js/object/assign');var _assign2=_interopRequireDefault(_assign);var _getIterator2=require('babel-runtime/core-js/get-iterator');var _getIterator3=_interopRequireDefault(_getIterator2);var _redux=require('redux');var _win=require('win.js');var _win2=_interopRequireDefault(_win);var _notify=require('notify.js');var _notify2=_interopRequireDefault(_notify);var _doc=require('doc.js');var _doc2=_interopRequireDefault(_doc);var _tables=require('tables.js');var _tables2=_interopRequireDefault(_tables);var _me=require('me.js');var _me2=_interopRequireDefault(_me);var _filter=require('filter.js');var _filter2=_interopRequireDefault(_filter);var _alter=require('alter.js');var _alter2=_interopRequireDefault(_alter);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}exports.default=(0,_redux.combineReducers)({win:_win2.default,notify:_notify2.default,doc:_doc2.default,tables:_tables2.default,me:_me2.default,filter:_filter2.default,alter:_alter2.default});var combineSelectors=exports.combineSelectors=function combineSelectors(){var _arguments=arguments;return function(state,props){var result={};var _iteratorNormalCompletion=true;var _didIteratorError=false;var _iteratorError=undefined;try{for(var _iterator=(0,_getIterator3.default)(_arguments),_step;!(_iteratorNormalCompletion=(_step=_iterator.next()).done);_iteratorNormalCompletion=true){var selector=_step.value;(0,_assign2.default)(result,selector(state,props))}}catch(err){_didIteratorError=true;_iteratorError=err}finally{try{if(!_iteratorNormalCompletion&&_iterator.return){_iterator.return()}}finally{if(_didIteratorError){throw _iteratorError}}}return result}};

},{"alter.js":127,"babel-runtime/core-js/get-iterator":2,"babel-runtime/core-js/object/assign":4,"doc.js":128,"filter.js":129,"me.js":130,"notify.js":131,"redux":"redux","tables.js":134,"win.js":135}],133:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});exports.fetchData=undefined;var _extends2=require('babel-runtime/helpers/extends');var _extends3=_interopRequireDefault(_extends2);require('whatwg-fetch');var _notify=require('notify.js');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var rootUrl='/api/';var fetchData=exports.fetchData=function fetchData(task){return function(dispatch){var type=task.type,path=task.path,contentType=task.contentType;dispatch((0,_notify.ask)(task));dispatch((0,_extends3.default)({},task,{data:null}));var settings={credentials:'same-origin'};fetch(''+rootUrl+contentType+path,settings).then(function(response){return response.json()}).then(function(json){var msgs=json.msgs,good=json.good,data=json.data;if(good){dispatch((0,_notify.succeed)(task));dispatch((0,_extends3.default)({},task,{data:data}))}else{dispatch((0,_notify.err)(task,msgs))}}).catch(function(error){console.err(error);dispatch((0,_notify.err)(task,[{kind:'error',text:error}]))})}};

},{"babel-runtime/helpers/extends":16,"notify.js":131,"whatwg-fetch":"whatwg-fetch"}],134:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});exports.getTableFilters=exports.getUser=exports.getCountry=exports.getTables=undefined;var _objectWithoutProperties2=require('babel-runtime/helpers/objectWithoutProperties');var _objectWithoutProperties3=_interopRequireDefault(_objectWithoutProperties2);var _defineProperty2=require('babel-runtime/helpers/defineProperty');var _defineProperty3=_interopRequireDefault(_defineProperty2);var _extends9=require('babel-runtime/helpers/extends');var _extends10=_interopRequireDefault(_extends9);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}exports.default=function(){var state=arguments.length>0&&arguments[0]!==undefined?arguments[0]:{};var _ref=arguments[1];var type=_ref.type,path=_ref.path,data=_ref.data,table=_ref.table;switch(type){case'fetchTable':{if(data==null){return(0,_extends10.default)({},state,(0,_defineProperty3.default)({},table,null))}return(0,_extends10.default)({},state,(0,_defineProperty3.default)({},table,data))}case'fetchTableMy':{if(data==null){if(state[table]==null){return(0,_extends10.default)({},state,(0,_defineProperty3.default)({},table,null))}return(0,_extends10.default)({},state,(0,_defineProperty3.default)({},table,(0,_extends10.default)({},state[table],{my:null})))}var entities=data.entities,order=data.order,rest=(0,_objectWithoutProperties3.default)(data,['entities','order']);return(0,_extends10.default)({},state,(0,_defineProperty3.default)({},table,(0,_extends10.default)({},state[table],rest,{my:order,entities:(0,_extends10.default)({},(state[table]||{}).entities,entities)})))}case'fetchItem':{if(data==null){return state}var _id=data.values._id;return(0,_extends10.default)({},state,(0,_defineProperty3.default)({},table,(0,_extends10.default)({},state[table],{entities:(0,_extends10.default)({},state[table].entities,(0,_defineProperty3.default)({},_id,data))})))}default:return state;}};var getTables=exports.getTables=function getTables(_ref2){var tables=_ref2.tables;return{tables:tables}};var getCountry=exports.getCountry=function getCountry(_ref3){var country=_ref3.tables.country;return{country:country}};var getUser=exports.getUser=function getUser(_ref4){var user=_ref4.tables.user;return{user:user}};var getTableFilters=exports.getTableFilters=function getTableFilters(_ref5,_ref6){var tables=_ref5.tables;var table=_ref6.table;var _tables$table=tables[table],fields=_tables$table.fields,filterList=_tables$table.filterList;return{fields:fields,filterList:filterList}};

},{"babel-runtime/helpers/defineProperty":15,"babel-runtime/helpers/extends":16,"babel-runtime/helpers/objectWithoutProperties":18}],135:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});exports.getWinDim=exports.changeWinDim=undefined;var _extends2=require('babel-runtime/helpers/extends');var _extends3=_interopRequireDefault(_extends2);exports.columnStyle=columnStyle;function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}exports.default=function(){var state=arguments.length>0&&arguments[0]!==undefined?arguments[0]:initWinDim();var _ref=arguments[1];var type=_ref.type,height=_ref.height,width=_ref.width;switch(type){case'windim':{return{height:height,width:width}}default:return state;}};var changeWinDim=exports.changeWinDim=function changeWinDim(){return function(dispatch){dispatch((0,_extends3.default)({type:'windim'},initWinDim()))}};var getWinDim=exports.getWinDim=function getWinDim(_ref2){var _ref2$win=_ref2.win,height=_ref2$win.height,width=_ref2$win.width;return{height:height,width:width}};var initWinDim=function initWinDim(){var _window=window,height=_window.innerHeight,width=_window.innerWidth;return{height:height,width:width}};var scrollBarWidth=40;var leftMargin=0;var topHeight=50;var topMargin=5;var divWidthSpec={left:120,rightLeft:380,rightLeftNav:150};var floatSpec={left:'left',right:'right',rightLeft:'left',rightLeftNav:'left',rightRight:'right',rightRightBody:'right'};function columnStyle(kind,_ref3){var height=_ref3.height,width=_ref3.width;var divHeight={left:height-topHeight,right:height-topHeight,rightLeft:height-topHeight-topMargin,rightLeftNav:height-topHeight-topMargin,rightRight:height-topHeight-topMargin,rightRightBody:height-topHeight-topMargin};var left=divWidthSpec.left,rightLeft=divWidthSpec.rightLeft,rightLeftNav=divWidthSpec.rightLeftNav;var divWidth=(0,_extends3.default)({},divWidthSpec,{right:width-left-scrollBarWidth,rightRight:width-left-rightLeft-2*scrollBarWidth-leftMargin,rightRightBody:width-left-rightLeftNav-2*scrollBarWidth-leftMargin});return{width:divWidth[kind],height:divHeight[kind],float:floatSpec[kind]}}

},{"babel-runtime/helpers/extends":16}],136:[function(require,module,exports){
'use strict';var _jsxFileName='/Users/dirk/github/dariah/client/src/js/app/main.jsx';var _react=require('react');var _react2=_interopRequireDefault(_react);var _reactDom=require('react-dom');var _reactRedux=require('react-redux');var _reactRouter=require('react-router');var _Root=require('Root.jsx');var _Root2=_interopRequireDefault(_Root);var _App=require('App.jsx');var _App2=_interopRequireDefault(_App);var _SubApp=require('SubApp.jsx');var _SubApp2=_interopRequireDefault(_SubApp);var _Backoffice=require('Backoffice.jsx');var _Backoffice2=_interopRequireDefault(_Backoffice);var _ItemFiltered=require('ItemFiltered.jsx');var _ItemFiltered2=_interopRequireDefault(_ItemFiltered);var _ItemMy=require('ItemMy.jsx');var _ItemMy2=_interopRequireDefault(_ItemMy);var _ItemRecordPre=require('ItemRecordPre.jsx');var _ItemRecordPre2=_interopRequireDefault(_ItemRecordPre);var _Doc=require('Doc.jsx');var _Doc2=_interopRequireDefault(_Doc);var _NotFound=require('NotFound.jsx');var _NotFound2=_interopRequireDefault(_NotFound);var _configureStore=require('configureStore.js');var _configureStore2=_interopRequireDefault(_configureStore);var _reducers=require('reducers.js');var _reducers2=_interopRequireDefault(_reducers);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var store=(0,_configureStore2.default)(_reducers2.default);(0,_reactDom.render)(_react2.default.createElement(_Root2.default,{store:store,__source:{fileName:_jsxFileName,lineNumber:22}},_react2.default.createElement(_reactRouter.Router,{history:_reactRouter.browserHistory,__source:{fileName:_jsxFileName,lineNumber:23}},_react2.default.createElement(_reactRouter.Redirect,{from:'/about',to:'/docs/about.md',__source:{fileName:_jsxFileName,lineNumber:24}}),_react2.default.createElement(_reactRouter.Redirect,{from:'/docs/about',to:'/docs/about.md',__source:{fileName:_jsxFileName,lineNumber:25}}),_react2.default.createElement(_reactRouter.Redirect,{from:'/about.md',to:'/docs/about.md',__source:{fileName:_jsxFileName,lineNumber:26}}),_react2.default.createElement(_reactRouter.Redirect,{from:'/login',to:'/docs/about.md',__source:{fileName:_jsxFileName,lineNumber:27}}),_react2.default.createElement(_reactRouter.Redirect,{from:'/logout',to:'/docs/about.md',__source:{fileName:_jsxFileName,lineNumber:28}}),_react2.default.createElement(_reactRouter.Redirect,{from:'/slogout',to:'/docs/about.md',__source:{fileName:_jsxFileName,lineNumber:29}}),_react2.default.createElement(_reactRouter.Route,{path:'/',component:_App2.default,__source:{fileName:_jsxFileName,lineNumber:30}},_react2.default.createElement(_reactRouter.IndexRoute,{component:_App2.default,__source:{fileName:_jsxFileName,lineNumber:31}}),_react2.default.createElement(_reactRouter.IndexRedirect,{to:'/docs/about.md',__source:{fileName:_jsxFileName,lineNumber:32}}),_react2.default.createElement(_reactRouter.Route,{path:'docs/:docFile',component:_Doc2.default,__source:{fileName:_jsxFileName,lineNumber:33}}),_react2.default.createElement(_reactRouter.Route,{path:'tech/docs/gen/:docFile',component:_Doc2.default,__source:{fileName:_jsxFileName,lineNumber:34}}),_react2.default.createElement(_reactRouter.Route,{path:'tech/docs/:docFile',component:_Doc2.default,__source:{fileName:_jsxFileName,lineNumber:35}}),_react2.default.createElement(_reactRouter.Route,{path:':table',component:_SubApp2.default,__source:{fileName:_jsxFileName,lineNumber:36}},_react2.default.createElement(_reactRouter.Route,{path:'list',component:_ItemFiltered2.default,__source:{fileName:_jsxFileName,lineNumber:37}}),_react2.default.createElement(_reactRouter.Route,{path:'mylist',component:_ItemMy2.default,__source:{fileName:_jsxFileName,lineNumber:38}},_react2.default.createElement(_reactRouter.Route,{path:':eId',component:_ItemRecordPre2.default,ownOnly:true,__source:{fileName:_jsxFileName,lineNumber:39}})),_react2.default.createElement(_reactRouter.Route,{path:':func',component:_Backoffice2.default,__source:{fileName:_jsxFileName,lineNumber:41}}))),_react2.default.createElement(_reactRouter.Route,{path:'*',component:_NotFound2.default,__source:{fileName:_jsxFileName,lineNumber:44}}))),document.getElementById('body'));

},{"App.jsx":139,"Backoffice.jsx":140,"Doc.jsx":142,"ItemFiltered.jsx":162,"ItemMy.jsx":163,"ItemRecordPre.jsx":151,"NotFound.jsx":153,"Root.jsx":155,"SubApp.jsx":158,"configureStore.js":"configureStore.js","react":"react","react-dom":"react-dom","react-redux":"react-redux","react-router":"react-router","reducers.js":132}],137:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _getPrototypeOf=require('babel-runtime/core-js/object/get-prototype-of');var _getPrototypeOf2=_interopRequireDefault(_getPrototypeOf);var _classCallCheck2=require('babel-runtime/helpers/classCallCheck');var _classCallCheck3=_interopRequireDefault(_classCallCheck2);var _createClass2=require('babel-runtime/helpers/createClass');var _createClass3=_interopRequireDefault(_createClass2);var _possibleConstructorReturn2=require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3=_interopRequireDefault(_possibleConstructorReturn2);var _inherits2=require('babel-runtime/helpers/inherits');var _inherits3=_interopRequireDefault(_inherits2);var _jsxFileName='/Users/dirk/github/dariah/client/src/js/app/object/CheckboxI.jsx';var _react=require('react');var _react2=_interopRequireDefault(_react);var _reactRedux=require('react-redux');var _filter=require('filter.js');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var indeterminate=function indeterminate(states){return!states.allTrue&&!states.allFalse};var CheckboxI=function(_Component){(0,_inherits3.default)(CheckboxI,_Component);function CheckboxI(){var _ref;var _temp,_this,_ret;(0,_classCallCheck3.default)(this,CheckboxI);for(var _len=arguments.length,args=Array(_len),_key=0;_key<_len;_key++){args[_key]=arguments[_key]}return _ret=(_temp=(_this=(0,_possibleConstructorReturn3.default)(this,(_ref=CheckboxI.__proto__||(0,_getPrototypeOf2.default)(CheckboxI)).call.apply(_ref,[this].concat(args))),_this),_this.handleCheck=function(){var _this2=_this,_this2$props=_this2.props,filterSetting=_this2$props.filterSetting,filterId=_this2$props.filterId,handle=_this2$props.handle;var states=(0,_filter.testAllChecks)(filterSetting);return handle(filterId,_this.dom.indeterminate||!states.allTrue)},_this.setIndeterminate=function(domElem){var _this3=_this,filterSetting=_this3.props.filterSetting;var states=(0,_filter.testAllChecks)(filterSetting);if(domElem){_this.dom=domElem;domElem.indeterminate=indeterminate(states)}},_temp),(0,_possibleConstructorReturn3.default)(_this,_ret)}(0,_createClass3.default)(CheckboxI,[{key:'componentDidUpdate',value:function componentDidUpdate(){var filterSetting=this.props.filterSetting;var states=(0,_filter.testAllChecks)(filterSetting);this.dom.indeterminate=indeterminate(states)}},{key:'render',value:function render(){var filterSetting=this.props.filterSetting;var states=(0,_filter.testAllChecks)(filterSetting);return _react2.default.createElement('input',{ref:this.setIndeterminate,type:'checkbox',checked:states.allTrue,onChange:this.handleCheck,__source:{fileName:_jsxFileName,lineNumber:30}})}}]);return CheckboxI}(_react.Component);exports.default=(0,_reactRedux.connect)(_filter.getFilterSetting,{handle:_filter.changeFacetAll})(CheckboxI);

},{"babel-runtime/core-js/object/get-prototype-of":8,"babel-runtime/helpers/classCallCheck":13,"babel-runtime/helpers/createClass":14,"babel-runtime/helpers/inherits":17,"babel-runtime/helpers/possibleConstructorReturn":19,"filter.js":129,"react":"react","react-redux":"react-redux"}],138:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _slicedToArray2=require('babel-runtime/helpers/slicedToArray');var _slicedToArray3=_interopRequireDefault(_slicedToArray2);var _entries=require('babel-runtime/core-js/object/entries');var _entries2=_interopRequireDefault(_entries);var _extends2=require('babel-runtime/helpers/extends');var _extends3=_interopRequireDefault(_extends2);var _objectWithoutProperties2=require('babel-runtime/helpers/objectWithoutProperties');var _objectWithoutProperties3=_interopRequireDefault(_objectWithoutProperties2);var _getPrototypeOf=require('babel-runtime/core-js/object/get-prototype-of');var _getPrototypeOf2=_interopRequireDefault(_getPrototypeOf);var _classCallCheck2=require('babel-runtime/helpers/classCallCheck');var _classCallCheck3=_interopRequireDefault(_classCallCheck2);var _createClass2=require('babel-runtime/helpers/createClass');var _createClass3=_interopRequireDefault(_createClass2);var _possibleConstructorReturn2=require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3=_interopRequireDefault(_possibleConstructorReturn2);var _inherits2=require('babel-runtime/helpers/inherits');var _inherits3=_interopRequireDefault(_inherits2);var _defineProperty2=require('babel-runtime/helpers/defineProperty');var _defineProperty3=_interopRequireDefault(_defineProperty2);var _MARKER_COLOR,_COUNTRY_STYLE,_jsxFileName='/Users/dirk/github/dariah/client/src/js/app/object/EUMap.jsx';var _react=require('react');var _react2=_interopRequireDefault(_react);var _reactRedux=require('react-redux');var _ByValue=require('ByValue.jsx');var _ByValue2=_interopRequireDefault(_ByValue);var _leaflet=require('leaflet');var _leaflet2=_interopRequireDefault(_leaflet);var _europeGeo=require('europe.geo.js');var _filter=require('filter.js');var _tables=require('tables.js');var _reducers=require('reducers.js');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var mapOptions={HEIGHT:250,MAX_RADIUS:25,LEVEL_OFF:10,ZOOM_INIT:3,MAP_CENTER:[52,12],MAP_BOUNDS:[[30,-20],[70,40]],MARKER_COLOR:(_MARKER_COLOR={},(0,_defineProperty3.default)(_MARKER_COLOR,true,{color:'#008800',fillColor:'#00cc00'}),(0,_defineProperty3.default)(_MARKER_COLOR,false,{color:'#888844',fillColor:'#bbbb66'}),_MARKER_COLOR),MARKER_SHAPE:{weight:1,fill:true,fillOpacity:0.8},COUNTRY_STYLE:(_COUNTRY_STYLE={},(0,_defineProperty3.default)(_COUNTRY_STYLE,true,{color:'#884422',weight:2,fill:true,fillColor:'#aa7766',fillOpacity:1}),(0,_defineProperty3.default)(_COUNTRY_STYLE,false,{color:'#777777',weight:1,fill:true,fillColor:'#bbbbbb',fillOpacity:1}),_COUNTRY_STYLE)};var computeRadius=function computeRadius(_id,filteredAmountOthers,amounts){var amount=amounts?amounts[_id]||0:0;if(amount==0){return 0}var MAX_RADIUS=mapOptions.MAX_RADIUS,LEVEL_OFF=mapOptions.LEVEL_OFF;var proportional=MAX_RADIUS*amount/filteredAmountOthers;if(filteredAmountOthers<LEVEL_OFF){return proportional}return LEVEL_OFF*Math.sqrt(proportional)};var EUMap=function(_Component){(0,_inherits3.default)(EUMap,_Component);function EUMap(props){(0,_classCallCheck3.default)(this,EUMap);var _this=(0,_possibleConstructorReturn3.default)(this,(EUMap.__proto__||(0,_getPrototypeOf2.default)(EUMap)).call(this,props));_this.setMap=function(dom){if(dom){_this.dom=dom}};_this.inDariah=function(feature){return!!_this.idFromIso[feature.properties.iso2]};_this.features={};return _this}(0,_createClass3.default)(EUMap,[{key:'render',value:function render(){var _props=this.props,country=_props.country,byValueProps=(0,_objectWithoutProperties3.default)(_props,['country']),setMap=this.setMap;return _react2.default.createElement('div',{__source:{fileName:_jsxFileName,lineNumber:68}},_react2.default.createElement('div',{ref:setMap,__source:{fileName:_jsxFileName,lineNumber:69}}),_react2.default.createElement(_ByValue2.default,(0,_extends3.default)({},byValueProps,{__source:{fileName:_jsxFileName,lineNumber:72}})))}},{key:'componentDidMount',value:function componentDidMount(){var _this2=this;var _props2=this.props,filterSetting=_props2.filterSetting,filteredAmountOthers=_props2.filteredAmountOthers,amounts=_props2.amounts,country=_props2.country,dom=this.dom;var HEIGHT=mapOptions.HEIGHT,MAP_CENTER=mapOptions.MAP_CENTER,ZOOM_INIT=mapOptions.ZOOM_INIT,MAP_BOUNDS=mapOptions.MAP_BOUNDS,MARKER_COLOR=mapOptions.MARKER_COLOR,MARKER_SHAPE=mapOptions.MARKER_SHAPE,COUNTRY_STYLE=mapOptions.COUNTRY_STYLE;dom.style.height=HEIGHT;this.map=_leaflet2.default.map(dom,{attributionControl:false,center:MAP_CENTER,zoom:ZOOM_INIT,maxBounds:MAP_BOUNDS});var order=country.order,entities=country.entities;this.idFromIso={};order.forEach(function(_id){var iso=entities[_id].values.iso;_this2.idFromIso[iso]=_id});_leaflet2.default.geoJSON(_europeGeo.countryBorders,{style:function style(feature){return COUNTRY_STYLE[_this2.inDariah(feature)]},onEachFeature:function onEachFeature(feature){if(_this2.inDariah(feature)){var _feature$properties=feature.properties,iso2=_feature$properties.iso2,lat=_feature$properties.lat,lng=_feature$properties.lng;var _id=_this2.idFromIso[iso2];var isOn=filterSetting[_id];var marker=_leaflet2.default.circleMarker([lat,lng],(0,_extends3.default)({},MARKER_COLOR[isOn],{radius:computeRadius(_id,filteredAmountOthers,amounts)},MARKER_SHAPE,{pane:'markerPane'})).addTo(_this2.map);_this2.features[iso2]=marker}}}).addTo(this.map)}},{key:'componentDidUpdate',value:function componentDidUpdate(){var _this3=this;var _props3=this.props,filterSetting=_props3.filterSetting,filteredAmountOthers=_props3.filteredAmountOthers,amounts=_props3.amounts;var MARKER_COLOR=mapOptions.MARKER_COLOR;(0,_entries2.default)(this.features).forEach(function(_ref){var _ref2=(0,_slicedToArray3.default)(_ref,2),iso2=_ref2[0],marker=_ref2[1];var _id=_this3.idFromIso[iso2];var isOn=filterSetting[_id];marker.setRadius(computeRadius(_id,filteredAmountOthers,amounts));marker.setStyle(MARKER_COLOR[isOn])})}}]);return EUMap}(_react.Component);EUMap.displayName='EUMap';exports.default=(0,_reactRedux.connect)((0,_reducers.combineSelectors)(_tables.getCountry,_filter.getFilterSetting))(EUMap);

},{"ByValue.jsx":141,"babel-runtime/core-js/object/entries":7,"babel-runtime/core-js/object/get-prototype-of":8,"babel-runtime/helpers/classCallCheck":13,"babel-runtime/helpers/createClass":14,"babel-runtime/helpers/defineProperty":15,"babel-runtime/helpers/extends":16,"babel-runtime/helpers/inherits":17,"babel-runtime/helpers/objectWithoutProperties":18,"babel-runtime/helpers/possibleConstructorReturn":19,"babel-runtime/helpers/slicedToArray":20,"europe.geo.js":"europe.geo.js","filter.js":129,"leaflet":"leaflet","react":"react","react-redux":"react-redux","reducers.js":132,"tables.js":134}],139:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _jsxFileName='/Users/dirk/github/dariah/client/src/js/app/pure/App.jsx';var _react=require('react');var _react2=_interopRequireDefault(_react);var _reactRedux=require('react-redux');var _Login=require('Login.jsx');var _Login2=_interopRequireDefault(_Login);var _NavLink=require('NavLink.jsx');var _NavLink2=_interopRequireDefault(_NavLink);var _Static=require('Static.jsx');var _Static2=_interopRequireDefault(_Static);var _Notification=require('Notification.jsx');var _Notification2=_interopRequireDefault(_Notification);var _win=require('win.js');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var App=function App(_ref){var children=_ref.children,height=_ref.height,width=_ref.width;var text=width+' x '+height;return _react2.default.createElement('div',{__source:{fileName:_jsxFileName,lineNumber:12}},_react2.default.createElement(_Notification2.default,{__source:{fileName:_jsxFileName,lineNumber:13}}),_react2.default.createElement('p',{className:'nav small top',__source:{fileName:_jsxFileName,lineNumber:14}},_react2.default.createElement('img',{src:'/static/images/inkind_logo_small.png',title:'information about this site',__source:{fileName:_jsxFileName,lineNumber:15}}),_react2.default.createElement(_NavLink2.default,{to:'/contrib',__source:{fileName:_jsxFileName,lineNumber:19}},'Contributions'),_react2.default.createElement(_NavLink2.default,{to:'/backoffice',__source:{fileName:_jsxFileName,lineNumber:20}},'Backoffice'),_react2.default.createElement(_Static2.default,{__source:{fileName:_jsxFileName,lineNumber:21}}),_react2.default.createElement('span',{className:'resize',title:text,__source:{fileName:_jsxFileName,lineNumber:22}},text),_react2.default.createElement(_Login2.default,{__source:{fileName:_jsxFileName,lineNumber:23}})),_react2.default.createElement('div',{__source:{fileName:_jsxFileName,lineNumber:25}},children))};exports.default=(0,_reactRedux.connect)(_win.getWinDim)(App);

},{"Login.jsx":165,"NavLink.jsx":152,"Notification.jsx":166,"Static.jsx":157,"react":"react","react-redux":"react-redux","win.js":135}],140:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _jsxFileName='/Users/dirk/github/dariah/client/src/js/app/pure/Backoffice.jsx';var _react=require('react');var _react2=_interopRequireDefault(_react);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var Backoffice=function Backoffice(_ref){var func=_ref.params.func;var headings={type:'Contribution types',assess:'Assessment criteria',package:'Assessment packages'};var bodies={type:'Will be implemented',assess:'Will be implemented',package:'Will be implemented'};var heading=headings[func]||'No such function';var body=bodies[func]||'Nothing to wait for';return _react2.default.createElement('div',{__source:{fileName:_jsxFileName,lineNumber:17}},_react2.default.createElement('h1',{__source:{fileName:_jsxFileName,lineNumber:18}},heading),_react2.default.createElement('p',{__source:{fileName:_jsxFileName,lineNumber:19}},body))};exports.default=Backoffice;

},{"react":"react"}],141:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _slicedToArray2=require('babel-runtime/helpers/slicedToArray');var _slicedToArray3=_interopRequireDefault(_slicedToArray2);var _jsxFileName='/Users/dirk/github/dariah/client/src/js/app/pure/ByValue.jsx';var _react=require('react');var _react2=_interopRequireDefault(_react);var _reactRedux=require('react-redux');var _Facet=require('Facet.jsx');var _Facet2=_interopRequireDefault(_Facet);var _CheckboxI=require('CheckboxI.jsx');var _CheckboxI2=_interopRequireDefault(_CheckboxI);var _Stat=require('Stat.jsx');var _Stat2=_interopRequireDefault(_Stat);var _Alternative=require('Alternative.jsx');var _Alternative2=_interopRequireDefault(_Alternative);var _filter=require('filter.js');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var ByValue=function ByValue(_ref){var table=_ref.table,filterId=_ref.filterId,filterField=_ref.filterField,filterLabel=_ref.filterLabel,fieldValues=_ref.fieldValues,filteredAmount=_ref.filteredAmount,filteredAmountOthers=_ref.filteredAmountOthers,amounts=_ref.amounts,maxCols=_ref.maxCols,expanded=_ref.expanded;var rows=(0,_filter.placeFacets)(fieldValues,maxCols);var control1=function control1(handler){return _react2.default.createElement('span',{className:'button-small fa fa-chevron-down',onClick:handler,__source:{fileName:_jsxFileName,lineNumber:18}})};var control2=function control2(handler){return _react2.default.createElement('span',{className:'button-small fa fa-chevron-right',onClick:handler,__source:{fileName:_jsxFileName,lineNumber:19}})};var controlPlacement=function controlPlacement(control){return _react2.default.createElement('p',{className:'facet',__source:{fileName:_jsxFileName,lineNumber:21}},_react2.default.createElement(_CheckboxI2.default,{filterId:filterId,__source:{fileName:_jsxFileName,lineNumber:22}}),' ',filterLabel,' ',_react2.default.createElement(_Stat2.default,{subTotal:filteredAmount,total:filteredAmountOthers,__source:{fileName:_jsxFileName,lineNumber:25}}),' ',control)};return _react2.default.createElement('div',{className:'facet',__source:{fileName:_jsxFileName,lineNumber:30}},rows===null?_react2.default.createElement('p',{__source:{fileName:_jsxFileName,lineNumber:31}},' -no facets '):_react2.default.createElement(_Alternative2.default,{tag:table+'_'+filterId,controlPlacement:controlPlacement,controls:[control1,control2],initial:expanded?0:1,alternatives:[_react2.default.createElement('table',{key:'table',__source:{fileName:_jsxFileName,lineNumber:38}},_react2.default.createElement('tbody',{__source:{fileName:_jsxFileName,lineNumber:39}},rows.map(function(entity,i){return _react2.default.createElement('tr',{key:i,__source:{fileName:_jsxFileName,lineNumber:41}},entity.map(function(f,j){if(f===null){return _react2.default.createElement('td',{key:j,__source:{fileName:_jsxFileName,lineNumber:44}})}var _f=(0,_slicedToArray3.default)(f,2),valueId=_f[0],valueRep=_f[1];var facetClass=j==0?'facet':'facet mid';return[_react2.default.createElement('td',{key:valueId,className:facetClass,__source:{fileName:_jsxFileName,lineNumber:49}},_react2.default.createElement(_Facet2.default,{filterId:filterId,valueId:valueId,valueRep:valueRep,__source:{fileName:_jsxFileName,lineNumber:53}})),_react2.default.createElement('td',{key:'stat',className:'statistic',__source:{fileName:_jsxFileName,lineNumber:60}},_react2.default.createElement(_Stat2.default,{subTotal:amounts[valueId],__source:{fileName:_jsxFileName,lineNumber:64}}))]}))}))),_react2.default.createElement('div',{key:'div',__source:{fileName:_jsxFileName,lineNumber:72}})],__source:{fileName:_jsxFileName,lineNumber:32}}))};exports.default=(0,_reactRedux.connect)(_filter.getFieldValues)(ByValue);

},{"Alternative.jsx":159,"CheckboxI.jsx":137,"Facet.jsx":145,"Stat.jsx":156,"babel-runtime/helpers/slicedToArray":20,"filter.js":129,"react":"react","react-redux":"react-redux"}],142:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _slicedToArray2=require('babel-runtime/helpers/slicedToArray');var _slicedToArray3=_interopRequireDefault(_slicedToArray2);var _jsxFileName='/Users/dirk/github/dariah/client/src/js/app/pure/Doc.jsx';var _react=require('react');var _react2=_interopRequireDefault(_react);var _DocMd=require('DocMd.jsx');var _DocMd2=_interopRequireDefault(_DocMd);var _DocPdf=require('DocPdf.jsx');var _DocPdf2=_interopRequireDefault(_DocPdf);var _DocHtml=require('DocHtml.jsx');var _DocHtml2=_interopRequireDefault(_DocHtml);var _NotFound=require('NotFound.jsx');var _NotFound2=_interopRequireDefault(_NotFound);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var docType={md:_DocMd2.default,pdf:_DocPdf2.default,html:_DocHtml2.default};var Doc=function Doc(_ref){var docPath=_ref.location.pathname;var _$exec$slice=/^(.*)\/([^/]+)$/g.exec(docPath).slice(1),_$exec$slice2=(0,_slicedToArray3.default)(_$exec$slice,2),docDir=_$exec$slice2[0],docFile=_$exec$slice2[1];var _$exec$slice3=/^(.*)\.([^.]+)$/g.exec(docFile).slice(1),_$exec$slice4=(0,_slicedToArray3.default)(_$exec$slice3,2),docName=_$exec$slice4[0],docExt=_$exec$slice4[1];var DocClass=docType[docExt];return DocClass==null?_react2.default.createElement(_NotFound2.default,{params:{splat:'document '+docPath},__source:{fileName:_jsxFileName,lineNumber:19}}):_react2.default.createElement(DocClass,{docDir:docDir,docName:docName,docExt:docExt,tag:docName,__source:{fileName:_jsxFileName,lineNumber:21}})};exports.default=Doc;

},{"DocHtml.jsx":143,"DocMd.jsx":160,"DocPdf.jsx":144,"NotFound.jsx":153,"babel-runtime/helpers/slicedToArray":20,"react":"react"}],143:[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:true});var _jsxFileName="/Users/dirk/github/dariah/client/src/js/app/pure/DocHtml.jsx";var _react=require("react");var _react2=_interopRequireDefault(_react);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var DocHtml=function DocHtml(_ref){var docDir=_ref.docDir,docName=_ref.docName,docExt=_ref.docExt;var src="/api/file"+docDir+"/"+docName+"."+docExt;return _react2.default.createElement("iframe",{height:"100%",width:"100%",src:src,__source:{fileName:_jsxFileName,lineNumber:6}})};exports.default=DocHtml;

},{"react":"react"}],144:[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:true});var _jsxFileName="/Users/dirk/github/dariah/client/src/js/app/pure/DocPdf.jsx";var _react=require("react");var _react2=_interopRequireDefault(_react);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var DocPdf=function DocPdf(_ref){var docDir=_ref.docDir,docName=_ref.docName,docExt=_ref.docExt;var href="/api/file"+docDir+"/"+docName+"."+docExt;var iOS=/iPad|iPhone|iPod/.test(navigator.userAgent)&&!window.MSStream;return iOS?_react2.default.createElement("p",{__source:{fileName:_jsxFileName,lineNumber:7}},_react2.default.createElement("a",{target:"_blank",rel:"noopener noreferrer",href:href,__source:{fileName:_jsxFileName,lineNumber:8}},docName)," (open pdf in a new tab)"):_react2.default.createElement("object",{height:"100%",width:"100%",data:href,type:"application/pdf",__source:{fileName:_jsxFileName,lineNumber:11}},_react2.default.createElement("a",{target:"_blank",rel:"noopener noreferrer",href:href,__source:{fileName:_jsxFileName,lineNumber:17}},docName)," (open pdf in a new tab)")};exports.default=DocPdf;

},{"react":"react"}],145:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _jsxFileName='/Users/dirk/github/dariah/client/src/js/app/pure/Facet.jsx';var _react=require('react');var _react2=_interopRequireDefault(_react);var _reactRedux=require('react-redux');var _filter=require('filter.js');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var Facet=function Facet(_ref){var filterId=_ref.filterId,valueId=_ref.valueId,valueRep=_ref.valueRep,filterSetting=_ref.filterSetting,handle=_ref.handle;var isOn=filterSetting[valueId];return _react2.default.createElement('span',{__source:{fileName:_jsxFileName,lineNumber:8}},_react2.default.createElement('input',{type:'checkbox',checked:isOn,className:'facet',onChange:function onChange(){return handle(filterId,valueId,!isOn)},__source:{fileName:_jsxFileName,lineNumber:9}}),' '+valueRep)};exports.default=(0,_reactRedux.connect)(_filter.getFilterSetting,{handle:_filter.changeFacet})(Facet);

},{"filter.js":129,"react":"react","react-redux":"react-redux"}],146:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _jsxFileName='/Users/dirk/github/dariah/client/src/js/app/pure/Filter.jsx';var _react=require('react');var _react2=_interopRequireDefault(_react);var _reactRedux=require('react-redux');var _FullText=require('FullText.jsx');var _FullText2=_interopRequireDefault(_FullText);var _ByValue=require('ByValue.jsx');var _ByValue2=_interopRequireDefault(_ByValue);var _EUMap=require('EUMap.jsx');var _EUMap2=_interopRequireDefault(_EUMap);var _tables=require('tables.js');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var filterClass={FullText:_FullText2.default,EUMap:_EUMap2.default,ByValue:_ByValue2.default};var Filter=function Filter(_ref){var tables=_ref.tables,table=_ref.table,fields=_ref.fields,filterList=_ref.filterList,filteredAmount=_ref.filteredAmount,filteredAmountOthers=_ref.filteredAmountOthers,amounts=_ref.amounts;return _react2.default.createElement('div',{__source:{fileName:_jsxFileName,lineNumber:24}},filterList.filter(function(x){return fields[x.field]}).map(function(filter,filterId){var type=filter.type;var Fclass=filterClass[type];if(false&&type!='FullText'){return _react2.default.createElement('p',{key:filterId,__source:{fileName:_jsxFileName,lineNumber:29}},type)}return _react2.default.createElement(Fclass,{key:filterId,table:table,filterId:filterId,filterField:filter.field,filterLabel:filter.label,maxCols:filter.maxCols,filteredAmount:filteredAmount,filteredAmountOthers:filteredAmountOthers[filterId],amounts:amounts[filterId],expanded:filter.expanded,__source:{fileName:_jsxFileName,lineNumber:32}})}))};exports.default=(0,_reactRedux.connect)(_tables.getTableFilters)(Filter);

},{"ByValue.jsx":141,"EUMap.jsx":138,"FullText.jsx":147,"react":"react","react-redux":"react-redux","tables.js":134}],147:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _jsxFileName='/Users/dirk/github/dariah/client/src/js/app/pure/FullText.jsx';var _react=require('react');var _react2=_interopRequireDefault(_react);var _reactRedux=require('react-redux');var _Stat=require('Stat.jsx');var _Stat2=_interopRequireDefault(_Stat);var _filter=require('filter.js');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var FullText=function FullText(_ref){var filterId=_ref.filterId,filterField=_ref.filterField,filterLabel=_ref.filterLabel,filterSetting=_ref.filterSetting,filteredAmount=_ref.filteredAmount,filteredAmountOthers=_ref.filteredAmountOthers,handle=_ref.handle;return _react2.default.createElement('div',{__source:{fileName:_jsxFileName,lineNumber:13}},_react2.default.createElement('p',{title:'Search in '+filterField,__source:{fileName:_jsxFileName,lineNumber:14}},_react2.default.createElement('input',{type:'text',className:'search',placeholder:'search in '+filterLabel,value:filterSetting,onChange:function onChange(event){return handle(filterId,event.target.value)},__source:{fileName:_jsxFileName,lineNumber:15}}),' ',_react2.default.createElement(_Stat2.default,{subTotal:filteredAmount,total:filteredAmountOthers,__source:{fileName:_jsxFileName,lineNumber:22}})))};exports.default=(0,_reactRedux.connect)(_filter.getFilterSetting,{handle:_filter.changeFulltext})(FullText);

},{"Stat.jsx":156,"filter.js":129,"react":"react","react-redux":"react-redux"}],148:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _jsxFileName='/Users/dirk/github/dariah/client/src/js/app/pure/ItemField.jsx';var _react=require('react');var _react2=_interopRequireDefault(_react);var _reactRedux=require('react-redux');var _reducers=require('reducers.js');var _tables=require('tables.js');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var trimDate=function trimDate(text){return text==null?'':text.replace(/\.[0-9]+/,'')};var userAsString=function userAsString(_ref,user){var valId=_ref._id;var valRep=void 0;var entity=user.entities[valId];if(entity){var _entity$values=entity.values,eppn=_entity$values.eppn,firstName=_entity$values.firstName,lastName=_entity$values.lastName,emailPre=_entity$values.emailPre,authority=_entity$values.authority,mayLogin=_entity$values.mayLogin;var email=emailPre||'';var linkText=[firstName||'',lastName||''].filter(function(x){return x}).join(' ');if(linkText==''){linkText=email}var namePart=linkText&&email?'['+linkText+'](mailto:'+email+')':linkText+email;var eppnPart=eppn?' eppn='+eppn+' ':'';var authorityPart=authority?' authenticated by='+authority+' ':'';var mayLoginPart=mayLogin?' active='+mayLogin+' ':'';valRep=[namePart,eppnPart,authorityPart,mayLoginPart].filter(function(x){return x}).join('; ')}else{valRep='UNKNOWN'}return valRep};var countryAsString=function countryAsString(_ref2,country){var valId=_ref2._id;var entity=country.entities[valId];if(entity){var _entity$values2=entity.values,name=_entity$values2.name,iso=_entity$values2.iso;return iso+': '+name}else{return'UNKNOWN'}};var valueAsString=function valueAsString(value,_ref3){var valType=_ref3.valType,convert=_ref3.convert,initial=_ref3.initial,user=_ref3.user,country=_ref3.country;if(value==null){return''}switch(valType){case'rel':{switch(convert){case'user':{return userAsString(value,user)}case'country':{return countryAsString(value,country)}default:return value.value;}}case'datetime':{return trimDate(value)}default:{return value}}};var ItemField=function ItemField(_ref4){var label=_ref4.label,values=_ref4.values,valType=_ref4.valType,convert=_ref4.convert,initial=_ref4.initial,user=_ref4.user,country=_ref4.country;var props={valType:valType,convert:convert,initial:initial,user:user,country:country};return _react2.default.createElement('p',{__source:{fileName:_jsxFileName,lineNumber:69}},_react2.default.createElement('label',{__source:{fileName:_jsxFileName,lineNumber:70}},_react2.default.createElement('b',{__source:{fileName:_jsxFileName,lineNumber:70}},label,':')),' ',values.map(function(value,i){return _react2.default.createElement('span',{key:i,__source:{fileName:_jsxFileName,lineNumber:73}},i!=0?' | ':'',_react2.default.createElement('span',{__source:{fileName:_jsxFileName,lineNumber:73}},valueAsString(value,props)))}))};exports.default=(0,_reactRedux.connect)((0,_reducers.combineSelectors)(_tables.getUser,_tables.getCountry))(ItemField);

},{"react":"react","react-redux":"react-redux","reducers.js":132,"tables.js":134}],149:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _typeof2=require('babel-runtime/helpers/typeof');var _typeof3=_interopRequireDefault(_typeof2);var _slicedToArray2=require('babel-runtime/helpers/slicedToArray');var _slicedToArray3=_interopRequireDefault(_slicedToArray2);var _jsxFileName='/Users/dirk/github/dariah/client/src/js/app/pure/ItemHead.jsx';var _react=require('react');var _react2=_interopRequireDefault(_react);var _Alternative=require('Alternative.jsx');var _Alternative2=_interopRequireDefault(_Alternative);var _ItemRecord=require('ItemRecord.jsx');var _ItemRecord2=_interopRequireDefault(_ItemRecord);var _NavLink=require('NavLink.jsx');var _NavLink2=_interopRequireDefault(_NavLink);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var ItemHead=function ItemHead(_ref){var table=_ref.table,values=_ref.values,title=_ref.title,inplace=_ref.inplace;var eId=values._id,entityHeadPre=values[title];var entityHead=void 0;if(!entityHeadPre){entityHead='-empty-'}else{var _entityHeadPre=(0,_slicedToArray3.default)(entityHeadPre,1);entityHead=_entityHeadPre[0];if((typeof entityHead==='undefined'?'undefined':(0,_typeof3.default)(entityHead))=='object'){var _entityHead=entityHead,value=_entityHead.value;entityHead=value}}var control1=function control1(handler){return _react2.default.createElement('span',{className:'button-small fa fa-chevron-down',onClick:handler,__source:{fileName:_jsxFileName,lineNumber:18}})};var control2=function control2(handler){return _react2.default.createElement('span',{className:'button-small fa fa-chevron-right',onClick:handler,__source:{fileName:_jsxFileName,lineNumber:19}})};var controlPlacement=function controlPlacement(control){return _react2.default.createElement('p',{__source:{fileName:_jsxFileName,lineNumber:21}},control,_react2.default.createElement('span',{__source:{fileName:_jsxFileName,lineNumber:23}},entityHead))};return _react2.default.createElement('tr',{id:eId,__source:{fileName:_jsxFileName,lineNumber:30}},_react2.default.createElement('td',{__source:{fileName:_jsxFileName,lineNumber:31}},inplace?_react2.default.createElement(_Alternative2.default,{tag:table+'_'+eId,controlPlacement:controlPlacement,controls:[control1,control2],alternatives:[_react2.default.createElement(_ItemRecord2.default,{key:'show',table:table,eId:eId,__source:{fileName:_jsxFileName,lineNumber:38}}),''],initial:1,__source:{fileName:_jsxFileName,lineNumber:33}}):_react2.default.createElement(_NavLink2.default,{className:'nav',to:'/'+table+'/mylist/'+eId,__source:{fileName:_jsxFileName,lineNumber:47}},_react2.default.createElement('span',{__source:{fileName:_jsxFileName,lineNumber:48}},entityHead))))};exports.default=ItemHead;

},{"Alternative.jsx":159,"ItemRecord.jsx":164,"NavLink.jsx":152,"babel-runtime/helpers/slicedToArray":20,"babel-runtime/helpers/typeof":22,"react":"react"}],150:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _jsxFileName='/Users/dirk/github/dariah/client/src/js/app/pure/ItemList.jsx';var _react=require('react');var _react2=_interopRequireDefault(_react);var _reactRedux=require('react-redux');var _ItemHead=require('ItemHead.jsx');var _ItemHead2=_interopRequireDefault(_ItemHead);var _tables=require('tables.js');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var ItemList=function ItemList(_ref){var tables=_ref.tables,table=_ref.table,title=_ref.title,filteredData=_ref.filteredData,inplace=_ref.inplace;var entities=tables[table].entities;return _react2.default.createElement('div',{__source:{fileName:_jsxFileName,lineNumber:9}},_react2.default.createElement('table',{__source:{fileName:_jsxFileName,lineNumber:10}},_react2.default.createElement('tbody',{__source:{fileName:_jsxFileName,lineNumber:11}},filteredData.map(function(eId){var values=entities[eId].values;return _react2.default.createElement(_ItemHead2.default,{key:eId,table:table,title:title,values:values,inplace:inplace,__source:{fileName:_jsxFileName,lineNumber:15}})}))))};exports.default=(0,_reactRedux.connect)(_tables.getTables)(ItemList);

},{"ItemHead.jsx":149,"react":"react","react-redux":"react-redux","tables.js":134}],151:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _jsxFileName='/Users/dirk/github/dariah/client/src/js/app/pure/ItemRecordPre.jsx';var _react=require('react');var _react2=_interopRequireDefault(_react);var _ItemRecord=require('ItemRecord.jsx');var _ItemRecord2=_interopRequireDefault(_ItemRecord);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var ItemRecordPre=function ItemRecordPre(_ref){var _ref$params=_ref.params,table=_ref$params.table,eId=_ref$params.eId,ownOnly=_ref.route.ownOnly;return _react2.default.createElement(_ItemRecord2.default,{table:table,eId:eId,ownOnly:ownOnly,__source:{fileName:_jsxFileName,lineNumber:6}})};exports.default=ItemRecordPre;

},{"ItemRecord.jsx":164,"react":"react"}],152:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _extends2=require('babel-runtime/helpers/extends');var _extends3=_interopRequireDefault(_extends2);var _jsxFileName='/Users/dirk/github/dariah/client/src/js/app/pure/NavLink.jsx';var _react=require('react');var _react2=_interopRequireDefault(_react);var _reactRouter=require('react-router');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var NavLink=function NavLink(props){return _react2.default.createElement(_reactRouter.Link,(0,_extends3.default)({},props,{activeClassName:'active',__source:{fileName:_jsxFileName,lineNumber:4}}))};exports.default=NavLink;

},{"babel-runtime/helpers/extends":16,"react":"react","react-router":"react-router"}],153:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _jsxFileName='/Users/dirk/github/dariah/client/src/js/app/pure/NotFound.jsx';var _react=require('react');var _react2=_interopRequireDefault(_react);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var NotFound=function NotFound(_ref){var splat=_ref.params.splat;return _react2.default.createElement('h1',{__source:{fileName:_jsxFileName,lineNumber:3}},'404: ',_react2.default.createElement('code',{__source:{fileName:_jsxFileName,lineNumber:3}},splat),' not found on this site.')};exports.default=NotFound;

},{"react":"react"}],154:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _jsxFileName='/Users/dirk/github/dariah/client/src/js/app/pure/Pane.jsx';var _react=require('react');var _react2=_interopRequireDefault(_react);var _reactRedux=require('react-redux');var _win=require('win.js');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var Pane=function Pane(_ref){var format=_ref.format,position=_ref.position,children=_ref.children,height=_ref.height,width=_ref.width;return _react2.default.createElement('div',{className:format,style:(0,_win.columnStyle)(position,{height:height,width:width}),__source:{fileName:_jsxFileName,lineNumber:6}},children)};exports.default=(0,_reactRedux.connect)(_win.getWinDim)(Pane);

},{"react":"react","react-redux":"react-redux","win.js":135}],155:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _jsxFileName='/Users/dirk/github/dariah/client/src/js/app/pure/Root.jsx';var _react=require('react');var _react2=_interopRequireDefault(_react);var _reactRedux=require('react-redux');var _Window=require('Window.jsx');var _Window2=_interopRequireDefault(_Window);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var Root=function Root(_ref){var store=_ref.store,children=_ref.children;return _react2.default.createElement(_reactRedux.Provider,{store:store,__source:{fileName:_jsxFileName,lineNumber:6}},_react2.default.createElement(_Window2.default,{__source:{fileName:_jsxFileName,lineNumber:7}},children))};exports.default=Root;

},{"Window.jsx":167,"react":"react","react-redux":"react-redux"}],156:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _jsxFileName='/Users/dirk/github/dariah/client/src/js/app/pure/Stat.jsx';var _react=require('react');var _react2=_interopRequireDefault(_react);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var Stat=function Stat(_ref){var subTotal=_ref.subTotal,total=_ref.total;return _react2.default.createElement('span',{className:'good-o',__source:{fileName:_jsxFileName,lineNumber:4}},subTotal==null?'':''+subTotal,total==null||subTotal==null?'':' of ',_react2.default.createElement('strong',{__source:{fileName:_jsxFileName,lineNumber:7}},total==null?'':''+total))};exports.default=Stat;

},{"react":"react"}],157:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _jsxFileName='/Users/dirk/github/dariah/client/src/js/app/pure/Static.jsx';var _react=require('react');var _react2=_interopRequireDefault(_react);var _NavLink=require('NavLink.jsx');var _NavLink2=_interopRequireDefault(_NavLink);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var Static=function Static(){return _react2.default.createElement('span',{className:'small',__source:{fileName:_jsxFileName,lineNumber:5}},_react2.default.createElement(_NavLink2.default,{to:'/docs/about.md',__source:{fileName:_jsxFileName,lineNumber:6}},'About'),_react2.default.createElement(_NavLink2.default,{to:'/tech/docs/design.pdf',__source:{fileName:_jsxFileName,lineNumber:7}},'diagrams'),_react2.default.createElement(_NavLink2.default,{to:'/tech/docs/deploy.md',__source:{fileName:_jsxFileName,lineNumber:8}},'deploy'),_react2.default.createElement('a',{href:'/api/file/tech/docs/gen/index.html',target:'_blank',rel:'noopener noreferrer',__source:{fileName:_jsxFileName,lineNumber:9}},'tech doc'))};exports.default=Static;

},{"NavLink.jsx":152,"react":"react"}],158:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _jsxFileName='/Users/dirk/github/dariah/client/src/js/app/pure/SubApp.jsx';var _react=require('react');var _react2=_interopRequireDefault(_react);var _reactRedux=require('react-redux');var _NavLink=require('NavLink.jsx');var _NavLink2=_interopRequireDefault(_NavLink);var _Pane=require('Pane.jsx');var _Pane2=_interopRequireDefault(_Pane);var _win=require('win.js');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var SubApp=function SubApp(_ref){var table=_ref.params.table,children=_ref.children,height=_ref.height,width=_ref.width;return _react2.default.createElement('div',{__source:{fileName:_jsxFileName,lineNumber:8}},_react2.default.createElement(_Pane2.default,{format:'nav sized',position:'left',__source:{fileName:_jsxFileName,lineNumber:9}},table=='contrib'?_react2.default.createElement('div',{__source:{fileName:_jsxFileName,lineNumber:11}},_react2.default.createElement('p',{__source:{fileName:_jsxFileName,lineNumber:12}},_react2.default.createElement(_NavLink2.default,{to:'/'+table+'/list',__source:{fileName:_jsxFileName,lineNumber:12}},'All items')),_react2.default.createElement('p',{__source:{fileName:_jsxFileName,lineNumber:13}},_react2.default.createElement(_NavLink2.default,{to:'/'+table+'/mylist',__source:{fileName:_jsxFileName,lineNumber:13}},'My work'))):_react2.default.createElement('div',{__source:{fileName:_jsxFileName,lineNumber:16}},_react2.default.createElement('p',{__source:{fileName:_jsxFileName,lineNumber:17}},_react2.default.createElement(_NavLink2.default,{to:'/'+table+'/type',__source:{fileName:_jsxFileName,lineNumber:17}},'Types')),_react2.default.createElement('p',{__source:{fileName:_jsxFileName,lineNumber:18}},_react2.default.createElement(_NavLink2.default,{to:'/'+table+'/assess',__source:{fileName:_jsxFileName,lineNumber:18}},'Criteria')),_react2.default.createElement('p',{__source:{fileName:_jsxFileName,lineNumber:19}},_react2.default.createElement(_NavLink2.default,{to:'/'+table+'/package',__source:{fileName:_jsxFileName,lineNumber:19}},'Packages')))),_react2.default.createElement(_Pane2.default,{format:'sized',position:'right',__source:{fileName:_jsxFileName,lineNumber:23}},children))};exports.default=(0,_reactRedux.connect)(_win.getWinDim)(SubApp);

},{"NavLink.jsx":152,"Pane.jsx":154,"react":"react","react-redux":"react-redux","win.js":135}],159:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _extends2=require('babel-runtime/helpers/extends');var _extends3=_interopRequireDefault(_extends2);var _objectWithoutProperties2=require('babel-runtime/helpers/objectWithoutProperties');var _objectWithoutProperties3=_interopRequireDefault(_objectWithoutProperties2);var _jsxFileName='/Users/dirk/github/dariah/client/src/js/app/state/Alternative.jsx';var _react=require('react');var _react2=_interopRequireDefault(_react);var _reactRedux=require('react-redux');var _alter=require('alter.js');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var handleNext=function handleNext(_ref){var tag=_ref.tag,alternatives=_ref.alternatives,initial=_ref.initial,next=_ref.next;return function(event){event.preventDefault();next(tag,alternatives.length,initial)}};var Alternative=function Alternative(_ref2){var controlPlacement=_ref2.controlPlacement,controls=_ref2.controls,alt=_ref2.alt,alternatives=_ref2.alternatives,rest=(0,_objectWithoutProperties3.default)(_ref2,['controlPlacement','controls','alt','alternatives']);return _react2.default.createElement('div',{__source:{fileName:_jsxFileName,lineNumber:11}},controlPlacement(controls[alt](handleNext((0,_extends3.default)({alternatives:alternatives},rest)))),alternatives[alt])};exports.default=(0,_reactRedux.connect)(_alter.getAlt,{next:_alter.nextAlt})(Alternative);

},{"alter.js":127,"babel-runtime/helpers/extends":16,"babel-runtime/helpers/objectWithoutProperties":18,"react":"react","react-redux":"react-redux"}],160:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _getPrototypeOf=require('babel-runtime/core-js/object/get-prototype-of');var _getPrototypeOf2=_interopRequireDefault(_getPrototypeOf);var _classCallCheck2=require('babel-runtime/helpers/classCallCheck');var _classCallCheck3=_interopRequireDefault(_classCallCheck2);var _createClass2=require('babel-runtime/helpers/createClass');var _createClass3=_interopRequireDefault(_createClass2);var _possibleConstructorReturn2=require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3=_interopRequireDefault(_possibleConstructorReturn2);var _inherits2=require('babel-runtime/helpers/inherits');var _inherits3=_interopRequireDefault(_inherits2);var _jsxFileName='/Users/dirk/github/dariah/client/src/js/app/state/DocMd.jsx';var _react=require('react');var _react2=_interopRequireDefault(_react);var _reactRedux=require('react-redux');var _reactMarkdown=require('react-markdown');var _reactMarkdown2=_interopRequireDefault(_reactMarkdown);var _reactRouter=require('react-router');var _Alternative=require('Alternative.jsx');var _Alternative2=_interopRequireDefault(_Alternative);var _server=require('server.js');var _doc=require('doc.js');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var RouterLink=function RouterLink(_ref){var children=_ref.children,href=_ref.href;return href.match(/^(https?:)?\/\//)?_react2.default.createElement('a',{href:href,__source:{fileName:_jsxFileName,lineNumber:11}},children):_react2.default.createElement(_reactRouter.Link,{to:href,__source:{fileName:_jsxFileName,lineNumber:12}},children)};var DocMd=function(_Component){(0,_inherits3.default)(DocMd,_Component);function DocMd(){(0,_classCallCheck3.default)(this,DocMd);return(0,_possibleConstructorReturn3.default)(this,(DocMd.__proto__||(0,_getPrototypeOf2.default)(DocMd)).apply(this,arguments))}(0,_createClass3.default)(DocMd,[{key:'render',value:function render(){var _props=this.props,docName=_props.docName,data=_props.data;var controlPlacement=function controlPlacement(control){return _react2.default.createElement('p',{style:{float:'right'},__source:{fileName:_jsxFileName,lineNumber:18}},control)};var control1=function control1(handler){return _react2.default.createElement('a',{className:'control fa fa-hand-o-down',href:'#',title:'markdown source',onClick:handler,__source:{fileName:_jsxFileName,lineNumber:19}})};var control2=function control2(handler){return _react2.default.createElement('a',{className:'control fa fa-file-code-o',href:'#',title:'formatted',onClick:handler,__source:{fileName:_jsxFileName,lineNumber:20}})};if(data==null){return _react2.default.createElement('div',{__source:{fileName:_jsxFileName,lineNumber:23}},'No document '+docName)}return _react2.default.createElement('div',{style:{paddingLeft:'0.5em'},__source:{fileName:_jsxFileName,lineNumber:26}},_react2.default.createElement(_Alternative2.default,{tag:docName,controlPlacement:controlPlacement,controls:[control1,control2],alternatives:[_react2.default.createElement('div',{key:'fmt',__source:{fileName:_jsxFileName,lineNumber:32}},_react2.default.createElement(_reactMarkdown2.default,{source:data,renderers:{Link:RouterLink},__source:{fileName:_jsxFileName,lineNumber:33}})),_react2.default.createElement('div',{key:'src',__source:{fileName:_jsxFileName,lineNumber:39}},_react2.default.createElement('pre',{className:'md-source',__source:{fileName:_jsxFileName,lineNumber:40}},data))],__source:{fileName:_jsxFileName,lineNumber:27}}))}},{key:'componentDidMount',value:function componentDidMount(){var _props2=this.props,docDir=_props2.docDir,docName=_props2.docName,docExt=_props2.docExt,fetch=_props2.fetch;var path=docDir+'/'+docName+'.'+docExt;fetch({type:'fetchDoc',contentType:'json',path:path,desc:'document '+docName})}}]);return DocMd}(_react.Component);exports.default=(0,_reactRedux.connect)(_doc.getDoc,{fetch:_server.fetchData})(DocMd);

},{"Alternative.jsx":159,"babel-runtime/core-js/object/get-prototype-of":8,"babel-runtime/helpers/classCallCheck":13,"babel-runtime/helpers/createClass":14,"babel-runtime/helpers/inherits":17,"babel-runtime/helpers/possibleConstructorReturn":19,"doc.js":128,"react":"react","react-markdown":"react-markdown","react-redux":"react-redux","react-router":"react-router","server.js":133}],161:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _getPrototypeOf=require('babel-runtime/core-js/object/get-prototype-of');var _getPrototypeOf2=_interopRequireDefault(_getPrototypeOf);var _classCallCheck2=require('babel-runtime/helpers/classCallCheck');var _classCallCheck3=_interopRequireDefault(_classCallCheck2);var _createClass2=require('babel-runtime/helpers/createClass');var _createClass3=_interopRequireDefault(_createClass2);var _possibleConstructorReturn2=require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3=_interopRequireDefault(_possibleConstructorReturn2);var _inherits2=require('babel-runtime/helpers/inherits');var _inherits3=_interopRequireDefault(_inherits2);var _jsxFileName='/Users/dirk/github/dariah/client/src/js/app/state/FilterCompute.jsx';var _react=require('react');var _react2=_interopRequireDefault(_react);var _reactRedux=require('react-redux');var _ItemList=require('ItemList.jsx');var _ItemList2=_interopRequireDefault(_ItemList);var _Filter=require('Filter.jsx');var _Filter2=_interopRequireDefault(_Filter);var _Pane=require('Pane.jsx');var _Pane2=_interopRequireDefault(_Pane);var _filter=require('filter.js');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var FilterCompute=function(_Component){(0,_inherits3.default)(FilterCompute,_Component);function FilterCompute(props){(0,_classCallCheck3.default)(this,FilterCompute);var _this=(0,_possibleConstructorReturn3.default)(this,(FilterCompute.__proto__||(0,_getPrototypeOf2.default)(FilterCompute)).call(this));var tables=props.tables,table=props.table,initialized=props.initialized,init=props.init;if(!initialized){init(table,tables)}return _this}(0,_createClass3.default)(FilterCompute,[{key:'render',value:function render(){var initialized=this.props.initialized;if(!initialized){return _react2.default.createElement('div',{__source:{fileName:_jsxFileName,lineNumber:17}})}var _props=this.props,tables=_props.tables,table=_props.table,filteredData=_props.filteredData,filteredAmountOthers=_props.filteredAmountOthers,amounts=_props.amounts;var _tables$table=tables[table],order=_tables$table.order,title=_tables$table.title;return _react2.default.createElement('div',{__source:{fileName:_jsxFileName,lineNumber:21}},_react2.default.createElement(_Pane2.default,{format:'sized',position:'rightLeft',__source:{fileName:_jsxFileName,lineNumber:22}},_react2.default.createElement('p',{__source:{fileName:_jsxFileName,lineNumber:23}},'Total ',_react2.default.createElement('span',{className:'good-o',__source:{fileName:_jsxFileName,lineNumber:23}},order.length)),_react2.default.createElement(_Filter2.default,{table:table,filteredAmount:filteredData.length,filteredAmountOthers:filteredAmountOthers,amounts:amounts,__source:{fileName:_jsxFileName,lineNumber:24}})),_react2.default.createElement(_Pane2.default,{format:'sized',position:'rightRight',__source:{fileName:_jsxFileName,lineNumber:31}},_react2.default.createElement(_ItemList2.default,{table:table,title:title,filteredData:filteredData,inplace:true,__source:{fileName:_jsxFileName,lineNumber:32}})))}}]);return FilterCompute}(_react.Component);exports.default=(0,_reactRedux.connect)(_filter.getFilterApplied,{init:_filter.setupFiltering})(FilterCompute);

},{"Filter.jsx":146,"ItemList.jsx":150,"Pane.jsx":154,"babel-runtime/core-js/object/get-prototype-of":8,"babel-runtime/helpers/classCallCheck":13,"babel-runtime/helpers/createClass":14,"babel-runtime/helpers/inherits":17,"babel-runtime/helpers/possibleConstructorReturn":19,"filter.js":129,"react":"react","react-redux":"react-redux"}],162:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _getPrototypeOf=require('babel-runtime/core-js/object/get-prototype-of');var _getPrototypeOf2=_interopRequireDefault(_getPrototypeOf);var _classCallCheck2=require('babel-runtime/helpers/classCallCheck');var _classCallCheck3=_interopRequireDefault(_classCallCheck2);var _createClass2=require('babel-runtime/helpers/createClass');var _createClass3=_interopRequireDefault(_createClass2);var _possibleConstructorReturn2=require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3=_interopRequireDefault(_possibleConstructorReturn2);var _inherits2=require('babel-runtime/helpers/inherits');var _inherits3=_interopRequireDefault(_inherits2);var _jsxFileName='/Users/dirk/github/dariah/client/src/js/app/state/ItemFiltered.jsx';var _react=require('react');var _react2=_interopRequireDefault(_react);var _reactRedux=require('react-redux');var _FilterCompute=require('FilterCompute.jsx');var _FilterCompute2=_interopRequireDefault(_FilterCompute);var _server=require('server.js');var _tables=require('tables.js');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var ItemFiltered=function(_Component){(0,_inherits3.default)(ItemFiltered,_Component);function ItemFiltered(){(0,_classCallCheck3.default)(this,ItemFiltered);return(0,_possibleConstructorReturn3.default)(this,(ItemFiltered.__proto__||(0,_getPrototypeOf2.default)(ItemFiltered)).apply(this,arguments))}(0,_createClass3.default)(ItemFiltered,[{key:'render',value:function render(){var _props=this.props,table=_props.params.table,tables=_props.tables;if(tables==null||tables[table]==null||tables.country==null||tables.user==null){return _react2.default.createElement('div',{__source:{fileName:_jsxFileName,lineNumber:12}})}return _react2.default.createElement(_FilterCompute2.default,{table:table,__source:{fileName:_jsxFileName,lineNumber:15}})}},{key:'componentDidMount',value:function componentDidMount(){var _props2=this.props,table=_props2.params.table,tables=_props2.tables,fetch=_props2.fetch;if(tables==null||tables[table]==null){fetch({type:'fetchTable',contentType:'db',path:'/list?table='+table,desc:table+' table}',table:table})}if(tables==null||tables.country==null){fetch({type:'fetchTable',contentType:'db',path:'/member_country',desc:'country table}',table:'country'})}if(tables==null||tables.user==null){fetch({type:'fetchTable',contentType:'db',path:'/user',desc:'user table}',table:'user'})}}}]);return ItemFiltered}(_react.Component);exports.default=(0,_reactRedux.connect)(_tables.getTables,{fetch:_server.fetchData})(ItemFiltered);

},{"FilterCompute.jsx":161,"babel-runtime/core-js/object/get-prototype-of":8,"babel-runtime/helpers/classCallCheck":13,"babel-runtime/helpers/createClass":14,"babel-runtime/helpers/inherits":17,"babel-runtime/helpers/possibleConstructorReturn":19,"react":"react","react-redux":"react-redux","server.js":133,"tables.js":134}],163:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _getPrototypeOf=require('babel-runtime/core-js/object/get-prototype-of');var _getPrototypeOf2=_interopRequireDefault(_getPrototypeOf);var _classCallCheck2=require('babel-runtime/helpers/classCallCheck');var _classCallCheck3=_interopRequireDefault(_classCallCheck2);var _createClass2=require('babel-runtime/helpers/createClass');var _createClass3=_interopRequireDefault(_createClass2);var _possibleConstructorReturn2=require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3=_interopRequireDefault(_possibleConstructorReturn2);var _inherits2=require('babel-runtime/helpers/inherits');var _inherits3=_interopRequireDefault(_inherits2);var _jsxFileName='/Users/dirk/github/dariah/client/src/js/app/state/ItemMy.jsx';var _react=require('react');var _react2=_interopRequireDefault(_react);var _reactRedux=require('react-redux');var _server=require('server.js');var _tables=require('tables.js');var _ItemList=require('ItemList.jsx');var _ItemList2=_interopRequireDefault(_ItemList);var _Pane=require('Pane.jsx');var _Pane2=_interopRequireDefault(_Pane);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var ItemMy=function(_Component){(0,_inherits3.default)(ItemMy,_Component);function ItemMy(){(0,_classCallCheck3.default)(this,ItemMy);return(0,_possibleConstructorReturn3.default)(this,(ItemMy.__proto__||(0,_getPrototypeOf2.default)(ItemMy)).apply(this,arguments))}(0,_createClass3.default)(ItemMy,[{key:'render',value:function render(){var _props=this.props,table=_props.params.table,tables=_props.tables,children=_props.children;if(tables==null||tables[table]==null||tables[table].my==null||tables.country==null||tables.user==null){return _react2.default.createElement('div',{__source:{fileName:_jsxFileName,lineNumber:18}})}var _tables$table=tables[table],entities=_tables$table.entities,title=_tables$table.title,perm=_tables$table.perm,my=_tables$table.my;return _react2.default.createElement('div',{__source:{fileName:_jsxFileName,lineNumber:22}},_react2.default.createElement(_Pane2.default,{format:'nav sized',position:'rightLeftNav',__source:{fileName:_jsxFileName,lineNumber:23}},_react2.default.createElement('p',{__source:{fileName:_jsxFileName,lineNumber:24}},my.length+' items ',perm!=null&&perm.insert?_react2.default.createElement('span',{className:'fa fa-plus button-large insert',title:'New item',__source:{fileName:_jsxFileName,lineNumber:27}}):null),_react2.default.createElement(_ItemList2.default,{table:table,title:title,filteredData:my,inplace:false,__source:{fileName:_jsxFileName,lineNumber:33}})),_react2.default.createElement(_Pane2.default,{format:'sized',position:'rightRightBody',__source:{fileName:_jsxFileName,lineNumber:35}},children))}},{key:'componentDidMount',value:function componentDidMount(){var _props2=this.props,table=_props2.params.table,tables=_props2.tables,fetch=_props2.fetch;if(tables==null||tables[table]==null||tables[table].my==null){fetch({type:'fetchTableMy',contentType:'db',path:'/my?table='+table,desc:table+' table (my records)}',table:table})}if(tables==null||tables.country==null){fetch({type:'fetchTable',contentType:'db',path:'/member_country',desc:'country table}',table:'country'})}if(tables==null||tables.user==null){fetch({type:'fetchTable',contentType:'db',path:'/user',desc:'user table}',table:'user'})}}}]);return ItemMy}(_react.Component);exports.default=(0,_reactRedux.connect)(_tables.getTables,{fetch:_server.fetchData})(ItemMy);

},{"ItemList.jsx":150,"Pane.jsx":154,"babel-runtime/core-js/object/get-prototype-of":8,"babel-runtime/helpers/classCallCheck":13,"babel-runtime/helpers/createClass":14,"babel-runtime/helpers/inherits":17,"babel-runtime/helpers/possibleConstructorReturn":19,"react":"react","react-redux":"react-redux","server.js":133,"tables.js":134}],164:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _extends2=require('babel-runtime/helpers/extends');var _extends3=_interopRequireDefault(_extends2);var _objectWithoutProperties2=require('babel-runtime/helpers/objectWithoutProperties');var _objectWithoutProperties3=_interopRequireDefault(_objectWithoutProperties2);var _getIterator2=require('babel-runtime/core-js/get-iterator');var _getIterator3=_interopRequireDefault(_getIterator2);var _getPrototypeOf=require('babel-runtime/core-js/object/get-prototype-of');var _getPrototypeOf2=_interopRequireDefault(_getPrototypeOf);var _classCallCheck2=require('babel-runtime/helpers/classCallCheck');var _classCallCheck3=_interopRequireDefault(_classCallCheck2);var _createClass2=require('babel-runtime/helpers/createClass');var _createClass3=_interopRequireDefault(_createClass2);var _possibleConstructorReturn2=require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3=_interopRequireDefault(_possibleConstructorReturn2);var _inherits2=require('babel-runtime/helpers/inherits');var _inherits3=_interopRequireDefault(_inherits2);var _jsxFileName='/Users/dirk/github/dariah/client/src/js/app/state/ItemRecord.jsx';var _react=require('react');var _react2=_interopRequireDefault(_react);var _reactRedux=require('react-redux');var _server=require('server.js');var _tables=require('tables.js');var _ItemField=require('ItemField.jsx');var _ItemField2=_interopRequireDefault(_ItemField);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var ItemRecord=function(_Component){(0,_inherits3.default)(ItemRecord,_Component);function ItemRecord(){var _ref;var _temp,_this,_ret;(0,_classCallCheck3.default)(this,ItemRecord);for(var _len=arguments.length,args=Array(_len),_key=0;_key<_len;_key++){args[_key]=arguments[_key]}return _ret=(_temp=(_this=(0,_possibleConstructorReturn3.default)(this,(_ref=ItemRecord.__proto__||(0,_getPrototypeOf2.default)(ItemRecord)).call.apply(_ref,[this].concat(args))),_this),_this.getEntity=function(){var _this2=_this,_this2$props=_this2.props,tables=_this2$props.tables,table=_this2$props.table,eId=_this2$props.eId;var entity=tables[table].entities[eId];return entity},_temp),(0,_possibleConstructorReturn3.default)(_this,_ret)}(0,_createClass3.default)(ItemRecord,[{key:'parseFields',value:function parseFields(){var _props=this.props,tables=_props.tables,table=_props.table,eId=_props.eId;var _tables$table=tables[table],fieldSpecs=_tables$table.fieldSpecs,fieldOrder=_tables$table.fieldOrder;var entity=this.getEntity();var perm=entity.perm,fields=entity.fields,values=entity.values;var fragments=[];var hasEditable=false;var _iteratorNormalCompletion=true;var _didIteratorError=false;var _iteratorError=undefined;try{for(var _iterator=(0,_getIterator3.default)(fieldOrder),_step;!(_iteratorNormalCompletion=(_step=_iterator.next()).done);_iteratorNormalCompletion=true){var name=_step.value;var f=fields[name];if(f==null){continue}var _fieldSpecs$name=fieldSpecs[name],label=_fieldSpecs$name.label,initial=_fieldSpecs$name.initial,specs=(0,_objectWithoutProperties3.default)(_fieldSpecs$name,['label','initial']);var editable=perm.update[name];if(editable){hasEditable=true}fragments.push(_react2.default.createElement(_ItemField2.default,(0,_extends3.default)({key:name,table:table,eId:eId,editable:!!editable,name:name,label:label,values:values[name],initial:initial},specs,{__source:{fileName:_jsxFileName,lineNumber:25}})))}}catch(err){_didIteratorError=true;_iteratorError=err}finally{try{if(!_iteratorNormalCompletion&&_iterator.return){_iterator.return()}}finally{if(_didIteratorError){throw _iteratorError}}}return{fragments:fragments,hasEditable:hasEditable}}},{key:'render',value:function render(){var _props2=this.props,tables=_props2.tables,table=_props2.table,eId=_props2.eId;if(this.needValues()){return _react2.default.createElement('div',{__source:{fileName:_jsxFileName,lineNumber:52}})}var entity=this.getEntity();var perm=entity.perm;var _parseFields=this.parseFields(),fragments=_parseFields.fragments,hasEditable=_parseFields.hasEditable;return _react2.default.createElement('div',{className:'widget-medium',__source:{fileName:_jsxFileName,lineNumber:59}},_react2.default.createElement('p',{__source:{fileName:_jsxFileName,lineNumber:60}},'record in ',table),_react2.default.createElement('p',{__source:{fileName:_jsxFileName,lineNumber:61}},hasEditable?[_react2.default.createElement('span',{key:'save',className:'button-large',__source:{fileName:_jsxFileName,lineNumber:63}},'Save'),perm.delete?_react2.default.createElement('span',{key:'delete',className:'fa fa-trash button-large delete',title:'delete this item',__source:{fileName:_jsxFileName,lineNumber:68}}):null]:null),_react2.default.createElement('div',{__source:{fileName:_jsxFileName,lineNumber:76}},fragments))}},{key:'fetchEntity',value:function fetchEntity(){var _props3=this.props,table=_props3.table,eId=_props3.eId,ownOnly=_props3.ownOnly,fetch=_props3.fetch;if(this.needValues()){fetch({type:'fetchItem',contentType:'db',path:'/view?table='+table+'&id='+eId+(ownOnly?'&own=true':''),desc:table+' record '+eId,table:table})}}},{key:'needValues',value:function needValues(){var _props4=this.props,tables=_props4.tables,table=_props4.table,eId=_props4.eId;return tables==null||tables[table]==null||tables[table].entities[eId]==null||!tables[table].entities[eId].complete}},{key:'componentDidMount',value:function componentDidMount(){if(this.needValues()){this.fetchEntity()}}},{key:'componentDidUpdate',value:function componentDidUpdate(prevProps){var prevTable=prevProps.table,prevEId=prevProps.eId;var _props5=this.props,table=_props5.table,eId=_props5.eId;if((table!=prevTable||eId!=prevEId)&&this.needValues()){this.fetchEntity()}}}]);return ItemRecord}(_react.Component);exports.default=(0,_reactRedux.connect)(_tables.getTables,{fetch:_server.fetchData})(ItemRecord);

},{"ItemField.jsx":148,"babel-runtime/core-js/get-iterator":2,"babel-runtime/core-js/object/get-prototype-of":8,"babel-runtime/helpers/classCallCheck":13,"babel-runtime/helpers/createClass":14,"babel-runtime/helpers/extends":16,"babel-runtime/helpers/inherits":17,"babel-runtime/helpers/objectWithoutProperties":18,"babel-runtime/helpers/possibleConstructorReturn":19,"react":"react","react-redux":"react-redux","server.js":133,"tables.js":134}],165:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _keys=require('babel-runtime/core-js/object/keys');var _keys2=_interopRequireDefault(_keys);var _getPrototypeOf=require('babel-runtime/core-js/object/get-prototype-of');var _getPrototypeOf2=_interopRequireDefault(_getPrototypeOf);var _classCallCheck2=require('babel-runtime/helpers/classCallCheck');var _classCallCheck3=_interopRequireDefault(_classCallCheck2);var _createClass2=require('babel-runtime/helpers/createClass');var _createClass3=_interopRequireDefault(_createClass2);var _possibleConstructorReturn2=require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3=_interopRequireDefault(_possibleConstructorReturn2);var _inherits2=require('babel-runtime/helpers/inherits');var _inherits3=_interopRequireDefault(_inherits2);var _jsxFileName='/Users/dirk/github/dariah/client/src/js/app/state/Login.jsx';var _react=require('react');var _react2=_interopRequireDefault(_react);var _reactRedux=require('react-redux');var _server=require('server.js');var _me=require('me.js');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var Login=function(_Component){(0,_inherits3.default)(Login,_Component);function Login(){(0,_classCallCheck3.default)(this,Login);return(0,_possibleConstructorReturn3.default)(this,(Login.__proto__||(0,_getPrototypeOf2.default)(Login)).apply(this,arguments))}(0,_createClass3.default)(Login,[{key:'render',value:function render(){var me=this.props.me;return _react2.default.createElement('span',{className:'login',__source:{fileName:_jsxFileName,lineNumber:10}},me.eppn&&(0,_keys2.default)(me).length>0?_react2.default.createElement('span',{__source:{fileName:_jsxFileName,lineNumber:12}},_react2.default.createElement('strong',{className:'fa fa-user',title:me.eppn,__source:{fileName:_jsxFileName,lineNumber:13}},me.eppn.split('@')[0]),_react2.default.createElement('span',{className:'fa fa-hashtag',__source:{fileName:_jsxFileName,lineNumber:14}}),me.authority,' ',_react2.default.createElement('em',{__source:{fileName:_jsxFileName,lineNumber:15}},me.groupDesc||'not authenticated'),_react2.default.createElement('a',{href:'/logout',className:'control fa fa-user-times',title:'log out',__source:{fileName:_jsxFileName,lineNumber:16}}),_react2.default.createElement('a',{href:'/slogout',className:'control fa fa-users',title:'sign out',__source:{fileName:_jsxFileName,lineNumber:17}})):_react2.default.createElement('a',{href:'/login',className:'control fa fa-user-plus',__source:{fileName:_jsxFileName,lineNumber:20}},' login'))}},{key:'componentDidMount',value:function componentDidMount(){var fetch=this.props.fetch;fetch({type:'fetchMe',contentType:'db',path:'/who/ami',desc:'me'})}}]);return Login}(_react.Component);exports.default=(0,_reactRedux.connect)(_me.getMe,{fetch:_server.fetchData})(Login);

},{"babel-runtime/core-js/object/get-prototype-of":8,"babel-runtime/core-js/object/keys":9,"babel-runtime/helpers/classCallCheck":13,"babel-runtime/helpers/createClass":14,"babel-runtime/helpers/inherits":17,"babel-runtime/helpers/possibleConstructorReturn":19,"me.js":130,"react":"react","react-redux":"react-redux","server.js":133}],166:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _slicedToArray2=require('babel-runtime/helpers/slicedToArray');var _slicedToArray3=_interopRequireDefault(_slicedToArray2);var _toConsumableArray2=require('babel-runtime/helpers/toConsumableArray');var _toConsumableArray3=_interopRequireDefault(_toConsumableArray2);var _getPrototypeOf=require('babel-runtime/core-js/object/get-prototype-of');var _getPrototypeOf2=_interopRequireDefault(_getPrototypeOf);var _classCallCheck2=require('babel-runtime/helpers/classCallCheck');var _classCallCheck3=_interopRequireDefault(_classCallCheck2);var _createClass2=require('babel-runtime/helpers/createClass');var _createClass3=_interopRequireDefault(_createClass2);var _possibleConstructorReturn2=require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3=_interopRequireDefault(_possibleConstructorReturn2);var _inherits2=require('babel-runtime/helpers/inherits');var _inherits3=_interopRequireDefault(_inherits2);var _jsxFileName='/Users/dirk/github/dariah/client/src/js/app/state/Notification.jsx';var _react=require('react');var _react2=_interopRequireDefault(_react);var _memoBind=require('memoBind.js');var _memoBind2=_interopRequireDefault(_memoBind);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var empty=[];var Notification=function(_Component){(0,_inherits3.default)(Notification,_Component);function Notification(props){(0,_classCallCheck3.default)(this,Notification);var _this=(0,_possibleConstructorReturn3.default)(this,(Notification.__proto__||(0,_getPrototypeOf2.default)(Notification)).call(this,props));_this.refDom=function(label){return function(dom){if(dom){_this.dom[label]=dom}}};_this.notificationHandler=function(action){return function(event){event.preventDefault();if(action==null){_this.clear()}else{_this.setView(action)}}};_this.msgs=[];_this.visible=false;_this.dom={};return _this}(0,_createClass3.default)(Notification,[{key:'notify',value:function notify(msg){this.msgs.push(msg);this.setState({msgs:[].concat((0,_toConsumableArray3.default)(this.msgs))})}},{key:'clear',value:function clear(){this.msgs=[];this.setState({msgs:[]})}},{key:'computeProgress',value:function computeProgress(){var lastMsg=this.msgs.length-1;var lastNote=-1;var lastKind='info';var busy=0;this.msgs.forEach(function(msg,i){if(msg.kind=='error'){lastNote=i;lastKind='error'}else if(msg.kind=='warning'){if(lastKind!='error'){lastNote=i;lastKind='warning'}}busy+=msg.busy||0});if(busy<0){busy=0}var visible=this.visible||lastNote>-1;return[lastMsg,lastNote,lastKind,busy,visible]}},{key:'render',value:function render(){var _this2=this;var _computeProgress=this.computeProgress();var _computeProgress2=(0,_slicedToArray3.default)(_computeProgress,5);this.lastMsg=_computeProgress2[0];this.lastNote=_computeProgress2[1];this.lastKind=_computeProgress2[2];this.busy=_computeProgress2[3];this.visible=_computeProgress2[4];var busyBlocks=new Array(this.busy).fill(1);return _react2.default.createElement('div',{__source:{fileName:_jsxFileName,lineNumber:58}},_react2.default.createElement('p',{className:'msg-spinner',__source:{fileName:_jsxFileName,lineNumber:59}},_react2.default.createElement('span',{title:'show/hide notifications and progress messages',className:this.lastNote>-1?'spin-'+this.lastKind:'spin-ok',__source:{fileName:_jsxFileName,lineNumber:60}},busyBlocks.map(function(b,i){return _react2.default.createElement('span',{key:i,className:'msg-dot fa fa-caret-left',__source:{fileName:_jsxFileName,lineNumber:64}})}),_react2.default.createElement('span',{className:'fa fa-'+(this.busy==0?'circle-o':'spinner fa-spin'),onClick:(0,_memoBind2.default)(this,'notificationHandler',[!this.visible]),__source:{fileName:_jsxFileName,lineNumber:65}}))),_react2.default.createElement('div',{ref:(0,_memoBind2.default)(this,'refDom',['notbox']),className:'msg-box',onClick:(0,_memoBind2.default)(this,'notificationHandler',[false]),__source:{fileName:_jsxFileName,lineNumber:71}},(this.msgs||empty).map(function(msg,index){return _react2.default.createElement('p',{title:msg.cause,key:index,ref:(0,_memoBind2.default)(_this2,'refDom',['m'+index]),className:'msg-line '+[msg.kind]+'-o '+(msg.kind!='info'?'msg-high':''),__source:{fileName:_jsxFileName,lineNumber:77}},msg.text)}),_react2.default.createElement('p',{className:'msg-dismiss',__source:{fileName:_jsxFileName,lineNumber:85}},'(click panel to hide)'),_react2.default.createElement('p',{className:'msg-trash',__source:{fileName:_jsxFileName,lineNumber:86}},_react2.default.createElement('a',{href:'#',title:'clear messages',className:'control fa fa-trash',onClick:(0,_memoBind2.default)(this,'notificationHandler',[null]),__source:{fileName:_jsxFileName,lineNumber:87}}))))}},{key:'componentDidMount',value:function componentDidMount(){this.setView()}},{key:'componentDidUpdate',value:function componentDidUpdate(){this.setView()}},{key:'setView',value:function setView(on){if(on!=null){this.visible=on}this.dom.notbox.style.display=this.visible?'block':'none';this.setScroll()}},{key:'setScroll',value:function setScroll(){if(this.visible){if(this.lastNote>-1){this.dom['m'+this.lastNote].scrollIntoView()}else{if(this.lastMsg>-1){this.dom['m'+this.lastMsg].scrollIntoView()}}}}}]);return Notification}(_react.Component);exports.default=Notification;

},{"babel-runtime/core-js/object/get-prototype-of":8,"babel-runtime/helpers/classCallCheck":13,"babel-runtime/helpers/createClass":14,"babel-runtime/helpers/inherits":17,"babel-runtime/helpers/possibleConstructorReturn":19,"babel-runtime/helpers/slicedToArray":20,"babel-runtime/helpers/toConsumableArray":21,"memoBind.js":"memoBind.js","react":"react"}],167:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _getPrototypeOf=require('babel-runtime/core-js/object/get-prototype-of');var _getPrototypeOf2=_interopRequireDefault(_getPrototypeOf);var _classCallCheck2=require('babel-runtime/helpers/classCallCheck');var _classCallCheck3=_interopRequireDefault(_classCallCheck2);var _createClass2=require('babel-runtime/helpers/createClass');var _createClass3=_interopRequireDefault(_createClass2);var _possibleConstructorReturn2=require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3=_interopRequireDefault(_possibleConstructorReturn2);var _inherits2=require('babel-runtime/helpers/inherits');var _inherits3=_interopRequireDefault(_inherits2);var _react=require('react');var _reactRedux=require('react-redux');var _throttle=require('lodash/throttle');var _throttle2=_interopRequireDefault(_throttle);var _win=require('win.js');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var Window=function(_Component){(0,_inherits3.default)(Window,_Component);function Window(){var _ref;var _temp,_this,_ret;(0,_classCallCheck3.default)(this,Window);for(var _len=arguments.length,args=Array(_len),_key=0;_key<_len;_key++){args[_key]=arguments[_key]}return _ret=(_temp=(_this=(0,_possibleConstructorReturn3.default)(this,(_ref=Window.__proto__||(0,_getPrototypeOf2.default)(Window)).call.apply(_ref,[this].concat(args))),_this),_this.newWindowSize=(0,_throttle2.default)(function(event){var _this2=_this,resize=_this2.props.resize;resize()},1000),_temp),(0,_possibleConstructorReturn3.default)(_this,_ret)}(0,_createClass3.default)(Window,[{key:'render',value:function render(){var children=this.props.children;return _react.Children.only(children)}},{key:'componentDidMount',value:function componentDidMount(){window.addEventListener('resize',this.newWindowSize)}},{key:'componentWillUnmount',value:function componentWillUnmount(){window.removeEventListener('resize',this.newWindowSize)}}]);return Window}(_react.Component);exports.default=(0,_reactRedux.connect)(_win.getWinDim,{resize:_win.changeWinDim})(Window);

},{"babel-runtime/core-js/object/get-prototype-of":8,"babel-runtime/helpers/classCallCheck":13,"babel-runtime/helpers/createClass":14,"babel-runtime/helpers/inherits":17,"babel-runtime/helpers/possibleConstructorReturn":19,"lodash/throttle":125,"react":"react","react-redux":"react-redux","win.js":135}]},{},[136])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL2FycmF5L2Zyb20uanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL2dldC1pdGVyYXRvci5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvaXMtaXRlcmFibGUuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9hc3NpZ24uanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9jcmVhdGUuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9kZWZpbmUtcHJvcGVydHkuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9lbnRyaWVzLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvZ2V0LXByb3RvdHlwZS1vZi5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2tleXMuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9zZXQtcHJvdG90eXBlLW9mLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9zeW1ib2wuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL3N5bWJvbC9pdGVyYXRvci5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2hlbHBlcnMvY2xhc3NDYWxsQ2hlY2suanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9oZWxwZXJzL2NyZWF0ZUNsYXNzLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvaGVscGVycy9kZWZpbmVQcm9wZXJ0eS5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2hlbHBlcnMvZXh0ZW5kcy5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2hlbHBlcnMvaW5oZXJpdHMuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9oZWxwZXJzL29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvaGVscGVycy9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvaGVscGVycy9zbGljZWRUb0FycmF5LmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvaGVscGVycy90b0NvbnN1bWFibGVBcnJheS5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2hlbHBlcnMvdHlwZW9mLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9hcnJheS9mcm9tLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9nZXQtaXRlcmF0b3IuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL2lzLWl0ZXJhYmxlLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvYXNzaWduLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvY3JlYXRlLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvZGVmaW5lLXByb3BlcnR5LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvZW50cmllcy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2dldC1wcm90b3R5cGUtb2YuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9rZXlzLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3Qvc2V0LXByb3RvdHlwZS1vZi5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vc3ltYm9sL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9zeW1ib2wvaXRlcmF0b3IuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2EtZnVuY3Rpb24uanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FkZC10by11bnNjb3BhYmxlcy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYW4tb2JqZWN0LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hcnJheS1pbmNsdWRlcy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY2xhc3NvZi5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY29mLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jb3JlLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jcmVhdGUtcHJvcGVydHkuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2N0eC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZGVmaW5lZC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZGVzY3JpcHRvcnMuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2RvbS1jcmVhdGUuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2VudW0tYnVnLWtleXMuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2VudW0ta2V5cy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZXhwb3J0LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19mYWlscy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZ2xvYmFsLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19oYXMuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2hpZGUuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2h0bWwuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2llOC1kb20tZGVmaW5lLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pb2JqZWN0LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pcy1hcnJheS1pdGVyLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pcy1hcnJheS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXMtb2JqZWN0LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pdGVyLWNhbGwuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXItY3JlYXRlLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pdGVyLWRlZmluZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlci1kZXRlY3QuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXItc3RlcC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlcmF0b3JzLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19rZXlvZi5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fbGlicmFyeS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fbWV0YS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWFzc2lnbi5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWNyZWF0ZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWRwLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZHBzLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZ29wZC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWdvcG4tZXh0LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZ29wbi5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWdvcHMuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1ncG8uanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1rZXlzLWludGVybmFsLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3Qta2V5cy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LXBpZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LXNhcC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LXRvLWFycmF5LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19wcm9wZXJ0eS1kZXNjLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19yZWRlZmluZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2V0LXByb3RvLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zZXQtdG8tc3RyaW5nLXRhZy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2hhcmVkLWtleS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2hhcmVkLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zdHJpbmctYXQuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWluZGV4LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1pbnRlZ2VyLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1pb2JqZWN0LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1sZW5ndGguanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLW9iamVjdC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8tcHJpbWl0aXZlLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL191aWQuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3drcy1kZWZpbmUuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3drcy1leHQuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3drcy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9jb3JlLmdldC1pdGVyYXRvci1tZXRob2QuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvY29yZS5nZXQtaXRlcmF0b3IuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvY29yZS5pcy1pdGVyYWJsZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYuYXJyYXkuZnJvbS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYuYXJyYXkuaXRlcmF0b3IuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5hc3NpZ24uanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5jcmVhdGUuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5kZWZpbmUtcHJvcGVydHkuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5nZXQtcHJvdG90eXBlLW9mLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3Qua2V5cy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LnNldC1wcm90b3R5cGUtb2YuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC50by1zdHJpbmcuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2LnN0cmluZy5pdGVyYXRvci5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYuc3ltYm9sLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNy5vYmplY3QuZW50cmllcy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczcuc3ltYm9sLmFzeW5jLWl0ZXJhdG9yLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNy5zeW1ib2wub2JzZXJ2YWJsZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy93ZWIuZG9tLml0ZXJhYmxlLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fZnJlZUdsb2JhbC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX3Jvb3QuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2RlYm91bmNlLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9pc09iamVjdC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvaXNPYmplY3RMaWtlLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9pc1N5bWJvbC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvbm93LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC90aHJvdHRsZS5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvdG9OdW1iZXIuanMiLCJzcmMvanMvYXBwL2R1eC9hbHRlci5qcyIsInNyYy9qcy9hcHAvZHV4L2RvYy5qcyIsInNyYy9qcy9hcHAvZHV4L2ZpbHRlci5qcyIsInNyYy9qcy9hcHAvZHV4L21lLmpzIiwic3JjL2pzL2FwcC9kdXgvbm90aWZ5LmpzIiwic3JjL2pzL2FwcC9kdXgvcmVkdWNlcnMuanMiLCJzcmMvanMvYXBwL2R1eC9zZXJ2ZXIuanMiLCJzcmMvanMvYXBwL2R1eC90YWJsZXMuanMiLCJzcmMvanMvYXBwL2R1eC93aW4uanMiLCJzcmMvanMvYXBwL21haW4uanN4Iiwic3JjL2pzL2FwcC9vYmplY3QvQ2hlY2tib3hJLmpzeCIsInNyYy9qcy9hcHAvb2JqZWN0L0VVTWFwLmpzeCIsInNyYy9qcy9hcHAvcHVyZS9BcHAuanN4Iiwic3JjL2pzL2FwcC9wdXJlL0JhY2tvZmZpY2UuanN4Iiwic3JjL2pzL2FwcC9wdXJlL0J5VmFsdWUuanN4Iiwic3JjL2pzL2FwcC9wdXJlL0RvYy5qc3giLCJzcmMvanMvYXBwL3B1cmUvRG9jSHRtbC5qc3giLCJzcmMvanMvYXBwL3B1cmUvRG9jUGRmLmpzeCIsInNyYy9qcy9hcHAvcHVyZS9GYWNldC5qc3giLCJzcmMvanMvYXBwL3B1cmUvRmlsdGVyLmpzeCIsInNyYy9qcy9hcHAvcHVyZS9GdWxsVGV4dC5qc3giLCJzcmMvanMvYXBwL3B1cmUvSXRlbUZpZWxkLmpzeCIsInNyYy9qcy9hcHAvcHVyZS9JdGVtSGVhZC5qc3giLCJzcmMvanMvYXBwL3B1cmUvSXRlbUxpc3QuanN4Iiwic3JjL2pzL2FwcC9wdXJlL0l0ZW1SZWNvcmRQcmUuanN4Iiwic3JjL2pzL2FwcC9wdXJlL05hdkxpbmsuanN4Iiwic3JjL2pzL2FwcC9wdXJlL05vdEZvdW5kLmpzeCIsInNyYy9qcy9hcHAvcHVyZS9QYW5lLmpzeCIsInNyYy9qcy9hcHAvcHVyZS9Sb290LmpzeCIsInNyYy9qcy9hcHAvcHVyZS9TdGF0LmpzeCIsInNyYy9qcy9hcHAvcHVyZS9TdGF0aWMuanN4Iiwic3JjL2pzL2FwcC9wdXJlL1N1YkFwcC5qc3giLCJzcmMvanMvYXBwL3N0YXRlL0FsdGVybmF0aXZlLmpzeCIsInNyYy9qcy9hcHAvc3RhdGUvRG9jTWQuanN4Iiwic3JjL2pzL2FwcC9zdGF0ZS9GaWx0ZXJDb21wdXRlLmpzeCIsInNyYy9qcy9hcHAvc3RhdGUvSXRlbUZpbHRlcmVkLmpzeCIsInNyYy9qcy9hcHAvc3RhdGUvSXRlbU15LmpzeCIsInNyYy9qcy9hcHAvc3RhdGUvSXRlbVJlY29yZC5qc3giLCJzcmMvanMvYXBwL3N0YXRlL0xvZ2luLmpzeCIsInNyYy9qcy9hcHAvc3RhdGUvTm90aWZpY2F0aW9uLmpzeCIsInNyYy9qcy9hcHAvc3RhdGUvV2luZG93LmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBOztBQ0FBOztBQ0FBOztBQ0FBOztBQ0FBOztBQ0FBOztBQ0FBOztBQ0FBOztBQ0FBOztBQ0FBOztBQ0FBOztBQ0FBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBOztBQ0ZBO0FBQ0E7QUFDQTs7QUNGQTtBQUNBO0FBQ0E7O0FDRkE7QUFDQTs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTs7QUNEQTtBQUNBOztBQ0RBO0FBQ0E7O0FDREE7QUFDQTs7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTs7QUNGQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBOztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNURBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7O0FDQUE7QUFDQTtBQUNBOztBQ0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTs7QUNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBOztBQ0ZBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pDQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7O0FDRkE7QUFDQTtBQUNBOztBQ0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBOztBQ0ZBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7O0FDQUE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUxBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7MmJDaEVlLFVBQStDLElBQTlDLE1BQThDLDJEQUF0QyxFQUFzQywwQkFBaEMsS0FBZ0MsTUFBaEMsSUFBZ0MsQ0FBMUIsR0FBMEIsTUFBMUIsR0FBMEIsQ0FBckIsT0FBcUIsTUFBckIsT0FBcUIsQ0FBWixLQUFZLE1BQVosS0FBWSxDQUM1RCxPQUFRLElBQVIsRUFDRSxJQUFLLFNBQUwsQ0FB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LENBQXFDLEtBQUssYUFBMUMsQ0FDRCxDLHFEQUdZLHVDQUFtQixDQUFFLHdCQUFGLENBQW5CLEVBQTZDLE1BQTdDLEMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL2FycmF5L2Zyb21cIiksIF9fZXNNb2R1bGU6IHRydWUgfTsiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vZ2V0LWl0ZXJhdG9yXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07IiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL2lzLWl0ZXJhYmxlXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07IiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9hc3NpZ25cIiksIF9fZXNNb2R1bGU6IHRydWUgfTsiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2NyZWF0ZVwiKSwgX19lc01vZHVsZTogdHJ1ZSB9OyIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvZGVmaW5lLXByb3BlcnR5XCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07IiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9lbnRyaWVzXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07IiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9nZXQtcHJvdG90eXBlLW9mXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07IiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9rZXlzXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07IiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9zZXQtcHJvdG90eXBlLW9mXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07IiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL3N5bWJvbFwiKSwgX19lc01vZHVsZTogdHJ1ZSB9OyIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9zeW1ib2wvaXRlcmF0b3JcIiksIF9fZXNNb2R1bGU6IHRydWUgfTsiLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKGluc3RhbmNlLCBDb25zdHJ1Y3Rvcikge1xuICBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7XG4gIH1cbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfZGVmaW5lUHJvcGVydHkgPSByZXF1aXJlKFwiLi4vY29yZS1qcy9vYmplY3QvZGVmaW5lLXByb3BlcnR5XCIpO1xuXG52YXIgX2RlZmluZVByb3BlcnR5MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2RlZmluZVByb3BlcnR5KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldO1xuICAgICAgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlO1xuICAgICAgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlO1xuICAgICAgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTtcbiAgICAgICgwLCBfZGVmaW5lUHJvcGVydHkyLmRlZmF1bHQpKHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7XG4gICAgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTtcbiAgICBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTtcbiAgICByZXR1cm4gQ29uc3RydWN0b3I7XG4gIH07XG59KCk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfZGVmaW5lUHJvcGVydHkgPSByZXF1aXJlKFwiLi4vY29yZS1qcy9vYmplY3QvZGVmaW5lLXByb3BlcnR5XCIpO1xuXG52YXIgX2RlZmluZVByb3BlcnR5MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2RlZmluZVByb3BlcnR5KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKG9iaiwga2V5LCB2YWx1ZSkge1xuICBpZiAoa2V5IGluIG9iaikge1xuICAgICgwLCBfZGVmaW5lUHJvcGVydHkyLmRlZmF1bHQpKG9iaiwga2V5LCB7XG4gICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgd3JpdGFibGU6IHRydWVcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBvYmpba2V5XSA9IHZhbHVlO1xuICB9XG5cbiAgcmV0dXJuIG9iajtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfYXNzaWduID0gcmVxdWlyZShcIi4uL2NvcmUtanMvb2JqZWN0L2Fzc2lnblwiKTtcblxudmFyIF9hc3NpZ24yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfYXNzaWduKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gX2Fzc2lnbjIuZGVmYXVsdCB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7XG4gIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTtcblxuICAgIGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHtcbiAgICAgIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7XG4gICAgICAgIHRhcmdldFtrZXldID0gc291cmNlW2tleV07XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRhcmdldDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfc2V0UHJvdG90eXBlT2YgPSByZXF1aXJlKFwiLi4vY29yZS1qcy9vYmplY3Qvc2V0LXByb3RvdHlwZS1vZlwiKTtcblxudmFyIF9zZXRQcm90b3R5cGVPZjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9zZXRQcm90b3R5cGVPZik7XG5cbnZhciBfY3JlYXRlID0gcmVxdWlyZShcIi4uL2NvcmUtanMvb2JqZWN0L2NyZWF0ZVwiKTtcblxudmFyIF9jcmVhdGUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfY3JlYXRlKTtcblxudmFyIF90eXBlb2YyID0gcmVxdWlyZShcIi4uL2hlbHBlcnMvdHlwZW9mXCIpO1xuXG52YXIgX3R5cGVvZjMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF90eXBlb2YyKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7XG4gIGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCBcIiArICh0eXBlb2Ygc3VwZXJDbGFzcyA9PT0gXCJ1bmRlZmluZWRcIiA/IFwidW5kZWZpbmVkXCIgOiAoMCwgX3R5cGVvZjMuZGVmYXVsdCkoc3VwZXJDbGFzcykpKTtcbiAgfVxuXG4gIHN1YkNsYXNzLnByb3RvdHlwZSA9ICgwLCBfY3JlYXRlMi5kZWZhdWx0KShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7XG4gICAgY29uc3RydWN0b3I6IHtcbiAgICAgIHZhbHVlOiBzdWJDbGFzcyxcbiAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9XG4gIH0pO1xuICBpZiAoc3VwZXJDbGFzcykgX3NldFByb3RvdHlwZU9mMi5kZWZhdWx0ID8gKDAsIF9zZXRQcm90b3R5cGVPZjIuZGVmYXVsdCkoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzcztcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChvYmosIGtleXMpIHtcbiAgdmFyIHRhcmdldCA9IHt9O1xuXG4gIGZvciAodmFyIGkgaW4gb2JqKSB7XG4gICAgaWYgKGtleXMuaW5kZXhPZihpKSA+PSAwKSBjb250aW51ZTtcbiAgICBpZiAoIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGkpKSBjb250aW51ZTtcbiAgICB0YXJnZXRbaV0gPSBvYmpbaV07XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF90eXBlb2YyID0gcmVxdWlyZShcIi4uL2hlbHBlcnMvdHlwZW9mXCIpO1xuXG52YXIgX3R5cGVvZjMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF90eXBlb2YyKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKHNlbGYsIGNhbGwpIHtcbiAgaWYgKCFzZWxmKSB7XG4gICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpO1xuICB9XG5cbiAgcmV0dXJuIGNhbGwgJiYgKCh0eXBlb2YgY2FsbCA9PT0gXCJ1bmRlZmluZWRcIiA/IFwidW5kZWZpbmVkXCIgOiAoMCwgX3R5cGVvZjMuZGVmYXVsdCkoY2FsbCkpID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpID8gY2FsbCA6IHNlbGY7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX2lzSXRlcmFibGUyID0gcmVxdWlyZShcIi4uL2NvcmUtanMvaXMtaXRlcmFibGVcIik7XG5cbnZhciBfaXNJdGVyYWJsZTMgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pc0l0ZXJhYmxlMik7XG5cbnZhciBfZ2V0SXRlcmF0b3IyID0gcmVxdWlyZShcIi4uL2NvcmUtanMvZ2V0LWl0ZXJhdG9yXCIpO1xuXG52YXIgX2dldEl0ZXJhdG9yMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2dldEl0ZXJhdG9yMik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gc2xpY2VJdGVyYXRvcihhcnIsIGkpIHtcbiAgICB2YXIgX2FyciA9IFtdO1xuICAgIHZhciBfbiA9IHRydWU7XG4gICAgdmFyIF9kID0gZmFsc2U7XG4gICAgdmFyIF9lID0gdW5kZWZpbmVkO1xuXG4gICAgdHJ5IHtcbiAgICAgIGZvciAodmFyIF9pID0gKDAsIF9nZXRJdGVyYXRvcjMuZGVmYXVsdCkoYXJyKSwgX3M7ICEoX24gPSAoX3MgPSBfaS5uZXh0KCkpLmRvbmUpOyBfbiA9IHRydWUpIHtcbiAgICAgICAgX2Fyci5wdXNoKF9zLnZhbHVlKTtcblxuICAgICAgICBpZiAoaSAmJiBfYXJyLmxlbmd0aCA9PT0gaSkgYnJlYWs7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBfZCA9IHRydWU7XG4gICAgICBfZSA9IGVycjtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgaWYgKCFfbiAmJiBfaVtcInJldHVyblwiXSkgX2lbXCJyZXR1cm5cIl0oKTtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIGlmIChfZCkgdGhyb3cgX2U7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIF9hcnI7XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24gKGFyciwgaSkge1xuICAgIGlmIChBcnJheS5pc0FycmF5KGFycikpIHtcbiAgICAgIHJldHVybiBhcnI7XG4gICAgfSBlbHNlIGlmICgoMCwgX2lzSXRlcmFibGUzLmRlZmF1bHQpKE9iamVjdChhcnIpKSkge1xuICAgICAgcmV0dXJuIHNsaWNlSXRlcmF0b3IoYXJyLCBpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkludmFsaWQgYXR0ZW1wdCB0byBkZXN0cnVjdHVyZSBub24taXRlcmFibGUgaW5zdGFuY2VcIik7XG4gICAgfVxuICB9O1xufSgpOyIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX2Zyb20gPSByZXF1aXJlKFwiLi4vY29yZS1qcy9hcnJheS9mcm9tXCIpO1xuXG52YXIgX2Zyb20yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZnJvbSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IGZ1bmN0aW9uIChhcnIpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkge1xuICAgIGZvciAodmFyIGkgPSAwLCBhcnIyID0gQXJyYXkoYXJyLmxlbmd0aCk7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgIGFycjJbaV0gPSBhcnJbaV07XG4gICAgfVxuXG4gICAgcmV0dXJuIGFycjI7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuICgwLCBfZnJvbTIuZGVmYXVsdCkoYXJyKTtcbiAgfVxufTsiLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9pdGVyYXRvciA9IHJlcXVpcmUoXCIuLi9jb3JlLWpzL3N5bWJvbC9pdGVyYXRvclwiKTtcblxudmFyIF9pdGVyYXRvcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9pdGVyYXRvcik7XG5cbnZhciBfc3ltYm9sID0gcmVxdWlyZShcIi4uL2NvcmUtanMvc3ltYm9sXCIpO1xuXG52YXIgX3N5bWJvbDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9zeW1ib2wpO1xuXG52YXIgX3R5cGVvZiA9IHR5cGVvZiBfc3ltYm9sMi5kZWZhdWx0ID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIF9pdGVyYXRvcjIuZGVmYXVsdCA9PT0gXCJzeW1ib2xcIiA/IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH0gOiBmdW5jdGlvbiAob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIF9zeW1ib2wyLmRlZmF1bHQgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IF9zeW1ib2wyLmRlZmF1bHQgJiYgb2JqICE9PSBfc3ltYm9sMi5kZWZhdWx0LnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9O1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5leHBvcnRzLmRlZmF1bHQgPSB0eXBlb2YgX3N5bWJvbDIuZGVmYXVsdCA9PT0gXCJmdW5jdGlvblwiICYmIF90eXBlb2YoX2l0ZXJhdG9yMi5kZWZhdWx0KSA9PT0gXCJzeW1ib2xcIiA/IGZ1bmN0aW9uIChvYmopIHtcbiAgcmV0dXJuIHR5cGVvZiBvYmogPT09IFwidW5kZWZpbmVkXCIgPyBcInVuZGVmaW5lZFwiIDogX3R5cGVvZihvYmopO1xufSA6IGZ1bmN0aW9uIChvYmopIHtcbiAgcmV0dXJuIG9iaiAmJiB0eXBlb2YgX3N5bWJvbDIuZGVmYXVsdCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gX3N5bWJvbDIuZGVmYXVsdCAmJiBvYmogIT09IF9zeW1ib2wyLmRlZmF1bHQucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmogPT09IFwidW5kZWZpbmVkXCIgPyBcInVuZGVmaW5lZFwiIDogX3R5cGVvZihvYmopO1xufTsiLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5zdHJpbmcuaXRlcmF0b3InKTtcbnJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2LmFycmF5LmZyb20nKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLkFycmF5LmZyb207IiwicmVxdWlyZSgnLi4vbW9kdWxlcy93ZWIuZG9tLml0ZXJhYmxlJyk7XG5yZXF1aXJlKCcuLi9tb2R1bGVzL2VzNi5zdHJpbmcuaXRlcmF0b3InKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vbW9kdWxlcy9jb3JlLmdldC1pdGVyYXRvcicpOyIsInJlcXVpcmUoJy4uL21vZHVsZXMvd2ViLmRvbS5pdGVyYWJsZScpO1xucmVxdWlyZSgnLi4vbW9kdWxlcy9lczYuc3RyaW5nLml0ZXJhdG9yJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uL21vZHVsZXMvY29yZS5pcy1pdGVyYWJsZScpOyIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm9iamVjdC5hc3NpZ24nKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLk9iamVjdC5hc3NpZ247IiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYub2JqZWN0LmNyZWF0ZScpO1xudmFyICRPYmplY3QgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJykuT2JqZWN0O1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjcmVhdGUoUCwgRCl7XG4gIHJldHVybiAkT2JqZWN0LmNyZWF0ZShQLCBEKTtcbn07IiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYub2JqZWN0LmRlZmluZS1wcm9wZXJ0eScpO1xudmFyICRPYmplY3QgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJykuT2JqZWN0O1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0eShpdCwga2V5LCBkZXNjKXtcbiAgcmV0dXJuICRPYmplY3QuZGVmaW5lUHJvcGVydHkoaXQsIGtleSwgZGVzYyk7XG59OyIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM3Lm9iamVjdC5lbnRyaWVzJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5PYmplY3QuZW50cmllczsiLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5vYmplY3QuZ2V0LXByb3RvdHlwZS1vZicpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJykuT2JqZWN0LmdldFByb3RvdHlwZU9mOyIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm9iamVjdC5rZXlzJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5PYmplY3Qua2V5czsiLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5vYmplY3Quc2V0LXByb3RvdHlwZS1vZicpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJykuT2JqZWN0LnNldFByb3RvdHlwZU9mOyIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2LnN5bWJvbCcpO1xucmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYub2JqZWN0LnRvLXN0cmluZycpO1xucmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczcuc3ltYm9sLmFzeW5jLWl0ZXJhdG9yJyk7XG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNy5zeW1ib2wub2JzZXJ2YWJsZScpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJykuU3ltYm9sOyIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2LnN0cmluZy5pdGVyYXRvcicpO1xucmVxdWlyZSgnLi4vLi4vbW9kdWxlcy93ZWIuZG9tLml0ZXJhYmxlJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX3drcy1leHQnKS5mKCdpdGVyYXRvcicpOyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICBpZih0eXBlb2YgaXQgIT0gJ2Z1bmN0aW9uJyl0aHJvdyBUeXBlRXJyb3IoaXQgKyAnIGlzIG5vdCBhIGZ1bmN0aW9uIScpO1xuICByZXR1cm4gaXQ7XG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKXsgLyogZW1wdHkgKi8gfTsiLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICBpZighaXNPYmplY3QoaXQpKXRocm93IFR5cGVFcnJvcihpdCArICcgaXMgbm90IGFuIG9iamVjdCEnKTtcbiAgcmV0dXJuIGl0O1xufTsiLCIvLyBmYWxzZSAtPiBBcnJheSNpbmRleE9mXG4vLyB0cnVlICAtPiBBcnJheSNpbmNsdWRlc1xudmFyIHRvSU9iamVjdCA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKVxuICAsIHRvTGVuZ3RoICA9IHJlcXVpcmUoJy4vX3RvLWxlbmd0aCcpXG4gICwgdG9JbmRleCAgID0gcmVxdWlyZSgnLi9fdG8taW5kZXgnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oSVNfSU5DTFVERVMpe1xuICByZXR1cm4gZnVuY3Rpb24oJHRoaXMsIGVsLCBmcm9tSW5kZXgpe1xuICAgIHZhciBPICAgICAgPSB0b0lPYmplY3QoJHRoaXMpXG4gICAgICAsIGxlbmd0aCA9IHRvTGVuZ3RoKE8ubGVuZ3RoKVxuICAgICAgLCBpbmRleCAgPSB0b0luZGV4KGZyb21JbmRleCwgbGVuZ3RoKVxuICAgICAgLCB2YWx1ZTtcbiAgICAvLyBBcnJheSNpbmNsdWRlcyB1c2VzIFNhbWVWYWx1ZVplcm8gZXF1YWxpdHkgYWxnb3JpdGhtXG4gICAgaWYoSVNfSU5DTFVERVMgJiYgZWwgIT0gZWwpd2hpbGUobGVuZ3RoID4gaW5kZXgpe1xuICAgICAgdmFsdWUgPSBPW2luZGV4KytdO1xuICAgICAgaWYodmFsdWUgIT0gdmFsdWUpcmV0dXJuIHRydWU7XG4gICAgLy8gQXJyYXkjdG9JbmRleCBpZ25vcmVzIGhvbGVzLCBBcnJheSNpbmNsdWRlcyAtIG5vdFxuICAgIH0gZWxzZSBmb3IoO2xlbmd0aCA+IGluZGV4OyBpbmRleCsrKWlmKElTX0lOQ0xVREVTIHx8IGluZGV4IGluIE8pe1xuICAgICAgaWYoT1tpbmRleF0gPT09IGVsKXJldHVybiBJU19JTkNMVURFUyB8fCBpbmRleCB8fCAwO1xuICAgIH0gcmV0dXJuICFJU19JTkNMVURFUyAmJiAtMTtcbiAgfTtcbn07IiwiLy8gZ2V0dGluZyB0YWcgZnJvbSAxOS4xLjMuNiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nKClcbnZhciBjb2YgPSByZXF1aXJlKCcuL19jb2YnKVxuICAsIFRBRyA9IHJlcXVpcmUoJy4vX3drcycpKCd0b1N0cmluZ1RhZycpXG4gIC8vIEVTMyB3cm9uZyBoZXJlXG4gICwgQVJHID0gY29mKGZ1bmN0aW9uKCl7IHJldHVybiBhcmd1bWVudHM7IH0oKSkgPT0gJ0FyZ3VtZW50cyc7XG5cbi8vIGZhbGxiYWNrIGZvciBJRTExIFNjcmlwdCBBY2Nlc3MgRGVuaWVkIGVycm9yXG52YXIgdHJ5R2V0ID0gZnVuY3Rpb24oaXQsIGtleSl7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGl0W2tleV07XG4gIH0gY2F0Y2goZSl7IC8qIGVtcHR5ICovIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICB2YXIgTywgVCwgQjtcbiAgcmV0dXJuIGl0ID09PSB1bmRlZmluZWQgPyAnVW5kZWZpbmVkJyA6IGl0ID09PSBudWxsID8gJ051bGwnXG4gICAgLy8gQEB0b1N0cmluZ1RhZyBjYXNlXG4gICAgOiB0eXBlb2YgKFQgPSB0cnlHZXQoTyA9IE9iamVjdChpdCksIFRBRykpID09ICdzdHJpbmcnID8gVFxuICAgIC8vIGJ1aWx0aW5UYWcgY2FzZVxuICAgIDogQVJHID8gY29mKE8pXG4gICAgLy8gRVMzIGFyZ3VtZW50cyBmYWxsYmFja1xuICAgIDogKEIgPSBjb2YoTykpID09ICdPYmplY3QnICYmIHR5cGVvZiBPLmNhbGxlZSA9PSAnZnVuY3Rpb24nID8gJ0FyZ3VtZW50cycgOiBCO1xufTsiLCJ2YXIgdG9TdHJpbmcgPSB7fS50b1N0cmluZztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKGl0KS5zbGljZSg4LCAtMSk7XG59OyIsInZhciBjb3JlID0gbW9kdWxlLmV4cG9ydHMgPSB7dmVyc2lvbjogJzIuNC4wJ307XG5pZih0eXBlb2YgX19lID09ICdudW1iZXInKV9fZSA9IGNvcmU7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWYiLCIndXNlIHN0cmljdCc7XG52YXIgJGRlZmluZVByb3BlcnR5ID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJylcbiAgLCBjcmVhdGVEZXNjICAgICAgPSByZXF1aXJlKCcuL19wcm9wZXJ0eS1kZXNjJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ob2JqZWN0LCBpbmRleCwgdmFsdWUpe1xuICBpZihpbmRleCBpbiBvYmplY3QpJGRlZmluZVByb3BlcnR5LmYob2JqZWN0LCBpbmRleCwgY3JlYXRlRGVzYygwLCB2YWx1ZSkpO1xuICBlbHNlIG9iamVjdFtpbmRleF0gPSB2YWx1ZTtcbn07IiwiLy8gb3B0aW9uYWwgLyBzaW1wbGUgY29udGV4dCBiaW5kaW5nXG52YXIgYUZ1bmN0aW9uID0gcmVxdWlyZSgnLi9fYS1mdW5jdGlvbicpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihmbiwgdGhhdCwgbGVuZ3RoKXtcbiAgYUZ1bmN0aW9uKGZuKTtcbiAgaWYodGhhdCA9PT0gdW5kZWZpbmVkKXJldHVybiBmbjtcbiAgc3dpdGNoKGxlbmd0aCl7XG4gICAgY2FzZSAxOiByZXR1cm4gZnVuY3Rpb24oYSl7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhKTtcbiAgICB9O1xuICAgIGNhc2UgMjogcmV0dXJuIGZ1bmN0aW9uKGEsIGIpe1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSwgYik7XG4gICAgfTtcbiAgICBjYXNlIDM6IHJldHVybiBmdW5jdGlvbihhLCBiLCBjKXtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEsIGIsIGMpO1xuICAgIH07XG4gIH1cbiAgcmV0dXJuIGZ1bmN0aW9uKC8qIC4uLmFyZ3MgKi8pe1xuICAgIHJldHVybiBmbi5hcHBseSh0aGF0LCBhcmd1bWVudHMpO1xuICB9O1xufTsiLCIvLyA3LjIuMSBSZXF1aXJlT2JqZWN0Q29lcmNpYmxlKGFyZ3VtZW50KVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIGlmKGl0ID09IHVuZGVmaW5lZCl0aHJvdyBUeXBlRXJyb3IoXCJDYW4ndCBjYWxsIG1ldGhvZCBvbiAgXCIgKyBpdCk7XG4gIHJldHVybiBpdDtcbn07IiwiLy8gVGhhbmsncyBJRTggZm9yIGhpcyBmdW5ueSBkZWZpbmVQcm9wZXJ0eVxubW9kdWxlLmV4cG9ydHMgPSAhcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbigpe1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KHt9LCAnYScsIHtnZXQ6IGZ1bmN0aW9uKCl7IHJldHVybiA3OyB9fSkuYSAhPSA3O1xufSk7IiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0JylcbiAgLCBkb2N1bWVudCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpLmRvY3VtZW50XG4gIC8vIGluIG9sZCBJRSB0eXBlb2YgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCBpcyAnb2JqZWN0J1xuICAsIGlzID0gaXNPYmplY3QoZG9jdW1lbnQpICYmIGlzT2JqZWN0KGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBpcyA/IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoaXQpIDoge307XG59OyIsIi8vIElFIDgtIGRvbid0IGVudW0gYnVnIGtleXNcbm1vZHVsZS5leHBvcnRzID0gKFxuICAnY29uc3RydWN0b3IsaGFzT3duUHJvcGVydHksaXNQcm90b3R5cGVPZixwcm9wZXJ0eUlzRW51bWVyYWJsZSx0b0xvY2FsZVN0cmluZyx0b1N0cmluZyx2YWx1ZU9mJ1xuKS5zcGxpdCgnLCcpOyIsIi8vIGFsbCBlbnVtZXJhYmxlIG9iamVjdCBrZXlzLCBpbmNsdWRlcyBzeW1ib2xzXG52YXIgZ2V0S2V5cyA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzJylcbiAgLCBnT1BTICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdvcHMnKVxuICAsIHBJRSAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtcGllJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgdmFyIHJlc3VsdCAgICAgPSBnZXRLZXlzKGl0KVxuICAgICwgZ2V0U3ltYm9scyA9IGdPUFMuZjtcbiAgaWYoZ2V0U3ltYm9scyl7XG4gICAgdmFyIHN5bWJvbHMgPSBnZXRTeW1ib2xzKGl0KVxuICAgICAgLCBpc0VudW0gID0gcElFLmZcbiAgICAgICwgaSAgICAgICA9IDBcbiAgICAgICwga2V5O1xuICAgIHdoaWxlKHN5bWJvbHMubGVuZ3RoID4gaSlpZihpc0VudW0uY2FsbChpdCwga2V5ID0gc3ltYm9sc1tpKytdKSlyZXN1bHQucHVzaChrZXkpO1xuICB9IHJldHVybiByZXN1bHQ7XG59OyIsInZhciBnbG9iYWwgICAgPSByZXF1aXJlKCcuL19nbG9iYWwnKVxuICAsIGNvcmUgICAgICA9IHJlcXVpcmUoJy4vX2NvcmUnKVxuICAsIGN0eCAgICAgICA9IHJlcXVpcmUoJy4vX2N0eCcpXG4gICwgaGlkZSAgICAgID0gcmVxdWlyZSgnLi9faGlkZScpXG4gICwgUFJPVE9UWVBFID0gJ3Byb3RvdHlwZSc7XG5cbnZhciAkZXhwb3J0ID0gZnVuY3Rpb24odHlwZSwgbmFtZSwgc291cmNlKXtcbiAgdmFyIElTX0ZPUkNFRCA9IHR5cGUgJiAkZXhwb3J0LkZcbiAgICAsIElTX0dMT0JBTCA9IHR5cGUgJiAkZXhwb3J0LkdcbiAgICAsIElTX1NUQVRJQyA9IHR5cGUgJiAkZXhwb3J0LlNcbiAgICAsIElTX1BST1RPICA9IHR5cGUgJiAkZXhwb3J0LlBcbiAgICAsIElTX0JJTkQgICA9IHR5cGUgJiAkZXhwb3J0LkJcbiAgICAsIElTX1dSQVAgICA9IHR5cGUgJiAkZXhwb3J0LldcbiAgICAsIGV4cG9ydHMgICA9IElTX0dMT0JBTCA/IGNvcmUgOiBjb3JlW25hbWVdIHx8IChjb3JlW25hbWVdID0ge30pXG4gICAgLCBleHBQcm90byAgPSBleHBvcnRzW1BST1RPVFlQRV1cbiAgICAsIHRhcmdldCAgICA9IElTX0dMT0JBTCA/IGdsb2JhbCA6IElTX1NUQVRJQyA/IGdsb2JhbFtuYW1lXSA6IChnbG9iYWxbbmFtZV0gfHwge30pW1BST1RPVFlQRV1cbiAgICAsIGtleSwgb3duLCBvdXQ7XG4gIGlmKElTX0dMT0JBTClzb3VyY2UgPSBuYW1lO1xuICBmb3Ioa2V5IGluIHNvdXJjZSl7XG4gICAgLy8gY29udGFpbnMgaW4gbmF0aXZlXG4gICAgb3duID0gIUlTX0ZPUkNFRCAmJiB0YXJnZXQgJiYgdGFyZ2V0W2tleV0gIT09IHVuZGVmaW5lZDtcbiAgICBpZihvd24gJiYga2V5IGluIGV4cG9ydHMpY29udGludWU7XG4gICAgLy8gZXhwb3J0IG5hdGl2ZSBvciBwYXNzZWRcbiAgICBvdXQgPSBvd24gPyB0YXJnZXRba2V5XSA6IHNvdXJjZVtrZXldO1xuICAgIC8vIHByZXZlbnQgZ2xvYmFsIHBvbGx1dGlvbiBmb3IgbmFtZXNwYWNlc1xuICAgIGV4cG9ydHNba2V5XSA9IElTX0dMT0JBTCAmJiB0eXBlb2YgdGFyZ2V0W2tleV0gIT0gJ2Z1bmN0aW9uJyA/IHNvdXJjZVtrZXldXG4gICAgLy8gYmluZCB0aW1lcnMgdG8gZ2xvYmFsIGZvciBjYWxsIGZyb20gZXhwb3J0IGNvbnRleHRcbiAgICA6IElTX0JJTkQgJiYgb3duID8gY3R4KG91dCwgZ2xvYmFsKVxuICAgIC8vIHdyYXAgZ2xvYmFsIGNvbnN0cnVjdG9ycyBmb3IgcHJldmVudCBjaGFuZ2UgdGhlbSBpbiBsaWJyYXJ5XG4gICAgOiBJU19XUkFQICYmIHRhcmdldFtrZXldID09IG91dCA/IChmdW5jdGlvbihDKXtcbiAgICAgIHZhciBGID0gZnVuY3Rpb24oYSwgYiwgYyl7XG4gICAgICAgIGlmKHRoaXMgaW5zdGFuY2VvZiBDKXtcbiAgICAgICAgICBzd2l0Y2goYXJndW1lbnRzLmxlbmd0aCl7XG4gICAgICAgICAgICBjYXNlIDA6IHJldHVybiBuZXcgQztcbiAgICAgICAgICAgIGNhc2UgMTogcmV0dXJuIG5ldyBDKGEpO1xuICAgICAgICAgICAgY2FzZSAyOiByZXR1cm4gbmV3IEMoYSwgYik7XG4gICAgICAgICAgfSByZXR1cm4gbmV3IEMoYSwgYiwgYyk7XG4gICAgICAgIH0gcmV0dXJuIEMuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgIH07XG4gICAgICBGW1BST1RPVFlQRV0gPSBDW1BST1RPVFlQRV07XG4gICAgICByZXR1cm4gRjtcbiAgICAvLyBtYWtlIHN0YXRpYyB2ZXJzaW9ucyBmb3IgcHJvdG90eXBlIG1ldGhvZHNcbiAgICB9KShvdXQpIDogSVNfUFJPVE8gJiYgdHlwZW9mIG91dCA9PSAnZnVuY3Rpb24nID8gY3R4KEZ1bmN0aW9uLmNhbGwsIG91dCkgOiBvdXQ7XG4gICAgLy8gZXhwb3J0IHByb3RvIG1ldGhvZHMgdG8gY29yZS4lQ09OU1RSVUNUT1IlLm1ldGhvZHMuJU5BTUUlXG4gICAgaWYoSVNfUFJPVE8pe1xuICAgICAgKGV4cG9ydHMudmlydHVhbCB8fCAoZXhwb3J0cy52aXJ0dWFsID0ge30pKVtrZXldID0gb3V0O1xuICAgICAgLy8gZXhwb3J0IHByb3RvIG1ldGhvZHMgdG8gY29yZS4lQ09OU1RSVUNUT1IlLnByb3RvdHlwZS4lTkFNRSVcbiAgICAgIGlmKHR5cGUgJiAkZXhwb3J0LlIgJiYgZXhwUHJvdG8gJiYgIWV4cFByb3RvW2tleV0paGlkZShleHBQcm90bywga2V5LCBvdXQpO1xuICAgIH1cbiAgfVxufTtcbi8vIHR5cGUgYml0bWFwXG4kZXhwb3J0LkYgPSAxOyAgIC8vIGZvcmNlZFxuJGV4cG9ydC5HID0gMjsgICAvLyBnbG9iYWxcbiRleHBvcnQuUyA9IDQ7ICAgLy8gc3RhdGljXG4kZXhwb3J0LlAgPSA4OyAgIC8vIHByb3RvXG4kZXhwb3J0LkIgPSAxNjsgIC8vIGJpbmRcbiRleHBvcnQuVyA9IDMyOyAgLy8gd3JhcFxuJGV4cG9ydC5VID0gNjQ7ICAvLyBzYWZlXG4kZXhwb3J0LlIgPSAxMjg7IC8vIHJlYWwgcHJvdG8gbWV0aG9kIGZvciBgbGlicmFyeWAgXG5tb2R1bGUuZXhwb3J0cyA9ICRleHBvcnQ7IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihleGVjKXtcbiAgdHJ5IHtcbiAgICByZXR1cm4gISFleGVjKCk7XG4gIH0gY2F0Y2goZSl7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbn07IiwiLy8gaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMvaXNzdWVzLzg2I2lzc3VlY29tbWVudC0xMTU3NTkwMjhcbnZhciBnbG9iYWwgPSBtb2R1bGUuZXhwb3J0cyA9IHR5cGVvZiB3aW5kb3cgIT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93Lk1hdGggPT0gTWF0aFxuICA/IHdpbmRvdyA6IHR5cGVvZiBzZWxmICE9ICd1bmRlZmluZWQnICYmIHNlbGYuTWF0aCA9PSBNYXRoID8gc2VsZiA6IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5pZih0eXBlb2YgX19nID09ICdudW1iZXInKV9fZyA9IGdsb2JhbDsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlZiIsInZhciBoYXNPd25Qcm9wZXJ0eSA9IHt9Lmhhc093blByb3BlcnR5O1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCwga2V5KXtcbiAgcmV0dXJuIGhhc093blByb3BlcnR5LmNhbGwoaXQsIGtleSk7XG59OyIsInZhciBkUCAgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJylcbiAgLCBjcmVhdGVEZXNjID0gcmVxdWlyZSgnLi9fcHJvcGVydHktZGVzYycpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpID8gZnVuY3Rpb24ob2JqZWN0LCBrZXksIHZhbHVlKXtcbiAgcmV0dXJuIGRQLmYob2JqZWN0LCBrZXksIGNyZWF0ZURlc2MoMSwgdmFsdWUpKTtcbn0gOiBmdW5jdGlvbihvYmplY3QsIGtleSwgdmFsdWUpe1xuICBvYmplY3Rba2V5XSA9IHZhbHVlO1xuICByZXR1cm4gb2JqZWN0O1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpLmRvY3VtZW50ICYmIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDsiLCJtb2R1bGUuZXhwb3J0cyA9ICFyZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpICYmICFyZXF1aXJlKCcuL19mYWlscycpKGZ1bmN0aW9uKCl7XG4gIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkocmVxdWlyZSgnLi9fZG9tLWNyZWF0ZScpKCdkaXYnKSwgJ2EnLCB7Z2V0OiBmdW5jdGlvbigpeyByZXR1cm4gNzsgfX0pLmEgIT0gNztcbn0pOyIsIi8vIGZhbGxiYWNrIGZvciBub24tYXJyYXktbGlrZSBFUzMgYW5kIG5vbi1lbnVtZXJhYmxlIG9sZCBWOCBzdHJpbmdzXG52YXIgY29mID0gcmVxdWlyZSgnLi9fY29mJyk7XG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdCgneicpLnByb3BlcnR5SXNFbnVtZXJhYmxlKDApID8gT2JqZWN0IDogZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gY29mKGl0KSA9PSAnU3RyaW5nJyA/IGl0LnNwbGl0KCcnKSA6IE9iamVjdChpdCk7XG59OyIsIi8vIGNoZWNrIG9uIGRlZmF1bHQgQXJyYXkgaXRlcmF0b3JcbnZhciBJdGVyYXRvcnMgID0gcmVxdWlyZSgnLi9faXRlcmF0b3JzJylcbiAgLCBJVEVSQVRPUiAgID0gcmVxdWlyZSgnLi9fd2tzJykoJ2l0ZXJhdG9yJylcbiAgLCBBcnJheVByb3RvID0gQXJyYXkucHJvdG90eXBlO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIGl0ICE9PSB1bmRlZmluZWQgJiYgKEl0ZXJhdG9ycy5BcnJheSA9PT0gaXQgfHwgQXJyYXlQcm90b1tJVEVSQVRPUl0gPT09IGl0KTtcbn07IiwiLy8gNy4yLjIgSXNBcnJheShhcmd1bWVudClcbnZhciBjb2YgPSByZXF1aXJlKCcuL19jb2YnKTtcbm1vZHVsZS5leHBvcnRzID0gQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbiBpc0FycmF5KGFyZyl7XG4gIHJldHVybiBjb2YoYXJnKSA9PSAnQXJyYXknO1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIHR5cGVvZiBpdCA9PT0gJ29iamVjdCcgPyBpdCAhPT0gbnVsbCA6IHR5cGVvZiBpdCA9PT0gJ2Z1bmN0aW9uJztcbn07IiwiLy8gY2FsbCBzb21ldGhpbmcgb24gaXRlcmF0b3Igc3RlcCB3aXRoIHNhZmUgY2xvc2luZyBvbiBlcnJvclxudmFyIGFuT2JqZWN0ID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0Jyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0ZXJhdG9yLCBmbiwgdmFsdWUsIGVudHJpZXMpe1xuICB0cnkge1xuICAgIHJldHVybiBlbnRyaWVzID8gZm4oYW5PYmplY3QodmFsdWUpWzBdLCB2YWx1ZVsxXSkgOiBmbih2YWx1ZSk7XG4gIC8vIDcuNC42IEl0ZXJhdG9yQ2xvc2UoaXRlcmF0b3IsIGNvbXBsZXRpb24pXG4gIH0gY2F0Y2goZSl7XG4gICAgdmFyIHJldCA9IGl0ZXJhdG9yWydyZXR1cm4nXTtcbiAgICBpZihyZXQgIT09IHVuZGVmaW5lZClhbk9iamVjdChyZXQuY2FsbChpdGVyYXRvcikpO1xuICAgIHRocm93IGU7XG4gIH1cbn07IiwiJ3VzZSBzdHJpY3QnO1xudmFyIGNyZWF0ZSAgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWNyZWF0ZScpXG4gICwgZGVzY3JpcHRvciAgICAgPSByZXF1aXJlKCcuL19wcm9wZXJ0eS1kZXNjJylcbiAgLCBzZXRUb1N0cmluZ1RhZyA9IHJlcXVpcmUoJy4vX3NldC10by1zdHJpbmctdGFnJylcbiAgLCBJdGVyYXRvclByb3RvdHlwZSA9IHt9O1xuXG4vLyAyNS4xLjIuMS4xICVJdGVyYXRvclByb3RvdHlwZSVbQEBpdGVyYXRvcl0oKVxucmVxdWlyZSgnLi9faGlkZScpKEl0ZXJhdG9yUHJvdG90eXBlLCByZXF1aXJlKCcuL193a3MnKSgnaXRlcmF0b3InKSwgZnVuY3Rpb24oKXsgcmV0dXJuIHRoaXM7IH0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKENvbnN0cnVjdG9yLCBOQU1FLCBuZXh0KXtcbiAgQ29uc3RydWN0b3IucHJvdG90eXBlID0gY3JlYXRlKEl0ZXJhdG9yUHJvdG90eXBlLCB7bmV4dDogZGVzY3JpcHRvcigxLCBuZXh0KX0pO1xuICBzZXRUb1N0cmluZ1RhZyhDb25zdHJ1Y3RvciwgTkFNRSArICcgSXRlcmF0b3InKTtcbn07IiwiJ3VzZSBzdHJpY3QnO1xudmFyIExJQlJBUlkgICAgICAgID0gcmVxdWlyZSgnLi9fbGlicmFyeScpXG4gICwgJGV4cG9ydCAgICAgICAgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsIHJlZGVmaW5lICAgICAgID0gcmVxdWlyZSgnLi9fcmVkZWZpbmUnKVxuICAsIGhpZGUgICAgICAgICAgID0gcmVxdWlyZSgnLi9faGlkZScpXG4gICwgaGFzICAgICAgICAgICAgPSByZXF1aXJlKCcuL19oYXMnKVxuICAsIEl0ZXJhdG9ycyAgICAgID0gcmVxdWlyZSgnLi9faXRlcmF0b3JzJylcbiAgLCAkaXRlckNyZWF0ZSAgICA9IHJlcXVpcmUoJy4vX2l0ZXItY3JlYXRlJylcbiAgLCBzZXRUb1N0cmluZ1RhZyA9IHJlcXVpcmUoJy4vX3NldC10by1zdHJpbmctdGFnJylcbiAgLCBnZXRQcm90b3R5cGVPZiA9IHJlcXVpcmUoJy4vX29iamVjdC1ncG8nKVxuICAsIElURVJBVE9SICAgICAgID0gcmVxdWlyZSgnLi9fd2tzJykoJ2l0ZXJhdG9yJylcbiAgLCBCVUdHWSAgICAgICAgICA9ICEoW10ua2V5cyAmJiAnbmV4dCcgaW4gW10ua2V5cygpKSAvLyBTYWZhcmkgaGFzIGJ1Z2d5IGl0ZXJhdG9ycyB3L28gYG5leHRgXG4gICwgRkZfSVRFUkFUT1IgICAgPSAnQEBpdGVyYXRvcidcbiAgLCBLRVlTICAgICAgICAgICA9ICdrZXlzJ1xuICAsIFZBTFVFUyAgICAgICAgID0gJ3ZhbHVlcyc7XG5cbnZhciByZXR1cm5UaGlzID0gZnVuY3Rpb24oKXsgcmV0dXJuIHRoaXM7IH07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oQmFzZSwgTkFNRSwgQ29uc3RydWN0b3IsIG5leHQsIERFRkFVTFQsIElTX1NFVCwgRk9SQ0VEKXtcbiAgJGl0ZXJDcmVhdGUoQ29uc3RydWN0b3IsIE5BTUUsIG5leHQpO1xuICB2YXIgZ2V0TWV0aG9kID0gZnVuY3Rpb24oa2luZCl7XG4gICAgaWYoIUJVR0dZICYmIGtpbmQgaW4gcHJvdG8pcmV0dXJuIHByb3RvW2tpbmRdO1xuICAgIHN3aXRjaChraW5kKXtcbiAgICAgIGNhc2UgS0VZUzogcmV0dXJuIGZ1bmN0aW9uIGtleXMoKXsgcmV0dXJuIG5ldyBDb25zdHJ1Y3Rvcih0aGlzLCBraW5kKTsgfTtcbiAgICAgIGNhc2UgVkFMVUVTOiByZXR1cm4gZnVuY3Rpb24gdmFsdWVzKCl7IHJldHVybiBuZXcgQ29uc3RydWN0b3IodGhpcywga2luZCk7IH07XG4gICAgfSByZXR1cm4gZnVuY3Rpb24gZW50cmllcygpeyByZXR1cm4gbmV3IENvbnN0cnVjdG9yKHRoaXMsIGtpbmQpOyB9O1xuICB9O1xuICB2YXIgVEFHICAgICAgICA9IE5BTUUgKyAnIEl0ZXJhdG9yJ1xuICAgICwgREVGX1ZBTFVFUyA9IERFRkFVTFQgPT0gVkFMVUVTXG4gICAgLCBWQUxVRVNfQlVHID0gZmFsc2VcbiAgICAsIHByb3RvICAgICAgPSBCYXNlLnByb3RvdHlwZVxuICAgICwgJG5hdGl2ZSAgICA9IHByb3RvW0lURVJBVE9SXSB8fCBwcm90b1tGRl9JVEVSQVRPUl0gfHwgREVGQVVMVCAmJiBwcm90b1tERUZBVUxUXVxuICAgICwgJGRlZmF1bHQgICA9ICRuYXRpdmUgfHwgZ2V0TWV0aG9kKERFRkFVTFQpXG4gICAgLCAkZW50cmllcyAgID0gREVGQVVMVCA/ICFERUZfVkFMVUVTID8gJGRlZmF1bHQgOiBnZXRNZXRob2QoJ2VudHJpZXMnKSA6IHVuZGVmaW5lZFxuICAgICwgJGFueU5hdGl2ZSA9IE5BTUUgPT0gJ0FycmF5JyA/IHByb3RvLmVudHJpZXMgfHwgJG5hdGl2ZSA6ICRuYXRpdmVcbiAgICAsIG1ldGhvZHMsIGtleSwgSXRlcmF0b3JQcm90b3R5cGU7XG4gIC8vIEZpeCBuYXRpdmVcbiAgaWYoJGFueU5hdGl2ZSl7XG4gICAgSXRlcmF0b3JQcm90b3R5cGUgPSBnZXRQcm90b3R5cGVPZigkYW55TmF0aXZlLmNhbGwobmV3IEJhc2UpKTtcbiAgICBpZihJdGVyYXRvclByb3RvdHlwZSAhPT0gT2JqZWN0LnByb3RvdHlwZSl7XG4gICAgICAvLyBTZXQgQEB0b1N0cmluZ1RhZyB0byBuYXRpdmUgaXRlcmF0b3JzXG4gICAgICBzZXRUb1N0cmluZ1RhZyhJdGVyYXRvclByb3RvdHlwZSwgVEFHLCB0cnVlKTtcbiAgICAgIC8vIGZpeCBmb3Igc29tZSBvbGQgZW5naW5lc1xuICAgICAgaWYoIUxJQlJBUlkgJiYgIWhhcyhJdGVyYXRvclByb3RvdHlwZSwgSVRFUkFUT1IpKWhpZGUoSXRlcmF0b3JQcm90b3R5cGUsIElURVJBVE9SLCByZXR1cm5UaGlzKTtcbiAgICB9XG4gIH1cbiAgLy8gZml4IEFycmF5I3t2YWx1ZXMsIEBAaXRlcmF0b3J9Lm5hbWUgaW4gVjggLyBGRlxuICBpZihERUZfVkFMVUVTICYmICRuYXRpdmUgJiYgJG5hdGl2ZS5uYW1lICE9PSBWQUxVRVMpe1xuICAgIFZBTFVFU19CVUcgPSB0cnVlO1xuICAgICRkZWZhdWx0ID0gZnVuY3Rpb24gdmFsdWVzKCl7IHJldHVybiAkbmF0aXZlLmNhbGwodGhpcyk7IH07XG4gIH1cbiAgLy8gRGVmaW5lIGl0ZXJhdG9yXG4gIGlmKCghTElCUkFSWSB8fCBGT1JDRUQpICYmIChCVUdHWSB8fCBWQUxVRVNfQlVHIHx8ICFwcm90b1tJVEVSQVRPUl0pKXtcbiAgICBoaWRlKHByb3RvLCBJVEVSQVRPUiwgJGRlZmF1bHQpO1xuICB9XG4gIC8vIFBsdWcgZm9yIGxpYnJhcnlcbiAgSXRlcmF0b3JzW05BTUVdID0gJGRlZmF1bHQ7XG4gIEl0ZXJhdG9yc1tUQUddICA9IHJldHVyblRoaXM7XG4gIGlmKERFRkFVTFQpe1xuICAgIG1ldGhvZHMgPSB7XG4gICAgICB2YWx1ZXM6ICBERUZfVkFMVUVTID8gJGRlZmF1bHQgOiBnZXRNZXRob2QoVkFMVUVTKSxcbiAgICAgIGtleXM6ICAgIElTX1NFVCAgICAgPyAkZGVmYXVsdCA6IGdldE1ldGhvZChLRVlTKSxcbiAgICAgIGVudHJpZXM6ICRlbnRyaWVzXG4gICAgfTtcbiAgICBpZihGT1JDRUQpZm9yKGtleSBpbiBtZXRob2RzKXtcbiAgICAgIGlmKCEoa2V5IGluIHByb3RvKSlyZWRlZmluZShwcm90bywga2V5LCBtZXRob2RzW2tleV0pO1xuICAgIH0gZWxzZSAkZXhwb3J0KCRleHBvcnQuUCArICRleHBvcnQuRiAqIChCVUdHWSB8fCBWQUxVRVNfQlVHKSwgTkFNRSwgbWV0aG9kcyk7XG4gIH1cbiAgcmV0dXJuIG1ldGhvZHM7XG59OyIsInZhciBJVEVSQVRPUiAgICAgPSByZXF1aXJlKCcuL193a3MnKSgnaXRlcmF0b3InKVxuICAsIFNBRkVfQ0xPU0lORyA9IGZhbHNlO1xuXG50cnkge1xuICB2YXIgcml0ZXIgPSBbN11bSVRFUkFUT1JdKCk7XG4gIHJpdGVyWydyZXR1cm4nXSA9IGZ1bmN0aW9uKCl7IFNBRkVfQ0xPU0lORyA9IHRydWU7IH07XG4gIEFycmF5LmZyb20ocml0ZXIsIGZ1bmN0aW9uKCl7IHRocm93IDI7IH0pO1xufSBjYXRjaChlKXsgLyogZW1wdHkgKi8gfVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGV4ZWMsIHNraXBDbG9zaW5nKXtcbiAgaWYoIXNraXBDbG9zaW5nICYmICFTQUZFX0NMT1NJTkcpcmV0dXJuIGZhbHNlO1xuICB2YXIgc2FmZSA9IGZhbHNlO1xuICB0cnkge1xuICAgIHZhciBhcnIgID0gWzddXG4gICAgICAsIGl0ZXIgPSBhcnJbSVRFUkFUT1JdKCk7XG4gICAgaXRlci5uZXh0ID0gZnVuY3Rpb24oKXsgcmV0dXJuIHtkb25lOiBzYWZlID0gdHJ1ZX07IH07XG4gICAgYXJyW0lURVJBVE9SXSA9IGZ1bmN0aW9uKCl7IHJldHVybiBpdGVyOyB9O1xuICAgIGV4ZWMoYXJyKTtcbiAgfSBjYXRjaChlKXsgLyogZW1wdHkgKi8gfVxuICByZXR1cm4gc2FmZTtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihkb25lLCB2YWx1ZSl7XG4gIHJldHVybiB7dmFsdWU6IHZhbHVlLCBkb25lOiAhIWRvbmV9O1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IHt9OyIsInZhciBnZXRLZXlzICAgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cycpXG4gICwgdG9JT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihvYmplY3QsIGVsKXtcbiAgdmFyIE8gICAgICA9IHRvSU9iamVjdChvYmplY3QpXG4gICAgLCBrZXlzICAgPSBnZXRLZXlzKE8pXG4gICAgLCBsZW5ndGggPSBrZXlzLmxlbmd0aFxuICAgICwgaW5kZXggID0gMFxuICAgICwga2V5O1xuICB3aGlsZShsZW5ndGggPiBpbmRleClpZihPW2tleSA9IGtleXNbaW5kZXgrK11dID09PSBlbClyZXR1cm4ga2V5O1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IHRydWU7IiwidmFyIE1FVEEgICAgID0gcmVxdWlyZSgnLi9fdWlkJykoJ21ldGEnKVxuICAsIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0JylcbiAgLCBoYXMgICAgICA9IHJlcXVpcmUoJy4vX2hhcycpXG4gICwgc2V0RGVzYyAgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKS5mXG4gICwgaWQgICAgICAgPSAwO1xudmFyIGlzRXh0ZW5zaWJsZSA9IE9iamVjdC5pc0V4dGVuc2libGUgfHwgZnVuY3Rpb24oKXtcbiAgcmV0dXJuIHRydWU7XG59O1xudmFyIEZSRUVaRSA9ICFyZXF1aXJlKCcuL19mYWlscycpKGZ1bmN0aW9uKCl7XG4gIHJldHVybiBpc0V4dGVuc2libGUoT2JqZWN0LnByZXZlbnRFeHRlbnNpb25zKHt9KSk7XG59KTtcbnZhciBzZXRNZXRhID0gZnVuY3Rpb24oaXQpe1xuICBzZXREZXNjKGl0LCBNRVRBLCB7dmFsdWU6IHtcbiAgICBpOiAnTycgKyArK2lkLCAvLyBvYmplY3QgSURcbiAgICB3OiB7fSAgICAgICAgICAvLyB3ZWFrIGNvbGxlY3Rpb25zIElEc1xuICB9fSk7XG59O1xudmFyIGZhc3RLZXkgPSBmdW5jdGlvbihpdCwgY3JlYXRlKXtcbiAgLy8gcmV0dXJuIHByaW1pdGl2ZSB3aXRoIHByZWZpeFxuICBpZighaXNPYmplY3QoaXQpKXJldHVybiB0eXBlb2YgaXQgPT0gJ3N5bWJvbCcgPyBpdCA6ICh0eXBlb2YgaXQgPT0gJ3N0cmluZycgPyAnUycgOiAnUCcpICsgaXQ7XG4gIGlmKCFoYXMoaXQsIE1FVEEpKXtcbiAgICAvLyBjYW4ndCBzZXQgbWV0YWRhdGEgdG8gdW5jYXVnaHQgZnJvemVuIG9iamVjdFxuICAgIGlmKCFpc0V4dGVuc2libGUoaXQpKXJldHVybiAnRic7XG4gICAgLy8gbm90IG5lY2Vzc2FyeSB0byBhZGQgbWV0YWRhdGFcbiAgICBpZighY3JlYXRlKXJldHVybiAnRSc7XG4gICAgLy8gYWRkIG1pc3NpbmcgbWV0YWRhdGFcbiAgICBzZXRNZXRhKGl0KTtcbiAgLy8gcmV0dXJuIG9iamVjdCBJRFxuICB9IHJldHVybiBpdFtNRVRBXS5pO1xufTtcbnZhciBnZXRXZWFrID0gZnVuY3Rpb24oaXQsIGNyZWF0ZSl7XG4gIGlmKCFoYXMoaXQsIE1FVEEpKXtcbiAgICAvLyBjYW4ndCBzZXQgbWV0YWRhdGEgdG8gdW5jYXVnaHQgZnJvemVuIG9iamVjdFxuICAgIGlmKCFpc0V4dGVuc2libGUoaXQpKXJldHVybiB0cnVlO1xuICAgIC8vIG5vdCBuZWNlc3NhcnkgdG8gYWRkIG1ldGFkYXRhXG4gICAgaWYoIWNyZWF0ZSlyZXR1cm4gZmFsc2U7XG4gICAgLy8gYWRkIG1pc3NpbmcgbWV0YWRhdGFcbiAgICBzZXRNZXRhKGl0KTtcbiAgLy8gcmV0dXJuIGhhc2ggd2VhayBjb2xsZWN0aW9ucyBJRHNcbiAgfSByZXR1cm4gaXRbTUVUQV0udztcbn07XG4vLyBhZGQgbWV0YWRhdGEgb24gZnJlZXplLWZhbWlseSBtZXRob2RzIGNhbGxpbmdcbnZhciBvbkZyZWV6ZSA9IGZ1bmN0aW9uKGl0KXtcbiAgaWYoRlJFRVpFICYmIG1ldGEuTkVFRCAmJiBpc0V4dGVuc2libGUoaXQpICYmICFoYXMoaXQsIE1FVEEpKXNldE1ldGEoaXQpO1xuICByZXR1cm4gaXQ7XG59O1xudmFyIG1ldGEgPSBtb2R1bGUuZXhwb3J0cyA9IHtcbiAgS0VZOiAgICAgIE1FVEEsXG4gIE5FRUQ6ICAgICBmYWxzZSxcbiAgZmFzdEtleTogIGZhc3RLZXksXG4gIGdldFdlYWs6ICBnZXRXZWFrLFxuICBvbkZyZWV6ZTogb25GcmVlemVcbn07IiwiJ3VzZSBzdHJpY3QnO1xuLy8gMTkuMS4yLjEgT2JqZWN0LmFzc2lnbih0YXJnZXQsIHNvdXJjZSwgLi4uKVxudmFyIGdldEtleXMgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMnKVxuICAsIGdPUFMgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdvcHMnKVxuICAsIHBJRSAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LXBpZScpXG4gICwgdG9PYmplY3QgPSByZXF1aXJlKCcuL190by1vYmplY3QnKVxuICAsIElPYmplY3QgID0gcmVxdWlyZSgnLi9faW9iamVjdCcpXG4gICwgJGFzc2lnbiAgPSBPYmplY3QuYXNzaWduO1xuXG4vLyBzaG91bGQgd29yayB3aXRoIHN5bWJvbHMgYW5kIHNob3VsZCBoYXZlIGRldGVybWluaXN0aWMgcHJvcGVydHkgb3JkZXIgKFY4IGJ1Zylcbm1vZHVsZS5leHBvcnRzID0gISRhc3NpZ24gfHwgcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbigpe1xuICB2YXIgQSA9IHt9XG4gICAgLCBCID0ge31cbiAgICAsIFMgPSBTeW1ib2woKVxuICAgICwgSyA9ICdhYmNkZWZnaGlqa2xtbm9wcXJzdCc7XG4gIEFbU10gPSA3O1xuICBLLnNwbGl0KCcnKS5mb3JFYWNoKGZ1bmN0aW9uKGspeyBCW2tdID0gazsgfSk7XG4gIHJldHVybiAkYXNzaWduKHt9LCBBKVtTXSAhPSA3IHx8IE9iamVjdC5rZXlzKCRhc3NpZ24oe30sIEIpKS5qb2luKCcnKSAhPSBLO1xufSkgPyBmdW5jdGlvbiBhc3NpZ24odGFyZ2V0LCBzb3VyY2UpeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gIHZhciBUICAgICA9IHRvT2JqZWN0KHRhcmdldClcbiAgICAsIGFMZW4gID0gYXJndW1lbnRzLmxlbmd0aFxuICAgICwgaW5kZXggPSAxXG4gICAgLCBnZXRTeW1ib2xzID0gZ09QUy5mXG4gICAgLCBpc0VudW0gICAgID0gcElFLmY7XG4gIHdoaWxlKGFMZW4gPiBpbmRleCl7XG4gICAgdmFyIFMgICAgICA9IElPYmplY3QoYXJndW1lbnRzW2luZGV4KytdKVxuICAgICAgLCBrZXlzICAgPSBnZXRTeW1ib2xzID8gZ2V0S2V5cyhTKS5jb25jYXQoZ2V0U3ltYm9scyhTKSkgOiBnZXRLZXlzKFMpXG4gICAgICAsIGxlbmd0aCA9IGtleXMubGVuZ3RoXG4gICAgICAsIGogICAgICA9IDBcbiAgICAgICwga2V5O1xuICAgIHdoaWxlKGxlbmd0aCA+IGopaWYoaXNFbnVtLmNhbGwoUywga2V5ID0ga2V5c1tqKytdKSlUW2tleV0gPSBTW2tleV07XG4gIH0gcmV0dXJuIFQ7XG59IDogJGFzc2lnbjsiLCIvLyAxOS4xLjIuMiAvIDE1LjIuMy41IE9iamVjdC5jcmVhdGUoTyBbLCBQcm9wZXJ0aWVzXSlcbnZhciBhbk9iamVjdCAgICA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpXG4gICwgZFBzICAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZHBzJylcbiAgLCBlbnVtQnVnS2V5cyA9IHJlcXVpcmUoJy4vX2VudW0tYnVnLWtleXMnKVxuICAsIElFX1BST1RPICAgID0gcmVxdWlyZSgnLi9fc2hhcmVkLWtleScpKCdJRV9QUk9UTycpXG4gICwgRW1wdHkgICAgICAgPSBmdW5jdGlvbigpeyAvKiBlbXB0eSAqLyB9XG4gICwgUFJPVE9UWVBFICAgPSAncHJvdG90eXBlJztcblxuLy8gQ3JlYXRlIG9iamVjdCB3aXRoIGZha2UgYG51bGxgIHByb3RvdHlwZTogdXNlIGlmcmFtZSBPYmplY3Qgd2l0aCBjbGVhcmVkIHByb3RvdHlwZVxudmFyIGNyZWF0ZURpY3QgPSBmdW5jdGlvbigpe1xuICAvLyBUaHJhc2gsIHdhc3RlIGFuZCBzb2RvbXk6IElFIEdDIGJ1Z1xuICB2YXIgaWZyYW1lID0gcmVxdWlyZSgnLi9fZG9tLWNyZWF0ZScpKCdpZnJhbWUnKVxuICAgICwgaSAgICAgID0gZW51bUJ1Z0tleXMubGVuZ3RoXG4gICAgLCBsdCAgICAgPSAnPCdcbiAgICAsIGd0ICAgICA9ICc+J1xuICAgICwgaWZyYW1lRG9jdW1lbnQ7XG4gIGlmcmFtZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICByZXF1aXJlKCcuL19odG1sJykuYXBwZW5kQ2hpbGQoaWZyYW1lKTtcbiAgaWZyYW1lLnNyYyA9ICdqYXZhc2NyaXB0Oic7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tc2NyaXB0LXVybFxuICAvLyBjcmVhdGVEaWN0ID0gaWZyYW1lLmNvbnRlbnRXaW5kb3cuT2JqZWN0O1xuICAvLyBodG1sLnJlbW92ZUNoaWxkKGlmcmFtZSk7XG4gIGlmcmFtZURvY3VtZW50ID0gaWZyYW1lLmNvbnRlbnRXaW5kb3cuZG9jdW1lbnQ7XG4gIGlmcmFtZURvY3VtZW50Lm9wZW4oKTtcbiAgaWZyYW1lRG9jdW1lbnQud3JpdGUobHQgKyAnc2NyaXB0JyArIGd0ICsgJ2RvY3VtZW50LkY9T2JqZWN0JyArIGx0ICsgJy9zY3JpcHQnICsgZ3QpO1xuICBpZnJhbWVEb2N1bWVudC5jbG9zZSgpO1xuICBjcmVhdGVEaWN0ID0gaWZyYW1lRG9jdW1lbnQuRjtcbiAgd2hpbGUoaS0tKWRlbGV0ZSBjcmVhdGVEaWN0W1BST1RPVFlQRV1bZW51bUJ1Z0tleXNbaV1dO1xuICByZXR1cm4gY3JlYXRlRGljdCgpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QuY3JlYXRlIHx8IGZ1bmN0aW9uIGNyZWF0ZShPLCBQcm9wZXJ0aWVzKXtcbiAgdmFyIHJlc3VsdDtcbiAgaWYoTyAhPT0gbnVsbCl7XG4gICAgRW1wdHlbUFJPVE9UWVBFXSA9IGFuT2JqZWN0KE8pO1xuICAgIHJlc3VsdCA9IG5ldyBFbXB0eTtcbiAgICBFbXB0eVtQUk9UT1RZUEVdID0gbnVsbDtcbiAgICAvLyBhZGQgXCJfX3Byb3RvX19cIiBmb3IgT2JqZWN0LmdldFByb3RvdHlwZU9mIHBvbHlmaWxsXG4gICAgcmVzdWx0W0lFX1BST1RPXSA9IE87XG4gIH0gZWxzZSByZXN1bHQgPSBjcmVhdGVEaWN0KCk7XG4gIHJldHVybiBQcm9wZXJ0aWVzID09PSB1bmRlZmluZWQgPyByZXN1bHQgOiBkUHMocmVzdWx0LCBQcm9wZXJ0aWVzKTtcbn07XG4iLCJ2YXIgYW5PYmplY3QgICAgICAgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKVxuICAsIElFOF9ET01fREVGSU5FID0gcmVxdWlyZSgnLi9faWU4LWRvbS1kZWZpbmUnKVxuICAsIHRvUHJpbWl0aXZlICAgID0gcmVxdWlyZSgnLi9fdG8tcHJpbWl0aXZlJylcbiAgLCBkUCAgICAgICAgICAgICA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eTtcblxuZXhwb3J0cy5mID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSA/IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSA6IGZ1bmN0aW9uIGRlZmluZVByb3BlcnR5KE8sIFAsIEF0dHJpYnV0ZXMpe1xuICBhbk9iamVjdChPKTtcbiAgUCA9IHRvUHJpbWl0aXZlKFAsIHRydWUpO1xuICBhbk9iamVjdChBdHRyaWJ1dGVzKTtcbiAgaWYoSUU4X0RPTV9ERUZJTkUpdHJ5IHtcbiAgICByZXR1cm4gZFAoTywgUCwgQXR0cmlidXRlcyk7XG4gIH0gY2F0Y2goZSl7IC8qIGVtcHR5ICovIH1cbiAgaWYoJ2dldCcgaW4gQXR0cmlidXRlcyB8fCAnc2V0JyBpbiBBdHRyaWJ1dGVzKXRocm93IFR5cGVFcnJvcignQWNjZXNzb3JzIG5vdCBzdXBwb3J0ZWQhJyk7XG4gIGlmKCd2YWx1ZScgaW4gQXR0cmlidXRlcylPW1BdID0gQXR0cmlidXRlcy52YWx1ZTtcbiAgcmV0dXJuIE87XG59OyIsInZhciBkUCAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpXG4gICwgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKVxuICAsIGdldEtleXMgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpID8gT2JqZWN0LmRlZmluZVByb3BlcnRpZXMgOiBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKE8sIFByb3BlcnRpZXMpe1xuICBhbk9iamVjdChPKTtcbiAgdmFyIGtleXMgICA9IGdldEtleXMoUHJvcGVydGllcylcbiAgICAsIGxlbmd0aCA9IGtleXMubGVuZ3RoXG4gICAgLCBpID0gMFxuICAgICwgUDtcbiAgd2hpbGUobGVuZ3RoID4gaSlkUC5mKE8sIFAgPSBrZXlzW2krK10sIFByb3BlcnRpZXNbUF0pO1xuICByZXR1cm4gTztcbn07IiwidmFyIHBJRSAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LXBpZScpXG4gICwgY3JlYXRlRGVzYyAgICAgPSByZXF1aXJlKCcuL19wcm9wZXJ0eS1kZXNjJylcbiAgLCB0b0lPYmplY3QgICAgICA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKVxuICAsIHRvUHJpbWl0aXZlICAgID0gcmVxdWlyZSgnLi9fdG8tcHJpbWl0aXZlJylcbiAgLCBoYXMgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2hhcycpXG4gICwgSUU4X0RPTV9ERUZJTkUgPSByZXF1aXJlKCcuL19pZTgtZG9tLWRlZmluZScpXG4gICwgZ09QRCAgICAgICAgICAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yO1xuXG5leHBvcnRzLmYgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpID8gZ09QRCA6IGZ1bmN0aW9uIGdldE93blByb3BlcnR5RGVzY3JpcHRvcihPLCBQKXtcbiAgTyA9IHRvSU9iamVjdChPKTtcbiAgUCA9IHRvUHJpbWl0aXZlKFAsIHRydWUpO1xuICBpZihJRThfRE9NX0RFRklORSl0cnkge1xuICAgIHJldHVybiBnT1BEKE8sIFApO1xuICB9IGNhdGNoKGUpeyAvKiBlbXB0eSAqLyB9XG4gIGlmKGhhcyhPLCBQKSlyZXR1cm4gY3JlYXRlRGVzYyghcElFLmYuY2FsbChPLCBQKSwgT1tQXSk7XG59OyIsIi8vIGZhbGxiYWNrIGZvciBJRTExIGJ1Z2d5IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzIHdpdGggaWZyYW1lIGFuZCB3aW5kb3dcbnZhciB0b0lPYmplY3QgPSByZXF1aXJlKCcuL190by1pb2JqZWN0JylcbiAgLCBnT1BOICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZ29wbicpLmZcbiAgLCB0b1N0cmluZyAgPSB7fS50b1N0cmluZztcblxudmFyIHdpbmRvd05hbWVzID0gdHlwZW9mIHdpbmRvdyA9PSAnb2JqZWN0JyAmJiB3aW5kb3cgJiYgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXNcbiAgPyBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh3aW5kb3cpIDogW107XG5cbnZhciBnZXRXaW5kb3dOYW1lcyA9IGZ1bmN0aW9uKGl0KXtcbiAgdHJ5IHtcbiAgICByZXR1cm4gZ09QTihpdCk7XG4gIH0gY2F0Y2goZSl7XG4gICAgcmV0dXJuIHdpbmRvd05hbWVzLnNsaWNlKCk7XG4gIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzLmYgPSBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eU5hbWVzKGl0KXtcbiAgcmV0dXJuIHdpbmRvd05hbWVzICYmIHRvU3RyaW5nLmNhbGwoaXQpID09ICdbb2JqZWN0IFdpbmRvd10nID8gZ2V0V2luZG93TmFtZXMoaXQpIDogZ09QTih0b0lPYmplY3QoaXQpKTtcbn07XG4iLCIvLyAxOS4xLjIuNyAvIDE1LjIuMy40IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKE8pXG52YXIgJGtleXMgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzLWludGVybmFsJylcbiAgLCBoaWRkZW5LZXlzID0gcmVxdWlyZSgnLi9fZW51bS1idWcta2V5cycpLmNvbmNhdCgnbGVuZ3RoJywgJ3Byb3RvdHlwZScpO1xuXG5leHBvcnRzLmYgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyB8fCBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eU5hbWVzKE8pe1xuICByZXR1cm4gJGtleXMoTywgaGlkZGVuS2V5cyk7XG59OyIsImV4cG9ydHMuZiA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHM7IiwiLy8gMTkuMS4yLjkgLyAxNS4yLjMuMiBPYmplY3QuZ2V0UHJvdG90eXBlT2YoTylcbnZhciBoYXMgICAgICAgICA9IHJlcXVpcmUoJy4vX2hhcycpXG4gICwgdG9PYmplY3QgICAgPSByZXF1aXJlKCcuL190by1vYmplY3QnKVxuICAsIElFX1BST1RPICAgID0gcmVxdWlyZSgnLi9fc2hhcmVkLWtleScpKCdJRV9QUk9UTycpXG4gICwgT2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5nZXRQcm90b3R5cGVPZiB8fCBmdW5jdGlvbihPKXtcbiAgTyA9IHRvT2JqZWN0KE8pO1xuICBpZihoYXMoTywgSUVfUFJPVE8pKXJldHVybiBPW0lFX1BST1RPXTtcbiAgaWYodHlwZW9mIE8uY29uc3RydWN0b3IgPT0gJ2Z1bmN0aW9uJyAmJiBPIGluc3RhbmNlb2YgTy5jb25zdHJ1Y3Rvcil7XG4gICAgcmV0dXJuIE8uY29uc3RydWN0b3IucHJvdG90eXBlO1xuICB9IHJldHVybiBPIGluc3RhbmNlb2YgT2JqZWN0ID8gT2JqZWN0UHJvdG8gOiBudWxsO1xufTsiLCJ2YXIgaGFzICAgICAgICAgID0gcmVxdWlyZSgnLi9faGFzJylcbiAgLCB0b0lPYmplY3QgICAgPSByZXF1aXJlKCcuL190by1pb2JqZWN0JylcbiAgLCBhcnJheUluZGV4T2YgPSByZXF1aXJlKCcuL19hcnJheS1pbmNsdWRlcycpKGZhbHNlKVxuICAsIElFX1BST1RPICAgICA9IHJlcXVpcmUoJy4vX3NoYXJlZC1rZXknKSgnSUVfUFJPVE8nKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihvYmplY3QsIG5hbWVzKXtcbiAgdmFyIE8gICAgICA9IHRvSU9iamVjdChvYmplY3QpXG4gICAgLCBpICAgICAgPSAwXG4gICAgLCByZXN1bHQgPSBbXVxuICAgICwga2V5O1xuICBmb3Ioa2V5IGluIE8paWYoa2V5ICE9IElFX1BST1RPKWhhcyhPLCBrZXkpICYmIHJlc3VsdC5wdXNoKGtleSk7XG4gIC8vIERvbid0IGVudW0gYnVnICYgaGlkZGVuIGtleXNcbiAgd2hpbGUobmFtZXMubGVuZ3RoID4gaSlpZihoYXMoTywga2V5ID0gbmFtZXNbaSsrXSkpe1xuICAgIH5hcnJheUluZGV4T2YocmVzdWx0LCBrZXkpIHx8IHJlc3VsdC5wdXNoKGtleSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn07IiwiLy8gMTkuMS4yLjE0IC8gMTUuMi4zLjE0IE9iamVjdC5rZXlzKE8pXG52YXIgJGtleXMgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cy1pbnRlcm5hbCcpXG4gICwgZW51bUJ1Z0tleXMgPSByZXF1aXJlKCcuL19lbnVtLWJ1Zy1rZXlzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmtleXMgfHwgZnVuY3Rpb24ga2V5cyhPKXtcbiAgcmV0dXJuICRrZXlzKE8sIGVudW1CdWdLZXlzKTtcbn07IiwiZXhwb3J0cy5mID0ge30ucHJvcGVydHlJc0VudW1lcmFibGU7IiwiLy8gbW9zdCBPYmplY3QgbWV0aG9kcyBieSBFUzYgc2hvdWxkIGFjY2VwdCBwcmltaXRpdmVzXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4gICwgY29yZSAgICA9IHJlcXVpcmUoJy4vX2NvcmUnKVxuICAsIGZhaWxzICAgPSByZXF1aXJlKCcuL19mYWlscycpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihLRVksIGV4ZWMpe1xuICB2YXIgZm4gID0gKGNvcmUuT2JqZWN0IHx8IHt9KVtLRVldIHx8IE9iamVjdFtLRVldXG4gICAgLCBleHAgPSB7fTtcbiAgZXhwW0tFWV0gPSBleGVjKGZuKTtcbiAgJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiBmYWlscyhmdW5jdGlvbigpeyBmbigxKTsgfSksICdPYmplY3QnLCBleHApO1xufTsiLCJ2YXIgZ2V0S2V5cyAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMnKVxuICAsIHRvSU9iamVjdCA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKVxuICAsIGlzRW51bSAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1waWUnKS5mO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpc0VudHJpZXMpe1xuICByZXR1cm4gZnVuY3Rpb24oaXQpe1xuICAgIHZhciBPICAgICAgPSB0b0lPYmplY3QoaXQpXG4gICAgICAsIGtleXMgICA9IGdldEtleXMoTylcbiAgICAgICwgbGVuZ3RoID0ga2V5cy5sZW5ndGhcbiAgICAgICwgaSAgICAgID0gMFxuICAgICAgLCByZXN1bHQgPSBbXVxuICAgICAgLCBrZXk7XG4gICAgd2hpbGUobGVuZ3RoID4gaSlpZihpc0VudW0uY2FsbChPLCBrZXkgPSBrZXlzW2krK10pKXtcbiAgICAgIHJlc3VsdC5wdXNoKGlzRW50cmllcyA/IFtrZXksIE9ba2V5XV0gOiBPW2tleV0pO1xuICAgIH0gcmV0dXJuIHJlc3VsdDtcbiAgfTtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihiaXRtYXAsIHZhbHVlKXtcbiAgcmV0dXJuIHtcbiAgICBlbnVtZXJhYmxlICA6ICEoYml0bWFwICYgMSksXG4gICAgY29uZmlndXJhYmxlOiAhKGJpdG1hcCAmIDIpLFxuICAgIHdyaXRhYmxlICAgIDogIShiaXRtYXAgJiA0KSxcbiAgICB2YWx1ZSAgICAgICA6IHZhbHVlXG4gIH07XG59OyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9faGlkZScpOyIsIi8vIFdvcmtzIHdpdGggX19wcm90b19fIG9ubHkuIE9sZCB2OCBjYW4ndCB3b3JrIHdpdGggbnVsbCBwcm90byBvYmplY3RzLlxuLyogZXNsaW50LWRpc2FibGUgbm8tcHJvdG8gKi9cbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpXG4gICwgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbnZhciBjaGVjayA9IGZ1bmN0aW9uKE8sIHByb3RvKXtcbiAgYW5PYmplY3QoTyk7XG4gIGlmKCFpc09iamVjdChwcm90bykgJiYgcHJvdG8gIT09IG51bGwpdGhyb3cgVHlwZUVycm9yKHByb3RvICsgXCI6IGNhbid0IHNldCBhcyBwcm90b3R5cGUhXCIpO1xufTtcbm1vZHVsZS5leHBvcnRzID0ge1xuICBzZXQ6IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fCAoJ19fcHJvdG9fXycgaW4ge30gPyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgZnVuY3Rpb24odGVzdCwgYnVnZ3ksIHNldCl7XG4gICAgICB0cnkge1xuICAgICAgICBzZXQgPSByZXF1aXJlKCcuL19jdHgnKShGdW5jdGlvbi5jYWxsLCByZXF1aXJlKCcuL19vYmplY3QtZ29wZCcpLmYoT2JqZWN0LnByb3RvdHlwZSwgJ19fcHJvdG9fXycpLnNldCwgMik7XG4gICAgICAgIHNldCh0ZXN0LCBbXSk7XG4gICAgICAgIGJ1Z2d5ID0gISh0ZXN0IGluc3RhbmNlb2YgQXJyYXkpO1xuICAgICAgfSBjYXRjaChlKXsgYnVnZ3kgPSB0cnVlOyB9XG4gICAgICByZXR1cm4gZnVuY3Rpb24gc2V0UHJvdG90eXBlT2YoTywgcHJvdG8pe1xuICAgICAgICBjaGVjayhPLCBwcm90byk7XG4gICAgICAgIGlmKGJ1Z2d5KU8uX19wcm90b19fID0gcHJvdG87XG4gICAgICAgIGVsc2Ugc2V0KE8sIHByb3RvKTtcbiAgICAgICAgcmV0dXJuIE87XG4gICAgICB9O1xuICAgIH0oe30sIGZhbHNlKSA6IHVuZGVmaW5lZCksXG4gIGNoZWNrOiBjaGVja1xufTsiLCJ2YXIgZGVmID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJykuZlxuICAsIGhhcyA9IHJlcXVpcmUoJy4vX2hhcycpXG4gICwgVEFHID0gcmVxdWlyZSgnLi9fd2tzJykoJ3RvU3RyaW5nVGFnJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQsIHRhZywgc3RhdCl7XG4gIGlmKGl0ICYmICFoYXMoaXQgPSBzdGF0ID8gaXQgOiBpdC5wcm90b3R5cGUsIFRBRykpZGVmKGl0LCBUQUcsIHtjb25maWd1cmFibGU6IHRydWUsIHZhbHVlOiB0YWd9KTtcbn07IiwidmFyIHNoYXJlZCA9IHJlcXVpcmUoJy4vX3NoYXJlZCcpKCdrZXlzJylcbiAgLCB1aWQgICAgPSByZXF1aXJlKCcuL191aWQnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oa2V5KXtcbiAgcmV0dXJuIHNoYXJlZFtrZXldIHx8IChzaGFyZWRba2V5XSA9IHVpZChrZXkpKTtcbn07IiwidmFyIGdsb2JhbCA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpXG4gICwgU0hBUkVEID0gJ19fY29yZS1qc19zaGFyZWRfXydcbiAgLCBzdG9yZSAgPSBnbG9iYWxbU0hBUkVEXSB8fCAoZ2xvYmFsW1NIQVJFRF0gPSB7fSk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGtleSl7XG4gIHJldHVybiBzdG9yZVtrZXldIHx8IChzdG9yZVtrZXldID0ge30pO1xufTsiLCJ2YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi9fdG8taW50ZWdlcicpXG4gICwgZGVmaW5lZCAgID0gcmVxdWlyZSgnLi9fZGVmaW5lZCcpO1xuLy8gdHJ1ZSAgLT4gU3RyaW5nI2F0XG4vLyBmYWxzZSAtPiBTdHJpbmcjY29kZVBvaW50QXRcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oVE9fU1RSSU5HKXtcbiAgcmV0dXJuIGZ1bmN0aW9uKHRoYXQsIHBvcyl7XG4gICAgdmFyIHMgPSBTdHJpbmcoZGVmaW5lZCh0aGF0KSlcbiAgICAgICwgaSA9IHRvSW50ZWdlcihwb3MpXG4gICAgICAsIGwgPSBzLmxlbmd0aFxuICAgICAgLCBhLCBiO1xuICAgIGlmKGkgPCAwIHx8IGkgPj0gbClyZXR1cm4gVE9fU1RSSU5HID8gJycgOiB1bmRlZmluZWQ7XG4gICAgYSA9IHMuY2hhckNvZGVBdChpKTtcbiAgICByZXR1cm4gYSA8IDB4ZDgwMCB8fCBhID4gMHhkYmZmIHx8IGkgKyAxID09PSBsIHx8IChiID0gcy5jaGFyQ29kZUF0KGkgKyAxKSkgPCAweGRjMDAgfHwgYiA+IDB4ZGZmZlxuICAgICAgPyBUT19TVFJJTkcgPyBzLmNoYXJBdChpKSA6IGFcbiAgICAgIDogVE9fU1RSSU5HID8gcy5zbGljZShpLCBpICsgMikgOiAoYSAtIDB4ZDgwMCA8PCAxMCkgKyAoYiAtIDB4ZGMwMCkgKyAweDEwMDAwO1xuICB9O1xufTsiLCJ2YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi9fdG8taW50ZWdlcicpXG4gICwgbWF4ICAgICAgID0gTWF0aC5tYXhcbiAgLCBtaW4gICAgICAgPSBNYXRoLm1pbjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaW5kZXgsIGxlbmd0aCl7XG4gIGluZGV4ID0gdG9JbnRlZ2VyKGluZGV4KTtcbiAgcmV0dXJuIGluZGV4IDwgMCA/IG1heChpbmRleCArIGxlbmd0aCwgMCkgOiBtaW4oaW5kZXgsIGxlbmd0aCk7XG59OyIsIi8vIDcuMS40IFRvSW50ZWdlclxudmFyIGNlaWwgID0gTWF0aC5jZWlsXG4gICwgZmxvb3IgPSBNYXRoLmZsb29yO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBpc05hTihpdCA9ICtpdCkgPyAwIDogKGl0ID4gMCA/IGZsb29yIDogY2VpbCkoaXQpO1xufTsiLCIvLyB0byBpbmRleGVkIG9iamVjdCwgdG9PYmplY3Qgd2l0aCBmYWxsYmFjayBmb3Igbm9uLWFycmF5LWxpa2UgRVMzIHN0cmluZ3NcbnZhciBJT2JqZWN0ID0gcmVxdWlyZSgnLi9faW9iamVjdCcpXG4gICwgZGVmaW5lZCA9IHJlcXVpcmUoJy4vX2RlZmluZWQnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gSU9iamVjdChkZWZpbmVkKGl0KSk7XG59OyIsIi8vIDcuMS4xNSBUb0xlbmd0aFxudmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4vX3RvLWludGVnZXInKVxuICAsIG1pbiAgICAgICA9IE1hdGgubWluO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBpdCA+IDAgPyBtaW4odG9JbnRlZ2VyKGl0KSwgMHgxZmZmZmZmZmZmZmZmZikgOiAwOyAvLyBwb3coMiwgNTMpIC0gMSA9PSA5MDA3MTk5MjU0NzQwOTkxXG59OyIsIi8vIDcuMS4xMyBUb09iamVjdChhcmd1bWVudClcbnZhciBkZWZpbmVkID0gcmVxdWlyZSgnLi9fZGVmaW5lZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBPYmplY3QoZGVmaW5lZChpdCkpO1xufTsiLCIvLyA3LjEuMSBUb1ByaW1pdGl2ZShpbnB1dCBbLCBQcmVmZXJyZWRUeXBlXSlcbnZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xuLy8gaW5zdGVhZCBvZiB0aGUgRVM2IHNwZWMgdmVyc2lvbiwgd2UgZGlkbid0IGltcGxlbWVudCBAQHRvUHJpbWl0aXZlIGNhc2Vcbi8vIGFuZCB0aGUgc2Vjb25kIGFyZ3VtZW50IC0gZmxhZyAtIHByZWZlcnJlZCB0eXBlIGlzIGEgc3RyaW5nXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0LCBTKXtcbiAgaWYoIWlzT2JqZWN0KGl0KSlyZXR1cm4gaXQ7XG4gIHZhciBmbiwgdmFsO1xuICBpZihTICYmIHR5cGVvZiAoZm4gPSBpdC50b1N0cmluZykgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKXJldHVybiB2YWw7XG4gIGlmKHR5cGVvZiAoZm4gPSBpdC52YWx1ZU9mKSA9PSAnZnVuY3Rpb24nICYmICFpc09iamVjdCh2YWwgPSBmbi5jYWxsKGl0KSkpcmV0dXJuIHZhbDtcbiAgaWYoIVMgJiYgdHlwZW9mIChmbiA9IGl0LnRvU3RyaW5nKSA9PSAnZnVuY3Rpb24nICYmICFpc09iamVjdCh2YWwgPSBmbi5jYWxsKGl0KSkpcmV0dXJuIHZhbDtcbiAgdGhyb3cgVHlwZUVycm9yKFwiQ2FuJ3QgY29udmVydCBvYmplY3QgdG8gcHJpbWl0aXZlIHZhbHVlXCIpO1xufTsiLCJ2YXIgaWQgPSAwXG4gICwgcHggPSBNYXRoLnJhbmRvbSgpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihrZXkpe1xuICByZXR1cm4gJ1N5bWJvbCgnLmNvbmNhdChrZXkgPT09IHVuZGVmaW5lZCA/ICcnIDoga2V5LCAnKV8nLCAoKytpZCArIHB4KS50b1N0cmluZygzNikpO1xufTsiLCJ2YXIgZ2xvYmFsICAgICAgICAgPSByZXF1aXJlKCcuL19nbG9iYWwnKVxuICAsIGNvcmUgICAgICAgICAgID0gcmVxdWlyZSgnLi9fY29yZScpXG4gICwgTElCUkFSWSAgICAgICAgPSByZXF1aXJlKCcuL19saWJyYXJ5JylcbiAgLCB3a3NFeHQgICAgICAgICA9IHJlcXVpcmUoJy4vX3drcy1leHQnKVxuICAsIGRlZmluZVByb3BlcnR5ID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJykuZjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obmFtZSl7XG4gIHZhciAkU3ltYm9sID0gY29yZS5TeW1ib2wgfHwgKGNvcmUuU3ltYm9sID0gTElCUkFSWSA/IHt9IDogZ2xvYmFsLlN5bWJvbCB8fCB7fSk7XG4gIGlmKG5hbWUuY2hhckF0KDApICE9ICdfJyAmJiAhKG5hbWUgaW4gJFN5bWJvbCkpZGVmaW5lUHJvcGVydHkoJFN5bWJvbCwgbmFtZSwge3ZhbHVlOiB3a3NFeHQuZihuYW1lKX0pO1xufTsiLCJleHBvcnRzLmYgPSByZXF1aXJlKCcuL193a3MnKTsiLCJ2YXIgc3RvcmUgICAgICA9IHJlcXVpcmUoJy4vX3NoYXJlZCcpKCd3a3MnKVxuICAsIHVpZCAgICAgICAgPSByZXF1aXJlKCcuL191aWQnKVxuICAsIFN5bWJvbCAgICAgPSByZXF1aXJlKCcuL19nbG9iYWwnKS5TeW1ib2xcbiAgLCBVU0VfU1lNQk9MID0gdHlwZW9mIFN5bWJvbCA9PSAnZnVuY3Rpb24nO1xuXG52YXIgJGV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG5hbWUpe1xuICByZXR1cm4gc3RvcmVbbmFtZV0gfHwgKHN0b3JlW25hbWVdID1cbiAgICBVU0VfU1lNQk9MICYmIFN5bWJvbFtuYW1lXSB8fCAoVVNFX1NZTUJPTCA/IFN5bWJvbCA6IHVpZCkoJ1N5bWJvbC4nICsgbmFtZSkpO1xufTtcblxuJGV4cG9ydHMuc3RvcmUgPSBzdG9yZTsiLCJ2YXIgY2xhc3NvZiAgID0gcmVxdWlyZSgnLi9fY2xhc3NvZicpXG4gICwgSVRFUkFUT1IgID0gcmVxdWlyZSgnLi9fd2tzJykoJ2l0ZXJhdG9yJylcbiAgLCBJdGVyYXRvcnMgPSByZXF1aXJlKCcuL19pdGVyYXRvcnMnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fY29yZScpLmdldEl0ZXJhdG9yTWV0aG9kID0gZnVuY3Rpb24oaXQpe1xuICBpZihpdCAhPSB1bmRlZmluZWQpcmV0dXJuIGl0W0lURVJBVE9SXVxuICAgIHx8IGl0WydAQGl0ZXJhdG9yJ11cbiAgICB8fCBJdGVyYXRvcnNbY2xhc3NvZihpdCldO1xufTsiLCJ2YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKVxuICAsIGdldCAgICAgID0gcmVxdWlyZSgnLi9jb3JlLmdldC1pdGVyYXRvci1tZXRob2QnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fY29yZScpLmdldEl0ZXJhdG9yID0gZnVuY3Rpb24oaXQpe1xuICB2YXIgaXRlckZuID0gZ2V0KGl0KTtcbiAgaWYodHlwZW9mIGl0ZXJGbiAhPSAnZnVuY3Rpb24nKXRocm93IFR5cGVFcnJvcihpdCArICcgaXMgbm90IGl0ZXJhYmxlIScpO1xuICByZXR1cm4gYW5PYmplY3QoaXRlckZuLmNhbGwoaXQpKTtcbn07IiwidmFyIGNsYXNzb2YgICA9IHJlcXVpcmUoJy4vX2NsYXNzb2YnKVxuICAsIElURVJBVE9SICA9IHJlcXVpcmUoJy4vX3drcycpKCdpdGVyYXRvcicpXG4gICwgSXRlcmF0b3JzID0gcmVxdWlyZSgnLi9faXRlcmF0b3JzJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2NvcmUnKS5pc0l0ZXJhYmxlID0gZnVuY3Rpb24oaXQpe1xuICB2YXIgTyA9IE9iamVjdChpdCk7XG4gIHJldHVybiBPW0lURVJBVE9SXSAhPT0gdW5kZWZpbmVkXG4gICAgfHwgJ0BAaXRlcmF0b3InIGluIE9cbiAgICB8fCBJdGVyYXRvcnMuaGFzT3duUHJvcGVydHkoY2xhc3NvZihPKSk7XG59OyIsIid1c2Ugc3RyaWN0JztcbnZhciBjdHggICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2N0eCcpXG4gICwgJGV4cG9ydCAgICAgICAgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsIHRvT2JqZWN0ICAgICAgID0gcmVxdWlyZSgnLi9fdG8tb2JqZWN0JylcbiAgLCBjYWxsICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2l0ZXItY2FsbCcpXG4gICwgaXNBcnJheUl0ZXIgICAgPSByZXF1aXJlKCcuL19pcy1hcnJheS1pdGVyJylcbiAgLCB0b0xlbmd0aCAgICAgICA9IHJlcXVpcmUoJy4vX3RvLWxlbmd0aCcpXG4gICwgY3JlYXRlUHJvcGVydHkgPSByZXF1aXJlKCcuL19jcmVhdGUtcHJvcGVydHknKVxuICAsIGdldEl0ZXJGbiAgICAgID0gcmVxdWlyZSgnLi9jb3JlLmdldC1pdGVyYXRvci1tZXRob2QnKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAhcmVxdWlyZSgnLi9faXRlci1kZXRlY3QnKShmdW5jdGlvbihpdGVyKXsgQXJyYXkuZnJvbShpdGVyKTsgfSksICdBcnJheScsIHtcbiAgLy8gMjIuMS4yLjEgQXJyYXkuZnJvbShhcnJheUxpa2UsIG1hcGZuID0gdW5kZWZpbmVkLCB0aGlzQXJnID0gdW5kZWZpbmVkKVxuICBmcm9tOiBmdW5jdGlvbiBmcm9tKGFycmF5TGlrZS8qLCBtYXBmbiA9IHVuZGVmaW5lZCwgdGhpc0FyZyA9IHVuZGVmaW5lZCovKXtcbiAgICB2YXIgTyAgICAgICA9IHRvT2JqZWN0KGFycmF5TGlrZSlcbiAgICAgICwgQyAgICAgICA9IHR5cGVvZiB0aGlzID09ICdmdW5jdGlvbicgPyB0aGlzIDogQXJyYXlcbiAgICAgICwgYUxlbiAgICA9IGFyZ3VtZW50cy5sZW5ndGhcbiAgICAgICwgbWFwZm4gICA9IGFMZW4gPiAxID8gYXJndW1lbnRzWzFdIDogdW5kZWZpbmVkXG4gICAgICAsIG1hcHBpbmcgPSBtYXBmbiAhPT0gdW5kZWZpbmVkXG4gICAgICAsIGluZGV4ICAgPSAwXG4gICAgICAsIGl0ZXJGbiAgPSBnZXRJdGVyRm4oTylcbiAgICAgICwgbGVuZ3RoLCByZXN1bHQsIHN0ZXAsIGl0ZXJhdG9yO1xuICAgIGlmKG1hcHBpbmcpbWFwZm4gPSBjdHgobWFwZm4sIGFMZW4gPiAyID8gYXJndW1lbnRzWzJdIDogdW5kZWZpbmVkLCAyKTtcbiAgICAvLyBpZiBvYmplY3QgaXNuJ3QgaXRlcmFibGUgb3IgaXQncyBhcnJheSB3aXRoIGRlZmF1bHQgaXRlcmF0b3IgLSB1c2Ugc2ltcGxlIGNhc2VcbiAgICBpZihpdGVyRm4gIT0gdW5kZWZpbmVkICYmICEoQyA9PSBBcnJheSAmJiBpc0FycmF5SXRlcihpdGVyRm4pKSl7XG4gICAgICBmb3IoaXRlcmF0b3IgPSBpdGVyRm4uY2FsbChPKSwgcmVzdWx0ID0gbmV3IEM7ICEoc3RlcCA9IGl0ZXJhdG9yLm5leHQoKSkuZG9uZTsgaW5kZXgrKyl7XG4gICAgICAgIGNyZWF0ZVByb3BlcnR5KHJlc3VsdCwgaW5kZXgsIG1hcHBpbmcgPyBjYWxsKGl0ZXJhdG9yLCBtYXBmbiwgW3N0ZXAudmFsdWUsIGluZGV4XSwgdHJ1ZSkgOiBzdGVwLnZhbHVlKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgbGVuZ3RoID0gdG9MZW5ndGgoTy5sZW5ndGgpO1xuICAgICAgZm9yKHJlc3VsdCA9IG5ldyBDKGxlbmd0aCk7IGxlbmd0aCA+IGluZGV4OyBpbmRleCsrKXtcbiAgICAgICAgY3JlYXRlUHJvcGVydHkocmVzdWx0LCBpbmRleCwgbWFwcGluZyA/IG1hcGZuKE9baW5kZXhdLCBpbmRleCkgOiBPW2luZGV4XSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJlc3VsdC5sZW5ndGggPSBpbmRleDtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG59KTtcbiIsIid1c2Ugc3RyaWN0JztcbnZhciBhZGRUb1Vuc2NvcGFibGVzID0gcmVxdWlyZSgnLi9fYWRkLXRvLXVuc2NvcGFibGVzJylcbiAgLCBzdGVwICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9faXRlci1zdGVwJylcbiAgLCBJdGVyYXRvcnMgICAgICAgID0gcmVxdWlyZSgnLi9faXRlcmF0b3JzJylcbiAgLCB0b0lPYmplY3QgICAgICAgID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpO1xuXG4vLyAyMi4xLjMuNCBBcnJheS5wcm90b3R5cGUuZW50cmllcygpXG4vLyAyMi4xLjMuMTMgQXJyYXkucHJvdG90eXBlLmtleXMoKVxuLy8gMjIuMS4zLjI5IEFycmF5LnByb3RvdHlwZS52YWx1ZXMoKVxuLy8gMjIuMS4zLjMwIEFycmF5LnByb3RvdHlwZVtAQGl0ZXJhdG9yXSgpXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2l0ZXItZGVmaW5lJykoQXJyYXksICdBcnJheScsIGZ1bmN0aW9uKGl0ZXJhdGVkLCBraW5kKXtcbiAgdGhpcy5fdCA9IHRvSU9iamVjdChpdGVyYXRlZCk7IC8vIHRhcmdldFxuICB0aGlzLl9pID0gMDsgICAgICAgICAgICAgICAgICAgLy8gbmV4dCBpbmRleFxuICB0aGlzLl9rID0ga2luZDsgICAgICAgICAgICAgICAgLy8ga2luZFxuLy8gMjIuMS41LjIuMSAlQXJyYXlJdGVyYXRvclByb3RvdHlwZSUubmV4dCgpXG59LCBmdW5jdGlvbigpe1xuICB2YXIgTyAgICAgPSB0aGlzLl90XG4gICAgLCBraW5kICA9IHRoaXMuX2tcbiAgICAsIGluZGV4ID0gdGhpcy5faSsrO1xuICBpZighTyB8fCBpbmRleCA+PSBPLmxlbmd0aCl7XG4gICAgdGhpcy5fdCA9IHVuZGVmaW5lZDtcbiAgICByZXR1cm4gc3RlcCgxKTtcbiAgfVxuICBpZihraW5kID09ICdrZXlzJyAgKXJldHVybiBzdGVwKDAsIGluZGV4KTtcbiAgaWYoa2luZCA9PSAndmFsdWVzJylyZXR1cm4gc3RlcCgwLCBPW2luZGV4XSk7XG4gIHJldHVybiBzdGVwKDAsIFtpbmRleCwgT1tpbmRleF1dKTtcbn0sICd2YWx1ZXMnKTtcblxuLy8gYXJndW1lbnRzTGlzdFtAQGl0ZXJhdG9yXSBpcyAlQXJyYXlQcm90b192YWx1ZXMlICg5LjQuNC42LCA5LjQuNC43KVxuSXRlcmF0b3JzLkFyZ3VtZW50cyA9IEl0ZXJhdG9ycy5BcnJheTtcblxuYWRkVG9VbnNjb3BhYmxlcygna2V5cycpO1xuYWRkVG9VbnNjb3BhYmxlcygndmFsdWVzJyk7XG5hZGRUb1Vuc2NvcGFibGVzKCdlbnRyaWVzJyk7IiwiLy8gMTkuMS4zLjEgT2JqZWN0LmFzc2lnbih0YXJnZXQsIHNvdXJjZSlcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG5cbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GLCAnT2JqZWN0Jywge2Fzc2lnbjogcmVxdWlyZSgnLi9fb2JqZWN0LWFzc2lnbicpfSk7IiwidmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuLy8gMTkuMS4yLjIgLyAxNS4yLjMuNSBPYmplY3QuY3JlYXRlKE8gWywgUHJvcGVydGllc10pXG4kZXhwb3J0KCRleHBvcnQuUywgJ09iamVjdCcsIHtjcmVhdGU6IHJlcXVpcmUoJy4vX29iamVjdC1jcmVhdGUnKX0pOyIsInZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0Jyk7XG4vLyAxOS4xLjIuNCAvIDE1LjIuMy42IE9iamVjdC5kZWZpbmVQcm9wZXJ0eShPLCBQLCBBdHRyaWJ1dGVzKVxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAhcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSwgJ09iamVjdCcsIHtkZWZpbmVQcm9wZXJ0eTogcmVxdWlyZSgnLi9fb2JqZWN0LWRwJykuZn0pOyIsIi8vIDE5LjEuMi45IE9iamVjdC5nZXRQcm90b3R5cGVPZihPKVxudmFyIHRvT2JqZWN0ICAgICAgICA9IHJlcXVpcmUoJy4vX3RvLW9iamVjdCcpXG4gICwgJGdldFByb3RvdHlwZU9mID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdwbycpO1xuXG5yZXF1aXJlKCcuL19vYmplY3Qtc2FwJykoJ2dldFByb3RvdHlwZU9mJywgZnVuY3Rpb24oKXtcbiAgcmV0dXJuIGZ1bmN0aW9uIGdldFByb3RvdHlwZU9mKGl0KXtcbiAgICByZXR1cm4gJGdldFByb3RvdHlwZU9mKHRvT2JqZWN0KGl0KSk7XG4gIH07XG59KTsiLCIvLyAxOS4xLjIuMTQgT2JqZWN0LmtleXMoTylcbnZhciB0b09iamVjdCA9IHJlcXVpcmUoJy4vX3RvLW9iamVjdCcpXG4gICwgJGtleXMgICAgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cycpO1xuXG5yZXF1aXJlKCcuL19vYmplY3Qtc2FwJykoJ2tleXMnLCBmdW5jdGlvbigpe1xuICByZXR1cm4gZnVuY3Rpb24ga2V5cyhpdCl7XG4gICAgcmV0dXJuICRrZXlzKHRvT2JqZWN0KGl0KSk7XG4gIH07XG59KTsiLCIvLyAxOS4xLjMuMTkgT2JqZWN0LnNldFByb3RvdHlwZU9mKE8sIHByb3RvKVxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbiRleHBvcnQoJGV4cG9ydC5TLCAnT2JqZWN0Jywge3NldFByb3RvdHlwZU9mOiByZXF1aXJlKCcuL19zZXQtcHJvdG8nKS5zZXR9KTsiLCIiLCIndXNlIHN0cmljdCc7XG52YXIgJGF0ICA9IHJlcXVpcmUoJy4vX3N0cmluZy1hdCcpKHRydWUpO1xuXG4vLyAyMS4xLjMuMjcgU3RyaW5nLnByb3RvdHlwZVtAQGl0ZXJhdG9yXSgpXG5yZXF1aXJlKCcuL19pdGVyLWRlZmluZScpKFN0cmluZywgJ1N0cmluZycsIGZ1bmN0aW9uKGl0ZXJhdGVkKXtcbiAgdGhpcy5fdCA9IFN0cmluZyhpdGVyYXRlZCk7IC8vIHRhcmdldFxuICB0aGlzLl9pID0gMDsgICAgICAgICAgICAgICAgLy8gbmV4dCBpbmRleFxuLy8gMjEuMS41LjIuMSAlU3RyaW5nSXRlcmF0b3JQcm90b3R5cGUlLm5leHQoKVxufSwgZnVuY3Rpb24oKXtcbiAgdmFyIE8gICAgID0gdGhpcy5fdFxuICAgICwgaW5kZXggPSB0aGlzLl9pXG4gICAgLCBwb2ludDtcbiAgaWYoaW5kZXggPj0gTy5sZW5ndGgpcmV0dXJuIHt2YWx1ZTogdW5kZWZpbmVkLCBkb25lOiB0cnVlfTtcbiAgcG9pbnQgPSAkYXQoTywgaW5kZXgpO1xuICB0aGlzLl9pICs9IHBvaW50Lmxlbmd0aDtcbiAgcmV0dXJuIHt2YWx1ZTogcG9pbnQsIGRvbmU6IGZhbHNlfTtcbn0pOyIsIid1c2Ugc3RyaWN0Jztcbi8vIEVDTUFTY3JpcHQgNiBzeW1ib2xzIHNoaW1cbnZhciBnbG9iYWwgICAgICAgICA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpXG4gICwgaGFzICAgICAgICAgICAgPSByZXF1aXJlKCcuL19oYXMnKVxuICAsIERFU0NSSVBUT1JTICAgID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKVxuICAsICRleHBvcnQgICAgICAgID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgLCByZWRlZmluZSAgICAgICA9IHJlcXVpcmUoJy4vX3JlZGVmaW5lJylcbiAgLCBNRVRBICAgICAgICAgICA9IHJlcXVpcmUoJy4vX21ldGEnKS5LRVlcbiAgLCAkZmFpbHMgICAgICAgICA9IHJlcXVpcmUoJy4vX2ZhaWxzJylcbiAgLCBzaGFyZWQgICAgICAgICA9IHJlcXVpcmUoJy4vX3NoYXJlZCcpXG4gICwgc2V0VG9TdHJpbmdUYWcgPSByZXF1aXJlKCcuL19zZXQtdG8tc3RyaW5nLXRhZycpXG4gICwgdWlkICAgICAgICAgICAgPSByZXF1aXJlKCcuL191aWQnKVxuICAsIHdrcyAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fd2tzJylcbiAgLCB3a3NFeHQgICAgICAgICA9IHJlcXVpcmUoJy4vX3drcy1leHQnKVxuICAsIHdrc0RlZmluZSAgICAgID0gcmVxdWlyZSgnLi9fd2tzLWRlZmluZScpXG4gICwga2V5T2YgICAgICAgICAgPSByZXF1aXJlKCcuL19rZXlvZicpXG4gICwgZW51bUtleXMgICAgICAgPSByZXF1aXJlKCcuL19lbnVtLWtleXMnKVxuICAsIGlzQXJyYXkgICAgICAgID0gcmVxdWlyZSgnLi9faXMtYXJyYXknKVxuICAsIGFuT2JqZWN0ICAgICAgID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0JylcbiAgLCB0b0lPYmplY3QgICAgICA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKVxuICAsIHRvUHJpbWl0aXZlICAgID0gcmVxdWlyZSgnLi9fdG8tcHJpbWl0aXZlJylcbiAgLCBjcmVhdGVEZXNjICAgICA9IHJlcXVpcmUoJy4vX3Byb3BlcnR5LWRlc2MnKVxuICAsIF9jcmVhdGUgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWNyZWF0ZScpXG4gICwgZ09QTkV4dCAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZ29wbi1leHQnKVxuICAsICRHT1BEICAgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdvcGQnKVxuICAsICREUCAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJylcbiAgLCAka2V5cyAgICAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzJylcbiAgLCBnT1BEICAgICAgICAgICA9ICRHT1BELmZcbiAgLCBkUCAgICAgICAgICAgICA9ICREUC5mXG4gICwgZ09QTiAgICAgICAgICAgPSBnT1BORXh0LmZcbiAgLCAkU3ltYm9sICAgICAgICA9IGdsb2JhbC5TeW1ib2xcbiAgLCAkSlNPTiAgICAgICAgICA9IGdsb2JhbC5KU09OXG4gICwgX3N0cmluZ2lmeSAgICAgPSAkSlNPTiAmJiAkSlNPTi5zdHJpbmdpZnlcbiAgLCBQUk9UT1RZUEUgICAgICA9ICdwcm90b3R5cGUnXG4gICwgSElEREVOICAgICAgICAgPSB3a3MoJ19oaWRkZW4nKVxuICAsIFRPX1BSSU1JVElWRSAgID0gd2tzKCd0b1ByaW1pdGl2ZScpXG4gICwgaXNFbnVtICAgICAgICAgPSB7fS5wcm9wZXJ0eUlzRW51bWVyYWJsZVxuICAsIFN5bWJvbFJlZ2lzdHJ5ID0gc2hhcmVkKCdzeW1ib2wtcmVnaXN0cnknKVxuICAsIEFsbFN5bWJvbHMgICAgID0gc2hhcmVkKCdzeW1ib2xzJylcbiAgLCBPUFN5bWJvbHMgICAgICA9IHNoYXJlZCgnb3Atc3ltYm9scycpXG4gICwgT2JqZWN0UHJvdG8gICAgPSBPYmplY3RbUFJPVE9UWVBFXVxuICAsIFVTRV9OQVRJVkUgICAgID0gdHlwZW9mICRTeW1ib2wgPT0gJ2Z1bmN0aW9uJ1xuICAsIFFPYmplY3QgICAgICAgID0gZ2xvYmFsLlFPYmplY3Q7XG4vLyBEb24ndCB1c2Ugc2V0dGVycyBpbiBRdCBTY3JpcHQsIGh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2lzc3Vlcy8xNzNcbnZhciBzZXR0ZXIgPSAhUU9iamVjdCB8fCAhUU9iamVjdFtQUk9UT1RZUEVdIHx8ICFRT2JqZWN0W1BST1RPVFlQRV0uZmluZENoaWxkO1xuXG4vLyBmYWxsYmFjayBmb3Igb2xkIEFuZHJvaWQsIGh0dHBzOi8vY29kZS5nb29nbGUuY29tL3AvdjgvaXNzdWVzL2RldGFpbD9pZD02ODdcbnZhciBzZXRTeW1ib2xEZXNjID0gREVTQ1JJUFRPUlMgJiYgJGZhaWxzKGZ1bmN0aW9uKCl7XG4gIHJldHVybiBfY3JlYXRlKGRQKHt9LCAnYScsIHtcbiAgICBnZXQ6IGZ1bmN0aW9uKCl7IHJldHVybiBkUCh0aGlzLCAnYScsIHt2YWx1ZTogN30pLmE7IH1cbiAgfSkpLmEgIT0gNztcbn0pID8gZnVuY3Rpb24oaXQsIGtleSwgRCl7XG4gIHZhciBwcm90b0Rlc2MgPSBnT1BEKE9iamVjdFByb3RvLCBrZXkpO1xuICBpZihwcm90b0Rlc2MpZGVsZXRlIE9iamVjdFByb3RvW2tleV07XG4gIGRQKGl0LCBrZXksIEQpO1xuICBpZihwcm90b0Rlc2MgJiYgaXQgIT09IE9iamVjdFByb3RvKWRQKE9iamVjdFByb3RvLCBrZXksIHByb3RvRGVzYyk7XG59IDogZFA7XG5cbnZhciB3cmFwID0gZnVuY3Rpb24odGFnKXtcbiAgdmFyIHN5bSA9IEFsbFN5bWJvbHNbdGFnXSA9IF9jcmVhdGUoJFN5bWJvbFtQUk9UT1RZUEVdKTtcbiAgc3ltLl9rID0gdGFnO1xuICByZXR1cm4gc3ltO1xufTtcblxudmFyIGlzU3ltYm9sID0gVVNFX05BVElWRSAmJiB0eXBlb2YgJFN5bWJvbC5pdGVyYXRvciA9PSAnc3ltYm9sJyA/IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIHR5cGVvZiBpdCA9PSAnc3ltYm9sJztcbn0gOiBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBpdCBpbnN0YW5jZW9mICRTeW1ib2w7XG59O1xuXG52YXIgJGRlZmluZVByb3BlcnR5ID0gZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkoaXQsIGtleSwgRCl7XG4gIGlmKGl0ID09PSBPYmplY3RQcm90bykkZGVmaW5lUHJvcGVydHkoT1BTeW1ib2xzLCBrZXksIEQpO1xuICBhbk9iamVjdChpdCk7XG4gIGtleSA9IHRvUHJpbWl0aXZlKGtleSwgdHJ1ZSk7XG4gIGFuT2JqZWN0KEQpO1xuICBpZihoYXMoQWxsU3ltYm9scywga2V5KSl7XG4gICAgaWYoIUQuZW51bWVyYWJsZSl7XG4gICAgICBpZighaGFzKGl0LCBISURERU4pKWRQKGl0LCBISURERU4sIGNyZWF0ZURlc2MoMSwge30pKTtcbiAgICAgIGl0W0hJRERFTl1ba2V5XSA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmKGhhcyhpdCwgSElEREVOKSAmJiBpdFtISURERU5dW2tleV0paXRbSElEREVOXVtrZXldID0gZmFsc2U7XG4gICAgICBEID0gX2NyZWF0ZShELCB7ZW51bWVyYWJsZTogY3JlYXRlRGVzYygwLCBmYWxzZSl9KTtcbiAgICB9IHJldHVybiBzZXRTeW1ib2xEZXNjKGl0LCBrZXksIEQpO1xuICB9IHJldHVybiBkUChpdCwga2V5LCBEKTtcbn07XG52YXIgJGRlZmluZVByb3BlcnRpZXMgPSBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKGl0LCBQKXtcbiAgYW5PYmplY3QoaXQpO1xuICB2YXIga2V5cyA9IGVudW1LZXlzKFAgPSB0b0lPYmplY3QoUCkpXG4gICAgLCBpICAgID0gMFxuICAgICwgbCA9IGtleXMubGVuZ3RoXG4gICAgLCBrZXk7XG4gIHdoaWxlKGwgPiBpKSRkZWZpbmVQcm9wZXJ0eShpdCwga2V5ID0ga2V5c1tpKytdLCBQW2tleV0pO1xuICByZXR1cm4gaXQ7XG59O1xudmFyICRjcmVhdGUgPSBmdW5jdGlvbiBjcmVhdGUoaXQsIFApe1xuICByZXR1cm4gUCA9PT0gdW5kZWZpbmVkID8gX2NyZWF0ZShpdCkgOiAkZGVmaW5lUHJvcGVydGllcyhfY3JlYXRlKGl0KSwgUCk7XG59O1xudmFyICRwcm9wZXJ0eUlzRW51bWVyYWJsZSA9IGZ1bmN0aW9uIHByb3BlcnR5SXNFbnVtZXJhYmxlKGtleSl7XG4gIHZhciBFID0gaXNFbnVtLmNhbGwodGhpcywga2V5ID0gdG9QcmltaXRpdmUoa2V5LCB0cnVlKSk7XG4gIGlmKHRoaXMgPT09IE9iamVjdFByb3RvICYmIGhhcyhBbGxTeW1ib2xzLCBrZXkpICYmICFoYXMoT1BTeW1ib2xzLCBrZXkpKXJldHVybiBmYWxzZTtcbiAgcmV0dXJuIEUgfHwgIWhhcyh0aGlzLCBrZXkpIHx8ICFoYXMoQWxsU3ltYm9scywga2V5KSB8fCBoYXModGhpcywgSElEREVOKSAmJiB0aGlzW0hJRERFTl1ba2V5XSA/IEUgOiB0cnVlO1xufTtcbnZhciAkZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID0gZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGl0LCBrZXkpe1xuICBpdCAgPSB0b0lPYmplY3QoaXQpO1xuICBrZXkgPSB0b1ByaW1pdGl2ZShrZXksIHRydWUpO1xuICBpZihpdCA9PT0gT2JqZWN0UHJvdG8gJiYgaGFzKEFsbFN5bWJvbHMsIGtleSkgJiYgIWhhcyhPUFN5bWJvbHMsIGtleSkpcmV0dXJuO1xuICB2YXIgRCA9IGdPUEQoaXQsIGtleSk7XG4gIGlmKEQgJiYgaGFzKEFsbFN5bWJvbHMsIGtleSkgJiYgIShoYXMoaXQsIEhJRERFTikgJiYgaXRbSElEREVOXVtrZXldKSlELmVudW1lcmFibGUgPSB0cnVlO1xuICByZXR1cm4gRDtcbn07XG52YXIgJGdldE93blByb3BlcnR5TmFtZXMgPSBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eU5hbWVzKGl0KXtcbiAgdmFyIG5hbWVzICA9IGdPUE4odG9JT2JqZWN0KGl0KSlcbiAgICAsIHJlc3VsdCA9IFtdXG4gICAgLCBpICAgICAgPSAwXG4gICAgLCBrZXk7XG4gIHdoaWxlKG5hbWVzLmxlbmd0aCA+IGkpe1xuICAgIGlmKCFoYXMoQWxsU3ltYm9scywga2V5ID0gbmFtZXNbaSsrXSkgJiYga2V5ICE9IEhJRERFTiAmJiBrZXkgIT0gTUVUQSlyZXN1bHQucHVzaChrZXkpO1xuICB9IHJldHVybiByZXN1bHQ7XG59O1xudmFyICRnZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPSBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMoaXQpe1xuICB2YXIgSVNfT1AgID0gaXQgPT09IE9iamVjdFByb3RvXG4gICAgLCBuYW1lcyAgPSBnT1BOKElTX09QID8gT1BTeW1ib2xzIDogdG9JT2JqZWN0KGl0KSlcbiAgICAsIHJlc3VsdCA9IFtdXG4gICAgLCBpICAgICAgPSAwXG4gICAgLCBrZXk7XG4gIHdoaWxlKG5hbWVzLmxlbmd0aCA+IGkpe1xuICAgIGlmKGhhcyhBbGxTeW1ib2xzLCBrZXkgPSBuYW1lc1tpKytdKSAmJiAoSVNfT1AgPyBoYXMoT2JqZWN0UHJvdG8sIGtleSkgOiB0cnVlKSlyZXN1bHQucHVzaChBbGxTeW1ib2xzW2tleV0pO1xuICB9IHJldHVybiByZXN1bHQ7XG59O1xuXG4vLyAxOS40LjEuMSBTeW1ib2woW2Rlc2NyaXB0aW9uXSlcbmlmKCFVU0VfTkFUSVZFKXtcbiAgJFN5bWJvbCA9IGZ1bmN0aW9uIFN5bWJvbCgpe1xuICAgIGlmKHRoaXMgaW5zdGFuY2VvZiAkU3ltYm9sKXRocm93IFR5cGVFcnJvcignU3ltYm9sIGlzIG5vdCBhIGNvbnN0cnVjdG9yIScpO1xuICAgIHZhciB0YWcgPSB1aWQoYXJndW1lbnRzLmxlbmd0aCA+IDAgPyBhcmd1bWVudHNbMF0gOiB1bmRlZmluZWQpO1xuICAgIHZhciAkc2V0ID0gZnVuY3Rpb24odmFsdWUpe1xuICAgICAgaWYodGhpcyA9PT0gT2JqZWN0UHJvdG8pJHNldC5jYWxsKE9QU3ltYm9scywgdmFsdWUpO1xuICAgICAgaWYoaGFzKHRoaXMsIEhJRERFTikgJiYgaGFzKHRoaXNbSElEREVOXSwgdGFnKSl0aGlzW0hJRERFTl1bdGFnXSA9IGZhbHNlO1xuICAgICAgc2V0U3ltYm9sRGVzYyh0aGlzLCB0YWcsIGNyZWF0ZURlc2MoMSwgdmFsdWUpKTtcbiAgICB9O1xuICAgIGlmKERFU0NSSVBUT1JTICYmIHNldHRlcilzZXRTeW1ib2xEZXNjKE9iamVjdFByb3RvLCB0YWcsIHtjb25maWd1cmFibGU6IHRydWUsIHNldDogJHNldH0pO1xuICAgIHJldHVybiB3cmFwKHRhZyk7XG4gIH07XG4gIHJlZGVmaW5lKCRTeW1ib2xbUFJPVE9UWVBFXSwgJ3RvU3RyaW5nJywgZnVuY3Rpb24gdG9TdHJpbmcoKXtcbiAgICByZXR1cm4gdGhpcy5faztcbiAgfSk7XG5cbiAgJEdPUEQuZiA9ICRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7XG4gICREUC5mICAgPSAkZGVmaW5lUHJvcGVydHk7XG4gIHJlcXVpcmUoJy4vX29iamVjdC1nb3BuJykuZiA9IGdPUE5FeHQuZiA9ICRnZXRPd25Qcm9wZXJ0eU5hbWVzO1xuICByZXF1aXJlKCcuL19vYmplY3QtcGllJykuZiAgPSAkcHJvcGVydHlJc0VudW1lcmFibGU7XG4gIHJlcXVpcmUoJy4vX29iamVjdC1nb3BzJykuZiA9ICRnZXRPd25Qcm9wZXJ0eVN5bWJvbHM7XG5cbiAgaWYoREVTQ1JJUFRPUlMgJiYgIXJlcXVpcmUoJy4vX2xpYnJhcnknKSl7XG4gICAgcmVkZWZpbmUoT2JqZWN0UHJvdG8sICdwcm9wZXJ0eUlzRW51bWVyYWJsZScsICRwcm9wZXJ0eUlzRW51bWVyYWJsZSwgdHJ1ZSk7XG4gIH1cblxuICB3a3NFeHQuZiA9IGZ1bmN0aW9uKG5hbWUpe1xuICAgIHJldHVybiB3cmFwKHdrcyhuYW1lKSk7XG4gIH1cbn1cblxuJGV4cG9ydCgkZXhwb3J0LkcgKyAkZXhwb3J0LlcgKyAkZXhwb3J0LkYgKiAhVVNFX05BVElWRSwge1N5bWJvbDogJFN5bWJvbH0pO1xuXG5mb3IodmFyIHN5bWJvbHMgPSAoXG4gIC8vIDE5LjQuMi4yLCAxOS40LjIuMywgMTkuNC4yLjQsIDE5LjQuMi42LCAxOS40LjIuOCwgMTkuNC4yLjksIDE5LjQuMi4xMCwgMTkuNC4yLjExLCAxOS40LjIuMTIsIDE5LjQuMi4xMywgMTkuNC4yLjE0XG4gICdoYXNJbnN0YW5jZSxpc0NvbmNhdFNwcmVhZGFibGUsaXRlcmF0b3IsbWF0Y2gscmVwbGFjZSxzZWFyY2gsc3BlY2llcyxzcGxpdCx0b1ByaW1pdGl2ZSx0b1N0cmluZ1RhZyx1bnNjb3BhYmxlcydcbikuc3BsaXQoJywnKSwgaSA9IDA7IHN5bWJvbHMubGVuZ3RoID4gaTsgKXdrcyhzeW1ib2xzW2krK10pO1xuXG5mb3IodmFyIHN5bWJvbHMgPSAka2V5cyh3a3Muc3RvcmUpLCBpID0gMDsgc3ltYm9scy5sZW5ndGggPiBpOyApd2tzRGVmaW5lKHN5bWJvbHNbaSsrXSk7XG5cbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogIVVTRV9OQVRJVkUsICdTeW1ib2wnLCB7XG4gIC8vIDE5LjQuMi4xIFN5bWJvbC5mb3Ioa2V5KVxuICAnZm9yJzogZnVuY3Rpb24oa2V5KXtcbiAgICByZXR1cm4gaGFzKFN5bWJvbFJlZ2lzdHJ5LCBrZXkgKz0gJycpXG4gICAgICA/IFN5bWJvbFJlZ2lzdHJ5W2tleV1cbiAgICAgIDogU3ltYm9sUmVnaXN0cnlba2V5XSA9ICRTeW1ib2woa2V5KTtcbiAgfSxcbiAgLy8gMTkuNC4yLjUgU3ltYm9sLmtleUZvcihzeW0pXG4gIGtleUZvcjogZnVuY3Rpb24ga2V5Rm9yKGtleSl7XG4gICAgaWYoaXNTeW1ib2woa2V5KSlyZXR1cm4ga2V5T2YoU3ltYm9sUmVnaXN0cnksIGtleSk7XG4gICAgdGhyb3cgVHlwZUVycm9yKGtleSArICcgaXMgbm90IGEgc3ltYm9sIScpO1xuICB9LFxuICB1c2VTZXR0ZXI6IGZ1bmN0aW9uKCl7IHNldHRlciA9IHRydWU7IH0sXG4gIHVzZVNpbXBsZTogZnVuY3Rpb24oKXsgc2V0dGVyID0gZmFsc2U7IH1cbn0pO1xuXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICFVU0VfTkFUSVZFLCAnT2JqZWN0Jywge1xuICAvLyAxOS4xLjIuMiBPYmplY3QuY3JlYXRlKE8gWywgUHJvcGVydGllc10pXG4gIGNyZWF0ZTogJGNyZWF0ZSxcbiAgLy8gMTkuMS4yLjQgT2JqZWN0LmRlZmluZVByb3BlcnR5KE8sIFAsIEF0dHJpYnV0ZXMpXG4gIGRlZmluZVByb3BlcnR5OiAkZGVmaW5lUHJvcGVydHksXG4gIC8vIDE5LjEuMi4zIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKE8sIFByb3BlcnRpZXMpXG4gIGRlZmluZVByb3BlcnRpZXM6ICRkZWZpbmVQcm9wZXJ0aWVzLFxuICAvLyAxOS4xLjIuNiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKE8sIFApXG4gIGdldE93blByb3BlcnR5RGVzY3JpcHRvcjogJGdldE93blByb3BlcnR5RGVzY3JpcHRvcixcbiAgLy8gMTkuMS4yLjcgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoTylcbiAgZ2V0T3duUHJvcGVydHlOYW1lczogJGdldE93blByb3BlcnR5TmFtZXMsXG4gIC8vIDE5LjEuMi44IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMoTylcbiAgZ2V0T3duUHJvcGVydHlTeW1ib2xzOiAkZ2V0T3duUHJvcGVydHlTeW1ib2xzXG59KTtcblxuLy8gMjQuMy4yIEpTT04uc3RyaW5naWZ5KHZhbHVlIFssIHJlcGxhY2VyIFssIHNwYWNlXV0pXG4kSlNPTiAmJiAkZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICghVVNFX05BVElWRSB8fCAkZmFpbHMoZnVuY3Rpb24oKXtcbiAgdmFyIFMgPSAkU3ltYm9sKCk7XG4gIC8vIE1TIEVkZ2UgY29udmVydHMgc3ltYm9sIHZhbHVlcyB0byBKU09OIGFzIHt9XG4gIC8vIFdlYktpdCBjb252ZXJ0cyBzeW1ib2wgdmFsdWVzIHRvIEpTT04gYXMgbnVsbFxuICAvLyBWOCB0aHJvd3Mgb24gYm94ZWQgc3ltYm9sc1xuICByZXR1cm4gX3N0cmluZ2lmeShbU10pICE9ICdbbnVsbF0nIHx8IF9zdHJpbmdpZnkoe2E6IFN9KSAhPSAne30nIHx8IF9zdHJpbmdpZnkoT2JqZWN0KFMpKSAhPSAne30nO1xufSkpLCAnSlNPTicsIHtcbiAgc3RyaW5naWZ5OiBmdW5jdGlvbiBzdHJpbmdpZnkoaXQpe1xuICAgIGlmKGl0ID09PSB1bmRlZmluZWQgfHwgaXNTeW1ib2woaXQpKXJldHVybjsgLy8gSUU4IHJldHVybnMgc3RyaW5nIG9uIHVuZGVmaW5lZFxuICAgIHZhciBhcmdzID0gW2l0XVxuICAgICAgLCBpICAgID0gMVxuICAgICAgLCByZXBsYWNlciwgJHJlcGxhY2VyO1xuICAgIHdoaWxlKGFyZ3VtZW50cy5sZW5ndGggPiBpKWFyZ3MucHVzaChhcmd1bWVudHNbaSsrXSk7XG4gICAgcmVwbGFjZXIgPSBhcmdzWzFdO1xuICAgIGlmKHR5cGVvZiByZXBsYWNlciA9PSAnZnVuY3Rpb24nKSRyZXBsYWNlciA9IHJlcGxhY2VyO1xuICAgIGlmKCRyZXBsYWNlciB8fCAhaXNBcnJheShyZXBsYWNlcikpcmVwbGFjZXIgPSBmdW5jdGlvbihrZXksIHZhbHVlKXtcbiAgICAgIGlmKCRyZXBsYWNlcil2YWx1ZSA9ICRyZXBsYWNlci5jYWxsKHRoaXMsIGtleSwgdmFsdWUpO1xuICAgICAgaWYoIWlzU3ltYm9sKHZhbHVlKSlyZXR1cm4gdmFsdWU7XG4gICAgfTtcbiAgICBhcmdzWzFdID0gcmVwbGFjZXI7XG4gICAgcmV0dXJuIF9zdHJpbmdpZnkuYXBwbHkoJEpTT04sIGFyZ3MpO1xuICB9XG59KTtcblxuLy8gMTkuNC4zLjQgU3ltYm9sLnByb3RvdHlwZVtAQHRvUHJpbWl0aXZlXShoaW50KVxuJFN5bWJvbFtQUk9UT1RZUEVdW1RPX1BSSU1JVElWRV0gfHwgcmVxdWlyZSgnLi9faGlkZScpKCRTeW1ib2xbUFJPVE9UWVBFXSwgVE9fUFJJTUlUSVZFLCAkU3ltYm9sW1BST1RPVFlQRV0udmFsdWVPZik7XG4vLyAxOS40LjMuNSBTeW1ib2wucHJvdG90eXBlW0BAdG9TdHJpbmdUYWddXG5zZXRUb1N0cmluZ1RhZygkU3ltYm9sLCAnU3ltYm9sJyk7XG4vLyAyMC4yLjEuOSBNYXRoW0BAdG9TdHJpbmdUYWddXG5zZXRUb1N0cmluZ1RhZyhNYXRoLCAnTWF0aCcsIHRydWUpO1xuLy8gMjQuMy4zIEpTT05bQEB0b1N0cmluZ1RhZ11cbnNldFRvU3RyaW5nVGFnKGdsb2JhbC5KU09OLCAnSlNPTicsIHRydWUpOyIsIi8vIGh0dHBzOi8vZ2l0aHViLmNvbS90YzM5L3Byb3Bvc2FsLW9iamVjdC12YWx1ZXMtZW50cmllc1xudmFyICRleHBvcnQgID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgLCAkZW50cmllcyA9IHJlcXVpcmUoJy4vX29iamVjdC10by1hcnJheScpKHRydWUpO1xuXG4kZXhwb3J0KCRleHBvcnQuUywgJ09iamVjdCcsIHtcbiAgZW50cmllczogZnVuY3Rpb24gZW50cmllcyhpdCl7XG4gICAgcmV0dXJuICRlbnRyaWVzKGl0KTtcbiAgfVxufSk7IiwicmVxdWlyZSgnLi9fd2tzLWRlZmluZScpKCdhc3luY0l0ZXJhdG9yJyk7IiwicmVxdWlyZSgnLi9fd2tzLWRlZmluZScpKCdvYnNlcnZhYmxlJyk7IiwicmVxdWlyZSgnLi9lczYuYXJyYXkuaXRlcmF0b3InKTtcbnZhciBnbG9iYWwgICAgICAgID0gcmVxdWlyZSgnLi9fZ2xvYmFsJylcbiAgLCBoaWRlICAgICAgICAgID0gcmVxdWlyZSgnLi9faGlkZScpXG4gICwgSXRlcmF0b3JzICAgICA9IHJlcXVpcmUoJy4vX2l0ZXJhdG9ycycpXG4gICwgVE9fU1RSSU5HX1RBRyA9IHJlcXVpcmUoJy4vX3drcycpKCd0b1N0cmluZ1RhZycpO1xuXG5mb3IodmFyIGNvbGxlY3Rpb25zID0gWydOb2RlTGlzdCcsICdET01Ub2tlbkxpc3QnLCAnTWVkaWFMaXN0JywgJ1N0eWxlU2hlZXRMaXN0JywgJ0NTU1J1bGVMaXN0J10sIGkgPSAwOyBpIDwgNTsgaSsrKXtcbiAgdmFyIE5BTUUgICAgICAgPSBjb2xsZWN0aW9uc1tpXVxuICAgICwgQ29sbGVjdGlvbiA9IGdsb2JhbFtOQU1FXVxuICAgICwgcHJvdG8gICAgICA9IENvbGxlY3Rpb24gJiYgQ29sbGVjdGlvbi5wcm90b3R5cGU7XG4gIGlmKHByb3RvICYmICFwcm90b1tUT19TVFJJTkdfVEFHXSloaWRlKHByb3RvLCBUT19TVFJJTkdfVEFHLCBOQU1FKTtcbiAgSXRlcmF0b3JzW05BTUVdID0gSXRlcmF0b3JzLkFycmF5O1xufSIsIi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgZ2xvYmFsYCBmcm9tIE5vZGUuanMuICovXG52YXIgZnJlZUdsb2JhbCA9IHR5cGVvZiBnbG9iYWwgPT0gJ29iamVjdCcgJiYgZ2xvYmFsICYmIGdsb2JhbC5PYmplY3QgPT09IE9iamVjdCAmJiBnbG9iYWw7XG5cbm1vZHVsZS5leHBvcnRzID0gZnJlZUdsb2JhbDtcbiIsInZhciBmcmVlR2xvYmFsID0gcmVxdWlyZSgnLi9fZnJlZUdsb2JhbCcpO1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYHNlbGZgLiAqL1xudmFyIGZyZWVTZWxmID0gdHlwZW9mIHNlbGYgPT0gJ29iamVjdCcgJiYgc2VsZiAmJiBzZWxmLk9iamVjdCA9PT0gT2JqZWN0ICYmIHNlbGY7XG5cbi8qKiBVc2VkIGFzIGEgcmVmZXJlbmNlIHRvIHRoZSBnbG9iYWwgb2JqZWN0LiAqL1xudmFyIHJvb3QgPSBmcmVlR2xvYmFsIHx8IGZyZWVTZWxmIHx8IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cbm1vZHVsZS5leHBvcnRzID0gcm9vdDtcbiIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vaXNPYmplY3QnKSxcbiAgICBub3cgPSByZXF1aXJlKCcuL25vdycpLFxuICAgIHRvTnVtYmVyID0gcmVxdWlyZSgnLi90b051bWJlcicpO1xuXG4vKiogRXJyb3IgbWVzc2FnZSBjb25zdGFudHMuICovXG52YXIgRlVOQ19FUlJPUl9URVhUID0gJ0V4cGVjdGVkIGEgZnVuY3Rpb24nO1xuXG4vKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyBmb3IgdGhvc2Ugd2l0aCB0aGUgc2FtZSBuYW1lIGFzIG90aGVyIGBsb2Rhc2hgIG1ldGhvZHMuICovXG52YXIgbmF0aXZlTWF4ID0gTWF0aC5tYXgsXG4gICAgbmF0aXZlTWluID0gTWF0aC5taW47XG5cbi8qKlxuICogQ3JlYXRlcyBhIGRlYm91bmNlZCBmdW5jdGlvbiB0aGF0IGRlbGF5cyBpbnZva2luZyBgZnVuY2AgdW50aWwgYWZ0ZXIgYHdhaXRgXG4gKiBtaWxsaXNlY29uZHMgaGF2ZSBlbGFwc2VkIHNpbmNlIHRoZSBsYXN0IHRpbWUgdGhlIGRlYm91bmNlZCBmdW5jdGlvbiB3YXNcbiAqIGludm9rZWQuIFRoZSBkZWJvdW5jZWQgZnVuY3Rpb24gY29tZXMgd2l0aCBhIGBjYW5jZWxgIG1ldGhvZCB0byBjYW5jZWxcbiAqIGRlbGF5ZWQgYGZ1bmNgIGludm9jYXRpb25zIGFuZCBhIGBmbHVzaGAgbWV0aG9kIHRvIGltbWVkaWF0ZWx5IGludm9rZSB0aGVtLlxuICogUHJvdmlkZSBgb3B0aW9uc2AgdG8gaW5kaWNhdGUgd2hldGhlciBgZnVuY2Agc2hvdWxkIGJlIGludm9rZWQgb24gdGhlXG4gKiBsZWFkaW5nIGFuZC9vciB0cmFpbGluZyBlZGdlIG9mIHRoZSBgd2FpdGAgdGltZW91dC4gVGhlIGBmdW5jYCBpcyBpbnZva2VkXG4gKiB3aXRoIHRoZSBsYXN0IGFyZ3VtZW50cyBwcm92aWRlZCB0byB0aGUgZGVib3VuY2VkIGZ1bmN0aW9uLiBTdWJzZXF1ZW50XG4gKiBjYWxscyB0byB0aGUgZGVib3VuY2VkIGZ1bmN0aW9uIHJldHVybiB0aGUgcmVzdWx0IG9mIHRoZSBsYXN0IGBmdW5jYFxuICogaW52b2NhdGlvbi5cbiAqXG4gKiAqKk5vdGU6KiogSWYgYGxlYWRpbmdgIGFuZCBgdHJhaWxpbmdgIG9wdGlvbnMgYXJlIGB0cnVlYCwgYGZ1bmNgIGlzXG4gKiBpbnZva2VkIG9uIHRoZSB0cmFpbGluZyBlZGdlIG9mIHRoZSB0aW1lb3V0IG9ubHkgaWYgdGhlIGRlYm91bmNlZCBmdW5jdGlvblxuICogaXMgaW52b2tlZCBtb3JlIHRoYW4gb25jZSBkdXJpbmcgdGhlIGB3YWl0YCB0aW1lb3V0LlxuICpcbiAqIElmIGB3YWl0YCBpcyBgMGAgYW5kIGBsZWFkaW5nYCBpcyBgZmFsc2VgLCBgZnVuY2AgaW52b2NhdGlvbiBpcyBkZWZlcnJlZFxuICogdW50aWwgdG8gdGhlIG5leHQgdGljaywgc2ltaWxhciB0byBgc2V0VGltZW91dGAgd2l0aCBhIHRpbWVvdXQgb2YgYDBgLlxuICpcbiAqIFNlZSBbRGF2aWQgQ29yYmFjaG8ncyBhcnRpY2xlXShodHRwczovL2Nzcy10cmlja3MuY29tL2RlYm91bmNpbmctdGhyb3R0bGluZy1leHBsYWluZWQtZXhhbXBsZXMvKVxuICogZm9yIGRldGFpbHMgb3ZlciB0aGUgZGlmZmVyZW5jZXMgYmV0d2VlbiBgXy5kZWJvdW5jZWAgYW5kIGBfLnRocm90dGxlYC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGRlYm91bmNlLlxuICogQHBhcmFtIHtudW1iZXJ9IFt3YWl0PTBdIFRoZSBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIHRvIGRlbGF5LlxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zPXt9XSBUaGUgb3B0aW9ucyBvYmplY3QuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLmxlYWRpbmc9ZmFsc2VdXG4gKiAgU3BlY2lmeSBpbnZva2luZyBvbiB0aGUgbGVhZGluZyBlZGdlIG9mIHRoZSB0aW1lb3V0LlxuICogQHBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLm1heFdhaXRdXG4gKiAgVGhlIG1heGltdW0gdGltZSBgZnVuY2AgaXMgYWxsb3dlZCB0byBiZSBkZWxheWVkIGJlZm9yZSBpdCdzIGludm9rZWQuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLnRyYWlsaW5nPXRydWVdXG4gKiAgU3BlY2lmeSBpbnZva2luZyBvbiB0aGUgdHJhaWxpbmcgZWRnZSBvZiB0aGUgdGltZW91dC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGRlYm91bmNlZCBmdW5jdGlvbi5cbiAqIEBleGFtcGxlXG4gKlxuICogLy8gQXZvaWQgY29zdGx5IGNhbGN1bGF0aW9ucyB3aGlsZSB0aGUgd2luZG93IHNpemUgaXMgaW4gZmx1eC5cbiAqIGpRdWVyeSh3aW5kb3cpLm9uKCdyZXNpemUnLCBfLmRlYm91bmNlKGNhbGN1bGF0ZUxheW91dCwgMTUwKSk7XG4gKlxuICogLy8gSW52b2tlIGBzZW5kTWFpbGAgd2hlbiBjbGlja2VkLCBkZWJvdW5jaW5nIHN1YnNlcXVlbnQgY2FsbHMuXG4gKiBqUXVlcnkoZWxlbWVudCkub24oJ2NsaWNrJywgXy5kZWJvdW5jZShzZW5kTWFpbCwgMzAwLCB7XG4gKiAgICdsZWFkaW5nJzogdHJ1ZSxcbiAqICAgJ3RyYWlsaW5nJzogZmFsc2VcbiAqIH0pKTtcbiAqXG4gKiAvLyBFbnN1cmUgYGJhdGNoTG9nYCBpcyBpbnZva2VkIG9uY2UgYWZ0ZXIgMSBzZWNvbmQgb2YgZGVib3VuY2VkIGNhbGxzLlxuICogdmFyIGRlYm91bmNlZCA9IF8uZGVib3VuY2UoYmF0Y2hMb2csIDI1MCwgeyAnbWF4V2FpdCc6IDEwMDAgfSk7XG4gKiB2YXIgc291cmNlID0gbmV3IEV2ZW50U291cmNlKCcvc3RyZWFtJyk7XG4gKiBqUXVlcnkoc291cmNlKS5vbignbWVzc2FnZScsIGRlYm91bmNlZCk7XG4gKlxuICogLy8gQ2FuY2VsIHRoZSB0cmFpbGluZyBkZWJvdW5jZWQgaW52b2NhdGlvbi5cbiAqIGpRdWVyeSh3aW5kb3cpLm9uKCdwb3BzdGF0ZScsIGRlYm91bmNlZC5jYW5jZWwpO1xuICovXG5mdW5jdGlvbiBkZWJvdW5jZShmdW5jLCB3YWl0LCBvcHRpb25zKSB7XG4gIHZhciBsYXN0QXJncyxcbiAgICAgIGxhc3RUaGlzLFxuICAgICAgbWF4V2FpdCxcbiAgICAgIHJlc3VsdCxcbiAgICAgIHRpbWVySWQsXG4gICAgICBsYXN0Q2FsbFRpbWUsXG4gICAgICBsYXN0SW52b2tlVGltZSA9IDAsXG4gICAgICBsZWFkaW5nID0gZmFsc2UsXG4gICAgICBtYXhpbmcgPSBmYWxzZSxcbiAgICAgIHRyYWlsaW5nID0gdHJ1ZTtcblxuICBpZiAodHlwZW9mIGZ1bmMgIT0gJ2Z1bmN0aW9uJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoRlVOQ19FUlJPUl9URVhUKTtcbiAgfVxuICB3YWl0ID0gdG9OdW1iZXIod2FpdCkgfHwgMDtcbiAgaWYgKGlzT2JqZWN0KG9wdGlvbnMpKSB7XG4gICAgbGVhZGluZyA9ICEhb3B0aW9ucy5sZWFkaW5nO1xuICAgIG1heGluZyA9ICdtYXhXYWl0JyBpbiBvcHRpb25zO1xuICAgIG1heFdhaXQgPSBtYXhpbmcgPyBuYXRpdmVNYXgodG9OdW1iZXIob3B0aW9ucy5tYXhXYWl0KSB8fCAwLCB3YWl0KSA6IG1heFdhaXQ7XG4gICAgdHJhaWxpbmcgPSAndHJhaWxpbmcnIGluIG9wdGlvbnMgPyAhIW9wdGlvbnMudHJhaWxpbmcgOiB0cmFpbGluZztcbiAgfVxuXG4gIGZ1bmN0aW9uIGludm9rZUZ1bmModGltZSkge1xuICAgIHZhciBhcmdzID0gbGFzdEFyZ3MsXG4gICAgICAgIHRoaXNBcmcgPSBsYXN0VGhpcztcblxuICAgIGxhc3RBcmdzID0gbGFzdFRoaXMgPSB1bmRlZmluZWQ7XG4gICAgbGFzdEludm9rZVRpbWUgPSB0aW1lO1xuICAgIHJlc3VsdCA9IGZ1bmMuYXBwbHkodGhpc0FyZywgYXJncyk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGxlYWRpbmdFZGdlKHRpbWUpIHtcbiAgICAvLyBSZXNldCBhbnkgYG1heFdhaXRgIHRpbWVyLlxuICAgIGxhc3RJbnZva2VUaW1lID0gdGltZTtcbiAgICAvLyBTdGFydCB0aGUgdGltZXIgZm9yIHRoZSB0cmFpbGluZyBlZGdlLlxuICAgIHRpbWVySWQgPSBzZXRUaW1lb3V0KHRpbWVyRXhwaXJlZCwgd2FpdCk7XG4gICAgLy8gSW52b2tlIHRoZSBsZWFkaW5nIGVkZ2UuXG4gICAgcmV0dXJuIGxlYWRpbmcgPyBpbnZva2VGdW5jKHRpbWUpIDogcmVzdWx0O1xuICB9XG5cbiAgZnVuY3Rpb24gcmVtYWluaW5nV2FpdCh0aW1lKSB7XG4gICAgdmFyIHRpbWVTaW5jZUxhc3RDYWxsID0gdGltZSAtIGxhc3RDYWxsVGltZSxcbiAgICAgICAgdGltZVNpbmNlTGFzdEludm9rZSA9IHRpbWUgLSBsYXN0SW52b2tlVGltZSxcbiAgICAgICAgcmVzdWx0ID0gd2FpdCAtIHRpbWVTaW5jZUxhc3RDYWxsO1xuXG4gICAgcmV0dXJuIG1heGluZyA/IG5hdGl2ZU1pbihyZXN1bHQsIG1heFdhaXQgLSB0aW1lU2luY2VMYXN0SW52b2tlKSA6IHJlc3VsdDtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNob3VsZEludm9rZSh0aW1lKSB7XG4gICAgdmFyIHRpbWVTaW5jZUxhc3RDYWxsID0gdGltZSAtIGxhc3RDYWxsVGltZSxcbiAgICAgICAgdGltZVNpbmNlTGFzdEludm9rZSA9IHRpbWUgLSBsYXN0SW52b2tlVGltZTtcblxuICAgIC8vIEVpdGhlciB0aGlzIGlzIHRoZSBmaXJzdCBjYWxsLCBhY3Rpdml0eSBoYXMgc3RvcHBlZCBhbmQgd2UncmUgYXQgdGhlXG4gICAgLy8gdHJhaWxpbmcgZWRnZSwgdGhlIHN5c3RlbSB0aW1lIGhhcyBnb25lIGJhY2t3YXJkcyBhbmQgd2UncmUgdHJlYXRpbmdcbiAgICAvLyBpdCBhcyB0aGUgdHJhaWxpbmcgZWRnZSwgb3Igd2UndmUgaGl0IHRoZSBgbWF4V2FpdGAgbGltaXQuXG4gICAgcmV0dXJuIChsYXN0Q2FsbFRpbWUgPT09IHVuZGVmaW5lZCB8fCAodGltZVNpbmNlTGFzdENhbGwgPj0gd2FpdCkgfHxcbiAgICAgICh0aW1lU2luY2VMYXN0Q2FsbCA8IDApIHx8IChtYXhpbmcgJiYgdGltZVNpbmNlTGFzdEludm9rZSA+PSBtYXhXYWl0KSk7XG4gIH1cblxuICBmdW5jdGlvbiB0aW1lckV4cGlyZWQoKSB7XG4gICAgdmFyIHRpbWUgPSBub3coKTtcbiAgICBpZiAoc2hvdWxkSW52b2tlKHRpbWUpKSB7XG4gICAgICByZXR1cm4gdHJhaWxpbmdFZGdlKHRpbWUpO1xuICAgIH1cbiAgICAvLyBSZXN0YXJ0IHRoZSB0aW1lci5cbiAgICB0aW1lcklkID0gc2V0VGltZW91dCh0aW1lckV4cGlyZWQsIHJlbWFpbmluZ1dhaXQodGltZSkpO1xuICB9XG5cbiAgZnVuY3Rpb24gdHJhaWxpbmdFZGdlKHRpbWUpIHtcbiAgICB0aW1lcklkID0gdW5kZWZpbmVkO1xuXG4gICAgLy8gT25seSBpbnZva2UgaWYgd2UgaGF2ZSBgbGFzdEFyZ3NgIHdoaWNoIG1lYW5zIGBmdW5jYCBoYXMgYmVlblxuICAgIC8vIGRlYm91bmNlZCBhdCBsZWFzdCBvbmNlLlxuICAgIGlmICh0cmFpbGluZyAmJiBsYXN0QXJncykge1xuICAgICAgcmV0dXJuIGludm9rZUZ1bmModGltZSk7XG4gICAgfVxuICAgIGxhc3RBcmdzID0gbGFzdFRoaXMgPSB1bmRlZmluZWQ7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNhbmNlbCgpIHtcbiAgICBpZiAodGltZXJJZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBjbGVhclRpbWVvdXQodGltZXJJZCk7XG4gICAgfVxuICAgIGxhc3RJbnZva2VUaW1lID0gMDtcbiAgICBsYXN0QXJncyA9IGxhc3RDYWxsVGltZSA9IGxhc3RUaGlzID0gdGltZXJJZCA9IHVuZGVmaW5lZDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZsdXNoKCkge1xuICAgIHJldHVybiB0aW1lcklkID09PSB1bmRlZmluZWQgPyByZXN1bHQgOiB0cmFpbGluZ0VkZ2Uobm93KCkpO1xuICB9XG5cbiAgZnVuY3Rpb24gZGVib3VuY2VkKCkge1xuICAgIHZhciB0aW1lID0gbm93KCksXG4gICAgICAgIGlzSW52b2tpbmcgPSBzaG91bGRJbnZva2UodGltZSk7XG5cbiAgICBsYXN0QXJncyA9IGFyZ3VtZW50cztcbiAgICBsYXN0VGhpcyA9IHRoaXM7XG4gICAgbGFzdENhbGxUaW1lID0gdGltZTtcblxuICAgIGlmIChpc0ludm9raW5nKSB7XG4gICAgICBpZiAodGltZXJJZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiBsZWFkaW5nRWRnZShsYXN0Q2FsbFRpbWUpO1xuICAgICAgfVxuICAgICAgaWYgKG1heGluZykge1xuICAgICAgICAvLyBIYW5kbGUgaW52b2NhdGlvbnMgaW4gYSB0aWdodCBsb29wLlxuICAgICAgICB0aW1lcklkID0gc2V0VGltZW91dCh0aW1lckV4cGlyZWQsIHdhaXQpO1xuICAgICAgICByZXR1cm4gaW52b2tlRnVuYyhsYXN0Q2FsbFRpbWUpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAodGltZXJJZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aW1lcklkID0gc2V0VGltZW91dCh0aW1lckV4cGlyZWQsIHdhaXQpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG4gIGRlYm91bmNlZC5jYW5jZWwgPSBjYW5jZWw7XG4gIGRlYm91bmNlZC5mbHVzaCA9IGZsdXNoO1xuICByZXR1cm4gZGVib3VuY2VkO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRlYm91bmNlO1xuIiwiLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyB0aGVcbiAqIFtsYW5ndWFnZSB0eXBlXShodHRwOi8vd3d3LmVjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtZWNtYXNjcmlwdC1sYW5ndWFnZS10eXBlcylcbiAqIG9mIGBPYmplY3RgLiAoZS5nLiBhcnJheXMsIGZ1bmN0aW9ucywgb2JqZWN0cywgcmVnZXhlcywgYG5ldyBOdW1iZXIoMClgLCBhbmQgYG5ldyBTdHJpbmcoJycpYClcbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBvYmplY3QsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdCh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoXy5ub29wKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KG51bGwpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3QodmFsdWUpIHtcbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsdWU7XG4gIHJldHVybiB2YWx1ZSAhPSBudWxsICYmICh0eXBlID09ICdvYmplY3QnIHx8IHR5cGUgPT0gJ2Z1bmN0aW9uJyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaXNPYmplY3Q7XG4iLCIvKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLiBBIHZhbHVlIGlzIG9iamVjdC1saWtlIGlmIGl0J3Mgbm90IGBudWxsYFxuICogYW5kIGhhcyBhIGB0eXBlb2ZgIHJlc3VsdCBvZiBcIm9iamVjdFwiLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKF8ubm9vcCk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKG51bGwpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3RMaWtlKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSAhPSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PSAnb2JqZWN0Jztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc09iamVjdExpa2U7XG4iLCJ2YXIgaXNPYmplY3RMaWtlID0gcmVxdWlyZSgnLi9pc09iamVjdExpa2UnKTtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIHN5bWJvbFRhZyA9ICdbb2JqZWN0IFN5bWJvbF0nO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGVcbiAqIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgb2JqZWN0VG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGEgYFN5bWJvbGAgcHJpbWl0aXZlIG9yIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHN5bWJvbCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzU3ltYm9sKFN5bWJvbC5pdGVyYXRvcik7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc1N5bWJvbCgnYWJjJyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1N5bWJvbCh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09ICdzeW1ib2wnIHx8XG4gICAgKGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgb2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT0gc3ltYm9sVGFnKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc1N5bWJvbDtcbiIsInZhciByb290ID0gcmVxdWlyZSgnLi9fcm9vdCcpO1xuXG4vKipcbiAqIEdldHMgdGhlIHRpbWVzdGFtcCBvZiB0aGUgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyB0aGF0IGhhdmUgZWxhcHNlZCBzaW5jZVxuICogdGhlIFVuaXggZXBvY2ggKDEgSmFudWFyeSAxOTcwIDAwOjAwOjAwIFVUQykuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAyLjQuMFxuICogQGNhdGVnb3J5IERhdGVcbiAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIHRpbWVzdGFtcC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5kZWZlcihmdW5jdGlvbihzdGFtcCkge1xuICogICBjb25zb2xlLmxvZyhfLm5vdygpIC0gc3RhbXApO1xuICogfSwgXy5ub3coKSk7XG4gKiAvLyA9PiBMb2dzIHRoZSBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIGl0IHRvb2sgZm9yIHRoZSBkZWZlcnJlZCBpbnZvY2F0aW9uLlxuICovXG52YXIgbm93ID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiByb290LkRhdGUubm93KCk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IG5vdztcbiIsInZhciBkZWJvdW5jZSA9IHJlcXVpcmUoJy4vZGVib3VuY2UnKSxcbiAgICBpc09iamVjdCA9IHJlcXVpcmUoJy4vaXNPYmplY3QnKTtcblxuLyoqIEVycm9yIG1lc3NhZ2UgY29uc3RhbnRzLiAqL1xudmFyIEZVTkNfRVJST1JfVEVYVCA9ICdFeHBlY3RlZCBhIGZ1bmN0aW9uJztcblxuLyoqXG4gKiBDcmVhdGVzIGEgdGhyb3R0bGVkIGZ1bmN0aW9uIHRoYXQgb25seSBpbnZva2VzIGBmdW5jYCBhdCBtb3N0IG9uY2UgcGVyXG4gKiBldmVyeSBgd2FpdGAgbWlsbGlzZWNvbmRzLiBUaGUgdGhyb3R0bGVkIGZ1bmN0aW9uIGNvbWVzIHdpdGggYSBgY2FuY2VsYFxuICogbWV0aG9kIHRvIGNhbmNlbCBkZWxheWVkIGBmdW5jYCBpbnZvY2F0aW9ucyBhbmQgYSBgZmx1c2hgIG1ldGhvZCB0b1xuICogaW1tZWRpYXRlbHkgaW52b2tlIHRoZW0uIFByb3ZpZGUgYG9wdGlvbnNgIHRvIGluZGljYXRlIHdoZXRoZXIgYGZ1bmNgXG4gKiBzaG91bGQgYmUgaW52b2tlZCBvbiB0aGUgbGVhZGluZyBhbmQvb3IgdHJhaWxpbmcgZWRnZSBvZiB0aGUgYHdhaXRgXG4gKiB0aW1lb3V0LiBUaGUgYGZ1bmNgIGlzIGludm9rZWQgd2l0aCB0aGUgbGFzdCBhcmd1bWVudHMgcHJvdmlkZWQgdG8gdGhlXG4gKiB0aHJvdHRsZWQgZnVuY3Rpb24uIFN1YnNlcXVlbnQgY2FsbHMgdG8gdGhlIHRocm90dGxlZCBmdW5jdGlvbiByZXR1cm4gdGhlXG4gKiByZXN1bHQgb2YgdGhlIGxhc3QgYGZ1bmNgIGludm9jYXRpb24uXG4gKlxuICogKipOb3RlOioqIElmIGBsZWFkaW5nYCBhbmQgYHRyYWlsaW5nYCBvcHRpb25zIGFyZSBgdHJ1ZWAsIGBmdW5jYCBpc1xuICogaW52b2tlZCBvbiB0aGUgdHJhaWxpbmcgZWRnZSBvZiB0aGUgdGltZW91dCBvbmx5IGlmIHRoZSB0aHJvdHRsZWQgZnVuY3Rpb25cbiAqIGlzIGludm9rZWQgbW9yZSB0aGFuIG9uY2UgZHVyaW5nIHRoZSBgd2FpdGAgdGltZW91dC5cbiAqXG4gKiBJZiBgd2FpdGAgaXMgYDBgIGFuZCBgbGVhZGluZ2AgaXMgYGZhbHNlYCwgYGZ1bmNgIGludm9jYXRpb24gaXMgZGVmZXJyZWRcbiAqIHVudGlsIHRvIHRoZSBuZXh0IHRpY2ssIHNpbWlsYXIgdG8gYHNldFRpbWVvdXRgIHdpdGggYSB0aW1lb3V0IG9mIGAwYC5cbiAqXG4gKiBTZWUgW0RhdmlkIENvcmJhY2hvJ3MgYXJ0aWNsZV0oaHR0cHM6Ly9jc3MtdHJpY2tzLmNvbS9kZWJvdW5jaW5nLXRocm90dGxpbmctZXhwbGFpbmVkLWV4YW1wbGVzLylcbiAqIGZvciBkZXRhaWxzIG92ZXIgdGhlIGRpZmZlcmVuY2VzIGJldHdlZW4gYF8udGhyb3R0bGVgIGFuZCBgXy5kZWJvdW5jZWAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdW5jIFRoZSBmdW5jdGlvbiB0byB0aHJvdHRsZS5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbd2FpdD0wXSBUaGUgbnVtYmVyIG9mIG1pbGxpc2Vjb25kcyB0byB0aHJvdHRsZSBpbnZvY2F0aW9ucyB0by5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbb3B0aW9ucz17fV0gVGhlIG9wdGlvbnMgb2JqZWN0LlxuICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5sZWFkaW5nPXRydWVdXG4gKiAgU3BlY2lmeSBpbnZva2luZyBvbiB0aGUgbGVhZGluZyBlZGdlIG9mIHRoZSB0aW1lb3V0LlxuICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy50cmFpbGluZz10cnVlXVxuICogIFNwZWNpZnkgaW52b2tpbmcgb24gdGhlIHRyYWlsaW5nIGVkZ2Ugb2YgdGhlIHRpbWVvdXQuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyB0aHJvdHRsZWQgZnVuY3Rpb24uXG4gKiBAZXhhbXBsZVxuICpcbiAqIC8vIEF2b2lkIGV4Y2Vzc2l2ZWx5IHVwZGF0aW5nIHRoZSBwb3NpdGlvbiB3aGlsZSBzY3JvbGxpbmcuXG4gKiBqUXVlcnkod2luZG93KS5vbignc2Nyb2xsJywgXy50aHJvdHRsZSh1cGRhdGVQb3NpdGlvbiwgMTAwKSk7XG4gKlxuICogLy8gSW52b2tlIGByZW5ld1Rva2VuYCB3aGVuIHRoZSBjbGljayBldmVudCBpcyBmaXJlZCwgYnV0IG5vdCBtb3JlIHRoYW4gb25jZSBldmVyeSA1IG1pbnV0ZXMuXG4gKiB2YXIgdGhyb3R0bGVkID0gXy50aHJvdHRsZShyZW5ld1Rva2VuLCAzMDAwMDAsIHsgJ3RyYWlsaW5nJzogZmFsc2UgfSk7XG4gKiBqUXVlcnkoZWxlbWVudCkub24oJ2NsaWNrJywgdGhyb3R0bGVkKTtcbiAqXG4gKiAvLyBDYW5jZWwgdGhlIHRyYWlsaW5nIHRocm90dGxlZCBpbnZvY2F0aW9uLlxuICogalF1ZXJ5KHdpbmRvdykub24oJ3BvcHN0YXRlJywgdGhyb3R0bGVkLmNhbmNlbCk7XG4gKi9cbmZ1bmN0aW9uIHRocm90dGxlKGZ1bmMsIHdhaXQsIG9wdGlvbnMpIHtcbiAgdmFyIGxlYWRpbmcgPSB0cnVlLFxuICAgICAgdHJhaWxpbmcgPSB0cnVlO1xuXG4gIGlmICh0eXBlb2YgZnVuYyAhPSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihGVU5DX0VSUk9SX1RFWFQpO1xuICB9XG4gIGlmIChpc09iamVjdChvcHRpb25zKSkge1xuICAgIGxlYWRpbmcgPSAnbGVhZGluZycgaW4gb3B0aW9ucyA/ICEhb3B0aW9ucy5sZWFkaW5nIDogbGVhZGluZztcbiAgICB0cmFpbGluZyA9ICd0cmFpbGluZycgaW4gb3B0aW9ucyA/ICEhb3B0aW9ucy50cmFpbGluZyA6IHRyYWlsaW5nO1xuICB9XG4gIHJldHVybiBkZWJvdW5jZShmdW5jLCB3YWl0LCB7XG4gICAgJ2xlYWRpbmcnOiBsZWFkaW5nLFxuICAgICdtYXhXYWl0Jzogd2FpdCxcbiAgICAndHJhaWxpbmcnOiB0cmFpbGluZ1xuICB9KTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB0aHJvdHRsZTtcbiIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vaXNPYmplY3QnKSxcbiAgICBpc1N5bWJvbCA9IHJlcXVpcmUoJy4vaXNTeW1ib2wnKTtcblxuLyoqIFVzZWQgYXMgcmVmZXJlbmNlcyBmb3IgdmFyaW91cyBgTnVtYmVyYCBjb25zdGFudHMuICovXG52YXIgTkFOID0gMCAvIDA7XG5cbi8qKiBVc2VkIHRvIG1hdGNoIGxlYWRpbmcgYW5kIHRyYWlsaW5nIHdoaXRlc3BhY2UuICovXG52YXIgcmVUcmltID0gL15cXHMrfFxccyskL2c7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBiYWQgc2lnbmVkIGhleGFkZWNpbWFsIHN0cmluZyB2YWx1ZXMuICovXG52YXIgcmVJc0JhZEhleCA9IC9eWy0rXTB4WzAtOWEtZl0rJC9pO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgYmluYXJ5IHN0cmluZyB2YWx1ZXMuICovXG52YXIgcmVJc0JpbmFyeSA9IC9eMGJbMDFdKyQvaTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IG9jdGFsIHN0cmluZyB2YWx1ZXMuICovXG52YXIgcmVJc09jdGFsID0gL14wb1swLTddKyQvaTtcblxuLyoqIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIHdpdGhvdXQgYSBkZXBlbmRlbmN5IG9uIGByb290YC4gKi9cbnZhciBmcmVlUGFyc2VJbnQgPSBwYXJzZUludDtcblxuLyoqXG4gKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGEgbnVtYmVyLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBwcm9jZXNzLlxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgbnVtYmVyLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLnRvTnVtYmVyKDMuMik7XG4gKiAvLyA9PiAzLjJcbiAqXG4gKiBfLnRvTnVtYmVyKE51bWJlci5NSU5fVkFMVUUpO1xuICogLy8gPT4gNWUtMzI0XG4gKlxuICogXy50b051bWJlcihJbmZpbml0eSk7XG4gKiAvLyA9PiBJbmZpbml0eVxuICpcbiAqIF8udG9OdW1iZXIoJzMuMicpO1xuICogLy8gPT4gMy4yXG4gKi9cbmZ1bmN0aW9uIHRvTnVtYmVyKHZhbHVlKSB7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT0gJ251bWJlcicpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbiAgaWYgKGlzU3ltYm9sKHZhbHVlKSkge1xuICAgIHJldHVybiBOQU47XG4gIH1cbiAgaWYgKGlzT2JqZWN0KHZhbHVlKSkge1xuICAgIHZhciBvdGhlciA9IHR5cGVvZiB2YWx1ZS52YWx1ZU9mID09ICdmdW5jdGlvbicgPyB2YWx1ZS52YWx1ZU9mKCkgOiB2YWx1ZTtcbiAgICB2YWx1ZSA9IGlzT2JqZWN0KG90aGVyKSA/IChvdGhlciArICcnKSA6IG90aGVyO1xuICB9XG4gIGlmICh0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gdmFsdWUgPT09IDAgPyB2YWx1ZSA6ICt2YWx1ZTtcbiAgfVxuICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UocmVUcmltLCAnJyk7XG4gIHZhciBpc0JpbmFyeSA9IHJlSXNCaW5hcnkudGVzdCh2YWx1ZSk7XG4gIHJldHVybiAoaXNCaW5hcnkgfHwgcmVJc09jdGFsLnRlc3QodmFsdWUpKVxuICAgID8gZnJlZVBhcnNlSW50KHZhbHVlLnNsaWNlKDIpLCBpc0JpbmFyeSA/IDIgOiA4KVxuICAgIDogKHJlSXNCYWRIZXgudGVzdCh2YWx1ZSkgPyBOQU4gOiArdmFsdWUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHRvTnVtYmVyO1xuIiwiLyogUkVEVUNFUiAqL1xuXG5leHBvcnQgZGVmYXVsdCAoc3RhdGUgPSB7fSwgeyB0eXBlLCB0YWcsIGluaXRpYWwsIG5BbHRzIH0pID0+IHtcbiAgc3dpdGNoICh0eXBlKSB7XG4gICAgY2FzZSAnbmV4dEFsdCc6IHtcbiAgICAgIGNvbnN0IHsgW3RhZ106IG9sZEFsdCA9IChpbml0aWFsIHx8IDApIH0gPSBzdGF0ZVxuICAgICAgY29uc3QgbmV3QWx0ID0gKG9sZEFsdCArIDEpICUgbkFsdHNcbiAgICAgIHJldHVybiB7IC4uLnN0YXRlLCBbdGFnXTogbmV3QWx0IH1cbiAgICB9XG4gICAgZGVmYXVsdDogcmV0dXJuIHN0YXRlXG4gIH1cbn1cblxuLyogU0VMRUNUT1JTICovXG5cbmV4cG9ydCBjb25zdCBnZXRBbHQgPSAoeyBhbHRlciB9LCB7IHRhZywgaW5pdGlhbCB9KSA9PiB7XG4gIGNvbnN0IHsgW3RhZ106IGFsdCA9IGluaXRpYWwgfHwgMCB9ID0gYWx0ZXJcbiAgcmV0dXJuIHsgYWx0IH1cbn1cblxuLyogQUNUSU9OUyAqL1xuLypcbiAqIEFjdGlvbnMgYXJlIGRpc3BhdGNoIGluIHRoZSBwcm9jZXNzIG9mIGZldGNoaW5nIGRhdGEgZnJvbSB0aGUgc2VydmVyXG4gKi9cblxuZXhwb3J0IGNvbnN0IG5leHRBbHQgPSAodGFnLCBuQWx0cywgaW5pdGlhbCkgPT4gKHsgdHlwZTogJ25leHRBbHQnLCB0YWcsIG5BbHRzLCBpbml0aWFsIH0pXG5cbi8qIEhFTFBFUlMgKi9cblxuXG4iLCIvKiBSRURVQ0VSICovXG5cbmV4cG9ydCBkZWZhdWx0IChzdGF0ZSA9IHt9LCB7IHR5cGUsIHBhdGgsIGRhdGEgfSkgPT4ge1xuICBzd2l0Y2ggKHR5cGUpIHtcbiAgICBjYXNlICdmZXRjaERvYyc6IHtcbiAgICAgIGlmIChkYXRhID09IG51bGwpIHtyZXR1cm4geyAuLi5zdGF0ZSwgW3BhdGhdOiBudWxsIH19XG4gICAgICByZXR1cm4geyAuLi5zdGF0ZSwgW3BhdGhdOiBkYXRhIH1cbiAgICB9XG4gICAgZGVmYXVsdDogcmV0dXJuIHN0YXRlXG4gIH1cbn1cblxuLyogU0VMRUNUT1JTICovXG5cbmV4cG9ydCBjb25zdCBnZXREb2MgPSAoeyBkb2MgfSwgeyBkb2NEaXIsIGRvY05hbWUsIGRvY0V4dCB9KSA9PiB7XG4gIHJldHVybiB7IGRhdGE6IGRvY1tgJHtkb2NEaXJ9LyR7ZG9jTmFtZX0uJHtkb2NFeHR9YF0gfVxufVxuXG4vKiBBQ1RJT05TICovXG4vKlxuICogQWN0aW9ucyBhcmUgZGlzcGF0Y2ggaW4gdGhlIHByb2Nlc3Mgb2YgZmV0Y2hpbmcgZGF0YSBmcm9tIHRoZSBzZXJ2ZXJcbiAqL1xuXG4vKiBIRUxQRVJTICovXG5cbiIsImltcG9ydCBtZW1vQmluZCBmcm9tICdtZW1vQmluZC5qcydcblxuLyogUkVEVUNFUiAqL1xuXG5leHBvcnQgZGVmYXVsdCAoc3RhdGU9e1xuICBmaWx0ZXJTZXR0aW5nczoge30sXG4gIGluaXRpYWxpemVkOiBmYWxzZSxcbn0sIHsgdHlwZSwgZmlsdGVySWQsIGRhdGEsIC4uLnJlc3QgfSkgPT4ge1xuICBzd2l0Y2ggKHR5cGUpIHtcbiAgICBjYXNlICdzZXR1cEZpbHRlcmluZyc6IHtcbiAgICAgIHJldHVybiB7IC4uLnN0YXRlLCAuLi5yZXN0LCBpbml0aWFsaXplZDogdHJ1ZSB9XG4gICAgfVxuICAgIGNhc2UgJ2Z1bGx0ZXh0Jzoge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIGZpbHRlclNldHRpbmdzOiB7XG4gICAgICAgICAgLi4uc3RhdGUuZmlsdGVyU2V0dGluZ3MsXG4gICAgICAgICAgW2ZpbHRlcklkXTogZGF0YSxcbiAgICAgICAgfSxcbiAgICAgIH1cbiAgICB9XG4gICAgY2FzZSAnZmFjZXRBbGwnOiB7XG4gICAgICBjb25zdCBzYW1lU2V0dGluZ3MgPSB7fVxuICAgICAgT2JqZWN0LmtleXMoc3RhdGUuZmlsdGVyU2V0dGluZ3NbZmlsdGVySWRdKS5mb3JFYWNoKHZhbHVlSWQgPT4ge3NhbWVTZXR0aW5nc1t2YWx1ZUlkXSA9IGRhdGF9KVxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIGZpbHRlclNldHRpbmdzOiB7XG4gICAgICAgICAgLi4uc3RhdGUuZmlsdGVyU2V0dGluZ3MsXG4gICAgICAgICAgW2ZpbHRlcklkXTogc2FtZVNldHRpbmdzLFxuICAgICAgICB9LFxuICAgICAgfVxuICAgIH1cbiAgICBjYXNlICdmYWNldCc6IHtcbiAgICAgIGNvbnN0IFt2YWx1ZUlkLCBmaWx0ZXJTZXR0aW5nXSA9IGRhdGFcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBmaWx0ZXJTZXR0aW5nczoge1xuICAgICAgICAgIC4uLnN0YXRlLmZpbHRlclNldHRpbmdzLFxuICAgICAgICAgIFtmaWx0ZXJJZF06IHtcbiAgICAgICAgICAgIC4uLnN0YXRlLmZpbHRlclNldHRpbmdzW2ZpbHRlcklkXSxcbiAgICAgICAgICAgIFt2YWx1ZUlkXTogZmlsdGVyU2V0dGluZyxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfVxuICAgIH1cbiAgICBkZWZhdWx0OiByZXR1cm4gc3RhdGVcbiAgfVxufVxuXG4vKiBTRUxFQ1RPUlMgKi9cblxuZXhwb3J0IGNvbnN0IGdldEZpbHRlclNldHRpbmcgPSAoeyBmaWx0ZXI6IHsgZmlsdGVyU2V0dGluZ3MgfSB9LCB7IGZpbHRlcklkIH0pID0+ICh7XG4gIGZpbHRlclNldHRpbmc6IGZpbHRlclNldHRpbmdzW2ZpbHRlcklkXSxcbn0pXG5cbmV4cG9ydCBjb25zdCBnZXRGaWVsZFZhbHVlcyA9ICh7IHRhYmxlcyB9LCB7IHRhYmxlLCBmaWx0ZXJGaWVsZCB9KSA9PiAoe1xuICBmaWVsZFZhbHVlczogbWVtb0JpbmQoZkNDLCAnY29tcGlsZUZpbHRlcmluZycsIFt0YWJsZV0sIFt0YWJsZXNdKVtmaWx0ZXJGaWVsZF1cbn0pXG5cbmV4cG9ydCBjb25zdCBnZXRGaWx0ZXJBcHBsaWVkID0gKHsgdGFibGVzLCBmaWx0ZXI6IHsgZmlsdGVyU2V0dGluZ3MsIGluaXRpYWxpemVkIH0gfSwgeyB0YWJsZSB9KSA9PiB7XG4gIGNvbnN0IGZpZWxkVmFsdWVzID0gbWVtb0JpbmQoZkNDLCAnY29tcGlsZUZpbHRlcmluZycsIFt0YWJsZV0sIFt0YWJsZXNdKVxuICBpZiAoaW5pdGlhbGl6ZWQpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdGFibGVzLFxuICAgICAgaW5pdGlhbGl6ZWQsXG4gICAgICBmaWVsZFZhbHVlcyxcbiAgICAgIGZpbHRlclNldHRpbmdzLFxuICAgICAgLi4uY29tcHV0ZUZpbHRlcmluZyh0YWJsZSwgdGFibGVzLCBmaWVsZFZhbHVlcywgZmlsdGVyU2V0dGluZ3MpLFxuICAgIH1cbiAgfVxuICBlbHNlIHtcbiAgICByZXR1cm4ge1xuICAgICAgdGFibGVzLFxuICAgICAgaW5pdGlhbGl6ZWQsXG4gICAgICBmaWVsZFZhbHVlcyxcbiAgICB9XG4gIH1cbn1cblxuLyogQUNUSU9OUyAqL1xuXG5leHBvcnQgY29uc3QgY2hhbmdlRnVsbHRleHQgPSAoZmlsdGVySWQsIHNlYXJjaFN0cmluZykgPT4gKHsgdHlwZTogJ2Z1bGx0ZXh0JywgZmlsdGVySWQsIGRhdGE6IHNlYXJjaFN0cmluZyB9KVxuZXhwb3J0IGNvbnN0IGNoYW5nZUZhY2V0ID0gKGZpbHRlcklkLCB2YWx1ZUlkLCBvbk9mZikgPT4gKHsgdHlwZTogJ2ZhY2V0JywgZmlsdGVySWQsIGRhdGE6IFt2YWx1ZUlkLCBvbk9mZl0gfSlcbmV4cG9ydCBjb25zdCBjaGFuZ2VGYWNldEFsbCA9IChmaWx0ZXJJZCwgb25PZmYpID0+ICh7IHR5cGU6ICdmYWNldEFsbCcsIGZpbHRlcklkLCBkYXRhOiBvbk9mZiB9KVxuXG5leHBvcnQgY29uc3Qgc2V0dXBGaWx0ZXJpbmcgPSAodGFibGUsIHRhYmxlcykgPT4gZGlzcGF0Y2ggPT4ge1xuICBjb25zdCBmaWVsZFZhbHVlcyA9IG1lbW9CaW5kKGZDQywgJ2NvbXBpbGVGaWx0ZXJpbmcnLCBbdGFibGVdLCBbdGFibGVzXSlcbiAgY29uc3QgZmlsdGVyU2V0dGluZ3MgPSBtZW1vQmluZChmQ0MsICdpbml0RmlsdGVyaW5nJywgW3RhYmxlXSwgW3RhYmxlcywgZmllbGRWYWx1ZXNdKVxuICBkaXNwYXRjaCh7IHR5cGU6ICdzZXR1cEZpbHRlcmluZycsIGZpbHRlclNldHRpbmdzIH0pXG59XG5cbi8qIEhFTFBFUlMgKi9cblxuY2xhc3MgRmlsdGVyQ29tcGlsZUNhY2hlIHtcbiAgY29tcGlsZUZpbHRlcmluZyA9ICh0YWJsZSwgdGFibGVzKSA9PiB7XG4gICAgY29uc3QgeyBbdGFibGVdOiB7IGVudGl0aWVzLCBvcmRlciwgZmllbGRzLCBmaWx0ZXJMaXN0IH0gfSA9IHRhYmxlc1xuICAgIGNvbnN0IHByZXNlbnRGaWx0ZXJMaXN0ID0gZmlsdGVyTGlzdC5maWx0ZXIoeCA9PiBmaWVsZHNbeC5maWVsZF0pXG4gICAgY29uc3QgZmlsdGVyRmllbGRzID0gcHJlc2VudEZpbHRlckxpc3QuZmlsdGVyKHggPT4geC50eXBlICE9PSAnRnVsbFRleHQnKS5tYXAoeCA9PiB4LmZpZWxkKVxuICAgIGNvbnN0IGZpZWxkVmFsdWVzID0ge31cbiAgICBmb3IgKGNvbnN0IGYgb2YgZmlsdGVyRmllbGRzKSB7XG4gICAgICBmaWVsZFZhbHVlc1tmXSA9IHtbJyddOiAnLW5vbmUtJ31cbiAgICB9XG4gICAgZm9yIChjb25zdCBlSWQgb2Ygb3JkZXIpIHtcbiAgICAgIGNvbnN0IGVudGl0eSA9IGVudGl0aWVzW2VJZF1cbiAgICAgIGZvciAoY29uc3QgZmllbGQgb2YgZmlsdGVyRmllbGRzKSB7XG4gICAgICAgIGNvbnN0IGZGaWVsZFZhbHVlcyA9IGZpZWxkVmFsdWVzW2ZpZWxkXVxuICAgICAgICBjb25zdCB7IHZhbHVlczogeyBbZmllbGRdOiBlZlZhbHVlIH0gfSA9IGVudGl0eVxuICAgICAgICBpZiAoZWZWYWx1ZSAhPSBudWxsICYmIGVmVmFsdWUubGVuZ3RoICE9PSAwKSB7XG4gICAgICAgICAgZm9yIChjb25zdCB7X2lkOiB2YWx1ZUlkLCB2YWx1ZTogdmFsdWVSZXB9IG9mIGVmVmFsdWUpIHtcbiAgICAgICAgICAgIGZGaWVsZFZhbHVlc1t2YWx1ZUlkXSA9IHZhbHVlUmVwXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmaWVsZFZhbHVlc1xuICB9XG4gIGluaXRGaWx0ZXJpbmcgPSAodGFibGUsIHRhYmxlcywgZmllbGRWYWx1ZXMpID0+IHtcbiAgICBjb25zdCB7IFt0YWJsZV06IHsgZW50aXRpZXMsIG9yZGVyLCBmaWVsZHMsIGZpbHRlckxpc3QgfSB9ID0gdGFibGVzXG4gICAgY29uc3QgcHJlc2VudEZpbHRlckxpc3QgPSBmaWx0ZXJMaXN0LmZpbHRlcih4ID0+IGZpZWxkc1t4LmZpZWxkXSlcbiAgICBjb25zdCBmaWx0ZXJTZXR0aW5ncyA9IHt9XG4gICAgcHJlc2VudEZpbHRlckxpc3QuZm9yRWFjaCgoZmlsdGVyU3BlYywgZmlsdGVySWQpID0+IHtcbiAgICAgIGlmIChmaWx0ZXJTcGVjLnR5cGUgPT0gJ0Z1bGxUZXh0Jykge1xuICAgICAgICBmaWx0ZXJTZXR0aW5nc1tmaWx0ZXJJZF0gPSAnJ1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGNvbnN0IGZhY2V0cyA9IHt9XG4gICAgICAgIE9iamVjdC5rZXlzKGZpZWxkVmFsdWVzW2ZpbHRlclNwZWMuZmllbGRdKS5mb3JFYWNoKHZhbHVlSWQgPT4ge2ZhY2V0c1t2YWx1ZUlkXSA9IHRydWV9KVxuICAgICAgICBmaWx0ZXJTZXR0aW5nc1tmaWx0ZXJJZF0gPSBmYWNldHNcbiAgICAgIH1cbiAgICB9KVxuICAgIHJldHVybiBmaWx0ZXJTZXR0aW5nc1xuICB9XG59XG5jb25zdCBmQ0MgPSBuZXcgRmlsdGVyQ29tcGlsZUNhY2hlKClcblxuY29uc3QgY29tcHV0ZUZpbHRlcmluZyA9ICh0YWJsZSwgdGFibGVzLCBmaWVsZFZhbHVlcywgZmlsdGVyU2V0dGluZ3MpID0+IHtcbiAgY29uc3QgeyBbdGFibGVdOiB7IGVudGl0aWVzLCBvcmRlciwgZmllbGRzLCBmaWx0ZXJMaXN0IH0gfSA9IHRhYmxlc1xuICBjb25zdCBwcmVzZW50RmlsdGVyTGlzdCA9IGZpbHRlckxpc3QuZmlsdGVyKHggPT4gZmllbGRzW3guZmllbGRdKVxuICBjb25zdCBmaWx0ZXJDaGVja3MgPSB7fVxuICBjb25zdCBvdGhlckZpbHRlcmVkRGF0YSA9IHt9XG4gIHByZXNlbnRGaWx0ZXJMaXN0LmZvckVhY2goKGZpbHRlclNwZWMsIGZpbHRlcklkKSA9PiB7XG4gICAgZmlsdGVyQ2hlY2tzW2ZpbHRlcklkXSA9IChmaWx0ZXJTcGVjLnR5cGUgPT09ICdGdWxsVGV4dCcgPyBmdWxsdGV4dENoZWNrIDogZmFjZXRDaGVjaykoZmlsdGVyU3BlYy5maWVsZCwgZmlsdGVyU2V0dGluZ3NbZmlsdGVySWRdKVxuICAgIG90aGVyRmlsdGVyZWREYXRhW2ZpbHRlcklkXSA9IFtdXG4gIH0pXG4gIGNvbnN0IGZpbHRlcmVkRGF0YSA9IFtdXG5cbiAgZm9yIChjb25zdCBlSWQgb2Ygb3JkZXIpIHtcbiAgICBjb25zdCBlbnRpdHkgPSBlbnRpdGllc1tlSWRdXG4gICAgbGV0IHRoZU9uZUZhaWwgPSBudWxsXG4gICAgbGV0IHYgPSB0cnVlXG4gICAgbGV0IGRpc2NhcmQgPSBmYWxzZVxuICAgIE9iamVjdC5lbnRyaWVzKGZpbHRlckNoZWNrcykuZm9yRWFjaCgoW2ZpbHRlcklkLCBmaWx0ZXJDaGVja10pID0+IHtcbiAgICAgIGlmICghZGlzY2FyZCkge1xuICAgICAgICBjb25zdCBwYXNzID0gZmlsdGVyQ2hlY2soZW50aXR5KVxuICAgICAgICBpZiAoIXBhc3MpIHtcbiAgICAgICAgICB2ID0gZmFsc2VcbiAgICAgICAgICBpZiAodGhlT25lRmFpbCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgdGhlT25lRmFpbCA9IGZpbHRlcklkXG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZGlzY2FyZCA9IHRydWVcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KVxuICAgIGlmICghZGlzY2FyZCkge1xuICAgICAgY29uc3QgeyB2YWx1ZXM6IHsgX2lkIH0gfSA9IGVudGl0eVxuICAgICAgaWYgKHYpIHtcbiAgICAgICAgZmlsdGVyZWREYXRhLnB1c2goX2lkKVxuICAgICAgICBwcmVzZW50RmlsdGVyTGlzdC5mb3JFYWNoKChmaWx0ZXJTcGVjLCBmaWx0ZXJJZCkgPT4ge1xuICAgICAgICAgIG90aGVyRmlsdGVyZWREYXRhW2ZpbHRlcklkXS5wdXNoKF9pZClcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBvdGhlckZpbHRlcmVkRGF0YVt0aGVPbmVGYWlsXS5wdXNoKF9pZClcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgY29uc3QgYW1vdW50cyA9IHt9XG4gIHByZXNlbnRGaWx0ZXJMaXN0LmZvckVhY2goKHsgZmllbGQsIHR5cGUgfSwgZmlsdGVySWQpID0+IHtcbiAgICBhbW91bnRzW2ZpbHRlcklkXSA9IHR5cGUgPT09ICdGdWxsVGV4dCcgPyBudWxsIDogY291bnRGYWNldHMoZmllbGQsIGZpZWxkVmFsdWVzW2ZpZWxkXSwgb3RoZXJGaWx0ZXJlZERhdGFbZmlsdGVySWRdLCBlbnRpdGllcylcbiAgfSlcbiAgY29uc3QgZmlsdGVyZWRBbW91bnRPdGhlcnMgPSB7fVxuICBPYmplY3QuZW50cmllcyhvdGhlckZpbHRlcmVkRGF0YSkuZm9yRWFjaCgoW2ZpbHRlcklkLCB4XSkgPT4ge2ZpbHRlcmVkQW1vdW50T3RoZXJzW2ZpbHRlcklkXSA9IHgubGVuZ3RofSlcbiAgcmV0dXJuIHtcbiAgICBmaWx0ZXJlZERhdGEsXG4gICAgZmlsdGVyZWRBbW91bnRPdGhlcnMsXG4gICAgYW1vdW50cyxcbiAgfVxufVxuXG5jb25zdCBmdWxsdGV4dENoZWNrID0gKGZpZWxkLCB0ZXJtKSA9PiB7XG4gIGNvbnN0IHNlYXJjaCA9IHRlcm0udG9Mb3dlckNhc2UoKVxuICBpZiAoc2VhcmNoID09IG51bGwgfHwgc2VhcmNoID09ICcnKSB7XG4gICAgcmV0dXJuICgpID0+IHRydWVcbiAgfVxuICByZXR1cm4gZW50aXR5ID0+IHtcbiAgICBsZXQgeyB2YWx1ZXM6IHsgW2ZpZWxkXTogdmFsIH0gfSA9IGVudGl0eVxuICAgIHZhbCA9ICh2YWwgIT0gbnVsbCkgPyB2YWxbMF0gOiB2YWxcbiAgICByZXR1cm4gdmFsICE9IG51bGwgJiYgdmFsLnRvTG93ZXJDYXNlKCkuaW5kZXhPZihzZWFyY2gpICE9PSAtMVxuICB9XG59XG5cbmNvbnN0IGZhY2V0Q2hlY2sgPSAoZmllbGQsIGZhY2V0U2V0dGluZ3MpID0+IHtcbiAgaWYgKGZhY2V0U2V0dGluZ3Muc2l6ZSA9PT0gMCkge1xuICAgIHJldHVybiAoKSA9PiBmYWxzZVxuICB9XG4gIHJldHVybiBlbnRpdHkgPT4ge1xuICAgIGNvbnN0IHsgdmFsdWVzOiB7IFtmaWVsZF06IGZpZWxkVmFscyB9IH0gPSBlbnRpdHlcbiAgICBpZiAoZmllbGRWYWxzID09IG51bGwgfHwgZmllbGRWYWxzLmxlbmd0aCA9PSAwKSB7XG4gICAgICByZXR1cm4gZmFjZXRTZXR0aW5nc1snJ11cbiAgICB9XG4gICAgZm9yIChjb25zdCB7X2lkOiB2YWx1ZUlkfSBvZiBmaWVsZFZhbHMpIHtcbiAgICAgIGlmIChmYWNldFNldHRpbmdzW3ZhbHVlSWRdKSB7XG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZVxuICB9XG59XG5cbmNvbnN0IGNvdW50RmFjZXRzID0gKGZpZWxkLCBmaWVsZFZhbHVlcywgZmlsdGVyZWREYXRhLCBlbnRpdGllcykgPT4ge1xuICBjb25zdCBmYWNldEFtb3VudHMgPSB7fVxuICBPYmplY3Qua2V5cyhmaWVsZFZhbHVlcykuZm9yRWFjaCh2YWx1ZUlkID0+IHtcbiAgICBmYWNldEFtb3VudHNbdmFsdWVJZF0gPSAwXG4gIH0pXG4gIGZvciAoY29uc3QgZUlkIG9mIGZpbHRlcmVkRGF0YSkge1xuICAgIGNvbnN0IHsgdmFsdWVzOiB7IFtmaWVsZF06IGZpZWxkVmFscyB9IH0gPSBlbnRpdGllc1tlSWRdXG4gICAgaWYgKGZpZWxkVmFscyA9PSBudWxsIHx8IGZpZWxkVmFscy5sZW5ndGggPT0gMCkge1xuICAgICAgZmFjZXRBbW91bnRzWycnXSArPSAxXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgZm9yIChjb25zdCB7X2lkOiB2YWx1ZUlkfSBvZiBmaWVsZFZhbHMpIHtcbiAgICAgICAgZmFjZXRBbW91bnRzW3ZhbHVlSWRdICs9IDFcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhY2V0QW1vdW50c1xufVxuXG5leHBvcnQgY29uc3QgcGxhY2VGYWNldHMgPSAoZmllbGRWYWx1ZXMsIG1heENvbHMpID0+IHtcbiAgaWYgKGZpZWxkVmFsdWVzID09IG51bGwpIHtyZXR1cm4gW119XG4gIGNvbnN0IGZhY2V0cyA9IE9iamVjdC5lbnRyaWVzKGZpZWxkVmFsdWVzKS5zb3J0KCh4LCB5KSA9PiB4WzFdLmxvY2FsZUNvbXBhcmUoeVsxXSkpXG4gIGlmIChmYWNldHMubGVuZ3RoID09IDApIHtyZXR1cm4gW119XG4gIGNvbnN0IHJvd3MgPSBbXVxuICBjb25zdCB7IGxlbmd0aDogbGYgfSA9IGZhY2V0c1xuICBjb25zdCBucm93cyA9IE1hdGguZmxvb3IobGYgLyBtYXhDb2xzKSArICgobGYgJSBtYXhDb2xzKSA/IDEgOiAwKVxuICBjb25zdCBuY29scyA9IE1hdGguZmxvb3IobGYgLyBucm93cykgKyAoKGxmICUgbnJvd3MpID8gMSA6IDApXG4gIGZvciAobGV0IHIgPSAwOyByIDwgbnJvd3M7IHIrKykge1xuICAgIGNvbnN0IHJvdyA9IFtdXG4gICAgZm9yIChsZXQgYyA9IDA7IGMgPCBuY29sczsgYysrKSB7XG4gICAgICBjb25zdCBmID0gbnJvd3MgKiBjICsgclxuICAgICAgcm93LnB1c2goKGYgPCBsZikgPyBmYWNldHNbZl0gOiBudWxsKVxuICAgIH1cbiAgICByb3dzLnB1c2gocm93KVxuICB9XG4gIHJldHVybiByb3dzXG59XG5cbmV4cG9ydCBjb25zdCB0ZXN0QWxsQ2hlY2tzID0gZmlsdGVyU2V0dGluZ3MgPT4ge1xuICBsZXQgYWxsVHJ1ZSA9IHRydWVcbiAgbGV0IGFsbEZhbHNlID0gdHJ1ZVxuICBmb3IgKGNvbnN0IFt2YWx1ZUlkLCB2YWx1ZVJlcF0gb2YgT2JqZWN0LmVudHJpZXMoZmlsdGVyU2V0dGluZ3MpKSB7XG4gICAgaWYgKHZhbHVlUmVwKSB7YWxsRmFsc2UgPSBmYWxzZX1cbiAgICBlbHNlIHthbGxUcnVlID0gZmFsc2V9XG4gIH1cbiAgcmV0dXJuIHsgYWxsVHJ1ZSwgYWxsRmFsc2UgfVxufVxuXG4iLCIvKiBSRURVQ0VSICovXG5cbmV4cG9ydCBkZWZhdWx0IChzdGF0ZSA9IHt9LCB7IHR5cGUsIHBhdGgsIGRhdGEgfSkgPT4ge1xuICBzd2l0Y2ggKHR5cGUpIHtcbiAgICBjYXNlICdmZXRjaE1lJzoge1xuICAgICAgaWYgKGRhdGEgPT0gbnVsbCkge3JldHVybiB7fX1cbiAgICAgIHJldHVybiB7IC4uLmRhdGEgfVxuICAgIH1cbiAgICBkZWZhdWx0OiByZXR1cm4gc3RhdGVcbiAgfVxufVxuXG4vKiBTRUxFQ1RPUlMgKi9cblxuZXhwb3J0IGNvbnN0IGdldE1lID0gKHsgbWUgfSkgPT4gKHsgbWUgfSlcblxuLyogQUNUSU9OUyAqL1xuLypcbiAqIEFjdGlvbnMgYXJlIGRpc3BhdGNoIGluIHRoZSBwcm9jZXNzIG9mIGZldGNoaW5nIGRhdGEgZnJvbSB0aGUgc2VydmVyXG4gKi9cblxuLyogSEVMUEVSUyAqL1xuXG4iLCIvKiBSRURVQ0VSICovXG5cbmV4cG9ydCBkZWZhdWx0IChzdGF0ZSA9IHt9LCB7IHR5cGUsIGRlc2MsIHN0YXR1cywgbXNncyB9KSA9PiB7XG4gIHN3aXRjaCAodHlwZSkge1xuICAgIGNhc2UgJ25vdGlmeSc6IHtcbiAgICAgIHN3aXRjaCAoc3RhdHVzKSB7XG4gICAgICAgIGNhc2UgJ3BlbmRpbmcnLCAnc3VjY2Vzcyc6IHtcbiAgICAgICAgICByZXR1cm4geyAuLi5zdGF0ZSwgW2Rlc2NdOiB7IHN0YXR1cyB9IH1cbiAgICAgICAgfVxuICAgICAgICBjYXNlICdlcnJvcic6IHtcbiAgICAgICAgICByZXR1cm4geyAuLi5zdGF0ZSwgW2Rlc2NdOiB7IHN0YXR1cywgbXNncyB9IH1cbiAgICAgICAgfVxuICAgICAgICBkZWZhdWx0OiByZXR1cm4gc3RhdGVcbiAgICAgIH1cbiAgICB9XG4gICAgZGVmYXVsdDogcmV0dXJuIHN0YXRlXG4gIH1cbn1cblxuLyogU0VMRUNUT1JTICovXG5cbmV4cG9ydCBjb25zdCBnZXROb3RpZnkgPSAoeyBub3RpZnkgfSkgPT4gKHsgbm90aWZ5IH0pXG5cbi8qIEFDVElPTlMgKi9cblxuZXhwb3J0IGNvbnN0IGFzayA9ICAgICAoZGVzYykgICAgICAgPT4gKHsgdHlwZTogJ25vdGlmeScsIHN0YXR1czogJ3BlbmRpbmcnLCBkZXNjIH0pXG5leHBvcnQgY29uc3QgZXJyID0gICAgIChkZXNjLCBkYXRhKSA9PiAoeyB0eXBlOiAnbm90aWZ5Jywgc3RhdHVzOiAnZXJyb3InLCAgIGRlc2MsIG1zZ3M6IGRhdGEgfSlcbmV4cG9ydCBjb25zdCBzdWNjZWVkID0gKGRlc2MpICAgICAgID0+ICh7IHR5cGU6ICdub3RpZnknLCBzdGF0dXM6ICdzdWNjZXNzJywgZGVzYyB9KVxuXG4vKiBIRUxQRVJTICovXG5cbiIsImltcG9ydCB7IGNvbWJpbmVSZWR1Y2VycyB9IGZyb20gJ3JlZHV4J1xuaW1wb3J0IHdpbiBmcm9tICd3aW4uanMnXG5pbXBvcnQgbm90aWZ5IGZyb20gJ25vdGlmeS5qcydcbmltcG9ydCBkb2MgZnJvbSAnZG9jLmpzJ1xuaW1wb3J0IHRhYmxlcyBmcm9tICd0YWJsZXMuanMnXG5pbXBvcnQgbWUgZnJvbSAnbWUuanMnXG5pbXBvcnQgZmlsdGVyIGZyb20gJ2ZpbHRlci5qcydcbmltcG9ydCBhbHRlciBmcm9tICdhbHRlci5qcydcblxuLyogUk9PVCBSRURVQ0VSICovXG5cbmV4cG9ydCBkZWZhdWx0IGNvbWJpbmVSZWR1Y2Vycyh7XG4gIHdpbixcbiAgbm90aWZ5LFxuICBkb2MsXG4gIHRhYmxlcyxcbiAgbWUsXG4gIGZpbHRlcixcbiAgYWx0ZXIsXG59KVxuXG4vKiBTRUxFQ1RPUlMgKi9cbi8qXG4gKiBDb21iaW5lIHNldmVyYWwgc2VsZWN0b3JzXG4gKi9cblxuZXhwb3J0IGNvbnN0IGNvbWJpbmVTZWxlY3RvcnMgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIChzdGF0ZSwgcHJvcHMpID0+IHtcbiAgICBjb25zdCByZXN1bHQgPSB7fVxuICAgIGZvciAoY29uc3Qgc2VsZWN0b3Igb2YgYXJndW1lbnRzKSB7XG4gICAgICBPYmplY3QuYXNzaWduKHJlc3VsdCwgc2VsZWN0b3Ioc3RhdGUsIHByb3BzKSlcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdFxuICB9XG59XG4iLCJpbXBvcnQgJ3doYXR3Zy1mZXRjaCdcblxuaW1wb3J0IHsgYXNrLCBlcnIsIHN1Y2NlZWQgfSBmcm9tICdub3RpZnkuanMnXG5cbmNvbnN0IHJvb3RVcmwgPSAnL2FwaS8nXG5cbi8qIFJFRFVDRVIgKi9cbi8qXG4gKiBubyBkZWRpY2F0ZWQgcmVkdWNlci5cbiAqIFJlc3VsdHMgb2YgYWN0aW9ucyB3aWxsIGJlIHJlZHVjZWQgYnkgZGVkaWNhdGVkIHJlZHVjZXJzLlxuICovXG5cbi8qIFNFTEVDVE9SUyAqL1xuLypcbiAqIG5vIGRlZGljYXRlZCBzZWxlY3RvcnMuXG4gKiBTZWUgdGhlIHNlbGVjdG9ycyBjb3JyZXNwb25kaW5nIHRvIHRoZSBkZWRpY2F0ZWQgcmVkdWNlcnMuXG4gKi9cblxuLyogQUNUSU9OUyAqL1xuLypcbiAqIEdlbmVyaWMgYWN0aW9uIHRvIGZldGNoIGRhdGEgZnJvbSB0aGUgc2VydmVyLlxuICogVGhlIHF1ZXJ5IGlzIGNvbmZpZ3VyZWQgYnkgdGhlIHRhc2sgb2JqZWN0LlxuICogSXQgY2FuIGJlIHVzZWQgZm9yIGRhdGFiYXNlIHF1ZXJpZXMgb3IgZmlsZSBjb250ZW50LlxuICogRHVyaW5nIHJlcXVlc3QsIG5vdGlmeSBhY3Rpb25zIHdpbGwgYmUgZGlzcGF0Y2hlZC5cbiAqL1xuXG5leHBvcnQgY29uc3QgZmV0Y2hEYXRhID0gdGFzayA9PiBkaXNwYXRjaCA9PiB7XG4gIGNvbnN0IHsgdHlwZSwgcGF0aCwgY29udGVudFR5cGUgfSA9IHRhc2tcbiAgZGlzcGF0Y2goYXNrKHRhc2spKVxuICBkaXNwYXRjaCh7IC4uLnRhc2ssIGRhdGE6IG51bGwgfSlcblxuICBjb25zdCBzZXR0aW5ncyA9IHtjcmVkZW50aWFsczogJ3NhbWUtb3JpZ2luJ31cbiAgZmV0Y2goYCR7cm9vdFVybH0ke2NvbnRlbnRUeXBlfSR7cGF0aH1gLCBzZXR0aW5ncylcbiAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxuICAudGhlbihqc29uID0+IHtcbiAgICBjb25zdCB7IG1zZ3MsIGdvb2QsIGRhdGEgfSA9IGpzb25cbiAgICBpZiAoZ29vZCkge1xuICAgICAgZGlzcGF0Y2goc3VjY2VlZCh0YXNrKSlcbiAgICAgIGRpc3BhdGNoKHsgLi4udGFzaywgZGF0YSB9KVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIGRpc3BhdGNoKGVycih0YXNrLCBtc2dzKSlcbiAgICB9XG4gIH0pXG4gIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICBjb25zb2xlLmVycihlcnJvcilcbiAgICAgIGRpc3BhdGNoKGVycih0YXNrLCBbe2tpbmQ6ICdlcnJvcicsIHRleHQ6IGVycm9yfV0pKVxuICB9KVxufVxuXG4vKiBIRUxQRVJTICovXG5cbiIsIi8qIFJFRFVDRVIgKi9cblxuZXhwb3J0IGRlZmF1bHQgKHN0YXRlPXt9LCB7IHR5cGUsIHBhdGgsIGRhdGEsIHRhYmxlIH0pID0+IHtcbiAgc3dpdGNoICh0eXBlKSB7XG4gICAgY2FzZSAnZmV0Y2hUYWJsZSc6IHtcbiAgICAgIGlmIChkYXRhID09IG51bGwpIHtyZXR1cm4geyAuLi5zdGF0ZSwgW3RhYmxlXTogbnVsbCB9fVxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIFt0YWJsZV06IGRhdGEsXG4gICAgICB9XG4gICAgfVxuICAgIGNhc2UgJ2ZldGNoVGFibGVNeSc6IHtcbiAgICAgIGlmIChkYXRhID09IG51bGwpIHtcbiAgICAgICAgaWYgKHN0YXRlW3RhYmxlXSA9PSBudWxsKSB7IHJldHVybiB7IC4uLnN0YXRlLCBbdGFibGVdOiBudWxsIH19XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgICAgW3RhYmxlXToge1xuICAgICAgICAgICAgLi4uc3RhdGVbdGFibGVdLFxuICAgICAgICAgICAgbXk6IG51bGwsXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBjb25zdCB7IGVudGl0aWVzLCBvcmRlciwgLi4ucmVzdCB9ID0gZGF0YVxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIFt0YWJsZV06IHtcbiAgICAgICAgICAuLi5zdGF0ZVt0YWJsZV0sXG4gICAgICAgICAgLi4ucmVzdCxcbiAgICAgICAgICBteTogb3JkZXIsXG4gICAgICAgICAgZW50aXRpZXM6IHtcbiAgICAgICAgICAgIC4uLihzdGF0ZVt0YWJsZV0gfHwge30pLmVudGl0aWVzLFxuICAgICAgICAgICAgLi4uZW50aXRpZXMsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH1cbiAgICB9XG4gICAgY2FzZSAnZmV0Y2hJdGVtJzoge1xuICAgICAgaWYgKGRhdGEgPT0gbnVsbCkge3JldHVybiBzdGF0ZX1cbiAgICAgIGNvbnN0IHsgdmFsdWVzOiB7IF9pZCB9IH0gPSBkYXRhXG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgW3RhYmxlXToge1xuICAgICAgICAgIC4uLnN0YXRlW3RhYmxlXSxcbiAgICAgICAgICBlbnRpdGllczoge1xuICAgICAgICAgICAgLi4uc3RhdGVbdGFibGVdLmVudGl0aWVzLFxuICAgICAgICAgICAgW19pZF06IGRhdGEsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH1cbiAgICB9XG4gICAgZGVmYXVsdDogcmV0dXJuIHN0YXRlXG4gIH1cbn1cblxuLyogU0VMRUNUT1JTICovXG5cbmV4cG9ydCBjb25zdCBnZXRUYWJsZXMgPSAoeyB0YWJsZXMgfSkgPT4gKHsgdGFibGVzIH0pXG5cbmV4cG9ydCBjb25zdCBnZXRDb3VudHJ5ID0gKHsgdGFibGVzOiB7IGNvdW50cnkgfSB9KSA9PiAoeyBjb3VudHJ5IH0pXG5cbmV4cG9ydCBjb25zdCBnZXRVc2VyID0gKHsgdGFibGVzOiB7IHVzZXIgfSB9KSA9PiAoeyB1c2VyIH0pXG5cbmV4cG9ydCBjb25zdCBnZXRUYWJsZUZpbHRlcnMgPSAgKHsgdGFibGVzIH0sIHsgdGFibGUgfSkgPT4ge1xuICBjb25zdCB7IFt0YWJsZV06IHsgZmllbGRzLCBmaWx0ZXJMaXN0IH0gfSA9IHRhYmxlc1xuICByZXR1cm4geyBmaWVsZHMsIGZpbHRlckxpc3QgfVxufVxuXG4vKiBBQ1RJT05TICovXG4vKlxuICogQWN0aW9ucyBhcmUgZGlzcGF0Y2ggaW4gdGhlIHByb2Nlc3Mgb2YgZmV0Y2hpbmcgZGF0YSBmcm9tIHRoZSBzZXJ2ZXJcbiAqL1xuXG4vKiBIRUxQRVJTICovXG5cbiIsIi8qIFJFRFVDRVIgKi9cblxuZXhwb3J0IGRlZmF1bHQgKHN0YXRlID0gaW5pdFdpbkRpbSgpLCB7IHR5cGUsIGhlaWdodCwgd2lkdGggfSkgPT4ge1xuICBzd2l0Y2ggKHR5cGUpIHtcbiAgICBjYXNlICd3aW5kaW0nOiB7XG4gICAgICByZXR1cm4geyBoZWlnaHQsIHdpZHRoIH1cbiAgICB9XG4gICAgZGVmYXVsdDogcmV0dXJuIHN0YXRlXG4gIH1cbn1cblxuLyogQUNUSU9OUyAqL1xuXG5leHBvcnQgY29uc3QgY2hhbmdlV2luRGltID0gKCkgPT4gZGlzcGF0Y2ggPT4ge1xuICBkaXNwYXRjaCh7IHR5cGU6ICd3aW5kaW0nLCAuLi5pbml0V2luRGltKCkgfSlcbn1cblxuLyogU0VMRUNUT1JTICovXG5cbmV4cG9ydCBjb25zdCBnZXRXaW5EaW0gPSAoeyB3aW46IHsgaGVpZ2h0LCB3aWR0aCB9IH0pID0+ICh7IGhlaWdodCwgd2lkdGggfSlcblxuLyogSEVMUEVSUyAqL1xuXG5jb25zdCBpbml0V2luRGltID0gKCkgPT4ge1xuICBjb25zdCB7IGlubmVySGVpZ2h0OiBoZWlnaHQsIGlubmVyV2lkdGg6IHdpZHRoIH0gPSB3aW5kb3dcbiAgcmV0dXJuIHsgaGVpZ2h0LCB3aWR0aCB9XG59XG5cbmNvbnN0IHNjcm9sbEJhcldpZHRoID0gNDBcbmNvbnN0IGxlZnRNYXJnaW4gPSAwXG5cbmNvbnN0IHRvcEhlaWdodCA9IDUwXG5jb25zdCB0b3BNYXJnaW4gPSA1XG5cbmNvbnN0IGRpdldpZHRoU3BlYyA9IHtcbiAgbGVmdDogMTIwLFxuICByaWdodExlZnQ6IDM4MCxcbiAgcmlnaHRMZWZ0TmF2OiAxNTAsXG59XG5cbmNvbnN0IGZsb2F0U3BlYyA9IHtcbiAgbGVmdDogJ2xlZnQnLFxuICByaWdodDogJ3JpZ2h0JyxcbiAgcmlnaHRMZWZ0OiAnbGVmdCcsXG4gIHJpZ2h0TGVmdE5hdjogJ2xlZnQnLFxuICByaWdodFJpZ2h0OiAncmlnaHQnLFxuICByaWdodFJpZ2h0Qm9keTogJ3JpZ2h0Jyxcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvbHVtblN0eWxlKGtpbmQsIHsgaGVpZ2h0LCB3aWR0aCB9KSB7XG4gIGNvbnN0IGRpdkhlaWdodCA9IHtcbiAgICBsZWZ0OiBoZWlnaHQgLSB0b3BIZWlnaHQsXG4gICAgcmlnaHQ6IGhlaWdodCAtIHRvcEhlaWdodCxcbiAgICByaWdodExlZnQ6IGhlaWdodCAtIHRvcEhlaWdodCAtIHRvcE1hcmdpbixcbiAgICByaWdodExlZnROYXY6IGhlaWdodCAtIHRvcEhlaWdodCAtIHRvcE1hcmdpbixcbiAgICByaWdodFJpZ2h0OiBoZWlnaHQgLSB0b3BIZWlnaHQgLSB0b3BNYXJnaW4sXG4gICAgcmlnaHRSaWdodEJvZHk6IGhlaWdodCAtIHRvcEhlaWdodCAtIHRvcE1hcmdpbixcbiAgfVxuICBjb25zdCB7IGxlZnQsIHJpZ2h0TGVmdCwgcmlnaHRMZWZ0TmF2IH0gPSBkaXZXaWR0aFNwZWNcbiAgY29uc3QgZGl2V2lkdGggPSB7XG4gICAgLi4uZGl2V2lkdGhTcGVjLFxuICAgIHJpZ2h0OiB3aWR0aCAtIGxlZnQgLSBzY3JvbGxCYXJXaWR0aCxcbiAgICByaWdodFJpZ2h0OiB3aWR0aCAtIGxlZnQgLSByaWdodExlZnQgLSAyICogc2Nyb2xsQmFyV2lkdGggLSBsZWZ0TWFyZ2luLFxuICAgIHJpZ2h0UmlnaHRCb2R5OiB3aWR0aCAtIGxlZnQgLSByaWdodExlZnROYXYgLSAyICogc2Nyb2xsQmFyV2lkdGggLSBsZWZ0TWFyZ2luLFxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICB3aWR0aDogZGl2V2lkdGhba2luZF0sXG4gICAgaGVpZ2h0OiBkaXZIZWlnaHRba2luZF0sXG4gICAgZmxvYXQ6IGZsb2F0U3BlY1traW5kXSxcbiAgfVxufVxuXG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgeyByZW5kZXIgfSBmcm9tICdyZWFjdC1kb20nXG5pbXBvcnQgeyBQcm92aWRlciB9IGZyb20gJ3JlYWN0LXJlZHV4J1xuaW1wb3J0IHsgUm91dGVyLCBSb3V0ZSwgUmVkaXJlY3QsIEluZGV4Um91dGUsIEluZGV4UmVkaXJlY3QsIGJyb3dzZXJIaXN0b3J5IH0gZnJvbSAncmVhY3Qtcm91dGVyJ1xuXG5pbXBvcnQgUm9vdCBmcm9tICdSb290LmpzeCdcbmltcG9ydCBBcHAgZnJvbSAnQXBwLmpzeCdcbmltcG9ydCBTdWJBcHAgZnJvbSAnU3ViQXBwLmpzeCdcbmltcG9ydCBCYWNrb2ZmaWNlIGZyb20gJ0JhY2tvZmZpY2UuanN4J1xuaW1wb3J0IEl0ZW1GaWx0ZXJlZCBmcm9tICdJdGVtRmlsdGVyZWQuanN4J1xuaW1wb3J0IEl0ZW1NeSBmcm9tICdJdGVtTXkuanN4J1xuaW1wb3J0IEl0ZW1SZWNvcmRQcmUgZnJvbSAnSXRlbVJlY29yZFByZS5qc3gnXG5pbXBvcnQgRG9jIGZyb20gJ0RvYy5qc3gnXG5pbXBvcnQgTm90Rm91bmQgZnJvbSAnTm90Rm91bmQuanN4J1xuXG5pbXBvcnQgY29uZmlndXJlU3RvcmUgZnJvbSAnY29uZmlndXJlU3RvcmUuanMnXG5pbXBvcnQgcmVkdWNlciBmcm9tICdyZWR1Y2Vycy5qcydcblxuY29uc3Qgc3RvcmUgPSBjb25maWd1cmVTdG9yZShyZWR1Y2VyKVxuXG5yZW5kZXIoXG4gIDxSb290IHN0b3JlPXtzdG9yZX0+XG4gICAgPFJvdXRlciBoaXN0b3J5PXticm93c2VySGlzdG9yeX0gPlxuICAgICAgPFJlZGlyZWN0IGZyb209XCIvYWJvdXRcIiB0bz1cIi9kb2NzL2Fib3V0Lm1kXCIgLz5cbiAgICAgIDxSZWRpcmVjdCBmcm9tPVwiL2RvY3MvYWJvdXRcIiB0bz1cIi9kb2NzL2Fib3V0Lm1kXCIgLz5cbiAgICAgIDxSZWRpcmVjdCBmcm9tPVwiL2Fib3V0Lm1kXCIgdG89XCIvZG9jcy9hYm91dC5tZFwiIC8+XG4gICAgICA8UmVkaXJlY3QgZnJvbT1cIi9sb2dpblwiIHRvPVwiL2RvY3MvYWJvdXQubWRcIiAvPlxuICAgICAgPFJlZGlyZWN0IGZyb209XCIvbG9nb3V0XCIgdG89XCIvZG9jcy9hYm91dC5tZFwiIC8+XG4gICAgICA8UmVkaXJlY3QgZnJvbT1cIi9zbG9nb3V0XCIgdG89XCIvZG9jcy9hYm91dC5tZFwiIC8+XG4gICAgICA8Um91dGUgcGF0aD1cIi9cIiBjb21wb25lbnQ9e0FwcH0gPlxuICAgICAgICA8SW5kZXhSb3V0ZSBjb21wb25lbnQ9e0FwcH0gLz5cbiAgICAgICAgPEluZGV4UmVkaXJlY3QgdG89XCIvZG9jcy9hYm91dC5tZFwiIC8+XG4gICAgICAgIDxSb3V0ZSBwYXRoPVwiZG9jcy86ZG9jRmlsZVwiIGNvbXBvbmVudD17RG9jfSAvPlxuICAgICAgICA8Um91dGUgcGF0aD1cInRlY2gvZG9jcy9nZW4vOmRvY0ZpbGVcIiBjb21wb25lbnQ9e0RvY30gLz5cbiAgICAgICAgPFJvdXRlIHBhdGg9XCJ0ZWNoL2RvY3MvOmRvY0ZpbGVcIiBjb21wb25lbnQ9e0RvY30gLz5cbiAgICAgICAgPFJvdXRlIHBhdGg9XCI6dGFibGVcIiBjb21wb25lbnQ9e1N1YkFwcH0gPlxuICAgICAgICAgIDxSb3V0ZSBwYXRoPVwibGlzdFwiIGNvbXBvbmVudD17SXRlbUZpbHRlcmVkfSAvPlxuICAgICAgICAgIDxSb3V0ZSBwYXRoPVwibXlsaXN0XCIgY29tcG9uZW50PXtJdGVtTXl9ID5cbiAgICAgICAgICAgIDxSb3V0ZSBwYXRoPVwiOmVJZFwiIGNvbXBvbmVudD17SXRlbVJlY29yZFByZX0gb3duT25seT17dHJ1ZX0gLz5cbiAgICAgICAgICA8L1JvdXRlPlxuICAgICAgICAgIDxSb3V0ZSBwYXRoPVwiOmZ1bmNcIiBjb21wb25lbnQ9e0JhY2tvZmZpY2V9IC8+XG4gICAgICAgIDwvUm91dGU+XG4gICAgICA8L1JvdXRlPlxuICAgICAgPFJvdXRlIHBhdGg9XCIqXCIgY29tcG9uZW50PXtOb3RGb3VuZH0gLz5cbiAgICA8L1JvdXRlcj5cbiAgPC9Sb290PlxuICAsXG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdib2R5JylcbilcblxuIiwiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4J1xuaW1wb3J0IHsgY2hhbmdlRmFjZXRBbGwsIGdldEZpbHRlclNldHRpbmcsIHRlc3RBbGxDaGVja3MgfSBmcm9tICdmaWx0ZXIuanMnXG5cbmNvbnN0IGluZGV0ZXJtaW5hdGUgPSBzdGF0ZXMgPT4gIXN0YXRlcy5hbGxUcnVlICYmICFzdGF0ZXMuYWxsRmFsc2VcblxuY2xhc3MgQ2hlY2tib3hJIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgY29tcG9uZW50RGlkVXBkYXRlKCkge1xuICAgIGNvbnN0IHsgcHJvcHM6IHsgZmlsdGVyU2V0dGluZyB9IH0gPSB0aGlzXG4gICAgY29uc3Qgc3RhdGVzID0gdGVzdEFsbENoZWNrcyhmaWx0ZXJTZXR0aW5nKVxuICAgIHRoaXMuZG9tLmluZGV0ZXJtaW5hdGUgPSBpbmRldGVybWluYXRlKHN0YXRlcylcbiAgfVxuICBoYW5kbGVDaGVjayA9ICgpID0+IHtcbiAgICBjb25zdCB7IHByb3BzOiB7ZmlsdGVyU2V0dGluZywgZmlsdGVySWQsIGhhbmRsZSB9IH0gPSB0aGlzXG4gICAgY29uc3Qgc3RhdGVzID0gdGVzdEFsbENoZWNrcyhmaWx0ZXJTZXR0aW5nKVxuICAgIHJldHVybiBoYW5kbGUoZmlsdGVySWQsIHRoaXMuZG9tLmluZGV0ZXJtaW5hdGUgfHwgIXN0YXRlcy5hbGxUcnVlKVxuICB9XG4gIHNldEluZGV0ZXJtaW5hdGUgPSBkb21FbGVtID0+IHtcbiAgICBjb25zdCB7IHByb3BzOiB7IGZpbHRlclNldHRpbmcgfSB9ID0gdGhpc1xuICAgIGNvbnN0IHN0YXRlcyA9IHRlc3RBbGxDaGVja3MoZmlsdGVyU2V0dGluZylcbiAgICBpZiAoZG9tRWxlbSkge1xuICAgICAgdGhpcy5kb20gPSBkb21FbGVtXG4gICAgICBkb21FbGVtLmluZGV0ZXJtaW5hdGUgPSBpbmRldGVybWluYXRlKHN0YXRlcylcbiAgICB9XG4gIH1cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgcHJvcHM6IHsgZmlsdGVyU2V0dGluZyB9IH0gPSB0aGlzXG4gICAgY29uc3Qgc3RhdGVzID0gdGVzdEFsbENoZWNrcyhmaWx0ZXJTZXR0aW5nKVxuICAgIHJldHVybiAoXG4gICAgICA8aW5wdXRcbiAgICAgICAgICByZWY9e3RoaXMuc2V0SW5kZXRlcm1pbmF0ZX1cbiAgICAgICAgICB0eXBlPVwiY2hlY2tib3hcIlxuICAgICAgICAgIGNoZWNrZWQ9e3N0YXRlcy5hbGxUcnVlfVxuICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUNoZWNrfVxuICAgICAgLz5cbiAgICApXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChnZXRGaWx0ZXJTZXR0aW5nLCB7IGhhbmRsZTogY2hhbmdlRmFjZXRBbGwgfSkoQ2hlY2tib3hJKVxuIiwiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4J1xuaW1wb3J0IEJ5VmFsdWUgZnJvbSAnQnlWYWx1ZS5qc3gnXG5pbXBvcnQgTCBmcm9tICdsZWFmbGV0J1xuaW1wb3J0IHtjb3VudHJ5Qm9yZGVyc30gZnJvbSAnZXVyb3BlLmdlby5qcydcbmltcG9ydCB7IGdldEZpbHRlclNldHRpbmcgfSBmcm9tICdmaWx0ZXIuanMnXG5pbXBvcnQgeyBnZXRDb3VudHJ5IH0gZnJvbSAndGFibGVzLmpzJ1xuaW1wb3J0IHsgY29tYmluZVNlbGVjdG9ycyB9IGZyb20gJ3JlZHVjZXJzLmpzJ1xuXG5jb25zdCBtYXBPcHRpb25zID0ge1xuICBIRUlHSFQ6IDI1MCxcbiAgTUFYX1JBRElVUzogMjUsXG4gIExFVkVMX09GRjogMTAsXG4gIFpPT01fSU5JVDogMyxcbiAgTUFQX0NFTlRFUjogWzUyLCAxMl0sXG4gIE1BUF9CT1VORFM6IFtbMzAsIC0yMF0sIFs3MCwgNDBdXSxcbiAgTUFSS0VSX0NPTE9SOiB7XG4gICAgW3RydWVdOiB7XG4gICAgICBjb2xvcjogJyMwMDg4MDAnLFxuICAgICAgZmlsbENvbG9yOiAnIzAwY2MwMCcsXG4gICAgfSxcbiAgICBbZmFsc2VdOiB7XG4gICAgICBjb2xvcjogJyM4ODg4NDQnLFxuICAgICAgZmlsbENvbG9yOiAnI2JiYmI2NicsXG4gICAgfSxcbiAgfSxcbiAgTUFSS0VSX1NIQVBFOiB7XG4gICAgd2VpZ2h0OiAxLFxuICAgIGZpbGw6IHRydWUsXG4gICAgZmlsbE9wYWNpdHk6IDAuOCxcbiAgfSxcbiAgQ09VTlRSWV9TVFlMRToge1xuICAgIFt0cnVlXToge1xuICAgICAgY29sb3I6ICcjODg0NDIyJyxcbiAgICAgIHdlaWdodDogMixcbiAgICAgIGZpbGw6IHRydWUsXG4gICAgICBmaWxsQ29sb3I6ICcjYWE3NzY2JyxcbiAgICAgIGZpbGxPcGFjaXR5OiAxLFxuICAgIH0sXG4gICAgW2ZhbHNlXToge1xuICAgICAgY29sb3I6ICcjNzc3Nzc3JyxcbiAgICAgIHdlaWdodDogMSxcbiAgICAgIGZpbGw6IHRydWUsXG4gICAgICBmaWxsQ29sb3I6ICcjYmJiYmJiJyxcbiAgICAgIGZpbGxPcGFjaXR5OiAxLFxuICAgIH0sXG4gIH0sXG59XG5cbmNvbnN0IGNvbXB1dGVSYWRpdXMgPSAoX2lkLCBmaWx0ZXJlZEFtb3VudE90aGVycywgYW1vdW50cykgPT4ge1xuICBjb25zdCBhbW91bnQgPSBhbW91bnRzID8gKGFtb3VudHNbX2lkXSB8fCAwKSA6IDBcbiAgaWYgKGFtb3VudCA9PSAwKSB7cmV0dXJuIDB9XG4gIGNvbnN0IHsgTUFYX1JBRElVUywgTEVWRUxfT0ZGIH0gPSBtYXBPcHRpb25zXG4gIGNvbnN0IHByb3BvcnRpb25hbCA9IE1BWF9SQURJVVMgKiBhbW91bnQgLyBmaWx0ZXJlZEFtb3VudE90aGVyc1xuICBpZiAoZmlsdGVyZWRBbW91bnRPdGhlcnMgPCBMRVZFTF9PRkYpIHtyZXR1cm4gcHJvcG9ydGlvbmFsfVxuICByZXR1cm4gTEVWRUxfT0ZGICogTWF0aC5zcXJ0KHByb3BvcnRpb25hbClcbn1cblxuY2xhc3MgRVVNYXAgZXh0ZW5kcyBDb21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKVxuICAgIHRoaXMuZmVhdHVyZXMgPSB7fVxuICB9XG4gIHNldE1hcCA9IGRvbSA9PiB7aWYgKGRvbSkge3RoaXMuZG9tID0gZG9tfX1cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgcHJvcHM6IHsgY291bnRyeSwgLi4uYnlWYWx1ZVByb3BzIH0sIHNldE1hcCB9ID0gdGhpc1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgcmVmPXtzZXRNYXB9XG4gICAgICAgIC8+XG4gICAgICAgIDxCeVZhbHVlIHsuLi5ieVZhbHVlUHJvcHN9IC8+XG4gICAgICA8L2Rpdj5cbiAgICApXG4gIH1cblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICBjb25zdCB7XG4gICAgICBwcm9wczogeyBmaWx0ZXJTZXR0aW5nLCBmaWx0ZXJlZEFtb3VudE90aGVycywgYW1vdW50cywgY291bnRyeSB9LFxuICAgICAgZG9tLFxuICAgIH0gPSB0aGlzXG4gICAgY29uc3QgeyBIRUlHSFQsIE1BUF9DRU5URVIsIFpPT01fSU5JVCwgTUFQX0JPVU5EUywgTUFSS0VSX0NPTE9SLCBNQVJLRVJfU0hBUEUsIENPVU5UUllfU1RZTEUgfSA9IG1hcE9wdGlvbnNcbiAgICBkb20uc3R5bGUuaGVpZ2h0ID0gSEVJR0hUXG4gICAgdGhpcy5tYXAgPSBMLm1hcChkb20sIHtcbiAgICAgIGF0dHJpYnV0aW9uQ29udHJvbDogZmFsc2UsXG4gICAgICBjZW50ZXI6IE1BUF9DRU5URVIsXG4gICAgICB6b29tOiBaT09NX0lOSVQsXG4gICAgICBtYXhCb3VuZHM6IE1BUF9CT1VORFMsXG4gICAgfSlcbiAgICBjb25zdCB7IG9yZGVyLCBlbnRpdGllcyB9ID0gY291bnRyeVxuICAgIHRoaXMuaWRGcm9tSXNvID0ge31cbiAgICBvcmRlci5mb3JFYWNoKF9pZCA9PiB7XG4gICAgICBjb25zdCB7IFtfaWRdOiB7IHZhbHVlczogeyBpc28gfSB9IH0gPSBlbnRpdGllc1xuICAgICAgdGhpcy5pZEZyb21Jc29baXNvXSA9IF9pZFxuICAgIH0pXG4gICAgTC5nZW9KU09OKGNvdW50cnlCb3JkZXJzLCB7XG4gICAgICBzdHlsZTogZmVhdHVyZSA9PiBDT1VOVFJZX1NUWUxFW3RoaXMuaW5EYXJpYWgoZmVhdHVyZSldLFxuICAgICAgb25FYWNoRmVhdHVyZTogZmVhdHVyZSA9PiB7XG4gICAgICAgIGlmICh0aGlzLmluRGFyaWFoKGZlYXR1cmUpKSB7XG4gICAgICAgICAgY29uc3QgeyBwcm9wZXJ0aWVzOiB7IGlzbzIsIGxhdCwgbG5nIH0gfSA9IGZlYXR1cmVcbiAgICAgICAgICBjb25zdCBfaWQgPSB0aGlzLmlkRnJvbUlzb1tpc28yXVxuICAgICAgICAgIGNvbnN0IGlzT24gPSBmaWx0ZXJTZXR0aW5nW19pZF1cbiAgICAgICAgICBjb25zdCBtYXJrZXIgPSBMLmNpcmNsZU1hcmtlcihbbGF0LCBsbmddLCB7XG4gICAgICAgICAgICAuLi5NQVJLRVJfQ09MT1JbaXNPbl0sXG4gICAgICAgICAgICByYWRpdXM6IGNvbXB1dGVSYWRpdXMoX2lkLCBmaWx0ZXJlZEFtb3VudE90aGVycywgYW1vdW50cyksXG4gICAgICAgICAgICAuLi5NQVJLRVJfU0hBUEUsXG4gICAgICAgICAgICBwYW5lOiAnbWFya2VyUGFuZScsXG4gICAgICAgICAgfSkuYWRkVG8odGhpcy5tYXApXG4gICAgICAgICAgdGhpcy5mZWF0dXJlc1tpc28yXSA9IG1hcmtlclxuICAgICAgICB9XG4gICAgICB9LFxuICAgIH0pLmFkZFRvKHRoaXMubWFwKVxuICB9XG5cbiAgaW5EYXJpYWggPSBmZWF0dXJlID0+ICEhdGhpcy5pZEZyb21Jc29bZmVhdHVyZS5wcm9wZXJ0aWVzLmlzbzJdXG5cbiAgY29tcG9uZW50RGlkVXBkYXRlKCkge1xuICAgIGNvbnN0IHsgcHJvcHM6IHsgZmlsdGVyU2V0dGluZywgZmlsdGVyZWRBbW91bnRPdGhlcnMsIGFtb3VudHMgfSB9ID0gdGhpc1xuICAgIGNvbnN0IHsgTUFSS0VSX0NPTE9SIH0gPSBtYXBPcHRpb25zXG4gICAgT2JqZWN0LmVudHJpZXModGhpcy5mZWF0dXJlcykuZm9yRWFjaCgoW2lzbzIsIG1hcmtlcl0pID0+IHtcbiAgICAgIGNvbnN0IF9pZCA9IHRoaXMuaWRGcm9tSXNvW2lzbzJdXG4gICAgICBjb25zdCBpc09uID0gZmlsdGVyU2V0dGluZ1tfaWRdXG4gICAgICBtYXJrZXIuc2V0UmFkaXVzKGNvbXB1dGVSYWRpdXMoX2lkLCBmaWx0ZXJlZEFtb3VudE90aGVycywgYW1vdW50cykpXG4gICAgICBtYXJrZXIuc2V0U3R5bGUoTUFSS0VSX0NPTE9SW2lzT25dKVxuICAgIH0pXG4gIH1cbn1cblxuRVVNYXAuZGlzcGxheU5hbWUgPSAnRVVNYXAnXG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QoY29tYmluZVNlbGVjdG9ycyhnZXRDb3VudHJ5LCBnZXRGaWx0ZXJTZXR0aW5nKSkoRVVNYXApXG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnXG5pbXBvcnQgTG9naW4gZnJvbSAnTG9naW4uanN4J1xuaW1wb3J0IE5hdkxpbmsgZnJvbSAnTmF2TGluay5qc3gnXG5pbXBvcnQgU3RhdGljIGZyb20gJ1N0YXRpYy5qc3gnXG5pbXBvcnQgTm90aWZpY2F0aW9uIGZyb20gJ05vdGlmaWNhdGlvbi5qc3gnXG5pbXBvcnQgeyBnZXRXaW5EaW0gfSBmcm9tICd3aW4uanMnXG5cbmNvbnN0IEFwcCA9ICh7IGNoaWxkcmVuLCBoZWlnaHQsIHdpZHRoIH0pID0+IHtcbiAgY29uc3QgdGV4dCA9IGAke3dpZHRofSB4ICR7aGVpZ2h0fWBcbiAgcmV0dXJuIChcbiAgICA8ZGl2PlxuICAgICAgPE5vdGlmaWNhdGlvbiAvPlxuICAgICAgPHAgY2xhc3NOYW1lPVwibmF2IHNtYWxsIHRvcFwiID5cbiAgICAgICAgPGltZ1xuICAgICAgICAgIHNyYz1cIi9zdGF0aWMvaW1hZ2VzL2lua2luZF9sb2dvX3NtYWxsLnBuZ1wiXG4gICAgICAgICAgdGl0bGU9XCJpbmZvcm1hdGlvbiBhYm91dCB0aGlzIHNpdGVcIlxuICAgICAgICAvPlxuICAgICAgICA8TmF2TGluayB0bz1cIi9jb250cmliXCIgPnsnQ29udHJpYnV0aW9ucyd9PC9OYXZMaW5rPlxuICAgICAgICA8TmF2TGluayB0bz1cIi9iYWNrb2ZmaWNlXCIgPnsnQmFja29mZmljZSd9PC9OYXZMaW5rPlxuICAgICAgICA8U3RhdGljIC8+XG4gICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInJlc2l6ZVwiIHRpdGxlPXt0ZXh0fT57dGV4dH08L3NwYW4+XG4gICAgICAgIDxMb2dpbiAvPlxuICAgICAgPC9wPlxuICAgICAgPGRpdj57Y2hpbGRyZW59PC9kaXY+XG4gICAgPC9kaXY+XG4gIClcbn1cblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChnZXRXaW5EaW0pKEFwcClcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcblxuY29uc3QgQmFja29mZmljZSA9ICh7IHBhcmFtczogeyBmdW5jIH0gfSkgPT4ge1xuICBjb25zdCBoZWFkaW5ncyA9IHtcbiAgICB0eXBlOiAnQ29udHJpYnV0aW9uIHR5cGVzJyxcbiAgICBhc3Nlc3M6ICdBc3Nlc3NtZW50IGNyaXRlcmlhJyxcbiAgICBwYWNrYWdlOiAnQXNzZXNzbWVudCBwYWNrYWdlcycsXG4gIH1cbiAgY29uc3QgYm9kaWVzID0ge1xuICAgIHR5cGU6ICdXaWxsIGJlIGltcGxlbWVudGVkJyxcbiAgICBhc3Nlc3M6ICdXaWxsIGJlIGltcGxlbWVudGVkJyxcbiAgICBwYWNrYWdlOiAnV2lsbCBiZSBpbXBsZW1lbnRlZCcsXG4gIH1cbiAgY29uc3QgaGVhZGluZyA9IGhlYWRpbmdzW2Z1bmNdIHx8ICdObyBzdWNoIGZ1bmN0aW9uJ1xuICBjb25zdCBib2R5ID0gYm9kaWVzW2Z1bmNdIHx8ICdOb3RoaW5nIHRvIHdhaXQgZm9yJ1xuICByZXR1cm4gKFxuICAgIDxkaXY+XG4gICAgICA8aDE+e2hlYWRpbmd9PC9oMT5cbiAgICAgIDxwPntib2R5fTwvcD5cbiAgICA8L2Rpdj5cbiAgKVxufVxuXG5leHBvcnQgZGVmYXVsdCBCYWNrb2ZmaWNlXG5cblxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4J1xuaW1wb3J0IEZhY2V0IGZyb20gJ0ZhY2V0LmpzeCdcbmltcG9ydCBDaGVja2JveEkgZnJvbSAnQ2hlY2tib3hJLmpzeCdcbmltcG9ydCBTdGF0IGZyb20gJ1N0YXQuanN4J1xuaW1wb3J0IEFsdGVybmF0aXZlIGZyb20gJ0FsdGVybmF0aXZlLmpzeCdcbmltcG9ydCB7IGdldEZpZWxkVmFsdWVzLCBwbGFjZUZhY2V0cyB9IGZyb20gJ2ZpbHRlci5qcydcblxuY29uc3QgQnlWYWx1ZSA9ICh7XG4gIHRhYmxlLFxuICBmaWx0ZXJJZCwgZmlsdGVyRmllbGQsIGZpbHRlckxhYmVsLFxuICBmaWVsZFZhbHVlcyxcbiAgZmlsdGVyZWRBbW91bnQsIGZpbHRlcmVkQW1vdW50T3RoZXJzLFxuICBhbW91bnRzLCBtYXhDb2xzLCBcbiAgZXhwYW5kZWQsXG59KSA9PiB7XG4gIGNvbnN0IHJvd3MgPSBwbGFjZUZhY2V0cyhmaWVsZFZhbHVlcywgbWF4Q29scylcbiAgY29uc3QgY29udHJvbDEgPSBoYW5kbGVyID0+ICg8c3BhbiBjbGFzc05hbWU9XCJidXR0b24tc21hbGwgZmEgZmEtY2hldnJvbi1kb3duXCIgb25DbGljaz17aGFuZGxlcn0gLz4pXG4gIGNvbnN0IGNvbnRyb2wyID0gaGFuZGxlciA9PiAoPHNwYW4gY2xhc3NOYW1lPVwiYnV0dG9uLXNtYWxsIGZhIGZhLWNoZXZyb24tcmlnaHRcIiBvbkNsaWNrPXtoYW5kbGVyfSAvPilcbiAgY29uc3QgY29udHJvbFBsYWNlbWVudCA9IGNvbnRyb2wgPT4gKFxuICAgIDxwIGNsYXNzTmFtZT1cImZhY2V0XCIgPlxuICAgICAgPENoZWNrYm94SVxuICAgICAgICBmaWx0ZXJJZD17ZmlsdGVySWR9XG4gICAgICAvPiB7ZmlsdGVyTGFiZWx9eycgJ31cbiAgICAgIDxTdGF0IHN1YlRvdGFsPXtmaWx0ZXJlZEFtb3VudH0gdG90YWw9e2ZpbHRlcmVkQW1vdW50T3RoZXJzfSAvPnsnICd9XG4gICAgICB7Y29udHJvbH1cbiAgICA8L3A+XG4gIClcbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImZhY2V0XCIgPntcbiAgICAgIHJvd3MgPT09IG51bGwgPyAoPHA+eycgLW5vIGZhY2V0cyAnfTwvcD4pIDogKFxuICAgICAgICA8QWx0ZXJuYXRpdmVcbiAgICAgICAgICB0YWc9e2Ake3RhYmxlfV8ke2ZpbHRlcklkfWB9XG4gICAgICAgICAgY29udHJvbFBsYWNlbWVudD17Y29udHJvbFBsYWNlbWVudH1cbiAgICAgICAgICBjb250cm9scz17W2NvbnRyb2wxLCBjb250cm9sMl19XG4gICAgICAgICAgaW5pdGlhbD17ZXhwYW5kZWQgPyAwIDogMX1cbiAgICAgICAgICBhbHRlcm5hdGl2ZXM9e1tcbiAgICAgICAgICAgICg8dGFibGUga2V5PVwidGFibGVcIiA+XG4gICAgICAgICAgICAgIDx0Ym9keT5cbiAgICAgICAgICAgICAgICB7cm93cy5tYXAoKGVudGl0eSwgaSkgPT4gKFxuICAgICAgICAgICAgICAgICAgPHRyIGtleT17aX0gPlxuICAgICAgICAgICAgICAgICAgICB7ZW50aXR5Lm1hcCgoZiwgaikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgIGlmIChmID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gPHRkIGtleT17an0gLz5cbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgY29uc3QgW3ZhbHVlSWQsIHZhbHVlUmVwXSA9IGZcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCBmYWNldENsYXNzID0gKGogPT0gMCkgPyBcImZhY2V0XCIgOiBcImZhY2V0IG1pZFwiXG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsoXG4gICAgICAgICAgICAgICAgICAgICAgICA8dGRcbiAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9e3ZhbHVlSWR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtmYWNldENsYXNzfVxuICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICA8RmFjZXRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJJZD17ZmlsdGVySWR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVJZD17dmFsdWVJZH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZVJlcD17dmFsdWVSZXB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICksIChcbiAgICAgICAgICAgICAgICAgICAgICAgIDx0ZFxuICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9XCJzdGF0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwic3RhdGlzdGljXCJcbiAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPFN0YXQgc3ViVG90YWw9e2Ftb3VudHNbdmFsdWVJZF19IC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgICAgICAgICldXG4gICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICAgICAgPC90YWJsZT4pLFxuICAgICAgICAgICAgKDxkaXYga2V5PVwiZGl2XCIgLz4pLFxuICAgICAgICAgIF19XG4gICAgICAgIC8+XG4gICAgICApfVxuICAgIDwvZGl2PlxuICApXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QoZ2V0RmllbGRWYWx1ZXMpKEJ5VmFsdWUpXG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5cbmltcG9ydCBEb2NNZCBmcm9tICdEb2NNZC5qc3gnXG5pbXBvcnQgRG9jUGRmIGZyb20gJ0RvY1BkZi5qc3gnXG5pbXBvcnQgRG9jSHRtbCBmcm9tICdEb2NIdG1sLmpzeCdcbmltcG9ydCBOb3RGb3VuZCBmcm9tICdOb3RGb3VuZC5qc3gnXG5cbmNvbnN0IGRvY1R5cGUgPSB7XG4gIG1kOiBEb2NNZCxcbiAgcGRmOiBEb2NQZGYsXG4gIGh0bWw6IERvY0h0bWwsXG59XG5cbmNvbnN0IERvYyA9ICh7IGxvY2F0aW9uOiB7IHBhdGhuYW1lOiBkb2NQYXRoIH0gfSkgPT4ge1xuICBjb25zdCBbZG9jRGlyLCBkb2NGaWxlXSA9IC9eKC4qKVxcLyhbXi9dKykkL2cuZXhlYyhkb2NQYXRoKS5zbGljZSgxKVxuICBjb25zdCBbZG9jTmFtZSwgZG9jRXh0XSA9IC9eKC4qKVxcLihbXi5dKykkL2cuZXhlYyhkb2NGaWxlKS5zbGljZSgxKVxuICBjb25zdCB7IFtkb2NFeHRdOiBEb2NDbGFzcyB9ID0gZG9jVHlwZVxuICByZXR1cm4gRG9jQ2xhc3MgPT0gbnVsbCA/IChcbiAgICA8Tm90Rm91bmQgcGFyYW1zPXt7c3BsYXQ6IGBkb2N1bWVudCAke2RvY1BhdGh9YH19IC8+XG4gICkgOiAoXG4gICAgPERvY0NsYXNzIGRvY0Rpcj17ZG9jRGlyfSBkb2NOYW1lPXtkb2NOYW1lfSBkb2NFeHQ9e2RvY0V4dH0gdGFnPXtkb2NOYW1lfSAvPlxuICApXG59XG5cbmV4cG9ydCBkZWZhdWx0IERvY1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuXG5jb25zdCBEb2NIdG1sID0gKHsgZG9jRGlyLCBkb2NOYW1lLCBkb2NFeHQgfSkgPT4ge1xuICBjb25zdCBzcmMgPSBgL2FwaS9maWxlJHtkb2NEaXJ9LyR7ZG9jTmFtZX0uJHtkb2NFeHR9YFxuICByZXR1cm4gKFxuICAgIDxpZnJhbWVcbiAgICAgIGhlaWdodD1cIjEwMCVcIlxuICAgICAgd2lkdGg9XCIxMDAlXCJcbiAgICAgIHNyYz17c3JjfVxuICAgIC8+XG4gIClcbn1cblxuZXhwb3J0IGRlZmF1bHQgRG9jSHRtbFxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuXG5jb25zdCBEb2NQZGYgPSAoeyBkb2NEaXIsIGRvY05hbWUsIGRvY0V4dCB9KSA9PiB7XG4gIGNvbnN0IGhyZWYgPSBgL2FwaS9maWxlJHtkb2NEaXJ9LyR7ZG9jTmFtZX0uJHtkb2NFeHR9YFxuICBjb25zdCBpT1MgPSAvaVBhZHxpUGhvbmV8aVBvZC8udGVzdChuYXZpZ2F0b3IudXNlckFnZW50KSAmJiAhd2luZG93Lk1TU3RyZWFtXG4gIHJldHVybiBpT1MgPyAoXG4gICAgPHA+XG4gICAgICA8YSB0YXJnZXQ9XCJfYmxhbmtcIiByZWw9XCJub29wZW5lciBub3JlZmVycmVyXCIgaHJlZj17aHJlZn0gPntkb2NOYW1lfTwvYT57JyAob3BlbiBwZGYgaW4gYSBuZXcgdGFiKSd9XG4gICAgPC9wPlxuICApIDogKFxuICAgIDxvYmplY3RcbiAgICAgIGhlaWdodD1cIjEwMCVcIlxuICAgICAgd2lkdGg9XCIxMDAlXCJcbiAgICAgIGRhdGE9e2hyZWZ9XG4gICAgICB0eXBlPVwiYXBwbGljYXRpb24vcGRmXCJcbiAgICA+XG4gICAgICA8YSB0YXJnZXQ9XCJfYmxhbmtcIiByZWw9XCJub29wZW5lciBub3JlZmVycmVyXCIgaHJlZj17aHJlZn0gPntkb2NOYW1lfTwvYT57JyAob3BlbiBwZGYgaW4gYSBuZXcgdGFiKSd9XG4gICAgPC9vYmplY3Q+XG4gIClcbn1cblxuZXhwb3J0IGRlZmF1bHQgRG9jUGRmXG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnXG5pbXBvcnQgeyBjaGFuZ2VGYWNldCwgZ2V0RmlsdGVyU2V0dGluZyB9IGZyb20gJ2ZpbHRlci5qcydcblxuY29uc3QgRmFjZXQgPSAoeyBmaWx0ZXJJZCwgdmFsdWVJZCwgdmFsdWVSZXAsIGZpbHRlclNldHRpbmcsIGhhbmRsZSB9KSA9PiB7XG4gIGNvbnN0IHsgW3ZhbHVlSWRdOiBpc09uIH0gPSBmaWx0ZXJTZXR0aW5nXG4gIHJldHVybiAoXG4gIDxzcGFuPlxuICAgIDxpbnB1dFxuICAgICAgdHlwZT1cImNoZWNrYm94XCJcbiAgICAgIGNoZWNrZWQ9e2lzT259XG4gICAgICBjbGFzc05hbWU9XCJmYWNldFwiXG4gICAgICBvbkNoYW5nZT17KCkgPT4gaGFuZGxlKGZpbHRlcklkLCB2YWx1ZUlkLCAhaXNPbil9XG4gICAgLz5cbiAgICB7YCAke3ZhbHVlUmVwfWB9XG4gIDwvc3Bhbj5cbilcbn1cblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChnZXRGaWx0ZXJTZXR0aW5nLCB7IGhhbmRsZTogY2hhbmdlRmFjZXQgfSkoRmFjZXQpXG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnXG5cbmltcG9ydCBGdWxsVGV4dCBmcm9tICdGdWxsVGV4dC5qc3gnXG5pbXBvcnQgQnlWYWx1ZSBmcm9tICdCeVZhbHVlLmpzeCdcbmltcG9ydCBFVU1hcCBmcm9tICdFVU1hcC5qc3gnXG5cbmltcG9ydCB7IGdldFRhYmxlRmlsdGVycyB9IGZyb20gJ3RhYmxlcy5qcydcblxuY29uc3QgZmlsdGVyQ2xhc3MgPSB7XG4gIEZ1bGxUZXh0LFxuICBFVU1hcCxcbiAgQnlWYWx1ZSxcbn1cblxuY29uc3QgRmlsdGVyID0gKHtcbiAgdGFibGVzLFxuICB0YWJsZSxcbiAgZmllbGRzLFxuICBmaWx0ZXJMaXN0LCBcbiAgZmlsdGVyZWRBbW91bnQsIGZpbHRlcmVkQW1vdW50T3RoZXJzLFxuICBhbW91bnRzLFxufSkgPT4gKFxuICA8ZGl2PlxuICAgIHtmaWx0ZXJMaXN0LmZpbHRlcih4ID0+IGZpZWxkc1t4LmZpZWxkXSkubWFwKChmaWx0ZXIsIGZpbHRlcklkKSA9PiB7XG4gICAgICBjb25zdCB7IHR5cGUgfSA9IGZpbHRlclxuICAgICAgY29uc3QgeyBbdHlwZV06IEZjbGFzcyB9ID0gZmlsdGVyQ2xhc3NcbiAgICAgIGlmIChmYWxzZSAmJiB0eXBlICE9ICdGdWxsVGV4dCcpIHtcbiAgICAgICAgcmV0dXJuIDxwIGtleT17ZmlsdGVySWR9Pnt0eXBlfTwvcD5cbiAgICAgIH1cbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxGY2xhc3NcbiAgICAgICAgICBrZXk9e2ZpbHRlcklkfVxuICAgICAgICAgIHRhYmxlPXt0YWJsZX1cbiAgICAgICAgICBmaWx0ZXJJZD17ZmlsdGVySWR9XG4gICAgICAgICAgZmlsdGVyRmllbGQ9e2ZpbHRlci5maWVsZH1cbiAgICAgICAgICBmaWx0ZXJMYWJlbD17ZmlsdGVyLmxhYmVsfVxuICAgICAgICAgIG1heENvbHM9e2ZpbHRlci5tYXhDb2xzfVxuICAgICAgICAgIGZpbHRlcmVkQW1vdW50PXtmaWx0ZXJlZEFtb3VudH1cbiAgICAgICAgICBmaWx0ZXJlZEFtb3VudE90aGVycz17ZmlsdGVyZWRBbW91bnRPdGhlcnNbZmlsdGVySWRdfVxuICAgICAgICAgIGFtb3VudHM9e2Ftb3VudHNbZmlsdGVySWRdfVxuICAgICAgICAgIGV4cGFuZGVkPXtmaWx0ZXIuZXhwYW5kZWR9XG4gICAgICAgIC8+XG4gICAgICApfVxuICAgICl9XG4gIDwvZGl2PlxuKVxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KGdldFRhYmxlRmlsdGVycykoRmlsdGVyKVxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4J1xuaW1wb3J0IFN0YXQgZnJvbSAnU3RhdC5qc3gnXG5pbXBvcnQgeyBjaGFuZ2VGdWxsdGV4dCwgZ2V0RmlsdGVyU2V0dGluZyB9IGZyb20gJ2ZpbHRlci5qcydcblxuXG5jb25zdCBGdWxsVGV4dCA9ICh7XG4gIGZpbHRlcklkLCBmaWx0ZXJGaWVsZCwgZmlsdGVyTGFiZWwsXG4gIGZpbHRlclNldHRpbmcsXG4gIGZpbHRlcmVkQW1vdW50LCBmaWx0ZXJlZEFtb3VudE90aGVycyxcbiAgaGFuZGxlLFxufSkgPT4gKFxuICA8ZGl2PlxuICAgIDxwIHRpdGxlPXtgU2VhcmNoIGluICR7ZmlsdGVyRmllbGR9YH0gPlxuICAgICAgPGlucHV0XG4gICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgY2xhc3NOYW1lPVwic2VhcmNoXCJcbiAgICAgICAgcGxhY2Vob2xkZXI9e2BzZWFyY2ggaW4gJHtmaWx0ZXJMYWJlbH1gfVxuICAgICAgICB2YWx1ZT17ZmlsdGVyU2V0dGluZ31cbiAgICAgICAgb25DaGFuZ2U9e2V2ZW50ID0+IGhhbmRsZShmaWx0ZXJJZCwgZXZlbnQudGFyZ2V0LnZhbHVlKX1cbiAgICAgIC8+eycgJ31cbiAgICAgIDxTdGF0IHN1YlRvdGFsPXtmaWx0ZXJlZEFtb3VudH0gdG90YWw9e2ZpbHRlcmVkQW1vdW50T3RoZXJzfSAvPlxuICAgIDwvcD5cbiAgPC9kaXY+XG4pXG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QoZ2V0RmlsdGVyU2V0dGluZywgeyBoYW5kbGU6IGNoYW5nZUZ1bGx0ZXh0IH0pKEZ1bGxUZXh0KVxuIiwiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4J1xuaW1wb3J0IHsgY29tYmluZVNlbGVjdG9ycyB9IGZyb20gJ3JlZHVjZXJzLmpzJ1xuaW1wb3J0IHsgZ2V0VXNlciwgZ2V0Q291bnRyeSB9IGZyb20gJ3RhYmxlcy5qcydcblxuY29uc3QgdHJpbURhdGUgPSB0ZXh0ID0+ICgodGV4dCA9PSBudWxsKSA/ICcnIDogdGV4dC5yZXBsYWNlKC9cXC5bMC05XSsvLCAnJykpXG5cbmNvbnN0IHVzZXJBc1N0cmluZyA9ICh7IF9pZDogdmFsSWQgfSwgdXNlcikgPT4ge1xuICBsZXQgdmFsUmVwXG4gIGNvbnN0IHsgZW50aXRpZXM6IHsgW3ZhbElkXTogZW50aXR5IH0gfSA9IHVzZXJcbiAgaWYgKGVudGl0eSkge1xuICAgIGNvbnN0IHsgdmFsdWVzOiB7IGVwcG4sIGZpcnN0TmFtZSwgbGFzdE5hbWUsIGVtYWlsUHJlLCBhdXRob3JpdHksIG1heUxvZ2luIH0gfSA9IGVudGl0eVxuICAgIGNvbnN0IGVtYWlsID0gZW1haWxQcmUgfHwgJydcbiAgICBsZXQgbGlua1RleHQgPSBbZmlyc3ROYW1lIHx8ICcnLCBsYXN0TmFtZSB8fCAnJ10uZmlsdGVyKHggPT4geCkuam9pbignICcpXG4gICAgaWYgKGxpbmtUZXh0ID09ICcnKSB7bGlua1RleHQgPSBlbWFpbH1cbiAgICBjb25zdCBuYW1lUGFydCA9IChsaW5rVGV4dCAmJiBlbWFpbCkgPyAoXG4gICAgICBgWyR7bGlua1RleHR9XShtYWlsdG86JHtlbWFpbH0pYFxuICAgICkgOiAoXG4gICAgICBsaW5rVGV4dCArIGVtYWlsXG4gICAgKVxuICAgIGNvbnN0IGVwcG5QYXJ0ID0gZXBwbiA/IGAgZXBwbj0ke2VwcG59IGAgOiAnJ1xuICAgIGNvbnN0IGF1dGhvcml0eVBhcnQgPSBhdXRob3JpdHkgPyBgIGF1dGhlbnRpY2F0ZWQgYnk9JHthdXRob3JpdHl9IGAgOiAnJ1xuICAgIGNvbnN0IG1heUxvZ2luUGFydCA9IG1heUxvZ2luID8gYCBhY3RpdmU9JHttYXlMb2dpbn0gYCA6ICcnXG4gICAgdmFsUmVwID0gW25hbWVQYXJ0LCBlcHBuUGFydCwgYXV0aG9yaXR5UGFydCwgbWF5TG9naW5QYXJ0XS5maWx0ZXIoeCA9PiB4KS5qb2luKCc7ICcpXG4gIH1cbiAgZWxzZSB7XG4gICAgdmFsUmVwID0gJ1VOS05PV04nXG4gIH1cbiAgcmV0dXJuIHZhbFJlcFxufVxuXG5jb25zdCBjb3VudHJ5QXNTdHJpbmcgPSAoeyBfaWQ6IHZhbElkIH0sIGNvdW50cnkpID0+IHtcbiAgY29uc3QgeyBlbnRpdGllczogeyBbdmFsSWRdOiBlbnRpdHkgfSB9ID0gY291bnRyeVxuICBpZiAoZW50aXR5KSB7XG4gICAgY29uc3QgeyB2YWx1ZXM6IHsgbmFtZSwgaXNvIH0gfSA9IGVudGl0eVxuICAgIHJldHVybiBgJHtpc299OiAke25hbWV9YFxuICB9XG4gIGVsc2Uge1xuICAgIHJldHVybiAnVU5LTk9XTidcbiAgfVxufVxuXG5jb25zdCB2YWx1ZUFzU3RyaW5nID0gKHZhbHVlLCB7IHZhbFR5cGUsIGNvbnZlcnQsIGluaXRpYWwsIHVzZXIsIGNvdW50cnkgfSkgPT4ge1xuICBpZiAodmFsdWUgPT0gbnVsbCkge3JldHVybiAnJ31cbiAgc3dpdGNoICh2YWxUeXBlKSB7XG4gICAgY2FzZSAncmVsJzoge1xuICAgICAgc3dpdGNoIChjb252ZXJ0KSB7XG4gICAgICAgIGNhc2UgJ3VzZXInOiB7XG4gICAgICAgICAgcmV0dXJuIHVzZXJBc1N0cmluZyh2YWx1ZSwgdXNlcilcbiAgICAgICAgfVxuICAgICAgICBjYXNlICdjb3VudHJ5Jzoge1xuICAgICAgICAgIHJldHVybiBjb3VudHJ5QXNTdHJpbmcodmFsdWUsIGNvdW50cnkpXG4gICAgICAgIH1cbiAgICAgICAgZGVmYXVsdDogcmV0dXJuIHZhbHVlLnZhbHVlXG4gICAgICB9XG4gICAgfVxuICAgIGNhc2UgJ2RhdGV0aW1lJzoge1xuICAgICAgcmV0dXJuIHRyaW1EYXRlKHZhbHVlKVxuICAgIH1cbiAgICBkZWZhdWx0OiB7XG4gICAgICByZXR1cm4gdmFsdWVcbiAgICB9XG4gIH1cbn1cblxuY29uc3QgSXRlbUZpZWxkID0gKHsgbGFiZWwsIHZhbHVlcywgdmFsVHlwZSwgY29udmVydCwgaW5pdGlhbCwgdXNlciwgY291bnRyeSB9KSA9PiB7XG4gIGNvbnN0IHByb3BzID0geyB2YWxUeXBlLCBjb252ZXJ0LCBpbml0aWFsLCB1c2VyLCBjb3VudHJ5IH1cbiAgcmV0dXJuIChcbiAgICA8cD5cbiAgICAgIDxsYWJlbD48Yj57bGFiZWx9OjwvYj48L2xhYmVsPnsnICd9XG4gICAgICB7XG4gICAgICAgIHZhbHVlcy5tYXAoKHZhbHVlLCBpKSA9PiAoXG4gICAgICAgICAgPHNwYW4ga2V5PXtpfT57KGkgIT0gMCk/JyB8ICcgOiAnJ308c3Bhbj57dmFsdWVBc1N0cmluZyh2YWx1ZSwgcHJvcHMpfTwvc3Bhbj48L3NwYW4+XG4gICAgICAgICkpXG4gICAgICB9XG4gICAgPC9wPlxuICApXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QoY29tYmluZVNlbGVjdG9ycyhnZXRVc2VyLCBnZXRDb3VudHJ5KSkoSXRlbUZpZWxkKVxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IEFsdGVybmF0aXZlIGZyb20gJ0FsdGVybmF0aXZlLmpzeCdcbmltcG9ydCBJdGVtUmVjb3JkIGZyb20gJ0l0ZW1SZWNvcmQuanN4J1xuaW1wb3J0IE5hdkxpbmsgZnJvbSAnTmF2TGluay5qc3gnXG5cbmNvbnN0IEl0ZW1IZWFkID0gKHsgdGFibGUsIHZhbHVlcywgdGl0bGUsIGlucGxhY2UgfSkgPT4ge1xuICBjb25zdCB7IF9pZDogZUlkLCBbdGl0bGVdOiBlbnRpdHlIZWFkUHJlIH0gPSB2YWx1ZXNcbiAgbGV0IGVudGl0eUhlYWRcbiAgaWYgKCFlbnRpdHlIZWFkUHJlKSB7ZW50aXR5SGVhZCA9ICctZW1wdHktJ31cbiAgZWxzZSB7XG4gICAgW2VudGl0eUhlYWRdID0gZW50aXR5SGVhZFByZVxuICAgIGlmICh0eXBlb2YgZW50aXR5SGVhZCA9PSAnb2JqZWN0Jykge1xuICAgICAgY29uc3QgeyB2YWx1ZSB9ID0gZW50aXR5SGVhZFxuICAgICAgZW50aXR5SGVhZCA9IHZhbHVlXG4gICAgfVxuICB9XG5cbiAgY29uc3QgY29udHJvbDEgPSBoYW5kbGVyID0+ICg8c3BhbiBjbGFzc05hbWU9XCJidXR0b24tc21hbGwgZmEgZmEtY2hldnJvbi1kb3duXCIgb25DbGljaz17aGFuZGxlcn0gLz4pXG4gIGNvbnN0IGNvbnRyb2wyID0gaGFuZGxlciA9PiAoPHNwYW4gY2xhc3NOYW1lPVwiYnV0dG9uLXNtYWxsIGZhIGZhLWNoZXZyb24tcmlnaHRcIiBvbkNsaWNrPXtoYW5kbGVyfSAvPilcbiAgY29uc3QgY29udHJvbFBsYWNlbWVudCA9IGNvbnRyb2wgPT4gKFxuICAgIDxwPlxuICAgICAge2NvbnRyb2x9XG4gICAgICA8c3Bhbj5cbiAgICAgICAge2VudGl0eUhlYWR9XG4gICAgICA8L3NwYW4+XG4gICAgPC9wPlxuICApXG5cbiAgcmV0dXJuIChcbiAgICA8dHIgaWQ9e2VJZH0gPlxuICAgICAgPHRkPntcbiAgICAgICAgaW5wbGFjZSA/IChcbiAgICAgICAgICA8QWx0ZXJuYXRpdmVcbiAgICAgICAgICAgIHRhZz17YCR7dGFibGV9XyR7ZUlkfWB9XG4gICAgICAgICAgICBjb250cm9sUGxhY2VtZW50PXtjb250cm9sUGxhY2VtZW50fVxuICAgICAgICAgICAgY29udHJvbHM9e1tjb250cm9sMSwgY29udHJvbDJdfVxuICAgICAgICAgICAgYWx0ZXJuYXRpdmVzPXtbKFxuICAgICAgICAgICAgICA8SXRlbVJlY29yZFxuICAgICAgICAgICAgICAgIGtleT1cInNob3dcIlxuICAgICAgICAgICAgICAgIHRhYmxlPXt0YWJsZX1cbiAgICAgICAgICAgICAgICBlSWQ9e2VJZH1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICksICcnXX1cbiAgICAgICAgICAgIGluaXRpYWw9ezF9XG4gICAgICAgICAgLz5cbiAgICAgICAgKSA6IChcbiAgICAgICAgICA8TmF2TGluayBjbGFzc05hbWU9XCJuYXZcIiB0bz17YC8ke3RhYmxlfS9teWxpc3QvJHtlSWR9YH0gPlxuICAgICAgICAgICAgPHNwYW4+XG4gICAgICAgICAgICAgIHtlbnRpdHlIZWFkfVxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgIDwvTmF2TGluaz5cbiAgICAgICAgKVxuICAgICAgfVxuICAgICAgPC90ZD5cbiAgICA8L3RyPlxuICApXG59XG5cbmV4cG9ydCBkZWZhdWx0IEl0ZW1IZWFkXG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnXG5pbXBvcnQgSXRlbUhlYWQgZnJvbSAnSXRlbUhlYWQuanN4J1xuaW1wb3J0IHsgZ2V0VGFibGVzIH0gZnJvbSAndGFibGVzLmpzJ1xuXG5jb25zdCBJdGVtTGlzdCA9ICh7IHRhYmxlcywgdGFibGUsIHRpdGxlLCBmaWx0ZXJlZERhdGEsIGlucGxhY2UgfSkgPT4ge1xuICBjb25zdCB7IFt0YWJsZV06IHsgZW50aXRpZXMgfSB9ID0gdGFibGVzIFxuICByZXR1cm4gKFxuICAgIDxkaXY+XG4gICAgICA8dGFibGU+XG4gICAgICAgIDx0Ym9keT57XG4gICAgICAgIGZpbHRlcmVkRGF0YS5tYXAoZUlkID0+IHtcbiAgICAgICAgICBjb25zdCB7IHZhbHVlcyB9ID0gZW50aXRpZXNbZUlkXVxuICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8SXRlbUhlYWQga2V5PXtlSWR9IHRhYmxlPXt0YWJsZX0gdGl0bGU9e3RpdGxlfSB2YWx1ZXM9e3ZhbHVlc30gaW5wbGFjZT17aW5wbGFjZX0gLz5cbiAgICAgICAgICApXG4gICAgICAgIH0pXG4gICAgICAgIH08L3Rib2R5PlxuICAgICAgPC90YWJsZT5cbiAgICA8L2Rpdj5cbiAgKVxufVxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KGdldFRhYmxlcykoSXRlbUxpc3QpXG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5cbmltcG9ydCBJdGVtUmVjb3JkIGZyb20gJ0l0ZW1SZWNvcmQuanN4J1xuXG5jb25zdCBJdGVtUmVjb3JkUHJlID0gKHsgcGFyYW1zOiB7IHRhYmxlLCBlSWQgfSwgcm91dGU6IHsgb3duT25seSB9IH0pID0+IChcbiAgPEl0ZW1SZWNvcmQgdGFibGU9e3RhYmxlfSBlSWQ9e2VJZH0gb3duT25seT17b3duT25seX0gLz5cbilcblxuZXhwb3J0IGRlZmF1bHQgSXRlbVJlY29yZFByZVxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgTGluayB9IGZyb20gJ3JlYWN0LXJvdXRlcidcblxuY29uc3QgTmF2TGluayA9IHByb3BzID0+IDxMaW5rIHsuLi5wcm9wc30gYWN0aXZlQ2xhc3NOYW1lPVwiYWN0aXZlXCIgLz5cblxuZXhwb3J0IGRlZmF1bHQgTmF2TGlua1xuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuXG5jb25zdCBOb3RGb3VuZCA9ICh7cGFyYW1zOiB7IHNwbGF0IH0gfSkgPT4gKDxoMT57JzQwNDogJ308Y29kZT57c3BsYXR9PC9jb2RlPnsnIG5vdCBmb3VuZCBvbiB0aGlzIHNpdGUuJ308L2gxPilcblxuZXhwb3J0IGRlZmF1bHQgTm90Rm91bmRcblxuIiwiaW1wb3J0IFJlYWN0LCB7Q29tcG9uZW50fSBmcm9tICdyZWFjdCdcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCdcbmltcG9ydCB7IGdldFdpbkRpbSwgY29sdW1uU3R5bGUgfSBmcm9tICd3aW4uanMnXG5cbmNvbnN0IFBhbmUgPSAoeyBmb3JtYXQsIHBvc2l0aW9uLCBjaGlsZHJlbiwgaGVpZ2h0LCB3aWR0aCB9KSA9PiAoXG4gIDxkaXZcbiAgICBjbGFzc05hbWU9e2Zvcm1hdH1cbiAgICBzdHlsZT17Y29sdW1uU3R5bGUocG9zaXRpb24sIHsgaGVpZ2h0LCB3aWR0aCB9KX1cbiAgPlxuICAgIHtjaGlsZHJlbn1cbiAgPC9kaXY+XG4pXG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QoZ2V0V2luRGltKShQYW5lKVxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgUHJvdmlkZXIgfSBmcm9tICdyZWFjdC1yZWR1eCdcbmltcG9ydCBXaW5kb3cgZnJvbSAnV2luZG93LmpzeCdcblxuY29uc3QgUm9vdCA9ICh7IHN0b3JlLCBjaGlsZHJlbiB9KSA9PiAoXG4gIDxQcm92aWRlciBzdG9yZT17c3RvcmV9PlxuICAgIDxXaW5kb3c+XG4gICAgICB7Y2hpbGRyZW59XG4gICAgPC9XaW5kb3c+XG4gIDwvUHJvdmlkZXI+XG4pXG5cbmV4cG9ydCBkZWZhdWx0IFJvb3RcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcblxuY29uc3QgU3RhdCA9ICh7c3ViVG90YWwsIHRvdGFsfSkgPT4gKFxuICA8c3BhbiBjbGFzc05hbWU9XCJnb29kLW9cIiA+XG4gICAge3N1YlRvdGFsID09IG51bGwgPyAnJyA6IGAke3N1YlRvdGFsfWB9XG4gICAgeyh0b3RhbCA9PSBudWxsIHx8IHN1YlRvdGFsID09IG51bGwpID8gJycgOiAnIG9mICd9XG4gICAgPHN0cm9uZz57dG90YWwgPT0gbnVsbCA/ICcnIDogYCR7dG90YWx9YH08L3N0cm9uZz5cbiAgPC9zcGFuPlxuKVxuXG5leHBvcnQgZGVmYXVsdCBTdGF0XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgTmF2TGluayBmcm9tICdOYXZMaW5rLmpzeCdcblxuY29uc3QgU3RhdGljID0gKCkgPT4gKFxuICA8c3BhbiBjbGFzc05hbWU9XCJzbWFsbFwiID5cbiAgICA8TmF2TGluayB0bz1cIi9kb2NzL2Fib3V0Lm1kXCIgPnsnQWJvdXQnfTwvTmF2TGluaz5cbiAgICA8TmF2TGluayB0bz1cIi90ZWNoL2RvY3MvZGVzaWduLnBkZlwiID57J2RpYWdyYW1zJ308L05hdkxpbms+XG4gICAgPE5hdkxpbmsgdG89XCIvdGVjaC9kb2NzL2RlcGxveS5tZFwiID57J2RlcGxveSd9PC9OYXZMaW5rPlxuICAgIDxhIGhyZWY9XCIvYXBpL2ZpbGUvdGVjaC9kb2NzL2dlbi9pbmRleC5odG1sXCIgdGFyZ2V0PVwiX2JsYW5rXCIgcmVsPVwibm9vcGVuZXIgbm9yZWZlcnJlclwiID57J3RlY2ggZG9jJ308L2E+XG4gIDwvc3Bhbj5cbilcblxuZXhwb3J0IGRlZmF1bHQgU3RhdGljXG5cbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCdcbmltcG9ydCBOYXZMaW5rIGZyb20gJ05hdkxpbmsuanN4J1xuaW1wb3J0IFBhbmUgZnJvbSAnUGFuZS5qc3gnXG5pbXBvcnQgeyBnZXRXaW5EaW0gfSBmcm9tICd3aW4uanMnXG5cbmNvbnN0IFN1YkFwcCA9ICh7cGFyYW1zOiB7IHRhYmxlIH0sIGNoaWxkcmVuLCBoZWlnaHQsIHdpZHRoIH0pID0+IChcbiAgPGRpdj5cbiAgICA8UGFuZSBmb3JtYXQ9XCJuYXYgc2l6ZWRcIiBwb3NpdGlvbj1cImxlZnRcIj5cbiAgICAgIHsodGFibGUgPT0gJ2NvbnRyaWInKSA/IChcbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8cD48TmF2TGluayB0bz17YC8ke3RhYmxlfS9saXN0YH0gPnsnQWxsIGl0ZW1zJ308L05hdkxpbms+PC9wPlxuICAgICAgICAgIDxwPjxOYXZMaW5rIHRvPXtgLyR7dGFibGV9L215bGlzdGB9ID57J015IHdvcmsnfTwvTmF2TGluaz48L3A+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKSA6IChcbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8cD48TmF2TGluayB0bz17YC8ke3RhYmxlfS90eXBlYH0gPnsnVHlwZXMnfTwvTmF2TGluaz48L3A+XG4gICAgICAgICAgPHA+PE5hdkxpbmsgdG89e2AvJHt0YWJsZX0vYXNzZXNzYH0gPnsnQ3JpdGVyaWEnfTwvTmF2TGluaz48L3A+XG4gICAgICAgICAgPHA+PE5hdkxpbmsgdG89e2AvJHt0YWJsZX0vcGFja2FnZWB9ID57J1BhY2thZ2VzJ308L05hdkxpbms+PC9wPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICl9XG4gICAgPC9QYW5lPlxuICAgIDxQYW5lIGZvcm1hdD1cInNpemVkXCIgcG9zaXRpb249XCJyaWdodFwiPlxuICAgICAgeyBjaGlsZHJlbiB9XG4gICAgPC9QYW5lPlxuICA8L2Rpdj5cbilcblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChnZXRXaW5EaW0pKFN1YkFwcClcbiIsImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCdcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCdcbmltcG9ydCB7IGdldEFsdCwgbmV4dEFsdCB9IGZyb20gJ2FsdGVyLmpzJ1xuXG5jb25zdCBoYW5kbGVOZXh0ID0gKHsgdGFnLCBhbHRlcm5hdGl2ZXMsIGluaXRpYWwsIG5leHQgfSkgPT4gZXZlbnQgPT4ge1xuICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICBuZXh0KHRhZywgYWx0ZXJuYXRpdmVzLmxlbmd0aCwgaW5pdGlhbClcbn1cblxuY29uc3QgQWx0ZXJuYXRpdmUgPSAoeyBjb250cm9sUGxhY2VtZW50LCBjb250cm9scywgYWx0LCBhbHRlcm5hdGl2ZXMsIC4uLnJlc3QgfSkgPT4gKFxuICA8ZGl2PlxuICAgIHtjb250cm9sUGxhY2VtZW50KGNvbnRyb2xzW2FsdF0oaGFuZGxlTmV4dCh7IGFsdGVybmF0aXZlcywgLi4ucmVzdCB9KSkpfVxuICAgIHthbHRlcm5hdGl2ZXNbYWx0XX1cbiAgPC9kaXY+XG4pXG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QoZ2V0QWx0LCB7IG5leHQ6IG5leHRBbHQgfSkoQWx0ZXJuYXRpdmUpXG4iLCJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4J1xuaW1wb3J0IE1hcmtkb3duIGZyb20gJ3JlYWN0LW1hcmtkb3duJ1xuaW1wb3J0IHsgTGluayB9IGZyb20gJ3JlYWN0LXJvdXRlcidcbmltcG9ydCBBbHRlcm5hdGl2ZSBmcm9tICdBbHRlcm5hdGl2ZS5qc3gnXG5pbXBvcnQgeyBmZXRjaERhdGEgfSBmcm9tICdzZXJ2ZXIuanMnXG5pbXBvcnQgeyBnZXREb2MgfSBmcm9tICdkb2MuanMnXG5cbmNvbnN0IFJvdXRlckxpbmsgPSAoeyBjaGlsZHJlbiwgaHJlZiB9KSA9PiAoXG4gIGhyZWYubWF0Y2goL14oaHR0cHM/Oik/XFwvXFwvLylcbiAgICA/IDxhIGhyZWY9e2hyZWZ9ID57Y2hpbGRyZW59PC9hPlxuICAgIDogPExpbmsgdG89e2hyZWZ9ID57Y2hpbGRyZW59PC9MaW5rPlxuKVxuXG5jbGFzcyBEb2NNZCBleHRlbmRzIENvbXBvbmVudCB7XG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7cHJvcHM6IHsgZG9jTmFtZSwgZGF0YSB9IH0gPSB0aGlzXG4gICAgY29uc3QgY29udHJvbFBsYWNlbWVudCA9IGNvbnRyb2wgPT4gPHAgc3R5bGU9e3tmbG9hdDogJ3JpZ2h0J319ID57Y29udHJvbH08L3A+XG4gICAgY29uc3QgY29udHJvbDEgPSBoYW5kbGVyID0+IDxhIGNsYXNzTmFtZT1cImNvbnRyb2wgZmEgZmEtaGFuZC1vLWRvd25cIiBocmVmPVwiI1wiIHRpdGxlPVwibWFya2Rvd24gc291cmNlXCIgb25DbGljaz17aGFuZGxlcn0gLz5cbiAgICBjb25zdCBjb250cm9sMiA9IGhhbmRsZXIgPT4gPGEgY2xhc3NOYW1lPVwiY29udHJvbCBmYSBmYS1maWxlLWNvZGUtb1wiIGhyZWY9XCIjXCIgdGl0bGU9XCJmb3JtYXR0ZWRcIiBvbkNsaWNrPXtoYW5kbGVyfSAvPlxuXG4gICAgaWYgKGRhdGEgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIDxkaXY+e2BObyBkb2N1bWVudCAke2RvY05hbWV9YH08L2Rpdj5cbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgc3R5bGU9e3twYWRkaW5nTGVmdDogJzAuNWVtJ319ID5cbiAgICAgICAgPEFsdGVybmF0aXZlXG4gICAgICAgICAgdGFnPXtkb2NOYW1lfVxuICAgICAgICAgIGNvbnRyb2xQbGFjZW1lbnQ9e2NvbnRyb2xQbGFjZW1lbnR9XG4gICAgICAgICAgY29udHJvbHM9e1tjb250cm9sMSwgY29udHJvbDJdfVxuICAgICAgICAgIGFsdGVybmF0aXZlcz17WyhcbiAgICAgICAgICAgIDxkaXYga2V5PVwiZm10XCIgPlxuICAgICAgICAgICAgICA8TWFya2Rvd25cbiAgICAgICAgICAgICAgICBzb3VyY2U9e2RhdGF9XG4gICAgICAgICAgICAgICAgcmVuZGVyZXJzPXt7TGluazogUm91dGVyTGlua319XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApLCAoXG4gICAgICAgICAgICA8ZGl2IGtleT1cInNyY1wiID5cbiAgICAgICAgICAgICAgPHByZSBjbGFzc05hbWU9XCJtZC1zb3VyY2VcIiA+e2RhdGF9PC9wcmU+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApXX1cbiAgICAgICAgLz5cbiAgICAgIDwvZGl2PlxuICAgIClcbiAgfVxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICBjb25zdCB7cHJvcHM6IHsgZG9jRGlyLCBkb2NOYW1lLCBkb2NFeHQsIGZldGNoIH0gfSA9IHRoaXNcbiAgICBjb25zdCBwYXRoID0gYCR7ZG9jRGlyfS8ke2RvY05hbWV9LiR7ZG9jRXh0fWBcbiAgICBmZXRjaCh7IHR5cGU6ICdmZXRjaERvYycsIGNvbnRlbnRUeXBlOiAnanNvbicsIHBhdGgsIGRlc2M6IGBkb2N1bWVudCAke2RvY05hbWV9YCB9KVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QoZ2V0RG9jLCB7IGZldGNoOiBmZXRjaERhdGEgfSkoRG9jTWQpXG4iLCJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnXG5pbXBvcnQgSXRlbUxpc3QgZnJvbSAnSXRlbUxpc3QuanN4J1xuaW1wb3J0IEZpbHRlciBmcm9tICdGaWx0ZXIuanN4J1xuaW1wb3J0IFBhbmUgZnJvbSAnUGFuZS5qc3gnXG5cbmltcG9ydCB7IHNldHVwRmlsdGVyaW5nLCBnZXRGaWx0ZXJBcHBsaWVkIH0gZnJvbSAnZmlsdGVyLmpzJ1xuXG5jbGFzcyBGaWx0ZXJDb21wdXRlIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcigpXG4gICAgY29uc3QgeyB0YWJsZXMsIHRhYmxlLCBpbml0aWFsaXplZCwgaW5pdCB9ID0gcHJvcHNcbiAgICBpZiAoIWluaXRpYWxpemVkKSB7aW5pdCh0YWJsZSwgdGFibGVzKX1cbiAgfVxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBwcm9wczogeyBpbml0aWFsaXplZCB9IH0gPSB0aGlzXG4gICAgaWYgKCFpbml0aWFsaXplZCkge3JldHVybiA8ZGl2Lz59XG4gICAgY29uc3QgeyBwcm9wczogeyB0YWJsZXMsIHRhYmxlLCBmaWx0ZXJlZERhdGEsIGZpbHRlcmVkQW1vdW50T3RoZXJzLCBhbW91bnRzfSB9ID0gdGhpc1xuICAgIGNvbnN0IHsgW3RhYmxlXTogeyBvcmRlciwgdGl0bGUgfSB9ID0gdGFibGVzXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIDxQYW5lIGZvcm1hdD1cInNpemVkXCIgcG9zaXRpb249XCJyaWdodExlZnRcIj5cbiAgICAgICAgICA8cD57J1RvdGFsICd9PHNwYW4gY2xhc3NOYW1lPVwiZ29vZC1vXCIgPntvcmRlci5sZW5ndGh9PC9zcGFuPjwvcD5cbiAgICAgICAgICA8RmlsdGVyXG4gICAgICAgICAgICB0YWJsZT17dGFibGV9XG4gICAgICAgICAgICBmaWx0ZXJlZEFtb3VudD17ZmlsdGVyZWREYXRhLmxlbmd0aH1cbiAgICAgICAgICAgIGZpbHRlcmVkQW1vdW50T3RoZXJzPXtmaWx0ZXJlZEFtb3VudE90aGVyc31cbiAgICAgICAgICAgIGFtb3VudHM9e2Ftb3VudHN9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9QYW5lPlxuICAgICAgICA8UGFuZSBmb3JtYXQ9XCJzaXplZFwiIHBvc2l0aW9uPVwicmlnaHRSaWdodFwiPlxuICAgICAgICAgIDxJdGVtTGlzdCB0YWJsZT17dGFibGV9IHRpdGxlPXt0aXRsZX0gZmlsdGVyZWREYXRhPXtmaWx0ZXJlZERhdGF9IGlucGxhY2U9e3RydWV9IC8+XG4gICAgICAgIDwvUGFuZT5cbiAgICAgIDwvZGl2PlxuICAgIClcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KGdldEZpbHRlckFwcGxpZWQsIHsgaW5pdDogc2V0dXBGaWx0ZXJpbmcgfSkoRmlsdGVyQ29tcHV0ZSlcbiIsImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCdcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCdcblxuaW1wb3J0IEZpbHRlckNvbXB1dGUgZnJvbSAnRmlsdGVyQ29tcHV0ZS5qc3gnXG5pbXBvcnQgeyBmZXRjaERhdGEgfSBmcm9tICdzZXJ2ZXIuanMnXG5pbXBvcnQgeyBnZXRUYWJsZXMgfSBmcm9tICd0YWJsZXMuanMnXG5cbmNsYXNzIEl0ZW1GaWx0ZXJlZCBleHRlbmRzIENvbXBvbmVudCB7XG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IHByb3BzOiB7IHBhcmFtczogeyB0YWJsZSB9LCB0YWJsZXMgfSB9ID0gdGhpc1xuICAgIGlmICh0YWJsZXMgPT0gbnVsbCB8fCB0YWJsZXNbdGFibGVdID09IG51bGwgfHwgdGFibGVzLmNvdW50cnkgPT0gbnVsbCB8fCB0YWJsZXMudXNlciA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gPGRpdiAvPlxuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgPEZpbHRlckNvbXB1dGUgdGFibGU9e3RhYmxlfSAvPlxuICAgIClcbiAgfVxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICBjb25zdCB7IHByb3BzOiB7IHBhcmFtczogeyB0YWJsZSB9LCB0YWJsZXMsIGZldGNoLCB9IH0gPSB0aGlzXG4gICAgaWYgKHRhYmxlcyA9PSBudWxsIHx8IHRhYmxlc1t0YWJsZV0gPT0gbnVsbCkge1xuICAgICAgZmV0Y2goeyB0eXBlOiAnZmV0Y2hUYWJsZScsIGNvbnRlbnRUeXBlOiAnZGInLCBwYXRoOiBgL2xpc3Q/dGFibGU9JHt0YWJsZX1gLCBkZXNjOiBgJHt0YWJsZX0gdGFibGV9YCwgdGFibGUgfSlcbiAgICB9XG4gICAgaWYgKHRhYmxlcyA9PSBudWxsIHx8IHRhYmxlcy5jb3VudHJ5ID09IG51bGwpIHtcbiAgICAgIGZldGNoKHsgdHlwZTogJ2ZldGNoVGFibGUnLCBjb250ZW50VHlwZTogJ2RiJywgcGF0aDogYC9tZW1iZXJfY291bnRyeWAsIGRlc2M6IGBjb3VudHJ5IHRhYmxlfWAsIHRhYmxlOiAnY291bnRyeScgfSlcbiAgICB9XG4gICAgaWYgKHRhYmxlcyA9PSBudWxsIHx8IHRhYmxlcy51c2VyID09IG51bGwpIHtcbiAgICAgIGZldGNoKHsgdHlwZTogJ2ZldGNoVGFibGUnLCBjb250ZW50VHlwZTogJ2RiJywgcGF0aDogYC91c2VyYCwgZGVzYzogYHVzZXIgdGFibGV9YCwgdGFibGU6ICd1c2VyJyB9KVxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KGdldFRhYmxlcywgeyBmZXRjaDogZmV0Y2hEYXRhIH0pKEl0ZW1GaWx0ZXJlZClcbiIsImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCdcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCdcbmltcG9ydCB7IGZldGNoRGF0YSB9IGZyb20gJ3NlcnZlci5qcydcbmltcG9ydCB7IGdldFRhYmxlcyB9IGZyb20gJ3RhYmxlcy5qcydcblxuaW1wb3J0IEl0ZW1MaXN0IGZyb20gJ0l0ZW1MaXN0LmpzeCdcbmltcG9ydCBQYW5lIGZyb20gJ1BhbmUuanN4J1xuXG5jbGFzcyBJdGVtTXkgZXh0ZW5kcyBDb21wb25lbnQge1xuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge1xuICAgICAgcHJvcHM6IHsgcGFyYW1zOiB7IHRhYmxlIH0sIHRhYmxlcywgY2hpbGRyZW4gfSxcbiAgICB9ID0gdGhpc1xuICAgIGlmIChcbiAgICAgIHRhYmxlcyA9PSBudWxsIHx8IHRhYmxlc1t0YWJsZV0gPT0gbnVsbCB8fCB0YWJsZXNbdGFibGVdLm15ID09IG51bGwgfHxcbiAgICAgIHRhYmxlcy5jb3VudHJ5ID09IG51bGwgfHwgdGFibGVzLnVzZXIgPT0gbnVsbFxuICAgICkge1xuICAgICAgcmV0dXJuIDxkaXYgLz5cbiAgICB9XG4gICAgY29uc3QgeyBlbnRpdGllcywgdGl0bGUsIHBlcm0sIG15IH0gPSB0YWJsZXNbdGFibGVdXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIDxQYW5lIGZvcm1hdD1cIm5hdiBzaXplZFwiIHBvc2l0aW9uPVwicmlnaHRMZWZ0TmF2XCI+XG4gICAgICAgICAgPHA+XG4gICAgICAgICAgICB7YCR7bXkubGVuZ3RofSBpdGVtcyBgfVxuICAgICAgICAgICAgeyhwZXJtICE9IG51bGwgJiYgcGVybS5pbnNlcnQpID8gKFxuICAgICAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZhIGZhLXBsdXMgYnV0dG9uLWxhcmdlIGluc2VydFwiXG4gICAgICAgICAgICAgICAgdGl0bGU9XCJOZXcgaXRlbVwiXG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICApIDogbnVsbH1cbiAgICAgICAgICA8L3A+XG4gICAgICAgICAgPEl0ZW1MaXN0IHRhYmxlPXt0YWJsZX0gdGl0bGU9e3RpdGxlfSBmaWx0ZXJlZERhdGE9e215fSBpbnBsYWNlPXtmYWxzZX0gLz5cbiAgICAgICAgPC9QYW5lPlxuICAgICAgICA8UGFuZSBmb3JtYXQ9XCJzaXplZFwiIHBvc2l0aW9uPVwicmlnaHRSaWdodEJvZHlcIj5cbiAgICAgICAgICB7IGNoaWxkcmVuIH1cbiAgICAgICAgPC9QYW5lPlxuICAgICAgPC9kaXY+XG4gICAgKVxuICB9XG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIGNvbnN0IHtcbiAgICAgIHByb3BzOiB7XG4gICAgICAgIHBhcmFtczogeyB0YWJsZSB9LFxuICAgICAgICB0YWJsZXMsXG4gICAgICAgIGZldGNoLFxuICAgICAgfSxcbiAgICB9ID0gdGhpc1xuICAgIGlmICh0YWJsZXMgPT0gbnVsbCB8fCB0YWJsZXNbdGFibGVdID09IG51bGwgfHwgdGFibGVzW3RhYmxlXS5teSA9PSBudWxsKSB7XG4gICAgICBmZXRjaCh7IHR5cGU6ICdmZXRjaFRhYmxlTXknLCBjb250ZW50VHlwZTogJ2RiJywgcGF0aDogYC9teT90YWJsZT0ke3RhYmxlfWAsIGRlc2M6IGAke3RhYmxlfSB0YWJsZSAobXkgcmVjb3Jkcyl9YCwgdGFibGUgfSlcbiAgICB9XG4gICAgaWYgKHRhYmxlcyA9PSBudWxsIHx8IHRhYmxlcy5jb3VudHJ5ID09IG51bGwpIHtcbiAgICAgIGZldGNoKHsgdHlwZTogJ2ZldGNoVGFibGUnLCBjb250ZW50VHlwZTogJ2RiJywgcGF0aDogYC9tZW1iZXJfY291bnRyeWAsIGRlc2M6IGBjb3VudHJ5IHRhYmxlfWAsIHRhYmxlOiAnY291bnRyeScgfSlcbiAgICB9XG4gICAgaWYgKHRhYmxlcyA9PSBudWxsIHx8IHRhYmxlcy51c2VyID09IG51bGwpIHtcbiAgICAgIGZldGNoKHsgdHlwZTogJ2ZldGNoVGFibGUnLCBjb250ZW50VHlwZTogJ2RiJywgcGF0aDogYC91c2VyYCwgZGVzYzogYHVzZXIgdGFibGV9YCwgdGFibGU6ICd1c2VyJyB9KVxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KGdldFRhYmxlcywgeyBmZXRjaDogZmV0Y2hEYXRhIH0pKEl0ZW1NeSlcblxuXG4iLCJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnXG5cbmltcG9ydCB7IGZldGNoRGF0YSB9IGZyb20gJ3NlcnZlci5qcydcbmltcG9ydCB7IGdldFRhYmxlcyB9IGZyb20gJ3RhYmxlcy5qcydcblxuaW1wb3J0IEl0ZW1GaWVsZCBmcm9tICdJdGVtRmllbGQuanN4J1xuXG5jbGFzcyBJdGVtUmVjb3JkIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgcGFyc2VGaWVsZHMoKSB7XG4gICAgY29uc3QgeyBwcm9wczogeyB0YWJsZXMsIHRhYmxlLCBlSWQgfSB9ID0gdGhpc1xuICAgIGNvbnN0IHsgW3RhYmxlXTogeyBmaWVsZFNwZWNzLCBmaWVsZE9yZGVyIH0gfSA9IHRhYmxlc1xuICAgIGNvbnN0IGVudGl0eSA9IHRoaXMuZ2V0RW50aXR5KClcbiAgICBjb25zdCB7IHBlcm0sIGZpZWxkcywgdmFsdWVzIH0gPSBlbnRpdHlcblxuICAgIGNvbnN0IGZyYWdtZW50cyA9IFtdXG4gICAgbGV0IGhhc0VkaXRhYmxlID0gZmFsc2VcbiAgICBmb3IgKGNvbnN0IG5hbWUgb2YgZmllbGRPcmRlcikge1xuICAgICAgY29uc3QgeyBbbmFtZV06IGYgfSA9IGZpZWxkc1xuICAgICAgaWYgKGYgPT0gbnVsbCkge2NvbnRpbnVlfVxuICAgICAgY29uc3QgeyBbbmFtZV06IHsgbGFiZWwsIGluaXRpYWwsIC4uLnNwZWNzIH0gfSA9IGZpZWxkU3BlY3NcbiAgICAgIGNvbnN0IHsgdXBkYXRlOiB7IFtuYW1lXTogZWRpdGFibGUgfSB9ID0gcGVybVxuICAgICAgaWYgKGVkaXRhYmxlKSB7aGFzRWRpdGFibGUgPSB0cnVlfVxuICAgICAgZnJhZ21lbnRzLnB1c2goXG4gICAgICAgIDxJdGVtRmllbGRcbiAgICAgICAgICBrZXk9e25hbWV9XG4gICAgICAgICAgdGFibGU9e3RhYmxlfVxuICAgICAgICAgIGVJZD17ZUlkfVxuICAgICAgICAgIGVkaXRhYmxlPXshIWVkaXRhYmxlfVxuICAgICAgICAgIG5hbWU9e25hbWV9XG4gICAgICAgICAgbGFiZWw9e2xhYmVsfVxuICAgICAgICAgIHZhbHVlcz17dmFsdWVzW25hbWVdfVxuICAgICAgICAgIGluaXRpYWw9e2luaXRpYWx9XG4gICAgICAgICAgey4uLnNwZWNzfVxuICAgICAgICAvPlxuICAgICAgKVxuICAgIH1cbiAgICByZXR1cm4ge2ZyYWdtZW50cywgaGFzRWRpdGFibGV9XG4gIH1cblxuICBnZXRFbnRpdHkgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBwcm9wczogeyB0YWJsZXMsIHRhYmxlLCBlSWQgIH0gfSA9IHRoaXNcbiAgICBjb25zdCB7IFt0YWJsZV06IHsgZW50aXRpZXM6IHsgW2VJZF06IGVudGl0eSB9IH0gfSA9IHRhYmxlc1xuICAgIHJldHVybiBlbnRpdHlcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7XG4gICAgICBwcm9wczogeyB0YWJsZXMsIHRhYmxlLCBlSWQgfSxcbiAgICB9ID0gdGhpc1xuICAgIGlmICh0aGlzLm5lZWRWYWx1ZXMoKSkge1xuICAgICAgcmV0dXJuIDxkaXYgLz5cbiAgICB9XG5cbiAgICBjb25zdCBlbnRpdHkgPSB0aGlzLmdldEVudGl0eSgpXG4gICAgY29uc3QgeyBwZXJtOiBwZXJtIH0gPSBlbnRpdHlcbiAgICBjb25zdCB7IGZyYWdtZW50cywgaGFzRWRpdGFibGUgfSA9IHRoaXMucGFyc2VGaWVsZHMoKVxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIndpZGdldC1tZWRpdW1cIiA+XG4gICAgICAgIDxwPnJlY29yZCBpbiB7dGFibGV9PC9wPlxuICAgICAgICA8cD5cbiAgICAgICAgICB7aGFzRWRpdGFibGUgPyBbXG4gICAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgICBrZXk9XCJzYXZlXCJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgYnV0dG9uLWxhcmdlYH1cbiAgICAgICAgICAgID5TYXZlPC9zcGFuPixcbiAgICAgICAgICAgIHBlcm0uZGVsZXRlID8gKFxuICAgICAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgICAgIGtleT1cImRlbGV0ZVwiXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXsnZmEgZmEtdHJhc2ggYnV0dG9uLWxhcmdlIGRlbGV0ZSd9XG4gICAgICAgICAgICAgICAgdGl0bGU9XCJkZWxldGUgdGhpcyBpdGVtXCJcbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICkgOiBudWxsLFxuICAgICAgICAgIF0gOiBudWxsfVxuICAgICAgICA8L3A+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAge2ZyYWdtZW50c31cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApXG4gIH1cbiAgZmV0Y2hFbnRpdHkoKSB7XG4gICAgY29uc3QgeyBwcm9wczogeyB0YWJsZSwgZUlkLCBvd25Pbmx5LCBmZXRjaCB9IH0gPSB0aGlzXG4gICAgaWYgKHRoaXMubmVlZFZhbHVlcygpKSB7XG4gICAgICBmZXRjaCh7XG4gICAgICAgIHR5cGU6ICdmZXRjaEl0ZW0nLFxuICAgICAgICBjb250ZW50VHlwZTogJ2RiJyxcbiAgICAgICAgcGF0aDogYC92aWV3P3RhYmxlPSR7dGFibGV9JmlkPSR7ZUlkfSR7b3duT25seSA/ICcmb3duPXRydWUnIDogJyd9YCxcbiAgICAgICAgZGVzYzogYCR7dGFibGV9IHJlY29yZCAke2VJZH1gLFxuICAgICAgICB0YWJsZSxcbiAgICAgIH0pXG4gICAgfVxuICB9XG4gIG5lZWRWYWx1ZXMoKSB7XG4gICAgY29uc3QgeyBwcm9wczogeyB0YWJsZXMsIHRhYmxlLCBlSWQgfSB9ID0gdGhpc1xuICAgIHJldHVybiAodGFibGVzID09IG51bGwgfHwgdGFibGVzW3RhYmxlXSA9PSBudWxsIHx8IHRhYmxlc1t0YWJsZV0uZW50aXRpZXNbZUlkXSA9PSBudWxsIHx8ICF0YWJsZXNbdGFibGVdLmVudGl0aWVzW2VJZF0uY29tcGxldGUpXG4gIH1cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgaWYgKHRoaXMubmVlZFZhbHVlcygpKSB7dGhpcy5mZXRjaEVudGl0eSgpfVxuICB9XG4gIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMpIHtcbiAgICBjb25zdCB7IHRhYmxlOiBwcmV2VGFibGUsIGVJZDogcHJldkVJZCB9ID0gcHJldlByb3BzXG4gICAgY29uc3QgeyBwcm9wczogeyB0YWJsZSwgZUlkIH0gfSA9IHRoaXNcbiAgICBpZiAoKHRhYmxlICE9IHByZXZUYWJsZSB8fCBlSWQgIT0gcHJldkVJZCkgJiYgdGhpcy5uZWVkVmFsdWVzKCkpIHt0aGlzLmZldGNoRW50aXR5KCl9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChnZXRUYWJsZXMsIHsgZmV0Y2g6IGZldGNoRGF0YSB9KShJdGVtUmVjb3JkKVxuXG4iLCJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4J1xuaW1wb3J0IHsgZmV0Y2hEYXRhIH0gZnJvbSAnc2VydmVyLmpzJ1xuaW1wb3J0IHsgZ2V0TWUgfSBmcm9tICdtZS5qcydcblxuY2xhc3MgTG9naW4gZXh0ZW5kcyBDb21wb25lbnQge1xuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBwcm9wczogeyBtZSB9IH0gPSB0aGlzXG4gICAgcmV0dXJuIChcbiAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImxvZ2luXCIgPntcbiAgICAgICAgbWUuZXBwbiAmJiBPYmplY3Qua2V5cyhtZSkubGVuZ3RoID4gMCA/IChcbiAgICAgICAgICA8c3Bhbj5cbiAgICAgICAgICAgIDxzdHJvbmcgY2xhc3NOYW1lPVwiZmEgZmEtdXNlclwiIHRpdGxlPXttZS5lcHBufSA+e21lLmVwcG4uc3BsaXQoJ0AnKVswXX08L3N0cm9uZz5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZhIGZhLWhhc2h0YWdcIiAvPnttZS5hdXRob3JpdHl9eycgJ31cbiAgICAgICAgICAgIDxlbT57bWUuZ3JvdXBEZXNjIHx8ICdub3QgYXV0aGVudGljYXRlZCd9PC9lbT5cbiAgICAgICAgICAgIDxhIGhyZWY9XCIvbG9nb3V0XCIgY2xhc3NOYW1lPVwiY29udHJvbCBmYSBmYS11c2VyLXRpbWVzXCIgdGl0bGU9XCJsb2cgb3V0XCIgLz5cbiAgICAgICAgICAgIDxhIGhyZWY9XCIvc2xvZ291dFwiIGNsYXNzTmFtZT1cImNvbnRyb2wgZmEgZmEtdXNlcnNcIiB0aXRsZT1cInNpZ24gb3V0XCIgLz5cbiAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICkgOiAoXG4gICAgICAgICAgPGEgaHJlZj1cIi9sb2dpblwiIGNsYXNzTmFtZT1cImNvbnRyb2wgZmEgZmEtdXNlci1wbHVzXCIgPnsnIGxvZ2luJ308L2E+XG4gICAgICAgICl9XG4gICAgICA8L3NwYW4+XG4gICAgKVxuICB9XG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIGNvbnN0IHsgcHJvcHM6IHsgZmV0Y2ggfSB9ID0gdGhpc1xuICAgIGZldGNoKHsgdHlwZTogJ2ZldGNoTWUnLCBjb250ZW50VHlwZTogJ2RiJywgcGF0aDogJy93aG8vYW1pJywgZGVzYzogJ21lJyB9KVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QoZ2V0TWUsIHsgZmV0Y2g6IGZldGNoRGF0YSB9KShMb2dpbilcblxuIiwiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IG1lbW9CaW5kIGZyb20gJ21lbW9CaW5kLmpzJ1xuXG5jb25zdCBlbXB0eSA9IFtdXG5cbmNsYXNzIE5vdGlmaWNhdGlvbiBleHRlbmRzIENvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpXG4gICAgdGhpcy5tc2dzID0gW10gLy8gc3luY2hyb25vdXMgbGlzdCBvZiBtZXNzYWdlc1xuICAgIHRoaXMudmlzaWJsZSA9IGZhbHNlXG4gICAgdGhpcy5kb20gPSB7fVxuICB9XG4gIG5vdGlmeShtc2cpIHtcbiAgICB0aGlzLm1zZ3MucHVzaChtc2cpIC8vIHN5bmNocm9ub3VzIGFkZGl0aW9uIG9mIG1zZ1xuICAgIHRoaXMuc2V0U3RhdGUoe21zZ3M6IFsuLi4odGhpcy5tc2dzKV19KSAvLyBhc3luY2hyb25vdXMgdXBkYXRlIG9mIHRoZSBzdGF0ZVxuICB9XG4gIGNsZWFyKCkge1xuICAgIHRoaXMubXNncyA9IFtdIC8vIHN5bmNocm9ub3VzIGNsZWFyaW5nIG9mIG1zZ1xuICAgIHRoaXMuc2V0U3RhdGUoe21zZ3M6IFtdfSkgLy8gYXN5bmNocm9ub3VzIHVwZGF0ZSBvZiB0aGUgc3RhdGVcbiAgfVxuICBjb21wdXRlUHJvZ3Jlc3MoKSB7XG4gICAgY29uc3QgbGFzdE1zZyA9IHRoaXMubXNncy5sZW5ndGggLSAxXG4gICAgbGV0IGxhc3ROb3RlID0gLTFcbiAgICBsZXQgbGFzdEtpbmQgPSAnaW5mbydcbiAgICBsZXQgYnVzeSA9IDBcbiAgICB0aGlzLm1zZ3MuZm9yRWFjaCgobXNnLCBpKSA9PiB7XG4gICAgICBpZiAobXNnLmtpbmQgPT0gJ2Vycm9yJykge2xhc3ROb3RlID0gaTsgbGFzdEtpbmQgPSAnZXJyb3InfVxuICAgICAgZWxzZSBpZiAobXNnLmtpbmQgPT0gJ3dhcm5pbmcnKSB7XG4gICAgICAgIGlmIChsYXN0S2luZCAhPSAnZXJyb3InKSB7bGFzdE5vdGUgPSBpOyBsYXN0S2luZCA9ICd3YXJuaW5nJ31cbiAgICAgIH1cbiAgICAgIGJ1c3kgKz0gbXNnLmJ1c3kgfHwgMFxuICAgIH0pXG4gICAgaWYgKGJ1c3kgPCAwKSB7XG4gICAgICAvL3dhcm4oYFNIT1VMRCBOT1QgSEFQUEVOOiBuZWdhdGl2ZSB2YWx1ZSBmb3IgYnVzeSAke2J1c3l9YClcbiAgICAgIGJ1c3kgPSAwXG4gICAgfVxuICAgIGNvbnN0IHZpc2libGUgPSB0aGlzLnZpc2libGUgfHwgKGxhc3ROb3RlID4gLTEpXG4gICAgcmV0dXJuIFtsYXN0TXNnLCBsYXN0Tm90ZSwgbGFzdEtpbmQsIGJ1c3ksIHZpc2libGVdXG4gIH1cbiAgcmVmRG9tID0gbGFiZWwgPT4gZG9tID0+IHtcbiAgICBpZiAoZG9tKSB7dGhpcy5kb21bbGFiZWxdID0gZG9tfVxuICB9XG5cbiAgbm90aWZpY2F0aW9uSGFuZGxlciA9IGFjdGlvbiA9PiBldmVudCA9PiB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgIGlmIChhY3Rpb24gPT0gbnVsbCkge1xuICAgICAgdGhpcy5jbGVhcigpXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdGhpcy5zZXRWaWV3KGFjdGlvbilcbiAgICB9XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgW3RoaXMubGFzdE1zZywgdGhpcy5sYXN0Tm90ZSwgdGhpcy5sYXN0S2luZCwgdGhpcy5idXN5LCB0aGlzLnZpc2libGVdID0gdGhpcy5jb21wdXRlUHJvZ3Jlc3MoKVxuICAgIGNvbnN0IGJ1c3lCbG9ja3MgPSBuZXcgQXJyYXkodGhpcy5idXN5KS5maWxsKDEpXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIDxwIGNsYXNzTmFtZT1cIm1zZy1zcGlubmVyXCIgPlxuICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICB0aXRsZT1cInNob3cvaGlkZSBub3RpZmljYXRpb25zIGFuZCBwcm9ncmVzcyBtZXNzYWdlc1wiXG4gICAgICAgICAgICBjbGFzc05hbWU9e3RoaXMubGFzdE5vdGUgPiAtMSA/IGBzcGluLSR7dGhpcy5sYXN0S2luZH1gIDogJ3NwaW4tb2snfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHsgYnVzeUJsb2Nrcy5tYXAoKGIsIGkpID0+IDxzcGFuIGtleT17aX0gY2xhc3NOYW1lPVwibXNnLWRvdCBmYSBmYS1jYXJldC1sZWZ0XCIgLz4pIH1cbiAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17YGZhIGZhLSR7dGhpcy5idXN5ID09IDAgPyAnY2lyY2xlLW8nIDogJ3NwaW5uZXIgZmEtc3Bpbid9YH1cbiAgICAgICAgICAgICAgb25DbGljaz17bWVtb0JpbmQodGhpcywgJ25vdGlmaWNhdGlvbkhhbmRsZXInLCBbIXRoaXMudmlzaWJsZV0pfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L3NwYW4+XG4gICAgICAgIDwvcD5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIHJlZj17bWVtb0JpbmQodGhpcywgJ3JlZkRvbScsIFsnbm90Ym94J10pfVxuICAgICAgICAgIGNsYXNzTmFtZT1cIm1zZy1ib3hcIlxuICAgICAgICAgIG9uQ2xpY2s9e21lbW9CaW5kKHRoaXMsICdub3RpZmljYXRpb25IYW5kbGVyJywgW2ZhbHNlXSl9XG4gICAgICAgID57XG4gICAgICAgICAgKHRoaXMubXNncyB8fCBlbXB0eSkubWFwKChtc2csIGluZGV4KSA9PiAoXG4gICAgICAgICAgICA8cFxuICAgICAgICAgICAgICB0aXRsZT17bXNnLmNhdXNlfVxuICAgICAgICAgICAgICBrZXk9e2luZGV4fVxuICAgICAgICAgICAgICByZWY9e21lbW9CaW5kKHRoaXMsICdyZWZEb20nLCBbYG0ke2luZGV4fWBdKX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgbXNnLWxpbmUgJHtbbXNnLmtpbmRdfS1vICR7KG1zZy5raW5kICE9ICdpbmZvJykgPyAnbXNnLWhpZ2gnIDogJyd9YH1cbiAgICAgICAgICAgID57bXNnLnRleHR9PC9wPlxuICAgICAgICAgICkpXG4gICAgICAgIH1cbiAgICAgICAgICA8cCBjbGFzc05hbWU9XCJtc2ctZGlzbWlzc1wiID57JyhjbGljayBwYW5lbCB0byBoaWRlKSd9PC9wPlxuICAgICAgICAgIDxwIGNsYXNzTmFtZT1cIm1zZy10cmFzaFwiID5cbiAgICAgICAgICAgIDxhXG4gICAgICAgICAgICAgIGhyZWY9XCIjXCJcbiAgICAgICAgICAgICAgdGl0bGU9XCJjbGVhciBtZXNzYWdlc1wiXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cImNvbnRyb2wgZmEgZmEtdHJhc2hcIlxuICAgICAgICAgICAgICBvbkNsaWNrPXttZW1vQmluZCh0aGlzLCAnbm90aWZpY2F0aW9uSGFuZGxlcicsIFtudWxsXSl9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvcD5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApXG4gIH1cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgdGhpcy5zZXRWaWV3KClcbiAgfVxuICBjb21wb25lbnREaWRVcGRhdGUoKSB7XG4gICAgdGhpcy5zZXRWaWV3KClcbiAgfVxuICBzZXRWaWV3KG9uKSB7XG4gICAgaWYgKG9uICE9IG51bGwpIHtcbiAgICAgIHRoaXMudmlzaWJsZSA9IG9uXG4gICAgfVxuICAgIHRoaXMuZG9tLm5vdGJveC5zdHlsZS5kaXNwbGF5ID0gdGhpcy52aXNpYmxlID8gJ2Jsb2NrJyA6ICdub25lJ1xuICAgIHRoaXMuc2V0U2Nyb2xsKClcbiAgfVxuICBzZXRTY3JvbGwoKSB7XG4gICAgaWYgKHRoaXMudmlzaWJsZSkge1xuICAgICAgaWYgKHRoaXMubGFzdE5vdGUgPiAtMSkge1xuICAgICAgICB0aGlzLmRvbVtgbSR7dGhpcy5sYXN0Tm90ZX1gXS5zY3JvbGxJbnRvVmlldygpXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgaWYgKHRoaXMubGFzdE1zZyA+IC0xKSB7XG4gICAgICAgICAgdGhpcy5kb21bYG0ke3RoaXMubGFzdE1zZ31gXS5zY3JvbGxJbnRvVmlldygpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTm90aWZpY2F0aW9uXG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIFByb3BUeXBlcywgQ2hpbGRyZW4gfSBmcm9tICdyZWFjdCdcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCdcbmltcG9ydCB0aHJvdHRsZSBmcm9tICdsb2Rhc2gvdGhyb3R0bGUnXG5pbXBvcnQgeyBnZXRXaW5EaW0sIGNoYW5nZVdpbkRpbSB9IGZyb20gJ3dpbi5qcydcblxuY2xhc3MgV2luZG93IGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgcHJvcHM6IHsgY2hpbGRyZW4gfSB9ID0gdGhpc1xuICAgIHJldHVybiBDaGlsZHJlbi5vbmx5KGNoaWxkcmVuKVxuICB9XG4gIG5ld1dpbmRvd1NpemUgPSB0aHJvdHRsZShldmVudCA9PiB7XG4gICAgY29uc3QgeyBwcm9wczogeyByZXNpemUgfSB9ID0gdGhpc1xuICAgIHJlc2l6ZSgpXG4gIH0sIDEwMDApXG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgdGhpcy5uZXdXaW5kb3dTaXplKVxuICB9XG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIHRoaXMubmV3V2luZG93U2l6ZSlcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KGdldFdpbkRpbSwgeyByZXNpemU6IGNoYW5nZVdpbkRpbSB9KShXaW5kb3cpXG4iXX0=
