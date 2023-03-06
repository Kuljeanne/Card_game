class Modal {
    constructor(...classes) {
        this.classes = classes;
        this.modal = '';
        this.modalTitle = '';
        this.modalContent = '';
        this.modalBtn = '';
        this.wrapper = '';
    }

    buildModal(title) {

        this.wrapper = this.createDomNode(this.wrapper, 'div', 'modal_wrapper');

        this.modal = this.createDomNode(this.modal, 'div', this.classes);
        this.modal.classList.add('modal_block')

        this.modalTitle = this.createDomNode(this.modalTitle, 'h2');
        this.modalTitle.textContent = title;

        if (this.modal.classList.contains('complexity-level_block')) {
            this.modalTitle.classList.add('complexity-level_title');
            this.modalContent = this.createDomNode(this.modalContent, 'form', 'complexity-level_choose');
            this.modalContent.innerHTML = `<div class = "error error__hidden">Необходимо выбрать сложность</div><div class="complexity-level_options">
            <input type="radio" name="complexity-level" value="1" id="complexity-level_easy">
            <label class="complexity-level_option" for="complexity-level_easy">1</label>
            <input type="radio" name="complexity-level" value="2" id="complexity-level_medium">
            <label class="complexity-level_option" for="complexity-level_medium">2</label>
            <input type="radio" name="complexity-level" value="3" id="complexity-level_hard">
            <label class="complexity-level_option" for="complexity-level_hard">3</label>
            </div><button class="complexity-level_btn">Старт</button>`
        };

        this.appendsModalElements();

        this.openModal();

        this.modalBtn = this.findBtn();

        this.bindEvents();

    }

    createDomNode(node, elemHTML, classes) {
        node = document.createElement(elemHTML);
        if (classes) node.classList.add(classes);
        return node
    }

    appendsModalElements() {
        this.wrapper.append(this.modal);
        this.modal.append(this.modalTitle)
        this.modal.append(this.modalContent)
    }

    openModal() {
        app.append(this.wrapper)
    }

    findBtn() {
        return this.modal.querySelector('button')
    }

    bindEvents() {
        this.modalBtn.addEventListener('click', (event) => {
            event.preventDefault();
            if (this.modal.querySelector('form')) {
                const formData = new FormData(this.modal.querySelector('form'))
                this.isLevelChosen(formData);
                
                
            }else{
                localStorage.clear();
            };
        })
    }

    isLevelChosen(data) {
        if (data.get('complexity-level')== null) {
            this.modal.querySelector('.error').classList.remove('error__hidden')
        } else {
            localStorage.setItem('level', data.get('complexity-level'));
            this.closeModal()
        }
    }

    closeModal() {
        this.wrapper.remove()
    }
};

