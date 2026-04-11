import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import gsap from 'gsap';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const iconRef = React.useRef(null);

  const handleToggle = () => {
    gsap.to(iconRef.current, {
      rotate: theme === 'light' ? 180 : 0,
      scale: 0.5,
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        toggleTheme();
        gsap.to(iconRef.current, {
          scale: 1,
          opacity: 1,
          rotate: theme === 'light' ? 0 : -180,
          duration: 0.5,
          ease: 'back.out(1.7)'
        });
      }
    });
  };

  return (
    <button
      onClick={handleToggle}
      className="relative w-12 h-12 flex items-center justify-center rounded-full border border-border-dim hover:bg-text-main hover:text-bg-base transition-colors duration-500 overflow-hidden group"
    >
      <div ref={iconRef} className="text-text-main group-hover:text-bg-base transition-colors duration-500">
        {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
      </div>
    </button>
  );
};

export default ThemeToggle;
