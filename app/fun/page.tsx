import { Metadata } from 'next';
import { CatBlessingToolClient } from './CatBlessingToolClient';
import { WhacAMouse } from '@/components/fun/WhacAMouse';
import { LaserChase } from '@/components/fun/LaserChase';
import { CatTrivia } from '@/components/fun/CatTrivia';
import { CatNameGenerator } from '@/components/fun/CatNameGenerator';

export const metadata: Metadata = {
  title: 'Cat Arcade & Blessing Corner | Purrify',
  description: 'Play cat games, get blessed by the Cat Goddess, find your perfect cat name, and test your feline knowledge!',
  robots: {
    index: true,
    follow: true,
  },
};

export default function FunPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-orange-100 dark:from-purple-950 dark:via-pink-950 dark:to-orange-950 overflow-x-hidden">

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 px-4">
        <div className="container mx-auto text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent mb-6 drop-shadow-sm animate-fade-in-up">
            The Purrify Arcade
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8 font-medium animate-fade-in-up delay-100">
            A magical corner of the internet dedicated to feline joy, silliness, and digital zoomies.
          </p>

          <div className="inline-flex items-center gap-2 bg-white/60 dark:bg-gray-800/60 backdrop-blur-md px-6 py-3 rounded-full border border-purple-200 dark:border-purple-800 shadow-lg animate-fade-in-up delay-200">
            <span className="text-2xl">🎮</span>
            <span className="text-gray-700 dark:text-gray-300 font-semibold">
              4 New Mini-Games Added!
            </span>
          </div>
        </div>

        {/* Decorative background elements */}
        <div className="absolute top-20 left-10 text-6xl opacity-20 animate-bounce delay-1000 hidden md:block">🧶</div>
        <div className="absolute top-40 right-20 text-6xl opacity-20 animate-bounce delay-700 hidden md:block">🐟</div>
      </section>

      <div className="container mx-auto px-4 pb-24 space-y-24">

        {/* Featured Tool: Blessing Corner */}
        <section className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-3xl transform -rotate-1 skew-x-1" />
          <div className="relative bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-white/50 dark:border-white/10 shadow-xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="text-left space-y-6">
                <div className="inline-block px-4 py-1.5 bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 rounded-full text-sm font-bold tracking-wide">
                  MOST POPULAR
                </div>
                <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-100">
                  The Cat Blessing Corner 🐱
                </h2>
                <div className="space-y-4 text-lg text-gray-600 dark:text-gray-300">
                  <p>
                    Feeling down? Need a quick dose of dopamine? Our patented* Cat Blessing technology delivers instant wholesomeness.
                  </p>
                  <p className="text-sm italic opacity-75">
                    *Not actually patented, but definitely magical.
                  </p>
                </div>

                <div className="flex flex-wrap gap-4 pt-4">
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                    <span className="w-8 h-8 rounded-full bg-pink-100 dark:bg-pink-900/50 flex items-center justify-center text-pink-600">⌨️</span>
                    Press 'M' to Meow
                  </div>
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                    <span className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900/50 flex items-center justify-center text-orange-600">🖱️</span>
                    Click for Blessings
                  </div>
                </div>
              </div>

              {/* The Client Tool acts as the interactive element here */}
              <div className="relative min-h-[300px] flex items-center justify-center">
                <div className="text-center p-8 bg-white/50 dark:bg-gray-800/50 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700">
                  <p className="text-xl font-medium text-gray-600 dark:text-gray-300 mb-4">
                    Look for the floating cat button! ↘️
                  </p>
                  <p className="text-sm text-gray-500">
                    (It follows you wherever you go, just like a real cat)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Game Zone */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Feline Arcade
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Test your reflexes and hunting instincts. No cats were harmed in the making of these games.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <WhacAMouse />
            <LaserChase />
          </div>
        </section>

        {/* Knowledge & Fun Zone */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent mb-4">
              Brain Food
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Expand your mind or find the perfect name for your new furry overlord.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <CatNameGenerator />
            <CatTrivia />
          </div>
        </section>

      </div>

      {/* Footer Note */}
      <footer className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border-t border-gray-200 dark:border-gray-800 py-12">
        <div className="container mx-auto px-4 text-center space-y-4">
          <p className="text-gray-600 dark:text-gray-400 font-medium">
            Made with 💜, 🧶, and too much caffeine by the Purrify Team.
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-500 max-w-md mx-auto">
            Warning: Playing these games may cause spontaneous smiling, uncontrollable giggling, and a sudden urge to adopt a cat. Proceed with caution.
          </p>
        </div>
      </footer>

      <CatBlessingToolClient />
    </div>
  );
}
