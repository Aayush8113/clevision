import React, { useState, useEffect, useRef } from 'react';
import allProperties from '../data/properties.json';
import PropertyCard from '../components/PropertyCard';
import { Search, SlidersHorizontal, ChevronDown, LayoutGrid, List } from 'lucide-react';
import gsap from 'gsap';
import { toast } from 'react-hot-toast';

const Properties = () => {
  const [properties, setProperties] = useState(allProperties);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [filters, setFilters] = useState({
    location: '',
    type: '',
    priceRange: 'all'
  });

  const containerRef = useRef(null);
  const searchInputRef = useRef(null);

  const locations = [...new Set(allProperties.map(p => p.location))];
  const types = [...new Set(allProperties.map(p => p.type))];

  useEffect(() => {
    let filtered = allProperties.filter(p => {
      const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesLocation = filters.location === '' || p.location === filters.location;
      const matchesType = filters.type === '' || p.type === filters.type;
      
      let matchesPrice = true;
      if (filters.priceRange === 'low') matchesPrice = p.rawPrice < 50000;
      if (filters.priceRange === 'mid') matchesPrice = p.rawPrice >= 50000 && p.rawPrice < 5000000;
      if (filters.priceRange === 'high') matchesPrice = p.rawPrice >= 5000000;

      return matchesSearch && matchesLocation && matchesType && matchesPrice;
    });

    setProperties(filtered);
  }, [searchTerm, filters]);

  useEffect(() => {
    gsap.fromTo('.property-card-anim', 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' }
    );
  }, [properties]);

  return (
    <div className="bg-bg-base min-h-screen pt-32 md:pt-44 pb-20" ref={containerRef}>
      {/* Editorial Header */}
      <div className="max-w-7xl mx-auto px-6 mb-12 md:mb-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-border-dim pb-10 md:pb-12">
          <div className="max-w-2xl">
            <span className="text-amber-500 font-bold uppercase tracking-[0.3em] text-[10px] mb-4 block">Archive</span>
            <h1 className="text-text-main text-5xl md:text-8xl font-black tracking-tighter leading-[0.8] mb-6">
              THE<br/><span className="text-text-dim">CATALOG.</span>
            </h1>
            <p className="text-text-dim font-medium text-sm md:text-base">Discover {allProperties.length} architectural landmarks ready for acquisition. Filter by legacy, location, or investment scale.</p>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-2 md:p-3 rounded-xl transition-all ${viewMode === 'grid' ? 'bg-text-main text-bg-base' : 'bg-bg-card text-text-dim hover:text-text-main border border-border-dim'}`}
            >
              <LayoutGrid size={18} />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`p-2 md:p-3 rounded-xl transition-all ${viewMode === 'list' ? 'bg-text-main text-bg-base' : 'bg-bg-card text-text-dim hover:text-text-main border border-border-dim'}`}
            >
              <List size={18} />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Luxury Filter Bar */}
        <div className="sticky top-24 md:top-28 z-40 mb-12 md:mb-16">
          <div className="glass-pill p-1.5 md:p-2 flex flex-col lg:flex-row items-center gap-2">
            <div className="relative flex-grow w-full lg:w-auto">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-text-dim" size={16} />
              <input 
                ref={searchInputRef}
                type="text" 
                placeholder="Search legacy properties..."
                className="w-full pl-14 pr-6 py-3.5 md:py-4 bg-transparent outline-none font-bold text-text-main placeholder:text-text-dim/50 text-xs md:text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="h-6 w-px bg-border-dim hidden lg:block"></div>

            <div className="flex w-full lg:w-auto overflow-x-auto no-scrollbar gap-2 md:gap-0">
              <select 
                className="flex-grow lg:flex-grow-0 md:px-6 py-3.5 md:py-4 bg-transparent outline-none font-bold text-text-main text-xs md:text-sm cursor-pointer appearance-none text-center lg:text-left"
                value={filters.location}
                onChange={(e) => setFilters({...filters, location: e.target.value})}
              >
                <option value="">All Locations</option>
                {locations.map(loc => <option key={loc} value={loc} className="bg-bg-base text-text-main">{loc}</option>)}
              </select>

              <div className="h-6 w-px bg-border-dim hidden lg:block self-center"></div>

              <select 
                className="flex-grow lg:flex-grow-0 md:px-6 py-3.5 md:py-4 bg-transparent outline-none font-bold text-text-main text-xs md:text-sm cursor-pointer appearance-none text-center lg:text-left"
                value={filters.type}
                onChange={(e) => setFilters({...filters, type: e.target.value})}
              >
                <option value="">All Transactions</option>
                {types.map(t => <option key={t} value={t} className="bg-bg-base text-text-main">{t}</option>)}
              </select>
            </div>

            <button 
              onClick={() => {
                searchInputRef.current?.focus();
                toast('Search focused for refinement.', { icon: '🔍' });
              }}
              className="hidden sm:flex btn-luxe py-3 px-8 text-xs md:text-sm items-center gap-2"
            >
              <SlidersHorizontal size={16} />
              Refine
            </button>
          </div>
        </div>

        {/* Results Grid */}
        {properties.length > 0 ? (
          <div className={`grid gap-8 md:gap-12 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
            {properties.map(property => (
              <div key={property.id} className="property-card-anim">
                <PropertyCard property={property} />
              </div>
            ))}
          </div>
        ) : (
          <div className="py-20 md:py-40 text-center">
            <div className="text-text-dim/10 text-[20vw] md:text-[120px] font-black leading-none mb-8 select-none">EMPTY</div>
            <h3 className="text-xl md:text-2xl font-bold text-text-main mb-4 text-balance">No properties match your current vision.</h3>
            <button 
              onClick={() => {
                setSearchTerm(''); 
                setFilters({location: '', type: '', priceRange: 'all'});
                toast.success('Perspective cleared.');
              }}
              className="text-amber-500 font-bold uppercase tracking-widest text-xs hover:underline"
            >
              Reset Perspective
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Properties;
