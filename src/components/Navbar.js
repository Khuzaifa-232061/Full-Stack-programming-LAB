import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { count } = useCart();
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    setMenuOpen(false);
    if (!isHome) { window.location.href = '/#' + id; return; }
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <div className="nav-inner">
        <Link to="/" className="logo">⬡ CHRONOS</Link>
        <ul className="nav-links">
          <li><button className="nav-btn" onClick={() => scrollTo('features')}>Features</button></li>
          <li><button className="nav-btn" onClick={() => scrollTo('tech-specs')}>Tech Specs</button></li>
          <li><button className="nav-btn" onClick={() => scrollTo('customize')}>Customize</button></li>
          <li><button className="nav-btn" onClick={() => scrollTo('reviews')}>Reviews</button></li>
          <li><Link to="/products" className="nav-link-plain">Products</Link></li>
        </ul>
        <Link to="/cart" className="btn-order">
          CART {count > 0 && <span className="cart-badge">{count}</span>}
        </Link>
        <button
          className={`hamburger${menuOpen ? ' open' : ''}`}
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </div>
      <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
        <button className="mob-btn" onClick={() => scrollTo('features')}>Features</button>
        <button className="mob-btn" onClick={() => scrollTo('tech-specs')}>Tech Specs</button>
        <button className="mob-btn" onClick={() => scrollTo('customize')}>Customize</button>
        <button className="mob-btn" onClick={() => scrollTo('reviews')}>Reviews</button>
        <Link to="/products" className="mob-btn" onClick={() => setMenuOpen(false)}>Products</Link>
        <Link to="/cart" className="btn-order-mobile" onClick={() => setMenuOpen(false)}>
          CART {count > 0 && <span className="cart-badge-mob">{count}</span>}
        </Link>
      </div>
    </nav>
  );
}
