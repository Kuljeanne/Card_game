import { Modal } from './modal'

export class ModalFinal extends Modal {
    _icon!: HTMLElement
    _result!: string
    // _modal!: HTMLElement
    // _modalTitle!: HTMLElement
    // _modalContent!: HTMLElement
    // _modalBtn!: HTMLElement | null
    // _wrapper!: HTMLElement

    constructor(classes: string, result: string) {
        super(classes)
        this._result = result
    }
    buildModal(title: string) {
        this._wrapper = this.createDomNode(
            this._wrapper,
            'div',
            'modal_wrapper'
        )

        this._modal = this.createDomNode(this._modal, 'div', this._classes)
        this._modal.classList.add('modal_block')

        this._icon = this.createDomNode(this._modal, 'div', `${this._result}`)
        this._icon.innerHTML = `<img src = "img/${this._result}.svg" alt = "${this._result}">`
        this._modal.append(this._icon)

        this._modalTitle = this.createDomNode(this._modalTitle, 'h2')
        this._modalTitle.textContent = title

        this._modalContent = this.createDomNode(
            this._modalContent,
            'div',
            'game_data'
        )
        this._modalContent.innerHTML= `<h3>Затраченное время</h3><p class = "time-spent">${localStorage.getItem('time')}</p>`

        this.appendsModalElements()

        this._modalBtn = this.createDomNode(this._modal, 'button')
        this._modalBtn.textContent = 'Играть Снова'
        this._modal.append(this._modalBtn) 

        this.bindEvents()
    }
    

}
