const images = [
  { src: 'https://picsum.photos/seed/arch1/800/600',   caption: 'Golden Hour at the Harbour' },
  { src: 'https://picsum.photos/seed/forest2/800/600', caption: 'Misty Forest at Dawn' },
  { src: 'https://picsum.photos/seed/city3/800/600',   caption: 'City Lights & Urban Dreams' },
  { src: 'https://picsum.photos/seed/ocean4/800/600',  caption: 'The Endless Blue Horizon' },
  { src: 'https://picsum.photos/seed/desert5/800/600', caption: 'Silence of the Sands' },
];

let current = 0;
let transitioning = false;

const img     = document.getElementById('galleryImg');
const caption = document.getElementById('caption');
const dotsEl  = document.getElementById('dots');

// Build dots
images.forEach((_, i) => {
  const dot = document.createElement('div');
  dot.className = 'dot' + (i === 0 ? ' active' : '');
  dot.addEventListener('click', () => goTo(i));
  dotsEl.appendChild(dot);
});

function updateDots() {
  document.querySelectorAll('.dot').forEach((d, i) =>
    d.classList.toggle('active', i === current));
}

function goTo(index) {
  if (transitioning || index === current) return;
  transitioning = true;

  img.classList.add('fade');
  caption.classList.add('fade');

  setTimeout(() => {
    current = (index + images.length) % images.length;
    img.src = images[current].src;
    caption.textContent = images[current].caption;
    updateDots();

    img.classList.remove('fade');
    caption.classList.remove('fade');
    transitioning = false;
  }, 400);
}

document.getElementById('prevBtn').addEventListener('click', () => goTo(current - 1));
document.getElementById('nextBtn').addEventListener('click', () => goTo(current + 1));

// Keyboard nav
document.addEventListener('keydown', e => {
  if (e.key === 'ArrowLeft')  goTo(current - 1);
  if (e.key === 'ArrowRight') goTo(current + 1);
});

// Init
img.src = images[0].src;
caption.textContent = images[0].caption;
