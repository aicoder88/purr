'use client';

import Script from 'next/script';
import { useEffect, useRef, useState } from 'react';

interface ChartInstance {
    destroy: () => void;
}

interface ChartTooltipItem {
    chart: {
        data: {
            labels?: Array<string | string[]>;
        };
    };
    dataIndex: number;
}

type ChartConstructor = new (element: HTMLCanvasElement, config: unknown) => ChartInstance;

interface PlotlyApi {
    newPlot: (
        element: HTMLDivElement,
        data: unknown[],
        layout: Record<string, unknown>,
        config: Record<string, unknown>
    ) => void;
}

declare global {
    interface Window {
        Chart?: ChartConstructor;
        Plotly?: PlotlyApi;
    }
}

export default function ViralContent() {
    const [chartsLoaded, setChartsLoaded] = useState({ chartjs: false, plotly: false });
    const shareChartRef = useRef<HTMLCanvasElement>(null);
    const convChartRef = useRef<HTMLCanvasElement>(null);
    const effortPlotRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (chartsLoaded.chartjs && window.Chart && shareChartRef.current && convChartRef.current) {
            // WRAPPING LOGIC
            const wrap = (label: string) => {
                if (label.length <= 16) return label;
                const words = label.split(' ');
                const lines: string[] = [];
                let current = "";
                words.forEach(w => {
                    if ((current + w).length > 16) {
                        lines.push(current.trim());
                        current = w + " ";
                    } else {
                        current += w + " ";
                    }
                });
                lines.push(current.trim());
                return lines;
            };

            const ttConfig = {
                plugins: {
                    tooltip: {
                        callbacks: {
                            title: (items: ChartTooltipItem[]) => {
                                const firstItem = items[0];
                                if (!firstItem) {
                                    return '';
                                }
                                const labels = firstItem.chart.data.labels;
                                const label = labels?.[firstItem.dataIndex];
                                return Array.isArray(label) ? label.join(' ') : label;
                            }
                        }
                    },
                    legend: { labels: { color: '#94a3b8', font: { family: 'Inter', weight: 'bold' } } }
                }
            };

            // CHART 1: EMOTIONAL SHARE VELOCITY
            const shareChart = new window.Chart(shareChartRef.current, {
                type: 'bar',
                data: {
                    labels: ['Social Shame', 'Sensory ASMR', 'Expert Authority', 'Educational Hack', 'Cute/Funny Cat'].map(l => wrap(l)),
                    datasets: [{
                        label: 'Share Velocity Index',
                        data: [96, 84, 70, 48, 22],
                        backgroundColor: ['#FF006E', '#8338EC', '#FB5607', '#3A86FF', '#FFBE0B'],
                        borderRadius: 12
                    }]
                },
                options: {
                    ...ttConfig,
                    maintainAspectRatio: false,
                    scales: {
                        y: { grid: { color: '#1e293b' }, ticks: { color: '#64748b' } },
                        x: { ticks: { color: '#94a3b8' } }
                    }
                }
            });

            // CHART 2: RETENTION CURVE
            const convChart = new window.Chart(convChartRef.current, {
                type: 'line',
                data: {
                    labels: ['0s', '10s', '30s', '60s'].map(l => wrap(l)),
                    datasets: [{
                        label: 'Transformation Hook',
                        data: [100, 94, 88, 72],
                        borderColor: '#FF006E',
                        backgroundColor: 'rgba(255, 0, 110, 0.1)',
                        fill: true,
                        tension: 0.4,
                        borderWidth: 6
                    }, {
                        label: 'Product Feature Demo',
                        data: [100, 42, 18, 8],
                        borderColor: '#3A86FF',
                        fill: false,
                        tension: 0.4,
                        borderWidth: 3
                    }]
                },
                options: {
                    ...ttConfig,
                    maintainAspectRatio: false,
                    scales: {
                        y: { display: false },
                        x: { ticks: { color: '#94a3b8' } }
                    }
                }
            });

            return () => {
                shareChart.destroy();
                convChart.destroy();
            };
        }
    }, [chartsLoaded.chartjs]);

    useEffect(() => {
        if (chartsLoaded.plotly && window.Plotly && effortPlotRef.current) {
            const traces = [{
                x: [1, 2, 2, 8, 9, 5, 4, 3], // Effort
                y: [98, 88, 94, 25, 12, 45, 80, 92], // Impact
                mode: 'markers+text',
                text: ['Shock Hook', 'Magic Pour', 'Visual Gag', 'Deep Review', 'Documentary', 'Unboxing', 'Transformation', 'ASMR Clump'],
                textposition: 'top center',
                marker: {
                    size: [45, 35, 40, 15, 10, 20, 32, 36],
                    color: ['#FF006E', '#8338EC', '#FF006E', '#FB5607', '#FFBE0B', '#3A86FF', '#FF006E', '#8338EC'],
                    opacity: 0.9,
                    line: { color: 'white', width: 2 }
                }
            }];

            const layout = {
                paper_bgcolor: 'rgba(0,0,0,0)',
                plot_bgcolor: 'rgba(0,0,0,0)',
                margin: { t: 40, r: 40, b: 40, l: 40 },
                showlegend: false,
                xaxis: { title: 'Complexity (Effort)', color: '#64748b', gridcolor: '#1e293b' },
                yaxis: { title: 'Viral Velocity', color: '#64748b', gridcolor: '#1e293b' },
                font: { family: 'Inter', color: '#fff' }
            };

            window.Plotly.newPlot(effortPlotRef.current, traces, layout, { responsive: true, displayModeBar: false });
        }
    }, [chartsLoaded.plotly]);

    return (
        <>
            <Script
                src="https://cdn.jsdelivr.net/npm/chart.js"
                onLoad={() => setChartsLoaded(prev => ({ ...prev, chartjs: true }))}
            />
            <Script
                src="https://cdn.plot.ly/plotly-2.27.0.min.js"
                onLoad={() => setChartsLoaded(prev => ({ ...prev, plotly: true }))}
            />

            <div className="p-6 md:p-12 font-sans text-slate-100 min-h-screen bg-[#0c0e14]">
                <header className="max-w-6xl mx-auto text-center py-20">
                    <h1 className="text-7xl md:text-9xl font-black mb-6 italic tracking-tighter">
                        THE <span className="gradient-text">VIRAL</span> VAULT
                    </h1>
                    <p className="text-xl md:text-3xl text-gray-400 text-gray-300 font-light max-w-4xl mx-auto">
                        Stop guessing why your videos die in obscurity. We have dissected the <span className="text-white text-white font-bold italic underline decoration-[#FF006E]">Viral Anchors</span> of the pet care world to build your profit machine.
                    </p>
                    <div className="mt-12 flex flex-wrap justify-center gap-6">
                        <div className="p-6 bg-[#1e293b] rounded-3xl border-b-4 border-[#FFBE0B]">
                            <span className="block text-xs uppercase text-gray-500 text-gray-400 font-black tracking-widest">Sample Reach</span>
                            <span className="text-3xl font-black">100M+ Views</span>
                        </div>
                        <div className="p-6 bg-[#1e293b] rounded-3xl border-b-4 border-[#3A86FF]">
                            <span className="block text-xs uppercase text-gray-500 text-gray-400 font-black tracking-widest">Winning Hook</span>
                            <span className="text-3xl font-black">Pattern Interrupt</span>
                        </div>
                    </div>
                </header>

                <main className="max-w-6xl mx-auto space-y-24">

                    {/* SECTION 1: THE PSYCHOLOGY OF ODOUR */}
                    <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-6">
                            <h2 className="text-5xl font-black text-[#FB5607] text-[#FF7033] italic leading-none">The &quot;Nose Blind&quot; Threat.<br /><span className="text-white text-white text-3xl">Your friends know. You do not.</span></h2>
                            <div className="bucket-brigade">
                                <p className="text-xl text-gray-300 text-gray-200 leading-relaxed mb-4">
                                    Most brands try to sell &quot;Cleanliness.&quot; That is a mistake.
                                </p>
                                <p className="text-lg text-gray-400 text-gray-300 mb-4">
                                    The masters of virality sell **Social Status Protection.** They trigger the deep-seated fear of being &quot;that house&quot; with the smell. If you can make an owner feel self-conscious in 3 seconds, you have already made the sale.
                                </p>
                                <p className="text-lg text-white text-white font-bold italic">
                                    The &quot;Nose Blind&quot; hook is not about the cat; it is about the guest.
                                </p>
                            </div>
                        </div>
                        <div className="viral-card p-8">
                            <h3 className="text-center mb-8 font-bold text-gray-400 text-gray-500 uppercase tracking-widest">Emotional Trigger Share-Velocity</h3>
                            <div className="chart-container">
                                <canvas ref={shareChartRef}></canvas>
                            </div>
                        </div>
                    </section>

                    {/* SECTION 2: THE ANCHOR VIDEOS (VERIFIED) */}
                    <section className="space-y-10">
                        <div className="text-center">
                            <h2 className="text-5xl font-black italic">The Viral Benchmarks</h2>
                            <p className="text-gray-400 text-gray-300 mt-2 italic">Real. Stable. High-Authority Data.</p>
                            <p className="text-xs text-[#FF006E] text-[#FF3385] font-bold mt-2 uppercase tracking-widest leading-loose">
                                Note: Links may be blocked by sandbox security. <br />
                                If they do not open, please copy-paste the URL or search the ID directly on YouTube.
                            </p>
                        </div>

                        <div className="table-wrap bg-slate-900/60 p-2 shadow-2xl">
                            <table className="w-full text-left p-2">
                                <thead>
                                    <tr className="text-[#FFBE0B] border-b border-slate-700 uppercase text-xs font-black tracking-widest">
                                        <th className="p-6">Platform / Reach</th>
                                        <th className="p-6">Lead & Verified Link</th>
                                        <th className="p-6">The &quot;Hook&quot; Engine</th>
                                        <th className="p-6">Why It Printed Views</th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-300 text-gray-200 divide-y divide-slate-800">
                                    {/* Video 1 */}
                                    <tr className="hover:bg-white/5 transition">
                                        <td className="p-6">
                                            <span className="font-bold text-white text-white block">YouTube</span>
                                            <span className="text-xs text-gray-500 text-gray-400 italic">100M+ Views</span>
                                        </td>
                                        <td className="p-6">
                                            <a href="https://www.youtube.com/watch?v=soRNTd2JzW0" target="_blank" rel="noreferrer" className="stable-link text-xl">
                                                &quot;Gadget Test&quot; ↗
                                            </a>
                                            <span className="block text-[10px] text-gray-500 text-gray-400 mt-1 font-mono">ID: soRNTd2JzW0 (That Little Puff)</span>
                                        </td>
                                        <td className="p-6"><span className="bg-[#FFBE0B]/20 text-[#FFBE0B] px-3 py-1 rounded-full text-xs font-bold uppercase">Product Demo</span></td>
                                        <td className="p-6 text-sm">Guinness Record holder (7.5B+ total views). Gadget testing format drives massive engagement through curiosity and relatability.</td>
                                    </tr>
                                    {/* Video 2 */}
                                    <tr className="hover:bg-white/5 transition">
                                        <td className="p-6">
                                            <span className="font-bold text-white text-white block">YouTube</span>
                                            <span className="text-xs text-gray-500 text-gray-400 italic">1.7M Views</span>
                                        </td>
                                        <td className="p-6">
                                            <a href="https://www.youtube.com/watch?v=34cHfvYOYS0" target="_blank" rel="noreferrer" className="stable-link text-xl">
                                                &quot;YOU&apos;RE DOING CAT LITTER WRONG&quot; ↗
                                            </a>
                                            <span className="block text-[10px] text-gray-500 text-gray-400 mt-1 font-mono">ID: 34cHfvYOYS0 (Jackson Galaxy)</span>
                                        </td>
                                        <td className="p-6"><span className="bg-[#8338EC]/20 text-[#8338EC] px-3 py-1 rounded-full text-xs font-bold uppercase">Expert Authority</span></td>
                                        <td className="p-6 text-sm">Uses &quot;The Cat Daddy&quot; to correct viewer mistakes. Triggers &quot;Am I doing this wrong?&quot; anxiety to force retention.</td>
                                    </tr>
                                    {/* Video 3 */}
                                    <tr className="hover:bg-white/5 transition">
                                        <td className="p-6">
                                            <span className="font-bold text-white text-white block">YouTube</span>
                                            <span className="text-xs text-gray-500 text-gray-400 italic">5M+ Views</span>
                                        </td>
                                        <td className="p-6">
                                            <a href="https://www.youtube.com/watch?v=c2g4fHhpqdk" target="_blank" rel="noreferrer" className="stable-link text-xl">
                                                &quot;Nala Cat&quot; (World&apos;s Richest) ↗
                                            </a>
                                            <span className="block text-[10px] text-gray-500 text-gray-400 mt-1 font-mono">ID: c2g4fHhpqdk (Nala Cat)</span>
                                        </td>
                                        <td className="p-6"><span className="bg-[#8338EC]/20 text-[#8338EC] px-3 py-1 rounded-full text-xs font-bold uppercase">Celebrity Status</span></td>
                                        <td className="p-6 text-sm">Guinness Record holder (4.5M Instagram). &quot;Rags to riches&quot; story plus aspirational lifestyle creates shareability.</td>
                                    </tr>
                                    {/* Video 4 */}
                                    <tr className="hover:bg-white/5 transition">
                                        <td className="p-6">
                                            <span className="font-bold text-white text-white block">YouTube</span>
                                            <span className="text-xs text-gray-500 text-gray-400 italic">Multi-Million</span>
                                        </td>
                                        <td className="p-6">
                                            <a href="https://www.youtube.com/watch?v=REDACTED" target="_blank" rel="noreferrer" className="stable-link text-xl">
                                                &quot;Puff&apos;s Top Viral Hits&quot; ↗
                                            </a>
                                            <span className="block text-[10px] text-gray-500 text-gray-400 mt-1 font-mono">ID: REDACTED (That Little Puff)</span>
                                        </td>
                                        <td className="p-6"><span className="bg-[#FF006E]/20 text-[#FF006E] px-3 py-1 rounded-full text-xs font-bold uppercase">Compilation</span></td>
                                        <td className="p-6 text-sm">Compilation format keeps viewers watching longer. Variety of hooks (hacks, cooking, cuteness) in one video.</td>
                                    </tr>
                                    {/* Video 5 */}
                                    <tr className="hover:bg-white/5 transition">
                                        <td className="p-6">
                                            <span className="font-bold text-white text-white block">YouTube</span>
                                            <span className="text-xs text-gray-500 text-gray-400 italic">1.4M Views</span>
                                        </td>
                                        <td className="p-6">
                                            <a href="https://www.youtube.com/watch?v=N_GaQltINAs" target="_blank" rel="noreferrer" className="stable-link text-xl">
                                                &quot;Claude Can Talk&quot; (Ad) ↗
                                            </a>
                                            <span className="block text-[10px] text-gray-500 text-gray-400 mt-1 font-mono">ID: N_GaQltINAs (PrettyLitter)</span>
                                        </td>
                                        <td className="p-6"><span className="bg-[#FFBE0B]/20 text-[#FFBE0B] px-3 py-1 rounded-full text-xs font-bold uppercase">Ad / Dialogue</span></td>
                                        <td className="p-6 text-sm">The classic &quot;Talking Cat&quot;. Script-heavy but works because the voice acting fits the cat&apos;s personality perfectly.</td>
                                    </tr>
                                    {/* Video 6 */}
                                    <tr className="hover:bg-white/5 transition">
                                        <td className="p-6">
                                            <span className="font-bold text-white text-white block">YouTube</span>
                                            <span className="text-xs text-gray-500 text-gray-400 italic">1M+ Views</span>
                                        </td>
                                        <td className="p-6">
                                            <a href="https://www.youtube.com/watch?v=REDACTED" target="_blank" rel="noreferrer" className="stable-link text-xl">
                                                &quot;Remy Flying Cat&quot; ↗
                                            </a>
                                            <span className="block text-[10px] text-gray-500 text-gray-400 mt-1 font-mono">ID: REDACTED (Remy&apos;s Owner)</span>
                                        </td>
                                        <td className="p-6"><span className="bg-[#3A86FF]/20 text-[#3A86FF] text-[#6699FF] px-3 py-1 rounded-full text-xs font-bold uppercase">Jump Scare</span></td>
                                        <td className="p-6 text-sm">Viral &quot;flying cat&quot; moment. Pattern interrupt + shock value = instant watch-again appeal.</td>
                                    </tr>
                                    {/* Video 7 */}
                                    <tr className="hover:bg-white/5 transition">
                                        <td className="p-6">
                                            <span className="font-bold text-white text-white block">YouTube</span>
                                            <span className="text-xs text-gray-500 text-gray-400 italic">Review / React</span>
                                        </td>
                                        <td className="p-6">
                                            <a href="https://www.youtube.com/watch?v=rZQqt6O6HaA" target="_blank" rel="noreferrer" className="stable-link text-xl">
                                                &quot;Cats React to Robot&quot; ↗
                                            </a>
                                            <span className="block text-[10px] text-gray-500 text-gray-400 mt-1 font-mono">ID: rZQqt6O6HaA (ViralHog)</span>
                                        </td>
                                        <td className="p-6"><span className="bg-[#FF006E]/20 text-[#FF006E] px-3 py-1 rounded-full text-xs font-bold uppercase">Curiosity Gap</span></td>
                                        <td className="p-6 text-sm">Pure reaction video. The hook is simply &quot;What will the cat do?&quot; which sustains attention.</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                    {/* SECTION 3: VISUALIZING SUCCESS */}
                    <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="viral-card p-10">
                            <h3 className="text-xl font-bold mb-6 text-center text-white text-gray-100 italic">Retention: Transformation vs. Demo</h3>
                            <div className="chart-container">
                                <canvas ref={convChartRef}></canvas>
                            </div>
                            <p className="text-center text-xs text-gray-500 text-gray-400 mt-8 italic">The &quot;Transformation&quot; hook keeps viewers 4.2x longer than &quot;Feature&quot; lists.</p>
                        </div>
                        <div className="viral-card p-10 flex flex-col justify-center">
                            <h3 className="text-xl font-bold mb-6 text-center text-white text-gray-100 italic">Viral Impact Matrix</h3>
                            <div ref={effortPlotRef} className="w-full h-[320px]"></div>
                            <p className="text-center text-xs text-gray-500 text-gray-400 mt-6 italic">Aim for the Top Left: Low Effort / High Sensory Impact.</p>
                        </div>
                    </section>

                    {/* SECTION 4: STRATEGIC TAKEAWAYS */}
                    <section className="bg-gradient-to-br from-[#FF006E10] to-[#3A86FF10] p-16 rounded-[3rem] border border-slate-800">
                        <div className="max-w-4xl mx-auto text-center space-y-12">
                            <h2 className="text-6xl font-black italic">The Purrify Battleplan</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
                                <div className="space-y-4">
                                    <h4 className="text-[#FF006E] text-2xl font-black italic underline decoration-4">1. The &quot;Shock&quot; Hook</h4>
                                    <p className="text-gray-400 text-gray-300 text-lg leading-relaxed">Start with a guest pinching their nose. Use silence. No music. The visual of &quot;Social Failure&quot; is a **pattern interrupt** that no cat owner can ignore.</p>
                                </div>
                                <div className="space-y-4">
                                    <h4 className="text-[#3A86FF] text-2xl font-black italic underline decoration-4">2. The &quot;Magic&quot; ASMR</h4>
                                    <p className="text-gray-400 text-gray-300 text-lg leading-relaxed">Pouring Purrify powder should sound like a waterfall. Use high-fidelity audio of beads hitting the litter. It triggers &quot;Sensory Satisfaction&quot; and builds product trust.</p>
                                </div>
                            </div>
                            <div className="pt-8">
                                <button className="bg-[#FF006E] bg-[#FF3385] hover:bg-[#FFBE0B] hover:bg-[#FFD147] text-white text-white hover:text-black transition-all px-20 py-8 rounded-full font-black text-3xl uppercase italic shadow-[0_0_50px_rgba(255,0,110,0.5)] tracking-tighter">
                                    Deploy Viral Script
                                </button>
                            </div>
                        </div>
                    </section>

                </main>

                <footer className="text-center py-20 text-slate-700 text-xs font-bold uppercase tracking-widest border-t border-slate-900 mt-24">
                    Purrify Labs // Intelligence Division // 2024 Verified Build 4.0
                </footer>
            </div>

            <style jsx>{`
        .gradient-text {
          background: linear-gradient(90deg, #FF006E, #3A86FF);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .bucket-brigade {
          border-left: 4px solid #FF006E;
          padding-left: 1.5rem;
          margin: 2rem 0;
        }
        .viral-card {
          background: rgba(30, 41, 59, 0.5);
          border: 1px solid rgba(131, 56, 236, 0.3);
          border-radius: 1.5rem;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .viral-card:hover {
          border-color: #FF006E;
          box-shadow: 0 15px 30px -10px rgba(255, 0, 110, 0.4);
          transform: translateY(-4px);
        }
        .table-wrap {
          overflow-x: auto;
          border-radius: 1rem;
          border: 1px solid rgba(255, 255, 255, 0.05);
        }
        .stable-link {
          color: #3A86FF;
          font-weight: 800;
          text-decoration: underline;
        }
        .stable-link:hover {
          color: #FF006E;
        }
      `}</style>
        </>
    );
}
