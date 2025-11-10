// lib/api.js

import { supabase } from './supabase'; // Pastikan ini mengimpor client Supabase yang sudah dikonfigurasi

// ===================================================
// 1. PACKAGE API (Untuk Harga dan Nama Paket)
// ===================================================

/**
 * Memperbarui nama atau harga paket di tabel 'packages'.
 * Digunakan untuk fitur CMS In-Context.
 * @param {string} id - ID unik paket.
 * @param {object} updates - Objek berisi properti yang akan diubah (misal: {name: 'Baru', price: 20000000}).
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


// ===================================================
// 2. CONTENT API (Untuk Teks Headline, About, Kolase)
// ===================================================

/**
 * Mengambil nilai konten tunggal (teks atau URL) dari tabel 'content'.
 * @param {string} id - ID konten (misal: 'home_headline', 'collage_url_main').
 */
export async function fetchContent(id) {
    const { data, error } = await supabase
        .from('content')
        .select('value')
        .eq('id', id)
        .single(); // Mengambil hanya satu baris

    if (error) {
        // Jika error (misal: baris tidak ditemukan), kembalikan null
        // Ini tidak dicatat sebagai error fatal karena mungkin konten belum dibuat
        return null;
    }
    return data.value;
}

/**
 * Memperbarui nilai konten tunggal di tabel 'content'.
 * Digunakan untuk fitur CMS In-Context.
 * @param {string} id - ID konten yang akan diubah.
 * @param {string} newValue - Nilai baru (teks atau URL).
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
// 3. STORAGE API (Untuk Upload Gambar Kolase)
// ===================================================

/**
 * Mengunggah file gambar ke Supabase Storage Bucket 'pikelmore-assets'.
 * @param {File} file - Objek File yang akan diunggah.
 * @param {string} fileName - Nama unik untuk file tersebut (disarankan menggunakan timestamp).
 * @param {string} folderName - Folder di dalam bucket (default: 'collage').
 */
export async function uploadImage(file, fileName, folderName = 'collage') {
    const filePath = `${folderName}/${fileName}`; // Contoh: collage/file-1678888.jpg
    
    // Unggah file ke bucket
    const { data, error } = await supabase.storage
        .from('pikelmore-assets') // Nama bucket Pikelmore Anda
        .upload(filePath, file, {
            cacheControl: '3600',
            upsert: true // Izinkan menimpa file dengan nama yang sama jika ada
        });

    if (error) {
        console.error("Error uploading image:", error);
        return { success: false, error };
    }
    
    // Dapatkan URL publik dari file yang diunggah
    const { data: publicUrlData } = supabase.storage
        .from('pikelmore-assets')
        .getPublicUrl(filePath);

    // Pastikan URL publik ada sebelum mengembalikan
    if (!publicUrlData || !publicUrlData.publicUrl) {
         return { success: false, error: 'Gagal mendapatkan URL publik.' };
    }

    return { success: true, url: publicUrlData.publicUrl };
}