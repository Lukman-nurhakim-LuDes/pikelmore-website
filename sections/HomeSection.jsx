// sections/HomeSection.jsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link'; 
import { useAdmin } from '@/context/AdminContext';
import { fetchContent, updateContent } from '@/lib/api'; 
// import Image from 'next/image'; // Jika Anda menggunakan komponen Next/Image

const HomeSection = ({ id }) => {
  const { isEditMode } = useAdmin();
  const [headline, setHeadline] = useState("Memuat Headline...");
  const [isSaving, setIsSaving] = useState(false);
  const contentId = 'home_headline'; 

  // Ambil data dari Supabase saat komponen dimuat
  useEffect(() => {
    const loadContent = async () => {
      const fetchedHeadline = await fetchContent(contentId);
      if (fetchedHeadline) {
        setHeadline(fetchedHeadline);
      } else {
        setHeadline("Pikelmore: Abadikan Momen Tak Terlupakan"); // Fallback
      }
    };
    loadContent();
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    const { success } = await updateContent(contentId, headline);
    
    if (success) {
      alert('Headline Home Section berhasil diperbarui!');
    } else {
      alert('Gagal menyimpan headline.');
    }
    setIsSaving(false);
  };

  return (
    // Background diatur ke black untuk Dark Aesthetic
    <section id={id} className="relative h-screen flex items-center justify-center text-white overflow-hidden bg-pikelmore-black">
      
      {/* Background Image (Ganti URL dengan gambar Anda di folder public/ atau Storage) */}
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/pikelmore-bg.jpg')" }}>
        <div className="absolute inset-0 bg-black opacity-30"></div>
      </div>
      
      <div className={`relative z-10 text-center max-w-4xl px-6 ${isEditMode ? 'border-dashed border-2 border-red-500 p-4' : ''}`}>
        
        {/* Tombol Simpan CMS */}
        {isEditMode && (
          <div className="mb-4">
            <button 
              onClick={handleSave}
              disabled={isSaving}
              className="bg-red-600 text-white text-sm font-semibold px-4 py-2 rounded-md hover:bg-red-700 disabled:bg-gray-400"
            >
              {isSaving ? 'Menyimpan...' : 'Simpan Headline'}
            </button>
          </div>
        )}

        {/* EDITABLE HEADLINE */}
        {isEditMode ? (
          <textarea
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
            // Text Hitam saat edit
            className="font-display text-5xl md:text-7xl font-extrabold mb-4 p-2 w-full text-center text-pikelmore-dark" 
            rows="3"
          />
        ) : (
          // JUDUL PUTIH UTAMA
          <h1 className="font-display text-5xl md:text-7xl font-extrabold mb-4 leading-tight text-white">
            {headline}
          </h1>
        )}
        
        {/* Sub-headline */}
        <p className="font-body text-xl md:text-2xl mb-8 text-white/90">
          Jasa Fotografi Premium untuk Pernikahan, Pre-Wedding, dan Acara Spesial.
        </p>
        
        {/* Tombol CTA (Mocca Aesthetic) */}
        <Link 
          href="/content" 
          // Warna Mocca sebagai aksen utama (bg-pikelmore-mocca)
          className="bg-pikelmore-mocca text-white font-body font-bold py-3 px-8 rounded-full text-lg shadow-xl hover:bg-pikelmore-taupe transition-colors inline-block"
        >
          Lihat Paket Harga
        </Link>
      </div>
    </section>
  );
};

export default HomeSection;