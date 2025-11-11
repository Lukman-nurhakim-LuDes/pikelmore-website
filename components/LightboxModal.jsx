// components/LightboxModal.jsx
'use client';

import React from 'react';
import Image from 'next/image';

const LightboxModal = ({ src, alt, onClose }) => {
  if (!src) return null;

  return (
    // Backdrop Overlay (Latar Belakang Gelap)
    <div 
      className="fixed inset-0 bg-black/90 z-[1001] flex items-center justify-center p-4 cursor-pointer" 
      onClick={onClose} // Menutup modal saat mengklik di luar gambar
    >
      {/* Konten Modal */}
      <div 
        className="relative max-w-full max-h-full w-full h-full md:max-w-4xl md:max-h-[90vh]" 
        onClick={(e) => e.stopPropagation()} // Mencegah modal tertutup saat mengklik gambar
      >
        <div className="relative w-full h-full">
          <Image
            src={src}
            alt={alt}
            fill // Mengisi div parent
            style={{ objectFit: 'contain' }} // Kunci: Memperlihatkan gambar penuh tanpa terpotong
            sizes="(max-width: 768px) 100vw, 80vw"
            className="rounded-lg shadow-2xl"
          />
        </div>
      </div>
      
      {/* Tombol Tutup */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white text-4xl p-2 z-[1002] transition-colors hover:text-red-500"
      >
        &times;
      </button>
    </div>
  );
};

export default LightboxModal;