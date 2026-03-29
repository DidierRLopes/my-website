import React, { useRef, useEffect } from "react";

const CANVAS_W = 700;
const CANVAS_H = 300;

// Star field — generated once
function makeStars(count: number) {
  const stars: { x: number; y: number; r: number; a: number }[] = [];
  for (let i = 0; i < count; i++) {
    stars.push({
      x: Math.random() * CANVAS_W,
      y: Math.random() * CANVAS_H,
      r: Math.random() * 1.2 + 0.3,
      a: Math.random() * 0.4 + 0.1,
    });
  }
  return stars;
}

const STARS = makeStars(60);


interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  color: string;
}

interface Pokeball {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  speed: number;
  rotation: number;
  rotationSpeed: number;
  active: boolean;
}

export default function DamageFlash() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef({
    bodyImg: null as HTMLImageElement | null,
    armImg: null as HTMLImageElement | null,
    ballImg: null as HTMLImageElement | null,
    imagesLoaded: 0,
    animId: 0,
    // Flash state
    flashActive: false,
    flashStart: 0,
    flashDuration: 500,
    // Pokeball state
    pokeball: null as Pokeball | null,
    spawnDelay: 800,
    lastEffectEnd: 0,
    // Explosion particles
    particles: [] as Particle[],
  });

  // Load images
  useEffect(() => {
    const state = stateRef.current;

    const body = new Image();
    body.src = "/img/mewtwo.png";
    body.onload = () => { state.imagesLoaded++; };
    state.bodyImg = body;

    const arm = new Image();
    arm.src = "/img/mewtwo_arm.png";
    arm.onload = () => { state.imagesLoaded++; };
    state.armImg = arm;

    const ball = new Image();
    ball.src = "/img/pokeballs/pokeball.png";
    ball.onload = () => { state.imagesLoaded++; };
    state.ballImg = ball;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const state = stateRef.current;

    // Offscreen canvas for silhouette masking
    const offscreen = document.createElement("canvas");
    offscreen.width = CANVAS_W;
    offscreen.height = CANVAS_H;
    const offCtx = offscreen.getContext("2d")!;

    const SPRITE_SIZE = 130;
    const spriteX = CANVAS_W / 2 - SPRITE_SIZE / 2;
    const spriteY = CANVAS_H / 2 - SPRITE_SIZE / 2 - 10;
    const mewtwoCenterX = spriteX + SPRITE_SIZE / 2;
    const mewtwoCenterY = spriteY + SPRITE_SIZE / 2;

    function spawnPokeball() {
      // Pick a random direction from outside the canvas
      const angle = Math.random() * Math.PI * 2;
      const dist = 380;
      const startX = mewtwoCenterX + Math.cos(angle) * dist;
      const startY = mewtwoCenterY + Math.sin(angle) * dist;

      state.pokeball = {
        x: startX,
        y: startY,
        targetX: mewtwoCenterX,
        targetY: mewtwoCenterY,
        speed: 3.5,
        rotation: 0,
        rotationSpeed: (Math.random() - 0.5) * 0.3,
        active: true,
      };
    }

    function spawnExplosion(x: number, y: number) {
      const colors = ["#ff4444", "#ff8844", "#ffcc44", "#ffffff", "#ff6666"];
      for (let i = 0; i < 18; i++) {
        const angle = (Math.PI * 2 * i) / 18 + (Math.random() - 0.5) * 0.4;
        const speed = 1.5 + Math.random() * 3;
        state.particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1,
          maxLife: 0.4 + Math.random() * 0.3,
          size: 2 + Math.random() * 3,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    }

    function triggerFlash() {
      state.flashActive = true;
      state.flashStart = performance.now();
    }

    function drawStars(c: CanvasRenderingContext2D) {
      for (const s of STARS) {
        c.beginPath();
        c.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        c.fillStyle = `rgba(255,255,255,${s.a})`;
        c.fill();
      }
    }

    function drawEarthCurve(c: CanvasRenderingContext2D) {
      c.save();
      const gradient = c.createRadialGradient(
        CANVAS_W / 2, CANVAS_H + 320, 10,
        CANVAS_W / 2, CANVAS_H + 320, 380,
      );
      gradient.addColorStop(0, "rgba(30, 80, 180, 0.25)");
      gradient.addColorStop(0.5, "rgba(20, 60, 140, 0.12)");
      gradient.addColorStop(1, "rgba(10, 10, 26, 0)");
      c.fillStyle = gradient;
      c.beginPath();
      c.arc(CANVAS_W / 2, CANVAS_H + 320, 380, 0, Math.PI * 2);
      c.fill();
      // Thin atmosphere line
      c.strokeStyle = "rgba(100, 180, 255, 0.15)";
      c.lineWidth = 1.5;
      c.beginPath();
      c.arc(CANVAS_W / 2, CANVAS_H + 320, 375, Math.PI + 0.6, Math.PI * 2 - 0.6);
      c.stroke();
      c.restore();
    }

    function drawMewtwo(c: CanvasRenderingContext2D) {
      if (state.imagesLoaded < 3) return;
      // Body
      c.drawImage(state.bodyImg!, spriteX, spriteY, SPRITE_SIZE, SPRITE_SIZE);
      // Arm at correct pivot (matching DefenderPreview/MilestonePowers)
      const armSize = SPRITE_SIZE * 0.5;
      const pivotX = mewtwoCenterX + 0.024 * SPRITE_SIZE;
      const pivotY = spriteY + 0.38 * SPRITE_SIZE;
      const armRotation = -Math.PI - Math.PI - 0.2; // pointing left
      c.save();
      c.translate(pivotX, pivotY);
      c.rotate(armRotation);
      c.drawImage(state.armImg!, -armSize / 2, -armSize / 2, armSize, armSize);
      c.restore();
    }

    function drawPokeball(c: CanvasRenderingContext2D) {
      const pb = state.pokeball;
      if (!pb || !pb.active || !state.ballImg) return;
      const size = 28;
      c.save();
      c.translate(pb.x, pb.y);
      c.rotate(pb.rotation);
      c.drawImage(state.ballImg, -size / 2, -size / 2, size, size);
      c.restore();
    }

    function updateParticles(dt: number) {
      for (let i = state.particles.length - 1; i >= 0; i--) {
        const p = state.particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.96;
        p.vy *= 0.96;
        p.life -= dt / (p.maxLife * 1000);
        if (p.life <= 0) {
          state.particles.splice(i, 1);
        }
      }
    }

    function drawParticles(c: CanvasRenderingContext2D) {
      for (const p of state.particles) {
        const alpha = Math.max(0, p.life);
        c.beginPath();
        c.arc(p.x, p.y, p.size * alpha, 0, Math.PI * 2);
        c.fillStyle = p.color.replace(")", `, ${alpha})`).replace("rgb", "rgba");
        // Simpler: just use globalAlpha
        c.globalAlpha = alpha;
        c.fillStyle = p.color;
        c.fill();
        c.globalAlpha = 1;
      }
    }

    // Spawn first pokeball after a short delay
    let startTime = performance.now();
    state.lastEffectEnd = startTime;

    let lastTime = performance.now();

    function draw() {
      const now = performance.now();
      const dt = now - lastTime;
      lastTime = now;

      ctx!.clearRect(0, 0, CANVAS_W, CANVAS_H);

      // Background
      ctx!.fillStyle = "#0a0a1a";
      ctx!.fillRect(0, 0, CANVAS_W, CANVAS_H);
      drawStars(ctx!);
      drawEarthCurve(ctx!);

      // --- Pokeball logic ---
      if (!state.pokeball && !state.flashActive) {
        // Spawn after delay
        if (now - state.lastEffectEnd > state.spawnDelay) {
          spawnPokeball();
        }
      }

      if (state.pokeball && state.pokeball.active) {
        const pb = state.pokeball;
        // Move toward Mewtwo
        const dx = pb.targetX - pb.x;
        const dy = pb.targetY - pb.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 12) {
          // Hit! Explode and trigger flash
          pb.active = false;
          spawnExplosion(pb.x, pb.y);
          triggerFlash();
          state.pokeball = null;
        } else {
          pb.x += (dx / dist) * pb.speed;
          pb.y += (dy / dist) * pb.speed;
          pb.rotation += pb.rotationSpeed;
          // Accelerate slightly as it gets closer
          pb.speed = Math.min(pb.speed + 0.02, 6);
        }
      }

      // Update particles
      updateParticles(dt);

      // Flash progress
      let flashT = 0;
      if (state.flashActive) {
        flashT = (now - state.flashStart) / state.flashDuration;
        if (flashT >= 1) {
          flashT = 0;
          state.flashActive = false;
          state.lastEffectEnd = now;
        }
      }

      // Draw Mewtwo
      if (state.imagesLoaded >= 3) {
        drawMewtwo(ctx!);
      }

      // Draw pokeball (behind flash but in front of Mewtwo for visibility)
      drawPokeball(ctx!);

      // Draw explosion particles
      drawParticles(ctx!);

      // Damage flash overlay
      if (flashT > 0 && state.imagesLoaded >= 3) {
        // Intensity: flash in fast then fade out
        const intensity =
          flashT < 0.12
            ? flashT / 0.12
            : 1 - (flashT - 0.12) / 0.88;
        const alpha = Math.max(0, Math.min(1, intensity * 0.7));

        // Scan line sweep position (0 to SPRITE_SIZE over the flash)
        const scanY = flashT * (SPRITE_SIZE + 40) - 20;
        const scanWidth = 30;

        {
          // Silhouette masked mode
          offCtx.clearRect(0, 0, CANVAS_W, CANVAS_H);

          // Step 1: Draw Mewtwo (body + arm) to establish the silhouette mask
          offCtx.globalCompositeOperation = "source-over";
          offCtx.drawImage(state.bodyImg!, spriteX, spriteY, SPRITE_SIZE, SPRITE_SIZE);
          // Arm at correct pivot
          const armSz = SPRITE_SIZE * 0.5;
          const pvX = mewtwoCenterX + 0.024 * SPRITE_SIZE;
          const pvY = spriteY + 0.38 * SPRITE_SIZE;
          const armRot = -Math.PI - Math.PI - 0.2;
          offCtx.save();
          offCtx.translate(pvX, pvY);
          offCtx.rotate(armRot);
          offCtx.drawImage(state.armImg!, -armSz / 2, -armSz / 2, armSz, armSz);
          offCtx.restore();

          // Step 2: Draw red overlay using source-atop — only fills existing pixels
          offCtx.globalCompositeOperation = "source-atop";

          // Red tint
          offCtx.fillStyle = `rgba(255, 40, 40, ${alpha * 0.55})`;
          offCtx.fillRect(spriteX, spriteY, SPRITE_SIZE, SPRITE_SIZE);

          // Scan lines
          for (
            let ly = spriteY + scanY - scanWidth;
            ly < spriteY + scanY;
            ly += 3
          ) {
            const lineAlpha =
              alpha *
              0.6 *
              (1 - Math.abs(ly - (spriteY + scanY - scanWidth / 2)) / (scanWidth / 2));
            if (lineAlpha > 0) {
              offCtx.fillStyle = `rgba(255, 100, 100, ${Math.max(0, lineAlpha)})`;
              offCtx.fillRect(spriteX - 10, ly, SPRITE_SIZE + 20, 1.5);
            }
          }

          // Bright edge highlight
          offCtx.fillStyle = `rgba(255, 200, 200, ${alpha * 0.15})`;
          offCtx.fillRect(spriteX, spriteY, SPRITE_SIZE, SPRITE_SIZE);

          offCtx.globalCompositeOperation = "source-over";

          // Composite onto main canvas
          ctx!.drawImage(offscreen, 0, 0);
        }
      }

      // Bottom label
      ctx!.font = "11px monospace";
      ctx!.fillStyle = "#666";
      ctx!.textAlign = "center";
      ctx!.fillText(
        "Silhouette masking \u2014 red flash only on Mewtwo\u2019s actual pixels",
        CANVAS_W / 2,
        CANVAS_H - 12,
      );

      state.animId = requestAnimationFrame(draw);
    }

    state.animId = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(state.animId);
    };
  }, []);

  return (
    <div style={{ margin: "1.5em 0" }}>
      <canvas
        ref={canvasRef}
        width={CANVAS_W}
        height={CANVAS_H}
        style={{
          width: "100%",
          maxWidth: CANVAS_W,
          display: "block",
          margin: "0 auto",
          borderRadius: 8,
          border: "1px solid #333",
        }}
      />
    </div>
  );
}
