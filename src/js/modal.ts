export class Modal {
    _classes: string[]
    _modal!: HTMLElement
    _modalTitle!: HTMLElement
    _modalContent!: HTMLElement
    _modalBtn!: HTMLElement | null
    _wrapper!: HTMLElement

    constructor(...classes: string[]) {
        this._classes = classes
    }

    buildModal(title: string) {
        this._wrapper = this.createDomNode(
            this._wrapper,
            'div',
            'modal_wrapper'
        )

        this._modal = this.createDomNode(this._modal, 'div', this._classes)
        this._modal.classList.add('modal_block')

        this._modalTitle = this.createDomNode(this._modalTitle, 'h2')
        this._modalTitle.textContent = title

        if (this._modal.classList.contains('complexity-level_block')) {
            this._modalTitle.classList.add('complexity-level_title')
            this._modalContent = this.createDomNode(
                this._modalContent,
                'form',
                'complexity-level_choose'
            )
            this._modalContent.innerHTML = `<div class = "error error__hidden">Необходимо выбрать сложность</div><div class="complexity-level_options">
            <input type="radio" name="complexity-level" value="1" id="complexity-level_easy">
            <label class="complexity-level_option" for="complexity-level_easy">1</label>
            <input type="radio" name="complexity-level" value="2" id="complexity-level_medium">
            <label class="complexity-level_option" for="complexity-level_medium">2</label>
            <input type="radio" name="complexity-level" value="3" id="complexity-level_hard">
            <label class="complexity-level_option" for="complexity-level_hard">3</label>
            </div><button class="complexity-level_btn">Старт</button>`
        }

        this.appendsModalElements()

        this._modalBtn = this.findBtn()

        this.bindEvents()
    }

    createDomNode(node: HTMLElement, elemHTML:string, classes?:string | string[]): HTMLElement {
        node = document.createElement(elemHTML)
        if (classes) node.classList.add(classes as string)
        return node
    }

    appendsModalElements() {
        this._wrapper.append(this._modal)
        this._modal.append(this._modalTitle)
        this._modal.append(this._modalContent)
    }

    openModal() {
        const app: HTMLElement | null = document.querySelector('.app')
        if (app) app.append(this._wrapper)
    }

    findBtn() {
        return this._modal.querySelector('button')
    }

    bindEvents() {
        if (this._modalBtn) {
            this._modalBtn.addEventListener('click', (event) => {
                event.preventDefault()
                if (this._modal.querySelector('form')) {
                    const formData = new FormData(
                        this._modal.querySelector('form') as HTMLFormElement
                    )
                    this.isLevelChosen(formData)
                } else {
                    localStorage.clear()
                }
            })
        }
    }

    isLevelChosen(data: FormData) {
        if (data.get('complexity-level') === null) {
            let error = this._modal.querySelector('.error') as HTMLElement
            error.classList.remove('error__hidden')
        } else {
            let level: File | string | null = data.get('complexity-level')
            localStorage.setItem('level', level as string)
            this.closeModal()
        }
    }

    closeModal() {
        this._wrapper.remove()
    }
}
