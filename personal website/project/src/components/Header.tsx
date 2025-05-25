import React, { useState, useEffect } from 'react';
import { Menu, X, Shield, Download, Palette } from 'lucide-react';
import { personalInfo } from '../data/personalInfo';
import { useTheme } from '../context/ThemeContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isDarkGreen, toggleBackground } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Tech Stack', href: '#tech-stack' },
    { name: 'Certificates', href: '#certificates' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'header-scrolled' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <a href="#home" className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-emerald-500" />
            <span className="text-xl font-bold text-white">{personalInfo.name}</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-300 hover:text-emerald-400 transition-colors"
              >
                {item.name}
              </a>
            ))}
            <button
              onClick={toggleBackground}
              className="p-2 rounded-full hover:bg-slate-800/50 dark-green-bg:hover:bg-black/50 transition-colors"
              aria-label="Toggle background"
            >
              <Palette className={`w-5 h-5 ${isDarkGreen ? 'text-emerald-400' : 'text-gray-300'}`} />
            </button>
            {personalInfo.resumeUrl !== '#' && (
              <a
                href={personalInfo.resumeUrl}
                className="flex items-center px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md transition-colors"
                download
              >
                <Download className="w-4 h-4 mr-2" />
                Resume
              </a>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-4 md:hidden">
            <button
              onClick={toggleBackground}
              className="p-2 rounded-full hover:bg-slate-800/50 dark-green-bg:hover:bg-black/50 transition-colors"
              aria-label="Toggle background"
            >
              <Palette className={`w-5 h-5 ${isDarkGreen ? 'text-emerald-400' : 'text-gray-300'}`} />
            </button>
            <button
              className="text-white focus:outline-none"
              onClick={toggleMenu}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 py-4 border-t border-slate-800">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block py-2 text-gray-300 hover:text-emerald-400 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
            {personalInfo.resumeUrl !== '#' && (
              <a
                href={personalInfo.resumeUrl}
                className="flex items-center mt-4 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md transition-colors"
                download
              >
                <Download className="w-4 h-4 mr-2" />
                Resume
              </a>
            )}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;