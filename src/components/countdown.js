class Countdown extends HTMLElement {
    constructor() {
        super();
        this.state = true;
        this.timerEl = null;
        this.currentIndexEl = null;
        this.labelEl = null;

        this.workLabel = "Work";
        this.restLabel = "Rest";
        this.prepareLabel = "Prepare";
        this.doneLabel = "Done";
    }

    static get observedAttributes() {
        return ["repeats", "workInterval", "restInterval", "pause"];
    }

    set pause(newValue) {
        this.state = newValue === "true" || newValue === true;
        if (this.state === false) {
            this.repeats = +this.repeats;
            this.labelEl.textContent = `${this.workLabel}`;
            this.currentIndexEl.textContent = `${Math.ceil(this.repeats)}`;
            this.startTimer(+this.workInterval).then(left => {
                this.repeats -= 0.5;
                if (left <= 0) {
                    if (this.repeats > 0) {
                        this.labelEl.textContent = this.restLabel;
                        this.startTimer(+this.restInterval).then(left => {
                            this.repeats -= 0.5;
                            if (left <= 0) {
                                if (this.repeats > 0) {
                                    this.pause = this.pause;
                                } else {
                                    this.timerEl.textContent = "00 : 00";
                                    this.labelEl.textContent = this.doneLabel;
                                    this.pause = true;

                                    // emit Done event after 3 secs
                                    setTimeout(() => {
                                        this.dispatchEvent(new Event("done"));
                                    }, 3000);
                                }
                            }
                        });
                    }
                }
            });
        }
    }

    get pause() {
        return this.state;
    }

    attributeChangedCallback(attrName, oldValue, newValue) {
        this[attrName] = newValue;
    }

    startTimer(interval) {
        const display = inrv => {
            const mins = Math.floor(inrv / 60);
            const secs = inrv % 60;
            this.timerEl.textContent = `${String(mins).padStart(
                2,
                "0"
            )} : ${String(secs).padStart(2, "0")}`;
            return --inrv;
        };
        interval = display(interval);
        return new Promise(resolve => {
            const i = setInterval(() => {
                interval = display(interval);
                if (interval < -1 || this.pause) {
                    clearInterval(i);
                    resolve(interval);
                }
            }, 1000);
        });
    }

    init() {
        this.pause = true;
        this.timerEl = this.querySelector(".timer");
        this.currentIndexEl = this.querySelector(".currentIndex");
        this.labelEl = this.querySelector(".label");

        this.labelEl.textContent = this.workLabel;
        this.repeats = this.repeats || 0;
    }

    connectedCallback() {
        const template = document.querySelector("#countdown");
        this.appendChild(document.importNode(template.content, true));
        this.init();
    }
}

customElements.define("timed-countdown", Countdown);
