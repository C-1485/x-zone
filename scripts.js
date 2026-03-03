let seconds = 0;
let interval = null;
let isRunning = false;
let lastSessionSeconds = 0;

const timerDisplay = document.getElementById("timer");
const playPauseBtn = document.getElementById("playPauseBtn");
const playPauseIcon = document.getElementById("playPauseIcon");
const restartBtn = document.getElementById("restartBtn");
const logContainer = document.getElementById("logContainer");
const logContent = document.getElementById("logContent");

const playIconSrc = "assets/play.png";
const pauseIconSrc = "assets/pause.png";

function formatTime(totalSeconds) {
    const hrs = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const mins = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    const secs = String(totalSeconds % 60).padStart(2, '0');
    return `${hrs}:${mins}:${secs}`;
}

function updateDisplay() {
    timerDisplay.textContent = formatTime(seconds);
}

function startTimer() {
    interval = setInterval(() => {
        seconds++;
        updateDisplay();
    }, 1000);
    isRunning = true;
    playPauseIcon.src = pauseIconSrc;
}

function pauseTimer() {
    clearInterval(interval);
    isRunning = false;
    playPauseIcon.src = playIconSrc;

    const sessionDuration = seconds - lastSessionSeconds;
    lastSessionSeconds = seconds;

    const entry = document.createElement("div");
    entry.className = "log-entry";
    entry.textContent = formatTime(sessionDuration);
    logContent.appendChild(entry);
    requestAnimationFrame(() => {
        logContainer.scrollTop = logContainer.scrollHeight;
    });
}

playPauseBtn.addEventListener("click", () => {
    if (isRunning) {
        pauseTimer();
    } else {
        startTimer();
    }
});

restartBtn.addEventListener("click", () => {
    clearInterval(interval);
    seconds = 0;
    lastSessionSeconds = 0;
    isRunning = false;
    playPauseIcon.src = playIconSrc;
    logContent.innerHTML = "";
    updateDisplay();
});

updateDisplay();