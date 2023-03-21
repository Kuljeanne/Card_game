//import '../styles/style.scss'
import { Modal } from './js/modal'
import { Timer } from './js/timer'
import { Card } from './js/card'

const app: HTMLElement | null = document.querySelector('.app')

// open choose-level-modal
const chooseLevelModal = new Modal('complexity-level_block')
chooseLevelModal.buildModal('Выбери сложность')

if (!localStorage.getItem('level')) {
    chooseLevelModal.openModal()
}

const timer: Timer = new Timer()

const cardSuits: string[] = ['clubs', 'diamonds', 'hearts', 'spades']
const cardValues: string[] = ['A', 'K', 'Q', 'J', '10', '9', '8', '7', '6']
const allCards: Modal[] = []
buildCards(cardSuits, cardValues, allCards)
let mixedCards: Modal[] = shuffle(allCards)

isGameStarted()

function isGameStarted() {
    if (!localStorage.getItem('level')) {
        setTimeout(isGameStarted, 500)
    } else {
        app.append(renderGameWrapper())
        const cards = document.querySelector('.game_field')
        if (localStorage.getItem('level') === '1') {
            mixedCards = shuffle(makeArrayOfPairs(mixedCards, 3))
        } else if (localStorage.getItem('level') === '2') {
            mixedCards = shuffle(makeArrayOfPairs(mixedCards, 6))
        } else if (localStorage.getItem('level') === '3') {
            mixedCards = shuffle(makeArrayOfPairs(mixedCards, 9))
        }
        mixedCards.forEach((card) => card.render(cards))
        setTimeout(() => {
            hideCards()
            timer.tick()
        }, 5000)
    }
}

function renderGameWrapper() {
    const gameWrapper = createElem('gameWrapper', 'div', 'game_wrapper')
    const toolsWrapper = createElem('toolsWrapper', 'div', 'tools_wrapper')

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

function buildCards(suits, values, array) {
    for (let i = 0; i < suits.length; i++) {
        console.log(suits[i])
        for (let j = 0; j < values.length; j++) {
            const card = new Card(suits[i], values[j])
            card.build()
            console.log(card.build())
            array.push(card)
        }
    }
}
function makeArrayOfPairs(array, length) {
    array.length = length
    let cloneArray = []
    array.forEach((item) => {
        let clone = new Card(item.suit, item.value)
        clone.build()
        cloneArray.push(clone)
        console.log(clone)
    })

    return [array, cloneArray].flat()
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1))
        ;[array[i], array[j]] = [array[j], array[i]]
    }
    return array
}

function hideCards() {
    document.querySelectorAll('.card').forEach((card) => {
        card.classList.add('hidden')
        card.append(createBackCard())
    })
}

function createBackCard() {
    return createElem('back', 'div', 'card-back')
}
