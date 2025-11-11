// components/Header.jsx (FINAL FIX: Dark Header & Logo Image)
'use client'; 

import React, { useState, useEffect } from 'react';
import Link from 'next/link'; 
import Image from 'next/image';
import { supabase } from '@/lib/supabase'; // WAJIB: Import Supabase client
import AdminToggle from './AdminToggle';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // --- HOOK PERBAIKAN: Memastikan Session Aktif Saat Component Mount ---
    useEffect(() => {
        // Ini memastikan Supabase Client mengetahui status otentikasi saat ini
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session) {
                console.log("Supabase session detected on header load.");
            }
        });

        // Cleanup listener jika ada (praktik yang baik)
        return () => {};
    }, []);
    // ------------------------------------------------------------------

    const navItems = [
        { name: 'Home', href: '/' },
        { name: 'Tentang Kami', href: '/content#about' },
        { name: 'Portofolio', href: '/content#portfolio' },
        { name: 'Paket Harga', href: '/content#package' },
        { name: 'Pemesanan', href: '/content#booking' },
        { name: 'Info', href: '/content#info' }, 
        
    ];

    // Fungsi untuk menutup menu setelah klik
    const handleNavClick = () => {
        setIsMenuOpen(false);
    };

    return (
        <>
            <AdminToggle /> 
            {/* HEADER GELAP FINAL: Menggunakan bg-pikelmore-dark tanpa blur/opacity */}
            <header className="fixed top-0 left-0 w-full z-50 bg-pikelmore-dark py-0 border-b border-pikelmore-taupe"> 
                <div className="container mx-auto px-6 md:px-8 flex justify-between items-center py-0 h-[55px]">
                    
                    {/* LOGO GAMBAR FIX: Menggunakan nama file dan ukuran yang benar */}
                    <div className="logo flex items-center">
                        <Link href="/">
                            <Image 
                                src="/Pixelmoree.png" // <-- PATH DENGAN NAMA FILE DARI EXPLORER
                                alt="PIXELMORÉ - More Than Just Moments"
                                width={150} 
                                height={35} 
                                priority 
                            />
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex space-x-6">
                        {navItems.map((item) => (
                            <Link key={item.name} href={item.href} className="font-body text-sm font-medium text-white hover:text-pikelmore-mocca transition-colors">
                                {item.name}
                            </Link>
                        ))}
                    </nav>

                    {/* Mobile Menu Button */}
                    <button 
                        className="md:hidden text-white text-3xl"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? '✕' : '☰'}
                    </button>
                </div>
                
                {/* Mobile Menu Dropdown */}
                {isMenuOpen && (
                    <div className="md:hidden bg-pikelmore-dark/95 shadow-lg absolute w-full top-full z-40">
                        <nav className="flex flex-col p-4 space-y-2">
                            {navItems.map((item) => (
                                <Link 
                                    key={item.name} 
                                    href={item.href} 
                                    onClick={handleNavClick}
                                    className="font-body text-md font-medium text-white hover:text-pikelmore-mocca transition-colors py-2 border-b border-gray-700 last:border-b-0"
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </nav>
                    </div>
                )}
            </header>
        </>
    );
};
export default Header;