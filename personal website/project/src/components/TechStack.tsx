import React, { useState } from 'react';
import { techStack } from '../data/techStack';
import * as LucideIcons from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import AnimatedTitle from './AnimatedTitle';

const TechStack: React.FC = () => {
  const [filter, setFilter] = useState<string | null>(null);
  const { isDarkGreen } = useTheme();
  
  const categories = [
    { id: 'offensive', name: 'Offensive Security' },
    { id: 'defensive', name: 'Defensive Security' },
    { id: 'cloud', name: 'Cloud Security' },
    { id: 'infrastructure', name: 'Infrastructure' },
    { id: 'tools', name: 'Tools & Programming' },
  ];
  
  const filteredSkills = filter 
    ? techStack.filter(skill => skill.category === filter)
    : techStack;
    
  return (
    <section id="tech-stack" className={`py-20 transition-colors duration-300 ${isDarkGreen ? 'bg-black' : 'bg-slate-800'}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <AnimatedTitle title="Technical Skills" level="h2" disableAnimation={true} />
          <div className="w-20 h-1 bg-emerald-500 mx-auto mb-6"></div>
          <p className={`max-w-2xl mx-auto ${isDarkGreen ? 'text-white' : 'text-gray-300'}`}>
            My technical expertise spans across various domains of cybersecurity, 
            from offensive security to cloud infrastructure protection.
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() => setFilter(null)}
            className={`px-4 py-2 rounded-full text-sm transition-colors ${
              filter === null
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
            }`}
          >
            All Skills
          </button>
          
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setFilter(category.id)}
              className={`px-4 py-2 rounded-full text-sm transition-colors ${
                filter === category.id
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill, index) => {
            // @ts-ignore - Dynamic icon import
            const Icon = LucideIcons[skill.icon as keyof typeof LucideIcons];
            
            return (
              <div 
                key={index}
                className="bg-slate-900/80 backdrop-blur-sm rounded-lg p-6 shadow-lg transition-all hover:transform hover:scale-105 hover:shadow-emerald-500/10"
              >
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center">
                    {Icon && React.createElement(Icon as React.ElementType, { className: "h-5 w-5 text-emerald-500 mr-3" })}
                    <h3 className="font-semibold text-white">{skill.name}</h3>
                  </div>
                  <span className="text-sm text-emerald-400 font-mono">{skill.proficiency}%</span>
                </div>
                
                <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-emerald-500 h-full transition-all duration-1000 ease-out"
                    style={{ width: `${skill.proficiency}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TechStack;