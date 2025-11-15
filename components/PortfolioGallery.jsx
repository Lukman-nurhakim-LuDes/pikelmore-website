// components/PortfolioGallery.jsx (VERSI FINAL: Slide Show + Object Cover)
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useAdmin } from '@/context/AdminContext';
import { fetchContent, updateContent, uploadImage } from '@/lib/api'; 
import Image from 'next/image';
import LightboxModal from './LightboxModal'; 
import { getUniqueUrl } from '@/lib/utils'; // Cache Busting

// --- WAJIB IMPORT SWIPER ---
import { Swiper, SwiperSlide } from 'swiper/react'; 
import { Pagination, Navigation, Autoplay } from 'swiper/modules'; 
// Asumsi: CSS Swiper sudah di-import di app/content/page.tsx
// ----------------------------

const PortfolioGallery = () => {
    const { isEditMode } = useAdmin();
    const [images, setImages] = useState(Array(10).fill({ id: '', url: '' })); 
    const [isLoading, setIsLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null); 

    const IMAGE_COUNT = 10;

    // --- 1. Logic Fetch Gambar dari Supabase ---
    useEffect(() => {
        const loadImages = async () => {
            const fetchedImages = [];
            for (let i = 1; i <= IMAGE_COUNT; i++) {
                const id = `gallery_url_${i}`;
                const url = await fetchContent(id); 
                fetchedImages.push({ id, url: url || '' });
            }
            setImages(fetchedImages);
            setIsLoading(false);
        };
        loadImages();
    }, []);

    const closeLightbox = () => setSelectedImage(null);
    
    // --- 2. Komponen Placeholder dengan Logic Upload & Object-Cover ---
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
            // SwiperSlide akan memberikan tinggi dan lebar otomatis
            <div 
                className={`relative overflow-hidden shadow-xl group cursor-pointer ${className}`}
                // Beri tinggi eksplisit untuk slide
                style={{ border: isEditMode ? '2px dashed red' : 'none', height: '300px' }} 
                onClick={() => !isEditMode && image.url && setSelectedImage(image.url)}
            >
                
                {/* Tampilan Gambar (KUNCI PERBAIKAN: object-cover) */}
                {image.url && !isUploading ? (
                    <div className="relative w-full h-full bg-pikelmore-taupe">
                         <Image
                            src={getUniqueUrl(image.url)} 
                            alt={`Galeri Foto ${index}`}
                            fill 
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                            // FIX: object-cover mengisi penuh slide tanpa padding
                            className="object-cover transition-transform duration-300 group-hover:scale-105" 
                        />
                    </div>
                ) : (
                    // Placeholder default
                    <div className="w-full h-full bg-pikelmore-taupe flex items-center justify-center text-white/70">
                        {innerContent}
                    </div>
                )}

                {/* ... (Antarmuka Upload dan EFEK HOVER tetap sama) ... */}
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
            
            {/* --- SLIDE SHOW IMPLEMENTATION (FINAL) --- */}
            <div className="mx-auto w-full overflow-hidden"> 
                <Swiper
                    modules={[Pagination, Navigation, Autoplay]}
                    spaceBetween={20} // Jarak antar slide
                    slidesPerView={1.2}  // KUNCI: 1.2 slide agar ada preview slide berikutnya
                    centeredSlides={false} // KUNCI: Tidak ada padding berlebih di sisi
                    pagination={{ clickable: true }}
                    navigation={true}
                    loop={true}
                    autoplay={{ delay: 5000, disableOnInteraction: false }} 
                    breakpoints={{
                        640: { 
                            slidesPerView: 2.2, // 2 slide + preview
                        }, 
                        1024: { 
                            slidesPerView: 3.2, // 3 slide + preview
                        }
                    }}
                    className="mySwiper"
                >
                    {images.map((image, index) => (
                        <SwiperSlide key={image.id}>
                            <ImagePlaceholder 
                                image={image} 
                                index={index + 1} 
                                className="mb-10" // Margin bawah untuk pagination dots
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
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