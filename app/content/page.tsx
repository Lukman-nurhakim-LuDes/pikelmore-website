// app/content/page.tsx (Halaman 2: Halaman Scrolling Final)

'use client'; // WAJIB: Karena menggunakan Context dan hooks di komponen anak

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import VisualCollage from '@/components/VisualCollage'; 

// Import Sections
import AboutSection from '@/sections/AboutSection';
import PortfolioSection from '@/sections/PortfolioSection';
import PackageSection from '@/sections/PackageSection';
import BookingForm from '@/sections/BookingForm';

// Import Context dan Suspense
import { AdminProvider } from '@/context/AdminContext';
import React, { Suspense } from 'react';

// --- SOLUSI KRITIS: Dynamic Import untuk AdminToggle ---
// Nonaktifkan Server Side Rendering (ssr: false) untuk AdminToggle
// karena ia menggunakan useSearchParams (hook browser)
import dynamic from 'next/dynamic'; 

const AdminToggle = dynamic(() => import('@/components/AdminToggle'), {
  ssr: false, 
  loading: () => <p className="fixed top-20 right-4 z-[1000] text-sm text-white">Loading Auth...</p>,
});
// -------------------------------------------------------------------


const Content = () => {
  return (
    // AdminProvider tetap di luar, membungkus konten utama
    <AdminProvider>
      <Header /> 
      
      {/* Panggil AdminToggle yang diimpor secara dinamis */}
      <AdminToggle /> 

      <main className="pt-[55px]"> {/* Tinggi Header yang sudah disesuaikan */}
        {/* Konten Scrolling Utama */}
        <VisualCollage /> 
        <AboutSection id="about" /> 
        <PortfolioSection id="portfolio" />
        <PackageSection id="package" />
        <BookingForm id="booking" />
      </main>
      
      <Footer />
      <FloatingWhatsApp />
    </AdminProvider>
  );
}

// Komponen Pembungkus Utama (Root Export)
// Gunakan Suspense untuk membungkus Content untuk menangani useSearchParams
export default function ContentPage() {
    return (
        <Suspense fallback={
            // Tampilan saat data sedang dimuat
            <div className="text-center py-32 text-pikelmore-mocca font-display text-4xl bg-pikelmore-dark">
                Memuat Konten PIXELMORÉ...
            </div>
        }>
            <Content />
        </Suspense>
    );
}