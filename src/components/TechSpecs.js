import React, { useEffect, useRef } from 'react';
import './TechSpecs.css';

const specs = [
  {
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>,
    title: 'DISPLAY',
    items: ['Always-on Retina LTPO', '2000 nits peak brightness', 'Selectable display types']
  },
  {
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="6" y="2" width="12" height="20" rx="2"/><line x1="6" y1="9" x2="4" y2="9"/><line x1="18" y1="9" x2="20" y2="9"/></svg>,
    title: 'BATTERY',
    items: ['1400 mAh capacity', '72-hour continuous life', 'Fast charge 0–80% / 45 min']
  },
  {
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
    title: 'SENSORS',
    items: ['ECG + Blood Oxygen', 'Skin temperature', '6-axis motion + altimeter']
  },
  {
    icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M1.05 12A11 11 0 0 0 12 22.95A11 11 0 0 0 22.95 12A11 11 0 0 0 12 1.05A11 11 0 0 0 1.05 12z"/><path d="M12 6v6l4 2"/></svg>,
    title: 'CONNECTIVITY',
    items: ['Bluetooth 5.3 LE', 'Wi-Fi 802.11 b/g/n', 'NFC payment ready']
  }
];

export default function TechSpecs() {
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
    <section className="tech-specs-section" id="tech-specs">
      <div className="section-header-bar">
        <span className="bar-label">03 / TECH SPECS</span>
        <span className="bar-line"></span>
      </div>
      <div className="specs-inner">
        {specs.map((s, i) => (
          <div className="spec-block reveal" key={s.title} ref={el => refs.current[i] = el}>
            <div className="spec-icon-wrap">{s.icon}</div>
            <h4>{s.title}</h4>
            <ul>{s.items.map(item => <li key={item}>{item}</li>)}</ul>
          </div>
        ))}
      </div>
    </section>
  );
}
