# Ijeoma & Kenechi Wedding Invitation Website

A beautiful, animated wedding invitation website with modern features.

## Features

✅ **Intro Video** - Tap to play full-screen intro video
✅ **Day/Night Mode Toggle** - Switch between light and dark themes
✅ **Music Toggle** - Background music control
✅ **Countdown Timer** - Live countdown to July 25th, 2026
✅ **Scratch Card** - Gold shimmer hearts scratch-to-reveal for the date
✅ **RSVP Form** - Complete form that reveals venue map after submission
✅ **Interactive Google Maps** - Venue location revealed after RSVP
✅ **Photo Gallery** - Beautiful grid layout for couple photos
✅ **Gold & Silver Confetti** - Celebratory animations
✅ **Responsive Design** - Works perfectly on all devices
✅ **Fast Loading** - Optimized for performance

## Color Scheme

- **Main**: Tan (#D2B48C)
- **Accent**: Burnt Orange (#CC5500)
- **Text**: Brown (#654321)
- **Greenery**: Green (#228B22)
- **Special**: Gold (#FFD700) & Silver (#C0C0C0)

## How to Customize

### 1. Add Your Intro Video

Replace `placeholder-intro.mp4` with your video file:

```html
<source src="your-video-file.mp4" type="video/mp4">
```

Place your video file in the same directory as `index.html`.

### 2. Add Background Music

Replace `placeholder-music.mp3` with your music file:

```html
<source src="your-music-file.mp3" type="audio/mpeg">
```

### 3. Update Photo Gallery

Replace the placeholder images in the gallery section:

```html
<div class="gallery-item">
    <img src="your-photo-1.jpg" alt="Your description">
</div>
```

You can add more gallery items by copying the div structure.

### 4. Update Google Maps Location

The current map points to VGC, Lagos. To get the exact location:

1. Go to Google Maps
2. Find "Catholic Church of Transfiguration VGC"
3. Click "Share" → "Embed a map"
4. Copy the iframe src URL
5. Replace the iframe src in the venue-map section

## File Structure

```
wedding-invitation/
├── index.html          # Main website file
├── your-video.mp4      # Your intro video (add this)
├── your-music.mp3      # Your background music (add this)
└── photos/             # Your photo gallery images (optional folder)
    ├── photo1.jpg
    ├── photo2.jpg
    └── ...
```

## Deployment

### Option 1: Vercel (Recommended)

1. Push this folder to GitHub
2. Go to vercel.com
3. Import your repository
4. Deploy!

### Option 2: Netlify

1. Drag and drop the folder to netlify.com
2. Or connect to Git repository

### Option 3: Local Testing

Simply open `index.html` in your browser.

For best results, use a local server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve
```

Then visit `http://localhost:8000`

## Mobile Optimization

The website is fully responsive and optimized for:
- Touch interactions (scratch card works on mobile)
- Fast loading on mobile networks
- All screen sizes from phones to desktops

## Browser Support

Works on all modern browsers:
- Chrome
- Firefox
- Safari
- Edge
- Mobile browsers

## Special Features Explained

### Scratch Card
- Gold shimmer gradient background
- Floating gold hearts animation
- Scratch with mouse or finger
- Auto-reveals when 50% scratched
- Triggers confetti celebration

### RSVP Form
- Collects guest information
- Validates required fields
- Shows success message on submit
- Reveals interactive Google Map
- Smooth scroll to map location

### Day/Night Mode
- Toggle button in top-left corner
- Changes entire color scheme
- Persists during session
- Smooth transitions

### Confetti
- Gold and silver colors
- Triggered on video end and scratch reveal
- Falls from top with rotation
- Auto-cleans after animation

## Tips for Best Performance

1. Compress your intro video (recommended: under 10MB)
2. Optimize gallery images (use WebP format if possible)
3. Use compressed audio for background music
4. Consider using a CDN for hosting media files

## Wedding Details

- **Bride**: Ijeoma
- **Groom**: Kenechi
- **Date**: July 25th, 2026
- **Time**: 9:00 AM
- **Venue**: Catholic Church of Transfiguration, VGC, Lagos Nigeria

---

Made with love ❤️
