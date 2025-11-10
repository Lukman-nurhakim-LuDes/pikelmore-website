// components/PortfolioZigzag.jsx (VERSI CMS EDIT LANGSUNG FINAL)
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useAdmin } from '@/context/AdminContext';
import { fetchContent, updateContent, uploadImage } from '@/lib/api';

// Data dasar untuk 6 segmen
const ZIGZAG_ITEMS = Array(6).fill(0).map((_, i) => ({
    id: i + 1,
    titleId: `zigzag_title_${i + 1}`,
    textId: `zigzag_text_${i + 1}`,
    urlId: `zigzag_url_${i + 1}`,
    reverse: (i + 1) % 2 === 0, // Untuk tata letak zigzag (setiap segmen genap dibalik)
}));

const PortfolioZigzag = () => {
    const { isEditMode } = useAdmin();
    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState({}); // Status saving per item

    // --- 1. Fetch Semua Konten (18 Item) dari Supabase ---
    useEffect(() => {
        const loadContent = async () => {
            const allContentIds = ZIGZAG_ITEMS.flatMap(item => [item.titleId, item.textId, item.urlId]);
            const fetchedData = {};
            
            for (const id of allContentIds) {
                fetchedData[id] = await fetchContent(id);
            }
            setData(fetchedData);
            setIsLoading(false);
        };
        loadContent();
    }, []);

    // --- 2. Komponen Edit untuk Teks (Judul & Deskripsi) ---
    const EditableText = ({ id, type = 'text' }) => {
        const [localValue, setLocalValue] = useState(data[id] || '');

        useEffect(() => {
            setLocalValue(data[id] || '');
        }, [data, id]);

        const handleSave = async () => {
            setIsSaving(prev => ({ ...prev, [id]: true }));
            const success = await updateContent(id, localValue);
            if (success) {
                alert(`Teks untuk ${id} berhasil disimpan!`);
                setData(prev => ({ ...prev, [id]: localValue })); 
            } else {
                alert(`Gagal menyimpan ${id}.`);
            }
            setIsSaving(prev => ({ ...prev, [id]: false }));
        };

        // Tampilan Normal
        if (!isEditMode) {
            const displayValue = data[id] || `[${id} - Teks Kosong]`;
            return type === 'title' 
                ? <h3 className="font-display text-4xl font-bold text-pikelmore-mocca mb-4">{displayValue}</h3>
                : <p className="font-body text-white/90">{displayValue}</p>; // Teks putih di background gelap
        }

        // Tampilan Edit Mode
        return (
            <div className="relative border p-2 mb-2 border-red-500 rounded bg-white">
                <textarea
                    value={localValue}
                    onChange={(e) => setLocalValue(e.target.value)}
                    className={`w-full p-2 bg-white text-pikelmore-dark-grey ${type === 'title' ? 'text-2xl font-bold h-12' : 'h-24'}`}
                    placeholder={`Edit ${id}`}
                />
                <button
                    onClick={handleSave}
                    disabled={isSaving[id]}
                    className="mt-2 px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 disabled:bg-gray-400"
                >
                    {isSaving[id] ? 'Menyimpan...' : 'Simpan Edit'}
                </button>
            </div>
        );
    };

    // --- 4. Komponen Edit untuk Gambar (Upload Langsung) ---
    const EditableImage = ({ id, url }) => {
        const fileInputRef = useRef(null);
        const [isUploading, setIsUploading] = useState(false);

        const handleUpload = async (file) => {
            if (!file) return;

            setIsUploading(true);
            const fileName = `zigzag-${id}-${Date.now()}`; 
            
            const { success, url: newUrl } = await uploadImage(file, fileName, 'portfolio'); 

            if (success) {
                setData(prev => ({ ...prev, [id]: newUrl })); // Update state lokal
                await updateContent(id, newUrl); // Simpan URL baru ke DB
                alert('Gambar Zigzag berhasil diunggah!');
            } else {
                alert(`Gagal mengunggah gambar: ${newUrl || 'Lihat konsol.'}`);
            }
            setIsUploading(false);
        };

        const imageStyle = url 
            ? { backgroundImage: `url(${url})` }
            : { backgroundColor: isEditMode ? '#FFCCCC' : '#F0F0F0' }; // Placeholder

        return (
            <div className="relative h-64 md:h-96 w-full shadow-lg overflow-hidden group" 
                style={{ border: isEditMode ? '3px solid blue' : 'none' }}>
                
                <div 
                    className={`w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105 ${isUploading ? 'opacity-50' : ''}`}
                    style={imageStyle}
                >
                    {/* Tampilkan teks jika tidak ada URL gambar */}
                    {!url && <div className="flex items-center justify-center h-full text-gray-700 font-bold">GAMBAR KOSONG</div>}
                </div>

                {/* Antarmuka Upload (Hanya Tampil di Edit Mode) */}
                {isEditMode && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <input type="file" ref={fileInputRef} className="hidden" onChange={(e) => handleUpload(e.target.files[0])} accept="image/*" disabled={isUploading}/>
                        <button 
                            onClick={() => fileInputRef.current.click()}
                            className="bg-blue-600 text-white px-3 py-1 text-sm rounded hover:bg-blue-700 disabled:bg-gray-400"
                            disabled={isUploading}
                        >
                            {isUploading ? 'Upload...' : 'Ganti Gambar'}
                        </button>
                    </div>
                )}
            </div>
        );
    };

    if (isLoading) return <div className="text-center py-24 text-white">Memuat Konten Zigzag...</div>;

    return (
        <div className="py-16 md:py-24 bg-pikelmore-dark"> {/* Background gelap untuk kontras */}
            <h2 className="text-center font-display text-4xl font-semibold mb-16 text-pikelmore-mocca">
                Proyek Unggulan Kami
            </h2>

            {ZIGZAG_ITEMS.map((item, index) => (
                <div 
                    key={item.id} 
                    className={`flex flex-col md:flex-row items-center gap-8 md:gap-12 mb-20 ${item.reverse ? 'md:flex-row-reverse' : ''}`}
                >
                    {/* Kolom Gambar */}
                    <div className="w-full md:w-1/2">
                        <EditableImage id={item.urlId} url={data[item.urlId]} />
                    </div>

                    {/* Kolom Teks */}
                    <div className="w-full md:w-1/2">
                        <div className="p-4 md:p-8 bg-pikelmore-black/50 shadow-xl rounded-lg"> {/* Kontainer teks gelap transparan */}
                            {/* Judul */}
                            <EditableText id={item.titleId} type="title" />
                            
                            {/* Deskripsi */}
                            <EditableText id={item.textId} type="text" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
export default PortfolioZigzag;