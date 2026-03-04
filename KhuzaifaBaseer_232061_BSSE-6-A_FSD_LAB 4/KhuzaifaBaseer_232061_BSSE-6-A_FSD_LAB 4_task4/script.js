const tabBtns = document.querySelectorAll('.tab-btn');
const sections = document.querySelectorAll('.tab-section');

function activateTab(targetId) {
  // Update buttons
  tabBtns.forEach(btn => btn.classList.toggle('active', btn.dataset.target === targetId));

  // Show correct section
  sections.forEach(section => {
    if (section.id === targetId) {
      section.classList.remove('hidden');
      // Re-trigger animation by cloning
      section.style.animation = 'none';
      section.offsetHeight; // reflow
      section.style.animation = '';
    } else {
      section.classList.add('hidden');
    }
  });

  // Smooth scroll to section
  const target = document.getElementById(targetId);
  const offset = document.querySelector('.tab-nav').offsetHeight + 24;
  const top = target.getBoundingClientRect().top + window.scrollY - offset;

  window.scrollTo({ top, behavior: 'smooth' });
}

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => activateTab(btn.dataset.target));
});
