import { Laps } from "./laps";

class Sets extends Laps {
    constructor() {
        super((oldV, newV) => {
            newV = +newV;
            oldV = +oldV;
            return newV >= 0 && newV <= 100 ? newV : oldV;
        }, 1);
    }
}

customElements.define("set-count", Sets);
