// Timer Treats — burnt screen

localStorage.removeItem('burntOnReturn');
const treat = JSON.parse(localStorage.getItem('selectedTreat') || 'null');

// Populate title with treat name
if (treat) {
  document.getElementById('burntTitle').textContent =
    `you lost focus and burnt your ${treat.name}!`;
}

// Back → intro
document.getElementById('backBtn').addEventListener('click', () => {
  sessionStorage.removeItem('timeRemaining');
  window.location.href = 'index.html';
});

// Restart timer → same treat, same settings, back to timer
document.getElementById('restartBtn').addEventListener('click', () => {
  sessionStorage.removeItem('timeRemaining');
  window.location.href = 'timer.html';
});

// Bake another treat → go to selection screen
document.getElementById('bakeAnotherBtn').addEventListener('click', () => {
  sessionStorage.removeItem('timeRemaining');
  window.location.href = 'selection.html';
});
