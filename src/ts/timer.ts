export class Timer {
        _wrapper!: HTMLElement
        _desc!: HTMLElement
        _time!: HTMLElement
        _min = 0
        _sec = 0
        _timerStart!: ReturnType<typeof setTimeout>

    constructor() {
        this._min = 0
        this._sec = 0
    }

    buildTimer() {
        this._wrapper = this.createDomNode(this._wrapper, 'div', 'timer_wrapper')

        this._desc = this.createDomNode(this._desc, 'div', 'time_desc')
        this._desc.innerHTML = `<div class="desc min">min</div><div class="desc">sec</div>`

        this._time = this.createDomNode(this._time, 'div', 'timer')
        this._time.textContent = '00.00'
       
        this.appendElements()

    }

    createDomNode(node: HTMLElement, elemHTML:string, classes:string): HTMLElement {
        node = document.createElement(elemHTML)
        node.classList.add(classes)
        return node
    }

    appendElements():void {
        this._wrapper.append(this._desc)
        this._wrapper.append(this._time)
    }

    renderTimer(container: HTMLElement):void {
        container.append(this._wrapper)
    }

    tick():void {
        this._sec++
        if (this._sec >= 60) {
            this._sec = 0
            this._min++
        }
        
        this._time.textContent = (this._min > 9 ? this._min : '0' + this._min) + ':' +  (this._sec > 9 ? this._sec : '0' + this._sec)
        this.timer()
    }

    timer():void {
       this._timerStart = setTimeout(this.tick.bind(this), 1000)

    }

    stop():void{
        clearTimeout(this._timerStart)
    }
}
