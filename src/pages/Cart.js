import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Footer from '../components/Footer';
import './Cart.css';

export default function Cart() {
  const { cartItems, removeFromCart, updateQty, total, clearCart } = useCart();
  const [checkedOut, setCheckedOut] = useState(false);

  const handleCheckout = () => {
    clearCart();
    setCheckedOut(true);
  };

  if (checkedOut) {
    return (
      <>
        <div className="cart-page checkout-success">
          <div className="success-inner">
            <div className="success-icon">✓</div>
            <h2>ORDER CONFIRMED</h2>
            <p>Thank you for your purchase. Your CHRONOS is being prepared.</p>
            <Link to="/" className="btn-primary">BACK TO HOME</Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <div className="cart-page">
        <div className="section-header-bar">
          <span className="bar-label">CHRONOS / CART</span>
          <span className="bar-line"></span>
        </div>

        {cartItems.length === 0 ? (
          <div className="cart-empty">
            <div className="empty-icon">⬡</div>
            <h2>YOUR CART IS EMPTY</h2>
            <p>Looks like you haven't added anything yet.</p>
            <Link to="/products" className="btn-primary">BROWSE PRODUCTS</Link>
          </div>
        ) : (
          <div className="cart-layout">
            <div className="cart-items">
              <div className="cart-items-header">
                <span>PRODUCT</span>
                <span>QTY</span>
                <span>PRICE</span>
                <span></span>
              </div>
              {cartItems.map(item => (
                <div className="cart-item" key={item.id}>
                  <div className="cart-item-info">
                    <img src={item.img} alt={item.name} className="cart-item-img" />
                    <div>
                      <p className="cart-item-name">{item.name}</p>
                      <p className="cart-item-sub">{item.color} / {item.material}</p>
                    </div>
                  </div>
                  <div className="cart-qty-control">
                    <button onClick={() => updateQty(item.id, item.qty - 1)}>−</button>
                    <span>{item.qty}</span>
                    <button onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
                  </div>
                  <div className="cart-item-price">${(item.price * item.qty).toFixed(2)}</div>
                  <button className="cart-remove-btn" onClick={() => removeFromCart(item.id)}>✕</button>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <h3>ORDER SUMMARY</h3>
              <div className="summary-row">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span>FREE</span>
              </div>
              <div className="summary-row total-row">
                <span>TOTAL</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <button className="checkout-btn" onClick={handleCheckout}>
                PLACE ORDER
              </button>
              <Link to="/products" className="continue-btn">← CONTINUE SHOPPING</Link>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
