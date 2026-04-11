import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Bed, Bath, Square, ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';

const PropertyCard = ({ property }) => {
  const cardRef = useRef(null);
  const imgRef = useRef(null);

  const handleMouseEnter = () => {
    gsap.to(imgRef.current, { scale: 1.1, duration: 0.8, ease: 'power2.out' });
  };

  const handleMouseLeave = () => {
    gsap.to(imgRef.current, { scale: 1, duration: 0.8, ease: 'power2.out' });
  };

  return (
    <div 
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative bg-bg-card rounded-[2rem] overflow-hidden border border-border-dim transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.05)]"
    >
      <Link to={`/property/${property.id}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden">
          <img 
            ref={imgRef}
            src={property.image} 
            alt={property.title}
            className="w-full h-full object-cover transition-transform duration-700"
          />
          
          {/* Top Badge Overlay */}
          <div className="absolute top-4 md:top-6 left-4 md:left-6 right-4 md:right-6 flex justify-between items-start pointer-events-none">
            <span className="bg-text-main/80 backdrop-blur-md text-bg-base text-[9px] md:text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
              {property.type}
            </span>
            <div className="w-8 h-8 md:w-10 md:h-10 bg-bg-pill/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/30 transform transition-transform duration-500 group-hover:rotate-45 group-hover:bg-amber-500 group-hover:border-amber-500">
              <ArrowUpRight size={16} />
            </div>
          </div>

          {/* Bottom Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 bg-gradient-to-t from-zinc-950/90 to-transparent text-white md:translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
            <p className="text-amber-500 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] mb-2">{property.location}</p>
            <h3 className="text-xl md:text-2xl font-black leading-tight mb-4 text-balance">{property.title}</h3>
            
            <div className="flex gap-4 md:gap-6 pt-4 border-t border-white/20">
              <div className="flex items-center gap-2">
                <Bed size={14} className="text-zinc-400" />
                <span className="text-[10px] md:text-xs font-medium">{property.bedrooms}</span>
              </div>
              <div className="flex items-center gap-2">
                <Bath size={14} className="text-zinc-400" />
                <span className="text-[10px] md:text-xs font-medium">{property.bathrooms}</span>
              </div>
              <div className="flex items-center gap-2">
                <Square size={14} className="text-zinc-400" />
                <span className="text-[10px] md:text-xs font-medium">{property.area.split(' ')[0]}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
      
      {/* Price Trigger Tab */}
      <div className="p-4 md:p-6 flex justify-between items-center bg-bg-card">
        <span className="text-text-dim text-[9px] md:text-[10px] font-bold uppercase tracking-widest">Investment</span>
        <span className="text-lg md:text-xl font-black text-text-main">{property.price}</span>
      </div>
    </div>
  );
};

export default PropertyCard;
