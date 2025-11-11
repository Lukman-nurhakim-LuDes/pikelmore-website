// components/Header.jsx
'use client'; 
// Harus menjadi Client Component

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

        // Cleanup listener jika ada (walaupun di sini tidak ada listener, ini praktik yang baik)
        return () => {
            // Unsubscribe jika ada listener aktif
        };
    }, []);
    // ------------------------------------------------------------------

    const navItems = [
        { name: 'Home', href: '/' },
        { name: 'Tentang Kami', href: '/#about' },
        { name: 'Portofolio', href: '/#portfolio' },
        { name: 'Paket Harga', href: '/#packages' },
        { name: 'Pemesanan', href: '/#booking' },
        // Item untuk admin di halaman konten
        { name: 'Halaman Admin', href: '/content' }, 
    ];

    return (
        <>
            <AdminToggle /> 
            <header className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-sm shadow-md">
                <div className="container mx-auto px-6 md:px-8 flex justify-between items-center py-4">
                    
                    {/* Logo/Nama Brand */}
                    <Link href="/" className="flex items-center space-x-2">
                        <Image src="/logo-pikelmore.svg" alt="PIXELMORÉ Logo" width={32} height={32} className="w-8 h-8"/>
                        <span className="font-display text-xl font-extrabold tracking-widest text-pikelmore-black">
                            PIXELMORÉ
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex space-x-6">
                        {navItems.map((item) => (
                            <Link key={item.name} href={item.href} className="font-body text-sm font-medium text-pikelmore-dark-grey hover:text-pikelmore-mocca transition-colors">
                                {item.name}
                            </Link>
                        ))}
                    </nav>

                    {/* Mobile Menu Button */}
                    <button 
                        className="md:hidden text-pikelmore-black"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                        ) : (
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
                        )}
                    </button>
                </div>
                
                {/* Mobile Menu Dropdown */}
                {isMenuOpen && (
                    <div className="md:hidden bg-white/95 shadow-lg absolute w-full top-full">
                        <nav className="flex flex-col p-4 space-y-2">
                            {navItems.map((item) => (
                                <Link 
                                    key={item.name} 
                                    href={item.href} 
                                    onClick={() => setIsMenuOpen(false)} // Tutup menu setelah klik
                                    className="font-body text-md font-medium text-pikelmore-dark-grey hover:text-pikelmore-mocca transition-colors py-2 border-b last:border-b-0"
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