import React, { useEffect, useState } from 'react';
import { Heart, Star, CakeSlice } from 'lucide-react';

interface FloatingElement {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  type: 'heart' | 'star' | 'cake';
  speedX: number;
  speedY: number;
  rotation: number;
  rotationSpeed: number;
}

const FloatingElements: React.FC = () => {
  const [elements, setElements] = useState<FloatingElement[]>([]);
  
  useEffect(() => {
    const elementTypes: ('heart' | 'star' | 'cake')[] = ['heart', 'star', 'cake'];
    const newElements: FloatingElement[] = [];
    
    for (let i = 0; i < 15; i++) {
      newElements.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 20 + 10,
        opacity: Math.random() * 0.5 + 0.2,
        type: elementTypes[Math.floor(Math.random() * elementTypes.length)],
        speedX: (Math.random() - 0.5) * 0.2,
        speedY: (Math.random() - 0.5) * 0.2,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 0.5,
      });
    }
    
    setElements(newElements);
    
    let animationId: number;
    
    const animateElements = () => {
      setElements(prev => prev.map(element => {
        let newX = element.x + element.speedX;
        let newY = element.y + element.speedY;
        
        // Bounce off edges
        if (newX < 0 || newX > 100) {
          element.speedX *= -1;
          newX = element.x + element.speedX;
        }
        
        if (newY < 0 || newY > 100) {
          element.speedY *= -1;
          newY = element.y + element.speedY;
        }
        
        return {
          ...element,
          x: newX,
          y: newY,
          rotation: element.rotation + element.rotationSpeed,
        };
      }));
      
      animationId = requestAnimationFrame(animateElements);
    };
    
    animationId = requestAnimationFrame(animateElements);
    
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);
  
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {elements.map(element => (
        <div
          key={element.id}
          className="absolute transform transition-transform"
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
            opacity: element.opacity,
            transform: `rotate(${element.rotation}deg)`,
          }}
        >
          {element.type === 'heart' && (
            <Heart 
              size={element.size} 
              className="text-pink-400 fill-pink-400" 
            />
          )}
          {element.type === 'star' && (
            <Star 
              size={element.size} 
              className="text-yellow-400 fill-yellow-400" 
            />
          )}
          {element.type === 'cake' && (
            <CakeSlice 
              size={element.size} 
              className="text-purple-400 fill-purple-400" 
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default FloatingElements;