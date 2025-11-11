// sections/PackageSection.jsx

'use client'; 
// Harus menjadi Client Component

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase'; 
import PackageCard from '@/components/PackageCard';
import { useAdmin } from '@/context/AdminContext';
import { createNewPackage, fetchAllPackages } from '@/lib/api'; 

const PackageSection = ({ id }) => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);    
  
  const { isEditMode } = useAdmin(); 
  
  const [session, setSession] = useState(null); 

  // --- FUNGSI UTAMA FETCH ---
  const fetchPackages = async () => {
    setLoading(true);
    const data = await fetchAllPackages(); 
    if (data && data.length > 0) {
      setPackages(data);
      setError(null);
    } else if (data === null) {
      setError("Gagal memuat data paket. Cek koneksi API.");
      setPackages([]);
    }
    setLoading(false);
  };
  
  // --- FUNGSI CREATE: Tambah Paket Baru ---
  const handleAddPackage = async () => {
    if (!isEditMode || !session) { 
        alert("Gagal: Anda harus login ke Supabase Auth untuk menambah paket.");
        return;
    }
    
    const { success, data: newPackage } = await createNewPackage();

    if (success) {
      setPackages(prevPackages => [...prevPackages, newPackage]);
      alert("Paket baru telah ditambahkan! Silakan edit detailnya.");
    } else {
      alert("Gagal menambahkan paket baru. Cek RLS INSERT di tabel 'packages'.");
    }
  };
  
  // --- EFFECT: Memuat Sesi Awal dan Session Listener (FIX ERROR TYPE) ---
  useEffect(() => {
    // 1. Ambil Sesi Saat Ini
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    // 2. Dengarkan Perubahan Status Otentikasi (PERBAIKAN KRITIS UNTUK UNSUBSCRIBE)
    const { data: { subscription: authListener } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        // Refresh data paket setelah login/logout
        if (session || _event === 'SIGNED_OUT') {
          fetchPackages();
        }
      }
    );

    // 3. Cleanup Listener (MENGHINDARI TypeError)
    return () => {
      if (authListener && typeof authListener.unsubscribe === 'function') {
        authListener.unsubscribe();
      }
    };
  }, []); 

  // --- EFFECT: Memuat Paket saat komponen pertama kali dipasang ---
  useEffect(() => {
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
            className="mb-10 px-6 py-2 bg-pikelmore-mocca text-white font-semibold rounded-md hover:bg-pikelmore-taupe transition-colors disabled:bg-gray-400"
            disabled={loading || !session} 
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