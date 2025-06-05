import React, { useState } from 'react';
import { ResizablePanel, ResizablePanelGroup, ResizableHandle } from "@/components/ui/resizable";
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";
import MusicPlayerBar from '@/components/MusicPlayerBar';
import { HomeIcon, SearchIcon, LibraryIcon, SettingsIcon, LogOutIcon, BellIcon, UserCog, Palette, BellDot, ShieldCheck, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from "@/components/ui/use-toast"; // Assuming useToast is available

const SettingsPage: React.FC = () => {
  console.log('SettingsPage loaded');
  const { toast } = useToast(); // For showing notifications on save

  const [username, setUsername] = useState("DoraFan22");
  const [email, setEmail] = useState("doraemon.lover@example.com");
  const [audioQuality, setAudioQuality] = useState("high");
  const [enableNotifications, setEnableNotifications] = useState(true);
  const [doraemonThemeAnimations, setDoraemonThemeAnimations] = useState(true);
  const [otp, setOtp] = useState("");

  const handleSaveChanges = () => {
    console.log("Saving settings:", { username, email, audioQuality, enableNotifications, doraemonThemeAnimations });
    toast({
      title: "Settings Saved!",
      description: "Your preferences have been updated with a sprinkle of gadget magic.",
      className: "bg-green-500 text-white",
    });
  };
  
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [progress, setProgress] = React.useState(30);
  const [volume, setVolume] = React.useState(50);


  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-yellow-300 to-orange-200 text-gray-800">
      <ResizablePanelGroup direction="horizontal" className="flex-grow">
        <ResizablePanel defaultSize={20} minSize={15} maxSize={25} className="bg-yellow-400/80 backdrop-blur-md p-4 flex flex-col">
          <div className="mb-6">
            <Link to="/" className="flex items-center space-x-2 mb-8">
              <img src="https://i.imgur.com/tZ2z7L7.png" alt="DoraPlay Logo" className="h-10 w-10" />
              <h1 className="text-2xl font-bold text-gray-800">DoraPlay</h1>
            </Link>
          </div>
          <NavigationMenu orientation="vertical" className="space-y-1 w-full">
            <NavigationMenuList className="flex flex-col space-y-1 w-full">
              <NavigationMenuItem className="w-full">
                <Link to="/" className={`${navigationMenuTriggerStyle()} justify-start w-full hover:bg-yellow-500/70 hover:text-gray-800`}>
                  <HomeIcon className="h-5 w-5 mr-2" /> Home
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem className="w-full">
                <Link to="/search" className={`${navigationMenuTriggerStyle()} justify-start w-full hover:bg-yellow-500/70 hover:text-gray-800`}>
                  <SearchIcon className="h-5 w-5 mr-2" /> Search
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem className="w-full">
                <Link to="/library" className={`${navigationMenuTriggerStyle()} justify-start w-full hover:bg-yellow-500/70 hover:text-gray-800`}>
                  <LibraryIcon className="h-5 w-5 mr-2" /> Your Library
                </Link>
              </NavigationMenuItem>
               <NavigationMenuItem className="w-full">
                <Link to="/settings" className={`${navigationMenuTriggerStyle()} justify-start w-full bg-yellow-500 text-gray-800`}>
                  <SettingsIcon className="h-5 w-5 mr-2" /> Settings
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </ResizablePanel>
        <ResizableHandle withHandle className="bg-yellow-500 w-2 hover:bg-yellow-600 transition-colors" />
        <ResizablePanel defaultSize={80} className="flex flex-col">
          <header className="p-4 flex items-center justify-end border-b border-yellow-300/50 bg-white/30 backdrop-blur-sm">
            <div className="flex items-center space-x-4">
              <BellIcon className="h-6 w-6 text-gray-700 hover:text-yellow-600 cursor-pointer" />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="cursor-pointer h-10 w-10 border-2 border-yellow-500">
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
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Settings & Gadget Controls</h1>
            
            <div className="space-y-8 max-w-2xl mx-auto">
              <Card className="bg-white/80 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center"><UserCog className="mr-2 h-5 w-5 text-yellow-600" /> Account Settings</CardTitle>
                  <CardDescription>Manage your DoraPlay profile and login details.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-1">
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} className="bg-white/70" />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-white/70" />
                  </div>
                  <Button variant="outline" className="border-yellow-500 text-yellow-600 hover:bg-yellow-50">Change Password</Button>
                </CardContent>
              </Card>

              <Card className="bg-white/80 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center"><ShieldCheck className="mr-2 h-5 w-5 text-yellow-600" /> Security & Privacy</CardTitle>
                  <CardDescription>Enhance your account security like Doraemon's pocket.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <Label htmlFor="otp-setup">Setup 2-Factor Authentication (Time Kerchief Code)</Label>
                        <p className="text-sm text-gray-600 mb-2">Enter the 6-digit code from your authenticator app.</p>
                        <InputOTP maxLength={6} value={otp} onChange={(value) => setOtp(value)}>
                            <InputOTPGroup>
                                <InputOTPSlot index={0} />
                                <InputOTPSlot index={1} />
                                <InputOTPSlot index={2} />
                            </InputOTPGroup>
                            <InputOTPSeparator />
                            <InputOTPGroup>
                                <InputOTPSlot index={3} />
                                <InputOTPSlot index={4} />
                                <InputOTPSlot index={5} />
                            </InputOTPGroup>
                        </InputOTP>
                         <Button variant="ghost" className="mt-2 text-yellow-600 hover:text-yellow-700" onClick={() => console.log('Verify OTP:', otp)}>Verify Code</Button>
                    </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center"><Palette className="mr-2 h-5 w-5 text-yellow-600" /> Application Preferences</CardTitle>
                  <CardDescription>Customize your DoraPlay experience.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-1">
                    <Label htmlFor="audioQuality">Audio Quality (Sound Box)</Label>
                    <Select value={audioQuality} onValueChange={setAudioQuality}>
                      <SelectTrigger id="audioQuality" className="bg-white/70">
                        <SelectValue placeholder="Select audio quality" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low (Conserves Data)</SelectItem>
                        <SelectItem value="standard">Standard (Good Balance)</SelectItem>
                        <SelectItem value="high">High (Best Quality - like Doraemon's Bell)</SelectItem>
                        <SelectItem value="crystal">Crystal Clear (Future Gadget Sound)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="enableNotifications" className="flex items-center"><BellDot className="mr-2 h-4 w-4" /> Enable Notifications (Echo Mountain)</Label>
                    <Switch id="enableNotifications" checked={enableNotifications} onCheckedChange={setEnableNotifications} />
                  </div>
                   <div className="flex items-center justify-between">
                    <Label htmlFor="doraemonAnimations">Doraemon Theme Animations (Time Furoshiki Effects)</Label>
                    <Switch id="doraemonAnimations" checked={doraemonThemeAnimations} onCheckedChange={setDoraemonThemeAnimations} />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-white/80 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center"><Info className="mr-2 h-5 w-5 text-yellow-600" /> About DoraPlay</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-700">DoraPlay Version: 1.0 (22nd Century Edition)</p>
                  <p className="text-sm text-gray-700 mt-1">Powered by Future Gadgets and Imagination.</p>
                  <Link to="/help-center" className="text-sm text-yellow-600 hover:underline mt-2 block">Help & Support (Ask Dorami!)</Link>
                </CardContent>
              </Card>

              <div className="flex justify-end">
                <Button size="lg" onClick={handleSaveChanges} className="bg-yellow-500 hover:bg-yellow-600 text-gray-800">Save All Gadget Settings</Button>
              </div>
            </div>
          </ScrollArea>
        </ResizablePanel>
      </ResizablePanelGroup>
      <MusicPlayerBar
        songTitle="Settings Serenade"
        artistName="System Sounds"
        albumArtUrl="https://i.imgur.com/tZ2z7L7.png" // App logo
        isPlaying={isPlaying}
        progress={progress}
        volume={volume}
        onPlayPause={() => setIsPlaying(!isPlaying)}
        onNext={() => console.log('Next song')}
        onPrevious={() => console.log('Previous song')}
        onSeek={(newProgress) => setProgress(newProgress[0])}
        onVolumeChange={(newVolume) => setVolume(newVolume[0])}
      />
    </div>
  );
};

export default SettingsPage;