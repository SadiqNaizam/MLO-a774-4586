import React from 'react';
import { ResizablePanel, ResizablePanelGroup, ResizableHandle } from "@/components/ui/resizable";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import ThemedContentCard from '@/components/ThemedContentCard';
import MusicPlayerBar from '@/components/MusicPlayerBar';
import { HomeIcon, SearchIcon, LibraryIcon, SettingsIcon, LogOutIcon, BellIcon, LayoutGrid, ListMusic, RadioTower } from 'lucide-react';
import { Link } from 'react-router-dom';

const placeholderPlaylists = [
  { id: '1', title: "Doraemon's Happy Tunes", description: "Cheerful songs from Doraemon's world!", imageUrl: "https://i.imgur.com/O3qT2XU.jpg" },
  { id: '2', title: "Nobita's Study Beats", description: "Focus music for homework time.", imageUrl: "https://i.imgur.com/LXVXh8T.jpg" },
  { id: '3', title: "Shizuka's Violin Melodies", description: "Calming classical pieces.", imageUrl: "https://i.imgur.com/yT38Z0P.jpg" },
  { id: '4', title: "Giant's Karaoke Hits", description: "Loud and proud singalongs!", imageUrl: "https://i.imgur.com/b6XzANq.jpg" },
];

const placeholderAlbums = [
  { id: 'album1', title: "Doraemon Movie Soundtracks", description: "Iconic themes from the movies.", imageUrl: "https://i.imgur.com/cADn3Jg.jpg" },
  { id: 'album2', title: "Future Gadget Grooves", description: "Electronic music inspired by gadgets.", imageUrl: "https://i.imgur.com/RylqUjK.jpg" },
];

const HomePage: React.FC = () => {
  console.log('HomePage loaded');
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [progress, setProgress] = React.useState(30);
  const [volume, setVolume] = React.useState(50);

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-blue-400 to-sky-200 text-gray-800">
      <ResizablePanelGroup direction="horizontal" className="flex-grow">
        <ResizablePanel defaultSize={20} minSize={15} maxSize={25} className="bg-blue-500/80 backdrop-blur-md p-4 flex flex-col">
          <div className="mb-6">
            <Link to="/" className="flex items-center space-x-2 mb-8">
              <img src="https://i.imgur.com/tZ2z7L7.png" alt="DoraPlay Logo" className="h-10 w-10" />
              <h1 className="text-2xl font-bold text-white">DoraPlay</h1>
            </Link>
          </div>
          <NavigationMenu orientation="vertical" className="space-y-1 w-full">
            <NavigationMenuList className="flex flex-col space-y-1 w-full">
              <NavigationMenuItem className="w-full">
                <Link to="/" className={`${navigationMenuTriggerStyle()} justify-start w-full bg-blue-600 text-white`}>
                  <HomeIcon className="h-5 w-5 mr-2" /> Home
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem className="w-full">
                <Link to="/search" className={`${navigationMenuTriggerStyle()} justify-start w-full hover:bg-blue-600/70 hover:text-white`}>
                  <SearchIcon className="h-5 w-5 mr-2" /> Search
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem className="w-full">
                <Link to="/library" className={`${navigationMenuTriggerStyle()} justify-start w-full hover:bg-blue-600/70 hover:text-white`}>
                  <LibraryIcon className="h-5 w-5 mr-2" /> Your Library
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <div className="mt-auto">
             <ThemedContentCard 
                title="Doraemon's Pocket Radio"
                description="Tune in to random gadgets!"
                imageUrl="https://i.imgur.com/Y8bVykP.png"
                actionText="Listen Now"
                onActionClick={() => console.log('Radio clicked')}
                themeClass="bg-yellow-300/70"
             />
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle className="bg-blue-600 w-2 hover:bg-blue-700 transition-colors" />
        <ResizablePanel defaultSize={80} className="flex flex-col">
          <header className="p-4 flex items-center justify-between border-b border-blue-300/50 bg-white/30 backdrop-blur-sm">
            <Input type="search" placeholder="Search for songs, artists, gadgets..." className="w-1/3 bg-white/70 focus:bg-white" />
            <div className="flex items-center space-x-4">
              <BellIcon className="h-6 w-6 text-gray-700 hover:text-blue-600 cursor-pointer" />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="cursor-pointer h-10 w-10 border-2 border-blue-500">
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
            <div className="mb-10">
              <h1 className="text-4xl font-bold text-gray-800 mb-2">Welcome to DoraPlay!</h1>
              <p className="text-lg text-gray-700">Discover your next favorite tune from Doraemon's universe and beyond.</p>
            </div>

            <section className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-gray-800">Featured Playlists</h2>
                <Link to="/library/playlists" className="text-sm text-blue-600 hover:underline font-medium">View All</Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {placeholderPlaylists.map(playlist => (
                  <ThemedContentCard
                    key={playlist.id}
                    title={playlist.title}
                    description={playlist.description}
                    imageUrl={playlist.imageUrl}
                    actionText="Open Playlist"
                    onActionClick={() => console.log(`Open playlist ${playlist.id}`)}
                    themeClass="bg-white/80 shadow-lg hover:shadow-xl transition-shadow"
                  />
                ))}
              </div>
            </section>

            <section className="mb-8">
               <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold text-gray-800">New Releases</h2>
                 <Link to="/library/albums" className="text-sm text-blue-600 hover:underline font-medium">View All</Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {placeholderAlbums.map(album => (
                  <ThemedContentCard
                    key={album.id}
                    title={album.title}
                    description={album.description}
                    imageUrl={album.imageUrl}
                    actionText="View Album"
                    onActionClick={() => console.log(`View album ${album.id}`)}
                    themeClass="bg-white/80 shadow-lg hover:shadow-xl transition-shadow"
                  />
                ))}
              </div>
            </section>
             <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Gadget Sounds Weekly</h2>
              <ThemedContentCard
                title="Sounds of the Anywhere Door"
                description="Ambient sounds from traveling through dimensions."
                imageUrl="https://i.imgur.com/xG2PKHk.jpg"
                actionText="Listen Now"
                onActionClick={() => console.log('Listen to Anywhere Door sounds')}
                themeClass="bg-purple-200/80"
              >
                <p className="text-sm text-purple-700 mt-2">A curated mix of portal whooshes and destination soundscapes.</p>
              </ThemedContentCard>
            </section>
          </ScrollArea>
        </ResizablePanel>
      </ResizablePanelGroup>
      <MusicPlayerBar
        songTitle="Doraemon no Uta"
        artistName="Kumiko Osugi"
        albumArtUrl="https://i.imgur.com/O3qT2XU.jpg"
        isPlaying={isPlaying}
        progress={progress}
        volume={volume}
        isLiked={true}
        onPlayPause={() => setIsPlaying(!isPlaying)}
        onNext={() => console.log('Next song')}
        onPrevious={() => console.log('Previous song')}
        onSeek={(newProgress) => setProgress(newProgress[0])}
        onVolumeChange={(newVolume) => setVolume(newVolume[0])}
        onLikeToggle={() => console.log('Toggled like')}
      />
    </div>
  );
};

export default HomePage;