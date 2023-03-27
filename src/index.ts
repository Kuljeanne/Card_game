//import '../styles/style.scss'
import { Modal } from './js/modal'
import { Timer } from './js/timer'
import { Card } from './js/card'
import { ModalFinal } from './js/madalFinal'

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
const allCards: Card[] = []
buildCards(cardSuits, cardValues, allCards)
let mixedCards: Card[] = shuffle(allCards)

gameStart()

gameFinished()

function gameStart() {
    if (app) {
        if (!localStorage.getItem('level')) {
            setTimeout(gameStart, 500)
        } else {
            app.append(renderGameWrapper())
            const cards: HTMLElement | null =
                document.querySelector('.game_field')
            if (localStorage.getItem('level') === '1') {
                mixedCards = shuffle(makeArrayOfPairs(mixedCards, 3))
            } else if (localStorage.getItem('level') === '2') {
                mixedCards = shuffle(makeArrayOfPairs(mixedCards, 6))
            } else if (localStorage.getItem('level') === '3') {
                mixedCards = shuffle(makeArrayOfPairs(mixedCards, 9))
            }
            mixedCards.forEach((card) => card.render(cards as HTMLElement))
            setTimeout(() => {
                hideCards()
                timer.tick()
            }, 5000)
        }
    }
}

function renderGameWrapper() {
    const gameWrapper = createElem('div', 'game_wrapper')
    const toolsWrapper = createElem('div', 'tools_wrapper')

    timer.buildTimer()

    const buttonStartAgain = createElem('button', 'startAgain_btn')
    buttonStartAgain.textContent = 'Начать заново'
    buttonStartAgain.addEventListener('click', startAgain)
    const gameField = createElem('div', 'game_field')
    gameWrapper.append(toolsWrapper)
    timer.renderTimer(toolsWrapper)

    toolsWrapper.append(buttonStartAgain)
    gameWrapper.append(gameField)

    return gameWrapper
}

function createElem(elemHTML: string, classes: string): HTMLElement {
    const node: HTMLElement = document.createElement(elemHTML)
    node.classList.add(classes)
    return node
}
function startAgain(): void {
    localStorage.clear()
    window.location.reload()
}

function buildCards(suits: string[], values: string[], array: Card[]): void {
    for (let i = 0; i < suits.length; i++) {
        for (let j = 0; j < values.length; j++) {
            const card = new Card(suits[i], values[j])
            card.build()
            array.push(card)
        }
    }
}
function makeArrayOfPairs(array: Card[], length: number): Card[] {
    array.length = length
    const cloneArray: Card[] = []
    array.forEach((item) => {
        const clone: Card = new Card(item._suit, item._value)
        clone.build()
        cloneArray.push(clone)
    })

    return [array, cloneArray].flat()
}

function shuffle(array: Card[]): Card[] {
    for (let i: number = array.length - 1; i > 0; i--) {
        const j: number = Math.floor(Math.random() * (i + 1))
        ;[array[i], array[j]] = [array[j], array[i]]
    }
    return array
}

function hideCards(): void {
    document.querySelectorAll('.card').forEach((card) => {
        card.classList.add('hidden')
        card.append(createBackCard())
    })
}

function createBackCard(): HTMLElement {
    return createElem('div', 'card-back')
}

function gameFinished(): void {
    if (!localStorage.getItem('result')) {
        setTimeout(gameFinished, 500)
    } else {
        timer.stop()
        gameFinal()
    }
}

function gameFinal(): void {
    if (localStorage.getItem('result') === 'win') {
        const modal = new ModalFinal('result_block_win', 'win')
        modal.buildModal('Вы выиграли!')
        modal.openModal()
    } else {
        const modal = new ModalFinal('result_block_win', 'loss')
        modal.buildModal('Вы проиграли!')
        modal.openModal()
    }
}
