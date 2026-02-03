"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Play, RotateCcw } from "lucide-react";

export function LaserChase() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [score, setScore] = useState(0);
    const [position, setPosition] = useState({ x: 50, y: 50 });
    const containerRef = useRef<HTMLDivElement>(null);
    const moveTimerRef = useRef<NodeJS.Timeout | null>(null);

    const moveDot = useCallback(() => {
        if (!containerRef.current) return;

        // Random position within 10-90% of container to keep it clickable
        const x = 10 + Math.random() * 80;
        const y = 10 + Math.random() * 80;

        setPosition({ x, y });

        // Move again automatically if not clicked (jittery movement)
        const nextMoveTime = 500 + Math.random() * 1000;
        moveTimerRef.current = setTimeout(moveDot, nextMoveTime);
    }, []);

    const startGame = () => {
        setIsPlaying(true);
        setScore(0);
        moveDot();
    };

    const stopGame = () => {
        setIsPlaying(false);
        if (moveTimerRef.current) clearTimeout(moveTimerRef.current);
    };

    useEffect(() => {
        return () => {
            if (moveTimerRef.current) clearTimeout(moveTimerRef.current);
        };
    }, []);

    const handleDotClick = () => {
        if (!isPlaying) return;

        setScore(s => s + 1);

        // Clear auto-move timer and move immediately
        if (moveTimerRef.current) clearTimeout(moveTimerRef.current);
        moveDot();

        // Sound effect
        const audio = new AudioContext();
        const osc = audio.createOscillator();
        const gain = audio.createGain();
        osc.frequency.setValueAtTime(800, audio.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1200, audio.currentTime + 0.1);
        gain.gain.setValueAtTime(0.1, audio.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, audio.currentTime + 0.1);
        osc.connect(gain);
        gain.connect(audio.destination);
        osc.start();
        osc.stop(audio.currentTime + 0.1);
    };

    return (
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-purple-200 dark:border-purple-800 w-full max-w-md mx-auto min-h-[400px] flex flex-col relative overflow-hidden">
            <div className="flex justify-between items-center mb-4 z-10">
                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">Laser Chase</h2>
                <div className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-3 py-1 rounded-full text-sm font-bold">
                    Score: {score}
                </div>
            </div>

            <div
                ref={containerRef}
                className="flex-1 bg-gray-100 dark:bg-gray-900/50 rounded-xl relative cursor-none"
                onClick={() => {
                    // Missed click penalty? Optional.
                }}
            >
                {!isPlaying && (
                    <div className="absolute inset-0 flex items-center justify-center z-20 bg-white/50 dark:bg-black/50 backdrop-blur-sm rounded-xl">
                        <button
                            onClick={startGame}
                            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-transform hover:scale-105"
                        >
                            {score > 0 ? <RotateCcw className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                            {score > 0 ? "Chase Again" : "Start Chasing"}
                        </button>
                    </div>
                )}

                {isPlaying && (
                    <motion.button
                        className="absolute w-4 h-4 bg-red-500 rounded-full shadow-[0_0_10px_rgba(239,68,68,0.8)] z-10"
                        style={{
                            left: `${position.x}%`,
                            top: `${position.y}%`,
                            boxShadow: "0 0 15px 2px rgba(255, 0, 0, 0.6)"
                        }}
                        animate={{
                            left: `${position.x}%`,
                            top: `${position.y}%`
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 25
                        }}
                        onClick={(e) => {
                            e.stopPropagation();
                            handleDotClick();
                        }}
                    />
                )}
            </div>

            <p className="text-center text-xs text-gray-500 mt-4">
                Catch the red dot! Be quick like a cat! 🐈
            </p>
        </div>
    );
}
