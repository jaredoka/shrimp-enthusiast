// ── Shop Sorting ──
// Scroll reveal, nav, search, and cart are handled by js/shared.js
(function() {
  var grid = document.getElementById('shopGrid');
  var btns = document.querySelectorAll('.sort-btn');
  if (!grid || !btns.length) return;
  var cards = Array.from(grid.querySelectorAll('.shop-card'));
  var original = cards.slice();

  btns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      btns.forEach(function(b) { b.classList.remove('active'); });
      btn.classList.add('active');
      var mode = btn.dataset.sort;
      var sorted;

      if (mode === 'default') {
        sorted = original.slice();
      } else if (mode === 'price-asc') {
        sorted = cards.slice().sort(function(a, b) {
          return parseFloat(a.dataset.price) - parseFloat(b.dataset.price);
        });
      } else if (mode === 'price-desc') {
        sorted = cards.slice().sort(function(a, b) {
          return parseFloat(b.dataset.price) - parseFloat(a.dataset.price);
        });
      }

      sorted.forEach(function(card) {
        grid.appendChild(card);
      });
    });
  });
})();
