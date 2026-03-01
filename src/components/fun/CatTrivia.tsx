"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, Brain, Trophy, RotateCcw, Sparkles, Star } from "lucide-react";
import { playRandomMeow, playRandomPurr, initAudioContext } from "@/lib/sounds/cat-sounds";

interface Question {
    id: number;
    question: string;
    options: string[];
    correctAnswer: number; // index
    fact: string;
    emoji: string;
}

const QUESTIONS: Question[] = [
    {
        id: 1,
        question: "How many hours a day do cats sleep on average?",
        options: ["8-10 hours", "12-16 hours", "18-20 hours", "22-24 hours"],
        correctAnswer: 1,
        fact: "Cats conserve energy by sleeping for an average of 13 to 14 hours a day.",
        emoji: "😴"
    },
    {
        id: 2,
        question: "What is a group of cats called?",
        options: ["A clowder", "A pack", "A gaggle", "A herd"],
        correctAnswer: 0,
        fact: "A group of cats is called a 'clowder', while a group of kittens is called a 'kindle'.",
        emoji: "👥"
    },
    {
        id: 3,
        question: "How high can a cat jump relative to its height?",
        options: ["2 times", "4 times", "6 times", "8 times"],
        correctAnswer: 2,
        fact: "Cats can jump up to 6 times their length!",
        emoji: "🦘"
    },
    {
        id: 4,
        question: "What can't cats taste?",
        options: ["Salty", "Sour", "Sweet", "Bitter"],
        correctAnswer: 2,
        fact: "Cats lack the taste receptors for sweetness.",
        emoji: "🍬"
    },
    {
        id: 5,
        question: "What is a cat's nose print similar to?",
        options: ["A dog's paw", "A human fingerprint", "A snowflake", "A raindrop"],
        correctAnswer: 1,
        fact: "A cat's nose pad is ridged in a pattern that is unique, just like a human fingerprint.",
        emoji: "👃"
    },
    {
        id: 6,
        question: "What frequency range does a cat's purr typically fall into?",
        options: ["5-15 Hz", "25-150 Hz", "200-500 Hz", "1000+ Hz"],
        correctAnswer: 1,
        fact: "A cat's purr vibrates at 25-150 Hz, which is within the range that can promote healing and bone density!",
        emoji: "🔊"
    },
    {
        id: 7,
        question: "How many whiskers does a cat typically have?",
        options: ["8", "12", "16", "24"],
        correctAnswer: 3,
        fact: "Cats have about 24 whiskers - 12 on each side of their face, arranged in 4 rows.",
        emoji: "🎭"
    },
    {
        id: 8,
        question: "What does it mean when a cat slowly blinks at you?",
        options: ["They're tired", "They trust you", "They want food", "They're angry"],
        correctAnswer: 1,
        fact: "A slow blink from a cat is a 'kitty kiss' - it means they trust you and feel safe around you!",
        emoji: "😻"
    },
];

export function CatTrivia() {
    const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [isGameFinished, setIsGameFinished] = useState(false);
    const [streak, setStreak] = useState(0);
    const [maxStreak, setMaxStreak] = useState(0);

    const handleAnswer = useCallback((optionIdx: number) => {
        if (showResult) return;

        initAudioContext();
        setSelectedOption(optionIdx);
        setShowResult(true);

        const isCorrect = optionIdx === QUESTIONS[currentQuestionIdx].correctAnswer;

        if (isCorrect) {
            setScore(s => s + 1);
            setStreak(s => {
                const newStreak = s + 1;
                setMaxStreak(m => Math.max(m, newStreak));
                return newStreak;
            });
            playRandomMeow();
        } else {
            setStreak(0);
        }
    }, [showResult, currentQuestionIdx]);

    const nextQuestion = useCallback(() => {
        if (currentQuestionIdx < QUESTIONS.length - 1) {
            setCurrentQuestionIdx(prev => prev + 1);
            setShowResult(false);
            setSelectedOption(null);
        } else {
            setIsGameFinished(true);
            if (score >= QUESTIONS.length / 2) {
                playRandomPurr();
            }
        }
    }, [currentQuestionIdx, score]);

    const restartGame = useCallback(() => {
        setCurrentQuestionIdx(0);
        setScore(0);
        setShowResult(false);
        setSelectedOption(null);
        setIsGameFinished(false);
        setStreak(0);
        setMaxStreak(0);
        playRandomMeow();
    }, []);

    const currentQ = QUESTIONS[currentQuestionIdx];
    const isCorrect = selectedOption === currentQ?.correctAnswer;
    const progress = ((currentQuestionIdx + (showResult ? 1 : 0)) / QUESTIONS.length) * 100;

    if (isGameFinished) {
        const percentage = (score / QUESTIONS.length) * 100;

        return (
            <div className="bg-white/80 bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-purple-200 border-purple-800 w-full max-w-md mx-auto text-center">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-20 h-20 bg-gradient-to-br from-purple-100 to-pink-100 from-purple-900/50 to-pink-900/50 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                    {percentage === 100 ? (
                        <Trophy className="w-10 h-10 text-yellow-500 text-yellow-400" />
                    ) : percentage >= 70 ? (
                        <Star className="w-10 h-10 text-purple-500 text-purple-400" />
                    ) : (
                        <Brain className="w-10 h-10 text-purple-600 text-purple-400" />
                    )}
                </motion.div>

                <h2 className="text-2xl font-bold text-gray-800 text-gray-200 mb-4">Quiz Complete!</h2>

                <div className="text-4xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                    {score} / {QUESTIONS.length}
                </div>

                <p className="text-sm text-gray-500 text-gray-400 mb-6">
                    Best Streak: {maxStreak} 🔥
                </p>

                <div className="mb-8">
                    {percentage === 100 ? (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-gradient-to-r from-yellow-100 to-orange-100 from-yellow-900/30 to-orange-900/30 p-4 rounded-xl"
                        >
                            <p className="text-orange-600 text-orange-400 font-bold text-lg">🏆 PURRFECT SCORE! 🏆</p>
                            <p className="text-sm text-orange-500 text-orange-300">You're a certified Cat Genius!</p>
                        </motion.div>
                    ) : percentage >= 70 ? (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-gradient-to-r from-purple-100 to-pink-100 from-purple-900/30 to-pink-900/30 p-4 rounded-xl"
                        >
                            <p className="text-purple-600 text-purple-400 font-bold text-lg">🌟 Excellent! 🌟</p>
                            <p className="text-sm text-purple-500 text-purple-300">You really know your kitties!</p>
                        </motion.div>
                    ) : percentage >= 50 ? (
                        <p className="text-blue-600 text-blue-400 font-medium">😺 Not bad! Keep learning!</p>
                    ) : (
                        <p className="text-orange-600 text-orange-400 font-medium">📚 Study those cat facts!</p>
                    )}
                </div>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={restartGame}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-8 rounded-full transition-all flex items-center gap-2 mx-auto"
                >
                    <RotateCcw className="w-4 h-4" />
                    Play Again
                </motion.button>
            </div>
        );
    }

    return (
        <div className="bg-white/80 bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-purple-200 border-purple-800 w-full max-w-md mx-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-800 text-gray-200 flex items-center gap-2">
                    <Brain className="w-5 h-5 text-purple-500 text-purple-400" />
                    Cat Trivia
                </h2>
                <div className="flex items-center gap-3">
                    {streak > 0 && (
                        <span className="text-xs font-bold text-orange-500 text-orange-400 bg-orange-100 bg-orange-900/30 px-2 py-1 rounded-full">
                            🔥 {streak}
                        </span>
                    )}
                    <span className="text-sm font-medium text-gray-500 text-gray-400 bg-gray-100 bg-gray-700 px-3 py-1 rounded-full">
                        {currentQuestionIdx + 1} / {QUESTIONS.length}
                    </span>
                </div>
            </div>

            {/* Progress bar */}
            <div className="w-full h-2 bg-gray-200 bg-gray-700 rounded-full mb-6 overflow-hidden">
                <motion.div
                    className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3 }}
                />
            </div>

            {/* Question */}
            <div className="mb-6">
                <div className="flex items-start gap-3 mb-4">
                    <span className="text-3xl">{currentQ.emoji}</span>
                    <h3 className="text-lg font-medium text-gray-800 text-gray-100 leading-relaxed">
                        {currentQ.question}
                    </h3>
                </div>

                <div className="space-y-2">
                    {currentQ.options.map((option, idx) => {
                        let buttonClass = "w-full text-left p-4 rounded-xl border-2 transition-all duration-200 ";

                        if (showResult) {
                            if (idx === currentQ.correctAnswer) {
                                buttonClass += "bg-green-100 bg-green-900/30 border-green-500 text-green-800 text-green-200";
                            } else if (idx === selectedOption) {
                                buttonClass += "bg-red-100 bg-red-900/30 border-red-500 text-red-800 text-red-200";
                            } else {
                                buttonClass += "bg-gray-50 bg-gray-800 border-gray-200 border-gray-700 opacity-50";
                            }
                        } else {
                            buttonClass += "bg-white bg-gray-700/50 border-gray-200 border-gray-600 hover:border-purple-400 hover:bg-purple-50 hover:bg-purple-900/20 hover:shadow-md";
                        }

                        return (
                            <motion.button
                                key={idx}
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
                                            <Check className="w-5 h-5 text-green-600 text-green-400" />
                                        </motion.div>
                                    )}
                                    {showResult && idx === selectedOption && idx !== currentQ.correctAnswer && (
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: "spring", stiffness: 500 }}
                                        >
                                            <X className="w-5 h-5 text-red-600 text-red-400" />
                                        </motion.div>
                                    )}
                                </div>
                            </motion.button>
                        );
                    })}
                </div>
            </div>

            {/* Result feedback */}
            <AnimatePresence mode="wait">
                {showResult && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: 'auto' }}
                        exit={{ opacity: 0, y: -10, height: 0 }}
                        className={`p-4 rounded-xl mb-4 ${isCorrect
                            ? 'bg-gradient-to-r from-green-100 to-emerald-100 from-green-900/30 to-emerald-900/30 border border-green-200 border-green-800'
                            : 'bg-gradient-to-r from-red-100 to-pink-100 from-red-900/30 to-pink-900/30 border border-red-200 border-red-800'
                            }`}
                    >
                        <div className="flex items-start gap-3">
                            <span className="text-2xl">{isCorrect ? '🎉' : '📚'}</span>
                            <div>
                                <p className={`font-bold mb-1 ${isCorrect ? 'text-green-800 text-green-200' : 'text-red-800 text-red-200'
                                    }`}>
                                    {isCorrect ? 'Correct!' : 'Not quite!'}
                                </p>
                                <p className={`text-sm ${isCorrect ? 'text-green-700 text-green-300' : 'text-red-700 text-red-300'
                                    }`}>
                                    {currentQ.fact}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Next button */}
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
                            {currentQuestionIdx < QUESTIONS.length - 1 ? (
                                <>
                                    Next Question
                                    <Sparkles className="w-4 h-4" />
                                </>
                            ) : (
                                'See Results 🏆'
                            )}
                        </motion.button>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
