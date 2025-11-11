// components/PortfolioGallery.jsx (VERSI FINAL TERBAIK)
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useAdmin } from '@/context/AdminContext';
import { fetchContent, updateContent, uploadImage } from '@/lib/api'; 
import Image from 'next/image'; // WAJIB
import LightboxModal from './LightboxModal'; // WAJIB
import { getUniqueUrl } from '@/lib/utils'; // WAJIB untuk Cache Busting

const PortfolioGallery = () => {
    const { isEditMode } = useAdmin();
    // Gunakan state untuk menyimpan 10 URL gambar Galeri dari tabel 'content'
    const [images, setImages] = useState(Array(10).fill({ id: '', url: '' })); 
    const [isLoading, setIsLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null); // State untuk Lightbox

    const IMAGE_COUNT = 10;

    // --- 1. Fetch 10 URL Gambar dari Supabase ---
    useEffect(() => {
        const loadImages = async () => {
            const fetchedImages = [];
            for (let i = 1; i <= IMAGE_COUNT; i++) {
                const id = `gallery_url_${i}`;
                const url = await fetchContent(id); // Mengambil URL dari tabel 'content'
                fetchedImages.push({ id, url: url || '' });
            }
            setImages(fetchedImages);
            setIsLoading(false);
        };
        loadImages();
    }, []);

    const closeLightbox = () => setSelectedImage(null);
    
    // --- 2. Komponen Placeholder dengan Logic Upload ---
    const ImagePlaceholder = ({ image, index, className }) => {
        const fileInputRef = useRef(null);
        const [isUploading, setIsUploading] = useState(false);

        const handleUpload = async (file) => {
            if (!file) return;
            setIsUploading(true);
            const fileName = `gallery-${index}-${Date.now()}`; 
            
            const { success, url: newUrl } = await uploadImage(file, fileName, 'portfolio'); 

            if (success) {
                await updateContent(image.id, newUrl); 
                setImages(prevImages => prevImages.map(img => 
                    img.id === image.id ? { ...img, url: newUrl } : img
                ));
                alert('Gambar galeri berhasil diunggah dan diperbarui!');
            } else {
                alert(`Gagal mengunggah gambar: ${newUrl || 'Lihat konsol.'}`);
            }
            setIsUploading(false);
        };

        const innerContent = isUploading 
            ? 'Mengunggah...' 
            : (image.url ? '' : `Upload Gambar ${index}`); 

        return (
            <div 
                className={`relative overflow-hidden shadow-xl group cursor-pointer ${className}`}
                // Menambahkan aspek rasio 1/1 pada div agar tidak terpotong vertikal
                style={{ border: isEditMode ? '2px dashed red' : 'none', aspectRatio: '1 / 1' }} 
                onClick={() => !isEditMode && image.url && setSelectedImage(image.url)} // <-- TRIGGER LIGHTBOX
            >
                
                {/* Tampilan Gambar (FIX: object-contain) */}
                {image.url && !isUploading ? (
                    <div className="relative w-full h-full bg-pikelmore-taupe">
                         <Image
                            src={getUniqueUrl(image.url)} // <-- MENGGUNAKAN CACHE BUSTING
                            alt={`Galeri Foto ${index}`}
                            fill 
                            sizes="(max-width: 768px) 50vw, 25vw"
                            // KUNCI PERBAIKAN: object-contain menjaga rasio dan mencegah pemotongan
                            className="object-contain transition-transform duration-300 group-hover:scale-105" 
                            style={{ padding: '5px' }} // Padding untuk visual yang rapi
                        />
                    </div>
                ) : (
                    // Placeholder default (warna Mocca/Taupe)
                    <div className="w-full h-full bg-pikelmore-taupe flex items-center justify-center text-white/70">
                        {innerContent}
                    </div>
                )}

                {/* Antarmuka Upload (Hanya Tampil di Edit Mode) */}
                {isEditMode && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20">
                        <input type="file" ref={fileInputRef} className="hidden" onChange={(e) => handleUpload(e.target.files[0])} accept="image/*" disabled={isUploading}/>
                        <button 
                            onClick={() => fileInputRef.current.click()}
                            className="bg-pikelmore-mocca text-white px-3 py-1 text-sm rounded hover:bg-pikelmore-taupe disabled:bg-gray-400"
                            disabled={isUploading}
                        >
                            {isUploading ? 'Upload...' : 'Upload Baru'}
                        </button>
                    </div>
                )}
                
                {/* EFEK HOVER DI MODE VIEW */}
                {!isEditMode && (
                   <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-300 flex items-center justify-center pointer-events-none">
                        <span className="text-white font-body text-sm opacity-0 group-hover:opacity-100 transition-opacity">Lihat Detail</span>
                    </div>
                )}
            </div>
        );
    };

    if (isLoading) return <div className="text-center py-24 text-white">Memuat Galeri...</div>;

    return (
        <div className="mb-24">
            <h3 className="font-display text-3xl font-semibold mb-12 text-pikelmore-mocca">
                Koleksi Foto Terbaik Pikelmore
            </h3>
            
            {/* Grid Galeri */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
                {images.map((image, index) => (
                    <ImagePlaceholder key={image.id} image={image} index={index + 1} className="h-48 md:h-64" />
                ))}
            </div>

            {/* --- Lightbox Modal Component --- */}
            {selectedImage && (
                <LightboxModal 
                    src={selectedImage} 
                    alt="Zoomed Portfolio Image"
                    onClose={closeLightbox}
                />
            )}
        </div>
    );
};
export default PortfolioGallery;