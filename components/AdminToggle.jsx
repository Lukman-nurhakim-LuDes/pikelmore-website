// components/AdminToggle.jsx (FINAL FIX: Login Supabase)
'use client';

import React, { useState } from 'react';
import { useAdmin } from '@/context/AdminContext';
import { supabase } from '@/lib/supabase'; // WAJIB: Import Supabase client

const AdminToggle = () => {
    const { isEditMode, setIsEditMode } = useAdmin();
    const [email, setEmail] = useState(''); // Tambahkan state email
    const [password, setPassword] = useState('');
    const [authError, setAuthError] = useState(null); // Tambahkan state error

    const handleLogin = async (e) => {
        e.preventDefault();
        setAuthError(null);

        // --- Perubahan Kritis: Gunakan supabase.auth.signInWithPassword ---
        const { error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if (error) {
            setAuthError(error.message);
            setIsEditMode(false);
        } else {
            // Jika login sukses, buat sesi authenticated dan aktifkan mode edit
            setIsEditMode(true);
            alert('Mode Edit Aktif! Sesi Supabase berhasil dibuat.');
        }
    };

    // Fungsi Logout
    const handleLogout = async () => {
        await supabase.auth.signOut();
        setIsEditMode(false);
        alert('Mode Edit Keluar.');
    };

    if (isEditMode) {
        // ... (Tampilan Logout/Keluar tetap sama, ganti onClick menjadi handleLogout)
        return (
            <div className="fixed top-20 right-4 p-2 bg-pikelmore-mocca text-white rounded shadow-xl z-[1000]">
                 <span className="text-sm font-semibold mr-2">Mode Edit ON</span>
                 <button onClick={handleLogout} className="bg-red-600 px-3 py-1 text-xs rounded hover:bg-red-700">Keluar</button>
             </div>
        );
    }

    // Tampilan Login (Menggunakan Email dan Password dari Supabase Auth)
    return (
        <form onSubmit={handleLogin} className="fixed top-20 right-4 p-3 bg-pikelmore-dark text-white rounded shadow-xl z-[1000] flex space-x-2">
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Admin"
                className="p-1 text-sm text-pikelmore-dark-grey rounded"
                required
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="p-1 text-sm text-pikelmore-dark-grey rounded"
                required
            />
            <button type="submit" className="bg-pikelmore-mocca px-3 py-1 text-xs rounded hover:opacity-90">
                Login
            </button>
            {authError && <p className="text-red-400 text-xs mt-1 absolute bottom-[-20px] w-full">{authError}</p>}
        </form>
    );
};
export default AdminToggle;