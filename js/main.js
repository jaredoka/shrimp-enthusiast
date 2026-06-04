// ── Slideshow ──
// Scroll reveal is handled by js/shared.js
const track    = document.getElementById('slideshowTrack');
const dotsWrap = document.getElementById('slideDots');
const slides   = Array.from(track.children);
const total    = slides.length;
let current    = 0;
let autoTimer  = null;
let userPaused = false;

// Build dots
slides.forEach((_, i) => {
  const dot = document.createElement('div');
  dot.className = 'slide-dot' + (i === 0 ? ' active' : '');
  dot.addEventListener('click', () => goTo(i, true));
  dotsWrap.appendChild(dot);
});

function updateDots() {
  document.querySelectorAll('.slide-dot').forEach((d, i) => {
    d.classList.toggle('active', i === current);
  });
  document.querySelectorAll('.slide-variety-btn').forEach(btn => {
    btn.classList.toggle('active', parseInt(btn.dataset.index) === current);
  });
}

function goTo(index, pause) {
  current = (index + total) % total;
  track.style.transform = `translateX(-${current * 100}%)`;
  updateDots();
  if (pause) {
    userPaused = true;
    clearInterval(autoTimer);
    // Resume auto-rotate after 6s of inactivity
    setTimeout(() => { userPaused = false; startAuto(); }, 6000);
  }
}

function startAuto() {
  clearInterval(autoTimer);
  autoTimer = setInterval(() => {
    if (!userPaused) goTo(current + 1, false);
  }, 4000);
}

document.getElementById('slidePrev').addEventListener('click', () => goTo(current - 1, true));
document.getElementById('slideNext').addEventListener('click', () => goTo(current + 1, true));

// ── Touch swipe ──
let touchStartX = 0;
let touchEndX = 0;
const banner = document.getElementById('photoBanner');

banner.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

banner.addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].screenX;
  const diff = touchStartX - touchEndX;
  if (Math.abs(diff) > 50) {
    if (diff > 0) goTo(current + 1, true);
    else goTo(current - 1, true);
  }
}, { passive: true });

// ── Variety bar buttons (inside the banner) ──
document.querySelectorAll('.slide-variety-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    goTo(parseInt(btn.dataset.index), true);
  });
});

startAuto();
