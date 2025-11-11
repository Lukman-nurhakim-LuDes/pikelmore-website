// components/FloatingWhatsApp.jsx

import React from 'react';
import { FaWhatsapp } from 'react-icons/fa'; // <-- MENGGUNAKAN IKON ASLI

const FloatingWhatsApp = () => {
    // NOMOR WHATSAPP PIXELMORE BARU
    const whatsappNumber = '6287779152773'; 

    // Pesan yang sudah di-encode secara default
    const encodedMessage = encodeURIComponent('Halo, saya tertarik dengan layanan Pikelmore. Mohon info detail dan ketersediaan paket.');
    
    // URL Final menggunakan format API yang paling stabil
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodedMessage}`;

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
            {/* MENGGUNAKAN IKON FaWhatsapp */}
            <FaWhatsapp size={28} /> {/* <-- IKON ASLI WHATSAPP */}
        </a>
    );
};

export default FloatingWhatsApp;