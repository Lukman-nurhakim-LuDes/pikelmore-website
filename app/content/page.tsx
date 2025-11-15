// app/content/page.tsx (Versi FINAL, Fix Syntax dan Import Swiper)

'use client'; 
// WAJIB: Karena menggunakan Context dan hooks di komponen anak

// --- IMPORT CSS SWIPER DI SINI (SEBAGAI MODUL JS) ---
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation'; 
// ----------------------------------------------------

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
import React, { Suspense } from 'react';


const Content = () => {
  return (
    <AdminProvider>
      <Header /> 
      
      <AdminToggle /> 
      
      <main className="pt-[55px]">
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
export default function ContentPage() {
    return (
        <Suspense fallback={
            <div className="text-center py-32 text-pikelmore-mocca font-display text-4xl bg-pikelmore-dark">
                Memuat Konten PIXELMORÉ...
            </div>
        }>
            <Content />
        </Suspense>
    );
}