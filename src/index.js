"use strict";
import "document-register-element";

window.addEventListener("load", () => {
    const playEl = document.querySelector("#play-button");
    let countEl = document.querySelector("#count");
    let workEl = document.querySelector("#work");
    let restEl = document.querySelector("#rest");
    let intervalEl = document.querySelector("#interval");
    const soundEl = document.querySelector("#sound-controls");

    const switchContext = state => {
        if (state === true) {
            countEl.classList.add("hidden");
            workEl.classList.add("hidden");
            restEl.classList.add("hidden");
            intervalEl.classList.remove("hidden");
            intervalEl.repeats = countEl.laps;
            intervalEl.workInterval = workEl.laps;
            intervalEl.restInterval = restEl.laps;
            intervalEl.pause = false;
        } else {
            countEl.classList.remove("hidden");
            workEl.classList.remove("hidden");
            restEl.classList.remove("hidden");
            intervalEl.classList.add("hidden");
            intervalEl.pause = true;
        }
    };

    playEl.addEventListener("start", e => {
        switchContext(e.detail.state);
    });

    intervalEl.addEventListener("done", () => {
        switchContext(false);
        playEl.paused = false;
    });

    intervalEl.addEventListener("playSound", e => {
        soundEl.dispatchEvent(new CustomEvent(e.type, e));
    });
});
