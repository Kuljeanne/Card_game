/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/card.ts":
/*!************************!*\
  !*** ./src/js/card.ts ***!
  \************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Card = void 0;
class Card {
    constructor(suit, value) {
        this._suit = suit;
        this._value = value;
        this._card = `${suit}:${value}`;
    }
    build() {
        this._cardWrapper = this.createDomNode(this._cardWrapper, 'div', 'card');
        this._top = this.createDomNode(this._top, 'div', 'card_top');
        this._top.innerHTML = `<span>${this._value}</span><img class="suit-mini" src= "img/${this._suit}.svg" alt="${this._suit}">`;
        this._center = this.createDomNode(this._top, 'div', 'card_center');
        this._center.innerHTML = `<img src="img/${this._suit}.svg" alt = "${this._card}">`;
        this._bottom = this.createDomNode(this._top, 'div', 'card_bottom');
        this._bottom.innerHTML = `<span>${this._value}</span><img class="suit-mini" src= "img/${this._suit}.svg" alt="${this._suit}">`;
        this.onclick();
        this.appendElements();
    }
    createDomNode(node, elemHTML, classes) {
        node = document.createElement(elemHTML);
        node.classList.add(classes);
        return node;
    }
    appendElements() {
        this._cardWrapper.append(this._top);
        this._cardWrapper.append(this._center);
        this._cardWrapper.append(this._bottom);
    }
    render(container) {
        container.append(this._cardWrapper);
    }
    onclick() {
        this._cardWrapper.addEventListener('click', () => {
            if (this._cardWrapper.classList.contains('hidden')) {
                const back = this._cardWrapper.querySelector('.card-back');
                back.remove();
                if (!localStorage.getItem('chosen-card')) {
                    localStorage.setItem('chosen-card', this._card);
                    this._cardWrapper.classList.remove('hidden');
                }
                else {
                    const timer = document.querySelector('.timer');
                    if (localStorage.getItem('chosen-card') !== this._card) {
                        document
                            .querySelectorAll('.card-back')
                            .forEach((elem) => elem.remove());
                        if (timer) {
                            const timeValue = '' + timer.textContent;
                            localStorage.setItem('time', timeValue);
                        }
                        localStorage.setItem('result', 'loss');
                    }
                    else {
                        localStorage.removeItem('chosen-card');
                        this._cardWrapper.classList.remove('hidden');
                        const hiddenCardsLeft = document.querySelectorAll('.hidden').length;
                        if (hiddenCardsLeft === 0) {
                            if (timer) {
                                const timeValue = '' + timer.textContent;
                                localStorage.setItem('time', timeValue);
                            }
                            localStorage.setItem('result', 'win');
                        }
                    }
                }
            }
        });
    }
}
exports.Card = Card;


/***/ }),

/***/ "./src/js/madalFinal.ts":
/*!******************************!*\
  !*** ./src/js/madalFinal.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ModalFinal = void 0;
const modal_1 = __webpack_require__(/*! ./modal */ "./src/js/modal.ts");
class ModalFinal extends modal_1.Modal {
    constructor(classes, result) {
        super(classes);
        this._result = result;
    }
    buildModal(title) {
        this._wrapper = this.createDomNode(this._wrapper, 'div', 'modal_wrapper');
        this._modal = this.createDomNode(this._modal, 'div', this._classes);
        this._modal.classList.add('modal_block');
        this._icon = this.createDomNode(this._modal, 'div', `${this._result}`);
        this._icon.innerHTML = `<img src = "img/${this._result}.png" alt = "${this._result}">`;
        this._modal.append(this._icon);
        this._modalTitle = this.createDomNode(this._modalTitle, 'h2');
        this._modalTitle.textContent = title;
        this._modalContent = this.createDomNode(this._modalContent, 'div', 'game_data');
        this._modalContent.innerHTML = `<h3>Затраченное время</h3><p class = "time-spent">${localStorage.getItem('time')}</p>`;
        this.appendsModalElements();
        this._modalBtn = this.createDomNode(this._modal, 'button');
        this._modalBtn.textContent = 'Играть Снова';
        this._modal.append(this._modalBtn);
        this.bindEvents();
    }
}
exports.ModalFinal = ModalFinal;


/***/ }),

/***/ "./src/js/modal.ts":
/*!*************************!*\
  !*** ./src/js/modal.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Modal = void 0;
class Modal {
    constructor(classes) {
        this._classes = classes;
    }
    buildModal(title) {
        this._wrapper = this.createDomNode(this._wrapper, 'div', 'modal_wrapper');
        this._modal = this.createDomNode(this._modal, 'div', this._classes);
        this._modal.classList.add('modal_block');
        this._modalTitle = this.createDomNode(this._modalTitle, 'h2');
        this._modalTitle.textContent = title;
        if (this._modal.classList.contains('complexity-level_block')) {
            this._modalTitle.classList.add('complexity-level_title');
            this._modalContent = this.createDomNode(this._modalContent, 'form', 'complexity-level_choose');
            this._modalContent.innerHTML = `<div class = "error error__hidden">Необходимо выбрать сложность</div><div class="complexity-level_options">
            <input type="radio" name="complexity-level" value="1" id="complexity-level_easy">
            <label class="complexity-level_option" for="complexity-level_easy">1</label>
            <input type="radio" name="complexity-level" value="2" id="complexity-level_medium">
            <label class="complexity-level_option" for="complexity-level_medium">2</label>
            <input type="radio" name="complexity-level" value="3" id="complexity-level_hard">
            <label class="complexity-level_option" for="complexity-level_hard">3</label>
            </div><button class="complexity-level_btn">Старт</button>`;
        }
        this.appendsModalElements();
        this._modalBtn = this.findBtn();
        this.bindEvents();
    }
    createDomNode(node, elemHTML, classes) {
        node = document.createElement(elemHTML);
        if (classes)
            node.classList.add(classes);
        return node;
    }
    appendsModalElements() {
        this._wrapper.append(this._modal);
        this._modal.append(this._modalTitle);
        this._modal.append(this._modalContent);
    }
    openModal() {
        const app = document.querySelector('.app');
        if (app)
            app.append(this._wrapper);
    }
    findBtn() {
        return this._modal.querySelector('button');
    }
    bindEvents() {
        if (this._modalBtn) {
            this._modalBtn.addEventListener('click', (event) => {
                event.preventDefault();
                if (this._modal.querySelector('form')) {
                    const formData = new FormData(this._modal.querySelector('form'));
                    this.isLevelChosen(formData);
                }
                else {
                    localStorage.clear();
                    window.location.reload();
                }
            });
        }
    }
    isLevelChosen(data) {
        if (data.get('complexity-level') === null) {
            const error = this._modal.querySelector('.error');
            error.classList.remove('error__hidden');
        }
        else {
            const level = data.get('complexity-level');
            localStorage.setItem('level', level);
            this.closeModal();
        }
    }
    closeModal() {
        this._wrapper.remove();
    }
}
exports.Modal = Modal;


/***/ }),

/***/ "./src/js/timer.ts":
/*!*************************!*\
  !*** ./src/js/timer.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Timer = void 0;
class Timer {
    constructor() {
        this._min = 0;
        this._sec = 0;
        this._min = 0;
        this._sec = 0;
    }
    buildTimer() {
        this._wrapper = this.createDomNode(this._wrapper, 'div', 'timer_wrapper');
        this._desc = this.createDomNode(this._desc, 'div', 'time_desc');
        this._desc.innerHTML = `<div class="desc min">min</div><div class="desc">sec</div>`;
        this._time = this.createDomNode(this._time, 'div', 'timer');
        this._time.textContent = '00.00';
        this.appendElements();
    }
    createDomNode(node, elemHTML, classes) {
        node = document.createElement(elemHTML);
        node.classList.add(classes);
        return node;
    }
    appendElements() {
        this._wrapper.append(this._desc);
        this._wrapper.append(this._time);
    }
    renderTimer(container) {
        container.append(this._wrapper);
    }
    tick() {
        this._sec++;
        if (this._sec >= 60) {
            this._sec = 0;
            this._min++;
        }
        this._time.textContent = (this._min > 9 ? this._min : '0' + this._min) + ':' + (this._sec > 9 ? this._sec : '0' + this._sec);
        this.timer();
    }
    timer() {
        this._timerStart = setTimeout(this.tick.bind(this), 1000);
    }
    stop() {
        clearTimeout(this._timerStart);
    }
}
exports.Timer = Timer;


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
// This entry need to be wrapped in an IIFE because it need to be isolated against other entry modules.
(() => {
var exports = {};
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/

Object.defineProperty(exports, "__esModule", ({ value: true }));
//import '../styles/style.scss'
const modal_1 = __webpack_require__(/*! ./js/modal */ "./src/js/modal.ts");
const timer_1 = __webpack_require__(/*! ./js/timer */ "./src/js/timer.ts");
const card_1 = __webpack_require__(/*! ./js/card */ "./src/js/card.ts");
const madalFinal_1 = __webpack_require__(/*! ./js/madalFinal */ "./src/js/madalFinal.ts");
const app = document.querySelector('.app');
// open choose-level-modal
const chooseLevelModal = new modal_1.Modal('complexity-level_block');
chooseLevelModal.buildModal('Выбери сложность');
if (!localStorage.getItem('level')) {
    chooseLevelModal.openModal();
}
const timer = new timer_1.Timer();
const cardSuits = ['clubs', 'diamonds', 'hearts', 'spades'];
const cardValues = ['A', 'K', 'Q', 'J', '10', '9', '8', '7', '6'];
const allCards = [];
buildCards(cardSuits, cardValues, allCards);
let mixedCards = shuffle(allCards);
gameStart();
gameFinished();
function gameStart() {
    if (app) {
        if (!localStorage.getItem('level')) {
            setTimeout(gameStart, 500);
        }
        else {
            app.append(renderGameWrapper());
            const cards = document.querySelector('.game_field');
            if (localStorage.getItem('level') === '1') {
                mixedCards = shuffle(makeArrayOfPairs(mixedCards, 3));
            }
            else if (localStorage.getItem('level') === '2') {
                mixedCards = shuffle(makeArrayOfPairs(mixedCards, 6));
            }
            else if (localStorage.getItem('level') === '3') {
                mixedCards = shuffle(makeArrayOfPairs(mixedCards, 9));
            }
            mixedCards.forEach((card) => card.render(cards));
            setTimeout(() => {
                hideCards();
                timer.tick();
            }, 5000);
        }
    }
}
function renderGameWrapper() {
    const gameWrapper = createElem('div', 'game_wrapper');
    const toolsWrapper = createElem('div', 'tools_wrapper');
    timer.buildTimer();
    const buttonStartAgain = createElem('button', 'startAgain_btn');
    buttonStartAgain.textContent = 'Начать заново';
    buttonStartAgain.addEventListener('click', startAgain);
    const gameField = createElem('div', 'game_field');
    gameWrapper.append(toolsWrapper);
    timer.renderTimer(toolsWrapper);
    toolsWrapper.append(buttonStartAgain);
    gameWrapper.append(gameField);
    return gameWrapper;
}
function createElem(elemHTML, classes) {
    const node = document.createElement(elemHTML);
    node.classList.add(classes);
    return node;
}
function startAgain() {
    localStorage.clear();
    window.location.reload();
}
function buildCards(suits, values, array) {
    for (let i = 0; i < suits.length; i++) {
        for (let j = 0; j < values.length; j++) {
            const card = new card_1.Card(suits[i], values[j]);
            card.build();
            array.push(card);
        }
    }
}
function makeArrayOfPairs(array, length) {
    array.length = length;
    const cloneArray = [];
    array.forEach((item) => {
        const clone = new card_1.Card(item._suit, item._value);
        clone.build();
        cloneArray.push(clone);
    });
    return [array, cloneArray].flat();
}
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
function hideCards() {
    document.querySelectorAll('.card').forEach((card) => {
        card.classList.add('hidden');
        card.append(createBackCard());
    });
}
function createBackCard() {
    return createElem('div', 'card-back');
}
function gameFinished() {
    if (!localStorage.getItem('result')) {
        setTimeout(gameFinished, 500);
    }
    else {
        timer.stop();
        gameFinal();
    }
}
function gameFinal() {
    if (localStorage.getItem('result') === 'win') {
        const modal = new madalFinal_1.ModalFinal('result_block_win', 'win');
        modal.buildModal('Вы выиграли!');
        modal.openModal();
    }
    else {
        const modal = new madalFinal_1.ModalFinal('result_block_win', 'loss');
        modal.buildModal('Вы проиграли!');
        modal.openModal();
    }
}

})();

// This entry need to be wrapped in an IIFE because it need to be isolated against other entry modules.
(() => {
/*!***************************!*\
  !*** ./styles/style.scss ***!
  \***************************/
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin

})();

/******/ })()
;
//# sourceMappingURL=main.js.map