// components/Footer.jsx

import React from 'react';
import Link from 'next/link';
import { FaInstagram, FaTiktok } from 'react-icons/fa'; // Wajib: Pastikan react-icons sudah terinstal

const Footer = () => {
  // Data Link Media Sosial
  const socialLinks = [
    { name: 'Instagram', url: 'https://www.instagram.com/pikelmore', icon: <FaInstagram /> }, 
    { name: 'TikTok', url: 'https://www.tiktok.com/@pikelmore', icon: <FaTiktok /> },
  ];

  return (
    // Background Hitam, Teks Otomatis Putih
    <footer className="bg-pikelmore-black text-white py-12 md:py-16">
      <div className="container mx-auto px-6 md:px-8">
        
        {/* PERBAIKAN GRID MOBILE: Default 2 Kolom, 4 Kolom di Layar Besar */}
        {/* Tambahkan gap-y-12 untuk jarak vertikal yang baik di mobile */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 border-b border-gray-700 pb-10 mb-8">
          
          {/* Kolom 1: Logo */}
          <div className="col-span-2 lg:col-span-1"> {/* Membentang 2 kolom di mobile */}
            <h3 className="font-display text-3xl font-bold mb-4 text-pikelmore-mocca">PIXELMORÉ</h3>
            <p className="font-body text-sm max-w-xs">Mengabadikan setiap momen dengan sentuhan elegan dan profesional.</p>
          </div>
          
          {/* Kolom 2: Tautan Cepat */}
          <div className="col-span-2 lg:col-span-1"> {/* Membentang 2 kolom di mobile */}
            <h4 className="font-body font-semibold text-lg mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/content#portfolio" className="hover:text-pikelmore-taupe transition-colors">Portfolio</Link></li>
              <li><Link href="/content#package" className="hover:text-pikelmore-taupe transition-colors">Package</Link></li>
              <li><Link href="/content#booking" className="hover:text-pikelmore-taupe transition-colors">Booking</Link></li>
            </ul>
          </div>

          {/* Kolom 3: Kontak (FIX: Margin Top di Mobile) */}
          <div className="col-span-2 lg:col-span-1 mt-8 lg:mt-0"> {/* Margin top 8 untuk memisahkan dari baris pertama di mobile */}
            <h4 className="font-body font-semibold text-lg mb-4 text-white">Contact Us</h4>
            <p className="font-body text-sm">
              Email: pixelmorephotography@gmail.com<br />
              Phone: +62 8777 915 2773
            </p>
          </div>

          {/* Kolom 4: Media Sosial (FIX: Margin Top di Mobile) */}
          <div className="col-span-2 lg:col-span-1 mt-8 lg:mt-0"> {/* Margin top 8 untuk memisahkan dari baris pertama di mobile */}
            <h4 className="font-body font-semibold text-lg mb-4 text-white">Follow Us</h4>
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-3xl hover:text-pikelmore-mocca transition-colors"
                  aria-label={`Follow us on ${link.name}`}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Hak Cipta */}
        <div className="text-center text-xs">
          &copy; {new Date().getFullYear()} PIXELMORÉ. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
export default Footer;