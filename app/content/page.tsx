// app/content/page.tsx

'use client'; // Wajib karena menggunakan React Hooks dan Context

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';
import AdminToggle from '@/components/AdminToggle'; 
import VisualCollage from '@/components/VisualCollage'; // Komponen Kolase Visual BARU

// Import Sections
import AboutSection from '@/sections/AboutSection';
import PortfolioSection from '@/sections/PortfolioSection';
import PackageSection from '@/sections/PackageSection';
import BookingForm from '@/sections/BookingForm';

// Import Context
import { AdminProvider } from '@/context/AdminContext';

export default function ContentPage() {
  return (
    // AdminProvider membungkus seluruh konten agar fitur CMS dapat diakses di mana saja
    <AdminProvider>
      <Header /> 
      <AdminToggle /> {/* Tombol Login Admin Mengambang */}
      
      <main className="pt-[70px]"> {/* Memberi ruang dari sticky header */}
        
        {/* --- KOLASE VISUAL ELEGAN (DI ATAS ABOUT) --- */}
        <VisualCollage /> 
        
        {/* --- KONTEN SCROLLING UTAMA --- */}
        <AboutSection id="about" /> 
        <PortfolioSection id="portfolio" />
        <PackageSection id="package" />
        <BookingForm id="booking" />
        {/* Anda bisa tambahkan Section Info (id="info") di sini jika perlu */}
      </main>
      
      <Footer />
      <FloatingWhatsApp />
    </AdminProvider>
  );
}