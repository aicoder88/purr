# 🐱 Purrify Fun Page - Cat Arcade & Blessing Corner

A collection of fun, interactive cat-themed mini-games and tools for the Purrify website.

## Location

Visit **purrify.ca/fun** to play!

## Games & Features

### 1. 🙏 Cat Blessing Tool
A floating interactive cat button that follows you around the site!

**Features:**
- 🎵 **Realistic Meow Sounds** - Randomly rotated from a library of cat sounds
- 💤 **Purr Button** - Get a soothing purr sound when you click "Purr"
- ✨ **50+ Blessings** - Cat blessings, facts, and jokes
- 🎊 **Confetti Celebrations** - Special effects every 10 meows
- 🎹 **Keyboard Shortcuts:**
  - Press **M** anywhere → Meow & get blessing
- 🔇 **Mute Toggle** - Respectful of user's sound preferences

### 2. 🐭 Catch the Cat! (Whac-A-Mouse)
A reflex-testing game where you catch cats popping out of holes.

**Features:**
- 🎵 Realistic meow sounds on each catch
- 🔥 **Combo System** - Build streaks for bonus points
- ⚡ Speed increases as your score goes up
- 🎯 Floating text effects (+1, combos)
- 🏆 High score saved locally

### 3. 🔴 Laser Chase
Catch the moving laser dot before it gets away!

**Features:**
- 🎵 Meow sounds on successful catches
- 🔥 Combo streak system
- ⚡ Speed increases with score
- ✨ Particle explosion effects
- ⏱️ 30-second rounds

### 4. 🧠 Cat Trivia
Test your feline knowledge!

**Features:**
- 🎵 Sounds for correct/incorrect answers
- 📚 8 challenging questions
- 🔥 Streak counter
- 📊 Progress bar
- 🏆 Different endings based on score

### 5. ✨ Cat Name Oracle
Generate the perfect name for your furry friend.

**Features:**
- 🎵 Meow when generating, purr when copying
- 🎭 Multiple name types: Royal, Food, Space, Classic
- 📜 Name history (last 5 names)
- 📋 One-click copy to clipboard

## Sound System

### Overview
The games now use a sophisticated sound system that:
- **Rotates through multiple realistic meow sounds** (no more repetitive synthetic beeps!)
- **Includes purr sounds** for relaxation and feedback
- **Falls back to enhanced synthesized sounds** if real audio isn't available

### Adding Real Cat Sounds

#### Step 1: Download Sounds (Free Sources)

**Option A: Google Sound Library (Easiest)**
- Visit: https://developers.google.com/assistant/tools/sound-library/animals
- Download: "Cat Purr", "Cat Purr Close"
- Free for commercial use

**Option B: Pixabay (Best Variety)**
- Visit: https://pixabay.com/sound-effects/search/meow/
- Recommended downloads:
  - "Cute Cat Meow" by DRAGON-STUDIO
  - "Cat Meow Feline" by DRAGON-STUDIO  
  - "Purring Cat" by DRAGON-STUDIO
  - Search "kitten meow" for variety
- All CC0 (public domain)

**Option C: Freesound**
- Visit: https://freesound.org/search/?q=cat+meow
- Filter by "Creative Commons 0" license
- Recommended: "Cat purring" by cubilon
- Requires free account

#### Step 2: Prepare Files

1. Convert all sounds to **MP3 format**
2. Rename files to match these names:
   ```
   /public/sounds/cats/
   ├── meow-standard-1.mp3
   ├── meow-standard-2.mp3
   ├── meow-happy.mp3
   ├── kitten-mew-1.mp3
   ├── kitten-mew-2.mp3
   ├── meow-demanding.mp3
   ├── meow-question.mp3
   ├── meow-greeting.mp3
   ├── meow-long.mp3
   ├── trill-short.mp3
   ├── chirp-1.mp3
   ├── purr-soft-short.mp3
   ├── purr-loud-short.mp3
   ├── purr-happy.mp3
   ├── purr-sleepy.mp3
   └── purr-content.mp3
   ```

#### Step 3: Deploy
Just place the files in `/public/sounds/cats/` and they'll be automatically used!

### Sound Configuration

Edit `/src/lib/sounds/cat-sounds.ts` to:
- Adjust volume levels per sound
- Add new sounds to the rotation
- Change the fallback synthesis parameters

## Technical Details

### File Structure
```
app/fun/
├── page.tsx                    # Main fun page
└── CatBlessingToolClient.tsx   # Client wrapper

src/components/fun/
├── CatBlessingTool.tsx         # Floating blessing button
├── WhacAMouse.tsx              # Whac-a-mole style game
├── LaserChase.tsx              # Laser pointer chase game
├── CatTrivia.tsx               # Quiz game
├── CatNameGenerator.tsx        # Name generator
├── index.ts                    # Exports
└── README.md                   # This file

src/lib/sounds/
└── cat-sounds.ts               # Sound system

public/sounds/cats/             # Real sound files (add these!)
├── *.mp3
```

### Key Dependencies
- `framer-motion` - Animations
- `lucide-react` - Icons
- Web Audio API - Sound synthesis (fallback)

### Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Requires user interaction before playing sounds (browser autoplay policy)
- Respects `prefers-reduced-motion` media query

### Performance Notes
- Sounds are cached after first load
- Lazy initialization of AudioContext
- Minimal re-renders with proper state management

## Customization

### Adding New Blessings
Edit `BLESSINGS` array in `CatBlessingTool.tsx`:

```typescript
const BLESSINGS: Blessing[] = [
  { text: "Your blessing here!", emoji: "🐱", type: "blessing" },
  { text: "Fun fact here!", emoji: "🔬", type: "fact" },
  { text: "Joke here!", emoji: "😹", type: "joke" },
];
```

### Adding New Trivia Questions
Edit `QUESTIONS` array in `CatTrivia.tsx`:

```typescript
{
    id: 9,
    question: "Your question here?",
    options: ["Option A", "Option B", "Option C", "Option D"],
    correctAnswer: 0,
    fact: "The explanation here!",
    emoji: "🐱"
}
```

### Adding New Name Types
Edit the name arrays in `CatNameGenerator.tsx`:

```typescript
const PREFIXES = ["Sir", "Captain", ...];
const ADJECTIVES = ["Fluffy", "Zoomy", ...];
const NOUNS = ["Beans", "Paws", ...];
const FOOD_NAMES = ["Mochi", "Tofu", ...];
const CELESTIAL_NAMES = ["Luna", "Nova", ...];
```

## Future Enhancements

Ideas for making it even more fun:
- [ ] Global leaderboard for high scores
- [ ] Achievement system (badges for milestones)
- [ ] More mini-games (cat puzzle, memory match)
- [ ] Share scores to social media
- [ ] Customizable cat avatars
- [ ] Seasonal/holiday themes

---

**Made with 💜, 🧶, and too much caffeine by the Purrify Team.**
