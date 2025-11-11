// lib/api.js

import { supabase } from './supabase'; 

// ===================================================
// 1. PACKAGE API (Read, Update, Create)
// ===================================================

/**
 * Mengambil semua paket dari database.
 */
export async function fetchAllPackages() {
    let { data, error } = await supabase
        .from('packages')
        .select('*')
        .order('price', { ascending: true }); 
        
    if (error) {
        console.error('ERROR fetching packages:', error);
        return [];
    }
    return data;
}

/**
 * Memperbarui nama atau harga paket di tabel 'packages'.
 */
export async function updatePackage(id, updates) {
    const { data, error } = await supabase
        .from('packages')
        .update(updates)
        .eq('id', id);

    if (error) {
        console.error('ERROR updating package:', error);
        return { success: false, error };
    }
    return { success: true, data };
}

/**
 * Membuat paket baru dengan nilai default. (FUNGSI BARU)
 */
export async function createNewPackage() {
    const { data, error } = await supabase
        .from('packages')
        .insert({
            name: 'Paket Baru',
            price: 5000000,
            features: ['Fitur 1', 'Fitur 2', 'Fitur 3'], // Fitur default
            is_popular: false
        })
        .select() // Penting: Agar data dikembalikan dan bisa ditambahkan ke state
        .single(); 

    if (error) {
        console.error('ERROR creating new package:', error);
        return { success: false, error };
    }
    return { success: true, data };
}


// ===================================================
// 2. CONTENT API (Fetch & Update Teks CMS)
// ===================================================

/**
 * Mengambil nilai konten tunggal (teks atau URL) dari tabel 'content'.
 */
export async function fetchContent(id) {
    const { data, error } = await supabase
        .from('content')
        .select('value')
        .eq('id', id)
        .single();

    if (error) {
        return null;
    }
    return data.value;
}

/**
 * Memperbarui nilai konten tunggal di tabel 'content'.
 */
export async function updateContent(id, newValue) {
    const { data, error } = await supabase
        .from('content')
        .update({ value: newValue })
        .eq('id', id);

    if (error) {
        console.error('ERROR updating content:', error);
        return { success: false, error };
    }
    return { success: true, data };
}


// ===================================================
// 3. STORAGE API (Upload Gambar)
// ===================================================

/**
 * Mengunggah file gambar ke Supabase Storage Bucket.
 */
export async function uploadImage(file, fileName, folderName) {
    const filePath = `${folderName}/${fileName}-${Date.now()}`; 
    
    const { data, error } = await supabase.storage
        .from('pikelmore-assets') 
        .upload(filePath, file, {
            cacheControl: '3600',
            upsert: true
        });

    if (error) {
        console.error("ERROR uploading image:", error);
        return { success: false, error };
    }
    
    const { data: publicUrlData } = supabase.storage
        .from('pikelmore-assets')
        .getPublicUrl(filePath);

    if (!publicUrlData || !publicUrlData.publicUrl) {
         return { success: false, error: 'Gagal mendapatkan URL publik.' };
    }

    return { success: true, url: publicUrlData.publicUrl };
}