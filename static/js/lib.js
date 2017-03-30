require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/array/from"), __esModule: true };
},{"core-js/library/fn/array/from":7}],2:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/json/stringify"), __esModule: true };
},{"core-js/library/fn/json/stringify":8}],3:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/symbol"), __esModule: true };
},{"core-js/library/fn/symbol":9}],4:[function(require,module,exports){
module.exports = { "default": require("core-js/library/fn/symbol/iterator"), __esModule: true };
},{"core-js/library/fn/symbol/iterator":10}],5:[function(require,module,exports){
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
},{"../core-js/array/from":1}],6:[function(require,module,exports){
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
},{"../core-js/symbol":3,"../core-js/symbol/iterator":4}],7:[function(require,module,exports){
require('../../modules/es6.string.iterator');
require('../../modules/es6.array.from');
module.exports = require('../../modules/_core').Array.from;
},{"../../modules/_core":17,"../../modules/es6.array.from":73,"../../modules/es6.string.iterator":76}],8:[function(require,module,exports){
var core  = require('../../modules/_core')
  , $JSON = core.JSON || (core.JSON = {stringify: JSON.stringify});
module.exports = function stringify(it){ // eslint-disable-line no-unused-vars
  return $JSON.stringify.apply($JSON, arguments);
};
},{"../../modules/_core":17}],9:[function(require,module,exports){
require('../../modules/es6.symbol');
require('../../modules/es6.object.to-string');
require('../../modules/es7.symbol.async-iterator');
require('../../modules/es7.symbol.observable');
module.exports = require('../../modules/_core').Symbol;
},{"../../modules/_core":17,"../../modules/es6.object.to-string":75,"../../modules/es6.symbol":77,"../../modules/es7.symbol.async-iterator":78,"../../modules/es7.symbol.observable":79}],10:[function(require,module,exports){
require('../../modules/es6.string.iterator');
require('../../modules/web.dom.iterable');
module.exports = require('../../modules/_wks-ext').f('iterator');
},{"../../modules/_wks-ext":70,"../../modules/es6.string.iterator":76,"../../modules/web.dom.iterable":80}],11:[function(require,module,exports){
module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};
},{}],12:[function(require,module,exports){
module.exports = function(){ /* empty */ };
},{}],13:[function(require,module,exports){
var isObject = require('./_is-object');
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};
},{"./_is-object":35}],14:[function(require,module,exports){
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
},{"./_to-index":62,"./_to-iobject":64,"./_to-length":65}],15:[function(require,module,exports){
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
},{"./_cof":16,"./_wks":71}],16:[function(require,module,exports){
var toString = {}.toString;

module.exports = function(it){
  return toString.call(it).slice(8, -1);
};
},{}],17:[function(require,module,exports){
var core = module.exports = {version: '2.4.0'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef
},{}],18:[function(require,module,exports){
'use strict';
var $defineProperty = require('./_object-dp')
  , createDesc      = require('./_property-desc');

module.exports = function(object, index, value){
  if(index in object)$defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};
},{"./_object-dp":46,"./_property-desc":56}],19:[function(require,module,exports){
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
},{"./_a-function":11}],20:[function(require,module,exports){
// 7.2.1 RequireObjectCoercible(argument)
module.exports = function(it){
  if(it == undefined)throw TypeError("Can't call method on  " + it);
  return it;
};
},{}],21:[function(require,module,exports){
// Thank's IE8 for his funny defineProperty
module.exports = !require('./_fails')(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});
},{"./_fails":26}],22:[function(require,module,exports){
var isObject = require('./_is-object')
  , document = require('./_global').document
  // in old IE typeof document.createElement is 'object'
  , is = isObject(document) && isObject(document.createElement);
module.exports = function(it){
  return is ? document.createElement(it) : {};
};
},{"./_global":27,"./_is-object":35}],23:[function(require,module,exports){
// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');
},{}],24:[function(require,module,exports){
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
},{"./_object-gops":51,"./_object-keys":54,"./_object-pie":55}],25:[function(require,module,exports){
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
},{"./_core":17,"./_ctx":19,"./_global":27,"./_hide":29}],26:[function(require,module,exports){
module.exports = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};
},{}],27:[function(require,module,exports){
// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef
},{}],28:[function(require,module,exports){
var hasOwnProperty = {}.hasOwnProperty;
module.exports = function(it, key){
  return hasOwnProperty.call(it, key);
};
},{}],29:[function(require,module,exports){
var dP         = require('./_object-dp')
  , createDesc = require('./_property-desc');
module.exports = require('./_descriptors') ? function(object, key, value){
  return dP.f(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};
},{"./_descriptors":21,"./_object-dp":46,"./_property-desc":56}],30:[function(require,module,exports){
module.exports = require('./_global').document && document.documentElement;
},{"./_global":27}],31:[function(require,module,exports){
module.exports = !require('./_descriptors') && !require('./_fails')(function(){
  return Object.defineProperty(require('./_dom-create')('div'), 'a', {get: function(){ return 7; }}).a != 7;
});
},{"./_descriptors":21,"./_dom-create":22,"./_fails":26}],32:[function(require,module,exports){
// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = require('./_cof');
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
  return cof(it) == 'String' ? it.split('') : Object(it);
};
},{"./_cof":16}],33:[function(require,module,exports){
// check on default Array iterator
var Iterators  = require('./_iterators')
  , ITERATOR   = require('./_wks')('iterator')
  , ArrayProto = Array.prototype;

module.exports = function(it){
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};
},{"./_iterators":41,"./_wks":71}],34:[function(require,module,exports){
// 7.2.2 IsArray(argument)
var cof = require('./_cof');
module.exports = Array.isArray || function isArray(arg){
  return cof(arg) == 'Array';
};
},{"./_cof":16}],35:[function(require,module,exports){
module.exports = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};
},{}],36:[function(require,module,exports){
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
},{"./_an-object":13}],37:[function(require,module,exports){
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
},{"./_hide":29,"./_object-create":45,"./_property-desc":56,"./_set-to-string-tag":58,"./_wks":71}],38:[function(require,module,exports){
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
},{"./_export":25,"./_has":28,"./_hide":29,"./_iter-create":37,"./_iterators":41,"./_library":43,"./_object-gpo":52,"./_redefine":57,"./_set-to-string-tag":58,"./_wks":71}],39:[function(require,module,exports){
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
},{"./_wks":71}],40:[function(require,module,exports){
module.exports = function(done, value){
  return {value: value, done: !!done};
};
},{}],41:[function(require,module,exports){
module.exports = {};
},{}],42:[function(require,module,exports){
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
},{"./_object-keys":54,"./_to-iobject":64}],43:[function(require,module,exports){
module.exports = true;
},{}],44:[function(require,module,exports){
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
},{"./_fails":26,"./_has":28,"./_is-object":35,"./_object-dp":46,"./_uid":68}],45:[function(require,module,exports){
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

},{"./_an-object":13,"./_dom-create":22,"./_enum-bug-keys":23,"./_html":30,"./_object-dps":47,"./_shared-key":59}],46:[function(require,module,exports){
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
},{"./_an-object":13,"./_descriptors":21,"./_ie8-dom-define":31,"./_to-primitive":67}],47:[function(require,module,exports){
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
},{"./_an-object":13,"./_descriptors":21,"./_object-dp":46,"./_object-keys":54}],48:[function(require,module,exports){
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
},{"./_descriptors":21,"./_has":28,"./_ie8-dom-define":31,"./_object-pie":55,"./_property-desc":56,"./_to-iobject":64,"./_to-primitive":67}],49:[function(require,module,exports){
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

},{"./_object-gopn":50,"./_to-iobject":64}],50:[function(require,module,exports){
// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys      = require('./_object-keys-internal')
  , hiddenKeys = require('./_enum-bug-keys').concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
  return $keys(O, hiddenKeys);
};
},{"./_enum-bug-keys":23,"./_object-keys-internal":53}],51:[function(require,module,exports){
exports.f = Object.getOwnPropertySymbols;
},{}],52:[function(require,module,exports){
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
},{"./_has":28,"./_shared-key":59,"./_to-object":66}],53:[function(require,module,exports){
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
},{"./_array-includes":14,"./_has":28,"./_shared-key":59,"./_to-iobject":64}],54:[function(require,module,exports){
// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys       = require('./_object-keys-internal')
  , enumBugKeys = require('./_enum-bug-keys');

module.exports = Object.keys || function keys(O){
  return $keys(O, enumBugKeys);
};
},{"./_enum-bug-keys":23,"./_object-keys-internal":53}],55:[function(require,module,exports){
exports.f = {}.propertyIsEnumerable;
},{}],56:[function(require,module,exports){
module.exports = function(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
};
},{}],57:[function(require,module,exports){
module.exports = require('./_hide');
},{"./_hide":29}],58:[function(require,module,exports){
var def = require('./_object-dp').f
  , has = require('./_has')
  , TAG = require('./_wks')('toStringTag');

module.exports = function(it, tag, stat){
  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
};
},{"./_has":28,"./_object-dp":46,"./_wks":71}],59:[function(require,module,exports){
var shared = require('./_shared')('keys')
  , uid    = require('./_uid');
module.exports = function(key){
  return shared[key] || (shared[key] = uid(key));
};
},{"./_shared":60,"./_uid":68}],60:[function(require,module,exports){
var global = require('./_global')
  , SHARED = '__core-js_shared__'
  , store  = global[SHARED] || (global[SHARED] = {});
module.exports = function(key){
  return store[key] || (store[key] = {});
};
},{"./_global":27}],61:[function(require,module,exports){
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
},{"./_defined":20,"./_to-integer":63}],62:[function(require,module,exports){
var toInteger = require('./_to-integer')
  , max       = Math.max
  , min       = Math.min;
module.exports = function(index, length){
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};
},{"./_to-integer":63}],63:[function(require,module,exports){
// 7.1.4 ToInteger
var ceil  = Math.ceil
  , floor = Math.floor;
module.exports = function(it){
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};
},{}],64:[function(require,module,exports){
// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = require('./_iobject')
  , defined = require('./_defined');
module.exports = function(it){
  return IObject(defined(it));
};
},{"./_defined":20,"./_iobject":32}],65:[function(require,module,exports){
// 7.1.15 ToLength
var toInteger = require('./_to-integer')
  , min       = Math.min;
module.exports = function(it){
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};
},{"./_to-integer":63}],66:[function(require,module,exports){
// 7.1.13 ToObject(argument)
var defined = require('./_defined');
module.exports = function(it){
  return Object(defined(it));
};
},{"./_defined":20}],67:[function(require,module,exports){
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
},{"./_is-object":35}],68:[function(require,module,exports){
var id = 0
  , px = Math.random();
module.exports = function(key){
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};
},{}],69:[function(require,module,exports){
var global         = require('./_global')
  , core           = require('./_core')
  , LIBRARY        = require('./_library')
  , wksExt         = require('./_wks-ext')
  , defineProperty = require('./_object-dp').f;
module.exports = function(name){
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
};
},{"./_core":17,"./_global":27,"./_library":43,"./_object-dp":46,"./_wks-ext":70}],70:[function(require,module,exports){
exports.f = require('./_wks');
},{"./_wks":71}],71:[function(require,module,exports){
var store      = require('./_shared')('wks')
  , uid        = require('./_uid')
  , Symbol     = require('./_global').Symbol
  , USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function(name){
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;
},{"./_global":27,"./_shared":60,"./_uid":68}],72:[function(require,module,exports){
var classof   = require('./_classof')
  , ITERATOR  = require('./_wks')('iterator')
  , Iterators = require('./_iterators');
module.exports = require('./_core').getIteratorMethod = function(it){
  if(it != undefined)return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};
},{"./_classof":15,"./_core":17,"./_iterators":41,"./_wks":71}],73:[function(require,module,exports){
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

},{"./_create-property":18,"./_ctx":19,"./_export":25,"./_is-array-iter":33,"./_iter-call":36,"./_iter-detect":39,"./_to-length":65,"./_to-object":66,"./core.get-iterator-method":72}],74:[function(require,module,exports){
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
},{"./_add-to-unscopables":12,"./_iter-define":38,"./_iter-step":40,"./_iterators":41,"./_to-iobject":64}],75:[function(require,module,exports){

},{}],76:[function(require,module,exports){
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
},{"./_iter-define":38,"./_string-at":61}],77:[function(require,module,exports){
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
},{"./_an-object":13,"./_descriptors":21,"./_enum-keys":24,"./_export":25,"./_fails":26,"./_global":27,"./_has":28,"./_hide":29,"./_is-array":34,"./_keyof":42,"./_library":43,"./_meta":44,"./_object-create":45,"./_object-dp":46,"./_object-gopd":48,"./_object-gopn":50,"./_object-gopn-ext":49,"./_object-gops":51,"./_object-keys":54,"./_object-pie":55,"./_property-desc":56,"./_redefine":57,"./_set-to-string-tag":58,"./_shared":60,"./_to-iobject":64,"./_to-primitive":67,"./_uid":68,"./_wks":71,"./_wks-define":69,"./_wks-ext":70}],78:[function(require,module,exports){
require('./_wks-define')('asyncIterator');
},{"./_wks-define":69}],79:[function(require,module,exports){
require('./_wks-define')('observable');
},{"./_wks-define":69}],80:[function(require,module,exports){
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
},{"./_global":27,"./_hide":29,"./_iterators":41,"./_wks":71,"./es6.array.iterator":74}],81:[function(require,module,exports){
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

},{}],82:[function(require,module,exports){
var overArg = require('./_overArg');

/** Built-in value references. */
var getPrototype = overArg(Object.getPrototypeOf, Object);

module.exports = getPrototype;

},{"./_overArg":83}],83:[function(require,module,exports){
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

},{}],84:[function(require,module,exports){
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

},{}],85:[function(require,module,exports){
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

},{"./_getPrototype":82,"./isObjectLike":84}],86:[function(require,module,exports){
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
},{"./diff":88,"./helpers":89}],87:[function(require,module,exports){
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
},{}],88:[function(require,module,exports){
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
},{"deep-diff":81}],89:[function(require,module,exports){
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
},{}],90:[function(require,module,exports){
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
},{"./core":86,"./defaults":87,"./helpers":89}],91:[function(require,module,exports){
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
},{}],92:[function(require,module,exports){
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
},{"./compose":95}],93:[function(require,module,exports){
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
},{}],94:[function(require,module,exports){
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
},{"./createStore":96,"./utils/warning":98,"lodash/isPlainObject":85}],95:[function(require,module,exports){
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
},{}],96:[function(require,module,exports){
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
},{"lodash/isPlainObject":85,"symbol-observable":99}],97:[function(require,module,exports){
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
},{"./applyMiddleware":92,"./bindActionCreators":93,"./combineReducers":94,"./compose":95,"./createStore":96,"./utils/warning":98}],98:[function(require,module,exports){
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
},{}],99:[function(require,module,exports){
module.exports = require('./lib/index');

},{"./lib/index":100}],100:[function(require,module,exports){
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

},{"./ponyfill":101}],101:[function(require,module,exports){
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
},{}],"configureStore.js":[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _redux=require('redux');var _reduxThunk=require('redux-thunk');var _reduxThunk2=_interopRequireDefault(_reduxThunk);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}var configureStore=function configureStore(reducer){var middlewares=[_reduxThunk2.default];if("development"==='development'){var _require=require('redux-logger'),createLogger=_require.createLogger;middlewares.push(createLogger())}var store=(0,_redux.createStore)(reducer,_redux.applyMiddleware.apply(undefined,middlewares));return store};exports.default=configureStore;
},{"redux":97,"redux-logger":90,"redux-thunk":91}],"europe.geo.js":[function(require,module,exports){
"use strict";Object.defineProperty(exports,"__esModule",{value:true});var countryBorders=exports.countryBorders={"features":[{"geometry":{"coordinates":[],"type":"Polygon"},"type":"Feature","properties":{"iso2":"AD","lng":1.5,"lat":42.5}},{"geometry":{"coordinates":[[[19.4,41],[19.5,41.3],[19.5,41.6],[19.6,41.7],[19.5,41.8],[19.4,41.9],[19.3,41.9],[19.4,42.1],[19.5,42.4],[19.6,42.6],[19.7,42.7],[19.7,42.5],[19.9,42.5],[20.1,42.6],[20.2,42.5],[20.2,42.3],[20.4,42.3],[20.5,42.2],[20.6,41.9],[20.5,41.7],[20.5,41.5],[20.5,41.4],[20.5,41.2],[20.6,41.1],[20.7,40.9],[20.9,40.9],[21,40.8],[21.1,40.7],[21,40.6],[20.9,40.5],[20.8,40.4],[20.7,40.3],[20.7,40.1],[20.5,40.1],[20.3,40],[20.4,39.9],[20.3,39.8],[20.2,39.6],[20.1,39.7],[20,39.8],[19.9,39.9],[19.8,40.1],[19.6,40.1],[19.4,40.2],[19.3,40.4],[19.5,40.3],[19.5,40.6],[19.3,40.6],[19.4,40.7],[19.4,40.9],[19.5,41],[19.4,41]]],"type":"Polygon"},"type":"Feature","properties":{"iso2":"AL","lng":20,"lat":41}},{"geometry":{"coordinates":[[[[45.2,41.2],[45.1,41.1],[45.4,41],[45.6,40.8],[45.5,40.7],[45.4,40.6],[45.6,40.4],[45.9,40.3],[46,40.2],[45.9,40],[45.7,40],[45.8,39.9],[45.9,39.8],[46,39.7],[46.2,39.6],[46.4,39.6],[46.5,39.5],[46.4,39.4],[46.6,39.2],[46.4,39.2],[46.5,39],[46.4,38.9],[46.2,38.9],[46.1,38.9],[46,39.3],[45.8,39.4],[45.8,39.6],[45.6,39.6],[45.5,39.5],[45.3,39.6],[45,39.8],[44.9,39.7],[44.7,39.7],[44.6,39.9],[44.5,40],[44.3,40],[44,40],[43.7,40.1],[43.7,40.2],[43.6,40.4],[43.7,40.5],[43.7,40.7],[43.7,40.8],[43.6,41],[43.5,41.1],[43.7,41.1],[43.8,41.2],[44,41.2],[44.2,41.2],[44.4,41.2],[44.6,41.2],[44.8,41.2],[45,41.3],[45.1,41.2],[45.2,41.2]]],[]],"type":"MultiPolygon"},"type":"Feature","properties":{"iso2":"AM","lng":45,"lat":40}},{"geometry":{"coordinates":[[[13.8,48.8],[14.2,48.6],[14.6,48.6],[14.9,48.8],[15.1,49],[15.5,49],[15.8,48.9],[16.4,48.7],[16.7,48.8],[16.9,48.6],[16.9,48.3],[17.1,48.1],[17.1,47.8],[16.8,47.7],[16.4,47.7],[16.7,47.5],[16.4,47.2],[16.3,47],[15.8,46.7],[15.1,46.6],[14.8,46.5],[13.9,46.5],[13.6,46.6],[12.8,46.7],[12.5,46.7],[12.1,47],[11.8,47],[11.2,47],[10.9,46.8],[10.6,46.8],[10.3,46.9],[9.9,46.9],[9.6,47.2],[9.7,47.5],[10,47.5],[10.4,47.4],[10.4,47.6],[10.9,47.5],[11.5,47.5],[12,47.6],[12.5,47.7],[12.7,47.7],[13.1,47.6],[12.9,47.8],[12.8,48],[13.2,48.3],[13.4,48.5],[13.7,48.6],[13.8,48.8]]],"type":"Polygon"},"type":"Feature","properties":{"iso2":"AT","lng":13.3,"lat":47.3}},{"geometry":{"coordinates":[[[[46.6,41.9],[46.9,41.7],[47.3,41.4],[47.7,41.2],[48,41.4],[48.5,41.8],[48.8,41.7],[49.1,41.3],[49.2,41],[49.5,40.7],[49.9,40.6],[50.4,40.4],[50.1,40.4],[49.5,40.2],[49.4,39.9],[49.3,39.4],[49.2,39.3],[49.1,39.1],[49,39],[48.9,38.5],[48.7,38.4],[48.3,38.6],[48.1,38.8],[48.2,39],[48.1,39.2],[48.3,39.4],[48.2,39.6],[47.8,39.7],[47.3,39.4],[46.9,39.2],[46.7,39],[46.5,39.1],[46.6,39.3],[46.5,39.6],[46.1,39.7],[45.8,39.8],[45.6,40],[46,40.3],[45.5,40.5],[45.5,40.8],[45.3,41],[45.1,41.2],[45.1,41.4],[45.4,41.5],[45.9,41.2],[46.3,41.2],[46.5,41],[46.7,41.3],[46.2,41.6],[46.4,41.8],[46.6,41.9]]],[[[45.1,39.8],[45.3,39.6],[45.3,39.5],[45.5,39.5],[45.6,39.5],[45.6,39.6],[45.7,39.6],[45.8,39.6],[45.8,39.5],[45.8,39.4],[45.9,39.3],[46,39.3],[46,39.2],[46.1,38.9],[46.2,38.8],[46,38.9],[45.8,38.9],[45.6,39],[45.5,39],[45.4,39],[45.4,39.1],[45.3,39.2],[45.2,39.2],[45.1,39.2],[45.1,39.3],[45.1,39.4],[45,39.4],[44.9,39.5],[44.9,39.6],[44.8,39.6],[44.8,39.7],[44.9,39.7],[45,39.7],[45,39.8],[45.1,39.8]]],[],[]],"type":"MultiPolygon"},"type":"Feature","properties":{"iso2":"AZ","lng":47.5,"lat":40.5}},{"geometry":{"coordinates":[[[17.6,42.9],[17.4,43.2],[17.3,43.5],[17,43.5],[16.8,43.7],[16.6,43.9],[16.4,44.1],[16.2,44.2],[16.2,44.4],[16,44.7],[15.7,44.8],[15.8,45.2],[16.1,45.1],[16.4,45],[16.6,45.2],[16.9,45.3],[17.2,45.1],[17.5,45.1],[17.8,45.1],[18.1,45.1],[18.4,45.1],[18.8,44.9],[19.1,44.9],[19.4,44.9],[19.2,44.6],[19.1,44.3],[19.5,44.1],[19.5,44],[19.2,44],[19.5,43.8],[19.4,43.6],[19,43.6],[19,43.4],[19,43.2],[18.8,43.3],[18.7,43.1],[18.5,43],[18.6,42.7],[18.4,42.6],[18.2,42.7],[17.8,42.9],[17.6,42.9]]],"type":"Polygon"},"type":"Feature","properties":{"iso2":"BA","lng":18,"lat":44}},{"geometry":{"coordinates":[[[4.3,51.3],[4.4,51.4],[4.5,51.5],[4.5,51.4],[4.7,51.4],[4.8,51.5],[4.9,51.4],[5,51.5],[5.1,51.4],[5.2,51.3],[5.4,51.3],[5.6,51.3],[5.8,51.2],[5.9,51.1],[5.8,51],[5.6,50.9],[5.7,50.8],[5.9,50.8],[6.1,50.7],[6.3,50.6],[6.3,50.5],[6.4,50.3],[6.2,50.2],[6.1,50.1],[5.9,50.1],[5.7,49.9],[5.8,49.8],[5.9,49.6],[5.8,49.5],[5.6,49.5],[5.4,49.6],[5,49.8],[4.8,50],[4.9,50.1],[4.8,50.2],[4.7,50],[4.4,49.9],[4.2,50],[4.2,50.1],[4.2,50.3],[4,50.3],[3.8,50.4],[3.7,50.5],[3.5,50.5],[3.3,50.5],[3.2,50.8],[3,50.8],[2.8,50.8],[2.6,50.9],[2.5,51.1],[2.9,51.2],[3,51.3],[3.2,51.3],[3.4,51.3],[3.5,51.2],[3.6,51.3],[3.8,51.3],[3.9,51.2],[4.1,51.3],[4.2,51.4],[4.3,51.3]]],"type":"Polygon"},"type":"Feature","properties":{"iso2":"BE","lng":4,"lat":50.8}},{"geometry":{"coordinates":[[[27.9,42.8],[27.6,42.6],[27.5,42.4],[27.8,42.2],[28,42],[27.6,42],[27.3,42.1],[27,42],[26.5,41.8],[26.4,41.7],[26.2,41.5],[25.9,41.3],[25.5,41.3],[25.1,41.4],[24.6,41.4],[24.3,41.6],[24.1,41.5],[23.7,41.4],[23.3,41.4],[23,41.3],[23,41.6],[22.9,41.9],[22.5,42.1],[22.6,42.5],[22.4,42.8],[23,43.1],[22.8,43.4],[22.5,43.5],[22.5,44.1],[22.9,44.1],[22.8,43.9],[23.1,43.8],[23.4,43.9],[24,43.7],[24.4,43.7],[24.6,43.7],[25,43.7],[25.4,43.6],[25.8,43.7],[26.1,44],[26.7,44.1],[27.1,44.1],[27.5,44],[27.9,44],[28.1,43.8],[28.5,43.7],[28.6,43.4],[28.2,43.4],[27.9,43.2],[27.9,42.8]]],"type":"Polygon"},"type":"Feature","properties":{"iso2":"BG","lng":25,"lat":43}},{"geometry":{"coordinates":[[[26.6,55.7],[27,55.8],[27.6,55.8],[27.9,56.1],[28.3,56],[28.7,56],[29.1,56],[29.4,55.8],[30,55.9],[30.8,55.6],[30.9,55.2],[30.9,54.9],[31.1,54.6],[31.3,54.2],[31.9,54],[32.1,53.8],[32.5,53.6],[32.5,53.2],[32,53.1],[31.4,53.2],[31.5,52.9],[31.6,52.5],[31.8,52.1],[31.3,52.1],[31,52],[30.6,51.6],[30.4,51.4],[29.9,51.5],[29.4,51.4],[29.1,51.6],[28.7,51.5],[28.3,51.6],[28,51.6],[27.7,51.6],[27.2,51.7],[26.9,51.8],[26.4,51.8],[26,51.9],[25.4,51.9],[25,51.9],[24.3,51.7],[23.7,51.7],[23.5,51.7],[23.7,52],[23.2,52.3],[23.7,52.6],[23.9,53],[23.6,53.7],[23.8,53.9],[24.2,54],[24.5,54],[24.9,54.1],[25.3,54.3],[25.5,54.2],[25.8,54.3],[25.7,54.6],[25.9,54.9],[26.3,55.1],[26.6,55.3],[26.6,55.7]]],"type":"Polygon"},"type":"Feature","properties":{"iso2":"BY","lng":28,"lat":53}},{"geometry":{"coordinates":[[[7.7,47.5],[8,47.6],[8.3,47.6],[8.6,47.6],[8.4,47.7],[8.7,47.8],[8.9,47.7],[9.3,47.7],[9.7,47.5],[9.5,47.3],[9.6,47.1],[9.9,46.9],[10.2,46.9],[10.4,47],[10.5,46.6],[10.3,46.5],[10.1,46.6],[10,46.4],[10.2,46.3],[9.9,46.4],[9.7,46.3],[9.5,46.4],[9.3,46.5],[9.3,46.3],[9.1,46.1],[9,45.9],[8.9,45.9],[8.8,46.1],[8.6,46.1],[8.4,46.3],[8.5,46.5],[8.3,46.4],[8.1,46.1],[7.9,45.9],[7.7,46],[7.5,45.9],[7.2,45.9],[7,46],[6.8,46.2],[6.7,46.5],[6.3,46.4],[6.3,46.3],[6,46.1],[6.1,46.2],[6.1,46.6],[6.4,46.8],[6.5,47],[6.7,47.1],[7,47.3],[7,47.5],[7.3,47.4],[7.5,47.5],[7.7,47.6],[7.7,47.5]]],"type":"Polygon"},"type":"Feature","properties":{"iso2":"CH","lng":8,"lat":47}},{"geometry":{"coordinates":[[[33.7,35.4],[33.9,35.4],[34.3,35.6],[34.5,35.7],[34.6,35.6],[34.3,35.5],[34.1,35.4],[33.9,35.3],[34,35.1],[34.1,35],[33.9,34.9],[33.8,35],[33.6,34.9],[33.5,34.8],[33.3,34.7],[33.1,34.7],[33,34.6],[32.9,34.7],[32.8,34.6],[32.7,34.7],[32.5,34.7],[32.4,34.8],[32.3,35],[32.4,35],[32.5,35.1],[32.6,35.2],[32.8,35.2],[32.9,35.2],[32.9,35.4],[33.3,35.3],[33.5,35.3],[33.7,35.4]]],"type":"Polygon"},"type":"Feature","properties":{"iso2":"CY","lng":33,"lat":35}},{"geometry":{"coordinates":[[[14.7,48.6],[14.4,48.6],[14.1,48.7],[13.8,48.8],[13.6,48.9],[13.4,49],[13.2,49.2],[12.8,49.3],[12.6,49.6],[12.5,49.9],[12.3,50],[12.2,50.2],[12.3,50.2],[12.6,50.4],[12.8,50.5],[13.1,50.5],[13.3,50.6],[13.5,50.7],[13.9,50.8],[14.3,50.9],[14.3,51.1],[14.6,50.9],[14.8,50.9],[15.2,51],[15.4,50.8],[15.8,50.7],[16.1,50.6],[16.3,50.7],[16.3,50.5],[16.4,50.4],[16.5,50.2],[16.7,50.1],[16.9,50.2],[16.9,50.3],[17.2,50.4],[17.4,50.3],[17.8,50.3],[17.6,50.2],[17.8,50],[18.1,50.1],[18.4,49.9],[18.6,49.8],[18.8,49.6],[18.7,49.5],[18.4,49.3],[18.2,49.2],[18.1,49],[17.7,48.9],[17.4,48.8],[17.1,48.8],[16.9,48.6],[16.7,48.7],[16.5,48.8],[16.3,48.7],[15.8,48.9],[15.5,48.9],[15.3,49],[15,49],[14.9,48.8],[14.7,48.6]]],"type":"Polygon"},"type":"Feature","properties":{"iso2":"CZ","lng":15.5,"lat":49.8}},{"geometry":{"coordinates":[[[[11,54.4],[10.8,53.9],[11.6,54],[12.4,54.4],[12.5,54.2],[13.7,54.2],[14.3,53.7],[14.2,52.8],[14.5,52.4],[14.7,51.7],[15,51.4],[14.6,50.9],[14,50.8],[13.2,50.6],[12.6,50.4],[12.3,50.1],[12.6,49.5],[13.4,49],[13.8,48.6],[13.4,48.4],[13,47.9],[13,47.5],[12.2,47.6],[11.1,47.4],[10.5,47.5],[9.7,47.6],[8.8,47.7],[8.6,47.7],[7.8,47.6],[7.6,48.1],[8.1,48.8],[7.6,49.1],[6.9,49.2],[6.5,49.7],[6.1,50.1],[6.3,50.6],[5.9,51],[6.2,51.6],[6.6,51.9],[6.9,52.2],[6.9,52.4],[7,52.6],[7.2,53.3],[7.2,53.6],[8,53.7],[8.3,53.4],[8.5,53.7],[9.2,53.9],[9.8,53.5],[8.9,54.1],[8.7,54.4],[8.7,54.8],[8.4,55],[9.3,54.8],[10,54.6],[10.7,54.3],[11,54.4]]],[[[13.4,54.6],[13.5,54.6],[13.6,54.6],[13.7,54.6],[13.7,54.5],[13.6,54.5],[13.6,54.4],[13.7,54.4],[13.7,54.3],[13.5,54.3],[13.4,54.3],[13.4,54.2],[13.3,54.2],[13.3,54.3],[13.2,54.3],[13.1,54.3],[13.1,54.4],[13.2,54.4],[13.3,54.4],[13.2,54.5],[13.1,54.5],[13.2,54.6],[13.3,54.6],[13.4,54.5],[13.5,54.5],[13.2,54.7],[13.3,54.7],[13.4,54.7],[13.4,54.6]]],[[[14,54.1],[14.1,54],[14.2,53.9],[14.1,53.9],[14,53.9],[14,53.8],[13.9,53.8],[13.8,53.9],[13.9,53.9],[14,54],[13.9,54.1],[13.9,54],[13.8,54],[13.8,54.1],[13.8,54.2],[14,54.1]]],[],[],[],[]],"type":"MultiPolygon"},"type":"Feature","properties":{"iso2":"DE","lng":9,"lat":51}},{"geometry":{"coordinates":[[[[10.4,57.6],[10.4,57.5],[10.5,57.5],[10.5,57.4],[10.5,57.2],[10.4,57.2],[10.4,57.1],[10.3,57],[10.2,57],[10.1,57],[10,57.1],[9.5,57],[9.3,57],[9.2,57],[9.1,57],[9.1,57.1],[9,57],[8.9,57],[8.8,57],[8.8,56.9],[8.7,57],[8.7,56.9],[8.6,56.9],[8.6,56.8],[8.5,56.8],[8.5,56.7],[8.4,56.7],[8.6,56.7],[8.6,56.6],[8.5,56.6],[8.2,56.7],[8.2,56.8],[8.3,56.8],[8.3,56.9],[8.4,56.9],[8.5,57],[8.6,57.1],[8.7,57.1],[8.8,57.1],[8.9,57.1],[9,57.2],[9.2,57.1],[9.3,57.1],[9.4,57.2],[9.5,57.2],[9.6,57.2],[9.6,57.3],[9.7,57.4],[9.8,57.4],[9.8,57.5],[9.9,57.6],[10,57.6],[10.1,57.6],[10.2,57.6],[10.3,57.6],[10.4,57.7],[10.5,57.7],[10.6,57.7],[10.5,57.6],[10.4,57.6]]],[[[10,57.1],[10.3,57],[10.3,56.7],[9.9,56.6],[10.4,56.7],[10.2,56.6],[10.5,56.5],[10.9,56.5],[10.7,56.2],[10.6,56.1],[10.5,56.3],[10.2,56.1],[10.3,55.9],[10.1,55.8],[9.9,55.8],[9.8,55.7],[9.8,55.6],[9.7,55.3],[9.5,55.2],[9.6,55],[9.8,54.9],[9.6,54.9],[9.4,54.8],[9.2,54.9],[8.7,54.9],[8.6,55.1],[8.6,55.2],[8.6,55.4],[8.4,55.5],[8.1,55.5],[8.2,55.8],[8.1,56],[8.3,55.9],[8.3,56.1],[8.1,56.3],[8.2,56.6],[8.4,56.6],[8.6,56.5],[8.8,56.6],[8.9,56.8],[9.2,56.7],[9,56.6],[9.3,56.5],[9.3,56.7],[9.4,57],[9.7,57],[9.9,57.1],[10,57.1]]],[[[12.6,56],[12.6,55.9],[12.6,55.7],[12.5,55.6],[12.3,55.6],[12.2,55.4],[12.4,55.4],[12.5,55.3],[12.2,55.2],[12,55.1],[12.2,55.1],[12.1,55],[11.9,55],[11.7,55.1],[11.8,55.2],[11.6,55.2],[11.4,55.2],[11.2,55.2],[11.2,55.4],[11.1,55.7],[10.9,55.7],[11.3,55.7],[11.5,55.9],[11.3,56],[11.6,55.9],[11.7,56],[11.8,55.9],[11.8,55.8],[11.9,55.9],[12,55.8],[12.1,55.7],[11.9,55.7],[11.9,56],[12.3,56.1],[12.6,56]]],[[[10.7,55.5],[10.8,55.4],[10.8,55.3],[10.8,55.2],[10.8,55.1],[10.7,55.1],[10.6,55.1],[10.5,55],[10.2,55.1],[10.1,55.1],[10.1,55.2],[10,55.2],[9.9,55.3],[9.8,55.4],[9.8,55.5],[9.7,55.5],[9.9,55.5],[10,55.5],[10.1,55.6],[10.2,55.6],[10.3,55.6],[10.4,55.6],[10.5,55.5],[10.4,55.5],[10.4,55.4],[10.5,55.4],[10.6,55.5],[10.6,55.6],[10.7,55.6],[10.7,55.5]]],[[[11.5,54.8],[11.6,54.8],[11.6,54.9],[11.7,54.9],[11.8,54.8],[11.9,54.7],[11.8,54.7],[11.8,54.6],[11.7,54.6],[11.7,54.7],[11.6,54.7],[11.5,54.6],[11.4,54.6],[11.4,54.7],[11.3,54.7],[11.2,54.7],[11.1,54.7],[11,54.8],[11,54.9],[11.1,54.9],[11.1,55],[11.2,55],[11.3,54.9],[11.4,54.9],[11.5,54.8]]],[[[12,54.9],[12.1,54.9],[12.2,54.8],[12.1,54.8],[12,54.7],[12,54.6],[11.9,54.6],[11.9,54.7],[11.9,54.8],[11.8,54.8],[11.8,54.9],[11.7,54.9],[11.7,55],[11.8,55],[11.9,55],[11.9,54.9],[12,54.9]]],[]],"type":"MultiPolygon"},"type":"Feature","properties":{"iso2":"DK","lng":10,"lat":56}},{"geometry":{"coordinates":[[[[25.8,59.6],[26.1,59.6],[26.5,59.5],[26.7,59.6],[26.9,59.5],[27.2,59.4],[27.6,59.4],[28,59.4],[28.1,59.4],[28.1,59.3],[27.9,59.2],[27.7,59],[27.4,58.8],[27.5,58.5],[27.5,58.2],[27.7,58.1],[27.8,57.8],[27.5,57.8],[27.4,57.6],[27.1,57.6],[26.7,57.6],[26.5,57.5],[26,57.8],[25.6,57.9],[25.3,58.1],[25.2,58.1],[25,58],[24.5,58],[24.3,57.9],[24.5,58.2],[24.5,58.4],[24.3,58.3],[24.1,58.3],[23.8,58.4],[23.6,58.5],[23.6,58.7],[23.8,58.8],[23.4,58.9],[23.6,59],[23.4,59.1],[23.6,59.2],[23.8,59.3],[24,59.4],[24.3,59.4],[24.5,59.5],[24.8,59.6],[25.2,59.5],[25.5,59.6],[25.7,59.6],[25.8,59.6]]],[[[23,58.6],[23.1,58.6],[23.3,58.5],[23.3,58.4],[23.2,58.4],[23.1,58.4],[23,58.4],[22.8,58.2],[22.6,58.2],[22.5,58.2],[22.4,58.2],[22.3,58.2],[22.3,58.1],[22.2,58],[22.1,57.9],[22,57.9],[22,58],[22.1,58.1],[22.2,58.1],[22.2,58.2],[22.1,58.2],[21.9,58.3],[21.8,58.3],[22,58.3],[22,58.4],[21.9,58.5],[21.8,58.5],[22,58.5],[22.1,58.5],[22.2,58.5],[22.3,58.6],[22.5,58.6],[22.6,58.6],[22.8,58.6],[22.9,58.6],[23,58.6]]],[[[22.7,59],[22.8,59],[22.9,59],[23,59],[23,58.9],[23,58.8],[22.9,58.8],[22.8,58.8],[22.7,58.8],[22.7,58.7],[22.6,58.7],[22.5,58.7],[22.5,58.8],[22.4,58.8],[22.4,58.9],[22.3,58.9],[22.2,58.9],[22.1,58.9],[22,58.9],[22.1,59],[22.4,59],[22.5,59],[22.6,59.1],[22.7,59.1],[22.7,59]]],[],[],[]],"type":"MultiPolygon"},"type":"Feature","properties":{"iso2":"EE","lng":26,"lat":59}},{"geometry":{"coordinates":[[[[-7.9,43.8],[-7.2,43.6],[-6.3,43.6],[-5.6,43.6],[-4.9,43.4],[-4.2,43.4],[-3.2,43.4],[-2.5,43.3],[-1.8,43.3],[-1.4,43],[-0.8,42.9],[-0.3,42.8],[0.3,42.7],[0.8,42.8],[1.4,42.6],[2,42.4],[2.7,42.3],[3.3,42.2],[3.1,41.8],[2.3,41.4],[1.7,41.2],[0.9,41],[0.5,40.5],[-0.1,39.9],[-0.1,39],[0.1,38.7],[-0.5,38.3],[-0.9,37.7],[-1.4,37.5],[-1.9,37],[-2.3,36.8],[-2.9,36.7],[-3.7,36.7],[-4.5,36.7],[-5.2,36.4],[-5.9,36.2],[-6.2,36.6],[-6.9,37.2],[-7.4,37.4],[-7.3,38],[-7.1,38.2],[-7.1,38.9],[-7.4,39.5],[-7.1,39.7],[-6.8,40.3],[-6.9,41],[-6.4,41.4],[-6.5,41.7],[-6.9,41.9],[-7.3,41.8],[-8,41.8],[-8.2,42.1],[-8.7,42],[-8.6,42.4],[-8.9,42.4],[-8.9,42.6],[-9.1,42.8],[-9.1,43.2],[-8.4,43.4],[-7.9,43.8]]],[[[3.2,39.7],[3.3,39.7],[3.3,39.8],[3.4,39.8],[3.5,39.7],[3.4,39.6],[3.4,39.5],[3.3,39.5],[3.3,39.4],[3.2,39.4],[3.1,39.3],[3,39.3],[2.8,39.4],[2.7,39.4],[2.7,39.5],[2.8,39.5],[2.7,39.6],[2.5,39.5],[2.4,39.5],[2.4,39.6],[2.5,39.7],[2.7,39.8],[2.8,39.8],[3,39.9],[3.1,39.9],[3.1,39.8],[3.2,39.8],[3.2,39.7]]],[[[-14.3,28],[-14.4,28],[-14.4,28.1],[-14.3,28.1],[-14.3,28.2],[-14.2,28.2],[-14.2,28.3],[-14.1,28.4],[-14.1,28.5],[-14.1,28.6],[-14,28.6],[-14,28.7],[-13.9,28.7],[-13.9,28.8],[-13.8,28.7],[-13.8,28.6],[-13.8,28.5],[-13.9,28.4],[-13.9,28.3],[-13.9,28.2],[-14,28.2],[-14.1,28.2],[-14.2,28.1],[-14.3,28]]],[[[-16.3,28.4],[-16.4,28.4],[-16.4,28.2],[-16.4,28.1],[-16.5,28.1],[-16.5,28],[-16.6,28],[-16.7,28],[-16.7,28.1],[-16.8,28.1],[-16.8,28.2],[-16.9,28.3],[-16.9,28.4],[-16.8,28.4],[-16.7,28.4],[-16.6,28.4],[-16.5,28.4],[-16.4,28.5],[-16.3,28.6],[-16.2,28.6],[-16.2,28.5],[-16.3,28.4]]],[[[-15.6,27.8],[-15.6,27.7],[-15.7,27.8],[-15.8,27.8],[-15.8,27.9],[-15.8,28],[-15.7,28],[-15.7,28.1],[-15.7,28.2],[-15.6,28.2],[-15.4,28.1],[-15.4,28],[-15.4,27.8],[-15.5,27.8],[-15.6,27.8]]],[[[4.3,40],[4.3,39.9],[4.3,39.8],[4.2,39.8],[4.1,39.9],[4,39.9],[3.9,39.9],[3.8,39.9],[3.8,40],[3.8,40.1],[3.9,40.1],[4.1,40.1],[4.2,40.1],[4.2,40],[4.3,40]]],[]],"type":"MultiPolygon"},"type":"Feature","properties":{"iso2":"ES","lng":-4,"lat":40}},{"geometry":{"coordinates":[[[[28.2,69.9],[29.3,69.5],[28.9,69],[28.5,68.6],[29.9,67.7],[29.1,66.9],[29.8,66.2],[29.8,65.6],[29.8,65.2],[29.7,64.8],[30,64.5],[30.6,64],[30.3,63.6],[31.5,63],[30.8,62.3],[29.7,61.5],[28.8,61.1],[28.1,60.7],[27.2,60.6],[26.6,60.6],[25.9,60.4],[25.7,60.4],[24.6,60.1],[23.6,60],[23.2,59.9],[23,60.2],[22.5,60.2],[21.9,60.5],[21.4,60.8],[21.5,61.5],[21.3,62],[21.1,62.6],[21.6,63.1],[22.3,63.3],[22.7,63.7],[23.4,64],[24.2,64.5],[25,64.9],[25.3,65],[25.2,65.6],[24.7,65.9],[23.7,66.2],[24,66.8],[23.8,67.4],[23.5,67.9],[23,68.3],[22.1,68.5],[21.2,68.8],[20.8,69.1],[22,69.1],[22.9,68.7],[23.7,68.7],[24.5,68.7],[25.4,68.9],[25.8,69.4],[26.4,69.8],[27.3,69.9],[28.2,69.9]]],[],[],[],[],[],[]],"type":"MultiPolygon"},"type":"Feature","properties":{"iso2":"FI","lng":26,"lat":64}},{"geometry":{"coordinates":[[[[2.5,51.1],[3.2,50.7],[4,50.3],[4.5,49.9],[5,49.8],[6.1,49.5],[6.9,49.2],[7.7,49],[7.9,48.7],[7.5,47.8],[7.1,47.5],[6.6,47],[6.1,46.4],[6.2,46.3],[6.9,46.1],[7.1,45.5],[6.7,45.1],[6.9,44.5],[7.7,44.2],[7.2,43.7],[6.2,43.1],[5.3,43.4],[5,43.6],[4.6,43.4],[3.8,43.5],[3,42.9],[2.7,42.4],[1.9,42.4],[1.4,42.6],[0.7,42.8],[-0.1,42.7],[-0.8,43],[-1.4,43.1],[-1.6,43.4],[-1.3,44.5],[-1.2,45],[-0.8,45.4],[-0.7,45.4],[-1.1,46.1],[-1.9,46.6],[-2.2,47.2],[-2.4,47.3],[-2.9,47.5],[-3.6,47.8],[-4.4,47.8],[-4.3,48.1],[-4.2,48.3],[-4.5,48.6],[-3.5,48.7],[-2.7,48.5],[-1.9,48.7],[-1.5,48.7],[-1.8,49.4],[-1.4,49.7],[-1,49.4],[-0.1,49.3],[0.2,49.5],[1.2,50],[1.6,50.8],[2.5,51.1]]],[[[9.4,42.7],[9.4,42.6],[9.5,42.6],[9.5,42.5],[9.6,42.3],[9.6,42.2],[9.6,42.1],[9.5,42.1],[9.4,42],[9.4,41.9],[9.4,41.8],[9.4,41.7],[9.4,41.6],[9.3,41.6],[9.3,41.5],[9.2,41.5],[9.2,41.4],[9.3,41.4],[9.1,41.4],[9,41.5],[8.9,41.5],[8.8,41.6],[8.9,41.6],[8.9,41.7],[8.8,41.7],[8.7,41.7],[8.7,41.8],[8.8,41.9],[8.7,41.9],[8.6,41.9],[8.6,42],[8.7,42],[8.7,42.1],[8.6,42.1],[8.6,42.2],[8.6,42.3],[8.7,42.3],[8.6,42.4],[8.7,42.5],[8.7,42.6],[8.9,42.6],[9.1,42.7],[9.2,42.7],[9.3,42.7],[9.3,42.8],[9.3,43],[9.4,43],[9.5,43],[9.5,42.8],[9.5,42.7],[9.4,42.7]]],[],[],[],[],[]],"type":"MultiPolygon"},"type":"Feature","properties":{"iso2":"FR","lng":2,"lat":46}},{"geometry":{"coordinates":[[[[-4.2,53.2],[-3.1,53.2],[-3,53.8],[-3.5,54.4],[-3.1,55],[-4.4,54.9],[-5,54.8],[-5,55.2],[-4.8,55.9],[-5.2,55.8],[-5.4,55.9],[-5.8,55.4],[-5.5,56.2],[-5.3,56.5],[-5.8,56.5],[-6.1,56.8],[-5.5,57],[-5.5,57.4],[-5.6,57.6],[-5.2,57.9],[-5.2,58.3],[-4.6,58.5],[-3.4,58.6],[-3.6,58.1],[-4,57.8],[-4,57.6],[-2.9,57.7],[-1.8,57.5],[-2.5,56.6],[-3,56.4],[-3.2,56.1],[-2.8,56.1],[-1.8,55.6],[-1.3,54.8],[-0.2,54.2],[0,53.6],[0.2,53.5],[0.2,52.9],[1.2,52.9],[1.7,52.3],[0.9,51.8],[0.4,51.4],[1.4,51.1],[0.4,50.8],[-0.8,50.7],[-2.1,50.7],[-2.8,50.7],[-3.8,50.2],[-4.9,50.2],[-5.7,50.1],[-4.7,50.7],[-4,51.2],[-2.9,51.4],[-3.2,51.5],[-4.2,51.5],[-4.8,51.6],[-5.2,51.9],[-4.1,52.3],[-4.5,52.8],[-4.2,53.2]]],[[[-6.2,58.4],[-6.2,58.3],[-6.3,58.3],[-6.3,58.2],[-6.2,58.2],[-6.1,58.3],[-6.4,58.2],[-6.4,58.1],[-6.5,58.1],[-6.6,58.1],[-6.4,58],[-6.5,58],[-6.5,57.9],[-6.6,57.9],[-6.7,57.9],[-6.7,58],[-6.6,58],[-6.7,58.1],[-6.8,58],[-6.7,57.8],[-7,57.7],[-7.1,57.8],[-7,57.8],[-6.8,57.9],[-6.9,57.9],[-6.9,58],[-7,58],[-7.1,58],[-7.1,58.1],[-7.1,58.2],[-7,58.2],[-6.9,58.2],[-6.9,58.1],[-6.8,58.2],[-6.7,58.2],[-6.8,58.3],[-6.7,58.3],[-6.6,58.3],[-6.6,58.4],[-6.4,58.5],[-6.3,58.5],[-6.2,58.5],[-6.2,58.4]]],[[[-6.4,55.2],[-6.2,55.2],[-6,55.2],[-5.8,54.9],[-5.7,54.8],[-5.8,54.7],[-5.9,54.6],[-5.5,54.7],[-5.5,54.5],[-5.5,54.4],[-5.6,54.6],[-5.7,54.5],[-5.6,54.3],[-5.7,54.2],[-5.9,54.2],[-6,54.1],[-6.1,54],[-6.3,54.1],[-6.6,54.1],[-6.7,54.1],[-6.9,54.3],[-7,54.4],[-7.2,54.3],[-7.1,54.2],[-7.6,54.1],[-7.7,54.2],[-7.9,54.2],[-8,54.4],[-8.2,54.4],[-8,54.5],[-7.9,54.6],[-7.8,54.7],[-7.6,54.8],[-7.5,54.9],[-7.4,55],[-7.3,55.1],[-7,55],[-7,55.2],[-6.8,55.2],[-6.6,55.2],[-6.4,55.2]]],[[[-6.1,57.6],[-6.1,57.5],[-6.1,57.4],[-6.1,57.3],[-5.9,57.2],[-5.8,57.3],[-5.7,57.3],[-5.6,57.3],[-5.7,57.2],[-5.8,57.1],[-5.9,57.1],[-5.9,57],[-6,57],[-6,57.1],[-6,57.2],[-6.1,57.1],[-6.2,57.2],[-6.3,57.2],[-6.4,57.3],[-6.5,57.3],[-6.3,57.3],[-6.5,57.4],[-6.6,57.4],[-6.6,57.3],[-6.7,57.4],[-6.8,57.4],[-6.7,57.5],[-6.6,57.6],[-6.6,57.5],[-6.5,57.5],[-6.4,57.5],[-6.4,57.6],[-6.3,57.7],[-6.2,57.6],[-6.1,57.6]]],[[[-1.3,60.5],[-1.2,60.5],[-1,60.4],[-1.1,60.4],[-1.1,60.3],[-1.2,60.3],[-1.2,60.2],[-1.1,60.2],[-1.1,60.1],[-1.2,60.1],[-1.2,60],[-1.3,59.9],[-1.4,59.9],[-1.3,60],[-1.3,60.1],[-1.3,60.2],[-1.4,60.3],[-1.4,60.2],[-1.5,60.2],[-1.6,60.2],[-1.7,60.2],[-1.7,60.3],[-1.6,60.3],[-1.5,60.3],[-1.3,60.3],[-1.3,60.4],[-1.4,60.5],[-1.5,60.5],[-1.6,60.5],[-1.4,60.6],[-1.3,60.6],[-1.3,60.5]]],[[[-5.8,56.5],[-5.7,56.5],[-5.6,56.4],[-5.7,56.4],[-5.8,56.3],[-5.9,56.3],[-5.9,56.4],[-6,56.3],[-6.3,56.3],[-6.4,56.3],[-6.2,56.3],[-6.1,56.4],[-6,56.4],[-6.2,56.4],[-6,56.5],[-6.1,56.5],[-6.3,56.5],[-6.3,56.6],[-6.2,56.6],[-6.1,56.7],[-6.1,56.6],[-6,56.6],[-5.9,56.5],[-5.8,56.5]]],[[[-6.1,55.9],[-6.1,55.8],[-6,55.8],[-6,55.7],[-6.1,55.6],[-6.2,55.6],[-6.3,55.6],[-6.3,55.7],[-6.3,55.8],[-6.4,55.8],[-6.4,55.7],[-6.5,55.7],[-6.4,55.9],[-6.3,55.9],[-6.2,55.9],[-6.1,55.9]]]],"type":"MultiPolygon"},"type":"Feature","properties":{"iso2":"GB","lng":-2,"lat":54}},{"geometry":{"coordinates":[[[41.5,42.4],[41.5,42.7],[41.2,42.8],[41,43],[40.8,43.1],[40.3,43.2],[40.1,43.4],[40.1,43.6],[40.4,43.6],[40.7,43.5],[41,43.4],[41.4,43.3],[42.1,43.2],[42.4,43.2],[42.7,43.2],[42.9,43.1],[43.2,42.9],[43.6,42.9],[43.8,42.8],[43.7,42.6],[44.2,42.6],[44.5,42.8],[44.7,42.7],[44.9,42.8],[45.2,42.7],[45.4,42.5],[45.6,42.6],[45.8,42.5],[45.6,42.2],[46.1,42],[46.4,41.9],[46.3,41.8],[46.2,41.6],[46.6,41.4],[46.7,41.1],[46.5,41.1],[46.3,41.2],[46,41.2],[45.7,41.3],[45.3,41.5],[45.1,41.4],[44.9,41.2],[44.6,41.2],[44.3,41.2],[44,41.2],[43.8,41.1],[43.5,41.1],[43.3,41.2],[43,41.4],[42.7,41.6],[42.5,41.4],[42.2,41.5],[41.9,41.5],[41.7,41.5],[41.6,41.6],[41.8,41.8],[41.7,42.1],[41.6,42.3],[41.5,42.4]]],"type":"Polygon"},"type":"Feature","properties":{"iso2":"GE","lng":43.5,"lat":42}},{"geometry":{"coordinates":[[[[23.9,35.5],[24,35.5],[24.1,35.5],[24.1,35.6],[24.2,35.6],[24.2,35.5],[24.3,35.4],[24.4,35.4],[24.5,35.4],[24.6,35.4],[24.8,35.4],[25,35.4],[25.1,35.3],[25.2,35.3],[25.3,35.3],[25.4,35.3],[25.5,35.3],[25.6,35.3],[25.7,35.3],[25.8,35.3],[25.7,35.2],[25.7,35.1],[25.8,35.1],[25.9,35.2],[26,35.2],[26.1,35.2],[26.2,35.2],[26.3,35.3],[26.3,35.1],[26.2,35],[26.1,35],[26,35],[25.6,35],[25.5,35],[25.3,35],[25.2,35],[25,34.9],[24.9,34.9],[24.8,34.9],[24.8,35],[24.7,35.1],[24.6,35.1],[24.5,35.1],[24.4,35.2],[24.2,35.2],[24.1,35.2],[24,35.2],[23.9,35.2],[23.8,35.2],[23.7,35.2],[23.6,35.2],[23.5,35.3],[23.6,35.5],[23.6,35.6],[23.7,35.5],[23.7,35.6],[23.7,35.7],[23.8,35.7],[23.8,35.6],[23.8,35.5],[23.9,35.5]]],[[[26.3,41.7],[26.4,41.3],[26.1,40.8],[25.7,40.9],[25.2,41],[24.4,40.9],[23.8,40.8],[24,40.4],[24.1,40.3],[24,40.1],[23.4,40.3],[23.7,39.9],[22.8,40.5],[22.6,40.5],[22.7,40],[23.3,39.3],[23.2,39.3],[23,39.1],[22.5,38.9],[23.2,38.6],[23.6,38.5],[24.1,38.2],[24,37.7],[23.3,38],[23.2,37.6],[23.4,37.4],[22.9,37.5],[22.9,37.1],[23,36.7],[22.9,36.6],[22.5,36.4],[22,37],[21.7,36.8],[21.7,37.4],[21.1,37.8],[21.6,38.1],[22.2,38.2],[23,38],[23.1,38.2],[22.5,38.4],[21.7,38.4],[21.3,38.3],[20.8,38.8],[21.1,39],[20.7,39.1],[20.2,39.6],[20.4,39.9],[20.7,40.2],[21,40.6],[21.2,40.9],[21.9,41.1],[22.6,41.1],[23.1,41.3],[23.7,41.4],[24.2,41.6],[24.9,41.4],[25.6,41.3],[26.2,41.5],[26.3,41.7]]],[[[23.5,38.9],[23.5,38.8],[23.6,38.8],[23.8,38.7],[23.9,38.7],[24,38.7],[24.2,38.6],[24.2,38.4],[24.2,38.2],[24.3,38.2],[24.4,38.1],[24.5,38.1],[24.6,38.1],[24.6,38],[24.5,38],[24.4,38],[24.3,38],[24.1,38.2],[24.1,38.3],[24,38.4],[24.1,38.4],[23.9,38.4],[23.8,38.4],[23.7,38.4],[23.6,38.4],[23.6,38.5],[23.6,38.6],[23.5,38.6],[23.3,38.7],[23.2,38.8],[23.1,38.9],[23.1,38.8],[22.8,38.8],[22.8,38.9],[22.9,38.9],[23.1,39],[23.3,39],[23.4,39],[23.4,38.9],[23.5,38.9]]],[[[26.4,39.3],[26.5,39.2],[26.6,39.1],[26.6,39],[26.5,39],[26.4,39],[26.3,39],[26.2,39],[26.1,39],[26.1,39.1],[26.2,39.1],[26.3,39.2],[26.2,39.2],[26,39.1],[25.9,39.1],[25.9,39.2],[25.8,39.2],[25.9,39.3],[26,39.3],[26.2,39.3],[26.2,39.4],[26.3,39.4],[26.4,39.3]]],[[[27.8,35.9],[27.7,35.9],[27.7,36],[27.7,36.1],[27.7,36.2],[27.8,36.3],[27.9,36.3],[28.1,36.4],[28.2,36.4],[28.2,36.5],[28.2,36.3],[28.1,36.2],[28.1,36.1],[28,36.1],[28,36],[27.9,36],[27.9,35.9],[27.8,35.9]]],[[[26,38.2],[26,38.1],[25.9,38.2],[25.9,38.3],[26,38.3],[26,38.4],[25.9,38.5],[25.8,38.5],[25.8,38.6],[25.9,38.6],[26,38.6],[26.1,38.6],[26.2,38.6],[26.2,38.5],[26.1,38.4],[26.2,38.3],[26.1,38.2],[26,38.2]]],[[[19.9,39.8],[20,39.8],[19.9,39.7],[19.8,39.7],[19.8,39.6],[19.9,39.5],[20,39.4],[20.1,39.4],[20.1,39.5],[19.9,39.4],[19.8,39.5],[19.7,39.6],[19.7,39.7],[19.6,39.7],[19.6,39.8],[19.7,39.8],[19.8,39.8],[19.9,39.8]]]],"type":"MultiPolygon"},"type":"Feature","properties":{"iso2":"GR","lng":22,"lat":39}},{"geometry":{"coordinates":[[[[16.6,46.5],[16.9,46.3],[17.2,46.2],[17.4,46],[17.7,45.9],[18.2,45.8],[18.6,45.8],[18.9,45.8],[18.9,45.5],[19,45.4],[19.4,45.2],[19.1,44.9],[18.8,45],[18.2,45.1],[17.8,45.1],[17.3,45.2],[17,45.2],[16.6,45.2],[16.3,45],[15.9,45.2],[15.7,44.8],[16,44.6],[16.1,44.2],[16.4,44.1],[16.7,43.9],[17,43.6],[17.3,43.5],[17.6,43.1],[17.5,43],[17.1,43.2],[16.7,43.4],[16.4,43.6],[16.1,43.5],[15.9,43.7],[15.5,43.9],[15.2,44.2],[15.3,44.3],[15.2,44.4],[14.9,44.8],[14.7,45.1],[14.4,45.3],[14.2,45.2],[14,44.9],[13.8,45],[13.5,45.4],[13.9,45.5],[14.5,45.5],[14.7,45.5],[15.1,45.5],[15.4,45.7],[15.6,45.8],[15.7,46.1],[15.8,46.2],[16.3,46.4],[16.5,46.5],[16.6,46.5]]],[[[17.3,43],[17.4,43],[17.4,42.9],[17.5,42.9],[17.7,42.9],[17.6,42.9],[17.8,42.9],[17.9,42.8],[18,42.8],[18.2,42.7],[18.2,42.6],[18.3,42.6],[18.4,42.6],[18.5,42.6],[18.5,42.5],[18.5,42.4],[18.4,42.5],[18.1,42.7],[17.8,42.8],[17.7,42.8],[17.6,42.8],[17.2,43],[17.1,43],[17,43],[17.3,43]]],[[[14.5,44.9],[14.4,44.9],[14.5,44.8],[14.5,44.7],[14.5,44.6],[14.4,44.7],[14.4,44.8],[14.3,44.8],[14.3,44.9],[14.4,45],[14.3,45.1],[14.3,45.2],[14.4,45.2],[14.4,45.1],[14.5,45],[14.5,44.9]]],[[[14.8,44.6],[14.9,44.6],[15,44.6],[15,44.5],[15.1,44.5],[14.9,44.5],[15.1,44.4],[15.2,44.4],[15.2,44.3],[15.3,44.3],[15.1,44.3],[15,44.4],[14.7,44.7],[14.8,44.7],[14.8,44.6]]],[],[],[]],"type":"MultiPolygon"},"type":"Feature","properties":{"iso2":"HR","lng":15.5,"lat":45.2}},{"geometry":{"coordinates":[[[18.8,45.9],[18.4,45.8],[18,45.8],[17.6,45.9],[17.3,46],[17.1,46.2],[16.9,46.4],[16.5,46.5],[16.3,46.9],[16.4,47],[16.5,47.3],[16.7,47.6],[16.5,47.7],[16.9,47.7],[17.1,47.9],[17.4,48],[17.8,47.7],[18.1,47.8],[18.4,47.8],[18.8,47.8],[18.8,48.1],[19.2,48.1],[19.7,48.2],[20.1,48.2],[20.4,48.4],[20.8,48.6],[21.1,48.5],[21.5,48.5],[21.8,48.3],[22.1,48.4],[22.4,48.2],[22.6,48.1],[22.9,48],[22.5,47.8],[22.2,47.6],[21.9,47.4],[21.7,47.1],[21.5,46.7],[21.2,46.4],[21,46.3],[20.7,46.2],[20.5,46.2],[20.2,46.2],[19.8,46.2],[19.5,46.1],[19,46],[18.8,45.9]]],"type":"Polygon"},"type":"Feature","properties":{"iso2":"HU","lng":20,"lat":47}},{"geometry":{"coordinates":[[[[-7.4,55],[-7.7,54.7],[-8,54.5],[-7.9,54.3],[-7.6,54.1],[-7.1,54.4],[-6.7,54.1],[-6.2,54.1],[-6.4,53.9],[-6.2,53.7],[-6.2,53.4],[-6.1,52.9],[-6.2,52.6],[-6.3,52.3],[-6.8,52.2],[-7.1,52.1],[-7.5,52],[-7.9,51.9],[-8.3,51.9],[-8.5,51.7],[-9,51.6],[-9.6,51.5],[-9.7,51.6],[-9.5,51.8],[-10.1,51.6],[-9.7,51.9],[-10.4,51.9],[-9.8,52.1],[-10.1,52.1],[-10.5,52.2],[-9.7,52.2],[-9.7,52.6],[-9,52.6],[-9.1,52.6],[-9.6,52.7],[-9.3,53.2],[-8.9,53.1],[-9.4,53.2],[-9.7,53.4],[-9.8,53.4],[-10,53.6],[-9.9,53.8],[-9.7,53.9],[-9.9,54.1],[-10.1,54.3],[-9.6,54.3],[-9.1,54.2],[-8.6,54.3],[-8.3,54.5],[-8.8,54.7],[-8.4,54.8],[-8.5,55],[-7.8,55.2],[-7.5,55.1],[-7.5,55],[-7.4,55.3],[-7,55.2],[-7.3,55],[-7.4,55]]],[],[],[],[]],"type":"MultiPolygon"},"type":"Feature","properties":{"iso2":"IE","lng":-8,"lat":53}},{"geometry":{"coordinates":[[[-15.1,66.1],[-14.6,65.9],[-14.3,65.8],[-13.9,65.6],[-13.8,65.2],[-14,65.1],[-14,64.8],[-14.5,64.6],[-15.2,64.3],[-16.2,64],[-17.1,63.8],[-17.9,63.5],[-19.3,63.4],[-20.5,63.7],[-20.8,63.8],[-21.4,63.9],[-22.3,63.9],[-22.3,64],[-21.8,64.3],[-22.1,64.3],[-22.1,64.5],[-22.7,64.8],[-23.6,64.7],[-23.8,64.9],[-22.4,65.1],[-21.8,65.2],[-22.2,65.3],[-22.2,65.4],[-22.8,65.5],[-23.7,65.4],[-24.3,65.6],[-24,65.7],[-23.5,65.6],[-23.6,65.8],[-23.7,66],[-23.6,66.2],[-22.7,66.1],[-22.5,65.8],[-22.7,66.3],[-23.2,66.4],[-22,66.3],[-21.6,65.9],[-21.6,65.6],[-21.1,65.5],[-20.4,65.5],[-20.1,66.1],[-19.5,65.7],[-19.2,66.1],[-18.5,66.1],[-18,65.7],[-18,66.2],[-17.2,66.2],[-16.4,66.2],[-15.9,66.4],[-15.2,66.3],[-14.9,66.2],[-15.1,66.1]]],"type":"Polygon"},"type":"Feature","properties":{"iso2":"IS","lng":-18,"lat":65}},{"geometry":{"coordinates":[[[[12.1,47],[12.8,46.6],[13.5,46.4],[13.5,46.1],[13.9,45.6],[13.1,45.8],[12.4,45.4],[12.4,45],[12.3,44.5],[13,43.8],[13.6,43.5],[14.1,42.5],[14.9,42],[15.7,41.9],[15.9,41.6],[17,41.1],[18.1,40.5],[18.4,39.8],[17.9,40.3],[17.3,40.5],[16.6,40.1],[16.8,39.6],[17.1,38.9],[16.6,38.6],[16.1,38.1],[15.6,38],[15.8,38.6],[16.2,39],[15.9,39.5],[15.6,40.1],[14.9,40.2],[14.7,40.6],[14.2,40.8],[13.6,41.3],[12.9,41.4],[12.2,41.9],[11.6,42.3],[11.2,42.6],[10.6,43],[10.3,43.6],[9.4,44.3],[8.4,44.2],[7.7,43.8],[7.6,44.2],[6.9,44.5],[6.6,45.1],[7.2,45.4],[6.9,45.8],[7.6,46],[8.2,46.2],[8.4,46.2],[8.9,45.9],[9.2,46.2],[9.5,46.3],[10.1,46.2],[10.3,46.6],[10.6,46.9],[11.5,47],[12.1,47]]],[[[15.5,38.1],[15.4,37.9],[15.2,37.7],[15.2,37.5],[15.1,37.4],[15.2,37.2],[15.3,37.1],[15.2,37],[15.1,36.9],[15.1,36.7],[15,36.7],[14.8,36.7],[14.6,36.8],[14.4,36.9],[14.3,37],[14.1,37.1],[13.9,37.1],[13.6,37.2],[13.5,37.3],[13.3,37.4],[13.1,37.5],[13,37.6],[12.8,37.6],[12.5,37.7],[12.5,37.8],[12.5,38],[12.7,38.1],[12.9,38],[13,38.1],[13.1,38.2],[13.4,38.2],[13.7,38],[13.9,38],[14.1,38],[14.3,38],[14.5,38],[14.7,38.1],[14.9,38.2],[15.1,38.1],[15.3,38.2],[15.6,38.3],[15.6,38.2],[15.5,38.1]]],[[[9.5,41.1],[9.6,41],[9.6,40.9],[9.7,40.7],[9.7,40.6],[9.8,40.5],[9.7,40.4],[9.6,40.3],[9.7,40.1],[9.7,39.9],[9.7,39.7],[9.6,39.5],[9.6,39.3],[9.6,39.1],[9.4,39.1],[9.3,39.2],[9,39.1],[8.9,38.9],[8.7,38.9],[8.6,39],[8.5,39],[8.3,39.1],[8.4,39.2],[8.4,39.4],[8.4,39.6],[8.4,39.8],[8.5,39.7],[8.6,39.9],[8.4,39.9],[8.5,40.1],[8.5,40.3],[8.3,40.6],[8.1,40.6],[8.1,40.7],[8.3,40.9],[8.4,40.8],[8.6,40.8],[8.7,40.9],[8.8,41],[9,41.1],[9.2,41.2],[9.5,41.1]]],[],[],[],[]],"type":"MultiPolygon"},"type":"Feature","properties":{"iso2":"IT","lng":12.8,"lat":42.8}},{"geometry":{"coordinates":[],"type":"Polygon"},"type":"Feature","properties":{"iso2":"LI","lng":9.5,"lat":47.3}},{"geometry":{"coordinates":[[[[25,56.3],[25.3,56.2],[25.7,56.1],[26.1,55.9],[26.3,55.8],[26.5,55.7],[26.5,55.4],[26.8,55.3],[26.5,55.2],[26.2,55],[25.9,54.9],[25.7,54.7],[25.7,54.5],[25.5,54.3],[25.8,54.3],[25.6,54.1],[25.6,54.2],[25.2,54.2],[25,54.2],[24.8,54],[24.5,54],[24.3,53.9],[24.1,54],[23.9,53.9],[23.6,53.9],[23.5,54.1],[23.3,54.2],[23,54.4],[22.7,54.4],[22.8,54.8],[22.8,54.9],[22.5,55.1],[22.1,55.1],[21.7,55.2],[21.3,55.3],[21.2,55.4],[21.2,55.6],[21,55.9],[21.1,56.1],[21.3,56.2],[21.7,56.3],[22.1,56.4],[22.5,56.4],[22.8,56.4],[23,56.3],[23.2,56.4],[23.4,56.3],[23.6,56.4],[24,56.3],[24.3,56.3],[24.6,56.3],[24.9,56.5],[25,56.3]]],[]],"type":"MultiPolygon"},"type":"Feature","properties":{"iso2":"LT","lng":24,"lat":56}},{"geometry":{"coordinates":[[[6,50.2],[6.1,50.1],[6.1,50],[6.2,50],[6.2,49.9],[6.3,49.9],[6.3,49.8],[6.4,49.8],[6.5,49.8],[6.5,49.7],[6.4,49.7],[6.4,49.5],[6.3,49.5],[6.2,49.5],[6.1,49.5],[6,49.4],[5.9,49.5],[5.8,49.5],[5.8,49.6],[5.9,49.6],[5.9,49.7],[5.8,49.8],[5.7,49.8],[5.7,49.9],[5.8,50],[5.9,50.1],[6,50.2]]],"type":"Polygon"},"type":"Feature","properties":{"iso2":"LU","lng":6.2,"lat":49.8}},{"geometry":{"coordinates":[[[21.1,56.4],[21,56.7],[21.1,56.9],[21.4,57],[21.4,57.3],[21.6,57.5],[21.8,57.6],[22.1,57.6],[22.6,57.8],[22.7,57.6],[22.9,57.4],[23.2,57.3],[23.3,57.1],[23.7,57],[24,57],[24.4,57.3],[24.3,57.7],[24.4,57.9],[24.6,58],[25,58.1],[25.2,58],[25.4,58],[25.8,57.9],[26.2,57.7],[26.6,57.5],[26.9,57.6],[27.3,57.5],[27.5,57.4],[27.8,57.3],[27.8,57.2],[27.8,56.9],[27.9,56.7],[28.2,56.4],[28.1,56.2],[27.7,56],[27.6,55.8],[27.2,55.8],[26.9,55.8],[26.7,55.7],[26.4,55.7],[26.2,55.8],[26,56],[25.6,56.2],[25.2,56.2],[25,56.4],[24.7,56.4],[24.4,56.3],[24.1,56.3],[23.7,56.4],[23.5,56.3],[23.3,56.4],[23.1,56.3],[22.9,56.4],[22.6,56.4],[22.2,56.4],[21.9,56.4],[21.4,56.2],[21.2,56.1],[21,56.2],[21.1,56.4]]],"type":"Polygon"},"type":"Feature","properties":{"iso2":"LV","lng":25,"lat":57}},{"geometry":{"coordinates":[],"type":"Polygon"},"type":"Feature","properties":{"iso2":"MC","lng":7.4,"lat":43.7}},{"geometry":{"coordinates":[[[28.1,46.9],[28,47],[27.9,47.1],[27.7,47.3],[27.6,47.4],[27.4,47.6],[27.3,47.7],[27.2,47.9],[27,48.2],[26.7,48.3],[26.8,48.3],[27.2,48.4],[27.5,48.5],[27.8,48.4],[27.9,48.3],[28.1,48.3],[28.2,48.2],[28.4,48.2],[28.5,48.1],[28.7,48.1],[28.9,48],[29.1,47.9],[29.2,48],[29.2,47.6],[29.1,47.5],[29.2,47.5],[29.3,47.4],[29.4,47.3],[29.6,47.3],[29.6,47],[29.7,46.9],[29.9,46.8],[30,46.6],[29.9,46.5],[30,46.4],[29.9,46.4],[29.8,46.4],[29.6,46.4],[29.5,46.5],[29.3,46.4],[29.2,46.5],[28.9,46.4],[29,46.2],[28.9,46],[28.7,46],[28.8,45.9],[28.7,45.8],[28.5,45.7],[28.5,45.5],[28.3,45.5],[28.2,45.4],[28.2,45.6],[28.1,45.9],[28.1,46.1],[28.2,46.3],[28.3,46.4],[28.2,46.7],[28.1,46.9]]],"type":"Polygon"},"type":"Feature","properties":{"iso2":"MD","lng":29,"lat":47}},{"geometry":{"coordinates":[[[18.5,42.6],[18.6,42.7],[18.5,42.8],[18.6,43],[18.7,43.1],[18.7,43.3],[18.9,43.4],[19,43.2],[19.1,43.3],[19,43.5],[19,43.6],[19.3,43.5],[19.4,43.4],[19.6,43.3],[19.7,43.2],[19.9,43.1],[20,43],[20.2,43],[20.4,42.8],[20.1,42.8],[20,42.7],[20.1,42.6],[19.9,42.5],[19.7,42.5],[19.7,42.7],[19.6,42.6],[19.5,42.4],[19.4,42.1],[19.3,41.9],[19.2,41.9],[19.1,42],[19,42.1],[18.9,42.3],[18.7,42.4],[18.5,42.4],[18.5,42.5],[18.5,42.6]]],"type":"Polygon"},"type":"Feature","properties":{"iso2":"ME","lng":19.3,"lat":42.5}},{"geometry":{"coordinates":[[[20.8,40.9],[20.7,41.1],[20.6,41.2],[20.5,41.3],[20.6,41.4],[20.5,41.6],[20.5,41.8],[20.7,41.9],[20.8,42],[20.9,42.1],[21.2,42.1],[21.3,42.2],[21.6,42.3],[21.8,42.3],[22,42.3],[22.2,42.3],[22.4,42.3],[22.5,42.1],[22.7,42.1],[22.9,41.9],[23,41.8],[23,41.6],[23,41.4],[22.8,41.3],[22.7,41.2],[22.6,41.1],[22.4,41.1],[22.3,41.2],[22,41.1],[21.9,41],[21.6,40.9],[21.4,40.9],[21.2,40.9],[21,40.9],[20.8,40.9]]],"type":"Polygon"},"type":"Feature","properties":{"iso2":"MK","lng":22,"lat":41.8}},{"geometry":{"coordinates":[[],[]],"type":"MultiPolygon"},"type":"Feature","properties":{"iso2":"MT","lng":14.6,"lat":35.8}},{"geometry":{"coordinates":[[[[6.9,53.4],[7.2,53],[7.1,52.7],[6.9,52.7],[6.7,52.5],[7,52.5],[7.1,52.2],[6.8,52.1],[6.8,51.9],[6.4,51.8],[6,51.7],[6.2,51.4],[6,51.1],[6.1,50.9],[5.9,50.8],[5.6,50.9],[5.9,51.2],[5.5,51.3],[5.1,51.3],[5,51.4],[4.7,51.5],[4.5,51.5],[4.3,51.4],[3.8,51.4],[3.5,51.6],[3.9,51.6],[4.1,51.5],[4.1,51.6],[3.7,51.7],[4.1,51.8],[4,52],[4.5,52.3],[4.7,52.5],[5,52.4],[5.4,52.3],[5.6,52.4],[5.9,52.5],[5.6,52.7],[5.6,52.9],[5.3,53.1],[5.1,52.8],[5.2,52.7],[5.1,52.5],[4.7,52.8],[4.8,52.9],[5.5,53.2],[6.1,53.4],[6.7,53.5],[6.9,53.4]]],[[[3.8,51.3],[3.9,51.3],[4,51.4],[4.2,51.4],[4.2,51.3],[4.1,51.3],[4,51.2],[3.9,51.2],[3.8,51.2],[3.7,51.3],[3.6,51.3],[3.5,51.3],[3.5,51.2],[3.4,51.2],[3.4,51.3],[3.4,51.4],[3.5,51.4],[3.6,51.4],[3.7,51.4],[3.8,51.3]]],[[[5.8,52.4],[5.7,52.4],[5.6,52.4],[5.5,52.4],[5.5,52.3],[5.6,52.3],[5.4,52.3],[5.3,52.3],[5.2,52.3],[5.1,52.3],[5.1,52.4],[5.2,52.4],[5.3,52.5],[5.4,52.5],[5.5,52.5],[5.6,52.6],[5.8,52.6],[5.9,52.5],[5.8,52.5],[5.8,52.4]]],[],[],[],[]],"type":"MultiPolygon"},"type":"Feature","properties":{"iso2":"NL","lng":5.8,"lat":52.5}},{"geometry":{"coordinates":[[[[5.3,61.6],[5.2,61.9],[6.3,62.4],[6.4,62.5],[7.6,62.8],[8.3,62.8],[8.8,63.3],[10.6,63.4],[11,64],[9.6,63.7],[10.9,64.6],[11.2,64.7],[12.4,65.3],[12.9,66.1],[13,66.4],[13.8,66.9],[15.5,67.2],[15.5,67.4],[15,67.8],[16,68.2],[16.4,68.3],[17.1,68.5],[17.7,69.1],[19.2,69.3],[19.7,69.4],[20.8,69.8],[21.5,70.1],[22.7,70.1],[24.2,70.6],[25.3,70.9],[25.3,70.1],[26.6,70.4],[27.7,71.1],[28.3,70.7],[29.3,70.7],[30.7,70.3],[29.7,69.9],[30.9,69.5],[29.1,69.4],[26.2,69.8],[24.4,68.7],[21.7,69.3],[19.9,68.3],[16.1,67.4],[14.3,65.1],[12.3,63.7],[12.8,61.4],[11.9,59.8],[10.6,59.9],[10,59],[7.2,58],[5.6,59],[6.5,59.3],[5.2,59.5],[6.2,60.3],[5.7,60.4],[5,60.8],[6.3,61.1],[6.7,61.4],[5.3,61.6]]],[[[16,68.8],[16,68.7],[15.9,68.7],[15.9,68.6],[15.8,68.6],[15.7,68.5],[15.8,68.5],[16.1,68.7],[16.1,68.8],[16.2,68.9],[16.4,68.9],[16.4,68.8],[16.5,68.8],[16.6,68.7],[16.6,68.6],[16.5,68.6],[16.4,68.6],[16.3,68.6],[16.2,68.5],[16.1,68.5],[16,68.5],[16,68.4],[15.9,68.4],[15.8,68.4],[15.7,68.3],[15.6,68.3],[15.5,68.3],[15.4,68.3],[15.3,68.3],[15.4,68.4],[15.5,68.4],[15.6,68.5],[15.5,68.5],[15.3,68.4],[15.2,68.3],[15.1,68.3],[15,68.2],[15,68.3],[15.1,68.4],[15.2,68.5],[15.3,68.5],[15.2,68.6],[15.3,68.6],[15.4,68.6],[15.5,68.7],[15.4,68.7],[15.6,68.7],[15.7,68.7],[15.5,68.8],[15.6,68.9],[15.7,69],[15.9,69],[15.9,68.9],[15.9,68.8],[16,68.8]]],[[[17.6,69.5],[17.7,69.5],[17.7,69.6],[17.8,69.6],[17.9,69.6],[18,69.5],[18.1,69.4],[18.1,69.3],[18,69.3],[17.9,69.3],[17.9,69.2],[18,69.2],[17.6,69.2],[17.5,69.2],[17.4,69.2],[17.2,69.1],[17.2,69],[17.1,69],[17,69],[17.1,69.1],[17,69.1],[16.9,69.1],[16.8,69],[16.8,69.1],[17.1,69.2],[17.2,69.2],[17,69.2],[16.9,69.2],[17.1,69.3],[17,69.3],[16.9,69.3],[17,69.4],[16.9,69.4],[17.2,69.4],[17.3,69.4],[17.4,69.4],[17.5,69.4],[17.2,69.5],[17.3,69.5],[17.4,69.5],[17.5,69.5],[17.5,69.6],[17.6,69.6],[17.6,69.5]]],[[[23.5,70.8],[23.4,70.7],[23.3,70.7],[23.2,70.7],[23.1,70.6],[22.9,70.5],[22.8,70.5],[22.8,70.6],[22.7,70.6],[22.6,70.6],[22.6,70.5],[22.5,70.5],[22.3,70.5],[22.2,70.5],[22.1,70.5],[22.3,70.6],[22.2,70.6],[22.1,70.6],[22,70.6],[21.9,70.6],[22,70.7],[22.1,70.7],[22.3,70.7],[22.4,70.7],[22.5,70.7],[22.6,70.7],[22.7,70.7],[22.8,70.7],[22.8,70.8],[22.9,70.7],[23,70.7],[23.1,70.7],[23.2,70.8],[23.3,70.8],[23.3,70.9],[23.4,70.9],[23.4,70.8],[23.5,70.8]]],[[[15.4,68.8],[15.4,68.7],[15.3,68.6],[15.1,68.6],[15,68.6],[14.9,68.6],[14.8,68.6],[14.9,68.7],[15.1,68.7],[15.2,68.7],[15.1,68.8],[15,68.8],[15,68.7],[14.8,68.7],[14.7,68.7],[14.5,68.6],[14.4,68.6],[14.4,68.7],[14.4,68.8],[14.5,68.8],[14.6,68.8],[14.7,68.8],[14.9,68.8],[14.9,68.9],[15,68.9],[15.1,68.9],[15.2,68.8],[15,69],[15.1,69],[15.2,69],[15.2,68.9],[15.3,68.9],[15.4,68.8]]],[[[18.9,69.7],[18.8,69.7],[18.8,69.6],[18.7,69.6],[18.6,69.6],[18.5,69.6],[18.4,69.5],[18.3,69.5],[18.2,69.5],[18,69.6],[18.1,69.6],[18.2,69.6],[18.3,69.6],[18.2,69.7],[18.3,69.7],[18.4,69.7],[18.6,69.7],[18.5,69.7],[18.3,69.8],[18.4,69.8],[18.5,69.8],[18.6,69.8],[18.7,69.7],[18.8,69.8],[18.7,69.8],[18.7,69.9],[18.8,69.9],[19,69.8],[19.1,69.8],[19,69.7],[18.9,69.7]]],[[[19.3,70],[19.4,70],[19.5,70],[19.5,70.1],[19.6,70],[19.7,70],[19.5,69.9],[19.4,69.8],[19.3,69.8],[19.2,69.8],[19.1,69.8],[19,69.8],[19,69.9],[18.9,69.9],[18.8,69.9],[18.7,69.9],[18.8,70],[18.9,70],[19,70],[19.1,70],[19.1,70.1],[19.2,70.1],[19.3,70.1],[19.3,70]]]],"type":"MultiPolygon"},"type":"Feature","properties":{"iso2":"NO","lng":10,"lat":62}},{"geometry":{"coordinates":[[[18.9,49.5],[18.5,49.9],[17.9,50],[17.8,50.2],[17.2,50.3],[17,50.2],[16.6,50.2],[16.2,50.4],[16.1,50.7],[15.5,50.8],[15,50.9],[15,51.4],[14.8,51.6],[14.8,52.1],[14.6,52.5],[14.2,52.8],[14.4,53.3],[14.6,53.8],[14.2,53.9],[15,54.1],[15.8,54.2],[16.3,54.4],[16.9,54.6],[17.4,54.7],[17.9,54.8],[18.6,54.7],[18.5,54.6],[18.9,54.4],[19.4,54.4],[19.2,54.3],[19.9,54.4],[20.7,54.4],[21.5,54.3],[22.3,54.3],[22.9,54.4],[23.5,54.2],[23.6,53.6],[23.9,52.8],[23.4,52.5],[23.6,52.1],[23.6,51.7],[23.7,51.2],[24.1,50.9],[24,50.4],[23.5,50.2],[22.7,49.6],[22.9,49.1],[22.3,49.1],[21.5,49.4],[20.9,49.3],[20.2,49.3],[19.8,49.3],[19.4,49.6],[18.9,49.5]]],"type":"Polygon"},"type":"Feature","properties":{"iso2":"PL","lng":20,"lat":52}},{"geometry":{"coordinates":[[[[-8.2,41.9],[-7.9,41.9],[-7.6,41.8],[-7.2,41.9],[-6.9,42],[-6.6,42],[-6.5,41.7],[-6.2,41.6],[-6.4,41.3],[-6.8,41.1],[-6.8,40.9],[-6.8,40.4],[-7,40.1],[-7.1,39.7],[-7.4,39.6],[-7.3,39.4],[-7,39.1],[-7.2,38.8],[-7.2,38.3],[-7,38.1],[-7.3,38],[-7.4,37.7],[-7.4,37.3],[-7.6,37.1],[-8.1,37.1],[-8.7,37.1],[-9,37.1],[-8.8,37.4],[-8.8,37.9],[-8.8,38.3],[-8.9,38.5],[-9.2,38.5],[-9.1,38.6],[-9,38.9],[-9.4,38.7],[-9.4,38.9],[-9.3,39.2],[-9.3,39.4],[-9,39.7],[-8.9,40.1],[-8.8,40.5],[-8.7,40.8],[-8.7,41.2],[-8.9,41.7],[-8.7,42],[-8.4,42.1],[-8.1,42.1],[-8.2,41.9]]],[[[-25.6,37.8],[-25.5,37.8],[-25.4,37.8],[-25.4,37.9],[-25.3,37.9],[-25.2,37.9],[-25.1,37.8],[-25.2,37.7],[-25.3,37.7],[-25.5,37.7],[-25.6,37.7],[-25.7,37.7],[-25.7,37.8],[-25.8,37.8],[-25.9,37.8],[-25.9,37.9],[-25.8,37.9],[-25.7,37.9],[-25.6,37.8]]],[],[],[],[],[]],"type":"MultiPolygon"},"type":"Feature","properties":{"iso2":"PT","lng":-8,"lat":39.5}},{"geometry":{"coordinates":[[[20.7,46.2],[21,46.2],[21.3,46.6],[21.7,47],[21.9,47.4],[22.2,47.7],[22.7,47.8],[23.1,48.1],[23.5,48],[24.2,47.9],[24.6,47.9],[24.9,47.7],[25.2,47.9],[25.8,48],[26.3,48.1],[26.7,48.3],[27.2,47.8],[27.6,47.4],[27.9,47],[28.2,46.7],[28.1,46.2],[28.2,45.6],[28.3,45.3],[28.8,45.3],[29.5,45.4],[29.6,45.2],[29.5,44.8],[29,44.8],[28.9,45],[28.8,44.6],[28.9,44.5],[28.6,44.2],[28.6,43.7],[28.1,43.8],[27.8,44],[27.3,44.1],[26.8,44.1],[26.1,44],[25.7,43.7],[25.3,43.7],[24.7,43.7],[24.4,43.7],[23.8,43.8],[23.3,43.8],[22.9,43.9],[22.9,44.1],[22.5,44.4],[22.8,44.5],[22.3,44.7],[21.9,44.6],[21.5,44.8],[21.5,45],[21.4,45.2],[20.8,45.7],[20.5,45.9],[20.6,46.2],[20.7,46.2]]],"type":"Polygon"},"type":"Feature","properties":{"iso2":"RO","lng":25,"lat":46}},{"geometry":{"coordinates":[[[20.1,42.6],[20.1,42.8],[20.2,43],[19.9,43.1],[19.6,43.3],[19.3,43.5],[19.5,43.7],[19.3,44],[19.6,44],[19.2,44.3],[19.2,44.6],[19.3,44.9],[19.1,45],[19.4,45.2],[19,45.5],[18.9,45.6],[18.8,45.9],[19.2,46],[19.7,46.2],[20,46.2],[20.3,46.1],[20.7,45.8],[20.8,45.6],[21.4,45.2],[21.4,45],[21.4,44.9],[21.6,44.7],[22,44.6],[22.3,44.7],[22.7,44.6],[22.6,44.5],[22.6,44.3],[22.6,44.1],[22.4,43.7],[22.7,43.4],[23,43.2],[22.5,42.9],[22.5,42.5],[22.3,42.4],[21.9,42.3],[21.5,42.3],[21.1,42.2],[20.8,41.9],[20.5,42.2],[20.2,42.3],[20.1,42.6]]],"type":"Polygon"},"type":"Feature","properties":{"iso2":"RS","lng":21,"lat":44}},{"geometry":{"coordinates":[[[[104.3,77.7],[110.9,76.8],[110,74.4],[110.6,73.8],[117,73.6],[127.3,71.4],[135.3,71.6],[143.1,72.7],[148.5,72.3],[159,70.9],[168.2,69.5],[178.2,69.4],[177,64.7],[173.4,61.6],[164.3,60.1],[161.7,55.6],[155.9,54],[164,61.4],[159.8,61.3],[152.6,59],[144.5,59.4],[136.7,53.8],[141.3,52.3],[135,43.5],[133.5,45.6],[127.5,50.2],[120.5,51.9],[109.6,49.2],[98.7,51.8],[89.7,49.8],[80.3,50.9],[71.1,54.3],[61.4,54.1],[57.9,51.1],[48.7,50.5],[47.5,45.5],[43.1,43],[38.4,46.7],[37.8,50.1],[31.9,54],[29.5,60],[29.6,65.3],[33,69.5],[38.6,66.1],[34.6,65.2],[39.7,65.5],[46.5,68],[52.3,68.3],[59,68.9],[67.3,68.7],[70.2,72.9],[72.3,67.3],[74.5,68.7],[74,69.1],[78,71],[82.9,71.7],[80.5,73.2],[86.5,74.3],[93.2,75.8],[99.1,75.5],[104.3,77.7]]],[[[68.3,77],[68.9,76.6],[67.7,76.2],[66.7,76.1],[65.2,75.8],[64.2,75.7],[63.2,75.6],[62.3,75.4],[61.4,75.2],[60.7,75.1],[60.5,75],[60.5,74.9],[60.1,74.7],[59.9,74.6],[59.2,74.6],[58.6,74.5],[58.7,74.2],[58.2,74.1],[57.6,74.2],[57.9,73.9],[57.3,73.8],[57,73.8],[57,73.6],[57,73.4],[56.6,73.3],[55.9,73.4],[55,73.4],[54.1,73.4],[54.5,73.6],[54.4,73.7],[53.6,73.7],[54.2,73.9],[54.8,74.1],[55.9,74.1],[55.7,74.3],[56.3,74.5],[55.9,74.7],[57,74.7],[55.9,74.8],[56.4,75],[55.8,75.1],[56.3,75.2],[56.9,75.3],[57.5,75.3],[58,75.6],[58.5,75.8],[59.4,75.9],[60.3,76],[60.5,76],[60.9,76.2],[61.8,76.3],[62.8,76.3],[63.7,76.3],[64.8,76.5],[65.5,76.6],[65.9,76.7],[66.7,76.9],[67.6,77],[68.3,77]]],[[[97.6,80.2],[98,80.1],[97.6,79.8],[97.3,79.7],[97.7,79.8],[97.9,79.9],[98.2,79.9],[98.6,80],[98.5,80.1],[98.8,80],[99.1,80],[99.5,79.9],[99.8,79.9],[100,79.7],[99.7,79.6],[99.7,79.3],[99.4,79.3],[99.1,79.3],[99.6,79.2],[99.7,79.1],[99.9,79],[99.7,78.9],[99.4,78.8],[99,78.8],[98.6,78.8],[98,78.8],[97.6,78.8],[97.2,78.9],[96.9,79],[96.3,79],[96.1,79],[95.7,79],[95.7,79.1],[95.3,79.1],[95,79],[94.6,79.2],[94.3,79.2],[94.4,79.4],[94.2,79.5],[94.1,79.4],[93.7,79.5],[93.8,79.6],[93.5,79.5],[93.2,79.4],[93.2,79.5],[92.9,79.6],[93.8,79.7],[94.3,79.8],[94.6,79.8],[94.2,79.9],[94.6,80],[95,80.1],[95.2,80],[95.4,80.1],[96,80.1],[96.4,80.1],[97.1,80.2],[97.5,80.2],[97.6,80.2]]],[[[-179.6,68.9],[-179.1,68.8],[-178.8,68.6],[-178,68.3],[-178.4,68.6],[-177.4,68.2],[-176.8,68.1],[-175.6,67.8],[-175.3,67.4],[-174.8,67.4],[-174.8,66.7],[-174.5,66.6],[-174.3,66.4],[-174,66.2],[-174.1,66.6],[-174.4,67],[-174.2,67.1],[-173.4,67.1],[-173.4,66.8],[-172.6,66.9],[-173,67.1],[-171.7,67],[-171.3,66.7],[-170.5,66.3],[-170.2,66.3],[-169.9,66.1],[-170,66],[-170.5,65.7],[-171.3,65.8],[-171.1,65.5],[-171.9,65.5],[-172.3,65.6],[-172.7,65.6],[-172.3,65.4],[-172.7,65.2],[-172.4,64.9],[-173.2,64.8],[-173.1,64.7],[-172.4,64.4],[-173,64.5],[-173.3,64.3],[-173.4,64.5],[-174.1,64.5],[-175,64.8],[-175.8,64.9],[-175.9,65.4],[-176.6,65.6],[-177.5,65.5],[-178.6,65.5],[-178.9,65.9],[-178.5,66.3],[-179.1,66.2],[-179.2,66.2],[-179.7,66.2],[-179.4,65.6],[-179.6,65.2],[-180,66.1],[-179.6,68.9]]],[[[128.1,72.6],[128.6,72.5],[128.7,72.5],[128.8,72.5],[128.9,72.5],[129,72.5],[129.1,72.5],[129.2,72.5],[129.3,72.5],[129.3,72.4],[129.4,72.4],[129.5,72.4],[129.5,72.3],[129.4,72.3],[129.3,72.3],[129.5,72.2],[129.6,72.2],[129.4,72.2],[129.2,72.1],[129.3,72.1],[129.4,72.1],[129.5,72.1],[129,72.1],[128.9,72.1],[128.8,72.1],[128.7,72.1],[128.5,72.1],[128.5,72.2],[128.6,72.2],[128.4,72.2],[128.2,72.2],[128,72.3],[127.9,72.3],[127.7,72.4],[127.6,72.4],[127.5,72.4],[127.4,72.4],[127.3,72.4],[127.2,72.4],[127.1,72.4],[127,72.4],[126.8,72.4],[126.7,72.4],[126.6,72.5],[126.7,72.5],[126.8,72.5],[126.9,72.5],[127,72.5],[127,72.6],[127.1,72.6],[127.2,72.6],[127.3,72.6],[127.4,72.6],[127.5,72.6],[127.7,72.6],[127.8,72.6],[128,72.6],[128.1,72.6]]],[[[124.6,73.7],[124.8,73.7],[125,73.6],[125.1,73.7],[125.2,73.7],[125.2,73.5],[125.4,73.6],[125.5,73.5],[125.6,73.4],[125.9,73.5],[126.2,73.6],[126.3,73.5],[126.3,73.4],[126.2,73.4],[126.5,73.4],[126.6,73.3],[126.7,73.2],[126.6,73],[126.4,73],[126.3,72.9],[126.4,72.8],[126.2,72.5],[126.3,72.4],[126.1,72.3],[125.9,72.4],[125.7,72.4],[125.5,72.4],[125.3,72.5],[125.2,72.6],[125,72.6],[124.8,72.6],[124.7,72.7],[124.4,72.7],[124.2,72.8],[124,72.8],[123.8,72.8],[123.6,72.8],[123.4,72.8],[123.3,72.9],[123.1,72.9],[122.9,72.9],[122.5,72.9],[122.4,73],[122.7,73],[122.9,73],[123.4,73.2],[123.6,73.2],[123.4,73.3],[123.2,73.6],[123.4,73.6],[123.5,73.7],[123.7,73.6],[123.9,73.7],[124,73.8],[124,73.7],[124.2,73.8],[124.4,73.8],[124.6,73.7]]],[[[54.7,81.1],[54.9,81.1],[55,81.1],[55.1,81.1],[55.2,81.1],[55.3,81],[55.4,81],[55.5,81],[55.6,81],[55.8,81],[56,81],[56.1,81],[56.4,81],[56.6,81],[56.6,80.9],[56.7,80.9],[56.8,80.9],[56.9,80.9],[57,80.9],[57.1,80.9],[57.2,80.9],[57.3,80.9],[57.5,80.8],[57.6,80.8],[57.7,80.8],[57.5,80.7],[57.4,80.7],[57.3,80.7],[57.2,80.7],[57.1,80.7],[57,80.7],[56.9,80.7],[56.8,80.8],[56.7,80.8],[56.6,80.8],[56.5,80.8],[56.3,80.8],[56.2,80.8],[56.1,80.8],[56,80.8],[55.8,80.9],[55.7,80.9],[55.6,80.9],[55.5,80.9],[55.4,80.9],[55.2,81],[55.1,81],[55,80.9],[55,81],[54.9,81],[54.8,81],[54.7,81],[54.6,81],[54.5,81],[54.4,81],[54.6,81.1],[54.7,81.1]]]],"type":"MultiPolygon"},"type":"Feature","properties":{"iso2":"RU","lng":100,"lat":60}},{"geometry":{"coordinates":[[[[21.8,68.6],[23,68.3],[23.5,67.6],[23.7,67],[23.7,66.2],[23.5,65.8],[22.4,65.9],[22.1,65.5],[21.6,65.2],[21.2,64.8],[21.6,64.4],[20.4,63.7],[19.5,63.6],[18.9,63.2],[17.9,62.8],[17.5,62.4],[17.5,62],[17.2,61.6],[17.5,60.6],[18.4,60.3],[19.1,59.8],[18.2,59.4],[17.7,59.6],[17.4,59.5],[16.5,59.5],[17.1,59.4],[18.4,59.3],[17.9,58.9],[17.1,58.8],[16.2,58.6],[16.8,58.2],[16.7,57.7],[16.6,57.1],[16,56.3],[14.8,56.1],[14.3,55.6],[13.4,55.3],[12.7,56.2],[12.8,56.6],[12.2,57.3],[11.7,57.8],[11.2,58.3],[11.4,59.1],[11.8,59.7],[12.6,60.4],[12.6,61.1],[12.3,62.1],[12.2,63],[12.7,64],[14.1,64.5],[14.4,65.2],[15,66.1],[16.2,67.3],[17.6,68],[18.6,68.5],[20,68.5],[20.8,69],[21.8,68.6]]],[[[18.2,56.9],[18.1,56.9],[18.2,57],[18.3,57],[18.3,57.1],[18.2,57.1],[18.1,57.2],[18.2,57.3],[18.1,57.4],[18.1,57.5],[18.1,57.6],[18.2,57.6],[18.3,57.6],[18.3,57.7],[18.4,57.7],[18.4,57.8],[18.5,57.8],[18.7,57.9],[18.9,57.9],[19,57.9],[19,57.8],[18.9,57.7],[18.8,57.7],[18.8,57.5],[18.8,57.4],[18.7,57.2],[18.6,57.2],[18.5,57.2],[18.4,57.2],[18.4,57.1],[18.3,56.9],[18.2,56.9]]],[[[16.8,56.8],[16.7,56.7],[16.6,56.5],[16.6,56.4],[16.6,56.3],[16.5,56.2],[16.4,56.2],[16.4,56.3],[16.4,56.5],[16.4,56.6],[16.5,56.8],[16.6,56.9],[16.7,56.9],[16.8,57.1],[16.9,57.1],[17,57.2],[17,57.3],[17,57.4],[17.1,57.4],[17.1,57.3],[17.1,57.2],[17,57.1],[16.9,57],[16.9,56.9],[16.8,56.8]]],[],[],[],[]],"type":"MultiPolygon"},"type":"Feature","properties":{"iso2":"SE","lng":15,"lat":62}},{"geometry":{"coordinates":[[[13.7,46.5],[13.9,46.5],[14.2,46.4],[14.8,46.5],[14.9,46.6],[15.1,46.7],[15.4,46.7],[15.8,46.7],[16,46.8],[16.2,46.9],[16.3,46.8],[16.4,46.7],[16.6,46.5],[16.3,46.5],[16.3,46.4],[16.1,46.3],[15.8,46.2],[15.6,46.2],[15.7,46.1],[15.7,45.9],[15.6,45.8],[15.3,45.8],[15.4,45.7],[15.3,45.5],[15.1,45.5],[14.9,45.5],[14.7,45.5],[14.6,45.7],[14.5,45.5],[14.1,45.5],[13.9,45.5],[13.6,45.5],[13.8,45.5],[13.7,45.6],[13.8,45.7],[13.7,45.8],[13.6,45.9],[13.5,46],[13.6,46.1],[13.7,46.2],[13.5,46.2],[13.4,46.3],[13.7,46.4],[13.7,46.5]]],"type":"Polygon"},"type":"Feature","properties":{"iso2":"SI","lng":14.8,"lat":46.1}},{"geometry":{"coordinates":[[[17.3,48],[17.1,48.1],[17,48.3],[16.9,48.4],[17,48.7],[17.2,48.9],[17.5,48.8],[17.8,48.9],[18.1,49.1],[18.2,49.3],[18.5,49.5],[18.8,49.5],[19,49.4],[19.3,49.5],[19.5,49.5],[19.8,49.4],[19.9,49.2],[20.1,49.3],[20.4,49.4],[20.8,49.3],[21,49.4],[21.4,49.4],[21.8,49.4],[22.2,49.2],[22.5,49.1],[22.5,49],[22.4,48.8],[22.2,48.4],[21.9,48.4],[21.7,48.4],[21.5,48.5],[21.2,48.5],[20.9,48.5],[20.7,48.6],[20.4,48.4],[20.2,48.3],[19.9,48.1],[19.6,48.2],[19.2,48.1],[18.9,48.1],[18.8,47.9],[18.7,47.8],[18.4,47.8],[18.2,47.7],[17.9,47.8],[17.7,47.8],[17.4,48],[17.3,48]]],"type":"Polygon"},"type":"Feature","properties":{"iso2":"SK","lng":19.5,"lat":48.7}},{"geometry":{"coordinates":[],"type":"Polygon"},"type":"Feature","properties":{"iso2":"SM","lng":12.4,"lat":43.8}},{"geometry":{"coordinates":[[[[35.1,42],[36.1,41.7],[36.6,41.4],[37.4,41.1],[38.2,40.9],[39.1,41.1],[40.3,41],[41.4,41.4],[42.3,41.5],[43.2,41.2],[43.7,40.7],[44,40],[44.8,39.6],[44.2,39],[44.5,38.3],[44.6,37.4],[44.2,37.1],[43.5,37.2],[42.4,37.1],[41.5,37.1],[40.3,36.9],[39,36.7],[38,36.8],[37,36.7],[36.5,36.2],[36,35.9],[36,36.5],[35.7,36.8],[34.9,36.8],[34,36.3],[32.8,36],[32,36.5],[30.7,36.9],[30.3,36.3],[29.3,36.2],[28.9,36.7],[28.2,36.7],[27.7,36.7],[27.8,37],[27.5,37.1],[27.2,37.5],[26.8,38.2],[26.4,38.3],[26.5,38.6],[27,38.5],[26.8,39],[27,39.6],[26.2,39.7],[26.7,40.3],[27.5,40.3],[28,40.4],[29,40.5],[29.6,40.7],[29.1,40.9],[29.9,41.1],[30.9,41.1],[32,41.5],[33.2,42],[34.2,42],[35.1,42]]],[[[27.4,42],[27.6,42],[27.8,42],[28,42],[28,41.8],[28.2,41.5],[28.5,41.4],[28.9,41.3],[29,41.3],[29.1,41.2],[29,41.1],[28.8,41],[28.6,41.1],[28.5,41],[28.4,41.1],[28.1,41.1],[27.9,41],[27.7,41],[27.5,40.9],[27.4,40.8],[27.2,40.6],[27,40.6],[26.7,40.5],[26.6,40.4],[26.4,40.2],[26.2,40.1],[26.2,40.2],[26.3,40.3],[26.4,40.4],[26.6,40.5],[26.8,40.7],[26.6,40.6],[26.3,40.6],[26.1,40.7],[26.1,40.8],[26.2,40.9],[26.4,41],[26.3,41.2],[26.6,41.3],[26.6,41.5],[26.5,41.6],[26.3,41.7],[26.4,41.8],[26.6,41.9],[26.9,42],[27,42.1],[27.2,42.1],[27.4,42.1],[27.4,42]]],[],[],[]],"type":"MultiPolygon"},"type":"Feature","properties":{"iso2":"TR","lng":35,"lat":39}},{"geometry":{"coordinates":[[[[33.4,52.4],[34.2,51.7],[35.1,51.1],[35.5,50.5],[36.5,50.2],[37.7,50.1],[38.7,49.9],[39.5,49.8],[40.2,49.2],[40,48.8],[39.8,47.9],[38.8,47.9],[38.1,47.1],[36.8,46.8],[35.5,46.5],[35,46.2],[34.2,46.3],[34.1,45.9],[35.1,45.5],[34.7,46.1],[36.1,45.5],[35.9,45],[34.7,44.8],[33.4,44.6],[33.1,45.2],[32.8,45.6],[33.6,46],[32.5,46.1],[31.5,46.6],[32.2,46.6],[31.9,47.1],[30.9,46.6],[29.9,45.7],[29.7,45.2],[28.4,45.3],[28.8,45.9],[29.4,46.5],[30,46.6],[29.3,47.5],[28.7,48.1],[27.8,48.5],[26.1,48],[24.9,47.7],[23.8,48],[22.7,48.1],[22.5,48.9],[22.8,49.7],[24.1,50.7],[23.7,51.5],[24.9,51.9],[26.2,51.9],[27.2,51.7],[28.2,51.7],[29.2,51.6],[30.3,51.4],[30.9,52.1],[32.3,52.1],[33.4,52.4]]],[],[],[]],"type":"MultiPolygon"},"type":"Feature","properties":{"iso2":"UA","lng":32,"lat":49}},{"geometry":{"coordinates":[[[64.4,39],[63.7,39.3],[62.9,39.7],[62.3,40.4],[61.7,41.2],[60.9,41.3],[60.2,41.3],[60.3,41.8],[59.4,42.3],[58.8,42.7],[58.1,42.6],[57.9,42.4],[57.4,42.2],[57,41.5],[56.4,41.3],[56,42.8],[56.3,45.1],[58,45.5],[62,43.5],[64,43.6],[65.6,43.2],[66,42.3],[66.9,41.1],[67.9,41.2],[68.3,40.7],[68.9,41.1],[69.6,41.7],[70.5,42.1],[71.2,42.2],[70.5,41.8],[70.6,41.5],[71.4,41.3],[71.6,41.6],[72.3,41],[73.1,40.8],[72.4,40.4],[71.5,40.2],[70.8,40.2],[70.4,40.5],[70.4,41.1],[69.8,40.6],[69.3,40.6],[68.7,40.2],[68.9,40],[68.5,39.6],[67.4,39.5],[67.9,39],[68.1,38.4],[68.1,37.8],[67.7,37.2],[66.8,37.4],[66.7,38],[65.8,38.2],[64.9,38.7],[64.4,39]]],"type":"Polygon"},"type":"Feature","properties":{"iso2":"UZ","lng":64,"lat":41}},{"geometry":{"coordinates":[],"type":"Polygon"},"type":"Feature","properties":{"iso2":"VA","lng":12.4,"lat":41.9}},{"geometry":{"coordinates":[[[20.8,42.1],[20.7,41.8],[20.6,41.9],[20.5,42.2],[20.3,42.3],[20.1,42.6],[20.3,42.8],[20.5,42.9],[20.6,43.2],[20.8,43.3],[21,43.1],[21.1,43.1],[21.3,42.9],[21.4,42.9],[21.6,42.7],[21.8,42.7],[21.7,42.4],[21.5,42.3],[21.6,42.2],[21.4,42.2],[20.8,42.1]]],"type":"Polygon"},"type":"Feature","properties":{"iso2":"XK","lng":21.2,"lat":42.7}}],"type":"FeatureCollection"};
},{}],"memoBind.js":[function(require,module,exports){
'use strict';Object.defineProperty(exports,'__esModule',{value:true});var _toConsumableArray2=require('babel-runtime/helpers/toConsumableArray');var _toConsumableArray3=_interopRequireDefault(_toConsumableArray2);var _stringify=require('babel-runtime/core-js/json/stringify');var _stringify2=_interopRequireDefault(_stringify);var _typeof2=require('babel-runtime/helpers/typeof');var _typeof3=_interopRequireDefault(_typeof2);exports.default=memoBind;function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj}}function memoBind(thisArg,funcName,keyArgs,extraArgs){if((typeof thisArg==='undefined'?'undefined':(0,_typeof3.default)(thisArg))!=='object'||!thisArg){throw new TypeError('Invalid thisArg parameter.')}var func=thisArg[funcName];if(typeof func!=='function'){throw new TypeError('\''+funcName+'\' is not a function.')}if(thisArg._memCache==null){thisArg._memCache={}}if(thisArg._memCache[funcName]==null){thisArg._memCache[funcName]={}}var cache=thisArg._memCache[funcName];var memoKey=(0,_stringify2.default)(keyArgs);if(cache[memoKey]==null){cache[memoKey]=func.apply(thisArg,[].concat((0,_toConsumableArray3.default)(keyArgs),(0,_toConsumableArray3.default)(extraArgs||[])))}return cache[memoKey]}
},{"babel-runtime/core-js/json/stringify":2,"babel-runtime/helpers/toConsumableArray":5,"babel-runtime/helpers/typeof":6}]},{},[])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL2FycmF5L2Zyb20uanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL2pzb24vc3RyaW5naWZ5LmpzIiwibm9kZV9tb2R1bGVzL2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9zeW1ib2wuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9jb3JlLWpzL3N5bWJvbC9pdGVyYXRvci5qcyIsIm5vZGVfbW9kdWxlcy9iYWJlbC1ydW50aW1lL2hlbHBlcnMvdG9Db25zdW1hYmxlQXJyYXkuanMiLCJub2RlX21vZHVsZXMvYmFiZWwtcnVudGltZS9oZWxwZXJzL3R5cGVvZi5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vYXJyYXkvZnJvbS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vanNvbi9zdHJpbmdpZnkuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L2ZuL3N5bWJvbC9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvZm4vc3ltYm9sL2l0ZXJhdG9yLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hLWZ1bmN0aW9uLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19hZGQtdG8tdW5zY29wYWJsZXMuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2FuLW9iamVjdC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fYXJyYXktaW5jbHVkZXMuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2NsYXNzb2YuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2NvZi5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY29yZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fY3JlYXRlLXByb3BlcnR5LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19jdHguanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2RlZmluZWQuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2Rlc2NyaXB0b3JzLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19kb20tY3JlYXRlLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19lbnVtLWJ1Zy1rZXlzLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19lbnVtLWtleXMuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2V4cG9ydC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fZmFpbHMuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2dsb2JhbC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faGFzLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19oaWRlLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19odG1sLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pZTgtZG9tLWRlZmluZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faW9iamVjdC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXMtYXJyYXktaXRlci5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXMtYXJyYXkuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2lzLW9iamVjdC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlci1jYWxsLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pdGVyLWNyZWF0ZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9faXRlci1kZWZpbmUuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXItZGV0ZWN0LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19pdGVyLXN0ZXAuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2l0ZXJhdG9ycy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fa2V5b2YuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX2xpYnJhcnkuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX21ldGEuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1jcmVhdGUuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1kcC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWRwcy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWdvcGQuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1nb3BuLWV4dC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWdvcG4uanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1nb3BzLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3QtZ3BvLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19vYmplY3Qta2V5cy1pbnRlcm5hbC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fb2JqZWN0LWtleXMuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX29iamVjdC1waWUuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3Byb3BlcnR5LWRlc2MuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3JlZGVmaW5lLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zZXQtdG8tc3RyaW5nLXRhZy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2hhcmVkLWtleS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fc2hhcmVkLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL19zdHJpbmctYXQuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLWluZGV4LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1pbnRlZ2VyLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1pb2JqZWN0LmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL190by1sZW5ndGguanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3RvLW9iamVjdC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9fdG8tcHJpbWl0aXZlLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL191aWQuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3drcy1kZWZpbmUuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3drcy1leHQuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvX3drcy5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9jb3JlLmdldC1pdGVyYXRvci1tZXRob2QuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2LmFycmF5LmZyb20uanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2LmFycmF5Lml0ZXJhdG9yLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5vYmplY3QudG8tc3RyaW5nLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNi5zdHJpbmcuaXRlcmF0b3IuanMiLCJub2RlX21vZHVsZXMvY29yZS1qcy9saWJyYXJ5L21vZHVsZXMvZXM2LnN5bWJvbC5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy9lczcuc3ltYm9sLmFzeW5jLWl0ZXJhdG9yLmpzIiwibm9kZV9tb2R1bGVzL2NvcmUtanMvbGlicmFyeS9tb2R1bGVzL2VzNy5zeW1ib2wub2JzZXJ2YWJsZS5qcyIsIm5vZGVfbW9kdWxlcy9jb3JlLWpzL2xpYnJhcnkvbW9kdWxlcy93ZWIuZG9tLml0ZXJhYmxlLmpzIiwibm9kZV9tb2R1bGVzL2RlZXAtZGlmZi9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX2dldFByb3RvdHlwZS5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvX292ZXJBcmcuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoL2lzT2JqZWN0TGlrZS5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gvaXNQbGFpbk9iamVjdC5qcyIsIm5vZGVfbW9kdWxlcy9yZWR1eC1sb2dnZXIvbGliL2NvcmUuanMiLCJub2RlX21vZHVsZXMvcmVkdXgtbG9nZ2VyL2xpYi9kZWZhdWx0cy5qcyIsIm5vZGVfbW9kdWxlcy9yZWR1eC1sb2dnZXIvbGliL2RpZmYuanMiLCJub2RlX21vZHVsZXMvcmVkdXgtbG9nZ2VyL2xpYi9oZWxwZXJzLmpzIiwibm9kZV9tb2R1bGVzL3JlZHV4LWxvZ2dlci9saWIvaW5kZXguanMiLCJub2RlX21vZHVsZXMvcmVkdXgtdGh1bmsvbGliL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3JlZHV4L2xpYi9hcHBseU1pZGRsZXdhcmUuanMiLCJub2RlX21vZHVsZXMvcmVkdXgvbGliL2JpbmRBY3Rpb25DcmVhdG9ycy5qcyIsIm5vZGVfbW9kdWxlcy9yZWR1eC9saWIvY29tYmluZVJlZHVjZXJzLmpzIiwibm9kZV9tb2R1bGVzL3JlZHV4L2xpYi9jb21wb3NlLmpzIiwibm9kZV9tb2R1bGVzL3JlZHV4L2xpYi9jcmVhdGVTdG9yZS5qcyIsIm5vZGVfbW9kdWxlcy9yZWR1eC9saWIvaW5kZXguanMiLCJub2RlX21vZHVsZXMvcmVkdXgvbGliL3V0aWxzL3dhcm5pbmcuanMiLCJub2RlX21vZHVsZXMvc3ltYm9sLW9ic2VydmFibGUvaW5kZXguanMiLCJub2RlX21vZHVsZXMvc3ltYm9sLW9ic2VydmFibGUvbGliL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL3N5bWJvbC1vYnNlcnZhYmxlL2xpYi9wb255ZmlsbC5qcyIsImNvbmZpZ3VyZVN0b3JlLmpzIiwiZXVyb3BlLmdlby5qcyIsIm1lbW9CaW5kLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7O0FDQUE7O0FDQUE7O0FDQUE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEJBO0FBQ0E7QUFDQTs7QUNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBOztBQ0ZBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBOztBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTs7QUNBQTtBQUNBO0FBQ0E7O0FDRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBOztBQ0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BCQTtBQUNBO0FBQ0E7O0FDRkE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1JBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQ0E7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMU9BOztBQ0FBOztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUN0YUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1SUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcFFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4QkE7QUFDQTs7O0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RCQTs7QUNBQTs7QUNBQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vYXJyYXkvZnJvbVwiKSwgX19lc01vZHVsZTogdHJ1ZSB9OyIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9qc29uL3N0cmluZ2lmeVwiKSwgX19lc01vZHVsZTogdHJ1ZSB9OyIsIm1vZHVsZS5leHBvcnRzID0geyBcImRlZmF1bHRcIjogcmVxdWlyZShcImNvcmUtanMvbGlicmFyeS9mbi9zeW1ib2xcIiksIF9fZXNNb2R1bGU6IHRydWUgfTsiLCJtb2R1bGUuZXhwb3J0cyA9IHsgXCJkZWZhdWx0XCI6IHJlcXVpcmUoXCJjb3JlLWpzL2xpYnJhcnkvZm4vc3ltYm9sL2l0ZXJhdG9yXCIpLCBfX2VzTW9kdWxlOiB0cnVlIH07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5cbnZhciBfZnJvbSA9IHJlcXVpcmUoXCIuLi9jb3JlLWpzL2FycmF5L2Zyb21cIik7XG5cbnZhciBfZnJvbTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9mcm9tKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZXhwb3J0cy5kZWZhdWx0ID0gZnVuY3Rpb24gKGFycikge1xuICBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSB7XG4gICAgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBBcnJheShhcnIubGVuZ3RoKTsgaSA8IGFyci5sZW5ndGg7IGkrKykge1xuICAgICAgYXJyMltpXSA9IGFycltpXTtcbiAgICB9XG5cbiAgICByZXR1cm4gYXJyMjtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gKDAsIF9mcm9tMi5kZWZhdWx0KShhcnIpO1xuICB9XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuXG52YXIgX2l0ZXJhdG9yID0gcmVxdWlyZShcIi4uL2NvcmUtanMvc3ltYm9sL2l0ZXJhdG9yXCIpO1xuXG52YXIgX2l0ZXJhdG9yMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2l0ZXJhdG9yKTtcblxudmFyIF9zeW1ib2wgPSByZXF1aXJlKFwiLi4vY29yZS1qcy9zeW1ib2xcIik7XG5cbnZhciBfc3ltYm9sMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3N5bWJvbCk7XG5cbnZhciBfdHlwZW9mID0gdHlwZW9mIF9zeW1ib2wyLmRlZmF1bHQgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgX2l0ZXJhdG9yMi5kZWZhdWx0ID09PSBcInN5bWJvbFwiID8gZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfSA6IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgX3N5bWJvbDIuZGVmYXVsdCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gX3N5bWJvbDIuZGVmYXVsdCAmJiBvYmogIT09IF9zeW1ib2wyLmRlZmF1bHQucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmV4cG9ydHMuZGVmYXVsdCA9IHR5cGVvZiBfc3ltYm9sMi5kZWZhdWx0ID09PSBcImZ1bmN0aW9uXCIgJiYgX3R5cGVvZihfaXRlcmF0b3IyLmRlZmF1bHQpID09PSBcInN5bWJvbFwiID8gZnVuY3Rpb24gKG9iaikge1xuICByZXR1cm4gdHlwZW9mIG9iaiA9PT0gXCJ1bmRlZmluZWRcIiA/IFwidW5kZWZpbmVkXCIgOiBfdHlwZW9mKG9iaik7XG59IDogZnVuY3Rpb24gKG9iaikge1xuICByZXR1cm4gb2JqICYmIHR5cGVvZiBfc3ltYm9sMi5kZWZhdWx0ID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBfc3ltYm9sMi5kZWZhdWx0ICYmIG9iaiAhPT0gX3N5bWJvbDIuZGVmYXVsdC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iaiA9PT0gXCJ1bmRlZmluZWRcIiA/IFwidW5kZWZpbmVkXCIgOiBfdHlwZW9mKG9iaik7XG59OyIsInJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2LnN0cmluZy5pdGVyYXRvcicpO1xucmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczYuYXJyYXkuZnJvbScpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJykuQXJyYXkuZnJvbTsiLCJ2YXIgY29yZSAgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL19jb3JlJylcbiAgLCAkSlNPTiA9IGNvcmUuSlNPTiB8fCAoY29yZS5KU09OID0ge3N0cmluZ2lmeTogSlNPTi5zdHJpbmdpZnl9KTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc3RyaW5naWZ5KGl0KXsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuICByZXR1cm4gJEpTT04uc3RyaW5naWZ5LmFwcGx5KCRKU09OLCBhcmd1bWVudHMpO1xufTsiLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5zeW1ib2wnKTtcbnJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM2Lm9iamVjdC50by1zdHJpbmcnKTtcbnJlcXVpcmUoJy4uLy4uL21vZHVsZXMvZXM3LnN5bWJvbC5hc3luYy1pdGVyYXRvcicpO1xucmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9lczcuc3ltYm9sLm9ic2VydmFibGUnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vLi4vbW9kdWxlcy9fY29yZScpLlN5bWJvbDsiLCJyZXF1aXJlKCcuLi8uLi9tb2R1bGVzL2VzNi5zdHJpbmcuaXRlcmF0b3InKTtcbnJlcXVpcmUoJy4uLy4uL21vZHVsZXMvd2ViLmRvbS5pdGVyYWJsZScpO1xubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi8uLi9tb2R1bGVzL193a3MtZXh0JykuZignaXRlcmF0b3InKTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgaWYodHlwZW9mIGl0ICE9ICdmdW5jdGlvbicpdGhyb3cgVHlwZUVycm9yKGl0ICsgJyBpcyBub3QgYSBmdW5jdGlvbiEnKTtcbiAgcmV0dXJuIGl0O1xufTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCl7IC8qIGVtcHR5ICovIH07IiwidmFyIGlzT2JqZWN0ID0gcmVxdWlyZSgnLi9faXMtb2JqZWN0Jyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgaWYoIWlzT2JqZWN0KGl0KSl0aHJvdyBUeXBlRXJyb3IoaXQgKyAnIGlzIG5vdCBhbiBvYmplY3QhJyk7XG4gIHJldHVybiBpdDtcbn07IiwiLy8gZmFsc2UgLT4gQXJyYXkjaW5kZXhPZlxuLy8gdHJ1ZSAgLT4gQXJyYXkjaW5jbHVkZXNcbnZhciB0b0lPYmplY3QgPSByZXF1aXJlKCcuL190by1pb2JqZWN0JylcbiAgLCB0b0xlbmd0aCAgPSByZXF1aXJlKCcuL190by1sZW5ndGgnKVxuICAsIHRvSW5kZXggICA9IHJlcXVpcmUoJy4vX3RvLWluZGV4Jyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKElTX0lOQ0xVREVTKXtcbiAgcmV0dXJuIGZ1bmN0aW9uKCR0aGlzLCBlbCwgZnJvbUluZGV4KXtcbiAgICB2YXIgTyAgICAgID0gdG9JT2JqZWN0KCR0aGlzKVxuICAgICAgLCBsZW5ndGggPSB0b0xlbmd0aChPLmxlbmd0aClcbiAgICAgICwgaW5kZXggID0gdG9JbmRleChmcm9tSW5kZXgsIGxlbmd0aClcbiAgICAgICwgdmFsdWU7XG4gICAgLy8gQXJyYXkjaW5jbHVkZXMgdXNlcyBTYW1lVmFsdWVaZXJvIGVxdWFsaXR5IGFsZ29yaXRobVxuICAgIGlmKElTX0lOQ0xVREVTICYmIGVsICE9IGVsKXdoaWxlKGxlbmd0aCA+IGluZGV4KXtcbiAgICAgIHZhbHVlID0gT1tpbmRleCsrXTtcbiAgICAgIGlmKHZhbHVlICE9IHZhbHVlKXJldHVybiB0cnVlO1xuICAgIC8vIEFycmF5I3RvSW5kZXggaWdub3JlcyBob2xlcywgQXJyYXkjaW5jbHVkZXMgLSBub3RcbiAgICB9IGVsc2UgZm9yKDtsZW5ndGggPiBpbmRleDsgaW5kZXgrKylpZihJU19JTkNMVURFUyB8fCBpbmRleCBpbiBPKXtcbiAgICAgIGlmKE9baW5kZXhdID09PSBlbClyZXR1cm4gSVNfSU5DTFVERVMgfHwgaW5kZXggfHwgMDtcbiAgICB9IHJldHVybiAhSVNfSU5DTFVERVMgJiYgLTE7XG4gIH07XG59OyIsIi8vIGdldHRpbmcgdGFnIGZyb20gMTkuMS4zLjYgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZygpXG52YXIgY29mID0gcmVxdWlyZSgnLi9fY29mJylcbiAgLCBUQUcgPSByZXF1aXJlKCcuL193a3MnKSgndG9TdHJpbmdUYWcnKVxuICAvLyBFUzMgd3JvbmcgaGVyZVxuICAsIEFSRyA9IGNvZihmdW5jdGlvbigpeyByZXR1cm4gYXJndW1lbnRzOyB9KCkpID09ICdBcmd1bWVudHMnO1xuXG4vLyBmYWxsYmFjayBmb3IgSUUxMSBTY3JpcHQgQWNjZXNzIERlbmllZCBlcnJvclxudmFyIHRyeUdldCA9IGZ1bmN0aW9uKGl0LCBrZXkpe1xuICB0cnkge1xuICAgIHJldHVybiBpdFtrZXldO1xuICB9IGNhdGNoKGUpeyAvKiBlbXB0eSAqLyB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgdmFyIE8sIFQsIEI7XG4gIHJldHVybiBpdCA9PT0gdW5kZWZpbmVkID8gJ1VuZGVmaW5lZCcgOiBpdCA9PT0gbnVsbCA/ICdOdWxsJ1xuICAgIC8vIEBAdG9TdHJpbmdUYWcgY2FzZVxuICAgIDogdHlwZW9mIChUID0gdHJ5R2V0KE8gPSBPYmplY3QoaXQpLCBUQUcpKSA9PSAnc3RyaW5nJyA/IFRcbiAgICAvLyBidWlsdGluVGFnIGNhc2VcbiAgICA6IEFSRyA/IGNvZihPKVxuICAgIC8vIEVTMyBhcmd1bWVudHMgZmFsbGJhY2tcbiAgICA6IChCID0gY29mKE8pKSA9PSAnT2JqZWN0JyAmJiB0eXBlb2YgTy5jYWxsZWUgPT0gJ2Z1bmN0aW9uJyA/ICdBcmd1bWVudHMnIDogQjtcbn07IiwidmFyIHRvU3RyaW5nID0ge30udG9TdHJpbmc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbChpdCkuc2xpY2UoOCwgLTEpO1xufTsiLCJ2YXIgY29yZSA9IG1vZHVsZS5leHBvcnRzID0ge3ZlcnNpb246ICcyLjQuMCd9O1xuaWYodHlwZW9mIF9fZSA9PSAnbnVtYmVyJylfX2UgPSBjb3JlOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVuZGVmIiwiJ3VzZSBzdHJpY3QnO1xudmFyICRkZWZpbmVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpXG4gICwgY3JlYXRlRGVzYyAgICAgID0gcmVxdWlyZSgnLi9fcHJvcGVydHktZGVzYycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG9iamVjdCwgaW5kZXgsIHZhbHVlKXtcbiAgaWYoaW5kZXggaW4gb2JqZWN0KSRkZWZpbmVQcm9wZXJ0eS5mKG9iamVjdCwgaW5kZXgsIGNyZWF0ZURlc2MoMCwgdmFsdWUpKTtcbiAgZWxzZSBvYmplY3RbaW5kZXhdID0gdmFsdWU7XG59OyIsIi8vIG9wdGlvbmFsIC8gc2ltcGxlIGNvbnRleHQgYmluZGluZ1xudmFyIGFGdW5jdGlvbiA9IHJlcXVpcmUoJy4vX2EtZnVuY3Rpb24nKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZm4sIHRoYXQsIGxlbmd0aCl7XG4gIGFGdW5jdGlvbihmbik7XG4gIGlmKHRoYXQgPT09IHVuZGVmaW5lZClyZXR1cm4gZm47XG4gIHN3aXRjaChsZW5ndGgpe1xuICAgIGNhc2UgMTogcmV0dXJuIGZ1bmN0aW9uKGEpe1xuICAgICAgcmV0dXJuIGZuLmNhbGwodGhhdCwgYSk7XG4gICAgfTtcbiAgICBjYXNlIDI6IHJldHVybiBmdW5jdGlvbihhLCBiKXtcbiAgICAgIHJldHVybiBmbi5jYWxsKHRoYXQsIGEsIGIpO1xuICAgIH07XG4gICAgY2FzZSAzOiByZXR1cm4gZnVuY3Rpb24oYSwgYiwgYyl7XG4gICAgICByZXR1cm4gZm4uY2FsbCh0aGF0LCBhLCBiLCBjKTtcbiAgICB9O1xuICB9XG4gIHJldHVybiBmdW5jdGlvbigvKiAuLi5hcmdzICovKXtcbiAgICByZXR1cm4gZm4uYXBwbHkodGhhdCwgYXJndW1lbnRzKTtcbiAgfTtcbn07IiwiLy8gNy4yLjEgUmVxdWlyZU9iamVjdENvZXJjaWJsZShhcmd1bWVudClcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICBpZihpdCA9PSB1bmRlZmluZWQpdGhyb3cgVHlwZUVycm9yKFwiQ2FuJ3QgY2FsbCBtZXRob2Qgb24gIFwiICsgaXQpO1xuICByZXR1cm4gaXQ7XG59OyIsIi8vIFRoYW5rJ3MgSUU4IGZvciBoaXMgZnVubnkgZGVmaW5lUHJvcGVydHlcbm1vZHVsZS5leHBvcnRzID0gIXJlcXVpcmUoJy4vX2ZhaWxzJykoZnVuY3Rpb24oKXtcbiAgcmV0dXJuIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh7fSwgJ2EnLCB7Z2V0OiBmdW5jdGlvbigpeyByZXR1cm4gNzsgfX0pLmEgIT0gNztcbn0pOyIsInZhciBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpXG4gICwgZG9jdW1lbnQgPSByZXF1aXJlKCcuL19nbG9iYWwnKS5kb2N1bWVudFxuICAvLyBpbiBvbGQgSUUgdHlwZW9mIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQgaXMgJ29iamVjdCdcbiAgLCBpcyA9IGlzT2JqZWN0KGRvY3VtZW50KSAmJiBpc09iamVjdChkb2N1bWVudC5jcmVhdGVFbGVtZW50KTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gaXMgPyBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGl0KSA6IHt9O1xufTsiLCIvLyBJRSA4LSBkb24ndCBlbnVtIGJ1ZyBrZXlzXG5tb2R1bGUuZXhwb3J0cyA9IChcbiAgJ2NvbnN0cnVjdG9yLGhhc093blByb3BlcnR5LGlzUHJvdG90eXBlT2YscHJvcGVydHlJc0VudW1lcmFibGUsdG9Mb2NhbGVTdHJpbmcsdG9TdHJpbmcsdmFsdWVPZidcbikuc3BsaXQoJywnKTsiLCIvLyBhbGwgZW51bWVyYWJsZSBvYmplY3Qga2V5cywgaW5jbHVkZXMgc3ltYm9sc1xudmFyIGdldEtleXMgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cycpXG4gICwgZ09QUyAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1nb3BzJylcbiAgLCBwSUUgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LXBpZScpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHZhciByZXN1bHQgICAgID0gZ2V0S2V5cyhpdClcbiAgICAsIGdldFN5bWJvbHMgPSBnT1BTLmY7XG4gIGlmKGdldFN5bWJvbHMpe1xuICAgIHZhciBzeW1ib2xzID0gZ2V0U3ltYm9scyhpdClcbiAgICAgICwgaXNFbnVtICA9IHBJRS5mXG4gICAgICAsIGkgICAgICAgPSAwXG4gICAgICAsIGtleTtcbiAgICB3aGlsZShzeW1ib2xzLmxlbmd0aCA+IGkpaWYoaXNFbnVtLmNhbGwoaXQsIGtleSA9IHN5bWJvbHNbaSsrXSkpcmVzdWx0LnB1c2goa2V5KTtcbiAgfSByZXR1cm4gcmVzdWx0O1xufTsiLCJ2YXIgZ2xvYmFsICAgID0gcmVxdWlyZSgnLi9fZ2xvYmFsJylcbiAgLCBjb3JlICAgICAgPSByZXF1aXJlKCcuL19jb3JlJylcbiAgLCBjdHggICAgICAgPSByZXF1aXJlKCcuL19jdHgnKVxuICAsIGhpZGUgICAgICA9IHJlcXVpcmUoJy4vX2hpZGUnKVxuICAsIFBST1RPVFlQRSA9ICdwcm90b3R5cGUnO1xuXG52YXIgJGV4cG9ydCA9IGZ1bmN0aW9uKHR5cGUsIG5hbWUsIHNvdXJjZSl7XG4gIHZhciBJU19GT1JDRUQgPSB0eXBlICYgJGV4cG9ydC5GXG4gICAgLCBJU19HTE9CQUwgPSB0eXBlICYgJGV4cG9ydC5HXG4gICAgLCBJU19TVEFUSUMgPSB0eXBlICYgJGV4cG9ydC5TXG4gICAgLCBJU19QUk9UTyAgPSB0eXBlICYgJGV4cG9ydC5QXG4gICAgLCBJU19CSU5EICAgPSB0eXBlICYgJGV4cG9ydC5CXG4gICAgLCBJU19XUkFQICAgPSB0eXBlICYgJGV4cG9ydC5XXG4gICAgLCBleHBvcnRzICAgPSBJU19HTE9CQUwgPyBjb3JlIDogY29yZVtuYW1lXSB8fCAoY29yZVtuYW1lXSA9IHt9KVxuICAgICwgZXhwUHJvdG8gID0gZXhwb3J0c1tQUk9UT1RZUEVdXG4gICAgLCB0YXJnZXQgICAgPSBJU19HTE9CQUwgPyBnbG9iYWwgOiBJU19TVEFUSUMgPyBnbG9iYWxbbmFtZV0gOiAoZ2xvYmFsW25hbWVdIHx8IHt9KVtQUk9UT1RZUEVdXG4gICAgLCBrZXksIG93biwgb3V0O1xuICBpZihJU19HTE9CQUwpc291cmNlID0gbmFtZTtcbiAgZm9yKGtleSBpbiBzb3VyY2Upe1xuICAgIC8vIGNvbnRhaW5zIGluIG5hdGl2ZVxuICAgIG93biA9ICFJU19GT1JDRUQgJiYgdGFyZ2V0ICYmIHRhcmdldFtrZXldICE9PSB1bmRlZmluZWQ7XG4gICAgaWYob3duICYmIGtleSBpbiBleHBvcnRzKWNvbnRpbnVlO1xuICAgIC8vIGV4cG9ydCBuYXRpdmUgb3IgcGFzc2VkXG4gICAgb3V0ID0gb3duID8gdGFyZ2V0W2tleV0gOiBzb3VyY2Vba2V5XTtcbiAgICAvLyBwcmV2ZW50IGdsb2JhbCBwb2xsdXRpb24gZm9yIG5hbWVzcGFjZXNcbiAgICBleHBvcnRzW2tleV0gPSBJU19HTE9CQUwgJiYgdHlwZW9mIHRhcmdldFtrZXldICE9ICdmdW5jdGlvbicgPyBzb3VyY2Vba2V5XVxuICAgIC8vIGJpbmQgdGltZXJzIHRvIGdsb2JhbCBmb3IgY2FsbCBmcm9tIGV4cG9ydCBjb250ZXh0XG4gICAgOiBJU19CSU5EICYmIG93biA/IGN0eChvdXQsIGdsb2JhbClcbiAgICAvLyB3cmFwIGdsb2JhbCBjb25zdHJ1Y3RvcnMgZm9yIHByZXZlbnQgY2hhbmdlIHRoZW0gaW4gbGlicmFyeVxuICAgIDogSVNfV1JBUCAmJiB0YXJnZXRba2V5XSA9PSBvdXQgPyAoZnVuY3Rpb24oQyl7XG4gICAgICB2YXIgRiA9IGZ1bmN0aW9uKGEsIGIsIGMpe1xuICAgICAgICBpZih0aGlzIGluc3RhbmNlb2YgQyl7XG4gICAgICAgICAgc3dpdGNoKGFyZ3VtZW50cy5sZW5ndGgpe1xuICAgICAgICAgICAgY2FzZSAwOiByZXR1cm4gbmV3IEM7XG4gICAgICAgICAgICBjYXNlIDE6IHJldHVybiBuZXcgQyhhKTtcbiAgICAgICAgICAgIGNhc2UgMjogcmV0dXJuIG5ldyBDKGEsIGIpO1xuICAgICAgICAgIH0gcmV0dXJuIG5ldyBDKGEsIGIsIGMpO1xuICAgICAgICB9IHJldHVybiBDLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICB9O1xuICAgICAgRltQUk9UT1RZUEVdID0gQ1tQUk9UT1RZUEVdO1xuICAgICAgcmV0dXJuIEY7XG4gICAgLy8gbWFrZSBzdGF0aWMgdmVyc2lvbnMgZm9yIHByb3RvdHlwZSBtZXRob2RzXG4gICAgfSkob3V0KSA6IElTX1BST1RPICYmIHR5cGVvZiBvdXQgPT0gJ2Z1bmN0aW9uJyA/IGN0eChGdW5jdGlvbi5jYWxsLCBvdXQpIDogb3V0O1xuICAgIC8vIGV4cG9ydCBwcm90byBtZXRob2RzIHRvIGNvcmUuJUNPTlNUUlVDVE9SJS5tZXRob2RzLiVOQU1FJVxuICAgIGlmKElTX1BST1RPKXtcbiAgICAgIChleHBvcnRzLnZpcnR1YWwgfHwgKGV4cG9ydHMudmlydHVhbCA9IHt9KSlba2V5XSA9IG91dDtcbiAgICAgIC8vIGV4cG9ydCBwcm90byBtZXRob2RzIHRvIGNvcmUuJUNPTlNUUlVDVE9SJS5wcm90b3R5cGUuJU5BTUUlXG4gICAgICBpZih0eXBlICYgJGV4cG9ydC5SICYmIGV4cFByb3RvICYmICFleHBQcm90b1trZXldKWhpZGUoZXhwUHJvdG8sIGtleSwgb3V0KTtcbiAgICB9XG4gIH1cbn07XG4vLyB0eXBlIGJpdG1hcFxuJGV4cG9ydC5GID0gMTsgICAvLyBmb3JjZWRcbiRleHBvcnQuRyA9IDI7ICAgLy8gZ2xvYmFsXG4kZXhwb3J0LlMgPSA0OyAgIC8vIHN0YXRpY1xuJGV4cG9ydC5QID0gODsgICAvLyBwcm90b1xuJGV4cG9ydC5CID0gMTY7ICAvLyBiaW5kXG4kZXhwb3J0LlcgPSAzMjsgIC8vIHdyYXBcbiRleHBvcnQuVSA9IDY0OyAgLy8gc2FmZVxuJGV4cG9ydC5SID0gMTI4OyAvLyByZWFsIHByb3RvIG1ldGhvZCBmb3IgYGxpYnJhcnlgIFxubW9kdWxlLmV4cG9ydHMgPSAkZXhwb3J0OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZXhlYyl7XG4gIHRyeSB7XG4gICAgcmV0dXJuICEhZXhlYygpO1xuICB9IGNhdGNoKGUpe1xuICAgIHJldHVybiB0cnVlO1xuICB9XG59OyIsIi8vIGh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2lzc3Vlcy84NiNpc3N1ZWNvbW1lbnQtMTE1NzU5MDI4XG52YXIgZ2xvYmFsID0gbW9kdWxlLmV4cG9ydHMgPSB0eXBlb2Ygd2luZG93ICE9ICd1bmRlZmluZWQnICYmIHdpbmRvdy5NYXRoID09IE1hdGhcbiAgPyB3aW5kb3cgOiB0eXBlb2Ygc2VsZiAhPSAndW5kZWZpbmVkJyAmJiBzZWxmLk1hdGggPT0gTWF0aCA/IHNlbGYgOiBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuaWYodHlwZW9mIF9fZyA9PSAnbnVtYmVyJylfX2cgPSBnbG9iYWw7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW5kZWYiLCJ2YXIgaGFzT3duUHJvcGVydHkgPSB7fS5oYXNPd25Qcm9wZXJ0eTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQsIGtleSl7XG4gIHJldHVybiBoYXNPd25Qcm9wZXJ0eS5jYWxsKGl0LCBrZXkpO1xufTsiLCJ2YXIgZFAgICAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpXG4gICwgY3JlYXRlRGVzYyA9IHJlcXVpcmUoJy4vX3Byb3BlcnR5LWRlc2MnKTtcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSA/IGZ1bmN0aW9uKG9iamVjdCwga2V5LCB2YWx1ZSl7XG4gIHJldHVybiBkUC5mKG9iamVjdCwga2V5LCBjcmVhdGVEZXNjKDEsIHZhbHVlKSk7XG59IDogZnVuY3Rpb24ob2JqZWN0LCBrZXksIHZhbHVlKXtcbiAgb2JqZWN0W2tleV0gPSB2YWx1ZTtcbiAgcmV0dXJuIG9iamVjdDtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19nbG9iYWwnKS5kb2N1bWVudCAmJiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7IiwibW9kdWxlLmV4cG9ydHMgPSAhcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKSAmJiAhcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbigpe1xuICByZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KHJlcXVpcmUoJy4vX2RvbS1jcmVhdGUnKSgnZGl2JyksICdhJywge2dldDogZnVuY3Rpb24oKXsgcmV0dXJuIDc7IH19KS5hICE9IDc7XG59KTsiLCIvLyBmYWxsYmFjayBmb3Igbm9uLWFycmF5LWxpa2UgRVMzIGFuZCBub24tZW51bWVyYWJsZSBvbGQgVjggc3RyaW5nc1xudmFyIGNvZiA9IHJlcXVpcmUoJy4vX2NvZicpO1xubW9kdWxlLmV4cG9ydHMgPSBPYmplY3QoJ3onKS5wcm9wZXJ0eUlzRW51bWVyYWJsZSgwKSA/IE9iamVjdCA6IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIGNvZihpdCkgPT0gJ1N0cmluZycgPyBpdC5zcGxpdCgnJykgOiBPYmplY3QoaXQpO1xufTsiLCIvLyBjaGVjayBvbiBkZWZhdWx0IEFycmF5IGl0ZXJhdG9yXG52YXIgSXRlcmF0b3JzICA9IHJlcXVpcmUoJy4vX2l0ZXJhdG9ycycpXG4gICwgSVRFUkFUT1IgICA9IHJlcXVpcmUoJy4vX3drcycpKCdpdGVyYXRvcicpXG4gICwgQXJyYXlQcm90byA9IEFycmF5LnByb3RvdHlwZTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBpdCAhPT0gdW5kZWZpbmVkICYmIChJdGVyYXRvcnMuQXJyYXkgPT09IGl0IHx8IEFycmF5UHJvdG9bSVRFUkFUT1JdID09PSBpdCk7XG59OyIsIi8vIDcuMi4yIElzQXJyYXkoYXJndW1lbnQpXG52YXIgY29mID0gcmVxdWlyZSgnLi9fY29mJyk7XG5tb2R1bGUuZXhwb3J0cyA9IEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24gaXNBcnJheShhcmcpe1xuICByZXR1cm4gY29mKGFyZykgPT0gJ0FycmF5Jztcbn07IiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCl7XG4gIHJldHVybiB0eXBlb2YgaXQgPT09ICdvYmplY3QnID8gaXQgIT09IG51bGwgOiB0eXBlb2YgaXQgPT09ICdmdW5jdGlvbic7XG59OyIsIi8vIGNhbGwgc29tZXRoaW5nIG9uIGl0ZXJhdG9yIHN0ZXAgd2l0aCBzYWZlIGNsb3Npbmcgb24gZXJyb3JcbnZhciBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdGVyYXRvciwgZm4sIHZhbHVlLCBlbnRyaWVzKXtcbiAgdHJ5IHtcbiAgICByZXR1cm4gZW50cmllcyA/IGZuKGFuT2JqZWN0KHZhbHVlKVswXSwgdmFsdWVbMV0pIDogZm4odmFsdWUpO1xuICAvLyA3LjQuNiBJdGVyYXRvckNsb3NlKGl0ZXJhdG9yLCBjb21wbGV0aW9uKVxuICB9IGNhdGNoKGUpe1xuICAgIHZhciByZXQgPSBpdGVyYXRvclsncmV0dXJuJ107XG4gICAgaWYocmV0ICE9PSB1bmRlZmluZWQpYW5PYmplY3QocmV0LmNhbGwoaXRlcmF0b3IpKTtcbiAgICB0aHJvdyBlO1xuICB9XG59OyIsIid1c2Ugc3RyaWN0JztcbnZhciBjcmVhdGUgICAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1jcmVhdGUnKVxuICAsIGRlc2NyaXB0b3IgICAgID0gcmVxdWlyZSgnLi9fcHJvcGVydHktZGVzYycpXG4gICwgc2V0VG9TdHJpbmdUYWcgPSByZXF1aXJlKCcuL19zZXQtdG8tc3RyaW5nLXRhZycpXG4gICwgSXRlcmF0b3JQcm90b3R5cGUgPSB7fTtcblxuLy8gMjUuMS4yLjEuMSAlSXRlcmF0b3JQcm90b3R5cGUlW0BAaXRlcmF0b3JdKClcbnJlcXVpcmUoJy4vX2hpZGUnKShJdGVyYXRvclByb3RvdHlwZSwgcmVxdWlyZSgnLi9fd2tzJykoJ2l0ZXJhdG9yJyksIGZ1bmN0aW9uKCl7IHJldHVybiB0aGlzOyB9KTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihDb25zdHJ1Y3RvciwgTkFNRSwgbmV4dCl7XG4gIENvbnN0cnVjdG9yLnByb3RvdHlwZSA9IGNyZWF0ZShJdGVyYXRvclByb3RvdHlwZSwge25leHQ6IGRlc2NyaXB0b3IoMSwgbmV4dCl9KTtcbiAgc2V0VG9TdHJpbmdUYWcoQ29uc3RydWN0b3IsIE5BTUUgKyAnIEl0ZXJhdG9yJyk7XG59OyIsIid1c2Ugc3RyaWN0JztcbnZhciBMSUJSQVJZICAgICAgICA9IHJlcXVpcmUoJy4vX2xpYnJhcnknKVxuICAsICRleHBvcnQgICAgICAgID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgLCByZWRlZmluZSAgICAgICA9IHJlcXVpcmUoJy4vX3JlZGVmaW5lJylcbiAgLCBoaWRlICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2hpZGUnKVxuICAsIGhhcyAgICAgICAgICAgID0gcmVxdWlyZSgnLi9faGFzJylcbiAgLCBJdGVyYXRvcnMgICAgICA9IHJlcXVpcmUoJy4vX2l0ZXJhdG9ycycpXG4gICwgJGl0ZXJDcmVhdGUgICAgPSByZXF1aXJlKCcuL19pdGVyLWNyZWF0ZScpXG4gICwgc2V0VG9TdHJpbmdUYWcgPSByZXF1aXJlKCcuL19zZXQtdG8tc3RyaW5nLXRhZycpXG4gICwgZ2V0UHJvdG90eXBlT2YgPSByZXF1aXJlKCcuL19vYmplY3QtZ3BvJylcbiAgLCBJVEVSQVRPUiAgICAgICA9IHJlcXVpcmUoJy4vX3drcycpKCdpdGVyYXRvcicpXG4gICwgQlVHR1kgICAgICAgICAgPSAhKFtdLmtleXMgJiYgJ25leHQnIGluIFtdLmtleXMoKSkgLy8gU2FmYXJpIGhhcyBidWdneSBpdGVyYXRvcnMgdy9vIGBuZXh0YFxuICAsIEZGX0lURVJBVE9SICAgID0gJ0BAaXRlcmF0b3InXG4gICwgS0VZUyAgICAgICAgICAgPSAna2V5cydcbiAgLCBWQUxVRVMgICAgICAgICA9ICd2YWx1ZXMnO1xuXG52YXIgcmV0dXJuVGhpcyA9IGZ1bmN0aW9uKCl7IHJldHVybiB0aGlzOyB9O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKEJhc2UsIE5BTUUsIENvbnN0cnVjdG9yLCBuZXh0LCBERUZBVUxULCBJU19TRVQsIEZPUkNFRCl7XG4gICRpdGVyQ3JlYXRlKENvbnN0cnVjdG9yLCBOQU1FLCBuZXh0KTtcbiAgdmFyIGdldE1ldGhvZCA9IGZ1bmN0aW9uKGtpbmQpe1xuICAgIGlmKCFCVUdHWSAmJiBraW5kIGluIHByb3RvKXJldHVybiBwcm90b1traW5kXTtcbiAgICBzd2l0Y2goa2luZCl7XG4gICAgICBjYXNlIEtFWVM6IHJldHVybiBmdW5jdGlvbiBrZXlzKCl7IHJldHVybiBuZXcgQ29uc3RydWN0b3IodGhpcywga2luZCk7IH07XG4gICAgICBjYXNlIFZBTFVFUzogcmV0dXJuIGZ1bmN0aW9uIHZhbHVlcygpeyByZXR1cm4gbmV3IENvbnN0cnVjdG9yKHRoaXMsIGtpbmQpOyB9O1xuICAgIH0gcmV0dXJuIGZ1bmN0aW9uIGVudHJpZXMoKXsgcmV0dXJuIG5ldyBDb25zdHJ1Y3Rvcih0aGlzLCBraW5kKTsgfTtcbiAgfTtcbiAgdmFyIFRBRyAgICAgICAgPSBOQU1FICsgJyBJdGVyYXRvcidcbiAgICAsIERFRl9WQUxVRVMgPSBERUZBVUxUID09IFZBTFVFU1xuICAgICwgVkFMVUVTX0JVRyA9IGZhbHNlXG4gICAgLCBwcm90byAgICAgID0gQmFzZS5wcm90b3R5cGVcbiAgICAsICRuYXRpdmUgICAgPSBwcm90b1tJVEVSQVRPUl0gfHwgcHJvdG9bRkZfSVRFUkFUT1JdIHx8IERFRkFVTFQgJiYgcHJvdG9bREVGQVVMVF1cbiAgICAsICRkZWZhdWx0ICAgPSAkbmF0aXZlIHx8IGdldE1ldGhvZChERUZBVUxUKVxuICAgICwgJGVudHJpZXMgICA9IERFRkFVTFQgPyAhREVGX1ZBTFVFUyA/ICRkZWZhdWx0IDogZ2V0TWV0aG9kKCdlbnRyaWVzJykgOiB1bmRlZmluZWRcbiAgICAsICRhbnlOYXRpdmUgPSBOQU1FID09ICdBcnJheScgPyBwcm90by5lbnRyaWVzIHx8ICRuYXRpdmUgOiAkbmF0aXZlXG4gICAgLCBtZXRob2RzLCBrZXksIEl0ZXJhdG9yUHJvdG90eXBlO1xuICAvLyBGaXggbmF0aXZlXG4gIGlmKCRhbnlOYXRpdmUpe1xuICAgIEl0ZXJhdG9yUHJvdG90eXBlID0gZ2V0UHJvdG90eXBlT2YoJGFueU5hdGl2ZS5jYWxsKG5ldyBCYXNlKSk7XG4gICAgaWYoSXRlcmF0b3JQcm90b3R5cGUgIT09IE9iamVjdC5wcm90b3R5cGUpe1xuICAgICAgLy8gU2V0IEBAdG9TdHJpbmdUYWcgdG8gbmF0aXZlIGl0ZXJhdG9yc1xuICAgICAgc2V0VG9TdHJpbmdUYWcoSXRlcmF0b3JQcm90b3R5cGUsIFRBRywgdHJ1ZSk7XG4gICAgICAvLyBmaXggZm9yIHNvbWUgb2xkIGVuZ2luZXNcbiAgICAgIGlmKCFMSUJSQVJZICYmICFoYXMoSXRlcmF0b3JQcm90b3R5cGUsIElURVJBVE9SKSloaWRlKEl0ZXJhdG9yUHJvdG90eXBlLCBJVEVSQVRPUiwgcmV0dXJuVGhpcyk7XG4gICAgfVxuICB9XG4gIC8vIGZpeCBBcnJheSN7dmFsdWVzLCBAQGl0ZXJhdG9yfS5uYW1lIGluIFY4IC8gRkZcbiAgaWYoREVGX1ZBTFVFUyAmJiAkbmF0aXZlICYmICRuYXRpdmUubmFtZSAhPT0gVkFMVUVTKXtcbiAgICBWQUxVRVNfQlVHID0gdHJ1ZTtcbiAgICAkZGVmYXVsdCA9IGZ1bmN0aW9uIHZhbHVlcygpeyByZXR1cm4gJG5hdGl2ZS5jYWxsKHRoaXMpOyB9O1xuICB9XG4gIC8vIERlZmluZSBpdGVyYXRvclxuICBpZigoIUxJQlJBUlkgfHwgRk9SQ0VEKSAmJiAoQlVHR1kgfHwgVkFMVUVTX0JVRyB8fCAhcHJvdG9bSVRFUkFUT1JdKSl7XG4gICAgaGlkZShwcm90bywgSVRFUkFUT1IsICRkZWZhdWx0KTtcbiAgfVxuICAvLyBQbHVnIGZvciBsaWJyYXJ5XG4gIEl0ZXJhdG9yc1tOQU1FXSA9ICRkZWZhdWx0O1xuICBJdGVyYXRvcnNbVEFHXSAgPSByZXR1cm5UaGlzO1xuICBpZihERUZBVUxUKXtcbiAgICBtZXRob2RzID0ge1xuICAgICAgdmFsdWVzOiAgREVGX1ZBTFVFUyA/ICRkZWZhdWx0IDogZ2V0TWV0aG9kKFZBTFVFUyksXG4gICAgICBrZXlzOiAgICBJU19TRVQgICAgID8gJGRlZmF1bHQgOiBnZXRNZXRob2QoS0VZUyksXG4gICAgICBlbnRyaWVzOiAkZW50cmllc1xuICAgIH07XG4gICAgaWYoRk9SQ0VEKWZvcihrZXkgaW4gbWV0aG9kcyl7XG4gICAgICBpZighKGtleSBpbiBwcm90bykpcmVkZWZpbmUocHJvdG8sIGtleSwgbWV0aG9kc1trZXldKTtcbiAgICB9IGVsc2UgJGV4cG9ydCgkZXhwb3J0LlAgKyAkZXhwb3J0LkYgKiAoQlVHR1kgfHwgVkFMVUVTX0JVRyksIE5BTUUsIG1ldGhvZHMpO1xuICB9XG4gIHJldHVybiBtZXRob2RzO1xufTsiLCJ2YXIgSVRFUkFUT1IgICAgID0gcmVxdWlyZSgnLi9fd2tzJykoJ2l0ZXJhdG9yJylcbiAgLCBTQUZFX0NMT1NJTkcgPSBmYWxzZTtcblxudHJ5IHtcbiAgdmFyIHJpdGVyID0gWzddW0lURVJBVE9SXSgpO1xuICByaXRlclsncmV0dXJuJ10gPSBmdW5jdGlvbigpeyBTQUZFX0NMT1NJTkcgPSB0cnVlOyB9O1xuICBBcnJheS5mcm9tKHJpdGVyLCBmdW5jdGlvbigpeyB0aHJvdyAyOyB9KTtcbn0gY2F0Y2goZSl7IC8qIGVtcHR5ICovIH1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihleGVjLCBza2lwQ2xvc2luZyl7XG4gIGlmKCFza2lwQ2xvc2luZyAmJiAhU0FGRV9DTE9TSU5HKXJldHVybiBmYWxzZTtcbiAgdmFyIHNhZmUgPSBmYWxzZTtcbiAgdHJ5IHtcbiAgICB2YXIgYXJyICA9IFs3XVxuICAgICAgLCBpdGVyID0gYXJyW0lURVJBVE9SXSgpO1xuICAgIGl0ZXIubmV4dCA9IGZ1bmN0aW9uKCl7IHJldHVybiB7ZG9uZTogc2FmZSA9IHRydWV9OyB9O1xuICAgIGFycltJVEVSQVRPUl0gPSBmdW5jdGlvbigpeyByZXR1cm4gaXRlcjsgfTtcbiAgICBleGVjKGFycik7XG4gIH0gY2F0Y2goZSl7IC8qIGVtcHR5ICovIH1cbiAgcmV0dXJuIHNhZmU7XG59OyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZG9uZSwgdmFsdWUpe1xuICByZXR1cm4ge3ZhbHVlOiB2YWx1ZSwgZG9uZTogISFkb25lfTtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSB7fTsiLCJ2YXIgZ2V0S2V5cyAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMnKVxuICAsIHRvSU9iamVjdCA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ob2JqZWN0LCBlbCl7XG4gIHZhciBPICAgICAgPSB0b0lPYmplY3Qob2JqZWN0KVxuICAgICwga2V5cyAgID0gZ2V0S2V5cyhPKVxuICAgICwgbGVuZ3RoID0ga2V5cy5sZW5ndGhcbiAgICAsIGluZGV4ICA9IDBcbiAgICAsIGtleTtcbiAgd2hpbGUobGVuZ3RoID4gaW5kZXgpaWYoT1trZXkgPSBrZXlzW2luZGV4KytdXSA9PT0gZWwpcmV0dXJuIGtleTtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSB0cnVlOyIsInZhciBNRVRBICAgICA9IHJlcXVpcmUoJy4vX3VpZCcpKCdtZXRhJylcbiAgLCBpc09iamVjdCA9IHJlcXVpcmUoJy4vX2lzLW9iamVjdCcpXG4gICwgaGFzICAgICAgPSByZXF1aXJlKCcuL19oYXMnKVxuICAsIHNldERlc2MgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJykuZlxuICAsIGlkICAgICAgID0gMDtcbnZhciBpc0V4dGVuc2libGUgPSBPYmplY3QuaXNFeHRlbnNpYmxlIHx8IGZ1bmN0aW9uKCl7XG4gIHJldHVybiB0cnVlO1xufTtcbnZhciBGUkVFWkUgPSAhcmVxdWlyZSgnLi9fZmFpbHMnKShmdW5jdGlvbigpe1xuICByZXR1cm4gaXNFeHRlbnNpYmxlKE9iamVjdC5wcmV2ZW50RXh0ZW5zaW9ucyh7fSkpO1xufSk7XG52YXIgc2V0TWV0YSA9IGZ1bmN0aW9uKGl0KXtcbiAgc2V0RGVzYyhpdCwgTUVUQSwge3ZhbHVlOiB7XG4gICAgaTogJ08nICsgKytpZCwgLy8gb2JqZWN0IElEXG4gICAgdzoge30gICAgICAgICAgLy8gd2VhayBjb2xsZWN0aW9ucyBJRHNcbiAgfX0pO1xufTtcbnZhciBmYXN0S2V5ID0gZnVuY3Rpb24oaXQsIGNyZWF0ZSl7XG4gIC8vIHJldHVybiBwcmltaXRpdmUgd2l0aCBwcmVmaXhcbiAgaWYoIWlzT2JqZWN0KGl0KSlyZXR1cm4gdHlwZW9mIGl0ID09ICdzeW1ib2wnID8gaXQgOiAodHlwZW9mIGl0ID09ICdzdHJpbmcnID8gJ1MnIDogJ1AnKSArIGl0O1xuICBpZighaGFzKGl0LCBNRVRBKSl7XG4gICAgLy8gY2FuJ3Qgc2V0IG1ldGFkYXRhIHRvIHVuY2F1Z2h0IGZyb3plbiBvYmplY3RcbiAgICBpZighaXNFeHRlbnNpYmxlKGl0KSlyZXR1cm4gJ0YnO1xuICAgIC8vIG5vdCBuZWNlc3NhcnkgdG8gYWRkIG1ldGFkYXRhXG4gICAgaWYoIWNyZWF0ZSlyZXR1cm4gJ0UnO1xuICAgIC8vIGFkZCBtaXNzaW5nIG1ldGFkYXRhXG4gICAgc2V0TWV0YShpdCk7XG4gIC8vIHJldHVybiBvYmplY3QgSURcbiAgfSByZXR1cm4gaXRbTUVUQV0uaTtcbn07XG52YXIgZ2V0V2VhayA9IGZ1bmN0aW9uKGl0LCBjcmVhdGUpe1xuICBpZighaGFzKGl0LCBNRVRBKSl7XG4gICAgLy8gY2FuJ3Qgc2V0IG1ldGFkYXRhIHRvIHVuY2F1Z2h0IGZyb3plbiBvYmplY3RcbiAgICBpZighaXNFeHRlbnNpYmxlKGl0KSlyZXR1cm4gdHJ1ZTtcbiAgICAvLyBub3QgbmVjZXNzYXJ5IHRvIGFkZCBtZXRhZGF0YVxuICAgIGlmKCFjcmVhdGUpcmV0dXJuIGZhbHNlO1xuICAgIC8vIGFkZCBtaXNzaW5nIG1ldGFkYXRhXG4gICAgc2V0TWV0YShpdCk7XG4gIC8vIHJldHVybiBoYXNoIHdlYWsgY29sbGVjdGlvbnMgSURzXG4gIH0gcmV0dXJuIGl0W01FVEFdLnc7XG59O1xuLy8gYWRkIG1ldGFkYXRhIG9uIGZyZWV6ZS1mYW1pbHkgbWV0aG9kcyBjYWxsaW5nXG52YXIgb25GcmVlemUgPSBmdW5jdGlvbihpdCl7XG4gIGlmKEZSRUVaRSAmJiBtZXRhLk5FRUQgJiYgaXNFeHRlbnNpYmxlKGl0KSAmJiAhaGFzKGl0LCBNRVRBKSlzZXRNZXRhKGl0KTtcbiAgcmV0dXJuIGl0O1xufTtcbnZhciBtZXRhID0gbW9kdWxlLmV4cG9ydHMgPSB7XG4gIEtFWTogICAgICBNRVRBLFxuICBORUVEOiAgICAgZmFsc2UsXG4gIGZhc3RLZXk6ICBmYXN0S2V5LFxuICBnZXRXZWFrOiAgZ2V0V2VhayxcbiAgb25GcmVlemU6IG9uRnJlZXplXG59OyIsIi8vIDE5LjEuMi4yIC8gMTUuMi4zLjUgT2JqZWN0LmNyZWF0ZShPIFssIFByb3BlcnRpZXNdKVxudmFyIGFuT2JqZWN0ICAgID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0JylcbiAgLCBkUHMgICAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1kcHMnKVxuICAsIGVudW1CdWdLZXlzID0gcmVxdWlyZSgnLi9fZW51bS1idWcta2V5cycpXG4gICwgSUVfUFJPVE8gICAgPSByZXF1aXJlKCcuL19zaGFyZWQta2V5JykoJ0lFX1BST1RPJylcbiAgLCBFbXB0eSAgICAgICA9IGZ1bmN0aW9uKCl7IC8qIGVtcHR5ICovIH1cbiAgLCBQUk9UT1RZUEUgICA9ICdwcm90b3R5cGUnO1xuXG4vLyBDcmVhdGUgb2JqZWN0IHdpdGggZmFrZSBgbnVsbGAgcHJvdG90eXBlOiB1c2UgaWZyYW1lIE9iamVjdCB3aXRoIGNsZWFyZWQgcHJvdG90eXBlXG52YXIgY3JlYXRlRGljdCA9IGZ1bmN0aW9uKCl7XG4gIC8vIFRocmFzaCwgd2FzdGUgYW5kIHNvZG9teTogSUUgR0MgYnVnXG4gIHZhciBpZnJhbWUgPSByZXF1aXJlKCcuL19kb20tY3JlYXRlJykoJ2lmcmFtZScpXG4gICAgLCBpICAgICAgPSBlbnVtQnVnS2V5cy5sZW5ndGhcbiAgICAsIGx0ICAgICA9ICc8J1xuICAgICwgZ3QgICAgID0gJz4nXG4gICAgLCBpZnJhbWVEb2N1bWVudDtcbiAgaWZyYW1lLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gIHJlcXVpcmUoJy4vX2h0bWwnKS5hcHBlbmRDaGlsZChpZnJhbWUpO1xuICBpZnJhbWUuc3JjID0gJ2phdmFzY3JpcHQ6JzsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1zY3JpcHQtdXJsXG4gIC8vIGNyZWF0ZURpY3QgPSBpZnJhbWUuY29udGVudFdpbmRvdy5PYmplY3Q7XG4gIC8vIGh0bWwucmVtb3ZlQ2hpbGQoaWZyYW1lKTtcbiAgaWZyYW1lRG9jdW1lbnQgPSBpZnJhbWUuY29udGVudFdpbmRvdy5kb2N1bWVudDtcbiAgaWZyYW1lRG9jdW1lbnQub3BlbigpO1xuICBpZnJhbWVEb2N1bWVudC53cml0ZShsdCArICdzY3JpcHQnICsgZ3QgKyAnZG9jdW1lbnQuRj1PYmplY3QnICsgbHQgKyAnL3NjcmlwdCcgKyBndCk7XG4gIGlmcmFtZURvY3VtZW50LmNsb3NlKCk7XG4gIGNyZWF0ZURpY3QgPSBpZnJhbWVEb2N1bWVudC5GO1xuICB3aGlsZShpLS0pZGVsZXRlIGNyZWF0ZURpY3RbUFJPVE9UWVBFXVtlbnVtQnVnS2V5c1tpXV07XG4gIHJldHVybiBjcmVhdGVEaWN0KCk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IE9iamVjdC5jcmVhdGUgfHwgZnVuY3Rpb24gY3JlYXRlKE8sIFByb3BlcnRpZXMpe1xuICB2YXIgcmVzdWx0O1xuICBpZihPICE9PSBudWxsKXtcbiAgICBFbXB0eVtQUk9UT1RZUEVdID0gYW5PYmplY3QoTyk7XG4gICAgcmVzdWx0ID0gbmV3IEVtcHR5O1xuICAgIEVtcHR5W1BST1RPVFlQRV0gPSBudWxsO1xuICAgIC8vIGFkZCBcIl9fcHJvdG9fX1wiIGZvciBPYmplY3QuZ2V0UHJvdG90eXBlT2YgcG9seWZpbGxcbiAgICByZXN1bHRbSUVfUFJPVE9dID0gTztcbiAgfSBlbHNlIHJlc3VsdCA9IGNyZWF0ZURpY3QoKTtcbiAgcmV0dXJuIFByb3BlcnRpZXMgPT09IHVuZGVmaW5lZCA/IHJlc3VsdCA6IGRQcyhyZXN1bHQsIFByb3BlcnRpZXMpO1xufTtcbiIsInZhciBhbk9iamVjdCAgICAgICA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpXG4gICwgSUU4X0RPTV9ERUZJTkUgPSByZXF1aXJlKCcuL19pZTgtZG9tLWRlZmluZScpXG4gICwgdG9QcmltaXRpdmUgICAgPSByZXF1aXJlKCcuL190by1wcmltaXRpdmUnKVxuICAsIGRQICAgICAgICAgICAgID0gT2JqZWN0LmRlZmluZVByb3BlcnR5O1xuXG5leHBvcnRzLmYgPSByZXF1aXJlKCcuL19kZXNjcmlwdG9ycycpID8gT2JqZWN0LmRlZmluZVByb3BlcnR5IDogZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkoTywgUCwgQXR0cmlidXRlcyl7XG4gIGFuT2JqZWN0KE8pO1xuICBQID0gdG9QcmltaXRpdmUoUCwgdHJ1ZSk7XG4gIGFuT2JqZWN0KEF0dHJpYnV0ZXMpO1xuICBpZihJRThfRE9NX0RFRklORSl0cnkge1xuICAgIHJldHVybiBkUChPLCBQLCBBdHRyaWJ1dGVzKTtcbiAgfSBjYXRjaChlKXsgLyogZW1wdHkgKi8gfVxuICBpZignZ2V0JyBpbiBBdHRyaWJ1dGVzIHx8ICdzZXQnIGluIEF0dHJpYnV0ZXMpdGhyb3cgVHlwZUVycm9yKCdBY2Nlc3NvcnMgbm90IHN1cHBvcnRlZCEnKTtcbiAgaWYoJ3ZhbHVlJyBpbiBBdHRyaWJ1dGVzKU9bUF0gPSBBdHRyaWJ1dGVzLnZhbHVlO1xuICByZXR1cm4gTztcbn07IiwidmFyIGRQICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJylcbiAgLCBhbk9iamVjdCA9IHJlcXVpcmUoJy4vX2FuLW9iamVjdCcpXG4gICwgZ2V0S2V5cyAgPSByZXF1aXJlKCcuL19vYmplY3Qta2V5cycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgPyBPYmplY3QuZGVmaW5lUHJvcGVydGllcyA6IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXMoTywgUHJvcGVydGllcyl7XG4gIGFuT2JqZWN0KE8pO1xuICB2YXIga2V5cyAgID0gZ2V0S2V5cyhQcm9wZXJ0aWVzKVxuICAgICwgbGVuZ3RoID0ga2V5cy5sZW5ndGhcbiAgICAsIGkgPSAwXG4gICAgLCBQO1xuICB3aGlsZShsZW5ndGggPiBpKWRQLmYoTywgUCA9IGtleXNbaSsrXSwgUHJvcGVydGllc1tQXSk7XG4gIHJldHVybiBPO1xufTsiLCJ2YXIgcElFICAgICAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtcGllJylcbiAgLCBjcmVhdGVEZXNjICAgICA9IHJlcXVpcmUoJy4vX3Byb3BlcnR5LWRlc2MnKVxuICAsIHRvSU9iamVjdCAgICAgID0gcmVxdWlyZSgnLi9fdG8taW9iamVjdCcpXG4gICwgdG9QcmltaXRpdmUgICAgPSByZXF1aXJlKCcuL190by1wcmltaXRpdmUnKVxuICAsIGhhcyAgICAgICAgICAgID0gcmVxdWlyZSgnLi9faGFzJylcbiAgLCBJRThfRE9NX0RFRklORSA9IHJlcXVpcmUoJy4vX2llOC1kb20tZGVmaW5lJylcbiAgLCBnT1BEICAgICAgICAgICA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7XG5cbmV4cG9ydHMuZiA9IHJlcXVpcmUoJy4vX2Rlc2NyaXB0b3JzJykgPyBnT1BEIDogZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKE8sIFApe1xuICBPID0gdG9JT2JqZWN0KE8pO1xuICBQID0gdG9QcmltaXRpdmUoUCwgdHJ1ZSk7XG4gIGlmKElFOF9ET01fREVGSU5FKXRyeSB7XG4gICAgcmV0dXJuIGdPUEQoTywgUCk7XG4gIH0gY2F0Y2goZSl7IC8qIGVtcHR5ICovIH1cbiAgaWYoaGFzKE8sIFApKXJldHVybiBjcmVhdGVEZXNjKCFwSUUuZi5jYWxsKE8sIFApLCBPW1BdKTtcbn07IiwiLy8gZmFsbGJhY2sgZm9yIElFMTEgYnVnZ3kgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMgd2l0aCBpZnJhbWUgYW5kIHdpbmRvd1xudmFyIHRvSU9iamVjdCA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKVxuICAsIGdPUE4gICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1nb3BuJykuZlxuICAsIHRvU3RyaW5nICA9IHt9LnRvU3RyaW5nO1xuXG52YXIgd2luZG93TmFtZXMgPSB0eXBlb2Ygd2luZG93ID09ICdvYmplY3QnICYmIHdpbmRvdyAmJiBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lc1xuICA/IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHdpbmRvdykgOiBbXTtcblxudmFyIGdldFdpbmRvd05hbWVzID0gZnVuY3Rpb24oaXQpe1xuICB0cnkge1xuICAgIHJldHVybiBnT1BOKGl0KTtcbiAgfSBjYXRjaChlKXtcbiAgICByZXR1cm4gd2luZG93TmFtZXMuc2xpY2UoKTtcbiAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMuZiA9IGZ1bmN0aW9uIGdldE93blByb3BlcnR5TmFtZXMoaXQpe1xuICByZXR1cm4gd2luZG93TmFtZXMgJiYgdG9TdHJpbmcuY2FsbChpdCkgPT0gJ1tvYmplY3QgV2luZG93XScgPyBnZXRXaW5kb3dOYW1lcyhpdCkgOiBnT1BOKHRvSU9iamVjdChpdCkpO1xufTtcbiIsIi8vIDE5LjEuMi43IC8gMTUuMi4zLjQgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoTylcbnZhciAka2V5cyAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWtleXMtaW50ZXJuYWwnKVxuICAsIGhpZGRlbktleXMgPSByZXF1aXJlKCcuL19lbnVtLWJ1Zy1rZXlzJykuY29uY2F0KCdsZW5ndGgnLCAncHJvdG90eXBlJyk7XG5cbmV4cG9ydHMuZiA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzIHx8IGZ1bmN0aW9uIGdldE93blByb3BlcnR5TmFtZXMoTyl7XG4gIHJldHVybiAka2V5cyhPLCBoaWRkZW5LZXlzKTtcbn07IiwiZXhwb3J0cy5mID0gT2JqZWN0LmdldE93blByb3BlcnR5U3ltYm9sczsiLCIvLyAxOS4xLjIuOSAvIDE1LjIuMy4yIE9iamVjdC5nZXRQcm90b3R5cGVPZihPKVxudmFyIGhhcyAgICAgICAgID0gcmVxdWlyZSgnLi9faGFzJylcbiAgLCB0b09iamVjdCAgICA9IHJlcXVpcmUoJy4vX3RvLW9iamVjdCcpXG4gICwgSUVfUFJPVE8gICAgPSByZXF1aXJlKCcuL19zaGFyZWQta2V5JykoJ0lFX1BST1RPJylcbiAgLCBPYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbm1vZHVsZS5leHBvcnRzID0gT2JqZWN0LmdldFByb3RvdHlwZU9mIHx8IGZ1bmN0aW9uKE8pe1xuICBPID0gdG9PYmplY3QoTyk7XG4gIGlmKGhhcyhPLCBJRV9QUk9UTykpcmV0dXJuIE9bSUVfUFJPVE9dO1xuICBpZih0eXBlb2YgTy5jb25zdHJ1Y3RvciA9PSAnZnVuY3Rpb24nICYmIE8gaW5zdGFuY2VvZiBPLmNvbnN0cnVjdG9yKXtcbiAgICByZXR1cm4gTy5jb25zdHJ1Y3Rvci5wcm90b3R5cGU7XG4gIH0gcmV0dXJuIE8gaW5zdGFuY2VvZiBPYmplY3QgPyBPYmplY3RQcm90byA6IG51bGw7XG59OyIsInZhciBoYXMgICAgICAgICAgPSByZXF1aXJlKCcuL19oYXMnKVxuICAsIHRvSU9iamVjdCAgICA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKVxuICAsIGFycmF5SW5kZXhPZiA9IHJlcXVpcmUoJy4vX2FycmF5LWluY2x1ZGVzJykoZmFsc2UpXG4gICwgSUVfUFJPVE8gICAgID0gcmVxdWlyZSgnLi9fc2hhcmVkLWtleScpKCdJRV9QUk9UTycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG9iamVjdCwgbmFtZXMpe1xuICB2YXIgTyAgICAgID0gdG9JT2JqZWN0KG9iamVjdClcbiAgICAsIGkgICAgICA9IDBcbiAgICAsIHJlc3VsdCA9IFtdXG4gICAgLCBrZXk7XG4gIGZvcihrZXkgaW4gTylpZihrZXkgIT0gSUVfUFJPVE8paGFzKE8sIGtleSkgJiYgcmVzdWx0LnB1c2goa2V5KTtcbiAgLy8gRG9uJ3QgZW51bSBidWcgJiBoaWRkZW4ga2V5c1xuICB3aGlsZShuYW1lcy5sZW5ndGggPiBpKWlmKGhhcyhPLCBrZXkgPSBuYW1lc1tpKytdKSl7XG4gICAgfmFycmF5SW5kZXhPZihyZXN1bHQsIGtleSkgfHwgcmVzdWx0LnB1c2goa2V5KTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufTsiLCIvLyAxOS4xLjIuMTQgLyAxNS4yLjMuMTQgT2JqZWN0LmtleXMoTylcbnZhciAka2V5cyAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzLWludGVybmFsJylcbiAgLCBlbnVtQnVnS2V5cyA9IHJlcXVpcmUoJy4vX2VudW0tYnVnLWtleXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBPYmplY3Qua2V5cyB8fCBmdW5jdGlvbiBrZXlzKE8pe1xuICByZXR1cm4gJGtleXMoTywgZW51bUJ1Z0tleXMpO1xufTsiLCJleHBvcnRzLmYgPSB7fS5wcm9wZXJ0eUlzRW51bWVyYWJsZTsiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGJpdG1hcCwgdmFsdWUpe1xuICByZXR1cm4ge1xuICAgIGVudW1lcmFibGUgIDogIShiaXRtYXAgJiAxKSxcbiAgICBjb25maWd1cmFibGU6ICEoYml0bWFwICYgMiksXG4gICAgd3JpdGFibGUgICAgOiAhKGJpdG1hcCAmIDQpLFxuICAgIHZhbHVlICAgICAgIDogdmFsdWVcbiAgfTtcbn07IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL19oaWRlJyk7IiwidmFyIGRlZiA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpLmZcbiAgLCBoYXMgPSByZXF1aXJlKCcuL19oYXMnKVxuICAsIFRBRyA9IHJlcXVpcmUoJy4vX3drcycpKCd0b1N0cmluZ1RhZycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0LCB0YWcsIHN0YXQpe1xuICBpZihpdCAmJiAhaGFzKGl0ID0gc3RhdCA/IGl0IDogaXQucHJvdG90eXBlLCBUQUcpKWRlZihpdCwgVEFHLCB7Y29uZmlndXJhYmxlOiB0cnVlLCB2YWx1ZTogdGFnfSk7XG59OyIsInZhciBzaGFyZWQgPSByZXF1aXJlKCcuL19zaGFyZWQnKSgna2V5cycpXG4gICwgdWlkICAgID0gcmVxdWlyZSgnLi9fdWlkJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGtleSl7XG4gIHJldHVybiBzaGFyZWRba2V5XSB8fCAoc2hhcmVkW2tleV0gPSB1aWQoa2V5KSk7XG59OyIsInZhciBnbG9iYWwgPSByZXF1aXJlKCcuL19nbG9iYWwnKVxuICAsIFNIQVJFRCA9ICdfX2NvcmUtanNfc2hhcmVkX18nXG4gICwgc3RvcmUgID0gZ2xvYmFsW1NIQVJFRF0gfHwgKGdsb2JhbFtTSEFSRURdID0ge30pO1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihrZXkpe1xuICByZXR1cm4gc3RvcmVba2V5XSB8fCAoc3RvcmVba2V5XSA9IHt9KTtcbn07IiwidmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4vX3RvLWludGVnZXInKVxuICAsIGRlZmluZWQgICA9IHJlcXVpcmUoJy4vX2RlZmluZWQnKTtcbi8vIHRydWUgIC0+IFN0cmluZyNhdFxuLy8gZmFsc2UgLT4gU3RyaW5nI2NvZGVQb2ludEF0XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKFRPX1NUUklORyl7XG4gIHJldHVybiBmdW5jdGlvbih0aGF0LCBwb3Mpe1xuICAgIHZhciBzID0gU3RyaW5nKGRlZmluZWQodGhhdCkpXG4gICAgICAsIGkgPSB0b0ludGVnZXIocG9zKVxuICAgICAgLCBsID0gcy5sZW5ndGhcbiAgICAgICwgYSwgYjtcbiAgICBpZihpIDwgMCB8fCBpID49IGwpcmV0dXJuIFRPX1NUUklORyA/ICcnIDogdW5kZWZpbmVkO1xuICAgIGEgPSBzLmNoYXJDb2RlQXQoaSk7XG4gICAgcmV0dXJuIGEgPCAweGQ4MDAgfHwgYSA+IDB4ZGJmZiB8fCBpICsgMSA9PT0gbCB8fCAoYiA9IHMuY2hhckNvZGVBdChpICsgMSkpIDwgMHhkYzAwIHx8IGIgPiAweGRmZmZcbiAgICAgID8gVE9fU1RSSU5HID8gcy5jaGFyQXQoaSkgOiBhXG4gICAgICA6IFRPX1NUUklORyA/IHMuc2xpY2UoaSwgaSArIDIpIDogKGEgLSAweGQ4MDAgPDwgMTApICsgKGIgLSAweGRjMDApICsgMHgxMDAwMDtcbiAgfTtcbn07IiwidmFyIHRvSW50ZWdlciA9IHJlcXVpcmUoJy4vX3RvLWludGVnZXInKVxuICAsIG1heCAgICAgICA9IE1hdGgubWF4XG4gICwgbWluICAgICAgID0gTWF0aC5taW47XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGluZGV4LCBsZW5ndGgpe1xuICBpbmRleCA9IHRvSW50ZWdlcihpbmRleCk7XG4gIHJldHVybiBpbmRleCA8IDAgPyBtYXgoaW5kZXggKyBsZW5ndGgsIDApIDogbWluKGluZGV4LCBsZW5ndGgpO1xufTsiLCIvLyA3LjEuNCBUb0ludGVnZXJcbnZhciBjZWlsICA9IE1hdGguY2VpbFxuICAsIGZsb29yID0gTWF0aC5mbG9vcjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gaXNOYU4oaXQgPSAraXQpID8gMCA6IChpdCA+IDAgPyBmbG9vciA6IGNlaWwpKGl0KTtcbn07IiwiLy8gdG8gaW5kZXhlZCBvYmplY3QsIHRvT2JqZWN0IHdpdGggZmFsbGJhY2sgZm9yIG5vbi1hcnJheS1saWtlIEVTMyBzdHJpbmdzXG52YXIgSU9iamVjdCA9IHJlcXVpcmUoJy4vX2lvYmplY3QnKVxuICAsIGRlZmluZWQgPSByZXF1aXJlKCcuL19kZWZpbmVkJyk7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIElPYmplY3QoZGVmaW5lZChpdCkpO1xufTsiLCIvLyA3LjEuMTUgVG9MZW5ndGhcbnZhciB0b0ludGVnZXIgPSByZXF1aXJlKCcuL190by1pbnRlZ2VyJylcbiAgLCBtaW4gICAgICAgPSBNYXRoLm1pbjtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gaXQgPiAwID8gbWluKHRvSW50ZWdlcihpdCksIDB4MWZmZmZmZmZmZmZmZmYpIDogMDsgLy8gcG93KDIsIDUzKSAtIDEgPT0gOTAwNzE5OTI1NDc0MDk5MVxufTsiLCIvLyA3LjEuMTMgVG9PYmplY3QoYXJndW1lbnQpXG52YXIgZGVmaW5lZCA9IHJlcXVpcmUoJy4vX2RlZmluZWQnKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oaXQpe1xuICByZXR1cm4gT2JqZWN0KGRlZmluZWQoaXQpKTtcbn07IiwiLy8gNy4xLjEgVG9QcmltaXRpdmUoaW5wdXQgWywgUHJlZmVycmVkVHlwZV0pXG52YXIgaXNPYmplY3QgPSByZXF1aXJlKCcuL19pcy1vYmplY3QnKTtcbi8vIGluc3RlYWQgb2YgdGhlIEVTNiBzcGVjIHZlcnNpb24sIHdlIGRpZG4ndCBpbXBsZW1lbnQgQEB0b1ByaW1pdGl2ZSBjYXNlXG4vLyBhbmQgdGhlIHNlY29uZCBhcmd1bWVudCAtIGZsYWcgLSBwcmVmZXJyZWQgdHlwZSBpcyBhIHN0cmluZ1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihpdCwgUyl7XG4gIGlmKCFpc09iamVjdChpdCkpcmV0dXJuIGl0O1xuICB2YXIgZm4sIHZhbDtcbiAgaWYoUyAmJiB0eXBlb2YgKGZuID0gaXQudG9TdHJpbmcpID09ICdmdW5jdGlvbicgJiYgIWlzT2JqZWN0KHZhbCA9IGZuLmNhbGwoaXQpKSlyZXR1cm4gdmFsO1xuICBpZih0eXBlb2YgKGZuID0gaXQudmFsdWVPZikgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKXJldHVybiB2YWw7XG4gIGlmKCFTICYmIHR5cGVvZiAoZm4gPSBpdC50b1N0cmluZykgPT0gJ2Z1bmN0aW9uJyAmJiAhaXNPYmplY3QodmFsID0gZm4uY2FsbChpdCkpKXJldHVybiB2YWw7XG4gIHRocm93IFR5cGVFcnJvcihcIkNhbid0IGNvbnZlcnQgb2JqZWN0IHRvIHByaW1pdGl2ZSB2YWx1ZVwiKTtcbn07IiwidmFyIGlkID0gMFxuICAsIHB4ID0gTWF0aC5yYW5kb20oKTtcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oa2V5KXtcbiAgcmV0dXJuICdTeW1ib2woJy5jb25jYXQoa2V5ID09PSB1bmRlZmluZWQgPyAnJyA6IGtleSwgJylfJywgKCsraWQgKyBweCkudG9TdHJpbmcoMzYpKTtcbn07IiwidmFyIGdsb2JhbCAgICAgICAgID0gcmVxdWlyZSgnLi9fZ2xvYmFsJylcbiAgLCBjb3JlICAgICAgICAgICA9IHJlcXVpcmUoJy4vX2NvcmUnKVxuICAsIExJQlJBUlkgICAgICAgID0gcmVxdWlyZSgnLi9fbGlicmFyeScpXG4gICwgd2tzRXh0ICAgICAgICAgPSByZXF1aXJlKCcuL193a3MtZXh0JylcbiAgLCBkZWZpbmVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4vX29iamVjdC1kcCcpLmY7XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG5hbWUpe1xuICB2YXIgJFN5bWJvbCA9IGNvcmUuU3ltYm9sIHx8IChjb3JlLlN5bWJvbCA9IExJQlJBUlkgPyB7fSA6IGdsb2JhbC5TeW1ib2wgfHwge30pO1xuICBpZihuYW1lLmNoYXJBdCgwKSAhPSAnXycgJiYgIShuYW1lIGluICRTeW1ib2wpKWRlZmluZVByb3BlcnR5KCRTeW1ib2wsIG5hbWUsIHt2YWx1ZTogd2tzRXh0LmYobmFtZSl9KTtcbn07IiwiZXhwb3J0cy5mID0gcmVxdWlyZSgnLi9fd2tzJyk7IiwidmFyIHN0b3JlICAgICAgPSByZXF1aXJlKCcuL19zaGFyZWQnKSgnd2tzJylcbiAgLCB1aWQgICAgICAgID0gcmVxdWlyZSgnLi9fdWlkJylcbiAgLCBTeW1ib2wgICAgID0gcmVxdWlyZSgnLi9fZ2xvYmFsJykuU3ltYm9sXG4gICwgVVNFX1NZTUJPTCA9IHR5cGVvZiBTeW1ib2wgPT0gJ2Z1bmN0aW9uJztcblxudmFyICRleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihuYW1lKXtcbiAgcmV0dXJuIHN0b3JlW25hbWVdIHx8IChzdG9yZVtuYW1lXSA9XG4gICAgVVNFX1NZTUJPTCAmJiBTeW1ib2xbbmFtZV0gfHwgKFVTRV9TWU1CT0wgPyBTeW1ib2wgOiB1aWQpKCdTeW1ib2wuJyArIG5hbWUpKTtcbn07XG5cbiRleHBvcnRzLnN0b3JlID0gc3RvcmU7IiwidmFyIGNsYXNzb2YgICA9IHJlcXVpcmUoJy4vX2NsYXNzb2YnKVxuICAsIElURVJBVE9SICA9IHJlcXVpcmUoJy4vX3drcycpKCdpdGVyYXRvcicpXG4gICwgSXRlcmF0b3JzID0gcmVxdWlyZSgnLi9faXRlcmF0b3JzJyk7XG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vX2NvcmUnKS5nZXRJdGVyYXRvck1ldGhvZCA9IGZ1bmN0aW9uKGl0KXtcbiAgaWYoaXQgIT0gdW5kZWZpbmVkKXJldHVybiBpdFtJVEVSQVRPUl1cbiAgICB8fCBpdFsnQEBpdGVyYXRvciddXG4gICAgfHwgSXRlcmF0b3JzW2NsYXNzb2YoaXQpXTtcbn07IiwiJ3VzZSBzdHJpY3QnO1xudmFyIGN0eCAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fY3R4JylcbiAgLCAkZXhwb3J0ICAgICAgICA9IHJlcXVpcmUoJy4vX2V4cG9ydCcpXG4gICwgdG9PYmplY3QgICAgICAgPSByZXF1aXJlKCcuL190by1vYmplY3QnKVxuICAsIGNhbGwgICAgICAgICAgID0gcmVxdWlyZSgnLi9faXRlci1jYWxsJylcbiAgLCBpc0FycmF5SXRlciAgICA9IHJlcXVpcmUoJy4vX2lzLWFycmF5LWl0ZXInKVxuICAsIHRvTGVuZ3RoICAgICAgID0gcmVxdWlyZSgnLi9fdG8tbGVuZ3RoJylcbiAgLCBjcmVhdGVQcm9wZXJ0eSA9IHJlcXVpcmUoJy4vX2NyZWF0ZS1wcm9wZXJ0eScpXG4gICwgZ2V0SXRlckZuICAgICAgPSByZXF1aXJlKCcuL2NvcmUuZ2V0LWl0ZXJhdG9yLW1ldGhvZCcpO1xuXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICFyZXF1aXJlKCcuL19pdGVyLWRldGVjdCcpKGZ1bmN0aW9uKGl0ZXIpeyBBcnJheS5mcm9tKGl0ZXIpOyB9KSwgJ0FycmF5Jywge1xuICAvLyAyMi4xLjIuMSBBcnJheS5mcm9tKGFycmF5TGlrZSwgbWFwZm4gPSB1bmRlZmluZWQsIHRoaXNBcmcgPSB1bmRlZmluZWQpXG4gIGZyb206IGZ1bmN0aW9uIGZyb20oYXJyYXlMaWtlLyosIG1hcGZuID0gdW5kZWZpbmVkLCB0aGlzQXJnID0gdW5kZWZpbmVkKi8pe1xuICAgIHZhciBPICAgICAgID0gdG9PYmplY3QoYXJyYXlMaWtlKVxuICAgICAgLCBDICAgICAgID0gdHlwZW9mIHRoaXMgPT0gJ2Z1bmN0aW9uJyA/IHRoaXMgOiBBcnJheVxuICAgICAgLCBhTGVuICAgID0gYXJndW1lbnRzLmxlbmd0aFxuICAgICAgLCBtYXBmbiAgID0gYUxlbiA+IDEgPyBhcmd1bWVudHNbMV0gOiB1bmRlZmluZWRcbiAgICAgICwgbWFwcGluZyA9IG1hcGZuICE9PSB1bmRlZmluZWRcbiAgICAgICwgaW5kZXggICA9IDBcbiAgICAgICwgaXRlckZuICA9IGdldEl0ZXJGbihPKVxuICAgICAgLCBsZW5ndGgsIHJlc3VsdCwgc3RlcCwgaXRlcmF0b3I7XG4gICAgaWYobWFwcGluZyltYXBmbiA9IGN0eChtYXBmbiwgYUxlbiA+IDIgPyBhcmd1bWVudHNbMl0gOiB1bmRlZmluZWQsIDIpO1xuICAgIC8vIGlmIG9iamVjdCBpc24ndCBpdGVyYWJsZSBvciBpdCdzIGFycmF5IHdpdGggZGVmYXVsdCBpdGVyYXRvciAtIHVzZSBzaW1wbGUgY2FzZVxuICAgIGlmKGl0ZXJGbiAhPSB1bmRlZmluZWQgJiYgIShDID09IEFycmF5ICYmIGlzQXJyYXlJdGVyKGl0ZXJGbikpKXtcbiAgICAgIGZvcihpdGVyYXRvciA9IGl0ZXJGbi5jYWxsKE8pLCByZXN1bHQgPSBuZXcgQzsgIShzdGVwID0gaXRlcmF0b3IubmV4dCgpKS5kb25lOyBpbmRleCsrKXtcbiAgICAgICAgY3JlYXRlUHJvcGVydHkocmVzdWx0LCBpbmRleCwgbWFwcGluZyA/IGNhbGwoaXRlcmF0b3IsIG1hcGZuLCBbc3RlcC52YWx1ZSwgaW5kZXhdLCB0cnVlKSA6IHN0ZXAudmFsdWUpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBsZW5ndGggPSB0b0xlbmd0aChPLmxlbmd0aCk7XG4gICAgICBmb3IocmVzdWx0ID0gbmV3IEMobGVuZ3RoKTsgbGVuZ3RoID4gaW5kZXg7IGluZGV4Kyspe1xuICAgICAgICBjcmVhdGVQcm9wZXJ0eShyZXN1bHQsIGluZGV4LCBtYXBwaW5nID8gbWFwZm4oT1tpbmRleF0sIGluZGV4KSA6IE9baW5kZXhdKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmVzdWx0Lmxlbmd0aCA9IGluZGV4O1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbn0pO1xuIiwiJ3VzZSBzdHJpY3QnO1xudmFyIGFkZFRvVW5zY29wYWJsZXMgPSByZXF1aXJlKCcuL19hZGQtdG8tdW5zY29wYWJsZXMnKVxuICAsIHN0ZXAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL19pdGVyLXN0ZXAnKVxuICAsIEl0ZXJhdG9ycyAgICAgICAgPSByZXF1aXJlKCcuL19pdGVyYXRvcnMnKVxuICAsIHRvSU9iamVjdCAgICAgICAgPSByZXF1aXJlKCcuL190by1pb2JqZWN0Jyk7XG5cbi8vIDIyLjEuMy40IEFycmF5LnByb3RvdHlwZS5lbnRyaWVzKClcbi8vIDIyLjEuMy4xMyBBcnJheS5wcm90b3R5cGUua2V5cygpXG4vLyAyMi4xLjMuMjkgQXJyYXkucHJvdG90eXBlLnZhbHVlcygpXG4vLyAyMi4xLjMuMzAgQXJyYXkucHJvdG90eXBlW0BAaXRlcmF0b3JdKClcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9faXRlci1kZWZpbmUnKShBcnJheSwgJ0FycmF5JywgZnVuY3Rpb24oaXRlcmF0ZWQsIGtpbmQpe1xuICB0aGlzLl90ID0gdG9JT2JqZWN0KGl0ZXJhdGVkKTsgLy8gdGFyZ2V0XG4gIHRoaXMuX2kgPSAwOyAgICAgICAgICAgICAgICAgICAvLyBuZXh0IGluZGV4XG4gIHRoaXMuX2sgPSBraW5kOyAgICAgICAgICAgICAgICAvLyBraW5kXG4vLyAyMi4xLjUuMi4xICVBcnJheUl0ZXJhdG9yUHJvdG90eXBlJS5uZXh0KClcbn0sIGZ1bmN0aW9uKCl7XG4gIHZhciBPICAgICA9IHRoaXMuX3RcbiAgICAsIGtpbmQgID0gdGhpcy5fa1xuICAgICwgaW5kZXggPSB0aGlzLl9pKys7XG4gIGlmKCFPIHx8IGluZGV4ID49IE8ubGVuZ3RoKXtcbiAgICB0aGlzLl90ID0gdW5kZWZpbmVkO1xuICAgIHJldHVybiBzdGVwKDEpO1xuICB9XG4gIGlmKGtpbmQgPT0gJ2tleXMnICApcmV0dXJuIHN0ZXAoMCwgaW5kZXgpO1xuICBpZihraW5kID09ICd2YWx1ZXMnKXJldHVybiBzdGVwKDAsIE9baW5kZXhdKTtcbiAgcmV0dXJuIHN0ZXAoMCwgW2luZGV4LCBPW2luZGV4XV0pO1xufSwgJ3ZhbHVlcycpO1xuXG4vLyBhcmd1bWVudHNMaXN0W0BAaXRlcmF0b3JdIGlzICVBcnJheVByb3RvX3ZhbHVlcyUgKDkuNC40LjYsIDkuNC40LjcpXG5JdGVyYXRvcnMuQXJndW1lbnRzID0gSXRlcmF0b3JzLkFycmF5O1xuXG5hZGRUb1Vuc2NvcGFibGVzKCdrZXlzJyk7XG5hZGRUb1Vuc2NvcGFibGVzKCd2YWx1ZXMnKTtcbmFkZFRvVW5zY29wYWJsZXMoJ2VudHJpZXMnKTsiLCIiLCIndXNlIHN0cmljdCc7XG52YXIgJGF0ICA9IHJlcXVpcmUoJy4vX3N0cmluZy1hdCcpKHRydWUpO1xuXG4vLyAyMS4xLjMuMjcgU3RyaW5nLnByb3RvdHlwZVtAQGl0ZXJhdG9yXSgpXG5yZXF1aXJlKCcuL19pdGVyLWRlZmluZScpKFN0cmluZywgJ1N0cmluZycsIGZ1bmN0aW9uKGl0ZXJhdGVkKXtcbiAgdGhpcy5fdCA9IFN0cmluZyhpdGVyYXRlZCk7IC8vIHRhcmdldFxuICB0aGlzLl9pID0gMDsgICAgICAgICAgICAgICAgLy8gbmV4dCBpbmRleFxuLy8gMjEuMS41LjIuMSAlU3RyaW5nSXRlcmF0b3JQcm90b3R5cGUlLm5leHQoKVxufSwgZnVuY3Rpb24oKXtcbiAgdmFyIE8gICAgID0gdGhpcy5fdFxuICAgICwgaW5kZXggPSB0aGlzLl9pXG4gICAgLCBwb2ludDtcbiAgaWYoaW5kZXggPj0gTy5sZW5ndGgpcmV0dXJuIHt2YWx1ZTogdW5kZWZpbmVkLCBkb25lOiB0cnVlfTtcbiAgcG9pbnQgPSAkYXQoTywgaW5kZXgpO1xuICB0aGlzLl9pICs9IHBvaW50Lmxlbmd0aDtcbiAgcmV0dXJuIHt2YWx1ZTogcG9pbnQsIGRvbmU6IGZhbHNlfTtcbn0pOyIsIid1c2Ugc3RyaWN0Jztcbi8vIEVDTUFTY3JpcHQgNiBzeW1ib2xzIHNoaW1cbnZhciBnbG9iYWwgICAgICAgICA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpXG4gICwgaGFzICAgICAgICAgICAgPSByZXF1aXJlKCcuL19oYXMnKVxuICAsIERFU0NSSVBUT1JTICAgID0gcmVxdWlyZSgnLi9fZGVzY3JpcHRvcnMnKVxuICAsICRleHBvcnQgICAgICAgID0gcmVxdWlyZSgnLi9fZXhwb3J0JylcbiAgLCByZWRlZmluZSAgICAgICA9IHJlcXVpcmUoJy4vX3JlZGVmaW5lJylcbiAgLCBNRVRBICAgICAgICAgICA9IHJlcXVpcmUoJy4vX21ldGEnKS5LRVlcbiAgLCAkZmFpbHMgICAgICAgICA9IHJlcXVpcmUoJy4vX2ZhaWxzJylcbiAgLCBzaGFyZWQgICAgICAgICA9IHJlcXVpcmUoJy4vX3NoYXJlZCcpXG4gICwgc2V0VG9TdHJpbmdUYWcgPSByZXF1aXJlKCcuL19zZXQtdG8tc3RyaW5nLXRhZycpXG4gICwgdWlkICAgICAgICAgICAgPSByZXF1aXJlKCcuL191aWQnKVxuICAsIHdrcyAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fd2tzJylcbiAgLCB3a3NFeHQgICAgICAgICA9IHJlcXVpcmUoJy4vX3drcy1leHQnKVxuICAsIHdrc0RlZmluZSAgICAgID0gcmVxdWlyZSgnLi9fd2tzLWRlZmluZScpXG4gICwga2V5T2YgICAgICAgICAgPSByZXF1aXJlKCcuL19rZXlvZicpXG4gICwgZW51bUtleXMgICAgICAgPSByZXF1aXJlKCcuL19lbnVtLWtleXMnKVxuICAsIGlzQXJyYXkgICAgICAgID0gcmVxdWlyZSgnLi9faXMtYXJyYXknKVxuICAsIGFuT2JqZWN0ICAgICAgID0gcmVxdWlyZSgnLi9fYW4tb2JqZWN0JylcbiAgLCB0b0lPYmplY3QgICAgICA9IHJlcXVpcmUoJy4vX3RvLWlvYmplY3QnKVxuICAsIHRvUHJpbWl0aXZlICAgID0gcmVxdWlyZSgnLi9fdG8tcHJpbWl0aXZlJylcbiAgLCBjcmVhdGVEZXNjICAgICA9IHJlcXVpcmUoJy4vX3Byb3BlcnR5LWRlc2MnKVxuICAsIF9jcmVhdGUgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWNyZWF0ZScpXG4gICwgZ09QTkV4dCAgICAgICAgPSByZXF1aXJlKCcuL19vYmplY3QtZ29wbi1leHQnKVxuICAsICRHT1BEICAgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWdvcGQnKVxuICAsICREUCAgICAgICAgICAgID0gcmVxdWlyZSgnLi9fb2JqZWN0LWRwJylcbiAgLCAka2V5cyAgICAgICAgICA9IHJlcXVpcmUoJy4vX29iamVjdC1rZXlzJylcbiAgLCBnT1BEICAgICAgICAgICA9ICRHT1BELmZcbiAgLCBkUCAgICAgICAgICAgICA9ICREUC5mXG4gICwgZ09QTiAgICAgICAgICAgPSBnT1BORXh0LmZcbiAgLCAkU3ltYm9sICAgICAgICA9IGdsb2JhbC5TeW1ib2xcbiAgLCAkSlNPTiAgICAgICAgICA9IGdsb2JhbC5KU09OXG4gICwgX3N0cmluZ2lmeSAgICAgPSAkSlNPTiAmJiAkSlNPTi5zdHJpbmdpZnlcbiAgLCBQUk9UT1RZUEUgICAgICA9ICdwcm90b3R5cGUnXG4gICwgSElEREVOICAgICAgICAgPSB3a3MoJ19oaWRkZW4nKVxuICAsIFRPX1BSSU1JVElWRSAgID0gd2tzKCd0b1ByaW1pdGl2ZScpXG4gICwgaXNFbnVtICAgICAgICAgPSB7fS5wcm9wZXJ0eUlzRW51bWVyYWJsZVxuICAsIFN5bWJvbFJlZ2lzdHJ5ID0gc2hhcmVkKCdzeW1ib2wtcmVnaXN0cnknKVxuICAsIEFsbFN5bWJvbHMgICAgID0gc2hhcmVkKCdzeW1ib2xzJylcbiAgLCBPUFN5bWJvbHMgICAgICA9IHNoYXJlZCgnb3Atc3ltYm9scycpXG4gICwgT2JqZWN0UHJvdG8gICAgPSBPYmplY3RbUFJPVE9UWVBFXVxuICAsIFVTRV9OQVRJVkUgICAgID0gdHlwZW9mICRTeW1ib2wgPT0gJ2Z1bmN0aW9uJ1xuICAsIFFPYmplY3QgICAgICAgID0gZ2xvYmFsLlFPYmplY3Q7XG4vLyBEb24ndCB1c2Ugc2V0dGVycyBpbiBRdCBTY3JpcHQsIGh0dHBzOi8vZ2l0aHViLmNvbS96bG9pcm9jay9jb3JlLWpzL2lzc3Vlcy8xNzNcbnZhciBzZXR0ZXIgPSAhUU9iamVjdCB8fCAhUU9iamVjdFtQUk9UT1RZUEVdIHx8ICFRT2JqZWN0W1BST1RPVFlQRV0uZmluZENoaWxkO1xuXG4vLyBmYWxsYmFjayBmb3Igb2xkIEFuZHJvaWQsIGh0dHBzOi8vY29kZS5nb29nbGUuY29tL3AvdjgvaXNzdWVzL2RldGFpbD9pZD02ODdcbnZhciBzZXRTeW1ib2xEZXNjID0gREVTQ1JJUFRPUlMgJiYgJGZhaWxzKGZ1bmN0aW9uKCl7XG4gIHJldHVybiBfY3JlYXRlKGRQKHt9LCAnYScsIHtcbiAgICBnZXQ6IGZ1bmN0aW9uKCl7IHJldHVybiBkUCh0aGlzLCAnYScsIHt2YWx1ZTogN30pLmE7IH1cbiAgfSkpLmEgIT0gNztcbn0pID8gZnVuY3Rpb24oaXQsIGtleSwgRCl7XG4gIHZhciBwcm90b0Rlc2MgPSBnT1BEKE9iamVjdFByb3RvLCBrZXkpO1xuICBpZihwcm90b0Rlc2MpZGVsZXRlIE9iamVjdFByb3RvW2tleV07XG4gIGRQKGl0LCBrZXksIEQpO1xuICBpZihwcm90b0Rlc2MgJiYgaXQgIT09IE9iamVjdFByb3RvKWRQKE9iamVjdFByb3RvLCBrZXksIHByb3RvRGVzYyk7XG59IDogZFA7XG5cbnZhciB3cmFwID0gZnVuY3Rpb24odGFnKXtcbiAgdmFyIHN5bSA9IEFsbFN5bWJvbHNbdGFnXSA9IF9jcmVhdGUoJFN5bWJvbFtQUk9UT1RZUEVdKTtcbiAgc3ltLl9rID0gdGFnO1xuICByZXR1cm4gc3ltO1xufTtcblxudmFyIGlzU3ltYm9sID0gVVNFX05BVElWRSAmJiB0eXBlb2YgJFN5bWJvbC5pdGVyYXRvciA9PSAnc3ltYm9sJyA/IGZ1bmN0aW9uKGl0KXtcbiAgcmV0dXJuIHR5cGVvZiBpdCA9PSAnc3ltYm9sJztcbn0gOiBmdW5jdGlvbihpdCl7XG4gIHJldHVybiBpdCBpbnN0YW5jZW9mICRTeW1ib2w7XG59O1xuXG52YXIgJGRlZmluZVByb3BlcnR5ID0gZnVuY3Rpb24gZGVmaW5lUHJvcGVydHkoaXQsIGtleSwgRCl7XG4gIGlmKGl0ID09PSBPYmplY3RQcm90bykkZGVmaW5lUHJvcGVydHkoT1BTeW1ib2xzLCBrZXksIEQpO1xuICBhbk9iamVjdChpdCk7XG4gIGtleSA9IHRvUHJpbWl0aXZlKGtleSwgdHJ1ZSk7XG4gIGFuT2JqZWN0KEQpO1xuICBpZihoYXMoQWxsU3ltYm9scywga2V5KSl7XG4gICAgaWYoIUQuZW51bWVyYWJsZSl7XG4gICAgICBpZighaGFzKGl0LCBISURERU4pKWRQKGl0LCBISURERU4sIGNyZWF0ZURlc2MoMSwge30pKTtcbiAgICAgIGl0W0hJRERFTl1ba2V5XSA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmKGhhcyhpdCwgSElEREVOKSAmJiBpdFtISURERU5dW2tleV0paXRbSElEREVOXVtrZXldID0gZmFsc2U7XG4gICAgICBEID0gX2NyZWF0ZShELCB7ZW51bWVyYWJsZTogY3JlYXRlRGVzYygwLCBmYWxzZSl9KTtcbiAgICB9IHJldHVybiBzZXRTeW1ib2xEZXNjKGl0LCBrZXksIEQpO1xuICB9IHJldHVybiBkUChpdCwga2V5LCBEKTtcbn07XG52YXIgJGRlZmluZVByb3BlcnRpZXMgPSBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKGl0LCBQKXtcbiAgYW5PYmplY3QoaXQpO1xuICB2YXIga2V5cyA9IGVudW1LZXlzKFAgPSB0b0lPYmplY3QoUCkpXG4gICAgLCBpICAgID0gMFxuICAgICwgbCA9IGtleXMubGVuZ3RoXG4gICAgLCBrZXk7XG4gIHdoaWxlKGwgPiBpKSRkZWZpbmVQcm9wZXJ0eShpdCwga2V5ID0ga2V5c1tpKytdLCBQW2tleV0pO1xuICByZXR1cm4gaXQ7XG59O1xudmFyICRjcmVhdGUgPSBmdW5jdGlvbiBjcmVhdGUoaXQsIFApe1xuICByZXR1cm4gUCA9PT0gdW5kZWZpbmVkID8gX2NyZWF0ZShpdCkgOiAkZGVmaW5lUHJvcGVydGllcyhfY3JlYXRlKGl0KSwgUCk7XG59O1xudmFyICRwcm9wZXJ0eUlzRW51bWVyYWJsZSA9IGZ1bmN0aW9uIHByb3BlcnR5SXNFbnVtZXJhYmxlKGtleSl7XG4gIHZhciBFID0gaXNFbnVtLmNhbGwodGhpcywga2V5ID0gdG9QcmltaXRpdmUoa2V5LCB0cnVlKSk7XG4gIGlmKHRoaXMgPT09IE9iamVjdFByb3RvICYmIGhhcyhBbGxTeW1ib2xzLCBrZXkpICYmICFoYXMoT1BTeW1ib2xzLCBrZXkpKXJldHVybiBmYWxzZTtcbiAgcmV0dXJuIEUgfHwgIWhhcyh0aGlzLCBrZXkpIHx8ICFoYXMoQWxsU3ltYm9scywga2V5KSB8fCBoYXModGhpcywgSElEREVOKSAmJiB0aGlzW0hJRERFTl1ba2V5XSA/IEUgOiB0cnVlO1xufTtcbnZhciAkZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yID0gZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGl0LCBrZXkpe1xuICBpdCAgPSB0b0lPYmplY3QoaXQpO1xuICBrZXkgPSB0b1ByaW1pdGl2ZShrZXksIHRydWUpO1xuICBpZihpdCA9PT0gT2JqZWN0UHJvdG8gJiYgaGFzKEFsbFN5bWJvbHMsIGtleSkgJiYgIWhhcyhPUFN5bWJvbHMsIGtleSkpcmV0dXJuO1xuICB2YXIgRCA9IGdPUEQoaXQsIGtleSk7XG4gIGlmKEQgJiYgaGFzKEFsbFN5bWJvbHMsIGtleSkgJiYgIShoYXMoaXQsIEhJRERFTikgJiYgaXRbSElEREVOXVtrZXldKSlELmVudW1lcmFibGUgPSB0cnVlO1xuICByZXR1cm4gRDtcbn07XG52YXIgJGdldE93blByb3BlcnR5TmFtZXMgPSBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eU5hbWVzKGl0KXtcbiAgdmFyIG5hbWVzICA9IGdPUE4odG9JT2JqZWN0KGl0KSlcbiAgICAsIHJlc3VsdCA9IFtdXG4gICAgLCBpICAgICAgPSAwXG4gICAgLCBrZXk7XG4gIHdoaWxlKG5hbWVzLmxlbmd0aCA+IGkpe1xuICAgIGlmKCFoYXMoQWxsU3ltYm9scywga2V5ID0gbmFtZXNbaSsrXSkgJiYga2V5ICE9IEhJRERFTiAmJiBrZXkgIT0gTUVUQSlyZXN1bHQucHVzaChrZXkpO1xuICB9IHJldHVybiByZXN1bHQ7XG59O1xudmFyICRnZXRPd25Qcm9wZXJ0eVN5bWJvbHMgPSBmdW5jdGlvbiBnZXRPd25Qcm9wZXJ0eVN5bWJvbHMoaXQpe1xuICB2YXIgSVNfT1AgID0gaXQgPT09IE9iamVjdFByb3RvXG4gICAgLCBuYW1lcyAgPSBnT1BOKElTX09QID8gT1BTeW1ib2xzIDogdG9JT2JqZWN0KGl0KSlcbiAgICAsIHJlc3VsdCA9IFtdXG4gICAgLCBpICAgICAgPSAwXG4gICAgLCBrZXk7XG4gIHdoaWxlKG5hbWVzLmxlbmd0aCA+IGkpe1xuICAgIGlmKGhhcyhBbGxTeW1ib2xzLCBrZXkgPSBuYW1lc1tpKytdKSAmJiAoSVNfT1AgPyBoYXMoT2JqZWN0UHJvdG8sIGtleSkgOiB0cnVlKSlyZXN1bHQucHVzaChBbGxTeW1ib2xzW2tleV0pO1xuICB9IHJldHVybiByZXN1bHQ7XG59O1xuXG4vLyAxOS40LjEuMSBTeW1ib2woW2Rlc2NyaXB0aW9uXSlcbmlmKCFVU0VfTkFUSVZFKXtcbiAgJFN5bWJvbCA9IGZ1bmN0aW9uIFN5bWJvbCgpe1xuICAgIGlmKHRoaXMgaW5zdGFuY2VvZiAkU3ltYm9sKXRocm93IFR5cGVFcnJvcignU3ltYm9sIGlzIG5vdCBhIGNvbnN0cnVjdG9yIScpO1xuICAgIHZhciB0YWcgPSB1aWQoYXJndW1lbnRzLmxlbmd0aCA+IDAgPyBhcmd1bWVudHNbMF0gOiB1bmRlZmluZWQpO1xuICAgIHZhciAkc2V0ID0gZnVuY3Rpb24odmFsdWUpe1xuICAgICAgaWYodGhpcyA9PT0gT2JqZWN0UHJvdG8pJHNldC5jYWxsKE9QU3ltYm9scywgdmFsdWUpO1xuICAgICAgaWYoaGFzKHRoaXMsIEhJRERFTikgJiYgaGFzKHRoaXNbSElEREVOXSwgdGFnKSl0aGlzW0hJRERFTl1bdGFnXSA9IGZhbHNlO1xuICAgICAgc2V0U3ltYm9sRGVzYyh0aGlzLCB0YWcsIGNyZWF0ZURlc2MoMSwgdmFsdWUpKTtcbiAgICB9O1xuICAgIGlmKERFU0NSSVBUT1JTICYmIHNldHRlcilzZXRTeW1ib2xEZXNjKE9iamVjdFByb3RvLCB0YWcsIHtjb25maWd1cmFibGU6IHRydWUsIHNldDogJHNldH0pO1xuICAgIHJldHVybiB3cmFwKHRhZyk7XG4gIH07XG4gIHJlZGVmaW5lKCRTeW1ib2xbUFJPVE9UWVBFXSwgJ3RvU3RyaW5nJywgZnVuY3Rpb24gdG9TdHJpbmcoKXtcbiAgICByZXR1cm4gdGhpcy5faztcbiAgfSk7XG5cbiAgJEdPUEQuZiA9ICRnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3I7XG4gICREUC5mICAgPSAkZGVmaW5lUHJvcGVydHk7XG4gIHJlcXVpcmUoJy4vX29iamVjdC1nb3BuJykuZiA9IGdPUE5FeHQuZiA9ICRnZXRPd25Qcm9wZXJ0eU5hbWVzO1xuICByZXF1aXJlKCcuL19vYmplY3QtcGllJykuZiAgPSAkcHJvcGVydHlJc0VudW1lcmFibGU7XG4gIHJlcXVpcmUoJy4vX29iamVjdC1nb3BzJykuZiA9ICRnZXRPd25Qcm9wZXJ0eVN5bWJvbHM7XG5cbiAgaWYoREVTQ1JJUFRPUlMgJiYgIXJlcXVpcmUoJy4vX2xpYnJhcnknKSl7XG4gICAgcmVkZWZpbmUoT2JqZWN0UHJvdG8sICdwcm9wZXJ0eUlzRW51bWVyYWJsZScsICRwcm9wZXJ0eUlzRW51bWVyYWJsZSwgdHJ1ZSk7XG4gIH1cblxuICB3a3NFeHQuZiA9IGZ1bmN0aW9uKG5hbWUpe1xuICAgIHJldHVybiB3cmFwKHdrcyhuYW1lKSk7XG4gIH1cbn1cblxuJGV4cG9ydCgkZXhwb3J0LkcgKyAkZXhwb3J0LlcgKyAkZXhwb3J0LkYgKiAhVVNFX05BVElWRSwge1N5bWJvbDogJFN5bWJvbH0pO1xuXG5mb3IodmFyIHN5bWJvbHMgPSAoXG4gIC8vIDE5LjQuMi4yLCAxOS40LjIuMywgMTkuNC4yLjQsIDE5LjQuMi42LCAxOS40LjIuOCwgMTkuNC4yLjksIDE5LjQuMi4xMCwgMTkuNC4yLjExLCAxOS40LjIuMTIsIDE5LjQuMi4xMywgMTkuNC4yLjE0XG4gICdoYXNJbnN0YW5jZSxpc0NvbmNhdFNwcmVhZGFibGUsaXRlcmF0b3IsbWF0Y2gscmVwbGFjZSxzZWFyY2gsc3BlY2llcyxzcGxpdCx0b1ByaW1pdGl2ZSx0b1N0cmluZ1RhZyx1bnNjb3BhYmxlcydcbikuc3BsaXQoJywnKSwgaSA9IDA7IHN5bWJvbHMubGVuZ3RoID4gaTsgKXdrcyhzeW1ib2xzW2krK10pO1xuXG5mb3IodmFyIHN5bWJvbHMgPSAka2V5cyh3a3Muc3RvcmUpLCBpID0gMDsgc3ltYm9scy5sZW5ndGggPiBpOyApd2tzRGVmaW5lKHN5bWJvbHNbaSsrXSk7XG5cbiRleHBvcnQoJGV4cG9ydC5TICsgJGV4cG9ydC5GICogIVVTRV9OQVRJVkUsICdTeW1ib2wnLCB7XG4gIC8vIDE5LjQuMi4xIFN5bWJvbC5mb3Ioa2V5KVxuICAnZm9yJzogZnVuY3Rpb24oa2V5KXtcbiAgICByZXR1cm4gaGFzKFN5bWJvbFJlZ2lzdHJ5LCBrZXkgKz0gJycpXG4gICAgICA/IFN5bWJvbFJlZ2lzdHJ5W2tleV1cbiAgICAgIDogU3ltYm9sUmVnaXN0cnlba2V5XSA9ICRTeW1ib2woa2V5KTtcbiAgfSxcbiAgLy8gMTkuNC4yLjUgU3ltYm9sLmtleUZvcihzeW0pXG4gIGtleUZvcjogZnVuY3Rpb24ga2V5Rm9yKGtleSl7XG4gICAgaWYoaXNTeW1ib2woa2V5KSlyZXR1cm4ga2V5T2YoU3ltYm9sUmVnaXN0cnksIGtleSk7XG4gICAgdGhyb3cgVHlwZUVycm9yKGtleSArICcgaXMgbm90IGEgc3ltYm9sIScpO1xuICB9LFxuICB1c2VTZXR0ZXI6IGZ1bmN0aW9uKCl7IHNldHRlciA9IHRydWU7IH0sXG4gIHVzZVNpbXBsZTogZnVuY3Rpb24oKXsgc2V0dGVyID0gZmFsc2U7IH1cbn0pO1xuXG4kZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICFVU0VfTkFUSVZFLCAnT2JqZWN0Jywge1xuICAvLyAxOS4xLjIuMiBPYmplY3QuY3JlYXRlKE8gWywgUHJvcGVydGllc10pXG4gIGNyZWF0ZTogJGNyZWF0ZSxcbiAgLy8gMTkuMS4yLjQgT2JqZWN0LmRlZmluZVByb3BlcnR5KE8sIFAsIEF0dHJpYnV0ZXMpXG4gIGRlZmluZVByb3BlcnR5OiAkZGVmaW5lUHJvcGVydHksXG4gIC8vIDE5LjEuMi4zIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKE8sIFByb3BlcnRpZXMpXG4gIGRlZmluZVByb3BlcnRpZXM6ICRkZWZpbmVQcm9wZXJ0aWVzLFxuICAvLyAxOS4xLjIuNiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKE8sIFApXG4gIGdldE93blByb3BlcnR5RGVzY3JpcHRvcjogJGdldE93blByb3BlcnR5RGVzY3JpcHRvcixcbiAgLy8gMTkuMS4yLjcgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoTylcbiAgZ2V0T3duUHJvcGVydHlOYW1lczogJGdldE93blByb3BlcnR5TmFtZXMsXG4gIC8vIDE5LjEuMi44IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMoTylcbiAgZ2V0T3duUHJvcGVydHlTeW1ib2xzOiAkZ2V0T3duUHJvcGVydHlTeW1ib2xzXG59KTtcblxuLy8gMjQuMy4yIEpTT04uc3RyaW5naWZ5KHZhbHVlIFssIHJlcGxhY2VyIFssIHNwYWNlXV0pXG4kSlNPTiAmJiAkZXhwb3J0KCRleHBvcnQuUyArICRleHBvcnQuRiAqICghVVNFX05BVElWRSB8fCAkZmFpbHMoZnVuY3Rpb24oKXtcbiAgdmFyIFMgPSAkU3ltYm9sKCk7XG4gIC8vIE1TIEVkZ2UgY29udmVydHMgc3ltYm9sIHZhbHVlcyB0byBKU09OIGFzIHt9XG4gIC8vIFdlYktpdCBjb252ZXJ0cyBzeW1ib2wgdmFsdWVzIHRvIEpTT04gYXMgbnVsbFxuICAvLyBWOCB0aHJvd3Mgb24gYm94ZWQgc3ltYm9sc1xuICByZXR1cm4gX3N0cmluZ2lmeShbU10pICE9ICdbbnVsbF0nIHx8IF9zdHJpbmdpZnkoe2E6IFN9KSAhPSAne30nIHx8IF9zdHJpbmdpZnkoT2JqZWN0KFMpKSAhPSAne30nO1xufSkpLCAnSlNPTicsIHtcbiAgc3RyaW5naWZ5OiBmdW5jdGlvbiBzdHJpbmdpZnkoaXQpe1xuICAgIGlmKGl0ID09PSB1bmRlZmluZWQgfHwgaXNTeW1ib2woaXQpKXJldHVybjsgLy8gSUU4IHJldHVybnMgc3RyaW5nIG9uIHVuZGVmaW5lZFxuICAgIHZhciBhcmdzID0gW2l0XVxuICAgICAgLCBpICAgID0gMVxuICAgICAgLCByZXBsYWNlciwgJHJlcGxhY2VyO1xuICAgIHdoaWxlKGFyZ3VtZW50cy5sZW5ndGggPiBpKWFyZ3MucHVzaChhcmd1bWVudHNbaSsrXSk7XG4gICAgcmVwbGFjZXIgPSBhcmdzWzFdO1xuICAgIGlmKHR5cGVvZiByZXBsYWNlciA9PSAnZnVuY3Rpb24nKSRyZXBsYWNlciA9IHJlcGxhY2VyO1xuICAgIGlmKCRyZXBsYWNlciB8fCAhaXNBcnJheShyZXBsYWNlcikpcmVwbGFjZXIgPSBmdW5jdGlvbihrZXksIHZhbHVlKXtcbiAgICAgIGlmKCRyZXBsYWNlcil2YWx1ZSA9ICRyZXBsYWNlci5jYWxsKHRoaXMsIGtleSwgdmFsdWUpO1xuICAgICAgaWYoIWlzU3ltYm9sKHZhbHVlKSlyZXR1cm4gdmFsdWU7XG4gICAgfTtcbiAgICBhcmdzWzFdID0gcmVwbGFjZXI7XG4gICAgcmV0dXJuIF9zdHJpbmdpZnkuYXBwbHkoJEpTT04sIGFyZ3MpO1xuICB9XG59KTtcblxuLy8gMTkuNC4zLjQgU3ltYm9sLnByb3RvdHlwZVtAQHRvUHJpbWl0aXZlXShoaW50KVxuJFN5bWJvbFtQUk9UT1RZUEVdW1RPX1BSSU1JVElWRV0gfHwgcmVxdWlyZSgnLi9faGlkZScpKCRTeW1ib2xbUFJPVE9UWVBFXSwgVE9fUFJJTUlUSVZFLCAkU3ltYm9sW1BST1RPVFlQRV0udmFsdWVPZik7XG4vLyAxOS40LjMuNSBTeW1ib2wucHJvdG90eXBlW0BAdG9TdHJpbmdUYWddXG5zZXRUb1N0cmluZ1RhZygkU3ltYm9sLCAnU3ltYm9sJyk7XG4vLyAyMC4yLjEuOSBNYXRoW0BAdG9TdHJpbmdUYWddXG5zZXRUb1N0cmluZ1RhZyhNYXRoLCAnTWF0aCcsIHRydWUpO1xuLy8gMjQuMy4zIEpTT05bQEB0b1N0cmluZ1RhZ11cbnNldFRvU3RyaW5nVGFnKGdsb2JhbC5KU09OLCAnSlNPTicsIHRydWUpOyIsInJlcXVpcmUoJy4vX3drcy1kZWZpbmUnKSgnYXN5bmNJdGVyYXRvcicpOyIsInJlcXVpcmUoJy4vX3drcy1kZWZpbmUnKSgnb2JzZXJ2YWJsZScpOyIsInJlcXVpcmUoJy4vZXM2LmFycmF5Lml0ZXJhdG9yJyk7XG52YXIgZ2xvYmFsICAgICAgICA9IHJlcXVpcmUoJy4vX2dsb2JhbCcpXG4gICwgaGlkZSAgICAgICAgICA9IHJlcXVpcmUoJy4vX2hpZGUnKVxuICAsIEl0ZXJhdG9ycyAgICAgPSByZXF1aXJlKCcuL19pdGVyYXRvcnMnKVxuICAsIFRPX1NUUklOR19UQUcgPSByZXF1aXJlKCcuL193a3MnKSgndG9TdHJpbmdUYWcnKTtcblxuZm9yKHZhciBjb2xsZWN0aW9ucyA9IFsnTm9kZUxpc3QnLCAnRE9NVG9rZW5MaXN0JywgJ01lZGlhTGlzdCcsICdTdHlsZVNoZWV0TGlzdCcsICdDU1NSdWxlTGlzdCddLCBpID0gMDsgaSA8IDU7IGkrKyl7XG4gIHZhciBOQU1FICAgICAgID0gY29sbGVjdGlvbnNbaV1cbiAgICAsIENvbGxlY3Rpb24gPSBnbG9iYWxbTkFNRV1cbiAgICAsIHByb3RvICAgICAgPSBDb2xsZWN0aW9uICYmIENvbGxlY3Rpb24ucHJvdG90eXBlO1xuICBpZihwcm90byAmJiAhcHJvdG9bVE9fU1RSSU5HX1RBR10paGlkZShwcm90bywgVE9fU1RSSU5HX1RBRywgTkFNRSk7XG4gIEl0ZXJhdG9yc1tOQU1FXSA9IEl0ZXJhdG9ycy5BcnJheTtcbn0iLCIvKiFcbiAqIGRlZXAtZGlmZi5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cbiAqL1xuOyhmdW5jdGlvbihyb290LCBmYWN0b3J5KSB7XG4gICd1c2Ugc3RyaWN0JztcbiAgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuICAgIC8vIEFNRC4gUmVnaXN0ZXIgYXMgYW4gYW5vbnltb3VzIG1vZHVsZS5cbiAgICBkZWZpbmUoW10sIGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGZhY3RvcnkoKTtcbiAgICB9KTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpIHtcbiAgICAvLyBOb2RlLiBEb2VzIG5vdCB3b3JrIHdpdGggc3RyaWN0IENvbW1vbkpTLCBidXRcbiAgICAvLyBvbmx5IENvbW1vbkpTLWxpa2UgZW52aXJvbm1lbnRzIHRoYXQgc3VwcG9ydCBtb2R1bGUuZXhwb3J0cyxcbiAgICAvLyBsaWtlIE5vZGUuXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG4gIH0gZWxzZSB7XG4gICAgLy8gQnJvd3NlciBnbG9iYWxzIChyb290IGlzIHdpbmRvdylcbiAgICByb290LkRlZXBEaWZmID0gZmFjdG9yeSgpO1xuICB9XG59KHRoaXMsIGZ1bmN0aW9uKHVuZGVmaW5lZCkge1xuICAndXNlIHN0cmljdCc7XG5cbiAgdmFyICRzY29wZSwgY29uZmxpY3QsIGNvbmZsaWN0UmVzb2x1dGlvbiA9IFtdO1xuICBpZiAodHlwZW9mIGdsb2JhbCA9PT0gJ29iamVjdCcgJiYgZ2xvYmFsKSB7XG4gICAgJHNjb3BlID0gZ2xvYmFsO1xuICB9IGVsc2UgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgJHNjb3BlID0gd2luZG93O1xuICB9IGVsc2Uge1xuICAgICRzY29wZSA9IHt9O1xuICB9XG4gIGNvbmZsaWN0ID0gJHNjb3BlLkRlZXBEaWZmO1xuICBpZiAoY29uZmxpY3QpIHtcbiAgICBjb25mbGljdFJlc29sdXRpb24ucHVzaChcbiAgICAgIGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoJ3VuZGVmaW5lZCcgIT09IHR5cGVvZiBjb25mbGljdCAmJiAkc2NvcGUuRGVlcERpZmYgPT09IGFjY3VtdWxhdGVEaWZmKSB7XG4gICAgICAgICAgJHNjb3BlLkRlZXBEaWZmID0gY29uZmxpY3Q7XG4gICAgICAgICAgY29uZmxpY3QgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICB9XG5cbiAgLy8gbm9kZWpzIGNvbXBhdGlibGUgb24gc2VydmVyIHNpZGUgYW5kIGluIHRoZSBicm93c2VyLlxuICBmdW5jdGlvbiBpbmhlcml0cyhjdG9yLCBzdXBlckN0b3IpIHtcbiAgICBjdG9yLnN1cGVyXyA9IHN1cGVyQ3RvcjtcbiAgICBjdG9yLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDdG9yLnByb3RvdHlwZSwge1xuICAgICAgY29uc3RydWN0b3I6IHtcbiAgICAgICAgdmFsdWU6IGN0b3IsXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBEaWZmKGtpbmQsIHBhdGgpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ2tpbmQnLCB7XG4gICAgICB2YWx1ZToga2luZCxcbiAgICAgIGVudW1lcmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBpZiAocGF0aCAmJiBwYXRoLmxlbmd0aCkge1xuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdwYXRoJywge1xuICAgICAgICB2YWx1ZTogcGF0aCxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gRGlmZkVkaXQocGF0aCwgb3JpZ2luLCB2YWx1ZSkge1xuICAgIERpZmZFZGl0LnN1cGVyXy5jYWxsKHRoaXMsICdFJywgcGF0aCk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdsaHMnLCB7XG4gICAgICB2YWx1ZTogb3JpZ2luLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAncmhzJywge1xuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICB9XG4gIGluaGVyaXRzKERpZmZFZGl0LCBEaWZmKTtcblxuICBmdW5jdGlvbiBEaWZmTmV3KHBhdGgsIHZhbHVlKSB7XG4gICAgRGlmZk5ldy5zdXBlcl8uY2FsbCh0aGlzLCAnTicsIHBhdGgpO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCAncmhzJywge1xuICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICB9XG4gIGluaGVyaXRzKERpZmZOZXcsIERpZmYpO1xuXG4gIGZ1bmN0aW9uIERpZmZEZWxldGVkKHBhdGgsIHZhbHVlKSB7XG4gICAgRGlmZkRlbGV0ZWQuc3VwZXJfLmNhbGwodGhpcywgJ0QnLCBwYXRoKTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ2xocycsIHtcbiAgICAgIHZhbHVlOiB2YWx1ZSxcbiAgICAgIGVudW1lcmFibGU6IHRydWVcbiAgICB9KTtcbiAgfVxuICBpbmhlcml0cyhEaWZmRGVsZXRlZCwgRGlmZik7XG5cbiAgZnVuY3Rpb24gRGlmZkFycmF5KHBhdGgsIGluZGV4LCBpdGVtKSB7XG4gICAgRGlmZkFycmF5LnN1cGVyXy5jYWxsKHRoaXMsICdBJywgcGF0aCk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMsICdpbmRleCcsIHtcbiAgICAgIHZhbHVlOiBpbmRleCxcbiAgICAgIGVudW1lcmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcywgJ2l0ZW0nLCB7XG4gICAgICB2YWx1ZTogaXRlbSxcbiAgICAgIGVudW1lcmFibGU6IHRydWVcbiAgICB9KTtcbiAgfVxuICBpbmhlcml0cyhEaWZmQXJyYXksIERpZmYpO1xuXG4gIGZ1bmN0aW9uIGFycmF5UmVtb3ZlKGFyciwgZnJvbSwgdG8pIHtcbiAgICB2YXIgcmVzdCA9IGFyci5zbGljZSgodG8gfHwgZnJvbSkgKyAxIHx8IGFyci5sZW5ndGgpO1xuICAgIGFyci5sZW5ndGggPSBmcm9tIDwgMCA/IGFyci5sZW5ndGggKyBmcm9tIDogZnJvbTtcbiAgICBhcnIucHVzaC5hcHBseShhcnIsIHJlc3QpO1xuICAgIHJldHVybiBhcnI7XG4gIH1cblxuICBmdW5jdGlvbiByZWFsVHlwZU9mKHN1YmplY3QpIHtcbiAgICB2YXIgdHlwZSA9IHR5cGVvZiBzdWJqZWN0O1xuICAgIGlmICh0eXBlICE9PSAnb2JqZWN0Jykge1xuICAgICAgcmV0dXJuIHR5cGU7XG4gICAgfVxuXG4gICAgaWYgKHN1YmplY3QgPT09IE1hdGgpIHtcbiAgICAgIHJldHVybiAnbWF0aCc7XG4gICAgfSBlbHNlIGlmIChzdWJqZWN0ID09PSBudWxsKSB7XG4gICAgICByZXR1cm4gJ251bGwnO1xuICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShzdWJqZWN0KSkge1xuICAgICAgcmV0dXJuICdhcnJheSc7XG4gICAgfSBlbHNlIGlmIChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoc3ViamVjdCkgPT09ICdbb2JqZWN0IERhdGVdJykge1xuICAgICAgcmV0dXJuICdkYXRlJztcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBzdWJqZWN0LnRvU3RyaW5nICE9PSAndW5kZWZpbmVkJyAmJiAvXlxcLy4qXFwvLy50ZXN0KHN1YmplY3QudG9TdHJpbmcoKSkpIHtcbiAgICAgIHJldHVybiAncmVnZXhwJztcbiAgICB9XG4gICAgcmV0dXJuICdvYmplY3QnO1xuICB9XG5cbiAgZnVuY3Rpb24gZGVlcERpZmYobGhzLCByaHMsIGNoYW5nZXMsIHByZWZpbHRlciwgcGF0aCwga2V5LCBzdGFjaykge1xuICAgIHBhdGggPSBwYXRoIHx8IFtdO1xuICAgIHZhciBjdXJyZW50UGF0aCA9IHBhdGguc2xpY2UoMCk7XG4gICAgaWYgKHR5cGVvZiBrZXkgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBpZiAocHJlZmlsdGVyKSB7XG4gICAgICAgIGlmICh0eXBlb2YocHJlZmlsdGVyKSA9PT0gJ2Z1bmN0aW9uJyAmJiBwcmVmaWx0ZXIoY3VycmVudFBhdGgsIGtleSkpIHsgcmV0dXJuOyB9XG4gICAgICAgIGVsc2UgaWYgKHR5cGVvZihwcmVmaWx0ZXIpID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgIGlmIChwcmVmaWx0ZXIucHJlZmlsdGVyICYmIHByZWZpbHRlci5wcmVmaWx0ZXIoY3VycmVudFBhdGgsIGtleSkpIHsgcmV0dXJuOyB9XG4gICAgICAgICAgaWYgKHByZWZpbHRlci5ub3JtYWxpemUpIHtcbiAgICAgICAgICAgIHZhciBhbHQgPSBwcmVmaWx0ZXIubm9ybWFsaXplKGN1cnJlbnRQYXRoLCBrZXksIGxocywgcmhzKTtcbiAgICAgICAgICAgIGlmIChhbHQpIHtcbiAgICAgICAgICAgICAgbGhzID0gYWx0WzBdO1xuICAgICAgICAgICAgICByaHMgPSBhbHRbMV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBjdXJyZW50UGF0aC5wdXNoKGtleSk7XG4gICAgfVxuXG4gICAgLy8gVXNlIHN0cmluZyBjb21wYXJpc29uIGZvciByZWdleGVzXG4gICAgaWYgKHJlYWxUeXBlT2YobGhzKSA9PT0gJ3JlZ2V4cCcgJiYgcmVhbFR5cGVPZihyaHMpID09PSAncmVnZXhwJykge1xuICAgICAgbGhzID0gbGhzLnRvU3RyaW5nKCk7XG4gICAgICByaHMgPSByaHMudG9TdHJpbmcoKTtcbiAgICB9XG5cbiAgICB2YXIgbHR5cGUgPSB0eXBlb2YgbGhzO1xuICAgIHZhciBydHlwZSA9IHR5cGVvZiByaHM7XG4gICAgaWYgKGx0eXBlID09PSAndW5kZWZpbmVkJykge1xuICAgICAgaWYgKHJ0eXBlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBjaGFuZ2VzKG5ldyBEaWZmTmV3KGN1cnJlbnRQYXRoLCByaHMpKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHJ0eXBlID09PSAndW5kZWZpbmVkJykge1xuICAgICAgY2hhbmdlcyhuZXcgRGlmZkRlbGV0ZWQoY3VycmVudFBhdGgsIGxocykpO1xuICAgIH0gZWxzZSBpZiAocmVhbFR5cGVPZihsaHMpICE9PSByZWFsVHlwZU9mKHJocykpIHtcbiAgICAgIGNoYW5nZXMobmV3IERpZmZFZGl0KGN1cnJlbnRQYXRoLCBsaHMsIHJocykpO1xuICAgIH0gZWxzZSBpZiAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGxocykgPT09ICdbb2JqZWN0IERhdGVdJyAmJiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwocmhzKSA9PT0gJ1tvYmplY3QgRGF0ZV0nICYmICgobGhzIC0gcmhzKSAhPT0gMCkpIHtcbiAgICAgIGNoYW5nZXMobmV3IERpZmZFZGl0KGN1cnJlbnRQYXRoLCBsaHMsIHJocykpO1xuICAgIH0gZWxzZSBpZiAobHR5cGUgPT09ICdvYmplY3QnICYmIGxocyAhPT0gbnVsbCAmJiByaHMgIT09IG51bGwpIHtcbiAgICAgIHN0YWNrID0gc3RhY2sgfHwgW107XG4gICAgICBpZiAoc3RhY2suaW5kZXhPZihsaHMpIDwgMCkge1xuICAgICAgICBzdGFjay5wdXNoKGxocyk7XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGxocykpIHtcbiAgICAgICAgICB2YXIgaSwgbGVuID0gbGhzLmxlbmd0aDtcbiAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbGhzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoaSA+PSByaHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgIGNoYW5nZXMobmV3IERpZmZBcnJheShjdXJyZW50UGF0aCwgaSwgbmV3IERpZmZEZWxldGVkKHVuZGVmaW5lZCwgbGhzW2ldKSkpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgZGVlcERpZmYobGhzW2ldLCByaHNbaV0sIGNoYW5nZXMsIHByZWZpbHRlciwgY3VycmVudFBhdGgsIGksIHN0YWNrKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgd2hpbGUgKGkgPCByaHMubGVuZ3RoKSB7XG4gICAgICAgICAgICBjaGFuZ2VzKG5ldyBEaWZmQXJyYXkoY3VycmVudFBhdGgsIGksIG5ldyBEaWZmTmV3KHVuZGVmaW5lZCwgcmhzW2krK10pKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhciBha2V5cyA9IE9iamVjdC5rZXlzKGxocyk7XG4gICAgICAgICAgdmFyIHBrZXlzID0gT2JqZWN0LmtleXMocmhzKTtcbiAgICAgICAgICBha2V5cy5mb3JFYWNoKGZ1bmN0aW9uKGssIGkpIHtcbiAgICAgICAgICAgIHZhciBvdGhlciA9IHBrZXlzLmluZGV4T2Yoayk7XG4gICAgICAgICAgICBpZiAob3RoZXIgPj0gMCkge1xuICAgICAgICAgICAgICBkZWVwRGlmZihsaHNba10sIHJoc1trXSwgY2hhbmdlcywgcHJlZmlsdGVyLCBjdXJyZW50UGF0aCwgaywgc3RhY2spO1xuICAgICAgICAgICAgICBwa2V5cyA9IGFycmF5UmVtb3ZlKHBrZXlzLCBvdGhlcik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBkZWVwRGlmZihsaHNba10sIHVuZGVmaW5lZCwgY2hhbmdlcywgcHJlZmlsdGVyLCBjdXJyZW50UGF0aCwgaywgc3RhY2spO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIHBrZXlzLmZvckVhY2goZnVuY3Rpb24oaykge1xuICAgICAgICAgICAgZGVlcERpZmYodW5kZWZpbmVkLCByaHNba10sIGNoYW5nZXMsIHByZWZpbHRlciwgY3VycmVudFBhdGgsIGssIHN0YWNrKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBzdGFjay5sZW5ndGggPSBzdGFjay5sZW5ndGggLSAxO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAobGhzICE9PSByaHMpIHtcbiAgICAgIGlmICghKGx0eXBlID09PSAnbnVtYmVyJyAmJiBpc05hTihsaHMpICYmIGlzTmFOKHJocykpKSB7XG4gICAgICAgIGNoYW5nZXMobmV3IERpZmZFZGl0KGN1cnJlbnRQYXRoLCBsaHMsIHJocykpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGFjY3VtdWxhdGVEaWZmKGxocywgcmhzLCBwcmVmaWx0ZXIsIGFjY3VtKSB7XG4gICAgYWNjdW0gPSBhY2N1bSB8fCBbXTtcbiAgICBkZWVwRGlmZihsaHMsIHJocyxcbiAgICAgIGZ1bmN0aW9uKGRpZmYpIHtcbiAgICAgICAgaWYgKGRpZmYpIHtcbiAgICAgICAgICBhY2N1bS5wdXNoKGRpZmYpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgcHJlZmlsdGVyKTtcbiAgICByZXR1cm4gKGFjY3VtLmxlbmd0aCkgPyBhY2N1bSA6IHVuZGVmaW5lZDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGFwcGx5QXJyYXlDaGFuZ2UoYXJyLCBpbmRleCwgY2hhbmdlKSB7XG4gICAgaWYgKGNoYW5nZS5wYXRoICYmIGNoYW5nZS5wYXRoLmxlbmd0aCkge1xuICAgICAgdmFyIGl0ID0gYXJyW2luZGV4XSxcbiAgICAgICAgICBpLCB1ID0gY2hhbmdlLnBhdGgubGVuZ3RoIC0gMTtcbiAgICAgIGZvciAoaSA9IDA7IGkgPCB1OyBpKyspIHtcbiAgICAgICAgaXQgPSBpdFtjaGFuZ2UucGF0aFtpXV07XG4gICAgICB9XG4gICAgICBzd2l0Y2ggKGNoYW5nZS5raW5kKSB7XG4gICAgICAgIGNhc2UgJ0EnOlxuICAgICAgICAgIGFwcGx5QXJyYXlDaGFuZ2UoaXRbY2hhbmdlLnBhdGhbaV1dLCBjaGFuZ2UuaW5kZXgsIGNoYW5nZS5pdGVtKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnRCc6XG4gICAgICAgICAgZGVsZXRlIGl0W2NoYW5nZS5wYXRoW2ldXTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnRSc6XG4gICAgICAgIGNhc2UgJ04nOlxuICAgICAgICAgIGl0W2NoYW5nZS5wYXRoW2ldXSA9IGNoYW5nZS5yaHM7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHN3aXRjaCAoY2hhbmdlLmtpbmQpIHtcbiAgICAgICAgY2FzZSAnQSc6XG4gICAgICAgICAgYXBwbHlBcnJheUNoYW5nZShhcnJbaW5kZXhdLCBjaGFuZ2UuaW5kZXgsIGNoYW5nZS5pdGVtKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnRCc6XG4gICAgICAgICAgYXJyID0gYXJyYXlSZW1vdmUoYXJyLCBpbmRleCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ0UnOlxuICAgICAgICBjYXNlICdOJzpcbiAgICAgICAgICBhcnJbaW5kZXhdID0gY2hhbmdlLnJocztcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGFycjtcbiAgfVxuXG4gIGZ1bmN0aW9uIGFwcGx5Q2hhbmdlKHRhcmdldCwgc291cmNlLCBjaGFuZ2UpIHtcbiAgICBpZiAodGFyZ2V0ICYmIHNvdXJjZSAmJiBjaGFuZ2UgJiYgY2hhbmdlLmtpbmQpIHtcbiAgICAgIHZhciBpdCA9IHRhcmdldCxcbiAgICAgICAgICBpID0gLTEsXG4gICAgICAgICAgbGFzdCA9IGNoYW5nZS5wYXRoID8gY2hhbmdlLnBhdGgubGVuZ3RoIC0gMSA6IDA7XG4gICAgICB3aGlsZSAoKytpIDwgbGFzdCkge1xuICAgICAgICBpZiAodHlwZW9mIGl0W2NoYW5nZS5wYXRoW2ldXSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICBpdFtjaGFuZ2UucGF0aFtpXV0gPSAodHlwZW9mIGNoYW5nZS5wYXRoW2ldID09PSAnbnVtYmVyJykgPyBbXSA6IHt9O1xuICAgICAgICB9XG4gICAgICAgIGl0ID0gaXRbY2hhbmdlLnBhdGhbaV1dO1xuICAgICAgfVxuICAgICAgc3dpdGNoIChjaGFuZ2Uua2luZCkge1xuICAgICAgICBjYXNlICdBJzpcbiAgICAgICAgICBhcHBseUFycmF5Q2hhbmdlKGNoYW5nZS5wYXRoID8gaXRbY2hhbmdlLnBhdGhbaV1dIDogaXQsIGNoYW5nZS5pbmRleCwgY2hhbmdlLml0ZW0pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdEJzpcbiAgICAgICAgICBkZWxldGUgaXRbY2hhbmdlLnBhdGhbaV1dO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdFJzpcbiAgICAgICAgY2FzZSAnTic6XG4gICAgICAgICAgaXRbY2hhbmdlLnBhdGhbaV1dID0gY2hhbmdlLnJocztcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiByZXZlcnRBcnJheUNoYW5nZShhcnIsIGluZGV4LCBjaGFuZ2UpIHtcbiAgICBpZiAoY2hhbmdlLnBhdGggJiYgY2hhbmdlLnBhdGgubGVuZ3RoKSB7XG4gICAgICAvLyB0aGUgc3RydWN0dXJlIG9mIHRoZSBvYmplY3QgYXQgdGhlIGluZGV4IGhhcyBjaGFuZ2VkLi4uXG4gICAgICB2YXIgaXQgPSBhcnJbaW5kZXhdLFxuICAgICAgICAgIGksIHUgPSBjaGFuZ2UucGF0aC5sZW5ndGggLSAxO1xuICAgICAgZm9yIChpID0gMDsgaSA8IHU7IGkrKykge1xuICAgICAgICBpdCA9IGl0W2NoYW5nZS5wYXRoW2ldXTtcbiAgICAgIH1cbiAgICAgIHN3aXRjaCAoY2hhbmdlLmtpbmQpIHtcbiAgICAgICAgY2FzZSAnQSc6XG4gICAgICAgICAgcmV2ZXJ0QXJyYXlDaGFuZ2UoaXRbY2hhbmdlLnBhdGhbaV1dLCBjaGFuZ2UuaW5kZXgsIGNoYW5nZS5pdGVtKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnRCc6XG4gICAgICAgICAgaXRbY2hhbmdlLnBhdGhbaV1dID0gY2hhbmdlLmxocztcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnRSc6XG4gICAgICAgICAgaXRbY2hhbmdlLnBhdGhbaV1dID0gY2hhbmdlLmxocztcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnTic6XG4gICAgICAgICAgZGVsZXRlIGl0W2NoYW5nZS5wYXRoW2ldXTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gdGhlIGFycmF5IGl0ZW0gaXMgZGlmZmVyZW50Li4uXG4gICAgICBzd2l0Y2ggKGNoYW5nZS5raW5kKSB7XG4gICAgICAgIGNhc2UgJ0EnOlxuICAgICAgICAgIHJldmVydEFycmF5Q2hhbmdlKGFycltpbmRleF0sIGNoYW5nZS5pbmRleCwgY2hhbmdlLml0ZW0pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdEJzpcbiAgICAgICAgICBhcnJbaW5kZXhdID0gY2hhbmdlLmxocztcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnRSc6XG4gICAgICAgICAgYXJyW2luZGV4XSA9IGNoYW5nZS5saHM7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ04nOlxuICAgICAgICAgIGFyciA9IGFycmF5UmVtb3ZlKGFyciwgaW5kZXgpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gYXJyO1xuICB9XG5cbiAgZnVuY3Rpb24gcmV2ZXJ0Q2hhbmdlKHRhcmdldCwgc291cmNlLCBjaGFuZ2UpIHtcbiAgICBpZiAodGFyZ2V0ICYmIHNvdXJjZSAmJiBjaGFuZ2UgJiYgY2hhbmdlLmtpbmQpIHtcbiAgICAgIHZhciBpdCA9IHRhcmdldCxcbiAgICAgICAgICBpLCB1O1xuICAgICAgdSA9IGNoYW5nZS5wYXRoLmxlbmd0aCAtIDE7XG4gICAgICBmb3IgKGkgPSAwOyBpIDwgdTsgaSsrKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRbY2hhbmdlLnBhdGhbaV1dID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIGl0W2NoYW5nZS5wYXRoW2ldXSA9IHt9O1xuICAgICAgICB9XG4gICAgICAgIGl0ID0gaXRbY2hhbmdlLnBhdGhbaV1dO1xuICAgICAgfVxuICAgICAgc3dpdGNoIChjaGFuZ2Uua2luZCkge1xuICAgICAgICBjYXNlICdBJzpcbiAgICAgICAgICAvLyBBcnJheSB3YXMgbW9kaWZpZWQuLi5cbiAgICAgICAgICAvLyBpdCB3aWxsIGJlIGFuIGFycmF5Li4uXG4gICAgICAgICAgcmV2ZXJ0QXJyYXlDaGFuZ2UoaXRbY2hhbmdlLnBhdGhbaV1dLCBjaGFuZ2UuaW5kZXgsIGNoYW5nZS5pdGVtKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnRCc6XG4gICAgICAgICAgLy8gSXRlbSB3YXMgZGVsZXRlZC4uLlxuICAgICAgICAgIGl0W2NoYW5nZS5wYXRoW2ldXSA9IGNoYW5nZS5saHM7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ0UnOlxuICAgICAgICAgIC8vIEl0ZW0gd2FzIGVkaXRlZC4uLlxuICAgICAgICAgIGl0W2NoYW5nZS5wYXRoW2ldXSA9IGNoYW5nZS5saHM7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ04nOlxuICAgICAgICAgIC8vIEl0ZW0gaXMgbmV3Li4uXG4gICAgICAgICAgZGVsZXRlIGl0W2NoYW5nZS5wYXRoW2ldXTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBhcHBseURpZmYodGFyZ2V0LCBzb3VyY2UsIGZpbHRlcikge1xuICAgIGlmICh0YXJnZXQgJiYgc291cmNlKSB7XG4gICAgICB2YXIgb25DaGFuZ2UgPSBmdW5jdGlvbihjaGFuZ2UpIHtcbiAgICAgICAgaWYgKCFmaWx0ZXIgfHwgZmlsdGVyKHRhcmdldCwgc291cmNlLCBjaGFuZ2UpKSB7XG4gICAgICAgICAgYXBwbHlDaGFuZ2UodGFyZ2V0LCBzb3VyY2UsIGNoYW5nZSk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICBkZWVwRGlmZih0YXJnZXQsIHNvdXJjZSwgb25DaGFuZ2UpO1xuICAgIH1cbiAgfVxuXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKGFjY3VtdWxhdGVEaWZmLCB7XG5cbiAgICBkaWZmOiB7XG4gICAgICB2YWx1ZTogYWNjdW11bGF0ZURpZmYsXG4gICAgICBlbnVtZXJhYmxlOiB0cnVlXG4gICAgfSxcbiAgICBvYnNlcnZhYmxlRGlmZjoge1xuICAgICAgdmFsdWU6IGRlZXBEaWZmLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZVxuICAgIH0sXG4gICAgYXBwbHlEaWZmOiB7XG4gICAgICB2YWx1ZTogYXBwbHlEaWZmLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZVxuICAgIH0sXG4gICAgYXBwbHlDaGFuZ2U6IHtcbiAgICAgIHZhbHVlOiBhcHBseUNoYW5nZSxcbiAgICAgIGVudW1lcmFibGU6IHRydWVcbiAgICB9LFxuICAgIHJldmVydENoYW5nZToge1xuICAgICAgdmFsdWU6IHJldmVydENoYW5nZSxcbiAgICAgIGVudW1lcmFibGU6IHRydWVcbiAgICB9LFxuICAgIGlzQ29uZmxpY3Q6IHtcbiAgICAgIHZhbHVlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuICd1bmRlZmluZWQnICE9PSB0eXBlb2YgY29uZmxpY3Q7XG4gICAgICB9LFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZVxuICAgIH0sXG4gICAgbm9Db25mbGljdDoge1xuICAgICAgdmFsdWU6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoY29uZmxpY3RSZXNvbHV0aW9uKSB7XG4gICAgICAgICAgY29uZmxpY3RSZXNvbHV0aW9uLmZvckVhY2goZnVuY3Rpb24oaXQpIHtcbiAgICAgICAgICAgIGl0KCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgY29uZmxpY3RSZXNvbHV0aW9uID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYWNjdW11bGF0ZURpZmY7XG4gICAgICB9LFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZVxuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIGFjY3VtdWxhdGVEaWZmO1xufSkpO1xuIiwidmFyIG92ZXJBcmcgPSByZXF1aXJlKCcuL19vdmVyQXJnJyk7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIGdldFByb3RvdHlwZSA9IG92ZXJBcmcoT2JqZWN0LmdldFByb3RvdHlwZU9mLCBPYmplY3QpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGdldFByb3RvdHlwZTtcbiIsIi8qKlxuICogQ3JlYXRlcyBhIHVuYXJ5IGZ1bmN0aW9uIHRoYXQgaW52b2tlcyBgZnVuY2Agd2l0aCBpdHMgYXJndW1lbnQgdHJhbnNmb3JtZWQuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZ1bmMgVGhlIGZ1bmN0aW9uIHRvIHdyYXAuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSB0cmFuc2Zvcm0gVGhlIGFyZ3VtZW50IHRyYW5zZm9ybS5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBvdmVyQXJnKGZ1bmMsIHRyYW5zZm9ybSkge1xuICByZXR1cm4gZnVuY3Rpb24oYXJnKSB7XG4gICAgcmV0dXJuIGZ1bmModHJhbnNmb3JtKGFyZykpO1xuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG92ZXJBcmc7XG4iLCIvKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLiBBIHZhbHVlIGlzIG9iamVjdC1saWtlIGlmIGl0J3Mgbm90IGBudWxsYFxuICogYW5kIGhhcyBhIGB0eXBlb2ZgIHJlc3VsdCBvZiBcIm9iamVjdFwiLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKF8ubm9vcCk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKG51bGwpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3RMaWtlKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSAhPSBudWxsICYmIHR5cGVvZiB2YWx1ZSA9PSAnb2JqZWN0Jztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc09iamVjdExpa2U7XG4iLCJ2YXIgZ2V0UHJvdG90eXBlID0gcmVxdWlyZSgnLi9fZ2V0UHJvdG90eXBlJyksXG4gICAgaXNPYmplY3RMaWtlID0gcmVxdWlyZSgnLi9pc09iamVjdExpa2UnKTtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFRhZyA9ICdbb2JqZWN0IE9iamVjdF0nO1xuXG4vKiogVXNlZCBmb3IgYnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMuICovXG52YXIgZnVuY1Byb3RvID0gRnVuY3Rpb24ucHJvdG90eXBlLFxuICAgIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gcmVzb2x2ZSB0aGUgZGVjb21waWxlZCBzb3VyY2Ugb2YgZnVuY3Rpb25zLiAqL1xudmFyIGZ1bmNUb1N0cmluZyA9IGZ1bmNQcm90by50b1N0cmluZztcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqIFVzZWQgdG8gaW5mZXIgdGhlIGBPYmplY3RgIGNvbnN0cnVjdG9yLiAqL1xudmFyIG9iamVjdEN0b3JTdHJpbmcgPSBmdW5jVG9TdHJpbmcuY2FsbChPYmplY3QpO1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGVcbiAqIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgb2JqZWN0VG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIHBsYWluIG9iamVjdCwgdGhhdCBpcywgYW4gb2JqZWN0IGNyZWF0ZWQgYnkgdGhlXG4gKiBgT2JqZWN0YCBjb25zdHJ1Y3RvciBvciBvbmUgd2l0aCBhIGBbW1Byb3RvdHlwZV1dYCBvZiBgbnVsbGAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjguMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBwbGFpbiBvYmplY3QsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogZnVuY3Rpb24gRm9vKCkge1xuICogICB0aGlzLmEgPSAxO1xuICogfVxuICpcbiAqIF8uaXNQbGFpbk9iamVjdChuZXcgRm9vKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc1BsYWluT2JqZWN0KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNQbGFpbk9iamVjdCh7ICd4JzogMCwgJ3knOiAwIH0pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNQbGFpbk9iamVjdChPYmplY3QuY3JlYXRlKG51bGwpKTtcbiAqIC8vID0+IHRydWVcbiAqL1xuZnVuY3Rpb24gaXNQbGFpbk9iamVjdCh2YWx1ZSkge1xuICBpZiAoIWlzT2JqZWN0TGlrZSh2YWx1ZSkgfHwgb2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSkgIT0gb2JqZWN0VGFnKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHZhciBwcm90byA9IGdldFByb3RvdHlwZSh2YWx1ZSk7XG4gIGlmIChwcm90byA9PT0gbnVsbCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHZhciBDdG9yID0gaGFzT3duUHJvcGVydHkuY2FsbChwcm90bywgJ2NvbnN0cnVjdG9yJykgJiYgcHJvdG8uY29uc3RydWN0b3I7XG4gIHJldHVybiAodHlwZW9mIEN0b3IgPT0gJ2Z1bmN0aW9uJyAmJlxuICAgIEN0b3IgaW5zdGFuY2VvZiBDdG9yICYmIGZ1bmNUb1N0cmluZy5jYWxsKEN0b3IpID09IG9iamVjdEN0b3JTdHJpbmcpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlzUGxhaW5PYmplY3Q7XG4iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfdHlwZW9mID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIgPyBmdW5jdGlvbiAob2JqKSB7IHJldHVybiB0eXBlb2Ygb2JqOyB9IDogZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gb2JqICYmIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiBvYmouY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBvYmogIT09IFN5bWJvbC5wcm90b3R5cGUgPyBcInN5bWJvbFwiIDogdHlwZW9mIG9iajsgfTtcblxuZXhwb3J0cy5wcmludEJ1ZmZlciA9IHByaW50QnVmZmVyO1xuXG52YXIgX2hlbHBlcnMgPSByZXF1aXJlKCcuL2hlbHBlcnMnKTtcblxudmFyIF9kaWZmID0gcmVxdWlyZSgnLi9kaWZmJyk7XG5cbnZhciBfZGlmZjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9kaWZmKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gX3RvQ29uc3VtYWJsZUFycmF5KGFycikgeyBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSB7IGZvciAodmFyIGkgPSAwLCBhcnIyID0gQXJyYXkoYXJyLmxlbmd0aCk7IGkgPCBhcnIubGVuZ3RoOyBpKyspIHsgYXJyMltpXSA9IGFycltpXTsgfSByZXR1cm4gYXJyMjsgfSBlbHNlIHsgcmV0dXJuIEFycmF5LmZyb20oYXJyKTsgfSB9XG5cbi8qKlxuICogR2V0IGxvZyBsZXZlbCBzdHJpbmcgYmFzZWQgb24gc3VwcGxpZWQgcGFyYW1zXG4gKlxuICogQHBhcmFtIHtzdHJpbmcgfCBmdW5jdGlvbiB8IG9iamVjdH0gbGV2ZWwgLSBjb25zb2xlW2xldmVsXVxuICogQHBhcmFtIHtvYmplY3R9IGFjdGlvbiAtIHNlbGVjdGVkIGFjdGlvblxuICogQHBhcmFtIHthcnJheX0gcGF5bG9hZCAtIHNlbGVjdGVkIHBheWxvYWRcbiAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlIC0gbG9nIGVudHJ5IHR5cGVcbiAqXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBsZXZlbFxuICovXG5mdW5jdGlvbiBnZXRMb2dMZXZlbChsZXZlbCwgYWN0aW9uLCBwYXlsb2FkLCB0eXBlKSB7XG4gIHN3aXRjaCAodHlwZW9mIGxldmVsID09PSAndW5kZWZpbmVkJyA/ICd1bmRlZmluZWQnIDogX3R5cGVvZihsZXZlbCkpIHtcbiAgICBjYXNlICdvYmplY3QnOlxuICAgICAgcmV0dXJuIHR5cGVvZiBsZXZlbFt0eXBlXSA9PT0gJ2Z1bmN0aW9uJyA/IGxldmVsW3R5cGVdLmFwcGx5KGxldmVsLCBfdG9Db25zdW1hYmxlQXJyYXkocGF5bG9hZCkpIDogbGV2ZWxbdHlwZV07XG4gICAgY2FzZSAnZnVuY3Rpb24nOlxuICAgICAgcmV0dXJuIGxldmVsKGFjdGlvbik7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBsZXZlbDtcbiAgfVxufVxuXG5mdW5jdGlvbiBkZWZhdWx0VGl0bGVGb3JtYXR0ZXIob3B0aW9ucykge1xuICB2YXIgdGltZXN0YW1wID0gb3B0aW9ucy50aW1lc3RhbXAsXG4gICAgICBkdXJhdGlvbiA9IG9wdGlvbnMuZHVyYXRpb247XG5cblxuICByZXR1cm4gZnVuY3Rpb24gKGFjdGlvbiwgdGltZSwgdG9vaykge1xuICAgIHZhciBwYXJ0cyA9IFsnYWN0aW9uJ107XG5cbiAgICBwYXJ0cy5wdXNoKCclYycgKyBTdHJpbmcoYWN0aW9uLnR5cGUpKTtcbiAgICBpZiAodGltZXN0YW1wKSBwYXJ0cy5wdXNoKCclY0AgJyArIHRpbWUpO1xuICAgIGlmIChkdXJhdGlvbikgcGFydHMucHVzaCgnJWMoaW4gJyArIHRvb2sudG9GaXhlZCgyKSArICcgbXMpJyk7XG5cbiAgICByZXR1cm4gcGFydHMuam9pbignICcpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBwcmludEJ1ZmZlcihidWZmZXIsIG9wdGlvbnMpIHtcbiAgdmFyIGxvZ2dlciA9IG9wdGlvbnMubG9nZ2VyLFxuICAgICAgYWN0aW9uVHJhbnNmb3JtZXIgPSBvcHRpb25zLmFjdGlvblRyYW5zZm9ybWVyLFxuICAgICAgX29wdGlvbnMkdGl0bGVGb3JtYXR0ID0gb3B0aW9ucy50aXRsZUZvcm1hdHRlcixcbiAgICAgIHRpdGxlRm9ybWF0dGVyID0gX29wdGlvbnMkdGl0bGVGb3JtYXR0ID09PSB1bmRlZmluZWQgPyBkZWZhdWx0VGl0bGVGb3JtYXR0ZXIob3B0aW9ucykgOiBfb3B0aW9ucyR0aXRsZUZvcm1hdHQsXG4gICAgICBjb2xsYXBzZWQgPSBvcHRpb25zLmNvbGxhcHNlZCxcbiAgICAgIGNvbG9ycyA9IG9wdGlvbnMuY29sb3JzLFxuICAgICAgbGV2ZWwgPSBvcHRpb25zLmxldmVsLFxuICAgICAgZGlmZiA9IG9wdGlvbnMuZGlmZjtcblxuXG4gIGJ1ZmZlci5mb3JFYWNoKGZ1bmN0aW9uIChsb2dFbnRyeSwga2V5KSB7XG4gICAgdmFyIHN0YXJ0ZWQgPSBsb2dFbnRyeS5zdGFydGVkLFxuICAgICAgICBzdGFydGVkVGltZSA9IGxvZ0VudHJ5LnN0YXJ0ZWRUaW1lLFxuICAgICAgICBhY3Rpb24gPSBsb2dFbnRyeS5hY3Rpb24sXG4gICAgICAgIHByZXZTdGF0ZSA9IGxvZ0VudHJ5LnByZXZTdGF0ZSxcbiAgICAgICAgZXJyb3IgPSBsb2dFbnRyeS5lcnJvcjtcbiAgICB2YXIgdG9vayA9IGxvZ0VudHJ5LnRvb2ssXG4gICAgICAgIG5leHRTdGF0ZSA9IGxvZ0VudHJ5Lm5leHRTdGF0ZTtcblxuICAgIHZhciBuZXh0RW50cnkgPSBidWZmZXJba2V5ICsgMV07XG5cbiAgICBpZiAobmV4dEVudHJ5KSB7XG4gICAgICBuZXh0U3RhdGUgPSBuZXh0RW50cnkucHJldlN0YXRlO1xuICAgICAgdG9vayA9IG5leHRFbnRyeS5zdGFydGVkIC0gc3RhcnRlZDtcbiAgICB9XG5cbiAgICAvLyBNZXNzYWdlXG4gICAgdmFyIGZvcm1hdHRlZEFjdGlvbiA9IGFjdGlvblRyYW5zZm9ybWVyKGFjdGlvbik7XG4gICAgdmFyIGlzQ29sbGFwc2VkID0gdHlwZW9mIGNvbGxhcHNlZCA9PT0gJ2Z1bmN0aW9uJyA/IGNvbGxhcHNlZChmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gbmV4dFN0YXRlO1xuICAgIH0sIGFjdGlvbiwgbG9nRW50cnkpIDogY29sbGFwc2VkO1xuXG4gICAgdmFyIGZvcm1hdHRlZFRpbWUgPSAoMCwgX2hlbHBlcnMuZm9ybWF0VGltZSkoc3RhcnRlZFRpbWUpO1xuICAgIHZhciB0aXRsZUNTUyA9IGNvbG9ycy50aXRsZSA/ICdjb2xvcjogJyArIGNvbG9ycy50aXRsZShmb3JtYXR0ZWRBY3Rpb24pICsgJzsnIDogJyc7XG4gICAgdmFyIGhlYWRlckNTUyA9IFsnY29sb3I6IGdyYXk7IGZvbnQtd2VpZ2h0OiBsaWdodGVyOyddO1xuICAgIGhlYWRlckNTUy5wdXNoKHRpdGxlQ1NTKTtcbiAgICBpZiAob3B0aW9ucy50aW1lc3RhbXApIGhlYWRlckNTUy5wdXNoKCdjb2xvcjogZ3JheTsgZm9udC13ZWlnaHQ6IGxpZ2h0ZXI7Jyk7XG4gICAgaWYgKG9wdGlvbnMuZHVyYXRpb24pIGhlYWRlckNTUy5wdXNoKCdjb2xvcjogZ3JheTsgZm9udC13ZWlnaHQ6IGxpZ2h0ZXI7Jyk7XG4gICAgdmFyIHRpdGxlID0gdGl0bGVGb3JtYXR0ZXIoZm9ybWF0dGVkQWN0aW9uLCBmb3JtYXR0ZWRUaW1lLCB0b29rKTtcblxuICAgIC8vIFJlbmRlclxuICAgIHRyeSB7XG4gICAgICBpZiAoaXNDb2xsYXBzZWQpIHtcbiAgICAgICAgaWYgKGNvbG9ycy50aXRsZSkgbG9nZ2VyLmdyb3VwQ29sbGFwc2VkLmFwcGx5KGxvZ2dlciwgWyclYyAnICsgdGl0bGVdLmNvbmNhdChoZWFkZXJDU1MpKTtlbHNlIGxvZ2dlci5ncm91cENvbGxhcHNlZCh0aXRsZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoY29sb3JzLnRpdGxlKSBsb2dnZXIuZ3JvdXAuYXBwbHkobG9nZ2VyLCBbJyVjICcgKyB0aXRsZV0uY29uY2F0KGhlYWRlckNTUykpO2Vsc2UgbG9nZ2VyLmdyb3VwKHRpdGxlKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBsb2dnZXIubG9nKHRpdGxlKTtcbiAgICB9XG5cbiAgICB2YXIgcHJldlN0YXRlTGV2ZWwgPSBnZXRMb2dMZXZlbChsZXZlbCwgZm9ybWF0dGVkQWN0aW9uLCBbcHJldlN0YXRlXSwgJ3ByZXZTdGF0ZScpO1xuICAgIHZhciBhY3Rpb25MZXZlbCA9IGdldExvZ0xldmVsKGxldmVsLCBmb3JtYXR0ZWRBY3Rpb24sIFtmb3JtYXR0ZWRBY3Rpb25dLCAnYWN0aW9uJyk7XG4gICAgdmFyIGVycm9yTGV2ZWwgPSBnZXRMb2dMZXZlbChsZXZlbCwgZm9ybWF0dGVkQWN0aW9uLCBbZXJyb3IsIHByZXZTdGF0ZV0sICdlcnJvcicpO1xuICAgIHZhciBuZXh0U3RhdGVMZXZlbCA9IGdldExvZ0xldmVsKGxldmVsLCBmb3JtYXR0ZWRBY3Rpb24sIFtuZXh0U3RhdGVdLCAnbmV4dFN0YXRlJyk7XG5cbiAgICBpZiAocHJldlN0YXRlTGV2ZWwpIHtcbiAgICAgIGlmIChjb2xvcnMucHJldlN0YXRlKSBsb2dnZXJbcHJldlN0YXRlTGV2ZWxdKCclYyBwcmV2IHN0YXRlJywgJ2NvbG9yOiAnICsgY29sb3JzLnByZXZTdGF0ZShwcmV2U3RhdGUpICsgJzsgZm9udC13ZWlnaHQ6IGJvbGQnLCBwcmV2U3RhdGUpO2Vsc2UgbG9nZ2VyW3ByZXZTdGF0ZUxldmVsXSgncHJldiBzdGF0ZScsIHByZXZTdGF0ZSk7XG4gICAgfVxuXG4gICAgaWYgKGFjdGlvbkxldmVsKSB7XG4gICAgICBpZiAoY29sb3JzLmFjdGlvbikgbG9nZ2VyW2FjdGlvbkxldmVsXSgnJWMgYWN0aW9uICAgICcsICdjb2xvcjogJyArIGNvbG9ycy5hY3Rpb24oZm9ybWF0dGVkQWN0aW9uKSArICc7IGZvbnQtd2VpZ2h0OiBib2xkJywgZm9ybWF0dGVkQWN0aW9uKTtlbHNlIGxvZ2dlclthY3Rpb25MZXZlbF0oJ2FjdGlvbiAgICAnLCBmb3JtYXR0ZWRBY3Rpb24pO1xuICAgIH1cblxuICAgIGlmIChlcnJvciAmJiBlcnJvckxldmVsKSB7XG4gICAgICBpZiAoY29sb3JzLmVycm9yKSBsb2dnZXJbZXJyb3JMZXZlbF0oJyVjIGVycm9yICAgICAnLCAnY29sb3I6ICcgKyBjb2xvcnMuZXJyb3IoZXJyb3IsIHByZXZTdGF0ZSkgKyAnOyBmb250LXdlaWdodDogYm9sZDsnLCBlcnJvcik7ZWxzZSBsb2dnZXJbZXJyb3JMZXZlbF0oJ2Vycm9yICAgICAnLCBlcnJvcik7XG4gICAgfVxuXG4gICAgaWYgKG5leHRTdGF0ZUxldmVsKSB7XG4gICAgICBpZiAoY29sb3JzLm5leHRTdGF0ZSkgbG9nZ2VyW25leHRTdGF0ZUxldmVsXSgnJWMgbmV4dCBzdGF0ZScsICdjb2xvcjogJyArIGNvbG9ycy5uZXh0U3RhdGUobmV4dFN0YXRlKSArICc7IGZvbnQtd2VpZ2h0OiBib2xkJywgbmV4dFN0YXRlKTtlbHNlIGxvZ2dlcltuZXh0U3RhdGVMZXZlbF0oJ25leHQgc3RhdGUnLCBuZXh0U3RhdGUpO1xuICAgIH1cblxuICAgIGlmIChkaWZmKSB7XG4gICAgICAoMCwgX2RpZmYyLmRlZmF1bHQpKHByZXZTdGF0ZSwgbmV4dFN0YXRlLCBsb2dnZXIsIGlzQ29sbGFwc2VkKTtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgbG9nZ2VyLmdyb3VwRW5kKCk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgbG9nZ2VyLmxvZygnXFx1MjAxNFxcdTIwMTQgbG9nIGVuZCBcXHUyMDE0XFx1MjAxNCcpO1xuICAgIH1cbiAgfSk7XG59IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmRlZmF1bHQgPSB7XG4gIGxldmVsOiBcImxvZ1wiLFxuICBsb2dnZXI6IGNvbnNvbGUsXG4gIGxvZ0Vycm9yczogdHJ1ZSxcbiAgY29sbGFwc2VkOiB1bmRlZmluZWQsXG4gIHByZWRpY2F0ZTogdW5kZWZpbmVkLFxuICBkdXJhdGlvbjogZmFsc2UsXG4gIHRpbWVzdGFtcDogdHJ1ZSxcbiAgc3RhdGVUcmFuc2Zvcm1lcjogZnVuY3Rpb24gc3RhdGVUcmFuc2Zvcm1lcihzdGF0ZSkge1xuICAgIHJldHVybiBzdGF0ZTtcbiAgfSxcbiAgYWN0aW9uVHJhbnNmb3JtZXI6IGZ1bmN0aW9uIGFjdGlvblRyYW5zZm9ybWVyKGFjdGlvbikge1xuICAgIHJldHVybiBhY3Rpb247XG4gIH0sXG4gIGVycm9yVHJhbnNmb3JtZXI6IGZ1bmN0aW9uIGVycm9yVHJhbnNmb3JtZXIoZXJyb3IpIHtcbiAgICByZXR1cm4gZXJyb3I7XG4gIH0sXG4gIGNvbG9yczoge1xuICAgIHRpdGxlOiBmdW5jdGlvbiB0aXRsZSgpIHtcbiAgICAgIHJldHVybiBcImluaGVyaXRcIjtcbiAgICB9LFxuICAgIHByZXZTdGF0ZTogZnVuY3Rpb24gcHJldlN0YXRlKCkge1xuICAgICAgcmV0dXJuIFwiIzlFOUU5RVwiO1xuICAgIH0sXG4gICAgYWN0aW9uOiBmdW5jdGlvbiBhY3Rpb24oKSB7XG4gICAgICByZXR1cm4gXCIjMDNBOUY0XCI7XG4gICAgfSxcbiAgICBuZXh0U3RhdGU6IGZ1bmN0aW9uIG5leHRTdGF0ZSgpIHtcbiAgICAgIHJldHVybiBcIiM0Q0FGNTBcIjtcbiAgICB9LFxuICAgIGVycm9yOiBmdW5jdGlvbiBlcnJvcigpIHtcbiAgICAgIHJldHVybiBcIiNGMjA0MDRcIjtcbiAgICB9XG4gIH0sXG4gIGRpZmY6IGZhbHNlLFxuICBkaWZmUHJlZGljYXRlOiB1bmRlZmluZWQsXG5cbiAgLy8gRGVwcmVjYXRlZCBvcHRpb25zXG4gIHRyYW5zZm9ybWVyOiB1bmRlZmluZWRcbn07XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbXCJkZWZhdWx0XCJdOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbmV4cG9ydHMuZGVmYXVsdCA9IGRpZmZMb2dnZXI7XG5cbnZhciBfZGVlcERpZmYgPSByZXF1aXJlKCdkZWVwLWRpZmYnKTtcblxudmFyIF9kZWVwRGlmZjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9kZWVwRGlmZik7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbmZ1bmN0aW9uIF90b0NvbnN1bWFibGVBcnJheShhcnIpIHsgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgeyBmb3IgKHZhciBpID0gMCwgYXJyMiA9IEFycmF5KGFyci5sZW5ndGgpOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSB7IGFycjJbaV0gPSBhcnJbaV07IH0gcmV0dXJuIGFycjI7IH0gZWxzZSB7IHJldHVybiBBcnJheS5mcm9tKGFycik7IH0gfVxuXG4vLyBodHRwczovL2dpdGh1Yi5jb20vZmxpdGJpdC9kaWZmI2RpZmZlcmVuY2VzXG52YXIgZGljdGlvbmFyeSA9IHtcbiAgJ0UnOiB7XG4gICAgY29sb3I6ICcjMjE5NkYzJyxcbiAgICB0ZXh0OiAnQ0hBTkdFRDonXG4gIH0sXG4gICdOJzoge1xuICAgIGNvbG9yOiAnIzRDQUY1MCcsXG4gICAgdGV4dDogJ0FEREVEOidcbiAgfSxcbiAgJ0QnOiB7XG4gICAgY29sb3I6ICcjRjQ0MzM2JyxcbiAgICB0ZXh0OiAnREVMRVRFRDonXG4gIH0sXG4gICdBJzoge1xuICAgIGNvbG9yOiAnIzIxOTZGMycsXG4gICAgdGV4dDogJ0FSUkFZOidcbiAgfVxufTtcblxuZnVuY3Rpb24gc3R5bGUoa2luZCkge1xuICByZXR1cm4gJ2NvbG9yOiAnICsgZGljdGlvbmFyeVtraW5kXS5jb2xvciArICc7IGZvbnQtd2VpZ2h0OiBib2xkJztcbn1cblxuZnVuY3Rpb24gcmVuZGVyKGRpZmYpIHtcbiAgdmFyIGtpbmQgPSBkaWZmLmtpbmQsXG4gICAgICBwYXRoID0gZGlmZi5wYXRoLFxuICAgICAgbGhzID0gZGlmZi5saHMsXG4gICAgICByaHMgPSBkaWZmLnJocyxcbiAgICAgIGluZGV4ID0gZGlmZi5pbmRleCxcbiAgICAgIGl0ZW0gPSBkaWZmLml0ZW07XG5cblxuICBzd2l0Y2ggKGtpbmQpIHtcbiAgICBjYXNlICdFJzpcbiAgICAgIHJldHVybiBbcGF0aC5qb2luKCcuJyksIGxocywgJ1xcdTIxOTInLCByaHNdO1xuICAgIGNhc2UgJ04nOlxuICAgICAgcmV0dXJuIFtwYXRoLmpvaW4oJy4nKSwgcmhzXTtcbiAgICBjYXNlICdEJzpcbiAgICAgIHJldHVybiBbcGF0aC5qb2luKCcuJyldO1xuICAgIGNhc2UgJ0EnOlxuICAgICAgcmV0dXJuIFtwYXRoLmpvaW4oJy4nKSArICdbJyArIGluZGV4ICsgJ10nLCBpdGVtXTtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIFtdO1xuICB9XG59XG5cbmZ1bmN0aW9uIGRpZmZMb2dnZXIocHJldlN0YXRlLCBuZXdTdGF0ZSwgbG9nZ2VyLCBpc0NvbGxhcHNlZCkge1xuICB2YXIgZGlmZiA9ICgwLCBfZGVlcERpZmYyLmRlZmF1bHQpKHByZXZTdGF0ZSwgbmV3U3RhdGUpO1xuXG4gIHRyeSB7XG4gICAgaWYgKGlzQ29sbGFwc2VkKSB7XG4gICAgICBsb2dnZXIuZ3JvdXBDb2xsYXBzZWQoJ2RpZmYnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbG9nZ2VyLmdyb3VwKCdkaWZmJyk7XG4gICAgfVxuICB9IGNhdGNoIChlKSB7XG4gICAgbG9nZ2VyLmxvZygnZGlmZicpO1xuICB9XG5cbiAgaWYgKGRpZmYpIHtcbiAgICBkaWZmLmZvckVhY2goZnVuY3Rpb24gKGVsZW0pIHtcbiAgICAgIHZhciBraW5kID0gZWxlbS5raW5kO1xuXG4gICAgICB2YXIgb3V0cHV0ID0gcmVuZGVyKGVsZW0pO1xuXG4gICAgICBsb2dnZXIubG9nLmFwcGx5KGxvZ2dlciwgWyclYyAnICsgZGljdGlvbmFyeVtraW5kXS50ZXh0LCBzdHlsZShraW5kKV0uY29uY2F0KF90b0NvbnN1bWFibGVBcnJheShvdXRwdXQpKSk7XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgbG9nZ2VyLmxvZygnXFx1MjAxNFxcdTIwMTQgbm8gZGlmZiBcXHUyMDE0XFx1MjAxNCcpO1xuICB9XG5cbiAgdHJ5IHtcbiAgICBsb2dnZXIuZ3JvdXBFbmQoKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGxvZ2dlci5sb2coJ1xcdTIwMTRcXHUyMDE0IGRpZmYgZW5kIFxcdTIwMTRcXHUyMDE0ICcpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IGV4cG9ydHNbJ2RlZmF1bHQnXTsiLCJcInVzZSBzdHJpY3RcIjtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcbnZhciByZXBlYXQgPSBleHBvcnRzLnJlcGVhdCA9IGZ1bmN0aW9uIHJlcGVhdChzdHIsIHRpbWVzKSB7XG4gIHJldHVybiBuZXcgQXJyYXkodGltZXMgKyAxKS5qb2luKHN0cik7XG59O1xuXG52YXIgcGFkID0gZXhwb3J0cy5wYWQgPSBmdW5jdGlvbiBwYWQobnVtLCBtYXhMZW5ndGgpIHtcbiAgcmV0dXJuIHJlcGVhdChcIjBcIiwgbWF4TGVuZ3RoIC0gbnVtLnRvU3RyaW5nKCkubGVuZ3RoKSArIG51bTtcbn07XG5cbnZhciBmb3JtYXRUaW1lID0gZXhwb3J0cy5mb3JtYXRUaW1lID0gZnVuY3Rpb24gZm9ybWF0VGltZSh0aW1lKSB7XG4gIHJldHVybiBwYWQodGltZS5nZXRIb3VycygpLCAyKSArIFwiOlwiICsgcGFkKHRpbWUuZ2V0TWludXRlcygpLCAyKSArIFwiOlwiICsgcGFkKHRpbWUuZ2V0U2Vjb25kcygpLCAyKSArIFwiLlwiICsgcGFkKHRpbWUuZ2V0TWlsbGlzZWNvbmRzKCksIDMpO1xufTtcblxuLy8gVXNlIHBlcmZvcm1hbmNlIEFQSSBpZiBpdCdzIGF2YWlsYWJsZSBpbiBvcmRlciB0byBnZXQgYmV0dGVyIHByZWNpc2lvblxudmFyIHRpbWVyID0gZXhwb3J0cy50aW1lciA9IHR5cGVvZiBwZXJmb3JtYW5jZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBwZXJmb3JtYW5jZSAhPT0gbnVsbCAmJiB0eXBlb2YgcGVyZm9ybWFuY2Uubm93ID09PSBcImZ1bmN0aW9uXCIgPyBwZXJmb3JtYW5jZSA6IERhdGU7IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0cy5sb2dnZXIgPSBleHBvcnRzLmNyZWF0ZUxvZ2dlciA9IGV4cG9ydHMuZGVmYXVsdHMgPSB1bmRlZmluZWQ7XG5cbnZhciBfZXh0ZW5kcyA9IE9iamVjdC5hc3NpZ24gfHwgZnVuY3Rpb24gKHRhcmdldCkgeyBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykgeyB2YXIgc291cmNlID0gYXJndW1lbnRzW2ldOyBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7IGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc291cmNlLCBrZXkpKSB7IHRhcmdldFtrZXldID0gc291cmNlW2tleV07IH0gfSB9IHJldHVybiB0YXJnZXQ7IH07XG5cbnZhciBfY29yZSA9IHJlcXVpcmUoJy4vY29yZScpO1xuXG52YXIgX2hlbHBlcnMgPSByZXF1aXJlKCcuL2hlbHBlcnMnKTtcblxudmFyIF9kZWZhdWx0cyA9IHJlcXVpcmUoJy4vZGVmYXVsdHMnKTtcblxudmFyIF9kZWZhdWx0czIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9kZWZhdWx0cyk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7IGRlZmF1bHQ6IG9iaiB9OyB9XG5cbi8qKlxuICogQ3JlYXRlcyBsb2dnZXIgd2l0aCBmb2xsb3dpbmcgb3B0aW9uc1xuICpcbiAqIEBuYW1lc3BhY2VcbiAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zIC0gb3B0aW9ucyBmb3IgbG9nZ2VyXG4gKiBAcGFyYW0ge3N0cmluZyB8IGZ1bmN0aW9uIHwgb2JqZWN0fSBvcHRpb25zLmxldmVsIC0gY29uc29sZVtsZXZlbF1cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5kdXJhdGlvbiAtIHByaW50IGR1cmF0aW9uIG9mIGVhY2ggYWN0aW9uP1xuICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnRpbWVzdGFtcCAtIHByaW50IHRpbWVzdGFtcCB3aXRoIGVhY2ggYWN0aW9uP1xuICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMuY29sb3JzIC0gY3VzdG9tIGNvbG9yc1xuICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMubG9nZ2VyIC0gaW1wbGVtZW50YXRpb24gb2YgdGhlIGBjb25zb2xlYCBBUElcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5sb2dFcnJvcnMgLSBzaG91bGQgZXJyb3JzIGluIGFjdGlvbiBleGVjdXRpb24gYmUgY2F1Z2h0LCBsb2dnZWQsIGFuZCByZS10aHJvd24/XG4gKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMuY29sbGFwc2VkIC0gaXMgZ3JvdXAgY29sbGFwc2VkP1xuICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnByZWRpY2F0ZSAtIGNvbmRpdGlvbiB3aGljaCByZXNvbHZlcyBsb2dnZXIgYmVoYXZpb3JcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IG9wdGlvbnMuc3RhdGVUcmFuc2Zvcm1lciAtIHRyYW5zZm9ybSBzdGF0ZSBiZWZvcmUgcHJpbnRcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IG9wdGlvbnMuYWN0aW9uVHJhbnNmb3JtZXIgLSB0cmFuc2Zvcm0gYWN0aW9uIGJlZm9yZSBwcmludFxuICogQHBhcmFtIHtmdW5jdGlvbn0gb3B0aW9ucy5lcnJvclRyYW5zZm9ybWVyIC0gdHJhbnNmb3JtIGVycm9yIGJlZm9yZSBwcmludFxuICpcbiAqIEByZXR1cm5zIHtmdW5jdGlvbn0gbG9nZ2VyIG1pZGRsZXdhcmVcbiAqL1xuZnVuY3Rpb24gY3JlYXRlTG9nZ2VyKCkge1xuICB2YXIgb3B0aW9ucyA9IGFyZ3VtZW50cy5sZW5ndGggPiAwICYmIGFyZ3VtZW50c1swXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzBdIDoge307XG5cbiAgdmFyIGxvZ2dlck9wdGlvbnMgPSBfZXh0ZW5kcyh7fSwgX2RlZmF1bHRzMi5kZWZhdWx0LCBvcHRpb25zKTtcblxuICB2YXIgbG9nZ2VyID0gbG9nZ2VyT3B0aW9ucy5sb2dnZXIsXG4gICAgICBzdGF0ZVRyYW5zZm9ybWVyID0gbG9nZ2VyT3B0aW9ucy5zdGF0ZVRyYW5zZm9ybWVyLFxuICAgICAgZXJyb3JUcmFuc2Zvcm1lciA9IGxvZ2dlck9wdGlvbnMuZXJyb3JUcmFuc2Zvcm1lcixcbiAgICAgIHByZWRpY2F0ZSA9IGxvZ2dlck9wdGlvbnMucHJlZGljYXRlLFxuICAgICAgbG9nRXJyb3JzID0gbG9nZ2VyT3B0aW9ucy5sb2dFcnJvcnMsXG4gICAgICBkaWZmUHJlZGljYXRlID0gbG9nZ2VyT3B0aW9ucy5kaWZmUHJlZGljYXRlO1xuXG4gIC8vIFJldHVybiBpZiAnY29uc29sZScgb2JqZWN0IGlzIG5vdCBkZWZpbmVkXG5cbiAgaWYgKHR5cGVvZiBsb2dnZXIgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiAobmV4dCkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGFjdGlvbikge1xuICAgICAgICAgIHJldHVybiBuZXh0KGFjdGlvbik7XG4gICAgICAgIH07XG4gICAgICB9O1xuICAgIH07XG4gIH1cblxuICAvLyBEZXRlY3QgaWYgJ2NyZWF0ZUxvZ2dlcicgd2FzIHBhc3NlZCBkaXJlY3RseSB0byAnYXBwbHlNaWRkbGV3YXJlJy5cbiAgaWYgKG9wdGlvbnMuZ2V0U3RhdGUgJiYgb3B0aW9ucy5kaXNwYXRjaCkge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgY29uc29sZS5lcnJvcignW3JlZHV4LWxvZ2dlcl0gcmVkdXgtbG9nZ2VyIG5vdCBpbnN0YWxsZWQuIE1ha2Ugc3VyZSB0byBwYXNzIGxvZ2dlciBpbnN0YW5jZSBhcyBtaWRkbGV3YXJlOlxcbi8vIExvZ2dlciB3aXRoIGRlZmF1bHQgb3B0aW9uc1xcbmltcG9ydCB7IGxvZ2dlciB9IGZyb20gXFwncmVkdXgtbG9nZ2VyXFwnXFxuY29uc3Qgc3RvcmUgPSBjcmVhdGVTdG9yZShcXG4gIHJlZHVjZXIsXFxuICBhcHBseU1pZGRsZXdhcmUobG9nZ2VyKVxcbilcXG4vLyBPciB5b3UgY2FuIGNyZWF0ZSB5b3VyIG93biBsb2dnZXIgd2l0aCBjdXN0b20gb3B0aW9ucyBodHRwOi8vYml0Lmx5L3JlZHV4LWxvZ2dlci1vcHRpb25zXFxuaW1wb3J0IGNyZWF0ZUxvZ2dlciBmcm9tIFxcJ3JlZHV4LWxvZ2dlclxcJ1xcbmNvbnN0IGxvZ2dlciA9IGNyZWF0ZUxvZ2dlcih7XFxuICAvLyAuLi5vcHRpb25zXFxufSk7XFxuY29uc3Qgc3RvcmUgPSBjcmVhdGVTdG9yZShcXG4gIHJlZHVjZXIsXFxuICBhcHBseU1pZGRsZXdhcmUobG9nZ2VyKVxcbilcXG4nKTtcblxuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKG5leHQpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChhY3Rpb24pIHtcbiAgICAgICAgICByZXR1cm4gbmV4dChhY3Rpb24pO1xuICAgICAgICB9O1xuICAgICAgfTtcbiAgICB9O1xuICB9XG5cbiAgdmFyIGxvZ0J1ZmZlciA9IFtdO1xuXG4gIHJldHVybiBmdW5jdGlvbiAoX3JlZikge1xuICAgIHZhciBnZXRTdGF0ZSA9IF9yZWYuZ2V0U3RhdGU7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChuZXh0KSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKGFjdGlvbikge1xuICAgICAgICAvLyBFeGl0IGVhcmx5IGlmIHByZWRpY2F0ZSBmdW5jdGlvbiByZXR1cm5zICdmYWxzZSdcbiAgICAgICAgaWYgKHR5cGVvZiBwcmVkaWNhdGUgPT09ICdmdW5jdGlvbicgJiYgIXByZWRpY2F0ZShnZXRTdGF0ZSwgYWN0aW9uKSkge1xuICAgICAgICAgIHJldHVybiBuZXh0KGFjdGlvbik7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgbG9nRW50cnkgPSB7fTtcblxuICAgICAgICBsb2dCdWZmZXIucHVzaChsb2dFbnRyeSk7XG5cbiAgICAgICAgbG9nRW50cnkuc3RhcnRlZCA9IF9oZWxwZXJzLnRpbWVyLm5vdygpO1xuICAgICAgICBsb2dFbnRyeS5zdGFydGVkVGltZSA9IG5ldyBEYXRlKCk7XG4gICAgICAgIGxvZ0VudHJ5LnByZXZTdGF0ZSA9IHN0YXRlVHJhbnNmb3JtZXIoZ2V0U3RhdGUoKSk7XG4gICAgICAgIGxvZ0VudHJ5LmFjdGlvbiA9IGFjdGlvbjtcblxuICAgICAgICB2YXIgcmV0dXJuZWRWYWx1ZSA9IHZvaWQgMDtcbiAgICAgICAgaWYgKGxvZ0Vycm9ycykge1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm5lZFZhbHVlID0gbmV4dChhY3Rpb24pO1xuICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgIGxvZ0VudHJ5LmVycm9yID0gZXJyb3JUcmFuc2Zvcm1lcihlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuZWRWYWx1ZSA9IG5leHQoYWN0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxvZ0VudHJ5LnRvb2sgPSBfaGVscGVycy50aW1lci5ub3coKSAtIGxvZ0VudHJ5LnN0YXJ0ZWQ7XG4gICAgICAgIGxvZ0VudHJ5Lm5leHRTdGF0ZSA9IHN0YXRlVHJhbnNmb3JtZXIoZ2V0U3RhdGUoKSk7XG5cbiAgICAgICAgdmFyIGRpZmYgPSBsb2dnZXJPcHRpb25zLmRpZmYgJiYgdHlwZW9mIGRpZmZQcmVkaWNhdGUgPT09ICdmdW5jdGlvbicgPyBkaWZmUHJlZGljYXRlKGdldFN0YXRlLCBhY3Rpb24pIDogbG9nZ2VyT3B0aW9ucy5kaWZmO1xuXG4gICAgICAgICgwLCBfY29yZS5wcmludEJ1ZmZlcikobG9nQnVmZmVyLCBfZXh0ZW5kcyh7fSwgbG9nZ2VyT3B0aW9ucywgeyBkaWZmOiBkaWZmIH0pKTtcbiAgICAgICAgbG9nQnVmZmVyLmxlbmd0aCA9IDA7XG5cbiAgICAgICAgaWYgKGxvZ0VudHJ5LmVycm9yKSB0aHJvdyBsb2dFbnRyeS5lcnJvcjtcbiAgICAgICAgcmV0dXJuIHJldHVybmVkVmFsdWU7XG4gICAgICB9O1xuICAgIH07XG4gIH07XG59XG5cbnZhciBkZWZhdWx0TG9nZ2VyID0gZnVuY3Rpb24gZGVmYXVsdExvZ2dlcigpIHtcbiAgdmFyIF9yZWYyID0gYXJndW1lbnRzLmxlbmd0aCA+IDAgJiYgYXJndW1lbnRzWzBdICE9PSB1bmRlZmluZWQgPyBhcmd1bWVudHNbMF0gOiB7fSxcbiAgICAgIGRpc3BhdGNoID0gX3JlZjIuZGlzcGF0Y2gsXG4gICAgICBnZXRTdGF0ZSA9IF9yZWYyLmdldFN0YXRlO1xuXG4gIGlmICh0eXBlb2YgZGlzcGF0Y2ggPT09ICdmdW5jdGlvbicgfHwgdHlwZW9mIGdldFN0YXRlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIGNyZWF0ZUxvZ2dlcigpKHsgZGlzcGF0Y2g6IGRpc3BhdGNoLCBnZXRTdGF0ZTogZ2V0U3RhdGUgfSk7XG4gIH0gZWxzZSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICBjb25zb2xlLmVycm9yKCdcXG5bcmVkdXgtbG9nZ2VyIHYzXSBCUkVBS0lORyBDSEFOR0VcXG5bcmVkdXgtbG9nZ2VyIHYzXSBTaW5jZSAzLjAuMCByZWR1eC1sb2dnZXIgZXhwb3J0cyBieSBkZWZhdWx0IGxvZ2dlciB3aXRoIGRlZmF1bHQgc2V0dGluZ3MuXFxuW3JlZHV4LWxvZ2dlciB2M10gQ2hhbmdlXFxuW3JlZHV4LWxvZ2dlciB2M10gaW1wb3J0IGNyZWF0ZUxvZ2dlciBmcm9tIFxcJ3JlZHV4LWxvZ2dlclxcJ1xcbltyZWR1eC1sb2dnZXIgdjNdIHRvXFxuW3JlZHV4LWxvZ2dlciB2M10gaW1wb3J0IHsgY3JlYXRlTG9nZ2VyIH0gZnJvbSBcXCdyZWR1eC1sb2dnZXJcXCdcXG4nKTtcbiAgfVxufTtcblxuZXhwb3J0cy5kZWZhdWx0cyA9IF9kZWZhdWx0czIuZGVmYXVsdDtcbmV4cG9ydHMuY3JlYXRlTG9nZ2VyID0gY3JlYXRlTG9nZ2VyO1xuZXhwb3J0cy5sb2dnZXIgPSBkZWZhdWx0TG9nZ2VyO1xuZXhwb3J0cy5kZWZhdWx0ID0gZGVmYXVsdExvZ2dlcjsiLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5mdW5jdGlvbiBjcmVhdGVUaHVua01pZGRsZXdhcmUoZXh0cmFBcmd1bWVudCkge1xuICByZXR1cm4gZnVuY3Rpb24gKF9yZWYpIHtcbiAgICB2YXIgZGlzcGF0Y2ggPSBfcmVmLmRpc3BhdGNoLFxuICAgICAgICBnZXRTdGF0ZSA9IF9yZWYuZ2V0U3RhdGU7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIChuZXh0KSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gKGFjdGlvbikge1xuICAgICAgICBpZiAodHlwZW9mIGFjdGlvbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIHJldHVybiBhY3Rpb24oZGlzcGF0Y2gsIGdldFN0YXRlLCBleHRyYUFyZ3VtZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBuZXh0KGFjdGlvbik7XG4gICAgICB9O1xuICAgIH07XG4gIH07XG59XG5cbnZhciB0aHVuayA9IGNyZWF0ZVRodW5rTWlkZGxld2FyZSgpO1xudGh1bmsud2l0aEV4dHJhQXJndW1lbnQgPSBjcmVhdGVUaHVua01pZGRsZXdhcmU7XG5cbmV4cG9ydHNbJ2RlZmF1bHQnXSA9IHRodW5rOyIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcblxudmFyIF9leHRlbmRzID0gT2JqZWN0LmFzc2lnbiB8fCBmdW5jdGlvbiAodGFyZ2V0KSB7IGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7IHZhciBzb3VyY2UgPSBhcmd1bWVudHNbaV07IGZvciAodmFyIGtleSBpbiBzb3VyY2UpIHsgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzb3VyY2UsIGtleSkpIHsgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTsgfSB9IH0gcmV0dXJuIHRhcmdldDsgfTtcblxuZXhwb3J0c1snZGVmYXVsdCddID0gYXBwbHlNaWRkbGV3YXJlO1xuXG52YXIgX2NvbXBvc2UgPSByZXF1aXJlKCcuL2NvbXBvc2UnKTtcblxudmFyIF9jb21wb3NlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NvbXBvc2UpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9OyB9XG5cbi8qKlxuICogQ3JlYXRlcyBhIHN0b3JlIGVuaGFuY2VyIHRoYXQgYXBwbGllcyBtaWRkbGV3YXJlIHRvIHRoZSBkaXNwYXRjaCBtZXRob2RcbiAqIG9mIHRoZSBSZWR1eCBzdG9yZS4gVGhpcyBpcyBoYW5keSBmb3IgYSB2YXJpZXR5IG9mIHRhc2tzLCBzdWNoIGFzIGV4cHJlc3NpbmdcbiAqIGFzeW5jaHJvbm91cyBhY3Rpb25zIGluIGEgY29uY2lzZSBtYW5uZXIsIG9yIGxvZ2dpbmcgZXZlcnkgYWN0aW9uIHBheWxvYWQuXG4gKlxuICogU2VlIGByZWR1eC10aHVua2AgcGFja2FnZSBhcyBhbiBleGFtcGxlIG9mIHRoZSBSZWR1eCBtaWRkbGV3YXJlLlxuICpcbiAqIEJlY2F1c2UgbWlkZGxld2FyZSBpcyBwb3RlbnRpYWxseSBhc3luY2hyb25vdXMsIHRoaXMgc2hvdWxkIGJlIHRoZSBmaXJzdFxuICogc3RvcmUgZW5oYW5jZXIgaW4gdGhlIGNvbXBvc2l0aW9uIGNoYWluLlxuICpcbiAqIE5vdGUgdGhhdCBlYWNoIG1pZGRsZXdhcmUgd2lsbCBiZSBnaXZlbiB0aGUgYGRpc3BhdGNoYCBhbmQgYGdldFN0YXRlYCBmdW5jdGlvbnNcbiAqIGFzIG5hbWVkIGFyZ3VtZW50cy5cbiAqXG4gKiBAcGFyYW0gey4uLkZ1bmN0aW9ufSBtaWRkbGV3YXJlcyBUaGUgbWlkZGxld2FyZSBjaGFpbiB0byBiZSBhcHBsaWVkLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBBIHN0b3JlIGVuaGFuY2VyIGFwcGx5aW5nIHRoZSBtaWRkbGV3YXJlLlxuICovXG5mdW5jdGlvbiBhcHBseU1pZGRsZXdhcmUoKSB7XG4gIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBtaWRkbGV3YXJlcyA9IEFycmF5KF9sZW4pLCBfa2V5ID0gMDsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgIG1pZGRsZXdhcmVzW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uIChjcmVhdGVTdG9yZSkge1xuICAgIHJldHVybiBmdW5jdGlvbiAocmVkdWNlciwgcHJlbG9hZGVkU3RhdGUsIGVuaGFuY2VyKSB7XG4gICAgICB2YXIgc3RvcmUgPSBjcmVhdGVTdG9yZShyZWR1Y2VyLCBwcmVsb2FkZWRTdGF0ZSwgZW5oYW5jZXIpO1xuICAgICAgdmFyIF9kaXNwYXRjaCA9IHN0b3JlLmRpc3BhdGNoO1xuICAgICAgdmFyIGNoYWluID0gW107XG5cbiAgICAgIHZhciBtaWRkbGV3YXJlQVBJID0ge1xuICAgICAgICBnZXRTdGF0ZTogc3RvcmUuZ2V0U3RhdGUsXG4gICAgICAgIGRpc3BhdGNoOiBmdW5jdGlvbiBkaXNwYXRjaChhY3Rpb24pIHtcbiAgICAgICAgICByZXR1cm4gX2Rpc3BhdGNoKGFjdGlvbik7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICBjaGFpbiA9IG1pZGRsZXdhcmVzLm1hcChmdW5jdGlvbiAobWlkZGxld2FyZSkge1xuICAgICAgICByZXR1cm4gbWlkZGxld2FyZShtaWRkbGV3YXJlQVBJKTtcbiAgICAgIH0pO1xuICAgICAgX2Rpc3BhdGNoID0gX2NvbXBvc2UyWydkZWZhdWx0J10uYXBwbHkodW5kZWZpbmVkLCBjaGFpbikoc3RvcmUuZGlzcGF0Y2gpO1xuXG4gICAgICByZXR1cm4gX2V4dGVuZHMoe30sIHN0b3JlLCB7XG4gICAgICAgIGRpc3BhdGNoOiBfZGlzcGF0Y2hcbiAgICAgIH0pO1xuICAgIH07XG4gIH07XG59IiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuZXhwb3J0c1snZGVmYXVsdCddID0gYmluZEFjdGlvbkNyZWF0b3JzO1xuZnVuY3Rpb24gYmluZEFjdGlvbkNyZWF0b3IoYWN0aW9uQ3JlYXRvciwgZGlzcGF0Y2gpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gZGlzcGF0Y2goYWN0aW9uQ3JlYXRvci5hcHBseSh1bmRlZmluZWQsIGFyZ3VtZW50cykpO1xuICB9O1xufVxuXG4vKipcbiAqIFR1cm5zIGFuIG9iamVjdCB3aG9zZSB2YWx1ZXMgYXJlIGFjdGlvbiBjcmVhdG9ycywgaW50byBhbiBvYmplY3Qgd2l0aCB0aGVcbiAqIHNhbWUga2V5cywgYnV0IHdpdGggZXZlcnkgZnVuY3Rpb24gd3JhcHBlZCBpbnRvIGEgYGRpc3BhdGNoYCBjYWxsIHNvIHRoZXlcbiAqIG1heSBiZSBpbnZva2VkIGRpcmVjdGx5LiBUaGlzIGlzIGp1c3QgYSBjb252ZW5pZW5jZSBtZXRob2QsIGFzIHlvdSBjYW4gY2FsbFxuICogYHN0b3JlLmRpc3BhdGNoKE15QWN0aW9uQ3JlYXRvcnMuZG9Tb21ldGhpbmcoKSlgIHlvdXJzZWxmIGp1c3QgZmluZS5cbiAqXG4gKiBGb3IgY29udmVuaWVuY2UsIHlvdSBjYW4gYWxzbyBwYXNzIGEgc2luZ2xlIGZ1bmN0aW9uIGFzIHRoZSBmaXJzdCBhcmd1bWVudCxcbiAqIGFuZCBnZXQgYSBmdW5jdGlvbiBpbiByZXR1cm4uXG4gKlxuICogQHBhcmFtIHtGdW5jdGlvbnxPYmplY3R9IGFjdGlvbkNyZWF0b3JzIEFuIG9iamVjdCB3aG9zZSB2YWx1ZXMgYXJlIGFjdGlvblxuICogY3JlYXRvciBmdW5jdGlvbnMuIE9uZSBoYW5keSB3YXkgdG8gb2J0YWluIGl0IGlzIHRvIHVzZSBFUzYgYGltcG9ydCAqIGFzYFxuICogc3ludGF4LiBZb3UgbWF5IGFsc28gcGFzcyBhIHNpbmdsZSBmdW5jdGlvbi5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBkaXNwYXRjaCBUaGUgYGRpc3BhdGNoYCBmdW5jdGlvbiBhdmFpbGFibGUgb24geW91ciBSZWR1eFxuICogc3RvcmUuXG4gKlxuICogQHJldHVybnMge0Z1bmN0aW9ufE9iamVjdH0gVGhlIG9iamVjdCBtaW1pY2tpbmcgdGhlIG9yaWdpbmFsIG9iamVjdCwgYnV0IHdpdGhcbiAqIGV2ZXJ5IGFjdGlvbiBjcmVhdG9yIHdyYXBwZWQgaW50byB0aGUgYGRpc3BhdGNoYCBjYWxsLiBJZiB5b3UgcGFzc2VkIGFcbiAqIGZ1bmN0aW9uIGFzIGBhY3Rpb25DcmVhdG9yc2AsIHRoZSByZXR1cm4gdmFsdWUgd2lsbCBhbHNvIGJlIGEgc2luZ2xlXG4gKiBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gYmluZEFjdGlvbkNyZWF0b3JzKGFjdGlvbkNyZWF0b3JzLCBkaXNwYXRjaCkge1xuICBpZiAodHlwZW9mIGFjdGlvbkNyZWF0b3JzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIGJpbmRBY3Rpb25DcmVhdG9yKGFjdGlvbkNyZWF0b3JzLCBkaXNwYXRjaCk7XG4gIH1cblxuICBpZiAodHlwZW9mIGFjdGlvbkNyZWF0b3JzICE9PSAnb2JqZWN0JyB8fCBhY3Rpb25DcmVhdG9ycyA9PT0gbnVsbCkge1xuICAgIHRocm93IG5ldyBFcnJvcignYmluZEFjdGlvbkNyZWF0b3JzIGV4cGVjdGVkIGFuIG9iamVjdCBvciBhIGZ1bmN0aW9uLCBpbnN0ZWFkIHJlY2VpdmVkICcgKyAoYWN0aW9uQ3JlYXRvcnMgPT09IG51bGwgPyAnbnVsbCcgOiB0eXBlb2YgYWN0aW9uQ3JlYXRvcnMpICsgJy4gJyArICdEaWQgeW91IHdyaXRlIFwiaW1wb3J0IEFjdGlvbkNyZWF0b3JzIGZyb21cIiBpbnN0ZWFkIG9mIFwiaW1wb3J0ICogYXMgQWN0aW9uQ3JlYXRvcnMgZnJvbVwiPycpO1xuICB9XG5cbiAgdmFyIGtleXMgPSBPYmplY3Qua2V5cyhhY3Rpb25DcmVhdG9ycyk7XG4gIHZhciBib3VuZEFjdGlvbkNyZWF0b3JzID0ge307XG4gIGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBrZXkgPSBrZXlzW2ldO1xuICAgIHZhciBhY3Rpb25DcmVhdG9yID0gYWN0aW9uQ3JlYXRvcnNba2V5XTtcbiAgICBpZiAodHlwZW9mIGFjdGlvbkNyZWF0b3IgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGJvdW5kQWN0aW9uQ3JlYXRvcnNba2V5XSA9IGJpbmRBY3Rpb25DcmVhdG9yKGFjdGlvbkNyZWF0b3IsIGRpc3BhdGNoKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGJvdW5kQWN0aW9uQ3JlYXRvcnM7XG59IiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnRzLl9fZXNNb2R1bGUgPSB0cnVlO1xuZXhwb3J0c1snZGVmYXVsdCddID0gY29tYmluZVJlZHVjZXJzO1xuXG52YXIgX2NyZWF0ZVN0b3JlID0gcmVxdWlyZSgnLi9jcmVhdGVTdG9yZScpO1xuXG52YXIgX2lzUGxhaW5PYmplY3QgPSByZXF1aXJlKCdsb2Rhc2gvaXNQbGFpbk9iamVjdCcpO1xuXG52YXIgX2lzUGxhaW5PYmplY3QyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfaXNQbGFpbk9iamVjdCk7XG5cbnZhciBfd2FybmluZyA9IHJlcXVpcmUoJy4vdXRpbHMvd2FybmluZycpO1xuXG52YXIgX3dhcm5pbmcyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfd2FybmluZyk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7ICdkZWZhdWx0Jzogb2JqIH07IH1cblxuZnVuY3Rpb24gZ2V0VW5kZWZpbmVkU3RhdGVFcnJvck1lc3NhZ2Uoa2V5LCBhY3Rpb24pIHtcbiAgdmFyIGFjdGlvblR5cGUgPSBhY3Rpb24gJiYgYWN0aW9uLnR5cGU7XG4gIHZhciBhY3Rpb25OYW1lID0gYWN0aW9uVHlwZSAmJiAnXCInICsgYWN0aW9uVHlwZS50b1N0cmluZygpICsgJ1wiJyB8fCAnYW4gYWN0aW9uJztcblxuICByZXR1cm4gJ0dpdmVuIGFjdGlvbiAnICsgYWN0aW9uTmFtZSArICcsIHJlZHVjZXIgXCInICsga2V5ICsgJ1wiIHJldHVybmVkIHVuZGVmaW5lZC4gJyArICdUbyBpZ25vcmUgYW4gYWN0aW9uLCB5b3UgbXVzdCBleHBsaWNpdGx5IHJldHVybiB0aGUgcHJldmlvdXMgc3RhdGUuJztcbn1cblxuZnVuY3Rpb24gZ2V0VW5leHBlY3RlZFN0YXRlU2hhcGVXYXJuaW5nTWVzc2FnZShpbnB1dFN0YXRlLCByZWR1Y2VycywgYWN0aW9uLCB1bmV4cGVjdGVkS2V5Q2FjaGUpIHtcbiAgdmFyIHJlZHVjZXJLZXlzID0gT2JqZWN0LmtleXMocmVkdWNlcnMpO1xuICB2YXIgYXJndW1lbnROYW1lID0gYWN0aW9uICYmIGFjdGlvbi50eXBlID09PSBfY3JlYXRlU3RvcmUuQWN0aW9uVHlwZXMuSU5JVCA/ICdwcmVsb2FkZWRTdGF0ZSBhcmd1bWVudCBwYXNzZWQgdG8gY3JlYXRlU3RvcmUnIDogJ3ByZXZpb3VzIHN0YXRlIHJlY2VpdmVkIGJ5IHRoZSByZWR1Y2VyJztcblxuICBpZiAocmVkdWNlcktleXMubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuICdTdG9yZSBkb2VzIG5vdCBoYXZlIGEgdmFsaWQgcmVkdWNlci4gTWFrZSBzdXJlIHRoZSBhcmd1bWVudCBwYXNzZWQgJyArICd0byBjb21iaW5lUmVkdWNlcnMgaXMgYW4gb2JqZWN0IHdob3NlIHZhbHVlcyBhcmUgcmVkdWNlcnMuJztcbiAgfVxuXG4gIGlmICghKDAsIF9pc1BsYWluT2JqZWN0MlsnZGVmYXVsdCddKShpbnB1dFN0YXRlKSkge1xuICAgIHJldHVybiAnVGhlICcgKyBhcmd1bWVudE5hbWUgKyAnIGhhcyB1bmV4cGVjdGVkIHR5cGUgb2YgXCInICsge30udG9TdHJpbmcuY2FsbChpbnB1dFN0YXRlKS5tYXRjaCgvXFxzKFthLXp8QS1aXSspLylbMV0gKyAnXCIuIEV4cGVjdGVkIGFyZ3VtZW50IHRvIGJlIGFuIG9iamVjdCB3aXRoIHRoZSBmb2xsb3dpbmcgJyArICgna2V5czogXCInICsgcmVkdWNlcktleXMuam9pbignXCIsIFwiJykgKyAnXCInKTtcbiAgfVxuXG4gIHZhciB1bmV4cGVjdGVkS2V5cyA9IE9iamVjdC5rZXlzKGlucHV0U3RhdGUpLmZpbHRlcihmdW5jdGlvbiAoa2V5KSB7XG4gICAgcmV0dXJuICFyZWR1Y2Vycy5oYXNPd25Qcm9wZXJ0eShrZXkpICYmICF1bmV4cGVjdGVkS2V5Q2FjaGVba2V5XTtcbiAgfSk7XG5cbiAgdW5leHBlY3RlZEtleXMuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgdW5leHBlY3RlZEtleUNhY2hlW2tleV0gPSB0cnVlO1xuICB9KTtcblxuICBpZiAodW5leHBlY3RlZEtleXMubGVuZ3RoID4gMCkge1xuICAgIHJldHVybiAnVW5leHBlY3RlZCAnICsgKHVuZXhwZWN0ZWRLZXlzLmxlbmd0aCA+IDEgPyAna2V5cycgOiAna2V5JykgKyAnICcgKyAoJ1wiJyArIHVuZXhwZWN0ZWRLZXlzLmpvaW4oJ1wiLCBcIicpICsgJ1wiIGZvdW5kIGluICcgKyBhcmd1bWVudE5hbWUgKyAnLiAnKSArICdFeHBlY3RlZCB0byBmaW5kIG9uZSBvZiB0aGUga25vd24gcmVkdWNlciBrZXlzIGluc3RlYWQ6ICcgKyAoJ1wiJyArIHJlZHVjZXJLZXlzLmpvaW4oJ1wiLCBcIicpICsgJ1wiLiBVbmV4cGVjdGVkIGtleXMgd2lsbCBiZSBpZ25vcmVkLicpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGFzc2VydFJlZHVjZXJTYW5pdHkocmVkdWNlcnMpIHtcbiAgT2JqZWN0LmtleXMocmVkdWNlcnMpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgIHZhciByZWR1Y2VyID0gcmVkdWNlcnNba2V5XTtcbiAgICB2YXIgaW5pdGlhbFN0YXRlID0gcmVkdWNlcih1bmRlZmluZWQsIHsgdHlwZTogX2NyZWF0ZVN0b3JlLkFjdGlvblR5cGVzLklOSVQgfSk7XG5cbiAgICBpZiAodHlwZW9mIGluaXRpYWxTdGF0ZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignUmVkdWNlciBcIicgKyBrZXkgKyAnXCIgcmV0dXJuZWQgdW5kZWZpbmVkIGR1cmluZyBpbml0aWFsaXphdGlvbi4gJyArICdJZiB0aGUgc3RhdGUgcGFzc2VkIHRvIHRoZSByZWR1Y2VyIGlzIHVuZGVmaW5lZCwgeW91IG11c3QgJyArICdleHBsaWNpdGx5IHJldHVybiB0aGUgaW5pdGlhbCBzdGF0ZS4gVGhlIGluaXRpYWwgc3RhdGUgbWF5ICcgKyAnbm90IGJlIHVuZGVmaW5lZC4nKTtcbiAgICB9XG5cbiAgICB2YXIgdHlwZSA9ICdAQHJlZHV4L1BST0JFX1VOS05PV05fQUNUSU9OXycgKyBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKDM2KS5zdWJzdHJpbmcoNykuc3BsaXQoJycpLmpvaW4oJy4nKTtcbiAgICBpZiAodHlwZW9mIHJlZHVjZXIodW5kZWZpbmVkLCB7IHR5cGU6IHR5cGUgfSkgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1JlZHVjZXIgXCInICsga2V5ICsgJ1wiIHJldHVybmVkIHVuZGVmaW5lZCB3aGVuIHByb2JlZCB3aXRoIGEgcmFuZG9tIHR5cGUuICcgKyAoJ0RvblxcJ3QgdHJ5IHRvIGhhbmRsZSAnICsgX2NyZWF0ZVN0b3JlLkFjdGlvblR5cGVzLklOSVQgKyAnIG9yIG90aGVyIGFjdGlvbnMgaW4gXCJyZWR1eC8qXCIgJykgKyAnbmFtZXNwYWNlLiBUaGV5IGFyZSBjb25zaWRlcmVkIHByaXZhdGUuIEluc3RlYWQsIHlvdSBtdXN0IHJldHVybiB0aGUgJyArICdjdXJyZW50IHN0YXRlIGZvciBhbnkgdW5rbm93biBhY3Rpb25zLCB1bmxlc3MgaXQgaXMgdW5kZWZpbmVkLCAnICsgJ2luIHdoaWNoIGNhc2UgeW91IG11c3QgcmV0dXJuIHRoZSBpbml0aWFsIHN0YXRlLCByZWdhcmRsZXNzIG9mIHRoZSAnICsgJ2FjdGlvbiB0eXBlLiBUaGUgaW5pdGlhbCBzdGF0ZSBtYXkgbm90IGJlIHVuZGVmaW5lZC4nKTtcbiAgICB9XG4gIH0pO1xufVxuXG4vKipcbiAqIFR1cm5zIGFuIG9iamVjdCB3aG9zZSB2YWx1ZXMgYXJlIGRpZmZlcmVudCByZWR1Y2VyIGZ1bmN0aW9ucywgaW50byBhIHNpbmdsZVxuICogcmVkdWNlciBmdW5jdGlvbi4gSXQgd2lsbCBjYWxsIGV2ZXJ5IGNoaWxkIHJlZHVjZXIsIGFuZCBnYXRoZXIgdGhlaXIgcmVzdWx0c1xuICogaW50byBhIHNpbmdsZSBzdGF0ZSBvYmplY3QsIHdob3NlIGtleXMgY29ycmVzcG9uZCB0byB0aGUga2V5cyBvZiB0aGUgcGFzc2VkXG4gKiByZWR1Y2VyIGZ1bmN0aW9ucy5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gcmVkdWNlcnMgQW4gb2JqZWN0IHdob3NlIHZhbHVlcyBjb3JyZXNwb25kIHRvIGRpZmZlcmVudFxuICogcmVkdWNlciBmdW5jdGlvbnMgdGhhdCBuZWVkIHRvIGJlIGNvbWJpbmVkIGludG8gb25lLiBPbmUgaGFuZHkgd2F5IHRvIG9idGFpblxuICogaXQgaXMgdG8gdXNlIEVTNiBgaW1wb3J0ICogYXMgcmVkdWNlcnNgIHN5bnRheC4gVGhlIHJlZHVjZXJzIG1heSBuZXZlciByZXR1cm5cbiAqIHVuZGVmaW5lZCBmb3IgYW55IGFjdGlvbi4gSW5zdGVhZCwgdGhleSBzaG91bGQgcmV0dXJuIHRoZWlyIGluaXRpYWwgc3RhdGVcbiAqIGlmIHRoZSBzdGF0ZSBwYXNzZWQgdG8gdGhlbSB3YXMgdW5kZWZpbmVkLCBhbmQgdGhlIGN1cnJlbnQgc3RhdGUgZm9yIGFueVxuICogdW5yZWNvZ25pemVkIGFjdGlvbi5cbiAqXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IEEgcmVkdWNlciBmdW5jdGlvbiB0aGF0IGludm9rZXMgZXZlcnkgcmVkdWNlciBpbnNpZGUgdGhlXG4gKiBwYXNzZWQgb2JqZWN0LCBhbmQgYnVpbGRzIGEgc3RhdGUgb2JqZWN0IHdpdGggdGhlIHNhbWUgc2hhcGUuXG4gKi9cbmZ1bmN0aW9uIGNvbWJpbmVSZWR1Y2VycyhyZWR1Y2Vycykge1xuICB2YXIgcmVkdWNlcktleXMgPSBPYmplY3Qua2V5cyhyZWR1Y2Vycyk7XG4gIHZhciBmaW5hbFJlZHVjZXJzID0ge307XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgcmVkdWNlcktleXMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIga2V5ID0gcmVkdWNlcktleXNbaV07XG5cbiAgICBpZiAoXCJkZXZlbG9wbWVudFwiICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIGlmICh0eXBlb2YgcmVkdWNlcnNba2V5XSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgKDAsIF93YXJuaW5nMlsnZGVmYXVsdCddKSgnTm8gcmVkdWNlciBwcm92aWRlZCBmb3Iga2V5IFwiJyArIGtleSArICdcIicpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0eXBlb2YgcmVkdWNlcnNba2V5XSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgZmluYWxSZWR1Y2Vyc1trZXldID0gcmVkdWNlcnNba2V5XTtcbiAgICB9XG4gIH1cbiAgdmFyIGZpbmFsUmVkdWNlcktleXMgPSBPYmplY3Qua2V5cyhmaW5hbFJlZHVjZXJzKTtcblxuICBpZiAoXCJkZXZlbG9wbWVudFwiICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICB2YXIgdW5leHBlY3RlZEtleUNhY2hlID0ge307XG4gIH1cblxuICB2YXIgc2FuaXR5RXJyb3I7XG4gIHRyeSB7XG4gICAgYXNzZXJ0UmVkdWNlclNhbml0eShmaW5hbFJlZHVjZXJzKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHNhbml0eUVycm9yID0gZTtcbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbiBjb21iaW5hdGlvbigpIHtcbiAgICB2YXIgc3RhdGUgPSBhcmd1bWVudHMubGVuZ3RoIDw9IDAgfHwgYXJndW1lbnRzWzBdID09PSB1bmRlZmluZWQgPyB7fSA6IGFyZ3VtZW50c1swXTtcbiAgICB2YXIgYWN0aW9uID0gYXJndW1lbnRzWzFdO1xuXG4gICAgaWYgKHNhbml0eUVycm9yKSB7XG4gICAgICB0aHJvdyBzYW5pdHlFcnJvcjtcbiAgICB9XG5cbiAgICBpZiAoXCJkZXZlbG9wbWVudFwiICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIHZhciB3YXJuaW5nTWVzc2FnZSA9IGdldFVuZXhwZWN0ZWRTdGF0ZVNoYXBlV2FybmluZ01lc3NhZ2Uoc3RhdGUsIGZpbmFsUmVkdWNlcnMsIGFjdGlvbiwgdW5leHBlY3RlZEtleUNhY2hlKTtcbiAgICAgIGlmICh3YXJuaW5nTWVzc2FnZSkge1xuICAgICAgICAoMCwgX3dhcm5pbmcyWydkZWZhdWx0J10pKHdhcm5pbmdNZXNzYWdlKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgaGFzQ2hhbmdlZCA9IGZhbHNlO1xuICAgIHZhciBuZXh0U3RhdGUgPSB7fTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGZpbmFsUmVkdWNlcktleXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBrZXkgPSBmaW5hbFJlZHVjZXJLZXlzW2ldO1xuICAgICAgdmFyIHJlZHVjZXIgPSBmaW5hbFJlZHVjZXJzW2tleV07XG4gICAgICB2YXIgcHJldmlvdXNTdGF0ZUZvcktleSA9IHN0YXRlW2tleV07XG4gICAgICB2YXIgbmV4dFN0YXRlRm9yS2V5ID0gcmVkdWNlcihwcmV2aW91c1N0YXRlRm9yS2V5LCBhY3Rpb24pO1xuICAgICAgaWYgKHR5cGVvZiBuZXh0U3RhdGVGb3JLZXkgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHZhciBlcnJvck1lc3NhZ2UgPSBnZXRVbmRlZmluZWRTdGF0ZUVycm9yTWVzc2FnZShrZXksIGFjdGlvbik7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihlcnJvck1lc3NhZ2UpO1xuICAgICAgfVxuICAgICAgbmV4dFN0YXRlW2tleV0gPSBuZXh0U3RhdGVGb3JLZXk7XG4gICAgICBoYXNDaGFuZ2VkID0gaGFzQ2hhbmdlZCB8fCBuZXh0U3RhdGVGb3JLZXkgIT09IHByZXZpb3VzU3RhdGVGb3JLZXk7XG4gICAgfVxuICAgIHJldHVybiBoYXNDaGFuZ2VkID8gbmV4dFN0YXRlIDogc3RhdGU7XG4gIH07XG59IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5leHBvcnRzW1wiZGVmYXVsdFwiXSA9IGNvbXBvc2U7XG4vKipcbiAqIENvbXBvc2VzIHNpbmdsZS1hcmd1bWVudCBmdW5jdGlvbnMgZnJvbSByaWdodCB0byBsZWZ0LiBUaGUgcmlnaHRtb3N0XG4gKiBmdW5jdGlvbiBjYW4gdGFrZSBtdWx0aXBsZSBhcmd1bWVudHMgYXMgaXQgcHJvdmlkZXMgdGhlIHNpZ25hdHVyZSBmb3JcbiAqIHRoZSByZXN1bHRpbmcgY29tcG9zaXRlIGZ1bmN0aW9uLlxuICpcbiAqIEBwYXJhbSB7Li4uRnVuY3Rpb259IGZ1bmNzIFRoZSBmdW5jdGlvbnMgdG8gY29tcG9zZS5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gQSBmdW5jdGlvbiBvYnRhaW5lZCBieSBjb21wb3NpbmcgdGhlIGFyZ3VtZW50IGZ1bmN0aW9uc1xuICogZnJvbSByaWdodCB0byBsZWZ0LiBGb3IgZXhhbXBsZSwgY29tcG9zZShmLCBnLCBoKSBpcyBpZGVudGljYWwgdG8gZG9pbmdcbiAqICguLi5hcmdzKSA9PiBmKGcoaCguLi5hcmdzKSkpLlxuICovXG5cbmZ1bmN0aW9uIGNvbXBvc2UoKSB7XG4gIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBmdW5jcyA9IEFycmF5KF9sZW4pLCBfa2V5ID0gMDsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgIGZ1bmNzW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICB9XG5cbiAgaWYgKGZ1bmNzLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBmdW5jdGlvbiAoYXJnKSB7XG4gICAgICByZXR1cm4gYXJnO1xuICAgIH07XG4gIH1cblxuICBpZiAoZnVuY3MubGVuZ3RoID09PSAxKSB7XG4gICAgcmV0dXJuIGZ1bmNzWzBdO1xuICB9XG5cbiAgdmFyIGxhc3QgPSBmdW5jc1tmdW5jcy5sZW5ndGggLSAxXTtcbiAgdmFyIHJlc3QgPSBmdW5jcy5zbGljZSgwLCAtMSk7XG4gIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHJlc3QucmVkdWNlUmlnaHQoZnVuY3Rpb24gKGNvbXBvc2VkLCBmKSB7XG4gICAgICByZXR1cm4gZihjb21wb3NlZCk7XG4gICAgfSwgbGFzdC5hcHBseSh1bmRlZmluZWQsIGFyZ3VtZW50cykpO1xuICB9O1xufSIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0cy5fX2VzTW9kdWxlID0gdHJ1ZTtcbmV4cG9ydHMuQWN0aW9uVHlwZXMgPSB1bmRlZmluZWQ7XG5leHBvcnRzWydkZWZhdWx0J10gPSBjcmVhdGVTdG9yZTtcblxudmFyIF9pc1BsYWluT2JqZWN0ID0gcmVxdWlyZSgnbG9kYXNoL2lzUGxhaW5PYmplY3QnKTtcblxudmFyIF9pc1BsYWluT2JqZWN0MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2lzUGxhaW5PYmplY3QpO1xuXG52YXIgX3N5bWJvbE9ic2VydmFibGUgPSByZXF1aXJlKCdzeW1ib2wtb2JzZXJ2YWJsZScpO1xuXG52YXIgX3N5bWJvbE9ic2VydmFibGUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfc3ltYm9sT2JzZXJ2YWJsZSk7XG5cbmZ1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmogOiB7ICdkZWZhdWx0Jzogb2JqIH07IH1cblxuLyoqXG4gKiBUaGVzZSBhcmUgcHJpdmF0ZSBhY3Rpb24gdHlwZXMgcmVzZXJ2ZWQgYnkgUmVkdXguXG4gKiBGb3IgYW55IHVua25vd24gYWN0aW9ucywgeW91IG11c3QgcmV0dXJuIHRoZSBjdXJyZW50IHN0YXRlLlxuICogSWYgdGhlIGN1cnJlbnQgc3RhdGUgaXMgdW5kZWZpbmVkLCB5b3UgbXVzdCByZXR1cm4gdGhlIGluaXRpYWwgc3RhdGUuXG4gKiBEbyBub3QgcmVmZXJlbmNlIHRoZXNlIGFjdGlvbiB0eXBlcyBkaXJlY3RseSBpbiB5b3VyIGNvZGUuXG4gKi9cbnZhciBBY3Rpb25UeXBlcyA9IGV4cG9ydHMuQWN0aW9uVHlwZXMgPSB7XG4gIElOSVQ6ICdAQHJlZHV4L0lOSVQnXG59O1xuXG4vKipcbiAqIENyZWF0ZXMgYSBSZWR1eCBzdG9yZSB0aGF0IGhvbGRzIHRoZSBzdGF0ZSB0cmVlLlxuICogVGhlIG9ubHkgd2F5IHRvIGNoYW5nZSB0aGUgZGF0YSBpbiB0aGUgc3RvcmUgaXMgdG8gY2FsbCBgZGlzcGF0Y2goKWAgb24gaXQuXG4gKlxuICogVGhlcmUgc2hvdWxkIG9ubHkgYmUgYSBzaW5nbGUgc3RvcmUgaW4geW91ciBhcHAuIFRvIHNwZWNpZnkgaG93IGRpZmZlcmVudFxuICogcGFydHMgb2YgdGhlIHN0YXRlIHRyZWUgcmVzcG9uZCB0byBhY3Rpb25zLCB5b3UgbWF5IGNvbWJpbmUgc2V2ZXJhbCByZWR1Y2Vyc1xuICogaW50byBhIHNpbmdsZSByZWR1Y2VyIGZ1bmN0aW9uIGJ5IHVzaW5nIGBjb21iaW5lUmVkdWNlcnNgLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlZHVjZXIgQSBmdW5jdGlvbiB0aGF0IHJldHVybnMgdGhlIG5leHQgc3RhdGUgdHJlZSwgZ2l2ZW5cbiAqIHRoZSBjdXJyZW50IHN0YXRlIHRyZWUgYW5kIHRoZSBhY3Rpb24gdG8gaGFuZGxlLlxuICpcbiAqIEBwYXJhbSB7YW55fSBbcHJlbG9hZGVkU3RhdGVdIFRoZSBpbml0aWFsIHN0YXRlLiBZb3UgbWF5IG9wdGlvbmFsbHkgc3BlY2lmeSBpdFxuICogdG8gaHlkcmF0ZSB0aGUgc3RhdGUgZnJvbSB0aGUgc2VydmVyIGluIHVuaXZlcnNhbCBhcHBzLCBvciB0byByZXN0b3JlIGFcbiAqIHByZXZpb3VzbHkgc2VyaWFsaXplZCB1c2VyIHNlc3Npb24uXG4gKiBJZiB5b3UgdXNlIGBjb21iaW5lUmVkdWNlcnNgIHRvIHByb2R1Y2UgdGhlIHJvb3QgcmVkdWNlciBmdW5jdGlvbiwgdGhpcyBtdXN0IGJlXG4gKiBhbiBvYmplY3Qgd2l0aCB0aGUgc2FtZSBzaGFwZSBhcyBgY29tYmluZVJlZHVjZXJzYCBrZXlzLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGVuaGFuY2VyIFRoZSBzdG9yZSBlbmhhbmNlci4gWW91IG1heSBvcHRpb25hbGx5IHNwZWNpZnkgaXRcbiAqIHRvIGVuaGFuY2UgdGhlIHN0b3JlIHdpdGggdGhpcmQtcGFydHkgY2FwYWJpbGl0aWVzIHN1Y2ggYXMgbWlkZGxld2FyZSxcbiAqIHRpbWUgdHJhdmVsLCBwZXJzaXN0ZW5jZSwgZXRjLiBUaGUgb25seSBzdG9yZSBlbmhhbmNlciB0aGF0IHNoaXBzIHdpdGggUmVkdXhcbiAqIGlzIGBhcHBseU1pZGRsZXdhcmUoKWAuXG4gKlxuICogQHJldHVybnMge1N0b3JlfSBBIFJlZHV4IHN0b3JlIHRoYXQgbGV0cyB5b3UgcmVhZCB0aGUgc3RhdGUsIGRpc3BhdGNoIGFjdGlvbnNcbiAqIGFuZCBzdWJzY3JpYmUgdG8gY2hhbmdlcy5cbiAqL1xuZnVuY3Rpb24gY3JlYXRlU3RvcmUocmVkdWNlciwgcHJlbG9hZGVkU3RhdGUsIGVuaGFuY2VyKSB7XG4gIHZhciBfcmVmMjtcblxuICBpZiAodHlwZW9mIHByZWxvYWRlZFN0YXRlID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBlbmhhbmNlciA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBlbmhhbmNlciA9IHByZWxvYWRlZFN0YXRlO1xuICAgIHByZWxvYWRlZFN0YXRlID0gdW5kZWZpbmVkO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBlbmhhbmNlciAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBpZiAodHlwZW9mIGVuaGFuY2VyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0V4cGVjdGVkIHRoZSBlbmhhbmNlciB0byBiZSBhIGZ1bmN0aW9uLicpO1xuICAgIH1cblxuICAgIHJldHVybiBlbmhhbmNlcihjcmVhdGVTdG9yZSkocmVkdWNlciwgcHJlbG9hZGVkU3RhdGUpO1xuICB9XG5cbiAgaWYgKHR5cGVvZiByZWR1Y2VyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdFeHBlY3RlZCB0aGUgcmVkdWNlciB0byBiZSBhIGZ1bmN0aW9uLicpO1xuICB9XG5cbiAgdmFyIGN1cnJlbnRSZWR1Y2VyID0gcmVkdWNlcjtcbiAgdmFyIGN1cnJlbnRTdGF0ZSA9IHByZWxvYWRlZFN0YXRlO1xuICB2YXIgY3VycmVudExpc3RlbmVycyA9IFtdO1xuICB2YXIgbmV4dExpc3RlbmVycyA9IGN1cnJlbnRMaXN0ZW5lcnM7XG4gIHZhciBpc0Rpc3BhdGNoaW5nID0gZmFsc2U7XG5cbiAgZnVuY3Rpb24gZW5zdXJlQ2FuTXV0YXRlTmV4dExpc3RlbmVycygpIHtcbiAgICBpZiAobmV4dExpc3RlbmVycyA9PT0gY3VycmVudExpc3RlbmVycykge1xuICAgICAgbmV4dExpc3RlbmVycyA9IGN1cnJlbnRMaXN0ZW5lcnMuc2xpY2UoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUmVhZHMgdGhlIHN0YXRlIHRyZWUgbWFuYWdlZCBieSB0aGUgc3RvcmUuXG4gICAqXG4gICAqIEByZXR1cm5zIHthbnl9IFRoZSBjdXJyZW50IHN0YXRlIHRyZWUgb2YgeW91ciBhcHBsaWNhdGlvbi5cbiAgICovXG4gIGZ1bmN0aW9uIGdldFN0YXRlKCkge1xuICAgIHJldHVybiBjdXJyZW50U3RhdGU7XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBhIGNoYW5nZSBsaXN0ZW5lci4gSXQgd2lsbCBiZSBjYWxsZWQgYW55IHRpbWUgYW4gYWN0aW9uIGlzIGRpc3BhdGNoZWQsXG4gICAqIGFuZCBzb21lIHBhcnQgb2YgdGhlIHN0YXRlIHRyZWUgbWF5IHBvdGVudGlhbGx5IGhhdmUgY2hhbmdlZC4gWW91IG1heSB0aGVuXG4gICAqIGNhbGwgYGdldFN0YXRlKClgIHRvIHJlYWQgdGhlIGN1cnJlbnQgc3RhdGUgdHJlZSBpbnNpZGUgdGhlIGNhbGxiYWNrLlxuICAgKlxuICAgKiBZb3UgbWF5IGNhbGwgYGRpc3BhdGNoKClgIGZyb20gYSBjaGFuZ2UgbGlzdGVuZXIsIHdpdGggdGhlIGZvbGxvd2luZ1xuICAgKiBjYXZlYXRzOlxuICAgKlxuICAgKiAxLiBUaGUgc3Vic2NyaXB0aW9ucyBhcmUgc25hcHNob3R0ZWQganVzdCBiZWZvcmUgZXZlcnkgYGRpc3BhdGNoKClgIGNhbGwuXG4gICAqIElmIHlvdSBzdWJzY3JpYmUgb3IgdW5zdWJzY3JpYmUgd2hpbGUgdGhlIGxpc3RlbmVycyBhcmUgYmVpbmcgaW52b2tlZCwgdGhpc1xuICAgKiB3aWxsIG5vdCBoYXZlIGFueSBlZmZlY3Qgb24gdGhlIGBkaXNwYXRjaCgpYCB0aGF0IGlzIGN1cnJlbnRseSBpbiBwcm9ncmVzcy5cbiAgICogSG93ZXZlciwgdGhlIG5leHQgYGRpc3BhdGNoKClgIGNhbGwsIHdoZXRoZXIgbmVzdGVkIG9yIG5vdCwgd2lsbCB1c2UgYSBtb3JlXG4gICAqIHJlY2VudCBzbmFwc2hvdCBvZiB0aGUgc3Vic2NyaXB0aW9uIGxpc3QuXG4gICAqXG4gICAqIDIuIFRoZSBsaXN0ZW5lciBzaG91bGQgbm90IGV4cGVjdCB0byBzZWUgYWxsIHN0YXRlIGNoYW5nZXMsIGFzIHRoZSBzdGF0ZVxuICAgKiBtaWdodCBoYXZlIGJlZW4gdXBkYXRlZCBtdWx0aXBsZSB0aW1lcyBkdXJpbmcgYSBuZXN0ZWQgYGRpc3BhdGNoKClgIGJlZm9yZVxuICAgKiB0aGUgbGlzdGVuZXIgaXMgY2FsbGVkLiBJdCBpcywgaG93ZXZlciwgZ3VhcmFudGVlZCB0aGF0IGFsbCBzdWJzY3JpYmVyc1xuICAgKiByZWdpc3RlcmVkIGJlZm9yZSB0aGUgYGRpc3BhdGNoKClgIHN0YXJ0ZWQgd2lsbCBiZSBjYWxsZWQgd2l0aCB0aGUgbGF0ZXN0XG4gICAqIHN0YXRlIGJ5IHRoZSB0aW1lIGl0IGV4aXRzLlxuICAgKlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBsaXN0ZW5lciBBIGNhbGxiYWNrIHRvIGJlIGludm9rZWQgb24gZXZlcnkgZGlzcGF0Y2guXG4gICAqIEByZXR1cm5zIHtGdW5jdGlvbn0gQSBmdW5jdGlvbiB0byByZW1vdmUgdGhpcyBjaGFuZ2UgbGlzdGVuZXIuXG4gICAqL1xuICBmdW5jdGlvbiBzdWJzY3JpYmUobGlzdGVuZXIpIHtcbiAgICBpZiAodHlwZW9mIGxpc3RlbmVyICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0V4cGVjdGVkIGxpc3RlbmVyIHRvIGJlIGEgZnVuY3Rpb24uJyk7XG4gICAgfVxuXG4gICAgdmFyIGlzU3Vic2NyaWJlZCA9IHRydWU7XG5cbiAgICBlbnN1cmVDYW5NdXRhdGVOZXh0TGlzdGVuZXJzKCk7XG4gICAgbmV4dExpc3RlbmVycy5wdXNoKGxpc3RlbmVyKTtcblxuICAgIHJldHVybiBmdW5jdGlvbiB1bnN1YnNjcmliZSgpIHtcbiAgICAgIGlmICghaXNTdWJzY3JpYmVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaXNTdWJzY3JpYmVkID0gZmFsc2U7XG5cbiAgICAgIGVuc3VyZUNhbk11dGF0ZU5leHRMaXN0ZW5lcnMoKTtcbiAgICAgIHZhciBpbmRleCA9IG5leHRMaXN0ZW5lcnMuaW5kZXhPZihsaXN0ZW5lcik7XG4gICAgICBuZXh0TGlzdGVuZXJzLnNwbGljZShpbmRleCwgMSk7XG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBEaXNwYXRjaGVzIGFuIGFjdGlvbi4gSXQgaXMgdGhlIG9ubHkgd2F5IHRvIHRyaWdnZXIgYSBzdGF0ZSBjaGFuZ2UuXG4gICAqXG4gICAqIFRoZSBgcmVkdWNlcmAgZnVuY3Rpb24sIHVzZWQgdG8gY3JlYXRlIHRoZSBzdG9yZSwgd2lsbCBiZSBjYWxsZWQgd2l0aCB0aGVcbiAgICogY3VycmVudCBzdGF0ZSB0cmVlIGFuZCB0aGUgZ2l2ZW4gYGFjdGlvbmAuIEl0cyByZXR1cm4gdmFsdWUgd2lsbFxuICAgKiBiZSBjb25zaWRlcmVkIHRoZSAqKm5leHQqKiBzdGF0ZSBvZiB0aGUgdHJlZSwgYW5kIHRoZSBjaGFuZ2UgbGlzdGVuZXJzXG4gICAqIHdpbGwgYmUgbm90aWZpZWQuXG4gICAqXG4gICAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9ubHkgc3VwcG9ydHMgcGxhaW4gb2JqZWN0IGFjdGlvbnMuIElmIHlvdSB3YW50IHRvXG4gICAqIGRpc3BhdGNoIGEgUHJvbWlzZSwgYW4gT2JzZXJ2YWJsZSwgYSB0aHVuaywgb3Igc29tZXRoaW5nIGVsc2UsIHlvdSBuZWVkIHRvXG4gICAqIHdyYXAgeW91ciBzdG9yZSBjcmVhdGluZyBmdW5jdGlvbiBpbnRvIHRoZSBjb3JyZXNwb25kaW5nIG1pZGRsZXdhcmUuIEZvclxuICAgKiBleGFtcGxlLCBzZWUgdGhlIGRvY3VtZW50YXRpb24gZm9yIHRoZSBgcmVkdXgtdGh1bmtgIHBhY2thZ2UuIEV2ZW4gdGhlXG4gICAqIG1pZGRsZXdhcmUgd2lsbCBldmVudHVhbGx5IGRpc3BhdGNoIHBsYWluIG9iamVjdCBhY3Rpb25zIHVzaW5nIHRoaXMgbWV0aG9kLlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gYWN0aW9uIEEgcGxhaW4gb2JqZWN0IHJlcHJlc2VudGluZyDigJx3aGF0IGNoYW5nZWTigJ0uIEl0IGlzXG4gICAqIGEgZ29vZCBpZGVhIHRvIGtlZXAgYWN0aW9ucyBzZXJpYWxpemFibGUgc28geW91IGNhbiByZWNvcmQgYW5kIHJlcGxheSB1c2VyXG4gICAqIHNlc3Npb25zLCBvciB1c2UgdGhlIHRpbWUgdHJhdmVsbGluZyBgcmVkdXgtZGV2dG9vbHNgLiBBbiBhY3Rpb24gbXVzdCBoYXZlXG4gICAqIGEgYHR5cGVgIHByb3BlcnR5IHdoaWNoIG1heSBub3QgYmUgYHVuZGVmaW5lZGAuIEl0IGlzIGEgZ29vZCBpZGVhIHRvIHVzZVxuICAgKiBzdHJpbmcgY29uc3RhbnRzIGZvciBhY3Rpb24gdHlwZXMuXG4gICAqXG4gICAqIEByZXR1cm5zIHtPYmplY3R9IEZvciBjb252ZW5pZW5jZSwgdGhlIHNhbWUgYWN0aW9uIG9iamVjdCB5b3UgZGlzcGF0Y2hlZC5cbiAgICpcbiAgICogTm90ZSB0aGF0LCBpZiB5b3UgdXNlIGEgY3VzdG9tIG1pZGRsZXdhcmUsIGl0IG1heSB3cmFwIGBkaXNwYXRjaCgpYCB0b1xuICAgKiByZXR1cm4gc29tZXRoaW5nIGVsc2UgKGZvciBleGFtcGxlLCBhIFByb21pc2UgeW91IGNhbiBhd2FpdCkuXG4gICAqL1xuICBmdW5jdGlvbiBkaXNwYXRjaChhY3Rpb24pIHtcbiAgICBpZiAoISgwLCBfaXNQbGFpbk9iamVjdDJbJ2RlZmF1bHQnXSkoYWN0aW9uKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdBY3Rpb25zIG11c3QgYmUgcGxhaW4gb2JqZWN0cy4gJyArICdVc2UgY3VzdG9tIG1pZGRsZXdhcmUgZm9yIGFzeW5jIGFjdGlvbnMuJyk7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBhY3Rpb24udHlwZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQWN0aW9ucyBtYXkgbm90IGhhdmUgYW4gdW5kZWZpbmVkIFwidHlwZVwiIHByb3BlcnR5LiAnICsgJ0hhdmUgeW91IG1pc3NwZWxsZWQgYSBjb25zdGFudD8nKTtcbiAgICB9XG5cbiAgICBpZiAoaXNEaXNwYXRjaGluZykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdSZWR1Y2VycyBtYXkgbm90IGRpc3BhdGNoIGFjdGlvbnMuJyk7XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIGlzRGlzcGF0Y2hpbmcgPSB0cnVlO1xuICAgICAgY3VycmVudFN0YXRlID0gY3VycmVudFJlZHVjZXIoY3VycmVudFN0YXRlLCBhY3Rpb24pO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBpc0Rpc3BhdGNoaW5nID0gZmFsc2U7XG4gICAgfVxuXG4gICAgdmFyIGxpc3RlbmVycyA9IGN1cnJlbnRMaXN0ZW5lcnMgPSBuZXh0TGlzdGVuZXJzO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdGVuZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBsaXN0ZW5lcnNbaV0oKTtcbiAgICB9XG5cbiAgICByZXR1cm4gYWN0aW9uO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlcGxhY2VzIHRoZSByZWR1Y2VyIGN1cnJlbnRseSB1c2VkIGJ5IHRoZSBzdG9yZSB0byBjYWxjdWxhdGUgdGhlIHN0YXRlLlxuICAgKlxuICAgKiBZb3UgbWlnaHQgbmVlZCB0aGlzIGlmIHlvdXIgYXBwIGltcGxlbWVudHMgY29kZSBzcGxpdHRpbmcgYW5kIHlvdSB3YW50IHRvXG4gICAqIGxvYWQgc29tZSBvZiB0aGUgcmVkdWNlcnMgZHluYW1pY2FsbHkuIFlvdSBtaWdodCBhbHNvIG5lZWQgdGhpcyBpZiB5b3VcbiAgICogaW1wbGVtZW50IGEgaG90IHJlbG9hZGluZyBtZWNoYW5pc20gZm9yIFJlZHV4LlxuICAgKlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBuZXh0UmVkdWNlciBUaGUgcmVkdWNlciBmb3IgdGhlIHN0b3JlIHRvIHVzZSBpbnN0ZWFkLlxuICAgKiBAcmV0dXJucyB7dm9pZH1cbiAgICovXG4gIGZ1bmN0aW9uIHJlcGxhY2VSZWR1Y2VyKG5leHRSZWR1Y2VyKSB7XG4gICAgaWYgKHR5cGVvZiBuZXh0UmVkdWNlciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdFeHBlY3RlZCB0aGUgbmV4dFJlZHVjZXIgdG8gYmUgYSBmdW5jdGlvbi4nKTtcbiAgICB9XG5cbiAgICBjdXJyZW50UmVkdWNlciA9IG5leHRSZWR1Y2VyO1xuICAgIGRpc3BhdGNoKHsgdHlwZTogQWN0aW9uVHlwZXMuSU5JVCB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbnRlcm9wZXJhYmlsaXR5IHBvaW50IGZvciBvYnNlcnZhYmxlL3JlYWN0aXZlIGxpYnJhcmllcy5cbiAgICogQHJldHVybnMge29ic2VydmFibGV9IEEgbWluaW1hbCBvYnNlcnZhYmxlIG9mIHN0YXRlIGNoYW5nZXMuXG4gICAqIEZvciBtb3JlIGluZm9ybWF0aW9uLCBzZWUgdGhlIG9ic2VydmFibGUgcHJvcG9zYWw6XG4gICAqIGh0dHBzOi8vZ2l0aHViLmNvbS96ZW5wYXJzaW5nL2VzLW9ic2VydmFibGVcbiAgICovXG4gIGZ1bmN0aW9uIG9ic2VydmFibGUoKSB7XG4gICAgdmFyIF9yZWY7XG5cbiAgICB2YXIgb3V0ZXJTdWJzY3JpYmUgPSBzdWJzY3JpYmU7XG4gICAgcmV0dXJuIF9yZWYgPSB7XG4gICAgICAvKipcbiAgICAgICAqIFRoZSBtaW5pbWFsIG9ic2VydmFibGUgc3Vic2NyaXB0aW9uIG1ldGhvZC5cbiAgICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvYnNlcnZlciBBbnkgb2JqZWN0IHRoYXQgY2FuIGJlIHVzZWQgYXMgYW4gb2JzZXJ2ZXIuXG4gICAgICAgKiBUaGUgb2JzZXJ2ZXIgb2JqZWN0IHNob3VsZCBoYXZlIGEgYG5leHRgIG1ldGhvZC5cbiAgICAgICAqIEByZXR1cm5zIHtzdWJzY3JpcHRpb259IEFuIG9iamVjdCB3aXRoIGFuIGB1bnN1YnNjcmliZWAgbWV0aG9kIHRoYXQgY2FuXG4gICAgICAgKiBiZSB1c2VkIHRvIHVuc3Vic2NyaWJlIHRoZSBvYnNlcnZhYmxlIGZyb20gdGhlIHN0b3JlLCBhbmQgcHJldmVudCBmdXJ0aGVyXG4gICAgICAgKiBlbWlzc2lvbiBvZiB2YWx1ZXMgZnJvbSB0aGUgb2JzZXJ2YWJsZS5cbiAgICAgICAqL1xuICAgICAgc3Vic2NyaWJlOiBmdW5jdGlvbiBzdWJzY3JpYmUob2JzZXJ2ZXIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBvYnNlcnZlciAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdFeHBlY3RlZCB0aGUgb2JzZXJ2ZXIgdG8gYmUgYW4gb2JqZWN0LicpO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gb2JzZXJ2ZVN0YXRlKCkge1xuICAgICAgICAgIGlmIChvYnNlcnZlci5uZXh0KSB7XG4gICAgICAgICAgICBvYnNlcnZlci5uZXh0KGdldFN0YXRlKCkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIG9ic2VydmVTdGF0ZSgpO1xuICAgICAgICB2YXIgdW5zdWJzY3JpYmUgPSBvdXRlclN1YnNjcmliZShvYnNlcnZlU3RhdGUpO1xuICAgICAgICByZXR1cm4geyB1bnN1YnNjcmliZTogdW5zdWJzY3JpYmUgfTtcbiAgICAgIH1cbiAgICB9LCBfcmVmW19zeW1ib2xPYnNlcnZhYmxlMlsnZGVmYXVsdCddXSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH0sIF9yZWY7XG4gIH1cblxuICAvLyBXaGVuIGEgc3RvcmUgaXMgY3JlYXRlZCwgYW4gXCJJTklUXCIgYWN0aW9uIGlzIGRpc3BhdGNoZWQgc28gdGhhdCBldmVyeVxuICAvLyByZWR1Y2VyIHJldHVybnMgdGhlaXIgaW5pdGlhbCBzdGF0ZS4gVGhpcyBlZmZlY3RpdmVseSBwb3B1bGF0ZXNcbiAgLy8gdGhlIGluaXRpYWwgc3RhdGUgdHJlZS5cbiAgZGlzcGF0Y2goeyB0eXBlOiBBY3Rpb25UeXBlcy5JTklUIH0pO1xuXG4gIHJldHVybiBfcmVmMiA9IHtcbiAgICBkaXNwYXRjaDogZGlzcGF0Y2gsXG4gICAgc3Vic2NyaWJlOiBzdWJzY3JpYmUsXG4gICAgZ2V0U3RhdGU6IGdldFN0YXRlLFxuICAgIHJlcGxhY2VSZWR1Y2VyOiByZXBsYWNlUmVkdWNlclxuICB9LCBfcmVmMltfc3ltYm9sT2JzZXJ2YWJsZTJbJ2RlZmF1bHQnXV0gPSBvYnNlcnZhYmxlLCBfcmVmMjtcbn0iLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5leHBvcnRzLmNvbXBvc2UgPSBleHBvcnRzLmFwcGx5TWlkZGxld2FyZSA9IGV4cG9ydHMuYmluZEFjdGlvbkNyZWF0b3JzID0gZXhwb3J0cy5jb21iaW5lUmVkdWNlcnMgPSBleHBvcnRzLmNyZWF0ZVN0b3JlID0gdW5kZWZpbmVkO1xuXG52YXIgX2NyZWF0ZVN0b3JlID0gcmVxdWlyZSgnLi9jcmVhdGVTdG9yZScpO1xuXG52YXIgX2NyZWF0ZVN0b3JlMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2NyZWF0ZVN0b3JlKTtcblxudmFyIF9jb21iaW5lUmVkdWNlcnMgPSByZXF1aXJlKCcuL2NvbWJpbmVSZWR1Y2VycycpO1xuXG52YXIgX2NvbWJpbmVSZWR1Y2VyczIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jb21iaW5lUmVkdWNlcnMpO1xuXG52YXIgX2JpbmRBY3Rpb25DcmVhdG9ycyA9IHJlcXVpcmUoJy4vYmluZEFjdGlvbkNyZWF0b3JzJyk7XG5cbnZhciBfYmluZEFjdGlvbkNyZWF0b3JzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2JpbmRBY3Rpb25DcmVhdG9ycyk7XG5cbnZhciBfYXBwbHlNaWRkbGV3YXJlID0gcmVxdWlyZSgnLi9hcHBseU1pZGRsZXdhcmUnKTtcblxudmFyIF9hcHBseU1pZGRsZXdhcmUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfYXBwbHlNaWRkbGV3YXJlKTtcblxudmFyIF9jb21wb3NlID0gcmVxdWlyZSgnLi9jb21wb3NlJyk7XG5cbnZhciBfY29tcG9zZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jb21wb3NlKTtcblxudmFyIF93YXJuaW5nID0gcmVxdWlyZSgnLi91dGlscy93YXJuaW5nJyk7XG5cbnZhciBfd2FybmluZzIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF93YXJuaW5nKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgJ2RlZmF1bHQnOiBvYmogfTsgfVxuXG4vKlxuKiBUaGlzIGlzIGEgZHVtbXkgZnVuY3Rpb24gdG8gY2hlY2sgaWYgdGhlIGZ1bmN0aW9uIG5hbWUgaGFzIGJlZW4gYWx0ZXJlZCBieSBtaW5pZmljYXRpb24uXG4qIElmIHRoZSBmdW5jdGlvbiBoYXMgYmVlbiBtaW5pZmllZCBhbmQgTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJywgd2FybiB0aGUgdXNlci5cbiovXG5mdW5jdGlvbiBpc0NydXNoZWQoKSB7fVxuXG5pZiAoXCJkZXZlbG9wbWVudFwiICE9PSAncHJvZHVjdGlvbicgJiYgdHlwZW9mIGlzQ3J1c2hlZC5uYW1lID09PSAnc3RyaW5nJyAmJiBpc0NydXNoZWQubmFtZSAhPT0gJ2lzQ3J1c2hlZCcpIHtcbiAgKDAsIF93YXJuaW5nMlsnZGVmYXVsdCddKSgnWW91IGFyZSBjdXJyZW50bHkgdXNpbmcgbWluaWZpZWQgY29kZSBvdXRzaWRlIG9mIE5PREVfRU5WID09PSBcXCdwcm9kdWN0aW9uXFwnLiAnICsgJ1RoaXMgbWVhbnMgdGhhdCB5b3UgYXJlIHJ1bm5pbmcgYSBzbG93ZXIgZGV2ZWxvcG1lbnQgYnVpbGQgb2YgUmVkdXguICcgKyAnWW91IGNhbiB1c2UgbG9vc2UtZW52aWZ5IChodHRwczovL2dpdGh1Yi5jb20vemVydG9zaC9sb29zZS1lbnZpZnkpIGZvciBicm93c2VyaWZ5ICcgKyAnb3IgRGVmaW5lUGx1Z2luIGZvciB3ZWJwYWNrIChodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzMwMDMwMDMxKSAnICsgJ3RvIGVuc3VyZSB5b3UgaGF2ZSB0aGUgY29ycmVjdCBjb2RlIGZvciB5b3VyIHByb2R1Y3Rpb24gYnVpbGQuJyk7XG59XG5cbmV4cG9ydHMuY3JlYXRlU3RvcmUgPSBfY3JlYXRlU3RvcmUyWydkZWZhdWx0J107XG5leHBvcnRzLmNvbWJpbmVSZWR1Y2VycyA9IF9jb21iaW5lUmVkdWNlcnMyWydkZWZhdWx0J107XG5leHBvcnRzLmJpbmRBY3Rpb25DcmVhdG9ycyA9IF9iaW5kQWN0aW9uQ3JlYXRvcnMyWydkZWZhdWx0J107XG5leHBvcnRzLmFwcGx5TWlkZGxld2FyZSA9IF9hcHBseU1pZGRsZXdhcmUyWydkZWZhdWx0J107XG5leHBvcnRzLmNvbXBvc2UgPSBfY29tcG9zZTJbJ2RlZmF1bHQnXTsiLCIndXNlIHN0cmljdCc7XG5cbmV4cG9ydHMuX19lc01vZHVsZSA9IHRydWU7XG5leHBvcnRzWydkZWZhdWx0J10gPSB3YXJuaW5nO1xuLyoqXG4gKiBQcmludHMgYSB3YXJuaW5nIGluIHRoZSBjb25zb2xlIGlmIGl0IGV4aXN0cy5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbWVzc2FnZSBUaGUgd2FybmluZyBtZXNzYWdlLlxuICogQHJldHVybnMge3ZvaWR9XG4gKi9cbmZ1bmN0aW9uIHdhcm5pbmcobWVzc2FnZSkge1xuICAvKiBlc2xpbnQtZGlzYWJsZSBuby1jb25zb2xlICovXG4gIGlmICh0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIGNvbnNvbGUuZXJyb3IgPT09ICdmdW5jdGlvbicpIHtcbiAgICBjb25zb2xlLmVycm9yKG1lc3NhZ2UpO1xuICB9XG4gIC8qIGVzbGludC1lbmFibGUgbm8tY29uc29sZSAqL1xuICB0cnkge1xuICAgIC8vIFRoaXMgZXJyb3Igd2FzIHRocm93biBhcyBhIGNvbnZlbmllbmNlIHNvIHRoYXQgaWYgeW91IGVuYWJsZVxuICAgIC8vIFwiYnJlYWsgb24gYWxsIGV4Y2VwdGlvbnNcIiBpbiB5b3VyIGNvbnNvbGUsXG4gICAgLy8gaXQgd291bGQgcGF1c2UgdGhlIGV4ZWN1dGlvbiBhdCB0aGlzIGxpbmUuXG4gICAgdGhyb3cgbmV3IEVycm9yKG1lc3NhZ2UpO1xuICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLWVtcHR5ICovXG4gIH0gY2F0Y2ggKGUpIHt9XG4gIC8qIGVzbGludC1lbmFibGUgbm8tZW1wdHkgKi9cbn0iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vbGliL2luZGV4Jyk7XG4iLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfcG9ueWZpbGwgPSByZXF1aXJlKCcuL3BvbnlmaWxsJyk7XG5cbnZhciBfcG9ueWZpbGwyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcG9ueWZpbGwpO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyAnZGVmYXVsdCc6IG9iaiB9OyB9XG5cbnZhciByb290OyAvKiBnbG9iYWwgd2luZG93ICovXG5cblxuaWYgKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJykge1xuICByb290ID0gc2VsZjtcbn0gZWxzZSBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgcm9vdCA9IHdpbmRvdztcbn0gZWxzZSBpZiAodHlwZW9mIGdsb2JhbCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgcm9vdCA9IGdsb2JhbDtcbn0gZWxzZSBpZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgcm9vdCA9IG1vZHVsZTtcbn0gZWxzZSB7XG4gIHJvb3QgPSBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xufVxuXG52YXIgcmVzdWx0ID0gKDAsIF9wb255ZmlsbDJbJ2RlZmF1bHQnXSkocm9vdCk7XG5leHBvcnRzWydkZWZhdWx0J10gPSByZXN1bHQ7IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcblx0dmFsdWU6IHRydWVcbn0pO1xuZXhwb3J0c1snZGVmYXVsdCddID0gc3ltYm9sT2JzZXJ2YWJsZVBvbnlmaWxsO1xuZnVuY3Rpb24gc3ltYm9sT2JzZXJ2YWJsZVBvbnlmaWxsKHJvb3QpIHtcblx0dmFyIHJlc3VsdDtcblx0dmFyIF9TeW1ib2wgPSByb290LlN5bWJvbDtcblxuXHRpZiAodHlwZW9mIF9TeW1ib2wgPT09ICdmdW5jdGlvbicpIHtcblx0XHRpZiAoX1N5bWJvbC5vYnNlcnZhYmxlKSB7XG5cdFx0XHRyZXN1bHQgPSBfU3ltYm9sLm9ic2VydmFibGU7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJlc3VsdCA9IF9TeW1ib2woJ29ic2VydmFibGUnKTtcblx0XHRcdF9TeW1ib2wub2JzZXJ2YWJsZSA9IHJlc3VsdDtcblx0XHR9XG5cdH0gZWxzZSB7XG5cdFx0cmVzdWx0ID0gJ0BAb2JzZXJ2YWJsZSc7XG5cdH1cblxuXHRyZXR1cm4gcmVzdWx0O1xufTsiLCIndXNlIHN0cmljdCc7T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsJ19fZXNNb2R1bGUnLHt2YWx1ZTp0cnVlfSk7dmFyIF9yZWR1eD1yZXF1aXJlKCdyZWR1eCcpO3ZhciBfcmVkdXhUaHVuaz1yZXF1aXJlKCdyZWR1eC10aHVuaycpO3ZhciBfcmVkdXhUaHVuazI9X2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcmVkdXhUaHVuayk7ZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmope3JldHVybiBvYmomJm9iai5fX2VzTW9kdWxlP29iajp7ZGVmYXVsdDpvYmp9fXZhciBjb25maWd1cmVTdG9yZT1mdW5jdGlvbiBjb25maWd1cmVTdG9yZShyZWR1Y2VyKXt2YXIgbWlkZGxld2FyZXM9W19yZWR1eFRodW5rMi5kZWZhdWx0XTtpZihcImRldmVsb3BtZW50XCI9PT0nZGV2ZWxvcG1lbnQnKXt2YXIgX3JlcXVpcmU9cmVxdWlyZSgncmVkdXgtbG9nZ2VyJyksY3JlYXRlTG9nZ2VyPV9yZXF1aXJlLmNyZWF0ZUxvZ2dlcjttaWRkbGV3YXJlcy5wdXNoKGNyZWF0ZUxvZ2dlcigpKX12YXIgc3RvcmU9KDAsX3JlZHV4LmNyZWF0ZVN0b3JlKShyZWR1Y2VyLF9yZWR1eC5hcHBseU1pZGRsZXdhcmUuYXBwbHkodW5kZWZpbmVkLG1pZGRsZXdhcmVzKSk7cmV0dXJuIHN0b3JlfTtleHBvcnRzLmRlZmF1bHQ9Y29uZmlndXJlU3RvcmU7IiwiXCJ1c2Ugc3RyaWN0XCI7T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOnRydWV9KTt2YXIgY291bnRyeUJvcmRlcnM9ZXhwb3J0cy5jb3VudHJ5Qm9yZGVycz17XCJmZWF0dXJlc1wiOlt7XCJnZW9tZXRyeVwiOntcImNvb3JkaW5hdGVzXCI6W10sXCJ0eXBlXCI6XCJQb2x5Z29uXCJ9LFwidHlwZVwiOlwiRmVhdHVyZVwiLFwicHJvcGVydGllc1wiOntcImlzbzJcIjpcIkFEXCIsXCJsbmdcIjoxLjUsXCJsYXRcIjo0Mi41fX0se1wiZ2VvbWV0cnlcIjp7XCJjb29yZGluYXRlc1wiOltbWzE5LjQsNDFdLFsxOS41LDQxLjNdLFsxOS41LDQxLjZdLFsxOS42LDQxLjddLFsxOS41LDQxLjhdLFsxOS40LDQxLjldLFsxOS4zLDQxLjldLFsxOS40LDQyLjFdLFsxOS41LDQyLjRdLFsxOS42LDQyLjZdLFsxOS43LDQyLjddLFsxOS43LDQyLjVdLFsxOS45LDQyLjVdLFsyMC4xLDQyLjZdLFsyMC4yLDQyLjVdLFsyMC4yLDQyLjNdLFsyMC40LDQyLjNdLFsyMC41LDQyLjJdLFsyMC42LDQxLjldLFsyMC41LDQxLjddLFsyMC41LDQxLjVdLFsyMC41LDQxLjRdLFsyMC41LDQxLjJdLFsyMC42LDQxLjFdLFsyMC43LDQwLjldLFsyMC45LDQwLjldLFsyMSw0MC44XSxbMjEuMSw0MC43XSxbMjEsNDAuNl0sWzIwLjksNDAuNV0sWzIwLjgsNDAuNF0sWzIwLjcsNDAuM10sWzIwLjcsNDAuMV0sWzIwLjUsNDAuMV0sWzIwLjMsNDBdLFsyMC40LDM5LjldLFsyMC4zLDM5LjhdLFsyMC4yLDM5LjZdLFsyMC4xLDM5LjddLFsyMCwzOS44XSxbMTkuOSwzOS45XSxbMTkuOCw0MC4xXSxbMTkuNiw0MC4xXSxbMTkuNCw0MC4yXSxbMTkuMyw0MC40XSxbMTkuNSw0MC4zXSxbMTkuNSw0MC42XSxbMTkuMyw0MC42XSxbMTkuNCw0MC43XSxbMTkuNCw0MC45XSxbMTkuNSw0MV0sWzE5LjQsNDFdXV0sXCJ0eXBlXCI6XCJQb2x5Z29uXCJ9LFwidHlwZVwiOlwiRmVhdHVyZVwiLFwicHJvcGVydGllc1wiOntcImlzbzJcIjpcIkFMXCIsXCJsbmdcIjoyMCxcImxhdFwiOjQxfX0se1wiZ2VvbWV0cnlcIjp7XCJjb29yZGluYXRlc1wiOltbW1s0NS4yLDQxLjJdLFs0NS4xLDQxLjFdLFs0NS40LDQxXSxbNDUuNiw0MC44XSxbNDUuNSw0MC43XSxbNDUuNCw0MC42XSxbNDUuNiw0MC40XSxbNDUuOSw0MC4zXSxbNDYsNDAuMl0sWzQ1LjksNDBdLFs0NS43LDQwXSxbNDUuOCwzOS45XSxbNDUuOSwzOS44XSxbNDYsMzkuN10sWzQ2LjIsMzkuNl0sWzQ2LjQsMzkuNl0sWzQ2LjUsMzkuNV0sWzQ2LjQsMzkuNF0sWzQ2LjYsMzkuMl0sWzQ2LjQsMzkuMl0sWzQ2LjUsMzldLFs0Ni40LDM4LjldLFs0Ni4yLDM4LjldLFs0Ni4xLDM4LjldLFs0NiwzOS4zXSxbNDUuOCwzOS40XSxbNDUuOCwzOS42XSxbNDUuNiwzOS42XSxbNDUuNSwzOS41XSxbNDUuMywzOS42XSxbNDUsMzkuOF0sWzQ0LjksMzkuN10sWzQ0LjcsMzkuN10sWzQ0LjYsMzkuOV0sWzQ0LjUsNDBdLFs0NC4zLDQwXSxbNDQsNDBdLFs0My43LDQwLjFdLFs0My43LDQwLjJdLFs0My42LDQwLjRdLFs0My43LDQwLjVdLFs0My43LDQwLjddLFs0My43LDQwLjhdLFs0My42LDQxXSxbNDMuNSw0MS4xXSxbNDMuNyw0MS4xXSxbNDMuOCw0MS4yXSxbNDQsNDEuMl0sWzQ0LjIsNDEuMl0sWzQ0LjQsNDEuMl0sWzQ0LjYsNDEuMl0sWzQ0LjgsNDEuMl0sWzQ1LDQxLjNdLFs0NS4xLDQxLjJdLFs0NS4yLDQxLjJdXV0sW11dLFwidHlwZVwiOlwiTXVsdGlQb2x5Z29uXCJ9LFwidHlwZVwiOlwiRmVhdHVyZVwiLFwicHJvcGVydGllc1wiOntcImlzbzJcIjpcIkFNXCIsXCJsbmdcIjo0NSxcImxhdFwiOjQwfX0se1wiZ2VvbWV0cnlcIjp7XCJjb29yZGluYXRlc1wiOltbWzEzLjgsNDguOF0sWzE0LjIsNDguNl0sWzE0LjYsNDguNl0sWzE0LjksNDguOF0sWzE1LjEsNDldLFsxNS41LDQ5XSxbMTUuOCw0OC45XSxbMTYuNCw0OC43XSxbMTYuNyw0OC44XSxbMTYuOSw0OC42XSxbMTYuOSw0OC4zXSxbMTcuMSw0OC4xXSxbMTcuMSw0Ny44XSxbMTYuOCw0Ny43XSxbMTYuNCw0Ny43XSxbMTYuNyw0Ny41XSxbMTYuNCw0Ny4yXSxbMTYuMyw0N10sWzE1LjgsNDYuN10sWzE1LjEsNDYuNl0sWzE0LjgsNDYuNV0sWzEzLjksNDYuNV0sWzEzLjYsNDYuNl0sWzEyLjgsNDYuN10sWzEyLjUsNDYuN10sWzEyLjEsNDddLFsxMS44LDQ3XSxbMTEuMiw0N10sWzEwLjksNDYuOF0sWzEwLjYsNDYuOF0sWzEwLjMsNDYuOV0sWzkuOSw0Ni45XSxbOS42LDQ3LjJdLFs5LjcsNDcuNV0sWzEwLDQ3LjVdLFsxMC40LDQ3LjRdLFsxMC40LDQ3LjZdLFsxMC45LDQ3LjVdLFsxMS41LDQ3LjVdLFsxMiw0Ny42XSxbMTIuNSw0Ny43XSxbMTIuNyw0Ny43XSxbMTMuMSw0Ny42XSxbMTIuOSw0Ny44XSxbMTIuOCw0OF0sWzEzLjIsNDguM10sWzEzLjQsNDguNV0sWzEzLjcsNDguNl0sWzEzLjgsNDguOF1dXSxcInR5cGVcIjpcIlBvbHlnb25cIn0sXCJ0eXBlXCI6XCJGZWF0dXJlXCIsXCJwcm9wZXJ0aWVzXCI6e1wiaXNvMlwiOlwiQVRcIixcImxuZ1wiOjEzLjMsXCJsYXRcIjo0Ny4zfX0se1wiZ2VvbWV0cnlcIjp7XCJjb29yZGluYXRlc1wiOltbW1s0Ni42LDQxLjldLFs0Ni45LDQxLjddLFs0Ny4zLDQxLjRdLFs0Ny43LDQxLjJdLFs0OCw0MS40XSxbNDguNSw0MS44XSxbNDguOCw0MS43XSxbNDkuMSw0MS4zXSxbNDkuMiw0MV0sWzQ5LjUsNDAuN10sWzQ5LjksNDAuNl0sWzUwLjQsNDAuNF0sWzUwLjEsNDAuNF0sWzQ5LjUsNDAuMl0sWzQ5LjQsMzkuOV0sWzQ5LjMsMzkuNF0sWzQ5LjIsMzkuM10sWzQ5LjEsMzkuMV0sWzQ5LDM5XSxbNDguOSwzOC41XSxbNDguNywzOC40XSxbNDguMywzOC42XSxbNDguMSwzOC44XSxbNDguMiwzOV0sWzQ4LjEsMzkuMl0sWzQ4LjMsMzkuNF0sWzQ4LjIsMzkuNl0sWzQ3LjgsMzkuN10sWzQ3LjMsMzkuNF0sWzQ2LjksMzkuMl0sWzQ2LjcsMzldLFs0Ni41LDM5LjFdLFs0Ni42LDM5LjNdLFs0Ni41LDM5LjZdLFs0Ni4xLDM5LjddLFs0NS44LDM5LjhdLFs0NS42LDQwXSxbNDYsNDAuM10sWzQ1LjUsNDAuNV0sWzQ1LjUsNDAuOF0sWzQ1LjMsNDFdLFs0NS4xLDQxLjJdLFs0NS4xLDQxLjRdLFs0NS40LDQxLjVdLFs0NS45LDQxLjJdLFs0Ni4zLDQxLjJdLFs0Ni41LDQxXSxbNDYuNyw0MS4zXSxbNDYuMiw0MS42XSxbNDYuNCw0MS44XSxbNDYuNiw0MS45XV1dLFtbWzQ1LjEsMzkuOF0sWzQ1LjMsMzkuNl0sWzQ1LjMsMzkuNV0sWzQ1LjUsMzkuNV0sWzQ1LjYsMzkuNV0sWzQ1LjYsMzkuNl0sWzQ1LjcsMzkuNl0sWzQ1LjgsMzkuNl0sWzQ1LjgsMzkuNV0sWzQ1LjgsMzkuNF0sWzQ1LjksMzkuM10sWzQ2LDM5LjNdLFs0NiwzOS4yXSxbNDYuMSwzOC45XSxbNDYuMiwzOC44XSxbNDYsMzguOV0sWzQ1LjgsMzguOV0sWzQ1LjYsMzldLFs0NS41LDM5XSxbNDUuNCwzOV0sWzQ1LjQsMzkuMV0sWzQ1LjMsMzkuMl0sWzQ1LjIsMzkuMl0sWzQ1LjEsMzkuMl0sWzQ1LjEsMzkuM10sWzQ1LjEsMzkuNF0sWzQ1LDM5LjRdLFs0NC45LDM5LjVdLFs0NC45LDM5LjZdLFs0NC44LDM5LjZdLFs0NC44LDM5LjddLFs0NC45LDM5LjddLFs0NSwzOS43XSxbNDUsMzkuOF0sWzQ1LjEsMzkuOF1dXSxbXSxbXV0sXCJ0eXBlXCI6XCJNdWx0aVBvbHlnb25cIn0sXCJ0eXBlXCI6XCJGZWF0dXJlXCIsXCJwcm9wZXJ0aWVzXCI6e1wiaXNvMlwiOlwiQVpcIixcImxuZ1wiOjQ3LjUsXCJsYXRcIjo0MC41fX0se1wiZ2VvbWV0cnlcIjp7XCJjb29yZGluYXRlc1wiOltbWzE3LjYsNDIuOV0sWzE3LjQsNDMuMl0sWzE3LjMsNDMuNV0sWzE3LDQzLjVdLFsxNi44LDQzLjddLFsxNi42LDQzLjldLFsxNi40LDQ0LjFdLFsxNi4yLDQ0LjJdLFsxNi4yLDQ0LjRdLFsxNiw0NC43XSxbMTUuNyw0NC44XSxbMTUuOCw0NS4yXSxbMTYuMSw0NS4xXSxbMTYuNCw0NV0sWzE2LjYsNDUuMl0sWzE2LjksNDUuM10sWzE3LjIsNDUuMV0sWzE3LjUsNDUuMV0sWzE3LjgsNDUuMV0sWzE4LjEsNDUuMV0sWzE4LjQsNDUuMV0sWzE4LjgsNDQuOV0sWzE5LjEsNDQuOV0sWzE5LjQsNDQuOV0sWzE5LjIsNDQuNl0sWzE5LjEsNDQuM10sWzE5LjUsNDQuMV0sWzE5LjUsNDRdLFsxOS4yLDQ0XSxbMTkuNSw0My44XSxbMTkuNCw0My42XSxbMTksNDMuNl0sWzE5LDQzLjRdLFsxOSw0My4yXSxbMTguOCw0My4zXSxbMTguNyw0My4xXSxbMTguNSw0M10sWzE4LjYsNDIuN10sWzE4LjQsNDIuNl0sWzE4LjIsNDIuN10sWzE3LjgsNDIuOV0sWzE3LjYsNDIuOV1dXSxcInR5cGVcIjpcIlBvbHlnb25cIn0sXCJ0eXBlXCI6XCJGZWF0dXJlXCIsXCJwcm9wZXJ0aWVzXCI6e1wiaXNvMlwiOlwiQkFcIixcImxuZ1wiOjE4LFwibGF0XCI6NDR9fSx7XCJnZW9tZXRyeVwiOntcImNvb3JkaW5hdGVzXCI6W1tbNC4zLDUxLjNdLFs0LjQsNTEuNF0sWzQuNSw1MS41XSxbNC41LDUxLjRdLFs0LjcsNTEuNF0sWzQuOCw1MS41XSxbNC45LDUxLjRdLFs1LDUxLjVdLFs1LjEsNTEuNF0sWzUuMiw1MS4zXSxbNS40LDUxLjNdLFs1LjYsNTEuM10sWzUuOCw1MS4yXSxbNS45LDUxLjFdLFs1LjgsNTFdLFs1LjYsNTAuOV0sWzUuNyw1MC44XSxbNS45LDUwLjhdLFs2LjEsNTAuN10sWzYuMyw1MC42XSxbNi4zLDUwLjVdLFs2LjQsNTAuM10sWzYuMiw1MC4yXSxbNi4xLDUwLjFdLFs1LjksNTAuMV0sWzUuNyw0OS45XSxbNS44LDQ5LjhdLFs1LjksNDkuNl0sWzUuOCw0OS41XSxbNS42LDQ5LjVdLFs1LjQsNDkuNl0sWzUsNDkuOF0sWzQuOCw1MF0sWzQuOSw1MC4xXSxbNC44LDUwLjJdLFs0LjcsNTBdLFs0LjQsNDkuOV0sWzQuMiw1MF0sWzQuMiw1MC4xXSxbNC4yLDUwLjNdLFs0LDUwLjNdLFszLjgsNTAuNF0sWzMuNyw1MC41XSxbMy41LDUwLjVdLFszLjMsNTAuNV0sWzMuMiw1MC44XSxbMyw1MC44XSxbMi44LDUwLjhdLFsyLjYsNTAuOV0sWzIuNSw1MS4xXSxbMi45LDUxLjJdLFszLDUxLjNdLFszLjIsNTEuM10sWzMuNCw1MS4zXSxbMy41LDUxLjJdLFszLjYsNTEuM10sWzMuOCw1MS4zXSxbMy45LDUxLjJdLFs0LjEsNTEuM10sWzQuMiw1MS40XSxbNC4zLDUxLjNdXV0sXCJ0eXBlXCI6XCJQb2x5Z29uXCJ9LFwidHlwZVwiOlwiRmVhdHVyZVwiLFwicHJvcGVydGllc1wiOntcImlzbzJcIjpcIkJFXCIsXCJsbmdcIjo0LFwibGF0XCI6NTAuOH19LHtcImdlb21ldHJ5XCI6e1wiY29vcmRpbmF0ZXNcIjpbW1syNy45LDQyLjhdLFsyNy42LDQyLjZdLFsyNy41LDQyLjRdLFsyNy44LDQyLjJdLFsyOCw0Ml0sWzI3LjYsNDJdLFsyNy4zLDQyLjFdLFsyNyw0Ml0sWzI2LjUsNDEuOF0sWzI2LjQsNDEuN10sWzI2LjIsNDEuNV0sWzI1LjksNDEuM10sWzI1LjUsNDEuM10sWzI1LjEsNDEuNF0sWzI0LjYsNDEuNF0sWzI0LjMsNDEuNl0sWzI0LjEsNDEuNV0sWzIzLjcsNDEuNF0sWzIzLjMsNDEuNF0sWzIzLDQxLjNdLFsyMyw0MS42XSxbMjIuOSw0MS45XSxbMjIuNSw0Mi4xXSxbMjIuNiw0Mi41XSxbMjIuNCw0Mi44XSxbMjMsNDMuMV0sWzIyLjgsNDMuNF0sWzIyLjUsNDMuNV0sWzIyLjUsNDQuMV0sWzIyLjksNDQuMV0sWzIyLjgsNDMuOV0sWzIzLjEsNDMuOF0sWzIzLjQsNDMuOV0sWzI0LDQzLjddLFsyNC40LDQzLjddLFsyNC42LDQzLjddLFsyNSw0My43XSxbMjUuNCw0My42XSxbMjUuOCw0My43XSxbMjYuMSw0NF0sWzI2LjcsNDQuMV0sWzI3LjEsNDQuMV0sWzI3LjUsNDRdLFsyNy45LDQ0XSxbMjguMSw0My44XSxbMjguNSw0My43XSxbMjguNiw0My40XSxbMjguMiw0My40XSxbMjcuOSw0My4yXSxbMjcuOSw0Mi44XV1dLFwidHlwZVwiOlwiUG9seWdvblwifSxcInR5cGVcIjpcIkZlYXR1cmVcIixcInByb3BlcnRpZXNcIjp7XCJpc28yXCI6XCJCR1wiLFwibG5nXCI6MjUsXCJsYXRcIjo0M319LHtcImdlb21ldHJ5XCI6e1wiY29vcmRpbmF0ZXNcIjpbW1syNi42LDU1LjddLFsyNyw1NS44XSxbMjcuNiw1NS44XSxbMjcuOSw1Ni4xXSxbMjguMyw1Nl0sWzI4LjcsNTZdLFsyOS4xLDU2XSxbMjkuNCw1NS44XSxbMzAsNTUuOV0sWzMwLjgsNTUuNl0sWzMwLjksNTUuMl0sWzMwLjksNTQuOV0sWzMxLjEsNTQuNl0sWzMxLjMsNTQuMl0sWzMxLjksNTRdLFszMi4xLDUzLjhdLFszMi41LDUzLjZdLFszMi41LDUzLjJdLFszMiw1My4xXSxbMzEuNCw1My4yXSxbMzEuNSw1Mi45XSxbMzEuNiw1Mi41XSxbMzEuOCw1Mi4xXSxbMzEuMyw1Mi4xXSxbMzEsNTJdLFszMC42LDUxLjZdLFszMC40LDUxLjRdLFsyOS45LDUxLjVdLFsyOS40LDUxLjRdLFsyOS4xLDUxLjZdLFsyOC43LDUxLjVdLFsyOC4zLDUxLjZdLFsyOCw1MS42XSxbMjcuNyw1MS42XSxbMjcuMiw1MS43XSxbMjYuOSw1MS44XSxbMjYuNCw1MS44XSxbMjYsNTEuOV0sWzI1LjQsNTEuOV0sWzI1LDUxLjldLFsyNC4zLDUxLjddLFsyMy43LDUxLjddLFsyMy41LDUxLjddLFsyMy43LDUyXSxbMjMuMiw1Mi4zXSxbMjMuNyw1Mi42XSxbMjMuOSw1M10sWzIzLjYsNTMuN10sWzIzLjgsNTMuOV0sWzI0LjIsNTRdLFsyNC41LDU0XSxbMjQuOSw1NC4xXSxbMjUuMyw1NC4zXSxbMjUuNSw1NC4yXSxbMjUuOCw1NC4zXSxbMjUuNyw1NC42XSxbMjUuOSw1NC45XSxbMjYuMyw1NS4xXSxbMjYuNiw1NS4zXSxbMjYuNiw1NS43XV1dLFwidHlwZVwiOlwiUG9seWdvblwifSxcInR5cGVcIjpcIkZlYXR1cmVcIixcInByb3BlcnRpZXNcIjp7XCJpc28yXCI6XCJCWVwiLFwibG5nXCI6MjgsXCJsYXRcIjo1M319LHtcImdlb21ldHJ5XCI6e1wiY29vcmRpbmF0ZXNcIjpbW1s3LjcsNDcuNV0sWzgsNDcuNl0sWzguMyw0Ny42XSxbOC42LDQ3LjZdLFs4LjQsNDcuN10sWzguNyw0Ny44XSxbOC45LDQ3LjddLFs5LjMsNDcuN10sWzkuNyw0Ny41XSxbOS41LDQ3LjNdLFs5LjYsNDcuMV0sWzkuOSw0Ni45XSxbMTAuMiw0Ni45XSxbMTAuNCw0N10sWzEwLjUsNDYuNl0sWzEwLjMsNDYuNV0sWzEwLjEsNDYuNl0sWzEwLDQ2LjRdLFsxMC4yLDQ2LjNdLFs5LjksNDYuNF0sWzkuNyw0Ni4zXSxbOS41LDQ2LjRdLFs5LjMsNDYuNV0sWzkuMyw0Ni4zXSxbOS4xLDQ2LjFdLFs5LDQ1LjldLFs4LjksNDUuOV0sWzguOCw0Ni4xXSxbOC42LDQ2LjFdLFs4LjQsNDYuM10sWzguNSw0Ni41XSxbOC4zLDQ2LjRdLFs4LjEsNDYuMV0sWzcuOSw0NS45XSxbNy43LDQ2XSxbNy41LDQ1LjldLFs3LjIsNDUuOV0sWzcsNDZdLFs2LjgsNDYuMl0sWzYuNyw0Ni41XSxbNi4zLDQ2LjRdLFs2LjMsNDYuM10sWzYsNDYuMV0sWzYuMSw0Ni4yXSxbNi4xLDQ2LjZdLFs2LjQsNDYuOF0sWzYuNSw0N10sWzYuNyw0Ny4xXSxbNyw0Ny4zXSxbNyw0Ny41XSxbNy4zLDQ3LjRdLFs3LjUsNDcuNV0sWzcuNyw0Ny42XSxbNy43LDQ3LjVdXV0sXCJ0eXBlXCI6XCJQb2x5Z29uXCJ9LFwidHlwZVwiOlwiRmVhdHVyZVwiLFwicHJvcGVydGllc1wiOntcImlzbzJcIjpcIkNIXCIsXCJsbmdcIjo4LFwibGF0XCI6NDd9fSx7XCJnZW9tZXRyeVwiOntcImNvb3JkaW5hdGVzXCI6W1tbMzMuNywzNS40XSxbMzMuOSwzNS40XSxbMzQuMywzNS42XSxbMzQuNSwzNS43XSxbMzQuNiwzNS42XSxbMzQuMywzNS41XSxbMzQuMSwzNS40XSxbMzMuOSwzNS4zXSxbMzQsMzUuMV0sWzM0LjEsMzVdLFszMy45LDM0LjldLFszMy44LDM1XSxbMzMuNiwzNC45XSxbMzMuNSwzNC44XSxbMzMuMywzNC43XSxbMzMuMSwzNC43XSxbMzMsMzQuNl0sWzMyLjksMzQuN10sWzMyLjgsMzQuNl0sWzMyLjcsMzQuN10sWzMyLjUsMzQuN10sWzMyLjQsMzQuOF0sWzMyLjMsMzVdLFszMi40LDM1XSxbMzIuNSwzNS4xXSxbMzIuNiwzNS4yXSxbMzIuOCwzNS4yXSxbMzIuOSwzNS4yXSxbMzIuOSwzNS40XSxbMzMuMywzNS4zXSxbMzMuNSwzNS4zXSxbMzMuNywzNS40XV1dLFwidHlwZVwiOlwiUG9seWdvblwifSxcInR5cGVcIjpcIkZlYXR1cmVcIixcInByb3BlcnRpZXNcIjp7XCJpc28yXCI6XCJDWVwiLFwibG5nXCI6MzMsXCJsYXRcIjozNX19LHtcImdlb21ldHJ5XCI6e1wiY29vcmRpbmF0ZXNcIjpbW1sxNC43LDQ4LjZdLFsxNC40LDQ4LjZdLFsxNC4xLDQ4LjddLFsxMy44LDQ4LjhdLFsxMy42LDQ4LjldLFsxMy40LDQ5XSxbMTMuMiw0OS4yXSxbMTIuOCw0OS4zXSxbMTIuNiw0OS42XSxbMTIuNSw0OS45XSxbMTIuMyw1MF0sWzEyLjIsNTAuMl0sWzEyLjMsNTAuMl0sWzEyLjYsNTAuNF0sWzEyLjgsNTAuNV0sWzEzLjEsNTAuNV0sWzEzLjMsNTAuNl0sWzEzLjUsNTAuN10sWzEzLjksNTAuOF0sWzE0LjMsNTAuOV0sWzE0LjMsNTEuMV0sWzE0LjYsNTAuOV0sWzE0LjgsNTAuOV0sWzE1LjIsNTFdLFsxNS40LDUwLjhdLFsxNS44LDUwLjddLFsxNi4xLDUwLjZdLFsxNi4zLDUwLjddLFsxNi4zLDUwLjVdLFsxNi40LDUwLjRdLFsxNi41LDUwLjJdLFsxNi43LDUwLjFdLFsxNi45LDUwLjJdLFsxNi45LDUwLjNdLFsxNy4yLDUwLjRdLFsxNy40LDUwLjNdLFsxNy44LDUwLjNdLFsxNy42LDUwLjJdLFsxNy44LDUwXSxbMTguMSw1MC4xXSxbMTguNCw0OS45XSxbMTguNiw0OS44XSxbMTguOCw0OS42XSxbMTguNyw0OS41XSxbMTguNCw0OS4zXSxbMTguMiw0OS4yXSxbMTguMSw0OV0sWzE3LjcsNDguOV0sWzE3LjQsNDguOF0sWzE3LjEsNDguOF0sWzE2LjksNDguNl0sWzE2LjcsNDguN10sWzE2LjUsNDguOF0sWzE2LjMsNDguN10sWzE1LjgsNDguOV0sWzE1LjUsNDguOV0sWzE1LjMsNDldLFsxNSw0OV0sWzE0LjksNDguOF0sWzE0LjcsNDguNl1dXSxcInR5cGVcIjpcIlBvbHlnb25cIn0sXCJ0eXBlXCI6XCJGZWF0dXJlXCIsXCJwcm9wZXJ0aWVzXCI6e1wiaXNvMlwiOlwiQ1pcIixcImxuZ1wiOjE1LjUsXCJsYXRcIjo0OS44fX0se1wiZ2VvbWV0cnlcIjp7XCJjb29yZGluYXRlc1wiOltbW1sxMSw1NC40XSxbMTAuOCw1My45XSxbMTEuNiw1NF0sWzEyLjQsNTQuNF0sWzEyLjUsNTQuMl0sWzEzLjcsNTQuMl0sWzE0LjMsNTMuN10sWzE0LjIsNTIuOF0sWzE0LjUsNTIuNF0sWzE0LjcsNTEuN10sWzE1LDUxLjRdLFsxNC42LDUwLjldLFsxNCw1MC44XSxbMTMuMiw1MC42XSxbMTIuNiw1MC40XSxbMTIuMyw1MC4xXSxbMTIuNiw0OS41XSxbMTMuNCw0OV0sWzEzLjgsNDguNl0sWzEzLjQsNDguNF0sWzEzLDQ3LjldLFsxMyw0Ny41XSxbMTIuMiw0Ny42XSxbMTEuMSw0Ny40XSxbMTAuNSw0Ny41XSxbOS43LDQ3LjZdLFs4LjgsNDcuN10sWzguNiw0Ny43XSxbNy44LDQ3LjZdLFs3LjYsNDguMV0sWzguMSw0OC44XSxbNy42LDQ5LjFdLFs2LjksNDkuMl0sWzYuNSw0OS43XSxbNi4xLDUwLjFdLFs2LjMsNTAuNl0sWzUuOSw1MV0sWzYuMiw1MS42XSxbNi42LDUxLjldLFs2LjksNTIuMl0sWzYuOSw1Mi40XSxbNyw1Mi42XSxbNy4yLDUzLjNdLFs3LjIsNTMuNl0sWzgsNTMuN10sWzguMyw1My40XSxbOC41LDUzLjddLFs5LjIsNTMuOV0sWzkuOCw1My41XSxbOC45LDU0LjFdLFs4LjcsNTQuNF0sWzguNyw1NC44XSxbOC40LDU1XSxbOS4zLDU0LjhdLFsxMCw1NC42XSxbMTAuNyw1NC4zXSxbMTEsNTQuNF1dXSxbW1sxMy40LDU0LjZdLFsxMy41LDU0LjZdLFsxMy42LDU0LjZdLFsxMy43LDU0LjZdLFsxMy43LDU0LjVdLFsxMy42LDU0LjVdLFsxMy42LDU0LjRdLFsxMy43LDU0LjRdLFsxMy43LDU0LjNdLFsxMy41LDU0LjNdLFsxMy40LDU0LjNdLFsxMy40LDU0LjJdLFsxMy4zLDU0LjJdLFsxMy4zLDU0LjNdLFsxMy4yLDU0LjNdLFsxMy4xLDU0LjNdLFsxMy4xLDU0LjRdLFsxMy4yLDU0LjRdLFsxMy4zLDU0LjRdLFsxMy4yLDU0LjVdLFsxMy4xLDU0LjVdLFsxMy4yLDU0LjZdLFsxMy4zLDU0LjZdLFsxMy40LDU0LjVdLFsxMy41LDU0LjVdLFsxMy4yLDU0LjddLFsxMy4zLDU0LjddLFsxMy40LDU0LjddLFsxMy40LDU0LjZdXV0sW1tbMTQsNTQuMV0sWzE0LjEsNTRdLFsxNC4yLDUzLjldLFsxNC4xLDUzLjldLFsxNCw1My45XSxbMTQsNTMuOF0sWzEzLjksNTMuOF0sWzEzLjgsNTMuOV0sWzEzLjksNTMuOV0sWzE0LDU0XSxbMTMuOSw1NC4xXSxbMTMuOSw1NF0sWzEzLjgsNTRdLFsxMy44LDU0LjFdLFsxMy44LDU0LjJdLFsxNCw1NC4xXV1dLFtdLFtdLFtdLFtdXSxcInR5cGVcIjpcIk11bHRpUG9seWdvblwifSxcInR5cGVcIjpcIkZlYXR1cmVcIixcInByb3BlcnRpZXNcIjp7XCJpc28yXCI6XCJERVwiLFwibG5nXCI6OSxcImxhdFwiOjUxfX0se1wiZ2VvbWV0cnlcIjp7XCJjb29yZGluYXRlc1wiOltbW1sxMC40LDU3LjZdLFsxMC40LDU3LjVdLFsxMC41LDU3LjVdLFsxMC41LDU3LjRdLFsxMC41LDU3LjJdLFsxMC40LDU3LjJdLFsxMC40LDU3LjFdLFsxMC4zLDU3XSxbMTAuMiw1N10sWzEwLjEsNTddLFsxMCw1Ny4xXSxbOS41LDU3XSxbOS4zLDU3XSxbOS4yLDU3XSxbOS4xLDU3XSxbOS4xLDU3LjFdLFs5LDU3XSxbOC45LDU3XSxbOC44LDU3XSxbOC44LDU2LjldLFs4LjcsNTddLFs4LjcsNTYuOV0sWzguNiw1Ni45XSxbOC42LDU2LjhdLFs4LjUsNTYuOF0sWzguNSw1Ni43XSxbOC40LDU2LjddLFs4LjYsNTYuN10sWzguNiw1Ni42XSxbOC41LDU2LjZdLFs4LjIsNTYuN10sWzguMiw1Ni44XSxbOC4zLDU2LjhdLFs4LjMsNTYuOV0sWzguNCw1Ni45XSxbOC41LDU3XSxbOC42LDU3LjFdLFs4LjcsNTcuMV0sWzguOCw1Ny4xXSxbOC45LDU3LjFdLFs5LDU3LjJdLFs5LjIsNTcuMV0sWzkuMyw1Ny4xXSxbOS40LDU3LjJdLFs5LjUsNTcuMl0sWzkuNiw1Ny4yXSxbOS42LDU3LjNdLFs5LjcsNTcuNF0sWzkuOCw1Ny40XSxbOS44LDU3LjVdLFs5LjksNTcuNl0sWzEwLDU3LjZdLFsxMC4xLDU3LjZdLFsxMC4yLDU3LjZdLFsxMC4zLDU3LjZdLFsxMC40LDU3LjddLFsxMC41LDU3LjddLFsxMC42LDU3LjddLFsxMC41LDU3LjZdLFsxMC40LDU3LjZdXV0sW1tbMTAsNTcuMV0sWzEwLjMsNTddLFsxMC4zLDU2LjddLFs5LjksNTYuNl0sWzEwLjQsNTYuN10sWzEwLjIsNTYuNl0sWzEwLjUsNTYuNV0sWzEwLjksNTYuNV0sWzEwLjcsNTYuMl0sWzEwLjYsNTYuMV0sWzEwLjUsNTYuM10sWzEwLjIsNTYuMV0sWzEwLjMsNTUuOV0sWzEwLjEsNTUuOF0sWzkuOSw1NS44XSxbOS44LDU1LjddLFs5LjgsNTUuNl0sWzkuNyw1NS4zXSxbOS41LDU1LjJdLFs5LjYsNTVdLFs5LjgsNTQuOV0sWzkuNiw1NC45XSxbOS40LDU0LjhdLFs5LjIsNTQuOV0sWzguNyw1NC45XSxbOC42LDU1LjFdLFs4LjYsNTUuMl0sWzguNiw1NS40XSxbOC40LDU1LjVdLFs4LjEsNTUuNV0sWzguMiw1NS44XSxbOC4xLDU2XSxbOC4zLDU1LjldLFs4LjMsNTYuMV0sWzguMSw1Ni4zXSxbOC4yLDU2LjZdLFs4LjQsNTYuNl0sWzguNiw1Ni41XSxbOC44LDU2LjZdLFs4LjksNTYuOF0sWzkuMiw1Ni43XSxbOSw1Ni42XSxbOS4zLDU2LjVdLFs5LjMsNTYuN10sWzkuNCw1N10sWzkuNyw1N10sWzkuOSw1Ny4xXSxbMTAsNTcuMV1dXSxbW1sxMi42LDU2XSxbMTIuNiw1NS45XSxbMTIuNiw1NS43XSxbMTIuNSw1NS42XSxbMTIuMyw1NS42XSxbMTIuMiw1NS40XSxbMTIuNCw1NS40XSxbMTIuNSw1NS4zXSxbMTIuMiw1NS4yXSxbMTIsNTUuMV0sWzEyLjIsNTUuMV0sWzEyLjEsNTVdLFsxMS45LDU1XSxbMTEuNyw1NS4xXSxbMTEuOCw1NS4yXSxbMTEuNiw1NS4yXSxbMTEuNCw1NS4yXSxbMTEuMiw1NS4yXSxbMTEuMiw1NS40XSxbMTEuMSw1NS43XSxbMTAuOSw1NS43XSxbMTEuMyw1NS43XSxbMTEuNSw1NS45XSxbMTEuMyw1Nl0sWzExLjYsNTUuOV0sWzExLjcsNTZdLFsxMS44LDU1LjldLFsxMS44LDU1LjhdLFsxMS45LDU1LjldLFsxMiw1NS44XSxbMTIuMSw1NS43XSxbMTEuOSw1NS43XSxbMTEuOSw1Nl0sWzEyLjMsNTYuMV0sWzEyLjYsNTZdXV0sW1tbMTAuNyw1NS41XSxbMTAuOCw1NS40XSxbMTAuOCw1NS4zXSxbMTAuOCw1NS4yXSxbMTAuOCw1NS4xXSxbMTAuNyw1NS4xXSxbMTAuNiw1NS4xXSxbMTAuNSw1NV0sWzEwLjIsNTUuMV0sWzEwLjEsNTUuMV0sWzEwLjEsNTUuMl0sWzEwLDU1LjJdLFs5LjksNTUuM10sWzkuOCw1NS40XSxbOS44LDU1LjVdLFs5LjcsNTUuNV0sWzkuOSw1NS41XSxbMTAsNTUuNV0sWzEwLjEsNTUuNl0sWzEwLjIsNTUuNl0sWzEwLjMsNTUuNl0sWzEwLjQsNTUuNl0sWzEwLjUsNTUuNV0sWzEwLjQsNTUuNV0sWzEwLjQsNTUuNF0sWzEwLjUsNTUuNF0sWzEwLjYsNTUuNV0sWzEwLjYsNTUuNl0sWzEwLjcsNTUuNl0sWzEwLjcsNTUuNV1dXSxbW1sxMS41LDU0LjhdLFsxMS42LDU0LjhdLFsxMS42LDU0LjldLFsxMS43LDU0LjldLFsxMS44LDU0LjhdLFsxMS45LDU0LjddLFsxMS44LDU0LjddLFsxMS44LDU0LjZdLFsxMS43LDU0LjZdLFsxMS43LDU0LjddLFsxMS42LDU0LjddLFsxMS41LDU0LjZdLFsxMS40LDU0LjZdLFsxMS40LDU0LjddLFsxMS4zLDU0LjddLFsxMS4yLDU0LjddLFsxMS4xLDU0LjddLFsxMSw1NC44XSxbMTEsNTQuOV0sWzExLjEsNTQuOV0sWzExLjEsNTVdLFsxMS4yLDU1XSxbMTEuMyw1NC45XSxbMTEuNCw1NC45XSxbMTEuNSw1NC44XV1dLFtbWzEyLDU0LjldLFsxMi4xLDU0LjldLFsxMi4yLDU0LjhdLFsxMi4xLDU0LjhdLFsxMiw1NC43XSxbMTIsNTQuNl0sWzExLjksNTQuNl0sWzExLjksNTQuN10sWzExLjksNTQuOF0sWzExLjgsNTQuOF0sWzExLjgsNTQuOV0sWzExLjcsNTQuOV0sWzExLjcsNTVdLFsxMS44LDU1XSxbMTEuOSw1NV0sWzExLjksNTQuOV0sWzEyLDU0LjldXV0sW11dLFwidHlwZVwiOlwiTXVsdGlQb2x5Z29uXCJ9LFwidHlwZVwiOlwiRmVhdHVyZVwiLFwicHJvcGVydGllc1wiOntcImlzbzJcIjpcIkRLXCIsXCJsbmdcIjoxMCxcImxhdFwiOjU2fX0se1wiZ2VvbWV0cnlcIjp7XCJjb29yZGluYXRlc1wiOltbW1syNS44LDU5LjZdLFsyNi4xLDU5LjZdLFsyNi41LDU5LjVdLFsyNi43LDU5LjZdLFsyNi45LDU5LjVdLFsyNy4yLDU5LjRdLFsyNy42LDU5LjRdLFsyOCw1OS40XSxbMjguMSw1OS40XSxbMjguMSw1OS4zXSxbMjcuOSw1OS4yXSxbMjcuNyw1OV0sWzI3LjQsNTguOF0sWzI3LjUsNTguNV0sWzI3LjUsNTguMl0sWzI3LjcsNTguMV0sWzI3LjgsNTcuOF0sWzI3LjUsNTcuOF0sWzI3LjQsNTcuNl0sWzI3LjEsNTcuNl0sWzI2LjcsNTcuNl0sWzI2LjUsNTcuNV0sWzI2LDU3LjhdLFsyNS42LDU3LjldLFsyNS4zLDU4LjFdLFsyNS4yLDU4LjFdLFsyNSw1OF0sWzI0LjUsNThdLFsyNC4zLDU3LjldLFsyNC41LDU4LjJdLFsyNC41LDU4LjRdLFsyNC4zLDU4LjNdLFsyNC4xLDU4LjNdLFsyMy44LDU4LjRdLFsyMy42LDU4LjVdLFsyMy42LDU4LjddLFsyMy44LDU4LjhdLFsyMy40LDU4LjldLFsyMy42LDU5XSxbMjMuNCw1OS4xXSxbMjMuNiw1OS4yXSxbMjMuOCw1OS4zXSxbMjQsNTkuNF0sWzI0LjMsNTkuNF0sWzI0LjUsNTkuNV0sWzI0LjgsNTkuNl0sWzI1LjIsNTkuNV0sWzI1LjUsNTkuNl0sWzI1LjcsNTkuNl0sWzI1LjgsNTkuNl1dXSxbW1syMyw1OC42XSxbMjMuMSw1OC42XSxbMjMuMyw1OC41XSxbMjMuMyw1OC40XSxbMjMuMiw1OC40XSxbMjMuMSw1OC40XSxbMjMsNTguNF0sWzIyLjgsNTguMl0sWzIyLjYsNTguMl0sWzIyLjUsNTguMl0sWzIyLjQsNTguMl0sWzIyLjMsNTguMl0sWzIyLjMsNTguMV0sWzIyLjIsNThdLFsyMi4xLDU3LjldLFsyMiw1Ny45XSxbMjIsNThdLFsyMi4xLDU4LjFdLFsyMi4yLDU4LjFdLFsyMi4yLDU4LjJdLFsyMi4xLDU4LjJdLFsyMS45LDU4LjNdLFsyMS44LDU4LjNdLFsyMiw1OC4zXSxbMjIsNTguNF0sWzIxLjksNTguNV0sWzIxLjgsNTguNV0sWzIyLDU4LjVdLFsyMi4xLDU4LjVdLFsyMi4yLDU4LjVdLFsyMi4zLDU4LjZdLFsyMi41LDU4LjZdLFsyMi42LDU4LjZdLFsyMi44LDU4LjZdLFsyMi45LDU4LjZdLFsyMyw1OC42XV1dLFtbWzIyLjcsNTldLFsyMi44LDU5XSxbMjIuOSw1OV0sWzIzLDU5XSxbMjMsNTguOV0sWzIzLDU4LjhdLFsyMi45LDU4LjhdLFsyMi44LDU4LjhdLFsyMi43LDU4LjhdLFsyMi43LDU4LjddLFsyMi42LDU4LjddLFsyMi41LDU4LjddLFsyMi41LDU4LjhdLFsyMi40LDU4LjhdLFsyMi40LDU4LjldLFsyMi4zLDU4LjldLFsyMi4yLDU4LjldLFsyMi4xLDU4LjldLFsyMiw1OC45XSxbMjIuMSw1OV0sWzIyLjQsNTldLFsyMi41LDU5XSxbMjIuNiw1OS4xXSxbMjIuNyw1OS4xXSxbMjIuNyw1OV1dXSxbXSxbXSxbXV0sXCJ0eXBlXCI6XCJNdWx0aVBvbHlnb25cIn0sXCJ0eXBlXCI6XCJGZWF0dXJlXCIsXCJwcm9wZXJ0aWVzXCI6e1wiaXNvMlwiOlwiRUVcIixcImxuZ1wiOjI2LFwibGF0XCI6NTl9fSx7XCJnZW9tZXRyeVwiOntcImNvb3JkaW5hdGVzXCI6W1tbWy03LjksNDMuOF0sWy03LjIsNDMuNl0sWy02LjMsNDMuNl0sWy01LjYsNDMuNl0sWy00LjksNDMuNF0sWy00LjIsNDMuNF0sWy0zLjIsNDMuNF0sWy0yLjUsNDMuM10sWy0xLjgsNDMuM10sWy0xLjQsNDNdLFstMC44LDQyLjldLFstMC4zLDQyLjhdLFswLjMsNDIuN10sWzAuOCw0Mi44XSxbMS40LDQyLjZdLFsyLDQyLjRdLFsyLjcsNDIuM10sWzMuMyw0Mi4yXSxbMy4xLDQxLjhdLFsyLjMsNDEuNF0sWzEuNyw0MS4yXSxbMC45LDQxXSxbMC41LDQwLjVdLFstMC4xLDM5LjldLFstMC4xLDM5XSxbMC4xLDM4LjddLFstMC41LDM4LjNdLFstMC45LDM3LjddLFstMS40LDM3LjVdLFstMS45LDM3XSxbLTIuMywzNi44XSxbLTIuOSwzNi43XSxbLTMuNywzNi43XSxbLTQuNSwzNi43XSxbLTUuMiwzNi40XSxbLTUuOSwzNi4yXSxbLTYuMiwzNi42XSxbLTYuOSwzNy4yXSxbLTcuNCwzNy40XSxbLTcuMywzOF0sWy03LjEsMzguMl0sWy03LjEsMzguOV0sWy03LjQsMzkuNV0sWy03LjEsMzkuN10sWy02LjgsNDAuM10sWy02LjksNDFdLFstNi40LDQxLjRdLFstNi41LDQxLjddLFstNi45LDQxLjldLFstNy4zLDQxLjhdLFstOCw0MS44XSxbLTguMiw0Mi4xXSxbLTguNyw0Ml0sWy04LjYsNDIuNF0sWy04LjksNDIuNF0sWy04LjksNDIuNl0sWy05LjEsNDIuOF0sWy05LjEsNDMuMl0sWy04LjQsNDMuNF0sWy03LjksNDMuOF1dXSxbW1szLjIsMzkuN10sWzMuMywzOS43XSxbMy4zLDM5LjhdLFszLjQsMzkuOF0sWzMuNSwzOS43XSxbMy40LDM5LjZdLFszLjQsMzkuNV0sWzMuMywzOS41XSxbMy4zLDM5LjRdLFszLjIsMzkuNF0sWzMuMSwzOS4zXSxbMywzOS4zXSxbMi44LDM5LjRdLFsyLjcsMzkuNF0sWzIuNywzOS41XSxbMi44LDM5LjVdLFsyLjcsMzkuNl0sWzIuNSwzOS41XSxbMi40LDM5LjVdLFsyLjQsMzkuNl0sWzIuNSwzOS43XSxbMi43LDM5LjhdLFsyLjgsMzkuOF0sWzMsMzkuOV0sWzMuMSwzOS45XSxbMy4xLDM5LjhdLFszLjIsMzkuOF0sWzMuMiwzOS43XV1dLFtbWy0xNC4zLDI4XSxbLTE0LjQsMjhdLFstMTQuNCwyOC4xXSxbLTE0LjMsMjguMV0sWy0xNC4zLDI4LjJdLFstMTQuMiwyOC4yXSxbLTE0LjIsMjguM10sWy0xNC4xLDI4LjRdLFstMTQuMSwyOC41XSxbLTE0LjEsMjguNl0sWy0xNCwyOC42XSxbLTE0LDI4LjddLFstMTMuOSwyOC43XSxbLTEzLjksMjguOF0sWy0xMy44LDI4LjddLFstMTMuOCwyOC42XSxbLTEzLjgsMjguNV0sWy0xMy45LDI4LjRdLFstMTMuOSwyOC4zXSxbLTEzLjksMjguMl0sWy0xNCwyOC4yXSxbLTE0LjEsMjguMl0sWy0xNC4yLDI4LjFdLFstMTQuMywyOF1dXSxbW1stMTYuMywyOC40XSxbLTE2LjQsMjguNF0sWy0xNi40LDI4LjJdLFstMTYuNCwyOC4xXSxbLTE2LjUsMjguMV0sWy0xNi41LDI4XSxbLTE2LjYsMjhdLFstMTYuNywyOF0sWy0xNi43LDI4LjFdLFstMTYuOCwyOC4xXSxbLTE2LjgsMjguMl0sWy0xNi45LDI4LjNdLFstMTYuOSwyOC40XSxbLTE2LjgsMjguNF0sWy0xNi43LDI4LjRdLFstMTYuNiwyOC40XSxbLTE2LjUsMjguNF0sWy0xNi40LDI4LjVdLFstMTYuMywyOC42XSxbLTE2LjIsMjguNl0sWy0xNi4yLDI4LjVdLFstMTYuMywyOC40XV1dLFtbWy0xNS42LDI3LjhdLFstMTUuNiwyNy43XSxbLTE1LjcsMjcuOF0sWy0xNS44LDI3LjhdLFstMTUuOCwyNy45XSxbLTE1LjgsMjhdLFstMTUuNywyOF0sWy0xNS43LDI4LjFdLFstMTUuNywyOC4yXSxbLTE1LjYsMjguMl0sWy0xNS40LDI4LjFdLFstMTUuNCwyOF0sWy0xNS40LDI3LjhdLFstMTUuNSwyNy44XSxbLTE1LjYsMjcuOF1dXSxbW1s0LjMsNDBdLFs0LjMsMzkuOV0sWzQuMywzOS44XSxbNC4yLDM5LjhdLFs0LjEsMzkuOV0sWzQsMzkuOV0sWzMuOSwzOS45XSxbMy44LDM5LjldLFszLjgsNDBdLFszLjgsNDAuMV0sWzMuOSw0MC4xXSxbNC4xLDQwLjFdLFs0LjIsNDAuMV0sWzQuMiw0MF0sWzQuMyw0MF1dXSxbXV0sXCJ0eXBlXCI6XCJNdWx0aVBvbHlnb25cIn0sXCJ0eXBlXCI6XCJGZWF0dXJlXCIsXCJwcm9wZXJ0aWVzXCI6e1wiaXNvMlwiOlwiRVNcIixcImxuZ1wiOi00LFwibGF0XCI6NDB9fSx7XCJnZW9tZXRyeVwiOntcImNvb3JkaW5hdGVzXCI6W1tbWzI4LjIsNjkuOV0sWzI5LjMsNjkuNV0sWzI4LjksNjldLFsyOC41LDY4LjZdLFsyOS45LDY3LjddLFsyOS4xLDY2LjldLFsyOS44LDY2LjJdLFsyOS44LDY1LjZdLFsyOS44LDY1LjJdLFsyOS43LDY0LjhdLFszMCw2NC41XSxbMzAuNiw2NF0sWzMwLjMsNjMuNl0sWzMxLjUsNjNdLFszMC44LDYyLjNdLFsyOS43LDYxLjVdLFsyOC44LDYxLjFdLFsyOC4xLDYwLjddLFsyNy4yLDYwLjZdLFsyNi42LDYwLjZdLFsyNS45LDYwLjRdLFsyNS43LDYwLjRdLFsyNC42LDYwLjFdLFsyMy42LDYwXSxbMjMuMiw1OS45XSxbMjMsNjAuMl0sWzIyLjUsNjAuMl0sWzIxLjksNjAuNV0sWzIxLjQsNjAuOF0sWzIxLjUsNjEuNV0sWzIxLjMsNjJdLFsyMS4xLDYyLjZdLFsyMS42LDYzLjFdLFsyMi4zLDYzLjNdLFsyMi43LDYzLjddLFsyMy40LDY0XSxbMjQuMiw2NC41XSxbMjUsNjQuOV0sWzI1LjMsNjVdLFsyNS4yLDY1LjZdLFsyNC43LDY1LjldLFsyMy43LDY2LjJdLFsyNCw2Ni44XSxbMjMuOCw2Ny40XSxbMjMuNSw2Ny45XSxbMjMsNjguM10sWzIyLjEsNjguNV0sWzIxLjIsNjguOF0sWzIwLjgsNjkuMV0sWzIyLDY5LjFdLFsyMi45LDY4LjddLFsyMy43LDY4LjddLFsyNC41LDY4LjddLFsyNS40LDY4LjldLFsyNS44LDY5LjRdLFsyNi40LDY5LjhdLFsyNy4zLDY5LjldLFsyOC4yLDY5LjldXV0sW10sW10sW10sW10sW10sW11dLFwidHlwZVwiOlwiTXVsdGlQb2x5Z29uXCJ9LFwidHlwZVwiOlwiRmVhdHVyZVwiLFwicHJvcGVydGllc1wiOntcImlzbzJcIjpcIkZJXCIsXCJsbmdcIjoyNixcImxhdFwiOjY0fX0se1wiZ2VvbWV0cnlcIjp7XCJjb29yZGluYXRlc1wiOltbW1syLjUsNTEuMV0sWzMuMiw1MC43XSxbNCw1MC4zXSxbNC41LDQ5LjldLFs1LDQ5LjhdLFs2LjEsNDkuNV0sWzYuOSw0OS4yXSxbNy43LDQ5XSxbNy45LDQ4LjddLFs3LjUsNDcuOF0sWzcuMSw0Ny41XSxbNi42LDQ3XSxbNi4xLDQ2LjRdLFs2LjIsNDYuM10sWzYuOSw0Ni4xXSxbNy4xLDQ1LjVdLFs2LjcsNDUuMV0sWzYuOSw0NC41XSxbNy43LDQ0LjJdLFs3LjIsNDMuN10sWzYuMiw0My4xXSxbNS4zLDQzLjRdLFs1LDQzLjZdLFs0LjYsNDMuNF0sWzMuOCw0My41XSxbMyw0Mi45XSxbMi43LDQyLjRdLFsxLjksNDIuNF0sWzEuNCw0Mi42XSxbMC43LDQyLjhdLFstMC4xLDQyLjddLFstMC44LDQzXSxbLTEuNCw0My4xXSxbLTEuNiw0My40XSxbLTEuMyw0NC41XSxbLTEuMiw0NV0sWy0wLjgsNDUuNF0sWy0wLjcsNDUuNF0sWy0xLjEsNDYuMV0sWy0xLjksNDYuNl0sWy0yLjIsNDcuMl0sWy0yLjQsNDcuM10sWy0yLjksNDcuNV0sWy0zLjYsNDcuOF0sWy00LjQsNDcuOF0sWy00LjMsNDguMV0sWy00LjIsNDguM10sWy00LjUsNDguNl0sWy0zLjUsNDguN10sWy0yLjcsNDguNV0sWy0xLjksNDguN10sWy0xLjUsNDguN10sWy0xLjgsNDkuNF0sWy0xLjQsNDkuN10sWy0xLDQ5LjRdLFstMC4xLDQ5LjNdLFswLjIsNDkuNV0sWzEuMiw1MF0sWzEuNiw1MC44XSxbMi41LDUxLjFdXV0sW1tbOS40LDQyLjddLFs5LjQsNDIuNl0sWzkuNSw0Mi42XSxbOS41LDQyLjVdLFs5LjYsNDIuM10sWzkuNiw0Mi4yXSxbOS42LDQyLjFdLFs5LjUsNDIuMV0sWzkuNCw0Ml0sWzkuNCw0MS45XSxbOS40LDQxLjhdLFs5LjQsNDEuN10sWzkuNCw0MS42XSxbOS4zLDQxLjZdLFs5LjMsNDEuNV0sWzkuMiw0MS41XSxbOS4yLDQxLjRdLFs5LjMsNDEuNF0sWzkuMSw0MS40XSxbOSw0MS41XSxbOC45LDQxLjVdLFs4LjgsNDEuNl0sWzguOSw0MS42XSxbOC45LDQxLjddLFs4LjgsNDEuN10sWzguNyw0MS43XSxbOC43LDQxLjhdLFs4LjgsNDEuOV0sWzguNyw0MS45XSxbOC42LDQxLjldLFs4LjYsNDJdLFs4LjcsNDJdLFs4LjcsNDIuMV0sWzguNiw0Mi4xXSxbOC42LDQyLjJdLFs4LjYsNDIuM10sWzguNyw0Mi4zXSxbOC42LDQyLjRdLFs4LjcsNDIuNV0sWzguNyw0Mi42XSxbOC45LDQyLjZdLFs5LjEsNDIuN10sWzkuMiw0Mi43XSxbOS4zLDQyLjddLFs5LjMsNDIuOF0sWzkuMyw0M10sWzkuNCw0M10sWzkuNSw0M10sWzkuNSw0Mi44XSxbOS41LDQyLjddLFs5LjQsNDIuN11dXSxbXSxbXSxbXSxbXSxbXV0sXCJ0eXBlXCI6XCJNdWx0aVBvbHlnb25cIn0sXCJ0eXBlXCI6XCJGZWF0dXJlXCIsXCJwcm9wZXJ0aWVzXCI6e1wiaXNvMlwiOlwiRlJcIixcImxuZ1wiOjIsXCJsYXRcIjo0Nn19LHtcImdlb21ldHJ5XCI6e1wiY29vcmRpbmF0ZXNcIjpbW1tbLTQuMiw1My4yXSxbLTMuMSw1My4yXSxbLTMsNTMuOF0sWy0zLjUsNTQuNF0sWy0zLjEsNTVdLFstNC40LDU0LjldLFstNSw1NC44XSxbLTUsNTUuMl0sWy00LjgsNTUuOV0sWy01LjIsNTUuOF0sWy01LjQsNTUuOV0sWy01LjgsNTUuNF0sWy01LjUsNTYuMl0sWy01LjMsNTYuNV0sWy01LjgsNTYuNV0sWy02LjEsNTYuOF0sWy01LjUsNTddLFstNS41LDU3LjRdLFstNS42LDU3LjZdLFstNS4yLDU3LjldLFstNS4yLDU4LjNdLFstNC42LDU4LjVdLFstMy40LDU4LjZdLFstMy42LDU4LjFdLFstNCw1Ny44XSxbLTQsNTcuNl0sWy0yLjksNTcuN10sWy0xLjgsNTcuNV0sWy0yLjUsNTYuNl0sWy0zLDU2LjRdLFstMy4yLDU2LjFdLFstMi44LDU2LjFdLFstMS44LDU1LjZdLFstMS4zLDU0LjhdLFstMC4yLDU0LjJdLFswLDUzLjZdLFswLjIsNTMuNV0sWzAuMiw1Mi45XSxbMS4yLDUyLjldLFsxLjcsNTIuM10sWzAuOSw1MS44XSxbMC40LDUxLjRdLFsxLjQsNTEuMV0sWzAuNCw1MC44XSxbLTAuOCw1MC43XSxbLTIuMSw1MC43XSxbLTIuOCw1MC43XSxbLTMuOCw1MC4yXSxbLTQuOSw1MC4yXSxbLTUuNyw1MC4xXSxbLTQuNyw1MC43XSxbLTQsNTEuMl0sWy0yLjksNTEuNF0sWy0zLjIsNTEuNV0sWy00LjIsNTEuNV0sWy00LjgsNTEuNl0sWy01LjIsNTEuOV0sWy00LjEsNTIuM10sWy00LjUsNTIuOF0sWy00LjIsNTMuMl1dXSxbW1stNi4yLDU4LjRdLFstNi4yLDU4LjNdLFstNi4zLDU4LjNdLFstNi4zLDU4LjJdLFstNi4yLDU4LjJdLFstNi4xLDU4LjNdLFstNi40LDU4LjJdLFstNi40LDU4LjFdLFstNi41LDU4LjFdLFstNi42LDU4LjFdLFstNi40LDU4XSxbLTYuNSw1OF0sWy02LjUsNTcuOV0sWy02LjYsNTcuOV0sWy02LjcsNTcuOV0sWy02LjcsNThdLFstNi42LDU4XSxbLTYuNyw1OC4xXSxbLTYuOCw1OF0sWy02LjcsNTcuOF0sWy03LDU3LjddLFstNy4xLDU3LjhdLFstNyw1Ny44XSxbLTYuOCw1Ny45XSxbLTYuOSw1Ny45XSxbLTYuOSw1OF0sWy03LDU4XSxbLTcuMSw1OF0sWy03LjEsNTguMV0sWy03LjEsNTguMl0sWy03LDU4LjJdLFstNi45LDU4LjJdLFstNi45LDU4LjFdLFstNi44LDU4LjJdLFstNi43LDU4LjJdLFstNi44LDU4LjNdLFstNi43LDU4LjNdLFstNi42LDU4LjNdLFstNi42LDU4LjRdLFstNi40LDU4LjVdLFstNi4zLDU4LjVdLFstNi4yLDU4LjVdLFstNi4yLDU4LjRdXV0sW1tbLTYuNCw1NS4yXSxbLTYuMiw1NS4yXSxbLTYsNTUuMl0sWy01LjgsNTQuOV0sWy01LjcsNTQuOF0sWy01LjgsNTQuN10sWy01LjksNTQuNl0sWy01LjUsNTQuN10sWy01LjUsNTQuNV0sWy01LjUsNTQuNF0sWy01LjYsNTQuNl0sWy01LjcsNTQuNV0sWy01LjYsNTQuM10sWy01LjcsNTQuMl0sWy01LjksNTQuMl0sWy02LDU0LjFdLFstNi4xLDU0XSxbLTYuMyw1NC4xXSxbLTYuNiw1NC4xXSxbLTYuNyw1NC4xXSxbLTYuOSw1NC4zXSxbLTcsNTQuNF0sWy03LjIsNTQuM10sWy03LjEsNTQuMl0sWy03LjYsNTQuMV0sWy03LjcsNTQuMl0sWy03LjksNTQuMl0sWy04LDU0LjRdLFstOC4yLDU0LjRdLFstOCw1NC41XSxbLTcuOSw1NC42XSxbLTcuOCw1NC43XSxbLTcuNiw1NC44XSxbLTcuNSw1NC45XSxbLTcuNCw1NV0sWy03LjMsNTUuMV0sWy03LDU1XSxbLTcsNTUuMl0sWy02LjgsNTUuMl0sWy02LjYsNTUuMl0sWy02LjQsNTUuMl1dXSxbW1stNi4xLDU3LjZdLFstNi4xLDU3LjVdLFstNi4xLDU3LjRdLFstNi4xLDU3LjNdLFstNS45LDU3LjJdLFstNS44LDU3LjNdLFstNS43LDU3LjNdLFstNS42LDU3LjNdLFstNS43LDU3LjJdLFstNS44LDU3LjFdLFstNS45LDU3LjFdLFstNS45LDU3XSxbLTYsNTddLFstNiw1Ny4xXSxbLTYsNTcuMl0sWy02LjEsNTcuMV0sWy02LjIsNTcuMl0sWy02LjMsNTcuMl0sWy02LjQsNTcuM10sWy02LjUsNTcuM10sWy02LjMsNTcuM10sWy02LjUsNTcuNF0sWy02LjYsNTcuNF0sWy02LjYsNTcuM10sWy02LjcsNTcuNF0sWy02LjgsNTcuNF0sWy02LjcsNTcuNV0sWy02LjYsNTcuNl0sWy02LjYsNTcuNV0sWy02LjUsNTcuNV0sWy02LjQsNTcuNV0sWy02LjQsNTcuNl0sWy02LjMsNTcuN10sWy02LjIsNTcuNl0sWy02LjEsNTcuNl1dXSxbW1stMS4zLDYwLjVdLFstMS4yLDYwLjVdLFstMSw2MC40XSxbLTEuMSw2MC40XSxbLTEuMSw2MC4zXSxbLTEuMiw2MC4zXSxbLTEuMiw2MC4yXSxbLTEuMSw2MC4yXSxbLTEuMSw2MC4xXSxbLTEuMiw2MC4xXSxbLTEuMiw2MF0sWy0xLjMsNTkuOV0sWy0xLjQsNTkuOV0sWy0xLjMsNjBdLFstMS4zLDYwLjFdLFstMS4zLDYwLjJdLFstMS40LDYwLjNdLFstMS40LDYwLjJdLFstMS41LDYwLjJdLFstMS42LDYwLjJdLFstMS43LDYwLjJdLFstMS43LDYwLjNdLFstMS42LDYwLjNdLFstMS41LDYwLjNdLFstMS4zLDYwLjNdLFstMS4zLDYwLjRdLFstMS40LDYwLjVdLFstMS41LDYwLjVdLFstMS42LDYwLjVdLFstMS40LDYwLjZdLFstMS4zLDYwLjZdLFstMS4zLDYwLjVdXV0sW1tbLTUuOCw1Ni41XSxbLTUuNyw1Ni41XSxbLTUuNiw1Ni40XSxbLTUuNyw1Ni40XSxbLTUuOCw1Ni4zXSxbLTUuOSw1Ni4zXSxbLTUuOSw1Ni40XSxbLTYsNTYuM10sWy02LjMsNTYuM10sWy02LjQsNTYuM10sWy02LjIsNTYuM10sWy02LjEsNTYuNF0sWy02LDU2LjRdLFstNi4yLDU2LjRdLFstNiw1Ni41XSxbLTYuMSw1Ni41XSxbLTYuMyw1Ni41XSxbLTYuMyw1Ni42XSxbLTYuMiw1Ni42XSxbLTYuMSw1Ni43XSxbLTYuMSw1Ni42XSxbLTYsNTYuNl0sWy01LjksNTYuNV0sWy01LjgsNTYuNV1dXSxbW1stNi4xLDU1LjldLFstNi4xLDU1LjhdLFstNiw1NS44XSxbLTYsNTUuN10sWy02LjEsNTUuNl0sWy02LjIsNTUuNl0sWy02LjMsNTUuNl0sWy02LjMsNTUuN10sWy02LjMsNTUuOF0sWy02LjQsNTUuOF0sWy02LjQsNTUuN10sWy02LjUsNTUuN10sWy02LjQsNTUuOV0sWy02LjMsNTUuOV0sWy02LjIsNTUuOV0sWy02LjEsNTUuOV1dXV0sXCJ0eXBlXCI6XCJNdWx0aVBvbHlnb25cIn0sXCJ0eXBlXCI6XCJGZWF0dXJlXCIsXCJwcm9wZXJ0aWVzXCI6e1wiaXNvMlwiOlwiR0JcIixcImxuZ1wiOi0yLFwibGF0XCI6NTR9fSx7XCJnZW9tZXRyeVwiOntcImNvb3JkaW5hdGVzXCI6W1tbNDEuNSw0Mi40XSxbNDEuNSw0Mi43XSxbNDEuMiw0Mi44XSxbNDEsNDNdLFs0MC44LDQzLjFdLFs0MC4zLDQzLjJdLFs0MC4xLDQzLjRdLFs0MC4xLDQzLjZdLFs0MC40LDQzLjZdLFs0MC43LDQzLjVdLFs0MSw0My40XSxbNDEuNCw0My4zXSxbNDIuMSw0My4yXSxbNDIuNCw0My4yXSxbNDIuNyw0My4yXSxbNDIuOSw0My4xXSxbNDMuMiw0Mi45XSxbNDMuNiw0Mi45XSxbNDMuOCw0Mi44XSxbNDMuNyw0Mi42XSxbNDQuMiw0Mi42XSxbNDQuNSw0Mi44XSxbNDQuNyw0Mi43XSxbNDQuOSw0Mi44XSxbNDUuMiw0Mi43XSxbNDUuNCw0Mi41XSxbNDUuNiw0Mi42XSxbNDUuOCw0Mi41XSxbNDUuNiw0Mi4yXSxbNDYuMSw0Ml0sWzQ2LjQsNDEuOV0sWzQ2LjMsNDEuOF0sWzQ2LjIsNDEuNl0sWzQ2LjYsNDEuNF0sWzQ2LjcsNDEuMV0sWzQ2LjUsNDEuMV0sWzQ2LjMsNDEuMl0sWzQ2LDQxLjJdLFs0NS43LDQxLjNdLFs0NS4zLDQxLjVdLFs0NS4xLDQxLjRdLFs0NC45LDQxLjJdLFs0NC42LDQxLjJdLFs0NC4zLDQxLjJdLFs0NCw0MS4yXSxbNDMuOCw0MS4xXSxbNDMuNSw0MS4xXSxbNDMuMyw0MS4yXSxbNDMsNDEuNF0sWzQyLjcsNDEuNl0sWzQyLjUsNDEuNF0sWzQyLjIsNDEuNV0sWzQxLjksNDEuNV0sWzQxLjcsNDEuNV0sWzQxLjYsNDEuNl0sWzQxLjgsNDEuOF0sWzQxLjcsNDIuMV0sWzQxLjYsNDIuM10sWzQxLjUsNDIuNF1dXSxcInR5cGVcIjpcIlBvbHlnb25cIn0sXCJ0eXBlXCI6XCJGZWF0dXJlXCIsXCJwcm9wZXJ0aWVzXCI6e1wiaXNvMlwiOlwiR0VcIixcImxuZ1wiOjQzLjUsXCJsYXRcIjo0Mn19LHtcImdlb21ldHJ5XCI6e1wiY29vcmRpbmF0ZXNcIjpbW1tbMjMuOSwzNS41XSxbMjQsMzUuNV0sWzI0LjEsMzUuNV0sWzI0LjEsMzUuNl0sWzI0LjIsMzUuNl0sWzI0LjIsMzUuNV0sWzI0LjMsMzUuNF0sWzI0LjQsMzUuNF0sWzI0LjUsMzUuNF0sWzI0LjYsMzUuNF0sWzI0LjgsMzUuNF0sWzI1LDM1LjRdLFsyNS4xLDM1LjNdLFsyNS4yLDM1LjNdLFsyNS4zLDM1LjNdLFsyNS40LDM1LjNdLFsyNS41LDM1LjNdLFsyNS42LDM1LjNdLFsyNS43LDM1LjNdLFsyNS44LDM1LjNdLFsyNS43LDM1LjJdLFsyNS43LDM1LjFdLFsyNS44LDM1LjFdLFsyNS45LDM1LjJdLFsyNiwzNS4yXSxbMjYuMSwzNS4yXSxbMjYuMiwzNS4yXSxbMjYuMywzNS4zXSxbMjYuMywzNS4xXSxbMjYuMiwzNV0sWzI2LjEsMzVdLFsyNiwzNV0sWzI1LjYsMzVdLFsyNS41LDM1XSxbMjUuMywzNV0sWzI1LjIsMzVdLFsyNSwzNC45XSxbMjQuOSwzNC45XSxbMjQuOCwzNC45XSxbMjQuOCwzNV0sWzI0LjcsMzUuMV0sWzI0LjYsMzUuMV0sWzI0LjUsMzUuMV0sWzI0LjQsMzUuMl0sWzI0LjIsMzUuMl0sWzI0LjEsMzUuMl0sWzI0LDM1LjJdLFsyMy45LDM1LjJdLFsyMy44LDM1LjJdLFsyMy43LDM1LjJdLFsyMy42LDM1LjJdLFsyMy41LDM1LjNdLFsyMy42LDM1LjVdLFsyMy42LDM1LjZdLFsyMy43LDM1LjVdLFsyMy43LDM1LjZdLFsyMy43LDM1LjddLFsyMy44LDM1LjddLFsyMy44LDM1LjZdLFsyMy44LDM1LjVdLFsyMy45LDM1LjVdXV0sW1tbMjYuMyw0MS43XSxbMjYuNCw0MS4zXSxbMjYuMSw0MC44XSxbMjUuNyw0MC45XSxbMjUuMiw0MV0sWzI0LjQsNDAuOV0sWzIzLjgsNDAuOF0sWzI0LDQwLjRdLFsyNC4xLDQwLjNdLFsyNCw0MC4xXSxbMjMuNCw0MC4zXSxbMjMuNywzOS45XSxbMjIuOCw0MC41XSxbMjIuNiw0MC41XSxbMjIuNyw0MF0sWzIzLjMsMzkuM10sWzIzLjIsMzkuM10sWzIzLDM5LjFdLFsyMi41LDM4LjldLFsyMy4yLDM4LjZdLFsyMy42LDM4LjVdLFsyNC4xLDM4LjJdLFsyNCwzNy43XSxbMjMuMywzOF0sWzIzLjIsMzcuNl0sWzIzLjQsMzcuNF0sWzIyLjksMzcuNV0sWzIyLjksMzcuMV0sWzIzLDM2LjddLFsyMi45LDM2LjZdLFsyMi41LDM2LjRdLFsyMiwzN10sWzIxLjcsMzYuOF0sWzIxLjcsMzcuNF0sWzIxLjEsMzcuOF0sWzIxLjYsMzguMV0sWzIyLjIsMzguMl0sWzIzLDM4XSxbMjMuMSwzOC4yXSxbMjIuNSwzOC40XSxbMjEuNywzOC40XSxbMjEuMywzOC4zXSxbMjAuOCwzOC44XSxbMjEuMSwzOV0sWzIwLjcsMzkuMV0sWzIwLjIsMzkuNl0sWzIwLjQsMzkuOV0sWzIwLjcsNDAuMl0sWzIxLDQwLjZdLFsyMS4yLDQwLjldLFsyMS45LDQxLjFdLFsyMi42LDQxLjFdLFsyMy4xLDQxLjNdLFsyMy43LDQxLjRdLFsyNC4yLDQxLjZdLFsyNC45LDQxLjRdLFsyNS42LDQxLjNdLFsyNi4yLDQxLjVdLFsyNi4zLDQxLjddXV0sW1tbMjMuNSwzOC45XSxbMjMuNSwzOC44XSxbMjMuNiwzOC44XSxbMjMuOCwzOC43XSxbMjMuOSwzOC43XSxbMjQsMzguN10sWzI0LjIsMzguNl0sWzI0LjIsMzguNF0sWzI0LjIsMzguMl0sWzI0LjMsMzguMl0sWzI0LjQsMzguMV0sWzI0LjUsMzguMV0sWzI0LjYsMzguMV0sWzI0LjYsMzhdLFsyNC41LDM4XSxbMjQuNCwzOF0sWzI0LjMsMzhdLFsyNC4xLDM4LjJdLFsyNC4xLDM4LjNdLFsyNCwzOC40XSxbMjQuMSwzOC40XSxbMjMuOSwzOC40XSxbMjMuOCwzOC40XSxbMjMuNywzOC40XSxbMjMuNiwzOC40XSxbMjMuNiwzOC41XSxbMjMuNiwzOC42XSxbMjMuNSwzOC42XSxbMjMuMywzOC43XSxbMjMuMiwzOC44XSxbMjMuMSwzOC45XSxbMjMuMSwzOC44XSxbMjIuOCwzOC44XSxbMjIuOCwzOC45XSxbMjIuOSwzOC45XSxbMjMuMSwzOV0sWzIzLjMsMzldLFsyMy40LDM5XSxbMjMuNCwzOC45XSxbMjMuNSwzOC45XV1dLFtbWzI2LjQsMzkuM10sWzI2LjUsMzkuMl0sWzI2LjYsMzkuMV0sWzI2LjYsMzldLFsyNi41LDM5XSxbMjYuNCwzOV0sWzI2LjMsMzldLFsyNi4yLDM5XSxbMjYuMSwzOV0sWzI2LjEsMzkuMV0sWzI2LjIsMzkuMV0sWzI2LjMsMzkuMl0sWzI2LjIsMzkuMl0sWzI2LDM5LjFdLFsyNS45LDM5LjFdLFsyNS45LDM5LjJdLFsyNS44LDM5LjJdLFsyNS45LDM5LjNdLFsyNiwzOS4zXSxbMjYuMiwzOS4zXSxbMjYuMiwzOS40XSxbMjYuMywzOS40XSxbMjYuNCwzOS4zXV1dLFtbWzI3LjgsMzUuOV0sWzI3LjcsMzUuOV0sWzI3LjcsMzZdLFsyNy43LDM2LjFdLFsyNy43LDM2LjJdLFsyNy44LDM2LjNdLFsyNy45LDM2LjNdLFsyOC4xLDM2LjRdLFsyOC4yLDM2LjRdLFsyOC4yLDM2LjVdLFsyOC4yLDM2LjNdLFsyOC4xLDM2LjJdLFsyOC4xLDM2LjFdLFsyOCwzNi4xXSxbMjgsMzZdLFsyNy45LDM2XSxbMjcuOSwzNS45XSxbMjcuOCwzNS45XV1dLFtbWzI2LDM4LjJdLFsyNiwzOC4xXSxbMjUuOSwzOC4yXSxbMjUuOSwzOC4zXSxbMjYsMzguM10sWzI2LDM4LjRdLFsyNS45LDM4LjVdLFsyNS44LDM4LjVdLFsyNS44LDM4LjZdLFsyNS45LDM4LjZdLFsyNiwzOC42XSxbMjYuMSwzOC42XSxbMjYuMiwzOC42XSxbMjYuMiwzOC41XSxbMjYuMSwzOC40XSxbMjYuMiwzOC4zXSxbMjYuMSwzOC4yXSxbMjYsMzguMl1dXSxbW1sxOS45LDM5LjhdLFsyMCwzOS44XSxbMTkuOSwzOS43XSxbMTkuOCwzOS43XSxbMTkuOCwzOS42XSxbMTkuOSwzOS41XSxbMjAsMzkuNF0sWzIwLjEsMzkuNF0sWzIwLjEsMzkuNV0sWzE5LjksMzkuNF0sWzE5LjgsMzkuNV0sWzE5LjcsMzkuNl0sWzE5LjcsMzkuN10sWzE5LjYsMzkuN10sWzE5LjYsMzkuOF0sWzE5LjcsMzkuOF0sWzE5LjgsMzkuOF0sWzE5LjksMzkuOF1dXV0sXCJ0eXBlXCI6XCJNdWx0aVBvbHlnb25cIn0sXCJ0eXBlXCI6XCJGZWF0dXJlXCIsXCJwcm9wZXJ0aWVzXCI6e1wiaXNvMlwiOlwiR1JcIixcImxuZ1wiOjIyLFwibGF0XCI6Mzl9fSx7XCJnZW9tZXRyeVwiOntcImNvb3JkaW5hdGVzXCI6W1tbWzE2LjYsNDYuNV0sWzE2LjksNDYuM10sWzE3LjIsNDYuMl0sWzE3LjQsNDZdLFsxNy43LDQ1LjldLFsxOC4yLDQ1LjhdLFsxOC42LDQ1LjhdLFsxOC45LDQ1LjhdLFsxOC45LDQ1LjVdLFsxOSw0NS40XSxbMTkuNCw0NS4yXSxbMTkuMSw0NC45XSxbMTguOCw0NV0sWzE4LjIsNDUuMV0sWzE3LjgsNDUuMV0sWzE3LjMsNDUuMl0sWzE3LDQ1LjJdLFsxNi42LDQ1LjJdLFsxNi4zLDQ1XSxbMTUuOSw0NS4yXSxbMTUuNyw0NC44XSxbMTYsNDQuNl0sWzE2LjEsNDQuMl0sWzE2LjQsNDQuMV0sWzE2LjcsNDMuOV0sWzE3LDQzLjZdLFsxNy4zLDQzLjVdLFsxNy42LDQzLjFdLFsxNy41LDQzXSxbMTcuMSw0My4yXSxbMTYuNyw0My40XSxbMTYuNCw0My42XSxbMTYuMSw0My41XSxbMTUuOSw0My43XSxbMTUuNSw0My45XSxbMTUuMiw0NC4yXSxbMTUuMyw0NC4zXSxbMTUuMiw0NC40XSxbMTQuOSw0NC44XSxbMTQuNyw0NS4xXSxbMTQuNCw0NS4zXSxbMTQuMiw0NS4yXSxbMTQsNDQuOV0sWzEzLjgsNDVdLFsxMy41LDQ1LjRdLFsxMy45LDQ1LjVdLFsxNC41LDQ1LjVdLFsxNC43LDQ1LjVdLFsxNS4xLDQ1LjVdLFsxNS40LDQ1LjddLFsxNS42LDQ1LjhdLFsxNS43LDQ2LjFdLFsxNS44LDQ2LjJdLFsxNi4zLDQ2LjRdLFsxNi41LDQ2LjVdLFsxNi42LDQ2LjVdXV0sW1tbMTcuMyw0M10sWzE3LjQsNDNdLFsxNy40LDQyLjldLFsxNy41LDQyLjldLFsxNy43LDQyLjldLFsxNy42LDQyLjldLFsxNy44LDQyLjldLFsxNy45LDQyLjhdLFsxOCw0Mi44XSxbMTguMiw0Mi43XSxbMTguMiw0Mi42XSxbMTguMyw0Mi42XSxbMTguNCw0Mi42XSxbMTguNSw0Mi42XSxbMTguNSw0Mi41XSxbMTguNSw0Mi40XSxbMTguNCw0Mi41XSxbMTguMSw0Mi43XSxbMTcuOCw0Mi44XSxbMTcuNyw0Mi44XSxbMTcuNiw0Mi44XSxbMTcuMiw0M10sWzE3LjEsNDNdLFsxNyw0M10sWzE3LjMsNDNdXV0sW1tbMTQuNSw0NC45XSxbMTQuNCw0NC45XSxbMTQuNSw0NC44XSxbMTQuNSw0NC43XSxbMTQuNSw0NC42XSxbMTQuNCw0NC43XSxbMTQuNCw0NC44XSxbMTQuMyw0NC44XSxbMTQuMyw0NC45XSxbMTQuNCw0NV0sWzE0LjMsNDUuMV0sWzE0LjMsNDUuMl0sWzE0LjQsNDUuMl0sWzE0LjQsNDUuMV0sWzE0LjUsNDVdLFsxNC41LDQ0LjldXV0sW1tbMTQuOCw0NC42XSxbMTQuOSw0NC42XSxbMTUsNDQuNl0sWzE1LDQ0LjVdLFsxNS4xLDQ0LjVdLFsxNC45LDQ0LjVdLFsxNS4xLDQ0LjRdLFsxNS4yLDQ0LjRdLFsxNS4yLDQ0LjNdLFsxNS4zLDQ0LjNdLFsxNS4xLDQ0LjNdLFsxNSw0NC40XSxbMTQuNyw0NC43XSxbMTQuOCw0NC43XSxbMTQuOCw0NC42XV1dLFtdLFtdLFtdXSxcInR5cGVcIjpcIk11bHRpUG9seWdvblwifSxcInR5cGVcIjpcIkZlYXR1cmVcIixcInByb3BlcnRpZXNcIjp7XCJpc28yXCI6XCJIUlwiLFwibG5nXCI6MTUuNSxcImxhdFwiOjQ1LjJ9fSx7XCJnZW9tZXRyeVwiOntcImNvb3JkaW5hdGVzXCI6W1tbMTguOCw0NS45XSxbMTguNCw0NS44XSxbMTgsNDUuOF0sWzE3LjYsNDUuOV0sWzE3LjMsNDZdLFsxNy4xLDQ2LjJdLFsxNi45LDQ2LjRdLFsxNi41LDQ2LjVdLFsxNi4zLDQ2LjldLFsxNi40LDQ3XSxbMTYuNSw0Ny4zXSxbMTYuNyw0Ny42XSxbMTYuNSw0Ny43XSxbMTYuOSw0Ny43XSxbMTcuMSw0Ny45XSxbMTcuNCw0OF0sWzE3LjgsNDcuN10sWzE4LjEsNDcuOF0sWzE4LjQsNDcuOF0sWzE4LjgsNDcuOF0sWzE4LjgsNDguMV0sWzE5LjIsNDguMV0sWzE5LjcsNDguMl0sWzIwLjEsNDguMl0sWzIwLjQsNDguNF0sWzIwLjgsNDguNl0sWzIxLjEsNDguNV0sWzIxLjUsNDguNV0sWzIxLjgsNDguM10sWzIyLjEsNDguNF0sWzIyLjQsNDguMl0sWzIyLjYsNDguMV0sWzIyLjksNDhdLFsyMi41LDQ3LjhdLFsyMi4yLDQ3LjZdLFsyMS45LDQ3LjRdLFsyMS43LDQ3LjFdLFsyMS41LDQ2LjddLFsyMS4yLDQ2LjRdLFsyMSw0Ni4zXSxbMjAuNyw0Ni4yXSxbMjAuNSw0Ni4yXSxbMjAuMiw0Ni4yXSxbMTkuOCw0Ni4yXSxbMTkuNSw0Ni4xXSxbMTksNDZdLFsxOC44LDQ1LjldXV0sXCJ0eXBlXCI6XCJQb2x5Z29uXCJ9LFwidHlwZVwiOlwiRmVhdHVyZVwiLFwicHJvcGVydGllc1wiOntcImlzbzJcIjpcIkhVXCIsXCJsbmdcIjoyMCxcImxhdFwiOjQ3fX0se1wiZ2VvbWV0cnlcIjp7XCJjb29yZGluYXRlc1wiOltbW1stNy40LDU1XSxbLTcuNyw1NC43XSxbLTgsNTQuNV0sWy03LjksNTQuM10sWy03LjYsNTQuMV0sWy03LjEsNTQuNF0sWy02LjcsNTQuMV0sWy02LjIsNTQuMV0sWy02LjQsNTMuOV0sWy02LjIsNTMuN10sWy02LjIsNTMuNF0sWy02LjEsNTIuOV0sWy02LjIsNTIuNl0sWy02LjMsNTIuM10sWy02LjgsNTIuMl0sWy03LjEsNTIuMV0sWy03LjUsNTJdLFstNy45LDUxLjldLFstOC4zLDUxLjldLFstOC41LDUxLjddLFstOSw1MS42XSxbLTkuNiw1MS41XSxbLTkuNyw1MS42XSxbLTkuNSw1MS44XSxbLTEwLjEsNTEuNl0sWy05LjcsNTEuOV0sWy0xMC40LDUxLjldLFstOS44LDUyLjFdLFstMTAuMSw1Mi4xXSxbLTEwLjUsNTIuMl0sWy05LjcsNTIuMl0sWy05LjcsNTIuNl0sWy05LDUyLjZdLFstOS4xLDUyLjZdLFstOS42LDUyLjddLFstOS4zLDUzLjJdLFstOC45LDUzLjFdLFstOS40LDUzLjJdLFstOS43LDUzLjRdLFstOS44LDUzLjRdLFstMTAsNTMuNl0sWy05LjksNTMuOF0sWy05LjcsNTMuOV0sWy05LjksNTQuMV0sWy0xMC4xLDU0LjNdLFstOS42LDU0LjNdLFstOS4xLDU0LjJdLFstOC42LDU0LjNdLFstOC4zLDU0LjVdLFstOC44LDU0LjddLFstOC40LDU0LjhdLFstOC41LDU1XSxbLTcuOCw1NS4yXSxbLTcuNSw1NS4xXSxbLTcuNSw1NV0sWy03LjQsNTUuM10sWy03LDU1LjJdLFstNy4zLDU1XSxbLTcuNCw1NV1dXSxbXSxbXSxbXSxbXV0sXCJ0eXBlXCI6XCJNdWx0aVBvbHlnb25cIn0sXCJ0eXBlXCI6XCJGZWF0dXJlXCIsXCJwcm9wZXJ0aWVzXCI6e1wiaXNvMlwiOlwiSUVcIixcImxuZ1wiOi04LFwibGF0XCI6NTN9fSx7XCJnZW9tZXRyeVwiOntcImNvb3JkaW5hdGVzXCI6W1tbLTE1LjEsNjYuMV0sWy0xNC42LDY1LjldLFstMTQuMyw2NS44XSxbLTEzLjksNjUuNl0sWy0xMy44LDY1LjJdLFstMTQsNjUuMV0sWy0xNCw2NC44XSxbLTE0LjUsNjQuNl0sWy0xNS4yLDY0LjNdLFstMTYuMiw2NF0sWy0xNy4xLDYzLjhdLFstMTcuOSw2My41XSxbLTE5LjMsNjMuNF0sWy0yMC41LDYzLjddLFstMjAuOCw2My44XSxbLTIxLjQsNjMuOV0sWy0yMi4zLDYzLjldLFstMjIuMyw2NF0sWy0yMS44LDY0LjNdLFstMjIuMSw2NC4zXSxbLTIyLjEsNjQuNV0sWy0yMi43LDY0LjhdLFstMjMuNiw2NC43XSxbLTIzLjgsNjQuOV0sWy0yMi40LDY1LjFdLFstMjEuOCw2NS4yXSxbLTIyLjIsNjUuM10sWy0yMi4yLDY1LjRdLFstMjIuOCw2NS41XSxbLTIzLjcsNjUuNF0sWy0yNC4zLDY1LjZdLFstMjQsNjUuN10sWy0yMy41LDY1LjZdLFstMjMuNiw2NS44XSxbLTIzLjcsNjZdLFstMjMuNiw2Ni4yXSxbLTIyLjcsNjYuMV0sWy0yMi41LDY1LjhdLFstMjIuNyw2Ni4zXSxbLTIzLjIsNjYuNF0sWy0yMiw2Ni4zXSxbLTIxLjYsNjUuOV0sWy0yMS42LDY1LjZdLFstMjEuMSw2NS41XSxbLTIwLjQsNjUuNV0sWy0yMC4xLDY2LjFdLFstMTkuNSw2NS43XSxbLTE5LjIsNjYuMV0sWy0xOC41LDY2LjFdLFstMTgsNjUuN10sWy0xOCw2Ni4yXSxbLTE3LjIsNjYuMl0sWy0xNi40LDY2LjJdLFstMTUuOSw2Ni40XSxbLTE1LjIsNjYuM10sWy0xNC45LDY2LjJdLFstMTUuMSw2Ni4xXV1dLFwidHlwZVwiOlwiUG9seWdvblwifSxcInR5cGVcIjpcIkZlYXR1cmVcIixcInByb3BlcnRpZXNcIjp7XCJpc28yXCI6XCJJU1wiLFwibG5nXCI6LTE4LFwibGF0XCI6NjV9fSx7XCJnZW9tZXRyeVwiOntcImNvb3JkaW5hdGVzXCI6W1tbWzEyLjEsNDddLFsxMi44LDQ2LjZdLFsxMy41LDQ2LjRdLFsxMy41LDQ2LjFdLFsxMy45LDQ1LjZdLFsxMy4xLDQ1LjhdLFsxMi40LDQ1LjRdLFsxMi40LDQ1XSxbMTIuMyw0NC41XSxbMTMsNDMuOF0sWzEzLjYsNDMuNV0sWzE0LjEsNDIuNV0sWzE0LjksNDJdLFsxNS43LDQxLjldLFsxNS45LDQxLjZdLFsxNyw0MS4xXSxbMTguMSw0MC41XSxbMTguNCwzOS44XSxbMTcuOSw0MC4zXSxbMTcuMyw0MC41XSxbMTYuNiw0MC4xXSxbMTYuOCwzOS42XSxbMTcuMSwzOC45XSxbMTYuNiwzOC42XSxbMTYuMSwzOC4xXSxbMTUuNiwzOF0sWzE1LjgsMzguNl0sWzE2LjIsMzldLFsxNS45LDM5LjVdLFsxNS42LDQwLjFdLFsxNC45LDQwLjJdLFsxNC43LDQwLjZdLFsxNC4yLDQwLjhdLFsxMy42LDQxLjNdLFsxMi45LDQxLjRdLFsxMi4yLDQxLjldLFsxMS42LDQyLjNdLFsxMS4yLDQyLjZdLFsxMC42LDQzXSxbMTAuMyw0My42XSxbOS40LDQ0LjNdLFs4LjQsNDQuMl0sWzcuNyw0My44XSxbNy42LDQ0LjJdLFs2LjksNDQuNV0sWzYuNiw0NS4xXSxbNy4yLDQ1LjRdLFs2LjksNDUuOF0sWzcuNiw0Nl0sWzguMiw0Ni4yXSxbOC40LDQ2LjJdLFs4LjksNDUuOV0sWzkuMiw0Ni4yXSxbOS41LDQ2LjNdLFsxMC4xLDQ2LjJdLFsxMC4zLDQ2LjZdLFsxMC42LDQ2LjldLFsxMS41LDQ3XSxbMTIuMSw0N11dXSxbW1sxNS41LDM4LjFdLFsxNS40LDM3LjldLFsxNS4yLDM3LjddLFsxNS4yLDM3LjVdLFsxNS4xLDM3LjRdLFsxNS4yLDM3LjJdLFsxNS4zLDM3LjFdLFsxNS4yLDM3XSxbMTUuMSwzNi45XSxbMTUuMSwzNi43XSxbMTUsMzYuN10sWzE0LjgsMzYuN10sWzE0LjYsMzYuOF0sWzE0LjQsMzYuOV0sWzE0LjMsMzddLFsxNC4xLDM3LjFdLFsxMy45LDM3LjFdLFsxMy42LDM3LjJdLFsxMy41LDM3LjNdLFsxMy4zLDM3LjRdLFsxMy4xLDM3LjVdLFsxMywzNy42XSxbMTIuOCwzNy42XSxbMTIuNSwzNy43XSxbMTIuNSwzNy44XSxbMTIuNSwzOF0sWzEyLjcsMzguMV0sWzEyLjksMzhdLFsxMywzOC4xXSxbMTMuMSwzOC4yXSxbMTMuNCwzOC4yXSxbMTMuNywzOF0sWzEzLjksMzhdLFsxNC4xLDM4XSxbMTQuMywzOF0sWzE0LjUsMzhdLFsxNC43LDM4LjFdLFsxNC45LDM4LjJdLFsxNS4xLDM4LjFdLFsxNS4zLDM4LjJdLFsxNS42LDM4LjNdLFsxNS42LDM4LjJdLFsxNS41LDM4LjFdXV0sW1tbOS41LDQxLjFdLFs5LjYsNDFdLFs5LjYsNDAuOV0sWzkuNyw0MC43XSxbOS43LDQwLjZdLFs5LjgsNDAuNV0sWzkuNyw0MC40XSxbOS42LDQwLjNdLFs5LjcsNDAuMV0sWzkuNywzOS45XSxbOS43LDM5LjddLFs5LjYsMzkuNV0sWzkuNiwzOS4zXSxbOS42LDM5LjFdLFs5LjQsMzkuMV0sWzkuMywzOS4yXSxbOSwzOS4xXSxbOC45LDM4LjldLFs4LjcsMzguOV0sWzguNiwzOV0sWzguNSwzOV0sWzguMywzOS4xXSxbOC40LDM5LjJdLFs4LjQsMzkuNF0sWzguNCwzOS42XSxbOC40LDM5LjhdLFs4LjUsMzkuN10sWzguNiwzOS45XSxbOC40LDM5LjldLFs4LjUsNDAuMV0sWzguNSw0MC4zXSxbOC4zLDQwLjZdLFs4LjEsNDAuNl0sWzguMSw0MC43XSxbOC4zLDQwLjldLFs4LjQsNDAuOF0sWzguNiw0MC44XSxbOC43LDQwLjldLFs4LjgsNDFdLFs5LDQxLjFdLFs5LjIsNDEuMl0sWzkuNSw0MS4xXV1dLFtdLFtdLFtdLFtdXSxcInR5cGVcIjpcIk11bHRpUG9seWdvblwifSxcInR5cGVcIjpcIkZlYXR1cmVcIixcInByb3BlcnRpZXNcIjp7XCJpc28yXCI6XCJJVFwiLFwibG5nXCI6MTIuOCxcImxhdFwiOjQyLjh9fSx7XCJnZW9tZXRyeVwiOntcImNvb3JkaW5hdGVzXCI6W10sXCJ0eXBlXCI6XCJQb2x5Z29uXCJ9LFwidHlwZVwiOlwiRmVhdHVyZVwiLFwicHJvcGVydGllc1wiOntcImlzbzJcIjpcIkxJXCIsXCJsbmdcIjo5LjUsXCJsYXRcIjo0Ny4zfX0se1wiZ2VvbWV0cnlcIjp7XCJjb29yZGluYXRlc1wiOltbW1syNSw1Ni4zXSxbMjUuMyw1Ni4yXSxbMjUuNyw1Ni4xXSxbMjYuMSw1NS45XSxbMjYuMyw1NS44XSxbMjYuNSw1NS43XSxbMjYuNSw1NS40XSxbMjYuOCw1NS4zXSxbMjYuNSw1NS4yXSxbMjYuMiw1NV0sWzI1LjksNTQuOV0sWzI1LjcsNTQuN10sWzI1LjcsNTQuNV0sWzI1LjUsNTQuM10sWzI1LjgsNTQuM10sWzI1LjYsNTQuMV0sWzI1LjYsNTQuMl0sWzI1LjIsNTQuMl0sWzI1LDU0LjJdLFsyNC44LDU0XSxbMjQuNSw1NF0sWzI0LjMsNTMuOV0sWzI0LjEsNTRdLFsyMy45LDUzLjldLFsyMy42LDUzLjldLFsyMy41LDU0LjFdLFsyMy4zLDU0LjJdLFsyMyw1NC40XSxbMjIuNyw1NC40XSxbMjIuOCw1NC44XSxbMjIuOCw1NC45XSxbMjIuNSw1NS4xXSxbMjIuMSw1NS4xXSxbMjEuNyw1NS4yXSxbMjEuMyw1NS4zXSxbMjEuMiw1NS40XSxbMjEuMiw1NS42XSxbMjEsNTUuOV0sWzIxLjEsNTYuMV0sWzIxLjMsNTYuMl0sWzIxLjcsNTYuM10sWzIyLjEsNTYuNF0sWzIyLjUsNTYuNF0sWzIyLjgsNTYuNF0sWzIzLDU2LjNdLFsyMy4yLDU2LjRdLFsyMy40LDU2LjNdLFsyMy42LDU2LjRdLFsyNCw1Ni4zXSxbMjQuMyw1Ni4zXSxbMjQuNiw1Ni4zXSxbMjQuOSw1Ni41XSxbMjUsNTYuM11dXSxbXV0sXCJ0eXBlXCI6XCJNdWx0aVBvbHlnb25cIn0sXCJ0eXBlXCI6XCJGZWF0dXJlXCIsXCJwcm9wZXJ0aWVzXCI6e1wiaXNvMlwiOlwiTFRcIixcImxuZ1wiOjI0LFwibGF0XCI6NTZ9fSx7XCJnZW9tZXRyeVwiOntcImNvb3JkaW5hdGVzXCI6W1tbNiw1MC4yXSxbNi4xLDUwLjFdLFs2LjEsNTBdLFs2LjIsNTBdLFs2LjIsNDkuOV0sWzYuMyw0OS45XSxbNi4zLDQ5LjhdLFs2LjQsNDkuOF0sWzYuNSw0OS44XSxbNi41LDQ5LjddLFs2LjQsNDkuN10sWzYuNCw0OS41XSxbNi4zLDQ5LjVdLFs2LjIsNDkuNV0sWzYuMSw0OS41XSxbNiw0OS40XSxbNS45LDQ5LjVdLFs1LjgsNDkuNV0sWzUuOCw0OS42XSxbNS45LDQ5LjZdLFs1LjksNDkuN10sWzUuOCw0OS44XSxbNS43LDQ5LjhdLFs1LjcsNDkuOV0sWzUuOCw1MF0sWzUuOSw1MC4xXSxbNiw1MC4yXV1dLFwidHlwZVwiOlwiUG9seWdvblwifSxcInR5cGVcIjpcIkZlYXR1cmVcIixcInByb3BlcnRpZXNcIjp7XCJpc28yXCI6XCJMVVwiLFwibG5nXCI6Ni4yLFwibGF0XCI6NDkuOH19LHtcImdlb21ldHJ5XCI6e1wiY29vcmRpbmF0ZXNcIjpbW1syMS4xLDU2LjRdLFsyMSw1Ni43XSxbMjEuMSw1Ni45XSxbMjEuNCw1N10sWzIxLjQsNTcuM10sWzIxLjYsNTcuNV0sWzIxLjgsNTcuNl0sWzIyLjEsNTcuNl0sWzIyLjYsNTcuOF0sWzIyLjcsNTcuNl0sWzIyLjksNTcuNF0sWzIzLjIsNTcuM10sWzIzLjMsNTcuMV0sWzIzLjcsNTddLFsyNCw1N10sWzI0LjQsNTcuM10sWzI0LjMsNTcuN10sWzI0LjQsNTcuOV0sWzI0LjYsNThdLFsyNSw1OC4xXSxbMjUuMiw1OF0sWzI1LjQsNThdLFsyNS44LDU3LjldLFsyNi4yLDU3LjddLFsyNi42LDU3LjVdLFsyNi45LDU3LjZdLFsyNy4zLDU3LjVdLFsyNy41LDU3LjRdLFsyNy44LDU3LjNdLFsyNy44LDU3LjJdLFsyNy44LDU2LjldLFsyNy45LDU2LjddLFsyOC4yLDU2LjRdLFsyOC4xLDU2LjJdLFsyNy43LDU2XSxbMjcuNiw1NS44XSxbMjcuMiw1NS44XSxbMjYuOSw1NS44XSxbMjYuNyw1NS43XSxbMjYuNCw1NS43XSxbMjYuMiw1NS44XSxbMjYsNTZdLFsyNS42LDU2LjJdLFsyNS4yLDU2LjJdLFsyNSw1Ni40XSxbMjQuNyw1Ni40XSxbMjQuNCw1Ni4zXSxbMjQuMSw1Ni4zXSxbMjMuNyw1Ni40XSxbMjMuNSw1Ni4zXSxbMjMuMyw1Ni40XSxbMjMuMSw1Ni4zXSxbMjIuOSw1Ni40XSxbMjIuNiw1Ni40XSxbMjIuMiw1Ni40XSxbMjEuOSw1Ni40XSxbMjEuNCw1Ni4yXSxbMjEuMiw1Ni4xXSxbMjEsNTYuMl0sWzIxLjEsNTYuNF1dXSxcInR5cGVcIjpcIlBvbHlnb25cIn0sXCJ0eXBlXCI6XCJGZWF0dXJlXCIsXCJwcm9wZXJ0aWVzXCI6e1wiaXNvMlwiOlwiTFZcIixcImxuZ1wiOjI1LFwibGF0XCI6NTd9fSx7XCJnZW9tZXRyeVwiOntcImNvb3JkaW5hdGVzXCI6W10sXCJ0eXBlXCI6XCJQb2x5Z29uXCJ9LFwidHlwZVwiOlwiRmVhdHVyZVwiLFwicHJvcGVydGllc1wiOntcImlzbzJcIjpcIk1DXCIsXCJsbmdcIjo3LjQsXCJsYXRcIjo0My43fX0se1wiZ2VvbWV0cnlcIjp7XCJjb29yZGluYXRlc1wiOltbWzI4LjEsNDYuOV0sWzI4LDQ3XSxbMjcuOSw0Ny4xXSxbMjcuNyw0Ny4zXSxbMjcuNiw0Ny40XSxbMjcuNCw0Ny42XSxbMjcuMyw0Ny43XSxbMjcuMiw0Ny45XSxbMjcsNDguMl0sWzI2LjcsNDguM10sWzI2LjgsNDguM10sWzI3LjIsNDguNF0sWzI3LjUsNDguNV0sWzI3LjgsNDguNF0sWzI3LjksNDguM10sWzI4LjEsNDguM10sWzI4LjIsNDguMl0sWzI4LjQsNDguMl0sWzI4LjUsNDguMV0sWzI4LjcsNDguMV0sWzI4LjksNDhdLFsyOS4xLDQ3LjldLFsyOS4yLDQ4XSxbMjkuMiw0Ny42XSxbMjkuMSw0Ny41XSxbMjkuMiw0Ny41XSxbMjkuMyw0Ny40XSxbMjkuNCw0Ny4zXSxbMjkuNiw0Ny4zXSxbMjkuNiw0N10sWzI5LjcsNDYuOV0sWzI5LjksNDYuOF0sWzMwLDQ2LjZdLFsyOS45LDQ2LjVdLFszMCw0Ni40XSxbMjkuOSw0Ni40XSxbMjkuOCw0Ni40XSxbMjkuNiw0Ni40XSxbMjkuNSw0Ni41XSxbMjkuMyw0Ni40XSxbMjkuMiw0Ni41XSxbMjguOSw0Ni40XSxbMjksNDYuMl0sWzI4LjksNDZdLFsyOC43LDQ2XSxbMjguOCw0NS45XSxbMjguNyw0NS44XSxbMjguNSw0NS43XSxbMjguNSw0NS41XSxbMjguMyw0NS41XSxbMjguMiw0NS40XSxbMjguMiw0NS42XSxbMjguMSw0NS45XSxbMjguMSw0Ni4xXSxbMjguMiw0Ni4zXSxbMjguMyw0Ni40XSxbMjguMiw0Ni43XSxbMjguMSw0Ni45XV1dLFwidHlwZVwiOlwiUG9seWdvblwifSxcInR5cGVcIjpcIkZlYXR1cmVcIixcInByb3BlcnRpZXNcIjp7XCJpc28yXCI6XCJNRFwiLFwibG5nXCI6MjksXCJsYXRcIjo0N319LHtcImdlb21ldHJ5XCI6e1wiY29vcmRpbmF0ZXNcIjpbW1sxOC41LDQyLjZdLFsxOC42LDQyLjddLFsxOC41LDQyLjhdLFsxOC42LDQzXSxbMTguNyw0My4xXSxbMTguNyw0My4zXSxbMTguOSw0My40XSxbMTksNDMuMl0sWzE5LjEsNDMuM10sWzE5LDQzLjVdLFsxOSw0My42XSxbMTkuMyw0My41XSxbMTkuNCw0My40XSxbMTkuNiw0My4zXSxbMTkuNyw0My4yXSxbMTkuOSw0My4xXSxbMjAsNDNdLFsyMC4yLDQzXSxbMjAuNCw0Mi44XSxbMjAuMSw0Mi44XSxbMjAsNDIuN10sWzIwLjEsNDIuNl0sWzE5LjksNDIuNV0sWzE5LjcsNDIuNV0sWzE5LjcsNDIuN10sWzE5LjYsNDIuNl0sWzE5LjUsNDIuNF0sWzE5LjQsNDIuMV0sWzE5LjMsNDEuOV0sWzE5LjIsNDEuOV0sWzE5LjEsNDJdLFsxOSw0Mi4xXSxbMTguOSw0Mi4zXSxbMTguNyw0Mi40XSxbMTguNSw0Mi40XSxbMTguNSw0Mi41XSxbMTguNSw0Mi42XV1dLFwidHlwZVwiOlwiUG9seWdvblwifSxcInR5cGVcIjpcIkZlYXR1cmVcIixcInByb3BlcnRpZXNcIjp7XCJpc28yXCI6XCJNRVwiLFwibG5nXCI6MTkuMyxcImxhdFwiOjQyLjV9fSx7XCJnZW9tZXRyeVwiOntcImNvb3JkaW5hdGVzXCI6W1tbMjAuOCw0MC45XSxbMjAuNyw0MS4xXSxbMjAuNiw0MS4yXSxbMjAuNSw0MS4zXSxbMjAuNiw0MS40XSxbMjAuNSw0MS42XSxbMjAuNSw0MS44XSxbMjAuNyw0MS45XSxbMjAuOCw0Ml0sWzIwLjksNDIuMV0sWzIxLjIsNDIuMV0sWzIxLjMsNDIuMl0sWzIxLjYsNDIuM10sWzIxLjgsNDIuM10sWzIyLDQyLjNdLFsyMi4yLDQyLjNdLFsyMi40LDQyLjNdLFsyMi41LDQyLjFdLFsyMi43LDQyLjFdLFsyMi45LDQxLjldLFsyMyw0MS44XSxbMjMsNDEuNl0sWzIzLDQxLjRdLFsyMi44LDQxLjNdLFsyMi43LDQxLjJdLFsyMi42LDQxLjFdLFsyMi40LDQxLjFdLFsyMi4zLDQxLjJdLFsyMiw0MS4xXSxbMjEuOSw0MV0sWzIxLjYsNDAuOV0sWzIxLjQsNDAuOV0sWzIxLjIsNDAuOV0sWzIxLDQwLjldLFsyMC44LDQwLjldXV0sXCJ0eXBlXCI6XCJQb2x5Z29uXCJ9LFwidHlwZVwiOlwiRmVhdHVyZVwiLFwicHJvcGVydGllc1wiOntcImlzbzJcIjpcIk1LXCIsXCJsbmdcIjoyMixcImxhdFwiOjQxLjh9fSx7XCJnZW9tZXRyeVwiOntcImNvb3JkaW5hdGVzXCI6W1tdLFtdXSxcInR5cGVcIjpcIk11bHRpUG9seWdvblwifSxcInR5cGVcIjpcIkZlYXR1cmVcIixcInByb3BlcnRpZXNcIjp7XCJpc28yXCI6XCJNVFwiLFwibG5nXCI6MTQuNixcImxhdFwiOjM1Ljh9fSx7XCJnZW9tZXRyeVwiOntcImNvb3JkaW5hdGVzXCI6W1tbWzYuOSw1My40XSxbNy4yLDUzXSxbNy4xLDUyLjddLFs2LjksNTIuN10sWzYuNyw1Mi41XSxbNyw1Mi41XSxbNy4xLDUyLjJdLFs2LjgsNTIuMV0sWzYuOCw1MS45XSxbNi40LDUxLjhdLFs2LDUxLjddLFs2LjIsNTEuNF0sWzYsNTEuMV0sWzYuMSw1MC45XSxbNS45LDUwLjhdLFs1LjYsNTAuOV0sWzUuOSw1MS4yXSxbNS41LDUxLjNdLFs1LjEsNTEuM10sWzUsNTEuNF0sWzQuNyw1MS41XSxbNC41LDUxLjVdLFs0LjMsNTEuNF0sWzMuOCw1MS40XSxbMy41LDUxLjZdLFszLjksNTEuNl0sWzQuMSw1MS41XSxbNC4xLDUxLjZdLFszLjcsNTEuN10sWzQuMSw1MS44XSxbNCw1Ml0sWzQuNSw1Mi4zXSxbNC43LDUyLjVdLFs1LDUyLjRdLFs1LjQsNTIuM10sWzUuNiw1Mi40XSxbNS45LDUyLjVdLFs1LjYsNTIuN10sWzUuNiw1Mi45XSxbNS4zLDUzLjFdLFs1LjEsNTIuOF0sWzUuMiw1Mi43XSxbNS4xLDUyLjVdLFs0LjcsNTIuOF0sWzQuOCw1Mi45XSxbNS41LDUzLjJdLFs2LjEsNTMuNF0sWzYuNyw1My41XSxbNi45LDUzLjRdXV0sW1tbMy44LDUxLjNdLFszLjksNTEuM10sWzQsNTEuNF0sWzQuMiw1MS40XSxbNC4yLDUxLjNdLFs0LjEsNTEuM10sWzQsNTEuMl0sWzMuOSw1MS4yXSxbMy44LDUxLjJdLFszLjcsNTEuM10sWzMuNiw1MS4zXSxbMy41LDUxLjNdLFszLjUsNTEuMl0sWzMuNCw1MS4yXSxbMy40LDUxLjNdLFszLjQsNTEuNF0sWzMuNSw1MS40XSxbMy42LDUxLjRdLFszLjcsNTEuNF0sWzMuOCw1MS4zXV1dLFtbWzUuOCw1Mi40XSxbNS43LDUyLjRdLFs1LjYsNTIuNF0sWzUuNSw1Mi40XSxbNS41LDUyLjNdLFs1LjYsNTIuM10sWzUuNCw1Mi4zXSxbNS4zLDUyLjNdLFs1LjIsNTIuM10sWzUuMSw1Mi4zXSxbNS4xLDUyLjRdLFs1LjIsNTIuNF0sWzUuMyw1Mi41XSxbNS40LDUyLjVdLFs1LjUsNTIuNV0sWzUuNiw1Mi42XSxbNS44LDUyLjZdLFs1LjksNTIuNV0sWzUuOCw1Mi41XSxbNS44LDUyLjRdXV0sW10sW10sW10sW11dLFwidHlwZVwiOlwiTXVsdGlQb2x5Z29uXCJ9LFwidHlwZVwiOlwiRmVhdHVyZVwiLFwicHJvcGVydGllc1wiOntcImlzbzJcIjpcIk5MXCIsXCJsbmdcIjo1LjgsXCJsYXRcIjo1Mi41fX0se1wiZ2VvbWV0cnlcIjp7XCJjb29yZGluYXRlc1wiOltbW1s1LjMsNjEuNl0sWzUuMiw2MS45XSxbNi4zLDYyLjRdLFs2LjQsNjIuNV0sWzcuNiw2Mi44XSxbOC4zLDYyLjhdLFs4LjgsNjMuM10sWzEwLjYsNjMuNF0sWzExLDY0XSxbOS42LDYzLjddLFsxMC45LDY0LjZdLFsxMS4yLDY0LjddLFsxMi40LDY1LjNdLFsxMi45LDY2LjFdLFsxMyw2Ni40XSxbMTMuOCw2Ni45XSxbMTUuNSw2Ny4yXSxbMTUuNSw2Ny40XSxbMTUsNjcuOF0sWzE2LDY4LjJdLFsxNi40LDY4LjNdLFsxNy4xLDY4LjVdLFsxNy43LDY5LjFdLFsxOS4yLDY5LjNdLFsxOS43LDY5LjRdLFsyMC44LDY5LjhdLFsyMS41LDcwLjFdLFsyMi43LDcwLjFdLFsyNC4yLDcwLjZdLFsyNS4zLDcwLjldLFsyNS4zLDcwLjFdLFsyNi42LDcwLjRdLFsyNy43LDcxLjFdLFsyOC4zLDcwLjddLFsyOS4zLDcwLjddLFszMC43LDcwLjNdLFsyOS43LDY5LjldLFszMC45LDY5LjVdLFsyOS4xLDY5LjRdLFsyNi4yLDY5LjhdLFsyNC40LDY4LjddLFsyMS43LDY5LjNdLFsxOS45LDY4LjNdLFsxNi4xLDY3LjRdLFsxNC4zLDY1LjFdLFsxMi4zLDYzLjddLFsxMi44LDYxLjRdLFsxMS45LDU5LjhdLFsxMC42LDU5LjldLFsxMCw1OV0sWzcuMiw1OF0sWzUuNiw1OV0sWzYuNSw1OS4zXSxbNS4yLDU5LjVdLFs2LjIsNjAuM10sWzUuNyw2MC40XSxbNSw2MC44XSxbNi4zLDYxLjFdLFs2LjcsNjEuNF0sWzUuMyw2MS42XV1dLFtbWzE2LDY4LjhdLFsxNiw2OC43XSxbMTUuOSw2OC43XSxbMTUuOSw2OC42XSxbMTUuOCw2OC42XSxbMTUuNyw2OC41XSxbMTUuOCw2OC41XSxbMTYuMSw2OC43XSxbMTYuMSw2OC44XSxbMTYuMiw2OC45XSxbMTYuNCw2OC45XSxbMTYuNCw2OC44XSxbMTYuNSw2OC44XSxbMTYuNiw2OC43XSxbMTYuNiw2OC42XSxbMTYuNSw2OC42XSxbMTYuNCw2OC42XSxbMTYuMyw2OC42XSxbMTYuMiw2OC41XSxbMTYuMSw2OC41XSxbMTYsNjguNV0sWzE2LDY4LjRdLFsxNS45LDY4LjRdLFsxNS44LDY4LjRdLFsxNS43LDY4LjNdLFsxNS42LDY4LjNdLFsxNS41LDY4LjNdLFsxNS40LDY4LjNdLFsxNS4zLDY4LjNdLFsxNS40LDY4LjRdLFsxNS41LDY4LjRdLFsxNS42LDY4LjVdLFsxNS41LDY4LjVdLFsxNS4zLDY4LjRdLFsxNS4yLDY4LjNdLFsxNS4xLDY4LjNdLFsxNSw2OC4yXSxbMTUsNjguM10sWzE1LjEsNjguNF0sWzE1LjIsNjguNV0sWzE1LjMsNjguNV0sWzE1LjIsNjguNl0sWzE1LjMsNjguNl0sWzE1LjQsNjguNl0sWzE1LjUsNjguN10sWzE1LjQsNjguN10sWzE1LjYsNjguN10sWzE1LjcsNjguN10sWzE1LjUsNjguOF0sWzE1LjYsNjguOV0sWzE1LjcsNjldLFsxNS45LDY5XSxbMTUuOSw2OC45XSxbMTUuOSw2OC44XSxbMTYsNjguOF1dXSxbW1sxNy42LDY5LjVdLFsxNy43LDY5LjVdLFsxNy43LDY5LjZdLFsxNy44LDY5LjZdLFsxNy45LDY5LjZdLFsxOCw2OS41XSxbMTguMSw2OS40XSxbMTguMSw2OS4zXSxbMTgsNjkuM10sWzE3LjksNjkuM10sWzE3LjksNjkuMl0sWzE4LDY5LjJdLFsxNy42LDY5LjJdLFsxNy41LDY5LjJdLFsxNy40LDY5LjJdLFsxNy4yLDY5LjFdLFsxNy4yLDY5XSxbMTcuMSw2OV0sWzE3LDY5XSxbMTcuMSw2OS4xXSxbMTcsNjkuMV0sWzE2LjksNjkuMV0sWzE2LjgsNjldLFsxNi44LDY5LjFdLFsxNy4xLDY5LjJdLFsxNy4yLDY5LjJdLFsxNyw2OS4yXSxbMTYuOSw2OS4yXSxbMTcuMSw2OS4zXSxbMTcsNjkuM10sWzE2LjksNjkuM10sWzE3LDY5LjRdLFsxNi45LDY5LjRdLFsxNy4yLDY5LjRdLFsxNy4zLDY5LjRdLFsxNy40LDY5LjRdLFsxNy41LDY5LjRdLFsxNy4yLDY5LjVdLFsxNy4zLDY5LjVdLFsxNy40LDY5LjVdLFsxNy41LDY5LjVdLFsxNy41LDY5LjZdLFsxNy42LDY5LjZdLFsxNy42LDY5LjVdXV0sW1tbMjMuNSw3MC44XSxbMjMuNCw3MC43XSxbMjMuMyw3MC43XSxbMjMuMiw3MC43XSxbMjMuMSw3MC42XSxbMjIuOSw3MC41XSxbMjIuOCw3MC41XSxbMjIuOCw3MC42XSxbMjIuNyw3MC42XSxbMjIuNiw3MC42XSxbMjIuNiw3MC41XSxbMjIuNSw3MC41XSxbMjIuMyw3MC41XSxbMjIuMiw3MC41XSxbMjIuMSw3MC41XSxbMjIuMyw3MC42XSxbMjIuMiw3MC42XSxbMjIuMSw3MC42XSxbMjIsNzAuNl0sWzIxLjksNzAuNl0sWzIyLDcwLjddLFsyMi4xLDcwLjddLFsyMi4zLDcwLjddLFsyMi40LDcwLjddLFsyMi41LDcwLjddLFsyMi42LDcwLjddLFsyMi43LDcwLjddLFsyMi44LDcwLjddLFsyMi44LDcwLjhdLFsyMi45LDcwLjddLFsyMyw3MC43XSxbMjMuMSw3MC43XSxbMjMuMiw3MC44XSxbMjMuMyw3MC44XSxbMjMuMyw3MC45XSxbMjMuNCw3MC45XSxbMjMuNCw3MC44XSxbMjMuNSw3MC44XV1dLFtbWzE1LjQsNjguOF0sWzE1LjQsNjguN10sWzE1LjMsNjguNl0sWzE1LjEsNjguNl0sWzE1LDY4LjZdLFsxNC45LDY4LjZdLFsxNC44LDY4LjZdLFsxNC45LDY4LjddLFsxNS4xLDY4LjddLFsxNS4yLDY4LjddLFsxNS4xLDY4LjhdLFsxNSw2OC44XSxbMTUsNjguN10sWzE0LjgsNjguN10sWzE0LjcsNjguN10sWzE0LjUsNjguNl0sWzE0LjQsNjguNl0sWzE0LjQsNjguN10sWzE0LjQsNjguOF0sWzE0LjUsNjguOF0sWzE0LjYsNjguOF0sWzE0LjcsNjguOF0sWzE0LjksNjguOF0sWzE0LjksNjguOV0sWzE1LDY4LjldLFsxNS4xLDY4LjldLFsxNS4yLDY4LjhdLFsxNSw2OV0sWzE1LjEsNjldLFsxNS4yLDY5XSxbMTUuMiw2OC45XSxbMTUuMyw2OC45XSxbMTUuNCw2OC44XV1dLFtbWzE4LjksNjkuN10sWzE4LjgsNjkuN10sWzE4LjgsNjkuNl0sWzE4LjcsNjkuNl0sWzE4LjYsNjkuNl0sWzE4LjUsNjkuNl0sWzE4LjQsNjkuNV0sWzE4LjMsNjkuNV0sWzE4LjIsNjkuNV0sWzE4LDY5LjZdLFsxOC4xLDY5LjZdLFsxOC4yLDY5LjZdLFsxOC4zLDY5LjZdLFsxOC4yLDY5LjddLFsxOC4zLDY5LjddLFsxOC40LDY5LjddLFsxOC42LDY5LjddLFsxOC41LDY5LjddLFsxOC4zLDY5LjhdLFsxOC40LDY5LjhdLFsxOC41LDY5LjhdLFsxOC42LDY5LjhdLFsxOC43LDY5LjddLFsxOC44LDY5LjhdLFsxOC43LDY5LjhdLFsxOC43LDY5LjldLFsxOC44LDY5LjldLFsxOSw2OS44XSxbMTkuMSw2OS44XSxbMTksNjkuN10sWzE4LjksNjkuN11dXSxbW1sxOS4zLDcwXSxbMTkuNCw3MF0sWzE5LjUsNzBdLFsxOS41LDcwLjFdLFsxOS42LDcwXSxbMTkuNyw3MF0sWzE5LjUsNjkuOV0sWzE5LjQsNjkuOF0sWzE5LjMsNjkuOF0sWzE5LjIsNjkuOF0sWzE5LjEsNjkuOF0sWzE5LDY5LjhdLFsxOSw2OS45XSxbMTguOSw2OS45XSxbMTguOCw2OS45XSxbMTguNyw2OS45XSxbMTguOCw3MF0sWzE4LjksNzBdLFsxOSw3MF0sWzE5LjEsNzBdLFsxOS4xLDcwLjFdLFsxOS4yLDcwLjFdLFsxOS4zLDcwLjFdLFsxOS4zLDcwXV1dXSxcInR5cGVcIjpcIk11bHRpUG9seWdvblwifSxcInR5cGVcIjpcIkZlYXR1cmVcIixcInByb3BlcnRpZXNcIjp7XCJpc28yXCI6XCJOT1wiLFwibG5nXCI6MTAsXCJsYXRcIjo2Mn19LHtcImdlb21ldHJ5XCI6e1wiY29vcmRpbmF0ZXNcIjpbW1sxOC45LDQ5LjVdLFsxOC41LDQ5LjldLFsxNy45LDUwXSxbMTcuOCw1MC4yXSxbMTcuMiw1MC4zXSxbMTcsNTAuMl0sWzE2LjYsNTAuMl0sWzE2LjIsNTAuNF0sWzE2LjEsNTAuN10sWzE1LjUsNTAuOF0sWzE1LDUwLjldLFsxNSw1MS40XSxbMTQuOCw1MS42XSxbMTQuOCw1Mi4xXSxbMTQuNiw1Mi41XSxbMTQuMiw1Mi44XSxbMTQuNCw1My4zXSxbMTQuNiw1My44XSxbMTQuMiw1My45XSxbMTUsNTQuMV0sWzE1LjgsNTQuMl0sWzE2LjMsNTQuNF0sWzE2LjksNTQuNl0sWzE3LjQsNTQuN10sWzE3LjksNTQuOF0sWzE4LjYsNTQuN10sWzE4LjUsNTQuNl0sWzE4LjksNTQuNF0sWzE5LjQsNTQuNF0sWzE5LjIsNTQuM10sWzE5LjksNTQuNF0sWzIwLjcsNTQuNF0sWzIxLjUsNTQuM10sWzIyLjMsNTQuM10sWzIyLjksNTQuNF0sWzIzLjUsNTQuMl0sWzIzLjYsNTMuNl0sWzIzLjksNTIuOF0sWzIzLjQsNTIuNV0sWzIzLjYsNTIuMV0sWzIzLjYsNTEuN10sWzIzLjcsNTEuMl0sWzI0LjEsNTAuOV0sWzI0LDUwLjRdLFsyMy41LDUwLjJdLFsyMi43LDQ5LjZdLFsyMi45LDQ5LjFdLFsyMi4zLDQ5LjFdLFsyMS41LDQ5LjRdLFsyMC45LDQ5LjNdLFsyMC4yLDQ5LjNdLFsxOS44LDQ5LjNdLFsxOS40LDQ5LjZdLFsxOC45LDQ5LjVdXV0sXCJ0eXBlXCI6XCJQb2x5Z29uXCJ9LFwidHlwZVwiOlwiRmVhdHVyZVwiLFwicHJvcGVydGllc1wiOntcImlzbzJcIjpcIlBMXCIsXCJsbmdcIjoyMCxcImxhdFwiOjUyfX0se1wiZ2VvbWV0cnlcIjp7XCJjb29yZGluYXRlc1wiOltbW1stOC4yLDQxLjldLFstNy45LDQxLjldLFstNy42LDQxLjhdLFstNy4yLDQxLjldLFstNi45LDQyXSxbLTYuNiw0Ml0sWy02LjUsNDEuN10sWy02LjIsNDEuNl0sWy02LjQsNDEuM10sWy02LjgsNDEuMV0sWy02LjgsNDAuOV0sWy02LjgsNDAuNF0sWy03LDQwLjFdLFstNy4xLDM5LjddLFstNy40LDM5LjZdLFstNy4zLDM5LjRdLFstNywzOS4xXSxbLTcuMiwzOC44XSxbLTcuMiwzOC4zXSxbLTcsMzguMV0sWy03LjMsMzhdLFstNy40LDM3LjddLFstNy40LDM3LjNdLFstNy42LDM3LjFdLFstOC4xLDM3LjFdLFstOC43LDM3LjFdLFstOSwzNy4xXSxbLTguOCwzNy40XSxbLTguOCwzNy45XSxbLTguOCwzOC4zXSxbLTguOSwzOC41XSxbLTkuMiwzOC41XSxbLTkuMSwzOC42XSxbLTksMzguOV0sWy05LjQsMzguN10sWy05LjQsMzguOV0sWy05LjMsMzkuMl0sWy05LjMsMzkuNF0sWy05LDM5LjddLFstOC45LDQwLjFdLFstOC44LDQwLjVdLFstOC43LDQwLjhdLFstOC43LDQxLjJdLFstOC45LDQxLjddLFstOC43LDQyXSxbLTguNCw0Mi4xXSxbLTguMSw0Mi4xXSxbLTguMiw0MS45XV1dLFtbWy0yNS42LDM3LjhdLFstMjUuNSwzNy44XSxbLTI1LjQsMzcuOF0sWy0yNS40LDM3LjldLFstMjUuMywzNy45XSxbLTI1LjIsMzcuOV0sWy0yNS4xLDM3LjhdLFstMjUuMiwzNy43XSxbLTI1LjMsMzcuN10sWy0yNS41LDM3LjddLFstMjUuNiwzNy43XSxbLTI1LjcsMzcuN10sWy0yNS43LDM3LjhdLFstMjUuOCwzNy44XSxbLTI1LjksMzcuOF0sWy0yNS45LDM3LjldLFstMjUuOCwzNy45XSxbLTI1LjcsMzcuOV0sWy0yNS42LDM3LjhdXV0sW10sW10sW10sW10sW11dLFwidHlwZVwiOlwiTXVsdGlQb2x5Z29uXCJ9LFwidHlwZVwiOlwiRmVhdHVyZVwiLFwicHJvcGVydGllc1wiOntcImlzbzJcIjpcIlBUXCIsXCJsbmdcIjotOCxcImxhdFwiOjM5LjV9fSx7XCJnZW9tZXRyeVwiOntcImNvb3JkaW5hdGVzXCI6W1tbMjAuNyw0Ni4yXSxbMjEsNDYuMl0sWzIxLjMsNDYuNl0sWzIxLjcsNDddLFsyMS45LDQ3LjRdLFsyMi4yLDQ3LjddLFsyMi43LDQ3LjhdLFsyMy4xLDQ4LjFdLFsyMy41LDQ4XSxbMjQuMiw0Ny45XSxbMjQuNiw0Ny45XSxbMjQuOSw0Ny43XSxbMjUuMiw0Ny45XSxbMjUuOCw0OF0sWzI2LjMsNDguMV0sWzI2LjcsNDguM10sWzI3LjIsNDcuOF0sWzI3LjYsNDcuNF0sWzI3LjksNDddLFsyOC4yLDQ2LjddLFsyOC4xLDQ2LjJdLFsyOC4yLDQ1LjZdLFsyOC4zLDQ1LjNdLFsyOC44LDQ1LjNdLFsyOS41LDQ1LjRdLFsyOS42LDQ1LjJdLFsyOS41LDQ0LjhdLFsyOSw0NC44XSxbMjguOSw0NV0sWzI4LjgsNDQuNl0sWzI4LjksNDQuNV0sWzI4LjYsNDQuMl0sWzI4LjYsNDMuN10sWzI4LjEsNDMuOF0sWzI3LjgsNDRdLFsyNy4zLDQ0LjFdLFsyNi44LDQ0LjFdLFsyNi4xLDQ0XSxbMjUuNyw0My43XSxbMjUuMyw0My43XSxbMjQuNyw0My43XSxbMjQuNCw0My43XSxbMjMuOCw0My44XSxbMjMuMyw0My44XSxbMjIuOSw0My45XSxbMjIuOSw0NC4xXSxbMjIuNSw0NC40XSxbMjIuOCw0NC41XSxbMjIuMyw0NC43XSxbMjEuOSw0NC42XSxbMjEuNSw0NC44XSxbMjEuNSw0NV0sWzIxLjQsNDUuMl0sWzIwLjgsNDUuN10sWzIwLjUsNDUuOV0sWzIwLjYsNDYuMl0sWzIwLjcsNDYuMl1dXSxcInR5cGVcIjpcIlBvbHlnb25cIn0sXCJ0eXBlXCI6XCJGZWF0dXJlXCIsXCJwcm9wZXJ0aWVzXCI6e1wiaXNvMlwiOlwiUk9cIixcImxuZ1wiOjI1LFwibGF0XCI6NDZ9fSx7XCJnZW9tZXRyeVwiOntcImNvb3JkaW5hdGVzXCI6W1tbMjAuMSw0Mi42XSxbMjAuMSw0Mi44XSxbMjAuMiw0M10sWzE5LjksNDMuMV0sWzE5LjYsNDMuM10sWzE5LjMsNDMuNV0sWzE5LjUsNDMuN10sWzE5LjMsNDRdLFsxOS42LDQ0XSxbMTkuMiw0NC4zXSxbMTkuMiw0NC42XSxbMTkuMyw0NC45XSxbMTkuMSw0NV0sWzE5LjQsNDUuMl0sWzE5LDQ1LjVdLFsxOC45LDQ1LjZdLFsxOC44LDQ1LjldLFsxOS4yLDQ2XSxbMTkuNyw0Ni4yXSxbMjAsNDYuMl0sWzIwLjMsNDYuMV0sWzIwLjcsNDUuOF0sWzIwLjgsNDUuNl0sWzIxLjQsNDUuMl0sWzIxLjQsNDVdLFsyMS40LDQ0LjldLFsyMS42LDQ0LjddLFsyMiw0NC42XSxbMjIuMyw0NC43XSxbMjIuNyw0NC42XSxbMjIuNiw0NC41XSxbMjIuNiw0NC4zXSxbMjIuNiw0NC4xXSxbMjIuNCw0My43XSxbMjIuNyw0My40XSxbMjMsNDMuMl0sWzIyLjUsNDIuOV0sWzIyLjUsNDIuNV0sWzIyLjMsNDIuNF0sWzIxLjksNDIuM10sWzIxLjUsNDIuM10sWzIxLjEsNDIuMl0sWzIwLjgsNDEuOV0sWzIwLjUsNDIuMl0sWzIwLjIsNDIuM10sWzIwLjEsNDIuNl1dXSxcInR5cGVcIjpcIlBvbHlnb25cIn0sXCJ0eXBlXCI6XCJGZWF0dXJlXCIsXCJwcm9wZXJ0aWVzXCI6e1wiaXNvMlwiOlwiUlNcIixcImxuZ1wiOjIxLFwibGF0XCI6NDR9fSx7XCJnZW9tZXRyeVwiOntcImNvb3JkaW5hdGVzXCI6W1tbWzEwNC4zLDc3LjddLFsxMTAuOSw3Ni44XSxbMTEwLDc0LjRdLFsxMTAuNiw3My44XSxbMTE3LDczLjZdLFsxMjcuMyw3MS40XSxbMTM1LjMsNzEuNl0sWzE0My4xLDcyLjddLFsxNDguNSw3Mi4zXSxbMTU5LDcwLjldLFsxNjguMiw2OS41XSxbMTc4LjIsNjkuNF0sWzE3Nyw2NC43XSxbMTczLjQsNjEuNl0sWzE2NC4zLDYwLjFdLFsxNjEuNyw1NS42XSxbMTU1LjksNTRdLFsxNjQsNjEuNF0sWzE1OS44LDYxLjNdLFsxNTIuNiw1OV0sWzE0NC41LDU5LjRdLFsxMzYuNyw1My44XSxbMTQxLjMsNTIuM10sWzEzNSw0My41XSxbMTMzLjUsNDUuNl0sWzEyNy41LDUwLjJdLFsxMjAuNSw1MS45XSxbMTA5LjYsNDkuMl0sWzk4LjcsNTEuOF0sWzg5LjcsNDkuOF0sWzgwLjMsNTAuOV0sWzcxLjEsNTQuM10sWzYxLjQsNTQuMV0sWzU3LjksNTEuMV0sWzQ4LjcsNTAuNV0sWzQ3LjUsNDUuNV0sWzQzLjEsNDNdLFszOC40LDQ2LjddLFszNy44LDUwLjFdLFszMS45LDU0XSxbMjkuNSw2MF0sWzI5LjYsNjUuM10sWzMzLDY5LjVdLFszOC42LDY2LjFdLFszNC42LDY1LjJdLFszOS43LDY1LjVdLFs0Ni41LDY4XSxbNTIuMyw2OC4zXSxbNTksNjguOV0sWzY3LjMsNjguN10sWzcwLjIsNzIuOV0sWzcyLjMsNjcuM10sWzc0LjUsNjguN10sWzc0LDY5LjFdLFs3OCw3MV0sWzgyLjksNzEuN10sWzgwLjUsNzMuMl0sWzg2LjUsNzQuM10sWzkzLjIsNzUuOF0sWzk5LjEsNzUuNV0sWzEwNC4zLDc3LjddXV0sW1tbNjguMyw3N10sWzY4LjksNzYuNl0sWzY3LjcsNzYuMl0sWzY2LjcsNzYuMV0sWzY1LjIsNzUuOF0sWzY0LjIsNzUuN10sWzYzLjIsNzUuNl0sWzYyLjMsNzUuNF0sWzYxLjQsNzUuMl0sWzYwLjcsNzUuMV0sWzYwLjUsNzVdLFs2MC41LDc0LjldLFs2MC4xLDc0LjddLFs1OS45LDc0LjZdLFs1OS4yLDc0LjZdLFs1OC42LDc0LjVdLFs1OC43LDc0LjJdLFs1OC4yLDc0LjFdLFs1Ny42LDc0LjJdLFs1Ny45LDczLjldLFs1Ny4zLDczLjhdLFs1Nyw3My44XSxbNTcsNzMuNl0sWzU3LDczLjRdLFs1Ni42LDczLjNdLFs1NS45LDczLjRdLFs1NSw3My40XSxbNTQuMSw3My40XSxbNTQuNSw3My42XSxbNTQuNCw3My43XSxbNTMuNiw3My43XSxbNTQuMiw3My45XSxbNTQuOCw3NC4xXSxbNTUuOSw3NC4xXSxbNTUuNyw3NC4zXSxbNTYuMyw3NC41XSxbNTUuOSw3NC43XSxbNTcsNzQuN10sWzU1LjksNzQuOF0sWzU2LjQsNzVdLFs1NS44LDc1LjFdLFs1Ni4zLDc1LjJdLFs1Ni45LDc1LjNdLFs1Ny41LDc1LjNdLFs1OCw3NS42XSxbNTguNSw3NS44XSxbNTkuNCw3NS45XSxbNjAuMyw3Nl0sWzYwLjUsNzZdLFs2MC45LDc2LjJdLFs2MS44LDc2LjNdLFs2Mi44LDc2LjNdLFs2My43LDc2LjNdLFs2NC44LDc2LjVdLFs2NS41LDc2LjZdLFs2NS45LDc2LjddLFs2Ni43LDc2LjldLFs2Ny42LDc3XSxbNjguMyw3N11dXSxbW1s5Ny42LDgwLjJdLFs5OCw4MC4xXSxbOTcuNiw3OS44XSxbOTcuMyw3OS43XSxbOTcuNyw3OS44XSxbOTcuOSw3OS45XSxbOTguMiw3OS45XSxbOTguNiw4MF0sWzk4LjUsODAuMV0sWzk4LjgsODBdLFs5OS4xLDgwXSxbOTkuNSw3OS45XSxbOTkuOCw3OS45XSxbMTAwLDc5LjddLFs5OS43LDc5LjZdLFs5OS43LDc5LjNdLFs5OS40LDc5LjNdLFs5OS4xLDc5LjNdLFs5OS42LDc5LjJdLFs5OS43LDc5LjFdLFs5OS45LDc5XSxbOTkuNyw3OC45XSxbOTkuNCw3OC44XSxbOTksNzguOF0sWzk4LjYsNzguOF0sWzk4LDc4LjhdLFs5Ny42LDc4LjhdLFs5Ny4yLDc4LjldLFs5Ni45LDc5XSxbOTYuMyw3OV0sWzk2LjEsNzldLFs5NS43LDc5XSxbOTUuNyw3OS4xXSxbOTUuMyw3OS4xXSxbOTUsNzldLFs5NC42LDc5LjJdLFs5NC4zLDc5LjJdLFs5NC40LDc5LjRdLFs5NC4yLDc5LjVdLFs5NC4xLDc5LjRdLFs5My43LDc5LjVdLFs5My44LDc5LjZdLFs5My41LDc5LjVdLFs5My4yLDc5LjRdLFs5My4yLDc5LjVdLFs5Mi45LDc5LjZdLFs5My44LDc5LjddLFs5NC4zLDc5LjhdLFs5NC42LDc5LjhdLFs5NC4yLDc5LjldLFs5NC42LDgwXSxbOTUsODAuMV0sWzk1LjIsODBdLFs5NS40LDgwLjFdLFs5Niw4MC4xXSxbOTYuNCw4MC4xXSxbOTcuMSw4MC4yXSxbOTcuNSw4MC4yXSxbOTcuNiw4MC4yXV1dLFtbWy0xNzkuNiw2OC45XSxbLTE3OS4xLDY4LjhdLFstMTc4LjgsNjguNl0sWy0xNzgsNjguM10sWy0xNzguNCw2OC42XSxbLTE3Ny40LDY4LjJdLFstMTc2LjgsNjguMV0sWy0xNzUuNiw2Ny44XSxbLTE3NS4zLDY3LjRdLFstMTc0LjgsNjcuNF0sWy0xNzQuOCw2Ni43XSxbLTE3NC41LDY2LjZdLFstMTc0LjMsNjYuNF0sWy0xNzQsNjYuMl0sWy0xNzQuMSw2Ni42XSxbLTE3NC40LDY3XSxbLTE3NC4yLDY3LjFdLFstMTczLjQsNjcuMV0sWy0xNzMuNCw2Ni44XSxbLTE3Mi42LDY2LjldLFstMTczLDY3LjFdLFstMTcxLjcsNjddLFstMTcxLjMsNjYuN10sWy0xNzAuNSw2Ni4zXSxbLTE3MC4yLDY2LjNdLFstMTY5LjksNjYuMV0sWy0xNzAsNjZdLFstMTcwLjUsNjUuN10sWy0xNzEuMyw2NS44XSxbLTE3MS4xLDY1LjVdLFstMTcxLjksNjUuNV0sWy0xNzIuMyw2NS42XSxbLTE3Mi43LDY1LjZdLFstMTcyLjMsNjUuNF0sWy0xNzIuNyw2NS4yXSxbLTE3Mi40LDY0LjldLFstMTczLjIsNjQuOF0sWy0xNzMuMSw2NC43XSxbLTE3Mi40LDY0LjRdLFstMTczLDY0LjVdLFstMTczLjMsNjQuM10sWy0xNzMuNCw2NC41XSxbLTE3NC4xLDY0LjVdLFstMTc1LDY0LjhdLFstMTc1LjgsNjQuOV0sWy0xNzUuOSw2NS40XSxbLTE3Ni42LDY1LjZdLFstMTc3LjUsNjUuNV0sWy0xNzguNiw2NS41XSxbLTE3OC45LDY1LjldLFstMTc4LjUsNjYuM10sWy0xNzkuMSw2Ni4yXSxbLTE3OS4yLDY2LjJdLFstMTc5LjcsNjYuMl0sWy0xNzkuNCw2NS42XSxbLTE3OS42LDY1LjJdLFstMTgwLDY2LjFdLFstMTc5LjYsNjguOV1dXSxbW1sxMjguMSw3Mi42XSxbMTI4LjYsNzIuNV0sWzEyOC43LDcyLjVdLFsxMjguOCw3Mi41XSxbMTI4LjksNzIuNV0sWzEyOSw3Mi41XSxbMTI5LjEsNzIuNV0sWzEyOS4yLDcyLjVdLFsxMjkuMyw3Mi41XSxbMTI5LjMsNzIuNF0sWzEyOS40LDcyLjRdLFsxMjkuNSw3Mi40XSxbMTI5LjUsNzIuM10sWzEyOS40LDcyLjNdLFsxMjkuMyw3Mi4zXSxbMTI5LjUsNzIuMl0sWzEyOS42LDcyLjJdLFsxMjkuNCw3Mi4yXSxbMTI5LjIsNzIuMV0sWzEyOS4zLDcyLjFdLFsxMjkuNCw3Mi4xXSxbMTI5LjUsNzIuMV0sWzEyOSw3Mi4xXSxbMTI4LjksNzIuMV0sWzEyOC44LDcyLjFdLFsxMjguNyw3Mi4xXSxbMTI4LjUsNzIuMV0sWzEyOC41LDcyLjJdLFsxMjguNiw3Mi4yXSxbMTI4LjQsNzIuMl0sWzEyOC4yLDcyLjJdLFsxMjgsNzIuM10sWzEyNy45LDcyLjNdLFsxMjcuNyw3Mi40XSxbMTI3LjYsNzIuNF0sWzEyNy41LDcyLjRdLFsxMjcuNCw3Mi40XSxbMTI3LjMsNzIuNF0sWzEyNy4yLDcyLjRdLFsxMjcuMSw3Mi40XSxbMTI3LDcyLjRdLFsxMjYuOCw3Mi40XSxbMTI2LjcsNzIuNF0sWzEyNi42LDcyLjVdLFsxMjYuNyw3Mi41XSxbMTI2LjgsNzIuNV0sWzEyNi45LDcyLjVdLFsxMjcsNzIuNV0sWzEyNyw3Mi42XSxbMTI3LjEsNzIuNl0sWzEyNy4yLDcyLjZdLFsxMjcuMyw3Mi42XSxbMTI3LjQsNzIuNl0sWzEyNy41LDcyLjZdLFsxMjcuNyw3Mi42XSxbMTI3LjgsNzIuNl0sWzEyOCw3Mi42XSxbMTI4LjEsNzIuNl1dXSxbW1sxMjQuNiw3My43XSxbMTI0LjgsNzMuN10sWzEyNSw3My42XSxbMTI1LjEsNzMuN10sWzEyNS4yLDczLjddLFsxMjUuMiw3My41XSxbMTI1LjQsNzMuNl0sWzEyNS41LDczLjVdLFsxMjUuNiw3My40XSxbMTI1LjksNzMuNV0sWzEyNi4yLDczLjZdLFsxMjYuMyw3My41XSxbMTI2LjMsNzMuNF0sWzEyNi4yLDczLjRdLFsxMjYuNSw3My40XSxbMTI2LjYsNzMuM10sWzEyNi43LDczLjJdLFsxMjYuNiw3M10sWzEyNi40LDczXSxbMTI2LjMsNzIuOV0sWzEyNi40LDcyLjhdLFsxMjYuMiw3Mi41XSxbMTI2LjMsNzIuNF0sWzEyNi4xLDcyLjNdLFsxMjUuOSw3Mi40XSxbMTI1LjcsNzIuNF0sWzEyNS41LDcyLjRdLFsxMjUuMyw3Mi41XSxbMTI1LjIsNzIuNl0sWzEyNSw3Mi42XSxbMTI0LjgsNzIuNl0sWzEyNC43LDcyLjddLFsxMjQuNCw3Mi43XSxbMTI0LjIsNzIuOF0sWzEyNCw3Mi44XSxbMTIzLjgsNzIuOF0sWzEyMy42LDcyLjhdLFsxMjMuNCw3Mi44XSxbMTIzLjMsNzIuOV0sWzEyMy4xLDcyLjldLFsxMjIuOSw3Mi45XSxbMTIyLjUsNzIuOV0sWzEyMi40LDczXSxbMTIyLjcsNzNdLFsxMjIuOSw3M10sWzEyMy40LDczLjJdLFsxMjMuNiw3My4yXSxbMTIzLjQsNzMuM10sWzEyMy4yLDczLjZdLFsxMjMuNCw3My42XSxbMTIzLjUsNzMuN10sWzEyMy43LDczLjZdLFsxMjMuOSw3My43XSxbMTI0LDczLjhdLFsxMjQsNzMuN10sWzEyNC4yLDczLjhdLFsxMjQuNCw3My44XSxbMTI0LjYsNzMuN11dXSxbW1s1NC43LDgxLjFdLFs1NC45LDgxLjFdLFs1NSw4MS4xXSxbNTUuMSw4MS4xXSxbNTUuMiw4MS4xXSxbNTUuMyw4MV0sWzU1LjQsODFdLFs1NS41LDgxXSxbNTUuNiw4MV0sWzU1LjgsODFdLFs1Niw4MV0sWzU2LjEsODFdLFs1Ni40LDgxXSxbNTYuNiw4MV0sWzU2LjYsODAuOV0sWzU2LjcsODAuOV0sWzU2LjgsODAuOV0sWzU2LjksODAuOV0sWzU3LDgwLjldLFs1Ny4xLDgwLjldLFs1Ny4yLDgwLjldLFs1Ny4zLDgwLjldLFs1Ny41LDgwLjhdLFs1Ny42LDgwLjhdLFs1Ny43LDgwLjhdLFs1Ny41LDgwLjddLFs1Ny40LDgwLjddLFs1Ny4zLDgwLjddLFs1Ny4yLDgwLjddLFs1Ny4xLDgwLjddLFs1Nyw4MC43XSxbNTYuOSw4MC43XSxbNTYuOCw4MC44XSxbNTYuNyw4MC44XSxbNTYuNiw4MC44XSxbNTYuNSw4MC44XSxbNTYuMyw4MC44XSxbNTYuMiw4MC44XSxbNTYuMSw4MC44XSxbNTYsODAuOF0sWzU1LjgsODAuOV0sWzU1LjcsODAuOV0sWzU1LjYsODAuOV0sWzU1LjUsODAuOV0sWzU1LjQsODAuOV0sWzU1LjIsODFdLFs1NS4xLDgxXSxbNTUsODAuOV0sWzU1LDgxXSxbNTQuOSw4MV0sWzU0LjgsODFdLFs1NC43LDgxXSxbNTQuNiw4MV0sWzU0LjUsODFdLFs1NC40LDgxXSxbNTQuNiw4MS4xXSxbNTQuNyw4MS4xXV1dXSxcInR5cGVcIjpcIk11bHRpUG9seWdvblwifSxcInR5cGVcIjpcIkZlYXR1cmVcIixcInByb3BlcnRpZXNcIjp7XCJpc28yXCI6XCJSVVwiLFwibG5nXCI6MTAwLFwibGF0XCI6NjB9fSx7XCJnZW9tZXRyeVwiOntcImNvb3JkaW5hdGVzXCI6W1tbWzIxLjgsNjguNl0sWzIzLDY4LjNdLFsyMy41LDY3LjZdLFsyMy43LDY3XSxbMjMuNyw2Ni4yXSxbMjMuNSw2NS44XSxbMjIuNCw2NS45XSxbMjIuMSw2NS41XSxbMjEuNiw2NS4yXSxbMjEuMiw2NC44XSxbMjEuNiw2NC40XSxbMjAuNCw2My43XSxbMTkuNSw2My42XSxbMTguOSw2My4yXSxbMTcuOSw2Mi44XSxbMTcuNSw2Mi40XSxbMTcuNSw2Ml0sWzE3LjIsNjEuNl0sWzE3LjUsNjAuNl0sWzE4LjQsNjAuM10sWzE5LjEsNTkuOF0sWzE4LjIsNTkuNF0sWzE3LjcsNTkuNl0sWzE3LjQsNTkuNV0sWzE2LjUsNTkuNV0sWzE3LjEsNTkuNF0sWzE4LjQsNTkuM10sWzE3LjksNTguOV0sWzE3LjEsNTguOF0sWzE2LjIsNTguNl0sWzE2LjgsNTguMl0sWzE2LjcsNTcuN10sWzE2LjYsNTcuMV0sWzE2LDU2LjNdLFsxNC44LDU2LjFdLFsxNC4zLDU1LjZdLFsxMy40LDU1LjNdLFsxMi43LDU2LjJdLFsxMi44LDU2LjZdLFsxMi4yLDU3LjNdLFsxMS43LDU3LjhdLFsxMS4yLDU4LjNdLFsxMS40LDU5LjFdLFsxMS44LDU5LjddLFsxMi42LDYwLjRdLFsxMi42LDYxLjFdLFsxMi4zLDYyLjFdLFsxMi4yLDYzXSxbMTIuNyw2NF0sWzE0LjEsNjQuNV0sWzE0LjQsNjUuMl0sWzE1LDY2LjFdLFsxNi4yLDY3LjNdLFsxNy42LDY4XSxbMTguNiw2OC41XSxbMjAsNjguNV0sWzIwLjgsNjldLFsyMS44LDY4LjZdXV0sW1tbMTguMiw1Ni45XSxbMTguMSw1Ni45XSxbMTguMiw1N10sWzE4LjMsNTddLFsxOC4zLDU3LjFdLFsxOC4yLDU3LjFdLFsxOC4xLDU3LjJdLFsxOC4yLDU3LjNdLFsxOC4xLDU3LjRdLFsxOC4xLDU3LjVdLFsxOC4xLDU3LjZdLFsxOC4yLDU3LjZdLFsxOC4zLDU3LjZdLFsxOC4zLDU3LjddLFsxOC40LDU3LjddLFsxOC40LDU3LjhdLFsxOC41LDU3LjhdLFsxOC43LDU3LjldLFsxOC45LDU3LjldLFsxOSw1Ny45XSxbMTksNTcuOF0sWzE4LjksNTcuN10sWzE4LjgsNTcuN10sWzE4LjgsNTcuNV0sWzE4LjgsNTcuNF0sWzE4LjcsNTcuMl0sWzE4LjYsNTcuMl0sWzE4LjUsNTcuMl0sWzE4LjQsNTcuMl0sWzE4LjQsNTcuMV0sWzE4LjMsNTYuOV0sWzE4LjIsNTYuOV1dXSxbW1sxNi44LDU2LjhdLFsxNi43LDU2LjddLFsxNi42LDU2LjVdLFsxNi42LDU2LjRdLFsxNi42LDU2LjNdLFsxNi41LDU2LjJdLFsxNi40LDU2LjJdLFsxNi40LDU2LjNdLFsxNi40LDU2LjVdLFsxNi40LDU2LjZdLFsxNi41LDU2LjhdLFsxNi42LDU2LjldLFsxNi43LDU2LjldLFsxNi44LDU3LjFdLFsxNi45LDU3LjFdLFsxNyw1Ny4yXSxbMTcsNTcuM10sWzE3LDU3LjRdLFsxNy4xLDU3LjRdLFsxNy4xLDU3LjNdLFsxNy4xLDU3LjJdLFsxNyw1Ny4xXSxbMTYuOSw1N10sWzE2LjksNTYuOV0sWzE2LjgsNTYuOF1dXSxbXSxbXSxbXSxbXV0sXCJ0eXBlXCI6XCJNdWx0aVBvbHlnb25cIn0sXCJ0eXBlXCI6XCJGZWF0dXJlXCIsXCJwcm9wZXJ0aWVzXCI6e1wiaXNvMlwiOlwiU0VcIixcImxuZ1wiOjE1LFwibGF0XCI6NjJ9fSx7XCJnZW9tZXRyeVwiOntcImNvb3JkaW5hdGVzXCI6W1tbMTMuNyw0Ni41XSxbMTMuOSw0Ni41XSxbMTQuMiw0Ni40XSxbMTQuOCw0Ni41XSxbMTQuOSw0Ni42XSxbMTUuMSw0Ni43XSxbMTUuNCw0Ni43XSxbMTUuOCw0Ni43XSxbMTYsNDYuOF0sWzE2LjIsNDYuOV0sWzE2LjMsNDYuOF0sWzE2LjQsNDYuN10sWzE2LjYsNDYuNV0sWzE2LjMsNDYuNV0sWzE2LjMsNDYuNF0sWzE2LjEsNDYuM10sWzE1LjgsNDYuMl0sWzE1LjYsNDYuMl0sWzE1LjcsNDYuMV0sWzE1LjcsNDUuOV0sWzE1LjYsNDUuOF0sWzE1LjMsNDUuOF0sWzE1LjQsNDUuN10sWzE1LjMsNDUuNV0sWzE1LjEsNDUuNV0sWzE0LjksNDUuNV0sWzE0LjcsNDUuNV0sWzE0LjYsNDUuN10sWzE0LjUsNDUuNV0sWzE0LjEsNDUuNV0sWzEzLjksNDUuNV0sWzEzLjYsNDUuNV0sWzEzLjgsNDUuNV0sWzEzLjcsNDUuNl0sWzEzLjgsNDUuN10sWzEzLjcsNDUuOF0sWzEzLjYsNDUuOV0sWzEzLjUsNDZdLFsxMy42LDQ2LjFdLFsxMy43LDQ2LjJdLFsxMy41LDQ2LjJdLFsxMy40LDQ2LjNdLFsxMy43LDQ2LjRdLFsxMy43LDQ2LjVdXV0sXCJ0eXBlXCI6XCJQb2x5Z29uXCJ9LFwidHlwZVwiOlwiRmVhdHVyZVwiLFwicHJvcGVydGllc1wiOntcImlzbzJcIjpcIlNJXCIsXCJsbmdcIjoxNC44LFwibGF0XCI6NDYuMX19LHtcImdlb21ldHJ5XCI6e1wiY29vcmRpbmF0ZXNcIjpbW1sxNy4zLDQ4XSxbMTcuMSw0OC4xXSxbMTcsNDguM10sWzE2LjksNDguNF0sWzE3LDQ4LjddLFsxNy4yLDQ4LjldLFsxNy41LDQ4LjhdLFsxNy44LDQ4LjldLFsxOC4xLDQ5LjFdLFsxOC4yLDQ5LjNdLFsxOC41LDQ5LjVdLFsxOC44LDQ5LjVdLFsxOSw0OS40XSxbMTkuMyw0OS41XSxbMTkuNSw0OS41XSxbMTkuOCw0OS40XSxbMTkuOSw0OS4yXSxbMjAuMSw0OS4zXSxbMjAuNCw0OS40XSxbMjAuOCw0OS4zXSxbMjEsNDkuNF0sWzIxLjQsNDkuNF0sWzIxLjgsNDkuNF0sWzIyLjIsNDkuMl0sWzIyLjUsNDkuMV0sWzIyLjUsNDldLFsyMi40LDQ4LjhdLFsyMi4yLDQ4LjRdLFsyMS45LDQ4LjRdLFsyMS43LDQ4LjRdLFsyMS41LDQ4LjVdLFsyMS4yLDQ4LjVdLFsyMC45LDQ4LjVdLFsyMC43LDQ4LjZdLFsyMC40LDQ4LjRdLFsyMC4yLDQ4LjNdLFsxOS45LDQ4LjFdLFsxOS42LDQ4LjJdLFsxOS4yLDQ4LjFdLFsxOC45LDQ4LjFdLFsxOC44LDQ3LjldLFsxOC43LDQ3LjhdLFsxOC40LDQ3LjhdLFsxOC4yLDQ3LjddLFsxNy45LDQ3LjhdLFsxNy43LDQ3LjhdLFsxNy40LDQ4XSxbMTcuMyw0OF1dXSxcInR5cGVcIjpcIlBvbHlnb25cIn0sXCJ0eXBlXCI6XCJGZWF0dXJlXCIsXCJwcm9wZXJ0aWVzXCI6e1wiaXNvMlwiOlwiU0tcIixcImxuZ1wiOjE5LjUsXCJsYXRcIjo0OC43fX0se1wiZ2VvbWV0cnlcIjp7XCJjb29yZGluYXRlc1wiOltdLFwidHlwZVwiOlwiUG9seWdvblwifSxcInR5cGVcIjpcIkZlYXR1cmVcIixcInByb3BlcnRpZXNcIjp7XCJpc28yXCI6XCJTTVwiLFwibG5nXCI6MTIuNCxcImxhdFwiOjQzLjh9fSx7XCJnZW9tZXRyeVwiOntcImNvb3JkaW5hdGVzXCI6W1tbWzM1LjEsNDJdLFszNi4xLDQxLjddLFszNi42LDQxLjRdLFszNy40LDQxLjFdLFszOC4yLDQwLjldLFszOS4xLDQxLjFdLFs0MC4zLDQxXSxbNDEuNCw0MS40XSxbNDIuMyw0MS41XSxbNDMuMiw0MS4yXSxbNDMuNyw0MC43XSxbNDQsNDBdLFs0NC44LDM5LjZdLFs0NC4yLDM5XSxbNDQuNSwzOC4zXSxbNDQuNiwzNy40XSxbNDQuMiwzNy4xXSxbNDMuNSwzNy4yXSxbNDIuNCwzNy4xXSxbNDEuNSwzNy4xXSxbNDAuMywzNi45XSxbMzksMzYuN10sWzM4LDM2LjhdLFszNywzNi43XSxbMzYuNSwzNi4yXSxbMzYsMzUuOV0sWzM2LDM2LjVdLFszNS43LDM2LjhdLFszNC45LDM2LjhdLFszNCwzNi4zXSxbMzIuOCwzNl0sWzMyLDM2LjVdLFszMC43LDM2LjldLFszMC4zLDM2LjNdLFsyOS4zLDM2LjJdLFsyOC45LDM2LjddLFsyOC4yLDM2LjddLFsyNy43LDM2LjddLFsyNy44LDM3XSxbMjcuNSwzNy4xXSxbMjcuMiwzNy41XSxbMjYuOCwzOC4yXSxbMjYuNCwzOC4zXSxbMjYuNSwzOC42XSxbMjcsMzguNV0sWzI2LjgsMzldLFsyNywzOS42XSxbMjYuMiwzOS43XSxbMjYuNyw0MC4zXSxbMjcuNSw0MC4zXSxbMjgsNDAuNF0sWzI5LDQwLjVdLFsyOS42LDQwLjddLFsyOS4xLDQwLjldLFsyOS45LDQxLjFdLFszMC45LDQxLjFdLFszMiw0MS41XSxbMzMuMiw0Ml0sWzM0LjIsNDJdLFszNS4xLDQyXV1dLFtbWzI3LjQsNDJdLFsyNy42LDQyXSxbMjcuOCw0Ml0sWzI4LDQyXSxbMjgsNDEuOF0sWzI4LjIsNDEuNV0sWzI4LjUsNDEuNF0sWzI4LjksNDEuM10sWzI5LDQxLjNdLFsyOS4xLDQxLjJdLFsyOSw0MS4xXSxbMjguOCw0MV0sWzI4LjYsNDEuMV0sWzI4LjUsNDFdLFsyOC40LDQxLjFdLFsyOC4xLDQxLjFdLFsyNy45LDQxXSxbMjcuNyw0MV0sWzI3LjUsNDAuOV0sWzI3LjQsNDAuOF0sWzI3LjIsNDAuNl0sWzI3LDQwLjZdLFsyNi43LDQwLjVdLFsyNi42LDQwLjRdLFsyNi40LDQwLjJdLFsyNi4yLDQwLjFdLFsyNi4yLDQwLjJdLFsyNi4zLDQwLjNdLFsyNi40LDQwLjRdLFsyNi42LDQwLjVdLFsyNi44LDQwLjddLFsyNi42LDQwLjZdLFsyNi4zLDQwLjZdLFsyNi4xLDQwLjddLFsyNi4xLDQwLjhdLFsyNi4yLDQwLjldLFsyNi40LDQxXSxbMjYuMyw0MS4yXSxbMjYuNiw0MS4zXSxbMjYuNiw0MS41XSxbMjYuNSw0MS42XSxbMjYuMyw0MS43XSxbMjYuNCw0MS44XSxbMjYuNiw0MS45XSxbMjYuOSw0Ml0sWzI3LDQyLjFdLFsyNy4yLDQyLjFdLFsyNy40LDQyLjFdLFsyNy40LDQyXV1dLFtdLFtdLFtdXSxcInR5cGVcIjpcIk11bHRpUG9seWdvblwifSxcInR5cGVcIjpcIkZlYXR1cmVcIixcInByb3BlcnRpZXNcIjp7XCJpc28yXCI6XCJUUlwiLFwibG5nXCI6MzUsXCJsYXRcIjozOX19LHtcImdlb21ldHJ5XCI6e1wiY29vcmRpbmF0ZXNcIjpbW1tbMzMuNCw1Mi40XSxbMzQuMiw1MS43XSxbMzUuMSw1MS4xXSxbMzUuNSw1MC41XSxbMzYuNSw1MC4yXSxbMzcuNyw1MC4xXSxbMzguNyw0OS45XSxbMzkuNSw0OS44XSxbNDAuMiw0OS4yXSxbNDAsNDguOF0sWzM5LjgsNDcuOV0sWzM4LjgsNDcuOV0sWzM4LjEsNDcuMV0sWzM2LjgsNDYuOF0sWzM1LjUsNDYuNV0sWzM1LDQ2LjJdLFszNC4yLDQ2LjNdLFszNC4xLDQ1LjldLFszNS4xLDQ1LjVdLFszNC43LDQ2LjFdLFszNi4xLDQ1LjVdLFszNS45LDQ1XSxbMzQuNyw0NC44XSxbMzMuNCw0NC42XSxbMzMuMSw0NS4yXSxbMzIuOCw0NS42XSxbMzMuNiw0Nl0sWzMyLjUsNDYuMV0sWzMxLjUsNDYuNl0sWzMyLjIsNDYuNl0sWzMxLjksNDcuMV0sWzMwLjksNDYuNl0sWzI5LjksNDUuN10sWzI5LjcsNDUuMl0sWzI4LjQsNDUuM10sWzI4LjgsNDUuOV0sWzI5LjQsNDYuNV0sWzMwLDQ2LjZdLFsyOS4zLDQ3LjVdLFsyOC43LDQ4LjFdLFsyNy44LDQ4LjVdLFsyNi4xLDQ4XSxbMjQuOSw0Ny43XSxbMjMuOCw0OF0sWzIyLjcsNDguMV0sWzIyLjUsNDguOV0sWzIyLjgsNDkuN10sWzI0LjEsNTAuN10sWzIzLjcsNTEuNV0sWzI0LjksNTEuOV0sWzI2LjIsNTEuOV0sWzI3LjIsNTEuN10sWzI4LjIsNTEuN10sWzI5LjIsNTEuNl0sWzMwLjMsNTEuNF0sWzMwLjksNTIuMV0sWzMyLjMsNTIuMV0sWzMzLjQsNTIuNF1dXSxbXSxbXSxbXV0sXCJ0eXBlXCI6XCJNdWx0aVBvbHlnb25cIn0sXCJ0eXBlXCI6XCJGZWF0dXJlXCIsXCJwcm9wZXJ0aWVzXCI6e1wiaXNvMlwiOlwiVUFcIixcImxuZ1wiOjMyLFwibGF0XCI6NDl9fSx7XCJnZW9tZXRyeVwiOntcImNvb3JkaW5hdGVzXCI6W1tbNjQuNCwzOV0sWzYzLjcsMzkuM10sWzYyLjksMzkuN10sWzYyLjMsNDAuNF0sWzYxLjcsNDEuMl0sWzYwLjksNDEuM10sWzYwLjIsNDEuM10sWzYwLjMsNDEuOF0sWzU5LjQsNDIuM10sWzU4LjgsNDIuN10sWzU4LjEsNDIuNl0sWzU3LjksNDIuNF0sWzU3LjQsNDIuMl0sWzU3LDQxLjVdLFs1Ni40LDQxLjNdLFs1Niw0Mi44XSxbNTYuMyw0NS4xXSxbNTgsNDUuNV0sWzYyLDQzLjVdLFs2NCw0My42XSxbNjUuNiw0My4yXSxbNjYsNDIuM10sWzY2LjksNDEuMV0sWzY3LjksNDEuMl0sWzY4LjMsNDAuN10sWzY4LjksNDEuMV0sWzY5LjYsNDEuN10sWzcwLjUsNDIuMV0sWzcxLjIsNDIuMl0sWzcwLjUsNDEuOF0sWzcwLjYsNDEuNV0sWzcxLjQsNDEuM10sWzcxLjYsNDEuNl0sWzcyLjMsNDFdLFs3My4xLDQwLjhdLFs3Mi40LDQwLjRdLFs3MS41LDQwLjJdLFs3MC44LDQwLjJdLFs3MC40LDQwLjVdLFs3MC40LDQxLjFdLFs2OS44LDQwLjZdLFs2OS4zLDQwLjZdLFs2OC43LDQwLjJdLFs2OC45LDQwXSxbNjguNSwzOS42XSxbNjcuNCwzOS41XSxbNjcuOSwzOV0sWzY4LjEsMzguNF0sWzY4LjEsMzcuOF0sWzY3LjcsMzcuMl0sWzY2LjgsMzcuNF0sWzY2LjcsMzhdLFs2NS44LDM4LjJdLFs2NC45LDM4LjddLFs2NC40LDM5XV1dLFwidHlwZVwiOlwiUG9seWdvblwifSxcInR5cGVcIjpcIkZlYXR1cmVcIixcInByb3BlcnRpZXNcIjp7XCJpc28yXCI6XCJVWlwiLFwibG5nXCI6NjQsXCJsYXRcIjo0MX19LHtcImdlb21ldHJ5XCI6e1wiY29vcmRpbmF0ZXNcIjpbXSxcInR5cGVcIjpcIlBvbHlnb25cIn0sXCJ0eXBlXCI6XCJGZWF0dXJlXCIsXCJwcm9wZXJ0aWVzXCI6e1wiaXNvMlwiOlwiVkFcIixcImxuZ1wiOjEyLjQsXCJsYXRcIjo0MS45fX0se1wiZ2VvbWV0cnlcIjp7XCJjb29yZGluYXRlc1wiOltbWzIwLjgsNDIuMV0sWzIwLjcsNDEuOF0sWzIwLjYsNDEuOV0sWzIwLjUsNDIuMl0sWzIwLjMsNDIuM10sWzIwLjEsNDIuNl0sWzIwLjMsNDIuOF0sWzIwLjUsNDIuOV0sWzIwLjYsNDMuMl0sWzIwLjgsNDMuM10sWzIxLDQzLjFdLFsyMS4xLDQzLjFdLFsyMS4zLDQyLjldLFsyMS40LDQyLjldLFsyMS42LDQyLjddLFsyMS44LDQyLjddLFsyMS43LDQyLjRdLFsyMS41LDQyLjNdLFsyMS42LDQyLjJdLFsyMS40LDQyLjJdLFsyMC44LDQyLjFdXV0sXCJ0eXBlXCI6XCJQb2x5Z29uXCJ9LFwidHlwZVwiOlwiRmVhdHVyZVwiLFwicHJvcGVydGllc1wiOntcImlzbzJcIjpcIlhLXCIsXCJsbmdcIjoyMS4yLFwibGF0XCI6NDIuN319XSxcInR5cGVcIjpcIkZlYXR1cmVDb2xsZWN0aW9uXCJ9OyIsIid1c2Ugc3RyaWN0JztPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywnX19lc01vZHVsZScse3ZhbHVlOnRydWV9KTt2YXIgX3RvQ29uc3VtYWJsZUFycmF5Mj1yZXF1aXJlKCdiYWJlbC1ydW50aW1lL2hlbHBlcnMvdG9Db25zdW1hYmxlQXJyYXknKTt2YXIgX3RvQ29uc3VtYWJsZUFycmF5Mz1faW50ZXJvcFJlcXVpcmVEZWZhdWx0KF90b0NvbnN1bWFibGVBcnJheTIpO3ZhciBfc3RyaW5naWZ5PXJlcXVpcmUoJ2JhYmVsLXJ1bnRpbWUvY29yZS1qcy9qc29uL3N0cmluZ2lmeScpO3ZhciBfc3RyaW5naWZ5Mj1faW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9zdHJpbmdpZnkpO3ZhciBfdHlwZW9mMj1yZXF1aXJlKCdiYWJlbC1ydW50aW1lL2hlbHBlcnMvdHlwZW9mJyk7dmFyIF90eXBlb2YzPV9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3R5cGVvZjIpO2V4cG9ydHMuZGVmYXVsdD1tZW1vQmluZDtmdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iail7cmV0dXJuIG9iaiYmb2JqLl9fZXNNb2R1bGU/b2JqOntkZWZhdWx0Om9ian19ZnVuY3Rpb24gbWVtb0JpbmQodGhpc0FyZyxmdW5jTmFtZSxrZXlBcmdzLGV4dHJhQXJncyl7aWYoKHR5cGVvZiB0aGlzQXJnPT09J3VuZGVmaW5lZCc/J3VuZGVmaW5lZCc6KDAsX3R5cGVvZjMuZGVmYXVsdCkodGhpc0FyZykpIT09J29iamVjdCd8fCF0aGlzQXJnKXt0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIHRoaXNBcmcgcGFyYW1ldGVyLicpfXZhciBmdW5jPXRoaXNBcmdbZnVuY05hbWVdO2lmKHR5cGVvZiBmdW5jIT09J2Z1bmN0aW9uJyl7dGhyb3cgbmV3IFR5cGVFcnJvcignXFwnJytmdW5jTmFtZSsnXFwnIGlzIG5vdCBhIGZ1bmN0aW9uLicpfWlmKHRoaXNBcmcuX21lbUNhY2hlPT1udWxsKXt0aGlzQXJnLl9tZW1DYWNoZT17fX1pZih0aGlzQXJnLl9tZW1DYWNoZVtmdW5jTmFtZV09PW51bGwpe3RoaXNBcmcuX21lbUNhY2hlW2Z1bmNOYW1lXT17fX12YXIgY2FjaGU9dGhpc0FyZy5fbWVtQ2FjaGVbZnVuY05hbWVdO3ZhciBtZW1vS2V5PSgwLF9zdHJpbmdpZnkyLmRlZmF1bHQpKGtleUFyZ3MpO2lmKGNhY2hlW21lbW9LZXldPT1udWxsKXtjYWNoZVttZW1vS2V5XT1mdW5jLmFwcGx5KHRoaXNBcmcsW10uY29uY2F0KCgwLF90b0NvbnN1bWFibGVBcnJheTMuZGVmYXVsdCkoa2V5QXJncyksKDAsX3RvQ29uc3VtYWJsZUFycmF5My5kZWZhdWx0KShleHRyYUFyZ3N8fFtdKSkpfXJldHVybiBjYWNoZVttZW1vS2V5XX0iXX0=
