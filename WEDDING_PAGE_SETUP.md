# Wedding Invitation Page Setup Guide

## ✅ What's Done

- Created `app/mainpage.tsx` - complete wedding invitation page
- Installed Framer Motion for animations
- Added custom font utility classes (`font-khmer`, `font-english`)
- All sections implemented: Hero, Names Banner, Story, Calendar, Program Timeline, Map

## 📋 Next Steps

### 1. Add Your Images

Create a folder `/public/wedding/` and add your images:

```
/public/wedding/
  ├── hero-top-branches.png
  ├── dove-left.png
  ├── dove-right.png
  ├── couple-wide.jpg
  ├── butterfly.png
  ├── story-photo-1.jpg
  ├── story-photo-2.jpg
  ├── calendar-december.png (transparent PNG)
  ├── swan-left.png
  ├── swan-right.png
  ├── cupid.png
  ├── timeline-photo-1.jpg
  ├── timeline-photo-2.jpg
  ├── timeline-photo-3.jpg
  ├── couple-walking.jpg
  └── cloud-watercolor.png
```

Then in `mainpage.tsx`, uncomment the image imports at the top and update paths as needed.

### 2. Install Custom Fonts

Add these fonts to your project:

**Option A: Using Google Fonts or CDN**

Add to `app/layout.tsx` in the `<head>`:

```tsx
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&display=swap" rel="stylesheet" />
```

For Khmer font, download "Khmer OS Muol Light" and place in `/public/fonts/`, then add to `globals.css`:

```css
@font-face {
  font-family: 'Khmer OS Muol Light';
  src: url('/fonts/KhmerOSMuolLight.ttf') format('truetype');
}
```

### 3. Update Text Content

Search for `TODO` comments in `mainpage.tsx` and replace with your actual:
- Khmer titles and descriptions
- English translations
- Event times and descriptions
- Venue details

### 4. Set Google Maps URL

In `mainpage.tsx`, update the `MAP_URL` constant:

1. Go to Google Maps
2. Search for your venue
3. Click "Share" → "Embed a map"
4. Copy the `src` URL from the iframe
5. Replace `MAP_URL` value

### 5. Test the Page

Visit: `http://localhost:3000/mainpage`

Or update your routing to make it the home page.

## 🎨 Customization

### Colors

Main theme colors are defined as Tailwind classes:
- Background: `bg-[#18280f]` (dark green)
- Text: `text-white` with various opacity levels
- Adjust in each section as needed

### Animations

All animations use Framer Motion. To adjust:
- Duration: change `duration` in transition objects
- Delay: add `delay` to stagger effects
- Movement: modify `y`, `x`, `scale` values

### Timeline Events

Update `day1Events` and `day2Events` arrays in `mainpage.tsx`:

```typescript
const day1Events: TimelineEvent[] = [
  {
    time: '09:00',
    titleKh: 'Your Khmer text',
    titleEn: 'Your English text',
    icon: '👨‍👩‍👧',
    photo: 'timeline1' // optional
  },
  // ... more events
]
```

## 🚀 Going Live

### Performance Optimizations

1. **Optimize Images**: Use WebP format, compress with tools like TinyPNG
2. **Lazy Loading**: Already implemented with Next.js Image component
3. **Font Loading**: Use `font-display: swap` in font declarations

### Deployment

This Next.js app can be deployed to:
- Vercel (recommended, easiest)
- Netlify
- AWS Amplify
- Your own server with Node.js

## 📱 Mobile Testing

Test on various devices:
- iPhone SE (small screen)
- iPhone 13/14 (standard)
- iPad (tablet view)
- Android devices

## ⚠️ Important Notes

- `page.tsx` (your existing chat page) is NOT modified
- `mainpage.tsx` is completely self-contained
- Gallery page at `/gallery` already exists and is linked from the CTA button
- Language toggle works but you need to fill in actual translated content

## 🐛 Troubleshooting

**Images not showing?**
- Check file paths in imports
- Verify images are in `/public/wedding/`
- Check browser console for 404 errors

**Fonts not loading?**
- Verify font files are in correct location
- Check CSS syntax in `globals.css`
- Clear browser cache

**Animations not smooth?**
- Check if device has reduced motion settings enabled
- Consider adding `will-change` CSS property for performance

## 📞 Need Help?

All TODO comments are marked clearly in the code. Search for `TODO:` to find places that need your specific content.

