// components/PortfolioGallery.jsx
'use client'; // Client Component untuk efek hover dinamis

import React from 'react';

// Anda akan mengganti ini dengan URL gambar dari Supabase Storage Anda
const galleryImages = Array(10).fill(0).map((_, i) => ({ 
    id: i + 1, 
    // Contoh URL dari Supabase Storage (hanya placeholder)
    src: `/images/galeri${i + 1}.jpg` 
}));

const PortfolioGallery = () => {
  return (
    <div className="mb-24">
      <h3 className="font-display text-3xl font-semibold mb-12 text-pikelmore-dark-grey">
        Koleksi Foto Terbaik Pikelmore
      </h3>
      
      {/* Layout Grid Responsif: 2 kolom di Mobile, 5 kolom di Desktop */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
        {galleryImages.map((image) => (
          <div key={image.id} className="relative overflow-hidden h-48 md:h-64 shadow-xl group cursor-pointer">
            {/* Placeholder Visual untuk Gambar */}
            <div 
                className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500 font-body transition-transform duration-500 group-hover:scale-110"
                style={{ 
                    // Ganti dengan style={{backgroundImage: `url(${image.src})`, backgroundSize: 'cover'}}
                    // Setelah Anda menempatkan gambar di public/ atau Supabase Storage
                    backgroundImage: 'linear-gradient(135deg, #f0f0f0, #e0e0e0)' 
                }}
            >
              [Gambar {image.id}]
            </div>
            
            {/* Efek Hover dan Keterangan */}
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white font-body text-sm opacity-0 group-hover:opacity-100 transition-opacity">Lihat Detail</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default PortfolioGallery;