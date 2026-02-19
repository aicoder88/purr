import React from 'react';

// Re-export the benefit icons
export * from './custom-benefit-icons';

// ==========================================
// SCIENCE & MECHANISM ICONS
// ==========================================

export const IconSciencePores = ({ className = "" }: { className?: string }) => (
    // 8. Science (Activated Carbon): Microscopic pore structure trapping ammonia
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="carbon-surface" x1="0" y1="0" x2="100" y2="100">
                <stop offset="0%" stopColor="#4A4F54" />
                <stop offset="100%" stopColor="#1A1D20" />
            </linearGradient>
            <radialGradient id="ammonia-glow" cx="50" cy="50" r="50">
                <stop offset="0%" stopColor="#A86CA6" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#D98ECD" stopOpacity="0" />
            </radialGradient>
            <filter id="inner-shadow">
                <feOffset dx="0" dy="2" />
                <feGaussianBlur stdDeviation="1.5" result="offset-blur" />
                <feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse" />
                <feFlood floodColor="black" floodOpacity="0.5" result="color" />
                <feComposite operator="in" in="color" in2="inverse" result="shadow" />
                <feComposite operator="over" in="shadow" in2="SourceGraphic" />
            </filter>
        </defs>

        {/* Carbon surface with deep pores */}
        <path d="M10,90 C10,40 30,10 90,10 C90,40 70,90 10,90 Z" fill="url(#carbon-surface)" />

        {/* Pores (deep crevices) */}
        <path d="M25,75 C30,60 45,55 50,70" stroke="#0D0E10" strokeWidth="8" strokeLinecap="round" filter="url(#inner-shadow)" />
        <path d="M40,30 C55,25 70,40 60,55" stroke="#0D0E10" strokeWidth="12" strokeLinecap="round" filter="url(#inner-shadow)" />
        <path d="M75,25 C80,35 85,50 75,55" stroke="#0D0E10" strokeWidth="6" strokeLinecap="round" filter="url(#inner-shadow)" />

        {/* Ammonia molecule being pulled into the main pore */}
        <g transform="translate(60, 45)">
            <circle cx="0" cy="0" r="15" fill="url(#ammonia-glow)" />
            {/* Nitrogen atom */}
            <circle cx="0" cy="0" r="6" fill="#D98ECD" />
            {/* Hydrogen atoms */}
            <circle cx="-7" cy="-6" r="3" fill="#FFF" />
            <circle cx="7" cy="-6" r="3" fill="#FFF" />
            <circle cx="0" cy="8" r="3" fill="#FFF" />

            {/* Bonds */}
            <line x1="-2" y1="-2" x2="-6" y2="-5" stroke="#FFF" strokeWidth="1.5" />
            <line x1="2" y1="-2" x2="6" y2="-5" stroke="#FFF" strokeWidth="1.5" />
            <line x1="0" y1="2" x2="0" y2="6" stroke="#FFF" strokeWidth="1.5" />
        </g>

        {/* Magnetic pull lines */}
        <path d="M75,15 Q65,25 65,35" stroke="#D98ECD" strokeWidth="2" strokeDasharray="3,3" />
        <path d="M85,35 Q75,40 70,45" stroke="#D98ECD" strokeWidth="2" strokeDasharray="3,3" />

        {/* Additional trapped molecules deep in other pores */}
        <circle cx="35" cy="65" r="4" fill="#A86CA6" opacity="0.6" />
        <circle cx="45" cy="68" r="3" fill="#D98ECD" opacity="0.8" />
    </svg>
);

export const IconZeroPerfumes = ({ className = "" }: { className?: string }) => (
    // 7. Zero Perfumes: Crossed out spray bottle + natural leaf
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="chemical-spray" x1="0" y1="0" x2="100" y2="100">
                <stop offset="0%" stopColor="#A86CA6" />
                <stop offset="100%" stopColor="#D98ECD" />
            </linearGradient>
            <linearGradient id="natural-leaf" x1="0" y1="0" x2="100" y2="100">
                <stop offset="0%" stopColor="#6B9E6A" />
                <stop offset="100%" stopColor="#396637" />
            </linearGradient>
        </defs>

        {/* Chemical Spray Bottle (faded/background) */}
        <g opacity="0.4">
            <path d="M30,50 L30,80 C30,85 35,90 40,90 L60,90 C65,90 70,85 70,80 L70,50 C70,40 65,35 60,30 L40,30 C35,35 30,40 30,50 Z" fill="url(#chemical-spray)" />
            <rect x="42" y="20" width="16" height="10" fill="#4A4F54" />
            <path d="M45,20 L45,15 C45,10 55,10 55,15 L55,20 Z" fill="#1A1D20" />
            {/* Spray mist */}
            <path d="M75,20 Q85,15 90,25" stroke="url(#chemical-spray)" strokeWidth="3" strokeLinecap="round" strokeDasharray="4,4" />
            <path d="M72,15 Q80,5 85,10" stroke="url(#chemical-spray)" strokeWidth="2" strokeLinecap="round" strokeDasharray="3,3" />
        </g>

        {/* The bold NO slash */}
        <path d="M20,20 L80,80" stroke="#EF4444" strokeWidth="8" strokeLinecap="round" />

        {/* Vibrant Natural Leaf overlapping */}
        <path d="M20,70 C10,50 30,30 50,30 C70,30 50,60 50,80 C40,90 20,90 20,70 Z" fill="url(#natural-leaf)" stroke="#FFF" strokeWidth="3" />
        <path d="M50,80 C45,65 40,50 50,30" stroke="#FFF" strokeWidth="2" strokeLinecap="round" />
        <path d="M45,65 L35,55" stroke="#FFF" strokeWidth="2" strokeLinecap="round" />
        <path d="M43,45 L35,40" stroke="#FFF" strokeWidth="2" strokeLinecap="round" />
    </svg>
);

// ==========================================
// TRUST & SOCIAL PROOF ICONS
// ==========================================

export const IconMoneyBack = ({ className = "" }: { className?: string }) => (
    // 9. Money-Back Guarantee: Shield/ribbon with glowing checkmark
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="shield-grad" x1="0" y1="0" x2="100" y2="100">
                <stop offset="0%" stopColor="#4F46E5" /> {/* Electric Indigo */}
                <stop offset="100%" stopColor="#1E1B4B" /> {/* Dark purple/blue */}
            </linearGradient>
            <linearGradient id="gold-trim" x1="0" y1="0" x2="100" y2="100">
                <stop offset="0%" stopColor="#FDE047" />
                <stop offset="100%" stopColor="#EAB308" />
            </linearGradient>
            <filter id="shield-shadow">
                <feDropShadow dx="0" dy="4" stdDeviation="4" floodOpacity="0.3" />
            </filter>
        </defs>

        {/* Ribbons behind shield */}
        <path d="M20,60 L10,90 L30,80 L40,90 Z" fill="#3730A3" />
        <path d="M80,60 L90,90 L70,80 L60,90 Z" fill="#3730A3" />
        <path d="M20,60 L50,50 L10,90 Z" fill="#312E81" />
        <path d="M80,60 L50,50 L90,90 Z" fill="#312E81" />

        {/* Main Shield Body */}
        <path d="M50,10 C70,10 85,20 85,20 C85,50 75,75 50,90 C25,75 15,50 15,20 C15,20 30,10 50,10 Z" fill="url(#shield-grad)" filter="url(#shield-shadow)" />

        {/* Gold Trim */}
        <path d="M50,15 C66,15 78,24 80,24 C80,47 71,68 50,82 C29,68 20,47 20,24 C22,24 34,15 50,15 Z" fill="none" stroke="url(#gold-trim)" strokeWidth="3" />

        {/* Glowing Checkmark */}
        <path d="M35,50 L45,60 L65,35" stroke="#10B981" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M35,50 L45,60 L65,35" stroke="#A7F3D0" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />

        {/* Stars */}
        <path d="M50,30 L52,35 L58,35 L53,38 L55,44 L50,40 L45,44 L47,38 L42,35 L48,35 Z" fill="url(#gold-trim)" />
        <circle cx="30" cy="35" r="2" fill="#FDE047" />
        <circle cx="70" cy="35" r="2" fill="#FDE047" />
    </svg>
);

export const IconCanadaMade = ({ className = "" }: { className?: string }) => (
    // 10. Made in Canada: Maple leaf integrated with carbon granules
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="canada-red" x1="0" y1="0" x2="0" y2="100">
                <stop offset="0%" stopColor="#DC2626" />
                <stop offset="100%" stopColor="#991B1B" />
            </linearGradient>
            <radialGradient id="leaf-glow" cx="50" cy="50" r="50">
                <stop offset="0%" stopColor="#FECACA" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#FECACA" stopOpacity="0" />
            </radialGradient>
        </defs>

        <circle cx="50" cy="50" r="45" fill="url(#leaf-glow)" />

        {/* Base Granules (the foundation) */}
        <polygon points="20,70 30,75 40,70 30,65" fill="#1A1D20" />
        <polygon points="35,65 45,72 55,68 45,60" fill="#4A4F54" />
        <polygon points="50,70 65,80 80,72 65,65" fill="#1A1D20" />
        <polygon points="65,60 75,68 85,60 75,55" fill="#4A4F54" />

        <circle cx="25" cy="80" r="4" fill="#6B9E6A" />
        <circle cx="45" cy="85" r="5" fill="#396637" />
        <circle cx="75" cy="85" r="3" fill="#8CBCE5" />
        <circle cx="85" cy="75" r="4" fill="#6B9E6A" />

        {/* Stylized Maple Leaf rising from the carbon */}
        <path d="M50,75 L50,60" stroke="url(#canada-red)" strokeWidth="4" strokeLinecap="round" />
        <path d="M50,15 L58,35 L75,30 L65,45 L85,55 L65,60 L50,75 L35,60 L15,55 L35,45 L25,30 L42,35 Z" fill="url(#canada-red)" stroke="#FFF" strokeWidth="2" strokeLinejoin="round" />

        {/* Subtle inner lines */}
        <path d="M50,70 L50,25" stroke="#F87171" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M50,55 L65,40" stroke="#F87171" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M50,55 L35,40" stroke="#F87171" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
);

export const IconCustomerLove = ({ className = "" }: { className?: string }) => (
    // 11. Customer Love: Overlapping hearts and stars with cat ear contour
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="heart-pink" x1="0" y1="0" x2="100" y2="100">
                <stop offset="0%" stopColor="#F472B6" />
                <stop offset="100%" stopColor="#DB2777" />
            </linearGradient>
            <linearGradient id="heart-purple" x1="0" y1="0" x2="100" y2="100">
                <stop offset="0%" stopColor="#A78BFA" />
                <stop offset="100%" stopColor="#7C3AED" />
            </linearGradient>
            <filter id="heart-shadow">
                <feDropShadow dx="2" dy="2" stdDeviation="2" floodOpacity="0.2" />
            </filter>
        </defs>

        {/* Background pulsing circles */}
        <circle cx="50" cy="50" r="40" fill="#FCE7F3" opacity="0.5" />
        <circle cx="50" cy="50" r="30" fill="#FBCFE8" opacity="0.5" />

        {/* Purple Heart (Background) */}
        <path d="M35,65 C35,65 15,45 15,30 C15,20 25,15 35,25 C45,15 55,20 55,30 C55,45 35,65 35,65 Z" fill="url(#heart-purple)" opacity="0.8" transform="rotate(-15 35 40)" />

        {/* Pink Heart (Foreground) with Cat Ears */}
        <path d="M50,85 C50,85 20,55 20,35 C20,20 40,15 50,30 C60,15 80,20 80,35 C80,55 50,85 50,85 Z" fill="url(#heart-pink)" filter="url(#heart-shadow)" />

        {/* Tiny Cat Silhouette inside main heart (negative space) */}
        <path d="M45,40 L42,30 L50,35 L58,30 L55,40 C60,45 60,55 50,55 C40,55 40,45 45,40 Z" fill="#FFF" opacity="0.9" />

        {/* 5 Stars arranged in an arc */}
        <g transform="translate(10, -10)">
            <path d="M20,20 L22,25 L28,25 L23,28 L25,34 L20,30 L15,34 L17,28 L12,25 L18,25 Z" fill="#FDE047" />
            <path d="M35,12 L37,17 L43,17 L38,20 L40,26 L35,22 L30,26 L32,20 L27,17 L33,17 Z" fill="#FDE047" />
            <path d="M55,8 L57,13 L63,13 L58,16 L60,22 L55,18 L50,22 L52,16 L47,13 L53,13 Z" fill="#FDE047" />
            <path d="M75,12 L77,17 L83,17 L78,20 L80,26 L75,22 L70,26 L72,20 L67,17 L73,17 Z" fill="#FDE047" />
            <path d="M90,20 L92,25 L98,25 L93,28 L95,34 L90,30 L85,34 L87,28 L82,25 L88,25 Z" fill="#FDE047" />
        </g>
    </svg>
);
