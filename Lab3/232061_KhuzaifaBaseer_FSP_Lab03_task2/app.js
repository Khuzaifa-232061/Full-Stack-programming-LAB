// app.js – Render product catalogue & wire up UI

function renderProducts() {
  const listEl = document.getElementById('product-list');

  listEl.innerHTML = PRODUCTS.map(product => `
    <div class="product-card" id="prod-${product.id}">
      <span class="prod-emoji">${product.emoji}</span>
      <div class="prod-info">
        <span class="prod-name">${product.name}</span>
        <span class="prod-cat">${product.category}</span>
      </div>
      <span class="prod-price">$${product.price.toFixed(2)}</span>
      <button class="btn btn-add" onclick="handleAdd(${product.id})">+ Add</button>
    </div>
  `).join('');
}

// handleAdd looks up the product by id and calls addToCart (REST operator demo)
function handleAdd(productId) {
  // Use Destructuring to pull product fields from the found object
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  // Check if already in cart
  const alreadyIn = cart.some(item => item.id === productId);
  if (alreadyIn) {
    showToast(`"${product.name}" is already in your cart!`);
    return;
  }

  // REST operator: addToCart accepts ...items — here we pass a single product
  addToCart(product);
  showToast(`✅ "${product.name}" added to cart!`);
}

// Demo: Add multiple items at once using REST operator
function addMultiple() {
  const [p1, p2] = PRODUCTS; // Destructuring from PRODUCTS array
  addToCart(p1, p2);         // REST handles multiple arguments
  showToast('Added first 2 products using REST operator!');
}

// Simple toast notification
function showToast(msg) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
}

// Initialise
renderProducts();
