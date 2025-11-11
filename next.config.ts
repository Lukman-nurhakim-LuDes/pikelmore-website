// next.config.js (VERSI FINAL FIX CACHE)

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ini adalah konfigurasi Next.js standar

  // --- FIX KRITIS: Menonaktifkan Cache untuk Gambar yang Diunggah ---
  // Next.js Image Optimization memerlukan headers yang mengizinkan pemuatan dari Supabase.
  async headers() {
    return [
      {
        // Target semua URL gambar dari Supabase Storage Anda
        source: '/storage/v1/object/public/pikelmore-assets/:path*', 
        headers: [
          // Ini mencegah browser/CDN menyimpan cache
          {
            key: 'Cache-Control',
            value: 'no-store, max-age=0',
          },
        ],
      },
    ];
  },
  // ------------------------------------------------------------------

  // Pastikan Anda juga menyertakan domains/remotePatterns jika Anda menggunakan Next/Image
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'klomesmatulgdiiflicd.supabase.co',
      },
    ],
  },
};

module.exports = nextConfig; // Gunakan module.exports yang benar