export class Card {
    constructor() {
        this.card = ''
        this.cardWrapper = ''
        this.top = ''
        this.center = ''
        this.bottom = ''
    }

    build(suit, value) {
        this.suit = suit
        this.value = value
        this.card = `${suit}:${value}`
        this.cardWrapper = this.createDomNode(this.cardWrapper, 'div', 'card')
        this.top = this.createDomNode(this.top, 'div', 'card_top')
        this.top.innerHTML = `<span>${value}</span><img class="suit-mini" src= "img/${suit}.svg" alt="${suit}">`
        this.center = this.createDomNode(this.top, 'img', 'card_center')
        this.center.src = `img/${suit}.svg`
        this.center.alt = `${suit}:${value}`
        this.bottom = this.createDomNode(this.top, 'div', 'card_bottom')
        this.bottom.innerHTML = `<span>${value}</span><img class="suit-mini" src= "img/${suit}.svg" alt="${suit}">`
        this.onclick()
        this.appendElements()
    }

    createDomNode(node, elemHTML, classes) {
        node = document.createElement(elemHTML)
        node.classList.add(classes)
        return node
    }
    appendElements() {
        this.cardWrapper.append(this.top)
        this.cardWrapper.append(this.center)
        this.cardWrapper.append(this.bottom)
    }

    render(container) {
        container.append(this.cardWrapper)
    }

    onclick() {
        this.cardWrapper.addEventListener('click', () => {
            if (this.cardWrapper.classList.contains('hidden')) {
                this.cardWrapper.querySelector('.card-back').remove()
                if (!localStorage.getItem('chosen-card')) {
                    localStorage.setItem('chosen-card', this.card)
                    this.cardWrapper.classList.remove('hidden')
                } else {
                    if (localStorage.getItem('chosen-card') !== this.card) {
                        document
                            .querySelectorAll('.card-back')
                            .forEach((elem) => elem.remove())
                        localStorage.setItem(
                            'time',
                            document.querySelector('.timer').textContent
                        )
                        setTimeout(() => {
                            alert('Вы проиграли')
                        }, 200)
                    } else {
                        localStorage.removeItem('chosen-card')
                        this.cardWrapper.classList.remove('hidden')
                        let hiddenCardsLeft =
                            document.querySelectorAll('.hidden').length
                        if (hiddenCardsLeft === 0) {
                            localStorage.setItem(
                                'time',
                                document.querySelector('.timer').textContent
                            )
                            setTimeout(() => {
                                alert('Вы выиграли')
                            }, 200)
                        }
                    }
                }
            }
        })
    }
}
