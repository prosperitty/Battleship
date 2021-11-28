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
    playerUIBoard[parseInt(coordinate.join(''))].style.background = 'rgb(208, 208, 251)';
  }

  function showHitMarker(element) {
    element.style.background = 'rgb(254, 187, 187)';
  }

  function showMissMarker(element) {
    element.style.background = 'rgb(210, 210, 210)';
  }

  function resetUIBoard() {
    var playerUIBoard = _toConsumableArray(gameboards[0].children);

    var computerUIBoard = _toConsumableArray(gameboards[1].children);

    playerUIBoard.forEach(function (e) {
      e.style.background = 'white';
    });
    computerUIBoard.forEach(function (e) {
      e.style.background = 'white';
    });
  }

  return {
    createUIGameboards: createUIGameboards,
    displayUIHeader: displayUIHeader,
    showHitMarker: showHitMarker,
    showMissMarker: showMissMarker,
    displayShips: displayShips,
    resetUIBoard: resetUIBoard
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

    if (direction === 'v') {
      max_col -= ship.getLength() - 1;
    } else if (direction === 'h') {
      max_row -= ship.getLength() - 1;
    }

    if (max_row < 1 || max_col < 1) {
      return false;
    }

    var corner = [Math.floor(Math.random() * max_col), Math.floor(Math.random() * max_row)];

    if (ship.canFit(board, direction, corner)) {
      ship.insert(board, direction, corner);
      return true;
    } else {
      return false;
    }
  }

  function placeShips() {
    initializeCells();
    var attemptSuccessful = true;
    var i = 0;

    while (attemptSuccessful && i < ships.length) {
      if (!placeShip(ships[i])) {
        attemptSuccessful = false;
        placeShips();
      } else {
        i++;
      }
    }
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
      return true;
    } else if (plot.ship === null && plot.isHit === false && plot.isMiss === false) {
      plot.isMiss = true;
      return true;
    } else if (plot.isHit === true || plot.isMiss === true) {
      return false;
    }
  }

  function resetShips() {
    for (var i = 0; i < ships.length; i++) {
      ships[i].resetShip();
    }
  }

  function isGameOver() {
    if (carrier.isSunk(this.board) && battleship.isSunk(this.board) && cruiser.isSunk(this.board) && destroyer1.isSunk(this.board) && destroyer2.isSunk(this.board) && submarine1.isSunk(this.board) && submarine2.isSunk(this.board)) {
      return true;
    } else {
      return false;
    }
  }

  return {
    board: board,
    placeShips: placeShips,
    receiveAttack: receiveAttack,
    isGameOver: isGameOver,
    displayShip: displayShip,
    resetShips: resetShips
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

  function resetShip() {
    hitPositions = [];
    shipCoordinates = [];
    this.shipStatus.health = getLength();
  }

  var hit = function hit(position) {
    hitPositions.push(position);
    shipStatus.health -= 1;
  };

  function isSunk() {
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
        cellList[i] = board[corner[0]][corner[1] + i];
      }
    }

    if (direction === 'v') {
      for (var _i = 0; _i < getLength(); _i++) {
        cellList[_i] = board[corner[0] + _i][corner[1]];
      }
    }

    return cellList;
  }

  function canFit(board, direction, corner) {
    var cellList = cells(board, direction, corner);

    for (var i = 0; i < getLength(); i++) {
      if (cellList[i].ship) {
        return false;
      }
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
    hit: hit,
    isSunk: isSunk,
    shipStatus: shipStatus,
    shipCoordinates: shipCoordinates,
    getLength: getLength,
    canFit: canFit,
    insert: insert,
    resetShip: resetShip
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
___CSS_LOADER_EXPORT___.push([module.id, "body {\n  background-color: #a5d8dc;\n  font-family: Arial, Helvetica, sans-serif;\n}\n\nheader {\n  text-align: center;\n}\n\n.gameboards-container {\n  margin-top: 50px;\n  display: flex;\n  justify-content: space-around;\n  flex-wrap: wrap;\n  opacity: 0;\n  transition: 0.2s ease-in-out;\n}\n\n.button {\n  height: 40px;\n  padding: 10px;\n  border: 0;\n  background-color: #ffe6a0;\n  text-transform: capitalize;\n}\n\n.button:hover {\n  background-color: #ffd050;\n}\n\n.button-reset {\n  display: none;\n}\n\n.gameboard-container {\n  padding: 30px;\n}\n\n.gameboard-grid {\n  display: grid;\n  grid-template-rows: repeat(10, 1fr);\n  grid-template-columns: repeat(10, 1fr);\n}\n\n.gameboard-grid-item:hover {\n  border: 0.5px solid #b8fbb2;\n  background-color: rgba(184, 251, 178, 0.785);\n}\n\n.gameboard-grid-item {\n  height: 35px;\n  width: 35px;\n  border: 0.5px solid #a4a4a4;\n  background-color: #ffffff;\n}", "",{"version":3,"sources":["webpack://./src/style.scss"],"names":[],"mappings":"AAAA;EACE,yBAAA;EACA,yCAAA;AACF;;AAEA;EACE,kBAAA;AACF;;AAEA;EACE,gBAAA;EACA,aAAA;EACA,6BAAA;EACA,eAAA;EAEA,UAAA;EACA,4BAAA;AAAF;;AAGA;EACE,YAAA;EACA,aAAA;EACA,SAAA;EACA,yBAAA;EACA,0BAAA;AAAF;;AAGA;EACE,yBAAA;AAAF;;AAGA;EACE,aAAA;AAAF;;AAGA;EACE,aAAA;AAAF;;AAGA;EACE,aAAA;EACA,mCAAA;EACA,sCAAA;AAAF;;AAGA;EACE,2BAAA;EACA,4CAAA;AAAF;;AAGA;EACE,YAAA;EACA,WAAA;EACA,2BAAA;EACA,yBAAA;AAAF","sourcesContent":["body {\n  background-color: rgb(165, 216, 220);\n  font-family: Arial, Helvetica, sans-serif;\n}\n\nheader {\n  text-align: center;\n}\n\n.gameboards-container {\n  margin-top: 50px;\n  display: flex;\n  justify-content: space-around;\n  flex-wrap: wrap;\n\n  opacity: 0;\n  transition: 0.2s ease-in-out;\n}\n\n.button {\n  height: 40px;\n  padding: 10px;\n  border: 0;\n  background-color: rgb(255, 230, 160);\n  text-transform: capitalize;\n}\n\n.button:hover {\n  background-color: rgb(255, 208, 80);\n}\n\n.button-reset {\n  display: none;\n}\n\n.gameboard-container {\n  padding: 30px;\n}\n\n.gameboard-grid {\n  display: grid;\n  grid-template-rows: repeat(10, 1fr);\n  grid-template-columns: repeat(10, 1fr);\n}\n\n.gameboard-grid-item:hover {\n  border: 0.5px solid rgb(184, 251, 178);\n  background-color: rgba(184, 251, 178, 0.785);\n}\n\n.gameboard-grid-item {\n  height: 35px;\n  width: 35px;\n  border: 0.5px solid rgb(164, 164, 164);\n  background-color: #ffffff;\n}"],"sourceRoot":""}]);
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
    var resetBtn = document.querySelector('.button-reset');
    var gameboards = document.querySelectorAll('.gameboard-grid');
    var player = (0,_player__WEBPACK_IMPORTED_MODULE_2__.Player)('player');
    var computer = (0,_player__WEBPACK_IMPORTED_MODULE_2__.Player)('computer');

    var playerUIBoard = _toConsumableArray(gameboards[0].children);

    var computerUIBoard = _toConsumableArray(gameboards[1].children);

    var playerGameboard = (0,_gameboard__WEBPACK_IMPORTED_MODULE_1__.Gameboard)();
    var computerGameboard = (0,_gameboard__WEBPACK_IMPORTED_MODULE_1__.Gameboard)();
    var gameOver = false;
    playerGameboard.placeShips();
    playerGameboard.displayShip();
    computerGameboard.placeShips();
    player.toggleTurn();
    computerUIBoard.forEach(function (plot) {
      plot.addEventListener('click', function () {
        var row = parseInt(plot.dataset.x);
        var col = parseInt(plot.dataset.y);

        if (player.turn && !gameOver) {
          if (computerGameboard.board[row][col].isMiss === false && computerGameboard.board[row][col].isHit === false) {
            player.attack(computerGameboard, row, col, plot);
            gameOver = isGameOver(playerGameboard, computerGameboard);
            computer.toggleTurn();

            if (computerGameboard.board[row][col].isHit) {
              controller.showHitMarker(plot);
            } else if (computerGameboard.board[row][col].isMiss) {
              controller.showMissMarker(plot);
            }
          }
        }

        if (computer.turn && !gameOver) {
          computerPlay(computer, playerGameboard, playerUIBoard);
          gameOver = isGameOver(playerGameboard, computerGameboard);
          player.toggleTurn();
        }
      });
    });
    resetBtn.addEventListener('click', function () {
      controller.resetUIBoard();
      playerGameboard.placeShips();
      playerGameboard.resetShips();
      playerGameboard.displayShip();
      computerGameboard.placeShips();
      computerGameboard.resetShips();
      player.turn = false;
      computer.turn = false;
      gameOver = false;
      player.toggleTurn();
    });
  }

  function computerPlay(computer, enemyBoard, enemyUIBoard) {
    var coordinates = computer.attack(enemyBoard);
    var row = coordinates[0];
    var col = coordinates[1];

    if (enemyBoard.board[row][col].isHit) {
      controller.showHitMarker(enemyUIBoard[parseInt(coordinates.join(''))]);
    } else if (enemyBoard.board[row][col].isMiss) {
      controller.showMissMarker(enemyUIBoard[parseInt(coordinates.join(''))]);
    }
  }

  function isGameOver(playersBoard, computersBoard) {
    if (playersBoard.isGameOver()) {
      console.log('computer wins!');
      return true;
    } else if (computersBoard.isGameOver()) {
      console.log('you win!');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUosRUFBK0I7QUFDN0JtQyxNQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxnQkFBWjtBQUNBLGFBQU8sSUFBUDtBQUNELEtBSEQsTUFHTyxJQUFJRixjQUFjLENBQUNsQyxVQUFmLEVBQUosRUFBaUM7QUFDdENtQyxNQUFBQSxPQUFPLENBQUNDLEdBQVIsQ0FBWSxVQUFaO0FBQ0EsYUFBTyxJQUFQO0FBQ0QsS0FITSxNQUdBO0FBQ0wsYUFBTyxLQUFQO0FBQ0Q7QUFDRjs7QUFFRCxTQUFPO0FBQUVoQixJQUFBQSxVQUFVLEVBQVZBO0FBQUYsR0FBUDtBQUNEOztBQUVERCxJQUFJLEdBQUdDLFVBQVAsRyIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZG9tLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvZ2FtZWJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvcGxheWVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc2hpcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3N0eWxlLnNjc3MiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvc3R5bGUuc2Nzcz83NWJhIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgeyBDb250cm9sbGVyIH07XG5cbmZ1bmN0aW9uIENvbnRyb2xsZXIoKSB7XG4gIGNvbnN0IGdhbWVib2FyZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZ2FtZWJvYXJkLWdyaWQnKTtcbiAgY29uc3QgcGxheWVyVUlCb2FyZCA9IFsuLi5nYW1lYm9hcmRzWzBdLmNoaWxkcmVuXTtcblxuICBmdW5jdGlvbiBjcmVhdGVVSUdhbWVib2FyZHMoKSB7XG4gICAgY29uc3QgZ2FtZWJvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmdhbWVib2FyZC1ncmlkJyk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAxMDsgaSsrKSB7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDEwOyBqKyspIHtcbiAgICAgICAgY29uc3QgcGxvdDEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgY29uc3QgcGxvdDIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgcGxvdDIuY2xhc3NMaXN0LmFkZCgnZ2FtZWJvYXJkLWdyaWQtaXRlbScsICdkcm9wcGFibGUnKTtcbiAgICAgICAgcGxvdDEuY2xhc3NMaXN0LmFkZCgnZ2FtZWJvYXJkLWdyaWQtaXRlbScsICdkcm9wcGFibGUnKTtcbiAgICAgICAgcGxvdDEuZGF0YXNldC54ID0gaTtcbiAgICAgICAgcGxvdDEuZGF0YXNldC55ID0gajtcbiAgICAgICAgcGxvdDIuZGF0YXNldC54ID0gaTtcbiAgICAgICAgcGxvdDIuZGF0YXNldC55ID0gajtcbiAgICAgICAgZ2FtZWJvYXJkWzBdLmFwcGVuZENoaWxkKHBsb3QxKTtcbiAgICAgICAgZ2FtZWJvYXJkWzFdLmFwcGVuZENoaWxkKHBsb3QyKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBkaXNwbGF5VUlIZWFkZXIoKSB7XG4gICAgY29uc3QgcmVzZXRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnV0dG9uLXJlc2V0Jyk7XG4gICAgY29uc3QgZ2FtZWJvYXJkc0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5nYW1lYm9hcmRzLWNvbnRhaW5lcicpO1xuICAgIHJlc2V0QnRuLnN0eWxlLmRpc3BsYXkgPSAnaW5saW5lLWJsb2NrJztcbiAgICBnYW1lYm9hcmRzQ29udGFpbmVyLnN0eWxlLm9wYWNpdHkgPSAxO1xuICB9XG5cbiAgZnVuY3Rpb24gZGlzcGxheVNoaXBzKGNvb3JkaW5hdGUpIHtcbiAgICBwbGF5ZXJVSUJvYXJkW3BhcnNlSW50KGNvb3JkaW5hdGUuam9pbignJykpXS5zdHlsZS5iYWNrZ3JvdW5kID0gJ3JnYigyMDgsIDIwOCwgMjUxKSc7XG4gIH1cblxuICBmdW5jdGlvbiBzaG93SGl0TWFya2VyKGVsZW1lbnQpIHtcbiAgICBlbGVtZW50LnN0eWxlLmJhY2tncm91bmQgPSAncmdiKDI1NCwgMTg3LCAxODcpJztcbiAgfVxuXG4gIGZ1bmN0aW9uIHNob3dNaXNzTWFya2VyKGVsZW1lbnQpIHtcbiAgICBlbGVtZW50LnN0eWxlLmJhY2tncm91bmQgPSAncmdiKDIxMCwgMjEwLCAyMTApJztcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlc2V0VUlCb2FyZCgpIHtcbiAgICBjb25zdCBwbGF5ZXJVSUJvYXJkID0gWy4uLmdhbWVib2FyZHNbMF0uY2hpbGRyZW5dO1xuICAgIGNvbnN0IGNvbXB1dGVyVUlCb2FyZCA9IFsuLi5nYW1lYm9hcmRzWzFdLmNoaWxkcmVuXTtcbiAgICBwbGF5ZXJVSUJvYXJkLmZvckVhY2goKGUpID0+IHtcbiAgICAgIGUuc3R5bGUuYmFja2dyb3VuZCA9ICd3aGl0ZSc7XG4gICAgfSk7XG4gICAgY29tcHV0ZXJVSUJvYXJkLmZvckVhY2goKGUpID0+IHtcbiAgICAgIGUuc3R5bGUuYmFja2dyb3VuZCA9ICd3aGl0ZSc7XG4gICAgfSk7XG4gIH1cbiAgXG4gIHJldHVybiB7IGNyZWF0ZVVJR2FtZWJvYXJkcywgZGlzcGxheVVJSGVhZGVyLCBzaG93SGl0TWFya2VyLCBzaG93TWlzc01hcmtlciwgZGlzcGxheVNoaXBzLCByZXNldFVJQm9hcmQgfTtcbn0iLCJpbXBvcnQgeyBTaGlwIH0gZnJvbSAnLi9zaGlwJztcbmltcG9ydCB7IENvbnRyb2xsZXIgfSBmcm9tICcuL2RvbSc7XG5leHBvcnQgeyBHYW1lYm9hcmQgfTtcblxuZnVuY3Rpb24gR2FtZWJvYXJkKCkge1xuICBjb25zdCBjYXJyaWVyID0gU2hpcCgnY2FycmllcicsIDUpO1xuICBjb25zdCBiYXR0bGVzaGlwID0gU2hpcCgnYmF0dGxlc2hpcCcsIDQpO1xuICBjb25zdCBjcnVpc2VyID0gU2hpcCgnY3J1aXNlcicsIDMpO1xuICBjb25zdCBkZXN0cm95ZXIxID0gU2hpcCgnZGVzdHJveWVyMScsIDIpO1xuICBjb25zdCBkZXN0cm95ZXIyID0gU2hpcCgnZGVzdHJveWVyMicsIDIpO1xuICBjb25zdCBzdWJtYXJpbmUxID0gU2hpcCgnc3VibWFyaW5lMScsIDEpO1xuICBjb25zdCBzdWJtYXJpbmUyID0gU2hpcCgnc3VibWFyaW5lMicsIDEpO1xuICBjb25zdCBzaGlwcyA9IFtcbiAgICBjYXJyaWVyLFxuICAgIGJhdHRsZXNoaXAsXG4gICAgY3J1aXNlcixcbiAgICBkZXN0cm95ZXIxLFxuICAgIGRlc3Ryb3llcjIsXG4gICAgc3VibWFyaW5lMSxcbiAgICBzdWJtYXJpbmUyLFxuICBdO1xuICBsZXQgYm9hcmQgPSBbW10sIFtdLCBbXSwgW10sIFtdLCBbXSwgW10sIFtdLCBbXSwgW11dO1xuXG4gIGZ1bmN0aW9uIGluaXRpYWxpemVDZWxscygpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgMTA7IGorKykge1xuICAgICAgICBib2FyZFtpXVtqXSA9IHtcbiAgICAgICAgICBjb29yZGluYXRlOiBbaSwgal0sXG4gICAgICAgICAgc2hpcDogbnVsbCxcbiAgICAgICAgICBpc0hpdDogZmFsc2UsXG4gICAgICAgICAgaXNNaXNzOiBmYWxzZSxcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBwbGFjZVNoaXAoc2hpcCkge1xuICAgIGxldCBkaXJlY3Rpb24gPSBbJ3YnLCAnaCddW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDIpXTtcbiAgICBsZXQgbWF4X2NvbCA9IDEwO1xuICAgIGxldCBtYXhfcm93ID0gMTA7XG4gICAgaWYgKGRpcmVjdGlvbiA9PT0gJ3YnKSB7XG4gICAgICBtYXhfY29sIC09IHNoaXAuZ2V0TGVuZ3RoKCkgLSAxO1xuICAgIH0gZWxzZSBpZiAoZGlyZWN0aW9uID09PSAnaCcpIHtcbiAgICAgIG1heF9yb3cgLT0gc2hpcC5nZXRMZW5ndGgoKSAtIDE7XG4gICAgfVxuICAgIGlmIChtYXhfcm93IDwgMSB8fCBtYXhfY29sIDwgMSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBsZXQgY29ybmVyID0gW1xuICAgICAgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogbWF4X2NvbCksXG4gICAgICBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBtYXhfcm93KSxcbiAgICBdO1xuICAgIGlmIChzaGlwLmNhbkZpdChib2FyZCwgZGlyZWN0aW9uLCBjb3JuZXIpKSB7XG4gICAgICBzaGlwLmluc2VydChib2FyZCwgZGlyZWN0aW9uLCBjb3JuZXIpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBwbGFjZVNoaXBzKCkge1xuICAgIGluaXRpYWxpemVDZWxscygpO1xuICAgIGxldCBhdHRlbXB0U3VjY2Vzc2Z1bCA9IHRydWU7XG4gICAgbGV0IGkgPSAwO1xuICAgIHdoaWxlIChhdHRlbXB0U3VjY2Vzc2Z1bCAmJiBpIDwgc2hpcHMubGVuZ3RoKSB7XG4gICAgICBpZiAoIXBsYWNlU2hpcChzaGlwc1tpXSkpIHtcbiAgICAgICAgYXR0ZW1wdFN1Y2Nlc3NmdWwgPSBmYWxzZTtcbiAgICAgICAgcGxhY2VTaGlwcygpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaSsrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGRpc3BsYXlTaGlwKCkge1xuICAgIGNvbnN0IGNvbnRyb2xsZXIgPSBDb250cm9sbGVyKCk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwcy5sZW5ndGg7IGkrKykge1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCBzaGlwc1tpXS5zaGlwQ29vcmRpbmF0ZXMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgY29udHJvbGxlci5kaXNwbGF5U2hpcHMoc2hpcHNbaV0uc2hpcENvb3JkaW5hdGVzW2pdKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiByZWNlaXZlQXR0YWNrKHJvdywgY29sdW1uKSB7XG4gICAgbGV0IHBsb3QgPSB0aGlzLmJvYXJkW3Jvd11bY29sdW1uXTtcbiAgICBpZiAocGxvdC5zaGlwICE9PSBudWxsICYmIHBsb3QuaXNIaXQgPT09IGZhbHNlICYmIHBsb3QuaXNNaXNzID09PSBmYWxzZSkge1xuICAgICAgcGxvdC5zaGlwLmhpdCgpO1xuICAgICAgcGxvdC5pc0hpdCA9IHRydWU7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2UgaWYgKFxuICAgICAgcGxvdC5zaGlwID09PSBudWxsICYmXG4gICAgICBwbG90LmlzSGl0ID09PSBmYWxzZSAmJlxuICAgICAgcGxvdC5pc01pc3MgPT09IGZhbHNlXG4gICAgKSB7XG4gICAgICBwbG90LmlzTWlzcyA9IHRydWU7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2UgaWYgKHBsb3QuaXNIaXQgPT09IHRydWUgfHwgcGxvdC5pc01pc3MgPT09IHRydWUpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiByZXNldFNoaXBzKCkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcHMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHNoaXBzW2ldLnJlc2V0U2hpcCgpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGlzR2FtZU92ZXIoKSB7XG4gICAgaWYgKFxuICAgICAgY2Fycmllci5pc1N1bmsodGhpcy5ib2FyZCkgJiZcbiAgICAgIGJhdHRsZXNoaXAuaXNTdW5rKHRoaXMuYm9hcmQpICYmXG4gICAgICBjcnVpc2VyLmlzU3Vuayh0aGlzLmJvYXJkKSAmJlxuICAgICAgZGVzdHJveWVyMS5pc1N1bmsodGhpcy5ib2FyZCkgJiZcbiAgICAgIGRlc3Ryb3llcjIuaXNTdW5rKHRoaXMuYm9hcmQpICYmXG4gICAgICBzdWJtYXJpbmUxLmlzU3Vuayh0aGlzLmJvYXJkKSAmJlxuICAgICAgc3VibWFyaW5lMi5pc1N1bmsodGhpcy5ib2FyZClcbiAgICApIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBib2FyZCxcbiAgICBwbGFjZVNoaXBzLFxuICAgIHJlY2VpdmVBdHRhY2ssXG4gICAgaXNHYW1lT3ZlcixcbiAgICBkaXNwbGF5U2hpcCxcbiAgICByZXNldFNoaXBzLFxuICB9O1xufVxuIiwiZXhwb3J0IHsgUGxheWVyIH07XG5cbmZ1bmN0aW9uIFBsYXllcihuYW1lKSB7XG4gIGxldCB0dXJuID0gZmFsc2U7XG5cbiAgZnVuY3Rpb24gdG9nZ2xlVHVybigpIHtcbiAgICB0aGlzLnR1cm4gPyAodGhpcy50dXJuID0gZmFsc2UpIDogKHRoaXMudHVybiA9IHRydWUpO1xuICB9XG5cbiAgZnVuY3Rpb24gYXR0YWNrKGVuZW15Qm9hcmQsIHJvdywgY29sdW1uKSB7XG4gICAgaWYgKHRoaXMudHVybiAmJiBuYW1lID09PSAncGxheWVyJykge1xuICAgICAgaWYgKGVuZW15Qm9hcmQucmVjZWl2ZUF0dGFjayhyb3csIGNvbHVtbikpIHtcbiAgICAgICAgdGhpcy50b2dnbGVUdXJuKCk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0aGlzLnR1cm4gJiYgbmFtZSA9PT0gJ2NvbXB1dGVyJykge1xuICAgICAgbGV0IHJhbmRvbUNvb3JkaW5hdGVzID0gW3JhbmRvbU51bSgpLCByYW5kb21OdW0oKV07XG4gICAgICBpZiAoZW5lbXlCb2FyZC5yZWNlaXZlQXR0YWNrKC4uLnJhbmRvbUNvb3JkaW5hdGVzKSkge1xuICAgICAgICB0aGlzLnRvZ2dsZVR1cm4oKTtcbiAgICAgICAgcmV0dXJuIHJhbmRvbUNvb3JkaW5hdGVzO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuYXR0YWNrKGVuZW15Qm9hcmQpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJhbmRvbU51bSgpIHtcbiAgICByZXR1cm4gTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogKDAgLSA5KSArIDkpO1xuICB9XG5cbiAgcmV0dXJuIHsgYXR0YWNrLCB0dXJuLCB0b2dnbGVUdXJuIH07XG59XG4iLCJleHBvcnQgeyBTaGlwIH07XG5cbmZ1bmN0aW9uIFNoaXAodHlwZSwgbGVuZ3RoKSB7XG4gIGNvbnN0IGdldExlbmd0aCA9ICgpID0+IGxlbmd0aDtcbiAgbGV0IHNoaXBTdGF0dXMgPSB7IGhlYWx0aDogbGVuZ3RoLCB0eXBlIH07XG4gIGxldCBoaXRQb3NpdGlvbnMgPSBbXTtcbiAgbGV0IHNoaXBDb29yZGluYXRlcyA9IFtdO1xuXG4gIGZ1bmN0aW9uIHJlc2V0U2hpcCgpIHtcbiAgICBoaXRQb3NpdGlvbnMgPSBbXTtcbiAgICBzaGlwQ29vcmRpbmF0ZXMgPSBbXTtcbiAgICB0aGlzLnNoaXBTdGF0dXMuaGVhbHRoID0gZ2V0TGVuZ3RoKCk7XG4gIH1cblxuICBjb25zdCBoaXQgPSAocG9zaXRpb24pID0+IHtcbiAgICBoaXRQb3NpdGlvbnMucHVzaChwb3NpdGlvbik7XG4gICAgc2hpcFN0YXR1cy5oZWFsdGggLT0gMTtcbiAgfTtcblxuICBmdW5jdGlvbiBpc1N1bmsoKSB7XG4gICAgaWYgKHNoaXBTdGF0dXMuaGVhbHRoID09PSAwICYmIGhpdFBvc2l0aW9ucy5sZW5ndGggPT09IGdldExlbmd0aCgpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGNlbGxzKGJvYXJkLCBkaXJlY3Rpb24sIGNvcm5lcikge1xuICAgIGxldCBjZWxsTGlzdCA9IFtdO1xuICAgIGlmIChkaXJlY3Rpb24gPT09ICdoJykge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBnZXRMZW5ndGgoKTsgaSsrKSB7XG4gICAgICAgIGNlbGxMaXN0W2ldID0gYm9hcmRbY29ybmVyWzBdXVtjb3JuZXJbMV0gKyBpXTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGRpcmVjdGlvbiA9PT0gJ3YnKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGdldExlbmd0aCgpOyBpKyspIHtcbiAgICAgICAgY2VsbExpc3RbaV0gPSBib2FyZFtjb3JuZXJbMF0gKyBpXVtjb3JuZXJbMV1dO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gY2VsbExpc3Q7XG4gIH1cblxuICBmdW5jdGlvbiBjYW5GaXQoYm9hcmQsIGRpcmVjdGlvbiwgY29ybmVyKSB7XG4gICAgbGV0IGNlbGxMaXN0ID0gY2VsbHMoYm9hcmQsIGRpcmVjdGlvbiwgY29ybmVyKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGdldExlbmd0aCgpOyBpKyspIHtcbiAgICAgIGlmIChjZWxsTGlzdFtpXS5zaGlwKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBmdW5jdGlvbiBpbnNlcnQoYm9hcmQsIGRpcmVjdGlvbiwgY29ybmVyKSB7XG4gICAgbGV0IGNlbGxMaXN0ID0gY2VsbHMoYm9hcmQsIGRpcmVjdGlvbiwgY29ybmVyKTtcbiAgICBsZXQgY29vcmRpbmF0ZSA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZ2V0TGVuZ3RoKCk7IGkrKykge1xuICAgICAgY29vcmRpbmF0ZS5wdXNoKGNlbGxMaXN0W2ldLmNvb3JkaW5hdGUpO1xuICAgICAgY2VsbExpc3RbaV0uc2hpcCA9IHRoaXM7XG4gICAgfVxuICAgIHRoaXMuc2hpcENvb3JkaW5hdGVzID0gWy4uLmNvb3JkaW5hdGVdO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBoaXQsXG4gICAgaXNTdW5rLFxuICAgIHNoaXBTdGF0dXMsXG4gICAgc2hpcENvb3JkaW5hdGVzLFxuICAgIGdldExlbmd0aCxcbiAgICBjYW5GaXQsXG4gICAgaW5zZXJ0LFxuICAgIHJlc2V0U2hpcCxcbiAgfTtcbn1cbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiYm9keSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjYTVkOGRjO1xcbiAgZm9udC1mYW1pbHk6IEFyaWFsLCBIZWx2ZXRpY2EsIHNhbnMtc2VyaWY7XFxufVxcblxcbmhlYWRlciB7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxufVxcblxcbi5nYW1lYm9hcmRzLWNvbnRhaW5lciB7XFxuICBtYXJnaW4tdG9wOiA1MHB4O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xcbiAgZmxleC13cmFwOiB3cmFwO1xcbiAgb3BhY2l0eTogMDtcXG4gIHRyYW5zaXRpb246IDAuMnMgZWFzZS1pbi1vdXQ7XFxufVxcblxcbi5idXR0b24ge1xcbiAgaGVpZ2h0OiA0MHB4O1xcbiAgcGFkZGluZzogMTBweDtcXG4gIGJvcmRlcjogMDtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmU2YTA7XFxuICB0ZXh0LXRyYW5zZm9ybTogY2FwaXRhbGl6ZTtcXG59XFxuXFxuLmJ1dHRvbjpob3ZlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZkMDUwO1xcbn1cXG5cXG4uYnV0dG9uLXJlc2V0IHtcXG4gIGRpc3BsYXk6IG5vbmU7XFxufVxcblxcbi5nYW1lYm9hcmQtY29udGFpbmVyIHtcXG4gIHBhZGRpbmc6IDMwcHg7XFxufVxcblxcbi5nYW1lYm9hcmQtZ3JpZCB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTAsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMCwgMWZyKTtcXG59XFxuXFxuLmdhbWVib2FyZC1ncmlkLWl0ZW06aG92ZXIge1xcbiAgYm9yZGVyOiAwLjVweCBzb2xpZCAjYjhmYmIyO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgxODQsIDI1MSwgMTc4LCAwLjc4NSk7XFxufVxcblxcbi5nYW1lYm9hcmQtZ3JpZC1pdGVtIHtcXG4gIGhlaWdodDogMzVweDtcXG4gIHdpZHRoOiAzNXB4O1xcbiAgYm9yZGVyOiAwLjVweCBzb2xpZCAjYTRhNGE0O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZmZmZjtcXG59XCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlLnNjc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7RUFDRSx5QkFBQTtFQUNBLHlDQUFBO0FBQ0Y7O0FBRUE7RUFDRSxrQkFBQTtBQUNGOztBQUVBO0VBQ0UsZ0JBQUE7RUFDQSxhQUFBO0VBQ0EsNkJBQUE7RUFDQSxlQUFBO0VBRUEsVUFBQTtFQUNBLDRCQUFBO0FBQUY7O0FBR0E7RUFDRSxZQUFBO0VBQ0EsYUFBQTtFQUNBLFNBQUE7RUFDQSx5QkFBQTtFQUNBLDBCQUFBO0FBQUY7O0FBR0E7RUFDRSx5QkFBQTtBQUFGOztBQUdBO0VBQ0UsYUFBQTtBQUFGOztBQUdBO0VBQ0UsYUFBQTtBQUFGOztBQUdBO0VBQ0UsYUFBQTtFQUNBLG1DQUFBO0VBQ0Esc0NBQUE7QUFBRjs7QUFHQTtFQUNFLDJCQUFBO0VBQ0EsNENBQUE7QUFBRjs7QUFHQTtFQUNFLFlBQUE7RUFDQSxXQUFBO0VBQ0EsMkJBQUE7RUFDQSx5QkFBQTtBQUFGXCIsXCJzb3VyY2VzQ29udGVudFwiOltcImJvZHkge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDE2NSwgMjE2LCAyMjApO1xcbiAgZm9udC1mYW1pbHk6IEFyaWFsLCBIZWx2ZXRpY2EsIHNhbnMtc2VyaWY7XFxufVxcblxcbmhlYWRlciB7XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxufVxcblxcbi5nYW1lYm9hcmRzLWNvbnRhaW5lciB7XFxuICBtYXJnaW4tdG9wOiA1MHB4O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xcbiAgZmxleC13cmFwOiB3cmFwO1xcblxcbiAgb3BhY2l0eTogMDtcXG4gIHRyYW5zaXRpb246IDAuMnMgZWFzZS1pbi1vdXQ7XFxufVxcblxcbi5idXR0b24ge1xcbiAgaGVpZ2h0OiA0MHB4O1xcbiAgcGFkZGluZzogMTBweDtcXG4gIGJvcmRlcjogMDtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigyNTUsIDIzMCwgMTYwKTtcXG4gIHRleHQtdHJhbnNmb3JtOiBjYXBpdGFsaXplO1xcbn1cXG5cXG4uYnV0dG9uOmhvdmVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigyNTUsIDIwOCwgODApO1xcbn1cXG5cXG4uYnV0dG9uLXJlc2V0IHtcXG4gIGRpc3BsYXk6IG5vbmU7XFxufVxcblxcbi5nYW1lYm9hcmQtY29udGFpbmVyIHtcXG4gIHBhZGRpbmc6IDMwcHg7XFxufVxcblxcbi5nYW1lYm9hcmQtZ3JpZCB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTAsIDFmcik7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMCwgMWZyKTtcXG59XFxuXFxuLmdhbWVib2FyZC1ncmlkLWl0ZW06aG92ZXIge1xcbiAgYm9yZGVyOiAwLjVweCBzb2xpZCByZ2IoMTg0LCAyNTEsIDE3OCk7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDE4NCwgMjUxLCAxNzgsIDAuNzg1KTtcXG59XFxuXFxuLmdhbWVib2FyZC1ncmlkLWl0ZW0ge1xcbiAgaGVpZ2h0OiAzNXB4O1xcbiAgd2lkdGg6IDM1cHg7XFxuICBib3JkZXI6IDAuNXB4IHNvbGlkIHJnYigxNjQsIDE2NCwgMTY0KTtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmZmZmY7XFxufVwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJcInVzZSBzdHJpY3RcIjtcblxuLypcbiAgTUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcbiAgQXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcpIHtcbiAgdmFyIGxpc3QgPSBbXTsgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuXG4gIGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgIHZhciBjb250ZW50ID0gXCJcIjtcbiAgICAgIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2YgaXRlbVs1XSAhPT0gXCJ1bmRlZmluZWRcIjtcblxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuXG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKTtcbiAgICAgIH1cblxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuXG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzJdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07IC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG5cblxuICBsaXN0LmkgPSBmdW5jdGlvbiBpKG1vZHVsZXMsIG1lZGlhLCBkZWR1cGUsIHN1cHBvcnRzLCBsYXllcikge1xuICAgIGlmICh0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgbW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgdW5kZWZpbmVkXV07XG4gICAgfVxuXG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcblxuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCB0aGlzLmxlbmd0aDsgX2krKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW19pXVswXTtcblxuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZvciAodmFyIF9pMiA9IDA7IF9pMiA8IG1vZHVsZXMubGVuZ3RoOyBfaTIrKykge1xuICAgICAgdmFyIGl0ZW0gPSBbXS5jb25jYXQobW9kdWxlc1tfaTJdKTtcblxuICAgICAgaWYgKGRlZHVwZSAmJiBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoc3VwcG9ydHMpIHtcbiAgICAgICAgaWYgKCFpdGVtWzRdKSB7XG4gICAgICAgICAgaXRlbVs0XSA9IFwiXCIuY29uY2F0KHN1cHBvcnRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChpdGVtWzRdLCBcIikge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNF0gPSBzdXBwb3J0cztcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcblxuICBpZiAoIWNzc01hcHBpbmcpIHtcbiAgICByZXR1cm4gY29udGVudDtcbiAgfVxuXG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICB2YXIgc291cmNlVVJMcyA9IGNzc01hcHBpbmcuc291cmNlcy5tYXAoZnVuY3Rpb24gKHNvdXJjZSkge1xuICAgICAgcmV0dXJuIFwiLyojIHNvdXJjZVVSTD1cIi5jb25jYXQoY3NzTWFwcGluZy5zb3VyY2VSb290IHx8IFwiXCIpLmNvbmNhdChzb3VyY2UsIFwiICovXCIpO1xuICAgIH0pO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KHNvdXJjZVVSTHMpLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cblxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuc2Nzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLnNjc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5cbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuXG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuXG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cblxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcblxuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gdXBkYXRlcjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cblxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG5cbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcblxuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcblxuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcblxuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7IC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG5cbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cblxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcblxuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cblxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG5cbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuXG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cblxuICBjc3MgKz0gb2JqLmNzcztcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcblxuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH0gLy8gRm9yIG9sZCBJRVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cblxuXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuXG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCAnLi9zdHlsZS5zY3NzJztcbmltcG9ydCB7IEdhbWVib2FyZCB9IGZyb20gJy4vZ2FtZWJvYXJkJztcbmltcG9ydCB7IFBsYXllciB9IGZyb20gJy4vcGxheWVyJztcbmltcG9ydCB7IENvbnRyb2xsZXIgfSBmcm9tICcuL2RvbSc7XG5cbmZ1bmN0aW9uIEdhbWUoKSB7XG4gIGNvbnN0IGNvbnRyb2xsZXIgPSBDb250cm9sbGVyKCk7XG5cbiAgZnVuY3Rpb24gaW5pdGlhbGl6ZSgpIHtcbiAgICBjb25zdCBzdGFydEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5idXR0b24tc3RhcnQnKTtcbiAgICBzdGFydEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIHN0YXJ0QnRuLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICBjb250cm9sbGVyLmRpc3BsYXlVSUhlYWRlcigpO1xuICAgICAgY29udHJvbGxlci5jcmVhdGVVSUdhbWVib2FyZHMoKTtcbiAgICAgIHN0YXJ0R2FtZSgpO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gc3RhcnRHYW1lKCkge1xuICAgIGNvbnN0IHJlc2V0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ1dHRvbi1yZXNldCcpO1xuICAgIGNvbnN0IGdhbWVib2FyZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuZ2FtZWJvYXJkLWdyaWQnKTtcbiAgICBjb25zdCBwbGF5ZXIgPSBQbGF5ZXIoJ3BsYXllcicpO1xuICAgIGNvbnN0IGNvbXB1dGVyID0gUGxheWVyKCdjb21wdXRlcicpO1xuICAgIGNvbnN0IHBsYXllclVJQm9hcmQgPSBbLi4uZ2FtZWJvYXJkc1swXS5jaGlsZHJlbl07XG4gICAgY29uc3QgY29tcHV0ZXJVSUJvYXJkID0gWy4uLmdhbWVib2FyZHNbMV0uY2hpbGRyZW5dO1xuICAgIGNvbnN0IHBsYXllckdhbWVib2FyZCA9IEdhbWVib2FyZCgpO1xuICAgIGNvbnN0IGNvbXB1dGVyR2FtZWJvYXJkID0gR2FtZWJvYXJkKCk7XG4gICAgbGV0IGdhbWVPdmVyID0gZmFsc2U7XG4gICAgcGxheWVyR2FtZWJvYXJkLnBsYWNlU2hpcHMoKTtcbiAgICBwbGF5ZXJHYW1lYm9hcmQuZGlzcGxheVNoaXAoKTtcbiAgICBjb21wdXRlckdhbWVib2FyZC5wbGFjZVNoaXBzKCk7XG4gICAgcGxheWVyLnRvZ2dsZVR1cm4oKTtcblxuICAgIGNvbXB1dGVyVUlCb2FyZC5mb3JFYWNoKChwbG90KSA9PiB7XG4gICAgICBwbG90LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICBsZXQgcm93ID0gcGFyc2VJbnQocGxvdC5kYXRhc2V0LngpO1xuICAgICAgICBsZXQgY29sID0gcGFyc2VJbnQocGxvdC5kYXRhc2V0LnkpO1xuICAgICAgICBpZiAocGxheWVyLnR1cm4gJiYgIWdhbWVPdmVyKSB7XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgY29tcHV0ZXJHYW1lYm9hcmQuYm9hcmRbcm93XVtjb2xdLmlzTWlzcyA9PT0gZmFsc2UgJiZcbiAgICAgICAgICAgIGNvbXB1dGVyR2FtZWJvYXJkLmJvYXJkW3Jvd11bY29sXS5pc0hpdCA9PT0gZmFsc2VcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHBsYXllci5hdHRhY2soY29tcHV0ZXJHYW1lYm9hcmQsIHJvdywgY29sLCBwbG90KTtcbiAgICAgICAgICAgIGdhbWVPdmVyID0gaXNHYW1lT3ZlcihwbGF5ZXJHYW1lYm9hcmQsIGNvbXB1dGVyR2FtZWJvYXJkKTtcbiAgICAgICAgICAgIGNvbXB1dGVyLnRvZ2dsZVR1cm4oKTtcbiAgICAgICAgICAgIGlmIChjb21wdXRlckdhbWVib2FyZC5ib2FyZFtyb3ddW2NvbF0uaXNIaXQpIHtcbiAgICAgICAgICAgICAgY29udHJvbGxlci5zaG93SGl0TWFya2VyKHBsb3QpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChjb21wdXRlckdhbWVib2FyZC5ib2FyZFtyb3ddW2NvbF0uaXNNaXNzKSB7XG4gICAgICAgICAgICAgIGNvbnRyb2xsZXIuc2hvd01pc3NNYXJrZXIocGxvdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChjb21wdXRlci50dXJuICYmICFnYW1lT3Zlcikge1xuICAgICAgICAgIGNvbXB1dGVyUGxheShjb21wdXRlciwgcGxheWVyR2FtZWJvYXJkLCBwbGF5ZXJVSUJvYXJkKTtcbiAgICAgICAgICBnYW1lT3ZlciA9IGlzR2FtZU92ZXIocGxheWVyR2FtZWJvYXJkLCBjb21wdXRlckdhbWVib2FyZCk7XG4gICAgICAgICAgcGxheWVyLnRvZ2dsZVR1cm4oKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICByZXNldEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIGNvbnRyb2xsZXIucmVzZXRVSUJvYXJkKCk7XG4gICAgICBwbGF5ZXJHYW1lYm9hcmQucGxhY2VTaGlwcygpO1xuICAgICAgcGxheWVyR2FtZWJvYXJkLnJlc2V0U2hpcHMoKTtcbiAgICAgIHBsYXllckdhbWVib2FyZC5kaXNwbGF5U2hpcCgpO1xuICAgICAgY29tcHV0ZXJHYW1lYm9hcmQucGxhY2VTaGlwcygpO1xuICAgICAgY29tcHV0ZXJHYW1lYm9hcmQucmVzZXRTaGlwcygpO1xuICAgICAgcGxheWVyLnR1cm4gPSBmYWxzZTtcbiAgICAgIGNvbXB1dGVyLnR1cm4gPSBmYWxzZTtcbiAgICAgIGdhbWVPdmVyID0gZmFsc2U7XG4gICAgICBwbGF5ZXIudG9nZ2xlVHVybigpO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gY29tcHV0ZXJQbGF5KGNvbXB1dGVyLCBlbmVteUJvYXJkLCBlbmVteVVJQm9hcmQpIHtcbiAgICBsZXQgY29vcmRpbmF0ZXMgPSBjb21wdXRlci5hdHRhY2soZW5lbXlCb2FyZCk7XG4gICAgbGV0IHJvdyA9IGNvb3JkaW5hdGVzWzBdO1xuICAgIGxldCBjb2wgPSBjb29yZGluYXRlc1sxXTtcbiAgICBpZiAoZW5lbXlCb2FyZC5ib2FyZFtyb3ddW2NvbF0uaXNIaXQpIHtcbiAgICAgIGNvbnRyb2xsZXIuc2hvd0hpdE1hcmtlcihlbmVteVVJQm9hcmRbcGFyc2VJbnQoY29vcmRpbmF0ZXMuam9pbignJykpXSk7XG4gICAgfSBlbHNlIGlmIChlbmVteUJvYXJkLmJvYXJkW3Jvd11bY29sXS5pc01pc3MpIHtcbiAgICAgIGNvbnRyb2xsZXIuc2hvd01pc3NNYXJrZXIoZW5lbXlVSUJvYXJkW3BhcnNlSW50KGNvb3JkaW5hdGVzLmpvaW4oJycpKV0pO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGlzR2FtZU92ZXIocGxheWVyc0JvYXJkLCBjb21wdXRlcnNCb2FyZCkge1xuICAgIGlmIChwbGF5ZXJzQm9hcmQuaXNHYW1lT3ZlcigpKSB7XG4gICAgICBjb25zb2xlLmxvZygnY29tcHV0ZXIgd2lucyEnKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSBpZiAoY29tcHV0ZXJzQm9hcmQuaXNHYW1lT3ZlcigpKSB7XG4gICAgICBjb25zb2xlLmxvZygneW91IHdpbiEnKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHsgaW5pdGlhbGl6ZSB9O1xufVxuXG5HYW1lKCkuaW5pdGlhbGl6ZSgpO1xuIl0sIm5hbWVzIjpbIkNvbnRyb2xsZXIiLCJnYW1lYm9hcmRzIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yQWxsIiwicGxheWVyVUlCb2FyZCIsImNoaWxkcmVuIiwiY3JlYXRlVUlHYW1lYm9hcmRzIiwiZ2FtZWJvYXJkIiwiaSIsImoiLCJwbG90MSIsImNyZWF0ZUVsZW1lbnQiLCJwbG90MiIsImNsYXNzTGlzdCIsImFkZCIsImRhdGFzZXQiLCJ4IiwieSIsImFwcGVuZENoaWxkIiwiZGlzcGxheVVJSGVhZGVyIiwicmVzZXRCdG4iLCJxdWVyeVNlbGVjdG9yIiwiZ2FtZWJvYXJkc0NvbnRhaW5lciIsInN0eWxlIiwiZGlzcGxheSIsIm9wYWNpdHkiLCJkaXNwbGF5U2hpcHMiLCJjb29yZGluYXRlIiwicGFyc2VJbnQiLCJqb2luIiwiYmFja2dyb3VuZCIsInNob3dIaXRNYXJrZXIiLCJlbGVtZW50Iiwic2hvd01pc3NNYXJrZXIiLCJyZXNldFVJQm9hcmQiLCJjb21wdXRlclVJQm9hcmQiLCJmb3JFYWNoIiwiZSIsIlNoaXAiLCJHYW1lYm9hcmQiLCJjYXJyaWVyIiwiYmF0dGxlc2hpcCIsImNydWlzZXIiLCJkZXN0cm95ZXIxIiwiZGVzdHJveWVyMiIsInN1Ym1hcmluZTEiLCJzdWJtYXJpbmUyIiwic2hpcHMiLCJib2FyZCIsImluaXRpYWxpemVDZWxscyIsInNoaXAiLCJpc0hpdCIsImlzTWlzcyIsInBsYWNlU2hpcCIsImRpcmVjdGlvbiIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsIm1heF9jb2wiLCJtYXhfcm93IiwiZ2V0TGVuZ3RoIiwiY29ybmVyIiwiY2FuRml0IiwiaW5zZXJ0IiwicGxhY2VTaGlwcyIsImF0dGVtcHRTdWNjZXNzZnVsIiwibGVuZ3RoIiwiZGlzcGxheVNoaXAiLCJjb250cm9sbGVyIiwic2hpcENvb3JkaW5hdGVzIiwicmVjZWl2ZUF0dGFjayIsInJvdyIsImNvbHVtbiIsInBsb3QiLCJoaXQiLCJyZXNldFNoaXBzIiwicmVzZXRTaGlwIiwiaXNHYW1lT3ZlciIsImlzU3VuayIsIlBsYXllciIsIm5hbWUiLCJ0dXJuIiwidG9nZ2xlVHVybiIsImF0dGFjayIsImVuZW15Qm9hcmQiLCJyYW5kb21Db29yZGluYXRlcyIsInJhbmRvbU51bSIsInJvdW5kIiwidHlwZSIsInNoaXBTdGF0dXMiLCJoZWFsdGgiLCJoaXRQb3NpdGlvbnMiLCJwb3NpdGlvbiIsInB1c2giLCJjZWxscyIsImNlbGxMaXN0IiwiR2FtZSIsImluaXRpYWxpemUiLCJzdGFydEJ0biIsImFkZEV2ZW50TGlzdGVuZXIiLCJzdGFydEdhbWUiLCJwbGF5ZXIiLCJjb21wdXRlciIsInBsYXllckdhbWVib2FyZCIsImNvbXB1dGVyR2FtZWJvYXJkIiwiZ2FtZU92ZXIiLCJjb2wiLCJjb21wdXRlclBsYXkiLCJlbmVteVVJQm9hcmQiLCJjb29yZGluYXRlcyIsInBsYXllcnNCb2FyZCIsImNvbXB1dGVyc0JvYXJkIiwiY29uc29sZSIsImxvZyJdLCJzb3VyY2VSb290IjoiIn0=