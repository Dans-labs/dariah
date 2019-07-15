/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/test/reduce/tablesReducer.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../node_modules/mocha-loader/src sync recursive":
/*!*********************************************!*\
  !*** ../node_modules/mocha-loader/src sync ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function webpackEmptyContext(req) {\n\tvar e = new Error(\"Cannot find module '\" + req + \"'\");\n\te.code = 'MODULE_NOT_FOUND';\n\tthrow e;\n}\nwebpackEmptyContext.keys = function() { return []; };\nwebpackEmptyContext.resolve = webpackEmptyContext;\nmodule.exports = webpackEmptyContext;\nwebpackEmptyContext.id = \"../node_modules/mocha-loader/src sync recursive\";\n\n//# sourceURL=webpack:///../node_modules/mocha-loader/src_sync?");

/***/ }),

/***/ "../node_modules/mocha-loader/src/EnhancedMocha.js":
/*!*********************************************************!*\
  !*** ../node_modules/mocha-loader/src/EnhancedMocha.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Mocha = __webpack_require__(/*! mocha */ \"mocha\");\n\nfunction EnhancedMocha(options) {\n  Mocha.call(this, options);\n}\nmodule.exports = EnhancedMocha;\n\nEnhancedMocha.prototype = Object.create(Mocha.prototype);\n\nEnhancedMocha.prototype.loadFiles = function loadFiles(fn) {\n  const self = this;\n  const { suite } = this;\n\n  suite.suites.length = 0;\n  suite.tests.length = 0;\n\n  try {\n    const [file] = this.files;\n    if (false) {}\n    suite.emit('pre-require', global, file, self);\n    // eslint-disable-next-line global-require, import/no-dynamic-require\n    suite.emit('require', __webpack_require__(\"../node_modules/mocha-loader/src sync recursive\")(file), file, self);\n    suite.emit('post-require', global, file, self);\n  } catch (e) {\n    suite.addTest(\n      new Mocha.Test('fix test errors', () => {\n        throw e;\n      })\n    );\n  }\n\n  if (fn) {\n    fn();\n  }\n};\n\nEnhancedMocha.prototype.watch = function watch() {\n  const self = this;\n  self.outdated = false;\n  self.running = true;\n  self.watching = true;\n\n  // reinit ui to fix ui bugs\n  this.ui(this.options.ui);\n\n  // run the tests\n  this.run((/* failures */) => {\n    self.running = false;\n    if (self.outdated) self.watch();\n  });\n\n  if (false) {}\n};\n\n\n//# sourceURL=webpack:///../node_modules/mocha-loader/src/EnhancedMocha.js?");

/***/ }),

/***/ "./js/test/reduce/tablesReducer.js":
/*!*****************************************!*\
  !*** ./js/test/reduce/tablesReducer.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var EnhancedMocha = __webpack_require__(/*! !../node_modules/mocha-loader/src/EnhancedMocha.js */ \"../node_modules/mocha-loader/src/EnhancedMocha.js\");\nvar mocha = new EnhancedMocha({reporter: \"spec\"});\nmocha.addFile(\"!!/Users/dirk/github/Dans-labs/dariah/client/src/js/test/reduce/tablesReducer.js\");\nmocha.watch();\n\n//# sourceURL=webpack:///./js/test/reduce/tablesReducer.js?");

/***/ }),

/***/ "mocha":
/*!************************!*\
  !*** external "mocha" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"mocha\");\n\n//# sourceURL=webpack:///external_%22mocha%22?");

/***/ })

/******/ });