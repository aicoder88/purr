"use client";

import { useState } from "react";
import { Sparkles, Copy, RefreshCw } from "lucide-react";

const PREFIXES = [
    "Sir", "Lady", "Captain", "Doctor", "Professor", "Little", "Big", "Mr.", "Mrs.", "Prince", "Princess", "Agent"
];

const ADJECTIVES = [
    "Fluffy", "Fuzzy", "Grumpy", "Sleepy", "Zoomy", "Hungry", "Cuddly", "Silly", "Braver", "Tiny", "Mega", "Majestic"
];

const NOUNS = [
    "Beans", "Whisker", "Paw", "Tail", "Purr", "Meow", "Scratch", "Nap", "Treat", "Muffin", "Cookie", "Nugget"
];

const FOOD_NAMES = [
    "Mochi", "Tofu", "Noodle", "Sushi", "Brie", "Olive", "Peanut", "Waffle", "Bagel", "Taco", "Nacho", "Pickle"
];

export function CatNameGenerator() {
    const [generatedName, setGeneratedName] = useState("");
    const [copied, setCopied] = useState(false);

    // Generate a name on mount
    useState(() => {
        generateName();
    });

    function generateName() {
        const type = Math.random();
        let name = "";

        if (type < 0.4) {
            // Fancy name: Prefix + Adjective + Noun
            name = `${PREFIXES[Math.floor(Math.random() * PREFIXES.length)]} ${ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)]} ${NOUNS[Math.floor(Math.random() * NOUNS.length)]}`;
        } else if (type < 0.7) {
            // Food name
            name = FOOD_NAMES[Math.floor(Math.random() * FOOD_NAMES.length)];
        } else {
            // Adjective + Noun
            name = `${ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)]} ${NOUNS[Math.floor(Math.random() * NOUNS.length)]}`;
        }

        setGeneratedName(name);
        setCopied(false);
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(generatedName);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-purple-200 dark:border-purple-800 w-full max-w-sm mx-auto text-center h-full flex flex-col justify-between">
            <div>
                <div className="bg-pink-100 dark:bg-pink-900/30 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-6 h-6 text-pink-500" />
                </div>
                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200 mb-2">Needs a Name?</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                    Find the perfect moniker for your feline friend.
                </p>
            </div>

            <div className="bg-gray-100 dark:bg-gray-900 rounded-xl p-6 mb-6 relative group">
                <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent break-words">
                    {generatedName}
                </div>

                <button
                    onClick={copyToClipboard}
                    className="absolute top-2 right-2 p-2 text-gray-400 hover:text-purple-500 transition-colors opacity-0 group-hover:opacity-100"
                    title="Copy name"
                >
                    {copied ? <span className="text-green-500 text-xs font-bold">Copied!</span> : <Copy className="w-4 h-4" />}
                </button>
            </div>

            <button
                onClick={generateName}
                className="w-full bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 hover:border-purple-500 dark:hover:border-purple-500 text-gray-700 dark:text-gray-200 font-medium py-2 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors group"
            >
                <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
                Generate New Name
            </button>
        </div>
    );
}
