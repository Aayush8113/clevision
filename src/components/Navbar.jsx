import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Building2, Search, Menu, X } from 'lucide-react';
import { gsap } from 'gsap';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(navRef.current, 
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power4.out', delay: 0.5 }
    );
  }, []);

  const navLinks = [
    { name: 'Collections', path: '/properties' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <div className="fixed top-6 md:top-8 left-0 w-full z-[100] px-4 pointer-events-none" ref={navRef}>
      <nav className="max-w-4xl mx-auto glass-pill px-4 md:px-6 py-2 md:py-3 flex items-center justify-between pointer-events-auto">
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="w-8 h-8 md:w-10 md:h-10 bg-amber-500 rounded-full flex items-center justify-center text-zinc-950 group-hover:bg-text-main group-hover:text-bg-base transition-colors duration-500">
            <Building2 size={18} md:size={22} />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] md:text-sm font-black tracking-tighter uppercase text-text-main leading-none">UrbanNest</span>
            <span className="text-[6px] md:text-[8px] font-bold text-amber-500 uppercase tracking-widest leading-none mt-1">Architectural Anthology</span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-[11px] font-bold uppercase tracking-widest transition-all duration-300 hover:text-amber-500 ${
                location.pathname === link.path ? 'text-amber-500' : 'text-text-main'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <div className="flex items-center gap-4 pl-4 border-l border-border-dim">
            <ThemeToggle />
            <Link 
              to="/properties" 
              className="w-10 h-10 rounded-full border border-border-dim flex items-center justify-center text-text-main hover:bg-text-main hover:text-bg-base transition-all duration-500"
            >
              <Search size={18} />
            </Link>
          </div>
        </div>

        {/* Mobile Actions */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="text-text-main p-2"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Pill */}
      {isOpen && (
        <div className="md:hidden absolute top-20 left-4 right-4 glass-pill p-6 flex flex-col items-center space-y-6 pointer-events-auto animate-in fade-in slide-in-from-top-4 duration-300">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className="text-lg font-bold uppercase tracking-widest text-text-main"
            >
              {link.name}
            </Link>
          ))}
          <Link 
            to="/properties" 
            onClick={() => setIsOpen(false)}
            className="btn-luxe w-full text-center !bg-text-main !text-bg-base"
          >
            Search Properties
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
