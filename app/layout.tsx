// app/layout.tsx

import './globals.css';
import React from 'react';

// --- METADATA NEXT.JS (Mengatur Judul Tab dan SEO Dasar) ---
export const metadata = {
  // FINAL Judul website yang muncul di tab browser
  title: 'PIXELMORÉ | Photography & Cinematic Studio', 
  description: 'Jasa fotografi profesional dan sinematik dengan estetika premium Mocca/Hitam.',
  
  // --- VERIFIKASI GOOGLE SEARCH CONSOLE BARU ---
  // Kode verifikasi unik Anda ditanamkan di sini:
  verification: {
    google: '9b5idOC6Ce2_GFZmJStbYbVjZ1qelnaRPCkxhu9qpxM', 
  },
  // --------------------------------------------------------
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // Menggunakan lang="id" untuk konsistensi bahasa
    <html lang="id">
      <head> 
        {/* Ikon dan Favicon (Pastikan Anda sudah menempatkan file-file ini di folder public) */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}