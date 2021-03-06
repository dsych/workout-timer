export class Laps extends HTMLElement {
    static get observedAttributes() {
        return ["laps", "label"];
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

    handleMinus() {
        this.laps--;
    }

    handlePlus() {
        this.laps++;
    }

    init(update, format, initLaps) {
        this.update = update;
        this.format = format;

        this.lcount = initLaps;

        this.handleMinus = this.handleMinus.bind(this);
        this.handlePlus = this.handlePlus.bind(this);

        this.captionEl = this.querySelector(".caption");
        this.minusEl = this.querySelector(".minus");
        this.plusEl = this.querySelector(".plus");

        this.querySelector(".label").textContent = this.attributes.getNamedItem(
            "label"
        ).value;

        this.minusEl.addEventListener("click", this.handleMinus);
        this.plusEl.addEventListener("click", this.handlePlus);
    }

    connectedCallback(update, format, initLaps) {
        const template = document.querySelector("#laps");
        this.appendChild(document.importNode(template.content, true));
        this.init(update, format, initLaps);
        this.laps = this.lcount;
    }

    disconnectedCallback() {
        this.minusEl.removeEventListener("click", this.handleMinus);
        this.plusEl.removeEventListener("click", this.handlePlus);
    }
}
