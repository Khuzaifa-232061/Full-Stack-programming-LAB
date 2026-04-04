import React, { useState } from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Customize from '../components/Customize';
import TechSpecs from '../components/TechSpecs';
import Reviews from '../components/Reviews';
import Footer from '../components/Footer';

const HERO_IMGS = {
  silver:      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=700&q=80&auto=format&fit=crop',
  'space-gray':'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=700&q=80&auto=format&fit=crop',
  'rose-gold': 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=700&q=80&auto=format&fit=crop',
  blue:        'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=700&q=80&auto=format&fit=crop',
};

export default function Home() {
  const [heroImg, setHeroImg] = useState(HERO_IMGS.silver);

  const handleColorChange = (img) => setHeroImg(img);

  return (
    <>
      <Hero watchSrc={heroImg} />
      <Features />
      <Customize onColorChange={handleColorChange} />
      <TechSpecs />
      <Reviews />
      <Footer />
    </>
  );
}
