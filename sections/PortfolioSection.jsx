// sections/PortfolioSection.jsx
import React from 'react';
import PortfolioGallery from '@/components/PortfolioGallery';
import PortfolioZigzag from '@/components/PortfolioZigzag';

const PortfolioSection = ({ id }) => {
  return (
    <section id={id} className="pt-24 pb-12 md:pt-32 md:pb-16 bg-white text-pikelmore-dark-grey">
      <div className="container mx-auto px-6 md:px-8 text-center">
        <h2 className="font-display text-5xl font-bold mb-16 text-pikelmore-dark-grey">
          Portfolio Kami
        </h2>
        
        <PortfolioGallery />
        <PortfolioZigzag />
        
      </div>
    </section>
  );
};
export default PortfolioSection;