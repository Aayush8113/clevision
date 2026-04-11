import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import properties from '../data/properties.json';
import { 
  Bed, Bath, Square, MapPin, CheckCircle2, 
  ArrowLeft, Phone, Mail, ShieldCheck, ArrowRight, Share2, Heart, HeartOff
} from 'lucide-react';
import gsap from 'gsap';
import { toast } from 'react-hot-toast';

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const pageRef = useRef(null);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const found = properties.find(p => p.id === parseInt(id));
    if (found) {
      setProperty(found);
      window.scrollTo(0, 0);
    }
  }, [id]);

  useEffect(() => {
    if (property) {
      gsap.fromTo('.stagger-item', 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: 'power3.out' }
      );
    }
  }, [property]);

  if (!property) return (
    <div className="h-screen flex items-center justify-center bg-bg-base">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-border-dim border-t-text-main rounded-full animate-spin"></div>
        <span className="text-text-dim font-bold uppercase tracking-widest text-[10px]">Architecting...</span>
      </div>
    </div>
  );

  return (
    <div className="bg-bg-base min-h-screen pt-32 md:pt-44 pb-32" ref={pageRef}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Navigation Toolbar */}
        <div className="flex items-center justify-between mb-10 md:mb-16 stagger-item">
          <button 
            onClick={() => navigate(-1)}
            className="group flex items-center gap-3 text-text-dim hover:text-text-main transition-colors"
          >
            <div className="w-10 h-10 rounded-full border border-border-dim flex items-center justify-center group-hover:bg-text-main group-hover:text-bg-base transition-all">
              <ArrowLeft size={18} />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest hidden sm:inline">Back to Archive</span>
          </button>

          <div className="flex gap-3 md:gap-4">
            <button 
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                toast.success('Collection link copied');
              }}
              className="w-10 h-10 rounded-full border border-border-dim flex items-center justify-center text-text-main hover:bg-text-main hover:text-bg-base transition-all"
            >
              <Share2 size={18} />
            </button>
            <button 
              onClick={() => {
                setIsSaved(!isSaved);
                toast.success(isSaved ? 'Removed from collection' : 'Added to private gallery');
              }}
              className={`w-10 h-10 rounded-full border border-border-dim flex items-center justify-center transition-all ${isSaved ? 'bg-amber-500 border-amber-500 text-zinc-950' : 'text-text-main hover:bg-text-main hover:text-bg-base'}`}
            >
              {isSaved ? <HeartOff size={18} /> : <Heart size={18} />}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-20">
          {/* Main Visuals Column */}
          <div className="lg:col-span-8 space-y-12 md:space-y-16">
            <div className="relative rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl stagger-item group">
              <img 
                src={property.image} 
                alt={property.title}
                className="w-full aspect-[4/3] md:aspect-[16/10] object-cover"
              />
              <div className="absolute top-6 md:top-10 left-6 md:left-10">
                <span className="bg-text-main text-bg-base text-[10px] font-black uppercase tracking-[0.3em] px-4 py-2 rounded-full shadow-xl">
                   {property.type} Unit
                </span>
              </div>
            </div>

            <div className="stagger-item">
              <div className="flex items-center gap-2 text-amber-500 font-bold uppercase tracking-[0.3em] text-[10px] mb-4">
                <MapPin size={12} />
                {property.location}
              </div>
              <h1 className="text-text-main text-5xl md:text-8xl font-black tracking-tighter leading-[0.85] mb-8 text-balance">
                {property.title.split(' ').slice(0, -1).join(' ')}<br/>
                <span className="text-text-dim italic underline decoration-amber-500 decoration-2 md:decoration-8 underline-offset-8">{property.title.split(' ').pop()}</span>
              </h1>
              <div className="flex flex-wrap gap-8 md:gap-16 py-10 border-y border-border-dim">
                <div>
                  <div className="text-text-dim uppercase tracking-widest text-[9px] font-black mb-2">Space</div>
                  <div className="text-xl md:text-3xl font-black text-text-main flex items-center gap-3">
                    <Square size={20} className="text-amber-500" /> {property.area}
                  </div>
                </div>
                <div>
                  <div className="text-text-dim uppercase tracking-widest text-[9px] font-black mb-2">Quartet</div>
                  <div className="text-xl md:text-3xl font-black text-text-main flex items-center gap-3">
                    <Bed size={20} className="text-amber-500" /> {property.bedrooms} <span className="hidden sm:inline">Beds</span>
                  </div>
                </div>
                <div>
                  <div className="text-text-dim uppercase tracking-widest text-[9px] font-black mb-2">Sanitary</div>
                  <div className="text-xl md:text-3xl font-black text-text-main flex items-center gap-3">
                    <Bath size={20} className="text-amber-500" /> {property.bathrooms} <span className="hidden sm:inline">Baths</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="stagger-item max-w-2xl">
              <h4 className="text-text-main font-black uppercase tracking-[0.2em] text-[10px] mb-6">Concept Statement</h4>
              <p className="text-text-main text-lg md:text-2xl font-medium leading-relaxed italic border-l-4 border-amber-500 pl-6 md:pl-10">
                "{property.description} This residence is a dialogue between brutalist stability and modern fluidity."
              </p>
            </div>
          </div>

          {/* Acquisition Sidebar */}
          <div className="lg:col-span-4 h-fit stagger-item">
            <div className="sticky top-32 bg-text-main text-bg-base p-10 md:p-12 rounded-[2rem] md:rounded-[2.5rem] shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-40 h-40 bg-bg-base/5 rounded-bl-full pointer-events-none"></div>
               
               <p className="text-text-dim text-[10px] font-bold uppercase tracking-[0.3em] mb-4">Acquisition Value</p>
               <h2 className="text-4xl md:text-6xl font-black mb-10 md:mb-12 text-amber-500 tracking-tighter">{property.price}</h2>
               
               <div className="space-y-8 mb-12 md:mb-16">
                  <div className="flex items-center gap-4 group cursor-pointer">
                    <div className="w-12 h-12 rounded-full bg-bg-base/10 flex items-center justify-center group-hover:bg-amber-500 transition-colors">
                      <Phone size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] text-text-dim uppercase tracking-widest">Inquiry Line</p>
                      <p className="font-bold">+91 8000 123 456</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 group cursor-pointer">
                    <div className="w-12 h-12 rounded-full bg-bg-base/10 flex items-center justify-center group-hover:bg-amber-500 transition-colors">
                      <Mail size={20} />
                    </div>
                    <div>
                      <p className="text-[10px] text-text-dim uppercase tracking-widest">Digital Ledger</p>
                      <p className="font-bold">desk@urbannest.ai</p>
                    </div>
                  </div>
               </div>

               <button 
                 onClick={() => navigate('/contact', { state: { subject: `Inquiry: ${property.title}` } })}
                 className="w-full btn-luxe !bg-bg-base !text-text-main hover:!bg-amber-500 hover:!text-zinc-950 mb-4 !py-5"
               >
                  Request Presentation
               </button>
               <div className="flex items-center justify-center gap-2 text-[9px] font-bold uppercase tracking-[0.2em] text-text-dim py-4 border-t border-bg-base/10 mt-6">
                  <ShieldCheck size={14} className="text-amber-500" />
                  Architectural Integrity Guaranteed
               </div>
            </div>
          </div>
        </div>

        {/* Interior Blueprint */}
        <section className="mt-20 md:mt-32 stagger-item">
          <h2 className="text-text-main text-3xl md:text-5xl font-black tracking-tighter mb-10 md:mb-16 uppercase">Legacy Amenities.</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {['Sky Terrace', 'Wine Cellar', 'Smart Integration', 'Private Concierge', 'Infinity Deck', 'Solar Efficiency', 'Guest Quarters', 'Vehicle Vault'].map(item => (
              <div key={item} className="p-8 md:p-10 bg-bg-card border border-border-dim rounded-[2rem] flex flex-col gap-6 hover:border-amber-500 transition-all group">
                <CheckCircle2 size={24} className="text-text-dim group-hover:text-amber-500 transition-colors" />
                <span className="font-bold text-text-main uppercase tracking-tighter text-sm md:text-base">{item}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default PropertyDetails;
