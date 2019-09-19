import { Laps } from "./laps";

const MAX = 3600;
const MIN = 0;

class Clock extends Laps {
    connectedCallback() {
        super.connectedCallback(
            (oldV, newV) => {
                return newV >= MIN && newV <= MAX ? newV : oldV;
            },
            v => {
                return `${String(Math.floor(v / 60)).padStart(
                    2,
                    "0"
                )} : ${String(v % 60).padStart(2, "0")}`;
            },
            1
        );
    }
}

customElements.define("duration-clock", Clock);
