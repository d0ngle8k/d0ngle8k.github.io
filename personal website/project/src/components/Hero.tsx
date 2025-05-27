import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Linkedin, Github, Twitter, Shield, Facebook } from 'lucide-react';
import { personalInfo } from '../data/personalInfo';
import MatrixBackground from './MatrixBackground';
import { useTheme } from '../context/ThemeContext';

const Hero: React.FC = () => {
  const fullTitle = "Building a Secure Future";

  const [displayedTitle, setDisplayedTitle] = useState(''); // Start with an empty string

  const isMounted = useRef(true);
  const { isDarkGreen } = useTheme();

  useEffect(() => {
    isMounted.current = true;
    let index = 0;
    let isDeleting = false;

    const type = () => {
      if (!isMounted.current) return;

      const currentText = fullTitle;

      const textToDisplay = isDeleting ? currentText.slice(0, index--) : currentText.slice(0, index++);
      setDisplayedTitle(textToDisplay);

      let delay = 0;
      if (!isDeleting && index > currentText.length) {
        // Text is fully typed, now pause for 2 seconds
        isDeleting = true;
        delay = 2000; // 2 second pause
      } else if (isDeleting && index < 0) {
        // Text is fully deleted, pause before typing again
        isDeleting = false;
        index = 0;
        delay = 500; // Pause before starting to type again
      } else {
        // Typing or deleting
        delay = isDeleting ? 100 : 50; // Deleting is slightly faster than typing
      }

      setTimeout(type, delay);
    };

    type();

    return () => {
      isMounted.current = false; // Cleanup on unmount
    };
  }, [fullTitle]); // Add fullTitle as a dependency

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 pb-20">
      <MatrixBackground />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto">


          <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 ${isDarkGreen ? 'text-emerald-700' : 'text-emerald-500'}`}>
            {displayedTitle}
          </h1>

          <h2 className={`text-xl md:text-2xl mb-8 font-light transition-colors duration-300 ${isDarkGreen ? 'text-emerald-400' : 'text-gray-300'}`}>
            {personalInfo.title}
          </h2>

          <p className={`text-lg mb-10 max-w-2xl leading-relaxed transition-colors duration-300 ${isDarkGreen ? 'text-emerald-500' : 'text-gray-400'}`}>
            {personalInfo.bio}
          </p>

          <div className="flex flex-wrap gap-4 mb-12">
            <a 
              href="#contact" 
              className={`px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md transition-all duration-300 flex items-center group`}
            >
              Let's Connect
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </a>
            
            {personalInfo.resumeUrl !== '#' && (
              <a 
                href={personalInfo.resumeUrl} 
                className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-md transition-all duration-300"
                download
              >
                View Resume
              </a>
            )}
          </div>
          
          <div className="flex space-x-4">
            {personalInfo.socialLinks.linkedin && (
              <a 
                href={personalInfo.socialLinks.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 bg-gray-800 hover:bg-gray-700 rounded-full text-gray-400 hover:text-white transition-colors"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            )}
            
            {personalInfo.socialLinks.github && (
              <a 
                href={personalInfo.socialLinks.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 bg-gray-800 hover:bg-gray-700 rounded-full text-gray-400 hover:text-white transition-colors"
                aria-label="GitHub Profile"
              >
                <Github className="h-5 w-5" />
              </a>
            )}
            
            {personalInfo.socialLinks.twitter && (
              <a 
                href={personalInfo.socialLinks.twitter} 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 bg-gray-800 hover:bg-gray-700 rounded-full text-gray-400 hover:text-white transition-colors"
                aria-label="Twitter Profile"
              >
                <Twitter className="h-5 w-5" />
              </a>
            )}
            
            {personalInfo.socialLinks.facebook && (
              <a 
                href={personalInfo.socialLinks.facebook} 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 bg-gray-800 hover:bg-gray-700 rounded-full text-gray-400 hover:text-white transition-colors"
                aria-label="Facebook Profile"
              >
                <Facebook className="h-5 w-5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;