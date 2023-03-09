import { Modal } from './js/modal'

const app = document.querySelector('.app')

// open choose-level-modal
const chooseLevelModal = new Modal('complexity-level_block')
chooseLevelModal.buildModal('Выбери сложность')

isGameStarted()

function isGameStarted() {
    if (!localStorage.getItem('level')) {
        setTimeout(isGameStarted, 500)
    } else {
        if (localStorage.getItem('level') === '1') {
            app.textContent = 'экран игры маленькая сложность'
        } else if (localStorage.getItem('level') === '2') {
            app.textContent = 'экран игры средняя сложность'
        } else if (localStorage.getItem('level') === '3') {
            app.textContent = 'экран игры сильно сложно'
        }
    }
}
