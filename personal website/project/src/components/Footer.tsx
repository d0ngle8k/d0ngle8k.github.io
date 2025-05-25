import React from 'react';
import { Shield } from 'lucide-react';
import { personalInfo } from '../data/personalInfo';
import { useTheme } from '../context/ThemeContext';

const Footer: React.FC = () => {
  const { isDarkGreen } = useTheme();
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className={`transition-colors duration-300 ${isDarkGreen ? 'bg-black' : 'bg-slate-900'} border-t border-slate-800`}>
      <div className="container mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-6 md:mb-0">
            <Shield className="h-8 w-8 text-emerald-500 mr-3" />
            <span className="text-xl font-bold text-white">{personalInfo.name}</span>
          </div>
          
          <nav className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-6 md:mb-0">
            <a href="#home" className="text-gray-400 hover:text-emerald-400 transition-colors">Home</a>
            <a href="#about" className="text-gray-400 hover:text-emerald-400 transition-colors">About</a>
            <a href="#tech-stack" className="text-gray-400 hover:text-emerald-400 transition-colors">Tech Stack</a>
            <a href="#certificates" className="text-gray-400 hover:text-emerald-400 transition-colors">Certificates</a>
            <a href="#contact" className="text-gray-400 hover:text-emerald-400 transition-colors">Contact</a>
          </nav>
        </div>
        
        <div className="border-t border-slate-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © {currentYear} {personalInfo.name}. All rights reserved.
          </p>
          
          <p className="text-gray-500 text-sm">
            Securing digital frontiers, one system at a time.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;