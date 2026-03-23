// Timer Treats — treat selection screen

const cards = document.querySelectorAll('.treat-card');
const startBtn = document.getElementById('startBtn');
let selectedTreat = null;

cards.forEach((card) => {
  card.addEventListener('click', () => {
    // Deselect previous
    cards.forEach((c) => c.classList.remove('selected'));

    // Select this card
    card.classList.add('selected');
    startBtn.disabled = false;

    // Store treat data for next screen
    selectedTreat = {
      name: card.querySelector('.treat-name').textContent,
      duration: card.querySelector('.treat-duration').textContent,
      img: card.querySelector('.treat-img').src,
      minutes: parseInt(card.dataset.minutes, 10),
    };
  });
});

startBtn.addEventListener('click', () => {
  if (!selectedTreat) return;
  localStorage.setItem('selectedTreat', JSON.stringify(selectedTreat));
  window.location.href = 'task.html';
});

document.querySelector('.back-btn').addEventListener('click', () => {
  window.location.href = 'index.html';
});
