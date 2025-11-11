// components/AdminToggle.jsx (FINAL CMS SLIDING PANEL)
'use client';

import React, { useState } from 'react';
import { useAdmin } from '@/context/AdminContext';
import { supabase } from '@/lib/supabase'; // Untuk Auth Login

const AdminToggle = () => {
    const { isEditMode, setIsEditMode } = useAdmin();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [authError, setAuthError] = useState(null);
    
    // State baru untuk mengontrol tampilan panel sliding
    const [isPanelOpen, setIsPanelOpen] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setAuthError(null);

        const { error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if (error) {
            setAuthError(error.message);
            setIsEditMode(false);
        } else {
            setIsEditMode(true);
            setIsPanelOpen(false); // Tutup panel setelah login
            alert('Mode Edit Aktif! Sesi Supabase berhasil dibuat.');
        }
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        setIsEditMode(false);
        alert('Mode Edit Keluar.');
    };
    
    // Tampilan tombol Logout saat Mode Edit ON (Berada di atas, tidak perlu sliding)
    if (isEditMode) {
        return (
             <div className="fixed top-2 right-4 p-2 bg-red-600 text-white rounded shadow-xl z-[1000]">
                <span className="text-sm font-semibold mr-2">Mode Edit ON</span>
                <button onClick={handleLogout} className="bg-pikelmore-dark px-3 py-1 text-xs rounded hover:opacity-90">Keluar</button>
             </div>
        );
    }


    return (
        <>
            {/* 1. TOMBOL TRIGGER (Ikon Admin Mengambang) */}
            <button 
                onClick={() => setIsPanelOpen(true)} // Buka panel saat diklik
                className="fixed top-2 right-2 bg-pikelmore-mocca text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg hover:bg-pikelmore-taupe z-[1000] transition-transform duration-300"
                aria-label="Toggle Admin Login"
            >
                🔑
            </button>
            
            {/* 2. PANEL SLIDING TERSEMBUNYI */}
            <div 
                className={`fixed top-0 right-0 w-full md:w-96 h-full bg-pikelmore-dark transform transition-transform duration-500 ease-in-out z-[1010] p-6 shadow-2xl ${isPanelOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                <button 
                    onClick={() => setIsPanelOpen(false)} // Tombol Tutup
                    className="absolute top-4 right-4 text-white text-2xl hover:text-pikelmore-mocca"
                >
                    ✕
                </button>
                
                <h2 className="text-white font-display text-3xl mt-16 mb-8 border-b border-pikelmore-taupe pb-3">
                    Admin Login CMS
                </h2>

                <form onSubmit={handleLogin} className="space-y-4">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email Admin"
                        className="w-full p-3 text-pikelmore-dark-grey rounded"
                        required
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="w-full p-3 text-pikelmore-dark-grey rounded"
                        required
                    />
                    <button type="submit" className="w-full bg-pikelmore-mocca text-white py-3 rounded hover:opacity-90">
                        Login
                    </button>
                    {authError && <p className="text-red-400 text-sm mt-2">{authError}</p>}
                </form>
            </div>
            
            {/* Backdrop untuk menutup panel saat klik di luar */}
            {isPanelOpen && (
                <div onClick={() => setIsPanelOpen(false)} className="fixed inset-0 bg-black/50 z-[1009]"></div>
            )}
        </>
    );
};
export default AdminToggle;