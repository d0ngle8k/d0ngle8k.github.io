import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import TechStack from './components/TechStack';
import Certificates from './components/Certificates';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CursorSnake from './components/CursorSnake';
import Chatbot from './components/Chatbot';
import MusicPlayer from './components/MusicPlayer';
import { Fade } from 'react-awesome-reveal';
import { useTheme } from './context/ThemeContext';
import './index.css';

function App() {
  const { isDarkGreen } = useTheme();

  // Update document title
  React.useEffect(() => {
    document.title = 'Truong Gia Thanh | Cybersecurity Professional';
  }, []);

  return (
    <div className={`min-h-screen text-white antialiased transition-colors duration-300 ${
      isDarkGreen ? 'bg-black' : 'bg-slate-900'
    }`}>
      <CursorSnake />
      <div className="relative">
        <Header />
        <main className="relative">
          <Hero />
          <Fade duration={2000}>
            <About />
          </Fade>
          <Fade duration={2000}>
            <TechStack />
          </Fade>
          <Fade duration={2000}>
            <Certificates />
          </Fade>
          <Fade duration={2000}>
            <Contact />
          </Fade>
        </main>
        <Footer />
        <Chatbot />
        <MusicPlayer />
      </div>
    </div>
  );
}

export default App;