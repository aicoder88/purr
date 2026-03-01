"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Zap, TrendingUp, Globe, Server, Users, Clock, DollarSign, Target, Rocket, Shield, Brain } from "lucide-react";

// IMAGE SUGGESTIONS (as comments for each slide):
// Slide 1: Executive staring at quarterly revenue chart, clock in background
// Slide 2: Stack of cash burning with timer overlay
// Slide 3: Split screen - confident rep vs struggling rep on call
// Slide 4: Elegant AI waveform with neural network overlay
// Slide 5: Clean architecture diagram showing distributed system
// Slide 6: Professional meeting room with company branding
// Slide 7: Sophisticated dashboard showing training metrics
// Slide 8: Minimalist server infrastructure visualization
// Slide 9: Graph showing exponential growth trajectory
// Slide 10: Market size visualization - concentric circles
// Slide 11: Professional handshake with subtle tech overlay
// Slide 12: Forward-looking horizon with modern skyline

const slides = [
    {
        id: "hook",
        content: (
            <div className="flex flex-col items-center justify-center h-full text-center px-4 max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="mb-8"
                >
                    <p className="text-xl md:text-2xl text-gray-400 text-gray-300 mb-4 font-light tracking-wide">
                        A question for the board:
                    </p>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white text-gray-100 leading-tight mb-8">
                        What if your newest rep<br />could be <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">field-ready</span><br />in two weeks?
                    </h1>
                </motion.div>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="text-xl md:text-2xl text-gray-300 text-gray-200 max-w-4xl leading-relaxed"
                >
                    Not six months from now. Not after burning through your best leads.{" "}
                    <span className="text-white text-gray-100 font-medium">Two weeks.</span>
                </motion.p>
            </div>
        ),
        bg: "bg-black",
    },
    {
        id: "problem-pain",
        content: (
            <div className="flex flex-col items-center justify-center h-full text-center px-4 max-w-5xl mx-auto">
                <motion.h2
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    className="text-4xl md:text-6xl font-bold text-white text-gray-100 mb-8"
                >
                    The Invisible Burn Rate
                </motion.h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                    <motion.div
                        initial={{ x: -50, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="p-8 border border-gray-700 border-gray-600/50 bg-black/40 rounded-xl backdrop-blur-sm text-left"
                    >
                        <DollarSign className="w-12 h-12 text-red-400 text-red-300 mb-4" />
                        <p className="text-5xl font-bold text-white text-gray-100 mb-3">$3,000</p>
                        <p className="text-lg text-gray-300 text-gray-200 mb-3">per rep in training costs</p>
                        <p className="text-sm text-gray-500 text-gray-300">That&apos;s before they take their first call.</p>
                    </motion.div>
                    <motion.div
                        initial={{ x: 50, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="p-8 border border-gray-700 border-gray-600/50 bg-black/40 rounded-xl backdrop-blur-sm text-left"
                    >
                        <Clock className="w-12 h-12 text-orange-400 text-orange-300 mb-4" />
                        <p className="text-5xl font-bold text-white text-gray-100 mb-3">3-6 months</p>
                        <p className="text-lg text-gray-300 text-gray-200 mb-3">until they&apos;re productive</p>
                        <p className="text-sm text-gray-500 text-gray-300">Your best leads are the training ground.</p>
                    </motion.div>
                </div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="mt-12 p-6 border border-red-900/30 border-red-800/30 bg-red-950/20 rounded-xl max-w-3xl"
                >
                    <p className="text-xl text-gray-300 text-gray-200 leading-relaxed">
                        Every month of training delays is{" "}
                        <span className="text-white text-gray-100 font-semibold">lost revenue, burned leads, and compounding opportunity cost</span>.
                        The meter is running whether your reps are ready or not.
                    </p>
                </motion.div>
            </div>
        ),
        bg: "bg-zinc-950",
    },
    {
        id: "urgency",
        content: (
            <div className="flex flex-col items-center justify-center h-full text-center px-4 max-w-5xl mx-auto">
                <motion.h2
                    initial={{ scale: 0.9, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    className="text-4xl md:text-6xl font-bold text-white text-gray-100 mb-12"
                >
                    The Training Paradox
                </motion.h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mb-8">
                    <div className="p-8 border border-white/10 bg-white/5 bg-gray-800/5 rounded-xl text-left">
                        <p className="text-sm uppercase tracking-widest text-gray-500 text-gray-300 mb-3">The Reality</p>
                        <p className="text-xl text-gray-300 text-gray-200 leading-relaxed">
                            Your top performer took 400 calls to find their rhythm.
                            That&apos;s 400 prospects who heard their awkward pauses,
                            fumbled objections, and uncertain close attempts.
                        </p>
                    </div>
                    <div className="p-8 border border-purple-500/30 border-purple-400/30 bg-purple-900/10 rounded-xl text-left">
                        <p className="text-sm uppercase tracking-widest text-purple-400 text-purple-300 mb-3">The Question</p>
                        <p className="text-xl text-white text-gray-100 leading-relaxed font-medium">
                            What if those 400 practice calls happened before
                            your rep ever picked up the phone?
                        </p>
                    </div>
                </div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mt-8 p-6 bg-gradient-to-r from-purple-950/50 to-blue-950/50 border border-purple-500/20 border-purple-400/20 rounded-xl max-w-3xl"
                >
                    <p className="text-2xl text-white text-gray-100 leading-relaxed">
                        You can&apos;t afford to waste leads on training.<br />
                        <span className="text-gray-400 text-gray-300 text-gray-300 text-lg">But you can&apos;t afford untrained reps either.</span>
                    </p>
                </motion.div>
            </div>
        ),
        bg: "bg-slate-950",
    },
    {
        id: "solution-intro",
        content: (
            <div className="flex flex-col items-center justify-center h-full text-center px-4 max-w-5xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="mb-12"
                >
                    <p className="text-lg uppercase tracking-widest text-purple-400 text-purple-300 mb-6 font-light">
                        Built by Purrify
                    </p>
                    <h2 className="text-5xl md:text-7xl font-bold text-white text-gray-100 mb-6">
                        DialerGPT
                    </h2>
                    <p className="text-2xl md:text-3xl text-gray-300 text-gray-200 leading-relaxed max-w-4xl mx-auto">
                        An AI-powered training environment where your sales team practices{" "}
                        <span className="text-white text-gray-100 font-medium">hundreds of realistic conversations</span>{" "}
                        before they ever touch a real prospect.
                    </p>
                </motion.div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-8">
                    {[
                        { icon: Brain, title: "Intelligent Personas", desc: "Realistic AI customers that challenge and coach" },
                        { icon: Zap, title: "Instant Feedback", desc: "Real-time coaching on every call" },
                        { icon: Target, title: "Safe Practice", desc: "Master objections without losing leads" },
                    ].map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ y: 30, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ delay: idx * 0.15 }}
                            className="p-6 rounded-xl border border-white/10 bg-white/5 bg-gray-800/5 backdrop-blur-md text-left"
                        >
                            <item.icon className="w-10 h-10 text-purple-400 text-purple-300 mb-4" />
                            <h3 className="text-xl font-semibold text-white text-gray-100 mb-2">{item.title}</h3>
                            <p className="text-gray-400 text-gray-300 text-sm leading-relaxed">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        ),
        bg: "bg-black",
    },
    {
        id: "traction",
        content: (
            <div className="flex flex-col items-center justify-center h-full text-center px-4 max-w-6xl mx-auto">
                <h2 className="text-4xl md:text-6xl font-bold text-white text-gray-100 mb-8">
                    How It Works
                </h2>
                <p className="text-xl text-gray-400 text-gray-300 mb-12 max-w-3xl">
                    Built on modern distributed architecture for enterprise-grade reliability
                </p>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 w-full">
                    {[
                        { num: "01", title: "Upload Training Calls", desc: "Your best sales calls become the curriculum" },
                        { num: "02", title: "AI Analyzes Patterns", desc: "Distributed processing extracts winning techniques" },
                        { num: "03", title: "Rep Practices Live", desc: "Real-time voice conversations with instant feedback" },
                        { num: "04", title: "Track Performance", desc: "Analytics dashboard shows progress and readiness" }
                    ].map((step, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ y: 50, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ delay: idx * 0.1 }}
                            className="p-6 rounded-xl border border-white/10 bg-white/5 bg-gray-800/5 backdrop-blur-sm text-left"
                        >
                            <div className="text-4xl font-bold text-purple-400 text-purple-300 mb-4">{step.num}</div>
                            <h3 className="text-xl font-semibold text-white text-gray-100 mb-2">{step.title}</h3>
                            <p className="text-sm text-gray-400 text-gray-300 leading-relaxed">{step.desc}</p>
                        </motion.div>
                    ))}
                </div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="mt-12 p-6 border border-purple-500/20 border-purple-400/20 bg-purple-900/10 rounded-xl max-w-3xl"
                >
                    <p className="text-lg text-gray-300 text-gray-200">
                        <span className="text-white text-gray-100 font-semibold">Serverless architecture</span> ensures zero downtime.{" "}
                        <span className="text-white text-gray-100 font-semibold">Edge-optimized delivery</span> keeps latency under 200ms globally.
                    </p>
                </motion.div>
            </div>
        ),
        bg: "bg-gray-950",
    },
    {
        id: "infrastructure",
        content: (
            <div className="flex flex-col items-center justify-center h-full text-center px-4 max-w-5xl mx-auto">
                <div className="inline-flex items-center rounded-full border border-green-500/30 border-green-400/30 bg-green-500/10 px-6 py-2 text-sm font-medium text-green-400 text-green-300 mb-8">
                    <Shield className="mr-2 h-4 w-4" />
                    Real Customer, Real Results
                </div>
                <h2 className="text-4xl md:text-6xl font-bold text-white text-gray-100 mb-8 leading-tight">
                    How We Built It
                </h2>
                <p className="text-xl text-gray-400 text-gray-300 mb-12 max-w-3xl">
                    Purrify developed DialerGPT to solve our own sales training challenges
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mb-8">
                    <motion.div
                        initial={{ x: -30, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        className="p-8 border border-white/10 bg-white/5 bg-gray-800/5 rounded-xl text-left"
                    >
                        <Clock className="w-10 h-10 text-red-400 text-red-300 mb-4" />
                        <h3 className="text-2xl font-bold text-white text-gray-100 mb-3">Before</h3>
                        <p className="text-gray-400 text-gray-300 leading-relaxed">
                            New sales reps required months of shadowing and practice calls.
                            Training bottlenecks limited team growth and delayed revenue.
                        </p>
                    </motion.div>
                    <motion.div
                        initial={{ x: 30, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.15 }}
                        className="p-8 border border-green-500/20 border-green-400/20 bg-green-900/10 rounded-xl text-left"
                    >
                        <TrendingUp className="w-10 h-10 text-green-400 text-green-300 mb-4" />
                        <h3 className="text-2xl font-bold text-white text-gray-100 mb-3">After</h3>
                        <p className="text-gray-400 text-gray-300 leading-relaxed">
                            Reps now train on actual past calls with AI personas. Training time reduced dramatically,
                            costs slashed, and confidence soared before first prospect contact.
                        </p>
                    </motion.div>
                </div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="p-6 border border-green-500/30 border-green-400/30 bg-green-900/10 rounded-xl max-w-3xl"
                >
                    <p className="text-lg text-gray-300 text-gray-200">
                        <span className="text-white text-gray-100 font-semibold">&quot;Our reps are closing deals faster than ever. The AI training removed all the guesswork.&quot;</span>
                        <br />
                        <span className="text-sm text-gray-500 text-gray-300 mt-2 block">— Anthony Thanbiah, Sales Manager, Purrify</span>
                    </p>
                </motion.div>
            </div>
        ),
        bg: "bg-zinc-950",
    },
    {
        id: "ai-power",
        content: (
            <div className="flex flex-col items-center justify-center h-full text-center px-4 max-w-5xl mx-auto">
                <h2 className="text-4xl md:text-6xl font-bold text-white text-gray-100 mb-8">
                    The Platform
                </h2>
                <p className="text-xl text-gray-400 text-gray-300 mb-12 max-w-3xl">
                    Enterprise features that matter to CFOs and VPs of Sales
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                    {[
                        { icon: Brain, title: "Real-Time Voice AI", desc: "Natural conversations with sub-200ms latency" },
                        { icon: Target, title: "Custom Scenarios", desc: "Train on your actual sales calls and objections" },
                        { icon: Users, title: "Team Analytics", desc: "Dashboard tracking per-rep progress and readiness" },
                        { icon: Shield, title: "Enterprise Security", desc: "Bank-grade encryption, SOC2 & HIPAA ready" },
                        { icon: Zap, title: "Instant Coaching", desc: "AI feedback delivered immediately after each call" },
                        { icon: Globe, title: "Unlimited Scale", desc: "Train 5 reps or 5,000 simultaneously" },
                    ].map((feature, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ y: 30, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ delay: idx * 0.1 }}
                            className="p-6 border border-white/10 bg-white/5 bg-gray-800/5 rounded-xl text-left"
                        >
                            <feature.icon className="w-10 h-10 text-purple-400 text-purple-300 mb-4" />
                            <h3 className="text-lg font-semibold text-white text-gray-100 mb-2">{feature.title}</h3>
                            <p className="text-sm text-gray-400 text-gray-300 leading-relaxed">{feature.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        ),
        bg: "bg-black",
    },
    {
        id: "market-timing",
        content: (
            <div className="flex flex-col items-center justify-center h-full text-center px-4 max-w-5xl mx-auto">
                <Server className="w-20 h-20 text-blue-400 text-blue-300 mb-6" />
                <h2 className="text-4xl md:text-6xl font-bold text-white text-gray-100 mb-8">
                    Built for Enterprise Scale
                </h2>
                <p className="text-xl text-gray-400 text-gray-300 mb-12 max-w-3xl">
                    Modern cloud-native architecture designed for reliability and performance
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                    <motion.div
                        initial={{ x: -30, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        className="p-8 border border-blue-500/20 border-blue-400/20 bg-blue-900/10 rounded-xl text-left"
                    >
                        <h3 className="text-2xl font-bold text-white text-gray-100 mb-4">Auto-Scaling Infrastructure</h3>
                        <p className="text-gray-400 text-gray-300 leading-relaxed mb-4">
                            Elastic compute resources automatically scale based on demand.
                            Handle 10 or 10,000 concurrent training sessions without manual intervention.
                        </p>
                        <p className="text-sm text-gray-500 text-gray-400">
                            Distributed across multiple availability zones for fault tolerance
                        </p>
                    </motion.div>
                    <motion.div
                        initial={{ x: 30, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.15 }}
                        className="p-8 border border-blue-500/20 border-blue-400/20 bg-blue-900/10 rounded-xl text-left"
                    >
                        <h3 className="text-2xl font-bold text-white text-gray-100 mb-4">Global Edge Network</h3>
                        <p className="text-gray-400 text-gray-300 leading-relaxed mb-4">
                            Low-latency voice processing at the edge ensures natural conversations.
                            Sub-200ms response times globally through intelligent routing.
                        </p>
                        <p className="text-sm text-gray-500 text-gray-400">
                            Content delivery optimized for real-time voice applications
                        </p>
                    </motion.div>
                </div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mt-8 p-6 border border-blue-500/30 border-blue-400/30 bg-blue-900/10 rounded-xl max-w-3xl"
                >
                    <p className="text-lg text-gray-300 text-gray-200">
                        Our serverless architecture means you only pay for what you use,
                        while maintaining enterprise-grade reliability and security.
                    </p>
                </motion.div>
            </div>
        ),
        bg: "bg-slate-950",
    },
    {
        id: "social-proof",
        content: (
            <div className="flex flex-col items-center justify-center h-full text-center px-4 max-w-5xl mx-auto">
                <DollarSign className="w-20 h-20 text-green-400 text-green-300 mb-6" />
                <h2 className="text-4xl md:text-6xl font-bold text-white text-gray-100 mb-8">
                    The Economics
                </h2>
                <p className="text-xl text-gray-400 text-gray-300 mb-12 max-w-3xl">
                    Why this makes financial sense for every sales organization
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mb-12">
                    <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        className="p-6 border border-white/10 bg-white/5 bg-gray-800/5 rounded-xl"
                    >
                        <p className="text-4xl font-bold text-white text-gray-100 mb-2">60%</p>
                        <p className="text-sm uppercase tracking-widest text-gray-500 text-gray-300 mb-2">Reduction</p>
                        <p className="text-gray-400 text-gray-300">in time to productivity</p>
                    </motion.div>
                    <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="p-6 border border-white/10 bg-white/5 bg-gray-800/5 rounded-xl"
                    >
                        <p className="text-4xl font-bold text-white text-gray-100 mb-2">$99-$299</p>
                        <p className="text-sm uppercase tracking-widest text-gray-500 text-gray-300 mb-2">Monthly</p>
                        <p className="text-gray-400 text-gray-300">vs. $3,000+ traditional training</p>
                    </motion.div>
                    <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="p-6 border border-white/10 bg-white/5 bg-gray-800/5 rounded-xl"
                    >
                        <p className="text-4xl font-bold text-white text-gray-100 mb-2">Unlimited</p>
                        <p className="text-sm uppercase tracking-widest text-gray-500 text-gray-300 mb-2">Practice</p>
                        <p className="text-gray-400 text-gray-300">24/7 availability, no limits</p>
                    </motion.div>
                </div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="p-8 border border-green-500/30 border-green-400/30 bg-green-900/10 rounded-xl max-w-3xl"
                >
                    <p className="text-2xl text-white text-gray-100 font-semibold mb-3">
                        Break even in your first month
                    </p>
                    <p className="text-gray-400 text-gray-300 leading-relaxed">
                        The cost of one lost deal from an undertrained rep exceeds our annual subscription.
                        The ROI isn&apos;t debatable—it&apos;s mathematical.
                    </p>
                </motion.div>
            </div>
        ),
        bg: "bg-gray-950",
    },
    {
        id: "scale-challenge",
        content: (
            <div className="flex flex-col items-center justify-center h-full text-center px-4 max-w-5xl mx-auto">
                <TrendingUp className="w-20 h-20 text-purple-400 text-purple-300 mb-6" />
                <h2 className="text-4xl md:text-6xl font-bold text-white text-gray-100 mb-8 leading-tight">
                    The Market Opportunity
                </h2>
                <p className="text-xl text-gray-400 text-gray-300 mb-12 max-w-3xl">
                    Every company with a sales team is a potential customer
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mb-8">
                    <motion.div
                        initial={{ x: -30, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        className="p-8 border border-white/10 bg-white/5 bg-gray-800/5 rounded-xl text-left"
                    >
                        <h3 className="text-2xl font-bold text-white text-gray-100 mb-4">Total Addressable Market</h3>
                        <p className="text-gray-400 text-gray-300 leading-relaxed mb-4">
                            15M+ sales professionals in North America alone.
                            B2B companies spend $70B+ annually on sales training.
                        </p>
                        <p className="text-sm text-gray-500 text-gray-400">
                            We&apos;re targeting the SMB to mid-market segment first
                        </p>
                    </motion.div>
                    <motion.div
                        initial={{ x: 30, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.15 }}
                        className="p-8 border border-white/10 bg-white/5 bg-gray-800/5 rounded-xl text-left"
                    >
                        <h3 className="text-2xl font-bold text-white text-gray-100 mb-4">Our Advantage</h3>
                        <p className="text-gray-400 text-gray-300 leading-relaxed mb-4">
                            First-mover in AI-powered sales training with real voice simulation.
                            Proven results with enterprise customers and growing pipeline.
                        </p>
                        <p className="text-sm text-gray-500 text-gray-400">
                            Network effects: more training data makes the product better
                        </p>
                    </motion.div>
                </div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="p-8 border border-purple-500/30 border-purple-400/30 bg-purple-900/10 rounded-xl max-w-3xl"
                >
                    <p className="text-2xl text-white text-gray-100 font-semibold mb-3">
                        We&apos;re not just saving time—we&apos;re transforming how sales teams are built
                    </p>
                    <p className="text-gray-400 text-gray-300 leading-relaxed">
                        Every sales organization faces this problem. We&apos;re solving it at scale.
                    </p>
                </motion.div>
            </div>
        ),
        bg: "bg-black",
    },
    {
        id: "roi",
        content: (
            <div className="flex flex-col items-center justify-center h-full text-center px-4 max-w-5xl mx-auto">
                <Rocket className="w-20 h-20 text-blue-400 text-blue-300 mb-6" />
                <h2 className="text-4xl md:text-6xl font-bold text-white text-gray-100 mb-8">
                    What We&apos;re Building
                </h2>
                <p className="text-xl text-gray-400 text-gray-300 mb-12 max-w-3xl">
                    Our next phase requires strategic infrastructure partnerships
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mb-8">
                    <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        className="p-8 border border-white/10 bg-white/5 bg-gray-800/5 rounded-xl text-left"
                    >
                        <h3 className="text-2xl font-bold text-white text-gray-100 mb-4">Enhanced Compute Capacity</h3>
                        <p className="text-gray-400 text-gray-300 leading-relaxed">
                            Scaling to support 10,000+ concurrent voice training sessions.
                            Requires elastic infrastructure with global distribution and
                            advanced auto-scaling capabilities.
                        </p>
                    </motion.div>
                    <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.15 }}
                        className="p-8 border border-white/10 bg-white/5 bg-gray-800/5 rounded-xl text-left"
                    >
                        <h3 className="text-2xl font-bold text-white text-gray-100 mb-4">Strategic Partnerships</h3>
                        <p className="text-gray-400 text-gray-300 leading-relaxed">
                            Seeking partnerships with enterprise cloud providers to accelerate
                            our go-to-market strategy and leverage cutting-edge AI infrastructure.
                        </p>
                    </motion.div>
                </div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="p-8 border border-blue-500/30 border-blue-400/30 bg-blue-900/10 rounded-xl max-w-4xl"
                >
                    <p className="text-2xl text-white text-gray-100 font-semibold mb-4">
                        Investment in infrastructure today means market dominance tomorrow
                    </p>
                    <p className="text-gray-400 text-gray-300 leading-relaxed">
                        We&apos;re looking for investors and partners who understand that the race to own
                        AI-powered sales training will be won by those who can scale fastest.
                        The technology works. Now we need the infrastructure to reach every sales team.
                    </p>
                </motion.div>
            </div>
        ),
        bg: "bg-zinc-950",
    },
    {
        id: "close",
        content: (
            <div className="flex flex-col items-center justify-center h-full text-center px-4 max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12"
                >
                    <h2 className="text-5xl md:text-7xl font-bold text-white text-gray-100 mb-8 leading-tight">
                        Every day you wait,<br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                            your competitors train faster
                        </span>
                    </h2>
                    <p className="text-2xl md:text-3xl text-gray-300 text-gray-200 leading-relaxed max-w-4xl mx-auto">
                        The companies that move first on AI-powered training will dominate their markets.
                        The ones that wait will spend the next decade playing catch-up.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mb-12 p-8 border border-white/10 bg-white/5 bg-gray-800/5 rounded-xl max-w-3xl"
                >
                    <p className="text-xl text-white text-gray-100 font-medium mb-3">
                        Purrify DialerGPT
                    </p>
                    <p className="text-gray-400 text-gray-300 leading-relaxed mb-6">
                        Training sales teams at the speed of AI.<br />
                        Proven with real customers. Ready to scale.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <motion.a
                            href="https://cal.com/purrify/30min"
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white text-gray-100 text-lg font-semibold rounded-lg shadow-xl shadow-purple-500/30 cursor-pointer flex items-center justify-center"
                        >
                            <span className="flex items-center gap-2 justify-center">
                                Schedule a Demo <ArrowRight className="w-5 h-5" />
                            </span>
                        </motion.a>
                        <motion.a
                            href="mailto:partnership@purrify.ca"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 border border-white/20 text-white text-gray-100 text-lg font-semibold rounded-lg hover:bg-white/5 bg-gray-800/5 transition-colors cursor-pointer flex items-center justify-center"
                        >
                            Discuss Partnership
                        </motion.a>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="text-gray-500 text-gray-300 text-sm space-y-2"
                >
                    <p className="text-white text-gray-100 font-medium">Built by Purrify</p>
                    <p>tony@purrify.ca • Transforming sales training, one conversation at a time</p>
                    <p className="text-xs">purrify.ca</p>
                </motion.div>
            </div>
        ),
        bg: "bg-black",
    },
];

export default function DialerGPTPitchDeck() {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === " ") {
                if (currentSlide < slides.length - 1) setCurrentSlide((prev) => prev + 1);
            } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
                if (currentSlide > 0) setCurrentSlide((prev) => prev - 1);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [currentSlide]);

    const nextSlide = () => {
        if (currentSlide < slides.length - 1) setCurrentSlide((prev) => prev + 1);
    };

    const prevSlide = () => {
        if (currentSlide > 0) setCurrentSlide((prev) => prev - 1);
    };

    return (
        <div className="fixed inset-0 z-[100] overflow-hidden font-sans text-white text-gray-100 bg-black">
            {/* Background Transition */}
            <AnimatePresence mode="popLayout">
                <motion.div
                    key={slides[currentSlide].bg}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    className={`absolute inset-0 ${slides[currentSlide].bg}`}
                />
            </AnimatePresence>

            {/* Slide Content */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -50, filter: "blur(10px)" }}
                    transition={{ duration: 0.6, ease: "circOut" }}
                    className="relative z-10 w-full h-full"
                >
                    {slides[currentSlide].content}
                </motion.div>
            </AnimatePresence>

            {/* Navigation Controls */}
            <div className="absolute bottom-8 right-8 z-20 flex gap-4">
                <button
                    onClick={prevSlide}
                    disabled={currentSlide === 0}
                    className="p-3 rounded-full bg-white/10 bg-gray-800/10 hover:bg-white/20 bg-gray-800/20 disabled:opacity-30 backdrop-blur-md transition-all"
                >
                    <ArrowRight className="w-6 h-6 rotate-180" />
                </button>
                <button
                    onClick={nextSlide}
                    disabled={currentSlide === slides.length - 1}
                    className="p-3 rounded-full bg-white/10 bg-gray-800/10 hover:bg-white/20 bg-gray-800/20 disabled:opacity-30 backdrop-blur-md transition-all"
                >
                    <ArrowRight className="w-6 h-6" />
                </button>
            </div>

            {/* Progress Indicator */}
            <div className="absolute bottom-8 left-8 z-20 flex gap-2">
                {slides.map((_, idx) => (
                    <div
                        key={idx}
                        className={`h-1 rounded-full transition-all duration-300 ${idx === currentSlide ? "w-8 bg-white" : "w-2 bg-white/30"
                            }`}
                    />
                ))}
            </div>

            {/* Noise Overlay for Texture */}
            <div className="pointer-events-none absolute inset-0 z-[5] opacity-[0.03] mix-blend-overlay"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
            />
        </div>
    );
}
