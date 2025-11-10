// sections/AboutSection.jsx
'use client'; 

import React, { useState, useEffect } from 'react';
import { useAdmin } from '@/context/AdminContext';
import { fetchContent, updateContent } from '@/lib/api'; // Ambil API CMS

const AboutSection = ({ id }) => {
  const { isEditMode } = useAdmin();
  const [title, setTitle] = useState("Memuat Judul...");
  const [description, setDescription] = useState("Memuat Deskripsi...");
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // ID Konten di tabel 'content'
  const titleId = 'about_title';
  const descId = 'about_description';

  // --- Mengambil Konten dari Supabase ---
  useEffect(() => {
    const loadContent = async () => {
      // Mengambil dua item konten sekaligus
      const fetchedTitle = await fetchContent(titleId);
      const fetchedDesc = await fetchContent(descId);
      
      if (fetchedTitle) setTitle(fetchedTitle);
      if (fetchedDesc) setDescription(fetchedDesc);
      setIsLoading(false);
    };
    loadContent();
  }, []);

  // --- Fungsi Menyimpan Perubahan ke Supabase ---
  const handleSave = async () => {
    setIsSaving(true);
    
    // Update Judul dan Deskripsi secara terpisah
    await updateContent(titleId, title);
    await updateContent(descId, description);

    alert('About Section berhasil diperbarui!');
    setIsSaving(false);
  };

  if (isLoading) {
    return (
      <section id={id} className="py-24 md:py-32 bg-pikelmore-light-grey text-pikelmore-dark-grey text-center">
        <p className="font-body">Memuat Konten About...</p>
      </section>
    );
  }

  return (
    <section id={id} className={`py-24 md:py-32 bg-pikelmore-light-grey text-pikelmore-dark-grey relative ${isEditMode ? 'border-dashed border-4 border-red-500' : ''}`}>
      
      {/* Tombol Simpan (Hanya Tampil di Edit Mode) */}
      {isEditMode && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 mt-[-20px] z-10">
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="bg-red-600 text-white text-sm font-semibold px-4 py-2 rounded-md hover:bg-red-700 disabled:bg-gray-400"
          >
            {isSaving ? 'Menyimpan...' : 'Simpan About'}
          </button>
        </div>
      )}

      <div className="container mx-auto px-6 md:px-8 max-w-5xl text-center">
        
        {/* EDITABLE TITLE */}
        {isEditMode ? (
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="font-display text-4xl md:text-5xl font-bold mb-4 text-pikelmore-gold w-full text-center border p-1"
          />
        ) : (
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 text-pikelmore-gold">
            {title}
          </h2>
        )}
        
        {/* EDITABLE DESCRIPTION */}
        {isEditMode ? (
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="font-body text-lg leading-relaxed max-w-3xl mx-auto w-full border p-2"
            rows="5"
          />
        ) : (
          <p className="font-body text-lg leading-relaxed max-w-3xl mx-auto">
            {description}
          </p>
        )}

      </div>
    </section>
  );
};
export default AboutSection;