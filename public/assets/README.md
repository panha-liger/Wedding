# Wedding Website Assets

Organized folder structure for all wedding page assets.

## Folder Structure

### `/hero`
Hero section (first section) assets:
- `background.jpg` - Main hero background image
- `dove-left.png` - Left dove decoration
- `dove-right.png` - Right dove decoration
- `top-branches.png` - Top foliage decoration

### `/names-banner`
Names banner section assets:
- `couple-wide.jpg` - Full-width couple photo
- `butterfly.png` - Butterfly decoration

### `/story`
Story section ("When Did We Meet?") assets:
- `photo-1.jpg` - First tilted photo card
- `photo-2.jpg` - Second tilted photo card
- `cloud-bottom.png` - Bottom cloud decoration

### `/calendar`
Calendar section assets:
- `calendar-december.png` - Transparent calendar PNG
- `swan-left.png` - Left swan decoration
- `swan-right.png` - Right swan decoration

### `/program`
Program timeline section assets:
- `cupid.png` - Cupid/cherub decoration
- `timeline-photo-1.jpg` - Day 1 timeline photo
- `timeline-photo-2.jpg` - Day 2 timeline photo
- `timeline-photo-3.jpg` - Additional timeline photo
- `couple-walking.jpg` - Bottom couple walking image

### `/map`
Map section assets:
- `swan-left.png` - Left swan (can share with calendar)
- `swan-right.png` - Right swan (can share with calendar)
- `cloud-decoration.png` - Cloud decoration

### `/decorations`
Reusable decorations across sections:
- `cloud-watercolor-1.png`
- `cloud-watercolor-2.png`
- `leaves-green.png`
- Any other reusable decorative elements

## Usage

Import in your components:
```tsx
import heroBackground from '@/public/assets/hero/background.jpg'
import Image from 'next/image'

<Image src={heroBackground} alt="" fill className="object-cover" />
```

