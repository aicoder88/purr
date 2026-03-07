"use client";

import { useState, useEffect, useCallback, useRef, type MouseEvent as ReactMouseEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Cat,
    Trophy,
    RotateCcw,
    Zap,
    Target,
    Sparkles,
    TimerReset,
    Star,
} from "lucide-react";
import { playRandomMeow, playRandomPurr, initAudioContext } from "@/lib/sounds/cat-sounds";

const GRID_SIZE = 9;
const GAME_DURATION = 30;
const HIGH_SCORE_KEY = "whac-a-mouse-highscore";

interface FloatingText {
    id: number;
    x: number;
    y: number;
    text: string;
    color: string;
}

type CatVariant = "classic" | "golden";

function clampScore(score: number) {
    return Math.max(0, score);
}

export function WhacAMouse() {
    const [activeHole, setActiveHole] = useState<number | null>(null);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
    const [isPlaying, setIsPlaying] = useState(false);
    const [highScore, setHighScore] = useState(0);
    const [combo, setCombo] = useState(0);
    const [bestCombo, setBestCombo] = useState(0);
    const [hits, setHits] = useState(0);
    const [misses, setMisses] = useState(0);
    const [floatingTexts, setFloatingTexts] = useState<FloatingText[]>([]);
    const [showComboMessage, setShowComboMessage] = useState(false);
    const [lastHole, setLastHole] = useState<number | null>(null);
    const [catVariant, setCatVariant] = useState<CatVariant>("classic");
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const spawnTimerRef = useRef<NodeJS.Timeout | null>(null);
    const comboTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const floatingIdRef = useRef(0);
    const scoreRef = useRef(0);
    const timeLeftRef = useRef(GAME_DURATION);
    const lastHoleRef = useRef<number | null>(null);
    const isPlayingRef = useRef(false);

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
        timeLeftRef.current = timeLeft;
    }, [timeLeft]);

    useEffect(() => {
        lastHoleRef.current = lastHole;
    }, [lastHole]);

    useEffect(() => {
        isPlayingRef.current = isPlaying;
    }, [isPlaying]);

    const clearGameTimers = useCallback(() => {
        if (timerRef.current) clearInterval(timerRef.current);
        if (spawnTimerRef.current) clearTimeout(spawnTimerRef.current);
        if (comboTimeoutRef.current) clearTimeout(comboTimeoutRef.current);
    }, []);

    const getSpawnDelay = useCallback((currentScore: number, currentTimeLeft: number) => {
        const scoreBoost = Math.min(currentScore * 18, 320);
        const lateRoundBoost = currentTimeLeft <= 8 ? 100 : currentTimeLeft <= 15 ? 40 : 0;
        return Math.max(320, 950 - scoreBoost - lateRoundBoost + Math.random() * 120);
    }, []);

    const scheduleNextCat = useCallback((delay = 0) => {
        if (spawnTimerRef.current) clearTimeout(spawnTimerRef.current);

        spawnTimerRef.current = setTimeout(() => {
            if (!isPlayingRef.current) return;

            let newHole: number;
            do {
                newHole = Math.floor(Math.random() * GRID_SIZE);
            } while (newHole === lastHoleRef.current && GRID_SIZE > 1);

            const nextVariant: CatVariant = Math.random() < 0.18 ? "golden" : "classic";

            setActiveHole(newHole);
            setCatVariant(nextVariant);
            setLastHole(newHole);
            lastHoleRef.current = newHole;

            scheduleNextCat(getSpawnDelay(scoreRef.current, timeLeftRef.current));
        }, delay);
    }, [getSpawnDelay]);

    const stopGame = useCallback(() => {
        clearGameTimers();
        setIsPlaying(false);
        setActiveHole(null);
        setCombo(0);
        setCatVariant("classic");
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
        lastHoleRef.current = null;
        isPlayingRef.current = true;

        setIsPlaying(true);
        setScore(0);
        setTimeLeft(GAME_DURATION);
        setActiveHole(null);
        setCombo(0);
        setBestCombo(0);
        setHits(0);
        setMisses(0);
        setFloatingTexts([]);
        setLastHole(null);
        setCatVariant("classic");

        timerRef.current = setInterval(() => {
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
        scheduleNextCat(450);
    }, [clearGameTimers, scheduleNextCat, stopGame]);

    useEffect(() => {
        return () => {
            clearGameTimers();
        };
    }, [clearGameTimers]);

    const addFloatingText = useCallback((x: number, y: number, text: string, color: string) => {
        const id = floatingIdRef.current++;
        setFloatingTexts((prev) => [...prev, { id, x, y, text, color }]);

        setTimeout(() => {
            setFloatingTexts((prev) => prev.filter((item) => item.id !== id));
        }, 800);
    }, []);

    const handleWhack = useCallback((index: number, event?: ReactMouseEvent) => {
        if (!isPlayingRef.current) return;

        if (index === activeHole) {
            const nextCombo = combo + 1;
            const comboBonus = Math.floor(nextCombo / 3);
            const basePoints = catVariant === "golden" ? 3 : 1;
            const points = basePoints + comboBonus;

            setCombo(nextCombo);
            setBestCombo((prev) => Math.max(prev, nextCombo));
            setHits((prev) => prev + 1);

            setScore((prev) => {
                const nextScore = prev + points;
                scoreRef.current = nextScore;
                return nextScore;
            });

            setActiveHole(null);

            playRandomMeow();

            if (nextCombo >= 3 && nextCombo % 3 === 0) {
                setShowComboMessage(true);
                setTimeout(() => setShowComboMessage(false), 900);
            }

            if (event) {
                const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
                const badge = catVariant === "golden" ? "⭐" : "";
                const text = comboBonus > 0 ? `+${points} ${badge}🔥` : `+${points} ${badge}`.trim();
                const color = catVariant === "golden" ? "#f59e0b" : nextCombo >= 6 ? "#ef4444" : "#8b5cf6";
                addFloatingText(rect.left + rect.width / 2, rect.top + 8, text, color);
            }

            if (comboTimeoutRef.current) clearTimeout(comboTimeoutRef.current);
            comboTimeoutRef.current = setTimeout(() => setCombo(0), 1400);

            scheduleNextCat(120);
            return;
        }

        setCombo(0);
        setMisses((prev) => prev + 1);
        setScore((prev) => {
            const nextScore = clampScore(prev - 1);
            scoreRef.current = nextScore;
            return nextScore;
        });

        if (event) {
            const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
            addFloatingText(rect.left + rect.width / 2, rect.top + 8, "-1", "#ef4444");
        }
    }, [activeHole, addFloatingText, catVariant, combo, scheduleNextCat]);

    const accuracy = hits + misses > 0 ? Math.round((hits / (hits + misses)) * 100) : 100;
    const heatLabel =
        timeLeft <= 8 ? "Zoomies" :
            score >= 18 ? "Wild" :
                score >= 10 ? "Fast" :
                    "Warm-up";

    const getComboMessage = () => {
        if (combo >= 10) return "🔥 PURRFECT! 🔥";
        if (combo >= 7) return "😺 UNSTOPPABLE! 😺";
        if (combo >= 4) return "✨ NICE STREAK ✨";
        return "";
    };

    return (
        <div className="relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-purple-200 dark:border-purple-800 w-full max-w-md mx-auto overflow-hidden">
            <AnimatePresence>
                {floatingTexts.map((ft) => (
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
                            textShadow: "0 0 10px rgba(0,0,0,0.3)",
                        }}
                    >
                        {ft.text}
                    </motion.div>
                ))}
            </AnimatePresence>

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
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    Golden cats are worth extra points. Accuracy matters if you want the top score.
                </p>

                <div className="grid grid-cols-4 gap-2 mt-4 bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg">
                    <div className="text-center">
                        <p className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-wider">Score</p>
                        <p className="text-xl font-bold text-purple-600 dark:text-purple-400">{score}</p>
                    </div>
                    <div className="text-center">
                        <p className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-wider">Time</p>
                        <p className={`text-xl font-bold ${timeLeft < 10 ? "text-red-500 dark:text-red-400" : "text-gray-700 dark:text-gray-300"}`}>
                            {timeLeft}s
                        </p>
                    </div>
                    <div className="text-center">
                        <p className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-wider">Best</p>
                        <p className="text-xl font-bold text-orange-500 dark:text-orange-400 flex items-center justify-center gap-1">
                            <Trophy className="w-3 h-3" />
                            {highScore}
                        </p>
                    </div>
                    <div className="text-center">
                        <p className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-wider">Acc</p>
                        <p className="text-xl font-bold text-sky-600 dark:text-sky-400">{accuracy}%</p>
                    </div>
                </div>

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
                        <div className="text-xs font-bold uppercase tracking-[0.25em] text-purple-400 dark:text-purple-300">
                            {heatLabel}
                        </div>
                    </motion.div>
                )}
            </div>

            <div className="grid grid-cols-3 gap-3 mb-6">
                {Array.from({ length: GRID_SIZE }).map((_, i) => {
                    const isActive = activeHole === i;
                    const isGolden = isActive && catVariant === "golden";

                    return (
                        <motion.button
                            key={i}
                            type="button"
                            className={`aspect-square rounded-xl relative overflow-hidden ${isGolden
                                ? "bg-gradient-to-b from-amber-100 to-orange-200 dark:from-amber-900/40 dark:to-orange-900/50"
                                : "bg-gradient-to-b from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-900/50"
                                }`}
                            onClick={(e) => handleWhack(i, e)}
                            whileTap={{ scale: 0.95 }}
                            aria-label={isActive ? "Catch the cat" : "Empty hole"}
                        >
                            <div className={`absolute bottom-0 w-full h-1/3 bg-gradient-to-t ${isGolden
                                ? "from-orange-300/60 to-transparent dark:from-orange-950/60"
                                : "from-purple-300/50 to-transparent dark:from-purple-950/50"
                                } rounded-b-xl`} />

                            <div className="absolute bottom-1 left-2 text-purple-300/30 dark:text-purple-400/30 text-xs">🌿</div>
                            <div className="absolute bottom-1 right-2 text-purple-300/30 dark:text-purple-400/30 text-xs">🌿</div>

                            <AnimatePresence>
                                {isActive && (
                                    <motion.div
                                        initial={{ y: "100%", scale: 0.8 }}
                                        animate={{ y: "5%", scale: 1 }}
                                        exit={{ y: "100%", scale: 0.8 }}
                                        transition={{ type: "spring", stiffness: 400, damping: 15 }}
                                        className="absolute inset-0 flex items-center justify-center"
                                    >
                                        <div className="relative">
                                            {isGolden && (
                                                <motion.div
                                                    className="absolute inset-0 rounded-full bg-amber-300/40 blur-xl"
                                                    animate={{ scale: [0.9, 1.2, 0.9], opacity: [0.35, 0.65, 0.35] }}
                                                    transition={{ duration: 1, repeat: Infinity }}
                                                />
                                            )}
                                            <motion.div
                                                animate={{
                                                    rotate: [-5, 5, -5],
                                                    scale: [1, 1.05, 1],
                                                }}
                                                transition={{ duration: 0.5, repeat: Infinity }}
                                                className="relative text-5xl filter drop-shadow-lg"
                                            >
                                                {isGolden ? "😺" : "🐱"}
                                            </motion.div>
                                            {isGolden && (
                                                <Star className="absolute -top-2 -right-2 w-5 h-5 text-amber-500 dark:text-amber-300" />
                                            )}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {!isPlaying && (
                                <div className="absolute inset-0 flex items-center justify-center opacity-10">
                                    <Target className="w-8 h-8 text-purple-400 dark:text-purple-300" />
                                </div>
                            )}
                        </motion.button>
                    );
                })}
            </div>

            {!isPlaying && score > 0 && (
                <div className="mb-5 rounded-2xl border border-purple-200/70 dark:border-purple-800/70 bg-white/70 dark:bg-gray-900/50 p-4">
                    <div className="flex items-start justify-between gap-3">
                        <div>
                            <p className="text-sm font-semibold text-gray-700 dark:text-gray-200">Round recap</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">You landed {hits} hits with a best combo of {bestCombo}.</p>
                        </div>
                        <div className="text-right">
                            <p className="text-2xl font-black text-purple-600 dark:text-purple-400">{score}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">final score</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 mt-4 text-center">
                        <div className="rounded-xl bg-purple-50 dark:bg-purple-900/20 p-2">
                            <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">Accuracy</p>
                            <p className="text-sm font-bold text-sky-600 dark:text-sky-400">{accuracy}%</p>
                        </div>
                        <div className="rounded-xl bg-purple-50 dark:bg-purple-900/20 p-2">
                            <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">Best streak</p>
                            <p className="text-sm font-bold text-orange-500 dark:text-orange-400">{bestCombo}</p>
                        </div>
                        <div className="rounded-xl bg-purple-50 dark:bg-purple-900/20 p-2">
                            <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">Misses</p>
                            <p className="text-sm font-bold text-rose-500 dark:text-rose-400">{misses}</p>
                        </div>
                    </div>
                </div>
            )}

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
                        type="button"
                        onClick={stopGame}
                        className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium py-2 px-6 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors flex items-center gap-2 mx-auto"
                    >
                        <RotateCcw className="w-4 h-4" />
                        End Game
                    </button>
                )}
            </div>

            <div className="mt-4 flex items-center justify-between text-xs text-gray-400 dark:text-gray-500">
                <span className="flex items-center gap-1">
                    <TimerReset className="w-3 h-3" />
                    Pacing ramps up as you score
                </span>
                <span className="flex items-center gap-1">
                    <Star className="w-3 h-3" />
                    Golden cat = +3
                </span>
            </div>
        </div>
    );
}
