"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Rocket, Sparkles, Footprints, MousePointer2 } from "lucide-react";

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
        <div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-[linear-gradient(180deg,_rgba(255,255,255,0.12),_rgba(255,255,255,0.05))] p-5 shadow-[0_24px_90px_rgba(23,9,33,0.24)] backdrop-blur-sm">
            <div className="absolute inset-0 bg-[url('/original-images/blog/cat-home-sanctuary-realistic-aesthetic.webp')] bg-cover bg-center opacity-40" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,224,184,0.22),_transparent_35%),linear-gradient(180deg,_rgba(18,10,31,0.22),_rgba(18,10,31,0.78))]" />

            <div className="relative rounded-[1.65rem] border border-white/15 bg-[#140d23]/35 p-5 backdrop-blur-sm">
                <div className="flex flex-wrap items-center justify-between gap-3 text-white/90">
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.28em] text-rose-100">
                        <Sparkles className="h-4 w-4" />
                        Lazy load cabinet
                    </div>
                    <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/80">
                        The heavy game code stays asleep until click
                    </span>
                </div>

                <div className="mt-5 overflow-hidden rounded-[1.5rem] border border-white/10 bg-[linear-gradient(180deg,_rgba(31,19,49,0.84),_rgba(91,42,77,0.84))] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                    <div className="relative h-[22rem] overflow-hidden rounded-[1.25rem] border border-white/10 bg-[#160f27]">
                        <div className="absolute inset-0 bg-[url('/original-images/blog/cat-home-sanctuary-realistic-aesthetic.webp')] bg-cover bg-center opacity-50" />
                        <div className="absolute inset-0 bg-[linear-gradient(180deg,_rgba(22,15,39,0.18),_rgba(22,15,39,0.7))]" />
                        <div className="absolute left-4 top-4 rounded-full bg-black/25 px-3 py-1 text-[11px] font-black uppercase tracking-[0.28em] text-white/85">
                            Moonbeam District
                        </div>
                        <div className="absolute right-4 top-4 rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold text-white/85">
                            Four-leg sprint build
                        </div>
                        <div className="absolute left-[10%] top-[20%] text-2xl">🐭</div>
                        <div className="absolute right-[14%] top-[36%] text-[1.75rem]">🐭</div>
                        <div className="absolute left-[18%] bottom-[22%] h-6 w-28 rounded-full bg-white/10 shadow-[0_0_20px_rgba(255,255,255,0.12)]" />
                        <div className="absolute right-[18%] bottom-[30%] h-5 w-24 rounded-full bg-white/10 shadow-[0_0_20px_rgba(255,255,255,0.12)]" />
                        <div className="absolute left-[52%] top-[18%] text-xl">✨</div>
                        <div className="absolute right-[34%] top-[18%] text-xl">🐟</div>
                        <div className="absolute bottom-[15%] left-[18%] text-6xl">🐈</div>
                        <div className="absolute bottom-[24%] left-[31%] h-1.5 w-16 rounded-full bg-gradient-to-r from-transparent via-pink-300 to-white shadow-[0_0_18px_rgba(249,168,212,0.85)]" />

                        <div className="absolute inset-x-4 bottom-4 grid gap-3 sm:grid-cols-3">
                            <div className="rounded-2xl border border-white/10 bg-black/20 px-3 py-3 text-white/90">
                                <Footprints className="h-4 w-4 text-orange-200" />
                                <p className="mt-2 text-xs font-black uppercase tracking-[0.24em] text-orange-100">Run</p>
                                <p className="mt-1 text-xs text-white/70">Low, fast cat animation with real checkpoints.</p>
                            </div>
                            <div className="rounded-2xl border border-white/10 bg-black/20 px-3 py-3 text-white/90">
                                <MousePointer2 className="h-4 w-4 text-sky-200" />
                                <p className="mt-2 text-xs font-black uppercase tracking-[0.24em] text-sky-100">Shoot</p>
                                <p className="mt-1 text-xs text-white/70">Tap or press once per shot. No held-fire spam.</p>
                            </div>
                            <div className="rounded-2xl border border-white/10 bg-black/20 px-3 py-3 text-white/90">
                                <Rocket className="h-4 w-4 text-rose-200" />
                                <p className="mt-2 text-xs font-black uppercase tracking-[0.24em] text-rose-100">Respawn</p>
                                <p className="mt-1 text-xs text-white/70">You come back close to where the mice got you.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={() => setIsLoaded(true)}
                    className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-black uppercase tracking-[0.25em] text-rose-500 transition hover:bg-rose-50"
                >
                    <Rocket className="h-4 w-4" />
                    Load Whisker Run
                </button>
            </div>
        </div>
    );
}
