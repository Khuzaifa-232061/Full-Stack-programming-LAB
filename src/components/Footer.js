import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleSignup = () => {
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    if (!valid) { setError(true); setTimeout(() => setError(false), 800); return; }
    setEmail('');
    setSuccess(true);
    setTimeout(() => setSuccess(false), 4000);
  };

  return (
    <footer className="footer" id="newsletter">
      <div className="footer-top">
        <div className="footer-brand-col">
          <div className="footer-logo">CHRONOS</div>
          <p className="footer-tagline">EVERY SECOND COUNTS.</p>
        </div>
        <div className="footer-col">
          <h4>NEWSLETTER</h4>
          <p>News &amp; updates direct to you.</p>
          <div className={`newsletter-form${error ? ' error' : ''}`}>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onKeyPress={e => e.key === 'Enter' && handleSignup()}
            />
            <button className="btn-signup" onClick={handleSignup}>SIGN UP</button>
          </div>
          {success && <p className="signup-success">// ENROLLED</p>}
        </div>
        <div className="footer-col">
          <h4>LINKS</h4>
          <ul>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/cart">Cart</Link></li>
            <li><a href="#reviews">Reviews</a></li>
            <li><a href="#features">About</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>SOCIAL</h4>
          <div className="social-icons">
            <a href="#!" className="social-btn">𝕏</a>
            <a href="#!" className="social-btn">◎</a>
            <a href="#!" className="social-btn">f</a>
            <a href="#!" className="social-btn">▶</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2025 CHRONOS INC.</span>
        <span>SERIES 10 — ALL RIGHTS RESERVED.</span>
      </div>
    </footer>
  );
}
