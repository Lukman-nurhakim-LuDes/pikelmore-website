// components/PackageCard.jsx
'use client'; 

import React, { useState } from 'react';
import { updatePackage } from '@/lib/api'; // Import fungsi update
import { formatRupiah } from '@/lib/utils'; 


const PackageCard = ({ packageData, isEditMode }) => {
  // State lokal untuk menyimpan data yang sedang diedit
  const [name, setName] = useState(packageData.name);
  const [price, setPrice] = useState(packageData.price);
  const { id, features, is_popular } = packageData;
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    const updates = { name, price };
    
    // Panggil fungsi API untuk menyimpan perubahan ke Supabase
    const { success } = await updatePackage(id, updates);
    
    if (success) {
      alert(`Paket ${name} berhasil diperbarui di database!`);
    } else {
      alert('Gagal menyimpan perubahan. Cek konsol untuk detail error.');
    }
    setIsSaving(false);
  };

  return (
    <div className={`
      relative bg-white p-8 rounded-xl shadow-lg border-t-8 transition-all duration-300
      ${is_popular ? 'border-pikelmore-gold' : 'border-gray-200'}
      ${isEditMode ? 'border-dashed border-red-500 shadow-xl' : 'hover:shadow-xl'}
    `}>
      
      {/* Tombol Simpan/Edit (Hanya Tampil di Edit Mode) */}
      {isEditMode && (
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="absolute top-[-20px] right-2 bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-md shadow-lg hover:bg-red-700 disabled:bg-gray-400 z-10"
        >
          {isSaving ? 'Menyimpan...' : 'Simpan Edit'}
        </button>
      )}

      {/* Konten Utama */}
      <div className="text-center">
        {/* EDITABLE NAME */}
        {isEditMode ? (
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)}
            className="font-display text-3xl font-bold p-1 border border-gray-400 w-full text-center"
          />
        ) : (
          <h3 className="font-display text-3xl font-bold mb-4 text-pikelmore-dark-grey">{name}</h3>
        )}

        {/* EDITABLE PRICE */}
        {isEditMode ? (
          <input 
            type="number" 
            value={price} 
            onChange={(e) => setPrice(parseInt(e.target.value) || 0)}
            className="font-body text-4xl font-extrabold p-1 border border-gray-400 w-full text-center text-pikelmore-gold"
          />
        ) : (
          <div className="font-body text-4xl font-extrabold mb-6 text-pikelmore-gold">
            {formatRupiah(price)}
          </div>
        )}
      </div>
      
      {/* Fitur (Tidak Editable di sini, hanya tampil) */}
      <ul className="space-y-3 mb-8 text-left text-gray-700 mt-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center space-x-3">
            <span className="text-pikelmore-gold">✓</span>
            <span className="font-body text-sm">{feature}</span>
          </li>
        ))}
      </ul>
      
      {/* Tombol Pesan Sekarang */}
      <a 
        href="/content#booking" 
        className="inline-block w-full py-3 text-center rounded-lg font-body font-semibold transition-colors bg-gray-100 text-pikelmore-dark-grey hover:bg-gray-200"
      >
        Pesan Sekarang
      </a>
    </div>
  );
};

export default PackageCard;