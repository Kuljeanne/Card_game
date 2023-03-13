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

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _js_modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./js/modal */ \"./src/js/modal.js\");\n/* harmony import */ var _js_timer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./js/timer */ \"./src/js/timer.js\");\n/* harmony import */ var _js_card__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./js/card */ \"./src/js/card.js\");\n\n\n\n\nconst app = document.querySelector('.app')\n\nconst cardSuits = ['clubs', 'diamonds', 'hearts', 'spades']\nconst cardValues = ['A', 'K', 'Q', 'J', '10', '9', '8', '7', '6']\n\n// open choose-level-modal\nconst chooseLevelModal = new _js_modal__WEBPACK_IMPORTED_MODULE_0__.Modal('complexity-level_block')\nchooseLevelModal.buildModal('Выбери сложность')\n\nif (!localStorage.getItem('level')) {\n    chooseLevelModal.openModal()\n}\n\nisGameStarted()\n\nfunction isGameStarted() {\n    if (!localStorage.getItem('level')) {\n        setTimeout(isGameStarted, 500)\n    } else {\n        app.append(renderGameWrapper())\n        const cards = document.querySelector('.game_field')\n        renderCards(cardSuits, cardValues, cards)\n\n        if (localStorage.getItem('level') === '1') {\n            console.log(cards)\n        } else if (localStorage.getItem('level') === '2') {\n            console.log(cards)\n        } else if (localStorage.getItem('level') === '3') {\n            console.log(cards)\n        }\n    }\n}\n\nfunction renderGameWrapper() {\n    const gameWrapper = createElem('gameWrapper', 'div', 'game_wrapper')\n    const toolsWrapper = createElem('toolsWrapper', 'div', 'tools_wrapper')\n    const timer = new _js_timer__WEBPACK_IMPORTED_MODULE_1__.Timer()\n    timer.buildTimer()\n    const buttonStartAgain = createElem(\n        'buttonStartAgain',\n        'button',\n        'startAgain_btn'\n    )\n    buttonStartAgain.textContent = 'Начать заново'\n    buttonStartAgain.addEventListener('click', startAgain)\n    const gameField = createElem('gameField', 'div', 'game_field')\n    gameWrapper.append(toolsWrapper)\n    timer.renderTimer(toolsWrapper)\n    toolsWrapper.append(buttonStartAgain)\n    gameWrapper.append(gameField)\n\n    return gameWrapper\n}\n\nfunction createElem(node, elemHTML, classes) {\n    node = document.createElement(elemHTML)\n    node.classList.add(classes)\n    return node\n}\nfunction startAgain() {\n    localStorage.clear()\n    window.location.reload()\n}\n\nfunction renderCards(suits, values, container) {\n    for (let i = 0; i < suits.length; i++) {\n        for (let j = 0; j < values.length; j++) {\n            const card = new _js_card__WEBPACK_IMPORTED_MODULE_2__.Card()\n            console.log(card.build(suits[i], values[j]))\n            card.build(suits[i], values[j])\n            card.render(container)\n        }\n    }\n}\n\n\n//# sourceURL=webpack://course4/./src/index.js?");

/***/ }),

/***/ "./src/js/card.js":
/*!************************!*\
  !*** ./src/js/card.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Card\": () => (/* binding */ Card)\n/* harmony export */ });\nclass Card {\r\n    constructor() {\r\n        this.card = ''\r\n        this.top = ''\r\n        this.center = ''\r\n        this.bottom = ''\r\n    }\r\n\r\n    build(suit, value) {\r\n        this.card = this.createDomNode(this.card, 'div', 'card')\r\n        this.top = this.createDomNode(this.top, 'div', 'card_top')\r\n        this.top.innerHTML = `<span>${value}</span><img class=\"suit-mini\" src= \"../src/img/${suit}.svg\" alt=\"${suit}\">`\r\n        this.center = this.createDomNode(this.top, 'img', 'card_center')\r\n        this.center.src = `../src/img/${suit}.svg`\r\n        this.center.alt = `${suit}:${value}`\r\n        this.bottom = this.createDomNode(this.top, 'div', 'card_bottom')\r\n        this.bottom.innerHTML = `<span>${value}</span><img class=\"suit-mini\" src= \"../src/img/${suit}.svg\" alt=\"${suit}\">`\r\n\r\n        this.appendElements()\r\n    }\r\n\r\n    createDomNode(node, elemHTML, classes) {\r\n        node = document.createElement(elemHTML)\r\n        node.classList.add(classes)\r\n        return node\r\n    }\r\n    appendElements() {\r\n        this.card.append(this.top)\r\n        this.card.append(this.center)\r\n        this.card.append(this.bottom)\r\n    }\r\n\r\n    render(container){\r\n        container.append(this.card)\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://course4/./src/js/card.js?");

/***/ }),

/***/ "./src/js/modal.js":
/*!*************************!*\
  !*** ./src/js/modal.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Modal\": () => (/* binding */ Modal)\n/* harmony export */ });\nclass Modal {\n    constructor(...classes) {\n        this.classes = classes\n        this.modal = ''\n        this.modalTitle = ''\n        this.modalContent = ''\n        this.modalBtn = ''\n        this.wrapper = ''\n    }\n\n    buildModal(title) {\n        this.wrapper = this.createDomNode(this.wrapper, 'div', 'modal_wrapper')\n\n        this.modal = this.createDomNode(this.modal, 'div', this.classes)\n        this.modal.classList.add('modal_block')\n\n        this.modalTitle = this.createDomNode(this.modalTitle, 'h2')\n        this.modalTitle.textContent = title\n\n        if (this.modal.classList.contains('complexity-level_block')) {\n            this.modalTitle.classList.add('complexity-level_title')\n            this.modalContent = this.createDomNode(\n                this.modalContent,\n                'form',\n                'complexity-level_choose'\n            )\n            this.modalContent.innerHTML = `<div class = \"error error__hidden\">Необходимо выбрать сложность</div><div class=\"complexity-level_options\">\n            <input type=\"radio\" name=\"complexity-level\" value=\"1\" id=\"complexity-level_easy\">\n            <label class=\"complexity-level_option\" for=\"complexity-level_easy\">1</label>\n            <input type=\"radio\" name=\"complexity-level\" value=\"2\" id=\"complexity-level_medium\">\n            <label class=\"complexity-level_option\" for=\"complexity-level_medium\">2</label>\n            <input type=\"radio\" name=\"complexity-level\" value=\"3\" id=\"complexity-level_hard\">\n            <label class=\"complexity-level_option\" for=\"complexity-level_hard\">3</label>\n            </div><button class=\"complexity-level_btn\">Старт</button>`\n        }\n\n        this.appendsModalElements()\n\n        this.modalBtn = this.findBtn()\n\n        this.bindEvents()\n    }\n\n    createDomNode(node, elemHTML, classes) {\n        node = document.createElement(elemHTML)\n        if (classes) node.classList.add(classes)\n        return node\n    }\n\n    appendsModalElements() {\n        this.wrapper.append(this.modal)\n        this.modal.append(this.modalTitle)\n        this.modal.append(this.modalContent)\n    }\n\n    openModal() {\n        document.querySelector('.app').append(this.wrapper)\n    }\n\n    findBtn() {\n        return this.modal.querySelector('button')\n    }\n\n    bindEvents() {\n        this.modalBtn.addEventListener('click', (event) => {\n            event.preventDefault()\n            if (this.modal.querySelector('form')) {\n                const formData = new FormData(this.modal.querySelector('form'))\n                this.isLevelChosen(formData)\n            } else {\n                localStorage.clear()\n            }\n        })\n    }\n\n    isLevelChosen(data) {\n        if (data.get('complexity-level') === null) {\n            this.modal.querySelector('.error').classList.remove('error__hidden')\n        } else {\n            localStorage.setItem('level', data.get('complexity-level'))\n            this.closeModal()\n        }\n    }\n\n    closeModal() {\n        this.wrapper.remove()\n    }\n}\n\n\n//# sourceURL=webpack://course4/./src/js/modal.js?");

/***/ }),

/***/ "./src/js/timer.js":
/*!*************************!*\
  !*** ./src/js/timer.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Timer\": () => (/* binding */ Timer)\n/* harmony export */ });\nclass Timer {\r\n    constructor() {\r\n        this.wrapper = ''\r\n        this.desc = ''\r\n        this.time = ''\r\n    }\r\n\r\n    buildTimer() {\r\n        this.wrapper = this.createDomNode(this.wrapper, 'div', 'timer_wrapper')\r\n\r\n        this.desc = this.createDomNode(this.wrapper, 'div', 'time_desc')\r\n        this.desc.innerHTML = `<div class=\"desc min\">min</div><div class=\"desc\">sec</div>`\r\n\r\n        this.time = this.createDomNode(this.wrapper, 'div', 'timer')\r\n        this.time.textContent = '00.00'\r\n\r\n        this.appendElements()\r\n    }\r\n    createDomNode(node, elemHTML, classes) {\r\n        node = document.createElement(elemHTML)\r\n        node.classList.add(classes)\r\n        return node\r\n    }\r\n\r\n    appendElements() {\r\n        this.wrapper.append(this.desc)\r\n        this.wrapper.append(this.time)\r\n    }\r\n\r\n    renderTimer(container) {\r\n        container.append(this.wrapper)\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://course4/./src/js/timer.js?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;