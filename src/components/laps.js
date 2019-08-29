export class Laps extends HTMLElement {
    constructor(update, format, initLaps) {
        super();

        this.update = update;
        this.format = format;
        this.initial = "startingValue";

        this.captionEl = null;
        this.minusEl = null;
        this.plusEl = null;

        this.lcount = initLaps;
    }

    static get observerAttributes() {
        return [this.initial];
    }

    set laps(value) {
        if (this.captionEl) {
            this.lcount = this.update(this.lcount, value);
            this.captionEl.textContent = `${this.format(this.lcount)}`;
        }
    }
    get laps() {
        return this.lcount;
    }

    attributeChangedCallback(attrName, oldValue, newValue) {
        this[attrName] = newValue;
    }

    init() {
        this.captionEl = this.querySelector(".caption");
        this.minusEl = this.querySelector(".minus");
        this.plusEl = this.querySelector(".plus");

        this.minusEl.addEventListener("click", () => {
            this.laps--;
        });

        this.plusEl.addEventListener("click", () => {
            this.laps++;
        });
    }

    connectedCallback() {
        const template = document.querySelector("#laps");
        this.appendChild(document.importNode(template.content, true));
        this.init();
        this.laps = this.lcount;
    }
}
