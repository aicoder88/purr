"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cat, X, Volume2, VolumeX, Sparkles, Heart } from "lucide-react";
import {
  playRandomMeow,
  playRandomPurr,
  startContinuousPurr,
  stopPurr,
  initAudioContext,
  preloadSounds
} from "@/lib/sounds/cat-sounds";

interface Blessing {
  text: string;
  emoji: string;
  type: "blessing" | "fact" | "joke";
}

const BLESSINGS: Blessing[] = [
  // BLESSINGS - Warm, encouraging, cat-themed positivity
  { text: "May your litter box always be fresh and your naps always be long!", emoji: "✨", type: "blessing" },
  { text: "You're absolutely purr-fect just the way you are!", emoji: "😺", type: "blessing" },
  { text: "May your day be filled with unexpected cat cuddles and warm purrs!", emoji: "🤗", type: "blessing" },
  { text: "Your home smells fresher than a field of catnip!", emoji: "🌸", type: "blessing" },
  { text: "You have been officially blessed by the Ancient Cat Goddess!", emoji: "👑", type: "blessing" },
  { text: "May your cat's 3 AM zoomies bring you unexpected joy and laughter!", emoji: "⚡", type: "blessing" },
  { text: "Fresh air, happy purrs, and endless treats are coming your way!", emoji: "🍃", type: "blessing" },
  { text: "Your cat secretly thinks you're the absolute best human in the entire universe!", emoji: "🏆", type: "blessing" },
  { text: "May your furniture remain mysteriously scratch-free this week!", emoji: "🛋️", type: "blessing" },
  { text: "Infinite head boops, slow blinks, and toe beans for you!", emoji: "🐱", type: "blessing" },
  { text: "Time spent with cats is never wasted—and neither is time spent being your amazing self!", emoji: "⏰", type: "blessing" },
  { text: "May you always find the warmest sunbeam to nap in, just like a wise cat!", emoji: "☀️", type: "blessing" },
  { text: "Purr-sistence pays off! Keep being your awesome self!", emoji: "💪", type: "blessing" },
  { text: "May your coffee be hot, your cat be cuddly, and your day be wonderful!", emoji: "☕", type: "blessing" },
  { text: "You radiate the same energy as a cat who knocked something off a table and doesn't care!", emoji: "😎", type: "blessing" },
  { text: "May your troubles be light, your treats be plentiful, and your naps be uninterrupted!", emoji: "🌈", type: "blessing" },
  { text: "You have the confidence of a cat walking across your keyboard during an important meeting!", emoji: "💻", type: "blessing" },
  { text: "May your heart be light, your lap be warm, and your cat always come when called (yeah right)!", emoji: "💝", type: "blessing" },
  { text: "You deserve a standing ovation, or at least a slow blink from a discerning feline!", emoji: "👏", type: "blessing" },
  { text: "May you land on your feet today, just like the graceful cat you are!", emoji: "🐈", type: "blessing" },
  { text: "The universe is sending you extra soft paws and gentle head-butts today!", emoji: "🌟", type: "blessing" },
  { text: "May your day have zero hairballs and maximum happiness!", emoji: "🎉", type: "blessing" },
  { text: "You are as majestic as a cat wearing a tiny crown!", emoji: "👸", type: "blessing" },
  { text: "May your inbox be empty and your cat's love tank be full!", emoji: "📬", type: "blessing" },
  { text: "You possess the rare gift of making cats feel understood!", emoji: "🎁", type: "blessing" },

  // FACTS - Fascinating cat facts that make you go "wow!"
  { text: "A cat's purr vibrates at 25-150 Hz, a frequency range known to promote healing and bone density!", emoji: "🔬", type: "fact" },
  { text: "Cats spend an average of 70% of their lives sleeping—that's about 13-16 hours every single day!", emoji: "😴", type: "fact" },
  { text: "A group of cats is called a 'clowder,' while a group of kittens is called a 'kindle'!", emoji: "👥", type: "fact" },
  { text: "Cats can make over 100 different sounds, while dogs can only make about 10!", emoji: "🎵", type: "fact" },
  { text: "Your cat's nose print is as unique as a human fingerprint—no two cats have the same nose pattern!", emoji: "👃", type: "fact" },
  { text: "Cats have whiskers on their legs as well as their face—these help them sense their surroundings!", emoji: "🐈", type: "fact" },
  { text: "A cat's brain is 90% similar to a human's brain—we're more alike than different!", emoji: "🧠", type: "fact" },
  { text: "Cats can jump up to 6 times their body length in a single bound—that's like a human jumping over a house!", emoji: "🦘", type: "fact" },
  { text: "Ancient Egyptians shaved their eyebrows as a sign of mourning when their cats died!", emoji: "🇪🇬", type: "fact" },
  { text: "Cats can't taste sweetness—their taste buds lack the receptors for sugary flavors!", emoji: "🍬", type: "fact" },
  { text: "A cat has 230 bones in its body—humans only have 206!", emoji: "🦴", type: "fact" },
  { text: "Cats have 32 muscles to control their outer ear—humans only have 6!", emoji: "👂", type: "fact" },
  { text: "The first cat in space was a French cat named Felicette in 1963—she survived the trip!", emoji: "🚀", type: "fact" },
  { text: "A cat's heart beats nearly twice as fast as a human heart—110-140 beats per minute!", emoji: "❤️", type: "fact" },
  { text: "Cats have a third eyelid called a haw that helps protect their eyes and keep them moist!", emoji: "👁️", type: "fact" },
  { text: "The richest cat in the world inherited $13 million from its owner in Italy!", emoji: "💰", type: "fact" },
  { text: "Cats spend 30-50% of their waking hours grooming themselves—that's a lot of spa time!", emoji: "🛁", type: "fact" },
  { text: "A cat's collarbone isn't connected to other bones, allowing them to squeeze through tiny spaces!", emoji: "🦴", type: "fact" },
  { text: "The oldest known pet cat was found in a 9,500-year-old grave in Cyprus—we've loved cats for millennia!", emoji: "🏺", type: "fact" },
  { text: "Cats have 5 toes on their front paws but only 4 on their back paws—unless they're polydactyl!", emoji: "🐾", type: "fact" },
  { text: "A cat's tail helps them balance—it's like their own built-in tightrope walker pole!", emoji: "⚖️", type: "fact" },
  { text: "Cats can rotate their ears 180 degrees and move each ear independently!", emoji: "👂", type: "fact" },
  { text: "The longest domestic cat ever measured was 48.5 inches long—that's over 4 feet of cat!", emoji: "📏", type: "fact" },

  // JOKES - Cat puns and humor
  { text: "Why did the cat sit on the computer? Because it wanted to keep an eye on the mouse!", emoji: "🖱️", type: "joke" },
  { text: "What's a cat's favorite color? Purr-ple, of course!", emoji: "💜", type: "joke" },
  { text: "Why don't cats play poker in the jungle? Too many cheetahs!", emoji: "🃏", type: "joke" },
  { text: "What do you call a pile of cats? A meow-tain!", emoji: "⛰️", type: "joke" },
  { text: "Your cat is definitely plotting to love you... eventually... maybe... on their terms!", emoji: "😼", type: "joke" },
  { text: "What do you call a cat who loves to bowl? An alley cat!", emoji: "🎳", type: "joke" },
  { text: "Why was the cat afraid of the tree? Because of its bark!", emoji: "🌳", type: "joke" },
  { text: "What's a cat's favorite movie? The Sound of Mewsic!", emoji: "🎬", type: "joke" },
  { text: "What do you call a cat who wears make-up? Glamour-puss!", emoji: "💄", type: "joke" },
  { text: "Why did the cat join Instagram? It wanted more followers to ignore!", emoji: "📱", type: "joke" },
  { text: "What do cats like to eat on a hot day? A mice-cream cone!", emoji: "🍦", type: "joke" },
  { text: "Why are cats so good at video games? They have nine lives!", emoji: "🎮", type: "joke" },
  { text: "What's a cat's favorite subject in school? Hiss-tory!", emoji: "📚", type: "joke" },
  { text: "What do you call a cat that's a beauty influencer? A glam-purr model!", emoji: "📸", type: "joke" },
  { text: "Why did the cat buy a smartphone? To take more selfies for their cat-stagram!", emoji: "🤳", type: "joke" },
  { text: "What's a cat's favorite day of the week? Cat-urday!", emoji: "📅", type: "joke" },
  { text: "What do you call a cat who loves to swim? A catfish!", emoji: "🐟", type: "joke" },
  { text: "Why don't cats ever tell secrets? Because they might let the cat out of the bag!", emoji: "🤐", type: "joke" },
  { text: "What's a cat's favorite type of music? Anything with a good beat to nap to!", emoji: "🎵", type: "joke" },
  { text: "What do you call a cat who meditates? Aware!", emoji: "🧘", type: "joke" },
  { text: "Why did the cat join the circus? It was a purr-former at heart!", emoji: "🎪", type: "joke" },
  { text: "What's a cat's favorite breakfast food? Mice Krispies!", emoji: "🥣", type: "joke" },
  { text: "Why do cats make terrible storytellers? They only have one tail!", emoji: "📖", type: "joke" },
];

export function CatBlessingTool() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentBlessing, setCurrentBlessing] = useState<Blessing | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [meowCount, setMeowCount] = useState(0);
  const [isPurring, setIsPurring] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Preload sounds on mount
  useEffect(() => {
    preloadSounds();
  }, []);

  // Play meow sound
  const playMeow = useCallback(async () => {
    if (isMuted) return;

    await playRandomMeow();
  }, [isMuted]);

  // Play purr sound
  const playPurr = useCallback(async () => {
    if (isMuted) return;

    await playRandomPurr();
  }, [isMuted]);

  // Toggle continuous purr
  const togglePurr = useCallback(async () => {
    if (isMuted) return;

    if (isPurring) {
      stopPurr();
      setIsPurring(false);
    } else {
      await startContinuousPurr();
      setIsPurring(true);
    }
  }, [isMuted, isPurring]);

  // Get a random blessing
  const getRandomBlessing = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * BLESSINGS.length);
    return BLESSINGS[randomIndex];
  }, []);

  // Handle the blessing button click
  const handleBlessing = useCallback(() => {
    initAudioContext();
    playMeow();
    setMeowCount((prev) => prev + 1);
    setCurrentBlessing(getRandomBlessing());
    setIsOpen(true);
  }, [playMeow, getRandomBlessing]);

  // Close the blessing popup
  const handleClose = useCallback(() => {
    setIsOpen(false);
    setTimeout(() => setCurrentBlessing(null), 300);
  }, []);

  // Hide the tool completely
  const handleHide = useCallback(() => {
    stopPurr();
    setIsVisible(false);
  }, []);

  // Keyboard shortcut - press 'M' to meow, 'P' to purr
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "m" || e.key === "M") {
        if (!e.ctrlKey && !e.metaKey && !e.altKey) {
          handleBlessing();
        }
      } else if (e.key === "p" || e.key === "P") {
        if (!e.ctrlKey && !e.metaKey && !e.altKey) {
          togglePurr();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleBlessing, togglePurr]);

  // Stop purr on unmount
  useEffect(() => {
    return () => {
      stopPurr();
    };
  }, []);

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
            className={`p-2 rounded-full shadow-lg transition-colors ${isMuted
              ? "bg-red-100 text-red-600 bg-red-900/50 text-red-400"
              : "bg-white bg-gray-800 text-gray-600 text-gray-300 hover:text-purple-500"
              }`}
            aria-label={isMuted ? "Unmute meows" : "Mute meows"}
            title={isMuted ? "Unmute sounds" : "Mute sounds"}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleHide}
            className="p-2 bg-white bg-gray-800 rounded-full shadow-lg text-gray-600 text-gray-300 hover:text-red-500 transition-colors"
            aria-label="Hide blessing tool"
            title="Hide"
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
            <motion.div
              animate={{
                scale: isOpen ? [1, 1.2, 1] : 1,
                rotate: isOpen ? [0, -10, 10, 0] : 0
              }}
              transition={{ duration: 0.4 }}
            >
              <Cat className="w-8 h-8 text-white text-gray-100" />
            </motion.div>

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
            className="absolute inset-0 rounded-full border-2 border-purple-400 border-purple-500"
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
          className="text-xs text-gray-500 text-gray-400 bg-white/80 bg-gray-800/80 px-2 py-1 rounded-full"
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
            className="fixed bottom-28 right-6 z-50 w-80 sm:w-96 max-w-[90vw]"
          >
            <div className="bg-white bg-gray-800 rounded-3xl shadow-2xl p-6 sm:p-8 border-2 border-purple-200 border-purple-800 relative overflow-hidden">
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-100 to-pink-100 from-purple-900/30 to-pink-900/30 rounded-bl-full -mr-10 -mt-10" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-orange-100 to-yellow-100 from-orange-900/20 to-yellow-900/20 rounded-tr-full -ml-8 -mb-8" />

              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-3 right-3 p-2 text-gray-600 hover:text-gray-800 text-gray-400 hover:text-gray-200 transition-colors bg-gray-100 bg-gray-700 rounded-full"
                aria-label="Close blessing"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Content */}
              <div className="relative">
                {/* Type badge */}
                <div className="flex items-center gap-2 mb-4">
                  {currentBlessing.type === "blessing" && (
                    <span className="inline-flex items-center gap-1.5 text-sm font-bold text-pink-600 text-pink-400 bg-pink-100 bg-pink-900/30 px-3 py-1.5 rounded-full">
                      <Heart className="w-4 h-4" />
                      Blessing
                    </span>
                  )}
                  {currentBlessing.type === "fact" && (
                    <span className="inline-flex items-center gap-1.5 text-sm font-bold text-blue-600 text-blue-400 bg-blue-100 bg-blue-900/30 px-3 py-1.5 rounded-full">
                      <Sparkles className="w-4 h-4" />
                      Cat Fact
                    </span>
                  )}
                  {currentBlessing.type === "joke" && (
                    <span className="inline-flex items-center gap-1.5 text-sm font-bold text-orange-600 text-orange-400 bg-orange-100 bg-orange-900/30 px-3 py-1.5 rounded-full">
                      <Cat className="w-4 h-4" />
                      Meow-Joke
                    </span>
                  )}
                </div>

                {/* Emoji */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1, type: "spring" }}
                  className="text-6xl mb-4"
                >
                  {currentBlessing.emoji}
                </motion.div>

                {/* Text */}
                <p className="text-gray-800 text-gray-200 text-lg sm:text-xl font-semibold leading-relaxed">
                  {currentBlessing.text}
                </p>

                {/* Action buttons */}
                <div className="flex gap-3 mt-6">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleBlessing}
                    className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-base font-bold py-3 px-5 rounded-full hover:shadow-lg transition-shadow"
                  >
                    Another! 🎲
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={async () => {
                      await playPurr();
                    }}
                    disabled={isMuted}
                    className="px-5 py-3 text-base font-bold text-purple-600 text-purple-400 hover:text-purple-800 hover:text-purple-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed bg-purple-50 bg-purple-900/20 rounded-full"
                  >
                    💤 Purr
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleClose}
                    className="px-5 py-3 text-base font-bold text-gray-600 text-gray-400 hover:text-gray-800 hover:text-gray-200 transition-colors"
                  >
                    Thanks!
                  </motion.button>
                </div>
              </div>

              {/* Cat paw decorations */}
              <div className="absolute bottom-3 left-3 opacity-20">
                <Cat className="w-8 h-8 text-purple-400 text-purple-300" />
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
      if (typeof globalThis.window !== "undefined") {
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
                x: typeof globalThis.window !== "undefined" ? window.innerWidth - 100 : 0,
                y: typeof globalThis.window !== "undefined" ? window.innerHeight - 100 : 0,
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
