import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import './Customize.css';

const colors = [
  { key: 'silver',     label: 'SILVER',     bg: '#e8e8e8', img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80&auto=format&fit=crop' },
  { key: 'space-gray', label: 'SPACE GRAY', bg: '#4a4a4a', img: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&q=80&auto=format&fit=crop' },
  { key: 'rose-gold',  label: 'ROSE GOLD',  bg: '#d4a090', img: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&q=80&auto=format&fit=crop' },
  { key: 'blue',       label: 'BLUE',       bg: '#3d6b99', img: 'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=800&q=80&auto=format&fit=crop' },
];

const materials = [
  { key: 'stainless', label: 'STAINLESS', price: 53 },
  { key: 'aluminium', label: 'ALUMINIUM', price: 29 },
];

export default function Customize({ onColorChange }) {
  const [activeColor, setActiveColor] = useState(0);
  const [activeMat, setActiveMat] = useState(0);
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();

  const handleColorChange = (idx) => {
    setActiveColor(idx);
    if (onColorChange) onColorChange(colors[idx].img);
  };

  const cycleColor = () => {
    const next = (activeColor + 1) % colors.length;
    handleColorChange(next);
  };

  const handleAddToCart = () => {
    const c = colors[activeColor];
    const m = materials[activeMat];
    addToCart({
      id: `chronos-${c.key}-${m.key}`,
      name: `CHRONOS S10 — ${c.label} / ${m.label}`,
      price: m.price,
      img: c.img,
      color: c.label,
      material: m.label,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <section className="customize-section" id="customize">
      <div className="section-header-bar light">
        <span className="bar-label">02 / CONFIGURE</span>
        <span className="bar-line"></span>
      </div>
      <div className="customize-inner">
        <div className="customize-headline-col">
          <h2 className="customize-big-title">DESIGN<br/>YOUR<br/>WATCH.</h2>
          <p className="customize-sub">Four colorways. One icon.</p>
        </div>

        <div className="customize-watch-col">
          <div className="watch-brutalist-frame" onClick={cycleColor}>
            <img
              src={colors[activeColor].img}
              alt="CHRONOS Watch"
              className="customize-watch-img"
            />
            <div className="watch-frame-number">S10</div>
          </div>
          <p className="click-hint">[ CLICK WATCH TO CYCLE ]</p>
        </div>

        <div className="customize-controls-col">
          <div className="color-options">
            {colors.map((c, i) => (
              <button
                key={c.key}
                className={`color-swatch${activeColor === i ? ' active' : ''}`}
                style={{ background: c.bg }}
                title={c.label}
                onClick={() => handleColorChange(i)}
              />
            ))}
          </div>
          <div className="color-labels">
            {colors.map((c, i) => (
              <span
                key={c.key}
                className={`color-label${activeColor === i ? ' active' : ''}`}
                onClick={() => handleColorChange(i)}
              >{c.label}</span>
            ))}
          </div>

          <div className="material-options">
            {materials.map((m, i) => (
              <button
                key={m.key}
                className={`material-btn${activeMat === i ? ' active' : ''}`}
                onClick={() => setActiveMat(i)}
              >
                <span className="mat-label">{m.label}</span>
                <span className="mat-price">${m.price}</span>
              </button>
            ))}
          </div>

          <button
            className={`btn-primary add-cart-btn${added ? ' added' : ''}`}
            onClick={handleAddToCart}
          >
            {added ? '✓ ADDED TO CART' : 'ADD TO CART'}
          </button>
        </div>
      </div>
    </section>
  );
}
