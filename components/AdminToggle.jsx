// components/AdminToggle.jsx (FINAL FIX: Mode Tersembunyi)
'use client';

import React, { useState, useEffect } from 'react';
import { useAdmin } from '@/context/AdminContext';
import { useSearchParams } from 'next/navigation'; // <-- Import Next.js hook

const AdminToggle = () => {
    const { isEditMode, setIsEditMode } = useAdmin();
    const [password, setPassword] = useState('');
    const ADMIN_PASSWORD = 'Lukmannr24'; 
    
    // Gunakan useSearchParams untuk memeriksa URL
    const searchParams = useSearchParams(); 
    const showAdminToggle = searchParams.get('admin') === 'true'; // <-- Cek parameter ?admin=true

    const handleLogin = () => {
        if (password === ADMIN_PASSWORD) {
            setIsEditMode(true);
            alert('Mode Edit Aktif! Jangan lupa keluar saat selesai.');
        } else {
            alert('Password salah.');
        }
        setPassword('');
    };

    // Jika sedang dalam Mode Edit, selalu tampilkan tombol Logout
    if (isEditMode) {
        return (
             <div className="fixed top-20 right-4 p-2 bg-pikelmore-mocca text-white rounded shadow-xl z-[1000]">
                <span className="text-sm font-semibold mr-2">Mode Edit ON</span>
                <button 
                    onClick={() => setIsEditMode(false)}
                    className="bg-red-600 px-3 py-1 text-xs rounded hover:bg-red-700"
                >
                    Keluar
                </button>
            </div>
        );
    }
    
    // Jika tidak ada parameter ?admin=true di URL, JANGAN TAMPILKAN APA PUN
    if (!showAdminToggle) {
        return null;
    }

    // Tampilan Login (Hanya muncul jika URL mengandung ?admin=true)
    return (
        <div className="fixed top-20 right-4 p-3 bg-pikelmore-dark text-white rounded shadow-xl z-[1000]">
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password Admin"
                className="p-1 text-sm text-pikelmore-dark-grey rounded mr-2"
            />
            <button onClick={handleLogin} className="bg-pikelmore-mocca px-3 py-1 text-xs rounded hover:opacity-90">
                Login
            </button>
        </div>
    );
};
export default AdminToggle;