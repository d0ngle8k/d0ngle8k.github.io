import React, { useState } from 'react';
import { Mail, Phone, MapPin, Shield, Server, Cloud, Code } from 'lucide-react';
import { personalInfo } from '../data/personalInfo';

const About: React.FC = () => {
  const specializations = [
    {
      title: 'Offensive Security',
      description: 'Expertise in penetration testing, vulnerability assessment, and exploit development to identify security weaknesses.',
      icon: <Shield className="h-10 w-10 text-emerald-500" />
    },
    {
      title: 'Defensive Security',
      description: 'Implementing robust security controls, incident response plans, and security monitoring solutions.',
      icon: <Server className="h-10 w-10 text-emerald-500" />
    },
    {
      title: 'Cloud Security',
      description: 'Securing cloud infrastructure and applications across AWS, Azure, and other cloud platforms.',
      icon: <Cloud className="h-10 w-10 text-emerald-500" />
    },
    {
      title: 'Security Automation',
      description: 'Developing custom security tools and automating security processes for efficiency and consistency.',
      icon: <Code className="h-10 w-10 text-emerald-500" />
    }
  ];

  return (
    <section id="about" className="py-20 bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">About Me</h2>
          <div className="w-20 h-1 bg-emerald-500 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-semibold text-white mb-6">My Background</h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              As a motivated 4th-year Computer Engineering student, I am deeply passionate about cybersecurity and eager to make a real-world impact. My journey has been shaped by hands-on experience in CTF competitions, security labs, and collaborative projects with peers.
            </p>
            <p className="text-gray-300 mb-6 leading-relaxed">
              I thrive on solving complex security challenges and am always seeking opportunities to apply my knowledge in practical settings. My foundation includes network security, ethical hacking, and secure coding practices, and I am committed to continuous learning through research and experimentation.
            </p>
            <p className="text-gray-300 leading-relaxed">
              I am excited to contribute fresh perspectives and energy to a professional security team. My goal is to help build a safer digital world through ethical hacking, vulnerability research, and proactive defense—let's connect and make an impact together!
            </p>
          </div>
          
          <div className="bg-slate-800 rounded-lg p-8 shadow-lg">
            <h3 className="text-2xl font-semibold text-white mb-6">Contact Information</h3>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <Mail className="h-5 w-5 text-emerald-500 mt-1 mr-3" />
                <div>
                  <p className="text-sm text-gray-400">Email</p>
                  <a href={`mailto:${personalInfo.email}`} className="text-white hover:text-emerald-400 transition-colors">
                    {personalInfo.email}
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <Phone className="h-5 w-5 text-emerald-500 mt-1 mr-3" />
                <div>
                  <p className="text-sm text-gray-400">Phone</p>
                  <a href={`tel:${personalInfo.phone}`} className="text-white hover:text-emerald-400 transition-colors">
                    {personalInfo.phone}
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-emerald-500 mt-1 mr-3" />
                <div>
                  <p className="text-sm text-gray-400">Location</p>
                  <p className="text-white">{personalInfo.location}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20">
          <h3 className="text-2xl font-semibold text-white mb-10 text-center">Areas of Specialization</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {specializations.map((spec, index) => (
              <div key={index} className="bg-slate-800 rounded-lg p-6 shadow-lg transition-transform hover:transform hover:scale-105">
                <div className="mb-4">{spec.icon}</div>
                <h4 className="text-xl font-semibold text-white mb-3">{spec.title}</h4>
                <p className="text-gray-400">{spec.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;