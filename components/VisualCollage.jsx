// components/VisualCollage.jsx (VERSI FINAL: FULL WIDTH & NO PADDING)
'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useAdmin } from '@/context/AdminContext'; 
import { fetchContent, updateContent, uploadImage } from '@/lib/api'; 
import Image from 'next/image'; 
import { getUniqueUrl } from '@/lib/utils'; 

const VisualCollage = () => {
  const { isEditMode } = useAdmin();
  
  const [content, setContent] = useState({ 
    title: 'PIXELMORÉ', tagline: 'More Than Just Moments',
    url_main: '', 
  });
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const titleId = 'collage_title';
  const taglineId = 'collage_tagline';
  const urlId = 'collage_url_main';

  // --- 1. Fetch Konten ---
  useEffect(() => {
    const loadContent = async () => {
        const fetchedTitle = await fetchContent(titleId);
        const fetchedTagline = await fetchContent(taglineId);
        const fetchedUrl = await fetchContent(urlId); 
    
        setContent(prev => ({
            ...prev,
            title: fetchedTitle || prev.title,
            tagline: fetchedTagline || prev.tagline,
            url_main: fetchedUrl,
        }));
        setIsLoading(false);
    };
    loadContent();
  }, []);

  // --- 2. Fungsi Simpan Teks ---
  const handleSave = async () => {
    setIsSaving(true);
    await updateContent(titleId, content.title);
    await updateContent(taglineId, content.tagline);
    setIsSaving(false);
    alert('Teks teaser berhasil disimpan!');
  };
  
  // --- Logika Upload Gambar ---
  const fileInputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async (file) => {
    if (!file) return;
    setIsUploading(true);
    const fileName = `single-teaser-${Date.now()}`; 
    
    const { success, url: newUrl } = await uploadImage(file, fileName, 'collage'); 
    if (success) {
        setContent(c => ({...c, url_main: newUrl}));
        await updateContent(urlId, newUrl); 
        alert('Gambar Teaser berhasil diunggah!');
    } else {
        alert(`Gagal mengunggah gambar: ${newUrl || 'Lihat konsol.'}`);
    }
    setIsUploading(false);
  };
  

  if (isLoading) return <div className="text-center py-32 text-pikelmore-black">Memuat Visual...</div>;

  return (
    // FIX: Gunakan bg-transparent dan hapus padding default section
    <section className="bg-transparent text-pikelmore-black p-0 md:p-0"> 
      {/* Hapus container mx-auto px-6 md:px-8 max-w-5xl jika ingin benar-benar full-width */}
      <div className="relative w-full overflow-hidden"> 

        {/* --- Konten Teks Edit Teks (DI LUAR AREA FOTO) --- */}
        {isEditMode && (
          <div className="text-center font-display mb-4 text-pikelmore-black border border-dashed border-red-500 p-3 mx-auto max-w-5xl z-30 relative bg-white">
            <button onClick={handleSave} disabled={isSaving} className="bg-red-600 text-white text-sm font-semibold px-4 py-2 rounded-md hover:bg-red-700 disabled:bg-gray-400 mb-4">
                {isSaving ? 'Menyimpan Teks...' : 'Simpan Teks Teaser'}
            </button>
            <input type="text" value={content.title} onChange={(e) => setContent(c => ({...c, title: e.target.value}))} className="font-display text-4xl md:text-6xl font-extrabold mb-1 text-black border p-1 text-center w-full" />
            <input type="text" value={content.tagline} onChange={(e) => setContent(c => ({...c, tagline: e.target.value}))} className="text-sm font-body text-pikelmore-dark-grey w-full text-center border p-1" />
          </div>
        )}

        {/* --- AREA FOTO LANDSCAPE PENUH (FOKUS UTAMA) --- */}
        {/* FIX: Hapus border dan gunakan w-full h-auto untuk mengisi lebar */}
        <div 
            className="relative w-full h-auto overflow-hidden group" 
            style={{ aspectRatio: '16 / 9' }} // Landscape 16:9
        >
            
            {/* GAMBAR LANDSCAPE (Background / Image Component) */}
            {content.url_main ? (
                <Image 
                    src={getUniqueUrl(content.url_main)}
                    alt={content.title || "PIXELMORÉ Cinematic Teaser"}
                    fill 
                    style={{ objectFit: 'cover' }} 
                    priority 
                    sizes="100vw" // FIX: Ambil seluruh lebar viewport
                />
            ) : (
                <div className="w-full h-full bg-pikelmore-taupe flex items-center justify-center text-white/70">
                    FOTO LANDSCAPE PENUH BELUM DIUNGGAH
                </div>
            )}
            
            {/* ... (KONTEN TEKS DIPOSISIKAN DI TENGAH GAMBAR) ... */}
            {!isEditMode && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 z-10 bg-black/30">
                    <h2 className="font-display text-4xl md:text-6xl font-extrabold mb-1 text-white uppercase tracking-widest">
                        {content.title}
                    </h2>
                    <p className="text-sm font-body text-pikelmore-ivory">
                        {content.tagline}
                    </p>
                </div>
            )}
            
            {/* Antarmuka Edit/Upload Gambar */}
            {isEditMode && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20">
                    <input type="file" ref={fileInputRef} className="hidden" onChange={(e) => handleUpload(e.target.files[0])} accept="image/*" disabled={isUploading}/>
                    <button 
                        onClick={() => fileInputRef.current.click()}
                        className="bg-red-600 text-white px-4 py-2 text-md rounded hover:bg-red-700 disabled:bg-gray-400"
                        disabled={isUploading}
                    >
                        {isUploading ? 'Mengunggah...' : 'Upload Gambar Landscape'}
                    </button>
                </div>
            )}
        </div>
        
        {/* Watermark/Kaki Gambar */}
        {!isEditMode && (
            <div className="text-center font-body text-xs text-pikelmore-dark-grey mt-2">
                PIXELMORÉ
            </div>
        )}
        
      </div>
    </section>
  );
};
export default VisualCollage;