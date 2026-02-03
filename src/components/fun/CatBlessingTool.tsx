"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cat, X, Volume2, VolumeX, Sparkles, Heart } from "lucide-react";

interface Blessing {
  text: string;
  emoji: string;
  type: "blessing" | "fact" | "joke";
}

const BLESSINGS: Blessing[] = [
  { text: "May your litter box always be fresh!", emoji: "✨", type: "blessing" },
  { text: "You're purr-fect just the way you are!", emoji: "😺", type: "blessing" },
  { text: "May your day be filled with cat cuddles!", emoji: "🤗", type: "blessing" },
  { text: "Your home smells amazing today!", emoji: "🌸", type: "blessing" },
  { text: "You've been blessed by the Cat Goddess!", emoji: "👑", type: "blessing" },
  { text: "May your cat's zoomies bring you joy!", emoji: "⚡", type: "blessing" },
  { text: "Fresh air and happy purrs coming your way!", emoji: "🍃", type: "blessing" },
  { text: "Your cat thinks you're the best human ever!", emoji: "🏆", type: "blessing" },
  { text: "May your furniture remain scratch-free!", emoji: "🛋️", type: "blessing" },
  { text: "Infinite head boops for you!", emoji: "🐱", type: "blessing" },
  { text: "A cat's purr vibrates at 25-150 Hz, which can promote healing!", emoji: "🔬", type: "fact" },
  { text: "Cats spend 70% of their lives sleeping!", emoji: "😴", type: "fact" },
  { text: "A group of cats is called a 'clowder'!", emoji: "👥", type: "fact" },
  { text: "Cats can make over 100 different sounds!", emoji: "🎵", type: "fact" },
  { text: "Your cat's nose print is unique, like a human fingerprint!", emoji: "👃", type: "fact" },
  { text: "Why did the cat sit on the computer? To keep an eye on the mouse!", emoji: "🖱️", type: "joke" },
  { text: "What's a cat's favorite color? Purr-ple!", emoji: "💜", type: "joke" },
  { text: "Why don't cats play poker? Too many cheetahs!", emoji: "🃏", type: "joke" },
  { text: "What do you call a pile of cats? A meow-tain!", emoji: "⛰️", type: "joke" },
  { text: "Time spent with cats is never wasted!", emoji: "⏰", type: "blessing" },
];

// Meow frequencies for different meow types
const MEOW_PITCHES = [
  { freq: 800, duration: 200 },    // Short meow
  { freq: 600, duration: 400 },    // Long meow
  { freq: 1000, duration: 150 },   // High pitched
  { freq: 500, duration: 300 },    // Low meow
  { freq: 700, duration: 250 },    // Standard meow
];

export function CatBlessingTool() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentBlessing, setCurrentBlessing] = useState<Blessing | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [meowCount, setMeowCount] = useState(0);
  const audioContextRef = useRef<AudioContext | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Initialize audio context on first user interaction
  const initAudio = useCallback(() => {
    if (!audioContextRef.current && typeof window !== "undefined") {
      try {
        audioContextRef.current = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      } catch {
        // Audio not supported
      }
    }
  }, []);

  // Play a synthesized meow sound
  const playMeow = useCallback(() => {
    if (isMuted || !audioContextRef.current) return;

    try {
      const ctx = audioContextRef.current;
      const pitch = MEOW_PITCHES[Math.floor(Math.random() * MEOW_PITCHES.length)];
      
      // Create oscillator for the meow
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      oscillator.type = "sawtooth";
      oscillator.frequency.setValueAtTime(pitch.freq, ctx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(pitch.freq * 0.7, ctx.currentTime + pitch.duration / 1000);

      // Add some warmth with a lowpass filter
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(2000, ctx.currentTime);
      filter.Q.value = 5;

      // Envelope for natural sound
      gainNode.gain.setValueAtTime(0, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.05);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + pitch.duration / 1000);

      oscillator.connect(filter);
      filter.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + pitch.duration / 1000);
    } catch {
      // Silent fail if audio doesn't work
    }
  }, [isMuted]);

  // Get a random blessing
  const getRandomBlessing = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * BLESSINGS.length);
    return BLESSINGS[randomIndex];
  }, []);

  // Handle the blessing button click
  const handleBlessing = useCallback(() => {
    initAudio();
    playMeow();
    setMeowCount((prev) => prev + 1);
    setCurrentBlessing(getRandomBlessing());
    setIsOpen(true);
  }, [initAudio, playMeow, getRandomBlessing]);

  // Close the blessing popup
  const handleClose = useCallback(() => {
    setIsOpen(false);
    setTimeout(() => setCurrentBlessing(null), 300);
  }, []);

  // Hide the tool completely
  const handleHide = useCallback(() => {
    setIsVisible(false);
  }, []);

  // Keyboard shortcut - press 'M' to meow
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "m" || e.key === "M") {
        if (!e.ctrlKey && !e.metaKey && !e.altKey) {
          handleBlessing();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleBlessing]);

  // Don't render if hidden or reduced motion preference
  if (!isVisible) return null;

  return (
    <>
      {/* Floating Cat Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, type: "spring", stiffness: 200 }}
      >
        {/* Meow Counter Badge */}
        {meowCount > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg"
          >
            {meowCount} meow{meowCount !== 1 ? "s" : ""}!
          </motion.div>
        )}

        {/* Controls */}
        <div className="flex items-center gap-2 mb-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMuted(!isMuted)}
            className="p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg text-gray-600 dark:text-gray-300 hover:text-purple-500 transition-colors"
            aria-label={isMuted ? "Unmute meows" : "Mute meows"}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleHide}
            className="p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg text-gray-600 dark:text-gray-300 hover:text-red-500 transition-colors"
            aria-label="Hide blessing tool"
          >
            <X className="w-4 h-4" />
          </motion.button>
        </div>

        {/* Main Cat Button */}
        <motion.button
          ref={buttonRef}
          onClick={handleBlessing}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={{
            y: [0, -5, 0],
          }}
          transition={{
            y: {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
          className="relative group"
          aria-label="Get a cat blessing"
        >
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
          
          {/* Button */}
          <div className="relative w-16 h-16 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 rounded-full shadow-2xl flex items-center justify-center overflow-hidden">
            <Cat className="w-8 h-8 text-white" />
            
            {/* Sparkle effects */}
            <motion.div
              className="absolute inset-0"
              animate={{
                background: [
                  "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.3) 0%, transparent 50%)",
                  "radial-gradient(circle at 70% 70%, rgba(255,255,255,0.3) 0%, transparent 50%)",
                  "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.3) 0%, transparent 50%)",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </div>

          {/* Pulsing rings */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-purple-400"
            animate={{
              scale: [1, 1.5, 1.5],
              opacity: [0.5, 0, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
        </motion.button>

        {/* Hint text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3 }}
          className="text-xs text-gray-500 dark:text-gray-400 bg-white/80 dark:bg-gray-800/80 px-2 py-1 rounded-full"
        >
          Press M to meow!
        </motion.p>
      </motion.div>

      {/* Blessing Popup */}
      <AnimatePresence>
        {isOpen && currentBlessing && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 50 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="fixed bottom-28 right-6 z-50 max-w-xs"
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-5 border-2 border-purple-200 dark:border-purple-800 relative overflow-hidden">
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-bl-full -mr-10 -mt-10" />
              
              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-2 right-2 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                aria-label="Close blessing"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Content */}
              <div className="relative">
                {/* Type badge */}
                <div className="flex items-center gap-1 mb-2">
                  {currentBlessing.type === "blessing" && (
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-pink-600 dark:text-pink-400 bg-pink-100 dark:bg-pink-900/30 px-2 py-0.5 rounded-full">
                      <Heart className="w-3 h-3" />
                      Blessing
                    </span>
                  )}
                  {currentBlessing.type === "fact" && (
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 px-2 py-0.5 rounded-full">
                      <Sparkles className="w-3 h-3" />
                      Cat Fact
                    </span>
                  )}
                  {currentBlessing.type === "joke" && (
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-900/30 px-2 py-0.5 rounded-full">
                      <Cat className="w-3 h-3" />
                      Meow-Joke
                    </span>
                  )}
                </div>

                {/* Emoji */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1, type: "spring" }}
                  className="text-4xl mb-3"
                >
                  {currentBlessing.emoji}
                </motion.div>

                {/* Text */}
                <p className="text-gray-800 dark:text-gray-200 font-medium leading-relaxed">
                  {currentBlessing.text}
                </p>

                {/* Action buttons */}
                <div className="flex gap-2 mt-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleBlessing}
                    className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-medium py-2 px-4 rounded-full hover:shadow-lg transition-shadow"
                  >
                    Another!
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleClose}
                    className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
                  >
                    Thanks!
                  </motion.button>
                </div>
              </div>

              {/* Cat paw decorations */}
              <div className="absolute bottom-2 left-2 opacity-20">
                <Cat className="w-6 h-6 text-purple-400" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confetti effect for milestone meows */}
      <ConfettiEffect meowCount={meowCount} />
    </>
  );
}


// Separate component for confetti to properly handle random values
interface ConfettiItem {
  id: number;
  emoji: string;
  x: number;
  y: number;
  rotate: number;
}

interface ConfettiEffectProps {
  meowCount: number;
}

function ConfettiEffect({ meowCount }: ConfettiEffectProps) {
  const [confettiItems, setConfettiItems] = useState<ConfettiItem[]>([]);
  const prevMilestoneRef = useRef(0);

  useEffect(() => {
    // Only generate new confetti when we hit a new milestone (every 10 meows)
    const currentMilestone = Math.floor(meowCount / 10);
    if (meowCount > 0 && currentMilestone > prevMilestoneRef.current) {
      prevMilestoneRef.current = currentMilestone;
      if (typeof window !== "undefined") {
        const newItems: ConfettiItem[] = [...Array(20)].map((_, i) => ({
          id: i,
          emoji: ["🎉", "✨", "🐱", "💖", "🌟"][i % 5],
          x: window.innerWidth - 100 + (Math.random() - 0.5) * 400,
          y: window.innerHeight - 200 - Math.random() * 400,
          rotate: Math.random() * 360,
        }));
        setConfettiItems(newItems);
        
        // Clear confetti after animation
        const timer = setTimeout(() => {
          setConfettiItems([]);
        }, 2500);
        return () => clearTimeout(timer);
      }
    }
  }, [meowCount]);

  return (
    <AnimatePresence>
      {confettiItems.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 pointer-events-none z-40"
        >
          {confettiItems.map((item, i) => (
            <motion.div
              key={`${meowCount}-${item.id}`}
              initial={{
                x: typeof window !== "undefined" ? window.innerWidth - 100 : 0,
                y: typeof window !== "undefined" ? window.innerHeight - 100 : 0,
                scale: 0,
              }}
              animate={{
                x: item.x,
                y: item.y,
                scale: [0, 1, 0],
                rotate: item.rotate,
              }}
              transition={{
                duration: 1.5,
                delay: i * 0.05,
                ease: "easeOut",
              }}
              className="absolute text-2xl"
            >
              {item.emoji}
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
