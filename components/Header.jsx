// components/Header.jsx (Revisi Ketinggian Header SEJAJAR LOGO)

import React from 'react';
import Link from 'next/link'; 
import Image from 'next/image';

const Header = () => {
  return (
    // Hapus PY-2 dan ganti dengan PY-0. Gunakan items-center untuk sentralisasi vertikal.
    <header className="fixed top-0 left-0 w-full bg-pikelmore-dark z-50 py-0 border-b border-pikelmore-taupe"> {/* <-- UBAH py-2 MENJADI py-0 */}
      <div className="container mx-auto flex justify-between items-center px-6 md:px-8 h-[55px]"> {/* <-- Tambahkan h-[55px] untuk memberi ruang pada logo */}
        
        {/* Logo Gambar */}
        <div className="logo">
          <Link href="/">
            <Image 
                src="/Pixelmoree.png" 
                alt="PIXELMORÉ - More Than Just Moments"
                width={150} 
                height={35} // Logo setinggi 35px
                priority 
            />
          </Link>
        </div>
        
        {/* Navigasi (Teks Putih/Terang) */}
        <nav className="hidden md:block">
          <ul className="flex space-x-8">
            {/* Tautan */}
            <li><Link href="/" className="text-white hover:text-pikelmore-mocca font-body font-medium">Home</Link></li>
            <li><Link href="/content#about" className="text-white hover:text-pikelmore-mocca font-body font-medium">About</Link></li>
            <li><Link href="/content#portfolio" className="text-white hover:text-pikelmore-mocca font-body font-medium">Portfolio</Link></li>
            <li><Link href="/content#package" className="text-white hover:text-pikelmore-mocca font-body font-medium">Package</Link></li>
            <li><Link href="/content#booking" className="text-white hover:text-pikelmore-mocca font-body font-medium">Booking</Link></li>
            <li><Link href="/content#info" className="text-white hover:text-pikelmore-mocca font-body font-medium">Info</Link></li>
          </ul>
        </nav>
        
        {/* Tombol Hamburger Mobile */}
        <button className="md:hidden text-white text-3xl">☰</button>
      </div>
    </header>
  );
};
export default Header;