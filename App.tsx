
import React, { useState, useCallback } from 'react';
import StarBackground from './components/StarBackground';
import Mascot from './components/Mascot';
import { generateGoodNightWish } from './services/geminiService';

const App: React.FC = () => {
  const [wish, setWish] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [audioPlayed, setAudioPlayed] = useState<boolean>(false);
  const [mascotState, setMascotState] = useState<'idle' | 'thinking' | 'happy'>('idle');

  const handleOpenEnvelope = useCallback(async () => {
    setIsOpened(true);
    setLoading(true);
    setMascotState('thinking');
    
    const newWish = await generateGoodNightWish("chị Vân");
    
    setWish(newWish);
    setLoading(false);
    setMascotState('happy');
  }, []);

  const reset = () => {
    setIsOpened(false);
    setMascotState('idle');
    setWish('');
  };

  const toggleAudio = () => {
    setAudioPlayed(!audioPlayed);
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-4 overflow-hidden text-slate-100">
      <StarBackground />

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-xl text-center">
        <Mascot state={mascotState} />

        {!isOpened ? (
          <div className="space-y-8 animate-in fade-in zoom-in duration-1000">
            <div className="space-y-2">
              <h1 className="text-5xl md:text-7xl font-handwriting text-yellow-200 drop-shadow-[0_0_15px_rgba(253,224,71,0.5)]">
                Gửi chị Vân...
              </h1>
              <p className="text-blue-200 text-lg opacity-80 font-light tracking-wide">
                Một chút bình yên dành riêng cho chị tối nay.
              </p>
            </div>
            
            <div className="relative inline-block group">
              <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 rounded-full blur opacity-40 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              <button
                onClick={handleOpenEnvelope}
                className="relative px-10 py-5 bg-slate-900 rounded-full leading-none flex items-center divide-x divide-gray-600 transform transition hover:scale-105 active:scale-95 shadow-2xl"
              >
                <span className="pr-6 text-slate-100 font-semibold text-lg">Mở phong thư bí mật</span>
                <span className="pl-6 text-yellow-400 group-hover:text-yellow-300 transition duration-200">✨</span>
              </button>
            </div>
          </div>
        ) : (
          <div className={`relative transition-all duration-1000 ${loading ? 'opacity-80 scale-95' : 'opacity-100 scale-100'}`}>
            <div className="bg-white/10 backdrop-blur-xl p-8 md:p-14 rounded-[2rem] border border-white/20 shadow-[0_0_50px_rgba(0,0,0,0.3)] space-y-8 floating">
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#1e1b4b] border border-white/20 w-20 h-20 rounded-full flex items-center justify-center text-4xl shadow-xl">
                {loading ? "🕯️" : "🌙"}
              </div>
              
              <div className="space-y-4 pt-4">
                <h2 className="text-3xl md:text-4xl font-handwriting text-yellow-300">
                  {loading ? "Đang viết điều ước..." : "Chúc Chị Ngủ Ngon"}
                </h2>

                {loading ? (
                  <div className="py-12 space-y-6">
                    <div className="flex justify-center space-x-2">
                      <div className="w-3 h-3 bg-yellow-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                      <div className="w-3 h-3 bg-yellow-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                      <div className="w-3 h-3 bg-yellow-400 rounded-full animate-bounce"></div>
                    </div>
                    <p className="text-slate-400 italic text-sm">Gió đang mang lời chúc đến...</p>
                  </div>
                ) : (
                  <div className="space-y-6 animate-in fade-in slide-in-from-top-4 duration-1000">
                    <p className="text-xl md:text-2xl leading-relaxed font-light italic text-slate-50 drop-shadow-md">
                      "{wish}"
                    </p>
                    <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent w-full"></div>
                    <p className="text-pink-300 font-handwriting text-xl">
                      Mơ những giấc mơ thật đẹp nhé chị Vân!
                    </p>
                  </div>
                )}
              </div>

              {!loading && (
                <div className="pt-4">
                  <button 
                    onClick={reset}
                    className="group flex items-center mx-auto space-x-2 text-xs text-slate-400 hover:text-yellow-200 transition-colors uppercase tracking-[0.2em]"
                  >
                    <span>Gửi lại một tia sáng khác</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Trang trí xung quanh */}
      <div className="fixed top-1/4 left-10 text-4xl opacity-20 animate-pulse pointer-events-none">⭐</div>
      <div className="fixed bottom-1/4 right-10 text-4xl opacity-20 animate-pulse delay-700 pointer-events-none">✨</div>
      <div className="fixed top-1/2 right-20 text-2xl opacity-10 animate-bounce pointer-events-none">☁️</div>

      {/* Control Audio */}
      <div className="fixed bottom-8 right-8 z-30">
        <button 
          onClick={toggleAudio}
          className={`group relative p-4 rounded-full backdrop-blur-md transition-all duration-500 ${audioPlayed ? 'bg-yellow-400 text-slate-900 scale-110 shadow-lg' : 'bg-white/5 text-slate-400 hover:bg-white/10'}`}
        >
          {audioPlayed && <span className="absolute -inset-2 bg-yellow-400 rounded-full opacity-20 animate-ping"></span>}
          {audioPlayed ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
            </svg>
          )}
        </button>
      </div>

      <div className="fixed bottom-8 left-8 z-30 flex items-center space-x-3 text-[10px] text-slate-500 font-light tracking-[0.3em] uppercase">
        <span className="w-8 h-px bg-slate-700"></span>
        <span>For Chị Vân With Love</span>
      </div>
    </div>
  );
};

export default App;
