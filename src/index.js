"use strict";

const setupClock = parent => {
    const minsEl = parent.querySelector(".digit > .mins");
    const secsEl = parent.querySelector(".digit > .secs");

    parent.querySelector(".minus").addEventListener("click", () => {
        let mins = +minsEl.textContent;
        let secs = +secsEl.textContent;

        if (secs <= 0) {
            if (mins > 0) {
                mins--;
                secs = 59;
            }
        } else {
            secs--;
        }
        minsEl.textContent = String(mins).padStart(2, "0");
        secsEl.textContent = String(secs).padStart(2, "0");
    });

    parent.querySelector(".plus").addEventListener("click", () => {
        let mins = +minsEl.textContent;
        let secs = +secsEl.textContent;

        if (secs >= 59) {
            if (mins < 59) {
                mins++;
                secs = 0;
            }
        } else {
            secs++;
        }
        minsEl.textContent = String(mins).padStart(2, "0");
        secsEl.textContent = String(secs).padStart(2, "0");
    });
};

window.addEventListener("load", () => {
    const setsEl = document.querySelector("#sets");
    const workEl = document.querySelector("#work");
    const restEl = document.querySelector("#rest");

    // configure sets
    const setsValueEl = setsEl.querySelector(".digit");
    setsEl.querySelector(".minus").addEventListener("click", () => {
        let v = parseInt(setsValueEl.textContent);
        if (v > 0) {
            setsValueEl.textContent = `${--v}`;
        }
    });
    setsEl.querySelector(".plus").addEventListener("click", () => {
        let v = parseInt(setsValueEl.textContent);

        if (v < 100) {
            setsValueEl.textContent = `${++v}`;
        }
    });

    //configure work intervals
    setupClock(workEl);

    //configure rest intervals
    setupClock(restEl);
});
