export class Card {
    constructor() {
        this.card = ''
        this.top = ''
        this.center = ''
        this.bottom = ''
    }

    build(suit, value) {
        this.card = this.createDomNode(this.card, 'div', 'card')
        this.top = this.createDomNode(this.top, 'div', 'card_top')
        this.top.innerHTML = `<span>${value}</span><img class="suit-mini" src= "../src/img/${suit}.svg" alt="${suit}">`
        this.center = this.createDomNode(this.top, 'img', 'card_center')
        this.center.src = `../src/img/${suit}.svg`
        this.center.alt = `${suit}:${value}`
        this.bottom = this.createDomNode(this.top, 'div', 'card_bottom')
        this.bottom.innerHTML = `<span>${value}</span><img class="suit-mini" src= "../src/img/${suit}.svg" alt="${suit}">`

        this.appendElements()
    }

    createDomNode(node, elemHTML, classes) {
        node = document.createElement(elemHTML)
        node.classList.add(classes)
        return node
    }
    appendElements() {
        this.card.append(this.top)
        this.card.append(this.center)
        this.card.append(this.bottom)
    }

    render(container){
        container.append(this.card)
    }
}
