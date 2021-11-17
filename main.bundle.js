/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/dom.js":
/*!********************!*\
  !*** ./src/dom.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Controller": () => (/* binding */ Controller)
/* harmony export */ });
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }



function Controller() {
  var gameboards = document.querySelectorAll('.gameboard-grid');

  var playerUIBoard = _toConsumableArray(gameboards[0].children);

  function createUIGameboards() {
    var gameboard = document.querySelectorAll('.gameboard-grid');

    for (var i = 0; i < 10; i++) {
      for (var j = 0; j < 10; j++) {
        var plot1 = document.createElement('div');
        var plot2 = document.createElement('div');
        plot2.classList.add('gameboard-grid-item', 'droppable');
        plot1.classList.add('gameboard-grid-item', 'droppable');
        plot1.dataset.x = i;
        plot1.dataset.y = j;
        plot2.dataset.x = i;
        plot2.dataset.y = j;
        gameboard[0].appendChild(plot1);
        gameboard[1].appendChild(plot2);
      }
    }
  }

  function displayUIHeader() {
    var resetBtn = document.querySelector('.button-reset');
    var gameboardsContainer = document.querySelector('.gameboards-container');
    resetBtn.style.display = 'inline-block';
    gameboardsContainer.style.opacity = 1;
  }

  function displayShips(coordinate) {
    playerUIBoard[parseInt(coordinate.join(''))].style.background = 'black';
  }

  function showHitMarker(element) {
    element.style.background = 'lime';
  }

  function showMissMarker(element) {
    element.style.background = 'red';
  }

  return {
    createUIGameboards: createUIGameboards,
    displayUIHeader: displayUIHeader,
    showHitMarker: showHitMarker,
    showMissMarker: showMissMarker,
    displayShips: displayShips
  };
}

/***/ }),

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
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom */ "./src/dom.js");




function Gameboard() {
  var carrier = (0,_ship__WEBPACK_IMPORTED_MODULE_0__.Ship)('carrier', 5);
  var battleship = (0,_ship__WEBPACK_IMPORTED_MODULE_0__.Ship)('battleship', 4);
  var cruiser = (0,_ship__WEBPACK_IMPORTED_MODULE_0__.Ship)('cruiser', 3);
  var destroyer1 = (0,_ship__WEBPACK_IMPORTED_MODULE_0__.Ship)('destroyer1', 2);
  var destroyer2 = (0,_ship__WEBPACK_IMPORTED_MODULE_0__.Ship)('destroyer2', 2);
  var submarine1 = (0,_ship__WEBPACK_IMPORTED_MODULE_0__.Ship)('submarine1', 1);
  var submarine2 = (0,_ship__WEBPACK_IMPORTED_MODULE_0__.Ship)('submarine2', 1);
  var ships = [carrier, battleship, cruiser, destroyer1, destroyer2, submarine1, submarine2];
  var board = [[], [], [], [], [], [], [], [], [], []];

  function initializeCells() {
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
  }

  function placeShip(ship) {
    var direction = ['v', 'h'][Math.floor(Math.random() * 2)];
    var max_col = 10;
    var max_row = 10;
    if (direction === 'v') max_row -= ship.getLength() - 1;
    if (direction === 'h') max_col -= ship.getLength() - 1;
    if (max_row < 1 || max_col < 1) return false;
    var corner = [Math.floor(Math.random() * max_col), Math.floor(Math.random() * max_row)];

    if (ship.canFit(board, direction, corner)) {
      ship.insert(board, direction, corner);
      return true;
    } else {
      return false;
    }
  }

  function placeShips() {
    for (var attempt = 0; attempt < 1000000; attempt++) {
      initializeCells();
      var attemptSuccessful = true;

      for (var i = 0; i < ships.length; i++) {
        if (!placeShip(ships[i])) {
          attemptSuccessful = false;
          break;
        }
      }

      if (attemptSuccessful) {
        console.log(this.board);
        return;
      }
    }

    console.log('failed');
  }

  function displayShip() {
    var controller = (0,_dom__WEBPACK_IMPORTED_MODULE_1__.Controller)();

    for (var i = 0; i < ships.length; i++) {
      for (var j = 0; j < ships[i].shipCoordinates.length; j++) {
        controller.displayShips(ships[i].shipCoordinates[j]);
      }
    }
  }

  function receiveAttack(row, column) {
    var plot = this.board[row][column];

    if (plot.ship !== null && plot.isHit === false && plot.isMiss === false) {
      plot.ship.hit();
      plot.isHit = true;
      console.log('hit!', row, column);
      return true;
    } else if (plot.ship === null && plot.isHit === false && plot.isMiss === false) {
      plot.isMiss = true;
      console.log('miss!', row, column);
      return true;
    } else if (plot.isHit === true || plot.isMiss === true) {
      console.log('plot has already been hit', row, column);
      return false;
    }
  }

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
    isGameOver: isGameOver,
    displayShip: displayShip
  };
}

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


function Player(name) {
  var turn = false;

  function toggleTurn() {
    this.turn ? this.turn = false : this.turn = true;
  }

  function attack(enemyBoard, row, column) {
    if (this.turn && name === 'player') {
      if (enemyBoard.receiveAttack(row, column)) {
        this.toggleTurn();
      }
    } else if (this.turn && name === 'computer') {
      var randomCoordinates = [randomNum(), randomNum()];

      if (enemyBoard.receiveAttack.apply(enemyBoard, randomCoordinates)) {
        this.toggleTurn();
        return randomCoordinates;
      } else {
        return this.attack(enemyBoard);
      }
    }
  }

  function randomNum() {
    return Math.round(Math.random() * (0 - 9) + 9);
  }

  return {
    attack: attack,
    turn: turn,
    toggleTurn: toggleTurn
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
  var hitPositions = [];
  var shipCoordinates = [];

  function getHitPositions(board) {
    var _this = this;

    var plots = board.reduce(function (a, b) {
      return a.concat(b);
    }).filter(function (coordinate) {
      return coordinate.isHit === true && coordinate.ship === _this;
    });
    return plots;
  }

  var hit = function hit(position) {
    hitPositions.push(position);
    shipStatus.health -= 1;
  };

  function isSunk() {
    // let numOfHitPositions = this.getHitPositions(board).length;
    if (shipStatus.health === 0 && hitPositions.length === getLength()) {
      return true;
    } else {
      return false;
    }
  }

  function cells(board, direction, corner) {
    var cellList = [];

    if (direction === 'h') {
      for (var i = 0; i < getLength(); i++) {
        cellList[i] = board[corner[0] + i][corner[1]];
      }
    }

    if (direction === 'v') {
      for (var _i = 0; _i < getLength(); _i++) {
        cellList[_i] = board[corner[0]][corner[1] + _i];
      }
    }

    return cellList;
  }

  function canFit(board, direction, corner) {
    var cellList = cells(board, direction, corner);

    for (var i = 0; i < getLength(); i++) {
      if (cellList[i].ship) return false;
    }

    return true;
  }

  function insert(board, direction, corner) {
    var cellList = cells(board, direction, corner);
    var coordinate = [];

    for (var i = 0; i < getLength(); i++) {
      coordinate.push(cellList[i].coordinate);
      cellList[i].ship = this;
    }

    this.shipCoordinates = [].concat(coordinate);
  }

  return {
    getHitPositions: getHitPositions,
    hit: hit,
    isSunk: isSunk,
    shipStatus: shipStatus,
    shipCoordinates: shipCoordinates,
    getLength: getLength,
    canFit: canFit,
    insert: insert
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
___CSS_LOADER_EXPORT___.push([module.id, "body {\n  background-color: #5eaab1;\n}\n\nheader {\n  text-align: center;\n}\n\n.gameboards-container {\n  margin-top: 50px;\n  display: flex;\n  justify-content: space-around;\n  flex-wrap: wrap;\n  opacity: 0;\n  transition: 0.2s ease-in-out;\n}\n\n.button-reset {\n  display: none;\n}\n\n.gameboard-container {\n  padding: 30px;\n}\n\n.gameboard-grid {\n  display: grid;\n  grid-template-rows: repeat(10, 1fr);\n  grid-template-columns: repeat(10, 1fr);\n}\n\n.gameboard-grid-item:hover {\n  border: 1px solid white;\n}\n\n.gameboard-grid-item {\n  height: 40px;\n  width: 40px;\n  border: 1px solid red;\n}", "",{"version":3,"sources":["webpack://./src/style.scss"],"names":[],"mappings":"AAAA;EACE,yBAAA;AACF;;AAEA;EACE,kBAAA;AACF;;AAEA;EACE,gBAAA;EACA,aAAA;EACA,6BAAA;EACA,eAAA;EAEA,UAAA;EACA,4BAAA;AAAF;;AAGA;EACE,aAAA;AAAF;;AAGA;EACE,aAAA;AAAF;;AAGA;EACE,aAAA;EACA,mCAAA;EACA,sCAAA;AAAF;;AAGA;EACE,uBAAA;AAAF;;AAGA;EACE,YAAA;EACA,WAAA;EACA,qBAAA;AAAF","sourcesContent":["body {\n  background-color: rgb(94, 170, 177);\n}\n\nheader {\n  text-align: center;\n}\n\n.gameboards-container {\n  margin-top: 50px;\n  display: flex;\n  justify-content: space-around;\n  flex-wrap: wrap;\n\n  opacity: 0;\n  transition: 0.2s ease-in-out;\n}\n\n.button-reset {\n  display: none;\n}\n\n.gameboard-container {\n  padding: 30px;\n}\n\n.gameboard-grid {\n  display: grid;\n  grid-template-rows: repeat(10, 1fr);\n  grid-template-columns: repeat(10, 1fr);\n}\n\n.gameboard-grid-item:hover {\n  border: 1px solid white;\n}\n\n.gameboard-grid-item {\n  height: 40px;\n  width: 40px;\n  border: 1px solid red;\n}"],"sourceRoot":""}]);
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
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dom */ "./src/dom.js");
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }






function Game() {
  var controller = (0,_dom__WEBPACK_IMPORTED_MODULE_3__.Controller)();

  function initialize() {
    var startBtn = document.querySelector('.button-start');
    startBtn.addEventListener('click', function () {
      startBtn.style.display = 'none';
      controller.displayUIHeader();
      controller.createUIGameboards();
      startGame();
    });
  }

  function startGame() {
    var gameboards = document.querySelectorAll('.gameboard-grid');
    var player = (0,_player__WEBPACK_IMPORTED_MODULE_2__.Player)('player');
    var computer = (0,_player__WEBPACK_IMPORTED_MODULE_2__.Player)('computer');

    var playerUIBoard = _toConsumableArray(gameboards[0].children);

    var computerUIBoard = _toConsumableArray(gameboards[1].children);

    var playerGameboard = (0,_gameboard__WEBPACK_IMPORTED_MODULE_1__.Gameboard)(gameboards[0].children);
    var computerGameboard = (0,_gameboard__WEBPACK_IMPORTED_MODULE_1__.Gameboard)(gameboards[1].children);
    playerGameboard.placeShips();
    playerGameboard.displayShip();
    computerGameboard.placeShips();
    player.toggleTurn();
    computerUIBoard.forEach(function (plot) {
      plot.addEventListener('click', function () {
        var row = parseInt(plot.dataset.x);
        var col = parseInt(plot.dataset.y);

        if (player.turn && !isGameOver(playerGameboard, computerGameboard)) {
          if (computerGameboard.board[row][col].isMiss === false && computerGameboard.board[row][col].isHit === false) {
            player.attack(computerGameboard, row, col);

            if (computerGameboard.board[row][col].isHit) {
              controller.showHitMarker(plot);
            } else if (computerGameboard.board[row][col].isMiss) {
              controller.showMissMarker(plot);
            }

            computerPlay(computer, playerGameboard, playerUIBoard);
            player.toggleTurn();
          } else {
            console.log('try again!');
          }
        }
      });
    });
  }

  function computerPlay(computer, enemyBoard, enemyUIBoard) {
    computer.toggleTurn();
    var coordinates = computer.attack(enemyBoard);

    if (enemyBoard.board[coordinates[0]][coordinates[1]].isHit) {
      controller.showHitMarker(enemyUIBoard[parseInt(coordinates.join(''))]);
    } else if (enemyBoard.board[coordinates[0]][coordinates[1]].isMiss) {
      controller.showMissMarker(enemyUIBoard[parseInt(coordinates.join(''))]);
    }
  }

  function isGameOver(playersBoard, computersBoard) {
    if (playersBoard.isGameOver()) {
      return true;
    } else if (computersBoard.isGameOver()) {
      return true;
    } else {
      return false;
    }
  }

  return {
    initialize: initialize
  };
}

Game().initialize();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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UDtBQUNELEtBRkQsTUFFTyxJQUFJMEMsY0FBYyxDQUFDMUMsVUFBZixFQUFKLEVBQWlDO0FBQ3RDLGFBQU8sSUFBUDtBQUNELEtBRk0sTUFFQTtBQUNMLGFBQU8sS0FBUDtBQUNEO0FBQ0Y7O0FBRUQsU0FBTztBQUFFMkIsSUFBQUEsVUFBVSxFQUFWQTtBQUFGLEdBQVA7QUFDRDs7QUFFREQsSUFBSSxHQUFHQyxVQUFQLEciLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2RvbS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3BsYXllci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zdHlsZS5zY3NzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3N0eWxlLnNjc3M/NzViYSIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IHsgQ29udHJvbGxlciB9O1xuXG5mdW5jdGlvbiBDb250cm9sbGVyKCkge1xuICBjb25zdCBnYW1lYm9hcmRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmdhbWVib2FyZC1ncmlkJyk7XG4gIGNvbnN0IHBsYXllclVJQm9hcmQgPSBbLi4uZ2FtZWJvYXJkc1swXS5jaGlsZHJlbl07XG5cbiAgZnVuY3Rpb24gY3JlYXRlVUlHYW1lYm9hcmRzKCkge1xuICAgIGNvbnN0IGdhbWVib2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5nYW1lYm9hcmQtZ3JpZCcpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgMTA7IGkrKykge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCAxMDsgaisrKSB7XG4gICAgICAgIGNvbnN0IHBsb3QxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGNvbnN0IHBsb3QyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHBsb3QyLmNsYXNzTGlzdC5hZGQoJ2dhbWVib2FyZC1ncmlkLWl0ZW0nLCAnZHJvcHBhYmxlJyk7XG4gICAgICAgIHBsb3QxLmNsYXNzTGlzdC5hZGQoJ2dhbWVib2FyZC1ncmlkLWl0ZW0nLCAnZHJvcHBhYmxlJyk7XG4gICAgICAgIHBsb3QxLmRhdGFzZXQueCA9IGk7XG4gICAgICAgIHBsb3QxLmRhdGFzZXQueSA9IGo7XG4gICAgICAgIHBsb3QyLmRhdGFzZXQueCA9IGk7XG4gICAgICAgIHBsb3QyLmRhdGFzZXQueSA9IGo7XG4gICAgICAgIGdhbWVib2FyZFswXS5hcHBlbmRDaGlsZChwbG90MSk7XG4gICAgICAgIGdhbWVib2FyZFsxXS5hcHBlbmRDaGlsZChwbG90Mik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZGlzcGxheVVJSGVhZGVyKCkge1xuICAgIGNvbnN0IHJlc2V0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ1dHRvbi1yZXNldCcpO1xuICAgIGNvbnN0IGdhbWVib2FyZHNDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZ2FtZWJvYXJkcy1jb250YWluZXInKTtcbiAgICByZXNldEJ0bi5zdHlsZS5kaXNwbGF5ID0gJ2lubGluZS1ibG9jayc7XG4gICAgZ2FtZWJvYXJkc0NvbnRhaW5lci5zdHlsZS5vcGFjaXR5ID0gMTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRpc3BsYXlTaGlwcyhjb29yZGluYXRlKSB7XG4gICAgcGxheWVyVUlCb2FyZFtwYXJzZUludChjb29yZGluYXRlLmpvaW4oJycpKV0uc3R5bGUuYmFja2dyb3VuZCA9ICdibGFjayc7XG4gIH1cblxuICBmdW5jdGlvbiBzaG93SGl0TWFya2VyKGVsZW1lbnQpIHtcbiAgICBlbGVtZW50LnN0eWxlLmJhY2tncm91bmQgPSAnbGltZSc7XG4gIH1cblxuICBmdW5jdGlvbiBzaG93TWlzc01hcmtlcihlbGVtZW50KSB7XG4gICAgZWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kID0gJ3JlZCc7XG4gIH1cbiAgXG4gIHJldHVybiB7IGNyZWF0ZVVJR2FtZWJvYXJkcywgZGlzcGxheVVJSGVhZGVyLCBzaG93SGl0TWFya2VyLCBzaG93TWlzc01hcmtlciwgZGlzcGxheVNoaXBzIH07XG59IiwiaW1wb3J0IHsgU2hpcCB9IGZyb20gJy4vc2hpcCc7XG5pbXBvcnQgeyBDb250cm9sbGVyIH0gZnJvbSAnLi9kb20nO1xuZXhwb3J0IHsgR2FtZWJvYXJkIH07XG5cbmZ1bmN0aW9uIEdhbWVib2FyZCgpIHtcbiAgY29uc3QgY2FycmllciA9IFNoaXAoJ2NhcnJpZXInLCA1KTtcbiAgY29uc3QgYmF0dGxlc2hpcCA9IFNoaXAoJ2JhdHRsZXNoaXAnLCA0KTtcbiAgY29uc3QgY3J1aXNlciA9IFNoaXAoJ2NydWlzZXInLCAzKTtcbiAgY29uc3QgZGVzdHJveWVyMSA9IFNoaXAoJ2Rlc3Ryb3llcjEnLCAyKTtcbiAgY29uc3QgZGVzdHJveWVyMiA9IFNoaXAoJ2Rlc3Ryb3llcjInLCAyKTtcbiAgY29uc3Qgc3VibWFyaW5lMSA9IFNoaXAoJ3N1Ym1hcmluZTEnLCAxKTtcbiAgY29uc3Qgc3VibWFyaW5lMiA9IFNoaXAoJ3N1Ym1hcmluZTInLCAxKTtcbiAgY29uc3Qgc2hpcHMgPSBbXG4gICAgY2FycmllcixcbiAgICBiYXR0bGVzaGlwLFxuICAgIGNydWlzZXIsXG4gICAgZGVzdHJveWVyMSxcbiAgICBkZXN0cm95ZXIyLFxuICAgIHN1Ym1hcmluZTEsXG4gICAgc3VibWFyaW5lMixcbiAgXTtcbiAgbGV0IGJvYXJkID0gW1tdLCBbXSwgW10sIFtdLCBbXSwgW10sIFtdLCBbXSwgW10sIFtdXTtcblxuICBmdW5jdGlvbiBpbml0aWFsaXplQ2VsbHMoKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqKyspIHtcbiAgICAgICAgYm9hcmRbaV1bal0gPSB7XG4gICAgICAgICAgY29vcmRpbmF0ZTogW2ksIGpdLFxuICAgICAgICAgIHNoaXA6IG51bGwsXG4gICAgICAgICAgaXNIaXQ6IGZhbHNlLFxuICAgICAgICAgIGlzTWlzczogZmFsc2UsXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcGxhY2VTaGlwKHNoaXApIHtcbiAgICBsZXQgZGlyZWN0aW9uID0gWyd2JywgJ2gnXVtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyKV07XG4gICAgbGV0IG1heF9jb2wgPSAxMDtcbiAgICBsZXQgbWF4X3JvdyA9IDEwO1xuICAgIGlmIChkaXJlY3Rpb24gPT09ICd2JykgbWF4X3JvdyAtPSBzaGlwLmdldExlbmd0aCgpIC0gMTtcbiAgICBpZiAoZGlyZWN0aW9uID09PSAnaCcpIG1heF9jb2wgLT0gc2hpcC5nZXRMZW5ndGgoKSAtIDE7XG4gICAgaWYgKG1heF9yb3cgPCAxIHx8IG1heF9jb2wgPCAxKSByZXR1cm4gZmFsc2U7XG4gICAgbGV0IGNvcm5lciA9IFtcbiAgICAgIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIG1heF9jb2wpLFxuICAgICAgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogbWF4X3JvdyksXG4gICAgXTtcbiAgICBpZiAoc2hpcC5jYW5GaXQoYm9hcmQsIGRpcmVjdGlvbiwgY29ybmVyKSkge1xuICAgICAgc2hpcC5pbnNlcnQoYm9hcmQsIGRpcmVjdGlvbiwgY29ybmVyKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcGxhY2VTaGlwcygpIHtcbiAgICBmb3IgKGxldCBhdHRlbXB0ID0gMDsgYXR0ZW1wdCA8IDEwMDAwMDA7IGF0dGVtcHQrKykge1xuICAgICAgaW5pdGlhbGl6ZUNlbGxzKCk7XG4gICAgICBsZXQgYXR0ZW1wdFN1Y2Nlc3NmdWwgPSB0cnVlO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoIXBsYWNlU2hpcChzaGlwc1tpXSkpIHtcbiAgICAgICAgICBhdHRlbXB0U3VjY2Vzc2Z1bCA9IGZhbHNlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoYXR0ZW1wdFN1Y2Nlc3NmdWwpIHtcbiAgICAgICAgY29uc29sZS5sb2codGhpcy5ib2FyZCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG4gICAgY29uc29sZS5sb2coJ2ZhaWxlZCcpO1xuICB9XG5cbiAgZnVuY3Rpb24gZGlzcGxheVNoaXAoKSB7XG4gICAgY29uc3QgY29udHJvbGxlciA9IENvbnRyb2xsZXIoKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHNoaXBzW2ldLnNoaXBDb29yZGluYXRlcy5sZW5ndGg7IGorKykge1xuICAgICAgICBjb250cm9sbGVyLmRpc3BsYXlTaGlwcyhzaGlwc1tpXS5zaGlwQ29vcmRpbmF0ZXNbal0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJlY2VpdmVBdHRhY2socm93LCBjb2x1bW4pIHtcbiAgICBsZXQgcGxvdCA9IHRoaXMuYm9hcmRbcm93XVtjb2x1bW5dO1xuICAgIGlmIChwbG90LnNoaXAgIT09IG51bGwgJiYgcGxvdC5pc0hpdCA9PT0gZmFsc2UgJiYgcGxvdC5pc01pc3MgPT09IGZhbHNlKSB7XG4gICAgICBwbG90LnNoaXAuaGl0KCk7XG4gICAgICBwbG90LmlzSGl0ID0gdHJ1ZTtcbiAgICAgIGNvbnNvbGUubG9nKCdoaXQhJywgcm93LCBjb2x1bW4pO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIGlmIChcbiAgICAgIHBsb3Quc2hpcCA9PT0gbnVsbCAmJlxuICAgICAgcGxvdC5pc0hpdCA9PT0gZmFsc2UgJiZcbiAgICAgIHBsb3QuaXNNaXNzID09PSBmYWxzZVxuICAgICkge1xuICAgICAgcGxvdC5pc01pc3MgPSB0cnVlO1xuICAgICAgY29uc29sZS5sb2coJ21pc3MhJywgcm93LCBjb2x1bW4pO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIGlmIChwbG90LmlzSGl0ID09PSB0cnVlIHx8IHBsb3QuaXNNaXNzID09PSB0cnVlKSB7XG4gICAgICBjb25zb2xlLmxvZygncGxvdCBoYXMgYWxyZWFkeSBiZWVuIGhpdCcsIHJvdywgY29sdW1uKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBjb25zdCBpc0dhbWVPdmVyID0gKCkgPT4ge1xuICAgIGlmIChcbiAgICAgIGNhcnJpZXIuaXNTdW5rKGJvYXJkKSAmJlxuICAgICAgYmF0dGxlc2hpcC5pc1N1bmsoYm9hcmQpICYmXG4gICAgICBjcnVpc2VyLmlzU3Vuayhib2FyZCkgJiZcbiAgICAgIGRlc3Ryb3llcjEuaXNTdW5rKGJvYXJkKSAmJlxuICAgICAgZGVzdHJveWVyMi5pc1N1bmsoYm9hcmQpICYmXG4gICAgICBzdWJtYXJpbmUxLmlzU3Vuayhib2FyZCkgJiZcbiAgICAgIHN1Ym1hcmluZTIuaXNTdW5rKGJvYXJkKVxuICAgICkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIHsgYm9hcmQsIHBsYWNlU2hpcHMsIHJlY2VpdmVBdHRhY2ssIGlzR2FtZU92ZXIsIGRpc3BsYXlTaGlwIH07XG59XG4iLCJleHBvcnQgeyBQbGF5ZXIgfTtcblxuZnVuY3Rpb24gUGxheWVyKG5hbWUpIHtcbiAgbGV0IHR1cm4gPSBmYWxzZTtcblxuICBmdW5jdGlvbiB0b2dnbGVUdXJuKCkge1xuICAgIHRoaXMudHVybiA/ICh0aGlzLnR1cm4gPSBmYWxzZSkgOiAodGhpcy50dXJuID0gdHJ1ZSk7XG4gIH1cblxuICBmdW5jdGlvbiBhdHRhY2soZW5lbXlCb2FyZCwgcm93LCBjb2x1bW4pIHtcbiAgICBpZiAodGhpcy50dXJuICYmIG5hbWUgPT09ICdwbGF5ZXInKSB7XG4gICAgICBpZiAoZW5lbXlCb2FyZC5yZWNlaXZlQXR0YWNrKHJvdywgY29sdW1uKSkge1xuICAgICAgICB0aGlzLnRvZ2dsZVR1cm4oKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHRoaXMudHVybiAmJiBuYW1lID09PSAnY29tcHV0ZXInKSB7XG4gICAgICBsZXQgcmFuZG9tQ29vcmRpbmF0ZXMgPSBbcmFuZG9tTnVtKCksIHJhbmRvbU51bSgpXTtcbiAgICAgIGlmIChlbmVteUJvYXJkLnJlY2VpdmVBdHRhY2soLi4ucmFuZG9tQ29vcmRpbmF0ZXMpKSB7XG4gICAgICAgIHRoaXMudG9nZ2xlVHVybigpO1xuICAgICAgICByZXR1cm4gcmFuZG9tQ29vcmRpbmF0ZXM7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdGhpcy5hdHRhY2soZW5lbXlCb2FyZCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcmFuZG9tTnVtKCkge1xuICAgIHJldHVybiBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiAoMCAtIDkpICsgOSk7XG4gIH1cblxuICByZXR1cm4geyBhdHRhY2ssIHR1cm4sIHRvZ2dsZVR1cm4gfTtcbn1cbiIsImV4cG9ydCB7IFNoaXAgfTtcblxuZnVuY3Rpb24gU2hpcCh0eXBlLCBsZW5ndGgpIHtcbiAgY29uc3QgZ2V0TGVuZ3RoID0gKCkgPT4gbGVuZ3RoO1xuICBsZXQgc2hpcFN0YXR1cyA9IHsgaGVhbHRoOiBsZW5ndGgsIHR5cGUgfTtcbiAgbGV0IGhpdFBvc2l0aW9ucyA9IFtdO1xuICBsZXQgc2hpcENvb3JkaW5hdGVzID0gW107XG5cbiAgZnVuY3Rpb24gZ2V0SGl0UG9zaXRpb25zKGJvYXJkKSB7XG4gICAgY29uc3QgcGxvdHMgPSBib2FyZFxuICAgICAgLnJlZHVjZSgoYSwgYikgPT4gYS5jb25jYXQoYikpXG4gICAgICAuZmlsdGVyKFxuICAgICAgICAoY29vcmRpbmF0ZSkgPT4gY29vcmRpbmF0ZS5pc0hpdCA9PT0gdHJ1ZSAmJiBjb29yZGluYXRlLnNoaXAgPT09IHRoaXNcbiAgICAgICk7XG4gICAgcmV0dXJuIHBsb3RzO1xuICB9XG5cbiAgY29uc3QgaGl0ID0gKHBvc2l0aW9uKSA9PiB7XG4gICAgaGl0UG9zaXRpb25zLnB1c2gocG9zaXRpb24pO1xuICAgIHNoaXBTdGF0dXMuaGVhbHRoIC09IDE7XG4gIH07XG5cbiAgZnVuY3Rpb24gaXNTdW5rKCkge1xuICAgIC8vIGxldCBudW1PZkhpdFBvc2l0aW9ucyA9IHRoaXMuZ2V0SGl0UG9zaXRpb25zKGJvYXJkKS5sZW5ndGg7XG4gICAgaWYgKHNoaXBTdGF0dXMuaGVhbHRoID09PSAwICYmIGhpdFBvc2l0aW9ucy5sZW5ndGggPT09IGdldExlbmd0aCgpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGNlbGxzKGJvYXJkLCBkaXJlY3Rpb24sIGNvcm5lcikge1xuICAgIGxldCBjZWxsTGlzdCA9IFtdO1xuICAgIGlmIChkaXJlY3Rpb24gPT09ICdoJykge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBnZXRMZW5ndGgoKTsgaSsrKSB7XG4gICAgICAgIGNlbGxMaXN0W2ldID0gYm9hcmRbY29ybmVyWzBdICsgaV1bY29ybmVyWzFdXTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGRpcmVjdGlvbiA9PT0gJ3YnKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGdldExlbmd0aCgpOyBpKyspIHtcbiAgICAgICAgY2VsbExpc3RbaV0gPSBib2FyZFtjb3JuZXJbMF1dW2Nvcm5lclsxXSArIGldO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gY2VsbExpc3Q7XG4gIH1cblxuICBmdW5jdGlvbiBjYW5GaXQoYm9hcmQsIGRpcmVjdGlvbiwgY29ybmVyKSB7XG4gICAgbGV0IGNlbGxMaXN0ID0gY2VsbHMoYm9hcmQsIGRpcmVjdGlvbiwgY29ybmVyKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGdldExlbmd0aCgpOyBpKyspIHtcbiAgICAgIGlmIChjZWxsTGlzdFtpXS5zaGlwKSByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgZnVuY3Rpb24gaW5zZXJ0KGJvYXJkLCBkaXJlY3Rpb24sIGNvcm5lcikge1xuICAgIGxldCBjZWxsTGlzdCA9IGNlbGxzKGJvYXJkLCBkaXJlY3Rpb24sIGNvcm5lcik7XG4gICAgbGV0IGNvb3JkaW5hdGUgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGdldExlbmd0aCgpOyBpKyspIHtcbiAgICAgIGNvb3JkaW5hdGUucHVzaChjZWxsTGlzdFtpXS5jb29yZGluYXRlKTtcbiAgICAgIGNlbGxMaXN0W2ldLnNoaXAgPSB0aGlzO1xuICAgIH1cbiAgICB0aGlzLnNoaXBDb29yZGluYXRlcyA9IFsuLi5jb29yZGluYXRlXTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgZ2V0SGl0UG9zaXRpb25zLFxuICAgIGhpdCxcbiAgICBpc1N1bmssXG4gICAgc2hpcFN0YXR1cyxcbiAgICBzaGlwQ29vcmRpbmF0ZXMsXG4gICAgZ2V0TGVuZ3RoLFxuICAgIGNhbkZpdCxcbiAgICBpbnNlcnQsXG4gIH07XG59XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcImJvZHkge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzVlYWFiMTtcXG59XFxuXFxuaGVhZGVyIHtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG59XFxuXFxuLmdhbWVib2FyZHMtY29udGFpbmVyIHtcXG4gIG1hcmdpbi10b3A6IDUwcHg7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XFxuICBmbGV4LXdyYXA6IHdyYXA7XFxuICBvcGFjaXR5OiAwO1xcbiAgdHJhbnNpdGlvbjogMC4ycyBlYXNlLWluLW91dDtcXG59XFxuXFxuLmJ1dHRvbi1yZXNldCB7XFxuICBkaXNwbGF5OiBub25lO1xcbn1cXG5cXG4uZ2FtZWJvYXJkLWNvbnRhaW5lciB7XFxuICBwYWRkaW5nOiAzMHB4O1xcbn1cXG5cXG4uZ2FtZWJvYXJkLWdyaWQge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDEwLCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTAsIDFmcik7XFxufVxcblxcbi5nYW1lYm9hcmQtZ3JpZC1pdGVtOmhvdmVyIHtcXG4gIGJvcmRlcjogMXB4IHNvbGlkIHdoaXRlO1xcbn1cXG5cXG4uZ2FtZWJvYXJkLWdyaWQtaXRlbSB7XFxuICBoZWlnaHQ6IDQwcHg7XFxuICB3aWR0aDogNDBweDtcXG4gIGJvcmRlcjogMXB4IHNvbGlkIHJlZDtcXG59XCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlLnNjc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7RUFDRSx5QkFBQTtBQUNGOztBQUVBO0VBQ0Usa0JBQUE7QUFDRjs7QUFFQTtFQUNFLGdCQUFBO0VBQ0EsYUFBQTtFQUNBLDZCQUFBO0VBQ0EsZUFBQTtFQUVBLFVBQUE7RUFDQSw0QkFBQTtBQUFGOztBQUdBO0VBQ0UsYUFBQTtBQUFGOztBQUdBO0VBQ0UsYUFBQTtBQUFGOztBQUdBO0VBQ0UsYUFBQTtFQUNBLG1DQUFBO0VBQ0Esc0NBQUE7QUFBRjs7QUFHQTtFQUNFLHVCQUFBO0FBQUY7O0FBR0E7RUFDRSxZQUFBO0VBQ0EsV0FBQTtFQUNBLHFCQUFBO0FBQUZcIixcInNvdXJjZXNDb250ZW50XCI6W1wiYm9keSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2IoOTQsIDE3MCwgMTc3KTtcXG59XFxuXFxuaGVhZGVyIHtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG59XFxuXFxuLmdhbWVib2FyZHMtY29udGFpbmVyIHtcXG4gIG1hcmdpbi10b3A6IDUwcHg7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XFxuICBmbGV4LXdyYXA6IHdyYXA7XFxuXFxuICBvcGFjaXR5OiAwO1xcbiAgdHJhbnNpdGlvbjogMC4ycyBlYXNlLWluLW91dDtcXG59XFxuXFxuLmJ1dHRvbi1yZXNldCB7XFxuICBkaXNwbGF5OiBub25lO1xcbn1cXG5cXG4uZ2FtZWJvYXJkLWNvbnRhaW5lciB7XFxuICBwYWRkaW5nOiAzMHB4O1xcbn1cXG5cXG4uZ2FtZWJvYXJkLWdyaWQge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDEwLCAxZnIpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTAsIDFmcik7XFxufVxcblxcbi5nYW1lYm9hcmQtZ3JpZC1pdGVtOmhvdmVyIHtcXG4gIGJvcmRlcjogMXB4IHNvbGlkIHdoaXRlO1xcbn1cXG5cXG4uZ2FtZWJvYXJkLWdyaWQtaXRlbSB7XFxuICBoZWlnaHQ6IDQwcHg7XFxuICB3aWR0aDogNDBweDtcXG4gIGJvcmRlcjogMXB4IHNvbGlkIHJlZDtcXG59XCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdOyAvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG5cbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuXG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuXG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG5cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSkuam9pbihcIlwiKTtcbiAgfTsgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcblxuXG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG5cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuXG4gICAgaWYgKGRlZHVwZSkge1xuICAgICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IHRoaXMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgIHZhciBpZCA9IHRoaXNbX2ldWzBdO1xuXG4gICAgICAgIGlmIChpZCAhPSBudWxsKSB7XG4gICAgICAgICAgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpZF0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yICh2YXIgX2kyID0gMDsgX2kyIDwgbW9kdWxlcy5sZW5ndGg7IF9pMisrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19pMl0pO1xuXG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChtZWRpYSkge1xuICAgICAgICBpZiAoIWl0ZW1bMl0pIHtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG5cbiAgcmV0dXJuIGxpc3Q7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gIHZhciBjb250ZW50ID0gaXRlbVsxXTtcbiAgdmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuXG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG5cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHZhciBzb3VyY2VVUkxzID0gY3NzTWFwcGluZy5zb3VyY2VzLm1hcChmdW5jdGlvbiAoc291cmNlKSB7XG4gICAgICByZXR1cm4gXCIvKiMgc291cmNlVVJMPVwiLmNvbmNhdChjc3NNYXBwaW5nLnNvdXJjZVJvb3QgfHwgXCJcIikuY29uY2F0KHNvdXJjZSwgXCIgKi9cIik7XG4gICAgfSk7XG4gICAgcmV0dXJuIFtjb250ZW50XS5jb25jYXQoc291cmNlVVJMcykuY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuXG4gIHJldHVybiBbY29udGVudF0uam9pbihcIlxcblwiKTtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5zY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuc2Nzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcblxuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG5cbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG5cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuXG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuXG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB1cGRhdGVyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuXG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcblxuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuXG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuXG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuXG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTsgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcblxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuXG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuXG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuXG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcblxuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG5cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuXG4gIGNzcyArPSBvYmouY3NzO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuXG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfSAvLyBGb3Igb2xkIElFXG5cbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuXG5cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG5cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0ICcuL3N0eWxlLnNjc3MnO1xuaW1wb3J0IHsgR2FtZWJvYXJkIH0gZnJvbSAnLi9nYW1lYm9hcmQnO1xuaW1wb3J0IHsgUGxheWVyIH0gZnJvbSAnLi9wbGF5ZXInO1xuaW1wb3J0IHsgQ29udHJvbGxlciB9IGZyb20gJy4vZG9tJztcblxuZnVuY3Rpb24gR2FtZSgpIHtcbiAgY29uc3QgY29udHJvbGxlciA9IENvbnRyb2xsZXIoKTtcblxuICBmdW5jdGlvbiBpbml0aWFsaXplKCkge1xuICAgIGNvbnN0IHN0YXJ0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ1dHRvbi1zdGFydCcpO1xuICAgIHN0YXJ0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgc3RhcnRCdG4uc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgIGNvbnRyb2xsZXIuZGlzcGxheVVJSGVhZGVyKCk7XG4gICAgICBjb250cm9sbGVyLmNyZWF0ZVVJR2FtZWJvYXJkcygpO1xuICAgICAgc3RhcnRHYW1lKCk7XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBzdGFydEdhbWUoKSB7XG4gICAgY29uc3QgZ2FtZWJvYXJkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5nYW1lYm9hcmQtZ3JpZCcpO1xuICAgIGNvbnN0IHBsYXllciA9IFBsYXllcigncGxheWVyJyk7XG4gICAgY29uc3QgY29tcHV0ZXIgPSBQbGF5ZXIoJ2NvbXB1dGVyJyk7XG4gICAgY29uc3QgcGxheWVyVUlCb2FyZCA9IFsuLi5nYW1lYm9hcmRzWzBdLmNoaWxkcmVuXTtcbiAgICBjb25zdCBjb21wdXRlclVJQm9hcmQgPSBbLi4uZ2FtZWJvYXJkc1sxXS5jaGlsZHJlbl07XG4gICAgY29uc3QgcGxheWVyR2FtZWJvYXJkID0gR2FtZWJvYXJkKGdhbWVib2FyZHNbMF0uY2hpbGRyZW4pO1xuICAgIGNvbnN0IGNvbXB1dGVyR2FtZWJvYXJkID0gR2FtZWJvYXJkKGdhbWVib2FyZHNbMV0uY2hpbGRyZW4pO1xuICAgIHBsYXllckdhbWVib2FyZC5wbGFjZVNoaXBzKCk7XG4gICAgcGxheWVyR2FtZWJvYXJkLmRpc3BsYXlTaGlwKCk7XG4gICAgY29tcHV0ZXJHYW1lYm9hcmQucGxhY2VTaGlwcygpO1xuICAgIHBsYXllci50b2dnbGVUdXJuKCk7XG5cbiAgICBjb21wdXRlclVJQm9hcmQuZm9yRWFjaCgocGxvdCkgPT4ge1xuICAgICAgcGxvdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgbGV0IHJvdyA9IHBhcnNlSW50KHBsb3QuZGF0YXNldC54KTtcbiAgICAgICAgbGV0IGNvbCA9IHBhcnNlSW50KHBsb3QuZGF0YXNldC55KTtcbiAgICAgICAgaWYgKHBsYXllci50dXJuICYmICFpc0dhbWVPdmVyKHBsYXllckdhbWVib2FyZCwgY29tcHV0ZXJHYW1lYm9hcmQpKSB7XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgY29tcHV0ZXJHYW1lYm9hcmQuYm9hcmRbcm93XVtjb2xdLmlzTWlzcyA9PT0gZmFsc2UgJiZcbiAgICAgICAgICAgIGNvbXB1dGVyR2FtZWJvYXJkLmJvYXJkW3Jvd11bY29sXS5pc0hpdCA9PT0gZmFsc2VcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHBsYXllci5hdHRhY2soY29tcHV0ZXJHYW1lYm9hcmQsIHJvdywgY29sKTtcbiAgICAgICAgICAgIGlmIChjb21wdXRlckdhbWVib2FyZC5ib2FyZFtyb3ddW2NvbF0uaXNIaXQpIHtcbiAgICAgICAgICAgICAgY29udHJvbGxlci5zaG93SGl0TWFya2VyKHBsb3QpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChjb21wdXRlckdhbWVib2FyZC5ib2FyZFtyb3ddW2NvbF0uaXNNaXNzKSB7XG4gICAgICAgICAgICAgIGNvbnRyb2xsZXIuc2hvd01pc3NNYXJrZXIocGxvdCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbXB1dGVyUGxheShjb21wdXRlciwgcGxheWVyR2FtZWJvYXJkLCBwbGF5ZXJVSUJvYXJkKTtcbiAgICAgICAgICAgIHBsYXllci50b2dnbGVUdXJuKCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCd0cnkgYWdhaW4hJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNvbXB1dGVyUGxheShjb21wdXRlciwgZW5lbXlCb2FyZCwgZW5lbXlVSUJvYXJkKSB7XG4gICAgY29tcHV0ZXIudG9nZ2xlVHVybigpO1xuICAgIGxldCBjb29yZGluYXRlcyA9IGNvbXB1dGVyLmF0dGFjayhlbmVteUJvYXJkKTtcbiAgICBpZiAoZW5lbXlCb2FyZC5ib2FyZFtjb29yZGluYXRlc1swXV1bY29vcmRpbmF0ZXNbMV1dLmlzSGl0KSB7XG4gICAgICBjb250cm9sbGVyLnNob3dIaXRNYXJrZXIoZW5lbXlVSUJvYXJkW3BhcnNlSW50KGNvb3JkaW5hdGVzLmpvaW4oJycpKV0pO1xuICAgIH0gZWxzZSBpZiAoZW5lbXlCb2FyZC5ib2FyZFtjb29yZGluYXRlc1swXV1bY29vcmRpbmF0ZXNbMV1dLmlzTWlzcykge1xuICAgICAgY29udHJvbGxlci5zaG93TWlzc01hcmtlcihlbmVteVVJQm9hcmRbcGFyc2VJbnQoY29vcmRpbmF0ZXMuam9pbignJykpXSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gaXNHYW1lT3ZlcihwbGF5ZXJzQm9hcmQsIGNvbXB1dGVyc0JvYXJkKSB7XG4gICAgaWYgKHBsYXllcnNCb2FyZC5pc0dhbWVPdmVyKCkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSBpZiAoY29tcHV0ZXJzQm9hcmQuaXNHYW1lT3ZlcigpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7IGluaXRpYWxpemUgfTtcbn1cblxuR2FtZSgpLmluaXRpYWxpemUoKTsiXSwibmFtZXMiOlsiQ29udHJvbGxlciIsImdhbWVib2FyZHMiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJwbGF5ZXJVSUJvYXJkIiwiY2hpbGRyZW4iLCJjcmVhdGVVSUdhbWVib2FyZHMiLCJnYW1lYm9hcmQiLCJpIiwiaiIsInBsb3QxIiwiY3JlYXRlRWxlbWVudCIsInBsb3QyIiwiY2xhc3NMaXN0IiwiYWRkIiwiZGF0YXNldCIsIngiLCJ5IiwiYXBwZW5kQ2hpbGQiLCJkaXNwbGF5VUlIZWFkZXIiLCJyZXNldEJ0biIsInF1ZXJ5U2VsZWN0b3IiLCJnYW1lYm9hcmRzQ29udGFpbmVyIiwic3R5bGUiLCJkaXNwbGF5Iiwib3BhY2l0eSIsImRpc3BsYXlTaGlwcyIsImNvb3JkaW5hdGUiLCJwYXJzZUludCIsImpvaW4iLCJiYWNrZ3JvdW5kIiwic2hvd0hpdE1hcmtlciIsImVsZW1lbnQiLCJzaG93TWlzc01hcmtlciIsIlNoaXAiLCJHYW1lYm9hcmQiLCJjYXJyaWVyIiwiYmF0dGxlc2hpcCIsImNydWlzZXIiLCJkZXN0cm95ZXIxIiwiZGVzdHJveWVyMiIsInN1Ym1hcmluZTEiLCJzdWJtYXJpbmUyIiwic2hpcHMiLCJib2FyZCIsImluaXRpYWxpemVDZWxscyIsInNoaXAiLCJpc0hpdCIsImlzTWlzcyIsInBsYWNlU2hpcCIsImRpcmVjdGlvbiIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsIm1heF9jb2wiLCJtYXhfcm93IiwiZ2V0TGVuZ3RoIiwiY29ybmVyIiwiY2FuRml0IiwiaW5zZXJ0IiwicGxhY2VTaGlwcyIsImF0dGVtcHQiLCJhdHRlbXB0U3VjY2Vzc2Z1bCIsImxlbmd0aCIsImNvbnNvbGUiLCJsb2ciLCJkaXNwbGF5U2hpcCIsImNvbnRyb2xsZXIiLCJzaGlwQ29vcmRpbmF0ZXMiLCJyZWNlaXZlQXR0YWNrIiwicm93IiwiY29sdW1uIiwicGxvdCIsImhpdCIsImlzR2FtZU92ZXIiLCJpc1N1bmsiLCJQbGF5ZXIiLCJuYW1lIiwidHVybiIsInRvZ2dsZVR1cm4iLCJhdHRhY2siLCJlbmVteUJvYXJkIiwicmFuZG9tQ29vcmRpbmF0ZXMiLCJyYW5kb21OdW0iLCJyb3VuZCIsInR5cGUiLCJzaGlwU3RhdHVzIiwiaGVhbHRoIiwiaGl0UG9zaXRpb25zIiwiZ2V0SGl0UG9zaXRpb25zIiwicGxvdHMiLCJyZWR1Y2UiLCJhIiwiYiIsImNvbmNhdCIsImZpbHRlciIsInBvc2l0aW9uIiwicHVzaCIsImNlbGxzIiwiY2VsbExpc3QiLCJHYW1lIiwiaW5pdGlhbGl6ZSIsInN0YXJ0QnRuIiwiYWRkRXZlbnRMaXN0ZW5lciIsInN0YXJ0R2FtZSIsInBsYXllciIsImNvbXB1dGVyIiwiY29tcHV0ZXJVSUJvYXJkIiwicGxheWVyR2FtZWJvYXJkIiwiY29tcHV0ZXJHYW1lYm9hcmQiLCJmb3JFYWNoIiwiY29sIiwiY29tcHV0ZXJQbGF5IiwiZW5lbXlVSUJvYXJkIiwiY29vcmRpbmF0ZXMiLCJwbGF5ZXJzQm9hcmQiLCJjb21wdXRlcnNCb2FyZCJdLCJzb3VyY2VSb290IjoiIn0=