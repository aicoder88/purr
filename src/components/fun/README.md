# 🐱 Cat Blessing Tool

A fun, interactive feature for Purrify that brings joy to cat lovers! Located at `/fun` page.

## Location

Visit **purrify.ca/fun** to play with the Cat Blessing Tool!

## Features

- 🎵 **Synthesized Meow Sounds** - Procedural audio generation creates unique meows every time
- ✨ **Random Blessings** - 19 different cat blessings, facts, and jokes
- 🎊 **Confetti Celebrations** - Special effects every 10 meows
- 🎹 **Keyboard Shortcut** - Press "M" anywhere on the page to meow
- 🔇 **Mute Toggle** - Respectful of user's sound preferences
- 🌙 **Dark Mode Support** - Fully themed for light and dark modes

## Usage

1. **Click the floating cat button** - Get a random blessing with a meow sound
2. **Press "M" key** - Quick keyboard shortcut to meow
3. **Mute/Unmute** - Click the volume icon to toggle sound
4. **Hide the tool** - Click the X to dismiss it completely

## Blessing Types

| Type | Count | Examples |
|------|-------|----------|
| Blessings | 10 | "May your litter box always be fresh!" |
| Facts | 5 | "Cats spend 70% of their lives sleeping!" |
| Jokes | 4 | "What's a cat's favorite color? Purr-ple!" |

## File Structure

```
app/fun/
├── page.tsx                 # Main fun page with instructions
└── CatBlessingToolClient.tsx  # Client wrapper component

src/components/fun/
├── CatBlessingTool.tsx      # Main component with all the magic
├── index.ts                 # Exports
└── README.md                # This file
```

## Technical Details

- Uses Web Audio API for synthesized sounds (no external audio files)
- Framer Motion for smooth animations
- Respects `prefers-reduced-motion` media query
- Stores no user data

## Adding More Blessings

Edit the `BLESSINGS` array in `CatBlessingTool.tsx`:

```typescript
const BLESSINGS: Blessing[] = [
  { text: "Your new blessing here!", emoji: "🐱", type: "blessing" },
  // ... existing blessings
];
```

## Customization

The component uses these color tokens from the Purrify theme:
- `purple-500` / `purple-600` - Primary gradient
- `pink-500` - Secondary gradient
- `orange-400` - Accent color
