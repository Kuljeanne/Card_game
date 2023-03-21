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
    constructor() {
        this.card = '';
        this.cardWrapper = '';
        this.top = '';
        this.center = '';
        this.bottom = '';
    }
    build(suit, value) {
        this.suit = suit;
        this.value = value;
        this.card = `${suit}:${value}`;
        this.cardWrapper = this.createDomNode(this.cardWrapper, 'div', 'card');
        this.top = this.createDomNode(this.top, 'div', 'card_top');
        this.top.innerHTML = `<span>${value}</span><img class="suit-mini" src= "img/${suit}.svg" alt="${suit}">`;
        this.center = this.createDomNode(this.top, 'img', 'card_center');
        this.center.src = `img/${suit}.svg`;
        this.center.alt = `${suit}:${value}`;
        this.bottom = this.createDomNode(this.top, 'div', 'card_bottom');
        this.bottom.innerHTML = `<span>${value}</span><img class="suit-mini" src= "img/${suit}.svg" alt="${suit}">`;
        this.onclick();
        this.appendElements();
    }
    createDomNode(node, elemHTML, classes) {
        node = document.createElement(elemHTML);
        node.classList.add(classes);
        return node;
    }
    appendElements() {
        this.cardWrapper.append(this.top);
        this.cardWrapper.append(this.center);
        this.cardWrapper.append(this.bottom);
    }
    render(container) {
        container.append(this.cardWrapper);
    }
    onclick() {
        this.cardWrapper.addEventListener('click', () => {
            if (this.cardWrapper.classList.contains('hidden')) {
                this.cardWrapper.querySelector('.card-back').remove();
                if (!localStorage.getItem('chosen-card')) {
                    localStorage.setItem('chosen-card', this.card);
                    this.cardWrapper.classList.remove('hidden');
                }
                else {
                    if (localStorage.getItem('chosen-card') !== this.card) {
                        document
                            .querySelectorAll('.card-back')
                            .forEach((elem) => elem.remove());
                        localStorage.setItem('time', document.querySelector('.timer').textContent);
                        setTimeout(() => {
                            alert('Вы проиграли');
                        }, 200);
                    }
                    else {
                        localStorage.removeItem('chosen-card');
                        this.cardWrapper.classList.remove('hidden');
                        let hiddenCardsLeft = document.querySelectorAll('.hidden').length;
                        if (hiddenCardsLeft === 0) {
                            localStorage.setItem('time', document.querySelector('.timer').textContent);
                            setTimeout(() => {
                                alert('Вы выиграли');
                            }, 200);
                        }
                    }
                }
            }
        });
    }
}
exports.Card = Card;


/***/ }),

/***/ "./src/js/modal.ts":
/*!*************************!*\
  !*** ./src/js/modal.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Modal = void 0;
class Modal {
    constructor(...classes) {
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
                }
            });
        }
    }
    isLevelChosen(data) {
        if (data.get('complexity-level') === null) {
            let error = this._modal.querySelector('.error');
            error.classList.remove('error__hidden');
        }
        else {
            localStorage.setItem('level', data.get('complexity-level'));
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
        this.wrapper = '';
        this.desc = '';
        this.time = '';
        this.min = 0;
        this.sec = 0;
    }
    buildTimer() {
        this.wrapper = this.createDomNode(this.wrapper, 'div', 'timer_wrapper');
        this.desc = this.createDomNode(this.desc, 'div', 'time_desc');
        this.desc.innerHTML = `<div class="desc min">min</div><div class="desc">sec</div>`;
        this.time = this.createDomNode(this.time, 'div', 'timer');
        this.time.textContent = '00.00';
        this.appendElements();
    }
    createDomNode(node, elemHTML, classes) {
        node = document.createElement(elemHTML);
        node.classList.add(classes);
        return node;
    }
    appendElements() {
        this.wrapper.append(this.desc);
        this.wrapper.append(this.time);
    }
    renderTimer(container) {
        container.append(this.wrapper);
    }
    tick() {
        this.sec++;
        if (this.sec >= 60) {
            this.sec = 0;
            this.min++;
        }
        this.time.textContent = (this.min > 9 ? this.min : '0' + this.min) + ':' + (this.sec > 9 ? this.sec : '0' + this.sec);
        this.timer();
    }
    timer() {
        this.t = setTimeout(this.tick.bind(this), 1000);
        return this.t;
    }
    stop() {
        clearTimeout(this.t);
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
isGameStarted();
function isGameStarted() {
    if (!localStorage.getItem('level')) {
        setTimeout(isGameStarted, 500);
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
function renderGameWrapper() {
    const gameWrapper = createElem('gameWrapper', 'div', 'game_wrapper');
    const toolsWrapper = createElem('toolsWrapper', 'div', 'tools_wrapper');
    timer.buildTimer();
    const buttonStartAgain = createElem('buttonStartAgain', 'button', 'startAgain_btn');
    buttonStartAgain.textContent = 'Начать заново';
    buttonStartAgain.addEventListener('click', startAgain);
    const gameField = createElem('gameField', 'div', 'game_field');
    gameWrapper.append(toolsWrapper);
    timer.renderTimer(toolsWrapper);
    toolsWrapper.append(buttonStartAgain);
    gameWrapper.append(gameField);
    return gameWrapper;
}
function createElem(node, elemHTML, classes) {
    node = document.createElement(elemHTML);
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
            const card = new card_1.Card();
            card.build(suits[i], values[j]);
            array.push(card);
        }
    }
}
function makeArrayOfPairs(array, length) {
    array.length = length;
    let cloneArray = [];
    array.forEach((item) => {
        let clone = new card_1.Card();
        clone.build(item.suit, item.value);
        cloneArray.push(clone);
    });
    return [array, cloneArray].flat();
}
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
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
    return createElem('back', 'div', 'card-back');
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