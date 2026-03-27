import React, { useRef, useEffect, useState, useCallback } from "react";
import { useColorMode } from "@docusaurus/theme-common";

type PokeballBehavior = "straight" | "curve" | "zigzag" | "accelerate" | "homing";

interface PokeballType {
  name: string;
  sprite: string;
  speed: number;
  behavior: PokeballBehavior;
  color: string;
  description: string;
  weight: number;
}

const POKEBALL_TYPES: PokeballType[] = [
  { name: "Poké Ball", sprite: "/img/pokeballs/pokeball.png", speed: 0.5, behavior: "straight", color: "#ef4444", description: "Slow and steady", weight: 30 },
  { name: "Great Ball", sprite: "/img/pokeballs/greatball.png", speed: 0.7, behavior: "curve", color: "#3b82f6", description: "Slight curve", weight: 25 },
  { name: "Ultra Ball", sprite: "/img/pokeballs/ultraball.png", speed: 1.0, behavior: "zigzag", color: "#facc15", description: "Zigzag pattern", weight: 20 },
  { name: "Quick Ball", sprite: "/img/pokeballs/quickball.png", speed: 1.8, behavior: "straight", color: "#22d3ee", description: "Very fast", weight: 10 },
  { name: "Timer Ball", sprite: "/img/pokeballs/timerball.png", speed: 0.3, behavior: "accelerate", color: "#f97316", description: "Accelerates", weight: 10 },
  { name: "Master Ball", sprite: "/img/pokeballs/masterball.png", speed: 0.9, behavior: "homing", color: "#a855f7", description: "Tracks target", weight: 5 },
];

const TOTAL_WEIGHT = POKEBALL_TYPES.reduce((s, t) => s + t.weight, 0);

function pickPokeballType(): PokeballType {
  let r = Math.random() * TOTAL_WEIGHT;
  for (const t of POKEBALL_TYPES) {
    r -= t.weight;
    if (r <= 0) return t;
  }
  return POKEBALL_TYPES[0];
}

interface Pokeball {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  rotation: number;
  rotationSpeed: number;
  type: PokeballType;
  frameAge: number;
  baseSpeed: number;
  drawSize: number;
}

interface Projectile {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

interface Beam {
  angle: number;
  startTime: number;
  duration: number;
  originX: number;
  originY: number;
  startWidth: number;
  maxWidth: number;
  firstHit: { x: number; y: number } | null;
  textSizeRand: number; // 0..1 random factor for text size variation
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  decay: number;
  color: string;
}

interface Difficulty {
  name: string;
  speedMult: number;
  aimLength: number;
}

const DIFFICULTIES: Difficulty[] = [
  { name: "Easy", speedMult: 0.6, aimLength: 200 },
  { name: "Medium", speedMult: 1.0, aimLength: 120 },
  { name: "Hard", speedMult: 1.5, aimLength: 40 },
];

interface Star {
  x: number; // 0..1 normalized
  y: number; // 0..1 normalized
  size: number;
  brightness: number;
}

type Phase = "start" | "playing" | "paused" | "gameover";

const PARTICLE_COLORS = ["#facc15", "#f97316", "#ef4444", "#a855f7"];
const SPAWN_INTERVAL = 1500;
const FIRE_INTERVAL = 800;
const MAX_POKEBALLS = 8;
const SPRITE_SIZE = 160;
const ROTATION_SPEED = 0.04;
const GROUND_OFFSET = 180;
const EARTH_CURVE_DROP = 55;
const NUM_STARS = 120;

function generateStars(): Star[] {
  const stars: Star[] = [];
  for (let i = 0; i < NUM_STARS; i++) {
    stars.push({
      x: Math.random(),
      y: Math.random() * 0.85,
      size: 0.5 + Math.random() * 1.5,
      brightness: 0.3 + Math.random() * 0.7,
    });
  }
  return stars;
}

function createInitialState() {
  return {
    stars: generateStars(),
    pokeballs: [] as Pokeball[],
    projectiles: [] as Projectile[],
    particles: [] as Particle[],
    lastShotTime: 0,
    lastSpawnTime: 0,
    spriteImage: null as HTMLImageElement | null,
    pokeballImages: {} as Record<string, HTMLImageElement>,
    goLetterG: null as HTMLImageElement | null,
    goLetterO: null as HTMLImageElement | null,
    snorlaxImage: null as HTMLImageElement | null,
    animId: 0,
    width: 0,
    height: 0,
    aimAngle: -Math.PI / 2,
    keysDown: new Set<string>(),
    phase: "start" as Phase,
    score: 0,
    avoided: 0,
    lives: 3,
    beam: null as Beam | null,
    pokemonCenterImage: null as HTMLImageElement | null,
    difficultyIndex: 1,
    buttonHitbox: null as { x: number; y: number; w: number; h: number } | null,
    chevronLeftHitbox: null as { x: number; y: number; w: number; h: number } | null,
    chevronRightHitbox: null as { x: number; y: number; w: number; h: number } | null,
    pauseHitbox: null as { x: number; y: number; w: number; h: number } | null,
    resumeHitbox: null as { x: number; y: number; w: number; h: number } | null,
    mouseX: 0,
    mouseY: 0,
  };
}

export default function AsteroidGame(): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { colorMode } = useColorMode();
  const [phase, setPhase] = useState<Phase>("start");
  const [score, setScore] = useState(0);
  const gameState = useRef(createInitialState());

  const spriteSrc =
    colorMode === "dark" ? "/img/mewtwo_sprite.png" : "/img/mew_sprite.png";

  useEffect(() => {
    const img = new Image();
    img.src = spriteSrc;
    gameState.current.spriteImage = img;
  }, [spriteSrc]);

  // Preload pokeball sprites
  useEffect(() => {
    const state = gameState.current;
    for (const t of POKEBALL_TYPES) {
      if (!state.pokeballImages[t.sprite]) {
        const img = new Image();
        img.src = t.sprite;
        state.pokeballImages[t.sprite] = img;
      }
    }
    const gImg = new Image();
    gImg.src = "/img/pokemongo_G.png";
    state.goLetterG = gImg;
    const oImg = new Image();
    oImg.src = "/img/pokemongo_O.png";
    state.goLetterO = oImg;
    const pcImg = new Image();
    pcImg.src = "/img/pokemon_center.png";
    state.pokemonCenterImage = pcImg;
    const snImg = new Image();
    snImg.src = "/img/snorlax.png";
    state.snorlaxImage = snImg;
  }, []);

  const startGame = useCallback(() => {
    const state = gameState.current;
    state.phase = "playing";
    state.pokeballs = [];
    state.projectiles = [];
    state.particles = [];
    state.score = 0;
    state.avoided = 0;
    state.lives = 3;
    state.beam = null;
    state.aimAngle = -Math.PI / 2;
    state.lastShotTime = 0;
    state.lastSpawnTime = 0;
    setPhase("playing");
    setScore(0);
  }, []);

  const restart = useCallback(() => {
    const state = gameState.current;
    state.phase = "start";
    state.pokeballs = [];
    state.projectiles = [];
    state.particles = [];
    state.score = 0;
    state.avoided = 0;
    state.lives = 3;
    state.beam = null;
    state.aimAngle = -Math.PI / 2;
    state.lastShotTime = 0;
    state.lastSpawnTime = 0;
    setPhase("start");
    setScore(0);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const state = gameState.current;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      state.width = rect.width;
      state.height = rect.height;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const observer = new ResizeObserver(resize);
    observer.observe(container);
    resize();

    const onKeyDown = (e: KeyboardEvent) => {
      const s = gameState.current;
      if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Enter", " "].includes(e.key)) {
        e.preventDefault();
      }

      // Pause/resume toggle
      if (e.key === "Escape" || e.key === "p" || e.key === "P") {
        if (s.phase === "playing") {
          s.phase = "paused";
          setPhase("paused");
          return;
        } else if (s.phase === "paused") {
          s.phase = "playing";
          setPhase("playing");
          return;
        }
      }

      if (s.phase === "paused") {
        if (e.key === "Enter" || e.key === " ") {
          s.phase = "playing";
          setPhase("playing");
        }
        return;
      }

      if (s.phase === "start" || s.phase === "gameover") {
        if (e.key === "ArrowUp" || e.key === "ArrowRight") {
          s.difficultyIndex = Math.min(s.difficultyIndex + 1, DIFFICULTIES.length - 1);
        } else if (e.key === "ArrowDown" || e.key === "ArrowLeft") {
          s.difficultyIndex = Math.max(s.difficultyIndex - 1, 0);
        } else if (e.key === "Enter" || e.key === " ") {
          if (s.phase === "start") {
            startGame();
          } else if (s.phase === "gameover") {
            restart();
          }
        }
      } else if (s.phase === "playing") {
        if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
          s.keysDown.add(e.key);
        }
      }
    };
    const onKeyUp = (e: KeyboardEvent) => {
      gameState.current.keysDown.delete(e.key);
    };
    const hitTest = (mx: number, my: number, box: { x: number; y: number; w: number; h: number } | null) =>
      box && mx >= box.x && mx <= box.x + box.w && my >= box.y && my <= box.y + box.h;

    const onCanvasClick = (e: MouseEvent) => {
      const s = gameState.current;
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      if (s.phase === "playing") {
        // Only pause button clickable during play
        if (hitTest(mx, my, s.pauseHitbox)) {
          s.phase = "paused";
          setPhase("paused");
        }
        return;
      }
      if (s.phase === "paused") {
        if (hitTest(mx, my, s.resumeHitbox)) {
          s.phase = "playing";
          setPhase("playing");
        }
        return;
      }
      if (hitTest(mx, my, s.buttonHitbox)) {
        if (s.phase === "start") startGame();
        else if (s.phase === "gameover") restart();
      } else if (hitTest(mx, my, s.chevronLeftHitbox)) {
        s.difficultyIndex = Math.max(s.difficultyIndex - 1, 0);
      } else if (hitTest(mx, my, s.chevronRightHitbox)) {
        s.difficultyIndex = Math.min(s.difficultyIndex + 1, DIFFICULTIES.length - 1);
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      const s = gameState.current;
      const rect = canvas.getBoundingClientRect();
      s.mouseX = e.clientX - rect.left;
      s.mouseY = e.clientY - rect.top;
      // Update cursor based on hovering pause button
      if (s.phase === "playing" && hitTest(s.mouseX, s.mouseY, s.pauseHitbox)) {
        canvas.style.cursor = "pointer";
      } else if (s.phase === "playing") {
        canvas.style.cursor = "default";
      }
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    canvas.addEventListener("click", onCanvasClick);
    canvas.addEventListener("mousemove", onMouseMove);

    const spawnPokeball = () => {
      const { width: w, height: h } = state;
      const groundCenterY = h - GROUND_OFFSET;
      const cx = w / 2;
      const side = Math.random();
      let x: number, y: number;
      if (side < 0.5) {
        x = 40 + Math.random() * (w - 80);
        y = -30;
      } else if (side < 0.75) {
        x = -30;
        y = Math.random() * groundCenterY * 0.5;
      } else {
        x = w + 30;
        y = Math.random() * groundCenterY * 0.5;
      }

      // Aim at the pokemon with small spread
      const targetX = cx + (Math.random() - 0.5) * SPRITE_SIZE;
      const targetY = groundCenterY - SPRITE_SIZE / 2;
      const angle = Math.atan2(targetY - y, targetX - x);
      const type = pickPokeballType();
      const diff = DIFFICULTIES[state.difficultyIndex];
      const speed = type.speed * diff.speedMult;
      const drawSize = (22 + Math.random() * 22) * 1.5;
      const radius = drawSize / 2;

      return {
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.08,
        type,
        frameAge: 0,
        baseSpeed: speed,
        drawSize,
      };
    };

    const drawPokemonGoText = (
      text: string,
      centerX: number,
      y: number,
      size: number,
      isDark: boolean,
    ) => {
      ctx.save();
      const font = `900 ${size}px "Helvetica Neue", Arial, sans-serif`;
      ctx.font = font;
      ctx.textAlign = "left";
      ctx.textBaseline = "middle";

      const gImg = state.goLetterG;
      const oImg = state.goLetterO;
      const hasSprites = !!(gImg?.complete && gImg.naturalWidth > 0
        && oImg?.complete && oImg.naturalWidth > 0);

      const spriteD = size * 0.95;

      const chars = text.split("");
      const charWidths: number[] = [];
      let totalWidth = 0;
      for (const ch of chars) {
        if (hasSprites && (ch === "G" || ch === "O")) {
          charWidths.push(spriteD);
        } else {
          charWidths.push(ctx.measureText(ch).width);
        }
        totalWidth += charWidths[charWidths.length - 1];
      }
      const spacing = size * 0.04;
      totalWidth += spacing * (chars.length - 1);

      let curX = centerX - totalWidth / 2;

      for (let i = 0; i < chars.length; i++) {
        const ch = chars[i];
        const cw = charWidths[i];
        const charCenterX = curX + cw / 2;

        if (hasSprites && (ch === "G" || ch === "O")) {
          const img = ch === "G" ? gImg! : oImg!;
          ctx.drawImage(
            img,
            charCenterX - spriteD / 2,
            y - spriteD / 2,
            spriteD,
            spriteD,
          );
        } else if (ch !== " ") {
          ctx.font = font;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";

          ctx.shadowColor = isDark ? "rgba(168,85,247,0.6)" : "rgba(80,50,200,0.4)";
          ctx.shadowBlur = 15;

          ctx.strokeStyle = isDark ? "#1a1a2e" : "#2d2d5e";
          ctx.lineWidth = size * 0.12;
          ctx.lineJoin = "round";
          ctx.strokeText(ch, charCenterX, y);

          const grad = ctx.createLinearGradient(
            charCenterX - size, y - size / 2,
            charCenterX + size, y + size / 2
          );
          if (isDark) {
            grad.addColorStop(0, "#c084fc");
            grad.addColorStop(0.5, "#ffffff");
            grad.addColorStop(1, "#c084fc");
          } else {
            grad.addColorStop(0, "#7c3aed");
            grad.addColorStop(0.5, "#3b82f6");
            grad.addColorStop(1, "#7c3aed");
          }
          ctx.fillStyle = grad;
          ctx.shadowBlur = 0;
          ctx.fillText(ch, charCenterX, y);

          ctx.strokeStyle = isDark ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.4)";
          ctx.lineWidth = 1;
          ctx.strokeText(ch, charCenterX, y - 1);
        }

        curX += cw + spacing;
      }

      ctx.restore();
    };

    const drawPokeballGuide = (centerX: number, startY: number, isDark: boolean) => {
      const spriteSize = 20;
      const rowHeight = 26;
      const cols = 2;
      const colGap = 24;

      // Measure widest row in each column to size them
      ctx.font = "bold 12px system-ui, sans-serif";
      let maxColW = 0;
      for (const t of POKEBALL_TYPES) {
        const nameW = ctx.measureText(t.name).width;
        ctx.font = "11px system-ui, sans-serif";
        const descW = ctx.measureText(`— ${t.description}`).width;
        ctx.font = "bold 12px system-ui, sans-serif";
        const rowW = spriteSize + 8 + nameW + 6 + descW;
        if (rowW > maxColW) maxColW = rowW;
      }

      const totalW = maxColW * cols + colGap;
      const baseX = centerX - totalW / 2;
      const rows = Math.ceil(POKEBALL_TYPES.length / cols);

      for (let i = 0; i < POKEBALL_TYPES.length; i++) {
        const t = POKEBALL_TYPES[i];
        const col = Math.floor(i / rows);
        const row = i % rows;
        const colX = baseX + col * (maxColW + colGap);
        const ry = startY + row * rowHeight;
        const img = state.pokeballImages[t.sprite];

        // Draw pokeball sprite
        if (img && img.complete && img.naturalWidth > 0) {
          ctx.drawImage(img, colX, ry - spriteSize / 2, spriteSize, spriteSize);
        } else {
          ctx.beginPath();
          ctx.arc(colX + spriteSize / 2, ry, spriteSize / 3, 0, Math.PI * 2);
          ctx.fillStyle = t.color;
          ctx.fill();
        }

        // Name + description on single line
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        ctx.fillStyle = isDark ? "rgba(255,255,255,0.85)" : "rgba(0,0,0,0.85)";
        ctx.font = "bold 12px system-ui, sans-serif";
        const nameW = ctx.measureText(t.name).width;
        ctx.fillText(t.name, colX + spriteSize + 8, ry);

        ctx.fillStyle = isDark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.45)";
        ctx.font = "11px system-ui, sans-serif";
        ctx.fillText(`— ${t.description}`, colX + spriteSize + 8 + nameW + 6, ry);
      }
    };

    const drawDifficultySelector = (leftEdgeX: number, y: number, isDark: boolean): number => {
      // Game Boy Color style selection box — returns right edge X
      const boxW = 180;
      const boxH = 42;
      const boxX = leftEdgeX;
      const boxY = y - boxH / 2;
      const r = 4; // corner radius
      const borderColor = isDark ? "#8b9bb4" : "#3a3a5c";
      const bgColor = isDark ? "rgba(10,16,32,0.85)" : "rgba(248,248,248,0.9)";
      const innerBorder = isDark ? "#5a6a84" : "#6a6a8c";

      // Outer border (double-line Game Boy style)
      ctx.save();
      ctx.beginPath();
      ctx.roundRect(boxX - 2, boxY - 2, boxW + 4, boxH + 4, r + 2);
      ctx.strokeStyle = borderColor;
      ctx.lineWidth = 2;
      ctx.stroke();

      // Background fill
      ctx.beginPath();
      ctx.roundRect(boxX, boxY, boxW, boxH, r);
      ctx.fillStyle = bgColor;
      ctx.fill();

      // Inner border
      ctx.beginPath();
      ctx.roundRect(boxX + 1, boxY + 1, boxW - 2, boxH - 2, r);
      ctx.strokeStyle = innerBorder;
      ctx.lineWidth = 1;
      ctx.stroke();

      // Left chevron
      const chevronSize = 8;
      const chevronY = y;
      const leftChevronX = boxX + 16;
      const canGoLeft = state.difficultyIndex > 0;
      ctx.beginPath();
      ctx.moveTo(leftChevronX + chevronSize, chevronY - chevronSize);
      ctx.lineTo(leftChevronX, chevronY);
      ctx.lineTo(leftChevronX + chevronSize, chevronY + chevronSize);
      ctx.strokeStyle = canGoLeft
        ? (isDark ? "#c084fc" : "#7c3aed")
        : (isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.15)");
      ctx.lineWidth = 2.5;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.stroke();

      // Right chevron
      const rightChevronX = boxX + boxW - 16;
      const canGoRight = state.difficultyIndex < DIFFICULTIES.length - 1;
      ctx.beginPath();
      ctx.moveTo(rightChevronX - chevronSize, chevronY - chevronSize);
      ctx.lineTo(rightChevronX, chevronY);
      ctx.lineTo(rightChevronX - chevronSize, chevronY + chevronSize);
      ctx.strokeStyle = canGoRight
        ? (isDark ? "#c084fc" : "#7c3aed")
        : (isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.15)");
      ctx.lineWidth = 2.5;
      ctx.stroke();

      // Store chevron hitboxes for click detection (generous tap targets)
      const hitPad = 12;
      state.chevronLeftHitbox = {
        x: leftChevronX - hitPad, y: chevronY - chevronSize - hitPad,
        w: chevronSize + hitPad * 2, h: chevronSize * 2 + hitPad * 2,
      };
      state.chevronRightHitbox = {
        x: rightChevronX - chevronSize - hitPad, y: chevronY - chevronSize - hitPad,
        w: chevronSize + hitPad * 2, h: chevronSize * 2 + hitPad * 2,
      };

      // Difficulty text centered in box
      const boxCenterX = boxX + boxW / 2;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = isDark ? "#e2d6f8" : "#2d2d5e";
      ctx.font = "bold 15px system-ui, sans-serif";
      ctx.fillText(DIFFICULTIES[state.difficultyIndex].name, boxCenterX, y);

      ctx.restore();
      return boxX + boxW; // right edge
    };

    const drawActionButton = (x: number, y: number, label: string, isDark: boolean) => {
      const btnW = 130;
      const btnH = 42;
      const btnX = x;
      const btnY = y - btnH / 2;
      const r = 21; // pill shape

      ctx.save();
      // Shadow
      ctx.shadowColor = "rgba(168,85,247,0.5)";
      ctx.shadowBlur = 16;
      ctx.shadowOffsetY = 3;

      // Gradient fill
      const grad = ctx.createLinearGradient(btnX, btnY, btnX + btnW, btnY + btnH);
      grad.addColorStop(0, "#7c3aed");
      grad.addColorStop(0.5, "#a855f7");
      grad.addColorStop(1, "#7c3aed");
      ctx.beginPath();
      ctx.roundRect(btnX, btnY, btnW, btnH, r);
      ctx.fillStyle = grad;
      ctx.fill();

      // Border
      ctx.shadowBlur = 0;
      ctx.shadowOffsetY = 0;
      ctx.beginPath();
      ctx.roundRect(btnX, btnY, btnW, btnH, r);
      ctx.strokeStyle = "rgba(255,255,255,0.3)";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Label
      ctx.fillStyle = "#fff";
      ctx.font = "800 16px system-ui, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.letterSpacing = "2px";
      ctx.fillText(label, btnX + btnW / 2, y);
      ctx.restore();

      // Store hitbox for click detection
      state.buttonHitbox = { x: btnX, y: btnY, w: btnW, h: btnH };
    };

    const loop = (time: number) => {
      const state = gameState.current;
      const { width: w, height: h } = state;

      if (w === 0 || h === 0) {
        state.animId = requestAnimationFrame(loop);
        return;
      }

      const groundCenterY = h - GROUND_OFFSET;
      const cx = w / 2;
      const earthR = ((w / 2) * (w / 2)) / (2 * EARTH_CURVE_DROP) + EARTH_CURVE_DROP / 2;
      const earthCenterY = groundCenterY + earthR;
      const getGroundY = (px: number) => {
        const dx = px - cx;
        const dist = Math.min(Math.abs(dx), earthR);
        return earthCenterY - Math.sqrt(earthR * earthR - dist * dist);
      };
      const playerY = groundCenterY - 40;
      const isDark = colorMode === "dark";
      const diff = DIFFICULTIES[state.difficultyIndex];

      if (state.phase === "playing") {
        // Handle rotation
        if (state.keysDown.has("ArrowLeft")) {
          state.aimAngle = Math.max(state.aimAngle - ROTATION_SPEED, -Math.PI);
        }
        if (state.keysDown.has("ArrowRight")) {
          state.aimAngle = Math.min(state.aimAngle + ROTATION_SPEED, 0);
        }

        // Spawn
        if (
          time - state.lastSpawnTime > SPAWN_INTERVAL &&
          state.pokeballs.length < MAX_POKEBALLS
        ) {
          state.pokeballs.push(spawnPokeball());
          state.lastSpawnTime = time;
        }

        // Fire
        if (time - state.lastShotTime > FIRE_INTERVAL) {
          const isHyperbeam = state.score > 0 && state.score % 10 === 0;
          if (isHyperbeam && !state.beam) {
            state.beam = {
              angle: state.aimAngle,
              startTime: time,
              duration: 1600,
              originX: cx,
              originY: playerY - SPRITE_SIZE / 2,
              startWidth: 20,
              maxWidth: 90,
              firstHit: null,
              textSizeRand: Math.random(),
            };
          } else if (!isHyperbeam) {
            const speed = 5;
            state.projectiles.push({
              x: cx,
              y: playerY - SPRITE_SIZE / 2,
              vx: Math.cos(state.aimAngle) * speed,
              vy: Math.sin(state.aimAngle) * speed,
              radius: 8,
            });
          }
          state.lastShotTime = time;
        }

        // Move pokeballs with behaviors
        for (const pb of state.pokeballs) {
          pb.frameAge++;
          switch (pb.type.behavior) {
            case "straight":
              pb.x += pb.vx;
              pb.y += pb.vy;
              break;
            case "curve":
              pb.x += pb.vx + Math.sin(pb.frameAge * 0.03) * 1.2;
              pb.y += pb.vy;
              break;
            case "zigzag":
              pb.x += pb.vx + (Math.floor(pb.frameAge / 60) % 2 === 0 ? 1.5 : -1.5);
              pb.y += pb.vy;
              break;
            case "accelerate": {
              const mult = Math.pow(1.002, pb.frameAge);
              pb.x += pb.vx * mult;
              pb.y += pb.vy * mult;
              break;
            }
            case "homing": {
              const targetAngle = Math.atan2(playerY - pb.y, cx - pb.x);
              const currentAngle = Math.atan2(pb.vy, pb.vx);
              let angleDiff = targetAngle - currentAngle;
              while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
              while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;
              const maxTurn = (0.5 * Math.PI) / 180;
              const turn = Math.max(-maxTurn, Math.min(maxTurn, angleDiff));
              const newAngle = currentAngle + turn;
              const spd = Math.hypot(pb.vx, pb.vy);
              pb.vx = Math.cos(newAngle) * spd;
              pb.vy = Math.sin(newAngle) * spd;
              pb.x += pb.vx;
              pb.y += pb.vy;
              break;
            }
          }
          pb.rotation += pb.rotationSpeed;
        }

        // Move projectiles
        for (const p of state.projectiles) {
          p.x += p.vx;
          p.y += p.vy;
        }

        // Check if any pokeball crossed the curved ground — lose a life
        const survived: Pokeball[] = [];
        for (const pb of state.pokeballs) {
          if (pb.y + pb.radius > getGroundY(pb.x)) {
            state.lives--;
            if (state.lives <= 0) {
              state.phase = "gameover";
              setPhase("gameover");
              setScore(state.score);
              break;
            }
          } else {
            survived.push(pb);
          }
        }
        if (state.phase !== "gameover") {
          state.pokeballs = survived;

          // Projectile collisions
          const newPokeballs: Pokeball[] = [];
          const hitSet = new Set<Projectile>();

          for (const pb of state.pokeballs) {
            let hit = false;
            for (const p of state.projectiles) {
              if (hitSet.has(p)) continue;
              const d = Math.hypot(pb.x - p.x, pb.y - p.y);
              if (d < pb.radius + p.radius) {
                hit = true;
                hitSet.add(p);
                state.score += 1;
                const count = 10 + Math.floor(Math.random() * 6);
                for (let i = 0; i < count; i++) {
                  const angle = Math.random() * Math.PI * 2;
                  const spd = 1 + Math.random() * 3;
                  state.particles.push({
                    x: pb.x, y: pb.y,
                    vx: Math.cos(angle) * spd,
                    vy: Math.sin(angle) * spd,
                    life: 1,
                    decay: 0.015 + Math.random() * 0.02,
                    color: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
                  });
                }
                break;
              }
            }
            if (!hit) newPokeballs.push(pb);
          }

          state.pokeballs = newPokeballs;
          state.projectiles = state.projectiles.filter(
            (p) => !hitSet.has(p) && p.x > -50 && p.x < w + 50 && p.y > -50 && p.y < h + 50
          );

          // Beam collisions — destroy anything within beam width
          if (state.beam) {
            const b = state.beam;
            const elapsed = time - b.startTime;
            if (elapsed > b.duration) {
              state.beam = null;
            } else {
              // Beam follows current aim angle in real-time
              const liveAngle = state.aimAngle;
              const cosA = Math.cos(liveAngle);
              const sinA = Math.sin(liveAngle);
              const growProgress = Math.min(elapsed / (b.duration * 0.5), 1);
              const timeMaxW = b.startWidth + (b.maxWidth - b.startWidth) * growProgress;
              const beamReach = Math.max(w, h) * 1.5;
              const afterBeam: Pokeball[] = [];
              for (const pb of state.pokeballs) {
                const dx = pb.x - b.originX;
                const dy = pb.y - b.originY;
                const along = dx * cosA + dy * sinA;
                const perp = Math.abs(-dx * sinA + dy * cosA);
                // Tapered width: narrow at origin, wide at distance
                const distFrac = Math.min(along / beamReach, 1);
                const widthAtDist = b.startWidth * 0.5 + timeMaxW * distFrac;
                if (along > 0 && perp < widthAtDist / 2 + pb.radius) {
                  // Hit by beam — record first impact
                  if (!b.firstHit) {
                    b.firstHit = { x: pb.x, y: pb.y };
                  }
                  state.score += 1;
                  const count = 18;
                  for (let i = 0; i < count; i++) {
                    const angle = Math.random() * Math.PI * 2;
                    const spd = 1 + Math.random() * 5;
                    state.particles.push({
                      x: pb.x, y: pb.y,
                      vx: Math.cos(angle) * spd,
                      vy: Math.sin(angle) * spd,
                      life: 1,
                      decay: 0.015 + Math.random() * 0.02,
                      color: ["#facc15", "#ff8c00", "#fff", "#fbbf24"][Math.floor(Math.random() * 4)],
                    });
                  }
                } else {
                  afterBeam.push(pb);
                }
              }
              state.pokeballs = afterBeam;
            }
          }

          // Filter pokeballs: count avoided if they exit
          const kept: Pokeball[] = [];
          for (const pb of state.pokeballs) {
            if (pb.x < -100 || pb.x > w + 100 || pb.y < -100 || pb.y > h + 100) {
              if (pb.y + pb.radius <= getGroundY(pb.x)) {
                state.avoided++;
              }
            } else {
              kept.push(pb);
            }
          }
          state.pokeballs = kept;
        }
      }

      // Move & cleanup particles (always, so they fade out on gameover too)
      for (const p of state.particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= p.decay;
        p.vx *= 0.98;
        p.vy *= 0.98;
      }
      state.particles = state.particles.filter((p) => p.life > 0);

      // === RENDER ===
      ctx.clearRect(0, 0, w, h);

      // Stars
      for (const star of state.stars) {
        const sx = star.x * w;
        const sy = star.y * h;
        if (sy < getGroundY(sx) - 5) {
          ctx.beginPath();
          ctx.arc(sx, sy, star.size, 0, Math.PI * 2);
          const alpha = star.brightness * (isDark ? 0.8 : 0.25);
          ctx.fillStyle = `rgba(255,255,255,${alpha})`;
          ctx.fill();
        }
      }

      // Earth curve
      ctx.save();
      ctx.beginPath();
      const arcStartAngle = Math.asin(Math.min((w / 2) / earthR, 1));
      ctx.arc(cx, earthCenterY, earthR, -Math.PI / 2 - arcStartAngle, -Math.PI / 2 + arcStartAngle);
      ctx.lineTo(w, h);
      ctx.lineTo(0, h);
      ctx.closePath();

      if (isDark) {
        const earthGrad = ctx.createLinearGradient(0, groundCenterY - 10, 0, h);
        earthGrad.addColorStop(0, "#1a2744");
        earthGrad.addColorStop(0.4, "#0f1a2e");
        earthGrad.addColorStop(1, "#0a1020");
        ctx.fillStyle = earthGrad;
      } else {
        const earthGrad = ctx.createLinearGradient(0, groundCenterY - 10, 0, h);
        earthGrad.addColorStop(0, "#c8dae8");
        earthGrad.addColorStop(0.4, "#a8c0d8");
        earthGrad.addColorStop(1, "#88a8c0");
        ctx.fillStyle = earthGrad;
      }
      ctx.fill();

      ctx.beginPath();
      ctx.arc(cx, earthCenterY, earthR, -Math.PI / 2 - arcStartAngle, -Math.PI / 2 + arcStartAngle);
      ctx.strokeStyle = isDark
        ? "rgba(100,160,255,0.35)"
        : "rgba(80,140,220,0.25)";
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(cx, earthCenterY, earthR, -Math.PI / 2 - arcStartAngle, -Math.PI / 2 + arcStartAngle);
      ctx.strokeStyle = isDark
        ? "rgba(140,200,255,0.5)"
        : "rgba(100,160,230,0.4)";
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.restore();

      // Pokeballs
      for (const pb of state.pokeballs) {
        const img = state.pokeballImages[pb.type.sprite];
        if (img && img.complete && img.naturalWidth > 0) {
          ctx.save();
          ctx.translate(pb.x, pb.y);
          ctx.rotate(pb.rotation);
          ctx.drawImage(img, -pb.drawSize / 2, -pb.drawSize / 2, pb.drawSize, pb.drawSize);
          ctx.restore();
        } else {
          ctx.beginPath();
          ctx.arc(pb.x, pb.y, pb.radius, 0, Math.PI * 2);
          ctx.fillStyle = pb.type.color;
          ctx.fill();
        }
      }

      // Aim dotted line (only when playing)
      if (state.phase === "playing") {
        const dotColor = isDark ? "rgba(168,85,247,0.5)" : "rgba(120,50,200,0.5)";
        ctx.save();
        ctx.strokeStyle = dotColor;
        ctx.lineWidth = 2;
        ctx.setLineDash([6, 8]);
        ctx.beginPath();
        ctx.moveTo(cx, playerY - SPRITE_SIZE / 2);
        ctx.lineTo(
          cx + Math.cos(state.aimAngle) * diff.aimLength,
          playerY - SPRITE_SIZE / 2 + Math.sin(state.aimAngle) * diff.aimLength
        );
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.restore();
      }

      // Hyperbeam rendering
      if (state.beam && state.phase === "playing") {
        const b = state.beam;
        const elapsed = time - b.startTime;
        const progress = Math.min(elapsed / b.duration, 1);
        const alpha = progress < 0.7 ? 1 : 1 - (progress - 0.7) / 0.3;
        const beamLen = Math.max(w, h) * 1.5;
        const growProgress = Math.min(elapsed / (b.duration * 0.5), 1);
        const farW = b.startWidth + (b.maxWidth - b.startWidth) * growProgress;
        // Narrow at origin, wide at far end
        const originHalfW = b.startWidth * 0.3;
        const farHalfW = farW / 2;

        // Follow live aim angle
        const liveAngle = state.aimAngle;

        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.translate(b.originX, b.originY);
        ctx.rotate(liveAngle);

        // Outer glow — tapered
        const outerGrad = ctx.createLinearGradient(0, 0, beamLen, 0);
        outerGrad.addColorStop(0, "rgba(255, 200, 50, 0.5)");
        outerGrad.addColorStop(0.4, "rgba(255, 120, 30, 0.3)");
        outerGrad.addColorStop(1, "rgba(255, 120, 30, 0)");
        ctx.fillStyle = outerGrad;
        ctx.beginPath();
        ctx.moveTo(0, -originHalfW * 2);
        ctx.lineTo(beamLen, -farHalfW * 1.5);
        ctx.lineTo(beamLen, farHalfW * 1.5);
        ctx.lineTo(0, originHalfW * 2);
        ctx.closePath();
        ctx.fill();

        // Main beam body — tapers from narrow origin to wide end
        // Use a path that widens along the length
        ctx.beginPath();
        ctx.moveTo(0, -originHalfW);
        ctx.lineTo(beamLen, -farHalfW);
        ctx.lineTo(beamLen, farHalfW);
        ctx.lineTo(0, originHalfW);
        ctx.closePath();
        // Vertical gradient at the wide end for the hot-center look
        const mainGrad = ctx.createLinearGradient(0, -farHalfW, 0, farHalfW);
        mainGrad.addColorStop(0, "rgba(255, 160, 30, 0.5)");
        mainGrad.addColorStop(0.25, "rgba(255, 240, 180, 0.9)");
        mainGrad.addColorStop(0.5, "rgba(255, 255, 255, 1)");
        mainGrad.addColorStop(0.75, "rgba(255, 240, 180, 0.9)");
        mainGrad.addColorStop(1, "rgba(255, 160, 30, 0.5)");
        ctx.fillStyle = mainGrad;
        ctx.fill();

        // Hot white core — also tapered
        ctx.beginPath();
        ctx.moveTo(0, -originHalfW * 0.3);
        ctx.lineTo(beamLen, -farHalfW * 0.3);
        ctx.lineTo(beamLen, farHalfW * 0.3);
        ctx.lineTo(0, originHalfW * 0.3);
        ctx.closePath();
        ctx.fillStyle = "rgba(255, 255, 240, 0.9)";
        ctx.shadowColor = "rgba(255, 255, 200, 0.8)";
        ctx.shadowBlur = 15;
        ctx.fill();

        // Energy flicker particles along the beam
        ctx.shadowBlur = 0;
        const flickerCount = 6;
        for (let i = 0; i < flickerCount; i++) {
          const t = Math.random();
          const fx = t * beamLen * 0.8;
          const localHalfW = originHalfW + (farHalfW - originHalfW) * t;
          const fy = (Math.random() - 0.5) * localHalfW * 1.2;
          const fr = 2 + Math.random() * 4;
          ctx.beginPath();
          ctx.arc(fx, fy, fr, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${0.4 + Math.random() * 0.4})`;
          ctx.fill();
        }

        ctx.restore();

        // ハイパービーム impact typography — appears at first hit location
        if (b.firstHit) {
          const hitElapsed = time - b.startTime;
          const hitProgress = Math.min(hitElapsed / b.duration, 1);
          const textAlpha = hitProgress < 0.1
            ? hitProgress / 0.1
            : hitProgress < 0.6 ? 1
            : 1 - (hitProgress - 0.6) / 0.4;

          ctx.save();
          ctx.globalAlpha = textAlpha;

          const kana = "ハイパービーム";
          // Random size: base 80, range 60–100
          const baseSize = Math.min(w * 0.12, 80);
          const impactSize = baseSize * (0.75 + b.textSizeRand * 0.5);

          // Position along the line from origin toward the hit, ~40% of the way
          // then clamp to keep visible on screen
          const dx = b.firstHit.x - b.originX;
          const dy = b.firstHit.y - b.originY;
          const margin = impactSize * 2.5;
          let textCx = b.originX + dx * 0.4;
          let textCy = b.originY + dy * 0.4 - impactSize * 0.6;
          textCx = Math.max(margin, Math.min(w - margin, textCx));
          textCy = Math.max(impactSize, Math.min(h - impactSize, textCy));
          const tiltAngle = -15 * Math.PI / 180;

          ctx.translate(textCx, textCy);
          ctx.rotate(tiltAngle);

          const slamScale = hitProgress < 0.08 ? 1.3 - 0.3 * (hitProgress / 0.08) : 1;
          ctx.scale(slamScale, slamScale);

          ctx.font = `900 ${impactSize}px "Hiragino Kaku Gothic ProN", "Yu Gothic", "Noto Sans JP", sans-serif`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.lineJoin = "round";

          // Speed lines behind text
          const lineCount = 8;
          for (let i = 0; i < lineCount; i++) {
            const ly = -impactSize * 0.8 + (i / lineCount) * impactSize * 1.6;
            const lAlpha = 0.15 + Math.random() * 0.15;
            const lLen = 80 + Math.random() * 160;
            ctx.strokeStyle = `rgba(199, 125, 255, ${lAlpha})`;
            ctx.lineWidth = 1.5 + Math.random() * 2;
            ctx.beginPath();
            ctx.moveTo(-impactSize * 2.5 - lLen, ly + (Math.random() - 0.5) * 8);
            ctx.lineTo(impactSize * 2.5, ly + (Math.random() - 0.5) * 4);
            ctx.stroke();
          }

          // Draw each character with staggered baseline
          const chars = kana.split("");
          ctx.font = `900 ${impactSize}px "Hiragino Kaku Gothic ProN", "Yu Gothic", "Noto Sans JP", sans-serif`;
          const charWidths = chars.map(ch => ctx.measureText(ch).width);
          const totalTextW = charWidths.reduce((a, b) => a + b, 0);
          let curX = -totalTextW / 2;

          for (let i = 0; i < chars.length; i++) {
            const ch = chars[i];
            const chCx = curX + charWidths[i] / 2;
            const yOff = (i % 2 === 0 ? -1 : 1) * (3 + Math.sin(i * 1.7) * 4);
            const charScale = 1 + Math.sin(i * 2.1 + hitProgress * 6) * 0.04;
            ctx.save();
            ctx.translate(chCx, yOff);
            ctx.scale(charScale, charScale);

            ctx.strokeStyle = "#1A0033";
            ctx.lineWidth = impactSize * 0.14 + Math.sin(i * 1.3) * 2;
            ctx.strokeText(ch, 0, 0);

            const grad = ctx.createLinearGradient(
              -impactSize * 0.4, -impactSize * 0.4,
              impactSize * 0.4, impactSize * 0.4
            );
            grad.addColorStop(0, "#4B0082");
            grad.addColorStop(0.5, "#8A2BE2");
            grad.addColorStop(1, "#4B0082");
            ctx.fillStyle = grad;

            ctx.shadowColor = "rgba(138, 43, 226, 0.7)";
            ctx.shadowBlur = 25;
            ctx.fillText(ch, 0, 0);

            ctx.shadowBlur = 0;
            ctx.strokeStyle = "rgba(199, 125, 255, 0.6)";
            ctx.lineWidth = 2;
            ctx.strokeText(ch, 0, -1);

            ctx.strokeStyle = "rgba(255, 255, 255, 0.35)";
            ctx.lineWidth = 1;
            ctx.strokeText(ch, 0, -2);

            ctx.restore();
            curX += charWidths[i];
          }

          ctx.restore();
        }
      }

      // Projectiles
      for (const p of state.projectiles) {
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 2);
        grad.addColorStop(0, "rgba(168, 85, 247, 1)");
        grad.addColorStop(0.4, "rgba(168, 85, 247, 0.6)");
        grad.addColorStop(1, "rgba(168, 85, 247, 0)");
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 2, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = "#e9d5ff";
        ctx.fill();
      }

      // Particles
      for (const p of state.particles) {
        ctx.globalAlpha = p.life;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2 + p.life * 3, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      // Sprite — sits on the curved ground
      const sprite = state.spriteImage;
      if (sprite && sprite.complete && sprite.naturalWidth > 0) {
        const facingLeft = state.aimAngle < -Math.PI / 2;
        ctx.save();
        ctx.translate(cx, groundCenterY - SPRITE_SIZE - 40);
        if (facingLeft) {
          ctx.scale(-1, 1);
        }
        ctx.drawImage(sprite, -SPRITE_SIZE / 2, 0, SPRITE_SIZE, SPRITE_SIZE);
        ctx.restore();
      }

      // Snorlax — chilling on the left side of the Earth curve
      const snorlaxImg = state.snorlaxImage;
      if (snorlaxImg && snorlaxImg.complete && snorlaxImg.naturalWidth > 0) {
        const snSize = 100;
        const snX = w * 0.05;
        const snGroundY = getGroundY(snX + snSize / 2);
        ctx.drawImage(snorlaxImg, snX, snGroundY - snSize * 0.3, snSize, snSize);
      }

      // Score display + pause button during playing/paused
      if (state.phase === "playing" || state.phase === "paused") {
        ctx.save();
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = isDark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.55)";
        ctx.font = "bold 18px system-ui, sans-serif";

        // Measure score text to position pause icon to its left
        const scoreText = `Score: ${state.score}`;
        const scoreW = ctx.measureText(scoreText).width;
        ctx.fillText(scoreText, cx, groundCenterY + 22);

        // Pause button — rounded rect with two vertical bars
        const pauseBtnSize = 32;
        const pauseBtnX = cx - scoreW / 2 - pauseBtnSize - 14;
        const pauseBtnY = groundCenterY + 22 - pauseBtnSize / 2;
        const hitboxPad = 4;
        state.pauseHitbox = {
          x: pauseBtnX - hitboxPad, y: pauseBtnY - hitboxPad,
          w: pauseBtnSize + hitboxPad * 2, h: pauseBtnSize + hitboxPad * 2,
        };
        const isHovering = state.phase === "playing" && hitTest(state.mouseX, state.mouseY, state.pauseHitbox);

        ctx.save();
        // Background circle
        ctx.beginPath();
        ctx.arc(pauseBtnX + pauseBtnSize / 2, pauseBtnY + pauseBtnSize / 2, pauseBtnSize / 2, 0, Math.PI * 2);
        ctx.fillStyle = isHovering
          ? (isDark ? "rgba(168,85,247,0.4)" : "rgba(120,50,200,0.25)")
          : (isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)");
        ctx.fill();
        if (isHovering) {
          ctx.strokeStyle = isDark ? "rgba(168,85,247,0.6)" : "rgba(120,50,200,0.4)";
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }

        // Two bars
        const barW = 5;
        const barH = 16;
        const barGap = 6;
        const barCx = pauseBtnX + pauseBtnSize / 2;
        const barCy = pauseBtnY + pauseBtnSize / 2;
        ctx.fillStyle = isHovering
          ? (isDark ? "#c084fc" : "#7c3aed")
          : (isDark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.5)");
        ctx.fillRect(barCx - barGap / 2 - barW, barCy - barH / 2, barW, barH);
        ctx.fillRect(barCx + barGap / 2, barCy - barH / 2, barW, barH);
        ctx.restore();

        // Lives — pokemon center icons
        const pcImg = state.pokemonCenterImage;
        if (pcImg && pcImg.complete && pcImg.naturalWidth > 0) {
          const iconSize = 64;
          const iconGap = 10;
          const totalLivesW = state.lives * iconSize + (state.lives - 1) * iconGap;
          const livesStartX = cx - totalLivesW / 2;
          for (let i = 0; i < state.lives; i++) {
            ctx.drawImage(pcImg, livesStartX + i * (iconSize + iconGap), groundCenterY + 44, iconSize, iconSize);
          }
        }

        ctx.restore();
      }

      // === OVERLAYS ===
      state.buttonHitbox = null;
      state.chevronLeftHitbox = null;
      state.chevronRightHitbox = null;
      state.resumeHitbox = null;

      // Pause overlay
      if (state.phase === "paused") {
        ctx.fillStyle = isDark ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.5)";
        ctx.fillRect(0, 0, w, h);

        const pauseFontSize = Math.min(w * 0.1, 64);
        drawPokemonGoText("PAUSED", cx, h * 0.38, pauseFontSize, isDark);

        // Resume button
        const btnW = 150;
        const btnH = 44;
        const btnX = cx - btnW / 2;
        const btnY = h * 0.52;
        const btnR = 22;

        ctx.save();
        ctx.shadowColor = "rgba(168,85,247,0.5)";
        ctx.shadowBlur = 16;
        ctx.shadowOffsetY = 3;
        const grad = ctx.createLinearGradient(btnX, btnY, btnX + btnW, btnY + btnH);
        grad.addColorStop(0, "#7c3aed");
        grad.addColorStop(0.5, "#a855f7");
        grad.addColorStop(1, "#7c3aed");
        ctx.beginPath();
        ctx.roundRect(btnX, btnY, btnW, btnH, btnR);
        ctx.fillStyle = grad;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.shadowOffsetY = 0;
        ctx.beginPath();
        ctx.roundRect(btnX, btnY, btnW, btnH, btnR);
        ctx.strokeStyle = "rgba(255,255,255,0.3)";
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.fillStyle = "#fff";
        ctx.font = "800 16px system-ui, sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("RESUME", cx, btnY + btnH / 2);
        ctx.restore();

        state.resumeHitbox = { x: btnX, y: btnY, w: btnW, h: btnH };
      }

      if (state.phase === "start" || state.phase === "gameover") {
        // Dim overlay
        ctx.fillStyle = isDark ? "rgba(0,0,0,0.6)" : "rgba(255,255,255,0.6)";
        ctx.fillRect(0, 0, w, h);

        if (state.phase === "start") {
          // Title
          const fontSize = Math.min(w * 0.08, 52);
          drawPokemonGoText("POKEBALL GAME", cx, h * 0.12, fontSize, isDark);

          // Subheading
          const pokemon = isDark ? "Mewtwo" : "Mew";
          ctx.fillStyle = isDark ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.7)";
          ctx.font = "500 18px system-ui, sans-serif";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(`Help ${pokemon} defend Pokopia from humans`, cx, h * 0.12 + fontSize * 0.8);

          // Pokeball guide
          const guideY = h * 0.27;
          drawPokeballGuide(cx, guideY, isDark);

          // Bottom row: difficulty (left) + START button (right)
          const guideRows = Math.ceil(POKEBALL_TYPES.length / 2);
          const rowY = guideY + guideRows * 26 + 80;
          const totalRowW = 180 + 16 + 130; // diffBox + gap + button
          const rowStartX = cx - totalRowW / 2;
          const diffRight = drawDifficultySelector(rowStartX, rowY, isDark);
          drawActionButton(diffRight + 16, rowY, "START", isDark);
        } else {
          // Game Over
          const fontSize = Math.min(w * 0.12, 72);
          drawPokemonGoText("Game Over", cx, h * 0.08, fontSize, isDark);

          // Last score — label + large value
          const labelY = h * 0.08 + fontSize * 0.9 + 20;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillStyle = isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)";
          ctx.font = `700 ${Math.min(w * 0.03, 16)}px system-ui, sans-serif`;
          ctx.letterSpacing = "3px";
          ctx.fillText("LAST SCORE", cx, labelY);
          ctx.letterSpacing = "0px";

          const valueY = labelY + 40;
          ctx.fillStyle = isDark ? "#e2d6f8" : "#2d2d5e";
          ctx.font = `800 ${Math.min(w * 0.09, 52)}px system-ui, sans-serif`;
          ctx.fillText(`${state.score}`, cx, valueY);

          // Pokeball guide (2-col)
          const guideStartY = valueY + 60;
          drawPokeballGuide(cx, guideStartY, isDark);

          // Bottom row: difficulty (left) + RESTART button (right)
          const guideRows = Math.ceil(POKEBALL_TYPES.length / 2);
          const rowY = guideStartY + guideRows * 26 + 50;
          const totalRowW = 180 + 16 + 130;
          const rowStartX = cx - totalRowW / 2;
          const diffRight = drawDifficultySelector(rowStartX, rowY, isDark);
          drawActionButton(diffRight + 16, rowY, "RESTART", isDark);
        }
      }

      state.animId = requestAnimationFrame(loop);
    };

    state.animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(state.animId);
      observer.disconnect();
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      canvas.removeEventListener("click", onCanvasClick);
      canvas.removeEventListener("mousemove", onMouseMove);
    };
  }, [colorMode, phase]);

  return (
    <div
      ref={containerRef}
      tabIndex={0}
      style={{
        width: "100%",
        height: "100%",
        minHeight: 300,
        outline: "none",
        position: "relative",
      }}
    >
      <canvas ref={canvasRef} style={{ display: "block", cursor: phase !== "playing" ? "pointer" : "default" }} />
    </div>
  );
}
