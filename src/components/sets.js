import { Laps } from "./laps";

class Sets extends Laps {
    constructor() {
        super(
            (oldV, newV) => {
                newV = +newV;
                oldV = +oldV;
                return newV >= 0 && newV <= 100 ? newV : oldV;
            },
            v => v,
            1
        );
    }
}

customElements.define("set-count", Sets);
