import React, { useEffect, useState } from 'react';

interface ConfettiPiece {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  rotation: number;
  rotationSpeed: number;
  speedX: number;
  speedY: number;
}

const Confetti: React.FC = () => {
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);
  
  // Generate confetti on mount
  useEffect(() => {
    const colors = ['#FFC0CB', '#FFD700', '#9370DB', '#FF69B4', '#E6E6FA', '#FFA07A'];
    const pieces: ConfettiPiece[] = [];
    
    for (let i = 0; i < 100; i++) {
      pieces.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * -500,
        size: Math.random() * 8 + 5,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 2,
        speedX: (Math.random() - 0.5) * 3,
        speedY: Math.random() * 3 + 2,
      });
    }
    
    setConfetti(pieces);
    
    // Animate confetti
    let animationId: number;
    let lastTime = 0;
    
    const updateConfetti = (time: number) => {
      const deltaTime = time - lastTime;
      lastTime = time;
      
      setConfetti(prev => prev.map(piece => {
        const nextY = piece.y + piece.speedY * (deltaTime / 16);
        const nextX = piece.x + piece.speedX * (deltaTime / 16);
        const nextRotation = piece.rotation + piece.rotationSpeed * (deltaTime / 16);
        
        // Reset if off screen
        if (nextY > window.innerHeight) {
          return {
            ...piece,
            y: Math.random() * -100,
            x: Math.random() * window.innerWidth
          };
        }
        
        return {
          ...piece,
          y: nextY,
          x: nextX,
          rotation: nextRotation,
        };
      }));
      
      animationId = requestAnimationFrame(updateConfetti);
    };
    
    animationId = requestAnimationFrame(updateConfetti);
    
    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);
  
  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      {confetti.map(piece => (
        <div
          key={piece.id}
          className="absolute"
          style={{
            left: `${piece.x}px`,
            top: `${piece.y}px`,
            width: `${piece.size}px`,
            height: `${piece.size}px`,
            backgroundColor: piece.color,
            transform: `rotate(${piece.rotation}deg)`,
            opacity: 0.8,
          }}
        />
      ))}
    </div>
  );
};

export default Confetti;