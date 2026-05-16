import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

export default function Hero({ watchSrc }) {
  return (
    <section className="hero" id="hero">
      <div className="hero-left">
        <div className="hero-tag">SERIES 10 — 2025</div>
        <h1 className="hero-headline">
          <span className="line-1">UNLEASH</span>
          <span className="line-2">THE</span>
          <span className="line-3">FUTURE.</span>
        </h1>
        <div className="hero-bottom-row">
          <p className="hero-sub">Advanced health tracking, seamless connectivity, and iconic design. Every second counts.</p>
          <Link to="/products" className="btn-primary">EXPLORE MODELS</Link>
        </div>
      </div>
      <div className="hero-right">
        <div className="hero-counter">
          <span className="counter-label">Series</span>
          <span className="counter-num">10</span>
        </div>
        <div className="hero-img-wrap">
          <img
            src={watchSrc}
            alt="CHRONOS Series 10"
            id="heroWatch"
            className="watch-img"
          />
          <div className="img-badge">NEW</div>
        </div>
      </div>
    </section>
  );
}
