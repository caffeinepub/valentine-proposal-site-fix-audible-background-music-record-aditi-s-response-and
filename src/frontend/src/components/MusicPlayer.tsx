import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Volume2, VolumeX, Volume1, Play, Pause } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Alert, AlertDescription } from '@/components/ui/alert';

const USER_LICENSED_TRACK = '/assets/audio/user-licensed-track.mp3';
const FALLBACK_TRACK = '/assets/audio/romantic-instrumental.mp3';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [audioSource, setAudioSource] = useState<string>(FALLBACK_TRACK);
  const [showAutoplayPrompt, setShowAutoplayPrompt] = useState(false);
  const [isCheckingSource, setIsCheckingSource] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Check if user-provided track exists
    const checkAudioSource = async () => {
      try {
        const response = await fetch(USER_LICENSED_TRACK, { method: 'HEAD' });
        if (response.ok) {
          setAudioSource(USER_LICENSED_TRACK);
        }
      } catch (error) {
        // Use fallback
        setAudioSource(FALLBACK_TRACK);
      } finally {
        setIsCheckingSource(false);
      }
    };

    checkAudioSource();
  }, []);

  useEffect(() => {
    if (isCheckingSource) return;

    // Create audio element with proper initial volume
    audioRef.current = new Audio(audioSource);
    audioRef.current.loop = true;
    audioRef.current.volume = volume;

    // Attempt to auto-play
    const attemptAutoPlay = async () => {
      if (!audioRef.current) return;
      
      try {
        await audioRef.current.play();
        setIsPlaying(true);
        setShowAutoplayPrompt(false);
      } catch (error) {
        // Autoplay blocked by browser - show prompt
        setShowAutoplayPrompt(true);
        setIsPlaying(false);
        console.log('Autoplay blocked. User interaction required.');
      }
    };

    // Small delay to ensure DOM is ready
    const timer = setTimeout(attemptAutoPlay, 500);

    return () => {
      clearTimeout(timer);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [audioSource, isCheckingSource, volume]);

  const toggleMusic = async () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      try {
        // Ensure volume is set before playing
        audioRef.current.volume = volume;
        await audioRef.current.play();
        setIsPlaying(true);
        setShowAutoplayPrompt(false);
      } catch (error) {
        console.log('Audio playback failed:', error);
        setShowAutoplayPrompt(true);
      }
    }
  };

  const handleVolumeChange = (newVolume: number[]) => {
    const vol = newVolume[0];
    setVolume(vol);
    if (audioRef.current) {
      audioRef.current.volume = vol;
    }
  };

  const getVolumeIcon = () => {
    if (!isPlaying || volume === 0) return VolumeX;
    if (volume < 0.5) return Volume1;
    return Volume2;
  };

  const VolumeIcon = getVolumeIcon();

  return (
    <>
      {/* Autoplay Prompt */}
      {showAutoplayPrompt && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 max-w-md w-full px-4">
          <Alert className="bg-white/95 dark:bg-rose-950/95 backdrop-blur-sm border-2 border-rose-300 dark:border-rose-700 shadow-xl">
            <AlertDescription className="flex items-center justify-between gap-4">
              <span className="text-rose-900 dark:text-rose-100 font-medium">
                Click Play to start the romantic music 🎵
              </span>
              <Button
                onClick={toggleMusic}
                size="sm"
                className="bg-rose-600 hover:bg-rose-700 text-white shrink-0"
              >
                <Play className="w-4 h-4 mr-2" />
                Play
              </Button>
            </AlertDescription>
          </Alert>
        </div>
      )}

      {/* Music Player Controls */}
      <div className="fixed top-6 right-6 z-50 flex gap-3">
        {/* Play/Pause Button - Always visible */}
        <Button
          onClick={toggleMusic}
          size="icon"
          className="w-12 h-12 rounded-full bg-white/90 dark:bg-rose-950/90 backdrop-blur-sm border-2 border-rose-300 dark:border-rose-700 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900 shadow-lg hover:shadow-xl transition-all duration-300"
          aria-label={isPlaying ? 'Pause music' : 'Play music'}
        >
          {isPlaying ? (
            <Pause className="w-5 h-5" />
          ) : (
            <Play className="w-5 h-5" />
          )}
        </Button>

        {/* Volume Control Popover */}
        <Popover>
          <PopoverTrigger asChild>
            <Button
              size="icon"
              variant="outline"
              className="w-12 h-12 rounded-full bg-white/90 dark:bg-rose-950/90 backdrop-blur-sm border-2 border-rose-300 dark:border-rose-700 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900 shadow-lg hover:shadow-xl transition-all duration-300"
              aria-label="Volume controls"
            >
              <VolumeIcon className="w-5 h-5" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-64 bg-white/95 dark:bg-rose-950/95 backdrop-blur-sm border-2 border-rose-300 dark:border-rose-700">
            <div className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium text-sm text-rose-900 dark:text-rose-100">
                  Romantic Melody
                </h4>
                <p className="text-xs text-rose-700 dark:text-rose-300">
                  {audioSource === USER_LICENSED_TRACK 
                    ? 'Playing your selected track'
                    : 'Romantic instrumental music'}
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium text-rose-900 dark:text-rose-100">
                  Volume
                </label>
                <div className="flex items-center gap-2">
                  <VolumeX className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                  <Slider
                    value={[volume]}
                    onValueChange={handleVolumeChange}
                    max={1}
                    step={0.01}
                    className="flex-1"
                  />
                  <Volume2 className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                </div>
                <p className="text-xs text-rose-600 dark:text-rose-400 text-center">
                  {Math.round(volume * 100)}%
                </p>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </>
  );
}
