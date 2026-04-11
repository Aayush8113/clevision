import React from 'react';
import { Link } from 'react-router-dom';
import { Building2, Instagram, Twitter, Globe, ArrowRight } from 'lucide-react';
import { toast } from 'react-hot-toast';

const Footer = () => {
  return (
    <footer className="bg-text-main text-bg-base pt-20 md:pt-32 pb-10 md:pb-12 overflow-hidden relative">
      <div className="absolute bottom-0 right-0 text-[20vw] font-black text-bg-base/[0.03] leading-none pointer-events-none select-none -mb-4 md:-mb-8 uppercase">
        UrbanNest
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 md:gap-20 mb-20 md:mb-32">
          {/* Brand & Identity */}
          <div className="lg:col-span-5">
            <Link to="/" className="flex items-center gap-3 mb-8 md:mb-10 group">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-amber-500 rounded-full flex items-center justify-center text-zinc-950 group-hover:bg-text-main group-hover:text-bg-base transition-colors duration-500">
                <Building2 size={20} md:size={24} />
              </div>
              <div className="flex flex-col">
                <span className="text-xl md:text-2xl font-black tracking-tighter uppercase italic leading-none">UrbanNest</span>
                <span className="text-[8px] md:text-[10px] font-bold text-amber-500 uppercase tracking-[0.3em] mt-1">Architectural Anthology</span>
              </div>
            </Link>
            <p className="text-text-dim text-base md:text-lg font-medium leading-relaxed mb-10 md:mb-12 max-w-sm">
              We define the nexus of architectural integrity and investment legacy. India's premiere portal for curated real estate.
            </p>
            <div className="flex gap-4 md:gap-6">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-bg-base/10 flex items-center justify-center hover:bg-amber-500 hover:text-zinc-950 transition-all duration-500">
                <Instagram size={18} md:size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-bg-base/10 flex items-center justify-center hover:bg-amber-500 hover:text-zinc-950 transition-all duration-500">
                <Twitter size={18} md:size={20} />
              </a>
              <a href="https://urbannest.ai" target="_blank" rel="noreferrer" className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-bg-base/10 flex items-center justify-center hover:bg-amber-500 hover:text-zinc-950 transition-all duration-500">
                <Globe size={18} md:size={20} />
              </a>
            </div>
          </div>

          {/* Navigation Anthology */}
          <div className="lg:col-span-3">
            <h4 className="text-amber-500 text-[10px] font-bold uppercase tracking-[0.3em] mb-8 md:mb-10">Collections</h4>
            <ul className="space-y-4 md:space-y-6">
              <li>
                <Link to="/" className="text-xl md:text-2xl font-black tracking-tighter hover:text-amber-500 transition-colors uppercase">Home</Link>
              </li>
              <li>
                <Link to="/properties" className="text-xl md:text-2xl font-black tracking-tighter hover:text-amber-500 transition-colors uppercase">Archive</Link>
              </li>
              <li>
                <Link to="/contact" className="text-xl md:text-2xl font-black tracking-tighter hover:text-amber-500 transition-colors uppercase">Station</Link>
              </li>
            </ul>
          </div>

          {/* Newsletter / Desk */}
          <div className="lg:col-span-4">
            <h4 className="text-amber-500 text-[10px] font-bold uppercase tracking-[0.3em] mb-8 md:mb-10">Inquiry Desk</h4>
            <p className="text-text-dim text-xs md:text-sm mb-8">Subscribe to receive exclusive early access to off-market architectural landmarks.</p>
            <div className="relative group">
              <input 
                type="email" 
                placeholder="Digital Address"
                className="w-full bg-bg-base/5 border border-bg-base/10 rounded-full py-4 px-6 md:px-8 outline-none focus:border-amber-500 transition-all text-xs md:text-sm font-bold placeholder:text-text-dim/30"
              />
              <button 
                onClick={() => toast.success('Digital address ledger updated.')}
                className="absolute right-1.5 top-1.5 w-10 h-10 md:w-11 md:h-11 bg-amber-500 rounded-full flex items-center justify-center text-zinc-950 hover:bg-white transition-all pointer-events-auto"
              >
                <ArrowRight size={18} md:size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="pt-10 md:pt-12 border-t border-bg-base/5 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          <p className="text-text-dim text-[9px] md:text-[10px] font-bold uppercase tracking-widest leading-loose">© 2026 URBANNEST ARCHITECTURAL SYNDICATE. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-6 md:gap-8 text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-text-dim">
            <a href="#" className="hover:text-amber-500 transition-colors">Terms of Engagement</a>
            <a href="#" className="hover:text-amber-500 transition-colors">Privacy Ledger</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
