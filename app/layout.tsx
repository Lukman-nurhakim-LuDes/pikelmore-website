// app/layout.tsx

import './globals.css';
import React from 'react';

// Ambil kode verifikasi unik Anda dari properti "google"
const GOOGLE_VERIFICATION_CODE = "9b5idOC6Ce2_GFZmJStbYbVjZ1qelnaRPCkxhu9qpxM";

// HANYA METADATA DASAR YANG TETAP DI SINI (tanpa properti verification)
export const metadata = {
  title: 'PIXELMORÉ | Photography & Cinematic Studio', 
  description: 'Jasa fotografi profesional dan sinematik dengan estetika premium Mocca/Hitam.',
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <head> 
        {/* Ikon dan Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/icon-192.png" />

        {/* --- META TAG VERIFIKASI GOOGLE EKSPLISIT (SOLUSI FINAL) --- */}
        {/* Tag ini akan muncul di <head> dan dijamin ditemukan oleh crawler Google */}
        <meta name="google-site-verification" content={GOOGLE_VERIFICATION_CODE} />
        {/* ------------------------------------------------------------------ */}
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}