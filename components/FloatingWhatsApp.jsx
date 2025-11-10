// components/FloatingWhatsApp.jsx

import React from 'react';
// Anda bisa menggunakan library ikon seperti react-icons jika sudah terinstal
// import { FaWhatsapp } from 'react-icons/fa'; 

const FloatingWhatsApp = () => {
    // NOMOR WHATSAPP PIKELMORE (Pastikan formatnya 62xxxxxxxxxx, tanpa + atau 0 di depan)
    const whatsappNumber = '6287779152773'; 

    // Pesan yang sudah di-encode secara default
    const encodedMessage = encodeURIComponent('Halo, saya tertarik dengan layanan Pikelmore. Mohon info detail dan ketersediaan paket.');
    
    // URL Final
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    return (
        // Ikon WhatsApp yang mengambang di sudut bawah kanan layar
        <a 
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            // Styling Tombol Mengambang (Menggunakan warna Mocca sebagai aksen)
            className="fixed bottom-8 right-8 
                       bg-pikelmore-mocca text-white 
                       rounded-full p-4 shadow-xl z-50 
                       hover:bg-pikelmore-taupe transition-colors duration-300"
            aria-label="Konsultasi via WhatsApp"
        >
            {/* Menggunakan Emoji sebagai Ikon (Ganti dengan FaWhatsapp jika Anda instal react-icons) */}
            <span className="text-3xl">💬</span> 
        </a>
    );
};

export default FloatingWhatsApp;