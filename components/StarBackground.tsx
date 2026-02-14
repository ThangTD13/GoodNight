
import React, { useMemo } from 'react';
import { Star } from '../types';

const StarBackground: React.FC = () => {
  const stars = useMemo<Star[]>(() => {
    return Array.from({ length: 150 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 3 + 1}px`,
      duration: `${Math.random() * 3 + 2}s`,
    }));
  }, []);

  const shootingStars = useMemo(() => Array.from({ length: 5 }), []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-gradient-to-b from-[#020617] via-[#0f172a] to-[#1e1b4b]">
      {/* Tĩnh */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="star"
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            '--duration': star.duration,
          } as React.CSSProperties}
        />
      ))}

      {/* Sao băng */}
      <style>{`
        .shooting-star {
          position: absolute;
          width: 100px;
          height: 2px;
          background: linear-gradient(90deg, white, transparent);
          animation: shoot var(--s-duration) infinite linear;
          opacity: 0;
        }
        @keyframes shoot {
          0% { transform: translateX(0) translateY(0) rotate(-45deg); opacity: 1; }
          20% { transform: translateX(-500px) translateY(500px) rotate(-45deg); opacity: 0; }
          100% { transform: translateX(-500px) translateY(500px) rotate(-45deg); opacity: 0; }
        }
      `}</style>
      
      {shootingStars.map((_, i) => (
        <div
          key={`ss-${i}`}
          className="shooting-star"
          style={{
            top: `${Math.random() * 50}%`,
            right: `${Math.random() * 50}%`,
            '--s-duration': `${Math.random() * 5 + 5}s`,
            animationDelay: `${Math.random() * 10}s`
          } as React.CSSProperties}
        />
      ))}

      <div className="absolute top-20 right-20 w-32 h-32 rounded-full bg-yellow-100/10 blur-3xl" />
      <div className="absolute top-16 right-16 w-16 h-16 rounded-full bg-yellow-50 shadow-[0_0_80px_rgba(253,224,71,0.3)] flex items-center justify-center">
         <div className="w-12 h-12 rounded-full bg-[#020617] translate-x-3 -translate-y-2" />
      </div>
    </div>
  );
};

export default StarBackground;
