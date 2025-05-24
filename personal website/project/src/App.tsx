import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import TechStack from './components/TechStack';
import Certificates from './components/Certificates';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './index.css';

function App() {
  // Update document title
  React.useEffect(() => {
    document.title = 'Truong Gia Thanh | Cybersecurity Professional';
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-white antialiased">
      <div className="relative">
        <Header />
        <main className="relative">
          <Hero />
          <About />
          <TechStack />
          <Certificates />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;