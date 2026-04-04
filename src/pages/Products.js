import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import Footer from '../components/Footer';
import './Products.css';

const PRODUCTS = [
  { id: 'p1', name: 'CHRONOS S10 Silver / Stainless', price: 53, tag: 'BESTSELLER', img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80&auto=format&fit=crop', color: 'Silver', material: 'Stainless' },
  { id: 'p2', name: 'CHRONOS S10 Space Gray / Stainless', price: 53, tag: 'NEW', img: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&q=80&auto=format&fit=crop', color: 'Space Gray', material: 'Stainless' },
  { id: 'p3', name: 'CHRONOS S10 Rose Gold / Stainless', price: 53, tag: '', img: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=600&q=80&auto=format&fit=crop', color: 'Rose Gold', material: 'Stainless' },
  { id: 'p4', name: 'CHRONOS S10 Blue / Stainless', price: 53, tag: '', img: 'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=600&q=80&auto=format&fit=crop', color: 'Blue', material: 'Stainless' },
  { id: 'p5', name: 'CHRONOS S10 Silver / Aluminium', price: 29, tag: 'POPULAR', img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80&auto=format&fit=crop', color: 'Silver', material: 'Aluminium' },
  { id: 'p6', name: 'CHRONOS S10 Space Gray / Aluminium', price: 29, tag: '', img: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&q=80&auto=format&fit=crop', color: 'Space Gray', material: 'Aluminium' },
  { id: 'p7', name: 'CHRONOS S10 Rose Gold / Aluminium', price: 29, tag: '', img: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=600&q=80&auto=format&fit=crop', color: 'Rose Gold', material: 'Aluminium' },
  { id: 'p8', name: 'CHRONOS S10 Blue / Aluminium', price: 29, tag: '', img: 'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=600&q=80&auto=format&fit=crop', color: 'Blue', material: 'Aluminium' },
];

export default function Products() {
  const { addToCart } = useCart();
  const [added, setAdded] = useState({});
  const [filter, setFilter] = useState('ALL');

  const filtered = filter === 'ALL' ? PRODUCTS
    : PRODUCTS.filter(p => p.material.toUpperCase() === filter);

  const handleAdd = (product) => {
    addToCart(product);
    setAdded(prev => ({ ...prev, [product.id]: true }));
    setTimeout(() => setAdded(prev => ({ ...prev, [product.id]: false })), 2000);
  };

  return (
    <>
      <div className="products-page">
        <div className="products-header">
          <div className="section-header-bar">
            <span className="bar-label">CHRONOS / PRODUCTS</span>
            <span className="bar-line"></span>
          </div>
          <div className="products-title-row">
            <h1 className="products-title">ALL MODELS</h1>
            <div className="filter-btns">
              {['ALL', 'STAINLESS', 'ALUMINIUM'].map(f => (
                <button
                  key={f}
                  className={`filter-btn${filter === f ? ' active' : ''}`}
                  onClick={() => setFilter(f)}
                >{f}</button>
              ))}
            </div>
          </div>
        </div>

        <div className="products-grid">
          {filtered.map(p => (
            <div className="product-card" key={p.id}>
              <div className="product-img-wrap">
                <img src={p.img} alt={p.name} className="product-img" />
                {p.tag && <span className="product-tag">{p.tag}</span>}
              </div>
              <div className="product-info">
                <div className="product-meta">
                  <span className="product-color">{p.color} / {p.material}</span>
                  <span className="product-price">${p.price}</span>
                </div>
                <h3 className="product-name">CHRONOS S10</h3>
                <button
                  className={`product-add-btn${added[p.id] ? ' added' : ''}`}
                  onClick={() => handleAdd(p)}
                >
                  {added[p.id] ? '✓ ADDED' : 'ADD TO CART'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
