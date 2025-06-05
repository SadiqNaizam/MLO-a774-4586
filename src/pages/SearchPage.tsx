import React, { useState } from 'react';
import { ResizablePanel, ResizablePanelGroup, ResizableHandle } from "@/components/ui/resizable";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SongListItem from '@/components/SongListItem';
import ThemedContentCard from '@/components/ThemedContentCard';
import MusicPlayerBar from '@/components/MusicPlayerBar';
import { HomeIcon, SearchIcon, LibraryIcon, SettingsIcon, LogOutIcon, BellIcon, Music2, Mic2, Disc3, ListMusic } from 'lucide-react';
import { Link } from 'react-router-dom';

const mockSongs = [
  { id: 's1', title: "Yume o Kanaete Doraemon", artist: "mao", albumArtUrl: "https://i.imgur.com/0ZaZqL2.jpg", duration: "4:05", isLiked: true },
  { id: 's2', title: "Boku Doraemon", artist: "Nobuyo Ōyama", albumArtUrl: "https://i.imgur.com/sP3n8Zq.jpg", duration: "2:30" },
  { id: 's3', title: "Anywhere Doorstep", artist: "Gadget Grooves", albumArtUrl: "https://i.imgur.com/xG2PKHk.jpg", duration: "3:15" },
];
const mockArtists = [
  { id: 'a1', title: "Doraemon Band", description: "Official soundtrack artists", imageUrl: "https://i.imgur.com/yP9k8nL.jpg" },
  { id: 'a2', title: "The Nobitas", description: "Amateur neighborhood band", imageUrl: "https://i.imgur.com/LXVXh8T.jpg" },
];
const mockAlbums = [
  { id: 'al1', title: "Doraemon's Greatest Hits", description: "A collection of iconic Doraemon songs.", imageUrl: "https://i.imgur.com/cADn3Jg.jpg" },
  { id: 'al2', title: "Time Machine Tunes", description: "Travel through time with these melodies.", imageUrl: "https://i.imgur.com/JbQ6zDk.jpg" },
];
const mockPlaylists = [
  { id: 'p1', title: "Doraemon's Gadget Jams", description: "Music inspired by amazing gadgets.", imageUrl: "https://i.imgur.com/O3qT2XU.jpg" },
  { id: 'p2', title: "Relax with Dorami", description: "Calming tunes from Doraemon's sister.", imageUrl: "https://i.imgur.com/RylqUjK.jpg" },
];


const SearchPage: React.FC = () => {
  console.log('SearchPage loaded');
  const [searchTerm, setSearchTerm] = useState('');
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [currentSong, setCurrentSong] = React.useState(mockSongs[0]);
  const [progress, setProgress] = React.useState(30);
  const [volume, setVolume] = React.useState(50);

  const handlePlaySong = (songId: string | number) => {
    const song = mockSongs.find(s => s.id === songId);
    if (song) {
      setCurrentSong(song);
      setIsPlaying(true);
      console.log(`Playing song: ${song.title}`);
    }
  };
  
  const handleLikeSong = (songId: string | number) => {
    console.log(`Toggled like for song: ${songId}`);
    // Update mockSongs state if necessary (for visual feedback)
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-purple-400 to-indigo-200 text-gray-800">
      <ResizablePanelGroup direction="horizontal" className="flex-grow">
        <ResizablePanel defaultSize={20} minSize={15} maxSize={25} className="bg-purple-500/80 backdrop-blur-md p-4 flex flex-col">
           <div className="mb-6">
            <Link to="/" className="flex items-center space-x-2 mb-8">
              <img src="https://i.imgur.com/tZ2z7L7.png" alt="DoraPlay Logo" className="h-10 w-10" />
              <h1 className="text-2xl font-bold text-white">DoraPlay</h1>
            </Link>
          </div>
          <NavigationMenu orientation="vertical" className="space-y-1 w-full">
            <NavigationMenuList className="flex flex-col space-y-1 w-full">
              <NavigationMenuItem className="w-full">
                <Link to="/" className={`${navigationMenuTriggerStyle()} justify-start w-full hover:bg-purple-600/70 hover:text-white`}>
                  <HomeIcon className="h-5 w-5 mr-2" /> Home
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem className="w-full">
                <Link to="/search" className={`${navigationMenuTriggerStyle()} justify-start w-full bg-purple-600 text-white`}>
                  <SearchIcon className="h-5 w-5 mr-2" /> Search
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem className="w-full">
                <Link to="/library" className={`${navigationMenuTriggerStyle()} justify-start w-full hover:bg-purple-600/70 hover:text-white`}>
                  <LibraryIcon className="h-5 w-5 mr-2" /> Your Library
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </ResizablePanel>
        <ResizableHandle withHandle className="bg-purple-600 w-2 hover:bg-purple-700 transition-colors" />
        <ResizablePanel defaultSize={80} className="flex flex-col">
          <header className="p-4 flex items-center justify-between border-b border-purple-300/50 bg-white/30 backdrop-blur-sm">
            <div className="w-2/3 flex items-center space-x-2">
                 <SearchIcon className="h-6 w-6 text-gray-600" />
                 <Input
                    type="search"
                    placeholder="What do you want to listen to? (e.g., Doraemon's Bell)"
                    className="flex-grow bg-white/70 focus:bg-white"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
            </div>
            <div className="flex items-center space-x-4">
              <BellIcon className="h-6 w-6 text-gray-700 hover:text-purple-600 cursor-pointer" />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="cursor-pointer h-10 w-10 border-2 border-purple-500">
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
          <ScrollArea className="flex-grow p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Search Results {searchTerm && `for "${searchTerm}"`}</h1>
            <p className="text-md text-gray-700 mb-6">Find your favorite Doraemon songs, artists, and more!</p>
            
            {searchTerm === "" ? (
                 <div className="text-center py-10">
                    <SearchIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Search for songs, artists, albums, or playlists.</p>
                    <p className="text-sm text-gray-500">Try "Doraemon opening" or "Take-copter".</p>
                 </div>
            ) : (
            <Tabs defaultValue="songs" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-4 bg-purple-200/50">
                <TabsTrigger value="songs" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white"><Music2 className="mr-2 h-4 w-4" />Songs</TabsTrigger>
                <TabsTrigger value="artists" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white"><Mic2 className="mr-2 h-4 w-4" />Artists</TabsTrigger>
                <TabsTrigger value="albums" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white"><Disc3 className="mr-2 h-4 w-4" />Albums</TabsTrigger>
                <TabsTrigger value="playlists" className="data-[state=active]:bg-purple-500 data-[state=active]:text-white"><ListMusic className="mr-2 h-4 w-4" />Playlists</TabsTrigger>
              </TabsList>
              <TabsContent value="songs">
                <div className="space-y-2">
                  {mockSongs.map(song => (
                    <SongListItem 
                        key={song.id} 
                        {...song} 
                        isPlaying={currentSong?.id === song.id && isPlaying}
                        onPlay={handlePlaySong}
                        onLikeToggle={handleLikeSong}
                        onOptionsClick={(id) => console.log(`Options for song ${id}`)}
                    />
                  ))}
                   {mockSongs.length === 0 && <p>No songs found for "{searchTerm}". Try another gadget!</p>}
                </div>
              </TabsContent>
              <TabsContent value="artists">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {mockArtists.map(artist => (
                    <ThemedContentCard 
                        key={artist.id} 
                        title={artist.title} 
                        description={artist.description}
                        imageUrl={artist.imageUrl}
                        actionText="View Artist"
                        onActionClick={() => console.log(`View artist ${artist.id}`)}
                        themeClass="bg-white/80"
                    />
                  ))}
                  {mockArtists.length === 0 && <p>No artists found for "{searchTerm}". Maybe they are in the 22nd century?</p>}
                </div>
              </TabsContent>
              <TabsContent value="albums">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {mockAlbums.map(album => (
                    <ThemedContentCard 
                        key={album.id} 
                        title={album.title} 
                        description={album.description}
                        imageUrl={album.imageUrl}
                        actionText="View Album"
                        onActionClick={() => console.log(`View album ${album.id}`)}
                        themeClass="bg-white/80"
                    />
                  ))}
                   {mockAlbums.length === 0 && <p>No albums found for "{searchTerm}". Keep looking in the fourth-dimensional pocket!</p>}
                </div>
              </TabsContent>
              <TabsContent value="playlists">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {mockPlaylists.map(playlist => (
                    <ThemedContentCard 
                        key={playlist.id} 
                        title={playlist.title} 
                        description={playlist.description}
                        imageUrl={playlist.imageUrl}
                        actionText="Open Playlist"
                        onActionClick={() => console.log(`Open playlist ${playlist.id}`)}
                        themeClass="bg-white/80"
                    />
                  ))}
                  {mockPlaylists.length === 0 && <p>No playlists found for "{searchTerm}". Create one with your favorite gadgets!</p>}
                </div>
              </TabsContent>
            </Tabs>
            )}
          </ScrollArea>
        </ResizablePanel>
      </ResizablePanelGroup>
      <MusicPlayerBar
        songTitle={currentSong?.title || "No song selected"}
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

export default SearchPage;