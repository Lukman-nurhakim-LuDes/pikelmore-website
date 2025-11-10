// app/layout.tsx

import './globals.css';
import React from 'react';

// --- FINAL METADATA UNTUK BROWSER TAB ---
export const metadata = {
  // Mengganti "Create Next App" dengan nama brand Anda
  title: 'PIXELMORÉ | Photography ', 
  description: 'Jasa fotografi profesional dan sinematik dengan estetika premium Mocca/Hitam.',
};
// ----------------------------------------


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // Menggunakan lang="id" untuk konsistensi bahasa dan menghindari hydration mismatch
    <html lang="id">
      <head>
        {/* Anda bisa menambahkan favicon dan touch icon di sini */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        {/* Opsional: Menghubungkan ikon yang sudah diunggah untuk tampilan layar beranda */}
        <link rel="apple-touch-icon" href="/icon-192.png" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}