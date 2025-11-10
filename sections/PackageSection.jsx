// sections/PackageSection.jsx

'use client'; 
// Harus menjadi Client Component karena menggunakan hooks

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase'; // Import client Supabase
import PackageCard from '@/components/PackageCard';
import { useAdmin } from '@/context/AdminContext'; // Import hook useAdmin

const PackageSection = ({ id }) => {
  // --- DEKLARASI STATE (FIX ReferenceError) ---
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);    
  
  const { isEditMode } = useAdmin(); // Ambil state mode edit

  useEffect(() => {
    const fetchPackages = async () => {
      // Mengambil data dari tabel 'packages'
      let { data, error } = await supabase
        .from('packages')
        .select('*')
        .order('price', { ascending: true }); 

      if (error) {
        console.error("Error fetching packages:", error);
        setError("Gagal memuat data paket. Silakan coba lagi.");
      } else {
        setPackages(data);
      }
      setLoading(false);
    };

    fetchPackages();
  }, []); // [] agar hanya berjalan saat mount

  return (
    <section id={id} className="py-24 md:py-32 bg-pikelmore-light-grey text-pikelmore-dark-grey">
      <div className="container mx-auto px-6 md:px-8 text-center">
        <h2 className="font-display text-4xl md:text-5xl font-bold mb-16 text-pikelmore-dark-grey">
          Pilihan Paket Terbaik
        </h2>

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
                  isEditMode={isEditMode} // Meneruskan mode edit ke card
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