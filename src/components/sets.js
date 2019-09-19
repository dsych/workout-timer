import { Laps } from "./laps";

class Sets extends Laps {
    connectedCallback() {
        super.connectedCallback(
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
