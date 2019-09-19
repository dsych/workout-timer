"use strict";
import "document-register-element";

const createDurationEl = label => {
    let el = document.createElement("set-count");
    el.setAttribute("label", label);
    return el;
};

window.addEventListener("load", () => {
    const playEl = document.querySelector("#play-button");
    const parent = playEl.parentElement;

    let countEl;
    let workEl;
    let restEl;

    let intervalEl = document.createElement("timed-countdown");

    const switchContext = state => {
        if (state === true) {
            parent.removeChild(countEl);
            parent.removeChild(workEl);
            parent.removeChild(restEl);
            intervalEl = parent.insertBefore(
                document.createElement("timed-countdown"),
                playEl
            );
            intervalEl.repeats = countEl.laps;
            intervalEl.workInterval = workEl.laps;
            intervalEl.restInterval = restEl.laps;
            intervalEl.pause = false;
        } else {
            parent.removeChild(intervalEl);
            countEl = parent.insertBefore(createDurationEl("Rest"), playEl);
            workEl = parent.insertBefore(
                createDurationEl("Work Interval"),
                playEl
            );
            restEl = parent.insertBefore(
                createDurationEl("Rest Interval"),
                playEl
            );

            intervalEl.pause = true;
        }
    };

    playEl.addEventListener("start", e => {
        switchContext(e.detail.state);
    });

    intervalEl.addEventListener("done", () => {
        playEl.paused = false;
    });

    intervalEl = parent.insertBefore(intervalEl, playEl);
    switchContext(false);
});
