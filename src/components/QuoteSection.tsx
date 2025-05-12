import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import reel1 from "../public/reel1.mp4";
import reel2 from "../public/reel2.mp4";

const QuoteSection: React.FC = () => {
  const quotes = [
    {
      id: 1,
      text: "Har roj tumse baat krne ka zariya Dhundhta hoo , Haar raat chand se sirf teri hi baat krta hoon, pata hai kabhi miloge nhi tum , phir bhi tere aane ka intezar krta hoon",
      author: "Me"
    },
    {
      id: 2,
      text: "On your special day, I want you to smile",
      author: "Me"
    },
    {
      id: 3,
      text: "Yes , I know we are not together anymore but we are stranger with memory",
      author: "Me"
    },
    {
      id: 4,
      text: "Your smile lights up my world. May your birthday be as bright and beautiful as you are.",
      author: "Me"
    },
    {
      id: 5,
      text: "HAPPY BIRHTDAY! I HOPE YOU ALWAYS REMEBER ME , ab ye ladka kabhi tumhe disrespect nhi kryega finally tumhe wo sb milega jo syd tum chhate thi ! GOOD BYE",
      author: "Me"
    }
  ];

  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);
  const [currentReel, setCurrentReel] = useState(0);
  const reels = [reel1, reel2];

  const goToNextQuote = () => {
    setFadeIn(false);
    setTimeout(() => {
      setCurrentQuoteIndex((prevIndex) => 
        prevIndex === quotes.length - 1 ? 0 : prevIndex + 1
      );
      setFadeIn(true);
    }, 500);
  };

  const goToPrevQuote = () => {
    setFadeIn(false);
    setTimeout(() => {
      setCurrentQuoteIndex((prevIndex) => 
        prevIndex === 0 ? quotes.length - 1 : prevIndex - 1
      );
      setFadeIn(true);
    }, 500);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      goToNextQuote();
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const swapReel = () => {
    setCurrentReel((prev) => (prev === 0 ? 1 : 0));
  };

  return (
    <div className="py-12 flex flex-col items-center justify-center min-h-[80vh]">
      <h2 className="text-3xl font-bold mb-12 text-center bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
        Birthday Wishes
      </h2>

      <div className="relative w-full max-w-2xl">
        <div className={`bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-8 md:p-12 transition-opacity duration-500 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
          <div className="absolute top-0 left-0 transform -translate-x-4 -translate-y-4">
            <span className="text-6xl text-pink-300">"</span>
          </div>

          <blockquote className="text-xl md:text-2xl text-gray-700 text-center mb-6 relative z-10">
            {quotes[currentQuoteIndex].text}
          </blockquote>

          <div className="text-right">
            <p className="text-gray-600 italic">— {quotes[currentQuoteIndex].author}</p>
          </div>
        </div>

        <div className="absolute -bottom-5 right-5 flex space-x-3">
          <button 
            onClick={goToPrevQuote}
            className="bg-white w-10 h-10 rounded-full shadow-md flex items-center justify-center text-gray-700 hover:text-pink-500 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <button 
            onClick={goToNextQuote}
            className="bg-white w-10 h-10 rounded-full shadow-md flex items-center justify-center text-gray-700 hover:text-pink-500 transition-colors"
          >
            <ArrowRight size={20} />
          </button>
        </div>
      </div>

      <div className="mt-16">
        <div className="flex flex-wrap justify-center gap-3">
          {quotes.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setFadeIn(false);
                setTimeout(() => {
                  setCurrentQuoteIndex(index);
                  setFadeIn(true);
                }, 500);
              }}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentQuoteIndex 
                  ? 'bg-pink-500 scale-125' 
                  : 'bg-gray-300 hover:bg-pink-300'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="mt-16 w-full max-w-md flex flex-col items-center">
        <h3 className="text-2xl font-semibold text-center text-pink-500 mb-4">Memory Reel</h3>
        <video
          src={reels[currentReel]}
          controls
          className="rounded-lg shadow-md w-full h-64 object-cover"
        />
        <button
          onClick={swapReel}
          className="mt-4 px-4 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition"
        >
          Swap Reel
        </button>
      </div>
    </div>
  );
};

export default QuoteSection;
