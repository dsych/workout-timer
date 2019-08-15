const soundOn = "on";
const soundOff = "off";

const toggleSoundState = (parent, toBeEnabled, toBeDisabled) => {
    if (parent.classList.contains(soundOn)) {
        parent.classList.remove(soundOn);
        parent.classList.add(soundOff);
    } else {
        parent.classList.remove(soundOff);
        parent.classList.add(soundOn);
    }
    parent.querySelector(`div#${toBeDisabled}`).classList.add("hidden");
    parent.querySelector(`div#${toBeEnabled}`).classList.remove("hidden");
};

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
    const soundEl = document.querySelector("#sound");
    const mixerEl = document.querySelector("#mixer");
    const percentageEl = soundEl.querySelector("#percentage");

    const setsEl = document.querySelector("#sets");
    const workEl = document.querySelector("#work");
    const restEl = document.querySelector("#rest");

    // configure sound toggle
    soundEl.classList.add(soundOn);
    soundEl.addEventListener("click", () => {
        if (soundEl.classList.contains(soundOn)) {
            toggleSoundState(soundEl, "disabled", "enabled");
            mixer.className = "";
            mixerEl.classList.add(mixer.value);
            mixerEl.value = 0;
        } else {
            toggleSoundState(soundEl, "enabled", "disabled");
            mixer.value = +mixer.classList.item(0);
            mixer.className = "";
        }
    });

    // configure mixer to display sound percentage instead of sound when moved
    mixerEl.addEventListener("mousedown", () => {
        soundEl.querySelector(`div#disabled`).classList.add("hidden");
        soundEl.querySelector(`div#enabled`).classList.add("hidden");
        percentageEl.classList.remove("hidden");
        percentageEl.textContent = `${mixerEl.value} %`;
    });

    mixerEl.addEventListener("mouseup", () => {
        percentageEl.classList.add("hidden");
        if (
            (soundEl.classList.contains(soundOn) && +mixer.value > 0) ||
            +mixer.value > 0
        ) {
            soundEl.querySelector("div#enabled").classList.remove("hidden");
            soundEl.classList.remove(soundOff);
            soundEl.classList.add(soundOn);
        } else {
            soundEl.querySelector("div#disabled").classList.remove("hidden");
        }
    });

    mixerEl.addEventListener("input", e => {
        percentageEl.textContent = `${mixerEl.value} %`;
    });

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
