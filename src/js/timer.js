export class Timer {
    constructor() {
        this.wrapper = ''
        this.desc = ''
        this.time = ''
        this.min = 0
        this.sec = 0
    }

    buildTimer() {
        this.wrapper = this.createDomNode(this.wrapper, 'div', 'timer_wrapper')

        this.desc = this.createDomNode(this.desc, 'div', 'time_desc')
        this.desc.innerHTML = `<div class="desc min">min</div><div class="desc">sec</div>`

        this.time = this.createDomNode(this.time, 'div', 'timer')
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

    tick() {

        this.sec++
        if (this.sec >= 60) {
            this.sec = 0
            this.min++
        }
        
        this.time.textContent = (this.min > 9 ? this.min : '0' + this.min) + ':' +  (this.sec > 9 ? this.sec : '0' + this.sec)
        this.timer()
    }

    timer() {
       this.t = setTimeout(this.tick.bind(this), 1000)
       return this.t
    }

    stop(){
        clearTimeout(this.t)
    }
}
