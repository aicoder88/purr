"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import {
    Fish,
    Heart,
    Mail,
    MousePointer2,
    Rocket,
    Sparkles,
    Star,
    Trophy,
    Zap,
} from "lucide-react";
import { initAudioContext, playRandomMeow, playRandomPurr } from "@/lib/sounds/cat-sounds";

const CANVAS_WIDTH = 900;
const CANVAS_HEIGHT = 560;
const SCOREBOARD_KEY = "kitty-comet-scoreboard";
const BONUS_EMAIL_KEY = "kitty-comet-bonus-email";
const BONUS_BANK_KEY = "kitty-comet-bonus-bank";
const BONUS_POINTS = 250;
const MAX_LIVES = 5;

interface ScoreEntry {
    id: string;
    name: string;
    score: number;
    createdAt: number;
    title: string;
}

interface Bullet {
    id: number;
    x: number;
    y: number;
    radius: number;
    vx: number;
    vy: number;
}

interface Enemy {
    id: number;
    type: "mouse" | "mouseAce";
    x: number;
    y: number;
    radius: number;
    speed: number;
    sway: number;
    wobble: number;
}

interface Goodie {
    id: number;
    type: "tuna" | "laser";
    x: number;
    y: number;
    radius: number;
    speed: number;
    wobble: number;
}

interface Particle {
    id: number;
    x: number;
    y: number;
    vx: number;
    vy: number;
    life: number;
    maxLife: number;
    size: number;
    color: string;
    glyph: "spark" | "heart";
}

interface GameSnapshot {
    playerX: number;
    playerY: number;
    bullets: Bullet[];
    enemies: Enemy[];
    goodies: Goodie[];
    particles: Particle[];
    stars: { x: number; y: number; size: number; speed: number; twinkle: number }[];
    frameId: number | null;
    lastTick: number;
    lastFireAt: number;
    lastEnemyAt: number;
    lastTreatAt: number;
    lastPowerupAt: number;
    laserBoostUntil: number;
    comboExpireAt: number;
    running: boolean;
}

function clamp(value: number, min: number, max: number) {
    return Math.min(max, Math.max(min, value));
}

function circleHit(ax: number, ay: number, ar: number, bx: number, by: number, br: number) {
    const dx = ax - bx;
    const dy = ay - by;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < ar + br;
}

function makeStars() {
    return Array.from({ length: 55 }, () => ({
        x: Math.random() * CANVAS_WIDTH,
        y: Math.random() * CANVAS_HEIGHT,
        size: 1 + Math.random() * 2.4,
        speed: 18 + Math.random() * 42,
        twinkle: Math.random() * Math.PI * 2,
    }));
}

function getRankTitle(score: number) {
    if (score >= 4000) return "Galaxy Duchess";
    if (score >= 2600) return "Tuna Ace";
    if (score >= 1600) return "Laser Darling";
    if (score >= 900) return "Mouse Scout";
    return "Cozy Cadet";
}

function loadScores() {
    if (typeof window === "undefined") return [] as ScoreEntry[];

    try {
        const raw = window.localStorage.getItem(SCOREBOARD_KEY);
        if (!raw) return [];
        const parsed = JSON.parse(raw) as ScoreEntry[];
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
}

function saveScores(scores: ScoreEntry[]) {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(SCOREBOARD_KEY, JSON.stringify(scores.slice(0, 8)));
}

function drawRoundedRect(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    radius: number,
) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
}

function drawBackground(
    ctx: CanvasRenderingContext2D,
    stars: GameSnapshot["stars"],
    now: number,
    boostActive: boolean,
) {
    const gradient = ctx.createLinearGradient(0, 0, 0, CANVAS_HEIGHT);
    gradient.addColorStop(0, "#281341");
    gradient.addColorStop(0.38, "#412356");
    gradient.addColorStop(0.72, "#a84b7f");
    gradient.addColorStop(1, "#ffd2c5");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    const glow = ctx.createRadialGradient(CANVAS_WIDTH * 0.18, 80, 20, CANVAS_WIDTH * 0.18, 80, 260);
    glow.addColorStop(0, "rgba(255, 220, 230, 0.42)");
    glow.addColorStop(1, "rgba(255, 220, 230, 0)");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    const moon = ctx.createRadialGradient(CANVAS_WIDTH - 130, 95, 8, CANVAS_WIDTH - 130, 95, 58);
    moon.addColorStop(0, "rgba(255,255,255,0.95)");
    moon.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = moon;
    ctx.beginPath();
    ctx.arc(CANVAS_WIDTH - 130, 95, 58, 0, Math.PI * 2);
    ctx.fill();

    for (const star of stars) {
        const alpha = 0.4 + Math.sin(now * 0.001 + star.twinkle) * 0.35;
        ctx.fillStyle = `rgba(255,255,255,${alpha})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
    }

    for (let i = 0; i < 4; i += 1) {
        const waveY = (now * 0.03 + i * 135) % (CANVAS_HEIGHT + 160) - 80;
        const bandGradient = ctx.createLinearGradient(0, waveY, 0, waveY + 120);
        bandGradient.addColorStop(0, "rgba(255,255,255,0)");
        bandGradient.addColorStop(0.5, boostActive ? "rgba(251,191,36,0.08)" : "rgba(255,255,255,0.05)");
        bandGradient.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = bandGradient;
        ctx.fillRect(0, waveY, CANVAS_WIDTH, 120);
    }
}

function drawPlayer(ctx: CanvasRenderingContext2D, x: number, y: number, boostActive: boolean) {
    ctx.save();
    ctx.translate(x, y);

    const trailGradient = ctx.createLinearGradient(0, 14, 0, 62);
    trailGradient.addColorStop(0, boostActive ? "rgba(255,226,123,0.85)" : "rgba(255,188,221,0.78)");
    trailGradient.addColorStop(1, "rgba(255,188,221,0)");
    ctx.fillStyle = trailGradient;
    ctx.beginPath();
    ctx.moveTo(-10, 18);
    ctx.quadraticCurveTo(0, 58, 10, 18);
    ctx.fill();

    ctx.fillStyle = "#ffd9ea";
    ctx.beginPath();
    ctx.moveTo(-24, -3);
    ctx.quadraticCurveTo(-30, -12, -18, -26);
    ctx.quadraticCurveTo(-8, -18, -5, -8);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(24, -3);
    ctx.quadraticCurveTo(30, -12, 18, -26);
    ctx.quadraticCurveTo(8, -18, 5, -8);
    ctx.fill();

    const bodyGradient = ctx.createLinearGradient(0, -26, 0, 30);
    bodyGradient.addColorStop(0, "#ffe9f3");
    bodyGradient.addColorStop(0.6, "#ffd1e3");
    bodyGradient.addColorStop(1, "#ffc0d7");
    ctx.fillStyle = bodyGradient;
    ctx.beginPath();
    ctx.ellipse(0, 4, 30, 25, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.ellipse(-10, -1, 4, 6, 0, 0, Math.PI * 2);
    ctx.ellipse(10, -1, 4, 6, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#2b1844";
    ctx.beginPath();
    ctx.arc(-10, 0, 2.3, 0, Math.PI * 2);
    ctx.arc(10, 0, 2.3, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = "#9d4b71";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(-3, 9);
    ctx.quadraticCurveTo(0, 12, 3, 9);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(-18, 10);
    ctx.lineTo(-31, 8);
    ctx.moveTo(-18, 13);
    ctx.lineTo(-31, 16);
    ctx.moveTo(18, 10);
    ctx.lineTo(31, 8);
    ctx.moveTo(18, 13);
    ctx.lineTo(31, 16);
    ctx.stroke();

    ctx.fillStyle = boostActive ? "#ffe17d" : "#ff7cb6";
    drawRoundedRect(ctx, -26, 22, 52, 12, 6);
    ctx.fill();
    ctx.restore();
}

function drawBullet(ctx: CanvasRenderingContext2D, bullet: Bullet, boostActive: boolean) {
    const gradient = ctx.createLinearGradient(bullet.x, bullet.y + 10, bullet.x, bullet.y - 20);
    gradient.addColorStop(0, boostActive ? "rgba(255,222,89,0.1)" : "rgba(255,153,215,0.1)");
    gradient.addColorStop(0.5, boostActive ? "rgba(255,224,130,0.85)" : "rgba(255,180,220,0.9)");
    gradient.addColorStop(1, boostActive ? "rgba(255,250,209,1)" : "rgba(255,230,245,1)");
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.ellipse(bullet.x, bullet.y, bullet.radius, bullet.radius * 2.8, 0, 0, Math.PI * 2);
    ctx.fill();
}

function drawEnemy(ctx: CanvasRenderingContext2D, enemy: Enemy) {
    ctx.save();
    ctx.translate(enemy.x, enemy.y);

    if (enemy.type === "mouseAce") {
        const canGradient = ctx.createLinearGradient(0, -20, 0, 28);
        canGradient.addColorStop(0, "#f8feff");
        canGradient.addColorStop(1, "#8bd3ff");
        ctx.fillStyle = canGradient;
        drawRoundedRect(ctx, -20, -18, 40, 40, 12);
        ctx.fill();
        ctx.fillStyle = "#1d5f8a";
        ctx.fillRect(-17, -6, 34, 6);
        ctx.fillStyle = "#2b1844";
        ctx.font = "bold 16px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("TUNA", 0, 12);
        ctx.fillStyle = "#8f8f9f";
        ctx.beginPath();
        ctx.arc(-10, -18, 8, 0, Math.PI * 2);
        ctx.arc(10, -18, 8, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#fff";
        ctx.beginPath();
        ctx.arc(-7, -9, 2.5, 0, Math.PI * 2);
        ctx.arc(7, -9, 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#2b1844";
        ctx.beginPath();
        ctx.arc(-7, -9, 1.2, 0, Math.PI * 2);
        ctx.arc(7, -9, 1.2, 0, Math.PI * 2);
        ctx.fill();
    } else {
        ctx.fillStyle = "#d4d3dd";
        ctx.beginPath();
        ctx.arc(-14, -12, 8, 0, Math.PI * 2);
        ctx.arc(14, -12, 8, 0, Math.PI * 2);
        ctx.fill();
        const faceGradient = ctx.createLinearGradient(0, -24, 0, 24);
        faceGradient.addColorStop(0, "#f0eff6");
        faceGradient.addColorStop(1, "#c6c4d4");
        ctx.fillStyle = faceGradient;
        ctx.beginPath();
        ctx.ellipse(0, 0, 20, 18, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#fff";
        ctx.beginPath();
        ctx.arc(-6, -2, 3.2, 0, Math.PI * 2);
        ctx.arc(6, -2, 3.2, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#2b1844";
        ctx.beginPath();
        ctx.arc(-6, -2, 1.4, 0, Math.PI * 2);
        ctx.arc(6, -2, 1.4, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "#8c889d";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(-3, 6);
        ctx.quadraticCurveTo(0, 9, 3, 6);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, 16);
        ctx.quadraticCurveTo(14, 20, 15, 31);
        ctx.stroke();
    }

    ctx.restore();
}

function drawGoodie(ctx: CanvasRenderingContext2D, goodie: Goodie) {
    ctx.save();
    ctx.translate(goodie.x, goodie.y);

    if (goodie.type === "tuna") {
        const fishGradient = ctx.createLinearGradient(-24, 0, 24, 0);
        fishGradient.addColorStop(0, "#93d7ff");
        fishGradient.addColorStop(1, "#4cc0c1");
        ctx.fillStyle = fishGradient;
        ctx.beginPath();
        ctx.ellipse(0, 0, 19, 12, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(17, 0);
        ctx.lineTo(28, -9);
        ctx.lineTo(28, 9);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = "#ecfeff";
        ctx.beginPath();
        ctx.arc(-8, -1, 2.3, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "rgba(255,255,255,0.7)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(-2, -5);
        ctx.lineTo(7, -2);
        ctx.moveTo(-2, 2);
        ctx.lineTo(8, 4);
        ctx.stroke();
    } else {
        ctx.rotate(Math.PI / 10);
        ctx.fillStyle = "#ffe8f4";
        drawRoundedRect(ctx, -10, -20, 20, 38, 8);
        ctx.fill();
        ctx.fillStyle = "#ff5ba7";
        ctx.fillRect(-3.5, -18, 7, 28);
        ctx.beginPath();
        ctx.arc(0, -24, 10, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = "#fff4fb";
        ctx.beginPath();
        ctx.arc(0, -24, 5, 0, Math.PI * 2);
        ctx.fill();
    }

    ctx.restore();
}

function drawParticles(ctx: CanvasRenderingContext2D, particles: Particle[]) {
    for (const particle of particles) {
        const alpha = particle.life / particle.maxLife;
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.translate(particle.x, particle.y);
        ctx.fillStyle = particle.color;

        if (particle.glyph === "heart") {
            ctx.beginPath();
            ctx.moveTo(0, particle.size * 0.35);
            ctx.bezierCurveTo(particle.size, -particle.size * 0.65, particle.size * 1.7, particle.size * 0.85, 0, particle.size * 1.7);
            ctx.bezierCurveTo(-particle.size * 1.7, particle.size * 0.85, -particle.size, -particle.size * 0.65, 0, particle.size * 0.35);
            ctx.fill();
        } else {
            ctx.beginPath();
            ctx.arc(0, 0, particle.size, 0, Math.PI * 2);
            ctx.fill();
        }

        ctx.restore();
    }
}

export function MouseShooter() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const gameRef = useRef<GameSnapshot>({
        playerX: CANVAS_WIDTH / 2,
        playerY: CANVAS_HEIGHT - 78,
        bullets: [],
        enemies: [],
        goodies: [],
        particles: [],
        stars: makeStars(),
        frameId: null,
        lastTick: 0,
        lastFireAt: 0,
        lastEnemyAt: 0,
        lastTreatAt: 0,
        lastPowerupAt: 0,
        laserBoostUntil: 0,
        comboExpireAt: 0,
        running: false,
    });
    const pointerRef = useRef({ active: false, x: CANVAS_WIDTH / 2, y: CANVAS_HEIGHT - 78 });
    const keysRef = useRef<Record<string, boolean>>({});
    const idRef = useRef(0);
    const scoreRef = useRef(0);
    const livesRef = useRef(3);
    const comboRef = useRef(0);
    const bonusBankRef = useRef(0);
    const pilotNameRef = useRef("Star Tabby");

    const [isPlaying, setIsPlaying] = useState(false);
    const [score, setScore] = useState(0);
    const [lives, setLives] = useState(3);
    const [combo, setCombo] = useState(0);
    const [bestScores, setBestScores] = useState<ScoreEntry[]>([]);
    const [pilotName, setPilotName] = useState("Star Tabby");
    const [email, setEmail] = useState("");
    const [bonusStatus, setBonusStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [bonusMessage, setBonusMessage] = useState("Claim a cozy inbox bonus for +250 points.");
    const [bonusBank, setBonusBank] = useState(0);
    const [hasClaimedBonus, setHasClaimedBonus] = useState(false);
    const [boostSeconds, setBoostSeconds] = useState(0);
    const [runSummary, setRunSummary] = useState<{ score: number; title: string } | null>(null);

    useEffect(() => {
        pilotNameRef.current = pilotName || "Star Tabby";
    }, [pilotName]);

    useEffect(() => {
        scoreRef.current = score;
    }, [score]);

    useEffect(() => {
        livesRef.current = lives;
    }, [lives]);

    useEffect(() => {
        comboRef.current = combo;
    }, [combo]);

    useEffect(() => {
        const scores = loadScores();
        setBestScores(scores);

        if (typeof window !== "undefined") {
            const claimedEmail = window.localStorage.getItem(BONUS_EMAIL_KEY);
            const storedBank = parseInt(window.localStorage.getItem(BONUS_BANK_KEY) || "0", 10);
            if (claimedEmail) {
                setHasClaimedBonus(true);
                setEmail(claimedEmail);
                setBonusStatus("success");
                setBonusMessage("Inbox bonus already claimed on this device. Your cat ship is still adorable.");
            }
            const nextBank = Number.isFinite(storedBank) ? storedBank : 0;
            bonusBankRef.current = nextBank;
            setBonusBank(nextBank);
        }
    }, []);

    const persistBonusBank = useCallback((value: number) => {
        bonusBankRef.current = value;
        setBonusBank(value);
        if (typeof window !== "undefined") {
            window.localStorage.setItem(BONUS_BANK_KEY, String(value));
        }
    }, []);

    const pushScores = useCallback((nextEntry: ScoreEntry) => {
        const nextScores = [...loadScores(), nextEntry]
            .sort((a, b) => b.score - a.score || b.createdAt - a.createdAt)
            .slice(0, 8);
        saveScores(nextScores);
        setBestScores(nextScores);
    }, []);

    const addScore = useCallback((points: number) => {
        setScore((prev) => {
            const next = prev + points;
            scoreRef.current = next;
            return next;
        });
    }, []);

    const addParticles = useCallback((x: number, y: number, palette: { color: string; glyph: Particle["glyph"] }) => {
        const snapshot = gameRef.current;
        for (let i = 0; i < 8; i += 1) {
            snapshot.particles.push({
                id: idRef.current++,
                x,
                y,
                vx: (Math.random() - 0.5) * 170,
                vy: -20 - Math.random() * 120,
                life: 0.8 + Math.random() * 0.25,
                maxLife: 0.8 + Math.random() * 0.25,
                size: 2 + Math.random() * 3,
                color: palette.color,
                glyph: palette.glyph,
            });
        }
    }, []);

    const resetCombo = useCallback(() => {
        comboRef.current = 0;
        gameRef.current.comboExpireAt = 0;
        setCombo(0);
    }, []);

    const registerComboHit = useCallback(() => {
        const now = performance.now();
        const nextCombo = gameRef.current.comboExpireAt > now ? comboRef.current + 1 : 1;
        comboRef.current = nextCombo;
        gameRef.current.comboExpireAt = now + 2200;
        setCombo(nextCombo);
        return nextCombo;
    }, []);

    const stopGame = useCallback((saveScoreEntry: boolean) => {
        const snapshot = gameRef.current;
        snapshot.running = false;
        if (snapshot.frameId) {
            cancelAnimationFrame(snapshot.frameId);
            snapshot.frameId = null;
        }
        setIsPlaying(false);
        setBoostSeconds(0);
        resetCombo();

        if (saveScoreEntry && scoreRef.current > 0) {
            const title = getRankTitle(scoreRef.current);
            setRunSummary({ score: scoreRef.current, title });
            pushScores({
                id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
                name: (pilotNameRef.current || "Star Tabby").trim() || "Star Tabby",
                score: scoreRef.current,
                createdAt: Date.now(),
                title,
            });
        }
    }, [pushScores, resetCombo]);

    const startGame = useCallback(() => {
        initAudioContext();
        playRandomMeow();

        const openingScore = bonusBankRef.current;
        persistBonusBank(0);

        const snapshot = gameRef.current;
        snapshot.playerX = CANVAS_WIDTH / 2;
        snapshot.playerY = CANVAS_HEIGHT - 78;
        snapshot.bullets = [];
        snapshot.enemies = [];
        snapshot.goodies = [];
        snapshot.particles = [];
        snapshot.stars = makeStars();
        snapshot.lastTick = 0;
        snapshot.lastFireAt = 0;
        snapshot.lastEnemyAt = 0;
        snapshot.lastTreatAt = 0;
        snapshot.lastPowerupAt = 0;
        snapshot.laserBoostUntil = 0;
        snapshot.comboExpireAt = 0;
        snapshot.running = true;

        pointerRef.current = {
            active: false,
            x: CANVAS_WIDTH / 2,
            y: CANVAS_HEIGHT - 78,
        };

        scoreRef.current = openingScore;
        livesRef.current = 3;
        comboRef.current = 0;
        setScore(openingScore);
        setLives(3);
        setCombo(0);
        setBoostSeconds(0);
        setRunSummary(null);
        setIsPlaying(true);
    }, [persistBonusBank]);

    useEffect(() => {
        if (!isPlaying) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const context = canvas.getContext("2d");
        if (!context) return;

        const dpr = window.devicePixelRatio || 1;
        canvas.width = CANVAS_WIDTH * dpr;
        canvas.height = CANVAS_HEIGHT * dpr;
        context.setTransform(dpr, 0, 0, dpr, 0, 0);

        const loop = (time: number) => {
            const snapshot = gameRef.current;
            if (!snapshot.running) return;

            const previous = snapshot.lastTick || time;
            const delta = Math.min((time - previous) / 1000, 0.032);
            snapshot.lastTick = time;

            const keyboardVelocityX =
                (keysRef.current.ArrowRight || keysRef.current.d ? 1 : 0) -
                (keysRef.current.ArrowLeft || keysRef.current.a ? 1 : 0);
            const keyboardVelocityY =
                (keysRef.current.ArrowDown || keysRef.current.s ? 1 : 0) -
                (keysRef.current.ArrowUp || keysRef.current.w ? 1 : 0);

            if (pointerRef.current.active) {
                snapshot.playerX += (pointerRef.current.x - snapshot.playerX) * Math.min(delta * 9, 1);
                snapshot.playerY += (pointerRef.current.y - snapshot.playerY) * Math.min(delta * 9, 1);
            } else {
                snapshot.playerX += keyboardVelocityX * 380 * delta;
                snapshot.playerY += keyboardVelocityY * 320 * delta;
            }

            snapshot.playerX = clamp(snapshot.playerX, 45, CANVAS_WIDTH - 45);
            snapshot.playerY = clamp(snapshot.playerY, CANVAS_HEIGHT - 145, CANVAS_HEIGHT - 55);

            const boostActive = snapshot.laserBoostUntil > time;
            setBoostSeconds(boostActive ? Math.ceil((snapshot.laserBoostUntil - time) / 1000) : 0);

            for (const star of snapshot.stars) {
                star.y += star.speed * delta;
                if (star.y > CANVAS_HEIGHT + 6) {
                    star.y = -8;
                    star.x = Math.random() * CANVAS_WIDTH;
                }
            }

            const fireInterval = boostActive ? 95 : 190;
            if (time - snapshot.lastFireAt > fireInterval) {
                snapshot.lastFireAt = time;
                snapshot.bullets.push({
                    id: idRef.current++,
                    x: snapshot.playerX,
                    y: snapshot.playerY - 26,
                    radius: boostActive ? 5 : 4,
                    vx: 0,
                    vy: boostActive ? -760 : -680,
                });

                if (boostActive) {
                    snapshot.bullets.push({
                        id: idRef.current++,
                        x: snapshot.playerX - 14,
                        y: snapshot.playerY - 20,
                        radius: 3.5,
                        vx: -70,
                        vy: -690,
                    });
                    snapshot.bullets.push({
                        id: idRef.current++,
                        x: snapshot.playerX + 14,
                        y: snapshot.playerY - 20,
                        radius: 3.5,
                        vx: 70,
                        vy: -690,
                    });
                }
            }

            const enemyInterval = Math.max(350, 850 - Math.min(scoreRef.current * 0.08, 360));
            if (time - snapshot.lastEnemyAt > enemyInterval) {
                snapshot.lastEnemyAt = time;
                const ace = Math.random() < 0.22;
                snapshot.enemies.push({
                    id: idRef.current++,
                    type: ace ? "mouseAce" : "mouse",
                    x: 55 + Math.random() * (CANVAS_WIDTH - 110),
                    y: -40,
                    radius: ace ? 24 : 20,
                    speed: ace ? 145 + Math.random() * 40 : 110 + Math.random() * 55,
                    sway: (Math.random() - 0.5) * 90,
                    wobble: Math.random() * Math.PI * 2,
                });
            }

            if (time - snapshot.lastTreatAt > 2800) {
                snapshot.lastTreatAt = time;
                snapshot.goodies.push({
                    id: idRef.current++,
                    type: "tuna",
                    x: 60 + Math.random() * (CANVAS_WIDTH - 120),
                    y: -30,
                    radius: 19,
                    speed: 115,
                    wobble: Math.random() * Math.PI * 2,
                });
            }

            if (time - snapshot.lastPowerupAt > 7600) {
                snapshot.lastPowerupAt = time;
                snapshot.goodies.push({
                    id: idRef.current++,
                    type: "laser",
                    x: 70 + Math.random() * (CANVAS_WIDTH - 140),
                    y: -30,
                    radius: 18,
                    speed: 125,
                    wobble: Math.random() * Math.PI * 2,
                });
            }

            snapshot.bullets = snapshot.bullets.filter((bullet) => {
                bullet.x += bullet.vx * delta;
                bullet.y += bullet.vy * delta;
                return bullet.y > -30 && bullet.x > -30 && bullet.x < CANVAS_WIDTH + 30;
            });

            snapshot.enemies = snapshot.enemies.filter((enemy) => {
                enemy.y += enemy.speed * delta;
                enemy.x += Math.sin(time * 0.002 + enemy.wobble) * enemy.sway * delta;
                enemy.x = clamp(enemy.x, 30, CANVAS_WIDTH - 30);
                return enemy.y < CANVAS_HEIGHT + 50;
            });

            snapshot.goodies = snapshot.goodies.filter((goodie) => {
                goodie.y += goodie.speed * delta;
                goodie.x += Math.sin(time * 0.003 + goodie.wobble) * 20 * delta;
                return goodie.y < CANVAS_HEIGHT + 40;
            });

            snapshot.particles = snapshot.particles.filter((particle) => {
                particle.life -= delta;
                particle.x += particle.vx * delta;
                particle.y += particle.vy * delta;
                particle.vy += 100 * delta;
                return particle.life > 0;
            });

            for (let bulletIndex = snapshot.bullets.length - 1; bulletIndex >= 0; bulletIndex -= 1) {
                const bullet = snapshot.bullets[bulletIndex];
                let bulletConsumed = false;

                for (let enemyIndex = snapshot.enemies.length - 1; enemyIndex >= 0; enemyIndex -= 1) {
                    const enemy = snapshot.enemies[enemyIndex];
                    if (!circleHit(bullet.x, bullet.y, bullet.radius + 3, enemy.x, enemy.y, enemy.radius)) continue;

                    snapshot.bullets.splice(bulletIndex, 1);
                    snapshot.enemies.splice(enemyIndex, 1);
                    bulletConsumed = true;
                    const nextCombo = registerComboHit();
                    const basePoints = enemy.type === "mouseAce" ? 90 : 45;
                    addScore(basePoints + Math.min((nextCombo - 1) * 8, 72));
                    addParticles(enemy.x, enemy.y, {
                        color: enemy.type === "mouseAce" ? "#fde68a" : "#ffd2e7",
                        glyph: enemy.type === "mouseAce" ? "heart" : "spark",
                    });
                    if (enemy.type === "mouseAce") {
                        playRandomMeow();
                    }
                    break;
                }

                if (!bulletConsumed) {
                    for (let goodieIndex = snapshot.goodies.length - 1; goodieIndex >= 0; goodieIndex -= 1) {
                        const goodie = snapshot.goodies[goodieIndex];
                        if (!circleHit(bullet.x, bullet.y, bullet.radius + 3, goodie.x, goodie.y, goodie.radius)) continue;

                        snapshot.bullets.splice(bulletIndex, 1);
                        snapshot.goodies.splice(goodieIndex, 1);
                        if (goodie.type === "tuna") {
                            addScore(120);
                            setLives((prev) => {
                                const next = Math.min(MAX_LIVES, prev + 1);
                                livesRef.current = next;
                                return next;
                            });
                            addParticles(goodie.x, goodie.y, { color: "#8ee3ef", glyph: "heart" });
                        } else {
                            snapshot.laserBoostUntil = time + 8000;
                            addScore(90);
                            addParticles(goodie.x, goodie.y, { color: "#ffd1f0", glyph: "spark" });
                            playRandomPurr();
                        }
                        break;
                    }
                }
            }

            for (let index = snapshot.goodies.length - 1; index >= 0; index -= 1) {
                const goodie = snapshot.goodies[index];
                if (!circleHit(snapshot.playerX, snapshot.playerY, 28, goodie.x, goodie.y, goodie.radius)) continue;

                snapshot.goodies.splice(index, 1);
                if (goodie.type === "tuna") {
                    addScore(120);
                    setLives((prev) => {
                        const next = Math.min(MAX_LIVES, prev + 1);
                        livesRef.current = next;
                        return next;
                    });
                    addParticles(goodie.x, goodie.y, { color: "#8ee3ef", glyph: "heart" });
                } else {
                    snapshot.laserBoostUntil = time + 8000;
                    addScore(90);
                    addParticles(goodie.x, goodie.y, { color: "#ffd1f0", glyph: "spark" });
                    playRandomPurr();
                }
            }

            let shipHit = false;
            for (let index = snapshot.enemies.length - 1; index >= 0; index -= 1) {
                const enemy = snapshot.enemies[index];
                const collided = circleHit(snapshot.playerX, snapshot.playerY, 28, enemy.x, enemy.y, enemy.radius + 3);
                const escaped = enemy.y > CANVAS_HEIGHT + 10;

                if (!collided && !escaped) continue;

                snapshot.enemies.splice(index, 1);
                shipHit = true;
                addParticles(enemy.x, enemy.y, { color: "#fff0ae", glyph: "spark" });
            }

            if (shipHit) {
                resetCombo();
                const nextLives = livesRef.current - 1;
                livesRef.current = nextLives;
                setLives(nextLives);
                if (nextLives <= 0) {
                    playRandomPurr();
                    stopGame(true);
                    return;
                }
            }

            drawBackground(context, snapshot.stars, time, boostActive);
            drawParticles(context, snapshot.particles);

            for (const goodie of snapshot.goodies) {
                drawGoodie(context, goodie);
            }
            for (const enemy of snapshot.enemies) {
                drawEnemy(context, enemy);
            }
            for (const bullet of snapshot.bullets) {
                drawBullet(context, bullet, boostActive);
            }
            drawPlayer(context, snapshot.playerX, snapshot.playerY, boostActive);

            snapshot.frameId = requestAnimationFrame(loop);
        };

        const snapshot = gameRef.current;
        snapshot.frameId = requestAnimationFrame(loop);

        return () => {
            if (snapshot.frameId) {
                cancelAnimationFrame(snapshot.frameId);
                snapshot.frameId = null;
            }
        };
    }, [addParticles, addScore, isPlaying, persistBonusBank, registerComboHit, resetCombo, stopGame]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            keysRef.current[event.key] = true;
            if ((event.key === " " || event.key === "Enter") && !isPlaying) {
                event.preventDefault();
                startGame();
            }
        };

        const handleKeyUp = (event: KeyboardEvent) => {
            keysRef.current[event.key] = false;
        };

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, [isPlaying, startGame]);

    useEffect(() => {
        const snapshot = gameRef.current;
        return () => {
            snapshot.running = false;
            if (snapshot.frameId) {
                cancelAnimationFrame(snapshot.frameId);
            }
        };
    }, []);

    const handlePointerMove = useCallback((event: ReactPointerEvent<HTMLCanvasElement>) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const scaleX = CANVAS_WIDTH / rect.width;
        const scaleY = CANVAS_HEIGHT / rect.height;
        pointerRef.current = {
            active: true,
            x: clamp((event.clientX - rect.left) * scaleX, 45, CANVAS_WIDTH - 45),
            y: clamp((event.clientY - rect.top) * scaleY, CANVAS_HEIGHT - 145, CANVAS_HEIGHT - 55),
        };
    }, []);

    const claimBonus = useCallback(async () => {
        if (hasClaimedBonus) {
            setBonusStatus("success");
            setBonusMessage("This device already claimed the email bonus. The leaderboard still needs you.");
            return;
        }

        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setBonusStatus("error");
            setBonusMessage("Please enter a valid email address for the bonus.");
            return;
        }

        setBonusStatus("loading");
        setBonusMessage("Sending your cat pilot credentials...");

        try {
            const response = await fetch("/api/subscribe", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    source: "fun_kitty_comet_bonus",
                    locale: "en",
                }),
            });

            const data = (await response.json().catch(() => null)) as { success?: boolean; error?: string; message?: string } | null;
            if (!response.ok || !data?.success) {
                throw new Error(data?.error || "Unable to add bonus points right now.");
            }

            if (typeof window !== "undefined") {
                window.localStorage.setItem(BONUS_EMAIL_KEY, email.toLowerCase().trim());
            }

            setHasClaimedBonus(true);
            setBonusStatus("success");

            if (isPlaying) {
                addScore(BONUS_POINTS);
                setBonusMessage("Bonus delivered. +250 points added to your current run.");
            } else {
                const nextBank = bonusBankRef.current + BONUS_POINTS;
                persistBonusBank(nextBank);
                setBonusMessage("Bonus banked. Start a run to launch with +250 points.");
            }
        } catch (error) {
            setBonusStatus("error");
            setBonusMessage(error instanceof Error ? error.message : "Bonus failed. Please try again.");
        }
    }, [addScore, email, hasClaimedBonus, isPlaying, persistBonusBank]);

    const hearts = useMemo(
        () =>
            Array.from({ length: MAX_LIVES }).map((_, index) => (
                <Heart
                    key={index}
                    className={`h-4 w-4 ${index < lives ? "fill-rose-400 text-rose-500 dark:fill-rose-300 dark:text-rose-200" : "text-gray-300 dark:text-gray-600"}`}
                />
            )),
        [lives],
    );

    return (
        <div className="overflow-hidden rounded-[2rem] border border-rose-200/70 bg-white/70 shadow-[0_28px_90px_rgba(248,143,160,0.18)] backdrop-blur-md dark:border-rose-900/40 dark:bg-gray-950/70">
            <div className="border-b border-rose-100/90 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.9),_rgba(255,238,241,0.75)_40%,_rgba(238,247,255,0.7))] px-6 py-6 dark:border-rose-900/30 dark:bg-[radial-gradient(circle_at_top,_rgba(67,29,55,0.95),_rgba(39,20,47,0.94)_45%,_rgba(14,23,40,0.98)_90%)]">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                    <div>
                        <div className="inline-flex items-center gap-2 rounded-full border border-rose-200/70 bg-white/80 px-4 py-2 text-xs font-black uppercase tracking-[0.3em] text-rose-500 dark:border-rose-700/40 dark:bg-white/10 dark:text-rose-200">
                            <Rocket className="h-4 w-4" />
                            Kitty Comet
                        </div>
                        <h3 className="mt-4 font-serif text-4xl font-black text-gray-900 dark:text-white">
                            Cozy scrolling shooter
                        </h3>
                        <p className="mt-3 max-w-3xl text-base leading-7 text-gray-600 dark:text-gray-300">
                            Guide a tiny cat cruiser through a dreamy night sky. Zap cheeky mice, catch tuna treats,
                            scoop laser-pointer boosts, and climb your local scoreboard without dragging the rest of the page down.
                        </p>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-3">
                        <div className="rounded-2xl border border-white/70 bg-white/75 px-4 py-3 dark:border-white/10 dark:bg-white/5">
                            <p className="text-[10px] font-black uppercase tracking-[0.28em] text-rose-400 dark:text-rose-200">Score</p>
                            <p className="mt-1 text-2xl font-black text-gray-900 dark:text-white">{score}</p>
                        </div>
                        <div className="rounded-2xl border border-white/70 bg-white/75 px-4 py-3 dark:border-white/10 dark:bg-white/5">
                            <p className="text-[10px] font-black uppercase tracking-[0.28em] text-sky-500 dark:text-sky-200">Combo</p>
                            <p className="mt-1 text-2xl font-black text-gray-900 dark:text-white">{combo}x</p>
                        </div>
                        <div className="rounded-2xl border border-white/70 bg-white/75 px-4 py-3 dark:border-white/10 dark:bg-white/5">
                            <p className="text-[10px] font-black uppercase tracking-[0.28em] text-amber-500 dark:text-amber-200">Boost</p>
                            <p className="mt-1 text-2xl font-black text-gray-900 dark:text-white">{boostSeconds ? `${boostSeconds}s` : "Ready"}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid gap-6 p-6 xl:grid-cols-[minmax(0,1.65fr)_minmax(320px,0.95fr)]">
                <div className="rounded-[1.75rem] border border-rose-100/80 bg-gradient-to-b from-[#2b1743] via-[#4a2856] to-[#f4a2ab] p-4 shadow-inner dark:border-rose-900/30">
                    <div className="mb-3 flex flex-wrap items-center justify-between gap-3 text-white/90">
                        <div className="flex items-center gap-3">
                            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-black uppercase tracking-[0.25em]">
                                <MousePointer2 className="h-3.5 w-3.5" />
                                Move with mouse or arrows
                            </div>
                            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-black uppercase tracking-[0.25em]">
                                <Zap className="h-3.5 w-3.5" />
                                Auto-fire enabled
                            </div>
                        </div>
                        <div className="flex items-center gap-1">{hearts}</div>
                    </div>

                    <div className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#1a112d]">
                        <canvas
                            ref={canvasRef}
                            width={CANVAS_WIDTH}
                            height={CANVAS_HEIGHT}
                            onPointerMove={handlePointerMove}
                            onPointerEnter={handlePointerMove}
                            onPointerLeave={() => {
                                pointerRef.current.active = false;
                            }}
                            className="block aspect-[900/560] w-full touch-none"
                        />

                        {!isPlaying && (
                            <div className="absolute inset-0 flex items-center justify-center bg-[#160d28]/45 p-6 backdrop-blur-[2px]">
                                <div className="max-w-md rounded-[1.75rem] border border-white/10 bg-white/85 p-6 text-center shadow-2xl dark:bg-gray-950/80">
                                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-rose-200 via-orange-100 to-sky-100 text-3xl shadow-inner">
                                        😺
                                    </div>
                                    <h4 className="mt-4 text-2xl font-black text-gray-900 dark:text-white">
                                        {runSummary ? "Run complete" : "Ready for launch?"}
                                    </h4>
                                    <p className="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-300">
                                        {runSummary
                                            ? `You finished with ${runSummary.score} points and earned the ${runSummary.title} title.`
                                            : "Catch tuna, grab laser-pointer boosts, and keep the mice from crowding your ship."}
                                    </p>

                                    <button
                                        type="button"
                                        onClick={startGame}
                                        className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-orange-400 px-6 py-3 text-sm font-black uppercase tracking-[0.24em] text-white transition hover:brightness-105"
                                    >
                                        <Rocket className="h-4 w-4" />
                                        {runSummary ? "Play Again" : "Start Mission"}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="grid gap-5">
                    <div className="rounded-[1.75rem] border border-rose-100/80 bg-white/85 p-5 shadow-sm dark:border-rose-900/30 dark:bg-white/5">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs font-black uppercase tracking-[0.28em] text-rose-400 dark:text-rose-200">Pilot setup</p>
                                <h4 className="mt-2 text-xl font-black text-gray-900 dark:text-white">Name your cat captain</h4>
                            </div>
                            <Sparkles className="h-5 w-5 text-rose-400 dark:text-rose-200" />
                        </div>

                        <label className="mt-4 block text-sm font-semibold text-gray-700 dark:text-gray-200" htmlFor="kitty-comet-name">
                            Scoreboard name
                        </label>
                        <input
                            id="kitty-comet-name"
                            type="text"
                            maxLength={24}
                            value={pilotName}
                            onChange={(event) => setPilotName(event.target.value)}
                            className="mt-2 w-full rounded-2xl border border-rose-100 bg-white px-4 py-3 text-sm font-semibold text-gray-900 outline-none transition focus:border-rose-300 focus:ring-2 focus:ring-rose-200 dark:border-rose-900/40 dark:bg-gray-950/70 dark:text-white dark:focus:border-rose-700 dark:focus:ring-rose-900/40"
                            placeholder="Star Tabby"
                        />

                        <div className="mt-4 grid gap-3 sm:grid-cols-3">
                            <div className="rounded-2xl bg-rose-50 px-4 py-3 dark:bg-rose-950/30">
                                <div className="flex items-center gap-2 text-rose-500 dark:text-rose-200">
                                    <Fish className="h-4 w-4" />
                                    <span className="text-xs font-black uppercase tracking-[0.24em]">Tuna</span>
                                </div>
                                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">Collect for +120 and a tiny heal.</p>
                            </div>
                            <div className="rounded-2xl bg-sky-50 px-4 py-3 dark:bg-sky-950/30">
                                <div className="flex items-center gap-2 text-sky-500 dark:text-sky-200">
                                    <Zap className="h-4 w-4" />
                                    <span className="text-xs font-black uppercase tracking-[0.24em]">Laser</span>
                                </div>
                                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">Power shots for 8 seconds.</p>
                            </div>
                            <div className="rounded-2xl bg-amber-50 px-4 py-3 dark:bg-amber-950/30">
                                <div className="flex items-center gap-2 text-amber-500 dark:text-amber-200">
                                    <Star className="h-4 w-4" />
                                    <span className="text-xs font-black uppercase tracking-[0.24em]">Combo</span>
                                </div>
                                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">Keep the streak warm for bonus points.</p>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-[1.75rem] border border-rose-100/80 bg-white/85 p-5 shadow-sm dark:border-rose-900/30 dark:bg-white/5">
                        <div className="flex items-center justify-between gap-3">
                            <div>
                                <p className="text-xs font-black uppercase tracking-[0.28em] text-sky-500 dark:text-sky-200">Inbox bonus</p>
                                <h4 className="mt-2 text-xl font-black text-gray-900 dark:text-white">Email for extra points</h4>
                            </div>
                            <Mail className="h-5 w-5 text-sky-500 dark:text-sky-200" />
                        </div>

                        <p className="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-300">
                            Subscribe for cat tips and offers, then claim a one-time <span className="font-black text-rose-500 dark:text-rose-200">+250 point</span> boost.
                        </p>

                        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                            <input
                                type="email"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                placeholder="you@example.com"
                                className="w-full rounded-2xl border border-sky-100 bg-white px-4 py-3 text-sm font-semibold text-gray-900 outline-none transition focus:border-sky-300 focus:ring-2 focus:ring-sky-200 dark:border-sky-900/40 dark:bg-gray-950/70 dark:text-white dark:focus:border-sky-700 dark:focus:ring-sky-900/40"
                            />
                            <button
                                type="button"
                                onClick={claimBonus}
                                disabled={bonusStatus === "loading"}
                                className="inline-flex min-w-[180px] items-center justify-center gap-2 rounded-full bg-gradient-to-r from-sky-500 to-rose-500 px-5 py-3 text-sm font-black uppercase tracking-[0.24em] text-white transition hover:brightness-105 disabled:opacity-60"
                            >
                                <Mail className="h-4 w-4" />
                                {bonusStatus === "loading" ? "Sending" : hasClaimedBonus ? "Claimed" : "Claim +250"}
                            </button>
                        </div>

                        <div className={`mt-3 rounded-2xl px-4 py-3 text-sm ${bonusStatus === "error"
                            ? "bg-rose-50 text-rose-700 dark:bg-rose-950/30 dark:text-rose-200"
                            : bonusStatus === "success"
                                ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-200"
                                : "bg-sky-50 text-sky-700 dark:bg-sky-950/30 dark:text-sky-200"
                            }`}>
                            {bonusMessage}
                        </div>

                        {bonusBank > 0 && (
                            <p className="mt-3 text-xs font-black uppercase tracking-[0.24em] text-amber-500 dark:text-amber-200">
                                {bonusBank} bonus points are banked for your next launch.
                            </p>
                        )}
                    </div>

                    <div className="rounded-[1.75rem] border border-rose-100/80 bg-white/85 p-5 shadow-sm dark:border-rose-900/30 dark:bg-white/5">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs font-black uppercase tracking-[0.28em] text-amber-500 dark:text-amber-200">Scoreboard</p>
                                <h4 className="mt-2 text-xl font-black text-gray-900 dark:text-white">Local hall of fame</h4>
                            </div>
                            <Trophy className="h-5 w-5 text-amber-500 dark:text-amber-200" />
                        </div>

                        <div className="mt-4 space-y-3">
                            {bestScores.length === 0 ? (
                                <div className="rounded-2xl bg-amber-50 px-4 py-4 text-sm text-gray-600 dark:bg-amber-950/30 dark:text-gray-300">
                                    No scores yet. The first cute little space ace goes here.
                                </div>
                            ) : (
                                bestScores.map((entry, index) => (
                                    <div
                                        key={entry.id}
                                        className="grid grid-cols-[auto_1fr_auto] items-center gap-3 rounded-2xl bg-gray-50 px-4 py-3 dark:bg-gray-950/60"
                                    >
                                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-amber-200 to-rose-200 text-sm font-black text-gray-900 dark:from-amber-500/60 dark:to-rose-500/60 dark:text-white">
                                            {index + 1}
                                        </div>
                                        <div>
                                            <p className="text-sm font-black text-gray-900 dark:text-white">{entry.name}</p>
                                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">{entry.title}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-lg font-black text-rose-500 dark:text-rose-200">{entry.score}</p>
                                            <p className="text-[10px] uppercase tracking-[0.22em] text-gray-400 dark:text-gray-500">
                                                {new Date(entry.createdAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
