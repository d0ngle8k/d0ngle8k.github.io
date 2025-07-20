import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Music, AlertTriangle } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { musicTracks, Track } from '../data/musicTracks';

const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { isDarkGreen } = useTheme();

  const currentTrack = musicTracks[currentTrackIndex];

  // --- Smooth open/close animation ---
  const [boxVisible, setBoxVisible] = useState(false);
  useEffect(() => {
    if (showPlayer) {
      setBoxVisible(true);
    } else {
      const timeout = setTimeout(() => setBoxVisible(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [showPlayer]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  // --- Auto play next song when ended ---
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => {
      setError(null);
      setCurrentTrackIndex(prev => (prev === musicTracks.length - 1 ? 0 : prev + 1));
      setIsPlaying(true);
    };
    const handleError = () => {
      setError('Cannot play this song. Skipping to next...');
      setTimeout(() => {
        setError(null);
        setCurrentTrackIndex(prev => (prev === musicTracks.length - 1 ? 0 : prev + 1));
        setIsPlaying(true);
      }, 1500);
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
    };
  }, [currentTrackIndex]);

  // --- Play/pause logic ---
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // --- Previous/Next logic ---
  const handlePrevious = () => {
    setCurrentTrackIndex(prev => prev === 0 ? musicTracks.length - 1 : prev - 1);
    setIsPlaying(true);
    setError(null);
  };
  const handleNext = () => {
    setCurrentTrackIndex(prev => prev === musicTracks.length - 1 ? 0 : prev + 1);
    setIsPlaying(true);
    setError(null);
  };

  // --- Mute/volume/seek logic ---
  const toggleMute = () => setIsMuted(!isMuted);
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (newVolume === 0) setIsMuted(true);
    else if (isMuted) setIsMuted(false);
  };
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // --- Click track: set and autoplay ---
  const handleTrackClick = (index: number, e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setCurrentTrackIndex(index);
    setIsPlaying(true);
    setError(null);
  };

  // --- Play audio when track changes and isPlaying is true ---
  useEffect(() => {
    if (isPlaying && audioRef.current) {
      audioRef.current.load();
      audioRef.current.play().catch(() => {});
    }
  }, [currentTrackIndex, isPlaying]);

  // --- Check browser support for m4a/mp3 ---
  const canPlayType = (type: string) => {
    if (!audioRef.current) return false;
    return !!audioRef.current.canPlayType(type);
  };

  return (
    <>
      {/* Floating Music Button */}
      <button
        onClick={() => setShowPlayer(!showPlayer)}
        className={`fixed bottom-4 left-4 z-50 p-3 rounded-full transition-all duration-300 ${
          isDarkGreen 
            ? 'bg-emerald-800 hover:bg-emerald-700 text-emerald-400' 
            : 'bg-slate-800 hover:bg-slate-700 text-gray-300'
        } shadow-lg hover:shadow-xl`}
        title="Music Player"
      >
        <Music className="h-6 w-6" />
      </button>

      {/* Music Player Panel with smooth animation */}
      {boxVisible && (
        <div
          className={`fixed bottom-16 left-4 z-50 w-80 p-4 rounded-lg shadow-2xl border transition-all duration-300
            ${isDarkGreen ? 'bg-black border-emerald-600' : 'bg-slate-900 border-slate-700'}
            ${showPlayer ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto' : 'opacity-0 translate-y-4 scale-95 pointer-events-none'}`}
          style={{
            transitionProperty: 'opacity, transform',
          }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className={`font-semibold ${isDarkGreen ? 'text-emerald-400' : 'text-white'}`}>Now Playing</h3>
            <button
              onClick={() => setShowPlayer(false)}
              className={`p-1 rounded hover:bg-slate-800 ${isDarkGreen ? 'text-emerald-400' : 'text-gray-400'}`}
              aria-label="Close music player"
            >
              ×
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="flex items-center mb-4 p-2 bg-red-100 text-red-700 rounded">
              <AlertTriangle className="h-4 w-4 mr-2" />
              <span>{error}</span>
            </div>
          )}

          {/* Track Info */}
          <div className="mb-4">
            <p className={`font-medium ${isDarkGreen ? 'text-emerald-300' : 'text-white'}`}>{currentTrack.title}</p>
            <p className={`text-sm ${isDarkGreen ? 'text-emerald-500' : 'text-gray-400'}`}>{currentTrack.artist}</p>
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <input
              type="range"
              min="0"
              max={duration || 0}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
              aria-label="Seek through track"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center space-x-4 mb-4">
            <button
              onClick={handlePrevious}
              className={`p-2 rounded-full hover:bg-slate-800 transition-colors ${isDarkGreen ? 'text-emerald-400' : 'text-gray-400'}`}
              aria-label="Previous track"
            >
              <SkipBack className="h-5 w-5" />
            </button>
            <button
              onClick={togglePlay}
              className={`p-3 rounded-full transition-colors ${isPlaying 
                ? (isDarkGreen ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-emerald-600 hover:bg-emerald-700')
                : (isDarkGreen ? 'bg-emerald-800 hover:bg-emerald-700' : 'bg-slate-700 hover:bg-slate-600')
              } text-white`}
            >
              {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
            </button>
            <button
              onClick={handleNext}
              className={`p-2 rounded-full hover:bg-slate-800 transition-colors ${isDarkGreen ? 'text-emerald-400' : 'text-gray-400'}`}
              aria-label="Next track"
            >
              <SkipForward className="h-5 w-5" />
            </button>
          </div>

          {/* Volume Control */}
          <div className="flex items-center space-x-2">
            <button
              onClick={toggleMute}
              className={`p-1 rounded hover:bg-slate-800 transition-colors ${isDarkGreen ? 'text-emerald-400' : 'text-gray-400'}`}
            >
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="flex-1 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer slider"
              aria-label="Volume control"
            />
          </div>

          {/* Track List */}
          <div className="mt-4 max-h-32 overflow-y-auto">
            {musicTracks.map((track, index) => (
              <button
                key={track.id}
                onClick={e => handleTrackClick(index, e)}
                className={`w-full text-left p-2 rounded text-sm transition-colors ${
                  index === currentTrackIndex
                    ? (isDarkGreen ? 'bg-emerald-800 text-emerald-300' : 'bg-slate-800 text-white')
                    : (isDarkGreen ? 'text-emerald-500 hover:bg-emerald-800/50' : 'text-gray-400 hover:bg-slate-800')
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="truncate">{track.title}</span>
                  <span className="text-xs">{track.duration}</span>
                </div>
                <div className={`text-xs ${isDarkGreen ? 'text-emerald-600' : 'text-gray-500'}`}>{track.artist}</div>
              </button>
            ))}
          </div>
          {/* Browser support warning */}
          {audioRef.current && !audioRef.current.canPlayType('audio/mp4') && (
            <div className="mt-2 p-2 bg-yellow-100 text-yellow-800 rounded flex items-center">
              <AlertTriangle className="h-4 w-4 mr-2" />
              <span>Your browser may not support .m4a files. For best compatibility, use .mp3 files.</span>
            </div>
          )}
        </div>
      )}

      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        preload="metadata"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onLoadedData={() => {
          if (audioRef.current) {
            setDuration(audioRef.current.duration);
          }
        }}
        onError={() => setError('Cannot play this song. Skipping to next...')}
        controls={false}
        style={{ display: 'none' }} // Hide the audio element from the UI
      >
        <source src={currentTrack.url} type="audio/mp3" />
        Your browser does not support the audio element.
      </audio>

      {/* Custom Slider Styles */}
      <style>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 12px;
          width: 12px;
          border-radius: 50%;
          background: ${isDarkGreen ? '#10b981' : '#059669'};
          cursor: pointer;
        }
        
        .slider::-moz-range-thumb {
          height: 12px;
          width: 12px;
          border-radius: 50%;
          background: ${isDarkGreen ? '#10b981' : '#059669'};
          cursor: pointer;
          border: none;
        }
      `}</style>
    </>
  );
};

export default MusicPlayer; 