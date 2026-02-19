/**
 * Custom Purrify Icons — hand-crafted SVGs replacing generic Lucide icons.
 * All icons accept standard SVG props (className, width, height, etc.)
 */

import React from "react";

type IconProps = React.SVGProps<SVGSVGElement>;

/** 🐾 Open bag / pouring product — for "Open the Bag" step */
export function IconOpenBag({ className, ...props }: IconProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            {...props}
        >
            {/* Bag body */}
            <path d="M10 18h28l-3 22H13L10 18z" fill="currentColor" fillOpacity="0.15" strokeWidth="2.2" />
            {/* Bag top / neck */}
            <path d="M16 18V13c0-3.3 2.7-6 6-6h4c3.3 0 6 2.7 6 6v5" />
            {/* Bag opening fold / torn top */}
            <path d="M12 18c0 0 4-3 12-3s12 3 12 3" />
            {/* Small granules / dots falling out */}
            <circle cx="24" cy="26" r="1.5" fill="currentColor" />
            <circle cx="20" cy="30" r="1.5" fill="currentColor" />
            <circle cx="28" cy="31" r="1.5" fill="currentColor" />
            <circle cx="24" cy="34" r="1.5" fill="currentColor" />
        </svg>
    );
}

/** ✨ Sprinkle / sparkle — for "Sprinkle on Fresh Litter" step */
export function IconSprinkle({ className, ...props }: IconProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            {...props}
        >
            {/* Central hand / shaker */}
            <path d="M18 28c0 0 2-8 6-8s6 8 6 8" fill="currentColor" fillOpacity="0.15" />
            <path d="M16 32c0 3.3 3.6 6 8 6s8-2.7 8-6" />
            <path d="M16 32h16" />
            {/* Holes on shaker top */}
            <circle cx="22" cy="22" r="1" fill="currentColor" />
            <circle cx="26" cy="20" r="1" fill="currentColor" />
            <circle cx="24" cy="24" r="1" fill="currentColor" />
            {/* Sprinkle dots */}
            <circle cx="12" cy="14" r="1.5" fill="currentColor" />
            <circle cx="36" cy="12" r="1.5" fill="currentColor" />
            <circle cx="10" cy="22" r="1.5" fill="currentColor" />
            <circle cx="38" cy="20" r="1.5" fill="currentColor" />
            <circle cx="20" cy="10" r="1.5" fill="currentColor" />
            <circle cx="30" cy="8" r="2" fill="currentColor" />
        </svg>
    );
}

/** 🌬️ Fresh air / odor elimination — replaces Wind icon */
export function IconFreshAir({ className, ...props }: IconProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            {...props}
        >
            {/* Nose / breathing indicator */}
            <ellipse cx="24" cy="20" rx="8" ry="9" fill="currentColor" fillOpacity="0.1" />
            {/* Nostrils */}
            <path d="M20 22c-1.5 1-3.5 0.5-3.5-1.5S17.5 18 20 20" />
            <path d="M28 22c1.5 1 3.5 0.5 3.5-1.5S30.5 18 28 20" />
            {/* Smile / relief */}
            <path d="M19 26c1.4 2 8.6 2 10 0" />
            {/* Wind / air lines */}
            <path d="M6 16c2-2 5-3 8-2" />
            <path d="M5 22c2-1 5-1.5 8-0.5" />
            <path d="M42 16c-2-2-5-3-8-2" />
            <path d="M43 22c-2-1-5-1.5-8-0.5" />
            {/* Stars / fresh scent */}
            <path d="M24 6 l1 2 l2 1 l-2 1 l-1 2 l-1-2 l-2-1 l2-1z" fill="currentColor" />
            <path d="M14 10 l0.7 1.4 l1.4 0.7 l-1.4 0.7 l-0.7 1.4 l-0.7-1.4 l-1.4-0.7 l1.4-0.7z" fill="currentColor" />
            <path d="M34 10 l0.7 1.4 l1.4 0.7 l-1.4 0.7 l-0.7 1.4 l-0.7-1.4 l-1.4-0.7 l1.4-0.7z" fill="currentColor" />
        </svg>
    );
}

/** 🐱 Happy cat — replaces Cat icon */
export function IconHappyCat({ className, ...props }: IconProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            {...props}
        >
            {/* Cat head */}
            <path d="M10 38V20c0-7.7 6.3-14 14-14s14 6.3 14 14v18" />
            {/* Cat ears (pointed) */}
            <path d="M10 22 L6 10 L16 18" fill="currentColor" fillOpacity="0.25" />
            <path d="M38 22 L42 10 L32 18" fill="currentColor" fillOpacity="0.25" />
            {/* Eyes */}
            <ellipse cx="19" cy="24" rx="2" ry="2.5" fill="currentColor" />
            <ellipse cx="29" cy="24" rx="2" ry="2.5" fill="currentColor" />
            {/* Nose */}
            <path d="M22 30 L24 28 L26 30 L24 31z" fill="currentColor" />
            {/* Mouth / smile */}
            <path d="M20 32c1.3 2 6.7 2 8 0" />
            {/* Whiskers */}
            <line x1="8" y1="28" x2="18" y2="29" />
            <line x1="8" y1="31" x2="18" y2="31" />
            <line x1="40" y1="28" x2="30" y2="29" />
            <line x1="40" y1="31" x2="30" y2="31" />
        </svg>
    );
}

/** ⏱️ 1-week freshness clock — replaces Clock icon */
export function IconWeekClock({ className, ...props }: IconProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            {...props}
        >
            {/* Clock face */}
            <circle cx="24" cy="26" r="17" fill="currentColor" fillOpacity="0.1" />
            {/* Hour & minute hands pointing to "7 days" */}
            <line x1="24" y1="26" x2="24" y2="14" />
            <line x1="24" y1="26" x2="33" y2="31" />
            {/* Center dot */}
            <circle cx="24" cy="26" r="1.5" fill="currentColor" />
            {/* 7-day ticks */}
            <line x1="24" y1="9" x2="24" y2="12" strokeWidth="2.5" />
            <line x1="32.5" y1="11.2" x2="31" y2="13.8" strokeWidth="2.5" />
            <line x1="38.8" y1="17.5" x2="36.2" y2="19" strokeWidth="2.5" />
            <line x1="41" y1="26" x2="38" y2="26" strokeWidth="2.5" />
            <line x1="38.8" y1="34.5" x2="36.2" y2="33" strokeWidth="2.5" />
            <line x1="32.5" y1="40.8" x2="31" y2="38.2" strokeWidth="2.5" />
            <line x1="24" y1="43" x2="24" y2="40" strokeWidth="2.5" />
            {/* "7" label above */}
            <text x="24" y="8" textAnchor="middle" fontSize="6" fill="currentColor" stroke="none" fontFamily="sans-serif" fontWeight="bold">7 days</text>
        </svg>
    );
}

/** 🪨 Litter layers / stack — replaces Layers icon */
export function IconLitterStack({ className, ...props }: IconProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            {...props}
        >
            {/* Litter box top */}
            <rect x="6" y="34" width="36" height="8" rx="2" fill="currentColor" fillOpacity="0.15" />
            {/* Middle layer (litter) */}
            <path d="M6 30 Q24 24 42 30 Q24 36 6 30z" fill="currentColor" fillOpacity="0.2" />
            {/* Top surface litter texture dots */}
            <circle cx="16" cy="30" r="1.2" fill="currentColor" />
            <circle cx="22" cy="28" r="1.2" fill="currentColor" />
            <circle cx="29" cy="29" r="1.2" fill="currentColor" />
            <circle cx="35" cy="31" r="1.2" fill="currentColor" />
            {/* Purrify carbon layer on top */}
            <path d="M10 22 Q24 16 38 22" strokeDasharray="2 2" />
            {/* Sparkle above — fresh */}
            <path d="M24 10 l1 2 l2 1 l-2 1 l-1 2 l-1-2 l-2-1 l2-1z" fill="currentColor" />
            <path d="M16 14 l0.7 1.4 l1.4 0.7 l-1.4 0.7 l-0.7 1.4 l-0.7-1.4 l-1.4-0.7 l1.4-0.7z" fill="currentColor" />
            <path d="M32 13 l0.7 1.4 l1.4 0.7 l-1.4 0.7 l-0.7 1.4 l-0.7-1.4 l-1.4-0.7 l1.4-0.7z" fill="currentColor" />
        </svg>
    );
}

/** 💰 Cost-effective / savings — replaces PiggyBank icon */
export function IconSavings({ className, ...props }: IconProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            {...props}
        >
            {/* Coin stack */}
            <ellipse cx="24" cy="38" rx="13" ry="4" fill="currentColor" fillOpacity="0.15" />
            <ellipse cx="24" cy="33" rx="13" ry="4" fill="currentColor" fillOpacity="0.15" />
            <ellipse cx="24" cy="28" rx="13" ry="4" fill="currentColor" fillOpacity="0.15" />
            <line x1="11" y1="28" x2="11" y2="38" />
            <line x1="37" y1="28" x2="37" y2="38" />
            {/* Dollar / saving lines on top coin */}
            <text x="24" y="31" textAnchor="middle" fontSize="7" fill="currentColor" stroke="none" fontFamily="sans-serif" fontWeight="bold">$</text>
            {/* Arrow up = savings */}
            <path d="M24 8 l-4 6 h3 v5 h2 v-5 h3z" fill="currentColor" />
        </svg>
    );
}

/** 🌿 Natural / before-after reveal — replaces Sparkles in Why Purrify */
export function IconBeforeAfter({ className, ...props }: IconProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            {...props}
        >
            {/* Left half — smelly (wavy lines) */}
            <path d="M8 20 q3-3 6 0 q3 3 6 0" />
            <path d="M8 26 q3-3 6 0 q3 3 6 0" />
            {/* Divider line */}
            <line x1="24" y1="10" x2="24" y2="38" strokeDasharray="3 2" />
            {/* Right half — fresh (stars) */}
            <path d="M32 16 l1 2 l2 1 l-2 1 l-1 2 l-1-2 l-2-1 l2-1z" fill="currentColor" />
            <path d="M38 24 l0.7 1.4 l1.4 0.7 l-1.4 0.7 l-0.7 1.4 l-0.7-1.4 l-1.4-0.7 l1.4-0.7z" fill="currentColor" />
            <path d="M30 28 l0.7 1.4 l1.4 0.7 l-1.4 0.7 l-0.7 1.4 l-0.7-1.4 l-1.4-0.7 l1.4-0.7z" fill="currentColor" />
            {/* Label hints */}
            <text x="13" y="36" textAnchor="middle" fontSize="5.5" fill="currentColor" stroke="none" fontFamily="sans-serif">BEFORE</text>
            <text x="36" y="36" textAnchor="middle" fontSize="5.5" fill="currentColor" stroke="none" fontFamily="sans-serif">AFTER</text>
        </svg>
    );
}

/** 🔬 Microscope / science tech */
export function IconScience({ className, ...props }: IconProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            {...props}
        >
            {/* Microscope stand */}
            <line x1="24" y1="38" x2="24" y2="22" />
            <line x1="14" y1="38" x2="34" y2="38" />
            {/* Stage */}
            <rect x="18" y="30" width="12" height="3" rx="1" fill="currentColor" fillOpacity="0.2" />
            {/* Eyepiece tube */}
            <rect x="21" y="10" width="6" height="14" rx="2" fill="currentColor" fillOpacity="0.15" />
            {/* Eyepiece */}
            <rect x="19" y="8" width="10" height="4" rx="2" fill="currentColor" fillOpacity="0.2" />
            {/* Lens */}
            <circle cx="24" cy="28" r="3" fill="currentColor" fillOpacity="0.2" />
            {/* Sparkles / discovery */}
            <path d="M36 12 l0.7 1.4 l1.4 0.7 l-1.4 0.7 l-0.7 1.4 l-0.7-1.4 l-1.4-0.7 l1.4-0.7z" fill="currentColor" />
            <path d="M39 6 l1 2 l2 1 l-2 1 l-1 2 l-1-2 l-2-1 l2-1z" fill="currentColor" />
        </svg>
    );
}

/** 🛡️ Safe / shield check */
export function IconSafe({ className, ...props }: IconProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            {...props}
        >
            {/* Shield body */}
            <path d="M24 6 L38 12 V26 C38 34 24 42 24 42 C24 42 10 34 10 26 V12 L24 6Z" fill="currentColor" fillOpacity="0.15" />
            {/* Checkmark */}
            <path d="M17 24 l5 5 l9-9" strokeWidth="2.5" />
            {/* Paw print */}
            <circle cx="24" cy="20" r="1.2" fill="currentColor" />
        </svg>
    );
}

/** 🌱 Natural / eco-friendly leaf */
export function IconNatural({ className, ...props }: IconProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            {...props}
        >
            {/* Leaf */}
            <path d="M24 40 C24 40 8 32 8 18 C8 10 16 6 24 6 C32 6 40 10 40 18 C40 32 24 40 24 40Z" fill="currentColor" fillOpacity="0.15" />
            {/* Stem */}
            <line x1="24" y1="40" x2="24" y2="28" />
            {/* Leaf vein */}
            <path d="M24 28 C20 22 14 18 12 14" strokeDasharray="2 2" />
            {/* Small detail veins */}
            <path d="M24 22 L18 18" />
            <path d="M24 26 L30 22" />
        </svg>
    );
}

/** 🚚 Delivery truck */
export function IconTruck({ className, ...props }: IconProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            {...props}
        >
            {/* Truck body */}
            <rect x="4" y="16" width="28" height="18" rx="2" fill="currentColor" fillOpacity="0.12" />
            {/* Cab */}
            <path d="M32 28 L32 20 L40 20 L44 26 L44 34 L32 34Z" fill="currentColor" fillOpacity="0.12" />
            {/* Wheels */}
            <circle cx="12" cy="36" r="4" fill="currentColor" fillOpacity="0.12" />
            <circle cx="12" cy="36" r="2" fill="currentColor" />
            <circle cx="36" cy="36" r="4" fill="currentColor" fillOpacity="0.12" />
            <circle cx="36" cy="36" r="2" fill="currentColor" />
            {/* Window */}
            <rect x="34" y="21" width="7" height="6" rx="1" fill="currentColor" fillOpacity="0.2" />
            {/* Speed lines */}
            <line x1="4" y1="22" x2="0" y2="22" strokeDasharray="2 1" />
            <line x1="4" y1="26" x2="0" y2="26" strokeDasharray="2 1" />
        </svg>
    );
}

/** 📍 Map pin / Canada origin */
export function IconMapPin({ className, ...props }: IconProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            {...props}
        >
            {/* Pin teardrop */}
            <path d="M24 6 C16.3 6 10 12.3 10 20 C10 30 24 42 24 42 C24 42 38 30 38 20 C38 12.3 31.7 6 24 6Z" fill="currentColor" fillOpacity="0.15" />
            {/* Inner circle */}
            <circle cx="24" cy="20" r="5" fill="currentColor" fillOpacity="0.3" />
            {/* Maple leaf hint */}
            <path d="M24 16 l1 2 l2 0.5 l-1.5 1.5 l0.5 2.5 l-2-1 l-2 1 l0.5-2.5 l-1.5-1.5 l2-0.5z" fill="currentColor" strokeWidth="0" />
        </svg>
    );
}

/** 👥 Social proof / happy customers */
export function IconCustomers({ className, ...props }: IconProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            {...props}
        >
            {/* Center person */}
            <circle cx="24" cy="16" r="5" fill="currentColor" fillOpacity="0.15" />
            <path d="M14 38 c0-5.5 4.5-10 10-10 s10 4.5 10 10" />
            {/* Left person */}
            <circle cx="12" cy="18" r="4" fill="currentColor" fillOpacity="0.1" />
            <path d="M4 38 c0-4.4 3.6-8 8-8" />
            {/* Right person */}
            <circle cx="36" cy="18" r="4" fill="currentColor" fillOpacity="0.1" />
            <path d="M44 38 c0-4.4-3.6-8-8-8" />
            {/* Smile on center */}
            <path d="M21 19 q3 2 6 0" />
        </svg>
    );
}

/** 💨 Mix & enjoy fresh air — for "Mix & Enjoy" step, replaces Wind */
export function IconMixEnjoy({ className, ...props }: IconProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            {...props}
        >
            {/* Swirl / mix motion */}
            <path d="M24 12 C32 12 38 18 36 26 C34 32 26 36 20 32 C14 28 16 18 24 16" />
            <path d="M24 16 l-4-6 l6 2z" fill="currentColor" />
            {/* Sparkles / fresh result */}
            <path d="M38 10 l1 2 l2 1 l-2 1 l-1 2 l-1-2 l-2-1 l2-1z" fill="currentColor" />
            <path d="M10 10 l0.7 1.4 l1.4 0.7 l-1.4 0.7 l-0.7 1.4 l-0.7-1.4 l-1.4-0.7 l1.4-0.7z" fill="currentColor" />
            <path d="M14 34 l0.7 1.4 l1.4 0.7 l-1.4 0.7 l-0.7 1.4 l-0.7-1.4 l-1.4-0.7 l1.4-0.7z" fill="currentColor" />
            {/* Checkmark circle = done */}
            <circle cx="32" cy="36" r="6" fill="currentColor" fillOpacity="0.15" />
            <path d="M29 36 l2 2 l4-4" strokeWidth="2" />
        </svg>
    );
}
