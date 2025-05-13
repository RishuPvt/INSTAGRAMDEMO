import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX } from 'lucide-react';
import song1 from "../public/song1.mp3";
import song2 from "../public/song2.mp3";
import song3 from "../public/song3.mp3";
import song5 from "../public/song5.mp3";
import song6 from "../public/song6.mp3";




const MusicPlayer: React.FC = () => {
  // Demo song list - replace with actual songs later
  const songs = [
    { id: 1, title: "Happy Birthday", artist: "For You", src: song1 },
    { id: 2, title: "Love Song", artist: "For You", src: song2},
    { id: 3, title: "Celebration", artist: "For You", src: song3 },
    { id: 4, title: "Sweet Memories", artist: "For You", src: song5 },
    { id: 5, title: "For Us", artist: "For Us", src: song6 },

  ];

  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const animationRef = useRef<number>();

  const currentSong = songs[currentSongIndex];

  useEffect(() => {
    // Set audio duration when metadata is loaded
    const audio = audioRef.current;
    if (!audio) return;

    const setAudioData = () => {
      setDuration(audio.duration);
    };

    const updateProgress = () => {
      setCurrentTime(audio.currentTime);
      setProgress((audio.currentTime / audio.duration) * 100);
    };

    audio.addEventListener('loadedmetadata', setAudioData);
    audio.addEventListener('timeupdate', updateProgress);

    return () => {
      audio.removeEventListener('loadedmetadata', setAudioData);
      audio.removeEventListener('timeupdate', updateProgress);
      cancelAnimationFrame(animationRef.current!);
    };
  }, [currentSongIndex]);

  useEffect(() => {
    // Handle play/pause state
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play();
    } else {
      audio.pause();
    }
  }, [isPlaying, currentSongIndex]);

  useEffect(() => {
    // Handle volume changes
    const audio = audioRef.current;
    if (!audio) return;
    
    audio.volume = isMuted ? 0 : volume;
  }, [volume, isMuted]);

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;
    
    const value = parseFloat(e.target.value);
    const newTime = (value / 100) * duration;
    audio.currentTime = newTime;
    setProgress(value);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setVolume(value);
    if (value > 0 && isMuted) {
      setIsMuted(false);
    }
  };

  const playNextSong = () => {
    setCurrentSongIndex((prevIndex) => 
      prevIndex === songs.length - 1 ? 0 : prevIndex + 1
    );
    if (!isPlaying) setIsPlaying(true);
  };

  const playPrevSong = () => {
    setCurrentSongIndex((prevIndex) => 
      prevIndex === 0 ? songs.length - 1 : prevIndex - 1
    );
    if (!isPlaying) setIsPlaying(true);
  };

  const handleSongEnd = () => {
    playNextSong();
  };

  return (
    <div className="flex flex-col items-center py-12 animate-fadeIn">
      <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
        Our Special Playlist
      </h2>
      
      <div className="w-full max-w-md bg-white/90 backdrop-blur-md rounded-xl shadow-xl p-6 mb-8">
        <div className="flex items-center justify-center mb-6">
          <div className="w-40 h-40 bg-gradient-to-br from-pink-400 to-purple-500 rounded-lg shadow-lg flex items-center justify-center overflow-hidden">
            <div className="w-36 h-36 bg-white rounded-full flex items-center justify-center animate-spin-slow">
              <div className="w-4 h-4 bg-gray-800 rounded-full"></div>
            </div>
          </div>
        </div>
        
        <div className="text-center mb-4">
          <h3 className="text-xl font-semibold text-gray-800">{currentSong.title}</h3>
          <p className="text-gray-600">{currentSong.artist}</p>
        </div>
        
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-500 mb-1">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
          <input 
            type="range" 
            min="0" 
            max="100" 
            value={progress} 
            onChange={handleProgressChange}
            className="w-full h-2 rounded-full bg-gray-200 appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #ec4899 ${progress}%, #e5e7eb ${progress}%)`,
            }}
          />
        </div>
        
        <div className="flex items-center justify-center space-x-6">
          <button 
            onClick={playPrevSong}
            className="text-gray-700 hover:text-pink-500 transition-colors"
          >
            <SkipBack size={24} />
          </button>
          
          <button 
            onClick={togglePlayPause}
            className="w-12 h-12 flex items-center justify-center bg-pink-500 hover:bg-pink-600 text-white rounded-full transition-colors"
          >
            {isPlaying ? <Pause size={24} /> : <Play size={24} />}
          </button>
          
          <button 
            onClick={playNextSong}
            className="text-gray-700 hover:text-pink-500 transition-colors"
          >
            <SkipForward size={24} />
          </button>
        </div>
        
        <div className="flex items-center mt-6">
          <button 
            onClick={toggleMute}
            className="text-gray-700 hover:text-pink-500 transition-colors mr-2"
          >
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </button>
          
          <input 
            type="range" 
            min="0" 
            max="1" 
            step="0.01" 
            value={volume} 
            onChange={handleVolumeChange}
            className="w-full h-2 rounded-full bg-gray-200 appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #ec4899 ${volume * 100}%, #e5e7eb ${volume * 100}%)`,
            }}
          />
        </div>
      </div>
      
      <div className="w-full max-w-md">
        <h3 className="text-lg font-semibold mb-3 text-gray-700">Song List</h3>
        <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-md divide-y divide-gray-100">
          {songs.map((song, index) => (
            <button 
              key={song.id}
              onClick={() => {
                setCurrentSongIndex(index);
                setIsPlaying(true);
              }}
              className={`w-full flex items-center p-3 hover:bg-pink-50 transition-colors ${
                index === currentSongIndex ? 'bg-pink-50 text-pink-600' : 'text-gray-700'
              }`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                index === currentSongIndex ? 'bg-pink-100' : 'bg-gray-100'
              }`}>
                {index === currentSongIndex && isPlaying ? (
                  <div className="flex space-x-1">
                    <div className="w-1 h-4 bg-pink-500 animate-music-bar"></div>
                    <div className="w-1 h-4 bg-pink-500 animate-music-bar-2"></div>
                    <div className="w-1 h-4 bg-pink-500 animate-music-bar-3"></div>
                  </div>
                ) : (
                  <Play size={16} className={index === currentSongIndex ? 'text-pink-500' : 'text-gray-500'} />
                )}
              </div>
              <div className="text-left">
                <div className="font-medium">{song.title}</div>
                <div className="text-sm text-gray-500">{song.artist}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
      
      <audio 
        ref={audioRef} 
        src={currentSong.src} 
        onEnded={handleSongEnd} 
      />
    </div>
  );
};

export default MusicPlayer;