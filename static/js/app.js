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
'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _getPrototypeOf=require('babel-runtime/core-js/object/get-prototype-of');var _getPrototypeOf2=_interopRequireDefault(_getPrototypeOf);var _classCallCheck2=require('babel-runtime/helpers/classCallCheck');var _classCallCheck3=_interopRequireDefault(_classCallCheck2);var _createClass2=require('babel-runtime/helpers/createClass');var _createClass3=_interopRequireDefault(_createClass2);var _possibleConstructorReturn2=require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3=_interopRequireDefault(_possibleConstructorReturn2);var _inherits2=require('babel-runtime/helpers/inherits');var _inherits3=_interopRequireDefault(_inherits2);var _jsxFileName='/Users/dirk/github/dariah/client/src/js/app/state/ItemFiltered.jsx';var _react=require('react');var _react2=_interopRequireDefault(_react);var _reactRedux=require('react-redux');var _FilterCompute=require('FilterCompute.jsx');var _FilterCompute2=_interopRequireDefault(_FilterCompute);var _server=require('server.js');var _tables=require('tables.js');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var ItemFiltered=function(_Component){(0,_inherits3.default)(ItemFiltered,_Component);function ItemFiltered(){(0,_classCallCheck3.default)(this,ItemFiltered);return(0,_possibleConstructorReturn3.default)(this,(ItemFiltered.__proto__||(0,_getPrototypeOf2.default)(ItemFiltered)).apply(this,arguments))}(0,_createClass3.default)(ItemFiltered,[{key:'render',value:function render(){var _props=this.props,table=_props.params.table,tables=_props.tables;if(tables==null||tables[table]==null||tables.country==null||tables.user==null){return _react2.default.createElement('div',{__source:{fileName:_jsxFileName,lineNumber:12}})}return _react2.default.createElement(_FilterCompute2.default,{table:table,__source:{fileName:_jsxFileName,lineNumber:15}})}},{key:'componentDidMount',value:function componentDidMount(){var _props2=this.props,table=_props2.params.table,tables=_props2.tables,fetch=_props2.fetch;if(tables==null||tables[table]==null){fetch({type:'fetchTable',contentType:'db',path:'/list?table='+table,desc:table+' table}',table:table})}if(tables==null||tables.country==null){fetch({type:'fetchTable',contentType:'db',path:'/member_country',desc:'country table}',table:'country'})}if(tables==null||tables.user==null){fetch({type:'fetchTable',contentType:'db',path:'/user',desc:'user table}',table:'user'})}}}]);return ItemFiltered}(_react.Component);exports.default=(0,_reactRedux.connect)(_tables.getTables,{fetch:_server.fetchData})(ItemFiltered);

},{"FilterCompute.jsx":161,"babel-runtime/core-js/object/get-prototype-of":8,"babel-runtime/helpers/classCallCheck":13,"babel-runtime/helpers/createClass":14,"babel-runtime/helpers/inherits":17,"babel-runtime/helpers/possibleConstructorReturn":19,"react":"react","react-redux":"react-redux","server.js":133,"tables.js":134}],163:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _getPrototypeOf=require('babel-runtime/core-js/object/get-prototype-of');var _getPrototypeOf2=_interopRequireDefault(_getPrototypeOf);var _classCallCheck2=require('babel-runtime/helpers/classCallCheck');var _classCallCheck3=_interopRequireDefault(_classCallCheck2);var _createClass2=require('babel-runtime/helpers/createClass');var _createClass3=_interopRequireDefault(_createClass2);var _possibleConstructorReturn2=require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3=_interopRequireDefault(_possibleConstructorReturn2);var _inherits2=require('babel-runtime/helpers/inherits');var _inherits3=_interopRequireDefault(_inherits2);var _jsxFileName='/Users/dirk/github/dariah/client/src/js/app/state/ItemMy.jsx';var _react=require('react');var _react2=_interopRequireDefault(_react);var _reactRedux=require('react-redux');var _server=require('server.js');var _tables=require('tables.js');var _ItemList=require('ItemList.jsx');var _ItemList2=_interopRequireDefault(_ItemList);var _Pane=require('Pane.jsx');var _Pane2=_interopRequireDefault(_Pane);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var ItemMy=function(_Component){(0,_inherits3.default)(ItemMy,_Component);function ItemMy(){(0,_classCallCheck3.default)(this,ItemMy);return(0,_possibleConstructorReturn3.default)(this,(ItemMy.__proto__||(0,_getPrototypeOf2.default)(ItemMy)).apply(this,arguments))}(0,_createClass3.default)(ItemMy,[{key:'render',value:function render(){var _props=this.props,table=_props.params.table,tables=_props.tables,children=_props.children;if(tables==null||tables[table]==null||tables[table].my==null||tables.country==null||tables.user==null){return _react2.default.createElement('div',{__source:{fileName:_jsxFileName,lineNumber:18}})}var _tables$table=tables[table],entities=_tables$table.entities,title=_tables$table.title,perm=_tables$table.perm,my=_tables$table.my;return _react2.default.createElement('div',{__source:{fileName:_jsxFileName,lineNumber:22}},_react2.default.createElement(_Pane2.default,{format:'nav sized',position:'rightLeftNav',__source:{fileName:_jsxFileName,lineNumber:23}},_react2.default.createElement('p',{__source:{fileName:_jsxFileName,lineNumber:24}},my.length+' items ',perm!=null&&perm.insert?_react2.default.createElement('span',{className:'fa fa-plus button-large insert',title:'New item',__source:{fileName:_jsxFileName,lineNumber:27}}):null),_react2.default.createElement(_ItemList2.default,{table:table,title:title,filteredData:my,inplace:false,__source:{fileName:_jsxFileName,lineNumber:33}})),_react2.default.createElement(_Pane2.default,{format:'sized',position:'rightRightBody',__source:{fileName:_jsxFileName,lineNumber:35}},children))}},{key:'componentDidMount',value:function componentDidMount(){var _props2=this.props,table=_props2.params.table,tables=_props2.tables,fetch=_props2.fetch;if(tables==null||tables[table]==null||tables[table].my==null){fetch({type:'fetchTableMy',contentType:'db',path:'/my?table='+table,desc:table+' table (my records)}',table:table})}if(tables==null||tables.country==null){fetch({type:'fetchTable',contentType:'db',path:'/member_country',desc:'country table}',table:'country'})}if(tables==null||tables.user==null){fetch({type:'fetchTable',contentType:'db',path:'/user',desc:'user table}',table:'user'})}}}]);return ItemMy}(_react.Component);exports.default=(0,_reactRedux.connect)(_tables.getTables,{fetch:_server.fetchData})(ItemMy);

},{"ItemList.jsx":151,"Pane.jsx":155,"babel-runtime/core-js/object/get-prototype-of":8,"babel-runtime/helpers/classCallCheck":13,"babel-runtime/helpers/createClass":14,"babel-runtime/helpers/inherits":17,"babel-runtime/helpers/possibleConstructorReturn":19,"react":"react","react-redux":"react-redux","server.js":133,"tables.js":134}],164:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _extends2=require('babel-runtime/helpers/extends');var _extends3=_interopRequireDefault(_extends2);var _objectWithoutProperties2=require('babel-runtime/helpers/objectWithoutProperties');var _objectWithoutProperties3=_interopRequireDefault(_objectWithoutProperties2);var _getIterator2=require('babel-runtime/core-js/get-iterator');var _getIterator3=_interopRequireDefault(_getIterator2);var _getPrototypeOf=require('babel-runtime/core-js/object/get-prototype-of');var _getPrototypeOf2=_interopRequireDefault(_getPrototypeOf);var _classCallCheck2=require('babel-runtime/helpers/classCallCheck');var _classCallCheck3=_interopRequireDefault(_classCallCheck2);var _createClass2=require('babel-runtime/helpers/createClass');var _createClass3=_interopRequireDefault(_createClass2);var _possibleConstructorReturn2=require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3=_interopRequireDefault(_possibleConstructorReturn2);var _inherits2=require('babel-runtime/helpers/inherits');var _inherits3=_interopRequireDefault(_inherits2);var _jsxFileName='/Users/dirk/github/dariah/client/src/js/app/state/ItemRecord.jsx';var _react=require('react');var _react2=_interopRequireDefault(_react);var _reactRedux=require('react-redux');var _server=require('server.js');var _tables=require('tables.js');var _ItemField=require('ItemField.jsx');var _ItemField2=_interopRequireDefault(_ItemField);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var ItemRecord=function(_Component){(0,_inherits3.default)(ItemRecord,_Component);function ItemRecord(){var _ref;var _temp,_this,_ret;(0,_classCallCheck3.default)(this,ItemRecord);for(var _len=arguments.length,args=Array(_len),_key=0;_key<_len;_key++){args[_key]=arguments[_key]}return _ret=(_temp=(_this=(0,_possibleConstructorReturn3.default)(this,(_ref=ItemRecord.__proto__||(0,_getPrototypeOf2.default)(ItemRecord)).call.apply(_ref,[this].concat(args))),_this),_this.getEntity=function(){var _this2=_this,_this2$props=_this2.props,tables=_this2$props.tables,table=_this2$props.table,eId=_this2$props.eId;var entity=tables[table].entities[eId];return entity},_temp),(0,_possibleConstructorReturn3.default)(_this,_ret)}(0,_createClass3.default)(ItemRecord,[{key:'parseFields',value:function parseFields(){var _props=this.props,tables=_props.tables,table=_props.table,eId=_props.eId;var _tables$table=tables[table],fieldSpecs=_tables$table.fieldSpecs,fieldOrder=_tables$table.fieldOrder;var entity=this.getEntity();var perm=entity.perm,fields=entity.fields,values=entity.values;var fragments=[];var hasEditable=false;var _iteratorNormalCompletion=true;var _didIteratorError=false;var _iteratorError=undefined;try{for(var _iterator=(0,_getIterator3.default)(fieldOrder),_step;!(_iteratorNormalCompletion=(_step=_iterator.next()).done);_iteratorNormalCompletion=true){var name=_step.value;var f=fields[name];if(f==null){continue}var _fieldSpecs$name=fieldSpecs[name],label=_fieldSpecs$name.label,initial=_fieldSpecs$name.initial,specs=(0,_objectWithoutProperties3.default)(_fieldSpecs$name,['label','initial']);var editable=perm.update[name];if(editable){hasEditable=true}fragments.push(_react2.default.createElement(_ItemField2.default,(0,_extends3.default)({key:name,table:table,eId:eId,editable:!!editable,name:name,label:label,values:values[name],initial:initial},specs,{__source:{fileName:_jsxFileName,lineNumber:25}})))}}catch(err){_didIteratorError=true;_iteratorError=err}finally{try{if(!_iteratorNormalCompletion&&_iterator.return){_iterator.return()}}finally{if(_didIteratorError){throw _iteratorError}}}return{fragments:fragments,hasEditable:hasEditable}}},{key:'render',value:function render(){var _props2=this.props,tables=_props2.tables,table=_props2.table,eId=_props2.eId;if(this.needValues()){return _react2.default.createElement('div',{__source:{fileName:_jsxFileName,lineNumber:52}})}var entity=this.getEntity();var perm=entity.perm;var _parseFields=this.parseFields(),fragments=_parseFields.fragments,hasEditable=_parseFields.hasEditable;return _react2.default.createElement('div',{className:'widget-medium',__source:{fileName:_jsxFileName,lineNumber:59}},_react2.default.createElement('p',{__source:{fileName:_jsxFileName,lineNumber:60}},'record in ',table),_react2.default.createElement('p',{__source:{fileName:_jsxFileName,lineNumber:61}},hasEditable?[_react2.default.createElement('span',{key:'save',className:'button-large',__source:{fileName:_jsxFileName,lineNumber:63}},'Save'),perm.delete?_react2.default.createElement('span',{key:'delete',className:'fa fa-trash button-large delete',title:'delete this item',__source:{fileName:_jsxFileName,lineNumber:68}}):null]:null),_react2.default.createElement('div',{__source:{fileName:_jsxFileName,lineNumber:76}},fragments))}},{key:'fetchEntity',value:function fetchEntity(){var _props3=this.props,table=_props3.table,eId=_props3.eId,ownOnly=_props3.ownOnly,fetch=_props3.fetch;if(this.needValues()){fetch({type:'fetchItem',contentType:'db',path:'/view?table='+table+'&id='+eId+(ownOnly?'&own=true':''),desc:table+' record '+eId,table:table})}}},{key:'needValues',value:function needValues(){var _props4=this.props,tables=_props4.tables,table=_props4.table,eId=_props4.eId;return tables==null||tables[table]==null||tables[table].entities[eId]==null||!tables[table].entities[eId].complete}},{key:'componentDidMount',value:function componentDidMount(){if(this.needValues()){this.fetchEntity()}}},{key:'componentDidUpdate',value:function componentDidUpdate(prevProps){var prevTable=prevProps.table,prevEId=prevProps.eId;var _props5=this.props,table=_props5.table,eId=_props5.eId;if((table!=prevTable||eId!=prevEId)&&this.needValues()){this.fetchEntity()}}}]);return ItemRecord}(_react.Component);exports.default=(0,_reactRedux.connect)(_tables.getTables,{fetch:_server.fetchData})(ItemRecord);

},{"ItemField.jsx":149,"babel-runtime/core-js/get-iterator":2,"babel-runtime/core-js/object/get-prototype-of":8,"babel-runtime/helpers/classCallCheck":13,"babel-runtime/helpers/createClass":14,"babel-runtime/helpers/extends":16,"babel-runtime/helpers/inherits":17,"babel-runtime/helpers/objectWithoutProperties":18,"babel-runtime/helpers/possibleConstructorReturn":19,"react":"react","react-redux":"react-redux","server.js":133,"tables.js":134}],165:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _keys=require('babel-runtime/core-js/object/keys');var _keys2=_interopRequireDefault(_keys);var _getPrototypeOf=require('babel-runtime/core-js/object/get-prototype-of');var _getPrototypeOf2=_interopRequireDefault(_getPrototypeOf);var _classCallCheck2=require('babel-runtime/helpers/classCallCheck');var _classCallCheck3=_interopRequireDefault(_classCallCheck2);var _createClass2=require('babel-runtime/helpers/createClass');var _createClass3=_interopRequireDefault(_createClass2);var _possibleConstructorReturn2=require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3=_interopRequireDefault(_possibleConstructorReturn2);var _inherits2=require('babel-runtime/helpers/inherits');var _inherits3=_interopRequireDefault(_inherits2);var _jsxFileName='/Users/dirk/github/dariah/client/src/js/app/state/Login.jsx';var _react=require('react');var _react2=_interopRequireDefault(_react);var _reactRedux=require('react-redux');var _server=require('server.js');var _me=require('me.js');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var Login=function(_Component){(0,_inherits3.default)(Login,_Component);function Login(){(0,_classCallCheck3.default)(this,Login);return(0,_possibleConstructorReturn3.default)(this,(Login.__proto__||(0,_getPrototypeOf2.default)(Login)).apply(this,arguments))}(0,_createClass3.default)(Login,[{key:'render',value:function render(){var me=this.props.me;return _react2.default.createElement('span',{className:'login',__source:{fileName:_jsxFileName,lineNumber:10}},me.eppn&&(0,_keys2.default)(me).length>0?_react2.default.createElement('span',{__source:{fileName:_jsxFileName,lineNumber:12}},_react2.default.createElement('strong',{className:'fa fa-user',title:me.eppn,__source:{fileName:_jsxFileName,lineNumber:13}},me.eppn.split('@')[0]),_react2.default.createElement('span',{className:'fa fa-hashtag',__source:{fileName:_jsxFileName,lineNumber:14}}),me.authority,' ',_react2.default.createElement('em',{__source:{fileName:_jsxFileName,lineNumber:15}},me.groupDesc||'not authenticated'),_react2.default.createElement('a',{href:'/logout',className:'control fa fa-user-times',title:'log out',__source:{fileName:_jsxFileName,lineNumber:16}}),_react2.default.createElement('a',{href:'/slogout',className:'control fa fa-users',title:'sign out',__source:{fileName:_jsxFileName,lineNumber:17}})):_react2.default.createElement('a',{href:'/login',className:'control fa fa-user-plus',__source:{fileName:_jsxFileName,lineNumber:20}},' login'))}},{key:'componentDidMount',value:function componentDidMount(){var fetch=this.props.fetch;fetch({type:'fetchMe',contentType:'db',path:'/who/ami',desc:'me'})}}]);return Login}(_react.Component);exports.default=(0,_reactRedux.connect)(_me.getMe,{fetch:_server.fetchData})(Login);

},{"babel-runtime/core-js/object/get-prototype-of":8,"babel-runtime/core-js/object/keys":9,"babel-runtime/helpers/classCallCheck":13,"babel-runtime/helpers/createClass":14,"babel-runtime/helpers/inherits":17,"babel-runtime/helpers/possibleConstructorReturn":19,"me.js":130,"react":"react","react-redux":"react-redux","server.js":133}],166:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _slicedToArray2=require('babel-runtime/helpers/slicedToArray');var _slicedToArray3=_interopRequireDefault(_slicedToArray2);var _toConsumableArray2=require('babel-runtime/helpers/toConsumableArray');var _toConsumableArray3=_interopRequireDefault(_toConsumableArray2);var _getPrototypeOf=require('babel-runtime/core-js/object/get-prototype-of');var _getPrototypeOf2=_interopRequireDefault(_getPrototypeOf);var _classCallCheck2=require('babel-runtime/helpers/classCallCheck');var _classCallCheck3=_interopRequireDefault(_classCallCheck2);var _createClass2=require('babel-runtime/helpers/createClass');var _createClass3=_interopRequireDefault(_createClass2);var _possibleConstructorReturn2=require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3=_interopRequireDefault(_possibleConstructorReturn2);var _inherits2=require('babel-runtime/helpers/inherits');var _inherits3=_interopRequireDefault(_inherits2);var _jsxFileName='/Users/dirk/github/dariah/client/src/js/app/state/Notification.jsx';var _react=require('react');var _react2=_interopRequireDefault(_react);var _memoBind=require('memoBind.js');var _memoBind2=_interopRequireDefault(_memoBind);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var empty=[];var Notification=function(_Component){(0,_inherits3.default)(Notification,_Component);function Notification(props){(0,_classCallCheck3.default)(this,Notification);var _this=(0,_possibleConstructorReturn3.default)(this,(Notification.__proto__||(0,_getPrototypeOf2.default)(Notification)).call(this,props));_this.refDom=function(label){return function(dom){if(dom){_this.dom[label]=dom}}};_this.notificationHandler=function(action){return function(event){event.preventDefault();if(action==null){_this.clear()}else{_this.setView(action)}}};_this.msgs=[];_this.visible=false;_this.dom={};return _this}(0,_createClass3.default)(Notification,[{key:'notify',value:function notify(msg){this.msgs.push(msg);this.setState({msgs:[].concat((0,_toConsumableArray3.default)(this.msgs))})}},{key:'clear',value:function clear(){this.msgs=[];this.setState({msgs:[]})}},{key:'computeProgress',value:function computeProgress(){var lastMsg=this.msgs.length-1;var lastNote=-1;var lastKind='info';var busy=0;this.msgs.forEach(function(msg,i){if(msg.kind=='error'){lastNote=i;lastKind='error'}else if(msg.kind=='warning'){if(lastKind!='error'){lastNote=i;lastKind='warning'}}busy+=msg.busy||0});if(busy<0){busy=0}var visible=this.visible||lastNote>-1;return[lastMsg,lastNote,lastKind,busy,visible]}},{key:'render',value:function render(){var _this2=this;var _computeProgress=this.computeProgress();var _computeProgress2=(0,_slicedToArray3.default)(_computeProgress,5);this.lastMsg=_computeProgress2[0];this.lastNote=_computeProgress2[1];this.lastKind=_computeProgress2[2];this.busy=_computeProgress2[3];this.visible=_computeProgress2[4];var busyBlocks=new Array(this.busy).fill(1);return _react2.default.createElement('div',{__source:{fileName:_jsxFileName,lineNumber:58}},_react2.default.createElement('p',{className:'msg-spinner',__source:{fileName:_jsxFileName,lineNumber:59}},_react2.default.createElement('span',{title:'show/hide notifications and progress messages',className:this.lastNote>-1?'spin-'+this.lastKind:'spin-ok',__source:{fileName:_jsxFileName,lineNumber:60}},busyBlocks.map(function(b,i){return _react2.default.createElement('span',{key:i,className:'msg-dot fa fa-caret-left',__source:{fileName:_jsxFileName,lineNumber:64}})}),_react2.default.createElement('span',{className:'fa fa-'+(this.busy==0?'circle-o':'spinner fa-spin'),onClick:(0,_memoBind2.default)(this,'notificationHandler',[!this.visible]),__source:{fileName:_jsxFileName,lineNumber:65}}))),_react2.default.createElement('div',{ref:(0,_memoBind2.default)(this,'refDom',['notbox']),className:'msg-box',onClick:(0,_memoBind2.default)(this,'notificationHandler',[false]),__source:{fileName:_jsxFileName,lineNumber:71}},(this.msgs||empty).map(function(msg,index){return _react2.default.createElement('p',{title:msg.cause,key:index,ref:(0,_memoBind2.default)(_this2,'refDom',['m'+index]),className:'msg-line '+[msg.kind]+'-o '+(msg.kind!='info'?'msg-high':''),__source:{fileName:_jsxFileName,lineNumber:77}},msg.text)}),_react2.default.createElement('p',{className:'msg-dismiss',__source:{fileName:_jsxFileName,lineNumber:85}},'(click panel to hide)'),_react2.default.createElement('p',{className:'msg-trash',__source:{fileName:_jsxFileName,lineNumber:86}},_react2.default.createElement('a',{href:'#',title:'clear messages',className:'control fa fa-trash',onClick:(0,_memoBind2.default)(this,'notificationHandler',[null]),__source:{fileName:_jsxFileName,lineNumber:87}}))))}},{key:'componentDidMount',value:function componentDidMount(){this.setView()}},{key:'componentDidUpdate',value:function componentDidUpdate(){this.setView()}},{key:'setView',value:function setView(on){if(on!=null){this.visible=on}this.dom.notbox.style.display=this.visible?'block':'none';this.setScroll()}},{key:'setScroll',value:function setScroll(){if(this.visible){if(this.lastNote>-1){this.dom['m'+this.lastNote].scrollIntoView()}else{if(this.lastMsg>-1){this.dom['m'+this.lastMsg].scrollIntoView()}}}}}]);return Notification}(_react.Component);exports.default=Notification;

},{"babel-runtime/core-js/object/get-prototype-of":8,"babel-runtime/helpers/classCallCheck":13,"babel-runtime/helpers/createClass":14,"babel-runtime/helpers/inherits":17,"babel-runtime/helpers/possibleConstructorReturn":19,"babel-runtime/helpers/slicedToArray":20,"babel-runtime/helpers/toConsumableArray":21,"memoBind.js":"memoBind.js","react":"react"}],167:[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _getPrototypeOf=require('babel-runtime/core-js/object/get-prototype-of');var _getPrototypeOf2=_interopRequireDefault(_getPrototypeOf);var _classCallCheck2=require('babel-runtime/helpers/classCallCheck');var _classCallCheck3=_interopRequireDefault(_classCallCheck2);var _createClass2=require('babel-runtime/helpers/createClass');var _createClass3=_interopRequireDefault(_createClass2);var _possibleConstructorReturn2=require('babel-runtime/helpers/possibleConstructorReturn');var _possibleConstructorReturn3=_interopRequireDefault(_possibleConstructorReturn2);var _inherits2=require('babel-runtime/helpers/inherits');var _inherits3=_interopRequireDefault(_inherits2);var _react=require('react');var _reactRedux=require('react-redux');var _throttle=require('lodash/throttle');var _throttle2=_interopRequireDefault(_throttle);var _win=require('win.js');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var Window=function(_Component){(0,_inherits3.default)(Window,_Component);function Window(){var _ref;var _temp,_this,_ret;(0,_classCallCheck3.default)(this,Window);for(var _len=arguments.length,args=Array(_len),_key=0;_key<_len;_key++){args[_key]=arguments[_key]}return _ret=(_temp=(_this=(0,_possibleConstructorReturn3.default)(this,(_ref=Window.__proto__||(0,_getPrototypeOf2.default)(Window)).call.apply(_ref,[this].concat(args))),_this),_this.newWindowSize=(0,_throttle2.default)(function(event){var _this2=_this,resize=_this2.props.resize;resize()},1000),_temp),(0,_possibleConstructorReturn3.default)(_this,_ret)}(0,_createClass3.default)(Window,[{key:'render',value:function render(){var children=this.props.children;return _react.Children.only(children)}},{key:'componentDidMount',value:function componentDidMount(){window.addEventListener('resize',this.newWindowSize)}},{key:'componentWillUnmount',value:function componentWillUnmount(){window.removeEventListener('resize',this.newWindowSize)}}]);return Window}(_react.Component);exports.default=(0,_reactRedux.connect)(_win.getWinDim,{resize:_win.changeWinDim})(Window);

},{"babel-runtime/core-js/object/get-prototype-of":8,"babel-runtime/helpers/classCallCheck":13,"babel-runtime/helpers/createClass":14,"babel-runtime/helpers/inherits":17,"babel-runtime/helpers/possibleConstructorReturn":19,"lodash/throttle":125,"react":"react","react-redux":"react-redux","win.js":135}]},{},[136])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL2FycmF5L2Zyb20uanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL2dldC1pdGVyYXRvci5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvaXMtaXRlcmFibGUuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9hc3NpZ24uanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9jcmVhdGUuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9kZWZpbmUtcHJvcGVydHkuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9lbnRyaWVzLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9vYmplY3QvZ2V0LXByb3RvdHlwZS1vZi5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2NvcmUtanMvb2JqZWN0L2tleXMuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL29iamVjdC9zZXQtcHJvdG90eXBlLW9mLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9zeW1ib2wuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL3N5bWJvbC9pdGVyYXRvci5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2hlbHBlcnMvY2xhc3NDYWxsQ2hlY2suanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9oZWxwZXJzL2NyZWF0ZUNsYXNzLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvaGVscGVycy9kZWZpbmVQcm9wZXJ0eS5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2hlbHBlcnMvZXh0ZW5kcy5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2hlbHBlcnMvaW5oZXJpdHMuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9oZWxwZXJzL29iamVjdFdpdGhvdXRQcm9wZXJ0aWVzLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvaGVscGVycy9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuLmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvaGVscGVycy9zbGljZWRUb0FycmF5LmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvaGVscGVycy90b0NvbnN1bWFibGVBcnJheS5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2hlbHBlcnMvdHlwZW9mLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9hcnJheS9mcm9tLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9nZXQtaXRlcmF0b3IuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL2lzLWl0ZXJhYmxlLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvYXNzaWduLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvY3JlYXRlLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvZGVmaW5lLXByb3BlcnR5LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvZW50cmllcy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2dldC1wcm90b3R5cGUtb2YuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9rZXlzLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9vYmplY3Qvc2V0LXByb3RvdHlwZS1vZi5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vc3ltYm9sL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9mbi9zeW1ib2wvaXRlcmF0b3IuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2EtZnVuY3Rpb24uanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FkZC10by11bnNjb3BhYmxlcy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYW4tb2JqZWN0LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hcnJheS1pbmNsdWRlcy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY2xhc3NvZi5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY29mLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jb3JlLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jcmVhdGUtcHJvcGVydHkuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2N0eC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZGVmaW5lZC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZGVzY3JpcHRvcnMuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2RvbS1jcmVhdGUuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2VudW0tYnVnLWtleXMuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2VudW0ta2V5cy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZXhwb3J0LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19mYWlscy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZ2xvYmFsLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19oYXMuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2hpZGUuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2h0bWwuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2llOC1kb20tZGVmaW5lLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pb2JqZWN0LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pcy1hcnJheS1pdGVyLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pcy1hcnJheS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXMtb2JqZWN0LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pdGVyLWNhbGwuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXItY3JlYXRlLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pdGVyLWRlZmluZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlci1kZXRlY3QuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXItc3RlcC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlcmF0b3JzLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19rZXlvZi5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fbGlicmFyeS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fbWV0YS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWFzc2lnbi5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWNyZWF0ZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWRwLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZHBzLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZ29wZC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWdvcG4tZXh0LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZ29wbi5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWdvcHMuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1ncG8uanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1rZXlzLWludGVybmFsLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3Qta2V5cy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LXBpZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LXNhcC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LXRvLWFycmF5LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19wcm9wZXJ0eS1kZXNjLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19yZWRlZmluZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2V0LXByb3RvLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zZXQtdG8tc3RyaW5nLXRhZy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2hhcmVkLWtleS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2hhcmVkLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zdHJpbmctYXQuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWluZGV4LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1pbnRlZ2VyLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1pb2JqZWN0LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1sZW5ndGguanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLW9iamVjdC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8tcHJpbWl0aXZlLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL191aWQuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3drcy1kZWZpbmUuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3drcy1leHQuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3drcy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9jb3JlLmdldC1pdGVyYXRvci1tZXRob2QuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvY29yZS5nZXQtaXRlcmF0b3IuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvY29yZS5pcy1pdGVyYWJsZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYuYXJyYXkuZnJvbS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYuYXJyYXkuaXRlcmF0b3IuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5hc3NpZ24uanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5jcmVhdGUuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5kZWZpbmUtcHJvcGVydHkuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC5nZXQtcHJvdG90eXBlLW9mLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3Qua2V5cy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYub2JqZWN0LnNldC1wcm90b3R5cGUtb2YuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2Lm9iamVjdC50by1zdHJpbmcuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2LnN0cmluZy5pdGVyYXRvci5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczYuc3ltYm9sLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNy5vYmplY3QuZW50cmllcy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczcuc3ltYm9sLmFzeW5jLWl0ZXJhdG9yLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNy5zeW1ib2wub2JzZXJ2YWJsZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy93ZWIuZG9tLml0ZXJhYmxlLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9fZnJlZUdsb2JhbC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX3Jvb3QuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2RlYm91bmNlLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9pc09iamVjdC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvaXNPYmplY3RMaWtlLmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC9pc1N5bWJvbC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvbm93LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC90aHJvdHRsZS5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvdG9OdW1iZXIuanMiLCJzcmMvanMvYXBwL2R1eC9hbHRlci5qcyIsInNyYy9qcy9hcHAvZHV4L2RvYy5qcyIsInNyYy9qcy9hcHAvZHV4L2ZpbHRlci5qcyIsInNyYy9qcy9hcHAvZHV4L21lLmpzIiwic3JjL2pzL2FwcC9kdXgvbm90aWZ5LmpzIiwic3JjL2pzL2FwcC9kdXgvcmVkdWNlcnMuanMiLCJzcmMvanMvYXBwL2R1eC9zZXJ2ZXIuanMiLCJzcmMvanMvYXBwL2R1eC90YWJsZXMuanMiLCJzcmMvanMvYXBwL2R1eC93aW4uanMiLCJzcmMvanMvYXBwL21haW4uanN4Iiwic3JjL2pzL2FwcC9vYmplY3QvQ2hlY2tib3hJLmpzeCIsInNyYy9qcy9hcHAvb2JqZWN0L0VVTWFwLmpzeCIsInNyYy9qcy9hcHAvcHVyZS9BbHRlcm5hdGl2ZS5qc3giLCJzcmMvanMvYXBwL3B1cmUvQXBwLmpzeCIsInNyYy9qcy9hcHAvcHVyZS9CYWNrb2ZmaWNlLmpzeCIsInNyYy9qcy9hcHAvcHVyZS9CeVZhbHVlLmpzeCIsInNyYy9qcy9hcHAvcHVyZS9Eb2MuanN4Iiwic3JjL2pzL2FwcC9wdXJlL0RvY0h0bWwuanN4Iiwic3JjL2pzL2FwcC9wdXJlL0RvY1BkZi5qc3giLCJzcmMvanMvYXBwL3B1cmUvRmFjZXQuanN4Iiwic3JjL2pzL2FwcC9wdXJlL0ZpbHRlci5qc3giLCJzcmMvanMvYXBwL3B1cmUvRnVsbFRleHQuanN4Iiwic3JjL2pzL2FwcC9wdXJlL0l0ZW1GaWVsZC5qc3giLCJzcmMvanMvYXBwL3B1cmUvSXRlbUhlYWQuanN4Iiwic3JjL2pzL2FwcC9wdXJlL0l0ZW1MaXN0LmpzeCIsInNyYy9qcy9hcHAvcHVyZS9JdGVtUmVjb3JkUHJlLmpzeCIsInNyYy9qcy9hcHAvcHVyZS9OYXZMaW5rLmpzeCIsInNyYy9qcy9hcHAvcHVyZS9Ob3RGb3VuZC5qc3giLCJzcmMvanMvYXBwL3B1cmUvUGFuZS5qc3giLCJzcmMvanMvYXBwL3B1cmUvUm9vdC5qc3giLCJzcmMvanMvYXBwL3B1cmUvU3RhdC5qc3giLCJzcmMvanMvYXBwL3B1cmUvU3RhdGljLmpzeCIsInNyYy9qcy9hcHAvcHVyZS9TdWJBcHAuanN4Iiwic3JjL2pzL2FwcC9zdGF0ZS9Eb2NNZC5qc3giLCJzcmMvanMvYXBwL3N0YXRlL0ZpbHRlckNvbXB1dGUuanN4Iiwic3JjL2pzL2FwcC9zdGF0ZS9JdGVtRmlsdGVyZWQuanN4Iiwic3JjL2pzL2FwcC9zdGF0ZS9JdGVtTXkuanN4Iiwic3JjL2pzL2FwcC9zdGF0ZS9JdGVtUmVjb3JkLmpzeCIsInNyYy9qcy9hcHAvc3RhdGUvTG9naW4uanN4Iiwic3JjL2pzL2FwcC9zdGF0ZS9Ob3RpZmljYXRpb24uanN4Iiwic3JjL2pzL2FwcC9zdGF0ZS9XaW5kb3cuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7O0FDQUE7O0FDQUE7O0FDQUE7O0FDQUE7O0FDQUE7O0FDQUE7O0FDQUE7O0FDQUE7O0FDQUE7O0FDQUE7O0FDQUE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7O0FDRkE7QUFDQTtBQUNBOztBQ0ZBO0FBQ0E7QUFDQTs7QUNGQTtBQUNBOztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBOztBQ0RBO0FBQ0E7O0FDREE7QUFDQTs7QUNEQTtBQUNBOztBQ0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBOztBQ0ZBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTs7QUNBQTtBQUNBO0FBQ0E7O0FDRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBOztBQ0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7O0FDRkE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakNBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTs7QUNGQTtBQUNBO0FBQ0E7O0FDRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTtBQUNBO0FBQ0E7O0FDRkE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMU9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNSQTs7QUNBQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1TEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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S0FBSyxhQUExQyxDQUNELEMscURBR1ksdUNBQW1CLENBQUUsd0JBQUYsQ0FBbkIsRUFBNkMsTUFBN0MsQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vYXJyYXkvZnJvbVwiKSwgX19lc01vZHVsZTogdHJ1ZSB9OyIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9nZXQtaXRlcmF0b3JcIiksIF9fZXNNb2R1bGU6IHRydWUgfTsiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vaXMtaXRlcmFibGVcIiksIF9fZXNNb2R1bGU6IHRydWUgfTsiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2Fzc2lnblwiKSwgX19lc01vZHVsZTogdHJ1ZSB9OyIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9vYmplY3QvY3JlYXRlXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07IiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL29iamVjdC9kZWZpbmUtcHJvcGVydHlcIiksIF9fZXNNb2R1bGU6IHRydWUgfTsiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2VudHJpZXNcIiksIF9fZXNNb2R1bGU6IHRydWUgfTsiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2dldC1wcm90b3R5cGUtb2ZcIiksIF9fZXNNb2R1bGU6IHRydWUgfTsiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L2tleXNcIiksIF9fZXNNb2R1bGU6IHRydWUgfTsiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vb2JqZWN0L3NldC1wcm90b3R5cGUtb2ZcIiksIF9fZXNNb2R1bGU6IHRydWUgfTsiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vc3ltYm9sXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07IiwibW9kdWxlLmV4cG9ydHMgPSB7IFwiZGVmYXVsdFwiOiByZXF1aXJlKFwiY29yZS1qcy9saWJyYXJ5L2ZuL3N5bWJvbC9pdGVyYXRvclwiKSwgX19lc01vZHVsZTogdHJ1ZSB9OyIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7XG4gIGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTtcbiAgfVxufTsiLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9kZWZpbmVQcm9wZXJ0eSA9IHJlcXVpcmUoXCIuLi9jb3JlLWpzL29iamVjdC9kZWZpbmUtcHJvcGVydHlcIik7XG5cbnZhciBfZGVmaW5lUHJvcGVydHkyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZGVmaW5lUHJvcGVydHkpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoKSB7XG4gIGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07XG4gICAgICBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7XG4gICAgICBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7XG4gICAgICBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlO1xuICAgICAgKDAsIF9kZWZpbmVQcm9wZXJ0eTIuZGVmYXVsdCkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHtcbiAgICBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpO1xuICAgIGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpO1xuICAgIHJldHVybiBDb25zdHJ1Y3RvcjtcbiAgfTtcbn0oKTsiLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9kZWZpbmVQcm9wZXJ0eSA9IHJlcXVpcmUoXCIuLi9jb3JlLWpzL29iamVjdC9kZWZpbmUtcHJvcGVydHlcIik7XG5cbnZhciBfZGVmaW5lUHJvcGVydHkyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZGVmaW5lUHJvcGVydHkpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAob2JqLCBrZXksIHZhbHVlKSB7XG4gIGlmIChrZXkgaW4gb2JqKSB7XG4gICAgKDAsIF9kZWZpbmVQcm9wZXJ0eTIuZGVmYXVsdCkob2JqLCBrZXksIHtcbiAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICB3cml0YWJsZTogdHJ1ZVxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIG9ialtrZXldID0gdmFsdWU7XG4gIH1cblxuICByZXR1cm4gb2JqO1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9hc3NpZ24gPSByZXF1aXJlKFwiLi4vY29yZS1qcy9vYmplY3QvYXNzaWduXCIpO1xuXG52YXIgX2Fzc2lnbjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9hc3NpZ24pO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5leHBvcnRzLmRlZmF1bHQgPSBfYXNzaWduMi5kZWZhdWx0IHx8IGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldO1xuXG4gICAgZm9yICh2YXIga2V5IGluIHNvdXJjZSkge1xuICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHtcbiAgICAgICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGFyZ2V0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9zZXRQcm90b3R5cGVPZiA9IHJlcXVpcmUoXCIuLi9jb3JlLWpzL29iamVjdC9zZXQtcHJvdG90eXBlLW9mXCIpO1xuXG52YXIgX3NldFByb3RvdHlwZU9mMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3NldFByb3RvdHlwZU9mKTtcblxudmFyIF9jcmVhdGUgPSByZXF1aXJlKFwiLi4vY29yZS1qcy9vYmplY3QvY3JlYXRlXCIpO1xuXG52YXIgX2NyZWF0ZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jcmVhdGUpO1xuXG52YXIgX3R5cGVvZjIgPSByZXF1aXJlKFwiLi4vaGVscGVycy90eXBlb2ZcIik7XG5cbnZhciBfdHlwZW9mMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3R5cGVvZjIpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHtcbiAgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90IFwiICsgKHR5cGVvZiBzdXBlckNsYXNzID09PSBcInVuZGVmaW5lZFwiID8gXCJ1bmRlZmluZWRcIiA6ICgwLCBfdHlwZW9mMy5kZWZhdWx0KShzdXBlckNsYXNzKSkpO1xuICB9XG5cbiAgc3ViQ2xhc3MucHJvdG90eXBlID0gKDAsIF9jcmVhdGUyLmRlZmF1bHQpKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHtcbiAgICBjb25zdHJ1Y3Rvcjoge1xuICAgICAgdmFsdWU6IHN1YkNsYXNzLFxuICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH1cbiAgfSk7XG4gIGlmIChzdXBlckNsYXNzKSBfc2V0UHJvdG90eXBlT2YyLmRlZmF1bHQgPyAoMCwgX3NldFByb3RvdHlwZU9mMi5kZWZhdWx0KShzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzO1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKG9iaiwga2V5cykge1xuICB2YXIgdGFyZ2V0ID0ge307XG5cbiAgZm9yICh2YXIgaSBpbiBvYmopIHtcbiAgICBpZiAoa2V5cy5pbmRleE9mKGkpID49IDApIGNvbnRpbnVlO1xuICAgIGlmICghT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgaSkpIGNvbnRpbnVlO1xuICAgIHRhcmdldFtpXSA9IG9ialtpXTtcbiAgfVxuXG4gIHJldHVybiB0YXJnZXQ7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX3R5cGVvZjIgPSByZXF1aXJlKFwiLi4vaGVscGVycy90eXBlb2ZcIik7XG5cbnZhciBfdHlwZW9mMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3R5cGVvZjIpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5leHBvcnRzLmRlZmF1bHQgPSBmdW5jdGlvbiAoc2VsZiwgY2FsbCkge1xuICBpZiAoIXNlbGYpIHtcbiAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7XG4gIH1cblxuICByZXR1cm4gY2FsbCAmJiAoKHR5cGVvZiBjYWxsID09PSBcInVuZGVmaW5lZFwiID8gXCJ1bmRlZmluZWRcIiA6ICgwLCBfdHlwZW9mMy5kZWZhdWx0KShjYWxsKSkgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikgPyBjYWxsIDogc2VsZjtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfaXNJdGVyYWJsZTIgPSByZXF1aXJlKFwiLi4vY29yZS1qcy9pcy1pdGVyYWJsZVwiKTtcblxudmFyIF9pc0l0ZXJhYmxlMyA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2lzSXRlcmFibGUyKTtcblxudmFyIF9nZXRJdGVyYXRvcjIgPSByZXF1aXJlKFwiLi4vY29yZS1qcy9nZXQtaXRlcmF0b3JcIik7XG5cbnZhciBfZ2V0SXRlcmF0b3IzID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZ2V0SXRlcmF0b3IyKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKCkge1xuICBmdW5jdGlvbiBzbGljZUl0ZXJhdG9yKGFyciwgaSkge1xuICAgIHZhciBfYXJyID0gW107XG4gICAgdmFyIF9uID0gdHJ1ZTtcbiAgICB2YXIgX2QgPSBmYWxzZTtcbiAgICB2YXIgX2UgPSB1bmRlZmluZWQ7XG5cbiAgICB0cnkge1xuICAgICAgZm9yICh2YXIgX2kgPSAoMCwgX2dldEl0ZXJhdG9yMy5kZWZhdWx0KShhcnIpLCBfczsgIShfbiA9IChfcyA9IF9pLm5leHQoKSkuZG9uZSk7IF9uID0gdHJ1ZSkge1xuICAgICAgICBfYXJyLnB1c2goX3MudmFsdWUpO1xuXG4gICAgICAgIGlmIChpICYmIF9hcnIubGVuZ3RoID09PSBpKSBicmVhaztcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIF9kID0gdHJ1ZTtcbiAgICAgIF9lID0gZXJyO1xuICAgIH0gZmluYWxseSB7XG4gICAgICB0cnkge1xuICAgICAgICBpZiAoIV9uICYmIF9pW1wicmV0dXJuXCJdKSBfaVtcInJldHVyblwiXSgpO1xuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgaWYgKF9kKSB0aHJvdyBfZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gX2FycjtcbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbiAoYXJyLCBpKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkge1xuICAgICAgcmV0dXJuIGFycjtcbiAgICB9IGVsc2UgaWYgKCgwLCBfaXNJdGVyYWJsZTMuZGVmYXVsdCkoT2JqZWN0KGFycikpKSB7XG4gICAgICByZXR1cm4gc2xpY2VJdGVyYXRvcihhcnIsIGkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiSW52YWxpZCBhdHRlbXB0IHRvIGRlc3RydWN0dXJlIG5vbi1pdGVyYWJsZSBpbnN0YW5jZVwiKTtcbiAgICB9XG4gIH07XG59KCk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfZnJvbSA9IHJlcXVpcmUoXCIuLi9jb3JlLWpzL2FycmF5L2Zyb21cIik7XG5cbnZhciBfZnJvbTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9mcm9tKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKGFycikge1xuICBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBBcnJheShhcnIubGVuZ3RoKTsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuICAgICAgYXJyMltpXSA9IGFycltpXTtcbiAgICB9XG5cbiAgICByZXR1cm4gYXJyMjtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gKDAsIF9mcm9tMi5kZWZhdWx0KShhcnIpO1xuICB9XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX2l0ZXJhdG9yID0gcmVxdWlyZShcIi4uL2NvcmUtanMvc3ltYm9sL2l0ZXJhdG9yXCIpO1xuXG52YXIgX2l0ZXJhdG9yMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2l0ZXJhdG9yKTtcblxudmFyIF9zeW1ib2wgPSByZXF1aXJlKFwiLi4vY29yZS1qcy9zeW1ib2xcIik7XG5cbnZhciBfc3ltYm9sMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3N5bWJvbCk7XG5cbnZhciBfdHlwZW9mID0gdHlwZW9mIF9zeW1ib2wyLmRlZmF1bHQgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgX2l0ZXJhdG9yMi5kZWZhdWx0ID09PSBcInN5bWJvbFwiID8gZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfSA6IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgX3N5bWJvbDIuZGVmYXVsdCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gX3N5bWJvbDIuZGVmYXVsdCAmJiBvYmogIT09IF9zeW1ib2wyLmRlZmF1bHQucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IHR5cGVvZiBfc3ltYm9sMi5kZWZhdWx0ID09PSBcImZ1bmN0aW9uXCIgJiYgX3R5cGVvZihfaXRlcmF0b3IyLmRlZmF1bHQpID09PSBcInN5bWJvbFwiID8gZnVuY3Rpb24gKG9iaikge1xuICByZXR1cm4gdHlwZW9mIG9iaiA9PT0gXCJ1bmRlZmluZWRcIiA/IFwidW5kZWZpbmVkXCIgOiBfdHlwZW9mKG9iaik7XG59IDogZnVuY3Rpb24gKG9iaikge1xuICByZXR1cm4gb2JqICYmIHR5cGVvZiBfc3ltYm9sMi5kZWZhdWx0ID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBfc3ltYm9sMi5kZWZhdWx0ICYmIG9iaiAhPT0gX3N5bWJvbDIuZGVmYXVsdC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iaiA9PT0gXCJ1bmRlZmluZWRcIiA/IFwidW5kZWZpbmVkXCIgOiBfdHlwZW9mKG9iaik7XG59OyIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2LnN0cmluZy5pdGVyYXRvcicpO1xucmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYuYXJyYXkuZnJvbScpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJykuQXJyYXkuZnJvbTsiLCJyZXF1aXJlKCcuLi9tb2R1bGVzL3dlYi5kb20uaXRlcmFibGUnKTtcbnJlcXVpcmUoJy4uL21vZHVsZXMvZXM2LnN0cmluZy5pdGVyYXRvcicpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi9tb2R1bGVzL2NvcmUuZ2V0LWl0ZXJhdG9yJyk7IiwicmVxdWlyZSgnLi4vbW9kdWxlcy93ZWIuZG9tLml0ZXJhYmxlJyk7XG5yZXF1aXJlKCcuLi9tb2R1bGVzL2VzNi5zdHJpbmcuaXRlcmF0b3InKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vbW9kdWxlcy9jb3JlLmlzLWl0ZXJhYmxlJyk7IiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYub2JqZWN0LmFzc2lnbicpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJykuT2JqZWN0LmFzc2lnbjsiLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5vYmplY3QuY3JlYXRlJyk7XG52YXIgJE9iamVjdCA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5PYmplY3Q7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNyZWF0ZShQLCBEKXtcbiAgcmV0dXJuICRPYmplY3QuY3JlYXRlKFAsIEQpO1xufTsiLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5vYmplY3QuZGVmaW5lLXByb3BlcnR5Jyk7XG52YXIgJE9iamVjdCA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5PYmplY3Q7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGRlZmluZVByb3BlcnR5KGl0LCBrZXksIGRlc2Mpe1xuICByZXR1cm4gJE9iamVjdC5kZWZpbmVQcm9wZXJ0eShpdCwga2V5LCBkZXNjKTtcbn07IiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczcub2JqZWN0LmVudHJpZXMnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLk9iamVjdC5lbnRyaWVzOyIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm9iamVjdC5nZXQtcHJvdG90eXBlLW9mJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5PYmplY3QuZ2V0UHJvdG90eXBlT2Y7IiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYub2JqZWN0LmtleXMnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLk9iamVjdC5rZXlzOyIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm9iamVjdC5zZXQtcHJvdG90eXBlLW9mJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5PYmplY3Quc2V0UHJvdG90eXBlT2Y7IiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYuc3ltYm9sJyk7XG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5vYmplY3QudG8tc3RyaW5nJyk7XG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNy5zeW1ib2wuYXN5bmMtaXRlcmF0b3InKTtcbnJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM3LnN5bWJvbC5vYnNlcnZhYmxlJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uLy4uL21vZHVsZXMvX2NvcmUnKS5TeW1ib2w7IiwicmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYuc3RyaW5nLml0ZXJhdG9yJyk7XG5yZXF1aXJlKCcuLi8uLi9tb2R1bGVzL3dlYi5kb20uaXRlcmFibGUnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fd2tzLWV4dCcpLmYoJ2l0ZXJhdG9yJyk7IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIGlmKHR5cGVvZiBpdCAhPSAnZnVuY3Rpb24nKXRocm93IFR5cGVFcnJvcihpdCArICcgaXMgbm90IGEgZnVuY3Rpb24hJyk7XG4gIHJldHVybiBpdDtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpeyAvKiBlbXB0eSAqLyB9OyIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIGlmKCFpc09iamVjdChpdCkpdGhyb3cgVHlwZUVycm9yKGl0ICsgJyBpcyBub3QgYW4gb2JqZWN0IScpO1xuICByZXR1cm4gaXQ7XG59OyIsIi8vIGZhbHNlIC0+IEFycmF5I2luZGV4T2Zcbi8vIHRydWUgIC0+IEFycmF5I2luY2x1ZGVzXG52YXIgdG9JT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpXG4gICwgdG9MZW5ndGggID0gcmVxdWlyZSgnLi9fdG8tbGVuZ3RoJylcbiAgLCB0b0luZGV4ICAgPSByZXF1aXJlKCcuL190by1pbmRleCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihJU19JTkNMVURFUyl7XG4gIHJldHVybiBmdW5jdGlvbigkdGhpcywgZWwsIGZyb21JbmRleCl7XG4gICAgdmFyIE8gICAgICA9IHRvSU9iamVjdCgkdGhpcylcbiAgICAgICwgbGVuZ3RoID0gdG9MZW5ndGgoTy5sZW5ndGgpXG4gICAgICAsIGluZGV4ICA9IHRvSW5kZXgoZnJvbUluZGV4LCBsZW5ndGgpXG4gICAgICAsIHZhbHVlO1xuICAgIC8vIEFycmF5I2luY2x1ZGVzIHVzZXMgU2FtZVZhbHVlWmVybyBlcXVhbGl0eSBhbGdvcml0aG1cbiAgICBpZihJU19JTkNMVURFUyAmJiBlbCAhPSBlbCl3aGlsZShsZW5ndGggPiBpbmRleCl7XG4gICAgICB2YWx1ZSA9IE9baW5kZXgrK107XG4gICAgICBpZih2YWx1ZSAhPSB2YWx1ZSlyZXR1cm4gdHJ1ZTtcbiAgICAvLyBBcnJheSN0b0luZGV4IGlnbm9yZXMgaG9sZXMsIEFycmF5I2luY2x1ZGVzIC0gbm90XG4gICAgfSBlbHNlIGZvcig7bGVuZ3RoID4gaW5kZXg7IGluZGV4KyspaWYoSVNfSU5DTFVERVMgfHwgaW5kZXggaW4gTyl7XG4gICAgICBpZihPW2luZGV4XSA9PT0gZWwpcmV0dXJuIElTX0lOQ0xVREVTIHx8IGluZGV4IHx8IDA7XG4gICAgfSByZXR1cm4gIUlTX0lOQ0xVREVTICYmIC0xO1xuICB9O1xufTsiLCIvLyBnZXR0aW5nIHRhZyBmcm9tIDE5LjEuMy42IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcoKVxudmFyIGNvZiA9IHJlcXVpcmUoJy4vX2NvZicpXG4gICwgVEFHID0gcmVxdWlyZSgnLi9fd2tzJykoJ3RvU3RyaW5nVGFnJylcbiAgLy8gRVMzIHdyb25nIGhlcmVcbiAgLCBBUkcgPSBjb2YoZnVuY3Rpb24oKXsgcmV0dXJuIGFyZ3VtZW50czsgfSgpKSA9PSAnQXJndW1lbnRzJztcblxuLy8gZmFsbGJhY2sgZm9yIElFMTEgU2NyaXB0IEFjY2VzcyBEZW5pZWQgZXJyb3JcbnZhciB0cnlHZXQgPSBmdW5jdGlvbihpdCwga2V5KXtcbiAgdHJ5IHtcbiAgICByZXR1cm4gaXRba2V5XTtcbiAgfSBjYXRjaChlKXsgLyogZW1wdHkgKi8gfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHZhciBPLCBULCBCO1xuICByZXR1cm4gaXQgPT09IHVuZGVmaW5lZCA/ICdVbmRlZmluZWQnIDogaXQgPT09IG51bGwgPyAnTnVsbCdcbiAgICAvLyBAQHRvU3RyaW5nVGFnIGNhc2VcbiAgICA6IHR5cGVvZiAoVCA9IHRyeUdldChPID0gT2JqZWN0KGl0KSwgVEFHKSkgPT0gJ3N0cmluZycgPyBUXG4gICAgLy8gYnVpbHRpblRhZyBjYXNlXG4gICAgOiBBUkcgPyBjb2YoTylcbiAgICAvLyBFUzMgYXJndW1lbnRzIGZhbGxiYWNrXG4gICAgOiAoQiA9IGNvZihPKSkgPT0gJ09iamVjdCcgJiYgdHlwZW9mIE8uY2FsbGVlID09ICdmdW5jdGlvbicgPyAnQXJndW1lbnRzJyA6IEI7XG59OyIsInZhciB0b1N0cmluZyA9IHt9LnRvU3RyaW5nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwoaXQpLnNsaWNlKDgsIC0xKTtcbn07IiwidmFyIGNvcmUgPSBtb2R1bGUuZXhwb3J0cyA9IHt2ZXJzaW9uOiAnMi40LjAnfTtcbmlmKHR5cGVvZiBfX2UgPT0gJ251bWJlcicpX19lID0gY29yZTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bmRlZiIsIid1c2Ugc3RyaWN0JztcbnZhciAkZGVmaW5lUHJvcGVydHkgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKVxuICAsIGNyZWF0ZURlc2MgICAgICA9IHJlcXVpcmUoJy4vX3Byb3BlcnR5LWRlc2MnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihvYmplY3QsIGluZGV4LCB2YWx1ZSl7XG4gIGlmKGluZGV4IGluIG9iamVjdCkkZGVmaW5lUHJvcGVydHkuZihvYmplY3QsIGluZGV4LCBjcmVhdGVEZXNjKDAsIHZhbHVlKSk7XG4gIGVsc2Ugb2JqZWN0W2luZGV4XSA9IHZhbHVlO1xufTsiLCIvLyBvcHRpb25hbCAvIHNpbXBsZSBjb250ZXh0IGJpbmRpbmdcbnZhciBhRnVuY3Rpb24gPSByZXF1aXJlKCcuL19hLWZ1bmN0aW9uJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGZuLCB0aGF0LCBsZW5ndGgpe1xuICBhRnVuY3Rpb24oZm4pO1xuICBpZih0aGF0ID09PSB1bmRlZmluZWQpcmV0dXJuIGZuO1xuICBzd2l0Y2gobGVuZ3RoKXtcbiAgICBjYXNlIDE6IHJldHVybiBmdW5jdGlvbihhKXtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEpO1xuICAgIH07XG4gICAgY2FzZSAyOiByZXR1cm4gZnVuY3Rpb24oYSwgYil7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhLCBiKTtcbiAgICB9O1xuICAgIGNhc2UgMzogcmV0dXJuIGZ1bmN0aW9uKGEsIGIsIGMpe1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSwgYiwgYyk7XG4gICAgfTtcbiAgfVxuICByZXR1cm4gZnVuY3Rpb24oLyogLi4uYXJncyAqLyl7XG4gICAgcmV0dXJuIGZuLmFwcGx5KHRoYXQsIGFyZ3VtZW50cyk7XG4gIH07XG59OyIsIi8vIDcuMi4xIFJlcXVpcmVPYmplY3RDb2VyY2libGUoYXJndW1lbnQpXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgaWYoaXQgPT0gdW5kZWZpbmVkKXRocm93IFR5cGVFcnJvcihcIkNhbid0IGNhbGwgbWV0aG9kIG9uICBcIiArIGl0KTtcbiAgcmV0dXJuIGl0O1xufTsiLCIvLyBUaGFuaydzIElFOCBmb3IgaGlzIGZ1bm55IGRlZmluZVByb3BlcnR5XG5tb2R1bGUuZXhwb3J0cyA9ICFyZXF1aXJlKCcuL19mYWlscycpKGZ1bmN0aW9uKCl7XG4gIHJldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkoe30sICdhJywge2dldDogZnVuY3Rpb24oKXsgcmV0dXJuIDc7IH19KS5hICE9IDc7XG59KTsiLCJ2YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKVxuICAsIGRvY3VtZW50ID0gcmVxdWlyZSgnLi9fZ2xvYmFsJykuZG9jdW1lbnRcbiAgLy8gaW4gb2xkIElFIHR5cGVvZiBkb2N1bWVudC5jcmVhdGVFbGVtZW50IGlzICdvYmplY3QnXG4gICwgaXMgPSBpc09iamVjdChkb2N1bWVudCkgJiYgaXNPYmplY3QoZG9jdW1lbnQuY3JlYXRlRWxlbWVudCk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIGlzID8gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChpdCkgOiB7fTtcbn07IiwiLy8gSUUgOC0gZG9uJ3QgZW51bSBidWcga2V5c1xubW9kdWxlLmV4cG9ydHMgPSAoXG4gICdjb25zdHJ1Y3RvcixoYXNPd25Qcm9wZXJ0eSxpc1Byb3RvdHlwZU9mLHByb3BlcnR5SXNFbnVtZXJhYmxlLHRvTG9jYWxlU3RyaW5nLHRvU3RyaW5nLHZhbHVlT2YnXG4pLnNwbGl0KCcsJyk7IiwiLy8gYWxsIGVudW1lcmFibGUgb2JqZWN0IGtleXMsIGluY2x1ZGVzIHN5bWJvbHNcbnZhciBnZXRLZXlzID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMnKVxuICAsIGdPUFMgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZ29wcycpXG4gICwgcElFICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1waWUnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICB2YXIgcmVzdWx0ICAgICA9IGdldEtleXMoaXQpXG4gICAgLCBnZXRTeW1ib2xzID0gZ09QUy5mO1xuICBpZihnZXRTeW1ib2xzKXtcbiAgICB2YXIgc3ltYm9scyA9IGdldFN5bWJvbHMoaXQpXG4gICAgICAsIGlzRW51bSAgPSBwSUUuZlxuICAgICAgLCBpICAgICAgID0gMFxuICAgICAgLCBrZXk7XG4gICAgd2hpbGUoc3ltYm9scy5sZW5ndGggPiBpKWlmKGlzRW51bS5jYWxsKGl0LCBrZXkgPSBzeW1ib2xzW2krK10pKXJlc3VsdC5wdXNoKGtleSk7XG4gIH0gcmV0dXJuIHJlc3VsdDtcbn07IiwidmFyIGdsb2JhbCAgICA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpXG4gICwgY29yZSAgICAgID0gcmVxdWlyZSgnLi9fY29yZScpXG4gICwgY3R4ICAgICAgID0gcmVxdWlyZSgnLi9fY3R4JylcbiAgLCBoaWRlICAgICAgPSByZXF1aXJlKCcuL19oaWRlJylcbiAgLCBQUk9UT1RZUEUgPSAncHJvdG90eXBlJztcblxudmFyICRleHBvcnQgPSBmdW5jdGlvbih0eXBlLCBuYW1lLCBzb3VyY2Upe1xuICB2YXIgSVNfRk9SQ0VEID0gdHlwZSAmICRleHBvcnQuRlxuICAgICwgSVNfR0xPQkFMID0gdHlwZSAmICRleHBvcnQuR1xuICAgICwgSVNfU1RBVElDID0gdHlwZSAmICRleHBvcnQuU1xuICAgICwgSVNfUFJPVE8gID0gdHlwZSAmICRleHBvcnQuUFxuICAgICwgSVNfQklORCAgID0gdHlwZSAmICRleHBvcnQuQlxuICAgICwgSVNfV1JBUCAgID0gdHlwZSAmICRleHBvcnQuV1xuICAgICwgZXhwb3J0cyAgID0gSVNfR0xPQkFMID8gY29yZSA6IGNvcmVbbmFtZV0gfHwgKGNvcmVbbmFtZV0gPSB7fSlcbiAgICAsIGV4cFByb3RvICA9IGV4cG9ydHNbUFJPVE9UWVBFXVxuICAgICwgdGFyZ2V0ICAgID0gSVNfR0xPQkFMID8gZ2xvYmFsIDogSVNfU1RBVElDID8gZ2xvYmFsW25hbWVdIDogKGdsb2JhbFtuYW1lXSB8fCB7fSlbUFJPVE9UWVBFXVxuICAgICwga2V5LCBvd24sIG91dDtcbiAgaWYoSVNfR0xPQkFMKXNvdXJjZSA9IG5hbWU7XG4gIGZvcihrZXkgaW4gc291cmNlKXtcbiAgICAvLyBjb250YWlucyBpbiBuYXRpdmVcbiAgICBvd24gPSAhSVNfRk9SQ0VEICYmIHRhcmdldCAmJiB0YXJnZXRba2V5XSAhPT0gdW5kZWZpbmVkO1xuICAgIGlmKG93biAmJiBrZXkgaW4gZXhwb3J0cyljb250aW51ZTtcbiAgICAvLyBleHBvcnQgbmF0aXZlIG9yIHBhc3NlZFxuICAgIG91dCA9IG93biA/IHRhcmdldFtrZXldIDogc291cmNlW2tleV07XG4gICAgLy8gcHJldmVudCBnbG9iYWwgcG9sbHV0aW9uIGZvciBuYW1lc3BhY2VzXG4gICAgZXhwb3J0c1trZXldID0gSVNfR0xPQkFMICYmIHR5cGVvZiB0YXJnZXRba2V5XSAhPSAnZnVuY3Rpb24nID8gc291cmNlW2tleV1cbiAgICAvLyBiaW5kIHRpbWVycyB0byBnbG9iYWwgZm9yIGNhbGwgZnJvbSBleHBvcnQgY29udGV4dFxuICAgIDogSVNfQklORCAmJiBvd24gPyBjdHgob3V0LCBnbG9iYWwpXG4gICAgLy8gd3JhcCBnbG9iYWwgY29uc3RydWN0b3JzIGZvciBwcmV2ZW50IGNoYW5nZSB0aGVtIGluIGxpYnJhcnlcbiAgICA6IElTX1dSQVAgJiYgdGFyZ2V0W2tleV0gPT0gb3V0ID8gKGZ1bmN0aW9uKEMpe1xuICAgICAgdmFyIEYgPSBmdW5jdGlvbihhLCBiLCBjKXtcbiAgICAgICAgaWYodGhpcyBpbnN0YW5jZW9mIEMpe1xuICAgICAgICAgIHN3aXRjaChhcmd1bWVudHMubGVuZ3RoKXtcbiAgICAgICAgICAgIGNhc2UgMDogcmV0dXJuIG5ldyBDO1xuICAgICAgICAgICAgY2FzZSAxOiByZXR1cm4gbmV3IEMoYSk7XG4gICAgICAgICAgICBjYXNlIDI6IHJldHVybiBuZXcgQyhhLCBiKTtcbiAgICAgICAgICB9IHJldHVybiBuZXcgQyhhLCBiLCBjKTtcbiAgICAgICAgfSByZXR1cm4gQy5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgfTtcbiAgICAgIEZbUFJPVE9UWVBFXSA9IENbUFJPVE9UWVBFXTtcbiAgICAgIHJldHVybiBGO1xuICAgIC8vIG1ha2Ugc3RhdGljIHZlcnNpb25zIGZvciBwcm90b3R5cGUgbWV0aG9kc1xuICAgIH0pKG91dCkgOiBJU19QUk9UTyAmJiB0eXBlb2Ygb3V0ID09ICdmdW5jdGlvbicgPyBjdHgoRnVuY3Rpb24uY2FsbCwgb3V0KSA6IG91dDtcbiAgICAvLyBleHBvcnQgcHJvdG8gbWV0aG9kcyB0byBjb3JlLiVDT05TVFJVQ1RPUiUubWV0aG9kcy4lTkFNRSVcbiAgICBpZihJU19QUk9UTyl7XG4gICAgICAoZXhwb3J0cy52aXJ0dWFsIHx8IChleHBvcnRzLnZpcnR1YWwgPSB7fSkpW2tleV0gPSBvdXQ7XG4gICAgICAvLyBleHBvcnQgcHJvdG8gbWV0aG9kcyB0byBjb3JlLiVDT05TVFJVQ1RPUiUucHJvdG90eXBlLiVOQU1FJVxuICAgICAgaWYodHlwZSAmICRleHBvcnQuUiAmJiBleHBQcm90byAmJiAhZXhwUHJvdG9ba2V5XSloaWRlKGV4cFByb3RvLCBrZXksIG91dCk7XG4gICAgfVxuICB9XG59O1xuLy8gdHlwZSBiaXRtYXBcbiRleHBvcnQuRiA9IDE7ICAgLy8gZm9yY2VkXG4kZXhwb3J0LkcgPSAyOyAgIC8vIGdsb2JhbFxuJGV4cG9ydC5TID0gNDsgICAvLyBzdGF0aWNcbiRleHBvcnQuUCA9IDg7ICAgLy8gcHJvdG9cbiRleHBvcnQuQiA9IDE2OyAgLy8gYmluZFxuJGV4cG9ydC5XID0gMzI7ICAvLyB3cmFwXG4kZXhwb3J0LlUgPSA2NDsgIC8vIHNhZmVcbiRleHBvcnQuUiA9IDEyODsgLy8gcmVhbCBwcm90byBtZXRob2QgZm9yIGBsaWJyYXJ5YCBcbm1vZHVsZS5leHBvcnRzID0gJGV4cG9ydDsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGV4ZWMpe1xuICB0cnkge1xuICAgIHJldHVybiAhIWV4ZWMoKTtcbiAgfSBjYXRjaChlKXtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufTsiLCIvLyBodHRwczovL2dpdGh1Yi5jb20vemxvaXJvY2svY29yZS1qcy9pc3N1ZXMvODYjaXNzdWVjb21tZW50LTExNTc1OTAyOFxudmFyIGdsb2JhbCA9IG1vZHVsZS5leHBvcnRzID0gdHlwZW9mIHdpbmRvdyAhPSAndW5kZWZpbmVkJyAmJiB3aW5kb3cuTWF0aCA9PSBNYXRoXG4gID8gd2luZG93IDogdHlwZW9mIHNlbGYgIT0gJ3VuZGVmaW5lZCcgJiYgc2VsZi5NYXRoID09IE1hdGggPyBzZWxmIDogRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcbmlmKHR5cGVvZiBfX2cgPT0gJ251bWJlcicpX19nID0gZ2xvYmFsOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmIiwidmFyIGhhc093blByb3BlcnR5ID0ge30uaGFzT3duUHJvcGVydHk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0LCBrZXkpe1xuICByZXR1cm4gaGFzT3duUHJvcGVydHkuY2FsbChpdCwga2V5KTtcbn07IiwidmFyIGRQICAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKVxuICAsIGNyZWF0ZURlc2MgPSByZXF1aXJlKCcuL19wcm9wZXJ0eS1kZXNjJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgPyBmdW5jdGlvbihvYmplY3QsIGtleSwgdmFsdWUpe1xuICByZXR1cm4gZFAuZihvYmplY3QsIGtleSwgY3JlYXRlRGVzYygxLCB2YWx1ZSkpO1xufSA6IGZ1bmN0aW9uKG9iamVjdCwga2V5LCB2YWx1ZSl7XG4gIG9iamVjdFtrZXldID0gdmFsdWU7XG4gIHJldHVybiBvYmplY3Q7XG59OyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fZ2xvYmFsJykuZG9jdW1lbnQgJiYgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50OyIsIm1vZHVsZS5leHBvcnRzID0gIXJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgJiYgIXJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24oKXtcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShyZXF1aXJlKCcuL19kb20tY3JlYXRlJykoJ2RpdicpLCAnYScsIHtnZXQ6IGZ1bmN0aW9uKCl7IHJldHVybiA3OyB9fSkuYSAhPSA3O1xufSk7IiwiLy8gZmFsbGJhY2sgZm9yIG5vbi1hcnJheS1saWtlIEVTMyBhbmQgbm9uLWVudW1lcmFibGUgb2xkIFY4IHN0cmluZ3NcbnZhciBjb2YgPSByZXF1aXJlKCcuL19jb2YnKTtcbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0KCd6JykucHJvcGVydHlJc0VudW1lcmFibGUoMCkgPyBPYmplY3QgOiBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBjb2YoaXQpID09ICdTdHJpbmcnID8gaXQuc3BsaXQoJycpIDogT2JqZWN0KGl0KTtcbn07IiwiLy8gY2hlY2sgb24gZGVmYXVsdCBBcnJheSBpdGVyYXRvclxudmFyIEl0ZXJhdG9ycyAgPSByZXF1aXJlKCcuL19pdGVyYXRvcnMnKVxuICAsIElURVJBVE9SICAgPSByZXF1aXJlKCcuL193a3MnKSgnaXRlcmF0b3InKVxuICAsIEFycmF5UHJvdG8gPSBBcnJheS5wcm90b3R5cGU7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gaXQgIT09IHVuZGVmaW5lZCAmJiAoSXRlcmF0b3JzLkFycmF5ID09PSBpdCB8fCBBcnJheVByb3RvW0lURVJBVE9SXSA9PT0gaXQpO1xufTsiLCIvLyA3LjIuMiBJc0FycmF5KGFyZ3VtZW50KVxudmFyIGNvZiA9IHJlcXVpcmUoJy4vX2NvZicpO1xubW9kdWxlLmV4cG9ydHMgPSBBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uIGlzQXJyYXkoYXJnKXtcbiAgcmV0dXJuIGNvZihhcmcpID09ICdBcnJheSc7XG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gdHlwZW9mIGl0ID09PSAnb2JqZWN0JyA/IGl0ICE9PSBudWxsIDogdHlwZW9mIGl0ID09PSAnZnVuY3Rpb24nO1xufTsiLCIvLyBjYWxsIHNvbWV0aGluZyBvbiBpdGVyYXRvciBzdGVwIHdpdGggc2FmZSBjbG9zaW5nIG9uIGVycm9yXG52YXIgYW5PYmplY3QgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXRlcmF0b3IsIGZuLCB2YWx1ZSwgZW50cmllcyl7XG4gIHRyeSB7XG4gICAgcmV0dXJuIGVudHJpZXMgPyBmbihhbk9iamVjdCh2YWx1ZSlbMF0sIHZhbHVlWzFdKSA6IGZuKHZhbHVlKTtcbiAgLy8gNy40LjYgSXRlcmF0b3JDbG9zZShpdGVyYXRvciwgY29tcGxldGlvbilcbiAgfSBjYXRjaChlKXtcbiAgICB2YXIgcmV0ID0gaXRlcmF0b3JbJ3JldHVybiddO1xuICAgIGlmKHJldCAhPT0gdW5kZWZpbmVkKWFuT2JqZWN0KHJldC5jYWxsKGl0ZXJhdG9yKSk7XG4gICAgdGhyb3cgZTtcbiAgfVxufTsiLCIndXNlIHN0cmljdCc7XG52YXIgY3JlYXRlICAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtY3JlYXRlJylcbiAgLCBkZXNjcmlwdG9yICAgICA9IHJlcXVpcmUoJy4vX3Byb3BlcnR5LWRlc2MnKVxuICAsIHNldFRvU3RyaW5nVGFnID0gcmVxdWlyZSgnLi9fc2V0LXRvLXN0cmluZy10YWcnKVxuICAsIEl0ZXJhdG9yUHJvdG90eXBlID0ge307XG5cbi8vIDI1LjEuMi4xLjEgJUl0ZXJhdG9yUHJvdG90eXBlJVtAQGl0ZXJhdG9yXSgpXG5yZXF1aXJlKCcuL19oaWRlJykoSXRlcmF0b3JQcm90b3R5cGUsIHJlcXVpcmUoJy4vX3drcycpKCdpdGVyYXRvcicpLCBmdW5jdGlvbigpeyByZXR1cm4gdGhpczsgfSk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oQ29uc3RydWN0b3IsIE5BTUUsIG5leHQpe1xuICBDb25zdHJ1Y3Rvci5wcm90b3R5cGUgPSBjcmVhdGUoSXRlcmF0b3JQcm90b3R5cGUsIHtuZXh0OiBkZXNjcmlwdG9yKDEsIG5leHQpfSk7XG4gIHNldFRvU3RyaW5nVGFnKENvbnN0cnVjdG9yLCBOQU1FICsgJyBJdGVyYXRvcicpO1xufTsiLCIndXNlIHN0cmljdCc7XG52YXIgTElCUkFSWSAgICAgICAgPSByZXF1aXJlKCcuL19saWJyYXJ5JylcbiAgLCAkZXhwb3J0ICAgICAgICA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4gICwgcmVkZWZpbmUgICAgICAgPSByZXF1aXJlKCcuL19yZWRlZmluZScpXG4gICwgaGlkZSAgICAgICAgICAgPSByZXF1aXJlKCcuL19oaWRlJylcbiAgLCBoYXMgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2hhcycpXG4gICwgSXRlcmF0b3JzICAgICAgPSByZXF1aXJlKCcuL19pdGVyYXRvcnMnKVxuICAsICRpdGVyQ3JlYXRlICAgID0gcmVxdWlyZSgnLi9faXRlci1jcmVhdGUnKVxuICAsIHNldFRvU3RyaW5nVGFnID0gcmVxdWlyZSgnLi9fc2V0LXRvLXN0cmluZy10YWcnKVxuICAsIGdldFByb3RvdHlwZU9mID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdwbycpXG4gICwgSVRFUkFUT1IgICAgICAgPSByZXF1aXJlKCcuL193a3MnKSgnaXRlcmF0b3InKVxuICAsIEJVR0dZICAgICAgICAgID0gIShbXS5rZXlzICYmICduZXh0JyBpbiBbXS5rZXlzKCkpIC8vIFNhZmFyaSBoYXMgYnVnZ3kgaXRlcmF0b3JzIHcvbyBgbmV4dGBcbiAgLCBGRl9JVEVSQVRPUiAgICA9ICdAQGl0ZXJhdG9yJ1xuICAsIEtFWVMgICAgICAgICAgID0gJ2tleXMnXG4gICwgVkFMVUVTICAgICAgICAgPSAndmFsdWVzJztcblxudmFyIHJldHVyblRoaXMgPSBmdW5jdGlvbigpeyByZXR1cm4gdGhpczsgfTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihCYXNlLCBOQU1FLCBDb25zdHJ1Y3RvciwgbmV4dCwgREVGQVVMVCwgSVNfU0VULCBGT1JDRUQpe1xuICAkaXRlckNyZWF0ZShDb25zdHJ1Y3RvciwgTkFNRSwgbmV4dCk7XG4gIHZhciBnZXRNZXRob2QgPSBmdW5jdGlvbihraW5kKXtcbiAgICBpZighQlVHR1kgJiYga2luZCBpbiBwcm90bylyZXR1cm4gcHJvdG9ba2luZF07XG4gICAgc3dpdGNoKGtpbmQpe1xuICAgICAgY2FzZSBLRVlTOiByZXR1cm4gZnVuY3Rpb24ga2V5cygpeyByZXR1cm4gbmV3IENvbnN0cnVjdG9yKHRoaXMsIGtpbmQpOyB9O1xuICAgICAgY2FzZSBWQUxVRVM6IHJldHVybiBmdW5jdGlvbiB2YWx1ZXMoKXsgcmV0dXJuIG5ldyBDb25zdHJ1Y3Rvcih0aGlzLCBraW5kKTsgfTtcbiAgICB9IHJldHVybiBmdW5jdGlvbiBlbnRyaWVzKCl7IHJldHVybiBuZXcgQ29uc3RydWN0b3IodGhpcywga2luZCk7IH07XG4gIH07XG4gIHZhciBUQUcgICAgICAgID0gTkFNRSArICcgSXRlcmF0b3InXG4gICAgLCBERUZfVkFMVUVTID0gREVGQVVMVCA9PSBWQUxVRVNcbiAgICAsIFZBTFVFU19CVUcgPSBmYWxzZVxuICAgICwgcHJvdG8gICAgICA9IEJhc2UucHJvdG90eXBlXG4gICAgLCAkbmF0aXZlICAgID0gcHJvdG9bSVRFUkFUT1JdIHx8IHByb3RvW0ZGX0lURVJBVE9SXSB8fCBERUZBVUxUICYmIHByb3RvW0RFRkFVTFRdXG4gICAgLCAkZGVmYXVsdCAgID0gJG5hdGl2ZSB8fCBnZXRNZXRob2QoREVGQVVMVClcbiAgICAsICRlbnRyaWVzICAgPSBERUZBVUxUID8gIURFRl9WQUxVRVMgPyAkZGVmYXVsdCA6IGdldE1ldGhvZCgnZW50cmllcycpIDogdW5kZWZpbmVkXG4gICAgLCAkYW55TmF0aXZlID0gTkFNRSA9PSAnQXJyYXknID8gcHJvdG8uZW50cmllcyB8fCAkbmF0aXZlIDogJG5hdGl2ZVxuICAgICwgbWV0aG9kcywga2V5LCBJdGVyYXRvclByb3RvdHlwZTtcbiAgLy8gRml4IG5hdGl2ZVxuICBpZigkYW55TmF0aXZlKXtcbiAgICBJdGVyYXRvclByb3RvdHlwZSA9IGdldFByb3RvdHlwZU9mKCRhbnlOYXRpdmUuY2FsbChuZXcgQmFzZSkpO1xuICAgIGlmKEl0ZXJhdG9yUHJvdG90eXBlICE9PSBPYmplY3QucHJvdG90eXBlKXtcbiAgICAgIC8vIFNldCBAQHRvU3RyaW5nVGFnIHRvIG5hdGl2ZSBpdGVyYXRvcnNcbiAgICAgIHNldFRvU3RyaW5nVGFnKEl0ZXJhdG9yUHJvdG90eXBlLCBUQUcsIHRydWUpO1xuICAgICAgLy8gZml4IGZvciBzb21lIG9sZCBlbmdpbmVzXG4gICAgICBpZighTElCUkFSWSAmJiAhaGFzKEl0ZXJhdG9yUHJvdG90eXBlLCBJVEVSQVRPUikpaGlkZShJdGVyYXRvclByb3RvdHlwZSwgSVRFUkFUT1IsIHJldHVyblRoaXMpO1xuICAgIH1cbiAgfVxuICAvLyBmaXggQXJyYXkje3ZhbHVlcywgQEBpdGVyYXRvcn0ubmFtZSBpbiBWOCAvIEZGXG4gIGlmKERFRl9WQUxVRVMgJiYgJG5hdGl2ZSAmJiAkbmF0aXZlLm5hbWUgIT09IFZBTFVFUyl7XG4gICAgVkFMVUVTX0JVRyA9IHRydWU7XG4gICAgJGRlZmF1bHQgPSBmdW5jdGlvbiB2YWx1ZXMoKXsgcmV0dXJuICRuYXRpdmUuY2FsbCh0aGlzKTsgfTtcbiAgfVxuICAvLyBEZWZpbmUgaXRlcmF0b3JcbiAgaWYoKCFMSUJSQVJZIHx8IEZPUkNFRCkgJiYgKEJVR0dZIHx8IFZBTFVFU19CVUcgfHwgIXByb3RvW0lURVJBVE9SXSkpe1xuICAgIGhpZGUocHJvdG8sIElURVJBVE9SLCAkZGVmYXVsdCk7XG4gIH1cbiAgLy8gUGx1ZyBmb3IgbGlicmFyeVxuICBJdGVyYXRvcnNbTkFNRV0gPSAkZGVmYXVsdDtcbiAgSXRlcmF0b3JzW1RBR10gID0gcmV0dXJuVGhpcztcbiAgaWYoREVGQVVMVCl7XG4gICAgbWV0aG9kcyA9IHtcbiAgICAgIHZhbHVlczogIERFRl9WQUxVRVMgPyAkZGVmYXVsdCA6IGdldE1ldGhvZChWQUxVRVMpLFxuICAgICAga2V5czogICAgSVNfU0VUICAgICA/ICRkZWZhdWx0IDogZ2V0TWV0aG9kKEtFWVMpLFxuICAgICAgZW50cmllczogJGVudHJpZXNcbiAgICB9O1xuICAgIGlmKEZPUkNFRClmb3Ioa2V5IGluIG1ldGhvZHMpe1xuICAgICAgaWYoIShrZXkgaW4gcHJvdG8pKXJlZGVmaW5lKHByb3RvLCBrZXksIG1ldGhvZHNba2V5XSk7XG4gICAgfSBlbHNlICRleHBvcnQoJGV4cG9ydC5QICsgJGV4cG9ydC5GICogKEJVR0dZIHx8IFZBTFVFU19CVUcpLCBOQU1FLCBtZXRob2RzKTtcbiAgfVxuICByZXR1cm4gbWV0aG9kcztcbn07IiwidmFyIElURVJBVE9SICAgICA9IHJlcXVpcmUoJy4vX3drcycpKCdpdGVyYXRvcicpXG4gICwgU0FGRV9DTE9TSU5HID0gZmFsc2U7XG5cbnRyeSB7XG4gIHZhciByaXRlciA9IFs3XVtJVEVSQVRPUl0oKTtcbiAgcml0ZXJbJ3JldHVybiddID0gZnVuY3Rpb24oKXsgU0FGRV9DTE9TSU5HID0gdHJ1ZTsgfTtcbiAgQXJyYXkuZnJvbShyaXRlciwgZnVuY3Rpb24oKXsgdGhyb3cgMjsgfSk7XG59IGNhdGNoKGUpeyAvKiBlbXB0eSAqLyB9XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZXhlYywgc2tpcENsb3Npbmcpe1xuICBpZighc2tpcENsb3NpbmcgJiYgIVNBRkVfQ0xPU0lORylyZXR1cm4gZmFsc2U7XG4gIHZhciBzYWZlID0gZmFsc2U7XG4gIHRyeSB7XG4gICAgdmFyIGFyciAgPSBbN11cbiAgICAgICwgaXRlciA9IGFycltJVEVSQVRPUl0oKTtcbiAgICBpdGVyLm5leHQgPSBmdW5jdGlvbigpeyByZXR1cm4ge2RvbmU6IHNhZmUgPSB0cnVlfTsgfTtcbiAgICBhcnJbSVRFUkFUT1JdID0gZnVuY3Rpb24oKXsgcmV0dXJuIGl0ZXI7IH07XG4gICAgZXhlYyhhcnIpO1xuICB9IGNhdGNoKGUpeyAvKiBlbXB0eSAqLyB9XG4gIHJldHVybiBzYWZlO1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGRvbmUsIHZhbHVlKXtcbiAgcmV0dXJuIHt2YWx1ZTogdmFsdWUsIGRvbmU6ICEhZG9uZX07XG59OyIsIm1vZHVsZS5leHBvcnRzID0ge307IiwidmFyIGdldEtleXMgICA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzJylcbiAgLCB0b0lPYmplY3QgPSByZXF1aXJlKCcuL190by1pb2JqZWN0Jyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG9iamVjdCwgZWwpe1xuICB2YXIgTyAgICAgID0gdG9JT2JqZWN0KG9iamVjdClcbiAgICAsIGtleXMgICA9IGdldEtleXMoTylcbiAgICAsIGxlbmd0aCA9IGtleXMubGVuZ3RoXG4gICAgLCBpbmRleCAgPSAwXG4gICAgLCBrZXk7XG4gIHdoaWxlKGxlbmd0aCA+IGluZGV4KWlmKE9ba2V5ID0ga2V5c1tpbmRleCsrXV0gPT09IGVsKXJldHVybiBrZXk7XG59OyIsIm1vZHVsZS5leHBvcnRzID0gdHJ1ZTsiLCJ2YXIgTUVUQSAgICAgPSByZXF1aXJlKCcuL191aWQnKSgnbWV0YScpXG4gICwgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKVxuICAsIGhhcyAgICAgID0gcmVxdWlyZSgnLi9faGFzJylcbiAgLCBzZXREZXNjICA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpLmZcbiAgLCBpZCAgICAgICA9IDA7XG52YXIgaXNFeHRlbnNpYmxlID0gT2JqZWN0LmlzRXh0ZW5zaWJsZSB8fCBmdW5jdGlvbigpe1xuICByZXR1cm4gdHJ1ZTtcbn07XG52YXIgRlJFRVpFID0gIXJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24oKXtcbiAgcmV0dXJuIGlzRXh0ZW5zaWJsZShPYmplY3QucHJldmVudEV4dGVuc2lvbnMoe30pKTtcbn0pO1xudmFyIHNldE1ldGEgPSBmdW5jdGlvbihpdCl7XG4gIHNldERlc2MoaXQsIE1FVEEsIHt2YWx1ZToge1xuICAgIGk6ICdPJyArICsraWQsIC8vIG9iamVjdCBJRFxuICAgIHc6IHt9ICAgICAgICAgIC8vIHdlYWsgY29sbGVjdGlvbnMgSURzXG4gIH19KTtcbn07XG52YXIgZmFzdEtleSA9IGZ1bmN0aW9uKGl0LCBjcmVhdGUpe1xuICAvLyByZXR1cm4gcHJpbWl0aXZlIHdpdGggcHJlZml4XG4gIGlmKCFpc09iamVjdChpdCkpcmV0dXJuIHR5cGVvZiBpdCA9PSAnc3ltYm9sJyA/IGl0IDogKHR5cGVvZiBpdCA9PSAnc3RyaW5nJyA/ICdTJyA6ICdQJykgKyBpdDtcbiAgaWYoIWhhcyhpdCwgTUVUQSkpe1xuICAgIC8vIGNhbid0IHNldCBtZXRhZGF0YSB0byB1bmNhdWdodCBmcm96ZW4gb2JqZWN0XG4gICAgaWYoIWlzRXh0ZW5zaWJsZShpdCkpcmV0dXJuICdGJztcbiAgICAvLyBub3QgbmVjZXNzYXJ5IHRvIGFkZCBtZXRhZGF0YVxuICAgIGlmKCFjcmVhdGUpcmV0dXJuICdFJztcbiAgICAvLyBhZGQgbWlzc2luZyBtZXRhZGF0YVxuICAgIHNldE1ldGEoaXQpO1xuICAvLyByZXR1cm4gb2JqZWN0IElEXG4gIH0gcmV0dXJuIGl0W01FVEFdLmk7XG59O1xudmFyIGdldFdlYWsgPSBmdW5jdGlvbihpdCwgY3JlYXRlKXtcbiAgaWYoIWhhcyhpdCwgTUVUQSkpe1xuICAgIC8vIGNhbid0IHNldCBtZXRhZGF0YSB0byB1bmNhdWdodCBmcm96ZW4gb2JqZWN0XG4gICAgaWYoIWlzRXh0ZW5zaWJsZShpdCkpcmV0dXJuIHRydWU7XG4gICAgLy8gbm90IG5lY2Vzc2FyeSB0byBhZGQgbWV0YWRhdGFcbiAgICBpZighY3JlYXRlKXJldHVybiBmYWxzZTtcbiAgICAvLyBhZGQgbWlzc2luZyBtZXRhZGF0YVxuICAgIHNldE1ldGEoaXQpO1xuICAvLyByZXR1cm4gaGFzaCB3ZWFrIGNvbGxlY3Rpb25zIElEc1xuICB9IHJldHVybiBpdFtNRVRBXS53O1xufTtcbi8vIGFkZCBtZXRhZGF0YSBvbiBmcmVlemUtZmFtaWx5IG1ldGhvZHMgY2FsbGluZ1xudmFyIG9uRnJlZXplID0gZnVuY3Rpb24oaXQpe1xuICBpZihGUkVFWkUgJiYgbWV0YS5ORUVEICYmIGlzRXh0ZW5zaWJsZShpdCkgJiYgIWhhcyhpdCwgTUVUQSkpc2V0TWV0YShpdCk7XG4gIHJldHVybiBpdDtcbn07XG52YXIgbWV0YSA9IG1vZHVsZS5leHBvcnRzID0ge1xuICBLRVk6ICAgICAgTUVUQSxcbiAgTkVFRDogICAgIGZhbHNlLFxuICBmYXN0S2V5OiAgZmFzdEtleSxcbiAgZ2V0V2VhazogIGdldFdlYWssXG4gIG9uRnJlZXplOiBvbkZyZWV6ZVxufTsiLCIndXNlIHN0cmljdCc7XG4vLyAxOS4xLjIuMSBPYmplY3QuYXNzaWduKHRhcmdldCwgc291cmNlLCAuLi4pXG52YXIgZ2V0S2V5cyAgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cycpXG4gICwgZ09QUyAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZ29wcycpXG4gICwgcElFICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtcGllJylcbiAgLCB0b09iamVjdCA9IHJlcXVpcmUoJy4vX3RvLW9iamVjdCcpXG4gICwgSU9iamVjdCAgPSByZXF1aXJlKCcuL19pb2JqZWN0JylcbiAgLCAkYXNzaWduICA9IE9iamVjdC5hc3NpZ247XG5cbi8vIHNob3VsZCB3b3JrIHdpdGggc3ltYm9scyBhbmQgc2hvdWxkIGhhdmUgZGV0ZXJtaW5pc3RpYyBwcm9wZXJ0eSBvcmRlciAoVjggYnVnKVxubW9kdWxlLmV4cG9ydHMgPSAhJGFzc2lnbiB8fCByZXF1aXJlKCcuL19mYWlscycpKGZ1bmN0aW9uKCl7XG4gIHZhciBBID0ge31cbiAgICAsIEIgPSB7fVxuICAgICwgUyA9IFN5bWJvbCgpXG4gICAgLCBLID0gJ2FiY2RlZmdoaWprbG1ub3BxcnN0JztcbiAgQVtTXSA9IDc7XG4gIEsuc3BsaXQoJycpLmZvckVhY2goZnVuY3Rpb24oayl7IEJba10gPSBrOyB9KTtcbiAgcmV0dXJuICRhc3NpZ24oe30sIEEpW1NdICE9IDcgfHwgT2JqZWN0LmtleXMoJGFzc2lnbih7fSwgQikpLmpvaW4oJycpICE9IEs7XG59KSA/IGZ1bmN0aW9uIGFzc2lnbih0YXJnZXQsIHNvdXJjZSl7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgdmFyIFQgICAgID0gdG9PYmplY3QodGFyZ2V0KVxuICAgICwgYUxlbiAgPSBhcmd1bWVudHMubGVuZ3RoXG4gICAgLCBpbmRleCA9IDFcbiAgICAsIGdldFN5bWJvbHMgPSBnT1BTLmZcbiAgICAsIGlzRW51bSAgICAgPSBwSUUuZjtcbiAgd2hpbGUoYUxlbiA+IGluZGV4KXtcbiAgICB2YXIgUyAgICAgID0gSU9iamVjdChhcmd1bWVudHNbaW5kZXgrK10pXG4gICAgICAsIGtleXMgICA9IGdldFN5bWJvbHMgPyBnZXRLZXlzKFMpLmNvbmNhdChnZXRTeW1ib2xzKFMpKSA6IGdldEtleXMoUylcbiAgICAgICwgbGVuZ3RoID0ga2V5cy5sZW5ndGhcbiAgICAgICwgaiAgICAgID0gMFxuICAgICAgLCBrZXk7XG4gICAgd2hpbGUobGVuZ3RoID4gailpZihpc0VudW0uY2FsbChTLCBrZXkgPSBrZXlzW2orK10pKVRba2V5XSA9IFNba2V5XTtcbiAgfSByZXR1cm4gVDtcbn0gOiAkYXNzaWduOyIsIi8vIDE5LjEuMi4yIC8gMTUuMi4zLjUgT2JqZWN0LmNyZWF0ZShPIFssIFByb3BlcnRpZXNdKVxudmFyIGFuT2JqZWN0ICAgID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0JylcbiAgLCBkUHMgICAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1kcHMnKVxuICAsIGVudW1CdWdLZXlzID0gcmVxdWlyZSgnLi9fZW51bS1idWcta2V5cycpXG4gICwgSUVfUFJPVE8gICAgPSByZXF1aXJlKCcuL19zaGFyZWQta2V5JykoJ0lFX1BST1RPJylcbiAgLCBFbXB0eSAgICAgICA9IGZ1bmN0aW9uKCl7IC8qIGVtcHR5ICovIH1cbiAgLCBQUk9UT1RZUEUgICA9ICdwcm90b3R5cGUnO1xuXG4vLyBDcmVhdGUgb2JqZWN0IHdpdGggZmFrZSBgbnVsbGAgcHJvdG90eXBlOiB1c2UgaWZyYW1lIE9iamVjdCB3aXRoIGNsZWFyZWQgcHJvdG90eXBlXG52YXIgY3JlYXRlRGljdCA9IGZ1bmN0aW9uKCl7XG4gIC8vIFRocmFzaCwgd2FzdGUgYW5kIHNvZG9teTogSUUgR0MgYnVnXG4gIHZhciBpZnJhbWUgPSByZXF1aXJlKCcuL19kb20tY3JlYXRlJykoJ2lmcmFtZScpXG4gICAgLCBpICAgICAgPSBlbnVtQnVnS2V5cy5sZW5ndGhcbiAgICAsIGx0ICAgICA9ICc8J1xuICAgICwgZ3QgICAgID0gJz4nXG4gICAgLCBpZnJhbWVEb2N1bWVudDtcbiAgaWZyYW1lLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gIHJlcXVpcmUoJy4vX2h0bWwnKS5hcHBlbmRDaGlsZChpZnJhbWUpO1xuICBpZnJhbWUuc3JjID0gJ2phdmFzY3JpcHQ6JzsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1zY3JpcHQtdXJsXG4gIC8vIGNyZWF0ZURpY3QgPSBpZnJhbWUuY29udGVudFdpbmRvdy5PYmplY3Q7XG4gIC8vIGh0bWwucmVtb3ZlQ2hpbGQoaWZyYW1lKTtcbiAgaWZyYW1lRG9jdW1lbnQgPSBpZnJhbWUuY29udGVudFdpbmRvdy5kb2N1bWVudDtcbiAgaWZyYW1lRG9jdW1lbnQub3BlbigpO1xuICBpZnJhbWVEb2N1bWVudC53cml0ZShsdCArICdzY3JpcHQnICsgZ3QgKyAnZG9jdW1lbnQuRj1PYmplY3QnICsgbHQgKyAnL3NjcmlwdCcgKyBndCk7XG4gIGlmcmFtZURvY3VtZW50LmNsb3NlKCk7XG4gIGNyZWF0ZURpY3QgPSBpZnJhbWVEb2N1bWVudC5GO1xuICB3aGlsZShpLS0pZGVsZXRlIGNyZWF0ZURpY3RbUFJPVE9UWVBFXVtlbnVtQnVnS2V5c1tpXV07XG4gIHJldHVybiBjcmVhdGVEaWN0KCk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5jcmVhdGUgfHwgZnVuY3Rpb24gY3JlYXRlKE8sIFByb3BlcnRpZXMpe1xuICB2YXIgcmVzdWx0O1xuICBpZihPICE9PSBudWxsKXtcbiAgICBFbXB0eVtQUk9UT1RZUEVdID0gYW5PYmplY3QoTyk7XG4gICAgcmVzdWx0ID0gbmV3IEVtcHR5O1xuICAgIEVtcHR5W1BST1RPVFlQRV0gPSBudWxsO1xuICAgIC8vIGFkZCBcIl9fcHJvdG9fX1wiIGZvciBPYmplY3QuZ2V0UHJvdG90eXBlT2YgcG9seWZpbGxcbiAgICByZXN1bHRbSUVfUFJPVE9dID0gTztcbiAgfSBlbHNlIHJlc3VsdCA9IGNyZWF0ZURpY3QoKTtcbiAgcmV0dXJuIFByb3BlcnRpZXMgPT09IHVuZGVmaW5lZCA/IHJlc3VsdCA6IGRQcyhyZXN1bHQsIFByb3BlcnRpZXMpO1xufTtcbiIsInZhciBhbk9iamVjdCAgICAgICA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpXG4gICwgSUU4X0RPTV9ERUZJTkUgPSByZXF1aXJlKCcuL19pZTgtZG9tLWRlZmluZScpXG4gICwgdG9QcmltaXRpdmUgICAgPSByZXF1aXJlKCcuL190by1wcmltaXRpdmUnKVxuICAsIGRQICAgICAgICAgICAgID0gT2JqZWN0LmRlZmluZVByb3BlcnR5O1xuXG5leHBvcnRzLmYgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpID8gT2JqZWN0LmRlZmluZVByb3BlcnR5IDogZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcyl7XG4gIGFuT2JqZWN0KE8pO1xuICBQID0gdG9QcmltaXRpdmUoUCwgdHJ1ZSk7XG4gIGFuT2JqZWN0KEF0dHJpYnV0ZXMpO1xuICBpZihJRThfRE9NX0RFRklORSl0cnkge1xuICAgIHJldHVybiBkUChPLCBQLCBBdHRyaWJ1dGVzKTtcbiAgfSBjYXRjaChlKXsgLyogZW1wdHkgKi8gfVxuICBpZignZ2V0JyBpbiBBdHRyaWJ1dGVzIHx8ICdzZXQnIGluIEF0dHJpYnV0ZXMpdGhyb3cgVHlwZUVycm9yKCdBY2Nlc3NvcnMgbm90IHN1cHBvcnRlZCEnKTtcbiAgaWYoJ3ZhbHVlJyBpbiBBdHRyaWJ1dGVzKU9bUF0gPSBBdHRyaWJ1dGVzLnZhbHVlO1xuICByZXR1cm4gTztcbn07IiwidmFyIGRQICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJylcbiAgLCBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpXG4gICwgZ2V0S2V5cyAgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgPyBPYmplY3QuZGVmaW5lUHJvcGVydGllcyA6IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXMoTywgUHJvcGVydGllcyl7XG4gIGFuT2JqZWN0KE8pO1xuICB2YXIga2V5cyAgID0gZ2V0S2V5cyhQcm9wZXJ0aWVzKVxuICAgICwgbGVuZ3RoID0ga2V5cy5sZW5ndGhcbiAgICAsIGkgPSAwXG4gICAgLCBQO1xuICB3aGlsZShsZW5ndGggPiBpKWRQLmYoTywgUCA9IGtleXNbaSsrXSwgUHJvcGVydGllc1tQXSk7XG4gIHJldHVybiBPO1xufTsiLCJ2YXIgcElFICAgICAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtcGllJylcbiAgLCBjcmVhdGVEZXNjICAgICA9IHJlcXVpcmUoJy4vX3Byb3BlcnR5LWRlc2MnKVxuICAsIHRvSU9iamVjdCAgICAgID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpXG4gICwgdG9QcmltaXRpdmUgICAgPSByZXF1aXJlKCcuL190by1wcmltaXRpdmUnKVxuICAsIGhhcyAgICAgICAgICAgID0gcmVxdWlyZSgnLi9faGFzJylcbiAgLCBJRThfRE9NX0RFRklORSA9IHJlcXVpcmUoJy4vX2llOC1kb20tZGVmaW5lJylcbiAgLCBnT1BEICAgICAgICAgICA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7XG5cbmV4cG9ydHMuZiA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgPyBnT1BEIDogZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKE8sIFApe1xuICBPID0gdG9JT2JqZWN0KE8pO1xuICBQID0gdG9QcmltaXRpdmUoUCwgdHJ1ZSk7XG4gIGlmKElFOF9ET01fREVGSU5FKXRyeSB7XG4gICAgcmV0dXJuIGdPUEQoTywgUCk7XG4gIH0gY2F0Y2goZSl7IC8qIGVtcHR5ICovIH1cbiAgaWYoaGFzKE8sIFApKXJldHVybiBjcmVhdGVEZXNjKCFwSUUuZi5jYWxsKE8sIFApLCBPW1BdKTtcbn07IiwiLy8gZmFsbGJhY2sgZm9yIElFMTEgYnVnZ3kgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMgd2l0aCBpZnJhbWUgYW5kIHdpbmRvd1xudmFyIHRvSU9iamVjdCA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKVxuICAsIGdPUE4gICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1nb3BuJykuZlxuICAsIHRvU3RyaW5nICA9IHt9LnRvU3RyaW5nO1xuXG52YXIgd2luZG93TmFtZXMgPSB0eXBlb2Ygd2luZG93ID09ICdvYmplY3QnICYmIHdpbmRvdyAmJiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lc1xuICA/IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHdpbmRvdykgOiBbXTtcblxudmFyIGdldFdpbmRvd05hbWVzID0gZnVuY3Rpb24oaXQpe1xuICB0cnkge1xuICAgIHJldHVybiBnT1BOKGl0KTtcbiAgfSBjYXRjaChlKXtcbiAgICByZXR1cm4gd2luZG93TmFtZXMuc2xpY2UoKTtcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMuZiA9IGZ1bmN0aW9uIGdldE93blByb3BlcnR5TmFtZXMoaXQpe1xuICByZXR1cm4gd2luZG93TmFtZXMgJiYgdG9TdHJpbmcuY2FsbChpdCkgPT0gJ1tvYmplY3QgV2luZG93XScgPyBnZXRXaW5kb3dOYW1lcyhpdCkgOiBnT1BOKHRvSU9iamVjdChpdCkpO1xufTtcbiIsIi8vIDE5LjEuMi43IC8gMTUuMi4zLjQgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoTylcbnZhciAka2V5cyAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMtaW50ZXJuYWwnKVxuICAsIGhpZGRlbktleXMgPSByZXF1aXJlKCcuL19lbnVtLWJ1Zy1rZXlzJykuY29uY2F0KCdsZW5ndGgnLCAncHJvdG90eXBlJyk7XG5cbmV4cG9ydHMuZiA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzIHx8IGZ1bmN0aW9uIGdldE93blByb3BlcnR5TmFtZXMoTyl7XG4gIHJldHVybiAka2V5cyhPLCBoaWRkZW5LZXlzKTtcbn07IiwiZXhwb3J0cy5mID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9sczsiLCIvLyAxOS4xLjIuOSAvIDE1LjIuMy4yIE9iamVjdC5nZXRQcm90b3R5cGVPZihPKVxudmFyIGhhcyAgICAgICAgID0gcmVxdWlyZSgnLi9faGFzJylcbiAgLCB0b09iamVjdCAgICA9IHJlcXVpcmUoJy4vX3RvLW9iamVjdCcpXG4gICwgSUVfUFJPVE8gICAgPSByZXF1aXJlKCcuL19zaGFyZWQta2V5JykoJ0lFX1BST1RPJylcbiAgLCBPYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmdldFByb3RvdHlwZU9mIHx8IGZ1bmN0aW9uKE8pe1xuICBPID0gdG9PYmplY3QoTyk7XG4gIGlmKGhhcyhPLCBJRV9QUk9UTykpcmV0dXJuIE9bSUVfUFJPVE9dO1xuICBpZih0eXBlb2YgTy5jb25zdHJ1Y3RvciA9PSAnZnVuY3Rpb24nICYmIE8gaW5zdGFuY2VvZiBPLmNvbnN0cnVjdG9yKXtcbiAgICByZXR1cm4gTy5jb25zdHJ1Y3Rvci5wcm90b3R5cGU7XG4gIH0gcmV0dXJuIE8gaW5zdGFuY2VvZiBPYmplY3QgPyBPYmplY3RQcm90byA6IG51bGw7XG59OyIsInZhciBoYXMgICAgICAgICAgPSByZXF1aXJlKCcuL19oYXMnKVxuICAsIHRvSU9iamVjdCAgICA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKVxuICAsIGFycmF5SW5kZXhPZiA9IHJlcXVpcmUoJy4vX2FycmF5LWluY2x1ZGVzJykoZmFsc2UpXG4gICwgSUVfUFJPVE8gICAgID0gcmVxdWlyZSgnLi9fc2hhcmVkLWtleScpKCdJRV9QUk9UTycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG9iamVjdCwgbmFtZXMpe1xuICB2YXIgTyAgICAgID0gdG9JT2JqZWN0KG9iamVjdClcbiAgICAsIGkgICAgICA9IDBcbiAgICAsIHJlc3VsdCA9IFtdXG4gICAgLCBrZXk7XG4gIGZvcihrZXkgaW4gTylpZihrZXkgIT0gSUVfUFJPVE8paGFzKE8sIGtleSkgJiYgcmVzdWx0LnB1c2goa2V5KTtcbiAgLy8gRG9uJ3QgZW51bSBidWcgJiBoaWRkZW4ga2V5c1xuICB3aGlsZShuYW1lcy5sZW5ndGggPiBpKWlmKGhhcyhPLCBrZXkgPSBuYW1lc1tpKytdKSl7XG4gICAgfmFycmF5SW5kZXhPZihyZXN1bHQsIGtleSkgfHwgcmVzdWx0LnB1c2goa2V5KTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufTsiLCIvLyAxOS4xLjIuMTQgLyAxNS4yLjMuMTQgT2JqZWN0LmtleXMoTylcbnZhciAka2V5cyAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzLWludGVybmFsJylcbiAgLCBlbnVtQnVnS2V5cyA9IHJlcXVpcmUoJy4vX2VudW0tYnVnLWtleXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3Qua2V5cyB8fCBmdW5jdGlvbiBrZXlzKE8pe1xuICByZXR1cm4gJGtleXMoTywgZW51bUJ1Z0tleXMpO1xufTsiLCJleHBvcnRzLmYgPSB7fS5wcm9wZXJ0eUlzRW51bWVyYWJsZTsiLCIvLyBtb3N0IE9iamVjdCBtZXRob2RzIGJ5IEVTNiBzaG91bGQgYWNjZXB0IHByaW1pdGl2ZXNcbnZhciAkZXhwb3J0ID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgLCBjb3JlICAgID0gcmVxdWlyZSgnLi9fY29yZScpXG4gICwgZmFpbHMgICA9IHJlcXVpcmUoJy4vX2ZhaWxzJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKEtFWSwgZXhlYyl7XG4gIHZhciBmbiAgPSAoY29yZS5PYmplY3QgfHwge30pW0tFWV0gfHwgT2JqZWN0W0tFWV1cbiAgICAsIGV4cCA9IHt9O1xuICBleHBbS0VZXSA9IGV4ZWMoZm4pO1xuICAkZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqIGZhaWxzKGZ1bmN0aW9uKCl7IGZuKDEpOyB9KSwgJ09iamVjdCcsIGV4cCk7XG59OyIsInZhciBnZXRLZXlzICAgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cycpXG4gICwgdG9JT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpXG4gICwgaXNFbnVtICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LXBpZScpLmY7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGlzRW50cmllcyl7XG4gIHJldHVybiBmdW5jdGlvbihpdCl7XG4gICAgdmFyIE8gICAgICA9IHRvSU9iamVjdChpdClcbiAgICAgICwga2V5cyAgID0gZ2V0S2V5cyhPKVxuICAgICAgLCBsZW5ndGggPSBrZXlzLmxlbmd0aFxuICAgICAgLCBpICAgICAgPSAwXG4gICAgICAsIHJlc3VsdCA9IFtdXG4gICAgICAsIGtleTtcbiAgICB3aGlsZShsZW5ndGggPiBpKWlmKGlzRW51bS5jYWxsKE8sIGtleSA9IGtleXNbaSsrXSkpe1xuICAgICAgcmVzdWx0LnB1c2goaXNFbnRyaWVzID8gW2tleSwgT1trZXldXSA6IE9ba2V5XSk7XG4gICAgfSByZXR1cm4gcmVzdWx0O1xuICB9O1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGJpdG1hcCwgdmFsdWUpe1xuICByZXR1cm4ge1xuICAgIGVudW1lcmFibGUgIDogIShiaXRtYXAgJiAxKSxcbiAgICBjb25maWd1cmFibGU6ICEoYml0bWFwICYgMiksXG4gICAgd3JpdGFibGUgICAgOiAhKGJpdG1hcCAmIDQpLFxuICAgIHZhbHVlICAgICAgIDogdmFsdWVcbiAgfTtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19oaWRlJyk7IiwiLy8gV29ya3Mgd2l0aCBfX3Byb3RvX18gb25seS4gT2xkIHY4IGNhbid0IHdvcmsgd2l0aCBudWxsIHByb3RvIG9iamVjdHMuXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1wcm90byAqL1xudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0JylcbiAgLCBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xudmFyIGNoZWNrID0gZnVuY3Rpb24oTywgcHJvdG8pe1xuICBhbk9iamVjdChPKTtcbiAgaWYoIWlzT2JqZWN0KHByb3RvKSAmJiBwcm90byAhPT0gbnVsbCl0aHJvdyBUeXBlRXJyb3IocHJvdG8gKyBcIjogY2FuJ3Qgc2V0IGFzIHByb3RvdHlwZSFcIik7XG59O1xubW9kdWxlLmV4cG9ydHMgPSB7XG4gIHNldDogT2JqZWN0LnNldFByb3RvdHlwZU9mIHx8ICgnX19wcm90b19fJyBpbiB7fSA/IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICBmdW5jdGlvbih0ZXN0LCBidWdneSwgc2V0KXtcbiAgICAgIHRyeSB7XG4gICAgICAgIHNldCA9IHJlcXVpcmUoJy4vX2N0eCcpKEZ1bmN0aW9uLmNhbGwsIHJlcXVpcmUoJy4vX29iamVjdC1nb3BkJykuZihPYmplY3QucHJvdG90eXBlLCAnX19wcm90b19fJykuc2V0LCAyKTtcbiAgICAgICAgc2V0KHRlc3QsIFtdKTtcbiAgICAgICAgYnVnZ3kgPSAhKHRlc3QgaW5zdGFuY2VvZiBBcnJheSk7XG4gICAgICB9IGNhdGNoKGUpeyBidWdneSA9IHRydWU7IH1cbiAgICAgIHJldHVybiBmdW5jdGlvbiBzZXRQcm90b3R5cGVPZihPLCBwcm90byl7XG4gICAgICAgIGNoZWNrKE8sIHByb3RvKTtcbiAgICAgICAgaWYoYnVnZ3kpTy5fX3Byb3RvX18gPSBwcm90bztcbiAgICAgICAgZWxzZSBzZXQoTywgcHJvdG8pO1xuICAgICAgICByZXR1cm4gTztcbiAgICAgIH07XG4gICAgfSh7fSwgZmFsc2UpIDogdW5kZWZpbmVkKSxcbiAgY2hlY2s6IGNoZWNrXG59OyIsInZhciBkZWYgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKS5mXG4gICwgaGFzID0gcmVxdWlyZSgnLi9faGFzJylcbiAgLCBUQUcgPSByZXF1aXJlKCcuL193a3MnKSgndG9TdHJpbmdUYWcnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCwgdGFnLCBzdGF0KXtcbiAgaWYoaXQgJiYgIWhhcyhpdCA9IHN0YXQgPyBpdCA6IGl0LnByb3RvdHlwZSwgVEFHKSlkZWYoaXQsIFRBRywge2NvbmZpZ3VyYWJsZTogdHJ1ZSwgdmFsdWU6IHRhZ30pO1xufTsiLCJ2YXIgc2hhcmVkID0gcmVxdWlyZSgnLi9fc2hhcmVkJykoJ2tleXMnKVxuICAsIHVpZCAgICA9IHJlcXVpcmUoJy4vX3VpZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihrZXkpe1xuICByZXR1cm4gc2hhcmVkW2tleV0gfHwgKHNoYXJlZFtrZXldID0gdWlkKGtleSkpO1xufTsiLCJ2YXIgZ2xvYmFsID0gcmVxdWlyZSgnLi9fZ2xvYmFsJylcbiAgLCBTSEFSRUQgPSAnX19jb3JlLWpzX3NoYXJlZF9fJ1xuICAsIHN0b3JlICA9IGdsb2JhbFtTSEFSRURdIHx8IChnbG9iYWxbU0hBUkVEXSA9IHt9KTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oa2V5KXtcbiAgcmV0dXJuIHN0b3JlW2tleV0gfHwgKHN0b3JlW2tleV0gPSB7fSk7XG59OyIsInZhciB0b0ludGVnZXIgPSByZXF1aXJlKCcuL190by1pbnRlZ2VyJylcbiAgLCBkZWZpbmVkICAgPSByZXF1aXJlKCcuL19kZWZpbmVkJyk7XG4vLyB0cnVlICAtPiBTdHJpbmcjYXRcbi8vIGZhbHNlIC0+IFN0cmluZyNjb2RlUG9pbnRBdFxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihUT19TVFJJTkcpe1xuICByZXR1cm4gZnVuY3Rpb24odGhhdCwgcG9zKXtcbiAgICB2YXIgcyA9IFN0cmluZyhkZWZpbmVkKHRoYXQpKVxuICAgICAgLCBpID0gdG9JbnRlZ2VyKHBvcylcbiAgICAgICwgbCA9IHMubGVuZ3RoXG4gICAgICAsIGEsIGI7XG4gICAgaWYoaSA8IDAgfHwgaSA+PSBsKXJldHVybiBUT19TVFJJTkcgPyAnJyA6IHVuZGVmaW5lZDtcbiAgICBhID0gcy5jaGFyQ29kZUF0KGkpO1xuICAgIHJldHVybiBhIDwgMHhkODAwIHx8IGEgPiAweGRiZmYgfHwgaSArIDEgPT09IGwgfHwgKGIgPSBzLmNoYXJDb2RlQXQoaSArIDEpKSA8IDB4ZGMwMCB8fCBiID4gMHhkZmZmXG4gICAgICA/IFRPX1NUUklORyA/IHMuY2hhckF0KGkpIDogYVxuICAgICAgOiBUT19TVFJJTkcgPyBzLnNsaWNlKGksIGkgKyAyKSA6IChhIC0gMHhkODAwIDw8IDEwKSArIChiIC0gMHhkYzAwKSArIDB4MTAwMDA7XG4gIH07XG59OyIsInZhciB0b0ludGVnZXIgPSByZXF1aXJlKCcuL190by1pbnRlZ2VyJylcbiAgLCBtYXggICAgICAgPSBNYXRoLm1heFxuICAsIG1pbiAgICAgICA9IE1hdGgubWluO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpbmRleCwgbGVuZ3RoKXtcbiAgaW5kZXggPSB0b0ludGVnZXIoaW5kZXgpO1xuICByZXR1cm4gaW5kZXggPCAwID8gbWF4KGluZGV4ICsgbGVuZ3RoLCAwKSA6IG1pbihpbmRleCwgbGVuZ3RoKTtcbn07IiwiLy8gNy4xLjQgVG9JbnRlZ2VyXG52YXIgY2VpbCAgPSBNYXRoLmNlaWxcbiAgLCBmbG9vciA9IE1hdGguZmxvb3I7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIGlzTmFOKGl0ID0gK2l0KSA/IDAgOiAoaXQgPiAwID8gZmxvb3IgOiBjZWlsKShpdCk7XG59OyIsIi8vIHRvIGluZGV4ZWQgb2JqZWN0LCB0b09iamVjdCB3aXRoIGZhbGxiYWNrIGZvciBub24tYXJyYXktbGlrZSBFUzMgc3RyaW5nc1xudmFyIElPYmplY3QgPSByZXF1aXJlKCcuL19pb2JqZWN0JylcbiAgLCBkZWZpbmVkID0gcmVxdWlyZSgnLi9fZGVmaW5lZCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBJT2JqZWN0KGRlZmluZWQoaXQpKTtcbn07IiwiLy8gNy4xLjE1IFRvTGVuZ3RoXG52YXIgdG9JbnRlZ2VyID0gcmVxdWlyZSgnLi9fdG8taW50ZWdlcicpXG4gICwgbWluICAgICAgID0gTWF0aC5taW47XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIGl0ID4gMCA/IG1pbih0b0ludGVnZXIoaXQpLCAweDFmZmZmZmZmZmZmZmZmKSA6IDA7IC8vIHBvdygyLCA1MykgLSAxID09IDkwMDcxOTkyNTQ3NDA5OTFcbn07IiwiLy8gNy4xLjEzIFRvT2JqZWN0KGFyZ3VtZW50KVxudmFyIGRlZmluZWQgPSByZXF1aXJlKCcuL19kZWZpbmVkJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIE9iamVjdChkZWZpbmVkKGl0KSk7XG59OyIsIi8vIDcuMS4xIFRvUHJpbWl0aXZlKGlucHV0IFssIFByZWZlcnJlZFR5cGVdKVxudmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG4vLyBpbnN0ZWFkIG9mIHRoZSBFUzYgc3BlYyB2ZXJzaW9uLCB3ZSBkaWRuJ3QgaW1wbGVtZW50IEBAdG9QcmltaXRpdmUgY2FzZVxuLy8gYW5kIHRoZSBzZWNvbmQgYXJndW1lbnQgLSBmbGFnIC0gcHJlZmVycmVkIHR5cGUgaXMgYSBzdHJpbmdcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQsIFMpe1xuICBpZighaXNPYmplY3QoaXQpKXJldHVybiBpdDtcbiAgdmFyIGZuLCB2YWw7XG4gIGlmKFMgJiYgdHlwZW9mIChmbiA9IGl0LnRvU3RyaW5nKSA9PSAnZnVuY3Rpb24nICYmICFpc09iamVjdCh2YWwgPSBmbi5jYWxsKGl0KSkpcmV0dXJuIHZhbDtcbiAgaWYodHlwZW9mIChmbiA9IGl0LnZhbHVlT2YpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaXQpKSlyZXR1cm4gdmFsO1xuICBpZighUyAmJiB0eXBlb2YgKGZuID0gaXQudG9TdHJpbmcpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaXQpKSlyZXR1cm4gdmFsO1xuICB0aHJvdyBUeXBlRXJyb3IoXCJDYW4ndCBjb252ZXJ0IG9iamVjdCB0byBwcmltaXRpdmUgdmFsdWVcIik7XG59OyIsInZhciBpZCA9IDBcbiAgLCBweCA9IE1hdGgucmFuZG9tKCk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGtleSl7XG4gIHJldHVybiAnU3ltYm9sKCcuY29uY2F0KGtleSA9PT0gdW5kZWZpbmVkID8gJycgOiBrZXksICcpXycsICgrK2lkICsgcHgpLnRvU3RyaW5nKDM2KSk7XG59OyIsInZhciBnbG9iYWwgICAgICAgICA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpXG4gICwgY29yZSAgICAgICAgICAgPSByZXF1aXJlKCcuL19jb3JlJylcbiAgLCBMSUJSQVJZICAgICAgICA9IHJlcXVpcmUoJy4vX2xpYnJhcnknKVxuICAsIHdrc0V4dCAgICAgICAgID0gcmVxdWlyZSgnLi9fd2tzLWV4dCcpXG4gICwgZGVmaW5lUHJvcGVydHkgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKS5mO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihuYW1lKXtcbiAgdmFyICRTeW1ib2wgPSBjb3JlLlN5bWJvbCB8fCAoY29yZS5TeW1ib2wgPSBMSUJSQVJZID8ge30gOiBnbG9iYWwuU3ltYm9sIHx8IHt9KTtcbiAgaWYobmFtZS5jaGFyQXQoMCkgIT0gJ18nICYmICEobmFtZSBpbiAkU3ltYm9sKSlkZWZpbmVQcm9wZXJ0eSgkU3ltYm9sLCBuYW1lLCB7dmFsdWU6IHdrc0V4dC5mKG5hbWUpfSk7XG59OyIsImV4cG9ydHMuZiA9IHJlcXVpcmUoJy4vX3drcycpOyIsInZhciBzdG9yZSAgICAgID0gcmVxdWlyZSgnLi9fc2hhcmVkJykoJ3drcycpXG4gICwgdWlkICAgICAgICA9IHJlcXVpcmUoJy4vX3VpZCcpXG4gICwgU3ltYm9sICAgICA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpLlN5bWJvbFxuICAsIFVTRV9TWU1CT0wgPSB0eXBlb2YgU3ltYm9sID09ICdmdW5jdGlvbic7XG5cbnZhciAkZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obmFtZSl7XG4gIHJldHVybiBzdG9yZVtuYW1lXSB8fCAoc3RvcmVbbmFtZV0gPVxuICAgIFVTRV9TWU1CT0wgJiYgU3ltYm9sW25hbWVdIHx8IChVU0VfU1lNQk9MID8gU3ltYm9sIDogdWlkKSgnU3ltYm9sLicgKyBuYW1lKSk7XG59O1xuXG4kZXhwb3J0cy5zdG9yZSA9IHN0b3JlOyIsInZhciBjbGFzc29mICAgPSByZXF1aXJlKCcuL19jbGFzc29mJylcbiAgLCBJVEVSQVRPUiAgPSByZXF1aXJlKCcuL193a3MnKSgnaXRlcmF0b3InKVxuICAsIEl0ZXJhdG9ycyA9IHJlcXVpcmUoJy4vX2l0ZXJhdG9ycycpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19jb3JlJykuZ2V0SXRlcmF0b3JNZXRob2QgPSBmdW5jdGlvbihpdCl7XG4gIGlmKGl0ICE9IHVuZGVmaW5lZClyZXR1cm4gaXRbSVRFUkFUT1JdXG4gICAgfHwgaXRbJ0BAaXRlcmF0b3InXVxuICAgIHx8IEl0ZXJhdG9yc1tjbGFzc29mKGl0KV07XG59OyIsInZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpXG4gICwgZ2V0ICAgICAgPSByZXF1aXJlKCcuL2NvcmUuZ2V0LWl0ZXJhdG9yLW1ldGhvZCcpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19jb3JlJykuZ2V0SXRlcmF0b3IgPSBmdW5jdGlvbihpdCl7XG4gIHZhciBpdGVyRm4gPSBnZXQoaXQpO1xuICBpZih0eXBlb2YgaXRlckZuICE9ICdmdW5jdGlvbicpdGhyb3cgVHlwZUVycm9yKGl0ICsgJyBpcyBub3QgaXRlcmFibGUhJyk7XG4gIHJldHVybiBhbk9iamVjdChpdGVyRm4uY2FsbChpdCkpO1xufTsiLCJ2YXIgY2xhc3NvZiAgID0gcmVxdWlyZSgnLi9fY2xhc3NvZicpXG4gICwgSVRFUkFUT1IgID0gcmVxdWlyZSgnLi9fd2tzJykoJ2l0ZXJhdG9yJylcbiAgLCBJdGVyYXRvcnMgPSByZXF1aXJlKCcuL19pdGVyYXRvcnMnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fY29yZScpLmlzSXRlcmFibGUgPSBmdW5jdGlvbihpdCl7XG4gIHZhciBPID0gT2JqZWN0KGl0KTtcbiAgcmV0dXJuIE9bSVRFUkFUT1JdICE9PSB1bmRlZmluZWRcbiAgICB8fCAnQEBpdGVyYXRvcicgaW4gT1xuICAgIHx8IEl0ZXJhdG9ycy5oYXNPd25Qcm9wZXJ0eShjbGFzc29mKE8pKTtcbn07IiwiJ3VzZSBzdHJpY3QnO1xudmFyIGN0eCAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fY3R4JylcbiAgLCAkZXhwb3J0ICAgICAgICA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4gICwgdG9PYmplY3QgICAgICAgPSByZXF1aXJlKCcuL190by1vYmplY3QnKVxuICAsIGNhbGwgICAgICAgICAgID0gcmVxdWlyZSgnLi9faXRlci1jYWxsJylcbiAgLCBpc0FycmF5SXRlciAgICA9IHJlcXVpcmUoJy4vX2lzLWFycmF5LWl0ZXInKVxuICAsIHRvTGVuZ3RoICAgICAgID0gcmVxdWlyZSgnLi9fdG8tbGVuZ3RoJylcbiAgLCBjcmVhdGVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4vX2NyZWF0ZS1wcm9wZXJ0eScpXG4gICwgZ2V0SXRlckZuICAgICAgPSByZXF1aXJlKCcuL2NvcmUuZ2V0LWl0ZXJhdG9yLW1ldGhvZCcpO1xuXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICFyZXF1aXJlKCcuL19pdGVyLWRldGVjdCcpKGZ1bmN0aW9uKGl0ZXIpeyBBcnJheS5mcm9tKGl0ZXIpOyB9KSwgJ0FycmF5Jywge1xuICAvLyAyMi4xLjIuMSBBcnJheS5mcm9tKGFycmF5TGlrZSwgbWFwZm4gPSB1bmRlZmluZWQsIHRoaXNBcmcgPSB1bmRlZmluZWQpXG4gIGZyb206IGZ1bmN0aW9uIGZyb20oYXJyYXlMaWtlLyosIG1hcGZuID0gdW5kZWZpbmVkLCB0aGlzQXJnID0gdW5kZWZpbmVkKi8pe1xuICAgIHZhciBPICAgICAgID0gdG9PYmplY3QoYXJyYXlMaWtlKVxuICAgICAgLCBDICAgICAgID0gdHlwZW9mIHRoaXMgPT0gJ2Z1bmN0aW9uJyA/IHRoaXMgOiBBcnJheVxuICAgICAgLCBhTGVuICAgID0gYXJndW1lbnRzLmxlbmd0aFxuICAgICAgLCBtYXBmbiAgID0gYUxlbiA+IDEgPyBhcmd1bWVudHNbMV0gOiB1bmRlZmluZWRcbiAgICAgICwgbWFwcGluZyA9IG1hcGZuICE9PSB1bmRlZmluZWRcbiAgICAgICwgaW5kZXggICA9IDBcbiAgICAgICwgaXRlckZuICA9IGdldEl0ZXJGbihPKVxuICAgICAgLCBsZW5ndGgsIHJlc3VsdCwgc3RlcCwgaXRlcmF0b3I7XG4gICAgaWYobWFwcGluZyltYXBmbiA9IGN0eChtYXBmbiwgYUxlbiA+IDIgPyBhcmd1bWVudHNbMl0gOiB1bmRlZmluZWQsIDIpO1xuICAgIC8vIGlmIG9iamVjdCBpc24ndCBpdGVyYWJsZSBvciBpdCdzIGFycmF5IHdpdGggZGVmYXVsdCBpdGVyYXRvciAtIHVzZSBzaW1wbGUgY2FzZVxuICAgIGlmKGl0ZXJGbiAhPSB1bmRlZmluZWQgJiYgIShDID09IEFycmF5ICYmIGlzQXJyYXlJdGVyKGl0ZXJGbikpKXtcbiAgICAgIGZvcihpdGVyYXRvciA9IGl0ZXJGbi5jYWxsKE8pLCByZXN1bHQgPSBuZXcgQzsgIShzdGVwID0gaXRlcmF0b3IubmV4dCgpKS5kb25lOyBpbmRleCsrKXtcbiAgICAgICAgY3JlYXRlUHJvcGVydHkocmVzdWx0LCBpbmRleCwgbWFwcGluZyA/IGNhbGwoaXRlcmF0b3IsIG1hcGZuLCBbc3RlcC52YWx1ZSwgaW5kZXhdLCB0cnVlKSA6IHN0ZXAudmFsdWUpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBsZW5ndGggPSB0b0xlbmd0aChPLmxlbmd0aCk7XG4gICAgICBmb3IocmVzdWx0ID0gbmV3IEMobGVuZ3RoKTsgbGVuZ3RoID4gaW5kZXg7IGluZGV4Kyspe1xuICAgICAgICBjcmVhdGVQcm9wZXJ0eShyZXN1bHQsIGluZGV4LCBtYXBwaW5nID8gbWFwZm4oT1tpbmRleF0sIGluZGV4KSA6IE9baW5kZXhdKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmVzdWx0Lmxlbmd0aCA9IGluZGV4O1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGFkZFRvVW5zY29wYWJsZXMgPSByZXF1aXJlKCcuL19hZGQtdG8tdW5zY29wYWJsZXMnKVxuICAsIHN0ZXAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19pdGVyLXN0ZXAnKVxuICAsIEl0ZXJhdG9ycyAgICAgICAgPSByZXF1aXJlKCcuL19pdGVyYXRvcnMnKVxuICAsIHRvSU9iamVjdCAgICAgICAgPSByZXF1aXJlKCcuL190by1pb2JqZWN0Jyk7XG5cbi8vIDIyLjEuMy40IEFycmF5LnByb3RvdHlwZS5lbnRyaWVzKClcbi8vIDIyLjEuMy4xMyBBcnJheS5wcm90b3R5cGUua2V5cygpXG4vLyAyMi4xLjMuMjkgQXJyYXkucHJvdG90eXBlLnZhbHVlcygpXG4vLyAyMi4xLjMuMzAgQXJyYXkucHJvdG90eXBlW0BAaXRlcmF0b3JdKClcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9faXRlci1kZWZpbmUnKShBcnJheSwgJ0FycmF5JywgZnVuY3Rpb24oaXRlcmF0ZWQsIGtpbmQpe1xuICB0aGlzLl90ID0gdG9JT2JqZWN0KGl0ZXJhdGVkKTsgLy8gdGFyZ2V0XG4gIHRoaXMuX2kgPSAwOyAgICAgICAgICAgICAgICAgICAvLyBuZXh0IGluZGV4XG4gIHRoaXMuX2sgPSBraW5kOyAgICAgICAgICAgICAgICAvLyBraW5kXG4vLyAyMi4xLjUuMi4xICVBcnJheUl0ZXJhdG9yUHJvdG90eXBlJS5uZXh0KClcbn0sIGZ1bmN0aW9uKCl7XG4gIHZhciBPICAgICA9IHRoaXMuX3RcbiAgICAsIGtpbmQgID0gdGhpcy5fa1xuICAgICwgaW5kZXggPSB0aGlzLl9pKys7XG4gIGlmKCFPIHx8IGluZGV4ID49IE8ubGVuZ3RoKXtcbiAgICB0aGlzLl90ID0gdW5kZWZpbmVkO1xuICAgIHJldHVybiBzdGVwKDEpO1xuICB9XG4gIGlmKGtpbmQgPT0gJ2tleXMnICApcmV0dXJuIHN0ZXAoMCwgaW5kZXgpO1xuICBpZihraW5kID09ICd2YWx1ZXMnKXJldHVybiBzdGVwKDAsIE9baW5kZXhdKTtcbiAgcmV0dXJuIHN0ZXAoMCwgW2luZGV4LCBPW2luZGV4XV0pO1xufSwgJ3ZhbHVlcycpO1xuXG4vLyBhcmd1bWVudHNMaXN0W0BAaXRlcmF0b3JdIGlzICVBcnJheVByb3RvX3ZhbHVlcyUgKDkuNC40LjYsIDkuNC40LjcpXG5JdGVyYXRvcnMuQXJndW1lbnRzID0gSXRlcmF0b3JzLkFycmF5O1xuXG5hZGRUb1Vuc2NvcGFibGVzKCdrZXlzJyk7XG5hZGRUb1Vuc2NvcGFibGVzKCd2YWx1ZXMnKTtcbmFkZFRvVW5zY29wYWJsZXMoJ2VudHJpZXMnKTsiLCIvLyAxOS4xLjMuMSBPYmplY3QuYXNzaWduKHRhcmdldCwgc291cmNlKVxudmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYsICdPYmplY3QnLCB7YXNzaWduOiByZXF1aXJlKCcuL19vYmplY3QtYXNzaWduJyl9KTsiLCJ2YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4vLyAxOS4xLjIuMiAvIDE1LjIuMy41IE9iamVjdC5jcmVhdGUoTyBbLCBQcm9wZXJ0aWVzXSlcbiRleHBvcnQoJGV4cG9ydC5TLCAnT2JqZWN0Jywge2NyZWF0ZTogcmVxdWlyZSgnLi9fb2JqZWN0LWNyZWF0ZScpfSk7IiwidmFyICRleHBvcnQgPSByZXF1aXJlKCcuL19leHBvcnQnKTtcbi8vIDE5LjEuMi40IC8gMTUuMi4zLjYgT2JqZWN0LmRlZmluZVByb3BlcnR5KE8sIFAsIEF0dHJpYnV0ZXMpXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICFyZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpLCAnT2JqZWN0Jywge2RlZmluZVByb3BlcnR5OiByZXF1aXJlKCcuL19vYmplY3QtZHAnKS5mfSk7IiwiLy8gMTkuMS4yLjkgT2JqZWN0LmdldFByb3RvdHlwZU9mKE8pXG52YXIgdG9PYmplY3QgICAgICAgID0gcmVxdWlyZSgnLi9fdG8tb2JqZWN0JylcbiAgLCAkZ2V0UHJvdG90eXBlT2YgPSByZXF1aXJlKCcuL19vYmplY3QtZ3BvJyk7XG5cbnJlcXVpcmUoJy4vX29iamVjdC1zYXAnKSgnZ2V0UHJvdG90eXBlT2YnLCBmdW5jdGlvbigpe1xuICByZXR1cm4gZnVuY3Rpb24gZ2V0UHJvdG90eXBlT2YoaXQpe1xuICAgIHJldHVybiAkZ2V0UHJvdG90eXBlT2YodG9PYmplY3QoaXQpKTtcbiAgfTtcbn0pOyIsIi8vIDE5LjEuMi4xNCBPYmplY3Qua2V5cyhPKVxudmFyIHRvT2JqZWN0ID0gcmVxdWlyZSgnLi9fdG8tb2JqZWN0JylcbiAgLCAka2V5cyAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzJyk7XG5cbnJlcXVpcmUoJy4vX29iamVjdC1zYXAnKSgna2V5cycsIGZ1bmN0aW9uKCl7XG4gIHJldHVybiBmdW5jdGlvbiBrZXlzKGl0KXtcbiAgICByZXR1cm4gJGtleXModG9PYmplY3QoaXQpKTtcbiAgfTtcbn0pOyIsIi8vIDE5LjEuMy4xOSBPYmplY3Quc2V0UHJvdG90eXBlT2YoTywgcHJvdG8pXG52YXIgJGV4cG9ydCA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpO1xuJGV4cG9ydCgkZXhwb3J0LlMsICdPYmplY3QnLCB7c2V0UHJvdG90eXBlT2Y6IHJlcXVpcmUoJy4vX3NldC1wcm90bycpLnNldH0pOyIsIiIsIid1c2Ugc3RyaWN0JztcbnZhciAkYXQgID0gcmVxdWlyZSgnLi9fc3RyaW5nLWF0JykodHJ1ZSk7XG5cbi8vIDIxLjEuMy4yNyBTdHJpbmcucHJvdG90eXBlW0BAaXRlcmF0b3JdKClcbnJlcXVpcmUoJy4vX2l0ZXItZGVmaW5lJykoU3RyaW5nLCAnU3RyaW5nJywgZnVuY3Rpb24oaXRlcmF0ZWQpe1xuICB0aGlzLl90ID0gU3RyaW5nKGl0ZXJhdGVkKTsgLy8gdGFyZ2V0XG4gIHRoaXMuX2kgPSAwOyAgICAgICAgICAgICAgICAvLyBuZXh0IGluZGV4XG4vLyAyMS4xLjUuMi4xICVTdHJpbmdJdGVyYXRvclByb3RvdHlwZSUubmV4dCgpXG59LCBmdW5jdGlvbigpe1xuICB2YXIgTyAgICAgPSB0aGlzLl90XG4gICAgLCBpbmRleCA9IHRoaXMuX2lcbiAgICAsIHBvaW50O1xuICBpZihpbmRleCA+PSBPLmxlbmd0aClyZXR1cm4ge3ZhbHVlOiB1bmRlZmluZWQsIGRvbmU6IHRydWV9O1xuICBwb2ludCA9ICRhdChPLCBpbmRleCk7XG4gIHRoaXMuX2kgKz0gcG9pbnQubGVuZ3RoO1xuICByZXR1cm4ge3ZhbHVlOiBwb2ludCwgZG9uZTogZmFsc2V9O1xufSk7IiwiJ3VzZSBzdHJpY3QnO1xuLy8gRUNNQVNjcmlwdCA2IHN5bWJvbHMgc2hpbVxudmFyIGdsb2JhbCAgICAgICAgID0gcmVxdWlyZSgnLi9fZ2xvYmFsJylcbiAgLCBoYXMgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2hhcycpXG4gICwgREVTQ1JJUFRPUlMgICAgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpXG4gICwgJGV4cG9ydCAgICAgICAgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsIHJlZGVmaW5lICAgICAgID0gcmVxdWlyZSgnLi9fcmVkZWZpbmUnKVxuICAsIE1FVEEgICAgICAgICAgID0gcmVxdWlyZSgnLi9fbWV0YScpLktFWVxuICAsICRmYWlscyAgICAgICAgID0gcmVxdWlyZSgnLi9fZmFpbHMnKVxuICAsIHNoYXJlZCAgICAgICAgID0gcmVxdWlyZSgnLi9fc2hhcmVkJylcbiAgLCBzZXRUb1N0cmluZ1RhZyA9IHJlcXVpcmUoJy4vX3NldC10by1zdHJpbmctdGFnJylcbiAgLCB1aWQgICAgICAgICAgICA9IHJlcXVpcmUoJy4vX3VpZCcpXG4gICwgd2tzICAgICAgICAgICAgPSByZXF1aXJlKCcuL193a3MnKVxuICAsIHdrc0V4dCAgICAgICAgID0gcmVxdWlyZSgnLi9fd2tzLWV4dCcpXG4gICwgd2tzRGVmaW5lICAgICAgPSByZXF1aXJlKCcuL193a3MtZGVmaW5lJylcbiAgLCBrZXlPZiAgICAgICAgICA9IHJlcXVpcmUoJy4vX2tleW9mJylcbiAgLCBlbnVtS2V5cyAgICAgICA9IHJlcXVpcmUoJy4vX2VudW0ta2V5cycpXG4gICwgaXNBcnJheSAgICAgICAgPSByZXF1aXJlKCcuL19pcy1hcnJheScpXG4gICwgYW5PYmplY3QgICAgICAgPSByZXF1aXJlKCcuL19hbi1vYmplY3QnKVxuICAsIHRvSU9iamVjdCAgICAgID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpXG4gICwgdG9QcmltaXRpdmUgICAgPSByZXF1aXJlKCcuL190by1wcmltaXRpdmUnKVxuICAsIGNyZWF0ZURlc2MgICAgID0gcmVxdWlyZSgnLi9fcHJvcGVydHktZGVzYycpXG4gICwgX2NyZWF0ZSAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtY3JlYXRlJylcbiAgLCBnT1BORXh0ICAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1nb3BuLWV4dCcpXG4gICwgJEdPUEQgICAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZ29wZCcpXG4gICwgJERQICAgICAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZHAnKVxuICAsICRrZXlzICAgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMnKVxuICAsIGdPUEQgICAgICAgICAgID0gJEdPUEQuZlxuICAsIGRQICAgICAgICAgICAgID0gJERQLmZcbiAgLCBnT1BOICAgICAgICAgICA9IGdPUE5FeHQuZlxuICAsICRTeW1ib2wgICAgICAgID0gZ2xvYmFsLlN5bWJvbFxuICAsICRKU09OICAgICAgICAgID0gZ2xvYmFsLkpTT05cbiAgLCBfc3RyaW5naWZ5ICAgICA9ICRKU09OICYmICRKU09OLnN0cmluZ2lmeVxuICAsIFBST1RPVFlQRSAgICAgID0gJ3Byb3RvdHlwZSdcbiAgLCBISURERU4gICAgICAgICA9IHdrcygnX2hpZGRlbicpXG4gICwgVE9fUFJJTUlUSVZFICAgPSB3a3MoJ3RvUHJpbWl0aXZlJylcbiAgLCBpc0VudW0gICAgICAgICA9IHt9LnByb3BlcnR5SXNFbnVtZXJhYmxlXG4gICwgU3ltYm9sUmVnaXN0cnkgPSBzaGFyZWQoJ3N5bWJvbC1yZWdpc3RyeScpXG4gICwgQWxsU3ltYm9scyAgICAgPSBzaGFyZWQoJ3N5bWJvbHMnKVxuICAsIE9QU3ltYm9scyAgICAgID0gc2hhcmVkKCdvcC1zeW1ib2xzJylcbiAgLCBPYmplY3RQcm90byAgICA9IE9iamVjdFtQUk9UT1RZUEVdXG4gICwgVVNFX05BVElWRSAgICAgPSB0eXBlb2YgJFN5bWJvbCA9PSAnZnVuY3Rpb24nXG4gICwgUU9iamVjdCAgICAgICAgPSBnbG9iYWwuUU9iamVjdDtcbi8vIERvbid0IHVzZSBzZXR0ZXJzIGluIFF0IFNjcmlwdCwgaHR0cHM6Ly9naXRodWIuY29tL3psb2lyb2NrL2NvcmUtanMvaXNzdWVzLzE3M1xudmFyIHNldHRlciA9ICFRT2JqZWN0IHx8ICFRT2JqZWN0W1BST1RPVFlQRV0gfHwgIVFPYmplY3RbUFJPVE9UWVBFXS5maW5kQ2hpbGQ7XG5cbi8vIGZhbGxiYWNrIGZvciBvbGQgQW5kcm9pZCwgaHR0cHM6Ly9jb2RlLmdvb2dsZS5jb20vcC92OC9pc3N1ZXMvZGV0YWlsP2lkPTY4N1xudmFyIHNldFN5bWJvbERlc2MgPSBERVNDUklQVE9SUyAmJiAkZmFpbHMoZnVuY3Rpb24oKXtcbiAgcmV0dXJuIF9jcmVhdGUoZFAoe30sICdhJywge1xuICAgIGdldDogZnVuY3Rpb24oKXsgcmV0dXJuIGRQKHRoaXMsICdhJywge3ZhbHVlOiA3fSkuYTsgfVxuICB9KSkuYSAhPSA3O1xufSkgPyBmdW5jdGlvbihpdCwga2V5LCBEKXtcbiAgdmFyIHByb3RvRGVzYyA9IGdPUEQoT2JqZWN0UHJvdG8sIGtleSk7XG4gIGlmKHByb3RvRGVzYylkZWxldGUgT2JqZWN0UHJvdG9ba2V5XTtcbiAgZFAoaXQsIGtleSwgRCk7XG4gIGlmKHByb3RvRGVzYyAmJiBpdCAhPT0gT2JqZWN0UHJvdG8pZFAoT2JqZWN0UHJvdG8sIGtleSwgcHJvdG9EZXNjKTtcbn0gOiBkUDtcblxudmFyIHdyYXAgPSBmdW5jdGlvbih0YWcpe1xuICB2YXIgc3ltID0gQWxsU3ltYm9sc1t0YWddID0gX2NyZWF0ZSgkU3ltYm9sW1BST1RPVFlQRV0pO1xuICBzeW0uX2sgPSB0YWc7XG4gIHJldHVybiBzeW07XG59O1xuXG52YXIgaXNTeW1ib2wgPSBVU0VfTkFUSVZFICYmIHR5cGVvZiAkU3ltYm9sLml0ZXJhdG9yID09ICdzeW1ib2wnID8gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gdHlwZW9mIGl0ID09ICdzeW1ib2wnO1xufSA6IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIGl0IGluc3RhbmNlb2YgJFN5bWJvbDtcbn07XG5cbnZhciAkZGVmaW5lUHJvcGVydHkgPSBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0eShpdCwga2V5LCBEKXtcbiAgaWYoaXQgPT09IE9iamVjdFByb3RvKSRkZWZpbmVQcm9wZXJ0eShPUFN5bWJvbHMsIGtleSwgRCk7XG4gIGFuT2JqZWN0KGl0KTtcbiAga2V5ID0gdG9QcmltaXRpdmUoa2V5LCB0cnVlKTtcbiAgYW5PYmplY3QoRCk7XG4gIGlmKGhhcyhBbGxTeW1ib2xzLCBrZXkpKXtcbiAgICBpZighRC5lbnVtZXJhYmxlKXtcbiAgICAgIGlmKCFoYXMoaXQsIEhJRERFTikpZFAoaXQsIEhJRERFTiwgY3JlYXRlRGVzYygxLCB7fSkpO1xuICAgICAgaXRbSElEREVOXVtrZXldID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYoaGFzKGl0LCBISURERU4pICYmIGl0W0hJRERFTl1ba2V5XSlpdFtISURERU5dW2tleV0gPSBmYWxzZTtcbiAgICAgIEQgPSBfY3JlYXRlKEQsIHtlbnVtZXJhYmxlOiBjcmVhdGVEZXNjKDAsIGZhbHNlKX0pO1xuICAgIH0gcmV0dXJuIHNldFN5bWJvbERlc2MoaXQsIGtleSwgRCk7XG4gIH0gcmV0dXJuIGRQKGl0LCBrZXksIEQpO1xufTtcbnZhciAkZGVmaW5lUHJvcGVydGllcyA9IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXMoaXQsIFApe1xuICBhbk9iamVjdChpdCk7XG4gIHZhciBrZXlzID0gZW51bUtleXMoUCA9IHRvSU9iamVjdChQKSlcbiAgICAsIGkgICAgPSAwXG4gICAgLCBsID0ga2V5cy5sZW5ndGhcbiAgICAsIGtleTtcbiAgd2hpbGUobCA+IGkpJGRlZmluZVByb3BlcnR5KGl0LCBrZXkgPSBrZXlzW2krK10sIFBba2V5XSk7XG4gIHJldHVybiBpdDtcbn07XG52YXIgJGNyZWF0ZSA9IGZ1bmN0aW9uIGNyZWF0ZShpdCwgUCl7XG4gIHJldHVybiBQID09PSB1bmRlZmluZWQgPyBfY3JlYXRlKGl0KSA6ICRkZWZpbmVQcm9wZXJ0aWVzKF9jcmVhdGUoaXQpLCBQKTtcbn07XG52YXIgJHByb3BlcnR5SXNFbnVtZXJhYmxlID0gZnVuY3Rpb24gcHJvcGVydHlJc0VudW1lcmFibGUoa2V5KXtcbiAgdmFyIEUgPSBpc0VudW0uY2FsbCh0aGlzLCBrZXkgPSB0b1ByaW1pdGl2ZShrZXksIHRydWUpKTtcbiAgaWYodGhpcyA9PT0gT2JqZWN0UHJvdG8gJiYgaGFzKEFsbFN5bWJvbHMsIGtleSkgJiYgIWhhcyhPUFN5bWJvbHMsIGtleSkpcmV0dXJuIGZhbHNlO1xuICByZXR1cm4gRSB8fCAhaGFzKHRoaXMsIGtleSkgfHwgIWhhcyhBbGxTeW1ib2xzLCBrZXkpIHx8IGhhcyh0aGlzLCBISURERU4pICYmIHRoaXNbSElEREVOXVtrZXldID8gRSA6IHRydWU7XG59O1xudmFyICRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgPSBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoaXQsIGtleSl7XG4gIGl0ICA9IHRvSU9iamVjdChpdCk7XG4gIGtleSA9IHRvUHJpbWl0aXZlKGtleSwgdHJ1ZSk7XG4gIGlmKGl0ID09PSBPYmplY3RQcm90byAmJiBoYXMoQWxsU3ltYm9scywga2V5KSAmJiAhaGFzKE9QU3ltYm9scywga2V5KSlyZXR1cm47XG4gIHZhciBEID0gZ09QRChpdCwga2V5KTtcbiAgaWYoRCAmJiBoYXMoQWxsU3ltYm9scywga2V5KSAmJiAhKGhhcyhpdCwgSElEREVOKSAmJiBpdFtISURERU5dW2tleV0pKUQuZW51bWVyYWJsZSA9IHRydWU7XG4gIHJldHVybiBEO1xufTtcbnZhciAkZ2V0T3duUHJvcGVydHlOYW1lcyA9IGZ1bmN0aW9uIGdldE93blByb3BlcnR5TmFtZXMoaXQpe1xuICB2YXIgbmFtZXMgID0gZ09QTih0b0lPYmplY3QoaXQpKVxuICAgICwgcmVzdWx0ID0gW11cbiAgICAsIGkgICAgICA9IDBcbiAgICAsIGtleTtcbiAgd2hpbGUobmFtZXMubGVuZ3RoID4gaSl7XG4gICAgaWYoIWhhcyhBbGxTeW1ib2xzLCBrZXkgPSBuYW1lc1tpKytdKSAmJiBrZXkgIT0gSElEREVOICYmIGtleSAhPSBNRVRBKXJlc3VsdC5wdXNoKGtleSk7XG4gIH0gcmV0dXJuIHJlc3VsdDtcbn07XG52YXIgJGdldE93blByb3BlcnR5U3ltYm9scyA9IGZ1bmN0aW9uIGdldE93blByb3BlcnR5U3ltYm9scyhpdCl7XG4gIHZhciBJU19PUCAgPSBpdCA9PT0gT2JqZWN0UHJvdG9cbiAgICAsIG5hbWVzICA9IGdPUE4oSVNfT1AgPyBPUFN5bWJvbHMgOiB0b0lPYmplY3QoaXQpKVxuICAgICwgcmVzdWx0ID0gW11cbiAgICAsIGkgICAgICA9IDBcbiAgICAsIGtleTtcbiAgd2hpbGUobmFtZXMubGVuZ3RoID4gaSl7XG4gICAgaWYoaGFzKEFsbFN5bWJvbHMsIGtleSA9IG5hbWVzW2krK10pICYmIChJU19PUCA/IGhhcyhPYmplY3RQcm90bywga2V5KSA6IHRydWUpKXJlc3VsdC5wdXNoKEFsbFN5bWJvbHNba2V5XSk7XG4gIH0gcmV0dXJuIHJlc3VsdDtcbn07XG5cbi8vIDE5LjQuMS4xIFN5bWJvbChbZGVzY3JpcHRpb25dKVxuaWYoIVVTRV9OQVRJVkUpe1xuICAkU3ltYm9sID0gZnVuY3Rpb24gU3ltYm9sKCl7XG4gICAgaWYodGhpcyBpbnN0YW5jZW9mICRTeW1ib2wpdGhyb3cgVHlwZUVycm9yKCdTeW1ib2wgaXMgbm90IGEgY29uc3RydWN0b3IhJyk7XG4gICAgdmFyIHRhZyA9IHVpZChhcmd1bWVudHMubGVuZ3RoID4gMCA/IGFyZ3VtZW50c1swXSA6IHVuZGVmaW5lZCk7XG4gICAgdmFyICRzZXQgPSBmdW5jdGlvbih2YWx1ZSl7XG4gICAgICBpZih0aGlzID09PSBPYmplY3RQcm90bykkc2V0LmNhbGwoT1BTeW1ib2xzLCB2YWx1ZSk7XG4gICAgICBpZihoYXModGhpcywgSElEREVOKSAmJiBoYXModGhpc1tISURERU5dLCB0YWcpKXRoaXNbSElEREVOXVt0YWddID0gZmFsc2U7XG4gICAgICBzZXRTeW1ib2xEZXNjKHRoaXMsIHRhZywgY3JlYXRlRGVzYygxLCB2YWx1ZSkpO1xuICAgIH07XG4gICAgaWYoREVTQ1JJUFRPUlMgJiYgc2V0dGVyKXNldFN5bWJvbERlc2MoT2JqZWN0UHJvdG8sIHRhZywge2NvbmZpZ3VyYWJsZTogdHJ1ZSwgc2V0OiAkc2V0fSk7XG4gICAgcmV0dXJuIHdyYXAodGFnKTtcbiAgfTtcbiAgcmVkZWZpbmUoJFN5bWJvbFtQUk9UT1RZUEVdLCAndG9TdHJpbmcnLCBmdW5jdGlvbiB0b1N0cmluZygpe1xuICAgIHJldHVybiB0aGlzLl9rO1xuICB9KTtcblxuICAkR09QRC5mID0gJGdldE93blByb3BlcnR5RGVzY3JpcHRvcjtcbiAgJERQLmYgICA9ICRkZWZpbmVQcm9wZXJ0eTtcbiAgcmVxdWlyZSgnLi9fb2JqZWN0LWdvcG4nKS5mID0gZ09QTkV4dC5mID0gJGdldE93blByb3BlcnR5TmFtZXM7XG4gIHJlcXVpcmUoJy4vX29iamVjdC1waWUnKS5mICA9ICRwcm9wZXJ0eUlzRW51bWVyYWJsZTtcbiAgcmVxdWlyZSgnLi9fb2JqZWN0LWdvcHMnKS5mID0gJGdldE93blByb3BlcnR5U3ltYm9scztcblxuICBpZihERVNDUklQVE9SUyAmJiAhcmVxdWlyZSgnLi9fbGlicmFyeScpKXtcbiAgICByZWRlZmluZShPYmplY3RQcm90bywgJ3Byb3BlcnR5SXNFbnVtZXJhYmxlJywgJHByb3BlcnR5SXNFbnVtZXJhYmxlLCB0cnVlKTtcbiAgfVxuXG4gIHdrc0V4dC5mID0gZnVuY3Rpb24obmFtZSl7XG4gICAgcmV0dXJuIHdyYXAod2tzKG5hbWUpKTtcbiAgfVxufVxuXG4kZXhwb3J0KCRleHBvcnQuRyArICRleHBvcnQuVyArICRleHBvcnQuRiAqICFVU0VfTkFUSVZFLCB7U3ltYm9sOiAkU3ltYm9sfSk7XG5cbmZvcih2YXIgc3ltYm9scyA9IChcbiAgLy8gMTkuNC4yLjIsIDE5LjQuMi4zLCAxOS40LjIuNCwgMTkuNC4yLjYsIDE5LjQuMi44LCAxOS40LjIuOSwgMTkuNC4yLjEwLCAxOS40LjIuMTEsIDE5LjQuMi4xMiwgMTkuNC4yLjEzLCAxOS40LjIuMTRcbiAgJ2hhc0luc3RhbmNlLGlzQ29uY2F0U3ByZWFkYWJsZSxpdGVyYXRvcixtYXRjaCxyZXBsYWNlLHNlYXJjaCxzcGVjaWVzLHNwbGl0LHRvUHJpbWl0aXZlLHRvU3RyaW5nVGFnLHVuc2NvcGFibGVzJ1xuKS5zcGxpdCgnLCcpLCBpID0gMDsgc3ltYm9scy5sZW5ndGggPiBpOyApd2tzKHN5bWJvbHNbaSsrXSk7XG5cbmZvcih2YXIgc3ltYm9scyA9ICRrZXlzKHdrcy5zdG9yZSksIGkgPSAwOyBzeW1ib2xzLmxlbmd0aCA+IGk7ICl3a3NEZWZpbmUoc3ltYm9sc1tpKytdKTtcblxuJGV4cG9ydCgkZXhwb3J0LlMgKyAkZXhwb3J0LkYgKiAhVVNFX05BVElWRSwgJ1N5bWJvbCcsIHtcbiAgLy8gMTkuNC4yLjEgU3ltYm9sLmZvcihrZXkpXG4gICdmb3InOiBmdW5jdGlvbihrZXkpe1xuICAgIHJldHVybiBoYXMoU3ltYm9sUmVnaXN0cnksIGtleSArPSAnJylcbiAgICAgID8gU3ltYm9sUmVnaXN0cnlba2V5XVxuICAgICAgOiBTeW1ib2xSZWdpc3RyeVtrZXldID0gJFN5bWJvbChrZXkpO1xuICB9LFxuICAvLyAxOS40LjIuNSBTeW1ib2wua2V5Rm9yKHN5bSlcbiAga2V5Rm9yOiBmdW5jdGlvbiBrZXlGb3Ioa2V5KXtcbiAgICBpZihpc1N5bWJvbChrZXkpKXJldHVybiBrZXlPZihTeW1ib2xSZWdpc3RyeSwga2V5KTtcbiAgICB0aHJvdyBUeXBlRXJyb3Ioa2V5ICsgJyBpcyBub3QgYSBzeW1ib2whJyk7XG4gIH0sXG4gIHVzZVNldHRlcjogZnVuY3Rpb24oKXsgc2V0dGVyID0gdHJ1ZTsgfSxcbiAgdXNlU2ltcGxlOiBmdW5jdGlvbigpeyBzZXR0ZXIgPSBmYWxzZTsgfVxufSk7XG5cbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogIVVTRV9OQVRJVkUsICdPYmplY3QnLCB7XG4gIC8vIDE5LjEuMi4yIE9iamVjdC5jcmVhdGUoTyBbLCBQcm9wZXJ0aWVzXSlcbiAgY3JlYXRlOiAkY3JlYXRlLFxuICAvLyAxOS4xLjIuNCBPYmplY3QuZGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcylcbiAgZGVmaW5lUHJvcGVydHk6ICRkZWZpbmVQcm9wZXJ0eSxcbiAgLy8gMTkuMS4yLjMgT2JqZWN0LmRlZmluZVByb3BlcnRpZXMoTywgUHJvcGVydGllcylcbiAgZGVmaW5lUHJvcGVydGllczogJGRlZmluZVByb3BlcnRpZXMsXG4gIC8vIDE5LjEuMi42IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IoTywgUClcbiAgZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yOiAkZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yLFxuICAvLyAxOS4xLjIuNyBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhPKVxuICBnZXRPd25Qcm9wZXJ0eU5hbWVzOiAkZ2V0T3duUHJvcGVydHlOYW1lcyxcbiAgLy8gMTkuMS4yLjggT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9scyhPKVxuICBnZXRPd25Qcm9wZXJ0eVN5bWJvbHM6ICRnZXRPd25Qcm9wZXJ0eVN5bWJvbHNcbn0pO1xuXG4vLyAyNC4zLjIgSlNPTi5zdHJpbmdpZnkodmFsdWUgWywgcmVwbGFjZXIgWywgc3BhY2VdXSlcbiRKU09OICYmICRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogKCFVU0VfTkFUSVZFIHx8ICRmYWlscyhmdW5jdGlvbigpe1xuICB2YXIgUyA9ICRTeW1ib2woKTtcbiAgLy8gTVMgRWRnZSBjb252ZXJ0cyBzeW1ib2wgdmFsdWVzIHRvIEpTT04gYXMge31cbiAgLy8gV2ViS2l0IGNvbnZlcnRzIHN5bWJvbCB2YWx1ZXMgdG8gSlNPTiBhcyBudWxsXG4gIC8vIFY4IHRocm93cyBvbiBib3hlZCBzeW1ib2xzXG4gIHJldHVybiBfc3RyaW5naWZ5KFtTXSkgIT0gJ1tudWxsXScgfHwgX3N0cmluZ2lmeSh7YTogU30pICE9ICd7fScgfHwgX3N0cmluZ2lmeShPYmplY3QoUykpICE9ICd7fSc7XG59KSksICdKU09OJywge1xuICBzdHJpbmdpZnk6IGZ1bmN0aW9uIHN0cmluZ2lmeShpdCl7XG4gICAgaWYoaXQgPT09IHVuZGVmaW5lZCB8fCBpc1N5bWJvbChpdCkpcmV0dXJuOyAvLyBJRTggcmV0dXJucyBzdHJpbmcgb24gdW5kZWZpbmVkXG4gICAgdmFyIGFyZ3MgPSBbaXRdXG4gICAgICAsIGkgICAgPSAxXG4gICAgICAsIHJlcGxhY2VyLCAkcmVwbGFjZXI7XG4gICAgd2hpbGUoYXJndW1lbnRzLmxlbmd0aCA+IGkpYXJncy5wdXNoKGFyZ3VtZW50c1tpKytdKTtcbiAgICByZXBsYWNlciA9IGFyZ3NbMV07XG4gICAgaWYodHlwZW9mIHJlcGxhY2VyID09ICdmdW5jdGlvbicpJHJlcGxhY2VyID0gcmVwbGFjZXI7XG4gICAgaWYoJHJlcGxhY2VyIHx8ICFpc0FycmF5KHJlcGxhY2VyKSlyZXBsYWNlciA9IGZ1bmN0aW9uKGtleSwgdmFsdWUpe1xuICAgICAgaWYoJHJlcGxhY2VyKXZhbHVlID0gJHJlcGxhY2VyLmNhbGwodGhpcywga2V5LCB2YWx1ZSk7XG4gICAgICBpZighaXNTeW1ib2wodmFsdWUpKXJldHVybiB2YWx1ZTtcbiAgICB9O1xuICAgIGFyZ3NbMV0gPSByZXBsYWNlcjtcbiAgICByZXR1cm4gX3N0cmluZ2lmeS5hcHBseSgkSlNPTiwgYXJncyk7XG4gIH1cbn0pO1xuXG4vLyAxOS40LjMuNCBTeW1ib2wucHJvdG90eXBlW0BAdG9QcmltaXRpdmVdKGhpbnQpXG4kU3ltYm9sW1BST1RPVFlQRV1bVE9fUFJJTUlUSVZFXSB8fCByZXF1aXJlKCcuL19oaWRlJykoJFN5bWJvbFtQUk9UT1RZUEVdLCBUT19QUklNSVRJVkUsICRTeW1ib2xbUFJPVE9UWVBFXS52YWx1ZU9mKTtcbi8vIDE5LjQuMy41IFN5bWJvbC5wcm90b3R5cGVbQEB0b1N0cmluZ1RhZ11cbnNldFRvU3RyaW5nVGFnKCRTeW1ib2wsICdTeW1ib2wnKTtcbi8vIDIwLjIuMS45IE1hdGhbQEB0b1N0cmluZ1RhZ11cbnNldFRvU3RyaW5nVGFnKE1hdGgsICdNYXRoJywgdHJ1ZSk7XG4vLyAyNC4zLjMgSlNPTltAQHRvU3RyaW5nVGFnXVxuc2V0VG9TdHJpbmdUYWcoZ2xvYmFsLkpTT04sICdKU09OJywgdHJ1ZSk7IiwiLy8gaHR0cHM6Ly9naXRodWIuY29tL3RjMzkvcHJvcG9zYWwtb2JqZWN0LXZhbHVlcy1lbnRyaWVzXG52YXIgJGV4cG9ydCAgPSByZXF1aXJlKCcuL19leHBvcnQnKVxuICAsICRlbnRyaWVzID0gcmVxdWlyZSgnLi9fb2JqZWN0LXRvLWFycmF5JykodHJ1ZSk7XG5cbiRleHBvcnQoJGV4cG9ydC5TLCAnT2JqZWN0Jywge1xuICBlbnRyaWVzOiBmdW5jdGlvbiBlbnRyaWVzKGl0KXtcbiAgICByZXR1cm4gJGVudHJpZXMoaXQpO1xuICB9XG59KTsiLCJyZXF1aXJlKCcuL193a3MtZGVmaW5lJykoJ2FzeW5jSXRlcmF0b3InKTsiLCJyZXF1aXJlKCcuL193a3MtZGVmaW5lJykoJ29ic2VydmFibGUnKTsiLCJyZXF1aXJlKCcuL2VzNi5hcnJheS5pdGVyYXRvcicpO1xudmFyIGdsb2JhbCAgICAgICAgPSByZXF1aXJlKCcuL19nbG9iYWwnKVxuICAsIGhpZGUgICAgICAgICAgPSByZXF1aXJlKCcuL19oaWRlJylcbiAgLCBJdGVyYXRvcnMgICAgID0gcmVxdWlyZSgnLi9faXRlcmF0b3JzJylcbiAgLCBUT19TVFJJTkdfVEFHID0gcmVxdWlyZSgnLi9fd2tzJykoJ3RvU3RyaW5nVGFnJyk7XG5cbmZvcih2YXIgY29sbGVjdGlvbnMgPSBbJ05vZGVMaXN0JywgJ0RPTVRva2VuTGlzdCcsICdNZWRpYUxpc3QnLCAnU3R5bGVTaGVldExpc3QnLCAnQ1NTUnVsZUxpc3QnXSwgaSA9IDA7IGkgPCA1OyBpKyspe1xuICB2YXIgTkFNRSAgICAgICA9IGNvbGxlY3Rpb25zW2ldXG4gICAgLCBDb2xsZWN0aW9uID0gZ2xvYmFsW05BTUVdXG4gICAgLCBwcm90byAgICAgID0gQ29sbGVjdGlvbiAmJiBDb2xsZWN0aW9uLnByb3RvdHlwZTtcbiAgaWYocHJvdG8gJiYgIXByb3RvW1RPX1NUUklOR19UQUddKWhpZGUocHJvdG8sIFRPX1NUUklOR19UQUcsIE5BTUUpO1xuICBJdGVyYXRvcnNbTkFNRV0gPSBJdGVyYXRvcnMuQXJyYXk7XG59IiwiLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBnbG9iYWxgIGZyb20gTm9kZS5qcy4gKi9cbnZhciBmcmVlR2xvYmFsID0gdHlwZW9mIGdsb2JhbCA9PSAnb2JqZWN0JyAmJiBnbG9iYWwgJiYgZ2xvYmFsLk9iamVjdCA9PT0gT2JqZWN0ICYmIGdsb2JhbDtcblxubW9kdWxlLmV4cG9ydHMgPSBmcmVlR2xvYmFsO1xuIiwidmFyIGZyZWVHbG9iYWwgPSByZXF1aXJlKCcuL19mcmVlR2xvYmFsJyk7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgc2VsZmAuICovXG52YXIgZnJlZVNlbGYgPSB0eXBlb2Ygc2VsZiA9PSAnb2JqZWN0JyAmJiBzZWxmICYmIHNlbGYuT2JqZWN0ID09PSBPYmplY3QgJiYgc2VsZjtcblxuLyoqIFVzZWQgYXMgYSByZWZlcmVuY2UgdG8gdGhlIGdsb2JhbCBvYmplY3QuICovXG52YXIgcm9vdCA9IGZyZWVHbG9iYWwgfHwgZnJlZVNlbGYgfHwgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblxubW9kdWxlLmV4cG9ydHMgPSByb290O1xuIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9pc09iamVjdCcpLFxuICAgIG5vdyA9IHJlcXVpcmUoJy4vbm93JyksXG4gICAgdG9OdW1iZXIgPSByZXF1aXJlKCcuL3RvTnVtYmVyJyk7XG5cbi8qKiBFcnJvciBtZXNzYWdlIGNvbnN0YW50cy4gKi9cbnZhciBGVU5DX0VSUk9SX1RFWFQgPSAnRXhwZWN0ZWQgYSBmdW5jdGlvbic7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIGZvciB0aG9zZSB3aXRoIHRoZSBzYW1lIG5hbWUgYXMgb3RoZXIgYGxvZGFzaGAgbWV0aG9kcy4gKi9cbnZhciBuYXRpdmVNYXggPSBNYXRoLm1heCxcbiAgICBuYXRpdmVNaW4gPSBNYXRoLm1pbjtcblxuLyoqXG4gKiBDcmVhdGVzIGEgZGVib3VuY2VkIGZ1bmN0aW9uIHRoYXQgZGVsYXlzIGludm9raW5nIGBmdW5jYCB1bnRpbCBhZnRlciBgd2FpdGBcbiAqIG1pbGxpc2Vjb25kcyBoYXZlIGVsYXBzZWQgc2luY2UgdGhlIGxhc3QgdGltZSB0aGUgZGVib3VuY2VkIGZ1bmN0aW9uIHdhc1xuICogaW52b2tlZC4gVGhlIGRlYm91bmNlZCBmdW5jdGlvbiBjb21lcyB3aXRoIGEgYGNhbmNlbGAgbWV0aG9kIHRvIGNhbmNlbFxuICogZGVsYXllZCBgZnVuY2AgaW52b2NhdGlvbnMgYW5kIGEgYGZsdXNoYCBtZXRob2QgdG8gaW1tZWRpYXRlbHkgaW52b2tlIHRoZW0uXG4gKiBQcm92aWRlIGBvcHRpb25zYCB0byBpbmRpY2F0ZSB3aGV0aGVyIGBmdW5jYCBzaG91bGQgYmUgaW52b2tlZCBvbiB0aGVcbiAqIGxlYWRpbmcgYW5kL29yIHRyYWlsaW5nIGVkZ2Ugb2YgdGhlIGB3YWl0YCB0aW1lb3V0LiBUaGUgYGZ1bmNgIGlzIGludm9rZWRcbiAqIHdpdGggdGhlIGxhc3QgYXJndW1lbnRzIHByb3ZpZGVkIHRvIHRoZSBkZWJvdW5jZWQgZnVuY3Rpb24uIFN1YnNlcXVlbnRcbiAqIGNhbGxzIHRvIHRoZSBkZWJvdW5jZWQgZnVuY3Rpb24gcmV0dXJuIHRoZSByZXN1bHQgb2YgdGhlIGxhc3QgYGZ1bmNgXG4gKiBpbnZvY2F0aW9uLlxuICpcbiAqICoqTm90ZToqKiBJZiBgbGVhZGluZ2AgYW5kIGB0cmFpbGluZ2Agb3B0aW9ucyBhcmUgYHRydWVgLCBgZnVuY2AgaXNcbiAqIGludm9rZWQgb24gdGhlIHRyYWlsaW5nIGVkZ2Ugb2YgdGhlIHRpbWVvdXQgb25seSBpZiB0aGUgZGVib3VuY2VkIGZ1bmN0aW9uXG4gKiBpcyBpbnZva2VkIG1vcmUgdGhhbiBvbmNlIGR1cmluZyB0aGUgYHdhaXRgIHRpbWVvdXQuXG4gKlxuICogSWYgYHdhaXRgIGlzIGAwYCBhbmQgYGxlYWRpbmdgIGlzIGBmYWxzZWAsIGBmdW5jYCBpbnZvY2F0aW9uIGlzIGRlZmVycmVkXG4gKiB1bnRpbCB0byB0aGUgbmV4dCB0aWNrLCBzaW1pbGFyIHRvIGBzZXRUaW1lb3V0YCB3aXRoIGEgdGltZW91dCBvZiBgMGAuXG4gKlxuICogU2VlIFtEYXZpZCBDb3JiYWNobydzIGFydGljbGVdKGh0dHBzOi8vY3NzLXRyaWNrcy5jb20vZGVib3VuY2luZy10aHJvdHRsaW5nLWV4cGxhaW5lZC1leGFtcGxlcy8pXG4gKiBmb3IgZGV0YWlscyBvdmVyIHRoZSBkaWZmZXJlbmNlcyBiZXR3ZWVuIGBfLmRlYm91bmNlYCBhbmQgYF8udGhyb3R0bGVgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gZGVib3VuY2UuXG4gKiBAcGFyYW0ge251bWJlcn0gW3dhaXQ9MF0gVGhlIG51bWJlciBvZiBtaWxsaXNlY29uZHMgdG8gZGVsYXkuXG4gKiBAcGFyYW0ge09iamVjdH0gW29wdGlvbnM9e31dIFRoZSBvcHRpb25zIG9iamVjdC5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMubGVhZGluZz1mYWxzZV1cbiAqICBTcGVjaWZ5IGludm9raW5nIG9uIHRoZSBsZWFkaW5nIGVkZ2Ugb2YgdGhlIHRpbWVvdXQuXG4gKiBAcGFyYW0ge251bWJlcn0gW29wdGlvbnMubWF4V2FpdF1cbiAqICBUaGUgbWF4aW11bSB0aW1lIGBmdW5jYCBpcyBhbGxvd2VkIHRvIGJlIGRlbGF5ZWQgYmVmb3JlIGl0J3MgaW52b2tlZC5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMudHJhaWxpbmc9dHJ1ZV1cbiAqICBTcGVjaWZ5IGludm9raW5nIG9uIHRoZSB0cmFpbGluZyBlZGdlIG9mIHRoZSB0aW1lb3V0LlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgZGVib3VuY2VkIGZ1bmN0aW9uLlxuICogQGV4YW1wbGVcbiAqXG4gKiAvLyBBdm9pZCBjb3N0bHkgY2FsY3VsYXRpb25zIHdoaWxlIHRoZSB3aW5kb3cgc2l6ZSBpcyBpbiBmbHV4LlxuICogalF1ZXJ5KHdpbmRvdykub24oJ3Jlc2l6ZScsIF8uZGVib3VuY2UoY2FsY3VsYXRlTGF5b3V0LCAxNTApKTtcbiAqXG4gKiAvLyBJbnZva2UgYHNlbmRNYWlsYCB3aGVuIGNsaWNrZWQsIGRlYm91bmNpbmcgc3Vic2VxdWVudCBjYWxscy5cbiAqIGpRdWVyeShlbGVtZW50KS5vbignY2xpY2snLCBfLmRlYm91bmNlKHNlbmRNYWlsLCAzMDAsIHtcbiAqICAgJ2xlYWRpbmcnOiB0cnVlLFxuICogICAndHJhaWxpbmcnOiBmYWxzZVxuICogfSkpO1xuICpcbiAqIC8vIEVuc3VyZSBgYmF0Y2hMb2dgIGlzIGludm9rZWQgb25jZSBhZnRlciAxIHNlY29uZCBvZiBkZWJvdW5jZWQgY2FsbHMuXG4gKiB2YXIgZGVib3VuY2VkID0gXy5kZWJvdW5jZShiYXRjaExvZywgMjUwLCB7ICdtYXhXYWl0JzogMTAwMCB9KTtcbiAqIHZhciBzb3VyY2UgPSBuZXcgRXZlbnRTb3VyY2UoJy9zdHJlYW0nKTtcbiAqIGpRdWVyeShzb3VyY2UpLm9uKCdtZXNzYWdlJywgZGVib3VuY2VkKTtcbiAqXG4gKiAvLyBDYW5jZWwgdGhlIHRyYWlsaW5nIGRlYm91bmNlZCBpbnZvY2F0aW9uLlxuICogalF1ZXJ5KHdpbmRvdykub24oJ3BvcHN0YXRlJywgZGVib3VuY2VkLmNhbmNlbCk7XG4gKi9cbmZ1bmN0aW9uIGRlYm91bmNlKGZ1bmMsIHdhaXQsIG9wdGlvbnMpIHtcbiAgdmFyIGxhc3RBcmdzLFxuICAgICAgbGFzdFRoaXMsXG4gICAgICBtYXhXYWl0LFxuICAgICAgcmVzdWx0LFxuICAgICAgdGltZXJJZCxcbiAgICAgIGxhc3RDYWxsVGltZSxcbiAgICAgIGxhc3RJbnZva2VUaW1lID0gMCxcbiAgICAgIGxlYWRpbmcgPSBmYWxzZSxcbiAgICAgIG1heGluZyA9IGZhbHNlLFxuICAgICAgdHJhaWxpbmcgPSB0cnVlO1xuXG4gIGlmICh0eXBlb2YgZnVuYyAhPSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihGVU5DX0VSUk9SX1RFWFQpO1xuICB9XG4gIHdhaXQgPSB0b051bWJlcih3YWl0KSB8fCAwO1xuICBpZiAoaXNPYmplY3Qob3B0aW9ucykpIHtcbiAgICBsZWFkaW5nID0gISFvcHRpb25zLmxlYWRpbmc7XG4gICAgbWF4aW5nID0gJ21heFdhaXQnIGluIG9wdGlvbnM7XG4gICAgbWF4V2FpdCA9IG1heGluZyA/IG5hdGl2ZU1heCh0b051bWJlcihvcHRpb25zLm1heFdhaXQpIHx8IDAsIHdhaXQpIDogbWF4V2FpdDtcbiAgICB0cmFpbGluZyA9ICd0cmFpbGluZycgaW4gb3B0aW9ucyA/ICEhb3B0aW9ucy50cmFpbGluZyA6IHRyYWlsaW5nO1xuICB9XG5cbiAgZnVuY3Rpb24gaW52b2tlRnVuYyh0aW1lKSB7XG4gICAgdmFyIGFyZ3MgPSBsYXN0QXJncyxcbiAgICAgICAgdGhpc0FyZyA9IGxhc3RUaGlzO1xuXG4gICAgbGFzdEFyZ3MgPSBsYXN0VGhpcyA9IHVuZGVmaW5lZDtcbiAgICBsYXN0SW52b2tlVGltZSA9IHRpbWU7XG4gICAgcmVzdWx0ID0gZnVuYy5hcHBseSh0aGlzQXJnLCBhcmdzKTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgZnVuY3Rpb24gbGVhZGluZ0VkZ2UodGltZSkge1xuICAgIC8vIFJlc2V0IGFueSBgbWF4V2FpdGAgdGltZXIuXG4gICAgbGFzdEludm9rZVRpbWUgPSB0aW1lO1xuICAgIC8vIFN0YXJ0IHRoZSB0aW1lciBmb3IgdGhlIHRyYWlsaW5nIGVkZ2UuXG4gICAgdGltZXJJZCA9IHNldFRpbWVvdXQodGltZXJFeHBpcmVkLCB3YWl0KTtcbiAgICAvLyBJbnZva2UgdGhlIGxlYWRpbmcgZWRnZS5cbiAgICByZXR1cm4gbGVhZGluZyA/IGludm9rZUZ1bmModGltZSkgOiByZXN1bHQ7XG4gIH1cblxuICBmdW5jdGlvbiByZW1haW5pbmdXYWl0KHRpbWUpIHtcbiAgICB2YXIgdGltZVNpbmNlTGFzdENhbGwgPSB0aW1lIC0gbGFzdENhbGxUaW1lLFxuICAgICAgICB0aW1lU2luY2VMYXN0SW52b2tlID0gdGltZSAtIGxhc3RJbnZva2VUaW1lLFxuICAgICAgICByZXN1bHQgPSB3YWl0IC0gdGltZVNpbmNlTGFzdENhbGw7XG5cbiAgICByZXR1cm4gbWF4aW5nID8gbmF0aXZlTWluKHJlc3VsdCwgbWF4V2FpdCAtIHRpbWVTaW5jZUxhc3RJbnZva2UpIDogcmVzdWx0O1xuICB9XG5cbiAgZnVuY3Rpb24gc2hvdWxkSW52b2tlKHRpbWUpIHtcbiAgICB2YXIgdGltZVNpbmNlTGFzdENhbGwgPSB0aW1lIC0gbGFzdENhbGxUaW1lLFxuICAgICAgICB0aW1lU2luY2VMYXN0SW52b2tlID0gdGltZSAtIGxhc3RJbnZva2VUaW1lO1xuXG4gICAgLy8gRWl0aGVyIHRoaXMgaXMgdGhlIGZpcnN0IGNhbGwsIGFjdGl2aXR5IGhhcyBzdG9wcGVkIGFuZCB3ZSdyZSBhdCB0aGVcbiAgICAvLyB0cmFpbGluZyBlZGdlLCB0aGUgc3lzdGVtIHRpbWUgaGFzIGdvbmUgYmFja3dhcmRzIGFuZCB3ZSdyZSB0cmVhdGluZ1xuICAgIC8vIGl0IGFzIHRoZSB0cmFpbGluZyBlZGdlLCBvciB3ZSd2ZSBoaXQgdGhlIGBtYXhXYWl0YCBsaW1pdC5cbiAgICByZXR1cm4gKGxhc3RDYWxsVGltZSA9PT0gdW5kZWZpbmVkIHx8ICh0aW1lU2luY2VMYXN0Q2FsbCA+PSB3YWl0KSB8fFxuICAgICAgKHRpbWVTaW5jZUxhc3RDYWxsIDwgMCkgfHwgKG1heGluZyAmJiB0aW1lU2luY2VMYXN0SW52b2tlID49IG1heFdhaXQpKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHRpbWVyRXhwaXJlZCgpIHtcbiAgICB2YXIgdGltZSA9IG5vdygpO1xuICAgIGlmIChzaG91bGRJbnZva2UodGltZSkpIHtcbiAgICAgIHJldHVybiB0cmFpbGluZ0VkZ2UodGltZSk7XG4gICAgfVxuICAgIC8vIFJlc3RhcnQgdGhlIHRpbWVyLlxuICAgIHRpbWVySWQgPSBzZXRUaW1lb3V0KHRpbWVyRXhwaXJlZCwgcmVtYWluaW5nV2FpdCh0aW1lKSk7XG4gIH1cblxuICBmdW5jdGlvbiB0cmFpbGluZ0VkZ2UodGltZSkge1xuICAgIHRpbWVySWQgPSB1bmRlZmluZWQ7XG5cbiAgICAvLyBPbmx5IGludm9rZSBpZiB3ZSBoYXZlIGBsYXN0QXJnc2Agd2hpY2ggbWVhbnMgYGZ1bmNgIGhhcyBiZWVuXG4gICAgLy8gZGVib3VuY2VkIGF0IGxlYXN0IG9uY2UuXG4gICAgaWYgKHRyYWlsaW5nICYmIGxhc3RBcmdzKSB7XG4gICAgICByZXR1cm4gaW52b2tlRnVuYyh0aW1lKTtcbiAgICB9XG4gICAgbGFzdEFyZ3MgPSBsYXN0VGhpcyA9IHVuZGVmaW5lZDtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgZnVuY3Rpb24gY2FuY2VsKCkge1xuICAgIGlmICh0aW1lcklkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aW1lcklkKTtcbiAgICB9XG4gICAgbGFzdEludm9rZVRpbWUgPSAwO1xuICAgIGxhc3RBcmdzID0gbGFzdENhbGxUaW1lID0gbGFzdFRoaXMgPSB0aW1lcklkID0gdW5kZWZpbmVkO1xuICB9XG5cbiAgZnVuY3Rpb24gZmx1c2goKSB7XG4gICAgcmV0dXJuIHRpbWVySWQgPT09IHVuZGVmaW5lZCA/IHJlc3VsdCA6IHRyYWlsaW5nRWRnZShub3coKSk7XG4gIH1cblxuICBmdW5jdGlvbiBkZWJvdW5jZWQoKSB7XG4gICAgdmFyIHRpbWUgPSBub3coKSxcbiAgICAgICAgaXNJbnZva2luZyA9IHNob3VsZEludm9rZSh0aW1lKTtcblxuICAgIGxhc3RBcmdzID0gYXJndW1lbnRzO1xuICAgIGxhc3RUaGlzID0gdGhpcztcbiAgICBsYXN0Q2FsbFRpbWUgPSB0aW1lO1xuXG4gICAgaWYgKGlzSW52b2tpbmcpIHtcbiAgICAgIGlmICh0aW1lcklkID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgcmV0dXJuIGxlYWRpbmdFZGdlKGxhc3RDYWxsVGltZSk7XG4gICAgICB9XG4gICAgICBpZiAobWF4aW5nKSB7XG4gICAgICAgIC8vIEhhbmRsZSBpbnZvY2F0aW9ucyBpbiBhIHRpZ2h0IGxvb3AuXG4gICAgICAgIHRpbWVySWQgPSBzZXRUaW1lb3V0KHRpbWVyRXhwaXJlZCwgd2FpdCk7XG4gICAgICAgIHJldHVybiBpbnZva2VGdW5jKGxhc3RDYWxsVGltZSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh0aW1lcklkID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRpbWVySWQgPSBzZXRUaW1lb3V0KHRpbWVyRXhwaXJlZCwgd2FpdCk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbiAgZGVib3VuY2VkLmNhbmNlbCA9IGNhbmNlbDtcbiAgZGVib3VuY2VkLmZsdXNoID0gZmx1c2g7XG4gIHJldHVybiBkZWJvdW5jZWQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZGVib3VuY2U7XG4iLCIvKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIHRoZVxuICogW2xhbmd1YWdlIHR5cGVdKGh0dHA6Ly93d3cuZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1lY21hc2NyaXB0LWxhbmd1YWdlLXR5cGVzKVxuICogb2YgYE9iamVjdGAuIChlLmcuIGFycmF5cywgZnVuY3Rpb25zLCBvYmplY3RzLCByZWdleGVzLCBgbmV3IE51bWJlcigwKWAsIGFuZCBgbmV3IFN0cmluZygnJylgKVxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0KHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChfLm5vb3ApO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QobnVsbCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdCh2YWx1ZSkge1xuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcbiAgcmV0dXJuIHZhbHVlICE9IG51bGwgJiYgKHR5cGUgPT0gJ29iamVjdCcgfHwgdHlwZSA9PSAnZnVuY3Rpb24nKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc09iamVjdDtcbiIsIi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UuIEEgdmFsdWUgaXMgb2JqZWN0LWxpa2UgaWYgaXQncyBub3QgYG51bGxgXG4gKiBhbmQgaGFzIGEgYHR5cGVvZmAgcmVzdWx0IG9mIFwib2JqZWN0XCIuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdExpa2Uoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc09iamVjdExpa2UobnVsbCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdExpa2UodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlICE9IG51bGwgJiYgdHlwZW9mIHZhbHVlID09ICdvYmplY3QnO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzT2JqZWN0TGlrZTtcbiIsInZhciBpc09iamVjdExpa2UgPSByZXF1aXJlKCcuL2lzT2JqZWN0TGlrZScpO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgc3ltYm9sVGFnID0gJ1tvYmplY3QgU3ltYm9sXSc7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZVxuICogW2B0b1N0cmluZ1RhZ2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBvYmplY3RUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYSBgU3ltYm9sYCBwcmltaXRpdmUgb3Igb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgc3ltYm9sLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNTeW1ib2woU3ltYm9sLml0ZXJhdG9yKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzU3ltYm9sKCdhYmMnKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzU3ltYm9sKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT0gJ3N5bWJvbCcgfHxcbiAgICAoaXNPYmplY3RMaWtlKHZhbHVlKSAmJiBvYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKSA9PSBzeW1ib2xUYWcpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzU3ltYm9sO1xuIiwidmFyIHJvb3QgPSByZXF1aXJlKCcuL19yb290Jyk7XG5cbi8qKlxuICogR2V0cyB0aGUgdGltZXN0YW1wIG9mIHRoZSBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIHRoYXQgaGF2ZSBlbGFwc2VkIHNpbmNlXG4gKiB0aGUgVW5peCBlcG9jaCAoMSBKYW51YXJ5IDE5NzAgMDA6MDA6MDAgVVRDKS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDIuNC4wXG4gKiBAY2F0ZWdvcnkgRGF0ZVxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgdGltZXN0YW1wLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmRlZmVyKGZ1bmN0aW9uKHN0YW1wKSB7XG4gKiAgIGNvbnNvbGUubG9nKF8ubm93KCkgLSBzdGFtcCk7XG4gKiB9LCBfLm5vdygpKTtcbiAqIC8vID0+IExvZ3MgdGhlIG51bWJlciBvZiBtaWxsaXNlY29uZHMgaXQgdG9vayBmb3IgdGhlIGRlZmVycmVkIGludm9jYXRpb24uXG4gKi9cbnZhciBub3cgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHJvb3QuRGF0ZS5ub3coKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gbm93O1xuIiwidmFyIGRlYm91bmNlID0gcmVxdWlyZSgnLi9kZWJvdW5jZScpLFxuICAgIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9pc09iamVjdCcpO1xuXG4vKiogRXJyb3IgbWVzc2FnZSBjb25zdGFudHMuICovXG52YXIgRlVOQ19FUlJPUl9URVhUID0gJ0V4cGVjdGVkIGEgZnVuY3Rpb24nO1xuXG4vKipcbiAqIENyZWF0ZXMgYSB0aHJvdHRsZWQgZnVuY3Rpb24gdGhhdCBvbmx5IGludm9rZXMgYGZ1bmNgIGF0IG1vc3Qgb25jZSBwZXJcbiAqIGV2ZXJ5IGB3YWl0YCBtaWxsaXNlY29uZHMuIFRoZSB0aHJvdHRsZWQgZnVuY3Rpb24gY29tZXMgd2l0aCBhIGBjYW5jZWxgXG4gKiBtZXRob2QgdG8gY2FuY2VsIGRlbGF5ZWQgYGZ1bmNgIGludm9jYXRpb25zIGFuZCBhIGBmbHVzaGAgbWV0aG9kIHRvXG4gKiBpbW1lZGlhdGVseSBpbnZva2UgdGhlbS4gUHJvdmlkZSBgb3B0aW9uc2AgdG8gaW5kaWNhdGUgd2hldGhlciBgZnVuY2BcbiAqIHNob3VsZCBiZSBpbnZva2VkIG9uIHRoZSBsZWFkaW5nIGFuZC9vciB0cmFpbGluZyBlZGdlIG9mIHRoZSBgd2FpdGBcbiAqIHRpbWVvdXQuIFRoZSBgZnVuY2AgaXMgaW52b2tlZCB3aXRoIHRoZSBsYXN0IGFyZ3VtZW50cyBwcm92aWRlZCB0byB0aGVcbiAqIHRocm90dGxlZCBmdW5jdGlvbi4gU3Vic2VxdWVudCBjYWxscyB0byB0aGUgdGhyb3R0bGVkIGZ1bmN0aW9uIHJldHVybiB0aGVcbiAqIHJlc3VsdCBvZiB0aGUgbGFzdCBgZnVuY2AgaW52b2NhdGlvbi5cbiAqXG4gKiAqKk5vdGU6KiogSWYgYGxlYWRpbmdgIGFuZCBgdHJhaWxpbmdgIG9wdGlvbnMgYXJlIGB0cnVlYCwgYGZ1bmNgIGlzXG4gKiBpbnZva2VkIG9uIHRoZSB0cmFpbGluZyBlZGdlIG9mIHRoZSB0aW1lb3V0IG9ubHkgaWYgdGhlIHRocm90dGxlZCBmdW5jdGlvblxuICogaXMgaW52b2tlZCBtb3JlIHRoYW4gb25jZSBkdXJpbmcgdGhlIGB3YWl0YCB0aW1lb3V0LlxuICpcbiAqIElmIGB3YWl0YCBpcyBgMGAgYW5kIGBsZWFkaW5nYCBpcyBgZmFsc2VgLCBgZnVuY2AgaW52b2NhdGlvbiBpcyBkZWZlcnJlZFxuICogdW50aWwgdG8gdGhlIG5leHQgdGljaywgc2ltaWxhciB0byBgc2V0VGltZW91dGAgd2l0aCBhIHRpbWVvdXQgb2YgYDBgLlxuICpcbiAqIFNlZSBbRGF2aWQgQ29yYmFjaG8ncyBhcnRpY2xlXShodHRwczovL2Nzcy10cmlja3MuY29tL2RlYm91bmNpbmctdGhyb3R0bGluZy1leHBsYWluZWQtZXhhbXBsZXMvKVxuICogZm9yIGRldGFpbHMgb3ZlciB0aGUgZGlmZmVyZW5jZXMgYmV0d2VlbiBgXy50aHJvdHRsZWAgYW5kIGBfLmRlYm91bmNlYC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIHRocm90dGxlLlxuICogQHBhcmFtIHtudW1iZXJ9IFt3YWl0PTBdIFRoZSBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIHRvIHRocm90dGxlIGludm9jYXRpb25zIHRvLlxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRpb25zPXt9XSBUaGUgb3B0aW9ucyBvYmplY3QuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLmxlYWRpbmc9dHJ1ZV1cbiAqICBTcGVjaWZ5IGludm9raW5nIG9uIHRoZSBsZWFkaW5nIGVkZ2Ugb2YgdGhlIHRpbWVvdXQuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLnRyYWlsaW5nPXRydWVdXG4gKiAgU3BlY2lmeSBpbnZva2luZyBvbiB0aGUgdHJhaWxpbmcgZWRnZSBvZiB0aGUgdGltZW91dC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IHRocm90dGxlZCBmdW5jdGlvbi5cbiAqIEBleGFtcGxlXG4gKlxuICogLy8gQXZvaWQgZXhjZXNzaXZlbHkgdXBkYXRpbmcgdGhlIHBvc2l0aW9uIHdoaWxlIHNjcm9sbGluZy5cbiAqIGpRdWVyeSh3aW5kb3cpLm9uKCdzY3JvbGwnLCBfLnRocm90dGxlKHVwZGF0ZVBvc2l0aW9uLCAxMDApKTtcbiAqXG4gKiAvLyBJbnZva2UgYHJlbmV3VG9rZW5gIHdoZW4gdGhlIGNsaWNrIGV2ZW50IGlzIGZpcmVkLCBidXQgbm90IG1vcmUgdGhhbiBvbmNlIGV2ZXJ5IDUgbWludXRlcy5cbiAqIHZhciB0aHJvdHRsZWQgPSBfLnRocm90dGxlKHJlbmV3VG9rZW4sIDMwMDAwMCwgeyAndHJhaWxpbmcnOiBmYWxzZSB9KTtcbiAqIGpRdWVyeShlbGVtZW50KS5vbignY2xpY2snLCB0aHJvdHRsZWQpO1xuICpcbiAqIC8vIENhbmNlbCB0aGUgdHJhaWxpbmcgdGhyb3R0bGVkIGludm9jYXRpb24uXG4gKiBqUXVlcnkod2luZG93KS5vbigncG9wc3RhdGUnLCB0aHJvdHRsZWQuY2FuY2VsKTtcbiAqL1xuZnVuY3Rpb24gdGhyb3R0bGUoZnVuYywgd2FpdCwgb3B0aW9ucykge1xuICB2YXIgbGVhZGluZyA9IHRydWUsXG4gICAgICB0cmFpbGluZyA9IHRydWU7XG5cbiAgaWYgKHR5cGVvZiBmdW5jICE9ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKEZVTkNfRVJST1JfVEVYVCk7XG4gIH1cbiAgaWYgKGlzT2JqZWN0KG9wdGlvbnMpKSB7XG4gICAgbGVhZGluZyA9ICdsZWFkaW5nJyBpbiBvcHRpb25zID8gISFvcHRpb25zLmxlYWRpbmcgOiBsZWFkaW5nO1xuICAgIHRyYWlsaW5nID0gJ3RyYWlsaW5nJyBpbiBvcHRpb25zID8gISFvcHRpb25zLnRyYWlsaW5nIDogdHJhaWxpbmc7XG4gIH1cbiAgcmV0dXJuIGRlYm91bmNlKGZ1bmMsIHdhaXQsIHtcbiAgICAnbGVhZGluZyc6IGxlYWRpbmcsXG4gICAgJ21heFdhaXQnOiB3YWl0LFxuICAgICd0cmFpbGluZyc6IHRyYWlsaW5nXG4gIH0pO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHRocm90dGxlO1xuIiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9pc09iamVjdCcpLFxuICAgIGlzU3ltYm9sID0gcmVxdWlyZSgnLi9pc1N5bWJvbCcpO1xuXG4vKiogVXNlZCBhcyByZWZlcmVuY2VzIGZvciB2YXJpb3VzIGBOdW1iZXJgIGNvbnN0YW50cy4gKi9cbnZhciBOQU4gPSAwIC8gMDtcblxuLyoqIFVzZWQgdG8gbWF0Y2ggbGVhZGluZyBhbmQgdHJhaWxpbmcgd2hpdGVzcGFjZS4gKi9cbnZhciByZVRyaW0gPSAvXlxccyt8XFxzKyQvZztcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IGJhZCBzaWduZWQgaGV4YWRlY2ltYWwgc3RyaW5nIHZhbHVlcy4gKi9cbnZhciByZUlzQmFkSGV4ID0gL15bLStdMHhbMC05YS1mXSskL2k7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBiaW5hcnkgc3RyaW5nIHZhbHVlcy4gKi9cbnZhciByZUlzQmluYXJ5ID0gL14wYlswMV0rJC9pO1xuXG4vKiogVXNlZCB0byBkZXRlY3Qgb2N0YWwgc3RyaW5nIHZhbHVlcy4gKi9cbnZhciByZUlzT2N0YWwgPSAvXjBvWzAtN10rJC9pO1xuXG4vKiogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgd2l0aG91dCBhIGRlcGVuZGVuY3kgb24gYHJvb3RgLiAqL1xudmFyIGZyZWVQYXJzZUludCA9IHBhcnNlSW50O1xuXG4vKipcbiAqIENvbnZlcnRzIGB2YWx1ZWAgdG8gYSBudW1iZXIuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHByb2Nlc3MuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSBudW1iZXIuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8udG9OdW1iZXIoMy4yKTtcbiAqIC8vID0+IDMuMlxuICpcbiAqIF8udG9OdW1iZXIoTnVtYmVyLk1JTl9WQUxVRSk7XG4gKiAvLyA9PiA1ZS0zMjRcbiAqXG4gKiBfLnRvTnVtYmVyKEluZmluaXR5KTtcbiAqIC8vID0+IEluZmluaXR5XG4gKlxuICogXy50b051bWJlcignMy4yJyk7XG4gKiAvLyA9PiAzLjJcbiAqL1xuZnVuY3Rpb24gdG9OdW1iZXIodmFsdWUpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJykge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuICBpZiAoaXNTeW1ib2wodmFsdWUpKSB7XG4gICAgcmV0dXJuIE5BTjtcbiAgfVxuICBpZiAoaXNPYmplY3QodmFsdWUpKSB7XG4gICAgdmFyIG90aGVyID0gdHlwZW9mIHZhbHVlLnZhbHVlT2YgPT0gJ2Z1bmN0aW9uJyA/IHZhbHVlLnZhbHVlT2YoKSA6IHZhbHVlO1xuICAgIHZhbHVlID0gaXNPYmplY3Qob3RoZXIpID8gKG90aGVyICsgJycpIDogb3RoZXI7XG4gIH1cbiAgaWYgKHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykge1xuICAgIHJldHVybiB2YWx1ZSA9PT0gMCA/IHZhbHVlIDogK3ZhbHVlO1xuICB9XG4gIHZhbHVlID0gdmFsdWUucmVwbGFjZShyZVRyaW0sICcnKTtcbiAgdmFyIGlzQmluYXJ5ID0gcmVJc0JpbmFyeS50ZXN0KHZhbHVlKTtcbiAgcmV0dXJuIChpc0JpbmFyeSB8fCByZUlzT2N0YWwudGVzdCh2YWx1ZSkpXG4gICAgPyBmcmVlUGFyc2VJbnQodmFsdWUuc2xpY2UoMiksIGlzQmluYXJ5ID8gMiA6IDgpXG4gICAgOiAocmVJc0JhZEhleC50ZXN0KHZhbHVlKSA/IE5BTiA6ICt2YWx1ZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gdG9OdW1iZXI7XG4iLCIvKiBSRURVQ0VSICovXG5cbmV4cG9ydCBkZWZhdWx0IChzdGF0ZSA9IHt9LCB7IHR5cGUsIHRhZywgaW5pdGlhbCwgbkFsdHMgfSkgPT4ge1xuICBzd2l0Y2ggKHR5cGUpIHtcbiAgICBjYXNlICduZXh0QWx0Jzoge1xuICAgICAgY29uc3QgeyBbdGFnXTogb2xkQWx0ID0gKGluaXRpYWwgfHwgMCkgfSA9IHN0YXRlXG4gICAgICBjb25zdCBuZXdBbHQgPSAob2xkQWx0ICsgMSkgJSBuQWx0c1xuICAgICAgcmV0dXJuIHsgLi4uc3RhdGUsIFt0YWddOiBuZXdBbHQgfVxuICAgIH1cbiAgICBkZWZhdWx0OiByZXR1cm4gc3RhdGVcbiAgfVxufVxuXG4vKiBTRUxFQ1RPUlMgKi9cblxuZXhwb3J0IGNvbnN0IGdldEFsdCA9ICh7IGFsdGVyIH0sIHsgdGFnLCBpbml0aWFsIH0pID0+IHtcbiAgY29uc3QgeyBbdGFnXTogYWx0ID0gaW5pdGlhbCB8fCAwIH0gPSBhbHRlclxuICByZXR1cm4geyBhbHQgfVxufVxuXG4vKiBBQ1RJT05TICovXG4vKlxuICogQWN0aW9ucyBhcmUgZGlzcGF0Y2ggaW4gdGhlIHByb2Nlc3Mgb2YgZmV0Y2hpbmcgZGF0YSBmcm9tIHRoZSBzZXJ2ZXJcbiAqL1xuXG5leHBvcnQgY29uc3QgbmV4dEFsdCA9ICh0YWcsIG5BbHRzLCBpbml0aWFsKSA9PiAoeyB0eXBlOiAnbmV4dEFsdCcsIHRhZywgbkFsdHMsIGluaXRpYWwgfSlcblxuLyogSEVMUEVSUyAqL1xuXG5cbiIsIi8qIFJFRFVDRVIgKi9cblxuZXhwb3J0IGRlZmF1bHQgKHN0YXRlID0ge30sIHsgdHlwZSwgcGF0aCwgZGF0YSB9KSA9PiB7XG4gIHN3aXRjaCAodHlwZSkge1xuICAgIGNhc2UgJ2ZldGNoRG9jJzoge1xuICAgICAgaWYgKGRhdGEgPT0gbnVsbCkge3JldHVybiB7IC4uLnN0YXRlLCBbcGF0aF06IG51bGwgfX1cbiAgICAgIHJldHVybiB7IC4uLnN0YXRlLCBbcGF0aF06IGRhdGEgfVxuICAgIH1cbiAgICBkZWZhdWx0OiByZXR1cm4gc3RhdGVcbiAgfVxufVxuXG4vKiBTRUxFQ1RPUlMgKi9cblxuZXhwb3J0IGNvbnN0IGdldERvYyA9ICh7IGRvYyB9LCB7IGRvY0RpciwgZG9jTmFtZSwgZG9jRXh0IH0pID0+IHtcbiAgcmV0dXJuIHsgZGF0YTogZG9jW2Ake2RvY0Rpcn0vJHtkb2NOYW1lfS4ke2RvY0V4dH1gXSB9XG59XG5cbi8qIEFDVElPTlMgKi9cbi8qXG4gKiBBY3Rpb25zIGFyZSBkaXNwYXRjaCBpbiB0aGUgcHJvY2VzcyBvZiBmZXRjaGluZyBkYXRhIGZyb20gdGhlIHNlcnZlclxuICovXG5cbi8qIEhFTFBFUlMgKi9cblxuIiwiaW1wb3J0IG1lbW9CaW5kIGZyb20gJ21lbW9CaW5kLmpzJ1xuXG4vKiBSRURVQ0VSICovXG5cbmV4cG9ydCBkZWZhdWx0IChzdGF0ZT17XG4gIGZpbHRlclNldHRpbmdzOiB7fSxcbiAgaW5pdGlhbGl6ZWQ6IGZhbHNlLFxufSwgeyB0eXBlLCBmaWx0ZXJJZCwgZGF0YSwgLi4ucmVzdCB9KSA9PiB7XG4gIHN3aXRjaCAodHlwZSkge1xuICAgIGNhc2UgJ3NldHVwRmlsdGVyaW5nJzoge1xuICAgICAgcmV0dXJuIHsgLi4uc3RhdGUsIC4uLnJlc3QsIGluaXRpYWxpemVkOiB0cnVlIH1cbiAgICB9XG4gICAgY2FzZSAnZnVsbHRleHQnOiB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgZmlsdGVyU2V0dGluZ3M6IHtcbiAgICAgICAgICAuLi5zdGF0ZS5maWx0ZXJTZXR0aW5ncyxcbiAgICAgICAgICBbZmlsdGVySWRdOiBkYXRhLFxuICAgICAgICB9LFxuICAgICAgfVxuICAgIH1cbiAgICBjYXNlICdmYWNldEFsbCc6IHtcbiAgICAgIGNvbnN0IHNhbWVTZXR0aW5ncyA9IHt9XG4gICAgICBPYmplY3Qua2V5cyhzdGF0ZS5maWx0ZXJTZXR0aW5nc1tmaWx0ZXJJZF0pLmZvckVhY2godmFsdWVJZCA9PiB7c2FtZVNldHRpbmdzW3ZhbHVlSWRdID0gZGF0YX0pXG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgZmlsdGVyU2V0dGluZ3M6IHtcbiAgICAgICAgICAuLi5zdGF0ZS5maWx0ZXJTZXR0aW5ncyxcbiAgICAgICAgICBbZmlsdGVySWRdOiBzYW1lU2V0dGluZ3MsXG4gICAgICAgIH0sXG4gICAgICB9XG4gICAgfVxuICAgIGNhc2UgJ2ZhY2V0Jzoge1xuICAgICAgY29uc3QgW3ZhbHVlSWQsIGZpbHRlclNldHRpbmddID0gZGF0YVxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgIGZpbHRlclNldHRpbmdzOiB7XG4gICAgICAgICAgLi4uc3RhdGUuZmlsdGVyU2V0dGluZ3MsXG4gICAgICAgICAgW2ZpbHRlcklkXToge1xuICAgICAgICAgICAgLi4uc3RhdGUuZmlsdGVyU2V0dGluZ3NbZmlsdGVySWRdLFxuICAgICAgICAgICAgW3ZhbHVlSWRdOiBmaWx0ZXJTZXR0aW5nLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9XG4gICAgfVxuICAgIGRlZmF1bHQ6IHJldHVybiBzdGF0ZVxuICB9XG59XG5cbi8qIFNFTEVDVE9SUyAqL1xuXG5leHBvcnQgY29uc3QgZ2V0RmlsdGVyU2V0dGluZyA9ICh7IGZpbHRlcjogeyBmaWx0ZXJTZXR0aW5ncyB9IH0sIHsgZmlsdGVySWQgfSkgPT4gKHtcbiAgZmlsdGVyU2V0dGluZzogZmlsdGVyU2V0dGluZ3NbZmlsdGVySWRdLFxufSlcblxuZXhwb3J0IGNvbnN0IGdldEZpZWxkVmFsdWVzID0gKHsgdGFibGVzIH0sIHsgdGFibGUsIGZpbHRlckZpZWxkIH0pID0+ICh7XG4gIGZpZWxkVmFsdWVzOiBtZW1vQmluZChmQ0MsICdjb21waWxlRmlsdGVyaW5nJywgW3RhYmxlXSwgW3RhYmxlc10pW2ZpbHRlckZpZWxkXVxufSlcblxuZXhwb3J0IGNvbnN0IGdldEZpbHRlckFwcGxpZWQgPSAoeyB0YWJsZXMsIGZpbHRlcjogeyBmaWx0ZXJTZXR0aW5ncywgaW5pdGlhbGl6ZWQgfSB9LCB7IHRhYmxlIH0pID0+IHtcbiAgY29uc3QgZmllbGRWYWx1ZXMgPSBtZW1vQmluZChmQ0MsICdjb21waWxlRmlsdGVyaW5nJywgW3RhYmxlXSwgW3RhYmxlc10pXG4gIGlmIChpbml0aWFsaXplZCkge1xuICAgIHJldHVybiB7XG4gICAgICB0YWJsZXMsXG4gICAgICBpbml0aWFsaXplZCxcbiAgICAgIGZpZWxkVmFsdWVzLFxuICAgICAgZmlsdGVyU2V0dGluZ3MsXG4gICAgICAuLi5jb21wdXRlRmlsdGVyaW5nKHRhYmxlLCB0YWJsZXMsIGZpZWxkVmFsdWVzLCBmaWx0ZXJTZXR0aW5ncyksXG4gICAgfVxuICB9XG4gIGVsc2Uge1xuICAgIHJldHVybiB7XG4gICAgICB0YWJsZXMsXG4gICAgICBpbml0aWFsaXplZCxcbiAgICAgIGZpZWxkVmFsdWVzLFxuICAgIH1cbiAgfVxufVxuXG4vKiBBQ1RJT05TICovXG5cbmV4cG9ydCBjb25zdCBjaGFuZ2VGdWxsdGV4dCA9IChmaWx0ZXJJZCwgc2VhcmNoU3RyaW5nKSA9PiAoeyB0eXBlOiAnZnVsbHRleHQnLCBmaWx0ZXJJZCwgZGF0YTogc2VhcmNoU3RyaW5nIH0pXG5leHBvcnQgY29uc3QgY2hhbmdlRmFjZXQgPSAoZmlsdGVySWQsIHZhbHVlSWQsIG9uT2ZmKSA9PiAoeyB0eXBlOiAnZmFjZXQnLCBmaWx0ZXJJZCwgZGF0YTogW3ZhbHVlSWQsIG9uT2ZmXSB9KVxuZXhwb3J0IGNvbnN0IGNoYW5nZUZhY2V0QWxsID0gKGZpbHRlcklkLCBvbk9mZikgPT4gKHsgdHlwZTogJ2ZhY2V0QWxsJywgZmlsdGVySWQsIGRhdGE6IG9uT2ZmIH0pXG5cbmV4cG9ydCBjb25zdCBzZXR1cEZpbHRlcmluZyA9ICh0YWJsZSwgdGFibGVzKSA9PiBkaXNwYXRjaCA9PiB7XG4gIGNvbnN0IGZpZWxkVmFsdWVzID0gbWVtb0JpbmQoZkNDLCAnY29tcGlsZUZpbHRlcmluZycsIFt0YWJsZV0sIFt0YWJsZXNdKVxuICBjb25zdCBmaWx0ZXJTZXR0aW5ncyA9IG1lbW9CaW5kKGZDQywgJ2luaXRGaWx0ZXJpbmcnLCBbdGFibGVdLCBbdGFibGVzLCBmaWVsZFZhbHVlc10pXG4gIGRpc3BhdGNoKHsgdHlwZTogJ3NldHVwRmlsdGVyaW5nJywgZmlsdGVyU2V0dGluZ3MgfSlcbn1cblxuLyogSEVMUEVSUyAqL1xuXG5jbGFzcyBGaWx0ZXJDb21waWxlQ2FjaGUge1xuICBjb21waWxlRmlsdGVyaW5nID0gKHRhYmxlLCB0YWJsZXMpID0+IHtcbiAgICBjb25zdCB7IFt0YWJsZV06IHsgZW50aXRpZXMsIG9yZGVyLCBmaWVsZHMsIGZpbHRlckxpc3QgfSB9ID0gdGFibGVzXG4gICAgY29uc3QgcHJlc2VudEZpbHRlckxpc3QgPSBmaWx0ZXJMaXN0LmZpbHRlcih4ID0+IGZpZWxkc1t4LmZpZWxkXSlcbiAgICBjb25zdCBmaWx0ZXJGaWVsZHMgPSBwcmVzZW50RmlsdGVyTGlzdC5maWx0ZXIoeCA9PiB4LnR5cGUgIT09ICdGdWxsVGV4dCcpLm1hcCh4ID0+IHguZmllbGQpXG4gICAgY29uc3QgZmllbGRWYWx1ZXMgPSB7fVxuICAgIGZvciAoY29uc3QgZiBvZiBmaWx0ZXJGaWVsZHMpIHtcbiAgICAgIGZpZWxkVmFsdWVzW2ZdID0ge1snJ106ICctbm9uZS0nfVxuICAgIH1cbiAgICBmb3IgKGNvbnN0IGVJZCBvZiBvcmRlcikge1xuICAgICAgY29uc3QgZW50aXR5ID0gZW50aXRpZXNbZUlkXVxuICAgICAgZm9yIChjb25zdCBmaWVsZCBvZiBmaWx0ZXJGaWVsZHMpIHtcbiAgICAgICAgY29uc3QgZkZpZWxkVmFsdWVzID0gZmllbGRWYWx1ZXNbZmllbGRdXG4gICAgICAgIGNvbnN0IHsgdmFsdWVzOiB7IFtmaWVsZF06IGVmVmFsdWUgfSB9ID0gZW50aXR5XG4gICAgICAgIGlmIChlZlZhbHVlICE9IG51bGwgJiYgZWZWYWx1ZS5sZW5ndGggIT09IDApIHtcbiAgICAgICAgICBmb3IgKGNvbnN0IHtfaWQ6IHZhbHVlSWQsIHZhbHVlOiB2YWx1ZVJlcH0gb2YgZWZWYWx1ZSkge1xuICAgICAgICAgICAgZkZpZWxkVmFsdWVzW3ZhbHVlSWRdID0gdmFsdWVSZXBcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZpZWxkVmFsdWVzXG4gIH1cbiAgaW5pdEZpbHRlcmluZyA9ICh0YWJsZSwgdGFibGVzLCBmaWVsZFZhbHVlcykgPT4ge1xuICAgIGNvbnN0IHsgW3RhYmxlXTogeyBlbnRpdGllcywgb3JkZXIsIGZpZWxkcywgZmlsdGVyTGlzdCB9IH0gPSB0YWJsZXNcbiAgICBjb25zdCBwcmVzZW50RmlsdGVyTGlzdCA9IGZpbHRlckxpc3QuZmlsdGVyKHggPT4gZmllbGRzW3guZmllbGRdKVxuICAgIGNvbnN0IGZpbHRlclNldHRpbmdzID0ge31cbiAgICBwcmVzZW50RmlsdGVyTGlzdC5mb3JFYWNoKChmaWx0ZXJTcGVjLCBmaWx0ZXJJZCkgPT4ge1xuICAgICAgaWYgKGZpbHRlclNwZWMudHlwZSA9PSAnRnVsbFRleHQnKSB7XG4gICAgICAgIGZpbHRlclNldHRpbmdzW2ZpbHRlcklkXSA9ICcnXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgY29uc3QgZmFjZXRzID0ge31cbiAgICAgICAgT2JqZWN0LmtleXMoZmllbGRWYWx1ZXNbZmlsdGVyU3BlYy5maWVsZF0pLmZvckVhY2godmFsdWVJZCA9PiB7ZmFjZXRzW3ZhbHVlSWRdID0gdHJ1ZX0pXG4gICAgICAgIGZpbHRlclNldHRpbmdzW2ZpbHRlcklkXSA9IGZhY2V0c1xuICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuIGZpbHRlclNldHRpbmdzXG4gIH1cbn1cbmNvbnN0IGZDQyA9IG5ldyBGaWx0ZXJDb21waWxlQ2FjaGUoKVxuXG5jb25zdCBjb21wdXRlRmlsdGVyaW5nID0gKHRhYmxlLCB0YWJsZXMsIGZpZWxkVmFsdWVzLCBmaWx0ZXJTZXR0aW5ncykgPT4ge1xuICBjb25zdCB7IFt0YWJsZV06IHsgZW50aXRpZXMsIG9yZGVyLCBmaWVsZHMsIGZpbHRlckxpc3QgfSB9ID0gdGFibGVzXG4gIGNvbnN0IHByZXNlbnRGaWx0ZXJMaXN0ID0gZmlsdGVyTGlzdC5maWx0ZXIoeCA9PiBmaWVsZHNbeC5maWVsZF0pXG4gIGNvbnN0IGZpbHRlckNoZWNrcyA9IHt9XG4gIGNvbnN0IG90aGVyRmlsdGVyZWREYXRhID0ge31cbiAgcHJlc2VudEZpbHRlckxpc3QuZm9yRWFjaCgoZmlsdGVyU3BlYywgZmlsdGVySWQpID0+IHtcbiAgICBmaWx0ZXJDaGVja3NbZmlsdGVySWRdID0gKGZpbHRlclNwZWMudHlwZSA9PT0gJ0Z1bGxUZXh0JyA/IGZ1bGx0ZXh0Q2hlY2sgOiBmYWNldENoZWNrKShmaWx0ZXJTcGVjLmZpZWxkLCBmaWx0ZXJTZXR0aW5nc1tmaWx0ZXJJZF0pXG4gICAgb3RoZXJGaWx0ZXJlZERhdGFbZmlsdGVySWRdID0gW11cbiAgfSlcbiAgY29uc3QgZmlsdGVyZWREYXRhID0gW11cblxuICBmb3IgKGNvbnN0IGVJZCBvZiBvcmRlcikge1xuICAgIGNvbnN0IGVudGl0eSA9IGVudGl0aWVzW2VJZF1cbiAgICBsZXQgdGhlT25lRmFpbCA9IG51bGxcbiAgICBsZXQgdiA9IHRydWVcbiAgICBsZXQgZGlzY2FyZCA9IGZhbHNlXG4gICAgT2JqZWN0LmVudHJpZXMoZmlsdGVyQ2hlY2tzKS5mb3JFYWNoKChbZmlsdGVySWQsIGZpbHRlckNoZWNrXSkgPT4ge1xuICAgICAgaWYgKCFkaXNjYXJkKSB7XG4gICAgICAgIGNvbnN0IHBhc3MgPSBmaWx0ZXJDaGVjayhlbnRpdHkpXG4gICAgICAgIGlmICghcGFzcykge1xuICAgICAgICAgIHYgPSBmYWxzZVxuICAgICAgICAgIGlmICh0aGVPbmVGYWlsID09PSBudWxsKSB7XG4gICAgICAgICAgICB0aGVPbmVGYWlsID0gZmlsdGVySWRcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBkaXNjYXJkID0gdHJ1ZVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pXG4gICAgaWYgKCFkaXNjYXJkKSB7XG4gICAgICBjb25zdCB7IHZhbHVlczogeyBfaWQgfSB9ID0gZW50aXR5XG4gICAgICBpZiAodikge1xuICAgICAgICBmaWx0ZXJlZERhdGEucHVzaChfaWQpXG4gICAgICAgIHByZXNlbnRGaWx0ZXJMaXN0LmZvckVhY2goKGZpbHRlclNwZWMsIGZpbHRlcklkKSA9PiB7XG4gICAgICAgICAgb3RoZXJGaWx0ZXJlZERhdGFbZmlsdGVySWRdLnB1c2goX2lkKVxuICAgICAgICB9KVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIG90aGVyRmlsdGVyZWREYXRhW3RoZU9uZUZhaWxdLnB1c2goX2lkKVxuICAgICAgfVxuICAgIH1cbiAgfVxuICBjb25zdCBhbW91bnRzID0ge31cbiAgcHJlc2VudEZpbHRlckxpc3QuZm9yRWFjaCgoeyBmaWVsZCwgdHlwZSB9LCBmaWx0ZXJJZCkgPT4ge1xuICAgIGFtb3VudHNbZmlsdGVySWRdID0gdHlwZSA9PT0gJ0Z1bGxUZXh0JyA/IG51bGwgOiBjb3VudEZhY2V0cyhmaWVsZCwgZmllbGRWYWx1ZXNbZmllbGRdLCBvdGhlckZpbHRlcmVkRGF0YVtmaWx0ZXJJZF0sIGVudGl0aWVzKVxuICB9KVxuICBjb25zdCBmaWx0ZXJlZEFtb3VudE90aGVycyA9IHt9XG4gIE9iamVjdC5lbnRyaWVzKG90aGVyRmlsdGVyZWREYXRhKS5mb3JFYWNoKChbZmlsdGVySWQsIHhdKSA9PiB7ZmlsdGVyZWRBbW91bnRPdGhlcnNbZmlsdGVySWRdID0geC5sZW5ndGh9KVxuICByZXR1cm4ge1xuICAgIGZpbHRlcmVkRGF0YSxcbiAgICBmaWx0ZXJlZEFtb3VudE90aGVycyxcbiAgICBhbW91bnRzLFxuICB9XG59XG5cbmNvbnN0IGZ1bGx0ZXh0Q2hlY2sgPSAoZmllbGQsIHRlcm0pID0+IHtcbiAgY29uc3Qgc2VhcmNoID0gdGVybS50b0xvd2VyQ2FzZSgpXG4gIGlmIChzZWFyY2ggPT0gbnVsbCB8fCBzZWFyY2ggPT0gJycpIHtcbiAgICByZXR1cm4gKCkgPT4gdHJ1ZVxuICB9XG4gIHJldHVybiBlbnRpdHkgPT4ge1xuICAgIGxldCB7IHZhbHVlczogeyBbZmllbGRdOiB2YWwgfSB9ID0gZW50aXR5XG4gICAgdmFsID0gKHZhbCAhPSBudWxsKSA/IHZhbFswXSA6IHZhbFxuICAgIHJldHVybiB2YWwgIT0gbnVsbCAmJiB2YWwudG9Mb3dlckNhc2UoKS5pbmRleE9mKHNlYXJjaCkgIT09IC0xXG4gIH1cbn1cblxuY29uc3QgZmFjZXRDaGVjayA9IChmaWVsZCwgZmFjZXRTZXR0aW5ncykgPT4ge1xuICBpZiAoZmFjZXRTZXR0aW5ncy5zaXplID09PSAwKSB7XG4gICAgcmV0dXJuICgpID0+IGZhbHNlXG4gIH1cbiAgcmV0dXJuIGVudGl0eSA9PiB7XG4gICAgY29uc3QgeyB2YWx1ZXM6IHsgW2ZpZWxkXTogZmllbGRWYWxzIH0gfSA9IGVudGl0eVxuICAgIGlmIChmaWVsZFZhbHMgPT0gbnVsbCB8fCBmaWVsZFZhbHMubGVuZ3RoID09IDApIHtcbiAgICAgIHJldHVybiBmYWNldFNldHRpbmdzWycnXVxuICAgIH1cbiAgICBmb3IgKGNvbnN0IHtfaWQ6IHZhbHVlSWR9IG9mIGZpZWxkVmFscykge1xuICAgICAgaWYgKGZhY2V0U2V0dGluZ3NbdmFsdWVJZF0pIHtcbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cbn1cblxuY29uc3QgY291bnRGYWNldHMgPSAoZmllbGQsIGZpZWxkVmFsdWVzLCBmaWx0ZXJlZERhdGEsIGVudGl0aWVzKSA9PiB7XG4gIGNvbnN0IGZhY2V0QW1vdW50cyA9IHt9XG4gIE9iamVjdC5rZXlzKGZpZWxkVmFsdWVzKS5mb3JFYWNoKHZhbHVlSWQgPT4ge1xuICAgIGZhY2V0QW1vdW50c1t2YWx1ZUlkXSA9IDBcbiAgfSlcbiAgZm9yIChjb25zdCBlSWQgb2YgZmlsdGVyZWREYXRhKSB7XG4gICAgY29uc3QgeyB2YWx1ZXM6IHsgW2ZpZWxkXTogZmllbGRWYWxzIH0gfSA9IGVudGl0aWVzW2VJZF1cbiAgICBpZiAoZmllbGRWYWxzID09IG51bGwgfHwgZmllbGRWYWxzLmxlbmd0aCA9PSAwKSB7XG4gICAgICBmYWNldEFtb3VudHNbJyddICs9IDFcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICBmb3IgKGNvbnN0IHtfaWQ6IHZhbHVlSWR9IG9mIGZpZWxkVmFscykge1xuICAgICAgICBmYWNldEFtb3VudHNbdmFsdWVJZF0gKz0gMVxuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gZmFjZXRBbW91bnRzXG59XG5cbmV4cG9ydCBjb25zdCBwbGFjZUZhY2V0cyA9IChmaWVsZFZhbHVlcywgbWF4Q29scykgPT4ge1xuICBpZiAoZmllbGRWYWx1ZXMgPT0gbnVsbCkge3JldHVybiBbXX1cbiAgY29uc3QgZmFjZXRzID0gT2JqZWN0LmVudHJpZXMoZmllbGRWYWx1ZXMpLnNvcnQoKHgsIHkpID0+IHhbMV0ubG9jYWxlQ29tcGFyZSh5WzFdKSlcbiAgaWYgKGZhY2V0cy5sZW5ndGggPT0gMCkge3JldHVybiBbXX1cbiAgY29uc3Qgcm93cyA9IFtdXG4gIGNvbnN0IHsgbGVuZ3RoOiBsZiB9ID0gZmFjZXRzXG4gIGNvbnN0IG5yb3dzID0gTWF0aC5mbG9vcihsZiAvIG1heENvbHMpICsgKChsZiAlIG1heENvbHMpID8gMSA6IDApXG4gIGNvbnN0IG5jb2xzID0gTWF0aC5mbG9vcihsZiAvIG5yb3dzKSArICgobGYgJSBucm93cykgPyAxIDogMClcbiAgZm9yIChsZXQgciA9IDA7IHIgPCBucm93czsgcisrKSB7XG4gICAgY29uc3Qgcm93ID0gW11cbiAgICBmb3IgKGxldCBjID0gMDsgYyA8IG5jb2xzOyBjKyspIHtcbiAgICAgIGNvbnN0IGYgPSBucm93cyAqIGMgKyByXG4gICAgICByb3cucHVzaCgoZiA8IGxmKSA/IGZhY2V0c1tmXSA6IG51bGwpXG4gICAgfVxuICAgIHJvd3MucHVzaChyb3cpXG4gIH1cbiAgcmV0dXJuIHJvd3Ncbn1cblxuZXhwb3J0IGNvbnN0IHRlc3RBbGxDaGVja3MgPSBmaWx0ZXJTZXR0aW5ncyA9PiB7XG4gIGxldCBhbGxUcnVlID0gdHJ1ZVxuICBsZXQgYWxsRmFsc2UgPSB0cnVlXG4gIGZvciAoY29uc3QgW3ZhbHVlSWQsIHZhbHVlUmVwXSBvZiBPYmplY3QuZW50cmllcyhmaWx0ZXJTZXR0aW5ncykpIHtcbiAgICBpZiAodmFsdWVSZXApIHthbGxGYWxzZSA9IGZhbHNlfVxuICAgIGVsc2Uge2FsbFRydWUgPSBmYWxzZX1cbiAgfVxuICByZXR1cm4geyBhbGxUcnVlLCBhbGxGYWxzZSB9XG59XG5cbiIsIi8qIFJFRFVDRVIgKi9cblxuZXhwb3J0IGRlZmF1bHQgKHN0YXRlID0ge30sIHsgdHlwZSwgcGF0aCwgZGF0YSB9KSA9PiB7XG4gIHN3aXRjaCAodHlwZSkge1xuICAgIGNhc2UgJ2ZldGNoTWUnOiB7XG4gICAgICBpZiAoZGF0YSA9PSBudWxsKSB7cmV0dXJuIHt9fVxuICAgICAgcmV0dXJuIHsgLi4uZGF0YSB9XG4gICAgfVxuICAgIGRlZmF1bHQ6IHJldHVybiBzdGF0ZVxuICB9XG59XG5cbi8qIFNFTEVDVE9SUyAqL1xuXG5leHBvcnQgY29uc3QgZ2V0TWUgPSAoeyBtZSB9KSA9PiAoeyBtZSB9KVxuXG4vKiBBQ1RJT05TICovXG4vKlxuICogQWN0aW9ucyBhcmUgZGlzcGF0Y2ggaW4gdGhlIHByb2Nlc3Mgb2YgZmV0Y2hpbmcgZGF0YSBmcm9tIHRoZSBzZXJ2ZXJcbiAqL1xuXG4vKiBIRUxQRVJTICovXG5cbiIsIi8qIFJFRFVDRVIgKi9cblxuZXhwb3J0IGRlZmF1bHQgKHN0YXRlID0ge30sIHsgdHlwZSwgZGVzYywgc3RhdHVzLCBtc2dzIH0pID0+IHtcbiAgc3dpdGNoICh0eXBlKSB7XG4gICAgY2FzZSAnbm90aWZ5Jzoge1xuICAgICAgc3dpdGNoIChzdGF0dXMpIHtcbiAgICAgICAgY2FzZSAncGVuZGluZycsICdzdWNjZXNzJzoge1xuICAgICAgICAgIHJldHVybiB7IC4uLnN0YXRlLCBbZGVzY106IHsgc3RhdHVzIH0gfVxuICAgICAgICB9XG4gICAgICAgIGNhc2UgJ2Vycm9yJzoge1xuICAgICAgICAgIHJldHVybiB7IC4uLnN0YXRlLCBbZGVzY106IHsgc3RhdHVzLCBtc2dzIH0gfVxuICAgICAgICB9XG4gICAgICAgIGRlZmF1bHQ6IHJldHVybiBzdGF0ZVxuICAgICAgfVxuICAgIH1cbiAgICBkZWZhdWx0OiByZXR1cm4gc3RhdGVcbiAgfVxufVxuXG4vKiBTRUxFQ1RPUlMgKi9cblxuZXhwb3J0IGNvbnN0IGdldE5vdGlmeSA9ICh7IG5vdGlmeSB9KSA9PiAoeyBub3RpZnkgfSlcblxuLyogQUNUSU9OUyAqL1xuXG5leHBvcnQgY29uc3QgYXNrID0gICAgIChkZXNjKSAgICAgICA9PiAoeyB0eXBlOiAnbm90aWZ5Jywgc3RhdHVzOiAncGVuZGluZycsIGRlc2MgfSlcbmV4cG9ydCBjb25zdCBlcnIgPSAgICAgKGRlc2MsIGRhdGEpID0+ICh7IHR5cGU6ICdub3RpZnknLCBzdGF0dXM6ICdlcnJvcicsICAgZGVzYywgbXNnczogZGF0YSB9KVxuZXhwb3J0IGNvbnN0IHN1Y2NlZWQgPSAoZGVzYykgICAgICAgPT4gKHsgdHlwZTogJ25vdGlmeScsIHN0YXR1czogJ3N1Y2Nlc3MnLCBkZXNjIH0pXG5cbi8qIEhFTFBFUlMgKi9cblxuIiwiaW1wb3J0IHsgY29tYmluZVJlZHVjZXJzIH0gZnJvbSAncmVkdXgnXG5pbXBvcnQgd2luIGZyb20gJ3dpbi5qcydcbmltcG9ydCBub3RpZnkgZnJvbSAnbm90aWZ5LmpzJ1xuaW1wb3J0IGRvYyBmcm9tICdkb2MuanMnXG5pbXBvcnQgdGFibGVzIGZyb20gJ3RhYmxlcy5qcydcbmltcG9ydCBtZSBmcm9tICdtZS5qcydcbmltcG9ydCBmaWx0ZXIgZnJvbSAnZmlsdGVyLmpzJ1xuaW1wb3J0IGFsdGVyIGZyb20gJ2FsdGVyLmpzJ1xuXG4vKiBST09UIFJFRFVDRVIgKi9cblxuZXhwb3J0IGRlZmF1bHQgY29tYmluZVJlZHVjZXJzKHtcbiAgd2luLFxuICBub3RpZnksXG4gIGRvYyxcbiAgdGFibGVzLFxuICBtZSxcbiAgZmlsdGVyLFxuICBhbHRlcixcbn0pXG5cbi8qIFNFTEVDVE9SUyAqL1xuLypcbiAqIENvbWJpbmUgc2V2ZXJhbCBzZWxlY3RvcnNcbiAqL1xuXG5leHBvcnQgY29uc3QgY29tYmluZVNlbGVjdG9ycyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gKHN0YXRlLCBwcm9wcykgPT4ge1xuICAgIGNvbnN0IHJlc3VsdCA9IHt9XG4gICAgZm9yIChjb25zdCBzZWxlY3RvciBvZiBhcmd1bWVudHMpIHtcbiAgICAgIE9iamVjdC5hc3NpZ24ocmVzdWx0LCBzZWxlY3RvcihzdGF0ZSwgcHJvcHMpKVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0XG4gIH1cbn1cbiIsImltcG9ydCAnd2hhdHdnLWZldGNoJ1xuXG5pbXBvcnQgeyBhc2ssIGVyciwgc3VjY2VlZCB9IGZyb20gJ25vdGlmeS5qcydcblxuY29uc3Qgcm9vdFVybCA9ICcvYXBpLydcblxuLyogUkVEVUNFUiAqL1xuLypcbiAqIG5vIGRlZGljYXRlZCByZWR1Y2VyLlxuICogUmVzdWx0cyBvZiBhY3Rpb25zIHdpbGwgYmUgcmVkdWNlZCBieSBkZWRpY2F0ZWQgcmVkdWNlcnMuXG4gKi9cblxuLyogU0VMRUNUT1JTICovXG4vKlxuICogbm8gZGVkaWNhdGVkIHNlbGVjdG9ycy5cbiAqIFNlZSB0aGUgc2VsZWN0b3JzIGNvcnJlc3BvbmRpbmcgdG8gdGhlIGRlZGljYXRlZCByZWR1Y2Vycy5cbiAqL1xuXG4vKiBBQ1RJT05TICovXG4vKlxuICogR2VuZXJpYyBhY3Rpb24gdG8gZmV0Y2ggZGF0YSBmcm9tIHRoZSBzZXJ2ZXIuXG4gKiBUaGUgcXVlcnkgaXMgY29uZmlndXJlZCBieSB0aGUgdGFzayBvYmplY3QuXG4gKiBJdCBjYW4gYmUgdXNlZCBmb3IgZGF0YWJhc2UgcXVlcmllcyBvciBmaWxlIGNvbnRlbnQuXG4gKiBEdXJpbmcgcmVxdWVzdCwgbm90aWZ5IGFjdGlvbnMgd2lsbCBiZSBkaXNwYXRjaGVkLlxuICovXG5cbmV4cG9ydCBjb25zdCBmZXRjaERhdGEgPSB0YXNrID0+IGRpc3BhdGNoID0+IHtcbiAgY29uc3QgeyB0eXBlLCBwYXRoLCBjb250ZW50VHlwZSB9ID0gdGFza1xuICBkaXNwYXRjaChhc2sodGFzaykpXG4gIGRpc3BhdGNoKHsgLi4udGFzaywgZGF0YTogbnVsbCB9KVxuXG4gIGNvbnN0IHNldHRpbmdzID0ge2NyZWRlbnRpYWxzOiAnc2FtZS1vcmlnaW4nfVxuICBmZXRjaChgJHtyb290VXJsfSR7Y29udGVudFR5cGV9JHtwYXRofWAsIHNldHRpbmdzKVxuICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXG4gIC50aGVuKGpzb24gPT4ge1xuICAgIGNvbnN0IHsgbXNncywgZ29vZCwgZGF0YSB9ID0ganNvblxuICAgIGlmIChnb29kKSB7XG4gICAgICBkaXNwYXRjaChzdWNjZWVkKHRhc2spKVxuICAgICAgZGlzcGF0Y2goeyAuLi50YXNrLCBkYXRhIH0pXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgZGlzcGF0Y2goZXJyKHRhc2ssIG1zZ3MpKVxuICAgIH1cbiAgfSlcbiAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgIGNvbnNvbGUuZXJyKGVycm9yKVxuICAgICAgZGlzcGF0Y2goZXJyKHRhc2ssIFt7a2luZDogJ2Vycm9yJywgdGV4dDogZXJyb3J9XSkpXG4gIH0pXG59XG5cbi8qIEhFTFBFUlMgKi9cblxuIiwiLyogUkVEVUNFUiAqL1xuXG5leHBvcnQgZGVmYXVsdCAoc3RhdGU9e30sIHsgdHlwZSwgcGF0aCwgZGF0YSwgdGFibGUgfSkgPT4ge1xuICBzd2l0Y2ggKHR5cGUpIHtcbiAgICBjYXNlICdmZXRjaFRhYmxlJzoge1xuICAgICAgaWYgKGRhdGEgPT0gbnVsbCkge3JldHVybiB7IC4uLnN0YXRlLCBbdGFibGVdOiBudWxsIH19XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgW3RhYmxlXTogZGF0YSxcbiAgICAgIH1cbiAgICB9XG4gICAgY2FzZSAnZmV0Y2hUYWJsZU15Jzoge1xuICAgICAgaWYgKGRhdGEgPT0gbnVsbCkge1xuICAgICAgICBpZiAoc3RhdGVbdGFibGVdID09IG51bGwpIHsgcmV0dXJuIHsgLi4uc3RhdGUsIFt0YWJsZV06IG51bGwgfX1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgICBbdGFibGVdOiB7XG4gICAgICAgICAgICAuLi5zdGF0ZVt0YWJsZV0sXG4gICAgICAgICAgICBteTogbnVsbCxcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGNvbnN0IHsgZW50aXRpZXMsIG9yZGVyLCAuLi5yZXN0IH0gPSBkYXRhXG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgW3RhYmxlXToge1xuICAgICAgICAgIC4uLnN0YXRlW3RhYmxlXSxcbiAgICAgICAgICAuLi5yZXN0LFxuICAgICAgICAgIG15OiBvcmRlcixcbiAgICAgICAgICBlbnRpdGllczoge1xuICAgICAgICAgICAgLi4uKHN0YXRlW3RhYmxlXSB8fCB7fSkuZW50aXRpZXMsXG4gICAgICAgICAgICAuLi5lbnRpdGllcyxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfVxuICAgIH1cbiAgICBjYXNlICdmZXRjaEl0ZW0nOiB7XG4gICAgICBpZiAoZGF0YSA9PSBudWxsKSB7cmV0dXJuIHN0YXRlfVxuICAgICAgY29uc3QgeyB2YWx1ZXM6IHsgX2lkIH0gfSA9IGRhdGFcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLnN0YXRlLFxuICAgICAgICBbdGFibGVdOiB7XG4gICAgICAgICAgLi4uc3RhdGVbdGFibGVdLFxuICAgICAgICAgIGVudGl0aWVzOiB7XG4gICAgICAgICAgICAuLi5zdGF0ZVt0YWJsZV0uZW50aXRpZXMsXG4gICAgICAgICAgICBbX2lkXTogZGF0YSxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfVxuICAgIH1cbiAgICBkZWZhdWx0OiByZXR1cm4gc3RhdGVcbiAgfVxufVxuXG4vKiBTRUxFQ1RPUlMgKi9cblxuZXhwb3J0IGNvbnN0IGdldFRhYmxlcyA9ICh7IHRhYmxlcyB9KSA9PiAoeyB0YWJsZXMgfSlcblxuZXhwb3J0IGNvbnN0IGdldENvdW50cnkgPSAoeyB0YWJsZXM6IHsgY291bnRyeSB9IH0pID0+ICh7IGNvdW50cnkgfSlcblxuZXhwb3J0IGNvbnN0IGdldFVzZXIgPSAoeyB0YWJsZXM6IHsgdXNlciB9IH0pID0+ICh7IHVzZXIgfSlcblxuZXhwb3J0IGNvbnN0IGdldFRhYmxlRmlsdGVycyA9ICAoeyB0YWJsZXMgfSwgeyB0YWJsZSB9KSA9PiB7XG4gIGNvbnN0IHsgW3RhYmxlXTogeyBmaWVsZHMsIGZpbHRlckxpc3QgfSB9ID0gdGFibGVzXG4gIHJldHVybiB7IGZpZWxkcywgZmlsdGVyTGlzdCB9XG59XG5cbi8qIEFDVElPTlMgKi9cbi8qXG4gKiBBY3Rpb25zIGFyZSBkaXNwYXRjaCBpbiB0aGUgcHJvY2VzcyBvZiBmZXRjaGluZyBkYXRhIGZyb20gdGhlIHNlcnZlclxuICovXG5cbi8qIEhFTFBFUlMgKi9cblxuIiwiLyogUkVEVUNFUiAqL1xuXG5leHBvcnQgZGVmYXVsdCAoc3RhdGUgPSBpbml0V2luRGltKCksIHsgdHlwZSwgaGVpZ2h0LCB3aWR0aCB9KSA9PiB7XG4gIHN3aXRjaCAodHlwZSkge1xuICAgIGNhc2UgJ3dpbmRpbSc6IHtcbiAgICAgIHJldHVybiB7IGhlaWdodCwgd2lkdGggfVxuICAgIH1cbiAgICBkZWZhdWx0OiByZXR1cm4gc3RhdGVcbiAgfVxufVxuXG4vKiBBQ1RJT05TICovXG5cbmV4cG9ydCBjb25zdCBjaGFuZ2VXaW5EaW0gPSAoKSA9PiBkaXNwYXRjaCA9PiB7XG4gIGRpc3BhdGNoKHsgdHlwZTogJ3dpbmRpbScsIC4uLmluaXRXaW5EaW0oKSB9KVxufVxuXG4vKiBTRUxFQ1RPUlMgKi9cblxuZXhwb3J0IGNvbnN0IGdldFdpbkRpbSA9ICh7IHdpbjogeyBoZWlnaHQsIHdpZHRoIH0gfSkgPT4gKHsgaGVpZ2h0LCB3aWR0aCB9KVxuXG4vKiBIRUxQRVJTICovXG5cbmNvbnN0IGluaXRXaW5EaW0gPSAoKSA9PiB7XG4gIGNvbnN0IHsgaW5uZXJIZWlnaHQ6IGhlaWdodCwgaW5uZXJXaWR0aDogd2lkdGggfSA9IHdpbmRvd1xuICByZXR1cm4geyBoZWlnaHQsIHdpZHRoIH1cbn1cblxuY29uc3Qgc2Nyb2xsQmFyV2lkdGggPSA0MFxuY29uc3QgbGVmdE1hcmdpbiA9IDBcblxuY29uc3QgdG9wSGVpZ2h0ID0gNTBcbmNvbnN0IHRvcE1hcmdpbiA9IDVcblxuY29uc3QgZGl2V2lkdGhTcGVjID0ge1xuICBsZWZ0OiAxMjAsXG4gIHJpZ2h0TGVmdDogMzgwLFxuICByaWdodExlZnROYXY6IDE1MCxcbn1cblxuY29uc3QgZmxvYXRTcGVjID0ge1xuICBsZWZ0OiAnbGVmdCcsXG4gIHJpZ2h0OiAncmlnaHQnLFxuICByaWdodExlZnQ6ICdsZWZ0JyxcbiAgcmlnaHRMZWZ0TmF2OiAnbGVmdCcsXG4gIHJpZ2h0UmlnaHQ6ICdyaWdodCcsXG4gIHJpZ2h0UmlnaHRCb2R5OiAncmlnaHQnLFxufVxuXG5leHBvcnQgZnVuY3Rpb24gY29sdW1uU3R5bGUoa2luZCwgeyBoZWlnaHQsIHdpZHRoIH0pIHtcbiAgY29uc3QgZGl2SGVpZ2h0ID0ge1xuICAgIGxlZnQ6IGhlaWdodCAtIHRvcEhlaWdodCxcbiAgICByaWdodDogaGVpZ2h0IC0gdG9wSGVpZ2h0LFxuICAgIHJpZ2h0TGVmdDogaGVpZ2h0IC0gdG9wSGVpZ2h0IC0gdG9wTWFyZ2luLFxuICAgIHJpZ2h0TGVmdE5hdjogaGVpZ2h0IC0gdG9wSGVpZ2h0IC0gdG9wTWFyZ2luLFxuICAgIHJpZ2h0UmlnaHQ6IGhlaWdodCAtIHRvcEhlaWdodCAtIHRvcE1hcmdpbixcbiAgICByaWdodFJpZ2h0Qm9keTogaGVpZ2h0IC0gdG9wSGVpZ2h0IC0gdG9wTWFyZ2luLFxuICB9XG4gIGNvbnN0IHsgbGVmdCwgcmlnaHRMZWZ0LCByaWdodExlZnROYXYgfSA9IGRpdldpZHRoU3BlY1xuICBjb25zdCBkaXZXaWR0aCA9IHtcbiAgICAuLi5kaXZXaWR0aFNwZWMsXG4gICAgcmlnaHQ6IHdpZHRoIC0gbGVmdCAtIHNjcm9sbEJhcldpZHRoLFxuICAgIHJpZ2h0UmlnaHQ6IHdpZHRoIC0gbGVmdCAtIHJpZ2h0TGVmdCAtIDIgKiBzY3JvbGxCYXJXaWR0aCAtIGxlZnRNYXJnaW4sXG4gICAgcmlnaHRSaWdodEJvZHk6IHdpZHRoIC0gbGVmdCAtIHJpZ2h0TGVmdE5hdiAtIDIgKiBzY3JvbGxCYXJXaWR0aCAtIGxlZnRNYXJnaW4sXG4gIH1cblxuICByZXR1cm4ge1xuICAgIHdpZHRoOiBkaXZXaWR0aFtraW5kXSxcbiAgICBoZWlnaHQ6IGRpdkhlaWdodFtraW5kXSxcbiAgICBmbG9hdDogZmxvYXRTcGVjW2tpbmRdLFxuICB9XG59XG5cbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCB7IHJlbmRlciB9IGZyb20gJ3JlYWN0LWRvbSdcbmltcG9ydCB7IFJvdXRlciwgUm91dGUsIFJlZGlyZWN0LCBJbmRleFJvdXRlLCBJbmRleFJlZGlyZWN0LCBicm93c2VySGlzdG9yeSB9IGZyb20gJ3JlYWN0LXJvdXRlcidcblxuaW1wb3J0IFJvb3QgZnJvbSAnUm9vdC5qc3gnXG5pbXBvcnQgQXBwIGZyb20gJ0FwcC5qc3gnXG5pbXBvcnQgU3ViQXBwIGZyb20gJ1N1YkFwcC5qc3gnXG5pbXBvcnQgQmFja29mZmljZSBmcm9tICdCYWNrb2ZmaWNlLmpzeCdcbmltcG9ydCBJdGVtRmlsdGVyZWQgZnJvbSAnSXRlbUZpbHRlcmVkLmpzeCdcbmltcG9ydCBJdGVtTXkgZnJvbSAnSXRlbU15LmpzeCdcbmltcG9ydCBJdGVtUmVjb3JkUHJlIGZyb20gJ0l0ZW1SZWNvcmRQcmUuanN4J1xuaW1wb3J0IERvYyBmcm9tICdEb2MuanN4J1xuaW1wb3J0IE5vdEZvdW5kIGZyb20gJ05vdEZvdW5kLmpzeCdcblxuaW1wb3J0IGNvbmZpZ3VyZVN0b3JlIGZyb20gJ2NvbmZpZ3VyZVN0b3JlLmpzJ1xuaW1wb3J0IHJvb3RSZWR1Y2VyIGZyb20gJ3JlZHVjZXJzLmpzJ1xuXG5jb25zdCBzdG9yZSA9IGNvbmZpZ3VyZVN0b3JlKHJvb3RSZWR1Y2VyKVxuXG5yZW5kZXIoXG4gIDxSb290IHN0b3JlPXtzdG9yZX0+XG4gICAgPFJvdXRlciBoaXN0b3J5PXticm93c2VySGlzdG9yeX0gPlxuICAgICAgPFJlZGlyZWN0IGZyb209XCIvYWJvdXRcIiB0bz1cIi9kb2NzL2Fib3V0Lm1kXCIgLz5cbiAgICAgIDxSZWRpcmVjdCBmcm9tPVwiL2RvY3MvYWJvdXRcIiB0bz1cIi9kb2NzL2Fib3V0Lm1kXCIgLz5cbiAgICAgIDxSZWRpcmVjdCBmcm9tPVwiL2Fib3V0Lm1kXCIgdG89XCIvZG9jcy9hYm91dC5tZFwiIC8+XG4gICAgICA8UmVkaXJlY3QgZnJvbT1cIi9sb2dpblwiIHRvPVwiL2RvY3MvYWJvdXQubWRcIiAvPlxuICAgICAgPFJlZGlyZWN0IGZyb209XCIvbG9nb3V0XCIgdG89XCIvZG9jcy9hYm91dC5tZFwiIC8+XG4gICAgICA8UmVkaXJlY3QgZnJvbT1cIi9zbG9nb3V0XCIgdG89XCIvZG9jcy9hYm91dC5tZFwiIC8+XG4gICAgICA8Um91dGUgcGF0aD1cIi9cIiBjb21wb25lbnQ9e0FwcH0gPlxuICAgICAgICA8SW5kZXhSb3V0ZSBjb21wb25lbnQ9e0FwcH0gLz5cbiAgICAgICAgPEluZGV4UmVkaXJlY3QgdG89XCIvZG9jcy9hYm91dC5tZFwiIC8+XG4gICAgICAgIDxSb3V0ZSBwYXRoPVwiZG9jcy86ZG9jRmlsZVwiIGNvbXBvbmVudD17RG9jfSAvPlxuICAgICAgICA8Um91dGUgcGF0aD1cInRlY2gvZG9jcy9nZW4vOmRvY0ZpbGVcIiBjb21wb25lbnQ9e0RvY30gLz5cbiAgICAgICAgPFJvdXRlIHBhdGg9XCJ0ZWNoL2RvY3MvOmRvY0ZpbGVcIiBjb21wb25lbnQ9e0RvY30gLz5cbiAgICAgICAgPFJvdXRlIHBhdGg9XCI6dGFibGVcIiBjb21wb25lbnQ9e1N1YkFwcH0gPlxuICAgICAgICAgIDxSb3V0ZSBwYXRoPVwibGlzdFwiIGNvbXBvbmVudD17SXRlbUZpbHRlcmVkfSAvPlxuICAgICAgICAgIDxSb3V0ZSBwYXRoPVwibXlsaXN0XCIgY29tcG9uZW50PXtJdGVtTXl9ID5cbiAgICAgICAgICAgIDxSb3V0ZSBwYXRoPVwiOmVJZFwiIGNvbXBvbmVudD17SXRlbVJlY29yZFByZX0gb3duT25seT17dHJ1ZX0gLz5cbiAgICAgICAgICA8L1JvdXRlPlxuICAgICAgICAgIDxSb3V0ZSBwYXRoPVwiOmZ1bmNcIiBjb21wb25lbnQ9e0JhY2tvZmZpY2V9IC8+XG4gICAgICAgIDwvUm91dGU+XG4gICAgICA8L1JvdXRlPlxuICAgICAgPFJvdXRlIHBhdGg9XCIqXCIgY29tcG9uZW50PXtOb3RGb3VuZH0gLz5cbiAgICA8L1JvdXRlcj5cbiAgPC9Sb290PlxuICAsXG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdib2R5JylcbilcblxuIiwiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4J1xuaW1wb3J0IHsgY2hhbmdlRmFjZXRBbGwsIGdldEZpbHRlclNldHRpbmcsIHRlc3RBbGxDaGVja3MgfSBmcm9tICdmaWx0ZXIuanMnXG5cbmNvbnN0IGluZGV0ZXJtaW5hdGUgPSBzdGF0ZXMgPT4gIXN0YXRlcy5hbGxUcnVlICYmICFzdGF0ZXMuYWxsRmFsc2VcblxuY2xhc3MgQ2hlY2tib3hJIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgY29tcG9uZW50RGlkVXBkYXRlKCkge1xuICAgIGNvbnN0IHsgcHJvcHM6IHsgZmlsdGVyU2V0dGluZyB9IH0gPSB0aGlzXG4gICAgY29uc3Qgc3RhdGVzID0gdGVzdEFsbENoZWNrcyhmaWx0ZXJTZXR0aW5nKVxuICAgIHRoaXMuZG9tLmluZGV0ZXJtaW5hdGUgPSBpbmRldGVybWluYXRlKHN0YXRlcylcbiAgfVxuICBoYW5kbGVDaGVjayA9ICgpID0+IHtcbiAgICBjb25zdCB7IHByb3BzOiB7ZmlsdGVyU2V0dGluZywgZmlsdGVySWQsIGhhbmRsZSB9IH0gPSB0aGlzXG4gICAgY29uc3Qgc3RhdGVzID0gdGVzdEFsbENoZWNrcyhmaWx0ZXJTZXR0aW5nKVxuICAgIHJldHVybiBoYW5kbGUoZmlsdGVySWQsIHRoaXMuZG9tLmluZGV0ZXJtaW5hdGUgfHwgIXN0YXRlcy5hbGxUcnVlKVxuICB9XG4gIHNldEluZGV0ZXJtaW5hdGUgPSBkb21FbGVtID0+IHtcbiAgICBjb25zdCB7IHByb3BzOiB7IGZpbHRlclNldHRpbmcgfSB9ID0gdGhpc1xuICAgIGNvbnN0IHN0YXRlcyA9IHRlc3RBbGxDaGVja3MoZmlsdGVyU2V0dGluZylcbiAgICBpZiAoZG9tRWxlbSkge1xuICAgICAgdGhpcy5kb20gPSBkb21FbGVtXG4gICAgICBkb21FbGVtLmluZGV0ZXJtaW5hdGUgPSBpbmRldGVybWluYXRlKHN0YXRlcylcbiAgICB9XG4gIH1cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgcHJvcHM6IHsgZmlsdGVyU2V0dGluZyB9IH0gPSB0aGlzXG4gICAgY29uc3Qgc3RhdGVzID0gdGVzdEFsbENoZWNrcyhmaWx0ZXJTZXR0aW5nKVxuICAgIHJldHVybiAoXG4gICAgICA8aW5wdXRcbiAgICAgICAgICByZWY9e3RoaXMuc2V0SW5kZXRlcm1pbmF0ZX1cbiAgICAgICAgICB0eXBlPVwiY2hlY2tib3hcIlxuICAgICAgICAgIGNoZWNrZWQ9e3N0YXRlcy5hbGxUcnVlfVxuICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLmhhbmRsZUNoZWNrfVxuICAgICAgLz5cbiAgICApXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChnZXRGaWx0ZXJTZXR0aW5nLCB7IGhhbmRsZTogY2hhbmdlRmFjZXRBbGwgfSkoQ2hlY2tib3hJKVxuIiwiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4J1xuaW1wb3J0IEJ5VmFsdWUgZnJvbSAnQnlWYWx1ZS5qc3gnXG5pbXBvcnQgTCBmcm9tICdsZWFmbGV0J1xuaW1wb3J0IHtjb3VudHJ5Qm9yZGVyc30gZnJvbSAnZXVyb3BlLmdlby5qcydcbmltcG9ydCB7IGdldEZpbHRlclNldHRpbmcgfSBmcm9tICdmaWx0ZXIuanMnXG5pbXBvcnQgeyBnZXRDb3VudHJ5IH0gZnJvbSAndGFibGVzLmpzJ1xuaW1wb3J0IHsgY29tYmluZVNlbGVjdG9ycyB9IGZyb20gJ3JlZHVjZXJzLmpzJ1xuXG5jb25zdCBtYXBPcHRpb25zID0ge1xuICBIRUlHSFQ6IDI1MCxcbiAgTUFYX1JBRElVUzogMjUsXG4gIExFVkVMX09GRjogMTAsXG4gIFpPT01fSU5JVDogMyxcbiAgTUFQX0NFTlRFUjogWzUyLCAxMl0sXG4gIE1BUF9CT1VORFM6IFtbMzAsIC0yMF0sIFs3MCwgNDBdXSxcbiAgTUFSS0VSX0NPTE9SOiB7XG4gICAgW3RydWVdOiB7XG4gICAgICBjb2xvcjogJyMwMDg4MDAnLFxuICAgICAgZmlsbENvbG9yOiAnIzAwY2MwMCcsXG4gICAgfSxcbiAgICBbZmFsc2VdOiB7XG4gICAgICBjb2xvcjogJyM4ODg4NDQnLFxuICAgICAgZmlsbENvbG9yOiAnI2JiYmI2NicsXG4gICAgfSxcbiAgfSxcbiAgTUFSS0VSX1NIQVBFOiB7XG4gICAgd2VpZ2h0OiAxLFxuICAgIGZpbGw6IHRydWUsXG4gICAgZmlsbE9wYWNpdHk6IDAuOCxcbiAgfSxcbiAgQ09VTlRSWV9TVFlMRToge1xuICAgIFt0cnVlXToge1xuICAgICAgY29sb3I6ICcjODg0NDIyJyxcbiAgICAgIHdlaWdodDogMixcbiAgICAgIGZpbGw6IHRydWUsXG4gICAgICBmaWxsQ29sb3I6ICcjYWE3NzY2JyxcbiAgICAgIGZpbGxPcGFjaXR5OiAxLFxuICAgIH0sXG4gICAgW2ZhbHNlXToge1xuICAgICAgY29sb3I6ICcjNzc3Nzc3JyxcbiAgICAgIHdlaWdodDogMSxcbiAgICAgIGZpbGw6IHRydWUsXG4gICAgICBmaWxsQ29sb3I6ICcjYmJiYmJiJyxcbiAgICAgIGZpbGxPcGFjaXR5OiAxLFxuICAgIH0sXG4gIH0sXG59XG5cbmNvbnN0IGNvbXB1dGVSYWRpdXMgPSAoX2lkLCBmaWx0ZXJlZEFtb3VudE90aGVycywgYW1vdW50cykgPT4ge1xuICBjb25zdCBhbW91bnQgPSBhbW91bnRzID8gKGFtb3VudHNbX2lkXSB8fCAwKSA6IDBcbiAgaWYgKGFtb3VudCA9PSAwKSB7cmV0dXJuIDB9XG4gIGNvbnN0IHsgTUFYX1JBRElVUywgTEVWRUxfT0ZGIH0gPSBtYXBPcHRpb25zXG4gIGNvbnN0IHByb3BvcnRpb25hbCA9IE1BWF9SQURJVVMgKiBhbW91bnQgLyBmaWx0ZXJlZEFtb3VudE90aGVyc1xuICBpZiAoZmlsdGVyZWRBbW91bnRPdGhlcnMgPCBMRVZFTF9PRkYpIHtyZXR1cm4gcHJvcG9ydGlvbmFsfVxuICByZXR1cm4gTEVWRUxfT0ZGICogTWF0aC5zcXJ0KHByb3BvcnRpb25hbClcbn1cblxuY2xhc3MgRVVNYXAgZXh0ZW5kcyBDb21wb25lbnQge1xuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKVxuICAgIHRoaXMuZmVhdHVyZXMgPSB7fVxuICB9XG4gIHNldE1hcCA9IGRvbSA9PiB7aWYgKGRvbSkge3RoaXMuZG9tID0gZG9tfX1cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgcHJvcHM6IHsgY291bnRyeSwgLi4uYnlWYWx1ZVByb3BzIH0sIHNldE1hcCB9ID0gdGhpc1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2PlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgcmVmPXtzZXRNYXB9XG4gICAgICAgIC8+XG4gICAgICAgIDxCeVZhbHVlIHsuLi5ieVZhbHVlUHJvcHN9IC8+XG4gICAgICA8L2Rpdj5cbiAgICApXG4gIH1cblxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICBjb25zdCB7XG4gICAgICBwcm9wczogeyBmaWx0ZXJTZXR0aW5nLCBmaWx0ZXJlZEFtb3VudE90aGVycywgYW1vdW50cywgY291bnRyeSB9LFxuICAgICAgZG9tLFxuICAgIH0gPSB0aGlzXG4gICAgY29uc3QgeyBIRUlHSFQsIE1BUF9DRU5URVIsIFpPT01fSU5JVCwgTUFQX0JPVU5EUywgTUFSS0VSX0NPTE9SLCBNQVJLRVJfU0hBUEUsIENPVU5UUllfU1RZTEUgfSA9IG1hcE9wdGlvbnNcbiAgICBkb20uc3R5bGUuaGVpZ2h0ID0gSEVJR0hUXG4gICAgdGhpcy5tYXAgPSBMLm1hcChkb20sIHtcbiAgICAgIGF0dHJpYnV0aW9uQ29udHJvbDogZmFsc2UsXG4gICAgICBjZW50ZXI6IE1BUF9DRU5URVIsXG4gICAgICB6b29tOiBaT09NX0lOSVQsXG4gICAgICBtYXhCb3VuZHM6IE1BUF9CT1VORFMsXG4gICAgfSlcbiAgICBjb25zdCB7IG9yZGVyLCBlbnRpdGllcyB9ID0gY291bnRyeVxuICAgIHRoaXMuaWRGcm9tSXNvID0ge31cbiAgICBvcmRlci5mb3JFYWNoKF9pZCA9PiB7XG4gICAgICBjb25zdCB7IFtfaWRdOiB7IHZhbHVlczogeyBpc28gfSB9IH0gPSBlbnRpdGllc1xuICAgICAgdGhpcy5pZEZyb21Jc29baXNvXSA9IF9pZFxuICAgIH0pXG4gICAgTC5nZW9KU09OKGNvdW50cnlCb3JkZXJzLCB7XG4gICAgICBzdHlsZTogZmVhdHVyZSA9PiBDT1VOVFJZX1NUWUxFW3RoaXMuaW5EYXJpYWgoZmVhdHVyZSldLFxuICAgICAgb25FYWNoRmVhdHVyZTogZmVhdHVyZSA9PiB7XG4gICAgICAgIGlmICh0aGlzLmluRGFyaWFoKGZlYXR1cmUpKSB7XG4gICAgICAgICAgY29uc3QgeyBwcm9wZXJ0aWVzOiB7IGlzbzIsIGxhdCwgbG5nIH0gfSA9IGZlYXR1cmVcbiAgICAgICAgICBjb25zdCBfaWQgPSB0aGlzLmlkRnJvbUlzb1tpc28yXVxuICAgICAgICAgIGNvbnN0IGlzT24gPSBmaWx0ZXJTZXR0aW5nW19pZF1cbiAgICAgICAgICBjb25zdCBtYXJrZXIgPSBMLmNpcmNsZU1hcmtlcihbbGF0LCBsbmddLCB7XG4gICAgICAgICAgICAuLi5NQVJLRVJfQ09MT1JbaXNPbl0sXG4gICAgICAgICAgICByYWRpdXM6IGNvbXB1dGVSYWRpdXMoX2lkLCBmaWx0ZXJlZEFtb3VudE90aGVycywgYW1vdW50cyksXG4gICAgICAgICAgICAuLi5NQVJLRVJfU0hBUEUsXG4gICAgICAgICAgICBwYW5lOiAnbWFya2VyUGFuZScsXG4gICAgICAgICAgfSkuYWRkVG8odGhpcy5tYXApXG4gICAgICAgICAgdGhpcy5mZWF0dXJlc1tpc28yXSA9IG1hcmtlclxuICAgICAgICB9XG4gICAgICB9LFxuICAgIH0pLmFkZFRvKHRoaXMubWFwKVxuICB9XG5cbiAgaW5EYXJpYWggPSBmZWF0dXJlID0+ICEhdGhpcy5pZEZyb21Jc29bZmVhdHVyZS5wcm9wZXJ0aWVzLmlzbzJdXG5cbiAgY29tcG9uZW50RGlkVXBkYXRlKCkge1xuICAgIGNvbnN0IHsgcHJvcHM6IHsgZmlsdGVyU2V0dGluZywgZmlsdGVyZWRBbW91bnRPdGhlcnMsIGFtb3VudHMgfSB9ID0gdGhpc1xuICAgIGNvbnN0IHsgTUFSS0VSX0NPTE9SIH0gPSBtYXBPcHRpb25zXG4gICAgT2JqZWN0LmVudHJpZXModGhpcy5mZWF0dXJlcykuZm9yRWFjaCgoW2lzbzIsIG1hcmtlcl0pID0+IHtcbiAgICAgIGNvbnN0IF9pZCA9IHRoaXMuaWRGcm9tSXNvW2lzbzJdXG4gICAgICBjb25zdCBpc09uID0gZmlsdGVyU2V0dGluZ1tfaWRdXG4gICAgICBtYXJrZXIuc2V0UmFkaXVzKGNvbXB1dGVSYWRpdXMoX2lkLCBmaWx0ZXJlZEFtb3VudE90aGVycywgYW1vdW50cykpXG4gICAgICBtYXJrZXIuc2V0U3R5bGUoTUFSS0VSX0NPTE9SW2lzT25dKVxuICAgIH0pXG4gIH1cbn1cblxuRVVNYXAuZGlzcGxheU5hbWUgPSAnRVVNYXAnXG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QoY29tYmluZVNlbGVjdG9ycyhnZXRDb3VudHJ5LCBnZXRGaWx0ZXJTZXR0aW5nKSkoRVVNYXApXG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnXG5pbXBvcnQgeyBnZXRBbHQsIG5leHRBbHQgfSBmcm9tICdhbHRlci5qcydcblxuY29uc3QgaGFuZGxlTmV4dCA9ICh7IHRhZywgYWx0ZXJuYXRpdmVzLCBpbml0aWFsLCBuZXh0IH0pID0+IGV2ZW50ID0+IHtcbiAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgbmV4dCh0YWcsIGFsdGVybmF0aXZlcy5sZW5ndGgsIGluaXRpYWwpXG59XG5cbmNvbnN0IEFsdGVybmF0aXZlID0gKHsgY29udHJvbFBsYWNlbWVudCwgY29udHJvbHMsIGFsdCwgYWx0ZXJuYXRpdmVzLCAuLi5yZXN0IH0pID0+IChcbiAgPGRpdj5cbiAgICB7Y29udHJvbFBsYWNlbWVudChjb250cm9sc1thbHRdKGhhbmRsZU5leHQoeyBhbHRlcm5hdGl2ZXMsIC4uLnJlc3QgfSkpKX1cbiAgICB7YWx0ZXJuYXRpdmVzW2FsdF19XG4gIDwvZGl2PlxuKVxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KGdldEFsdCwgeyBuZXh0OiBuZXh0QWx0IH0pKEFsdGVybmF0aXZlKVxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4J1xuaW1wb3J0IExvZ2luIGZyb20gJ0xvZ2luLmpzeCdcbmltcG9ydCBOYXZMaW5rIGZyb20gJ05hdkxpbmsuanN4J1xuaW1wb3J0IFN0YXRpYyBmcm9tICdTdGF0aWMuanN4J1xuaW1wb3J0IE5vdGlmaWNhdGlvbiBmcm9tICdOb3RpZmljYXRpb24uanN4J1xuaW1wb3J0IHsgZ2V0V2luRGltIH0gZnJvbSAnd2luLmpzJ1xuXG5jb25zdCBBcHAgPSAoeyBjaGlsZHJlbiwgaGVpZ2h0LCB3aWR0aCB9KSA9PiB7XG4gIGNvbnN0IHRleHQgPSBgJHt3aWR0aH0geCAke2hlaWdodH1gXG4gIHJldHVybiAoXG4gICAgPGRpdj5cbiAgICAgIDxOb3RpZmljYXRpb24gLz5cbiAgICAgIDxwIGNsYXNzTmFtZT1cIm5hdiBzbWFsbCB0b3BcIiA+XG4gICAgICAgIDxpbWdcbiAgICAgICAgICBzcmM9XCIvc3RhdGljL2ltYWdlcy9pbmtpbmRfbG9nb19zbWFsbC5wbmdcIlxuICAgICAgICAgIHRpdGxlPVwiaW5mb3JtYXRpb24gYWJvdXQgdGhpcyBzaXRlXCJcbiAgICAgICAgLz5cbiAgICAgICAgPE5hdkxpbmsgdG89XCIvY29udHJpYlwiID57J0NvbnRyaWJ1dGlvbnMnfTwvTmF2TGluaz5cbiAgICAgICAgPE5hdkxpbmsgdG89XCIvYmFja29mZmljZVwiID57J0JhY2tvZmZpY2UnfTwvTmF2TGluaz5cbiAgICAgICAgPFN0YXRpYyAvPlxuICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJyZXNpemVcIiB0aXRsZT17dGV4dH0+e3RleHR9PC9zcGFuPlxuICAgICAgICA8TG9naW4gLz5cbiAgICAgIDwvcD5cbiAgICAgIDxkaXY+e2NoaWxkcmVufTwvZGl2PlxuICAgIDwvZGl2PlxuICApXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QoZ2V0V2luRGltKShBcHApXG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5cbmNvbnN0IEJhY2tvZmZpY2UgPSAoeyBwYXJhbXM6IHsgZnVuYyB9IH0pID0+IHtcbiAgY29uc3QgaGVhZGluZ3MgPSB7XG4gICAgdHlwZTogJ0NvbnRyaWJ1dGlvbiB0eXBlcycsXG4gICAgYXNzZXNzOiAnQXNzZXNzbWVudCBjcml0ZXJpYScsXG4gICAgcGFja2FnZTogJ0Fzc2Vzc21lbnQgcGFja2FnZXMnLFxuICB9XG4gIGNvbnN0IGJvZGllcyA9IHtcbiAgICB0eXBlOiAnV2lsbCBiZSBpbXBsZW1lbnRlZCcsXG4gICAgYXNzZXNzOiAnV2lsbCBiZSBpbXBsZW1lbnRlZCcsXG4gICAgcGFja2FnZTogJ1dpbGwgYmUgaW1wbGVtZW50ZWQnLFxuICB9XG4gIGNvbnN0IGhlYWRpbmcgPSBoZWFkaW5nc1tmdW5jXSB8fCAnTm8gc3VjaCBmdW5jdGlvbidcbiAgY29uc3QgYm9keSA9IGJvZGllc1tmdW5jXSB8fCAnTm90aGluZyB0byB3YWl0IGZvcidcbiAgcmV0dXJuIChcbiAgICA8ZGl2PlxuICAgICAgPGgxPntoZWFkaW5nfTwvaDE+XG4gICAgICA8cD57Ym9keX08L3A+XG4gICAgPC9kaXY+XG4gIClcbn1cblxuZXhwb3J0IGRlZmF1bHQgQmFja29mZmljZVxuXG5cbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCdcbmltcG9ydCBGYWNldCBmcm9tICdGYWNldC5qc3gnXG5pbXBvcnQgQ2hlY2tib3hJIGZyb20gJ0NoZWNrYm94SS5qc3gnXG5pbXBvcnQgU3RhdCBmcm9tICdTdGF0LmpzeCdcbmltcG9ydCBBbHRlcm5hdGl2ZSBmcm9tICdBbHRlcm5hdGl2ZS5qc3gnXG5pbXBvcnQgeyBnZXRGaWVsZFZhbHVlcywgcGxhY2VGYWNldHMgfSBmcm9tICdmaWx0ZXIuanMnXG5cbmNvbnN0IEJ5VmFsdWUgPSAoe1xuICB0YWJsZSxcbiAgZmlsdGVySWQsIGZpbHRlckZpZWxkLCBmaWx0ZXJMYWJlbCxcbiAgZmllbGRWYWx1ZXMsXG4gIGZpbHRlcmVkQW1vdW50LCBmaWx0ZXJlZEFtb3VudE90aGVycyxcbiAgYW1vdW50cywgbWF4Q29scywgXG4gIGV4cGFuZGVkLFxufSkgPT4ge1xuICBjb25zdCByb3dzID0gcGxhY2VGYWNldHMoZmllbGRWYWx1ZXMsIG1heENvbHMpXG4gIGNvbnN0IGNvbnRyb2wxID0gaGFuZGxlciA9PiAoPHNwYW4gY2xhc3NOYW1lPVwiYnV0dG9uLXNtYWxsIGZhIGZhLWNoZXZyb24tZG93blwiIG9uQ2xpY2s9e2hhbmRsZXJ9IC8+KVxuICBjb25zdCBjb250cm9sMiA9IGhhbmRsZXIgPT4gKDxzcGFuIGNsYXNzTmFtZT1cImJ1dHRvbi1zbWFsbCBmYSBmYS1jaGV2cm9uLXJpZ2h0XCIgb25DbGljaz17aGFuZGxlcn0gLz4pXG4gIGNvbnN0IGNvbnRyb2xQbGFjZW1lbnQgPSBjb250cm9sID0+IChcbiAgICA8cCBjbGFzc05hbWU9XCJmYWNldFwiID5cbiAgICAgIDxDaGVja2JveElcbiAgICAgICAgZmlsdGVySWQ9e2ZpbHRlcklkfVxuICAgICAgLz4ge2ZpbHRlckxhYmVsfXsnICd9XG4gICAgICA8U3RhdCBzdWJUb3RhbD17ZmlsdGVyZWRBbW91bnR9IHRvdGFsPXtmaWx0ZXJlZEFtb3VudE90aGVyc30gLz57JyAnfVxuICAgICAge2NvbnRyb2x9XG4gICAgPC9wPlxuICApXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJmYWNldFwiID57XG4gICAgICByb3dzID09PSBudWxsID8gKDxwPnsnIC1ubyBmYWNldHMgJ308L3A+KSA6IChcbiAgICAgICAgPEFsdGVybmF0aXZlXG4gICAgICAgICAgdGFnPXtgJHt0YWJsZX1fJHtmaWx0ZXJJZH1gfVxuICAgICAgICAgIGNvbnRyb2xQbGFjZW1lbnQ9e2NvbnRyb2xQbGFjZW1lbnR9XG4gICAgICAgICAgY29udHJvbHM9e1tjb250cm9sMSwgY29udHJvbDJdfVxuICAgICAgICAgIGluaXRpYWw9e2V4cGFuZGVkID8gMCA6IDF9XG4gICAgICAgICAgYWx0ZXJuYXRpdmVzPXtbXG4gICAgICAgICAgICAoPHRhYmxlIGtleT1cInRhYmxlXCIgPlxuICAgICAgICAgICAgICA8dGJvZHk+XG4gICAgICAgICAgICAgICAge3Jvd3MubWFwKChlbnRpdHksIGkpID0+IChcbiAgICAgICAgICAgICAgICAgIDx0ciBrZXk9e2l9ID5cbiAgICAgICAgICAgICAgICAgICAge2VudGl0eS5tYXAoKGYsIGopID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICBpZiAoZiA9PT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDx0ZCBrZXk9e2p9IC8+XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IFt2YWx1ZUlkLCB2YWx1ZVJlcF0gPSBmXG4gICAgICAgICAgICAgICAgICAgICAgY29uc3QgZmFjZXRDbGFzcyA9IChqID09IDApID8gXCJmYWNldFwiIDogXCJmYWNldCBtaWRcIlxuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBbKFxuICAgICAgICAgICAgICAgICAgICAgICAgPHRkXG4gICAgICAgICAgICAgICAgICAgICAgICAga2V5PXt2YWx1ZUlkfVxuICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17ZmFjZXRDbGFzc31cbiAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgPEZhY2V0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVySWQ9e2ZpbHRlcklkfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlSWQ9e3ZhbHVlSWR9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWVSZXA9e3ZhbHVlUmVwfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICApLCAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8dGRcbiAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PVwic3RhdFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cInN0YXRpc3RpY1wiXG4gICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxTdGF0IHN1YlRvdGFsPXthbW91bnRzW3ZhbHVlSWRdfSAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICAgICAgICApXVxuICAgICAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICAgICAgICApKX1cbiAgICAgICAgICAgICAgPC90Ym9keT5cbiAgICAgICAgICAgIDwvdGFibGU+KSxcbiAgICAgICAgICAgICg8ZGl2IGtleT1cImRpdlwiIC8+KSxcbiAgICAgICAgICBdfVxuICAgICAgICAvPlxuICAgICAgKX1cbiAgICA8L2Rpdj5cbiAgKVxufVxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KGdldEZpZWxkVmFsdWVzKShCeVZhbHVlKVxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuXG5pbXBvcnQgRG9jTWQgZnJvbSAnRG9jTWQuanN4J1xuaW1wb3J0IERvY1BkZiBmcm9tICdEb2NQZGYuanN4J1xuaW1wb3J0IERvY0h0bWwgZnJvbSAnRG9jSHRtbC5qc3gnXG5pbXBvcnQgTm90Rm91bmQgZnJvbSAnTm90Rm91bmQuanN4J1xuXG5jb25zdCBkb2NUeXBlID0ge1xuICBtZDogRG9jTWQsXG4gIHBkZjogRG9jUGRmLFxuICBodG1sOiBEb2NIdG1sLFxufVxuXG5jb25zdCBEb2MgPSAoeyBsb2NhdGlvbjogeyBwYXRobmFtZTogZG9jUGF0aCB9IH0pID0+IHtcbiAgY29uc3QgW2RvY0RpciwgZG9jRmlsZV0gPSAvXiguKilcXC8oW14vXSspJC9nLmV4ZWMoZG9jUGF0aCkuc2xpY2UoMSlcbiAgY29uc3QgW2RvY05hbWUsIGRvY0V4dF0gPSAvXiguKilcXC4oW14uXSspJC9nLmV4ZWMoZG9jRmlsZSkuc2xpY2UoMSlcbiAgY29uc3QgeyBbZG9jRXh0XTogRG9jQ2xhc3MgfSA9IGRvY1R5cGVcbiAgcmV0dXJuIERvY0NsYXNzID09IG51bGwgPyAoXG4gICAgPE5vdEZvdW5kIHBhcmFtcz17e3NwbGF0OiBgZG9jdW1lbnQgJHtkb2NQYXRofWB9fSAvPlxuICApIDogKFxuICAgIDxEb2NDbGFzcyBkb2NEaXI9e2RvY0Rpcn0gZG9jTmFtZT17ZG9jTmFtZX0gZG9jRXh0PXtkb2NFeHR9IHRhZz17ZG9jTmFtZX0gLz5cbiAgKVxufVxuXG5leHBvcnQgZGVmYXVsdCBEb2NcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcblxuY29uc3QgRG9jSHRtbCA9ICh7IGRvY0RpciwgZG9jTmFtZSwgZG9jRXh0IH0pID0+IHtcbiAgY29uc3Qgc3JjID0gYC9hcGkvZmlsZSR7ZG9jRGlyfS8ke2RvY05hbWV9LiR7ZG9jRXh0fWBcbiAgcmV0dXJuIChcbiAgICA8aWZyYW1lXG4gICAgICBoZWlnaHQ9XCIxMDAlXCJcbiAgICAgIHdpZHRoPVwiMTAwJVwiXG4gICAgICBzcmM9e3NyY31cbiAgICAvPlxuICApXG59XG5cbmV4cG9ydCBkZWZhdWx0IERvY0h0bWxcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcblxuY29uc3QgRG9jUGRmID0gKHsgZG9jRGlyLCBkb2NOYW1lLCBkb2NFeHQgfSkgPT4ge1xuICBjb25zdCBocmVmID0gYC9hcGkvZmlsZSR7ZG9jRGlyfS8ke2RvY05hbWV9LiR7ZG9jRXh0fWBcbiAgY29uc3QgaU9TID0gL2lQYWR8aVBob25lfGlQb2QvLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCkgJiYgIXdpbmRvdy5NU1N0cmVhbVxuICByZXR1cm4gaU9TID8gKFxuICAgIDxwPlxuICAgICAgPGEgdGFyZ2V0PVwiX2JsYW5rXCIgcmVsPVwibm9vcGVuZXIgbm9yZWZlcnJlclwiIGhyZWY9e2hyZWZ9ID57ZG9jTmFtZX08L2E+eycgKG9wZW4gcGRmIGluIGEgbmV3IHRhYiknfVxuICAgIDwvcD5cbiAgKSA6IChcbiAgICA8b2JqZWN0XG4gICAgICBoZWlnaHQ9XCIxMDAlXCJcbiAgICAgIHdpZHRoPVwiMTAwJVwiXG4gICAgICBkYXRhPXtocmVmfVxuICAgICAgdHlwZT1cImFwcGxpY2F0aW9uL3BkZlwiXG4gICAgPlxuICAgICAgPGEgdGFyZ2V0PVwiX2JsYW5rXCIgcmVsPVwibm9vcGVuZXIgbm9yZWZlcnJlclwiIGhyZWY9e2hyZWZ9ID57ZG9jTmFtZX08L2E+eycgKG9wZW4gcGRmIGluIGEgbmV3IHRhYiknfVxuICAgIDwvb2JqZWN0PlxuICApXG59XG5cbmV4cG9ydCBkZWZhdWx0IERvY1BkZlxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4J1xuaW1wb3J0IHsgY2hhbmdlRmFjZXQsIGdldEZpbHRlclNldHRpbmcgfSBmcm9tICdmaWx0ZXIuanMnXG5cbmNvbnN0IEZhY2V0ID0gKHsgZmlsdGVySWQsIHZhbHVlSWQsIHZhbHVlUmVwLCBmaWx0ZXJTZXR0aW5nLCBoYW5kbGUgfSkgPT4ge1xuICBjb25zdCB7IFt2YWx1ZUlkXTogaXNPbiB9ID0gZmlsdGVyU2V0dGluZ1xuICByZXR1cm4gKFxuICA8c3Bhbj5cbiAgICA8aW5wdXRcbiAgICAgIHR5cGU9XCJjaGVja2JveFwiXG4gICAgICBjaGVja2VkPXtpc09ufVxuICAgICAgY2xhc3NOYW1lPVwiZmFjZXRcIlxuICAgICAgb25DaGFuZ2U9eygpID0+IGhhbmRsZShmaWx0ZXJJZCwgdmFsdWVJZCwgIWlzT24pfVxuICAgIC8+XG4gICAge2AgJHt2YWx1ZVJlcH1gfVxuICA8L3NwYW4+XG4pXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QoZ2V0RmlsdGVyU2V0dGluZywgeyBoYW5kbGU6IGNoYW5nZUZhY2V0IH0pKEZhY2V0KVxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4J1xuXG5pbXBvcnQgRnVsbFRleHQgZnJvbSAnRnVsbFRleHQuanN4J1xuaW1wb3J0IEJ5VmFsdWUgZnJvbSAnQnlWYWx1ZS5qc3gnXG5pbXBvcnQgRVVNYXAgZnJvbSAnRVVNYXAuanN4J1xuXG5pbXBvcnQgeyBnZXRUYWJsZUZpbHRlcnMgfSBmcm9tICd0YWJsZXMuanMnXG5cbmNvbnN0IGZpbHRlckNsYXNzID0ge1xuICBGdWxsVGV4dCxcbiAgRVVNYXAsXG4gIEJ5VmFsdWUsXG59XG5cbmNvbnN0IEZpbHRlciA9ICh7XG4gIHRhYmxlcyxcbiAgdGFibGUsXG4gIGZpZWxkcyxcbiAgZmlsdGVyTGlzdCwgXG4gIGZpbHRlcmVkQW1vdW50LCBmaWx0ZXJlZEFtb3VudE90aGVycyxcbiAgYW1vdW50cyxcbn0pID0+IChcbiAgPGRpdj5cbiAgICB7ZmlsdGVyTGlzdC5maWx0ZXIoeCA9PiBmaWVsZHNbeC5maWVsZF0pLm1hcCgoZmlsdGVyLCBmaWx0ZXJJZCkgPT4ge1xuICAgICAgY29uc3QgeyB0eXBlIH0gPSBmaWx0ZXJcbiAgICAgIGNvbnN0IHsgW3R5cGVdOiBGY2xhc3MgfSA9IGZpbHRlckNsYXNzXG4gICAgICBpZiAoZmFsc2UgJiYgdHlwZSAhPSAnRnVsbFRleHQnKSB7XG4gICAgICAgIHJldHVybiA8cCBrZXk9e2ZpbHRlcklkfT57dHlwZX08L3A+XG4gICAgICB9XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8RmNsYXNzXG4gICAgICAgICAga2V5PXtmaWx0ZXJJZH1cbiAgICAgICAgICB0YWJsZT17dGFibGV9XG4gICAgICAgICAgZmlsdGVySWQ9e2ZpbHRlcklkfVxuICAgICAgICAgIGZpbHRlckZpZWxkPXtmaWx0ZXIuZmllbGR9XG4gICAgICAgICAgZmlsdGVyTGFiZWw9e2ZpbHRlci5sYWJlbH1cbiAgICAgICAgICBtYXhDb2xzPXtmaWx0ZXIubWF4Q29sc31cbiAgICAgICAgICBmaWx0ZXJlZEFtb3VudD17ZmlsdGVyZWRBbW91bnR9XG4gICAgICAgICAgZmlsdGVyZWRBbW91bnRPdGhlcnM9e2ZpbHRlcmVkQW1vdW50T3RoZXJzW2ZpbHRlcklkXX1cbiAgICAgICAgICBhbW91bnRzPXthbW91bnRzW2ZpbHRlcklkXX1cbiAgICAgICAgICBleHBhbmRlZD17ZmlsdGVyLmV4cGFuZGVkfVxuICAgICAgICAvPlxuICAgICAgKX1cbiAgICApfVxuICA8L2Rpdj5cbilcblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChnZXRUYWJsZUZpbHRlcnMpKEZpbHRlcilcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCdcbmltcG9ydCBTdGF0IGZyb20gJ1N0YXQuanN4J1xuaW1wb3J0IHsgY2hhbmdlRnVsbHRleHQsIGdldEZpbHRlclNldHRpbmcgfSBmcm9tICdmaWx0ZXIuanMnXG5cblxuY29uc3QgRnVsbFRleHQgPSAoe1xuICBmaWx0ZXJJZCwgZmlsdGVyRmllbGQsIGZpbHRlckxhYmVsLFxuICBmaWx0ZXJTZXR0aW5nLFxuICBmaWx0ZXJlZEFtb3VudCwgZmlsdGVyZWRBbW91bnRPdGhlcnMsXG4gIGhhbmRsZSxcbn0pID0+IChcbiAgPGRpdj5cbiAgICA8cCB0aXRsZT17YFNlYXJjaCBpbiAke2ZpbHRlckZpZWxkfWB9ID5cbiAgICAgIDxpbnB1dFxuICAgICAgICB0eXBlPVwidGV4dFwiXG4gICAgICAgIGNsYXNzTmFtZT1cInNlYXJjaFwiXG4gICAgICAgIHBsYWNlaG9sZGVyPXtgc2VhcmNoIGluICR7ZmlsdGVyTGFiZWx9YH1cbiAgICAgICAgdmFsdWU9e2ZpbHRlclNldHRpbmd9XG4gICAgICAgIG9uQ2hhbmdlPXtldmVudCA9PiBoYW5kbGUoZmlsdGVySWQsIGV2ZW50LnRhcmdldC52YWx1ZSl9XG4gICAgICAvPnsnICd9XG4gICAgICA8U3RhdCBzdWJUb3RhbD17ZmlsdGVyZWRBbW91bnR9IHRvdGFsPXtmaWx0ZXJlZEFtb3VudE90aGVyc30gLz5cbiAgICA8L3A+XG4gIDwvZGl2PlxuKVxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KGdldEZpbHRlclNldHRpbmcsIHsgaGFuZGxlOiBjaGFuZ2VGdWxsdGV4dCB9KShGdWxsVGV4dClcbiIsImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCdcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCdcbmltcG9ydCB7IGNvbWJpbmVTZWxlY3RvcnMgfSBmcm9tICdyZWR1Y2Vycy5qcydcbmltcG9ydCB7IGdldFVzZXIsIGdldENvdW50cnkgfSBmcm9tICd0YWJsZXMuanMnXG5cbmNvbnN0IHRyaW1EYXRlID0gdGV4dCA9PiAoKHRleHQgPT0gbnVsbCkgPyAnJyA6IHRleHQucmVwbGFjZSgvXFwuWzAtOV0rLywgJycpKVxuXG5jb25zdCB1c2VyQXNTdHJpbmcgPSAoeyBfaWQ6IHZhbElkIH0sIHVzZXIpID0+IHtcbiAgbGV0IHZhbFJlcFxuICBjb25zdCB7IGVudGl0aWVzOiB7IFt2YWxJZF06IGVudGl0eSB9IH0gPSB1c2VyXG4gIGlmIChlbnRpdHkpIHtcbiAgICBjb25zdCB7IHZhbHVlczogeyBlcHBuLCBmaXJzdE5hbWUsIGxhc3ROYW1lLCBlbWFpbFByZSwgYXV0aG9yaXR5LCBtYXlMb2dpbiB9IH0gPSBlbnRpdHlcbiAgICBjb25zdCBlbWFpbCA9IGVtYWlsUHJlIHx8ICcnXG4gICAgbGV0IGxpbmtUZXh0ID0gW2ZpcnN0TmFtZSB8fCAnJywgbGFzdE5hbWUgfHwgJyddLmZpbHRlcih4ID0+IHgpLmpvaW4oJyAnKVxuICAgIGlmIChsaW5rVGV4dCA9PSAnJykge2xpbmtUZXh0ID0gZW1haWx9XG4gICAgY29uc3QgbmFtZVBhcnQgPSAobGlua1RleHQgJiYgZW1haWwpID8gKFxuICAgICAgYFske2xpbmtUZXh0fV0obWFpbHRvOiR7ZW1haWx9KWBcbiAgICApIDogKFxuICAgICAgbGlua1RleHQgKyBlbWFpbFxuICAgIClcbiAgICBjb25zdCBlcHBuUGFydCA9IGVwcG4gPyBgIGVwcG49JHtlcHBufSBgIDogJydcbiAgICBjb25zdCBhdXRob3JpdHlQYXJ0ID0gYXV0aG9yaXR5ID8gYCBhdXRoZW50aWNhdGVkIGJ5PSR7YXV0aG9yaXR5fSBgIDogJydcbiAgICBjb25zdCBtYXlMb2dpblBhcnQgPSBtYXlMb2dpbiA/IGAgYWN0aXZlPSR7bWF5TG9naW59IGAgOiAnJ1xuICAgIHZhbFJlcCA9IFtuYW1lUGFydCwgZXBwblBhcnQsIGF1dGhvcml0eVBhcnQsIG1heUxvZ2luUGFydF0uZmlsdGVyKHggPT4geCkuam9pbignOyAnKVxuICB9XG4gIGVsc2Uge1xuICAgIHZhbFJlcCA9ICdVTktOT1dOJ1xuICB9XG4gIHJldHVybiB2YWxSZXBcbn1cblxuY29uc3QgY291bnRyeUFzU3RyaW5nID0gKHsgX2lkOiB2YWxJZCB9LCBjb3VudHJ5KSA9PiB7XG4gIGNvbnN0IHsgZW50aXRpZXM6IHsgW3ZhbElkXTogZW50aXR5IH0gfSA9IGNvdW50cnlcbiAgaWYgKGVudGl0eSkge1xuICAgIGNvbnN0IHsgdmFsdWVzOiB7IG5hbWUsIGlzbyB9IH0gPSBlbnRpdHlcbiAgICByZXR1cm4gYCR7aXNvfTogJHtuYW1lfWBcbiAgfVxuICBlbHNlIHtcbiAgICByZXR1cm4gJ1VOS05PV04nXG4gIH1cbn1cblxuY29uc3QgdmFsdWVBc1N0cmluZyA9ICh2YWx1ZSwgeyB2YWxUeXBlLCBjb252ZXJ0LCBpbml0aWFsLCB1c2VyLCBjb3VudHJ5IH0pID0+IHtcbiAgaWYgKHZhbHVlID09IG51bGwpIHtyZXR1cm4gJyd9XG4gIHN3aXRjaCAodmFsVHlwZSkge1xuICAgIGNhc2UgJ3JlbCc6IHtcbiAgICAgIHN3aXRjaCAoY29udmVydCkge1xuICAgICAgICBjYXNlICd1c2VyJzoge1xuICAgICAgICAgIHJldHVybiB1c2VyQXNTdHJpbmcodmFsdWUsIHVzZXIpXG4gICAgICAgIH1cbiAgICAgICAgY2FzZSAnY291bnRyeSc6IHtcbiAgICAgICAgICByZXR1cm4gY291bnRyeUFzU3RyaW5nKHZhbHVlLCBjb3VudHJ5KVxuICAgICAgICB9XG4gICAgICAgIGRlZmF1bHQ6IHJldHVybiB2YWx1ZS52YWx1ZVxuICAgICAgfVxuICAgIH1cbiAgICBjYXNlICdkYXRldGltZSc6IHtcbiAgICAgIHJldHVybiB0cmltRGF0ZSh2YWx1ZSlcbiAgICB9XG4gICAgZGVmYXVsdDoge1xuICAgICAgcmV0dXJuIHZhbHVlXG4gICAgfVxuICB9XG59XG5cbmNvbnN0IEl0ZW1GaWVsZCA9ICh7IGxhYmVsLCB2YWx1ZXMsIHZhbFR5cGUsIGNvbnZlcnQsIGluaXRpYWwsIHVzZXIsIGNvdW50cnkgfSkgPT4ge1xuICBjb25zdCBwcm9wcyA9IHsgdmFsVHlwZSwgY29udmVydCwgaW5pdGlhbCwgdXNlciwgY291bnRyeSB9XG4gIHJldHVybiAoXG4gICAgPHA+XG4gICAgICA8bGFiZWw+PGI+e2xhYmVsfTo8L2I+PC9sYWJlbD57JyAnfVxuICAgICAge1xuICAgICAgICB2YWx1ZXMubWFwKCh2YWx1ZSwgaSkgPT4gKFxuICAgICAgICAgIDxzcGFuIGtleT17aX0+eyhpICE9IDApPycgfCAnIDogJyd9PHNwYW4+e3ZhbHVlQXNTdHJpbmcodmFsdWUsIHByb3BzKX08L3NwYW4+PC9zcGFuPlxuICAgICAgICApKVxuICAgICAgfVxuICAgIDwvcD5cbiAgKVxufVxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KGNvbWJpbmVTZWxlY3RvcnMoZ2V0VXNlciwgZ2V0Q291bnRyeSkpKEl0ZW1GaWVsZClcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCBBbHRlcm5hdGl2ZSBmcm9tICdBbHRlcm5hdGl2ZS5qc3gnXG5pbXBvcnQgSXRlbVJlY29yZCBmcm9tICdJdGVtUmVjb3JkLmpzeCdcbmltcG9ydCBOYXZMaW5rIGZyb20gJ05hdkxpbmsuanN4J1xuXG5jb25zdCBJdGVtSGVhZCA9ICh7IHRhYmxlLCB2YWx1ZXMsIHRpdGxlLCBpbnBsYWNlIH0pID0+IHtcbiAgY29uc3QgeyBfaWQ6IGVJZCwgW3RpdGxlXTogZW50aXR5SGVhZFByZSB9ID0gdmFsdWVzXG4gIGxldCBlbnRpdHlIZWFkXG4gIGlmICghZW50aXR5SGVhZFByZSkge2VudGl0eUhlYWQgPSAnLWVtcHR5LSd9XG4gIGVsc2Uge1xuICAgIFtlbnRpdHlIZWFkXSA9IGVudGl0eUhlYWRQcmVcbiAgICBpZiAodHlwZW9mIGVudGl0eUhlYWQgPT0gJ29iamVjdCcpIHtcbiAgICAgIGNvbnN0IHsgdmFsdWUgfSA9IGVudGl0eUhlYWRcbiAgICAgIGVudGl0eUhlYWQgPSB2YWx1ZVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGNvbnRyb2wxID0gaGFuZGxlciA9PiAoPHNwYW4gY2xhc3NOYW1lPVwiYnV0dG9uLXNtYWxsIGZhIGZhLWNoZXZyb24tZG93blwiIG9uQ2xpY2s9e2hhbmRsZXJ9IC8+KVxuICBjb25zdCBjb250cm9sMiA9IGhhbmRsZXIgPT4gKDxzcGFuIGNsYXNzTmFtZT1cImJ1dHRvbi1zbWFsbCBmYSBmYS1jaGV2cm9uLXJpZ2h0XCIgb25DbGljaz17aGFuZGxlcn0gLz4pXG4gIGNvbnN0IGNvbnRyb2xQbGFjZW1lbnQgPSBjb250cm9sID0+IChcbiAgICA8cD5cbiAgICAgIHtjb250cm9sfVxuICAgICAgPHNwYW4+XG4gICAgICAgIHtlbnRpdHlIZWFkfVxuICAgICAgPC9zcGFuPlxuICAgIDwvcD5cbiAgKVxuXG4gIHJldHVybiAoXG4gICAgPHRyIGlkPXtlSWR9ID5cbiAgICAgIDx0ZD57XG4gICAgICAgIGlucGxhY2UgPyAoXG4gICAgICAgICAgPEFsdGVybmF0aXZlXG4gICAgICAgICAgICB0YWc9e2Ake3RhYmxlfV8ke2VJZH1gfVxuICAgICAgICAgICAgY29udHJvbFBsYWNlbWVudD17Y29udHJvbFBsYWNlbWVudH1cbiAgICAgICAgICAgIGNvbnRyb2xzPXtbY29udHJvbDEsIGNvbnRyb2wyXX1cbiAgICAgICAgICAgIGFsdGVybmF0aXZlcz17WyhcbiAgICAgICAgICAgICAgPEl0ZW1SZWNvcmRcbiAgICAgICAgICAgICAgICBrZXk9XCJzaG93XCJcbiAgICAgICAgICAgICAgICB0YWJsZT17dGFibGV9XG4gICAgICAgICAgICAgICAgZUlkPXtlSWR9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICApLCAnJ119XG4gICAgICAgICAgICBpbml0aWFsPXsxfVxuICAgICAgICAgIC8+XG4gICAgICAgICkgOiAoXG4gICAgICAgICAgPE5hdkxpbmsgY2xhc3NOYW1lPVwibmF2XCIgdG89e2AvJHt0YWJsZX0vbXlsaXN0LyR7ZUlkfWB9ID5cbiAgICAgICAgICAgIDxzcGFuPlxuICAgICAgICAgICAgICB7ZW50aXR5SGVhZH1cbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICA8L05hdkxpbms+XG4gICAgICAgIClcbiAgICAgIH1cbiAgICAgIDwvdGQ+XG4gICAgPC90cj5cbiAgKVxufVxuXG5leHBvcnQgZGVmYXVsdCBJdGVtSGVhZFxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4J1xuaW1wb3J0IEl0ZW1IZWFkIGZyb20gJ0l0ZW1IZWFkLmpzeCdcbmltcG9ydCB7IGdldFRhYmxlcyB9IGZyb20gJ3RhYmxlcy5qcydcblxuY29uc3QgSXRlbUxpc3QgPSAoeyB0YWJsZXMsIHRhYmxlLCB0aXRsZSwgZmlsdGVyZWREYXRhLCBpbnBsYWNlIH0pID0+IHtcbiAgY29uc3QgeyBbdGFibGVdOiB7IGVudGl0aWVzIH0gfSA9IHRhYmxlcyBcbiAgcmV0dXJuIChcbiAgICA8ZGl2PlxuICAgICAgPHRhYmxlPlxuICAgICAgICA8dGJvZHk+e1xuICAgICAgICBmaWx0ZXJlZERhdGEubWFwKGVJZCA9PiB7XG4gICAgICAgICAgY29uc3QgeyB2YWx1ZXMgfSA9IGVudGl0aWVzW2VJZF1cbiAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPEl0ZW1IZWFkIGtleT17ZUlkfSB0YWJsZT17dGFibGV9IHRpdGxlPXt0aXRsZX0gdmFsdWVzPXt2YWx1ZXN9IGlucGxhY2U9e2lucGxhY2V9IC8+XG4gICAgICAgICAgKVxuICAgICAgICB9KVxuICAgICAgICB9PC90Ym9keT5cbiAgICAgIDwvdGFibGU+XG4gICAgPC9kaXY+XG4gIClcbn1cblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChnZXRUYWJsZXMpKEl0ZW1MaXN0KVxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuXG5pbXBvcnQgSXRlbVJlY29yZCBmcm9tICdJdGVtUmVjb3JkLmpzeCdcblxuY29uc3QgSXRlbVJlY29yZFByZSA9ICh7IHBhcmFtczogeyB0YWJsZSwgZUlkIH0sIHJvdXRlOiB7IG93bk9ubHkgfSB9KSA9PiAoXG4gIDxJdGVtUmVjb3JkIHRhYmxlPXt0YWJsZX0gZUlkPXtlSWR9IG93bk9ubHk9e293bk9ubHl9IC8+XG4pXG5cbmV4cG9ydCBkZWZhdWx0IEl0ZW1SZWNvcmRQcmVcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCB7IExpbmsgfSBmcm9tICdyZWFjdC1yb3V0ZXInXG5cbmNvbnN0IE5hdkxpbmsgPSBwcm9wcyA9PiA8TGluayB7Li4ucHJvcHN9IGFjdGl2ZUNsYXNzTmFtZT1cImFjdGl2ZVwiIC8+XG5cbmV4cG9ydCBkZWZhdWx0IE5hdkxpbmtcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcblxuY29uc3QgTm90Rm91bmQgPSAoe3BhcmFtczogeyBzcGxhdCB9IH0pID0+ICg8aDE+eyc0MDQ6ICd9PGNvZGU+e3NwbGF0fTwvY29kZT57JyBub3QgZm91bmQgb24gdGhpcyBzaXRlLid9PC9oMT4pXG5cbmV4cG9ydCBkZWZhdWx0IE5vdEZvdW5kXG5cbiIsImltcG9ydCBSZWFjdCwge0NvbXBvbmVudH0gZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnXG5pbXBvcnQgeyBnZXRXaW5EaW0sIGNvbHVtblN0eWxlIH0gZnJvbSAnd2luLmpzJ1xuXG5jb25zdCBQYW5lID0gKHsgZm9ybWF0LCBwb3NpdGlvbiwgY2hpbGRyZW4sIGhlaWdodCwgd2lkdGggfSkgPT4gKFxuICA8ZGl2XG4gICAgY2xhc3NOYW1lPXtmb3JtYXR9XG4gICAgc3R5bGU9e2NvbHVtblN0eWxlKHBvc2l0aW9uLCB7IGhlaWdodCwgd2lkdGggfSl9XG4gID5cbiAgICB7Y2hpbGRyZW59XG4gIDwvZGl2PlxuKVxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KGdldFdpbkRpbSkoUGFuZSlcbiIsImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCdcbmltcG9ydCB7IFByb3ZpZGVyIH0gZnJvbSAncmVhY3QtcmVkdXgnXG5pbXBvcnQgV2luZG93IGZyb20gJ1dpbmRvdy5qc3gnXG5cbmNvbnN0IFJvb3QgPSAoeyBzdG9yZSwgY2hpbGRyZW4gfSkgPT4gKFxuICA8UHJvdmlkZXIgc3RvcmU9e3N0b3JlfT5cbiAgICA8V2luZG93PlxuICAgICAge2NoaWxkcmVufVxuICAgIDwvV2luZG93PlxuICA8L1Byb3ZpZGVyPlxuKVxuXG5leHBvcnQgZGVmYXVsdCBSb290XG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5cbmNvbnN0IFN0YXQgPSAoe3N1YlRvdGFsLCB0b3RhbH0pID0+IChcbiAgPHNwYW4gY2xhc3NOYW1lPVwiZ29vZC1vXCIgPlxuICAgIHtzdWJUb3RhbCA9PSBudWxsID8gJycgOiBgJHtzdWJUb3RhbH1gfVxuICAgIHsodG90YWwgPT0gbnVsbCB8fCBzdWJUb3RhbCA9PSBudWxsKSA/ICcnIDogJyBvZiAnfVxuICAgIDxzdHJvbmc+e3RvdGFsID09IG51bGwgPyAnJyA6IGAke3RvdGFsfWB9PC9zdHJvbmc+XG4gIDwvc3Bhbj5cbilcblxuZXhwb3J0IGRlZmF1bHQgU3RhdFxuIiwiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IE5hdkxpbmsgZnJvbSAnTmF2TGluay5qc3gnXG5cbmNvbnN0IFN0YXRpYyA9ICgpID0+IChcbiAgPHNwYW4gY2xhc3NOYW1lPVwic21hbGxcIiA+XG4gICAgPE5hdkxpbmsgdG89XCIvZG9jcy9hYm91dC5tZFwiID57J0Fib3V0J308L05hdkxpbms+XG4gICAgPE5hdkxpbmsgdG89XCIvdGVjaC9kb2NzL2Rlc2lnbi5wZGZcIiA+eydkaWFncmFtcyd9PC9OYXZMaW5rPlxuICAgIDxOYXZMaW5rIHRvPVwiL3RlY2gvZG9jcy9kZXBsb3kubWRcIiA+eydkZXBsb3knfTwvTmF2TGluaz5cbiAgICA8YSBocmVmPVwiL2FwaS9maWxlL3RlY2gvZG9jcy9nZW4vaW5kZXguaHRtbFwiIHRhcmdldD1cIl9ibGFua1wiIHJlbD1cIm5vb3BlbmVyIG5vcmVmZXJyZXJcIiA+eyd0ZWNoIGRvYyd9PC9hPlxuICA8L3NwYW4+XG4pXG5cbmV4cG9ydCBkZWZhdWx0IFN0YXRpY1xuXG4iLCJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnXG5pbXBvcnQgTmF2TGluayBmcm9tICdOYXZMaW5rLmpzeCdcbmltcG9ydCBQYW5lIGZyb20gJ1BhbmUuanN4J1xuaW1wb3J0IHsgZ2V0V2luRGltIH0gZnJvbSAnd2luLmpzJ1xuXG5jb25zdCBTdWJBcHAgPSAoe3BhcmFtczogeyB0YWJsZSB9LCBjaGlsZHJlbiwgaGVpZ2h0LCB3aWR0aCB9KSA9PiAoXG4gIDxkaXY+XG4gICAgPFBhbmUgZm9ybWF0PVwibmF2IHNpemVkXCIgcG9zaXRpb249XCJsZWZ0XCI+XG4gICAgICB7KHRhYmxlID09ICdjb250cmliJykgPyAoXG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPHA+PE5hdkxpbmsgdG89e2AvJHt0YWJsZX0vbGlzdGB9ID57J0FsbCBpdGVtcyd9PC9OYXZMaW5rPjwvcD5cbiAgICAgICAgICA8cD48TmF2TGluayB0bz17YC8ke3RhYmxlfS9teWxpc3RgfSA+eydNeSB3b3JrJ308L05hdkxpbms+PC9wPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICkgOiAoXG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPHA+PE5hdkxpbmsgdG89e2AvJHt0YWJsZX0vdHlwZWB9ID57J1R5cGVzJ308L05hdkxpbms+PC9wPlxuICAgICAgICAgIDxwPjxOYXZMaW5rIHRvPXtgLyR7dGFibGV9L2Fzc2Vzc2B9ID57J0NyaXRlcmlhJ308L05hdkxpbms+PC9wPlxuICAgICAgICAgIDxwPjxOYXZMaW5rIHRvPXtgLyR7dGFibGV9L3BhY2thZ2VgfSA+eydQYWNrYWdlcyd9PC9OYXZMaW5rPjwvcD5cbiAgICAgICAgPC9kaXY+XG4gICAgICApfVxuICAgIDwvUGFuZT5cbiAgICA8UGFuZSBmb3JtYXQ9XCJzaXplZFwiIHBvc2l0aW9uPVwicmlnaHRcIj5cbiAgICAgIHsgY2hpbGRyZW4gfVxuICAgIDwvUGFuZT5cbiAgPC9kaXY+XG4pXG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QoZ2V0V2luRGltKShTdWJBcHApXG4iLCJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4J1xuaW1wb3J0IE1hcmtkb3duIGZyb20gJ3JlYWN0LW1hcmtkb3duJ1xuaW1wb3J0IHsgTGluayB9IGZyb20gJ3JlYWN0LXJvdXRlcidcbmltcG9ydCBBbHRlcm5hdGl2ZSBmcm9tICdBbHRlcm5hdGl2ZS5qc3gnXG5pbXBvcnQgeyBmZXRjaERhdGEgfSBmcm9tICdzZXJ2ZXIuanMnXG5pbXBvcnQgeyBnZXREb2MgfSBmcm9tICdkb2MuanMnXG5cbmNvbnN0IFJvdXRlckxpbmsgPSAoeyBjaGlsZHJlbiwgaHJlZiB9KSA9PiAoXG4gIGhyZWYubWF0Y2goL14oaHR0cHM/Oik/XFwvXFwvLylcbiAgICA/IDxhIGhyZWY9e2hyZWZ9ID57Y2hpbGRyZW59PC9hPlxuICAgIDogPExpbmsgdG89e2hyZWZ9ID57Y2hpbGRyZW59PC9MaW5rPlxuKVxuXG5jbGFzcyBEb2NNZCBleHRlbmRzIENvbXBvbmVudCB7XG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7cHJvcHM6IHsgZG9jTmFtZSwgZGF0YSB9IH0gPSB0aGlzXG4gICAgY29uc3QgY29udHJvbFBsYWNlbWVudCA9IGNvbnRyb2wgPT4gPHAgc3R5bGU9e3tmbG9hdDogJ3JpZ2h0J319ID57Y29udHJvbH08L3A+XG4gICAgY29uc3QgY29udHJvbDEgPSBoYW5kbGVyID0+IDxhIGNsYXNzTmFtZT1cImNvbnRyb2wgZmEgZmEtaGFuZC1vLWRvd25cIiBocmVmPVwiI1wiIHRpdGxlPVwibWFya2Rvd24gc291cmNlXCIgb25DbGljaz17aGFuZGxlcn0gLz5cbiAgICBjb25zdCBjb250cm9sMiA9IGhhbmRsZXIgPT4gPGEgY2xhc3NOYW1lPVwiY29udHJvbCBmYSBmYS1maWxlLWNvZGUtb1wiIGhyZWY9XCIjXCIgdGl0bGU9XCJmb3JtYXR0ZWRcIiBvbkNsaWNrPXtoYW5kbGVyfSAvPlxuXG4gICAgaWYgKGRhdGEgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIDxkaXY+e2BObyBkb2N1bWVudCAke2RvY05hbWV9YH08L2Rpdj5cbiAgICB9XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgc3R5bGU9e3twYWRkaW5nTGVmdDogJzAuNWVtJ319ID5cbiAgICAgICAgPEFsdGVybmF0aXZlXG4gICAgICAgICAgdGFnPXtkb2NOYW1lfVxuICAgICAgICAgIGNvbnRyb2xQbGFjZW1lbnQ9e2NvbnRyb2xQbGFjZW1lbnR9XG4gICAgICAgICAgY29udHJvbHM9e1tjb250cm9sMSwgY29udHJvbDJdfVxuICAgICAgICAgIGFsdGVybmF0aXZlcz17WyhcbiAgICAgICAgICAgIDxkaXYga2V5PVwiZm10XCIgPlxuICAgICAgICAgICAgICA8TWFya2Rvd25cbiAgICAgICAgICAgICAgICBzb3VyY2U9e2RhdGF9XG4gICAgICAgICAgICAgICAgcmVuZGVyZXJzPXt7TGluazogUm91dGVyTGlua319XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApLCAoXG4gICAgICAgICAgICA8ZGl2IGtleT1cInNyY1wiID5cbiAgICAgICAgICAgICAgPHByZSBjbGFzc05hbWU9XCJtZC1zb3VyY2VcIiA+e2RhdGF9PC9wcmU+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApXX1cbiAgICAgICAgLz5cbiAgICAgIDwvZGl2PlxuICAgIClcbiAgfVxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICBjb25zdCB7cHJvcHM6IHsgZG9jRGlyLCBkb2NOYW1lLCBkb2NFeHQsIGZldGNoIH0gfSA9IHRoaXNcbiAgICBjb25zdCBwYXRoID0gYCR7ZG9jRGlyfS8ke2RvY05hbWV9LiR7ZG9jRXh0fWBcbiAgICBmZXRjaCh7IHR5cGU6ICdmZXRjaERvYycsIGNvbnRlbnRUeXBlOiAnanNvbicsIHBhdGgsIGRlc2M6IGBkb2N1bWVudCAke2RvY05hbWV9YCB9KVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QoZ2V0RG9jLCB7IGZldGNoOiBmZXRjaERhdGEgfSkoRG9jTWQpXG4iLCJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnXG5pbXBvcnQgSXRlbUxpc3QgZnJvbSAnSXRlbUxpc3QuanN4J1xuaW1wb3J0IEZpbHRlciBmcm9tICdGaWx0ZXIuanN4J1xuaW1wb3J0IFBhbmUgZnJvbSAnUGFuZS5qc3gnXG5cbmltcG9ydCB7IHNldHVwRmlsdGVyaW5nLCBnZXRGaWx0ZXJBcHBsaWVkIH0gZnJvbSAnZmlsdGVyLmpzJ1xuXG5jbGFzcyBGaWx0ZXJDb21wdXRlIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcbiAgICBzdXBlcigpXG4gICAgY29uc3QgeyB0YWJsZXMsIHRhYmxlLCBpbml0aWFsaXplZCwgaW5pdCB9ID0gcHJvcHNcbiAgICBpZiAoIWluaXRpYWxpemVkKSB7aW5pdCh0YWJsZSwgdGFibGVzKX1cbiAgfVxuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBwcm9wczogeyBpbml0aWFsaXplZCB9IH0gPSB0aGlzXG4gICAgaWYgKCFpbml0aWFsaXplZCkge3JldHVybiA8ZGl2Lz59XG4gICAgY29uc3QgeyBwcm9wczogeyB0YWJsZXMsIHRhYmxlLCBmaWx0ZXJlZERhdGEsIGZpbHRlcmVkQW1vdW50T3RoZXJzLCBhbW91bnRzfSB9ID0gdGhpc1xuICAgIGNvbnN0IHsgW3RhYmxlXTogeyBvcmRlciwgdGl0bGUgfSB9ID0gdGFibGVzXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIDxQYW5lIGZvcm1hdD1cInNpemVkXCIgcG9zaXRpb249XCJyaWdodExlZnRcIj5cbiAgICAgICAgICA8cD57J1RvdGFsICd9PHNwYW4gY2xhc3NOYW1lPVwiZ29vZC1vXCIgPntvcmRlci5sZW5ndGh9PC9zcGFuPjwvcD5cbiAgICAgICAgICA8RmlsdGVyXG4gICAgICAgICAgICB0YWJsZT17dGFibGV9XG4gICAgICAgICAgICBmaWx0ZXJlZEFtb3VudD17ZmlsdGVyZWREYXRhLmxlbmd0aH1cbiAgICAgICAgICAgIGZpbHRlcmVkQW1vdW50T3RoZXJzPXtmaWx0ZXJlZEFtb3VudE90aGVyc31cbiAgICAgICAgICAgIGFtb3VudHM9e2Ftb3VudHN9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9QYW5lPlxuICAgICAgICA8UGFuZSBmb3JtYXQ9XCJzaXplZFwiIHBvc2l0aW9uPVwicmlnaHRSaWdodFwiPlxuICAgICAgICAgIDxJdGVtTGlzdCB0YWJsZT17dGFibGV9IHRpdGxlPXt0aXRsZX0gZmlsdGVyZWREYXRhPXtmaWx0ZXJlZERhdGF9IGlucGxhY2U9e3RydWV9IC8+XG4gICAgICAgIDwvUGFuZT5cbiAgICAgIDwvZGl2PlxuICAgIClcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KGdldEZpbHRlckFwcGxpZWQsIHsgaW5pdDogc2V0dXBGaWx0ZXJpbmcgfSkoRmlsdGVyQ29tcHV0ZSlcbiIsImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCdcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCdcblxuaW1wb3J0IEZpbHRlckNvbXB1dGUgZnJvbSAnRmlsdGVyQ29tcHV0ZS5qc3gnXG5pbXBvcnQgeyBmZXRjaERhdGEgfSBmcm9tICdzZXJ2ZXIuanMnXG5pbXBvcnQgeyBnZXRUYWJsZXMgfSBmcm9tICd0YWJsZXMuanMnXG5cbmNsYXNzIEl0ZW1GaWx0ZXJlZCBleHRlbmRzIENvbXBvbmVudCB7XG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7IHByb3BzOiB7IHBhcmFtczogeyB0YWJsZSB9LCB0YWJsZXMgfSB9ID0gdGhpc1xuICAgIGlmICh0YWJsZXMgPT0gbnVsbCB8fCB0YWJsZXNbdGFibGVdID09IG51bGwgfHwgdGFibGVzLmNvdW50cnkgPT0gbnVsbCB8fCB0YWJsZXMudXNlciA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gPGRpdiAvPlxuICAgIH1cbiAgICByZXR1cm4gKFxuICAgICAgPEZpbHRlckNvbXB1dGUgdGFibGU9e3RhYmxlfSAvPlxuICAgIClcbiAgfVxuICBjb21wb25lbnREaWRNb3VudCgpIHtcbiAgICBjb25zdCB7IHByb3BzOiB7IHBhcmFtczogeyB0YWJsZSB9LCB0YWJsZXMsIGZldGNoLCB9IH0gPSB0aGlzXG4gICAgaWYgKHRhYmxlcyA9PSBudWxsIHx8IHRhYmxlc1t0YWJsZV0gPT0gbnVsbCkge1xuICAgICAgZmV0Y2goeyB0eXBlOiAnZmV0Y2hUYWJsZScsIGNvbnRlbnRUeXBlOiAnZGInLCBwYXRoOiBgL2xpc3Q/dGFibGU9JHt0YWJsZX1gLCBkZXNjOiBgJHt0YWJsZX0gdGFibGV9YCwgdGFibGUgfSlcbiAgICB9XG4gICAgaWYgKHRhYmxlcyA9PSBudWxsIHx8IHRhYmxlcy5jb3VudHJ5ID09IG51bGwpIHtcbiAgICAgIGZldGNoKHsgdHlwZTogJ2ZldGNoVGFibGUnLCBjb250ZW50VHlwZTogJ2RiJywgcGF0aDogYC9tZW1iZXJfY291bnRyeWAsIGRlc2M6IGBjb3VudHJ5IHRhYmxlfWAsIHRhYmxlOiAnY291bnRyeScgfSlcbiAgICB9XG4gICAgaWYgKHRhYmxlcyA9PSBudWxsIHx8IHRhYmxlcy51c2VyID09IG51bGwpIHtcbiAgICAgIGZldGNoKHsgdHlwZTogJ2ZldGNoVGFibGUnLCBjb250ZW50VHlwZTogJ2RiJywgcGF0aDogYC91c2VyYCwgZGVzYzogYHVzZXIgdGFibGV9YCwgdGFibGU6ICd1c2VyJyB9KVxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KGdldFRhYmxlcywgeyBmZXRjaDogZmV0Y2hEYXRhIH0pKEl0ZW1GaWx0ZXJlZClcbiIsImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCdcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCdcbmltcG9ydCB7IGZldGNoRGF0YSB9IGZyb20gJ3NlcnZlci5qcydcbmltcG9ydCB7IGdldFRhYmxlcyB9IGZyb20gJ3RhYmxlcy5qcydcblxuaW1wb3J0IEl0ZW1MaXN0IGZyb20gJ0l0ZW1MaXN0LmpzeCdcbmltcG9ydCBQYW5lIGZyb20gJ1BhbmUuanN4J1xuXG5jbGFzcyBJdGVtTXkgZXh0ZW5kcyBDb21wb25lbnQge1xuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge1xuICAgICAgcHJvcHM6IHsgcGFyYW1zOiB7IHRhYmxlIH0sIHRhYmxlcywgY2hpbGRyZW4gfSxcbiAgICB9ID0gdGhpc1xuICAgIGlmIChcbiAgICAgIHRhYmxlcyA9PSBudWxsIHx8IHRhYmxlc1t0YWJsZV0gPT0gbnVsbCB8fCB0YWJsZXNbdGFibGVdLm15ID09IG51bGwgfHxcbiAgICAgIHRhYmxlcy5jb3VudHJ5ID09IG51bGwgfHwgdGFibGVzLnVzZXIgPT0gbnVsbFxuICAgICkge1xuICAgICAgcmV0dXJuIDxkaXYgLz5cbiAgICB9XG4gICAgY29uc3QgeyBlbnRpdGllcywgdGl0bGUsIHBlcm0sIG15IH0gPSB0YWJsZXNbdGFibGVdXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIDxQYW5lIGZvcm1hdD1cIm5hdiBzaXplZFwiIHBvc2l0aW9uPVwicmlnaHRMZWZ0TmF2XCI+XG4gICAgICAgICAgPHA+XG4gICAgICAgICAgICB7YCR7bXkubGVuZ3RofSBpdGVtcyBgfVxuICAgICAgICAgICAgeyhwZXJtICE9IG51bGwgJiYgcGVybS5pbnNlcnQpID8gKFxuICAgICAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImZhIGZhLXBsdXMgYnV0dG9uLWxhcmdlIGluc2VydFwiXG4gICAgICAgICAgICAgICAgdGl0bGU9XCJOZXcgaXRlbVwiXG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICApIDogbnVsbH1cbiAgICAgICAgICA8L3A+XG4gICAgICAgICAgPEl0ZW1MaXN0IHRhYmxlPXt0YWJsZX0gdGl0bGU9e3RpdGxlfSBmaWx0ZXJlZERhdGE9e215fSBpbnBsYWNlPXtmYWxzZX0gLz5cbiAgICAgICAgPC9QYW5lPlxuICAgICAgICA8UGFuZSBmb3JtYXQ9XCJzaXplZFwiIHBvc2l0aW9uPVwicmlnaHRSaWdodEJvZHlcIj5cbiAgICAgICAgICB7IGNoaWxkcmVuIH1cbiAgICAgICAgPC9QYW5lPlxuICAgICAgPC9kaXY+XG4gICAgKVxuICB9XG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIGNvbnN0IHtcbiAgICAgIHByb3BzOiB7XG4gICAgICAgIHBhcmFtczogeyB0YWJsZSB9LFxuICAgICAgICB0YWJsZXMsXG4gICAgICAgIGZldGNoLFxuICAgICAgfSxcbiAgICB9ID0gdGhpc1xuICAgIGlmICh0YWJsZXMgPT0gbnVsbCB8fCB0YWJsZXNbdGFibGVdID09IG51bGwgfHwgdGFibGVzW3RhYmxlXS5teSA9PSBudWxsKSB7XG4gICAgICBmZXRjaCh7IHR5cGU6ICdmZXRjaFRhYmxlTXknLCBjb250ZW50VHlwZTogJ2RiJywgcGF0aDogYC9teT90YWJsZT0ke3RhYmxlfWAsIGRlc2M6IGAke3RhYmxlfSB0YWJsZSAobXkgcmVjb3Jkcyl9YCwgdGFibGUgfSlcbiAgICB9XG4gICAgaWYgKHRhYmxlcyA9PSBudWxsIHx8IHRhYmxlcy5jb3VudHJ5ID09IG51bGwpIHtcbiAgICAgIGZldGNoKHsgdHlwZTogJ2ZldGNoVGFibGUnLCBjb250ZW50VHlwZTogJ2RiJywgcGF0aDogYC9tZW1iZXJfY291bnRyeWAsIGRlc2M6IGBjb3VudHJ5IHRhYmxlfWAsIHRhYmxlOiAnY291bnRyeScgfSlcbiAgICB9XG4gICAgaWYgKHRhYmxlcyA9PSBudWxsIHx8IHRhYmxlcy51c2VyID09IG51bGwpIHtcbiAgICAgIGZldGNoKHsgdHlwZTogJ2ZldGNoVGFibGUnLCBjb250ZW50VHlwZTogJ2RiJywgcGF0aDogYC91c2VyYCwgZGVzYzogYHVzZXIgdGFibGV9YCwgdGFibGU6ICd1c2VyJyB9KVxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KGdldFRhYmxlcywgeyBmZXRjaDogZmV0Y2hEYXRhIH0pKEl0ZW1NeSlcblxuXG4iLCJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnXG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnXG5cbmltcG9ydCB7IGZldGNoRGF0YSB9IGZyb20gJ3NlcnZlci5qcydcbmltcG9ydCB7IGdldFRhYmxlcyB9IGZyb20gJ3RhYmxlcy5qcydcblxuaW1wb3J0IEl0ZW1GaWVsZCBmcm9tICdJdGVtRmllbGQuanN4J1xuXG5jbGFzcyBJdGVtUmVjb3JkIGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgcGFyc2VGaWVsZHMoKSB7XG4gICAgY29uc3QgeyBwcm9wczogeyB0YWJsZXMsIHRhYmxlLCBlSWQgfSB9ID0gdGhpc1xuICAgIGNvbnN0IHsgW3RhYmxlXTogeyBmaWVsZFNwZWNzLCBmaWVsZE9yZGVyIH0gfSA9IHRhYmxlc1xuICAgIGNvbnN0IGVudGl0eSA9IHRoaXMuZ2V0RW50aXR5KClcbiAgICBjb25zdCB7IHBlcm0sIGZpZWxkcywgdmFsdWVzIH0gPSBlbnRpdHlcblxuICAgIGNvbnN0IGZyYWdtZW50cyA9IFtdXG4gICAgbGV0IGhhc0VkaXRhYmxlID0gZmFsc2VcbiAgICBmb3IgKGNvbnN0IG5hbWUgb2YgZmllbGRPcmRlcikge1xuICAgICAgY29uc3QgeyBbbmFtZV06IGYgfSA9IGZpZWxkc1xuICAgICAgaWYgKGYgPT0gbnVsbCkge2NvbnRpbnVlfVxuICAgICAgY29uc3QgeyBbbmFtZV06IHsgbGFiZWwsIGluaXRpYWwsIC4uLnNwZWNzIH0gfSA9IGZpZWxkU3BlY3NcbiAgICAgIGNvbnN0IHsgdXBkYXRlOiB7IFtuYW1lXTogZWRpdGFibGUgfSB9ID0gcGVybVxuICAgICAgaWYgKGVkaXRhYmxlKSB7aGFzRWRpdGFibGUgPSB0cnVlfVxuICAgICAgZnJhZ21lbnRzLnB1c2goXG4gICAgICAgIDxJdGVtRmllbGRcbiAgICAgICAgICBrZXk9e25hbWV9XG4gICAgICAgICAgdGFibGU9e3RhYmxlfVxuICAgICAgICAgIGVJZD17ZUlkfVxuICAgICAgICAgIGVkaXRhYmxlPXshIWVkaXRhYmxlfVxuICAgICAgICAgIG5hbWU9e25hbWV9XG4gICAgICAgICAgbGFiZWw9e2xhYmVsfVxuICAgICAgICAgIHZhbHVlcz17dmFsdWVzW25hbWVdfVxuICAgICAgICAgIGluaXRpYWw9e2luaXRpYWx9XG4gICAgICAgICAgey4uLnNwZWNzfVxuICAgICAgICAvPlxuICAgICAgKVxuICAgIH1cbiAgICByZXR1cm4ge2ZyYWdtZW50cywgaGFzRWRpdGFibGV9XG4gIH1cblxuICBnZXRFbnRpdHkgPSAoKSA9PiB7XG4gICAgY29uc3QgeyBwcm9wczogeyB0YWJsZXMsIHRhYmxlLCBlSWQgIH0gfSA9IHRoaXNcbiAgICBjb25zdCB7IFt0YWJsZV06IHsgZW50aXRpZXM6IHsgW2VJZF06IGVudGl0eSB9IH0gfSA9IHRhYmxlc1xuICAgIHJldHVybiBlbnRpdHlcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7XG4gICAgICBwcm9wczogeyB0YWJsZXMsIHRhYmxlLCBlSWQgfSxcbiAgICB9ID0gdGhpc1xuICAgIGlmICh0aGlzLm5lZWRWYWx1ZXMoKSkge1xuICAgICAgcmV0dXJuIDxkaXYgLz5cbiAgICB9XG5cbiAgICBjb25zdCBlbnRpdHkgPSB0aGlzLmdldEVudGl0eSgpXG4gICAgY29uc3QgeyBwZXJtOiBwZXJtIH0gPSBlbnRpdHlcbiAgICBjb25zdCB7IGZyYWdtZW50cywgaGFzRWRpdGFibGUgfSA9IHRoaXMucGFyc2VGaWVsZHMoKVxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIndpZGdldC1tZWRpdW1cIiA+XG4gICAgICAgIDxwPnJlY29yZCBpbiB7dGFibGV9PC9wPlxuICAgICAgICA8cD5cbiAgICAgICAgICB7aGFzRWRpdGFibGUgPyBbXG4gICAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgICBrZXk9XCJzYXZlXCJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgYnV0dG9uLWxhcmdlYH1cbiAgICAgICAgICAgID5TYXZlPC9zcGFuPixcbiAgICAgICAgICAgIHBlcm0uZGVsZXRlID8gKFxuICAgICAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgICAgIGtleT1cImRlbGV0ZVwiXG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXsnZmEgZmEtdHJhc2ggYnV0dG9uLWxhcmdlIGRlbGV0ZSd9XG4gICAgICAgICAgICAgICAgdGl0bGU9XCJkZWxldGUgdGhpcyBpdGVtXCJcbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICkgOiBudWxsLFxuICAgICAgICAgIF0gOiBudWxsfVxuICAgICAgICA8L3A+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAge2ZyYWdtZW50c31cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApXG4gIH1cbiAgZmV0Y2hFbnRpdHkoKSB7XG4gICAgY29uc3QgeyBwcm9wczogeyB0YWJsZSwgZUlkLCBvd25Pbmx5LCBmZXRjaCB9IH0gPSB0aGlzXG4gICAgaWYgKHRoaXMubmVlZFZhbHVlcygpKSB7XG4gICAgICBmZXRjaCh7XG4gICAgICAgIHR5cGU6ICdmZXRjaEl0ZW0nLFxuICAgICAgICBjb250ZW50VHlwZTogJ2RiJyxcbiAgICAgICAgcGF0aDogYC92aWV3P3RhYmxlPSR7dGFibGV9JmlkPSR7ZUlkfSR7b3duT25seSA/ICcmb3duPXRydWUnIDogJyd9YCxcbiAgICAgICAgZGVzYzogYCR7dGFibGV9IHJlY29yZCAke2VJZH1gLFxuICAgICAgICB0YWJsZSxcbiAgICAgIH0pXG4gICAgfVxuICB9XG4gIG5lZWRWYWx1ZXMoKSB7XG4gICAgY29uc3QgeyBwcm9wczogeyB0YWJsZXMsIHRhYmxlLCBlSWQgfSB9ID0gdGhpc1xuICAgIHJldHVybiAodGFibGVzID09IG51bGwgfHwgdGFibGVzW3RhYmxlXSA9PSBudWxsIHx8IHRhYmxlc1t0YWJsZV0uZW50aXRpZXNbZUlkXSA9PSBudWxsIHx8ICF0YWJsZXNbdGFibGVdLmVudGl0aWVzW2VJZF0uY29tcGxldGUpXG4gIH1cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgaWYgKHRoaXMubmVlZFZhbHVlcygpKSB7dGhpcy5mZXRjaEVudGl0eSgpfVxuICB9XG4gIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHMpIHtcbiAgICBjb25zdCB7IHRhYmxlOiBwcmV2VGFibGUsIGVJZDogcHJldkVJZCB9ID0gcHJldlByb3BzXG4gICAgY29uc3QgeyBwcm9wczogeyB0YWJsZSwgZUlkIH0gfSA9IHRoaXNcbiAgICBpZiAoKHRhYmxlICE9IHByZXZUYWJsZSB8fCBlSWQgIT0gcHJldkVJZCkgJiYgdGhpcy5uZWVkVmFsdWVzKCkpIHt0aGlzLmZldGNoRW50aXR5KCl9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChnZXRUYWJsZXMsIHsgZmV0Y2g6IGZldGNoRGF0YSB9KShJdGVtUmVjb3JkKVxuXG4iLCJpbXBvcnQgUmVhY3QsIHtDb21wb25lbnR9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4J1xuaW1wb3J0IHsgZmV0Y2hEYXRhIH0gZnJvbSAnc2VydmVyLmpzJ1xuaW1wb3J0IHsgZ2V0TWUgfSBmcm9tICdtZS5qcydcblxuY2xhc3MgTG9naW4gZXh0ZW5kcyBDb21wb25lbnQge1xuICByZW5kZXIoKSB7XG4gICAgY29uc3QgeyBwcm9wczogeyBtZSB9IH0gPSB0aGlzXG4gICAgcmV0dXJuIChcbiAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImxvZ2luXCIgPntcbiAgICAgICAgbWUuZXBwbiAmJiBPYmplY3Qua2V5cyhtZSkubGVuZ3RoID4gMCA/IChcbiAgICAgICAgICA8c3Bhbj5cbiAgICAgICAgICAgIDxzdHJvbmcgY2xhc3NOYW1lPVwiZmEgZmEtdXNlclwiIHRpdGxlPXttZS5lcHBufSA+e21lLmVwcG4uc3BsaXQoJ0AnKVswXX08L3N0cm9uZz5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImZhIGZhLWhhc2h0YWdcIiAvPnttZS5hdXRob3JpdHl9eycgJ31cbiAgICAgICAgICAgIDxlbT57bWUuZ3JvdXBEZXNjIHx8ICdub3QgYXV0aGVudGljYXRlZCd9PC9lbT5cbiAgICAgICAgICAgIDxhIGhyZWY9XCIvbG9nb3V0XCIgY2xhc3NOYW1lPVwiY29udHJvbCBmYSBmYS11c2VyLXRpbWVzXCIgdGl0bGU9XCJsb2cgb3V0XCIgLz5cbiAgICAgICAgICAgIDxhIGhyZWY9XCIvc2xvZ291dFwiIGNsYXNzTmFtZT1cImNvbnRyb2wgZmEgZmEtdXNlcnNcIiB0aXRsZT1cInNpZ24gb3V0XCIgLz5cbiAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICkgOiAoXG4gICAgICAgICAgPGEgaHJlZj1cIi9sb2dpblwiIGNsYXNzTmFtZT1cImNvbnRyb2wgZmEgZmEtdXNlci1wbHVzXCIgPnsnIGxvZ2luJ308L2E+XG4gICAgICAgICl9XG4gICAgICA8L3NwYW4+XG4gICAgKVxuICB9XG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIGNvbnN0IHsgcHJvcHM6IHsgZmV0Y2ggfSB9ID0gdGhpc1xuICAgIGZldGNoKHsgdHlwZTogJ2ZldGNoTWUnLCBjb250ZW50VHlwZTogJ2RiJywgcGF0aDogJy93aG8vYW1pJywgZGVzYzogJ21lJyB9KVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNvbm5lY3QoZ2V0TWUsIHsgZmV0Y2g6IGZldGNoRGF0YSB9KShMb2dpbilcblxuIiwiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IG1lbW9CaW5kIGZyb20gJ21lbW9CaW5kLmpzJ1xuXG5jb25zdCBlbXB0eSA9IFtdXG5cbmNsYXNzIE5vdGlmaWNhdGlvbiBleHRlbmRzIENvbXBvbmVudCB7XG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpXG4gICAgdGhpcy5tc2dzID0gW10gLy8gc3luY2hyb25vdXMgbGlzdCBvZiBtZXNzYWdlc1xuICAgIHRoaXMudmlzaWJsZSA9IGZhbHNlXG4gICAgdGhpcy5kb20gPSB7fVxuICB9XG4gIG5vdGlmeShtc2cpIHtcbiAgICB0aGlzLm1zZ3MucHVzaChtc2cpIC8vIHN5bmNocm9ub3VzIGFkZGl0aW9uIG9mIG1zZ1xuICAgIHRoaXMuc2V0U3RhdGUoe21zZ3M6IFsuLi4odGhpcy5tc2dzKV19KSAvLyBhc3luY2hyb25vdXMgdXBkYXRlIG9mIHRoZSBzdGF0ZVxuICB9XG4gIGNsZWFyKCkge1xuICAgIHRoaXMubXNncyA9IFtdIC8vIHN5bmNocm9ub3VzIGNsZWFyaW5nIG9mIG1zZ1xuICAgIHRoaXMuc2V0U3RhdGUoe21zZ3M6IFtdfSkgLy8gYXN5bmNocm9ub3VzIHVwZGF0ZSBvZiB0aGUgc3RhdGVcbiAgfVxuICBjb21wdXRlUHJvZ3Jlc3MoKSB7XG4gICAgY29uc3QgbGFzdE1zZyA9IHRoaXMubXNncy5sZW5ndGggLSAxXG4gICAgbGV0IGxhc3ROb3RlID0gLTFcbiAgICBsZXQgbGFzdEtpbmQgPSAnaW5mbydcbiAgICBsZXQgYnVzeSA9IDBcbiAgICB0aGlzLm1zZ3MuZm9yRWFjaCgobXNnLCBpKSA9PiB7XG4gICAgICBpZiAobXNnLmtpbmQgPT0gJ2Vycm9yJykge2xhc3ROb3RlID0gaTsgbGFzdEtpbmQgPSAnZXJyb3InfVxuICAgICAgZWxzZSBpZiAobXNnLmtpbmQgPT0gJ3dhcm5pbmcnKSB7XG4gICAgICAgIGlmIChsYXN0S2luZCAhPSAnZXJyb3InKSB7bGFzdE5vdGUgPSBpOyBsYXN0S2luZCA9ICd3YXJuaW5nJ31cbiAgICAgIH1cbiAgICAgIGJ1c3kgKz0gbXNnLmJ1c3kgfHwgMFxuICAgIH0pXG4gICAgaWYgKGJ1c3kgPCAwKSB7XG4gICAgICAvL3dhcm4oYFNIT1VMRCBOT1QgSEFQUEVOOiBuZWdhdGl2ZSB2YWx1ZSBmb3IgYnVzeSAke2J1c3l9YClcbiAgICAgIGJ1c3kgPSAwXG4gICAgfVxuICAgIGNvbnN0IHZpc2libGUgPSB0aGlzLnZpc2libGUgfHwgKGxhc3ROb3RlID4gLTEpXG4gICAgcmV0dXJuIFtsYXN0TXNnLCBsYXN0Tm90ZSwgbGFzdEtpbmQsIGJ1c3ksIHZpc2libGVdXG4gIH1cbiAgcmVmRG9tID0gbGFiZWwgPT4gZG9tID0+IHtcbiAgICBpZiAoZG9tKSB7dGhpcy5kb21bbGFiZWxdID0gZG9tfVxuICB9XG5cbiAgbm90aWZpY2F0aW9uSGFuZGxlciA9IGFjdGlvbiA9PiBldmVudCA9PiB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuICAgIGlmIChhY3Rpb24gPT0gbnVsbCkge1xuICAgICAgdGhpcy5jbGVhcigpXG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgdGhpcy5zZXRWaWV3KGFjdGlvbilcbiAgICB9XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgW3RoaXMubGFzdE1zZywgdGhpcy5sYXN0Tm90ZSwgdGhpcy5sYXN0S2luZCwgdGhpcy5idXN5LCB0aGlzLnZpc2libGVdID0gdGhpcy5jb21wdXRlUHJvZ3Jlc3MoKVxuICAgIGNvbnN0IGJ1c3lCbG9ja3MgPSBuZXcgQXJyYXkodGhpcy5idXN5KS5maWxsKDEpXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIDxwIGNsYXNzTmFtZT1cIm1zZy1zcGlubmVyXCIgPlxuICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICB0aXRsZT1cInNob3cvaGlkZSBub3RpZmljYXRpb25zIGFuZCBwcm9ncmVzcyBtZXNzYWdlc1wiXG4gICAgICAgICAgICBjbGFzc05hbWU9e3RoaXMubGFzdE5vdGUgPiAtMSA/IGBzcGluLSR7dGhpcy5sYXN0S2luZH1gIDogJ3NwaW4tb2snfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHsgYnVzeUJsb2Nrcy5tYXAoKGIsIGkpID0+IDxzcGFuIGtleT17aX0gY2xhc3NOYW1lPVwibXNnLWRvdCBmYSBmYS1jYXJldC1sZWZ0XCIgLz4pIH1cbiAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17YGZhIGZhLSR7dGhpcy5idXN5ID09IDAgPyAnY2lyY2xlLW8nIDogJ3NwaW5uZXIgZmEtc3Bpbid9YH1cbiAgICAgICAgICAgICAgb25DbGljaz17bWVtb0JpbmQodGhpcywgJ25vdGlmaWNhdGlvbkhhbmRsZXInLCBbIXRoaXMudmlzaWJsZV0pfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L3NwYW4+XG4gICAgICAgIDwvcD5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIHJlZj17bWVtb0JpbmQodGhpcywgJ3JlZkRvbScsIFsnbm90Ym94J10pfVxuICAgICAgICAgIGNsYXNzTmFtZT1cIm1zZy1ib3hcIlxuICAgICAgICAgIG9uQ2xpY2s9e21lbW9CaW5kKHRoaXMsICdub3RpZmljYXRpb25IYW5kbGVyJywgW2ZhbHNlXSl9XG4gICAgICAgID57XG4gICAgICAgICAgKHRoaXMubXNncyB8fCBlbXB0eSkubWFwKChtc2csIGluZGV4KSA9PiAoXG4gICAgICAgICAgICA8cFxuICAgICAgICAgICAgICB0aXRsZT17bXNnLmNhdXNlfVxuICAgICAgICAgICAgICBrZXk9e2luZGV4fVxuICAgICAgICAgICAgICByZWY9e21lbW9CaW5kKHRoaXMsICdyZWZEb20nLCBbYG0ke2luZGV4fWBdKX1cbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgbXNnLWxpbmUgJHtbbXNnLmtpbmRdfS1vICR7KG1zZy5raW5kICE9ICdpbmZvJykgPyAnbXNnLWhpZ2gnIDogJyd9YH1cbiAgICAgICAgICAgID57bXNnLnRleHR9PC9wPlxuICAgICAgICAgICkpXG4gICAgICAgIH1cbiAgICAgICAgICA8cCBjbGFzc05hbWU9XCJtc2ctZGlzbWlzc1wiID57JyhjbGljayBwYW5lbCB0byBoaWRlKSd9PC9wPlxuICAgICAgICAgIDxwIGNsYXNzTmFtZT1cIm1zZy10cmFzaFwiID5cbiAgICAgICAgICAgIDxhXG4gICAgICAgICAgICAgIGhyZWY9XCIjXCJcbiAgICAgICAgICAgICAgdGl0bGU9XCJjbGVhciBtZXNzYWdlc1wiXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cImNvbnRyb2wgZmEgZmEtdHJhc2hcIlxuICAgICAgICAgICAgICBvbkNsaWNrPXttZW1vQmluZCh0aGlzLCAnbm90aWZpY2F0aW9uSGFuZGxlcicsIFtudWxsXSl9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvcD5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApXG4gIH1cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgdGhpcy5zZXRWaWV3KClcbiAgfVxuICBjb21wb25lbnREaWRVcGRhdGUoKSB7XG4gICAgdGhpcy5zZXRWaWV3KClcbiAgfVxuICBzZXRWaWV3KG9uKSB7XG4gICAgaWYgKG9uICE9IG51bGwpIHtcbiAgICAgIHRoaXMudmlzaWJsZSA9IG9uXG4gICAgfVxuICAgIHRoaXMuZG9tLm5vdGJveC5zdHlsZS5kaXNwbGF5ID0gdGhpcy52aXNpYmxlID8gJ2Jsb2NrJyA6ICdub25lJ1xuICAgIHRoaXMuc2V0U2Nyb2xsKClcbiAgfVxuICBzZXRTY3JvbGwoKSB7XG4gICAgaWYgKHRoaXMudmlzaWJsZSkge1xuICAgICAgaWYgKHRoaXMubGFzdE5vdGUgPiAtMSkge1xuICAgICAgICB0aGlzLmRvbVtgbSR7dGhpcy5sYXN0Tm90ZX1gXS5zY3JvbGxJbnRvVmlldygpXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgaWYgKHRoaXMubGFzdE1zZyA+IC0xKSB7XG4gICAgICAgICAgdGhpcy5kb21bYG0ke3RoaXMubGFzdE1zZ31gXS5zY3JvbGxJbnRvVmlldygpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgTm90aWZpY2F0aW9uXG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIFByb3BUeXBlcywgQ2hpbGRyZW4gfSBmcm9tICdyZWFjdCdcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCdcbmltcG9ydCB0aHJvdHRsZSBmcm9tICdsb2Rhc2gvdGhyb3R0bGUnXG5pbXBvcnQgeyBnZXRXaW5EaW0sIGNoYW5nZVdpbkRpbSB9IGZyb20gJ3dpbi5qcydcblxuY2xhc3MgV2luZG93IGV4dGVuZHMgQ29tcG9uZW50IHtcbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgcHJvcHM6IHsgY2hpbGRyZW4gfSB9ID0gdGhpc1xuICAgIHJldHVybiBDaGlsZHJlbi5vbmx5KGNoaWxkcmVuKVxuICB9XG4gIG5ld1dpbmRvd1NpemUgPSB0aHJvdHRsZShldmVudCA9PiB7XG4gICAgY29uc3QgeyBwcm9wczogeyByZXNpemUgfSB9ID0gdGhpc1xuICAgIHJlc2l6ZSgpXG4gIH0sIDEwMDApXG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIiwgdGhpcy5uZXdXaW5kb3dTaXplKVxuICB9XG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKFwicmVzaXplXCIsIHRoaXMubmV3V2luZG93U2l6ZSlcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjb25uZWN0KGdldFdpbkRpbSwgeyByZXNpemU6IGNoYW5nZVdpbkRpbSB9KShXaW5kb3cpXG4iXX0=
