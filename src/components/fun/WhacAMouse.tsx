"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cat, Trophy, RotateCcw, Zap, Target, Sparkles } from "lucide-react";
import { playRandomMeow, playRandomPurr, initAudioContext } from "@/lib/sounds/cat-sounds";

const GRID_SIZE = 9;
const GAME_DURATION = 30;

interface FloatingText {
    id: number;
    x: number;
    y: number;
    text: string;
    color: string;
}

export function WhacAMouse() {
    const [activeHole, setActiveHole] = useState<number | null>(null);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
    const [isPlaying, setIsPlaying] = useState(false);
    const [highScore, setHighScore] = useState(0);
    const [combo, setCombo] = useState(0);
    const [floatingTexts, setFloatingTexts] = useState<FloatingText[]>([]);
    const [showComboMessage, setShowComboMessage] = useState(false);
    const [lastHole, setLastHole] = useState<number | null>(null);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const moleculeTimerRef = useRef<NodeJS.Timeout | null>(null);
    const comboTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const floatingIdRef = useRef(0);

    // Load high score
    useEffect(() => {
        const saved = localStorage.getItem("whac-a-mouse-highscore");
        if (saved) setHighScore(parseInt(saved, 10));
    }, []);

    const startGame = useCallback(() => {
        initAudioContext();
        setIsPlaying(true);
        setScore(0);
        setTimeLeft(GAME_DURATION);
        setActiveHole(null);
        setCombo(0);
        setFloatingTexts([]);
        setLastHole(null);

        // Play start sound
        playRandomMeow();
    }, []);

    const stopGame = useCallback(() => {
        setIsPlaying(false);
        setActiveHole(null);
        setCombo(0);
        if (timerRef.current) clearInterval(timerRef.current);
        if (moleculeTimerRef.current) clearTimeout(moleculeTimerRef.current);
        if (comboTimeoutRef.current) clearTimeout(comboTimeoutRef.current);

        // Play end purr
        playRandomPurr();

        // Update high score
        setHighScore((prev) => {
            const newHigh = Math.max(prev, score);
            localStorage.setItem("whac-a-mouse-highscore", newHigh.toString());
            return newHigh;
        });
    }, [score]);

    // Game timer
    useEffect(() => {
        if (isPlaying) {
            timerRef.current = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        stopGame();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [isPlaying, stopGame]);

    // Mole movement
    useEffect(() => {
        if (!isPlaying) return;

        const moveMole = () => {
            // Don't repeat the same hole immediately
            let newHole;
            do {
                newHole = Math.floor(Math.random() * GRID_SIZE);
            } while (newHole === lastHole && GRID_SIZE > 1);

            setLastHole(newHole);
            setActiveHole(newHole);

            // Speed increases as score goes up, with minimum speed cap
            const baseSpeed = 1000;
            const speedBoost = Math.min(score * 25, 500); // Cap the speed increase
            const speedFactor = Math.max(450, baseSpeed - speedBoost);

            moleculeTimerRef.current = setTimeout(moveMole, speedFactor);
        };

        moveMole();

        return () => {
            if (moleculeTimerRef.current) clearTimeout(moleculeTimerRef.current);
        };
    }, [isPlaying, score, lastHole]);

    // Add floating text effect
    const addFloatingText = useCallback((x: number, y: number, text: string, color: string) => {
        const id = floatingIdRef.current++;
        setFloatingTexts(prev => [...prev, { id, x, y, text, color }]);

        setTimeout(() => {
            setFloatingTexts(prev => prev.filter(ft => ft.id !== id));
        }, 800);
    }, []);

    const handleWhack = useCallback((index: number, event?: React.MouseEvent) => {
        if (!isPlaying) return;

        if (index === activeHole) {
            // Successful hit!
            const newCombo = combo + 1;
            setCombo(newCombo);

            // Calculate points with combo bonus
            const basePoints = 1;
            const comboBonus = Math.floor(newCombo / 3);
            const points = basePoints + comboBonus;

            setScore(s => s + points);
            setActiveHole(null); // Hide immediately

            // Play meow sound (varies based on combo)
            if (newCombo % 5 === 0) {
                // Special combo meow
                playRandomMeow();
                setShowComboMessage(true);
                setTimeout(() => setShowComboMessage(false), 1000);
            } else {
                playRandomMeow();
            }

            // Show floating text
            if (event) {
                const rect = (event.target as HTMLElement).getBoundingClientRect();
                const text = comboBonus > 0 ? `+${points} 🔥` : `+${points}`;
                const color = newCombo >= 5 ? '#f59e0b' : newCombo >= 3 ? '#ec4899' : '#8b5cf6';
                addFloatingText(rect.left + rect.width / 2, rect.top, text, color);
            }

            // Reset combo timeout
            if (comboTimeoutRef.current) clearTimeout(comboTimeoutRef.current);
            comboTimeoutRef.current = setTimeout(() => setCombo(0), 1500);
        } else {
            // Missed!
            setCombo(0);
            setScore(s => Math.max(0, s - 1));

            if (event) {
                const rect = (event.target as HTMLElement).getBoundingClientRect();
                addFloatingText(rect.left + rect.width / 2, rect.top, '-1', '#ef4444');
            }
        }
    }, [isPlaying, activeHole, combo, addFloatingText]);

    // Get combo message
    const getComboMessage = () => {
        if (combo >= 10) return "🔥 PURRFECT! 🔥";
        if (combo >= 7) return "😺 AMAZING! 😺";
        if (combo >= 5) return "✨ AWESOME! ✨";
        if (combo >= 3) return "🎯 NICE! 🎯";
        return "";
    };

    return (
        <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-purple-200 dark:border-purple-800 w-full max-w-md mx-auto overflow-hidden">
            {/* Floating texts */}
            <AnimatePresence>
                {floatingTexts.map(ft => (
                    <motion.div
                        key={ft.id}
                        initial={{ opacity: 1, y: 0, scale: 1 }}
                        animate={{ opacity: 0, y: -40, scale: 1.2 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8 }}
                        className="fixed pointer-events-none z-50 text-lg font-bold"
                        style={{
                            left: ft.x,
                            top: ft.y,
                            color: ft.color,
                            textShadow: '0 0 10px rgba(0,0,0,0.3)'
                        }}
                    >
                        {ft.text}
                    </motion.div>
                ))}
            </AnimatePresence>

            {/* Combo message overlay */}
            <AnimatePresence>
                {showComboMessage && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        className="absolute inset-0 flex items-center justify-center z-40 pointer-events-none"
                    >
                        <div className="bg-gradient-to-r from-orange-400 to-pink-500 text-white text-2xl font-black px-6 py-3 rounded-full shadow-2xl">
                            {getComboMessage()}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 flex items-center justify-center gap-2">
                    <Cat className="w-6 h-6 text-purple-500 dark:text-purple-400" />
                    Catch the Cat!
                </h2>

                <div className="flex justify-between items-center mt-4 bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg">
                    <div className="text-center">
                        <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">Score</p>
                        <p className="text-xl font-bold text-purple-600 dark:text-purple-400">{score}</p>
                    </div>
                    <div className="text-center">
                        <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">Time</p>
                        <p className={`text-xl font-bold ${timeLeft < 10 ? 'text-red-500 dark:text-red-400' : 'text-gray-700 dark:text-gray-300'}`}>
                            {timeLeft}s
                        </p>
                    </div>
                    <div className="text-center">
                        <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">Best</p>
                        <p className="text-xl font-bold text-orange-500 dark:text-orange-400 flex items-center gap-1">
                            <Trophy className="w-3 h-3" />
                            {highScore}
                        </p>
                    </div>
                </div>

                {/* Combo indicator */}
                {combo > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-3 flex items-center justify-center gap-2"
                    >
                        <div className="flex items-center gap-1 bg-gradient-to-r from-orange-100 to-pink-100 dark:from-orange-900/30 dark:to-pink-900/30 px-3 py-1 rounded-full">
                            <Zap className="w-4 h-4 text-orange-500 dark:text-orange-400" />
                            <span className="text-sm font-bold text-orange-600 dark:text-orange-400">
                                Combo: {combo}
                            </span>
                            {combo >= 3 && (
                                <Sparkles className="w-4 h-4 text-pink-500 dark:text-pink-400" />
                            )}
                        </div>
                    </motion.div>
                )}
            </div>

            <div className="grid grid-cols-3 gap-3 mb-6">
                {Array.from({ length: GRID_SIZE }).map((_, i) => (
                    <motion.div
                        key={i}
                        className="aspect-square bg-gradient-to-b from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-900/50 rounded-xl relative overflow-hidden cursor-crosshair"
                        onClick={(e) => handleWhack(i, e)}
                        whileTap={{ scale: 0.95 }}
                    >
                        {/* Hole shadow */}
                        <div className="absolute bottom-0 w-full h-1/3 bg-gradient-to-t from-purple-300/50 to-transparent dark:from-purple-950/50 rounded-b-xl" />

                        {/* Grass tufts */}
                        <div className="absolute bottom-1 left-2 text-purple-300/30 dark:text-purple-400/30 text-xs">🌿</div>
                        <div className="absolute bottom-1 right-2 text-purple-300/30 dark:text-purple-400/30 text-xs">🌿</div>

                        <AnimatePresence>
                            {activeHole === i && (
                                <motion.div
                                    initial={{ y: "100%", scale: 0.8 }}
                                    animate={{ y: "5%", scale: 1 }}
                                    exit={{ y: "100%", scale: 0.8 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                                    className="absolute inset-0 flex items-center justify-center"
                                >
                                    <div className="relative">
                                        {/* Cat emoji with glow */}
                                        <motion.div
                                            animate={{
                                                rotate: [-5, 5, -5],
                                                scale: [1, 1.05, 1]
                                            }}
                                            transition={{ duration: 0.5, repeat: Infinity }}
                                            className="text-5xl filter drop-shadow-lg"
                                        >
                                            🐱
                                        </motion.div>

                                        {/* Eyes */}
                                        <div className="absolute top-3 left-2 w-1.5 h-1.5 bg-gray-800 dark:bg-gray-200 rounded-full" />
                                        <div className="absolute top-3 right-2 w-1.5 h-1.5 bg-gray-800 dark:bg-gray-200 rounded-full" />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Target indicator on hover */}
                        {!isPlaying && (
                            <div className="absolute inset-0 flex items-center justify-center opacity-10">
                                <Target className="w-8 h-8 text-purple-400 dark:text-purple-300" />
                            </div>
                        )}
                    </motion.div>
                ))}
            </div>

            <div className="text-center">
                {!isPlaying ? (
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={startGame}
                        className="bg-gradient-to-r from-purple-500 to-pink-500 text-white dark:text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all w-full md:w-auto"
                    >
                        {score > 0 ? "Play Again 🎮" : "Start Game 🎮"}
                    </motion.button>
                ) : (
                    <button
                        onClick={stopGame}
                        className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium py-2 px-6 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors flex items-center gap-2 mx-auto"
                    >
                        <RotateCcw className="w-4 h-4" />
                        End Game
                    </button>
                )}
            </div>

            {/* Instructions */}
            <p className="text-center text-xs text-gray-400 dark:text-gray-500 mt-4">
                Click the cats as they pop up! Build combos for bonus points! 🐱
            </p>
        </div>
    );
}
