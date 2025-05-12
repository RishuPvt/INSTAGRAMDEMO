import React, { useState, useEffect } from 'react';
import { Heart, Gift, Cake } from 'lucide-react';
import b8 from "../public/b8.jpg"
const Hero: React.FC = () => {
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] relative">
      <div 
        className={`text-center transition-all duration-1000 transform ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          <span className="block bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 text-transparent bg-clip-text animate-gradient">
            Happy Birthday!
          </span>
        </h1>
        
        <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto my-8 rounded-full overflow-hidden border-4 border-pink-300 shadow-lg transform hover:scale-105 transition-transform duration-300">
          {/* Replace with actual image later */}
          <img 
            src={b8} 
            alt="Birthday Girl" 
            className="w-full h-full object-contain"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-pink-500/50 to-transparent"></div>
        </div>
        
        <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-2xl mx-auto">
          I know we dont talk anymore but HAPPY BIRTHDAY hope you have a good day!
        </p>
        
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <div className="flex items-center bg-white/80 backdrop-blur-sm p-3 rounded-lg shadow-md">
            <Heart className="h-6 w-6 text-pink-500 mr-2" />
            <span className="text-gray-700">Infinite Love</span>
          </div>
          <div className="flex items-center bg-white/80 backdrop-blur-sm p-3 rounded-lg shadow-md">
            <Gift className="h-6 w-6 text-purple-500 mr-2" />
            <span className="text-gray-700">Special Surprise</span>
          </div>
          <div className="flex items-center bg-white/80 backdrop-blur-sm p-3 rounded-lg shadow-md">
            <Cake className="h-6 w-6 text-yellow-500 mr-2" />
            <span className="text-gray-700">Your Special Day</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;