// components/AdminToggle.jsx (MODIFIKASI)
'use client';

import React, { useState } from 'react';
import { useAdmin } from '@/context/AdminContext'; // Import hook

const AdminToggle = () => {
    const { isEditMode, setIsEditMode } = useAdmin(); // Ambil state dan setter
    const [password, setPassword] = useState('');
    const ADMIN_PASSWORD = 'pikelmorecms'; 

    const handleLogin = () => {
        if (password === ADMIN_PASSWORD) {
            setIsEditMode(true);
            alert('Mode Edit Aktif!');
        } else {
            alert('Password salah.');
        }
        setPassword('');
    };
    
    // Jika sudah Login, tampilkan hanya tombol Logout
    if (isEditMode) {
        return (
             <div className="fixed top-20 right-4 p-2 bg-pikelmore-gold text-white rounded shadow-xl z-[1000]">
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
    
    // Tampilan Login (Default)
    return (
        <div className="fixed top-20 right-4 p-3 bg-gray-800 text-white rounded shadow-xl z-[1000]">
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password Admin"
                className="p-1 text-sm text-black rounded mr-2"
            />
            <button onClick={handleLogin} className="bg-pikelmore-gold px-3 py-1 text-xs rounded hover:opacity-90">
                Login
            </button>
        </div>
    );
};
export default AdminToggle;