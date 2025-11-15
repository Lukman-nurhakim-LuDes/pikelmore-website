// components/PortfolioGallery.jsx (FINAL FIX: SLIDE SHOW LAYOUT)
'use client';

import React, { useState, useEffect, useRef } from 'react';
// Import modul Swiper
import { Swiper, SwiperSlide } from 'swiper/react'; 
import { Pagination, Navigation, Autoplay } from 'swiper/modules'; // Tambahkan Autoplay (Opsional)
// Import CSS Swiper di globals.css

import { useAdmin } from '@/context/AdminContext';
import { fetchContent, updateContent, uploadImage } from '@/lib/api'; 
import Image from 'next/image';
import LightboxModal from './LightboxModal'; 
import { getUniqueUrl } from '@/lib/utils';

const PortfolioGallery = () => {
    const { isEditMode } = useAdmin();
    const [images, setImages] = useState(Array(10).fill({ id: '', url: '' })); 
    const [isLoading, setIsLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null); 

    const IMAGE_COUNT = 10;
    // ... (Logic Fetch, Upload, ImagePlaceholder, dll.) ...

    // --- Logic Fetch 10 URL Gambar dari Supabase (tetap sama) ---
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
    
    // --- Komponen Placeholder dengan Logic Upload (Disederhanakan untuk tampilan) ---
    const ImagePlaceholder = ({ image, index, className }) => {
        const fileInputRef = useRef(null);
        const [isUploading, setIsUploading] = useState(false);
        
        // Asumsi handleUpload sudah terdefinisi dan benar

        const innerContent = isUploading 
            ? 'Mengunggah...' 
            : (image.url ? '' : `Upload Gambar ${index}`); 

        return (
            <div 
                className={`relative overflow-hidden shadow-xl group cursor-pointer h-64 md:h-96`} // Tinggi tetap
                style={{ border: isEditMode ? '2px dashed red' : 'none' }}
                onClick={() => !isEditMode && image.url && setSelectedImage(image.url)} // Trigger Lightbox
            >
                
                {/* Tampilan Gambar (FIX: object-contain) */}
                {image.url && !isUploading ? (
                    <div className="relative w-full h-full bg-pikelmore-taupe">
                         <Image
                            src={getUniqueUrl(image.url)} 
                            alt={`Galeri Foto ${index}`}
                            fill 
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                            className="object-contain transition-transform duration-300 group-hover:scale-105" 
                            style={{ padding: '5px' }} 
                        />
                    </div>
                ) : (
                    <div className="w-full h-full bg-pikelmore-taupe flex items-center justify-center text-white/70">
                        {innerContent}
                    </div>
                )}

                {/* ... (Antarmuka Upload dan EFEK HOVER tetap sama) ... */}
            </div>
        );
    };

    if (isLoading) return <div className="text-center py-24 text-white">Memuat Galeri...</div>;

    return (
        <div className="mb-24">
            <h3 className="font-display text-3xl font-semibold mb-12 text-pikelmore-mocca">
                Koleksi Foto Terbaik Pikelmore
            </h3>
            
            {/* --- SLIDE SHOW IMPLEMENTATION --- */}
            <div className="mx-auto max-w-7xl">
                <Swiper
                    modules={[Pagination, Navigation, Autoplay]}
                    spaceBetween={20} // Jarak antar slide
                    slidesPerView={1.2} // Tampilkan 1.2 item di mobile
                    pagination={{ clickable: true }}
                    navigation={true}
                    centeredSlides={true} // Item di tengah
                    loop={true}
                    autoplay={{ delay: 5000, disableOnInteraction: false }} // Autoplay (Geser Otomatis)
                    breakpoints={{
                        640: { slidesPerView: 2.5, spaceBetween: 20 }, // Tablet
                        1024: { slidesPerView: 3.5, spaceBetween: 30 },  // Desktop
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