import React, { useState } from 'react';
import { certificates } from '../data/certificates';
import { Award, Calendar, ExternalLink } from 'lucide-react';

const Certificates: React.FC = () => {
  const [selectedCert, setSelectedCert] = useState<number | null>(null);
  
  const handleCertClick = (id: number) => {
    setSelectedCert(selectedCert === id ? null : id);
  };
  
  return (
    <section id="certificates" className="py-20 bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Certifications</h2>
          <div className="w-20 h-1 bg-emerald-500 mx-auto mb-6"></div>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Professional certifications that validate my expertise and commitment to the cybersecurity field.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certificates.map((cert) => (
            <div 
              key={cert.id}
              className={`bg-slate-800 rounded-lg overflow-hidden shadow-lg transition-all duration-300 ${
                selectedCert === cert.id ? 'ring-2 ring-emerald-500' : 'hover:shadow-emerald-500/20'
              }`}
              onClick={() => handleCertClick(cert.id)}
            >
              <div className="h-40 bg-slate-700 relative overflow-hidden">
                <img 
                  src={cert.logo} 
                  alt={cert.issuer} 
                  className="w-full h-full object-cover opacity-50"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center space-x-2 mb-1">
                    <Award className="h-4 w-4 text-emerald-400" />
                    <span className="text-sm text-emerald-400">{cert.issuer}</span>
                  </div>
                  <h3 className="text-white font-semibold text-lg">{cert.name}</h3>
                </div>
              </div>
              
              <div className="p-5">
                <div className="flex items-center text-sm text-gray-400 mb-4">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>Issued: {cert.date}</span>
                  {cert.expires && (
                    <span className="ml-4">Expires: {cert.expires}</span>
                  )}
                </div>
                
                {selectedCert === cert.id && (
                  <div className="mt-3 pt-3 border-t border-slate-700 animate-fadeIn">
                    <p className="text-gray-300 text-sm mb-4">{cert.description}</p>
                    
                    <div className="mb-4">
                      <h4 className="text-sm text-gray-400 mb-2">Key Skills:</h4>
                      <div className="flex flex-wrap gap-2">
                        {cert.skills.map((skill, idx) => (
                          <span 
                            key={idx} 
                            className="text-xs bg-slate-700 text-emerald-400 px-2 py-1 rounded"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {cert.credentialId && (
                      <div className="text-xs text-gray-400">
                        Credential ID: {cert.credentialId}
                      </div>
                    )}
                  </div>
                )}
                
                <button className="mt-3 w-full flex items-center justify-center px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded transition-colors">
                  {selectedCert === cert.id ? 'View Less' : 'View Details'}
                  <ExternalLink className="ml-2 h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certificates;