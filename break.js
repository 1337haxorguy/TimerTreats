// Timer Treats — break length screen

const breakValueEl = document.getElementById('breakValue');
const decrementBtn = document.getElementById('decrementBtn');
const incrementBtn = document.getElementById('incrementBtn');

const MIN_BREAK = 1;
const MAX_BREAK = 60;
let breakMinutes = 5;

// Populate treat preview from localStorage
const treat = JSON.parse(localStorage.getItem('selectedTreat') || 'null');
if (treat) {
  document.getElementById('treatImg').src = treat.img;
  document.getElementById('treatImg').alt = treat.name;
  document.getElementById('treatName').textContent = treat.name;
  document.getElementById('treatDuration').textContent = treat.duration;
}

function render() {
  breakValueEl.textContent = breakMinutes;
  decrementBtn.disabled = breakMinutes <= MIN_BREAK;
  incrementBtn.disabled = breakMinutes >= MAX_BREAK;
}

decrementBtn.addEventListener('click', () => {
  if (breakMinutes > MIN_BREAK) {
    breakMinutes--;
    render();
  }
});

incrementBtn.addEventListener('click', () => {
  if (breakMinutes < MAX_BREAK) {
    breakMinutes++;
    render();
  }
});

document.querySelector('.back-btn').addEventListener('click', () => {
  window.location.href = 'task.html';
});

document.getElementById('bakeBtn').addEventListener('click', () => {
  localStorage.setItem('breakMinutes', breakMinutes);
  sessionStorage.removeItem('timeRemaining');
  window.location.href = 'timer.html';
});

render();
