// components/Header.jsx (FINAL FIX: Menu Mobile Functionality)
'use client'; // WAJIB untuk menggunakan state dan hooks

import React, { useState } from 'react'; // Import useState
import Link from 'next/link'; 
import Image from 'next/image';

const Header = () => {
  // State untuk mengontrol apakah menu mobile terbuka atau tertutup
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Fungsi untuk menutup menu dan menavigasi (untuk tautan internal)
  const handleNavClick = () => {
    setIsMenuOpen(false);
  };

  return (
    // Header GELAP, Ramping
    <header className="fixed top-0 left-0 w-full bg-pikelmore-dark z-50 py-2 border-b border-pikelmore-taupe">
      <div className="container mx-auto flex justify-between items-center px-6 md:px-8 h-[55px]">
       
        <div className="logo">
          <Link href="/">
            <Image 
              src="/Pixelmoree.png" // <-- PATH FINAL DAN BENAR
              alt="PIXELMORÉ - More Than Just Moments"
              width={150} 
              height={35} 
              priority 
            />
          </Link>
        </div>
        
        {/* --- NAVIGASI DESKTOP --- */}
        <nav className="hidden md:block">
          <ul className="flex space-x-8">
            <li><Link href="/" className="text-white hover:text-pikelmore-mocca font-body font-medium">Home</Link></li>
            <li><Link href="/content#about" className="text-white hover:text-pikelmore-mocca font-body font-medium">About</Link></li>
            <li><Link href="/content#portfolio" className="text-white hover:text-pikelmore-mocca font-body font-medium">Portfolio</Link></li>
            <li><Link href="/content#package" className="text-white hover:text-pikelmore-mocca font-body font-medium">Package</Link></li>
            <li><Link href="/content#booking" className="text-white hover:text-pikelmore-mocca font-body font-medium">Booking</Link></li>
            <li><Link href="/content#info" className="text-white hover:text-pikelmore-mocca font-body font-medium">Info</Link></li>
          </ul>
        </nav>
        
        {/* --- TOMBOL HAMBURGER (Hanya di Mobile) --- */}
        <button 
          className="md:hidden text-white text-3xl z-50"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? '✕' : '☰'} {/* Ikon X saat terbuka */}
        </button>
      </div>

      {/* --- MENU MOBILE YANG MUNCUL (Hanya di Mobile) --- */}
      {/* Tambahkan transisi untuk efek slide yang elegan */}
      <nav 
        className={`fixed inset-0 top-[55px] bg-pikelmore-dark/95 backdrop-blur-sm transform transition-transform duration-300 ease-in-out z-40 md:hidden ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <ul className="flex flex-col items-center space-y-6 pt-10 text-xl font-display">
          {/* Gunakan handleNavClick agar menu tertutup setelah navigasi */}
          <li><Link href="/" onClick={handleNavClick} className="text-white hover:text-pikelmore-mocca">Home</Link></li>
          <li><Link href="/content#about" onClick={handleNavClick} className="text-white hover:text-pikelmore-mocca">About</Link></li>
          <li><Link href="/content#portfolio" onClick={handleNavClick} className="text-white hover:text-pikelmore-mocca">Portfolio</Link></li>
          <li><Link href="/content#package" onClick={handleNavClick} className="text-white hover:text-pikelmore-mocca">Package</Link></li>
          <li><Link href="/content#booking" onClick={handleNavClick} className="text-white hover:text-pikelmore-mocca">Booking</Link></li>
          <li><Link href="/content#info" onClick={handleNavClick} className="text-white hover:text-pikelmore-mocca">Info</Link></li>
        </ul>
      </nav>
    </header>
  );
};
export default Header;