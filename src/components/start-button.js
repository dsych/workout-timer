class StartButton extends HTMLElement {
    static get observedAttributes() {
        return ["paused"];
    }

    set paused(value) {
        if (this.buttonEl) {
            if (value === true || value === "true") {
                this.state = true;
                this.buttonEl.textContent = "Stop";
            } else {
                this.state = false;
                this.buttonEl.textContent = "Start";
            }
            this.dispatchEvent(
                new CustomEvent("start", { detail: { state: this.state } })
            );
        }
    }

    get paused() {
        return this.state;
    }

    handleClick() {
        this.paused = !this.state;
    }

    attributeChangedCallback(attrName, oldValue, newValue) {
        this[attrName] = newValue;
    }

    init() {
        this.state = false;
        this.handleClick = this.handleClick.bind(this);

        this.buttonEl = this.querySelector(".play-button");
        this.buttonEl.addEventListener("click", this.handleClick);
        this.paused = this.state;
    }

    connectedCallback() {
        const template = document.querySelector("#start");
        this.appendChild(document.importNode(template.content, true));
        this.init();
    }
    disconnectedCallback() {
        this.buttonEl.removeEventListener("click", this.handleClick);
    }
}

customElements.define("play-button", StartButton);
