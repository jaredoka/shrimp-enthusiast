/* ══════════════════════════════════════════════════
   Shrimp Enthusiast — Shared JS
   Analytics, nav toggle, search, cart, scroll reveal
   ══════════════════════════════════════════════════ */

// ── Google Analytics (GA4) ──
// Replace G-XXXXXXXXXX with your actual GA4 Measurement ID
(function() {
  var GA_ID = 'G-XXXXXXXXXX';
  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
  document.head.appendChild(s);
  window.dataLayer = window.dataLayer || [];
  function gtag() { dataLayer.push(arguments); }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', GA_ID);
})();

// ── Scroll Reveal ──
(function() {
  var reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  reveals.forEach(function(el) { observer.observe(el); });
})();

// ── Hamburger Nav Toggle ──
(function() {
  var t = document.getElementById('navToggle');
  var l = document.getElementById('navLinks');
  if (!t || !l) return;
  t.addEventListener('click', function() {
    var open = l.classList.toggle('open');
    t.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  document.addEventListener('click', function(e) {
    if (!t.contains(e.target) && !l.contains(e.target)) {
      l.classList.remove('open');
      t.setAttribute('aria-expanded', 'false');
    }
  });
})();

// ── Search Overlay ──
(function() {
  // Detect if we're in a subdirectory (e.g. varieties/)
  var path = window.location.pathname;
  var basePath = (path.indexOf('/varieties/') !== -1) ? '' : 'varieties/';
  var varieties = [
    { name: 'Red Cherry', slug: 'red-cherry', color: '#C83232' },
    { name: 'Blue Cherry', slug: 'blue-cherry', color: '#6BA8D8' },
    { name: 'Orange Sunkist', slug: 'orange-sunkist', color: '#E08A10' },
    { name: 'Yellow Goldenback', slug: 'yellow-goldenback', color: '#F0C030' },
    { name: 'Bloody Mary', slug: 'bloody-mary', color: '#7A1A1A' },
    { name: 'Cull Shrimp', slug: 'cull-shrimp', color: '#999' }
  ];
  var overlay = document.getElementById('searchOverlay');
  var input = document.getElementById('searchInput');
  var results = document.getElementById('searchResults');
  var btn = document.getElementById('searchBtn');

  if (!overlay || !input || !results || !btn) return;

  function render(items) {
    if (items.length === 0) {
      results.innerHTML = '<div class="search-no-results">No varieties found</div>';
      return;
    }
    results.innerHTML = items.map(function(v) {
      return '<a href="' + basePath + v.slug + '.html" class="search-result">' +
        '<span class="search-result-dot" style="background:' + v.color + '"></span>' +
        '<span class="search-result-name">' + v.name + '</span></a>';
    }).join('');
  }

  btn.addEventListener('click', function() {
    overlay.classList.add('open');
    input.value = '';
    render(varieties);
    setTimeout(function() { input.focus(); }, 50);
  });

  overlay.addEventListener('click', function(e) {
    if (e.target === overlay) overlay.classList.remove('open');
  });

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') overlay.classList.remove('open');
  });

  input.addEventListener('input', function() {
    var q = input.value.toLowerCase().trim();
    if (!q) { render(varieties); return; }
    render(varieties.filter(function(v) {
      return v.name.toLowerCase().indexOf(q) !== -1;
    }));
  });
})();

// ── Cart System ──
var Cart = (function() {
  var STORAGE_KEY = 'shrimpCart';
  function esc(s) { var d = document.createElement('div'); d.textContent = s; return d.innerHTML; }
  function getCart() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
    catch(e) { return []; }
  }
  function saveCart(cart) { localStorage.setItem(STORAGE_KEY, JSON.stringify(cart)); }
  function addItem(name, slug, price, qty, color) {
    var cart = getCart();
    var existing = null;
    for (var i = 0; i < cart.length; i++) {
      if (cart[i].slug === slug) { existing = cart[i]; break; }
    }
    if (existing) { existing.qty += qty; }
    else { cart.push({ name: name, slug: slug, price: price, qty: qty, color: color }); }
    saveCart(cart);
    updateBadge();
  }
  function removeItem(slug) {
    var cart = getCart().filter(function(item) { return item.slug !== slug; });
    saveCart(cart);
    updateBadge();
  }
  function updateBadge() {
    var badge = document.getElementById('cartBadge');
    if (!badge) return;
    var cart = getCart();
    var count = 0;
    cart.forEach(function(item) { count += item.qty; });
    badge.textContent = count > 0 ? count : '';
  }
  function getTotal() {
    var cart = getCart();
    var total = 0;
    cart.forEach(function(item) { total += item.price * item.qty; });
    return total;
  }
  function renderCart() {
    var cart = getCart();
    var itemsEl = document.getElementById('cartItems');
    var footerEl = document.getElementById('cartFooter');
    var totalEl = document.getElementById('cartTotalValue');
    var checkoutBtn = document.getElementById('cartCheckoutBtn');
    if (!itemsEl) return;

    if (cart.length === 0) {
      itemsEl.innerHTML = '<div class="cart-empty">Your cart is empty</div>';
      footerEl.style.display = 'none';
      return;
    }

    var html = '';
    cart.forEach(function(item) {
      var subtotal = (item.price * item.qty).toFixed(2);
      html += '<div class="cart-item">' +
        '<span class="cart-item-dot" style="background:' + esc(item.color) + '"></span>' +
        '<div class="cart-item-info">' +
          '<div class="cart-item-name">' + esc(item.name) + '</div>' +
          '<div class="cart-item-detail">BND $' + item.price.toFixed(2) + ' each</div>' +
        '</div>' +
        '<div class="cart-item-qty">' +
          '<button class="cart-item-qty-btn" data-slug="' + esc(item.slug) + '" data-delta="-1">&#8722;</button>' +
          '<span>' + item.qty + '</span>' +
          '<button class="cart-item-qty-btn" data-slug="' + esc(item.slug) + '" data-delta="1">&#43;</button>' +
        '</div>' +
        '<span class="cart-item-price">$' + subtotal + '</span>' +
        '<button class="cart-item-remove" data-slug="' + esc(item.slug) + '" aria-label="Remove">' +
          '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>' +
        '</button></div>';
    });
    itemsEl.innerHTML = html;
    footerEl.style.display = 'block';
    totalEl.textContent = 'BND $' + getTotal().toFixed(2);

    // WhatsApp checkout message
    var msg = 'Hi! I would like to order the following from Shrimp Enthusiast:\n\n';
    cart.forEach(function(item) {
      msg += '- ' + item.qty + ' x ' + item.name + ' (BND $' + (item.price * item.qty).toFixed(2) + ')\n';
    });
    msg += '\nTotal: BND $' + getTotal().toFixed(2);
    msg += '\n\nCould you confirm availability? Thank you!';
    checkoutBtn.href = 'https://wa.me/6738740667?text=' + encodeURIComponent(msg);

    // Qty +/- buttons
    itemsEl.querySelectorAll('.cart-item-qty-btn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var slug = btn.dataset.slug;
        var delta = parseInt(btn.dataset.delta);
        var c = getCart();
        for (var i = 0; i < c.length; i++) {
          if (c[i].slug === slug) {
            c[i].qty += delta;
            if (c[i].qty <= 0) { c.splice(i, 1); }
            break;
          }
        }
        saveCart(c);
        updateBadge();
        renderCart();
      });
    });

    // Remove buttons
    itemsEl.querySelectorAll('.cart-item-remove').forEach(function(btn) {
      btn.addEventListener('click', function() {
        removeItem(btn.dataset.slug);
        renderCart();
      });
    });
  }
  return { getCart: getCart, addItem: addItem, removeItem: removeItem, updateBadge: updateBadge, renderCart: renderCart };
})();

// ── Cart Overlay Toggle ──
(function() {
  var overlay = document.getElementById('cartOverlay');
  var openBtn = document.getElementById('cartBtn');
  var closeBtn = document.getElementById('cartClose');
  if (!overlay || !openBtn || !closeBtn) return;
  openBtn.addEventListener('click', function() {
    Cart.renderCart();
    overlay.classList.add('open');
  });
  closeBtn.addEventListener('click', function() { overlay.classList.remove('open'); });
  overlay.addEventListener('click', function(e) {
    if (e.target === overlay) overlay.classList.remove('open');
  });
})();

Cart.updateBadge();

// ── Stock Status ──
// Stock is configured in js/stock.js — edit that file to toggle availability.
document.addEventListener('DOMContentLoaded', function() {
  if (typeof STOCK === 'undefined') return;

  // Shop page: inject badge into each product card
  document.querySelectorAll('.shop-card').forEach(function(card) {
    var href = card.getAttribute('href');
    if (!href) return;
    var slug = href.replace('varieties/', '').replace('.html', '');
    if (!(slug in STOCK)) return;
    var inStock = STOCK[slug];
    var badge = document.createElement('span');
    badge.className = 'stock-badge ' + (inStock ? 'in-stock' : 'out-of-stock');
    badge.textContent = inStock ? 'Available' : 'Out of Stock';
    var body = card.querySelector('.shop-card-body');
    if (body) body.insertBefore(badge, body.firstChild);
    if (!inStock) card.classList.add('out-of-stock');
  });

  // Variety page: inject badge into order card, disable add-to-cart if out of stock
  var orderCard = document.querySelector('.order-card');
  if (orderCard) {
    var slug = window.location.pathname.split('/').pop().replace('.html', '');
    if (!(slug in STOCK)) return;
    var inStock = STOCK[slug];
    var badge = document.createElement('span');
    badge.className = 'stock-badge ' + (inStock ? 'in-stock' : 'out-of-stock');
    badge.textContent = inStock ? 'Available' : 'Out of Stock';
    badge.style.marginBottom = '16px';
    orderCard.insertBefore(badge, orderCard.firstChild);
    if (!inStock) {
      orderCard.classList.add('out-of-stock');
      var addBtn = document.getElementById('addCartBtn');
      if (addBtn) {
        addBtn.disabled = true;
        addBtn.textContent = 'Out of Stock';
      }
    }
  }
});
