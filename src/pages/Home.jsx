import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import properties from '../data/properties.json';
import PropertyCard from '../components/PropertyCard';
import { ArrowRight, Play, Award, Globe, Shield } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { toast } from 'react-hot-toast';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const featuredProperties = properties.filter(p => p.featured).slice(0, 6);
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-title-word', {
        y: 100,
        opacity: 0,
        duration: 1.5,
        stagger: 0.2,
        ease: 'power4.out',
        delay: 0.8
      });

      gsap.from('.hero-sub', {
        opacity: 0,
        y: 20,
        duration: 1,
        ease: 'power2.out',
        delay: 1.5
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-bg-base outline-none" ref={heroRef}>
      {/* Cinematic Hero */}
      <section className="relative h-[90vh] md:h-screen flex items-center overflow-hidden bg-zinc-950">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=2000" 
            alt="Cinematic House"
            className="w-full h-full object-cover opacity-60 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/20 via-zinc-950/40 to-zinc-950"></div>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-20">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">
            <div className="max-w-4xl">
              <span className="inline-block text-amber-500 font-bold uppercase tracking-[0.3em] text-[10px] mb-4 md:mb-6 hero-sub">
                The Architect's Selection 2026
              </span>
              <h1 className="text-white text-[12vw] md:text-[8vw] lg:text-[120px] font-black leading-[0.9] tracking-tighter text-balance mb-8" ref={titleRef}>
                <span className="hero-title-word inline-block">CRAFTING</span><br/>
                <span className="hero-title-word inline-block text-amber-500 italic font-serif font-light">LEGACIES</span><br/>
                <span className="hero-title-word inline-block">OF SPACE.</span>
              </h1>
              <p className="text-zinc-400 text-base md:text-xl max-w-xl font-medium leading-relaxed mb-10 md:mb-12 hero-sub">
                Transcend the ordinary with UrbanNest. We curate architectural masterpieces that redefine the meaning of 'Home'.
              </p>
              
              <div className="flex flex-wrap gap-4 md:gap-6 hero-sub">
                <Link to="/properties" className="btn-luxe flex items-center gap-4 !bg-white !text-zinc-950 !border-none">
                  Explore Collections <ArrowRight size={20} />
                </Link>
                <button 
                  onClick={() => toast('Directing the cinematic narrative...', { icon: '🎬' })}
                  className="w-14 h-14 md:w-16 md:h-16 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-zinc-950 transition-all duration-500 group"
                >
                  <Play size={20} className="fill-current ml-1" />
                </button>
              </div>
            </div>

            {/* Vertical Stats Column */}
            <div className="hidden lg:flex flex-col gap-12 border-l border-white/10 pl-12 pb-4 hero-sub">
              <div>
                <div className="text-4xl font-black text-white">010+</div>
                <div className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mt-2">Cities Presence</div>
              </div>
              <div>
                <div className="text-4xl font-black text-white">₹45B+</div>
                <div className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mt-2">Assets Managed</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Anthology Section */}
      <section className="py-20 md:py-32 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-baseline mb-16 md:mb-20 gap-8">
          <div className="max-w-xl">
            <h2 className="text-text-main text-4xl md:text-7xl font-black tracking-tighter leading-none mb-6">
              CURATED<br/><span className="text-text-dim">HAVENS.</span>
            </h2>
            <p className="text-text-dim font-medium leading-relaxed">
              Every property in our portfolio is selected based on three rigid principles: Architectural integrity, Location legacy, and Investment security.
            </p>
          </div>
          <Link to="/properties" className="group flex items-center gap-4 text-text-main font-bold uppercase tracking-widest text-[10px] md:text-sm border-b-2 border-text-main pb-2 hover:text-amber-500 hover:border-amber-500 transition-all duration-300">
            Expand Gallery <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12" ref={gridRef}>
          {featuredProperties.map((property) => (
            <div key={property.id} className="reveal-item">
              <PropertyCard property={property} />
            </div>
          ))}
        </div>
      </section>

      {/* The Vision Quote */}
      <section className="py-32 md:py-40 bg-bg-card text-text-main overflow-hidden relative transition-colors duration-500">
        <div className="absolute top-0 right-0 text-[30vw] md:text-[300px] font-black text-text-main/[0.03] leading-none pointer-events-none -mr-20 md:-mr-40 select-none uppercase">
          Vision
        </div>
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <Globe className="text-amber-500 mx-auto mb-10 md:mb-12" size={48} />
          <blockquote className="text-2xl md:text-6xl font-light leading-[1.2] tracking-tight mb-12 md:mb-16 text-balance italic font-serif">
            "Space is the breath of art. We don't just sell real estate; we sell a <span className="text-text-main font-black not-italic underline decoration-amber-500 md:decoration-8 underline-offset-8">New Perspective</span> of living."
          </blockquote>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-16 md:pt-20 border-t border-border-dim">
            <div className="flex gap-4 md:gap-6 items-start text-left">
              <Shield className="text-amber-500 shrink-0" size={32} />
              <div>
                <h4 className="font-bold text-lg md:text-xl mb-2">Immutable Trust</h4>
                <p className="text-text-dim text-xs md:text-sm leading-relaxed">Rigorous legal verification for every signature on every deed.</p>
              </div>
            </div>
            <div className="flex gap-4 md:gap-6 items-start text-left">
              <Award className="text-amber-500 shrink-0" size={32} />
              <div>
                <h4 className="font-bold text-lg md:text-xl mb-2">Global Standards</h4>
                <p className="text-text-dim text-xs md:text-sm leading-relaxed">World-class amenities integrated with localized cultural essence.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
