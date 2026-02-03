"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mouse as MouseIcon, Trophy, RotateCcw } from "lucide-react";

const GRID_SIZE = 9;
const GAME_DURATION = 30;

export function WhacAMouse() {
    const [activeHole, setActiveHole] = useState<number | null>(null);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
    const [isPlaying, setIsPlaying] = useState(false);
    const [highScore, setHighScore] = useState(0);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const moleculeTimerRef = useRef<NodeJS.Timeout | null>(null);

    // Load high score
    useEffect(() => {
        const saved = localStorage.getItem("whac-a-mouse-highscore");
        if (saved) setHighScore(parseInt(saved, 10));
    }, []);

    const startGame = useCallback(() => {
        setIsPlaying(true);
        setScore(0);
        setTimeLeft(GAME_DURATION);
        setActiveHole(null);
    }, []);

    const stopGame = useCallback(() => {
        setIsPlaying(false);
        setActiveHole(null);
        if (timerRef.current) clearInterval(timerRef.current);
        if (moleculeTimerRef.current) clearTimeout(moleculeTimerRef.current);

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
            const newHole = Math.floor(Math.random() * GRID_SIZE);
            setActiveHole(newHole);

            // Speed increases as score goes up
            const baseSpeed = 1000;
            const speedFactor = Math.max(200, baseSpeed - score * 20);

            moleculeTimerRef.current = setTimeout(moveMole, speedFactor);
        };

        moveMole();

        return () => {
            if (moleculeTimerRef.current) clearTimeout(moleculeTimerRef.current);
        };
    }, [isPlaying, score]);

    const handleWhack = (index: number) => {
        if (!isPlaying) return;

        if (index === activeHole) {
            setScore((s) => s + 1);
            setActiveHole(null); // Hide immediately

            // Play sound
            const audio = new AudioContext();
            const osc = audio.createOscillator();
            const gain = audio.createGain();
            osc.frequency.setValueAtTime(600, audio.currentTime);
            osc.frequency.exponentialRampToValueAtTime(100, audio.currentTime + 0.1);
            gain.gain.setValueAtTime(0.1, audio.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, audio.currentTime + 0.1);
            osc.connect(gain);
            gain.connect(audio.destination);
            osc.start();
            osc.stop(audio.currentTime + 0.1);
        } else {
            setScore((s) => Math.max(0, s - 1)); // Penalty
        }
    };

    return (
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-purple-200 dark:border-purple-800 w-full max-w-md mx-auto">
            <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 flex items-center justify-center gap-2">
                    <MouseIcon className="w-6 h-6 text-purple-500" />
                    Whac-A-Mouse
                </h2>

                <div className="flex justify-between items-center mt-4 bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg">
                    <div className="text-center">
                        <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">Score</p>
                        <p className="text-xl font-bold text-purple-600 dark:text-purple-400">{score}</p>
                    </div>
                    <div className="text-center">
                        <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">Time</p>
                        <p className={`text-xl font-bold ${timeLeft < 10 ? 'text-red-500' : 'text-gray-700 dark:text-gray-300'}`}>
                            {timeLeft}s
                        </p>
                    </div>
                    <div className="text-center">
                        <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider">Best</p>
                        <p className="text-xl font-bold text-orange-500 flex items-center gap-1">
                            <Trophy className="w-3 h-3" />
                            {highScore}
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-6">
                {Array.from({ length: GRID_SIZE }).map((_, i) => (
                    <div
                        key={i}
                        className="aspect-square bg-purple-100 dark:bg-purple-900/30 rounded-xl relative overflow-hidden cursor-crosshair active:scale-95 transition-transform"
                        onClick={() => handleWhack(i)}
                    >
                        <AnimatePresence>
                            {activeHole === i && (
                                <motion.div
                                    initial={{ y: "100%" }}
                                    animate={{ y: "10%" }}
                                    exit={{ y: "100%" }}
                                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                    className="absolute inset-0 flex items-center justify-center"
                                >
                                    <MouseIcon className="w-12 h-12 text-gray-600 dark:text-gray-300 fill-current" />
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Dirt/Hole effect */}
                        <div className="absolute bottom-0 w-full h-1/4 bg-purple-200 dark:bg-purple-900/50 rounded-b-xl" />
                    </div>
                ))}
            </div>

            <div className="text-center">
                {!isPlaying ? (
                    <button
                        onClick={startGame}
                        className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all w-full md:w-auto"
                    >
                        {score > 0 ? "Play Again" : "Start Game"}
                    </button>
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
        </div>
    );
}
