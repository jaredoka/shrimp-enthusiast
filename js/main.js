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

// ── Touch drag (follows finger in real time) ──
let touchStartX   = 0;
let touchStartTime = 0;
let isDragging    = false;
const banner = document.getElementById('photoBanner');

banner.addEventListener('touchstart', (e) => {
  touchStartX    = e.touches[0].clientX;
  touchStartTime = Date.now();
  isDragging     = true;
  track.style.transition = 'none'; // disable CSS transition so track moves with finger
}, { passive: true });

banner.addEventListener('touchmove', (e) => {
  if (!isDragging) return;
  const delta = e.touches[0].clientX - touchStartX;
  track.style.transform = `translateX(calc(-${current * 100}% + ${delta}px))`;
}, { passive: true });

function snapTouch(endX) {
  if (!isDragging) return;
  isDragging = false;
  const delta    = endX - touchStartX;
  const velocity = Math.abs(delta) / (Date.now() - touchStartTime); // px/ms
  track.style.transition = ''; // restore CSS transition for snap animation
  // Fast flick (>0.3 px/ms) or dragged >1/3 of banner width → change slide
  if (velocity > 0.3 || Math.abs(delta) > banner.offsetWidth / 3) {
    goTo(delta < 0 ? current + 1 : current - 1, true);
  } else {
    // Not far/fast enough — snap back to current slide
    track.style.transform = `translateX(-${current * 100}%)`;
  }
}

banner.addEventListener('touchend',    (e) => snapTouch(e.changedTouches[0].clientX), { passive: true });
banner.addEventListener('touchcancel', ()  => {
  if (!isDragging) return;
  isDragging = false;
  track.style.transition = '';
  track.style.transform  = `translateX(-${current * 100}%)`;
}, { passive: true });

// ── Variety bar buttons (inside the banner) ──
document.querySelectorAll('.slide-variety-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    goTo(parseInt(btn.dataset.index), true);
  });
});

startAuto();
