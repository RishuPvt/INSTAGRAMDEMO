import React, { useState, useEffect } from 'react';
import { Heart, Music, Image, Quote, Home } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MusicPlayer from './components/MusicPlayer';
import QuoteSection from './components/QuoteSection';
import Gallery from './components/Gallery';
import Confetti from './components/Confetti';
import FloatingElements from './components/FloatingElements';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [showConfetti, setShowConfetti] = useState(true);

  // Stop confetti after 10 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 10000);
    
    return () => clearTimeout(timer);
  }, []);

  // Navigation items
  const navItems = [
    { id: 'home', icon: <Home size={20} />, label: 'Home' },
    { id: 'gallery', icon: <Image size={20} />, label: 'Memories' },
    { id: 'quotes', icon: <Quote size={20} />, label: 'Wishes' },
    { id: 'music', icon: <Music size={20} />, label: 'Music' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-pink-100 relative overflow-hidden">
      {showConfetti && <Confetti />}
      <FloatingElements />
      
      <Navbar 
        items={navItems} 
        activeSection={activeSection} 
        setActiveSection={setActiveSection} 
      />

      <div className="container mx-auto px-4 py-8">
        {activeSection === 'home' && <Hero />}
        {activeSection === 'gallery' && <Gallery />}
        {activeSection === 'quotes' && <QuoteSection />}
        {activeSection === 'music' && <MusicPlayer />}
      </div>
    </div>
  );
}

export default App;