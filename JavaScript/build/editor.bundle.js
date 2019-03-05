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
/******/ 	__webpack_require__.p = "/build/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./editor.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./editor.js":
/*!*******************!*\
  !*** ./editor.js ***!
  \*******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _js_editor_methods_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./js/editor-methods.js */ \"./js/editor-methods.js\");\n\nvar editor = null;\n$(document).ready(() => {\n  editor = Object(_js_editor_methods_js__WEBPACK_IMPORTED_MODULE_0__[\"setupACE\"])();\n  $(\"#cambtn\").click(() => {\n    Object(_js_editor_methods_js__WEBPACK_IMPORTED_MODULE_0__[\"toggleCameraDisplay\"])();\n  });\n  $(\"#runbtn\").click(() => {\n    var codeString = Object(_js_editor_methods_js__WEBPACK_IMPORTED_MODULE_0__[\"getCode\"])(editor);\n    var websimevent = new CustomEvent('code-to-run', {\n      'detail': {\n        'code': codeString\n      }\n    });\n    document.dispatchEvent(websimevent);\n  });\n  $('#resetRobot').click(() => {\n    var resetEvent = new CustomEvent('reset', {\n      'detail': ''\n    });\n    document.dispatchEvent(resetEvent);\n  });\n});\n\n//# sourceURL=webpack:///./editor.js?");

/***/ }),

/***/ "./js/editor-methods.js":
/*!******************************!*\
  !*** ./js/editor-methods.js ***!
  \******************************/
/*! exports provided: setupACE, toggleCameraDisplay, getCode, insertCode, reset */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"setupACE\", function() { return setupACE; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"toggleCameraDisplay\", function() { return toggleCameraDisplay; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getCode\", function() { return getCode; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"insertCode\", function() { return insertCode; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"reset\", function() { return reset; });\nfunction setupACE() {\n  var editor = ace.edit(\"ace\");\n  editor.setTheme(\"ace/theme/monokai\");\n  editor.session.setMode(\"ace/mode/javascript\");\n  return editor;\n}\nfunction toggleCameraDisplay() {\n  var opencvCam = document.querySelector(\"#outputCanvas\");\n  var imageCamBtn = document.querySelector(\"#cambtn\").firstChild;\n  $(\"#outputCanvas, #spectatorDiv\").toggle();\n\n  if (opencvCam.style.display != \"none\") {\n    imageCamBtn.src = \"assets/resources/stop-camera-icon.png\";\n  } else {\n    imageCamBtn.src = \"assets/resources/play-camera-icon.png\";\n  }\n}\nfunction getCode(editor) {\n  var content = editor.getValue();\n  return content;\n}\nfunction insertCode(textToInject, editor) {\n  // Reloads the code inside the editor erasing all content\n  editor.setValue(textToInject);\n  return editor;\n}\nfunction reset() {}\n\n//# sourceURL=webpack:///./js/editor-methods.js?");

/***/ })

/******/ });