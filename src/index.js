"use strict";
window.addEventListener("load", () => {
    const playEl = document.querySelector("#play-button");
    let countEl = document.querySelector("#count");
    let workEl = document.querySelector("#work");
    let restEl = document.querySelector("#rest");

    const parent = document.querySelector("body > div");
    playEl.addEventListener("start", e => {
        if (e.detail.state === true) {
            countEl.classList.add("hidden");
            workEl.classList.add("hidden");
            restEl.classList.add("hidden");
        } else {
            countEl.classList.remove("hidden");
            workEl.classList.remove("hidden");
            restEl.classList.remove("hidden");
        }
    });
});
