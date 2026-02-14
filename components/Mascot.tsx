
import React from 'react';

interface MascotProps {
  state: 'idle' | 'thinking' | 'happy';
}

const Mascot: React.FC<MascotProps> = ({ state }) => {
  return (
    <div className="relative w-32 h-32 mx-auto mb-4 transition-all duration-500 transform hover:scale-110">
      {/* Glow Effect */}
      <div className={`absolute inset-0 bg-yellow-200/20 blur-2xl rounded-full animate-pulse ${state === 'thinking' ? 'scale-150' : 'scale-100'}`} />
      
      <svg viewBox="0 0 200 200" className="relative z-10 w-full h-full drop-shadow-2xl">
        {/* Tai mèo */}
        <path d="M50 80 L30 40 L70 60 Z" fill="#FDE047" className="animate-bounce" style={{ animationDuration: '3s' }} />
        <path d="M150 80 L170 40 L130 60 Z" fill="#FDE047" className="animate-bounce" style={{ animationDuration: '3.5s' }} />
        
        {/* Mặt mèo */}
        <circle cx="100" cy="100" r="60" fill="white" />
        
        {/* Mắt */}
        {state === 'idle' && (
          <>
            <path d="M75 100 Q85 90 95 100" stroke="#1E293B" strokeWidth="4" fill="none" />
            <path d="M105 100 Q115 90 125 100" stroke="#1E293B" strokeWidth="4" fill="none" />
          </>
        )}
        {state === 'thinking' && (
          <>
            <circle cx="85" cy="100" r="5" fill="#1E293B" className="animate-ping" />
            <circle cx="115" cy="100" r="5" fill="#1E293B" className="animate-ping" />
          </>
        )}
        {state === 'happy' && (
          <>
            <path d="M75 105 Q85 115 95 105" stroke="#F472B6" strokeWidth="4" fill="none" />
            <path d="M105 105 Q115 115 125 105" stroke="#F472B6" strokeWidth="4" fill="none" />
          </>
        )}

        {/* Mũi & Miệng */}
        <circle cx="100" cy="115" r="3" fill="#F472B6" />
        <path d="M90 125 Q100 135 110 125" stroke="#1E293B" strokeWidth="2" fill="none" />
        
        {/* Má hồng */}
        <circle cx="65" cy="115" r="8" fill="#FFD1D1" opacity="0.6" />
        <circle cx="135" cy="115" r="8" fill="#FFD1D1" opacity="0.6" />

        {/* Trăng khuyết trên trán */}
        <path d="M95 65 Q100 60 105 65 Q100 75 95 65" fill="#FDE047" />
      </svg>
      
      {/* Bong bóng thoại mini */}
      <div className="absolute -top-4 -right-4 bg-white text-slate-900 text-[10px] px-2 py-1 rounded-full font-bold shadow-lg animate-bounce">
        {state === 'idle' && "Zzz..."}
        {state === 'thinking' && "Mơ nè..."}
        {state === 'happy' && "Ngủ ngon nha!"}
      </div>
    </div>
  );
};

export default Mascot;
