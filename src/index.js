import { Modal } from './js/modal'
import { Timer } from './js/timer'
import { Card } from './js/card'

const app = document.querySelector('.app')

const cardSuits = ['clubs', 'diamonds', 'hearts', 'spades']
const cardValues = ['A', 'K', 'Q', 'J', '10', '9', '8', '7', '6']

// open choose-level-modal
const chooseLevelModal = new Modal('complexity-level_block')
chooseLevelModal.buildModal('Выбери сложность')

if (!localStorage.getItem('level')) {
    chooseLevelModal.openModal()
}

isGameStarted()

function isGameStarted() {
    if (!localStorage.getItem('level')) {
        setTimeout(isGameStarted, 500)
    } else {
        app.append(renderGameWrapper())
        const cards = document.querySelector('.game_field')
        renderCards(cardSuits, cardValues, cards)

        if (localStorage.getItem('level') === '1') {
            console.log(cards)
        } else if (localStorage.getItem('level') === '2') {
            console.log(cards)
        } else if (localStorage.getItem('level') === '3') {
            console.log(cards)
        }
    }
}

function renderGameWrapper() {
    const gameWrapper = createElem('gameWrapper', 'div', 'game_wrapper')
    const toolsWrapper = createElem('toolsWrapper', 'div', 'tools_wrapper')
    const timer = new Timer()
    timer.buildTimer()
    const buttonStartAgain = createElem(
        'buttonStartAgain',
        'button',
        'startAgain_btn'
    )
    buttonStartAgain.textContent = 'Начать заново'
    buttonStartAgain.addEventListener('click', startAgain)
    const gameField = createElem('gameField', 'div', 'game_field')
    gameWrapper.append(toolsWrapper)
    timer.renderTimer(toolsWrapper)
    toolsWrapper.append(buttonStartAgain)
    gameWrapper.append(gameField)

    return gameWrapper
}

function createElem(node, elemHTML, classes) {
    node = document.createElement(elemHTML)
    node.classList.add(classes)
    return node
}
function startAgain() {
    localStorage.clear()
    window.location.reload()
}

function renderCards(suits, values, container) {
    for (let i = 0; i < suits.length; i++) {
        for (let j = 0; j < values.length; j++) {
            const card = new Card()

            card.build(suits[i], values[j])
            card.render(container)
        }
    }
}
