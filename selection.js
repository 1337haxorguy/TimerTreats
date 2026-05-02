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

// Tilt effect
cards.forEach((card) => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotateY = ((x - cx) / cx) * 25;
    const rotateX = -((y - cy) / cy) * 25;
    card.style.transition = 'transform 0.05s ease, box-shadow 0.05s ease';
    card.style.transform = `perspective(500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.08)`;
    card.style.boxShadow = `${-rotateY * 0.8}px ${rotateX * 0.8}px 32px rgba(0,0,0,0.18)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transition = 'transform 0.45s ease, box-shadow 0.45s ease';
    card.style.transform = '';
    card.style.boxShadow = '';
  });
});
