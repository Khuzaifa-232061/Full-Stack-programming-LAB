import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import './NotFound.css';

export default function NotFound() {
  return (
    <>
      <div className="notfound-page">
        <div className="notfound-inner">
          <div className="notfound-num">404</div>
          <div className="notfound-content">
            <h1 className="notfound-title">PAGE NOT<br/>FOUND.</h1>
            <p className="notfound-sub">
              The page you're looking for doesn't exist or has been moved.<br/>
              Let's get you back on track.
            </p>
            <div className="notfound-links">
              <Link to="/" className="btn-primary">← BACK TO HOME</Link>
              <Link to="/products" className="btn-ghost">VIEW PRODUCTS</Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
