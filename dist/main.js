/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ ;(() => {
    // webpackBootstrap
    /******/ 'use strict'
    /******/ var __webpack_modules__ = {
        /***/ './src/index.js':
            /*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
            /***/ (
                __unused_webpack_module,
                __webpack_exports__,
                __webpack_require__
            ) => {
                eval(
                    "__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _js_modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./js/modal */ \"./src/js/modal.js\");\n\r\n\r\nconst app = document.querySelector('.app');\r\n\r\nlet chosenLevel;\r\nlet move;\r\nlet gameTime;\r\nlet cards;\r\nlet chosenCard;\r\n\r\n// open choose-level-modal\r\nconst chooseLevelModal = new _js_modal__WEBPACK_IMPORTED_MODULE_0__.Modal('complexity-level_block');\r\nchooseLevelModal.buildModal('Выбери сложность');\r\n\r\n\r\nisGameStarted()\r\n\r\nfunction isGameStarted() {\r\n    if (!localStorage.getItem('level')) { let checkGameStart = setTimeout(isGameStarted, 500); } else {\r\n\r\n        if (localStorage.getItem('level') == 1) {\r\n            app.textContent = 'экран игры маленькая сложность'\r\n        } else if (localStorage.getItem('level') == 2) {\r\n            app.textContent = 'экран игры средняя сложность'\r\n        } else if (localStorage.getItem('level') == 3) {\r\n            app.textContent = 'экран игры сильно сложно'\r\n        }\r\n    }\r\n\r\n}\r\n\n\n//# sourceURL=webpack://course4/./src/index.js?"
                )

                /***/
            },

        /***/ './src/js/modal.js':
            /*!*************************!*\
  !*** ./src/js/modal.js ***!
  \*************************/
            /***/ (
                __unused_webpack_module,
                __webpack_exports__,
                __webpack_require__
            ) => {
                eval(
                    "__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Modal\": () => (/* binding */ Modal)\n/* harmony export */ });\nclass Modal {\r\n    constructor(...classes) {\r\n        this.classes = classes;\r\n        this.modal = '';\r\n        this.modalTitle = '';\r\n        this.modalContent = '';\r\n        this.modalBtn = '';\r\n        this.wrapper = '';\r\n    }\r\n\r\n    buildModal(title) {\r\n\r\n        this.wrapper = this.createDomNode(this.wrapper, 'div', 'modal_wrapper');\r\n\r\n        this.modal = this.createDomNode(this.modal, 'div', this.classes);\r\n        this.modal.classList.add('modal_block')\r\n\r\n        this.modalTitle = this.createDomNode(this.modalTitle, 'h2');\r\n        this.modalTitle.textContent = title;\r\n\r\n        if (this.modal.classList.contains('complexity-level_block')) {\r\n            this.modalTitle.classList.add('complexity-level_title');\r\n            this.modalContent = this.createDomNode(this.modalContent, 'form', 'complexity-level_choose');\r\n            this.modalContent.innerHTML = `<div class = \"error error__hidden\">Необходимо выбрать сложность</div><div class=\"complexity-level_options\">\r\n            <input type=\"radio\" name=\"complexity-level\" value=\"1\" id=\"complexity-level_easy\">\r\n            <label class=\"complexity-level_option\" for=\"complexity-level_easy\">1</label>\r\n            <input type=\"radio\" name=\"complexity-level\" value=\"2\" id=\"complexity-level_medium\">\r\n            <label class=\"complexity-level_option\" for=\"complexity-level_medium\">2</label>\r\n            <input type=\"radio\" name=\"complexity-level\" value=\"3\" id=\"complexity-level_hard\">\r\n            <label class=\"complexity-level_option\" for=\"complexity-level_hard\">3</label>\r\n            </div><button class=\"complexity-level_btn\">Старт</button>`\r\n        };\r\n\r\n        this.appendsModalElements();\r\n\r\n        this.openModal();\r\n\r\n        this.modalBtn = this.findBtn();\r\n\r\n        this.bindEvents();\r\n\r\n    }\r\n\r\n    createDomNode(node, elemHTML, classes) {\r\n        node = document.createElement(elemHTML);\r\n        if (classes) node.classList.add(classes);\r\n        return node\r\n    }\r\n\r\n    appendsModalElements() {\r\n        this.wrapper.append(this.modal);\r\n        this.modal.append(this.modalTitle)\r\n        this.modal.append(this.modalContent)\r\n    }\r\n\r\n    openModal() {\r\n        document.querySelector('.app').append(this.wrapper)\r\n    }\r\n\r\n    findBtn() {\r\n        return this.modal.querySelector('button')\r\n    }\r\n\r\n    bindEvents() {\r\n        this.modalBtn.addEventListener('click', (event) => {\r\n            event.preventDefault();\r\n            if (this.modal.querySelector('form')) {\r\n                const formData = new FormData(this.modal.querySelector('form'))\r\n                this.isLevelChosen(formData);\r\n                \r\n                \r\n            }else{\r\n                localStorage.clear();\r\n            };\r\n        })\r\n    }\r\n\r\n    isLevelChosen(data) {\r\n        if (data.get('complexity-level')== null) {\r\n            this.modal.querySelector('.error').classList.remove('error__hidden')\r\n        } else {\r\n            localStorage.setItem('level', data.get('complexity-level'));\r\n            this.closeModal()\r\n        }\r\n    }\r\n\r\n    closeModal() {\r\n        this.wrapper.remove()\r\n    }\r\n};\r\n\r\n\n\n//# sourceURL=webpack://course4/./src/js/modal.js?"
                )

                /***/
            },

        /******/
    }
    /************************************************************************/
    /******/ // The module cache
    /******/ var __webpack_module_cache__ = {}
    /******/
    /******/ // The require function
    /******/ function __webpack_require__(moduleId) {
        /******/ // Check if module is in cache
        /******/ var cachedModule = __webpack_module_cache__[moduleId]
        /******/ if (cachedModule !== undefined) {
            /******/ return cachedModule.exports
            /******/
        }
        /******/ // Create a new module (and put it into the cache)
        /******/ var module = (__webpack_module_cache__[moduleId] = {
            /******/ // no module.id needed
            /******/ // no module.loaded needed
            /******/ exports: {},
            /******/
        })
        /******/
        /******/ // Execute the module function
        /******/ __webpack_modules__[moduleId](
            module,
            module.exports,
            __webpack_require__
        )
        /******/
        /******/ // Return the exports of the module
        /******/ return module.exports
        /******/
    }
    /******/
    /************************************************************************/
    /******/ /* webpack/runtime/define property getters */
    /******/ ;(() => {
        /******/ // define getter functions for harmony exports
        /******/ __webpack_require__.d = (exports, definition) => {
            /******/ for (var key in definition) {
                /******/ if (
                    __webpack_require__.o(definition, key) &&
                    !__webpack_require__.o(exports, key)
                ) {
                    /******/ Object.defineProperty(exports, key, {
                        enumerable: true,
                        get: definition[key],
                    })
                    /******/
                }
                /******/
            }
            /******/
        }
        /******/
    })()
    /******/
    /******/ /* webpack/runtime/hasOwnProperty shorthand */
    /******/ ;(() => {
        /******/ __webpack_require__.o = (obj, prop) =>
            Object.prototype.hasOwnProperty.call(obj, prop)
        /******/
    })()
    /******/
    /******/ /* webpack/runtime/make namespace object */
    /******/ ;(() => {
        /******/ // define __esModule on exports
        /******/ __webpack_require__.r = (exports) => {
            /******/ if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
                /******/ Object.defineProperty(exports, Symbol.toStringTag, {
                    value: 'Module',
                })
                /******/
            }
            /******/ Object.defineProperty(exports, '__esModule', {
                value: true,
            })
            /******/
        }
        /******/
    })()
    /******/
    /************************************************************************/
    /******/
    /******/ // startup
    /******/ // Load entry module and return exports
    /******/ // This entry module can't be inlined because the eval devtool is used.
    /******/ var __webpack_exports__ = __webpack_require__('./src/index.js')
    /******/
    /******/
})()
