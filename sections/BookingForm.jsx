// sections/BookingForm.jsx
'use client'; 

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { formatRupiah } from '@/lib/utils'; // Menggunakan formatRupiah dari utils
// import { useRouter } from 'next/navigation'; // Dinonaktifkan untuk stabilisasi form

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
  
  // FIX: Deklarasi state 'message'
  const [message, setMessage] = useState(null); 

  // const router = useRouter(); // Dinonaktifkan

  // --- FETCH DAFTAR PAKET UNTUK DROPDOWN ---
  useEffect(() => {
    const fetchPackages = async () => {
      let { data, error } = await supabase.from('packages').select('name, price'); // Ambil nama dan harga
      if (error) {
        console.error("Error fetching packages for form:", error);
        setError("Gagal memuat pilihan paket.");
      } else {
        setPackages(data); // Simpan objek paket
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
    setMessage(null); // Bersihkan pesan lama

    if (!formData.package_name || !formData.name || !formData.whatsapp || !formData.preferred_date) {
        setError("Semua kolom wajib diisi.");
        setIsSubmitting(false);
        return;
    }
    
    // NOMOR WHATSAPP PIXELMORÉ (GANTI dengan nomor yang sudah Anda uji)
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
      setError("Gagal menyimpan pemesanan ke database. Silakan coba lagi.");
      setIsSubmitting(false);
      return;
    }

    // --- 2. Generate Link WhatsApp API Otomatis ---
    const whatsappMessage = `
Halo PIXELMORÉ! Saya ingin memesan paket *${formData.package_name}*.

Detail Pemesan:
Nama: ${formData.name}
Nomor WA: ${formData.whatsapp}
Tanggal yang diinginkan: ${formData.preferred_date}

Mohon konfirmasi ketersediaan dan detail selanjutnya.
    `.trim();

    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodedMessage}`;

    // --- 3. Arahkan ke WhatsApp ---
    window.open(whatsappUrl, '_blank');
    
    // Set pesan sukses dan reset form
    setMessage(`Pemesanan ${formData.package_name} berhasil dikirim! Silakan lanjutkan di WhatsApp.`);
    setFormData({ name: '', whatsapp: '', package_name: '', preferred_date: '' });
    setIsSubmitting(false);
  };

  return (
    <section id={id} className="py-24 md:py-32 bg-white text-pikelmore-dark-grey">
      <div className="container mx-auto px-6 md:px-8 max-w-3xl">
        <h2 className="font-display text-4xl md:text-5xl font-bold mb-8 text-center text-pikelmore-mocca">
          Pesan Sekarang
        </h2>
        <div className="border p-8 rounded-lg shadow-xl bg-pikelmore-ivory">
          
          {loading && <p className="text-center font-body text-pikelmore-dark-grey">Memuat pilihan paket...</p>}
          {error && <p className="text-center font-body text-red-600 border border-red-600 p-2 rounded mb-4">{error}</p>}
          {message && <p className="text-center font-body text-green-700 border border-green-700 p-2 rounded mb-4">{message}</p>}


          {!loading && (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Pilihan Paket (Teks Gelap untuk Kontras) */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-pikelmore-dark-grey">Pilih Paket:</label>
                <select 
                    name="package_name"
                    value={formData.package_name}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg font-body focus:border-pikelmore-mocca focus:ring-pikelmore-mocca text-pikelmore-dark-grey"
                    required
                >
                    <option value="">-- Pilih Paket Fotografi --</option>
                    {packages.map(pkg => (
                        <option key={pkg.name} value={pkg.name}>
                            {pkg.name} - {formatRupiah(pkg.price)}
                        </option>
                    ))}
                </select>
              </div>

              {/* Nama Klien (Teks Gelap untuk Kontras) */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-pikelmore-dark-grey" htmlFor="name">Nama Lengkap</label>
                <input 
                    type="text" 
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Masukkan nama lengkap Anda"
                    className="w-full p-3 border border-gray-300 rounded-lg font-body focus:border-pikelmore-mocca focus:ring-pikelmore-mocca text-pikelmore-dark-grey placeholder-gray-500"
                    required
                />
              </div>

              {/* Nomor WhatsApp (Teks Gelap untuk Kontras) */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-pikelmore-dark-grey" htmlFor="whatsapp">Nomor WhatsApp (Contoh: 62812...)</label>
                <input 
                    type="tel" 
                    name="whatsapp"
                    id="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleChange}
                    placeholder="Contoh: 6281234567890"
                    className="w-full p-3 border border-gray-300 rounded-lg font-body focus:border-pikelmore-mocca focus:ring-pikelmore-mocca text-pikelmore-dark-grey placeholder-gray-500"
                    required
                    pattern="[0-9]+" 
                />
              </div>

              {/* Tanggal yang Diinginkan (Teks Gelap untuk Kontras) */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-pikelmore-dark-grey" htmlFor="preferred_date">Tanggal Pemotretan yang Diinginkan</label>
                <input 
                    type="date" 
                    name="preferred_date"
                    id="preferred_date"
                    value={formData.preferred_date}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg font-body focus:border-pikelmore-mocca focus:ring-pikelmore-mocca text-pikelmore-dark-grey"
                    required
                />
              </div>

              {/* Tombol Submit */}
              <button 
                type="submit" 
                className="w-full bg-pikelmore-mocca text-white font-body font-bold py-3 rounded-lg shadow-md hover:bg-pikelmore-taupe transition-colors disabled:bg-gray-400"
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