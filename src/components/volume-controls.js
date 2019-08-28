class VolumeControls extends HTMLElement {
    constructor() {
        super();

        this.soundOn = "on";
        this.soundOff = "off";

        this.soundEl = null;
        this.mixerEl = null;
        this.percentageEl = null;
    }

    static get observedAttributes() {
        return ["isSoundOn"];
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
        this.isSoundOn = true;

        const template = document.querySelector("#volume-controls");
        this.appendChild(document.importNode(template.content, true));
        this.soundEl = this.querySelector("#sound");
        this.mixerEl = this.querySelector("#mixer");
        this.percentageEl = this.soundEl.querySelector("#percentage");

        // configure sound toggle
        this.soundEl.addEventListener("click", () => {
            this.isSoundOn = !this.isSoundOn;
            if (this.soundEl.classList.contains(this.soundOn)) {
                mixer.className = "";
                this.mixerEl.classList.add(mixer.value);
                this.mixerEl.value = 0;
            } else {
                mixer.value = +mixer.classList.item(0);
                mixer.className = "";
            }
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
            this.percentageEl.textContent = `${this.mixerEl.value} %`;
        });
    }
}

customElements.define("volume-controls", VolumeControls);
