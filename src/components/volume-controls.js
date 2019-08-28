class VolumeControls extends HTMLElement {
    constructor() {
        super();
        this.soundEl = null;
        this.mixerEl = null;
        this.percentageEl = null;

        this.oldPercentage = 0;
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
    connectedCallback() {
        const template = document.querySelector("#volume-controls");
        this.appendChild(document.importNode(template.content, true));
        this.soundEl = this.querySelector("#sound");
        this.mixerEl = this.querySelector("#mixer");
        this.percentageEl = this.soundEl.querySelector("#percentage");

        this.isSoundOn = true;
        this.oldPercentage = this.percentage;

        // configure sound toggle
        this.soundEl.addEventListener("click", () => {
            this.mixerEl.value = this.isSoundOn ? 0 : this.oldPercentage;
            this.isSoundOn = !this.isSoundOn;
        });

        // configure mixer to display sound percentage instead of sound when moved
        this.mixerEl.addEventListener("mousedown", () => {
            this.soundEl.querySelector(`div#disabled`).classList.add("hidden");
            this.soundEl.querySelector(`div#enabled`).classList.add("hidden");
            this.percentageEl.classList.remove("hidden");
            this.percentageEl.textContent = `${this.mixerEl.value} %`;
        });

        this.mixerEl.addEventListener("mouseup", () => {
            this.percentageEl.classList.add("hidden");
            this.isSoundOn =
                (this.soundEl.classList.contains(this.soundOn) &&
                    +mixer.value > 0) ||
                +mixer.value > 0;
        });

        this.mixerEl.addEventListener("input", e => {
            this.oldPercentage = this.percentage;
            this.percentage = e.target.value;
        });
    }
}

customElements.define("volume-controls", VolumeControls);
