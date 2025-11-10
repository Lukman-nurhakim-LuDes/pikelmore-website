// components/PortfolioZigzag.jsx
import React from 'react';

const zigzagItems = [
    { title: "Detil Klasik", text: "Fokus pada cincin, gaun, dan undangan. Menghadirkan elegansi abadi yang tak lekang oleh waktu.", image: '/zigzag/img1.jpg' },
    { title: "Momen Candid", text: "Mengabadikan tawa dan air mata yang otentik. Keaslian yang terekam dengan hati-hati dan penuh ketulusan.", image: '/zigzag/img2.jpg' },
    { title: "Potret Artistik", text: "Komposisi sinematik dengan pencahayaan dramatis. Setiap bidikan dikerjakan dengan presisi artistik.", image: '/zigzag/img3.jpg' },
    { title: "Kehangatan Keluarga", text: "Hubungan emosional yang terekam dengan kelembutan. Fokus pada interaksi yang hangat.", image: '/zigzag/img4.jpg' },
    { title: "Vibe Prewedding", text: "Menciptakan narasi visual dari kisah cinta unik klien kami di lokasi yang menawan.", image: '/zigzag/img5.jpg' },
    { title: "Arsitektur & Latar", text: "Pemanfaatan lanskap dan seting lokasi terbaik untuk latar belakang yang menakjubkan.", image: '/zigzag/img6.jpg' },
];

const PortfolioZigzag = () => {
  return (
    <div className="text-left">
      <h3 className="font-display text-3xl font-semibold text-center mb-16 text-pikelmore-dark-grey">
        Kisah di Balik Lensa
      </h3>
      
      {zigzagItems.map((item, index) => (
        <div 
          key={item.title} 
          className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-center py-10 md:py-16 
                      ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''} 
                      border-b border-gray-100 last:border-b-0`}
        >
          {/* Kolom Gambar */}
          <div className={`${index % 2 !== 0 ? 'md:order-2' : 'md:order-1'} relative h-72 md:h-96 shadow-xl overflow-hidden`}>
            {/* Placeholder Visual untuk Gambar */}
            <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-500">
                [Gambar Zigzag {index + 1}]
            </div>
          </div>

          {/* Kolom Teks */}
          <div className={`${index % 2 !== 0 ? 'md:order-1' : 'md:order-2'} p-4`}>
            <h4 className="font-display text-3xl font-bold mb-3 text-pikelmore-gold">{item.title}</h4>
            <p className="font-body text-lg leading-relaxed text-pikelmore-dark-grey">{item.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
export default PortfolioZigzag;