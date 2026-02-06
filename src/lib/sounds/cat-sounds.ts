/**
 * Cat Sound Library for Purrify Fun Page
 * 
 * This library provides realistic cat sounds (meows and purrs) for games
 * and interactive features. Sounds are rotated randomly to avoid repetition.
 * 
 * SOUND SOURCES (Free, Royalty-Free):
 * ================================
 * 
 * 1. GOOGLE SOUND LIBRARY (Recommended - Free for commercial use)
 *    - https://developers.google.com/assistant/tools/sound-library/animals
 *    - "Cat Purr" - Continuous purring sound
 *    - "Cat Purr Close" - Close-up purring
 *    - Download: Right-click the audio player → Save audio as
 * 
 * 2. PIXABAY (CC0 - Free for commercial use)
 *    - https://pixabay.com/sound-effects/search/meow/
 *    - Search: "cat meow", "kitten meow", "cat purr"
 *    - Recommended downloads:
 *      * "Cute Cat Meow" by DRAGON-STUDIO
 *      * "Cat Meow Feline" by DRAGON-STUDIO
 *      * "Purring Cat" by DRAGON-STUDIO
 *      * "Kitten Meow" various
 *    - All Pixabay sounds are CC0 (public domain)
 * 
 * 3. FREESOUND (CC0 sounds - Free for commercial use)
 *    - https://freesound.org/search/?q=cat+meow&f=is_remix%3Afalse&w=1&d=0&o=date
 *    - Filter by "Creative Commons 0" license
 *    - Recommended:
 *      * "Cat purring" by cubilon (CC0)
 *      * "Cat Meow" by tuberatanka (CC0)
 *      * "Kitten Meow" various
 *    - Requires free account to download
 * 
 * 4. MIXKIT (Free License)
 *    - https://mixkit.co/free-sound-effects/cat/
 *    - 13 free cat sound effects
 *    - Mixkit License allows commercial use
 * 
 * SETUP INSTRUCTIONS:
 * ==================
 * 1. Download sounds from sources above
 * 2. Convert to MP3 format (if not already)
 * 3. Place files in /public/sounds/cats/ directory
 * 4. Update the soundUrls arrays below with actual filenames
 * 5. Optionally adjust volume levels for each sound
 * 
 * RECOMMENDED SOUND COLLECTION (10-15 sounds):
 * ===========================================
 * MEOWS (8-10 variations):
 * - Standard meow (2-3 variations)
 * - Kitten mew (2 variations) 
 * - Demanding/insistent meow
 * - Happy/greeting meow
 * - Questioning meow (rising tone)
 * - Short chirp/trill
 * - Long drawn-out meow
 * 
 * PURRS (3-5 variations):
 * - Soft gentle purr (short, 2-3 seconds)
 * - Loud content purr (short)
 * - Continuous purr loop (longer, 5-10 seconds)
 * - Happy excited purr
 * - Sleepy relaxed purr
 * 
 * FALLBACK:
 * =========
 * If real sounds aren't available, the system falls back to synthesized
 * Web Audio API sounds that are more realistic than the basic ones.
 */

export interface CatSound {
  url?: string;
  name: string;
  type: 'meow' | 'purr' | 'trill' | 'chirp';
  volume: number;
  duration: number; // in seconds
  fallbackSynth?: () => void;
}

// Real sound files (place these in /public/sounds/cats/)
// Replace these URLs with actual filenames once downloaded
export const REAL_MEOW_SOUNDS: CatSound[] = [
  // Standard meows
  { name: 'meow-standard-1', type: 'meow', volume: 0.7, duration: 0.5 },
  { name: 'meow-standard-2', type: 'meow', volume: 0.7, duration: 0.6 },
  { name: 'meow-happy', type: 'meow', volume: 0.75, duration: 0.4 },
  
  // Kitten mews
  { name: 'kitten-mew-1', type: 'meow', volume: 0.6, duration: 0.3 },
  { name: 'kitten-mew-2', type: 'meow', volume: 0.6, duration: 0.35 },
  
  // Variations
  { name: 'meow-demanding', type: 'meow', volume: 0.8, duration: 0.7 },
  { name: 'meow-question', type: 'meow', volume: 0.7, duration: 0.5 },
  { name: 'meow-greeting', type: 'meow', volume: 0.65, duration: 0.45 },
  { name: 'meow-long', type: 'meow', volume: 0.75, duration: 1.0 },
  
  // Short sounds
  { name: 'trill-short', type: 'trill', volume: 0.5, duration: 0.2 },
  { name: 'chirp-1', type: 'chirp', volume: 0.45, duration: 0.15 },
];

export const REAL_PURR_SOUNDS: CatSound[] = [
  { name: 'purr-soft-short', type: 'purr', volume: 0.5, duration: 2.0 },
  { name: 'purr-loud-short', type: 'purr', volume: 0.6, duration: 2.5 },
  { name: 'purr-happy', type: 'purr', volume: 0.55, duration: 3.0 },
  { name: 'purr-sleepy', type: 'purr', volume: 0.45, duration: 4.0 },
  { name: 'purr-content', type: 'purr', volume: 0.5, duration: 2.5 },
];

// Sound playback state
let audioContext: AudioContext | null = null;
let currentPurrSource: AudioBufferSourceNode | OscillatorNode | null = null;
let soundCache: Map<string, AudioBuffer> = new Map();
let lastMeowIndex = -1;
let lastPurrIndex = -1;

/**
 * Initialize the audio context (must be called after user interaction)
 */
export function initAudioContext(): AudioContext | null {
  if (typeof globalThis.window === 'undefined') return null;
  
  if (!audioContext) {
    try {
      audioContext = new (window.AudioContext || 
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    } catch {
      console.warn('Web Audio API not supported');
      return null;
    }
  }
  
  // Resume if suspended (browser autoplay policy)
  if (audioContext.state === 'suspended') {
    audioContext.resume();
  }
  
  return audioContext;
}

/**
 * Check if real sound files are available
 */
function getSoundPath(sound: CatSound): string | null {
  // Check if file exists by trying to fetch it
  // In production, these would be actual files in /public/sounds/cats/
  const path = `/sounds/cats/${sound.name}.mp3`;
  return path;
}

/**
 * Load a sound file into cache
 */
async function loadSound(sound: CatSound): Promise<AudioBuffer | null> {
  if (!audioContext) return null;
  
  // Check cache first
  if (soundCache.has(sound.name)) {
    return soundCache.get(sound.name)!;
  }
  
  const path = getSoundPath(sound);
  if (!path) return null;
  
  try {
    const response = await fetch(path);
    if (!response.ok) {
      // Sound file doesn't exist yet
      return null;
    }
    
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    
    soundCache.set(sound.name, audioBuffer);
    return audioBuffer;
  } catch {
    return null;
  }
}

/**
 * Play a random meow sound
 * Returns true if played real sound, false if fell back to synth
 */
export async function playRandomMeow(): Promise<boolean> {
  const ctx = initAudioContext();
  if (!ctx) {
    playEnhancedSynthMeow();
    return false;
  }
  
  // Pick a random meow (avoid repeating the same one)
  let meowIndex;
  do {
    meowIndex = Math.floor(Math.random() * REAL_MEOW_SOUNDS.length);
  } while (meowIndex === lastMeowIndex && REAL_MEOW_SOUNDS.length > 1);
  lastMeowIndex = meowIndex;
  
  const meow = REAL_MEOW_SOUNDS[meowIndex];
  
  // Try to load and play real sound
  const buffer = await loadSound(meow);
  
  if (buffer) {
    const source = ctx.createBufferSource();
    const gainNode = ctx.createGain();
    
    source.buffer = buffer;
    gainNode.gain.value = meow.volume;
    
    source.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    source.start();
    return true;
  } else {
    // Fall back to synthesized sound
    playEnhancedSynthMeow();
    return false;
  }
}

/**
 * Play a random purr sound
 * Returns true if played real sound, false if fell back to synth
 */
export async function playRandomPurr(): Promise<boolean> {
  const ctx = initAudioContext();
  if (!ctx) {
    playEnhancedSynthPurr();
    return false;
  }
  
  // Stop any currently playing purr
  stopPurr();
  
  // Pick a random purr
  let purrIndex;
  do {
    purrIndex = Math.floor(Math.random() * REAL_PURR_SOUNDS.length);
  } while (purrIndex === lastPurrIndex && REAL_PURR_SOUNDS.length > 1);
  lastPurrIndex = purrIndex;
  
  const purr = REAL_PURR_SOUNDS[purrIndex];
  
  // Try to load and play real sound
  const buffer = await loadSound(purr);
  
  if (buffer) {
    const source = ctx.createBufferSource();
    const gainNode = ctx.createGain();
    
    source.buffer = buffer;
    gainNode.gain.value = purr.volume;
    
    source.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    source.start();
    currentPurrSource = source;
    return true;
  } else {
    // Fall back to synthesized sound
    playEnhancedSynthPurr();
    return false;
  }
}

/**
 * Start a continuous purr loop
 */
export async function startContinuousPurr(): Promise<void> {
  const ctx = initAudioContext();
  if (!ctx) return;
  
  // For continuous purr, we'll play short purrs in a loop
  // or use a longer purr file if available
  const playNextPurr = async () => {
    if (!audioContext) return;
    
    // Try to find a longer purr sound
    const longPurr = REAL_PURR_SOUNDS.find(p => p.duration >= 3.0) || REAL_PURR_SOUNDS[0];
    
    if (longPurr) {
      const buffer = await loadSound(longPurr);
      if (buffer && audioContext) {
        const source = audioContext.createBufferSource();
        const gainNode = audioContext.createGain();
        
        source.buffer = buffer;
        gainNode.gain.value = longPurr.volume * 0.6; // Slightly quieter for background
        
        source.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        source.onended = () => {
          // Loop the purr
          if (currentPurrSource) {
            setTimeout(playNextPurr, 100);
          }
        };
        
        source.start();
        currentPurrSource = source;
      } else {
        // Fall back to synthesized continuous purr
        playEnhancedSynthPurrContinuous();
      }
    }
  };
  
  stopPurr();
  await playNextPurr();
}

/**
 * Stop any currently playing purr
 */
export function stopPurr(): void {
  if (currentPurrSource) {
    try {
      currentPurrSource.stop();
    } catch {
      // Already stopped
    }
    currentPurrSource = null;
  }
}

/**
 * Enhanced synthesized meow (better than basic osc)
 * Used as fallback when real sounds aren't available
 */
function playEnhancedSynthMeow(): void {
  if (!audioContext) {
    audioContext = initAudioContext();
    if (!audioContext) return;
  }
  
  const ctx = audioContext;
  const t = ctx.currentTime;
  
  // Random meow characteristics
  const meowTypes = [
    { baseFreq: 520, peakFreq: 680, endFreq: 420, duration: 0.45, name: 'standard' },
    { baseFreq: 720, peakFreq: 920, endFreq: 580, duration: 0.35, name: 'kitten' },
    { baseFreq: 420, peakFreq: 550, endFreq: 320, duration: 0.65, name: 'demanding' },
    { baseFreq: 580, peakFreq: 620, endFreq: 480, duration: 0.4, name: 'question' },
    { baseFreq: 480, peakFreq: 720, endFreq: 380, duration: 0.55, name: 'long' },
  ];
  
  const type = meowTypes[Math.floor(Math.random() * meowTypes.length)];
  
  // Main oscillator - triangle wave for more vocal quality
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const filter = ctx.createBiquadFilter();
  
  osc.type = 'triangle';
  
  // Pitch envelope - meow shape (rise then fall)
  osc.frequency.setValueAtTime(type.baseFreq, t);
  osc.frequency.linearRampToValueAtTime(type.peakFreq, t + type.duration * 0.35);
  osc.frequency.exponentialRampToValueAtTime(Math.max(type.endFreq, 100), t + type.duration);
  
  // Filter envelope - simulates mouth opening/closing
  filter.type = 'lowpass';
  filter.Q.value = 2;
  filter.frequency.setValueAtTime(300, t);
  filter.frequency.linearRampToValueAtTime(2500, t + type.duration * 0.3);
  filter.frequency.exponentialRampToValueAtTime(400, t + type.duration);
  
  // Volume envelope
  gain.gain.setValueAtTime(0, t);
  gain.gain.linearRampToValueAtTime(0.25, t + 0.03);
  gain.gain.setValueAtTime(0.25, t + type.duration * 0.8);
  gain.gain.exponentialRampToValueAtTime(0.01, t + type.duration);
  
  // Formant oscillator - adds vocal character (second harmonic)
  const formantOsc = ctx.createOscillator();
  const formantGain = ctx.createGain();
  formantOsc.type = 'sine';
  formantOsc.frequency.setValueAtTime(type.baseFreq * 2, t);
  formantOsc.frequency.linearRampToValueAtTime(type.peakFreq * 2, t + type.duration * 0.35);
  formantOsc.frequency.exponentialRampToValueAtTime(Math.max(type.endFreq * 2, 200), t + type.duration);
  formantGain.gain.value = 0.08;
  
  // Connect
  osc.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);
  
  formantOsc.connect(formantGain);
  formantGain.connect(gain);
  
  // Play
  osc.start(t);
  formantOsc.start(t);
  osc.stop(t + type.duration + 0.05);
  formantOsc.stop(t + type.duration + 0.05);
}

/**
 * Enhanced synthesized purr (short burst)
 */
function playEnhancedSynthPurr(): void {
  if (!audioContext) {
    audioContext = initAudioContext();
    if (!audioContext) return;
  }
  
  const ctx = audioContext;
  const t = ctx.currentTime;
  const duration = 2;
  
  // Purr is a series of low-frequency pulses (25-150 Hz range)
  // We create this with a modulated low-frequency oscillator
  
  const purrOsc = ctx.createOscillator();
  const purrGain = ctx.createGain();
  const modulator = ctx.createOscillator();
  const modulatorGain = ctx.createGain();
  
  // Main low frequency (the purr base)
  purrOsc.type = 'triangle';
  purrOsc.frequency.value = 40;
  
  // Modulator creates the "brrr" pulse effect
  modulator.type = 'sine';
  modulator.frequency.value = 25; // Pulses per second
  
  // Modulation depth
  modulatorGain.gain.value = 30;
  
  // Volume envelope - gentle rise and fall
  purrGain.gain.setValueAtTime(0, t);
  purrGain.gain.linearRampToValueAtTime(0.15, t + 0.2);
  purrGain.gain.setValueAtTime(0.15, t + duration - 0.3);
  purrGain.gain.exponentialRampToValueAtTime(0.01, t + duration);
  
  // Connect modulation
  modulator.connect(modulatorGain);
  modulatorGain.connect(purrOsc.frequency);
  
  // Add some noise for texture
  const bufferSize = ctx.sampleRate * duration;
  const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const noiseData = noiseBuffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    noiseData[i] = (Math.random() * 2 - 1) * 0.1;
  }
  
  const noise = ctx.createBufferSource();
  noise.buffer = noiseBuffer;
  const noiseFilter = ctx.createBiquadFilter();
  const noiseGain = ctx.createGain();
  
  noiseFilter.type = 'lowpass';
  noiseFilter.frequency.value = 200;
  noiseGain.gain.value = 0.05;
  
  // Connect everything
  purrOsc.connect(purrGain);
  purrGain.connect(ctx.destination);
  
  noise.connect(noiseFilter);
  noiseFilter.connect(noiseGain);
  noiseGain.connect(ctx.destination);
  
  // Play
  purrOsc.start(t);
  modulator.start(t);
  noise.start(t);
  
  purrOsc.stop(t + duration);
  modulator.stop(t + duration);
  noise.stop(t + duration);
}

/**
 * Enhanced synthesized continuous purr
 */
function playEnhancedSynthPurrContinuous(): void {
  if (!audioContext) return;
  
  const ctx = audioContext;
  const t = ctx.currentTime;
  const duration = 5;
  
  const purrOsc = ctx.createOscillator();
  const purrGain = ctx.createGain();
  const modulator = ctx.createOscillator();
  const modulatorGain = ctx.createGain();
  
  purrOsc.type = 'triangle';
  purrOsc.frequency.value = 35;
  
  modulator.type = 'sine';
  modulator.frequency.value = 22;
  modulatorGain.gain.value = 25;
  
  // Very gentle volume
  purrGain.gain.value = 0.1;
  
  modulator.connect(modulatorGain);
  modulatorGain.connect(purrOsc.frequency);
  purrOsc.connect(purrGain);
  purrGain.connect(ctx.destination);
  
  purrOsc.start(t);
  modulator.start(t);
  
  // Store reference so we can stop it
  currentPurrSource = purrOsc;
  
  purrOsc.stop(t + duration);
  modulator.stop(t + duration);
}

/**
 * Preload all sounds for better performance
 * Call this when the fun page loads
 */
export async function preloadSounds(): Promise<void> {
  const ctx = initAudioContext();
  if (!ctx) return;
  
  // Load all sounds in parallel
  const allSounds = [...REAL_MEOW_SOUNDS, ...REAL_PURR_SOUNDS];
  await Promise.all(
    allSounds.map(sound => loadSound(sound).catch(() => null))
  );
}

/**
 * Test all sounds - useful for debugging
 */
export async function testAllSounds(): Promise<void> {
  console.log('Testing meow sounds...');
  for (let i = 0; i < 3; i++) {
    await playRandomMeow();
    await new Promise(r => setTimeout(r, 800));
  }
  
  console.log('Testing purr sounds...');
  await playRandomPurr();
  await new Promise(r => setTimeout(r, 3000));
  
  console.log('Sound test complete!');
}
