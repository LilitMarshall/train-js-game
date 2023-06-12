/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./classes/Block.js":
/*!**************************!*\
  !*** ./classes/Block.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Block)\n/* harmony export */ });\n/* harmony import */ var _EventEmitter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EventEmitter */ \"./classes/EventEmitter.js\");\n/* harmony import */ var _Coord__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Coord */ \"./classes/Coord.js\");\n\r\n\r\n\r\nclass Block {\r\n    /**\r\n     * @type {Number}\r\n     */\r\n    size = 0\r\n\r\n    /**\r\n     * @type {Coord}\r\n     */\r\n    coords = []\r\n\r\n    /**\r\n     * @type {EventEmitter}\r\n     */\r\n    event = null\r\n\r\n    /**\r\n     * @type {Number}\r\n     */\r\n    id = 0\r\n\r\n    /**\r\n     * @param {Number} size \r\n     * @param {Number} x\r\n     * @param {Number} y\r\n     */\r\n    constructor(id, size, x, y){\r\n        this.setCoord = this.setCoord.bind(this)\r\n        this.getBlockWidth = this.getBlockWidth.bind(this)\r\n\r\n        this.size = size\r\n        this.coords = new _Coord__WEBPACK_IMPORTED_MODULE_1__[\"default\"](x, y)\r\n\r\n        this.id = id\r\n        this.event = new _EventEmitter__WEBPACK_IMPORTED_MODULE_0__[\"default\"]()\r\n    }\r\n\r\n    /**\r\n     * @param {Number} x \r\n     * @param {Number} y \r\n     */\r\n    setCoord(x, y){\r\n        this.coords = new _Coord__WEBPACK_IMPORTED_MODULE_1__[\"default\"](x, y)\r\n        this.event.emit('change', this)\r\n    }\r\n\r\n    getBlockWidth(step){\r\n        return ((this.size) * step)\r\n    }\r\n}\n\n//# sourceURL=webpack:///./classes/Block.js?");

/***/ }),

/***/ "./classes/Controller.js":
/*!*******************************!*\
  !*** ./classes/Controller.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Controller)\n/* harmony export */ });\n/* harmony import */ var _ScoreView__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ScoreView */ \"./classes/ScoreView.js\");\n/* harmony import */ var _FieldView__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FieldView */ \"./classes/FieldView.js\");\n/* harmony import */ var _Score__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Score */ \"./classes/Score.js\");\n/* harmony import */ var _Field__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Field */ \"./classes/Field.js\");\n/* harmony import */ var _Coord__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Coord */ \"./classes/Coord.js\");\n/* harmony import */ var _Helpers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Helpers */ \"./classes/Helpers.js\");\n\r\n\r\n\r\n\r\n\r\n\r\n\r\nclass Controller {\r\n    /**\r\n     * @type {String}\r\n     */\r\n    gameDom = null\r\n\r\n    /**\r\n     * @type {ScoreView}\r\n     */\r\n    scoreView = null\r\n\r\n    /**\r\n     * @type {FieldView}\r\n     */\r\n    fieldView = null\r\n\r\n    /**\r\n     * @type {Score}\r\n     */\r\n    score = null\r\n\r\n    /**\r\n     * @type {Field}\r\n     */\r\n    field = null\r\n\r\n    /**\r\n     * @type {Block|null}\r\n     */\r\n    targetBlock = null\r\n\r\n    flag = true\r\n    xStart = null\r\n    yStart = null\r\n    leftWall = 0\r\n    rightWall = 0\r\n\r\n\r\n    /**\r\n     * \r\n     * @param {Object} domElement \r\n     */\r\n    constructor(domElement){\r\n        this.gameDom = domElement\r\n        this.score = new _Score__WEBPACK_IMPORTED_MODULE_2__[\"default\"]()\r\n        this.field = new _Field__WEBPACK_IMPORTED_MODULE_3__[\"default\"](8, 55)\r\n        this.scoreView = new _ScoreView__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.gameDom, this.score)\r\n        this.fieldView = new _FieldView__WEBPACK_IMPORTED_MODULE_1__[\"default\"](this.gameDom, this.field, 55)\r\n        this.scoreView.render()\r\n        this.fieldView.render()\r\n        this.field.genNewRow()\r\n        \r\n        this.grabBlock = this.grabBlock.bind(this)\r\n        this.moveBlock = this.moveBlock.bind(this)\r\n        this.restart = this.restart.bind(this)\r\n        this.endGame = this.endGame.bind(this)\r\n        this.absolveBlock = this.absolveBlock.bind(this)\r\n\r\n        this.scoreView.event.subscribe('click', this.restart)\r\n        this.fieldView.event.subscribe('mouseDown', this.grabBlock)\r\n        this.fieldView.event.subscribe('mouseMove', this.moveBlock)\r\n        this.fieldView.event.subscribe('mouseUp', this.absolveBlock)\r\n        this.field.event.subscribe('rowDeleted', this.score.upValue)\r\n    }\r\n\r\n    grabBlock(targetBlock){\r\n        if(this.flag){\r\n            this.targetBlock = targetBlock\r\n            this.flag = false \r\n            this.xStart = this.targetBlock.coords.x\r\n            this.yStart = this.targetBlock.coords.y\r\n\r\n            let arrRow = this.field.getRowArr(this.yStart)\r\n            this.leftWall = this.field.getLeftWall(arrRow, this.targetBlock)\r\n            this.rightWall = this.field.getRightWall(arrRow, this.targetBlock)\r\n        }\r\n    }\r\n\r\n    moveBlock(offsetMouseX){\r\n        if(this.targetBlock){\r\n            let newTargetBlockX = this.xStart - offsetMouseX\r\n\r\n            if(newTargetBlockX < this.leftWall){\r\n                newTargetBlockX = this.leftWall\r\n            }\r\n            if(newTargetBlockX > this.rightWall){\r\n                newTargetBlockX = this.rightWall\r\n            }\r\n    \r\n            this.fieldView.targetNewX = newTargetBlockX;\r\n            this.targetBlock.coords = new _Coord__WEBPACK_IMPORTED_MODULE_4__[\"default\"](newTargetBlockX, this.yStart)\r\n            this.fieldView.positionBlock(this.fieldView.targetBlock, newTargetBlockX, this.yStart)\r\n        }\r\n    }\r\n\r\n    async absolveBlock(){\r\n        if(!this.flag && this.targetBlock){\r\n            let newCoord = _Coord__WEBPACK_IMPORTED_MODULE_4__[\"default\"].calculateCoord(this.fieldView.targetNewX, this.field.step)\r\n            if(this.startX != newCoord){\r\n                this.targetBlock.coords = new _Coord__WEBPACK_IMPORTED_MODULE_4__[\"default\"](newCoord, this.yStart)\r\n                this.targetBlock = null\r\n    \r\n                await this.startNewStep()\r\n            }else{\r\n                this.targetBlock.coords = new _Coord__WEBPACK_IMPORTED_MODULE_4__[\"default\"](this.startX, this.yStart)\r\n                this.targetBlock = null\r\n            }\r\n            \r\n            this.flag = true\r\n        }\r\n    }\r\n\r\n    async startNewStep(){\r\n        do{\r\n            await _Helpers__WEBPACK_IMPORTED_MODULE_5__[\"default\"].timeout(100, this.field.collapse)\r\n            await _Helpers__WEBPACK_IMPORTED_MODULE_5__[\"default\"].timeout(300, this.field.checkFullRow)\r\n            await _Helpers__WEBPACK_IMPORTED_MODULE_5__[\"default\"].timeout(100, this.field.collapse)\r\n        }while(this.field.checkFullRow())\r\n        if(this.field.checkFieldFill()){\r\n            this.endGame()\r\n        }else{\r\n            await _Helpers__WEBPACK_IMPORTED_MODULE_5__[\"default\"].timeout(500, this.field.upBlocks)\r\n            await _Helpers__WEBPACK_IMPORTED_MODULE_5__[\"default\"].timeout(450, this.field.genNewRow)\r\n            do{\r\n                await _Helpers__WEBPACK_IMPORTED_MODULE_5__[\"default\"].timeout(100, this.field.collapse)\r\n                await _Helpers__WEBPACK_IMPORTED_MODULE_5__[\"default\"].timeout(300, this.field.checkFullRow)\r\n                await _Helpers__WEBPACK_IMPORTED_MODULE_5__[\"default\"].timeout(100, this.field.collapse)\r\n            }while(this.field.checkFullRow())\r\n        }\r\n    }\r\n\r\n    endGame(){\r\n        alert('Ты проиграл, твой счет: ' + this.score.value)\r\n        this.restart()\r\n    }\r\n\r\n    restart(){\r\n        this.score.resetValue()\r\n        this.field.clearField()\r\n        this.field.genNewRow()\r\n    }\r\n}\n\n//# sourceURL=webpack:///./classes/Controller.js?");

/***/ }),

/***/ "./classes/Coord.js":
/*!**************************!*\
  !*** ./classes/Coord.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Coord)\n/* harmony export */ });\nclass Coord {\r\n    /**\r\n     * @type {Number}\r\n     */\r\n    x = 0\r\n\r\n    /**\r\n     * @type {Number}\r\n     */\r\n    y = 0\r\n\r\n    constructor(x, y){\r\n        this.x = x\r\n        this.y = y\r\n    }\r\n\r\n    static calculateCoord(coord, step){\r\n        return coord = Math.floor(coord/step)*step\r\n    }\r\n}\n\n//# sourceURL=webpack:///./classes/Coord.js?");

/***/ }),

/***/ "./classes/EventEmitter.js":
/*!*********************************!*\
  !*** ./classes/EventEmitter.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ EventEmitter)\n/* harmony export */ });\nclass EventEmitter {\r\n\r\n    events = {}\r\n\r\n    constructor(){\r\n        this.subscribe = this.subscribe.bind(this)\r\n        this.unsubscribe = this.unsubscribe.bind(this)\r\n        this.emit = this.emit.bind(this)\r\n    }\r\n\r\n    /**\r\n     * @param {string} eventName \r\n     * @param {Function} callback \r\n     */\r\n    subscribe(eventName, callback){\r\n        if(!this.events[eventName]){\r\n            this.events[eventName] = []\r\n        }\r\n        this.events[eventName].push(callback)\r\n    }\r\n\r\n    /**\r\n     * @param {string} eventName \r\n     * @param {Function} callback \r\n     */\r\n    unsubscribe(eventName, callback){\r\n        this.event[eventName] = this.events[eventName].filter(eventCallback => callback !== eventCallback)\r\n    }\r\n\r\n    /**\r\n     * @param {string} eventName \r\n     * @param {any} args \r\n     */\r\n    emit(eventName, args){\r\n        const event = this.events[eventName]\r\n        if(event){\r\n            event.forEach(callback => callback(args))\r\n        }\r\n    }\r\n}\n\n//# sourceURL=webpack:///./classes/EventEmitter.js?");

/***/ }),

/***/ "./classes/Field.js":
/*!**************************!*\
  !*** ./classes/Field.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Field)\n/* harmony export */ });\n/* harmony import */ var _EventEmitter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EventEmitter */ \"./classes/EventEmitter.js\");\n/* harmony import */ var _Helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Helpers */ \"./classes/Helpers.js\");\n/* harmony import */ var _Block__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Block */ \"./classes/Block.js\");\n\r\n\r\n\r\n\r\nclass Field {\r\n    /**\r\n     * @type {Number}\r\n     */\r\n    size = 0\r\n\r\n    /**\r\n     * @type {Array.<Block>}\r\n     */\r\n    blocks = []\r\n\r\n    lastBlockId = 0\r\n\r\n    /**\r\n     * @type {EventEmitter}\r\n     */\r\n    event = null\r\n    /**\r\n     * @type {Number}\r\n     */\r\n    step = null\r\n\r\n    constructor(size, step){\r\n        this.genNewRow = this.genNewRow.bind(this)\r\n        this.fillNewRow = this.fillNewRow.bind(this)\r\n        this.genBlockSize = this.genBlockSize.bind(this)\r\n        this.countZeroCounter = this.countZeroCounter.bind(this)\r\n        this.addBlock = this.addBlock.bind(this)\r\n        \r\n        this.findBlock = this.findBlock.bind(this)\r\n        this.findBlockByCoord = this.findBlockByCoord.bind(this)\r\n        this.upBlocks = this.upBlocks.bind(this)\r\n\r\n        this.checkFieldFill = this.checkFieldFill.bind(this)\r\n        this.clearField = this.clearField.bind(this)\r\n        this.deleteFullRow = this.deleteFullRow.bind(this)\r\n        this.checkFullRow = this.checkFullRow.bind(this)\r\n        this.collapse = this.collapse.bind(this)\r\n\r\n        this.getRowArr = this.getRowArr.bind(this)\r\n        this.getLeftWall = this.getLeftWall.bind(this)\r\n        this.getRightWall = this.getRightWall.bind(this)\r\n\r\n        this.size = size\r\n        this.step = step\r\n        this.event = new _EventEmitter__WEBPACK_IMPORTED_MODULE_0__[\"default\"]()\r\n    }\r\n\r\n    genNewRow(){\r\n        let maxRowFill = _Helpers__WEBPACK_IMPORTED_MODULE_1__[\"default\"].random(4, 7)\r\n        let blockSum = 0\r\n        let newRow = [0, 0, 0, 0, 0, 0, 0, 0];\r\n        while(blockSum != maxRowFill){\r\n            let x = _Helpers__WEBPACK_IMPORTED_MODULE_1__[\"default\"].random(0,7) \r\n            if(newRow[x] == 0){\r\n                let zeroCounter = this.countZeroCounter(newRow, maxRowFill, blockSum, x)\r\n                let blockSize = this.genBlockSize(zeroCounter)\r\n                for(let i = 0; i < blockSize; i++){\r\n                    newRow[x + i] = blockSize\r\n                }\r\n                blockSum+=blockSize\r\n            }\r\n        }\r\n        this.fillNewRow(newRow)\r\n        this.event.emit('change', this)\r\n    }\r\n    fillNewRow(arr){\r\n        let x = 0\r\n        while(x < arr.length){\r\n            if(arr[x] != 0){\r\n                this.lastBlockId++\r\n                let newBlock = new _Block__WEBPACK_IMPORTED_MODULE_2__[\"default\"](this.lastBlockId, arr[x], x*this.step, 0)\r\n                this.addBlock(newBlock)\r\n                x += (arr[x] - 1)\r\n            }\r\n            x++\r\n        }\r\n    }\r\n    /**\r\n     * @param {Block} block \r\n     */\r\n    addBlock(block){\r\n        this.blocks.push(block)\r\n        block.event.subscribe('change', () => {\r\n            this.event.emit('change', this)\r\n        })\r\n    }\r\n    /**\r\n     * @param {Number} zeroCounter \r\n     * @returns {Number}\r\n     */\r\n    genBlockSize(zeroCounter) {\r\n        if(zeroCounter > 4) {\r\n            return (_Helpers__WEBPACK_IMPORTED_MODULE_1__[\"default\"].random(3, (zeroCounter-1)))\r\n        } else {\r\n            return (_Helpers__WEBPACK_IMPORTED_MODULE_1__[\"default\"].random(1, (zeroCounter-1)))\r\n        }\r\n    }\r\n    /**\r\n     * @param {Array} newRow\r\n     * @param {Number} maxRowFill \r\n     * @param {Number} blockSum \r\n     * @param {Number} x \r\n     * @returns {Number}\r\n     */\r\n    countZeroCounter(newRow, maxRowFill, blockSum, x){\r\n        let zeroCounter = 1\r\n        for(let i = (x + 1); i <= newRow.length; i++){\r\n            if(newRow[i] == 0){\r\n                zeroCounter++\r\n            } else{\r\n                break\r\n            }\r\n        }    \r\n        if(zeroCounter > 4){\r\n            zeroCounter = 5\r\n        }\r\n        if((blockSum+(zeroCounter-1))>maxRowFill){\r\n            zeroCounter = maxRowFill-blockSum\r\n        }\r\n        return zeroCounter\r\n    }\r\n    upBlocks(){\r\n        for(let block of this.blocks){\r\n            block.setCoord(block.coords.x, (block.coords.y+this.step))\r\n        }\r\n    }\r\n\r\n    getRowArr(y){\r\n        let arrRow = []\r\n        let x = 0\r\n        while(x < this.size){\r\n            let block = this.findBlockByCoord(x*this.step, y)\r\n            if(block){\r\n                for(let i = 1; i <= block.size; i++){\r\n                    arrRow.push(1)\r\n                    x++\r\n                }\r\n            }else{\r\n                arrRow.push(0)\r\n                x++\r\n            }\r\n        }\r\n        return arrRow\r\n    }\r\n    getLeftWall(arrRow, targetBlock){\r\n        let xStart = targetBlock.coords.x / this.step\r\n        let leftEmpty = 0\r\n        let cellSize = this.step\r\n\r\n        if(this.xStart != 0){\r\n            let x = xStart - 1\r\n            while(x >= 0){\r\n                if(arrRow[x] == 0){\r\n                    leftEmpty++\r\n                    x--\r\n                }else{\r\n                    break\r\n                }\r\n            }\r\n        }\r\n        return (xStart - leftEmpty) * cellSize\r\n    }\r\n    getRightWall(arrRow, targetBlock){\r\n        let cellSize = this.step\r\n        let xStart = targetBlock.coords.x\r\n        let xEnd = (xStart + targetBlock.getBlockWidth(cellSize))/cellSize\r\n        let rightEmpty = 0\r\n\r\n        if(xEnd != this.size){\r\n            let x = xEnd\r\n            while(x <= this.size-1){\r\n                if(arrRow[x] == 0){\r\n                    rightEmpty++\r\n                    x++\r\n                }else{\r\n                    break\r\n                }\r\n            }\r\n        }\r\n        return xStart + (rightEmpty * cellSize)\r\n    }\r\n    \r\n    \r\n    checkFullRow(){\r\n        for(let block of this.blocks){\r\n            let rowArr = this.getRowArr(block.coords.y)\r\n            let flag = true\r\n            for(let i = 0; i< rowArr.length; i++){\r\n                if(rowArr[i] == 0){\r\n                    flag = false\r\n                    break\r\n                }\r\n            }\r\n            if(flag){\r\n                this.deleteFullRow(block.coords.y, rowArr.length)\r\n                return true\r\n            }\r\n        }\r\n\r\n    }\r\n    async deleteFullRow(y){\r\n        this.blocks = this.blocks.filter(block => block.coords.y != y);\r\n        this.event.emit('change', this)\r\n        this.event.emit('rowDeleted', this)\r\n    }\r\n    collapse(){\r\n        for(let block of this.blocks){\r\n            if(block.coords.y != 0){\r\n                let rowArr = this.getRowArr(block.coords.y - this.step)\r\n                let x = block.coords.x / this.step\r\n                let flag = true\r\n                for(let i = 0; i < block.size; i++){\r\n                    if(rowArr[x+i] != 0){\r\n                        flag = false\r\n                        break\r\n                    }\r\n                }\r\n                if(flag){\r\n                    block.setCoord(block.coords.x, block.coords.y - 1)\r\n                    this.collapse()\r\n                }\r\n            }\r\n        }\r\n    }\r\n    \r\n    /**\r\n     * @param {Number} i \r\n     * @returns {Block}\r\n     */\r\n    findBlock(i){\r\n        for(let block of this.blocks){\r\n            if(block.id == (i)){\r\n                return block\r\n            }\r\n        }\r\n    }\r\n    findBlockByCoord(x, y){\r\n        for(let block of this.blocks){\r\n            if(block.coords.x == x && block.coords.y == y){\r\n                return block\r\n            }\r\n        }\r\n    }\r\n    \r\n    checkFieldFill(){\r\n        for(let x = 0; x < this.size; x++){\r\n            if(this.findBlockByCoord(x*this.step, this.size*this.step)){\r\n                return true\r\n            }\r\n        }\r\n    }\r\n    clearField(){\r\n        this.blocks = []\r\n        this.lastBlockId = 0\r\n        this.event.emit('change', this)\r\n    }\r\n}\n\n//# sourceURL=webpack:///./classes/Field.js?");

/***/ }),

/***/ "./classes/FieldView.js":
/*!******************************!*\
  !*** ./classes/FieldView.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ FieldView)\n/* harmony export */ });\n/* harmony import */ var _EventEmitter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EventEmitter */ \"./classes/EventEmitter.js\");\n/* harmony import */ var _Field__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Field */ \"./classes/Field.js\");\n\r\n\r\n\r\nclass FieldView {\r\n    /**\r\n     * @type {Object}\r\n     */\r\n    gameDom = null\r\n\r\n    /**\r\n     * @type {Array}\r\n     */\r\n    blocks = []\r\n\r\n    /**\r\n     * @type {Field}\r\n     */\r\n    field = null\r\n\r\n    /**\r\n     * @type {Number}\r\n     */\r\n    cellsize = 0\r\n\r\n    /**\r\n     * @type {EventEmitter}\r\n     */\r\n    event = null\r\n\r\n    /**\r\n     * @type {Block|null}\r\n     */\r\n    targetBlock = null\r\n\r\n    targetStartMouseX = null\r\n    targetNewX = null\r\n\r\n    /**\r\n     * @param {Object} domElement \r\n     * @param {Field} field\r\n     * @param {Number} cellSize\r\n     */\r\n    constructor(domElement, field, cellSize){\r\n        this.render = this.render.bind(this)\r\n        this.findBlock = this.findBlock.bind(this)\r\n        this.renderBlock = this.renderBlock.bind(this)\r\n        this.positionBlock = this.positionBlock.bind(this)\r\n        // this.onDragStart = this.onDragStart.bind(this)\r\n\r\n        this.onmousedown = this.onmousedown.bind(this)\r\n        this.mouseup = this.mouseup.bind(this)\r\n\r\n        this.gameDom = domElement\r\n        this.field = field\r\n        this.cellsize = cellSize\r\n        this.event = new _EventEmitter__WEBPACK_IMPORTED_MODULE_0__[\"default\"]()\r\n\r\n        this.field.event.subscribe('change', this.render)\r\n\r\n        document.addEventListener('mousemove',(e) => {\r\n            this.mouseMove(e)\r\n        })\r\n        document.addEventListener('mouseup', this.mouseup)\r\n    }\r\n    onmousedown(e, targetBlockDom){\r\n        this.targetBlock = targetBlockDom\r\n        this.targetStartMouseX = e.pageX\r\n\r\n        this.event.emit('mouseDown', (this.field.findBlock(targetBlockDom.dataset.id)))\r\n    }\r\n    \r\n    mouseMove(e){\r\n        if(this.targetBlock){\r\n            let offsetMouseX = this.targetStartMouseX - e.pageX\r\n            if(offsetMouseX != 0){\r\n                this.event.emit('mouseMove', offsetMouseX)\r\n            }\r\n        }\r\n    }\r\n    \r\n    mouseup(){\r\n        if(this.targetBlock){\r\n            this.event.emit('mouseUp', '')\r\n        }\r\n        this.targetBlock = null\r\n    }\r\n\r\n    render(){\r\n        let fieldBackground = this.gameDom.querySelector('.field-back')\r\n        if(!fieldBackground){\r\n            fieldBackground = document.createElement('div')\r\n            fieldBackground.classList.add('field-back')\r\n            this.gameDom.append(fieldBackground)\r\n        }\r\n\r\n        let fieldDom = this.gameDom.querySelector('.field')\r\n        if(!fieldDom){\r\n            fieldDom = document.createElement('div')\r\n            fieldDom.classList.add('field')\r\n            fieldBackground.append(fieldDom)\r\n        }\r\n        if(this.field.blocks.length>0){\r\n            for(let block of this.field.blocks){\r\n                this.renderBlock(block, fieldDom)\r\n            }\r\n            let blocksDom = fieldDom.querySelectorAll('.block')\r\n            for(let blockDom of blocksDom){\r\n                let targetId = blockDom.dataset.id\r\n                if(!this.field.findBlock(targetId)){\r\n                    blockDom.remove()\r\n                }\r\n            }\r\n        } else{\r\n            fieldDom.innerHTML = ''\r\n        }\r\n    }\r\n\r\n    /**\r\n     * @param {Number} x \r\n     * @param {Number} y \r\n     * @returns {Object}\r\n     */\r\n    findBlock(id){\r\n        return this.gameDom.querySelector('.block[data-id = \"' + id)\r\n    }\r\n\r\n    /**\r\n     * @param {Block} block \r\n     * @param {Object} fieldDom \r\n     */\r\n    renderBlock(block, fieldDom){\r\n        let targetDom = this.findBlock(block.id)\r\n        if(!targetDom){\r\n            targetDom = document.createElement('div')\r\n            targetDom.classList.add('block', 'block-'+block.size)\r\n            targetDom.dataset.id = block.id\r\n            \r\n            targetDom.addEventListener('mousedown', (e) => {\r\n                this.onmousedown(e, targetDom)\r\n            })\r\n            // targetDom.addEventListener('dragstart', this.onDragStart)\r\n\r\n            fieldDom.append(targetDom)\r\n        }\r\n        this.positionBlock(targetDom, block.coords.x, block.coords.y)\r\n    }\r\n\r\n    // onDragStart(){\r\n    //     return false;\r\n    // }\r\n\r\n    /**\r\n     * @param {Object} targetDom \r\n     * @param {Number} x \r\n     * @param {Number} y \r\n     */\r\n    positionBlock(targetDom, x, y){\r\n        targetDom.style.left = x + 'px'\r\n        targetDom.style.bottom = y + 'px'\r\n    }\r\n}\n\n//# sourceURL=webpack:///./classes/FieldView.js?");

/***/ }),

/***/ "./classes/Game.js":
/*!*************************!*\
  !*** ./classes/Game.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Game)\n/* harmony export */ });\n/* harmony import */ var _Controller__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Controller */ \"./classes/Controller.js\");\n\r\n\r\nclass Game {\r\n    /**\r\n     * @type {Object}\r\n     */\r\n    gameDom = null\r\n\r\n    /**\r\n     * @type {Controller}\r\n     */\r\n    controller = null\r\n\r\n    /**\r\n     * @param {Object} mainDom \r\n     */\r\n    constructor(mainDom){\r\n        this.gameDom = document.createElement('div')\r\n        this.gameDom.classList.add('game')\r\n        mainDom.append(this.gameDom)\r\n        \r\n        this.controller = new _Controller__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this.gameDom)\r\n    }\r\n}\n\n//# sourceURL=webpack:///./classes/Game.js?");

/***/ }),

/***/ "./classes/Helpers.js":
/*!****************************!*\
  !*** ./classes/Helpers.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Helpers)\n/* harmony export */ });\nclass Helpers {\r\n    static random(min, max){\r\n        return (Math.floor(Math.random()*(max-min+1))+min)\r\n    }\r\n    static timeout(delay, func, arg){\r\n        return new Promise((resolve, reject)=>{\r\n           setTimeout(() => { resolve(func(arg)) }, delay)\r\n        })\r\n    }\r\n}\n\n//# sourceURL=webpack:///./classes/Helpers.js?");

/***/ }),

/***/ "./classes/Score.js":
/*!**************************!*\
  !*** ./classes/Score.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Score)\n/* harmony export */ });\n/* harmony import */ var _EventEmitter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EventEmitter */ \"./classes/EventEmitter.js\");\n\r\n\r\n\r\nclass Score {\r\n    /**\r\n     * @type {Number}\r\n     */\r\n    value = 0\r\n    /**\r\n     * @type {EventEmitter}\r\n     */\r\n    event = null\r\n\r\n    constructor(){\r\n        this.upValue = this.upValue.bind(this)\r\n        this.resetValue = this.resetValue.bind(this)\r\n\r\n        this.value = 0\r\n        this.event = new _EventEmitter__WEBPACK_IMPORTED_MODULE_0__[\"default\"]()\r\n    }\r\n\r\n    upValue(){\r\n        this.value += 50\r\n        this.event.emit('change', this)\r\n    }\r\n\r\n    resetValue(){\r\n        this.value = 0\r\n        this.event.emit('change', this)\r\n    }\r\n}\n\n//# sourceURL=webpack:///./classes/Score.js?");

/***/ }),

/***/ "./classes/ScoreView.js":
/*!******************************!*\
  !*** ./classes/ScoreView.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ ScoreView)\n/* harmony export */ });\n/* harmony import */ var _EventEmitter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EventEmitter */ \"./classes/EventEmitter.js\");\n/* harmony import */ var _Score__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Score */ \"./classes/Score.js\");\n\r\n\r\n\r\nclass ScoreView {\r\n    /**\r\n     * @type {Object}\r\n     */\r\n    gameDom = null\r\n\r\n    /**\r\n     * @type {Score}\r\n     */\r\n    score = null\r\n\r\n    /**\r\n     * @type {EventEmitter}\r\n     */\r\n    event = null\r\n    /**\r\n     * @param {Object} domElement\r\n     * @param {Score} score \r\n     */\r\n    constructor(domElement, score){\r\n        this.render = this.render.bind(this)\r\n\r\n        this.gameDom = domElement\r\n        this.score = score\r\n        this.event = new _EventEmitter__WEBPACK_IMPORTED_MODULE_0__[\"default\"]()\r\n\r\n        this.score.event.subscribe('change', () => {\r\n            this.render()\r\n        })\r\n    }\r\n\r\n    render(){\r\n        let infoPanel = this.gameDom.querySelector('.info-panel')\r\n        if(!infoPanel){\r\n            infoPanel = document.createElement('div')\r\n            infoPanel.classList.add('info-panel')\r\n            this.gameDom.append(infoPanel)\r\n        }\r\n\r\n        let restartButton = infoPanel.querySelector('.button')\r\n        if(!restartButton){\r\n            restartButton = document.createElement('div')\r\n            restartButton.classList.add('button')\r\n            infoPanel.append(restartButton)\r\n            restartButton.addEventListener('click', () => {this.event.emit('click', this)})\r\n        }\r\n\r\n        let scoreContainer = infoPanel.querySelector('.scoreContainer')\r\n        if(!scoreContainer){\r\n            scoreContainer = document.createElement('div')\r\n            scoreContainer.classList.add('scoreContainer')\r\n            infoPanel.append(scoreContainer)\r\n        }\r\n\r\n        let scoreText = scoreContainer.querySelector('.scoreText')\r\n        if(!scoreText){\r\n            scoreText = document.createElement('div')\r\n            scoreText.classList.add('scoreText')\r\n            scoreContainer.append(scoreText)\r\n            scoreText.textContent = 'Счёт'\r\n        }\r\n\r\n        let scoreCounter = scoreContainer.querySelector('.scoreCounter')\r\n        if(!scoreCounter){\r\n            scoreCounter = document.createElement('div')\r\n            scoreCounter.classList.add('scoreCounter')\r\n            scoreContainer.append(scoreCounter)\r\n        }\r\n        scoreCounter.textContent = this.score.value\r\n    }\r\n}\n\n//# sourceURL=webpack:///./classes/ScoreView.js?");

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _classes_Game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./classes/Game */ \"./classes/Game.js\");\n\r\n\r\nlet mainDom = document.querySelector('main')\r\n\r\n\r\nlet game = new _classes_Game__WEBPACK_IMPORTED_MODULE_0__[\"default\"](mainDom)\r\n\r\nconsole.log(game)\n\n//# sourceURL=webpack:///./index.js?");

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
/******/ 			// no module.id needed
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
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./index.js");
/******/ 	
/******/ })()
;