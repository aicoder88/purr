"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Play,
    RotateCcw,
    Zap,
    Clock,
    Target,
    Sparkles,
    Cat,
    Trophy,
    Gauge,
    Star,
} from "lucide-react";
import { playRandomMeow, playRandomPurr, initAudioContext } from "@/lib/sounds/cat-sounds";

interface Particle {
    id: number;
    x: number;
    y: number;
    tone: "red" | "gold";
}

type DotVariant = "classic" | "golden";

const GAME_DURATION = 30;
const HIGH_SCORE_KEY = "laser-chase-highscore";

export function LaserChase() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [position, setPosition] = useState({ x: 50, y: 50 });
    const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
    const [combo, setCombo] = useState(0);
    const [bestCombo, setBestCombo] = useState(0);
    const [hits, setHits] = useState(0);
    const [misses, setMisses] = useState(0);
    const [particles, setParticles] = useState<Particle[]>([]);
    const [showComboMessage, setShowComboMessage] = useState(false);
    const [dotVariant, setDotVariant] = useState<DotVariant>("classic");
    const containerRef = useRef<HTMLDivElement>(null);
    const moveTimerRef = useRef<NodeJS.Timeout | null>(null);
    const gameTimerRef = useRef<NodeJS.Timeout | null>(null);
    const comboTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const particleIdRef = useRef(0);
    const scoreRef = useRef(0);
    const isPlayingRef = useRef(false);
    const timeLeftRef = useRef(GAME_DURATION);

    useEffect(() => {
        const saved = localStorage.getItem(HIGH_SCORE_KEY);
        if (saved) {
            setHighScore(parseInt(saved, 10));
        }
    }, []);

    useEffect(() => {
        scoreRef.current = score;
    }, [score]);

    useEffect(() => {
        isPlayingRef.current = isPlaying;
    }, [isPlaying]);

    useEffect(() => {
        timeLeftRef.current = timeLeft;
    }, [timeLeft]);

    const clearGameTimers = useCallback(() => {
        if (moveTimerRef.current) clearTimeout(moveTimerRef.current);
        if (gameTimerRef.current) clearInterval(gameTimerRef.current);
        if (comboTimeoutRef.current) clearTimeout(comboTimeoutRef.current);
    }, []);

    const getDotSize = useCallback((currentScore: number) => {
        const size = 26 - Math.min(Math.floor(currentScore / 4) * 2, 10);
        return Math.max(16, size);
    }, []);

    const getNextMoveDelay = useCallback((currentScore: number, currentTimeLeft: number) => {
        const scoreBoost = Math.min(currentScore * 18, 360);
        const lateRoundBoost = currentTimeLeft <= 10 ? 120 : currentTimeLeft <= 18 ? 50 : 0;
        return Math.max(240, 880 - scoreBoost - lateRoundBoost + Math.random() * 160);
    }, []);

    const moveDot = useCallback((delay = 0) => {
        if (moveTimerRef.current) clearTimeout(moveTimerRef.current);

        moveTimerRef.current = setTimeout(() => {
            if (!containerRef.current || !isPlayingRef.current) return;

            const size = getDotSize(scoreRef.current);
            const edgePadding = Math.max(12, size);
            const x = edgePadding + Math.random() * (100 - edgePadding * 2);
            const y = edgePadding + Math.random() * (100 - edgePadding * 2);

            setPosition({ x, y });
            setDotVariant(Math.random() < 0.16 ? "golden" : "classic");

            moveDot(getNextMoveDelay(scoreRef.current, timeLeftRef.current));
        }, delay);
    }, [getDotSize, getNextMoveDelay]);

    const stopGame = useCallback(() => {
        clearGameTimers();
        setIsPlaying(false);
        setCombo(0);
        setDotVariant("classic");
        playRandomPurr();

        setHighScore((prev) => {
            const nextHighScore = Math.max(prev, scoreRef.current);
            localStorage.setItem(HIGH_SCORE_KEY, nextHighScore.toString());
            return nextHighScore;
        });
    }, [clearGameTimers]);

    const startGame = useCallback(() => {
        clearGameTimers();
        initAudioContext();

        scoreRef.current = 0;
        timeLeftRef.current = GAME_DURATION;
        isPlayingRef.current = true;

        setIsPlaying(true);
        setScore(0);
        setTimeLeft(GAME_DURATION);
        setCombo(0);
        setBestCombo(0);
        setHits(0);
        setMisses(0);
        setParticles([]);
        setDotVariant("classic");
        setPosition({ x: 50, y: 50 });

        gameTimerRef.current = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    timeLeftRef.current = 0;
                    stopGame();
                    return 0;
                }

                const nextValue = prev - 1;
                timeLeftRef.current = nextValue;
                return nextValue;
            });
        }, 1000);

        playRandomMeow();
        moveDot(350);
    }, [clearGameTimers, moveDot, stopGame]);

    useEffect(() => {
        return () => {
            clearGameTimers();
        };
    }, [clearGameTimers]);

    const addParticles = useCallback((x: number, y: number, tone: Particle["tone"]) => {
        const newParticles: Particle[] = [];

        for (let i = 0; i < 8; i += 1) {
            newParticles.push({
                id: particleIdRef.current++,
                x: x + (Math.random() - 0.5) * 60,
                y: y + (Math.random() - 0.5) * 60,
                tone,
            });
        }

        setParticles((prev) => [...prev, ...newParticles]);

        setTimeout(() => {
            setParticles((prev) => prev.filter((particle) => !newParticles.some((nextParticle) => nextParticle.id === particle.id)));
        }, 650);
    }, []);

    const handleDotClick = useCallback(() => {
        if (!isPlayingRef.current) return;

        const nextCombo = combo + 1;
        const comboBonus = Math.floor(nextCombo / 5);
        const basePoints = dotVariant === "golden" ? 2 : 1;
        const points = basePoints + comboBonus;

        setCombo(nextCombo);
        setBestCombo((prev) => Math.max(prev, nextCombo));
        setHits((prev) => prev + 1);

        setScore((prev) => {
            const nextScore = prev + points;
            scoreRef.current = nextScore;
            return nextScore;
        });

        const rect = containerRef.current?.getBoundingClientRect();
        if (rect) {
            const x = (position.x / 100) * rect.width;
            const y = (position.y / 100) * rect.height;
            addParticles(x, y, dotVariant === "golden" ? "gold" : "red");
        }

        playRandomMeow();

        if ((nextCombo >= 5 && nextCombo % 5 === 0) || dotVariant === "golden") {
            setShowComboMessage(true);
            setTimeout(() => setShowComboMessage(false), 800);
        }

        if (comboTimeoutRef.current) clearTimeout(comboTimeoutRef.current);
        comboTimeoutRef.current = setTimeout(() => setCombo(0), 1100);

        moveDot(90);
    }, [addParticles, combo, dotVariant, moveDot, position.x, position.y]);

    const handleMiss = useCallback(() => {
        if (!isPlayingRef.current) return;

        setMisses((prev) => prev + 1);
        setCombo(0);
    }, []);

    const getComboMessage = () => {
        if (dotVariant === "golden") return "⭐ BONUS TARGET ⭐";
        if (combo >= 15) return "🚀 LEGENDARY! 🚀";
        if (combo >= 10) return "⚡ UNSTOPPABLE! ⚡";
        if (combo >= 5) return "🔥 ON FIRE! 🔥";
        return "";
    };

    const accuracy = hits + misses > 0 ? Math.round((hits / (hits + misses)) * 100) : 100;
    const paceLabel =
        timeLeft <= 8 ? "Frenzy" :
            score >= 20 ? "Wild" :
                score >= 12 ? "Quick" :
                    "Cruise";
    const dotSize = getDotSize(score);

    return (
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-purple-200 dark:border-purple-800 w-full max-w-md mx-auto min-h-[460px] flex flex-col relative overflow-hidden">
            <div className="flex justify-between items-center mb-4 z-10">
                <div>
                    <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                        <Cat className="w-5 h-5 text-red-500" />
                        Laser Chase
                    </h2>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Bonus targets appear at random. Precision beats panic-clicking.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-sm font-bold ${timeLeft < 10
                        ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                        : "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300"
                        }`}>
                        <Clock className="w-3 h-3" />
                        {timeLeft}s
                    </div>
                    <div className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-3 py-1 rounded-full text-sm font-bold">
                        {score}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-4 gap-2 mb-4 text-center">
                <div className="rounded-xl bg-gray-50 dark:bg-gray-900/40 p-2">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">Best</p>
                    <p className="text-sm font-bold text-amber-500 dark:text-amber-400 flex items-center justify-center gap-1">
                        <Trophy className="w-3 h-3" />
                        {highScore}
                    </p>
                </div>
                <div className="rounded-xl bg-gray-50 dark:bg-gray-900/40 p-2">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">Accuracy</p>
                    <p className="text-sm font-bold text-sky-600 dark:text-sky-400">{accuracy}%</p>
                </div>
                <div className="rounded-xl bg-gray-50 dark:bg-gray-900/40 p-2">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">Combo</p>
                    <p className="text-sm font-bold text-orange-500 dark:text-orange-400">{bestCombo}</p>
                </div>
                <div className="rounded-xl bg-gray-50 dark:bg-gray-900/40 p-2">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">Pace</p>
                    <p className="text-sm font-bold text-violet-600 dark:text-violet-400">{paceLabel}</p>
                </div>
            </div>

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

            <div
                ref={containerRef}
                className="flex-1 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900/50 dark:to-gray-800/50 rounded-xl relative cursor-crosshair md:cursor-none overflow-hidden"
                onClick={handleMiss}
            >
                <div
                    className="absolute inset-0 opacity-5 dark:opacity-10"
                    style={{
                        backgroundImage: `
                            linear-gradient(to right, currentColor 1px, transparent 1px),
                            linear-gradient(to bottom, currentColor 1px, transparent 1px)
                        `,
                        backgroundSize: "40px 40px",
                    }}
                />

                {!isPlaying && (
                    <div className="absolute inset-0 flex items-center justify-center z-20 bg-white/60 dark:bg-black/60 backdrop-blur-sm rounded-xl p-6">
                        <div className="text-center">
                            {score > 0 ? (
                                <>
                                    <div className="text-4xl font-black text-transparent bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text">
                                        {score}
                                    </div>
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mt-2">
                                        {hits} hits, {misses} misses, best streak {bestCombo}
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                                        Higher scores shrink the dot, so clean clicks matter more late in the round.
                                    </p>
                                </>
                            ) : (
                                <>
                                    <p className="text-xl font-medium text-gray-700 dark:text-gray-200">
                                        Track the laser before your cat brain melts.
                                    </p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                                        Bonus golden dots, faster pacing, and combo windows reward quick accurate taps.
                                    </p>
                                </>
                            )}

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={startGame}
                                className="mt-5 flex items-center gap-2 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all mx-auto"
                            >
                                {score > 0 ? <RotateCcw className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                                {score > 0 ? "Chase Again" : "Start Chasing"}
                            </motion.button>
                        </div>
                    </div>
                )}

                {isPlaying && (
                    <div className="absolute top-3 left-3 text-xs text-gray-400 dark:text-gray-500 flex items-center gap-2">
                        <span className="inline-flex items-center gap-1">
                            <Target className="w-4 h-4" />
                            Tap the dot
                        </span>
                        {dotVariant === "golden" && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-1 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300">
                                <Star className="w-3 h-3" />
                                +2 bonus
                            </span>
                        )}
                    </div>
                )}

                <AnimatePresence>
                    {particles.map((particle) => (
                        <motion.div
                            key={particle.id}
                            initial={{ scale: 1, opacity: 1 }}
                            animate={{ scale: 0, opacity: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className="absolute pointer-events-none"
                            style={{
                                left: particle.x,
                                top: particle.y,
                            }}
                        >
                            <Sparkles className={`w-3 h-3 ${particle.tone === "gold" ? "text-amber-400 dark:text-amber-300" : "text-yellow-400 dark:text-yellow-300"}`} />
                        </motion.div>
                    ))}
                </AnimatePresence>

                {isPlaying && (
                    <motion.button
                        type="button"
                        aria-label={dotVariant === "golden" ? "Bonus laser target" : "Laser target"}
                        className="absolute z-10"
                        style={{
                            left: `${position.x}%`,
                            top: `${position.y}%`,
                            width: dotSize,
                            height: dotSize,
                            transform: "translate(-50%, -50%)",
                        }}
                        animate={{
                            left: `${position.x}%`,
                            top: `${position.y}%`,
                            scale: dotVariant === "golden" ? [1, 1.35, 1] : [1, 1.15, 1],
                        }}
                        transition={{
                            left: { type: "spring", stiffness: 500, damping: 24 },
                            top: { type: "spring", stiffness: 500, damping: 24 },
                            scale: { duration: 0.35, repeat: Infinity },
                        }}
                        onClick={(event) => {
                            event.stopPropagation();
                            handleDotClick();
                        }}
                    >
                        <div className={`absolute inset-0 rounded-full blur-md animate-pulse ${dotVariant === "golden" ? "bg-amber-400" : "bg-red-500"}`} />
                        <div
                            className={`absolute inset-0 rounded-full shadow-lg ${dotVariant === "golden" ? "bg-amber-400" : "bg-red-500"}`}
                            style={{
                                boxShadow: dotVariant === "golden"
                                    ? "0 0 20px 5px rgba(251, 191, 36, 0.7), 0 0 40px 10px rgba(251, 191, 36, 0.35)"
                                    : "0 0 20px 5px rgba(239, 68, 68, 0.6), 0 0 40px 10px rgba(239, 68, 68, 0.3)",
                            }}
                        />
                        <div className="absolute top-[12%] left-[16%] w-[28%] h-[28%] bg-white dark:bg-gray-100 rounded-full opacity-80" />
                    </motion.button>
                )}
            </div>

            <div className="mt-4 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                <span className="flex items-center gap-1">
                    <Gauge className="w-3 h-3" />
                    Faster rounds shrink the dot
                </span>
                <span className="flex items-center gap-1">
                    <Star className="w-3 h-3" />
                    Golden target = +2
                </span>
            </div>
        </div>
    );
}
