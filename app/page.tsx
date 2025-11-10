// app/page.tsx (Halaman 1: Landing Page Final)

import Header from '@/components/Header';
import HomeSection from '@/sections/HomeSection';
import Footer from '@/components/Footer';
import FloatingWhatsApp from '@/components/FloatingWhatsApp';

export default function Home() {
  return (
    <>
      <Header /> 
      
      <main>
        {/* HomeSection adalah Landing Page CTA Anda */}
        <HomeSection id="home"/> 
      </main>
      
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}