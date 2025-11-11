// lib/utils.js

/**
 * Memformat angka menjadi format mata uang Rupiah (IDR).
 * Contoh: 1500000 menjadi Rp1.500.000
 * @param {number} number - Angka yang akan diformat.
 * @returns {string} - String yang sudah diformat Rupiah.
 */
export const formatRupiah = (number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(number);
};

/**
 * Menambahkan timestamp unik ke URL gambar untuk mengatasi cache browser/CDN.
 * @param {string} url - URL gambar asli dari Supabase.
 * @returns {string} - URL dengan parameter cache-busting.
 */
export const getUniqueUrl = (url) => {
    // Hanya tambahkan parameter jika URL valid dan belum memiliki query (untuk menghindari konflik)
    if (!url) return '';
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}v=${Date.now()}`;
};