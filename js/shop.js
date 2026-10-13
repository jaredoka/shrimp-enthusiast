// ── Shop Sorting ──
// Scroll reveal, nav, search, and cart are handled by js/shared.js
// Each category grid (.shop-grid) is sorted independently.
(function() {
  var grids = Array.prototype.slice.call(document.querySelectorAll('.shop-grid'));
  var btns = document.querySelectorAll('.sort-btn');
  if (!grids.length || !btns.length) return;
  var originals = grids.map(function(grid) {
    return Array.prototype.slice.call(grid.querySelectorAll('.shop-card'));
  });

  btns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      btns.forEach(function(b) { b.classList.remove('active'); });
      btn.classList.add('active');
      var mode = btn.dataset.sort;

      grids.forEach(function(grid, i) {
        var sorted = originals[i].slice();

        if (mode === 'price-asc') {
          sorted.sort(function(a, b) {
            return parseFloat(a.dataset.price) - parseFloat(b.dataset.price);
          });
        } else if (mode === 'price-desc') {
          sorted.sort(function(a, b) {
            return parseFloat(b.dataset.price) - parseFloat(a.dataset.price);
          });
        }

        sorted.forEach(function(card) {
          grid.appendChild(card);
        });
      });
    });
  });
})();
