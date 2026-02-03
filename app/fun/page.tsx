import { Metadata } from 'next';
import { CatBlessingToolClient } from './CatBlessingToolClient';

export const metadata: Metadata = {
  title: 'Fun & Games - Cat Blessing Tool',
  description: 'Get your daily cat blessing! Click the button for random cat facts, jokes, and wholesome blessings. Press M to meow!',
  robots: {
    index: true,
    follow: true,
  },
};

export default function FunPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-orange-100 dark:from-purple-950 dark:via-pink-950 dark:to-orange-950">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent mb-4">
            🐱 Cat Blessing Corner 🐱
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Welcome to the purr-fect place for a quick smile! Click the floating cat button 
            or press <kbd className="px-2 py-1 bg-white dark:bg-gray-800 rounded border border-gray-300 dark:border-gray-600 font-mono text-sm">M</kbd> on your keyboard to receive a random cat blessing.
          </p>
        </div>

        {/* Instructions Card */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-purple-200 dark:border-purple-800">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6 text-center">
              How to Play
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/50 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-3xl">🖱️</span>
                </div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Click the Cat</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Tap the floating cat button in the bottom right corner</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-pink-100 dark:bg-pink-900/50 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-3xl">⌨️</span>
                </div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Press M</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Hit the M key anywhere on this page for a quick meow</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-100 dark:bg-orange-900/50 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-3xl">🎉</span>
                </div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Collect Meows</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Every 10 meows triggers a special confetti celebration!</p>
              </div>
            </div>
          </div>
        </div>

        {/* Fun Stats Preview */}
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm px-6 py-3 rounded-full border border-purple-200 dark:border-purple-800">
            <span className="text-2xl">✨</span>
            <span className="text-gray-700 dark:text-gray-300">
              <strong>19</strong> unique blessings • <strong>5</strong> meow sounds • <strong>Infinite</strong> joy
            </span>
            <span className="text-2xl">✨</span>
          </div>
        </div>

        {/* The Actual Tool - Client Component */}
        <CatBlessingToolClient />

        {/* Footer Note */}
        <div className="mt-16 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Made with 💜 by the Purrify team for cat lovers everywhere.
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
            No cats were disturbed in the making of this tool. They were all napping. 😴
          </p>
        </div>
      </div>
    </div>
  );
}
