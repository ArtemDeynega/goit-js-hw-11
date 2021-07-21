const refs = {
    body: document.querySelector('body'),
    startBtn: document.querySelector('[data-action="start"]'),
    stopBtn: document.querySelector('[data-action="stop"]'),
};

const DELAY = 1000;

let intervalId = null;
let btnRun = false;

refs.startBtn.addEventListener('click', onStartBtn);
refs.stopBtn.addEventListener('click', onStopBtn);

function onStartBtn() {
    if (btnRun) {
        return;
    }
    btnRun = true;
    refs.startBtn.disabled = true;
    intervalId = setInterval(changeColor, DELAY);
}

function changeColor() {
    refs.body.style.backgroundColor = getRandomHexColor();
}
function onStopBtn() {
    clearInterval(intervalId);
    btnRun = false;
    refs.startBtn.disabled = false;
}

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
