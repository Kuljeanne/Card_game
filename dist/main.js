/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/card.js":
/*!************************!*\
  !*** ./src/js/card.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Card": () => (/* binding */ Card)
/* harmony export */ });
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
        } else {
          if (localStorage.getItem('chosen-card') !== this.card) {
            document.querySelectorAll('.card-back').forEach(elem => elem.remove());
            setTimeout(() => {
              alert('Вы проиграли');
            }, 500);
          } else {
            localStorage.removeItem('chosen-card');
            this.cardWrapper.classList.remove('hidden');
            let hiddenCardsLeft = document.querySelectorAll('.hidden').length;
            if (hiddenCardsLeft === 0) {
              setTimeout(() => {
                alert('Вы выиграли');
              }, 500);
            }
          }
        }
      }
    });
  }
}

/***/ }),

/***/ "./src/js/modal.js":
/*!*************************!*\
  !*** ./src/js/modal.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Modal": () => (/* binding */ Modal)
/* harmony export */ });
class Modal {
  constructor() {
    for (var _len = arguments.length, classes = new Array(_len), _key = 0; _key < _len; _key++) {
      classes[_key] = arguments[_key];
    }
    this.classes = classes;
    this.modal = '';
    this.modalTitle = '';
    this.modalContent = '';
    this.modalBtn = '';
    this.wrapper = '';
  }
  buildModal(title) {
    this.wrapper = this.createDomNode(this.wrapper, 'div', 'modal_wrapper');
    this.modal = this.createDomNode(this.modal, 'div', this.classes);
    this.modal.classList.add('modal_block');
    this.modalTitle = this.createDomNode(this.modalTitle, 'h2');
    this.modalTitle.textContent = title;
    if (this.modal.classList.contains('complexity-level_block')) {
      this.modalTitle.classList.add('complexity-level_title');
      this.modalContent = this.createDomNode(this.modalContent, 'form', 'complexity-level_choose');
      this.modalContent.innerHTML = `<div class = "error error__hidden">Необходимо выбрать сложность</div><div class="complexity-level_options">
            <input type="radio" name="complexity-level" value="1" id="complexity-level_easy">
            <label class="complexity-level_option" for="complexity-level_easy">1</label>
            <input type="radio" name="complexity-level" value="2" id="complexity-level_medium">
            <label class="complexity-level_option" for="complexity-level_medium">2</label>
            <input type="radio" name="complexity-level" value="3" id="complexity-level_hard">
            <label class="complexity-level_option" for="complexity-level_hard">3</label>
            </div><button class="complexity-level_btn">Старт</button>`;
    }
    this.appendsModalElements();
    this.modalBtn = this.findBtn();
    this.bindEvents();
  }
  createDomNode(node, elemHTML, classes) {
    node = document.createElement(elemHTML);
    if (classes) node.classList.add(classes);
    return node;
  }
  appendsModalElements() {
    this.wrapper.append(this.modal);
    this.modal.append(this.modalTitle);
    this.modal.append(this.modalContent);
  }
  openModal() {
    document.querySelector('.app').append(this.wrapper);
  }
  findBtn() {
    return this.modal.querySelector('button');
  }
  bindEvents() {
    this.modalBtn.addEventListener('click', event => {
      event.preventDefault();
      if (this.modal.querySelector('form')) {
        const formData = new FormData(this.modal.querySelector('form'));
        this.isLevelChosen(formData);
      } else {
        localStorage.clear();
      }
    });
  }
  isLevelChosen(data) {
    if (data.get('complexity-level') === null) {
      this.modal.querySelector('.error').classList.remove('error__hidden');
    } else {
      localStorage.setItem('level', data.get('complexity-level'));
      this.closeModal();
    }
  }
  closeModal() {
    this.wrapper.remove();
  }
}

/***/ }),

/***/ "./src/js/timer.js":
/*!*************************!*\
  !*** ./src/js/timer.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Timer": () => (/* binding */ Timer)
/* harmony export */ });
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
    this.desc = this.createDomNode(this.wrapper, 'div', 'time_desc');
    this.desc.innerHTML = `<div class="desc min">min</div><div class="desc">sec</div>`;
    this.time = this.createDomNode(this.wrapper, 'div', 'timer');
    this.time.textContent = '00.05';
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
}

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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other entry modules.
(() => {
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _js_modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./js/modal */ "./src/js/modal.js");
/* harmony import */ var _js_timer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./js/timer */ "./src/js/timer.js");
/* harmony import */ var _js_card__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./js/card */ "./src/js/card.js");
//import '../styles/style.scss'



const app = document.querySelector('.app');

// open choose-level-modal
const chooseLevelModal = new _js_modal__WEBPACK_IMPORTED_MODULE_0__.Modal('complexity-level_block');
chooseLevelModal.buildModal('Выбери сложность');
if (!localStorage.getItem('level')) {
  chooseLevelModal.openModal();
}
const cardSuits = ['clubs', 'diamonds', 'hearts', 'spades'];
const cardValues = ['A', 'K', 'Q', 'J', '10', '9', '8', '7', '6'];
const allCards = [];
buildCards(cardSuits, cardValues, allCards);
let mixedCards = shuffle(allCards);
isGameStarted();
function isGameStarted() {
  if (!localStorage.getItem('level')) {
    setTimeout(isGameStarted, 500);
  } else {
    app.append(renderGameWrapper());
    const cards = document.querySelector('.game_field');
    if (localStorage.getItem('level') === '1') {
      mixedCards = shuffle(makeArrayOfPairs(mixedCards, 3));
    } else if (localStorage.getItem('level') === '2') {
      mixedCards = shuffle(makeArrayOfPairs(mixedCards, 6));
    } else if (localStorage.getItem('level') === '3') {
      mixedCards = shuffle(makeArrayOfPairs(mixedCards, 9));
    }
    mixedCards.forEach(card => card.render(cards));
    setTimeout(hideCards, 5000);
  }
}
function renderGameWrapper() {
  const gameWrapper = createElem('gameWrapper', 'div', 'game_wrapper');
  const toolsWrapper = createElem('toolsWrapper', 'div', 'tools_wrapper');
  const timer = new _js_timer__WEBPACK_IMPORTED_MODULE_1__.Timer();
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
      const card = new _js_card__WEBPACK_IMPORTED_MODULE_2__.Card();
      card.build(suits[i], values[j]);
      array.push(card);
    }
  }
}
function makeArrayOfPairs(array, length) {
  array.length = length;
  let cloneArray = [];
  array.forEach(item => {
    let clone = new _js_card__WEBPACK_IMPORTED_MODULE_2__.Card();
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
  document.querySelectorAll('.card').forEach(card => {
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