// Timer Treats — task screen

const input = document.getElementById('taskInput');
const skipBtn = document.getElementById('skipBtn');
const continueBtn = document.getElementById('continueBtn');
const tags = document.querySelectorAll('.task-tag');

// Populate treat preview from localStorage
const treat = JSON.parse(localStorage.getItem('selectedTreat') || 'null');
if (treat) {
  document.getElementById('treatImg').src = treat.img;
  document.getElementById('treatImg').alt = treat.name;
  document.getElementById('treatName').textContent = treat.name;
  document.getElementById('treatDuration').textContent = treat.duration;
}

function updateActions() {
  const hasValue = input.value.trim().length > 0;
  skipBtn.classList.toggle('hidden', hasValue);
  continueBtn.classList.toggle('hidden', !hasValue);
}

// Quick-select tags fill the input and toggle selected state
tags.forEach((tag) => {
  tag.addEventListener('click', () => {
    const isAlreadySelected = tag.classList.contains('selected');

    // Deselect all
    tags.forEach((t) => t.classList.remove('selected'));

    if (isAlreadySelected) {
      input.value = '';
    } else {
      tag.classList.add('selected');
      input.value = tag.dataset.label;
    }

    updateActions();
  });
});

// Typing in input clears tag selection
input.addEventListener('input', () => {
  tags.forEach((t) => t.classList.remove('selected'));
  // Re-highlight if the value exactly matches a tag
  tags.forEach((t) => {
    if (t.dataset.label === input.value.trim()) {
      t.classList.add('selected');
    }
  });
  updateActions();
});

// Back button
document.querySelector('.back-btn').addEventListener('click', () => {
  window.location.href = 'selection.html';
});

// Skip → go to break length screen without a task label
skipBtn.addEventListener('click', () => {
  localStorage.removeItem('taskLabel');
  window.location.href = 'break.html';
});

// Continue → save task label and go to break length screen
continueBtn.addEventListener('click', () => {
  const label = input.value.trim();
  if (!label) return;
  localStorage.setItem('taskLabel', label);
  window.location.href = 'break.html';
});
