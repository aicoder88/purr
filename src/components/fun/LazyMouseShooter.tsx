"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Rocket, Sparkles, Heart, Fish } from "lucide-react";

const MouseShooter = dynamic(
    () => import("@/components/fun/MouseShooter").then((mod) => mod.MouseShooter),
    {
        ssr: false,
        loading: () => (
            <div className="rounded-[2rem] border border-rose-200/70 bg-white/70 p-8 text-center shadow-xl dark:border-rose-900/50 dark:bg-gray-900/60">
                <div className="mx-auto h-14 w-14 animate-pulse rounded-full bg-gradient-to-br from-rose-300 via-orange-200 to-sky-200" />
                <p className="mt-4 text-sm font-semibold uppercase tracking-[0.3em] text-rose-500 dark:text-rose-300">
                    Loading Arcade Mode
                </p>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                    Rolling out the cushions, polishing the laser blaster, and waking up the mouse mob.
                </p>
            </div>
        ),
    },
);

export function LazyMouseShooter() {
    const [isLoaded, setIsLoaded] = useState(false);

    if (isLoaded) {
        return <MouseShooter />;
    }

    return (
        <div className="relative overflow-hidden rounded-[2rem] border border-rose-200/70 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.95),_rgba(255,236,231,0.82)_35%,_rgba(226,244,255,0.78)_70%,_rgba(255,255,255,0.85))] p-8 shadow-[0_24px_90px_rgba(255,120,120,0.16)] dark:border-rose-900/50 dark:bg-[radial-gradient(circle_at_top,_rgba(80,36,58,0.82),_rgba(45,22,46,0.92)_45%,_rgba(15,23,42,0.96)_80%)]">
            <div className="pointer-events-none absolute -left-10 top-10 h-32 w-32 rounded-full bg-rose-200/50 blur-3xl dark:bg-rose-600/20" />
            <div className="pointer-events-none absolute right-0 top-0 h-40 w-40 rounded-full bg-sky-200/60 blur-3xl dark:bg-sky-500/20" />
            <div className="pointer-events-none absolute bottom-0 left-1/3 h-32 w-32 rounded-full bg-amber-200/60 blur-3xl dark:bg-amber-500/20" />

            <div className="relative grid gap-8 lg:grid-cols-[1.25fr_0.95fr] lg:items-center">
                <div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/70 px-4 py-2 text-xs font-black uppercase tracking-[0.3em] text-rose-500 shadow-sm dark:border-white/10 dark:bg-white/10 dark:text-rose-200">
                        <Sparkles className="h-4 w-4" />
                        New Lazy-Load Game
                    </div>
                    <h3 className="mt-5 font-serif text-4xl font-black text-gray-900 dark:text-white md:text-5xl">
                        Whisker Run
                    </h3>
                    <p className="mt-4 max-w-2xl text-base leading-7 text-gray-600 dark:text-gray-300 md:text-lg">
                        A cute side-scrolling run-and-gun where a cat dashes across rooftops, cushions, and moonlit lounges,
                        blasting laser-pointer shots at mice while chasing the stolen Star Pointer.
                    </p>

                    <div className="mt-6 grid gap-3 sm:grid-cols-3">
                        <div className="rounded-2xl border border-rose-200/70 bg-white/70 p-4 dark:border-rose-900/40 dark:bg-white/5">
                            <Rocket className="h-5 w-5 text-rose-500 dark:text-rose-300" />
                            <p className="mt-2 text-sm font-semibold text-gray-800 dark:text-gray-100">Run left to right</p>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">A proper side-scroller with jumps, levels, and a finish goal.</p>
                        </div>
                        <div className="rounded-2xl border border-sky-200/70 bg-white/70 p-4 dark:border-sky-900/40 dark:bg-white/5">
                            <Fish className="h-5 w-5 text-sky-500 dark:text-sky-300" />
                            <p className="mt-2 text-sm font-semibold text-gray-800 dark:text-gray-100">Tuna and laser pickups</p>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Collect treats, power up, and finish each district.</p>
                        </div>
                        <div className="rounded-2xl border border-amber-200/70 bg-white/70 p-4 dark:border-amber-900/40 dark:bg-white/5">
                            <Heart className="h-5 w-5 text-amber-500 dark:text-amber-300" />
                            <p className="mt-2 text-sm font-semibold text-gray-800 dark:text-gray-100">Optional email bonus</p>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Claim bonus points without touching the initial page load.</p>
                        </div>
                    </div>
                </div>

                <div className="relative overflow-hidden rounded-[1.75rem] border border-white/70 bg-gradient-to-b from-[#1b1130] via-[#3f2553] to-[#f48ca7] p-6 shadow-[0_30px_80px_rgba(58,22,67,0.35)] dark:border-white/10">
                    <div className="absolute inset-0 opacity-70">
                        <div className="absolute left-[8%] top-[18%] h-2 w-2 rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.9)]" />
                        <div className="absolute left-[28%] top-[10%] h-1.5 w-1.5 rounded-full bg-rose-200 shadow-[0_0_10px_rgba(255,220,220,0.85)]" />
                        <div className="absolute right-[14%] top-[20%] h-2 w-2 rounded-full bg-sky-200 shadow-[0_0_12px_rgba(191,219,254,0.9)]" />
                        <div className="absolute right-[32%] top-[32%] h-1.5 w-1.5 rounded-full bg-amber-100 shadow-[0_0_10px_rgba(254,243,199,0.95)]" />
                        <div className="absolute left-[22%] top-[42%] text-2xl">🐭</div>
                        <div className="absolute right-[24%] top-[44%] text-2xl">🐟</div>
                        <div className="absolute left-[46%] top-[26%] text-xl">✨</div>
                    </div>

                    <div className="relative rounded-[1.5rem] border border-white/15 bg-black/15 p-5 backdrop-blur-sm">
                        <div className="flex items-center justify-between text-white/90">
                            <span className="text-xs font-black uppercase tracking-[0.3em]">Cabinet Preview</span>
                            <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">Zero game JS until click</span>
                        </div>

                        <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-gradient-to-b from-[#281a45] to-[#43235a] p-6">
                            <div className="mx-auto flex max-w-xs items-center justify-between text-white">
                                <span className="text-3xl">🐭</span>
                                <span className="text-sm font-black uppercase tracking-[0.3em] text-rose-100">Moonbeam Sprint</span>
                                <span className="text-3xl">🐟</span>
                            </div>
                            <div className="mt-5 rounded-[1.5rem] border border-white/10 bg-[radial-gradient(circle_at_top,_rgba(255,181,208,0.42),_transparent_35%),linear-gradient(180deg,_rgba(23,13,41,1)_0%,_rgba(73,35,86,1)_100%)] p-6">
                                <div className="relative h-56 overflow-hidden rounded-[1.25rem] border border-white/10 bg-[#1c1130]">
                                    <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-sky-300/15 to-transparent" />
                                    <div className="absolute left-[8%] bottom-[26%] h-6 w-24 rounded-full bg-white/10" />
                                    <div className="absolute left-[12%] top-[18%] text-3xl">🐭</div>
                                    <div className="absolute right-[18%] bottom-[36%] text-3xl">🐭</div>
                                    <div className="absolute left-[48%] top-[14%] text-2xl">🔦</div>
                                    <div className="absolute right-[35%] top-[22%] text-2xl">🐟</div>
                                    <div className="absolute bottom-8 left-[28%] text-5xl">😺</div>
                                    <div className="absolute bottom-[28%] left-[39%] h-1 w-16 rounded-full bg-gradient-to-r from-transparent via-pink-300 to-white shadow-[0_0_18px_rgba(249,168,212,0.95)]" />
                                    <div className="absolute bottom-4 left-6 rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-white/90">Cute side-scroller, not a top-down ship game</div>
                                </div>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={() => setIsLoaded(true)}
                            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-black uppercase tracking-[0.25em] text-rose-500 transition hover:bg-rose-50"
                        >
                            <Rocket className="h-4 w-4" />
                            Load Whisker Run
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
