import React from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Play, Pause, SkipForward, SkipBack, Volume2, Heart } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface MusicPlayerBarProps {
  songTitle?: string;
  artistName?: string;
  albumArtUrl?: string;
  isPlaying: boolean;
  progress: number; // 0-100
  volume: number; // 0-100
  isLiked?: boolean;
  onPlayPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onSeek: (value: number[]) => void;
  onVolumeChange: (value: number[]) => void;
  onLikeToggle?: () => void;
}

const MusicPlayerBar: React.FC<MusicPlayerBarProps> = ({
  songTitle = "No song playing",
  artistName = "Unknown Artist",
  albumArtUrl,
  isPlaying,
  progress,
  volume,
  isLiked,
  onPlayPause,
  onNext,
  onPrevious,
  onSeek,
  onVolumeChange,
  onLikeToggle,
}) => {
  console.log("Rendering MusicPlayerBar. Current song:", songTitle, "Playing:", isPlaying);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-3 shadow-lg flex items-center space-x-4 z-50">
      {/* Album Art & Song Info */}
      <div className="flex items-center space-x-3 w-1/4">
        {albumArtUrl ? (
          <div className="w-12 h-12">
            <AspectRatio ratio={1 / 1} className="bg-muted rounded">
              <img
                src={albumArtUrl}
                alt={songTitle}
                className="object-cover w-full h-full rounded"
                onError={(e) => (e.currentTarget.src = '/placeholder.svg')}
              />
            </AspectRatio>
          </div>
        ) : (
          <div className="w-12 h-12 bg-muted rounded flex items-center justify-center text-muted-foreground">
            <Volume2 size={24} /> {/* Placeholder icon */}
          </div>
        )}
        <div>
          <p className="text-sm font-semibold truncate" title={songTitle}>{songTitle}</p>
          <p className="text-xs text-muted-foreground truncate" title={artistName}>{artistName}</p>
        </div>
      </div>

      {/* Playback Controls & Progress Bar */}
      <div className="flex-1 flex flex-col items-center space-y-1">
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" onClick={onPrevious} aria-label="Previous track">
            <SkipBack className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" onClick={onPlayPause} aria-label={isPlaying ? "Pause" : "Play"}>
            {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
          </Button>
          <Button variant="ghost" size="icon" onClick={onNext} aria-label="Next track">
            <SkipForward className="h-5 w-5" />
          </Button>
        </div>
        <Slider
          defaultValue={[0]}
          value={[progress]}
          max={100}
          step={1}
          className="w-full max-w-md"
          onValueChange={onSeek}
          aria-label="Song progress"
        />
      </div>

      {/* Volume & Like Button */}
      <div className="flex items-center space-x-2 w-1/4 justify-end">
        {onLikeToggle && (
          <Button variant="ghost" size="icon" onClick={onLikeToggle} aria-label={isLiked ? "Unlike song" : "Like song"}>
            <Heart className={`h-5 w-5 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
          </Button>
        )}
        <Volume2 className="h-5 w-5 text-muted-foreground" />
        <Slider
          defaultValue={[50]}
          value={[volume]}
          max={100}
          step={1}
          className="w-24"
          onValueChange={onVolumeChange}
          aria-label="Volume"
        />
      </div>
    </div>
  );
};

export default MusicPlayerBar;