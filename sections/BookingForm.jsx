// sections/BookingForm.jsx
'use client'; 

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase'; // Import client Supabase
import { useRouter } from 'next/navigation';

const BookingForm = ({ id }) => {
  const [packages, setPackages] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    whatsapp: '',
    package_name: '',
    preferred_date: '',
  });
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const router = useRouter();
  
  // --- FETCH DAFTAR PAKET UNTUK DROPDOWN ---
  useEffect(() => {
    const fetchPackages = async () => {
      let { data, error } = await supabase.from('packages').select('name');
      if (error) {
        console.error("Error fetching packages for form:", error);
        setError("Gagal memuat pilihan paket.");
      } else {
        setPackages(data.map(pkg => pkg.name)); 
      }
      setLoading(false);
    };
    fetchPackages();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    if (!formData.package_name || !formData.name || !formData.whatsapp || !formData.preferred_date) {
        setError("Semua kolom wajib diisi.");
        setIsSubmitting(false);
        return;
    }
    
    // NOMOR WHATSAPP PIKELMORE (GANTI INI)
    const whatsappNumber = '6282316641602'; 

    // --- 1. Simpan ke Tabel bookings Supabase (INSERT) ---
    const bookingData = {
      client_name: formData.name,
      client_whatsapp: formData.whatsapp,
      package_name: formData.package_name,
      preferred_date: formData.preferred_date,
      status: 'Pending', 
    };

    const { error: insertError } = await supabase.from('bookings').insert([bookingData]);

    if (insertError) {
      console.error('Supabase Insert Error:', insertError);
      setError("Gagal menyimpan pemesanan ke database. Coba lagi.");
      setIsSubmitting(false);
      return;
    }

    // --- 2. Generate Link WhatsApp API Otomatis ---
    const whatsappMessage = `
Halo Pikelmore! Saya ingin memesan paket *${formData.package_name}*.

Detail Pemesan:
Nama: ${formData.name}
Nomor WA: ${formData.whatsapp}
Tanggal yang diinginkan: ${formData.preferred_date}

Mohon konfirmasi ketersediaan dan detail selanjutnya.
    `.trim();

    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    // --- 3. Arahkan ke WhatsApp ---
    window.open(whatsappUrl, '_blank');
    
    // Reset form dan notifikasi sukses
    alert(`Pemesanan ${formData.package_name} berhasil dikirim! Silakan lanjutkan di WhatsApp.`);
    setFormData({ name: '', whatsapp: '', package_name: '', preferred_date: '' });
    setIsSubmitting(false);
  };

  return (
    <section id={id} className="py-24 md:py-32 bg-white text-pikelmore-dark-grey">
      <div className="container mx-auto px-6 md:px-8 max-w-3xl">
        <h2 className="font-display text-4xl md:text-5xl font-bold mb-8 text-center text-pikelmore-gold">
          Pesan Sekarang
        </h2>
        <div className="border p-8 rounded-lg shadow-xl bg-gray-50">
          
          {loading && <p className="text-center font-body">Memuat pilihan paket...</p>}
          {error && <p className="text-center font-body text-red-600 border border-red-600 p-2 rounded mb-4">{error}</p>}

          {!loading && (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Pilihan Paket */}
              <div>
                <label className="block text-sm font-semibold mb-2">Pilih Paket:</label>
                <select 
                    name="package_name"
                    value={formData.package_name}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg font-body focus:border-pikelmore-gold focus:ring-pikelmore-gold transition-colors"
                    required
                >
                    <option value="">-- Pilih Paket Fotografi --</option>
                    {packages.map(pkgName => (
                        <option key={pkgName} value={pkgName}>{pkgName}</option>
                    ))}
                </select>
              </div>

              {/* Nama Klien */}
              <div>
                <label className="block text-sm font-semibold mb-2" htmlFor="name">Nama Lengkap</label>
                <input 
                    type="text" 
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg font-body focus:border-pikelmore-gold focus:ring-pikelmore-gold"
                    required
                />
              </div>

              {/* Nomor WhatsApp */}
              <div>
                <label className="block text-sm font-semibold mb-2" htmlFor="whatsapp">Nomor WhatsApp (Contoh: 62812...)</label>
                <input 
                    type="tel" 
                    name="whatsapp"
                    id="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg font-body focus:border-pikelmore-gold focus:ring-pikelmore-gold"
                    required
                    pattern="[0-9]+" 
                    title="Hanya masukkan angka."
                />
              </div>

              {/* Tanggal yang Diinginkan */}
              <div>
                <label className="block text-sm font-semibold mb-2" htmlFor="preferred_date">Tanggal Pemotretan yang Diinginkan</label>
                <input 
                    type="date" 
                    name="preferred_date"
                    id="preferred_date"
                    value={formData.preferred_date}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg font-body focus:border-pikelmore-gold focus:ring-pikelmore-gold"
                    required
                />
              </div>

              {/* Tombol Submit */}
              <button 
                type="submit" 
                className="w-full bg-pikelmore-gold text-white font-body font-bold py-3 rounded-lg shadow-md hover:opacity-90 transition-colors disabled:bg-gray-400"
                disabled={isSubmitting || loading}
              >
                {isSubmitting ? 'Memproses...' : 'Kirim Pesanan & Lanjutkan ke WhatsApp'}
              </button>
            </form>
          )}

        </div>
      </div>
    </section>
  );
};
export default BookingForm;