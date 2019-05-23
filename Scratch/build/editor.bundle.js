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
/******/ 	return __webpack_require__(__webpack_require__.s = "../Scratch/js/editor.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../Scratch/customBlocks/consoleLogBlock.js":
/*!**************************************************!*\
  !*** ../Scratch/customBlocks/consoleLogBlock.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return initConsoleLogBlock; });\n\nfunction initConsoleLogBlock() {\n  var consoleLogBlock = {\n    \"type\": \"logs\",\n    \"message0\": \"%{BKY_LOGS_TEXT}\",\n    \"args0\": [{\n      \"type\": \"input_value\",\n      \"name\": \"TO_LOG\"\n    }],\n    \"previousStatement\": null,\n    \"nextStatement\": null,\n    \"colour\": \"%{BKY_ROBOT_TOOLS_HUE}\",\n    \"tooltip\": \"%{BKY_LOGS_TOOLTIP}\",\n    \"helpUrl\": \"\"\n  };\n\n  Blockly.Blocks['logs'] = {\n    init: function () {\n      this.jsonInit(consoleLogBlock);\n    }\n  };\n\n  Blockly.JavaScript['logs'] = function (block) {\n    var value_to_log = Blockly.JavaScript.valueToCode(block, 'TO_LOG', Blockly.JavaScript.ORDER_ATOMIC);\n\n    var code = 'console.log(' + value_to_log + ');\\n';\n    return code;\n  };\n\n  Blockly.Python['logs'] = function (block) {\n    var value_to_log = Blockly.Python.valueToCode(block, 'TO_LOG', Blockly.Python.ORDER_ATOMIC);\n\n    var code = 'print ' + '(' + value_to_log + ')' + '\\r\\n';\n    return code;\n  };\n}\n\n//# sourceURL=webpack:///../Scratch/customBlocks/consoleLogBlock.js?");

/***/ }),

/***/ "../Scratch/customBlocks/getAngularSpeedBlock.js":
/*!*******************************************************!*\
  !*** ../Scratch/customBlocks/getAngularSpeedBlock.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return initGetAngularSpeedBlock; });\n\nfunction initGetAngularSpeedBlock() {\n  var getAngular = {\n    \"type\": \"getAngularSpeed\",\n    \"message0\": \"%{BKY_GETANGULARSPEED_TEXT}\",\n    \"args0\": [{\n      \"type\": \"field_variable\",\n      \"name\": \"ROBOTVAR\",\n      \"variable\": \"myRobot\"\n    }],\n    \"output\": null,\n    \"colour\": \"%{BKY_ROBOT_MOTORS_HUE}\",\n    \"tooltip\": \"%{BKY_GETANGULARSPEED_TOOLTIP}\",\n    \"helpUrl\": \"\"\n  };\n\n  Blockly.Blocks['getAngularSpeed'] = {\n    init: function () {\n      this.jsonInit(getAngular);\n    }\n  };\n\n  Blockly.JavaScript['getAngularSpeed'] = function (block) {\n    var variable_robotvar = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('ROBOTVAR'), Blockly.Variables.NAME_TYPE);\n\n    var code = variable_robotvar + '.getW()';\n\n    return [code, Blockly.JavaScript.ORDER_ATOMIC];\n  };\n}\n\n//# sourceURL=webpack:///../Scratch/customBlocks/getAngularSpeedBlock.js?");

/***/ }),

/***/ "../Scratch/customBlocks/getDistanceBlock.js":
/*!***************************************************!*\
  !*** ../Scratch/customBlocks/getDistanceBlock.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return initGetDistanceBlock; });\n\nfunction initGetDistanceBlock() {\n  var getDistanceBlock = {\n    \"type\": \"get_distance\",\n    \"message0\": \"%{BKY_GET_DISTANCE_TEXT}\",\n    \"args0\": [{\n      \"type\": \"field_variable\",\n      \"name\": \"ROBOTVAR\",\n      \"variable\": \"myRobot\"\n    }],\n    \"output\": null,\n    \"colour\": \"%{BKY_ROBOT_SENSORS_HUE}\",\n    \"tooltip\": \"%{BKY_GET_DISTANCE_TOOLTIP}\",\n    \"helpUrl\": \"\"\n  };\n\n  Blockly.Blocks['get_distance'] = {\n    init: function () {\n      this.jsonInit(getDistanceBlock);\n    }\n  };\n\n  Blockly.JavaScript['get_distance'] = function (block) {\n    var variable_robotvar = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('ROBOTVAR'), Blockly.Variables.NAME_TYPE);\n\n    var code = variable_robotvar + '.getDistance()';\n\n    return [code, Blockly.JavaScript.ORDER_NONE];\n  };\n\n  Blockly.Python['get_distance'] = function (block) {\n    var variable_robotvar = Blockly.Python.variableDB_.getName(block.getFieldValue('ROBOTVAR'), Blockly.Variables.NAME_TYPE);\n\n    var code = variable_robotvar + '.leerUltrasonido()\\r\\n';\n\n    return [code, Blockly.Python.ORDER_NONE];\n  };\n}\n\n//# sourceURL=webpack:///../Scratch/customBlocks/getDistanceBlock.js?");

/***/ }),

/***/ "../Scratch/customBlocks/getDistancesBlock.js":
/*!****************************************************!*\
  !*** ../Scratch/customBlocks/getDistancesBlock.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return initGetDistancesBlock; });\nfunction initGetDistancesBlock() {\n  var getDistancesBlock = {\n    \"type\": \"get_distances\",\n    \"message0\": \"%{BKY_GET_DISTANCES_TEXT}\",\n    \"args0\": [{\n      \"type\": \"field_variable\",\n      \"name\": \"ROBOTVAR\",\n      \"variable\": \"myRobot\"\n    }],\n    \"output\": null,\n    \"colour\": \"%{BKY_ROBOT_SENSORS_HUE}\",\n    \"tooltip\": \"%{BKY_GET_DISTANCES_TOOLTIP}\",\n    \"helpUrl\": \"\"\n  };\n\n  Blockly.Blocks['get_distances'] = {\n    init: function () {\n      this.jsonInit(getDistancesBlock);\n    }\n  };\n\n  Blockly.JavaScript['get_distances'] = function (block) {\n    var variable_robotvar = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('ROBOTVAR'), Blockly.Variables.NAME_TYPE);\n\n    var code = variable_robotvar + '.getDistances()';\n\n    return [code, Blockly.JavaScript.ORDER_NONE];\n  };\n}\n\n//# sourceURL=webpack:///../Scratch/customBlocks/getDistancesBlock.js?");

/***/ }),

/***/ "../Scratch/customBlocks/getImageBlock.js":
/*!************************************************!*\
  !*** ../Scratch/customBlocks/getImageBlock.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return initGetImageBlock; });\n\nfunction initGetImageBlock() {\n  var getImageBlock = {\n    \"type\": \"get_image\",\n    \"message0\": \"%{BKY_GET_IMAGE_TEXT}\",\n    \"args0\": [{\n      \"type\": \"field_variable\",\n      \"name\": \"ROBOTVAR\",\n      \"variable\": \"myRobot\"\n    }],\n    \"output\": null,\n    \"colour\": \"%{BKY_ROBOT_CAMERA_HUE}\",\n    \"tooltip\": \"%{BKY_GET_IMAGE_TOOLTIP}\",\n    \"helpUrl\": \"\"\n  };\n\n  Blockly.Blocks['get_image'] = {\n    init: function () {\n      this.jsonInit(getImageBlock);\n    }\n  };\n\n  Blockly.JavaScript['get_image'] = function (block) {\n    var variable_robotvar = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('ROBOTVAR'), Blockly.Variables.NAME_TYPE);\n\n    var code = variable_robotvar.toString() + '.getImage()';\n\n    return [code, Blockly.JavaScript.ORDER_ATOMIC];\n  };\n\n  Blockly.Python['get_image'] = function (block) {\n    var variable_robotvar = Blockly.Python.variableDB_.getName(block.getFieldValue('ROBOTVAR'), Blockly.Variables.NAME_TYPE);\n\n    var code = variable_robotvar + '.leerIRSigueLineas()\\r\\n';\n\n    return [code, Blockly.Python.ORDER_ATOMIC];\n  };\n}\n\n//# sourceURL=webpack:///../Scratch/customBlocks/getImageBlock.js?");

/***/ }),

/***/ "../Scratch/customBlocks/getLateralSpeedBlock.js":
/*!*******************************************************!*\
  !*** ../Scratch/customBlocks/getLateralSpeedBlock.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return initGetLateralSpeed; });\n\nfunction initGetLateralSpeed() {\n  var getLateral = {\n    \"type\": \"getLateralSpeed\",\n    \"message0\": \"%{BKY_GETLATERALSPEED_TEXT}\",\n    \"args0\": [{\n      \"type\": \"field_variable\",\n      \"name\": \"ROBOTVAR\",\n      \"variable\": \"myRobot\"\n    }],\n    \"output\": null,\n    \"colour\": \"%{BKY_ROBOT_MOTORS_HUE}\",\n    \"tooltip\": \"%{BKY_GETLATERALSPEED_TOOLTIP}\",\n    \"helpUrl\": \"\"\n  };\n\n  Blockly.Blocks['getLateralSpeed'] = {\n    init: function () {\n      this.jsonInit(getLateral);\n    }\n  };\n\n  Blockly.JavaScript['getLateralSpeed'] = function (block) {\n    var variable_robotvar = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('ROBOTVAR'), Blockly.Variables.NAME_TYPE);\n\n    var code = variable_robotvar + '.getL()';\n\n    return [code, Blockly.JavaScript.ORDER_ATOMIC];\n  };\n}\n\n//# sourceURL=webpack:///../Scratch/customBlocks/getLateralSpeedBlock.js?");

/***/ }),

/***/ "../Scratch/customBlocks/getLinearSpeedBlock.js":
/*!******************************************************!*\
  !*** ../Scratch/customBlocks/getLinearSpeedBlock.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return initGetLinearSpeedBlock; });\n\nfunction initGetLinearSpeedBlock() {\n  var getLinear = {\n    \"type\": \"getLinearSpeed\",\n    \"message0\": \"%{BKY_GETLINEARSPEED_TEXT}\",\n    \"args0\": [{\n      \"type\": \"field_variable\",\n      \"name\": \"ROBOTVAR\",\n      \"variable\": \"myRobot\"\n    }],\n    \"output\": null,\n    \"colour\": \"%{BKY_ROBOT_MOTORS_HUE}\",\n    \"tooltip\": \"%{BKY_GETLINEARSPEED_TOOLTIP}\",\n    \"helpUrl\": \"\"\n  };\n\n  Blockly.Blocks['getLinearSpeed'] = {\n    init: function () {\n      this.jsonInit(getLinear);\n    }\n  };\n\n  Blockly.JavaScript['getLinearSpeed'] = function (block) {\n    var variable_robotvar = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('ROBOTVAR'), Blockly.Variables.NAME_TYPE);\n\n    var code = variable_robotvar + '.getV()';\n\n    return [code, Blockly.JavaScript.ORDER_ATOMIC];\n  };\n}\n\n//# sourceURL=webpack:///../Scratch/customBlocks/getLinearSpeedBlock.js?");

/***/ }),

/***/ "../Scratch/customBlocks/getObjectColorBlock.js":
/*!******************************************************!*\
  !*** ../Scratch/customBlocks/getObjectColorBlock.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return initGetObjectColorBlock; });\n\nfunction initGetObjectColorBlock() {\n  var getObjectColorBlock = {\n    \"type\": \"get_objcolor\",\n    \"message0\": \"%{BKY_GET_OBJCOLOR_TEXT}\",\n    \"args0\": [{\n      \"type\": \"field_variable\",\n      \"name\": \"ROBOTVAR\",\n      \"variable\": \"myRobot\"\n    }, {\n      \"type\": \"field_dropdown\",\n      \"name\": \"OPTIONS\",\n      \"options\": [[\"centerX\", \"X\"], [\"centerY\", \"Y\"], [\"area\", \"AREA\"]]\n    }, {\n      \"type\": \"field_input\",\n      \"name\": \"COLOUR\",\n      \"text\": \"blue\"\n    }],\n    \"output\": null,\n    \"colour\": \"%{BKY_ROBOT_CAMERA_HUE}\",\n    \"tooltip\": \"%{BKY_GET_OBJCOLOR_TOOLTIP}\",\n    \"helpUrl\": \"\"\n  };\n\n  Blockly.Blocks['get_objcolor'] = {\n    init: function () {\n      this.jsonInit(getObjectColorBlock);\n    }\n  };\n\n  Blockly.JavaScript['get_objcolor'] = function (block) {\n    var variable_robotvar = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('ROBOTVAR'), Blockly.Variables.NAME_TYPE);\n    var dropdown_options = block.getFieldValue('OPTIONS');\n    var text_colour = block.getFieldValue('COLOUR');\n    var code = '';\n\n    if (dropdown_options === \"X\") {\n      code = variable_robotvar + '.getObjectColor(\"' + text_colour + '\").center[0];\\n';\n    } else if (dropdown_options === \"Y\") {\n      code = variable_robotvar + '.getObjectColor(\"' + text_colour + '\").center[1];\\n';\n    } else {\n      code = variable_robotvar + '.getObjectColor(\"' + text_colour + '\").area;\\n';\n    }\n\n    return [code, Blockly.JavaScript.ORDER_ATOMIC];\n  };\n\n  Blockly.Python['get_objcolor'] = function (block) {\n    var variable_robotvar = Blockly.Python.variableDB_.getName(block.getFieldValue('ROBOTVAR'), Blockly.Variables.NAME_TYPE);\n    var dropdown_options = block.getFieldValue('OPTIONS');\n    var text_colour = block.getFieldValue('COLOUR');\n    var code = '';\n\n    if (dropdown_options === \"X\") {\n      code = variable_robotvar + '.damePosicionDeObjetoDeColor(\"' + text_colour + '\")[0][0];\\n';\n    } else if (dropdown_options === \"Y\") {\n      code = variable_robotvar + '.damePosicionDeObjetoDeColor(\"' + text_colour + '\")[0][1];\\n';\n    } else {\n      code = variable_robotvar + '.damePosicionDeObjetoDeColor(\"' + text_colour + '\")[1];\\n';\n    }\n\n    return [code, Blockly.Python.ORDER_NONE];\n  };\n}\n\n//# sourceURL=webpack:///../Scratch/customBlocks/getObjectColorBlock.js?");

/***/ }),

/***/ "../Scratch/customBlocks/getPositionBlock.js":
/*!***************************************************!*\
  !*** ../Scratch/customBlocks/getPositionBlock.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return initGetPositionBlock; });\n\nfunction initGetPositionBlock() {\n  var getPositionBlock = {\n    \"type\": \"get_position\",\n    \"message0\": \"%{BKY_GET_POSITION_TEXT}\",\n    \"args0\": [{\n      \"type\": \"field_dropdown\",\n      \"name\": \"POSITION_OPTIONS\",\n      \"options\": [[\"x\", \"POSX\"], [\"y\", \"POSY\"], [\"z\", \"POSZ\"], [\"theta\", \"ROTATION\"]]\n    }, {\n      \"type\": \"field_variable\",\n      \"name\": \"ROBOTVAR\",\n      \"variable\": \"myRobot\"\n    }],\n    \"output\": null,\n    \"colour\": \"%{BKY_ROBOT_SENSORS_HUE}\",\n    \"tooltip\": \"%{BKY_GET_POSITION_TOOLTIP}\",\n    \"helpUrl\": \"\"\n  };\n\n  Blockly.Blocks['get_position'] = {\n    init: function () {\n      this.jsonInit(getPositionBlock);\n    }\n  };\n\n  Blockly.JavaScript['get_position'] = function (block) {\n    var dropdown_position_options = block.getFieldValue('POSITION_OPTIONS');\n    var variable_robotvar = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('ROBOTVAR'), Blockly.Variables.NAME_TYPE);\n    var code = '';\n\n    if (dropdown_position_options === \"POSX\") {\n      code = variable_robotvar + '.getPosition().x';\n    } else if (dropdown_position_options === \"POSY\") {\n      code = variable_robotvar + '.getPosition().z';\n    } else if (dropdown_position_options === \"POSZ\") {\n      code = variable_robotvar + '.getPosition().y';\n    } else {\n      code = variable_robotvar + '.getPosition().theta';\n    }\n    return [code, Blockly.JavaScript.ORDER_ATOMIC];\n  };\n}\n\n//# sourceURL=webpack:///../Scratch/customBlocks/getPositionBlock.js?");

/***/ }),

/***/ "../Scratch/customBlocks/getRotationBlock.js":
/*!***************************************************!*\
  !*** ../Scratch/customBlocks/getRotationBlock.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return initGetRotationBlock; });\n\nfunction initGetRotationBlock() {\n  var getRotation = {\n    \"type\": \"getRotation\",\n    \"message0\": \"Get Rotation for %1\",\n    \"args0\": [{\n      \"type\": \"field_variable\",\n      \"name\": \"ROBOTVAR\",\n      \"variable\": \"myRobot\"\n    }],\n    \"output\": null,\n    \"colour\": \"%{BKY_VARIABLES_DYNAMIC_HUE}\",\n    \"tooltip\": \"\",\n    \"helpUrl\": \"\"\n  };\n\n  Blockly.Blocks['getRotation'] = {\n    init: function () {\n      this.jsonInit(getRotation);\n    }\n  };\n\n  Blockly.JavaScript['getRotation'] = function (block) {\n    var variable_robotvar = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('ROBOTVAR'), Blockly.Variables.NAME_TYPE);\n\n    var code = variable_robotvar + '.getRotation()';\n\n    return [code, Blockly.JavaScript.ORDER_ATOMIC];\n  };\n}\n\n//# sourceURL=webpack:///../Scratch/customBlocks/getRotationBlock.js?");

/***/ }),

/***/ "../Scratch/customBlocks/moveBackwardBlock.js":
/*!****************************************************!*\
  !*** ../Scratch/customBlocks/moveBackwardBlock.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return initMoveBackwardBlock; });\n\nfunction initMoveBackwardBlock() {\n  var moveBackwardBlock = {\n    \"type\": \"move_backward\",\n    \"message0\": \"%{BKY_MOVE_BACKWARD_TEXT}\",\n    \"args0\": [{\n      \"type\": \"field_variable\",\n      \"name\": \"NAME\",\n      \"variable\": \"myRobot\"\n    }, {\n      \"type\": \"input_value\",\n      \"name\": \"ROBOTVAR\",\n      \"check\": \"Number\"\n    }],\n    \"previousStatement\": null,\n    \"nextStatement\": null,\n    \"colour\": \"%{BKY_ROBOT_MOTORS_HUE}\",\n    \"tooltip\": \"%{BKY_MOVE_BACKWARD_TOOLTIP}\",\n    \"helpUrl\": \"\"\n  };\n\n  Blockly.Blocks['move_backward'] = {\n    init: function () {\n      this.jsonInit(moveBackwardBlock);\n    }\n  };\n\n  Blockly.JavaScript['move_backward'] = function (block) {\n    var variable_name = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);\n    var value_robotvar = Blockly.JavaScript.valueToCode(block, 'ROBOTVAR', Blockly.JavaScript.ORDER_ATOMIC);\n\n    var code = variable_name + '.setV(-' + value_robotvar + '); \\n';\n    return code;\n  };\n\n  Blockly.Python['move_backward'] = function (block) {\n    var variable_name = Blockly.Python.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);\n    var value_robotvar = Blockly.Python.valueToCode(block, 'ROBOTVAR', Blockly.Python.ORDER_ATOMIC);\n\n    var code = variable_name + '.retroceder(' + value_robotvar + ')\\r\\n';\n    return code;\n  };\n}\n\n//# sourceURL=webpack:///../Scratch/customBlocks/moveBackwardBlock.js?");

/***/ }),

/***/ "../Scratch/customBlocks/moveBlock.js":
/*!********************************************!*\
  !*** ../Scratch/customBlocks/moveBlock.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return initMoveBlock; });\n\nfunction initMoveBlock() {\n  var moveBlock = {\n    \"type\": \"move_combined\",\n    \"message0\": \"%{BKY_MOVE_COMBINED_TEXT}\",\n    \"args0\": [{\n      \"type\": \"field_variable\",\n      \"name\": \"NAME\",\n      \"variable\": \"myRobot\"\n    }, {\n      \"type\": \"input_value\",\n      \"name\": \"LINEARSPEED\",\n      \"check\": \"Number\"\n    }, {\n      \"type\": \"input_value\",\n      \"name\": \"ANGULARSPEED\",\n      \"check\": \"Number\"\n    }],\n    \"inputsInline\": true,\n    \"previousStatement\": null,\n    \"nextStatement\": null,\n    \"colour\": \"%{BKY_ROBOT_MOTORS_HUE}\",\n    \"tooltip\": \"%{BKY_MOVE_COMBINED_TOOLTIP}\",\n    \"helpUrl\": \"\"\n  };\n\n  Blockly.Blocks['move_combined'] = {\n    init: function () {\n      this.jsonInit(moveBlock);\n    }\n  };\n\n  Blockly.JavaScript['move_combined'] = function (block) {\n    var variable_name = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);\n    var value_linear = Blockly.JavaScript.valueToCode(block, 'LINEARSPEED', Blockly.JavaScript.ORDER_ATOMIC);\n    var value_angular = Blockly.JavaScript.valueToCode(block, 'ANGULARSPEED', Blockly.JavaScript.ORDER_ATOMIC);\n\n    var code = variable_name + '.move(' + value_linear + ',' + value_angular + '); \\n';\n    return code;\n  };\n\n  Blockly.Python['move_combined'] = function (block) {\n    var variable_name = Blockly.Python.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);\n    var value_linear = Blockly.Python.valueToCode(block, 'LINEARSPEED', Blockly.Python.ORDER_ATOMIC);\n    var value_angular = Blockly.Python.valueToCode(block, 'ANGULARSPEED', Blockly.Python.ORDER_ATOMIC);\n\n    var code = \"Me han dicho que me mueva a linSpeed --> \" + value_linear + ' y angSpeed --> ' + value_angular + '\\r\\n';\n    return code;\n  };\n}\n\n//# sourceURL=webpack:///../Scratch/customBlocks/moveBlock.js?");

/***/ }),

/***/ "../Scratch/customBlocks/moveForwardBlock.js":
/*!***************************************************!*\
  !*** ../Scratch/customBlocks/moveForwardBlock.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return initMoveForwardBlock; });\n\nfunction initMoveForwardBlock() {\n  var moveForwardBlock = {\n    \"type\": \"move_forward\",\n    \"message0\": \"%{BKY_MOVE_FORWARD_TEXT}\",\n    \"args0\": [{\n      \"type\": \"field_variable\",\n      \"name\": \"NAME\",\n      \"variable\": \"myRobot\"\n    }, {\n      \"type\": \"input_value\",\n      \"name\": \"ROBOTVAR\",\n      \"check\": \"Number\"\n    }],\n    \"previousStatement\": null,\n    \"nextStatement\": null,\n    \"colour\": \"%{BKY_ROBOT_MOTORS_HUE}\",\n    \"tooltip\": \"%{BKY_MOVE_FORWARD_TOOLTIP}\",\n    \"helpUrl\": \"\"\n  };\n\n  Blockly.Blocks['move_forward'] = {\n    init: function () {\n      this.jsonInit(moveForwardBlock);\n    }\n  };\n\n  Blockly.JavaScript['move_forward'] = function (block) {\n    var variable_name = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);\n    var value_robotvar = Blockly.JavaScript.valueToCode(block, 'ROBOTVAR', Blockly.JavaScript.ORDER_ATOMIC);\n\n    var code = variable_name + '.setV(' + value_robotvar + '); \\n';\n    return code;\n  };\n\n  Blockly.Python['move_forward'] = function (block) {\n    var variable_name = Blockly.Python.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);\n    var value_robotvar = Blockly.Python.valueToCode(block, 'ROBOTVAR', Blockly.Python.ORDER_ATOMIC);\n\n    var code = variable_name + '.avanzar(' + value_robotvar + ')\\r\\n';\n    return code;\n  };\n}\n\n//# sourceURL=webpack:///../Scratch/customBlocks/moveForwardBlock.js?");

/***/ }),

/***/ "../Scratch/customBlocks/printImgCanvasBlock.js":
/*!******************************************************!*\
  !*** ../Scratch/customBlocks/printImgCanvasBlock.js ***!
  \******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return initPrintOnCanvasBlock; });\n\nfunction initPrintOnCanvasBlock() {\n  var imgToCanvasBlock = {\n    \"type\": \"imgto_canvas\",\n    \"message0\": \"%{BKY_IMGTO_CANVAS_TEXT}\",\n    \"args0\": [{\n      \"type\": \"field_input\",\n      \"name\": \"canvas_id\",\n      \"text\": \"outputCanvas\"\n    }, {\n      \"type\": \"input_value\",\n      \"name\": \"img_input\"\n    }],\n    \"previousStatement\": null,\n    \"nextStatement\": null,\n    \"colour\": \"%{BKY_ROBOT_TOOLS_HUE}\",\n    \"tooltip\": \"%{BKY_IMGTO_CANVAS_TOOLTIP}\",\n    \"helpUrl\": \"\"\n  };\n\n  Blockly.Blocks['imgto_canvas'] = {\n    init: function () {\n      this.jsonInit(imgToCanvasBlock);\n    }\n  };\n\n  Blockly.JavaScript['imgto_canvas'] = function (block) {\n    var text_canvas_id = block.getFieldValue('canvas_id');\n    var value_img_input = Blockly.JavaScript.valueToCode(block, 'img_input', Blockly.JavaScript.ORDER_ATOMIC);\n    // TODO: Assemble JavaScript into code variable.\n    var code = 'cv.imshow(\"' + text_canvas_id + '\", ' + value_img_input + ');\\n';\n    return code;\n  };\n}\n\n//# sourceURL=webpack:///../Scratch/customBlocks/printImgCanvasBlock.js?");

/***/ }),

/***/ "../Scratch/customBlocks/readIRBlock.js":
/*!**********************************************!*\
  !*** ../Scratch/customBlocks/readIRBlock.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return initReadIRBlock; });\n\nfunction initReadIRBlock() {\n  var readIRBlock = {\n    \"type\": \"read_ir\",\n    \"message0\": \"%{BKY_READ_IR_TEXT}\",\n    \"args0\": [{\n      \"type\": \"field_variable\",\n      \"name\": \"ROBOT_VAR\",\n      \"variable\": \"myRobot\"\n    }, {\n      \"type\": \"input_value\",\n      \"name\": \"NAME\"\n    }],\n    \"output\": null,\n    \"colour\": \"%{BKY_ROBOT_SENSORS_HUE}\",\n    \"tooltip\": \"%{BKY_READ_IR_TOOLTIP}\",\n    \"helpUrl\": \"\"\n  };\n\n  Blockly.Blocks['read_ir'] = {\n    init: function () {\n      this.jsonInit(readIRBlock);\n    }\n  };\n\n  Blockly.JavaScript['read_ir'] = function (block) {\n    var variable_robot_var = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('ROBOT_VAR'), Blockly.Variables.NAME_TYPE);\n    var value_name = Blockly.JavaScript.valueToCode(block, 'NAME', Blockly.JavaScript.ORDER_ATOMIC);\n\n    var code = variable_robot_var + '.readIR(' + value_name + ')';\n\n    return [code, Blockly.JavaScript.ORDER_ATOMIC];\n  };\n\n  Blockly.Python['read_ir'] = function (block) {\n    var variable_robot_var = Blockly.Python.variableDB_.getName(block.getFieldValue('ROBOT_VAR'), Blockly.Variables.NAME_TYPE);\n    var value_name = Blockly.Python.valueToCode(block, 'NAME', Blockly.Python.ORDER_ATOMIC);\n\n    var code = variable_robot_var + '.leerIRSigueLineas()\\r\\n';\n\n    return [code, Blockly.Python.ORDER_ATOMIC];\n  };\n}\n\n//# sourceURL=webpack:///../Scratch/customBlocks/readIRBlock.js?");

/***/ }),

/***/ "../Scratch/customBlocks/setIntervalBlock.js":
/*!***************************************************!*\
  !*** ../Scratch/customBlocks/setIntervalBlock.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return initSetIntervalBlock; });\n\nfunction initSetIntervalBlock() {\n  var setIntervalBlock = {\n    \"type\": \"set_interval\",\n    \"message0\": \"%{BKY_SET_INTERVAL_TEXT}\",\n    \"args0\": [{\n      \"type\": \"input_statement\",\n      \"name\": \"TEXT\"\n    }],\n    \"output\": null,\n    \"colour\": \"%{BKY_ROBOT_TOOLS_HUE}\",\n    \"tooltip\": \"%{BKY_SET_INTERVAL_TOOLTIP}\",\n    \"helpUrl\": \"\"\n  };\n\n  Blockly.Blocks['set_interval'] = {\n    init: function () {\n      this.jsonInit(setIntervalBlock);\n    }\n  };\n\n  Blockly.JavaScript['set_interval'] = function (block) {\n    var statements_text = Blockly.JavaScript.statementToCode(block, 'TEXT');\n\n    var code = 'setInterval(()=>{\\n' + statements_text + '},100);\\n';\n    return [code, Blockly.JavaScript.ORDER_ATOMIC];\n  };\n\n  Blockly.Python['set_interval'] = function (block) {\n    var statements_text = Blockly.Python.statementToCode(block, 'TEXT');\n\n    var code = 'while True:\\n' + statements_text + '\\ntime.sleep(0.1)\\n';\n    return [code, Blockly.Python.ORDER_ATOMIC];\n  };\n}\n\n//# sourceURL=webpack:///../Scratch/customBlocks/setIntervalBlock.js?");

/***/ }),

/***/ "../Scratch/customBlocks/setLateralSpeedBlock.js":
/*!*******************************************************!*\
  !*** ../Scratch/customBlocks/setLateralSpeedBlock.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return initSetLateralSpeedBlock; });\n\nfunction initSetLateralSpeedBlock() {\n  var setLateralBlock = {\n    \"type\": \"set_lateral\",\n    \"message0\": \"%{BKY_SET_LATERAL_TEXT}\",\n    \"args0\": [{\n      \"type\": \"field_variable\",\n      \"name\": \"NAME\",\n      \"variable\": \"myRobot\"\n    }, {\n      \"type\": \"input_value\",\n      \"name\": \"ROBOTVAR\",\n      \"check\": \"Number\"\n    }],\n    \"previousStatement\": null,\n    \"nextStatement\": null,\n    \"colour\": \"%{BKY_ROBOT_MOTORS_HUE}\",\n    \"tooltip\": \"%{BKY_SET_LATERAL_TOOLTIP}\",\n    \"helpUrl\": \"\"\n  };\n\n  Blockly.Blocks['set_lateral'] = {\n    init: function () {\n      this.jsonInit(setLateralBlock);\n    }\n  };\n\n  Blockly.JavaScript['set_lateral'] = function (block) {\n    var variable_name = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);\n    var value_robotvar = Blockly.JavaScript.valueToCode(block, 'ROBOTVAR', Blockly.JavaScript.ORDER_ATOMIC);\n\n    var code = variable_name + '.setL(' + value_robotvar + '); \\n';\n    return code;\n  };\n}\n\n//# sourceURL=webpack:///../Scratch/customBlocks/setLateralSpeedBlock.js?");

/***/ }),

/***/ "../Scratch/customBlocks/setTimeoutBlock.js":
/*!**************************************************!*\
  !*** ../Scratch/customBlocks/setTimeoutBlock.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return initSetTimeoutBlock; });\n\nfunction initSetTimeoutBlock() {\n  var setTimeoutBlock = {\n    \"type\": \"set_timeout\",\n    \"message0\": \"%{BKY_SET_TIMEOUT_TEXT}\",\n    \"args0\": [{\n      \"type\": \"field_number\",\n      \"name\": \"TIME\",\n      \"value\": 0,\n      \"min\": 0\n    }, {\n      \"type\": \"input_statement\",\n      \"name\": \"TEXT\"\n    }],\n    \"output\": null,\n    \"colour\": \"%{BKY_ROBOT_TOOLS_HUE}\",\n    \"tooltip\": \"%{BKY_SET_TIMEOUT_TOOLTIP}\",\n    \"helpUrl\": \"\"\n  };\n\n  Blockly.Blocks['set_timeout'] = {\n    init: function () {\n      this.jsonInit(setTimeoutBlock);\n    }\n  };\n\n  Blockly.JavaScript['set_timeout'] = function (block) {\n    var number_name = block.getFieldValue('TIME');\n    var statements_text = Blockly.JavaScript.statementToCode(block, 'TEXT');\n\n    var code = 'setTimeout(()=>{\\n' + statements_text + '},' + number_name + ');\\n';\n    return [code, Blockly.JavaScript.ORDER_ATOMIC];\n  };\n\n  Blockly.Python['set_timeout'] = function (block) {\n    var number_name = parseInt(block.getFieldValue('TIME'));\n    var statements_text = Blockly.Python.statementToCode(block, 'TEXT');\n    var time_secs = number_name / 1000;\n    var code = 'time.sleep(' + time_secs + ')\\n' + statements_text + \"\\r\\n\";\n    return code;\n  };\n}\n\n//# sourceURL=webpack:///../Scratch/customBlocks/setTimeoutBlock.js?");

/***/ }),

/***/ "../Scratch/customBlocks/stopBlock.js":
/*!********************************************!*\
  !*** ../Scratch/customBlocks/stopBlock.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return initStopBlock; });\n\nfunction initStopBlock() {\n  var stopBlock = {\n    \"type\": \"stop_robot\",\n    \"message0\": \"%{BKY_STOP_ROBOT_TEXT}\",\n    \"args0\": [{\n      \"type\": \"field_variable\",\n      \"name\": \"NAME\",\n      \"variable\": \"myRobot\"\n    }],\n    \"inputsInline\": true,\n    \"previousStatement\": null,\n    \"nextStatement\": null,\n    \"colour\": \"%{BKY_ROBOT_MOTORS_HUE}\",\n    \"tooltip\": \"%{BKY_STOP_ROBOT_TOOLTIP}\",\n    \"helpUrl\": \"\"\n  };\n\n  Blockly.Blocks['stop_robot'] = {\n    init: function () {\n      this.jsonInit(stopBlock);\n    }\n  };\n\n  Blockly.JavaScript['stop_robot'] = function (block) {\n    var variable_name = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);\n\n    var code = variable_name + '.move(0, 0);\\n';\n    return code;\n  };\n\n  Blockly.Python['stop_robot'] = function (block) {\n    var variable_name = Blockly.Python.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);\n\n    var code = variable_name + '.parar()\\r\\n';\n    return code;\n  };\n}\n\n//# sourceURL=webpack:///../Scratch/customBlocks/stopBlock.js?");

/***/ }),

/***/ "../Scratch/customBlocks/turnLeftBlock.js":
/*!************************************************!*\
  !*** ../Scratch/customBlocks/turnLeftBlock.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return initTurnLeftBlock; });\n\n\nfunction initTurnLeftBlock() {\n  var turnLeftBlock = {\n    \"type\": \"turn_left\",\n    \"message0\": \"%{BKY_TURN_LEFT_TEXT}\",\n    \"args0\": [{\n      \"type\": \"field_variable\",\n      \"name\": \"NAME\",\n      \"variable\": \"myRobot\"\n    }, {\n      \"type\": \"input_value\",\n      \"name\": \"ROBOTVAR\",\n      \"check\": \"Number\"\n    }],\n    \"previousStatement\": null,\n    \"nextStatement\": null,\n    \"colour\": \"%{BKY_ROBOT_MOTORS_HUE}\",\n    \"tooltip\": \"%{BKY_TURN_LEFT_TOOLTIP}\",\n    \"helpUrl\": \"\"\n  };\n\n  Blockly.Blocks['turn_left'] = {\n    init: function () {\n      this.jsonInit(turnLeftBlock);\n    }\n  };\n\n  Blockly.JavaScript['turn_left'] = function (block) {\n    var variable_name = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);\n    var value_robotvar = Blockly.JavaScript.valueToCode(block, 'ROBOTVAR', Blockly.JavaScript.ORDER_ATOMIC);\n\n    var code = variable_name + '.setW(' + value_robotvar + '); \\n';\n    return code;\n  };\n\n  Blockly.Python['turn_left'] = function (block) {\n    var variable_name = Blockly.Python.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);\n    var value_robotvar = Blockly.Python.valueToCode(block, 'ROBOTVAR', Blockly.Python.ORDER_ATOMIC);\n\n    var code = variable_name + '.girarIzquierda(' + value_robotvar + ')\\r\\n';\n    return code;\n  };\n}\n\n//# sourceURL=webpack:///../Scratch/customBlocks/turnLeftBlock.js?");

/***/ }),

/***/ "../Scratch/customBlocks/turnRightBlock.js":
/*!*************************************************!*\
  !*** ../Scratch/customBlocks/turnRightBlock.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return initTurnRightBlock; });\n\nfunction initTurnRightBlock() {\n  var turnRightBlock = {\n    \"type\": \"turn_right\",\n    \"message0\": \"%{BKY_TURN_RIGHT_TEXT}\",\n    \"args0\": [{\n      \"type\": \"field_variable\",\n      \"name\": \"NAME\",\n      \"variable\": \"myRobot\"\n    }, {\n      \"type\": \"input_value\",\n      \"name\": \"ROBOTVAR\",\n      \"check\": \"Number\"\n    }],\n    \"previousStatement\": null,\n    \"nextStatement\": null,\n    \"colour\": \"%{BKY_ROBOT_MOTORS_HUE}\",\n    \"tooltip\": \"%{BKY_TURN_RIGHT_HUE}\",\n    \"helpUrl\": \"\"\n  };\n\n  Blockly.Blocks['turn_right'] = {\n    init: function () {\n      this.jsonInit(turnRightBlock);\n    }\n  };\n\n  Blockly.JavaScript['turn_right'] = function (block) {\n    var variable_name = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);\n    var value_robotvar = Blockly.JavaScript.valueToCode(block, 'ROBOTVAR', Blockly.JavaScript.ORDER_ATOMIC);\n\n    var code = variable_name + '.setW(-' + value_robotvar + ');\\r\\n';\n    return code;\n  };\n\n  Blockly.Python['turn_right'] = function (block) {\n    var variable_name = Blockly.Python.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);\n    var value_robotvar = Blockly.Python.valueToCode(block, 'ROBOTVAR', Blockly.Python.ORDER_ATOMIC);\n\n    var code = variable_name + '.girarDerecha(' + value_robotvar + ')\\r\\n';\n    return code;\n  };\n}\n\n//# sourceURL=webpack:///../Scratch/customBlocks/turnRightBlock.js?");

/***/ }),

/***/ "../Scratch/customBlocks/waitBlock.js":
/*!********************************************!*\
  !*** ../Scratch/customBlocks/waitBlock.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return initWaitBlock; });\n\nfunction initWaitBlock() {\n  var waitBlock = {\n    \"type\": \"wait_block\",\n    \"message0\": \"%{BKY_WAIT_BLOCK_TEXT}\",\n    \"args0\": [{\n      \"type\": \"input_value\",\n      \"name\": \"time_input\"\n    }],\n    \"previousStatement\": null,\n    \"nextStatement\": null,\n    \"colour\": \"%{BKY_ROBOT_TOOLS_HUE}\",\n    \"tooltip\": \"%{BKY_WAIT_BLOCK_TOOLTIP}\",\n    \"helpUrl\": \"\"\n  };\n\n  Blockly.Blocks['wait_block'] = {\n    init: function () {\n      this.jsonInit(waitBlock);\n    }\n  };\n\n  Blockly.JavaScript['wait_block'] = function (block) {\n    var value_time_input = Blockly.JavaScript.valueToCode(block, 'time_input', Blockly.JavaScript.ORDER_ATOMIC);\n\n    var code = 'await sleep(' + value_time_input + ');\\n';\n    return code;\n  };\n\n  Blockly.Python['wait_block'] = function (block) {\n    var value_time_input = Blockly.Python.valueToCode(block, 'time_input', Blockly.Python.ORDER_ATOMIC);\n\n    var code = 'time.sleep(' + value_time_input / 1000 + ')\\r\\n';\n    return code;\n  };\n}\n\n//# sourceURL=webpack:///../Scratch/customBlocks/waitBlock.js?");

/***/ }),

/***/ "../Scratch/js/editor-methods.js":
/*!***************************************!*\
  !*** ../Scratch/js/editor-methods.js ***!
  \***************************************/
/*! exports provided: setupBlockly, toggleCameraDisplay, injectCode, saveCode, downloadZip, WebSocketConnection, wsClose */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"setupBlockly\", function() { return setupBlockly; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"toggleCameraDisplay\", function() { return toggleCameraDisplay; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"injectCode\", function() { return injectCode; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"saveCode\", function() { return saveCode; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"downloadZip\", function() { return downloadZip; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"WebSocketConnection\", function() { return WebSocketConnection; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"wsClose\", function() { return wsClose; });\n/*\r\n  This file sets up Blockly and ACE editors and manages their functions.\r\n\r\n  This file provide 2 functions:\r\n  - startStopCode: starts or stop the code from blockly workspace.\r\n  - setupBlockly: Initial set up Blockly workspace.\r\n*/\n\nfunction setupBlockly(workspace) {\n  /*\r\n    This function sets up Blockly editor.\r\n    It configures toolbox and injects a template\r\n  */\n  workspace = Blockly.inject('blockly-div', {\n    //media: '/static/websim/Scratch/google-blockly/media/',\n    media: 'google-blockly/media/',\n    toolbox: document.getElementById('toolbox'),\n    zoom: {\n      controls: true,\n      wheel: true,\n      startScale: 1.0,\n      maxScale: 3,\n      minScale: 0.3,\n      scaleSpeed: 1.2\n    },\n    trashcan: true,\n    horizontalLayout: false,\n    scrollbars: true\n  });\n\n  Blockly.JavaScript.INFINITE_LOOP_TRAP = null;\n  return workspace;\n}\n\nfunction toggleCameraDisplay() {\n  var opencvCam = document.querySelector(\"#outputCanvas\");\n  var imageCamBtn = document.querySelector(\"#cambtn\").firstChild;\n  $(\"#outputCanvas, #spectatorDiv\").toggle();\n  if (opencvCam.style.display != \"none\") {\n    imageCamBtn.src = \"/static/websim/assets/resources/stop-camera-icon.png\";\n  } else {\n    imageCamBtn.src = \"/static/websim/assets/resources/play-camera-icon.png\";\n  }\n}\n\nfunction injectCode(workspace, xmlCodeText) {\n  if (xmlCodeText != undefined) {\n    var xmlToInject = Blockly.Xml.textToDom(xmlCodeText);\n    Blockly.Xml.domToWorkspace(xmlToInject, workspace);\n    console.log(\"Code injected into workspace\");\n  }\n  return workspace;\n}\n\nfunction saveCode(demoWorkspace, socket) {\n  console.log(\"Getting code from the embedded editor.\");\n  var xml = Blockly.Xml.workspaceToDom(demoWorkspace);\n  var xml_text = Blockly.Xml.domToText(xml);\n\n  var message = {\n    type: \"save\",\n    content: xml_text\n  };\n\n  socket.send(JSON.stringify(message));\n}\n\n/////////////////// descarga local websim pibot\nfunction downloadZip(demoWorkspace, socket) {\n  console.log(\"Getting code from the embedded editor.\");\n  var pythonContent = Blockly.Python.workspaceToCode(demoWorkspace);\n\n  var message = {\n    type: \"websim\",\n    content: pythonContent\n  };\n  console.log(\"Sending code to websocket\");\n  socket.send(JSON.stringify(message));\n}\n/////////////////////////////////////////////////////////////////////////////\n\n\nfunction WebSocketConnection(uri) {\n  var socket = new WebSocket(uri);\n  socket.onopen = function (evt) {\n    console.log(\"Conexión WS establecida con el Servidor\");\n    document.getElementById(\"saveCode\").disabled = false;\n  };\n\n  socket.onmessage = function (evt) {\n    console.log(\"MESSAGE\");\n  };\n\n  socket.onerror = function (evt) {\n    console.error(evt.data);\n  };\n\n  socket.onclose = function (evt) {\n    wsClose(evt);\n  };\n\n  return socket;\n}\n\nfunction wsClose(evt) {\n  console.error(evt.data);\n  console.log(\"Cierre de conexión WebSockets detectado. Intentando Reconectar.\");\n  document.getElementById(\"saveCode\").disabled = true;\n  setTimeout(function () {\n    WebSocketConnection(wsUri);\n  }, 500);\n}\n\n//# sourceURL=webpack:///../Scratch/js/editor-methods.js?");

/***/ }),

/***/ "../Scratch/js/editor.js":
/*!*******************************!*\
  !*** ../Scratch/js/editor.js ***!
  \*******************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _editor_methods_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./editor-methods.js */ \"../Scratch/js/editor-methods.js\");\n/* harmony import */ var _customBlocks_getAngularSpeedBlock_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../customBlocks/getAngularSpeedBlock.js */ \"../Scratch/customBlocks/getAngularSpeedBlock.js\");\n/* harmony import */ var _customBlocks_consoleLogBlock_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../customBlocks/consoleLogBlock.js */ \"../Scratch/customBlocks/consoleLogBlock.js\");\n/* harmony import */ var _customBlocks_getDistanceBlock_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../customBlocks/getDistanceBlock.js */ \"../Scratch/customBlocks/getDistanceBlock.js\");\n/* harmony import */ var _customBlocks_getDistancesBlock_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../customBlocks/getDistancesBlock.js */ \"../Scratch/customBlocks/getDistancesBlock.js\");\n/* harmony import */ var _customBlocks_getImageBlock_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../customBlocks/getImageBlock.js */ \"../Scratch/customBlocks/getImageBlock.js\");\n/* harmony import */ var _customBlocks_getLateralSpeedBlock_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../customBlocks/getLateralSpeedBlock.js */ \"../Scratch/customBlocks/getLateralSpeedBlock.js\");\n/* harmony import */ var _customBlocks_getLinearSpeedBlock_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../customBlocks/getLinearSpeedBlock.js */ \"../Scratch/customBlocks/getLinearSpeedBlock.js\");\n/* harmony import */ var _customBlocks_getObjectColorBlock_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../customBlocks/getObjectColorBlock.js */ \"../Scratch/customBlocks/getObjectColorBlock.js\");\n/* harmony import */ var _customBlocks_getPositionBlock_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../customBlocks/getPositionBlock.js */ \"../Scratch/customBlocks/getPositionBlock.js\");\n/* harmony import */ var _customBlocks_getRotationBlock_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../customBlocks/getRotationBlock.js */ \"../Scratch/customBlocks/getRotationBlock.js\");\n/* harmony import */ var _customBlocks_moveBackwardBlock_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../customBlocks/moveBackwardBlock.js */ \"../Scratch/customBlocks/moveBackwardBlock.js\");\n/* harmony import */ var _customBlocks_moveBlock_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../customBlocks/moveBlock.js */ \"../Scratch/customBlocks/moveBlock.js\");\n/* harmony import */ var _customBlocks_moveForwardBlock_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../customBlocks/moveForwardBlock.js */ \"../Scratch/customBlocks/moveForwardBlock.js\");\n/* harmony import */ var _customBlocks_printImgCanvasBlock_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../customBlocks/printImgCanvasBlock.js */ \"../Scratch/customBlocks/printImgCanvasBlock.js\");\n/* harmony import */ var _customBlocks_readIRBlock_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../customBlocks/readIRBlock.js */ \"../Scratch/customBlocks/readIRBlock.js\");\n/* harmony import */ var _customBlocks_setIntervalBlock_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../customBlocks/setIntervalBlock.js */ \"../Scratch/customBlocks/setIntervalBlock.js\");\n/* harmony import */ var _customBlocks_setTimeoutBlock_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../customBlocks/setTimeoutBlock.js */ \"../Scratch/customBlocks/setTimeoutBlock.js\");\n/* harmony import */ var _customBlocks_setLateralSpeedBlock_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../customBlocks/setLateralSpeedBlock.js */ \"../Scratch/customBlocks/setLateralSpeedBlock.js\");\n/* harmony import */ var _customBlocks_stopBlock_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../customBlocks/stopBlock.js */ \"../Scratch/customBlocks/stopBlock.js\");\n/* harmony import */ var _customBlocks_turnLeftBlock_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../customBlocks/turnLeftBlock.js */ \"../Scratch/customBlocks/turnLeftBlock.js\");\n/* harmony import */ var _customBlocks_turnRightBlock_js__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../customBlocks/turnRightBlock.js */ \"../Scratch/customBlocks/turnRightBlock.js\");\n/* harmony import */ var _customBlocks_waitBlock_js__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ../customBlocks/waitBlock.js */ \"../Scratch/customBlocks/waitBlock.js\");\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nvar demoWorkspace = \"\";\n// Load enviroment variables defined in the html template\nvar wsUri = window.wsUri;\nconsole.log(\"-----===================---------------------------------\");\nconsole.log(\"@@@@@@@@@\" + wsUri);\nconsole.log(\"----------------------===========----------------\");\n\nvar userCode = window.userCode;\nvar socket = \"\";\n\n$(document).ready(() => {\n  configureCustomBlocks();\n\n  demoWorkspace = Object(_editor_methods_js__WEBPACK_IMPORTED_MODULE_0__[\"setupBlockly\"])(demoWorkspace); // Sets up blockly editor\n  demoWorkspace = Object(_editor_methods_js__WEBPACK_IMPORTED_MODULE_0__[\"injectCode\"])(demoWorkspace, userCode); // Inject (Load) blockly user code in editor\n\n  // Toggle display when cambtn clicked\n  $(\"#cambtn\").click(() => {\n    Object(_editor_methods_js__WEBPACK_IMPORTED_MODULE_0__[\"toggleCameraDisplay\"])();\n  });\n\n  $('#generator').click(() => {\n    showMe(demoWorkspace);\n  });\n\n  $('#runbtn').click(() => {\n    var codeString = Blockly.JavaScript.workspaceToCode(demoWorkspace);\n    var websimevent = new CustomEvent('code-to-run', {\n      'detail': {\n        'code': codeString\n      }\n    });\n    document.dispatchEvent(websimevent);\n  });\n\n  $(\"#injectCode\").click(() => {\n    demoWorkspace = Object(_editor_methods_js__WEBPACK_IMPORTED_MODULE_0__[\"injectCode\"])(demoWorkspace, userCode);\n  });\n\n  $(\"#saveCode\").click(() => {\n    Object(_editor_methods_js__WEBPACK_IMPORTED_MODULE_0__[\"saveCode\"])(demoWorkspace, socket); // Declare function that extracts code from editor and sends to server via connection.send\n  });\n\n  $(\"#blocklyToPython\").click(() => {\n    Object(_editor_methods_js__WEBPACK_IMPORTED_MODULE_0__[\"downloadZip\"])(demoWorkspace, socket);\n  });\n\n  $('#resetRobot').click(() => {\n    var resetEvent = new CustomEvent('reset', {\n      'detail': ''\n    });\n    document.dispatchEvent(resetEvent);\n  });\n\n  // Only should try connect to Ws Server if wsUri is not null. Its necesary for avoid error with no registered users\n  if (wsUri != null) {\n    socket = Object(_editor_methods_js__WEBPACK_IMPORTED_MODULE_0__[\"WebSocketConnection\"])(wsUri); // Create WebSocket connection with server to save system\n  }\n});\n\nfunction configureCustomBlocks() {\n  Object(_customBlocks_getAngularSpeedBlock_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])();\n  Object(_customBlocks_consoleLogBlock_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])();\n  Object(_customBlocks_getDistanceBlock_js__WEBPACK_IMPORTED_MODULE_3__[\"default\"])();\n  Object(_customBlocks_getDistancesBlock_js__WEBPACK_IMPORTED_MODULE_4__[\"default\"])();\n  Object(_customBlocks_getImageBlock_js__WEBPACK_IMPORTED_MODULE_5__[\"default\"])();\n  Object(_customBlocks_getLateralSpeedBlock_js__WEBPACK_IMPORTED_MODULE_6__[\"default\"])();\n  Object(_customBlocks_getLinearSpeedBlock_js__WEBPACK_IMPORTED_MODULE_7__[\"default\"])();\n  Object(_customBlocks_getObjectColorBlock_js__WEBPACK_IMPORTED_MODULE_8__[\"default\"])();\n  Object(_customBlocks_getPositionBlock_js__WEBPACK_IMPORTED_MODULE_9__[\"default\"])();\n  Object(_customBlocks_getRotationBlock_js__WEBPACK_IMPORTED_MODULE_10__[\"default\"])();\n  Object(_customBlocks_moveBackwardBlock_js__WEBPACK_IMPORTED_MODULE_11__[\"default\"])();\n  Object(_customBlocks_moveBlock_js__WEBPACK_IMPORTED_MODULE_12__[\"default\"])();\n  Object(_customBlocks_moveForwardBlock_js__WEBPACK_IMPORTED_MODULE_13__[\"default\"])();\n  Object(_customBlocks_printImgCanvasBlock_js__WEBPACK_IMPORTED_MODULE_14__[\"default\"])();\n  Object(_customBlocks_readIRBlock_js__WEBPACK_IMPORTED_MODULE_15__[\"default\"])();\n  Object(_customBlocks_setIntervalBlock_js__WEBPACK_IMPORTED_MODULE_16__[\"default\"])();\n  Object(_customBlocks_setTimeoutBlock_js__WEBPACK_IMPORTED_MODULE_17__[\"default\"])();\n  Object(_customBlocks_stopBlock_js__WEBPACK_IMPORTED_MODULE_19__[\"default\"])();\n  Object(_customBlocks_turnLeftBlock_js__WEBPACK_IMPORTED_MODULE_20__[\"default\"])();\n  Object(_customBlocks_turnRightBlock_js__WEBPACK_IMPORTED_MODULE_21__[\"default\"])();\n  Object(_customBlocks_waitBlock_js__WEBPACK_IMPORTED_MODULE_22__[\"default\"])();\n  Object(_customBlocks_setLateralSpeedBlock_js__WEBPACK_IMPORTED_MODULE_18__[\"default\"])();\n}\n\n//# sourceURL=webpack:///../Scratch/js/editor.js?");

/***/ })

/******/ });