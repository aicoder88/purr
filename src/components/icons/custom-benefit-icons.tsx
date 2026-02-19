import React from 'react';

export const IconOdor = ({ className = "" }: { className?: string }) => (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="odor-grad" x1="0" y1="0" x2="100" y2="100">
                <stop offset="0%" stopColor="#A86CA6" />
                <stop offset="100%" stopColor="#D98ECD" />
            </linearGradient>
            <radialGradient id="carbon-glow" cx="50" cy="50" r="40">
                <stop offset="0%" stopColor="#4A4F54" />
                <stop offset="100%" stopColor="#1A1D20" />
            </radialGradient>
            <filter id="glow-odor">
                <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                </feMerge>
            </filter>
        </defs>

        <path d="M10,20 C30,10 40,40 50,50" stroke="url(#odor-grad)" strokeWidth="4" strokeLinecap="round" strokeDasharray="5,5" filter="url(#glow-odor)" />
        <path d="M90,30 C70,10 60,40 50,50" stroke="url(#odor-grad)" strokeWidth="3" strokeLinecap="round" strokeDasharray="4,4" filter="url(#glow-odor)" />
        <path d="M20,80 C30,60 40,60 50,50" stroke="url(#odor-grad)" strokeWidth="5" strokeLinecap="round" strokeDasharray="6,4" filter="url(#glow-odor)" />
        <path d="M80,80 C60,90 60,60 50,50" stroke="url(#odor-grad)" strokeWidth="4" strokeLinecap="round" strokeDasharray="5,3" filter="url(#glow-odor)" />

        <polygon points="46,46 43,40 50,42" fill="#D98ECD" />
        <polygon points="54,46 57,40 50,42" fill="#D98ECD" />
        <polygon points="46,54 43,60 50,58" fill="#D98ECD" />
        <polygon points="54,54 57,60 50,58" fill="#D98ECD" />

        <polygon points="50,30 70,42 70,65 50,77 30,65 30,42" fill="url(#carbon-glow)" stroke="#6B9E6A" strokeWidth="2" />

        <path d="M50,30 L50,55 M70,42 L50,55 M30,42 L50,55 M70,65 L50,55 M30,65 L50,55 M50,77 L50,55" stroke="#3A3D40" strokeWidth="1" />

        <circle cx="50" cy="55" r="3" fill="#8CBCE5" filter="url(#glow-odor)" />
        <path d="M50,20 L50,15 M65,25 L70,20 M35,25 L30,20" stroke="#8CBCE5" strokeWidth="2" strokeLinecap="round" filter="url(#glow-odor)" />
    </svg>
);

export const IconCatFriendly = ({ className = "" }: { className?: string }) => (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <radialGradient id="cat-aura" cx="50" cy="50" r="50">
                <stop offset="0%" stopColor="#FFF9E6" />
                <stop offset="100%" stopColor="#F2D574" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="granules" x1="0" y1="100" x2="100" y2="50">
                <stop offset="0%" stopColor="#1A1D20" />
                <stop offset="100%" stopColor="#4A4F54" />
            </linearGradient>
        </defs>

        <circle cx="50" cy="50" r="45" fill="url(#cat-aura)" />

        <ellipse cx="50" cy="75" rx="35" ry="10" fill="url(#granules)" />
        <circle cx="35" cy="73" r="3" fill="#6B9E6A" />
        <circle cx="65" cy="74" r="2.5" fill="#8CBCE5" />
        <circle cx="50" cy="77" r="4" fill="#396637" />
        <circle cx="55" cy="71" r="2" fill="#FFF" />

        <path d="M35,70 C35,40 40,30 50,30 C60,30 65,40 65,70 Z" fill="#2C3134" />
        <path d="M40,35 L33,18 L46,28 Z" fill="#2C3134" />
        <path d="M60,35 L67,18 L54,28 Z" fill="#2C3134" />

        <path d="M63,65 C75,65 85,55 80,45 C78,41 73,43 75,48 C78,55 70,60 63,58" fill="#2C3134" stroke="#2C3134" strokeWidth="3" strokeLinecap="round" />

        <ellipse cx="43" cy="45" rx="4" ry="5" fill="#F2D574" />
        <ellipse cx="57" cy="45" rx="4" ry="5" fill="#F2D574" />
        <ellipse cx="43" cy="45" rx="1.5" ry="4" fill="#1A1D20" />
        <ellipse cx="57" cy="45" rx="1.5" ry="4" fill="#1A1D20" />

        <path d="M20,30 L25,35 M22.5,27.5 L22.5,37.5" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
        <path d="M80,25 L85,30 M82.5,22.5 L82.5,32.5" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
    </svg>
);

export const IconLongLasting = ({ className = "" }: { className?: string }) => (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="glass" x1="0" y1="0" x2="100" y2="100">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#8CBCE5" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="sand" x1="0" y1="0" x2="0" y2="100">
                <stop offset="0%" stopColor="#1A1D20" />
                <stop offset="100%" stopColor="#6B9E6A" />
            </linearGradient>
            <radialGradient id="sun-glow" cx="50" cy="50" r="50">
                <stop offset="0%" stopColor="#F2D574" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#F2D574" stopOpacity="0" />
            </radialGradient>
        </defs>

        <circle cx="50" cy="50" r="45" fill="url(#sun-glow)" />

        <path d="M30,15 L70,15 L70,20 L30,20 Z" fill="#D98ECD" />
        <path d="M30,80 L70,80 L70,85 L30,85 Z" fill="#D98ECD" />
        <path d="M35,20 C35,40 45,45 50,50 C55,45 65,40 65,20 Z" fill="url(#glass)" stroke="#FFFFFF" strokeWidth="2" />
        <path d="M35,80 C35,60 45,55 50,50 C55,55 65,60 65,80 Z" fill="url(#glass)" stroke="#FFFFFF" strokeWidth="2" />

        <path d="M40,20 C40,30 45,35 50,40 C55,35 60,30 60,20 Z" fill="url(#sand)" />
        <path d="M45,80 C45,70 48,65 50,60 C52,65 55,70 55,80 Z" fill="url(#sand)" />

        <circle cx="50" cy="45" r="1.5" fill="#1A1D20" />
        <circle cx="50" cy="50" r="1.5" fill="#1A1D20" />
        <circle cx="50" cy="55" r="1.5" fill="#1A1D20" />

        <circle cx="20" cy="50" r="8" fill="#F2D574" />
        <path d="M80,42 C85,42 88,45 88,50 C88,55 85,58 80,58 C82,55 82,45 80,42 Z" fill="#FFFFFF" />
    </svg>
);

export const IconAnyLitter = ({ className = "" }: { className?: string }) => (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="layer1" x1="0" y1="0" x2="100" y2="0">
                <stop offset="0%" stopColor="#E2D4B7" />
                <stop offset="100%" stopColor="#C9B690" />
            </linearGradient>
            <linearGradient id="layer2" x1="0" y1="0" x2="100" y2="0">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="100%" stopColor="#E5F0F9" />
            </linearGradient>
            <linearGradient id="layer3" x1="0" y1="0" x2="100" y2="0">
                <stop offset="0%" stopColor="#9B8579" />
                <stop offset="100%" stopColor="#7E685C" />
            </linearGradient>
            <filter id="shadow">
                <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.3" />
            </filter>
        </defs>

        <path d="M15,70 Q50,90 85,70 L85,85 Q50,105 15,85 Z" fill="url(#layer3)" filter="url(#shadow)" />
        <path d="M15,50 Q50,70 85,50 L85,65 Q50,85 15,65 Z" fill="url(#layer2)" filter="url(#shadow)" />
        <path d="M15,30 Q50,50 85,30 L85,45 Q50,65 15,45 Z" fill="url(#layer1)" filter="url(#shadow)" />

        <circle cx="35" cy="40" r="3" fill="#1A1D20" />
        <circle cx="45" cy="48" r="4" fill="#396637" />
        <circle cx="55" cy="45" r="2.5" fill="#1A1D20" />
        <circle cx="65" cy="38" r="3.5" fill="#4A4F54" />

        <circle cx="30" cy="60" r="2" fill="#396637" />
        <circle cx="40" cy="68" r="3" fill="#1A1D20" />
        <circle cx="60" cy="65" r="4" fill="#4A4F54" />
        <circle cx="70" cy="55" r="2.5" fill="#1A1D20" />

        <circle cx="25" cy="80" r="3.5" fill="#1A1D20" />
        <circle cx="50" cy="85" r="4" fill="#396637" />
        <circle cx="75" cy="75" r="3" fill="#1A1D20" />

        <path d="M35,40 Q40,55 40,68" stroke="#6B9E6A" strokeWidth="1" strokeDasharray="2,2" />
        <path d="M55,45 Q60,55 60,65" stroke="#6B9E6A" strokeWidth="1" strokeDasharray="2,2" />
    </svg>
);

export const IconCostEffective = ({ className = "" }: { className?: string }) => (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="piggy" x1="0" y1="0" x2="100" y2="100">
                <stop offset="0%" stopColor="#F9A8D4" />
                <stop offset="100%" stopColor="#DB2777" />
            </linearGradient>
            <linearGradient id="gold" x1="0" y1="0" x2="100" y2="100">
                <stop offset="0%" stopColor="#FDE047" />
                <stop offset="100%" stopColor="#EAB308" />
            </linearGradient>
            <radialGradient id="savings-glow" cx="50" cy="50" r="50">
                <stop offset="0%" stopColor="#6B9E6A" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#6B9E6A" stopOpacity="0" />
            </radialGradient>
        </defs>

        <circle cx="50" cy="50" r="45" fill="url(#savings-glow)" />

        <ellipse cx="50" cy="60" rx="30" ry="25" fill="url(#piggy)" />

        <path d="M35,75 L35,85 L45,85 L42,75 Z" fill="#DB2777" />
        <path d="M65,75 L65,85 L55,85 L58,75 Z" fill="#DB2777" />

        <ellipse cx="25" cy="55" rx="8" ry="10" fill="#F472B6" />
        <ellipse cx="23" cy="53" rx="1.5" ry="3" fill="#9D174D" />
        <ellipse cx="27" cy="53" rx="1.5" ry="3" fill="#9D174D" />

        <path d="M40,40 L45,25 L55,35 Z" fill="#F472B6" />

        <circle cx="35" cy="48" r="3" fill="#9D174D" />

        <path d="M78,55 C85,50 85,60 80,60 C75,60 75,50 80,50" fill="none" stroke="#F472B6" strokeWidth="3" strokeLinecap="round" />

        <path d="M45,35 L65,35" stroke="#9D174D" strokeWidth="3" strokeLinecap="round" />

        <ellipse cx="55" cy="20" rx="8" ry="12" fill="url(#gold)" transform="rotate(20 55 20)" />
        <path d="M52,15 L58,25" stroke="#CA8A04" strokeWidth="2" transform="rotate(20 55 20)" />

        <polygon points="55,0 60,3 60,8 55,11 50,8 50,3" fill="#1A1D20" />
        <line x1="55" y1="12" x2="55" y2="15" stroke="#6B9E6A" strokeWidth="1.5" strokeDasharray="1,1" />
    </svg>
);

export const IconBeforeAfter = ({ className = "" }: { className?: string }) => (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="before-after" x1="0" y1="0" x2="100" y2="100">
                <stop offset="0%" stopColor="#A86CA6" />
                <stop offset="50%" stopColor="#8CBCE5" />
                <stop offset="100%" stopColor="#6B9E6A" />
            </linearGradient>
            <radialGradient id="sparkle-glow" cx="50" cy="50" r="50">
                <stop offset="0%" stopColor="#F2D574" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#F2D574" stopOpacity="0" />
            </radialGradient>
        </defs>

        <circle cx="50" cy="50" r="45" fill="url(#sparkle-glow)" />

        {/* Magic Wand */}
        <path d="M20,80 L60,40" stroke="#1A1D20" strokeWidth="6" strokeLinecap="round" />
        <path d="M60,40 L70,30" stroke="url(#before-after)" strokeWidth="6" strokeLinecap="round" />

        <circle cx="70" cy="30" r="4" fill="#F2D574" />

        {/* Large Sparkle */}
        <path d="M70,10 L72,25 L85,28 L72,31 L70,45 L68,31 L55,28 L68,25 Z" fill="#FDE047" />

        {/* Small Sparkles */}
        <path d="M40,20 L41,30 L50,32 L41,33 L40,43 L38,33 L29,32 L38,30 Z" fill="#6B9E6A" />
        <path d="M85,55 L86,62 L93,63 L86,65 L85,73 L83,65 L76,63 L83,62 Z" fill="#8CBCE5" />
    </svg>
);
