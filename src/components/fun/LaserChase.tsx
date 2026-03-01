"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, RotateCcw, Zap, Clock, Target, Sparkles, Cat } from "lucide-react";
import { playRandomMeow, playRandomPurr, initAudioContext } from "@/lib/sounds/cat-sounds";

interface Particle {
    id: number;
    x: number;
    y: number;
}

export function LaserChase() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [score, setScore] = useState(0);
    const [position, setPosition] = useState({ x: 50, y: 50 });
    const [timeLeft, setTimeLeft] = useState(30);
    const [combo, setCombo] = useState(0);
    const [particles, setParticles] = useState<Particle[]>([]);
    const [showComboMessage, setShowComboMessage] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const moveTimerRef = useRef<NodeJS.Timeout | null>(null);
    const gameTimerRef = useRef<NodeJS.Timeout | null>(null);
    const comboTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const particleIdRef = useRef(0);

    const moveDot = useCallback(() => {
        if (!containerRef.current) return;

        // Random position within 10-90% of container to keep it clickable
        const x = 10 + Math.random() * 80;
        const y = 10 + Math.random() * 80;

        setPosition({ x, y });

        // Move again automatically if not clicked - speed increases with score
        const baseSpeed = 800;
        const speedBoost = Math.min(score * 20, 400);
        const nextMoveTime = Math.max(400, baseSpeed - speedBoost + Math.random() * 400);
        moveTimerRef.current = setTimeout(moveDot, nextMoveTime);
    }, [score]);

    const startGame = () => {
        initAudioContext();
        setIsPlaying(true);
        setScore(0);
        setTimeLeft(30);
        setCombo(0);
        setParticles([]);
        moveDot();

        // Start game timer
        gameTimerRef.current = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    stopGame();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        // Play start sound
        playRandomMeow();
    };

    const stopGame = useCallback(() => {
        setIsPlaying(false);
        if (moveTimerRef.current) clearTimeout(moveTimerRef.current);
        if (gameTimerRef.current) clearInterval(gameTimerRef.current);
        if (comboTimeoutRef.current) clearTimeout(comboTimeoutRef.current);

        // Play end purr
        playRandomPurr();
    }, []);

    useEffect(() => {
        return () => {
            if (moveTimerRef.current) clearTimeout(moveTimerRef.current);
            if (gameTimerRef.current) clearInterval(gameTimerRef.current);
            if (comboTimeoutRef.current) clearTimeout(comboTimeoutRef.current);
        };
    }, []);

    const addParticles = (x: number, y: number) => {
        const newParticles: Particle[] = [];
        for (let i = 0; i < 6; i++) {
            newParticles.push({
                id: particleIdRef.current++,
                x: x + (Math.random() - 0.5) * 60,
                y: y + (Math.random() - 0.5) * 60,
            });
        }
        setParticles(prev => [...prev, ...newParticles]);

        // Remove particles after animation
        setTimeout(() => {
            setParticles(prev => prev.filter(p => !newParticles.find(np => np.id === p.id)));
        }, 600);
    };

    const handleDotClick = () => {
        if (!isPlaying) return;

        const newCombo = combo + 1;
        setCombo(newCombo);

        // Points with combo bonus
        const basePoints = 1;
        const comboBonus = Math.floor(newCombo / 5);
        setScore(s => s + basePoints + comboBonus);

        // Get click position for particles
        const rect = containerRef.current?.getBoundingClientRect();
        if (rect) {
            const x = ((position.x / 100) * rect.width);
            const y = ((position.y / 100) * rect.height);
            addParticles(x, y);
        }

        // Play sound - special for high combos
        if (newCombo % 10 === 0) {
            playRandomMeow();
            setShowComboMessage(true);
            setTimeout(() => setShowComboMessage(false), 800);
        } else {
            playRandomMeow();
        }

        // Reset combo timeout
        if (comboTimeoutRef.current) clearTimeout(comboTimeoutRef.current);
        comboTimeoutRef.current = setTimeout(() => setCombo(0), 1200);

        // Clear auto-move timer and move immediately
        if (moveTimerRef.current) clearTimeout(moveTimerRef.current);
        moveDot();
    };

    const getComboMessage = () => {
        if (combo >= 15) return "🚀 LEGENDARY! 🚀";
        if (combo >= 10) return "⚡ UNSTOPPABLE! ⚡";
        if (combo >= 5) return "🔥 ON FIRE! 🔥";
        return "";
    };

    return (
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-purple-200 dark:border-purple-800 w-full max-w-md mx-auto min-h-[420px] flex flex-col relative overflow-hidden">
            {/* Header */}
            <div className="flex justify-between items-center mb-4 z-10">
                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                    <Cat className="w-5 h-5 text-red-500" />
                    Laser Chase
                </h2>
                <div className="flex items-center gap-3">
                    {/* Timer */}
                    <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-sm font-bold ${timeLeft < 10
                        ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'
                        : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
                        }`}>
                        <Clock className="w-3 h-3" />
                        {timeLeft}s
                    </div>
                    {/* Score */}
                    <div className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-3 py-1 rounded-full text-sm font-bold">
                        {score}
                    </div>
                </div>
            </div>

            {/* Combo indicator */}
            {combo > 0 && (
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="mb-3 z-10"
                >
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 bg-gradient-to-r from-orange-400 to-red-500 text-white px-3 py-1 rounded-full shadow-lg">
                            <Zap className="w-4 h-4" />
                            <span className="text-sm font-bold">
                                Streak: {combo}
                            </span>
                        </div>
                        {combo >= 5 && (
                            <motion.span
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="text-lg"
                            >
                                🔥
                            </motion.span>
                        )}
                    </div>
                </motion.div>
            )}

            {/* Combo message overlay */}
            <AnimatePresence>
                {showComboMessage && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none"
                    >
                        <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white text-2xl font-black px-6 py-3 rounded-full shadow-2xl">
                            {getComboMessage()}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Game Area */}
            <div
                ref={containerRef}
                className="flex-1 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900/50 dark:to-gray-800/50 rounded-xl relative cursor-none overflow-hidden"
                onClick={() => {
                    // Missed click - could add penalty here
                }}
            >
                {/* Grid pattern background */}
                <div className="absolute inset-0 opacity-5 dark:opacity-10"
                    style={{
                        backgroundImage: `
                            linear-gradient(to right, currentColor 1px, transparent 1px),
                            linear-gradient(to bottom, currentColor 1px, transparent 1px)
                        `,
                        backgroundSize: '40px 40px'
                    }}
                />

                {/* Start overlay */}
                {!isPlaying && (
                    <div className="absolute inset-0 flex items-center justify-center z-20 bg-white/60 dark:bg-black/60 backdrop-blur-sm rounded-xl">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={startGame}
                            className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all"
                        >
                            {score > 0 ? <RotateCcw className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                            {score > 0 ? "Chase Again" : "Start Chasing"}
                        </motion.button>
                    </div>
                )}

                {/* Score display during game */}
                {isPlaying && (
                    <div className="absolute top-3 left-3 text-xs text-gray-400 dark:text-gray-500">
                        <Target className="w-4 h-4 inline mr-1" />
                        Click the dot!
                    </div>
                )}

                {/* Particles */}
                <AnimatePresence>
                    {particles.map(particle => (
                        <motion.div
                            key={particle.id}
                            initial={{ scale: 1, opacity: 1 }}
                            animate={{ scale: 0, opacity: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className="absolute w-3 h-3 pointer-events-none"
                            style={{
                                left: particle.x,
                                top: particle.y,
                            }}
                        >
                            <Sparkles className="w-full h-full text-yellow-400 dark:text-yellow-300" />
                        </motion.div>
                    ))}
                </AnimatePresence>

                {/* The Laser Dot */}
                {isPlaying && (
                    <motion.button
                        className="absolute w-5 h-5 z-10"
                        style={{
                            left: `${position.x}%`,
                            top: `${position.y}%`,
                            transform: 'translate(-50%, -50%)',
                        }}
                        animate={{
                            left: `${position.x}%`,
                            top: `${position.y}%`,
                            scale: [1, 1.2, 1],
                        }}
                        transition={{
                            left: { type: "spring", stiffness: 500, damping: 25 },
                            top: { type: "spring", stiffness: 500, damping: 25 },
                            scale: { duration: 0.3, repeat: Infinity }
                        }}
                        onClick={(e) => {
                            e.stopPropagation();
                            handleDotClick();
                        }}
                    >
                        {/* Glow effect */}
                        <div className="absolute inset-0 bg-red-500 rounded-full blur-md animate-pulse" />

                        {/* Core */}
                        <div
                            className="absolute inset-0 bg-red-500 rounded-full shadow-lg"
                            style={{
                                boxShadow: '0 0 20px 5px rgba(239, 68, 68, 0.6), 0 0 40px 10px rgba(239, 68, 68, 0.3)'
                            }}
                        />

                        {/* Inner highlight */}
                        <div className="absolute top-0.5 left-0.5 w-1.5 h-1.5 bg-white dark:bg-gray-100 rounded-full opacity-80" />
                    </motion.button>
                )}
            </div>

            {/* Footer */}
            <div className="mt-4 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                <span className="flex items-center gap-1">
                    <Zap className="w-3 h-3" />
                    Keep clicking for combos!
                </span>
                <span>
                    {combo > 0 ? `Best streak this round: ${combo}` : 'Be quick like a cat! 🐈'}
                </span>
            </div>
        </div>
    );
}
