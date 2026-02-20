# Cat Sound Files Setup Guide

This directory is where you place the real cat sound files (.mp3 format).

## Quick Start

### Option 1: Download Pre-made Pack (Easiest)
Download free cat sound packs from:
- **Pixabay**: https://pixabay.com/sound-effects/search/meow/
- **Mixkit**: https://mixkit.co/free-sound-effects/cat/

### Option 2: Curated Selection (Recommended)

#### Step 1: Download these specific sounds from Pixabay

**Meows (Download 8-10 of these):**
1. Search "cute cat meow" → Download "Cute Cat Meow" by DRAGON-STUDIO
2. Search "cat meow" → Download various short meows
3. Search "kitten meow" → Download 2-3 kitten sounds
4. Search "cat chirp" → Download trill/chirp sounds

**Purrs (Download 3-5 of these):**
1. Search "cat purr" → Download "Purring Cat" by DRAGON-STUDIO
2. Download variations: soft purr, loud purr, content purr

#### Step 2: Rename Files

Rename your downloaded files to these exact names:

```
meow-standard-1.mp3      (Standard adult cat meow)
meow-standard-2.mp3      (Different adult meow)
meow-happy.mp3           (Happy/upbeat meow)
kitten-mew-1.mp3         (High-pitched kitten sound)
kitten-mew-2.mp3         (Different kitten sound)
meow-demanding.mp3       (Longer, insistent meow)
meow-question.mp3        (Rising tone questioning meow)
meow-greeting.mp3        (Short friendly meow)
meow-long.mp3            (Long drawn-out meow)
trill-short.mp3          (Short trill/chirp)
chirp-1.mp3              (Bird-like chirp)
purr-soft-short.mp3      (Gentle 2-second purr)
purr-loud-short.mp3      (Louder 2-second purr)
purr-happy.mp3           (Happy/excited purr)
purr-sleepy.mp3          (Relaxed sleepy purr)
purr-content.mp3         (Contentment purr)
```

#### Step 3: Place Files

Copy all renamed `.mp3` files into this directory:
```
/public/sounds/cats/
```

#### Step 4: Test

1. Visit the /fun page
2. Click the floating cat button
3. You should hear realistic meows!
4. Try the games - they should have varied meow sounds

## Alternative: Google Sound Library

For purrs specifically, Google's library is excellent:

1. Go to: https://developers.google.com/assistant/tools/sound-library/animals
2. Find "Cat Purr" and "Cat Purr Close"
3. Right-click the audio player → "Save audio as..."
4. Convert to MP3 if needed (they may download as .wav)
5. Rename to `purr-soft-short.mp3` and `purr-loud-short.mp3`

## Sound Quality Tips

- **Format**: MP3 is preferred (good compression, universal support)
- **Bitrate**: 128kbps or higher for good quality
- **Length**: 
  - Meows: 0.2 - 1.5 seconds
  - Purrs: 2 - 5 seconds (they'll loop if needed)
- **Volume**: Sounds should be normalized to similar levels

## Troubleshooting

### Sounds not playing?
1. Check browser console for 404 errors
2. Verify file names match exactly (case-sensitive)
3. Ensure files are actually MP3 format
4. Check that files are in `/public/sounds/cats/`

### Sounds too quiet/loud?
Edit `/src/lib/sounds/cat-sounds.ts` and adjust the `volume` values (0.0 to 1.0).

### Want to add more sounds?
1. Add new entry to `REAL_MEOW_SOUNDS` or `REAL_PURR_SOUNDS` arrays
2. Place the MP3 file in this directory
3. Match the `name` field to the filename (without .mp3)

## License Notes

All sounds placed here should be:
- **CC0 (Public Domain)** - No attribution required
- **Royalty-free with commercial license** - For business use

**Recommended sources that meet these criteria:**
- Pixabay (all sounds are CC0)
- Google Sound Library (free for commercial use)
- Freesound (filter by CC0 license)
- Mixkit (free license)

**Avoid:**
- Sounds with "Attribution" licenses (requires credit)
- Copyrighted sounds from movies/TV
- Sounds marked "Non-Commercial"

---

**Questions?** The games will work without these files - they'll just use enhanced synthesized sounds as fallback!
