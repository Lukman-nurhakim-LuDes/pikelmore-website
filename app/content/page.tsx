// app/content/page.tsx (Halaman 2: Halaman Scrolling Final)

'use client'; // WAJIB: Karena menggunakan Context dan useSearchParams (via AdminToggle)

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import AdminToggle from '@/components/AdminToggle'; 
import VisualCollage from '@/components/VisualCollage'; 

// Import Sections
import AboutSection from '@/sections/AboutSection';
import PortfolioSection from '@/sections/PortfolioSection';
import PackageSection from '@/sections/PackageSection';
import BookingForm from '@/sections/BookingForm';

// Import Context dan Suspense
import { AdminProvider } from '@/context/AdminContext';
import React, { Suspense } from 'react'; // <-- IMPORT SUSPENSE BARU

const Content = () => {
  return (
    // AdminProvider membungkus seluruh konten
    <AdminProvider>
      <Header /> 
      <AdminToggle /> {/* Tombol Login Admin Mengambang */}
      
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
// Gunakan Suspense untuk membungkus komponen yang menggunakan useSearchParams (seperti AdminToggle)
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