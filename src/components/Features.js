import React, { useEffect, useRef } from 'react';
import './Features.css';

const features = [
  {
    num: '01',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z"/></svg>,
    title: <>HEALTH &amp;<br/>WELLNESS</>,
    desc: 'Meet clinically-grade sensors in advanced health tracking and wellness monitoring.'
  },
  {
    num: '02',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>,
    title: <>ACTIVE<br/>TRACKING</>,
    desc: 'Train smarter with streaming data. Measure your active performance in real time.'
  },
  {
    num: '03',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
    title: <>STAY<br/>CONNECTED</>,
    desc: 'Seamless connectivity, always on top. Stay connected and secure wherever you go.'
  },
  {
    num: '04',
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="6" y="2" width="12" height="20" rx="2"/><line x1="6" y1="9" x2="4" y2="9"/><line x1="18" y1="9" x2="20" y2="9"/></svg>,
    title: <>LONG<br/>BATTERY</>,
    desc: 'Up to 72 hours continuous. So you can focus on living, not charging.'
  }
];

export default function Features() {
  const refs = useRef([]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } }),
      { threshold: 0.1 }
    );
    refs.current.forEach(el => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <section className="features-section" id="features">
      <div className="section-header-bar">
        <span className="bar-label">01 / FEATURES</span>
        <span className="bar-line"></span>
      </div>
      <div className="features-grid">
        {features.map((f, i) => (
          <div className="feature-block reveal" key={f.num} ref={el => refs.current[i] = el}>
            <div className="feat-number">{f.num}</div>
            <div className="feat-content">
              <div className="feat-icon-wrap">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
