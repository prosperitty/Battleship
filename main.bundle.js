/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/gameboard.js":
/*!**************************!*\
  !*** ./src/gameboard.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Gameboard": () => (/* binding */ Gameboard)
/* harmony export */ });
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship */ "./src/ship.js");



function Gameboard() {
  var carrier = (0,_ship__WEBPACK_IMPORTED_MODULE_0__.Ship)('carrier', 5);
  var battleship = (0,_ship__WEBPACK_IMPORTED_MODULE_0__.Ship)('battleship', 4);
  var cruiser = (0,_ship__WEBPACK_IMPORTED_MODULE_0__.Ship)('cruiser', 3);
  var destroyer1 = (0,_ship__WEBPACK_IMPORTED_MODULE_0__.Ship)('destroyer1', 2);
  var destroyer2 = (0,_ship__WEBPACK_IMPORTED_MODULE_0__.Ship)('destroyer2', 2);
  var submarine1 = (0,_ship__WEBPACK_IMPORTED_MODULE_0__.Ship)('submarine1', 1);
  var submarine2 = (0,_ship__WEBPACK_IMPORTED_MODULE_0__.Ship)('submarine2', 1);
  var board = [[], [], [], [], [], [], [], [], [], []];

  for (var i = 0; i < 10; i++) {
    for (var j = 0; j < 10; j++) {
      board[i][j] = {
        coordinate: [i, j],
        ship: null,
        isHit: false,
        isMiss: false
      };
    }
  }

  var placeShips = function placeShips() {
    for (var _i = 0; _i < carrier.getLength(); _i++) {
      board[0][_i].ship = carrier;
    }

    for (var _i2 = 0; _i2 < battleship.getLength(); _i2++) {
      board[9][_i2].ship = battleship;
    }

    for (var _i3 = 0; _i3 < cruiser.getLength(); _i3++) {
      board[2][_i3].ship = cruiser;
    }

    board[4][0].ship = destroyer1;
    board[4][1].ship = destroyer1;
    board[4][4].ship = destroyer2;
    board[4][5].ship = destroyer2;
    board[6][7].ship = submarine1;
    board[2][8].ship = submarine2;
  };

  var receiveAttack = function receiveAttack(row, column) {
    var plot = board[row][column];

    if (plot.ship !== null && plot.isHit === false && plot.isMiss === false) {
      return plot.ship.hit(plot);
    } else if (plot.ship === null && plot.isHit === false && plot.isMiss === false) {
      return plot.isMiss = true;
    } else if (plot.isHit === true || plot.isMiss === true) {
      return 'plot has been struck already';
    }
  };

  var isGameOver = function isGameOver() {
    if (carrier.isSunk(board) && battleship.isSunk(board) && cruiser.isSunk(board) && destroyer1.isSunk(board) && destroyer2.isSunk(board) && submarine1.isSunk(board) && submarine2.isSunk(board)) {
      return true;
    } else {
      return false;
    }
  };

  return {
    board: board,
    placeShips: placeShips,
    receiveAttack: receiveAttack,
    isGameOver: isGameOver
  };
} // function findCoordinate(board, num) {
//   const reducedBoard = board.reduce((a, b) => a.concat(b));
//   return reducedBoard[num];
// }

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Player": () => (/* binding */ Player)
/* harmony export */ });
/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameboard */ "./src/gameboard.js");



function Player(name) {
  var _this = this;

  var turn = false;
  var gameboard = (0,_gameboard__WEBPACK_IMPORTED_MODULE_0__.Gameboard)();

  var toggleTurn = function toggleTurn() {
    return !turn ? turn = true : turn = false;
  };

  var getName = function getName() {
    return name;
  };

  var attack = function attack(enemyBoard) {
    if (turn) {
      var randomCoordinate = [randomNum(), randomNum()];
      enemyBoard.receiveAttack.apply(enemyBoard, randomCoordinate);

      _this.toggleTurn();
    }
  };

  function randomNum() {
    return Math.round(Math.random() * (0 - 10) + 10);
  }

  return {
    gameboard: gameboard,
    attack: attack,
    toggleTurn: toggleTurn,
    getName: getName
  };
}

/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Ship": () => (/* binding */ Ship)
/* harmony export */ });


function Ship(type, length) {
  var getLength = function getLength() {
    return length;
  };

  var shipStatus = {
    health: length,
    type: type
  };

  function getHitPositions(board) {
    var _this = this;

    var plots = board.reduce(function (a, b) {
      return a.concat(b);
    }).filter(function (coordinate) {
      return coordinate.isHit === true && coordinate.ship === _this;
    });
    return plots;
  }

  var hit = function hit(plot) {
    plot.isHit = true;
    shipStatus.health -= 1;
  };

  function isSunk(board) {
    var numOfHitPositions = this.getHitPositions(board).length;

    if (shipStatus.health === 0 && numOfHitPositions === getLength()) {
      return true;
    } else {
      return false;
    }
  }

  return {
    getHitPositions: getHitPositions,
    hit: hit,
    isSunk: isSunk,
    shipStatus: shipStatus,
    getLength: getLength
  };
}

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/style.scss":
/*!*****************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/style.scss ***!
  \*****************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "body {\n  background-color: #5eaab1;\n}\n\nheader {\n  text-align: center;\n}\n\n.gameboards-container {\n  display: flex;\n  justify-content: space-around;\n}\n\n.button-reset {\n  display: none;\n}\n\n.gameboards-container {\n  opacity: 0;\n  transition: 0.2s ease-in-out;\n}\n\n.gameboard-grid {\n  display: grid;\n  grid-template-rows: repeat(10, 1fr);\n  grid-template-columns: repeat(10, 1fr);\n}\n\n.gameboard-grid-item:hover {\n  border: 1px solid white;\n}\n\n.gameboard-grid-item {\n  height: 40px;\n  width: 40px;\n  border: 1px solid red;\n}", "",{"version":3,"sources":["webpack://./src/style.scss"],"names":[],"mappings":"AAAA;EACE,yBAAA;AACF;;AAEA;EACE,kBAAA;AACF;;AAEA;EACE,aAAA;EACA,6BAAA;AACF;;AAEA;EACE,aAAA;AACF;;AAEA;EACE,UAAA;EACA,4BAAA;AACF;;AAEA;EACE,aAAA;EACA,mCAAA;EACA,sCAAA;AACF;;AAEA;EACE,uBAAA;AACF;;AAEA;EACE,YAAA;EACA,WAAA;EACA,qBAAA;AACF","sourcesContent":["body {\n  background-color: rgb(94, 170, 177);\n}\n\nheader {\n  text-align: center;\n}\n\n.gameboards-container {\n  display: flex;\n  justify-content: space-around;\n}\n\n.button-reset {\n  display: none;\n}\n\n.gameboards-container {\n  opacity: 0;\n  transition: 0.2s ease-in-out;\n}\n\n.gameboard-grid {\n  display: grid;\n  grid-template-rows: repeat(10, 1fr);\n  grid-template-columns: repeat(10, 1fr);\n}\n\n.gameboard-grid-item:hover {\n  border: 1px solid white;\n}\n\n.gameboard-grid-item {\n  height: 40px;\n  width: 40px;\n  border: 1px solid red;\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";

      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }

      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }

      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }

      content += cssWithMappingToString(item);

      if (needLayer) {
        content += "}";
      }

      if (item[2]) {
        content += "}";
      }

      if (item[4]) {
        content += "}";
      }

      return content;
    }).join("");
  }; // import a list of modules into the list


  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var _i = 0; _i < this.length; _i++) {
        var id = this[_i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i2 = 0; _i2 < modules.length; _i2++) {
      var item = [].concat(modules[_i2]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }

      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }

      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }

      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),

/***/ "./src/style.scss":
/*!************************!*\
  !*** ./src/style.scss ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_style_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!../node_modules/sass-loader/dist/cjs.js!./style.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/sass-loader/dist/cjs.js!./src/style.scss");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_style_scss__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_style_scss__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_style_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_style_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.scss */ "./src/style.scss");
/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gameboard */ "./src/gameboard.js");
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./player */ "./src/player.js");
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ship */ "./src/ship.js");





function Game() {
  function initialize() {
    var startBtn = document.querySelector('.button-start');
    startBtn.addEventListener('click', function () {
      startBtn.style.display = 'none';
      displayContent();
      createGameboard();
    });
  }

  return {
    initialize: initialize
  };
}

function createGameboard() {
  var gameboard = document.querySelectorAll('.gameboard-grid');

  for (var i = 0; i < 100; i++) {
    var plot = document.createElement('div');
    plot.classList.add('gameboard-grid-item');
    gameboard[0].appendChild(plot);
  }

  for (var _i = 0; _i < 100; _i++) {
    var _plot = document.createElement('div');

    _plot.classList.add('gameboard-grid-item');

    gameboard[1].appendChild(_plot);
  }
}

function displayContent() {
  var resetBtn = document.querySelector('.button-reset');
  var gameboardsContainer = document.querySelector('.gameboards-container');
  resetBtn.style.display = 'inline-block';
  gameboardsContainer.style.opacity = 1;
}

Game().initialize();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFuQjs7QUFDQW5DLElBQUFBLFNBQVMsQ0FBQyxDQUFELENBQVQsQ0FBYW9DLFdBQWIsQ0FBeUIzQyxLQUF6QjtBQUNEO0FBQ0Y7O0FBRUQsU0FBU3FDLGNBQVQsR0FBMEI7QUFDeEIsTUFBTU8sUUFBUSxHQUFHWixRQUFRLENBQUNDLGFBQVQsQ0FBdUIsZUFBdkIsQ0FBakI7QUFDQSxNQUFNWSxtQkFBbUIsR0FBR2IsUUFBUSxDQUFDQyxhQUFULENBQXVCLHVCQUF2QixDQUE1QjtBQUNBVyxFQUFBQSxRQUFRLENBQUNULEtBQVQsQ0FBZUMsT0FBZixHQUF5QixjQUF6QjtBQUNBUyxFQUFBQSxtQkFBbUIsQ0FBQ1YsS0FBcEIsQ0FBMEJXLE9BQTFCLEdBQW9DLENBQXBDO0FBQ0Q7O0FBRURqQixJQUFJLEdBQUdDLFVBQVAsRyIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZWJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvcGxheWVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2hpcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3N0eWxlLnNjc3MiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc3R5bGUuc2Nzcz83NWJhIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTaGlwIH0gZnJvbSAnLi9zaGlwJztcbmV4cG9ydCB7IEdhbWVib2FyZCB9O1xuXG5mdW5jdGlvbiBHYW1lYm9hcmQoKSB7XG4gIGNvbnN0IGNhcnJpZXIgPSBTaGlwKCdjYXJyaWVyJywgNSk7XG4gIGNvbnN0IGJhdHRsZXNoaXAgPSBTaGlwKCdiYXR0bGVzaGlwJywgNCk7XG4gIGNvbnN0IGNydWlzZXIgPSBTaGlwKCdjcnVpc2VyJywgMyk7XG4gIGNvbnN0IGRlc3Ryb3llcjEgPSBTaGlwKCdkZXN0cm95ZXIxJywgMik7XG4gIGNvbnN0IGRlc3Ryb3llcjIgPSBTaGlwKCdkZXN0cm95ZXIyJywgMik7XG4gIGNvbnN0IHN1Ym1hcmluZTEgPSBTaGlwKCdzdWJtYXJpbmUxJywgMSk7XG4gIGNvbnN0IHN1Ym1hcmluZTIgPSBTaGlwKCdzdWJtYXJpbmUyJywgMSk7XG4gIGxldCBib2FyZCA9IFtbXSwgW10sIFtdLCBbXSwgW10sIFtdLCBbXSwgW10sIFtdLCBbXV07XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaisrKSB7XG4gICAgICBib2FyZFtpXVtqXSA9IHtcbiAgICAgICAgY29vcmRpbmF0ZTogW2ksIGpdLFxuICAgICAgICBzaGlwOiBudWxsLFxuICAgICAgICBpc0hpdDogZmFsc2UsXG4gICAgICAgIGlzTWlzczogZmFsc2UsXG4gICAgICB9O1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IHBsYWNlU2hpcHMgPSAoKSA9PiB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjYXJyaWVyLmdldExlbmd0aCgpOyBpKyspIHtcbiAgICAgIGJvYXJkWzBdW2ldLnNoaXAgPSBjYXJyaWVyO1xuICAgIH1cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGJhdHRsZXNoaXAuZ2V0TGVuZ3RoKCk7IGkrKykge1xuICAgICAgYm9hcmRbOV1baV0uc2hpcCA9IGJhdHRsZXNoaXA7XG4gICAgfVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY3J1aXNlci5nZXRMZW5ndGgoKTsgaSsrKSB7XG4gICAgICBib2FyZFsyXVtpXS5zaGlwID0gY3J1aXNlcjtcbiAgICB9XG4gICAgYm9hcmRbNF1bMF0uc2hpcCA9IGRlc3Ryb3llcjE7XG4gICAgYm9hcmRbNF1bMV0uc2hpcCA9IGRlc3Ryb3llcjE7XG4gICAgYm9hcmRbNF1bNF0uc2hpcCA9IGRlc3Ryb3llcjI7XG4gICAgYm9hcmRbNF1bNV0uc2hpcCA9IGRlc3Ryb3llcjI7XG4gICAgYm9hcmRbNl1bN10uc2hpcCA9IHN1Ym1hcmluZTE7XG4gICAgYm9hcmRbMl1bOF0uc2hpcCA9IHN1Ym1hcmluZTI7XG4gIH07XG5cbiAgY29uc3QgcmVjZWl2ZUF0dGFjayA9IChyb3csIGNvbHVtbikgPT4ge1xuICAgIGxldCBwbG90ID0gYm9hcmRbcm93XVtjb2x1bW5dO1xuICAgIGlmIChwbG90LnNoaXAgIT09IG51bGwgJiYgcGxvdC5pc0hpdCA9PT0gZmFsc2UgJiYgcGxvdC5pc01pc3MgPT09IGZhbHNlKSB7XG4gICAgICByZXR1cm4gcGxvdC5zaGlwLmhpdChwbG90KTtcbiAgICB9IGVsc2UgaWYgKFxuICAgICAgcGxvdC5zaGlwID09PSBudWxsICYmXG4gICAgICBwbG90LmlzSGl0ID09PSBmYWxzZSAmJlxuICAgICAgcGxvdC5pc01pc3MgPT09IGZhbHNlXG4gICAgKSB7XG4gICAgICByZXR1cm4gcGxvdC5pc01pc3MgPSB0cnVlO1xuICAgIH0gZWxzZSBpZiAocGxvdC5pc0hpdCA9PT0gdHJ1ZSB8fCBwbG90LmlzTWlzcyA9PT0gdHJ1ZSkge1xuICAgICAgcmV0dXJuICdwbG90IGhhcyBiZWVuIHN0cnVjayBhbHJlYWR5JztcbiAgICB9XG4gIH07XG5cbiAgY29uc3QgaXNHYW1lT3ZlciA9ICgpID0+IHtcbiAgICBpZiAoXG4gICAgICBjYXJyaWVyLmlzU3Vuayhib2FyZCkgJiZcbiAgICAgIGJhdHRsZXNoaXAuaXNTdW5rKGJvYXJkKSAmJlxuICAgICAgY3J1aXNlci5pc1N1bmsoYm9hcmQpICYmXG4gICAgICBkZXN0cm95ZXIxLmlzU3Vuayhib2FyZCkgJiZcbiAgICAgIGRlc3Ryb3llcjIuaXNTdW5rKGJvYXJkKSAmJlxuICAgICAgc3VibWFyaW5lMS5pc1N1bmsoYm9hcmQpICYmXG4gICAgICBzdWJtYXJpbmUyLmlzU3Vuayhib2FyZClcbiAgICApIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB7IGJvYXJkLCBwbGFjZVNoaXBzLCByZWNlaXZlQXR0YWNrLCBpc0dhbWVPdmVyIH07XG59XG5cbi8vIGZ1bmN0aW9uIGZpbmRDb29yZGluYXRlKGJvYXJkLCBudW0pIHtcbi8vICAgY29uc3QgcmVkdWNlZEJvYXJkID0gYm9hcmQucmVkdWNlKChhLCBiKSA9PiBhLmNvbmNhdChiKSk7XG4vLyAgIHJldHVybiByZWR1Y2VkQm9hcmRbbnVtXTtcbi8vIH1cbiIsImltcG9ydCB7IEdhbWVib2FyZCB9IGZyb20gJy4vZ2FtZWJvYXJkJztcbmV4cG9ydCB7IFBsYXllciB9O1xuXG5mdW5jdGlvbiBQbGF5ZXIobmFtZSkge1xuICBsZXQgdHVybiA9IGZhbHNlO1xuICBjb25zdCBnYW1lYm9hcmQgPSBHYW1lYm9hcmQoKTtcblxuICBjb25zdCB0b2dnbGVUdXJuID0gKCkgPT4gIXR1cm4gPyB0dXJuID0gdHJ1ZSA6IHR1cm4gPSBmYWxzZTtcbiAgY29uc3QgZ2V0TmFtZSA9ICgpID0+IG5hbWU7XG5cbiAgY29uc3QgYXR0YWNrID0gKGVuZW15Qm9hcmQpID0+IHtcbiAgICBpZiAodHVybikge1xuICAgICAgbGV0IHJhbmRvbUNvb3JkaW5hdGUgPSBbcmFuZG9tTnVtKCksIHJhbmRvbU51bSgpXTtcbiAgICAgIGVuZW15Qm9hcmQucmVjZWl2ZUF0dGFjayguLi5yYW5kb21Db29yZGluYXRlKTtcbiAgICAgIHRoaXMudG9nZ2xlVHVybigpO1xuICAgIH1cbiAgfTtcblxuICBmdW5jdGlvbiByYW5kb21OdW0oKSB7XG4gICAgcmV0dXJuIE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqICgwIC0gMTApICsgMTApO1xuICB9XG5cbiAgcmV0dXJuIHsgZ2FtZWJvYXJkLCBhdHRhY2ssIHRvZ2dsZVR1cm4sIGdldE5hbWUgfTtcbn0iLCJleHBvcnQgeyBTaGlwIH07XG5cbmZ1bmN0aW9uIFNoaXAodHlwZSwgbGVuZ3RoKSB7XG4gIGNvbnN0IGdldExlbmd0aCA9ICgpID0+IGxlbmd0aDtcbiAgbGV0IHNoaXBTdGF0dXMgPSB7IGhlYWx0aDogbGVuZ3RoLCB0eXBlIH07XG5cbiAgZnVuY3Rpb24gZ2V0SGl0UG9zaXRpb25zKGJvYXJkKSB7XG4gICAgY29uc3QgcGxvdHMgPSBib2FyZFxuICAgICAgLnJlZHVjZSgoYSwgYikgPT4gYS5jb25jYXQoYikpXG4gICAgICAuZmlsdGVyKFxuICAgICAgICAoY29vcmRpbmF0ZSkgPT4gY29vcmRpbmF0ZS5pc0hpdCA9PT0gdHJ1ZSAmJiBjb29yZGluYXRlLnNoaXAgPT09IHRoaXNcbiAgICAgICk7XG4gICAgcmV0dXJuIHBsb3RzO1xuICB9XG5cbiAgY29uc3QgaGl0ID0gKHBsb3QpID0+IHtcbiAgICBwbG90LmlzSGl0ID0gdHJ1ZTtcbiAgICBzaGlwU3RhdHVzLmhlYWx0aCAtPSAxO1xuICB9O1xuXG4gIGZ1bmN0aW9uIGlzU3Vuayhib2FyZCkge1xuICAgIGxldCBudW1PZkhpdFBvc2l0aW9ucyA9IHRoaXMuZ2V0SGl0UG9zaXRpb25zKGJvYXJkKS5sZW5ndGg7XG4gICAgaWYgKHNoaXBTdGF0dXMuaGVhbHRoID09PSAwICYmIG51bU9mSGl0UG9zaXRpb25zID09PSBnZXRMZW5ndGgoKSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4geyBnZXRIaXRQb3NpdGlvbnMsIGhpdCwgaXNTdW5rLCBzaGlwU3RhdHVzLCBnZXRMZW5ndGggfTtcbn0iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcImJvZHkge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzVlYWFiMTtcXG59XFxuXFxuaGVhZGVyIHtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG59XFxuXFxuLmdhbWVib2FyZHMtY29udGFpbmVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcXG59XFxuXFxuLmJ1dHRvbi1yZXNldCB7XFxuICBkaXNwbGF5OiBub25lO1xcbn1cXG5cXG4uZ2FtZWJvYXJkcy1jb250YWluZXIge1xcbiAgb3BhY2l0eTogMDtcXG4gIHRyYW5zaXRpb246IDAuMnMgZWFzZS1pbi1vdXQ7XFxufVxcblxcbi5nYW1lYm9hcmQtZ3JpZCB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTAsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMCwgMWZyKTtcXG59XFxuXFxuLmdhbWVib2FyZC1ncmlkLWl0ZW06aG92ZXIge1xcbiAgYm9yZGVyOiAxcHggc29saWQgd2hpdGU7XFxufVxcblxcbi5nYW1lYm9hcmQtZ3JpZC1pdGVtIHtcXG4gIGhlaWdodDogNDBweDtcXG4gIHdpZHRoOiA0MHB4O1xcbiAgYm9yZGVyOiAxcHggc29saWQgcmVkO1xcbn1cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGUuc2Nzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtFQUNFLHlCQUFBO0FBQ0Y7O0FBRUE7RUFDRSxrQkFBQTtBQUNGOztBQUVBO0VBQ0UsYUFBQTtFQUNBLDZCQUFBO0FBQ0Y7O0FBRUE7RUFDRSxhQUFBO0FBQ0Y7O0FBRUE7RUFDRSxVQUFBO0VBQ0EsNEJBQUE7QUFDRjs7QUFFQTtFQUNFLGFBQUE7RUFDQSxtQ0FBQTtFQUNBLHNDQUFBO0FBQ0Y7O0FBRUE7RUFDRSx1QkFBQTtBQUNGOztBQUVBO0VBQ0UsWUFBQTtFQUNBLFdBQUE7RUFDQSxxQkFBQTtBQUNGXCIsXCJzb3VyY2VzQ29udGVudFwiOltcImJvZHkge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDk0LCAxNzAsIDE3Nyk7XFxufVxcblxcbmhlYWRlciB7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxufVxcblxcbi5nYW1lYm9hcmRzLWNvbnRhaW5lciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XFxufVxcblxcbi5idXR0b24tcmVzZXQge1xcbiAgZGlzcGxheTogbm9uZTtcXG59XFxuXFxuLmdhbWVib2FyZHMtY29udGFpbmVyIHtcXG4gIG9wYWNpdHk6IDA7XFxuICB0cmFuc2l0aW9uOiAwLjJzIGVhc2UtaW4tb3V0O1xcbn1cXG5cXG4uZ2FtZWJvYXJkLWdyaWQge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDEwLCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTAsIDFmcik7XFxufVxcblxcbi5nYW1lYm9hcmQtZ3JpZC1pdGVtOmhvdmVyIHtcXG4gIGJvcmRlcjogMXB4IHNvbGlkIHdoaXRlO1xcbn1cXG5cXG4uZ2FtZWJvYXJkLWdyaWQtaXRlbSB7XFxuICBoZWlnaHQ6IDQwcHg7XFxuICB3aWR0aDogNDBweDtcXG4gIGJvcmRlcjogMXB4IHNvbGlkIHJlZDtcXG59XCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdOyAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG5cbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuXG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuXG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG5cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTsgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcblxuXG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG5cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuXG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IHRoaXMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNbX2ldWzBdO1xuXG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yICh2YXIgX2kyID0gMDsgX2kyIDwgbW9kdWxlcy5sZW5ndGg7IF9pMisrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19pMl0pO1xuXG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuXG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG5cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHZhciBzb3VyY2VVUkxzID0gY3NzTWFwcGluZy5zb3VyY2VzLm1hcChmdW5jdGlvbiAoc291cmNlKSB7XG4gICAgICByZXR1cm4gXCIvKiMgc291cmNlVVJMPVwiLmNvbmNhdChjc3NNYXBwaW5nLnNvdXJjZVJvb3QgfHwgXCJcIikuY29uY2F0KHNvdXJjZSwgXCIgKi9cIik7XG4gICAgfSk7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoc291cmNlVVJMcykuY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuXG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5zY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuc2Nzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcblxuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG5cbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG5cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuXG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuXG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB1cGRhdGVyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuXG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcblxuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuXG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuXG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuXG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTsgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcblxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuXG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuXG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuXG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcblxuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG5cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuXG4gIGNzcyArPSBvYmouY3NzO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuXG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfSAvLyBGb3Igb2xkIElFXG5cbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuXG5cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG5cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0ICcuL3N0eWxlLnNjc3MnO1xuaW1wb3J0IHsgR2FtZWJvYXJkIH0gZnJvbSAnLi9nYW1lYm9hcmQnO1xuaW1wb3J0IHsgUGxheWVyIH0gZnJvbSAnLi9wbGF5ZXInO1xuaW1wb3J0IHsgU2hpcCB9IGZyb20gJy4vc2hpcCc7XG5cbmZ1bmN0aW9uIEdhbWUoKSB7XG4gIGZ1bmN0aW9uIGluaXRpYWxpemUoKSB7XG4gICAgY29uc3Qgc3RhcnRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnV0dG9uLXN0YXJ0Jyk7XG4gICAgc3RhcnRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICBzdGFydEJ0bi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgZGlzcGxheUNvbnRlbnQoKTtcbiAgICAgIGNyZWF0ZUdhbWVib2FyZCgpO1xuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIHsgaW5pdGlhbGl6ZSB9O1xufVxuXG5mdW5jdGlvbiBjcmVhdGVHYW1lYm9hcmQoKSB7XG4gIGNvbnN0IGdhbWVib2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5nYW1lYm9hcmQtZ3JpZCcpO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IDEwMDsgaSsrKSB7XG4gICAgY29uc3QgcGxvdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHBsb3QuY2xhc3NMaXN0LmFkZCgnZ2FtZWJvYXJkLWdyaWQtaXRlbScpO1xuICAgIGdhbWVib2FyZFswXS5hcHBlbmRDaGlsZChwbG90KTtcbiAgfVxuICBmb3IgKGxldCBpID0gMDsgaSA8IDEwMDsgaSsrKSB7XG4gICAgY29uc3QgcGxvdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIHBsb3QuY2xhc3NMaXN0LmFkZCgnZ2FtZWJvYXJkLWdyaWQtaXRlbScpO1xuICAgIGdhbWVib2FyZFsxXS5hcHBlbmRDaGlsZChwbG90KTtcbiAgfVxufVxuXG5mdW5jdGlvbiBkaXNwbGF5Q29udGVudCgpIHtcbiAgY29uc3QgcmVzZXRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnV0dG9uLXJlc2V0Jyk7XG4gIGNvbnN0IGdhbWVib2FyZHNDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ2FtZWJvYXJkcy1jb250YWluZXInKTtcbiAgcmVzZXRCdG4uc3R5bGUuZGlzcGxheSA9ICdpbmxpbmUtYmxvY2snO1xuICBnYW1lYm9hcmRzQ29udGFpbmVyLnN0eWxlLm9wYWNpdHkgPSAxO1xufVxuXG5HYW1lKCkuaW5pdGlhbGl6ZSgpO1xuIl0sIm5hbWVzIjpbIlNoaXAiLCJHYW1lYm9hcmQiLCJjYXJyaWVyIiwiYmF0dGxlc2hpcCIsImNydWlzZXIiLCJkZXN0cm95ZXIxIiwiZGVzdHJveWVyMiIsInN1Ym1hcmluZTEiLCJzdWJtYXJpbmUyIiwiYm9hcmQiLCJpIiwiaiIsImNvb3JkaW5hdGUiLCJzaGlwIiwiaXNIaXQiLCJpc01pc3MiLCJwbGFjZVNoaXBzIiwiZ2V0TGVuZ3RoIiwicmVjZWl2ZUF0dGFjayIsInJvdyIsImNvbHVtbiIsInBsb3QiLCJoaXQiLCJpc0dhbWVPdmVyIiwiaXNTdW5rIiwiUGxheWVyIiwibmFtZSIsInR1cm4iLCJnYW1lYm9hcmQiLCJ0b2dnbGVUdXJuIiwiZ2V0TmFtZSIsImF0dGFjayIsImVuZW15Qm9hcmQiLCJyYW5kb21Db29yZGluYXRlIiwicmFuZG9tTnVtIiwiTWF0aCIsInJvdW5kIiwicmFuZG9tIiwidHlwZSIsImxlbmd0aCIsInNoaXBTdGF0dXMiLCJoZWFsdGgiLCJnZXRIaXRQb3NpdGlvbnMiLCJwbG90cyIsInJlZHVjZSIsImEiLCJiIiwiY29uY2F0IiwiZmlsdGVyIiwibnVtT2ZIaXRQb3NpdGlvbnMiLCJHYW1lIiwiaW5pdGlhbGl6ZSIsInN0YXJ0QnRuIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiYWRkRXZlbnRMaXN0ZW5lciIsInN0eWxlIiwiZGlzcGxheSIsImRpc3BsYXlDb250ZW50IiwiY3JlYXRlR2FtZWJvYXJkIiwicXVlcnlTZWxlY3RvckFsbCIsImNyZWF0ZUVsZW1lbnQiLCJjbGFzc0xpc3QiLCJhZGQiLCJhcHBlbmRDaGlsZCIsInJlc2V0QnRuIiwiZ2FtZWJvYXJkc0NvbnRhaW5lciIsIm9wYWNpdHkiXSwic291cmNlUm9vdCI6IiJ9