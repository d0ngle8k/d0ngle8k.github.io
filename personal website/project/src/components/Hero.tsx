import React from 'react';
import { ArrowRight, Linkedin, Github, Twitter, Shield, Facebook } from 'lucide-react';
import { personalInfo } from '../data/personalInfo';
import MatrixBackground from './MatrixBackground';

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 pb-20">
      <MatrixBackground />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="inline-block p-2 bg-emerald-500/20 rounded-lg mb-6">
            <Shield className="h-6 w-6 text-emerald-400" />
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Building a Secure <span className="text-emerald-400">Future</span>
          </h1>
          
          <h2 className="text-xl md:text-2xl text-gray-300 mb-8 font-light">
            {personalInfo.title}
          </h2>
          
          <p className="text-gray-400 text-lg mb-10 max-w-2xl leading-relaxed">
            {personalInfo.bio}
          </p>
          
          <div className="flex flex-wrap gap-4 mb-12">
            <a 
              href="#contact" 
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md transition-all duration-300 flex items-center group"
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