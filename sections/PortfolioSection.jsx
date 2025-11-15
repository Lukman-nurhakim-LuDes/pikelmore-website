// sections/PortfolioSection.jsx (VERSI FINAL, LENGKAP, DAN TERBAIK)

import React from 'react';
import PortfolioGallery from '@/components/PortfolioGallery';
import PortfolioZigzag from '@/components/PortfolioZigzag';

const PortfolioSection = ({ id }) => {
  return (
    // Background Gelap Konsisten (bg-pikelmore-dark)
    <section id={id} className="pt-24 pb-12 md:pt-32 md:pb-16 bg-pikelmore-dark text-white">
      <div className="container mx-auto px-6 md:px-8 text-center">
        
        {/* Judul Utama Section */}
        <h2 className="font-display text-5xl font-bold mb-16 text-white">
          Portfolio Kami
        </h2>
        
        {/* --- 1. Portfolio Gallery (10 Gambar) --- */}
        <PortfolioGallery />
        
        {/* --- 2. Portfolio Zigzag (6 Gambar + Teks) --- */}
        <PortfolioZigzag />
        
      </div>
    </section>
  );
};
export default PortfolioSection;