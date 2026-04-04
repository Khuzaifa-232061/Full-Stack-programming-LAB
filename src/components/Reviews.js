import React, { useState, useEffect, useRef } from 'react';
import './Reviews.css';

const reviews = [
  { stars: 5, text: 'Best smartwatch I\'ve ever worn. The health tracking is incredibly accurate and the battery lasts for days.', avatar: 'JM', name: 'Janon Moten' },
  { stars: 5, text: 'The design is absolutely stunning. I get compliments every single day. Worth every penny without question.', avatar: 'JA', name: 'Joan Aro' },
  { stars: 5, text: 'Seamless connectivity with all my devices. The ECG feature is a genuine game changer for workouts.', avatar: 'JS', name: 'Jonah Stoves' },
  { stars: 5, text: 'Switched brands after four years. CHRONOS is in a completely different league. The display is incredible.', avatar: 'LK', name: 'Lisa Kern' },
];

export default function Reviews() {
  const [cur, setCur] = useState(0);
  const trackRef = useRef(null);
  const total = reviews.length;

  const getVisible = () => {
    if (!trackRef.current) return 1;
    const cardW = trackRef.current.children[0]?.offsetWidth || 1;
    return Math.max(1, Math.floor(trackRef.current.parentElement.offsetWidth / cardW));
  };

  const go = (i) => {
    const max = Math.max(0, total - getVisible());
    const next = Math.max(0, Math.min(i, max));
    setCur(next);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCur(prev => {
        const max = Math.max(0, total - getVisible());
        return prev + 1 > max ? 0 : prev + 1;
      });
    }, 4200);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!trackRef.current) return;
    const cardW = trackRef.current.children[0]?.offsetWidth || 0;
    trackRef.current.style.transform = `translateX(-${cardW * cur}px)`;
  }, [cur]);

  return (
    <section className="reviews-section" id="reviews">
      <div className="section-header-bar">
        <span className="bar-label">04 / USER STORIES</span>
        <span className="bar-line"></span>
      </div>
      <div className="reviews-inner">
        <div className="reviews-track-wrap">
          <div className="reviews-track" ref={trackRef}>
            {reviews.map((r, i) => (
              <div className="review-card" key={i}>
                <div className="stars">{'★'.repeat(r.stars)}</div>
                <p>"{r.text}"</p>
                <div className="reviewer">
                  <div className="avatar">{r.avatar}</div>
                  <span>{r.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="carousel-dots">
          {reviews.map((_, i) => (
            <button key={i} className={`dot${cur === i ? ' active' : ''}`} onClick={() => go(i)} />
          ))}
        </div>
      </div>
    </section>
  );
}
