// Timer Treats — timer screen

// ── Load session data ──────────────────────────────────────────
const treat = JSON.parse(localStorage.getItem('selectedTreat') || 'null');
const taskLabel = localStorage.getItem('taskLabel') || '';
const totalSeconds = treat ? treat.minutes * 60 : 25 * 60;

// Restore from sessionStorage if mid-session (e.g. page refresh)
let timeRemaining = parseInt(sessionStorage.getItem('timeRemaining') ?? totalSeconds, 10);
let isPaused = false;
let timerInterval = null;
let timerStarted = false; // has the timer ever been running?

// ── DOM refs ───────────────────────────────────────────────────
const timerValueEl = document.getElementById('timerValue');
const pauseBtn = document.getElementById('pauseBtn');
const pauseLabel = document.getElementById('pauseLabel');
const pauseIcon = document.getElementById('pauseIcon');
const playIcon = document.getElementById('playIcon');
const timerCopyEl = document.getElementById('timerCopy');
const taskChipEl = document.getElementById('taskChip');
const chipWrap = document.getElementById('chipWrap');
const homeBtn = document.getElementById('homeBtn');

// ── Setup ──────────────────────────────────────────────────────

// Task chip — show label if set, otherwise treat name
const chipText = taskLabel || (treat ? treat.name : '');
if (chipText) {
  taskChipEl.textContent = chipText;
  chipWrap.style.display = 'flex';
} else {
  chipWrap.style.display = 'none';
}

// Copy text — rotates every 3 minutes
const copyLines = treat ? [
  `your ${treat.name}\nis in the oven...`,
  `we're whisking up\nyour ${treat.name}...`,
  `your ${treat.name}\nis almost ready...`,
  `the oven's doing\nits thing...`,
  `your ${treat.name}\nis rising...`,
  `almost there —\nyour ${treat.name} awaits`,
  `your ${treat.name}\nheard you working...`,
  `stay focused —\nyour ${treat.name} is watching`,
  `patience, bestie —\nyour ${treat.name} needs this`,
  `your ${treat.name}\ncan smell your focus`,
] : [];

function updateCopy() {
  if (!copyLines.length) return;
  const elapsed = totalSeconds - timeRemaining;
  const idx = Math.floor(elapsed / 60) % copyLines.length;
  timerCopyEl.textContent = copyLines[idx];
}

updateCopy();

// ── Timer logic ────────────────────────────────────────────────

function formatTime(secs) {
  const m = Math.floor(secs / 60).toString().padStart(2, '0');
  const s = (secs % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

function tick() {
  if (timeRemaining <= 0) {
    clearInterval(timerInterval);
    sessionStorage.removeItem('timeRemaining');
    window.location.href = 'done.html';
    return;
  }
  timeRemaining--;
  sessionStorage.setItem('timeRemaining', timeRemaining);
  timerValueEl.textContent = formatTime(timeRemaining);
  updateCopy();
}

function startTimer() {
  timerStarted = true;
  isPaused = false;
  pauseLabel.textContent = 'pause';
  pauseIcon.classList.remove('hidden');
  playIcon.classList.add('hidden');
  timerInterval = setInterval(tick, 1000);
}

function pauseTimer() {
  isPaused = true;
  clearInterval(timerInterval);
  pauseLabel.textContent = 'resume';
  pauseIcon.classList.add('hidden');
  playIcon.classList.remove('hidden');
}

pauseBtn.addEventListener('click', () => {
  if (isPaused) {
    startTimer();
  } else {
    pauseTimer();
  }
});

// Home button — intentional exit, does not trigger burnt
homeBtn.addEventListener('click', () => {
  intentionalExit = true;
  clearInterval(timerInterval);
  sessionStorage.removeItem('timeRemaining');
  localStorage.removeItem('burntOnReturn');
  window.location.href = 'index.html';
});

// ── Burnt when the timer is abandoned ──────────────────────────
let intentionalExit = false;

// pagehide fires when the user closes the tab or navigates away — the only
// deliberate exit signal. Screen auto-lock only fires visibilitychange (not
// pagehide), so locking the phone will never trigger a burn.
window.addEventListener('pagehide', () => {
  if (!intentionalExit && timerStarted && timeRemaining > 0 && !isPaused) {
    localStorage.setItem('burntOnReturn', 'true');
  }
});

// visibilitychange: only used to catch a burn set by pagehide on the same tab
// (e.g. forward/back navigation returning to this page). Does NOT set burntOnReturn
// so screen lock and app-switching are safe.
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') {
    if (localStorage.getItem('burntOnReturn') === 'true') {
      localStorage.removeItem('burntOnReturn');
      window.location.href = 'burnt.html';
    }
  }
});

// ── Init ───────────────────────────────────────────────────────
timerValueEl.textContent = formatTime(timeRemaining);
startTimer();
