// cart.js – Core Cart Logic using ES6 Rest, Spread & Destructuring

// ─── State ────────────────────────────────────────────────────────────────────
let cart = []; // Main cart array

// ─── REST OPERATOR ────────────────────────────────────────────────────────────
// addToCart accepts any number of product objects using the REST operator (...items)
function addToCart(...items) {
  // Use SPREAD to merge existing cart with new items (non-destructive clone + append)
  cart = [...cart, ...items];
  console.log(`✅ Added ${items.length} item(s) to cart. Cart now has ${cart.length} item(s).`);
  renderCart();
}

// ─── SPREAD OPERATOR ─────────────────────────────────────────────────────────
// Returns a shallow clone of the cart using Spread – original cart is untouched
function cloneCart() {
  const cartClone = [...cart]; // Spread to clone
  return cartClone;
}

// ─── ARRAY DESTRUCTURING ──────────────────────────────────────────────────────
// Destructure cart: extract first item and the remaining items separately
function destructureCart() {
  const [firstItem, ...remainingItems] = cart;
  return { firstItem, remainingItems };
}

// ─── HELPERS ─────────────────────────────────────────────────────────────────
function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  renderCart();
  // Hide cloned section when cart changes
  document.getElementById('cloned-section').classList.add('hidden');
}

function clearCart() {
  cart = [];
  renderCart();
  document.getElementById('cloned-section').classList.add('hidden');
}

function getTotalPrice() {
  return cart.reduce((sum, item) => sum + item.price, 0).toFixed(2);
}

// ─── RENDER ───────────────────────────────────────────────────────────────────
function renderCart() {
  const cartItemsEl   = document.getElementById('cart-items');
  const totalItemsEl  = document.getElementById('total-items');
  const totalPriceEl  = document.getElementById('total-price');
  const firstItemEl   = document.getElementById('first-item-name');
  const firstItemBox  = document.getElementById('first-item-box');

  totalItemsEl.textContent = cart.length;
  totalPriceEl.textContent = `$${getTotalPrice()}`;

  if (cart.length === 0) {
    cartItemsEl.innerHTML = `<p class="empty-msg">Your cart is empty. Add some products!</p>`;
    firstItemEl.textContent = '—';
    firstItemBox.classList.remove('has-item');
    return;
  }

  // Apply DESTRUCTURING to highlight first item vs rest
  const { firstItem, remainingItems } = destructureCart();

  // Update first-item highlight box
  firstItemEl.textContent = `${firstItem.emoji} ${firstItem.name} — $${firstItem.price.toFixed(2)}`;
  firstItemBox.classList.add('has-item');

  // Build cart rows
  // First item gets a special "first" badge; remaining items are labelled normally
  const firstRow   = buildCartRow(firstItem, true);
  const restRows   = remainingItems.map(item => buildCartRow(item, false)).join('');
  cartItemsEl.innerHTML = firstRow + restRows;
}

function buildCartRow(item, isFirst) {
  return `
    <div class="cart-row ${isFirst ? 'cart-row--first' : ''}">
      <span class="cart-emoji">${item.emoji}</span>
      <div class="cart-info">
        <span class="cart-name">${item.name}</span>
        <span class="cart-cat">${item.category}</span>
      </div>
      <span class="cart-price">$${item.price.toFixed(2)}</span>
      ${isFirst ? '<span class="first-badge">1st</span>' : ''}
      <button class="remove-btn" onclick="removeFromCart(${item.id})">✕</button>
    </div>
  `;
}

function renderClonedCart(cloned) {
  const el = document.getElementById('cloned-items');
  if (cloned.length === 0) {
    el.innerHTML = `<p class="empty-msg">Nothing to clone.</p>`;
    return;
  }
  el.innerHTML = cloned.map(item => `
    <div class="cart-row cloned-row">
      <span class="cart-emoji">${item.emoji}</span>
      <div class="cart-info">
        <span class="cart-name">${item.name}</span>
        <span class="cart-cat">${item.category}</span>
      </div>
      <span class="cart-price">$${item.price.toFixed(2)}</span>
    </div>
  `).join('');
}

function showClonedCart() {
  if (cart.length === 0) return;
  const cloned  = cloneCart();                              // Spread clone
  const section = document.getElementById('cloned-section');
  renderClonedCart(cloned);
  section.classList.remove('hidden');
}
