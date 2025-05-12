import React, { useState } from 'react';
import { X } from 'lucide-react';
import b1 from "../public/b1.jpg"
import b2 from "../public/b2.jpg"
import b3 from "../public/b3.jpg"
import b4 from "../public/b4.jpg"
import b5 from "../public/b5.jpg"
import b6 from "../public/b7.jpg"


const Gallery: React.FC = () => {
  // Sample images - replace with actual memories later
  const images = [
    {
      id: 1,
      src: b1,
      alt: "Memory 1",
      caption: "Our funny VC"
    },
    {
      id: 2,
      src: b2,
      alt: "Memory 2",
      caption: "your birthday"
    },
    {
      id: 3,
      src: b3,
            alt: "Memory 3",
      caption: "first hug"
    },
    {
      id: 4,
      src: b4,
      alt: "Memory 4",
      caption: "Coffee date"
    },
    {
      id: 5,
      src: b5,
      alt: "Memory 5",
      caption: "first pic"
    },
    {
      id: 6,
      src: b6,
      alt: "Memory 6",
      caption: "preety you"
    }
  ];

  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setSelectedImage(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const goToNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImage === null) return;
    setSelectedImage((prev) => (prev === images.length - 1 ? 0 : (prev || 0) + 1));
  };

  const goToPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImage === null) return;
    setSelectedImage((prev) => (prev === 0 ? images.length - 1 : (prev || 0) - 1));
  };

  return (
    <div className="py-12 animate-fadeIn">
      <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
        Our Memories Together
       <span className='flex text-2xl font-bold mb-8  text-center'>click on image</span>
      </h2>
      
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((image, index) => (
          <div 
            key={image.id}
            className="group relative overflow-hidden rounded-lg shadow-md cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            onClick={() => openLightbox(index)}
          >
            <div className="aspect-w-4 aspect-h-3 w-full">
              <img 
                src={image.src} 
                alt={image.alt} 
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
              <p className="text-white font-medium">{image.caption}</p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Lightbox */}
      {selectedImage !== null && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button 
            className="absolute top-4 right-4 text-white hover:text-pink-400 transition-colors"
            onClick={closeLightbox}
          >
            <X size={30} />
          </button>
          
          <div 
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
            onClick={goToPrev}
          >
            <span className="text-2xl">&lsaquo;</span>
          </div>
          
          <div className="max-w-4xl max-h-[80vh]">
            <img 
              src={images[selectedImage].src} 
              alt={images[selectedImage].alt} 
              className="max-w-full max-h-[70vh] object-contain"
            />
            <div className="text-center text-white mt-4">
              <p className="text-xl font-medium">{images[selectedImage].caption}</p>
            </div>
          </div>
          
          <div 
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
            onClick={goToNext}
          >
            <span className="text-2xl">&rsaquo;</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;