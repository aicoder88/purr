export const dynamic = 'force-static';

import { Metadata } from 'next';
import { CatBlessingToolClient } from './CatBlessingToolClient';
import { WhacAMouse } from '@/components/fun/WhacAMouse';
import { LaserChase } from '@/components/fun/LaserChase';
import { CatTrivia } from '@/components/fun/CatTrivia';
import { CatNameGenerator } from '@/components/fun/CatNameGenerator';
import { LazyMouseShooter } from '@/components/fun/LazyMouseShooter';
import { Volume2, Sparkles, Zap, Brain, Rocket, Footprints, Trophy } from 'lucide-react';
import { SITE_URL } from '@/lib/constants';
import { buildPageMetadata } from '@/lib/seo/page-metadata';

export const metadata: Metadata = buildPageMetadata({
  title: 'Cat Arcade & Blessing Corner',
  description:
    'Play cat games with realistic meow sounds, get blessed by the Cat Goddess, find your perfect cat name, and test your feline knowledge!',
  path: '/fun/',
  image: `${SITE_URL}/optimized/logos/purrify-logo.png`,
  imageAlt: 'Purrify cat arcade',
  lastModified: '2026-03-08',
  robots: {
    index: true,
    follow: true,
  },
});

export default function FunPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-orange-100 dark:from-purple-950 dark:via-pink-950 dark:to-orange-950 overflow-x-hidden">

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 px-4">
        <div className="container mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-bold mb-6 shadow-lg animate-fade-in">
            <Volume2 className="w-4 h-4" />
            Now with Realistic Meows & Purrs!
          </div>

          <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 bg-clip-text text-transparent mb-6 drop-shadow-sm animate-fade-in-up">
            The Purrify Arcade
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8 font-medium animate-fade-in-up">
            A magical corner of the internet dedicated to feline joy, silliness, and digital zoomies.
            <span className="block mt-2 text-lg text-purple-600 dark:text-purple-400">
              🎵 Featuring rotating cat sounds, adaptive difficulty, and better replayable mini-games.
            </span>
          </p>

          <div className="inline-flex items-center gap-2 bg-white/60 dark:bg-gray-800/60 backdrop-blur-md px-6 py-3 rounded-full border border-purple-200 dark:border-purple-800 shadow-lg">
            <span className="text-2xl">🎮</span>
            <span className="text-gray-700 dark:text-gray-300 font-semibold">
              5 Mini-Games with Sound Effects!
            </span>
          </div>
        </div>

        {/* Decorative background elements */}
        <div className="absolute top-20 left-10 text-6xl opacity-20 animate-bounce delay-1000 hidden md:block">🧶</div>
        <div className="absolute top-40 right-20 text-6xl opacity-20 animate-bounce delay-700 hidden md:block">🐟</div>
        <div className="absolute bottom-10 left-1/4 text-5xl opacity-15 animate-pulse hidden md:block">💤</div>
      </section>

      <div className="container mx-auto px-4 pb-24 space-y-24">
        <section className="relative">
          <div className="absolute inset-0 rounded-[2.5rem] bg-[radial-gradient(circle_at_top_left,_rgba(255,220,180,0.24),_transparent_42%),radial-gradient(circle_at_bottom_right,_rgba(125,211,252,0.2),_transparent_36%),linear-gradient(135deg,_rgba(41,20,66,0.92),_rgba(94,39,104,0.88)_45%,_rgba(232,137,107,0.72))]" />
          <div className="relative overflow-hidden rounded-[2.5rem] border border-white/20 px-6 py-8 shadow-[0_30px_120px_rgba(72,24,86,0.25)] backdrop-blur-sm md:px-10 md:py-12">
            <div className="absolute inset-y-0 right-0 hidden w-[40%] bg-[url('/original-images/blog/cat-home-sanctuary-realistic-aesthetic.webp')] bg-cover bg-center opacity-30 md:block" />
            <div className="absolute inset-y-0 right-0 hidden w-[40%] bg-gradient-to-l from-[#2f1738]/30 via-[#2f1738]/65 to-transparent md:block" />

            <div className="relative grid gap-10 lg:grid-cols-[0.9fr_1.55fr] lg:items-start">
              <div className="text-white">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.32em] text-orange-100">
                  <Rocket className="h-4 w-4" />
                  Lead Game
                </div>
                <h2 className="mt-5 font-serif text-4xl font-black md:text-5xl">
                  WhiskerRun takes the spotlight
                </h2>
                <p className="mt-4 max-w-xl text-base leading-7 text-white/80 md:text-lg">
                  A prettier, tougher side-scroller with a four-leg sprint cycle, cinematic scenery, deliberate shooting,
                  better mouse enemies, richer pickup effects, and nearby respawns so the run keeps its momentum.
                </p>

                <div className="mt-7 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl border border-white/15 bg-white/10 px-4 py-4">
                    <Footprints className="h-5 w-5 text-orange-200" />
                    <p className="mt-2 text-sm font-black uppercase tracking-[0.24em] text-orange-100">New movement</p>
                    <p className="mt-1 text-sm text-white/70">The cat now runs low and fast on all four legs.</p>
                  </div>
                  <div className="rounded-2xl border border-white/15 bg-white/10 px-4 py-4">
                    <Zap className="h-5 w-5 text-sky-200" />
                    <p className="mt-2 text-sm font-black uppercase tracking-[0.24em] text-sky-100">Higher stakes</p>
                    <p className="mt-1 text-sm text-white/70">No hold-to-fire. Every shot has to be intentional.</p>
                  </div>
                  <div className="rounded-2xl border border-white/15 bg-white/10 px-4 py-4">
                    <Trophy className="h-5 w-5 text-amber-200" />
                    <p className="mt-2 text-sm font-black uppercase tracking-[0.24em] text-amber-100">Replay loop</p>
                    <p className="mt-1 text-sm text-white/70">Checkpoints, combos, and local scores keep runs alive longer.</p>
                  </div>
                </div>
              </div>

              <LazyMouseShooter />
            </div>
          </div>
        </section>

        <section className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-3xl transform -rotate-1 skew-x-1" />
          <div className="relative bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-white/50 dark:border-white/10 shadow-xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="text-left space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 rounded-full text-sm font-bold tracking-wide">
                  <Sparkles className="w-4 h-4" />
                  MOST POPULAR
                </div>
                <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-100">
                  The Cat Blessing Corner 🐱
                </h2>
                <div className="space-y-4 text-lg text-gray-600 dark:text-gray-300">
                  <p>
                    Feeling down? Need a quick dose of dopamine? Our patented* Cat Blessing technology delivers instant wholesomeness with realistic meow sounds!
                  </p>
                  <p className="text-sm italic opacity-75">
                    *Not actually patented, but definitely magical.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-4">
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400 bg-white/50 dark:bg-gray-800/50 p-3 rounded-lg">
                    <span className="w-8 h-8 rounded-full bg-pink-100 dark:bg-pink-900/50 flex items-center justify-center text-pink-600 dark:text-pink-400 text-xs font-bold">M</span>
                    Press M to Meow
                  </div>
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400 bg-white/50 dark:bg-gray-800/50 p-3 rounded-lg">
                    <span className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center text-purple-600 dark:text-purple-400 text-xs font-bold">💤</span>
                    Click for Purrs
                  </div>
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400 bg-white/50 dark:bg-gray-800/50 p-3 rounded-lg">
                    <span className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900/50 flex items-center justify-center text-orange-600 dark:text-orange-400 text-xs font-bold">🖱️</span>
                    Click for Blessings
                  </div>
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-500 dark:text-gray-400 bg-white/50 dark:bg-gray-800/50 p-3 rounded-lg">
                    <span className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center text-green-600 dark:text-green-400 text-xs font-bold">🔊</span>
                    Rotating Sounds!
                  </div>
                </div>
              </div>

              {/* The Client Tool acts as the interactive element here */}
              <div className="relative min-h-[300px] flex items-center justify-center">
                <div className="text-center p-8 bg-white/50 dark:bg-gray-800/50 rounded-2xl border border-dashed border-gray-300 dark:border-gray-700">
                  <div className="text-6xl mb-4">🐱</div>
                  <p className="text-xl font-medium text-gray-600 dark:text-gray-300 mb-4">
                    Look for the floating cat button! ↘️
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    (It follows you wherever you go, just like a real cat)
                  </p>
                  <div className="mt-4 text-xs text-purple-500 dark:text-purple-400">
                    Every click plays a different meow! 🎵
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Game Zone */}
        <section>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full text-sm font-bold mb-4">
              <Zap className="w-4 h-4" />
              FAST-PACED FUN
            </div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Feline Arcade
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Test your reflexes and hunting instincts with faster pacing, bonus targets, combo tracking,
              and saved best scores. No cats were harmed in the making of these games.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-3 max-w-4xl mx-auto text-left">
              <div className="rounded-2xl border border-blue-200/70 dark:border-blue-800/70 bg-white/60 dark:bg-gray-900/40 px-4 py-3">
                <p className="text-xs font-black tracking-[0.25em] text-blue-500 dark:text-blue-300 uppercase">Adaptive</p>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Rounds speed up as your score climbs instead of staying flat.</p>
              </div>
              <div className="rounded-2xl border border-purple-200/70 dark:border-purple-800/70 bg-white/60 dark:bg-gray-900/40 px-4 py-3">
                <p className="text-xs font-black tracking-[0.25em] text-purple-500 dark:text-purple-300 uppercase">Replayable</p>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Trivia remixes its order every round and arcade games now save local bests.</p>
              </div>
              <div className="rounded-2xl border border-orange-200/70 dark:border-orange-800/70 bg-white/60 dark:bg-gray-900/40 px-4 py-3">
                <p className="text-xs font-black tracking-[0.25em] text-orange-500 dark:text-orange-300 uppercase">Higher Stakes</p>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">Golden targets and accuracy stats reward clean clicking over spam tapping.</p>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <WhacAMouse />
            <LaserChase />
          </div>
        </section>

        {/* Knowledge & Fun Zone */}
        <section>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 px-4 py-2 rounded-full text-sm font-bold mb-4">
              <Brain className="w-4 h-4" />
              BRAIN FOOD
            </div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent mb-4">
              Learn & Create
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Expand your mind, test your knowledge with remixed trivia rounds, or find the perfect name for your new furry overlord.
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
          <p className="text-sm text-gray-500 dark:text-gray-500 max-w-lg mx-auto">
            Warning: Playing these games may cause spontaneous smiling, uncontrollable giggling,
            and a sudden urge to adopt a cat. The realistic meow sounds are not responsible for
            any confusion from your actual pets. Proceed with caution.
          </p>
          <p className="text-xs text-gray-400 dark:text-gray-600 mt-4">
            Sounds not working? Check out our sound setup guide in /public/sounds/cats/README.md
          </p>
        </div>
      </footer>

      <CatBlessingToolClient />
    </div>
  );
}
