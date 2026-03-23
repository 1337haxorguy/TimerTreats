// Timer Treats — intro screen

// If the user closed the app mid-session, show burnt screen
if (localStorage.getItem('burntOnReturn') === 'true') {
  localStorage.removeItem('burntOnReturn');
  window.location.href = 'burnt.html';
}

document.querySelector('.btn-bake').addEventListener('click', (e) => {
  e.preventDefault();
  window.location.href = 'selection.html';
});
