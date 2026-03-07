"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
    Fish,
    Heart,
    Mail,
    Rocket,
    Sparkles,
    Star,
    Trophy,
    Zap,
} from "lucide-react";
import { initAudioContext, playRandomMeow, playRandomPurr } from "@/lib/sounds/cat-sounds";

const VIEWPORT_WIDTH = 960;
const VIEWPORT_HEIGHT = 540;
const GROUND_Y = 452;
const GRAVITY = 1500;
const SCOREBOARD_KEY = "whisker-run-scoreboard";
const BONUS_EMAIL_KEY = "whisker-run-bonus-email";
const BONUS_BANK_KEY = "whisker-run-bonus-bank";
const BONUS_POINTS = 250;
const MAX_LIVES = 4;
const RESPAWN_DELAY_MS = 1350;
const CHECKPOINT_STEP = 180;
const BACKGROUND_IMAGE_SRC = "/original-images/blog/cat-home-sanctuary-realistic-aesthetic.webp";

interface ScoreEntry {
    id: string;
    name: string;
    score: number;
    createdAt: number;
    title: string;
}

interface Platform {
    x: number;
    y: number;
    width: number;
    height: number;
    style: "cushion" | "crate" | "cloud";
}

interface EnemySeed {
    x: number;
    y: number;
    patrolMin: number;
    patrolMax: number;
    type: "mouse" | "roller";
}

interface PickupSeed {
    x: number;
    y: number;
    type: "tuna" | "laser";
}

interface LevelDef {
    id: string;
    name: string;
    tagline: string;
    goal: string;
    goalX: number;
    worldWidth: number;
    skyTop: string;
    skyBottom: string;
    glow: string;
    decor: "garden" | "rooftop" | "moon";
    platforms: Platform[];
    enemies: EnemySeed[];
    pickups: PickupSeed[];
}

interface PlayerState {
    x: number;
    y: number;
    vx: number;
    vy: number;
    width: number;
    height: number;
    facing: 1 | -1;
    onGround: boolean;
    checkpointX: number;
    checkpointY: number;
    lastShotAt: number;
    invulnerableUntil: number;
    isDown: boolean;
}

interface EnemyState extends EnemySeed {
    id: number;
    width: number;
    height: number;
    vx: number;
    alive: boolean;
}

interface PickupState extends PickupSeed {
    id: number;
    width: number;
    height: number;
    collected: boolean;
}

interface BulletState {
    id: number;
    x: number;
    y: number;
    vx: number;
    width: number;
    height: number;
}

interface ParticleState {
    id: number;
    x: number;
    y: number;
    vx: number;
    vy: number;
    life: number;
    maxLife: number;
    color: string;
    kind: "spark" | "heart";
    size: number;
}

interface GameSnapshot {
    running: boolean;
    levelIndex: number;
    cameraX: number;
    player: PlayerState;
    enemies: EnemyState[];
    pickups: PickupState[];
    bullets: BulletState[];
    particles: ParticleState[];
    stars: { x: number; y: number; size: number; speed: number }[];
    boostUntil: number;
    comboExpireAt: number;
    respawnAt: number;
    pickupPulseUntil: number;
    pickupPulseX: number;
    pickupPulseY: number;
    pickupPulseTone: "tuna" | "laser" | null;
    frameId: number | null;
    lastTick: number;
}

interface StatusBanner {
    id: number;
    title: string;
    copy: string;
    tone: "bonus" | "danger" | "info";
}

const LEVELS: LevelDef[] = [
    {
        id: "lounge-garden",
        name: "Moonbeam Garden",
        tagline: "Sprint through moonlit herbs and silk cushions.",
        goal: "Reach the velvet arch and chase the mice out of the garden.",
        goalX: 1700,
        worldWidth: 1880,
        skyTop: "#23143b",
        skyBottom: "#f5a7b6",
        glow: "rgba(255, 216, 228, 0.34)",
        decor: "garden",
        platforms: [
            { x: 230, y: 356, width: 180, height: 22, style: "cushion" },
            { x: 520, y: 322, width: 170, height: 24, style: "cloud" },
            { x: 770, y: 382, width: 160, height: 20, style: "crate" },
            { x: 1085, y: 334, width: 180, height: 24, style: "cushion" },
            { x: 1380, y: 296, width: 160, height: 22, style: "cloud" },
        ],
        enemies: [
            { x: 310, y: GROUND_Y - 48, patrolMin: 220, patrolMax: 460, type: "mouse" },
            { x: 645, y: 322 - 46, patrolMin: 530, patrolMax: 690, type: "roller" },
            { x: 890, y: GROUND_Y - 48, patrolMin: 820, patrolMax: 1010, type: "mouse" },
            { x: 1210, y: 334 - 46, patrolMin: 1090, patrolMax: 1260, type: "mouse" },
            { x: 1510, y: GROUND_Y - 48, patrolMin: 1420, patrolMax: 1630, type: "roller" },
        ],
        pickups: [
            { x: 370, y: 304, type: "tuna" },
            { x: 610, y: 270, type: "laser" },
            { x: 960, y: 398, type: "tuna" },
            { x: 1460, y: 246, type: "tuna" },
        ],
    },
    {
        id: "rooftop-rush",
        name: "Rooftop Ribbon Run",
        tagline: "Race over chimneys, awnings, and dangling fairy lights.",
        goal: "Cross the rooftop line and reach the giant tuna billboard.",
        goalX: 1940,
        worldWidth: 2120,
        skyTop: "#2a173d",
        skyBottom: "#ffcfb6",
        glow: "rgba(255, 225, 186, 0.28)",
        decor: "rooftop",
        platforms: [
            { x: 180, y: 364, width: 160, height: 22, style: "crate" },
            { x: 470, y: 312, width: 170, height: 22, style: "cushion" },
            { x: 760, y: 274, width: 150, height: 20, style: "cloud" },
            { x: 1040, y: 362, width: 190, height: 22, style: "crate" },
            { x: 1340, y: 300, width: 165, height: 20, style: "cloud" },
            { x: 1660, y: 336, width: 160, height: 22, style: "cushion" },
        ],
        enemies: [
            { x: 240, y: 364 - 46, patrolMin: 180, patrolMax: 330, type: "mouse" },
            { x: 560, y: 312 - 46, patrolMin: 480, patrolMax: 620, type: "roller" },
            { x: 840, y: 274 - 46, patrolMin: 770, patrolMax: 900, type: "mouse" },
            { x: 1180, y: GROUND_Y - 48, patrolMin: 1090, patrolMax: 1310, type: "roller" },
            { x: 1470, y: 300 - 46, patrolMin: 1350, patrolMax: 1510, type: "mouse" },
            { x: 1830, y: 336 - 46, patrolMin: 1690, patrolMax: 1885, type: "roller" },
        ],
        pickups: [
            { x: 320, y: 320, type: "tuna" },
            { x: 810, y: 224, type: "laser" },
            { x: 1130, y: 398, type: "tuna" },
            { x: 1710, y: 284, type: "tuna" },
        ],
    },
    {
        id: "moonlight-lounge",
        name: "Moonlight Lounge",
        tagline: "One final dash to return the Star Pointer to the cat tree throne.",
        goal: "Bring the Star Pointer to the lounge and finish the chase.",
        goalX: 2260,
        worldWidth: 2440,
        skyTop: "#160f2b",
        skyBottom: "#ffd6be",
        glow: "rgba(183, 231, 255, 0.23)",
        decor: "moon",
        platforms: [
            { x: 220, y: 354, width: 170, height: 22, style: "cushion" },
            { x: 520, y: 304, width: 160, height: 22, style: "cloud" },
            { x: 820, y: 352, width: 180, height: 22, style: "crate" },
            { x: 1140, y: 286, width: 160, height: 22, style: "cloud" },
            { x: 1435, y: 336, width: 170, height: 22, style: "cushion" },
            { x: 1750, y: 280, width: 160, height: 20, style: "cloud" },
            { x: 2010, y: 232, width: 165, height: 20, style: "cloud" },
        ],
        enemies: [
            { x: 300, y: GROUND_Y - 48, patrolMin: 210, patrolMax: 440, type: "roller" },
            { x: 620, y: 304 - 46, patrolMin: 545, patrolMax: 680, type: "mouse" },
            { x: 920, y: 352 - 46, patrolMin: 840, patrolMax: 1010, type: "roller" },
            { x: 1260, y: 286 - 46, patrolMin: 1150, patrolMax: 1300, type: "mouse" },
            { x: 1560, y: GROUND_Y - 48, patrolMin: 1450, patrolMax: 1670, type: "roller" },
            { x: 1860, y: 280 - 46, patrolMin: 1760, patrolMax: 1920, type: "mouse" },
            { x: 2125, y: 232 - 46, patrolMin: 2030, patrolMax: 2185, type: "roller" },
        ],
        pickups: [
            { x: 390, y: 312, type: "tuna" },
            { x: 1180, y: 232, type: "laser" },
            { x: 1510, y: 394, type: "tuna" },
            { x: 2065, y: 184, type: "tuna" },
        ],
    },
];

function clamp(value: number, min: number, max: number) {
    return Math.min(max, Math.max(min, value));
}

function rectsOverlap(
    ax: number,
    ay: number,
    aw: number,
    ah: number,
    bx: number,
    by: number,
    bw: number,
    bh: number,
) {
    return ax < bx + bw && ax + aw > bx && ay < by + bh && ay + ah > by;
}

function makeStars() {
    return Array.from({ length: 60 }, () => ({
        x: Math.random() * VIEWPORT_WIDTH,
        y: Math.random() * (VIEWPORT_HEIGHT - 120),
        size: 1 + Math.random() * 2.4,
        speed: 4 + Math.random() * 12,
    }));
}

function getRankTitle(score: number) {
    if (score >= 5200) return "Moonlight Legend";
    if (score >= 3400) return "Couch Commando";
    if (score >= 2100) return "Laser Ranger";
    if (score >= 1100) return "Whisker Scout";
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

function createLevelState(levelIndex: number, idSeedRef: React.MutableRefObject<number>) {
    const level = LEVELS[levelIndex];
    const player: PlayerState = {
        x: 96,
        y: GROUND_Y - 56,
        vx: 0,
        vy: 0,
        width: 42,
        height: 56,
        facing: 1,
        onGround: true,
        checkpointX: 96,
        checkpointY: GROUND_Y - 56,
        lastShotAt: 0,
        invulnerableUntil: 0,
        isDown: false,
    };

    const enemies: EnemyState[] = level.enemies.map((enemy) => ({
        ...enemy,
        id: idSeedRef.current++,
        width: enemy.type === "roller" ? 52 : 44,
        height: 44,
        vx: enemy.type === "roller" ? 84 : 62,
        alive: true,
    }));

    const pickups: PickupState[] = level.pickups.map((pickup) => ({
        ...pickup,
        id: idSeedRef.current++,
        width: 28,
        height: 28,
        collected: false,
    }));

    return {
        running: true,
        levelIndex,
        cameraX: 0,
        player,
        enemies,
        pickups,
        bullets: [] as BulletState[],
        particles: [] as ParticleState[],
        stars: makeStars(),
        boostUntil: 0,
        comboExpireAt: 0,
        respawnAt: 0,
        pickupPulseUntil: 0,
        pickupPulseX: 0,
        pickupPulseY: 0,
        pickupPulseTone: null,
        frameId: null as number | null,
        lastTick: 0,
    };
}

function getRespawnPoint(level: LevelDef, x: number, playerWidth: number, playerHeight: number) {
    const clampedX = clamp(x, 60, level.worldWidth - playerWidth - 60);
    const centerX = clampedX + playerWidth / 2;
    let y = GROUND_Y - playerHeight;

    for (const platform of level.platforms) {
        if (centerX < platform.x + 14 || centerX > platform.x + platform.width - 14) continue;
        y = Math.min(y, platform.y - playerHeight);
    }

    return { x: clampedX, y };
}

function playGameOverSound() {
    const ctx = initAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const master = ctx.createGain();
    master.gain.setValueAtTime(0.0001, now);
    master.gain.exponentialRampToValueAtTime(0.22, now + 0.03);
    master.gain.exponentialRampToValueAtTime(0.0001, now + 0.8);
    master.connect(ctx.destination);

    const carrier = ctx.createOscillator();
    carrier.type = "triangle";
    carrier.frequency.setValueAtTime(220, now);
    carrier.frequency.exponentialRampToValueAtTime(124, now + 0.28);
    carrier.frequency.exponentialRampToValueAtTime(64, now + 0.78);

    const modulator = ctx.createOscillator();
    modulator.type = "sine";
    modulator.frequency.setValueAtTime(8, now);

    const modGain = ctx.createGain();
    modGain.gain.setValueAtTime(14, now);
    modGain.gain.exponentialRampToValueAtTime(2, now + 0.78);

    modulator.connect(modGain);
    modGain.connect(carrier.frequency);
    carrier.connect(master);

    carrier.start(now);
    modulator.start(now);
    carrier.stop(now + 0.82);
    modulator.stop(now + 0.82);
}

function addRoundedRect(
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

function drawSky(
    ctx: CanvasRenderingContext2D,
    level: LevelDef,
    cameraX: number,
    stars: GameSnapshot["stars"],
    backgroundImage: HTMLImageElement | null,
) {
    const sky = ctx.createLinearGradient(0, 0, 0, VIEWPORT_HEIGHT);
    sky.addColorStop(0, level.skyTop);
    sky.addColorStop(1, level.skyBottom);
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, VIEWPORT_WIDTH, VIEWPORT_HEIGHT);

    if (backgroundImage) {
        const drawHeight = GROUND_Y + 72;
        const scale = Math.max(VIEWPORT_WIDTH / backgroundImage.width, drawHeight / backgroundImage.height);
        const drawWidth = backgroundImage.width * scale;
        const imageX = clamp((VIEWPORT_WIDTH - drawWidth) / 2 - cameraX * 0.12, VIEWPORT_WIDTH - drawWidth - 46, 46);
        const imageY = Math.max(0, drawHeight - backgroundImage.height * scale);

        ctx.save();
        ctx.globalAlpha = 0.28;
        ctx.drawImage(backgroundImage, imageX, imageY, drawWidth, backgroundImage.height * scale);
        ctx.fillStyle = "rgba(17, 10, 30, 0.3)";
        ctx.fillRect(0, 0, VIEWPORT_WIDTH, GROUND_Y + 60);
        ctx.restore();
    }

    const glow = ctx.createRadialGradient(120, 80, 10, 120, 80, 220);
    glow.addColorStop(0, level.glow);
    glow.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, VIEWPORT_WIDTH, VIEWPORT_HEIGHT);

    for (const star of stars) {
        ctx.fillStyle = "rgba(255,255,255,0.85)";
        ctx.beginPath();
        ctx.arc(star.x - (cameraX * star.speed * 0.02) % VIEWPORT_WIDTH, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
    }

    const parallax = cameraX * 0.2;
    ctx.fillStyle = "rgba(255,255,255,0.13)";
    for (let i = -1; i < 5; i += 1) {
        const x = i * 260 - (parallax % 260);
        addRoundedRect(ctx, x, 118 + ((i % 2) * 18), 160, 56, 30);
        ctx.fill();
    }

    if (level.decor === "garden") {
        ctx.fillStyle = "rgba(80, 38, 63, 0.42)";
        for (let i = -1; i < 6; i += 1) {
            const x = i * 220 - (cameraX * 0.35 % 220);
            ctx.beginPath();
            ctx.arc(x + 110, 386, 82, Math.PI, Math.PI * 2);
            ctx.fill();
        }
    } else if (level.decor === "rooftop") {
        ctx.fillStyle = "rgba(43, 22, 54, 0.5)";
        for (let i = -1; i < 7; i += 1) {
            const baseX = i * 180 - (cameraX * 0.34 % 180);
            const height = 80 + (i % 3) * 28;
            ctx.fillRect(baseX, 300 - height, 110, height + 160);
        }
    } else {
        ctx.fillStyle = "rgba(46, 22, 62, 0.48)";
        for (let i = -1; i < 5; i += 1) {
            const x = i * 240 - (cameraX * 0.28 % 240);
            ctx.beginPath();
            ctx.moveTo(x, 430);
            ctx.lineTo(x + 110, 244);
            ctx.lineTo(x + 220, 430);
            ctx.closePath();
            ctx.fill();
        }
    }
}

function drawGround(ctx: CanvasRenderingContext2D, cameraX: number, worldWidth: number) {
    const ground = ctx.createLinearGradient(0, GROUND_Y, 0, VIEWPORT_HEIGHT);
    ground.addColorStop(0, "#f6c3b0");
    ground.addColorStop(1, "#a04f68");
    ctx.fillStyle = ground;
    ctx.fillRect(0, GROUND_Y, VIEWPORT_WIDTH, VIEWPORT_HEIGHT - GROUND_Y);

    for (let x = -((cameraX * 0.7) % 80); x < VIEWPORT_WIDTH + 120; x += 80) {
        ctx.fillStyle = "rgba(255,255,255,0.15)";
        ctx.fillRect(x, GROUND_Y + 18, 24, 8);
        ctx.fillRect(x + 34, GROUND_Y + 32, 32, 7);
    }

    ctx.strokeStyle = "rgba(109,42,62,0.45)";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(0, GROUND_Y + 8);
    ctx.lineTo(VIEWPORT_WIDTH, GROUND_Y + 8);
    ctx.stroke();

    const finishShadowX = clamp(worldWidth - cameraX - 120, -200, VIEWPORT_WIDTH + 200);
    ctx.fillStyle = "rgba(63,25,48,0.15)";
    ctx.beginPath();
    ctx.ellipse(finishShadowX, GROUND_Y + 30, 80, 20, 0, 0, Math.PI * 2);
    ctx.fill();
}

function drawPlatform(ctx: CanvasRenderingContext2D, platform: Platform, cameraX: number) {
    const x = platform.x - cameraX;
    const y = platform.y;
    ctx.save();
    if (platform.style === "cushion") {
        const fill = ctx.createLinearGradient(x, y, x, y + platform.height);
        fill.addColorStop(0, "#ffd9ef");
        fill.addColorStop(1, "#ff9ebc");
        ctx.fillStyle = fill;
        addRoundedRect(ctx, x, y, platform.width, platform.height, 12);
        ctx.fill();
        ctx.strokeStyle = "rgba(166,71,111,0.45)";
        ctx.lineWidth = 2;
        ctx.stroke();
    } else if (platform.style === "crate") {
        const fill = ctx.createLinearGradient(x, y, x, y + platform.height);
        fill.addColorStop(0, "#f9dcc7");
        fill.addColorStop(1, "#d5967b");
        ctx.fillStyle = fill;
        addRoundedRect(ctx, x, y, platform.width, platform.height, 8);
        ctx.fill();
        ctx.strokeStyle = "rgba(130,74,55,0.55)";
        ctx.lineWidth = 2;
        ctx.stroke();
        for (let line = x + 28; line < x + platform.width; line += 36) {
            ctx.beginPath();
            ctx.moveTo(line, y + 4);
            ctx.lineTo(line, y + platform.height - 4);
            ctx.stroke();
        }
    } else {
        ctx.fillStyle = "rgba(255,255,255,0.78)";
        addRoundedRect(ctx, x, y, platform.width, platform.height, 15);
        ctx.fill();
        ctx.fillStyle = "rgba(255,255,255,0.3)";
        addRoundedRect(ctx, x + 16, y + 6, platform.width - 32, platform.height - 10, 10);
        ctx.fill();
    }
    ctx.restore();
}

function drawCheckpointFlag(ctx: CanvasRenderingContext2D, player: PlayerState, cameraX: number) {
    if (player.checkpointX <= 110) return;

    const x = player.checkpointX - cameraX;
    if (x < -60 || x > VIEWPORT_WIDTH + 60) return;

    ctx.save();
    ctx.strokeStyle = "rgba(255, 245, 196, 0.78)";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(x + 8, GROUND_Y - 10);
    ctx.lineTo(x + 8, GROUND_Y - 96);
    ctx.stroke();

    ctx.fillStyle = "rgba(255, 210, 126, 0.94)";
    ctx.beginPath();
    ctx.moveTo(x + 8, GROUND_Y - 96);
    ctx.lineTo(x + 44, GROUND_Y - 82);
    ctx.lineTo(x + 8, GROUND_Y - 66);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = "rgba(255, 245, 216, 0.85)";
    ctx.font = "bold 12px sans-serif";
    ctx.fillText("RESPAWN", x - 26, GROUND_Y - 108);
    ctx.restore();
}

function drawPlayer(
    ctx: CanvasRenderingContext2D,
    player: PlayerState,
    cameraX: number,
    boosted: boolean,
    tick: number,
) {
    const x = player.x - cameraX;
    const y = player.y;
    const running = Math.abs(player.vx) > 10 && !player.isDown;
    const gait = running ? tick * 0.015 + player.x * 0.035 : tick * 0.004;
    const stride = running ? 7 : 2;
    const bodyBob = player.isDown ? 12 : running ? Math.sin(gait * 2) * 2.5 : 0;
    const tailSway = player.isDown ? -0.9 : Math.sin(gait) * 0.22;

    ctx.save();
    ctx.translate(x + player.width / 2, y + player.height / 2);
    ctx.scale(player.facing, 1);

    if (player.invulnerableUntil > performance.now() && Math.floor(performance.now() / 120) % 2 === 0) {
        ctx.globalAlpha = 0.5;
    }

    ctx.fillStyle = boosted ? "rgba(255,231,141,0.34)" : "rgba(255,181,214,0.28)";
    ctx.beginPath();
    ctx.ellipse(-3, 21, 20, 7, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.translate(0, bodyBob);

    if (player.isDown) {
        ctx.rotate(-0.42);
    }

    const body = ctx.createLinearGradient(-18, -18, 26, 22);
    body.addColorStop(0, "#fff4fb");
    body.addColorStop(1, "#ffc3d9");
    ctx.fillStyle = body;
    ctx.beginPath();
    ctx.ellipse(2, -2, 22, 14, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#ffd8ea";
    ctx.beginPath();
    ctx.moveTo(10, -16);
    ctx.lineTo(18, -34);
    ctx.lineTo(21, -14);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(-2, -15);
    ctx.lineTo(6, -32);
    ctx.lineTo(9, -13);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = "#fff3f9";
    ctx.beginPath();
    ctx.arc(20, -9, 11, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.arc(24, -12, 2.8, 0, Math.PI * 2);
    ctx.arc(16, -11, 2.6, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#2c183e";
    ctx.beginPath();
    ctx.arc(24, -12, 1.2, 0, Math.PI * 2);
    ctx.arc(16, -11, 1.15, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = "#9d4b71";
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    ctx.moveTo(29, -5);
    ctx.quadraticCurveTo(34, -3, 29, -1);
    ctx.stroke();

    ctx.strokeStyle = "#9d4b71";
    ctx.lineWidth = 1.4;
    ctx.beginPath();
    ctx.moveTo(31, -7);
    ctx.lineTo(39, -10);
    ctx.moveTo(31, -4);
    ctx.lineTo(40, -4);
    ctx.moveTo(31, -1);
    ctx.lineTo(39, 2);
    ctx.stroke();

    ctx.save();
    ctx.rotate(tailSway);
    ctx.strokeStyle = "#ff8fbc";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(-17, -3);
    ctx.quadraticCurveTo(-31, -14, -33, -32);
    ctx.stroke();
    ctx.restore();

    const legBaseY = 11;
    const frontStride = player.isDown ? 0 : Math.sin(gait) * stride;
    const rearStride = player.isDown ? 0 : Math.sin(gait + Math.PI) * stride;
    const legColor = "#ff8fbc";
    const drawLeg = (legX: number, phase: number, lift: number) => {
        ctx.strokeStyle = legColor;
        ctx.lineWidth = 4.6;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(legX, legBaseY - 2);
        ctx.lineTo(legX + phase * 0.55, legBaseY + 8 - lift);
        ctx.lineTo(legX + phase, legBaseY + 18);
        ctx.stroke();
    };

    drawLeg(12, frontStride, Math.abs(frontStride) * 0.35);
    drawLeg(4, -frontStride, Math.abs(frontStride) * 0.1);
    drawLeg(-7, rearStride, Math.abs(rearStride) * 0.35);
    drawLeg(-15, -rearStride, Math.abs(rearStride) * 0.1);

    ctx.fillStyle = boosted ? "#ffe784" : "#ff72b1";
    addRoundedRect(ctx, -1, -10, 20, 10, 5);
    ctx.fill();
    ctx.fillStyle = "rgba(255,255,255,0.58)";
    addRoundedRect(ctx, 2, -8, 9, 3, 2);
    ctx.fill();

    ctx.restore();
}

function drawEnemy(ctx: CanvasRenderingContext2D, enemy: EnemyState, cameraX: number) {
    const x = enemy.x - cameraX;
    const y = enemy.y;
    ctx.save();
    ctx.translate(x + enemy.width / 2, y + enemy.height / 2);
    ctx.scale(enemy.vx > 0 ? 1 : -1, 1);

    ctx.strokeStyle = enemy.type === "roller" ? "#b2b8e4" : "#b8b0c8";
    ctx.lineWidth = 3.2;
    ctx.beginPath();
    ctx.moveTo(-18, 3);
    ctx.quadraticCurveTo(-31, -8, -35, -20);
    ctx.stroke();

    ctx.fillStyle = enemy.type === "roller" ? "#d7ddff" : "#ddd7e7";
    ctx.beginPath();
    ctx.arc(-10, -9, 8, 0, Math.PI * 2);
    ctx.arc(2, -10, 8, 0, Math.PI * 2);
    ctx.fill();

    const body = ctx.createLinearGradient(-12, -10, 22, 20);
    body.addColorStop(0, enemy.type === "roller" ? "#f2f5ff" : "#f2f0f5");
    body.addColorStop(1, enemy.type === "roller" ? "#c0cbff" : "#cfc7da");
    ctx.fillStyle = body;
    ctx.beginPath();
    ctx.ellipse(5, 2, 19, 14, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#fefefe";
    ctx.beginPath();
    ctx.arc(14, -2, 9, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.arc(17, -5, 2.2, 0, Math.PI * 2);
    ctx.arc(11, -4, 2.2, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#2c183e";
    ctx.beginPath();
    ctx.arc(17, -5, 1.05, 0, Math.PI * 2);
    ctx.arc(11, -4, 1.05, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#f5a6bc";
    ctx.beginPath();
    ctx.arc(23, -1, 3.1, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = "#86667f";
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(24, -1);
    ctx.lineTo(33, -4);
    ctx.moveTo(24, 1);
    ctx.lineTo(34, 1);
    ctx.moveTo(24, 3);
    ctx.lineTo(33, 6);
    ctx.stroke();

    ctx.strokeStyle = "#9e90b4";
    ctx.lineWidth = 3.8;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(-2, 11);
    ctx.lineTo(-4, 19);
    ctx.moveTo(8, 12);
    ctx.lineTo(7, 20);
    ctx.moveTo(15, 11);
    ctx.lineTo(16, 19);
    ctx.stroke();

    if (enemy.type === "roller") {
        ctx.fillStyle = "#7e8fd3";
        addRoundedRect(ctx, -4, -20, 20, 6, 3);
        ctx.fill();
        ctx.fillStyle = "#5d6898";
        ctx.beginPath();
        ctx.arc(0, 20, 5, 0, Math.PI * 2);
        ctx.arc(16, 20, 5, 0, Math.PI * 2);
        ctx.fill();
    } else {
        ctx.fillStyle = "#d0c7db";
        ctx.beginPath();
        ctx.arc(0, 20, 2.4, 0, Math.PI * 2);
        ctx.arc(13, 20, 2.4, 0, Math.PI * 2);
        ctx.fill();
    }

    ctx.restore();
}

function drawPickup(ctx: CanvasRenderingContext2D, pickup: PickupState, cameraX: number, tick: number) {
    const x = pickup.x - cameraX;
    const floatOffset = Math.sin(tick * 0.004 + pickup.id) * 5;
    const y = pickup.y + floatOffset;
    ctx.save();
    ctx.translate(x + pickup.width / 2, y + pickup.height / 2);

    if (pickup.type === "tuna") {
        const fish = ctx.createLinearGradient(-16, 0, 16, 0);
        fish.addColorStop(0, "#99daf6");
        fish.addColorStop(1, "#5cc2c7");
        ctx.fillStyle = fish;
        ctx.beginPath();
        ctx.ellipse(0, 0, 14, 9, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(12, 0);
        ctx.lineTo(22, -8);
        ctx.lineTo(22, 8);
        ctx.closePath();
        ctx.fill();
    } else {
        ctx.rotate(Math.PI / 12);
        ctx.fillStyle = "#ffe5f5";
        addRoundedRect(ctx, -9, -18, 18, 34, 7);
        ctx.fill();
        ctx.fillStyle = "#ff5fa7";
        ctx.fillRect(-3, -16, 6, 26);
        ctx.beginPath();
        ctx.arc(0, -21, 10, 0, Math.PI * 2);
        ctx.fill();
    }
    ctx.restore();
}

function drawGoal(ctx: CanvasRenderingContext2D, level: LevelDef, cameraX: number) {
    const x = level.goalX - cameraX;
    ctx.save();
    if (x > -160 && x < VIEWPORT_WIDTH + 160) {
        ctx.fillStyle = "rgba(255,245,171,0.2)";
        ctx.beginPath();
        ctx.arc(x + 20, 220, 90, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "#7b4158";
        addRoundedRect(ctx, x, 212, 42, 180, 14);
        ctx.fill();
        ctx.fillStyle = "#ffd8ef";
        addRoundedRect(ctx, x - 28, 252, 100, 28, 16);
        ctx.fill();
        ctx.fillStyle = "#fff6c7";
        addRoundedRect(ctx, x - 18, 194, 78, 18, 9);
        ctx.fill();
        ctx.fillStyle = "#2c183e";
        ctx.font = "bold 14px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("GOAL", x + 20, 207);
    }
    ctx.restore();
}

function drawBullet(ctx: CanvasRenderingContext2D, bullet: BulletState, cameraX: number, boosted: boolean) {
    const x = bullet.x - cameraX;
    const glow = ctx.createLinearGradient(x - 10, bullet.y, x + 12, bullet.y);
    glow.addColorStop(0, boosted ? "rgba(255,226,123,0)" : "rgba(255,160,212,0)");
    glow.addColorStop(0.5, boosted ? "rgba(255,233,146,0.95)" : "rgba(255,196,224,1)");
    glow.addColorStop(1, "#ffffff");
    ctx.fillStyle = glow;
    addRoundedRect(ctx, x, bullet.y, bullet.width, bullet.height, 4);
    ctx.fill();
}

function drawParticles(ctx: CanvasRenderingContext2D, particles: ParticleState[], cameraX: number) {
    for (const particle of particles) {
        const alpha = particle.life / particle.maxLife;
        const x = particle.x - cameraX;
        const y = particle.y;
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.translate(x, y);
        ctx.fillStyle = particle.color;
        if (particle.kind === "heart") {
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

function drawPickupPulse(ctx: CanvasRenderingContext2D, snapshot: GameSnapshot, cameraX: number, tick: number) {
    if (snapshot.pickupPulseUntil <= tick || !snapshot.pickupPulseTone) return;

    const x = snapshot.pickupPulseX - cameraX;
    const y = snapshot.pickupPulseY;
    const life = (snapshot.pickupPulseUntil - tick) / 650;
    const radius = (1 - life) * 54 + 24;

    ctx.save();
    ctx.globalAlpha = Math.max(0, Math.min(0.85, life));
    ctx.strokeStyle = snapshot.pickupPulseTone === "laser" ? "rgba(255, 225, 132, 0.92)" : "rgba(144, 233, 240, 0.92)";
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(x, y, radius * 0.62, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
}

export function MouseShooter() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const gameRef = useRef<GameSnapshot>(createLevelState(0, { current: 1 }));
    const keysRef = useRef<Record<string, boolean>>({});
    const shootQueuedRef = useRef(false);
    const idSeedRef = useRef(1000);
    const scoreRef = useRef(0);
    const livesRef = useRef(MAX_LIVES);
    const comboRef = useRef(0);
    const bonusBankRef = useRef(0);
    const pilotNameRef = useRef("Captain Noodle");
    const jumpLatchRef = useRef(false);
    const backgroundImageRef = useRef<HTMLImageElement | null>(null);
    const bannerTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const [mode, setMode] = useState<"idle" | "playing" | "levelComplete" | "won" | "gameOver">("idle");
    const [levelIndex, setLevelIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [lives, setLives] = useState(MAX_LIVES);
    const [combo, setCombo] = useState(0);
    const [boostSeconds, setBoostSeconds] = useState(0);
    const [bestScores, setBestScores] = useState<ScoreEntry[]>([]);
    const [pilotName, setPilotName] = useState("Captain Noodle");
    const [email, setEmail] = useState("");
    const [bonusStatus, setBonusStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [bonusMessage, setBonusMessage] = useState("Claim a one-time inbox bonus for +250 points.");
    const [bonusBank, setBonusBank] = useState(0);
    const [hasClaimedBonus, setHasClaimedBonus] = useState(false);
    const [overlayTitle, setOverlayTitle] = useState("Whisker Run");
    const [overlayCopy, setOverlayCopy] = useState("Run, jump, and time every shot to bring the Star Pointer home.");
    const [statusBanner, setStatusBanner] = useState<StatusBanner | null>(null);
    const [isRespawning, setIsRespawning] = useState(false);

    useEffect(() => {
        pilotNameRef.current = pilotName || "Captain Noodle";
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
        if (typeof window === "undefined") return;

        const image = new window.Image();
        image.src = BACKGROUND_IMAGE_SRC;
        image.onload = () => {
            backgroundImageRef.current = image;
        };
    }, []);

    useEffect(() => {
        return () => {
            if (bannerTimeoutRef.current) clearTimeout(bannerTimeoutRef.current);
        };
    }, []);

    useEffect(() => {
        setBestScores(loadScores());
        if (typeof window !== "undefined") {
            const claimedEmail = window.localStorage.getItem(BONUS_EMAIL_KEY);
            const storedBank = parseInt(window.localStorage.getItem(BONUS_BANK_KEY) || "0", 10);
            if (claimedEmail) {
                setHasClaimedBonus(true);
                setEmail(claimedEmail);
                setBonusStatus("success");
                setBonusMessage("Bonus already claimed on this device. The mice still need catching.");
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

    const showStatusBanner = useCallback((title: string, copy: string, tone: StatusBanner["tone"]) => {
        if (bannerTimeoutRef.current) clearTimeout(bannerTimeoutRef.current);
        setStatusBanner({
            id: Date.now(),
            title,
            copy,
            tone,
        });
        bannerTimeoutRef.current = setTimeout(() => {
            setStatusBanner(null);
        }, 1500);
    }, []);

    const addParticles = useCallback((x: number, y: number, color: string, kind: ParticleState["kind"]) => {
        const snapshot = gameRef.current;
        for (let i = 0; i < 8; i += 1) {
            snapshot.particles.push({
                id: idSeedRef.current++,
                x,
                y,
                vx: (Math.random() - 0.5) * 180,
                vy: -60 - Math.random() * 140,
                life: 0.8 + Math.random() * 0.25,
                maxLife: 0.8 + Math.random() * 0.25,
                color,
                kind,
                size: 2 + Math.random() * 3,
            });
        }
    }, []);

    const resetCombo = useCallback(() => {
        comboRef.current = 0;
        gameRef.current.comboExpireAt = 0;
        setCombo(0);
    }, []);

    const registerCombo = useCallback(() => {
        const now = performance.now();
        const snapshot = gameRef.current;
        const nextCombo = snapshot.comboExpireAt > now ? comboRef.current + 1 : 1;
        snapshot.comboExpireAt = now + 2200;
        comboRef.current = nextCombo;
        setCombo(nextCombo);
        return nextCombo;
    }, []);

    const pushScore = useCallback((finalScore: number) => {
        const entry: ScoreEntry = {
            id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
            name: (pilotNameRef.current || "Captain Noodle").trim() || "Captain Noodle",
            score: finalScore,
            createdAt: Date.now(),
            title: getRankTitle(finalScore),
        };
        const nextScores = [...loadScores(), entry]
            .sort((a, b) => b.score - a.score || b.createdAt - a.createdAt)
            .slice(0, 8);
        saveScores(nextScores);
        setBestScores(nextScores);
    }, []);

    const startFreshGame = useCallback(() => {
        initAudioContext();
        playRandomMeow();
        const openingScore = bonusBankRef.current;
        persistBonusBank(0);
        const snapshot = createLevelState(0, idSeedRef);
        snapshot.player.checkpointX = 96;
        snapshot.player.checkpointY = GROUND_Y - snapshot.player.height;
        gameRef.current = snapshot;
        scoreRef.current = openingScore;
        livesRef.current = MAX_LIVES;
        jumpLatchRef.current = false;
        shootQueuedRef.current = false;
        setLevelIndex(0);
        setScore(openingScore);
        setLives(MAX_LIVES);
        setCombo(0);
        setBoostSeconds(0);
        setIsRespawning(false);
        setStatusBanner(null);
        setOverlayTitle(LEVELS[0].name);
        setOverlayCopy(LEVELS[0].goal);
        setMode("playing");
    }, [persistBonusBank]);

    const advanceLevel = useCallback(() => {
        const nextIndex = levelIndex + 1;
        if (nextIndex >= LEVELS.length) {
            const finalScore = scoreRef.current + 500;
            scoreRef.current = finalScore;
            setScore(finalScore);
            pushScore(finalScore);
            setOverlayTitle("Moonlight Lounge Saved");
            setOverlayCopy("You brought the Star Pointer home and turned the lounge back into a cozy cat paradise.");
            setMode("won");
            playRandomPurr();
            return;
        }

        initAudioContext();
        playRandomPurr();
        const snapshot = createLevelState(nextIndex, idSeedRef);
        gameRef.current = snapshot;
        jumpLatchRef.current = false;
        shootQueuedRef.current = false;
        setLevelIndex(nextIndex);
        setCombo(0);
        setBoostSeconds(0);
        setIsRespawning(false);
        setStatusBanner(null);
        setOverlayTitle(LEVELS[nextIndex].name);
        setOverlayCopy(LEVELS[nextIndex].goal);
        setMode("playing");
    }, [levelIndex, pushScore]);

    const loseLife = useCallback(() => {
        resetCombo();
        const snapshot = gameRef.current;
        const level = LEVELS[snapshot.levelIndex];
        const nextLives = livesRef.current - 1;
        livesRef.current = nextLives;
        setLives(nextLives);
        shootQueuedRef.current = false;
        playGameOverSound();

        if (nextLives <= 0) {
            snapshot.running = false;
            pushScore(scoreRef.current);
            setOverlayTitle("Whiskers Down");
            setOverlayCopy("The mouse mob finally caught you. Tighten the timing and take another run.");
            setMode("gameOver");
            setIsRespawning(false);
            return;
        }

        const player = snapshot.player;
        const nearbyRespawn = getRespawnPoint(level, Math.max(player.checkpointX, player.x - 140), player.width, player.height);
        player.checkpointX = nearbyRespawn.x;
        player.checkpointY = nearbyRespawn.y;
        player.vx = 0;
        player.vy = 0;
        player.onGround = false;
        player.isDown = true;
        snapshot.respawnAt = performance.now() + RESPAWN_DELAY_MS;
        setIsRespawning(true);
        showStatusBanner("Cat nap interrupted", "Respawning from the nearest safe cushion...", "danger");
    }, [pushScore, resetCombo, showStatusBanner]);

    useEffect(() => {
        if (mode !== "playing") return;

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const dpr = window.devicePixelRatio || 1;
        canvas.width = VIEWPORT_WIDTH * dpr;
        canvas.height = VIEWPORT_HEIGHT * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        const loop = (time: number) => {
            const snapshot = gameRef.current;
            if (!snapshot.running) return;

            const level = LEVELS[snapshot.levelIndex];
            const previousTick = snapshot.lastTick || time;
            const delta = Math.min((time - previousTick) / 1000, 0.033);
            snapshot.lastTick = time;
            const player = snapshot.player;
            const boosted = snapshot.boostUntil > time;
            const nextBoostSeconds = boosted ? Math.ceil((snapshot.boostUntil - time) / 1000) : 0;
            setBoostSeconds((prev) => (prev === nextBoostSeconds ? prev : nextBoostSeconds));

            if (player.isDown && snapshot.respawnAt && snapshot.respawnAt <= time) {
                player.x = player.checkpointX;
                player.y = player.checkpointY;
                player.vx = 0;
                player.vy = 0;
                player.onGround = true;
                player.isDown = false;
                player.invulnerableUntil = time + 1500;
                snapshot.respawnAt = 0;
                setIsRespawning(false);
                showStatusBanner("Back on paws", "Nearby checkpoint reached. Keep the run alive.", "info");
                playRandomMeow();
            }

            const moveLeft = Boolean(keysRef.current.ArrowLeft || keysRef.current.a || keysRef.current.left);
            const moveRight = Boolean(keysRef.current.ArrowRight || keysRef.current.d || keysRef.current.right);
            const jumpPressed = Boolean(keysRef.current.ArrowUp || keysRef.current.w || keysRef.current.jump);
            const isRespawnPause = player.isDown && snapshot.respawnAt > time;

            if (!isRespawnPause) {
                const moveDirection = (moveRight ? 1 : 0) - (moveLeft ? 1 : 0);
                const runSpeed = boosted ? 310 : 260;
                player.vx = moveDirection * runSpeed;
                if (moveDirection !== 0) {
                    player.facing = moveDirection > 0 ? 1 : -1;
                }

                if (jumpPressed && !jumpLatchRef.current && player.onGround) {
                    player.vy = -560;
                    player.onGround = false;
                    jumpLatchRef.current = true;
                    playRandomMeow();
                }
                if (!jumpPressed) {
                    jumpLatchRef.current = false;
                }

                const fireDelay = boosted ? 180 : 260;
                if (shootQueuedRef.current && time - player.lastShotAt > fireDelay) {
                    shootQueuedRef.current = false;
                    player.lastShotAt = time;
                    snapshot.bullets.push({
                        id: idSeedRef.current++,
                        x: player.x + (player.facing > 0 ? player.width : -20),
                        y: player.y + 16,
                        vx: player.facing * (boosted ? 700 : 560),
                        width: boosted ? 22 : 18,
                        height: boosted ? 6 : 5,
                    });

                    if (boosted) {
                        snapshot.bullets.push({
                            id: idSeedRef.current++,
                            x: player.x + (player.facing > 0 ? player.width - 6 : -14),
                            y: player.y + 24,
                            vx: player.facing * 610,
                            width: 14,
                            height: 4,
                        });
                    }
                }

                player.vy += GRAVITY * delta;
                player.x = clamp(player.x + player.vx * delta, 0, level.worldWidth - player.width);
                const previousBottom = player.y + player.height;
                player.y += player.vy * delta;
                player.onGround = false;

                if (player.y + player.height >= GROUND_Y) {
                    player.y = GROUND_Y - player.height;
                    player.vy = 0;
                    player.onGround = true;
                }

                for (const platform of level.platforms) {
                    const nextBottom = player.y + player.height;
                    const overlappingX = player.x + player.width > platform.x + 6 && player.x < platform.x + platform.width - 6;
                    const landed = previousBottom <= platform.y && nextBottom >= platform.y && player.vy >= 0;
                    if (overlappingX && landed) {
                        player.y = platform.y - player.height;
                        player.vy = 0;
                        player.onGround = true;
                    }
                }

                if (player.onGround && player.x >= player.checkpointX + CHECKPOINT_STEP) {
                    const checkpoint = getRespawnPoint(level, player.x - 42, player.width, player.height);
                    player.checkpointX = checkpoint.x;
                    player.checkpointY = checkpoint.y;
                }
            }

            snapshot.cameraX = clamp(player.x - VIEWPORT_WIDTH * 0.32, 0, level.worldWidth - VIEWPORT_WIDTH);

            snapshot.bullets = snapshot.bullets.filter((bullet) => {
                bullet.x += bullet.vx * delta;
                return bullet.x > -60 && bullet.x < level.worldWidth + 60;
            });

            for (const star of snapshot.stars) {
                star.x -= star.speed * delta;
                if (star.x < -10) {
                    star.x = VIEWPORT_WIDTH + Math.random() * 60;
                    star.y = Math.random() * (VIEWPORT_HEIGHT - 120);
                }
            }

            for (const enemy of snapshot.enemies) {
                if (!enemy.alive) continue;
                enemy.x += enemy.vx * delta;
                if (enemy.x < enemy.patrolMin || enemy.x + enemy.width > enemy.patrolMax) {
                    enemy.vx *= -1;
                }
            }

            for (const particle of snapshot.particles) {
                particle.life -= delta;
                particle.x += particle.vx * delta;
                particle.y += particle.vy * delta;
                particle.vy += 120 * delta;
            }
            snapshot.particles = snapshot.particles.filter((particle) => particle.life > 0);

            for (let bulletIndex = snapshot.bullets.length - 1; bulletIndex >= 0; bulletIndex -= 1) {
                const bullet = snapshot.bullets[bulletIndex];
                let used = false;

                for (const enemy of snapshot.enemies) {
                    if (!enemy.alive) continue;
                    if (!rectsOverlap(bullet.x, bullet.y, bullet.width, bullet.height, enemy.x, enemy.y, enemy.width, enemy.height)) continue;

                    enemy.alive = false;
                    snapshot.bullets.splice(bulletIndex, 1);
                    used = true;
                    const nextCombo = registerCombo();
                    const basePoints = enemy.type === "roller" ? 90 : 55;
                    const bonus = Math.min((nextCombo - 1) * 10, 100);
                    setScore((prev) => {
                        const next = prev + basePoints + bonus;
                        scoreRef.current = next;
                        return next;
                    });
                    addParticles(enemy.x + enemy.width / 2, enemy.y + enemy.height / 2, enemy.type === "roller" ? "#b8d8ff" : "#ffd5e8", "spark");
                    break;
                }

                if (used) continue;
            }

            for (const pickup of snapshot.pickups) {
                if (pickup.collected) continue;
                if (!rectsOverlap(player.x, player.y, player.width, player.height, pickup.x, pickup.y, pickup.width, pickup.height)) continue;
                pickup.collected = true;
                snapshot.pickupPulseUntil = time + 650;
                snapshot.pickupPulseX = pickup.x + 14;
                snapshot.pickupPulseY = pickup.y + 14;
                snapshot.pickupPulseTone = pickup.type;
                if (pickup.type === "tuna") {
                    setScore((prev) => {
                        const next = prev + 120;
                        scoreRef.current = next;
                        return next;
                    });
                    addParticles(pickup.x + 14, pickup.y + 14, "#9fe6f0", "heart");
                    player.checkpointX = Math.max(player.checkpointX, getRespawnPoint(level, player.x - 30, player.width, player.height).x);
                    player.checkpointY = getRespawnPoint(level, player.checkpointX, player.width, player.height).y;
                    showStatusBanner("Tuna bonus", "+120 points and a fresher checkpoint.", "bonus");
                    playRandomPurr();
                } else {
                    snapshot.boostUntil = time + 8500;
                    setScore((prev) => {
                        const next = prev + 90;
                        scoreRef.current = next;
                        return next;
                    });
                    addParticles(pickup.x + 14, pickup.y + 14, "#ffe08a", "spark");
                    showStatusBanner("Laser burst", "Boost active. Shots are faster and brighter.", "bonus");
                    playRandomPurr();
                }
            }

            snapshot.pickups = snapshot.pickups.filter((pickup) => !pickup.collected);

            if (snapshot.comboExpireAt && snapshot.comboExpireAt < time && comboRef.current > 0) {
                resetCombo();
            }

            if (!player.isDown && player.invulnerableUntil < time) {
                for (const enemy of snapshot.enemies) {
                    if (!enemy.alive) continue;
                    if (!rectsOverlap(player.x, player.y, player.width, player.height, enemy.x, enemy.y, enemy.width, enemy.height)) continue;
                    enemy.alive = false;
                    addParticles(enemy.x + enemy.width / 2, enemy.y + enemy.height / 2, "#fff0a8", "spark");
                    loseLife();
                    break;
                }
            }

            snapshot.enemies = snapshot.enemies.filter((enemy) => enemy.alive);

            if (!player.isDown && player.y > VIEWPORT_HEIGHT + 140) {
                loseLife();
            }

            if (!player.isDown && player.x >= level.goalX) {
                snapshot.running = false;
                setOverlayTitle(`${level.name} Cleared`);
                setOverlayCopy(level.tagline);
                setMode("levelComplete");
                setScore((prev) => {
                    const next = prev + 250;
                    scoreRef.current = next;
                    return next;
                });
                playRandomPurr();
                return;
            }

            drawSky(ctx, level, snapshot.cameraX, snapshot.stars, backgroundImageRef.current);
            drawGround(ctx, snapshot.cameraX, level.worldWidth);
            drawCheckpointFlag(ctx, player, snapshot.cameraX);
            for (const platform of level.platforms) drawPlatform(ctx, platform, snapshot.cameraX);
            drawGoal(ctx, level, snapshot.cameraX);
            drawParticles(ctx, snapshot.particles, snapshot.cameraX);
            drawPickupPulse(ctx, snapshot, snapshot.cameraX, time);
            for (const pickup of snapshot.pickups) drawPickup(ctx, pickup, snapshot.cameraX, time);
            for (const bullet of snapshot.bullets) drawBullet(ctx, bullet, snapshot.cameraX, boosted);
            for (const enemy of snapshot.enemies) drawEnemy(ctx, enemy, snapshot.cameraX);
            drawPlayer(ctx, player, snapshot.cameraX, boosted, time);

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
    }, [addParticles, levelIndex, loseLife, mode, registerCombo, resetCombo, showStatusBanner]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            const key = event.key.toLowerCase();
            if (key === "arrowleft" || key === "a") keysRef.current.left = true;
            if (key === "arrowright" || key === "d") keysRef.current.right = true;
            if (key === "arrowup" || key === "w" || key === " ") {
                keysRef.current.jump = true;
                event.preventDefault();
            }
            if (key === "j" || key === "f" || key === "x") {
                if (!keysRef.current.shoot && !event.repeat) {
                    shootQueuedRef.current = true;
                }
                keysRef.current.shoot = true;
            }
            if (mode !== "playing" && (key === "enter" || key === " ")) {
                event.preventDefault();
                if (mode === "levelComplete") {
                    advanceLevel();
                } else {
                    startFreshGame();
                }
            }
        };

        const handleKeyUp = (event: KeyboardEvent) => {
            const key = event.key.toLowerCase();
            if (key === "arrowleft" || key === "a") keysRef.current.left = false;
            if (key === "arrowright" || key === "d") keysRef.current.right = false;
            if (key === "arrowup" || key === "w" || key === " ") keysRef.current.jump = false;
            if (key === "j" || key === "f" || key === "x") keysRef.current.shoot = false;
        };

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, [advanceLevel, mode, startFreshGame]);

    useEffect(() => {
        const snapshot = gameRef.current;
        return () => {
            snapshot.running = false;
            if (snapshot.frameId) cancelAnimationFrame(snapshot.frameId);
        };
    }, []);

    const setTouchControl = useCallback((key: "left" | "right" | "jump", pressed: boolean) => {
        keysRef.current[key] = pressed;
    }, []);

    const queueShot = useCallback(() => {
        shootQueuedRef.current = true;
    }, []);

    const claimBonus = useCallback(async () => {
        if (hasClaimedBonus) {
            setBonusStatus("success");
            setBonusMessage("This device already claimed the bonus. The levels are still waiting.");
            return;
        }

        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setBonusStatus("error");
            setBonusMessage("Please enter a valid email address for the bonus.");
            return;
        }

        setBonusStatus("loading");
        setBonusMessage("Sending your cat-runner bonus request...");

        try {
            const response = await fetch("/api/subscribe", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email,
                    source: "fun_whisker_run_bonus",
                    locale: "en",
                }),
            });

            const data = (await response.json().catch(() => null)) as { success?: boolean; error?: string } | null;
            if (!response.ok || !data?.success) {
                throw new Error(data?.error || "Unable to claim the bonus right now.");
            }

            if (typeof window !== "undefined") {
                window.localStorage.setItem(BONUS_EMAIL_KEY, email.toLowerCase().trim());
            }
            setHasClaimedBonus(true);
            setBonusStatus("success");

            if (mode === "playing") {
                setScore((prev) => {
                    const next = prev + BONUS_POINTS;
                    scoreRef.current = next;
                    return next;
                });
                setBonusMessage("Bonus landed. +250 points added to your current run.");
            } else {
                const nextBank = bonusBankRef.current + BONUS_POINTS;
                persistBonusBank(nextBank);
                setBonusMessage("Bonus banked. Start the run with +250 points.");
            }
        } catch (error) {
            setBonusStatus("error");
            setBonusMessage(error instanceof Error ? error.message : "Bonus claim failed.");
        }
    }, [email, hasClaimedBonus, mode, persistBonusBank]);

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

    const currentLevel = LEVELS[levelIndex];
    const progress = Math.round((gameRef.current.player.x / currentLevel.goalX) * 100);
    const overlayAction = mode === "levelComplete" ? "Continue Run" : "Start Run";

    return (
        <div className="overflow-hidden rounded-[2rem] border border-rose-200/70 bg-white/70 shadow-[0_28px_90px_rgba(248,143,160,0.18)] backdrop-blur-md dark:border-rose-900/40 dark:bg-gray-950/70">
            <div className="border-b border-rose-100/90 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.9),_rgba(255,238,241,0.75)_40%,_rgba(238,247,255,0.7))] px-6 py-6 dark:border-rose-900/30 dark:bg-[radial-gradient(circle_at_top,_rgba(67,29,55,0.95),_rgba(39,20,47,0.94)_45%,_rgba(14,23,40,0.98)_90%)]">
                <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                    <div>
                        <div className="inline-flex items-center gap-2 rounded-full border border-rose-200/70 bg-white/80 px-4 py-2 text-xs font-black uppercase tracking-[0.3em] text-rose-500 dark:border-rose-700/40 dark:bg-white/10 dark:text-rose-200">
                            <Rocket className="h-4 w-4" />
                            Whisker Run
                        </div>
                        <h3 className="mt-4 font-serif text-4xl font-black text-gray-900 dark:text-white">
                            Cinematic cat sprint
                        </h3>
                        <p className="mt-3 max-w-3xl text-base leading-7 text-gray-600 dark:text-gray-300">
                            Sprint left to right across three lush districts, stay low on all four paws, fire one deliberate laser shot at a time,
                            and keep surviving thanks to nearby respawns instead of full resets.
                        </p>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-4">
                        <div className="rounded-2xl border border-white/70 bg-white/75 px-4 py-3 dark:border-white/10 dark:bg-white/5">
                            <p className="text-[10px] font-black uppercase tracking-[0.28em] text-rose-400 dark:text-rose-200">Score</p>
                            <p className="mt-1 text-2xl font-black text-gray-900 dark:text-white">{score}</p>
                        </div>
                        <div className="rounded-2xl border border-white/70 bg-white/75 px-4 py-3 dark:border-white/10 dark:bg-white/5">
                            <p className="text-[10px] font-black uppercase tracking-[0.28em] text-sky-500 dark:text-sky-200">Level</p>
                            <p className="mt-1 text-2xl font-black text-gray-900 dark:text-white">{levelIndex + 1}/{LEVELS.length}</p>
                        </div>
                        <div className="rounded-2xl border border-white/70 bg-white/75 px-4 py-3 dark:border-white/10 dark:bg-white/5">
                            <p className="text-[10px] font-black uppercase tracking-[0.28em] text-amber-500 dark:text-amber-200">Combo</p>
                            <p className="mt-1 text-2xl font-black text-gray-900 dark:text-white">{combo}x</p>
                        </div>
                        <div className="rounded-2xl border border-white/70 bg-white/75 px-4 py-3 dark:border-white/10 dark:bg-white/5">
                            <p className="text-[10px] font-black uppercase tracking-[0.28em] text-violet-500 dark:text-violet-200">Boost</p>
                            <p className="mt-1 text-2xl font-black text-gray-900 dark:text-white">{boostSeconds ? `${boostSeconds}s` : "Ready"}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid gap-6 p-6 xl:grid-cols-[minmax(0,1.65fr)_minmax(320px,0.95fr)]">
                <div className="rounded-[1.75rem] border border-rose-100/80 bg-gradient-to-b from-[#25143a] via-[#53295f] to-[#f6a99f] p-4 shadow-inner dark:border-rose-900/30">
                    <div className="mb-3 flex flex-wrap items-center justify-between gap-3 text-white/90">
                        <div className="flex flex-wrap items-center gap-2">
                            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-black uppercase tracking-[0.25em]">
                                <Zap className="h-3.5 w-3.5" />
                                Arrows / A-D to run
                            </div>
                            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-black uppercase tracking-[0.25em]">
                                <Star className="h-3.5 w-3.5" />
                                W / Up / Space to jump
                            </div>
                            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-black uppercase tracking-[0.25em]">
                                <Sparkles className="h-3.5 w-3.5" />
                                J / F / X for single-shot fire
                            </div>
                        </div>
                        <div className="flex items-center gap-1">{hearts}</div>
                    </div>

                    {statusBanner && (
                        <div
                            className={`mb-3 rounded-2xl border px-4 py-3 text-sm shadow-lg ${
                                statusBanner.tone === "danger"
                                    ? "border-rose-300/70 bg-rose-100/90 text-rose-900 dark:border-rose-500/40 dark:bg-rose-950/45 dark:text-rose-100"
                                    : statusBanner.tone === "bonus"
                                        ? "border-amber-200/70 bg-amber-50/90 text-amber-900 dark:border-amber-500/30 dark:bg-amber-950/35 dark:text-amber-100"
                                        : "border-sky-200/70 bg-sky-50/90 text-sky-900 dark:border-sky-500/30 dark:bg-sky-950/35 dark:text-sky-100"
                            }`}
                        >
                            <p className="text-[11px] font-black uppercase tracking-[0.28em]">{statusBanner.title}</p>
                            <p className="mt-1 text-sm font-medium">{statusBanner.copy}</p>
                        </div>
                    )}

                    <div className="relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#170f28]">
                        <canvas
                            ref={canvasRef}
                            width={VIEWPORT_WIDTH}
                            height={VIEWPORT_HEIGHT}
                            onPointerDown={queueShot}
                            className="block aspect-[960/540] w-full touch-none"
                        />

                        {mode === "playing" && isRespawning && (
                            <div className="absolute inset-0 flex items-center justify-center bg-[#120b24]/42 p-6 backdrop-blur-[1.5px]">
                                <div className="rounded-[1.5rem] border border-white/10 bg-black/35 px-6 py-5 text-center text-white shadow-2xl">
                                    <p className="text-[11px] font-black uppercase tracking-[0.34em] text-rose-100">Whiskers down</p>
                                    <p className="mt-2 text-2xl font-black">The mice got a hit.</p>
                                    <p className="mt-2 text-sm text-white/75">Respawning from the nearest safe cushion...</p>
                                </div>
                            </div>
                        )}

                        {mode !== "playing" && (
                            <div className="absolute inset-0 flex items-center justify-center bg-[#120b24]/48 p-6 backdrop-blur-[2px]">
                                <div className="max-w-md rounded-[1.75rem] border border-white/10 bg-white/88 p-6 text-center shadow-2xl dark:bg-gray-950/82">
                                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-rose-200 via-orange-100 to-sky-100 text-3xl shadow-inner">
                                        😺
                                    </div>
                                    <h4 className="mt-4 text-2xl font-black text-gray-900 dark:text-white">{overlayTitle}</h4>
                                    <p className="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-300">{overlayCopy}</p>
                                    <button
                                        type="button"
                                        onClick={mode === "levelComplete" ? advanceLevel : startFreshGame}
                                        className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-orange-400 px-6 py-3 text-sm font-black uppercase tracking-[0.24em] text-white transition hover:brightness-105"
                                    >
                                        <Rocket className="h-4 w-4" />
                                        {mode === "won" || mode === "gameOver" ? "Play Again" : overlayAction}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="mt-4 grid grid-cols-4 gap-3">
                        {[
                            { key: "left", label: "Left" },
                            { key: "right", label: "Right" },
                            { key: "jump", label: "Jump" },
                        ].map((control) => (
                            <button
                                key={control.key}
                                type="button"
                                onPointerDown={() => setTouchControl(control.key as "left" | "right" | "jump", true)}
                                onPointerUp={() => setTouchControl(control.key as "left" | "right" | "jump", false)}
                                onPointerLeave={() => setTouchControl(control.key as "left" | "right" | "jump", false)}
                                className="rounded-2xl border border-white/15 bg-white/12 px-3 py-3 text-sm font-black uppercase tracking-[0.2em] text-white transition hover:bg-white/20"
                            >
                                {control.label}
                            </button>
                        ))}

                        <button
                            type="button"
                            onPointerDown={queueShot}
                            className="rounded-2xl border border-white/15 bg-rose-400/25 px-3 py-3 text-sm font-black uppercase tracking-[0.2em] text-white transition hover:bg-rose-400/35"
                        >
                            Shoot
                        </button>
                    </div>
                </div>

                <div className="grid gap-5">
                    <div className="rounded-[1.75rem] border border-rose-100/80 bg-white/85 p-5 shadow-sm dark:border-rose-900/30 dark:bg-white/5">
                        <p className="text-xs font-black uppercase tracking-[0.28em] text-rose-400 dark:text-rose-200">Current mission</p>
                        <h4 className="mt-2 text-xl font-black text-gray-900 dark:text-white">{currentLevel.name}</h4>
                        <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-300">{currentLevel.goal}</p>

                        <div className="mt-4 rounded-2xl bg-rose-50 px-4 py-3 dark:bg-rose-950/30">
                            <p className="text-[10px] font-black uppercase tracking-[0.24em] text-rose-500 dark:text-rose-200">Progress</p>
                            <div className="mt-2 h-3 overflow-hidden rounded-full bg-white/80 dark:bg-white/10">
                                <div
                                    className="h-full rounded-full bg-gradient-to-r from-rose-400 via-orange-400 to-sky-400"
                                    style={{ width: `${clamp(progress, 0, 100)}%` }}
                                />
                            </div>
                            <p className="mt-2 text-sm font-semibold text-gray-700 dark:text-gray-200">{clamp(progress, 0, 100)}% to the finish arch</p>
                        </div>

                        <div className="mt-4 grid gap-3 sm:grid-cols-3">
                            <div className="rounded-2xl bg-rose-50 px-4 py-3 dark:bg-rose-950/30">
                                <Fish className="h-4 w-4 text-rose-500 dark:text-rose-200" />
                                <p className="mt-2 text-sm font-semibold text-gray-800 dark:text-gray-100">Tuna</p>
                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Worth +120 points and nudges your respawn closer.</p>
                            </div>
                            <div className="rounded-2xl bg-sky-50 px-4 py-3 dark:bg-sky-950/30">
                                <Zap className="h-4 w-4 text-sky-500 dark:text-sky-200" />
                                <p className="mt-2 text-sm font-semibold text-gray-800 dark:text-gray-100">Laser pointer</p>
                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Faster, brighter manual shots for 8.5 seconds.</p>
                            </div>
                            <div className="rounded-2xl bg-amber-50 px-4 py-3 dark:bg-amber-950/30">
                                <Star className="h-4 w-4 text-amber-500 dark:text-amber-200" />
                                <p className="mt-2 text-sm font-semibold text-gray-800 dark:text-gray-100">Overall goal</p>
                                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Bring home the Star Pointer.</p>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-[1.75rem] border border-rose-100/80 bg-white/85 p-5 shadow-sm dark:border-rose-900/30 dark:bg-white/5">
                        <div className="flex items-center justify-between gap-3">
                            <div>
                                <p className="text-xs font-black uppercase tracking-[0.28em] text-sky-500 dark:text-sky-200">Inbox bonus</p>
                                <h4 className="mt-2 text-xl font-black text-gray-900 dark:text-white">Email for +250 points</h4>
                            </div>
                            <Mail className="h-5 w-5 text-sky-500 dark:text-sky-200" />
                        </div>

                        <p className="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-300">
                            Subscribe for cat tips and offers, then claim a one-time run bonus. It applies instantly if you are mid-level, or it banks for the next run.
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
                                className="inline-flex min-w-[190px] items-center justify-center gap-2 rounded-full bg-gradient-to-r from-sky-500 to-rose-500 px-5 py-3 text-sm font-black uppercase tracking-[0.24em] text-white transition hover:brightness-105 disabled:opacity-60"
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
                                {bonusBank} points are banked for your next run.
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

                        <label className="mt-4 block text-sm font-semibold text-gray-700 dark:text-gray-200" htmlFor="whisker-run-name">
                            Scoreboard name
                        </label>
                        <input
                            id="whisker-run-name"
                            type="text"
                            maxLength={24}
                            value={pilotName}
                            onChange={(event) => setPilotName(event.target.value)}
                            className="mt-2 w-full rounded-2xl border border-rose-100 bg-white px-4 py-3 text-sm font-semibold text-gray-900 outline-none transition focus:border-rose-300 focus:ring-2 focus:ring-rose-200 dark:border-rose-900/40 dark:bg-gray-950/70 dark:text-white dark:focus:border-rose-700 dark:focus:ring-rose-900/40"
                            placeholder="Captain Noodle"
                        />

                        <div className="mt-4 space-y-3">
                            {bestScores.length === 0 ? (
                                <div className="rounded-2xl bg-amber-50 px-4 py-4 text-sm text-gray-600 dark:bg-amber-950/30 dark:text-gray-300">
                                    No scores yet. The first cat runner gets the softest cushion.
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
