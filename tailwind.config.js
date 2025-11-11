// tailwind.config.js


/** @type {import('tailwindcss').Config} */
module.exports = {
  // --- Tentukan lokasi semua file yang akan menggunakan kelas Tailwind ---
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './sections/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // --- Font Pairing Pikelmore ---
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        body: ['Poppins', 'sans-serif'],
      },
      // --- Palet Warna Hitam/Krem Mocca Pikelmore ---
      colors: {
        'pikelmore-black': '#000000',       // Background Utama (Paling Gelap)
        'pikelmore-dark': '#0A1931',        // Background Section Kontras
        'pikelmore-mocca': '#7F664C',       // Aksen Utama (Tombol/Logo)
        'pikelmore-taupe': '#A38E78',       // Aksen Sekunder/Hover
        'pikelmore-ivory': '#F0F0F0',       // Background Section Terang
        'pikelmore-white': '#FFFFFF',       // Teks Utama Putih
        'pikelmore-dark-grey': '#333333',   // Untuk teks umum di background terang
      }
    },
  },
  
  // --- Aktivasi Plugin ---
  plugins: [
    require('@tailwindcss/aspect-ratio'), // <--- PLUGIN WAJIB untuk Kolase Visual
  ],
}