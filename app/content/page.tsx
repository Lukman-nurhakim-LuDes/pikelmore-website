// app/content/page.tsx (Kembali ke Versi Dasar, Tanpa Suspense/Dynamic)
'use client'; // Wajib: Karena ContentClient akan memanggil Context

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import AdminToggle from '@/components/AdminToggle'; 
import VisualCollage from '@/components/VisualCollage'; 
import AboutSection from '@/sections/AboutSection';
import PortfolioSection from '@/sections/PortfolioSection';
import PackageSection from '@/sections/PackageSection';
import BookingForm from '@/sections/BookingForm';
import { AdminProvider } from '@/context/AdminContext';
import React from 'react';

// NOTE: Karena kita menghapus Suspense dan dynamic import, 
// pastikan semua hooks yang sensitif berada di dalam AdminToggle dan komponen anak.

const Content = () => {
  return (
    <AdminProvider>
      <Header /> 
      {/* Tombol Login Admin SELALU ADA SECARA DEFAULT */}
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

export default Content;