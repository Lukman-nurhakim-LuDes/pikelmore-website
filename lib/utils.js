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