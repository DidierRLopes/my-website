import React, { useRef, useEffect, useState } from "react";

interface Ball {
  name: string;
  sprite: string;
  behavior: string;
  color: string;
  description: string;
  behaviorDetail: string;
  weight: number;
  speed: number;
}

const BALLS: Ball[] = [
  { name: "Poke Ball", sprite: "/img/pokeballs/pokeball.png", behavior: "straight", color: "#ef4444", description: "Slow and steady", behaviorDetail: "Falls straight down at a constant speed (0.5x). The most common ball type.", weight: 30, speed: 0.5 },
  { name: "Great Ball", sprite: "/img/pokeballs/greatball.png", behavior: "curve", color: "#3b82f6", description: "Slight curve", behaviorDetail: "Drifts with a gentle sinusoidal curve as it falls, making it harder to predict.", weight: 25, speed: 0.7 },
  { name: "Ultra Ball", sprite: "/img/pokeballs/ultraball.png", behavior: "zigzag", color: "#facc15", description: "Zigzag pattern", behaviorDetail: "Snaps side-to-side in a sharp zigzag pattern while descending.", weight: 20, speed: 1.0 },
  { name: "Quick Ball", sprite: "/img/pokeballs/quickball.png", behavior: "straight", color: "#22d3ee", description: "Very fast", behaviorDetail: "Falls straight down but at 1.8x speed. Gives you very little time to react.", weight: 10, speed: 1.8 },
  { name: "Timer Ball", sprite: "/img/pokeballs/timerball.png", behavior: "accelerate", color: "#f97316", description: "Starts slow, accelerates", behaviorDetail: "Begins falling slowly (0.3x) then continuously accelerates, catching you off guard.", weight: 10, speed: 0.3 },
  { name: "Master Ball", sprite: "/img/pokeballs/masterball.png", behavior: "homing", color: "#a855f7", description: "Tracks center target", behaviorDetail: "Homes in toward the center of the screen. Adjusts trajectory to follow its target.", weight: 5, speed: 0.9 },
];

export default function PokeballShowcase() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedType, setSelectedType] = useState<number | null>(null);
  const selectedTypeRef = useRef<number | null>(null);

  const stateRef = useRef({
    balls: [] as { x: number; y: number; vx: number; vy: number; rotation: number; rotationSpeed: number; drawSize: number; idx: number; age: number; baseSpeed: number }[],
    images: {} as Record<string, HTMLImageElement>,
    targetY: 0,
    animId: 0,
    stars: [] as { x: number; y: number; phase: number }[],
  });

  useEffect(() => {
    selectedTypeRef.current = selectedType;
    // Clear existing balls when filter changes so the new type appears immediately
    stateRef.current.balls = [];
  }, [selectedType]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const state = stateRef.current;

    // Load images
    for (const b of BALLS) {
      const img = new Image();
      img.src = b.sprite;
      state.images[b.sprite] = img;
    }

    const W = canvas.width;
    const H = canvas.height;
    state.targetY = H * 0.85;

    // Pre-generate star positions
    state.stars = [];
    for (let i = 0; i < 50; i++) {
      state.stars.push({
        x: (i * 137 + 50) % W,
        y: (i * 97 + 30) % (H * 0.8),
        phase: i * 1.7,
      });
    }

    function pickBallIndex(): number {
      const filter = selectedTypeRef.current;
      if (filter !== null) return filter;
      // Weighted random selection
      const total = BALLS.reduce((s, b) => s + b.weight, 0);
      let r = Math.random() * total;
      for (let i = 0; i < BALLS.length; i++) {
        r -= BALLS[i].weight;
        if (r <= 0) return i;
      }
      return 0;
    }

    function spawnBall() {
      const idx = pickBallIndex();
      const ball = BALLS[idx];
      const speed = ball.speed * 0.6;
      let x: number, y: number, vx: number, vy: number;
      const side = Math.random();
      if (side < 0.5) {
        // Spawn from top (50%)
        x = Math.random() * W;
        y = -20;
        const angle = Math.atan2(state.targetY - 0, x - (W / 2 + (Math.random() - 0.5) * 100));
        vx = Math.cos(angle + Math.PI / 2) * speed * 0.3;
        vy = speed;
      } else if (side < 0.75) {
        // Spawn from left (25%)
        x = -20;
        y = Math.random() * H * 0.4;
        const angle = Math.atan2(state.targetY - y, W / 2 - x);
        vx = Math.cos(angle) * speed;
        vy = Math.sin(angle) * speed;
      } else {
        // Spawn from right (25%)
        x = W + 20;
        y = Math.random() * H * 0.4;
        const angle = Math.atan2(state.targetY - y, W / 2 - x);
        vx = Math.cos(angle) * speed;
        vy = Math.sin(angle) * speed;
      }
      state.balls.push({
        x, y, vx, vy,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.08,
        drawSize: (22 + Math.random() * 22) * 1.5,
        idx, age: 0, baseSpeed: speed,
      });
      if (state.balls.length > 18) state.balls.shift();
    }

    let lastSpawn = 0;
    function draw(time: number) {
      if (time - lastSpawn > 500) {
        spawnBall();
        lastSpawn = time;
      }

      ctx.clearRect(0, 0, W, H);

      // Dark starfield background
      ctx.fillStyle = "#0a0a1a";
      ctx.fillRect(0, 0, W, H);

      // Twinkling stars
      for (const star of state.stars) {
        const brightness = 0.3 + 0.35 * Math.sin(time * 0.001 + star.phase);
        ctx.fillStyle = `rgba(255,255,255,${brightness})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, 0.8, 0, Math.PI * 2);
        ctx.fill();
      }

      // Earth curve
      ctx.beginPath();
      ctx.ellipse(W / 2, H + 80, W * 0.7, 140, 0, Math.PI, 0);
      ctx.fillStyle = "#1a4a2a";
      ctx.fill();
      ctx.strokeStyle = "#2a6a3a";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw & update balls
      for (let i = state.balls.length - 1; i >= 0; i--) {
        const b = state.balls[i];
        const ballDef = BALLS[b.idx];
        b.age++;

        // Apply behavior
        switch (ballDef.behavior) {
          case "curve":
            // Position offset applied after movement
            break;
          case "zigzag":
            // Position offset applied after movement
            break;
          case "accelerate":
            // Exponential acceleration applied during movement
            break;
          case "homing": {
            const tx = W / 2;
            const ty = state.targetY;
            const targetAngle = Math.atan2(ty - b.y, tx - b.x);
            const currentAngle = Math.atan2(b.vy, b.vx);
            let angleDiff = targetAngle - currentAngle;
            while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
            while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;
            const maxTurn = 0.5 * Math.PI / 180;
            const turn = Math.max(-maxTurn, Math.min(maxTurn, angleDiff));
            const newAngle = currentAngle + turn;
            const spd = Math.hypot(b.vx, b.vy);
            b.vx = Math.cos(newAngle) * spd;
            b.vy = Math.sin(newAngle) * spd;
            break;
          }
        }

        // Movement (behavior-aware)
        if (ballDef.behavior === "accelerate") {
          const mult = Math.pow(1.002, b.age);
          b.x += b.vx * mult;
          b.y += b.vy * mult;
        } else {
          b.x += b.vx;
          b.y += b.vy;
        }
        if (ballDef.behavior === "curve") {
          b.x += Math.sin(b.age * 0.03) * 1.2;
        }
        if (ballDef.behavior === "zigzag") {
          b.x += (Math.floor(b.age / 60) % 2 === 0 ? 1.5 : -1.5);
        }
        b.rotation += b.rotationSpeed;

        // Remove if off screen
        if (b.y > H + 30) {
          state.balls.splice(i, 1);
          continue;
        }

        // Draw pokeball
        const img = state.images[ballDef.sprite];
        if (img && img.complete) {
          ctx.save();
          ctx.translate(b.x, b.y);
          ctx.rotate(b.rotation);
          const size = b.drawSize;
          ctx.drawImage(img, -size / 2, -size / 2, size, size);
          ctx.restore();
        }

        // Trail
        ctx.beginPath();
        ctx.arc(b.x, b.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = ballDef.color + "40";
        ctx.fill();
      }

      // Bottom text
      const legendY = H - 18;
      ctx.font = "10px monospace";
      ctx.fillStyle = "#888";
      ctx.textAlign = "center";
      const filter = selectedTypeRef.current;
      const label = filter !== null
        ? `Showing: ${BALLS[filter].name} — ${BALLS[filter].description}`
        : "Click a ball type above to isolate its flight pattern";
      ctx.fillText(label, W / 2, legendY);

      state.animId = requestAnimationFrame(draw);
    }

    state.animId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(state.animId);
  }, []);

  return (
    <div style={{ margin: "1.5em 0" }}>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "0.5em", marginBottom: "0.8em" }}>
        {/* All button */}
        <button
          type="button"
          onClick={() => setSelectedType(null)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "4px 12px",
            borderRadius: 6,
            background: selectedType === null ? "#ffffff22" : "#ffffff08",
            border: selectedType === null ? "2px solid #fff" : "1px solid #555",
            fontSize: "0.8em",
            color: "#ccc",
            cursor: "pointer",
            fontWeight: selectedType === null ? 700 : 400,
            transition: "all 0.15s ease",
          }}
        >
          All
        </button>
        {BALLS.map((b, i) => {
          const isSelected = selectedType === i;
          return (
            <button
              type="button"
              key={b.name}
              onClick={() => setSelectedType(isSelected ? null : i)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "4px 10px",
                borderRadius: 6,
                background: isSelected ? b.color + "30" : b.color + "18",
                border: isSelected ? `2px solid ${b.color}` : `1px solid ${b.color}44`,
                fontSize: "0.8em",
                cursor: "pointer",
                color: "inherit",
                fontWeight: isSelected ? 700 : 400,
                transition: "all 0.15s ease",
                transform: isSelected ? "scale(1.05)" : "scale(1)",
              }}
            >
              <img src={b.sprite} alt={b.name} width={20} height={20} />
              <span>
                <strong style={{ color: b.color }}>{b.name}</strong>{" "}
                <span style={{ opacity: 0.7 }}>({b.weight}%)</span>
              </span>
            </button>
          );
        })}
      </div>
      <canvas
        ref={canvasRef}
        width={700}
        height={350}
        style={{
          width: "100%",
          maxWidth: 700,
          display: "block",
          margin: "0 auto",
          borderRadius: 8,
          border: "1px solid #333",
        }}
      />
      {selectedType !== null && (
        <div
          style={{
            textAlign: "center",
            marginTop: "0.6em",
            padding: "8px 16px",
            borderRadius: 6,
            background: BALLS[selectedType].color + "14",
            border: `1px solid ${BALLS[selectedType].color}33`,
            fontSize: "0.85em",
            color: "#ccc",
            maxWidth: 700,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          <strong style={{ color: BALLS[selectedType].color }}>{BALLS[selectedType].name}</strong>
          {" — "}
          {BALLS[selectedType].behaviorDetail}
        </div>
      )}
    </div>
  );
}
