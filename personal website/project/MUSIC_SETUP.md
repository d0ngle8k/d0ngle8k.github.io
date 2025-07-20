# Music Setup Guide

## 🎵 Adding Music to Your Portfolio

Your website now includes a custom music player! Here's how to add your own tracks:

### Option 1: Use Your Own Music Files

1. **Add music files to your project:**
   ```bash
   # Create a music directory
   mkdir -p public/music
   
   # Add your music files (MP3, WAV, OGG formats supported)
   # Example: public/music/my-track.mp3
   ```

2. **Update the music tracks in `src/data/musicTracks.ts`:**
   ```typescript
   export const musicTracks: Track[] = [
     {
       id: 1,
       title: "Your Track Name",
       artist: "Your Artist Name",
       url: "/music/your-track.mp3", // Path to your file
       duration: "3:45",
       genre: "Electronic",
       description: "Your track description"
     },
     // Add more tracks...
   ];
   ```

### Option 2: Use External Music URLs

1. **Find royalty-free music or use your own hosted tracks:**
   - [Free Music Archive](https://freemusicarchive.org/)
   - [ccMixter](http://ccmixter.org/)
   - [Incompetech](https://incompetech.com/) (Kevin MacLeod's music)
   - [YouTube Audio Library](https://studio.youtube.com/channel/UC/music)

2. **Update the URLs in `src/data/musicTracks.ts`:**
   ```typescript
   {
     id: 1,
     title: "Track Name",
     artist: "Artist",
     url: "https://example.com/track.mp3", // Direct URL to audio file
     duration: "3:45",
     genre: "Electronic"
   }
   ```

### Option 3: Use Streaming Services (Advanced)

For more advanced integration, you could:
- Use Spotify Web Playback SDK
- Integrate with SoundCloud API
- Use YouTube Music API

### Recommended Cybersecurity-Themed Music

**Free Options:**
- Synthwave/Retrowave tracks
- Electronic/Ambient music
- Cyberpunk-themed instrumental tracks
- Coding/Programming background music

**Popular Sources:**
- [NewRetroWave](https://newretrowave.com/) - Free synthwave tracks
- [Chillhop](https://chillhop.com/) - Lo-fi coding music
- [Epidemic Sound](https://www.epidemicsound.com/) - Royalty-free music

### Features of Your Music Player

✅ **Floating player** - Always accessible  
✅ **Theme integration** - Matches your site's dark/light theme  
✅ **Volume control** - Adjustable volume with mute option  
✅ **Track navigation** - Previous/Next buttons  
✅ **Progress bar** - Seek through tracks  
✅ **Track list** - Click to select any track  
✅ **Auto-play next** - Automatically plays next track  
✅ **Mobile responsive** - Works on all devices  

### Customization

**Change player position:**
- Edit the `fixed bottom-4 left-4` classes in `MusicPlayer.tsx`
- Options: `bottom-4 left-4`, `bottom-4 right-4`, `top-4 right-4`, etc.

**Change player size:**
- Modify the `w-80` class for width
- Adjust `max-h-32` for track list height

**Add more features:**
- Shuffle mode
- Repeat options
- Playlist support
- Equalizer
- Visualizer

### Legal Considerations

⚠️ **Important:** Only use music you have rights to:
- Your own compositions
- Royalty-free music
- Creative Commons licensed music
- Music with proper licensing

### Testing Your Music

1. **Start the development server:**
   ```bash
   npm run dev
   ```

2. **Click the music note icon** in the bottom-left corner

3. **Test all features:**
   - Play/Pause
   - Volume control
   - Track navigation
   - Seek functionality

### Troubleshooting

**Music won't play:**
- Check file format (MP3, WAV, OGG supported)
- Verify file path is correct
- Ensure file is accessible via URL

**Player not showing:**
- Check browser console for errors
- Verify MusicPlayer component is imported in App.tsx

**Mobile issues:**
- Some mobile browsers require user interaction before playing audio
- Test on different devices and browsers

---

🎵 **Enjoy your new music player!** The cybersecurity theme is perfect for creating an immersive experience for your portfolio visitors. 