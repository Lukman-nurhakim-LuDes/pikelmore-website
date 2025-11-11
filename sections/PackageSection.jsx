// sections/PackageSection.jsx

'use client'; 
// Harus menjadi Client Component

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import PackageCard from '@/components/PackageCard';
import { useAdmin } from '@/context/AdminContext';
import { createNewPackage } from '@/lib/api'; // <-- IMPORT FUNGSI BARU

const PackageSection = ({ id }) => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);    
  
  const { isEditMode } = useAdmin(); 

  // --- FUNGSI CREATE: Tambah Paket Baru ---
  const handleAddPackage = async () => {
    if (!isEditMode) return;
    
    const { success, data: newPackage } = await createNewPackage();

    if (success) {
      // Tambahkan paket baru ke state lokal agar langsung terlihat
      setPackages(prevPackages => [...prevPackages, newPackage]);
      alert("Paket baru telah ditambahkan! Silakan edit detailnya.");
    } else {
      alert("Gagal menambahkan paket baru. Pastikan Anda sudah login Admin Supabase.");
    }
  };
  // ------------------------------------------

  useEffect(() => {
    const fetchPackages = async () => {
      let { data, error } = await supabase
        .from('packages')
        .select('*')
        .order('price', { ascending: true }); 

      if (error) {
        console.error("Error fetching packages:", error);
        setError("Gagal memuat data paket.");
      } else {
        setPackages(data);
      }
      setLoading(false);
    };

    fetchPackages();
  }, []);

  return (
    <section id={id} className="py-24 md:py-32 bg-pikelmore-light-grey text-pikelmore-dark-grey">
      <div className="container mx-auto px-6 md:px-8 text-center">
        <h2 className="font-display text-4xl md:text-5xl font-bold mb-8 text-pikelmore-mocca">
          Pilihan Paket Terbaik
        </h2>

        {/* --- TOMBOL TAMBAH PAKET (HANYA DI MODE EDIT) --- */}
        {isEditMode && (
          <button 
            onClick={handleAddPackage} 
            className="mb-10 px-6 py-2 bg-pikelmore-mocca text-white font-semibold rounded-md hover:bg-pikelmore-taupe transition-colors"
          >
            + Tambah Paket Baru
          </button>
        )}
        {/* ------------------------------------------------ */}
        
        {/* Status Loading/Error */}
        {loading && <p className="font-body text-lg text-pikelmore-dark-grey">Memuat paket...</p>}
        {error && <p className="font-body text-lg text-red-500">{error}</p>}
        
        {/* Tampilan Grid untuk Paket */}
        {!loading && !error && packages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {packages.map((pkg) => (
              <PackageCard 
                  key={pkg.id} 
                  packageData={pkg}
                  isEditMode={isEditMode}
              />
            ))}
          </div>
        ) : (
             !loading && !error && <p className="font-body text-lg">Belum ada paket yang tersedia saat ini.</p>
        )}
      </div>
    </section>
  );
};
export default PackageSection;