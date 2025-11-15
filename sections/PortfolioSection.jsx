// sections/PortfolioSection.jsx (VERSI FINAL: Fix Padding Mobile)

import React from 'react';
import PortfolioGallery from '@/components/PortfolioGallery';
import PortfolioZigzag from '@/components/PortfolioZigzag';

const PortfolioSection = ({ id }) => {
  return (
    // Background Gelap Konsisten (bg-pikelmore-dark)
    <section id={id} className="pt-24 pb-12 md:pt-32 md:pb-16 bg-pikelmore-dark text-white">
      {/* KUNCI: px-4 untuk padding yang aman di semua mobile (container) */}
      <div className="container mx-auto px-4 md:px-8 text-center">
        
        {/* Judul Utama Section */}
        <h2 className="font-display text-5xl font-bold mb-16 text-white">
          Portfolio Kami
        </h2>
        
        {/* --- 1. Portfolio Gallery (10 Gambar) --- */}
        {/* Component ini sekarang tidak perlu padding internal, sudah ditangani container di atas */}
        <PortfolioGallery /> 
        
        {/* --- 2. Portfolio Zigzag (6 Gambar + Teks) --- */}
        <PortfolioZigzag />
        
      </div>
    </section>
  );
};
export default PortfolioSection;