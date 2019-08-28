class VolumeControls extends HTMLElement {
    constructor() {
        super();

        this.soundOn = "on";
        this.soundOff = "off";

        this.soundEl = null;
        this.mixerEl = null;
        this.percentageEl = null;
    }

    toggleSoundState(parent, toBeEnabled, toBeDisabled) {
        if (parent.classList.contains(this.soundOn)) {
            parent.classList.remove(this.soundOn);
            parent.classList.add(this.soundOff);
        } else {
            parent.classList.remove(this.soundOff);
            parent.classList.add(this.soundOn);
        }
        parent.querySelector(`div#${toBeDisabled}`).classList.add("hidden");
        parent.querySelector(`div#${toBeEnabled}`).classList.remove("hidden");
    }
    connectedCallback() {
        const template = document.querySelector("#volume-controls");
        this.appendChild(document.importNode(template.content, true));
        this.soundEl = this.querySelector("#sound");
        this.mixerEl = this.querySelector("#mixer");
        this.percentageEl = this.soundEl.querySelector("#percentage");

        // configure sound toggle
        this.soundEl.classList.add(this.soundOn);
        this.soundEl.addEventListener("click", () => {
            if (this.soundEl.classList.contains(this.soundOn)) {
                this.toggleSoundState(this.soundEl, "disabled", "enabled");
                mixer.className = "";
                this.mixerEl.classList.add(mixer.value);
                this.mixerEl.value = 0;
            } else {
                this.toggleSoundState(this.soundEl, "enabled", "disabled");
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
            if (
                (this.soundEl.classList.contains(this.soundOn) &&
                    +mixer.value > 0) ||
                +mixer.value > 0
            ) {
                this.soundEl
                    .querySelector("div#enabled")
                    .classList.remove("hidden");
                this.soundEl.classList.remove(this.soundOff);
                this.soundEl.classList.add(this.soundOn);
            } else {
                this.soundEl
                    .querySelector("div#disabled")
                    .classList.remove("hidden");
            }
        });

        this.mixerEl.addEventListener("input", e => {
            this.percentageEl.textContent = `${this.mixerEl.value} %`;
        });
    }
}

customElements.define("volume-controls", VolumeControls);
