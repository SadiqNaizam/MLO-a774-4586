import React from 'react';
import { Button } from '@/components/ui/button';
import { PlayCircle, Heart, MoreHorizontal, PauseCircle } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface SongListItemProps {
  id: string | number;
  title: string;
  artist: string;
  albumArtUrl?: string;
  duration?: string; // e.g., "3:45"
  isPlaying?: boolean; // To show play/pause state on this item if it's the current song
  isLiked?: boolean;
  onPlay: (id: string | number) => void;
  onLikeToggle?: (id: string | number) => void;
  onOptionsClick?: (id: string | number) => void; // For a context menu or similar
}

const SongListItem: React.FC<SongListItemProps> = ({
  id,
  title,
  artist,
  albumArtUrl,
  duration,
  isPlaying = false,
  isLiked = false,
  onPlay,
  onLikeToggle,
  onOptionsClick,
}) => {
  console.log("Rendering SongListItem:", title);

  const handlePlayClick = () => {
    console.log("Play clicked for song:", id, title);
    onPlay(id);
  };

  const handleLikeClick = () => {
    console.log("Like clicked for song:", id, title);
    onLikeToggle?.(id);
  };
  
  const handleOptionsClick = () => {
    console.log("Options clicked for song:", id, title);
    onOptionsClick?.(id);
  };

  return (
    <div className="flex items-center p-2 hover:bg-muted/50 rounded-md transition-colors w-full group">
      <Avatar className="h-10 w-10 mr-3">
        <AvatarImage src={albumArtUrl} alt={title} onError={(e) => (e.currentTarget.src = '/placeholder.svg')} />
        <AvatarFallback>{title.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate" title={title}>{title}</p>
        <p className="text-xs text-muted-foreground truncate" title={artist}>{artist}</p>
      </div>
      {onLikeToggle && (
        <Button
          variant="ghost"
          size="icon"
          onClick={handleLikeClick}
          className="mx-1 opacity-0 group-hover:opacity-100 focus:opacity-100"
          aria-label={isLiked ? "Unlike" : "Like"}
        >
          <Heart className={`h-4 w-4 ${isLiked ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`} />
        </Button>
      )}
      {duration && <span className="text-xs text-muted-foreground mx-2 w-10 text-right">{duration}</span>}
      <Button
        variant="ghost"
        size="icon"
        onClick={handlePlayClick}
        className="mx-1"
        aria-label={isPlaying ? "Pause song" : "Play song"}
      >
        {isPlaying ? <PauseCircle className="h-5 w-5 text-primary" /> : <PlayCircle className="h-5 w-5 text-muted-foreground group-hover:text-primary" />}
      </Button>
       {onOptionsClick && (
        <Button
          variant="ghost"
          size="icon"
          onClick={handleOptionsClick}
          className="ml-1 opacity-0 group-hover:opacity-100 focus:opacity-100"
          aria-label="More options"
        >
          <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
        </Button>
      )}
    </div>
  );
};

export default SongListItem;