// components/Footer.jsx
import React from 'react';
import Link from 'next/link';

const Footer = () => {
  // ... socialLinks definition ...
  const socialLinks = [
    { name: 'Instagram', url: 'https://www.instagram.com/pikelmore', icon: '📷' },
    { name: 'TikTok', url: 'https://www.tiktok.com/@pikelmore', icon: '🎶' },
  ];

  return (
    // Background Hitam, Teks Otomatis Putih
    <footer className="bg-pikelmore-black text-white py-12 md:py-16">
      <div className="container mx-auto px-6 md:px-8">
        
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-10 border-b border-gray-700 pb-10 mb-8">
          
          <div>
            <h3 className="font-display text-3xl font-bold mb-4 text-pikelmore-mocca">Pikelmore</h3>
            <p className="font-body text-sm max-w-xs">Mengabadikan setiap momen dengan sentuhan elegan dan profesional.</p>
          </div>
          
          <div>
            <h4 className="font-body font-semibold text-lg mb-4 text-white">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/content#portfolio" className="hover:text-pikelmore-taupe transition-colors">Portfolio</Link></li>
              <li><Link href="/content#package" className="hover:text-pikelmore-taupe transition-colors">Package</Link></li>
              <li><Link href="/content#booking" className="hover:text-pikelmore-taupe transition-colors">Booking</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-body font-semibold text-lg mb-4 text-white">Contact Us</h4>
            <p className="font-body text-sm">Email: info@pikelmore.com<br />Phone: +62 812 XXXX XXXX</p>
          </div>

          <div>
            <h4 className="font-body font-semibold text-lg mb-4 text-white">Follow Us</h4>
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" className="text-2xl hover:text-pikelmore-mocca transition-colors">
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center text-xs">
          &copy; {new Date().getFullYear()} Pikelmore. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
export default Footer;