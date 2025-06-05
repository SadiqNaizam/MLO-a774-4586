import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ResizablePanel, ResizablePanelGroup, ResizableHandle } from "@/components/ui/resizable";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from '@/components/Image'; // Custom Image component
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import SongListItem from '@/components/SongListItem';
import MusicPlayerBar from '@/components/MusicPlayerBar';
import { HomeIcon, SearchIcon, LibraryIcon, SettingsIcon, LogOutIcon, BellIcon, PlayCircle, Shuffle, Heart, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

// Mock data fetching
const fetchPlaylistDetails = async (playlistId: string) => {
  console.log(`Fetching details for playlist: ${playlistId}`);
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 500));
  if (playlistId === 'doraemons-happy-tunes') {
    return {
      id: 'doraemons-happy-tunes',
      title: "Doraemon's Happy Tunes",
      description: "Cheerful songs from Doraemon's world to brighten your day!",
      creator: "DoraPlay Curated",
      coverImageUrl: "https://i.imgur.com/O3qT2XU.jpg",
      songs: [
        { id: 's1', title: "Yume o Kanaete Doraemon", artist: "mao", album: "Doraemon Themes", duration: "4:05", albumArtUrl: "https://i.imgur.com/0ZaZqL2.jpg", isLiked: true },
        { id: 's2', title: "Boku Doraemon", artist: "Nobuyo Ōyama", album: "Classic Doraemon", duration: "2:30", albumArtUrl: "https://i.imgur.com/sP3n8Zq.jpg", isLiked: false },
        { id: 's5', title: "Doraemon Ondo", artist: "Satoko Yamano", album: "Summer Festival", duration: "3:12", albumArtUrl: "https://i.imgur.com/sP3n8Zq.jpg", isLiked: true },
        { id: 's6', title: "Aoi Sora wa Pocket sa", artist: "Kumiko Ōsugi", album: "Pocket Songs", duration: "2:55", albumArtUrl: "https://i.imgur.com/0ZaZqL2.jpg", isLiked: false },
      ]
    };
  }
  return null; // Or a default playlist
};

const PlaylistDetailPage: React.FC = () => {
  const { id: playlistId } = useParams<{ id: string }>();
  console.log(`PlaylistDetailPage loaded for ID: ${playlistId}`);
  
  const [playlist, setPlaylist] = useState<any>(null); // Replace 'any' with a proper type
  const [filterTerm, setFilterTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const [isPlaying, setIsPlaying] = React.useState(false);
  const [currentSong, setCurrentSong] = React.useState<any>(null);
  const [progress, setProgress] = React.useState(0);
  const [volume, setVolume] = React.useState(50);

  useEffect(() => {
    if (playlistId) {
      setIsLoading(true);
      fetchPlaylistDetails(playlistId).then(data => {
        setPlaylist(data);
        if (data && data.songs.length > 0) {
         // setCurrentSong(data.songs[0]); // Optionally set first song as current
        }
        setIsLoading(false);
      });
    }
  }, [playlistId]);

  const handlePlaySong = (songId: string | number) => {
    const song = playlist?.songs.find((s: any) => s.id === songId);
    if (song) {
      setCurrentSong(song);
      setIsPlaying(true);
      console.log(`Playing song: ${song.title}`);
    }
  };
  
  const handleLikeSong = (songId: string | number) => {
    console.log(`Toggled like for song: ${songId} in playlist ${playlistId}`);
    // Update song's like status in playlist state
     setPlaylist((prevPlaylist: any) => ({
      ...prevPlaylist,
      songs: prevPlaylist.songs.map((s: any) => s.id === songId ? { ...s, isLiked: !s.isLiked } : s)
    }));
  };

  const filteredSongs = playlist?.songs.filter((song: any) => 
    song.title.toLowerCase().includes(filterTerm.toLowerCase()) ||
    song.artist.toLowerCase().includes(filterTerm.toLowerCase())
  ) || [];

  if (isLoading) {
    return <div className="h-screen flex items-center justify-center bg-blue-100"><p className="text-xl text-blue-600">Loading Doraemon's playlist...</p></div>;
  }

  if (!playlist) {
    return <div className="h-screen flex items-center justify-center bg-red-100"><p className="text-xl text-red-600">Oops! This playlist flew away with the Take-copter. (Not Found)</p></div>;
  }

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-pink-300 to-rose-100 text-gray-800">
      <ResizablePanelGroup direction="horizontal" className="flex-grow">
        <ResizablePanel defaultSize={20} minSize={15} maxSize={25} className="bg-pink-400/80 backdrop-blur-md p-4 flex flex-col">
           <div className="mb-6">
            <Link to="/" className="flex items-center space-x-2 mb-8">
              <img src="https://i.imgur.com/tZ2z7L7.png" alt="DoraPlay Logo" className="h-10 w-10" />
              <h1 className="text-2xl font-bold text-white">DoraPlay</h1>
            </Link>
          </div>
          <NavigationMenu orientation="vertical" className="space-y-1 w-full">
             <NavigationMenuList className="flex flex-col space-y-1 w-full">
              <NavigationMenuItem className="w-full">
                <Link to="/" className={`${navigationMenuTriggerStyle()} justify-start w-full hover:bg-pink-500/70 hover:text-white`}>
                  <HomeIcon className="h-5 w-5 mr-2" /> Home
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem className="w-full">
                <Link to="/search" className={`${navigationMenuTriggerStyle()} justify-start w-full hover:bg-pink-500/70 hover:text-white`}>
                  <SearchIcon className="h-5 w-5 mr-2" /> Search
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem className="w-full">
                <Link to="/library" className={`${navigationMenuTriggerStyle()} justify-start w-full hover:bg-pink-500/70 hover:text-white`}>
                  <LibraryIcon className="h-5 w-5 mr-2" /> Your Library
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </ResizablePanel>
        <ResizableHandle withHandle className="bg-pink-500 w-2 hover:bg-pink-600 transition-colors" />
        <ResizablePanel defaultSize={80} className="flex flex-col">
           <header className="p-4 flex items-center justify-end border-b border-pink-200/50 bg-white/30 backdrop-blur-sm">
            {/* Removed search bar from header for this page, focus is on playlist */}
            <div className="flex items-center space-x-4">
              <BellIcon className="h-6 w-6 text-gray-700 hover:text-pink-500 cursor-pointer" />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="cursor-pointer h-10 w-10 border-2 border-pink-400">
                    <AvatarImage src="https://i.imgur.com/SU017kS.png" alt="User Avatar - Doraemon" />
                    <AvatarFallback>DR</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                 <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account (Doraemon)</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile</DropdownMenuItem>
                  <Link to="/settings"><DropdownMenuItem>Settings</DropdownMenuItem></Link>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-500">
                    <LogOutIcon className="mr-2 h-4 w-4" />
                    Log Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>
          <ScrollArea className="flex-grow">
            <div className="p-6">
                <div className="flex flex-col md:flex-row items-start gap-6 mb-8">
                    <Image 
                        src={playlist.coverImageUrl} 
                        alt={playlist.title} 
                        className="rounded-lg shadow-xl w-full md:w-64 h-auto md:h-64"
                        aspectRatio={1/1}
                        wrapperClassName="md:w-64 w-full"
                    />
                    <div className="flex-1">
                        <p className="text-sm text-pink-600 font-semibold">PLAYLIST</p>
                        <h1 className="text-4xl lg:text-6xl font-bold text-gray-800 my-2 break-words">{playlist.title}</h1>
                        <p className="text-gray-700 mb-2">{playlist.description}</p>
                        <p className="text-sm text-gray-600">Created by: <span className="font-medium">{playlist.creator}</span> &bull; {playlist.songs.length} songs</p>
                        <div className="mt-6 flex items-center space-x-3">
                            <Button size="lg" className="bg-pink-500 hover:bg-pink-600 text-white" onClick={() => handlePlaySong(playlist.songs[0]?.id)}>
                                <PlayCircle className="mr-2 h-5 w-5" /> Play All
                            </Button>
                            <Button variant="outline" size="icon" className="border-pink-500 text-pink-500 hover:bg-pink-50 hover:text-pink-600">
                                <Shuffle className="h-5 w-5" />
                            </Button>
                            <Button variant="outline" size="icon" className="border-pink-500 text-pink-500 hover:bg-pink-50 hover:text-pink-600">
                                <Heart className="h-5 w-5" />
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="mb-4">
                    <Input 
                        type="text"
                        placeholder="Filter songs in this playlist..."
                        value={filterTerm}
                        onChange={(e) => setFilterTerm(e.target.value)}
                        className="bg-white/70 focus:bg-white border-pink-300"
                        icon={<Filter className="h-4 w-4 text-gray-400" />}
                    />
                </div>
                
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="w-[50px]">#</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Album</TableHead>
                      <TableHead className="text-right">Duration</TableHead>
                      <TableHead className="text-center w-[100px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSongs.map((song: any, index: number) => (
                      // SongListItem can be used directly if it matches table structure, or adapt like this
                       <TableRow key={song.id} className="group hover:bg-pink-50/50">
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>
                            <div className="flex items-center space-x-3">
                                <Avatar className="h-10 w-10">
                                    <AvatarImage src={song.albumArtUrl} alt={song.title}/>
                                    <AvatarFallback>{song.title.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <div className={`font-medium ${currentSong?.id === song.id ? 'text-pink-600' : ''}`}>{song.title}</div>
                                    <div className="text-xs text-gray-600">{song.artist}</div>
                                </div>
                            </div>
                        </TableCell>
                        <TableCell className="text-xs text-gray-600">{song.album}</TableCell>
                        <TableCell className="text-right text-xs text-gray-600">{song.duration}</TableCell>
                        <TableCell className="text-center">
                             <div className="flex items-center justify-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Button variant="ghost" size="icon" onClick={() => handleLikeSong(song.id)}>
                                    <Heart className={`h-4 w-4 ${song.isLiked ? 'fill-pink-500 text-pink-500' : 'text-gray-500'}`} />
                                </Button>
                                <Button variant="ghost" size="icon" onClick={() => handlePlaySong(song.id)}>
                                    {currentSong?.id === song.id && isPlaying ? <PauseCircle className="h-5 w-5 text-pink-500" /> : <PlayCircle className="h-5 w-5 text-gray-500 hover:text-pink-500" />}
                                </Button>
                             </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                {filteredSongs.length === 0 && <p className="text-center py-4 text-gray-600">No songs match your filter. Maybe they're hiding in Doraemon's pocket?</p>}

            </div>
          </ScrollArea>
        </ResizablePanel>
      </ResizablePanelGroup>
      <MusicPlayerBar
        songTitle={currentSong?.title || "Nothing selected"}
        artistName={currentSong?.artist || "Unknown Artist"}
        albumArtUrl={currentSong?.albumArtUrl}
        isPlaying={isPlaying}
        progress={progress}
        volume={volume}
        isLiked={currentSong?.isLiked}
        onPlayPause={() => setIsPlaying(!isPlaying)}
        onNext={() => console.log('Next song')}
        onPrevious={() => console.log('Previous song')}
        onSeek={(newProgress) => setProgress(newProgress[0])}
        onVolumeChange={(newVolume) => setVolume(newVolume[0])}
        onLikeToggle={() => currentSong && handleLikeSong(currentSong.id)}
      />
    </div>
  );
};

export default PlaylistDetailPage;