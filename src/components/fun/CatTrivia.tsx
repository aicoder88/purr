"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, HelpCircle, Brain } from "lucide-react";

interface Question {
    id: number;
    question: string;
    options: string[];
    correctAnswer: number; // index
    fact: string;
}

const QUESTIONS: Question[] = [
    {
        id: 1,
        question: "How many hours a day do cats sleep on average?",
        options: ["8-10 hours", "12-16 hours", "18-20 hours", "22-24 hours"],
        correctAnswer: 1,
        fact: "Cats conserve energy by sleeping for an average of 13 to 14 hours a day."
    },
    {
        id: 2,
        question: "What is a group of cats called?",
        options: ["A clowder", "A pack", "A gaggle", "A herd"],
        correctAnswer: 0,
        fact: "A group of cats is called a 'clowder', while a group of kittens is called a 'kindle'."
    },
    {
        id: 3,
        question: "How high can a cat jump relative to its height?",
        options: ["2 times", "4 times", "6 times", "8 times"],
        correctAnswer: 2,
        fact: "Cats can jump up to 6 times their length!"
    },
    {
        id: 4,
        question: "What can't cats taste?",
        options: ["Salty", "Sour", "Sweet", "Bitter"],
        correctAnswer: 2,
        fact: "Cats lack the taste receptors for sweetness."
    },
    {
        id: 5,
        question: "What is a cat's nose print similar to?",
        options: ["A dog's paw", "A human fingerprint", "A snowflake", "A raindrop"],
        correctAnswer: 1,
        fact: "A cat's nose pad is ridged in a pattern that is unique, just like a human fingerprint."
    }
];

export function CatTrivia() {
    const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [isGameFinished, setIsGameFinished] = useState(false);

    const handleAnswer = (optionIdx: number) => {
        if (showResult) return;

        setSelectedOption(optionIdx);
        setShowResult(true);

        if (optionIdx === QUESTIONS[currentQuestionIdx].correctAnswer) {
            setScore(s => s + 1);
        }
    };

    const nextQuestion = () => {
        if (currentQuestionIdx < QUESTIONS.length - 1) {
            setCurrentQuestionIdx(prev => prev + 1);
            setShowResult(false);
            setSelectedOption(null);
        } else {
            setIsGameFinished(true);
        }
    };

    const restartGame = () => {
        setCurrentQuestionIdx(0);
        setScore(0);
        setShowResult(false);
        setSelectedOption(null);
        setIsGameFinished(false);
    };

    if (isGameFinished) {
        return (
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-purple-200 dark:border-purple-800 w-full max-w-md mx-auto text-center">
                <div className="w-20 h-20 bg-purple-100 dark:bg-purple-900/50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Brain className="w-10 h-10 text-purple-600 dark:text-purple-400" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">Quiz Complete!</h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                    You scored <span className="font-bold text-purple-600 dark:text-purple-400">{score}</span> out of {QUESTIONS.length}!
                </p>

                <div className="mb-8">
                    {score === QUESTIONS.length ? (
                        <p className="text-green-600 dark:text-green-400 font-medium">Purr-fect score! You're a cat expert! 🏆</p>
                    ) : score >= QUESTIONS.length / 2 ? (
                        <p className="text-blue-600 dark:text-blue-400 font-medium">Not bad! You know your kitties! 😺</p>
                    ) : (
                        <p className="text-orange-600 dark:text-orange-400 font-medium">Keep studying your cat facts! 📚</p>
                    )}
                </div>

                <button
                    onClick={restartGame}
                    className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-full transition-colors"
                >
                    Try Again
                </button>
            </div>
        );
    }

    const currentQ = QUESTIONS[currentQuestionIdx];

    return (
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-purple-200 dark:border-purple-800 w-full max-w-md mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-purple-500" />
                    Cat Trivia
                </h2>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {currentQuestionIdx + 1} / {QUESTIONS.length}
                </span>
            </div>

            <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-800 dark:text-gray-100 mb-4">
                    {currentQ.question}
                </h3>

                <div className="space-y-3">
                    {currentQ.options.map((option, idx) => {
                        let buttonClass = "w-full text-left p-3 rounded-xl border transition-all ";

                        if (showResult) {
                            if (idx === currentQ.correctAnswer) {
                                buttonClass += "bg-green-100 dark:bg-green-900/30 border-green-500 text-green-800 dark:text-green-200";
                            } else if (idx === selectedOption) {
                                buttonClass += "bg-red-100 dark:bg-red-900/30 border-red-500 text-red-800 dark:text-red-200";
                            } else {
                                buttonClass += "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 opacity-50";
                            }
                        } else {
                            buttonClass += "bg-white dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 hover:border-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20";
                        }

                        return (
                            <button
                                key={idx}
                                onClick={() => handleAnswer(idx)}
                                disabled={showResult}
                                className={buttonClass}
                            >
                                <div className="flex items-center justify-between">
                                    <span>{option}</span>
                                    {showResult && idx === currentQ.correctAnswer && <Check className="w-4 h-4 text-green-600" />}
                                    {showResult && idx === selectedOption && idx !== currentQ.correctAnswer && <X className="w-4 h-4 text-red-600" />}
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>

            <AnimatePresence mode="wait">
                {showResult && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl mb-4 text-sm text-blue-800 dark:text-blue-200"
                    >
                        <p className="font-bold mb-1">Did you know?</p>
                        {currentQ.fact}
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="flex justify-end h-10">
                {showResult && (
                    <button
                        onClick={nextQuestion}
                        className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-6 rounded-full transition-colors"
                    >
                        {currentQuestionIdx < QUESTIONS.length - 1 ? "Next Question" : "See Results"}
                    </button>
                )}
            </div>
        </div>
    );
}
