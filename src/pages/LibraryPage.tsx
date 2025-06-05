import React from 'react';
import { ResizablePanel, ResizablePanelGroup, ResizableHandle } from "@/components/ui/resizable";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ThemedContentCard from '@/components/ThemedContentCard';
import SongListItem from '@/components/SongListItem';
import MusicPlayerBar from '@/components/MusicPlayerBar';
import { HomeIcon, SearchIcon, LibraryIcon, SettingsIcon, LogOutIcon, BellIcon, ListMusic, Heart, Disc3, UserPlus, FilterIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const likedSongs = [
  { id: 's1', title: "Yume o Kanaete Doraemon", artist: "mao", albumArtUrl: "https://i.imgur.com/0ZaZqL2.jpg", duration: "4:05", isLiked: true },
  { id: 's4', title: "Doraemon Ekaki Uta", artist: "Nobuyo Ōyama", albumArtUrl: "https://i.imgur.com/Q0Z1xWp.jpg", duration: "1:50", isLiked: true },
];
const userPlaylists = [
  { id: 'up1', title: "My Doraemon Favorites", description: "All the best Doraemon tunes I love.", imageUrl: "https://i.imgur.com/MjiOpoi.png" },
  { id: 'up2', title: "Gadget Invention Mood", description: "Music for thinking up new gadgets.", imageUrl: "https://i.imgur.com/6tUhf2T.jpg" },
];
const savedAlbums = [
  { id: 'al1', title: "Doraemon's Greatest Hits", description: "A collection of iconic Doraemon songs.", imageUrl: "https://i.imgur.com/cADn3Jg.jpg" },
  { id: 'al3', title: "Nobita's Adventure Mix", description: "Soundtracks for exciting journeys.", imageUrl: "https://i.imgur.com/LXVXh8T.jpg" },
];
const followedArtists = [
  { id: 'fa1', title: "The Time Patrollers", description: "Band from the future!", imageUrl: "https://i.imgur.com/uY7tGhJ.png" },
  { id: 'fa2', title: "Suneo's Rich Tones", description: "Sophisticated and show-offy.", imageUrl: "https://i.imgur.com/Uasdf12.jpg" }, // Placeholder, replace
];


const LibraryPage: React.FC = () => {
  console.log('LibraryPage loaded');
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [currentSong, setCurrentSong] = React.useState(likedSongs[0]);
  const [progress, setProgress] = React.useState(30);
  const [volume, setVolume] = React.useState(50);
  const [filter, setFilter] = React.useState("");

  const handlePlaySong = (songId: string | number) => {
    const song = likedSongs.find(s => s.id === songId); // Assuming only liked songs are playable from here directly for simplicity
    if (song) {
      setCurrentSong(song);
      setIsPlaying(true);
      console.log(`Playing song: ${song.title}`);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-green-400 to-emerald-200 text-gray-800">
      <ResizablePanelGroup direction="horizontal" className="flex-grow">
        <ResizablePanel defaultSize={20} minSize={15} maxSize={25} className="bg-green-500/80 backdrop-blur-md p-4 flex flex-col">
           <div className="mb-6">
            <Link to="/" className="flex items-center space-x-2 mb-8">
              <img src="https://i.imgur.com/tZ2z7L7.png" alt="DoraPlay Logo" className="h-10 w-10" />
              <h1 className="text-2xl font-bold text-white">DoraPlay</h1>
            </Link>
          </div>
          <NavigationMenu orientation="vertical" className="space-y-1 w-full">
            <NavigationMenuList className="flex flex-col space-y-1 w-full">
              <NavigationMenuItem className="w-full">
                <Link to="/" className={`${navigationMenuTriggerStyle()} justify-start w-full hover:bg-green-600/70 hover:text-white`}>
                  <HomeIcon className="h-5 w-5 mr-2" /> Home
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem className="w-full">
                <Link to="/search" className={`${navigationMenuTriggerStyle()} justify-start w-full hover:bg-green-600/70 hover:text-white`}>
                  <SearchIcon className="h-5 w-5 mr-2" /> Search
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem className="w-full">
                <Link to="/library" className={`${navigationMenuTriggerStyle()} justify-start w-full bg-green-600 text-white`}>
                  <LibraryIcon className="h-5 w-5 mr-2" /> Your Library
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </ResizablePanel>
        <ResizableHandle withHandle className="bg-green-600 w-2 hover:bg-green-700 transition-colors" />
        <ResizablePanel defaultSize={80} className="flex flex-col">
          <header className="p-4 flex items-center justify-between border-b border-green-300/50 bg-white/30 backdrop-blur-sm">
             <div className="flex items-center space-x-2 w-1/3">
                <FilterIcon className="h-5 w-5 text-gray-600"/>
                <Input 
                    type="text" 
                    placeholder="Filter in library..." 
                    className="bg-white/70 focus:bg-white"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                />
             </div>
            <div className="flex items-center space-x-4">
              <BellIcon className="h-6 w-6 text-gray-700 hover:text-green-600 cursor-pointer" />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="cursor-pointer h-10 w-10 border-2 border-green-500">
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
            <h1 className="text-3xl font-bold text-gray-800 mb-6">My Doraemon Library</h1>
            
            <Tabs defaultValue="playlists" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-4 bg-green-200/50">
                <TabsTrigger value="playlists" className="data-[state=active]:bg-green-500 data-[state=active]:text-white"><ListMusic className="mr-2 h-4 w-4" />Playlists</TabsTrigger>
                <TabsTrigger value="liked" className="data-[state=active]:bg-green-500 data-[state=active]:text-white"><Heart className="mr-2 h-4 w-4" />Liked Songs</TabsTrigger>
                <TabsTrigger value="albums" className="data-[state=active]:bg-green-500 data-[state=active]:text-white"><Disc3 className="mr-2 h-4 w-4" />Saved Albums</TabsTrigger>
                <TabsTrigger value="artists" className="data-[state=active]:bg-green-500 data-[state=active]:text-white"><UserPlus className="mr-2 h-4 w-4" />Followed Artists</TabsTrigger>
              </TabsList>

              <TabsContent value="playlists">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {userPlaylists.filter(p => p.title.toLowerCase().includes(filter.toLowerCase())).map(playlist => (
                    <ThemedContentCard 
                        key={playlist.id} 
                        title={playlist.title} 
                        description={playlist.description}
                        imageUrl={playlist.imageUrl}
                        actionText="Open"
                        onActionClick={() => console.log(`Open playlist ${playlist.id}`)}
                        themeClass="bg-white/80"
                    />
                  ))}
                   {userPlaylists.filter(p => p.title.toLowerCase().includes(filter.toLowerCase())).length === 0 && <p>No playlists match your filter. Try a different gadget for searching!</p>}
                </div>
              </TabsContent>
              <TabsContent value="liked">
                <div className="space-y-2">
                  {likedSongs.filter(s => s.title.toLowerCase().includes(filter.toLowerCase())).map(song => (
                    <SongListItem 
                        key={song.id} 
                        {...song} 
                        isPlaying={currentSong?.id === song.id && isPlaying}
                        onPlay={handlePlaySong}
                        onLikeToggle={(id) => console.log(`Unlike song ${id}`)}
                    />
                  ))}
                  {likedSongs.filter(s => s.title.toLowerCase().includes(filter.toLowerCase())).length === 0 && <p>No liked songs match your filter. Spread some love to Doraemon's tunes!</p>}
                </div>
              </TabsContent>
              <TabsContent value="albums">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {savedAlbums.filter(a => a.title.toLowerCase().includes(filter.toLowerCase())).map(album => (
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
                  {savedAlbums.filter(a => a.title.toLowerCase().includes(filter.toLowerCase())).length === 0 && <p>No saved albums match your filter. The Take-copter can help you find more!</p>}
                </div>
              </TabsContent>
              <TabsContent value="artists">
                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {followedArtists.filter(art => art.title.toLowerCase().includes(filter.toLowerCase())).map(artist => (
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
                  {followedArtists.filter(art => art.title.toLowerCase().includes(filter.toLowerCase())).length === 0 && <p>No followed artists match your filter. Discover new talent from the future!</p>}
                </div>
              </TabsContent>
            </Tabs>
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
        onLikeToggle={() => currentSong && console.log(`Like toggled for ${currentSong.id}`)}
      />
    </div>
  );
};

export default LibraryPage;