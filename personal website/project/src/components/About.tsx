import React, { useState } from 'react';
import { Mail, Phone, MapPin, Shield, Server, Cloud, Code } from 'lucide-react';
import { personalInfo } from '../data/personalInfo';
import { useTheme } from '../context/ThemeContext';
import AnimatedTitle from './AnimatedTitle';

const About: React.FC = () => {
  const { isDarkGreen } = useTheme();
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
    <section id="about" className={`py-20 transition-colors duration-300 ${isDarkGreen ? 'bg-black' : 'bg-slate-900'}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <AnimatedTitle title="About Me" level="h2" disableAnimation={true} />
          <div className="w-20 h-1 bg-emerald-500 mx-auto mb-12"></div>
          
          <div className="max-w-3xl mx-auto">
            <p className={`mb-8 leading-relaxed ${isDarkGreen ? 'text-emerald-500' : 'text-white'}`}>
              Every day, I immerse myself in the dynamic world of cybersecurity through hands-on practice and continuous learning. My daily routine includes solving complex challenges on LeetCode to sharpen my problem-solving skills, tackling real-world security scenarios on HackTheBox, and staying current with the latest vulnerabilities and exploits through active participation in cybersecurity forums.
            </p>
            <p className={`mb-8 leading-relaxed ${isDarkGreen ? 'text-emerald-500' : 'text-white'}`}>
              Through platforms like HackTheBox, I've developed a deep understanding of penetration testing, vulnerability assessment, and exploit development. My regular engagement with the cybersecurity community has not only enhanced my technical skills but also kept me at the forefront of emerging security threats and defense strategies.
            </p>
            <p className={`leading-relaxed ${isDarkGreen ? 'text-emerald-500' : 'text-white'}`}>
              This daily commitment to practical learning and community engagement has transformed me into a proactive security professional. I'm constantly seeking new challenges and opportunities to apply my knowledge in real-world scenarios, whether it's through CTF competitions, security research, or collaborative projects. Let's connect and explore how my hands-on experience and continuous learning mindset can contribute to your security initiatives!
            </p>
          </div>
        </div>

        <div className="mt-20">
          <AnimatedTitle title="Areas of Specialization" level="h3" disableAnimation={true} />
          
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