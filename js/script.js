const langToggle = document.getElementById('langToggle');
const body = document.body;

if (langToggle) {
  langToggle.addEventListener('click', () => {
    body.classList.toggle('is-hindi');
  });
}
