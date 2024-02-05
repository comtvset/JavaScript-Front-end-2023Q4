import { buildHTML } from './buildHTML.js';
const { timeText } = buildHTML();

let timerId;
let seconds = 1;
let isTimerRunning = false;
let finalTime;

function startTimer() {
    if (!isTimerRunning) {
        timerId = setInterval(updateTime, 1000);
        isTimerRunning = true;
    }
}

function resumeTimer(saveTime) {
    if (!isTimerRunning) {
        const [min, sec] = saveTime.split(':');
        seconds = parseInt(min) * 60 + parseInt(sec) + 1;
        timerId = setInterval(updateTime, 1000);
        isTimerRunning = true;
    }
}

function stopTimer() {
    clearInterval(timerId);
    isTimerRunning = false;
    finalTime = formatTime(seconds);
}

function resetTimer() {
    clearInterval(timerId);
    seconds = 0;
    updateTime();
    isTimerRunning = false;
}

function updateTime() {
    const formattedTime = formatTime(seconds);
    timeText.textContent = formattedTime;
    seconds++;
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secondsRemaining = seconds % 60;
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(secondsRemaining).padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
}

export function timer() {
    return { startTimer, resumeTimer, stopTimer, resetTimer };
}
