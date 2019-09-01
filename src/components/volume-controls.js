class VolumeControls extends HTMLElement {
    constructor() {
        super();
        this.soundEl = null;
        this.mixerEl = null;
        this.percentageEl = null;

        this.oldPercentage = 0;

        this.handleClick = this.handleClick.bind(this);
        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    static get observedAttributes() {
        return ["isSoundOn"];
    }

    get percentage() {
        return +this.mixerEl.value;
    }

    set percentage(value) {
        if (this.percentageEl) {
            this.percentageEl.textContent = `${value} %`;
        }
    }

    get isSoundOn() {
        return this.getAttribute("isSoundOn") === "true";
    }

    set isSoundOn(isOn) {
        this.setAttribute("isSoundOn", isOn);
        if (this.soundEl) {
            this.soundEl
                .querySelector("div#enabled")
                .classList.toggle("hidden", !isOn);
            this.soundEl
                .querySelector("div#disabled")
                .classList.toggle("hidden", isOn);
        }
    }

    attributeChangedCallback(attrName, oldValue, newValue) {
        this[attrName] = newValue;
    }
    handleClick() {
        this.mixerEl.value = this.isSoundOn ? 0 : this.oldPercentage;
        this.isSoundOn = !this.isSoundOn;
    }
    handleMouseDown() {
        this.soundEl.querySelector(`div#disabled`).classList.add("hidden");
        this.soundEl.querySelector(`div#enabled`).classList.add("hidden");
        this.percentageEl.classList.remove("hidden");
        this.percentageEl.textContent = `${this.mixerEl.value} %`;
    }
    handleMouseUp() {
        this.percentageEl.classList.add("hidden");
        this.isSoundOn =
            (this.soundEl.classList.contains(this.soundOn) &&
                +mixer.value > 0) ||
            +mixer.value > 0;
    }
    handleInput(e) {
        this.oldPercentage = this.percentage;
        this.percentage = e.target.value;
    }

    init() {
        this.soundEl = this.querySelector("#sound");
        this.mixerEl = this.querySelector("#mixer");
        this.percentageEl = this.soundEl.querySelector("#percentage");

        this.isSoundOn = true;
        this.oldPercentage = this.percentage;

        // configure sound toggle
        this.soundEl.addEventListener("click", this.handleClick);

        // configure mixer to display sound percentage instead of sound when moved
        this.mixerEl.addEventListener("mousedown", this.handleMouseDown);

        this.mixerEl.addEventListener("mouseup", this.handleMouseUp);

        this.mixerEl.addEventListener("input", this.handleInput);

        this.addEventListener("playSound", e => {
            if (e.detail.track) {
                const a = new Audio(e.detail.track);
                a.volume = this.percentage / 100;
                a.play().catch(err => {
                    console.log(err.message);
                });
            }
        });
    }

    connectedCallback() {
        const template = document.querySelector("#volume-controls");
        this.appendChild(document.importNode(template.content, true));
        this.init();
    }
    disconnectedCallback() {
        this.soundEl.removeEventListener("click", this.handleClick);
        this.mixerEl.removeEventListener("mousedown", this.handleMouseDown);
        this.mixerEl.removeEventListener("mouseup", this.handleMouseUp);
        this.mixerEl.removeEventListener("input", this.handleInput);
    }
}

customElements.define("volume-controls", VolumeControls);
