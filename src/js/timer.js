export class Timer {
    constructor() {
        this.wrapper = ''
        this.desc = ''
        this.time = ''
    }

    buildTimer() {
        this.wrapper = this.createDomNode(this.wrapper, 'div', 'timer_wrapper')

        this.desc = this.createDomNode(this.wrapper, 'div', 'time_desc')
        this.desc.innerHTML = `<div class="desc min">min</div><div class="desc">sec</div>`

        this.time = this.createDomNode(this.wrapper, 'div', 'timer')
        this.time.textContent = '00.00'

        this.appendElements()
    }
    createDomNode(node, elemHTML, classes) {
        node = document.createElement(elemHTML)
        node.classList.add(classes)
        return node
    }

    appendElements() {
        this.wrapper.append(this.desc)
        this.wrapper.append(this.time)
    }

    renderTimer(container) {
        container.append(this.wrapper)
    }
}
