// sections/PortfolioSection.jsx (VERSI FINAL, LENGKAP, DAN TERBAIK)

import React from 'react';
import PortfolioGallery from '@/components/PortfolioGallery'; // <-- Sekarang ini adalah SWIPER
import PortfolioZigzag from '@/components/PortfolioZigzag';

const PortfolioSection = ({ id }) => {
  return (
    // Background Gelap Konsisten (bg-pikelmore-dark)
    <section id={id} className="pt-24 pb-12 md:pt-32 md:pb-16 bg-pikelmore-dark text-white">
      {/* Container utama section */}
      <div className="container mx-auto px-4 md:px-8 text-center">
        
        {/* Judul Utama Section */}
        <h2 className="font-display text-5xl font-bold mb-16 text-white">
          Portfolio Kami
        </h2>
        
        {/* --- 1. Portfolio Gallery (SLIDE SHOW SWIPER) --- */}
        {/* Gallery sekarang akan tampil sebagai slide show yang bisa digeser */}
        <PortfolioGallery />
        
        {/* --- 2. Portfolio Zigzag (6 Gambar + Teks) --- */}
        <PortfolioZigzag />
        
      </div>
    </section>
  );
};
export default PortfolioSection;