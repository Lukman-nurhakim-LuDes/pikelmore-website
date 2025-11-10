// context/AdminContext.jsx
'use client'; 

import React, { createContext, useState, useContext } from 'react';

// 1. Buat Context
const AdminContext = createContext({
    isEditMode: false,
    setIsEditMode: () => {},
    // Anda bisa menambahkan state lain di sini, seperti data pengguna admin
});

// 2. Buat Provider Component
export const AdminProvider = ({ children }) => {
    const [isEditMode, setIsEditMode] = useState(false);

    return (
        <AdminContext.Provider value={{ isEditMode, setIsEditMode }}>
            {children}
        </AdminContext.Provider>
    );
};

// 3. Buat Custom Hook untuk Akses Mudah
export const useAdmin = () => {
    return useContext(AdminContext);
};