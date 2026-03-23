// Timer Treats — done screen

const treat = JSON.parse(localStorage.getItem('selectedTreat') || 'null');
const taskLabel = localStorage.getItem('taskLabel') || '';

// Clear timer state
sessionStorage.removeItem('timeRemaining');

// ── Populate ───────────────────────────────────────────────────

// Title
if (treat) {
  document.getElementById('doneTitleText').textContent = `your ${treat.name} is `;
}

// Illustration — use the treat image from selection
if (treat && treat.img) {
  document.getElementById('doneImg').src = treat.img;
  document.getElementById('doneImg').alt = treat.name;
}

// Task chip
const chipEl = document.getElementById('doneChip');
if (taskLabel) {
  chipEl.textContent = taskLabel;
  chipEl.style.display = 'inline-flex';
} else {
  chipEl.style.display = 'none';
  // hide the "you worked on" line too if no task
  document.querySelectorAll('.done-summary-text')[0].style.display = 'none';
}

// Duration text
if (treat) {
  const mins = treat.minutes;
  let durationText;
  if (mins >= 120) durationText = `for ${mins / 60} hours`;
  else if (mins === 60) durationText = 'for 1 hour';
  else durationText = `for ${mins} minutes`;
  document.getElementById('doneMinutes').textContent = durationText;
}

// ── Navigation ─────────────────────────────────────────────────

// Back → intro
document.getElementById('backBtn').addEventListener('click', () => {
  window.location.href = 'index.html';
});

// Bake another treat → restart timer with same settings
document.getElementById('bakeAgainBtn').addEventListener('click', () => {
  sessionStorage.removeItem('timeRemaining');
  window.location.href = 'timer.html';
});

// Start over → clear everything, go to intro
document.getElementById('startOverBtn').addEventListener('click', () => {
  localStorage.removeItem('selectedTreat');
  localStorage.removeItem('taskLabel');
  localStorage.removeItem('breakMinutes');
  sessionStorage.removeItem('timeRemaining');
  window.location.href = 'index.html';
});
