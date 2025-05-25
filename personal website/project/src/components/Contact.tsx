import React, { useState } from 'react';
import { Send, Mail, Phone, MapPin, Linkedin, Github, Twitter, Facebook, Code } from 'lucide-react';
import { personalInfo } from '../data/personalInfo';
import emailjs from 'emailjs-com';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    emailjs.sendForm(
      'service_8tbfu3m',      // Your Service ID
      'template_5ceupqg',      // Your Template ID (from EmailJS dashboard)
      e.target as HTMLFormElement,
      'VCt1z8ArfJUd9iSEY'       // Your Public Key (from EmailJS dashboard)
    ).then(
      (result) => {
        setIsSubmitting(false);
        setSubmitted(true);
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
        setTimeout(() => setSubmitted(false), 5000);
      },
      (error) => {
        setIsSubmitting(false);
        alert('Failed to send message. Please try again.');
      }
    );
  };
  
  return (
    <section id="contact" className="py-20 bg-slate-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Get In Touch</h2>
          <div className="w-20 h-1 bg-emerald-500 mx-auto mb-6"></div>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Have a project in mind or want to discuss cybersecurity solutions? 
            I'm always open to new opportunities and challenges.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          <div className="lg:col-span-2 order-2 lg:order-1">
            <div className="bg-slate-900 p-8 rounded-lg shadow-lg h-full">
              <h3 className="text-2xl font-semibold text-white mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-slate-800 p-3 rounded-lg mr-4">
                    <Mail className="h-6 w-6 text-emerald-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Email</p>
                    <a href={`mailto:${personalInfo.email}`} className="text-white hover:text-emerald-400 transition-colors">
                      {personalInfo.email}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-slate-800 p-3 rounded-lg mr-4">
                    <Phone className="h-6 w-6 text-emerald-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Phone</p>
                    <a href={`tel:${personalInfo.phone}`} className="text-white hover:text-emerald-400 transition-colors">
                      {personalInfo.phone}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-slate-800 p-3 rounded-lg mr-4 flex items-center justify-center text-2xl">
                    <span role="img" aria-label="Vietnam Flag">🇻🇳</span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Location</p>
                    <p className="text-white">{personalInfo.location}</p>
                  </div>
                </div>

                {/* GitHub Link */}
                <div className="flex items-start">
                  <div className="bg-slate-800 p-3 rounded-lg mr-4">
                    <Github className="h-6 w-6 text-emerald-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">GitHub</p>
                    <a href="https://github.com/d0ngle8k" target="_blank" rel="noopener noreferrer" className="text-white hover:text-emerald-400 transition-colors">
                      github.com/d0ngle8k
                    </a>
                  </div>
                </div>

                {/* LeetCode Link */}
                <div className="flex items-start">
                  <div className="bg-slate-800 p-3 rounded-lg mr-4">
                    <Code className="h-6 w-6 text-emerald-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">LeetCode</p>
                    <a href="https://leetcode.com/u/d0ngle8k/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-emerald-400 transition-colors">
                      leetcode.com/u/d0ngle8k
                    </a>
                  </div>
                </div>

                {/* LinkedIn Link */}
                <div className="flex items-start">
                  <div className="bg-slate-800 p-3 rounded-lg mr-4">
                    <Linkedin className="h-6 w-6 text-emerald-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">LinkedIn</p>
                    <a href="https://www.linkedin.com/in/d0ngle8k/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-emerald-400 transition-colors">
                      linkedin.com/in/d0ngle8k
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-3 order-1 lg:order-2">
            <form onSubmit={handleSubmit} className="bg-slate-900 p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold text-white mb-6">Send a Message</h3>
              
              {submitted ? (
                <div className="bg-emerald-500/20 border border-emerald-500 text-emerald-400 p-4 rounded-lg mb-6">
                  Thank you for your message! I'll get back to you as soon as possible.
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="name" className="block text-sm text-gray-400 mb-2">Your Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        placeholder="John Doe"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm text-gray-400 mb-2">Your Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  {/* Phone Number Field */}
                  <div className="mb-6">
                    <label htmlFor="phone" className="block text-sm text-gray-400 mb-2">Your Phone Number (Optional)</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      placeholder="+1 234 567 8901"
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="subject" className="block text-sm text-gray-400 mb-2">Subject</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      placeholder="Project Inquiry"
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-sm text-gray-400 mb-2">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      placeholder="Your message here..."
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full flex items-center justify-center px-6 py-3 ${
                      isSubmitting 
                        ? 'bg-slate-700 cursor-not-allowed' 
                        : 'bg-emerald-600 hover:bg-emerald-700'
                    } text-white rounded-lg transition-colors`}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </button>
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;