"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, Brain, Trophy, RotateCcw, Sparkles, Star, Shuffle } from "lucide-react";
import { playRandomMeow, playRandomPurr, initAudioContext } from "@/lib/sounds/cat-sounds";

interface Question {
    id: number;
    question: string;
    options: string[];
    correctAnswer: number;
    fact: string;
    emoji: string;
}

interface RoundQuestion {
    id: number;
    question: string;
    options: string[];
    correctAnswer: number;
    fact: string;
    emoji: string;
}

const HIGH_SCORE_KEY = "cat-trivia-best-score";

const QUESTIONS: Question[] = [
    {
        id: 1,
        question: "How many hours a day do cats sleep on average?",
        options: ["8-10 hours", "12-16 hours", "18-20 hours", "22-24 hours"],
        correctAnswer: 1,
        fact: "Cats conserve energy by sleeping for an average of 13 to 14 hours a day.",
        emoji: "😴",
    },
    {
        id: 2,
        question: "What is a group of cats called?",
        options: ["A clowder", "A pack", "A gaggle", "A herd"],
        correctAnswer: 0,
        fact: "A group of cats is called a clowder, while a group of kittens is called a kindle.",
        emoji: "👥",
    },
    {
        id: 3,
        question: "How high can a cat jump relative to its height?",
        options: ["2 times", "4 times", "6 times", "8 times"],
        correctAnswer: 2,
        fact: "Cats can jump up to roughly six times their body length.",
        emoji: "🦘",
    },
    {
        id: 4,
        question: "What can't cats taste?",
        options: ["Salty", "Sour", "Sweet", "Bitter"],
        correctAnswer: 2,
        fact: "Cats lack the taste receptors needed to detect sweetness.",
        emoji: "🍬",
    },
    {
        id: 5,
        question: "What is a cat's nose print similar to?",
        options: ["A dog's paw", "A human fingerprint", "A snowflake", "A raindrop"],
        correctAnswer: 1,
        fact: "A cat's nose pad has a ridged pattern that is unique, like a fingerprint.",
        emoji: "👃",
    },
    {
        id: 6,
        question: "What frequency range does a cat's purr typically fall into?",
        options: ["5-15 Hz", "25-150 Hz", "200-500 Hz", "1000+ Hz"],
        correctAnswer: 1,
        fact: "A cat's purr often sits in the 25-150 Hz range, which overlaps with frequencies linked to tissue repair.",
        emoji: "🔊",
    },
    {
        id: 7,
        question: "How many whiskers does a cat typically have?",
        options: ["8", "12", "16", "24"],
        correctAnswer: 3,
        fact: "Most cats have about 24 whiskers, 12 on each side of the face.",
        emoji: "🎭",
    },
    {
        id: 8,
        question: "What does it mean when a cat slowly blinks at you?",
        options: ["They're tired", "They trust you", "They want food", "They're angry"],
        correctAnswer: 1,
        fact: "A slow blink is often called a kitty kiss. It signals trust and comfort.",
        emoji: "😻",
    },
];

function shuffleArray<T>(items: T[]) {
    const nextItems = [...items];

    for (let index = nextItems.length - 1; index > 0; index -= 1) {
        const swapIndex = Math.floor(Math.random() * (index + 1));
        [nextItems[index], nextItems[swapIndex]] = [nextItems[swapIndex], nextItems[index]];
    }

    return nextItems;
}

function buildRoundQuestions() {
    return shuffleArray(QUESTIONS).map<RoundQuestion>((question) => {
        const optionRecords = shuffleArray(
            question.options.map((option, index) => ({
                label: option,
                isCorrect: index === question.correctAnswer,
            })),
        );

        return {
            id: question.id,
            question: question.question,
            options: optionRecords.map((option) => option.label),
            correctAnswer: optionRecords.findIndex((option) => option.isCorrect),
            fact: question.fact,
            emoji: question.emoji,
        };
    });
}

export function CatTrivia() {
    const [roundQuestions, setRoundQuestions] = useState<RoundQuestion[]>(() => buildRoundQuestions());
    const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
    const [score, setScore] = useState(0);
    const [bestScore, setBestScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [isGameFinished, setIsGameFinished] = useState(false);
    const [streak, setStreak] = useState(0);
    const [maxStreak, setMaxStreak] = useState(0);

    useEffect(() => {
        const saved = localStorage.getItem(HIGH_SCORE_KEY);
        if (saved) {
            setBestScore(parseInt(saved, 10));
        }
    }, []);

    const currentQ = roundQuestions[currentQuestionIdx];
    const isCorrect = selectedOption === currentQ?.correctAnswer;
    const progress = ((currentQuestionIdx + (showResult ? 1 : 0)) / roundQuestions.length) * 100;

    const finishRound = useCallback((finalScore: number) => {
        setIsGameFinished(true);
        setBestScore((prev) => {
            const nextBest = Math.max(prev, finalScore);
            localStorage.setItem(HIGH_SCORE_KEY, nextBest.toString());
            return nextBest;
        });

        if (finalScore >= roundQuestions.length / 2) {
            playRandomPurr();
        }
    }, [roundQuestions.length]);

    const handleAnswer = useCallback((optionIdx: number) => {
        if (showResult) return;

        initAudioContext();
        setSelectedOption(optionIdx);
        setShowResult(true);

        const answerIsCorrect = optionIdx === roundQuestions[currentQuestionIdx].correctAnswer;

        if (answerIsCorrect) {
            setScore((prev) => prev + 1);
            setStreak((prev) => {
                const nextStreak = prev + 1;
                setMaxStreak((currentMax) => Math.max(currentMax, nextStreak));
                return nextStreak;
            });
            playRandomMeow();
            return;
        }

        setStreak(0);
    }, [currentQuestionIdx, roundQuestions, showResult]);

    const nextQuestion = useCallback(() => {
        if (currentQuestionIdx < roundQuestions.length - 1) {
            setCurrentQuestionIdx((prev) => prev + 1);
            setShowResult(false);
            setSelectedOption(null);
            return;
        }

        finishRound(score);
    }, [currentQuestionIdx, finishRound, roundQuestions.length, score]);

    const restartGame = useCallback(() => {
        initAudioContext();
        setRoundQuestions(buildRoundQuestions());
        setCurrentQuestionIdx(0);
        setScore(0);
        setShowResult(false);
        setSelectedOption(null);
        setIsGameFinished(false);
        setStreak(0);
        setMaxStreak(0);
        playRandomMeow();
    }, []);

    if (isGameFinished) {
        const percentage = (score / roundQuestions.length) * 100;

        return (
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-purple-200 dark:border-purple-800 w-full max-w-md mx-auto text-center">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-20 h-20 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/50 dark:to-pink-900/50 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                    {percentage === 100 ? (
                        <Trophy className="w-10 h-10 text-yellow-500 dark:text-yellow-400" />
                    ) : percentage >= 70 ? (
                        <Star className="w-10 h-10 text-purple-500 dark:text-purple-400" />
                    ) : (
                        <Brain className="w-10 h-10 text-purple-600 dark:text-purple-400" />
                    )}
                </motion.div>

                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">Quiz Complete!</h2>

                <div className="text-4xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                    {score} / {roundQuestions.length}
                </div>

                <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="rounded-xl bg-purple-50 dark:bg-purple-900/20 p-3">
                        <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">Best streak</p>
                        <p className="text-sm font-bold text-orange-500 dark:text-orange-400">{maxStreak}</p>
                    </div>
                    <div className="rounded-xl bg-purple-50 dark:bg-purple-900/20 p-3">
                        <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">Best score</p>
                        <p className="text-sm font-bold text-purple-600 dark:text-purple-400">{bestScore}</p>
                    </div>
                </div>

                <div className="mb-8">
                    {percentage === 100 ? (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 p-4 rounded-xl"
                        >
                            <p className="text-orange-600 dark:text-orange-400 font-bold text-lg">🏆 PURRFECT SCORE! 🏆</p>
                            <p className="text-sm text-orange-500 dark:text-orange-300">You are officially operating at house-cat scholar level.</p>
                        </motion.div>
                    ) : percentage >= 70 ? (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 p-4 rounded-xl"
                        >
                            <p className="text-purple-600 dark:text-purple-400 font-bold text-lg">🌟 Excellent! 🌟</p>
                            <p className="text-sm text-purple-500 dark:text-purple-300">You know your cats well. The remix round probably will not fool you either.</p>
                        </motion.div>
                    ) : percentage >= 50 ? (
                        <p className="text-blue-600 dark:text-blue-400 font-medium">😺 Solid run. One more shuffled round and you will know these cold.</p>
                    ) : (
                        <p className="text-orange-600 dark:text-orange-400 font-medium">📚 Time for another pass. The quiz reshuffles every round now.</p>
                    )}
                </div>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={restartGame}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-8 rounded-full transition-all flex items-center gap-2 mx-auto"
                >
                    <RotateCcw className="w-4 h-4" />
                    Play Remixed Quiz
                </motion.button>
            </div>
        );
    }

    return (
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-purple-200 dark:border-purple-800 w-full max-w-md mx-auto">
            <div className="flex justify-between items-center mb-4">
                <div>
                    <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                        <Brain className="w-5 h-5 text-purple-500 dark:text-purple-400" />
                        Cat Trivia
                    </h2>
                    <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-purple-100 dark:bg-purple-900/30 px-3 py-1 text-xs font-bold text-purple-700 dark:text-purple-300">
                        <Shuffle className="w-3 h-3" />
                        Shuffled every round
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    {streak > 0 && (
                        <span className="text-xs font-bold text-orange-500 dark:text-orange-400 bg-orange-100 dark:bg-orange-900/30 px-2 py-1 rounded-full">
                            🔥 {streak}
                        </span>
                    )}
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                        {currentQuestionIdx + 1} / {roundQuestions.length}
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="rounded-xl bg-gray-50 dark:bg-gray-900/40 p-3">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">Score</p>
                    <p className="text-sm font-bold text-purple-600 dark:text-purple-400">{score}</p>
                </div>
                <div className="rounded-xl bg-gray-50 dark:bg-gray-900/40 p-3">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">Best</p>
                    <p className="text-sm font-bold text-amber-500 dark:text-amber-400">{bestScore}</p>
                </div>
            </div>

            <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full mb-6 overflow-hidden">
                <motion.div
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3 }}
                />
            </div>

            <div className="mb-6">
                <div className="flex items-start gap-3 mb-4">
                    <span className="text-3xl">{currentQ.emoji}</span>
                    <h3 className="text-lg font-medium text-gray-800 dark:text-gray-100 leading-relaxed">
                        {currentQ.question}
                    </h3>
                </div>

                <div className="space-y-2">
                    {currentQ.options.map((option, idx) => {
                        let buttonClass = "w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ";

                        if (showResult) {
                            if (idx === currentQ.correctAnswer) {
                                buttonClass += "bg-green-100 dark:bg-green-900/30 border-green-500 text-green-800 dark:text-green-200";
                            } else if (idx === selectedOption) {
                                buttonClass += "bg-red-100 dark:bg-red-900/30 border-red-500 text-red-800 dark:text-red-200";
                            } else {
                                buttonClass += "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 opacity-50";
                            }
                        } else {
                            buttonClass += "bg-white dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 hover:border-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:shadow-md";
                        }

                        return (
                            <motion.button
                                key={`${currentQ.id}-${option}`}
                                type="button"
                                onClick={() => handleAnswer(idx)}
                                disabled={showResult}
                                className={buttonClass}
                                whileHover={!showResult ? { scale: 1.02, x: 4 } : {}}
                                whileTap={!showResult ? { scale: 0.98 } : {}}
                            >
                                <div className="flex items-center justify-between">
                                    <span className="font-medium">{option}</span>
                                    {showResult && idx === currentQ.correctAnswer && (
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: "spring", stiffness: 500 }}
                                        >
                                            <Check className="w-5 h-5 text-green-600 dark:text-green-400" />
                                        </motion.div>
                                    )}
                                    {showResult && idx === selectedOption && idx !== currentQ.correctAnswer && (
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: "spring", stiffness: 500 }}
                                        >
                                            <X className="w-5 h-5 text-red-600 dark:text-red-400" />
                                        </motion.div>
                                    )}
                                </div>
                            </motion.button>
                        );
                    })}
                </div>
            </div>

            <AnimatePresence mode="wait">
                {showResult && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: "auto" }}
                        exit={{ opacity: 0, y: -10, height: 0 }}
                        className={`p-4 rounded-xl mb-4 ${isCorrect
                            ? "bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 border border-green-200 dark:border-green-800"
                            : "bg-gradient-to-r from-red-100 to-pink-100 dark:from-red-900/30 dark:to-pink-900/30 border border-red-200 dark:border-red-800"
                            }`}
                    >
                        <div className="flex items-start gap-3">
                            <span className="text-2xl">{isCorrect ? "🎉" : "📚"}</span>
                            <div>
                                <p className={`font-bold mb-1 ${isCorrect ? "text-green-800 dark:text-green-200" : "text-red-800 dark:text-red-200"}`}>
                                    {isCorrect ? "Correct!" : "Not quite!"}
                                </p>
                                <p className={`text-sm ${isCorrect ? "text-green-700 dark:text-green-300" : "text-red-700 dark:text-red-300"}`}>
                                    {currentQ.fact}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="flex justify-end h-12">
                <AnimatePresence>
                    {showResult && (
                        <motion.button
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={nextQuestion}
                            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-2 px-6 rounded-full transition-all flex items-center gap-2"
                        >
                            {currentQuestionIdx < roundQuestions.length - 1 ? (
                                <>
                                    Next Question
                                    <Sparkles className="w-4 h-4" />
                                </>
                            ) : (
                                "See Results 🏆"
                            )}
                        </motion.button>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
