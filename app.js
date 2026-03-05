import React, { useState, useRef, useEffect } from 'react';

const App = () => {
  const [currentTrack] = useState({
    title: "Dark Request Track",
    artist: "User Request - DarkTrasherNet",
    url: "https://files.catbox.moe/xwutei.mp3",
    cover: "https://i.pinimg.com/originals/11/1a/5b/111a5b487339839446387037f3944062.jpg"
  });

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    const updateProgress = () => {
      const current = (audio.currentTime / audio.duration) * 100;
      setProgress(current || 0);
    };
    audio.addEventListener('timeupdate', updateProgress);
    return () => audio.removeEventListener('timeupdate', updateProgress);
  }, []);

  const togglePlay = () => {
    if (isPlaying) { audioRef.current.pause(); } 
    else { audioRef.current.play(); }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="bg-black h-screen text-gray-300 flex flex-col font-sans overflow-hidden">
      <audio ref={audioRef} src={currentTrack.url} />
      <div className="flex flex-1 overflow-hidden">
        <aside className="w-64 bg-black p-6 flex flex-col gap-y-5 border-r border-gray-900 hidden md:flex">
          <div className="text-white text-2xl font-black italic"><span className="text-green-500">☠️</span> DARK-NET</div>
          <nav className="flex flex-col gap-5 font-bold text-sm uppercase">
            <span className="text-white cursor-pointer">🏠 Home</span>
            <span className="hover:text-white cursor-pointer">🔍 Search</span>
          </nav>
        </aside>
        <main className="flex-1 bg-gradient-to-b from-red-900 via-black to-black p-8 overflow-y-auto">
          <div className="flex flex-col md:flex-row items-end gap-8 mt-20">
            <img src={currentTrack.cover} className="w-64 h-64 shadow-2xl rounded-lg border-4 border-gray-800" alt="cover" />
            <div>
              <h1 className="text-white text-7xl font-black mb-4">{currentTrack.title}</h1>
              <p className="text-green-500 font-bold">Aroganzz-DarkTrasherNet • 2026</p>
            </div>
          </div>
          <button onClick={togglePlay} className="mt-8 bg-green-500 text-black w-16 h-16 rounded-full text-3xl shadow-xl hover:scale-110 transition">
            {isPlaying ? '⏸' : '▶️'}
          </button>
        </main>
      </div>
      <footer className="h-24 bg-[#050505] border-t border-gray-900 px-6 flex items-center justify-between">
        <div className="w-1/3 flex items-center gap-4">
          <img src={currentTrack.cover} className="w-14 h-14 rounded" alt="mini" />
          <div className="text-white text-sm font-bold">{currentTrack.title}</div>
        </div>
        <div className="w-1/3 flex flex-col items-center gap-2">
          <button onClick={togglePlay} className="text-white text-2xl">{isPlaying ? '⏸' : '▶️'}</button>
          <div className="w-full bg-gray-800 h-1.5 rounded-full">
            <div className="bg-green-500 h-full transition-all" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
        <div className="w-1/3 text-right text-green-500 font-bold animate-pulse">LIVE ⚡</div>
      </footer>
    </div>
  );
};

export default App;
