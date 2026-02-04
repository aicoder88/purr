"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Copy, RefreshCw, Cat, Crown, Heart, Star, PartyPopper } from "lucide-react";
import { playRandomMeow, playRandomPurr, initAudioContext } from "@/lib/sounds/cat-sounds";

const PREFIXES = [
    "Sir", "Lady", "Captain", "Doctor", "Professor", "Little", "Big", "Mr.", "Mrs.",
    "Prince", "Princess", "Agent", "Lord", "Duke", "Baron", "Count"
];

const ADJECTIVES = [
    "Fluffy", "Fuzzy", "Grumpy", "Sleepy", "Zoomy", "Hungry", "Cuddly", "Silly",
    "Brave", "Tiny", "Mega", "Majestic", "Spicy", "Chonky", "Smol", "Nosy",
    "Lazy", "Zesty", "Wiggly", "Sneaky", "Curious", "Fancy", "Derpy", "Cosmic"
];

const NOUNS = [
    "Beans", "Whiskers", "Paws", "Tail", "Purr", "Meow", "Scratch", "Nap",
    "Treat", "Muffin", "Cookie", "Nugget", "Toes", "Nose", "Floof", "Boop",
    "Zoom", "Blep", "Mlem", "Tum", "Squish", "Squash", "Patch", "Spot"
];

const FOOD_NAMES = [
    "Mochi", "Tofu", "Noodle", "Sushi", "Brie", "Olive", "Peanut", "Waffle",
    "Bagel", "Taco", "Nacho", "Pickle", "Dumpling", "Pretzel", "Biscuit",
    "Pepper", "Cinnamon", "Ginger", "Pumpkin", "Peach", "Mango", "Coco"
];

const CELESTIAL_NAMES = [
    "Luna", "Stella", "Cosmo", "Nova", "Orion", "Celeste", "Astra", "Comet",
    "Nebula", "Galaxy", "Starlight", "Moonbeam", "Eclipse", "Sol", "Aurora"
];

interface GeneratedName {
    full: string;
    type: 'fancy' | 'food' | 'celestial' | 'compound';
}

function generateCatName(): GeneratedName {
    const type = Math.random();

    if (type < 0.3) {
        // Fancy name: Prefix + Adjective + Noun
        return {
            full: `${PREFIXES[Math.floor(Math.random() * PREFIXES.length)]} ${ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)]} ${NOUNS[Math.floor(Math.random() * NOUNS.length)]}`,
            type: 'fancy'
        };
    } else if (type < 0.55) {
        // Food name
        return {
            full: FOOD_NAMES[Math.floor(Math.random() * FOOD_NAMES.length)],
            type: 'food'
        };
    } else if (type < 0.75) {
        // Celestial name
        return {
            full: CELESTIAL_NAMES[Math.floor(Math.random() * CELESTIAL_NAMES.length)],
            type: 'celestial'
        };
    } else if (type < 0.9) {
        // Compound: Adjective + Noun
        return {
            full: `${ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)]} ${NOUNS[Math.floor(Math.random() * NOUNS.length)]}`,
            type: 'compound'
        };
    } else {
        // Double food combo
        const food1 = FOOD_NAMES[Math.floor(Math.random() * FOOD_NAMES.length)];
        const food2 = FOOD_NAMES[Math.floor(Math.random() * FOOD_NAMES.length)];
        return {
            full: `${food1}-${food2}`,
            type: 'food'
        };
    }
}

function getNameIcon(type: string) {
    switch (type) {
        case 'fancy': return <Crown className="w-5 h-5 text-yellow-500 dark:text-yellow-400" />;
        case 'food': return <Heart className="w-5 h-5 text-pink-500 dark:text-pink-400" />;
        case 'celestial': return <Star className="w-5 h-5 text-purple-500 dark:text-purple-400" />;
        default: return <Cat className="w-5 h-5 text-blue-500 dark:text-blue-400" />;
    }
}

function getNameTypeLabel(type: string) {
    switch (type) {
        case 'fancy': return 'Royal Title';
        case 'food': return 'Snack Name';
        case 'celestial': return 'Space Name';
        default: return 'Classic';
    }
}

export function CatNameGenerator() {
    const [generatedName, setGeneratedName] = useState<GeneratedName | null>(null);
    const [copied, setCopied] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const [history, setHistory] = useState<GeneratedName[]>([]);

    // Generate a name on mount
    useEffect(() => {
        const name = generateCatName();
        setGeneratedName(name);
    }, []);

    const generateName = useCallback(() => {
        initAudioContext();
        setIsGenerating(true);

        // Play sound
        playRandomMeow();

        // Small delay for animation effect
        setTimeout(() => {
            const newName = generateCatName();
            setGeneratedName(newName);
            setHistory(prev => [newName, ...prev].slice(0, 5));
            setCopied(false);
            setIsGenerating(false);
        }, 200);
    }, []);

    const copyToClipboard = useCallback(() => {
        if (!generatedName) return;

        navigator.clipboard.writeText(generatedName.full);
        setCopied(true);
        playRandomPurr();
        setTimeout(() => setCopied(false), 2000);
    }, [generatedName]);

    return (
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-purple-200 dark:border-purple-800 w-full max-w-sm mx-auto">
            {/* Header */}
            <div className="text-center mb-6">
                <motion.div
                    className="bg-gradient-to-br from-pink-100 to-purple-100 dark:from-pink-900/30 dark:to-purple-900/30 w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-3"
                    whileHover={{ rotate: 10, scale: 1.1 }}
                >
                    <Sparkles className="w-7 h-7 text-pink-500 dark:text-pink-400" />
                </motion.div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-1">
                    Cat Name Oracle
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    Discover your kitty's true identity
                </p>
            </div>

            {/* Name Display */}
            <div className="bg-gradient-to-br from-gray-50 to-purple-50 dark:from-gray-900 dark:to-purple-900/20 rounded-2xl p-6 mb-4 relative group border-2 border-purple-100 dark:border-purple-800/50">
                {/* Type badge */}
                {generatedName && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-white dark:bg-gray-800 px-3 py-1 rounded-full shadow-md border border-purple-100 dark:border-purple-800"
                    >
                        {getNameIcon(generatedName.type)}
                        <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                            {getNameTypeLabel(generatedName.type)}
                        </span>
                    </motion.div>
                )}

                {/* Name */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={generatedName?.full}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-center min-h-[60px] flex items-center justify-center"
                    >
                        <h2 className="text-2xl md:text-3xl font-black bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent break-words leading-tight">
                            {generatedName?.full || '...'}
                        </h2>
                    </motion.div>
                </AnimatePresence>

                {/* Copy button */}
                <motion.button
                    onClick={copyToClipboard}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute top-3 right-3 p-2 text-gray-400 dark:text-gray-500 hover:text-purple-500 dark:hover:text-purple-400 transition-colors bg-white dark:bg-gray-700 rounded-full shadow-sm"
                    title="Copy name"
                >
                    {copied ? (
                        <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="text-green-500"
                        >
                            <PartyPopper className="w-4 h-4" />
                        </motion.span>
                    ) : (
                        <Copy className="w-4 h-4" />
                    )}
                </motion.button>

                {/* Copied tooltip */}
                <AnimatePresence>
                    {copied && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full"
                        >
                            Copied!
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Generate button */}
            <motion.button
                onClick={generateName}
                disabled={isGenerating}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-70 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-purple-500/25"
            >
                <motion.div
                    animate={isGenerating ? { rotate: 360 } : { rotate: 0 }}
                    transition={{ duration: 0.5, repeat: isGenerating ? Infinity : 0 }}
                >
                    <RefreshCw className="w-5 h-5" />
                </motion.div>
                {isGenerating ? 'Consulting the Oracle...' : 'Generate New Name'}
            </motion.button>

            {/* History */}
            {history.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-xs text-gray-400 dark:text-gray-500 mb-2 text-center">
                        Previous names
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center">
                        {history.slice(0, 3).map((name, idx) => (
                            <motion.button
                                key={`${name.full}-${idx}`}
                                onClick={() => {
                                    setGeneratedName(name);
                                    playRandomMeow();
                                }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-3 py-1.5 rounded-full hover:bg-purple-100 dark:hover:bg-purple-900/30 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                            >
                                {name.full}
                            </motion.button>
                        ))}
                    </div>
                </div>
            )}

            {/* Fun footer */}
            <p className="text-center text-xs text-gray-400 dark:text-gray-500 mt-4">
                Every cat deserves a legendary name 🐱✨
            </p>
        </div>
    );
}
