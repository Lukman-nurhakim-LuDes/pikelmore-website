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
    const whatsappNumber = '6287779152773'; 

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
    <section id={id} className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-pikelmore-dark text-center text-4xl font-display mb-10">
          Pesan Sekarang
        </h2>
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg border border-gray-200">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Pilih Paket */}
            <div>
              <label htmlFor="package" className="block text-pikelmore-dark text-sm font-semibold mb-2">
                Pilih Paket
              </label>
              <select
                id="package"
                name="package"
                value={formData.package}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pikelmore-mocca 
                           text-pikelmore-dark" // <-- FIX INI: Tambahkan text-pikelmore-dark
              >
                <option value="">-- Pilih Paket Fotografi --</option>
                {packages.map((pkg) => (
                  <option key={pkg.id} value={pkg.name}>
                    {pkg.name} - Rp{pkg.price.toLocaleString('id-ID')}
                  </option>
                ))}
              </select>
            </div>

            {/* Nama Lengkap */}
            <div>
              <label htmlFor="fullName" className="block text-pikelmore-dark text-sm font-semibold mb-2">
                Nama Lengkap
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Masukkan nama lengkap Anda"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pikelmore-mocca 
                           text-pikelmore-dark placeholder-gray-500" // <-- FIX INI: Tambahkan text-pikelmore-dark dan placeholder-gray-500
              />
            </div>

            {/* Nomor WhatsApp */}
            <div>
              <label htmlFor="whatsapp" className="block text-pikelmore-dark text-sm font-semibold mb-2">
                Nomor WhatsApp (Contoh: 62812...)
              </label>
              <input
                type="tel"
                id="whatsapp"
                name="whatsapp"
                value={formData.whatsapp}
                onChange={handleChange}
                placeholder="Contoh: 6281234567890"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pikelmore-mocca 
                           text-pikelmore-dark placeholder-gray-500" // <-- FIX INI
              />
            </div>

            {/* Tanggal Pemotretan */}
            <div>
              <label htmlFor="date" className="block text-pikelmore-dark text-sm font-semibold mb-2">
                Tanggal Pemotretan yang Diinginkan
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pikelmore-mocca 
                           text-pikelmore-dark" // <-- FIX INI: Tanggal tidak pakai placeholder-gray-500
              />
            </div>
            
            {/* ... (tombol submit dan pesan loading tetap sama) ... */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-pikelmore-mocca text-white py-2 px-4 rounded-md hover:bg-opacity-90 transition-colors duration-300 font-semibold"
            >
              {loading ? 'Mengirim...' : 'Kirim Pesan'}
            </button>
            {message && <p className="mt-4 text-center text-sm text-green-600">{message}</p>}
          </form>
        </div>
      </div>
    </section>
  );
};
export default BookingForm;