// components/FloatingWhatsApp.jsx
import React from 'react';

const FloatingWhatsApp = () => {
  return (
    <a 
      href="https://wa.me/628231664602?text=Halo%2C%20saya%20tertarik%20dengan%20layanan%20Pikelmore."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-green-500 text-white rounded-full p-4 shadow-xl z-50 hover:bg-green-600 transition-colors duration-300"
      aria-label="Konsultasi via WhatsApp"
    >
      {/* Ikon WhatsApp Sederhana */}
      <span className="text-2xl">💬</span> 
    </a>
  );
};
export default FloatingWhatsApp;