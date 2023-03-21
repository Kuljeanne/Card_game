export class Card {
    _suit: string
    _value: string
    _card: string
    _cardWrapper!: HTMLElement
    _top!: HTMLElement
    _center!: HTMLElement
    _bottom!: HTMLElement

    constructor(suit: string, value: string) {
        this._suit = suit
        this._value = value
        this._card = `${suit}:${value}`
    }

    build() {
        this._cardWrapper = this.createDomNode(this._cardWrapper, 'div', 'card')
        this._top = this.createDomNode(this._top, 'div', 'card_top')
        this._top.innerHTML = `<span>${this._value}</span><img class="suit-mini" src= "img/${this._suit}.svg" alt="${this._suit}">`
        this._center = this.createDomNode(this._top, 'div', 'card_center')
        this._center.innerHTML = `<img src="img/${this._suit}.svg" alt = "${this._card}">`
        this._bottom = this.createDomNode(this._top, 'div', 'card_bottom')
        this._bottom.innerHTML = `<span>${this._value}</span><img class="suit-mini" src= "img/${this._suit}.svg" alt="${this._suit}">`
        this.onclick()
        this.appendElements()
    }

    createDomNode(
        node: HTMLElement,
        elemHTML: string,
        classes?: string | string[]
    ): HTMLElement {
        node = document.createElement(elemHTML)
        node.classList.add(classes as string)

        return node
    }
    appendElements(): void {
        this._cardWrapper.append(this._top)
        this._cardWrapper.append(this._center)
        this._cardWrapper.append(this._bottom)
    }

    render(container: HTMLElement): void {
        container.append(this._cardWrapper)
    }

    onclick():void {
        this._cardWrapper.addEventListener('click', () => {
            if (this._cardWrapper.classList.contains('hidden')) {
                let back = this._cardWrapper.querySelector(
                    '.card-back'
                ) as HTMLElement
                back.remove()
                if (!localStorage.getItem('chosen-card')) {
                    localStorage.setItem('chosen-card', this._card)
                    this._cardWrapper.classList.remove('hidden')
                } else {
                    let timer: HTMLElement | null =
                        document.querySelector('.timer')
                    if (localStorage.getItem('chosen-card') !== this._card) {
                        document
                            .querySelectorAll('.card-back')
                            .forEach((elem) => elem.remove())
                        if (timer) {
                            let timeValue:string = '' + timer.textContent
                            localStorage.setItem('time', timeValue)
                        }
                        localStorage.setItem('result', 'loss')
                    } else {
                        localStorage.removeItem('chosen-card')
                        this._cardWrapper.classList.remove('hidden')
                        let hiddenCardsLeft:number =
                            document.querySelectorAll('.hidden').length
                        if (hiddenCardsLeft === 0) {
                            if (timer) {
                                let timeValue:string = '' + timer.textContent
                                localStorage.setItem('time', timeValue)
                            }
                            localStorage.setItem('result', 'win')
                        }
                    }
                }
            }
        })
    }
}
