# Wedding Invitation Website - Ijeoma & Kenechi

## Overview
A beautiful, animated wedding invitation website with modern features including:
- Animated envelope opening
- Scratch card to reveal the date
- Gold and silver confetti animation
- Day/Night theme toggle
- Music toggle for immersive experience
- RSVP form with map reveal after submission
- Photo gallery
- Countdown timer
- Interactive Google Maps integration

## Color Scheme
- **Main Color**: Tan (#D2B48C)
- **Secondary Colors**: 
  - Burnt Orange (#CC5500)
  - Brown (#654321)
  - Green (#228B22) for greenery
  - Gold (#FFD700) and Silver (#C0C0C0) for confetti

## File Structure
```
/workspace/
├── index.html          # Main HTML file
├── styles.css          # All styling
├── script.js           # JavaScript functionality
└── assets/
    ├── intro-video.mp4 # Upload your intro video here
    ├── music.mp3       # Upload your background music here
    └── gallery/
        ├── photo1.jpg  # Upload couple photos here
        ├── photo2.jpg
        ├── photo3.jpg
        ├── photo4.jpg
        ├── photo5.jpg
        └── photo6.jpg
```

## Features Implemented

### 1. Envelope Opening Animation
- Beautiful animated envelope that opens when clicked
- Invitation card slides out smoothly
- Triggers confetti animation

### 2. Scratch Card
- Interactive scratch-off card to reveal the wedding date
- Silver and gold gradient coating
- Automatically reveals when 40% scratched

### 3. Confetti Animation
- Gold and silver confetti particles
- Continuous falling animation
- Starts when envelope opens

### 4. Day/Night Theme Toggle
- Toggle between light (day) and dark (night) themes
- Smooth color transitions
- Icon changes between moon and sun

### 5. Music Toggle
- Background music player
- Mute/unmute functionality
- Auto-plays when envelope opens

### 6. Countdown Timer
- Real-time countdown to July 25th, 2026 at 9:00 AM
- Displays days, hours, minutes, and seconds
- Updates every second

### 7. RSVP Form
- Complete form with all necessary fields
- Validation for required fields
- Success message on submission
- Reveals map section after submission

### 8. Interactive Map
- Google Maps embed for Catholic Church of Transfiguration VGC
- "Get Directions" button
- Hidden until RSVP form is submitted

### 9. Photo Gallery
- Responsive grid layout
- Hover effects on images
- Space for 6 photos (easily expandable)

### 10. Hero Video Section
- Full-screen video background
- Overlay for text readability
- Autoplay, muted, loop

## How to Customize

### Adding Your Video
1. Place your intro video in `/workspace/assets/intro-video.mp4`
2. The video should be in MP4 format for best compatibility
3. Recommended size: 1920x1080 or similar aspect ratio

### Adding Photos
1. Place your photos in `/workspace/assets/gallery/`
2. Name them: photo1.jpg, photo2.jpg, etc.
3. Supported formats: JPG, PNG, WebP
4. Recommended size: 800x600 or similar

### Adding Music
1. Place your background music in `/workspace/assets/music.mp3`
2. MP3 format recommended
3. Consider using a romantic instrumental track

### Updating Map Location
The current map points to a placeholder location. To update:
1. Go to Google Maps
2. Search for "Catholic Church of Transfiguration VGC Lagos"
3. Click "Share" → "Embed a map"
4. Copy the iframe src URL
5. Replace the src in index.html line 156

## Technical Details

### Technologies Used
- HTML5
- CSS3 with custom properties (variables)
- Vanilla JavaScript (ES6+)
- Google Fonts (Great Vibes, Playfair Display, Lato)
- Font Awesome icons
- Google Maps Embed API

### Browser Compatibility
- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (responsive design)

### Performance Optimizations
- Minimal external dependencies
- CSS animations for smooth performance
- Lazy loading for maps
- Optimized confetti particle system

## Deployment

This is a static website that can be deployed to any hosting platform:

### Vercel (Recommended)
1. Push code to GitHub
2. Import project to Vercel
3. Deploy automatically

### Netlify
1. Drag and drop the folder to Netlify
2. Or connect to Git repository

### GitHub Pages
1. Enable GitHub Pages in repository settings
2. Select main branch as source

## Wedding Details
- **Bride**: Ijeoma
- **Groom**: Kenechi
- **Date**: July 25th, 2026
- **Time**: 9:00 AM
- **Venue**: Catholic Church of Transfiguration, VGC, Lagos, Nigeria

## Next Steps
1. Add your intro video to `assets/intro-video.mp4`
2. Add your photos to `assets/gallery/`
3. Add background music to `assets/music.mp3`
4. Update the Google Maps embed URL with the exact church location
5. Test all functionality
6. Deploy to your preferred hosting platform

Enjoy your special day! 💕